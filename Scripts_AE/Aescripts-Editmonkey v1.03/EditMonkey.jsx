/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function deoz_EditMonkey(theObj) {
  function d2r(theAngle) {
    return (theAngle / 180) * Math.PI;
  }
  function getProjectFolder(theName, theID, buildOne) {
    for (var i = 1; i <= app.project.numItems; i += 1) {
      if (
        app.project.item(i) instanceof FolderItem &&
        app.project.item(i).comment == theID
      ) {
        return app.project.item(i);
      }
    }
    if (buildOne) {
      var theFolder = app.project.items.addFolder(theName);
      theFolder.comment = theID;
      theFolder.parentFolder = app.project.rootFolder;
      return theFolder;
    } else {
      return null;
    }
  }
  function padZeros(n) {
    var s = "" + n;
    while (s.length < 3) {
      s = "0" + s;
    }
    return s;
  }
  function getUniqueCompName() {
    var maxN = 0;
    for (var i = 1; i <= app.project.numItems; i += 1) {
      if (
        app.project.item(i) instanceof CompItem &&
        app.project.item(i).comment.indexOf(G.compID) > -1
      ) {
        splitText = app.project.item(i).name.split("_");
        n = parseInt(splitText[splitText.length - 1], 10);
        if (!isNaN(n)) {
          maxN = Math.max(maxN, n);
        }
      }
    }
    return G.compName + "_" + padZeros(maxN + 1);
  }
  function getUniqueRetimeCompName() {
    var maxN = 0;
    for (var i = 1; i <= app.project.numItems; i += 1) {
      if (
        app.project.item(i) instanceof CompItem &&
        app.project.item(i).comment.indexOf(G.retimeCompID) > -1
      ) {
        splitText = app.project.item(i).name.split("_");
        n = parseInt(splitText[splitText.length - 1], 10);
        if (!isNaN(n)) {
          maxN = Math.max(maxN, n);
        }
      }
    }
    return G.retimeCompName + "_" + padZeros(maxN + 1);
  }
  function getRandom() {
    return parseFloat(app.version) > 13.6
      ? generateRandomNumber()
      : Math.random();
  }
  function getRandomRange(theMin, theMax) {
    var n =
      parseFloat(app.version) > 13.6 ? generateRandomNumber() : Math.random();
    return theMin + (theMax - theMin) * n;
  }
  function shuffleArray(theArray) {
    for (var i = 0; i < theArray.length; i += 1) {
      idx = i + Math.floor(getRandom() * (theArray.length - i));
      temp = theArray[i];
      theArray[i] = theArray[idx];
      theArray[idx] = temp;
    }
  }
  function getArrayIndex(theArray, theItem) {
    for (var i = 0; i < theArray.length; i += 1) {
      if (theArray[i] == theItem) {
        return i;
      }
    }
    return -1;
  }
  function inArray(theItem, theArray) {
    for (var i = 0; i < theArray.length; i += 1) {
      if (theArray[i] == theItem) {
        return true;
      }
    }
    return false;
  }
  function colorToHex(theColor) {
    var r = Math.round(theColor[0] * 255);
    var g = Math.round(theColor[1] * 255);
    var b = Math.round(theColor[2] * 255);
    return r * 65536 + g * 256 + b;
  }
  function hexToColor(theHex) {
    var r = theHex >> 16;
    var g = (theHex & 65280) >> 8;
    var b = theHex & 255;
    return [r / 255, g / 255, b / 255];
  }
  function drawColorBtn(theButton, theColor) {
    var g = theButton.graphics;
    theButton.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, theColor);
    theButton.notify("onDraw");
  }
  function customDraw() {
    with (this) {
      graphics.drawOSControl();
      graphics.rectPath(0, 0, size[0], size[1]);
      graphics.fillPath(fillBrush);
      graphics.strokePath(strokePen);
    }
  }
  function updateList(theDDL, theNames, theDefaultName) {
    G.changingDirectionDDL = true;
    var currentSelectionName = theDDL.selection.text;
    theDDL.removeAll();
    for (var i = 0; i < theNames.length; i += 1) {
      if (theNames[i] == "-") {
        theDDL.add("separator");
      } else {
        theDDL.add("item", theNames[i]);
      }
    }
    var curIdx = getArrayIndex(theNames, currentSelectionName);
    if (curIdx == -1) {
      theDDL.selection = getArrayIndex(theNames, theDefaultName);
    } else {
      theDDL.selection = curIdx;
    }
    G.changingDirectionDDL = false;
  }
  function obfuscateExpr(theExpr, theTable) {
    if (G.obfuscate) {
      baseExpr = theExpr;
      baseExpr = baseExpr.replace(/function/g, "function@");
      baseExpr = baseExpr.replace(/return/g, "return@");
      baseExpr = baseExpr.replace(/else/g, "@else@");
      baseExpr = baseExpr.replace(/case/g, "case@");
      var newBaseExpr = "";
      var doingQuotes = false;
      for (var i = 0; i < baseExpr.length; i += 1) {
        if (baseExpr[i] == '"') {
          doingQuotes = !doingQuotes;
          newBaseExpr += '"';
        } else if (baseExpr[i] == " ") {
          newBaseExpr += doingQuotes ? "@" : " ";
        } else {
          newBaseExpr += baseExpr[i];
        }
      }
      baseExpr = newBaseExpr.replace(/[ \r]/g, "");
      for (var i = 0; i < theTable.length; i += 1) {
        baseExpr = baseExpr.replace(new RegExp(theTable[i], "g"), "a" + i);
      }
      baseExpr = baseExpr.replace(/@/g, " ");
      return baseExpr;
    } else {
      baseExpr = theExpr;
      for (var i = 0; i < theTable.length; i += 1) {
        baseExpr = baseExpr.replace(
          new RegExp(theTable[i], "g"),
          theTable[i].substr(1, theTable[i].length - 2),
        );
      }
      return baseExpr;
    }
  }
  function checkDependencies() {
    if (G.disable_check_dependencies) {
      return;
    }
    var source =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.DDL.selection
        .text;
    var textLayersOnly_enabled = source == "TEXT PANEL";
    G.uiPal.grp.topControlsGrp.textLayersOnlyGrp.enabled =
      textLayersOnly_enabled;
    var textLayersOnly = G.uiPal.grp.topControlsGrp.textLayersOnlyGrp.CB.value;
    var textLayersOnly_inhibit = textLayersOnly_enabled && textLayersOnly;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp.enabled =
      !(source == "TEXT PANEL" || textLayersOnly_inhibit);
    var colorLabelAware_inhibit =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp
        .enabled &&
      !G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp.CB
        .value;
    if (source == "LAYERS") {
      if (G.uiPal.grp.textGrp.enabled) {
        G.saveText = G.uiPal.grp.textGrp.txt.text;
        G.uiPal.grp.textGrp.txt.text = G.disableText;
        G.uiPal.grp.textGrp.enabled = false;
      }
    } else {
      if (!G.uiPal.grp.textGrp.enabled) {
        G.uiPal.grp.textGrp.enabled = true;
        G.uiPal.grp.textGrp.txt.text = G.saveText;
      }
    }
    G.uiPal.grp.topControlsGrp.wordsLinesGrp.enabled = source != "LAYERS";
    G.uiPal.grp.topControlsGrp.allCapsGrp.enabled = source != "LAYERS";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.presetGrp.enabled =
      !textLayersOnly_inhibit;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.enabled =
      !textLayersOnly_inhibit;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.enabled =
      !textLayersOnly_inhibit;
    var hold =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.DDL.selection
        .text;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.minGrp.enabled =
      !(textLayersOnly_inhibit || hold == "Off");
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.maxGrp.enabled =
      !(textLayersOnly_inhibit || hold == "Constant" || hold == "Off");
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.enabled =
      !textLayersOnly_inhibit &&
      !(
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp.CB
          .value &&
        !G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp.CB
          .value
      );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.pageOrderGrp.enabled = !(
      textLayersOnly_inhibit || source == "TEXT PANEL"
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.randomizeTimingGrp.enabled =
      !(textLayersOnly_inhibit || source == "TEXT PANEL");
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.DDL
          .selection.text == "Off"
      );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.DDL
          .selection.text == "Off"
      );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.enabled =
      !textLayersOnly_inhibit;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp.enabled =
      !textLayersOnly_inhibit;
    var transition =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp.DDL
        .selection.text;
    var matchInOut_inhibit =
      !textLayersOnly_inhibit && transition == "Automatic";
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp.enabled =
      !(textLayersOnly_inhibit || transition == "Off");
    var animateIn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp.DDL
        .selection.text;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        transition == "Off" ||
        animateIn == "Random" ||
        animateIn == "Random by Layer" ||
        animateIn == "Off"
      );
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleInGrp.enabled =
      !(textLayersOnly_inhibit || transition == "Off" || animateIn == "Off");
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeInGrp.enabled =
      !(textLayersOnly_inhibit || transition == "Off");
    var fadeIn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeInGrp.CB
        .value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp.enabled =
      !(textLayersOnly_inhibit || transition == "Off" || matchInOut_inhibit);
    var animateOut =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp.DDL
        .selection.text;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        transition == "Off" ||
        matchInOut_inhibit ||
        animateOut == "Random" ||
        animateOut == "Random by Layer" ||
        animateOut == "Off"
      );
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleOutGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        transition == "Off" ||
        matchInOut_inhibit ||
        animateOut == "Off"
      );
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeOutGrp.enabled =
      !(textLayersOnly_inhibit || transition == "Off" || matchInOut_inhibit);
    var fadeOut =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeOutGrp.CB
        .value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.speedGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        transition == "Off" ||
        (transition == "Automatic" && animateIn == "Off" && !fadeIn) ||
        (transition == "Custom" &&
          animateIn == "Off" &&
          !fadeIn &&
          animateOut == "Off" &&
          !fadeOut)
      );
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.intensityGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        transition == "Off" ||
        (transition == "Automatic" && animateIn == "Off" && !fadeIn) ||
        (transition == "Custom" &&
          animateIn == "Off" &&
          !fadeIn &&
          animateOut == "Off" &&
          !fadeOut)
      );
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.layerOrderGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        transition == "Off" ||
        (source == "LAYERS" && colorLabelAware_inhibit)
      );
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.offsetGrp.enabled =
      !(
        textLayersOnly_inhibit ||
        transition == "Off" ||
        (source == "LAYERS" && colorLabelAware_inhibit)
      );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.motionBlurGrp.enabled =
      !(textLayersOnly_inhibit || transition == "Off");
  }
  function click_help() {
    ez8.helpUI();
  }
  function click_keyInfo() {
    alert(G.keyTip, G.scriptName + " Keyboard Commands");
  }
  function click_textLayersOnly() {
    checkDependencies();
  }
  function change_preset() {
    if (G.disable_change_preset) {
      G.disable_change_preset = false;
      return;
    }
    if (this.selection === null) {
      this.selection = getArrayIndex(G.presetNames, G.def_presetName);
      checkDependencies();
      return;
    }
    var thePresetName = this.selection.text;
    var myScriptPath = File($.fileName).path;
    var myXmlFile = File(
      myScriptPath +
        "/" +
        G.EM_folderName +
        "/" +
        escape(G.presetFolderName + "/" + thePresetName + ".xml"),
    );
    if (myXmlFile == null || !myXmlFile.exists) {
      alert("Can\'t find preset file \'" + thePresetName + ".xml\'.");
      return false;
    }
    var fileOK = myXmlFile.open("r");
    if (!fileOK) {
      alert(
        "A problem occured when trying to open preset file \'" +
          thePresetName +
          ".xml\'.",
      );
      return false;
    }
    var myXmlString = myXmlFile.read();
    var thePreset = new XML(myXmlString);
    myXmlFile.close();
    processPreset(thePreset);
  }
  function change_source() {
    checkDependencies();
  }
  function click_colorLabelAware() {
    checkDependencies();
  }
  function click_retimePages() {
    checkDependencies();
  }
  function click_markerSync() {
    checkDependencies();
  }
  function change_hold() {
    if (this.selection === null) {
      this.selection = getArrayIndex(G.holdNames, G.def_holdName);
    }
    checkDependencies();
  }
  function change_sequencer() {
    if (this.selection === null) {
      this.selection = getArrayIndex(G.sequencerNames, G.def_sequencerName);
    }
    checkDependencies();
  }
  function click_color1() {
    var newColor = $.colorPicker(G.currentColor1Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor1Hex = newColor;
    G.currentColor1 = hexToColor(newColor);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color1Grp.colorBtn,
      G.currentColor1,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color1Grp.enableCB.value = true;
  }
  function click_color1CB() {
    if (!this.value) {
      G.currentColor1 = G.def_color1;
      G.currentColor1Hex = G.def_color1Hex;
      drawColorBtn(
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
          .container.color1Grp.colorBtn,
        G.currentColor1,
      );
    }
  }
  function click_color2() {
    var newColor = $.colorPicker(G.currentColor2Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor2Hex = newColor;
    G.currentColor2 = hexToColor(newColor);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color2Grp.colorBtn,
      G.currentColor2,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color2Grp.enableCB.value = true;
  }
  function click_color2CB() {
    if (!this.value) {
      G.currentColor2 = G.def_color2;
      G.currentColor2Hex = G.def_color2Hex;
      drawColorBtn(
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
          .container.color2Grp.colorBtn,
        G.currentColor2,
      );
    }
  }
  function click_color3() {
    var newColor = $.colorPicker(G.currentColor3Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor3Hex = newColor;
    G.currentColor3 = hexToColor(newColor);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color3Grp.colorBtn,
      G.currentColor3,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color3Grp.enableCB.value = true;
  }
  function click_color3CB() {
    if (!this.value) {
      G.currentColor3 = G.def_color3;
      G.currentColor3Hex = G.def_color3Hex;
      drawColorBtn(
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
          .container.color3Grp.colorBtn,
        G.currentColor3,
      );
    }
  }
  function click_color4() {
    var newColor = $.colorPicker(G.currentColor4Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor4Hex = newColor;
    G.currentColor4 = hexToColor(newColor);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color4Grp.colorBtn,
      G.currentColor4,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color4Grp.enableCB.value = true;
  }
  function click_color4CB() {
    if (!this.value) {
      G.currentColor4 = G.def_color4;
      G.currentColor4Hex = G.def_color4Hex;
      drawColorBtn(
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
          .container.color4Grp.colorBtn,
        G.currentColor4,
      );
    }
  }
  function click_color5() {
    var newColor = $.colorPicker(G.currentColor5Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor5Hex = newColor;
    G.currentColor5 = hexToColor(newColor);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color5Grp.colorBtn,
      G.currentColor5,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color5Grp.enableCB.value = true;
  }
  function click_color5CB() {
    if (!this.value) {
      G.currentColor5 = G.def_color5;
      G.currentColor5Hex = G.def_color5Hex;
      drawColorBtn(
        G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
          .container.color5Grp.colorBtn,
        G.currentColor5,
      );
    }
  }
  function change_transition() {
    if (this.selection === null) {
      this.selection = getArrayIndex(G.transitionNames, G.def_transitionName);
    }
    checkDependencies();
  }
  function change_animateIn() {
    if (this.selection === null) {
      this.selection = getArrayIndex(G.animateNames, G.def_animateInName);
    }
    switch (this.selection.text) {
      case "Slide":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionInGrp.DDL,
          G.directionNames_slide,
          G.def_directionInName_slide,
        );
        break;
      case "Scale":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionInGrp.DDL,
          G.directionNames_scale,
          G.def_directionInName_scale,
        );
        break;
      case "X Swing CW":
      case "X Swing CCW":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionInGrp.DDL,
          G.directionNames_swing,
          G.def_directionInName_swing,
        );
        break;
      case "Y Flip CW":
      case "Y Flip CCW":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionInGrp.DDL,
          G.directionNames_flip,
          G.def_directionInName_flip,
        );
        break;
      case "Z Spin CW":
      case "Z Spin CCW":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionInGrp.DDL,
          G.directionNames_spin,
          G.def_directionInName_spin,
        );
        break;
      case "Off":
        break;
      case "Random":
      case "Random by Layer":
        break;
      default:
        break;
    }
    checkDependencies();
  }
  function change_directionIn() {
    if (G.changingDirectionDDL) {
      return;
    }
    if (this.selection === null) {
      var motion =
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp
          .DDL.selection.text;
      switch (motion) {
        case "Slide":
          this.selection = getArrayIndex(
            G.directionNames_slide,
            G.def_directionInName_slide,
          );
          break;
        case "Scale":
          this.selection = getArrayIndex(
            G.directionNames_scale,
            G.def_directionInName_scale,
          );
          break;
        case "X Swing CW":
        case "X Swing CCW":
          this.selection = getArrayIndex(
            G.directionNames_swing,
            G.def_directionInName_swing,
          );
          break;
        case "Y Flip CW":
        case "Y Flip CCW":
          this.selection = getArrayIndex(
            G.directionNames_flip,
            G.def_directionInName_flip,
          );
          break;
        case "Z Spin CW":
        case "Z Spin CCW":
          this.selection = getArrayIndex(
            G.directionNames_spin,
            G.def_directionInName_spin,
          );
          break;
        default:
          break;
      }
    }
  }
  function change_styleIn() {
    if (this.selection === null) {
      this.selection = getArrayIndex(G.styleNames, G.def_styleInName);
    }
  }
  function click_fadeIn() {
    checkDependencies();
  }
  function change_animateOut() {
    if (this.selection === null) {
      this.selection = getArrayIndex(G.animateNames, G.def_animateOutName);
    }
    switch (this.selection.text) {
      case "Slide":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionOutGrp.DDL,
          G.directionNames_slide,
          G.def_directionOutName_slide,
        );
        break;
      case "Scale":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionOutGrp.DDL,
          G.directionNames_scale,
          G.def_directionOutName_scale,
        );
        break;
      case "X Swing CW":
      case "X Swing CCW":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionOutGrp.DDL,
          G.directionNames_swing,
          G.def_directionOutName_swing,
        );
        break;
      case "Y Flip CW":
      case "Y Flip CCW":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionOutGrp.DDL,
          G.directionNames_flip,
          G.def_directionOutName_flip,
        );
        break;
      case "Z Spin CW":
      case "Z Spin CCW":
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.enabled = true;
        updateList(
          G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp
            .directionOutGrp.DDL,
          G.directionNames_spin,
          G.def_directionOutName_spin,
        );
        break;
      case "Off":
        break;
      case "Random":
      case "Random by Layer":
        break;
      default:
        break;
    }
    checkDependencies();
  }
  function change_directionOut() {
    if (G.changingDirectionDDL) {
      return;
    }
    if (this.selection === null) {
      var motion =
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp
          .DDL.selection.text;
      switch (motion) {
        case "Slide":
          this.selection = getArrayIndex(
            G.directionNames_slide,
            G.def_directionOutName_slide,
          );
          break;
        case "Scale":
          this.selection = getArrayIndex(
            G.directionNames_scale,
            G.def_directionOutName_scale,
          );
          break;
        case "X Swing CW":
        case "X Swing CCW":
          this.selection = getArrayIndex(
            G.directionNames_swing,
            G.def_directionOutName_swing,
          );
          break;
        case "Y Flip CW":
        case "Y Flip CCW":
          this.selection = getArrayIndex(
            G.directionNames_flip,
            G.def_directionOutName_flip,
          );
          break;
        case "Z Spin CW":
        case "Z Spin CCW":
          this.selection = getArrayIndex(
            G.directionNames_spin,
            G.def_directionOutName_spin,
          );
          break;
        default:
          break;
      }
    }
  }
  function change_styleOut() {
    if (this.selection === null) {
      this.selection = getArrayIndex(G.styleNames, G.def_styleOutName);
    }
  }
  function click_fadeOut() {
    checkDependencies();
  }
  function click_save() {
    var xmlStruct =
      "<EMPreset>\r<ScriptName />\r<ScriptVersion />\r<PresetVersion />\r<Letters />\r<Words />\r<Lines />\r<TextLayersOnly />\r<AllCaps />\r<Source />\r<ColorLabelAware />\r<Hold />\r<Min />\r<Max />\r<Sequencer />\r<PageOrder />\r<RetimePages />\r<MarkerSync />\r<RandomizeTiming />\r<MotionBlur />\r<Color1 />\r<Color2 />\r<Color3 />\r<Color4 />\r<Color5 />\r<Color1Enabled />\r<Color2Enabled />\r<Color3Enabled />\r<Color4Enabled />\r<Color5Enabled />\r<Animation />\r<MotionIn />\r<DirectionIn />\r<StyleIn />\r<FadeIn />\r<MotionOut />\r<DirectionOut />\r<StyleOut />\r<FadeOut />\r<Speed />\r<Intensity />\r<LayerOrder />\r<LayerOffset />\r</EMPreset>";
    var myPreset = new XML(xmlStruct);
    myPreset.ScriptName = G.scriptName;
    myPreset.ScriptVersion = G.version;
    myPreset.PresetVersion = G.presetVersion;
    myPreset.Letters =
      G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.lettersRB.value.toString();
    myPreset.Words =
      G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.wordsRB.value.toString();
    myPreset.Lines =
      G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.linesRB.value.toString();
    myPreset.TextLayersOnly =
      G.uiPal.grp.topControlsGrp.textLayersOnlyGrp.CB.value.toString();
    myPreset.AllCaps =
      G.uiPal.grp.topControlsGrp.allCapsGrp.CB.value.toString();
    myPreset.Source =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.DDL.selection.index.toString();
    myPreset.ColorLabelAware =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp.CB.value.toString();
    myPreset.Hold =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.DDL.selection.index.toString();
    myPreset.Min =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.minGrp.txt.text;
    myPreset.Max =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.maxGrp.txt.text;
    myPreset.Sequencer =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.DDL.selection.index.toString();
    myPreset.PageOrder =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.pageOrderGrp.DDL.selection.index.toString();
    myPreset.RetimePages =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp.CB.value.toString();
    myPreset.MarkerSync =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp.CB.value.toString();
    myPreset.RandomizeTiming =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.randomizeTimingGrp.CB.value.toString();
    myPreset.MotionBlur =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.motionBlurGrp.CB.value.toString();
    myPreset.Color1 = G.currentColor1Hex.toString();
    myPreset.Color2 = G.currentColor2Hex.toString();
    myPreset.Color3 = G.currentColor3Hex.toString();
    myPreset.Color4 = G.currentColor4Hex.toString();
    myPreset.Color5 = G.currentColor5Hex.toString();
    myPreset.Color1Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color1Grp.enableCB.value.toString();
    myPreset.Color2Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color2Grp.enableCB.value.toString();
    myPreset.Color3Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color3Grp.enableCB.value.toString();
    myPreset.Color4Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color4Grp.enableCB.value.toString();
    myPreset.Color5Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color5Grp.enableCB.value.toString();
    myPreset.Animation =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp.DDL.selection.index.toString();
    myPreset.MotionIn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp.DDL.selection.index.toString();
    myPreset.DirectionIn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.DDL.selection.index.toString();
    myPreset.StyleIn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleInGrp.DDL.selection.index.toString();
    myPreset.FadeIn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeInGrp.CB.value.toString();
    myPreset.MotionOut =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp.DDL.selection.index.toString();
    myPreset.DirectionOut =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.DDL.selection.index.toString();
    myPreset.StyleOut =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleOutGrp.DDL.selection.index.toString();
    myPreset.FadeOut =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeOutGrp.CB.value.toString();
    myPreset.Speed =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.speedGrp.DDL.selection.index.toString();
    myPreset.Intensity =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.intensityGrp.DDL.selection.index.toString();
    myPreset.LayerOrder =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.layerOrderGrp.DDL.selection.index.toString();
    myPreset.LayerOffset =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.offsetGrp.DDL.selection.index.toString();
    var myStr = myPreset.toXMLString();
    var mySaveFile = File.saveDialog("Save Preset As...");
    if (mySaveFile !== null) {
      mySaveFile.open("W");
      mySaveFile.write(myStr);
      mySaveFile.close();
      if (mySaveFile.name.substr(-4).toLowerCase() != ".xml") {
        mySaveFile.rename(mySaveFile.name + ".xml");
      }
    }
  }
  function processPreset(myPreset) {
    G.disable_check_dependencies = true;
    var curTextState = G.uiPal.grp.textGrp.enabled;
    G.uiPal.grp.topControlsGrp.textLayersOnlyGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp.enabled = true;
    G.uiPal.grp.textGrp.enabled = true;
    G.uiPal.grp.topControlsGrp.wordsLinesGrp.enabled = true;
    G.uiPal.grp.topControlsGrp.allCapsGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.presetGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.minGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.maxGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.pageOrderGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.randomizeTimingGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleInGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeInGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleOutGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeOutGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.speedGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.intensityGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.layerOrderGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.offsetGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.motionBlurGrp.enabled = true;
    G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.lettersRB.value =
      myPreset.Letters.toString() == "true";
    G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.wordsRB.value =
      myPreset.Words.toString() == "true";
    G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.linesRB.value =
      myPreset.Lines.toString() == "true";
    G.uiPal.grp.topControlsGrp.textLayersOnlyGrp.CB.value =
      myPreset.TextLayersOnly.toString() == "true";
    G.uiPal.grp.topControlsGrp.allCapsGrp.CB.value =
      myPreset.AllCaps.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.DDL.selection =
      parseInt(myPreset.Source, 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp.CB.value =
      myPreset.ColorLabelAware.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.DDL.selection =
      parseInt(myPreset.Hold, 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.minGrp.txt.text =
      myPreset.Min.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.maxGrp.txt.text =
      myPreset.Max.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.DDL.selection =
      parseInt(myPreset.Sequencer, 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.pageOrderGrp.DDL.selection =
      parseInt(myPreset.PageOrder, 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp.CB.value =
      myPreset.RetimePages.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp.CB.value =
      myPreset.MarkerSync.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.randomizeTimingGrp.CB.value =
      myPreset.RandomizeTiming.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.motionBlurGrp.CB.value =
      myPreset.MotionBlur.toString() == "true";
    G.currentColor1Hex = parseInt(myPreset.Color1.toString(), 10);
    G.currentColor1 = hexToColor(G.currentColor1Hex);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color1Grp.colorBtn,
      G.currentColor1,
    );
    G.currentColor2Hex = parseInt(myPreset.Color2.toString(), 10);
    G.currentColor2 = hexToColor(G.currentColor2Hex);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color2Grp.colorBtn,
      G.currentColor2,
    );
    G.currentColor3Hex = parseInt(myPreset.Color3.toString(), 10);
    G.currentColor3 = hexToColor(G.currentColor3Hex);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color3Grp.colorBtn,
      G.currentColor3,
    );
    G.currentColor4Hex = parseInt(myPreset.Color4.toString(), 10);
    G.currentColor4 = hexToColor(G.currentColor4Hex);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color4Grp.colorBtn,
      G.currentColor4,
    );
    G.currentColor5Hex = parseInt(myPreset.Color5.toString(), 10);
    G.currentColor5 = hexToColor(G.currentColor5Hex);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color5Grp.colorBtn,
      G.currentColor5,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color1Grp.enableCB.value =
      myPreset.Color1Enabled.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color2Grp.enableCB.value =
      myPreset.Color2Enabled.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color3Grp.enableCB.value =
      myPreset.Color3Enabled.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color4Grp.enableCB.value =
      myPreset.Color4Enabled.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color5Grp.enableCB.value =
      myPreset.Color5Enabled.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp.DDL.selection =
      parseInt(myPreset.Animation, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp.DDL.selection =
      parseInt(myPreset.MotionIn, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.DDL.selection =
      parseInt(myPreset.DirectionIn, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleInGrp.DDL.selection =
      parseInt(myPreset.StyleIn, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeInGrp.CB.value =
      myPreset.FadeIn.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp.DDL.selection =
      parseInt(myPreset.MotionOut, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.DDL.selection =
      parseInt(myPreset.DirectionOut, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleOutGrp.DDL.selection =
      parseInt(myPreset.StyleOut, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeOutGrp.CB.value =
      myPreset.FadeOut.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.speedGrp.DDL.selection =
      parseInt(myPreset.Speed, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.intensityGrp.DDL.selection =
      parseInt(myPreset.Intensity, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.layerOrderGrp.DDL.selection =
      parseInt(myPreset.LayerOrder, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.offsetGrp.DDL.selection =
      parseInt(myPreset.LayerOffset, 10);
    G.disable_check_dependencies = false;
    G.uiPal.grp.textGrp.enabled = curTextState;
    checkDependencies();
  }
  function click_load() {
    var myXmlFile = File.openDialog("Load Preset...");
    if (myXmlFile === null) {
      return;
    }
    if (myXmlFile.name.substr(-4).toLowerCase() != ".xml") {
      alert("\'" + unescape(myXmlFile.name) + "\' is not a valid preset file.");
      return;
    }
    myXmlFile.open("r");
    var myXmlString = myXmlFile.read();
    var thePreset = new XML(myXmlString);
    myXmlFile.close();
    var tempXML = thePreset.ScriptName;
    if (tempXML === null || tempXML.toString() != G.scriptName) {
      alert("This file is not a " + G.scriptName + " preset.");
      return;
    }
    var myPresetVersion = parseFloat(thePreset.PresetVersion.toString());
    if (myPresetVersion > parseFloat(G.presetVersion)) {
      alert(
        "The selected preset was created with a newer version of " +
          G.scriptName +
          ". You will need to update " +
          G.scriptName +
          " to use this preset.",
      );
      return;
    }
    G.disable_change_preset = true;
    processPreset(thePreset);
  }
  function click_doIt() {
    function strip(theString) {
      return theString.replace(/^\s+|\s+$/g, "");
    }
    function convertTabsToSpaces(theString) {
      return theString.replace(/\t/g, " ");
    }
    function getTextPages(theText) {
      var thePages = [];
      var theLines = theText.split("\n");
      var theLineBuffer = "";
      for (var i = 0; i < theLines.length; i += 1) {
        theLine = theLines[i];
        if (strip(convertTabsToSpaces(theLine)) === "") {
          if (theLineBuffer !== "") {
            thePages.push(theLineBuffer);
            theLineBuffer = "";
          }
        } else {
          if (theLineBuffer !== "") {
            theLineBuffer += "\n";
          }
          theLineBuffer += theLine;
        }
      }
      if (theLineBuffer !== "") {
        thePages.push(theLineBuffer);
      }
      return thePages;
    }
    function adjustAnchor(theLayer, theOption) {
      var oldAP = theLayer.property("Anchor Point").value;
      var oldPos = theLayer.property("Position").value;
      var theScale = theLayer.property("Scale").value;
      var theRotation = theLayer.property("Rotation").value;
      var theRect = theLayer.sourceRectAtTime(0, false);
      var theAdj = [];
      switch (theOption) {
        case "Center":
          theAdj = [
            theRect.left + theRect.width / 2,
            theRect.top + theRect.height / 2,
          ];
          break;
        case "Left":
          theAdj = [theRect.left, theRect.top + theRect.height / 2];
          break;
        case "Right":
          theAdj = [
            theRect.left + theRect.width,
            theRect.top + theRect.height / 2,
          ];
          break;
        case "Top":
          theAdj = [theRect.left + theRect.width / 2, theRect.top];
          break;
        case "Bottom":
          theAdj = [
            theRect.left + theRect.width / 2,
            theRect.top + theRect.height,
          ];
          break;
        default:
          break;
      }
      var v = [
        ((theAdj[0] - oldAP[0]) * theScale[0]) / 100,
        ((theAdj[1] - oldAP[1]) * theScale[1]) / 100,
      ];
      if (theRotation !== 0) {
        var theAngle = d2r(theRotation);
        var x = [v[0] * Math.cos(theAngle) - v[1] * Math.sin(theAngle)];
        var y = [v[0] * Math.sin(theAngle) + v[1] * Math.cos(theAngle)];
        v = [x, y];
      }
      theLayer.property("Anchor Point").setValue(theAdj);
      theLayer
        .property("Position")
        .setValue([oldPos[0] + v[0], oldPos[1] + v[1]]);
    }
    function convertHardSpaces(theString) {
      var str = "";
      var prevWasNbsp = false;
      for (var i = 0; i < theString.length; i += 1) {
        myChar = theString[i];
        if (prevWasNbsp) {
          if (myChar != " " && myChar != G.hardSpaceKeyCode) {
            str += myChar;
            prevWasNbsp = false;
          }
        } else if (myChar == G.hardSpaceKeyCode) {
          while (str.length > 0) {
            if (str[str.length - 1] == " ") {
              str = str.substr(0, str.length - 1);
            } else {
              break;
            }
          }
          if (str.length !== 0) {
            prevChar = str[str.length - 1];
            str += String.fromCharCode(160);
            prevWasNbsp = true;
          }
        } else {
          str += myChar;
        }
      }
      return str;
    }
    function getRandomDirection(motionName, bypassZSpin) {
      switch (motionName) {
        case "Slide":
          directionName =
            G.directionRandomNames_slide[
              Math.floor(getRandomRange(0, G.directionRandomNames_slide.length))
            ];
          break;
        case "Scale":
          directionName =
            G.directionRandomNames_scale[
              Math.floor(getRandomRange(0, G.directionRandomNames_scale.length))
            ];
          break;
        case "X Swing CW":
        case "X Swing CCW":
          directionName =
            G.directionRandomNames_swing[
              Math.floor(getRandomRange(0, G.directionRandomNames_swing.length))
            ];
          break;
        case "Y Flip CW":
        case "Y Flip CCW":
          directionName =
            G.directionRandomNames_flip[
              Math.floor(getRandomRange(0, G.directionRandomNames_flip.length))
            ];
          break;
        case "Z Spin CW":
        case "Z Spin CCW":
          if (bypassZSpin) {
            directionName = "Center";
          } else {
            directionName =
              G.directionRandomNames_spin[
                Math.floor(
                  getRandomRange(0, G.directionRandomNames_spin.length),
                )
              ];
          }
          break;
        default:
          break;
      }
      if (directionName == "Horizontal") {
        directionName = getRandom() < 0.5 ? "Left" : "Right";
      } else if (directionName == "Vertical") {
        directionName = getRandom() < 0.5 ? "Up" : "Down";
      } else {
        if (directionName == "Back & Forth") {
          directionName = getRandom() < 0.5 ? "Back" : "Forth";
        }
      }
      return directionName;
    }
    function interp_linear(t, t1, t2, v1, v2) {
      return v1 + ((v2 - v1) * (t - t1)) / (t2 - t1);
    }
    function interp_quartIn(t, t1, t2, v1, v2) {
      if (t <= t1) {
        return v1;
      }
      if (t >= t2) {
        return v2;
      }
      var dt = t2 - t1;
      var dv = v2 - v1;
      var tEase = (t - t1) / dt;
      return v1 + dv * tEase * tEase * tEase * tEase;
    }
    function interp_quartOut(t, t1, t2, v1, v2) {
      if (t <= t1) {
        return v1;
      }
      if (t >= t2) {
        return v2;
      }
      var dt = t2 - t1;
      var dv = v2 - v1;
      var tEase = (t - t1) / dt;
      return (
        v1 + dv * (1 - (1 - tEase) * (1 - tEase) * (1 - tEase) * (1 - tEase))
      );
    }
    function interp_quartInOut(t, t1, t2, v1, v2) {
      if (t <= t1) {
        return v1;
      }
      if (t >= t2) {
        return v2;
      }
      var dt = t2 - t1;
      var dv = v2 - v1;
      var tEase = (t - t1) / dt;
      if (tEase < 0.5) {
        return v1 + dv * 8 * tEase * tEase * tEase * tEase;
      }
      return (
        v1 +
        dv * (1 - 8 * (1 - tEase) * (1 - tEase) * (1 - tEase) * (1 - tEase))
      );
    }
    function getEaseFunctionExpr(theStyleName, theSuffix) {
      var quart_in_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*_tEase_*_tEase_*_tEase_*_tEase_;\r" +
        "}\r";
      var quart_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*(1-(1-_tEase_)*(1-_tEase_)*(1-_tEase_)*(1-_tEase_));\r" +
        "}\r";
      var quart_in_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  if(_tEase_ < .5)\r" +
        "    return _val1_ + _dvEase_*8*_tEase_*_tEase_*_tEase_*_tEase_;\r" +
        "  return _val1_ + _dvEase_*(1-8*(1-_tEase_)*(1-_tEase_)*(1-_tEase_)*(1-_tEase_));\r" +
        "}\r";
      var expo_in_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*Math.exp(10*(_tEase_-1));\r" +
        "}\r";
      var expo_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*(1-Math.exp(-10*_tEase_));\r" +
        "}\r";
      var expo_in_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  if(_tEase_ < .5)\r" +
        "    return _val1_ + (_dvEase_/2)*Math.exp(10*(2*_tEase_-1));\r" +
        "  return _val1_ + _dvEase_*(1-Math.exp(10*(1-2*_tEase_))/2);\r" +
        "}\r";
      var inertia_in_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  _freq_ = 1.25;\r" +
        "  _decay_ = 12;\r" +
        "  return _val1_ - _dvEase_* Math.sin(((1-_tEase_)*_dtEase_ - 1/(_freq_*4))*(2*Math.PI)*_freq_)/Math.pow(2,_decay_*(1-_tEase_));\r" +
        "}\r";
      var inertia_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  _freq_ = 1.25;\r" +
        "  _decay_ = 12;\r" +
        "  return _val2_ + _dvEase_* Math.sin((_tEase_*_dtEase_ - 1/(_freq_*4))*(2*Math.PI)*_freq_)/Math.pow(2,_decay_*_tEase_);\r" +
        "}\r";
      var anticipate_in_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*_tEase_*_tEase_*(2.70158*_tEase_-1.70158);\r" +
        "}\r";
      var anticipate_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*((_tEase_-1)*(_tEase_-1)*(2.70158*(_tEase_-1)+1.70158)+1);\r" +
        "}\r";
      var springy_in_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  _tMove_ = .5;\r" +
        "  if (_tEase_ > 1 - _tMove_) return linear(_tEase_,1-_tMove_,1,_val1_,_val2_);\r" +
        "  _amp_ = _dvEase_/_tMove_;\r" +
        "  _decay_ = 5;\r" +
        "  _freq_ = 3/(2*(1-_tMove_));\r" +
        "  _w_ = _freq_*Math.PI*2;\r" +
        "  return _val1_ - _amp_*(Math.sin((1-_tEase_-_tMove_)*_w_)/Math.exp(_decay_*(1-_tEase_-_tMove_))/_w_);\r" +
        "}\r";
      var springy_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  _tMove_ = .5;\r" +
        "  if (_tEase_ < _tMove_) return linear(_tEase_,0,_tMove_,_val1_,_val2_);\r" +
        "  _amp_ = _dvEase_/_tMove_;\r" +
        "  _decay_ = 5;\r" +
        "  _freq_ = 3/(2*(1-_tMove_));\r" +
        "  _w_ = _freq_*Math.PI*2;\r" +
        "  return _val2_ + _amp_*(Math.sin((_tEase_-_tMove_)*_w_)/Math.exp(_decay_*(_tEase_-_tMove_))/_w_);\r" +
        "}\r";
      var bouncy_in_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = 1 - (_curT_-_t1_)/_dtEase_;\r" +
        "  if(_tEase_ < 4/11){\r" +
        "    return _val2_ - _dvEase_*7.5625*(_tEase_*_tEase_);\r" +
        "  }else if(_tEase_ < 8/11){\r" +
        "    return _val2_ - _dvEase_*(7.5625*(_tEase_-6/11)*(_tEase_-6/11) + 3/4);\r" +
        "  }else if(_tEase_ < 10/11){\r" +
        "    return _val2_ - _dvEase_*(7.5625*(_tEase_-9/11)*(_tEase_-9/11) + 15/16);\r" +
        "  }else{\r" +
        "    return _val2_ - _dvEase_*(7.5625*(_tEase_-10.5/11)*(_tEase_-10.5/11) + 63/64);\r" +
        "  }\r" +
        "}\r";
      var bouncy_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  if(_tEase_ < 4/11){\r" +
        "    return _val1_ + _dvEase_*7.5625*(_tEase_*_tEase_);\r" +
        "  }else if(_tEase_ < 8/11){\r" +
        "    return _val1_ + _dvEase_*(7.5625*(_tEase_-6/11)*(_tEase_-6/11) + 3/4);\r" +
        "  }else if(_tEase_ < 10/11){\r" +
        "    return _val1_ + _dvEase_*(7.5625*(_tEase_-9/11)*(_tEase_-9/11) + 15/16);\r" +
        "  }else{\r" +
        "    return _val1_ + _dvEase_*(7.5625*(_tEase_-10.5/11)*(_tEase_-10.5/11) + 63/64);\r" +
        "  }\r" +
        "}\r";
      var linear_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  return linear(_curT_,_t1_,_t2_,_val1_,_val2_);" +
        "}\r";
      var cut_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_){\r" +
        "  return  (_curT_ <= _t1_) ? _val1_ : _val2_;\r" +
        "}\r";
      switch (theStyleName) {
        case "Ease In":
          return quart_in_expr;
        case "Ease Out":
          return quart_out_expr;
        case "Hi Ease In":
          return expo_in_expr;
        case "Hi Ease Out":
          return expo_out_expr;
        case "Ease In & Out":
          return quart_in_out_expr;
        case "Hi Ease In & Out":
          return expo_in_out_expr;
        case "Inertia":
          return inertia_out_expr;
        case "Anticipate":
          return anticipate_in_expr;
        case "Springy":
          return springy_out_expr;
        case "Bouncy":
          return bouncy_out_expr;
        case "Linear":
          return linear_expr;
        case "Cut":
          return cut_expr;
        default:
          return quart_out_expr;
      }
    }
    function getOpacityExpr(
      tempHeaderExpr,
      doingTransitionIn,
      doingTransitionOut,
      animateInName,
      animateOutName,
      doingFadeIn,
      doingFadeOut,
      holdTime,
      fadePct,
      speedDur,
    ) {
      var doTransitionIn = doingTransitionIn;
      var doTransitionOut = doingTransitionOut;
      var doCutIn = animateInName == "Off";
      var doCutOut = animateOutName == "Off";
      var tempExpr = tempHeaderExpr;
      if (doTransitionIn && !doTransitionOut) {
        if (doingFadeIn) {
          tempExpr +=
            "if(time < _tHold_){\r  ease(time,_t_,_t_+" +
            fadePct * speedDur +
            ",0,value);\r" +
            "}else{\r" +
            "  0;\r" +
            "}";
        } else {
          tempExpr += "((time < _t_) || (time >= _tHold_)) ? 0 : value;";
        }
      } else if (doTransitionOut && !doTransitionIn) {
        if (doingFadeOut) {
          if (doCutOut) {
            tempExpr +=
              "ease(time,_tHold_,_tHold_+" + fadePct * speedDur + ",value,0);";
          } else {
            tempExpr +=
              "ease(time,_tHold_+" +
              (1 - fadePct) * speedDur +
              ",_tHold_+" +
              speedDur +
              ",value,0);";
          }
        } else {
          if (doCutOut) {
            tempExpr += "(time < _tHold_) ? value : 0;";
          } else {
            tempExpr += "(time < _tHold_+" + speedDur + ") ? value : 0;";
          }
        }
      } else if (doTransitionIn && doTransitionOut) {
        if (doingFadeIn) {
          if (doCutIn) {
            if (doingFadeOut) {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else{\r" +
                  "  ease(time,_tHold_,_tHold_+" +
                  fadePct * speedDur +
                  ",value,0);\r" +
                  "}";
              } else {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else{\r" +
                  "  ease(time,_tHold_+" +
                  (1 - fadePct) * speedDur +
                  ",_tHold_+" +
                  speedDur +
                  ",value,0);\r" +
                  "}";
              }
            } else {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else if (time < _tHold_){\r" +
                  "  value;\r" +
                  "}else{\r" +
                  "  0;\r" +
                  "}";
              } else {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else if (time < _tHold_+" +
                  speedDur +
                  "){\r" +
                  "  value;\r" +
                  "}else{\r" +
                  "  0;\r" +
                  "}";
              }
            }
          } else {
            if (doingFadeOut) {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else{\r" +
                  "  ease(time,_tHold_,_tHold_+" +
                  fadePct * speedDur +
                  ",value,0);\r" +
                  "}";
              } else {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else{\r" +
                  "  ease(time,_tHold_+" +
                  (1 - fadePct) * speedDur +
                  ",_tHold_+" +
                  speedDur +
                  ",value,0);\r" +
                  "}";
              }
            } else {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else if (time < _tHold_){\r" +
                  "  value;\r" +
                  "}else{\r" +
                  "  0;\r" +
                  "}";
              } else {
                tempExpr +=
                  "if (time < _t_+" +
                  fadePct * speedDur +
                  "){\r" +
                  "  ease(time,_t_,_t_+" +
                  fadePct * speedDur +
                  ",0,value);\r" +
                  "}else if (time < _tHold_+" +
                  speedDur +
                  "){\r" +
                  "  value;\r" +
                  "}else{\r" +
                  "  0;\r" +
                  "}";
              }
            }
          }
        } else {
          if (doCutIn) {
            if (doingFadeOut) {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else{\r  ease(time,_tHold_,_tHold_+" +
                  fadePct * speedDur +
                  ",value,0);\r" +
                  "}";
              } else {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else{\r  ease(time,_tHold_+" +
                  (1 - fadePct) * speedDur +
                  ",_tHold_+" +
                  speedDur +
                  ",value,0);\r" +
                  "}";
              }
            } else {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else if (time < _tHold_){\r  value;\r}else{\r  0;\r}";
              } else {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else if (time < _tHold_+" +
                  speedDur +
                  "){\r" +
                  "  value;\r" +
                  "}else{\r" +
                  "  0;\r" +
                  "}";
              }
            }
          } else {
            if (doingFadeOut) {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else{\r  ease(time,_tHold_,_tHold_+" +
                  fadePct * speedDur +
                  ",value,0);\r" +
                  "}";
              } else {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else{\r  ease(time,_tHold_+" +
                  (1 - fadePct) * speedDur +
                  ",_tHold_+" +
                  speedDur +
                  ",value,0);\r" +
                  "}";
              }
            } else {
              if (doCutOut) {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else if (time < _tHold_){\r  value;\r}else{\r  0;\r}";
              } else {
                tempExpr +=
                  "if (time < _t_){\r  0;\r}else if (time < _tHold_+" +
                  speedDur +
                  "){\r" +
                  "  value;\r" +
                  "}else{\r" +
                  "  0;\r" +
                  "}";
              }
            }
          }
        }
      } else {
        tempExpr += "((time < _t_) || (time >= _tHold_)) ? 0 : value;";
      }
      return tempExpr;
    }
    if (
      app.project.activeItem === null ||
      !(app.project.activeItem instanceof CompItem)
    ) {
      alert("No comp active.");
      return;
    }
    var myComp = app.project.activeItem;
    var myCompMoveAmt = Math.max(myComp.width, myComp.height) * 0.5625;
    if (myComp.pixelAspect != 1) {
      if (
        !confirm(
          G.scriptName +
            " results will be inaccurate with non-square pixel comps. Proceed anyway?",
          true,
        )
      ) {
        return;
      }
    }
    var myHoldMode =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.DDL.selection
        .text;
    switch (myHoldMode) {
      case "Constant":
        tempText =
          G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.minGrp
            .txt.text;
        myMin = parseFloat(tempText);
        if (isNaN(myMin) || myMin < 0) {
          alert("Illegal Min value");
          return;
        }
        break;
      case "Random":
        tempText =
          G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.minGrp
            .txt.text;
        myMin = parseFloat(tempText);
        if (isNaN(myMin) || myMin < 0) {
          alert("Illegal Min value");
          return;
        }
        tempText =
          G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.minMaxGrp.maxGrp
            .txt.text;
        myMax = parseFloat(tempText);
        if (isNaN(myMax)) {
          alert("Illegal Max entry");
          return;
        }
        if (myMax < myMin) {
          alert("Max value cannot be less than Min");
          return;
        }
        break;
      case "Off":
        myMin = 0;
        break;
      default:
        break;
    }
    var oTable = [
      "_L_",
      "_m_",
      "_n_",
      "_t_",
      "_tHold_",
      "_myEase_",
      "_myEase2_",
      "_curT_",
      "_t1_",
      "_t2_",
      "_val1_",
      "_val2_",
      "_dtEase_",
      "_dvEase_",
      "_tEase_",
      "_tMove_",
      "_amp_",
      "_freq_",
      "_decay_",
      "_w_",
    ];
    var mySource =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.DDL.selection
        .text;
    var doingMotionBlur =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.motionBlurGrp.CB.value;
    var doingColorLabelAware =
      mySource == "LAYERS" &&
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp.CB
        .value;
    var myPages = [];
    var myLayers = [];
    var myPageLayers = [];
    var myPageComps = [];
    var myPageCompLayers = [];
    var userLayers = [];
    var doingText = mySource == "TEXT PANEL";
    var randomizingTiming =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.randomizeTimingGrp.CB
        .value;
    var doingRetimePages =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp
        .enabled &&
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp.CB
        .value;
    var doingMarkerSync =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp
        .enabled &&
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp.CB.value;
    var markerSyncLayer = null;
    if (doingMarkerSync) {
      if (myComp.selectedLayers.length == 1) {
        markerSyncLayer = myComp.selectedLayers[0];
      } else {
        alert("Please select exactly one Marker Sync layer.");
        return;
      }
    }
    var tokens = [];
    var myLines = [];
    var myCumWidths = [];
    if (doingText) {
      var myText = G.uiPal.grp.textGrp.txt.text;
      if (strip(convertTabsToSpaces(myText)) === "") {
        alert("No text entered.");
        return;
      }
      if (G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.lettersRB.value) {
        textUnits = "Letters";
      } else if (G.uiPal.grp.topControlsGrp.wordsLinesGrp.rbGrp.wordsRB.value) {
        textUnits = "Words";
      } else {
        textUnits = "Lines";
      }
      if (G.uiPal.grp.topControlsGrp.allCapsGrp.CB.value) {
        myText = myText.toUpperCase();
      }
      if (ez8.t()) {
        var trialText = strip(myText).replace(/[{}|\]\[]/g, "");
        trialText = trialText.replace(/[\r\n]/g, " ");
        trialText = trialText.replace(/\s{2,}/g, " ");
        if (trialText.split(" ").length > G.trialWordLimit) {
          alert(
            "The trial version of " +
              G.scriptName +
              " is limited to " +
              G.trialWordLimit +
              " words. If you would like to try " +
              G.scriptName +
              ", please limit your text to no more than " +
              G.trialWordLimit +
              " words.",
          );
          return;
        }
      }
      myPages = getTextPages(myText);
    } else {
      for (i = myComp.numLayers; i > 0; i--) {
        theLayer = myComp.layer(i);
        if (theLayer.locked) {
          continue;
        }
        if (!theLayer.hasVideo || (theLayer.hasVideo && !theLayer.enabled)) {
          continue;
        }
        if (theLayer instanceof CameraLayer) {
          continue;
        }
        if (theLayer instanceof LightLayer) {
          continue;
        }
        if (theLayer.threeDLayer) {
          continue;
        }
        if (theLayer.parent !== null) {
          continue;
        }
        if (theLayer.nullLayer) {
          continue;
        }
        if (theLayer.guideLayer) {
          continue;
        }
        if (theLayer.adjustmentLayer) {
          continue;
        }
        if (
          markerSyncLayer !== null &&
          markerSyncLayer.index == theLayer.index
        ) {
          continue;
        }
        if (theLayer.comment.substr(0, G.scriptName.length) == G.scriptName) {
          if (theLayer.comment != G.textOnlyLayerID) {
            continue;
          }
        }
        userLayers.push(theLayer);
      }
      if (userLayers.length === 0) {
        alert("Selected comp has no layers that " + G.scriptName + " can use.");
        return;
      }
      var myKFLayers = [];
      for (var i = 0; i < userLayers.length; i += 1) {
        if (
          userLayers[i].property("Anchor Point").numKeys > 0 ||
          userLayers[i].property("Anchor Point").expressionEnabled
        ) {
          myKFLayers.push(userLayers[i]);
          continue;
        }
        if (
          userLayers[i].property("Position").numKeys > 0 ||
          userLayers[i].property("Position").expressionEnabled
        ) {
          myKFLayers.push(userLayers[i]);
          continue;
        }
        if (
          userLayers[i].property("Scale").numKeys > 0 ||
          userLayers[i].property("Scale").expressionEnabled
        ) {
          myKFLayers.push(userLayers[i]);
          continue;
        }
        if (
          userLayers[i].property("Rotation").numKeys > 0 ||
          userLayers[i].property("Rotation").expressionEnabled
        ) {
          myKFLayers.push(userLayers[i]);
          continue;
        }
      }
      if (myKFLayers.length > 0) {
        if (myKFLayers.length == 1) {
          alert(
            "Layer \'" +
              myKFLayers[0].name +
              "\' has keyframes or expressions applied to one or more of the transform properties. Please pre-compose this layer and try again.",
          );
        } else {
          var myMsg = "Layers ";
          for (var i = 0; i < myKFLayers.length; i += 1) {
            myMsg +=
              i === 0 || i == myKFLayers.length - 1
                ? ""
                : ", " + i == myKFLayers.length - 1
                  ? " and "
                  : "" + "\'" + myKFLayers[i].name + "\'";
          }
          alert(
            myMsg +
              " have keyframes or expressions applied to one or more of the transform properties. Please pre-compose these layers and try again.",
          );
        }
        return;
      }
      if (ez8.t()) {
        if (userLayers.length > G.trialLayerLimit) {
          alert(
            "The trial version of " +
              G.scriptName +
              " is limited to " +
              G.trialLayerLimit +
              " layers. If you would like to try " +
              G.scriptName +
              ", please limit your comp to no more than " +
              G.trialLayerLimit +
              " layers.",
          );
          return;
        }
      }
      var tempArray = [];
      if (doingColorLabelAware) {
        var labelColorProcessed = [
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
          false,
        ];
        for (var i = 0; i < userLayers.length; i += 1) {
          if (labelColorProcessed[userLayers[i].label]) {
            continue;
          }
          tempArray = [userLayers[i]];
          for (j = i + 1; j < userLayers.length; j++) {
            if (userLayers[j].label == userLayers[i].label) {
              tempArray.push(userLayers[j]);
            }
          }
          labelColorProcessed[userLayers[i].label] = true;
          myPages.push(tempArray);
        }
      } else {
        for (var i = 0; i < userLayers.length; i += 1) {
          myPages.push([userLayers[i]]);
        }
      }
    }
    var myMarkerVal = new MarkerValue("");
    var randomMarkerArray = [];
    var myPageOrder =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.pageOrderGrp.DDL
        .selection.text;
    var myTransitionMode =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp.DDL
        .selection.text;
    var doingTransitionIn =
      myTransitionMode == "Automatic" || myTransitionMode == "Custom";
    var doingTransitionOut =
      myTransitionMode == "Automatic" || myTransitionMode == "Custom";
    var myLayerOrderName =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.layerOrderGrp.DDL
        .selection.text;
    var mySpeedName =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.speedGrp.DDL
        .selection.text;
    var myIntensityName =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.intensityGrp.DDL
        .selection.text;
    var mySequencer =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.DDL
        .selection.text;
    var myOverlapPct =
      G.overlapPct[getArrayIndex(G.sequencerNames, mySequencer)];
    var doingSequence =
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.enabled &&
      mySequencer != "Off";
    var myOffsetName =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.offsetGrp.DDL
        .selection.text;
    var myAnimateInName =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp.DDL
        .selection.text;
    var doingRandomIn = doingTransitionIn && myAnimateInName == "Random";
    var doingSuperRandomIn =
      doingTransitionIn && myAnimateInName == "Random by Layer";
    var myDirectionInName =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp
        .DDL.selection.text;
    var myStyleInName =
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleInGrp.DDL
        .selection.text;
    var doingFadeIn =
      doingTransitionIn &&
      G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeInGrp.CB
        .value;
    var doingInOutMatch =
      doingTransitionIn &&
      doingTransitionOut &&
      myTransitionMode == "Automatic";
    if (doingInOutMatch) {
      myAnimateOutName = myAnimateInName;
      doingRandomOut = doingRandomIn;
      doingSuperRandomOut = doingSuperRandomIn;
      myDirectionOutName = myDirectionInName;
      switch (myStyleInName) {
        case "Ease In":
        case "Ease Out":
        case "Ease In & Out":
          myStyleOutName = "Ease In";
          break;
        case "Hi Ease In":
        case "Hi Ease Out":
        case "Hi Ease In & Out":
          myStyleOutName = "Hi Ease In";
          break;
        case "Inertia":
        case "Anticipate":
        case "Springy":
        case "Bouncy":
          myStyleOutName = "Anticipate";
          break;
        case "Linear":
          myStyleOutName = "Linear";
          break;
        default:
          break;
      }
      doingFadeOut = doingFadeIn;
    } else {
      myAnimateOutName =
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp
          .DDL.selection.text;
      doingRandomOut = doingTransitionOut && myAnimateOutName == "Random";
      doingSuperRandomOut =
        doingTransitionOut && myAnimateOutName == "Random by Layer";
      myDirectionOutName =
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp
          .DDL.selection.text;
      myStyleOutName =
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleOutGrp.DDL
          .selection.text;
      doingFadeOut =
        doingTransitionOut &&
        G.uiPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeOutGrp.CB
          .value;
    }
    if (doingSequence && myOverlapPct < 0) {
      if (
        !(
          (doingTransitionIn && (myAnimateInName != "Off" || doingFadeIn)) ||
          (doingTransitionOut && (myAnimateOutName != "Off" || doingFadeOut))
        )
      ) {
        if (
          !confirm(
            "Using Overlap with no Animation will probably produce unsatisfactory results.\r\rWe suggest switching the Sequencer to On instead.\r\rProceed anyway?",
            true,
          )
        ) {
          return;
        }
      }
    }
    if (markerSyncLayer !== null) {
      if (
        markerSyncLayer.property("Marker").numKeys <
        (myPages.length + doingRetimePages ? 1 : 0)
      ) {
        alert(
          "Marker Sync layer needs at least " +
            myPages.length +
            doingRetimePages
            ? 1
            : 0 + " markers.",
        );
        return;
      }
    }
    if (doingText && G.uiPal.grp.topControlsGrp.textLayersOnlyGrp.CB.value) {
      app.beginUndoGroup(G.scriptInitials + ": Create Text");
      for (var i = 0; i < myPages.length; i += 1) {
        myPageText = strip(myPages[i]);
        myLines = myPageText.split("\n");
        doingBracket = false;
        tempLines = "";
        for (var j = 0; j < myLines.length; j += 1) {
          myLine = myLines[j];
          tokens = [];
          tempString = "";
          deltaY =
            (j + 1 - (myLines.length + 1) / 2) * leading -
            baselineY +
            yHeight / 2;
          switch (textUnits) {
            case "Letters":
              doingBracket = false;
              for (var k = 0; k < myLine.length; k += 1) {
                if (doingBracket) {
                  if (myLine[k] == "]") {
                    tokens.push(tempString);
                    doingBracket = false;
                  } else {
                    tempString += myLine[k];
                  }
                } else {
                  if (myLine[k] == "[") {
                    doingBracket = true;
                    tempString = "";
                  } else {
                    tokens.push(myLine[k]);
                  }
                }
              }
              break;
            case "Words":
              myLine = convertHardSpaces(myLine);
              for (var k = 0; k < myLine.length; k += 1) {
                if (myLine[k] == " ") {
                  if (tempString !== "") {
                    tokens.push(tempString);
                    tokens.push(" ");
                    tempString = "";
                  }
                } else {
                  tempString += myLine[k];
                }
              }
              if (tempString !== "") {
              }
              tokens.push(tempString);
              break;
            case "Lines":
              if (doingBracket) {
                if (myLine[myLine.length - 1] == "}") {
                  tempLines += "\r" + myLine.substr(0, myLine.length - 1);
                  tokens.push(tempLines);
                  tempLines = "";
                  doingBracket = false;
                } else {
                  tempLines += "\r" + myLine;
                  if (j == myLines.length - 1) {
                    tokens.push(tempLines);
                    tempLines = "";
                    doingBracket = false;
                  }
                }
              } else {
                if (myLine[0] == "{") {
                  if (myLine[myLine.length - 1] == "}") {
                    tokens.push(myLine.substr(1, myLine.length - 2));
                  } else {
                    tempLines = myLine.substr(1);
                    doingBracket = true;
                  }
                } else {
                  tokens.push(myLine);
                }
              }
              break;
            default:
              break;
          }
          for (var k = 0; k < tokens.length; k += 1) {
            myToken = tokens[k];
            if (strip(convertTabsToSpaces(myToken)) === "") {
              continue;
            }
            myLayer = myComp.layers.addText(myToken);
            myLayer.name = myToken;
            myLayer.startTime = 0;
            myLayer.comment = G.textOnlyLayerID;
            myLayer.label = G.textLayerColor;
            adjustAnchor(myLayer, "Center");
            myLayer
              .property("Position")
              .setValue([myComp.width / 2, myComp.height / 2]);
            myLayer.selected = false;
          }
        }
      }
      app.endUndoGroup();
      return;
    }
    app.beginUndoGroup(G.scriptInitials + ": Create Pages");
    if (myPages.length > 0) {
      myProjectFolder = getProjectFolder(
        G.projectFolderName,
        G.projectFolderID,
        true,
      );
    } else {
      alert("Nothing to do.");
      return;
    }
    var fillColorArray = [];
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color1Grp.enableCB.value
    ) {
      fillColorArray.push(G.currentColor1);
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color2Grp.enableCB.value
    ) {
      fillColorArray.push(G.currentColor2);
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color3Grp.enableCB.value
    ) {
      fillColorArray.push(G.currentColor3);
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color4Grp.enableCB.value
    ) {
      fillColorArray.push(G.currentColor4);
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
        .container.color5Grp.enableCB.value
    ) {
      fillColorArray.push(G.currentColor5);
    }
    var doingColorPalette = fillColorArray.length > 0;
    n = myPages.length;
    var prevPageLayer = null;
    if (!doingText) {
      if (myPageOrder == "Shuffle") {
        shuffleArray(myPages);
      } else {
        if (myPageOrder == "Reverse") {
          myPages.reverse();
        }
      }
    }
    for (var i = 0; i < myPages.length; i += 1) {
      lastMarkerTime = null;
      if (doingText) {
        myPageText = strip(myPages[i]);
        myLines = myPageText.split("\n");
      }
      myPageLayers = [];
      curLayerOrderName = myLayerOrderName;
      if (mySpeedName == "Random") {
        curSpeedName =
          G.speedRandomNames[
            Math.floor(getRandomRange(0, G.speedRandomNames.length))
          ];
      } else {
        curSpeedName = mySpeedName;
      }
      mySpeedDur =
        G.fastMoveDur * G.moveMult[getArrayIndex(G.speedNames, curSpeedName)];
      myFadePct = G.fadePct[getArrayIndex(G.speedNames, curSpeedName)];
      if (myIntensityName == "Random") {
        curIntensityName =
          G.intensityRandomNames[
            Math.floor(getRandomRange(0, G.intensityRandomNames.length))
          ];
      } else {
        curIntensityName = myIntensityName;
      }
      if (myOffsetName == "Random") {
        curOffsetName =
          G.offsetRandomNames[
            Math.floor(getRandomRange(0, G.offsetRandomNames.length))
          ];
      } else {
        curOffsetName = myOffsetName;
      }
      myOffsetTime = G.offsetTimes[getArrayIndex(G.offsetNames, curOffsetName)];
      usingSingleMarker = myTransitionMode == "Off" || curOffsetName == "Off";
      if (!doingSuperRandomIn) {
        if (doingRandomIn) {
          curAnimateInName =
            G.animateRandomPageNames[
              Math.floor(getRandomRange(0, G.animateRandomPageNames.length))
            ];
          curDirectionInName = getRandomDirection(curAnimateInName, true);
        } else {
          curAnimateInName = myAnimateInName;
          if (myDirectionInName == "Random") {
            curDirectionInName = getRandomDirection(curAnimateInName, false);
          } else {
            curDirectionInName = myDirectionInName;
          }
        }
        if (curDirectionInName == "Horizontal") {
          curDirectionInName = getRandom() < 0.5 ? "Left" : "Right";
        } else if (curDirectionInName == "Vertical") {
          curDirectionInName = getRandom() < 0.5 ? "Up" : "Down";
        } else {
          if (curDirectionInName == "Back & Forth") {
            curDirectionInName = getRandom() < 0.5 ? "Back" : "Forth";
          }
        }
      }
      if (myStyleInName == "Random") {
        curStyleInName =
          G.styleInRandomNames[
            Math.floor(getRandomRange(0, G.styleInRandomNames.length))
          ];
      } else if (myStyleInName == "Random Ease In") {
        curStyleInName =
          G.randomEaseInNames[
            Math.floor(getRandomRange(0, G.randomEaseInNames.length))
          ];
      } else if (myStyleInName == "Random Ease Out") {
        curStyleInName =
          G.randomEaseOutNames[
            Math.floor(getRandomRange(0, G.randomEaseOutNames.length))
          ];
      } else if (myStyleInName == "Random Hi Ease") {
        curStyleInName =
          G.randomHiEaseNames[
            Math.floor(getRandomRange(0, G.randomHiEaseNames.length))
          ];
      } else {
        curStyleInName = myStyleInName;
      }
      if (!doingInOutMatch) {
        if (!doingSuperRandomOut) {
          if (doingRandomOut) {
            curAnimateOutName =
              G.animateRandomPageNames[
                Math.floor(getRandomRange(0, G.animateRandomPageNames.length))
              ];
            curDirectionOutName = getRandomDirection(curAnimateOutName, true);
          } else {
            curAnimateOutName = myAnimateOutName;
            if (myDirectionOutName == "Random") {
              curDirectionOutName = getRandomDirection(
                curAnimateOutName,
                false,
              );
            } else {
              curDirectionOutName = myDirectionOutName;
            }
          }
          if (curDirectionOutName == "Horizontal") {
            curDirectionOutName = getRandom() < 0.5 ? "Left" : "Right";
          } else if (curDirectionOutName == "Vertical") {
            curDirectionOutName = getRandom() < 0.5 ? "Up" : "Down";
          } else {
            if (curDirectionOutName == "Back & Forth") {
              curDirectionOutName = getRandom() < 0.5 ? "Back" : "Forth";
            }
          }
        }
        if (myStyleOutName == "Random") {
          curStyleOutName =
            G.styleOutRandomNames[
              Math.floor(getRandomRange(0, G.styleOutRandomNames.length))
            ];
          if (curStyleOutName == "Inertia") {
            curStyleOutName = "Anticipate";
          }
        } else if (myStyleOutName == "Random Ease In") {
          curStyleOutName =
            G.randomEaseInNames[
              Math.floor(getRandomRange(0, G.randomEaseInNames.length))
            ];
        } else if (myStyleOutName == "Random Ease Out") {
          curStyleOutName =
            G.randomEaseOutNames[
              Math.floor(getRandomRange(0, G.randomEaseOutNames.length))
            ];
        } else if (myStyleOutName == "Random Hi Ease") {
          curStyleOutName =
            G.randomHiEaseNames[
              Math.floor(getRandomRange(0, G.randomHiEaseNames.length))
            ];
        } else {
          curStyleOutName = myStyleOutName;
          if (curStyleOutName == "Inertia") {
            curStyleOutName = "Anticipate";
          }
        }
      } else {
        if (!doingSuperRandomIn) {
          curAnimateOutName = curAnimateInName;
          curDirectionOutName = curDirectionInName;
        }
        switch (curStyleInName) {
          case "Ease In":
          case "Ease Out":
            curStyleOutName = "Ease In";
            break;
          case "Ease In & Out":
            curStyleOutName = "Ease In & Out";
            break;
          case "Hi Ease In":
          case "Hi Ease Out":
            curStyleOutName = "Hi Ease In";
            break;
          case "Hi Ease In & Out":
            curStyleOutName = "Hi Ease In & Out";
            break;
          case "Inertia":
          case "Anticipate":
          case "Springy":
          case "Bouncy":
            curStyleOutName = "Anticipate";
            break;
          case "Linear":
            curStyleOutName = "Linear";
            break;
          default:
            curStyleOutName = curStyleInName;
            break;
        }
      }
      switch (myHoldMode) {
        case "Constant":
          myHoldTime = myMin * myComp.frameDuration;
          break;
        case "Random":
          myHoldTime = getRandomRange(myMin, myMax) * myComp.frameDuration;
          break;
        case "Off":
          myHoldTime = 0;
          break;
        default:
          break;
      }
      myNewCompName = getUniqueCompName();
      myNewComp = app.project.items.addComp(
        myNewCompName,
        myComp.width,
        myComp.height,
        myComp.pixelAspect,
        myComp.duration,
        myComp.frameRate,
      );
      myNewComp.comment = G.compID;
      myNewComp.motionBlur = doingMotionBlur;
      myNewComp.parentFolder = myProjectFolder;
      myNewComp.hideShyLayers = true;
      myPageControl = myNewComp.layers.addNull(myNewComp.duration);
      myPageControl.startTime = 0;
      myPageControl.name =
        G.pageControlPrefix + myNewCompName.split("_")[1] + G.pageControlSuffix;
      myPageControl.source.name = myPageControl.name;
      myPageControl.comment = G.pageControlID;
      myPageControl.threeDLayer = true;
      myPageControl.label = G.controlLayerColor;
      if (doingText) {
        myTestLayer = myNewComp.layers.addText("");
        myTestLayer.startTime = 0;
        myTestSourceText = myTestLayer
          .property("ADBE Text Properties")
          .property("ADBE Text Document");
        myTestTextDoc = myTestSourceText.value;
        if (i === 0) {
          myTestTextDoc.text = "H";
          myTestSourceText.setValue(myTestTextDoc);
          myTestTextDoc = myTestSourceText.value;
          testRect = myTestLayer.sourceRectAtTime(0, false);
          yHeight = testRect.height;
          justification = myTestTextDoc.justification;
          myTestTextDoc.text = ".";
          myTestSourceText.setValue(myTestTextDoc);
          testRect = myTestLayer.sourceRectAtTime(0, false);
          baselineY = testRect.top + testRect.height;
          if (myTestTextDoc.leading !== undefined) {
            leading = myTestTextDoc.leading;
          } else {
            h1 = myTestLayer.sourceRectAtTime(0, false).height;
            myTestTextDoc.text = "H\rH";
            myTestSourceText.setValue(myTestTextDoc);
            leading = myTestLayer.sourceRectAtTime(0, false).height - h1;
          }
          myTestTextDoc.text = "";
          myTestSourceText.setValue(myTestTextDoc);
        }
        doingBracket = false;
        tempLines = "";
        multiLine = false;
        for (var j = 0; j < myLines.length; j += 1) {
          myLine = myLines[j];
          tokens = [];
          tempString = "";
          deltaY =
            (j + 1 - (myLines.length + 1) / 2) * leading -
            baselineY +
            yHeight / 2;
          switch (textUnits) {
            case "Letters":
              doingBracket = false;
              for (var k = 0; k < myLine.length; k += 1) {
                if (doingBracket) {
                  if (myLine[k] == "]") {
                    tokens.push(tempString);
                    doingBracket = false;
                  } else {
                    tempString += myLine[k];
                  }
                } else {
                  if (myLine[k] == "[") {
                    doingBracket = true;
                    tempString = "";
                  } else {
                    tokens.push(myLine[k]);
                  }
                }
              }
              break;
            case "Words":
              myLine = convertHardSpaces(myLine);
              for (var k = 0; k < myLine.length; k += 1) {
                if (myLine[k] == " ") {
                  if (tempString !== "") {
                    tokens.push(tempString);
                    tokens.push(" ");
                    tempString = "";
                  }
                } else {
                  tempString += myLine[k];
                }
              }
              if (tempString !== "") {
              }
              tokens.push(tempString);
              break;
            case "Lines":
              if (doingBracket) {
                if (myLine[myLine.length - 1] == "}") {
                  tempLines += "\r" + myLine.substr(0, myLine.length - 1);
                  numLines++;
                  tokens.push(tempLines);
                  tempLines = "";
                  doingBracket = false;
                } else {
                  tempLines += "\r" + myLine;
                  numLines++;
                  if (j == myLines.length - 1) {
                    tokens.push(tempLines);
                    tempLines = "";
                    doingBracket = false;
                  }
                }
              } else {
                if (myLine[0] == "{") {
                  if (myLine[myLine.length - 1] == "}") {
                    tokens.push(myLine.substr(1, myLine.length - 2));
                  } else {
                    multiLine = true;
                    numLines = 1;
                    tempLines = myLine.substr(1);
                    doingBracket = true;
                  }
                } else {
                  tokens.push(myLine);
                }
              }
              break;
            default:
              break;
          }
          myTestTextDoc.text = "";
          myTestSourceText.setValue(myTestTextDoc);
          myLayers = [];
          myCumWidths = [];
          for (var k = 0; k < tokens.length; k += 1) {
            myToken = tokens[k];
            myTestTextDoc.text += myToken;
            myTestSourceText.setValue(myTestTextDoc);
            if (strip(convertTabsToSpaces(myToken)) === "") {
              continue;
            }
            myLayer = myNewComp.layers.addText(myToken);
            myLayer.moveAfter(myPageControl);
            myLayer.name = myToken;
            myLayer.startTime = 0;
            myLayer.comment = G.textLayerID;
            myLayer.label = G.textLayerColor;
            myLayer.motionBlur = doingMotionBlur;
            myLayer.shy = true;
            if (doingColorPalette) {
              mySourceText = myLayer
                .property("ADBE Text Properties")
                .property("ADBE Text Document");
              myTextDoc = mySourceText.value;
              myTextDoc.fillColor = fillColorArray[i % fillColorArray.length];
              mySourceText.setValue(myTextDoc);
            }
            testRect = myTestLayer.sourceRectAtTime(0, false);
            myCumWidths.push(testRect.width);
            myLayers.push(myLayer);
            myPageLayers.push(myLayer);
          }
          testRect = myTestLayer.sourceRectAtTime(0, false);
          testPos = myTestLayer.property("Position").value;
          if (justification == ParagraphJustification.LEFT_JUSTIFY) {
            testLeftEdge = testPos[0] + testRect.left;
            deltaX = myComp.width * 0.1 - testLeftEdge;
            myTestLayer
              .property("Position")
              .setValue([testPos[0] + deltaX, testPos[1]]);
          } else {
            if (justification == ParagraphJustification.RIGHT_JUSTIFY) {
              testRightEdge = testPos[0] + testRect.left + testRect.width;
              deltaX = myComp.width * 0.9 - testRightEdge;
              myTestLayer
                .property("Position")
                .setValue([testPos[0] + deltaX, testPos[1]]);
            }
          }
          testLeftEdge =
            myTestLayer.property("Position").value[0] + testRect.left;
          for (var k = 0; k < myLayers.length; k += 1) {
            myLayer = myLayers[k];
            myRect = myLayer.sourceRectAtTime(0, false);
            testRightEdge = testLeftEdge + myCumWidths[k];
            myPos = myLayer.property("Position").value;
            myRightEdge = myPos[0] + myRect.left + myRect.width;
            if (multiLine) {
              deltaY -= (numLines - 1) * leading;
              multiLine = false;
            }
            myLayer
              .property("Position")
              .setValue([
                myPos[0] - (myRightEdge - testRightEdge),
                myPos[1] + deltaY,
              ]);
            adjustAnchor(myLayer, "Center");
            myLayer.threeDLayer = true;
            myLayer.selected = false;
          }
        }
        myTestLayer.remove();
      } else {
        for (j = myPages[i].length - 1; j >= 0; j--) {
          myPages[i][j].copyToComp(myNewComp);
          myNewLayer = myNewComp.layer(1);
          if (myNewLayer.canSetCollapseTransformation) {
            if (!(myNewLayer.source instanceof CompItem)) {
              myNewLayer.collapseTransformation = true;
            }
          }
          myNewLayer.startTime = myNewLayer.startTime - myNewLayer.inPoint;
          myNewLayer.moveToEnd();
          myNewLayer.comment = G.userLayerID;
          if (doingColorPalette && !myNewLayer.canSetTimeRemapEnabled) {
            myFill = myNewLayer
              .property("ADBE Effect Parade")
              .addProperty("ADBE Fill");
            myFill
              .property("ADBE Fill-0002")
              .setValue(fillColorArray[i % fillColorArray.length]);
          }
          myNewLayer.motionBlur = doingMotionBlur;
          myNewLayer.shy = true;
          adjustAnchor(myNewLayer, "Center");
          myNewLayer.threeDLayer = true;
          myNewLayer.selected = false;
          myPageLayers.unshift(myNewLayer);
          if (j !== 0) {
            myIntersectionControlLayer = myNewComp.layers.addSolid(
              [1, 1, 1],
              myNewLayer.name + " (int)",
              myNewComp.width,
              myNewComp.height,
              1,
              myNewComp.duration,
            );
            myIntersectionControlLayer.comment = G.intersectionControlLayerID;
            myIntersectionControlLayer.label = G.intersectionControlLayerColor;
            myIntersectionControlLayer.adjustmentLayer = true;
            myIntersectionControlLayer.moveAfter(myNewLayer);
            myIntersectionControlLayer.shy = true;
            myIntersectionControlLayer.selected = false;
            myIntersectionControlLayer.locked = true;
          }
        }
      }
      tCur = 0;
      for (var j = 1; j <= myPageLayers.length; j += 1) {
        myMarkerVal.comment = "" + j;
        if (doingTransitionIn) {
          if (curAnimateInName == "Off") {
            if (doingFadeIn) {
              myMarkerVal.duration = myHoldTime + myFadePct * mySpeedDur;
            } else {
              myMarkerVal.duration = myHoldTime;
            }
          } else {
            myMarkerVal.duration = myHoldTime + mySpeedDur;
          }
        } else {
          myMarkerVal.duration = myHoldTime;
        }
        myPageControl.property("Marker").setValueAtTime(tCur, myMarkerVal);
        lastMarkerTime = tCur;
        if (myPageLayers.length == 1 || usingSingleMarker) {
          break;
        }
        tCur += myOffsetTime / (myPageLayers.length - 1);
      }
      if (curLayerOrderName == "Random") {
        randomMarkerArray = [];
        for (var j = 0; j < myPageLayers.length; j += 1) {
          randomMarkerArray[j] = j + 1;
        }
        for (var j = 0; j < randomMarkerArray.length; j += 1) {
          tempIdx = randomMarkerArray[j];
          randIdx =
            j + Math.floor(getRandomRange(0, randomMarkerArray.length - j));
          randomMarkerArray[j] = randomMarkerArray[randIdx];
          randomMarkerArray[randIdx] = tempIdx;
        }
      }
      for (var j = 0; j < myPageLayers.length; j += 1) {
        myLayer = myPageLayers[j];
        if (usingSingleMarker) {
          curMarkerIdx = 1;
        } else if (curLayerOrderName == "Top") {
          curMarkerIdx = j + 1;
        } else if (curLayerOrderName == "Bottom") {
          curMarkerIdx = myPageLayers.length - j;
        } else {
          curMarkerIdx = randomMarkerArray[j];
        }
        myTempHeaderExpr =
          '_L_ = thisComp.layer("' +
          myPageControl.name +
          '");\r' +
          "_m_ = _L_.marker;\r" +
          '_t_ = _m_.key("' +
          curMarkerIdx.toString() +
          '").time;\r' +
          '_tHold_ = _t_ +_m_.key("' +
          curMarkerIdx.toString() +
          '").duration;\r';
        if (doingSuperRandomIn) {
          curAnimateInName =
            G.animateRandomNames[
              Math.floor(getRandomRange(0, G.animateRandomNames.length))
            ];
          curDirectionInName = getRandomDirection(curAnimateInName, true);
          if (doingInOutMatch) {
            curAnimateOutName = curAnimateInName;
            curDirectionOutName = curDirectionInName;
          }
        }
        if (!doingInOutMatch && doingSuperRandomOut) {
          curAnimateOutName =
            G.animateRandomNames[
              Math.floor(getRandomRange(0, G.animateRandomNames.length))
            ];
          curDirectionOutName = getRandomDirection(curAnimateOutName, true);
        }
        if (!doingRandomIn && !doingSuperRandomIn) {
          if (myDirectionInName == "Random by Layer") {
            curDirectionInName = getRandomDirection(curAnimateInName, false);
            if (doingInOutMatch) {
              curDirectionOutName = curDirectionInName;
            }
          }
        }
        if (!doingInOutMatch && !doingRandomOut && !doingSuperRandomOut) {
          if (myDirectionOutName == "Random by Layer") {
            curDirectionOutName = getRandomDirection(curAnimateOutName, false);
          }
        }
        if (myIntensityName == "Random by Layer") {
          curIntensityName =
            G.intensityRandomNames[
              Math.floor(getRandomRange(0, G.intensityRandomNames.length))
            ];
        }
        myIntensityIdx = getArrayIndex(G.intensityNames, curIntensityName);
        if (myStyleInName == "Random by Layer") {
          curStyleInName =
            G.styleInRandomNames[
              Math.floor(getRandomRange(0, G.styleInRandomNames.length))
            ];
          if (doingInOutMatch) {
            switch (curStyleInName) {
              case "Ease Out":
                curStyleOutName = "Ease In";
                break;
              case "Hi Ease Out":
                curStyleOutName = "Hi Ease Out";
                break;
              case "Inertia":
              case "Anticipate":
              case "Springy":
              case "Bouncy":
                curStyleOutName = "Anticipate";
                break;
              case "Linear":
                curStyleOutName = "Linear";
                break;
              default:
                curStyleOutName = curStyleInName;
                break;
            }
          }
        }
        if (!doingInOutMatch && myStyleOutName == "Random by Layer") {
          curStyleOutName =
            G.styleOutRandomNames[
              Math.floor(getRandomRange(0, G.styleOutRandomNames.length))
            ];
          if (curStyleOutName == "Inertia") {
            curStyleOutName = "Anticipate";
          }
        }
        tempExpr = getOpacityExpr(
          myTempHeaderExpr,
          doingTransitionIn,
          doingTransitionOut,
          curAnimateInName,
          curAnimateOutName,
          doingFadeIn,
          doingFadeOut,
          myHoldTime,
          myFadePct,
          mySpeedDur,
        );
        if (tempExpr !== "") {
          myLayer.property("Opacity").expression =
            G.exprHeader + obfuscateExpr(tempExpr, oTable);
        }
        if (doingTransitionIn) {
          switch (curAnimateInName) {
            case "Slide":
              if (doingTransitionOut) {
                usingSameEase = curStyleInName == curStyleOutName;
                switch (curAnimateOutName) {
                  case "Slide":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    myEaseFunctionExpr2 = usingSameEase
                      ? ""
                      : getEaseFunctionExpr(curStyleOutName, "2");
                    tempExpr =
                      myEaseFunctionExpr +
                      myEaseFunctionExpr2 +
                      myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    switch (curDirectionInName) {
                      case "Left":
                        V1 = [myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V1 = [-myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V1 = [0, myMoveAmt, 0];
                        break;
                      case "Down":
                        V1 = [0, -myMoveAmt, 0];
                        break;
                      case "Back":
                        V1 = [0, 0, -myMoveAmt * 2];
                        break;
                      case "Forth":
                        V1 = [0, 0, myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    V2 = [0, 0, 0];
                    switch (curDirectionOutName) {
                      case "Left":
                        V3 = [-myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V3 = [myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V3 = [0, -myMoveAmt, 0];
                        break;
                      case "Down":
                        V3 = [0, myMoveAmt, 0];
                        break;
                      case "Back":
                        V3 = [0, 0, myMoveAmt * 2];
                        break;
                      case "Forth":
                        V3 = [0, 0, -myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    tempExpr +=
                      "if (time < _t_+" +
                      mySpeedDur +
                      "){\r" +
                      "  _myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");\r" +
                      "}else{\r" +
                      "  " +
                      usingSameEase
                        ? "_myEase_ "
                        : "_myEase2_" +
                          "(time,_tHold_,_tHold_+" +
                          mySpeedDur +
                          ",value+" +
                          V2.toSource() +
                          ",value+" +
                          V3.toSource() +
                          ");\r" +
                          "}";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Scale":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    switch (curDirectionInName) {
                      case "Left":
                        V1 = [myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V1 = [-myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V1 = [0, myMoveAmt, 0];
                        break;
                      case "Down":
                        V1 = [0, -myMoveAmt, 0];
                        break;
                      case "Back":
                        V1 = [0, 0, -myMoveAmt * 2];
                        break;
                      case "Forth":
                        V1 = [0, 0, myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    V2 = [0, 0, 0];
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionOutName == "Up") {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value*" +
                      V1 +
                      ");";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "X Swing CW":
                  case "X Swing CCW":
                    rro = curAnimateOutName == "X Swing CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      adjustAnchor(myLayer, curDirectionOutName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    switch (curDirectionInName) {
                      case "Left":
                        V1 = [myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V1 = [-myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V1 = [0, myMoveAmt, 0];
                        break;
                      case "Down":
                        V1 = [0, -myMoveAmt, 0];
                        break;
                      case "Back":
                        V1 = [0, 0, -myMoveAmt * 2];
                        break;
                      case "Forth":
                        V1 = [0, 0, myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    V2 = [0, 0, 0];
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Y Flip CW":
                  case "Y Flip CCW":
                    rro = curAnimateOutName == "Y Flip CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      adjustAnchor(myLayer, curDirectionOutName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    switch (curDirectionInName) {
                      case "Left":
                        V1 = [myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V1 = [-myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V1 = [0, myMoveAmt, 0];
                        break;
                      case "Down":
                        V1 = [0, -myMoveAmt, 0];
                        break;
                      case "Back":
                        V1 = [0, 0, -myMoveAmt * 2];
                        break;
                      case "Forth":
                        V1 = [0, 0, myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    V2 = [0, 0, 0];
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Z Spin CW":
                  case "Z Spin CCW":
                    rro = curAnimateOutName == "Z Spin CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      adjustAnchor(myLayer, curDirectionOutName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    switch (curDirectionInName) {
                      case "Left":
                        V1 = [myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V1 = [-myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V1 = [0, myMoveAmt, 0];
                        break;
                      case "Down":
                        V1 = [0, -myMoveAmt, 0];
                        break;
                      case "Back":
                        V1 = [0, 0, -myMoveAmt * 2];
                        break;
                      case "Forth":
                        V1 = [0, 0, myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    V2 = [0, 0, 0];
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Off":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    switch (curDirectionInName) {
                      case "Left":
                        V1 = [myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V1 = [-myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V1 = [0, myMoveAmt, 0];
                        break;
                      case "Down":
                        V1 = [0, -myMoveAmt, 0];
                        break;
                      case "Back":
                        V1 = [0, 0, -myMoveAmt * 2];
                        break;
                      case "Forth":
                        V1 = [0, 0, myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    V2 = [0, 0, 0];
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  default:
                    break;
                }
              } else {
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleInName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                switch (curDirectionInName) {
                  case "Left":
                    V1 = [myMoveAmt, 0, 0];
                    break;
                  case "Right":
                    V1 = [-myMoveAmt, 0, 0];
                    break;
                  case "Up":
                    V1 = [0, myMoveAmt, 0];
                    break;
                  case "Down":
                    V1 = [0, -myMoveAmt, 0];
                    break;
                  case "Back":
                    V1 = [0, 0, -myMoveAmt * 2];
                    break;
                  case "Forth":
                    V1 = [0, 0, myMoveAmt * 2];
                    break;
                  default:
                    break;
                }
                V2 = [0, 0, 0];
                tempExpr +=
                  "_myEase_(time,_t_,_t_+" +
                  mySpeedDur +
                  ",value+" +
                  V1.toSource() +
                  ",value+" +
                  V2.toSource() +
                  ");";
                myLayer.property("Position").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
              }
              break;
            case "Scale":
              if (doingTransitionOut) {
                usingSameEase = curStyleInName == curStyleOutName;
                switch (curAnimateOutName) {
                  case "Slide":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionInName == "Up") {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value*" +
                      V1 +
                      ",value);";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    V1 = [0, 0, 0];
                    switch (curDirectionOutName) {
                      case "Left":
                        V2 = [-myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V2 = [myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V2 = [0, -myMoveAmt, 0];
                        break;
                      case "Down":
                        V2 = [0, myMoveAmt, 0];
                        break;
                      case "Back":
                        V2 = [0, 0, myMoveAmt * 2];
                        break;
                      case "Forth":
                        V2 = [0, 0, -myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Scale":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    myEaseFunctionExpr2 = usingSameEase
                      ? ""
                      : getEaseFunctionExpr(curStyleOutName, "2");
                    tempExpr =
                      myEaseFunctionExpr +
                      myEaseFunctionExpr2 +
                      myTempHeaderExpr;
                    if (curDirectionInName == "Up") {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    }
                    if (curDirectionOutName == "Up") {
                      V3 = G.scaleDownVals[myIntensityIdx];
                    } else {
                      V3 = G.scaleUpVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "if (time < _t_+" +
                      mySpeedDur +
                      "){\r" +
                      "  _myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value*" +
                      V1 +
                      ",value);\r" +
                      "}else{\r" +
                      "  " +
                      usingSameEase
                        ? "_myEase_ "
                        : "_myEase2_" +
                          "(time,_tHold_,_tHold_+" +
                          mySpeedDur +
                          ",value,value*" +
                          V3 +
                          ");\r" +
                          "}";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "X Swing CW":
                  case "X Swing CCW":
                    rro = curAnimateOutName == "X Swing CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      if (curDirectionOutName == "Top") {
                        myAdj = [
                          myCurRect.left + myCurRect.width / 2,
                          myCurRect.top,
                        ];
                      } else {
                        myAdj = [
                          myCurRect.left + myCurRect.width / 2,
                          myCurRect.top + myCurRect.height,
                        ];
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionInName == "Up") {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value*" +
                      V1 +
                      ",value);";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Y Flip CW":
                  case "Y Flip CCW":
                    rro = curAnimateOutName == "Y Flip CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      if (curDirectionOutName == "Left") {
                        myAdj = [
                          myCurRect.left,
                          myCurRect.top + myCurRect.height / 2,
                        ];
                      } else {
                        myAdj = [
                          myCurRect.left + myCurRect.width,
                          myCurRect.top + myCurRect.height / 2,
                        ];
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionInName == "Up") {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value*" +
                      V1 +
                      ",value);";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Z Spin CW":
                  case "Z Spin CCW":
                    rro = curAnimateOutName == "Z Spin CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Left":
                          myAdj = [
                            myCurRect.left,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Right":
                          myAdj = [
                            myCurRect.left + myCurRect.width,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Top":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top,
                          ];
                          break;
                        case "Bottom":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionInName == "Up") {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value*" +
                      V1 +
                      ",value);";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Off":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionInName == "Up") {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value*" +
                      V1 +
                      ",value);";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  default:
                    break;
                }
              } else {
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleInName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                if (curDirectionInName == "Up") {
                  V1 = G.scaleUpVals[myIntensityIdx];
                } else {
                  V1 = G.scaleDownVals[myIntensityIdx];
                }
                tempExpr +=
                  "_myEase_(time,_t_,_t_+" +
                  mySpeedDur +
                  ",value*" +
                  V1 +
                  ",value);";
                myLayer.property("Scale").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
              }
              break;
            case "X Swing CW":
            case "X Swing CCW":
              rri = curAnimateInName == "X Swing CW" ? 1 : -1;
              if (doingTransitionOut) {
                usingSameEase = curStyleInName == curStyleOutName;
                switch (curAnimateOutName) {
                  case "Slide":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    V1 = [0, 0, 0];
                    switch (curDirectionOutName) {
                      case "Left":
                        V2 = [-myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V2 = [myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V2 = [0, -myMoveAmt, 0];
                        break;
                      case "Down":
                        V2 = [0, myMoveAmt, 0];
                        break;
                      case "Back":
                        V2 = [0, 0, myMoveAmt * 2];
                        break;
                      case "Forth":
                        V2 = [0, 0, -myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Scale":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    if (curDirectionInName != "Center") {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      myAdj = [
                        myCurRect.left + myCurRect.width / 2,
                        myCurRect.top + myCurRect.height / 2,
                      ];
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionOutName == "Up") {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value*" +
                      V1 +
                      ");";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "X Swing CW":
                  case "X Swing CCW":
                    rro = curAnimateOutName == "X Swing CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Top":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top,
                          ];
                          break;
                        case "Bottom":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    myEaseFunctionExpr2 = usingSameEase
                      ? ""
                      : getEaseFunctionExpr(curStyleOutName, "2");
                    tempExpr =
                      myEaseFunctionExpr +
                      myEaseFunctionExpr2 +
                      myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    V3 = myMoveAmt;
                    tempExpr +=
                      "if (time < _t_+" +
                      mySpeedDur +
                      "){\r" +
                      "  _myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);\r" +
                      "}else{\r" +
                      "  " +
                      usingSameEase
                        ? "_myEase_ "
                        : "_myEase2_" +
                          "(time,_tHold_,_tHold_+" +
                          mySpeedDur +
                          ",value,value+" +
                          V3 * rro +
                          ");\r" +
                          "}";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Y Flip CW":
                  case "Y Flip CCW":
                    rro = curAnimateOutName == "Y Flip CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Left":
                          myAdj = [
                            myCurRect.left,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Right":
                          myAdj = [
                            myCurRect.left + myCurRect.width,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Z Spin CW":
                  case "Z Spin CCW":
                    rro = curAnimateOutName == "Z Spin CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Left":
                          myAdj = [
                            myCurRect.left,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Right":
                          myAdj = [
                            myCurRect.left + myCurRect.width,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Top":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top,
                          ];
                          break;
                        case "Bottom":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Off":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  default:
                    break;
                }
              } else {
                if (curDirectionInName != "Center") {
                  adjustAnchor(myLayer, curDirectionInName);
                }
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleInName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.swingVals[myIntensityIdx];
                V1 = -myMoveAmt;
                tempExpr +=
                  "_myEase_(time,_t_,_t_+" +
                  mySpeedDur +
                  ",value+" +
                  V1 * rri +
                  ",value);";
                myLayer.property("X Rotation").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
              }
              break;
            case "Y Flip CW":
            case "Y Flip CCW":
              rri = curAnimateInName == "Y Flip CW" ? 1 : -1;
              if (doingTransitionOut) {
                usingSameEase = curStyleInName == curStyleOutName;
                switch (curAnimateOutName) {
                  case "Slide":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    V1 = [0, 0, 0];
                    switch (curDirectionOutName) {
                      case "Left":
                        V2 = [-myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V2 = [myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V2 = [0, -myMoveAmt, 0];
                        break;
                      case "Down":
                        V2 = [0, myMoveAmt, 0];
                        break;
                      case "Back":
                        V2 = [0, 0, myMoveAmt * 2];
                        break;
                      case "Forth":
                        V2 = [0, 0, -myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Scale":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    if (curDirectionInName != "Center") {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      myAdj = [
                        myCurRect.left + myCurRect.width / 2,
                        myCurRect.top + myCurRect.height / 2,
                      ];
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionOutName == "Up") {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value*" +
                      V1 +
                      ");";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "X Swing CW":
                  case "X Swing CCW":
                    rro = curAnimateOutName == "X Swing CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Top":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top,
                          ];
                          break;
                        case "Bottom":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Y Flip CW":
                  case "Y Flip CCW":
                    rro = curAnimateOutName == "Y Flip CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Left":
                          myAdj = [
                            myCurRect.left,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Right":
                          myAdj = [
                            myCurRect.left + myCurRect.width,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    myEaseFunctionExpr2 = usingSameEase
                      ? ""
                      : getEaseFunctionExpr(curStyleOutName, "2");
                    tempExpr =
                      myEaseFunctionExpr +
                      myEaseFunctionExpr2 +
                      myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    V3 = myMoveAmt;
                    tempExpr +=
                      "if (time < _t_+" +
                      mySpeedDur +
                      "){\r" +
                      "  _myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);\r" +
                      "}else{\r" +
                      "  " +
                      usingSameEase
                        ? "_myEase_ "
                        : "_myEase2_" +
                          "(time,_tHold_,_tHold_+" +
                          mySpeedDur +
                          ",value,value+" +
                          V3 * rro +
                          ");\r" +
                          "}";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Z Spin CW":
                  case "Z Spin CCW":
                    rro = curAnimateOutName == "Z Spin CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Left":
                          myAdj = [
                            myCurRect.left,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Right":
                          myAdj = [
                            myCurRect.left + myCurRect.width,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Top":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top,
                          ];
                          break;
                        case "Bottom":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Off":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  default:
                    break;
                }
              } else {
                if (curDirectionInName != "Center") {
                  adjustAnchor(myLayer, curDirectionInName);
                }
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleInName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.flipVals[myIntensityIdx];
                V1 = -myMoveAmt;
                tempExpr +=
                  "_myEase_(time,_t_,_t_+" +
                  mySpeedDur +
                  ",value+" +
                  V1 * rri +
                  ",value);";
                myLayer.property("Y Rotation").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
              }
              break;
            case "Z Spin CW":
            case "Z Spin CCW":
              rri = curAnimateInName == "Z Spin CW" ? 1 : -1;
              if (doingTransitionOut) {
                usingSameEase = curStyleInName == curStyleOutName;
                switch (curAnimateOutName) {
                  case "Slide":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    V1 = [0, 0, 0];
                    switch (curDirectionOutName) {
                      case "Left":
                        V2 = [-myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V2 = [myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V2 = [0, -myMoveAmt, 0];
                        break;
                      case "Down":
                        V2 = [0, myMoveAmt, 0];
                        break;
                      case "Back":
                        V2 = [0, 0, myMoveAmt * 2];
                        break;
                      case "Forth":
                        V2 = [0, 0, -myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Scale":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    if (curDirectionInName != "Center") {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      myAdj = [
                        myCurRect.left + myCurRect.width / 2,
                        myCurRect.top + myCurRect.height / 2,
                      ];
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionOutName == "Up") {
                      V1 = G.scaleDownVals[myIntensityIdx];
                    } else {
                      V1 = G.scaleUpVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value*" +
                      V1 +
                      ");";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "X Swing":
                  case "X Swing CCW":
                    rro = curAnimateOutName == "X Swing CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Top":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top,
                          ];
                          break;
                        case "Bottom":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Y Flip CW":
                  case "Y Flip CCW":
                    rro = curAnimateOutName == "Y Flip CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Left":
                          myAdj = [
                            myCurRect.left,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Right":
                          myAdj = [
                            myCurRect.left + myCurRect.width,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Z Spin CW":
                  case "Z Spin CCW":
                    rro = curAnimateOutName == "Z Spin CW" ? 1 : -1;
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    if (curDirectionInName != curDirectionOutName) {
                      myOldAP = myLayer.property("Anchor Point").value;
                      myCurRect = myLayer.sourceRectAtTime(0, false);
                      switch (curDirectionOutName) {
                        case "Center":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Left":
                          myAdj = [
                            myCurRect.left,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Right":
                          myAdj = [
                            myCurRect.left + myCurRect.width,
                            myCurRect.top + myCurRect.height / 2,
                          ];
                          break;
                        case "Top":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top,
                          ];
                          break;
                        case "Bottom":
                          myAdj = [
                            myCurRect.left + myCurRect.width / 2,
                            myCurRect.top + myCurRect.height,
                          ];
                          break;
                        default:
                          break;
                      }
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  " +
                        myAdj.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Anchor Point").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                      tempExpr = myTempHeaderExpr;
                      tempExpr +=
                        "if (time < _tHold_){\r  value;\r}else{\r  value+" +
                        myAdj.toSource() +
                        "-" +
                        myOldAP.toSource() +
                        ";\r" +
                        "}";
                      myLayer.property("Position").expression =
                        G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    myEaseFunctionExpr2 = usingSameEase
                      ? ""
                      : getEaseFunctionExpr(curStyleOutName, "2");
                    tempExpr =
                      myEaseFunctionExpr +
                      myEaseFunctionExpr2 +
                      myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    V3 = myMoveAmt;
                    tempExpr +=
                      "if (time < _t_+" +
                      mySpeedDur +
                      "){\r" +
                      "  _myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);\r" +
                      "}else{\r" +
                      "  " +
                      usingSameEase
                        ? "_myEase_ "
                        : "_myEase2_" +
                          "(time,_tHold_,_tHold_+" +
                          mySpeedDur +
                          ",value,value+" +
                          V3 * rro +
                          ");\r" +
                          "}";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Off":
                    if (curDirectionInName != "Center") {
                      adjustAnchor(myLayer, curDirectionInName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleInName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = -myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_t_,_t_+" +
                      mySpeedDur +
                      ",value+" +
                      V1 * rri +
                      ",value);";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  default:
                    break;
                }
              } else {
                if (curDirectionInName != "Center") {
                  adjustAnchor(myLayer, curDirectionInName);
                }
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleInName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.spinVals[myIntensityIdx];
                V1 = -myMoveAmt;
                tempExpr +=
                  "_myEase_(time,_t_,_t_+" +
                  mySpeedDur +
                  ",value+" +
                  V1 * rri +
                  ",value);";
                myLayer.property("Z Rotation").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
              }
              break;
            case "Off":
              if (doingTransitionOut) {
                switch (curAnimateOutName) {
                  case "Slide":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt =
                      G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                    V1 = [0, 0, 0];
                    switch (curDirectionOutName) {
                      case "Left":
                        V2 = [-myMoveAmt, 0, 0];
                        break;
                      case "Right":
                        V2 = [myMoveAmt, 0, 0];
                        break;
                      case "Up":
                        V2 = [0, -myMoveAmt, 0];
                        break;
                      case "Down":
                        V2 = [0, myMoveAmt, 0];
                        break;
                      case "Back":
                        V2 = [0, 0, myMoveAmt * 2];
                        break;
                      case "Forth":
                        V2 = [0, 0, -myMoveAmt * 2];
                        break;
                      default:
                        break;
                    }
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value+" +
                      V1.toSource() +
                      ",value+" +
                      V2.toSource() +
                      ");";
                    myLayer.property("Position").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Scale":
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    if (curDirectionOutName == "Up") {
                      V3 = G.scaleDownVals[myIntensityIdx];
                    } else {
                      V3 = G.scaleUpVals[myIntensityIdx];
                    }
                    tempExpr +=
                      "_myEase_ (time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value*" +
                      V3 +
                      ");";
                    myLayer.property("Scale").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "X Swing CW":
                  case "X Swing CCW":
                    rro = curAnimateOutName == "X Swing CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      adjustAnchor(myLayer, curDirectionOutName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.swingVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("X Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Y Flip CW":
                  case "Y Flip CCW":
                    rro = curAnimateOutName == "Y Flip CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      adjustAnchor(myLayer, curDirectionOutName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.flipVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Y Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Z Spin CW":
                  case "Z Spin CCW":
                    rro = curAnimateOutName == "Z Spin CW" ? 1 : -1;
                    if (curDirectionOutName != "Center") {
                      adjustAnchor(myLayer, curDirectionOutName);
                    }
                    myEaseFunctionExpr = getEaseFunctionExpr(
                      curStyleOutName,
                      "",
                    );
                    tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                    myMoveAmt = G.spinVals[myIntensityIdx];
                    V1 = myMoveAmt;
                    tempExpr +=
                      "_myEase_(time,_tHold_,_tHold_+" +
                      mySpeedDur +
                      ",value,value+" +
                      V1 * rro +
                      ");";
                    myLayer.property("Z Rotation").expression =
                      G.exprHeader + obfuscateExpr(tempExpr, oTable);
                    break;
                  case "Off":
                    break;
                  default:
                    break;
                }
              }
              break;
            default:
              break;
          }
        } else {
          if (doingTransitionOut) {
            switch (curAnimateOutName) {
              case "Slide":
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleOutName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.slideValFactors[myIntensityIdx] * myCompMoveAmt;
                V2 = [0, 0, 0];
                switch (curDirectionOutName) {
                  case "Left":
                    V3 = [-myMoveAmt, 0, 0];
                    break;
                  case "Right":
                    V3 = [myMoveAmt, 0, 0];
                    break;
                  case "Up":
                    V3 = [0, -myMoveAmt, 0];
                    break;
                  case "Down":
                    V3 = [0, myMoveAmt, 0];
                    break;
                  case "Back":
                    V3 = [0, 0, myMoveAmt * 2];
                    break;
                  case "Forth":
                    V3 = [0, 0, -myMoveAmt * 2];
                    break;
                  default:
                    break;
                }
                tempExpr +=
                  "_myEase_ (time,_tHold_,_tHold_+" +
                  mySpeedDur +
                  ",value+" +
                  V2.toSource() +
                  ",value+" +
                  V3.toSource() +
                  ");";
                myLayer.property("Position").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
                break;
              case "Scale":
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleOutName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                if (curDirectionOutName == "Up") {
                  V1 = G.scaleDownVals[myIntensityIdx];
                } else {
                  V1 = G.scaleUpVals[myIntensityIdx];
                }
                tempExpr +=
                  "_myEase_ (time,_tHold_,_tHold_+" +
                  mySpeedDur +
                  ",value,value*" +
                  V1 +
                  ");";
                myLayer.property("Scale").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
                break;
              case "X Swing CW":
              case "X Swing CCW":
                rro = curAnimateOutName == "X Swing CW" ? 1 : -1;
                if (curDirectionOutName != "Center") {
                  adjustAnchor(myLayer, curDirectionOutName);
                }
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleOutName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.swingVals[myIntensityIdx];
                V1 = myMoveAmt;
                tempExpr +=
                  "_myEase_(time,_tHold_,_tHold_+" +
                  mySpeedDur +
                  ",value,value+" +
                  V1 * rro +
                  ");";
                myLayer.property("X Rotation").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
                break;
              case "Y Flip CW":
              case "Y Flip CCW":
                rro = curAnimateOutName == "Y Flip CW" ? 1 : -1;
                if (curDirectionOutName != "Center") {
                  adjustAnchor(myLayer, curDirectionOutName);
                }
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleOutName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.flipVals[myIntensityIdx];
                V1 = myMoveAmt;
                tempExpr +=
                  "_myEase_(time,_tHold_,_tHold_+" +
                  mySpeedDur +
                  ",value,value+" +
                  V1 * rro +
                  ");";
                myLayer.property("Y Rotation").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
                break;
              case "Z Spin CW":
              case "Z Spin CCW":
                rro = curAnimateOutName == "Z Spin CW" ? 1 : -1;
                if (curDirectionOutName != "Center") {
                  adjustAnchor(myLayer, curDirectionOutName);
                }
                myEaseFunctionExpr = getEaseFunctionExpr(curStyleOutName, "");
                tempExpr = myEaseFunctionExpr + myTempHeaderExpr;
                myMoveAmt = G.spinVals[myIntensityIdx];
                V1 = myMoveAmt;
                tempExpr +=
                  "_myEase_(time,_tHold_,_tHold_+" +
                  mySpeedDur +
                  ",value,value+" +
                  V1 * rro +
                  ");";
                myLayer.property("Z Rotation").expression =
                  G.exprHeader + obfuscateExpr(tempExpr, oTable);
                break;
              case "Off":
                break;
              default:
                break;
            }
          }
        }
        myLayer.parent = myPageControl;
      }
      if (lastMarkerTime !== null) {
        if (doingTransitionOut) {
          trimCompDur = lastMarkerTime;
          if (doingTransitionIn) {
            if (curAnimateInName != "Off") {
              trimCompDur += mySpeedDur;
            } else {
              if (doingFadeIn) {
                trimCompDur += myFadePct * mySpeedDur;
              }
            }
          }
          trimCompDur += myHoldTime;
          if (curAnimateOutName != "Off") {
            trimCompDur += mySpeedDur;
          } else {
            if (doingFadeOut) {
              trimCompDur += myFadePct * mySpeedDur;
            }
          }
        } else if (doingTransitionIn) {
          trimCompDur = lastMarkerTime + myHoldTime;
          if (curAnimateInName != "Off") {
            trimCompDur += mySpeedDur;
          } else {
            if (doingFadeIn) {
              trimCompDur += myFadePct * mySpeedDur;
            }
          }
        } else {
          trimCompDur = lastMarkerTime + myHoldTime;
        }
        myNewComp.duration = trimCompDur + myNewComp.frameDuration;
      }
      if (randomizingTiming) {
        for (var j = 1; j <= myNewComp.numLayers; j += 1) {
          if (
            myNewComp.layer(j).comment == G.userLayerID &&
            myNewComp.layer(j).canSetTimeRemapEnabled
          ) {
            if (
              myNewComp.layer(j).outPoint >
              myNewComp.duration + myNewComp.frameDuration
            ) {
              myTimeOffset =
                getRandom() *
                (myNewComp.layer(j).outPoint - myNewComp.duration);
              myNewComp.layer(j).startTime =
                myNewComp.layer(j).startTime - myTimeOffset;
            }
          }
        }
      }
      var myPageLayer = myComp.layers.add(myNewComp);
      myPageLayer.moveToBeginning();
      if (doingSequence) {
        if (prevPageLayer === null) {
          myPageLayer.startTime = 0;
        } else {
          if (
            (doingTransitionIn && curAnimateInName != "Off") ||
            (doingTransitionOut && curAnimateOutName != "Off")
          ) {
            myPageLayer.startTime =
              prevPageLayer.outPoint -
              myComp.frameDuration +
              myOverlapPct * mySpeedDur;
          } else if (doingFadeIn || doingFadeOut) {
            myPageLayer.startTime =
              prevPageLayer.outPoint -
              myComp.frameDuration -
              myFadePct * mySpeedDur;
          } else {
            myPageLayer.startTime =
              prevPageLayer.outPoint - myComp.frameDuration;
          }
        }
        prevPageLayer = myPageLayer;
      } else if (doingMarkerSync && !doingRetimePages) {
        myPageLayer.startTime = markerSyncLayer
          .property("Marker")
          .keyTime(i + 1);
      } else {
        myPageLayer.startTime = 0;
      }
      myPageLayer.label = G.pageLayerColor;
      myPageLayer.comment = G.pageLayerID;
      myPageCompLayers.push(myPageLayer);
    }
    if (doingRetimePages) {
      var myLayerIDs = [];
      var myLayerStartTimes = [];
      var myLayerNames = [];
      var myTimeRemapCompPageLayers = [];
      for (var i = 0; i < myPageCompLayers.length; i += 1) {
        myLayerIDs.push(myPageCompLayers[i].index);
        myLayerStartTimes.push(myPageCompLayers[i].startTime);
        myLayerNames.push(myPageCompLayers[i].name);
      }
      var myLastOut = myPageCompLayers[myPageCompLayers.length - 1].outPoint;
      var myTimeRemapComp = myComp.layers.precompose(
        myLayerIDs,
        getUniqueRetimeCompName(),
        true,
      );
      for (var i = 1; i <= myTimeRemapComp.numLayers; i += 1) {
        if (myTimeRemapComp.layer(i).canSetCollapseTransformation) {
          myTimeRemapComp.layer(i).collapseTransformation = true;
        }
        myTimeRemapCompPageLayers.push(myTimeRemapComp.layer(i));
      }
      for (var i = 0; i < myTimeRemapCompPageLayers.length - 1; i += 1) {
        myIntersectionControlLayer = myTimeRemapComp.layers.addSolid(
          [1, 1, 1],
          myTimeRemapCompPageLayers[i].name + " (int)",
          myTimeRemapComp.width,
          myTimeRemapComp.height,
          1,
          myTimeRemapComp.duration,
        );
        myIntersectionControlLayer.comment = G.intersectionControlLayerID;
        myIntersectionControlLayer.label = G.intersectionControlLayerColor;
        myIntersectionControlLayer.adjustmentLayer = true;
        myIntersectionControlLayer.moveAfter(myTimeRemapCompPageLayers[i]);
        myIntersectionControlLayer.shy = true;
        myIntersectionControlLayer.selected = false;
        myIntersectionControlLayer.locked = true;
      }
      myTimeRemapComp.comment = G.retimeCompID;
      myTimeRemapComp.duration = myLastOut;
      myTimeRemapComp.parentFolder = myProjectFolder;
      myTimeRemapComp.hideShyLayers = true;
      for (var i = 1; i <= myComp.numLayers; i += 1) {
        if (
          myComp.layer(i) instanceof AVLayer &&
          myComp.layer(i).source !== null &&
          myComp.layer(i).source.id == myTimeRemapComp.id
        ) {
          myTimeRemapLayer = myComp.layer(i);
        }
      }
      myTimeRemapLayer.label = G.timeRemapLayerColor;
      myTimeRemapLayer.comment = G.retimeLayerID;
      myTimeRemapLayer.timeRemapEnabled = true;
      for (var i = 0; i < myLayerStartTimes.length; i += 1) {
        if (i === 0) {
          continue;
        }
        myTimeRemapLayer.property("Time Remap").addKey(myLayerStartTimes[i]);
      }
      myTimeRemapLayer
        .property("Time Remap")
        .addKey(myLastOut - myComp.frameDuration);
      myMarkerVal.duration = 0;
      for (var i = 0; i < myLayerStartTimes.length; i += 1) {
        myMarkerVal.comment = myLayerNames[i];
        if (doingMarkerSync) {
          myTimeRemapLayer
            .property("Marker")
            .setValueAtTime(
              markerSyncLayer.property("Marker").keyTime(i + 1),
              myMarkerVal,
            );
        } else {
          myTimeRemapLayer
            .property("Marker")
            .setValueAtTime(myLayerStartTimes[i], myMarkerVal);
        }
      }
      myMarkerVal.comment = "End";
      if (doingMarkerSync) {
        myTimeRemapLayer
          .property("Marker")
          .setValueAtTime(
            markerSyncLayer
              .property("Marker")
              .keyTime(myLayerStartTimes.length + 1),
            myMarkerVal,
          );
        myTimeRemapLayer.outPoint = markerSyncLayer
          .property("Marker")
          .keyTime(myLayerStartTimes.length + 1);
      } else {
        myTimeRemapLayer
          .property("Marker")
          .setValueAtTime(myLastOut - myComp.frameDuration, myMarkerVal);
        myTimeRemapLayer.outPoint = myLastOut;
      }
      myTimeRemapLayer.outPoint = Math.max(
        myTimeRemapLayer.outPoint,
        myComp.duration + myComp.frameDuration,
      );
      tempExpr =
        "_m_ = marker;\r_n_ = 0;\rif (_m_.numKeys > 0){\r  _n_ = _m_.nearestKey(time).index;\r  if (time < _m_.key(_n_).time) _n_--;\r}\rif(_n_ < 1){\r  valueAtTime(key(1).time);\r}else if(_n_ == _m_.numKeys){\r  valueAtTime(key(numKeys).time);\r}else{\r  linear(time,_m_.key(_n_).time,_m_.key(_n_+1).time,key(_n_).value,key(_n_+1).value);\r}";
      myTimeRemapLayer.property("Time Remap").expression =
        G.exprHeader + obfuscateExpr(tempExpr, oTable);
      var myNewTimeRemapLayer = myTimeRemapLayer.duplicate();
      myNewTimeRemapLayer.moveBefore(myTimeRemapLayer);
      myNewTimeRemapLayer.threeDLayer = true;
      myNewTimeRemapLayer.collapseTransformation = true;
      myTimeRemapLayer.remove();
    } else {
      for (var i = 0; i < myPageCompLayers.length; i += 1) {
        myPageCompLayers[i].threeDLayer = true;
        myPageCompLayers[i].collapseTransformation = true;
      }
      for (i = myPageCompLayers.length - 1; i > 0; i--) {
        myIntersectionControlLayer = myComp.layers.addSolid(
          [1, 1, 1],
          myPageCompLayers[i].name + " (int)",
          myComp.width,
          myComp.height,
          1,
          myComp.duration,
        );
        myIntersectionControlLayer.comment = G.intersectionControlLayerID;
        myIntersectionControlLayer.label = G.intersectionControlLayerColor;
        myIntersectionControlLayer.adjustmentLayer = true;
        myIntersectionControlLayer.moveAfter(myPageCompLayers[i]);
        myIntersectionControlLayer.shy = true;
        myIntersectionControlLayer.selected = false;
        myIntersectionControlLayer.locked = true;
      }
    }
    if (!doingText) {
      for (i = userLayers.length - 1; i >= 0; i--) {
        if (userLayers[i].comment != G.textOnlyLayerID) {
          userLayers[i].comment = G.saveLayerID;
        }
        userLayers[i].moveToEnd();
        if (userLayers[i].hasVideo) {
          userLayers[i].enabled = false;
        }
        if (userLayers[i].hasAudio) {
          userLayers[i].audioEnabled = false;
        }
        userLayers[i].shy = true;
        userLayers[i].locked = true;
      }
    }
    myComp.hideShyLayers = true;
    app.endUndoGroup();
  }
  function buildPal(theObj) {
    function buildUI(theObj) {
      function populateDDL(theDDL, theNames, theSelection) {
        for (var i = 0; i < theNames.length; i += 1) {
          if (theNames[i] == "-") {
            theDDL.add("separator");
          } else {
            theDDL.add("item", theNames[i]);
          }
        }
        theDDL.selection = getArrayIndex(theNames, theSelection);
      }
      function initColorBtn(theButton, theColor) {
        var g = theButton.graphics;
        theButton.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, theColor);
        theButton.strokePen = g.newPen(g.PenType.SOLID_COLOR, G.black, 1);
        theButton.onDraw = customDraw;
      }
      var myPal =
        theObj instanceof Panel
          ? theObj
          : new Window("palette", G.scriptName, undefined, {
              resizeable: true,
            });
      if (myPal !== null) {
        var myResource =
          "group {\n\t\t\t\t\t\torientation: \'column\', alignment:\'left\', alignChildren:\'fill\', margins: 0, spacing: 3, \n\t\t\t\t\t\tlogoHelpGrp: Group {orientation: \'row\', spacing: 10, margins: [15,0,7,5], \n\t\t\t\t\t\t\tlogoGrp: Group {alignment: [\'left\',\'top\'], spacing: 0, margins: 0}, \n\t\t\t\t\t\t\thelpGrp: Group {orientation: \'column\', alignment: [\'right\',\'fill\'], spacing: 4, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\thelpBtn: Button {preferredSize: [20,20], text: \'?\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\tkeyBtn: Button {preferredSize: [20,20], text: \'" +
          String.fromCharCode(9733) +
          "\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\ttextGrp: Group {orientation: \'column\', alignChildren:[\'left\',\'fill\'], spacing: 0, margins: [15,5,0,5], \n\t\t\t\t\t\t\ttxt: EditText {preferredSize: [410,155], text: \'\', properties:{multiline:true}}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\ttopControlsGrp: Group {orientation: \'row\', alignment: [\'fill\',\'top\'], alignChildren:[\'left\',\'top\'], spacing: 8, margins: [12,0,3,0], \n\t\t\t\t\t\t\twordsLinesGrp: Group {orientation: \'row\', alignment: [\'left\',\'top\'], alignChildren:[\'left\',\'center\'], spacing: 4, margins: [4,0,-3,10], \n\t\t\t\t\t\t\t\trbGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 10,  \n\t\t\t\t\t\t\t\t\tlettersRB: RadioButton {text: \'Letters\', alignment: [\'left\',\'center\'], value: false}, \n\t\t\t\t\t\t\t\t\twordsRB: RadioButton {text: \'Words\', alignment: [\'left\',\'center\'], value: true}, \n\t\t\t\t\t\t\t\t\tlinesRB: RadioButton {text: \'Lines\', alignment: [\'left\',\'center\'], value: false}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\ttextLayersOnlyGrp: Group {orientation: \'row\', alignment: [\'right\',\'top\'], alignChildren:[\'right\',\'center\'], spacing: 4, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Text Layers Only\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\tCB: Checkbox {value:false, alignment: [\'right\',\'bottom\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\tallCapsGrp: Group {orientation: \'row\', alignment: [\'right\',\'top\'], alignChildren:[\'right\',\'center\'], spacing: 4, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\tlabel: StaticText {text: \'All Caps\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\tCB: Checkbox {value:true, alignment: [\'right\',\'bottom\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\tcontrolsGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'fill\'], spacing: 0, margins: 0, \n\t\t\t\t\t\t\tleftControlsGrp: Group {orientation: \'column\', alignment: [\'left\',\'fill\'], alignChildren:[\'fill\',\'top\'], spacing: 4, margins: 0, \n\t\t\t\t\t\t\t\toptionsGrp: Group {orientation: \'column\', alignment:[\'fill\',\'top\'], alignChildren:[\'right\',\'top\'], spacing: 2, margins: [5,0,5,10], \n\t\t\t\t\t\t\t\t\tsourceGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Source\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tcolorLabelAwareGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,0,-3,-3], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Color Label Aware\'}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tpresetGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Preset\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tbtnGrp:Group {orientation: \'row\', alignment: [\'fill\',\'fill\'],spacing: 4, margins: [11,8,0,2], \n\t\t\t\t\t\t\t\t\t\tsaveBtn: Button {preferredSize: [50,-1], text: \'Save\', alignment: [\'left\',\'center\']}, \n\t\t\t\t\t\t\t\t\t\tloadBtn: Button {preferredSize: [50,-1], text: \'Load\', alignment: [\'left\',\'center\']}, \n\t\t\t\t\t\t\t\t\t\tdoItBtn: Button {preferredSize: [50,-1], text: \'DO IT!\', alignment: [\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacer1Grp: Group {orientation: \'column\', margins: [0,3,0,3], alignment: [\'center\',\'center\'], \n\t\t\t\t\t\t\t\t\t\tspacerPnl: Panel {preferredSize: [190,0], margins: 0}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tholdGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Hold\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tminMaxGrp: Group {orientation: \'row\', alignChildren:[\'Left\',\'center\'], spacing: 3, margins: [2,0,0,2], \n\t\t\t\t\t\t\t\t\t\tminGrp: Group {preferredSize: [50,-1], orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,0,8,2], \n\t\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Min\', alignment:[\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\t\t\ttxt: EditText {alignment:\'right\',characters: 4, text: \'15\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tmaxGrp: Group {preferredSize: [50,-1], orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,0,0,2], \n\t\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Max\', alignment:[\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\t\t\ttxt: EditText {alignment:\'right\',characters: 4, text: \'60\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tsequencerGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Sequencer\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [120,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tpageOrderGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Page Order\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [120,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tretimePagesGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,2,0,-2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Retime Pages\'}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmarkerSyncGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,2,0,-2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Marker Sync\'}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\trandomizeTimingGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,2,0,-2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Randomize Timing\'}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmotionBlurGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: [2,2,0,-15], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Motion Blur\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:false, alignment: [\'right\',\'bottom\']}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tcolorPnl: Panel {orientation: \'column\', alignment:[\'fill\',\'bottom\'], alignChildren:[\'right\',\'top\'], text: \'Color Palette\', spacing: 4, margins: [5,10,5,0], \n\t\t\t\t\t\t\t\t\t\tcolorGrp: Group {orientation: \'row\', alignChildren:\'left\', spacing: 3, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'\', alignment: \'top\'}, \n\t\t\t\t\t\t\t\t\t\t\tcontainer: Group {preferredSize: [130,-1], orientation: \'row\', alignment: \'fill\', alignChildren: [\'left\',\'center\'], spacing: 5, margins: [2,0,0,0],\n\t\t\t\t\t\t\t\t\t\t\t\tcolor1Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 3, \n\t\t\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t\tcolor2Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 3, \n\t\t\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t\tcolor3Grp: Group {orientation: \'column\',  \n\t\t\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 3, \n\t\t\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t\tcolor4Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 3, \n\t\t\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t\tcolor5Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 3, \n\t\t\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\tspacerPnl: Panel {alignment: [\'center\',\'center\'], preferredSize: [0,400], margins: 0}, \n\t\t\t\t\t\t\trightControlsGrp: Group {orientation: \'column\', alignment:[\'fill\',\'fill\'] , alignChildren:[\'fill\',\'top\'], spacing: 4, margins: 0, \n\t\t\t\t\t\t\t\tpageControlsGrp: Group {orientation: \'column\', alignment:[\'fill\',\'top\'], alignChildren:[\'right\',\'top\'], text: \'PAGE CONTROLS\', spacing: 3, margins: [5,0,5,0], \n\t\t\t\t\t\t\t\t\ttransitionGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Animation\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacer1Grp: Group {orientation: \'column\', margins: [0,3,0,3], alignment: [\'center\',\'center\'], \n\t\t\t\t\t\t\t\t\t\tspacerPnl: Panel {preferredSize: [190,0], margins: 0}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tanimateInGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Motion In\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tdirectionInGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Direction In\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tstyleInGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Style In\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tfadeInGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,0,-3,-3], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Fade In\'}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacer2Grp: Group {orientation: \'column\', margins: [0,3,0,3], alignment: [\'center\',\'center\'], \n\t\t\t\t\t\t\t\t\t\tspacerPnl: Panel {preferredSize: [190,0], margins: 0}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tanimateOutGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Motion Out\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tdirectionOutGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Direction Out\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tstyleOutGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Style Out\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tfadeOutGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,0,-3,-3], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Fade Out\'}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacer3Grp: Group {orientation: \'column\', margins: [0,3,0,3], alignment: [\'center\',\'center\'], \n\t\t\t\t\t\t\t\t\t\tspacerPnl: Panel {preferredSize: [190,0], margins: 0}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspeedGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Speed\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tintensityGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Intensity\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tlayerOrderGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,0,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Layer Order\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\toffsetGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Layer Offset\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [130,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t}";
        myPal.grp = myPal.add(myResource);
        var myBinary = [__BLOB__BLOB_000066__];
        try {
          var myFile = new File("~/Desktop/xxxmyFilexxx.png");
          myFile.encoding = "BINARY";
          myFile.open("w");
          myFile.write(myBinary);
          myFile.close();
          myPal.grp.logoHelpGrp.logoGrp.logoImg =
            myPal.grp.logoHelpGrp.logoGrp.add("image", undefined, myFile);
          myFile.remove();
        } catch (err) {}
        myPal.grp.logoHelpGrp.helpGrp.helpBtn.onClick = click_help;
        myPal.grp.logoHelpGrp.helpGrp.keyBtn.onClick = click_keyInfo;
        myPal.grp.textGrp.txt.text = G.defaultText;
        myPal.grp.topControlsGrp.textLayersOnlyGrp.CB.onClick =
          click_textLayersOnly;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.btnGrp.doItBtn.onClick =
          click_doIt;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.btnGrp.saveBtn.onClick =
          click_save;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.btnGrp.loadBtn.onClick =
          click_load;
        populateDDL(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.presetGrp.DDL,
          G.presetNames,
          G.def_presetName,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.presetGrp.DDL.onChange =
          change_preset;
        populateDDL(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.DDL,
          G.sourceNames,
          G.def_sourceName,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sourceGrp.DDL.onChange =
          change_source;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorLabelAwareGrp.CB.onClick =
          click_colorLabelAware;
        populateDDL(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.DDL,
          G.holdNames,
          G.def_holdName,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.holdGrp.DDL.onChange =
          change_hold;
        populateDDL(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.DDL,
          G.sequencerNames,
          G.def_sequencerName,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.sequencerGrp.DDL.onChange =
          change_sequencer;
        populateDDL(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.pageOrderGrp.DDL,
          G.pageOrderNames,
          G.def_pageOrderName,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.retimePagesGrp.CB.onClick =
          click_retimePages;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.markerSyncGrp.CB.onClick =
          click_markerSync;
        initColorBtn(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
            .container.color1Grp.colorBtn,
          G.def_color1,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color1Grp.colorBtn.onClick =
          click_color1;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color1Grp.enableCB.onClick =
          click_color1CB;
        initColorBtn(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
            .container.color2Grp.colorBtn,
          G.def_color2,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color2Grp.colorBtn.onClick =
          click_color2;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color2Grp.enableCB.onClick =
          click_color2CB;
        initColorBtn(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
            .container.color3Grp.colorBtn,
          G.def_color3,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color3Grp.colorBtn.onClick =
          click_color3;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color3Grp.enableCB.onClick =
          click_color3CB;
        initColorBtn(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
            .container.color4Grp.colorBtn,
          G.def_color4,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color4Grp.colorBtn.onClick =
          click_color4;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color4Grp.enableCB.onClick =
          click_color4CB;
        initColorBtn(
          myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp
            .container.color5Grp.colorBtn,
          G.def_color5,
        );
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color5Grp.colorBtn.onClick =
          click_color5;
        myPal.grp.controlsGrp.leftControlsGrp.optionsGrp.colorPnl.colorGrp.container.color5Grp.enableCB.onClick =
          click_color5CB;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp
            .DDL,
          G.transitionNames,
          G.def_transitionName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.transitionGrp.DDL.onChange =
          change_transition;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp
            .DDL,
          G.animateNames,
          G.def_animateInName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateInGrp.DDL.onChange =
          change_animateIn;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp
            .DDL,
          G.directionNames,
          G.def_directionInName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionInGrp.DDL.onChange =
          change_directionIn;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleInGrp.DDL,
          G.styleNames,
          G.def_styleInName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleInGrp.DDL.onChange =
          change_styleIn;
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeInGrp.CB.onClick =
          click_fadeIn;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp
            .DDL,
          G.animateNames,
          G.def_animateOutName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.animateOutGrp.DDL.onChange =
          change_animateOut;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp
            .DDL,
          G.directionNames,
          G.def_directionOutName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.directionOutGrp.DDL.onChange =
          change_directionOut;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleOutGrp
            .DDL,
          G.styleNames,
          G.def_styleOutName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.styleOutGrp.DDL.onChange =
          change_styleOut;
        myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.fadeOutGrp.CB.onClick =
          click_fadeOut;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.layerOrderGrp
            .DDL,
          G.layerOrderNames,
          G.def_layerOrderName,
        );
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.speedGrp.DDL,
          G.speedNames,
          G.def_speedName,
        );
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.intensityGrp
            .DDL,
          G.intensityNames,
          G.def_intensityName,
        );
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.pageControlsGrp.offsetGrp.DDL,
          G.offsetNames,
          G.def_offsetName,
        );
      }
      return myPal;
    }
    G.uiPal = buildUI(theObj);
    checkDependencies();
    if (G.uiPal != null) {
      if (G.uiPal instanceof Window) {
        G.uiPal.center();
        G.uiPal.show();
      } else {
        G.uiPal.layout.layout(true);
      }
    }
  }
  var G = {};
  G.scriptName = "EditMonkey";
  G.scriptInitials = "EM";
  G.version = "1.03";
  G.presetVersion = "1.00";
  G.trialLengthDays = 7;
  G.trialLayerLimit = 10;
  G.trialWordLimit = 10;
  G.copyright = "Copyright \xa9 2018 Dan Ebberts & Orrin Zucker\r";
  G.helpText1 =
    G.scriptName +
    "  " +
    G.version +
    "\n" +
    G.copyright +
    "All rights reserved\n" +
    "www.typemonkey.net\n" +
    "\n";
  G.helpText2 =
    "EditMonkey is a tool for quickly creating complex, multi-comp text, video, and graphic animations.\n\nQuickstart:\n\nTo generate a default EditMonkey build, create a 10 second comp and click EditMonkey\u2019s DO IT! Button. This will build a three page text animation using the settings from After Effects\u2019 native Character and Paragraph panels. A time-remapped comp named EM Retime_001 will appear as a new layer your comp. You can use the layer markers to adjust the timing of the animation.\n\nIf you open the EM Retime_001 comp, you will see the individual page comps that EditMonkey has created for each group of text. Page breaks are created by skipping lines in the text panel.\n\nIf you would rather animate existing layers in your comp, you can set EditMonkey\u2019s Source dropdown to Layers and repeat the process.\n\nFor more detailed descriptions of what all the different controls do, please check out the EditMonkey tutorials at aescripts.com/editmonkey or the User Guide.\n";
  G.helpText3 =
    "\nFor additional info on any of our other Monkey products, please visit us at www.typemonkey.net";
  var af_settings = {
    helpButtons: [
      {
        name: G.scriptName + " Tips",
        url: "https://aescripts.com/editmonkey/",
      },
      { name: "About Us", url: "https://www.typemonkey.net" },
    ],
    helpText: G.helpText1 + G.helpText2 + G.helpText3,
    privateNumber: 7445361483480396,
    productSKU: "EZEM-SUL",
    scriptAuthor: "Ebberts + Zucker",
    scriptName: G.scriptName,
    scriptURL: "https://aescripts.com/editmonkey",
    scriptVersion: G.version,
  };
  function a(vars) {
    function licUI() {
      var e = new Window(
        "dialog",
        strTrialWelcomeHeader + " - " + strVersion + " " + strScriptVersion,
        void 0,
        { resizeable: true },
      );
      if (null != e) {
        var i =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\tinfoGrp: Group { \t\t\t\t\talignment: [\'fill\',\'top\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\torientation: \'column\', \t\t\t\t\t\thdrGrp: Group {\t\t\t\t\t\t\ttxt: StaticText {}, \t\t\t\t\t\t\tpaste: StaticText {}, \t\t\t\t\t\t}\t\t\t\t\t\ttrial: StaticText {}, \t\t\t\t\t} \t\t\t\t\tlicGrp: Group { \t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \t\t\t\t\t} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'],                             buyGrp: Group {                             alignment: [\'left\',\'fill\'],                             alignChildren: [\'left\',\'fill\'],                             orientation: \'column\',                             spacing:1,                                  retrieveReg: Button {text:\'" +
          strRetrieveLic.replace(/%t/, strLicense) +
          "\', name:\'retrieve\',preferredSize:[130,25]}                                   buyLic: Button {text:\'" +
          strBuyLic.replace(/%t/, strLicense) +
          "\', name:\'buy\',preferredSize:[130,25]}                                   }\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
        e.grp = e.add(i);
        var t = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        var n = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.REGULAR,
          9,
        );
        return (
          (e.grp.licGrp.txt.preferredSize = [600, 30]),
          (e.grp.infoGrp.hdrGrp.txt.text = strEnterLicenseCode),
          (e.grp.infoGrp.hdrGrp.txt.graphics.font = t),
          (e.grp.infoGrp.hdrGrp.paste.text = ""),
          (e.grp.infoGrp.hdrGrp.paste.graphics.font = n),
          (e.grp.infoGrp.trial.text =
            betaMode || !offerTrial ? "" : strTrialInstructMsg),
          isServerConfigured(licenseValidity) &&
            (isServerRunning(licenseValidity)
              ? (e.grp.infoGrp.hdrGrp.txt.text = strServerInstructMsg)
              : (e.grp.infoGrp.hdrGrp.txt.text =
                  strEnterLicenseCode + " " + strServerNotRunning),
            (e.grp.infoGrp.trial.text = strTrialInstructMsg)),
          (e.grp.licGrp.txt.text = betaMode || !offerTrial ? "" : "trial"),
          isServerConfigured(licenseValidity) &&
            isServerRunning(licenseValidity) &&
            (e.grp.licGrp.txt.text = "@REMOTE"),
          (e.grp.okGrp.buyGrp.retrieveReg.visible =
            e.grp.okGrp.buyGrp.buyLic.visible =
              !betaMode),
          (e.grp.okGrp.buyGrp.buyLic.onClick = function () {
            openURL(strTrialUrl);
            e.close(false);
          }),
          (e.grp.okGrp.buyGrp.retrieveReg.onClick = function () {
            retrieveLicenseUI(strLicense);
            e.close(false);
          }),
          (e.grp.okGrp.cancelBtn.onClick = function () {
            e.close(false);
          }),
          (e.grp.okGrp.okBtn.onClick = function () {
            license = e.grp.licGrp.txt.text
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "");
            e.close(true);
          }),
          e.layout.layout(true),
          e.layout.resize(),
          (e.onResizing = e.onResize =
            function () {
              this.layout.resize();
            }),
          e
        );
      }
    }
    function retrieveLicenseUI(e) {
      var i = new Window("dialog", strRetrieveLic.replace(/%t/, e), void 0, {
        resizeable: true,
      });
      if (null != i) {
        var t =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'],                     hdrGrp: Group {                         orientation: \'column\',                         alignment: [\'fill\',\'fill\'],                         alignChildren: [\'fill\',\'fill\'],                                 hdr: StaticText {text:\'" +
          strLicenseDownloadOptions.replace(
            /%t/,
            e.toLowerCase() + "de" == locale ? "n" : "s",
          ) +
          "\', alignment: [\'fill\',\'top\'], properties:{multiline:true} },                                },                     buttonsGrp: Group {                         alignment: [\'fill\',\'bottom\'],                         alignChildren: [\'fill\',\'fill\'],                             myDownloadsBtn: Button {text:\'" +
          strMyDownloads +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']},                             downloadManagerBtn: Button {text:\'" +
          strDownloadManager +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']},                         }, \t\t\t\t}";
        i.grp = i.add(t);
        i.grp.buttonsGrp.myDownloadsBtn.onClick = function () {
          openURL(retrieveUrl);
          i.close(false);
        };
        i.grp.buttonsGrp.downloadManagerBtn.onClick = function () {
          openURL(managerAppUrl);
          i.close(false);
        };
        i.layout.layout(true);
        i.layout.resize();
        i.onResizing = i.onResize = function () {
          this.layout.resize();
        };
        i.show();
      }
    }
    function checkBeta(e, i) {
      return new Date() < i || new Date() > e;
    }
    function helpUI() {
      var e = new Window(
        "dialog",
        strScriptName + " - " + strVersion + " " + strScriptVersion,
        void 0,
        { resizeable: true },
      );
      if (null != e) {
        for (
          var i =
              -1 != $.os.indexOf("Windows") &&
              12 <= parseFloat(app.version) &&
              parseFloat(app.version) < 14
                ? ["left", "top"]
                : ["fill", "fill"],
            t =
              "group { \t\torientation: \'column\', \t\talignment: [\'" +
              i[0] +
              "\',\'" +
              i[1] +
              "\'], \t\talignChildren: [\'fill\',\'fill\'],                    infoGrp: Group {                    alignment: [\'fill\',\'top\'],                    alignChildren: [\'fill\',\'top\'], \t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]},                       hdr: StaticText {properties:{multiline:true}},                       removeLic: Button {text:\'" +
              strDeactivate +
              "\', preferredSize:[40,30]} \t\t\t\t} \t\t\t\thelpGrp: Group {                    alignment: [\'" +
              i[0] +
              "\',\'" +
              i[1] +
              "\'],                    alignChildren: [\'fill\',\'fill\'],                     txt: EditText {properties:{multiline:true, readonly:true}}, \t\t\t\t}                 prefsGrp: Group {                       alignment: [\'fill\',\'bottom\'],                        alignChildren: [\'left\',\'center\'],                        orientation: \'row\',                        checkNow: Button {text:\'" +
              strCheckNow +
              "\', preferredSize:[150,25]}                        doUpdateCheck: Checkbox {text:\'" +
              strVersionCheck +
              "\', preferredSize:[-1,25]}                        }\t\t\tokGrp: Group {                 alignment: [\'fill\',\'bottom\'],                 alignChildren: [\'fill\',\'center\'],                 supportBtn: Button {text:\'" +
              strGetSupport +
              "\', preferredSize:[150,30], alignment: [\'left\',\'center\']}                 ",
            n = 0;
          n < Math.min(maxUIButtons, vars.helpButtons.length);
          n++
        ) {
          if (vars.helpButtons[n].hasOwnProperty("name")) {
            t +=
              "btn" + n + ": " + vars.helpButtons[n].hasOwnProperty("type") &&
              validateButtonType(vars.helpButtons[n].type)
                ? vars.helpButtons[n].type
                : "Button" +
                  " {id: \'" +
                  n +
                  "\', alignment: [\'left\',\'center\']}";
          }
        }
        t +=
          "\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t} \t\t}";
        e.grp = e.add(t);
        e.grp.helpGrp.txt.preferredSize = [800, 500];
        var r = "\xa9" + (new Date().getYear() + 1900).toString();
        e.grp.infoGrp.txt.text =
          strScriptName +
          " - " +
          strVersion +
          " " +
          strScriptVersion +
          "\n" +
          r +
          " " +
          vars.scriptAuthor +
          "\n\n";
        e.grp.infoGrp.hdr.text = getRegistration();
        e.grp.helpGrp.txt.text = vars.helpText;
        haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
          (doUpdateCheck = !(
            "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
          ));
        e.grp.prefsGrp.doUpdateCheck.value = doUpdateCheck;
        e.grp.prefsGrp.doUpdateCheck.onClick = function () {
          setUpdateCheck(this.value);
        };
        e.grp.prefsGrp.checkNow.onClick = function () {
          ScriptUI.environment.keyboardState.altKey
            ? alert(
                "aescripts licensing framework version\n" + licensingVersion,
              )
            : doUpdateCheckNow();
        };
        for (
          var n = 0;
          n < Math.min(maxUIButtons, vars.helpButtons.length);
          n += 1
        ) {
          vars.helpButtons[n].hasOwnProperty("name") &&
            ((e.grp.okGrp["btn" + n].text = vars.helpButtons[n].name),
            vars.helpButtons[n].hasOwnProperty("url")
              ? (e.grp.okGrp["btn" + n].onClick = function () {
                  openURL(vars.helpButtons[this.id].url);
                })
              : vars.helpButtons[n].hasOwnProperty("onClickFunction") &&
                (e.grp.okGrp["btn" + n].onClick =
                  vars.helpButtons[n].onClickFunction),
            vars.helpButtons[n].hasOwnProperty("btnValue") &&
              (e.grp.okGrp["btn" + n].value = vars.helpButtons[n].btnValue));
        }
        e.grp.infoGrp.removeLic.visible = !isResultTrial(
          licenseValidity.result,
        );
        e.grp.infoGrp.removeLic.onClick = function () {
          removeLic() &&
            ((e.grp.infoGrp.hdr.text = getRegistration()),
            (this.visible = false));
        };
        e.grp.okGrp.supportBtn.onClick = function () {
          openSupportTicket({});
          e.close();
        };
        e.grp.okGrp.okBtn.onClick = function () {
          e.close();
        };
        -1 != $.os.indexOf("Windows") &&
          12 <= parseFloat(app.version) &&
          parseFloat(app.version) < 14 &&
          (e.maximumSize = [840, 670]);
        e.layout.layout(true);
        e.layout.resize();
        e.onResizing = e.onResize = function () {
          this.layout.resize();
        };
        e.show();
      }
    }
    function validateButtonType(e) {
      return "Button" === e || "Checkbox" === e;
    }
    function openSupportTicket(e) {
      t = n = "";
      i = "&subject=";
      null != e &&
        void 0 !== e &&
        (e.hasOwnProperty("subject") && (i += File.encode(e.subject)),
        e.hasOwnProperty("message") && (t = File.encode(e.message)),
        e.hasOwnProperty("diagnostic") &&
          (n = File.encode(e.diagnostic + "\n--\n")));
      var r =
        true === isAescriptsSupportUrl
          ? strSKU + i + "&message="
          : i.replace(/\&/, "?") + "&body=";
      var a =
        "" != r
          ? t +
            "%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A-------%0D%0A" +
            n +
            getDiagnosticData(true)
          : "";
      supportUrl.toString().match(/@/) &&
        !supportUrl.toString().match(/^mailto:/) &&
        (supportUrl = "mailto:" + supportUrl);
      openURL(supportUrl + r + a);
    }
    function getDiagnosticData(e) {
      var i = $.os.toString();
      var t =
        BridgeTalk.getDisplayName(BridgeTalk.appName) +
        " (" +
        app.version +
        ") - " +
        $.locale.toString();
      var n =
        strScriptName.replace(/&/, "and") +
        " - " +
        strVersion +
        " " +
        strScriptVersion;
      var r = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return e
        ? File.encode(n) +
            "%0D%0A" +
            File.encode(i) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(r)
        : n + "\n" + i + "\n" + t + "\n" + r;
    }
    function setUpdateCheck(e) {
      saveSettings(prefsSectionName, prefsDoUpdateCheck, (doUpdateCheck = e));
    }
    function doUpdateCheckNow() {
      checkForNewVersion((doUpdateCheck = true));
    }
    function newVersionUI(i) {
      var t = new Window("dialog", strNewVersionAvailableHdr, void 0, {
        resizeable: true,
      });
      if (null != t) {
        var e =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t   hdrGrp: Group { \t\t\t\t   alignment: [\'fill\',\'fill\'], \t\t\t\t   alignChildren: [\'fill\',\'fill\'], \t\t\t\t   orientation: \'column\',                         hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
        i.hasOwnProperty("header") &&
          (e +=
            "   infoGrp: Panel {                            alignment: [\'fill\',\'fill\'],                            alignChildren: [\'fill\',\'fill\'],                            orientation: \'column\',                               info: StaticText {properties:{multiline:true}},                               } ");
        e +=
          "} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\t\tskipVersionBtn: Button {text:\'" +
          strSkipVersion +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']}                            remindMeLaterBtn: Button {text:\'" +
          strRemindMeLater +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \t\t\t\t\t\tdownloadBtn: Button {text:\'" +
          strDownload +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
        t.grp = t.add(e);
        var n = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
        t.grp.hdrGrp.hdr.graphics.font = n;
        t.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(
          /%v/,
          i.version + "\n" + strCurrentVersion.replace(/%v/, strScriptVersion),
        );
        i.hasOwnProperty("header") &&
          (t.grp.hdrGrp.infoGrp.info.text = i.header + "\n\n" + i.detail);
        t.grp.okGrp.skipVersionBtn.onClick = function () {
          saveSettings(
            prefsSectionName,
            prefsLastVersionChecked,
            strScriptVersion,
          );
          saveSettings(
            prefsSectionName,
            prefsLastTimeVersionChecked,
            new Date().toString(),
          );
          saveSettings(
            prefsSectionName,
            prefsNextTimeVersionCheckedSkipVersion,
            i.version,
          );
          saveSettings(
            prefsSectionName,
            prefsLastServerVersionChecked,
            i.version,
          );
          t.close(false);
        };
        t.grp.okGrp.remindMeLaterBtn.onClick = function () {
          try {
            var e = new Date();
            e = dateAddDays(remindMeLaterDays);
            saveSettings(
              prefsSectionName,
              prefsLastVersionChecked,
              strScriptVersion,
            );
            saveSettings(
              prefsSectionName,
              prefsLastTimeVersionChecked,
              new Date().toString(),
            );
            saveSettings(
              prefsSectionName,
              prefsNextTimeVersionChecked,
              e.toString(),
            );
            saveSettings(
              prefsSectionName,
              prefsLastServerVersionChecked,
              i.version,
            );
            t.close(false);
          } catch (e) {
            alert(e.toString());
          }
        };
        t.grp.okGrp.downloadBtn.onClick = function () {
          retrieveLicenseUI(strDownload);
          t.close(true);
        };
        t.layout.layout(true);
        t.layout.resize();
        t.onResizing = t.onResize = function () {
          this.layout.resize();
        };
        i.hasOwnProperty("header") &&
          ((t.grp.hdrGrp.infoGrp.size.height = Math.min(
            t.grp.hdrGrp.infoGrp.size.height,
            300,
          )),
          t.layout.layout(true),
          t.layout.resize());
        t.show();
      }
    }
    function dateAddDays(e) {
      var i = new Date().getTime() + 86400000 * e;
      return new Date(i);
    }
    function checkForNewVersion(e) {
      if ((null == e && (e = false), doUpdateCheck)) {
        haveSettings(prefsSectionName, prefsLastVersionChecked) &&
          (t = getSettings(prefsSectionName, prefsLastVersionChecked));
        haveSettings(prefsSectionName, prefsLastServerVersionChecked) &&
          (n = getSettings(prefsSectionName, prefsLastServerVersionChecked));
        haveSettings(prefsSectionName, prefsLastTimeVersionChecked) &&
          (r = new Date(
            getSettings(prefsSectionName, prefsLastTimeVersionChecked),
          ));
        haveSettings(
          prefsSectionName,
          prefsNextTimeVersionCheckedSkipVersion,
        ) &&
          (s = getSettings(
            prefsSectionName,
            prefsNextTimeVersionCheckedSkipVersion,
          ));
        haveSettings(prefsSectionName, prefsNextTimeVersionChecked) &&
          (a = new Date(
            getSettings(prefsSectionName, prefsNextTimeVersionChecked),
          ));
        haveSettings(prefsSectionName, prefsVersionCheckInit) &&
          (i = getSettings(prefsSectionName, prefsVersionCheckInit));
        var o = new Date();
        if (e || null == i || null == a || !(o < a)) {
          var l = versionCheck(strSKU, true, e);
          if (null != l) {
            var c =
              null != l && l.hasOwnProperty("version")
                ? l.version
                : strScriptVersion;
            if ((e || null == n || n != c) && (e || null == s || s != n)) {
              saveSettings(prefsSectionName, prefsVersionCheckInit, 1);
              try {
                var f = new Date();
                f = dateAddDays(updateCheckInterval);
                saveSettings(
                  prefsSectionName,
                  prefsLastVersionChecked,
                  strScriptVersion,
                );
                saveSettings(
                  prefsSectionName,
                  prefsLastTimeVersionChecked,
                  new Date().toString(),
                );
                saveSettings(
                  prefsSectionName,
                  prefsNextTimeVersionChecked,
                  f.toString(),
                );
              } catch (e) {
                alert(e.toString());
              }
              var d = compareVersions(c, strScriptVersion);
              0 < d && (null == t || null == r || null == a || e || a <= o)
                ? newVersionUI(l)
                : d <= 0 && e && alert(strUpToDate);
            }
          } else {
            saveSettings(
              prefsSectionName,
              prefsDoUpdateCheck,
              (doUpdateCheck = false),
            );
          }
        }
      }
    }
    function versionCheck(e, i, t) {
      var n = extComms(
        "https://notify.aescripts.com/versioncheck2.php?json=1&plain=1&sku=" +
          e +
          i
          ? "&latest=1"
          : "" + parseFloat(app.version) < 12
            ? "&clip_length=200"
            : "&clip_length=300",
        null,
      );
      if (null == n || "" == n || !validateJSON(n)) {
        return (t && alert(strUpdateCheckError), null);
      }
      try {
        if (null == (n = JSONify(n, "parse"))) {
          return null;
        }
      } catch (e) {
        return null;
      }
      return "ok" != n.status
        ? null
        : i
          ? {
              date: n.latest.release_date,
              detail: n.latest.detail,
              header: strVersionRev
                .replace(/%a/, n.version)
                .replace(/%b/, "")
                .replace(/%c/, n.latest.release_date),
              version: n.version,
            }
          : { version: n.version };
    }
    function extComms(e) {
      try {
        if (-1 != $.os.indexOf("Mac")) {
          var i = system.callSystem('curl -s 2 "' + e + '"');
        } else {
          var t =
            ((n = new File(
              Folder.userData.fsName + "/Aescripts/aescripts_helper.vbs",
            )).open("w"),
            n.write(
              'dim o: Set o = createobject("MSXML2.XMLHTTP.6.0")\no.Open "GET", WScript.Arguments(0), False\no.Send\nIf o.Status >= 200 And o.Status <= 202 Then\nWScript.Echo o.responseText\nElse\nWScript.Echo "Error"\nEnd If',
            ),
            n.close(),
            n.exists ? n : null);
          if (null == t) {
            return null;
          }
          i = system.callSystem(
            'cscript //nologo "' + t.fsName + '" "' + e + '"',
          );
        }
        return i;
      } catch (e) {
        return (alert("extComms error\n" + e.toString()), null);
      }
    }
    function socketConnect(e, i) {
      var t = new Socket();
      if (
        ((t.encoding = "binary"), (t.timeout = 2), t.open(e + ":80", "UTF-8"))
      ) {
        t.write(
          "GET /" + i + " HTTP/1.1\nHost: " + e + "\n\nConnection: close\n\n",
        );
        var n = t.read(2000);
        return (t.close(), null != n ? (n = n.toString()) : null);
      }
      return null;
    }
    function formatHistory(e, i) {
      var t = e.data;
      var n = [];
      for (var r in t) {
        if (t.hasOwnProperty(r)) {
          for (var a = t[r].history, s = a.length - 1; 0 <= s; s--) {
            var o = a[s];
            var l = "";
            var c = o.detail;
            s == a.length - 1 && (l = " (" + strNewestVersionAvailable + ")");
            var f = strVersionRev
              .replace(/%0/, o.version_number)
              .replace(/%1/, l)
              .replace(/%2/, o.release_date)
              .replace(/%3/, c);
            (!options.summaryOnlyNewChanges ||
              compareVersions(i, o.version_number) < 0) &&
              n.push(f);
          }
        }
      }
      return n.join("\n\n");
    }
    function getVerifCode(e) {
      return "1";
      "trial" == e.toLowerCase() && (e = "");
      var t =
        -1 != $.os.indexOf("Mac") &&
        (Folder("/Volumes/Private").exists || Folder("/Volumes/private").exists)
          ? Folder.userData.fsName
          : Folder.temp.fsName +
            "/" +
            Math.round(Math.random() * 42132 * new Date().getTime());
      if (-1 != $.os.indexOf("Win")) {
        i = wx;
        t += ".exe";
      } else {
        if (systemCall("arch").toLowerCase().match(/ppc/)) {
          return (alert(strPpcNotSupported), false);
        }
        i = mx;
      }
      var n = createFile(File(t), i, "BINARY");
      if (!n.exists) {
        return ((licenseData = { result: -108 }), licenseData);
      }
      n.hidden = true;
      -1 != $.os.indexOf("Mac") && systemCall('chmod 757 "' + n.fsName + '"');
      var r = systemCall(
        '"' + n.fsName + '" "' + strHeader + '" ' + privateNum + " " + e,
      );
      return (n.remove(), parseResult(r));
    }
    function parseResult(i) {
      try {
        t = parseVerifCode(i.toString());
      } catch (e) {
        (t = { result: -101 }).e =
          e.toString() + "\nresult:\n\n" + i.toString();
      }
      return t;
    }
    function parseVerifCode(e) {
      for (var i = e.match(/[^\r\n]+/g), t = {}, n = 0; n < i.length; n++) {
        var r = i[n].split(":");
        if (2 <= r.length) {
          var a = r[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          var s = trimQuotes(r[1]);
          "LS" == a && "UP" == s && (a = "LSS");
          isNaN(s) || (s = parseFloat(s));
          t[a] = s;
        }
      }
      return (
        void 0 === t.result && ((t.result = -102), (t.e = e)),
        checkTrialDetails(t),
        checkBetaDetails(t),
        (isTimeLimited = checkTimeLimited(t)),
        t
      );
    }
    function checkTimeLimited(e) {
      var i = retProp("rt$", e);
      var t = retProp("nd$", e);
      if ("" == i || "" == t) {
        return false;
      }
      switch (e.result) {
        case -20:
          e.e = i;
          break;
        case -21:
          e.e = t;
      }
    }
    function checkFloatingLicense(e) {
      retProp("pe$", e) != bD("RkxU") ||
        isServerRunning(e) ||
        (e.result = -109);
    }
    function checkTrialDetails(e) {
      if (-7 !== e.result) {
      } else if (0 == trialLengthDays) {
        e.result = -106;
      } else {
        var i = retProp("^d", e);
        if (void 0 === i) {
          return void (e.result = -103);
        }
        var t = trialLengthDays - i;
        0 < t
          ? ((e.result = 100), (e.tdl = t), (e.license = bD("VFJJQUw=")))
          : ((e.result = -100), (e.tdl = 0));
      }
    }
    function checkBetaDetails(e) {
      var i = e.result;
      var t = retProp("pe$", e).match(/^B/);
      betaMode && (isResultTrial(i) || -106 == i || -7 == i)
        ? (e.result = -107)
        : !betaMode && t && (e.result = -105);
    }
    function isResultValidLicense(e) {
      return true;
    }
    function isResultTrial(e) {
      return false;
    }
    function isServerConfigured(e) {
      try {
        return retProp("^L", e).match(/^O/);
      } catch (e) {}
    }
    function isServerRunning(e) {
      try {
        return retProp("SS$", e).match(/^U/);
      } catch (e) {}
    }
    function trimQuotes(e) {
      return (
        "\'" == (e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))[0] &&
          "\'" == e[e.length - 1] &&
          (e = e.substring(1, e.length - 1)),
        e
      );
    }
    function sanitizeProductName(e) {
      return e.toString().replace(/[^a-z0-9]/gi, "");
    }
    function checkErrorCode(e) {
      return licErrors[locale].hasOwnProperty(e.toString()) ? e : "unknown";
    }
    function string_encode3(e) {
      for (var i = 0, t = 0; t < e.length; t++) {
        i += e.charCodeAt(t);
      }
      return i;
    }
    function getVerifCode3(e) {
      var i = e.split("*");
      if (4 == i.length) {
        var t = i[3].replace(/^[0-9]+/, "");
        var n = i[3].match(/^[0-9]+/, "");
        var r = n[0].substr(0, 2);
        var a = n[0].substr(n[0].length - 2);
        var s = r[0] + i[0] + r[1] + i[1] + a[0] + i[2] + a[1] + t;
        var o = n[0].substring(2, n[0].length - 2);
        return string_encode3(s) * privateNum == o ? "1" : "0";
      }
      return (e != bE("bad") && alert(strNewLicenseFormat), "0");
    }
    function string_encode(e) {
      return (
        e.length * e.charCodeAt(0) +
        e.charCodeAt(Math.floor(0.1 * (e.length - 1))) +
        e.charCodeAt(Math.floor(0.2 * (e.length - 1))) +
        e.charCodeAt(Math.floor(0.3 * (e.length - 1))) +
        e.charCodeAt(Math.floor(0.4 * (e.length - 1))) +
        e.charCodeAt(Math.floor(0.5 * (e.length - 1))) +
        e.charCodeAt(Math.floor(0.7 * (e.length - 1))) +
        e.charCodeAt(Math.floor(0.8 * (e.length - 1))) +
        e.charCodeAt(Math.floor(0.9 * (e.length - 1))) +
        e.charCodeAt(e.length - 1)
      );
    }
    function check_v1_License(e) {
      var i = e.split("**");
      return (
        !(
          !e
            .replace(/^ +|| +$/g, "")
            .match(/^.+\*\*.+\*\*[0-9]+[A-Za-z]{3}$/) || 3 != i.length
        ) || (alert(strOldLicenseFormat), false)
      );
    }
    function check_v2_License(e) {
      var i = e.split("*");
      return (
        e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/) &&
        4 == i.length
      );
    }
    function check_timed_License(e) {
      var i = e.split("*");
      return (
        e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[A-Z0-9#]+[A-Za-z]{3}[0-9]+$/) &&
        4 == i.length
      );
    }
    function checkCode(e, i, t) {
      if (
        ((i = null == i ? "" : i.replace(/^\s\s*/, "").replace(/\s\s*$/, "")),
        (myLicense = false),
        e && ((regUI = licUI()), (myRegPrompt = regUI.show()), !myRegPrompt))
      ) {
        return false;
      }
      var n = false;
      "@remote" == (i = null == license ? i : license).toLowerCase() &&
        ((i = strHeader + i), (n = true));
      var r = i.split("*");
      var a = i.match(/#/);
      var s = a && check_timed_License(i);
      var o = check_v2_License(i);
      if (!((offerTrial && "trial" == i.toLowerCase()) || n || o || s)) {
        if (i.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
          var l = confirm(strTempCode);
          return (
            isSecurityPrefSet() && l && openURL(exchangeUrl + "?serial=" + i),
            myLicense
          );
        }
        return (
          alert(
            strInvalidCode + "\n" + betaMode
              ? strNewLicenseFormat.replace(
                  new RegExp(bD("U1VM"), "g"),
                  bD("QlRB"),
                )
              : strNewLicenseFormat + "\n\n" + strContactSupport,
          ),
          saveSettings(prefsSectionName, prefsName, bE("bad")),
          saveSettings(prefsSectionName, prefsVersionName, strScriptVersion),
          saveSettings(prefsSectionName, prefsLicVersion, licensingVersion),
          checkCode(true),
          myLicense
        );
      }
      if (("trial" != i.toLowerCase() || n) && !n) {
        if (null != r[0] && r[0] != strHeader) {
          return (
            alert(strWrongProduct + "\n" + strContactSupport),
            checkCode(e),
            false
          );
        }
        var c = r[3].match(/[A-Z]{3}[0-9]+$/);
        if (null != c) {
          if (c[0].match(bD("QlRB")) && !betaMode) {
            return (
              alert(strBetaCodeAlert),
              saveSettings(prefsSectionName, prefsName, bE("bad")),
              checkCode(true),
              false
            );
          }
          myLicense = true;
        }
      }
      if (
        !isResultValidLicense(
          (licenseValidity = 2 == licV ? getVerifCode(i) : getVerifCode3(i)),
        )
      ) {
        e || (e = true);
        var f = "e" in licenseValidity ? "\n" + licenseValidity.e : "";
        return (
          alert(
            licErrors[locale][checkErrorCode(licenseValidity.result)].title +
              "\n" +
              licErrors[locale][checkErrorCode(licenseValidity.result)].detail +
              f,
          ),
          -9 == licenseValidity.result &&
            prompt(strDeactivate + "?") &&
            getVerifCode("-"),
          checkCode(e),
          myLicense
        );
      }
      if (
        ((isValidTrial =
          !a &&
          offerTrial &&
          "trial" == i.toLowerCase() &&
          isResultTrial(licenseValidity.result)),
        e && !isValidTrial)
      ) {
        var d = parseInt(retProp("^n", licenseValidity), 10);
        i.match(/@remote/i) ||
          alert(
            strRegSuccess.replace("%u", d) + (1 < d) && "de" != locale
              ? "s"
              : "" + betaMode
                ? ""
                : "\n" + strRegSuccess1,
          );
      }
      return ((myLicense = true), myLicense);
    }
    function checkForLegacyLic() {
      var e = haveSettings(prefsSectionName, prefsName)
        ? bD(getSettings(prefsSectionName, prefsName))
        : "";
      return check_v2_License(e) ? e : "";
    }
    function trial_expired() {
      var e = confirm(strExpiredAlert);
      isSecurityPrefSet() && e
        ? openURL(strTrialUrl)
        : e && isAE() && alert(strErrScriptAccess);
    }
    function bD(e) {
      var o = "";
      var l = 0;
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      for (
        var c =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        l < e.length;
      ) {
        i =
          (c.indexOf(e.charAt(l++)) << 2) |
          ((r = c.indexOf(e.charAt(l++))) >> 4);
        t = ((15 & r) << 4) | ((a = c.indexOf(e.charAt(l++))) >> 2);
        n = ((3 & a) << 6) | (s = c.indexOf(e.charAt(l++)));
        o += String.fromCharCode(i);
        64 != a && (o += String.fromCharCode(t));
        64 != s && (o += String.fromCharCode(n));
      }
      return o;
    }
    function bE(e) {
      for (
        i,
          t,
          n,
          r,
          a,
          s,
          o,
          l = "",
          c = 0,
          f =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        c < e.length;
      ) {
        r = (i = e.charCodeAt(c++)) >> 2;
        a = ((3 & i) << 4) | ((t = e.charCodeAt(c++)) >> 4);
        s = ((15 & t) << 2) | ((n = e.charCodeAt(c++)) >> 6);
        o = 63 & n;
        isNaN(t) ? (s = o = 64) : isNaN(n) && (o = 64);
        l = l + f.charAt(r) + f.charAt(a) + f.charAt(s) + f.charAt(o);
      }
      return l;
    }
    function isSecurityPrefSet() {
      var e =
        parseFloat(app.version) < 12
          ? "Main Pref Section"
          : "Main Pref Section v2";
      return (
        1 ==
        app.preferences.getPrefAsLong(e, "Pref_SCRIPTING_FILE_NETWORK_SECURITY")
      );
    }
    function openURL(e) {
      if (
        ((e = e.toString()).match(/@/) ||
          e.match(/^https?:\/\//) ||
          (e = "http://" + e.replace(/^(http)?s?:?\/?\/?/, "")),
        isAE() || isPS())
      ) {
        Folder.commonFiles.parent.fsName;
        -1 != $.os.indexOf("Windows")
          ? systemCall('cmd /c "start ' + (e = e.replace(/&/g, "^&")) + '"')
          : systemCall('open "' + e + '"');
      } else {
        createFile(
          File(Folder.temp.fsName + "/openUrl.url"),
          "[InternetShortcut]\rURL=" + e + "\r",
          "UTF-8",
          true,
        ).execute();
      }
    }
    function parseRegistration(e) {
      if (0 == retProp("^r", licenseValidity)) {
        if (
          ((a = retProp("^f", licenseValidity)),
          (s = retProp("^la", licenseValidity)),
          (o = retProp("^n", licenseValidity)),
          (l = retProp("pe$", licenseValidity)),
          isTimeLimited &&
            (parseDateString(retProp("rt$", licenseValidity)),
            (f = parseDateString(retProp("nd$", licenseValidity)))),
          0 < e)
        ) {
          return a + "\'" + s + "\'" + retProp("^s", licenseValidity) + l + o;
        }
        n = a + s.toString().match(/^@/) ? "" : " " + s + " ";
        r = l;
      } else {
        n = "";
      }
      var d = strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
      switch (r) {
        case bD("U1VM"):
          i = " - " + strLicense + " " + d;
          break;
        case bD("QlRB"):
          i = " - " + strBTA + " " + d;
          break;
        case bD("RURV"):
          i = " - " + strEDU + " " + d;
          break;
        case bD("RkxU"):
          i = " - " + strFLT + " " + d;
          break;
        default:
          c = retProp("^t", licenseValidity);
          isTimeLimited ||
            (i = c < 1 ? strTrialExpired : strTrialTxt.replace(/%E/, c));
      }
      return (
        (t = "" != n ? strRegistration + n + i : i),
        isTimeLimited && (t += "\nLicense ends: " + f),
        t
      );
    }
    function parseDateString(e) {
      var i = e.toString().split("-");
      return new Date(
        parseInt(i[0]),
        parseInt(i[1] - 1),
        parseInt(i[2]),
      ).toDateString();
    }
    function retProp(e, i) {
      for (var t in i) {
        if (i.hasOwnProperty(t) && t.toString().match(new RegExp(e))) {
          return i[t];
        }
      }
      return "";
    }
    function isAE() {
      return BridgeTalk.appName == bD("YWZ0ZXJlZmZlY3Rz");
    }
    function isPS() {
      return BridgeTalk.appName == bD("cGhvdG9zaG9w");
    }
    function readFile(e) {
      if (null != e && null != e && e.exists && e.open("r")) {
        var i = e.read();
        return (e.close(), i);
      }
      return null;
    }
    function createFile(e, i, t, n, r) {
      return (
        ((null == e || null == e || e.exists) && !n) ||
          (e.exists && e.remove(),
          ((e =
            -1 != $.os.indexOf("Win")
              ? new File(e.fsName)
              : new File(e.absoluteURI)).encoding = t),
          e.open("w"),
          e.write(i),
          e.close(),
          (null != r && r) || (e.hidden = true),
          -1 != $.os.indexOf("Mac") &&
            systemCall(bD("Y2htb2QgNzU3IA==") + e.absoluteURI)),
        e
      );
    }
    function systemCall(e) {
      if (isAE()) {
        return system.callSystem(e);
      }
      if (isPS()) {
        var i =
          -1 != $.os.indexOf("Win")
            ? Folder.temp.fsName
            : Folder.temp.absoluteURI +
              "/" +
              Math.round(Math.random() * 71827 * new Date().getTime());
        return (app.system(e + " > " + i), readFile(File(i)));
      }
      return "";
    }
    function parseSettings(e, i) {
      for (var t in i) {
        if (i.hasOwnProperty(t)) {
          if ("object" == typeof i[t]) {
            return parseSettings(e, i[t]);
          }
          if (t === e) {
            return i[t];
          }
        }
      }
    }
    function readJSON(e) {
      if (null == e || null == e) {
        return false;
      }
      e instanceof File || File(e);
      var i = readFile(e);
      return JSONify(i, "parse");
    }
    function writeJSON(e, i) {
      if (null == e || null == e || null == i || null == i) {
        return false;
      }
      i instanceof File || File(i);
      return (
        createFile(i, JSONify(e, "stringify", "\t"), "UTF-8", true, true),
        i.exists
      );
    }
    function getSettings(e, i, t) {
      if (isAE() && "settings" != t) {
        return app.settings.getSetting(e, i);
      }
      var n = File(prefsLocation + prefsPrefix + File.encode(e));
      var r = readFile(n);
      var a = JSONify(r, "parse");
      if (a instanceof Array) {
        for (var s in ((a = fixSettingsFile(a)), n.remove(), a)) {
          saveSettings(e, s, a[s]);
        }
      }
      return a[i];
    }
    function haveSettings(e, i, t) {
      if (isAE() && "settings" != t) {
        return app.settings.haveSetting(e, i);
      }
      var n = readFile(File(prefsLocation + prefsPrefix + File.encode(e)));
      if (null != n) {
        var r = JSONify(n.toString(), "parse");
        return (r instanceof Array && (r = fixSettingsFile(r)), i in r);
      }
      return false;
    }
    function fixSettingsFile(e) {
      for (var i = {}, t = 0; t < e.length - 1; t++) {
        i[e[t]] = e[t + 1];
        t++;
      }
      return i;
    }
    function saveSettings(e, i, t, n) {
      if (isAE() && "settings" != n) {
        app.settings.saveSetting(e, i, t);
        app.preferences.saveToDisk();
      } else {
        var r = {};
        var a = File(prefsLocation + prefsPrefix + File.encode(e));
        if (a.exists) {
          var s = readFile(a);
          null != s && (r = JSONify(s.toString(), "parse"));
        }
        r instanceof Array && (r = fixSettingsFile(r));
        r[i] = t;
        createFile(
          File(prefsLocation + prefsPrefix + File.encode(e)),
          JSONify(r, "stringify", "\t"),
          "UTF-8",
          true,
        );
      }
    }
    function saveVersionsToPrefs() {
      saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
      saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
    }
    function isVT() {
      return (
        (void 0 !== licenseValidity &&
          licenseValidity.hasOwnProperty("result")) ||
          (licenseValidity = getVerifCode("")),
        isResultValidLicense(licenseValidity) &&
          isResultTrial(licenseValidity.result)
      );
    }
    function getRegistration(e) {
      return (
        (void 0 !== licenseValidity &&
          licenseValidity.hasOwnProperty("result")) ||
          (licenseValidity = getVerifCode("")),
        parseRegistration(e)
      );
    }
    function removeLic() {
      (void 0 !== licenseValidity &&
        licenseValidity.hasOwnProperty("result")) ||
        (licenseValidity = getVerifCode(""));
      var e =
        isServerConfigured(licenseValidity) && isServerRunning(licenseValidity)
          ? strHeader + "@REMOTE"
          : "";
      return (
        (licenseValidity = getVerifCode("-" + e)),
        (theLicense = false),
        alert(strScriptName + ": " + strLicenseRemoved),
        isServerConfigured(licenseValidity) ||
          (saveSettings(prefsSectionName, prefsName, bE("bad")),
          saveSettings(prefsSectionName, prefsVersionName, strScriptVersion),
          saveSettings(prefsSectionName, prefsLicVersion, licensingVersion)),
        !theLicense
      );
    }
    function mainFunc(e) {
      if (
        !isAE() ||
        isSecurityPrefSet() ||
        (alert(strErrScriptAccess),
        parseFloat(app.version) < 16.1
          ? app.executeCommand(2359)
          : app.executeCommand(3131),
        isSecurityPrefSet())
      ) {
        if (betaMode && checkBeta(betaExpirationDate, betaStartDate)) {
          "l" == e && alert(strBetaExpiredAlert);
        } else {
          if ("l" == e || "c" == e || "r" == e) {
            var n = false;
            if (
              ("l" == e && doUpdateCheck && checkForNewVersion(), 2 == licV)
            ) {
              if ("r" == e) {
                t = !removeLic();
              } else {
                if ("-22" == (licenseValidity = getVerifCode("")).result) {
                  var r =
                    "e" in licenseValidity ? "\n" + licenseValidity.e : "";
                  alert(
                    licErrors[locale][checkErrorCode(licenseValidity.result)]
                      .title +
                      "\n" +
                      licErrors[locale][checkErrorCode(licenseValidity.result)]
                        .detail +
                      r,
                  );
                  getVerifCode("-");
                  n = true;
                  i =
                    isServerConfigured(licenseValidity) &&
                    isServerRunning(licenseValidity)
                      ? "@REMOTE"
                      : "trial";
                }
                if (
                  isResultValidLicense(licenseValidity) &&
                  !isResultTrial(licenseValidity.result)
                ) {
                  return true;
                }
                "" == (i = checkForLegacyLic()) &&
                  ((n = true),
                  (i =
                    isServerConfigured(licenseValidity) &&
                    isServerRunning(licenseValidity)
                      ? "@REMOTE"
                      : "trial"));
                t = checkCode(n, i, privateNum);
              }
            } else {
              haveSettings(prefsSectionName, prefsName)
                ? ((i = getSettings(prefsSectionName, prefsName)),
                  (n = !(
                    "c" == e ||
                    !(
                      ("bad" == i || "bad" == bD(i) || offerTrial) &&
                      "trial" == bD(i)
                    )
                  )))
                : "c" == e
                  ? (saveSettings(
                      prefsSectionName,
                      prefsName,
                      bE((i = !isTimeLimited && offerTrial ? "trial" : "")),
                    ),
                    saveSettings(
                      prefsSectionName,
                      prefsVersionName,
                      strScriptVersion,
                    ),
                    saveSettings(
                      prefsSectionName,
                      prefsLicVersion,
                      licensingVersion,
                    ),
                    (n = false))
                  : (n = true);
              t = checkCode(n, i, privateNum);
            }
            return t;
          }
        }
      }
    }
    var licensingVersion = "3.0.38";
    null == vars.scriptName &&
      alert("scriptName variable missing in settings object");
    var strScriptName = vars.scriptName;
    null == vars.scriptVersion &&
      alert("scriptVersion variable missing in settings object");
    var strScriptVersion = vars.scriptVersion;
    null == vars.scriptURL &&
      alert("scriptURL variable missing in settings object");
    var strTrialUrl = vars.scriptURL;
    null == vars.privateNumber &&
      alert("privateNumber variable missing in settings object");
    var privateNum = vars.privateNumber;
    null == vars.productSKU &&
      alert("productSKU variable missing in settings object");
    var strSKU = vars.productSKU;
    var strSKUArray = strSKU.toString().split("-");
    if (null == strSKUArray || 2 != strSKUArray.length) {
      return (
        alert(
          "Product SKU incorrectly entered in settings. Should looks like this: XXXX-SUL",
        ),
        false
      );
    }
    null == vars.helpText && (vars.helpText = "");
    null == vars.helpButtons && (vars.helpButtons = []);
    var isTimeLimited =
      vars.hasOwnProperty("isTimeLimited") && vars.isTimeLimited;
    var strHeader = strSKUArray[0];
    var betaSupportEmail = vars.hasOwnProperty("betaSupportEmail")
      ? vars.betaSupportEmail
      : "";
    var offerTrial = !vars.hasOwnProperty("offerTrial") || vars.offerTrial;
    var trialLengthDays = vars.hasOwnProperty("trialLengthDaysX")
      ? vars.trialLengthDaysX
      : Math.round(Math.sqrt(parseInt(bD("NTU3Ng==").substr(0, 2))));
    var betaMode = !!vars.hasOwnProperty("offerBeta") && vars.offerBeta;
    if (betaMode) {
      null == vars.betaStartDate &&
        alert("betaStartDate variable missing in settings object");
      var betaStartDate = vars.betaStartDate;
      null == vars.betaExpirationDate &&
        alert("betaExpirationDate variable missing in settings object");
      var betaExpirationDate = vars.betaExpirationDate;
    }
    var supportEmail =
      vars.hasOwnProperty("externalSupportURL") && "" != vars.externalSupportURL
        ? vars.externalSupportURL
        : "http://aescripts.com/contact";
    betaMode && "" != betaSupportEmail && (supportEmail = betaSupportEmail);
    var aescriptsSupportUrl = "https://aescripts.com/contact";
    var supportUrl =
      vars.hasOwnProperty("externalSupportURL") && "" != vars.externalSupportURL
        ? vars.externalSupportURL
        : aescriptsSupportUrl;
    var isAescriptsSupportUrl = supportUrl === aescriptsSupportUrl;
    isAescriptsSupportUrl &&
      (supportUrl = supportUrl.replace(/\/*/, "") + "/?direct=1&sku=");
    var aescriptsRetrieveUrl =
      "https://aescripts.com/downloadable/customer/products";
    var retrieveUrl =
      vars.hasOwnProperty("retrieveLicenseURL") && "" != vars.retrieveLicenseURL
        ? vars.retrieveLicenseURL
        : aescriptsRetrieveUrl;
    var exchangeUrl = "https://license.aescripts.com/exchange";
    var useLegacyPrefsHeader =
      !!vars.hasOwnProperty("useLegacyPrefsHeader") &&
      vars.useLegacyPrefsHeader;
    var managerAppUrl =
      "https://aescripts.com/learn/aescripts-aeplugins-manager-app/";
    var remindMeLaterDays = 7;
    var doUpdateCheck = true;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    var wx = __BLOB__BLOB_000067__;
    var mx = __BLOB__BLOB_000068__;
    function JSONify(string, mode, prettyJSON) {
      if (typeof JSON !== "object") {
        JSON = {};
      }
      (function () {
        function f(n) {
          return n < 10 ? "0" + n : n;
        }
        function this_value() {
          return this.valueOf();
        }
        function quote(string) {
          rx_escapable.lastIndex = 0;
          return rx_escapable.test(string)
            ? '"' +
                string.replace(rx_escapable, function (a) {
                  var c = meta[a];
                  return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
            : '"' + string + '"';
        }
        function str(key, holder) {
          var mind = gap;
          var value = holder[key];
          if (
            value &&
            typeof value === "object" &&
            typeof value.toJSON === "function"
          ) {
            value = value.toJSON(key);
          }
          if (typeof rep === "function") {
            value = rep.call(holder, key, value);
          }
          switch (typeof value) {
            case "string":
              return quote(value);
            case "number":
              return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
              return String(value);
            case "object":
              if (!value) {
                return "null";
              }
              gap += indent;
              partial = [];
              if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (var i = 0; i < length; i += 1) {
                  partial[i] = str(i, value) || "null";
                }
                v =
                  partial.length === 0
                    ? "[]"
                    : gap
                      ? "[\n" +
                        gap +
                        partial.join(",\n" + gap) +
                        "\n" +
                        mind +
                        "]"
                      : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
              }
              if (rep && typeof rep === "object") {
                length = rep.length;
                for (var i = 0; i < length; i += 1) {
                  if (typeof rep[i] === "string") {
                    k = rep[i];
                    v = str(k, value);
                    if (v) {
                      partial.push(quote(k) + gap ? ": " : ":" + v);
                    }
                  }
                }
              } else {
                for (var k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = str(k, value);
                    if (v) {
                      partial.push(quote(k) + gap ? ": " : ":" + v);
                    }
                  }
                }
              }
              v =
                partial.length === 0
                  ? "{}"
                  : gap
                    ? "{\n" +
                      gap +
                      partial.join(",\n" + gap) +
                      "\n" +
                      mind +
                      "}"
                    : "{" + partial.join(",") + "}";
              gap = mind;
              return v;
          }
        }
        ("use strict");
        var rx_one = /^[\],:{}\s]*$/;
        var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        var rx_three =
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
        var rx_escapable =
          /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var rx_dangerous =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        if (typeof Date.prototype.toJSON !== "function") {
          Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
              ? this.getUTCFullYear() +
                  "-" +
                  f(this.getUTCMonth() + 1) +
                  "-" +
                  f(this.getUTCDate()) +
                  "T" +
                  f(this.getUTCHours()) +
                  ":" +
                  f(this.getUTCMinutes()) +
                  ":" +
                  f(this.getUTCSeconds()) +
                  "Z"
              : null;
          };
          Boolean.prototype.toJSON = this_value;
          Number.prototype.toJSON = this_value;
          String.prototype.toJSON = this_value;
        }
        if (typeof JSON.stringify !== "function") {
          meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
          };
          JSON.stringify = function (value, replacer, space) {
            gap = "";
            indent = "";
            if (typeof space === "number") {
              for (var i = 0; i < space; i += 1) {
                indent += " ";
              }
            } else {
              if (typeof space === "string") {
                indent = space;
              }
            }
            rep = replacer;
            if (
              replacer &&
              typeof replacer !== "function" &&
              (typeof replacer !== "object" ||
                typeof replacer.length !== "number")
            ) {
              throw new Error("JSON.stringify");
            }
            return str("", { "": value });
          };
        }
      })();
      var jsonParse = (function () {
        function v(h, j, e) {
          return j ? u[j] : String.fromCharCode(parseInt(e, 16));
        }
        var r =
          "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
        var k =
          '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
        k = '(?:"' + k + '*")';
        var s = new RegExp(
          "(?:false|true|null|[\\{\\}\\[\\]]|" + r + "|" + k + ")",
          "g",
        );
        var t = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
        var u = {
          '"': '"',
          "/": "/",
          "\\": "\\",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "\t",
        };
        var w = new String("");
        var x = Object.hasOwnProperty;
        return function (h, j) {
          h = h.match(s);
          var c = h[0];
          var l = false;
          if ("{" === c) {
            e = {};
          } else if ("[" === c) {
            e = [];
          } else {
            e = [];
            l = true;
          }
          for (b, d = [e], m = 1 - l, y = h.length; m < y; ++m) {
            c = h[m];
            switch (c.charCodeAt(0)) {
              default:
                a = d[0];
                a[b || a.length] = c;
                b = void 0;
                break;
              case 34:
                c = c.substring(1, c.length - 1);
                if (c.indexOf("\\") !== -1) {
                  c = c.replace(t, v);
                }
                a = d[0];
                if (!b) {
                  if (a instanceof Array) {
                    b = a.length;
                  } else {
                    b = c || w;
                    break;
                  }
                }
                a[b] = c;
                b = void 0;
                break;
              case 91:
                a = d[0];
                d.unshift((a[b || a.length] = []));
                b = void 0;
                break;
              case 93:
                d.shift();
                break;
              case 102:
                a = d[0];
                a[b || a.length] = false;
                b = void 0;
                break;
              case 110:
                a = d[0];
                a[b || a.length] = null;
                b = void 0;
                break;
              case 116:
                a = d[0];
                a[b || a.length] = true;
                b = void 0;
                break;
              case 123:
                a = d[0];
                d.unshift((a[b || a.length] = {}));
                b = void 0;
                break;
              case 125:
                d.shift();
                break;
            }
          }
          if (l) {
            if (d.length !== 1) {
              throw new Error();
            }
            e = e[0];
          } else {
            if (d.length) {
              throw new Error();
            }
          }
          if (j) {
            var p = function (n, o) {
              var f = n[o];
              if (f && typeof f === "object") {
                var i = null;
                for (var g in f) {
                  if (x.call(f, g) && f !== n) {
                    var q = p(f, g);
                    if (q !== void 0) {
                      f[g] = q;
                    } else {
                      i || (i = []);
                      i.push(g);
                    }
                  }
                }
                if (i) {
                  for (g = i.length; --g >= 0; ) {
                    delete f[i[g]];
                  }
                }
              }
              return j.call(n, o, f);
            };
            e = p({ "": e }, "");
          }
          return e;
        };
      })();
      try {
        switch (mode) {
          case "parse":
            if (
              /^[\],:{}\s]*$/.test(
                string
                  .replace(/\\["\\\/bfnrtu]/g, "@")
                  .replace(
                    /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                    "]",
                  )
                  .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
              )
            ) {
              return jsonParse(string);
            } else {
              alert("JSON validation error\n" + string.substring(0, 1000));
            }
            break;
          case "stringify":
            return JSON.stringify(string, undefined, prettyJSON);
            break;
        }
      } catch (e) {
        alert(e.toString());
      }
    }
    $.locale = isAE() ? app.isoLanguage : $.locale;
    var locale = $.locale.split("_")[0];
    ("fr" == locale && "de" == locale && "es" == locale) || (locale = "en");
    var strTempCode = localize({
      de:
        "Du hast eine tempor\xe4re Seriennummer eingegeben, die gegen eine permanente Lizenz eingetauscht werden muss.\n\nSobald Du eine permanente Lizenz erhalten hast, kannst Du sie verwenden um" +
        strScriptName +
        " zu registrieren.  Der Austausch ist schnell und unkompliziert, gehe einfach zu:\n\n" +
        exchangeUrl +
        "\n\nWillst Du jetzt dorthin gehen?",
      en:
        "You entered a temporary serial number that needs to be exchanged for a permanent license.\n\nOnce you obtain your permanent license you can use it to register " +
        strScriptName +
        ".  It is quick and easy to exchange it, simply go to:\n\n" +
        exchangeUrl +
        "\n\nWould you like to go there now?",
      es:
        "Ha introducido un n\xfamero de serie provisional que necesita ser sustituido por una licencia permanente.\n\nUna vez obtenga una licencia permamente puede usarla para registrar " +
        strScriptName +
        ". Reemplazarla es r\xe1pido y sencillo, simplemente vaya a:\n\n" +
        exchangeUrl +
        "\n\n\xbfQuiere ir all\xed ahora?",
      fr:
        "Vous avez entr\xe9 un num\xe9ro de s\xe9rie temporaire devant \xeatre \xe9chang\xe9 contre une licence permanente.\n\nUne fois votre licence permanente acquise, vous pouvez l\'utiliser pour vous enregistrer " +
        strScriptName +
        ".  Le changement est rapide et facile,  allez simplement \xe0:\n\n" +
        exchangeUrl +
        "\n\nVoulez-vous y aller maintenant?",
    });
    var strExpiredAlert = localize({
      de:
        "Die Testversion ist leider abgelaufen.\nDu kannst unter " +
        strTrialUrl +
        " eine Lizenz erwerben.\n\nM\xf6chtest Du jetzt dorthin gehen?",
      en:
        "Sorry, this trial version has expired. \nYou can purchase a license at " +
        strTrialUrl +
        "\n\nWould you like to go there now?",
      es:
        "Lo siento, esta versi\xf3n de prueba ha expirado.\nPuede obtener una licencia en" +
        strTrialUrl +
        "\n\n\xbfQuiere ir all\xed ahora?",
      fr:
        "D\xe9sol\xe9, la p\xe9riode d\'essai a expir\xe9.\nPour acheter une licence, veuillez vous rendre sur la page " +
        strTrialUrl +
        "\n\nVoulez-vous ouvrir cette page maintenant ?",
    });
    var strBetaExpiredAlert = localize({
      de: "Die Betaversion ist leider abgelaufen",
      en: "Sorry, this beta version has expired",
      es: "Lo siento est\xe1 versi\xf3n beta ha expirado",
      fr: "D\xe9sol\xe9, la p\xe9riode beta a expir\xe9",
    });
    var strBetaCodeAlert = localize({
      de:
        "Beta Lizenzcode erkannt f\xfcr " +
        strScriptName +
        "\nBeta Lizenzen k\xf6nnen nur f\xfcr Betaversionen verwendet werden. Bitte verwende eine normale Lizenz f\xfcr diese Version.",
      en:
        "Beta license code detected for " +
        strScriptName +
        "\nBeta license codes can only be used on beta versions, please obtain a normal license to use this version.",
      es:
        "Licencia beta detectada para " +
        strScriptName +
        "\nLas licencias beta s\xf3lo pueden ser usadas con versiones beta, por favor obtenga una licencia normal para usar esta versi\xf3n.",
      fr:
        "Licence beta d\xe9tect\xe9e pour " +
        strScriptName +
        "\nLes codes pour licence beta ne peuvent \xeatre utilis\xe9s que pour les versions beta, merci de demander une licence r\xe9guli\xe8re pour utiliser cette version.",
    });
    var strBetaLicReq = localize({
      de: "F\xfcr diese Betaversion wird eine Lizenz ben\xf6tigt.\nBitte kontaktiere den Autor f\xfcr eine Betatester-Lizenz.",
      en: "A license is required to run this beta version\nPlease contact the author for a beta testing license.",
      es: "Es necesaria una licencia para utilizar esta versi\xf3n beta.\nPor favor, p\xf3ngase en contacto con el autor para obtener una licencia beta.",
      fr: "Une licence est requise pour ex\xe9cuter cette version beta\nMerci de contacter l\'auteur pour une licence beta de test.",
    });
    var strUsers = localize({
      de: "f\xfcr %u Nutzer",
      en: "for %u user",
      es: "para %u usuario",
      fr: "pour %u utilisateur",
    });
    var strRegSuccess = localize({
      de: "Registrierung erfolgreich " + strUsers,
      en: "Registration successful " + strUsers,
      es: "Registro completado " + strUsers,
      fr: "Enregistrement r\xe9ussi " + strUsers,
    });
    var strRegSuccess1 = localize({
      de: "Danke f\xfcr den Kauf von " + strScriptName,
      en: "Thank you for purchasing " + strScriptName,
      es: "Gracias por comprar " + strScriptName,
      fr: "Merci d\'avoir achet\xe9 " + strScriptName,
    });
    var strInvalidCode = localize({
      de: "Entschuldigung, der Lizenzcode ist nicht g\xfcltig.",
      en: "Sorry, the license code is not valid",
      es: "Lo siento, la licencia no es v\xe1lida",
      fr: "D\xe9sol\xe9, ce num\xe9ro de licence n\'est pas valide.",
    });
    var strFirewall = localize({
      de: "Eine Firewall oder ein Antivirus-Programm blockiert den Lizenz-Prozess. Bitte deaktiviere das Antivirus-Programm oder konfiguriere das System so, dass die Lizenz verifiziert werden kann.",
      en: "A firewall or virus protection software is blocking the licensing process.  Please disable this or configure it to allow this process so that the license can be verified.",
      es: 'Un software de "firewall" o de protecci\xf3n antivirus est\xe1 bloqueando el proceso de concesi\xf3n de licencias. Desactivela o configurela para permitir este proceso para que la licencia puede ser verificada.',
      fr: "Un logiciel pare-feu ou un logiciel antivirus bloque le processus de v\xe9rification de licence. Veuillez le d\xe9sactiver ou le configurer pour permettre \xe0 ce processus de v\xe9rifier la licence.",
    });
    var strContactSupport = localize({
      de: "Wenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + supportEmail,
      en: "If you require assistance please contact " + supportEmail,
      es: "Si necesita ayuda, por favor contacte " + supportEmail,
      fr: "Si vous avez besoin d\'aide, merci de contacter " + supportEmail,
    });
    var strCorruptedCode = localize({
      de:
        "Entschuldigung, irgendetwas ist mit dem " +
        strScriptName +
        " Lizenzcode passiert. Bitte gebe ihn erneut ein.\n\n" +
        strContactSupport,
      en:
        "Sorry, something must have happened to the " +
        strScriptName +
        " license code.  Please re-enter it at the prompt.\n" +
        strContactSupport,
      es:
        "Lo siento, algo ha ocurrido con la licencia de " +
        strScriptName +
        ". Por favor, vuelva a introducirla en la casilla.\n" +
        strContactSupport,
      fr:
        "D\xe9sol\xe9, il y a eu un probl\xe8me avec le num\xe9ro de licence pour " +
        strScriptName +
        ". Merci de bien vouloir le saisir \xe0 nouveau.n\n" +
        strContactSupport,
    });
    var strTrialThanks = localize({
      de: "Danke, dass Du " + strScriptName + " ausprobierst!",
      en: "Thanks for trying " + strScriptName + "!",
      es: "\xa1Gracias por probar " + strScriptName + "!",
      fr: "Merci d\'avoir essay\xe9 " + strScriptName + "!",
    });
    var strTrialTxt = localize({
      de: "Testversion - noch %E Tage g\xfcltig",
      en: "Trial version - %E days left",
      es: "Versi\xf3n de prueba - faltan %E d\xedas",
      fr: "Version d\'\xe9valuation - %E jour(s) restant",
    });
    var strTrialTxt2 = localize({
      de: "%E Programmstarts \xfcbrig f\xfcr die Testversion",
      en: "%E launches left in the trial",
      es: "%E usos restantes de la versi\xf3n de prueba",
      fr: "Il vous reste %E essais",
    });
    var strTrialWelcomeHeader = localize({
      de: "Willkommen bei " + strScriptName,
      en: "Welcome to " + strScriptName,
      es: "Bienvenido a " + strScriptName,
      fr: "Bienvenue sur " + strScriptName,
    });
    var strOK = localize({ de: "OK", en: "OK", es: "OK", fr: "OK" });
    var strCancel = localize({
      de: "Abbrechen",
      en: "Cancel",
      es: "Cancelar",
      fr: "Annuler",
    });
    var strGetSupport = localize({
      de: "Support zu erhalten",
      en: "Get support",
      es: "Obtener apoyo",
      fr: "Contacter le support client",
    });
    var strRetrieveLic = localize({
      de: "%t vergessen?",
      en: "Retrieve %t",
      es: "Recuperar %t",
      fr: "Retrouver votre %t",
    });
    var strBuyLic = localize({
      de: "%t Kaufen",
      en: "Buy %t",
      es: "Compra %t",
      fr: "Acheter une %t",
    });
    var strLicense = localize({
      de: "Lizenz",
      en: "License",
      es: "licencia",
      fr: "Licence",
    });
    var strDownloads = localize({
      de: "Download",
      en: "Download",
      es: "Descarga",
      fr: "T\xe9l\xe9chargement",
    });
    var strPpcNotSupported = localize({
      de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
      en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
      es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
      fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
    });
    var strAllowScriptsPrefsSection =
      parseFloat(app.version) < 16.1
        ? localize({
            de: "Allgemein",
            en: "General",
            es: "General",
            fr: "G\xe9n\xe9ral",
          })
        : localize({
            de: "Skripterstellung und Expression",
            en: "Scripting & Expressions",
            es: "Escripts y expresi\xf3nes",
            fr: "Scripts et expressions",
          });
    var strErrScriptAccess = localize({
      de:
        strScriptName +
        ' ben\xf6tigt die Erlaubnis Dateien zu schreiben\n Gehe in Voreinstellungen von After Effects in die Rubrik "' +
        strAllowScriptsPrefsSection +
        '" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
      en:
        strScriptName +
        ' requires access to write files\nGo to the "' +
        strAllowScriptsPrefsSection +
        '" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
      es:
        strScriptName +
        ' necesita poder escribir archivos\nVaya al panel "' +
        strAllowScriptsPrefsSection +
        '" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
      fr:
        strScriptName +
        " n\xe9cessite les droits d\'\xe9criture de fichiers\nAllez dans le panneau \"" +
        strAllowScriptsPrefsSection +
        '" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
    });
    var strUpdateLicenseHeader = localize({
      de: strScriptName + " Lizenz-Update ben\xf6tigt",
      en: strScriptName + " License Update Required",
      es: strScriptName + " necesita actualizar la licencia",
      fr: "La licence de " + strScriptName + " doit \xeatre mise \xe0 jour",
    });
    var strLicenseDownloadOptions = localize({
      de: 'Alle Deine %t findest Du unter "My Downloads & Licenses" in Deinem aescripts.com Benutzer-Account, oder \xfcber unsere Manager-App.',
      en: 'All your %t are in the "My Downloads & Licenses" section of your aescripts.com user account, or via our Manager App.',
      es: 'Todas sus %t est\xe1n en la secci\xf3n "My Downloads & Licenses" de su cuenta de usuario en aescripts.com, o a trav\xe9s de nuestra App Manager.',
      fr: 'Toutes vos %t se trouvent dans la section "My Downloads & Licenses" de votre compte utilisateur sur aescripts.com, ou via notre App Manager.',
    });
    var strMyDownloads = localize({
      de: "Gehen Sie zu My Downloads & Licenses",
      en: "Go to My Downloads & Licenses",
      es: "Ir a My Downloads & Licenses",
      fr: "Aller \xe0 My Downloads & Licenses",
    });
    var strDownloadManager = localize({
      de: "Laden Sie die Manager-App herunter",
      en: "Download Manager App",
      es: "Descargar App Manager",
      fr: "T\xe9l\xe9charger App Manager",
    });
    var strOldLicenseFormat = localize({
      de: "Die Lizenz sollte so aussehen:\n\nFirstname**Lastname**111111111SUL",
      en: "License should look like this:\n\nFirstname**Lastname**111111111SUL",
      es: "La licencia debe tener este aspecto:\n\nNombre**Apellido**111111111SUL",
      fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPr\xe9nom**Nom**111111111SUL",
    });
    var strNewLicenseFormat = localize({
      de: "Die Lizenz sollte so aussehen:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      en: "License should look like this:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      es: "La licencia debe tener este aspecto:\n\nPRODUCTID*NOMBRE*APELLIDO*1111111SUL1",
      fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPRODUCTID*PRENOM*NOM*1111111SUL1",
    });
    var strRegistration = localize({
      de: "Registriert f\xfcr: ",
      en: "Registered to: ",
      es: "Registrado a: ",
      fr: "Enregistr\xe9 pour: ",
    });
    var strUnknownError = localize({
      de:
        "Es gab einen unerwarteten Fehler\nBitte \xf6ffne hier ein Support-Ticket:\n" +
        supportEmail +
        "\n\nund f\xfcge einen Screenshot der Fehlermeldung bei\n\n",
      en:
        "There was an unexpected error\nPlease please open a support ticket here:\n" +
        supportEmail +
        "\n\nand submit screenshot of this error message\n\n",
      es:
        "Se ha producido un error desconocido\nPor favor habra un ticket de soporte aqui:\n" +
        supportEmail +
        "\n\ny presente una captura de pantalla con este mensaje de error\n\n",
      fr:
        "Une erreur vient de se produire \nVeuillez ouvrir un ticket de service client \xe0 cette adresse:\n" +
        supportEmail +
        "\n\net n\'oubliez pas d\'y joindre une capture d\'\xe9cran de ce message\n\n",
    });
    var strWrongProduct = localize({
      de: "Dieser Lizenz-Code ist f\xfcr ein anderes Produkt, bitte stelle sicher, dass du den richtigen Lizenzcode eingibst\n\n",
      en: "This license code is for a different product, please double check that you are entering the correct license\n\n",
      es: "Este c\xf3digo de licencia es para un producto diferente, por favor, comprobar que esta introduciendo la licencia correcta\n\n",
      fr: "Vous venez d\'entrer la cl\xe9 de licence d\'un autre produit, assurez-vous d\'utiliser la bonne cl\xe9 de licence\n\n",
    });
    var strNewVersionAvailableHdr = localize({
      de: strScriptName + " Update verf\xfcgbar",
      en: strScriptName + " Update Available",
      es: strScriptName + " Actualizaci\xf3n disponible",
      fr: strScriptName + " Mise \xe0 jour disponible",
    });
    var strNewVersionAvailable = localize({
      de:
        "Eine neuere Version von " + strScriptName + " ist verf\xfcgbar: v%\n",
      en: "A newer version of " + strScriptName + " is available: %v\n",
      es:
        "Una versi\xf3n nueva de " +
        strScriptName +
        " est\xe1 disponible: v%\n",
      fr: "Une version plus de " + strScriptName + " est disponible: v%\n",
    });
    var strCurrentVersion = localize({
      de: "Votre version install\xe9e est: v%",
      en: "Your installed version is: %v",
      es: "Su versi\xf3n instalada es: v%",
      fr: "Votre version install\xe9e est: v%",
    });
    var strDownload = localize({
      de: "Download",
      en: "Download",
      es: "Descargar",
      fr: "T\xe9l\xe9charger",
    });
    var strVersion = localize({
      de: "Version",
      en: "version",
      es: "versi\xf3n",
      fr: "version",
    });
    var strSkipVersion = localize({
      de: "Diese Version \xdcberspringen",
      en: "Skip this Version",
      es: "Salta esta versi\xf3n",
      fr: "Ignorer cette version",
    });
    var strRemindMeLater = localize({
      de: "Erinnere mich sp\xe4ter",
      en: "Remind Me Later",
      es: "Recu\xe9rdame m\xe1s tarde",
      fr: "Rappelle-moi plus tard",
    });
    var strNewestVersionAvailable = localize({
      de: "Neueste verf\xfcgbare Version",
      en: "Newest available version",
      es: "Versi\xf3n mas nueva disponible",
      fr: "Nouvelle version disponible",
    });
    var strVersionRev = localize({
      de: "v%a%b - %c",
      en: "v%a%b - %c",
      es: "v%a%b - %c",
      fr: "v%a%b - %c",
    });
    var strDeactivate = localize({
      de: "Lizenz Deaktivieren",
      en: "Deactivate License",
      es: "Desactivar Licencia",
      fr: "D\xe9sactiver la licence",
    });
    var strVersionCheck = localize({
      de: "Automatisch nach Aktualisierungen suchen",
      en: "Check for updates automatically",
      es: "Revisar actualizaciones automaticamente",
      fr: "V\xe9rifier les mises \xe0 jour automatiquement",
    });
    var strCheckNow = localize({
      de: "Jetzt nach Update suchenn",
      en: "Check for update now",
      es: "Buscar actualizaci\xf3n ahora",
      fr: "V\xe9rifier les mise \xe0 jour maintenant",
    });
    var strUpdateCheckError = localize({
      de: "Bei der Suche nach Updates ist ein Fehler aufgetreten.\nBitte vergewissern Sie sich, dass Sie \xfcber eine g\xfcltige Internetverbindung verf\xfcgen und diese nicht durch Firewalls blockiert wird.",
      en: "There was an error when checking for updates.\nPlease verify that you have a valid internet connection and that it is not blocked by any firewalls.",
      es: "Hubo un error en la comprobaci\xf3n de actualizaciones.\nPor favor compruebe que tiene una conexi\xf3n a Internet v\xe1lida y que no est\xe9 bloqueada por un cortafuegos.",
      fr: "Une erreur s\'est produite lors de la recherche de mises \xe0 jour.\nV\xe9rifiez que votre connexion Internet est valide et qu\'elle n\'est bloqu\xe9e par aucun pare-feu.",
    });
    var strUpToDate = localize({
      de:
        "Sie sind auf dem neuesten Stand! \n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " ist derzeit die neueste Version verf\xfcgbar.",
      en:
        "You are up to date!\n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " is currently the latest version available.",
      es:
        "\xa1Est\xe1 actualizado! \n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " es actualmente la \xfaltima versi\xf3n disponible.",
      fr:
        "Vous \xeates \xe0 jour!\n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " est actuellement la derni\xe8re version disponible.",
    });
    var strInvalidLicense = localize({
      de: "Ung\xfcltige Lizenz",
      en: "Invalid license",
      es: "La licencia no es v\xe1lida",
      fr: "Licence non valide",
    });
    var strLicenseRemoved = localize({
      de: "Lizenz entfernt",
      en: "License removed",
      es: "Licencia eliminada",
      fr: "Licence supprim\xe9e",
    });
    var strLicense = localize({
      de: "Lizenz",
      en: "License",
      es: "Licencia",
      fr: "Licence",
    });
    var strBTA = localize({
      de: "Beta-Lizenz",
      en: "Beta License",
      es: "Licencia Beta",
      fr: "Licence Beta",
    });
    var strEDU = localize({
      de: "EDU-Lizenz",
      en: "Educational License",
      es: "Licencia Educacional",
      fr: "T\xe9l\xe9charger",
    });
    var strFLT = localize({
      de: "Floating-Lizenz",
      en: "Floating License",
      es: "Licencia flotante",
      fr: "Licence flottante",
    });
    var strUNKNOWN = localize({
      de: "License mit unbekanntem Typ",
      en: "License of unknown type",
      es: "Licencia de tipo desconocido",
      fr: "Licence inconnue",
    });
    var strTrialExpired = localize({
      de: "Testversion abgelaufen",
      en: "MONTER GROUP\xa9",
      es: "Termino de prueba expirado",
      fr: "\xc9valuation termin\xe9e",
    });
    var licErrors = {
      de: {
        "-1": { detail: "", title: "Ung\xfcltige Lizenz (-1)" },
        "-10": {
          detail: "Auf dem Lizenzserver sind alle Lizenzen bereits vergeben",
          title: "Keine freien Slots (-10)",
        },
        "-100": {
          detail:
            "Eine Lizenz kann \xfcber den Button \'Lizenz Kaufen\' erworben werden",
          title: "Testversion abgelaufen",
        },
        "-101": {
          detail:
            "Bitte konfigurieren oder deaktivieren Sie alle Firewalls oder Virenprogramme, die den Zugriff auf den Basisordner blockieren k\xf6nnten. Wenn dieser Zugriff blockiert ist, kann die Lizenz nicht verifiziert werden.",
          title: "Zugriff blockiert (-101)",
        },
        "-102": {
          detail:
            "Bitte kontaktieren Sie den Support und senden Sie einen Screenshot dieses Fehlers. " +
            supportEmail,
          title: "Kein Ergebnis (-102)",
        },
        "-103": {
          detail: "Could not find the number of trial days",
          title: "Anzahl der Test-Tage nicht festgelegt (-103)",
        },
        "-104": {
          detail: "Die Lizenz ist nicht f\xfcr dieses Produkt",
          title: "Ung\xfcltige Lizenz (-104)",
        },
        "-105": {
          detail:
            "Eine Beta-Lizenz kann f\xfcr diese Vollversion nicht verwendet werden",
          title: "Beta-Lizenz nicht verwendbar (-105)",
        },
        "-106": {
          detail:
            "Dieses Produkt beinhaltet keine Testversion und ben\xf6tigt eine Lizenz",
          title: "Bitte Lizenz installieren (-106)",
        },
        "-107": {
          detail:
            "Diese Beta beinhaltet keine Testversion und ben\xf6tigt eine Lizenz",
          title: "Bitte Lizenz installieren (-107)",
        },
        "-108": {
          detail:
            "Bitte konfigurieren oder deaktivieren Sie alle Firewalls oder Virenprogramme, die den Zugriff auf den Basisordner blockieren k\xf6nnten. Wenn dieser Zugriff blockiert ist, kann die Lizenz nicht verifiziert werden.",
          title: "Nicht in der Lage, auf den Home-Ordner zuzugreifen (-108)",
        },
        "-11": {
          detail: "Die Lizenz kann auf dem Lizenzserver nicht gefunden werden",
          title: "Unbekannte Lizenz (-11)",
        },
        "-12": {
          detail:
            "Die Lizenz konnte nicht deaktiviert werden, da sie dem Server unbekannt ist",
          title: "Unbekannte Lizenz (-12)",
        },
        "-13": {
          detail:
            "Die IP-Adresse dieses Rechners ist \xfcber eine Blacklist auf dem Lizenzserver gesperrt",
          title: "Klient ist auf Blacklist (-13)",
        },
        "-14": {
          detail: "Konnte keine Netzwerkkarte finden",
          title: "Keine Netzwerkkarte (-14)",
        },
        "-2": { detail: "", title: "Ung\xfcltige Lizenz (-2)" },
        "-20": {
          detail: "Die Lizenzdauer beginnt am ",
          title: "Die Lizenzdauer hat noch nicht begonnen (-20)",
        },
        "-21": {
          detail: "Lizenzlaufzeit endete am ",
          title: "Die Lizenzdauer ist abgelaufen (-21)",
        },
        "-22": {
          detail:
            "Weitere Informationen zum Einrichten und Lizenzieren von Client-Computern finden Sie in den Anweisungen zum Server.",
          title:
            "Floating-Lizenzen k\xf6nnen nur mit dem Floating License Server verwendet werden (-22)",
        },
        "-3": { detail: "", title: "Lizenzdatei nicht gefunden (-3)" },
        "-4": { detail: "", title: "Lizenzdatei besch\xe4digt (-4)" },
        "-5": { detail: "", title: "Generischer Fehler (-5)" },
        "-6": { detail: "", title: "Ung\xfcltiger Produktname (-6)" },
        "-7": { detail: "", title: "Testversion (-7)" },
        "-8": { detail: "", title: "Ung\xfcltige Lizenz (-8)" },
        "-9": {
          detail:
            "Bitte stellen Sie sicher, dass der Lizenzserver ordnungsgem\xe4\xdf arbeitet",
          title: "Kann Server nicht kontaktieren (-9)",
        },
        "-99": { detail: "", title: "Unbekannter Fehler (-99)" },
        unknown: { detail: "", title: "Unbekannter Fehler (0)" },
      },
      en: {
        "-1": { detail: "", title: "Invalid license (-1)" },
        "-10": {
          detail: "There are no more free slots on the license server",
          title: "No free slots (-10)",
        },
        "-100": {
          detail:
            "You can purchase a license by clicking the button \'Buy License\'",
          title: "MONTER GROUP\xa9",
        },
        "-101": {
          detail:
            "Please configure or disable any firewalls or virus software that might be blocking access to the home folder. If this access is blocked the license cannot be verified.",
          title: "Access Blocked(-101)",
        },
        "-102": {
          detail:
            "Please contact support " +
            supportEmail +
            " and send a screenshot of this error.\n\n",
          title: "No result code (-102)",
        },
        "-103": {
          detail: "Could not find the number of trial days",
          title: "No trial days found (-103)",
        },
        "-104": {
          detail: "The license is not for this product",
          title: "License mismatch (-104)",
        },
        "-105": {
          detail: "A beta license cannot be used for the full version",
          title: "Cannot use beta license (-105)",
        },
        "-106": {
          detail: "This product does not offer a trial and requires a license",
          title: "Please install a license (-106)",
        },
        "-107": {
          detail:
            "The beta version does not offer a trial and requires a license",
          title: "Please install a license (-107)",
        },
        "-108": {
          detail:
            "Please configure or disable any firewalls or virus software that might be blocking access to the home folder. If this access is blocked the license cannot be verified.",
          title: "Not able to access home folder (-108)",
        },
        "-11": {
          detail: "The license cannot be found on the license server",
          title: "Unknown license (-11)",
        },
        "-12": {
          detail:
            "The license you are trying to deactivate is not found on the license server",
          title: "Unknown license (-12)",
        },
        "-13": {
          detail: "Your client IP is blacklisted on the license server",
          title: "Client blacklisted (-13)",
        },
        "-14": {
          detail: "Could not find a network adapter",
          title: "No network adapter (-14)",
        },
        "-2": { detail: "", title: "Invalid license (-2)" },
        "-20": {
          detail: "License period starts on ",
          title: "License period has not started yet (-20)",
        },
        "-21": {
          detail: "License period ended on ",
          title: "License period has ended (-21)",
        },
        "-22": {
          detail:
            "Please refer to the server instructions on how to setup and license client machines.",
          title:
            "Floating licenses can only be used with the Floating License Server (-22)",
        },
        "-3": { detail: "", title: "License file not found (-3)" },
        "-4": { detail: "", title: "License file corrupted (-4)" },
        "-5": { detail: "", title: "Generic error (-5)" },
        "-6": { detail: "", title: "Invalid product name (-6)" },
        "-7": { detail: "", title: "Trial (-7)" },
        "-8": { detail: "", title: "Invalid license (-8)" },
        "-9": {
          detail: "Please make sure the license server is running properly",
          title: "Cannot connect to server (-9)",
        },
        "-99": { detail: "", title: "Unknown error (-99)" },
        unknown: { detail: "", title: "Unknown error (0)" },
      },
      es: {
        "-1": { detail: "", title: "La licencia no es v\xe1lida (-1)" },
        "-10": {
          detail: "No hay m\xe1s espacios libres en el servidor de licencias",
          title: "No hay espacios libres (-10)",
        },
        "-100": {
          detail:
            "Puede adquirir una licencia haciendo clic en el bot\xf3n \'Comprar Licencia\'",
          title: "Esta versi\xf3n de prueba se ha expirado",
        },
        "-101": {
          detail:
            "Configure o desactive cualquier firewall o software antivirus que pueda estar bloqueando el acceso a la carpeta de inicio. Si este acceso est\xe1 bloqueado, la licencia no se puede verificar.",
          title: "Acceso bloqueado (-101)",
        },
        "-102": {
          detail:
            "Por favor, p\xf3ngase en contacto con soporte y env\xede una captura de pantalla de este error. " +
            supportEmail,
          title: "No hay c\xf3digo de resultado (-102)",
        },
        "-103": {
          detail: "No se pudo encontrar el n\xfamero de d\xedas de prueba",
          title: "No se encontraron d\xedas de prueba (-103)",
        },
        "-104": {
          detail: "La licencia no es para este producto",
          title: "La licencia no es la correcta (-104)",
        },
        "-105": {
          detail:
            "No se puede utilizar una licencia \'beta\' con esta versi\xf3n",
          title: "No se puede usar licencia beta (-105)",
        },
        "-106": {
          detail:
            "Este producto no ofrece una version de prueba y requiere una licencia",
          title: "Por favor, instale una licencia (-106)",
        },
        "-107": {
          detail:
            "La versi\xf3n beta no ofrece una versi\xf3n de prueba y requiere una licencia",
          title: "Por favor, instale una licencia (-107)",
        },
        "-108": {
          detail:
            "Configure o desactive cualquier firewall o software antivirus que pueda estar bloqueando el acceso a la carpeta de inicio. Si este acceso est\xe1 bloqueado, la licencia no se puede verificar.",
          title: "No se puede acceder a la carpeta de inicio (-108)",
        },
        "-11": {
          detail:
            "No se puede encontrar esta licencia en el servidor de licencias",
          title: "Licencia desconocida (-11)",
        },
        "-12": {
          detail:
            "La licencia que est\xe1 intentando de desactivar no se encuentra en el servidor de licencias",
          title: "Licencia desconocida (-12)",
        },
        "-13": {
          detail: "Su IP est\xe1 en la lista negra del servidor de licencias",
          title: "IP en la lista negra (-13)",
        },
        "-14": {
          detail: "No se pudo encontrar un adaptador de red",
          title: "No hay adaptador de red (-14)",
        },
        "-2": { detail: "", title: "La licencia no es v\xe1lida (-2)" },
        "-20": {
          detail: "El per\xedodo de licencia comienza en ",
          title: "El periodo de licencia no ha comenzado (-20)",
        },
        "-21": {
          detail: "El per\xedodo de licencia termin\xf3 en ",
          title: "El per\xedodo de licencia ha terminado (-21)",
        },
        "-22": {
          detail:
            "Consulte las instrucciones del servidor sobre c\xf3mo configurar y licenciar las m\xe1quinas cliente.",
          title:
            "Las licencias flotantes solo se pueden utilizar con el Servidor de licencias flotantes (-22)",
        },
        "-3": {
          detail: "",
          title: "No se encontr\xf3 el archivo de licencia (-3)",
        },
        "-4": {
          detail: "",
          title: "El archivo de licencia esta da\xf1ado (-4)",
        },
        "-5": { detail: "", title: "Error generico (-5)" },
        "-6": {
          detail: "",
          title: "El nombre de el producto no v\xe1lido (-6)",
        },
        "-7": { detail: "", title: "Versi\xf3n de prueba (-7)" },
        "-8": { detail: "", title: "La licencia no es v\xe1lida (-8)" },
        "-9": {
          detail:
            "Aseg\xfarese de que el servidor de licencias est\xe1 funcionando correctamente",
          title: "No es posible conectar con el servidor (-9)",
        },
        "-99": { detail: "", title: "Error desconocido (-99)" },
        unknown: { detail: "", title: "Error desconocido (0)" },
      },
      fr: {
        "-1": { detail: "", title: "Licence non valide (-1)" },
        "-10": {
          detail: "Il n\'y a plus de place sur le serveur de licence",
          title: "Plus de place (-10)",
        },
        "-100": {
          detail:
            "Vous pouvez acqu\xe9rir une licence en cliquant sur le bouton \'Acheter une Licence\' ci-dessous",
          title: "P\xe9riode d\'\xe9valuation expir\xe9e",
        },
        "-101": {
          detail:
            "Veuillez configurer ou d\xe9sactiver tous les firewall ou logiciels antivirus susceptibles de bloquer l\'acc\xe8s au dossier de d\xe9part. Si cet acc\xe8s est bloqu\xe9, la licence ne peut pas \xeatre v\xe9rifi\xe9e.",
          title: "Acc\xe8s bloqu\xe9 (-101)",
        },
        "-102": {
          detail:
            "S\'il vous pla\xeet contacter le support et envoyer une capture d\'\xe9cran de cette erreur. " +
            supportEmail,
          title: "Pas de code de r\xe9sultat (-102)",
        },
        "-103": {
          detail:
            "Echec d\'identification du nombre de jour de p\xe9riode d\'essai disponible",
          title: "Impossible de trouver des jours d\'essai (-103)",
        },
        "-104": {
          detail: "Cette licence n\'est pas valable pour ce produit",
          title: "Mauvaise licence (-104)",
        },
        "-105": {
          detail:
            "Une licence de version Beta ne peut \xeatre utilis\xe9e pour le produit final",
          title: "Licence Beta invalide (-105)",
        },
        "-106": {
          detail:
            "Ce produit ne propose pas de p\xe9riode d\'essai et n\xe9cessite une licence",
          title: "Licence n\xe9cessaire (-106)",
        },
        "-107": {
          detail:
            "La version Beta de ce produit ne propose pas de p\xe9riode d\'essai et n\xe9cessite une licence",
          title: "Licence n\xe9cessaire (-107)",
        },
        "-108": {
          detail:
            "Veuillez configurer ou d\xe9sactiver tous les firewall ou logiciels antivirus susceptibles de bloquer l\'acc\xe8s au dossier de d\xe9part. Si cet acc\xe8s est bloqu\xe9, la licence ne peut pas \xeatre v\xe9rifi\xe9e.",
          title: "Impossible d\'acc\xe9der au dossier de d\xe9part (-108)",
        },
        "-11": {
          detail: "La licence est introuvable sur le serveur",
          title: "Licence inconnue (-11)",
        },
        "-12": {
          detail:
            "La licence que vous essayez de d\xe9sactiver est introuvable sur le serveur",
          title: "Licence inconnue (-12)",
        },
        "-13": {
          detail:
            "L\'adresse ip de votre client est bannie du serveur de licence",
          title: "Client sur liste noire (-13)",
        },
        "-14": {
          detail: "Impossible de trouver une carte r\xe9seau",
          title: "Pas de carte r\xe9seau (-14)",
        },
        "-2": { detail: "", title: "Licence non valide (-2)" },
        "-20": {
          detail: "La p\xe9riode de licence commence ",
          title: "La p\xe9riode de licence n\'a pas encore commenc\xe9 (-20)",
        },
        "-21": {
          detail: "La p\xe9riode de licence s\'est termin\xe9e le ",
          title: "La p\xe9riode de licence est termin\xe9e (-21)",
        },
        "-22": {
          detail:
            "Veuillez vous reporter aux instructions du serveur pour savoir comment configurer et attribuer une licence aux ordinateurs clients.",
          title:
            "Les licences flottantes ne peuvent \xeatre utilis\xe9es qu\'avec le serveur de licences flottantes (-22)",
        },
        "-3": { detail: "", title: "Fichier de licence introuvable (-3)" },
        "-4": { detail: "", title: "Fichier de licence corrompu (-4)" },
        "-5": { detail: "", title: "Erreur g\xe9n\xe9rique (-5)" },
        "-6": { detail: "", title: "Nom de produit invalide (-6)" },
        "-7": { detail: "", title: "P\xe9riode d\'\xe9valuation (-7)" },
        "-8": { detail: "", title: "Licence non valide (-8)" },
        "-9": {
          detail: "Verifiez que le serveur de licence fonctionne correctement",
          title: "Impossible de se connecter au serveur (-9)",
        },
        "-99": { detail: "", title: "Erreur inconnue (-99)" },
        unknown: { detail: "", title: "Erreur inconnue (0)" },
      },
    };
    var prefsSectionName = vars.hasOwnProperty("legacyPrefsGroup")
      ? vars.legacyPrefsGroup
      : "aescripts";
    var prefsName = useLegacyPrefsHeader
      ? strScriptName
      : strHeader + "_Registration";
    var prefsVersionName = strHeader + "_Version";
    var prefsLicVersion = strHeader + "_LicVersion";
    var prefsVersionCheckInit = strHeader + "_VersionCheckInit";
    var prefsLastVersionChecked = strHeader + "_LastVersionChecked";
    var prefsLastServerVersionChecked = strHeader + "_LastServerVersionChecked";
    var prefsLastTimeVersionChecked = strHeader + "_LastTimeVersionChecked";
    var prefsNextTimeVersionChecked = strHeader + "_NextTimeVersionChecked";
    var prefsNextTimeVersionCheckedSkipVersion =
      strHeader + "_NextTimeVersionCheckedSkipVersion";
    var prefsDoUpdateCheck = strHeader + "_doUpdateCheck";
    haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
      (doUpdateCheck = !(
        "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
      ));
    ScriptUI.environment.keyboardState.shiftKey &&
      ScriptUI.environment.keyboardState.altKey &&
      !ScriptUI.environment.keyboardState.ctrlKey &&
      !ScriptUI.environment.keyboardState.metaKey &&
      ((doUpdateCheck = false),
      saveSettings(prefsSectionName, prefsDoUpdateCheck, false),
      alert("New version update checks disabled"));
    saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
    saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
    cmdKey = -1 != $.os.indexOf("Mac") ? "cmd" : "Ctrl";
    var strEnterLicenseCode = localize({
      de: "Bitte gebe den Lizenzcode ein.",
      en: "Please enter the license code.",
      es: "Por favor, introduzca el c\xf3digo de licencia.",
      fr: "Veuillez entrer votre num\xe9ro de licence.",
    });
    var strPasteHelp = localize({
      de:
        "(Wenn das Einf\xfcgen mit " +
        cmdKey +
        "+V nicht funktioniert, versuche Bearbeiten->Einf\xfcgen.)",
      en:
        "(If pasting the code with " + cmdKey + "+V doesn\'t work try " + 10 <=
        parseFloat(app.version)
          ? "Right-Click and Paste)"
          : "Edit->Paste)",
      es:
        "(Si pegar la licencia usando " +
          cmdKey +
          "+V no funciona, pruebe " +
          10 <=
        parseFloat(app.version)
          ? "Clic derecho y pegar)"
          : "Edici\xf3n->Pegar)",
      fr:
        "(Si vous ne parvenez pas \xe0 coller le code avec " +
          cmdKey +
          "+V essayez " +
          10 <=
        parseFloat(app.version)
          ? "Clique droit et Coller)"
          : "Edition->Coller)",
    });
    var strTrialInstructMsg = localize({
      de: 'Um die Testversion zu starten, gebe "trial" ein.',
      en: "To run in trial mode type: trial",
      es: "Para ejecutar el modo Trial, escriba: trial",
      fr: "Pour lancer la version de d\xe9monstration, tapez : trial",
    });
    var strOr = localize({ de: "oder", en: "or", es: "o", fr: "ou" });
    var strServerInstructMsg = localize({
      de: "Aktivieren Sie eine Lizenz vom Server mit @REMOTE",
      en: "Activate a license from the server with @REMOTE",
      es: "Activar una licencia del servidor con @REMOTE",
      fr: "Activer une licence du serveur avec @REMOTE",
    });
    var strServerNotRunning = localize({
      de: "Der Client ist konfiguriert, aber der Floating License Server l\xe4uft nicht oder ist nicht erreichbar.",
      en: "Client configured but floating license server is either not running or not accessible.",
      es: "Cliente configurado pero servidor de licencias flotantes o no est\xe1 ejecutado o no es accesible.",
      fr: "Client configur\xe9 mais le serveur de licence flottante est soit en cours d\'ex\xe9cution ou ne pas accessible.",
    });
    var prefHeader = "Initialization Fragments";
    var prefSection1 = (
      string_encode(
        Math.floor(parseFloat(app.version))
          .toString()
          .charAt(
            Math.max(
              0,
              Math.floor(parseFloat(app.version)).toString().length - 1,
            ),
          ) +
          strScriptName.substring(
            Math.max(0, strScriptName.length - 15),
            strScriptName.length,
          ) +
          strScriptVersion,
      ) *
      0.457 *
      privateNum
    ).toString(36);
    var prefSection2 = (
      string_encode(
        Math.floor(parseFloat(app.version))
          .toString()
          .charAt(
            Math.max(
              0,
              Math.floor(parseFloat(app.version)).toString().length - 1,
            ),
          ) +
          strScriptName.substring(
            Math.max(0, strScriptName.length - 15),
            strScriptName.length,
          ) +
          strScriptVersion,
      ) *
      (privateNum / 3.981)
    ).toString(36);
    var prefsLocation = Folder.userData.fsName + "/Aescripts/";
    var prefsPrefix = "pref_";
    isAE() || Folder(prefsLocation).exists || Folder(prefsLocation).create();
    var sanitizedName = sanitizeProductName(strScriptName);
    this.getSetting = function (e, i) {
      return getSettings((e = strHeader + "_" + e), i, "settings");
    };
    this.readJSON = function (e) {
      return readJSON(e);
    };
    this.writeJSON = function (e, i) {
      return writeJSON(e, i);
    };
    this.JSONify = function (e, i, t) {
      return JSONify(e, i, t);
    };
    this.haveSetting = function (e, i) {
      return haveSettings((e = strHeader + "_" + e), i, "settings");
    };
    this.saveSetting = function (e, i, t) {
      return saveSettings((e = strHeader + "_" + e), i, t, "settings");
    };
    function compareVersions(a, b) {
      if (a === b) {
        return 0;
      }
      var a_components = a.toString().split(".");
      var b_components = b.toString().split(".");
      if (a_components.length <= 2 && b_components.length <= 2) {
        if (a > b) {
          return 1;
        }
        if (a < b) {
          return -1;
        }
      } else {
        var len = Math.min(a_components.length, b_components.length);
        for (var i = 0; i < len; i += 1) {
          if (parseInt(a_components[i]) > parseInt(b_components[i])) {
            return 1;
          }
          if (parseInt(a_components[i]) < parseInt(b_components[i])) {
            return -1;
          }
        }
        if (a_components.length > b_components.length) {
          return 1;
        }
        if (a_components.length < b_components.length) {
          return -1;
        }
        return 0;
      }
    }
    function JSONify(string, mode, prettyJSON) {
      if (typeof JSON !== "object") {
        JSON = {};
      }
      (function () {
        function f(n) {
          return n < 10 ? "0" + n : n;
        }
        function this_value() {
          return this.valueOf();
        }
        function quote(string) {
          rx_escapable.lastIndex = 0;
          return rx_escapable.test(string)
            ? '"' +
                string.replace(rx_escapable, function (a) {
                  var c = meta[a];
                  return typeof c === "string"
                    ? c
                    : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
            : '"' + string + '"';
        }
        function str(key, holder) {
          var mind = gap;
          var value = holder[key];
          if (
            value &&
            typeof value === "object" &&
            typeof value.toJSON === "function"
          ) {
            value = value.toJSON(key);
          }
          if (typeof rep === "function") {
            value = rep.call(holder, key, value);
          }
          switch (typeof value) {
            case "string":
              return quote(value);
            case "number":
              return isFinite(value) ? String(value) : "null";
            case "boolean":
            case "null":
              return String(value);
            case "object":
              if (!value) {
                return "null";
              }
              gap += indent;
              partial = [];
              if (Object.prototype.toString.apply(value) === "[object Array]") {
                length = value.length;
                for (var i = 0; i < length; i += 1) {
                  partial[i] = str(i, value) || "null";
                }
                v =
                  partial.length === 0
                    ? "[]"
                    : gap
                      ? "[\n" +
                        gap +
                        partial.join(",\n" + gap) +
                        "\n" +
                        mind +
                        "]"
                      : "[" + partial.join(",") + "]";
                gap = mind;
                return v;
              }
              if (rep && typeof rep === "object") {
                length = rep.length;
                for (var i = 0; i < length; i += 1) {
                  if (typeof rep[i] === "string") {
                    k = rep[i];
                    v = str(k, value);
                    if (v) {
                      partial.push(quote(k) + gap ? ": " : ":" + v);
                    }
                  }
                }
              } else {
                for (var k in value) {
                  if (Object.prototype.hasOwnProperty.call(value, k)) {
                    v = str(k, value);
                    if (v) {
                      partial.push(quote(k) + gap ? ": " : ":" + v);
                    }
                  }
                }
              }
              v =
                partial.length === 0
                  ? "{}"
                  : gap
                    ? "{\n" +
                      gap +
                      partial.join(",\n" + gap) +
                      "\n" +
                      mind +
                      "}"
                    : "{" + partial.join(",") + "}";
              gap = mind;
              return v;
          }
        }
        ("use strict");
        var rx_one = /^[\],:{}\s]*$/;
        var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        var rx_three =
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
        var rx_escapable =
          /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var rx_dangerous =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        if (typeof Date.prototype.toJSON !== "function") {
          Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
              ? this.getUTCFullYear() +
                  "-" +
                  f(this.getUTCMonth() + 1) +
                  "-" +
                  f(this.getUTCDate()) +
                  "T" +
                  f(this.getUTCHours()) +
                  ":" +
                  f(this.getUTCMinutes()) +
                  ":" +
                  f(this.getUTCSeconds()) +
                  "Z"
              : null;
          };
          Boolean.prototype.toJSON = this_value;
          Number.prototype.toJSON = this_value;
          String.prototype.toJSON = this_value;
        }
        if (typeof JSON.stringify !== "function") {
          meta = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
          };
          JSON.stringify = function (value, replacer, space) {
            gap = "";
            indent = "";
            if (typeof space === "number") {
              for (var i = 0; i < space; i += 1) {
                indent += " ";
              }
            } else {
              if (typeof space === "string") {
                indent = space;
              }
            }
            rep = replacer;
            if (
              replacer &&
              typeof replacer !== "function" &&
              (typeof replacer !== "object" ||
                typeof replacer.length !== "number")
            ) {
              throw new Error("JSON.stringify");
            }
            return str("", { "": value });
          };
        }
      })();
      var jsonParse = (function () {
        function v(h, j, e) {
          return j ? u[j] : String.fromCharCode(parseInt(e, 16));
        }
        var r =
          "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
        var k =
          '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
        k = '(?:"' + k + '*")';
        var s = new RegExp(
          "(?:false|true|null|[\\{\\}\\[\\]]|" + r + "|" + k + ")",
          "g",
        );
        var t = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
        var u = {
          '"': '"',
          "/": "/",
          "\\": "\\",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "\t",
        };
        var w = new String("");
        var x = Object.hasOwnProperty;
        return function (h, j) {
          h = h.match(s);
          var c = h[0];
          var l = false;
          if ("{" === c) {
            e = {};
          } else if ("[" === c) {
            e = [];
          } else {
            e = [];
            l = true;
          }
          for (b, d = [e], m = 1 - l, y = h.length; m < y; ++m) {
            c = h[m];
            switch (c.charCodeAt(0)) {
              default:
                a = d[0];
                a[b || a.length] = c;
                b = void 0;
                break;
              case 34:
                c = c.substring(1, c.length - 1);
                if (c.indexOf("\\") !== -1) {
                  c = c.replace(t, v);
                }
                a = d[0];
                if (!b) {
                  if (a instanceof Array) {
                    b = a.length;
                  } else {
                    b = c || w;
                    break;
                  }
                }
                a[b] = c;
                b = void 0;
                break;
              case 91:
                a = d[0];
                d.unshift((a[b || a.length] = []));
                b = void 0;
                break;
              case 93:
                d.shift();
                break;
              case 102:
                a = d[0];
                a[b || a.length] = false;
                b = void 0;
                break;
              case 110:
                a = d[0];
                a[b || a.length] = null;
                b = void 0;
                break;
              case 116:
                a = d[0];
                a[b || a.length] = true;
                b = void 0;
                break;
              case 123:
                a = d[0];
                d.unshift((a[b || a.length] = {}));
                b = void 0;
                break;
              case 125:
                d.shift();
                break;
            }
          }
          if (l) {
            if (d.length !== 1) {
              throw new Error();
            }
            e = e[0];
          } else {
            if (d.length) {
              throw new Error();
            }
          }
          if (j) {
            var p = function (n, o) {
              var f = n[o];
              if (f && typeof f === "object") {
                var i = null;
                for (var g in f) {
                  if (x.call(f, g) && f !== n) {
                    var q = p(f, g);
                    if (q !== void 0) {
                      f[g] = q;
                    } else {
                      i || (i = []);
                      i.push(g);
                    }
                  }
                }
                if (i) {
                  for (g = i.length; --g >= 0; ) {
                    delete f[i[g]];
                  }
                }
              }
              return j.call(n, o, f);
            };
            e = p({ "": e }, "");
          }
          return e;
        };
      })();
      try {
        switch (mode) {
          case "parse":
            if (validateJSON(string)) {
              return jsonParse(string);
            } else {
              alert("JSON validation error\n" + string.substring(0, 1000));
              return null;
            }
            break;
          case "stringify":
            return JSON.stringify(string, undefined, prettyJSON);
            break;
        }
      } catch (e) {
        alert(e.toString());
      }
    }
    function validateJSON(string) {
      return /^[\],:{}\s]*$/.test(
        string
          .replace(/\\["\\\/bfnrtu]/g, "@")
          .replace(
            /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
            "]",
          )
          .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
      );
    }
    this.c = function () {
      return mainFunc("l");
    };
    this.s = function () {
      return (
        (void 0 !== licenseValidity &&
          licenseValidity.hasOwnProperty("result")) ||
          (licenseValidity = getVerifCode("")),
        isResultValidLicense(licenseValidity)
      );
    };
    this.r = function () {
      return !mainFunc("r");
    };
    this.t = function () {
      return (
        (void 0 !== licenseValidity &&
          licenseValidity.hasOwnProperty("result")) ||
          (licenseValidity = getVerifCode("")),
        isResultTrial(licenseValidity.result)
      );
    };
    this.l = function () {
      return (
        (void 0 !== licenseValidity &&
          licenseValidity.hasOwnProperty("result")) ||
          (licenseValidity = getVerifCode("")),
        licenseValidity.license
      );
    };
    this.ss = function () {
      return (
        (void 0 !== licenseValidity &&
          licenseValidity.hasOwnProperty("result")) ||
          (licenseValidity = getVerifCode("")),
        isResultValidLicense(licenseValidity) &&
          !isResultTrial(licenseValidity.result)
      );
    };
    this.vt = function () {
      return isVT();
    };
    this.helpUI = function (e) {
      helpUI(e);
    };
    this.getRegistration = function (e) {
      return getRegistration(e);
    };
    this.openSupportTicket = function (e) {
      openSupportTicket(e);
    };
    this.openURL = function (e) {
      openURL(e);
    };
    this.doUpdateCheck = function (e) {
      setUpdateCheck(e);
    };
    this.getUpdateCheckStatus = function () {
      return doUpdateCheck;
    };
    this.doUpdateCheckNow = function () {
      return doUpdateCheckNow();
    };
    this.frameworkVersion = function () {
      return licensingVersion;
    };
  }
  var ez8 = new a(af_settings);
  G.obfuscate = true;
  if ($.os.indexOf("Windows") != -1) {
    G.keyTip =
      "\tText Box Keyboard Commands:\r\t----------------------------------------\rLetters:\t[ ] Combines Letters [into] one group\rWords:\t| Combines Words into|one group\rLines:\t{} {Combines Lines into\r\tone group}\rSkip Line: Creates new page";
  } else {
    G.keyTip =
      "\tText Box Keyboard Commands:\r\t----------------------------------------\rLetters:\t[ ] Combines Letters [into] one group\rWords:\t| Combines Words into|one group\rLines:\t{} {Combines Lines into\r\t\tone group}\rSkip Line:  Creates new page";
  }
  G.EM_folderName = "EditMonkey";
  G.presetFolderName = "Presets";
  G.exprHeader = "// " + G.scriptName + "\r" + "// " + G.copyright + "\r";
  G.defaultText = "Enter text\nhere\n\nand click\n\nDO IT!";
  G.disableText = "";
  G.saveText = "";
  G.projectFolderID = G.scriptInitials + "_PageFolder";
  G.projectFolderName = G.scriptName + " Pages";
  G.compID = G.scriptInitials + "_Page";
  G.compName = G.scriptInitials + " Page";
  G.retimeCompID = G.scriptInitials + "_Retime";
  G.retimeCompName = G.scriptInitials + " Retime";
  G.uiPal = null;
  G.black = [0, 0, 0, 1];
  G.hardSpace = String.fromCharCode(160);
  G.hardSpaceKeyCode = "|";
  G.markerSpaceChar = "^";
  G.textLayerID = G.scriptName + "_TextLayer";
  G.textOnlyLayerID = G.scriptName + "_TextOnlyLayer";
  G.pageLayerID = G.scriptName + "_PageLayer";
  G.retimeLayerID = G.scriptName + "_RetimeLayer";
  G.pageControlPrefix = G.scriptInitials + " Page_";
  G.pageControlSuffix = " Master Control";
  G.pageControlID = G.scriptName + "_PageMasterControl";
  G.masterControlName = G.scriptInitials + " Master Control";
  G.masterControlID = G.scriptName + "_MasterControl";
  G.userLayerID = G.scriptName + "_UserLayer";
  G.saveLayerID = G.scriptName + " (save)";
  G.intersectionControlLayerID = G.scriptName + "_IntersectionControlLayer";
  G.disable_change_preset = false;
  G.disable_check_dependencies = false;
  G.disableText = "Text Panel Disabled";
  G.saveText = "";
  G.masterControlLayerColor = 9;
  G.controlLayerColor = 9;
  G.textLayerColor = 3;
  G.pageLayerColor = 7;
  G.timeRemapLayerColor = 9;
  G.intersectionControlLayerColor = 0;
  G.presetNames = [
    "Default",
    "-",
    "Easy Flip",
    "Easy Scale",
    "Easy Slide",
    "Easy Spin",
    "Easy Swing",
    "In Only",
    "Out Only",
    "Pop",
    "Random",
    "Random Extra",
    "Simple Cut",
    "Simple Fade",
    "Zoom In",
    "Zoom Out",
  ];
  G.def_presetName = "Default";
  G.sourceNames = ["TEXT PANEL", "LAYERS"];
  G.def_sourceName = "TEXT PANEL";
  G.holdNames = ["Constant", "Random", "-", "Off"];
  G.def_holdName = "Constant";
  G.sequencerNames = [
    "Off",
    "On",
    "-",
    "Low Overlap",
    "Medium Overlap",
    "Hi Overlap",
    "Full Overlap",
  ];
  G.overlapPct = [0, 0, 0, -0.25, -0.5, -0.75, -1];
  G.def_sequencerName = "Medium Overlap";
  G.pageOrderNames = ["Default", "Reverse", "Shuffle"];
  G.def_pageOrderName = "Default";
  G.def_color1 = [0.502, 0.502, 0.502];
  G.def_color1Hex = 8421504;
  G.def_color2 = [0.502, 0.502, 0.502];
  G.def_color2Hex = 8421504;
  G.def_color3 = [0.502, 0.502, 0.502];
  G.def_color3Hex = 8421504;
  G.def_color4 = [0.502, 0.502, 0.502];
  G.def_color4Hex = 8421504;
  G.def_color5 = [0.502, 0.502, 0.502];
  G.def_color5Hex = 8421504;
  G.currentColor1 = G.def_color1;
  G.currentColor1Hex = G.def_color1Hex;
  G.currentColor2 = G.def_color2;
  G.currentColor2Hex = G.def_color2Hex;
  G.currentColor3 = G.def_color3;
  G.currentColor3Hex = G.def_color3Hex;
  G.currentColor4 = G.def_color4;
  G.currentColor4Hex = G.def_color4Hex;
  G.currentColor5 = G.def_color5;
  G.currentColor5Hex = G.def_color5Hex;
  G.layerOrderNames = ["Top", "Bottom", "Random"];
  G.def_layerOrderName = "Top";
  G.layerOrderRandomNames = ["Top", "Bottom"];
  G.transitionNames = ["Automatic", "Custom", "-", "Off"];
  G.def_transitionName = "Automatic";
  G.speedNames = ["Very Fast", "Fast", "Medium", "Slow", "Very Slow", "Random"];
  G.def_speedName = "Medium";
  G.speedRandomNames = ["Fast", "Medium", "Slow"];
  G.intensityNames = [
    "Low",
    "Medium",
    "High",
    "Extreme",
    "Random",
    "Random by Layer",
  ];
  G.def_intensityName = "Medium";
  G.intensityRandomNames = ["Low", "Medium", "High"];
  G.offsetNames = [
    "Off",
    "Very Short",
    "Short",
    "Medium",
    "Long",
    "Very Long",
    "Extreme",
    "Random",
  ];
  G.offsetTimes = [0, 0.1, 0.3, 0.5, 1, 2, 5];
  G.offsetRandomNames = ["Short", "Medium", "Long"];
  G.def_offsetName = "Medium";
  G.animateNames = [
    "Slide",
    "Scale",
    "X Swing CW",
    "X Swing CCW",
    "Y Flip CW",
    "Y Flip CCW",
    "Z Spin CW",
    "Z Spin CCW",
    "-",
    "Random",
    "Random by Layer",
    "-",
    "Off",
  ];
  G.animateRandomPageNames = [
    "Slide",
    "Slide",
    "Scale",
    "Scale",
    "X Swing CW",
    "X Swing CCW",
    "Y Flip CW",
    "Y Flip CCW",
  ];
  G.animateRandomNames = [
    "Slide",
    "Slide",
    "Slide",
    "Slide",
    "Scale",
    "Scale",
    "Scale",
    "Scale",
    "X Swing CW",
    "X Swing CW",
    "X Swing CCW",
    "X Swing CCW",
    "Y Flip CW",
    "Y Flip CW",
    "Y Flip CCW",
    "Y Flip CCW",
    "Z Spin CW",
    "Z Spin CCW",
  ];
  G.def_animateInName = "Random";
  G.def_animateOutName = "Random";
  G.changingDirectionDDL = false;
  G.directionNames = [
    "Center",
    "Left",
    "Right",
    "Up",
    "Down",
    "Back",
    "Forth",
    "Horizontal",
    "Vertical",
    "Back & Forth",
    "-",
    "Random",
    "Random by Layer",
  ];
  G.directionRandomNames = [
    "Center",
    "Left",
    "Right",
    "Up",
    "Down",
    "Back",
    "Forth",
    "Horizontal",
    "Vertical",
    "Back & Forth",
  ];
  G.def_directionInName = "Random";
  G.def_directionOutName = "Random";
  G.directionNames_slide = [
    "Left",
    "Right",
    "Up",
    "Down",
    "Back",
    "Forth",
    "-",
    "Horizontal",
    "Vertical",
    "Back & Forth",
    "-",
    "Random",
    "Random by Layer",
  ];
  G.directionRandomNames_slide = [
    "Left",
    "Right",
    "Up",
    "Down",
    "Back",
    "Forth",
    "Horizontal",
    "Vertical",
    "Back & Forth",
  ];
  G.def_directionInName_slide = "Random";
  G.def_directionOutName_slide = "Random";
  G.directionNames_scale = ["Up", "Down", "-", "Random", "Random by Layer"];
  G.directionRandomNames_scale = ["Up", "Down"];
  G.def_directionInName_scale = "Random";
  G.def_directionOutName_scale = "Random";
  G.directionNames_swing = [
    "Center",
    "Top",
    "Bottom",
    "-",
    "Random",
    "Random by Layer",
  ];
  G.directionRandomNames_swing = ["Center", "Top", "Bottom"];
  G.def_directionInName_swing = "Center";
  G.def_directionOutName_swing = "Center";
  G.directionNames_flip = [
    "Center",
    "Left",
    "Right",
    "-",
    "Random",
    "Random by Layer",
  ];
  G.directionRandomNames_flip = ["Center", "Left", "Right"];
  G.def_directionInName_flip = "Center";
  G.def_directionOutName_flip = "Center";
  G.directionNames_spin = [
    "Center",
    "Left",
    "Right",
    "Top",
    "Bottom",
    "-",
    "Random",
    "Random by Layer",
  ];
  G.directionRandomNames_spin = ["Center", "Left", "Right", "Top", "Bottom"];
  G.def_directionInName_spin = "Center";
  G.def_directionOutName_spin = "Center";
  G.styleNames = [
    "Ease In",
    "Ease Out",
    "Ease In & Out",
    "-",
    "Hi Ease In",
    "Hi Ease Out",
    "Hi Ease In & Out",
    "-",
    "Random Ease In",
    "Random Ease Out",
    "Random Hi Ease",
    "-",
    "Inertia",
    "Springy",
    "Bouncy",
    "-",
    "Linear",
    "-",
    "Random",
    "Random by Layer",
  ];
  G.styleInRandomNames = [
    "Ease Out",
    "Hi Ease Out",
    "Inertia",
    "Springy",
    "Bouncy",
    "Linear",
  ];
  G.styleOutRandomNames = ["Ease In", "Hi Ease In", "Inertia", "Linear"];
  G.randomEaseInNames = ["Ease In", "Hi Ease In"];
  G.randomEaseOutNames = ["Ease Out", "Hi Ease Out"];
  G.randomHiEaseNames = ["Hi Ease In", "Hi Ease Out", "Hi Ease In & Out"];
  G.def_styleInName = "Random";
  G.def_styleOutName = "Random";
  G.slideValFactors = [0.25, 0.5, 1, 2];
  G.slideVals = [];
  G.swingVals = [90, 270, 450, 990];
  G.flipVals = [90, 270, 450, 990];
  G.spinVals = [360, 720, 1080, 1440];
  G.scaleDownVals = [1.5, 2, 3, 4];
  G.scaleUpVals = [0.75, 0.5, 0.25, 0];
  G.fadePct = [1, 0.75, 0.25, 0.25, 0.25];
  G.fastMoveDur = 0.6666666666666666;
  G.moveMult = [0.5, 1, 2, 3, 4];
  if (parseFloat(app.version) < 11) {
    alert(G.scriptName + " requires AE CS6 or later.");
  } else {
    if (ez8.c()) {
      buildPal(theObj);
    }
  }
}
deoz_EditMonkey(this);
