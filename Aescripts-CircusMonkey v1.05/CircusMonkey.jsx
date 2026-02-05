/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function deoz_CircusMonkey(theObj) {
  function obfuscateExpr(theExpr, theTable) {
    if (G.obfuscate) {
      var baseExpr = theExpr;
      baseExpr = baseExpr.replace(/function/g, "function@");
      baseExpr = baseExpr.replace(/return/g, "return@");
      baseExpr = baseExpr.replace(/else/g, "else@");
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
      return theExpr.replace(/_/g, "");
    }
  }
  function d2r(theAngle) {
    return Math.PI * (theAngle / 180);
  }
  function r2d(theAngle) {
    return 180 * (theAngle / Math.PI);
  }
  function MT_getRandom(a, b) {
    return a + Math.random() * (b - a);
  }
  function CM_deselectAll(theComp) {
    var mySelected = theComp.selectedLayers;
    for (var i = 0; i < mySelected.length; i += 1) {
      mySelected[i].selected = false;
    }
  }
  function CM_getArrayIndex(theArray, theItem) {
    for (var i = 0; i < theArray.length; i += 1) {
      if (theArray[i] == theItem) {
        return i;
      }
    }
    return -1;
  }
  function CM_tokenize(str) {
    function setMinMax(tokenArray) {
      G.maxChars = 0;
      G.minChars = 999999;
      G.numChars = [];
      for (var i = 0; i < tokenArray.length; i += 1) {
        myToken = tokenArray[i];
        G.maxChars = Math.max(G.maxChars, myToken.length);
        G.minChars = Math.min(G.minChars, myToken.length);
        G.numChars.push(myToken.length);
      }
    }
    var tokens = [];
    var token = "";
    var s = CM_strip(str);
    for (var i = 0; i < s.length; i += 1) {
      if (s[i] == " ") {
        if (token.length > 0) {
          tokens.push(token);
          token = "";
          continue;
        }
      } else {
        token += s[i];
      }
    }
    if (token.length > 0) {
      tokens.push(token);
    }
    setMinMax(tokens);
    return tokens;
  }
  function CM_colorToHex(theColor) {
    var r = Math.round(theColor[0] * 255);
    var g = Math.round(theColor[1] * 255);
    var b = Math.round(theColor[2] * 255);
    return r * 65536 + g * 256 + b;
  }
  function CM_hexToColor(theHex) {
    var r = theHex >> 16;
    var g = (theHex & 65280) >> 8;
    var b = theHex & 255;
    return [r / 255, g / 255, b / 255];
  }
  function CM_customDraw() {
    with (this) {
      graphics.drawOSControl();
      graphics.rectPath(0, 0, size[0], size[1]);
      graphics.fillPath(fillBrush);
      graphics.strokePath(strokePen);
    }
  }
  function CM_strip(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
  }
  function CM_reduceMultipleSpaces(theString) {
    return theString.replace(/\s{2,}/g, " ");
  }
  function CM_convertCRandTabsToSpaces(theString) {
    return theString.replace(/[\n\r\t]/g, " ");
  }
  function CM_changeFontSize() {
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp
        .fontSizeDDL.selection.index ==
      CM_getArrayIndex(G.fontSizeNames, "Constant")
    ) {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = false;
    } else {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = true;
    }
  }
  function CM_changeShape() {
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Left")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Right")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Top")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Bottom")
    ].enabled = true;
    var shapeIdx =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection
        .index;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = true;
    var wordAlignment = G.shapeWordAlignments[shapeIdx];
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.selection =
      CM_getArrayIndex(G.alignmentNames, wordAlignment);
    var wordSeparation = G.shapeWordSeparations[shapeIdx];
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.txt.text =
      "" + wordSeparation;
    switch (
      G.shapeNames[
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection
          .index
      ]
    ) {
      case "Z Circle":
      case "Y Circle":
      case "X Circle":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = true;
        break;
      case "X Line":
      case "Y Line":
      case "Z Line":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = true;
        break;
      case "Stationary":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = false;
        break;
      default:
        break;
    }
    switch (
      G.shapeNames[
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection
          .index
      ]
    ) {
      case "Z Circle":
      case "X Circle":
      case "Y Line":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Left")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Right")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Top")
        ].enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Bottom")
        ].enabled = false;
        break;
      case "Y Circle":
      case "X Line":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Left")
        ].enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Right")
        ].enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Top")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Bottom")
        ].enabled = true;
        break;
      case "Z Line":
      case "Stationary":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Left")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Right")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Top")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Bottom")
        ].enabled = true;
        break;
      default:
        break;
    }
  }
  function CM_changeAlignment() {
    switch (
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL
        .selection.text
    ) {
      case "Center":
      case "Top":
      case "Bottom":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.enabled = false;
        break;
      case "Left":
      case "Right":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.enabled = true;
        break;
      default:
        break;
    }
  }
  function CM_changeTransitionIn() {
    var transitionInType =
      G.animationNames[
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp
          .animationDDL.selection.index
      ];
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.enabled =
      transitionInType != "None";
  }
  function CM_changeTransitionOut() {
    var transitionOutType =
      G.transitionOutNames[
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp
          .DDL.selection.index
      ];
    if (transitionOutType == "None") {
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = false;
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = false;
    } else if (transitionOutType == "Cut") {
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = false;
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = true;
    } else {
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = true;
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = true;
    }
  }
  function CM_clickHelp() {
    e3.helpUI();
  }
  function CM_clickTextOnlyCB() {
    var state =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.textOnlyGrp
        .textOnlyCB.value;
    if (state) {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = false;
    } else {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.enabled = true;
      if (
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp
          .fontSizeDDL.selection.index ==
        CM_getArrayIndex(G.fontSizeNames, "Constant")
      ) {
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = false;
      } else {
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = true;
      }
    }
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.enabled = !state;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.enabled = !state;
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.enabled = !state;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.enabled = !state;
  }
  function CM_clickKey() {
    alert(G.helpTip, "CircusMonkey Keyboard Commands");
  }
  function CM_clickSave() {
    var xmlStruct =
      "<CMPreset>\r<CMVersion />\r<UserText />\r<Layout>\r<Algorithm />\r<Alignment />\r<Direction />\r<Spacing />\r<CircleWrap />\r<Equalize />\r</Layout>\r<TypeAttributes>\r<TextOnly />\r<AllCaps />\r<FontSize />\r<Size />\r<Minimum />\r<Maximum />\r<ColorPalette>\r<Color1 />\r<Color2 />\r<Color2Enabled />\r<Color3 />\r<Color3Enabled />\r<Color4 />\r<Color4Enabled />\r<Color5 />\r<Color5Enabled />\r</ColorPalette>\r</TypeAttributes>\r<TypeAnimation>\r<TransitionIn />\r<Speed />\r<MotionBlur />\r<TransitionOut />\r<Delay />\r<FadeDuration />\r</TypeAnimation>\r<Markers>\r<TimeSpan />\r<MarkerSync />\r</Markers>\r<MonkeyCam>\r<IncludeCamera />\r<Movement />\r<AutoRotate />\r<AutoFrame />\r<IncludeLight />\r</MonkeyCam>\r</CMPreset>";
    var myPreset = new XML(xmlStruct);
    myPreset.CMVersion = G.presetVersion;
    myPreset.UserText = File.encode(G.uiPal.grp.textPnl.txt.text);
    myPreset.Layout.Algorithm =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection.index.toString();
    myPreset.Layout.Alignment =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.selection.index.toString();
    myPreset.Layout.Direction =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.DDL.selection.index.toString();
    myPreset.Layout.Spacing =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.txt.text;
    myPreset.Layout.CircleWrap =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.DDL.selection.index.toString();
    myPreset.Layout.Equalize =
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.equalizeCB.value.toString();
    myPreset.TypeAttributes.TextOnly =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.textOnlyGrp.textOnlyCB.value.toString();
    myPreset.TypeAttributes.AllCaps =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.allCapsGrp.allCapsCB.value.toString();
    myPreset.TypeAttributes.FontSize =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.fontSizeDDL.selection.index.toString();
    myPreset.TypeAttributes.Size =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.txt.text;
    myPreset.TypeAttributes.Minimum =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.txt.text;
    myPreset.TypeAttributes.Maximum =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.txt.text;
    myPreset.TypeAttributes.ColorPalette.Color1 = G.currentColor1Hex.toString();
    myPreset.TypeAttributes.ColorPalette.Color2 = G.currentColor2Hex.toString();
    myPreset.TypeAttributes.ColorPalette.Color2Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.enableCB.value.toString();
    myPreset.TypeAttributes.ColorPalette.Color3 = G.currentColor3Hex.toString();
    myPreset.TypeAttributes.ColorPalette.Color3Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.enableCB.value.toString();
    myPreset.TypeAttributes.ColorPalette.Color4 = G.currentColor4Hex.toString();
    myPreset.TypeAttributes.ColorPalette.Color4Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.enableCB.value.toString();
    myPreset.TypeAttributes.ColorPalette.Color5 = G.currentColor5Hex.toString();
    myPreset.TypeAttributes.ColorPalette.Color5Enabled =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.enableCB.value.toString();
    myPreset.TypeAnimation.TransitionIn =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp.animationDDL.selection.index.toString();
    myPreset.TypeAnimation.Speed =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.selection.index.toString();
    myPreset.TypeAnimation.MotionBlur =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.enableBlurGrp.enableBlurCB.value.toString();
    myPreset.TypeAnimation.TransitionOut =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp.DDL.selection.index.toString();
    myPreset.TypeAnimation.Delay =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.DDL.selection.index.toString();
    myPreset.TypeAnimation.FadeDuration =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.DDL.selection.index.toString();
    myPreset.Markers.TimeSpan =
      G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.selection.index.toString();
    myPreset.Markers.MarkerSync =
      G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.value.toString();
    myPreset.MonkeyCam.IncludeCamera =
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.value.toString();
    myPreset.MonkeyCam.Movement =
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.selection.index.toString();
    myPreset.MonkeyCam.AutoRotate =
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.selection.index.toString();
    myPreset.MonkeyCam.AutoFrame =
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.selection.index.toString();
    myPreset.MonkeyCam.IncludeLight =
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.lightGrp.CB.value.toString();
    var myStr = myPreset.toXMLString();
    var mySaveFile = File.saveDialog("Save Preset As...");
    if (mySaveFile != null) {
      mySaveFile.open("W");
      mySaveFile.write(myStr);
      mySaveFile.close();
      if (mySaveFile.name.substr(-4).toLowerCase() != ".xml") {
        mySaveFile.rename(mySaveFile.name + ".xml");
      }
    }
  }
  function CM_clickLoad() {
    var myXmlFile = File.openDialog("Load Preset...");
    if (myXmlFile == null) {
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
    var tempXML = myPreset.CMVersion;
    if (tempXML == null || tempXML.toString() == "") {
      alert("This does not appear to be a valid CircusMonkey preset file.");
      return;
    }
    var myPresetVersion = parseFloat(tempXML.toString());
    if (isNaN(myPresetVersion)) {
      alert("This does not appear to be a valid CircusMonkey preset file.");
      return;
    }
    if (myPresetVersion > parseFloat(G.presetVersion)) {
      alert(
        "The selected preset was created with a newer version of CircusMonkey. You will need to update CircusMonkey to use this preset.",
      );
      return;
    }
    tempXML = myPreset.UserText;
    if (myPresetVersion < 1.03) {
      if (tempXML != null && tempXML.toString() != "") {
        if (
          !confirm(
            "This preset will overwrite your existing text.\rProceed anyway?",
            true,
          )
        ) {
          return;
        }
        var myUserText = myPreset.UserText.toString();
        G.uiPal.grp.textPnl.txt.text = myUserText;
      }
    } else {
      if (tempXML != null && File.decode(tempXML.toString()) != "") {
        if (
          !confirm(
            "This preset will overwrite your existing text.\rProceed anyway?",
            true,
          )
        ) {
          return;
        }
        var myUserText = File.decode(myPreset.UserText.toString());
        G.uiPal.grp.textPnl.txt.text = myUserText;
      }
    }
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Left")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Right")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Top")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
      CM_getArrayIndex(G.alignmentNames, "Bottom")
    ].enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection =
      parseInt(myPreset.Layout.Algorithm.toString(), 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.selection =
      parseInt(myPreset.Layout.Alignment.toString(), 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.DDL.selection =
      parseInt(myPreset.Layout.Direction.toString(), 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.txt.text =
      myPreset.Layout.Spacing.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.DDL.selection =
      parseInt(myPreset.Layout.CircleWrap.toString(), 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.equalizeCB.value =
      myPreset.Layout.Equalize.toString() == "true";
    switch (
      G.shapeNames[
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection
          .index
      ]
    ) {
      case "Z Circle":
      case "X Circle":
      case "Y Line":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Left")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Right")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Top")
        ].enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Bottom")
        ].enabled = false;
        break;
      case "Y Circle":
      case "X Line":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Left")
        ].enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Right")
        ].enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Top")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Bottom")
        ].enabled = true;
        break;
      case "Z Line":
      case "Stationary":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Left")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Right")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Top")
        ].enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Bottom")
        ].enabled = true;
        break;
      default:
        break;
    }
    switch (
      G.shapeNames[
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection
          .index
      ]
    ) {
      case "Z Circle":
      case "Y Circle":
      case "X Circle":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = true;
        break;
      case "X Line":
      case "Y Line":
      case "Z Line":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = true;
        break;
      case "Stationary":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = false;
        break;
      default:
        break;
    }
    switch (
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL
        .selection.text
    ) {
      case "Center":
      case "Top":
      case "Bottom":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.enabled = false;
        break;
      case "Left":
      case "Right":
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.enabled = true;
        break;
      default:
        break;
    }
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = true;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.textOnlyGrp.textOnlyCB.value =
      myPreset.TypeAttributes.TextOnly.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.allCapsGrp.allCapsCB.value =
      myPreset.TypeAttributes.AllCaps.toString() == "true";
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.fontSizeDDL.selection =
      parseInt(myPreset.TypeAttributes.FontSize.toString(), 10);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.txt.text =
      myPreset.TypeAttributes.Size.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.txt.text =
      myPreset.TypeAttributes.Minimum.toString();
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.txt.text =
      myPreset.TypeAttributes.Maximum.toString();
    G.currentColor1Hex = parseInt(
      myPreset.TypeAttributes.ColorPalette.Color1.toString(),
      10,
    );
    G.currentColor1 = CM_hexToColor(G.currentColor1Hex);
    g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color1Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor1);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.notify(
      "onDraw",
    );
    G.currentColor2Hex = parseInt(
      myPreset.TypeAttributes.ColorPalette.Color2.toString(),
      10,
    );
    G.currentColor2 = CM_hexToColor(G.currentColor2Hex);
    g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color2Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor2);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.enableCB.value =
      myPreset.TypeAttributes.ColorPalette.Color2Enabled.toString() == "true";
    G.currentColor3Hex = parseInt(
      myPreset.TypeAttributes.ColorPalette.Color3.toString(),
      10,
    );
    G.currentColor3 = CM_hexToColor(G.currentColor3Hex);
    g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color3Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor3);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.enableCB.value =
      myPreset.TypeAttributes.ColorPalette.Color3Enabled.toString() == "true";
    G.currentColor4Hex = parseInt(
      myPreset.TypeAttributes.ColorPalette.Color4.toString(),
      10,
    );
    G.currentColor4 = CM_hexToColor(G.currentColor4Hex);
    g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color4Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor4);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.enableCB.value =
      myPreset.TypeAttributes.ColorPalette.Color4Enabled.toString() == "true";
    G.currentColor5Hex = parseInt(
      myPreset.TypeAttributes.ColorPalette.Color5.toString(),
      10,
    );
    G.currentColor5 = CM_hexToColor(G.currentColor5Hex);
    g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color5Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor5);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.enableCB.value =
      myPreset.TypeAttributes.ColorPalette.Color5Enabled.toString() == "true";
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp
        .fontSizeDDL.selection.index ==
      CM_getArrayIndex(G.fontSizeNames, "Constant")
    ) {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = false;
    } else {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = true;
    }
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp.animationDDL.selection =
      parseInt(myPreset.TypeAnimation.TransitionIn.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.selection =
      parseInt(myPreset.TypeAnimation.Speed.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.enableBlurGrp.enableBlurCB.value =
      myPreset.TypeAnimation.MotionBlur.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp.DDL.selection =
      parseInt(myPreset.TypeAnimation.TransitionOut.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.DDL.selection =
      parseInt(myPreset.TypeAnimation.Delay.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.DDL.selection =
      parseInt(myPreset.TypeAnimation.FadeDuration.toString(), 10);
    var transitionInType =
      G.animationNames[
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp
          .animationDDL.selection.index
      ];
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.enabled =
      transitionInType != "None";
    var transitionOutType =
      G.transitionOutNames[
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp
          .DDL.selection.index
      ];
    if (transitionOutType == "None") {
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = false;
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = false;
    } else if (transitionOutType == "Cut") {
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = false;
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = true;
    } else {
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = true;
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = true;
    }
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.selection =
      parseInt(myPreset.Markers.TimeSpan.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.value =
      myPreset.Markers.MarkerSync.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.message.visible =
      G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.enabled =
      !G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp
        .markerSyncCBGrp.markerSyncCB.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.value = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.enabled = true;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.selection =
      parseInt(myPreset.MonkeyCam.Movement.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.selection =
      parseInt(myPreset.MonkeyCam.AutoRotate.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.selection =
      parseInt(myPreset.MonkeyCam.AutoFrame.toString(), 10);
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.lightGrp.CB.value =
      myPreset.MonkeyCam.IncludeLight.toString() == "true";
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.value =
      myPreset.MonkeyCam.IncludeCamera.toString() == "true";
    include =
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp
        .camIncludeCB.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.enabled =
      include;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.enabled =
      include;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.enabled =
      include;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.lightGrp.enabled =
      include;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.updateBtn.enabled =
      include;
    var state =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.textOnlyGrp
        .textOnlyCB.value;
    if (state) {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = true;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = false;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = false;
    } else {
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.enabled = true;
      if (
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp
          .fontSizeDDL.selection.index ==
        CM_getArrayIndex(G.fontSizeNames, "Constant")
      ) {
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = false;
      } else {
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.enabled = false;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = true;
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = true;
      }
    }
    G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.enabled = !state;
    G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.enabled = !state;
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.enabled = !state;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.enabled = !state;
  }
  function CM_clickSwatch1() {
    var newColor = $.colorPicker(G.currentColor1Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor1Hex = newColor;
    G.currentColor1 = CM_hexToColor(newColor);
    var g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color1Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor1);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.notify(
      "onDraw",
    );
  }
  function CM_clickSwatch2() {
    var newColor = $.colorPicker(G.currentColor2Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor2Hex = newColor;
    G.currentColor2 = CM_hexToColor(newColor);
    var g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color2Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor2);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.enableCB.value = true;
  }
  function CM_clickCB2() {
    if (!this.value) {
      G.currentColor2 = G.defColor2;
      G.currentColor2Hex = G.defColor2Hex;
      var g =
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
          .color2Grp.colorBtn.graphics;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor2);
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function CM_clickSwatch3() {
    var newColor = $.colorPicker(G.currentColor3Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor3Hex = newColor;
    G.currentColor3 = CM_hexToColor(newColor);
    var g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color3Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor3);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.enableCB.value = true;
  }
  function CM_clickCB3() {
    if (!this.value) {
      G.currentColor3 = G.defColor3;
      G.currentColor3Hex = G.defColor3Hex;
      var g =
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
          .color3Grp.colorBtn.graphics;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor3);
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function CM_clickSwatch4() {
    var newColor = $.colorPicker(G.currentColor4Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor4Hex = newColor;
    G.currentColor4 = CM_hexToColor(newColor);
    var g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color4Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor4);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.enableCB.value = true;
  }
  function CM_clickCB4() {
    if (!this.value) {
      G.currentColor4 = G.defColor4;
      G.currentColor4Hex = G.defColor4Hex;
      var g =
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
          .color4Grp.colorBtn.graphics;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor4);
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function CM_clickSwatch5() {
    var newColor = $.colorPicker(G.currentColor5Hex);
    if (newColor == -1) {
      return;
    }
    G.currentColor5Hex = newColor;
    G.currentColor5 = CM_hexToColor(newColor);
    var g =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color5Grp.colorBtn.graphics;
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor5);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.notify(
      "onDraw",
    );
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.enableCB.value = true;
  }
  function CM_clickCB5() {
    if (!this.value) {
      G.currentColor5 = G.defColor5;
      G.currentColor5Hex = G.defColor5Hex;
      var g =
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
          .color5Grp.colorBtn.graphics;
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor5);
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function CM_clickLoadKuler() {
    var kulerFile = File.openDialog("Select a Kuler (.ase) file to import.");
    if (kulerFile == null) {
      return;
    }
    if (kulerFile.name.substr(-4).toLowerCase() != ".ase") {
      alert("Selected file doesn\'t appear to be a Kuler file.");
      return;
    }
    try {
      var kulerData = app.parseSwatchFile(kulerFile);
    } catch (err) {
      alert("Error occured parsing Kuler file.");
      return;
    }
    var numColors = Math.min(kulerData.values.length, 5);
    var colors = [];
    var color = [];
    for (var i = 0; i < numColors; i += 1) {
      colorData = kulerData.values[i];
      switch (colorData.type) {
        case "RGB":
          color = [colorData.r, colorData.g, colorData.b];
          break;
        case "Gray":
          [colorData.gray, colorData.gray, colorData.gray];
          break;
        case "CMYK":
          k = colorData.k;
          color = [
            (1 - colorData.c) * (1 - k),
            (1 - colorData.m) * (1 - k),
            (1 - colorData.y) * (1 - k),
          ];
          break;
        default:
          color = [0, 0, 0];
          break;
      }
      colors.push(color);
    }
    if (colors.length > 0) {
      newColor = colors[0];
      cbVal = true;
    } else {
      newColor = G.defColor1;
      cbVal = false;
    }
    G.currentColor1 = newColor;
    G.currentColor1Hex = CM_colorToHex(newColor);
    myBtn =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color1Grp.colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor1);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 1) {
      newColor = colors[1];
      cbVal = true;
    } else {
      newColor = G.defColor2;
      cbVal = false;
    }
    G.currentColor2 = newColor;
    G.currentColor2Hex = CM_colorToHex(newColor);
    myBtn =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color2Grp.colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor2);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 2) {
      newColor = colors[2];
      cbVal = true;
    } else {
      newColor = G.defColor3;
      cbVal = false;
    }
    G.currentColor3 = newColor;
    G.currentColor3Hex = CM_colorToHex(newColor);
    myBtn =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color3Grp.colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor3);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 3) {
      newColor = colors[3];
      cbVal = true;
    } else {
      newColor = G.defColor4;
      cbVal = false;
    }
    G.currentColor4 = newColor;
    G.currentColor4Hex = CM_colorToHex(newColor);
    myBtn =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color4Grp.colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor4);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 4) {
      newColor = colors[4];
      cbVal = true;
    } else {
      newColor = G.defColor5;
      cbVal = false;
    }
    G.currentColor5 = newColor;
    G.currentColor5Hex = CM_colorToHex(newColor);
    myBtn =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color5Grp.colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, G.currentColor5);
    G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
  }
  function CM_clickMarkerSync() {
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.message.visible =
      this.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.enabled =
      !this.value;
  }
  function MC_clickInclude() {
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.enabled =
      this.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.enabled =
      this.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.enabled =
      this.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.lightGrp.enabled =
      this.value;
    G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.updateBtn.enabled =
      this.value;
    if (!this.value) {
      app.beginUndoGroup("Remove MonkeyCam");
      MC_cleanCamera();
      app.endUndoGroup();
    }
  }
  function MC_clickUpdate() {
    if (
      app.project.activeItem == null ||
      !(app.project.activeItem instanceof CompItem)
    ) {
      alert("No comp active.");
      return;
    }
    if (!G.autoFrameWarningIssued) {
      if (
        G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp
          .camIncludeCB.value
      ) {
        if (
          G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
            .autoDollyDDL.selection.index != G.autoDollyOff
        ) {
          if (
            G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp
              .enabled &&
            G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp
              .equalizeCB.value
          ) {
            G.autoFrameWarningIssued = true;
            if (
              !confirm(
                "Auto Frame will not work as expected in a CircusMonkey comp built with Equalize enabled. Please Undo CircusMonkey build,  disable Equalize, and rebuild. Proceed anyway?",
                true,
              )
            ) {
              return;
            }
          }
        }
      }
    }
    var myComp = app.project.activeItem;
    app.beginUndoGroup("Update MonkeyCam");
    MC_cleanCamera();
    MC_buildCamera();
    app.endUndoGroup();
    myComp.openInViewer();
  }
  function CM_addAnimation(theLayer, theMarkerLayer, theMarkerNum, theAnimIdx) {
    function getFontSize(myLayer) {
      var myProp = myLayer.property("Source Text");
      var myTextDoc = myProp.value;
      return myTextDoc.fontSize;
    }
    var theAnimName = G.animationNames[theAnimIdx];
    var myIdx =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp
        .timeStretchDDL.selection.index;
    var dMult = G.timeStretchValues[myIdx];
    var transitionOutType =
      G.transitionOutNames[
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp
          .DDL.selection.index
      ];
    var tDelayIdx =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl
        .transitionOutDelayGrp.DDL.selection.index;
    var usingNextMarker = G.transitionOutDelayNames[tDelayIdx] == "Next Marker";
    var tDelay = usingNextMarker
      ? null
      : parseInt(G.transitionOutDelayNames[tDelayIdx]) *
        theLayer.containingComp.frameDuration;
    var tFadeIdx =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.DDL
        .selection.index;
    var tFade =
      G.fadeDurationFrames[tFadeIdx] * theLayer.containingComp.frameDuration;
    var exprOutOnly_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "time < tOut ? value : 0";
    var exprOutOnly_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "time < tOut ? value : 0";
    var exprOutOnly_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "linear(time,tOut,tOut+tFade,value,0)";
    var exprOutOnly_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "linear(time,tOut,tOut+tFade,value,0)";
    var expr0 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "t = time - m.key(" +
      theMarkerNum +
      ").time;\r" +
      "t >= 0 ? value: 0";
    var expr0_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "t = Math.min(time,tOut) - m.key(" +
      theMarkerNum +
      ").time;\r" +
      "v = t >= 0 ? value: 0;\r" +
      "time >= tOut ? 0 : v";
    var expr0_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "t = Math.min(time,tOut) - m.key(" +
      theMarkerNum +
      ").time;\r" +
      "v = t >= 0 ? value: 0;\r" +
      "time >= tOut ? 0 : v";
    var expr0_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "t = Math.min(time,tOut) - m.key(" +
      theMarkerNum +
      ").time;\r" +
      "v = t >= 0 ? value: 0;\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr0_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "t = Math.min(time,tOut) - m.key(" +
      theMarkerNum +
      ").time;\r" +
      "v = t >= 0 ? value: 0;\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr1 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.275 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "easeIn(t,0,d,0,value)";
    var expr1_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "d = " +
      0.275 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value);\r" +
      "time >= tOut ? 0 : v";
    var expr1_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "d = " +
      0.275 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value);\r" +
      "time >= tOut ? 0 : v";
    var expr1_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.275 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value);\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr1_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.275 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value);\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr2 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.333 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "linear(t,0,d,[0,0],[100,100])";
    var expr3 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.333 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "s = (t<0 ? 0 : (t>d ? 100 : 100*Math.sqrt(1-(d-t)*(d-t)/(d*d))));\r" +
      "[s,s]";
    var expr4 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.333 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "s = (t<0 ? 0 : (t>d ? 100 : 100*(1-Math.sqrt(1-(t*t)/(d*d)))));\r" +
      "[s,s]";
    var expr5 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.367 * dMult +
      ";\r" +
      "pre = " +
      0.2 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "e = .25;\r" +
      "t1 = d*4/11;\r" +
      "t2 = d*8/11;\r" +
      "t3 = d*10/11;\r" +
      "t4 = d;\r" +
      "if (t < 0){\r" +
      "  s = 0;\r" +
      "}else if(t < t1){\r" +
      "  tt = t/t1;\r" +
      "  s = 100*tt*tt;\r" +
      "}else if (t < t2){\r" +
      "  dd = (t2-t1)/2;\r" +
      "  tt = (t - t1 - dd)/dd;\r" +
      "  s = 100*(1 - e*(1 - tt*tt));\r" +
      "}else if (t < t3){\r" +
      "  dd = (t3-t2)/2;\r" +
      "  tt = (t - t2 - dd)/dd;\r" +
      "  s = 100*(1 - e*e*(1 - tt*tt));\r" +
      "}else if (t < t4){\r" +
      "  dd = (t4-t3)/2;\r" +
      "  tt = (t - t3 - dd)/dd;\r" +
      "  s = 100*(1 - e*e*e*(1 - tt*tt));\r" +
      "}else{\r" +
      "  s = 100;\r" +
      "}\r" +
      "[s,s]";
    var expr6 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.367 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "k = 1.70158;\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "if (t < 0)\r" +
      "  s = 0\r" +
      "else if (t < d)\r" +
      "s = 100*((t=t/d-1)*t*((k+1)*t + k) + 1)\r" +
      "else\r" +
      "  s = 100;\r" +
      "[s,s]";
    var expr7 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "rate = " +
      20 / dMult +
      ";\r" +
      "n = text.sourceText.length;\r" +
      "d = n/rate;\r" +
      "pre = d/2;\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "linear(t,0,d,0,100)";
    var expr8_9_10r =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "p = " +
      0.445 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "a = 92;\r" +
      "decay = 5.5;\r" +
      "if (t > 0 && t < p*3/4)\r" +
      "  a*Math.cos(t*Math.PI*2/p)/Math.exp(t*decay)\r" +
      "else\r" +
      "  0";
    var expr8_9_10o =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (time <  (m.key(" +
      theMarkerNum +
      ").time - pre)) 0 else value;";
    var expr8_9_10o_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "time >= tOut ? 0 : v";
    var expr8_9_10o_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "time >= tOut ? 0 : v";
    var expr8_9_10o_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr8_9_10o_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr11p =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "delta = " +
      1.5 * getFontSize(theLayer) +
      ";\r" +
      "easeIn(t,0,d,value+[delta,0,0],value)";
    var expr11o =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "easeIn(t,0,d,0,value)";
    var expr11o_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr11o_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr11o_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr11o_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr12p =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "delta = " +
      getFontSize(theLayer) +
      ";\r" +
      "easeIn(t,0,d,value-[0,delta,0],value)";
    var expr12o =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "easeIn(t,0,d,0,value)";
    var expr12o_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr12o_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr12o_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr12o_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.2 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr13 =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "f = 2;\r" +
      "decay = " +
      (6 - dMult) +
      ";\r" +
      "if (t < d){\r" +
      "  s = linear(t,0,d,0,100);\r" +
      "}else if (t < d + " +
      dMult +
      "){\r" +
      "  a = 100/d;\r" +
      "  w = f*Math.PI*2;\r" +
      "  s = 100 + a*(Math.sin((t-d)*w)/Math.exp(decay*(t-d))/w);\r" +
      "}else{\r" +
      "  s = 100;\r" +
      "}\r" +
      "[s,s]";
    var expr14_15_16r =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "f = 2;\r" +
      "decay = " +
      (6 - dMult) +
      ";\r" +
      "if (t < d){\r" +
      "  linear(t,0,d,90,0);\r" +
      "}else if (t < d + " +
      dMult +
      "){\r" +
      "  a = 100/d;\r" +
      "  w = f*Math.PI*2;\r" +
      "  -a*(Math.sin((t-d)*w)/Math.exp(decay*(t-d))/w);\r" +
      "}else{\r" +
      "  0;\r" +
      "}";
    var expr14_15_16o =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (time <  (m.key(" +
      theMarkerNum +
      ").time - pre)) 0 else value;";
    var expr14_15_16o_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "time >= tOut ? 0 : v";
    var expr14_15_16o_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "time >= tOut ? 0 : v";
    var expr14_15_16o_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr14_15_16o_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "if (Math.min(time,tOut) <  (m.key(" +
      theMarkerNum +
      ").time - pre)) v = 0 else v = value;\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr17p =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "f = 2;\r" +
      "decay = " +
      (6 - dMult) +
      ";\r" +
      "if (t < d){\r" +
      "  delta = linear(t,0,d,100,0);\r" +
      "}else if (t < d + " +
      dMult +
      "){\r" +
      "  a = 100/d;\r" +
      "  w = f*Math.PI*2;\r" +
      "  delta = -a*(Math.sin((t-d)*w)/Math.exp(decay*(t-d))/w);\r" +
      "}else{\r" +
      "  delta = 0;\r" +
      "}\r" +
      "value + [delta,0,0]";
    var expr17o =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "easeIn(t,0,d,0,value)";
    var expr17o_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr17o_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr17o_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr17o_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr18p =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "f = 2;\r" +
      "decay = " +
      (6 - dMult) +
      ";\r" +
      "if (t < d){\r" +
      "  delta = linear(t,0,d,100,0);\r" +
      "}else if (t < d + " +
      dMult +
      "){\r" +
      "  a = 100/d;\r" +
      "  w = f*Math.PI*2;\r" +
      "  delta = -a*(Math.sin((t-d)*w)/Math.exp(decay*(t-d))/w);\r" +
      "}else{\r" +
      "  delta = 0;\r" +
      "}\r" +
      "value - [0,delta,0]";
    var expr18o =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "easeIn(t,0,d,0,value)";
    var expr18o_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr18o_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var expr18o_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var expr18o_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var exprPop1_s =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "if(t < pre)\r" +
      "  ease(t,0,pre,[0,0,0],value*1.25)\r" +
      "else\r" +
      "  ease(t,pre,d,value*1.25,value);";
    var exprPop2_s =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.233 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "if(t < pre)\r" +
      "  ease(t,0,pre,[0,0,0],value*1.62)\r" +
      "else\r" +
      "  ease(t,pre,d,value*1.62,value);";
    var exprFlip_o =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "easeIn(t,0,d,0,value)";
    var exprFlip_o_c =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var exprFlip_o_cm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time;\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "time >= tOut ? 0 : v";
    var exprFlip_o_f =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "tOut = m.key(" +
      theMarkerNum +
      ").time + " +
      tDelay +
      ";\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var exprFlip_o_fm =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "if (" +
      theMarkerNum +
      " < m.numKeys){\r" +
      "  tOut = m.key(" +
      theMarkerNum +
      1 +
      ").time - " +
      tFade / 2 +
      ";\r" +
      "}else{\r" +
      "  tOut = 99999;\r" +
      "}\r" +
      "tFade = " +
      tFade +
      ";\r" +
      "d = " +
      0.167 * dMult +
      ";\r" +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "t = Math.min(time,tOut) - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "v = easeIn(t,0,d,0,value)\r" +
      "linear(time,tOut,tOut+tFade,v,0)";
    var exprRotate1X_yr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,78,0);";
    var exprFlip1X_xr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,96,0);";
    var exprRotate2X_yr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,438,0);";
    var exprFlip2X_xr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,448,0);";
    var exprRotate2_1X_yr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,-78,0);";
    var exprFlip2_1X_xr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,-96,0);";
    var exprRotate2_2X_yr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,-260,0);";
    var exprFlip2_2X_xr =
      G.exprHeader +
      'm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "d = " +
      0.5 * dMult +
      ";\r" +
      "pre = " +
      0.1 * dMult +
      ";\r" +
      "t = time - (m.key(" +
      theMarkerNum +
      ").time - pre);\r" +
      "ease(t,0,d,-272,0);";
    switch (theAnimName) {
      case "Cut On":
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr0_cm
            : expr0_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr0_fm
            : expr0_f;
        } else {
          theLayer.property("Opacity").expression = expr0;
        }
        break;
      case "Fade Up":
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr1_cm
            : expr1_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr1_fm
            : expr1_f;
        } else {
          theLayer.property("Opacity").expression = expr1;
        }
        break;
      case "Fast Scale":
        theLayer.property("Scale").expression = expr2;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Ease Out":
        theLayer.property("Scale").expression = expr3;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Ease In":
        theLayer.property("Scale").expression = expr4;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Bounce":
        theLayer.property("Scale").expression = expr5;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Back":
        theLayer.property("Scale").expression = expr6;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Type Out":
        myAnimator = theLayer
          .property("ADBE Text Properties")
          .property("ADBE Text Animators")
          .addProperty("ADBE Text Animator");
        myProp = myAnimator
          .property("ADBE Text Animator Properties")
          .addProperty("ADBE Text Opacity");
        myProp.setValue(0);
        mySelector = myAnimator
          .property("ADBE Text Selectors")
          .addProperty("ADBE Text Selector");
        mySelector.property("ADBE Text Percent Start").expression = expr7;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Swing Down":
        theLayer.property("X Rotation").expression = expr8_9_10r;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_cm
            : expr8_9_10o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_fm
            : expr8_9_10o_f;
        } else {
          theLayer.property("Opacity").expression = expr8_9_10o;
        }
        break;
      case "Swing Up":
        theLayer.property("X Rotation").expression = expr8_9_10r;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_cm
            : expr8_9_10o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_fm
            : expr8_9_10o_f;
        } else {
          theLayer.property("Opacity").expression = expr8_9_10o;
        }
        break;
      case "Swing Left":
        theLayer.property("Y Rotation").expression = expr8_9_10r;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_cm
            : expr8_9_10o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_fm
            : expr8_9_10o_f;
        } else {
          theLayer.property("Opacity").expression = expr8_9_10o;
        }
        break;
      case "Swing Right":
        theLayer.property("Y Rotation").expression = expr8_9_10r;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_cm
            : expr8_9_10o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_fm
            : expr8_9_10o_f;
        } else {
          theLayer.property("Opacity").expression = expr8_9_10o;
        }
        break;
      case "Swing Center":
        theLayer.property("Y Rotation").expression = expr8_9_10r;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_cm
            : expr8_9_10o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr8_9_10o_fm
            : expr8_9_10o_f;
        } else {
          theLayer.property("Opacity").expression = expr8_9_10o;
        }
        break;
      case "Slide Left":
        theLayer.property("Position").expression = expr11p;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr11o_cm
            : expr11o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr11o_fm
            : expr11o_f;
        } else {
          theLayer.property("Opacity").expression = expr11o;
        }
        break;
      case "Slide Down":
        theLayer.property("Position").expression = expr12p;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr12o_cm
            : expr12o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr12o_fm
            : expr12o_f;
        } else {
          theLayer.property("Opacity").expression = expr12o;
        }
        break;
      case "Springy Scale":
        theLayer.property("Scale").expression = expr13;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Spring Down":
        theLayer.property("X Rotation").expression = expr14_15_16r;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr14_15_16o_cm
            : expr14_15_16o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr14_15_16o_fm
            : expr14_15_16o_f;
        } else {
          theLayer.property("Opacity").expression = expr14_15_16o;
        }
        break;
      case "Spring Up":
        theLayer.property("X Rotation").expression = expr14_15_16r;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr14_15_16o_cm
            : expr14_15_16o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr14_15_16o_fm
            : expr14_15_16o_f;
        } else {
          theLayer.property("Opacity").expression = expr14_15_16o;
        }
        break;
      case "Spring Left":
        theLayer.property("Position").expression = expr17p;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr17o_cm
            : expr17o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? expr17o_fm
            : expr17o_f;
        } else {
          theLayer.property("Opacity").expression = expr17o;
        }
        break;
      case "Pop":
        theLayer.property("Scale").expression = exprPop2_s;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      case "Rotate 1X":
        theLayer.property("Y Rotation").expression = exprRotate1X_yr;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_cm
            : exprFlip_o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_fm
            : exprFlip_o_f;
        } else {
          theLayer.property("Opacity").expression = exprFlip_o;
        }
        break;
      case "Flip 1X":
        theLayer.property("X Rotation").expression = exprFlip1X_xr;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_cm
            : exprFlip_o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_fm
            : exprFlip_o_f;
        } else {
          theLayer.property("Opacity").expression = exprFlip_o;
        }
        break;
      case "Rotate 2X":
        theLayer.property("Y Rotation").expression = exprRotate2X_yr;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_cm
            : exprFlip_o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_fm
            : exprFlip_o_f;
        } else {
          theLayer.property("Opacity").expression = exprFlip_o;
        }
        break;
      case "Flip 2X":
        theLayer.property("X Rotation").expression = exprFlip2X_xr;
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_cm
            : exprFlip_o_c;
        } else if (transitionOutType == "Fade Out") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprFlip_o_fm
            : exprFlip_o_f;
        } else {
          theLayer.property("Opacity").expression = exprFlip_o;
        }
        break;
      case "None":
        if (transitionOutType == "Cut") {
          theLayer.property("Opacity").expression = usingNextMarker
            ? exprOutOnly_cm
            : exprOutOnly_c;
        } else {
          if (transitionOutType == "Fade Out") {
            theLayer.property("Opacity").expression = usingNextMarker
              ? exprOutOnly_fm
              : exprOutOnly_f;
          }
        }
        break;
      default:
        break;
    }
  }
  function CM_animAdj(theLayer, theAnimationIdx, theHeight, theWidth) {
    if (G.animationAnchor[theAnimationIdx] == 1) {
      return;
    }
    var adjAP = theLayer.property("Anchor Point").value;
    var adjPos = theLayer.property("Position").value;
    if (G.animationAnchor[theAnimationIdx] == 0) {
      theLayer
        .property("Anchor Point")
        .setValue([adjAP[0], adjAP[1] - theHeight / 2]);
      theLayer
        .property("Position")
        .setValue([adjPos[0], adjPos[1] - theHeight / 2]);
    } else if (G.animationAnchor[theAnimationIdx] == 2) {
      theLayer
        .property("Anchor Point")
        .setValue([adjAP[0], adjAP[1] + theHeight / 2]);
      theLayer
        .property("Position")
        .setValue([adjPos[0], adjPos[1] + theHeight / 2]);
    } else if (G.animationAnchor[theAnimationIdx] == 3) {
      theLayer
        .property("Anchor Point")
        .setValue([adjAP[0] - theWidth / 2, adjAP[1]]);
      theLayer
        .property("Position")
        .setValue([adjPos[0] - theWidth / 2, adjPos[1]]);
    } else {
      theLayer
        .property("Anchor Point")
        .setValue([adjAP[0] + theWidth / 2, adjAP[1]]);
      theLayer
        .property("Position")
        .setValue([adjPos[0] + theWidth / 2, adjPos[1]]);
    }
  }
  function CM_addVisibility(theLayer) {
    var visibilityExpr =
      G.exprHeader +
      'if (thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.enableOpacityName +
      '").value){\r' +
      '  c = thisComp.layer("' +
      G.cameraName +
      '");\r' +
      "  f = c.focusDistance;\r" +
      "  v1 = toWorld(anchorPoint) - c.toWorld([0,0,0]);\r" +
      "  v2 = c.toWorldVec([0,0,1]);\r" +
      "  z = dot(v1,v2);\r" +
      "  d = z - f;\r" +
      "  if (d < 0){\r" +
      '    if (thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.enableFGOpacityName +
      '").value){\r' +
      '      curve = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.FGOpacityCurveName +
      '").value;\r' +
      "      if(curve == 1){\r" +
      "        linear(d,-f,0,0,100);\r" +
      "      }else if (curve == 2){\r" +
      "        easeIn(d,-f,0,0,100);\r" +
      "      }else{\r" +
      "        easeOut(d,-f,0,0,100);\r" +
      "      }\r" +
      "    }else{\r" +
      "      100;\r" +
      "    }\r" +
      "  }else{\r" +
      '    dCtrl = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.BGOpacityDistanceName +
      '").value;\r' +
      '    curve = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.BGOpacityCurveName +
      '").value;\r' +
      "    if(curve == 1){\r" +
      "      linear(d,0,dCtrl,100,0);\r" +
      "    }else if (curve == 2){\r" +
      "      easeIn(d,0,dCtrl,100,0);\r" +
      "    }else{\r" +
      "      easeOut(d,0,dCtrl,100,0);\r" +
      "    }\r" +
      "  }\r" +
      "}else{\r" +
      "  100\r" +
      "}";
    var theEffect = theLayer
      .property("ADBE Effect Parade")
      .addProperty("ADBE Geometry2");
    theEffect.property("ADBE Geometry2-0008").expression = visibilityExpr;
  }
  function CM_addFog(theLayer) {
    var fogAmountExpr =
      G.exprHeader +
      'if (thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.enableFogName +
      '").value){\r' +
      '  c = thisComp.layer("' +
      G.cameraName +
      '");\r' +
      "  f = c.focusDistance;\r" +
      "  v1 = toWorld(anchorPoint) - c.toWorld([0,0,0]);\r" +
      "  v2 = c.toWorldVec([0,0,1]);\r" +
      "  z = dot(v1,v2);\r" +
      "  d = z - f;\r" +
      "  if (d < 0){\r" +
      '    if (thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.enableFGFogName +
      '").value){\r' +
      '      curve = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.FGFogCurveName +
      '").value;\r' +
      "      if(curve == 1){\r" +
      "        linear(d,-f,0,100,0);\r" +
      "      }else if (curve == 2){\r" +
      "        easeIn(d,-f,0,100,0);\r" +
      "      }else{\r" +
      "        easeOut(d,-f,0,100,0);\r" +
      "      }\r" +
      "    }else{\r" +
      "      0;\r" +
      "    }\r" +
      "  }else{\r" +
      '    dCtrl = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.BGFogDistanceName +
      '").value;\r' +
      '    curve = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.BGFogCurveName +
      '").value;\r' +
      "    if(curve == 1){\r" +
      "      linear(d,0,dCtrl,0,100);\r" +
      "    }else if (curve == 2){\r" +
      "      easeIn(d,0,dCtrl,0,100);\r" +
      "    }else{\r" +
      "      easeOut(d,0,dCtrl,0,100);\r" +
      "    }\r" +
      "  }\r" +
      "}else{\r" +
      "  0\r" +
      "}";
    var fogColorExpr =
      G.exprHeader +
      "try{\r" +
      '  thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.FogColorName +
      '").value;\r' +
      "}catch (e){\r" +
      "  [0,0,0,1];\r" +
      "}";
    var theEffect = theLayer
      .property("ADBE Effect Parade")
      .addProperty("ADBE Tint");
    theEffect.property("ADBE Tint-0001").expression = fogColorExpr;
    theEffect.property("ADBE Tint-0002").expression = fogColorExpr;
    theEffect.property("ADBE Tint-0003").expression = fogAmountExpr;
  }
  function CM_cleanComp() {
    if (
      app.project.activeItem == null ||
      !(app.project.activeItem instanceof CompItem)
    ) {
      alert("No comp active.");
      return;
    }
    var myComp = app.project.activeItem;
    var atLeastOne = false;
    for (var i = 1; i <= myComp.numLayers; i += 1) {
      if (myComp.layer(i).comment.indexOf(G.MonkeyID) > -1) {
        atLeastOne = true;
        break;
      }
    }
    if (!atLeastOne) {
      alert("Nothing to Undo.");
      return;
    }
    app.beginUndoGroup("Remove CircusMonkey");
    MC_cleanCamera();
    for (var i = myComp.numLayers; i > 0; i--) {
      if (myComp.layer(i).comment == G.TextLayerID) {
        myComp.layer(i).locked = false;
        myComp.layer(i).remove();
      }
    }
    var myMarkerLayer = null;
    for (var i = myComp.numLayers; i > 0; i--) {
      if (myComp.layer(i).comment.indexOf(G.MonkeyID) > -1) {
        if (myComp.layer(i).comment == G.MasterControlID) {
          if (confirm("Save CircusMonkey Marker Layer?", true)) {
            myMarkerLayer = myComp.layer(i);
            for (
              var j =
                myMarkerLayer.property("ADBE Effect Parade").numProperties;
              j > 0;
              j--
            ) {
              myMarkerLayer.property("ADBE Effect Parade").property(j).enabled =
                false;
            }
          } else {
            mySolidSource = myComp.layer(i).source;
            myComp.layer(i).locked = false;
            myComp.layer(i).remove();
            if (mySolidSource.usedIn.length == 0) {
              mySolidSource.remove();
            }
          }
        } else {
          mySolidSource = myComp.layer(i).source;
          myComp.layer(i).locked = false;
          myComp.layer(i).remove();
          if (mySolidSource.usedIn.length == 0) {
            mySolidSource.remove();
          }
        }
      }
    }
    if (myMarkerLayer != null) {
      myMarkerLayer.comment = "";
      myMarkerLayer.name = G.savedMarkerLayerName;
      myMarkerLayer.source.name = G.savedMarkerLayerName;
      myMarkerLayer.label = G.SavedMarkerLayerColor;
      myMarkerLayer.selected = true;
    }
    myComp.hideShyLayers = false;
    app.endUndoGroup();
    myComp.openInViewer();
  }
  function CM_buildText() {
    function removeSpacesAroundControlChars(theString) {
      var str = "";
      var specChars = "|^" + G.hardSpaceChar;
      var doingSpec = false;
      for (var i = 0; i < theString.length; i += 1) {
        theChar = theString[i];
        if (specChars.indexOf(theChar) > -1) {
          while (str.length > 0) {
            if (str[str.length - 1] == " ") {
              str = str.substr(0, str.length - 1);
            } else {
              break;
            }
          }
          doingSpec = true;
        } else if (theChar == " ") {
          if (doingSpec) {
            continue;
          }
        } else {
          doingSpec = false;
        }
        str += theChar;
      }
      return str;
    }
    function convertHardSpaces(theString) {
      var str = "";
      var prevWasNbsp = false;
      for (var i = 0; i < theString.length; i += 1) {
        myChar = theString[i];
        if (prevWasNbsp) {
          if (!(myChar == " ") && !(myChar == G.hardSpaceChar)) {
            str += myChar;
            prevWasNbsp = false;
          }
        } else if (myChar == G.hardSpaceChar) {
          while (str.length > 0) {
            if (str[str.length - 1] == " ") {
              str = str.substr(0, str.length - 1);
            } else {
              break;
            }
          }
          if (str.length != 0) {
            prevChar = str[str.length - 1];
            if (
              prevChar != "{" &&
              prevChar != "}" &&
              prevChar != "[" &&
              prevChar != "]"
            ) {
              str += String.fromCharCode(160);
              prevWasNbsp = true;
            }
          }
        } else {
          str += myChar;
        }
      }
      return str;
    }
    function removeMarkerSpaceChars(theString) {
      var str = "";
      for (var i = 0; i < theString.length; i += 1) {
        if (theString[i] == G.markerSpaceChar) {
          str += " ";
        } else {
          str += theString[i];
        }
      }
      return str;
    }
    function addColors(theLayer, theColorArray, theColorIdx) {
      var theLockState = theLayer.locked;
      theLayer.locked = false;
      var theProp = theLayer.property("Source Text");
      var theTextDoc = theProp.value;
      theFillColor = theColorArray[theColorIdx % theColorArray.length];
      theTextDoc.applyFill = true;
      theTextDoc.fillColor = theFillColor;
      theTextDoc.applyStroke = false;
      theProp.setValue(theTextDoc);
      theLayer.locked = theLockState;
    }
    function addShapeControls(theLayer) {
      var posOffsetExpr =
        G.exprHeader +
        'e = thisComp.layer("' +
        G.masterControlLayerName +
        '")("ADBE Effect Parade")("' +
        G.rigControlsEffectName +
        '");\r' +
        "x = e.param(" +
        G.rigXPositionOffsetIdx +
        ").value;\r" +
        "y = e.param(" +
        G.rigYPositionOffsetIdx +
        ").value;\r" +
        "z = e.param(" +
        G.rigZPositionOffsetIdx +
        ").value;\r" +
        "value + [x,y,z]";
      var xRotOffsetExpr =
        G.exprHeader +
        'value + thisComp.layer("' +
        G.masterControlLayerName +
        '")("ADBE Effect Parade")("' +
        G.rigControlsEffectName +
        '")("' +
        G.rigXRotationOffsetName +
        '").value;';
      var yRotOffsetExpr =
        G.exprHeader +
        'value + thisComp.layer("' +
        G.masterControlLayerName +
        '")("ADBE Effect Parade")("' +
        G.rigControlsEffectName +
        '")("' +
        G.rigYRotationOffsetName +
        '").value;';
      var zRotOffsetExpr =
        G.exprHeader +
        'value + thisComp.layer("' +
        G.masterControlLayerName +
        '")("ADBE Effect Parade")("' +
        G.rigControlsEffectName +
        '")("' +
        G.rigZRotationOffsetName +
        '").value;';
      theLayer.property("Position").expression = posOffsetExpr;
      theLayer.property("X Rotation").expression = xRotOffsetExpr;
      theLayer.property("Y Rotation").expression = yRotOffsetExpr;
      theLayer.property("Z Rotation").expression = zRotOffsetExpr;
    }
    function addTextControls(theLayer) {
      var posOffsetExpr =
        G.exprHeader +
        'e = thisComp.layer("' +
        G.masterControlLayerName +
        '")("ADBE Effect Parade")("' +
        G.textControlsEffectName +
        '");\r' +
        "x = -e.param(" +
        G.textXPositionOffsetIdx +
        ").value;\r" +
        "y = -e.param(" +
        G.textYPositionOffsetIdx +
        ").value;\r" +
        "z = -e.param(" +
        G.textZPositionOffsetIdx +
        ").value;\r" +
        "value + [x,y,z]";
      var orientOffsetExpr =
        G.exprHeader +
        'e = thisComp.layer("' +
        G.masterControlLayerName +
        '")("ADBE Effect Parade")("' +
        G.textControlsEffectName +
        '");\r' +
        "x = e.param(" +
        G.textXRotationOffsetIdx +
        ").value%360;\r" +
        "y = e.param(" +
        G.textYRotationOffsetIdx +
        ").value%360;\r" +
        "z = e.param(" +
        G.textZRotationOffsetIdx +
        ").value%360;\r" +
        "value + [x,y,z]";
      theLayer.property("Anchor Point").expression = posOffsetExpr;
      theLayer.property("Orientation").expression = orientOffsetExpr;
    }
    function addMarkers(theLayer, theComp, theSplitString, theGuideLayer) {
      var myMarker = new MarkerValue("");
      var guideMarkerIdx = 1;
      if (theGuideLayer != null) {
        for (var i = 0; i < theSplitString.length; i += 1) {
          if (theSplitString[i] != G.markerSpaceChar) {
            myComment = CM_strip(theSplitString[i]);
            myMarker.comment = myComment;
            theLayer
              .property("Marker")
              .setValueAtTime(
                theGuideLayer.property("Marker").keyTime(guideMarkerIdx),
                myMarker,
              );
            guideMarkerIdx++;
          }
        }
      } else {
        if (
          G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp
            .durationDDL.selection.index !=
          CM_getArrayIndex(G.durationNames, G.def_durationName)
        ) {
          myEndTime = theComp.duration;
          myDiv = myEndTime / (theSplitString.length + 1);
          myCurTime = myDiv;
        } else {
          myEndTime = theComp.workAreaStart + theComp.workAreaDuration;
          myDiv = theComp.workAreaDuration / (theSplitString.length + 1);
          myCurTime = theComp.workAreaStart + myDiv;
        }
        for (var i = 0; i < theSplitString.length; i += 1) {
          if (theSplitString[i] != G.markerSpaceChar) {
            myComment = CM_strip(theSplitString[i]);
            myMarker.comment = myComment;
            theLayer.property("Marker").setValueAtTime(myCurTime, myMarker);
          }
          myCurTime += myDiv;
        }
      }
      return true;
    }
    function createCenterControlLayer(theComp) {
      var myLayer = theComp.layers.addNull(theComp.duration);
      myLayer.startTime = 0;
      myLayer.name = G.centerControlLayerName;
      myLayer.source.name = G.centerControlLayerName;
      myLayer.comment = G.CenterControlLayerID;
      myLayer.label = G.CenterControlLayerColor;
      myLayer.threeDLayer = true;
      var posOffsetExpr =
        G.exprHeader +
        'x = thisComp.layer("' +
        G.masterControlLayerName +
        '").effect("' +
        G.circleControlsEffectName +
        '")("' +
        G.circleXPositionOffsetName +
        '").value;\r' +
        'y = thisComp.layer("' +
        G.masterControlLayerName +
        '").effect("' +
        G.circleControlsEffectName +
        '")("' +
        G.circleYPositionOffsetName +
        '").value;\r' +
        'z = thisComp.layer("' +
        G.masterControlLayerName +
        '").effect("' +
        G.circleControlsEffectName +
        '")("' +
        G.circleZPositionOffsetName +
        '").value;\r' +
        "value + [x,y,z]";
      myLayer.property("Position").expression = posOffsetExpr;
      var xRotOffsetExpr =
        G.exprHeader +
        'value + thisComp.layer("' +
        G.masterControlLayerName +
        '").effect("' +
        G.circleControlsEffectName +
        '")("' +
        G.circleXRotationOffsetName +
        '").value;';
      myLayer.property("X Rotation").expression = xRotOffsetExpr;
      var yRotOffsetExpr =
        G.exprHeader +
        'value + thisComp.layer("' +
        G.masterControlLayerName +
        '").effect("' +
        G.circleControlsEffectName +
        '")("' +
        G.circleYRotationOffsetName +
        '").value;';
      myLayer.property("Y Rotation").expression = yRotOffsetExpr;
      var zRotOffsetExpr =
        G.exprHeader +
        'value + thisComp.layer("' +
        G.masterControlLayerName +
        '").effect("' +
        G.circleControlsEffectName +
        '")("' +
        G.circleZRotationOffsetName +
        '").value;';
      myLayer.property("Z Rotation").expression = zRotOffsetExpr;
      var scaleExpr =
        G.exprHeader +
        'value* thisComp.layer("' +
        G.masterControlLayerName +
        '").effect("' +
        G.circleControlsEffectName +
        '")("' +
        G.circleScaleOffsetName +
        '").value/100;';
      myLayer.property("Scale").expression = scaleExpr;
      return myLayer;
    }
    var myCameraPresetPath =
      File($.fileName).path + "/" + escape(G.cameraPresetName);
    if (!File(myCameraPresetPath).exists) {
      alert(
        "CircusMonkey can\'t find the preset \'" +
          G.cameraPresetName +
          "\'. It needs to be in the same folder as the CircusMonkey script.",
      );
      return;
    }
    var myCirclePresetPath =
      File($.fileName).path + "/" + escape(G.circlePresetName);
    if (!File(myCirclePresetPath).exists) {
      alert(
        "CircusMonkey can\'t find the preset \'" +
          G.circlePresetName +
          "\'. It needs to be in the same folder as the CircusMonkey script.",
      );
      return;
    }
    var myRigPresetPath = File($.fileName).path + "/" + escape(G.rigPresetName);
    if (!File(myRigPresetPath).exists) {
      alert(
        "CircusMonkey can\'t find the preset \'" +
          G.rigPresetName +
          "\'. It needs to be in the same folder as the CircusMonkey script.",
      );
      return;
    }
    var myTextPresetPath =
      File($.fileName).path + "/" + escape(G.textPresetName);
    if (!File(myTextPresetPath).exists) {
      alert(
        "CircusMonkey can\'t find the preset \'" +
          G.textPresetName +
          "\'. It needs to be in the same folder as the CircusMonkey script.",
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
    for (var i = 1; i <= myComp.numLayers; i += 1) {
      if (myComp.layer(i).comment.indexOf(G.MonkeyID) > -1) {
        if (
          confirm(
            "CircusMonkey has already been applied to this comp. Do you want to Undo it now to remove previous attempt?",
            true,
          )
        ) {
          CM_cleanComp();
        }
        return;
      }
    }
    if (myComp.pixelAspect != 1) {
      if (
        !confirm(
          "CircusMonkey results will be inaccurate with non-square pixel comps. Proceed anyway?",
          true,
        )
      ) {
        return;
      }
    }
    if (!G.autoFrameWarningIssued) {
      if (
        G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp
          .camIncludeCB.value
      ) {
        if (
          G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
            .autoDollyDDL.selection.index != G.autoDollyOff
        ) {
          if (
            G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp
              .enabled &&
            G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp
              .equalizeCB.value
          ) {
            G.autoFrameWarningIssued = true;
            if (
              !confirm(
                "Auto Frame will not work as expected with Equalize enabled. Please disable Equalize and click Do It! again. Proceed anyway?",
                true,
              )
            ) {
              return;
            }
          }
        }
      }
    }
    var myText = convertHardSpaces(
      CM_reduceMultipleSpaces(
        CM_convertCRandTabsToSpaces(CM_strip(G.uiPal.grp.textPnl.txt.text)),
      ),
    );
    if (myText == "") {
      alert("No text entered.");
      return;
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.allCapsGrp
        .allCapsCB.value
    ) {
      myText = myText.toUpperCase();
    }
    var preMarkerText = "";
    var mySplitText = "";
    var myTokens = [];
    myText = removeSpacesAroundControlChars(myText);
    if (e3.t()) {
      var doingWord = false;
      var trialStr = "";
      var trialWordCount = 0;
      var specChars = " []{}!^|" + String.fromCharCode(160);
      for (var i = 0; i < myText.length; i += 1) {
        myChar = myText[i];
        trialStr += myChar;
        if (specChars.indexOf(myChar) > -1) {
          if (doingWord) {
            trialWordCount++;
            doingWord = false;
            if (trialWordCount >= G.trialWordLimit) {
              if (
                confirm(
                  "The trial version of CircusMonkey is limited to " +
                    G.trialWordLimit +
                    " words. Would you like to continue with a truncated version of your text?",
                )
              ) {
                myText = trialStr;
                break;
              } else {
                return;
              }
            }
          }
        } else {
          doingWord = true;
        }
      }
    }
    for (var i = 0; i < myText.length; i += 1) {
      myChar = myText[i];
      if (myChar == G.markerSpaceChar) {
        preMarkerText += " " + myChar + " ";
      } else {
        preMarkerText += myChar;
      }
    }
    mySplitText = CM_reduceMultipleSpaces(CM_strip(preMarkerText)).split(" ");
    var textOnly =
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.textOnlyGrp
        .textOnlyCB.value;
    myMarkerGuideLayer = null;
    if (
      !textOnly &&
      G.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp
        .markerSyncCBGrp.markerSyncCB.value
    ) {
      if (myComp.selectedLayers.length == 0) {
        alert("No marker guide layer selected for Marker Sync.");
        return;
      }
      if (myComp.selectedLayers.length > 1) {
        alert("Please select single marker guide layer for Marker Sync.");
        return;
      }
      myMarkerGuideLayer = myComp.selectedLayers[0];
      if (myMarkerGuideLayer.property("Marker").numKeys == 0) {
        alert("The marker guide layer has no markers.");
        return;
      }
      tempMarkerCount = 0;
      for (var j = 0; j < mySplitText.length; j += 1) {
        if (mySplitText[j] != G.markerSpaceChar) {
          tempMarkerCount++;
        }
      }
      if (tempMarkerCount > myMarkerGuideLayer.property("Marker").numKeys) {
        alert(
          "The marker guide layer needs to have at least " +
            tempMarkerCount +
            " markers, but it only has " +
            myMarkerGuideLayer.property("Marker").numKeys +
            ".",
        );
        return;
      }
    }
    myText = removeMarkerSpaceChars(myText);
    myTokens = CM_tokenize(CM_reduceMultipleSpaces(myText));
    G.compCenter = [myComp.width, myComp.height] / 2;
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp
        .fontSizeDDL.selection.index !=
      CM_getArrayIndex(G.fontSizeNames, "Constant")
    ) {
      minFontSize = parseFloat(
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.txt
          .text,
      );
      if (isNaN(minFontSize) || minFontSize < 1 || minFontSize > 9999) {
        alert("Illegal minimum font size");
        return;
      }
      maxFontSize = parseFloat(
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.txt
          .text,
      );
      if (isNaN(maxFontSize) || maxFontSize < 1 || maxFontSize > 9999) {
        alert("Illegal minimum font size");
        return;
      }
      if (maxFontSize < minFontSize) {
        alert("Minimum font size can\'t be greater than maximum.");
        return;
      }
    } else {
      minFontSize = parseFloat(
        G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.sizeGrp.txt
          .text,
      );
      if (isNaN(minFontSize) || minFontSize < 1 || minFontSize > 9999) {
        alert("Illegal constant font size");
        return;
      }
      maxFontSize = minFontSize;
    }
    var mySeparation = parseFloat(
      G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.txt.text,
    );
    if (isNaN(mySeparation)) {
      alert("Illegal Separation value");
      return;
    }
    G.gap = mySeparation;
    var myTextDoc = new TextDocument("");
    var myPrevLayer = null;
    var myPrevControlLayer = null;
    var myRotation = 0;
    var controlLayers = [];
    var avgFontSize = (minFontSize + maxFontSize) / 2;
    var deltaFontSize = maxFontSize - minFontSize;
    var markerCount = 1;
    var masterControlLayer = null;
    app.beginUndoGroup("Create CircusMonkey Layers");
    if (myTokens.length > 0) {
      if (textOnly) {
        myFontSize = minFontSize;
        for (var i = 0; i < myTokens.length; i += 1) {
          myWord = CM_strip(myTokens[i]);
          myTextLayer = myComp.layers.addText(myWord);
          myTextLayer.startTime = 0;
          myTextLayer.outPoint = myComp.duration;
          myTextLayer.comment = G.TextLayerID;
          myTextLayer.label = G.TextLayerColor;
          myTextLayer.name = myWord;
          if (myPrevLayer != null) {
            myTextLayer.moveAfter(myPrevLayer);
          }
          myProp = myTextLayer.property("Source Text");
          myTextDoc = myProp.value;
          myTextDoc.justification = ParagraphJustification.CENTER_JUSTIFY;
          myTextDoc.fontSize = myFontSize;
          myTextDoc.text = myWord;
          myProp.setValue(myTextDoc);
          myRect = myTextLayer.sourceRectAtTime(0, true);
          myTextLayer
            .property("Anchor Point")
            .setValue([
              myRect.left + myRect.width / 2,
              myRect.top + myRect.height / 2,
            ]);
          myTextLayer.selected = false;
          myPrevLayer = myTextLayer;
        }
        var myColorArray = [G.currentColor1];
        if (
          G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color2Grp.enableCB.value
        ) {
          myColorArray.push(G.currentColor2);
        }
        if (
          G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color3Grp.enableCB.value
        ) {
          myColorArray.push(G.currentColor3);
        }
        if (
          G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color4Grp.enableCB.value
        ) {
          myColorArray.push(G.currentColor4);
        }
        if (
          G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color5Grp.enableCB.value
        ) {
          myColorArray.push(G.currentColor5);
        }
        var colorIdx = 0;
        for (var i = 1; i <= myComp.numLayers; i += 1) {
          if (myComp.layer(i).comment == G.TextLayerID) {
            addColors(myComp.layer(i), myColorArray, colorIdx);
            colorIdx++;
          }
        }
        return;
      }
      var myAnimIdx =
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp
          .animationDDL.selection.index;
      var randomizing = G.animationNames[myAnimIdx] == G.def_randomizeName;
      var myMotionBlur =
        G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.enableBlurGrp
          .enableBlurCB.value;
      var textLayers = [];
      var maxWidth = 0;
      var maxHeight = 0;
      var myLayout =
        G.shapeNames[
          G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL
            .selection.index
        ];
      var myAlignment =
        G.alignmentNames[
          G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL
            .selection.index
        ];
      equalizing =
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.enabled &&
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.equalizeCB
          .value;
      var equalizingW = false;
      if (equalizing) {
        switch (myLayout) {
          case "Z Circle":
          case "X Circle":
          case "Y Line":
          case "Z Line":
          case "Stationary":
            equalizingW = true;
            break;
          case "Y Circle":
          case "X Line":
            equalizingW = false;
            break;
          default:
            break;
        }
      }
      var randomNums = [];
      if (
        G.fontSizeNames[
          G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp
            .fontSizeDDL.selection.index
        ] == "Random"
      ) {
        for (var i = 0; i < myTokens.length; i += 1) {
          randomNums.push(Math.random());
        }
      }
      for (var i = 0; i < myTokens.length; i += 1) {
        switch (
          G.fontSizeNames[
            G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl
              .fontSizeGrp.fontSizeDDL.selection.index
          ]
        ) {
          case "Random":
            if (G.maxChars > G.minChars) {
              myCharPct =
                (G.numChars[i] - G.minChars) / (G.maxChars - G.minChars);
              if (myCharPct > 0.5) {
                myFontSize = Math.round(
                  minFontSize + (deltaFontSize * randomNums[i]) / 2,
                );
              } else {
                myFontSize = Math.round(
                  avgFontSize + (deltaFontSize * randomNums[i]) / 2,
                );
              }
            } else {
              myFontSize = Math.round(
                minFontSize + deltaFontSize * randomNums[i],
              );
            }
            break;
          case "Constant":
            myFontSize = minFontSize;
            break;
          case "Ascending":
            if (myTokens.length < 2) {
              myFontSize = minFontSize;
            } else {
              myFontSize =
                minFontSize +
                (i * (maxFontSize - minFontSize)) / (myTokens.length - 1);
            }
            break;
          case "Descending":
            if (myTokens.length < 2) {
              myFontSize = minFontSize;
            } else {
              myFontSize =
                maxFontSize -
                (i * (maxFontSize - minFontSize)) / (myTokens.length - 1);
            }
            break;
          default:
            break;
        }
        myWord = CM_strip(myTokens[i]);
        myTextLayer = myComp.layers.addText(myWord);
        myTextLayer.startTime = 0;
        myTextLayer.outPoint = myComp.duration;
        myTextLayer.comment = G.TextLayerID;
        myTextLayer.label = G.TextLayerColor;
        myTextLayer.name = myWord;
        myProp = myTextLayer.property("Source Text");
        myTextDoc = myProp.value;
        myTextDoc.justification = ParagraphJustification.LEFT_JUSTIFY;
        myTextDoc.fontSize = myFontSize;
        myTextDoc.text = myWord;
        myProp.setValue(myTextDoc);
        myRect = myTextLayer.sourceRectAtTime(0, true);
        maxWidth = Math.max(maxWidth, myRect.width);
        maxHeight = Math.max(maxHeight, myRect.height);
        textLayers.push(myTextLayer);
      }
      if (randomizing) {
        for (var i = 0; i < G.animationNames.length - 3; i += 1) {
          if (G.animationAnchor[i] == 1) {
            G.randomAnimations.push(i);
          }
        }
      }
      randomNums = [];
      if (randomizing) {
        for (var i = 0; i < myTokens.length; i += 1) {
          randomNums.push(Math.random());
        }
      }
      for (var i = 0; i < myTokens.length; i += 1) {
        if (randomizing) {
          myAnimIdx =
            G.randomAnimations[
              Math.floor(randomNums[i] * G.randomAnimations.length)
            ];
        }
        myTextLayer = textLayers[i];
        if (myPrevLayer != null) {
          myTextLayer.moveAfter(myPrevLayer);
        }
        myTextLayer.motionBlur = myMotionBlur;
        myRect = myTextLayer.sourceRectAtTime(0, true);
        w = myRect.width;
        h = myRect.height;
        myTextLayer
          .property("Anchor Point")
          .setValue([myRect.left + w / 2, myRect.top + h / 2]);
        myTextLayer.selected = false;
        rightJust = false;
        if (myPrevLayer == null) {
          G.compCenter = [myComp.width / 2, myComp.height / 2];
          ul = [G.compCenter[0] - w / 2, G.compCenter[1] - h / 2];
          lr = [G.compCenter[0] + w / 2, G.compCenter[1] + h / 2];
          adjRect = myTextLayer.sourceRectAtTime(0, true);
          ctrlW = w;
          ctrlH = h;
          myControlLayerName =
            masterControlLayer == null
              ? G.masterControlLayerName
              : myTextLayer.name + " (ctrl)";
          ctrlW = w;
          ctrlH = h;
          if (equalizing) {
            if (equalizingW) {
              ctrlW = maxWidth;
            } else {
              ctrlH = maxHeight;
            }
          }
          myControlLayer = myComp.layers.addSolid(
            [1, 1, 1],
            myControlLayerName,
            Math.round(ctrlW),
            Math.round(ctrlH),
            1,
            myComp.duration,
          );
          myControlLayer.startTime = 0;
          myControlLayer.comment = G.ControlLayerID;
          myControlLayer.label = G.ControlLayerColor;
          myControlLayer.moveBefore(myTextLayer);
          myControlLayer.property("Opacity").setValue(0);
          myControlLayer
            .property("Position")
            .setValue(myTextLayer.property("Position").value);
          if (equalizing) {
            xAdj = 0;
            yAdj = 0;
            if (equalizingW) {
              switch (myAlignment) {
                case "Left":
                  xAdj = -(maxWidth - myRect.width) / 2;
                  break;
                case "Right":
                  xAdj = (maxWidth - myRect.width) / 2;
                  break;
                default:
                  break;
              }
            } else {
              switch (myAlignment) {
                case "Top":
                  yAdj = -(maxHeight - myRect.height) / 2;
                  break;
                case "Bottom":
                  yAdj = (maxHeight - myRect.height) / 2;
                  break;
                default:
                  break;
              }
            }
            tempPos = myTextLayer.property("Position").value;
            myTextLayer
              .property("Position")
              .setValue([tempPos[0] + xAdj, tempPos[1] + yAdj]);
          }
          myTextLayer.parent = myControlLayer;
          if (masterControlLayer == null) {
            masterControlLayer = myControlLayer;
            controlLayers.push(masterControlLayer);
            CM_deselectAll(myComp);
            masterControlLayer.selected = true;
            if (parseFloat(app.version, 10) < 12.1) {
              app.beginSuppressDialogs();
            }
            masterControlLayer.applyPreset(File(myRigPresetPath));
            masterControlLayer.applyPreset(File(myTextPresetPath));
            if (parseFloat(app.version, 10) < 12.1) {
              app.endSuppressDialogs(false);
            }
            switch (myLayout) {
              case "Z Circle":
              case "Y Circle":
              case "X Circle":
                if (parseFloat(app.version, 10) < 12.1) {
                  app.beginSuppressDialogs();
                }
                masterControlLayer.applyPreset(File(myCirclePresetPath));
                if (parseFloat(app.version, 10) < 12.1) {
                  app.endSuppressDialogs(false);
                }
                break;
              case "X Line":
              case "Y Line":
              case "Z Line":
              case "Stationary":
                break;
              default:
                break;
            }
            if (
              !addMarkers(
                masterControlLayer,
                myComp,
                mySplitText,
                myMarkerGuideLayer,
              )
            ) {
              return;
            }
          }
          if (G.animationAnchor[myAnimIdx] != 1) {
            CM_animAdj(myTextLayer, myAnimIdx, adjRect.height, adjRect.width);
          }
          myTextLayer.threeDLayer = true;
          myTextLayer.property("Casts Shadows").setValue(true);
          CM_addAnimation(
            myTextLayer,
            masterControlLayer,
            markerCount,
            myAnimIdx,
          );
          markerCount++;
          myTextLayer.selected = false;
          myTextLayer.shy = true;
          myTextLayer.locked = true;
          myPrevLayer = myTextLayer;
          myPrevControlLayer = myControlLayer;
        }
        if (i > 0) {
          myControlLayerName =
            masterControlLayer == null
              ? G.masterControlLayerName
              : myTextLayer.name + " (ctrl)";
          ctrlW = myRect.width;
          ctrlH = myRect.height;
          if (equalizing) {
            if (equalizingW) {
              ctrlW = maxWidth;
            } else {
              ctrlH = maxHeight;
            }
          }
          myControlLayer = myComp.layers.addSolid(
            [1, 1, 1],
            myControlLayerName,
            Math.round(ctrlW),
            Math.round(ctrlH),
            1,
            myComp.duration,
          );
          myControlLayer.startTime = 0;
          myControlLayer.comment = G.ControlLayerID;
          myControlLayer.label = G.ControlLayerColor;
          myControlLayer.moveBefore(myTextLayer);
          myControlLayer.property("Opacity").setValue(0);
          if (equalizing) {
            xAdj = 0;
            yAdj = 0;
            if (equalizingW) {
              switch (myAlignment) {
                case "Left":
                  xAdj = -(maxWidth - myRect.width) / 2;
                  break;
                case "Right":
                  xAdj = (maxWidth - myRect.width) / 2;
                  break;
                default:
                  break;
              }
            } else {
              switch (myAlignment) {
                case "Top":
                  yAdj = -(maxHeight - myRect.height) / 2;
                  break;
                case "Bottom":
                  yAdj = (maxHeight - myRect.height) / 2;
                  break;
                default:
                  break;
              }
            }
            tempPos = myTextLayer.property("Position").value;
            myTextLayer
              .property("Position")
              .setValue([tempPos[0] + xAdj, tempPos[1] + yAdj]);
          }
          myTextLayer.parent = myControlLayer;
          adjRect = myTextLayer.sourceRectAtTime(0, true);
          if (G.animationAnchor[myAnimIdx] != 1) {
            CM_animAdj(myTextLayer, myAnimIdx, adjRect.height, adjRect.width);
          }
          myTextLayer.threeDLayer = true;
          myTextLayer.property("Casts Shadows").setValue(true);
          CM_addAnimation(
            myTextLayer,
            masterControlLayer,
            markerCount,
            myAnimIdx,
          );
          markerCount++;
          myTextLayer.selected = false;
          myTextLayer.shy = true;
          myTextLayer.locked = true;
          myPrevLayer = myTextLayer;
          controlLayers.push(myControlLayer);
          myPrevControlLayer = myControlLayer;
        }
        addTextControls(myTextLayer);
      }
    }
    masterControlLayer.threeDLayer = true;
    prevControlLayer = masterControlLayer;
    for (var i = 1; i < controlLayers.length; i += 1) {
      myControlLayer = controlLayers[i];
      myControlLayer.threeDLayer = true;
      addShapeControls(myControlLayer);
      myControlLayer.selected = false;
      myControlLayer.shy = true;
      prevControlLayer = myControlLayer;
    }
    controlLayers[controlLayers.length - 1].comment = G.LastControlID;
    masterControlLayer.comment = G.MasterControlID;
    var totalDegrees =
      G.wrapAmountAngles[
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.DDL
          .selection.index
      ];
    var myDirection =
      G.directionNames[
        G.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.DDL
          .selection.index
      ];
    var myPos = [];
    var directionReverse = G.gap < 0 ? -1 : 1;
    G.gap = Math.abs(G.gap);
    var myCenterControlLayer = null;
    switch (myLayout) {
      case "Z Circle":
        totalArc = 0;
        for (var i = 0; i < controlLayers.length; i += 1) {
          totalArc += controlLayers[i].height + G.gap;
        }
        switch (myAlignment) {
          case "Left":
            myCenterAdj = controlLayers[0].width / 2;
            break;
          case "Center":
            myCenterAdj = maxWidth / 2;
            break;
          case "Right":
            myCenterAdj = maxWidth - controlLayers[0].width / 2;
            break;
          default:
            break;
        }
        directionMult = myDirection == "Auto" ? 1 : -1 * directionReverse;
        myAngle = totalDegrees * (controlLayers[0].height / totalArc);
        insideRadius = controlLayers[0].height / 2 / Math.sin(d2r(myAngle / 2));
        myCenter = [
          myComp.width / 2 - (insideRadius + myCenterAdj),
          myComp.height / 2,
          0,
        ];
        myCenterControlLayer = createCenterControlLayer(myComp);
        myCenterControlLayer.moveBefore(masterControlLayer);
        myCenterControlLayer.property("Position").setValue(myCenter);
        gapAngle = totalDegrees * (G.gap / totalArc);
        nextAngle = directionMult * (myAngle / 2 + gapAngle);
        for (var i = 1; i < controlLayers.length; i += 1) {
          myAngle = totalDegrees * (controlLayers[i].height / totalArc);
          workingAngle = nextAngle + (directionMult * myAngle) / 2;
          switch (myAlignment) {
            case "Left":
              radiusAdj = controlLayers[i].width / 2;
              break;
            case "Center":
              radiusAdj = maxWidth / 2;
              break;
            case "Right":
              radiusAdj = maxWidth - controlLayers[i].width / 2;
              break;
            default:
              break;
          }
          workingRadius = insideRadius + radiusAdj;
          myX = workingRadius * Math.cos(d2r(workingAngle));
          myY = workingRadius * Math.sin(d2r(workingAngle));
          myPos = [myCenter[0] + myX, myCenter[1] + myY, myCenter[2]];
          controlLayers[i].property("Position").setValue(myPos);
          controlLayers[i].property("Rotation").setValue(workingAngle);
          nextAngle += directionMult * (myAngle + gapAngle);
        }
        break;
      case "Y Circle":
        totalArc = 0;
        for (var i = 0; i < controlLayers.length; i += 1) {
          totalArc += controlLayers[i].width + G.gap;
        }
        directionMult = myDirection == "Auto" ? -1 : 1 * directionReverse;
        myAngle = totalDegrees * (controlLayers[0].width / totalArc);
        insideRadius = controlLayers[0].width / 2 / Math.sin(d2r(myAngle / 2));
        myCenter = [myComp.width / 2, myComp.height / 2, insideRadius];
        myCenterControlLayer = createCenterControlLayer(myComp);
        myCenterControlLayer.moveBefore(masterControlLayer);
        myCenterControlLayer.property("Position").setValue(myCenter);
        gapAngle = totalDegrees * (G.gap / totalArc);
        nextAngle = directionMult * (myAngle / 2 + gapAngle);
        for (var i = 1; i < controlLayers.length; i += 1) {
          myAngle = totalDegrees * (controlLayers[i].width / totalArc);
          workingAngle = nextAngle + (directionMult * myAngle) / 2;
          switch (myAlignment) {
            case "Top":
              heightAdj =
                (controlLayers[i].height - masterControlLayer.height) / 2;
              break;
            case "Center":
              heightAdj = 0;
              break;
            case "Bottom":
              heightAdj =
                -(controlLayers[i].height - masterControlLayer.height) / 2;
              break;
            default:
              break;
          }
          workingRadius = insideRadius;
          myX = -workingRadius * Math.sin(d2r(workingAngle));
          myY = heightAdj;
          myZ = -workingRadius * Math.cos(d2r(workingAngle));
          myPos = [myCenter[0] + myX, myCenter[1] + myY, myCenter[2] + myZ];
          controlLayers[i].property("Position").setValue(myPos);
          controlLayers[i].property("Y Rotation").setValue(workingAngle);
          nextAngle += directionMult * (myAngle + gapAngle);
        }
        break;
      case "X Circle":
        masterControlLayer
          .property("Rotation")
          .setValue(masterControlLayer.property("Rotation").value);
        totalArc = 0;
        for (var i = 0; i < controlLayers.length; i += 1) {
          totalArc += controlLayers[i].height + G.gap;
        }
        directionMult = myDirection == "Auto" ? 1 : -1 * directionReverse;
        myAngle = totalDegrees * (controlLayers[0].height / totalArc);
        insideRadius = controlLayers[0].height / 2 / Math.sin(d2r(myAngle / 2));
        myCenter = [myComp.width / 2, myComp.height / 2, insideRadius];
        myCenterControlLayer = createCenterControlLayer(myComp);
        myCenterControlLayer.moveBefore(masterControlLayer);
        myCenterControlLayer.property("Position").setValue(myCenter);
        gapAngle = totalDegrees * (G.gap / totalArc);
        nextAngle = directionMult * (myAngle / 2 + gapAngle);
        for (var i = 1; i < controlLayers.length; i += 1) {
          myAngle = totalDegrees * (controlLayers[i].height / totalArc);
          workingAngle = nextAngle + (directionMult * myAngle) / 2;
          switch (myAlignment) {
            case "Left":
              widthAdj =
                (controlLayers[i].width - masterControlLayer.width) / 2;
              break;
            case "Center":
              widthAdj = 0;
              break;
            case "Right":
              widthAdj =
                -(controlLayers[i].width - masterControlLayer.width) / 2;
              break;
            default:
              break;
          }
          workingRadius = insideRadius;
          myX = widthAdj;
          myY = workingRadius * Math.sin(d2r(workingAngle));
          myZ = -workingRadius * Math.cos(d2r(workingAngle));
          myPos = [myCenter[0] + myX, myCenter[1] + myY, myCenter[2] + myZ];
          controlLayers[i].property("Position").setValue(myPos);
          controlLayers[i].property("X Rotation").setValue(workingAngle);
          nextAngle += directionMult * (myAngle + gapAngle);
        }
        break;
      case "X Line":
        directionMult = myDirection == "Auto" ? 1 : -1 * directionReverse;
        nextOffset = masterControlLayer.width / 2 + G.gap;
        myCenter = [myComp.width / 2, myComp.height / 2, 0];
        for (var i = 1; i < controlLayers.length; i += 1) {
          switch (myAlignment) {
            case "Top":
              heightAdj =
                -(masterControlLayer.height - controlLayers[i].height) / 2;
              break;
            case "Center":
              heightAdj = 0;
              break;
            case "Bottom":
              heightAdj =
                (masterControlLayer.height - controlLayers[i].height) / 2;
              break;
            default:
              break;
          }
          myX = directionMult * (nextOffset + controlLayers[i].width / 2);
          myY = heightAdj;
          myPos = [myCenter[0] + myX, myCenter[1] + myY, myCenter[2]];
          controlLayers[i].property("Position").setValue(myPos);
          nextOffset += controlLayers[i].width + G.gap;
        }
        break;
      case "Y Line":
        directionMult = myDirection == "Auto" ? 1 : -1 * directionReverse;
        nextOffset = masterControlLayer.height / 2 + G.gap;
        myCenter = [myComp.width / 2, myComp.height / 2, 0];
        for (var i = 1; i < controlLayers.length; i += 1) {
          switch (myAlignment) {
            case "Left":
              widthAdj =
                -(masterControlLayer.width - controlLayers[i].width) / 2;
              break;
            case "Center":
              widthAdj = 0;
              break;
            case "Right":
              widthAdj =
                (masterControlLayer.width - controlLayers[i].width) / 2;
              break;
            default:
              break;
          }
          myX = widthAdj;
          myY = directionMult * (nextOffset + controlLayers[i].height / 2);
          myPos = [myCenter[0] + myX, myCenter[1] + myY, myCenter[2]];
          controlLayers[i].property("Position").setValue(myPos);
          nextOffset += controlLayers[i].height + G.gap;
        }
        break;
      case "Z Line":
        directionMult = myDirection == "Auto" ? -1 : 1 * directionReverse;
        nextOffset = G.gap;
        myCenter = [myComp.width / 2, myComp.height / 2, 0];
        for (var i = 1; i < controlLayers.length; i += 1) {
          switch (myAlignment) {
            case "Left":
              widthAdj =
                -(masterControlLayer.width - controlLayers[i].width) / 2;
              heightAdj = 0;
              break;
            case "Center":
              widthAdj = 0;
              heightAdj = 0;
              break;
            case "Right":
              widthAdj =
                (masterControlLayer.width - controlLayers[i].width) / 2;
              heightAdj = 0;
              break;
            case "Top":
              widthAdj = 0;
              heightAdj =
                -(masterControlLayer.height - controlLayers[i].height) / 2;
              break;
            case "Bottom":
              widthAdj = 0;
              heightAdj =
                (masterControlLayer.height - controlLayers[i].height) / 2;
              break;
            default:
              break;
          }
          myX = widthAdj;
          myY = heightAdj;
          myZ = -directionMult * nextOffset;
          myPos = [myCenter[0] + myX, myCenter[1] + myY, myCenter[2] + myZ];
          controlLayers[i].property("Position").setValue(myPos);
          nextOffset += G.gap;
        }
        break;
      case "Stationary":
        myCenter = [myComp.width / 2, myComp.height / 2, 0];
        for (var i = 1; i < controlLayers.length; i += 1) {
          switch (myAlignment) {
            case "Left":
              widthAdj =
                -(masterControlLayer.width - controlLayers[i].width) / 2;
              heightAdj = 0;
              break;
            case "Center":
              widthAdj = 0;
              heightAdj = 0;
              break;
            case "Right":
              widthAdj =
                (masterControlLayer.width - controlLayers[i].width) / 2;
              heightAdj = 0;
              break;
            case "Top":
              widthAdj = 0;
              heightAdj =
                -(masterControlLayer.height - controlLayers[i].height) / 2;
              break;
            case "Bottom":
              widthAdj = 0;
              heightAdj =
                (masterControlLayer.height - controlLayers[i].height) / 2;
              break;
            default:
              break;
          }
          myX = widthAdj;
          myY = heightAdj;
          myPos = [myCenter[0] + myX, myCenter[1] + myY, myCenter[2]];
          controlLayers[i].property("Position").setValue(myPos);
        }
        break;
      default:
        break;
    }
    prevControlLayer = masterControlLayer;
    for (var i = 1; i < controlLayers.length; i += 1) {
      myControlLayer = controlLayers[i];
      myControlLayer.parent = prevControlLayer;
      prevControlLayer = myControlLayer;
    }
    if (myCenterControlLayer != null) {
      masterControlLayer.parent = myCenterControlLayer;
      myCenterControlLayer.shy = true;
    }
    var myColorArray = [G.currentColor1];
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color2Grp.enableCB.value
    ) {
      myColorArray.push(G.currentColor2);
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color3Grp.enableCB.value
    ) {
      myColorArray.push(G.currentColor3);
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color4Grp.enableCB.value
    ) {
      myColorArray.push(G.currentColor4);
    }
    if (
      G.uiPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
        .color5Grp.enableCB.value
    ) {
      myColorArray.push(G.currentColor5);
    }
    var colorIdx = 0;
    for (var i = 1; i <= myComp.numLayers; i += 1) {
      if (myComp.layer(i).comment == G.TextLayerID) {
        addColors(myComp.layer(i), myColorArray, colorIdx);
        colorIdx++;
      }
    }
    myComp.hideShyLayers = true;
    if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp
        .camIncludeCB.value
    ) {
      MC_buildCamera();
    }
    masterControlLayer.selected = true;
    app.endUndoGroup();
    app.activate();
    myComp.openInViewer();
  }
  function MC_cleanCamera() {
    var myComp = app.project.activeItem;
    if (myComp == null || !(myComp instanceof CompItem)) {
      return;
    }
    var myCam = null;
    var myTarget = null;
    var myLight = null;
    var myMasterControlLayer = null;
    for (var i = 1; i <= myComp.numLayers; i += 1) {
      switch (myComp.layer(i).comment) {
        case G.MasterControlID:
          myMasterControlLayer = myComp.layer(i);
          break;
        case G.MonkeyCamID:
          myCam = myComp.layer(i);
          break;
        case G.MonkeyCamLightID:
          myLight = myComp.layer(i);
          break;
        case G.MonkeyCamTargetID:
          myTarget = myComp.layer(i);
        case G.TextLayerID:
          myLayer = myComp.layer(i);
          mySaveLock = myLayer.locked;
          myLayer.locked = false;
          myProp = myLayer.property("Effects");
          for (var j = 1; j <= myProp.numProperties; j += 1) {
            if (myProp.property(j).matchName == "ADBE Tint") {
              myProp.property(j).remove();
              break;
            }
          }
          for (var j = 1; j <= myProp.numProperties; j += 1) {
            if (myProp.property(j).matchName == "ADBE Geometry2") {
              myProp.property(j).remove();
              break;
            }
          }
          myLayer.locked = mySaveLock;
          break;
        default:
          break;
      }
    }
    if (myLight != null) {
      myLight.locked = false;
      myLight.remove();
    }
    if (myCam != null) {
      myCam.locked = false;
      myCam.remove();
    }
    if (myTarget != null) {
      myTarget.locked = false;
      mySolidSource = myTarget.source;
      myTarget.remove();
      if (mySolidSource.usedIn.length == 0) {
        mySolidSource.remove();
      }
    }
    if (myMasterControlLayer != null) {
      myProp = myMasterControlLayer.property("Effects");
      for (var j = 1; j <= myProp.numProperties; j += 1) {
        if (myProp.property(j).matchName == G.cameraControlsEffectName) {
          myProp.property(j).remove();
          break;
        }
      }
    }
  }
  function MC_addCameraControls(theTarget, theTail, theComp) {
    var theLayers = [];
    var theControlLayer = theTail;
    do {
      theLayers.push(theControlLayer);
      theControlLayer = theControlLayer.parent;
    } while (
      theControlLayer != null &&
      theControlLayer.name != G.centerControlLayerName
    );
    for (var i = theLayers.length - 1; i >= 0; i--) {
      theEffect = theTarget
        .property("Effects")
        .addProperty("ADBE Layer Control");
      theEffect
        .property("ADBE Layer Control-0001")
        .setValue(theLayers[i].index);
      theEffect.name = "Layer " + (theLayers.length - i);
    }
    if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
        .autoDollyDDL.selection.index != G.autoDollyOff
    ) {
      var dollyPct =
        G.autoDollyPct[
          G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
            .autoDollyDDL.selection.index
        ];
      for (var i = theLayers.length - 1; i >= 0; i--) {
        theEffect = theTarget
          .property("Effects")
          .addProperty("ADBE Slider Control");
        theEffect.name = "Dolly " + (theLayers.length - i);
        theLayer = theLayers[i];
        if (theLayer.width / theComp.width > theLayer.height / theComp.height) {
          dollyVal =
            ((theComp.width - theLayer.width / dollyPct) * G.focalLength) /
            G.filmSize;
        } else {
          dollyVal =
            ((theComp.height - theLayer.height / dollyPct) * G.focalLength) /
            ((G.filmSize * theComp.height) / theComp.width);
        }
        theEffect.property("ADBE Slider Control-0001").setValue(dollyVal);
      }
    }
  }
  function MC_buildCamera() {
    function findLayerByComment(theComp, theString) {
      for (var i = 1; i <= theComp.numLayers; i += 1) {
        if (theComp.layer(i).comment.indexOf(theString) > -1) {
          return theComp.layer(i);
        }
      }
      return null;
    }
    var qLib =
      "function _A2M_(_L_,_t_){\r  _x_ = normalize(_L_.toWorldVec([1,0,0],_t_));\r  _y_ = normalize(_L_.toWorldVec([0,1,0],_t_));\r  _z_ = normalize(_L_.toWorldVec([0,0,1],_t_));\r  return [_x_[0],_x_[1],_x_[2],_y_[0],_y_[1],_y_[2],_z_[0],_z_[1],_z_[2]];\r}\rfunction _M2Q_(_m_){\r  _m11_ = _m_[0]; _m12_ = _m_[3]; _m13_ = _m_[6];\r  _m21_ = _m_[1]; _m22_ = _m_[4]; _m23_ = _m_[7];\r  _m31_ = _m_[2]; _m32_ = _m_[5]; _m33_ = _m_[8];\r  _trace_ = _m11_ + _m22_ + _m33_;\r  if ( _trace_ > 0 ) {\r    _s_ = 0.5 / Math.sqrt( _trace_ + 1.0 );\r    _w_ = 0.25 / _s_;\r    _x_ = ( _m32_ - _m23_ ) * _s_;\r    _y_ = ( _m13_ - _m31_ ) * _s_;\r    _z_ = ( _m21_ - _m12_ ) * _s_;\r  } else if (_m11_ > _m22_ && _m11_ > _m33_){\r    _s_ = 2.0 * Math.sqrt(1.0 + _m11_ - _m22_ - _m33_);\r    _w_ = ( _m32_ - _m23_ ) / _s_;\r    _x_ = 0.25 * _s_;\r    _y_ = ( _m12_ + _m21_ ) / _s_;\r    _z_ = ( _m13_ + _m31_ ) / _s_;\r  } else if ( _m22_ > _m33_ ) {\r    _s_ = 2.0 * Math.sqrt( 1.0 + _m22_ - _m11_ - _m33_ );\r    _w_ = ( _m13_ - _m31_ ) / _s_;\r    _x_ = ( _m12_ + _m21_ ) / _s_;\r    _y_ = 0.25 * _s_;\r    _z_ = ( _m23_ + _m32_ ) / _s_;\r  }else{\r    _s_ = 2.0 * Math.sqrt(1.0 + _m33_ - _m11_ - _m22_);\r    _w_ = ( _m21_ - _m12_ )/_s_;\r    _x_ = ( _m13_ + _m31_ )/_s_;\r    _y_ = ( _m23_ + _m32_ )/_s_;\r    _z_ = 0.25*_s_;\r  }\r  return [_w_,_x_,_y_,_z_];\r}\rfunction _slerp_(_qa_,_qb_,_t_){\r  if (_t_ == 0) return _qa_;\r  if (_t_ == 1) return _qb_;\r  _cosHalfTheta_ = _qa_[0]*_qb_[0] + _qa_[1]*_qb_[1] + _qa_[2]*_qb_[2] + _qa_[3]*_qb_[3];\r  if (_cosHalfTheta_ >= 1.0){\r    return _qa_;\r  }\r  _qb2_ = [];\r  if (_cosHalfTheta_ < 0){\r    _qb2_[0] = -_qb_[0];\r    _qb2_[1] = -_qb_[1];\r    _qb2_[2] = -_qb_[2];\r    _qb2_[3] = -_qb_[3];\r    _cosHalfTheta_ = - _cosHalfTheta_;\r  }else{\r    _qb2_[0] = _qb_[0];\r    _qb2_[1] = _qb_[1];\r    _qb2_[2] = _qb_[2];\r    _qb2_[3] = _qb_[3];\r  }\r  _q_ = [];\r  _halfTheta_ = Math.acos(_cosHalfTheta_);\r  _sinHalfTheta_ = Math.sqrt(1.0 - _cosHalfTheta_ * _cosHalfTheta_);\r  if (Math.abs( _sinHalfTheta_ ) < 0.001){\r    _q_[0] = 0.5*(_qa_[0] + _qb2_[0]);\r    _q_[1] = 0.5*(_qa_[1] + _qb2_[1]);\r    _q_[2] = 0.5*(_qa_[2] + _qb2_[2]);\r    _q_[3] = 0.5*(_qa_[3] + _qb2_[3]);\r    return _q_;\r  }\r  _ratioA_ = Math.sin((1 - _t_)*_halfTheta_)/_sinHalfTheta_;\r  _ratioB_ = Math.sin(_t_*_halfTheta_)/_sinHalfTheta_;\r  _q_[0] = (_qa_[0]*_ratioA_ + _qb2_[0]*_ratioB_);\r  _q_[1] = (_qa_[1]*_ratioA_ + _qb2_[1]*_ratioB_);\r  _q_[2] = (_qa_[2]*_ratioA_ + _qb2_[2]*_ratioB_);\r  _q_[3] = (_qa_[3]*_ratioA_ + _qb2_[3]*_ratioB_);\r  return _q_;\r}\rfunction _Q2M_(_q_){\r  _x_ = _q_[1]; _y_ = _q_[2]; _z_ = _q_[3];_w_ = _q_[0];\r  _x2_ = _x_ + _x_;_y2_ = _y_ + _y_; _z2_ = _z_ + _z_;\r  _xx_ = _x_ *_x2_; _xy_ = _x_ * _y2_; _xz_ = _x_ * _z2_;\r  _yy_ = _y_ * _y2_; _yz_ = _y_ * _z2_; _zz_ = _z_ * _z2_;\r  _wx_ = _w_ * _x2_; _wy_ = _w_ * _y2_; _wz_ = _w_ * _z2_;\r  _qm_ = [];\r  _qm_[0] = 1 - ( _yy_ + _zz_ );\r  _qm_[3] = _xy_ - _wz_;\r  _qm_[6] = _xz_ + _wy_;\r  _qm_[1] = _xy_ + _wz_;\r  _qm_[4] = 1 - ( _xx_ + _zz_ );\r  _qm_[7] = _yz_ - _wx_;\r  _qm_[2] = _xz_ - _wy_;\r  _qm_[5] = _yz_ + _wx_;\r  _qm_[8] = 1 - ( _xx_ + _yy_ );\r  return _qm_;\r}\rfunction _M2E_(_m_){\r  _m11_ = _m_[0]; _m12_ = _m_[3]; _m13_ = _m_[6];\r  _m21_ = _m_[1]; _m22_ = _m_[4]; _m23_ = _m_[7];\r  _m31_ = _m_[2]; _m32_ = _m_[5]; _m33_ = _m_[8];\r  _y_ = Math.asin( clamp( _m13_, - 1, 1 ) );\r  if ( Math.abs( _m13_ ) < 0.99999 ) {\r    _x_ = Math.atan2( - _m23_, _m33_ );\r    _z_ = Math.atan2( - _m12_, _m11_ );\r  } else {\r    _x_ = Math.atan2( _m32_, _m22_ );\r    _z_ = 0;\r  }\r  return [radiansToDegrees(_x_),radiansToDegrees(_y_),radiansToDegrees(_z_)];\r}\r";
    var oTable = [
      "_A2M_",
      "_L_",
      "_t_",
      "_x_",
      "_y_",
      "_z_",
      "_M2Q_",
      "_m_",
      "_m11_",
      "_m12_",
      "_m13_",
      "_m21_",
      "_m22_",
      "_m23_",
      "_m31_",
      "_m32_",
      "_m33_",
      "_trace_",
      "_s_",
      "_w_",
      "_slerp_",
      "_qa_",
      "_qb_",
      "_cosHalfTheta_",
      "_qb2_",
      "_q_",
      "_halfTheta_",
      "_sinHalfTheta_",
      "_ratioA_",
      "_ratioB_",
      "_Q2M_",
      "_x2_",
      "_xx_",
      "_yy_",
      "_wx_",
      "_y2_",
      "_z2_",
      "_xy_",
      "_xz_",
      "_yz_",
      "_zz_",
      "_wy_",
      "_wz_",
      "_qm_",
      "_M2E_",
      "_dTime_",
      "_tm1_",
      "_tm2_",
      "_tq1_",
      "_tq2_",
      "_pct_",
      "_tq_",
      "_tm_",
    ];
    var pTable = [
      "_gv_",
      "_dTime_",
      "_v13_",
      "_v24_",
      "_aCos_",
      "_v1_",
      "_v2_",
      "_v3_",
      "_v4_",
      "_p0_",
      "_p1_",
      "_p2_",
      "_p3_",
      "_vTemp_",
      "_lTemp_",
      "_pTemp_",
      "_nTemp_",
    ];
    var linearOrientExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (m.key(n).time > _dTime_) n--;\r" +
      "  if (n == 0){\r" +
      '    _M2E_(_A2M_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time));\r' +
      "  }else if (n == m.numKeys){\r" +
      '    _M2E_(_A2M_(effect("Layer " + (m.numKeys))("ADBE Layer Control-0001"),m.key(m.numKeys).time));\r' +
      "  }else{\r" +
      '    _tm1_ = _A2M_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      '    _tm2_ = _A2M_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "    _tq1_ = _M2Q_(_tm1_);\r" +
      "    _tq2_ = _M2Q_(_tm2_);\r" +
      "    _pct_ = linear(_dTime_,m.key(n).time,m.key(n+1).time,0,1);\r" +
      "    _tq_ = _slerp_(_tq1_,_tq2_,_pct_);\r" +
      "    _tm_ = _Q2M_(_tq_);\r" +
      "    _M2E_(_tm_);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var smoothOrientExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (m.key(n).time > _dTime_) n--;\r" +
      "  if (n == 0){\r" +
      '    _M2E_(_A2M_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time));\r' +
      "  }else if (n == m.numKeys){\r" +
      '    _M2E_(_A2M_(effect("Layer " + (m.numKeys))("ADBE Layer Control-0001"),m.key(m.numKeys).time));\r' +
      "  }else{\r" +
      '    _tm1_ = _A2M_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      '    _tm2_ = _A2M_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "    _tq1_ = _M2Q_(_tm1_);\r" +
      "    _tq2_ = _M2Q_(_tm2_);\r" +
      "    _pct_ = ease(_dTime_,m.key(n).time,m.key(n+1).time,0,1);\r" +
      "    _tq_ = _slerp_(_tq1_,_tq2_,_pct_);\r" +
      "    _tm_ = _Q2M_(_tq_);\r" +
      "    _M2E_(_tm_);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var posExpr =
      "function _gv_(TL,t){\r  return TL.toWorld(TL.anchorPoint,t);\r}\r";
    var smoothPosExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (m.key(n).time > _dTime_) n--;\r" +
      "  if (n == 0){\r" +
      '    _gv_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else if (n == m.numKeys){\r" +
      '    _gv_(effect("Layer " + (m.numKeys))("ADBE Layer Control-0001"),m.key(m.numKeys).time);\r' +
      "  }else{\r" +
      '    _v2_ = _gv_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      '    _v3_ = _gv_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "    if (length(_v3_-_v2_) > .001){\r" +
      "      _p0_ = _v2_;\r" +
      "      _p3_ = _v3_;\r" +
      "      if (m.numKeys == 2){\r" +
      "        _p1_ = _p0_;\r" +
      "        _p2_ = _p3_;\r" +
      "      }else if (n == 1){\r" +
      '        _v4_ = _gv_(effect("Layer " + (n+2))("ADBE Layer Control-0001"),m.key(n+2).time);\r' +
      "        _v24_ = _v4_-_v2_;\r" +
      "        _p2_ = _p3_ - _v24_/6;\r" +
      "        _vTemp_ = -_v24_/6;\r" +
      "        _lTemp_ = length(_vTemp_);\r" +
      "        if (_lTemp_ > .001){\r" +
      "          _nTemp_ = normalize(_vTemp_);\r" +
      "          _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "          len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "          _pTemp_ = _v3_ - _nTemp_*len;\r" +
      "          _p1_ = _v2_ + normalize(_pTemp_ - _v2_)*_lTemp_;\r" +
      "        }else{\r" +
      "          _p1_ = _p0_;\r" +
      "        }\r" +
      "      }else if (n == m.numKeys-1){\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _vTemp_ = _v13_/6;\r" +
      "        _lTemp_ = length(_vTemp_);\r" +
      "        if (_lTemp_ > .001){\r" +
      "          _nTemp_ = normalize(_vTemp_);\r" +
      "          _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "          len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "          _pTemp_ = _v2_ + _nTemp_*len;\r" +
      "          _p2_ = _v3_ + normalize(_pTemp_ - _v3_)*_lTemp_;\r" +
      "        }else{\r" +
      "          _p2_ = _p3_;\r" +
      "        }\r" +
      "      }else{\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '        _v4_ = _gv_(effect("Layer " + (n+2))("ADBE Layer Control-0001"),m.key(n+2).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _v24_ = _v4_-_v2_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _p2_ = _p3_ - _v24_/6;\r" +
      "      }\r" +
      "      c = 3*(_p1_ - _p0_);\r" +
      "      b = 3*(_p2_ - _p1_) - c;\r" +
      "      a = _p3_ - _p0_ - c - b;\r" +
      "      t = ease(_dTime_,m.key(n).time,m.key(n+1).time,0,1);\r" +
      "      ((a*t +b )*t + c)*t + _p0_;\r" +
      "    }else{\r" +
      "      _v2_;\r" +
      "    }\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var linearPosExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (m.key(n).time > _dTime_) n--;\r" +
      "  if (n == 0){\r" +
      '    _gv_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else if (n == m.numKeys){\r" +
      '    _gv_(effect("Layer " + (m.numKeys))("ADBE Layer Control-0001"),m.key(m.numKeys).time);\r' +
      "  }else{\r" +
      '    _v2_ = _gv_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      '    _v3_ = _gv_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "    if (length(_v3_-_v2_) > .001){\r" +
      "      _p0_ = _v2_;\r" +
      "      _p3_ = _v3_;\r" +
      "      if (m.numKeys == 2){\r" +
      "        _p1_ = _p0_;\r" +
      "        _p2_ = _p3_;\r" +
      "      }else if (n == 1){\r" +
      '        _v4_ = _gv_(effect("Layer " + (n+2))("ADBE Layer Control-0001"),m.key(n+2).time);\r' +
      "        _v24_ = _v4_-_v2_;\r" +
      "        _p2_ = _p3_ - _v24_/6;\r" +
      "        _vTemp_ = -_v24_/6;\r" +
      "        _lTemp_ = length(_vTemp_);\r" +
      "        if (_lTemp_ > .001){\r" +
      "          _nTemp_ = normalize(_vTemp_);\r" +
      "          _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "          len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "          _pTemp_ = _v3_ - _nTemp_*len;\r" +
      "          _p1_ = _v2_ + normalize(_pTemp_ - _v2_)*_lTemp_;\r" +
      "        }else{\r" +
      "          _p1_ = _p0_;\r" +
      "        }\r" +
      "      }else if (n == m.numKeys-1){\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _vTemp_ = _v13_/6;\r" +
      "        _lTemp_ = length(_vTemp_);\r" +
      "        if (_lTemp_ > .001){\r" +
      "          _nTemp_ = normalize(_vTemp_);\r" +
      "          _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "          len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "          _pTemp_ = _v2_ + _nTemp_*len;\r" +
      "          _p2_ = _v3_ + normalize(_pTemp_ - _v3_)*_lTemp_;\r" +
      "        }else{\r" +
      "          _p2_ = _p3_;\r" +
      "        }\r" +
      "      }else{\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '        _v4_ = _gv_(effect("Layer " + (n+2))("ADBE Layer Control-0001"),m.key(n+2).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _v24_ = _v4_-_v2_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _p2_ = _p3_ - _v24_/6;\r" +
      "      }\r" +
      "      c = 3*(_p1_ - _p0_);\r" +
      "      b = 3*(_p2_ - _p1_) - c;\r" +
      "      a = _p3_ - _p0_ - c - b;\r" +
      "      t = linear(_dTime_,m.key(n).time,m.key(n+1).time,0,1);\r" +
      "      ((a*t +b )*t + c)*t + _p0_;\r" +
      "    }else{\r" +
      "      _v2_;\r" +
      "    }\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var myIdx =
      G.uiPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp
        .timeStretchDDL.selection.index;
    var dMult = G.timeStretchValues[myIdx];
    var d1 = G.stopAndGoPre * dMult;
    var d2 = G.stopAndGoDur * dMult - d1;
    var stopAndGoOrientExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (n == 1){\r" +
      '    _M2E_(_A2M_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time));\r' +
      "  }else{\r" +
      '    _tm1_ = _A2M_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '    _tm2_ = _A2M_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      "    _tq1_ = _M2Q_(_tm1_);\r" +
      "    _tq2_ = _M2Q_(_tm2_);\r" +
      "    _pct_ = ease(_dTime_,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",0,1);\r" +
      "    _tq_ = _slerp_(_tq1_,_tq2_,_pct_);\r" +
      "    _tm_ = _Q2M_(_tq_);\r" +
      "    _M2E_(_tm_);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var linearStopAndGoOrientExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (n == 1){\r" +
      '    _M2E_(_A2M_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time));\r' +
      "  }else{\r" +
      '    _tm1_ = _A2M_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '    _tm2_ = _A2M_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      "    _tq1_ = _M2Q_(_tm1_);\r" +
      "    _tq2_ = _M2Q_(_tm2_);\r" +
      "    _pct_ = linear(_dTime_,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",0,1);\r" +
      "    _tq_ = _slerp_(_tq1_,_tq2_,_pct_);\r" +
      "    _tm_ = _Q2M_(_tq_);\r" +
      "    _M2E_(_tm_);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var stopAndGoPosExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (n == 1){\r" +
      '    _gv_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else{\r" +
      '    _v2_ = _gv_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '    _v3_ = _gv_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      "    if (length(_v3_-_v2_) > .001){\r" +
      "      _p0_ = _v2_;\r" +
      "      _p3_ = _v3_;\r" +
      "      if (n == 2){\r" +
      "        if (m.numKeys == 2){\r" +
      "          _p1_ = _p0_;\r" +
      "          _p2_ = _p3_;\r" +
      "        }else{\r" +
      '          _v4_ = _gv_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "          _v24_ = _v4_-_v2_;\r" +
      "          _p2_ = _p3_ - _v24_/6;\r" +
      "          _vTemp_ = -_v24_/6;\r" +
      "          _lTemp_ = length(_vTemp_);\r" +
      "          if (_lTemp_ > .001){\r" +
      "            _nTemp_ = normalize(_vTemp_);\r" +
      "            _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "            len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "            _pTemp_ = _v3_ - _nTemp_*len;\r" +
      "            _p1_ = _v2_ + normalize(_pTemp_ - _v2_)*_lTemp_;\r" +
      "          }else{\r" +
      "            _p1_ = _p0_;\r" +
      "          }\r" +
      "        }\r" +
      "      }else if (n == m.numKeys){\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-2))("ADBE Layer Control-0001"),m.key(n-2).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _vTemp_ = _v13_/6;\r" +
      "        _lTemp_ = length(_vTemp_);\r" +
      "        if (_lTemp_ > .001){\r" +
      "          _nTemp_ = normalize(_vTemp_);\r" +
      "          _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "          len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "          _pTemp_ = _v2_ + _nTemp_*len;\r" +
      "          _p2_ = _v3_ + normalize(_pTemp_ - _v3_)*_lTemp_;\r" +
      "        }else{\r" +
      "          _p2_ = _p3_;\r" +
      "        }\r" +
      "      }else{\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-2))("ADBE Layer Control-0001"),m.key(n-2).time);\r' +
      '        _v4_ = _gv_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _v24_ = _v4_-_v2_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _p2_ = _p3_ - _v24_/6;\r" +
      "      }\r" +
      "      c = 3*(_p1_ - _p0_);\r" +
      "      b = 3*(_p2_ - _p1_) - c;\r" +
      "      a = _p3_ - _p0_ - c - b;\r" +
      "      t = ease(_dTime_,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",0,1);\r" +
      "      ((a*t +b )*t + c)*t + _p0_;\r" +
      "    }else{\r" +
      "      _v2_;\r" +
      "    }\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var linearStopAndGoPosExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  _dTime_ = time;\r" +
      "  n = m.nearestKey(_dTime_).index;\r" +
      "  if (n == 1){\r" +
      '    _gv_(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else{\r" +
      '    _v2_ = _gv_(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '    _v3_ = _gv_(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      "    if (length(_v3_-_v2_) > .001){\r" +
      "      _p0_ = _v2_;\r" +
      "      _p3_ = _v3_;\r" +
      "      if (n == 2){\r" +
      "        if (m.numKeys == 2){\r" +
      "          _p1_ = _p0_;\r" +
      "          _p2_ = _p3_;\r" +
      "        }else{\r" +
      '          _v4_ = _gv_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "          _v24_ = _v4_-_v2_;\r" +
      "          _p2_ = _p3_ - _v24_/6;\r" +
      "          _vTemp_ = -_v24_/6;\r" +
      "          _lTemp_ = length(_vTemp_);\r" +
      "          if (_lTemp_ > .001){\r" +
      "            _nTemp_ = normalize(_vTemp_);\r" +
      "            _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "            len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "            _pTemp_ = _v3_ - _nTemp_*len;\r" +
      "            _p1_ = _v2_ + normalize(_pTemp_ - _v2_)*_lTemp_;\r" +
      "          }else{\r" +
      "            _p1_ = _p0_;\r" +
      "          }\r" +
      "        }\r" +
      "      }else if (n == m.numKeys){\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-2))("ADBE Layer Control-0001"),m.key(n-2).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _vTemp_ = _v13_/6;\r" +
      "        _lTemp_ = length(_vTemp_);\r" +
      "        if (_lTemp_ > .001){\r" +
      "          _nTemp_ = normalize(_vTemp_);\r" +
      "          _aCos_ = dot(normalize(_v3_-_v2_),_nTemp_);\r" +
      "          len = (length(_v3_-_v2_)/2)/_aCos_;\r" +
      "          _pTemp_ = _v2_ + _nTemp_*len;\r" +
      "          _p2_ = _v3_ + normalize(_pTemp_ - _v3_)*_lTemp_;\r" +
      "        }else{\r" +
      "          _p2_ = _p3_;\r" +
      "        }\r" +
      "      }else{\r" +
      '        _v1_ = _gv_(effect("Layer " + (n-2))("ADBE Layer Control-0001"),m.key(n-2).time);\r' +
      '        _v4_ = _gv_(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "        _v13_ = _v3_-_v1_;\r" +
      "        _v24_ = _v4_-_v2_;\r" +
      "        _p1_ = _p0_ + _v13_/6;\r" +
      "        _p2_ = _p3_ - _v24_/6;\r" +
      "      }\r" +
      "      c = 3*(_p1_ - _p0_);\r" +
      "      b = 3*(_p2_ - _p1_) - c;\r" +
      "      a = _p3_ - _p0_ - c - b;\r" +
      "      t = linear(_dTime_,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",0,1);\r" +
      "      ((a*t +b )*t + c)*t + _p0_;\r" +
      "    }else{\r" +
      "      _v2_;\r" +
      "    }\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var smoothDollyExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  dTime = time;\r" +
      "  n = m.nearestKey(dTime).index;\r" +
      "  if (m.key(n).time > dTime) n--;\r" +
      "  if (n == 0){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else if (n == m.numKeys){\r" +
      '    d = parent.effect("Dolly " + (m.numKeys))("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + (n+1))("ADBE Slider Control-0001");\r' +
      "    d = ease(dTime,m.key(n).time,m.key(n+1).time,v1,v2);\r" +
      "  }\r" +
      "  value + [0,0,d];\r" +
      "}else\r" +
      "  value";
    var linearDollyExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  dTime = time;\r" +
      "  n = m.nearestKey(dTime).index;\r" +
      "  if (m.key(n).time > dTime) n--;\r" +
      "  if (n == 0){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else if (n == m.numKeys){\r" +
      '    d = parent.effect("Dolly " + (m.numKeys))("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + (n+1))("ADBE Slider Control-0001");\r' +
      "    d = linear(dTime,m.key(n).time,m.key(n+1).time,v1,v2);\r" +
      "  }\r" +
      "  value + [0,0,d];\r" +
      "}else\r" +
      "  value";
    var stopAndGoDollyExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  dTime = time;\r" +
      "  n = m.nearestKey(dTime).index;\r" +
      "  if (n == 1){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + (n-1))("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      "    d = ease(dTime,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",v1,v2);\r" +
      "  }\r" +
      "  value + [0,0,d];\r" +
      "}else\r" +
      "  value";
    var linearStopAndGoDollyExpr =
      'L = thisComp.layer("' +
      G.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  dTime = time;\r" +
      "  n = m.nearestKey(dTime).index;\r" +
      "  if (n == 1){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + (n-1))("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      "    d = linear(dTime,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",v1,v2);\r" +
      "  }\r" +
      "  value + [0,0,d];\r" +
      "}else\r" +
      "  value";
    if (
      app.project.activeItem == null ||
      !(app.project.activeItem instanceof CompItem)
    ) {
      alert("No comp active.");
      return;
    }
    var myComp = app.project.activeItem;
    var myMasterControlLayer = myComp.layer(G.masterControlLayerName);
    var myCameraPresetPath =
      File($.fileName).path + "/" + escape(G.cameraPresetName);
    CM_deselectAll(myComp);
    myMasterControlLayer.selected = true;
    if (parseFloat(app.version, 10) < 12.1) {
      app.beginSuppressDialogs();
    }
    myMasterControlLayer.applyPreset(File(myCameraPresetPath));
    if (parseFloat(app.version, 10) < 12.1) {
      app.endSuppressDialogs(false);
    }
    var myTail = findLayerByComment(myComp, G.LastControlID);
    if (myTail == null) {
      myTail = findLayerByComment(myComp, G.MasterControlID);
    }
    if (myTail == null) {
      alert("Nothing to update.");
      return;
    }
    var myTarget = myComp.layers.addNull(myComp.duration);
    myTarget.startTime = 0;
    myTarget.name = G.targetLayerName;
    myTarget.source.name = G.targetLayerName;
    myTarget.comment = G.MonkeyCamTargetID;
    myTarget.label = G.MonkeyCamTargetColor;
    myTarget.threeDLayer = true;
    myTarget.enabled = false;
    var myCam = myComp.layers.addCamera(G.cameraName, [
      myComp.width / 2,
      myComp.height / 2,
    ]);
    myCam.startTime = 0;
    myCam.outPoint = myComp.duration;
    myCam.comment = G.MonkeyCamID;
    myCam.label = G.MonkeyCamColor;
    var myZoom = (G.focalLength / G.filmSize) * myComp.width;
    myCam
      .property("Position")
      .setValue([myComp.width / 2, myComp.height / 2, -myZoom]);
    myCam.property("Zoom").setValue(myZoom);
    myCam.property("Focus Distance").setValue(myZoom);
    var zoomOffsetExpr =
      G.exprHeader +
      'value + thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.ZoomOffsetName +
      '").value;';
    myCam.property("Zoom").expression = zoomOffsetExpr;
    var focusDistanceOffsetExpr =
      G.exprHeader +
      "Math.abs(transform.position[2]) + \r" +
      'thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.FocusDistanceOffsetName +
      '").value +\r' +
      'thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.ZPositionOffsetName +
      '").value +\r' +
      'thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.textControlsEffectName +
      '").param(' +
      G.textZPositionOffsetIdx +
      ").value;";
    myCam.property("Focus Distance").expression = focusDistanceOffsetExpr;
    var dofExpr =
      G.exprHeader +
      'thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.enableDOFName +
      '").value;';
    var apertureExpr =
      G.exprHeader +
      'a = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.DOFIntensityName +
      '").value;\r' +
      "easeIn(a,0," +
      G.depthOfFieldMaxValue +
      ",0,2000);";
    myCam.property("Depth of Field").expression = dofExpr;
    myCam.property("Aperture").expression = apertureExpr;
    myCam.parent = myTarget;
    myCam.shy = true;
    myCam.selected = false;
    if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.lightGrp.CB.value
    ) {
      var myCamLight = myComp.layers.addLight(G.cameraLightName, [
        myComp.width / 2,
        myComp.height / 2,
      ]);
      myCamLight.lightType = LightType.POINT;
      myCamLight
        .property("Position")
        .setValue([myComp.width / 2, myComp.height / 2, -myZoom]);
      myCamLight.moveAfter(myCam);
      myCamLight.startTime = 0;
      myCamLight.outPoint = myComp.duration;
      myCamLight.comment = G.MonkeyCamLightID;
      myCamLight.label = G.MonkeyCamColor;
      myCamLight.parent = myCam;
      myCamLight.shy = true;
      myCamLight.locked = true;
      myCamLight.selected = false;
    }
    MC_addCameraControls(myTarget, myTail, myComp);
    for (var i = 1; i <= myComp.numLayers; i += 1) {
      if (myComp.layer(i).comment == G.TextLayerID) {
        myLockSave = myComp.layer(i).locked;
        myComp.layer(i).locked = false;
        CM_addVisibility(myComp.layer(i));
        CM_addFog(myComp.layer(i));
        myComp.layer(i).locked = myLockSave;
      }
    }
    var posOffsetExpr =
      G.exprHeader +
      'x = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.XPositionOffsetName +
      '").value;\r' +
      'y = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.YPositionOffsetName +
      '").value;\r' +
      'z = thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.ZPositionOffsetName +
      '").value;\r' +
      "value + [x,y,z]";
    myTarget.property("Anchor Point").expression = posOffsetExpr;
    var xRotOffsetExpr =
      G.exprHeader +
      'value + thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.XRotationOffsetName +
      '").value;';
    myTarget.property("X Rotation").expression = xRotOffsetExpr;
    var yRotOffsetExpr =
      G.exprHeader +
      'value + thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.YRotationOffsetName +
      '").value;';
    myTarget.property("Y Rotation").expression = yRotOffsetExpr;
    var zRotOffsetExpr =
      G.exprHeader +
      'value + thisComp.layer("' +
      G.masterControlLayerName +
      '")("ADBE Effect Parade")("' +
      G.cameraControlsEffectName +
      '")("' +
      G.ZRotationOffsetName +
      '").value;';
    myTarget.property("Z Rotation").expression = zRotOffsetExpr;
    if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
        .movementDDL.selection.index == G.easeAndPauseIdx
    ) {
      comExpr = stopAndGoPosExpr;
      myTarget.property("Orientation").expression =
        G.exprHeader + obfuscateExpr(qLib + stopAndGoOrientExpr, oTable);
    } else if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
        .movementDDL.selection.index == G.easeIdx
    ) {
      comExpr = smoothPosExpr;
      myTarget.property("Orientation").expression =
        G.exprHeader + obfuscateExpr(qLib + smoothOrientExpr, oTable);
    } else if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
        .movementDDL.selection.index == G.linearAndPauseIdx
    ) {
      comExpr = linearStopAndGoPosExpr;
      myTarget.property("Orientation").expression =
        G.exprHeader + obfuscateExpr(qLib + linearStopAndGoOrientExpr, oTable);
    } else {
      comExpr = linearPosExpr;
      myTarget.property("Orientation").expression =
        G.exprHeader + obfuscateExpr(qLib + linearOrientExpr, oTable);
    }
    myTarget.property("Position").expression =
      G.exprHeader + obfuscateExpr(posExpr + comExpr, pTable);
    if (
      G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
        .autoDollyDDL.selection.index != G.autoDollyOff
    ) {
      if (
        G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
          .movementDDL.selection.index == G.easeAndPauseIdx
      ) {
        myCam.property("Position").expression =
          G.exprHeader + stopAndGoDollyExpr;
      } else if (
        G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
          .movementDDL.selection.index == G.easeIdx
      ) {
        myCam.property("Position").expression = G.exprHeader + smoothDollyExpr;
      } else if (
        G.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
          .movementDDL.selection.index == G.linearAndPauseIdx
      ) {
        myCam.property("Position").expression =
          G.exprHeader + linearStopAndGoDollyExpr;
      } else {
        myCam.property("Position").expression = G.exprHeader + linearDollyExpr;
      }
    }
    myTarget.locked = true;
    myTarget.shy = true;
    CM_deselectAll(myComp);
    myMasterControlLayer.selected = true;
  }
  function CM_buildPal(theObj) {
    function buildUI(theObj) {
      var myPal =
        theObj instanceof Panel
          ? theObj
          : new Window("palette", "CircusMonkey", undefined, {
              resizeable: true,
            });
      if (myPal != null) {
        var myResource =
          "group {\n\t\t\t\t\t\torientation: \'column\', alignment:\'left\', alignChildren:\'fill\', margins: 0, spacing: 7, \n\t\t\t\t\t\tlogoHelpGrp: Group {orientation: \'row\', spacing: 0, margins: 0, \n\t\t\t\t\t\t\tlogoGrp: Group {spacing: 0, margins: 0}, \n\t\t\t\t\t\t\thelpGrp: Group {orientation: \'column\', alignment: [\'right\',\'fill\'], spacing: 0, margins: [10,0,0,0], \n\t\t\t\t\t\t\t\thelpBtn: Button {preferredSize: [20,20], text: \'?\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\ttextPnl: Panel {orientation: \'column\', alignChildren:[\'center\',\'fill\'], spacing: 0, margins: 2, \n\t\t\t\t\t\t\ttxt: EditText {preferredSize: [420,120], text: \'Enter text here and click DO" +
          String.fromCharCode(160) +
          "IT!\', properties:{multiline:true}}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\tbuttonsGrp: Group {orientation: \'row\', alignChildren: [\'fill\',\'fill\'], spacing: 15, margins: 0, \n\t\t\t\t\t\t\tloadSaveGrp: Group {orientation: \'row\', alignment: [\'left\',\'fill\'], alignChildren: [\'left\',\'fill\'], spacing: 15, margins: [10,4,10,4], \n\t\t\t\t\t\t\t\tsaveBtn: Button {preferredSize: [80,-1],text: \'Save\', alignment: [\'left\',\'center\']}, \n\t\t\t\t\t\t\t\tloadBtn: Button {preferredSize: [80,-1], text: \'Load\', alignment: [\'left\',\'center\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\tbuildGrp: Group {orientation: \'row\', alignment: [\'right\',\'top\'], alignChildren: [\'fill\',\'right\'], spacing: 10, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\tunbuildBtn: Button {preferredSize: [80,-1],text: \'Undo it\', alignment: [\'right\',\'center\']}, \n\t\t\t\t\t\t\t\tbuildBtnPnl: Panel{orientation: \'column\', margins: 7, \n\t\t\t\t\t\t\t\t\tbuildBtn: Button {preferredSize: [80,-1], text: \'DO IT!\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\tcontrolsGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'fill\'], spacing: 15, margins: 0, \n\t\t\t\t\t\t\tleftControlsGrp: Group {orientation: \'column\', alignment: [\'left\',\'top\'], alignChildren:[\'fill\',\'top\'], spacing: 7, margins: 0, \n\t\t\t\t\t\t\t\tlayoutPnl: Panel {orientation: \'column\', alignChildren:[\'right\',\'top\'], alignment: [\'fill\',\'top\'], text: \'LAYOUT\', spacing: 0, margins: [10,6,10,4], \n\t\t\t\t\t\t\t\t\tshapeGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tLabel: StaticText {text: \'Text Rig\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'left\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\talignmentGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tLabel: StaticText {text: \'Word Alignment\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'left\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tdirectionGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tLabel: StaticText {text: \'Direction\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'left\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tseparationGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Spacing (pixels)\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'0\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\twrapAmountGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tLabel: StaticText {text: \'Circle Wrap\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'left\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tequalizeGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Equalize\'}, \n\t\t\t\t\t\t\t\t\t\tequalizeCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t},\n\t\t\t\t\t\t\t\ttypeAttributesPnl: Panel {orientation: \'column\', alignChildren:[\'right\',\'top\'], text: \'TYPE ATTRIBUTES\', spacing: 0, margins: [10,6,10,4], \n\t\t\t\t\t\t\t\t\ttextOnlyGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Create Text Layers Only\'}, \n\t\t\t\t\t\t\t\t\t\ttextOnlyCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tallCapsGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'top\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'All Caps\'}, \n\t\t\t\t\t\t\t\t\t\tallCapsCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tfontSizeGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tfontSizeLabel: StaticText {text: \'Font Size\'}, \n\t\t\t\t\t\t\t\t\t\tfontSizeDDL: DropDownList {alignment: \'left\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tsizeGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {justify: \'right\', text: \'Size\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'250\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tminGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {justify: \'right\', text: \'Minimum\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'32\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmaxGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Maximum\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'250\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tcolorPaletteLabelGrp: Group {orientation: \'row\', alignChildren:\'right\', spacing: 0, margins: 2, \n\t\t\t\t\t\t\t\t\t\tcolorPalettelabel: StaticText {text: \'Color Palette\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tcolorGrp: Group {orientation: \'row\', alignChildren:\'left\', spacing: 6, margins: 2, \n\t\t\t\t\t\t\t\t\t\tcolor1Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:true}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor2Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor3Grp: Group {orientation: \'column\',  \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor4Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor5Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false, alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tkulerBtn: Button {preferredSize: [20,20],text: \'K\', alignment: [\'left\',\'top\']}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\trightControlsGrp: Group {orientation: \'column\', alignment:[\'fill\',\'fill\'] , alignChildren:[\'fill\',\'bottom\'], spacing: 7, margins: 0, \n\t\t\t\t\t\t\t\tanimationPnl: Panel {orientation: \'column\', alignChildren:[\'right\',\'top\'], text: \'TYPE ANIMATION\', spacing: 0, margins: [10,10,10,4], \n\t\t\t\t\t\t\t\t\ttransitionInGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Transition In\'}, \n\t\t\t\t\t\t\t\t\t\tanimationDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\ttimeStretchGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\ttimeStretchLabel: StaticText {text: \'Speed\'}, \n\t\t\t\t\t\t\t\t\t\ttimeStretchDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tenableBlurGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Motion Blur\'}, \n\t\t\t\t\t\t\t\t\t\tenableBlurCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacer1Pnl: Panel {preferredSize: [160,0], alignment: [\'center\',\'center\'], margins: 15}, \n\t\t\t\t\t\t\t\t\tspacer1Grp: Group {preferredSize: [5,5], alignment: [\'center\',\'center\'], margins: 15}, \n\t\t\t\t\t\t\t\t\ttransitionOutGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Transition Out\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\ttransitionOutDelayGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Delay (Frames)\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tfadeDurationGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Fade Duration\'}, \n\t\t\t\t\t\t\t\t\t\tDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tmarkerPnl: Panel {orientation: \'column\', alignChildren:[\'right\',\'top\'], text: \'MARKERS\', spacing: 0, margins: [10,10,10,4], \n\t\t\t\t\t\t\t\t\tdurationGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Time Span\'}, \n\t\t\t\t\t\t\t\t\t\tdurationDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmarkerSyncGrp: Group {orientation: \'column\', alignChildren:[\'right\',\'top\'], spacing: 0, \n\t\t\t\t\t\t\t\t\t\tmarkerSyncCBGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'top\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Marker Sync\'}, \n\t\t\t\t\t\t\t\t\t\t\tmarkerSyncCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tmessage: StaticText {text: \'Please select a marker guide layer\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tmonkeyCamPnl: Panel {orientation: \'column\', alignment: [\'fill\',\'bottom\'], alignChildren:[\'right\',\'top\'], text: \'MONKEY CAM\', spacing: 0, margins: [10,5,10,4], \n\t\t\t\t\t\t\t\t\tcamIncludeGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: [2,2,0,2], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Include Camera\'}, \n\t\t\t\t\t\t\t\t\t\tcamIncludeCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmovementGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tmovemmetLabel: StaticText {text: \'Movement\'}, \n\t\t\t\t\t\t\t\t\t\tmovementDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tautoRotateGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tautoRotateLabel: StaticText {text: \'Auto Rotate\'}, \n\t\t\t\t\t\t\t\t\t\tautoRotateDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tautoDollyGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tautoDollyLabel: StaticText {text: \'Auto Frame\'}, \n\t\t\t\t\t\t\t\t\t\tautoDollyDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tlightGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: [2,2,2,6], \n\t\t\t\t\t\t\t\t\t\tLabel: StaticText {text: \'Include Camera Light\'}, \n\t\t\t\t\t\t\t\t\t\tCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tupdateBtn: Button {text: \'Update Cam\', alignment: \'right\', margins: 2}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t},\n\t\t\t\t\t\t},\n\t\t\t\t\t}";
        myPal.grp = myPal.add(myResource);
        var myBinary = [__BLOB__BLOB_000012__];
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
        myPal.grp.logoHelpGrp.helpGrp.keyBtn =
          myPal.grp.logoHelpGrp.helpGrp.add(
            "button",
            undefined,
            String.fromCharCode(9733),
          );
        myPal.grp.logoHelpGrp.helpGrp.keyBtn.preferredSize = [20, 20];
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.textOnlyGrp.textOnlyCB.onClick =
          CM_clickTextOnlyCB;
        var g =
          myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color1Grp.colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, G.defColor1);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, G.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.onDraw =
          CM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.colorBtn.onClick =
          CM_clickSwatch1;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.enableCB.enabled = false;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color1Grp.enableCB.visible = false;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color2Grp.colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, G.defColor2);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, G.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.onDraw =
          CM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.colorBtn.onClick =
          CM_clickSwatch2;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color2Grp.enableCB.onClick =
          CM_clickCB2;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color3Grp.colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, G.defColor3);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, G.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.onDraw =
          CM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.colorBtn.onClick =
          CM_clickSwatch3;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color3Grp.enableCB.onClick =
          CM_clickCB3;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color4Grp.colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, G.defColor4);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, G.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.onDraw =
          CM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.colorBtn.onClick =
          CM_clickSwatch4;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color4Grp.enableCB.onClick =
          CM_clickCB4;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp
            .color5Grp.colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, G.defColor5);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, G.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.onDraw =
          CM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.colorBtn.onClick =
          CM_clickSwatch5;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.color5Grp.enableCB.onClick =
          CM_clickCB5;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.colorGrp.kulerBtn.onClick =
          CM_clickLoadKuler;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.minGrp.enabled = false;
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.maxGrp.enabled = false;
        myPal.grp.buttonsGrp.buildGrp.buildBtnPnl.buildBtn.onClick =
          CM_buildText;
        myPal.grp.buttonsGrp.buildGrp.unbuildBtn.onClick = CM_cleanComp;
        myPal.grp.buttonsGrp.loadSaveGrp.saveBtn.onClick = CM_clickSave;
        myPal.grp.buttonsGrp.loadSaveGrp.loadBtn.onClick = CM_clickLoad;
        myPal.grp.logoHelpGrp.helpGrp.helpBtn.onClick = CM_clickHelp;
        myPal.grp.logoHelpGrp.helpGrp.keyBtn.onClick = CM_clickKey;
        for (var i = 0; i < G.shapeNames.length; i += 1) {
          if (G.shapeNames[i] == "-") {
            myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.add(
              "separator",
            );
          } else {
            myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.add(
              "item",
              G.shapeNames[i],
            );
          }
        }
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.selection =
          CM_getArrayIndex(G.shapeNames, G.def_shapeName);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.shapeGrp.DDL.onChange =
          CM_changeShape;
        for (var i = 0; i < G.alignmentNames.length; i += 1) {
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.add(
            "item",
            G.alignmentNames[i],
          );
        }
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.selection =
          CM_getArrayIndex(G.alignmentNames, G.def_alignmentName);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.onChange =
          CM_changeAlignment;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.equalizeGrp.enabled = false;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Top")
        ].enabled = false;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.alignmentGrp.DDL.items[
          CM_getArrayIndex(G.alignmentNames, "Bottom")
        ].enabled = false;
        for (var i = 0; i < G.directionNames.length; i += 1) {
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.DDL.add(
            "item",
            G.directionNames[i],
          );
        }
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.DDL.selection =
          CM_getArrayIndex(G.directionNames, G.def_directionName);
        for (var i = 0; i < G.wrapAmountNames.length; i += 1) {
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.DDL.add(
            "item",
            G.wrapAmountNames[i],
          );
        }
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.DDL.selection =
          CM_getArrayIndex(G.wrapAmountNames, G.def_wrapAmountName);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.directionGrp.enabled = false;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.wrapAmountGrp.enabled = false;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.separationGrp.enabled = false;
        for (var i = 0; i < G.animationNames.length; i += 1) {
          if (G.animationNames[i] == "-") {
            myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp.animationDDL.add(
              "separator",
            );
          } else {
            myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp.animationDDL.add(
              "item",
              G.animationNames[i],
            );
          }
        }
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp.animationDDL.selection =
          CM_getArrayIndex(G.animationNames, G.def_animationName);
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.enabled = false;
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionInGrp.animationDDL.onChange =
          CM_changeTransitionIn;
        for (var i = 0; i < G.timeStretchNames.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.add(
            "item",
            G.timeStretchNames[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.selection =
          CM_getArrayIndex(G.timeStretchNames, G.def_timeStretchName);
        for (var i = 0; i < G.transitionOutNames.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp.DDL.add(
            "item",
            G.transitionOutNames[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp.DDL.selection =
          CM_getArrayIndex(G.transitionOutNames, G.def_transitionOutName);
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutGrp.DDL.onChange =
          CM_changeTransitionOut;
        for (var i = 0; i < G.transitionOutDelayNames.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.DDL.add(
            "item",
            G.transitionOutDelayNames[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.DDL.selection =
          CM_getArrayIndex(
            G.transitionOutDelayNames,
            G.def_transitionOutDelayName,
          );
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.transitionOutDelayGrp.enabled = false;
        for (var i = 0; i < G.fadeDurationNames.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.DDL.add(
            "item",
            G.fadeDurationNames[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.DDL.selection =
          CM_getArrayIndex(G.fadeDurationNames, G.def_fadeDurationName);
        myPal.grp.controlsGrp.rightControlsGrp.animationPnl.fadeDurationGrp.enabled = false;
        for (var i = 0; i < G.durationNames.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.add(
            "item",
            G.durationNames[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.selection =
          CM_getArrayIndex(G.durationNames, G.def_durationName);
        myPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.message.visible = false;
        myPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.onClick =
          CM_clickMarkerSync;
        for (var i = 0; i < G.fontSizeNames.length; i += 1) {
          myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.fontSizeDDL.add(
            "item",
            G.fontSizeNames[i],
          );
        }
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.fontSizeDDL.selection =
          CM_getArrayIndex(G.fontSizeNames, G.def_fontSizeName);
        myPal.grp.controlsGrp.leftControlsGrp.typeAttributesPnl.fontSizeGrp.fontSizeDDL.onChange =
          CM_changeFontSize;
        for (var i = 0; i < G.movementTypes.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.add(
            "item",
            G.movementTypes[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.selection =
          CM_getArrayIndex(G.movementTypes, G.def_movementType);
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.onClick =
          MC_clickInclude;
        for (var i = 0; i < G.autoDollyTypes.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.add(
            "item",
            G.autoDollyTypes[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.selection =
          G.autoDollyDefaultIdx;
        for (var i = 0; i < G.autoRotateTypes.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.add(
            "item",
            G.autoRotateTypes[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.selection =
          G.autoRotateIdx;
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.updateBtn.onClick =
          MC_clickUpdate;
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
  G.scriptName = "CircusMonkey";
  G.version = "1.05";
  G.presetVersion = "1.03";
  G.trialWordLimit = 10;
  G.trialLengthDays = 7;
  G.copyright = "\xa9 Copyright 2015 Dan Ebberts & Orrin Zucker\r";
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
    "CircusMonkey allows you to create kinetic type with the greatest of ease. It\u2019s a new way of working in 3D space that unleashes amazing possibilities.\n\nQuickstart:\n\nTo generate a CircusMonkey build, create a 10 sec comp and click Do It! - CircusMonkey will create a random animation based on the default UI set up.\n";
  G.helpText3 =
    "\n\nFor additional info on any of our other Monkey products, please visit us at www.typemonkey.net";
  var af_settings = {
    helpButtons: [
      {
        name: G.scriptName + " Tips",
        url: "https://aescripts.com/circusmonkey/",
      },
      { name: "About Us", url: "https://www.typemonkey.net" },
    ],
    helpText: G.helpText1 + G.helpText2 + G.helpText3,
    privateNumber: 7341256535280353,
    productSKU: "EZCM-SUL",
    scriptAuthor: "Ebberts + Zucker",
    scriptName: G.scriptName,
    scriptURL: "https://aescripts.com/circusmonkey/",
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
          ? strSKU + t + "&message="
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
      var r = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return e
        ? File.encode(n) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(i) +
            "%0D%0A" +
            File.encode(r)
        : n + "\n" + t + "\n" + i + "\n" + r;
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
        i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(
          /%v/,
          t.version + "\n" + strCurrentVersion.replace(/%v/, strScriptVersion),
        );
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
        if (null == (n = JSONify(n, "parse"))) {
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
              Folder.userData.fsName + "/Aescripts/aescripts_helper.vbs",
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
      var i =
        -1 != $.os.indexOf("Mac") &&
        (Folder("/Volumes/Private").exists || Folder("/Volumes/private").exists)
          ? Folder.userData.fsName
          : Folder.temp.fsName +
            "/" +
            Math.round(Math.random() * 42132 * new Date().getTime());
      if (-1 != $.os.indexOf("Win")) {
        t = wx;
        i += ".exe";
      } else {
        if (systemCall("arch").toLowerCase().match(/ppc/)) {
          return (alert(strPpcNotSupported), false);
        }
        t = mx;
      }
      var n = createFile(File(i), t, "BINARY");
      if (!n.exists) {
        return ((licenseData = { result: -108 }), licenseData);
      }
      n.hidden = true;
      -1 != $.os.indexOf("Mac") && systemCall('chmod +x "' + n.fsName + '"');
      var r = systemCall(
        '"' + n.fsName + '" "' + strHeader + '" ' + privateNum + ' "' + e + '"',
      );
      return (n.remove(), parseResult(r));
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
      if ("" == t || "" == i) {
        return false;
      }
      switch (e.result) {
        case -20:
          e.e = t;
          break;
        case -21:
          e.e = i;
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
        var t = retProp("^d", e);
        if (void 0 === t) {
          return void (e.result = -103);
        }
        var i = trialLengthDays - t;
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
        (myLicense = false),
        e && ((regUI = licUI()), (myRegPrompt = regUI.show()), !myRegPrompt))
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
          myLicense = true;
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
          "trial" == t.toLowerCase() &&
          isResultTrial(licenseValidity.result)),
        e && !isValidTrial)
      ) {
        var d = parseInt(retProp("^n", licenseValidity), 10);
        t.match(/@remote/i) ||
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
        isTimeLimited && (i += "\nLicense ends: " + f),
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
              ? new File(e.fsName)
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
                i = !removeLic();
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
                  t =
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
                "" == (t = checkForLegacyLic()) &&
                  ((n = true),
                  (t =
                    isServerConfigured(licenseValidity) &&
                    isServerRunning(licenseValidity)
                      ? "@REMOTE"
                      : "trial"));
                i = checkCode(n, t, privateNum);
              }
            } else {
              haveSettings(prefsSectionName, prefsName)
                ? ((t = getSettings(prefsSectionName, prefsName)),
                  (n = !(
                    "c" == e ||
                    !(
                      ("bad" == t || "bad" == bD(t) || offerTrial) &&
                      "trial" == bD(t)
                    )
                  )))
                : "c" == e
                  ? (saveSettings(
                      prefsSectionName,
                      prefsName,
                      bE((t = !isTimeLimited && offerTrial ? "trial" : "")),
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
              i = checkCode(n, t, privateNum);
            }
            return i;
          }
        }
      }
    }
    var licensingVersion = "3.0.42";
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
    var doUpdateCheck =
      !vars.hasOwnProperty("doUpdateCheck") || vars.doUpdateCheck;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    var wx = __BLOB__BLOB_000013__;
    var mx = __BLOB__BLOB_000014__;
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
  var e3 = new a(af_settings);
  G.MonkeyID = "CircusMonkey";
  G.MasterControlID = G.MonkeyID + " Master Control";
  G.LastControlID = G.MonkeyID + " Last Control";
  G.MonkeyCamID = G.MonkeyID + "Camera";
  G.MonkeyCamLightID = G.MonkeyID + "Camera Light";
  G.MonkeyCamTargetID = G.MonkeyID + "Target";
  G.TextLayerID = G.MonkeyID + "Text Layer";
  G.ControlLayerID = G.MonkeyID + "Control Layer";
  G.CenterControlLayerID = G.MonkeyID + "Center Control Layer";
  G.MonkeyCamColor = 5;
  G.MonkeyCamTargetColor = 10;
  G.TextLayerColor = 5;
  G.ControlLayerColor = 10;
  G.SavedMarkerLayerColor = 2;
  G.CenterControlLayerColor = 13;
  G.uiPal = null;
  G.rigPresetName = "CM_Rig_Controls.ffx";
  G.textPresetName = "CM_Text_Controls.ffx";
  G.circlePresetName = "CM_Circle_Controls.ffx";
  G.cameraPresetName = "CM_Camera_Controls.ffx";
  G.rigControlsEffectName = "Pseudo/DEOZ CM Rig Controls";
  G.rigXPositionOffsetIdx = 2;
  G.rigYPositionOffsetIdx = 3;
  G.rigZPositionOffsetIdx = 4;
  G.rigXRotationOffsetName = "Pseudo/DEOZ CM Rig Controls-0007";
  G.rigYRotationOffsetName = "Pseudo/DEOZ CM Rig Controls-0008";
  G.rigZRotationOffsetName = "Pseudo/DEOZ CM Rig Controls-0009";
  G.textControlsEffectName = "Pseudo/DEOZ CM Text Controls";
  G.textXPositionOffsetIdx = 2;
  G.textYPositionOffsetIdx = 3;
  G.textZPositionOffsetIdx = 4;
  G.textXRotationOffsetIdx = 7;
  G.textYRotationOffsetIdx = 8;
  G.textZRotationOffsetIdx = 9;
  G.circleControlsEffectName = "Pseudo/DEOZ CM Circle Controls";
  G.circleXPositionOffsetName = "Pseudo/DEOZ CM Circle Controls-0002";
  G.circleYPositionOffsetName = "Pseudo/DEOZ CM Circle Controls-0003";
  G.circleZPositionOffsetName = "Pseudo/DEOZ CM Circle Controls-0004";
  G.circleXRotationOffsetName = "Pseudo/DEOZ CM Circle Controls-0007";
  G.circleYRotationOffsetName = "Pseudo/DEOZ CM Circle Controls-0008";
  G.circleZRotationOffsetName = "Pseudo/DEOZ CM Circle Controls-0009";
  G.circleScaleOffsetName = "Pseudo/DEOZ CM Circle Controls-0011";
  G.cameraControlsEffectName = "Pseudo/DEOZ CM Camera Controls";
  G.XPositionOffsetName = "Pseudo/DEOZ CM Camera Controls-0002";
  G.YPositionOffsetName = "Pseudo/DEOZ CM Camera Controls-0003";
  G.ZPositionOffsetName = "Pseudo/DEOZ CM Camera Controls-0004";
  G.XRotationOffsetName = "Pseudo/DEOZ CM Camera Controls-0007";
  G.YRotationOffsetName = "Pseudo/DEOZ CM Camera Controls-0008";
  G.ZRotationOffsetName = "Pseudo/DEOZ CM Camera Controls-0009";
  G.enableOpacityName = "Pseudo/DEOZ CM Camera Controls-0012";
  G.BGOpacityDistanceName = "Pseudo/DEOZ CM Camera Controls-0014";
  G.BGOpacityCurveName = "Pseudo/DEOZ CM Camera Controls-0015";
  G.enableFGOpacityName = "Pseudo/DEOZ CM Camera Controls-0016";
  G.FGOpacityCurveName = "Pseudo/DEOZ CM Camera Controls-0017";
  G.enableFogName = "Pseudo/DEOZ CM Camera Controls-0019";
  G.BGFogDistanceName = "Pseudo/DEOZ CM Camera Controls-0021";
  G.BGFogCurveName = "Pseudo/DEOZ CM Camera Controls-0022";
  G.enableFGFogName = "Pseudo/DEOZ CM Camera Controls-0023";
  G.FGFogCurveName = "Pseudo/DEOZ CM Camera Controls-0024";
  G.FogColorName = "Pseudo/DEOZ CM Camera Controls-0025";
  G.enableDOFName = "Pseudo/DEOZ CM Camera Controls-0027";
  G.DOFIntensityName = "Pseudo/DEOZ CM Camera Controls-0029";
  G.FocusDistanceOffsetName = "Pseudo/DEOZ CM Camera Controls-0030";
  G.ZoomOffsetName = "Pseudo/DEOZ CM Camera Controls-0031";
  G.depthOfFieldMaxValue = 200;
  G.exprHeader = "// " + G.MonkeyID + "\r" + "// " + G.copyright + "\r";
  G.masterControlLayerName = "CM Master Control";
  G.savedMarkerLayerName = "CM Markers (saved)";
  G.centerControlLayerName = "CM Center Control";
  G.shapeNames = [
    "Stationary",
    "-",
    "X Line",
    "Y Line",
    "Z Line",
    "-",
    "X Circle",
    "Y Circle",
    "Z Circle",
  ];
  G.shapeWordAlignments = [
    "Center",
    null,
    "Center",
    "Center",
    "Center",
    null,
    "Center",
    "Center",
    "Left",
  ];
  G.shapeWordSeparations = [100, null, 80, 50, 5000, null, 20, 50, 20];
  G.def_shapeName = "Stationary";
  G.alignmentNames = ["Center", "Left", "Right", "Top", "Bottom"];
  G.def_alignmentName = "Center";
  G.directionNames = ["Auto", "Reverse"];
  G.def_directionName = "Auto";
  G.wrapAmountNames = [
    "25%",
    "50%",
    "75%",
    "100%",
    "150%",
    "200%",
    "250%",
    "300%",
  ];
  G.def_wrapAmountName = "100%";
  G.wrapAmountAngles = [90, 180, 270, 360, 540, 720, 900, 1080];
  G.animationNames = [
    "Cut On",
    "Fade Up",
    "Fast Scale",
    "Ease Out",
    "Ease In",
    "Bounce",
    "Back",
    "Type Out",
    "Swing Down",
    "Swing Up",
    "Swing Left",
    "Swing Right",
    "Swing Center",
    "Slide Left",
    "Slide Down",
    "Springy Scale",
    "Spring Down",
    "Spring Up",
    "Spring Left",
    "Pop",
    "Rotate 1X",
    "Flip 1X",
    "Rotate 2X",
    "Flip 2X",
    "-",
    "Randomize",
    "None",
  ];
  G.def_animationName = "None";
  G.def_randomizeName = "Randomize";
  G.randomAnimations = [];
  G.transitionOutNames = ["None", "Cut", "Fade Out"];
  G.def_transitionOutName = "None";
  G.transitionOutDelayNames = [
    "Next Marker",
    "0",
    "5",
    "10",
    "15",
    "20",
    "30",
    "45",
    "60",
  ];
  G.def_transitionOutDelayName = "Next Marker";
  G.fadeDurationNames = ["Short", "Medium", "Long"];
  G.def_fadeDurationName = "Short";
  G.fadeDurationFrames = [15, 30, 60];
  G.animationAnchor = [
    1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 3, 4, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1, 1,
    1, 1,
  ];
  G.timeStretchNames = ["Fast", "Medium", "Slow", "Sloth"];
  G.timeStretchValues = [1, 1.5, 2, 3];
  G.def_timeStretchName = "Fast";
  G.durationNames = ["Comp Duration", "Work Area"];
  G.def_durationName = "Work Area";
  G.fontSizeNames = ["Random", "Constant", "Ascending", "Descending"];
  G.def_fontSizeName = "Constant";
  G.markerText = "Please select a marker guide layer.";
  G.defColor1 = [1, 1, 1];
  G.defColor1Hex = 16777215;
  G.defColor2 = [0.505, 0.502, 0.502];
  G.defColor2Hex = 8421504;
  G.defColor3 = [0.505, 0.502, 0.502];
  G.defColor3Hex = 8421504;
  G.defColor4 = [0.505, 0.502, 0.502];
  G.defColor4Hex = 8421504;
  G.defColor5 = [0.505, 0.502, 0.502];
  G.defColor5Hex = 8421504;
  G.currentColor1 = G.defColor1;
  G.currentColor1Hex = G.defColor1Hex;
  G.currentColor2 = G.defColor2;
  G.currentColor2Hex = G.defColor2Hex;
  G.currentColor3 = G.defColor3;
  G.currentColor3Hex = G.defColor3Hex;
  G.currentColor4 = G.defColor4;
  G.currentColor4Hex = G.defColor4Hex;
  G.currentColor5 = G.defColor5;
  G.currentColor5Hex = G.defColor5Hex;
  G.black = [0, 0, 0, 1];
  G.gap;
  G.compCenter = [];
  G.hardSpaceChar = "|";
  G.markerSpaceChar = "^";
  G.maxChars = 0;
  G.minChars = 999999;
  G.numChars = [];
  G.helpTip =
    "Text Box Keyboard Commands:\r\r^\tInserts pauses & gaps into marker layer\r----------------------------------------\r |\tCombines words into one group\r";
  G.cameraName = "MonkeyCam";
  G.cameraLightName = "MonkeyCam Light";
  G.targetLayerName = "MonkeyCam Target";
  G.movementTypes = ["Ease & Pause", "Ease", "Linear & Pause", "Linear"];
  G.def_movementType = "Ease & Pause";
  G.easeAndPauseIdx = 0;
  G.easeIdx = 1;
  G.linearAndPauseIdx = 2;
  G.stopAndGoPre = 0.167;
  G.stopAndGoDur = 0.334;
  G.uiPal = null;
  G.focalLength = 50;
  G.filmSize = 36;
  G.autoDollyTypes = ["Off", "Loose", "Medium", "Tight", "Kong"];
  G.autoDollyPct = [0.6, 0.4, 0.6, 0.8, 1];
  G.autoDollyOff = 0;
  G.autoDollyDefaultIdx = 0;
  G.autoRotateTypes = ["Off", "On"];
  G.autoRotateIdx = 1;
  G.autoFrameWarningIssued = false;
  var CM_MT = new Object();
  CM_MT.TypeMonkeyID = "TypeMonkey";
  CM_MT.TMTextLayerID = CM_MT.TypeMonkeyID + "Text Layer";
  CM_MT.TMControlLayerID = CM_MT.TypeMonkeyID + "Control Layer";
  CM_MT.TMLastControlID = CM_MT.TypeMonkeyID + " Last Control";
  CM_MT.TMCameraID = CM_MT.TypeMonkeyID + "Camera";
  CM_MT.TMCamTargetID = CM_MT.TypeMonkeyID + "Target";
  CM_MT.TMMasterControlID = CM_MT.TypeMonkeyID + " Master Control";
  CM_MT.LayerMonkeyID = "LM";
  CM_MT.LMSourceLayerID = CM_MT.LayerMonkeyID + " Source Layer";
  CM_MT.LMControlLayerID = CM_MT.LayerMonkeyID + " Control Layer";
  CM_MT.LMLastControlID = CM_MT.LayerMonkeyID + " Last Control";
  CM_MT.LMCameraID = CM_MT.LayerMonkeyID + " Camera";
  CM_MT.LMCamTargetID = CM_MT.LayerMonkeyID + " Target";
  CM_MT.LMMasterControlID = CM_MT.LayerMonkeyID + " Master Control";
  CM_MT.LMSaveLayerID = CM_MT.LayerMonkeyID + " (save)";
  CM_MT.MotionMonkeyID = "MM";
  CM_MT.MMSourceLayerID = CM_MT.MotionMonkeyID + " Source Layer";
  CM_MT.MMControlLayerID = CM_MT.MotionMonkeyID + " Control Layer";
  CM_MT.MMLastControlID = CM_MT.MotionMonkeyID + " Last Control";
  CM_MT.MMMasterControlID = CM_MT.MotionMonkeyID + " Master Control";
  CM_MT.MMIntersectControlLayerID =
    CM_MT.MotionMonkeyID + " Intersect Control Layer";
  CM_MT.MMSaveLayerID = CM_MT.MotionMonkeyID + " (save)";
  CM_MT.CircusMonkeyID = "CircusMonkey";
  CM_MT.CMMasterControlID = CM_MT.CircusMonkeyID + " Master Control";
  CM_MT.CMLastControlID = CM_MT.CircusMonkeyID + " Last Control";
  CM_MT.CMMonkeyCamID = CM_MT.CircusMonkeyID + "Camera";
  CM_MT.CMMonkeyCamTargetID = CM_MT.CircusMonkeyID + "Target";
  CM_MT.CMTextLayerID = CM_MT.CircusMonkeyID + "Text Layer";
  CM_MT.CMControlLayerID = CM_MT.CircusMonkeyID + "Control Layer";
  if (parseFloat(app.version) < 10.5) {
    alert("Sorry--CircusMonkey requires AE CS5.5 or later.");
  } else {
    if (e3.c()) {
      CM_buildPal(theObj);
    }
  }
}
deoz_CircusMonkey(this);
