/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function deoz_MonkeyWords(theObj) {
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
  function deselectAll(theComp) {
    var mySelected = theComp.selectedLayers;
    for (var i = 0; i < mySelected.length; i += 1) {
      mySelected[i].selected = false;
    }
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
  function getArrayIndex(theArray, theItem) {
    for (var i = 0; i < theArray.length; i += 1) {
      if (theArray[i] == theItem) {
        return i;
      }
    }
    return -1;
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
  function customDraw() {
    with (this) {
      graphics.drawOSControl();
      graphics.rectPath(0, 0, size[0], size[1]);
      graphics.fillPath(fillBrush);
      graphics.strokePath(strokePen);
    }
  }
  function strip(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
  }
  function reduceMultipleSpaces(theString) {
    return theString.replace(/\s{2,}/g, " ");
  }
  function convertCRandTabsToSpaces(theString) {
    return theString.replace(/[\n\r\t]/g, " ");
  }
  function drawColorBtn(theButton, theColor) {
    var g = theButton.graphics;
    theButton.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, theColor);
    theButton.notify("onDraw");
  }
  function click_help() {
    Ez11.helpUI();
  }
  function click_keyInfo() {
    alert(G.keyTip, G.scriptName + " Keyboard Commands");
  }
  function change_fontSize() {
    if (this.selection.text == "Random") {
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.enabled = true;
    } else if (this.selection.text == "Justified") {
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.enabled = false;
    } else {
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.enabled = false;
    }
  }
  function click_keywordColor() {
    var newColor = $.colorPicker(G.currentKeywordColorHex);
    if (newColor == -1) {
      return;
    }
    G.currentKeywordColorHex = newColor;
    G.currentKeywordColor = hexToColor(newColor);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.Btn,
      G.currentKeywordColor,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.cbGrp.CB.value = true;
  }
  function click_keywordColorCB() {
    if (!this.value) {
      G.currentKeywordColor = G.inactive_keywordColor;
      G.currentKeywordColorHex = G.inactive_keywordColorHex;
      drawColorBtn(
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.Btn,
        G.currentKeywordColor,
      );
    }
  }
  function click_retimePages() {
    G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.markerSyncGrp.enabled =
      this.value;
  }
  function change_transition() {
    var theState = this.selection.text == "Off";
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.enabled =
      !theState;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.enabled =
      !theState;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.enabled =
      !theState;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.speedGrp.enabled =
      !theState;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.enabled =
      !theState;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.enabled =
      !theState;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.trackingGrp.enabled =
      !theState;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.enabled =
      this.selection.text == "In & Out";
  }
  function change_style() {
    if (this.selection == null) {
      this.selection = getArrayIndex(G.styleNames, G.def_styleName);
    }
    switch (this.selection.text) {
      case "Scale Up":
      case "Scale Down":
      case "Squeeze":
      case "Stretch":
      case "Scale Up & Down":
      case "Stretch & Squeeze":
      case "Random Scale":
        disable_inertia();
        break;
      default:
        enable_inertia();
        break;
    }
  }
  function change_keywordStyle() {
    if (this.selection == null) {
      this.selection = getArrayIndex(
        G.keywordStyleNames,
        G.def_keywordStyleName,
      );
    }
    switch (this.selection.text) {
      case "Scale Up":
      case "Scale Down":
      case "Squeeze":
      case "Stretch":
      case "Scale Up & Down":
      case "Stretch & Squeeze":
      case "Random Scale":
        disable_inertia();
        break;
      default:
        enable_inertia();
        break;
    }
  }
  function disable_inertia() {
    if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL
        .selection.text == "Inertia"
    ) {
      if (!G.disableWarning) {
        alert(
          "The Inertia interpolation is not available for any of the Scale styles. Switching to Ease instead.\n\n* Tip: Substituting Slide Back or Forth for Scale can achieve similar results.",
        );
      }
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.selection =
        getArrayIndex(G.interpolationNames, "Ease");
    }
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.items[
      getArrayIndex(G.interpolationNames, "Inertia")
    ].enabled = false;
  }
  function enable_inertia() {
    var canEnable = true;
    switch (
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.DDL
        .selection.text
    ) {
      case "Scale Up":
      case "Scale Down":
      case "Squeeze":
      case "Stretch":
      case "Scale Up & Down":
      case "Stretch & Squeeze":
      case "Random Scale":
        canEnable = false;
        break;
      default:
        break;
    }
    switch (
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.DDL
        .selection.text
    ) {
      case "Scale Up":
      case "Scale Down":
      case "Squeeze":
      case "Stretch":
      case "Scale Up & Down":
      case "Stretch & Squeeze":
      case "Random Scale":
        canEnable = false;
        break;
      default:
        break;
    }
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.items[
      getArrayIndex(G.interpolationNames, "Inertia")
    ].enabled = canEnable;
  }
  function change_interpolation() {
    if (this.selection == null) {
      this.selection = getArrayIndex(
        G.interpolationNames,
        G.def_interpolationName,
      );
    }
  }
  function change_drift() {
    if (this.selection == null) {
      this.selection = getArrayIndex(G.driftNames, G.def_driftName);
    }
  }
  function change_cutFade() {
    if (this.selection == null) {
      this.selection = getArrayIndex(G.cutFadeNames, G.def_cutFadeName);
    }
  }
  function change_textOffset() {
    if (this.selection == null) {
      this.selection = getArrayIndex(G.textOffsetNames, G.def_textOffsetName);
    }
  }
  function change_overlap() {
    if (this.selection == null) {
      this.selection = getArrayIndex(G.overlapNames, G.def_overlapName);
    }
  }
  function click_save() {
    var xmlStruct =
      "<MWRDSPreset>\r<ScriptName />\r<ScriptVersion />\r<PresetVersion />\r<ReverseReveal />\r<RandomizeAnchor />\r<AllCaps />\r<FontSize />\r<Min />\r<Max />\r<KeySize />\r<Spacing />\r<KeyColor />\r<KeyColorEnabled />\r<RetimePages />\r<MarkerSync />\r<MotionBlur />\r<Transition />\r<Hold />\r<Style />\r<KeyStyle />\r<Drift />\r<CutFade />\r<TextTracking />\r<Speed />\r<Interpolation />\r<TextOffset />\r<PageOverlap />\r</MWRDSPreset>";
    var myPreset = new XML(xmlStruct);
    myPreset.ScriptName = G.scriptName;
    myPreset.ScriptVersion = G.version;
    myPreset.PresetVersion = G.presetVersion;
    myPreset.ReverseReveal =
      G.uiPal.grp.topControlsGrp.reverseRevealGrp.CB.value.toString();
    myPreset.RandomizeAnchor =
      G.uiPal.grp.topControlsGrp.randomizeAnchorGrp.CB.value.toString();
    myPreset.AllCaps =
      G.uiPal.grp.topControlsGrp.allCapsGrp.CB.value.toString();
    myPreset.FontSize =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.DDL.selection.index.toString();
    myPreset.Min =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.txt.text;
    myPreset.Max =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.txt.text;
    myPreset.KeySize =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordSizeGrp.txt.text;
    myPreset.Spacing =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.txt.text;
    myPreset.KeyColor = G.currentKeywordColorHex.toString();
    myPreset.KeyColorEnabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.cbGrp.CB.value.toString();
    myPreset.RetimePages =
      G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.retimePagesGrp.cbGrp.CB.value.toString();
    myPreset.MarkerSync =
      G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.markerSyncGrp.cbGrp.CB.value.toString();
    myPreset.MotionBlur =
      G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.motionBlurGrp.cbGrp.CB.value.toString();
    myPreset.Transition =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionGrp.DDL.selection.index.toString();
    myPreset.Hold =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.holdGrp.txt.text;
    myPreset.Style =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.DDL.selection.index.toString();
    myPreset.KeyStyle =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.DDL.selection.index.toString();
    myPreset.Drift =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.driftGrp.DDL.selection.index.toString();
    myPreset.CutFade =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.DDL.selection.index.toString();
    myPreset.TextTracking =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.trackingGrp.cbGrp.CB.value.toString();
    myPreset.Speed =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.speedGrp.DDL.selection.index.toString();
    myPreset.Interpolation =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.selection.index.toString();
    myPreset.TextOffset =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.DDL.selection.index.toString();
    myPreset.PageOverlap =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.DDL.selection.index.toString();
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
    var myPreset = new XML(myXmlString);
    myXmlFile.close();
    var tempXML = myPreset.ScriptName;
    if (tempXML === null || tempXML.toString() != G.scriptName) {
      alert("This file is not a " + G.scriptName + " preset.");
      return;
    }
    var myPresetVersion = parseFloat(myPreset.PresetVersion.toString());
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
    G.disableWarning = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.markerSyncGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.items[
      getArrayIndex(G.interpolationNames, "Inertia")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.speedGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.trackingGrp.enabled = true;
    G.uiPal.grp.topControlsGrp.reverseRevealGrp.CB.value =
      myPreset.ReverseReveal.toString() == "true";
    G.uiPal.grp.topControlsGrp.randomizeAnchorGrp.CB.value =
      myPreset.RandomizeAnchor.toString() == "true";
    G.uiPal.grp.topControlsGrp.allCapsGrp.CB.value =
      myPreset.AllCaps.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.DDL.selection =
      parseInt(myPreset.FontSize, 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.txt.text =
      myPreset.Min.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.txt.text =
      myPreset.Max.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordSizeGrp.txt.text =
      myPreset.KeySize.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.txt.text =
      myPreset.Spacing.toString();
    G.currentKeywordColorHex = parseInt(myPreset.KeyColor.toString(), 10);
    G.currentKeywordColor = hexToColor(G.currentKeywordColorHex);
    drawColorBtn(
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.Btn,
      G.currentKeywordColor,
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.cbGrp.CB.value =
      myPreset.KeyColorEnabled.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.retimePagesGrp.cbGrp.CB.value =
      myPreset.RetimePages.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.markerSyncGrp.cbGrp.CB.value =
      myPreset.MarkerSync.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.motionBlurGrp.cbGrp.CB.value =
      myPreset.MotionBlur.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionGrp.DDL.selection =
      parseInt(myPreset.Transition, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.holdGrp.txt.text =
      myPreset.Hold.toString();
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.DDL.selection =
      parseInt(myPreset.Style, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.DDL.selection =
      parseInt(myPreset.KeyStyle, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.driftGrp.DDL.selection =
      parseInt(myPreset.Drift, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.DDL.selection =
      parseInt(myPreset.CutFade, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.trackingGrp.cbGrp.CB.value =
      myPreset.TextTracking.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.speedGrp.DDL.selection =
      parseInt(myPreset.Speed, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.selection =
      parseInt(myPreset.Interpolation, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.DDL.selection =
      parseInt(myPreset.TextOffset, 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.DDL.selection =
      parseInt(myPreset.PageOverlap, 10);
    var fontSelection =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.DDL
        .selection.text;
    if (fontSelection.text == "Random") {
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.enabled = true;
    } else if (fontSelection.text == "Justified") {
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.enabled = false;
    } else {
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.enabled = false;
    }
    G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.markerSyncGrp.enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.retimePagesGrp.cbGrp.CB.value;
    var transitionOn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionGrp.DDL
        .selection.text != "Off";
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.enabled =
      transitionOn;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.enabled =
      transitionOn;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.enabled =
      transitionOn;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.speedGrp.enabled =
      transitionOn;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.enabled =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionGrp.DDL
        .selection.text == "In & Out";
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.enabled =
      transitionOn;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.enabled =
      transitionOn;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.trackingGrp.enabled =
      transitionOn;
    var inertiaEnabled = true;
    switch (
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.DDL
        .selection.text
    ) {
      case "Scale Up":
      case "Scale Down":
      case "Squeeze":
      case "Stretch":
      case "Scale Up & Down":
      case "Stretch & Squeeze":
      case "Random Scale":
        inertiaEnabled = false;
        break;
      default:
        break;
    }
    switch (
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.DDL
        .selection.text
    ) {
      case "Scale Up":
      case "Scale Down":
      case "Squeeze":
      case "Stretch":
      case "Scale Up & Down":
      case "Stretch & Squeeze":
      case "Random Scale":
        inertiaEnabled = false;
        break;
      default:
        break;
    }
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.items[
      getArrayIndex(G.interpolationNames, "Inertia")
    ].enabled = inertiaEnabled;
    G.disableWarning = false;
  }
  function click_doIt() {
    function convertTabsToSpaces(theString) {
      return theString.replace(/\t/g, " ");
    }
    function getTextPages(theText) {
      var thePages = [];
      var theCurrentPage = [];
      var theLines = theText.split("\n");
      for (var i = 0; i < theLines.length; i += 1) {
        if (strip(theLines[i]) == "") {
          thePages.push(theCurrentPage);
          theCurrentPage = [];
        } else {
          theCurrentPage.push(theLines[i]);
        }
      }
      if (theCurrentPage.length > 0) {
        thePages.push(theCurrentPage);
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
    function getEaseFunctionExpr(theStyleName, theSuffix) {
      var ease_in_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_,_amt_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*Math.pow(_tEase_,_amt_);\r" +
        "}\r";
      var ease_out_expr =
        "function _myEase" +
        theSuffix +
        "_(_curT_,_t1_,_t2_,_val1_,_val2_,_amt_){\r" +
        "  if(_curT_ <= _t1_)return _val1_;\r" +
        "  if(_curT_ >= _t2_)return _val2_;\r" +
        "  _dtEase_ = _t2_ - _t1_;\r" +
        "  _dvEase_ = _val2_ - _val1_;\r" +
        "  _tEase_ = (_curT_-_t1_)/_dtEase_;\r" +
        "  return _val1_ + _dvEase_*(1-Math.pow(1-_tEase_,_amt_));\r" +
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
        "  return _val1_ + _dvEase_*_tEase_*_tEase_*((_s_+1)*_tEase_-_s_);\r" +
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
        "  return _val1_ + _dvEase_*((_tEase_-1)*(_tEase_-1)*((_s_+1)*(_tEase_-1)+_s_)+1);\r" +
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
      var bounce_out_expr =
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
          return ease_in_expr;
        case "Ease Out":
          return ease_out_expr;
        case "Inertia Out":
          return inertia_out_expr;
        case "Anticipate Out":
          return anticipate_out_expr;
        case "Anticipate In":
          return anticipate_in_expr;
        case "Springy Out":
          return springy_out_expr;
        case "Bounce Out":
          return bounce_out_expr;
        case "Linear":
          return linear_expr;
        case "Cut":
          return cut_expr;
        default:
          return ease_out_expr;
      }
    }
    var myDriftControlsPresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.driftControlsPresetName,
      );
    var myTrackingControlsPresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.trackingControlsPresetName,
      );
    var myPositionControls1PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.positionControls1PresetName,
      );
    var myPositionControls2PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.positionControls2PresetName,
      );
    var myPositionControls3PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.positionControls3PresetName,
      );
    var myPositionControls4PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.positionControls4PresetName,
      );
    var myScaleControls1PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.scaleControls1PresetName,
      );
    var myScaleControls2PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.scaleControls2PresetName,
      );
    var myScaleControls3PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.scaleControls3PresetName,
      );
    var myScaleControls4PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.scaleControls4PresetName,
      );
    var myRotationControls1PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.rotationControls1PresetName,
      );
    var myRotationControls2PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.rotationControls2PresetName,
      );
    var myRotationControls3PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.rotationControls3PresetName,
      );
    var myRotationControls4PresetPath =
      File($.fileName).path +
      "/" +
      escape(
        G.MWRDS_folderName +
          "/" +
          G.effectControlsPresetFolderName +
          "/" +
          G.rotationControls4PresetName,
      );
    if (!File(myDriftControlsPresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.driftControlsPresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myTrackingControlsPresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.trackingControlsPresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myPositionControls1PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.positionControls1PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myPositionControls2PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.positionControls2PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myPositionControls3PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.positionControls3PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myPositionControls4PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.positionControls4PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myScaleControls1PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.scaleControls1PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myScaleControls2PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.scaleControls2PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myScaleControls3PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.scaleControls3PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myScaleControls4PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.scaleControls4PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myRotationControls1PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.rotationControls1PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myRotationControls2PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.rotationControls2PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myRotationControls3PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.rotationControls3PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (!File(myRotationControls4PresetPath).exists) {
      alert(
        G.scriptName +
          " can\'t find the preset \'" +
          G.rotationControls4PresetName +
          "\'. Make sure the \'" +
          G.scriptName +
          "\' folder is in the same folder as the " +
          G.scriptName +
          " script.",
      );
      return;
    }
    if (
      app.project.activeItem == null ||
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
    var doingReverseReveal =
      G.uiPal.grp.topControlsGrp.reverseRevealGrp.CB.value;
    var doingAllCaps = G.uiPal.grp.topControlsGrp.allCapsGrp.CB.value;
    var doingRandomizeAnchor =
      G.uiPal.grp.topControlsGrp.randomizeAnchorGrp.CB.value;
    var fontSize =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.DDL
        .selection.text;
    switch (fontSize) {
      case "Random":
        tempText =
          G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.txt
            .text;
        minFontSize = parseFloat(tempText);
        if (isNaN(minFontSize) || minFontSize < 0) {
          alert("Illegal Min Font Size value");
          return;
        }
        if (minFontSize > 1296) {
          alert(
            "Min Font Size is set to " +
              minFontSize +
              ". Maximum allowed is 1296.",
          );
          return;
        }
        tempText =
          G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.maxGrp.txt
            .text;
        maxFontSize = parseFloat(tempText);
        if (isNaN(maxFontSize)) {
          alert("Illegal Max Font Size entry");
          return;
        }
        if (maxFontSize > 1296) {
          alert(
            "Max Font Size is set to " +
              maxFontSize +
              ". Maximum allowed is 1296.",
          );
          return;
        }
        if (maxFontSize < minFontSize) {
          alert("Max Font Size value cannot be less than Min");
          return;
        }
        break;
      case "Constant":
        tempText =
          G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minMaxGrp.minGrp.txt
            .text;
        minFontSize = parseFloat(tempText);
        if (isNaN(minFontSize) || minFontSize < 0) {
          alert("Illegal Min Font Size value");
          return;
        }
        if (minFontSize > 1296) {
          alert(
            "Min Font Size is set to " +
              minFontSize +
              ". Maximum allowed is 1296.",
          );
          return;
        }
        break;
      case "Justified":
        break;
      default:
        alert("Illegal Font Size specified.");
        return;
    }
    tempText =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordSizeGrp.txt.text;
    var keywordSize = parseFloat(tempText);
    if (isNaN(keywordSize) || keywordSize < 0) {
      alert("Illegal Keyword Size value");
      return;
    }
    tempText =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.txt.text;
    var spacing = parseFloat(tempText);
    if (isNaN(spacing) || spacing < 0) {
      alert("Illegal Spacing value");
      return;
    }
    var keywordColorEnabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.cbGrp.CB
        .value;
    var transition =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionGrp.DDL
        .selection.text;
    var doingTransition = transition != "Off";
    var doingTransitionIn = transition == "In" || transition == "In & Out";
    var doingTransitionOut = transition == "Out" || transition == "In & Out";
    var style =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.DDL
        .selection.text;
    var keywordStyle =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.DDL
        .selection.text;
    var interpolation =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL
        .selection.text;
    var inertiaWarning = false;
    if (interpolation == "Inertia") {
      switch (style) {
        case "Scale Up":
        case "Scale Down":
        case "Squeeze":
        case "Stretch":
        case "Scale Up & Down":
        case "Stretch & Squeeze":
        case "Random Scale":
          inertiaWarning = true;
          break;
        default:
          break;
      }
      switch (keywordStyle) {
        case "Scale Up":
        case "Scale Down":
        case "Squeeze":
        case "Stretch":
        case "Scale Up & Down":
        case "Stretch & Squeeze":
        case "Random Scale":
          inertiaWarning = true;
          break;
        default:
          break;
      }
      if (inertiaWarning) {
        if (
          !confirm(
            "The Inertia interpolation is not available for any of the Scale styles. Should " +
              G.scriptName +
              "use Ease instead?\n\n* Tip: Substituting Slide Back or Forth for Scale can achieve similar results.",
            true,
          )
        ) {
          return;
        }
        interpolation = "Ease";
      }
    }
    var speed =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.speedGrp.DDL
        .selection.text;
    tempText =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.holdGrp.txt.text;
    var holdFrames = parseFloat(tempText);
    if (isNaN(holdFrames) || holdFrames < 0) {
      alert("Illegal Hold value");
      return;
    }
    var textOffset =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.DDL
        .selection.text;
    var doingTextOffset = textOffset != "Off";
    var doingMarkerOffset = doingTextOffset;
    if (doingTransitionIn && doingTransitionOut) {
      overlap =
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.DDL
          .selection.text;
    } else {
      overlap = "Off";
    }
    var drift =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.driftGrp.DDL
        .selection.text;
    var cutFade =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.DDL
        .selection.text;
    var doingCutFade = doingTransition && cutFade != "Off";
    var doingTracking =
      doingTransition &&
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.trackingGrp.cbGrp.CB
        .value;
    var myText = G.uiPal.grp.textPnl.txt.text;
    if (strip(convertTabsToSpaces(myText)) === "") {
      alert("No text entered.");
      return;
    }
    if (doingAllCaps) {
      myText = myText.toUpperCase();
    }
    if (Ez11.t()) {
      var testLines = myText.split("\n");
      var lineCount = 0;
      for (var i = 0; i < testLines.length; i += 1) {
        if (strip(testLines[i]) != "") {
          lineCount++;
        }
      }
      if (lineCount > G.trialLineLimit) {
        alert(
          "The trial version of " +
            G.scriptName +
            " is limited to " +
            G.trialLineLimit +
            " lines. If you would like to try " +
            G.scriptName +
            ", please limit your text to no more than " +
            G.trialLineLimit +
            " lines.",
        );
        return;
      }
    }
    var myPages = getTextPages(myText);
    if (myPages.length == 0) {
      alert("Nothing to do.");
      return;
    }
    var doingRetimePages =
      G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.retimePagesGrp.cbGrp
        .CB.value;
    var doingMarkerSync =
      doingRetimePages &&
      G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.markerSyncGrp.cbGrp.CB
        .value;
    var doingMotionBlur =
      G.uiPal.grp.controlsGrp.leftControlsGrp.switchesPnl.motionBlurGrp.cbGrp.CB
        .value;
    var markerSyncLayer = null;
    if (doingMarkerSync) {
      if (myComp.selectedLayers.length == 1) {
        markerSyncLayer = myComp.selectedLayers[0];
      } else {
        alert("Please select exactly one Marker Sync layer.");
        return;
      }
    }
    if (doingMarkerSync) {
      var tempCount = 0;
      for (var i = 0; i < myPages.length; i += 1) {
        if (myPages[i].length > 0) {
          tempCount++;
        }
      }
      if (
        markerSyncLayer.property("Marker").numKeys <
        (tempCount + doingRetimePages ? 1 : 0)
      ) {
        alert(
          "Marker Sync layer needs at least " + tempCount + doingRetimePages
            ? 1
            : 0 + " markers.",
        );
        return;
      }
    }
    app.beginUndoGroup(G.scriptInitials + ": Create Pages");
    var myProjectFolder = getProjectFolder(
      G.projectFolderName,
      G.projectFolderID,
      true,
    );
    var myTextLayers = [];
    var myPageLayers = [];
    var myPageCompLayers = [];
    var myTextLayerHeights = [];
    var myTextLayerWidths = [];
    var myPage = [];
    var stops = [];
    var myMarkerVal = new MarkerValue("");
    var forwardMoveExpr = "";
    var reverseMoveExpr = "";
    var amountExpr = "";
    var offsetExpr = "";
    var propertyValExpr = "";
    var easeFunctionExpr = "";
    var easeFunctionExpr2 = "";
    var tempHeaderExpr = "";
    var easeHeaderExpr = "";
    var easeExpr = "";
    var dupEaseExpr = "";
    var dupTempExpr = "";
    var animatorPropExpr = "";
    var opacityExpr = "";
    var anchorExpr = "";
    var trackingHeaderExpr = "";
    var trackingExpr = "";
    var auxExpr = "";
    var oTable = [
      "_anchor_",
      "_intensity_",
      "_myRnd_",
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
      "_amt_",
      "_dtEase_",
      "_dvEase_",
      "_tEase_",
      "_tMove_",
      "_amp_",
      "_freq_",
      "_decay_",
      "_w_",
      "_s_",
    ];
    var pageCount = 0;
    for (var i = 0; i < myPages.length; i += 1) {
      if (textOffset == "Auto") {
        curTextOffset =
          G.speedToOffsetNames[getArrayIndex(G.speedNames, speed)];
      } else {
        curTextOffset = textOffset;
      }
      if (curTextOffset == "Off") {
        markerOffset = 0;
      } else {
        markerOffset =
          G.textOffsetFrames[getArrayIndex(G.textOffsetNames, curTextOffset)] *
          myComp.frameDuration;
      }
      if (overlap == "Auto") {
        if (curTextOffset != "Off") {
          curOverlap = curTextOffset;
        } else {
          curOverlap =
            G.speedToOverlapNames[getArrayIndex(G.speedNames, speed)];
        }
      } else {
        curOverlap = overlap;
      }
      myPage = myPages[i];
      if (myPage.length == 0) {
        continue;
      }
      pageCount++;
      myPageLayers = [];
      myTextLayers = [];
      myTextLayerHeights = [];
      myTextLayerWidths = [];
      doingAuto = false;
      haveKeyword = false;
      haveRegular = false;
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
      myNewComp.parentFolder = myProjectFolder;
      myNewComp.hideShyLayers = true;
      myNewComp.motionBlur = doingMotionBlur;
      myCompLayer = myComp.layers.add(myNewComp);
      myCompLayer.comment = G.pageLayerID;
      myCompLayer.collapseTransformation = true;
      forwardMoveExpr =
        'try{\r  _intensity_ = comp("' +
        myComp.name +
        '").layer("' +
        myCompLayer.name +
        '").effect("Pseudo/DEOZ MWRDS Drift")("Pseudo/DEOZ MWRDS Drift-0001");\r' +
        '  _myRnd_ = comp("' +
        myComp.name +
        '").layer("' +
        myCompLayer.name +
        '").effect("Pseudo/DEOZ MWRDS Drift")("Pseudo/DEOZ MWRDS Drift-0002");\r' +
        "}catch(e){\r" +
        "  _intensity_ = 5;\r" +
        "  _myRnd_ = 50;\r" +
        "}\r" +
        "seedRandom(index,true);\r" +
        "_intensity_ *= 1 + random(-_myRnd_,_myRnd_)/100;\r" +
        "_intensity_ = Math.min(Math.max(_intensity_,0),100);\r" +
        "linear(time,0,thisComp.duration,-_intensity_,_intensity_)";
      reverseMoveExpr =
        'try{\r  _intensity_ = comp("' +
        myComp.name +
        '").layer("' +
        myCompLayer.name +
        '").effect("Pseudo/DEOZ MWRDS Drift")("Pseudo/DEOZ MWRDS Drift-0001");\r' +
        '  _myRnd_ = comp("' +
        myComp.name +
        '").layer("' +
        myCompLayer.name +
        '").effect("Pseudo/DEOZ MWRDS Drift")("Pseudo/DEOZ MWRDS Drift-0002");\r' +
        "}catch(e){\r" +
        "  _intensity_ = 5;\r" +
        "  _myRnd_ = 50;\r" +
        "}\r" +
        "seedRandom(index,true);\r" +
        "_intensity_ *= 1 + random(-_myRnd_,_myRnd_)/100;\r" +
        "_intensity_ = Math.min(Math.max(_intensity_,0),100);\r" +
        "linear(time,0,thisComp.duration,_intensity_,-_intensity_)";
      myPageControl = myNewComp.layers.addNull(myNewComp.duration);
      myPageControl.startTime = 0;
      myPageControl.name =
        G.pageControlPrefix + myNewCompName.split("_")[1] + G.pageControlSuffix;
      myPageControl.source.name = myPageControl.name;
      myPageControl.comment = G.pageControlID;
      myPageControl.threeDLayer = true;
      myPageControl.label = G.controlLayerColor;
      myPageControl.enabled = false;
      myMaxWidth = 0;
      for (var j = 0; j < myPage.length; j += 1) {
        myLine = myPage[j];
        myTextLayer = myNewComp.layers.addText("H");
        myTextLayer.startTime = 0;
        myTextLayer.outPoint = myNewComp.duration;
        myTextLayer.moveAfter(myPageControl);
        myTextLayers.push(myTextLayer);
        if (myLine.length > 0 && myLine[0] == "^") {
          myTextLayer.comment = G.keywordID;
          haveKeyword = true;
        } else if (myLine.length > 0 && myLine[0] == "|") {
          myTextLayer.comment = G.blankID;
        } else {
          myTextLayer.comment = G.textLayerID;
          haveRegular = true;
        }
        myTextLayer.motionBlur = doingMotionBlur;
        mySourceText = myTextLayer
          .property("ADBE Text Properties")
          .property("ADBE Text Document");
        myTextDoc = mySourceText.value;
        if (
          myLine.length > 0 &&
          myLine[0] == "^" &&
          keywordColorEnabled &&
          !(myLine.indexOf("[") > -1 || myLine.indexOf("]") > -1)
        ) {
          myTextDoc.fillColor = G.currentKeywordColor;
        } else {
          if (
            (myLine.indexOf("[") > -1 || myLine.indexOf("]") > -1) &&
            keywordColorEnabled
          ) {
            stops = [];
            myIdx = 0;
            for (var k = 0; k < myLine.length; k += 1) {
              if (k == 0 && myLine[0] == "^") {
                continue;
              }
              if (myLine[k] == "[" || myLine[k] == "]") {
                stops.push(myIdx);
              } else {
                myIdx++;
              }
            }
            if (stops.length % 2) {
              stops.push(myIdx);
            }
            for (var k = 0; k < stops.length; k += 2) {
              if (k == 0) {
                myAnimator = myTextLayer
                  .property("ADBE Text Properties")
                  .property("ADBE Text Animators")
                  .addProperty("ADBE Text Animator");
                myAnimator.name = "Key Color";
                myFillColor = myAnimator
                  .property("ADBE Text Animator Properties")
                  .addProperty("ADBE Text Fill Color");
                myFillColor.setValue(G.currentKeywordColor);
              }
              mySelector = myAnimator
                .property("ADBE Text Selectors")
                .addProperty("ADBE Text Selector");
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Range Units")
                .setValue(2);
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Range Type2")
                .setValue(1);
              mySelector.property("ADBE Text Index Start").setValue(stops[k]);
              mySelector.property("ADBE Text Index End").setValue(stops[k + 1]);
            }
          }
        }
        if (myLine[0] == "^") {
          myTextDoc.fontSize = keywordSize;
        } else {
          if (fontSize == "Constant") {
            myTextDoc.fontSize = minFontSize;
          } else if (fontSize == "Random") {
            myTextDoc.fontSize = getRandomRange(minFontSize, maxFontSize);
          } else {
            myTextDoc.fontSize = keywordSize;
          }
        }
        mySourceText.setValue(myTextDoc);
        mySourceRect = myTextLayer.sourceRectAtTime(0, false);
        yHeight = mySourceRect.height;
        yTop = mySourceRect.top;
        myTextLayerHeights.push(yHeight);
        if (i == 0 && j == 0) {
          justification = myTextDoc.justification;
          switch (justification) {
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT:
              justification = ParagraphJustification.LEFT_JUSTIFY;
              break;
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT:
              justification = ParagraphJustification.RIGHT_JUSTIFY;
              break;
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER:
            case ParagraphJustification.FULL_JUSTIFY_LASTLINE_FULL:
              justification = ParagraphJustification.CENTER_JUSTIFY;
              break;
            case ParagraphJustification.LEFT_JUSTIFY:
            case ParagraphJustification.RIGHT_JUSTIFY:
            case ParagraphJustification.CENTER_JUSTIFY:
              break;
          }
        }
        if (myLine.indexOf("[") > -1 || myLine.indexOf("]") > -1) {
          myLine = myLine.replace(/\[/g, "");
          myLine = myLine.replace(/\]/g, "");
        }
        if (myLine[0] == "^") {
          myTextDoc.text = myLine.substr(1);
        } else if (myLine[0] == "|") {
          myTextDoc.text = " ";
        } else {
          myTextDoc.text = myLine;
        }
        mySourceText.setValue(myTextDoc);
        mySourceRect = myTextLayer.sourceRectAtTime(0, false);
        myMaxWidth = Math.max(myMaxWidth, mySourceRect.width);
        myTextLayerWidths.push(mySourceRect.width);
        myAP = myTextLayer.property("Anchor Point").value;
        myTextLayer
          .property("Anchor Point")
          .setValue([
            myAP[0] + mySourceRect.left + mySourceRect.width / 2,
            myAP[1] + yTop + yHeight / 2,
          ]);
      }
      if (fontSize == "Justified") {
        if (haveKeyword) {
          myMaxWidth = 0;
          for (var j = 0; j < myTextLayers.length; j += 1) {
            if (myTextLayers[j].comment == G.keywordID) {
              myMaxWidth = Math.max(myMaxWidth, myTextLayerWidths[j]);
            }
          }
        }
        for (var j = 0; j < myTextLayers.length; j += 1) {
          myTextLayer = myTextLayers[j];
          if (myTextLayer.comment == G.blankID) {
            continue;
          }
          myScaleFactor = myMaxWidth / myTextLayerWidths[j];
          mySourceText = myTextLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Document");
          myTextDoc = mySourceText.value;
          myTextDoc.fontSize *= myScaleFactor;
          mySourceText.setValue(myTextDoc);
          myTextLayerWidths[j] *= myScaleFactor;
          myTextLayerHeights[j] *= myScaleFactor;
          myAP = myTextLayer.property("Anchor Point").value;
          myTextLayer
            .property("Anchor Point")
            .setValue([myAP[0] * myScaleFactor, myAP[1] * myScaleFactor]);
        }
      }
      switch (justification) {
        case ParagraphJustification.LEFT_JUSTIFY:
          for (var j = 0; j < myTextLayers.length; j += 1) {
            myPos = myTextLayers[j].property("Position").value;
            myTextLayers[j]
              .property("Position")
              .setValue([
                myPos[0] - (myMaxWidth - myTextLayerWidths[j]) / 2,
                myPos[1],
              ]);
          }
          break;
        case ParagraphJustification.RIGHT_JUSTIFY:
          for (var j = 0; j < myTextLayers.length; j += 1) {
            myPos = myTextLayers[j].property("Position").value;
            myTextLayers[j]
              .property("Position")
              .setValue([
                myPos[0] + (myMaxWidth - myTextLayerWidths[j]) / 2,
                myPos[1],
              ]);
          }
          break;
        case ParagraphJustification.CENTER_JUSTIFY:
          break;
      }
      totalY = 0;
      for (var j = 0; j < myTextLayers.length; j += 1) {
        totalY += myTextLayerHeights[j];
      }
      totalY += (myTextLayers.length - 1) * spacing;
      currentY = myNewComp.height / 2 - totalY / 2;
      for (var j = 0; j < myTextLayers.length; j += 1) {
        myPos = myTextLayers[j].property("Position").value;
        myTextLayers[j]
          .property("Position")
          .setValue([myPos[0], currentY + myTextLayerHeights[j] / 2]);
        currentY += myTextLayerHeights[j] + spacing;
        if (myTextLayers[j].comment == G.blankID) {
          myTextLayers[j].remove();
        } else {
          myTextLayers[j].threeDLayer = true;
          myTextLayers[j].threeDPerChar = true;
          myTextLayers[j].parent = myPageControl;
          myPageLayers.push(myTextLayers[j]);
        }
      }
      if (drift == "Random") {
        curDrift =
          G.random_driftNames[
            Math.floor(getRandomRange(0, G.random_driftNames.length))
          ];
      } else {
        curDrift = drift;
      }
      speedTime =
        G.speedFrames[getArrayIndex(G.speedNames, speed)] *
        myNewComp.frameDuration;
      fadeTime =
        G.fadeFrames[getArrayIndex(G.speedNames, speed)] *
        myNewComp.frameDuration;
      maxFadeTime = G.maxFadeFrames * myNewComp.frameDuration;
      if (interpolation == "Random") {
        curInterpolation =
          G.random_interpolationNames[
            Math.floor(getRandomRange(0, G.random_interpolationNames.length))
          ];
      } else {
        curInterpolation = interpolation;
      }
      switch (style) {
        case "Horizontal":
          curStyle = getRandom() < 0.5 ? "Slide Left" : "Slide Right";
          break;
        case "Vertical":
          curStyle = getRandom() < 0.5 ? "Slide Up" : "Slide Down";
          break;
        case "Back & Forth":
          curStyle = getRandom() < 0.5 ? "Slide Back" : "Slide Forth";
          break;
        case "Scale Up & Down":
          curStyle = getRandom() < 0.5 ? "Scale Up" : "Scale Down";
          break;
        case "Stretch & Squeeze":
          curStyle = getRandom() < 0.5 ? "Stretch" : "Squeeze";
          break;
        case "Random Slide":
          curStyle =
            G.random_slideStyleNames[
              Math.floor(getRandomRange(0, G.random_slideStyleNames.length))
            ];
          break;
        case "Random Scale":
          curStyle =
            G.random_scaleStyleNames[
              Math.floor(getRandomRange(0, G.random_scaleStyleNames.length))
            ];
          break;
        case "X & Y Rotate":
          curStyle =
            G.random_rotateStyleNames[
              Math.floor(getRandomRange(0, G.random_rotateStyleNames.length))
            ];
          break;
        case "Random":
          if (curInterpolation == "Inertia") {
            curStyle =
              G.random_inertiaStyleNames[
                Math.floor(getRandomRange(0, G.random_inertiaStyleNames.length))
              ];
          } else {
            curStyle =
              G.random_styleNames[
                Math.floor(getRandomRange(0, G.random_styleNames.length))
              ];
          }
          break;
        default:
          curStyle = style;
          break;
      }
      switch (keywordStyle) {
        case "Auto":
          curKeywordStyle = curStyle;
          doingAuto = true;
          break;
        case "Opposite":
          switch (curStyle) {
            case "Off":
              curKeywordStyle = "Off";
              break;
            case "Slide Left":
              curKeywordStyle = "Slide Right";
              break;
            case "Slide Right":
              curKeywordStyle = "Slide Left";
              break;
            case "Slide Up":
              if (style == "Random") {
                curKeywordStyle = "Slide Back";
              } else {
                curKeywordStyle = "Slide Down";
              }
              break;
            case "Slide Down":
              if (style == "Random") {
                curKeywordStyle = "Slide Forth";
              } else {
                curKeywordStyle = "Slide Up";
              }
              break;
            case "Slide Back":
              curKeywordStyle = "Slide Forth";
              break;
            case "Slide Forth":
              curKeywordStyle = "Slide Back";
              break;
            case "Scale Up":
              curKeywordStyle = "Scale Down";
              break;
            case "Scale Down":
              curKeywordStyle = "Scale Up";
              break;
            case "Squeeze":
              curKeywordStyle = "Stretch";
              break;
            case "Stretch":
              curKeywordStyle = "Squeeze";
              break;
            case "X Rotate":
              curKeywordStyle = "Y Rotate";
              break;
            case "Y Rotate":
              curKeywordStyle = "X Rotate";
              break;
            case "Z Rotate":
              curKeywordStyle = "Z Rotate CCW";
              break;
            default:
              break;
          }
          break;
        case "Horizontal":
          curKeywordStyle = getRandom() < 0.5 ? "Slide Left" : "Slide Right";
          break;
        case "Vertical":
          curKeywordStyle = getRandom() < 0.5 ? "Slide Up" : "Slide Down";
          break;
        case "Back & Forth":
          curKeywordStyle = getRandom() < 0.5 ? "Slide Back" : "Slide Forth";
          break;
        case "Scale Up & Down":
          curKeywordStyle = getRandom() < 0.5 ? "Scale Up" : "Scale Down";
          break;
        case "Stretch & Squeeze":
          curKeywordStyle = getRandom() < 0.5 ? "Stretch" : "Squeeze";
          break;
        case "Random Slide":
          curKeywordStyle =
            G.random_slideStyleNames[
              Math.floor(getRandomRange(0, G.random_slideStyleNames.length))
            ];
          break;
        case "Random Scale":
          curKeywordStyle =
            G.random_scaleStyleNames[
              Math.floor(getRandomRange(0, G.random_scaleStyleNames.length))
            ];
          break;
        case "X & Y Rotate":
          curKeywordStyle =
            G.random_rotateStyleNames[
              Math.floor(getRandomRange(0, G.random_rotateStyleNames.length))
            ];
          break;
        case "Random":
          if (curInterpolation == "Inertia") {
            curKeywordStyle =
              G.random_inertiaStyleNames[
                Math.floor(getRandomRange(0, G.random_inertiaStyleNames.length))
              ];
          } else {
            curKeywordStyle =
              G.random_styleNames[
                Math.floor(getRandomRange(0, G.random_styleNames.length))
              ];
          }
          break;
        default:
          curKeywordStyle = keywordStyle;
          break;
      }
      if (cutFade == "Random Fade") {
        curCutFade =
          G.random_fadeNames[
            Math.floor(getRandomRange(0, G.random_fadeNames.length))
          ];
      } else if (cutFade == "Random Cut") {
        curCutFade =
          G.random_cutNames[
            Math.floor(getRandomRange(0, G.random_cutNames.length))
          ];
      } else {
        curCutFade = cutFade;
      }
      holdTime = holdFrames * myNewComp.frameDuration;
      if (doingTransition) {
        if (haveRegular || doingAuto) {
          if (curStyle.indexOf("Slide") > -1) {
            if (curInterpolation.substr(0, 4) == "Ease") {
              myCompLayer.applyPreset(File(myPositionControls1PresetPath));
              myEffectName = "Pseudo/DEOZ MWRDS Position 1";
              if (curInterpolation == "Ease Invert") {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myEffectName)
                  .property(myEffectName + "-0003")
                  .setValue(25);
              }
            } else {
              myCompLayer.applyPreset(File(myPositionControls2PresetPath));
              myEffectName = "Pseudo/DEOZ MWRDS Position 2";
            }
          } else if (
            curStyle.indexOf("Scale") > -1 ||
            curStyle == "Squeeze" ||
            curStyle == "Stretch"
          ) {
            if (curInterpolation.substr(0, 4) == "Ease") {
              myCompLayer.applyPreset(File(myScaleControls1PresetPath));
              myEffectName = "Pseudo/DEOZ MWRDS Scale 1";
              if (curInterpolation == "Ease Invert") {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myEffectName)
                  .property(myEffectName + "-0003")
                  .setValue(25);
              }
              if (doingRandomizeAnchor) {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myEffectName)
                  .property(myEffectName + "-0004")
                  .setValue(
                    G.randomizeAnchorScale[
                      Math.floor(
                        getRandomRange(0, G.randomizeAnchorScale.length),
                      )
                    ],
                  );
              }
            } else {
              myCompLayer.applyPreset(File(myScaleControls2PresetPath));
              myEffectName = "Pseudo/DEOZ MWRDS Scale 2";
              if (doingRandomizeAnchor) {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myEffectName)
                  .property(myEffectName + "-0003")
                  .setValue(
                    G.randomizeAnchorScale[
                      Math.floor(
                        getRandomRange(0, G.randomizeAnchorScale.length),
                      )
                    ],
                  );
              }
            }
          } else {
            if (curStyle.indexOf("Rotate") > -1) {
              if (curInterpolation.substr(0, 4) == "Ease") {
                myCompLayer.applyPreset(File(myRotationControls1PresetPath));
                myEffectName = "Pseudo/DEOZ MWRDS Rotation 1";
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myEffectName)
                  .property(myEffectName + "-0001")
                  .setValue(25);
                if (curInterpolation == "Ease Invert") {
                  myCompLayer
                    .property("ADBE Effect Parade")
                    .property(myEffectName)
                    .property(myEffectName + "-0003")
                    .setValue(25);
                }
                if (doingRandomizeAnchor) {
                  if (curStyle.indexOf("X") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myEffectName)
                      .property(myEffectName + "-0004")
                      .setValue(
                        G.randomizeAnchorRotateX[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateX.length),
                          )
                        ],
                      );
                  } else if (curStyle.indexOf("Y") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myEffectName)
                      .property(myEffectName + "-0004")
                      .setValue(
                        G.randomizeAnchorRotateY[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateY.length),
                          )
                        ],
                      );
                  } else {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myEffectName)
                      .property(myEffectName + "-0004")
                      .setValue(
                        G.randomizeAnchorRotateZ[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateZ.length),
                          )
                        ],
                      );
                  }
                }
              } else {
                myCompLayer.applyPreset(File(myRotationControls2PresetPath));
                myEffectName = "Pseudo/DEOZ MWRDS Rotation 2";
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myEffectName)
                  .property(myEffectName + "-0001")
                  .setValue(25);
                if (doingRandomizeAnchor) {
                  if (curStyle.indexOf("X") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myEffectName)
                      .property(myEffectName + "-0003")
                      .setValue(
                        G.randomizeAnchorRotateX[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateX.length),
                          )
                        ],
                      );
                  } else if (curStyle.indexOf("Y") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myEffectName)
                      .property(myEffectName + "-0003")
                      .setValue(
                        G.randomizeAnchorRotateY[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateY.length),
                          )
                        ],
                      );
                  } else {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myEffectName)
                      .property(myEffectName + "-0003")
                      .setValue(
                        G.randomizeAnchorRotateZ[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateZ.length),
                          )
                        ],
                      );
                  }
                }
              }
            }
          }
        }
        if (haveKeyword && !doingAuto) {
          if (curKeywordStyle.indexOf("Slide") > -1) {
            if (curInterpolation.substr(0, 4) == "Ease") {
              myCompLayer.applyPreset(File(myPositionControls3PresetPath));
              myKeyEffectName = "Pseudo/DEOZ MWRDS Position 3";
              if (curInterpolation == "Ease Invert") {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myKeyEffectName)
                  .property(myKeyEffectName + "-0003")
                  .setValue(25);
              }
            } else {
              myCompLayer.applyPreset(File(myPositionControls4PresetPath));
              myKeyEffectName = "Pseudo/DEOZ MWRDS Position 4";
            }
          } else if (
            curKeywordStyle.indexOf("Scale") > -1 ||
            curKeywordStyle == "Squeeze" ||
            curKeywordStyle == "Stretch"
          ) {
            if (curInterpolation.substr(0, 4) == "Ease") {
              myCompLayer.applyPreset(File(myScaleControls3PresetPath));
              myKeyEffectName = "Pseudo/DEOZ MWRDS Scale 3";
              if (curInterpolation == "Ease Invert") {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myKeyEffectName)
                  .property(myKeyEffectName + "-0003")
                  .setValue(25);
              }
              if (doingRandomizeAnchor) {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myKeyEffectName)
                  .property(myKeyEffectName + "-0004")
                  .setValue(
                    G.randomizeAnchorScale[
                      Math.floor(
                        getRandomRange(0, G.randomizeAnchorScale.length),
                      )
                    ],
                  );
              }
            } else {
              myCompLayer.applyPreset(File(myScaleControls4PresetPath));
              myKeyEffectName = "Pseudo/DEOZ MWRDS Scale 4";
              if (doingRandomizeAnchor) {
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myKeyEffectName)
                  .property(myKeyEffectName + "-0003")
                  .setValue(
                    G.randomizeAnchorScale[
                      Math.floor(
                        getRandomRange(0, G.randomizeAnchorScale.length),
                      )
                    ],
                  );
              }
            }
          } else {
            if (curKeywordStyle.indexOf("Rotate") > -1) {
              if (curInterpolation.substr(0, 4) == "Ease") {
                myCompLayer.applyPreset(File(myRotationControls3PresetPath));
                myKeyEffectName = "Pseudo/DEOZ MWRDS Rotation 3";
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myKeyEffectName)
                  .property(myKeyEffectName + "-0001")
                  .setValue(25);
                if (curInterpolation == "Ease Invert") {
                  myCompLayer
                    .property("ADBE Effect Parade")
                    .property(myKeyEffectName)
                    .property(myKeyEffectName + "-0003")
                    .setValue(25);
                }
                if (doingRandomizeAnchor) {
                  if (curKeywordStyle.indexOf("X") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myKeyEffectName)
                      .property(myKeyEffectName + "-0004")
                      .setValue(
                        G.randomizeAnchorRotateX[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateX.length),
                          )
                        ],
                      );
                  } else if (curKeywordStyle.indexOf("Y") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myKeyEffectName)
                      .property(myKeyEffectName + "-0004")
                      .setValue(
                        G.randomizeAnchorRotateY[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateY.length),
                          )
                        ],
                      );
                  } else {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myKeyEffectName)
                      .property(myKeyEffectName + "-0004")
                      .setValue(
                        G.randomizeAnchorRotateZ[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateZ.length),
                          )
                        ],
                      );
                  }
                }
              } else {
                myCompLayer.applyPreset(File(myRotationControls4PresetPath));
                myKeyEffectName = "Pseudo/DEOZ MWRDS Rotation 4";
                myCompLayer
                  .property("ADBE Effect Parade")
                  .property(myKeyEffectName)
                  .property(myKeyEffectName + "-0001")
                  .setValue(25);
                if (doingRandomizeAnchor) {
                  if (curKeywordStyle.indexOf("X") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myKeyEffectName)
                      .property(myKeyEffectName + "-0003")
                      .setValue(
                        G.randomizeAnchorRotateX[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateX.length),
                          )
                        ],
                      );
                  } else if (curKeywordStyle.indexOf("Y") > -1) {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myKeyEffectName)
                      .property(myKeyEffectName + "-0003")
                      .setValue(
                        G.randomizeAnchorRotateY[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateY.length),
                          )
                        ],
                      );
                  } else {
                    myCompLayer
                      .property("ADBE Effect Parade")
                      .property(myKeyEffectName)
                      .property(myKeyEffectName + "-0003")
                      .setValue(
                        G.randomizeAnchorRotateZ[
                          Math.floor(
                            getRandomRange(0, G.randomizeAnchorRotateZ.length),
                          )
                        ],
                      );
                  }
                }
              }
            }
          }
        }
      }
      deselectAll(myComp);
      myCompLayer.selected = true;
      if (drift != "Off") {
        myCompLayer.applyPreset(File(myDriftControlsPresetPath));
      }
      if (curDrift == "Up" || curDrift == "Down" || curDrift == "Vertical") {
        myCompLayer
          .property("ADBE Effect Parade")
          .property("Pseudo/DEOZ MWRDS Drift")
          .property("Pseudo/DEOZ MWRDS Drift-0002")
          .setValue(10);
      }
      if (doingTracking) {
        myCompLayer.applyPreset(File(myTrackingControlsPresetPath));
      }
      if (doingTransition) {
        curMarkerTime = 0;
        if (doingMarkerOffset) {
          for (var j = 0; j < myPageLayers.length; j += 1) {
            myMarkerVal.comment = "" + j + 1;
            myPageControl
              .property("Marker")
              .setValueAtTime(curMarkerTime, myMarkerVal);
            curMarkerTime += markerOffset;
          }
        } else {
          myMarkerVal.comment = "1";
          myPageControl
            .property("Marker")
            .setValueAtTime(curMarkerTime, myMarkerVal);
        }
      }
      lastResolveTime = 0;
      oddEven = null;
      for (var j = 0; j < myPageLayers.length; j += 1) {
        myPageLayer = myPageLayers[j];
        doingKeyword = myPageLayer.comment == G.keywordID && !doingAuto;
        thisStyle = doingKeyword ? curKeywordStyle : curStyle;
        if (thisStyle != "Off") {
          thisEffectName = doingKeyword ? myKeyEffectName : myEffectName;
          amountExpr =
            'try{\r  _intensity_ = comp("' +
            myComp.name +
            '").layer("' +
            myCompLayer.name +
            '").effect("' +
            thisEffectName +
            '")("' +
            thisEffectName +
            '-0001");\r' +
            '  _myRnd_ = comp("' +
            myComp.name +
            '").layer("' +
            myCompLayer.name +
            '").effect("' +
            thisEffectName +
            '")("' +
            thisEffectName +
            '-0002");\r' +
            "}catch(e){\r" +
            "  _intensity_ = 50;\r" +
            "  _myRnd_ = 50;\r" +
            "}\r" +
            "seedRandom(index,true);\r" +
            "_intensity_ *= 1 + random(-_myRnd_,_myRnd_)/100;\r" +
            "Math.min(Math.max(_intensity_,0),100);";
        }
        if (doingTransition) {
          if (
            thisStyle.indexOf("Scale") > -1 ||
            thisStyle == "Squeeze" ||
            thisStyle == "Stretch" ||
            thisStyle.indexOf("Rotate") > -1
          ) {
            myAnchorAnimator = myPageLayer
              .property("ADBE Text Properties")
              .property("ADBE Text Animators")
              .addProperty("ADBE Text Animator");
            myAnchorAnimator.name = "Anchor Point";
            myAnchorSelector = myAnchorAnimator
              .property("ADBE Text Selectors")
              .addProperty("ADBE Text Selector");
            myAnchorSelector
              .property("ADBE Text Range Advanced")
              .property("ADBE Text Range Type2")
              .setValue(4);
            myAnchorProp = myAnchorAnimator
              .property("ADBE Text Animator Properties")
              .addProperty("ADBE Text Anchor Point 3D");
            myAnchorPosProp = myAnchorAnimator
              .property("ADBE Text Animator Properties")
              .addProperty("ADBE Text Position 3D");
            myRect = myPageLayer.sourceRectAtTime(0, false);
            myTopVal = -myRect.height;
            myCenterYVal = -myRect.height / 2;
            myBottomVal = 0;
            myLeftVal = -myRect.width / 2;
            myCenterXVal = 0;
            myRightVal = myRect.width / 2;
            anchorExpr =
              'try{\r  _anchor_ = comp("' +
                myComp.name +
                '").layer("' +
                myCompLayer.name +
                '").effect("' +
                thisEffectName +
                '")("' +
                thisEffectName +
                curInterpolation.substr(0, 4) ==
              "Ease"
                ? "-0004"
                : "-0003" +
                  '");\r' +
                  "}catch(e){\r" +
                  "  _anchor_ = 1;\r" +
                  "}\r" +
                  "switch(_anchor_.value){\r" +
                  "  case 1:\r" +
                  "    [" +
                  myCenterXVal +
                  "," +
                  myCenterYVal +
                  ",0];\r" +
                  "    break;\r" +
                  "  case 2:\r" +
                  "   [" +
                  myCenterXVal +
                  ", " +
                  myTopVal +
                  ",0];\r" +
                  "    break;\r" +
                  "  case 3:\r" +
                  "    [" +
                  myCenterXVal +
                  "," +
                  myBottomVal +
                  ",0];\r" +
                  "    break;\r" +
                  "  case 4:\r" +
                  "    [" +
                  myLeftVal +
                  "," +
                  myCenterYVal +
                  ",0];\r" +
                  "    break;\r" +
                  "  case 5:\r" +
                  "    [" +
                  myRightVal +
                  "," +
                  myCenterYVal +
                  ",0];\r" +
                  "    break;\r" +
                  "  default:\r" +
                  "   value;\r" +
                  "    break;\r" +
                  "}";
            myAnchorProp.expression =
              G.exprHeader + obfuscateExpr(anchorExpr, oTable);
            myAnchorPosProp.expression =
              G.exprHeader + obfuscateExpr(anchorExpr, oTable);
          }
        }
        switch (curDrift) {
          case "Horizontal":
            if (oddEven == null) {
              oddEven = getRandom() < 0.5 ? 0 : 1;
            } else {
              oddEven++;
            }
            tempDrift = oddEven % 2 > 0 ? "Left" : "Right";
            break;
          case "Vertical":
            tempDrift = getRandom() < 0.5 ? "Up" : "Down";
            break;
          case "Back & Forth":
            if (oddEven == null) {
              oddEven = getRandom() < 0.5 ? 0 : 1;
            } else {
              oddEven++;
            }
            tempDrift = oddEven % 2 > 0 ? "Back" : "Forth";
            break;
          case "Random / Layer":
            tempDrift =
              G.randomPerLayer_driftNames[
                Math.floor(
                  getRandomRange(0, G.randomPerLayer_driftNames.length),
                )
              ];
            break;
          case "Auto":
            if (!doingTransition) {
              tempDrift = "Off";
            } else if (curInterpolation == "Inertia") {
              switch (thisStyle) {
                case "Slide Left":
                  tempDrift = "Right";
                  break;
                case "Slide Right":
                  tempDrift = "Left";
                  break;
                case "Slide Up":
                  tempDrift = "Down";
                  break;
                case "Slide Down":
                  tempDrift = "Up";
                  break;
                case "Slide Back":
                  tempDrift = "Forth";
                  break;
                case "Slide Forth":
                  tempDrift = "Back";
                  break;
                case "Scale Up":
                  tempDrift = "Back";
                  break;
                case "Scale Down":
                  tempDrift = "Forth";
                  break;
                case "Stretch":
                  tempDrift = getRandom() < 0.5 ? "Back" : "Forth";
                  break;
                case "Squeeze":
                  tempDrift = getRandom() < 0.5 ? "Back" : "Forth";
                  break;
                case "X Rotate":
                  tempDrift = "Forth";
                  break;
                case "Y Rotate":
                  tempDrift = "Back";
                  break;
                case "Z Rotate":
                  tempDrift = "Forth";
                  break;
                default:
                  break;
              }
            } else {
              switch (thisStyle) {
                case "Slide Left":
                  tempDrift = "Left";
                  break;
                case "Slide Right":
                  tempDrift = "Right";
                  break;
                case "Slide Up":
                  tempDrift = "Up";
                  break;
                case "Slide Down":
                  tempDrift = "Down";
                  break;
                case "Slide Back":
                  tempDrift = "Back";
                  break;
                case "Slide Forth":
                  tempDrift = "Forth";
                  break;
                case "Scale Up":
                  tempDrift = "Forth";
                  break;
                case "Scale Down":
                  tempDrift = "Back";
                  break;
                case "Stretch":
                  tempDrift = getRandom() < 0.5 ? "Back" : "Forth";
                  break;
                case "Squeeze":
                  tempDrift = getRandom() < 0.5 ? "Back" : "Forth";
                  break;
                case "X Rotate":
                  tempDrift = "Back";
                  break;
                case "Y Rotate":
                  tempDrift = "Forth";
                  break;
                case "Z Rotate":
                  tempDrift = "Back";
                  break;
                default:
                  break;
              }
            }
            break;
          default:
            tempDrift = curDrift;
        }
        if (tempDrift != "Off") {
          myAnimator = myPageLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators")
            .addProperty("ADBE Text Animator");
          myAnimator.name = "Drift";
          mySelector = myAnimator
            .property("ADBE Text Selectors")
            .addProperty("ADBE Text Selector");
          myAnimatorProp = myAnimator
            .property("ADBE Text Animator Properties")
            .addProperty("ADBE Text Position 3D");
          switch (tempDrift) {
            case "Left":
              myAnimatorProp.setValue([myNewComp.width / 4, 0, 0]);
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Selector Max Amount").expression =
                G.exprHeader + obfuscateExpr(reverseMoveExpr, oTable);
              break;
            case "Right":
              myAnimatorProp.setValue([myNewComp.width / 4, 0, 0]);
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Selector Max Amount").expression =
                G.exprHeader + obfuscateExpr(forwardMoveExpr, oTable);
              break;
            case "Up":
              myAnimatorProp.setValue([0, myNewComp.height * 0.2, 0]);
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Selector Max Amount").expression =
                G.exprHeader + obfuscateExpr(reverseMoveExpr, oTable);
              break;
            case "Down":
              myAnimatorProp.setValue([0, myNewComp.height * 0.2, 0]);
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Selector Max Amount").expression =
                G.exprHeader + obfuscateExpr(forwardMoveExpr, oTable);
              break;
            case "Back":
              myAnimatorProp.setValue([0, 0, myNewComp.width]);
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Selector Max Amount").expression =
                G.exprHeader + obfuscateExpr(forwardMoveExpr, oTable);
              break;
            case "Forth":
              myAnimatorProp.setValue([0, 0, myNewComp.width]);
              mySelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Selector Max Amount").expression =
                G.exprHeader + obfuscateExpr(reverseMoveExpr, oTable);
              break;
            default:
              break;
          }
        }
        if (doingTransition) {
          if (doingMarkerOffset) {
            tempHeaderExpr =
              '_L_ = thisComp.layer("' +
              myPageControl.name +
              '");\r' +
              "_m_ = _L_.marker;\r" +
              '_t_ = time - _m_.key("' +
              doingReverseReveal
                ? myPageLayers.length - j
                : (j + 1).toString() + '").time;\r';
          } else {
            tempHeaderExpr =
              '_L_ = thisComp.layer("' +
              myPageControl.name +
              '");\r' +
              "_m_ = _L_.marker;\r" +
              '_t_ = time - _m_.key("1").time;\r';
          }
          easeHeaderExpr = "";
          amtParm = "";
          if (thisStyle != "Off") {
            myAnimator = myPageLayer
              .property("ADBE Text Properties")
              .property("ADBE Text Animators")
              .addProperty("ADBE Text Animator");
            mySelector = myAnimator
              .property("ADBE Text Selectors")
              .addProperty("ADBE Text Selector");
            mySelector
              .property("ADBE Text Range Advanced")
              .property("ADBE Text Selector Max Amount").expression =
              G.exprHeader + obfuscateExpr(amountExpr, oTable);
            myPageLayer
              .property("ADBE Text Properties")
              .property("ADBE Text More Options")
              .property("ADBE Text Anchor Point Option")
              .setValue(3);
            mySelector
              .property("ADBE Text Range Advanced")
              .property("ADBE Text Range Type2")
              .setValue(4);
            animatorPropExpr = "";
            if (thisStyle.indexOf("Slide") > -1) {
              myAnimator.name = "Position";
              myAnimatorProp = myAnimator
                .property("ADBE Text Animator Properties")
                .addProperty("ADBE Text Position 3D");
              myDupAnimatorPropName = "ADBE Text Position 3D";
              switch (thisStyle) {
                case "Slide Right":
                  myAnimatorProp.setValue([-myNewComp.width * 1.5, 0, 0]);
                  myDupAnimatorPropVal = [myNewComp.width * 1.5, 0, 0];
                  break;
                case "Slide Left":
                  myAnimatorProp.setValue([myNewComp.width * 1.5, 0, 0]);
                  myDupAnimatorPropVal = [-myNewComp.width * 1.5, 0, 0];
                  break;
                case "Slide Up":
                  myAnimatorProp.setValue([0, myNewComp.height * 1.5, 0]);
                  myDupAnimatorPropVal = [0, -myNewComp.height * 1.5, 0];
                  break;
                case "Slide Down":
                  myAnimatorProp.setValue([0, -myNewComp.height * 1.5, 0]);
                  myDupAnimatorPropVal = [0, myNewComp.height * 1.5, 0];
                  break;
                case "Slide Back":
                  myAnimatorProp.setValue([0, 0, -myNewComp.width * 1.75]);
                  myDupAnimatorPropVal = [0, 0, myNewComp.width * 1.75];
                  break;
                case "Slide Forth":
                  myAnimatorProp.setValue([0, 0, myNewComp.width * 1.75]);
                  myDupAnimatorPropVal = [0, 0, -myNewComp.width * 1.75];
                  break;
                default:
                  break;
              }
              if (doingTransitionIn && doingTransitionOut) {
                animatorPropExpr =
                  tempHeaderExpr +
                  "_t_ >= " +
                  speedTime +
                  holdTime +
                  " ? -value : value";
              } else {
                if (doingTransitionOut) {
                  animatorPropExpr =
                    tempHeaderExpr + "_t_ >= " + holdTime + " ? -value : value";
                }
              }
            } else if (
              thisStyle.indexOf("Scale") > -1 ||
              thisStyle == "Squeeze" ||
              thisStyle == "Stretch"
            ) {
              myAnimator.name = "Scale";
              myAnimatorProp = myAnimator
                .property("ADBE Text Animator Properties")
                .addProperty("ADBE Text Scale 3D");
              if (thisStyle == "Scale Up") {
                myAnimatorProp.setValue([0, 0, 0]);
                if (doingTransitionIn && doingTransitionOut) {
                  animatorPropExpr =
                    tempHeaderExpr +
                    "_t_ >= " +
                    speedTime +
                    holdTime +
                    " ? [200,200,200] : value";
                } else {
                  if (doingTransitionOut) {
                    animatorPropExpr =
                      tempHeaderExpr +
                      "_t_ >= " +
                      holdTime +
                      " ? [2000,2000,2000] : value";
                  }
                }
              } else if (thisStyle == "Scale Down") {
                myAnimatorProp.setValue([2000, 2000, 2000]);
                if (doingTransitionIn && doingTransitionOut) {
                  animatorPropExpr =
                    tempHeaderExpr +
                    "_t_ >= " +
                    speedTime +
                    holdTime +
                    " ? [0,0,0] : value";
                } else {
                  if (doingTransitionOut) {
                    animatorPropExpr =
                      tempHeaderExpr +
                      "_t_ >= " +
                      holdTime +
                      " ? [0,0,0] : value";
                  }
                }
              } else if (thisStyle == "Squeeze") {
                myAnimatorProp.setValue([100, 2000, 100]);
              } else {
                myAnimatorProp.setValue([2000, 100, 100]);
              }
            } else {
              myAnimator.name = "Rotation";
              if (thisStyle.indexOf("X") > -1) {
                myAnimatorProp = myAnimator
                  .property("ADBE Text Animator Properties")
                  .addProperty("ADBE Text Rotation X");
                myDupAnimatorPropName = "ADBE Text Rotation X";
              } else if (thisStyle.indexOf("Y") > -1) {
                myAnimatorProp = myAnimator
                  .property("ADBE Text Animator Properties")
                  .addProperty("ADBE Text Rotation Y");
                myDupAnimatorPropName = "ADBE Text Rotation Y";
              } else {
                myAnimatorProp = myAnimator
                  .property("ADBE Text Animator Properties")
                  .addProperty("ADBE Text Rotation");
                myDupAnimatorPropName = "ADBE Text Rotation";
              }
              if (thisStyle == "Z Rotate CCW") {
                myAnimatorProp.setValue(-720);
                myDupAnimatorPropVal = 720;
              } else {
                myAnimatorProp.setValue(720);
                myDupAnimatorPropVal = -720;
              }
              if (doingTransitionIn && doingTransitionOut) {
                animatorPropExpr =
                  tempHeaderExpr +
                  "_t_ >= " +
                  speedTime +
                  holdTime +
                  " ? -value : value";
              } else {
                if (doingTransitionOut) {
                  animatorPropExpr =
                    tempHeaderExpr + "_t_ >= " + holdTime + " ? -value : value";
                }
              }
            }
            if (animatorPropExpr != "") {
              myAnimatorProp.expression =
                G.exprHeader + obfuscateExpr(animatorPropExpr, oTable);
            }
            switch (curInterpolation) {
              case "Ease":
                interpolationInName = "Ease Out";
                interpolationOutName = "Ease In";
                easeHeaderExpr =
                  'try{\r  _amt_ = comp("' +
                  myComp.name +
                  '").layer("' +
                  myCompLayer.name +
                  '").effect("' +
                  thisEffectName +
                  '")("' +
                  thisEffectName +
                  '-0003");\r' +
                  "}catch(e){\r" +
                  "  _amt_ = 50;\r" +
                  "}\r" +
                  "_amt_ = linear(_amt_,0,100,1,10);\r";
                amtParm = ",_amt_";
                break;
              case "Ease Invert":
                interpolationInName = "Ease In";
                interpolationOutName = "Ease Out";
                easeHeaderExpr =
                  'try{\r  _amt_ = comp("' +
                  myComp.name +
                  '").layer("' +
                  myCompLayer.name +
                  '").effect("' +
                  thisEffectName +
                  '")("' +
                  thisEffectName +
                  '-0003");\r' +
                  "}catch(e){\r" +
                  "  _amt_ = 50;\r" +
                  "}\r" +
                  "_amt_ = linear(_amt_,0,100,1,10);\r";
                amtParm = ",_amt_";
                break;
              case "Inertia":
                interpolationInName = "Anticipate Out";
                interpolationOutName = "Anticipate In";
                break;
              case "Linear":
                interpolationInName = "Linear";
                interpolationOutName = "Linear";
                break;
              default:
                break;
            }
            auxExpr = "";
            if (
              (doingTransitionIn && interpolationInName == "Anticipate Out") ||
              (doingTransitionOut && interpolationOutName == "Anticipate In")
            ) {
              if (thisStyle == "Slide Back" || thisStyle == "Slide Forth") {
                if (speed == "Slow" || speed == "Very Slow") {
                  auxExpr = "_s_ = 1.7;\r";
                } else {
                  auxExpr = "_s_ = 1.7;\r";
                }
              } else if (thisStyle.indexOf("Slide") > -1) {
                switch (speed) {
                  case "Very Slow":
                    auxExpr = "_s_ = 0.7;\r";
                    break;
                  case "Slow":
                    auxExpr = "_s_ = 0.7;\r";
                    break;
                  case "Medium":
                    auxExpr = "_s_ = 0.6;\r";
                    break;
                  case "Fast":
                    auxExpr = "_s_ = 0.6;\r";
                    break;
                  case "Very Fast":
                    auxExpr = "_s_ = 0.6;\r";
                    break;
                  default:
                    break;
                }
              } else {
                if (thisStyle.indexOf("Rotate") > -1) {
                  switch (speed) {
                    case "Very Slow":
                      auxExpr = "_s_ = 1.2;\r";
                      break;
                    case "Slow":
                      auxExpr = "_s_ = 1.2;\r";
                      break;
                    case "Medium":
                      auxExpr = "_s_ = 1.0;\r";
                      break;
                    case "Fast":
                      auxExpr = "_s_ = 1.0;\r";
                      break;
                    case "Very Fast":
                      auxExpr = "_s_ = 1.0;\r";
                      break;
                    default:
                      break;
                  }
                }
              }
            }
            if (doingTransitionIn && doingTransitionOut) {
              easeFunctionExpr = getEaseFunctionExpr(interpolationInName, "");
              easeFunctionExpr2 = getEaseFunctionExpr(
                interpolationOutName,
                "2",
              );
              easeExpr =
                "if (_t_ < " +
                speedTime +
                "){\r" +
                "  _myEase_(_t_,0," +
                speedTime +
                ",0,100" +
                amtParm +
                ")\r" +
                "}else{\r" +
                "  _myEase2_(_t_," +
                speedTime +
                holdTime +
                "," +
                speedTime * 2 +
                holdTime +
                ",100,0" +
                amtParm +
                ")\r" +
                "}";
              tempExpr =
                easeFunctionExpr +
                easeFunctionExpr2 +
                auxExpr +
                tempHeaderExpr +
                easeHeaderExpr +
                easeExpr;
              dupEaseExpr =
                "if (_t_ < " +
                speedTime +
                "){\r" +
                "  100 - Math.max(_myEase_(_t_,0," +
                speedTime +
                ",0,100)-100,0)\r" +
                "}else{\r" +
                "  100 - Math.max(_myEase2_(_t_," +
                speedTime +
                holdTime +
                "," +
                speedTime * 2 +
                holdTime +
                ",100,0)-100,0)\r" +
                "}";
              dupTempExpr =
                easeFunctionExpr +
                easeFunctionExpr2 +
                auxExpr +
                tempHeaderExpr +
                easeHeaderExpr +
                dupEaseExpr;
              lastResolveTime = Math.max(
                lastResolveTime,
                myPageControl
                  .property("Marker")
                  .keyTime(
                    doingMarkerOffset
                      ? doingReverseReveal
                        ? myPageLayers.length - j
                        : j + 1
                      : 1,
                  ) +
                  speedTime * 2 +
                  holdTime,
              );
            } else if (doingTransitionIn) {
              easeFunctionExpr = getEaseFunctionExpr(interpolationInName, "");
              easeExpr =
                "_myEase_(_t_,0," + speedTime + ",0,100" + amtParm + ")";
              tempExpr =
                easeFunctionExpr +
                auxExpr +
                tempHeaderExpr +
                easeHeaderExpr +
                easeExpr;
              dupEaseExpr =
                "100 - Math.max(_myEase_(_t_,0," + speedTime + ",0,100)-100,0)";
              dupTempExpr =
                easeFunctionExpr +
                auxExpr +
                tempHeaderExpr +
                easeHeaderExpr +
                dupEaseExpr;
              lastResolveTime = Math.max(
                lastResolveTime,
                myPageControl
                  .property("Marker")
                  .keyTime(
                    doingMarkerOffset
                      ? doingReverseReveal
                        ? myPageLayers.length - j
                        : j + 1
                      : 1,
                  ) +
                  speedTime +
                  holdTime,
              );
            } else {
              easeFunctionExpr = getEaseFunctionExpr(interpolationOutName, "");
              easeExpr =
                "_myEase_(_t_," +
                holdTime +
                "," +
                holdTime +
                speedTime +
                ",100,0" +
                amtParm +
                ")";
              tempExpr =
                easeFunctionExpr +
                auxExpr +
                tempHeaderExpr +
                easeHeaderExpr +
                easeExpr;
              dupEaseExpr =
                "100 - Math.max(_myEase_(_t_," +
                holdTime +
                "," +
                holdTime +
                speedTime +
                ",100,0)-100,0)";
              dupTempExpr =
                easeFunctionExpr +
                auxExpr +
                tempHeaderExpr +
                easeHeaderExpr +
                dupEaseExpr;
              lastResolveTime = Math.max(
                lastResolveTime,
                myPageControl
                  .property("Marker")
                  .keyTime(
                    doingMarkerOffset
                      ? doingReverseReveal
                        ? myPageLayers.length - j
                        : j + 1
                      : 1,
                  ) +
                  speedTime +
                  holdTime,
              );
            }
            offsetExpr = G.exprHeader + obfuscateExpr(tempExpr, oTable);
            mySelector.property("ADBE Text Percent Offset").expression =
              offsetExpr;
            if (curInterpolation == "Inertia") {
              myDupAnimator = myAnimator.duplicate();
              myDupAnimator
                .property("ADBE Text Animator Properties")
                .property(myDupAnimatorPropName)
                .setValue(myDupAnimatorPropVal);
              myDupAnimator
                .property("ADBE Text Selectors")
                .property("ADBE Text Selector")
                .property("ADBE Text Percent Offset").expression =
                G.exprHeader + obfuscateExpr(dupTempExpr, oTable);
            }
          }
          if (doingCutFade) {
            myFadeAnimator = myPageLayer
              .property("ADBE Text Properties")
              .property("ADBE Text Animators")
              .addProperty("ADBE Text Animator");
            myFadeAnimator.name = "Fade";
            myFadeSelector = myFadeAnimator
              .property("ADBE Text Selectors")
              .addProperty("ADBE Text Selector");
            if (curCutFade == "Random Mix") {
              tempCutFade =
                G.randomMix_cutFadeNames[
                  Math.floor(getRandomRange(0, G.randomMix_cutFadeNames.length))
                ];
              doingRandomizeOrder = getRandom() > 0.5;
            } else {
              tempCutFade = curCutFade;
              doingRandomizeOrder = false;
            }
            switch (tempCutFade) {
              case "Fade Line":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(4);
                tempFadeTime = fadeTime;
                break;
              case "Fade Word":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(3);
                tempFadeTime = Math.min(speedTime, maxFadeTime);
                break;
              case "Fade Letter":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(1);
                tempFadeTime = Math.min(speedTime, maxFadeTime);
                break;
              case "Fade Letter / Mix":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(1);
                tempFadeTime = Math.min(speedTime, maxFadeTime);
                doingRandomizeOrder = true;
                break;
              case "Cut Line":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(4);
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Selector Smoothness")
                  .setValue(0);
                tempFadeTime = fadeTime;
                break;
              case "Cut Word":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(3);
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Selector Smoothness")
                  .setValue(0);
                tempFadeTime = Math.min(speedTime, maxFadeTime);
                break;
              case "Cut Letter":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(1);
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Selector Smoothness")
                  .setValue(0);
                tempFadeTime = Math.min(speedTime, maxFadeTime);
                break;
              case "Cut Letter / Mix":
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Range Type2")
                  .setValue(1);
                myFadeSelector
                  .property("ADBE Text Range Advanced")
                  .property("ADBE Text Selector Smoothness")
                  .setValue(0);
                tempFadeTime = Math.min(speedTime, maxFadeTime);
                doingRandomizeOrder = true;
                break;
              default:
                break;
            }
            if (doingRandomizeOrder) {
              myFadeSelector
                .property("ADBE Text Range Advanced")
                .property("ADBE Text Randomize Order")
                .setValue(true);
            }
            myFadeAnimatorProp = myFadeAnimator
              .property("ADBE Text Animator Properties")
              .addProperty("ADBE Text Opacity");
            myFadeAnimatorProp.setValue(0);
            if (thisStyle != "Off") {
              if (doingTransitionIn && doingTransitionOut) {
                opacityExpr =
                  "if (_t_ < " +
                  tempFadeTime +
                  "){\r" +
                  "  linear(_t_,0," +
                  tempFadeTime +
                  ",0,100)\r" +
                  "}else{\r" +
                  "  linear(_t_," +
                  speedTime +
                  holdTime +
                  (speedTime - tempFadeTime) +
                  "," +
                  speedTime * 2 +
                  holdTime +
                  ",-100,0)\r" +
                  "}";
                lastResolveTime = Math.max(
                  lastResolveTime,
                  myPageControl
                    .property("Marker")
                    .keyTime(
                      doingMarkerOffset
                        ? doingReverseReveal
                          ? myPageLayers.length - j
                          : j + 1
                        : 1,
                    ) +
                    speedTime * 2 +
                    holdTime,
                );
              } else if (doingTransitionIn) {
                opacityExpr = "linear(_t_,0," + tempFadeTime + ",0,100)";
                lastResolveTime = Math.max(
                  lastResolveTime,
                  myPageControl
                    .property("Marker")
                    .keyTime(
                      doingMarkerOffset
                        ? doingReverseReveal
                          ? myPageLayers.length - j
                          : j + 1
                        : 1,
                    ) + tempFadeTime,
                );
              } else {
                opacityExpr =
                  "linear(_t_," +
                  holdTime +
                  (speedTime - tempFadeTime) +
                  "," +
                  speedTime +
                  holdTime +
                  ",-100,0)";
                lastResolveTime = Math.max(
                  lastResolveTime,
                  myPageControl
                    .property("Marker")
                    .keyTime(
                      doingMarkerOffset
                        ? doingReverseReveal
                          ? myPageLayers.length - j
                          : j + 1
                        : 1,
                    ) +
                    speedTime +
                    holdTime,
                );
              }
            } else {
              if (doingTransitionIn && doingTransitionOut) {
                opacityExpr =
                  "if (_t_ < " +
                  tempFadeTime +
                  "){\r" +
                  "  linear(_t_,0," +
                  tempFadeTime +
                  ",0,100)\r" +
                  "}else{\r" +
                  "  linear(_t_," +
                  tempFadeTime +
                  holdTime +
                  "," +
                  tempFadeTime * 2 +
                  holdTime +
                  ",-100,0)\r" +
                  "}";
                lastResolveTime = Math.max(
                  lastResolveTime,
                  myPageControl
                    .property("Marker")
                    .keyTime(
                      doingMarkerOffset
                        ? doingReverseReveal
                          ? myPageLayers.length - j
                          : j + 1
                        : 1,
                    ) +
                    tempFadeTime * 2 +
                    holdTime,
                );
              } else if (doingTransitionIn) {
                opacityExpr = "linear(_t_,0," + tempFadeTime + ",0,100)";
                lastResolveTime = Math.max(
                  lastResolveTime,
                  myPageControl
                    .property("Marker")
                    .keyTime(
                      doingMarkerOffset
                        ? doingReverseReveal
                          ? myPageLayers.length - j
                          : j + 1
                        : 1,
                    ) + tempFadeTime,
                );
              } else {
                opacityExpr =
                  "linear(_t_," +
                  holdTime +
                  "," +
                  tempFadeTime +
                  holdTime +
                  ",-100,0)";
                lastResolveTime = Math.max(
                  lastResolveTime,
                  myPageControl
                    .property("Marker")
                    .keyTime(
                      doingMarkerOffset
                        ? doingReverseReveal
                          ? myPageLayers.length - j
                          : j + 1
                        : 1,
                    ) +
                    tempFadeTime +
                    holdTime,
                );
              }
            }
            tempExpr = tempHeaderExpr + opacityExpr;
            myFadeSelector.property("ADBE Text Percent Offset").expression =
              G.exprHeader + obfuscateExpr(tempExpr, oTable);
          }
          if (doingTracking) {
            trackingEffectName = "Pseudo/DEOZ MWRDS Tracking";
            trackingHeaderExpr =
              'try{\r  _intensity_ = comp("' +
              myComp.name +
              '").layer("' +
              myCompLayer.name +
              '").effect("' +
              trackingEffectName +
              '")("' +
              trackingEffectName +
              '-0001");\r' +
              '  _amt_ = comp("' +
              myComp.name +
              '").layer("' +
              myCompLayer.name +
              '").effect("' +
              trackingEffectName +
              '")("' +
              trackingEffectName +
              '-0002");\r' +
              "}catch(e){\r" +
              "  _intensity = 300;\r" +
              "  _amt_ = 50;\r" +
              "}\r" +
              "_amt_ = linear(_amt_,0,100,1,10);\r";
            myTrackingAnimator = myPageLayer
              .property("ADBE Text Properties")
              .property("ADBE Text Animators")
              .addProperty("ADBE Text Animator");
            myTrackingAnimator.name = "Tracking";
            myTrackingSelector = myTrackingAnimator
              .property("ADBE Text Selectors")
              .addProperty("ADBE Text Selector");
            myTrackingAnimator
              .property("ADBE Text Animator Properties")
              .addProperty("ADBE Text Track Type");
            myTrackingAnimatorProp = myTrackingAnimator
              .property("ADBE Text Animator Properties")
              .addProperty("ADBE Text Tracking Amount");
            if (doingTransitionIn && doingTransitionOut) {
              easeFunctionExpr = getEaseFunctionExpr(interpolationInName, "");
              easeFunctionExpr2 = getEaseFunctionExpr(
                interpolationOutName,
                "2",
              );
              easeExpr =
                "if (_t_ < " +
                speedTime +
                "){\r" +
                "  _myEase_(_t_,0," +
                speedTime +
                ",_intensity_,0" +
                amtParm +
                ")\r" +
                "}else{\r" +
                "  _myEase2_(_t_," +
                speedTime +
                holdTime +
                "," +
                speedTime * 2 +
                holdTime +
                ",0,_intensity_" +
                amtParm +
                ")\r" +
                "}";
              tempExpr =
                easeFunctionExpr +
                easeFunctionExpr2 +
                auxExpr +
                tempHeaderExpr +
                trackingHeaderExpr +
                easeExpr;
            } else if (doingTransitionIn) {
              easeFunctionExpr = getEaseFunctionExpr(interpolationInName, "");
              easeExpr =
                "_myEase_(_t_,0," +
                speedTime +
                ",_intensity_,0" +
                amtParm +
                ")";
              tempExpr =
                easeFunctionExpr +
                auxExpr +
                tempHeaderExpr +
                trackingHeaderExpr +
                easeExpr;
            } else {
              easeFunctionExpr = getEaseFunctionExpr(interpolationOutName, "");
              easeExpr =
                "_myEase_(_t_," +
                holdTime +
                "," +
                holdTime +
                speedTime +
                ",0,_intensity_" +
                amtParm +
                ")";
              tempExpr =
                easeFunctionExpr +
                auxExpr +
                tempHeaderExpr +
                trackingHeaderExpr +
                easeExpr;
            }
            trackingExpr = G.exprHeader + obfuscateExpr(tempExpr, oTable);
            myTrackingAnimatorProp.expression = trackingExpr;
          }
        }
        myPageLayer.selected = false;
      }
      if (doingTransition) {
        myNewComp.duration = lastResolveTime + myNewComp.frameDuration;
      } else {
        myNewComp.duration = holdTime + myNewComp.frameDuration;
      }
      if (pageCount > 1) {
        if (curOverlap == "Off") {
          myCompLayer.startTime = 0;
        } else {
          myCompLayer.startTime =
            myComp.layer(myCompLayer.index + 1).outPoint -
            G.overlapFrames[getArrayIndex(G.overlapNames, curOverlap)] *
              myComp.frameDuration;
        }
      }
      myPageCompLayers.push(myCompLayer);
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
      app.project.autoFixExpressions(myComp.name, myTimeRemapComp.name);
      for (var i = 1; i <= myTimeRemapComp.numLayers; i += 1) {
        if (myTimeRemapComp.layer(i).canSetCollapseTransformation) {
          myTimeRemapComp.layer(i).collapseTransformation = true;
        }
        myTimeRemapCompPageLayers.push(myTimeRemapComp.layer(i));
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
    }
    myComp.openInViewer();
    app.endUndoGroup();
  }
  function buildPal(theObj) {
    function buildUI(theObj) {
      var myPal =
        theObj instanceof Panel
          ? theObj
          : new Window("palette", G.scriptName, undefined, {
              resizeable: true,
            });
      if (myPal != null) {
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
        var myResource =
          "group {\n\t\t\t\t\t\torientation: \'column\', alignment:\'left\', alignChildren:\'fill\', margins: 0, spacing: 5, \n\t\t\t\t\t\tlogoHelpGrp: Group {orientation: \'row\', spacing: 0, margins: [4,0,4,0], \n\t\t\t\t\t\t\tlogoGrp: Group {spacing: 0, margins: 0}, \n\t\t\t\t\t\t\tbtnGrp:Group {orientation: \'column\', alignment: [\'fill\',\'fill\'],spacing: 4, margins: [5,0,0,0], \n\t\t\t\t\t\t\t\thelpBtn: Button {preferredSize: [21,21], text: \'?\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\tkeyBtn: Button {preferredSize: [21,21], text: \'" +
          String.fromCharCode(9733) +
          "\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\ttextPnl: Panel {orientation: \'column\', alignChildren:[\'center\',\'fill\'], spacing: 0, margins: 0, \n\t\t\t\t\t\t\ttxt: EditText {preferredSize: [360,220], text: \'\', properties:{multiline:true}}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\ttopControlsGrp: Group {orientation: \'row\', alignment: [\'fill\',\'top\'], alignChildren:[\'left\',\'top\'], spacing: 8, margins: [0,0,0,0], \n\t\t\t\t\t\t\treverseRevealGrp: Group {orientation: \'row\', alignment: [\'left\',\'top\'], alignChildren:[\'left\',\'center\'], spacing: 4, margins: [0,0,-3,0], \n\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Reverse Reveal\', alignment: [\'left\',\'top\']}, \n\t\t\t\t\t\t\t\tCB: Checkbox {value:false, alignment: [\'left\',\'bottom\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\trandomizeAnchorGrp: Group {orientation: \'row\', alignment: [\'right\',\'top\'], alignChildren:[\'right\',\'center\'], spacing: 4, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Randomize Anchor\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\tCB: Checkbox {value:false, alignment: [\'right\',\'bottom\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\tallCapsGrp: Group {orientation: \'row\', alignment: [\'right\',\'top\'], alignChildren:[\'right\',\'center\'], spacing: 4, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\tlabel: StaticText {text: \'All Caps\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\tCB: Checkbox {value:true, alignment: [\'right\',\'bottom\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\tcontrolsGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'fill\'], spacing: 0, margins: 0, \n\t\t\t\t\t\t\tleftControlsGrp: Group {orientation: \'column\', alignment: [\'left\',\'fill\'], alignChildren:[\'fill\',\'top\'], spacing: 4, margins: 0, \n\t\t\t\t\t\t\t\tbuttonsGrp: Group {orientation: \'column\', alignChildren: [\'fill\',\'fill\'], spacing: [0,0,0,0], margins: [2,5,5,5], \n\t\t\t\t\t\t\t\t\tbuildGrp: Group {orientation: \'row\', alignment: [\'fill\',\'top\'], alignChildren: [\'right\',\'fill\'], spacing: 12, margins: [0,0,0,5], \n\t\t\t\t\t\t\t\t\t\tdoItBtn: Button {preferredSize: [70,-1], text: \'Do It!\', alignment: [\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tloadSaveGrp: Group {orientation: \'row\', alignment: [\'fill\',\'top\'], alignChildren: [\'left\',\'fill\'], spacing: 12, margins: [0,5,0,0], \n\t\t\t\t\t\t\t\t\t\tsaveBtn: Button {preferredSize: [70,-1],text: \'Save\', alignment: [\'left\',\'center\']}, \n\t\t\t\t\t\t\t\t\t\tloadBtn: Button {preferredSize: [70,-1], text: \'Load\', alignment: [\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tlayoutPnl: Panel {orientation: \'column\', alignment: [\'fill\',\'fill\'], alignChildren:[\'right\',\'top\'], text: \'LAYOUT\', spacing: 2, margins: [0,5,0,5], \n\t\t\t\t\t\t\t\t\tfontSizeGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Font Size\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tminMaxGrp: Group {orientation: \'row\', alignChildren:[\'Left\',\'center\'], spacing: 3, margins: [2,0,2,2], \n\t\t\t\t\t\t\t\t\t\tminGrp: Group {preferredSize: [50,-1], orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,0,6,2], \n\t\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Min\', alignment:[\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\t\t\ttxt: EditText {alignment:\'right\',characters: 4, text: \'40\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tmaxGrp: Group {preferredSize: [50,-1], orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,0,0,2], \n\t\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Max\', alignment:[\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\t\t\ttxt: EditText {alignment:\'right\',characters: 4, text: \'80\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tkeywordSizeGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Keyword Size\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {alignment:\'right\',characters: 4, text: \'160\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacingGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Spacing\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {alignment:\'right\',characters: 4, text: \'20\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tkeywordColorGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 5,\n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Keyword Color\'}, \n\t\t\t\t\t\t\t\t\t\tBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, \n\t\t\t\t\t\t\t\t\t\tcbGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,6,0,0], \n\t\t\t\t\t\t\t\t\t\t\tCB: Checkbox {text: \'\', value:true}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tswitchesPnl: Panel {orientation: \'column\', alignment: [\'fill\',\'bottom\'], alignChildren:[\'right\',\'top\'], text: \'\', spacing: 2, margins: [0,5,0,5], \n\t\t\t\t\t\t\t\t\tretimePagesGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 5,\n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Retime Pages\'}, \n\t\t\t\t\t\t\t\t\t\tcbGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,6,0,0], \n\t\t\t\t\t\t\t\t\t\t\tCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmarkerSyncGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 5,\n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Marker Sync\'}, \n\t\t\t\t\t\t\t\t\t\tcbGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,6,0,0], \n\t\t\t\t\t\t\t\t\t\t\tCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmotionBlurGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 5,\n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Motion Blur\'}, \n\t\t\t\t\t\t\t\t\t\tcbGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,6,0,0], \n\t\t\t\t\t\t\t\t\t\t\tCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\trightControlsGrp: Group {orientation: \'column\', alignment:[\'fill\',\'fill\'] , alignChildren:[\'fill\',\'top\'], spacing: 4, margins: 0, \n\t\t\t\t\t\t\t\tanimationPnl: Panel {orientation: \'column\', alignment:[\'fill\',\'fill\'], alignChildren:[\'right\',\'top\'], text: \'TEXT ANIMATORS\', spacing: 2, margins: [3     ,8,0,5], \n\t\t\t\t\t\t\t\t\ttransitionGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Transition\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tholdGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Hold\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {alignment:\'right\',characters: 4, text: \'90\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspeedGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Speed\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tinterpolationGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Interpolation\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacer1Grp: Group {orientation: \'column\', margins: [0,3,0,3], alignment: [\'fill\',\'center\'], \n\t\t\t\t\t\t\t\t\t\tspacerPnl: Panel {preferredSize: [200,0], margins: 0}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tstyleGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Primary Style\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tkeywordStyleGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Keyword Style\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tdriftGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Drift\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tcutFadeGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Cut/Fade\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\ttrackingGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 5,\n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Text Tracking\'}, \n\t\t\t\t\t\t\t\t\t\tcbGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'center\'], spacing: 4, margins: [2,6,0,0], \n\t\t\t\t\t\t\t\t\t\t\tCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\ttextOffsetGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Text Offset\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\toverlapGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [2,4,2,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Page Overlap\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {preferredSize: [117,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t}";
        myPal.grp = myPal.add(myResource);
        var myBinary = [__BLOB__BLOB_000387__];
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
        myPal.grp.textPnl.txt.text = G.defaultPanelText;
        myPal.grp.logoHelpGrp.btnGrp.helpBtn.onClick = click_help;
        myPal.grp.logoHelpGrp.btnGrp.keyBtn.onClick = click_keyInfo;
        myPal.grp.controlsGrp.leftControlsGrp.buttonsGrp.loadSaveGrp.saveBtn.onClick =
          click_save;
        myPal.grp.controlsGrp.leftControlsGrp.buttonsGrp.loadSaveGrp.loadBtn.onClick =
          click_load;
        myPal.grp.controlsGrp.leftControlsGrp.buttonsGrp.buildGrp.doItBtn.onClick =
          click_doIt;
        populateDDL(
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.DDL,
          G.fontSizeNames,
          G.def_fontSizeName,
        );
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.DDL.onChange =
          change_fontSize;
        initColorBtn(
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.Btn,
          G.def_keywordColor,
        );
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.Btn.onClick =
          click_keywordColor;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.keywordColorGrp.cbGrp.CB.onClick =
          click_keywordColorCB;
        myPal.grp.controlsGrp.leftControlsGrp.switchesPnl.retimePagesGrp.cbGrp.CB.onClick =
          click_retimePages;
        myPal.grp.controlsGrp.leftControlsGrp.switchesPnl.markerSyncGrp.enabled = false;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionGrp.DDL,
          G.transitionNames,
          G.def_transitionName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionGrp.DDL.onChange =
          change_transition;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.DDL,
          G.styleNames,
          G.def_styleName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.styleGrp.DDL.onChange =
          change_style;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp
            .DDL,
          G.keywordStyleNames,
          G.def_keywordStyleName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.keywordStyleGrp.DDL.onChange =
          change_keywordStyle;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp
            .DDL,
          G.interpolationNames,
          G.def_interpolationName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.interpolationGrp.DDL.onChange =
          change_interpolation;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.speedGrp.DDL,
          G.speedNames,
          G.def_speedName,
        );
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.DDL,
          G.textOffsetNames,
          G.def_textOffsetName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.textOffsetGrp.DDL.onChange =
          change_textOffset;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.DDL,
          G.overlapNames,
          G.def_overlapName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.overlapGrp.DDL.onChange =
          change_overlap;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.driftGrp.DDL,
          G.driftNames,
          G.def_driftName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.driftGrp.DDL.onChange =
          change_drift;
        populateDDL(
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.DDL,
          G.cutFadeNames,
          G.def_cutFadeName,
        );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.cutFadeGrp.DDL.onChange =
          change_cutFade;
      }
      return myPal;
    }
    G.uiPal = buildUI(theObj);
    if (G.uiPal != null) {
      if (G.uiPal instanceof Window) {
        G.uiPal.center();
        G.uiPal.show();
      } else {
        G.uiPal.layout.layout(true);
      }
    }
  }
  var G = new Object();
  G.obfuscate = true;
  G.scriptName = "MonkeyWords";
  G.scriptInitials = "MWRDS";
  G.version = "1.0";
  G.presetVersion = "1.0";
  G.trialLineLimit = 10;
  G.trialLengthDays = 5;
  G.uiPal = null;
  G.copyright = "\xa9 Copyright 2021 Dan Ebberts & Orrin Zucker\r";
  G.helpText1 =
    G.scriptName +
    "\u2122 " +
    G.version +
    "\n" +
    G.copyright +
    "All rights reserved\n" +
    "www.typemonkey.net\n" +
    "\n";
  G.helpText2 =
    G.scriptName +
    " is a procedural script for After Effects from Ebberts + Zucker that harnesses the power, speed and flexibility of AE\u2019s native text animators. It is designed to generate, layout, animate and sequence kinetic typography using an easy to learn, intuitive interface..\n\n";
  G.helpText3 =
    G.scriptName +
    " is the latest in a line of Monkey Scripts for motion designers and editors of all levels of experience. Visit https://aescripts.com/monkey-suite-bundle/ for more info.";
  var af_settings = {
    helpButtons: [
      {
        name: G.scriptName + " Tips",
        url: "https://aescripts.com/monkeywords/",
      },
      { name: "About Us", url: "https://www.typemonkey.net" },
    ],
    helpText: G.helpText1 + G.helpText2 + G.helpText3,
    privateNumber: 7438861533079291,
    productSKU: "EZMWD-SUL",
    scriptAuthor: "Ebberts + Zucker",
    scriptName: G.scriptName,
    scriptURL: "https://aescripts.com/monkeywords",
    scriptVersion: G.version,
    supportTicketSKU: "EZOZMWD-SUL",
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
        var t =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\tinfoGrp: Group { \t\t\t\t\talignment: [\'fill\',\'top\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\torientation: \'column\', \t\t\t\t\t\thdrGrp: Group {\t\t\t\t\t\t\ttxt: StaticText {}, \t\t\t\t\t\t\tpaste: StaticText {}, \t\t\t\t\t\t}\t\t\t\t\t\ttrial: StaticText {}, \t\t\t\t\t} \t\t\t\t\tlicGrp: Group { \t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \t\t\t\t\t} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'],                             buyGrp: Group {                             alignment: [\'left\',\'fill\'],                             alignChildren: [\'left\',\'fill\'],                             orientation: \'column\',                             spacing:1,                                  retrieveReg: Button {text:\'" +
          strRetrieveLic.replace(/%t/, strLicense) +
          "\', name:\'retrieve\',preferredSize:[130,25]}                                   buyLic: Button {text:\'" +
          strBuyLic.replace(/%t/, strLicense) +
          "\', name:\'buy\',preferredSize:[130,25]}                                   }\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
        e.grp = e.add(t);
        var i = ScriptUI.newFont(
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
          (e.grp.infoGrp.hdrGrp.txt.graphics.font = i),
          (e.grp.infoGrp.hdrGrp.paste.text = ""),
          (e.grp.infoGrp.hdrGrp.paste.graphics.font = n),
          (e.grp.infoGrp.trial.text =
            betaMode || !offerTrial ? "" : strTrialInstructMsg),
          isServerConfigured(licenseValidity) &&
            (isServerRunning(licenseValidity)
              ? ((e.grp.infoGrp.hdrGrp.txt.text = strServerInstructMsg),
                (e.grp.infoGrp.trial.text = strTrialInstructMsg))
              : ((e.grp.infoGrp.hdrGrp.txt.text =
                  strEnterLicenseCode + " " + strServerNotRunning),
                (e.grp.infoGrp.trial.text =
                  betaMode || !offerTrial ? "" : strTrialInstructMsg))),
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
      var t = new Window("dialog", strRetrieveLic.replace(/%t/, e), void 0, {
        resizeable: true,
      });
      if (null != t) {
        var i =
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
        t.grp = t.add(i);
        t.grp.buttonsGrp.myDownloadsBtn.onClick = function () {
          openURL(retrieveUrl);
          t.close(false);
        };
        t.grp.buttonsGrp.downloadManagerBtn.onClick = function () {
          openURL(managerAppUrl);
          t.close(false);
        };
        t.layout.layout(true);
        t.layout.resize();
        t.onResizing = t.onResize = function () {
          this.layout.resize();
        };
        t.show();
      }
    }
    function checkBeta(e, t) {
      return new Date() < t || new Date() > e;
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
          var t =
              -1 != $.os.indexOf("Windows") &&
              12 <= parseFloat(app.version) &&
              parseFloat(app.version) < 14
                ? ["left", "top"]
                : ["fill", "fill"],
            i =
              "group { \t\torientation: \'column\', \t\talignment: [\'" +
              t[0] +
              "\',\'" +
              t[1] +
              "\'], \t\talignChildren: [\'fill\',\'fill\'],                    infoGrp: Group {                    alignment: [\'fill\',\'top\'],                    alignChildren: [\'fill\',\'top\'], \t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]},                       hdr: StaticText {properties:{multiline:true}},                       removeLic: Button {text:\'" +
              strDeactivate +
              "\', preferredSize:[40,30]} \t\t\t\t} \t\t\t\thelpGrp: Group {                    alignment: [\'" +
              t[0] +
              "\',\'" +
              t[1] +
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
            i +=
              "btn" + n + ": " + vars.helpButtons[n].hasOwnProperty("type") &&
              validateButtonType(vars.helpButtons[n].type)
                ? vars.helpButtons[n].type
                : "Button" +
                  " {id: \'" +
                  n +
                  "\', alignment: [\'left\',\'center\']}";
          }
        }
        i +=
          "\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t} \t\t}";
        e.grp = e.add(i);
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
            vars.helpButtons[n].hasOwnProperty("helpTip") &&
              (e.grp.okGrp["btn" + n].helpTip = vars.helpButtons[n].helpTip),
            vars.helpButtons[n].hasOwnProperty("url")
              ? (e.grp.okGrp["btn" + n].onClick = function () {
                  openURL(vars.helpButtons[this.id].url);
                })
              : (vars.helpButtons[n].hasOwnProperty("onClickFunction") &&
                  (e.grp.okGrp["btn" + n].onClick =
                    vars.helpButtons[n].onClickFunction),
                vars.helpButtons[n].hasOwnProperty("btnValue") &&
                  (e.grp.okGrp["btn" + n].value =
                    vars.helpButtons[n].btnValue)));
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
          ScriptUI.environment.keyboardState.shiftKey &&
          ScriptUI.environment.keyboardState.altKey
            ? alert(
                "aescripts + aeplugins\nFramework version: " +
                  licensingVersion +
                  "\n" +
                  strScriptName +
                  " - " +
                  strVersion +
                  " " +
                  strScriptVersion,
              )
            : (openSupportTicket({}), e.close());
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
      i = n = "";
      t = "&subject=";
      null != e &&
        void 0 !== e &&
        (e.hasOwnProperty("subject") && (t += File.encode(e.subject)),
        e.hasOwnProperty("message") && (i = File.encode(e.message)),
        e.hasOwnProperty("diagnostic") &&
          (n = File.encode(e.diagnostic + "\n--\n")));
      var r =
        true === isAescriptsSupportUrl
          ? "" == supportTicketSKU
            ? strSKU
            : supportTicketSKU + t + "&message="
          : t.replace(/\&/, "?") + "&body=";
      var a =
        "" != r
          ? i +
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
      var t = $.os.toString();
      var i =
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
      var r =
        "Last checked server version: " +
        haveSettings(prefsSectionName, prefsLastServerVersionChecked)
          ? getSettings(prefsSectionName, prefsLastServerVersionChecked)
          : "n/a";
      var a = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return e
        ? File.encode(n) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(i) +
            "%0D%0A" +
            File.encode(a) +
            "%0D%0A" +
            File.encode(r)
        : n + "\n" + t + "\n" + i + "\n" + a + "\n" + r;
    }
    function setUpdateCheck(e) {
      saveSettings(prefsSectionName, prefsDoUpdateCheck, (doUpdateCheck = e));
    }
    function doUpdateCheckNow() {
      checkForNewVersion((doUpdateCheck = true));
    }
    function newVersionUI(t) {
      var i = new Window("dialog", strNewVersionAvailableHdr, void 0, {
        resizeable: true,
      });
      if (null != i) {
        var e =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t   hdrGrp: Group { \t\t\t\t   alignment: [\'fill\',\'fill\'], \t\t\t\t   alignChildren: [\'fill\',\'fill\'], \t\t\t\t   orientation: \'column\',                         hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
        t.hasOwnProperty("header") &&
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
        i.grp = i.add(e);
        var n = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
        i.grp.hdrGrp.hdr.graphics.font = n;
        i.grp.hdrGrp.hdr.text =
          strNewVersionAvailable.replace(/%v/, t.version) +
          "\n" +
          strCurrentVersion.replace(/%v/, strScriptVersion);
        t.hasOwnProperty("header") &&
          (i.grp.hdrGrp.infoGrp.info.text = t.header + "\n\n" + t.detail);
        i.grp.okGrp.skipVersionBtn.onClick = function () {
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
            t.version,
          );
          saveSettings(
            prefsSectionName,
            prefsLastServerVersionChecked,
            t.version,
          );
          i.close(false);
        };
        i.grp.okGrp.remindMeLaterBtn.onClick = function () {
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
              t.version,
            );
            i.close(false);
          } catch (e) {
            alert(e.toString());
          }
        };
        i.grp.okGrp.downloadBtn.onClick = function () {
          retrieveLicenseUI(strDownload);
          i.close(true);
        };
        i.layout.layout(true);
        i.layout.resize();
        i.onResizing = i.onResize = function () {
          this.layout.resize();
        };
        t.hasOwnProperty("header") &&
          ((i.grp.hdrGrp.infoGrp.size.height = Math.min(
            i.grp.hdrGrp.infoGrp.size.height,
            300,
          )),
          i.layout.layout(true),
          i.layout.resize());
        i.show();
      }
    }
    function dateAddDays(e) {
      var t = new Date().getTime() + 86400000 * e;
      return new Date(t);
    }
    function checkForNewVersion(e) {
      if ((null == e && (e = false), doUpdateCheck)) {
        haveSettings(prefsSectionName, prefsLastVersionChecked) &&
          (i = getSettings(prefsSectionName, prefsLastVersionChecked));
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
          (t = getSettings(prefsSectionName, prefsVersionCheckInit));
        var o = new Date();
        if (e || null == t || null == a || !(o < a)) {
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
              0 < d && (null == i || null == r || null == a || e || a <= o)
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
    function versionCheck(e, t, i) {
      var n = extComms(
        "https://notify.aescripts.com/versioncheck2.php?json=1&plain=1&sku=" +
          e +
          t
          ? "&latest=1"
          : "" + parseFloat(app.version) < 12
            ? "&clip_length=200"
            : "&clip_length=300",
        null,
      );
      if (null == n || "" == n || !validateJSON(n)) {
        return (i && alert(strUpdateCheckError), null);
      }
      try {
        if (null == (n = JSONify(n.replace(/\\u2022/g, "-"), "parse"))) {
          return null;
        }
      } catch (e) {
        return null;
      }
      return "ok" != n.status
        ? null
        : t
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
          var t = system.callSystem('curl -s 2 "' + e + '"');
        } else {
          var i =
            ((n = new File(
              Folder.userData.fullName + "/Aescripts/aescripts_helper.vbs",
            )).open("w"),
            n.write(
              'dim o: Set o = createobject("MSXML2.XMLHTTP.6.0")\no.Open "GET", WScript.Arguments(0), False\no.Send\nIf o.Status >= 200 And o.Status <= 202 Then\nWScript.Echo o.responseText\nElse\nWScript.Echo "Error"\nEnd If',
            ),
            n.close(),
            n.exists ? n : null);
          if (null == i) {
            return null;
          }
          t = system.callSystem(
            'cscript //nologo "' + i.fsName + '" "' + e + '"',
          );
          validateJSON(t) ||
            (t = system.callSystem(
              'cscript //nologo "' + i.relativeURI + '" "' + e + '"',
            ));
        }
        return t;
      } catch (e) {
        return (alert("extComms error\n" + e.toString()), null);
      }
    }
    function socketConnect(e, t) {
      var i = new Socket();
      if (
        ((i.encoding = "binary"), (i.timeout = 2), i.open(e + ":80", "UTF-8"))
      ) {
        i.write(
          "GET /" + t + " HTTP/1.1\nHost: " + e + "\n\nConnection: close\n\n",
        );
        var n = i.read(2000);
        return (i.close(), null != n ? (n = n.toString()) : null);
      }
      return null;
    }
    function formatHistory(e, t) {
      var i = e.data;
      var n = [];
      for (var r in i) {
        if (i.hasOwnProperty(r)) {
          for (var a = i[r].history, s = a.length - 1; 0 <= s; s--) {
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
              compareVersions(t, o.version_number) < 0) &&
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
          ? Folder.userData.fullName
          : -1 != $.os.indexOf("Mac")
            ? Folder.temp.fullName
            : Folder.appData.fullName;
      -1 != $.os.indexOf("Windows") &&
        ScriptUI.environment.keyboardState.shiftKey &&
        ScriptUI.environment.keyboardState.altKey &&
        ScriptUI.environment.keyboardState.ctrlKey &&
        (t = Folder.temp.fullName);
      var n =
        t + "/" + Math.round(Math.random() * 42132 * new Date().getTime());
      if (-1 != $.os.indexOf("Win")) {
        i = wx;
        n += ".exe";
      } else {
        if (systemCall("arch").toLowerCase().match(/ppc/)) {
          return (alert(strPpcNotSupported), false);
        }
        i = mx;
      }
      var r = createFile(File(n), i, "BINARY");
      if (!r.exists) {
        return ((licenseData = { result: -108 }), licenseData);
      }
      r.hidden = true;
      -1 != $.os.indexOf("Mac") && systemCall('chmod +x "' + r.fsName + '"');
      var a = systemCall(
        '"' + r.fsName + '" "' + strHeader + '" ' + privateNum + ' "' + e + '"',
      );
      return (r.remove(), parseResult(a));
    }
    function parseResult(t) {
      try {
        i = parseVerifCode(t.toString());
      } catch (e) {
        (i = { result: -101 }).e =
          e.toString() + "\nresult:\n\n" + t.toString();
      }
      return i;
    }
    function parseVerifCode(e) {
      for (var t = e.match(/[^\r\n]+/g), i = {}, n = 0; n < t.length; n++) {
        var r = t[n].split(":");
        if (2 <= r.length) {
          var a = r[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          var s = trimQuotes(r[1]);
          "LS" == a && "UP" == s && (a = "LSS");
          isNaN(s) || (s = parseFloat(s));
          i[a] = s;
        }
      }
      return (
        void 0 === i.result && ((i.result = -102), (i.e = e)),
        checkTrialDetails(i),
        checkBetaDetails(i),
        (isTimeLimited = checkTimeLimited(i)),
        i
      );
    }
    function checkTimeLimited(e) {
      var t = retProp("rt$", e);
      var i = retProp("nd$", e);
      return (validateTimeLimited(e, t, i), "" != t && "" != i);
    }
    function validateTimeLimited(e, t, i) {
      switch (e.result) {
        case -20:
          e.e = parseDateString(t);
          break;
        case -21:
          e.e = parseDateString(i);
      }
    }
    function checkFloatingLicense(e) {
      retProp("pe$", e) != bD("RkxU") ||
        isServerRunning(e) ||
        (e.result = -109);
    }
    function checkTrialDetails(e) {
      if (-7 !== e.result) {
      } else if (0 == tLD) {
        e.result = -106;
      } else {
        var t = retProp("^d", e);
        if (void 0 === t) {
          return void (e.result = -103);
        }
        var i = tLD - t;
        0 < i
          ? ((e.result = 100), (e.tdl = i), (e.license = bD("VFJJQUw=")))
          : ((e.result = -100), (e.tdl = 0));
      }
    }
    function checkBetaDetails(e) {
      var t = e.result;
      var i = retProp("pe$", e).match(/^B/);
      betaMode && (isResultTrial(t) || -106 == t || -7 == t)
        ? (e.result = -107)
        : !betaMode && i && (e.result = -105);
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
      for (var t = 0, i = 0; i < e.length; i++) {
        t += e.charCodeAt(i);
      }
      return t;
    }
    function getVerifCode3(e) {
      var t = e.split("*");
      if (4 == t.length) {
        var i = t[3].replace(/^[0-9]+/, "");
        var n = t[3].match(/^[0-9]+/, "");
        var r = n[0].substr(0, 2);
        var a = n[0].substr(n[0].length - 2);
        var s = r[0] + t[0] + r[1] + t[1] + a[0] + t[2] + a[1] + i;
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
      var t = e.split("**");
      return (
        !(
          !e
            .replace(/^ +|| +$/g, "")
            .match(/^.+\*\*.+\*\*[0-9]+[A-Za-z]{3}$/) || 3 != t.length
        ) || (alert(strOldLicenseFormat), false)
      );
    }
    function check_v2_License(e) {
      var t = e.split("*");
      return (
        e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/) &&
        4 == t.length
      );
    }
    function check_timed_License(e) {
      var t = e.split("*");
      return (
        e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[A-Z0-9#]+[A-Za-z]{3}[0-9]+$/) &&
        4 == t.length
      );
    }
    function checkCode(e, t, i) {
      if (
        ((t = null == t ? "" : t.replace(/^\s\s*/, "").replace(/\s\s*$/, "")),
        (myLcns = false),
        e && ((regUI = licUI()), !(myRegPrompt = regUI.show())))
      ) {
        return false;
      }
      var n = false;
      "@remote" == (t = null == license ? t : license).toLowerCase() &&
        ((t = strHeader + t), (n = true));
      var r = t.split("*");
      var a = t.match(/#/);
      var s = a && check_timed_License(t);
      var o = check_v2_License(t);
      if (!((offerTrial && "trial" == t.toLowerCase()) || n || o || s)) {
        if (t.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
          var l = confirm(strTempCode);
          return (
            isSecurityPrefSet() && l && openURL(exchangeUrl + "?serial=" + t),
            myLcns
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
          myLcns
        );
      }
      if (("trial" != t.toLowerCase() || n) && !n) {
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
          myLcns = true;
        }
      }
      if (
        !isResultValidLicense(
          (licenseValidity = 2 == licV ? getVerifCode(t) : getVerifCode3(t)),
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
            confirm(strReset + "?") &&
            getVerifCode("-"),
          checkCode(e),
          myLcns
        );
      }
      if (
        ((isValidTrial =
          !a &&
          offerTrial &&
          "trial" == t.toLowerCase() &&
          isResultTrial(licenseValidity.result)),
        e && !isValidTrial)
      ) {
        var d = parseInt(retProp("^n", licenseValidity), 10);
        var p =
          strRegSuccess.replace("%u", d) + (1 < d) && "de" != locale
            ? "s"
            : "" + betaMode
              ? ""
              : "\n" + strRegSuccess1;
        if (a) {
          var u = parseDateString(retProp("nd$", licenseValidity));
          p += "\n\n" + strLicenseEnds + u;
        }
        t.match(/@remote/i) || alert(p);
      }
      return (myLcns = true);
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
        t =
          (c.indexOf(e.charAt(l++)) << 2) |
          ((r = c.indexOf(e.charAt(l++))) >> 4);
        i = ((15 & r) << 4) | ((a = c.indexOf(e.charAt(l++))) >> 2);
        n = ((3 & a) << 6) | (s = c.indexOf(e.charAt(l++)));
        o += String.fromCharCode(t);
        64 != a && (o += String.fromCharCode(i));
        64 != s && (o += String.fromCharCode(n));
      }
      return o;
    }
    function bE(e) {
      for (
        t,
          i,
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
        r = (t = e.charCodeAt(c++)) >> 2;
        a = ((3 & t) << 4) | ((i = e.charCodeAt(c++)) >> 4);
        s = ((15 & i) << 2) | ((n = e.charCodeAt(c++)) >> 6);
        o = 63 & n;
        isNaN(i) ? (s = o = 64) : isNaN(n) && (o = 64);
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
        -1 != $.os.indexOf("Windows")
          ? systemCall('cmd /c "start ' + (e = e.replace(/&/g, "^&")) + '"')
          : systemCall('open "' + e + '"');
      } else {
        createFile(
          File(Folder.temp.fullName + "/openUrl.url"),
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
          t = " - " + strLicense + " " + d;
          break;
        case bD("QlRB"):
          t = " - " + strBTA + " " + d;
          break;
        case bD("RURV"):
          t = " - " + strEDU + " " + d;
          break;
        case bD("RkxU"):
          t = " - " + strFLT + " " + d;
          break;
        default:
          c = retProp("^t", licenseValidity);
          isTimeLimited ||
            (t = c < 1 ? strTrialExpired : strTrialTxt.replace(/%E/, c));
      }
      return (
        (i = "" != n ? strRegistration + n + t : t),
        isTimeLimited && (i += "\n" + strLicenseEnds + f),
        i
      );
    }
    function parseDateString(e) {
      var t = e.toString().split("-");
      return new Date(
        parseInt(t[0]),
        parseInt(t[1] - 1),
        parseInt(t[2]),
      ).toDateString();
    }
    function retProp(e, t) {
      for (var i in t) {
        if (t.hasOwnProperty(i) && i.toString().match(new RegExp(e))) {
          return t[i];
        }
      }
      return "";
    }
    function isAE() {
      return BridgeTalk.appName.match(new RegExp(bD("YWZ0ZXJlZmZlY3Rz")));
    }
    function isPS() {
      return BridgeTalk.appName.match(new RegExp(bD("cGhvdG9zaG9w")));
    }
    function readFile(e) {
      if (null != e && null != e && e.exists && e.open("r")) {
        var t = e.read();
        return (e.close(), t);
      }
      return null;
    }
    function createFile(e, t, i, n, r) {
      return (
        ((null == e || null == e || e.exists) && !n) ||
          (e.exists && e.remove(),
          ((e =
            -1 != $.os.indexOf("Win")
              ? new File(e.fullName)
              : new File(e.absoluteURI)).encoding = i),
          e.open("w"),
          e.write(t),
          e.close(),
          (null != r && r) || (e.hidden = true),
          -1 != $.os.indexOf("Mac") &&
            systemCall(bD("Y2htb2QgK3gg") + e.absoluteURI)),
        e
      );
    }
    function systemCall(e) {
      if (isAE()) {
        return system.callSystem(e);
      }
      if (isPS()) {
        var t =
          -1 != $.os.indexOf("Win")
            ? Folder.temp.fsName
            : Folder.temp.absoluteURI +
              "/" +
              Math.round(Math.random() * 71827 * new Date().getTime());
        return (app.system(e + " > " + t), readFile(File(t)));
      }
      return "";
    }
    function parseSettings(e, t) {
      for (var i in t) {
        if (t.hasOwnProperty(i)) {
          if ("object" == typeof t[i]) {
            return parseSettings(e, t[i]);
          }
          if (i === e) {
            return t[i];
          }
        }
      }
    }
    function readJSON(e) {
      if (null == e || null == e) {
        return false;
      }
      e instanceof File || File(e);
      var t = readFile(e);
      return JSONify(t, "parse");
    }
    function writeJSON(e, t) {
      if (null == e || null == e || null == t || null == t) {
        return false;
      }
      t instanceof File || File(t);
      return (
        createFile(t, JSONify(e, "stringify", "\t"), "UTF-8", true, true),
        t.exists
      );
    }
    function getSettings(e, t, i) {
      if (isAE() && "settings" != i) {
        return app.settings.getSetting(e, t);
      }
      var n = File(prefsLocation + prefsPrefix + File.encode(e));
      var r = readFile(n);
      var a = JSONify(r, "parse");
      if (a instanceof Array) {
        for (var s in ((a = fixSettingsFile(a)), n.remove(), a)) {
          saveSettings(e, s, a[s]);
        }
      }
      return a[t];
    }
    function haveSettings(e, t, i) {
      if (isAE() && "settings" != i) {
        return app.settings.haveSetting(e, t);
      }
      var n = readFile(File(prefsLocation + prefsPrefix + File.encode(e)));
      if (null != n) {
        var r = JSONify(n.toString(), "parse");
        return (r instanceof Array && (r = fixSettingsFile(r)), t in r);
      }
      return false;
    }
    function fixSettingsFile(e) {
      for (var t = {}, i = 0; i < e.length - 1; i++) {
        t[e[i]] = e[i + 1];
        i++;
      }
      return t;
    }
    function saveSettings(e, t, i, n) {
      if (isAE() && "settings" != n) {
        app.settings.saveSetting(e, t, i);
        app.preferences.saveToDisk();
      } else {
        var r = {};
        var a = File(prefsLocation + prefsPrefix + File.encode(e));
        if (a.exists) {
          var s = readFile(a);
          null != s && (r = JSONify(s.toString(), "parse"));
        }
        r instanceof Array && (r = fixSettingsFile(r));
        r[t] = i;
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
        (theLcs = false),
        alert(strScriptName + ": " + strLicenseRemoved),
        isServerConfigured(licenseValidity) ||
          (saveSettings(prefsSectionName, prefsName, bE("bad")),
          saveSettings(prefsSectionName, prefsVersionName, strScriptVersion),
          saveSettings(prefsSectionName, prefsLicVersion, licensingVersion)),
        !theLcs
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
            var t = false;
            if (
              ("l" == e && doUpdateCheck && checkForNewVersion(), 2 == licV)
            ) {
              if ("r" == e) {
                theLcs = !removeLic();
              } else {
                if ("-22" == (licenseValidity = getVerifCode("")).result) {
                  var i =
                    "e" in licenseValidity ? "\n" + licenseValidity.e : "";
                  alert(
                    licErrors[locale][checkErrorCode(licenseValidity.result)]
                      .title +
                      "\n" +
                      licErrors[locale][checkErrorCode(licenseValidity.result)]
                        .detail +
                      i,
                  );
                  getVerifCode("-");
                  t = true;
                  myReg =
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
                "" == (myReg = checkForLegacyLic()) &&
                  ((t = true),
                  (myReg =
                    isServerConfigured(licenseValidity) &&
                    isServerRunning(licenseValidity)
                      ? "@REMOTE"
                      : "trial"));
                theLcs = checkCode(t, myReg, privateNum);
              }
            } else {
              haveSettings(prefsSectionName, prefsName)
                ? ((myReg = getSettings(prefsSectionName, prefsName)),
                  (t = !(
                    "c" == e ||
                    !(
                      ("bad" == myReg || "bad" == bD(myReg) || offerTrial) &&
                      "trial" == bD(myReg)
                    )
                  )))
                : "c" == e
                  ? (saveSettings(
                      prefsSectionName,
                      prefsName,
                      bE((myReg = !isTimeLimited && offerTrial ? "trial" : "")),
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
                    (t = false))
                  : (t = true);
              theLcs = checkCode(t, myReg, privateNum);
            }
            return theLcs;
          }
        }
      }
    }
    var licensingVersion = "3.0.49";
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
    var supportTicketSKU = vars.hasOwnProperty("supportTicketSKU")
      ? vars.supportTicketSKU
      : "";
    null == vars.helpText && (vars.helpText = "");
    null == vars.helpButtons && (vars.helpButtons = []);
    var isTimeLimited =
      vars.hasOwnProperty("isTimeLimited") && vars.isTimeLimited;
    var strHeader = strSKUArray[0];
    var betaSupportEmail = vars.hasOwnProperty("betaSupportEmail")
      ? vars.betaSupportEmail
      : "";
    var offerTrial = !vars.hasOwnProperty("offerTrial") || vars.offerTrial;
    var tLD = vars.hasOwnProperty("tLDXX")
      ? vars.tLDX
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
        : "https://aescripts.com/contact";
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
    var doUpdateCheck =
      !vars.hasOwnProperty("doUpdateCheck") || vars.doUpdateCheck;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    var mx = __BLOB__BLOB_000388__;
    var wx = __BLOB__BLOB_000389__;
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
        "Eine neuere Version von " + strScriptName + " ist verf\xfcgbar: %v\n",
      en: "A newer version of " + strScriptName + " is available: %v\n",
      es:
        "Una versi\xf3n nueva de " +
        strScriptName +
        " est\xe1 disponible: %v\n",
      fr: "Une version plus de " + strScriptName + " est disponible: %v\n",
    });
    var strCurrentVersion = localize({
      de: "Votre version install\xe9e est: %v",
      en: "Your installed version is: %v",
      es: "Su versi\xf3n instalada es: %v",
      fr: "Votre version install\xe9e est: %v",
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
    var strReset = localize({
      de: "Lizenz zur\xfccksetzen",
      en: "Reset License",
      es: "Restablecer licencia",
      fr: "R\xe9initialiser la licence",
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
    var strLicenseEnds = localize({
      de: "Lizenzlaufzeit endet: ",
      en: "License expires: ",
      es: "Licencia expira: ",
      fr: "Licence expir\xe9e: ",
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
          detail: "Lizenzlaufzeit beginnt am ",
          title: "Lizenzlaufzeit hat noch nicht begonnen (-20)",
        },
        "-21": {
          detail: "Lizenzlaufzeit endete am ",
          title: "Lizenzlaufzeit ist abgelaufen (-21)",
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
    var prefsDoUpdateCheckDisabledAlert =
      strHeader + "_doUpdateCheckDisabledAlert";
    var doUpdateCheckDisabledAlertAlreadyIssued = false;
    haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
      (doUpdateCheckDisabledAlertAlreadyIssued = !(
        "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
      ));
    ScriptUI.environment.keyboardState.shiftKey &&
      ScriptUI.environment.keyboardState.altKey &&
      !ScriptUI.environment.keyboardState.ctrlKey &&
      !ScriptUI.environment.keyboardState.metaKey &&
      ((doUpdateCheck = false),
      saveSettings(prefsSectionName, prefsDoUpdateCheck, false),
      doUpdateCheckDisabledAlertAlreadyIssued ||
        (alert("New version update checks disabled"),
        (doUpdateCheckDisabledAlertAlreadyIssued = true),
        saveSettings(prefsSectionName, prefsDoUpdateCheckDisabledAlert, true)));
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
    var prefsLocation = Folder.userData.fullName + "/Aescripts/";
    var prefsPrefix = "pref_";
    isAE() || Folder(prefsLocation).exists || Folder(prefsLocation).create();
    var sanitizedName = sanitizeProductName(strScriptName);
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
    this.getSetting = function (e, t) {
      return getSettings((e = strHeader + "_" + e), t, "settings");
    };
    this.readJSON = function (e) {
      return readJSON(e);
    };
    this.writeJSON = function (e, t) {
      return writeJSON(e, t);
    };
    this.JSONify = function (e, t, i) {
      return JSONify(e, t, i);
    };
    this.haveSetting = function (e, t) {
      return haveSettings((e = strHeader + "_" + e), t, "settings");
    };
    this.saveSetting = function (e, t, i) {
      return saveSettings((e = strHeader + "_" + e), t, i, "settings");
    };
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
  var Ez11 = new a(af_settings);
  G.MWRDS_folderName = G.scriptName;
  G.defaultPanelText =
    "Welcome to\n^" +
    G.scriptName +
    "!\n\nEnter text\n[here] and\nclick\n^Do It!";
  G.exprHeader = "// " + G.scriptName + "\r" + "// " + G.copyright + "\r";
  if ($.os.indexOf("Windows") != -1) {
    G.keyTip =
      "\tText Box Keyboard Commands:\r\t--------------------------------------\r[\tbegin Key Color only\r]\tend Key Color only\r^\tuse Key Color and Size\r|\tadd blank line\rSkip Line: Creates new page";
  } else {
    G.keyTip =
      "\tText Box Keyboard Commands:\r\t--------------------------------------\r[\tbegin Key Color only\r]\tend Key Color only\r^\tuse Key Color and Sze\r|\tadd blank line\rSkip Line:  Creates new page";
  }
  G.projectFolderID = G.scriptInitials + "_PageFolder";
  G.projectFolderName = G.scriptName + " Pages";
  G.compID = G.scriptInitials + "_Page";
  G.compName = G.scriptInitials + " Page";
  G.pageControlPrefix = G.scriptInitials + " Page_";
  G.pageControlSuffix = " Master Control";
  G.pageControlID = G.scriptName + "_PageMasterControl";
  G.pageLayerID = G.scriptName + "_PageLayer";
  G.retimeLayerID = G.scriptName + "_RetimeLayer";
  G.retimeCompID = G.scriptInitials + "_Retime";
  G.retimeCompName = G.scriptInitials + " Retime";
  G.textLayerID = G.scriptInitials + "_Text";
  G.keywordID = G.scriptInitials + "_Keyword";
  G.blankID = G.scriptInitials + "_Blank";
  G.controlLayerColor = 9;
  G.textLayerColor = 3;
  G.pageLayerColor = 7;
  G.timeRemapLayerColor = 9;
  G.black = [0, 0, 0, 1];
  G.disableWarning = false;
  G.fontSizeNames = ["Random", "Constant", "Justified"];
  G.def_fontSizeName = "Random";
  G.keywordStyleNames = [
    "Slide Left",
    "Slide Right",
    "Slide Up",
    "Slide Down",
    "Slide Back",
    "Slide Forth",
    "-",
    "Horizontal",
    "Vertical",
    "Back & Forth",
    "Random Slide",
    "-",
    "Scale Up",
    "Scale Down",
    "Squeeze",
    "Stretch",
    "-",
    "Scale Up & Down",
    "Stretch & Squeeze",
    "Random Scale",
    "-",
    "X Rotate",
    "Y Rotate",
    "Z Rotate",
    "X & Y Rotate",
    "-",
    "Auto",
    "Random",
    "Opposite",
    "Off",
  ];
  G.def_keywordStyleName = "Random";
  G.transitionNames = ["In", "Out", "In & Out", "Off"];
  G.def_transitionName = "In & Out";
  G.styleNames = [
    "Slide Left",
    "Slide Right",
    "Slide Up",
    "Slide Down",
    "Slide Back",
    "Slide Forth",
    "-",
    "Horizontal",
    "Vertical",
    "Back & Forth",
    "Random Slide",
    "-",
    "Scale Up",
    "Scale Down",
    "Squeeze",
    "Stretch",
    "-",
    "Scale Up & Down",
    "Stretch & Squeeze",
    "Random Scale",
    "-",
    "X Rotate",
    "Y Rotate",
    "Z Rotate",
    "X & Y Rotate",
    "-",
    "Random",
    "Off",
  ];
  G.random_styleNames = [
    "Slide Left",
    "Slide Left",
    "Slide Right",
    "Slide Right",
    "Slide Up",
    "Slide Down",
    "Slide Back",
    "Slide Forth",
    "Scale Up",
    "Scale Up",
    "Scale Down",
    "Scale Down",
    "X Rotate",
    "Y Rotate",
  ];
  G.random_inertiaStyleNames = [
    "Slide Left",
    "Slide Right",
    "Slide Up",
    "Slide Down",
    "Slide Back",
    "Slide Forth",
    "X Rotate",
    "Y Rotate",
  ];
  G.random_slideStyleNames = [
    "Slide Left",
    "Slide Right",
    "Slide Up",
    "Slide Down",
    "Slide Back",
    "Slide Forth",
  ];
  G.random_scaleStyleNames = ["Scale Up", "Scale Down", "Squeeze", "Stretch"];
  G.random_rotateStyleNames = ["X Rotate", "Y Rotate"];
  G.def_styleName = "Random";
  G.interpolationNames = [
    "Ease",
    "Ease Invert",
    "Linear",
    "Random",
    "-",
    "Inertia",
  ];
  G.random_interpolationNames = ["Ease", "Ease Invert", "Linear"];
  G.def_interpolationName = "Ease";
  G.speedNames = ["Very Fast", "Fast", "Medium", "Slow", "Very Slow"];
  G.speedFrames = [10, 15, 20, 40, 60];
  G.fadeFrames = [10, 10, 15, 20, 20];
  G.def_speedName = ["Medium"];
  G.maxFadeFrames = G.fadeFrames[getArrayIndex(G.speedNames, "Slow")];
  G.speedToOffsetNames = ["Very Short", "Short", "Medium", "Long", "Very Long"];
  G.speedToOverlapNames = [
    "Very Short",
    "Very Short",
    "Short",
    "Medium",
    "Long",
  ];
  G.textOffsetNames = [
    "Off",
    "Very Short",
    "Short",
    "Medium",
    "Long",
    "Very Long",
    "Extreme",
    "-",
    "Auto",
  ];
  G.textOffsetFrames = [0, 3, 5, 8, 15, 30, 45, 0, 0];
  G.def_textOffsetName = "Auto";
  G.overlapNames = [
    "None",
    "Very Short",
    "Short",
    "Medium",
    "Long",
    "Very Long",
    "Extreme",
    "-",
    "Auto",
    "Off",
  ];
  G.overlapFrames = [0, 5, 10, 15, 20, 30, 60, 0, 0, 0];
  G.def_overlapName = "Auto";
  G.driftNames = [
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
    "Auto",
    "Random / Layer",
    "Random",
    "Off",
  ];
  G.def_driftName = "Auto";
  G.random_driftNames = [
    "Left",
    "Right",
    "Up",
    "Down",
    "Back",
    "Forth",
    "Random / Layer",
  ];
  G.randomPerLayer_driftNames = ["Left", "Right", "Back", "Forth"];
  G.cutFadeNames = [
    "Fade Line",
    "Fade Word",
    "Fade Letter",
    "Fade Letter / Mix",
    "-",
    "Cut Line",
    "Cut Word",
    "Cut Letter",
    "Cut Letter / Mix",
    "-",
    "Random Fade",
    "Random Cut",
    "Random Mix",
    "-",
    "Off",
  ];
  G.random_cutNames = ["Cut Line", "Cut Word", "Cut Letter"];
  G.random_fadeNames = ["Fade Line", "Fade Word", "Fade Letter"];
  G.randomMix_cutFadeNames = ["Cut Letter", "Fade Word", "Fade Letter"];
  G.def_cutFadeName = "Random Fade";
  G.inactive_keywordColor = [0.505, 0.502, 0.502];
  G.inactive_keywordColorHex = 8421504;
  G.def_keywordColor = [0.9922, 0.7294, 0.0667];
  G.def_keywordColorHex = 16628241;
  G.currentKeywordColor = G.def_keywordColor;
  G.currentKeywordColorHex = G.def_keywordColorHex;
  G.effectControlsPresetFolderName = "EffectControls";
  G.driftControlsPresetName = G.scriptInitials + "_Drift_Controls.ffx";
  G.trackingControlsPresetName = G.scriptInitials + "_Tracking_Controls.ffx";
  G.positionControls1PresetName = G.scriptInitials + "_Position_Controls_1.ffx";
  G.positionControls2PresetName = G.scriptInitials + "_Position_Controls_2.ffx";
  G.positionControls3PresetName = G.scriptInitials + "_Position_Controls_3.ffx";
  G.positionControls4PresetName = G.scriptInitials + "_Position_Controls_4.ffx";
  G.scaleControls1PresetName = G.scriptInitials + "_Scale_Controls_1.ffx";
  G.scaleControls2PresetName = G.scriptInitials + "_Scale_Controls_2.ffx";
  G.scaleControls3PresetName = G.scriptInitials + "_Scale_Controls_3.ffx";
  G.scaleControls4PresetName = G.scriptInitials + "_Scale_Controls_4.ffx";
  G.rotationControls1PresetName = G.scriptInitials + "_Rotation_Controls_1.ffx";
  G.rotationControls2PresetName = G.scriptInitials + "_Rotation_Controls_2.ffx";
  G.rotationControls3PresetName = G.scriptInitials + "_Rotation_Controls_3.ffx";
  G.rotationControls4PresetName = G.scriptInitials + "_Rotation_Controls_4.ffx";
  G.randomizeAnchorScale = [1, 2, 3];
  G.randomizeAnchorRotateX = [1, 2, 3];
  G.randomizeAnchorRotateY = [1, 4, 5];
  G.randomizeAnchorRotateZ = [1, 2, 3, 4, 5];
  if (parseFloat(app.version) < 14) {
    alert(G.scriptName + " requires AE CC 2017 or later.");
  } else {
    if (Ez11.c()) {
      buildPal(theObj);
    }
  }
}
deoz_MonkeyWords(this);
