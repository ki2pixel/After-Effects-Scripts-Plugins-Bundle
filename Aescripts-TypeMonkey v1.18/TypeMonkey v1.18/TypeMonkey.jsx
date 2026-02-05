/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function deoz_TypeMonkey(theObj) {
  function getRandom() {
    return parseFloat(app.version) > 13.6
      ? generateRandomNumber()
      : Math.random();
  }
  function TM_tokenize(str) {
    function setMinMax(tokenArray) {
      function getVertTokenMax(theToken) {
        var mySplitMax = 0;
        var mySplitToken = theToken.split("\r");
        for (var i = 0; i < mySplitToken.length; i += 1) {
          mySplitMax = Math.max(mySplitMax, mySplitToken[i].length);
        }
        return mySplitMax;
      }
      TM.maxChars = 0;
      TM.minChars = 999999;
      TM.numChars = [];
      for (var i = 0; i < tokenArray.length; i += 1) {
        myToken = tokenArray[i];
        if (myToken.indexOf("\r") > -1) {
          myVertMax = getVertTokenMax(myToken);
          TM.maxChars = Math.max(TM.maxChars, myVertMax);
          TM.minChars = Math.min(TM.minChars, myVertMax);
          TM.numChars.push(myVertMax);
        } else {
          TM.maxChars = Math.max(TM.maxChars, myToken.length);
          TM.minChars = Math.min(TM.minChars, myToken.length);
          TM.numChars.push(myToken.length);
        }
      }
    }
    var tokens = [];
    var token = "";
    var s = TM_strip(str);
    var doingH = false;
    var doingV = false;
    var doingNestedH = false;
    for (var i = 0; i < s.length; i += 1) {
      if (doingNestedH) {
        if (s[i] == "]") {
          doingNestedH = false;
          if (token.length > 0 && token[token.length - 1] != "\r") {
            token += "\r";
          }
        } else {
          token += s[i];
        }
        continue;
      } else if (doingH) {
        if (s[i] == "]") {
          if (token.length > 0) {
            tokens.push(token);
          }
          doingH = false;
          token = "";
        } else {
          token += s[i];
        }
        continue;
      } else {
        if (doingV) {
          if (s[i] == "[") {
            doingNestedH = true;
            if (token.length > 0 && token[token.length - 1] != "\r") {
              token += "\r";
            }
          } else if (s[i] == "}") {
            if (token.length > 0) {
              tokens.push(token);
            }
            doingV = false;
            token = "";
          } else if (s[i] == " ") {
            if (token.length > 0 && token[token.length - 1] != "\r") {
              token += "\r";
            }
          } else {
            token += s[i];
          }
          continue;
        }
      }
      if (s[i] == "[") {
        if (token.length > 0) {
          tokens.push(token);
          token = "";
        }
        doingH = true;
      } else if (s[i] == "{") {
        if (token.length > 0) {
          tokens.push(token);
          token = "";
        }
        doingV = true;
      } else {
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
    }
    if (token.length > 0) {
      tokens.push(token);
    }
    setMinMax(tokens);
    return tokens;
  }
  function TM_colorToHex(theColor) {
    var r = Math.round(theColor[0] * 255);
    var g = Math.round(theColor[1] * 255);
    var b = Math.round(theColor[2] * 255);
    return r * 65536 + g * 256 + b;
  }
  function TM_hexToColor(theHex) {
    var r = theHex >> 16;
    var g = (theHex & 65280) >> 8;
    var b = theHex & 255;
    return [r / 255, g / 255, b / 255];
  }
  function TM_customDraw() {
    with (this) {
      graphics.drawOSControl();
      graphics.rectPath(0, 0, size[0], size[1]);
      graphics.fillPath(fillBrush);
      graphics.strokePath(strokePen);
    }
  }
  function TM_strip(stringToTrim) {
    return stringToTrim.replace(/^\s+|\s+$/g, "");
  }
  function TM_reduceMultipleSpaces(theString) {
    return theString.replace(/\s{2,}/g, " ");
  }
  function TM_convertCRandTabsToSpaces(theString) {
    return theString.replace(/[\n\r\t]/g, " ");
  }
  function TM_changeFontSize() {
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.fontSizeDDL
        .selection.index == TM.randomFontSizeIdx
    ) {
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.enabled = true;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.label.text =
        "Minimum";
    } else {
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.label.text =
        "Size";
    }
  }
  function TM_clickHelp() {
    e9VE.helpUI();
  }
  function TM_clickTextOnlyCB() {
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.textOnlyGrp.textOnlyCB
        .value
    ) {
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.label.text =
        "Size";
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.verticalGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.enabled = false;
      TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.enabled = false;
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.enabled = false;
    } else {
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.enabled = true;
      if (
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp
          .fontSizeDDL.selection.index == TM.randomFontSizeIdx
      ) {
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.enabled = true;
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.label.text =
          "Minimum";
      }
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.enabled = true;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.verticalGrp.enabled = true;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.enabled = true;
      TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.enabled = true;
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.enabled = true;
    }
  }
  function TM_clickKey() {
    alert(TM.helpTip, "TypeMonkey Keyboard Commands");
  }
  function TM_clickSave() {
    var xmlStruct =
      "<TMPreset>\r<TMVersion />\r<UserText />\r<Layout>\r<TextOnly />\r<AllCaps />\r<FontSize />\r<Minimum />\r<Maximum />\r<Spacing />\r<RotationProbability />\r<ColorPalette>\r<Color1 />\r<Color2 />\r<Color2Enabled />\r<Color3 />\r<Color3Enabled />\r<Color4 />\r<Color4Enabled />\r<Color5 />\r<Color5Enabled />\r</ColorPalette>\r</Layout>\r<Animation>\r<Randomize />\r<Speed />\r<MotionBlur />\r</Animation>\r<Markers>\r<TimeSpan />\r<MarkerSync />\r</Markers>\r<MonkeyCam>\r<IncludeCamera />\r<Movement />\r<AutoRotate />\r<AutoFrame />\r</MonkeyCam>\r</TMPreset>";
    var myPreset = new XML(xmlStruct);
    myPreset.TMVersion = TM.presetVersion;
    myPreset.UserText = File.encode(TM.uiPal.grp.textPnl.txt.text);
    myPreset.Layout.TextOnly =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.textOnlyGrp.textOnlyCB.value.toString();
    myPreset.Layout.AllCaps =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.allCapsGrp.allCapsCB.value.toString();
    myPreset.Layout.FontSize =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.fontSizeDDL.selection.index.toString();
    myPreset.Layout.Minimum =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.txt.text;
    myPreset.Layout.Maximum =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.txt.text;
    myPreset.Layout.Spacing =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.txt.text;
    myPreset.Layout.RotationProbability =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.verticalGrp.txt.text;
    myPreset.Layout.ColorPalette.Color1 = TM.currentColor1Hex.toString();
    myPreset.Layout.ColorPalette.Color2 = TM.currentColor2Hex.toString();
    myPreset.Layout.ColorPalette.Color2Enabled =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.enableCB.value.toString();
    myPreset.Layout.ColorPalette.Color3 = TM.currentColor3Hex.toString();
    myPreset.Layout.ColorPalette.Color3Enabled =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.enableCB.value.toString();
    myPreset.Layout.ColorPalette.Color4 = TM.currentColor4Hex.toString();
    myPreset.Layout.ColorPalette.Color4Enabled =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.enableCB.value.toString();
    myPreset.Layout.ColorPalette.Color5 = TM.currentColor5Hex.toString();
    myPreset.Layout.ColorPalette.Color5Enabled =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.enableCB.value.toString();
    myPreset.Animation.Randomize =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.animationGrp.animationDDL.selection.index.toString();
    myPreset.Animation.Speed =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.selection.index.toString();
    myPreset.Animation.MotionBlur =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.enableBlurGrp.enableBlurCB.value.toString();
    myPreset.Markers.TimeSpan =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.selection.index.toString();
    myPreset.Markers.MarkerSync =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.value.toString();
    myPreset.MonkeyCam.IncludeCamera =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.value.toString();
    myPreset.MonkeyCam.Movement =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.selection.index.toString();
    myPreset.MonkeyCam.AutoRotate =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.selection.index.toString();
    myPreset.MonkeyCam.AutoFrame =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.selection.index.toString();
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
  function TM_clickLoad() {
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
    var tempXML = myPreset.TMVersion;
    if (tempXML == null || tempXML.toString() == "") {
      alert("This does not appear to be a valid TypeMonkey preset file.");
      return;
    }
    var myPresetVersion = parseFloat(tempXML.toString());
    if (isNaN(myPresetVersion)) {
      alert("This does not appear to be a valid TypeMonkey preset file.");
      return;
    }
    if (myPresetVersion > parseFloat(TM.presetVersion)) {
      alert(
        "The selected preset was created with a newer version of TypeMonkey. You will need to update TypeMonkey to use this preset.",
      );
      return;
    }
    var tempXML = myPreset.UserText;
    if (myPresetVersion < 1.17) {
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
        TM.uiPal.grp.textPnl.txt.text = myUserText;
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
        TM.uiPal.grp.textPnl.txt.text = myUserText;
      }
    }
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.verticalGrp.enabled = true;
    tempXML = myPreset.Layout.TextOnly;
    if (tempXML != null && tempXML.toString() != "") {
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.textOnlyGrp.textOnlyCB.value =
        tempXML.toString() == "true";
    } else {
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.textOnlyGrp.textOnlyCB.value = false;
    }
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.allCapsGrp.allCapsCB.value =
      myPreset.Layout.AllCaps.toString() == "true";
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.fontSizeDDL.selection =
      parseInt(myPreset.Layout.FontSize.toString(), 10);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.txt.text =
      myPreset.Layout.Minimum.toString();
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.txt.text =
      myPreset.Layout.Maximum.toString();
    TM_changeFontSize();
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.txt.text =
      myPreset.Layout.Spacing.toString();
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.verticalGrp.txt.text =
      myPreset.Layout.RotationProbability.toString();
    TM.currentColor1Hex = parseInt(
      myPreset.Layout.ColorPalette.Color1.toString(),
      10,
    );
    TM.currentColor1 = TM_hexToColor(TM.currentColor1Hex);
    g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor1);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.notify(
      "onDraw",
    );
    TM.currentColor2Hex = parseInt(
      myPreset.Layout.ColorPalette.Color2.toString(),
      10,
    );
    TM.currentColor2 = TM_hexToColor(TM.currentColor2Hex);
    g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor2);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.enableCB.value =
      myPreset.Layout.ColorPalette.Color2Enabled.toString() == "true";
    TM.currentColor3Hex = parseInt(
      myPreset.Layout.ColorPalette.Color3.toString(),
      10,
    );
    TM.currentColor3 = TM_hexToColor(TM.currentColor3Hex);
    g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor3);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.enableCB.value =
      myPreset.Layout.ColorPalette.Color3Enabled.toString() == "true";
    TM.currentColor4Hex = parseInt(
      myPreset.Layout.ColorPalette.Color4.toString(),
      10,
    );
    TM.currentColor4 = TM_hexToColor(TM.currentColor4Hex);
    g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor4);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.enableCB.value =
      myPreset.Layout.ColorPalette.Color4Enabled.toString() == "true";
    TM.currentColor5Hex = parseInt(
      myPreset.Layout.ColorPalette.Color5.toString(),
      10,
    );
    TM.currentColor5 = TM_hexToColor(TM.currentColor5Hex);
    g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor5);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.enableCB.value =
      myPreset.Layout.ColorPalette.Color5Enabled.toString() == "true";
    TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.enabled = true;
    var myStyle = parseInt(myPreset.Animation.Randomize.toString(), 10);
    if (myPresetVersion < 1.15) {
      if (myStyle >= 1) {
        myStyle++;
      }
    }
    TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.animationGrp.animationDDL.selection =
      myStyle;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.selection =
      parseInt(myPreset.Animation.Speed.toString(), 10);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.enableBlurGrp.enableBlurCB.value =
      myPreset.Animation.MotionBlur.toString() == "true";
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.enabled = true;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.selection =
      parseInt(myPreset.Markers.TimeSpan.toString(), 10);
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.value =
      myPreset.Markers.MarkerSync.toString() == "true";
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.message.visible =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.value;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.enabled =
      !TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp
        .markerSyncCBGrp.markerSyncCB.value;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.enabled = true;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.value = true;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.enabled = true;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.selection =
      parseInt(myPreset.MonkeyCam.Movement.toString(), 10);
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.selection =
      parseInt(myPreset.MonkeyCam.AutoRotate.toString(), 10);
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.selection =
      parseInt(myPreset.MonkeyCam.AutoFrame.toString(), 10);
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.value =
      myPreset.MonkeyCam.IncludeCamera.toString() == "true";
    include =
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp
        .camIncludeCB.value;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.enabled =
      include;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.enabled =
      include;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.enabled =
      include;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.updateBtn.enabled =
      include;
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.textOnlyGrp.textOnlyCB
        .value
    ) {
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.label.text =
        "Size";
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.verticalGrp.enabled = false;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.enabled = false;
      TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.enabled = false;
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.enabled = false;
    } else {
      if (
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp
          .fontSizeDDL.selection.index == TM.randomFontSizeIdx
      ) {
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.label.text =
          "Minimum";
      } else {
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.enabled = false;
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.label.text =
          "Size";
      }
    }
  }
  function TM_clickSwatch1() {
    var newColor = $.colorPicker(TM.currentColor1Hex);
    if (newColor == -1) {
      return;
    }
    TM.currentColor1Hex = newColor;
    TM.currentColor1 = TM_hexToColor(newColor);
    var g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor1);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.notify(
      "onDraw",
    );
  }
  function TM_clickSwatch2() {
    var newColor = $.colorPicker(TM.currentColor2Hex);
    if (newColor == -1) {
      return;
    }
    TM.currentColor2Hex = newColor;
    TM.currentColor2 = TM_hexToColor(newColor);
    var g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor2);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.enableCB.value = true;
  }
  function TM_clickCB2() {
    if (!this.value) {
      TM.currentColor2 = TM.defColor2;
      TM.currentColor2Hex = TM.defColor2Hex;
      var g =
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp
          .colorBtn.graphics;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor2);
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function TM_clickSwatch3() {
    var newColor = $.colorPicker(TM.currentColor3Hex);
    if (newColor == -1) {
      return;
    }
    TM.currentColor3Hex = newColor;
    TM.currentColor3 = TM_hexToColor(newColor);
    var g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor3);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.enableCB.value = true;
  }
  function TM_clickCB3() {
    if (!this.value) {
      TM.currentColor3 = TM.defColor3;
      TM.currentColor3Hex = TM.defColor3Hex;
      var g =
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp
          .colorBtn.graphics;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor3);
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function TM_clickSwatch4() {
    var newColor = $.colorPicker(TM.currentColor4Hex);
    if (newColor == -1) {
      return;
    }
    TM.currentColor4Hex = newColor;
    TM.currentColor4 = TM_hexToColor(newColor);
    var g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor4);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.enableCB.value = true;
  }
  function TM_clickCB4() {
    if (!this.value) {
      TM.currentColor4 = TM.defColor4;
      TM.currentColor4Hex = TM.defColor4Hex;
      var g =
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp
          .colorBtn.graphics;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor4);
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function TM_clickSwatch5() {
    var newColor = $.colorPicker(TM.currentColor5Hex);
    if (newColor == -1) {
      return;
    }
    TM.currentColor5Hex = newColor;
    TM.currentColor5 = TM_hexToColor(newColor);
    var g =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp
        .colorBtn.graphics;
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.fillBrush =
      g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor5);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.notify(
      "onDraw",
    );
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.enableCB.value = true;
  }
  function TM_clickCB5() {
    if (!this.value) {
      TM.currentColor5 = TM.defColor5;
      TM.currentColor5Hex = TM.defColor5Hex;
      var g =
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp
          .colorBtn.graphics;
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.fillBrush =
        g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor5);
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.notify(
        "onDraw",
      );
    }
  }
  function TM_clickLoadKuler() {
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
      newColor = TM.defColor1;
      cbVal = false;
    }
    TM.currentColor1 = newColor;
    TM.currentColor1Hex = TM_colorToHex(newColor);
    myBtn =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp
        .colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor1);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 1) {
      newColor = colors[1];
      cbVal = true;
    } else {
      newColor = TM.defColor2;
      cbVal = false;
    }
    TM.currentColor2 = newColor;
    TM.currentColor2Hex = TM_colorToHex(newColor);
    myBtn =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp
        .colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor2);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 2) {
      newColor = colors[2];
      cbVal = true;
    } else {
      newColor = TM.defColor3;
      cbVal = false;
    }
    TM.currentColor3 = newColor;
    TM.currentColor3Hex = TM_colorToHex(newColor);
    myBtn =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp
        .colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor3);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 3) {
      newColor = colors[3];
      cbVal = true;
    } else {
      newColor = TM.defColor4;
      cbVal = false;
    }
    TM.currentColor4 = newColor;
    TM.currentColor4Hex = TM_colorToHex(newColor);
    myBtn =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp
        .colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor4);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
    if (colors.length > 4) {
      newColor = colors[4];
      cbVal = true;
    } else {
      newColor = TM.defColor5;
      cbVal = false;
    }
    TM.currentColor5 = newColor;
    TM.currentColor5Hex = TM_colorToHex(newColor);
    myBtn =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp
        .colorBtn;
    var g = myBtn.graphics;
    myBtn.fillBrush = g.newBrush(g.BrushType.SOLID_COLOR, TM.currentColor5);
    TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.enableCB.value =
      cbVal;
    myBtn.notify("onDraw");
  }
  function TM_checkBB(ul, lr) {
    function intersect(BB1, BB2) {
      if (BB2[0][0] > BB1[1][0]) {
        return false;
      }
      if (BB2[1][0] < BB1[0][0]) {
        return false;
      }
      if (BB2[1][1] < BB1[0][1]) {
        return false;
      }
      if (BB2[0][1] > BB1[1][1]) {
        return false;
      }
      return true;
    }
    var gap = TM.gap / 2 - 1;
    var myUL = [ul[0] - gap, ul[1] - gap];
    var myLR = [lr[0] + gap, lr[1] + gap];
    if (TM.boundingBoxes.length > 0) {
      for (var i = 0; i < TM.boundingBoxes.length; i += 1) {
        if (intersect(TM.boundingBoxes[i], [myUL, myLR])) {
          return false;
        }
      }
    }
    TM.boundingBoxes.push([myUL, myLR]);
    return true;
  }
  function TM_clickMarkerSync() {
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.message.visible =
      this.value;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.enabled =
      !this.value;
  }
  function MC_clickInclude() {
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.enabled =
      this.value;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.enabled =
      this.value;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.enabled =
      this.value;
    TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.updateBtn.enabled =
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
    var myComp = app.project.activeItem;
    app.beginUndoGroup("Update MonkeyCam");
    MC_cleanCamera();
    MC_buildCamera();
    app.endUndoGroup();
    if (parseInt(app.version, 10) >= 11) {
      myComp.openInViewer();
    }
  }
  function TM_addAnimation(theLayer, theMarkerLayer, theMarkerNum, theAnimIdx) {
    function getFontSize(myLayer) {
      var myProp = myLayer.property("Source Text");
      var myTextDoc = myProp.value;
      return myTextDoc.fontSize;
    }
    var myIdx =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.timeStretchGrp
        .timeStretchDDL.selection.index;
    var dMult = TM.timeStretchValues[myIdx];
    var expr0 =
      '// TypeMonkey\rm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "t = time - m.key(" +
      theMarkerNum +
      ").time;\r" +
      "t >= 0 ? value: 0";
    var expr1 =
      '// TypeMonkey\rm = thisComp.layer("' +
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
    var expr2 =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
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
      "if (t < 0){\r" +
      "  s = 0\r" +
      "}else if (t < d){\r" +
      "s = 100*((t=t/d-1)*t*((k+1)*t + k) + 1)\r" +
      "}else\r" +
      "  s = 100;\r" +
      "[s,s]";
    var expr7 =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
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
      "if (t > 0 && t < p*3/4){\r" +
      "  a*Math.cos(t*Math.PI*2/p)/Math.exp(t*decay);\r" +
      "}else\r" +
      "  0";
    var expr8_9_10o =
      '// TypeMonkey\rm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "(time <  (m.key(" +
      theMarkerNum +
      ").time - pre)) ? 0 : value;";
    var expr11p =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
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
    var expr12p =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
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
    var expr13 =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      "}else if (t < d + 1){\r" +
      "  a = 100/d;\r" +
      "  w = f*Math.PI*2;\r" +
      "  s = 100 + a*(Math.sin((t-d)*w)/Math.exp(decay*(t-d))/w);\r" +
      "}else{\r" +
      "  s = 100;\r" +
      "}\r" +
      "[s,s]";
    var expr14_15_16r =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      '// TypeMonkey\rm = thisComp.layer("' +
      theMarkerLayer.name +
      '").marker;\r' +
      "pre = " +
      0.167 * dMult +
      ";\r" +
      "(time <  (m.key(" +
      theMarkerNum +
      ").time - pre)) ? 0 : value;";
    var expr17p =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      "}else if (t < d + 1){\r" +
      "  a = 100/d;\r" +
      "  w = f*Math.PI*2;\r" +
      "  delta = -a*(Math.sin((t-d)*w)/Math.exp(decay*(t-d))/w);\r" +
      "}else{\r" +
      "  delta = 0;\r" +
      "}\r" +
      "value + [delta,0,0]";
    var expr17o =
      '// TypeMonkey\rm = thisComp.layer("' +
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
    var expr18p =
      '// TypeMonkey\rm = thisComp.layer("' +
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
      "}else if (t < d + 1){\r" +
      "  a = 100/d;\r" +
      "  w = f*Math.PI*2;\r" +
      "  delta = -a*(Math.sin((t-d)*w)/Math.exp(decay*(t-d))/w);\r" +
      "}else{\r" +
      "  delta = 0;\r" +
      "}\r" +
      "value - [0,delta,0]";
    var expr18o =
      '// TypeMonkey\rm = thisComp.layer("' +
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
    switch (theAnimIdx) {
      case 0:
        theLayer.property("Opacity").expression = expr0;
        break;
      case 1:
        theLayer.property("Opacity").expression = expr1;
        break;
      case 2:
        theLayer.property("Scale").expression = expr2;
        break;
      case 3:
        theLayer.property("Scale").expression = expr3;
        break;
      case 4:
        theLayer.property("Scale").expression = expr4;
        break;
      case 5:
        theLayer.property("Scale").expression = expr5;
        break;
      case 6:
        theLayer.property("Scale").expression = expr6;
        break;
      case 7:
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
        break;
      case 8:
        theLayer.property("X Rotation").expression = expr8_9_10r;
        theLayer.property("Opacity").expression = expr8_9_10o;
        break;
      case 9:
        theLayer.property("X Rotation").expression = expr8_9_10r;
        theLayer.property("Opacity").expression = expr8_9_10o;
        break;
      case 10:
        theLayer.property("Y Rotation").expression = expr8_9_10r;
        theLayer.property("Opacity").expression = expr8_9_10o;
        break;
      case 11:
        theLayer.property("Position").expression = expr11p;
        theLayer.property("Opacity").expression = expr11o;
        break;
      case 12:
        theLayer.property("Position").expression = expr12p;
        theLayer.property("Opacity").expression = expr12o;
        break;
      case 13:
        theLayer.property("Scale").expression = expr13;
        break;
      case 14:
        theLayer.property("X Rotation").expression = expr14_15_16r;
        theLayer.property("Opacity").expression = expr14_15_16o;
        break;
      case 15:
        theLayer.property("X Rotation").expression = expr14_15_16r;
        theLayer.property("Opacity").expression = expr14_15_16o;
        break;
      case 16:
        theLayer.property("Y Rotation").expression = expr14_15_16r;
        theLayer.property("Opacity").expression = expr14_15_16o;
        break;
      case 17:
        theLayer.property("Position").expression = expr17p;
        theLayer.property("Opacity").expression = expr17o;
        break;
      case 18:
        theLayer.property("Position").expression = expr18p;
        theLayer.property("Opacity").expression = expr18o;
        break;
      case 20:
        break;
      default:
        break;
    }
  }
  function TM_getWords(theLayer) {
    var mySourceText = theLayer.property("Source Text");
    var myTextDoc = mySourceText.value;
    var myText = myTextDoc.text;
    return myText.split(" ");
  }
  function TM_hSplit(theLayer) {
    var theLayers = [theLayer];
    var mySourceText = theLayer.property("Source Text");
    var myTextDoc = mySourceText.value;
    var myText = myTextDoc.text;
    var myWords = myText.split(" ");
    var origRect = theLayer.sourceRectAtTime(0, true);
    var origPos = theLayer.property("Position").value;
    var origAnchor = theLayer.property("Anchor Point").value;
    var origLeft = origPos[0] - origRect.width / 2;
    myTextDoc.text = myWords[0];
    mySourceText.setValue(myTextDoc);
    var myRect = theLayer.sourceRectAtTime(0, true);
    theLayer
      .property("Anchor Point")
      .setValue([myRect.left + myRect.width / 2, origAnchor[1]]);
    var myPos = [origLeft + myRect.width / 2, origPos[1]];
    theLayer.property("Position").setValue(myPos);
    var curX = myPos[0] + myRect.width / 2;
    var prevLayer = theLayer;
    theLayer.name = myWords[0];
    for (var i = 1; i < myWords.length; i += 1) {
      newLayer = theLayer.duplicate();
      newLayer.moveAfter(prevLayer);
      newSourceText = newLayer.property("Source Text");
      newTextDoc = mySourceText.value;
      newTextDoc.text = myWords[i - 1];
      newSourceText.setValue(newTextDoc);
      myRect = newLayer.sourceRectAtTime(0, true);
      w1 = myRect.width;
      newTextDoc.text = myWords[i];
      newSourceText.setValue(newTextDoc);
      myRect = newLayer.sourceRectAtTime(0, true);
      w2 = myRect.width;
      newTextDoc.text = myWords[i - 1] + " " + myWords[i];
      newSourceText.setValue(newTextDoc);
      myRect = newLayer.sourceRectAtTime(0, true);
      w3 = myRect.width;
      delta = w3 - (w2 + w1);
      newTextDoc.text = myWords[i];
      newSourceText.setValue(newTextDoc);
      myRect = newLayer.sourceRectAtTime(0, true);
      newLayer
        .property("Anchor Point")
        .setValue([myRect.left + myRect.width / 2, origAnchor[1]]);
      myPos = [curX + delta + myRect.width / 2, origPos[1]];
      newLayer.property("Position").setValue(myPos);
      curX += delta + myRect.width;
      newLayer.name = myWords[i];
      theLayers.push(newLayer);
      prevLayer = newLayer;
    }
    return theLayers;
  }
  function TM_animAdj(theLayer, theAnimationIdx, theHeight) {
    if (TM.animationAnchor[theAnimationIdx] == 1) {
      return;
    }
    var adjAP = theLayer.property("Anchor Point").value;
    var adjPos = theLayer.property("Position").value;
    if (TM.animationAnchor[theAnimationIdx] == 0) {
      theLayer
        .property("Anchor Point")
        .setValue([adjAP[0], adjAP[1] - theHeight / 2]);
      theLayer
        .property("Position")
        .setValue([adjPos[0], adjPos[1] - theHeight / 2]);
    } else {
      theLayer
        .property("Anchor Point")
        .setValue([adjAP[0], adjAP[1] + theHeight / 2]);
      theLayer
        .property("Position")
        .setValue([adjPos[0], adjPos[1] + theHeight / 2]);
    }
  }
  function TM_cleanComp() {
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
      if (myComp.layer(i).comment.indexOf(MG.TypeMonkeyID) > -1) {
        atLeastOne = true;
        break;
      }
    }
    if (!atLeastOne) {
      alert("Nothing to Undo.");
      return;
    }
    app.beginUndoGroup("Remove TypeMonkey");
    MC_cleanCamera();
    for (var i = myComp.numLayers; i > 0; i--) {
      if (myComp.layer(i).comment == MG.TextLayerID) {
        myComp.layer(i).locked = false;
        myComp.layer(i).remove();
      }
    }
    var myMarkerLayer = null;
    for (var i = myComp.numLayers; i > 0; i--) {
      if (myComp.layer(i).comment.indexOf(MG.TypeMonkeyID) > -1) {
        if (myComp.layer(i).comment == MG.MasterControlID) {
          if (confirm("Save TypeMonkey Marker Layer?", true)) {
            myMarkerLayer = myComp.layer(i);
          } else {
            myComp.layer(i).locked = false;
            myComp.layer(i).remove();
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
      myMarkerLayer.name = TM.savedMarkerLayerName;
      myMarkerLayer.source.name = TM.savedMarkerLayerName;
      myMarkerLayer.label = MG.SavedMarkerLayerColor;
      myMarkerLayer.selected = true;
    }
    myComp.hideShyLayers = false;
    app.endUndoGroup();
    if (parseInt(app.version, 10) >= 11) {
      myComp.openInViewer();
    }
  }
  function TM_buildText() {
    function removeSpacesAroundControlChars(theString) {
      var str = "";
      var specChars = "[]{}|^" + TM.hardSpaceChar;
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
          if (!(myChar == " ") && !(myChar == TM.hardSpaceChar)) {
            str += myChar;
            prevWasNbsp = false;
          }
        } else if (myChar == TM.hardSpaceChar) {
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
        if (theString[i] == TM.markerSpaceChar) {
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
    function addMarkers(theLayer, theComp, theSplitString, theGuideLayer) {
      var myMarker = new MarkerValue("");
      var guideMarkerIdx = 1;
      if (theGuideLayer != null) {
        for (var i = 0; i < theSplitString.length; i += 1) {
          if (theSplitString[i] != TM.markerSpaceChar) {
            myComment = TM_strip(theSplitString[i]);
            if (typeof TM_ConvertMarkerText == "function") {
              try {
                myComment = TM_ConvertMarkerText(myComment);
              } catch (err) {
                alert(
                  'TypeMonkey cannot continue. Language converter add-on script "' +
                    unescape(TM.addOnFileName) +
                    '" has failed with this message:\r\r"' +
                    err.message +
                    '"',
                );
                return false;
              }
            }
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
          TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp
            .durationDDL.selection.index != TM.defaultDurationIdx
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
          if (theSplitString[i] != TM.markerSpaceChar) {
            myComment = TM_strip(theSplitString[i]);
            if (typeof TM_ConvertMarkerText == "function") {
              try {
                myComment = TM_ConvertMarkerText(myComment);
              } catch (err) {
                alert(
                  'TypeMonkey cannot continue. Language converter add-on script "' +
                    unescape(TM.addOnFileName) +
                    '" has failed with this message:\r\r"' +
                    err.message +
                    '"',
                );
                return false;
              }
            }
            myMarker.comment = myComment;
            theLayer.property("Marker").setValueAtTime(myCurTime, myMarker);
          }
          myCurTime += myDiv;
        }
      }
      return true;
    }
    function hControlCreate(thePrev, theControl, theLayers, theRotate) {
      var origControlRect = theControl.sourceRectAtTime(0, true);
      theControl.parent = null;
      var origPos = theControl.property("Position").value;
      for (var i = 0; i < theLayers.length; i += 1) {
        myHLayer = theLayers[i];
        myHRect = myHLayer.sourceRectAtTime(0, true);
        myHControlLayerName = myHLayer.name + " (ctrl)";
        myHLayer.parent = null;
        if (i == 0) {
          myHControlLayer = theControl;
          if (!(myHControlLayer.name == TM.masterControlLayerName)) {
            myHControlLayer.name = myHControlLayerName;
            myHControlLayer.source.name = myHControlLayerName;
          }
          myHControlLayer.source.width = Math.round(myHRect.width);
        } else {
          myHControlLayer = myHLayer.containingComp.layers.addSolid(
            [1, 1, 1],
            myHControlLayerName,
            Math.round(myHRect.width),
            Math.round(origControlRect.height),
            1,
            myHLayer.containingComp.duration,
          );
          myHControlLayer.startTime = 0;
          myHControlLayer.comment = MG.ControlLayerID;
          myHControlLayer.label = MG.ControlLayerColor;
          myHControlLayer.moveBefore(myHLayer);
          myHControlLayer.property("Opacity").setValue(0);
        }
        if (theRotate) {
          myHControlLayer
            .property("Position")
            .setValue([origPos[0], myHLayer.property("Position").value[1]]);
          if (i != 0) {
            myHControlLayer.property("Rotation").setValue(90);
          }
        } else {
          myHControlLayer
            .property("Position")
            .setValue([myHLayer.property("Position").value[0], origPos[1]]);
        }
        myHLayer.parent = myHControlLayer;
        if (i == 0) {
          myHControlLayer.parent = thePrev;
        } else {
          myHControlLayer.parent = myPrevControl;
        }
        myPrevControl = myHControlLayer;
      }
    }
    function checkBrackets(theText) {
      var doingSquare = false;
      var doingCurly = false;
      var bracketMsg = "";
      for (var i = 0; i < theText.length; i += 1) {
        myChar = theText[i];
        switch (myChar) {
          case "[":
            if (doingSquare) {
              bracketMsg = "Illegal nested \'[\' at position " + i + 1 + ".";
            } else {
              doingSquare = true;
              squarePos = i + 1;
            }
            break;
          case "]":
            if (!doingSquare) {
              bracketMsg =
                "Illegal \']\' without opening \']\'at position " + i + 1 + ".";
            } else {
              doingSquare = false;
            }
            break;
          case "{":
            if (doingSquare) {
              bracketMsg =
                "Illegal use of \'{\' within \'[]\' at position " + i + 1 + ".";
            } else if (doingCurly) {
              bracketMsg = "Illegal use \'{\' at position " + i + 1 + ".";
            } else {
              doingCurly = true;
              curlyPos = i + 1;
            }
            break;
          case "}":
            if (doingSquare) {
              bracketMsg =
                "Illegal use of \'}\' within \'[]\' at position " + i + 1 + ".";
            } else if (!doingCurly) {
              bracketMsg =
                "Illegal use of \'}\' without opening \'{\' at position " +
                i +
                1 +
                ".";
            } else {
              doingCurly = false;
            }
            break;
          default:
            break;
        }
        if (bracketMsg != "") {
          break;
        }
      }
      if (bracketMsg == "") {
        if (doingSquare) {
          bracketMsg = "Unclosed \'[\' at position " + squarePos + ".";
        } else {
          if (doingCurly) {
            bracketMsg = "Unclosed \'{\' at position " + curlyPos + ".";
          }
        }
      }
      return bracketMsg;
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
      if (myComp.layer(i).comment.indexOf(MG.TypeMonkeyID) > -1) {
        if (
          confirm(
            "TypeMonkey has already been applied to this comp. Do you want to Undo it now to remove previous attempt?",
            true,
          )
        ) {
          TM_cleanComp();
        }
        return;
      }
    }
    if (myComp.pixelAspect != 1) {
      if (
        !confirm(
          "TypeMonkey results will be inaccurate with non-square pixel comps.\rProceed anyway?",
          true,
        )
      ) {
        return;
      }
    }
    var myText = convertHardSpaces(
      TM_reduceMultipleSpaces(
        TM_convertCRandTabsToSpaces(TM_strip(TM.uiPal.grp.textPnl.txt.text)),
      ),
    );
    if (myText == "") {
      alert("No text entered.");
      return;
    }
    if (
      TM.uiPal.grp.controlsGrp.rightControlsGrp.addOnGrp.enabled &&
      TM.uiPal.grp.controlsGrp.rightControlsGrp.addOnGrp.addOnDDL.selection
        .index > 0
    ) {
      try {
        var addOnFile =
          TM.addOnFiles[
            TM.uiPal.grp.controlsGrp.rightControlsGrp.addOnGrp.addOnDDL
              .selection.index - 1
          ];
        addOnFile.open("r");
        var contents = addOnFile.read();
        TM.addOnFileName = addOnFile.name;
        eval(contents);
        addOnFile.close();
      } catch (err) {
        alert(
          'TypeMonkey cannot continue. Text mod script "' +
            unescape(addOnFile.name) +
            '" has failed with this message:\r\r"' +
            err.message +
            '"',
        );
        return;
      }
    } else {
      TM.addOnFileName = "";
    }
    if (!(typeof TM_ConvertText == "function")) {
      var myMessage = checkBrackets(myText);
      if (myMessage != "") {
        alert(myMessage);
        return;
      }
    }
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.allCapsGrp.allCapsCB
        .value
    ) {
      myText = myText.toUpperCase();
    }
    if (typeof TM_ConvertText == "function") {
      try {
        myText = TM_ConvertText(myText);
      } catch (err) {
        alert(
          'TypeMonkey cannot continue. Language converter add-on script "' +
            unescape(addOnFile.name) +
            '" has failed with this message:\r\r"' +
            err.message +
            '"',
        );
        return;
      }
      myMessage = checkBrackets(myText);
      if (myMessage != "") {
        alert(
          'Brackets formatted incorrectly after calling text mod script "' +
            unescape(addOnFile.name) +
            '".',
        );
        return;
      }
    }
    var bracketlessText = "";
    var mySplitText = "";
    var myTokens = [];
    var bracketChars = "[]{}";
    myText = removeSpacesAroundControlChars(myText);
    if (e9VE.t()) {
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
            if (trialWordCount >= TM.trialWordLimit) {
              if (
                confirm(
                  "The trial version of TypeMonkey is limited to " +
                    TM.trialWordLimit +
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
      if (myChar == TM.markerSpaceChar) {
        bracketlessText += " " + myChar + " ";
      } else if (bracketChars.indexOf(myChar) > -1) {
        bracketlessText += " ";
      } else {
        bracketlessText += myChar;
      }
    }
    mySplitText = TM_reduceMultipleSpaces(TM_strip(bracketlessText)).split(" ");
    var textOnly =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.textOnlyGrp.textOnlyCB
        .value;
    myMarkerGuideLayer = null;
    if (
      !textOnly &&
      TM.uiPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp
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
        if (mySplitText[j] != TM.markerSpaceChar) {
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
    myTokens = TM_tokenize(TM_reduceMultipleSpaces(myText));
    TM.boundingBoxes = [];
    TM.compCenter = [myComp.width, myComp.height] / 2;
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.fontSizeDDL
        .selection.index == TM.randomFontSizeIdx
    ) {
      minFontSize = parseFloat(
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.txt.text,
      );
      if (isNaN(minFontSize) || minFontSize < 1 || minFontSize > 9999) {
        alert("Illegal minimum font size");
        return;
      }
      maxFontSize = parseFloat(
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.maxGrp.txt.text,
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
        TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.minGrp.txt.text,
      );
      if (isNaN(minFontSize) || minFontSize < 1 || minFontSize > 9999) {
        alert("Illegal font size");
        return;
      }
      maxFontSize = minFontSize;
    }
    var mySpacing = parseFloat(
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.spacingGrp.txt.text,
    );
    if (isNaN(mySpacing) || mySpacing < 0) {
      alert("Illegal spacing value");
      return;
    }
    TM.gap = mySpacing;
    var myVertProb = parseFloat(
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.verticalGrp.txt.text,
    );
    if (isNaN(myVertProb) || myVertProb < 0 || myVertProb > 100) {
      alert("Illegal probability of rotation");
      return;
    }
    TM.rotatePct = myVertProb;
    var myTextDoc = new TextDocument("");
    var myPrevLayer = null;
    var myPrevControlLayer = null;
    var myRotation = 0;
    var vLayers = [];
    var hLayers = [];
    var avgFontSize = (minFontSize + maxFontSize) / 2;
    var deltaFontSize = maxFontSize - minFontSize;
    var rotated90 = false;
    var myRotationWordCount = TM.rotationThrottle;
    var prevBB = null;
    var markerCount = 1;
    var myWords = [];
    var masterControlLayer = null;
    app.beginUndoGroup("Create TypeMonkey Layers");
    if (myTokens.length > 0) {
      if (textOnly) {
        myFontSize = minFontSize;
        for (var i = 0; i < myTokens.length; i += 1) {
          myWord = TM_strip(myTokens[i]);
          vBlock = myWord.indexOf("\r") > -1;
          if (vBlock) {
            vLines = myWord.split("\r");
            for (var j = 0; j < vLines.length; j += 1) {
              vLayer = myComp.layers.addText(TM_strip(vLines[j]));
              vLayer.startTime = 0;
              vLayer.outPoint = myComp.duration;
              vLayer.comment = MG.TextLayerID;
              vLayer.label = MG.TextLayerColor;
              vLayer.name = vLines[j];
              if (myPrevLayer != null) {
                vLayer.moveAfter(myPrevLayer);
              }
              myProp = vLayer.property("Source Text");
              myTextDoc = myProp.value;
              myTextDoc.justification = ParagraphJustification.CENTER_JUSTIFY;
              myTextDoc.fontSize = myFontSize;
              myTextDoc.text = vLines[j];
              myProp.setValue(myTextDoc);
              myRect = vLayer.sourceRectAtTime(0, true);
              vLayer
                .property("Anchor Point")
                .setValue([
                  myRect.left + myRect.width / 2,
                  myRect.top + myRect.height / 2,
                ]);
              myPrevLayer = vLayer;
            }
          } else {
            myTextLayer = myComp.layers.addText(myWord);
            myTextLayer.startTime = 0;
            myTextLayer.outPoint = myComp.duration;
            myTextLayer.comment = MG.TextLayerID;
            myTextLayer.label = MG.TextLayerColor;
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
        }
        var myColorArray = [TM.currentColor1];
        if (
          TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp
            .enableCB.value
        ) {
          myColorArray.push(TM.currentColor2);
        }
        if (
          TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp
            .enableCB.value
        ) {
          myColorArray.push(TM.currentColor3);
        }
        if (
          TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp
            .enableCB.value
        ) {
          myColorArray.push(TM.currentColor4);
        }
        if (
          TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp
            .enableCB.value
        ) {
          myColorArray.push(TM.currentColor5);
        }
        var colorIdx = 0;
        for (var i = 1; i <= myComp.numLayers; i += 1) {
          if (myComp.layer(i).comment == MG.TextLayerID) {
            addColors(myComp.layer(i), myColorArray, colorIdx);
            colorIdx++;
          }
        }
        return;
      }
      var myAnimIdx =
        TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.animationGrp
          .animationDDL.selection.index;
      var randomizing = myAnimIdx == TM.randomizeIdx;
      var myMotionBlur =
        TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.enableBlurGrp
          .enableBlurCB.value;
      for (var i = 0; i < myTokens.length; i += 1) {
        if (randomizing) {
          myAnimIdx = Math.floor(getRandom() * (TM.animationNames.length - 3));
        }
        if (TM.maxChars > TM.minChars) {
          myCharPct =
            (TM.numChars[i] - TM.minChars) / (TM.maxChars - TM.minChars);
          if (myCharPct > 0.5) {
            myFontSize = Math.round(
              minFontSize + (deltaFontSize * getRandom()) / 2,
            );
          } else {
            myFontSize = Math.round(
              avgFontSize + (deltaFontSize * getRandom()) / 2,
            );
          }
        } else {
          myFontSize = Math.round(minFontSize + deltaFontSize * getRandom());
        }
        myWord = TM_strip(myTokens[i]);
        prevRotated90 = rotated90;
        vBlock = myWord.indexOf("\r") > -1;
        if (vBlock) {
          vLines = myWord.split("\r");
          w = h = 0;
          vLayers = [];
          for (var j = 0; j < vLines.length; j += 1) {
            vLayer = myComp.layers.addText(TM_strip(vLines[j]));
            vLayer.startTime = 0;
            vLayer.outPoint = myComp.duration;
            vLayer.comment = MG.TextLayerID;
            vLayer.label = MG.TextLayerColor;
            vLayer.name = vLines[j];
            vLayer.motionBlur = myMotionBlur;
            myRotationWordCount++;
            vLayers.push(vLayer);
            if (j > 0) {
              vLayer.moveAfter(vPrevLayer);
            } else {
              if (i > 0) {
                vLayer.moveAfter(myPrevLayer);
              }
            }
            myProp = vLayer.property("Source Text");
            myTextDoc = myProp.value;
            myTextDoc.justification = ParagraphJustification.LEFT_JUSTIFY;
            myTextDoc.fontSize = myFontSize;
            myTextDoc.text = vLines[j];
            myProp.setValue(myTextDoc);
            myRect = vLayer.sourceRectAtTime(0, true);
            w = Math.max(w, myRect.width);
            if (j > 0) {
              h += TM.gap;
            }
            h += myRect.height;
            vLayer
              .property("Anchor Point")
              .setValue([
                myRect.left + myRect.width / 2,
                myRect.top + myRect.height / 2,
              ]);
            vPrevLayer = vLayer;
          }
        } else {
          myTextLayer = myComp.layers.addText(myWord);
          myTextLayer.startTime = 0;
          myTextLayer.outPoint = myComp.duration;
          myTextLayer.comment = MG.TextLayerID;
          myTextLayer.label = MG.TextLayerColor;
          myTextLayer.name = myWord;
          myRotationWordCount++;
          if (myPrevLayer != null) {
            myTextLayer.moveAfter(myPrevLayer);
          }
          myTextLayer.motionBlur = myMotionBlur;
          myProp = myTextLayer.property("Source Text");
          myTextDoc = myProp.value;
          myTextDoc.justification = ParagraphJustification.LEFT_JUSTIFY;
          myTextDoc.fontSize = myFontSize;
          myTextDoc.text = myWord;
          myProp.setValue(myTextDoc);
          myRect = myTextLayer.sourceRectAtTime(0, true);
          w = myRect.width;
          h = myRect.height;
          myTextLayer
            .property("Anchor Point")
            .setValue([myRect.left + w / 2, myRect.top + h / 2]);
          myTextLayer.selected = false;
        }
        rightJust = false;
        if (myPrevLayer == null) {
          TM.compCenter = [myComp.width / 2, myComp.height / 2];
          ul = [TM.compCenter[0] - w / 2, TM.compCenter[1] - h / 2];
          lr = [TM.compCenter[0] + w / 2, TM.compCenter[1] + h / 2];
          prevBB = [ul, lr];
          TM.boundingBoxes.push(prevBB);
          if (!vBlock) {
            myWords = TM_getWords(myTextLayer);
            adjRect = myTextLayer.sourceRectAtTime(0, true);
            myControlLayerName =
              masterControlLayer == null
                ? TM.masterControlLayerName
                : myTextLayer.name + " (ctrl)";
            myControlLayer = myComp.layers.addSolid(
              [1, 1, 1],
              myControlLayerName,
              Math.round(w),
              Math.round(h),
              1,
              myComp.duration,
            );
            myControlLayer.startTime = 0;
            myControlLayer.comment = MG.ControlLayerID;
            myControlLayer.label = MG.ControlLayerColor;
            myControlLayer.moveBefore(myTextLayer);
            myControlLayer.property("Opacity").setValue(0);
            myControlLayer
              .property("Position")
              .setValue(myTextLayer.property("Position").value);
            myTextLayer.parent = myControlLayer;
            if (masterControlLayer == null) {
              masterControlLayer = myControlLayer;
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
            if (myWords.length > 1) {
              hLayers = TM_hSplit(myTextLayer);
              myRotationWordCount += myWords.length - 1;
              hControlCreate(
                myPrevControlLayer,
                myControlLayer,
                hLayers,
                rotated90,
              );
              for (var j = 0; j < hLayers.length; j += 1) {
                if (randomizing) {
                  myAnimIdx = Math.floor(
                    getRandom() * (TM.animationNames.length - 3),
                  );
                }
                if (TM.animationAnchor[myAnimIdx] != 1) {
                  TM_animAdj(hLayers[j], myAnimIdx, adjRect.height);
                }
                hLayers[j].threeDLayer = true;
                TM_addAnimation(
                  hLayers[j],
                  masterControlLayer,
                  markerCount,
                  myAnimIdx,
                );
                markerCount++;
                hLayers[j].selected = false;
                hLayers[j].shy = true;
                hLayers[j].locked = true;
              }
              myPrevLayer = hLayers[hLayers.length - 1];
              myPrevControlLayer = hLayers[hLayers.length - 1].parent;
            } else {
              if (TM.animationAnchor[myAnimIdx] != 1) {
                TM_animAdj(myTextLayer, myAnimIdx, adjRect.height);
              }
              myTextLayer.threeDLayer = true;
              TM_addAnimation(
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
          }
        }
        if (vBlock || i > 0) {
          if (myRotationWordCount >= TM.rotationThrottle) {
            rotateThis = getRandom() < TM.rotatePct / 100;
          } else {
            rotateThis = false;
          }
          success = false;
          if (rotateThis) {
            if (rotated90) {
              lr = [prevBB[0][0] - TM.gap, prevBB[1][1]];
              ul = [lr[0] - w, lr[1] - h];
              success = TM_checkBB(ul, lr);
              if (success) {
                rotated90 = false;
                rightJust = true;
                myRotationWordCount = 0;
              }
              if (!success) {
                ul = [prevBB[0][0] - w - TM.gap, prevBB[0][1]];
                lr = [ul[0] + w, ul[1] + h];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rotated90 = false;
                  myRotationWordCount = 0;
                }
              }
              if (!success) {
                ul = [prevBB[0][0] - h - TM.gap, prevBB[0][1]];
                lr = [ul[0] + h, ul[1] + w];
                success = TM_checkBB(ul, lr);
              }
              if (!success) {
                lr = [prevBB[0][0] - TM.gap, prevBB[1][1]];
                ul = [lr[0] - h, lr[1] - w];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rightJust = true;
                }
              }
            } else {
              ul = [prevBB[0][0], prevBB[1][1] + TM.gap];
              lr = [ul[0] + h, ul[1] + w];
              success = TM_checkBB(ul, lr);
              if (success) {
                rotated90 = true;
                rightJust = true;
                myRotationWordCount = 0;
              }
              if (!success) {
                lr = [prevBB[1][0], prevBB[1][1] + w + TM.gap];
                ul = [lr[0] - h, lr[1] - w];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rotated90 = true;
                  myRotationWordCount = 0;
                }
              }
              if (!success) {
                ul = [prevBB[0][0], prevBB[1][1] + TM.gap];
                lr = [ul[0] + w, ul[1] + h];
                success = TM_checkBB(ul, lr);
                if (success) {
                }
              }
              if (!success) {
                lr = [prevBB[1][0], prevBB[1][1] + h + TM.gap];
                ul = [lr[0] - w, lr[1] - h];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rightJust = true;
                }
              }
            }
          } else {
            if (rotated90) {
              ul = [prevBB[0][0] - h - TM.gap, prevBB[0][1]];
              lr = [ul[0] + h, ul[1] + w];
              success = TM_checkBB(ul, lr);
              if (success) {
              }
              if (!success) {
                lr = [prevBB[0][0] - TM.gap, prevBB[1][1]];
                ul = [lr[0] - h, lr[1] - w];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rightJust = true;
                }
              }
              if (!success) {
                lr = [prevBB[0][0] - TM.gap, prevBB[1][1]];
                ul = [lr[0] - w, lr[1] - h];
                success = TM_checkBB(ul, lr);
                if (success) {
                  myRotationWordCount = 0;
                  rotated90 = false;
                  rightJust = true;
                }
              }
              if (!success) {
                ul = [prevBB[0][0] - w - TM.gap, prevBB[0][1]];
                lr = [ul[0] + w, ul[1] + h];
                success = TM_checkBB(ul, lr);
                if (success) {
                  myRotationWordCount = 0;
                  rotated90 = false;
                }
              }
            } else {
              ul = [prevBB[0][0], prevBB[1][1] + TM.gap];
              lr = [ul[0] + w, ul[1] + h];
              success = TM_checkBB(ul, lr);
              if (success) {
              }
              if (!success) {
                lr = [prevBB[1][0], prevBB[1][1] + h + TM.gap];
                ul = [lr[0] - w, lr[1] - h];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rightJust = true;
                }
              }
              if (!success) {
                lr = [prevBB[1][0], prevBB[1][1] + w + TM.gap];
                ul = [lr[0] - h, lr[1] - w];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rotated90 = true;
                  rightJust = true;
                  myRotationWordCount = 0;
                }
              }
              if (!success) {
                ul = [prevBB[0][0], prevBB[1][1] + TM.gap];
                lr = [ul[0] + h, ul[1] + w];
                success = TM_checkBB(ul, lr);
                if (success) {
                  rotated90 = true;
                  myRotationWordCount = 0;
                }
              }
            }
            if (!success) {
              alert(
                "Sorry--TypeMonkey has painted itself into a corner. Please click the \'Undo it\' button and try again.",
              );
              return;
            }
          }
          if (vBlock) {
            vDepth = 0;
            vPrevLayer = null;
            for (var j = 0; j < vLayers.length; j += 1) {
              if (j > 0) {
                vDepth += TM.gap;
              }
              vLayer = vLayers[j];
              myRect = vLayer.sourceRectAtTime(0, true);
              if (prevRotated90) {
                if (rotated90) {
                  if (rightJust) {
                    x = lr[0] - vDepth - myRect.height / 2;
                    y = lr[1] - myRect.width / 2;
                  } else {
                    x = lr[0] - vDepth - myRect.height / 2;
                    y = ul[1] + myRect.width / 2;
                  }
                } else {
                  if (rightJust) {
                    x = lr[0] - myRect.width / 2;
                    y = ul[1] + vDepth + myRect.height / 2;
                  } else {
                    x = lr[0] - myRect.width / 2;
                    y = ul[1] + vDepth + myRect.height / 2;
                  }
                }
              } else {
                if (rotated90) {
                  if (rightJust) {
                    y = lr[1] - myRect.width / 2;
                    x = lr[0] - vDepth - myRect.height / 2;
                  } else {
                    y = ul[1] + myRect.width / 2;
                    x = lr[0] - vDepth - myRect.height / 2;
                  }
                } else {
                  if (rightJust) {
                    y = ul[1] + vDepth + myRect.height / 2;
                    x = lr[0] - myRect.width / 2;
                  } else {
                    y = ul[1] + vDepth + myRect.height / 2;
                    x = ul[0] + myRect.width / 2;
                  }
                }
              }
              vLayer.property("Position").setValue([x, y]);
              vDepth += myRect.height;
              if (rotated90) {
                vLayer.property("Rotation").setValue(90);
              }
              myWords = TM_getWords(vLayer);
              myControlLayerName =
                masterControlLayer == null
                  ? TM.masterControlLayerName
                  : vLayer.name + " (ctrl)";
              myControlLayer = myComp.layers.addSolid(
                [1, 1, 1],
                myControlLayerName,
                Math.round(myRect.width),
                Math.round(myRect.height),
                1,
                myComp.duration,
              );
              myControlLayer.startTime = 0;
              myControlLayer.comment = MG.ControlLayerID;
              myControlLayer.label = MG.ControlLayerColor;
              myControlLayer.moveBefore(vLayer);
              myControlLayer.property("Opacity").setValue(0);
              myControlLayer.property("Position").setValue([x, y]);
              if (rotated90) {
                myControlLayer.property("Rotation").setValue(90);
              }
              vLayer.parent = myControlLayer;
              if (masterControlLayer == null) {
                masterControlLayer = myControlLayer;
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
              if (myWords.length > 1) {
                hLayers = TM_hSplit(vLayer);
                myRotationWordCount += myWords.length - 1;
                hControlCreate(
                  myPrevControlLayer,
                  myControlLayer,
                  hLayers,
                  rotated90,
                );
                for (var k = 0; k < hLayers.length; k += 1) {
                  if (randomizing) {
                    myAnimIdx = Math.floor(
                      getRandom() * (TM.animationNames.length - 3),
                    );
                  }
                  if (TM.animationAnchor[myAnimIdx] != 1) {
                    TM_animAdj(hLayers[k], myAnimIdx, myRect.height);
                  }
                  hLayers[k].threeDLayer = true;
                  TM_addAnimation(
                    hLayers[k],
                    masterControlLayer,
                    markerCount,
                    myAnimIdx,
                  );
                  markerCount++;
                  hLayers[k].selected = false;
                  hLayers[k].shy = true;
                  hLayers[k].locked = true;
                }
                vLayer = hLayers[hLayers.length - 1];
                myPrevControlLayer = hLayers[hLayers.length - 1].parent;
              } else {
                if (randomizing) {
                  myAnimIdx = Math.floor(
                    getRandom() * (TM.animationNames.length - 3),
                  );
                }
                if (TM.animationAnchor[myAnimIdx] != 1) {
                  TM_animAdj(vLayer, myAnimIdx, myRect.height);
                }
                vLayer.threeDLayer = true;
                TM_addAnimation(
                  vLayer,
                  masterControlLayer,
                  markerCount,
                  myAnimIdx,
                );
                markerCount++;
                vLayer.selected = false;
                vLayer.shy = true;
                vLayer.locked = true;
                vPrevLayer = vLayer;
                if (myPrevControlLayer != null) {
                  myControlLayer.parent = myPrevControlLayer;
                }
                myPrevControlLayer = myControlLayer;
              }
            }
            myPrevLayer = vLayer;
            vLayer.selected = false;
          } else {
            myPos = [(ul[0] + lr[0]) / 2, (ul[1] + lr[1]) / 2];
            myTextLayer.property("Position").setValue(myPos);
            if (rotated90) {
              myTextLayer.property("Rotation").setValue(90);
            }
            myWords = TM_getWords(myTextLayer);
            myControlLayerName =
              masterControlLayer == null
                ? TM.masterControlLayerName
                : myTextLayer.name + " (ctrl)";
            myControlLayer = myComp.layers.addSolid(
              [1, 1, 1],
              myControlLayerName,
              Math.round(myRect.width),
              Math.round(myRect.height),
              1,
              myComp.duration,
            );
            myControlLayer.startTime = 0;
            myControlLayer.comment = MG.ControlLayerID;
            myControlLayer.label = MG.ControlLayerColor;
            myControlLayer.moveBefore(myTextLayer);
            myControlLayer.property("Opacity").setValue(0);
            myControlLayer.property("Position").setValue(myPos);
            if (rotated90) {
              myControlLayer.property("Rotation").setValue(90);
            }
            myTextLayer.parent = myControlLayer;
            if (masterControlLayer == null) {
              masterControlLayer = myControlLayer;
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
            adjRect = myTextLayer.sourceRectAtTime(0, true);
            if (myWords.length > 1) {
              hLayers = TM_hSplit(myTextLayer);
              myRotationWordCount += myWords.length - 1;
              hControlCreate(
                myPrevControlLayer,
                myControlLayer,
                hLayers,
                rotated90,
              );
              for (var j = 0; j < hLayers.length; j += 1) {
                if (randomizing) {
                  myAnimIdx = Math.floor(
                    getRandom() * (TM.animationNames.length - 3),
                  );
                }
                if (TM.animationAnchor[myAnimIdx] != 1) {
                  TM_animAdj(hLayers[j], myAnimIdx, adjRect.height);
                }
                hLayers[j].threeDLayer = true;
                TM_addAnimation(
                  hLayers[j],
                  masterControlLayer,
                  markerCount,
                  myAnimIdx,
                );
                markerCount++;
                hLayers[j].selected = false;
                hLayers[j].shy = true;
                hLayers[j].locked = true;
              }
              myPrevLayer = hLayers[hLayers.length - 1];
              myPrevControlLayer = hLayers[hLayers.length - 1].parent;
            } else {
              if (TM.animationAnchor[myAnimIdx] != 1) {
                TM_animAdj(myTextLayer, myAnimIdx, adjRect.height);
              }
              myTextLayer.threeDLayer = true;
              TM_addAnimation(
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
              if (myPrevControlLayer != null) {
                myControlLayer.parent = myPrevControlLayer;
              }
              myPrevControlLayer = myControlLayer;
            }
          }
          prevBB = [ul, lr];
        }
      }
    }
    masterControlLayer.threeDLayer = true;
    var myCtrlLayer = myPrevControlLayer;
    while (myCtrlLayer.parent != null) {
      myCtrlLayer.threeDLayer = true;
      myCtrlLayer.selected = false;
      myCtrlLayer.shy = true;
      myCtrlLayer = myCtrlLayer.parent;
    }
    myPrevControlLayer.comment = MG.LastControlID;
    masterControlLayer.comment = MG.MasterControlID;
    var myColorArray = [TM.currentColor1];
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp
        .enableCB.value
    ) {
      myColorArray.push(TM.currentColor2);
    }
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp
        .enableCB.value
    ) {
      myColorArray.push(TM.currentColor3);
    }
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp
        .enableCB.value
    ) {
      myColorArray.push(TM.currentColor4);
    }
    if (
      TM.uiPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp
        .enableCB.value
    ) {
      myColorArray.push(TM.currentColor5);
    }
    var colorIdx = 0;
    for (var i = 1; i <= myComp.numLayers; i += 1) {
      if (myComp.layer(i).comment == MG.TextLayerID) {
        addColors(myComp.layer(i), myColorArray, colorIdx);
        colorIdx++;
      }
    }
    myComp.hideShyLayers = true;
    if (
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp
        .camIncludeCB.value
    ) {
      MC_buildCamera();
    }
    app.endUndoGroup();
    app.activate();
    if (parseInt(app.version, 10) >= 11) {
      myComp.openInViewer();
    }
  }
  function MC_cleanCamera() {
    var myComp = app.project.activeItem;
    if (myComp != null && myComp instanceof CompItem) {
      for (var i = myComp.numLayers; i > 0; i--) {
        if (myComp.layer(i).comment == MG.MonkeyCamID) {
          myComp.layer(i).locked = false;
          myComp.layer(i).remove();
        }
      }
      for (var i = myComp.numLayers; i > 0; i--) {
        if (myComp.layer(i).comment == MG.MonkeyCamTargetID) {
          myComp.layer(i).locked = false;
          mySolidSource = myComp.layer(i).source;
          myComp.layer(i).remove();
          if (mySolidSource.usedIn.length == 0) {
            mySolidSource.remove();
          }
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
    } while (theControlLayer != null);
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
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
        .autoDollyDDL.selection.index != MC.autoDollyOff
    ) {
      var curRotate = 0;
      var dollyPct =
        MC.autoDollyPct[
          TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
            .autoDollyDDL.selection.index
        ];
      for (var i = theLayers.length - 1; i >= 0; i--) {
        theEffect = theTarget
          .property("Effects")
          .addProperty("ADBE Slider Control");
        theEffect.name = "Dolly " + (theLayers.length - i);
        theLayer = theLayers[i];
        curRotate += Math.round(theLayer.property("Z Rotation").value);
        if (
          curRotate % 180 != 0 &&
          !(
            TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp
              .autoRotateDDL.selection.index == 1
          )
        ) {
          if (
            theLayer.height / theComp.width >
            theLayer.width / theComp.height
          ) {
            dollyVal =
              ((theComp.width - theLayer.height / dollyPct) * MC.focalLength) /
              MC.filmSize;
          } else {
            dollyVal =
              ((theComp.height - theLayer.width / dollyPct) * MC.focalLength) /
              ((MC.filmSize * theComp.height) / theComp.width);
          }
        } else {
          if (
            theLayer.width / theComp.width >
            theLayer.height / theComp.height
          ) {
            dollyVal =
              ((theComp.width - theLayer.width / dollyPct) * MC.focalLength) /
              MC.filmSize;
          } else {
            dollyVal =
              ((theComp.height - theLayer.height / dollyPct) * MC.focalLength) /
              ((MC.filmSize * theComp.height) / theComp.width);
          }
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
    var posExpr =
      "function gv(TL,t){\r  return TL.toWorld(TL.anchorPoint,t);\r}\r";
    var xRotExpr =
      "function gv(TL,t){\r  u = TL.toWorldVec([1,0,0],t);\r  v = TL.toWorldVec([0,1,0],t);\r  w = TL.toWorldVec([0,0,1],t);\r  sinb = clamp(w[0],-1,1);\r  b = Math.asin(sinb);\r  cosb = Math.cos(b);\r  if (Math.abs(cosb) > .0005){\r    a = -Math.atan2(w[1],w[2]);\r  }else{\r    a = (sinb < 0  ?  -1 : 1)*Math.atan2(u[1],v[1]);\r  }\r  return radiansToDegrees(a);\r}\r";
    var yRotExpr =
      "function gv(TL,t){\r  w = TL.toWorldVec([0,0,1],t);\r  sinb = clamp(w[0],-1,1);\r  b = Math.asin(sinb);\r  return radiansToDegrees(b);\r}\r";
    var zRotExpr =
      "function gv(TL,t){\r  u = TL.toWorldVec([1,0,0],t);\r  v = TL.toWorldVec([0,1,0],t); \r  w = TL.toWorldVec([0,0,1],t);\r  sinb = clamp(w[0],-1,1);\r  b = Math.asin(sinb);\r  cosb = Math.cos(b);\r  if (Math.abs(cosb) > .0005){\r    c = -Math.atan2(v[0],u[0]);\r  }else{\r    c = 0;\r  }\r  return radiansToDegrees(c);\r}\r";
    var smoothExpr =
      'L = thisComp.layer("' +
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (m.key(n).time > time) n--;\r" +
      "  if (n == 0){\r" +
      '    gv(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else if (n == m.numKeys){\r" +
      '    gv(effect("Layer " + (m.numKeys))("ADBE Layer Control-0001"),m.key(m.numKeys).time);\r' +
      "  }else{\r" +
      '    v1 = gv(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      '    v2 = gv(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "    ease(time,m.key(n).time,m.key(n+1).time,v1,v2);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var linearExpr =
      'L = thisComp.layer("' +
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (m.key(n).time > time) n--;\r" +
      "  if (n == 0){\r" +
      '    gv(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else if (n == m.numKeys){\r" +
      '    gv(effect("Layer " + (m.numKeys))("ADBE Layer Control-0001"),m.key(m.numKeys).time);\r' +
      "  }else{\r" +
      '    v1 = gv(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      '    v2 = gv(effect("Layer " + (n+1))("ADBE Layer Control-0001"),m.key(n+1).time);\r' +
      "    linear(time,m.key(n).time,m.key(n+1).time,v1,v2);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var myIdx =
      TM.uiPal.grp.controlsGrp.leftControlsGrp.animationPnl.timeStretchGrp
        .timeStretchDDL.selection.index;
    var dMult = TM.timeStretchValues[myIdx];
    var d1 = MC.stopAndGoPre * dMult;
    var d2 = MC.stopAndGoDur * dMult - d1;
    var stopAndGoExpr =
      'L = thisComp.layer("' +
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (n == 1){\r" +
      '    gv(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else{\r" +
      '    v1 = gv(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '    v2 = gv(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      "    ease(time,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",v1,v2);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var linearStopAndGoExpr =
      'L = thisComp.layer("' +
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (n == 1){\r" +
      '    gv(effect("Layer " + 1)("ADBE Layer Control-0001"),m.key(1).time);\r' +
      "  }else{\r" +
      '    v1 = gv(effect("Layer " + (n-1))("ADBE Layer Control-0001"),m.key(n-1).time);\r' +
      '    v2 = gv(effect("Layer " + n)("ADBE Layer Control-0001"),m.key(n).time);\r' +
      "    linear(time,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",v1,v2);\r" +
      "  }\r" +
      "}else\r" +
      "  value";
    var smoothDollyExpr =
      'L = thisComp.layer("' +
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (m.key(n).time > time) n--;\r" +
      "  if (n == 0){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else if (n == m.numKeys){\r" +
      '    d = parent.effect("Dolly " + (m.numKeys))("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + (n+1))("ADBE Slider Control-0001");\r' +
      "    d = ease(time,m.key(n).time,m.key(n+1).time,v1,v2);\r" +
      "  }\r" +
      "  value + [0,0,d];\r" +
      "}else\r" +
      "  value";
    var linearDollyExpr =
      'L = thisComp.layer("' +
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (m.key(n).time > time) n--;\r" +
      "  if (n == 0){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else if (n == m.numKeys){\r" +
      '    d = parent.effect("Dolly " + (m.numKeys))("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + (n+1))("ADBE Slider Control-0001");\r' +
      "    d = linear(time,m.key(n).time,m.key(n+1).time,v1,v2);\r" +
      "  }\r" +
      "  value + [0,0,d];\r" +
      "}else\r" +
      "  value";
    var stopAndGoDollyExpr =
      'L = thisComp.layer("' +
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (n == 1){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + (n-1))("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      "    d = ease(time,m.key(n).time-" +
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
      TM.masterControlLayerName +
      '");\r' +
      "m = L.marker;\r" +
      "if (m.numKeys > 0){\r" +
      "  n = m.nearestKey(time).index;\r" +
      "  if (n == 1){\r" +
      '    d = parent.effect("Dolly " + 1)("ADBE Slider Control-0001");\r' +
      "  }else{\r" +
      '    v1 = parent.effect("Dolly " + (n-1))("ADBE Slider Control-0001");\r' +
      '    v2 = parent.effect("Dolly " + n)("ADBE Slider Control-0001");\r' +
      "    d = linear(time,m.key(n).time-" +
      d1 +
      ",m.key(n).time+" +
      d2 +
      ",v1,v2);\r" +
      "  }\r" +
      "  value + [0,0,d];\r" +
      "}else\r" +
      "  value";
    var focusDistanceExpr = "Math.abs(transform.position[2]);";
    if (
      app.project.activeItem == null ||
      !(app.project.activeItem instanceof CompItem)
    ) {
      alert("No comp active.");
      return;
    }
    var myComp = app.project.activeItem;
    var myTail = findLayerByComment(myComp, MG.LastControlID);
    if (myTail == null) {
      myTail = findLayerByComment(myComp, MG.MasterControlID);
    }
    if (myTail == null) {
      alert("Nothing to update.");
      return;
    }
    var myTarget = myComp.layers.addNull(myComp.duration);
    myTarget.startTime = 0;
    myTarget.name = MC.targetLayerName;
    myTarget.source.name = MC.targetLayerName;
    myTarget.comment = MG.MonkeyCamTargetID;
    myTarget.label = MG.MonkeyCamTargetColor;
    myTarget.threeDLayer = true;
    myTarget.enabled = false;
    var myCam = myComp.layers.addCamera(MC.cameraName, [
      myComp.width / 2,
      myComp.height / 2,
    ]);
    myCam.startTime = 0;
    myCam.outPoint = myComp.duration;
    myCam.comment = MG.MonkeyCamID;
    myCam.label = MG.MonkeyCamColor;
    var myZoom = (MC.focalLength / MC.filmSize) * myComp.width;
    myCam
      .property("Position")
      .setValue([myComp.width / 2, myComp.height / 2, -myZoom]);
    myCam.property("Zoom").setValue(myZoom);
    myCam.property("Focus Distance").setValue(myZoom);
    myCam.property("Focus Distance").expression = focusDistanceExpr;
    myCam.parent = myTarget;
    myCam.selected = false;
    MC_addCameraControls(myTarget, myTail, myComp);
    if (
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
        .movementDDL.selection.index == MC.stopAndGoIdx
    ) {
      comExpr = stopAndGoExpr;
    } else if (
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
        .movementDDL.selection.index == MC.smoothIdx
    ) {
      comExpr = smoothExpr;
    } else if (
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
        .movementDDL.selection.index == MC.linearStopAndGoIdx
    ) {
      comExpr = linearStopAndGoExpr;
    } else {
      comExpr = linearExpr;
    }
    myTarget.property("Position").expression = posExpr + comExpr;
    myTarget.property("X Rotation").expression = xRotExpr + comExpr;
    myTarget.property("Y Rotation").expression = yRotExpr + comExpr;
    if (
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp
        .autoRotateDDL.selection.index == 1
    ) {
      myTarget.property("Z Rotation").expression = zRotExpr + comExpr;
    } else {
      myTarget.property("Z Rotation").setValue(0);
    }
    if (
      TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp
        .autoDollyDDL.selection.index != MC.autoDollyOff
    ) {
      if (
        TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
          .movementDDL.selection.index == MC.stopAndGoIdx
      ) {
        myCam.property("Position").expression = stopAndGoDollyExpr;
      } else if (
        TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
          .movementDDL.selection.index == MC.smoothIdx
      ) {
        myCam.property("Position").expression = smoothDollyExpr;
      } else if (
        TM.uiPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp
          .movementDDL.selection.index == MC.linearStopAndGoIdx
      ) {
        myCam.property("Position").expression = linearStopAndGoDollyExpr;
      } else {
        myCam.property("Position").expression = linearDollyExpr;
      }
    }
    myTarget.locked = true;
    myTarget.shy = true;
  }
  function TM_buildPal(theObj) {
    function buildUI(theObj) {
      var myPal =
        theObj instanceof Panel
          ? theObj
          : new Window("palette", "TypeMonkey", undefined, {
              resizeable: true,
            });
      if (myPal != null) {
        var myResource =
          "group {\n\t\t\t\t\t\torientation: \'column\', alignment:\'left\', alignChildren:\'fill\', margins: 2, spacing: 7, \n\t\t\t\t\t\tlogoHelpGrp: Group {orientation: \'row\', spacing: 0, margins: 0, \n\t\t\t\t\t\t\tlogoGrp: Group {spacing: 0, margins: 0}, \n\t\t\t\t\t\t\thelpGrp: Group {orientation: \'column\', alignment: [\'left\',\'fill\'], spacing: 0, margins: [10,0,0,0], \n\t\t\t\t\t\t\t\thelpBtn: Button {preferredSize: [20,20], text: \'?\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\ttextPnl: Panel {orientation: \'column\', alignChildren:[\'center\',\'fill\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\ttxt: EditText {preferredSize: [420,200], text: \'Enter text here and click DO IT!\', properties:{multiline:true}}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t\tcontrolsGrp: Group {orientation: \'row\', alignChildren:[\'fill\',\'fill\'], spacing: 15, margins: 0, \n\t\t\t\t\t\t\tleftControlsGrp: Group {orientation: \'column\', alignment:\'left\', alignChildren:\'fill\', spacing: 7, margins: 0, \n\t\t\t\t\t\t\t\tlayoutPnl: Panel {orientation: \'column\', alignChildren:[\'right\',\'top\'], text: \'LAYOUT\', spacing: 0, margins: [10,6,10,4], \n\t\t\t\t\t\t\t\t\ttextOnlyGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 1, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Create Text Layers Only\'}, \n\t\t\t\t\t\t\t\t\t\ttextOnlyCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tallCapsGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'top\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'All Caps\'}, \n\t\t\t\t\t\t\t\t\t\tallCapsCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tfontSizeGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tfontSizeLabel: StaticText {text: \'Font Size\'}, \n\t\t\t\t\t\t\t\t\t\tfontSizeDDL: DropDownList {alignment: \'left\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tminGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Minimum\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'32\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmaxGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Maximum\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'220\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tspacingGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Spacing\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'10\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tverticalGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Rotation Probability %\'}, \n\t\t\t\t\t\t\t\t\t\ttxt: EditText {characters: 5, text: \'25\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tcolorPaletteLabelGrp: Group {orientation: \'row\', alignChildren:\'right\', spacing: 0, margins: 2, \n\t\t\t\t\t\t\t\t\t\tcolorPalettelabel: StaticText {text: \'Color Palette\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tcolorGrp: Group {orientation: \'row\', alignChildren:\'left\', spacing: 6, margins: 2, \n\t\t\t\t\t\t\t\t\t\tcolor1Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:true}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor2Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor3Grp: Group {orientation: \'column\',  \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor4Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tcolor5Grp: Group {orientation: \'column\', \n\t\t\t\t\t\t\t\t\t\t\tcolorBtn: Button {preferredSize: [20,20], name: \'Color Button\'}, spacing: 6, \n\t\t\t\t\t\t\t\t\t\t\tenableCB: Checkbox {text: \'\', value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tkulerBtn: Button {preferredSize: [20,20],text: \'K\', alignment: [\'left\',\'top\']}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tanimationPnl: Panel {orientation: \'column\', alignChildren:[\'right\',\'top\'], text: \'TYPE ANIMATION\', spacing: 0, margins: [10,10,10,4], \n\t\t\t\t\t\t\t\t\tanimationGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Style\'}, \n\t\t\t\t\t\t\t\t\t\tanimationDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\ttimeStretchGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\ttimeStretchLabel: StaticText {text: \'Speed\'}, \n\t\t\t\t\t\t\t\t\t\ttimeStretchDDL: DropDownList {alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tenableBlurGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'center\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Motion Blur\'}, \n\t\t\t\t\t\t\t\t\t\tenableBlurCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\trightControlsGrp: Group {orientation: \'column\', alignment:[\'fill\',\'fill\'] , alignChildren:[\'fill\',\'bottom\'], spacing: 7, margins: 0, \n\t\t\t\t\t\t\t\tbuildGrp: Group {orientation: \'row\', alignment: [\'fill\',\'top\'], alignChildren: [\'fill\',\'right\'], spacing: 10, margins: [0,0,0,0], \n\t\t\t\t\t\t\t\t\tunbuildBtn: Button {preferredSize: [80,-1],text: \'Undo it\', alignment: [\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\tbuildBtnPnl: Panel{orientation: \'column\', margins: 7, \n\t\t\t\t\t\t\t\t\t\tbuildBtn: Button {preferredSize: [80,-1], text: \'DO IT!\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tpresetGrp: Group {orientation: \'row\', alignment: [\'fill\',\'top\'], alignChildren: [\'fill\',\'right\'], spacing: 15, margins: [10,4,10,4], \n\t\t\t\t\t\t\t\t\tsaveBtn: Button {preferredSize: [80,-1],text: \'Save\', alignment: [\'right\',\'center\']}, \n\t\t\t\t\t\t\t\t\tloadBtn: Button {preferredSize: [80,-1], text: \'Load\', alignment: [\'right\',\'top\']}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\taddOnGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [10,4,10,0], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Text Mods\'}, \n\t\t\t\t\t\t\t\t\t\taddOnDDL: DropDownList {maximumSize: [115,50], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tmarkerPnl: Panel {orientation: \'column\', alignChildren:[\'right\',\'top\'], text: \'MARKERS\', spacing: 0, margins: [10,10,10,4], \n\t\t\t\t\t\t\t\t\tdurationGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [10,4,10,4], \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Time Span\'}, \n\t\t\t\t\t\t\t\t\t\tdurationDDL: DropDownList {preferredSize: [115,-1], alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmarkerSyncGrp: Group {orientation: \'column\', alignChildren:[\'right\',\'top\'], spacing: 0, \n\t\t\t\t\t\t\t\t\t\tmarkerSyncCBGrp: Group {orientation: \'row\', alignChildren:[\'left\',\'top\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Marker Sync\'}, \n\t\t\t\t\t\t\t\t\t\t\tmarkerSyncCB: Checkbox {value:false}, \n\t\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\t\tmessage: StaticText {text: \'Please select a marker guide layer\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\tmonkeyCamPnl: Panel {orientation: \'column\', alignment: [\'fill\',\'bottom\'], alignChildren:[\'right\',\'top\'], text: \'MONKEY CAM\', spacing: 0, margins: [10,5,10,4], \n\t\t\t\t\t\t\t\t\tcamIncludeGrp: Group {orientation: \'row\', alignChildren:[\'right\',\'top\'], spacing: 4, margins: 2, \n\t\t\t\t\t\t\t\t\t\tlabel: StaticText {text: \'Include Camera\'}, \n\t\t\t\t\t\t\t\t\t\tcamIncludeCB: Checkbox {value:true}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tmovementGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [10,4,10,4], \n\t\t\t\t\t\t\t\t\t\tmovemmetLabel: StaticText {text: \'Movement\'}, \n\t\t\t\t\t\t\t\t\t\tmovementDDL: DropDownList {preferredSize: [115,-1],alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tautoRotateGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [10,4,10,4], \n\t\t\t\t\t\t\t\t\t\tautoRotateLabel: StaticText {text: \'Auto Rotate\'}, \n\t\t\t\t\t\t\t\t\t\tautoRotateDDL: DropDownList {preferredSize: [115,-1],alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tautoDollyGrp: Group {orientation: \'row\', alignChildren: [\'right\',\'center\'], spacing: 4, margins: [10,4,10,4], \n\t\t\t\t\t\t\t\t\t\tautoDollyLabel: StaticText {text: \'Auto Frame\'}, \n\t\t\t\t\t\t\t\t\t\tautoDollyDDL: DropDownList {preferredSize: [115,-1],alignment: \'right\'}, \n\t\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t\t\tupdateBtn: Button {text: \'Update Cam\', alignment: \'right\'}, \n\t\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t\t}, \n\t\t\t\t\t\t}, \n\t\t\t\t\t}";
        myPal.grp = myPal.add(myResource);
        var myBinary = [__BLOB__BLOB_000001__];
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
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.textOnlyGrp.textOnlyCB.onClick =
          TM_clickTextOnlyCB;
        var g =
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp
            .colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, TM.defColor1);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, TM.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.onDraw =
          TM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.colorBtn.onClick =
          TM_clickSwatch1;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.enableCB.enabled = false;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color1Grp.enableCB.visible = false;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp
            .colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, TM.defColor2);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, TM.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.onDraw =
          TM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.colorBtn.onClick =
          TM_clickSwatch2;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color2Grp.enableCB.onClick =
          TM_clickCB2;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp
            .colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, TM.defColor3);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, TM.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.onDraw =
          TM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.colorBtn.onClick =
          TM_clickSwatch3;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color3Grp.enableCB.onClick =
          TM_clickCB3;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp
            .colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, TM.defColor4);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, TM.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.onDraw =
          TM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.colorBtn.onClick =
          TM_clickSwatch4;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color4Grp.enableCB.onClick =
          TM_clickCB4;
        g =
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp
            .colorBtn.graphics;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.fillBrush =
          g.newBrush(g.BrushType.SOLID_COLOR, TM.defColor5);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.strokePen =
          g.newPen(g.PenType.SOLID_COLOR, TM.black, 1);
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.onDraw =
          TM_customDraw;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.colorBtn.onClick =
          TM_clickSwatch5;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.color5Grp.enableCB.onClick =
          TM_clickCB5;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.colorGrp.kulerBtn.onClick =
          TM_clickLoadKuler;
        myPal.grp.controlsGrp.rightControlsGrp.buildGrp.buildBtnPnl.buildBtn.onClick =
          TM_buildText;
        myPal.grp.controlsGrp.rightControlsGrp.buildGrp.unbuildBtn.onClick =
          TM_cleanComp;
        myPal.grp.controlsGrp.rightControlsGrp.presetGrp.saveBtn.onClick =
          TM_clickSave;
        myPal.grp.controlsGrp.rightControlsGrp.presetGrp.loadBtn.onClick =
          TM_clickLoad;
        myPal.grp.logoHelpGrp.helpGrp.helpBtn.onClick = TM_clickHelp;
        myPal.grp.logoHelpGrp.helpGrp.keyBtn.onClick = TM_clickKey;
        for (var i = 0; i < TM.animationNames.length; i += 1) {
          if (TM.animationNames[i] == "-") {
            myPal.grp.controlsGrp.leftControlsGrp.animationPnl.animationGrp.animationDDL.add(
              "separator",
            );
          } else {
            myPal.grp.controlsGrp.leftControlsGrp.animationPnl.animationGrp.animationDDL.add(
              "item",
              TM.animationNames[i],
            );
          }
        }
        myPal.grp.controlsGrp.leftControlsGrp.animationPnl.animationGrp.animationDDL.selection =
          TM.randomizeIdx;
        for (var i = 0; i < TM.timeStretchNames.length; i += 1) {
          myPal.grp.controlsGrp.leftControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.add(
            "item",
            TM.timeStretchNames[i],
          );
        }
        myPal.grp.controlsGrp.leftControlsGrp.animationPnl.timeStretchGrp.timeStretchDDL.selection =
          TM.timeStretchIdx;
        for (var i = 0; i < TM.durationNames.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.add(
            "item",
            TM.durationNames[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.markerPnl.durationGrp.durationDDL.selection =
          TM.defaultDurationIdx;
        myPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.message.visible = false;
        myPal.grp.controlsGrp.rightControlsGrp.markerPnl.markerSyncGrp.markerSyncCBGrp.markerSyncCB.onClick =
          TM_clickMarkerSync;
        for (var i = 0; i < TM.fontSizeNames.length; i += 1) {
          myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.fontSizeDDL.add(
            "item",
            TM.fontSizeNames[i],
          );
        }
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.fontSizeDDL.selection =
          TM.randomFontSizeIdx;
        myPal.grp.controlsGrp.leftControlsGrp.layoutPnl.fontSizeGrp.fontSizeDDL.onChange =
          TM_changeFontSize;
        for (var i = 0; i < MC.movementTypes.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.add(
            "item",
            MC.movementTypes[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.camIncludeGrp.camIncludeCB.onClick =
          MC_clickInclude;
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.movementGrp.movementDDL.selection =
          MC.stopAndGoIdx;
        for (var i = 0; i < MC.autoDollyTypes.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.add(
            "item",
            MC.autoDollyTypes[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoDollyGrp.autoDollyDDL.selection =
          MC.autoDollyDefaultIdx;
        for (var i = 0; i < MC.autoRotateTypes.length; i += 1) {
          myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.add(
            "item",
            MC.autoRotateTypes[i],
          );
        }
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.autoRotateGrp.autoRotateDDL.selection =
          MC.autoRotateIdx;
        myPal.grp.controlsGrp.rightControlsGrp.monkeyCamPnl.updateBtn.onClick =
          MC_clickUpdate;
        var addOnFolder = Folder(
          File($.fileName).parent.fsName + "/" + TM.addOnFolderName,
        );
        TM.addOnFiles = [];
        if (addOnFolder.exists) {
          var addOns = addOnFolder.getFiles();
          for (var i = 0; i < addOns.length; i += 1) {
            var addOn = addOns[i];
            if (
              addOn.name.substr(-4).toLowerCase() == ".jsx" ||
              addOn.name.substr(-7).toLowerCase() == ".jsxbin"
            ) {
              TM.addOnFiles.push(addOn);
            }
          }
          if (TM.addOnFiles.length > 0) {
            myPal.grp.controlsGrp.rightControlsGrp.addOnGrp.addOnDDL.add(
              "item",
              "None",
            );
            for (var i = 0; i < TM.addOnFiles.length; i += 1) {
              myName = unescape(TM.addOnFiles[i].name);
              addOnDisplayName = myName
                .substr(0, myName.lastIndexOf("."))
                .replace(/_/g, " ");
              myPal.grp.controlsGrp.rightControlsGrp.addOnGrp.addOnDDL.add(
                "item",
                addOnDisplayName,
              );
            }
            myPal.grp.controlsGrp.rightControlsGrp.addOnGrp.addOnDDL.selection = 0;
          } else {
            myPal.grp.controlsGrp.rightControlsGrp.addOnGrp.enabled = false;
          }
        } else {
          myPal.grp.controlsGrp.rightControlsGrp.addOnGrp.enabled = false;
        }
      }
      return myPal;
    }
    TM.uiPal = buildUI(theObj);
    if (TM.uiPal != null) {
      if (TM.uiPal instanceof Window) {
        TM.uiPal.center();
        TM.uiPal.show();
      } else {
        TM.uiPal.layout.layout(true);
      }
    }
  }
  var MG = new Object();
  MG.TypeMonkeyID = "TypeMonkey";
  MG.MasterControlID = MG.TypeMonkeyID + " Master Control";
  MG.LastControlID = MG.TypeMonkeyID + " Last Control";
  MG.MonkeyCamID = MG.TypeMonkeyID + "Camera";
  MG.MonkeyCamTargetID = MG.TypeMonkeyID + "Target";
  MG.TextLayerID = MG.TypeMonkeyID + "Text Layer";
  MG.ControlLayerID = MG.TypeMonkeyID + "Control Layer";
  MG.MonkeyCamColor = 1;
  MG.MonkeyCamTargetColor = 11;
  MG.TextLayerColor = 1;
  MG.ControlLayerColor = 11;
  MG.SavedMarkerLayerColor = 2;
  var TM = new Object();
  TM.uiPal = null;
  TM.scriptName = "TypeMonkey";
  TM.version = "1.18";
  TM.presetVersion = "1.17";
  TM.trialWordLimit = 10;
  TM.trialLengthDays = 7;
  TM.copyright = "Copyright \xa9 2013,2014 Dan Ebberts & Orrin Zucker\n";
  TM.helpText1 =
    TM.scriptName +
    "\u2122 " +
    TM.version +
    "\n" +
    TM.copyright +
    "All rights reserved\n" +
    "www.typemonkey.net\n" +
    "\n";
  TM.helpText2 =
    "\nTypeMonkey is a blisteringly fast tool for creating kinetic typography.\n\nQuickstart:\n\nTo generate a default TypeMonkey build, create a 10 second comp and click TypeMonkey\u2019s DO IT! Button. This will build a kinetic text animation using the words in the text panel - complete with camera -  using the font selected from After Effects\u2019 native Character panel.\n\nBoom.\n\n";
  TM.helpText3 =
    "\nFor additional info on any of our other Monkey products, please visit us at www.typemonkey.net";
  var af_settings = {
    helpButtons: [
      {
        name: TM.scriptName + " Tips",
        url: "https://aescripts.com/typemonkey/",
      },
      { name: "About Us", url: "https://www.typemonkey.net" },
    ],
    helpText: TM.helpText1 + TM.helpText2 + TM.helpText3,
    privateNumber: 6435859466674324,
    productSKU: "EZTM-SUL",
    scriptAuthor: "Ebberts + Zucker",
    scriptName: TM.scriptName,
    scriptURL: "https://aescripts.com/typemonkey/",
    scriptVersion: TM.version,
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
    var wx = __BLOB__BLOB_000002__;
    var mx = __BLOB__BLOB_000003__;
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
  var e9VE = new a(af_settings);
  TM.masterControlLayerName = "TM Master Control";
  TM.savedMarkerLayerName = "TM Markers (saved)";
  TM.addOnFolderName = "(TypeMonkey_TextMods)";
  TM.addOnFiles = [];
  TM.addOnFileName = "";
  TM.animationNames = [
    "Cut On",
    "Fade",
    "Fast Scale",
    "Ease Out",
    "Ease In",
    "Bounce",
    "Back",
    "Type Out",
    "Swing Down",
    "Swing Up",
    "Swing Side",
    "Slide Left",
    "Slide Down",
    "Springy Scale",
    "Springy Swing Down",
    "Springy Swing Up",
    "Springy Swing Side",
    "Springy Slide Left",
    "Springy Slide Down",
    "-",
    "Randomize",
    "None",
  ];
  TM.randomizeIdx = 20;
  TM.animationAnchor = [
    1, 1, 1, 1, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 0, 2, 1, 1, 1, 1, 1, 1,
  ];
  TM.timeStretchNames = ["Fast", "Medium", "Slow", "Sloth"];
  TM.timeStretchValues = [1, 1.5, 2, 3];
  TM.timeStretchIdx = 0;
  TM.durationNames = ["Comp Duration", "Work Area"];
  TM.defaultDurationIdx = 1;
  TM.fontSizeNames = ["Random", "Constant"];
  TM.randomFontSizeIdx = 0;
  TM.markerText = "Please select a marker guide layer.";
  TM.defColor1 = [1, 1, 1];
  TM.defColor1Hex = 16777215;
  TM.defColor2 = [0.505, 0.502, 0.502];
  TM.defColor2Hex = 8421504;
  TM.defColor3 = [0.505, 0.502, 0.502];
  TM.defColor3Hex = 8421504;
  TM.defColor4 = [0.505, 0.502, 0.502];
  TM.defColor4Hex = 8421504;
  TM.defColor5 = [0.505, 0.502, 0.502];
  TM.defColor5Hex = 8421504;
  TM.currentColor1 = TM.defColor1;
  TM.currentColor1Hex = TM.defColor1Hex;
  TM.currentColor2 = TM.defColor2;
  TM.currentColor2Hex = TM.defColor2Hex;
  TM.currentColor3 = TM.defColor3;
  TM.currentColor3Hex = TM.defColor3Hex;
  TM.currentColor4 = TM.defColor4;
  TM.currentColor4Hex = TM.defColor4Hex;
  TM.currentColor5 = TM.defColor5;
  TM.currentColor5Hex = TM.defColor5Hex;
  TM.black = [0, 0, 0, 1];
  TM.rotatePct = 25;
  TM.boundingBoxes = [];
  TM.gap;
  TM.compCenter = [];
  TM.hardSpaceChar = "|";
  TM.markerSpaceChar = "^";
  TM.maxChars = 0;
  TM.minChars = 999999;
  TM.numChars = [];
  TM.rotationThrottle = 4;
  TM.helpTip =
    "Text Box Keyboard Commands:\r\r^\tInserts pauses & gaps into marker layer\r----------------------------------------\r[ ]\tSame size & baseline\r{ }\tSame size & stacked\r |\tCombines words into one group\r\r{[ ]}\tNesting Horizontal into Stacked is ok\r[{ }]\tNesting Stacked into Horizontal is not ok";
  var MC = new Object();
  MC.cameraName = "MonkeyCam";
  MC.targetLayerName = "MonkeyCam Target";
  MC.movementTypes = [
    "Smooth Stop & Go",
    "Smooth Constant",
    "Linear Stop & Go",
    "Linear Constant",
  ];
  MC.stopAndGoIdx = 0;
  MC.smoothIdx = 1;
  MC.linearStopAndGoIdx = 2;
  MC.stopAndGoPre = 0.167;
  MC.stopAndGoDur = 0.334;
  MC.uiPal = null;
  MC.focalLength = 50;
  MC.filmSize = 36;
  MC.autoDollyTypes = ["Off", "Loose", "Medium", "Tight", "Kong"];
  MC.autoDollyPct = [0.6, 0.4, 0.6, 0.8, 1];
  MC.autoDollyOff = 0;
  MC.autoDollyDefaultIdx = 2;
  MC.autoRotateTypes = ["Off", "On"];
  MC.autoRotateIdx = 1;
  if (parseInt(app.version, 10) < 9) {
    alert("TypeMonkey requires AE CS4 or later.");
  } else {
    if (e9VE.c()) {
      TM_buildPal(theObj);
    }
  }
}
deoz_TypeMonkey(this);
