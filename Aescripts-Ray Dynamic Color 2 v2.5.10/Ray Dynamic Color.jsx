/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function RayDynamicColor(thisObj, mode) {
  function startRDC(thisObj) {
    if (
      createImageResourceFile(
        rdc.binaryStrings.twirlDown,
        rdcf.userDataFolder,
      ) == null
    ) {
      return false;
    }
    if ($.os.indexOf("Win") != -1) {
      rdcf.winUnZip = createResourceFile(
        binStr.unzip.name + ".vbs",
        binStr.unzip.code,
        false,
        rdcf.userDataFolder,
      );
    }
    loadDefaultAseFromDisk();
    var isCompactUI =
      thisObj instanceof Panel &&
      thisObj.size.width < rdc.UIChangeCloseThreshold;
    var res = buildRes(isCompactUI);
    rdc.buttonsPerRow = isCompactUI ? 5 : 10;
    var myPalette = buildUI(thisObj, res);
    if (myPalette != null && myPalette instanceof Window) {
      myPalette.show();
    }
  }
  function getUserDataFolder() {
    var userDataFolder = Folder.userData;
    var aescriptsFolder = Folder(userDataFolder.toString() + rdc.strPrefsPath);
    if (!aescriptsFolder.exists) {
      var checkFolder = aescriptsFolder.create();
      if (!checkFolder) {
        alertUI(
          rdc.errDiskPermission
            .replace("%1", checkFolder.fsName)
            .replace("%2", userDataFolder),
        );
        aescriptsFolder = Folder.temp;
      }
    }
    return aescriptsFolder.toString();
  }
  function createImageResourceFile(image, resourceFolder) {
    var myFile = new File(resourceFolder + "/" + image.name);
    if (!File(myFile).exists) {
      myFile.encoding = "BINARY";
      myFile.open("w");
      myFile.write(image.bin);
      myFile.close();
    }
    if (myFile.exists) {
      return myFile;
    } else {
      alert(
        "There was an error writing necessary files to the home folder, please check to make sure After Effects has the correct write permissions to the home folder.\nUnless AE is able to write to the home folder, Ray is not able to proceed.",
      );
      return null;
    }
  }
  function getUiBrightness() {
    var uiBrightness = 0.25;
    if (parseFloat(app.version) >= 13.1) {
      var prefsName =
        parseFloat(app.version) >= 13.1
          ? "User Interface Brightness (4) [0.0..1.0]"
          : "User Interface Brightness (2) [0.0..1.0]";
      if (
        app.preferences.havePref(
          "Main Pref Section v2",
          prefsName,
          PREFType.PREF_Type_MACHINE_INDEPENDENT,
        )
      ) {
        uiBrightness = app.preferences.getPrefAsString(
          "Main Pref Section v2",
          prefsName,
          PREFType.PREF_Type_MACHINE_INDEPENDENT,
        );
      }
    } else {
      if (
        app.preferences.havePref(
          "Main Pref Section v2",
          "User Interface Brightness (2) [0.0..1.0]",
        )
      ) {
        uiBrightness = app.preferences.getPrefAsString(
          "Main Pref Section v2",
          "User Interface Brightness (2) [0.0..1.0]",
        );
      }
    }
    if (parseFloat(app.version) >= 13.1) {
      var t_min = 0;
      var t_max = 0.5;
      var value1 = 0.15;
      var value2 = 0.35;
      uiBrightness =
        value1 + ((uiBrightness - t_min) / (t_max - t_min)) * (value2 - value1);
    }
    return parseFloat(uiBrightness);
  }
  function buildRes(compactUI) {
    var userDataFolder = rdcf.userDataFolder;
    var orient = compactUI ? "column" : "row";
    var ddWidth = compactUI ? 160 : 160;
    var dd1Width = compactUI ? 160 : 160;
    var spacerWidth = compactUI ? 32 : 32;
    var spacer1Width = compactUI ? 32 : 32;
    var spacer2Width = compactUI ? 8 : 10;
    var spacer3Width = compactUI ? 8 : 0;
    var replaceWidth = compactUI ? 0 : 32;
    var revealBtnWidth = compactUI ? 60 : 64;
    var exportAseBtnWidth = compactUI ? 100 : 80;
    var spacing =
      parseFloat(app.version) > 11 && parseFloat(app.version) < 14 ? 1 : 0;
    var spacing1 = 0;
    var res =
      "group { \n\t\t\t\t\talignment: [\'left\',\'top\'], \n\t\t\t\t\talignChildren: [\'left\',\'top\'],  \n                      margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n\t\t\t\t\torientation: \'column\', \n                       palettesParentGrp: Group {\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'fill\',\'top\'], \n                            orientation: \'row\',\n                            margins: 0, padding: 0, spacing:0,\n                            paletteTwirlGrp: Group {\n                                alignment: [\'left\',\'top\'], \n                                alignChildren: [\'fill\',\'top\'], \n                                orientation: \'column\',\n                                margins: 0, padding: 0, spacing:1,\n                                    paletteTwirlSpacer: StaticText {text:\'\',preferredSize:[0,10],minimumSize:[0,10]},\n                                    paletteTwirl: IconButton {text: \'paletteTwirl\', name:\'paletteTwirl\', properties:{style:\'toolbutton\'},  alignment: [\'left\',\'top\'],preferredSize:[10,10]}\n                                                                        }\n                         palettesGrp: Group {\n                            margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'fill\',\'fill\'], \n                            orientation: \'" +
      orient +
      "\', \n                         palettesGrp0: Group {\n                            margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'left\',\'fill\'], \n                            orientation: \'row\', \n                            palettesDdl: DropDownList {alignment: [\'fill\',\'middle\'],preferredSize:[" +
      ddWidth +
      ",32]}, \n                            }\n                        palettesGrp1: Group {\n                            margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                            alignment: [\'right\',\'top\'], \n                            alignChildren: [\'right\',\'fill\'], \n                            orientation: \'row\', \n                            refreshBtn: IconButton {text: \'Refresh\', name:\'refreshBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      rdc.strRefreshHelpTip +
      "\', preferredSize:[32,32] }\n                             openBtn: IconButton {text: \'" +
      rdc.strOpen +
      "\', name:\'openBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      rdc.strOpenHelpTip +
      "\', preferredSize:[32,32]}\n                            importAseBtn: IconButton {visible: false, text: \'+ ASE\', name:\'importAseBtn\', properties:{style:\'toolbutton\'}, helpTip: \'Adds a new RDC palette based on an imported ASE file\', preferredSize:[32,32] }\n                            exportAseBtn: IconButton {visible: false, text: \'- ASE\', name:\'exportAseBtn\', properties:{style:\'toolbutton\'}, helpTip: \'Exports RDC palette as ASE file\', preferredSize:[32,32]}\n                            plusBtn: IconButton {text: \'+\', name:\'plusBtn\', properties:{style:\'toolbutton\'}, helpTip: \'Adds a new RDC palette\', preferredSize:[32,32],alignment: [\'right\',\'middle\']}\n                            }\n                            }\n                            }\n                           numsParentGrp: Group {\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'fill\',\'top\'], \n                            orientation: \'row\',\n                            margins: 0, padding: 0, spacing:0,\n                            paletteTwirlGrp: Group {\n                                alignment: [\'left\',\'top\'], \n                                alignChildren: [\'fill\',\'top\'], \n                                orientation: \'column\',\n                                margins: 0, padding: 0, spacing:1,\n                                    paletteTwirlSpacer: StaticText {text:\'\',preferredSize:[0,10],minimumSize:[0,10]},\n                                    paletteTwirl: IconButton {text: \'paletteTwirl\', name:\'paletteTwirl\', properties:{style:\'toolbutton\'},  alignment: [\'left\',\'top\'],preferredSize:[10,10],\n                                                                visible: false}\n                                                                }\n                            numsGrp: Group {\n                                    alignment: [\'left\',\'top\'], \n                                    alignChildren:[\'fill\',\'top\'],\n                                    orientation: \'column\',\n                                    name:\'buttons\',\n                                    margins: " +
      spacing1 +
      ", padding: " +
      spacing1 +
      ", spacing:" +
      spacing1 +
      ",\n                                }\n                               }\n                            extrasParentGrp: Group {\n                            alignment: [\'fill\',\'top\'], \n                            alignChildren: [\'fill\',\'top\'], \n                            orientation: \'row\',\n                            margins: 0, padding: 0, spacing:0,\n                            extrasTwirl: IconButton {text: \'extrasTwirl\', name:\'extrasTwirl\', properties:{style:\'toolbutton\'},  alignment: [\'left\',\'middle\'],preferredSize:[10,10], openState: false}\n                           extrasGrp: Group {\n                                        alignment: [\'fill\',\'top\'], \n                                        alignChildren: [\'fill\',\'fill\'], \n                                        orientation: \'" +
      orient +
      "\',\n                                        margins: 0, padding: 0, spacing:0,\n                              extrasGrp1: Group {\n                                    alignment: [\'fill\',\'top\'], \n                                    alignChildren: [\'fill\',\'fill\'], \n                                    orientation: \'row\',\n                                    margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                                      unLinkBtn: IconButton {text: \'" +
      rdc.strUnLink +
      "\', name:\'unLinkBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      rdc.strUnLinkHelpTip +
      "\', alignment: [\'left\',\'middle\'], preferredSize:[32,32]}\n                                      linkBtn: IconButton {text: \'" +
      rdc.strLink +
      "\', name:\'linkBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      rdc.strLinkHelpTip +
      "\', alignment: [\'left\',\'middle\'], preferredSize:[32,32]}\n                                      fillBtn: IconButton {state: \'2\', name:\'FillStroke\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      rdc.strFillHelpTip +
      "\',\n                                            preferredSize:[" +
      spacer1Width +
      ",32],minimumSize:[" +
      spacer1Width +
      ",32],maximumSize:[" +
      spacer1Width +
      ",32],alignment: [\'left\',\'middle\'] }\n                                      swapBtn: IconButton {text: \'Swap\', name:\'swapBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      rdc.strSwapHelpTip +
      "\',\n                                            preferredSize:[" +
      spacer1Width +
      ",32],minimumSize:[" +
      spacer1Width +
      ",32],maximumSize:[" +
      spacer1Width +
      ",32],alignment: [\'left\',\'middle\'] }\n                                      gearBtn: IconButton {text: \'?\', name:\'gearBtn\', properties:{style:\'toolbutton\'}, preferredSize:[32,32],\n                                            alignment: [\'right\',\'middle\']}\n                                           }\n                                    }\n                          }\n                       advGrp: Group {\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'left\',\'top\'], \n                            orientation: \'column\',\n                            margins: 0, padding: 0, spacing:0,\n                      advSubGrp: Group {\n                               alignment: [\'left\',\'top\'], \n                                alignChildren: [\'left\',\'top\'], \n                                orientation:  \'column\',\n                                margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                                expressionsGrp: Group {\n                                         alignment:[\'left\',\'top\'], \n                                        alignChildren: [\'left\',\'top\'], \n                                        margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                                        orientation: \'" +
      orient +
      "\',\n                                    expressionsGrp0: Group {\n                                         alignment:[\'left\',\'top\'], \n                                        alignChildren: [\'left\',\'top\'], \n                                        margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                                        orientation: \'row\',\n                                        spacer: StaticText {preferredSize:[" +
      spacer2Width +
      ",32],minimumSize:[" +
      spacer2Width +
      ",32],maximumSize:[" +
      spacer2Width +
      ",32]}, \n                                        expressionsDdl: DropDownList {alignment: [\'fill\',\'middle\'],preferredSize:[" +
      dd1Width +
      ",32]} ,\n                                        }\n                                    expressionsGrp1: Group {\n                                         alignment:[\'left\',\'top\'], \n                                        alignChildren: [\'left\',\'top\'], \n                                        margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                                        orientation: \'row\',\n                                        spacer: StaticText {preferredSize:[" +
      spacer3Width +
      ",32],minimumSize:[" +
      spacer3Width +
      ",32],maximumSize:[" +
      spacer3Width +
      ",32]}, \n                                        revealBtn: Button {text: \'Folder\',preferredSize:[" +
      revealBtnWidth +
      ",32],minimumSize:[" +
      revealBtnWidth +
      ",32],maximumSize:[" +
      revealBtnWidth +
      ",32]} ,\n                                        }\n                                     }\n                                   recurseSubGrp: Group {\n                                   alignment: [\'left\',\'top\'], \n                                    alignChildren: [\'left\',\'top\'], \n                                    orientation:  \'row\',\n                                    margins: 0, padding: 0, spacing:0,\n                                       spacer: StaticText {preferredSize:[" +
      spacer2Width +
      ",20],minimumSize:[" +
      spacer2Width +
      ",20],maximumSize:[" +
      spacer2Width +
      ",20]}, \n                                       scanRecurse: Checkbox {text: \'Recurse nested comps\'} ,\n                                     }\n                                   turnOffExpressionsSubGrp: Group {\n                                   alignment: [\'left\',\'top\'], \n                                    alignChildren: [\'left\',\'top\'], \n                                    orientation:  \'row\',\n                                    margins: 0, padding: 0, spacing:0,\n                                       spacer: StaticText {preferredSize:[" +
      spacer2Width +
      ",20],minimumSize:[" +
      spacer2Width +
      ",20],maximumSize:[" +
      spacer2Width +
      ",20]}, \n                                       turnOffExpressions: Checkbox {text: \'Turn off Expression link\'} ,\n                                     }\n                                 }\n                           }\n                       }\n\t\t\t\t}";
    return res;
  }
  function buildUI(thisObj, res) {
    var nameVers = rdc.scriptName + " v" + rdc.scriptVersion;
    if (thisObj instanceof Panel) {
      var myPal = thisObj;
    } else {
      var myPal = new Window("palette", nameVers, undefined, {
        resizeable: true,
      });
    }
    if (myPal != null) {
      function buildUiFunctions(myPal) {
        function fileListEventCatcher(eventObj) {
          var buttons = rdcf.numsButtons;
        }
        function scanColorsIntoPalette(isAdd, selection, addColors) {
          if (addColors == undefined) {
            addColors = true;
          }
          if (isAdd && rdc.dropdown.selection == null) {
            alertUI("Please select a palette from the dropdown");
            return false;
          }
          rdc.paletteName = "";
          rdc.scanErrors = [];
          var colorArray = scanForColors(isAdd, "scan", selection, addColors);
          if (colorArray instanceof Array && colorArray.length > 0) {
            addPaletteComp(
              rdc.dropdown,
              undefined,
              colorArray,
              rdc.paletteName,
              isAdd,
            );
            for (var i = 0; i < rdc.sampleApplyRayColorArray.length; i += 1) {
              var goAhead = applyRayColor(
                rdc.sampleApplyRayColorArray[i].layer,
                rdc.sampleApplyRayColorArray[i].comp,
                rdc.sampleApplyRayColorArray[i].prop,
                rdc.sampleApplyRayColorArray[i].num,
                rdc.sampleApplyRayColorArray[i].paletteName,
                rdc.sampleApplyRayColorArray[i].time,
                rdc.sampleApplyRayColorArray[i].mode,
                rdc.sampleApplyRayColorArray[i].addColors,
                rdc.sampleApplyRayColorArray[i].currentKeyIndex,
                rdc.sampleApplyRayColorArray[i].layerMode,
              );
              if (!goAhead) {
                return false;
              }
            }
            if (!rdc.turnOffExpressions && !isAdd) {
              for (var i = 0; i < rdc.rayAddedCompsArray.length; i += 1) {
                addHiddenPaletteComp(
                  rdc.rayAddedCompsArray[i],
                  rdc.strPalettePrefix + rdc.paletteName,
                );
              }
            }
          } else {
            if (!isAdd && colorArray.length == 0) {
              alertUI("No colors found within the selection");
            }
          }
          rdc.compsArray = [];
          rdc.sampleApplyRayColorArray = [];
          var amount = isAdd ? rdc.sampleCounter : colorArray.length;
          var str =
            amount + " color" + amount == 1
              ? " was"
              : "s were" + rdc.turnOffExpressions == 1
                ? " added"
                : " linked" + ' to palette "' + rdc.paletteName + '"';
          if (rdc.scanErrors.length > 0) {
            str +=
              "\nThe following layers were skipped because their colors are not part of the palette.\nAdd colors to the palette by holding Shift and then press Link.\n(Press enter to close this dialog)\n\n" +
              rdc.scanErrors.slice(0, 15).join("\n");
            if (rdc.scanErrors.length > 15) {
              str = nan + (scanErrors.length - 15) + " more";
            }
          }
          if (amount != undefined) {
            alertUI(str);
          }
          rdc.sampleCounter = 0;
          rdc.scanErrors = [];
        }
        rdc.gfx = myPal.graphics;
        rdcf.winGfx = myPal.graphics;
        myPal.grp.addEventListener("keydown", fileListEventCatcher, false);
        rdc.myPal = myPal;
        rdc.dropdown =
          myPal.grp.palettesParentGrp.palettesGrp.palettesGrp0.palettesDdl;
        rdc.dropdown.preferredSize.height =
          rdc.dropdown.minimumSize.height =
          rdc.dropdown.maximumSize.height =
            30;
        myPal.grp.advGrp.advSubGrp.expressionsGrp.expressionsGrp1.margins.bottom = 5;
        var userDataFolder = rdcf.userDataFolder;
        rdc.twirl_Icon = createImageResourceFile(
          rdc.binaryStrings.twirl,
          userDataFolder,
        ).fsName;
        rdc.twirlDown_Icon = createImageResourceFile(
          rdc.binaryStrings.twirlDown,
          userDataFolder,
        ).fsName;
        rdc.refresh_Icon = createImageResourceFile(
          rdc.binaryStrings.refresh,
          userDataFolder,
        ).fsName;
        rdc.open_Icon = createImageResourceFile(
          rdc.binaryStrings.open,
          userDataFolder,
        ).fsName;
        rdc.plus_Icon = createImageResourceFile(
          rdc.binaryStrings.plus,
          userDataFolder,
        ).fsName;
        rdc.unLink_Icon = createImageResourceFile(
          rdc.binaryStrings.unLink,
          userDataFolder,
        ).fsName;
        rdc.link_Icon = createImageResourceFile(
          rdc.binaryStrings.link,
          userDataFolder,
        ).fsName;
        rdc.FillStroke0_Icon = createImageResourceFile(
          rdc.binaryStrings.FillStroke0,
          userDataFolder,
        ).fsName;
        rdc.FillStroke1_Icon = createImageResourceFile(
          rdc.binaryStrings.FillStroke1,
          userDataFolder,
        ).fsName;
        rdc.FillStroke2_Icon = createImageResourceFile(
          rdc.binaryStrings.FillStroke2,
          userDataFolder,
        ).fsName;
        rdc.swap_Icon = createImageResourceFile(
          rdc.binaryStrings.swap,
          userDataFolder,
        ).fsName;
        rdc.gear_Icon = createImageResourceFile(
          rdc.binaryStrings.gear,
          userDataFolder,
        ).fsName;
        myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.icon =
          rdc.twirlDown_Icon;
        myPal.grp.numsParentGrp.paletteTwirlGrp.paletteTwirl.icon =
          rdc.twirl_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.refreshBtn.icon =
          rdc.refresh_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.openBtn.icon =
          rdc.open_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.plusBtn.icon =
          rdc.plus_Icon;
        myPal.grp.extrasParentGrp.extrasTwirl.icon = rdc.twirl_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.unLinkBtn.icon =
          rdc.unLink_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.icon =
          rdc.link_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.fillBtn.icon =
          rdc.FillStroke2_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.swapBtn.icon =
          rdc.swap_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.gearBtn.icon =
          rdc.gear_Icon;
        myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
          rdc.dropdown.selection != null;
        myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.onClick =
          function () {
            myPal.grp.palettesParentGrp.maximumSize.height = 0;
            myPal.grp.numsParentGrp.paletteTwirlGrp.paletteTwirl.visible = true;
            myPal.grp.layout.layout(true);
            myPal.grp.layout.resize();
          };
        myPal.grp.numsParentGrp.paletteTwirlGrp.paletteTwirl.onClick =
          function () {
            myPal.grp.palettesParentGrp.maximumSize.height = 100;
            myPal.grp.numsParentGrp.paletteTwirlGrp.paletteTwirl.visible = false;
            myPal.grp.layout.layout(true);
            myPal.grp.layout.resize();
          };
        myPal.grp.extrasParentGrp.extrasTwirl.openState = rdcf.showAdvanced =
          app.settings.haveSetting(rdc.prefsSectionName, "extrasTwirlOpenState")
            ? !(
                app.settings.getSetting(
                  rdc.prefsSectionName,
                  "extrasTwirlOpenState",
                ) == "false"
              )
            : false;
        myPal.grp.advGrp.maximumSize.height = myPal.grp.extrasParentGrp
          .extrasTwirl.openState
          ? 140
          : 0;
        myPal.grp.extrasParentGrp.extrasTwirl.icon = !myPal.grp.extrasParentGrp
          .extrasTwirl.openState
          ? rdc.twirl_Icon
          : rdc.twirlDown_Icon;
        myPal.grp.extrasParentGrp.extrasTwirl.onClick = function () {
          myPal.grp.advGrp.maximumSize.height = this.openState ? 0 : 140;
          myPal.grp.extrasParentGrp.extrasTwirl.icon = this.openState
            ? rdc.twirl_Icon
            : rdc.twirlDown_Icon;
          this.openState = rdcf.showAdvanced = !this.openState;
          app.settings.saveSetting(
            rdc.prefsSectionName,
            "extrasTwirlOpenState",
            this.openState,
          );
          myPal.layout.layout(true);
          myPal.layout.resize();
        };
        rdc.fillStrokeBtn =
          myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.fillBtn.state =
            app.settings.haveSetting(rdc.prefsSectionName, "FillStrokeState")
              ? app.settings.getSetting(rdc.prefsSectionName, "FillStrokeState")
              : "2";
        multiPurposeButton(
          myPal,
          undefined,
          "set",
          rdc.fillStrokeBtn,
          3,
          myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.fillBtn,
        );
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.fillBtn.onClick =
          function () {
            rdc.fillStrokeBtn = multiPurposeButton(
              myPal,
              this,
              "cycle",
              undefined,
              3,
              myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.fillBtn,
            );
            colorPalettesRefresh(myPal);
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.swapBtn.onClick =
          function () {
            swap();
          };
        rdc.buttonsGrp = myPal.grp.numsParentGrp.numsGrp;
        rdc.scanRecurse =
          myPal.grp.advGrp.advSubGrp.recurseSubGrp.scanRecurse.value =
            app.settings.haveSetting(rdc.prefsSectionName, "scanRecurse")
              ? !(
                  app.settings.getSetting(
                    rdc.prefsSectionName,
                    "scanRecurse",
                  ) == "false"
                )
              : rdc.scanRecurse;
        rdc.turnOffExpressions =
          myPal.grp.advGrp.advSubGrp.turnOffExpressionsSubGrp.turnOffExpressions.value =
            app.settings.haveSetting(rdc.prefsSectionName, "turnOffExpressions")
              ? !(
                  app.settings.getSetting(
                    rdc.prefsSectionName,
                    "turnOffExpressions",
                  ) == "false"
                )
              : rdc.turnOffExpressions;
        populatePalettesDropDown(rdc.dropdown);
        toggleUIEnabledState(myPal, rdc.dropdown.selection != null);
        colorPalettesRefresh(myPal);
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.refreshBtn.onClick =
          function () {
            app.beginUndoGroup(rdc.scriptName + " " + this.text);
            colorPalettesRefresh(myPal, true);
            app.endUndoGroup();
          };
        if (parseFloat(app.version) >= 11) {
          myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.openBtn.onClick =
            function () {
              if (rdcf.paletteComps.length > 0) {
                var sel =
                  rdc.dropdown.selection != null
                    ? rdc.dropdown.selection.index
                    : 0;
                try {
                  rdcf.paletteComps[sel].openInViewer();
                  if (rdcf.paletteComps[sel].numLayers > 0) {
                    rdcf.paletteComps[sel].layer(1).selected = true;
                  }
                } catch (e) {}
              }
            };
        }
        rdc.dropdown.onChange = function () {
          if (rdcf.paletteComps.length > 0) {
            var sel = this.selection != null ? this.selection.index : 0;
            setButtonColors(rdcf.paletteComps[sel]);
            addPaletteCompComment(sel);
          }
          myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
            rdc.dropdown.selection != null;
          toggleUIEnabledState(myPal, rdc.dropdown.selection != null);
        };
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.plusBtn.onClick =
          function () {
            app.beginUndoGroup(rdc.scriptName + " " + this.text);
            var selection = determineSelectionScope();
            if (
              ScriptUI.environment.keyboardState.shiftKey &&
              ScriptUI.environment.keyboardState.altKey
            ) {
              exportAse(rdc.dropdown);
            } else if (
              ScriptUI.environment.keyboardState.shiftKey &&
              !ScriptUI.environment.keyboardState.altKey
            ) {
              var aseFile = importAse();
              if (aseFile) {
                addPaletteComp(rdc.dropdown, aseFile);
                myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
                  rdc.dropdown.selection != null;
              }
            } else if (
              ScriptUI.environment.keyboardState.altKey ||
              selection == null
            ) {
              addPaletteComp(rdc.dropdown);
            } else {
              scanColorsIntoPalette(false, selection);
            }
            app.endUndoGroup();
            myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
              rdc.dropdown.selection != null;
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.unLinkBtn.onClick =
          function () {
            app.beginUndoGroup(rdc.scriptName + " " + this.text);
            rdc.paletteName = "";
            rdc.scanErrors = [];
            scanForColors(false, this.text.toLowerCase());
            if (rdc.scanErrors.length > 0) {
              alertUI(
                rdc.errBakeRelink.replace(/%1/, this.text) +
                  "\n" +
                  rdc.swapErrors.join("\n"),
              );
            }
            rdc.scanErrors = [];
            app.endUndoGroup();
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.onClick =
          function () {
            if (
              rdc.turnOffExpressions &&
              !ScriptUI.environment.keyboardState.shiftKey
            ) {
              alertUI(rdc.errTurnOffExpressions.replace(/%1/g, this.text));
              return;
            }
            if (rdc.dropdown.selection == null) {
              alertUI(
                "Please select a palette to link the colors to from the dropdown",
              );
              return;
            }
            if (ScriptUI.environment.keyboardState.altKey) {
              if (rdc.dropdown.selection != null) {
                if (rdc.isTrial) {
                  alertUI(rdc.errTrialButtonLimit);
                  return;
                }
                app.beginUndoGroup(
                  rdc.scriptName + " Replace " + rdc.dropdown.selection.text,
                );
                applyPaletteToSelectedProperties(
                  rdc.strPalettePrefix + rdc.dropdown.selection.text,
                  0,
                  "select",
                );
                myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
                  rdc.dropdown.selection != null;
                app.endUndoGroup();
              } else {
                alertUI(rdc.errSelectPalette);
                return;
              }
            } else {
              app.beginUndoGroup(rdc.scriptName + " " + this.text);
              colorPalettesRefresh(myPal);
              var addColors = ScriptUI.environment.keyboardState.shiftKey;
              var selection = determineSelectionScope();
              if (selection == null) {
                alertUI(rdc.errLinkWithoutSelection);
                return;
              }
              scanColorsIntoPalette(true, selection, addColors);
              app.endUndoGroup();
            }
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.gearBtn.onClick =
          function () {
            helpUI(myPal);
          };
        myPal.grp.advGrp.advSubGrp.recurseSubGrp.scanRecurse.onClick =
          function () {
            rdc.scanRecurse = this.value;
            app.settings.saveSetting(
              rdc.prefsSectionName,
              "scanRecurse",
              this.value,
            );
          };
        myPal.grp.advGrp.advSubGrp.turnOffExpressionsSubGrp.turnOffExpressions.onClick =
          function () {
            if (rdc.dropdown.selection != null) {
              myPal.grp.advGrp.advSubGrp.expressionsGrp.enabled =
                myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.enabled =
                  !this.value;
            }
            rdc.turnOffExpressions = this.value;
            app.settings.saveSetting(
              rdc.prefsSectionName,
              "turnOffExpressions",
              this.value,
            );
          };
        var expressionsDropDown = (rdcf.expressionsDropDown =
          myPal.grp.advGrp.advSubGrp.expressionsGrp.expressionsGrp0.expressionsDdl);
        expressionsDropDown.preferredSize.height =
          expressionsDropDown.minimumSize.height =
          expressionsDropDown.maximumSize.height =
            30;
        expressionsDropDown.minimumSize.width = 60;
        populateExpressionsDropDown(rdcf.expressionsDropDown);
        if (rdc.isTrial) {
          rdcf.expressionsDropDown.enabled = false;
          rdcf.expressionsDropDown.selection = 0;
        }
        myPal.grp.advGrp.advSubGrp.expressionsGrp.expressionsGrp0.expressionsDdl.onChange =
          function () {
            app.settings.saveSetting(
              rdc.prefsSectionName,
              "expression",
              this.selection.index,
            );
          };
        myPal.grp.advGrp.advSubGrp.expressionsGrp.expressionsGrp1.revealBtn.onClick =
          function () {
            revealInFinder(rdcf.userDataFolder + "/Expressions");
          };
        var saveRes = myPal.size != undefined ? myPal.size.width : 1000;
        myPal.onResize = function () {
          rebuildRes(myPal, saveRes, this);
        };
        myPal.layout.layout(true);
        return myPal;
      }
      function rebuildRes(myPal, saveRes, thisObj) {
        var saveSel =
          rdc.dropdown.selection != null ? rdc.dropdown.selection.index : null;
        if (
          (thisObj.size.width < rdc.UIChangeCloseThreshold &&
            saveRes >= rdc.UIChangeOpenThreshold) ||
          (thisObj.size.width > rdc.UIChangeOpenThreshold &&
            saveRes <= rdc.UIChangeCloseThreshold)
        ) {
          rdc.buttonsPerRow =
            thisObj.size.width < rdc.UIChangeCloseThreshold ? 5 : 10;
          var res = buildRes(thisObj.size.width < rdc.UIChangeCloseThreshold);
          myPal.remove(myPal.grp);
          myPal.grp = myPal.add(res);
          myPal.grp.maximumSize.width = thisObj.size.width < 250 ? 200 : 355;
          buildUiFunctions(myPal);
          myPal.grp.palettesParentGrp.palettesGrp.palettesGrp0.palettesDdl.selection =
            saveSel;
          saveRes = thisObj.size.width;
        }
      }
      myPal.grp = myPal.add(res);
      myPal.grp.maximumSize.width = 355;
      return buildUiFunctions(myPal);
    }
  }
  function toggleUIEnabledState(myPal, active) {
    rdc.dropdown.enabled =
      myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.openBtn.enabled =
      myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.enabled =
      myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.fillBtn.enabled =
      myPal.grp.advGrp.advSubGrp.expressionsGrp.enabled =
        rdc.dropdown.selection != null;
    if (rdc.dropdown.selection != null) {
      myPal.grp.advGrp.advSubGrp.expressionsGrp.enabled =
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.enabled =
          !rdc.turnOffExpressions;
    }
  }
  function swap() {
    app.beginUndoGroup(rdc.scriptName + " " + rdc.strSwap);
    rdc.swapErrors = [];
    rdc.swapObj = { colors: [] };
    applyPaletteToSelectedProperties(undefined, -1, "swap");
    swapFillsAndStrokes();
    app.endUndoGroup();
    if (rdc.swapErrors.length > 0) {
      alertUI(rdc.errSwapNonShapeLayer + "\n" + rdc.swapErrors.join("\n"));
    }
    rdc.swapErrors = [];
  }
  function helpUI(myPal) {
    var helpPal = new Window(
      "dialog",
      rdc.scriptName + " v" + rdc.scriptVersion,
      undefined,
      { resizeable: true },
    );
    var userDataFolder = rdcf.userDataFolder;
    if (helpPal != null) {
      var res =
        "group { \n\t\torientation: \'column\', \n\t\talignment: [\'fill\',\'fill\'], \n\t\talignChildren: [\'fill\',\'fill\'], \n                   infoGrp: Group { \n                   alignment: [\'fill\',\'top\'], \n                   alignChildren: [\'fill\',\'fill\'], \n                   orientation: \'column\', \n                      header: Image {name:\'header\', properties:{style:\'toolbutton\'}, alignment: [\'fill\',\'fill\']}\n                      optionsGrp: Group{ \n                           alignment: [\'fill\',\'top\'], \n                           alignChildren: [\'fill\',\'fill\'], \n                           orientation: \'row\', \n                           optionsGrpLeft: Group{ \n                                   alignment: [\'fill\',\'top\'], \n                                   alignChildren: [\'fill\',\'fill\'], \n                                   orientation: \'column\', \n                                  dismiss: Checkbox{text:\'" +
        rdc.strDismiss +
        "\',alignment: [\'left\',\'fill\']},\n                                  turnOnSwatchNums: Checkbox {text: \'Turn on swatch numbers\'} ,\n                                  }\n                           optionsGrpRight: Group{ \n                                   alignment: [\'fill\',\'top\'], \n                                   alignChildren: [\'fill\',\'fill\'], \n                                   orientation: \'column\', \n                                  linearizeUI: Checkbox {text: \'Linear Color Space\', helpTip: \'Check this box if you are using the \"Linearize Working Space\" option in your project color settings\'} ,\n                                  moveColorLayer: Checkbox {text: \'Keep color layer on top in palette comp\', helpTip: \'This will move the colors layer in the palette comp to the top to avoid conflicts with other tools like Universal Audio\'} ,\n                                  }\n                          } \n                      tutBtn: Button {text:\'Tutorials\', preferredSize:[150,30], alignment: [\'fill\',\'fill\']} \n                      supportGrp: Group { \n                            alignment: [\'fill\',\'bottom\'], \n                            alignChildren: [\'fill\',\'fill\'], \n                       forumsBtn: Button {text:\'Support Forum\', preferredSize:[150,30]} \n                       supportBtn: Button {text:\'Open Help Ticket\', preferredSize:[150,30]} \n                       }\n                      fill: StaticText {preferredSize:[150,10]}, \n                      hdr: StaticText {properties:{multiline:true}}, \n                      lic:Button {text:\'Deactivate License\', preferredSize:[150,30], alignment: [\'fill\',\'fill\']} \n                      updateCheck: Checkbox{text:\'Check for updates automatically\',alignment: [\'left\',\'fill\']},\n                      txt: StaticText {properties:{multiline:true}, preferredSize:[150,50]}, \n\t\t\t\t} \n\t\t\t\tokGrp: Group { \n                alignment: [\'fill\',\'bottom\'], \n                alignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\tokBtn: Button {text:\'OK\', preferredSize:[150,30]} \n\t\t\t\t} \n\t\t}";
      helpPal.grp = helpPal.add(res);
      helpPal.grp.infoGrp.txt.text = rdc.strAbout1;
      helpPal.grp.infoGrp.hdr.text = n448aa.getRegistration();
      helpPal.grp.infoGrp.updateCheck.value = n448aa.getUpdateCheckStatus();
      helpPal.grp.infoGrp.updateCheck.onClick = function () {
        n448aa.doUpdateCheck(this.value);
      };
      helpPal.grp.infoGrp.lic.visible = !n448aa.t();
      helpPal.grp.infoGrp.lic.onClick = function () {
        if (n448aa.r()) {
          helpPal.grp.infoGrp.hdr.text = n448aa.getRegistration();
          this.visible = false;
          rdc.isTrial = n448aa.t();
        }
      };
      var image = ScriptUI.newImage(
        createImageResourceFile(rdc.binaryStrings.helpHeader, userDataFolder)
          .fsName,
      );
      helpPal.grp.infoGrp.header.icon = image;
      helpPal.grp.infoGrp.header.onDraw = function (drawingState) {
        this.graphics.drawImage(
          image,
          0,
          0,
          image.size[0] / 2,
          image.size[1] / 2,
        );
      };
      helpPal.grp.infoGrp.header.maximumSize = [
        image.size[0] / 2,
        image.size[1] / 2,
      ];
      helpPal.grp.infoGrp.optionsGrp.optionsGrpLeft.dismiss.value =
        !rdc.showErrors;
      helpPal.grp.infoGrp.optionsGrp.optionsGrpLeft.turnOnSwatchNums.value =
        rdc.turnOnSwatchNums;
      if (parseFloat(app.version) < 12) {
        helpPal.grp.infoGrp.optionsGrp.optionsGrpLeft.turnOnSwatchNums.visible = false;
        helpPal.grp.infoGrp.maximumSize = [0, 0];
        rdc.turnOnSwatchNums = false;
      }
      helpPal.grp.infoGrp.optionsGrp.optionsGrpLeft.turnOnSwatchNums.onClick =
        function () {
          rdc.turnOnSwatchNums = this.value;
          app.settings.saveSetting(
            rdc.prefsSectionName,
            "turnOnSwatchNums",
            this.value,
          );
          colorPalettesRefresh(myPal);
        };
      helpPal.grp.infoGrp.optionsGrp.optionsGrpRight.linearizeUI.value =
        rdc.linearizeUI;
      helpPal.grp.infoGrp.optionsGrp.optionsGrpRight.linearizeUI.onClick =
        function () {
          rdc.linearizeUI = this.value;
          app.settings.saveSetting(
            rdc.prefsSectionName,
            "linearizeUI",
            this.value,
          );
          colorPalettesRefresh(myPal);
        };
      helpPal.grp.infoGrp.optionsGrp.optionsGrpRight.moveColorLayer.value =
        rdc.moveColorLayer;
      helpPal.grp.infoGrp.optionsGrp.optionsGrpRight.moveColorLayer.onClick =
        function () {
          rdc.moveColorLayer = this.value;
          app.settings.saveSetting(
            rdc.prefsSectionName,
            "moveColorLayer",
            this.value,
          );
        };
      helpPal.grp.infoGrp.optionsGrp.optionsGrpLeft.dismiss.onClick =
        function () {
          rdc.showErrors = !this.value;
          app.settings.saveSetting(
            rdc.prefsSectionName,
            "showErrors",
            rdc.showErrors,
          );
        };
      helpPal.grp.infoGrp.tutBtn.onClick = function () {
        n448aa.openURL(rdc.scriptUrl);
        helpPal.close();
      };
      helpPal.grp.infoGrp.supportGrp.supportBtn.onClick = function () {
        n448aa.openSupportTicket();
        helpPal.close();
      };
      helpPal.grp.infoGrp.supportGrp.forumsBtn.onClick = function () {
        n448aa.openURL(rdc.forumUrl);
        helpPal.close();
      };
      helpPal.grp.okGrp.okBtn.onClick = function () {
        helpPal.close();
      };
      helpPal.layout.layout(true);
      helpPal.layout.resize();
      helpPal.onResizing = helpPal.onResize = function () {
        this.layout.resize();
      };
      helpPal.show();
    }
  }
  function isValidObject(objToTest) {
    if (null == objToTest) {
      return false;
    }
    if ("undefined" == typeof objToTest) {
      return false;
    }
    return true;
  }
  function colorPalettesRefresh(myPal, isRefreshButton) {
    if (isRefreshButton == undefined) {
      isRefreshButton = false;
    }
    if (rdc.dropdown.selection == null) {
      populatePalettesDropDown(rdc.dropdown);
    }
    if (rdc.dropdown.selection != null) {
      var saveSel = rdc.dropdown.selection.index;
      try {
        saveCompId = rdcf.paletteComps[rdc.dropdown.selection.index].id;
      } catch (e) {}
      populatePalettesDropDown(rdc.dropdown);
      if (
        rdcf.paletteComps.length > saveSel &&
        saveCompId != undefined &&
        rdcf.paletteComps[saveSel].id == saveCompId
      ) {
        rdc.dropdown.selection = saveSel;
      } else {
        var newIndex = isInArrayIndex(saveCompId, rdcf.paletteComps, "id");
        if (newIndex >= 0) {
          rdc.dropdown.selection = newIndex;
        } else {
          if (!isRefreshButton) {
            alertUI(rdc.errPaletteCompInvalid, "OK, Refresh");
          }
          colorPalettesRefresh(myPal);
        }
      }
    }
    myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
      rdc.dropdown.selection != null;
  }
  function multiPurposeButton(
    myPal,
    obj,
    action,
    state,
    numStates,
    btn1,
    btn2,
  ) {
    if (btn2 == undefined) {
      btn2 = btn1;
    }
    switch (action) {
      case "cycle":
        var imageName = File(obj.image.pathname).name;
        var imageNum = parseInt(imageName.match(/[0-9]+/), 10);
        var toolName = imageName.replace(/[0-9]+Btn([0-9]+)?\.png$/i, "");
        var nextTool = toolName + ((imageNum + 1) % numStates).toString();
        btn1.state = btn2.state = ((imageNum + 1) % numStates).toString();
        btn1.image = btn2.image = rdc[nextTool + "_Icon"];
        app.settings.saveSetting(
          rdc.prefsSectionName,
          toolName + "State",
          obj.state,
        );
        return obj.state;
        break;
      case "set":
        btn1.state = btn2.state = state;
        btn1.image = btn2.image = rdc[btn1.name + state + "_Icon"];
        break;
    }
  }
  function swapFillsAndStrokes() {
    var errorArr = [];
    var a = rdc.swapObj;
    if (
      rdc.swapObj.colors.length == 2 &&
      rdc.swapObj.colors[0] instanceof Property &&
      rdc.swapObj.colors[1] instanceof Property
    ) {
      var color0 = rdc.swapObj.colors[0];
      var color1 = rdc.swapObj.colors[1];
      if (color0.numKeys == 0 && color1.numKeys == 0) {
        var color0value = color0.valueAtTime(0, true);
        var color1value = color1.valueAtTime(0, true);
        var color0Expression = color0.expression;
        var color1Expression = color1.expression;
        color0.setValue(color1value);
        color0.expression = color1Expression;
        color1.setValue(color0value);
        color1.expression = color0Expression;
      } else {
        if (color0.numKeys != 0) {
          errorArr[errorArr.length] = color0.parentProperty.name;
        }
        if (color1.numKeys != 0) {
          errorArr[errorArr.length] = color1.parentProperty.name;
        }
      }
    } else {
      for (var i in rdc.swapObj) {
        if (
          i != "colors" &&
          typeof rdc.swapObj[i].colorPropertyCounter == "undefined" &&
          typeof rdc.swapObj[i].fill != "undefined" &&
          typeof rdc.swapObj[i].stroke != "undefined"
        ) {
          var fillEnabled = rdc.swapObj[i].fill.parentProperty.enabled;
          var fillColor = rdc.swapObj[i].fill.valueAtTime(0, true);
          var fillColorExpression = rdc.swapObj[i].fill.expressionEnabled
            ? rdc.swapObj[i].fill.expression
            : "";
          var fillOpacity = rdc.swapObj[
            i
          ].fill.parentProperty.opacity.valueAtTime(0, true);
          var fillOpacityExpression = rdc.swapObj[i].fill.parentProperty.opacity
            .expressionEnabled
            ? rdc.swapObj[i].fill.parentProperty.opacity.expression
            : "";
          var fillParentPropName = rdc.swapObj[
            i
          ].fill.parentProperty.name.match(/,[^,]+/)
            ? rdc.swapObj[i].fill.parentProperty.name.match(/,[^,]+/)[0]
            : "";
          var strokeEnabled = rdc.swapObj[i].stroke.parentProperty.enabled;
          var strokeColor = rdc.swapObj[i].stroke.valueAtTime(0, true);
          var strokeColorExpression = rdc.swapObj[i].stroke.expressionEnabled
            ? rdc.swapObj[i].stroke.expression
            : "";
          var strokeOpacity = rdc.swapObj[
            i
          ].stroke.parentProperty.opacity.valueAtTime(0, true);
          var strokeOpacityExpression = rdc.swapObj[i].stroke.parentProperty
            .opacity.expressionEnabled
            ? rdc.swapObj[i].stroke.parentProperty.opacity.expression
            : "";
          var strokeParentPropName = rdc.swapObj[
            i
          ].stroke.parentProperty.name.match(/,[^,]+/)
            ? rdc.swapObj[i].stroke.parentProperty.name.match(/,[^,]+/)[0]
            : "";
          if (
            rdc.swapObj[i].fill.numKeys == 0 &&
            rdc.swapObj[i].stroke.numKeys == 0
          ) {
            rdc.swapObj[i].fill.setValue(strokeColor);
            rdc.swapObj[i].fill.expression = strokeColorExpression;
            rdc.swapObj[i].fill.parentProperty.name =
              rdc.swapObj[i].fill.parentProperty.name.replace(/,[^,]+/, "") +
              strokeParentPropName;
            rdc.swapObj[i].fill.parentProperty.enabled = strokeEnabled;
            rdc.swapObj[i].fill.parentProperty.opacity.expression =
              strokeOpacityExpression;
            rdc.swapObj[i].fill.parentProperty.opacity.setValue(strokeOpacity);
            rdc.swapObj[i].stroke.setValue(fillColor);
            rdc.swapObj[i].stroke.expression = fillColorExpression;
            rdc.swapObj[i].stroke.parentProperty.name =
              rdc.swapObj[i].stroke.parentProperty.name.replace(/,[^,]+/, "") +
              fillParentPropName;
            rdc.swapObj[i].stroke.parentProperty.enabled = fillEnabled;
            rdc.swapObj[i].stroke.parentProperty.opacity.expression =
              fillOpacityExpression;
            rdc.swapObj[i].stroke.parentProperty.opacity.setValue(fillOpacity);
          } else {
            if (rdc.swapObj[i].stroke.numKeys != 0) {
              errorArr[errorArr.length] =
                rdc.swapObj[i].layer.index +
                ". " +
                rdc.swapObj[i].layer.name +
                " - " +
                rdc.swapObj[i].stroke.parentProperty.name;
            }
            if (rdc.swapObj[i].fill.numKeys != 0) {
              errorArr[errorArr.length] =
                rdc.swapObj[i].layer.index +
                ". " +
                rdc.swapObj[i].layer.name +
                " - " +
                rdc.swapObj[i].fill.parentProperty.name;
            }
          }
        } else {
          if (
            typeof rdc.swapObj[i].colorPropertyCounter != "undefined" &&
            (rdc.swapObj[i].colorPropertyCounter + 1) % 2 == 0
          ) {
            for (
              var j = 0;
              j < rdc.swapObj[i].colorPropertyCounter + 1;
              j += 2
            ) {
              if (
                typeof rdc.swapObj[i]["color" + j] != "undefined" &&
                typeof rdc.swapObj[i]["color" + j + 1] != "undefined"
              ) {
                if (
                  rdc.swapObj[i]["color" + j].numKeys == 0 &&
                  rdc.swapObj[i]["color" + j + 1].numKeys == 0
                ) {
                  var color0 = rdc.swapObj[i]["color" + j].value;
                  var color1 = rdc.swapObj[i]["color" + j + 1].value;
                  rdc.swapObj[i]["color" + j].setValue(color1);
                  rdc.swapObj[i]["color" + j + 1].setValue(color0);
                } else {
                  if (rdc.swapObj[i]["color" + j].numKeys != 0) {
                    errorArr[errorArr.length] =
                      rdc.swapObj[i]["color" + j].layer.index +
                      ". " +
                      rdc.swapObj[i]["color" + j].layer.name +
                      " - " +
                      rdc.swapObj[i]["color" + j].parentProperty.name;
                  }
                  if (rdc.swapObj[i]["color" + j + 1].numKeys != 0) {
                    errorArr[errorArr.length] =
                      rdc.swapObj[i]["color" + j + 1].layer.index +
                      ". " +
                      rdc.swapObj[i]["color" + j + 1].layer.name +
                      " - " +
                      rdc.swapObj[i]["color" + j + 1].parentProperty.name;
                  }
                }
              }
            }
          }
        }
      }
    }
    if (errorArr.length != 0) {
      alertUI(rdc.errSwapKeyframes + "\n" + errorArr.join("\n"));
    }
  }
  function setButtonColorAndName(grp, color, name) {
    if (color == undefined) {
      color = [rdcf.uiBrightness, rdcf.uiBrightness, rdcf.uiBrightness, 1];
    }
    if (name == undefined) {
      name = "";
    }
    grp.graphics.backgroundColor = rdcf.winGfx.newBrush(
      rdcf.winGfx.BrushType.SOLID_COLOR,
      color,
    );
    grp[grp.properties.name].helpTip = name;
    if (name != "") {
      grp[grp.properties.name].visible = true;
    }
  }
  function loadPaletteColors(comp, fromSetButtonColors) {
    var colors = [];
    try {
      var paletteLayer = comp != undefined ? findPaletteLayer(comp) : null;
      var layerEffects =
        paletteLayer != null ? paletteLayer.effect.numProperties : 0;
      for (var i = 0; i < layerEffects; i += 1) {
        var effectColor =
          i + 1 <= layerEffects
            ? paletteLayer.effect(i + 1)("ADBE Color Control-0001").value
            : [
                rdcf.uiBrightness / 1.2,
                rdcf.uiBrightness / 1.2,
                rdcf.uiBrightness / 1.2,
                1,
              ];
        var effectName =
          i + 1 <= layerEffects ? paletteLayer.effect(i + 1).name : "";
        colors[colors.length] = {
          isExisting: true,
          name: effectName,
          rgba: effectColor,
        };
      }
      if (colors.length > rdc.numberOfPaletteShortcutButtonsMax) {
        colors = colors.slice(0, rdc.numberOfPaletteShortcutButtonsMax);
      }
      return colors;
    } catch (e) {
      if (!fromSetButtonColors) {
        alertUI(rdc.errPaletteCompInvalid, "OK, Refresh");
        colorPalettesRefresh(rdc.myPal, true);
      }
    }
  }
  function setButtonColors(comp) {
    try {
      var colors = loadPaletteColors(comp, true);
      if (colors == null && colors.length == 0) {
        return;
      }
      drawButtons(colors);
    } catch (e) {
      alertUI(rdc.errPaletteCompInvalid, "OK, Refresh");
      colorPalettesRefresh(rdc.myPal, true);
    }
  }
  function drawButtons(colors) {
    var buttonsGrp = rdc.buttonsGrp;
    for (var r = buttonsGrp.children.length - 1; r >= 0; r--) {
      buttonsGrp.remove(buttonsGrp.children[r]);
    }
    rdc.rows = [];
    addButtonRow(buttonsGrp, rdc.gfx, "1", rdc.buttonSize);
    for (var b = 0; b < colors.length; b += 1) {
      if (rdc.rows[rdc.rows.length - 1].children.length >= rdc.buttonsPerRow) {
        addButtonRow(
          buttonsGrp,
          rdc.gfx,
          rdc.rows.length + 1,
          rdc.buttonSize,
          true,
        );
        addButton(
          rdc.rows[rdc.rows.length - 1],
          rdc.gfx,
          b + 1,
          rdc.buttonSize,
          true,
          colors[b].rgba,
          false,
        );
      } else {
        addButton(
          rdc.rows[rdc.rows.length - 1],
          rdc.gfx,
          b + 1,
          rdc.buttonSize,
          true,
          colors[b].rgba,
          false,
        );
      }
    }
    buttonsGrp.parent.parent.layout.layout(true);
    buttonsGrp.parent.parent.layout.resize();
  }
  function addButtonRow(pal, gfx, text, size, addControls) {
    var row = pal.add("group");
    rdc.rows[rdc.rows.length] = row;
    row.spacing = 0;
    row.margins = 0;
    row.padding = 0;
    row.alignment = ["left", "top"];
    row.alignChildren = ["left", "top"];
    row.orientation = "row";
    row.name = text;
  }
  function convertSRGBToLinear(color) {
    var convertedColors = [];
    for (var i = 0; i < 3; i += 1) {
      c = color[i];
      if (c <= 0.03928) {
        converted = c / 12.92;
      } else {
        converted = Math.pow((c + 0.055) / 1.055, 2.4);
      }
      convertedColors[i] = converted;
    }
    convertedColors.push(color[3]);
    return convertedColors;
  }
  function convertLinearToSRGB(color) {
    var convertedColors = [];
    for (var i = 0; i < 3; i += 1) {
      c = Math.max(0, color[i]);
      converted = Math.pow(c, 0.454545454545);
      convertedColors[i] = Math.min(1, converted);
    }
    convertedColors.push(color[3]);
    return convertedColors;
  }
  function addButton(pal, gfx, text, size, fill, color, isNewButton) {
    function mouseOverEventCatcher(eventObj) {
      try {
        if (rdc.turnOnSwatchNums) {
          eventObj.target.notify("onDraw");
          button.strokeWidth = 5;
          button.strokeColor = color;
          button.textColor = rdc.turnOnSwatchNums ? [1, 1, 1, 1] : [1, 1, 1, 0];
          button.fillColor = rdc.turnOnSwatchNums ? [0, 0, 0, 1] : color;
          button.onDraw = colorIconsCustomDraw;
        }
      } catch (e) {}
    }
    function mouseOutEventCatcher(eventObj) {
      try {
        if (rdc.turnOnSwatchNums) {
          eventObj.target.notify("onDraw");
          button.strokeWidth = 10;
          button.strokeColor = rdc.fillStrokeBtn == "0" ? [0, 0, 0, 1] : color;
          button.textColor = [1, 1, 1, 0];
          button.fillColor = rdc.fillStrokeBtn == "1" ? [0, 0, 0, 1] : color;
          button.onDraw = colorIconsCustomDraw;
        }
      } catch (e) {}
    }
    var button = pal.add("iconbutton", undefined, undefined, {
      style: "toolbutton",
    });
    if (rdc.linearizeUI) {
      color = convertLinearToSRGB(color);
    }
    rdcf.numsButtons[rdcf.numsButtons.length] = button;
    button.preferredSize =
      parseFloat(app.version) > 11 ? size : [size[0] * 0.95, size[1] * 0.95];
    button.name = text;
    button.text = text;
    if (color == undefined) {
      color = [Math.random(), Math.random(), Math.random(), 1];
    }
    if (color.length >= 4 && color[3] == 0) {
      color[3] = 1;
    }
    button.textColor = [1, 1, 1, 0];
    button.buttonShape = "rect";
    button.fillColor = rdc.fillStrokeBtn == "1" ? [0, 0, 0, 1] : color;
    button.buttonStroke = true;
    button.strokeWidth = 10;
    button.strokeColor = rdc.fillStrokeBtn == "0" ? [0, 0, 0, 1] : color;
    if (pal.name.toString().match(/1/) && text.toString().match(/-/)) {
      button.visible = false;
    }
    if (rdc.turnOnSwatchNums) {
      button.textColor = rdc.turnOnSwatchNums
        ? rdc.fillStrokeBtn == "1" || rgbToHsl(color)[2] < 0.6
          ? [1, 1, 1, 0.4]
          : [0, 0, 0, 0.4]
        : [1, 1, 1, 0];
    }
    button.onDraw = colorIconsCustomDraw;
    button.onClick = function () {
      var savePal = this.parent.parent.parent.parent;
      if (rdc.dropdown.selection != null) {
        if (ScriptUI.environment.keyboardState.shiftKey) {
          app.beginUndoGroup(rdc.scriptName + " remove color " + this.name);
          if (rdcf.paletteComps[rdc.dropdown.selection.index] != null) {
            removeColorFromPalette(
              rdcf.paletteComps[rdc.dropdown.selection.index],
              this.name,
            );
          }
        } else {
          if (rdc.isTrial && parseInt(this.name, 10) > 3) {
            alertUI(rdc.errTrialButtonLimit);
            return;
          }
          app.beginUndoGroup(rdc.scriptName + " apply color " + this.name);
          var mode = ScriptUI.environment.keyboardState.altKey
            ? "override"
            : "select";
          applyPaletteToSelectedProperties(
            rdc.strPalettePrefix + rdc.dropdown.selection.text,
            this.name,
            mode,
          );
        }
        savePal.active = true;
        var saveSel = rdc.dropdown.selection.index;
        populatePalettesDropDown(rdc.dropdown);
        rdc.dropdown.selection = saveSel;
        app.endUndoGroup();
      } else {
        alertUI(rdc.errSelectPalette);
        return;
      }
      if (savePal != undefined) {
        savePal.layout.layout(true);
        savePal.layout.resize();
      }
    };
    return button;
  }
  function btnMouseEventHandler(event) {
    try {
      event.target.notify("onDraw");
    } catch (e) {}
  }
  function rgbToHsl(rgbArray) {
    var r = rgbArray[0];
    var g = rgbArray[1];
    var b = rgbArray[2];
    var max = Math.max(r, g, b);
    var min = Math.min(r, g, b);
    var l = (max + min) / 2;
    if (max == min) {
      h = s = 0;
    } else {
      var d = max - min;
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
      switch (max) {
        case r:
          h = (g - b) / d + g < b ? 6 : 0;
          break;
        case g:
          h = (b - r) / d + 2;
          break;
        case b:
          h = (r - g) / d + 4;
          break;
      }
      h /= 6;
    }
    return [h, s, l];
  }
  function hexToRgb(hex) {
    if (hex == undefined) {
      return;
    }
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return [
      parseInt(result[1], 16) / 255,
      parseInt(result[2], 16) / 255,
      parseInt(result[3], 16) / 255,
    ];
  }
  function colorIconsCustomDraw() {
    with (this) {
      try {
        graphics.drawOSControl();
        var offset = 0;
        var dims = [0 + offset, 0 + offset, size[0] - offset, size[1] - offset];
        if (this.imagePath && File(this.imagePath).exists) {
          var imageObj = ScriptUI.newImage(
            this.imagePath,
            this.imagePath,
            this.imagePath,
            this.imagePath,
          );
          graphics.drawImage(imageObj, dims[0], dims[1], dims[2], dims[3]);
        } else {
          this.buttonShape == "rect"
            ? graphics.rectPath(dims[0], dims[1], dims[2], dims[3])
            : graphics.ellipsePath(dims[0], dims[1], dims[2], dims[3]);
        }
        this.fillBrush = graphics.newBrush(
          graphics.BrushType.SOLID_COLOR,
          normalizeColor(this.fillColor),
        );
        graphics.fillPath(fillBrush);
        if (this.buttonStroke) {
          var strokePen = graphics.newPen(
            graphics.PenType.SOLID_COLOR,
            normalizeColor(this.strokeColor),
            this.strokeWidth,
          );
          graphics.strokePath(strokePen);
        }
        var textPen = graphics.newPen(
          graphics.PenType.SOLID_COLOR,
          normalizeColor(this.textColor),
          1,
        );
        if (parseFloat(app.version) >= 12 && this.text) {
          graphics.drawString(
            text,
            textPen,
            (size[0] -
              graphics.measureString(text, graphics.font, size[0])[0]) /
              2,
            (size[1] -
              graphics.measureString(text, graphics.font, size[0])[1]) /
              2,
            graphics.font,
          );
        }
      } catch (e) {
        $.writeln(e);
      }
    }
  }
  function normalizeColor(color) {
    var normalColor = [];
    for (var i = 0; i < color.length; i += 1) {
      normalColor[i] = color[i];
      if (color[i] < 0) {
        normalColor[i] = 0;
      }
      if (color[i] > 1) {
        normalColor[i] = 1;
      }
    }
    return normalColor;
  }
  function getPaletteCompName(ase, paletteName) {
    var projectName =
      app.project.file != null
        ? app.project.file.displayName.replace(/\.aep$/, "")
        : null;
    var nameSuffix =
      ase != undefined
        ? File.decode(ase.name).replace(/\.ase$/i, " ASE")
        : paletteName != undefined
          ? paletteName
          : projectName;
    if (nameSuffix == null) {
      nameSuffix = prompt(
        rdc.strPaletteName,
        rdc.palettePainters[
          Math.floor(Math.random() * rdc.palettePainters.length - 1)
        ],
      );
      if (!nameSuffix) {
        return false;
      }
    }
    nameSuffix = nameSuffix.replace(new RegExp("^" + rdc.strPalettePrefix), "");
    var nameRegex = rdc.isTrial
      ? "^" + rdc.strPalettePrefix
      : "^" + rdc.strPalettePrefix + ase != undefined
        ? nameSuffix.replace(/[-[\]{}()*+?.\\^$|,#\s]/g, "\\$&")
        : nameSuffix + " *?([0-9]+)?$";
    rdc.paletteComps = checkItems(
      nameRegex,
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    );
    if (rdc.isTrial && rdc.paletteComps.length > 0) {
      alertUI(rdc.errTrialMax);
      return false;
    }
    var nextNum =
      " " + (rdc.paletteComps.length > 0) &&
      rdc.paletteComps[rdc.paletteComps.length - 1].name.match(
        new RegExp("[0-9]+$"),
      )
        ? padDigits(
            parseInt(
              rdc.paletteComps[rdc.paletteComps.length - 1].name.match(
                new RegExp("[0-9]+$"),
              ),
              10,
            ) + 1,
            rdc.numPaletteNumPadding,
          )
        : rdc.paletteComps.length == 0
          ? ""
          : "01";
    return nameSuffix + nextNum;
  }
  function capitalizeFirstLetter(string) {
    return string != undefined
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : string;
  }
  function addPaletteComp(
    dropdown,
    ase,
    colors,
    paletteName,
    addToExistingPalette,
  ) {
    var currentComp =
      app.project.activeItem != null &&
      app.project.activeItem instanceof CompItem
        ? app.project.activeItem
        : null;
    if (addToExistingPalette == undefined || !addToExistingPalette) {
      var uiBrightness = getUiBrightness();
      var prefKey =
        parseFloat(app.version) >= 12
          ? "Main Pref Section v2"
          : "Main Pref Section";
      var saveCompColor = app.preferences.havePref(
        prefKey,
        "Pref_LAST_COMP_COLOR",
      )
        ? app.preferences.getPrefAsString(prefKey, "Pref_LAST_COMP_COLOR")
        : "00000000";
      rdc.paletteComps = [];
      var newPaletteName =
        paletteName != undefined
          ? paletteName
          : getPaletteCompName(ase, paletteName);
      if (!newPaletteName) {
        return;
      }
      var paletteCompFolders = checkItems(
        "^" + rdc.strPaletteFolder + "$",
        app.project.items,
        FolderItem,
        1,
        app.project.numItems,
        checkType,
        matchName,
      );
      var paletteCompFolder =
        paletteCompFolders.length > 0
          ? paletteCompFolders[0]
          : app.project.items.addFolder(rdc.strPaletteFolder);
      paletteComp = app.project.items.addComp(
        rdc.strPalettePrefix + newPaletteName,
        rdc.objPaletteComp.width,
        rdc.objPaletteComp.height,
        rdc.objPaletteComp.pixelAspect,
        rdc.objPaletteComp.duration,
        rdc.objPaletteComp.frameRate,
      );
      paletteComp.parentFolder = paletteCompFolder;
      rdcf.paletteComps = rdc.paletteComps;
      paletteComp.bgColor = [uiBrightness, uiBrightness, uiBrightness];
      newShape = paletteComp.layers.addShape();
      newShape.name = rdc.strPalettePrefix + newPaletteName;
      newShape.marker.setValueAtTime(
        0,
        new MarkerValue(rdc.strShapeLayerComment),
      );
      var colorFfx = createResourceFile(
        binStr.colorFfx.name,
        binStr.colorFfx.code,
        true,
        rdcf.userDataFolder,
      );
      if (colorFfx == null || !colorFfx.exists) {
        alertUI(rdc.errFfx.replace(/%p/, rdcf.userDataFolder));
        return;
      }
      newShape.applyPreset(colorFfx);
      newShape.position.setValue([0, 0]);
    } else {
      paletteComp = checkItems(
        "^" + rdc.strPalettePrefix + rdc.dropdown.selection.text + "$",
        app.project.items,
        CompItem,
        1,
        app.project.numItems,
        checkType,
        matchName,
      );
      if (paletteComp.length == 0) {
        alertUI(
          "Could not find comp " +
            rdc.strPalettePrefix +
            rdc.dropdown.selection.text,
        );
        return;
      }
      paletteComp = paletteComp[0];
      newShape = findPaletteLayer(paletteComp);
      if (newShape == null) {
        return;
      }
    }
    if (colors == undefined) {
      colors = ase != undefined ? parseAseFile(ase) : rdc.arrDefaultColors;
    }
    setEffectColors(newShape.effect, colors);
    populatePalettesDropDown(dropdown, paletteComp);
    if (
      !addToExistingPalette &&
      app.preferences.havePref(prefKey, "Pref_LAST_COMP_COLOR")
    ) {
      app.preferences.savePrefAsString(
        prefKey,
        "Pref_LAST_COMP_COLOR",
        saveCompColor,
      );
    }
    if (parseFloat(app.version) >= 11) {
      if (currentComp != null) {
        currentComp.openInViewer();
      } else {
        if (!addToExistingPalette) {
          paletteComp.openInViewer();
        }
      }
    }
  }
  function findPaletteLayer(paletteComp) {
    var paletteLayer = null;
    for (var i = 1; i <= paletteComp.numLayers; i += 1) {
      if (
        paletteComp.layer(i).hasOwnProperty("effect") &&
        paletteComp.layer(i).effect.numProperties > 0 &&
        paletteComp.layer(i).effect(1).matchName == "ADBE Color Control"
      ) {
        paletteLayer = paletteComp.layer(i);
        if (rdc.moveColorLayer && paletteLayer.index != 1) {
          paletteLayer.moveToBeginning();
          alertUI(
            "Color layer in palette comp: " +
              rdc.strPalettePrefix +
              rdc.dropdown.selection.text +
              ' was moved to the top of the comp. To disable this behavior please uncheck "Keep color layer on top in palette comp" in the RDC settings',
          );
        }
        break;
      }
    }
    if (paletteLayer == null) {
      alertUI(
        "Could not find a palette layer in palette comp: " +
          rdc.strPalettePrefix +
          rdc.dropdown.selection.text,
      );
    }
    return paletteLayer;
  }
  function addPaletteCompComment(selection) {
    var items = (rdcf.paletteComps = checkItems(
      new RegExp("^" + rdc.strPalettePrefix),
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    ));
    items.sort(iSort);
    for (var i = 0; i < items.length; i += 1) {
      if (i == selection) {
        if (items[i].comment == "") {
          items[i].comment = rdc.strLastSelected;
        }
      } else {
        if (items[i].comment == rdc.strLastSelected) {
          items[i].comment = "";
        }
      }
    }
  }
  function populatePalettesDropDown(dropdown, selection) {
    var items = (rdcf.paletteComps = checkItems(
      new RegExp("^" + rdc.strPalettePrefix),
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    ));
    items.sort(iSort);
    var mySel = null;
    if (dropdown != null) {
      try {
        dropdown.removeAll();
        var length = rdc.isTrial
          ? Math.max(items.length, Math.min(items.length, 1))
          : items.length;
        for (var i = 0; i < length; i += 1) {
          dropdown.add(
            "item",
            items[i].name.replace(new RegExp("^" + rdc.strPalettePrefix), ""),
          );
          if (
            selection == undefined &&
            items[i].comment == rdc.strLastSelected
          ) {
            selection = items[i];
          }
          if (selection instanceof CompItem) {
            if (items[i].id === selection.id) {
              mySel = i;
            }
          } else {
            mySel = selection;
          }
        }
        if (selection == undefined && length > 0) {
          selection = items[0];
          mySel = 0;
        }
        if (selection != undefined) {
          dropdown.selection = mySel;
          addPaletteCompComment(mySel);
          setButtonColors(items[mySel]);
          return mySel;
        } else {
          setButtonColors();
        }
      } catch (e) {}
    }
  }
  function getFilesJsFilter(f) {
    return f instanceof File && f.name.match(/\.js$/);
  }
  function isRayExpression(expression) {
    return (
      expression
        .toString()
        .split("\n")[0]
        .match(
          new RegExp("^(s+)?//(s+)?([0-9]+)?(s+)?" + rdc.prefsSectionName, "i"),
        ) != null
    );
  }
  function getRayExpressionName(expression) {
    var rayMatch = expression
      .split("\n")[0]
      .match(
        new RegExp("^(s+)?//(s+)?([0-9]+)?(s+)?" + rdc.prefsSectionName, "i"),
      );
    if (rayMatch != null && rayMatch[2] != null) {
      return rayMatch[2];
    } else {
      return "";
    }
  }
  function loadExpressionsFromDisk() {
    var items = rdc.expressions;
    var folder = rdcf.userDataFolder + "/Expressions";
    if (!Folder(folder).exists) {
      Folder(folder).create();
    }
    for (var i = 0; i < items.length; i += 1) {
      createResourceFile(
        items[i].expression.split("\n")[0].replace(/^\/\/(\s*)?/, "") + ".js",
        items[i].expression,
        false,
        folder,
      );
    }
    var files = Folder(folder).getFiles(getFilesJsFilter);
    var expressionNames = [];
    rdc.expressions = [];
    rdc.colorExpressionIndex = null;
    rdc.animateExpressionIndex = null;
    for (var i = 0; i < files.length; i += 1) {
      if (files[i].open("r")) {
        var version =
          files[i].displayName.match(/([0-9]+(\.[0-9]+)?)\.[^\.]+$/) != null &&
          files[i].displayName.match(/([0-9]+(\.[0-9]+)?)\.[^\.]+$/)[1] != null
            ? files[i].displayName.match(/([0-9]+(\.[0-9]+)?)\.[^\.]+$/)[1]
            : 0;
        var name = files[i].displayName
          .replace(/^[0-9]+/, "")
          .replace(new RegExp(rdc.prefsSectionName + " ?"), "")
          .replace(/\.jsx?$/, "")
          .replace(version, "")
          .replace(/\s+/, "");
        var inArray = isInArrayObject(name, expressionNames, "name");
        var newObj = {
          expression: files[i].read(),
          filename: files[i].displayName,
          name: name,
          version: version,
        };
        if (inArray == null) {
          expressionNames.push(newObj);
          expressionIndex = expressionNames.length - 1;
        } else {
          if (expressionNames[inArray].version < version) {
            expressionNames.splice(inArray, 1, newObj);
            expressionIndex = inArray;
          }
        }
        files[i].close();
        if (name.match(/^Color$/)) {
          rdc.colorExpressionIndex = expressionIndex;
        }
        if (name.match(/^Animate/)) {
          rdc.animateExpressionIndex = expressionIndex;
        }
      }
    }
    rdc.expressions = expressionNames;
    return expressionNames;
  }
  function loadDefaultAseFromDisk() {
    var folder = Folder(rdcf.userDataFolder);
    var defaultAseFile = File(folder.fsName + "/" + rdc.defaultAseFilename);
    if (defaultAseFile.exists) {
      rdc.arrDefaultColors = parseAseFile(defaultAseFile);
    }
  }
  function populateExpressionsDropDown(dropdown) {
    var items = loadExpressionsFromDisk();
    var mySel = null;
    dropdown.removeAll();
    for (var i = 0; i < items.length; i += 1) {
      dropdown.add("item", items[i].name);
    }
    dropdown.selection = app.settings.haveSetting(
      rdc.prefsSectionName,
      "expression",
    )
      ? app.settings.getSetting(rdc.prefsSectionName, "expression")
      : 0;
  }
  function iSort(a, b) {
    if (a.name != undefined && b.name != undefined) {
      var x = a.name
        .replace(/[0-9]+/g, function (a) {
          return padDigits(a, 5);
        })
        .toLowerCase();
      var y = b.name
        .replace(/[0-9]+/g, function (a) {
          return padDigits(a, 5);
        })
        .toLowerCase();
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return 0;
    }
  }
  function setEffectColors(prop, colors) {
    if (colors.length > rdc.numberOfPaletteShortcutButtonsMax) {
      alertUI(rdc.errMaxColors);
    }
    for (
      var i = 0;
      i < Math.min(colors.length, rdc.numberOfPaletteShortcutButtonsMax);
      i += 1
    ) {
      if (typeof colors[i].isExisting == "undefined") {
        var fx = prop.addProperty("ADBE Color Control");
        fx("ADBE Color Control-0001").setValue(colors[i].rgba);
        if (colors[i].name != "") {
          fx.name = colors[i].name;
        }
      }
    }
  }
  function importAse() {
    var aseFile = File(rdcf.defaultLocation.fsName).openDlg(
      rdc.strSelectAse,
      $.os.indexOf("Win") != -1 ? "Adobe Swatch Exchange files:*.ase" : "*.ase",
    );
    if (aseFile) {
      rdcf.defaultLocation = aseFile;
      app.settings.saveSetting(
        rdc.prefsSectionName,
        "DefaultLocation",
        rdcf.defaultLocation.parent.fsName,
      );
      return rdcf.defaultLocation;
    }
  }
  function filterAse(f) {
    return (
      f instanceof Folder ||
      (f instanceof File && f.name.match(new RegExp(".ase$", "i")))
    );
  }
  function parseAseFile(file) {
    var content = app.parseSwatchFile(file);
    var numColors = content.values.length;
    var colors = new Array();
    for (var i = 0; i < numColors; i += 1) {
      if (content.values[i].type == "RGB") {
        color = [
          content.values[i].r,
          content.values[i].g,
          content.values[i].b,
          1,
        ];
      } else if (content.values[i].type == "Gray") {
        color = [
          content.values[i].gray,
          content.values[i].gray,
          content.values[i].gray,
          1,
        ];
      } else if (content.values[i].type == "CMYK") {
        var invBlack = 1 - content.values[i].k;
        color = [
          (1 - content.values[i].c) * invBlack,
          (1 - content.values[i].m) * invBlack,
          (1 - content.values[i].y) * invBlack,
          1,
        ];
      } else {
        color = [0, 0, 0, 0];
      }
      if (color[0] < 0) {
        color[0] = 0;
      } else {
        if (color[0] > 1) {
          color[0] = 1;
        }
      }
      if (color[1] < 0) {
        color[1] = 0;
      } else {
        if (color[1] > 1) {
          color[1] = 1;
        }
      }
      if (color[2] < 0) {
        color[2] = 0;
      } else {
        if (color[2] > 1) {
          color[2] = 1;
        }
      }
      colors[i] = new Object();
      colors[i].name = content.values[i].name;
      colors[i].rgba = color;
    }
    return colors;
  }
  function createResourceFile(filename, binaryString, isZip, resourceFolder) {
    var myFile = new File(resourceFolder + "/" + filename);
    if (!File(myFile).exists) {
      if (isZip && !filename.match(/\.zip$/)) {
        createResourceFile(
          filename + ".zip",
          binaryString,
          false,
          resourceFolder,
        );
      } else {
        myFile.encoding = "BINARY";
        myFile.open("w");
        myFile.write(binaryString);
        myFile.close();
        if (filename.match(/\.zip$/)) {
          if ($.os.indexOf("Mac") != -1) {
            var cmd =
              'unzip "' + myFile.fsName + '" -d "' + myFile.parent.fsName + '"';
          } else {
            var cmd =
              'cscript //b "' +
              rdcf.winUnZip.fsName +
              '" "' +
              myFile.fsName +
              '"';
          }
          var response = system.callSystem(cmd);
        }
        var myFile = new File(
          resourceFolder + "/" + filename.replace(/\.zip$/, ""),
        );
        if (!File(myFile).exists) {
          alertUI(
            rdc.errMissingFile
              .replace("%1", myFile.displayName)
              .replace("%2", myFile.parent.fsName)
              .replace("%3", response),
          );
          return null;
        }
      }
    }
    return myFile;
  }
  function addHiddenPaletteComp(comp, paletteName) {
    var paletteComps = checkItems(
      "^" + paletteName + "$",
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    );
    if (paletteComps.length >= 1) {
      var newPalette = false;
      var paletteLayer = null;
      var paletteLayers = checkItems(
        paletteName,
        comp.layers,
        CompItem,
        1,
        comp.numLayers,
        checkSourceType,
        matchName,
      );
      if (paletteLayers.length == 0) {
        paletteLayer = comp.layers.add(paletteComps[0]);
        newPalette = true;
      }
      if (
        newPalette ||
        (paletteLayer != null &&
          paletteLayer.locked &&
          !paletteLayer.visible &&
          paletteLayer.guideLayer)
      ) {
        paletteLayer.locked = false;
        paletteLayer.visible = false;
        paletteLayer.guideLayer = true;
        paletteLayer.label = 0;
        paletteLayer.enabled = false;
        paletteLayer.shy = true;
        paletteLayer.moveToEnd();
        paletteLayer.selected = false;
        paletteLayer.locked = true;
      }
    }
  }
  function isSelectionAGroup(selection) {
    for (var i = 0; i < selection.length; i += 1) {
      if (selection[i] instanceof Property) {
        return false;
      }
    }
    return true;
  }
  function getSelectedGroups(selection) {
    var groupsArray = [];
    for (var i = 0; i < selection.length; i += 1) {
      if (selection[i] instanceof PropertyGroup) {
        groupsArray[groupsArray.length] = selection[i];
      }
    }
    return groupsArray;
  }
  function removeColorFromPalette(comp, num) {
    var paletteLayer = findPaletteLayer(paletteComp);
    if (paletteLayer == null) {
      return;
    }
    paletteLayer.effect(num).remove();
  }
  function applyPaletteToSelectedProperties(paletteName, num, mode) {
    if (mode != "swap") {
      try {
        var saveCompId = rdcf.paletteComps[rdc.dropdown.selection.index].id;
      } catch (e) {
        alertUI(rdc.errPaletteCompInvalid, "OK, Refresh");
        return false;
      }
    }
    var comp = app.project.activeItem;
    if (comp == null || comp.selectedLayers.length == 0) {
      if (mode == "swap") {
        alertUI(rdc.errNoSwapLayersSelected);
      } else {
        alertUI(rdc.errNoLayersSelected);
      }
      return false;
    }
    if (comp.name.match(new RegExp("^" + rdc.strPalettePrefix))) {
      alertUI(rdc.errIsPaletteComp);
      return false;
    }
    rdc.propCount = 0;
    var isGroupRecurse = false;
    if (mode == undefined) {
      mode = "select";
    }
    var compsArray = [comp];
    for (var j = 0; j < compsArray.length; j += 1) {
      var layerMode = compsArray[j].selectedProperties.length == 0;
      if (layerMode) {
        var start = j > 0 ? 1 : 0;
        var compLayersLength =
          j > 0
            ? compsArray[j].numLayers
            : compsArray[j].selectedLayers.length - 1;
        var progressItems = j > 0 ? compsArray.length : 1;
        var progressDlg = progressUI(progressItems, mode);
        rdc.stopSearch = false;
        for (var h = start; h <= compLayersLength; h++) {
          if (rdc.stopSearch) {
            break;
          }
          myLayer =
            j > 0 ? compsArray[j].layer(h) : compsArray[j].selectedLayers[h];
          if (myLayer != undefined) {
            writeLn(
              "Processing comp: " +
                compsArray[j].name +
                " (" +
                j +
                1 +
                " of " +
                compsArray.length +
                ") " +
                " layer: " +
                myLayer.index +
                ": " +
                myLayer.name,
            );
            updateProgBar(
              progressDlg,
              j + 1,
              compsArray[j].name,
              compsArray.length,
              start == 0 ? h + 1 : h,
              myLayer.index + ". " + myLayer.name,
              compLayersLength,
            );
          }
          rdc.addedRaytoComp = false;
          if (
            rdc.scanRecurse &&
            myLayer.source instanceof CompItem &&
            !myLayer.source.name.match(
              new RegExp("^" + rdc.strPalettePrefix),
            ) &&
            !isInArrayComp(myLayer.source, compsArray)
          ) {
            compsArray.push(myLayer.source);
          }
          if (
            (mode == "swap" || mode == "Cap" || mode == "Join") &&
            !(myLayer instanceof ShapeLayer)
          ) {
            if (
              (rdc.scanRecurse && myLayer.source instanceof CompItem) ||
              (myLayer.source instanceof CompItem &&
                !myLayer.source.name.match(
                  new RegExp("^" + rdc.strPalettePrefix),
                ))
            ) {
              continue;
            }
            rdc.swapErrors.push(myLayer.index + ". " + myLayer.name);
            continue;
          }
          recurseProperties(myLayer, myLayer, num, mode, undefined);
          if (
            num > 0 &&
            !checkFillEffect(myLayer, getActualColorFromNum(num))
          ) {
            if (rdc.scanRecurse && myLayer.source instanceof CompItem) {
              continue;
            }
            if (myLayer instanceof ShapeLayer) {
              continue;
            }
            var fill = myLayer
              .property("ADBE Effect Parade")
              .addProperty("ADBE Fill");
            fill.name = rdc.strPalettePrefix + "Fill";
            fill("ADBE Fill-0002").selected = true;
          }
        }
      } else {
        if (isSelectionAGroup(comp.selectedProperties)) {
          var groups = getSelectedGroups(compsArray[j].selectedProperties);
          for (var h = 0; h < groups.length; h += 1) {
            if (num > 0) {
              recurseProperties(groups[h], myLayer, num, mode, undefined);
            }
          }
        }
      }
      var colorPropertyCounter = 0;
      for (var i = 0; i < compsArray[j].selectedProperties.length; i += 1) {
        var myProperty = compsArray[j].selectedProperties[i];
        if (myProperty.propertyValueType === PropertyValueType.COLOR) {
          if (
            (mode == "swap" || mode == "Cap" || mode == "Join") &&
            myProperty.parentProperty != null &&
            myProperty.parentProperty.parentProperty != null
          ) {
            if (myLayer == undefined) {
              myLayer = findContainingLayer(myProperty);
            }
            switch (mode) {
              case "swap":
                rdc.swapObj.colors.push(myProperty);
                if (
                  typeof rdc.swapObj[
                    myLayer.index +
                      "-" +
                      myProperty.parentProperty.parentProperty.propertyIndex
                  ] == "undefined"
                ) {
                  rdc.swapObj[
                    myLayer.index +
                      "-" +
                      myProperty.parentProperty.parentProperty.propertyIndex
                  ] = { layer: myLayer };
                }
                if (
                  myProperty.matchName.toLowerCase().match(/fill/) &&
                  typeof rdc.swapObj[
                    myLayer.index +
                      "-" +
                      myProperty.parentProperty.parentProperty.propertyIndex
                  ].fill == "undefined"
                ) {
                  rdc.swapObj[
                    myLayer.index +
                      "-" +
                      myProperty.parentProperty.parentProperty.propertyIndex
                  ].fill = myProperty;
                }
                if (
                  myProperty.matchName.toLowerCase().match(/stroke/) &&
                  typeof rdc.swapObj[
                    myLayer.index +
                      "-" +
                      myProperty.parentProperty.parentProperty.propertyIndex
                  ].stroke == "undefined"
                ) {
                  rdc.swapObj[
                    myLayer.index +
                      "-" +
                      myProperty.parentProperty.parentProperty.propertyIndex
                  ].stroke = myProperty;
                }
                if (
                  !myProperty.matchName.toLowerCase().match(/fill|stroke/) &&
                  typeof rdc.swapObj[myLayer.containingComp.id] == "undefined"
                ) {
                  rdc.swapObj[myLayer.containingComp.id] = {};
                }
                if (
                  !myProperty.matchName.toLowerCase().match(/fill|stroke/) &&
                  typeof rdc.swapObj[myLayer.containingComp.id]["color" + i] ==
                    "undefined"
                ) {
                  rdc.swapObj[myLayer.containingComp.id][
                    "color" + colorPropertyCounter
                  ] = myProperty;
                  rdc.swapObj[myLayer.containingComp.id].colorPropertyCounter =
                    colorPropertyCounter;
                  colorPropertyCounter++;
                }
                break;
            }
          } else {
            var goAhead = applyRayColor(
              undefined,
              compsArray[j],
              myProperty,
              num,
              paletteName,
              comp.time,
              mode,
              undefined,
              undefined,
              layerMode,
            );
            if (!goAhead) {
              return false;
            }
          }
        } else {
          if (mode == "Cap" || mode == "Join") {
            if (
              myProperty.matchName.match(
                new RegExp("ADBE Vector Stroke Line " + mode),
              )
            ) {
              myProperty.setValue(parseInt(rdc.capBtn, 10) + 1);
            }
          }
        }
      }
      if (rdc.propCount > 0) {
        addHiddenPaletteComp(compsArray[j], paletteName);
      }
    }
    if (progressDlg != undefined) {
      progressDlg.close();
    }
    clearOutput();
    rdc.stopSearch = false;
    return true;
  }
  function progressUI(projNumItems, action) {
    var dlg = new Window("palette", rdc.actionPrettyNames[action], undefined, {
      resizeable: false,
    });
    var res =
      "group { \n\t\torientation:\'column\', alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n         margins:0, spacing:5, \n         ";
    if (projNumItems > 1) {
      res +=
        "itemName: Group { \n               orientation:\'column\', margins:0, spacing:5, \n               itemsTxtGrp: Group { \n               alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n                item: StaticText {preferredSize: [350,-1], alignment:[\'left\',\'top\'] }, \n                amt: StaticText { preferredSize: [50,-1], alignment:[\'right\',\'top\'] }, \n             }\n         itemProgress: Group { \n\t\t\t\talignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'top\'], \n\t\t\t\tval: Progressbar {  }, \n            }, \n           } \n           ";
    }
    res +=
      "layerName: Group { \n                orientation:\'column\', margins:0, spacing:5, \n                layerTxtGrp: Group { \n                alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n                item: StaticText {preferredSize: [350,-1], alignment:[\'left\',\'top\'] }, \n                amt: StaticText {preferredSize: [50,-1], alignment:[\'right\',\'top\'] }, \n             }\n           layerProgress: Group { \n\t\t\t\talignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'top\'], \n\t\t\t\tval: Progressbar {  }, \n            }, \n              } \n        };";
    dlg.grp = dlg.add(res);
    if (projNumItems > 1) {
      dlg.grp.itemName.itemProgress.val.maximumSize.height = 2;
      dlg.grp.itemName.itemProgress.val.maxvalue = projNumItems;
    }
    dlg.grp.layerName.layerProgress.val.maximumSize.height = 2;
    dlg.grp.layerName.layerProgress.val.maxvalue = 100;
    $.hiresTimer;
    dlg.center();
    return dlg;
  }
  function updateProgBar(
    dlgObj,
    itemAmount,
    itemName,
    maxItems,
    layerAmount,
    layerName,
    maxLayers,
    propName,
  ) {
    if (propName == undefined) {
      propName = "layer";
    }
    if (typeof dlgObj.grp.itemName != "undefined") {
      dlgObj.grp.itemName.itemProgress.val.value = itemAmount;
      dlgObj.grp.itemName.itemProgress.val.maxvalue = maxItems;
      dlgObj.grp.itemName.itemsTxtGrp.item.text =
        itemName != "" ? "Comp: " + itemName : "";
      dlgObj.grp.itemName.itemsTxtGrp.amt.text = itemAmount + "/" + maxItems;
      dlgObj.grp.itemName.itemProgress.val.visible =
        dlgObj.grp.itemName.itemsTxtGrp.amt.visible = itemAmount != maxItems;
      dlgObj.grp.itemName.itemProgress.val.maximumSize.height =
        dlgObj.grp.itemName.itemProgress.val.minimumSize.height =
          itemAmount != maxItems ? 2 : 0;
      dlgObj.layout.layout(true);
      dlgObj.layout.resize();
    }
    writeLn(propName + ": " + layerAmount + ". " + layerName);
    writeLn("Processing...");
    dlgObj.grp.layerName.layerProgress.val.maxvalue = maxLayers;
    dlgObj.grp.layerName.layerProgress.val.value = layerAmount;
    dlgObj.grp.layerName.layerTxtGrp.item.text =
      "Layer: " + layerName + (propName != "") && propName != "layer"
        ? ": " + propName
        : "";
    dlgObj.grp.layerName.layerTxtGrp.amt.text = layerAmount + "/" + maxLayers;
    if (typeof dlgObj.grp.itemName != "undefined") {
      writeLn("Comp " + itemAmount + " out of " + maxItems + ": " + itemName);
    }
    if (parseFloat(app.version) >= 9) {
      dlgObj.window.update();
    }
    if ($.hiresTimer > rdc.progressUIDelay) {
      dlgObj.show();
    }
  }
  function alertUI(text, okText, showCancel, cancelText) {
    if (okText == undefined) {
      okText = rdc.strOk;
    }
    if (showCancel == undefined) {
      showCancel = false;
    }
    if (cancelText == undefined) {
      cancelText = rdc.strCancel;
    }
    var dlg = new Window(
      "dialog",
      rdc.scriptName + " v" + rdc.scriptVersion + " Alert",
      undefined,
      { resizeable: false },
    );
    var res =
      "group { \n\t\torientation:\'column\', alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n         txt: StaticText {properties:{multiline:true}}, \n         buttons: Group { \n                 orientation:\'row\',\n                 alignment:[\'fill\',\'fill\'],\n                alignChildren:[\'right\',\'fill\'], \n                 dismiss: Checkbox{text:\'" +
      rdc.strDismiss +
      "\',alignment: [\'left\',\'center\']},\n                 cancel: Button {text:\'" +
      cancelText +
      "\',preferredSize: [-1,25]},\n                 ok: Button {text:\'" +
      okText +
      "\',preferredSize: [-1,25]},\n              }\n           };";
    dlg.grp = dlg.add(res);
    dlg.grp.txt.minimumSize = [400, 50];
    dlg.grp.txt.text = text.toString().replace(/\n/, "\n\n");
    dlg.grp.buttons.dismiss.value = !rdc.showErrors;
    dlg.grp.buttons.dismiss.onClick = function () {
      rdc.showErrors = !this.value;
      app.settings.saveSetting(
        rdc.prefsSectionName,
        "showErrors",
        rdc.showErrors,
      );
    };
    dlg.grp.buttons.cancel.visible = showCancel;
    dlg.grp.buttons.cancel.onClick = function () {
      dlg.close();
      rdc.alertUIReturn = false;
    };
    dlg.grp.buttons.ok.onClick = function () {
      dlg.close();
      rdc.alertUIReturn = true;
    };
    dlg.layout.layout(true);
    dlg.layout.resize();
    dlg.onResizing = dlg.onResize = function () {
      this.layout.resize();
    };
    if (rdc.showErrors) {
      dlg.show();
    }
  }
  function checkKeyInterpolation(prop, interpolation, action) {
    for (var i = 1; i <= prop.numKeys; i += 1) {
      switch (action) {
        case "check":
          if (
            prop.keyInInterpolationType(i) === interpolation ||
            prop.keyOutInterpolationType(i) === interpolation
          ) {
            return true;
          }
          break;
        case "set":
          prop.setInterpolationTypeAtKey(i, interpolation, interpolation);
          break;
      }
    }
    return false;
  }
  function isLayerShapeLayer(layer, prop) {
    return (
      (layer == undefined && prop.matchName.match(/^ADBE (Root )?Vector/)) ||
      layer instanceof ShapeLayer
    );
  }
  function applyRayColor(
    layer,
    comp,
    prop,
    num,
    paletteName,
    time,
    mode,
    addColors,
    currentKeyIndex,
    layerMode,
  ) {
    var isShapeLayer = isLayerShapeLayer(layer, prop);
    if (
      isShapeLayer &&
      prop.matchName.toLowerCase().match(/fill/) &&
      rdc.fillStrokeBtn == "1"
    ) {
      return true;
    }
    if (
      isShapeLayer &&
      prop.matchName.toLowerCase().match(/stroke/) &&
      rdc.fillStrokeBtn == "0"
    ) {
      return true;
    }
    var setAnimateExpression =
      rdcf.expressionsDropDown.selection.text.match(/^Animate$/) != null ||
      (prop.numKeys > 1 &&
        !checkKeyInterpolation(prop, KeyframeInterpolationType.HOLD, "check"));
    if (!rdc.turnOffExpressions) {
      if (
        mode == "override" ||
        isRayExpression(prop.expression) ||
        prop.expression == ""
      ) {
        if (prop.numKeys == 0) {
          if (num > 0) {
            prop.setValue([0, 0, num / 255, 1]);
          }
        } else {
          if (num != 0) {
            if (currentKeyIndex == undefined) {
              if (
                !layerMode &&
                prop.selectedKeys.length > 0 &&
                isInArray(prop.nearestKeyIndex(time), prop.selectedKeys) &&
                time == prop.keyTime(prop.nearestKeyIndex(time))
              ) {
                for (var i = 0; i < prop.selectedKeys.length; i += 1) {
                  currentKeyIndex = prop.selectedKeys[i];
                  prop.setValueAtTime(prop.keyTime(currentKeyIndex), [
                    0,
                    0,
                    num / 255,
                    1,
                  ]);
                }
              } else {
                currentKeyIndex = prop.nearestKeyIndex(time);
                prop.setValueAtTime(time, [0, 0, num / 255, 1]);
              }
            } else {
              prop.setValueAtTime(prop.keyTime(currentKeyIndex), [
                0,
                0,
                num / 255,
                1,
              ]);
            }
            var keyInEase = prop.keyInTemporalEase(currentKeyIndex);
            var keyOutEase = prop.keyOutTemporalEase(currentKeyIndex);
            if (!setAnimateExpression) {
              checkKeyInterpolation(
                prop,
                KeyframeInterpolationType.HOLD,
                "set",
              );
            }
          }
        }
      }
      var dropdownIndex = rdcf.expressionsDropDown.selection.index;
      if (
        (mode == "scan" && rdc.colorExpressionIndex == null) ||
        (setAnimateExpression && rdc.animateExpressionIndex == null)
      ) {
        alertUI(rdc.errWrongScanExpressions);
        return false;
      }
      var expressionsArray = [];
      expressionsArray = expressionsArray.concat(rdc.expressions);
      var expressionIndex = rdcf.showAdvanced
        ? rdcf.expressionsDropDown.selection.index
        : mode == "scan" && setAnimateExpression
          ? rdc.animateExpressionIndex
          : rdc.colorExpressionIndex;
      if (setAnimateExpression) {
        expressionIndex = rdc.animateExpressionIndex;
      }
    }
    if (
      rdc.turnOffExpressions ||
      mode == "override" ||
      isRayExpression(prop.expression) ||
      prop.expression == ""
    ) {
      if (paletteName != undefined) {
        if (rdc.turnOffExpressions) {
          var color =
            addColors != undefined && addColors
              ? rdc.sampleArray[num - 1].rgba
              : getActualColorFromNum(num);
          if (color != null) {
            if (prop.numKeys == 0) {
              prop.setValue(color);
              if (isRayExpression(prop.expression)) {
                prop.expression = "";
              }
            } else {
              if (
                !layerMode &&
                prop.selectedKeys.length > 0 &&
                isInArray(prop.nearestKeyIndex(time), prop.selectedKeys) &&
                time == prop.keyTime(prop.nearestKeyIndex(time))
              ) {
                for (var i = 0; i < prop.selectedKeys.length; i += 1) {
                  currentKeyIndex = prop.selectedKeys[i];
                  prop.setValueAtTime(prop.keyTime(currentKeyIndex), color);
                }
              } else {
                prop.setValueAtTime(time, color);
              }
              bakeExpression(prop);
            }
          }
        } else {
          var replaceRegex = new RegExp(rdc.expressionPaletteNameKey, "g");
          prop.expression = rdc.expressions[expressionIndex].expression.replace(
            replaceRegex,
            paletteName,
          );
        }
        rdc.sampleCounter++;
        rdc.propCount++;
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  }
  function getActualColorFromNum(num) {
    try {
      if (
        rdc.dropdown.selection != null &&
        rdcf.paletteComps[rdc.dropdown.selection.index] != null
      ) {
        comp = rdcf.paletteComps[rdc.dropdown.selection.index];
        var paletteLayer = findPaletteLayer(comp);
        if (paletteLayer == null) {
          return;
        }
        if (paletteLayer.effect.numProperties >= num) {
          return paletteLayer.effect(num)("ADBE Color Control-0001").value;
        } else {
          return null;
        }
      }
    } catch (e) {
      alertUI(e.toString());
    }
    return null;
  }
  function determineSelectionScope() {
    var selection = null;
    if (
      app.project.activeItem != null &&
      app.project.activeItem instanceof CompItem
    ) {
      if (app.project.activeItem.selectedProperties.length > 0) {
        selection = app.project.activeItem.selectedProperties;
      } else if (app.project.activeItem.selectedLayers.length > 0) {
        selection = app.project.activeItem.selectedLayers;
      } else {
        selection = [app.project.activeItem];
      }
    } else {
      if (app.project.selection.length > 0) {
        selection = app.project.selection;
      }
    }
    return selection;
  }
  function scanForColors(isAdd, mode, selection, addColors) {
    if (addColors == undefined) {
      addColors = true;
    }
    if (mode == undefined) {
      mode = "scan";
    }
    if (selection == undefined) {
      selection = determineSelectionScope();
    }
    if (selection == null) {
      alertUI(rdc.strProjScanConfirm.replace(/scan/gi, mode), undefined, true);
      if (rdc.alertUIReturn === false) {
        rdc.alertUIReturn = null;
        return false;
      }
      rdc.alertUIReturn = null;
    }
    var projectName =
      app.project.file == null
        ? selection != null &&
          (selection.length == 1 ||
            (selection.length == 2 && selection[0] instanceof PropertyGroup)) &&
          typeof selection[0].name != "undefined"
          ? selection[0].name
          : "Untitled"
        : app.project.file.displayName.replace(/\.aep$/, "");
    var paletteName = projectName;
    var items =
      selection == null && app.project.selection.length == 0
        ? app.project.items
        : selection == null
          ? app.project.selection
          : selection;
    var numItems =
      selection == null && app.project.selection.length == 0
        ? app.project.numItems
        : selection == null
          ? app.project.selection.length - 1
          : selection.length - 1;
    var start = selection == null && app.project.selection.length == 0 ? 1 : 0;
    var compsArray = [];
    rdc.rayAddedCompsArray = [];
    for (var h = start; h <= numItems; h++) {
      if (items[h] instanceof FolderItem) {
        for (var f = 1; f <= items[h].numItems; f += 1) {
          if (
            items[h].items[f] instanceof CompItem &&
            !items[h].items[f].name.match(
              new RegExp("^" + rdc.strPalettePrefix),
            )
          ) {
            if (!isInArrayComp(items[h].items[f], compsArray)) {
              compsArray[compsArray.length] = items[h].items[f];
            }
            if (app.project.selection.length > 0) {
              paletteName = items[h].name;
            }
          }
        }
      }
      if (
        items[h] instanceof CompItem &&
        !items[h].name.match(new RegExp("^" + rdc.strPalettePrefix))
      ) {
        if (!isInArrayComp(items[h], compsArray)) {
          compsArray[compsArray.length] = items[h];
        }
      }
    }
    if (mode == "scan") {
      if (!isAdd) {
        if (items.length > 1) {
          paletteName = prompt(
            rdc.strPaletteName,
            compsArray.length == 1
              ? compsArray[0].name
              : items.length > 1 && items[0] instanceof AVLayer
                ? items[0].containingComp.name
                : paletteName,
          );
        }
        if (!paletteName) {
          return false;
        }
        rdc.paletteName = getPaletteCompName(undefined, paletteName);
      } else {
        if (rdc.dropdown.selection != null) {
          rdc.paletteName = rdc.dropdown.selection.text;
        } else {
          alertUI("Please select a palette from the dropdown");
          return false;
        }
      }
    }
    rdc.sampleCounter = 0;
    rdc.sampleArray =
      mode == "scan" && isAdd
        ? loadPaletteColors(rdcf.paletteComps[rdc.dropdown.selection.index])
        : [];
    rdc.sampleApplyRayColorArray = [];
    var progressItems = selection != null ? selection.length : items.length;
    var progressDlg = progressUI(progressItems, mode);
    rdc.stopSearch = false;
    if (selection == null) {
      for (var i = 0; i < compsArray.length; i += 1) {
        var myComp = compsArray[i];
        if (rdc.stopSearch) {
          break;
        }
        updateProgBar(
          progressDlg,
          i + 1,
          myComp.name,
          compsArray.length,
          0,
          "",
          100,
        );
        for (var j = 1; j <= myComp.numLayers; j += 1) {
          if (rdc.stopSearch) {
            break;
          }
          rdc.addedRaytoComp = false;
          if (
            rdc.scanRecurse &&
            myComp.layer(j).source instanceof CompItem &&
            !myComp
              .layer(j)
              .source.name.match(new RegExp("^" + rdc.strPalettePrefix)) &&
            !isInArrayComp(myComp.layer(j).source, compsArray)
          ) {
            compsArray.push(myComp.layer(j).source);
          }
          writeLn(
            "Scanning Comp " +
              i +
              1 +
              " of " +
              compsArray.length +
              ": " +
              myComp.name +
              " layer: " +
              j +
              ": " +
              myComp.layer(j).name,
          );
          updateProgBar(
            progressDlg,
            i + 1,
            compsArray[i].name,
            compsArray.length,
            j,
            myComp.layer(j).index + ". " + myComp.layer(j).name,
            myComp.numLayers,
          );
          if (bakeSolidWithSingleFill(myComp.layer(j))) {
            continue;
          }
          var goAhead = recurseProperties(
            myComp.layer(j),
            myComp.layer(j),
            undefined,
            mode,
            rdc.strPalettePrefix + rdc.paletteName,
            addColors,
          );
          if (!goAhead) {
            return false;
          }
          if (rdc.addedRaytoComp) {
            rdc.rayAddedCompsArray.push(myComp);
          }
        }
      }
    } else {
      for (var i = 0; i < selection.length; i += 1) {
        if (
          selection[i] instanceof CompItem &&
          !selection[i].name.match(new RegExp("^" + rdc.strPalettePrefix))
        ) {
          myComp = compsArray[i] != null ? compsArray[i] : selection[i];
          for (var j = 1; j <= myComp.numLayers; j += 1) {
            rdc.addedRaytoComp = false;
            if (
              rdc.scanRecurse &&
              myComp.layer(j).source instanceof CompItem &&
              !myComp
                .layer(j)
                .source.name.match(new RegExp("^" + rdc.strPalettePrefix)) &&
              !isInArrayComp(myComp.layer(j).source, selection)
            ) {
              selection.push(myComp.layer(j).source);
            }
            writeLn(
              "Scanning Comp: " +
                myComp.name +
                " layer: " +
                j +
                ": " +
                myComp.layer(j).name,
            );
            updateProgBar(
              progressDlg,
              compsArray.length,
              myComp.name,
              compsArray.length,
              j,
              myComp.layer(j).index + ". " + myComp.layer(j).name,
              myComp.numLayers,
            );
            if (bakeSolidWithSingleFill(myComp.layer(j))) {
              continue;
            }
            var goAhead = recurseProperties(
              myComp.layer(j),
              myComp.layer(j),
              undefined,
              mode,
              rdc.strPalettePrefix + rdc.paletteName,
              addColors,
            );
            if (!goAhead) {
              progressDlg();
              clearOutput();
              rdc.stopSearch = false;
              return false;
            }
            if (rdc.addedRaytoComp) {
              rdc.rayAddedCompsArray.push(myComp);
            }
          }
        } else if (
          selection[i].numProperties != undefined &&
          selection[i].numProperties > 0 &&
          selection[i].matchName.match(/layer/i)
        ) {
          if (!isInArrayComp(selection[i].containingComp, compsArray)) {
            compsArray.push(selection[i].containingComp);
          }
          if (
            selection[i].containingComp.name.match(
              new RegExp("^" + rdc.strPalettePrefix),
            )
          ) {
            continue;
          }
          if (
            rdc.scanRecurse &&
            selection[i].source != null &&
            selection[i].source instanceof CompItem &&
            !selection[i].source.name.match(
              new RegExp("^" + rdc.strPalettePrefix),
            ) &&
            !isInArrayComp(selection[i].source, selection)
          ) {
            selection.push(selection[i].source);
          }
          writeLn(
            "Scanning Layer: " +
              selection[i].index +
              ". " +
              selection[i].name +
              "out of " +
              selection.length,
          );
          updateProgBar(
            progressDlg,
            compsArray.length,
            selection[i].containingComp.name,
            compsArray.length,
            i + 1,
            selection[i].index != undefined
              ? selection[i].index + ". "
              : "" + selection[i].name,
            selection.length,
          );
          if (bakeSolidWithSingleFill(selection[i])) {
            continue;
          }
        } else {
          if (myComp != undefined) {
            if (!isInArrayComp(myComp, compsArray)) {
              compsArray.push(myComp);
            }
          } else {
            compsArray.push({});
          }
          writeLn("Scanning property " + i + 1 + "out of " + selection.length);
          updateProgBar(
            progressDlg,
            compsArray.length,
            myComp != undefined ? myComp.name : "",
            compsArray.length,
            i + 1,
            selection[i].index != undefined
              ? selection[i].index + ". "
              : "" + selection[i].name,
            selection.length,
            "property",
          );
        }
        if (
          selection[i].parentProperty != null &&
          selection[i].matchName.match(/^ADBE (Root )?Vector/)
        ) {
          selection[i] = selection[i].parentProperty;
        }
        var goAhead = recurseProperties(
          selection[i],
          undefined,
          rdc.sampleArray.length,
          mode,
          rdc.strPalettePrefix + rdc.paletteName,
          addColors,
        );
        if (!goAhead) {
          progressDlg.close();
          clearOutput();
          rdc.stopSearch = false;
          return false;
        }
        myComp =
          selection[i] instanceof CompItem
            ? selection[i]
            : selection[i].matchName.match(/layer/i)
              ? selection[i].containingComp
              : findContainingLayer(selection[i]).containingComp;
        if (
          rdc.addedRaytoComp &&
          !isInArrayComp(myComp, rdc.rayAddedCompsArray)
        ) {
          rdc.rayAddedCompsArray.push(myComp);
        }
      }
    }
    var colorArray = [];
    if (mode == "scan") {
      colorArray = rdc.sampleArray;
    }
    progressDlg.close();
    clearOutput();
    rdc.stopSearch = false;
    return colorArray;
  }
  function bakeSolidWithSingleFill(prop) {
    if (prop == null) {
      return false;
    }
    if (!prop.matchName.match(/layer/i)) {
      prop = findContainingLayer(prop);
    }
    if (
      prop.source != null &&
      prop.source.mainSource instanceof SolidSource &&
      prop.source.usedIn.length == 1 &&
      checkItems(
        prop.source.id,
        prop.containingComp.layers,
        AVLayer,
        1,
        prop.containingComp.numLayers,
        checkType,
        matchSourceID,
      ).length == 1 &&
      prop.property("ADBE Effect Parade").numProperties > 0 &&
      prop.effect(1).matchName == "ADBE Fill" &&
      isRayExpression(prop.effect(1)("ADBE Fill-0002").expression) &&
      prop.effect(1)("ADBE Fill-0002").numKeys == 0
    ) {
      var saveColor = prop
        .effect(1)("ADBE Fill-0002")
        .valueAtTime(0, false)
        .slice(0, 3);
      if (compareColorArray(prop.source.mainSource.color, saveColor)) {
        prop.effect(1).remove();
        prop.source.mainSource.color = saveColor;
      } else {
        return false;
      }
      return true;
    } else {
      return false;
    }
  }
  function isInArrayComp(needle, haystack) {
    for (var i = 0; i < haystack.length; i += 1) {
      if (needle === haystack[i]) {
        return true;
      }
    }
    return false;
  }
  function isInArray(needle, haystack) {
    for (var i = 0; i < haystack.length; i += 1) {
      if (needle === haystack[i]) {
        return true;
      }
    }
    return false;
  }
  function isInArrayIndex(needle, haystack, type) {
    for (var i = 0; i < haystack.length; i += 1) {
      if (needle === haystack[i][type]) {
        return i;
      }
    }
    return -1;
  }
  function isInArrayObject(needle, haystack, prop) {
    for (var i = 0; i < haystack.length; i += 1) {
      if (
        needle instanceof Array &&
        haystack[i][prop] instanceof Array &&
        haystack[i][prop].length >= 3
      ) {
        if (compareColorArray(needle, haystack[i][prop])) {
          return i;
        }
      } else {
        if (needle === haystack[i][prop]) {
          return i;
        }
      }
    }
    return null;
  }
  function transferSampleArrayToColorArray(array) {
    var returnArray = [];
    for (var i = 0; i < array.length; i += 1) {
      returnArray[i] = {
        name:
          "Color " +
          i +
          1 +
          " [" +
          (array[i][0] * 255).toFixed(0) +
          "," +
          (array[i][1] * 255).toFixed(0) +
          "," +
          (array[i][2] * 255).toFixed(0) +
          "]",
        rgba: array[i],
      };
    }
    return returnArray;
  }
  function findContainingLayer(prop) {
    while (prop.parentProperty instanceof PropertyGroup) {
      prop = prop.parentProperty;
    }
    return prop.parentProperty;
  }
  function shouldWeRecurse(mode, prop) {
    if (
      mode != "Cap" &&
      mode != "Join" &&
      prop.numProperties != undefined &&
      prop.numProperties > 0
    ) {
      return true;
    } else if ((mode == "Cap" || mode == "Join") && prop.numProperties > 0) {
      return true;
    } else {
      return false;
    }
  }
  function recurseProperties(
    myProperty,
    myLayer,
    num,
    mode,
    paletteName,
    addColors,
  ) {
    if (addColors == undefined) {
      addColors = true;
    }
    for (var j = 1; j <= myProperty.numProperties; j += 1) {
      if (rdc.stopSearch) {
        break;
      }
      if (shouldWeRecurse(mode, myProperty.property(j))) {
        recurseProperties(
          myProperty.property(j),
          myLayer,
          num,
          mode,
          paletteName,
          addColors,
        );
      }
      if (
        mode == "Cap" ||
        mode == "Join" ||
        !isHidden(myProperty.property(j))
      ) {
        if (
          myProperty.property(j).propertyValueType === PropertyValueType.COLOR
        ) {
          if (
            mode == "scan" ||
            mode == "relink" ||
            mode == "override" ||
            num != 0 ||
            isRayExpression(myProperty.property(j).expression) ||
            myProperty.property(j).expression == ""
          ) {
            switch (mode) {
              case "select":
              case "override":
                myProperty.property(j).selected = true;
                rdc.propCount++;
                break;
              case "swap":
                if (
                  myProperty.parentProperty != null &&
                  myProperty.parentProperty.parentProperty != null
                ) {
                  rdc.swapObj.colors.push(myProperty);
                  if (myLayer == undefined) {
                    myLayer = findContainingLayer(myProperty);
                  }
                  if (
                    myProperty.matchName.toLowerCase().match(/fill|stroke/) &&
                    typeof rdc.swapObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ] == "undefined"
                  ) {
                    rdc.swapObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ] = { layer: myLayer };
                  }
                  if (
                    myProperty.matchName.toLowerCase().match(/fill/) &&
                    typeof rdc.swapObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].fill == "undefined"
                  ) {
                    rdc.swapObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].fill = myProperty.property(j);
                  }
                  if (
                    myProperty.matchName.toLowerCase().match(/stroke/) &&
                    typeof rdc.swapObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].stroke == "undefined"
                  ) {
                    rdc.swapObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].stroke = myProperty.property(j);
                  }
                }
                break;
              case "scan":
                if (
                  rdc.includeRayExpressionsInScan ||
                  !isRayExpression(myProperty.property(j).expression)
                ) {
                  var goAhead = sampleColorsIntoArray(
                    myLayer,
                    myProperty.property(j),
                    num,
                    paletteName,
                    mode,
                    addColors,
                  );
                  if (!goAhead) {
                    return false;
                  }
                }
                break;
              case "unlink":
                if (isRayExpression(myProperty.property(j).expression)) {
                  bakeExpression(myProperty.property(j));
                }
                break;
              case "relink":
                relinkExpression(myProperty.property(j));
                break;
            }
          }
        }
        if (mode == "Cap" || mode == "Join") {
          if (
            myProperty
              .property(j)
              .matchName.match(new RegExp("ADBE Vector Stroke Line " + mode))
          ) {
            var value = mode == "Cap" ? rdc.capBtn : rdc.joinBtn;
            myProperty.property(j).setValue(parseInt(value, 10) + 1);
          }
        }
      }
      if (
        mode == "scan" &&
        j == 1 &&
        (myProperty instanceof TextLayer ||
          (myProperty instanceof AVLayer &&
            myProperty.source.mainSource instanceof SolidSource &&
            !myProperty.adjustmentLayer &&
            !isNullLayer(myProperty)))
      ) {
        var solidColor =
          myProperty instanceof TextLayer
            ? myProperty.text.sourceText.value.fillColor
            : myProperty.source.mainSource.color;
        while (solidColor.length < 4) {
          solidColor.push(1);
        }
        if (!checkFillEffect(myProperty, solidColor)) {
          var fillEffect = myProperty
            .property("ADBE Effect Parade")
            .addProperty("ADBE Fill");
          fillEffect.name = rdc.strPalettePrefix + "Fill";
          fillEffect.property("ADBE Fill-0002").setValue(solidColor);
          fillEffect.moveTo(1);
        }
      }
    }
    return true;
  }
  function bakeExpression(prop) {
    var numKeys = prop.numKeys == 0 ? 1 : prop.numKeys;
    var valuesArray = [];
    for (var i = 1; i <= numKeys; i += 1) {
      writeLn("Baking key " + i + " of " + numKeys);
      if (prop.numKeys == 0) {
        valuesArray.push({
          rdc: prop.valueAtTime(0, true),
          time: null,
          val: prop.value,
        });
      } else {
        valuesArray.push({
          kii: prop.keyInInterpolationType(i),
          koi: prop.keyOutInterpolationType(i),
          rdc: prop.valueAtTime(prop.keyTime(i), true),
          time: prop.keyTime(i),
          val: prop.valueAtTime(prop.keyTime(i), false),
        });
      }
    }
    var saveExpression = prop.expression;
    if (valuesArray.length == 0) {
      prop.setValue(valuesArray[0].val);
    } else {
      if (rdc.convertExpressionToKeys) {
        app.executeCommand(2004);
        prop.selected = true;
        app.executeCommand(2639);
      } else {
        for (var i = 0; i < valuesArray.length; i += 1) {
          if (prop.numKeys == 0) {
            prop.setValue(valuesArray[i].val);
          } else {
            prop.setValueAtTime(valuesArray[i].time, valuesArray[i].val);
          }
        }
      }
    }
    prop.expression = "";
    prop.expressionEnabled = false;
    prop.selected = false;
  }
  function relinkExpression(prop) {
    if (prop.expression != "") {
      var expressionData = prop.expression.split("//RDC DATA");
      if (expressionData[0].match(/\/\/RDC Bake Data/)) {
        var keyframeData = JSONify(expressionData[1], "parse");
        if (keyframeData instanceof Array) {
          if (prop.numKeys > 0) {
            app.executeCommand(2004);
            prop.selected = true;
            app.executeCommand(21);
          }
          var rdcExpression = expressionData[2].split("//RDC EXPRESSION\n");
          if (isRayExpression(rdcExpression[1])) {
            prop.expression = rdcExpression[1];
          }
          if (keyframeData.length == 1) {
            prop.setValue(keyframeData[0].rdc);
          } else {
            for (var i = 0; i < keyframeData.length; i += 1) {
              prop.setValueAtTime(keyframeData[i].time, keyframeData[i].rdc);
              prop.setInterpolationTypeAtKey(
                i + 1,
                keyframeData[i].kii,
                keyframeData[i].koi,
              );
            }
          }
        }
      }
    }
  }
  function checkFillEffect(layer, color) {
    for (
      var i = 1;
      i <= layer.property("ADBE Effect Parade").numProperties;
      i += 1
    ) {
      if (
        layer.effect(i).matchName == "ADBE Fill" &&
        (layer.effect(i).name == rdc.strPalettePrefix + "Fill" ||
          isRayExpression(layer.effect(i)("ADBE Fill-0002").expression) ||
          compareColorArray(layer.effect(i)("ADBE Fill-0002").value, color))
      ) {
        return true;
      }
    }
    return false;
  }
  function compareColorArray(color1, color2, precision) {
    if (precision == undefined) {
      precision = 4;
    }
    return (
      color1[0].toFixed(precision) === color2[0].toFixed(precision) &&
      color1[1].toFixed(precision) === color2[1].toFixed(precision) &&
      color1[2].toFixed(precision) === color2[2].toFixed(precision)
    );
  }
  function sampleColorsIntoArray(
    myLayer,
    prop,
    num,
    paletteName,
    mode,
    addColors,
  ) {
    if (myLayer == undefined) {
      myLayer = findContainingLayer(prop);
    }
    var length =
      prop.numKeys == 0
        ? 1
        : prop.selectedKeys.length == 0
          ? prop.numKeys
          : prop.selectedKeys.length - 1;
    var start = prop.selectedKeys.length > 0 ? 0 : 1;
    for (var i = start; i <= length; i++) {
      var keyIndex = prop.selectedKeys.length == 0 ? i : prop.selectedKeys[i];
      var getPreExpressionValue =
        mode == "scan" &&
        !rdc.turnOffExpressions &&
        prop.expressionEnabled &&
        isRayExpression(prop);
      var currentValue =
        prop.numKeys == 0
          ? prop.valueAtTime(0, getPreExpressionValue)
          : prop.valueAtTime(prop.keyTime(keyIndex), getPreExpressionValue);
      var num = isInArrayObject(currentValue, rdc.sampleArray, "rgba");
      if (num == null && !addColors) {
        rdc.scanErrors.push(myLayer.name);
        continue;
      }
      if (num == null) {
        num = rdc.sampleArray.length;
        var name = prop.name.match(/^color$/i)
          ? prop.name + " " + num + 1
          : prop.name;
        rdc.sampleArray[num] = { name: name, rgba: currentValue };
        num = num + 1;
      } else {
        num = num + 1;
      }
      var keyTime =
        prop.numKeys == 0
          ? myLayer.containingComp.time
          : prop.keyTime(keyIndex);
      if (mode == "scan") {
        rdc.sampleApplyRayColorArray.push({
          addColors: addColors,
          comp: myLayer.containingComp,
          currentKeyIndex: keyIndex,
          layer: myLayer,
          layerMode: false,
          mode: mode,
          num: num,
          paletteName: paletteName,
          prop: prop,
          time: keyTime,
        });
        rdc.addedRaytoComp = true;
      }
    }
    return true;
  }
  function isNullLayer(myLayer) {
    return (
      myLayer.nullLayer ||
      (myLayer.source.mainSource instanceof SolidSource &&
        myLayer.source.name.toLowerCase().match(/null/) == -1)
    );
  }
  function isHidden(prop) {
    var result = true;
    try {
      var exprStr = prop.expression;
      var exprStatus = prop.expressionEnabled;
      var undo = false;
      if (exprStr == "") {
        exprStr = "thisProperty";
        undo = true;
      }
      prop.expression = exprStr;
      if (undo) {
        prop.expression = "";
      }
      prop.expressionEnabled = exprStatus;
      result = false;
    } catch (e) {}
    return result;
  }
  function revealInFinder(folder) {
    if ($.os.indexOf("Mac") != -1) {
      system.callSystem('open -a Finder "' + Folder(folder).fsName + '"');
    } else {
      system.callSystem('EXPLORER.EXE /select,"' + Folder(folder).fsName + '"');
    }
  }
  function checkItems(needle, haystack, type, i, length, check, match) {
    var arr = [];
    for (i; i <= length; i++) {
      if (check(haystack[i], type) && match(haystack[i], needle)) {
        arr[arr.length] = haystack[i];
      }
    }
    return arr;
  }
  function matchSourceID(item, id) {
    return item.source.id == id;
  }
  function matchSourceName(item, name) {
    return item.source.name.match(new RegExp(name)) != null;
  }
  function matchName(item, name) {
    return item.name.match(new RegExp(name)) != null;
  }
  function matchID(item, id) {
    return item.id == id;
  }
  function checkType(item, type) {
    return item instanceof type;
  }
  function checkSourceType(item, type) {
    return item.source != null ? item.source instanceof type : false;
  }
  function padDigits(n, totalDigits) {
    n = n.toString();
    var pd = "";
    if (totalDigits > n.length) {
      for (var m = 0; m < totalDigits - n.length; m += 1) {
        pd += "0";
      }
    }
    return pd + n.toString();
  }
  function exportAse(dropdown) {
    function rgbToHex(rgbArray) {
      return (
        16777216 +
        ((rgbArray[0] * 255) << 16) +
        ((rgbArray[1] * 255) << 8) +
        rgbArray[2] * 255
      )
        .toString(16)
        .slice(1);
    }
    if (dropdown.selection == null) {
      alertUI(rdc.errSelectPalette);
      return;
    }
    var comp = rdcf.paletteComps[dropdown.selection.index];
    var paletteLayer = findPaletteLayer(comp);
    if (paletteLayer == null) {
      return;
    }
    var palettes = [{ colors: [], title: comp.name }];
    for (var i = 1; i <= paletteLayer.effect.numProperties; i += 1) {
      palettes[0].colors[palettes[0].colors.length] = [
        rgbToHex(paletteLayer.effect(i)("ADBE Color Control-0001").value),
        paletteLayer.effect(i).name,
      ];
    }
    var args = encodeURIComponent(JSONify(palettes, "stringify"));
    var url = "http://aescripts.com/external/ase.php?json=" + args;
    alertUI(rdc.strExportAseConfirm.replace(/%1/, comp.name), undefined, true);
    if (rdc.alertUIReturn === true) {
      rdc.alertUIReturn = null;
      n448aa.openURL(url);
    }
    rdc.alertUIReturn = null;
  }
  function openURLs(url) {
    var winBrowserCmd = "start ";
    var macBrowserCmdStart = 'open "';
    var macBrowserCmdEnd = '"';
    if ($.os.indexOf("Windows") != -1) {
      url = url.replace(/&/g, "^&");
      command = 'cmd /c "' + winBrowserCmd + url + '"';
      system.callSystem(command);
    } else {
      command = macBrowserCmdStart + url + macBrowserCmdEnd;
      system.callSystem(command);
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
                  ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
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
      var r = "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
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
    switch (mode) {
      case "parse":
        return jsonParse(string);
        break;
      case "stringify":
        return JSON.stringify(string, undefined, prettyJSON);
        break;
    }
  }
  var rdc = {
    UIChangeCloseThreshold: 330,
    UIChangeOpenThreshold: 250,
    actionPrettyNames: {
      invert: "Inverting",
      override: "Overriding",
      relink: "Relinking",
      scan: "Linking",
      select: "Coloring",
      swap: "Swapping",
      unlink: "Unlinking",
    },
    arrDefaultColors: [
      { name: "Color 1", rgba: [1, 1, 1, 1] },
      { name: "Color 2", rgba: [0.8828125, 0.72265625, 0.625, 1] },
      { name: "Color 3", rgba: [0.37109375, 0.765625, 0.88671875, 1] },
      { name: "Color 4", rgba: [0, 0.5078125, 0.765625, 1] },
      { name: "Color 5", rgba: [0.28125, 0.13671875, 0.48828125, 1] },
      { name: "Color 6", rgba: [1, 0.86328125, 0, 1] },
      { name: "Color 7", rgba: [0.8828125, 0, 0.22265625, 1] },
    ],
    buttonSize: [32, 32],
    buttons: [{ color: [0, 0, 0, 1] }],
    buttonsPerRow: 10,
    confChangeToAnimate:
      'You have keyframes but are not using the "Animate" expression.\nThis will set hold keyframes and the color will not interpolate (it will switch at each key).\n\nWould you prefer to switch to the "Animate" expression?\n\n(saying No will leave the current expression and set all keys to hold keyframes)',
    convertExpressionToKeys: false,
    defaultAseFilename: "Default.ase",
    errBakeRelink: "The %1 operation had errors on the following layers:",
    errDiskPermission:
      "Error creating %1\nPlease check the permissions for this folder:\n%2\n\nA temp folder will be used instead",
    errFfx:
      "The necessary ffx file was not able to be created, please make sure After Effects has enough permissions to access the user folder.\n%p\n\nIf the problem persists please contact support for help:  http://aescripts.com/contact",
    errIsPaletteComp: "You cannot apply colors within the Color Palette",
    errKeyframedProp: "You cannot have any keyframes on the Color Property.",
    errLinkWithoutSelection:
      "Select any Layers or Color Properties to link up to this Color Palette.",
    errMissingFile:
      "Necessary file:\n%1\n\nis missing from:\n%2\n\nplease contact support and send a screenshot of this error\n\n%3",
    errNoElgibleCompsFound:
      "No eligle comps found for scanning (Ray palette comps are not scanned)",
    errNoLayersSelected:
      "Select a Layer or Color Property to apply the color to",
    errNoPropsSelected:
      "Select at least one Color Property to apply the color to",
    errNoSwapLayersSelected:
      "Select a Shape Layer or two Color Properties to swap colors",
    errOutofRangeColor:
      "Out of range 32bit colors cannot be accurately displayed in the palette but should still link correctly in the project",
    errPaletteCompInvalid:
      "The selected palette comp no longer exists in this project\n",
    errRefreshFirst: "Please click the Refresh button first\nError: ",
    errSamePalette:
      "This palette is already applied, select a different palette to replace",
    errScanKeyframes:
      "Currently scanning of keyframed properties is not supported. These keyframed properties were skipped:",
    errScriptAccess:
      'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
    errSelectPalette: "Select a Color Palette from the pulldown menu",
    errStroke: "Either Fill or Stroke (or both) must be selected",
    errSwapKeyframes:
      "Currently swapping of keyframed properties is not supported. These keyframed properties were skipped:",
    errSwapNonShapeLayer:
      "Swap only works on Shape Layers. These layers were skipped:",
    errTrialButtonLimit: "The trial is limited to the first 3 color buttons",
    errTrialLimit: "This feature is disabled in the trial version",
    errTrialMax: "The trial version is limited to one palette",
    errTurnOffExpressions:
      'You cannot use %1 when "Turn off expression link" is checked. Please turn it off to use this feature',
    errWrongScanExpressions:
      'Ray requires the default "Color" and "Animate" expressions to work.\nPlease open the expressions folder and make sure they exist, if not please re-install them.',
    expressionPaletteNameKey: "%palette-name%",
    expressions: [
      {
        expression:
          '//01Ray Color 2.0\nrayColorPalette = comp("%palette-name%");\nrayColorSwatch = Math.floor(value[2]*255);\ntry{ rayColorPalette.layer(1)(4)(rayColorSwatch)(1); }catch(e){ value; }',
      },
      {
        expression:
          '//02Ray Random 2.0\nrayColorPalette = comp("%palette-name%");\nrayColorSwatch = Math.floor(value[2]*255);\nseedRandom(rayColorSwatch,true);p=rayColorPalette.layer(1)(4).numProperties;r=Math.round(random(1,p));\ntry{rayColorPalette.layer(1)(4)(r)(1);}catch(e){value;}',
      },
      {
        expression:
          '//03Ray Cycle 2.5\nrayColorPalette = comp("%palette-name%");\nrayColorSwatch = Math.floor(value[2]*255);\ncycle=0;c=0;if(marker.numKeys){m=marker.nearestKey(time); c=m.index-(m.time>time);\nif(c!=0&&marker.key(c).duration&&marker.key(c).time<=time ){o=marker.key(c).time;cycle=Math.floor((time-o)/(marker.key(c).duration));}}\np=rayColorPalette.layer(1)(4).numProperties;a=((rayColorSwatch+cycle+c-1)%p)+1;\ntry{rayColorPalette.layer(1)(4)(a)(1);}catch(e){value;}',
      },
      {
        expression:
          '//04Ray Random Cycle 2.5\nrayColorPalette = comp("%palette-name%");\nrayColorSwatch = Math.floor(value[2]*255);\ncycle=0;c=0;if(marker.numKeys){m=marker.nearestKey(time);c=m.index-(m.time>time);\nif(c!=0&&marker.key(c).duration && marker.key(c).time<=time){o = marker.key(c).time;cycle=Math.floor((time-o)/(marker.key(c).duration));}}\nseedRandom(rayColorSwatch+cycle+c,true);p=rayColorPalette.layer(1)(4).numProperties;r=Math.round(random(1,p));\ntry{rayColorPalette.layer(1)(4)(r)(1);}catch(e){value;}',
      },
      {
        expression:
          '//05Ray Animate 2.5\n//Updated for JS and ES by John Colombo\nvar rayColorPalette = comp("%palette-name%");\nvar numSwatches = rayColorPalette.layer( 1 )( 4 ).numProperties; // Caching this negates use of the try/catch\n\n// Declaring this operation as a function allows for more caching\nfunction getSwatchNum( fourColorArray ) {\n\treturn Math.floor( fourColorArray[ 2 ] * 255 );\n}\n\nfunction getColor( n, numSwatches, rdcPalette ) {\n\tvar swatchNum = ( n instanceof Array ) ? getSwatchNum( n ) : getSwatchNum( key( n ).value );\n\t\n\tif ( swatchNum <= numSwatches ) {\n\t\treturn rdcPalette.layer( 1 )( 4 )( swatchNum )( 1 ).value;\n\t} else {\n\t\treturn key( n ).value;\n\t}\n}\n\nvar rayColor; // Initialize variable for final value here.\n\nif ( numKeys ) {\n\tvar nK = nearestKey( time );\n\tvar k = ( nK.time <= time ) ? nK.index : Math.max( 1, --nK.index ); // Use Math.max() to prevent k === 0;\n\t\n\tif ( k < numKeys && time >= key( k ).time && time < key( k + 1 ).time ) {\n\t\tvar sColor = getColor( k, numSwatches, rayColorPalette );\n\t\tvar eColor = getColor( k + 1, numSwatches, rayColorPalette );\n\t\t\n\t\trayColor = linear( time, key( k ).time, key( k + 1 ).time, sColor, eColor );\n\t} else {\n\t\trayColor = getColor( k, numSwatches, rayColorPalette );\n\t}\n} else {\n\trayColor = getColor( value, numSwatches, rayColorPalette );\n}\n\nrayColor;',
      },
    ],
    forumUrl:
      "http://aescripts.com/forums/discussion/1315/ray-dynamic-color-2/#latest",
    includeRayExpressionsInScan: true,
    lovelySynonyms: [
      "ray-licious",
      "bangin\'",
      "slammin\'",
      "smokin\'",
      "smooth",
      "choice",
      "primo",
      "fantabulous",
      "flawless",
      "the most bestest eva",
      "fly",
      "alluring",
      "engaging",
      "pleasing",
      "splendid",
      "sweet",
      "stunning",
      "pleasant",
      "delightful",
      "delicate",
      "delicious",
      "gorgeous",
      "graceful",
      "enchanting",
      "pretty",
      "exquisite",
      "handsome",
      "picture",
      "fair",
      "knockout",
      "winning",
      "dainty",
      "nice",
      "admirable",
      "adorable",
      "amiable",
      "attractive",
      "comely",
      "delectable",
      "enjoyable",
      "good-looking",
      "gratifying",
      "rare",
      "scrumptious",
      "beauteous",
      "bewitching",
      "pulchritudinous",
      "captivating",
      "lovesome",
    ],
    numPaletteNumPadding: 2,
    numberOfPaletteShortcutButtons: 10,
    numberOfPaletteShortcutButtonsMax: 500,
    numberOfPaletteShortcutButtonsPerRow: 10,
    objPaletteComp: {
      duration: 1,
      frameRate: 24,
      height: 500,
      pixelAspect: 1,
      width: 1000,
    },
    palettePainters: [
      "Maria A\'Becket",
      "Hans von Aachen",
      "Riza-i Abbasi",
      "Louise Abbema",
      "John White Abbott",
      "Lemuel Francis Abbott",
      "Abel de Pujol",
      "Tony Abeyta",
      "Nicolai Abildgaard",
      "John Absolon",
      "Tomma Abts",
      "Andreas Achenbach",
      "Oswald Achenbach",
      "Chris Achilleos",
      "The Achilles Painter",
      "Franz Ackermann",
      "Max Ackermann",
      "Valerio Adami",
      "Clinton Adams",
      "John Ottis Adams",
      "Robert Adams",
      "Wayman Adams",
      "Louis-Emile Adan",
      "Jankel Adler",
      "George Adomeit",
      "Alexander Adriaenssen",
      "Pieter Coecke van Aelst",
      "Willem van Aelst",
      "Pieter Aertsen",
      "The Affecter",
      "Yaacov Agam",
      "Eileen Agar",
      "Jacques-Laurent Agasse",
      "Knud Agger",
      "Joaquin Agrasot y Juan",
      "William Aikman",
      "Craigie Aitchison",
      "Ivan Aivazovsky",
      "Giuseppe Ajmone",
      "Francesco Albani",
      "Josef Albers",
      "Cherubino Alberti",
      "Giovanni Alberti",
      "Mariotto Albertinelli",
      "Ivan Albright",
      "Pierre Alechinsky",
      "Francis Alexander",
      "John White Alexander",
      "William Alexander",
      "Carlos Alfonzo",
      "Mihr Ali",
      "Henry Thomas Alken",
      "Samuel Alken Sr.",
      "David Allan",
      "William Allan",
      "Etienne Allegrain",
      "Anne Huntington Allen",
      "Mary Cecil Allen",
      "Helen Allingham",
      "Thomas Allom",
      "Alessandro Allori",
      "Cristofano Allori",
      "Washington Allston",
      "Laura Alma-Tadema",
      "Sir Lawrence Alma-Tadema",
      "Peder Als",
      "Denys van Alsloot",
      "Charles Alston",
      "Rudolf von Alt",
      "Albrecht Altdorfer",
      "Mathias Alten",
      "Altichiero",
      "Natan Altman",
      "John Altoon",
      "Aby Altson",
      "Mabel Alvarez",
      "Edmond-Francois Aman-Jean",
      "Antonio Henrique Amaral",
      "Tarsila do Amaral",
      "The Amasis Painter",
      "Eugene-Emmanuel Amaury-Duval",
      "Christoph Amberger",
      "Ghada Amer",
      "Friedrich von Amerling",
      "Ezra Ames",
      "Giacomo Amiconi",
      "Cuno Amiet",
      "Emma Amos",
      "Jan van Amstel",
      "An He",
      "Auguste Anastasi",
      "Anna Ancher",
      "Michael Ancher",
      "Mogens Andersen",
      "Carlos Anderson",
      "Sophie Anderson",
      "Stanley Anderson",
      "Walter Anderson",
      "Albert Andre",
      "Zoan Andrea",
      "Andrea da Firenze",
      "Andrea del Brescianino",
      "Andrea del Castagno",
      "Andrea del Sarto",
      "Andrea di Vanni d\'Andrea",
      "Ion Andreescu",
      "Benny Andrews",
      "Michael Andrews",
      "Pierre Andrieu",
      "Abraham Angel",
      "Giuseppe Angeli",
      "Heinrich von Angeli",
      "Fra Angelico",
      "Peter Angellis",
      "Hermen Anglada Camarasa",
      "Charles Angrand",
      "Raul Anguiano",
      "Lucia Anguissola",
      "Sofonisba Anguissola",
      "Albert Anker",
      "Pietro Annigoni",
      "Louis Anquetin",
      "Pieter van Anraadt",
      "Andrea Ansaldo",
      "Richard Ansdell",
      "Michelangelo Anselmi",
      "Thomas Anshutz",
      "Louis-Joseph Anthonissen",
      "Alexandre Antigna",
      "Antimenes Painter",
      "Jose Claudio Antolinez",
      "Antonello da Messina",
      "Antonello de Saliba",
      "Aleksei Antropov",
      "Nemesio Antunez",
      "Richard Anuszkiewicz",
      "Siegfried Anzinger",
      "Jose Aparicio",
      "Apollonio di Giovanni",
      "Charles Appel",
      "Karel Appel",
      "Adolphe Appian",
      "Andrea Appiani",
      "Ida Applebroog",
      "Ulrich Apt the Elder",
      "Ken Aptekar",
      "Alessandro Araldi",
      "James Archer",
      "Giuseppe Arcimboldo",
      "Mordecai Ardon",
      "Juan de Arellano",
      "Stuart Arends",
      "Arent Arentsz.",
      "Ivan Petrovich Argunov",
      "Avigdor Arikha",
      "Marshall Arisman",
      "Abram Arkhipov",
      "Maxwell Armfield",
      "Edward Armitage",
      "Ian Armstrong",
      "John Armstrong",
      "William Armstrong",
      "George Arnald",
      "Claude Arnulphy",
      "Jean Arp",
      "Eduardo Arroyo",
      "Boris Artzybasheff",
      "Pieter Jansz. van Asch",
      "Julian Ashton",
      "Amico Aspertini",
      "Steven Assael",
      "Jan Asselyn",
      "Gioacchino Assereto",
      "Balthasar van der Ast",
      "Asteas",
      "Nikolai Astrup",
      "John Augustus Atkinson",
      "W.E. Atkinson",
      "Dr. Atl",
      "Jean-Michel Atlan",
      "Dotty Attie",
      "Rene Auberjonois",
      "John Woodhouse Audubon",
      "Frank Auerbach",
      "William Auerbach-Levy",
      "Louis-Augustin Auguin",
      "George Ault",
      "James Aumonier",
      "Jacques-Andre-Joseph Aved",
      "Barent Avercamp",
      "Hendrick Avercamp",
      "Milton Avery",
      "Gillian Ayres",
      "Luis Cruz Azaceta",
      "Dirck van Baburen",
      "Judith Baca",
      "Francesco Bacchiacca",
      "Otto Henry Bacher",
      "Il Baciccio",
      "Harriet Backer",
      "Jacob Adriaensz. Backer",
      "Jacob de Backer",
      "Ludolf Backhuysen",
      "Francis Bacon",
      "Henry Bacon",
      "John Henry F. Bacon",
      "Sir Nathaniel Bacon",
      "Sisto Badalocchio",
      "Joseph Badger",
      "Donald Baechler",
      "John Baeder",
      "Jan de Baen",
      "George Baer",
      "Jo Baer",
      "Giovanni Baglione",
      "William Bailey",
      "Francois Baillairge",
      "Alice Bailly",
      "David Bailly",
      "Enrico Baj",
      "William Bliss Baker",
      "Alessio Baldovinetti",
      "Cyrus LeRoy Baldridge",
      "Hans Baldung Grien",
      "Hendrick van Balen",
      "Antonio Balestra",
      "Alice Worthington Ball",
      "Giacomo Balla",
      "Jose Balmes",
      "Balthus",
      "The Baltimore Painter",
      "James Bama",
      "Banksy",
      "Edward M. Bannister",
      "Marciano Baptista",
      "Miklos Barabas",
      "Jean Barbault",
      "Charles Burton Barber",
      "Miquel Barcelo",
      "Eliza Rosanna Barchus",
      "James Bard",
      "John Bard",
      "Dirck Barendsz.",
      "James Barenger",
      "Charles Bargue",
      "Thomas Jones Barker",
      "Wright Barker",
      "Thomas Barker of Bath",
      "Francis Barlow",
      "Barna da Siena",
      "Barnaba da Modena",
      "Rev. William Henry Barnard",
      "Ernie Barnes",
      "Will Barnet",
      "Wilhelmina Barns-Graham",
      "J.M. Barnsley",
      "Federico Barocci",
      "Rafael Barradas",
      "Laureano Barrau",
      "George Barret Jr.",
      "George Barret Sr.",
      "Robert Barrett-Browning",
      "Hugh Barron",
      "Anne Meredith Barry",
      "James Barry",
      "William Gerard Barry",
      "Hercules Barsotti",
      "Paul-Albert Bartholome",
      "Bo Bartlett",
      "Jennifer Bartlett",
      "William Henry Bartlett",
      "Bartolo di Fredi",
      "Bartolomeo di Giovanni",
      "Bartolomeo Veneto",
      "Fra Bartolommeo",
      "Antoine-Louis Barye",
      "Marco Basaiti",
      "Afro Basaldella",
      "Evaristo Baschenis",
      "Georg Baselitz",
      "Maria Bashkirtseff",
      "Leonard Baskin",
      "Jean-Michel Basquiat",
      "Francesco Bassano",
      "Jacopo Bassano",
      "Leandro Bassano",
      "Bartholomeus van Bassen",
      "Marcantonio Bassetti",
      "Lazzaro Bastiani",
      "Il Bastianino",
      "Alfred Bastien",
      "Jules Bastien-Lepage",
      "James Bateman",
      "Robert Bateman",
      "Robert Bateman 1842-1922",
      "David Bates",
      "Maxwell Bates",
      "Pompeo Batoni",
      "Pierre-Antoine Baudouin",
      "Paul Baudry",
      "Gustav Bauernfeind",
      "Lubin Baugin",
      "Charles Baugniet",
      "Walter Emerson Baum",
      "Leila T. Bauman",
      "Gustave Baumann",
      "Karl Baumann",
      "Willi Baumeister",
      "Johann Wolfgang Baumgartner",
      "Edward Bawden",
      "Ramon Bayeu",
      "Francisco Bayeu y Subias",
      "Jean Bazaine",
      "Frederic Bazille",
      "William Baziotes",
      "Giuseppe Bazzani",
      "Thomas Beach",
      "Gifford Beal",
      "Jack Beal",
      "Reynolds Beal",
      "Mary Beale",
      "Lawrence Beall-Smith",
      "William Holbrook Beard",
      "Romare Bearden",
      "The Beardsley Limner",
      "George Beare",
      "J.W. Beatty",
      "Robert Beauchamp",
      "Sir George Howland Beaumont",
      "Andre Beauneveu",
      "Cecilia Beaux",
      "Domenico Beccafumi",
      "Francesco Beccaruzzi",
      "Gaspar Becerra",
      "Robert Bechtle",
      "Leonhard Beck",
      "Clarice Beckett",
      "William Beckman",
      "Max Beckmann",
      "James Carroll Beckwith",
      "Sir William Beechey",
      "Cornelis Beelt",
      "Jan de Beer",
      "Jan van Beers",
      "Julia Hart Beers",
      "Jan Abrahamsz. Beerstraten",
      "Osias Beert the Elder",
      "Cornelis Bega",
      "Karl Begas the Elder",
      "Harrison Begay",
      "Abraham Begeyn",
      "Leigh Behnke",
      "Pierre de Belay",
      "Cecil C. Bell",
      "Charles Bell",
      "Dozier Bell",
      "George Bell",
      "John Zephaniah Bell",
      "Leland Bell",
      "Peter Bell",
      "Robert Anning Bell",
      "Trevor Bell",
      "Vanessa Bell",
      "F.M. Bell-Smith",
      "Hippolyte Bellange",
      "Jacques Bellange",
      "John Bellany",
      "Alexis Simon Belle",
      "Henri Bellechose",
      "Jean Bellegambe",
      "Gaetano Bellei",
      "Albert Belleroche",
      "Jean Bellette",
      "Elinor Bellingham-Smith",
      "Gentile Bellini",
      "Giovanni Bellini",
      "Jacopo Bellini",
      "Bernardo Bellotto",
      "Albert Fitch Bellows",
      "George Wesley Bellows",
      "Antonio Bellucci",
      "Leon Belly",
      "Bonifacio Bembo",
      "Francesco Benaglio",
      "Henry Benbridge",
      "Wilhelm Bendz",
      "Billy Al Bengston",
      "Ben Benn",
      "Robert Benney",
      "Aleksandr Benois",
      "Marie-Guillemine Benoist",
      "Francois-Leon Benouville",
      "Jean-Achille Benouville",
      "Ambrosius Benson",
      "Frank Weston Benson",
      "Leslie Langille Benson",
      "Thomas Hart Benton",
      "Benvenuto di Giovanni",
      "Jean Beraud",
      "Nicolaes Berchem",
      "Gerrit Adriaensz. Berckheyde",
      "Job Berckheyde",
      "Elizabeth Berdann",
      "Adrian Berg",
      "Pierre-Nolasque Bergeret",
      "Christoffel van den Berghe",
      "Johann Georg Bergmuller",
      "Yosl Bergner",
      "Bergognone",
      "Antoine Berjon",
      "Tony Berlant",
      "The Berlin Painter",
      "Bonaventura Berlinghieri",
      "Eugene Berman",
      "Bartolome Bermejo",
      "Emile Bernard",
      "Martin Bernat",
      "Antonio Berni",
      "Oscar Edmund Berninghaus",
      "Gianlorenzo Bernini",
      "Theresa Ferber Bernstein",
      "Louis Beroud",
      "Alonso Berruguete",
      "Pedro Berruguete",
      "George Theodore Berthon",
      "Edouard Bertin",
      "Jean-Victor Bertin",
      "Nicolas Bertin",
      "Giovanni Battista Bertucci",
      "Albert Besnard",
      "Jolan Gross Bettelheim",
      "John Bettes",
      "Louis Betts",
      "Joachim Beuckelaer",
      "Robert Bevan",
      "Ambrogio Bevilacqua",
      "Jan de Beyer",
      "Abraham Hendrickz. van Beyeren",
      "Biagio d\'Antonio da Firenze",
      "Mose Bianchi",
      "Pamela Bianco",
      "Francois-Auguste Biard",
      "Bicci di Lorenzo",
      "Frank Bicknell",
      "Alexandre Bida",
      "Jean-Joseph-Xavier Bidauld",
      "George Biddle",
      "David Bierk",
      "Albert Bierstadt",
      "Trophime Bigot",
      "Martin Bigum",
      "Jan van Bijlert",
      "Anna Bilinska",
      "Giovanni Bilivert",
      "Max Bill",
      "Ejler Bille",
      "Jacob Binck",
      "George Caleb Bingham",
      "S.J. Lamorna Birch",
      "Thomas Birch",
      "William Russell Birch",
      "Birger Sandzen",
      "Sir Oswald Hornby Joseph Birley",
      "Renato Birolli",
      "Elmer Bischoff",
      "Franz Bischoff",
      "Isabel Bishop",
      "Giuseppe Bernardino Bison",
      "Cornelis Bisschop",
      "Julius Bissier",
      "Roger Bissiere",
      "Pier Francesco Bissolo",
      "Eugene de Blaas",
      "Elizabeth Blackadder",
      "Joseph Blackburn",
      "Charles Blackman",
      "Tom Blackwell",
      "Nell Blaine",
      "Edmund Blair-Leighton",
      "William Blake",
      "Ralph Albert Blakelock",
      "Norman Blamey",
      "Edmund Blampied",
      "Jacques Blanchard",
      "Maria Blanchard",
      "Jacques-Emile Blanche",
      "Louis-Gabriel Blanchet",
      "Louis Nicolas van Blarenberghe",
      "Blas de Ledesma",
      "Edwin Howland Blashfield",
      "Carl Blechen",
      "Ross Bleckner",
      "Douglas Percy Bliss",
      "Albert Bloch",
      "Martin Bloch",
      "Benjamin Block",
      "Abraham Bloemaert",
      "Jan Frans van Bloemen",
      "Pieter van Bloemen",
      "Lancelot Blondeel",
      "Merry-Joseph Blondel",
      "Hyman Bloom",
      "Pieter de Bloot",
      "Sandra Blow",
      "Oscar Bluemner",
      "Norman Bluhm",
      "Oscar Bluhm",
      "Robert Frederick Blum",
      "Peter Blume",
      "Ernest Leonard Blumenschein",
      "David Gilmour Blythe",
      "Boccaccio Boccaccino",
      "Camillo Boccaccino",
      "Giovanni Boccati",
      "Umberto Boccioni",
      "Arnold Bocklin",
      "Henry John Boddington",
      "Karl Bodmer",
      "Johann Boeckhorst",
      "Herbert Boeckl",
      "Karl Boehme",
      "Pieter Boel",
      "Bram Bogart",
      "Jakob Bogdany",
      "Frank M. Boggs",
      "Skunder Boghossian",
      "Michael Bohme",
      "Aaron Bohrod",
      "Louis-Leopold Boilly",
      "Alfred Boisseau",
      "Felix Boisselier",
      "Jean-Jacques de Boissieu",
      "Ferdinand Bol",
      "Hans Bol",
      "Giovanni Boldini",
      "Ilya Bolotowsky",
      "Giovanni Antonio Boltraffio",
      "David Bomberg",
      "Camille Bombois",
      "Bon de Boullogne",
      "Giulio di Antonio Bonasone",
      "Marion Bond",
      "Stephen Bone",
      "Chesley Bonestell",
      "Benedetto Bonfigli",
      "Auguste Bonheur",
      "Rosa Bonheur",
      "Gino Bonichi",
      "Richard Parkes Bonington",
      "Pierre Bonnard",
      "Leon Bonnat",
      "Pierre Bonnaud",
      "Francesco Bonsignori",
      "Francois Bonvin",
      "Cameron Booth",
      "Hendrik van der Borcht",
      "Pieter Van Der Borcht",
      "Paris Bordone",
      "Paul-Emile Borduas",
      "The Boread Painter",
      "Edward Borein",
      "Francisco Bores Lopez",
      "Pedro Alexandrino Borges",
      "Auguste Borget",
      "Orazio Borgianni",
      "Juan de Borgona",
      "Victor Borisov-Musatov",
      "Vladimir Lukich Borovikovskii",
      "Luis Borrassa",
      "Eduard Borregaard",
      "Anthonie van Borssom",
      "Johannes Bosboom",
      "Hieronymus Bosch",
      "Pieter van den Bosch",
      "Felice Boselli",
      "Richard Bosman",
      "Homer Boss",
      "Ambrosius Bosschaert the Elder",
      "Giuseppe Bossi",
      "Fernando Botero",
      "Andries Both",
      "Jan Dirksz Both",
      "Jessie Arms Botke",
      "Sandro Botticelli",
      "Francesco Botticini",
      "Francois Boucher",
      "Adriaen Frans Boudewyns",
      "Eugene Boudin",
      "Samuel Bough",
      "George Henry Boughton",
      "Adolphe William Bouguereau",
      "Elizabeth Gardner Bouguereau",
      "Gustave Boulanger",
      "Louis Boulanger",
      "Valentin de Boulogne",
      "Sebastien Bourdon",
      "James Bourne",
      "Esaias Boursse",
      "Louis-Maurice Boutet de Monvel",
      "Charles Edward Boutibonne",
      "Charles-Marie Bouton",
      "Aelbrecht Bouts",
      "Dieric Bouts the Elder",
      "Dieric Bouts the Younger",
      "Antoine Bouvard",
      "Laurent Joseph Daniel Bouvier",
      "Harry Bowden",
      "Ashley Bowen",
      "Henry Alexander Bowler",
      "Frank Bowling",
      "William Bowyer",
      "Sir William Boxall",
      "George Price Boyce",
      "Joanna Boyce",
      "Emma Minnie Boyd",
      "Arthur Boyd Jr.",
      "Arthur Boyd Sr.",
      "Bob Boyer",
      "Eleanor Vere Boyle",
      "Olga Boznanska",
      "Hercules Brabazon Brabazon",
      "Carlo di Braccesco",
      "John Brack",
      "Robert Brackman",
      "Marie Bracquemond",
      "William Bradford",
      "Carolyn Brady",
      "Henri de Braekeleer",
      "Donato Bramante",
      "Bramantino",
      "Leonaert Bramer",
      "Frank Bramley",
      "Giacinto Brandi",
      "Herbert Brandl",
      "Marianne Brandt",
      "Sir Frank William Brangwyn",
      "Wally Brants",
      "Georges Braque",
      "Jacques-Raymond Brascassat",
      "John Bratby",
      "Maurice Braun",
      "Victor Brauner",
      "Cecco Bravo",
      "Claudio Bravo",
      "Alan Bray",
      "Jan de Bray",
      "Salomon de Bray",
      "Yves Brayer",
      "Ludovico Brea",
      "Alfred de Breanski Jr.",
      "Alfred de Breanski Sr.",
      "Pierre Brebiette",
      "John Leslie Breck",
      "Carl Fredrik von Breda",
      "Rae Sloan Bredin",
      "Bartholomeus Breenbergh",
      "George Hendrik Breitner",
      "Quirijn van Brekelenkam",
      "Carl Brenders",
      "Nicolas-Guy Brenet",
      "Louise Breslau",
      "Jules Breton",
      "John Brett",
      "Jorg Breu the Elder",
      "Jorg Breu the Younger",
      "John Brewster Jr.",
      "Edward Frederick Brewtnall",
      "Alfred Thompson Bricher",
      "Frederick Arthur Bridgman",
      "F.H. Brigden",
      "Henry Perronet Briggs",
      "Henry Bright",
      "Paul Bril",
      "Gustave Brion",
      "Arthur Briscoe",
      "Karl Briullov",
      "Jean Broc",
      "Gerald Leslie Brockhurst",
      "Louis le Brocquy",
      "Crispin van den Broeck",
      "Elias van den Broeck",
      "Melchior Broederlam",
      "Roger Broer",
      "William Bromley",
      "Richard Brompton",
      "Agnolo Bronzino",
      "Alexander Brook",
      "Bertram Brooker",
      "Charles Brooking",
      "James Brooks",
      "Nicholas Alden Brooks",
      "Romaine Brooks",
      "Hans Brosamer",
      "Robert Brough",
      "Adriaen Brouwer",
      "Cecily Brown",
      "Ford Madox Brown",
      "Frederick James Brown",
      "George Loring Brown",
      "Glenn Brown",
      "J. Appleton Brown",
      "Joan Brown",
      "John George Brown",
      "John-Lewis Brown",
      "Lucy Madox Brown",
      "Mather Brown",
      "Roger Brown",
      "William Mason Brown",
      "Archibald Browne",
      "Belmore Browne",
      "Byron Browne",
      "Henriette Browne",
      "Franklin Brownell",
      "Colleen Browning",
      "Patrick Henry Bruce",
      "William Blair Bruce",
      "Jan Bruegel the Elder",
      "Pieter Bruegel the Elder",
      "Jan Bruegel the Younger",
      "Pieter Bruegel the Younger",
      "George M. Bruestle",
      "Constantino Brumidi",
      "Feodor Bruni",
      "Gunter Brus",
      "Brusasorci",
      "George deForest Brush",
      "Jean Brusselmans",
      "Barthel Bruyn the Elder",
      "Bartel Bruyn the Younger",
      "Lina Bryans",
      "Charles Bryant",
      "The Brygos Painter",
      "William Brymner",
      "The Bucci Painter",
      "Frank Buchser",
      "Stephen Buckley",
      "Karl Albert Buehr",
      "Bernard Buffet",
      "Giuliano Bugiardini",
      "Robert Buhler",
      "Felix-Hilaire Buhot",
      "Eugene Buland",
      "George Lawrence Bulleid",
      "Kate Elizabeth Bunce",
      "Louis Bunce",
      "Edgar Bundy",
      "Dennis Miller Bunker",
      "Andrew Fisher Bunner",
      "Rupert Bunny",
      "Shiokawa Bunrin",
      "Elbridge Ayer Burbank",
      "Hendrick van der Burch",
      "Pablo Burchard",
      "Charles Burchfield",
      "Jacob Burck",
      "Joseph E. Burgess",
      "Hans Burgkmair the Elder",
      "David Burliuk",
      "Henry Burn",
      "Eugene Burnand",
      "Edward Burne-Jones",
      "Benjamin Burnell",
      "James Burnet",
      "Jim Burns",
      "George Elbert Burr",
      "Edward Burra",
      "Alberto Burri",
      "Bryson Burroughs",
      "Frederic William Burton",
      "William Shakespeare Burton",
      "Andrea Busati",
      "Charles Bush",
      "Jack Bush",
      "Bernardino Jacopi Butinone",
      "Elizabeth Butler",
      "James Butler",
      "Samuel Butler",
      "Theodore Butler",
      "Gail Butt",
      "James E. Buttersworth",
      "Thomas Buttersworth",
      "Freeman Butts",
      "Louis Buvelot",
      "Willem Buytewech",
      "William Bygrave",
      "Jerry Bywaters",
      "Alexandre Cabanel",
      "Hugh Cabot",
      "Giuseppe Cades",
      "Paul Cadmus",
      "Ippolito Caffi",
      "Guido Cagnacci",
      "Cai Liang",
      "Gustave Caillebotte",
      "Eugenio Cajes",
      "Alexandre Calame",
      "Giacinto Calandrucci",
      "Antoine Calbet",
      "Lawrence Calcagno",
      "Johan Stephen von Calcar",
      "Philip Hermogenes Calderon",
      "Clyde Caldwell",
      "Sir Augustus Wall Callcott",
      "Antoine Francois Callet",
      "William Callow",
      "Abraham van Calraet",
      "Adolphe-Felix Cals",
      "Claude Calthrop",
      "Denys Calvaert",
      "Edward Calvert",
      "Luca Cambiaso",
      "James Cameron",
      "Sir David Cameron",
      "Nicholas S. Cammillieri",
      "Nicolas Cammillieri",
      "Charles Camoin",
      "Jeffery Camp",
      "Domenico Campagnola",
      "Pedro de Campana",
      "James Campbell",
      "Steven Campbell",
      "Jacob van Campen",
      "Heinrich Campendonk",
      "Govert Dircksz Camphuysen",
      "Antonio Campi",
      "Bernardino Campi",
      "Giulio Campi",
      "Vincenzo Campi",
      "Massimo Campigli",
      "Robert Campin",
      "Federico del Campo",
      "Vincenzo Camuccini",
      "Canaletto",
      "Alonso Cano",
      "Ramon Cano Manilla",
      "Simone Cantarini",
      "Domenico Cantatore",
      "Domenico Maria Canuti",
      "Puccio Capanna",
      "Bartolommeo Caporali",
      "Jan van de Cappelle",
      "Domenico Capriolo",
      "Giovanni Battista Caracciolo",
      "Armand-Charles Caraffe",
      "Caravaggio",
      "Polidoro da Caravaggio",
      "Louis Caravaque",
      "Giovanni Bernardo Carbone",
      "Filippo Carcano",
      "Bartolommeo Carducci",
      "Vincenzo Carducci",
      "Giovanni Cariani",
      "Arthur B. Carles",
      "Luca Carlevaris",
      "George Carline",
      "Richard Carline",
      "George Howard, Ninth Earl of Carlisle",
      "Carlo Carloni",
      "Emil Carlsen",
      "John Fabian Carlson",
      "Ken Carlson",
      "Franklin Carmichael",
      "John Wilson Carmichael",
      "Johann Hermann Carmiencke",
      "Louis de Carmontelle",
      "Antonio Carneo",
      "Fra Carnevale",
      "Antonio Carnicero",
      "Carolus-Duran",
      "Antoine Caron",
      "Paul Caron",
      "Nicolas Carone",
      "Angelo Caroselli",
      "Giovanni Francesco Caroto",
      "Vittore Carpaccio",
      "Jean-Baptiste Carpeaux",
      "Francis Bicknell Carpenter",
      "The Carpenter Painter",
      "Giulio Carpioni",
      "Emily Carr",
      "Carlo Carra",
      "Agostino Carracci",
      "Annibale Carracci",
      "Antonio Carracci",
      "Lodovico Carracci",
      "Mario Carreno",
      "Juan Carreno de Miranda",
      "Rosalba Carriera",
      "Eugene Carriere",
      "Dora Carrington",
      "Leonora Carrington",
      "Michael Carroll",
      "J.H. Carse",
      "Clarence Holbrook Carter",
      "Carl Gustav Carus",
      "Flavio de Carvalho",
      "Andrea Casali",
      "Giovanni Casanova",
      "John William Casilear",
      "Felice Casorati",
      "Mary Cassatt",
      "Henry C. Casselli Jr.",
      "A.J. Casson",
      "Joao Batista Castagneto",
      "Gabriele Castagnola",
      "Enrico Castellani",
      "Bernardo Castello",
      "Valerio Castello",
      "Federico Castellon",
      "Giovanni Benedetto Castiglione",
      "Giuseppe Castiglione",
      "Jose del Castillo",
      "Antonio Castillo y Saavedra",
      "Franz Ludwig Catel",
      "Mark Catesby",
      "George Catlin",
      "Jacob Cats",
      "Eugene Henri Cauchois",
      "Louis de Caullery",
      "Emiliano Di Cavalcanti",
      "Pietro Cavallini",
      "Bernardo Cavallino",
      "Giacomo Cavedone",
      "Pierre-Jacques Cazes",
      "Jean-Charles Cazin",
      "Marie Cazin",
      "Cecco del Caravaggio",
      "Adriano Cecioni",
      "Gustaf Cederstrom",
      "Michelangelo Cerquozzi",
      "Giacomo Ceruti",
      "Yreina Cervantez",
      "Cesare da Sesto",
      "Giuseppe Cesari",
      "Bartolomeo Cesi",
      "Paul Cezanne",
      "Paul Chabas",
      "William Chadwick",
      "Marc Chagall",
      "Jefferson David Chalfant",
      "Alfred Chalon",
      "George Chambers",
      "Thomas Chambers",
      "Jean-Baptiste de Champaigne",
      "Philippe de Champaigne",
      "Benjamin Champney",
      "James Wells Champney",
      "Winthrop Chandler",
      "Nicolas Chaperon",
      "James Chapin",
      "Charles Chaplin",
      "Mary Millicent Chaplin",
      "Conrad Wise Chapman",
      "John Gadsby Chapman",
      "Jean-Baptiste-Simeon Chardin",
      "James Charles",
      "Michael Ray Charles",
      "Frantz Charlet",
      "Nicolas-Toussaint Charlet",
      "Victor Charreton",
      "Theobald Chartran",
      "Louisa Chase",
      "Richard Chase",
      "William Merritt Chase",
      "Theodore Chasseriau",
      "Russell Chatham",
      "Pierre-Athanase Chauvin",
      "Jose Chavez Morado",
      "Georges Chavignaud",
      "Chen Chi",
      "Chen Fushan",
      "Chen Rong",
      "Paul Chenavard",
      "Cheng Shifa",
      "Nicolas Chevalier",
      "Giuseppe Chiari",
      "The Chicago Painter",
      "Francois-Nicolas Chifflart",
      "Jacopo Chimenti",
      "The Chimera Painter",
      "George Chinnery",
      "Antoine Chintreuil",
      "Choi Sokhwan",
      "Shen Chou",
      "Albert William Christ-Janer",
      "Dan Christensen",
      "Hans Christiansen",
      "Robert Duncan Christie",
      "Petrus Christus",
      "Frederic Edwin Church",
      "Frederick Stuart Church",
      "Winston Spencer Churchill",
      "Gonzalo Cienfuegos Browne",
      "Carlo Cignani",
      "Lodovico Cigoli",
      "Cimabue",
      "Francesco Romulo Cincinato",
      "Giovanni Battista Cipriani",
      "Niccolo Circignani",
      "Mikalojus Ciurlionis",
      "Vincenzo Civerchio",
      "Matteo Civitale",
      "Bruno Civitico",
      "Pieter Claeissens I",
      "Pieter Claesz",
      "Richard Clague",
      "Georges Clairin",
      "William Henry Clapp",
      "George Clare",
      "Alson Skinner Clark",
      "Claude Clark",
      "Kate Freeman Clark",
      "Paraskeva Clark",
      "Thomas Clark",
      "John Clem Clarke",
      "Lady Edna Clarke Hall",
      "Claude Lorrain",
      "Emile Claus",
      "Joaquin Clausell",
      "C. Clausen",
      "Franciska Clausen",
      "Sir George Clausen",
      "Marshall Claxton",
      "Gertrude des Clayes",
      "Alice Cleaver",
      "Francesco Clemente",
      "Hendrik de Clerck",
      "Charles-Louis Clerisseau",
      "Joos van Cleve",
      "Franz Cleyn",
      "George Clint",
      "Chuck Close",
      "William Baxter Closson",
      "Francois Clouet",
      "Jean Clouet the Younger",
      "Prunella Clough",
      "Giorgio Giulio Clovio",
      "Edmund Coates",
      "George Coates",
      "Leon-Matthieu Cochereau",
      "Jan Wellens de Cock",
      "Matthys Cock",
      "Viviano Codazzi",
      "Pieter Codde",
      "Charles Codman",
      "Claudio Coello",
      "Leon Cogniet",
      "Bernard Cohen",
      "Peter Coker",
      "Cola Dell\'Amatrice",
      "Sir William Coldstream",
      "George Vicat Cole",
      "J. Foxcroft Cole",
      "Thomas Cole",
      "Charles Caryl Coleman",
      "Michael Coleman",
      "Robert Colescott",
      "Francisco Collantes",
      "Raphael Collazo",
      "Edwaert Collier",
      "John Collier",
      "Cecil Collins",
      "Charles Allston Collins",
      "William Collins",
      "James Collinson",
      "Samuel Colman 1780-1845",
      "Samuel Colman 1832-1920",
      "Adam Colonia",
      "Alexander Colquhoun",
      "Robert Colquhoun",
      "Alex Colville",
      "Charlotte Buell Coman",
      "Simon Combes",
      "The Conant Limner",
      "Sebastiano Conca",
      "Eduardo Conde",
      "Charles Conder",
      "George Condo",
      "Davis Cone",
      "Marvin Cone",
      "Giambattista Cima da Conegliano",
      "William Congdon",
      "Gillis Congnet",
      "David de Coninck",
      "Gillis van Coninxloo",
      "John Connah",
      "Philip Connard",
      "John Constable",
      "Lionel Bicknell Constable",
      "Benjamin Constant",
      "Barrie Cook",
      "Beryl Cook",
      "Howard Cook",
      "Barrie Cooke",
      "Edward William Cooke",
      "Abraham Cooper",
      "Alfred Egerton Cooper",
      "Colin Campbell Cooper",
      "Emma Lampert Cooper",
      "Thomas Sidney Cooper",
      "Washington Bogart Cooper",
      "William Cooper",
      "Richard Cooper Jr.",
      "Adriaen Coorte",
      "Charles West Cope",
      "Sir Arthur Stockdale Cope",
      "John Singleton Copley",
      "Fern Isabel Coppedge",
      "Coppo di Marcovaldo",
      "Gonzales Coques",
      "Edward Corbett",
      "Henry Corbould",
      "Belisario Corenzio",
      "Lovis Corinth",
      "The Corinthianizing Painter",
      "Fernand Cormon",
      "Michele Felice Corne",
      "Corneille",
      "Jean-Baptiste Corneille",
      "Corneille de Lyon",
      "Peter von Cornelius",
      "Thomas Cornell",
      "Paul Cornoyer",
      "Jean-Baptiste-Camille Corot",
      "Correggio",
      "Edouard Cortes",
      "Domenico Corvi",
      "Stanley Cosgrove",
      "Francesco del Cossa",
      "Jan Cossiers",
      "Artur Timoteo da Costa",
      "Giovanni Costa",
      "Lorenzo Costa",
      "Olga Costa",
      "Placido Costanzi",
      "Maria Cosway",
      "Pierre-Auguste Cot",
      "Colijn de Coter",
      "Francis Cotes",
      "Frederic George Cotman",
      "John Sell Cotman",
      "Charles Cottet",
      "Robert Cottingham",
      "Louis-Charles-Auguste Couder",
      "Noel Counihan",
      "Gustave Courbet",
      "Joseph-Desire Court",
      "Guillaume Courtois",
      "Jacques Courtois",
      "Eanger Irving Couse",
      "Jean Cousin the Elder",
      "Lucie Cousturier",
      "Thomas Couture",
      "Philibert-Leon Couturier",
      "Miguel Covarrubias",
      "Russell Cowles",
      "Frank Cowper",
      "David Cox",
      "John Rogers Cox",
      "Kenyon Cox",
      "Tim Cox",
      "Michiel van Coxcie",
      "Antoine Coypel",
      "Charles-Antoine Coypel",
      "Alexander Cozens",
      "John Robert Cozens",
      "Guidoccio Cozzarelli",
      "Marmaduke Cradock",
      "Josse van Craesbeeck",
      "Lucas Cranach the Elder",
      "Lucas Cranach the Younger",
      "John Cranch",
      "Anne Crane",
      "Bruce Crane",
      "Toller Cranston",
      "Len Crawford",
      "Ralston Crawford",
      "Joseph Crawhall",
      "John Craxton",
      "Gaspar de Crayer",
      "Giovan Battista Crema",
      "Daniele Crespi",
      "Giovanni Battista Crespi",
      "Giuseppe Maria Crespi",
      "William Nicoll Cresswell",
      "Thomas Creswick",
      "Donato Creti",
      "Conrad Faber von Creuznach",
      "Francis Criss",
      "Joshua Cristall",
      "Warren Criswell",
      "Allan Rohan Crite",
      "Carlo Crivelli",
      "Vittorio Crivelli",
      "Simone dei Crocefissi",
      "Georg-Heinrich Crola",
      "John Crome",
      "Joane Cromwell",
      "Anthonie Jansz. van der Croos",
      "Jasper Francis Cropsey",
      "Giovanni Battista Crosato",
      "Henri-Edmond Cross",
      "Eyre Crowe",
      "William Crozier",
      "William Cruickshank",
      "Emilio Cruz",
      "Juan Pantoja de la Cruz",
      "Carlos Cruz-Diez",
      "Istvan Csok",
      "Tivadar Csontvary Kosztka",
      "Enzo Cucchi",
      "Edward Cucuel",
      "Jose Luis Cuevas",
      "George Cuitt Jr.",
      "Maurice Galbraith Cullen",
      "Johann M. Culverhouse",
      "Charles Cundall",
      "Rinaldo Cuneo",
      "Greg Curnoe",
      "Francesco Curradi",
      "Charles Courtney Curran",
      "Ken Currie",
      "John Currin",
      "John Steuart Curry",
      "Philip Curtis",
      "R.W. Curtis",
      "Eleanor Parke Custis",
      "Frans Cuyck Van Myerop",
      "Aelbert Cuyp",
      "Benjamin Gerritsz. Cuyp",
      "Jacob Gerritz. Cuyp",
      "Theodore Caruelle d\'Aligny",
      "Jacques d\'Arthois",
      "Georges d\'Espagnat",
      "Melchior d\'Hondecoeter",
      "Leon Dabo",
      "Milton Dacosta",
      "Richard Dadd",
      "Bernardo Daddi",
      "Jan Frans van Dael",
      "Pascal-Adolphe-Jean Dagnan-Bouveret",
      "Johan Christian Dahl",
      "Michael Dahl",
      "Elliott Daingerfield",
      "Cornelis van Dalem",
      "Salvador Dali",
      "Luis Dalmau",
      "Christen Dalsgaard",
      "Sven Dalsgaard",
      "Fra Dana",
      "Francis Danby",
      "Ken Danby",
      "George Dance II",
      "Sir Nathaniel Dance-Holland",
      "Cesare Dandini",
      "Bartholomew Dandridge",
      "Josef Danhauser",
      "Thomas Daniell",
      "William Daniell",
      "Rene Daniels",
      "Henri-Pierre Danloux",
      "Nassos Daphnis",
      "Jacques Daret",
      "Jean Daret",
      "The Darius Painter",
      "Robin Darwin",
      "Andrew Dasburg",
      "Charles-Francois Daubigny",
      "Adrien Dauzats",
      "Ian Davenport",
      "Gerard David",
      "Jacques-Louis David",
      "Dennis Davidson",
      "Alan Davie",
      "Arthur Bowen Davies",
      "David Davies",
      "Kenneth Davies",
      "Charles Harold Davis",
      "Don Davis",
      "Gene Davis",
      "Henry William Banks Davis",
      "John Scarlett Davis",
      "Richard Thomas Davis",
      "Ronald Davis",
      "Stuart Davis",
      "William Davis",
      "George Dawe",
      "Edwin Dawes",
      "Janet Dawson",
      "Manierre Dawson",
      "Montague Dawson",
      "John Dawson-Watson",
      "Forshaw Day",
      "Francis Day",
      "Edward Dayes",
      "Giorgio de Chirico",
      "De Es",
      "Roy De Forest",
      "Sir Roger de Grey",
      "Franklin de Haven",
      "Gustave Leonard de Jonghe",
      "Elaine Fried de Kooning",
      "Willem de Kooning",
      "Anthonie de Lorme",
      "Philippe Jacques de Loutherbourg",
      "Evelyn de Morgan",
      "Robert de Niro Sr.",
      "Filippo de Pisis",
      "Nicholas de Stael",
      "Samuel de Wilde",
      "Peter de Wint",
      "Peter de Witte",
      "Jacopo de\'Barbari",
      "Ercole de\'Roberti",
      "Lajos Deak-Ebner",
      "Charles Deas",
      "Edouard Debat-Ponsan",
      "Louis-Philibert Debucourt",
      "Joseph DeCamp",
      "Ralph E. DeCamp",
      "Alexandre-Gabriel Decamps",
      "Joseph Decker",
      "Julio deDiego",
      "Leonard Defrance",
      "Edgar Degas",
      "William Degouve de Nuncques",
      "V. DeGrailly",
      "Adolf Dehn",
      "Alfred Dehodencq",
      "Eugene Delacroix",
      "Beauford Delaney",
      "Paul Delaroche",
      "Jules-Elie Delaunay",
      "Robert Delaunay",
      "Sonia Delaunay",
      "C. Edmund Delbos",
      "Dirck van Delen",
      "Charles Edouard Delort",
      "Hippolyte-Camille Delpy",
      "Paul Delvaux",
      "Jean Delville",
      "Jacques-Francois Delyen",
      "Jean-Louis Demarne",
      "Joseph deMartini",
      "Charles Demuth",
      "Maurice Denis",
      "The Denison Limner",
      "Balthasar Denner",
      "Stephen Poyntz Denning",
      "Robyn Denny",
      "Andre Derain",
      "William Derby",
      "Rene Derouin",
      "Claude Deruet",
      "David Des Granges",
      "Marcellin Gilbert Desboutin",
      "Frank H. Desch",
      "Blaise Alexandre Desgoffe",
      "Eugene Deshayes",
      "Jean-Baptiste Deshays",
      "Vincent Desiderio",
      "Desiderio da Settignano",
      "Alexandre-Francois Desportes",
      "Louis-Jean Desprez",
      "Louis Paul Dessar",
      "Michele Desubleo",
      "Edouard Detaille",
      "Ludwig Deutsch",
      "Andre Devambez",
      "Walter Howell Deverell",
      "Achille Deveria",
      "Eugene Deveria",
      "Louis-Theodore Devilly",
      "Anthony Devis",
      "Arthur Devis",
      "Gennie DeWeese",
      "Robert DeWeese",
      "Charles Melville Dewey",
      "Maria Oakey Dewing",
      "Thomas Wilmer Dewing",
      "Theophile-Louis Deyrolle",
      "Benedetto Diana",
      "Narcisse-Virgile Diaz de la Pena",
      "Robert Dickerson",
      "Edwin Dickinson",
      "Preston Dickinson",
      "Sidney E. Dickinson",
      "Sir Frank Dicksee",
      "Jane Dickson",
      "Richard Diebenkorn",
      "Abraham van Diepenbeeck",
      "Abraham Diepraam",
      "Adelheid Dietrich",
      "Adolf Dietrich",
      "Christian Wilhelm Ernst Dietrich",
      "Robert Dighton",
      "Mary Dignam",
      "Floris van Dijck",
      "Burgoyne Diller",
      "Johann Georg von Dillis",
      "John Cox Dillman Engleheart",
      "Etienne Dinet",
      "Ding Yunpeng",
      "Kim Dingle",
      "Harvey Dinnerstein",
      "Dionisii",
      "Nicolas Dipre",
      "Otto Dix",
      "Don Dixon",
      "Maria Dixon",
      "Maynard Dixon",
      "William Dixon",
      "Gaspare Diziani",
      "Giovanni Do",
      "William Dobson",
      "William Charles Thomas Dobson",
      "Mstislav Dobuzhinsky",
      "Lamar Dodd",
      "Robert Dodd",
      "William DeLeftwich Dodge",
      "Theo van Doesburg",
      "Peter Doig",
      "Carlo Dolci",
      "John Henry Dolph",
      "Domenichino",
      "Domenico da Tolmezzo",
      "Domenico di Bartolo",
      "Domenico di Michelino",
      "Domenico Veneziano",
      "Oscar Dominguez",
      "Gino de Dominicis",
      "Rita Donagh",
      "Antony Donaldson",
      "Janos Donat",
      "Enrico Donati",
      "Gerard Donck",
      "Dong Qichang",
      "Dionys van Dongen",
      "Kees van Dongen",
      "Antonio Donghi",
      "Lynn Donoghue",
      "Gaines Ruger Donoho",
      "Bev Doolittle",
      "Lambert Doomer",
      "Piero Dorazio",
      "Istvan Dorfmeister",
      "Johann Dorner",
      "Battista Dossi",
      "Dosso Dossi",
      "Gerrit Dou",
      "Paul Dougherty",
      "Thomas Doughty",
      "William Doughty",
      "Aaron Douglas",
      "Sir William Fettes Douglas",
      "Douris",
      "Arthur Dove",
      "Arthur Wesley Dow",
      "Robert Dowling",
      "Rackstraw Downes",
      "Tom Downing",
      "John Downman",
      "Gabriel-Francois Doyen",
      "Herbert Draper",
      "William Franklin Draper",
      "Alfred de Dreux",
      "Clement Drew",
      "Werner Drewes",
      "Elsie Driggs",
      "Martin Drolling",
      "Cornelius Droochsloot",
      "Joost Cornelisz. Droochsloot",
      "Willem Drost",
      "Francois-Hubert Drouais",
      "Jean-Germain Drouais",
      "Arthur Drummond",
      "Malcolm Drummond",
      "Russell Drysdale",
      "Paul Dubois",
      "Toussaint Dubreuil",
      "Victor Dubreuil",
      "Claude-Marie Dubufe",
      "Louis-Edouard Dubufe",
      "Duccio di Buoninsegna",
      "Jacob Duck",
      "Joseph Ducreux",
      "Rose Adelaide Ducreux",
      "Louis Ducros",
      "Frank V. Dudley",
      "Ernest Duez",
      "Edward Dufner",
      "Charles Dufresne",
      "Jean Dufy",
      "Raoul Dufy",
      "Thomas Cantrell Dugdale",
      "Gaspard Dughet",
      "Edward Dugmore",
      "Karel Dujardin",
      "Marlene Dumas",
      "Pierre Louis Dumesnil the Younger",
      "Frank Dumond",
      "Pierre Dumonstier",
      "Evelyn Dunbar",
      "Augustus Dunbier",
      "Edward Duncan",
      "John Duncan",
      "Thomas Duncan",
      "Robert Scott Duncanson",
      "Carroll Dunham",
      "Balthazar Anton Dunker",
      "William Dunlap",
      "Ronald Ossory Dunlop",
      "Robert Spear Dunning",
      "Andre Dunoyer de Segonzac",
      "William Herbert Dunton",
      "Francoise Duparc",
      "Joseph-Siffred Duplessis",
      "Gainsborough Dupont",
      "Domenico Dupra",
      "Jules Dupre",
      "Julien Dupre",
      "Leon-Victor Dupre",
      "Georges Dupuis",
      "Asher B. Durand",
      "John Durand",
      "Fortunato Duranti",
      "Albrecht Durer",
      "George Henry Durrie",
      "Cornelis Dusart",
      "Jeanne Duval",
      "Marc Duval",
      "Louis Duveau",
      "Elizabeth Lyman Boott Duveneck",
      "Frank Duveneck",
      "Theophile-Emmanuel Duverger",
      "Gerardus Duyckinck",
      "Pieter Duyfhuysen",
      "Willem Cornelisz. Duyster",
      "William Dyce",
      "Friedel Dzubas",
      "The Eagle Painter",
      "Susan Macdowell Eakins",
      "Thomas Eakins",
      "Joan Eardley",
      "Maud Earl",
      "Ralph Earl",
      "Ralph Eleaser Whiteside Earl",
      "Augustus Earle",
      "Eyvind Earle",
      "Sir Alfred East",
      "Sir Charles Lock Eastlake",
      "Seth Eastman",
      "Charles Harry Eaton",
      "Charles Warren Eaton",
      "William B. Eaton",
      "Wyatt Eaton",
      "Charles Ebert",
      "Christian Eckart",
      "Christoffer Wilhelm Eckersberg",
      "Eden Upton Eddis",
      "Don Eddy",
      "Albert Edelfelt",
      "Henry Edridge",
      "Allan Edson",
      "George Wharton Edwards",
      "Gerbrand van den Eeckhout",
      "Andries van Eertvelt",
      "Karl von Egeri",
      "Augustus Leopold Egg",
      "Maude Kaufman Eggemeyer",
      "Vilmos Egger",
      "Albin Egger-Lienz",
      "William Maw Egley",
      "Jozsef Egry",
      "John Whetten Ehninger",
      "Wilhelm Schubert van Ehrenberg",
      "Georg Dionysius Ehret",
      "Jacob Eichholtz",
      "Louis Eilshemius",
      "Charles Dominique Eisen",
      "Pieter Janssens Elinga",
      "Florence Cooney Ellerhusen",
      "Charles Loring Elliott",
      "Walter Ellison",
      "Alfred Elmore",
      "Adam Elsheimer",
      "Arthur John Elsley",
      "Lydia Field Emmet",
      "Alfred Edward Emslie",
      "Magnus Enckell",
      "Thomas Ender",
      "Cornelis Engebrechtsz.",
      "George Engleheart",
      "Delphin Enjolras",
      "John J. Enneking",
      "James Ensor",
      "Epiktetos",
      "Nancy Erickson",
      "David Ericson",
      "Martha Mayer Erlebacher",
      "Hans Erni",
      "Jimmy Ernst",
      "Max Ernst",
      "Rudolph Ernst",
      "Agnolo degli Erri",
      "Erte",
      "Jacob van Es",
      "Juan Antonio Escalante",
      "Juan de Espinosa",
      "Jacob Esselens",
      "Baldassare Estense",
      "Richard Estes",
      "Maurice Esteve",
      "Antoine Etex",
      "William Etty",
      "Euphronios",
      "Eupolis Painter",
      "Jessie Benton Evans",
      "Henri Jacques Evenepoel",
      "Allart van Everdingen",
      "Cesar van Everdingen",
      "Miles Evergood",
      "Philip Evergood",
      "Reginald Grenville Eves",
      "Paterson Ewen",
      "Hans Eworth",
      "Exekias",
      "Alexandra Exter",
      "Hubert van Eyck",
      "Jan van Eyck",
      "Ivan Eyre",
      "Anthony Eyton",
      "Fabio Fabbi",
      "Francois-Xavier Fabre",
      "Pietro Fabris",
      "Barent Fabritius",
      "Carel Fabritius",
      "Pietro Faccini",
      "John Faed",
      "Thomas Faed",
      "Peter Faes",
      "Alfeo Faggi",
      "Joseph Fagnani",
      "Filippo Falciatore",
      "Biagio Falcieri",
      "Fan Kuan",
      "Fang Zhaolin",
      "Henri Fantin-Latour",
      "Manny Farber",
      "Paolo Farinati",
      "Joseph Farington",
      "Istvan Farkas",
      "Henry F. Farny",
      "David Farquarson",
      "Joseph Farquharson",
      "Charles Farrer",
      "Henry Farrer",
      "Stephen Farthing",
      "Giovanni Fattori",
      "Jean Fautrier",
      "Jean-Baptiste Fauvelet",
      "Kelly Fearing",
      "Thomas Fearnley",
      "Nicolai Fechin",
      "Giuseppi Fedi",
      "Pavel Fedotov",
      "Lyonel Feininger",
      "Robert Feke",
      "Hans-Peter Feldmann",
      "Peter Fendi",
      "Terry Fenton",
      "Adolf Fenyes",
      "Karoly Ferenczy",
      "John Duncan Fergusson",
      "Luis Fernandez",
      "John Ferneley I",
      "John Ferneley II",
      "Defendente Ferrari",
      "Gaudenzio Ferrari",
      "John Ferren",
      "Giovanni Domenico Ferretti",
      "Ciro Ferri",
      "Domenico Feti",
      "Anselm Feuerbach",
      "Georges de Feure",
      "Domenico Fiasella",
      "Robert Field",
      "Anthony Vandyke Copley Fielding",
      "Ernest Fiene",
      "Pedro Figari",
      "Giovanni Ambrogio Figino",
      "Stanislaw Fijalkowski",
      "Sir Luke Fildes",
      "Charles Filiger",
      "Filippo Napoletano",
      "Antonio Fillol Granell",
      "Pavel Filonov",
      "Perle Fine",
      "Ludovicus Finson",
      "Pier Francesco Fiorentino",
      "Fiorenzo di Lorenzo",
      "Marie-Francois Firmin-Girard",
      "Paul Fischer",
      "Eric Fischl",
      "Janet Fish",
      "Alvan Fisher",
      "Ellen Bowditch Thayer Fisher",
      "Mark Fisher",
      "Gertrude Fiske",
      "Walter Fitch",
      "John Anster Fitzgerald",
      "Lionel Fitzgerald",
      "Audrey Flack",
      "Francois Flameng",
      "Leopold Flameng",
      "Hippolyte Flandrin",
      "Georg Flegel",
      "Camille Flers",
      "Samson Flexor",
      "Gerlach Flicke",
      "Govert Flinck",
      "Sir William Russell Flint",
      "Charles Flipart",
      "Frans Floris",
      "Arthur L. Flory",
      "Bartolomeo di Tommaso da Foligno",
      "Lavinia Fontana",
      "Lucio Fontana",
      "Prospero Fontana",
      "Antonio Fontanesi",
      "Francesco Fontebasso",
      "Mary Foote",
      "Will Howe Foote",
      "Vincenzo Foppa",
      "Girolamo Forabosco",
      "Jean-Louis Forain",
      "Elizabeth Adela Armstrong Forbes",
      "John Colin Forbes",
      "Stanhope Alexander Forbes",
      "Gordon Onslow Ford",
      "Lauren Ford",
      "Walton Ford",
      "William Ford",
      "Jonathan Alistair Forrest",
      "Tom Forrestall",
      "Chuck Forsman",
      "Luca Forte",
      "Eleanor Fortescue-Brickdale",
      "Marc-Aurele Fortin",
      "Mariano Fortuny y Marsal",
      "Jean Jacques Forty",
      "Francesco Foschi",
      "Pierfrancesco Foschi",
      "Ben Foster",
      "Myles Birket Foster",
      "Tsugoharu Foujita",
      "Llyn Foulkes",
      "The Foundry Painter",
      "Jean Fouquet",
      "Alexis Jean Fournier",
      "E. Phillips Fox",
      "Marc-Aurele de Foy Suzor-Cote",
      "Alexandre-Evariste Fragonard",
      "Jean-Honore Fragonard",
      "Marie Anne Gerard Fragonard",
      "Meredith Frampton",
      "Louis Francais",
      "Riccardo Francalancia",
      "Eurilda Loomis France",
      "Esteban Frances",
      "Nicolas Frances",
      "Marcantonio Franceschini",
      "Francesco de Mura",
      "Francesco di Giorgio Martini",
      "Francesco di Vannuccio",
      "Lucas Franchoys the Younger",
      "Francesco Francia",
      "Francois Louis Thomas Francia",
      "Franciabigio",
      "John F. Francis",
      "Sam Francis",
      "J. Bond Francisco",
      "Frans Francken I",
      "Frans Francken II",
      "Hieronymus Francken II",
      "Giovanni Battista Franco",
      "Guy Francois",
      "Niccolo Frangipane",
      "Mary Frank",
      "Helen Frankenthaler",
      "Alexander Fraser",
      "Carol Hoorn Fraser",
      "Charles Fraser",
      "The Freake Limner",
      "Wilhelm Freddie",
      "Leon Frederic",
      "Don Freeman",
      "Jane Freilicher",
      "Martin Freminet",
      "Jared French",
      "Charles-Theodore Frere",
      "Roger de la Fresnaye",
      "Lucian Freud",
      "Otto Freundlich",
      "Emile Friant",
      "Pedro Friedeberg",
      "Arnold Friedman",
      "Caspar David Friedrich",
      "Washington Friend",
      "Ernst Fries",
      "Frederick Carl Frieseke",
      "Othon Friesz",
      "Alfred Downing Fripp",
      "George Arthur Fripp",
      "Thomas Fripp",
      "William Powell Frith",
      "Bernard Frize",
      "Nicolas Froment",
      "Eugene Fromentin",
      "John Frost",
      "Terry Frost",
      "William Edward Frost",
      "James Frothingham",
      "Roger Fry",
      "Thomas Frye",
      "Fu Baoshi",
      "Heinz Fuchs",
      "Louis Agassiz Fuertes",
      "Friedrich Heinrich Fuger",
      "Fujiwara Nobuzane",
      "Fujiwara Takanobu",
      "George Fuller",
      "Bernardino Fungai",
      "Francesco Furini",
      "Charles Wellington Furse",
      "John Henry Fuseli",
      "Jan Fyt",
      "Gigo Gabashvili",
      "Anton Domenico Gabbiani",
      "Agnolo Gaddi",
      "Taddeo Gaddi",
      "Eduard Gaertner",
      "Wanda Gag",
      "Robert Gagen",
      "Clarence Gagnon",
      "Thomas Gainsborough",
      "Julio Galan",
      "Eugene Galien-Laloue",
      "Fede Galizia",
      "Ellen Gallagher",
      "Sears Gallagher",
      "Louis Gallait",
      "Fernando Gallego",
      "Akseli Gallen-Kallela",
      "Omar Galliani",
      "Lattanzio Gambara",
      "Fred Gambino",
      "John Gamble",
      "Jacques Gamelin",
      "R.H. Ives Gammell",
      "Gaetano Gandolfi",
      "Ubaldo Gandolfi",
      "Gandolfino da Roreto",
      "The Gansevoort Limner",
      "Gao Fenghan",
      "Gao Jianfu",
      "Gao Qifeng",
      "Daniel Garber",
      "Daniel Gardner",
      "Domenico Gargiulo",
      "Sarah Garner",
      "Francois Garnier",
      "Michel Garnier",
      "Garofalo",
      "Norman Garstin",
      "Luigi Garzi",
      "Giovanna Garzoni",
      "Leon Gaspard",
      "Lucas Gassel",
      "Henry Martin Gasser",
      "Yves Gaucher",
      "Friedrich Gauermann",
      "Louis Gauffier",
      "Paul Gauguin",
      "Gilbert Gaul",
      "Domenico Gavarrone",
      "Edward Gay",
      "Nikolay Gay",
      "Walter Gay",
      "William Gear",
      "Andrew Geddes",
      "Walter Geikie",
      "Aert de Gelder",
      "John Zygmund Gelsavage",
      "Girolamo Genga",
      "Benedetto Gennari",
      "G.W. Gent",
      "Lillian Mathilde Genth",
      "Gentile da Fabriano",
      "Artemisia Gentileschi",
      "Orazio Gentileschi",
      "Franco Gentilini",
      "Henry-Jules-Jean Geoffroy",
      "Paul Georges",
      "Francois Gerard",
      "Marguerite Gerard",
      "Mel Gerhold",
      "Theodore Gericault",
      "Niccolo di Pietro Gerini",
      "Jean-Leon Gerome",
      "Samuel Lancaster Gerry",
      "Richard Gerstl",
      "Mark Gertler",
      "Franz Gertsch",
      "Henri Gervex",
      "Gunther Gerzso",
      "Salomon Gessner",
      "Leo Gestel",
      "Marcus Gheeraerts the Younger",
      "Jacques de Gheyn II",
      "Pier Leone Ghezzi",
      "Benedetto Ghirlandaio",
      "Domenico Ghirlandaio",
      "Ridolfo Ghirlandaio",
      "Giuseppe Ghislandi",
      "Giovanni Ghisolfi",
      "Alberto Giacometti",
      "Giovanni Giacometti",
      "Michele Giambono",
      "Giampietrino",
      "Felice Giani",
      "Raffaele Giannetti",
      "Giannicola di Paolo",
      "Corrado Giaquinto",
      "Percy W. Gibbs",
      "Alajos Gyorgyi Giergl",
      "Robert Swain Gifford",
      "Sanford Robinson Gifford",
      "Giacinto Gigante",
      "Regis-Francois Gignoux",
      "Giovanni Battista Gigola",
      "Cornelius Gijsbrechts",
      "Franciscus Gijsbrechts",
      "Jose Gil de Castro",
      "Arthur Hill Gilbert",
      "Sir John Gilbert",
      "Victor-Gabriel Gilbert",
      "Selden Connor Gile",
      "Gregory Gillespie",
      "Sam Gilliam",
      "William George Gillies",
      "Claude Gillot",
      "Harold Gilman",
      "Francoise Gilot",
      "Rev. William Gilpin",
      "Sawrey Gilpin",
      "Charles Isaac Ginner",
      "Luca Giordano",
      "Giorgione",
      "Giottino",
      "Giotto di Bondone",
      "Giovanni Agostino da Lodi",
      "Giovanni da Milano",
      "Giovanni da Modena",
      "Giovanni da San Giovanni",
      "Giovanni dal Ponte",
      "Giovanni del Biondo",
      "Giovanni di Francesco",
      "Giovanni di Paolo",
      "Giovanni Francesco da Rimini",
      "Giovanni Gioseffo dal Sole",
      "Giovanni Martini da Udine",
      "Girolamo Giovenone",
      "Lawrence Gipe",
      "Eugene Alexis Girardet",
      "Jules Girardet",
      "Anne-Louis Girodet de Roussy-Trioson",
      "Girolamo da Carpi",
      "Girolamo dai Libri",
      "Girolamo di Benvenuto",
      "Thomas Girtin",
      "Antonio Gisbert Perez",
      "Giulio Romano",
      "William Glackens",
      "Auguste Glaize",
      "Pierre-Paul-Leon Glaize",
      "Fritz Glarner",
      "Nancy Glazier",
      "James Gleeson",
      "Wilfrid de Glehn",
      "Albert Gleizes",
      "Alfred Glendening",
      "Charles Gleyre",
      "John Glover",
      "Henry George Glyde",
      "Domenico Gnoli",
      "John William Godward",
      "Norbert Goeneutte",
      "Hugo van der Goes",
      "Sigismund Goetze",
      "Ralph Goings",
      "Francisco Goitia",
      "Michael Goldberg",
      "Charles Goldie",
      "Anne Goldthwaite",
      "Joseph Golinkin",
      "E.W. Gollings",
      "Hendrick Goltzius",
      "Leon Golub",
      "Vicente Salvador Gomez",
      "Nuno Goncalves",
      "Natalia Goncharova",
      "Gong Xian",
      "Pietro Gonzaga",
      "Eva Gonzales",
      "Juan Gonzalez",
      "Vicente Palmaroli Gonzalez",
      "Juan Francisco Gonzalez Escobar",
      "Bartolome Gonzalez y Serrano",
      "Frederick Goodall",
      "Joe Goode",
      "Sidney Goodman",
      "Robert Goodnough",
      "Agnes Goodsir",
      "Albert Goodwin",
      "Arthur Clifton Goodwin",
      "Betty Goodwin",
      "Philip R. Goodwin",
      "Richard LaBarre Goodwin",
      "James Farrington Gookins",
      "Arturo Gordon",
      "Julia Emily Gordon",
      "Lady Gordon",
      "Sir John Watson Gordon",
      "Spencer Gore",
      "Richard Williams Samuel Gorenko",
      "Jean Gorin",
      "Arshile Gorky",
      "R.C. Gorman",
      "April Gornik",
      "Douglas Gorsline",
      "Aaron Harry Gorson",
      "Matsumura Goshun",
      "Thomas Cooper Gotch",
      "Adolph Gottlieb",
      "Maurycy Gottlieb",
      "Scott Goudie",
      "Hendrik Goudt",
      "William Gould",
      "Jules-Adolphe Goupil",
      "Abraham Govaerts",
      "George Gower",
      "Sir Lawrence Gowing",
      "Francisco de Goya",
      "Jan van Goyen",
      "Benozzo Gozzoli",
      "Genevieve Goth Graf",
      "Anton Graff",
      "John Graham",
      "Peter Graham",
      "Antiveduto Gramatica",
      "Francesco Granacci",
      "Eugene Grandin",
      "Nicholas de Grandmaison",
      "Francois-Marius Granet",
      "Duncan Grant",
      "Frederic Milton Grant",
      "Gordon Grant",
      "Sir Francis Grant",
      "Erasmus Grasser",
      "Emilio Grau Sala",
      "Abbott Fuller Graves",
      "Morris Graves",
      "Cleve Gray",
      "Henry Percy Gray",
      "Edmund W. Greacen",
      "Nan Greacen",
      "Walter Greaves",
      "Pieter de Grebber",
      "El Greco",
      "Alan Green",
      "Anthony Green",
      "C.E.L. Green",
      "Balcomb Greene",
      "Gertrude Greene",
      "Stephen Greene",
      "Walter L. Greene",
      "Peter Greenham",
      "John Greenhill",
      "Benjamin Greenleaf",
      "John Greenwood",
      "Gregorio de Ferrari",
      "Maurice William Greiffenhagen",
      "Jean-Baptiste Greuze",
      "Alex Grey",
      "Robert Gribbroek",
      "John Griffier the Elder",
      "Walter Griffin",
      "James Griffiths",
      "John Howard Griffiths",
      "Nicolae Grigorescu",
      "Giovanni Francesco Grimaldi",
      "Samuel Hieronymus Grimm",
      "Abel Grimmer",
      "Jacob Grimmer",
      "Alexis Grimou",
      "Atkinson Grimshaw",
      "Alex Grinager",
      "Juan Gris",
      "Henry Gritten",
      "Pieter Anthonisz. van Groenewegen",
      "Nathaniel Grogan",
      "Albert L. Groll",
      "Marcel Gromaire",
      "William Gropper",
      "Antoine-Jean Gros",
      "Anthony Gross",
      "George Grosz",
      "Henry de Groux",
      "Francis Gruber",
      "Richard B. Gruelle",
      "Jules-Alexandre Grun",
      "Elioth Gruner",
      "Isaac Grunewald",
      "Matthias Grunewald",
      "Charles Paul Gruppe",
      "Emile A. Gruppe",
      "Virginia Gruppe",
      "Gu Yun",
      "Guan Shanyue",
      "Francesco Guardi",
      "Giacomo Guardi",
      "Gian Antonio Guardi",
      "Guariento di Arpo",
      "Hans Fredrik Gude",
      "Theodore Gudin",
      "Eugene von Guerard",
      "Guercino",
      "Pierre-Narcisse Guerin",
      "Gregorio Guglielmi",
      "O. Louis Guglielmi",
      "Virgilio Guidi",
      "Guido da Siena",
      "Adrien Guignet",
      "Paul-Camille Guigou",
      "Gustave Guillaumet",
      "Armand Guillaumin",
      "Alfred Guillou",
      "Lajos Gulacsy",
      "Philip Guston",
      "Sir James Guthrie",
      "Juan Simon Gutierrez",
      "Renato Guttuso",
      "Francis Guy",
      "Allan Gwynne-Jones",
      "Jeno Gyarfas",
      "Henry Gyles",
      "Uragami Gyokudo",
      "Pieter Gysels",
      "Joris Abrahamsz. van der Haagen",
      "Cornelis Cornelisz. van Haarlem",
      "Mauritz F.H. de Haas",
      "John Haberle",
      "Jan Hackaert",
      "Arthur Hacker",
      "Jacob Philippe Hackert",
      "Carlos de Haes",
      "Louis Haghe",
      "Gustav Hahn",
      "William Hahn",
      "Edward Matthew Hale",
      "Ellen Day Hale",
      "Lilian Westcott Hale",
      "Philip Leslie Hale",
      "George Henry Hall",
      "John Hall",
      "Pam Hall",
      "John Hall 1739-1797",
      "Noel Halle",
      "Peter Halley",
      "Edward Irvine Halliday",
      "Samuel Halpert",
      "Dirk Hals",
      "Frans Hals",
      "Sturtevant J. Hamblin",
      "Maggi Hambling",
      "Theophile Hamel",
      "Juan van der Hamen y Leon",
      "Gavin Hamilton",
      "Gawen Hamilton",
      "Hugh Douglas Hamilton",
      "James Hamilton",
      "Mary Riter Hamilton",
      "William Hamilton",
      "Vilhelm Hammershoi",
      "Jean-Louis Hamon",
      "Han Gan",
      "Adriaen Hanneman",
      "Constantin Hansen",
      "Svend Wiig Hansen",
      "Simon Hantai",
      "George Harcourt",
      "Chester Harding",
      "James Duffield Harding",
      "Sylvester Harding",
      "Melbourne Hardwick",
      "Heywood Hardy",
      "Thomas Hardy",
      "Keith Haring",
      "Alexej Harlamoff",
      "George Henry Harlow",
      "William Michael Harnett",
      "Henry Andrew Harper",
      "Henri-Joseph Harpignies",
      "Lawren S. Harris",
      "Robert Harris",
      "Sam Hyde Harris",
      "Ray Harris-Ching",
      "H.B. Harrison",
      "Lowell Birge Harrison",
      "T. Alexander Harrison",
      "The Harrow Painter",
      "\'Pop\' Hart",
      "James McDougal Hart",
      "Letitia Bonnet Hart",
      "Solomon Alexander Hart",
      "William Hart",
      "Grace Hartigan",
      "Marsden Hartley",
      "William K. Hartmann",
      "Hans Hartung",
      "Bunny Harvey",
      "George Harvey",
      "Harold Harvey",
      "Marcus Harvey",
      "James Taylor Harwood",
      "Hasegawa Tohaku",
      "William Stanley Haseltine",
      "Johann Peter Hasenclever",
      "Ernest Haskell",
      "Childe Hassam",
      "Emilie Demant Hatt",
      "Clement Haupers",
      "Robert Havell",
      "William Havell",
      "Charles Webster Hawthorne",
      "Henri Hayden",
      "Palmer Hayden",
      "Benjamin Robert Haydon",
      "Edwin Hayes",
      "Francesco Hayez",
      "Edith Hayllar",
      "James Hayllar",
      "John Hayls",
      "Francis Hayman",
      "Douglas Hector Haynes",
      "William Jacob Hays",
      "Sir George Hayter",
      "Stanley William Hayter",
      "Edward Haytley",
      "Guy Head",
      "Martin Johnson Heade",
      "George P.A. Healy",
      "Charles Heaney",
      "Thomas Heaphy",
      "Thomas Hearne",
      "Adrien Hebert",
      "Ernest Hebert",
      "Erich Heckel",
      "Abraham van der Hecken",
      "Gerret Willemsz. Heda",
      "Willem Claesz. Heda",
      "Cornelis de Heem",
      "Jan Davidsz. de Heem",
      "Jan Jansz. de Heem",
      "Maerten van Heemskerck",
      "Thomas Heeremans",
      "Laszlo Hegedus",
      "Daniel van Heil",
      "Ferdinand Heilbuth",
      "Francois-Joseph Heim",
      "Joseph Heintz",
      "Attila Hejja",
      "Al Held",
      "Zama V. Helder",
      "Jean Helion",
      "Paul Helleu",
      "Dirk Helmbreker",
      "Bartholomeus van der Helst",
      "Lodewijk van der Helst",
      "Caterina van Hemessen",
      "Jan Sanders van Hemessen",
      "Arthur Heming",
      "Charles Napier Hemy",
      "Charles Cooper Henderson",
      "John Henderson",
      "Daniel Hendrickson",
      "Thomas Hennell",
      "Philippe-Auguste Hennequin",
      "Jean-Jacques Henner",
      "William John Hennessy",
      "E. Martin Hennings",
      "Frants Henningsen",
      "Robert Henri",
      "Edward Lamson Henry",
      "Paul Henry",
      "Salome Hensel",
      "Auguste Herbin",
      "Ester Hernandez",
      "Patrick Heron",
      "Saturnino Herran",
      "Arturo Herrera",
      "Sebastian de Herrera Barnuevo",
      "Francisco de Herrera the Elder",
      "Francisco de Herrera the Younger",
      "John Frederick Herring",
      "John Frederick Herring Jr.",
      "Louis Hersent",
      "Albert Herter",
      "Ludwig Herthel",
      "Herman Herzog",
      "Eva Hesse",
      "John Hesselius",
      "Jacob de Heusch",
      "Prudence Heward",
      "Jean Hey",
      "Anton Heyboer",
      "Jan van der Heyden",
      "Hans Heysen",
      "Aldro T. Hibbard",
      "Jacqueline Hick",
      "Dale Hickey",
      "Thomas Hickey",
      "George Elgar Hicks",
      "Thomas Hicks",
      "Eugene Higgins",
      "Victor Higgins",
      "Joseph Highmore",
      "Edward Hildebrandt",
      "Anthony Hill",
      "Carl Fredrik Hill",
      "David Octavius Hill",
      "Derek Hill",
      "John William Hill",
      "Thomas Hill",
      "Tristram Hillier",
      "Anna Althea Hills",
      "Robert Hills",
      "Roger Hilton",
      "William Hilton the Younger",
      "Lubaina Himid",
      "William G.R. Hind",
      "Clarence Hinkle",
      "Veit Hirschvogel the Elder",
      "Claude Raguet Hirst",
      "George Hitchcock",
      "Harold Hitchcock",
      "Ivon Hitchens",
      "Jacques Hnizdovsky",
      "Prince Hoare",
      "William Hoare",
      "Meindert Hobbema",
      "Hannah Hoch",
      "William Hodges",
      "Howard Hodgkin",
      "Frances Hodgkins",
      "Ferdinand Hodler",
      "Jan van den Hoecke",
      "Carl Hoerman",
      "Gerard Hoet",
      "Carl Hofer",
      "Charles Hoffbauer",
      "Hans Hoffmann",
      "Charles C. Hofmann",
      "Hans Hofmann",
      "William Hogarth",
      "Alexandre Hogue",
      "Claude Hoin",
      "Ambrosius Holbein",
      "Hans Holbein the Elder",
      "Hans Holbein the Younger",
      "Alfred W. Holdstock",
      "Edwin Holgate",
      "Henry Holiday",
      "Frank Holl",
      "James Holland",
      "Tish Holland",
      "Simon Hollosy",
      "Julius Holm",
      "Francis Holman",
      "Hal Holoun",
      "Sir Charles Holroyd",
      "Carl Holsoe",
      "Theodor von Holst",
      "Winslow Homer",
      "Hon\'ami Koetsu",
      "Abraham Hondius",
      "Nathaniel Hone",
      "Hongren",
      "Gerrit van Honthorst",
      "Pieter de Hooch",
      "Samuel van Hoogstraten",
      "James Clarke Hook",
      "Frances Anne Hopkins",
      "James R. Hopkins",
      "Edward Hopper",
      "John Hoppner",
      "Jean-Joseph Horemans II",
      "Jan Josef Horemans the Elder",
      "Gerard Horenbout",
      "Ian Hornak",
      "Edward Atkinson Hornel",
      "Preben Hornung",
      "John Callcott Horsley",
      "William Samuel Horton",
      "Hou Mougong",
      "Michel-Ange Houasse",
      "Gerard Houckgeest",
      "Jean Houel",
      "Arthur Boyd Houghton",
      "Thomas Hovenden",
      "Bessie Jeannette Howard",
      "Oscar Howe",
      "Samuel Howitt",
      "Peter Howson",
      "John Hoyland",
      "Hua Yan",
      "Huang Binhong",
      "John Hubbard",
      "Whitney Hubbard",
      "Wolf Huber",
      "Henry J. Hudson",
      "Thomas Hudson",
      "Jean-Baptiste Marie Huet",
      "Paul Huet",
      "William Huggins",
      "William John Huggins",
      "Arthur Hughes",
      "Edward John Hughes",
      "Edward Robert Hughes",
      "Patrick Hughes",
      "Valentine Hugo",
      "Jaume Huguet",
      "Victor Huguet",
      "Pierre Nicolas Huilliot",
      "Abraham Hulk",
      "Abraham Hulk Jr.",
      "Jacob van Hulsdonck",
      "Gary Hume",
      "Jack Humphrey",
      "Ozias Humphrey",
      "Ralph Humphrey",
      "Hundertwasser",
      "Hung Liu",
      "Alfred William Hunt",
      "William Henry Hunt",
      "William Holman Hunt",
      "William Morris Hunt",
      "George Leslie Hunter",
      "Daniel Huntington",
      "Elizabeth Hamilton Huntington",
      "Victoria Hutson Huntley",
      "Peter Hurd",
      "Frederick Yeates Hurlstone",
      "M.F. Husain",
      "Vilmos Huszar",
      "Alfred Heber Hutty",
      "Corneille Huysmans",
      "Jacob Huysmans",
      "Jean-Baptiste Huysmans",
      "Jan van Huysum",
      "Arcangelo Ianelli",
      "Julius Caesar Ibbetson",
      "Henri Gabriel Ibels",
      "Louis Icart",
      "Ike-no-Taiga",
      "Joerg Immendorff",
      "Philippe-Augustin Immenraet",
      "Joseph Murray Ince",
      "John William Inchbold",
      "Charles Cromwell Ingham",
      "Jorge Ingles",
      "Jean-Auguste-Dominique Ingres",
      "Henry Inman",
      "Mark Innerst",
      "Callum Innes",
      "James Dickson Innes",
      "George Inness",
      "Innocenzo da Imola",
      "The Inscription Painter",
      "Joaquin Inza",
      "Jean Ipousteguy",
      "Albert Irvin",
      "Wilson Irvine",
      "Terry Isaac",
      "Eugene Isabey",
      "Jean Baptiste Isabey",
      "Adriaen Isenbrant",
      "Gershon Iskowitz",
      "Isaac Israels",
      "Jozef Israels",
      "Ito Jakuchu",
      "Franz Ittenbach",
      "Alexander Ivanov",
      "Andrei Ivanov",
      "Anton Ivanov",
      "Sergei Ivanov",
      "Victor Ivanov",
      "Jacques Iverny",
      "Maria Izquierdo",
      "Richard Jack",
      "Bill Jacklin",
      "A.Y. Jackson",
      "Billy Morrow Jackson",
      "Gilbert Jackson",
      "John Jackson",
      "Samuel Phillips Jackson",
      "Jacobello Del Fiore",
      "Otto Jacobi",
      "Antonio Jacobsen",
      "Dirck Jacobsz",
      "Lambert Jacobsz",
      "Jacometto",
      "Jacopino del Conte",
      "Meliore di Jacopo",
      "Jacopo del Casentino",
      "Jacopo del Sellaio",
      "Jacopo di Cione",
      "Alexandre Jacovleff",
      "Claudius Jacquand",
      "Charles Emile Jacque",
      "Jeanne Jacquemin",
      "Yvonne Jacquette",
      "Charles Francois Jalabert",
      "Bernice Evelyn Jamieson",
      "Mitchell Jamieson",
      "Paul Jamin",
      "Jean Jansem",
      "Abraham Janssens",
      "Eugene Jansson",
      "Alex Janvier",
      "Charles Wesley Jarvis",
      "John Wesley Jarvis",
      "Alexei Jawlensky",
      "Pierre-Georges Jeanniot",
      "Etienne Jeaurat",
      "Paul Jenkins",
      "Neil Jenney",
      "William Jennys",
      "Alfred Jensen",
      "Christian Albrecht Jensen",
      "Johan Laurentz Jensen",
      "Olav Christopher Jenssen",
      "Charles Jervas",
      "Jess",
      "Robert Jessup",
      "William Jewett",
      "Byun Shi Ji",
      "Jiang Tingxi",
      "Luis Jimenez Aranda",
      "Nathaniel Jocelyn",
      "Antoine Johannot",
      "Viggo Johansen",
      "Augustus John",
      "Gwen John",
      "Jasper Johns",
      "Charles Edward Johnson",
      "Cornelius Johnson",
      "David Johnson",
      "Eastman Johnson",
      "Frank Tenney Johnson",
      "Lester Johnson",
      "William H. Johnson",
      "Frank Johnston",
      "John Johnston",
      "Antonio Joli",
      "Nicolas-Rene Jollain",
      "Bradley Jones",
      "David Jones",
      "Fay Jones",
      "George Jones",
      "Hugh Bolton Jones",
      "Joe Jones",
      "Lois Mailou Jones",
      "Nell Choate Jones",
      "Thomas Jones",
      "William Jones",
      "Ludolf Leendertsz. de Jongh",
      "Johan Barthold Jongkind",
      "Raymond Jonson",
      "Asgrimur Jonsson",
      "Joos van Wassenhove",
      "Jacob Jordaens",
      "Asger Jorn",
      "Ernst Josephson",
      "Josetsu",
      "Jacques de la Joue II",
      "Matthew Harris Jouett",
      "Jean Jouvenet",
      "George William Joy",
      "Juan de Flandes",
      "Juan de Pareja",
      "Juan de Juanes",
      "Luis Juarez",
      "Roberto Juarez",
      "William Lees Judson",
      "Jens Juel",
      "Henri Julien",
      "John Kacere",
      "Bela Kadar",
      "Frida Kahlo",
      "Wolf Kahn",
      "Kaiho Yusho",
      "Jacob Kainen",
      "Franz Kaisermann",
      "Willem Kalf",
      "L. Kamenev",
      "Wassily Kandinsky",
      "Paul Kane",
      "Kano Eitoku",
      "Kano Hideyori",
      "Kano Motonobu",
      "Kano Sanraku",
      "Kano Sansetsu",
      "Luigi Kasimir",
      "Nandor Katona",
      "Angelica Kauffmann",
      "Lee Lufkin Kaula",
      "Wilhelm von Kaulbach",
      "Sean Keating",
      "Keibun",
      "Bernhard Keil",
      "Alexander Keirincx",
      "William Keith",
      "Ferdinand Keller",
      "Henry Keller",
      "Ellsworth Kelly",
      "Gerald Kelly",
      "Ken Kelly",
      "Lucy Kemp-Welch",
      "Greta Kempton",
      "William Sergeant Kendall",
      "Garry Neil Kennedy",
      "Eric Kennington",
      "John Frederick Kensett",
      "Rockwell Kent",
      "Gyorgy Kepes",
      "Illingworth Holey Kerr",
      "James Kerr-Lawson",
      "Georg Friedrich Kersting",
      "Jan van Kessel",
      "Jan van Kessel the Younger",
      "Cornelis Ketel",
      "Tilly Kettle",
      "Kerstiaen de Keuninck",
      "Adriaen Thomas Key",
      "John Ross Key",
      "Willem Key",
      "Friedrich Wilhelm Keyl",
      "Raoul De Keyser",
      "Thomas de Keyser",
      "Hendrick de Keyser I",
      "Fernand Khnopff",
      "Ivan Khrutsky",
      "Simon Kick",
      "Anselm Kiefer",
      "Kitty Kielland",
      "Giorgio Kienerk",
      "Suzuki Kiitsu",
      "George Goodwin Kilburne",
      "Charles Bird King",
      "John Henry Yeend King",
      "Marcia Gygli King",
      "Samuel King",
      "Dong Kingman",
      "Thomas Kinkade",
      "Everett Raymond Kinstler",
      "Orest Kiprensky",
      "Otto Karl Kirberg",
      "Ernst Ludwig Kirchner",
      "Per Kirkeby",
      "Vance Kirkland",
      "Moise Kisling",
      "Samuel Kiss",
      "Torii Kiyonobu II",
      "Konrad Klapheck",
      "Gene Klebe",
      "Paul Klee",
      "Ron Kleemann",
      "Frank Kleinholz",
      "Joseph Kleitsch",
      "Leo von Klenze",
      "The Kleophrades Painter",
      "Gustav Klimt",
      "Franz Kline",
      "Max Klinger",
      "Ivan Kliun",
      "Anna Elizabeth Klumpke",
      "Charles W. Knapp",
      "George Knapton",
      "Karl Knaths",
      "Ray Knaub",
      "Alma Jordan Knauber",
      "Ludwig Knaus",
      "Sir Godfrey Kneller",
      "Charles R. Knight",
      "Dame Laura Knight",
      "Daniel Ridgway Knight",
      "Harold Knight",
      "John William Buxton Knight",
      "Louis Aston Knight",
      "Imi Knoebel",
      "Martin Knoller",
      "Dorothy Elsie Knowles",
      "Farquhar McGillivray Knowles",
      "Nicolaus Knupfer",
      "Wilhelm von Kobell",
      "Christen Kobke",
      "John Koch",
      "Joseph Anton Koch",
      "Robert Koehler",
      "Barend Cornelius Koekkoek",
      "Hermanus Koekkoek",
      "Johannes Hermanus Koekkoek",
      "Marianus Adrianus Koekkoek",
      "Willem Koekkoek",
      "Johann Koerbecke",
      "Henry Koerner",
      "William Henry Dethlef Koerner",
      "Alexander Koester",
      "Ida Rittenberg Kohlmeyer",
      "Misch Kohn",
      "Oskar Kokoschka",
      "Carl Wilhelm Kolbe I",
      "Rudolf Koller",
      "Pyotr Konchalovsky",
      "Philips Koninck",
      "Salomon Koninck",
      "Konrad of Soest",
      "Pavel Korin",
      "Konstantin Korovin",
      "Leon Kossoff",
      "Hosoi Kotaku",
      "Albert Kotin",
      "Sandor Kozina",
      "Joyce Kozloff",
      "Johann Peter Krafft",
      "Ivan Nikolaevich Kramskoy",
      "Lee Krasner",
      "Albert H. Krehbiel",
      "Cornelius Krieghoff",
      "John Lewis Krimmel",
      "Christian Krohg",
      "Leon Kroll",
      "Peder Severin Kroyer",
      "Franz Kruger",
      "Nikifor Krylov",
      "Bohumil Kubista",
      "Max Kuehne",
      "Cornelia Kuemmel",
      "Bob Kuhn",
      "Walt Kuhn",
      "Friedrich Wilhelm Kuhnert",
      "Arkhip Ivanovich Kuindzhi",
      "Guillermo Kuitca",
      "Hans Suss von Kulmbach",
      "Pieter Cornelisz. Kunst",
      "Jan Kupecky",
      "Moshe Kupferman",
      "Frantisek Kupka",
      "William Kurelek",
      "Maximilian Kurzweil",
      "Boris Kustodiev",
      "Martinus Adrianus Kuytenbrouwer",
      "Nikolai Dmitrievich Kuznetsov",
      "Pavel Kuznetsov",
      "Joseph Kyle",
      "Kawanabe Kyosai",
      "Leon Augustin L\'hermitte",
      "Peter La Cave",
      "Charles La Croix de Marseille",
      "John La Farge",
      "Charles de La Fosse",
      "Laurent de La Hyre",
      "Henry H. La Thangue",
      "Gaston La Touche",
      "Georges de La Tour",
      "Maurice Quentin de La Tour",
      "Lucien Labaudt",
      "Adelaide Labille-Guiard",
      "Jean-Emile Laboureur",
      "Carlo Labruzzi",
      "Nicolaes Lachtropius",
      "Georges Lacombe",
      "Pierre Lacour",
      "Paul Lacroix",
      "Robert Ladbrooke",
      "Cheryl Laemmle",
      "Pieter van Laer",
      "Paulus Constantijn LaFargue",
      "Niclas Lafrensen",
      "Jean-Jacques Lagrenee",
      "Louis Jean Francois Lagrenee",
      "Lai Sung",
      "Conrad Laib",
      "William James Laidlay",
      "Gerald Laing",
      "Gerard de Lairesse",
      "Randall Lake",
      "Alexander Laktionov",
      "Maxime Lalanne",
      "Georges Lallemant",
      "Wifredo Lam",
      "A.A. Lamb",
      "Henry Lamb",
      "George Cochran Lambdin",
      "George Lambert",
      "Michele di Matteo Lambertini",
      "Eugene Lami",
      "Chet LaMore",
      "Johann Baptist Lampi the Elder",
      "Lamqua",
      "Lan Ying",
      "George Lance",
      "Nicolas Lancret",
      "Charles Landelle",
      "Ronnie Landfield",
      "Charles Landseer",
      "Sir Edwin Henry Landseer",
      "Fitz Hugh Lane",
      "Jean-Louis Laneuville",
      "Giovanni Lanfranco",
      "Louis Lang",
      "Dirk Langendijk",
      "Giovan Battista Langetti",
      "Walter Langley",
      "Jerome-Martin Langlois",
      "Bernardino Lanino",
      "Andre Lanskoy",
      "Simon Mathurin Lantara",
      "Peter Lanyon",
      "Charles Lapicque",
      "Frank Lapointe",
      "Giovanni Larciani",
      "Nicolas de Largilliere",
      "Mikhail Larionov",
      "William Larkin",
      "Marcellus Laroon the Younger",
      "Marcus Larson",
      "Carl Larsson",
      "Richard Larter",
      "Lotte Laserstein",
      "Christian Riese Lassen",
      "Maria Lassnig",
      "Pieter Lastman",
      "Philip Alexius de Laszlo",
      "Ida Pulis Lathrop",
      "William Langson Lathrop",
      "Marie Laurencin",
      "Jean-Paul Laurens",
      "Ernest Laurent",
      "Jean Antoine Laurent",
      "Filippo Lauri",
      "Sir John Lavery",
      "Thomas Lawranson",
      "Jacob Lawrence",
      "Sir Thomas Lawrence",
      "Ernest Lawson",
      "Jacob Hart Lazarus",
      "Agustin Lazo",
      "Gregorio Lazzarini",
      "Blanche Lazzell",
      "Jean-Jacques-Francois Le Barbier",
      "Jakob Christof Le Blon",
      "Charles Le Brun",
      "Henri Le Fauconnier",
      "Henry le Jeune",
      "Louis-Joseph Le Lorrain",
      "Adrien Jean Le Mayeur De Merpres",
      "Francois Le Moyne",
      "Antoine Le Nain",
      "Louis Le Nain",
      "Mathieu Le Nain",
      "Jean-Baptiste Le Prince",
      "Henri Eugene Augustin Le Sidaner",
      "Eustache Le Sueur",
      "Ethel Pennewill Brown Leach",
      "Benjamin Williams Leader",
      "Charles Leandre",
      "Edward Lear",
      "Henri Lebasque",
      "Vladimir Lebedev",
      "Albert Lebourg",
      "Bart van der Leck",
      "Thomas LeClear",
      "Jean-Jules-Antoine Lecomte du Nouy",
      "Emile Lecomte-Vernet",
      "Ozias Leduc",
      "Alan Lee",
      "John Lee",
      "William Lee-Hankey",
      "Hughie Lee-Smith",
      "Remigius van Leemput",
      "Derwent Lees",
      "Claude Lefebvre",
      "Jules-Joseph Lefebvre",
      "Robert-Jacques-Francois Lefevre",
      "Silvestro Lega",
      "Joseph Legare",
      "Fernand Leger",
      "Alphonse Legros",
      "Arthur Lehmann",
      "Henri Lehmann",
      "Rolf Lehmann",
      "Anton Lehmden",
      "Wilhelm Leibl",
      "Charles Henri Joseph Leickert",
      "William R. Leigh",
      "A.C. Leighton",
      "Lord Frederic Leighton",
      "William Leighton Leitch",
      "Maurice Leloir",
      "Sir Peter Lely",
      "Jean Lemaire",
      "Madeleine Lemaire",
      "Georg Lemberger",
      "Jean Paul Lemieux",
      "Georges Lemmen",
      "Theophile-Victor-Emile Lemmens",
      "Jacques Antoine Marie Lemoine",
      "Marie-Victoire Lemoine",
      "Anicet-Charles-Gabriel Lemonnier",
      "Tamara de Lempicka",
      "Franz von Lenbach",
      "Jules-Eugene Lenepveu",
      "The Leningrad Painter",
      "Michael Lenson",
      "Aristarkh Lentulov",
      "Maximilian Lenz",
      "Jusepe Leonardo",
      "Leonardo da Vinci",
      "Ottavio Leoni",
      "Leonid",
      "Auguste-Louis Lepere",
      "Michael Nicolas-Bernard Lepicie",
      "Stanislas Lepine",
      "Charles C.E. Lermond",
      "Henry Lerolle",
      "Alfred Leslie",
      "Charles Robert Leslie",
      "George Dunlop Leslie",
      "Carl Friedrich Lessing",
      "John Lessore",
      "Therese Lessore",
      "Rita Letendre",
      "Guillaume Lethiere",
      "Hans Leu the Elder",
      "Emanuel Gottlieb Leutze",
      "Hayley Lever",
      "Julian Levi",
      "Jack Levine",
      "Isaak Il\'ich Levitan",
      "Dmitrii Grigorevich Levitskii",
      "Emile Levy",
      "Lucien Levy-Dhurmer",
      "Edmund Lewandowski",
      "John Frederick Lewis",
      "Josephine Miles Lewis",
      "Norman Lewis",
      "Professor Henry Lewis",
      "Wyndham Lewis",
      "Lucas van Leyden",
      "Hendrick Leys",
      "Judith Leyster",
      "Andre Lhote",
      "Li Cheng",
      "Li Fangying",
      "Li Kan",
      "Li Keran",
      "Li Kuchan",
      "Li Xiongcai",
      "Liberale da Verona",
      "Pietro Liberi",
      "Osvaldo Licini",
      "Bernardino Licinio",
      "Jonas Lie",
      "Max Liebermann",
      "Josse Lieferinxe",
      "Cornelius Liefrinck",
      "Paul Liegeois",
      "Jan Lievens",
      "Antal Ligeti",
      "Glenn Ligon",
      "Jacopo Ligozzi",
      "Bruno Andreas Liljefors",
      "Andrea Lillio",
      "Leonard Limosin",
      "Lin Fengmian",
      "Lin Liang",
      "Jacques Linard",
      "Richard Lindner",
      "Norman Lindsay",
      "Johannes Lingelbach",
      "John Linnell",
      "Hendrik Frans van Lint",
      "Pieter van Lint",
      "Ernst Lipgart",
      "Filippino Lippi",
      "Fra Filippo Lippi",
      "Pedro Lira",
      "Arthur Lismer",
      "Johann Liss",
      "Dirck van der Lisse",
      "El Lissitzky",
      "Wilhelm List",
      "William Horace Littlefield",
      "Liu Shiru",
      "Henry Liverseege",
      "William Home Lizars",
      "Angel Lizcano Monedero",
      "Ljuba",
      "Frank Lobdell",
      "Andrea Locatelli",
      "Carl Locher",
      "Stephan Lochner",
      "Elizabeth Lochrie",
      "William Locke Jr. of Norbury",
      "Edward Hawke Locker",
      "Rowland Lockey",
      "Damian Loeb",
      "David Loggan",
      "Luigi Loir",
      "Marianne Loir",
      "Gustave Loiseau",
      "Giovan Paolo Lomazzo",
      "Lambert Lombard",
      "Francesco Londonio",
      "Amelia Long",
      "Edwin Long",
      "McKendree Robbins Long",
      "Ted Long",
      "Alessandro Longhi",
      "Barbara Longhi",
      "Pietro Longhi",
      "Robert Longo",
      "Paul de Longpre",
      "John Longstaff",
      "James Lonsdale",
      "Francois-Louis Lonsing",
      "Jacob van Loo",
      "Jean Baptiste van Loo",
      "Theodoor van Loon",
      "Bernardo Lopez",
      "Carlos Lopez",
      "Yolanda Lopez",
      "Antonio Lopez Garcia",
      "Luis Lopez Piquer",
      "Vicente Lopez y Portana",
      "Caroline Lord",
      "Richard Lorenz",
      "Ambrogio Lorenzetti",
      "Pietro Lorenzetti",
      "Ugolino Lorenzetti",
      "Lorenzo di Credi",
      "Lorenzo Monaco",
      "Lorenzo Veneziano",
      "Anton Losenko",
      "Johann Carl Loth",
      "Lorenzo Lotto",
      "Karoly Lotz",
      "Robert Lougheed",
      "Morris Louis",
      "Louis de Boullogne",
      "Will Hicok Low",
      "Thomas Lowinsky",
      "Keith Lowry",
      "Laurence S. Lowry",
      "Lu Zhi",
      "Luca di Tomme",
      "Albert Pike Lucas",
      "Eugenio Lucas Villamil",
      "Marie Lucas-Robiquet",
      "Maximilien Luce",
      "Molly Luce",
      "Lucebert",
      "Stefan Luchian",
      "Luigi Lucioni",
      "Bernardino Luini",
      "George Luks",
      "Evariste-Vital Luminais",
      "Johan Thomas Lundbye",
      "Fernand Harvey Lungren",
      "Thomas Luny",
      "Markus Lupertz",
      "Jean Lurcat",
      "William Henry Luscomb",
      "Benedetto Luti",
      "Isaac Luttichuys",
      "Simon Luttichuys",
      "Giovanni Luzzo",
      "Laura Muntz Lyall",
      "Lydos",
      "John Goodwin Lyman",
      "The Lysippides Painter",
      "Ma Yuan",
      "Manabu Mabe",
      "Mabuse",
      "Andrew Maccallum",
      "Robert Lee MacCameron",
      "Romulo Maccio",
      "Daniel MacDonald",
      "Georgina Macdonald",
      "J.E.H. MacDonald",
      "Stanton Macdonald-Wright",
      "Zanobi Machiavelli",
      "Pedro Machuca",
      "Loren MacIver",
      "MacKay",
      "August Macke",
      "Ray Mackie",
      "Pegi Nicol MacLeod",
      "Daniel Maclise",
      "Frederick W. MacMonnies",
      "Mary Fairchild MacMonnies",
      "Frances MacNair",
      "Herbert Macnair",
      "Colin MacNee",
      "Elmer Livingston MacRae",
      "Emma Fordyce Macrae",
      "Sir William MacTaggart",
      "John MacWhirter",
      "Viktor Madarasz",
      "Jose de Madrazo y Agudo",
      "Raimundo de Madrazo y Garreta",
      "Federico de Madrazo y Kuntz",
      "Nicolaes Maes",
      "Francesco Maestosi",
      "Mario Mafai",
      "Francesco Maffei",
      "Alessandro Maganza",
      "Domenico Maggiotto",
      "Alessandro Magnasco",
      "Alberto Magnelli",
      "Rene Magritte",
      "Merrill Mahaffey",
      "Muhammad Mahdi",
      "Alice Maher",
      "Sebastiano Mainardi",
      "Mair von Landshut",
      "Paul Maitland",
      "Don Maitz",
      "Ernest Lee Major",
      "Hans Makart",
      "Konstantin Egorovich Makovsky",
      "Vladimir Makovsky",
      "Tadeusz Makowski",
      "Malangatana",
      "John Baptist Malchair",
      "Jacek Malczewski",
      "Rocio Maldonado",
      "Hans Maler zu Schwaz",
      "Kasimir Malevich",
      "Anita Malfatti",
      "Philip Maliavin",
      "Nicola Malinconico",
      "Jean-Baptiste Mallet",
      "Jean Malouel",
      "Francesco Maltese",
      "Cornelis de Man",
      "Man Ray",
      "Antonio Mancini",
      "Karel van Mander",
      "Jan Mandyn",
      "Alfred Manessier",
      "Edouard Manet",
      "Rutilio Manetti",
      "Bartolomeo Manfredi",
      "Robert Mangold",
      "Sylvia Plimack Mangold",
      "Henri Manguin",
      "J.H.S. Mann",
      "Jean Mannheim",
      "James Bolivar Manson",
      "Giovanni Mansueti",
      "Andrea Mantegna",
      "Niklaus Manuel",
      "Tommaso Manzuoli",
      "Sheng Maoye",
      "Carlo Maratta",
      "Franz Marc",
      "Conrad Marca-Relli",
      "Esteban March",
      "Girolamo Marchesi",
      "Alessandro Marchesini",
      "Pinckney Marcius-Simons",
      "Marco d\'Oggiono",
      "Rocco Marconi",
      "Louis Marcoussis",
      "Brice Marden",
      "Charles-Laurent Marechal",
      "Hans von Marees",
      "Pietro Marescalca",
      "Margaritone d\'Arezzo",
      "Boris Margo",
      "Carlo Maria Mariani",
      "Michele Giovanni Marieschi",
      "Prosper Marilhat",
      "John Marin",
      "Onorio Marinari",
      "Joseph Marioni",
      "Jacob Henricus Maris",
      "Matthijs Maris",
      "Willem Maris",
      "Henry Stacy Marks",
      "Lucy Drake Marlow",
      "William Marlow",
      "Simon Marmion",
      "Francesco Marmitta",
      "Anton von Maron",
      "Francisco Domingo Marques",
      "Albert Marquet",
      "Jacob Marrel",
      "Otto Marseus van Schrieck",
      "Reginald Marsh",
      "Benjamin Marshall",
      "Thomas Falcon Marshall",
      "Wilhelm Marstrand",
      "The Marsyas Painter",
      "Willem Martens",
      "Agnes Martin",
      "David Stone Martin",
      "Douglas Martin",
      "Elias Martin",
      "Henri Martin",
      "Homer Dodge Martin",
      "John Martin",
      "Kenneth Martin",
      "Thomas Mower Martin",
      "Robert Braithwaite Martineau",
      "Giovanni Martinelli",
      "Xavier Martinez",
      "Simone Martini",
      "Martino di Bartolomeo di Biago",
      "Bernardo Martorell",
      "Maruyama Okyo",
      "Marco Marziale",
      "Masaccio",
      "Kitao Masanobu",
      "Vitezlav Karel Masek",
      "Ilya Mashkov",
      "Juan Vicente Masip",
      "Maso di Banco",
      "Masolino da Panicale",
      "George Mason",
      "Maud Mary Mason",
      "Francisco Masriera y Manovens",
      "Andre Masson",
      "Jan Massys",
      "Quentin Massys",
      "Master A.C.",
      "Master Bertram",
      "Master M.S.",
      "Master of 1419",
      "Master of Female Half-Lengths",
      "Master of Flora",
      "Master of Frankfurt",
      "Master of Heiligenkreuz",
      "Master of Hoogstraeten",
      "Master of Pratovecchio",
      "Master of Saint Francis",
      "Master of Saint Gilles",
      "Master of Saint Veronica",
      "Master of San Jacopo a Mucciana",
      "Master of Santo Spirito",
      "Master of the Aix-en-Chapel Altarpiece",
      "Master of the Annunciation to the Shepherds",
      "Master of the Avignon School",
      "Master of the Bardi Saint Francis",
      "Master of the Baroncelli Portraits",
      "Master of the Berswordt Altar",
      "Master of the Castello Nativity",
      "Master of the Coburg Roundels",
      "Master of the Dominican Effigies",
      "Master of the Embroidered Foliage",
      "Master of the Fogg Pieta",
      "Master of the Franciscan Crucifixes",
      "Master of the Griselda Legend",
      "Master of the Holy Family",
      "Master of the Housebook",
      "Master of the Joseph Legend",
      "Master of the Karlsruhe Passion",
      "Master of the Khanenko Adoration",
      "Master of the Life of Saint John the Baptist",
      "Master of the Life of the Virgin",
      "Master of the Magdalen Legend",
      "Master of the Middle-Rhine",
      "Master of the Morrison Triptych",
      "Master of the Pfullendorf Altar",
      "Master of the Polling Panels",
      "Master of the Prado\'s Adoration of the Magi",
      "Master of the Procession",
      "Master of the Rebel Angels",
      "Master of the Retablo of the Reyes Catolicos",
      "Master of the Saint Bartholomew Altarpiece",
      "Master of the Saint Catherine Legend",
      "Master of the Saint Lucy Legend",
      "Master of the Saint Ursula Legend",
      "Master of the Tegernsee Passion",
      "Master of the Thuison Altarpiece",
      "Master of the Tibertine Sibyl",
      "Master of the View of Sainte Gudule",
      "Master of Virgo inter Virgines",
      "Jan Matejko",
      "Arthur Frank Mathews",
      "Georges Mathieu",
      "Henri Matisse",
      "Roberto Matta",
      "Paolo de\' Matteis",
      "Matteo di Giovanni",
      "Tompkins Harrison Matteson",
      "Marmaduke Matthews",
      "Rodney Matthews",
      "Georg David Matthieu",
      "Carlo Mattioli",
      "Hans Mattis-Teutsch",
      "Jan Matulka",
      "Maxime Maufra",
      "Franz Anton Maulbertsch",
      "Henri Mauperche",
      "Alphonse Maureau",
      "Alfred Henry Maurer",
      "Charles Maurin",
      "Anton Mauve",
      "Gabriel Cornelius von Max",
      "Henrietta Mabel May",
      "Frank Blackwell Mayer",
      "Marie-Francoise-Constance Mayer-Lamartiniere",
      "George Willoughby Maynard",
      "Juan Bautista Mayno",
      "Christian Mayr",
      "Juan Bautista Martinez del Mazo",
      "Damiano Mazza",
      "Marino Mazzacurati",
      "Girolamo Mazzola Bedoli",
      "Ludovico Mazzolino",
      "Sebastiano Mazzoni",
      "Colin McCahon",
      "Robert T. McCall",
      "Doris McCarthy",
      "Frank McCarthy",
      "William J. McCloskey",
      "Florence McClung",
      "Frederick McCubbin",
      "Jervis McEntee",
      "Ambrose McEvoy",
      "Jock McFadyen",
      "Duncan McFarlane",
      "James McGarrell",
      "Richard McLean",
      "Gerald McMaster",
      "George McNeil",
      "Helen McNicoll",
      "William McTaggart",
      "Adolf von Meckel",
      "Roger Medearis",
      "Robert Medley",
      "Laszlo Mednyanszky",
      "Jozef Mehoffer",
      "Julie Mehretu",
      "Tyeb Mehta",
      "Bernardino Mei",
      "The Meidias Painter",
      "Ludwig Meidner",
      "Leo J. Meissner",
      "Jean-Louis-Ernest Meissonier",
      "Georg Meistermann",
      "Gari Melchers",
      "Max Meldrum",
      "The Meleager Painter",
      "Luis Egidio Melendez",
      "Mary Blood Mellen",
      "Xavier Mellery",
      "Roberto Melli",
      "Charles Mellin",
      "Altobello Melone",
      "Melozzo da Forli",
      "Andrew Melrose",
      "Paul Meltsner",
      "Arthur Melville",
      "Francesco Melzi",
      "Hans Memling",
      "Lippo Memmi",
      "Giusto de Menabuoi",
      "Francois-Guillaume Menageot",
      "Emile-Rene Menard",
      "Leopoldo Mendez",
      "Robert Mendham",
      "June Mendoza",
      "Francisco Meneses Osorio",
      "Charles August Mengin",
      "Anton Raphael Mengs",
      "Bernard Meninsky",
      "Steve Mennie",
      "Mortimer Menpes",
      "Adolf von Menzel",
      "Bertha Menzler-Peyton",
      "Marius-Jean-Antonin Mercie",
      "Philip Mercier",
      "Johann Christof Merck",
      "John Meredith",
      "Matthaus Merian the Younger",
      "Carlos Merida",
      "Knud Merrild",
      "Anna Lea Merritt",
      "Luc-Olivier Merson",
      "Hendrik Mesdag",
      "Geza Meszoly",
      "Henry Met de Bles",
      "Willard Leroy Metcalf",
      "Sidney Meteyard",
      "Gabriel Metsu",
      "Jean Metzinger",
      "Adam-Franz van der Meulen",
      "Steven van der Meulen",
      "Constantin Meunier",
      "Charles A. Meurer",
      "Jeremiah Meyer",
      "Jacob Meyer de Haan",
      "Hendrik de Meyer II",
      "William Meyerowitz",
      "Martin van Meytens",
      "Jose Maria Lopez Mezquita",
      "Achille Etna Michallon",
      "Theobald Michau",
      "Henri Michaux",
      "Georges Michel",
      "Marius Michel",
      "Michelangelo Buonarroti",
      "Michele da Verona",
      "Michele Pannonio",
      "Parrasio Micheli",
      "Jean Michelin",
      "Michelino da Besozzo",
      "Andrea Michelli",
      "Francesco Paolo Michetti",
      "Jan Miel",
      "Hans Mielich",
      "Michiel Jansz. Miereveld",
      "Jan van Mieris",
      "Willem van Mieris",
      "Frans van Mieris the Elder",
      "Nicolas Mignard",
      "Pierre Mignard",
      "Abraham Mignon",
      "Louis Remy Mignot",
      "Frans van der Mijn",
      "Aureliano Milani",
      "John Everett Millais",
      "Addison Thomas Millar",
      "Manuel Millares Sall",
      "Alain Miller",
      "Alfred Jacob Miller",
      "Kenneth Hayes Miller",
      "Lilian May Miller",
      "Richard Emil Miller",
      "Samuel Miller",
      "Francis Davis Millet",
      "Francisque Millet",
      "Jean-Francois Millet",
      "David Milne",
      "Keiko Minami",
      "Anne Rogers Minor",
      "John Minton",
      "Joaquim Mir",
      "Joan Miro",
      "Alfred R. Mitchell",
      "Joan Mitchell",
      "Mitsushige",
      "Girolamo Mocetto",
      "Otto Modersohn",
      "Paula Modersohn-Becker",
      "Amedeo Modigliani",
      "Louis Charles Moeller",
      "Claes Cornelisz. Moeyaert",
      "Laszlo Moholy-Nagy",
      "John Henry Mohrmann",
      "Louisa Moillon",
      "Pier Francesco Mola",
      "Jan Miense Molenaer",
      "Klaes Molenaer",
      "Antonio Molinari",
      "Guido Molinari",
      "Carl Moll",
      "Giuseppe Molteni",
      "Pieter de Molyn",
      "Hendrik Mommers",
      "Frans de Momper",
      "Joos de Momper II",
      "Paolo Monaldi",
      "Peter Monamy",
      "Piet Mondrian",
      "Claude Monet",
      "Sir Thomas Monnington",
      "Pierre Etienne Monnot",
      "Jean-Baptiste Monnoyer",
      "Dr. Thomas Monro",
      "Peder Mork Monsted",
      "Bartolomeo Montagna",
      "Constant Montald",
      "Roberto Montenegro",
      "Pierre-Eugene Montezin",
      "Francesco Monti",
      "Adolphe-Joseph-Thomas Monticelli",
      "Raymond Monvoisin",
      "Albert Joseph Moore",
      "Chris Moore",
      "Henry Moore 1831-1895",
      "Carton Moore-Park",
      "Stephen Mopope",
      "Anthonis Mor",
      "Francis Luis Mora",
      "Paolo Moraldo",
      "Armando Morales",
      "Luis de Morales",
      "Thomas Moran",
      "Giorgio Morandi",
      "Morazzone",
      "Angelo Morbelli",
      "Jacob More",
      "Gustave Moreau",
      "Jean-Michel Moreau",
      "Louis Gabriel Moreau",
      "Luc-Albert Moreau",
      "Paulus Moreelse",
      "Francois Morellet",
      "Henri Moret",
      "Moretto da Brescia",
      "Alfred Morgan",
      "Frederick Morgan",
      "Leslie Morgan",
      "Christian Morgenstern",
      "Camilo Mori",
      "Berthe Morisot",
      "George Morland",
      "Henry Robert Morland",
      "Eugene Morley",
      "Malcolm Morley",
      "Ennio Morlotti",
      "Francesco Morone",
      "Giovanni Battista Moroni",
      "Hishikawa Moronobu",
      "James Wilson Morrice",
      "George L.K. Morris",
      "Sarah Morris",
      "Sir Cedric Morris",
      "George Morrison",
      "Norval Morrisseau",
      "Samuel F.B. Morse",
      "John Hamilton Mortimer",
      "Andrew Morton",
      "Christina Morton",
      "Jacob van Moscher",
      "Koloman Moser",
      "Lukas Moser",
      "Ed Moses",
      "Robert Moskowitz",
      "Henry Mosler",
      "Jean-Laurent Mosnier",
      "Olivier Mosset",
      "Gillis Mostaert",
      "Jan Mostaert",
      "Robert Motherwell",
      "Archibald Motley",
      "Victor Mottez",
      "Frederic de Moucheron",
      "Isaac de Moucheron",
      "Reuben Moulthrop",
      "Evelina Mount",
      "Shepard Alonzo Mount",
      "William Sidney Mount",
      "H. Siddons Mowbray",
      "Rodrigo Moynihan",
      "Zwelethu Mthethwa",
      "Marcello Muccini",
      "Otto Mueller",
      "Jules-Alexis Muenier",
      "David Muirhead",
      "Frederick J. Mulhaupt",
      "Pieter Mulier",
      "Charles Muller",
      "Dave Muller",
      "Fritz Muller",
      "Jan H. Muller",
      "William James Muller",
      "William Mulready",
      "Cristoforo Munari",
      "Claude Muncaster",
      "Edvard Munch",
      "Gilbert Munger",
      "Emile Munier",
      "Mihaly Munkacsy",
      "Sir Alfred James Munnings",
      "Lucio Munoz",
      "Gabriele Munter",
      "Walter Murch",
      "Bartolome Esteban Murillo",
      "Catherine Murphy",
      "Gerald Murphy",
      "John Francis Murphy",
      "Albert K. Murray",
      "Charles Fairfax Murray",
      "Elizabeth Murray",
      "Zoran Music",
      "Michiel van Musscher",
      "Girolamo Muziano",
      "Jerome Myers",
      "Jan Mytens",
      "Daniel Mytens the Elder",
      "Charles Christian Nahl",
      "John George Naish",
      "Matthys Naiveu",
      "Kazuo Nakamura",
      "Giovanni Battista Naldini",
      "Albert Namatjira",
      "Dan Namingha",
      "Celestin Francois Nanteuil",
      "The Naples Painter",
      "Mariotto di Nardo",
      "Nardo di Cione",
      "John Nash",
      "Paul Nash",
      "Alexander Nasmyth",
      "Patrick Nasmyth",
      "Robert Natkin",
      "Charles Joseph Natoire",
      "Phoebe Davis Natt",
      "Jean-Marc Nattier",
      "Herman Nauwincx",
      "Marie-Genevieve Navarre",
      "Francois-Joseph Navez",
      "Ernst Wilhelm Nay",
      "John Neagle",
      "Balthazar Nebot",
      "Peeter Neeffs I",
      "Alice Neel",
      "Aert van der Neer",
      "Eglon Hendrick van der Neer",
      "Victor Nehlig",
      "Brendan Neiland",
      "LeRoy Neiman",
      "Odd Nerdrum",
      "Neri di Bicci",
      "Neroccio",
      "William Andrews Nesfield",
      "Mikhail Vasil\'evich Nesterov",
      "Caspar Netscher",
      "Nicolas Neufchatel",
      "Alphonse-Marie-Adolphe de Neuville",
      "Christopher Richard Wynne Nevinson",
      "Ann Newdigate",
      "Barnett Newman",
      "Robert Loftin Newman",
      "Gilbert Stuart Newton",
      "Lilias Torrance Newton",
      "Sir William Newton",
      "Niccolo dell\'Abbate",
      "Niccolo di Buonaccorso",
      "Niccolo di Liberatore",
      "Niccolo di Ser Sozzo Tegliacci",
      "Rhoda Holmes Nicholls",
      "Dale Nichols",
      "Henry Hobart Nichols",
      "Ben Nicholson",
      "Francis Nicholson",
      "Mabel Nicholson",
      "Sir William Nicholson",
      "Winifred Nicholson",
      "Graham Nickson",
      "Erskine Nicol",
      "Marion Nicoll",
      "Nicolo di Pietro",
      "Jais Nielsen",
      "John Nieto",
      "Adriaen van Nieulandt",
      "Ivan Nikitin",
      "The Niobid Painter",
      "Hermann Nitsch",
      "Giuseppe de Nittis",
      "John Nixon",
      "Thomas Satterwhite Noble",
      "Jules-Achille Noel",
      "Giuseppe Nogari",
      "Sidney Nolan",
      "Kenneth Noland",
      "Emil Nolde",
      "Francois de Nome",
      "Reinier Nooms",
      "Jan van Noordt",
      "Adam van Noort",
      "Karl Nordstrom",
      "James Northcote",
      "Il Nosadella",
      "George Noseworthy",
      "David Emile Joseph de Noter",
      "Elizabeth Nourse",
      "Pietro Novelli",
      "George Loftus Noyes",
      "Pedro Nunez de Villavicencio",
      "Pedro Nunez del Valle",
      "Felix Nussbaum",
      "Carlo Francesco Nuvolone",
      "Panfilo Nuvolone",
      "Wijnand Nuyen",
      "Allegretto Nuzi",
      "John O\'Brien",
      "Lucius R. O\'Brien",
      "James Arthur O\'Connor",
      "John O\'Connor",
      "Roderic O\'Conor",
      "Juan O\'Gorman",
      "Pablo O\'Higgins",
      "Georgia O\'Keeffe",
      "Henry Nelson O\'Neil",
      "George Bernard O\'Neill",
      "Josefa de Obidos",
      "Isidoro Ocampo",
      "Manuel Ocampo",
      "Miguel Ocampo",
      "Jacob Ochtervelt",
      "Leonard Ochtman",
      "Mina Fonda Ochtman",
      "Daphne Odjig",
      "Chris Ofili",
      "Ogata Korin",
      "Tomie Ohtake",
      "Kenzo Okada",
      "Otis Oldfield",
      "Jules Olitski",
      "Nathan Oliveira",
      "T. Clark Oliver",
      "Johann Heinrich Ferdinand Olivier",
      "John Olsen",
      "Oltos",
      "The Omaha Painter",
      "Julian Onderdonk",
      "Robert Onderdonk",
      "Toni Onley",
      "Crescenzio Onofrij",
      "Jacob van Oost the Elder",
      "Maria van Oosterwyck",
      "Jacob Cornelisz van Oostsanen",
      "Roman Opalka",
      "Rodolfo Opazo Bernales",
      "John Opie",
      "Moritz Daniel Oppenheim",
      "Max Oppenheimer",
      "W. Oram",
      "Orazio de Ferrari",
      "Andrea di Orcagna",
      "Sir William Quiller Orchardson",
      "Soma Orlai Petrich",
      "Bernaert van Orley",
      "Jose Clemente Orozco",
      "Carlos Orozco Romero",
      "Sir William Orpen",
      "Pedro Orrente",
      "Lelio Orsi",
      "Francisco Pradilla Ortiz",
      "Ortolano Ferrarese",
      "Georgius van Os",
      "Jan van Os",
      "Pieter Gerardus van Os",
      "Alphonse Osbert",
      "Emily Mary Osborn",
      "Walter Frederick Osborne",
      "Alfonso Ossorio",
      "Adriaen van Ostade",
      "Isaack van Ostade",
      "Edmund Henry Osthaus",
      "Anna Ostroumova-Lebedeva",
      "Alejandro Otero",
      "Paul Otero",
      "Pierre Jean van der Ouderaa",
      "Jean-Baptiste Oudry",
      "Therese Oulton",
      "Albert van Ouwater",
      "Isaak Ouwater",
      "Jurgen Ovens",
      "Johann Friedrich Overbeck",
      "William Owen",
      "Laura Owens",
      "Amedee Ozenfant",
      "Wolfgang Paalen",
      "Pablo de San Leocadio",
      "Michele Pace",
      "Pacecco de Rosa",
      "Francisco Pacheco",
      "Michael Pacher",
      "Pacino di Bonaguida",
      "Padovanino",
      "Joseph Paelinck",
      "Gregorio Pagani",
      "Edward A. Page",
      "William Page",
      "Giovanni Battista Paggi",
      "Francisco de Palacios",
      "Pelagio Palagi",
      "Antonie Palamedesz.",
      "Palamedes Palamedesz.",
      "Benjamin Palencia",
      "Blinky Palermo",
      "Filippo Palizzi",
      "Palma Giovane",
      "Palma Vecchio",
      "Herbert S. Palmer",
      "Samuel Palmer",
      "Walter Launt Palmer",
      "Marco Palmezzano",
      "The Pan Painter",
      "Pan Tianshou",
      "Pan Yuliang",
      "Jose Pancetti",
      "Giovanni Paolo Pannini",
      "Giulio Paolini",
      "Pietro Paolini",
      "Paolo di Giovanni Fei",
      "Paolo Fiammingo",
      "Paolo Veneziano",
      "Georgie Papageorge",
      "Dominique Louis Papety",
      "Bernardo Parentino",
      "Luis Paret y Alcazar",
      "David Park",
      "Lawton Parker",
      "Michael Parkes",
      "Parmigianino",
      "Etienne Parrocel",
      "Joseph Parrocel",
      "William Parrott",
      "William Pars",
      "Alfred Parsons",
      "Betty Parsons",
      "Charles Parsons",
      "Paul Parsons",
      "Arthur Parton",
      "Nehemiah Partridge",
      "Pino Pascali",
      "Edward Paschke",
      "Jules Pascin",
      "Lorenzo Pasinelli",
      "Alberto Pasini",
      "Victor Pasmore",
      "Giuseppe Passeri",
      "Bartolomeo Passerotti",
      "Leonid Pasternak",
      "Laszlo Pataky",
      "Thomas Patch",
      "Pierre Patel",
      "Jean-Baptiste Joseph Pater",
      "Joachim Patinir",
      "Sir Joseph Noel Paton",
      "Cesar Pattein",
      "Christopher Paudiss",
      "Joseph Paul",
      "Edgar S. Paxson",
      "Ethel Paxson",
      "William McGregor Paxton",
      "Edgar Alwin Payne",
      "William Payne",
      "Ralph Peacock",
      "Robert Peake",
      "Anna Claypoole Peale",
      "Charles Willson Peale",
      "Harriet Cany Peale",
      "James Peale",
      "Margaretta Angelica Peale",
      "Mary Peale",
      "Raphaelle Peale",
      "Rembrandt Peale",
      "Rubens Peale",
      "Sarah Miriam Peale",
      "Titian Peale",
      "Charles Sprague Pearce",
      "Philip Pearlstein",
      "John Pearson",
      "Marguerite Stuber Pearson",
      "Max Pechstein",
      "Paul Peel",
      "Clara Peeters",
      "Bonaventura Peeters I",
      "Waldo Peirce",
      "Ella Ferris Pell",
      "Alfred Pellan",
      "Honore Pellegrin",
      "Giovanni Antonio Pellegrini",
      "Giuseppe Pellizza da Volpedo",
      "Leon-Germain Pelouse",
      "Sophie Pemberton",
      "A.R. Penck",
      "Georg Pencz",
      "Guy Pene du Bois",
      "Giovan Francesco Penni",
      "Bruce Pennington",
      "Harper Pennington",
      "Edward Penny",
      "Albert-Joseph Penot",
      "Sir Roland Penrose",
      "Pensionante del Saraceni",
      "Ernie Pepion",
      "Samuel John Peploe",
      "John Perceval",
      "Lady Susan Elizabeth Percy",
      "Antonio de Pereda",
      "William Perehudoff",
      "I. Rice Pereira",
      "Alexis Nicolas Perignon I",
      "Perino del Vaga",
      "Rae Perlin",
      "Constant Permeke",
      "Vasily Perov",
      "Jean Perreal",
      "Francois Perrier",
      "Jean-Baptiste Perronneau",
      "Enoch Wood Perry",
      "Lilla Cabot Perry",
      "Charles E. Perugini",
      "Pietro Perugino",
      "Baldassare Peruzzi",
      "Pesellino",
      "Antoine Pesne",
      "Wenzel Peter",
      "Gabor Peterdi",
      "Jacob Peterson",
      "Jane Peterson",
      "Abraham Pether",
      "Henry Pether",
      "William Pether",
      "Edmond Petitjean",
      "Hippolyte Petitjean",
      "John Frederick Peto",
      "Gheorghe Petrascu",
      "Giuseppe Antonio Petrini",
      "Kuzma Petrov-Vodkin",
      "August Xaver Karl Pettenkofen",
      "Franz Xaver Petter",
      "John Pettie",
      "Emilio Pettoruti",
      "Pierre Peyron",
      "Elizabeth Peyton",
      "Maximilian Pfeiler",
      "Franz Pforr",
      "Ellen Phelan",
      "Phiale Painter",
      "John Phillip",
      "Bert Greer Phillips",
      "Peter Phillips",
      "Richard Phillips",
      "Thomas Phillips",
      "Tom Phillips",
      "Walter J. Phillips",
      "Richard Phillips 1681-1741",
      "The Phrynos Painter",
      "Giovanni Batista Piazetta",
      "Callisto Piazza",
      "Martino Piazza",
      "Francis Picabia",
      "Bernard Picart",
      "Pablo Picasso",
      "Nicolaes Eliasz. Pickenoy",
      "Frederick Richard Pickersgill",
      "Henry William Pickersgill",
      "William Lamb Picknell",
      "Francois-Edouard Picot",
      "Piero della Francesca",
      "Piero di Cosimo",
      "Jean-Baptiste Marie Pierre",
      "Fernand Piet",
      "Pieter Pietersz the Elder",
      "Pieter Pietersz the Younger",
      "Pietro da Cortona",
      "Pietro da Rimini",
      "Pietro degli Ingannati",
      "Pietro di Giovanni d\'Ambrogio",
      "Ludovic Piette",
      "Simone Pignoni",
      "Jean Baptiste Pillement",
      "Carl Gustaf Pilo",
      "Karl Theodor von Piloty",
      "Isidore Pils",
      "Howardena Pindell",
      "Robert Edge Pine",
      "Jose Pineda",
      "Bartolomeo Pinelli",
      "Pinturicchio",
      "Domenico Piola",
      "John Piper",
      "Rose Piper",
      "Fausto Pirandello",
      "Pisanello",
      "Nino Pisano",
      "Camille Pissarro",
      "Lucien Pissarro",
      "Michelangelo Pistoletto",
      "Lari Pittman",
      "Giovanni Battista Pittoni",
      "Armando Pizzinato",
      "Antoine Plamondon",
      "Johann Georg Platzer",
      "Ogden Pleissner",
      "Joseph Plepp",
      "Hans Pleydenwurff",
      "Isaac Pocock",
      "Nicholas Pocock",
      "Wladyslaw Podkowinski",
      "Egbert van der Poel",
      "Cornelis van Poelenburgh",
      "Charles Poerson",
      "Armand Point",
      "Jan Polack",
      "Vasiliy Polenov",
      "Serge Poliakoff",
      "Polidoro Lanzani",
      "Charles Peale Polk",
      "Antonio Pollaiolo",
      "Piero Pollaiolo",
      "James Pollard",
      "Robert Pollard",
      "The Pollard Limner",
      "Jackson Pollock",
      "Polygnotos",
      "Francisco Pons Arnau",
      "Pontormo",
      "Abram Poole",
      "Paul Falconer Poole",
      "Lawrence Poons",
      "Willem de Poorter",
      "Rien Poortvliet",
      "Alexander Pope",
      "Liubov Popova",
      "Il Poppi",
      "Jan Porcellis",
      "Il Pordenone",
      "Giuseppe Porta",
      "Jacques Andre Portail",
      "Fairfield Porter",
      "Sir Robert Ker Porter",
      "Candido Portinari",
      "Frans Post",
      "Hendrick Gerritsz. Pot",
      "Bernard Pothast",
      "Paulus Potter",
      "Edward Henry Potthast",
      "Jean Pougny",
      "Pieter Pourbus",
      "Frans Pourbus the Elder",
      "Frans Pourbus the Younger",
      "Richard Pousette-Dart",
      "Nicolas Poussin",
      "Joseph Powell",
      "Asahel Powers",
      "Marion Powers",
      "Jean Poyet",
      "Sir Edward Poynter",
      "Andrea Pozzo",
      "Enrico Prampolini",
      "Christopher Pratt",
      "Frances Pratt",
      "Mary Pratt",
      "Matthew Pratt",
      "Ambrogio de Predis",
      "Friedrich Preller the Elder",
      "Charles Prendergast",
      "Maurice Prendergast",
      "Levi Wells Prentice",
      "Gregorio Prestopino",
      "Mattia Preti",
      "Gaetano Previati",
      "Andrea Previtali",
      "Amedeo Preziosi",
      "Francesco Primaticcio",
      "Richard Prince",
      "J. Pringle",
      "John Quinton Pringle",
      "Valentine Cameron Prinsep",
      "Scott Prior",
      "Edward Pritchett",
      "Giulio Cesare Procaccini",
      "Ercole Procaccini il Giovane",
      "Dod Procter",
      "Ernest Procter",
      "Samuel Prout",
      "Jan Provost",
      "Pierre-Paul Prud\'hon",
      "Pedro Pruna",
      "Witold Pruszkowski",
      "Puccio di Simone",
      "Susan Puelz",
      "Antonio Puga",
      "Pierre Puget",
      "Ferdinand du Puigaudeau",
      "Domenico Puligo",
      "Scipione Pulzone",
      "Hans Purrmann",
      "Hovsep Pushman",
      "Hanson D. Puthuff",
      "Pierre Puvis de Chavannes",
      "Jean Puy",
      "Aaron Pyle",
      "Adam Pynacker",
      "Jacob Pynas",
      "Jan Pynas",
      "James Baker Pyne",
      "William Henry Pyne",
      "Qi Baishi",
      "Qian Xuan",
      "Gao Qipei",
      "Martin Ferdinand Quadal",
      "Giacomo Quarenghi",
      "Enguerrand Quarton",
      "Pieter Jansz Quast",
      "Erasmus Quellinus",
      "Francois Quesnel",
      "John Quidor",
      "Fiona Rae",
      "Henrietta Rae",
      "Sir Henry Raeburn",
      "Joseph Raffael",
      "Jean-Francois Raffaelli",
      "Raffaellino del Garbo",
      "Denis Auguste Marie Raffet",
      "Charles Rain",
      "Arnulf Rainer",
      "John Ramage",
      "Carlo Antonio Rambaldi",
      "Giovan Battista Ramenghi",
      "Christobal Ramirez de Arellano",
      "Alfredo Ramos Martinez",
      "Allan Ramsay",
      "Milne Ramsey",
      "A.M. Randall",
      "Henry Ward Ranger",
      "Jerry Rankin",
      "William Tylee Ranney",
      "Paul Ranson",
      "Jean Raoux",
      "Raphael",
      "Joseph Raphael",
      "Mary F. Raphael",
      "Henry Raschen",
      "Jorg Ratgeb",
      "Abraham Rattner",
      "Neo Rauch",
      "Roger Raveel",
      "Jan van Ravesteyn",
      "Francois-Auguste Ravier",
      "Eric Ravilious",
      "Omar Rayo",
      "Martial Raysse",
      "Sayed Haider Raza",
      "David Charles Read",
      "James B. Read",
      "Thomas Buchanan Read",
      "Carducius P. Ream",
      "Biagio Rebecca",
      "Giuseppe Recco",
      "Kevin Red Star",
      "Edward Willis Redfield",
      "Richard Redgrave",
      "Granville Redmond",
      "Odilon Redon",
      "Pierre Joseph Redoute",
      "Anne Redpath",
      "David Reed",
      "Robert Reed",
      "Anton Refregier",
      "John Register",
      "Baron Jean Baptiste Regnault",
      "Henri Regnault",
      "Nicolas Regnier",
      "Paula Rego",
      "Hans Reichel",
      "Marx Reichlich",
      "George A. Reid",
      "John Robertson Reid",
      "Robert Reid",
      "Charles Reiffel",
      "George Philip Reinagle",
      "Philip Reinagle",
      "Ramsay Richard Reinagle",
      "Ad Reinhardt",
      "Philip Reisman",
      "Winold Reiss",
      "Joan Reixach",
      "Rembrandt van Rijn",
      "Frederic Remington",
      "Ren Xiong",
      "Ren Yi",
      "Guido Reni",
      "Pierre-Auguste Renoir",
      "Ilya Repin",
      "Paul Resika",
      "Milton Resnick",
      "Jean Restout",
      "Jean-Bernard Restout",
      "Alfred Rethel",
      "Istvan Reti",
      "Pierre-Henri Revoil",
      "Marinus van Reymerswaele",
      "Pierre Reymond",
      "Grant Reynard",
      "Sir Joshua Reynolds",
      "Samuel William Reynolds Jr.",
      "Peter John Van Reysschoot",
      "Henry Maynell Rheam",
      "Francisco Ribalta",
      "Jusepe de Ribera",
      "Augustin Theodule Ribot",
      "Louis-Gustave Ricard",
      "Marco Ricci",
      "Sebastiano Ricci",
      "Alfred William Rich",
      "Ceri Richards",
      "Frances Richards",
      "John Inigo Richards",
      "Thomas Addison Richards",
      "William Trost Richards",
      "William Richardson",
      "Jonathan Richardson I",
      "Thomas Miles Richardson Jr.",
      "Agnes Millen Richmond",
      "George Richmond",
      "Sir William Blake Richmond",
      "Adrian Ludwig Richter",
      "Giovanni Richter",
      "Charles de Sousy Ricketts",
      "Martin Rico y Ortega",
      "Arthur Grover Rider",
      "Tilman Riemenschneider",
      "Henri-Francois Riesener",
      "Hyacinthe Rigaud",
      "John Francis Rigaud",
      "Robert Riggs",
      "Bridget Riley",
      "John Riley",
      "William Rimmer",
      "Peter Rindisbacher",
      "L.A. Ring",
      "Pieter de Ring",
      "Ludger tom Ring the Younger",
      "Jean Paul Riopelle",
      "Aiden Lassell Ripley",
      "Jozsef Rippl-Ronai",
      "William B. Ritchie",
      "Louis Ritman",
      "Andreas Ritzos",
      "Antoine Rivalz",
      "Diego Rivera",
      "Larry Rivers",
      "Briton Riviere",
      "Jean Andre Rixens",
      "Hubert Robert",
      "Louis-Leopold Robert",
      "Joseph-Nicolas Robert-Fleury",
      "Tony Robert-Fleury",
      "David Roberts",
      "Goodridge Roberts",
      "Tom Roberts",
      "William Roberts",
      "Archibald Robertson",
      "Charles Robertson",
      "Christina Robertson",
      "Sarah Robertson",
      "Jean-Baptiste Robie",
      "F. Cayley Robinson",
      "Theodore Robinson",
      "William Robinson",
      "George Fennel Robson",
      "Domenico Robusti",
      "Marietta Robusti",
      "Michele Rocca",
      "Georges Antoine Rochegrosse",
      "Charles Rochussen",
      "Dorothea Rockburne",
      "Alexander Rodchenko",
      "Graciela Rodo-Boulanger",
      "Manuel Rodriguez Lozano",
      "Willem Roelofs",
      "Nicholas Roerich",
      "Severin Roesen",
      "Roelant Roghman",
      "Christian Rohlfs",
      "Fedor Rokotov",
      "Anton Romako",
      "Giovanni Francesco Romanelli",
      "Girolamo Romanino",
      "Antoniazzo Romano",
      "Clare Romano",
      "Gillis Rombouts",
      "Salomon Rombouts",
      "Theodore Rombouts",
      "Julio Romero de Torres",
      "George Romney",
      "Cristoforo Roncalli",
      "Frederick Rondel",
      "Henriette Ronner-Knip",
      "Thomas Matthews Rooke",
      "Michael Angelo Rooker",
      "Johan Heinrich Roos",
      "Philipp Peter Roos",
      "Richard Roper",
      "George Ropes Jr.",
      "Camille Roqueplan",
      "Joseph Roques",
      "Martinus Rorbye",
      "Salvator Rosa",
      "Ottone Rosai",
      "Eduardo Rosales",
      "Ruben Rosas",
      "Giulio Rosati",
      "Guy Rose",
      "Knut Rose",
      "Isaac Rosenberg",
      "Toby Rosenthal",
      "Nagasawa Rosetsu",
      "Alexander Roslin",
      "Seymour Rosofsky",
      "Leonard Rosoman",
      "Sir William Charles Ross",
      "Cosimo Rosselli",
      "Matteo Rosselli",
      "Dante Gabriel Rossetti",
      "Thomas Prichard Rossiter",
      "Rosso Fiorentino",
      "Theodore Roszak",
      "Pietro Rotari",
      "Mimmo Rotella",
      "Susan Rothenberg",
      "Michael Rothenstein",
      "Sir William Rothenstein",
      "Peter Frederick Rothermel",
      "Mark Rothko",
      "Hans Rottenhammer",
      "Carl Rottmann",
      "Johann Michael Rottmayr",
      "Georges Rouault",
      "Georges Rouget",
      "Henri Rousseau",
      "Henri-Emilien Rousseau",
      "Philippe Rousseau",
      "Theodore Rousseau",
      "Jean-Simeon Rousseau de la Rottiere",
      "Ker Xavier Roussel",
      "Theodore Roussel",
      "Ange-Joseph Antoine Roux",
      "Francois Geoffroi Roux",
      "Francois Joseph Frederic Roux",
      "Louis Roux",
      "Joseph Victor Roux-Champion",
      "Sandra Rowe",
      "Kenneth Rowntree",
      "Ferdinand Roybet",
      "Willem Frederik van Royen",
      "Luis Royo",
      "Olga Rozanova",
      "Peter Paul Rubens",
      "Reuven Rubin",
      "Andrei Rublev",
      "Sophie Rude",
      "Juan Mauricio Rugendas",
      "Georg Philipp Rugendas I",
      "Jacob van Ruisdael",
      "Antonio M. Ruiz",
      "Ralph Rumney",
      "Alexander Runciman",
      "Philippe Otto Runge",
      "Carl Clemens Moritz Rungius",
      "Giovanni Battista Ruoppolo",
      "Olive Rush",
      "Santiago Rusinol",
      "John Ruskin",
      "Charles M. Russell",
      "John Russell",
      "Morgan Russell",
      "Alexander Russo",
      "Luigi Russolo",
      "Carl Borromaus Andreas Ruthart",
      "Rachel Ruysch",
      "Salomon van Ruysdael",
      "Andrey Ryabushkin",
      "Martin Ryckaert",
      "David Ryckaert the Younger",
      "The Rycroft Painter",
      "Albert Pinkham Ryder",
      "Chauncey F. Ryder",
      "Robert Ryman",
      "Theo van Rysselberghe",
      "Andrea Sacchi",
      "Pier Francesco Sacchi",
      "Lambert Sachs",
      "Aegidius Sadeler II",
      "Valerius de Saedeleer",
      "Pieter Jansz. Saenredam",
      "Bernard Safran",
      "Cornelis Saftleven",
      "Herman Saftleven the Younger",
      "Kay Sage",
      "Peter Winchell Sager",
      "Saint Cecilia Master",
      "Simon Renard de Saint-Andre",
      "Gabriel Jacques de Saint-Aubin",
      "Simon Saint-Jean",
      "Charles-Balthazar-Julien Fevret de Saint-Memin",
      "Niki de Saint-Phalle",
      "Sakai Hoitsu",
      "Raden Sarief Bastaman Saleh",
      "Ventura Salimbeni",
      "Tommaso Salini",
      "David Salle",
      "Charles Sallee",
      "Robert Salmon",
      "John Salt",
      "William Salter",
      "Mariano Salvador Maella",
      "Francesco Salviati",
      "Orazio Samacchini",
      "Paul Starrett Sample",
      "Abel Sanchez",
      "Pedro Sanchez",
      "Tomas Sanchez",
      "Alonso Sanchez Coello",
      "Juan Sanchez Cotan",
      "Paul Sandby",
      "Ann Sanders",
      "Joachim von Sandrart",
      "Emma Sandys",
      "Frederick Sandys",
      "Sano di Pietro",
      "Lorenzo di Alessandro da Sanseverino",
      "James Sant",
      "Girolamo Santacroce",
      "Jean-Baptiste Santerre",
      "Giovanni Santi",
      "Santi di Tito",
      "Giuseppe Santomaso",
      "Dirck van Santvoort",
      "Frank Sapousek",
      "Allen Sapp",
      "Carlo Saraceni",
      "Henry Sargent",
      "John Singer Sargent",
      "John Nost Sartorius",
      "Sassetta",
      "Sassoferrato",
      "Gary Saunders",
      "Raymond Saunders",
      "Antonio Saura Atares",
      "Piat-Joseph Sauvage",
      "Edward Savage",
      "Roelandt Savery",
      "Jenny Saville",
      "Alberto Savinio",
      "Konstantin Savitsky",
      "Giovanni Girolamo Savoldo",
      "Alexey Savrasov",
      "Helen Sawyer",
      "Rolph Scarlett",
      "Salvatore Scarpitta",
      "Scarsellino",
      "Christian Schad",
      "Wilhelm von Schadow",
      "Carl Schaefer",
      "Henry Thomas Schafer",
      "Martin Schaffner",
      "Godfried Schalcken",
      "Morton Livingston Schamberg",
      "Louis Schanker",
      "Kenny Scharf",
      "Hans Leonhard Schaufelein",
      "Bartolomeo Schedoni",
      "Ary Scheffer",
      "Lo Scheggia",
      "Hugo Scheiber",
      "Andreas Schelfhout",
      "Andrea Schiavone",
      "Egon Schiele",
      "Emil Jakob Schindler",
      "Karl Friedrich Schinkel",
      "Helene Schjerfbeck",
      "Oskar Schlemmer",
      "Martin Johann Schmidt",
      "Karl Schmidt-Rottluff",
      "Julian Schnabel",
      "Bernhard Schneider",
      "Victor Schnetz",
      "Julius Schnorr von Carolsfeld",
      "Fritz Scholder",
      "Otto Scholderer",
      "Johann Heinrich Schonfeld",
      "Martin Schongauer",
      "Ben Schonzeit",
      "Floris van Schooten",
      "Henri-Frederic Schopin",
      "Julius Schrader",
      "Adolf Schreyer",
      "Charles Schreyvogel",
      "Georg Schrimpf",
      "Claude-Emile Schuffenecker",
      "Daniel Schultz",
      "Emil Schumacher",
      "William Schumacher",
      "Jacob van Schuppen",
      "Christian Schussele",
      "The Schuyler Limner",
      "Carlos Schwabe",
      "Heinrich Wilhelm Schweickhardt",
      "Conrad Schwiering",
      "Moritz Von Schwind",
      "Kurt Schwitters",
      "Toti Scialoja",
      "Giuseppe Scolari",
      "Jan van Scorel",
      "Sinibaldo Scorza",
      "Bill Scott",
      "Frances Scott",
      "Louise Scott",
      "Samuel Scott",
      "William Scott",
      "William Bell Scott",
      "William Edouard Scott",
      "Sean Scully",
      "Edward Seago",
      "Julian R. Seavey",
      "Sebastiano del Piombo",
      "Charles Sebree",
      "Hippolyte Victor Valentin Sebron",
      "Thomas Seddon",
      "Arthur Segal",
      "Lasar Segall",
      "Giovanni Segantini",
      "Daniel Seghers",
      "Gerard Seghers",
      "Hercules Seghers",
      "Segna di Buonaventure",
      "Armand Seguin",
      "Paul Seignac",
      "Jacob Seisenegger",
      "Kamisaka Sekka",
      "Kurt Seligmann",
      "Charles Sellier",
      "Henry Courtney Selous",
      "C.F. Senior",
      "Alexandre Seon",
      "Zinaida Serebriakova",
      "Ismael de la Serna",
      "Giovanni Serodine",
      "Valentin Aleksandrovich Serov",
      "Dominic Serres",
      "John Thomas Serres",
      "Henri Serrur",
      "Paul Serusier",
      "Sesshu Toyo",
      "Sesson Shukei",
      "Georges Seurat",
      "Gino Severini",
      "Joseph Severn",
      "Leopold Seyffert",
      "Julius Seyler",
      "James Seymour",
      "Sha Qi",
      "Jack Shadbolt",
      "Abby Shahn",
      "Ben Shahn",
      "Charles Haslewood Shannon",
      "Sir James Jebusa Shannon",
      "Joseph Henry Sharp",
      "Rolinda Sharples",
      "Aaron Draper Shattuck",
      "Jim Shaw",
      "John Byam Shaw",
      "Joshua Shaw",
      "William Shayer Sr.",
      "Sil\'vestr Feodosievich Shchedrin",
      "Sir Martin Archer Shee",
      "Charles Sheeler",
      "Millard Sheets",
      "Isaac Sheffield",
      "Lila Norma Shelby",
      "Helen Parsons Shepherd",
      "Reginald Shepherd",
      "Dwight Shepler",
      "Warren W. Sheppard",
      "The Sherman Limner",
      "Ron Sherr",
      "Alan Shields",
      "Shikibu Terutada",
      "Everett Shinn",
      "Walter Shirlaw",
      "Ivan Shishkin",
      "Shitao",
      "Ron Shuebrook",
      "Nell Choate Shute",
      "Jan Siberechts",
      "Bernard Sickert",
      "Walter Richard Sickert",
      "Elizabeth Eleanor Siddal",
      "Henryk Siemiradzki",
      "Paul Sierra",
      "Hollis Sigler",
      "Paul Signac",
      "Luca Signorelli",
      "Telemaco Signorini",
      "Adam Silo",
      "Francis A. Silva",
      "Josef Sima",
      "Hugo Simberg",
      "Lucien Simon",
      "T. Frantisek Simon",
      "Simone dei Crocifissi",
      "Francesco Simonini",
      "John Simpson",
      "William Simpson",
      "Charles Sims",
      "Clyde Singer",
      "Gustave Singier",
      "Henry Singleton",
      "Geertgen Tot Sint-Jans",
      "David Alfaro Siqueiros",
      "Elisabetta Sirani",
      "Mario Sironi",
      "Alfred Sisley",
      "The Sisyphus Painter",
      "Michel Sittow",
      "Jonathan Skelton",
      "Stephan D. Skillet",
      "John Falconar Slater",
      "Stephen Slaughter",
      "Fedor Slavyansky",
      "Sylvia Sleigh",
      "Max Slevogt",
      "Pieter Cornelisz. van Slingelandt",
      "Helen Farr Sloan",
      "John Sloan",
      "Junius R. Sloan",
      "Harald Slott-Moller",
      "Jan Sluijters",
      "Jean Paul Slusser",
      "Jeffrey Smart",
      "Gustave de Smet",
      "Leon de Smet",
      "James Smetham",
      "John Smibert",
      "George Henry Smillie",
      "Robert Smirke",
      "Dana Smith",
      "Edith Agnes Smith",
      "Gary Ernest Smith",
      "Grace Cossington Smith",
      "Henry Pember Smith",
      "Jack Smith",
      "Jaune Quick-To-See Smith",
      "John \'Warwick\' Smith",
      "John Christopher Smith",
      "John Raphael Smith",
      "Joseph B. Smith",
      "Leon Polk Smith",
      "Lewis Smith",
      "Richard Smith",
      "Sir Matthew Smith",
      "Thomas Smith",
      "Tucker Smith",
      "Walter Granville Smith",
      "Xanthus Russell Smith",
      "Lee N. Smith III",
      "Collier Smithers",
      "Jacob Smits",
      "Lionel Percy Smythe",
      "Pieter Snayers",
      "Amanda Snyder",
      "Joan Snyder",
      "Frans Snyders",
      "Il Sodoma",
      "Gerard Soest",
      "Giovanni Antonio Sogliani",
      "Harald Sohlberg",
      "Andrei Sokolov",
      "Jose Gutierrez Solana",
      "Xul Solar",
      "Andrea Solario",
      "Atanasio Soldati",
      "Andrea Soldi",
      "Francesco Solimena",
      "Abraham Solomon",
      "Rebecca Solomon",
      "Simeon Solomon",
      "Solomon Joseph Solomon",
      "Fred Somers",
      "William Sommer",
      "Daniel Somogyi",
      "Konstantin Somov",
      "Joris van Son",
      "William Louis Sonntag",
      "Giovanni Sons",
      "Isaac Soreau",
      "Arne Haugen Sorensen",
      "Hendrik Martensz Sorgh",
      "Juan Soriano",
      "Steven Sorman",
      "Grigory Soroka",
      "Joaquin Sorolla y Bastida",
      "Mori Sosen",
      "Jesus-Rafael Soto",
      "John Souch",
      "Charles Soulacroix",
      "Frederic Soulacroix",
      "Pierre Soulages",
      "Joseph Edward Southall",
      "Chaim Soutine",
      "Pieter Soutman",
      "F.N. Souza",
      "Isaac Soyer",
      "Moses Soyer",
      "Raphael Soyer",
      "Lionello Spada",
      "Armando Spadini",
      "Gerard van Spaendonck",
      "Marie Haughton Spaeth",
      "Lo Spagna",
      "Hans Speckaert",
      "Harold Speed",
      "Eugene Speicher",
      "Thomas Ralph Spence",
      "Charles Spencelayh",
      "Gilbert Spencer",
      "Lilly Martin Spencer",
      "Niles Spencer",
      "Robert Spencer",
      "Stanley Spencer",
      "Thomas Spencer",
      "Jeronimus Spengler",
      "Nancy Spero",
      "Johann Spilberg",
      "Lino Enea Spilimbergo",
      "Leon Spilliaert",
      "Jacob Spin",
      "Parri Spinelli",
      "Spinello Aretino",
      "Carl Spitzweg",
      "Daniel Spoerri",
      "Spoilum",
      "Bartholomeus Spranger",
      "Cornelis Springer",
      "Benton Murdoch Spruance",
      "Francesco Squarcione",
      "Gerald Squires",
      "Theodoros Stamos",
      "Julian Stanczak",
      "Clarkson Frederick Stanfield",
      "John Roddam Spencer Stanhope",
      "Penrhyn Stanlaws",
      "Abram Ross Stanley",
      "John Mix Stanley",
      "Massimo Stanzione",
      "James Stark",
      "Otto Stark",
      "Gherardo Starnina",
      "Jan Adriaensz. van Staveren",
      "Junius Brutus Stearns",
      "Paul Steck",
      "Theodore Clement Steele",
      "Jan Steen",
      "Harmen Steenwijck",
      "Hendrik van Steenwyck the Younger",
      "Philip Wilson Steer",
      "Stefano da Verona",
      "Bernard J. Steffen",
      "Edward J. Steichen",
      "Theophile Alexandre Steinlen",
      "Pat Steir",
      "Frank Stella",
      "Jacques de Stella",
      "Joseph Stella",
      "Varvara Stepanova",
      "Frederic George Stephens",
      "Thomas Edgar Stephens",
      "Maurice Sterne",
      "Albert Edward Sterner",
      "Florine Stettheimer",
      "May Stevens",
      "W. Lester Stevens",
      "Alfred Stevens 1817-1875",
      "Alfred Stevens 1823-1906",
      "Joseph Steward",
      "Thomas Stewardson",
      "John P. Stewart",
      "Julius L. Stewart",
      "Joseph Stieler",
      "Clyfford Still",
      "Marie Spartali Stillman",
      "Joseph Whiting Stock",
      "Vrancke van der Stockt",
      "Bill Stockton",
      "Marianne Stokes",
      "Adrian Stokes 1854-1935",
      "Adrian Stokes 1902-1972",
      "Leopold von Stoll",
      "Matthias Stomer",
      "Anne Belle Stone",
      "Marcus Stone",
      "Dirck Stoop",
      "Abraham Storck",
      "Jacob Storck",
      "Frances Hudson Storrs",
      "George H. Story",
      "Julian Story",
      "Sebastien Stoskopff",
      "Thomas Stothard",
      "Edward Stott",
      "D.G. Stouter",
      "Giovanni Stradone",
      "Jan van der Straet",
      "William Strang",
      "Juriaen van Streeck",
      "Arthur Streeton",
      "Bernhard Strigel",
      "Jacob van Strij",
      "August Strindberg",
      "Elizabeth Strong",
      "Bernardo Strozzi",
      "Zanobi Strozzi",
      "Peter Strub the Younger",
      "John Melhuish Strudwick",
      "William Strutt",
      "Gilbert Stuart",
      "George Stubbs",
      "Nikolaus Gottfried Stuber",
      "Franz von Stuck",
      "Su Hanchen",
      "Pierre Subleyras",
      "Anne Sudworth",
      "Alberto Sughi",
      "Thomas Sully",
      "Donald Sultan",
      "Sultan Muhammad",
      "Sunqua",
      "Vasily Surikov",
      "Leopold Survage",
      "Justus Sustermans",
      "Lambert Sustris",
      "Elizabeth Leveson-Gower, Countess of Sutherland",
      "Graham Sutherland",
      "Carol Sutton",
      "Joseph-Benoit Suvee",
      "Pavel Petrovich Svinin",
      "Francis Swaine",
      "John Macallan Swan",
      "Herman van Swanevelt",
      "Michiel Sweerts",
      "The Swing Painter",
      "Annie Louise Swynnerton",
      "The Syleus Painter",
      "William Robert Symonds",
      "George Gardner Symons",
      "Syriskos",
      "Bertalan Szekely",
      "Pal Szinyei Merse",
      "Augustus Vincent Tack",
      "Taddeo di Bartolo",
      "Sophie Taeuber-Arp",
      "Gerald Tailfeathers",
      "Jean-Joseph Taillasson",
      "Arthur Fitzwilliam Tait",
      "Peter Takal",
      "Pierre Tal-Coat",
      "Enea Talpino",
      "Rufino Tamayo",
      "Takao Tanabe",
      "Tang Yin",
      "Yves Tanguy",
      "Henry Ossawa Tanner",
      "J.G. Tanner",
      "Dorothea Tanning",
      "Mark Tansey",
      "Tanzio da Varallo",
      "Antoni Tapies",
      "Jose Tapiro Baro",
      "Hughes Taraval",
      "Louis Gustave Taraval",
      "Edmund Charles Tarbell",
      "Jean-Charles Tardieu",
      "Octave Tassaert",
      "Jean Tassel",
      "Nicolas-Antoine Taunay",
      "William Taverner",
      "Jules Tavernier",
      "Tawaraya Sotatsu",
      "Albert Chevallier Tayler",
      "John W. Taylor",
      "Leonard Campbell Taylor",
      "Pavel Tchelitchew",
      "Abraham van den Tempel",
      "Antonio Tempesta",
      "Robert Templeton",
      "Mari ten Kate",
      "Jan Tengnagel",
      "David Teniers the Younger",
      "Tenyu Shokei",
      "Masami Teraoka",
      "Gerard Terborch",
      "Hendrick Terbrugghen",
      "Karl Emil Termohlen",
      "Howard Terpning",
      "Mauro Antonio Tesi",
      "Pietro Testa",
      "D.A. Teupken Sr.",
      "Mor Than",
      "David Thauberger",
      "Frits Thaulow",
      "Abbott Handerson Thayer",
      "Theophanes the Greek",
      "Anna Dorothea Therbusch",
      "Jeremiah Theus",
      "Jan Philips van Thielen",
      "Anthony Thieme",
      "Hans Thoma",
      "Alma Thomas",
      "Benjamin Thompson",
      "Bob Thompson",
      "Richard Earl Thompson",
      "Wordsworth Thompson",
      "Tom Thomson",
      "William Thon",
      "Archibald Thorburn",
      "Sir James Thornhill",
      "Theodoor van Thulden",
      "Tian Shiguang",
      "Alessandro Tiarini",
      "Pellegrino Tibaldi",
      "Adolph Tidemand",
      "Giovanni Battista Tiepolo",
      "Giovanni Domenico Tiepolo",
      "Peter Tillemans",
      "Paul-Prosper Tillier",
      "David Tindle",
      "Tiberio Tinelli",
      "Tinqua",
      "Tintoretto",
      "Johann Heinrich Wilhelm Tischbein",
      "Johann-Friedrich-August Tischbein",
      "James Tissot",
      "Titian",
      "Mark Tobey",
      "Louis Tocque",
      "Lodewyk Toeput",
      "Jose de Togores i Llach",
      "Francisco Toledo",
      "Count Feodor Tolstoy",
      "Fred Tomaselli",
      "Fiorenzo Tomea",
      "William Tomkins",
      "Tommaso da Modena",
      "Henry Tonks",
      "George Tooker",
      "Jacob Toorenvliet",
      "Charley Toorop",
      "Jan Toorop",
      "Morris Topchevsky",
      "James Torlakson",
      "Helen Torr",
      "Bernardo Torrens",
      "Joaquin Torres-Garcia",
      "Mitsuyoshi Tosa",
      "Giovanni Toscani",
      "Michele Tosini",
      "Henri de Toulouse-Lautrec",
      "Nicolas Tournier",
      "Robert Tournieres",
      "Claude Tousignant",
      "Fernand Toussaint",
      "Harold Town",
      "Francis Towne",
      "Giuliano Traballesi",
      "Francesco Traini",
      "Marion Gray Traver",
      "Gaspare Traversi",
      "Joyce Treiman",
      "Henry Tresham",
      "Jesse Trevino",
      "Francesco Trevisani",
      "Louis Rolland Trinquesse",
      "Luis Tristan de Escamilla",
      "Paul Troger",
      "Francesco Trombadori",
      "Cornelis Troost",
      "Wouter Johannes van Troostwijk",
      "Vasilii Andreevich Tropinin",
      "Paul Desire Trouillebert",
      "Ernest Trova",
      "Francois de Troy",
      "Jean-Francois de Troy",
      "Constant Troyon",
      "Wilhelm Trubner",
      "John Trumbull",
      "Dwight W. Tryon",
      "Kitagawa Tsukimaro",
      "Frederik Tudgay",
      "John Tudgay",
      "Henry Scott Tuke",
      "Sydney Strickland Tully",
      "John Tunnard",
      "Charles Frederick Tunnicliffe",
      "Cosme Tura",
      "Alessandro Turchi",
      "William Turnbull",
      "Charles Turner",
      "Daniel Turner",
      "Helen M. Turner",
      "Joseph Mallord William Turner",
      "William Turner of Oxford",
      "Henry Roland Lancelot Turpin de Crisse",
      "Lancelot-Theodore Turpin de Crisse",
      "Laurits Tuxen",
      "Luc Tuymans",
      "John Henry Twachtman",
      "James Twitty",
      "Cy Twombly",
      "Jack Tworkov",
      "James Gale Tyler",
      "Paolo Uccello",
      "Nadezhda Andreevna Udaltsova",
      "Lucas van Uden",
      "Walter Ufer",
      "Euan Uglow",
      "Ugo Da Carpi",
      "Ugolino di Nerio",
      "Fritz Karl Hermann von Uhde",
      "Ukita Ikkei",
      "Jacob van der Ulft",
      "Charles Frederic Ulrich",
      "Leon Underwood",
      "Thomas Richard Underwood",
      "The Underworld Painter",
      "Unkoku Togan",
      "Lesser Ury",
      "Simon Ushakov",
      "Adriaen van Utrecht",
      "Maurice Utrillo",
      "Thomas Uwins",
      "Moses van Uyttenbroeck",
      "Andrea Vaccaro",
      "Lodewijk de Vadder",
      "Eugene Lawrence Vail",
      "Wallerant Vaillant",
      "Suzanne Valadon",
      "Frederik van Valckenborch",
      "Gillis van Valckenborch",
      "Lucas van Valckenborch",
      "Marten van Valckenborch",
      "Werner van den Valckert",
      "Manolo Valdes",
      "Juan de Valdes Leal",
      "Pierre-Henri de Valenciennes",
      "Dirk van Valkenburg",
      "Hendrik Valkenburg",
      "Anne Vallayer-Coster",
      "Felix Vallotton",
      "Louis Valtat",
      "Joseph Van Aken",
      "Albertus van Beest",
      "Jan Jansz. van de Velde III",
      "Sir Anthony Van Dyck",
      "Vincent van Gogh",
      "Egbert van Heemskerk I",
      "Egbert van Heemskerk II",
      "Egbert van Heemskerk III",
      "Hubertus van Hove",
      "Tim Van Laar",
      "Cesar Van Loo",
      "Louis-Michel van Loo",
      "Beatrice W. Van Ness",
      "Richard van Orley",
      "Theodore Van Soelen",
      "Paul Van Somer",
      "Cornelis van Spaendonck",
      "Abraham van Stry",
      "John Vanderbank",
      "John Vanderlyn",
      "Pieter Vanderlyn",
      "Carle Vanloo",
      "Charles Amedee Philippe Vanloo",
      "Jean-Baptiste Vanmour",
      "Francesco Vanni",
      "Lippo Vanni",
      "Quentin Varin",
      "Cornelius Varley",
      "F.H. Varley",
      "John Varley",
      "Remedios Varo",
      "Victor Vasarely",
      "Giorgio Vasari",
      "Feodor Vasilyev",
      "Viktor Mikhailovich Vasnetsov",
      "Antonio Maria Vassallo",
      "Keith Vaughan",
      "Daniel Vazquez Diaz",
      "Pietro della Vecchia",
      "Vecchietta",
      "Elihu Vedder",
      "Emilio Vedova",
      "Otto van Veen",
      "Nicolaes van Veerendael",
      "Pablita Velarde",
      "Jose Maria Velasco",
      "Diego Velazquez",
      "Adriaen van de Velde",
      "Bram van Velde",
      "Esaias van de Velde",
      "Jan van de Velde II",
      "Willem van de Velde the Elder",
      "Willem van de Velde the Younger",
      "Dirk Vellert",
      "Alexey Venetsianov",
      "Adriaen Pietersz. van de Venne",
      "Marcello Venusti",
      "Cornelis Verbeeck",
      "Pieter Verbeeck",
      "Eugene Verboeckhoven",
      "Harman Verelst",
      "Maria Verelst",
      "Simon Verelst",
      "Vasily Vereshchagin",
      "Tobias Verhaecht",
      "Frans Verhas",
      "Jan Frans Verhas",
      "Jan Hendrik Verheyen",
      "Toon Verhoef",
      "Jan Verkade",
      "Jan Verkolje",
      "Jan Vermeer",
      "Jan Vermeer III",
      "Andries Vermeulen",
      "Jan Vermeyen",
      "Frederick A. Verner",
      "Carle Vernet",
      "Claude-Joseph Vernet",
      "Horace Vernet",
      "Bonifacio Veronese",
      "Paolo Veronese",
      "Andrea del Verrocchio",
      "Hendrick Verschuring",
      "Wouterus Verschuur",
      "Jan Cornelisz. Verspronck",
      "Floris Verster",
      "Renzo Vespignani",
      "Jack Vettriano",
      "Jules Jacques Veyrassat",
      "Claude Viallat",
      "Jehan Georges Vibert",
      "Esteban Vicente",
      "Robert Vickrey",
      "Jan Victors",
      "Maria Elena Vieira da Silva",
      "Joseph Marie Vien",
      "Romas Viesulas",
      "Marie Louise Elisabeth Vigee-Lebrun",
      "Jacopo Vignali",
      "Jean Vignaud",
      "Claude Vignon",
      "Marie-Denise Villers",
      "Jacques Villon",
      "Francois-Andre Vincent",
      "Vincenzo di Catena",
      "David Vinckboons",
      "Vincent Laurensz van der Vinne",
      "Frederic Porter Vinton",
      "Gian Battista Viola",
      "Eliseu Visconti",
      "Ivan Vishnyakov",
      "Vitale da Bologna",
      "Timoteo Viti",
      "Alvise Vivarini",
      "Antonio Vivarini",
      "Bartolomeo Vivarini",
      "Joseph Vivien",
      "Maurice de Vlaminck",
      "Simon de Vlieger",
      "Hendrik Cornelisz van der Vliet",
      "Willem van der Vliet",
      "Ferdinand Voet",
      "Jean-Louis Voille",
      "Pierre-Jacques Volaire",
      "Konstantinos Volanakis",
      "Douglas Volk",
      "F. Usher de Voll",
      "Adolf Friedrich Vollmer",
      "Antoine Vollon",
      "Daniele da Volterra",
      "Il Volterrano",
      "Franz von Defregger",
      "Sir Hubert von Herkomer",
      "Jan Vonck",
      "Robert Vonnoh",
      "Friedrich Vordemberge-Gildewart",
      "Cornelis de Vos",
      "Martin de Vos",
      "Paul de Vos",
      "Simon de Vos",
      "Daniel Vosmaer",
      "Aubin Vouet",
      "Simon Vouet",
      "Bastiaen Vrancx",
      "Hans Vredeman de Vries",
      "Jacobus Vrel",
      "Abraham de Vries",
      "Roelof van Vries",
      "Cornelis Vroom",
      "Hendrick Cornelisz. Vroom",
      "Mikhail Vrubel",
      "Edouard Vuillard",
      "Elmer Wachtel",
      "Marion Kavanaugh Wachtel",
      "Theodore J. Waddell",
      "Edward Wadsworth",
      "Cornelis de Wael",
      "John Wainwright",
      "Emily Burling Waite",
      "Walasse Ting",
      "Ferdinand Georg Waldmuller",
      "Samuel Lovett Waldo",
      "Antonie Waldorp",
      "Samuel Wale",
      "Dame Ethel Walker",
      "Frederick Walker",
      "Horatio Walker",
      "John Walker",
      "William A. Walker",
      "Abraham Walkowitz",
      "William Allen Wall",
      "William Guy Wall",
      "J. Laurie Wallace",
      "Henry Wallis",
      "Goffredo Wals",
      "Martha Walter",
      "Miles Walters",
      "Samuel Walters",
      "Edward Arthur Walton",
      "Henry Walton",
      "Wang Hui",
      "Wang Zhen",
      "Barbara Pratt Wangersky",
      "Gustave Wappers",
      "James Ward",
      "Arthur Wardle",
      "Laura Wheeler Waring",
      "Everett Warner",
      "Jim Warren",
      "Abel Warshawsky",
      "Watanabe Kazan",
      "Watanabe Shiko",
      "John William Waterhouse",
      "Sir Ernest Albert Waterlow",
      "Harry Wilson Watrous",
      "Homer Watson",
      "Alison Watt",
      "Francois-Louis-Joseph Watteau",
      "Jean-Antoine Watteau",
      "Louis-Joseph Watteau",
      "George Frederic Watts",
      "Frederick Judd Waugh",
      "Emile Wauters",
      "Andrew John Henry Way",
      "June Wayne",
      "Robert Weaver",
      "Thomas Weaver",
      "Charles T. Webber",
      "John Webber",
      "Idelle Weber",
      "John Pitman Weber",
      "Max Weber",
      "Paul Weber",
      "Thomas Webster",
      "Edwin Lord Weeks",
      "Jan Baptist Weenix",
      "Jan Weenix II",
      "Jean-Joseph Weerts",
      "John Reinhard Weguelin",
      "Carel Weight",
      "Emilie Sievert Weinberg",
      "John Ferguson Weir",
      "Julian Alden Weir",
      "Robert W. Weir",
      "Franz Edmund Weirotter",
      "Jan Weissenbruch",
      "Johan Hendrik Weissenbruch",
      "Denton Welch",
      "Neil Welliver",
      "Henry Tanworth Wells",
      "Albert Welti",
      "Wen Zhengming",
      "Theodore Wendel",
      "William Wendt",
      "Marianne von Werefkin",
      "Erik Werenskiold",
      "Adriaen van der Werff",
      "Pieter van der Werff",
      "Hans Wertinger",
      "Adolf-Ulrik Wertmuller",
      "Benjamin West",
      "Richard Westall",
      "William Westall",
      "Jacob de Wet",
      "Rogier van der Weyden",
      "Robert R. Whale",
      "Clara Wheatley",
      "Francis Wheatley",
      "Steve Wheeler",
      "Roland Wheelwright",
      "Michael Whelan",
      "James McNeill Whistler",
      "Thomas Whitcombe",
      "Charles Wilbert White",
      "Ethelbert White",
      "Charles White 1773-1794",
      "Brett Whiteley",
      "Jack Whitten",
      "Charles Whittle",
      "Thomas Worthington Whittredge",
      "John Whorf",
      "Jean-Baptiste Joseph Wicar",
      "Charmion von Wiegand",
      "Gustave Adolph Wiegand",
      "Joyce Wieland",
      "Phyllis Wiener",
      "Cornelis Claesz. van Wieringen",
      "Antoine Wiertz",
      "Guy Wiggins",
      "Jessie Wilber",
      "Robert Wilbert",
      "Jan Wildens",
      "John R. Wildman",
      "Irving R. Wiles",
      "Catherine Wiley",
      "William Wiley",
      "Sir David Wilkie",
      "Abraham Willaerts",
      "Adam Willaerts",
      "Pierre-Alexandre Wille",
      "Thomas Willeboirts",
      "Fred Williams",
      "Hugh William Williams",
      "Keith Shaw Williams",
      "Sue Williams",
      "William Williams",
      "Daniel Alexander Williamson",
      "Carel Willink",
      "Michael Lukas Leopold Willmann",
      "William Gorman Wills",
      "Benjamin Wilson",
      "Ellis Wilson",
      "Richard Wilson",
      "William A. Wilson",
      "Charles Wimar",
      "William Lindsay Windus",
      "William Winstanley",
      "Fritz Winter",
      "Franz Xavier Winterhalter",
      "Hermann Winterhalter",
      "Nicolaus Wirt von Wil",
      "Jacob de Wit",
      "Walter Withers",
      "Matthias Withoos",
      "Stanislaw Ignacy Witkiewicz",
      "Jerome Paul Witkin",
      "Emanuel de Witte",
      "Gaspar van Wittel",
      "Conrad Witz",
      "Witold Wojtkiewicz",
      "Edward Wolfe",
      "Artus Wolffort",
      "Michael Wolgemut",
      "John Wollaston",
      "Gert Wollheim",
      "Wols",
      "John Wonnacott",
      "Christopher Wood",
      "Grant Wood",
      "John Wood",
      "Thomas Waterman Wood",
      "Charles Herbert Woodbury",
      "Hale Woodruff",
      "Henry Woods",
      "Richard Caton Woodville",
      "Richard Caton Woodville Jr.",
      "John Wootton",
      "Theodore Wores",
      "Thomas Worlidge",
      "Rik Wouters",
      "Philips Wouwerman",
      "Charles Wrenn",
      "Don Wright",
      "James Henry Wright",
      "John Michael Wright",
      "Joseph Wright of Derby",
      "Mary Wrinch",
      "Joachim Antonisz. Wtewael",
      "Peter Wtewael",
      "Wu Changshi",
      "Wu Guanzhong",
      "Wu Li",
      "Wu Zuoren",
      "Theo Wujcik",
      "Michael Wutky",
      "Alexander Helwig Wyant",
      "Henry Wyatt",
      "Jan Wyck",
      "Thomas Wyck",
      "Andrew Wyeth",
      "Henriette Wyeth",
      "Jamie Wyeth",
      "William Lionel Wyllie",
      "Jan Wynants",
      "Xenophantos",
      "Xia Gui",
      "Xiao Yuncong",
      "Rafael Ximeno y Planes",
      "Xu Beihong",
      "Xu Daoning",
      "Yan Hui",
      "Yan Liben",
      "Fernando Yanez",
      "Yang Shanshen",
      "William Frederick Yeames",
      "Jack B. Yeats",
      "Raymond Yelland",
      "Francois Ykens",
      "William G. Yorke",
      "William Howard Yorke",
      "Yosa Buson",
      "Mahonri Macintosh Young",
      "Stephen Scott Young",
      "Yun Ge",
      "Yun Shouping",
      "Adja Yunkers",
      "Lisa Yuskavage",
      "Lawrence Paul Yuxweluptun",
      "Ossip Zadkine",
      "Bernardino Zaganelli",
      "Francesco Zaganelli",
      "Giuseppe Zais",
      "Eugene Zak",
      "Alfredo Zalce",
      "Eduardo Zamacois y Zabala",
      "Federico Zandomeneghi",
      "Jacopo Zanguidi",
      "Zao Wou-ki",
      "Jose Antonio Zapata y Nadal",
      "Hans Zatzka",
      "Reemy Zaugg",
      "Bernardino Zenale",
      "Karl Zerbe",
      "Shibata Zeshin",
      "Zha Shibiao",
      "Zhang Daqian",
      "Zhang Hong",
      "Zhao Shou",
      "Zhao Zhiqian",
      "Zhu Da",
      "Zhu Qizhan",
      "Felix Ziem",
      "Christian Friedrich Zincke",
      "Alberto Ziveri",
      "Johann Zoffany",
      "Marco Zoppo",
      "Marguerite Thompson Zorach",
      "Anders Zorn",
      "Larry Zox",
      "Francesco Zuccarelli",
      "Federico Zuccaro",
      "Taddeo Zuccaro",
      "Antonio Zucchi",
      "Jacopo Zucchi",
      "Joe Zucker",
      "Francesco Zugno",
      "Ignacio Zuloaga",
      "Francisco de Zurbaran",
      "Juan de Zurbaran",
    ],
    paletteSynonyms: [
      "bicolor",
      "bicolored",
      "bicolors",
      "color",
      "colorable",
      "colorably",
      "colorado",
      "colorant",
      "colorants",
      "coloration",
      "colorations",
      "coloratura",
      "coloraturas",
      "colorblind",
      "colorblindness",
      "colorblindnesses",
      "colorbred",
      "colorectal",
      "colored",
      "coloreds",
      "colorer",
      "colorers",
      "colorfast",
      "colorfastness",
      "colorfastnesses",
      "colorful",
      "colorfully",
      "colorfulness",
      "colorfulnesses",
      "colorific",
      "colorimeter",
      "colorimeters",
      "colorimetric",
      "colorimetrically",
      "colorimetries",
      "colorimetry",
      "coloring",
      "colorings",
      "colorism",
      "colorisms",
      "colorist",
      "coloristic",
      "coloristically",
      "colorists",
      "colorization",
      "colorizations",
      "colorize",
      "colorized",
      "colorizes",
      "colorizing",
      "colorless",
      "colorlessly",
      "colorlessness",
      "colorlessnesses",
      "colorman",
      "colormen",
      "colorpoint",
      "colorpoints",
      "colors",
      "decolor",
      "decolored",
      "decoloring",
      "decolorization",
      "decolorizations",
      "decolorize",
      "decolorized",
      "decolorizer",
      "decolorizers",
      "decolorizes",
      "decolorizing",
      "decolors",
      "discolor",
      "discoloration",
      "discolorations",
      "discolored",
      "discoloring",
      "discolors",
      "miscolor",
      "miscolored",
      "miscoloring",
      "miscolors",
      "multicolor",
      "multicolored",
      "multicolors",
      "noncolor",
      "noncolored",
      "noncolorfast",
      "noncolors",
      "recolor",
      "recolored",
      "recoloring",
      "recolors",
      "tricolor",
      "tricolored",
      "tricolors",
      "uncolored",
      "unicolor",
      "varicolored",
      "watercolor",
      "watercolorist",
      "watercolorists",
      "watercolors",
    ],
    prefsSectionName: "Ray",
    progressUIDelay: 1000,
    rayAddedCompsArray: [],
    rows: [],
    scanRecurse: false,
    scriptName: "Ray Dynamic Color",
    scriptUrl: "http://aescripts.com/ray-dynamic-color",
    scriptVersion: "2.5.10",
    strAdvanced: "Advanced",
    strCancel: "Cancel",
    strCap: "Cap",
    strDefault: "Default",
    strDefaultSelectPalette: "Please select a palette",
    strDismiss: "Turn off error messages",
    strEllipse: "#",
    strEllipseHelpTip: "Enter color number",
    strEnterNumber: "Please enter the color number.",
    strExportAse: "Export ASE",
    strExportAseConfirm:
      "The colors needs to be sent to the aescripts servers to create the .ase file\nAfter processing, a file named:\n\n%1.ase\n\nwill be downloaded via your default browser. No other information besides the colors will be sent.\n\nDo you wish to proceed?",
    strExportAseShort: "Export",
    strFill: "Fill",
    strFillHelpTip:
      "Apply color to Fill and/or Stroke (only applies Shape to Layers)",
    strHelp: "?",
    strImportAse: "+ ASE",
    strJoin: "Join",
    strLastSelected: "Ray-Last selected",
    strLayoutAlert: "You must restart Ray to get the new layout",
    strLink: "Link",
    strLinkHelpTip:
      "Links the selected colors into the selected RDC palette, hold Alt key to replace the linked color palette",
    strOk: "OK",
    strOpen: "Open",
    strOpenHelpTip: "Opens the selected Palette comp",
    strPalette: "palette",
    strPaletteCompCorrupted:
      "The palette comp is not setup properly. Please make sure you have not added any layers or otherwise modified this comp besides adding or changing colors.",
    strPaletteFolder: "Ray Palette Comps",
    strPaletteName: "Please name the palette",
    strPalettePrefix: "Ray - ",
    strPlus: "+",
    strPrefsPath: "/Aescripts/Ray",
    strProjScanConfirm:
      "Are you sure you want to scan the entire project?\nThis might take a bit, if you only want to scan some comps select them first in the project panel, or any layers or properties. Open the info panel to see the progress, press ESC to cancel.\n\nIf you only want to scan a comp please select it in the Project Panel.",
    strRefresh: "Refresh",
    strRefreshHelpTip: "Rescans the project for RDC Palette comps",
    strReplace: "Replace",
    strReplaceHelpTip: "Replace RDC Palette",
    strReveal: "Reveal Expressions Folder",
    strRevealShort: "Folder",
    strScan: "+ Scan",
    strScanRecurse: "Recurse nested comps",
    strSelectAse: "Please select the ASE file to import",
    strShapeLayerComment: 'Change colors in the "Effect Controls" Shortcut: F3',
    strStroke: "Stroke",
    strStrokeHelpTip: "Apply color to Stroke (only applies to Shape Layers)",
    strSwap: "Swap",
    strSwapHelpTip: "Swap Fill & Stroke colors (only applies to Shape Layers)",
    strUnLink: "UnLink",
    strUnLinkComment: "//RDC Bake Data - DO NOT DELETE OR MODIFY",
    strUnLinkHelpTip:
      "Unlink (bake) RDC expressions to keyframes for faster rendering. Please note that this will delete the Ray expression and will break the dynamic links to the colors.",
    supportUrl: "http://aescripts.com/contact/?direct=1&sku=SVDRDC2-SUL",
    turnOffExpressions: false,
  };
  rdc.errUiLayoutNumMax =
    "That\'s a lot of colors Batman! For the safety of your display only the first " +
    rdc.numberOfPaletteShortcutButtonsMax +
    " will be shown";
  rdc.errMaxColors =
    "While all the colors will be added to the palette comp, only the first " +
    rdc.numberOfPaletteShortcutButtonsMax +
    " colors will have buttons in the UI.";
  0;
  rdc.showErrors = app.settings.haveSetting(rdc.prefsSectionName, "showErrors")
    ? !(app.settings.getSetting(rdc.prefsSectionName, "showErrors") == "false")
    : true;
  rdc.turnOnSwatchNums = app.settings.haveSetting(
    rdc.prefsSectionName,
    "turnOnSwatchNums",
  )
    ? !(
        app.settings.getSetting(rdc.prefsSectionName, "turnOnSwatchNums") ==
        "false"
      )
    : false;
  rdc.linearizeUI = app.settings.haveSetting(
    rdc.prefsSectionName,
    "linearizeUI",
  )
    ? !(app.settings.getSetting(rdc.prefsSectionName, "linearizeUI") == "false")
    : false;
  rdc.moveColorLayer = app.settings.haveSetting(
    rdc.prefsSectionName,
    "moveColorLayer",
  )
    ? !(
        app.settings.getSetting(rdc.prefsSectionName, "moveColorLayer") ==
        "false"
      )
    : true;
  rdc.strAbout1 =
    rdc.scriptName +
    " v" +
    rdc.scriptVersion +
    "\n" +
    "Copyright \xa9 2017 Sander van Dijk\n" +
    "Developed by Lloyd Alvarez http://aescripts.com\n\n";
  rdc.strAbout2 =
    'Create Color Palette:\nClick the plus button. This will create a new "color palette composition" If you open that composition you will find a shape layer with seven default colors. This shape layer acts as a visual representation of the color palette. On this layer we can change the colors of the palette. Add more colors by duplicating one of the color controls or add the color control effect to this layer.\n\nClick the refresh button to update your changes in the Ray Dynamic Color UI panel. Now you have access to you color palette from anywhere in After effects.\n\nASE files:\nAnother way to import colors, is using ASE files. Click on the plus ASE button. Select the ASE file and import it as a color palette composition. By default this new comp will be named after the ase file. You can always change the comp name but make sure to keep "Ray -" in front of the name. This is how Ray Dynamic Color knows that this comp is actually a color palette composition.\n\nWhen your done making changes press the refresh button again.\n\nYou can import color palettes from Kuler the same way. Go to color.adobe.com and download one of the color palettes as ASE file. Then, import that ASE file the same way using the + ASE button.\n\nApply Color:\nSelect any layer in the timeline and assign one of the numbers to it by clicking on the number buttons in the UI panel. You assign a number so that later on you have the option to change the color that the number represents.\n\nAfter you apply this color you can still adjust it like normally. Click on the color property to change the color. Here all colors are still available to select but if you want a color out of the color palette, enter the number of the color into the blue channel. this will make the color property reference the color number you want.\n\nSearch for // to find all the color properties that are colored with Ray Dynamic Color in the timeline view. Now you can easily get an overview of all the colors and adjust them without digging through property groups to find them.\n\nThe pound button:\nAllows you to type in any number.\n\nThe P button:\nAllows you to swap out a different color palette. Select the layer and the palette you want, then hit the P button. You can also change this manually. If you look in the group name of the color property, you can find the color palette name. Just change this name there to the color palette you want to use instead.';
  var afs = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [],
    helpText: rdc.strAbout2,
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6037055455875349,
    productSKU: "SVDRDC2-SUL",
    scriptAuthor:
      " Sander van Dijk\nDeveloped by Lloyd Alvarez http://aescripts.com",
    scriptName: rdc.scriptName,
    scriptURL: rdc.scriptUrl,
    scriptVersion: rdc.scriptVersion,
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
      -1 != $.os.indexOf("Mac") && systemCall('chmod +x "' + n.fsName + '"');
      var r = systemCall(
        '"' + n.fsName + '" "' + strHeader + '" ' + privateNum + ' "' + e + '"',
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
      return (validateTimeLimited(e, i, t), "" != i && "" != t);
    }
    function validateTimeLimited(e, i, t) {
      switch (e.result) {
        case -20:
          e.e = parseDateString(i);
          break;
        case -21:
          e.e = parseDateString(t);
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
        var i = retProp("^d", e);
        if (void 0 === i) {
          return void (e.result = -103);
        }
        var t = tLD - i;
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
        i.match(/@remote/i) || alert(p);
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
        isTimeLimited && (t += "\n" + strLicenseEnds + f),
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
      return BridgeTalk.appName.match(new RegExp(bD("YWZ0ZXJlZmZlY3Rz")));
    }
    function isPS() {
      return BridgeTalk.appName.match(new RegExp(bD("cGhvdG9zaG9w")));
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
            systemCall(bD("Y2htb2QgK3gg") + e.absoluteURI)),
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
    var licensingVersion = "3.0.43";
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
    var wx = __BLOB__BLOB_000482__;
    var mx = __BLOB__BLOB_000483__;
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
  var n448aa = new a(afs);
  if (!n448aa.c()) {
    return;
  }
  rdc.isTrial = n448aa.t();
  var binStr = {
    colorFfx: {
      code: __BLOB__BLOB_000484__,
      name: "Ray Master Color v2.0.1.ffx",
    },
    unzip: {
      code:
        "\'aescripts unzip - " +
        rdc.scriptName +
        " v" +
        rdc.scriptVersion +
        '\r\n\'copyright 2014 http://aescripts.com\r\n\'\r\n\' USAGE:\r\n\'\r\n\' cscript //b unzip.vbs zip_file_name_goes_here.zip\r\n\r\nSet ArgObj = WScript.Arguments\r\nIf (Wscript.Arguments.Count > 0) Then\r\n var1 = ArgObj(0)\r\nElse\r\n var1 = ""\r\nEnd if\r\nstrFileZIP = var1\r\nDim sCurPath\r\nsCurPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.Arguments.Item(0))\r\nstrZipFile = strFileZIP\r\n\'The folder the contents should be extracted to.\r\noutFolder = sCurPath & "\\"\r\nSet objShell = CreateObject( "Shell.Application" )\r\nSet objSource = objShell.NameSpace(strZipFile).Items()\r\nSet objTarget = objShell.NameSpace(outFolder)\r\nintOptions = 256\r\nobjTarget.CopyHere objSource, intOptions\r\n\r\n',
      name: "aescripts_unzip_v1",
    },
  };
  rdc.binaryStrings = {
    FillStroke0: { bin: __BLOB__BLOB_000485__, name: "FillStroke0Btn1.png" },
    FillStroke1: { bin: __BLOB__BLOB_000486__, name: "FillStroke1Btn1.png" },
    FillStroke2: { bin: __BLOB__BLOB_000487__, name: "FillStroke2Btn1.png" },
    gear: { bin: __BLOB__BLOB_CLEANED__, name: "gearBtn1.png" },
    helpHeader: { bin: __BLOB__BLOB_000488__, name: "helpHeader.png" },
    link: { bin: __BLOB__BLOB_000489__, name: "linkBtn1.png" },
    open: { bin: __BLOB__BLOB_000490__, name: "openBtn1.png" },
    plus: { bin: __BLOB__BLOB_000491__, name: "plusBtn1.png" },
    refresh: { bin: __BLOB__BLOB_000492__, name: "refreshBtn1.png" },
    swap: { bin: __BLOB__BLOB_000493__, name: "swapBtn1.png" },
    twirl: { bin: __BLOB__BLOB_CLEANED__, name: "paletteTwirl1.png" },
    twirlDown: { bin: __BLOB__BLOB_000494__, name: "paletteTwirlDown1.png" },
    unLink: { bin: __BLOB__BLOB_000495__, name: "unLinkBtn1.png" },
  };
  var rdcf = {
    defaultLocation: app.settings.haveSetting(
      rdc.prefsSectionName,
      "DefaultLocation",
    )
      ? File(app.settings.getSetting(rdc.prefsSectionName, "DefaultLocation"))
      : File(Folder.desktop.fsName),
    numsButtons: [],
    paletteComps: [],
    uiBrightness: getUiBrightness(),
    userDataFolder: getUserDataFolder(),
  };
  rdc.alertUIReturn = null;
  switch (mode) {
    case "swap":
      swap();
      break;
    default:
      startRDC(thisObj);
      break;
  }
}
var isKBarRunning = typeof kbar !== "undefined";
if (parseFloat(app.version) >= 11) {
  if (isKBarRunning && kbar.button && kbar.button.argument) {
    switch (kbar.button.argument.toLowerCase()) {
      case "swap":
        RayDynamicColor(this, "swap");
        break;
      default:
        RayDynamicColor(this);
        break;
    }
  } else {
    RayDynamicColor(this);
  }
} else {
  alert("This script requires After Effects CS6 or above");
}
