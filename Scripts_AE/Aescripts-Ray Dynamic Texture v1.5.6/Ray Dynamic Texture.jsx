/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function RayDynamicTexture(thisObj, mode) {
  function startRDT(thisObj) {
    if (
      createImageResourceFile(
        RDT.binaryStrings.twirlDown,
        RDTf.userDataFolder,
      ) == null
    ) {
      return false;
    }
    if ($.os.indexOf("Win") != -1) {
      RDTf.winUnZip = createResourceFile(
        binStr.unzip.name + ".vbs",
        binStr.unzip.code,
        false,
        RDTf.userDataFolder,
      );
    }
    var isCompactUI =
      thisObj instanceof Panel &&
      thisObj.size.width < RDT.UIChangeCloseThreshold;
    var res = buildRes(isCompactUI);
    RDT.buttonsPerRow = isCompactUI ? 5 : 10;
    var myPalette = buildUI(thisObj, res);
    if (myPalette != null && myPalette instanceof Window) {
      myPalette.show();
    }
  }
  function getUserDataFolder() {
    var userDataFolder = Folder.userData;
    var aescriptsFolder = Folder(userDataFolder.toString() + RDT.strPrefsPath);
    if (!aescriptsFolder.exists) {
      var checkFolder = aescriptsFolder.create();
      if (!checkFolder) {
        alertUI(
          RDT.errDiskPermission
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
      if (!isSecurityPrefSet()) {
        alert(
          'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
        );
        try {
          app.executeCommand(2359);
        } catch (e) {
          alert("ERROR" + e.toString());
        }
        if (!isSecurityPrefSet()) {
          return null;
        }
      }
      myFile.encoding = "BINARY";
      myFile.open("w");
      myFile.write(image.bin);
      myFile.close();
    }
    if (myFile.exists) {
      return myFile;
    } else {
      alertUI(
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
    var userDataFolder = RDTf.userDataFolder;
    var orient = compactUI ? "column" : "row";
    var ddWidth = compactUI ? (parseFloat(app.version) >= 12 ? 160 : 170) : 160;
    var dd1Width = compactUI ? 160 : 160;
    var spacerWidth = compactUI ? 32 : 32;
    var spacer1Width = compactUI ? 32 : 32;
    var spacer2Width = compactUI ? 8 : 10;
    var spacer3Width = compactUI ? 8 : 0;
    var replaceWidth = compactUI ? 0 : 32;
    var revealBtnWidth = compactUI ? 60 : 64;
    var exportAseBtnWidth = compactUI ? 100 : 80;
    var gearAlign = compactUI ? "left" : "right";
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
      ",\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'left\',\'fill\'], \n                            orientation: \'row\', \n                            refreshBtn: IconButton {text: \'Refresh\', name:\'refreshBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      RDT.strRefreshHelpTip +
      "\', preferredSize:[32,32] }\n                            openBtn: IconButton {text: \'" +
      RDT.strOpen +
      "\', name:\'openBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      RDT.strOpenHelpTip +
      "\', alignment: [\'left\',\'middle\'], preferredSize:[32,32]}\n                            importBtn: IconButton {visible: false, text: \'+ ASE\', name:\'importBtn\', properties:{style:\'toolbutton\'}, helpTip: \'Adds a new RDT palette based on an imported ASE file\', preferredSize:[32,32] }\n                            exportBtn: IconButton {visible: false, text: \'- ASE\', name:\'exportBtn\', properties:{style:\'toolbutton\'}, helpTip: \'Exports RDT palette as ASE file\', preferredSize:[32,32]}\n                            plusBtn: IconButton {text: \'+\', name:\'plusBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      RDT.strPlusHelpTip +
      "\', preferredSize:[32,32]}\n                            }\n                            }\n                            }\n                           numsParentGrp: Group {\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'fill\',\'top\'], \n                            orientation: \'row\',\n                            margins: 0, padding: 0, spacing:0,\n                            paletteTwirlGrp: Group {\n                                alignment: [\'left\',\'top\'], \n                                alignChildren: [\'fill\',\'top\'], \n                                orientation: \'column\',\n                                margins: 0, padding: 0, spacing:1,\n                                    paletteTwirlSpacer: StaticText {text:\'\',preferredSize:[0,10],minimumSize:[0,10]},\n                                    paletteTwirl: IconButton {text: \'paletteTwirl\', name:\'paletteTwirl\', properties:{style:\'toolbutton\'},  alignment: [\'left\',\'top\'],preferredSize:[10,10],\n                                                                visible: false}\n                                                                }\n                            numsGrp: Group {\n                                    alignment: [\'left\',\'top\'], \n                                    alignChildren:[\'fill\',\'top\'],\n                                    orientation: \'column\',\n                                    name:\'buttons\',\n                                    margins: " +
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
      ",\n                                      linkBtn: IconButton {text: \'" +
      RDT.strLink +
      "\', name:\'linkBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      RDT.strLinkHelpTip +
      "\', alignment: [\'left\',\'middle\'], preferredSize:[32,32]}\n                                      ALS_Btn: IconButton {state: \'2\', name:\'ALS\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      RDT.strALSHelpTip +
      "\',\n                                            preferredSize:[" +
      spacer1Width +
      ",32],minimumSize:[" +
      spacer1Width +
      ",32],maximumSize:[" +
      spacer1Width +
      ",32],alignment: [\'left\',\'middle\'] }\n                                      invertBtn: IconButton {text: \'Invert\', name:\'invertBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      RDT.strInvertHelpTip +
      "\',\n                                            preferredSize:[" +
      spacer1Width +
      ",32],minimumSize:[" +
      spacer1Width +
      ",32],maximumSize:[" +
      spacer1Width +
      ",32],alignment: [\'left\',\'middle\'] }\n                                      cloneBtn: IconButton {visible: false, text: \'Clone\', name:\'cloneBtn\', properties:{style:\'toolbutton\'}, helpTip: \'" +
      RDT.strCloneHelpTip +
      "\',\n                                            preferredSize:[" +
      spacer1Width +
      ",32],minimumSize:[" +
      spacer1Width +
      ",32],maximumSize:[" +
      spacer1Width +
      ",32],alignment: [\'left\',\'middle\'], visible: true }\n                                      gearBtn: IconButton {text: \'?\', name:\'gearBtn\', properties:{style:\'toolbutton\'}, preferredSize:[32,32],\n                                            alignment: [\'" +
      gearAlign +
      "\',\'middle\']}\n                                           }\n                                    }\n                          }\n                       advGrp: Group {\n                            alignment: [\'left\',\'top\'], \n                            alignChildren: [\'left\',\'top\'], \n                            orientation: \'column\',\n                            margins: 0, padding: 0, spacing:0,\n                      advSubGrp: Group {\n                               alignment: [\'left\',\'top\'], \n                                alignChildren: [\'left\',\'top\'], \n                                orientation:  \'column\',\n                                margins: " +
      spacing +
      ", padding: " +
      spacing +
      ", spacing:" +
      spacing +
      ",\n                                   activateSmodeSubGrp: Group {\n                                   alignment: [\'left\',\'top\'], \n                                    alignChildren: [\'left\',\'top\'], \n                                    orientation:  \'row\',\n                                    margins: 0, padding: 0, spacing:0,\n                                       spacer: StaticText {preferredSize:[" +
      spacer2Width +
      ",20],minimumSize:[" +
      spacer2Width +
      ",20],maximumSize:[" +
      spacer2Width +
      ",20]}, \n                                       activateSmode: Checkbox {text: \'Activate Set Matte \"S\" mode\'} ,\n                                     }\n                                   replaceValueSubGrp: Group {\n                                   alignment: [\'left\',\'top\'], \n                                    alignChildren: [\'left\',\'middle\'], \n                                    orientation:  \'row\',\n                                    margins: 0, padding: 0, spacing:0,\n                                       spacer: StaticText {preferredSize:[" +
      spacer2Width +
      ",15],minimumSize:[" +
      spacer2Width +
      ",15],maximumSize:[" +
      spacer2Width +
      ",15]}, \n                                       replaceValue: Checkbox {text: \'" +
      RDT.strReplaceValueCheckbox +
      "\', helpTip:\'" +
      RDT.strReplaceValueCheckboxHelpTip +
      "\',preferredSize:[-1,15], alignment: [\'left\',\'bottom\']} ,\n                                       replaceBtn: Button  {text: \'" +
      RDT.strAddValueCheckbox +
      "\',  helpTip:\'" +
      RDT.strAddValueCheckboxHelpTip +
      "\', preferredSize:[120,15], alignment: [\'left\',\'bottom\']},\n                                     }\n                                 }\n                           }\n                       }\n\t\t\t\t}";
    return res;
  }
  function buildUI(thisObj, res) {
    var nameVers = RDT.scriptName + " v" + RDT.scriptVersion;
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
          var buttons = RDTf.numsButtons;
        }
        RDT.gfx = myPal.graphics;
        RDTf.winGfx = myPal.graphics;
        myPal.grp.addEventListener("keydown", fileListEventCatcher, false);
        RDT.myPal = myPal;
        RDT.dropdown =
          myPal.grp.palettesParentGrp.palettesGrp.palettesGrp0.palettesDdl;
        RDT.dropdown.preferredSize.height =
          RDT.dropdown.minimumSize.height =
          RDT.dropdown.maximumSize.height =
            30;
        var userDataFolder = RDTf.userDataFolder;
        RDT.twirl_Icon = createImageResourceFile(
          RDT.binaryStrings.twirl,
          userDataFolder,
        ).fsName;
        RDT.twirlDown_Icon = createImageResourceFile(
          RDT.binaryStrings.twirlDown,
          userDataFolder,
        ).fsName;
        RDT.refresh_Icon = createImageResourceFile(
          RDT.binaryStrings.refresh,
          userDataFolder,
        ).fsName;
        RDT.open_Icon = createImageResourceFile(
          RDT.binaryStrings.open,
          userDataFolder,
        ).fsName;
        RDT.plus_Icon = createImageResourceFile(
          RDT.binaryStrings.plus,
          userDataFolder,
        ).fsName;
        RDT.unLink_Icon = createImageResourceFile(
          RDT.binaryStrings.unLink,
          userDataFolder,
        ).fsName;
        RDT.link_Icon = createImageResourceFile(
          RDT.binaryStrings.link,
          userDataFolder,
        ).fsName;
        RDT.import_Icon = createImageResourceFile(
          RDT.binaryStrings.imprt,
          userDataFolder,
        ).fsName;
        RDT.export_Icon = createImageResourceFile(
          RDT.binaryStrings.exprt,
          userDataFolder,
        ).fsName;
        RDT.ALS0_Icon = createImageResourceFile(
          RDT.binaryStrings.ALS0,
          userDataFolder,
        ).fsName;
        RDT.ALS0i_Icon = createImageResourceFile(
          RDT.binaryStrings.ALS0i,
          userDataFolder,
        ).fsName;
        RDT.ALS1_Icon = createImageResourceFile(
          RDT.binaryStrings.ALS1,
          userDataFolder,
        ).fsName;
        RDT.ALS1i_Icon = createImageResourceFile(
          RDT.binaryStrings.ALS1i,
          userDataFolder,
        ).fsName;
        RDT.ALS2_Icon = createImageResourceFile(
          RDT.binaryStrings.ALS2,
          userDataFolder,
        ).fsName;
        RDT.ALS2i_Icon = createImageResourceFile(
          RDT.binaryStrings.ALS2i,
          userDataFolder,
        ).fsName;
        RDT.invert_Icon = createImageResourceFile(
          RDT.binaryStrings.invert,
          userDataFolder,
        ).fsName;
        RDT.clone_Icon = createImageResourceFile(
          RDT.binaryStrings.clone,
          userDataFolder,
        ).fsName;
        RDT.gear_Icon = createImageResourceFile(
          RDT.binaryStrings.gear,
          userDataFolder,
        ).fsName;
        myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.icon =
          RDT.twirlDown_Icon;
        myPal.grp.numsParentGrp.paletteTwirlGrp.paletteTwirl.icon =
          RDT.twirl_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.refreshBtn.icon =
          RDT.refresh_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.openBtn.icon =
          RDT.open_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.importBtn.icon =
          RDT.import_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.exportBtn.icon =
          RDT.export_Icon;
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.plusBtn.icon =
          RDT.plus_Icon;
        myPal.grp.extrasParentGrp.extrasTwirl.icon = RDT.twirl_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.icon =
          RDT.link_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn.icon =
          RDT.ALS0_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.invertBtn.icon =
          RDT.invert_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.cloneBtn.icon =
          RDT.clone_Icon;
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.gearBtn.icon =
          RDT.gear_Icon;
        myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
          RDT.dropdown.selection != null;
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
        myPal.grp.extrasParentGrp.extrasTwirl.openState = RDTf.showAdvanced =
          app.settings.haveSetting(RDT.prefsSectionName, "extrasTwirlOpenState")
            ? !(
                app.settings.getSetting(
                  RDT.prefsSectionName,
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
          ? RDT.twirl_Icon
          : RDT.twirlDown_Icon;
        myPal.grp.extrasParentGrp.extrasTwirl.onClick = function () {
          myPal.grp.advGrp.maximumSize.height = this.openState ? 0 : 140;
          myPal.grp.extrasParentGrp.extrasTwirl.icon = this.openState
            ? RDT.twirl_Icon
            : RDT.twirlDown_Icon;
          this.openState = RDTf.showAdvanced = !this.openState;
          app.settings.saveSetting(
            RDT.prefsSectionName,
            "extrasTwirlOpenState",
            this.openState,
          );
          myPal.layout.layout(true);
          myPal.layout.resize();
        };
        RDT.activateSmode =
          myPal.grp.advGrp.advSubGrp.activateSmodeSubGrp.activateSmode.value =
            app.settings.haveSetting(RDT.prefsSectionName, "activateSmode")
              ? !(
                  app.settings.getSetting(
                    RDT.prefsSectionName,
                    "activateSmode",
                  ) == "false"
                )
              : RDT.activateSmode;
        myPal.grp.advGrp.advSubGrp.activateSmodeSubGrp.activateSmode.onClick =
          function () {
            RDT.activateSmode = this.value;
            app.settings.saveSetting(
              RDT.prefsSectionName,
              "activateSmode",
              this.value,
            );
            if (!RDT.activateSmode) {
              RDT.ALS_Btn = RDT.matteState = multiPurposeButton(
                myPal,
                undefined,
                "set",
                0,
                RDT.activateSmode ? 3 : 2,
                myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn,
              );
            } else {
              RDT.ALS_Btn = RDT.matteState = multiPurposeButton(
                myPal,
                undefined,
                "set",
                2,
                RDT.activateSmode ? 3 : 2,
                myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn,
              );
            }
          };
        RDT.ALS_Btn =
          RDT.matteState =
          myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn.state =
            app.settings.haveSetting(RDT.prefsSectionName, "ALS_State")
              ? app.settings.getSetting(RDT.prefsSectionName, "ALS_State")
              : "0";
        RDT.ALS_Btn.helpTip = getMatteButtonMode() + "\n" + RDT.strALSHelpTip;
        multiPurposeButton(
          myPal,
          undefined,
          "set",
          RDT.ALS_Btn,
          RDT.activateSmode ? 3 : 2,
          myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn,
        );
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn.onClick =
          function () {
            RDT.ALS_Btn = RDT.matteState = multiPurposeButton(
              myPal,
              this,
              "cycle",
              undefined,
              RDT.activateSmode ? 3 : 2,
              myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn,
            );
            texturePalettesRefresh(myPal);
          };
        RDT.replaceValueInExpression =
          myPal.grp.advGrp.advSubGrp.replaceValueSubGrp.replaceValue.value =
            app.settings.haveSetting(RDT.prefsSectionName, "replaceValue")
              ? !(
                  app.settings.getSetting(
                    RDT.prefsSectionName,
                    "replaceValue",
                  ) == "false"
                )
              : RDT.activateSmode;
        myPal.grp.advGrp.advSubGrp.replaceValueSubGrp.replaceValue.onClick =
          function () {
            RDT.replaceValueInExpression = this.value;
            app.settings.saveSetting(
              RDT.prefsSectionName,
              "replaceValue",
              this.value,
            );
          };
        myPal.grp.advGrp.advSubGrp.replaceValueSubGrp.replaceBtn.onClick =
          function () {
            if (
              app.project.activeItem == null ||
              !(app.project.activeItem instanceof CompItem) ||
              app.project.activeItem.selectedProperties.length == 0
            ) {
              alertUI("Please select some properties");
              return false;
            }
            app.beginUndoGroup(RDT.scriptName + " Add thisProperty.value");
            for (
              var h = 0;
              h < app.project.activeItem.selectedProperties.length;
              h += 1
            ) {
              var currentProp = app.project.activeItem.selectedProperties[h];
              if (currentProp.canSetExpression) {
                currentProp.expression = "thisProperty.value";
              }
            }
            app.endUndoGroup();
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.cloneBtn.onClick =
          function () {
            clone();
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.invertBtn.onClick =
          function () {
            app.beginUndoGroup(RDT.scriptName + " " + RDT.strInvert);
            RDT.applyErrors = [];
            RDT.invertObj = {};
            applyTexture(undefined, undefined, undefined, "invert");
            app.endUndoGroup();
            if (RDT.applyErrors.length > 0) {
              var errorMsg =
                RDT.applyErrors.length > 1
                  ? "The following errors were encountered:\n"
                  : "" + RDT.applyErrors.join("\n\n");
              if (errorMsg.match(/CUSTOM_VALUE/)) {
                errorMsg =
                  "Due to limitation in the After Effects api, custom values are currently not supported.\n\n" +
                  errorMsg;
              }
              alertUI(errorMsg);
            }
            RDT.applyErrors = [];
          };
        RDT.buttonsGrp = myPal.grp.numsParentGrp.numsGrp;
        populatePalettesDropDown(RDT.dropdown);
        toggleUIEnabledState(myPal, RDT.dropdown.selection != null);
        texturePalettesRefresh(myPal);
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.refreshBtn.onClick =
          function () {
            texturePalettesRefresh(myPal, true);
          };
        if (parseFloat(app.version) >= 11) {
          myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.openBtn.onClick =
            function () {
              if (RDTf.textureComps.length > 0) {
                var sel =
                  RDT.dropdown.selection != null
                    ? RDT.dropdown.selection.index
                    : 0;
                try {
                  RDTf.textureComps[sel].openInViewer();
                  if (RDTf.textureComps[sel].numLayers > 0) {
                    RDTf.textureComps[sel].layer(1).selected = true;
                  }
                } catch (e) {}
              }
            };
        }
        RDT.dropdown.onChange = function () {
          if (RDTf.textureComps.length > 0) {
            var sel = this.selection != null ? this.selection.index : 0;
            setButtonLabels(RDTf.textureComps[sel]);
            addPaletteCompComment(sel);
          }
          myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
            RDT.dropdown.selection != null;
          toggleUIEnabledState(myPal, RDT.dropdown.selection != null);
        };
        myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.plusBtn.onClick =
          function () {
            app.beginUndoGroup(RDT.scriptName + " " + this.text);
            RDT.applyErrors = [];
            scanTexturesIntoPalette(false);
            app.endUndoGroup();
            if (RDT.applyErrors.length > 0) {
              alertUI(
                RDT.applyErrors.length > 1
                  ? "The following errors were encountered:\n"
                  : "" + RDT.applyErrors.join("\n\n"),
              );
            }
            RDT.applyErrors = [];
            myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
              RDT.dropdown.selection != null;
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.onClick =
          function () {
            app.beginUndoGroup(RDT.scriptName + " " + this.text);
            RDT.applyErrors = [];
            scanTexturesIntoPalette(true);
            app.endUndoGroup();
            if (RDT.applyErrors.length > 0) {
              var errorMsg =
                RDT.applyErrors.length > 1
                  ? "The following errors were encountered:\n"
                  : "" + RDT.applyErrors.join("\n\n");
              if (errorMsg.match(/CUSTOM_VALUE/)) {
                errorMsg =
                  "Due to limitation in the After Effects api, custom values are currently not supported.\n\n" +
                  errorMsg +
                  "\n\nWorkaround: You can put the texture including the effect and other settings into a composition and use that as a texture. This way custom values will come in correctly because they are inside the comp.";
              }
              alertUI(errorMsg);
            }
            RDT.applyErrors = [];
          };
        myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.gearBtn.onClick =
          function () {
            helpUI(myPal);
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
          RDT.dropdown.selection != null ? RDT.dropdown.selection.index : null;
        if (
          (thisObj.size.width < RDT.UIChangeCloseThreshold &&
            saveRes >= RDT.UIChangeOpenThreshold) ||
          (thisObj.size.width > RDT.UIChangeOpenThreshold &&
            saveRes <= RDT.UIChangeCloseThreshold)
        ) {
          RDT.buttonsPerRow =
            thisObj.size.width < RDT.UIChangeCloseThreshold ? 5 : 10;
          var res = buildRes(thisObj.size.width < RDT.UIChangeCloseThreshold);
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
  function clone() {
    if (
      app.project.activeItem == null ||
      !(app.project.activeItem instanceof CompItem) ||
      app.project.activeItem.selectedLayers.length == 0
    ) {
      alertUI("Please select a layer");
      return false;
    }
    app.beginUndoGroup(RDT.scriptName + " Clone");
    for (var h = 0; h < app.project.activeItem.selectedLayers.length; h += 1) {
      var myLayer = app.project.activeItem.selectedLayers[h];
      var layerParent = null;
      if (myLayer.parent != null) {
        layerParent = myLayer.parent;
        myLayer.parent = null;
      }
      var myLayerDup = copyWithPropertyLinks(
        myLayer,
        true,
        true,
        ScriptUI.environment.keyboardState.altKey,
      );
      myLayerDup.parent = myLayer;
      resetTransforms(
        myLayerDup,
        [myLayerDup.width / 2, myLayer.height / 2, 0],
        true,
        true,
      );
      myLayerDup.name = "" + myLayer.name + "-Clone";
      if (layerParent != null) {
        myLayer.parent = layerParent;
      }
    }
    app.endUndoGroup();
  }
  function getMatteButtonMode() {
    if (RDT.matteState == undefined) {
      RDT.matteState = "0";
    }
    switch (RDT.matteState) {
      case "0":
      case "0i":
        matte = "Alpha Matte";
        break;
      case "1":
      case "1i":
        matte = "Luma Matte";
        break;
      case "2":
      case "2i":
        matte = "Set Matte";
    }
    return matte + RDT.matteState.toString().match(/i/) ? " Inverted" : "";
  }
  function helpUI(myPal) {
    var helpPal = new Window(
      "dialog",
      RDT.scriptName + " v" + RDT.scriptVersion,
      undefined,
      { resizeable: true },
    );
    var userDataFolder = RDTf.userDataFolder;
    if (helpPal != null) {
      var res =
        "group { \n\t\torientation: \'column\', \n\t\talignment: [\'fill\',\'fill\'], \n\t\talignChildren: [\'fill\',\'fill\'], \n                   infoGrp: Group { \n                   alignment: [\'fill\',\'top\'], \n                   alignChildren: [\'fill\',\'fill\'], \n                   orientation: \'column\', \n                      header: Image {name:\'header\', properties:{style:\'toolbutton\'}, alignment: [\'fill\',\'fill\']}\n                      dismiss: Checkbox{text:\'" +
        RDT.strDismiss +
        "\',alignment: [\'left\',\'fill\']},\n                      dontRenameEffects: Checkbox {text: \'Do not rename effects (Check this for Duik compatibilty)\',alignment: [\'left\',\'fill\']} ,\n                      tutBtn: Button {text:\'Tutorials\', preferredSize:[150,30], alignment: [\'fill\',\'fill\']} \n                      supportGrp: Group { \n                            alignment: [\'fill\',\'bottom\'], \n                            alignChildren: [\'fill\',\'fill\'], \n                       forumsBtn: Button {text:\'Comments Forum\', preferredSize:[150,30]} \n                       supportBtn: Button {text:\'Open Help Ticket\', preferredSize:[150,30]} \n                       }\n                      fill: StaticText {preferredSize:[150,10]}, \n                      hdr: StaticText {properties:{multiline:true}}, \n                      lic:Button {text:\'Deactivate License\', preferredSize:[150,30], alignment: [\'fill\',\'fill\']} \n                      updateCheck: Checkbox{text:\'Check for updates automatically\',alignment: [\'left\',\'fill\']},\n\t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,60]}, \n\t\t\t\t} \n\t\t\t\tokGrp: Group { \n                alignment: [\'fill\',\'bottom\'], \n                alignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\tokBtn: Button {text:\'OK\', preferredSize:[150,30]} \n\t\t\t\t} \n\t\t}";
      helpPal.grp = helpPal.add(res);
      helpPal.grp.infoGrp.txt.text = RDT.strAbout1;
      helpPal.grp.infoGrp.hdr.text = y55rff.getRegistration();
      helpPal.grp.infoGrp.updateCheck.value = y55rff.getUpdateCheckStatus();
      helpPal.grp.infoGrp.updateCheck.onClick = function () {
        y55rff.doUpdateCheck(this.value);
      };
      helpPal.grp.infoGrp.lic.visible = !y55rff.t();
      helpPal.grp.infoGrp.lic.onClick = function () {
        if (y55rff.r()) {
          helpPal.grp.infoGrp.hdr.text = y55rff.getRegistration();
          this.visible = false;
          rdc.isTrial = y55rff.t();
        }
      };
      RDT.dontRenameEffects = helpPal.grp.infoGrp.dontRenameEffects.value =
        app.settings.haveSetting(RDT.prefsSectionName, "dontRenameEffects")
          ? !(
              app.settings.getSetting(
                RDT.prefsSectionName,
                "dontRenameEffects",
              ) == "false"
            )
          : RDT.dontRenameEffects;
      helpPal.grp.infoGrp.dontRenameEffects.onClick = function () {
        app.settings.saveSetting(
          RDT.prefsSectionName,
          "dontRenameEffects",
          this.value,
        );
        RDT.dontRenameEffects = this.value;
      };
      var imageResource = isMainDisplayRetina()
        ? RDT.binaryStrings.helpHeaderRetina
        : RDT.binaryStrings.helpHeader;
      var imageScale = isMainDisplayRetina() ? 2 : 1;
      var image = ScriptUI.newImage(
        createImageResourceFile(imageResource, userDataFolder).fsName,
      );
      helpPal.grp.infoGrp.header.icon = image;
      helpPal.grp.infoGrp.header.onDraw = function (drawingState) {
        this.graphics.drawImage(
          image,
          0,
          0,
          image.size[0] / imageScale,
          image.size[1] / imageScale,
        );
      };
      helpPal.grp.infoGrp.header.maximumSize = [
        image.size[0] / imageScale,
        image.size[1] / imageScale,
      ];
      helpPal.grp.infoGrp.dismiss.value = !RDT.showErrors;
      helpPal.grp.infoGrp.dismiss.onClick = function () {
        RDT.showErrors = !this.value;
        app.settings.saveSetting(
          RDT.prefsSectionName,
          "showErrors",
          RDT.showErrors,
        );
      };
      helpPal.grp.infoGrp.tutBtn.onClick = function () {
        y55rff.openURL(RDT.scriptUrl);
        helpPal.close();
      };
      helpPal.grp.infoGrp.supportGrp.supportBtn.onClick = function () {
        y55rff.openSupportTicket();
        helpPal.close();
      };
      helpPal.grp.infoGrp.supportGrp.forumsBtn.onClick = function () {
        y55rff.openURL(RDT.forumUrl);
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
  function toggleUIEnabledState(myPal, active) {
    RDT.dropdown.enabled =
      myPal.grp.palettesParentGrp.palettesGrp.palettesGrp1.openBtn.enabled =
      myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.enabled =
      myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.ALS_Btn.enabled =
      myPal.grp.extrasParentGrp.extrasGrp.extrasGrp1.linkBtn.enabled =
      myPal.grp.advGrp.advSubGrp.enabled =
        active;
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
  function texturePalettesRefresh(myPal, isRefreshButton) {
    if (RDT.dropdown.selection == null) {
      populatePalettesDropDown(RDT.dropdown);
    }
    if (RDT.dropdown.selection != null) {
      var saveSel = RDT.dropdown.selection.index;
      try {
        saveCompId = RDTf.textureComps[RDT.dropdown.selection.index].id;
      } catch (e) {}
      populatePalettesDropDown(RDT.dropdown);
      if (
        saveCompId != undefined &&
        saveSel < RDTf.textureComps.length &&
        RDTf.textureComps[saveSel].id == saveCompId
      ) {
        RDT.dropdown.selection = saveSel;
      } else {
        var newIndex = isInArrayIndex(saveCompId, RDTf.textureComps, "id");
        if (newIndex >= 0) {
          RDT.dropdown.selection = newIndex;
        } else {
          if (!isRefreshButton) {
            alertUI(RDT.errPaletteCompInvalid, "OK, Refresh");
          }
          texturePalettesRefresh(myPal);
        }
      }
    }
    myPal.grp.palettesParentGrp.paletteTwirlGrp.paletteTwirl.visible =
      RDT.dropdown.selection != null;
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
        var wasInvert = imageName.match(/[0-9]+i/);
        var isInvert = ScriptUI.environment.keyboardState.altKey;
        var toolName = imageName.replace(/[0-9]+i?Btn([0-9]+)?\.png$/i, "");
        var state =
          ((imageNum + isInvert ? 0 : 1) % numStates).toString() +
            (isInvert && !wasInvert) ||
          (!isInvert && wasInvert)
            ? "i"
            : "";
        var nextTool = toolName + state;
        btn1.state = btn2.state = RDT.matteState = state;
        btn1.image = btn2.image = RDT[nextTool + "_Icon"];
        btn1.helpTip = btn2.helpTip =
          getMatteButtonMode() + "\n" + RDT.strALSHelpTip;
        app.settings.saveSetting(
          RDT.prefsSectionName,
          toolName + "_State",
          obj.state,
        );
        return obj.state;
        break;
      case "set":
        btn1.state = btn2.state = state;
        btn1.helpTip = btn2.helpTip =
          getMatteButtonMode() + "\n" + RDT.strALSHelpTip;
        btn1.image = btn2.image = RDT[btn1.name + state + "_Icon"];
        var toolName = File(btn1.icon.pathname).name.replace(
          /[0-9]+i?Btn([0-9]+)?\.png$/i,
          "",
        );
        app.settings.saveSetting(
          RDT.prefsSectionName,
          toolName + "_State",
          state,
        );
        return state;
        break;
    }
  }
  function setButtonColorAndName(grp, color, name) {
    if (color == undefined) {
      color = [RDTf.uiBrightness, RDTf.uiBrightness, RDTf.uiBrightness, 1];
    }
    if (name == undefined) {
      name = "";
    }
    grp.graphics.backgroundColor = RDTf.winGfx.newBrush(
      RDTf.winGfx.BrushType.SOLID_COLOR,
      color,
    );
    grp[grp.properties.name].helpTip = name;
    if (name != "") {
      grp[grp.properties.name].visible = true;
    }
  }
  function loadTextureLayers(comp) {
    var layers = [];
    if (comp != undefined) {
      for (var i = 1; i <= comp.numLayers; i += 1) {
        layers[layers.length] = comp.layer(i);
      }
    }
    return layers;
  }
  function setButtonLabels(comp) {
    try {
      var layers = loadTextureLayers(comp);
      if (layers == null && layers.length == 0) {
        return;
      }
      drawButtons(layers);
    } catch (e) {
      alertUI(RDT.errPaletteCompInvalid, "OK, Refresh");
      texturePalettesRefresh(RDT.myPal, true);
    }
  }
  function drawButtons(layers) {
    var buttonsGrp = RDT.buttonsGrp;
    for (var r = buttonsGrp.children.length - 1; r >= 0; r--) {
      buttonsGrp.remove(buttonsGrp.children[r]);
    }
    RDT.rows = [];
    addButtonRow(buttonsGrp, RDT.gfx, "1", RDT.buttonSize);
    for (var b = 0; b < layers.length; b += 1) {
      if (isValidRDTlayer(layers[b])) {
        if (
          RDT.rows[RDT.rows.length - 1].children.length >= RDT.buttonsPerRow
        ) {
          addButtonRow(
            buttonsGrp,
            RDT.gfx,
            RDT.rows.length + 1,
            RDT.buttonSize,
            true,
          );
          addButton(
            RDT.rows[RDT.rows.length - 1],
            RDT.gfx,
            b + 1,
            RDT.buttonSize,
            true,
            layers[b],
            false,
          );
        } else {
          addButton(
            RDT.rows[RDT.rows.length - 1],
            RDT.gfx,
            b + 1,
            RDT.buttonSize,
            true,
            layers[b],
            false,
          );
        }
      }
    }
    buttonsGrp.parent.parent.layout.layout(true);
    buttonsGrp.parent.parent.layout.resize();
  }
  function isValidRDTlayer(layer) {
    var isValid = false;
    if (getTextureType(layer, false) != "none") {
      if (!layer.name.match(/^(RDT -|Ray -)/) && !layer.guideLayer) {
        isValid = true;
      }
    }
    return isValid;
  }
  function addButtonRow(pal, gfx, text, size, addControls) {
    var row = pal.add("group");
    RDT.rows[RDT.rows.length] = row;
    row.spacing = 0;
    row.margins = 0;
    row.padding = 0;
    row.alignment = ["left", "top"];
    row.alignChildren = ["left", "top"];
    row.orientation = "row";
    row.name = text;
  }
  function addButton(pal, gfx, text, size, fill, layer, isNewButton) {
    var button = pal.add("iconbutton", undefined, undefined, {
      style: "toolbutton",
    });
    RDTf.numsButtons[RDTf.numsButtons.length] = button;
    button.preferredSize =
      parseFloat(app.version) > 11 ? size : [size[0] * 0.95, size[1] * 0.95];
    button.name = layer.index;
    button.text = layer.name.substr(0, 1).toUpperCase();
    button.textColor = [1, 1, 1, 0];
    var buttonShape = "ellipse";
    var textureType = getTextureType(layer);
    button.helpTip = layer.name + "\n(" + textureType.replace(/^add/, "") + ")";
    switch (textureType) {
      case "addEffect":
        buttonShape = "ellipse";
        break;
      case "addTexture":
        buttonShape = "rect";
        button.helpTip += "\n" + RDT.strTextureBtnHelpTip;
        break;
      case "addShape":
        buttonShape = "roundedCornersRect";
        break;
      case "addExpression":
        buttonShape = "straightCornersRect";
        break;
    }
    button.buttonShape = buttonShape;
    button.fillColor = [0, 0, 0, 1];
    button.buttonStroke = true;
    button.strokeWidth = 4;
    if (RDT.labelColors.hasOwnProperty(layer.label)) {
      RDT.labelColors[layer.label].color.push(1);
      button.strokeColor = RDT.labelColors[layer.label].color;
    } else {
      button.strokeColor = [0.5, 0.5, 0.5, 1];
    }
    if (RDT.turnOnButtonLetters) {
      button.textColor = [1, 1, 1, 1];
    }
    button.onDraw = colorIconsCustomDraw;
    button.onClick = function () {
      var savePal = this.parent.parent.parent.parent;
      if (RDT.dropdown.selection != null) {
        if (RDT.isTrial && parseInt(this.name, 10) > 3) {
          alertUI(RDT.errTrialButtonLimit);
          return;
        }
        var mode = "normal";
        if (
          ScriptUI.environment.keyboardState.shiftKey &&
          !ScriptUI.environment.keyboardState.altKey
        ) {
          mode = "parent";
        } else {
          if (
            ScriptUI.environment.keyboardState.shiftKey &&
            ScriptUI.environment.keyboardState.altKey
          ) {
            mode = "delete";
          }
        }
        var undoMode = mode == "normal" ? "apply" : mode;
        app.beginUndoGroup(
          RDT.scriptName + " " + undoMode.toString() + " texture " + this.text,
        );
        RDT.applyErrors = [];
        applyTexture(
          RDT.strTexturePrefix + RDT.dropdown.selection.text,
          this.helpTip.split("\n")[0],
          this.name,
          mode,
          ScriptUI.environment.keyboardState.altKey,
        );
        app.endUndoGroup();
        if (RDT.applyErrors.length > 0) {
          var errorMsg =
            RDT.applyErrors.length > 1
              ? "The following errors were encountered:\n"
              : "" + RDT.applyErrors.join("\n\n");
          if (errorMsg.match(/CUSTOM_VALUE/)) {
            errorMsg =
              "Due to limitation in the After Effects api, custom values are currently not supported.\n\n" +
              errorMsg;
          }
          alertUI(errorMsg);
        }
        RDT.applyErrors = [];
        savePal.active = true;
        var saveSel = RDT.dropdown.selection.index;
        populatePalettesDropDown(RDT.dropdown);
        RDT.dropdown.selection = saveSel;
      } else {
        alertUI(RDT.errSelectPalette);
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
        var offset = this.strokeWidth / 2;
        var dims = [
          -offset / 2,
          -offset / 2,
          size[0] + offset,
          size[1] + offset,
        ];
        if (this.imagePath && File(this.imagePath).exists) {
          var imageObj = ScriptUI.newImage(
            this.imagePath,
            this.imagePath,
            this.imagePath,
            this.imagePath,
          );
          graphics.drawImage(imageObj, dims[0], dims[1], dims[2], dims[3]);
        } else {
          switch (this.buttonShape) {
            case "rect":
              graphics.rectPath(
                dims[0] + this.strokeWidth,
                dims[1] + this.strokeWidth,
                dims[2] - this.strokeWidth * 2,
                dims[3] - this.strokeWidth * 2,
              );
              break;
            case "ellipse":
              graphics.ellipsePath(
                dims[0] + this.strokeWidth,
                dims[1] + this.strokeWidth,
                dims[2] - this.strokeWidth * 2,
                dims[3] - this.strokeWidth * 2,
              );
              break;
            case "roundedCornersRect":
              graphics = drawRectWithRoundedCorners(
                graphics,
                dims[0] + this.strokeWidth,
                dims[1] + this.strokeWidth,
                dims[2] - this.strokeWidth * 1,
                dims[3] - this.strokeWidth * 1,
                4,
                false,
              );
              break;
            case "straightCornersRect":
              graphics = drawRectWithRoundedCorners(
                graphics,
                dims[0] + this.strokeWidth,
                dims[1] + this.strokeWidth,
                dims[2] - this.strokeWidth * 1,
                dims[3] - this.strokeWidth * 1,
                6,
                true,
              );
              break;
          }
        }
        this.fillBrush = graphics.newBrush(
          graphics.BrushType.SOLID_COLOR,
          this.fillColor,
        );
        graphics.fillPath(fillBrush);
        if (this.buttonStroke) {
          var strokePen = graphics.newPen(
            graphics.PenType.SOLID_COLOR,
            this.strokeColor,
            this.strokeWidth,
          );
          graphics.strokePath(strokePen);
        }
        var textPen = graphics.newPen(
          graphics.PenType.SOLID_COLOR,
          this.textColor,
          1,
        );
        var textFont = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.REGULAR,
          13,
        );
        if (this.text) {
          graphics.drawString(
            text,
            textPen,
            size[0] / 2.05 - graphics.measureString(text)[0] / 2,
            size[1] / 2.1 - graphics.measureString(text)[1] / 2,
            textFont,
          );
        }
      } catch (e) {
        $.writeln(e);
      }
    }
  }
  function drawRectWithRoundedCorners(gfx, x, y, w, h, r, straight) {
    if (straight == undefined) {
      straight = false;
    }
    var p1 = [x + r, y];
    gfx.moveTo(p1[0] - 1, p1[1]);
    var p2 = [w - r, y];
    gfx.lineTo(p2[0], p2[1]);
    var p3 = [w, y + r];
    if (!straight) {
      gfx.lineTo(p2[0] + (p3[0] - p2[0]) * 0.25, p2[1] + (p3[1] - p2[1]) * 0.1);
      gfx.lineTo(p2[0] + (p3[0] - p2[0]) * 0.5, p2[1] + (p3[1] - p2[1]) * 0.25);
      gfx.lineTo(p2[0] + (p3[0] - p2[0]) * 0.75, p2[1] + (p3[1] - p2[1]) * 0.5);
      gfx.lineTo(
        p2[0] + (p3[0] - p2[0]) * 0.95,
        p2[1] + (p3[1] - p2[1]) * 0.85,
      );
    }
    gfx.lineTo(p3[0], p3[1]);
    var p4 = [w, h - r];
    gfx.lineTo(p4[0], p4[1]);
    var p5 = [w - r, h];
    if (!straight) {
      gfx.lineTo(p4[0] + (p5[0] - p4[0]) * 0.1, p4[1] + (p5[1] - p4[1]) * 0.25);
      gfx.lineTo(p4[0] + (p5[0] - p4[0]) * 0.25, p4[1] + (p5[1] - p4[1]) * 0.5);
      gfx.lineTo(p4[0] + (p5[0] - p4[0]) * 0.5, p4[1] + (p5[1] - p4[1]) * 0.75);
      gfx.lineTo(
        p4[0] + (p5[0] - p4[0]) * 0.85,
        p4[1] + (p5[1] - p4[1]) * 0.95,
      );
    }
    gfx.lineTo(p5[0], p5[1]);
    var p6 = [x + r, h];
    gfx.lineTo(p6[0], p6[1]);
    var p7 = [x, h - r];
    if (!straight) {
      gfx.lineTo(p6[0] + (p7[0] - p6[0]) * 0.25, p6[1] + (p7[1] - p6[1]) * 0.1);
      gfx.lineTo(p6[0] + (p7[0] - p6[0]) * 0.5, p6[1] + (p7[1] - p6[1]) * 0.25);
      gfx.lineTo(p6[0] + (p7[0] - p6[0]) * 0.75, p6[1] + (p7[1] - p6[1]) * 0.5);
      gfx.lineTo(
        p6[0] + (p7[0] - p6[0]) * 0.95,
        p6[1] + (p7[1] - p6[1]) * 0.85,
      );
    }
    gfx.lineTo(p7[0], p7[1]);
    var p8 = [x, y + r];
    gfx.lineTo(p8[0], p8[1]);
    if (!straight) {
      gfx.lineTo(p8[0] + (p1[0] - p8[0]) * 0.1, p8[1] + (p1[1] - p8[1]) * 0.25);
      gfx.lineTo(p8[0] + (p1[0] - p8[0]) * 0.25, p8[1] + (p1[1] - p8[1]) * 0.5);
      gfx.lineTo(p8[0] + (p1[0] - p8[0]) * 0.5, p8[1] + (p1[1] - p8[1]) * 0.75);
      gfx.lineTo(
        p8[0] + (p1[0] - p8[0]) * 0.85,
        p8[1] + (p1[1] - p8[1]) * 0.95,
      );
    }
    gfx.lineTo(p1[0], p1[1]);
    return gfx;
  }
  function getPaletteCompName(paletteName) {
    var nameSuffix = prompt(
      RDT.strPaletteName,
      RDT.paletteSculptors[
        Math.floor(Math.random() * RDT.paletteSculptors.length - 1)
      ],
    );
    if (!nameSuffix) {
      return false;
    }
    nameSuffix = nameSuffix.replace(new RegExp("^" + RDT.strTexturePrefix), "");
    var nameRegex = RDT.isTrial
      ? "^" + RDT.strTexturePrefix
      : "^" + RDT.strTexturePrefix + nameSuffix + " *?([0-9]+)?$";
    RDTf.textureComps = checkItems(
      nameRegex,
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    );
    if (RDT.isTrial && RDTf.textureComps.length > 0) {
      alertUI(RDT.errTrialMax);
      return false;
    }
    var nextNum =
      " " + (RDTf.textureComps.length > 0) &&
      RDTf.textureComps[RDTf.textureComps.length - 1].name.match(
        new RegExp("[0-9]+$"),
      )
        ? padDigits(
            parseInt(
              RDTf.textureComps[RDTf.textureComps.length - 1].name.match(
                new RegExp("[0-9]+$"),
              ),
              10,
            ) + 1,
            RDT.numPaletteNumPadding,
          )
        : RDTf.textureComps.length == 0
          ? ""
          : "01";
    return nameSuffix + nextNum;
  }
  function capitalizeFirstLetter(string) {
    return string != undefined
      ? string.charAt(0).toUpperCase() + string.slice(1)
      : string;
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
  function scanTexturesIntoPalette(isAdd) {
    if (isAdd && RDT.dropdown.selection == null) {
      alertUI("Please select a texture palette from the dropdown");
      return false;
    }
    RDT.paletteName = "";
    RDT.scanErrors = [];
    var selection = determineSelectionScope();
    if (selection == null) {
      alertUI("Please make a selection");
      return false;
    }
    var paletteName =
      RDT.dropdown.selection == null ? undefined : RDT.dropdown.selection.text;
    addPaletteComp(RDT.dropdown, selection, paletteName, isAdd);
    if (!isAdd) {
      for (var i = 0; i < RDT.rayAddedCompsArray.length; i += 1) {
        addHiddenTextureComp(
          RDT.rayAddedCompsArray[i],
          RDT.strTexturePrefix + RDT.paletteName,
        );
      }
    }
    RDT.compsArray = [];
    RDT.sampleApplyRayColorArray = [];
    RDT.sampleCounter = 0;
    RDT.scanErrors = [];
  }
  function addPaletteComp(
    dropdown,
    selection,
    paletteName,
    addToExistingPalette,
  ) {
    var currentComp =
      app.project.activeItem != null &&
      app.project.activeItem instanceof CompItem
        ? app.project.activeItem
        : null;
    var paletteCompFolders = checkItems(
      "^" + RDT.strTextureMainFolder + "$",
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
        : app.project.items.addFolder(RDT.strTextureMainFolder);
    if (addToExistingPalette == undefined || !addToExistingPalette) {
      var uiBrightness = 0.5;
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
      if (!addToExistingPalette) {
        paletteName = undefined;
      }
      var newPaletteName =
        paletteName != undefined
          ? paletteName
          : getPaletteCompName(paletteName);
      if (!newPaletteName) {
        return;
      }
      var frameRate = RDT.defaultCompFrameRate;
      if (currentComp != null) {
        frameRate = currentComp.frameRate;
      } else {
        if (
          selection != null &&
          selection[0].frameRate != null &&
          selection[0].frameRate != 0
        ) {
          frameRate = selection[0].frameRate;
        }
      }
      paletteComp = app.project.items.addComp(
        RDT.strTexturePrefix + newPaletteName,
        RDT.objPaletteComp.width,
        RDT.objPaletteComp.height,
        RDT.objPaletteComp.pixelAspect,
        0.1,
        frameRate,
      );
      paletteComp.parentFolder = paletteCompFolder;
      RDTf.textureComps = [];
      paletteComp.bgColor = [uiBrightness, uiBrightness, uiBrightness];
    } else {
      paletteComp = checkItems(
        "^" + RDT.strTexturePrefix + RDT.dropdown.selection.text + "$",
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
            RDT.strTexturePrefix +
            RDT.dropdown.selection.text,
        );
        return;
      }
      paletteComp = paletteComp[0];
    }
    addTexturesToPaletteComp(selection, paletteComp, paletteCompFolder);
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
  function addTexturesToPaletteComp(selection, paletteComp, folder) {
    var paletteTexturesFolders = checkItems(
      "^" + RDT.strTextureFolder + "$",
      app.project.items,
      FolderItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    );
    var paletteTexturesFolder = null;
    for (var i = 0; i < paletteTexturesFolders.length; i += 1) {
      if (paletteTexturesFolders[i].parentFolder == folder) {
        paletteTexturesFolder = paletteTexturesFolders[i];
      }
    }
    if (paletteTexturesFolder == null) {
      paletteTexturesFolder = app.project.items.addFolder(RDT.strTextureFolder);
      paletteTexturesFolder.parentFolder = folder;
    }
    for (var t = 1; t <= paletteComp.numLayers; t += 1) {
      paletteComp.layer(t).selected = false;
    }
    var setCompDuration = 0.1;
    for (var h = 0; h < selection.length; h += 1) {
      var currentLayer = selection[h];
      var saveLabel = currentLayer.label != null ? currentLayer.label : 0;
      var saveName = currentLayer.name;
      if (
        newLayer instanceof FolderItem ||
        (currentLayer.mainSource != null &&
          currentLayer.mainSource instanceof SolidSource)
      ) {
        continue;
      }
      var duration =
        currentLayer.source &&
        currentLayer.source.mainSource &&
        currentLayer.source.mainSource.isStill
          ? currentLayer.containingComp.frameDuration
          : currentLayer.outPoint - currentLayer.startTime;
      if (isNaN(duration) || duration == 0) {
        duration = RDT.defaultCompDuration;
      }
      var textureType = getTextureType(currentLayer, true);
      if (textureType == "none") {
        continue;
      }
      var newLayer = null;
      switch (textureType) {
        case "addLayer":
          if (currentLayer.containingComp != undefined) {
            if (currentLayer.containingComp.id == paletteComp.id) {
              RDT.applyErrors.push(
                RDT.errCannotAddFromPaletteComp.replace(
                  /%1/,
                  currentLayer.name,
                ),
              );
              continue;
            }
            var saveParent = null;
            if (currentLayer.parent != null) {
              saveParent = currentLayer.parent;
              currentLayer.parent = null;
            }
            if (saveParent != null) {
              currentLayer.parent = saveParent;
            }
            var newLayerArray = copyToCompWorkAround(currentLayer, paletteComp);
            currentLayer = newLayerArray[0];
            newLayer = newLayerArray[1];
            newLayer.startTime += 0 - newLayer.inPoint;
          } else {
            if (currentLayer.id == paletteComp.id) {
              RDT.applyErrors.push(
                RDT.errCannotAddFromPaletteComp.replace(
                  /%1/,
                  currentLayer.name,
                ),
              );
              continue;
            }
            try {
              newLayer = paletteComp.layers.add(currentLayer);
            } catch (e) {
              RDT.applyErrors.push(e.toString() + currentLayer.name);
              continue;
            }
          }
          newLayer.moveToEnd();
          break;
        case "addExpression":
          if (
            currentLayer instanceof PropertyGroup ||
            currentLayer instanceof MaskPropertyGroup
          ) {
            continue;
          }
          if (currentLayer.expression != "") {
            var containingLayer = findContainingLayer(currentLayer);
            if (containingLayer.containingComp.id == paletteComp.id) {
              RDT.applyErrors.push(
                RDT.errCannotAddFromPaletteComp.replace(
                  /%1/,
                  containingLayer.name,
                ),
              );
              continue;
            }
            newLayer = paletteComp.layers.addNull();
            newLayer.name = currentLayer.name + " expression";
            newLayer.position.setValue([
              paletteComp.width / 2,
              paletteComp.height / 2,
            ]);
            newLayer.anchorPoint.setValue([0, 0]);
            newLayer.moveToEnd();
            var myEffect = null;
            if (currentLayer.propertyValueType === PropertyValueType.COLOR) {
              myEffect = newLayer.effect.addProperty("ADBE Color Control");
            } else if (
              currentLayer.propertyValueType === PropertyValueType.OneD
            ) {
              myEffect = currentLayer.matchName.match(/rotation/)
                ? newLayer.effect.addProperty("ADBE Angle Control")
                : newLayer.effect.addProperty("ADBE Slider Control");
            } else {
              myEffect = newLayer.effect.addProperty("ADBE Point Control");
            }
            if (myEffect != null && currentLayer.expression != undefined) {
              myEffect.property(1).expression = currentLayer.expression;
            }
          }
          break;
        case "addTexture":
        case "addShape":
        case "addEffect":
          if (
            currentLayer.containingComp != undefined &&
            currentLayer.containingComp.id == paletteComp.id
          ) {
            RDT.applyErrors.push(
              RDT.errCannotAddFromPaletteComp.replace(/%1/, currentLayer.name),
            );
            continue;
          }
          var newLayerArray = copyToCompWorkAround(currentLayer, paletteComp);
          currentLayer = newLayerArray[0];
          newLayer = newLayerArray[1];
          newLayer.moveToEnd();
          newLayer.startTime += 0 - newLayer.inPoint;
          break;
      }
      if (newLayer != null) {
        resetTransforms(
          newLayer,
          [paletteComp.width / 2, paletteComp.height / 2, 0],
          false,
        );
        newLayer.enabled = true;
        newLayer.solo = false;
        newLayer.shy = false;
        newLayer.blendingMode = BlendingMode.NORMAL;
        newLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
        if (!(textureType == "addExpression" || textureType == "addShape")) {
          newLayer.anchorPoint.setValue([
            newLayer.width / 2,
            newLayer.height / 2,
          ]);
        }
        if (newLayer.position.numKeys == 0) {
          newLayer.position.setValue([
            paletteComp.width / 2,
            paletteComp.height / 2,
          ]);
        }
        setCompDuration = Math.max(setCompDuration, newLayer.outPoint);
      }
    }
    paletteComp.duration = setCompDuration;
  }
  function addPaletteCompComment(selection) {
    var items = checkItems(
      new RegExp("^" + RDT.strTexturePrefix),
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    );
    items.sort(iSort);
    RDTf.textureComps = items.slice(0);
    for (var i = 0; i < items.length; i += 1) {
      if (i == selection) {
        if (items[i].comment == "") {
          items[i].comment = RDT.strLastSelected;
        }
      } else {
        if (items[i].comment == RDT.strLastSelected) {
          items[i].comment = "";
        }
      }
    }
  }
  function populatePalettesDropDown(dropdown, selection) {
    var items = checkItems(
      new RegExp("^" + RDT.strTexturePrefix),
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    );
    items.sort(iSort);
    RDTf.textureComps = items.slice(0);
    var mySel = null;
    if (dropdown != null) {
      try {
        dropdown.removeAll();
        var length = RDT.isTrial
          ? Math.max(items.length, Math.min(items.length, 1))
          : items.length;
        var counter = 0;
        for (var i = 0; i < length; i += 1) {
          dropdown.add(
            "item",
            items[i].name.replace(new RegExp("^" + RDT.strTexturePrefix), ""),
          );
          if (
            selection == undefined &&
            items[i].comment == RDT.strLastSelected
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
          setButtonLabels(items[mySel]);
          return mySel;
        } else {
          setButtonLabels();
        }
      } catch (e) {}
    } else {
      setButtonLabels();
    }
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
  function indexSort(a, b) {
    if (a.index != undefined && b.index != undefined) {
      var x = a.index;
      var y = b.index;
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return 0;
    }
  }
  function createResourceFile(filename, binaryString, isZip, resourceFolder) {
    if (!isSecurityPrefSet()) {
      return;
    }
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
              RDTf.winUnZip.fsName +
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
            RDT.errMissingFile
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
  function isMainDisplayRetina() {
    var isRetina = false;
    var cmd =
      $.os.indexOf("Mac") != -1
        ? "system_profiler SPDisplaysDataType | grep Resolution"
        : "wmic desktopmonitor get PixelsPerXLogicalInch";
    var response = system.callSystem(cmd);
    var mainDisplay = response.split("\n");
    isRetina =
      $.os.indexOf("Mac") != -1
        ? mainDisplay != null &&
          mainDisplay.length > 0 &&
          mainDisplay[0].toString().match(/Retina/)
        : mainDisplay != null &&
          mainDisplay.length > 1 &&
          parseInt(mainDisplay[1], 10) >= 120;
    return isRetina;
  }
  function addHiddenTextureComp(comp, paletteName) {
    var textureComps = checkItems(
      "^" + paletteName + "$",
      app.project.items,
      CompItem,
      1,
      app.project.numItems,
      checkType,
      matchName,
    );
    if (textureComps.length >= 1) {
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
        try {
          paletteLayer = comp.layers.add(textureComps[0]);
          newPalette = true;
        } catch (e) {}
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
        if (paletteLayer.hasAudio) {
          paletteLayer.audioEnabled = false;
        }
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
  function isTexture(layer) {
    return (
      (layer.isTrackMatte || checkForRdtSetMatteEffect(layer)) && layer.source
    );
  }
  function applyTexture(
    textureCompName,
    layerName,
    layerIndex,
    mode,
    isReplace,
  ) {
    function timeRemapTexture(matchLayer) {
      if (matchLayer == undefined) {
        matchLayer = false;
      }
      var newTextureLayerLengthInFrames = Math.round(
        newTextureLayerLength / textureLayer.containingComp.frameDuration,
      );
      if (
        newTextureLayer.canSetTimeRemapEnabled &&
        ((!matchLayer && newTextureLayerLengthInFrames <= 1) ||
          (matchLayer && myLayerLength > newTextureLayerLength))
      ) {
        newTextureLayer.timeRemapEnabled = true;
        if (newTextureLayerLengthInFrames <= 1) {
          newTextureLayer.timeRemap.setInterpolationTypeAtKey(
            1,
            KeyframeInterpolationType.HOLD,
            KeyframeInterpolationType.HOLD,
          );
          if (newTextureLayer.timeRemap.numKeys == 2) {
            newTextureLayer.timeRemap.removeKey(2);
          }
          newTextureLayer.outPoint = comp.duration;
        } else {
          var secondKeyValueMinus1Frame = newTextureLayer.timeRemap.valueAtTime(
            newTextureLayer.timeRemap.keyTime(
              newTextureLayer.timeRemap.numKeys,
            ) -
              1 / comp.frameRate,
            true,
          );
          newTextureLayer.timeRemap.setValueAtTime(
            newTextureLayer.timeRemap.keyTime(
              newTextureLayer.timeRemap.numKeys,
            ) -
              1 / comp.frameRate,
            secondKeyValueMinus1Frame,
          );
          if (newTextureLayer.timeRemap.numKeys > 2) {
            newTextureLayer.timeRemap.removeKey(
              newTextureLayer.timeRemap.numKeys,
            );
          }
          if (newTextureLayer.timeRemap.expression == "") {
            newTextureLayer.timeRemap.expression = 'loopOut("cycle",1)';
          }
        }
      }
    }
    if (isReplace == undefined) {
      isReplace = false;
    }
    if (mode != "invert") {
      try {
        var textureComp = RDTf.textureComps[RDT.dropdown.selection.index];
        if (textureComp == undefined || textureComp == null) {
          alertUI(
            "Could not find texture comp " +
              RDT.strTexturePrefix +
              RDT.dropdown.selection.text +
              "\nPlease click the refresh button and try again",
          );
          return false;
        }
      } catch (e) {
        RDT.applyErrors.push(RDT.errPaletteCompInvalid);
        return false;
      }
      var textureLayer = textureComp.layer(layerIndex);
      if (textureLayer.name != layerName) {
        RDT.applyErrors.push(
          "Please button no longer matches the texture comp.\nPlease click the refresh button and try again",
        );
        return false;
      }
      var textureType = getTextureType(textureLayer);
    }
    if (mode == "delete") {
      textureLayer.remove();
      return true;
    }
    var comp = app.project.activeItem;
    if (comp == null) {
      RDT.applyErrors.push(RDT.errNoCompSelected);
      return false;
    }
    if (
      textureType != "addShape" &&
      textureType != "addTexture" &&
      textureType != "addEffect" &&
      textureType != "addExpression" &&
      comp.selectedLayers.length == 0
    ) {
      RDT.applyErrors.push(RDT.errNoLayersSelected);
      return false;
    }
    if (comp.name.match(new RegExp("^" + RDT.strTexturePrefix))) {
      RDT.applyErrors.push(RDT.errIsPaletteComp);
      return false;
    }
    RDT.propCount = 0;
    var isGroupRecurse = false;
    if (mode == undefined) {
      mode = "select";
    }
    var compsArray = [comp];
    for (var j = 0; j < compsArray.length; j += 1) {
      var layerMode =
        compsArray[j] instanceof CompItem &&
        compsArray[j].selectedProperties.length == 0 &&
        compsArray[j].selectedLayers.length > 0;
      if (layerMode) {
        var start = j > 0 ? 1 : 0;
        if (compsArray[j].selectedLayers.length > 0) {
          var selLayers = [].concat(compsArray[j].selectedLayers);
          selLayers.sort(indexSort);
        }
        var compLayersLength =
          j > 0 ? compsArray[j].numLayers : selLayers.length - 1;
        var progressDlg = progressUI(compsArray.length, mode);
        RDT.stopSearch = false;
        var addLayer = false;
        if (textureType == "addShape" && compLayersLength == -1) {
          compLayersLength = 0;
          addLayer = true;
        }
        var myLayerStart = null;
        var myLayerStartOffset = 1;
        var progBarAdd = j > 0 ? 0 : 1;
        for (var h = start; h <= compLayersLength; h++) {
          if (RDT.stopSearch) {
            break;
          }
          var myLayer = null;
          if (!addLayer) {
            myLayer = j > 0 ? compsArray[j].layer(h) : selLayers[h];
            if (isReplace && !myLayer.source) {
              RDT.applyErrors.push(
                RDT.errCannotReplaceLayerSource.replace(
                  /%1/,
                  myLayer.index + ". " + myLayer.name,
                ),
              );
              continue;
            }
            if (
              !(textureLayer instanceof ShapeLayer) &&
              !isReplace &&
              (myLayer.hasTrackMatte || myLayer.isTrackMatte) &&
              mode != "invert" &&
              textureType != "addEffect"
            ) {
              RDT.applyErrors.push(
                RDT.errCannotTextureMatte.replace(
                  /%1/,
                  myLayer.index + ". " + myLayer.name,
                ),
              );
              continue;
            }
            if (h == start) {
              var foundKeys = recursePropertyGroup(
                textureLayer,
                textureLayer,
                undefined,
                undefined,
                true,
                undefined,
                foundKeys,
              );
              if (!foundKeys) {
                textureLayer.opacity.setValueAtTime(
                  0,
                  textureLayer.opacity.value,
                );
              }
              myLayerStart = myLayer;
            } else {
              myLayerStartOffset = 2;
            }
            updateProgBar(
              progressDlg,
              j + 1,
              compsArray[j].name,
              compsArray.length,
              h + progBarAdd,
              myLayer.index + ". " + myLayer.name,
              compLayersLength + progBarAdd,
            );
          }
          RDT.addedRaytoComp = false;
          if (
            RDT.scanRecurse &&
            myLayer.source instanceof CompItem &&
            !myLayer.source.name.match(
              new RegExp("^" + RDT.strTexturePrefix),
            ) &&
            !isInArrayComp(myLayer.source, compsArray)
          ) {
            compsArray.push(myLayer.source);
          }
          switch (mode) {
            case "normal":
            case "parent":
              switch (textureType) {
                case "addEffect":
                  if (addLayer) {
                    var newLayerArray = copyToCompWorkAround(
                      textureLayer,
                      comp,
                    );
                    textureLayer = newLayerArray[0];
                    var newTextureLayer = newLayerArray[1];
                    newTextureLayer.startTime =
                      myLayer != undefined
                        ? myLayer.inPoint -
                          textureLayer.inPoint +
                          textureLayer.startTime
                        : newTextureLayer.startTime +
                          comp.time -
                          newTextureLayer.inPoint;
                    newTextureLayer.outPoint = comp.duration;
                    if (RDT.replaceValueInExpression) {
                      updateValueWithSourceLink(textureLayer, newTextureLayer);
                    }
                  } else {
                    copyPropertiesFromLayer(
                      textureLayer.property("ADBE Effect Parade"),
                      myLayer.property("ADBE Effect Parade"),
                      true,
                      true,
                      comp.time - textureLayer.inPoint,
                      true,
                    );
                    copyPropertiesFromLayer(
                      textureLayer.property("ADBE Layer Styles"),
                      myLayer.property("ADBE Layer Styles"),
                      true,
                      true,
                      comp.time - textureLayer.inPoint,
                      true,
                    );
                  }
                  break;
                case "addTexture":
                  if (RDT.matteState.toString().match(/2|2i/)) {
                    if (!(textureLayer.source instanceof CompItem)) {
                      if (progressDlg != undefined) {
                        progressDlg.close();
                      }
                      RDT.applyErrors.push(RDT.errTextureMustBeComp);
                      return false;
                    }
                  }
                  if (isReplace) {
                    var newTextureLayer = myLayer;
                    var saveOutPoint = myLayer.outPoint;
                    var newTextureLayerLength =
                      textureLayer.outPoint - textureLayer.inPoint;
                    var myLayerLength = myLayer.outPoint - myLayer.inPoint;
                    if (
                      myLayer.canSetTimeRemapEnabled &&
                      myLayer.timeRemapEnabled
                    ) {
                      myLayer.timeRemapEnabled = false;
                    }
                    myLayer.replaceSource(textureLayer.source, true);
                    timeRemapTexture(true);
                    myLayer.name = myLayer.name.replace(
                      / - .+/,
                      "-" + textureLayer.name,
                    );
                    myLayer.outPoint = saveOutPoint;
                    break;
                  }
                  var newLayerArray = copyToCompWorkAround(
                    textureLayer,
                    comp,
                    myLayerStart,
                    myLayerStartOffset,
                  );
                  textureLayer = newLayerArray[0];
                  var newTextureLayer = newLayerArray[1];
                  RDT.propCount++;
                  newTextureLayer.name =
                    "" + myLayer.name + "-" + newTextureLayer.name;
                  newTextureLayer.label = myLayer.label;
                  newTextureLayer.enabled = myLayer.enabled;
                  if (newTextureLayer.enabled) {
                    newTextureLayer.solo = myLayer.solo;
                  }
                  newTextureLayer.trackMatteType =
                    TrackMatteType.NO_TRACK_MATTE;
                  var newTextureLayerLength =
                    newTextureLayer.outPoint - newTextureLayer.inPoint;
                  var myLayerLength = myLayer.outPoint - myLayer.inPoint;
                  timeRemapTexture(true);
                  newTextureLayer.startTime =
                    myLayer != undefined
                      ? myLayer.inPoint -
                        textureLayer.inPoint +
                        textureLayer.startTime
                      : newTextureLayer.startTime +
                        comp.time -
                        newTextureLayer.inPoint;
                  newTextureLayer.outPoint = myLayer.outPoint;
                  if (newTextureLayer.canSetCollapseTransformation) {
                    newTextureLayer.collapseTransformation = true;
                  }
                  switch (RDT.matteState.toString()) {
                    case "0":
                    case "0i":
                    case "1":
                    case "1i":
                      var layerParent = null;
                      if (myLayer.parent != null) {
                        layerParent = myLayer.parent;
                        myLayer.parent = null;
                      }
                      var saveScale = newTextureLayer.scale.value;
                      resetTransforms(newTextureLayer, myLayer.position.value);
                      if (
                        myLayer instanceof ShapeLayer ||
                        myLayer instanceof TextLayer
                      ) {
                        var shapeLayerRect = myLayer.sourceRectAtTime(
                          comp.time,
                          false,
                        );
                        if (newTextureLayer.anchorPoint.numKeys == 0) {
                          newTextureLayer.anchorPoint.setValue([
                            newTextureLayer.width / 2 +
                              (myLayer.anchorPoint.value[0] -
                                shapeLayerRect.left -
                                shapeLayerRect.width / 2) /
                                (newTextureLayer.scale.value[1] / 100),
                            newTextureLayer.height / 2 +
                              (myLayer.anchorPoint.value[1] -
                                shapeLayerRect.top -
                                shapeLayerRect.height / 2) /
                                (newTextureLayer.scale.value[0] / 100),
                          ]);
                        }
                      } else {
                        if (newTextureLayer.anchorPoint.numKeys == 0) {
                          newTextureLayer.anchorPoint.setValue([
                            newTextureLayer.width / 2 +
                              (myLayer.anchorPoint.value[0] -
                                myLayer.width / 2) /
                                (newTextureLayer.scale.value[1] / 100),
                            newTextureLayer.height / 2 +
                              (myLayer.anchorPoint.value[1] -
                                myLayer.height / 2) /
                                (newTextureLayer.scale.value[0] / 100),
                          ]);
                        }
                      }
                      if (newTextureLayer.rotation.numKeys == 0) {
                        newTextureLayer.rotation.setValue(
                          myLayer.rotation.value,
                        );
                      }
                      var myLayerDup = copyWithPropertyLinks(
                        myLayer,
                        true,
                        true,
                        false,
                      );
                      myLayerDup.parent = myLayer;
                      resetTransforms(
                        myLayerDup,
                        [myLayerDup.width / 2, myLayerDup.height / 2, 0],
                        true,
                        true,
                      );
                      myLayerDup.name = "" + myLayer.name + "-CloneMatte";
                      newTextureLayer.moveBefore(myLayer);
                      if (layerParent != null) {
                        myLayer.parent = layerParent;
                      }
                      if (RDT.matteState.toString().match(/0/)) {
                        newTextureLayer.trackMatteType = RDT.matteState
                          .toString()
                          .match(/i/)
                          ? TrackMatteType.ALPHA_INVERTED
                          : TrackMatteType.ALPHA;
                      } else {
                        newTextureLayer.trackMatteType = RDT.matteState
                          .toString()
                          .match(/i/)
                          ? TrackMatteType.LUMA_INVERTED
                          : TrackMatteType.LUMA;
                      }
                      if (mode == "parent") {
                        newTextureLayer.parent = myLayer;
                      }
                      break;
                    case "2":
                    case "2i":
                      newTextureLayer.moveBefore(myLayer);
                      var layerParent = null;
                      if (myLayer.parent != null) {
                        layerParent = myLayer.parent;
                        myLayer.parent = null;
                      }
                      resetTransforms(newTextureLayer, myLayer.position.value);
                      if (
                        myLayer instanceof ShapeLayer ||
                        myLayer instanceof TextLayer
                      ) {
                        var shapeLayerRect = myLayer.sourceRectAtTime(
                          comp.time,
                          true,
                        );
                        if (newTextureLayer.anchorPoint.numKeys == 0) {
                          newTextureLayer.anchorPoint.setValue(
                            [
                              newTextureLayer.width / 2,
                              newTextureLayer.height / 2,
                            ] +
                              myLayer.anchorPoint.value -
                              [
                                shapeLayerRect.width / 2,
                                shapeLayerRect.height / 2,
                              ] -
                              [shapeLayerRect.left, shapeLayerRect.top],
                          );
                        }
                      } else {
                        if (newTextureLayer.anchorPoint.numKeys == 0) {
                          newTextureLayer.anchorPoint.setValue(
                            [
                              newTextureLayer.width / 2,
                              newTextureLayer.height / 2,
                            ] +
                              myLayer.anchorPoint.value -
                              [myLayer.width / 2, myLayer.height / 2],
                          );
                        }
                      }
                      if (newTextureLayer.rotation.numKeys == 0) {
                        newTextureLayer.rotation.setValue(
                          myLayer.rotation.value,
                        );
                      }
                      if (!myLayer.collapseTransformation) {
                        tempEffect =
                          newTextureLayer.effect.addProperty("ADBE Geometry2");
                        var transformEffect1Index = tempEffect.propertyIndex;
                        tempEffect.name =
                          mode == "parent" && myLayer.collapseTransformation
                            ? RDT.strTexturePrefix + "Stick Texture to Layer"
                            : RDT.strTexturePrefix + "Adjust Layer";
                      }
                      tempEffect =
                        newTextureLayer.effect.addProperty("ADBE Set Matte3");
                      var setMatteEffectIndex = tempEffect.propertyIndex;
                      tempEffect.name = RDT.strTexturePrefix + "Set Matte";
                      if (!myLayer.collapseTransformation) {
                        tempEffect =
                          newTextureLayer.effect.addProperty("ADBE Geometry2");
                        var transformEffect2Index = tempEffect.propertyIndex;
                        tempEffect.name =
                          RDT.strTexturePrefix + "Stick Texture to Layer";
                      }
                      if (!myLayer.collapseTransformation) {
                        var transformEffect1 = newTextureLayer.effect(
                          transformEffect1Index,
                        );
                        transformEffect1("ADBE Geometry2-0001").expression =
                          'thisLayer.effect("RDT - Stick Texture to Layer")("ADBE Geometry2-0002");';
                        transformEffect1("ADBE Geometry2-0002").expression =
                          'thisLayer.effect("RDT - Stick Texture to Layer")("ADBE Geometry2-0001");';
                        transformEffect1("ADBE Geometry2-0011").setValue(0);
                        transformEffect1("ADBE Geometry2-0003").expression =
                          'L = effect("RDT - Set Matte")("ADBE Set Matte3-0001");\ns = L.scale[1];\nwhile (L.hasParent){\n\ts = s*L.parent.scale[1]/100;\n\tL = L.parent;\n}\n1/s*10000';
                        transformEffect1("ADBE Geometry2-0004").expression =
                          'L = effect("RDT - Set Matte")("ADBE Set Matte3-0001");\ns = L.scale[0];\nwhile (L.hasParent){\n\ts = s*L.parent.scale[0]/100;\n\tL = L.parent;\n}\n1/s*10000';
                        transformEffect1("ADBE Geometry2-0007").expression =
                          '-thisLayer.effect("RDT - Stick Texture to Layer")("ADBE Geometry2-0007");';
                      }
                      var setMatteEffect =
                        newTextureLayer.effect(setMatteEffectIndex);
                      setMatteEffect("ADBE Set Matte3-0001").setValue(
                        myLayer.index,
                      );
                      if (RDT.matteState.toString().match(/i/)) {
                        setMatteEffect("ADBE Set Matte3-0003").setValue(1);
                      }
                      setMatteEffect("ADBE Set Matte3-0004").setValue(0);
                      if (!myLayer.collapseTransformation) {
                        var transformEffect2 = newTextureLayer.effect(
                          transformEffect2Index,
                        );
                        transformEffect2("ADBE Geometry2-0001").expression =
                          'L = effect("RDT - Set Matte")("ADBE Set Matte3-0001");\ncenterW = [thisComp.width/2,thisComp.height/2];\ncenterL = [L.width/2,L.height/2];\n\noffset = centerW-centerL\nL.anchorPoint+offset';
                        transformEffect2("ADBE Geometry2-0002").expression =
                          'L = effect("RDT - Set Matte")("ADBE Set Matte3-0001");\nL.toComp( L.anchorPoint );';
                        transformEffect2("ADBE Geometry2-0011").setValue(0);
                        transformEffect2("ADBE Geometry2-0003").expression =
                          'L = effect("RDT - Set Matte")("ADBE Set Matte3-0001");\ns = L.scale[1];\nwhile (L.hasParent){\n\ts = s*L.parent.scale[1]/100;\n\tL = L.parent;\n}\ns';
                        transformEffect2("ADBE Geometry2-0004").expression =
                          'L = effect("RDT - Set Matte")("ADBE Set Matte3-0001");\ns = L.scale[0];\nwhile (L.hasParent){\n\ts = s*L.parent.scale[0]/100;\n\tL = L.parent;\n}\ns';
                        transformEffect2("ADBE Geometry2-0007").expression =
                          'L = effect("RDT - Set Matte")("ADBE Set Matte3-0001");\nr = L.rotation;\nwhile(L.hasParent){\n\tr += L.parent.rotation;\n\tL = L.parent;\n}\nr';
                      }
                      if (mode == "parent") {
                        newTextureLayer.parent = myLayer;
                      }
                      if (layerParent != null) {
                        myLayer.parent = layerParent;
                      }
                      break;
                  }
                  break;
                case "addShape":
                  if (
                    addLayer ||
                    (!addLayer && !(myLayer instanceof ShapeLayer))
                  ) {
                    var newLayerArray = copyToCompWorkAround(
                      textureLayer,
                      comp,
                      myLayerStart,
                      myLayerStartOffset,
                    );
                    textureLayer = newLayerArray[0];
                    var newTextureLayer = newLayerArray[1];
                    if (myLayer.hasTrackMatte) {
                      newTextureLayer.moveBefore(comp.layer(myLayer.index - 2));
                    }
                    newTextureLayer.startTime =
                      myLayer != undefined
                        ? myLayer.inPoint -
                          textureLayer.inPoint +
                          textureLayer.startTime
                        : newTextureLayer.startTime +
                          comp.time -
                          newTextureLayer.inPoint;
                    newTextureLayer.outPoint = comp.duration;
                    if (RDT.replaceValueInExpression) {
                      updateValueWithSourceLink(textureLayer, newTextureLayer);
                    }
                    newTextureLayer.enabled = myLayer.enabled;
                    if (newTextureLayer.enabled) {
                      newTextureLayer.solo = myLayer.solo;
                    }
                    newTextureLayer.trackMatteType =
                      TrackMatteType.NO_TRACK_MATTE;
                    resetTransforms(newTextureLayer, [
                      comp.width / 2,
                      comp.height / 2,
                      0,
                    ]);
                  } else if (myLayer instanceof ShapeLayer) {
                    copyPropertiesFromLayer(
                      textureLayer.property("ADBE Root Vectors Group"),
                      myLayer.property("ADBE Root Vectors Group"),
                      true,
                      true,
                      comp.time - textureLayer.inPoint,
                      true,
                    );
                    RDT.propCount++;
                  } else {
                    RDT.applyErrors.push(
                      "Please select a shape layer or deselect or layers to add it to the comp.",
                    );
                  }
                  break;
                case "addExpression":
                  copyPropertiesFromLayer(
                    textureLayer.property("ADBE Transform Group"),
                    myLayer.property("ADBE Transform Group"),
                    false,
                    "only",
                    comp.time - textureLayer.inPoint,
                    false,
                  );
                  break;
              }
              break;
            case "invert":
              if (myLayer.isTrackMatte || myLayer.hasTrackMatte) {
                var layerToInvert = myLayer.hasTrackMatte
                  ? myLayer
                  : comp.layer(myLayer.index + 1);
                switch (layerToInvert.trackMatteType) {
                  case TrackMatteType.ALPHA:
                    layerToInvert.trackMatteType =
                      TrackMatteType.ALPHA_INVERTED;
                    break;
                  case TrackMatteType.ALPHA_INVERTED:
                    layerToInvert.trackMatteType = TrackMatteType.ALPHA;
                    break;
                  case TrackMatteType.LUMA:
                    layerToInvert.trackMatteType = TrackMatteType.LUMA_INVERTED;
                    break;
                  case TrackMatteType.LUMA_INVERTED:
                    layerToInvert.trackMatteType = TrackMatteType.LUMA;
                    break;
                }
              } else {
                var setMatteEffect = findSetMatteEffect(myLayer);
                if (setMatteEffect > 0) {
                  var invertMatte = myLayer.effect(setMatteEffect)(
                    "ADBE Set Matte3-0003",
                  );
                  if (invertMatte.numKeys == 0) {
                    myLayer
                      .effect(setMatteEffect)("ADBE Set Matte3-0003")
                      .setValue(!invertMatte.value);
                  } else {
                    RDT.applyErrors.push(
                      "Cannot invert property with keyframes",
                    );
                  }
                }
              }
              break;
          }
        }
      } else {
        if (compsArray[j].selectedProperties.length == 0) {
          var soloState =
            checkItems(
              "solo",
              comp.layers,
              Object,
              1,
              comp.numLayers,
              checkType,
              matchObject,
            ).length > 0;
          var newLayerArray = copyToCompWorkAround(textureLayer, comp);
          textureLayer = newLayerArray[0];
          var newTextureLayer = newLayerArray[1];
          newTextureLayer.startTime =
            myLayer != undefined
              ? myLayer.inPoint - textureLayer.inPoint + textureLayer.startTime
              : newTextureLayer.startTime + comp.time - newTextureLayer.inPoint;
          newTextureLayer.outPoint = comp.duration;
          var newTextureLayerLength =
            newTextureLayer.outPoint - newTextureLayer.inPoint;
          timeRemapTexture(false);
          if (RDT.replaceValueInExpression) {
            updateValueWithSourceLink(textureLayer, newTextureLayer);
          }
          resetTransforms(newTextureLayer, [
            comp.width / 2,
            comp.height / 2,
            0,
          ]);
          if (soloState && !newTextureLayer.enabled) {
            newTextureLayer.enabled = true;
          }
          if (newTextureLayer.enabled) {
            newTextureLayer.solo = soloState;
          }
          newTextureLayer.shy = false;
          newTextureLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
          RDT.propCount++;
        } else {
          for (var h = 0; h < compsArray[j].selectedProperties.length; h += 1) {
            if (textureType == "addExpression") {
              var myProp = compsArray[j].selectedProperties[h];
              if (
                myProp instanceof PropertyGroup ||
                myProp instanceof MaskPropertyGroup
              ) {
                continue;
              }
              if (
                myProp.canSetExpression &&
                textureLayer.effect.numProperties > 0
              ) {
                myProp.expression = textureLayer.effect(1)(1).expression;
                if (RDT.replaceValueInExpression) {
                  myProp.expression = replaceValueInPropertyExpression(
                    myProp.expression,
                    textureLayer.effect(1)(1),
                    textureLayer.effect(1)(1),
                  );
                }
              }
            }
          }
        }
      }
      if (RDT.propCount > 0) {
        addHiddenTextureComp(compsArray[j], textureCompName);
      }
    }
    if (progressDlg != undefined) {
      progressDlg.close();
    }
    clearOutput();
    RDT.stopSearch = false;
    return true;
  }
  function findCenterOfShapePositions(arr) {
    for (var i = 0; i < arr.length; i += 1) {
      minX = arr[i][0] < minX || minX == null ? arr[i][0] : minX;
      maxX = arr[i][0] > maxX || maxX == null ? arr[i][0] : maxX;
      minY = arr[i][1] < minY || minY == null ? arr[i][1] : minY;
      maxY = arr[i][1] > maxY || maxY == null ? arr[i][1] : maxY;
    }
    return [(minX + maxX) / 2, (minY + maxY) / 2];
  }
  function resetTransforms(
    layer,
    positionValue,
    removeExpressions,
    setZeroExpressions,
  ) {
    if (removeExpressions == undefined) {
      removeExpressions = false;
    }
    if (setZeroExpressions == undefined) {
      setZeroExpressions = false;
    }
    var save3D = layer.threeDLayer;
    if (!save3D) {
      layer.threeDLayer = true;
    }
    if (removeExpressions) {
      layer.anchorPoint.expression = "";
      if (layer.position.dimensionsSeparated) {
        layer.transform("ADBE Position_0").expression = "";
        layer.transform("ADBE Position_1").expression = "";
        layer.transform("ADBE Position_2").expression = "";
      } else {
        layer.position.expression = "";
      }
      layer.xRotation.expression = "0";
      layer.yRotation.expression = "0";
      layer.zRotation.expression = "0";
      layer.orientation.expression = "[0,0,0]";
      layer.scale.expression = "";
      layer.opacity.expression = "";
    }
    if (layer.position.dimensionsSeparated) {
      if (layer.transform("ADBE Position_0").numKeys == 0) {
        layer.transform("ADBE Position_0").setValue(positionValue[0]);
      } else {
        if (layer.transform("ADBE Position_0").numKeys == 1) {
          layer.transform("ADBE Position_0").removeKey(1);
        }
      }
      if (layer.transform("ADBE Position_1").numKeys == 0) {
        layer.transform("ADBE Position_1").setValue(positionValue[1]);
      } else {
        if (layer.transform("ADBE Position_1").numKeys == 1) {
          layer.transform("ADBE Position_1").removeKey(1);
        }
      }
      if (layer.transform("ADBE Position_2").numKeys == 0) {
        layer.transform("ADBE Position_2").setValue(positionValue[2]);
      } else {
        if (layer.transform("ADBE Position_1").numKeys == 1) {
          layer.transform("ADBE Position_1").removeKey(1);
        }
      }
    } else {
      if (layer.position.numKeys == 0) {
        layer.position.setValue(positionValue);
      } else {
        if (layer.position.numKeys == 1) {
          layer.position.removeKey(1);
        }
      }
    }
    if (layer.xRotation.numKeys == 0) {
      layer.xRotation.setValue(0);
    } else {
      if (layer.xRotation.numKeys == 1) {
        layer.xRotation.removeKey(1);
      }
    }
    if (layer.yRotation.numKeys == 0) {
      layer.yRotation.setValue(0);
    } else {
      if (layer.yRotation.numKeys == 1) {
        layer.yRotation.removeKey(1);
      }
    }
    if (layer.zRotation.numKeys == 0) {
      layer.zRotation.setValue(0);
    } else {
      if (layer.zRotation.numKeys == 1) {
        layer.zRotation.removeKey(1);
      }
    }
    if (layer.scale.numKeys == 0) {
      layer.scale.setValue([100, 100, 100]);
    } else {
      if (layer.scale.numKeys == 1) {
        layer.scale.removeKey(1);
      }
    }
    if (layer.opacity.numKeys == 0) {
      layer.opacity.setValue(100);
    } else {
      if (layer.opacity.numKeys == 1) {
        layer.opacity.removeKey(1);
      }
    }
    if (setZeroExpressions) {
      layer.anchorPoint.expression = "[0,0,0]";
      if (layer.position.dimensionsSeparated) {
        layer.transform("ADBE Position_0").expression = "0";
        layer.transform("ADBE Position_1").expression = "0";
        layer.transform("ADBE Position_2").expression = "0";
      } else {
        layer.position.expression = "[0,0,0]";
      }
      layer.scale.expression = "[100,100,100]";
      layer.xRotation.expression = "0";
      layer.yRotation.expression = "0";
      layer.zRotation.expression = "0";
      layer.orientation.expression = "[0,0,0]";
    }
    layer.threeDLayer = save3D;
  }
  function deleteKeyframes(prop, onlyWorkArea) {
    if (onlyWorkArea == undefined) {
      onlyWorkArea = false;
    }
    if (onlyWorkArea) {
      var workAreaIn = Math.max(
        Math.min(comp.displayStartTime, layer.inPoint),
        comp.workAreaStart,
      );
      var workAreaOut = Math.min(
        Math.min(comp.duration, layer.outPoint),
        comp.workAreaStart + comp.workAreaDuration,
      );
    }
    for (var i = prop.numKeys; i > 0; i--) {
      if (
        !onlyWorkArea ||
        (onlyWorkArea &&
          prop.keyTime(i) >= workAreaIn &&
          prop.keyTime(i) <= workAreaOut)
      ) {
        prop.removeKey(i);
      }
    }
  }
  function copyValue(source, target, time, timeOffset) {
    function copyKeyframes(targetProperty, timeOffset) {
      if (targetProperty.isTimeVarying && targetProperty.numKeys > 0) {
        var keyframes = {
          autobezier: [],
          continuous: [],
          easeIn: [],
          easeOut: [],
          interpolateIn: [],
          interpolateOut: [],
          keyIndex: [],
          times: [],
          values: [],
        };
        for (var i = 1, ii = targetProperty.numKeys; i <= ii; i++) {
          keyframes.keyIndex.push(i);
          keyframes.times.push(targetProperty.keyTime(i) + timeOffset);
          keyframes.values.push(targetProperty.keyValue(i));
          keyframes.interpolateIn.push(
            targetProperty.keyInInterpolationType(i),
          );
          keyframes.interpolateOut.push(
            targetProperty.keyOutInterpolationType(i),
          );
          keyframes.autobezier.push(targetProperty.keyTemporalAutoBezier(i));
          keyframes.continuous.push(targetProperty.keyTemporalContinuous(i));
          keyframes.easeIn.push(targetProperty.keyInTemporalEase(i));
          keyframes.easeOut.push(targetProperty.keyOutTemporalEase(i));
        }
        return keyframes;
      } else {
        return target.value;
      }
    }
    function setNewValues(storedValues, targetProperty) {
      if (storedValues.times === undefined) {
        targetProperty.setValue(storedValues);
      } else {
        targetProperty.setValuesAtTimes(
          storedValues.times,
          storedValues.values,
        );
        for (var i = 0, ii = storedValues.keyIndex.length; i < ii; i++) {
          var key = storedValues.keyIndex[i];
          if (
            storedValues.interpolateIn[i] ===
              KeyframeInterpolationType.BEZIER ||
            storedValues.interpolateOut[i] === KeyframeInterpolationType.BEZIER
          ) {
            targetProperty.setTemporalEaseAtKey(
              key,
              storedValues.easeIn[i],
              storedValues.easeOut[i],
            );
          }
          targetProperty.setInterpolationTypeAtKey(
            key,
            storedValues.interpolateIn[i],
            storedValues.interpolateOut[i],
          );
          targetProperty.setTemporalContinuousAtKey(
            key,
            storedValues.continuous[i],
          );
          targetProperty.setTemporalAutoBezierAtKey(
            key,
            storedValues.autobezier[i],
          );
        }
      }
    }
    if (
      target.propertyValueType == PropertyValueType.NO_VALUE ||
      (target.canVaryOverTime && isHidden(target))
    ) {
      return;
    }
    if (time != undefined && target.numKeys == 0) {
      target.setValue(source.valueAtTime(time, false));
    } else {
      if (source.numKeys == 0 && target.numKeys == 0) {
        try {
          target.setValue(source.value);
        } catch (e) {
          RDT.applyErrors.push(
            e
              .toString()
              .replace(
                /a value from this property \([^\)]*\)/,
                'the "' +
                  target.name +
                  '" value from the "' +
                  target.parentProperty.name +
                  '" effect',
              ),
          );
        }
      } else {
        if (timeOffset == undefined) {
          timeOffset = 0;
        }
        try {
          setNewValues(copyKeyframes(source, timeOffset), target);
        } catch (e) {
          RDT.applyErrors.push(e.toString() + target.name);
        }
      }
    }
  }
  function returnPropCompactEnglishExprs(matchName) {
    var propCompactEnglishExprs = {
      "ADBE Accepts Lights": "\'.acceptsLights\'",
      "ADBE Accepts Shadows": "\'.acceptsShadows\'",
      "ADBE Adv Blend Group": "\'.advancedBlending\'",
      "ADBE Ambient Coefficient": "\'.ambient\'",
      "ADBE Anchor Point":
        "((prop.propertyGroup(prop.propertyDepth).property(\'intensity\')!=null) || (prop.propertyGroup(prop.propertyDepth).property(\'zoom\')!=null)) ? \'.pointOfInterest\' : \'.anchorPoint\'",
      "ADBE Audio Group": "\'.audio\'",
      "ADBE Audio Levels": "\'.audioLevels\'",
      "ADBE B Channel Blend": "\'.blue\'",
      "ADBE Blend Interior": "\'.blendInteriorStylesAsGroup\'",
      "ADBE Blend Options Group": "\'.blendingOption\'",
      "ADBE Blend Ranges": "\'.useBlendRangesFromSource\'",
      "ADBE Camera Aperture": "\'.aperture\'",
      "ADBE Camera Blur Level": "\'.blurLevel\'",
      "ADBE Camera Depth of Field": "\'.depthOfField\'",
      "ADBE Camera Focus Distance": "\'.focusDistance\'",
      "ADBE Camera Options Group": "\'.cameraOption\'",
      "ADBE Camera Zoom": "\'.zoom\'",
      "ADBE Casts Shadows": "\'.castsShadows\'",
      "ADBE Diffuse Coefficient": "\'.diffuse\'",
      "ADBE Effect Parade": "\'.effect\'",
      "ADBE G Channel Blend": "\'.green\'",
      "ADBE Global Altitude2": "\'.globalLightAltitude\'",
      "ADBE Global Angle2": "\'.globalLightAngle\'",
      "ADBE Layer Fill Opacity2": "\'.fillOpacity\'",
      "ADBE Layer Styles": "\'.layerStyle\'",
      "ADBE Light Color": "\'.color\'",
      "ADBE Light Cone Angle": "\'.coneAngle\'",
      "ADBE Light Cone Feather 2": "\'.coneFeather\'",
      "ADBE Light Intensity": "\'.intensity\'",
      "ADBE Light Options Group": "\'.lightOption\'",
      "ADBE Light Shadow Darkness": "\'.shadowDarkness\'",
      "ADBE Light Shadow Diffusion": "\'.shadowDiffusion\'",
      "ADBE Light Transmission": "\'.lightTransmission\'",
      "ADBE MTracker Pt Attach Pt": "\'.attachPoint\'",
      "ADBE MTracker Pt Attach Pt Ofst": "\'.attachPointOffset\'",
      "ADBE MTracker Pt Confidence": "\'.confidence\'",
      "ADBE MTracker Pt Feature Center": "\'.featureCenter\'",
      "ADBE MTracker Pt Feature Size": "\'.featureSize\'",
      "ADBE MTracker Pt Search Ofst": "\'.searchOffset\'",
      "ADBE MTracker Pt Search Size": "\'.searchSize\'",
      "ADBE MTrackers": "\'.motionTracker\'",
      "ADBE Mask Feather": "\'.maskFeather\'",
      "ADBE Mask Offset": "\'.maskExpansion\'",
      "ADBE Mask Opacity": "\'.maskOpacity\'",
      "ADBE Mask Parade": "\'.mask\'",
      "ADBE Mask Shape": "\'.maskPath\'",
      "ADBE Material Options Group": "\'.materialOption\'",
      "ADBE Metal Coefficient": "\'.metal\'",
      "ADBE Opacity": "\'.opacity\'",
      "ADBE Orientation": "\'.orientation\'",
      "ADBE Paint Anchor Point": "\'.anchorPoint\'",
      "ADBE Paint Angle": "\'.angle\'",
      "ADBE Paint Begin": "\'.start\'",
      "ADBE Paint Clone Layer": "\'.cloneSource\'",
      "ADBE Paint Clone Position": "\'.clonePosition\'",
      "ADBE Paint Clone Time": "\'.cloneTime\'",
      "ADBE Paint Clone Time Shift": "\'.cloneTimeShift\'",
      "ADBE Paint Color": "\'.color\'",
      "ADBE Paint Diameter": "\'.diameter\'",
      "ADBE Paint End": "\'.end\'",
      "ADBE Paint Flow": "\'.flow\'",
      "ADBE Paint Group": "\'.stroke\'",
      "ADBE Paint Hardness": "\'.hardness\'",
      "ADBE Paint Opacity": "\'.opacity\'",
      "ADBE Paint Position": "\'.position\'",
      "ADBE Paint Properties": "\'.strokeOption\'",
      "ADBE Paint Rotation": "\'.rotation\'",
      "ADBE Paint Roundness": "\'.roundness\'",
      "ADBE Paint Scale": "\'.scale\'",
      "ADBE Paint Shape": "\'.path\'",
      "ADBE Paint Target Channels": "\'.channels\'",
      "ADBE Paint Tip Spacing": "\'.spacing\'",
      "ADBE Paint Transform": "\'.transform\'",
      "ADBE Position": "\'.position\'",
      "ADBE R Channel Blend": "\'.red\'",
      "ADBE Root Vectors Group": "\'.content\'",
      "ADBE Rotate X": "\'.xRotation\'",
      "ADBE Rotate Y": "\'.yRotation\'",
      "ADBE Rotate Z":
        "(prop.propertyGroup(prop.propertyDepth).threeDLayer || (prop.propertyGroup(prop.propertyDepth).property(\'intensity\')!=null) || (prop.propertyGroup(prop.propertyDepth).property(\'zoom\')!=null)) ? \'.zRotation\' : \'.rotation\'",
      "ADBE Scale": "\'.scale\'",
      "ADBE Shininess Coefficient": "\'.specularShininess\'",
      "ADBE Specular Coefficient": "\'.specularIntensity\'",
      "ADBE Text Anchor Point 3D": "\'.anchorPoint\'",
      "ADBE Text Anchor Point Align": "\'.groupingAlignment\'",
      "ADBE Text Anchor Point Option": "\'.anchorPointGrouping\'",
      "ADBE Text Animator Properties": "\'.property\'",
      "ADBE Text Animators": "\'.animator\'",
      "ADBE Text Blur": "\'.blur\'",
      "ADBE Text Character Blend Mode": "\'.interCharacterBlending\'",
      "ADBE Text Character Change Type": "\'.characterAlignment\'",
      "ADBE Text Character Correlation": "\'.correlation\'",
      "ADBE Text Character Offset": "\'.characterOffset\'",
      "ADBE Text Character Range": "\'.characterRange\'",
      "ADBE Text Character Replace": "\'.characterValue\'",
      "ADBE Text Document": "\'.sourceText\'",
      "ADBE Text Expressible Amount": "\'.amount\'",
      "ADBE Text Fill Brightness": "\'.fillBrightness\'",
      "ADBE Text Fill Color": "\'.fillColor\'",
      "ADBE Text Fill Hue": "\'.fillHue\'",
      "ADBE Text Fill Opacity": "\'.fillOpacity\'",
      "ADBE Text Fill Saturation": "\'.fillSaturation\'",
      "ADBE Text First Margin": "\'.firstMargin\'",
      "ADBE Text Force Align Path": "\'.forceAlignment\'",
      "ADBE Text Index End": "\'.end\'",
      "ADBE Text Index Offset": "\'.offset\'",
      "ADBE Text Index Start": "\'.start\'",
      "ADBE Text Last Margin": "\'.lastMargin\'",
      "ADBE Text Levels Max Ease": "\'.easeHigh\'",
      "ADBE Text Levels Min Ease": "\'.easeLow\'",
      "ADBE Text Line Anchor": "\'.lineAnchor\'",
      "ADBE Text Line Spacing": "\'.lineSpacing\'",
      "ADBE Text More Options": "\'.moreOption\'",
      "ADBE Text Opacity": "\'.opacity\'",
      "ADBE Text Path": "\'.path\'",
      "ADBE Text Path Options": "\'.pathOption\'",
      "ADBE Text Percent End": "\'.end\'",
      "ADBE Text Percent Offset": "\'.offset\'",
      "ADBE Text Percent Start": "\'.start\'",
      "ADBE Text Perpendicular To Path": "\'.perpendicularToPath\'",
      "ADBE Text Position 3D": "\'.position\'",
      "ADBE Text Properties": "\'.text\'",
      "ADBE Text Random Seed": "\'.randomSeed\'",
      "ADBE Text Randomize Order": "\'.randomizeOrder\'",
      "ADBE Text Range Advanced": "\'.advanced\'",
      "ADBE Text Range Shape": "\'.shape\'",
      "ADBE Text Range Type2": "\'.basedOn\'",
      "ADBE Text Range Units": "\'.units\'",
      "ADBE Text Render Order": "\'.fillANdStroke\'",
      "ADBE Text Reverse Path": "\'.reversePath\'",
      "ADBE Text Rotation": "\'.zRotation\'",
      "ADBE Text Rotation X": "\'.xRotation\'",
      "ADBE Text Rotation Y": "\'.yRotation\'",
      "ADBE Text Scale 3D": "\'.scale\'",
      "ADBE Text Selector Max Amount": "\'.amount\'",
      "ADBE Text Selector Mode": "\'.mode\'",
      "ADBE Text Selector Smoothness": "\'.smoothness\'",
      "ADBE Text Selectors": "\'.selector\'",
      "ADBE Text Skew": "\'.skew\'",
      "ADBE Text Skew Axis": "\'.skewAxis\'",
      "ADBE Text Spatial Phase": "\'.spatialPhase\'",
      "ADBE Text Stroke Brightness": "\'.strokeBrightness\'",
      "ADBE Text Stroke Color": "\'.strokeColor\'",
      "ADBE Text Stroke Hue": "\'.strokeHue\'",
      "ADBE Text Stroke Opacity": "\'.strokeOpacity\'",
      "ADBE Text Stroke Saturation": "\'.strokeSaturation\'",
      "ADBE Text Stroke Width": "\'.strokeWidth\'",
      "ADBE Text Temporal Freq": "\'.wigglesSecond\'",
      "ADBE Text Temporal Phase": "\'.temporalPhase\'",
      "ADBE Text Track Type": "\'.trackingType\'",
      "ADBE Text Tracking Amount": "\'.trackingAmount\'",
      "ADBE Text Wiggly Lock Dim": "\'.lockDimensions\'",
      "ADBE Text Wiggly Max Amount": "\'.maxAmount\'",
      "ADBE Text Wiggly Min Amount": "\'.minAmount\'",
      "ADBE Text Wiggly Random Seed": "\'.randomSeed\'",
      "ADBE Time Remapping": "\'.timeRemap\'",
      "ADBE Transform Group": "\'.transform\'",
      "ADBE Vector Anchor": "\'.anchorPoint\'",
      "ADBE Vector Ellipse Position": "\'.position\'",
      "ADBE Vector Ellipse Roundness": "\'.roundness\'",
      "ADBE Vector Ellipse Size": "\'.size\'",
      "ADBE Vector Ellipse Stroke Color": "\'.color\'",
      "ADBE Vector Fill Color": "\'.color\'",
      "ADBE Vector Fill Opacity": "\'.opacity\'",
      "ADBE Vector Group Color": "\'.color\'",
      "ADBE Vector Group Miter Limit": "\'.miterLimit\'",
      "ADBE Vector Group Opacity": "\'.opacity\'",
      "ADBE Vector Group Stroke Width": "\'.strokeWidth\'",
      "ADBE Vector Opacity": "\'.opacity\'",
      "ADBE Vector Position": "\'.position\'",
      "ADBE Vector PuckerBloat Amount": "\'.amount\'",
      "ADBE Vector Rect Position": "\'.position\'",
      "ADBE Vector Rect Roundness": "\'.roundness\'",
      "ADBE Vector Rect Size": "\'.size\'",
      "ADBE Vector Rect Stroke Color": "\'.color\'",
      "ADBE Vector Rect Stroke Miter Limit": "\'.miterLimit\'",
      "ADBE Vector Rect Stroke Opacity": "\'.opacity\'",
      "ADBE Vector Rect Stroke Width": "\'.strokeWidth\'",
      "ADBE Vector Repeater Transform": "\'.transform\'",
      "ADBE Vector Rotation": "\'.rotation\'",
      "ADBE Vector Scale": "\'.scale\'",
      "ADBE Vector Skew": "\'.skew\'",
      "ADBE Vector Skew Axis": "\'.skewAxis\'",
      "ADBE Vector Stroke Color": "\'.color\'",
      "ADBE Vector Stroke Dash 1": "\'.dash\'",
      "ADBE Vector Stroke Dash 2": "\'.dash2\'",
      "ADBE Vector Stroke Dash 3": "\'.dash3\'",
      "ADBE Vector Stroke Dash 4": "\'.dash4\'",
      "ADBE Vector Stroke Dash 5": "\'.dash5\'",
      "ADBE Vector Stroke Dash 6": "\'.dash6\'",
      "ADBE Vector Stroke Dash 7": "\'.dash7\'",
      "ADBE Vector Stroke Dash 8": "\'.dash8\'",
      "ADBE Vector Stroke Dash 9": "\'.dash9\'",
      "ADBE Vector Stroke Dashes": "\'.dash\'",
      "ADBE Vector Stroke Gap 1": "\'.gap\'",
      "ADBE Vector Stroke Gap 2": "\'.gap2\'",
      "ADBE Vector Stroke Gap 3": "\'.gap3\'",
      "ADBE Vector Stroke Gap 4": "\'.gap4\'",
      "ADBE Vector Stroke Gap 5": "\'.gap5\'",
      "ADBE Vector Stroke Gap 6": "\'.gap6\'",
      "ADBE Vector Stroke Gap 7": "\'.gap7\'",
      "ADBE Vector Stroke Gap 8": "\'.gap8\'",
      "ADBE Vector Stroke Gap 9": "\'.gap9\'",
      "ADBE Vector Stroke Miter Limit": "\'.miterLimit\'",
      "ADBE Vector Stroke Offset": "\'.offset\'",
      "ADBE Vector Stroke Opacity": "\'.opacity\'",
      "ADBE Vector Stroke Width": "\'.strokeWidth\'",
      "ADBE Vector Transform Group": "\'.transform\'",
      "ADBE Vectors Group": "\'.content\'",
      "bevelEmboss/bevelDirection": "\'.direction\'",
      "bevelEmboss/bevelStyle": "\'.style\'",
      "bevelEmboss/bevelTechnique": "\'.technique\'",
      "bevelEmboss/blur": "\'.size\'",
      "bevelEmboss/enabled": "\'.bevelAndEmboss\'",
      "bevelEmboss/highlightColor": "\'.highlightColor\'",
      "bevelEmboss/highlightMode": "\'.highlightMode\'",
      "bevelEmboss/highlightOpacity": "\'.highlightOpacity\'",
      "bevelEmboss/localLightingAltitude": "\'.altitude\'",
      "bevelEmboss/localLightingAngle": "\'.angle\'",
      "bevelEmboss/shadowColor": "\'.shadowColor\'",
      "bevelEmboss/shadowMode": "\'.shadowMode\'",
      "bevelEmboss/shadowOpacity": "\'.shadowOpacity\'",
      "bevelEmboss/softness": "\'.soften\'",
      "bevelEmboss/strengthRatio": "\'.depth\'",
      "bevelEmboss/useGlobalAngle": "\'.useGlobalLight\'",
      "chromeFX/blur": "\'.size\'",
      "chromeFX/color": "\'.color\'",
      "chromeFX/distance": "\'.distance\'",
      "chromeFX/enabled": "\'.satin\'",
      "chromeFX/invert": "\'.invert\'",
      "chromeFX/localLightingAngle": "\'.angle\'",
      "chromeFX/mode2": "\'.blendMode\'",
      "chromeFX/opacity": "\'.opacity\'",
      "dropShadow/blur": "\'.size\'",
      "dropShadow/chokeMatte": "\'.spread\'",
      "dropShadow/color": "\'.color\'",
      "dropShadow/distance": "\'.distance\'",
      "dropShadow/enabled": "\'.dropShadow\'",
      "dropShadow/layerConceals": "\'.layerKnocksOutDropShadow\'",
      "dropShadow/localLightingAngle": "\'.angle\'",
      "dropShadow/mode2": "\'.blendMode\'",
      "dropShadow/noise": "\'.noise\'",
      "dropShadow/opacity": "\'.opacity\'",
      "dropShadow/useGlobalAngle": "\'.useGlobalLight\'",
      "frameFX/color": "\'.color\'",
      "frameFX/enabled": "\'.stroke\'",
      "frameFX/mode2": "\'.blendMode\'",
      "frameFX/opacity": "\'.opacity\'",
      "frameFX/size": "\'.size\'",
      "frameFX/style": "\'.position\'",
      "gradientFill/align": "\'.alignWithLayer\'",
      "gradientFill/angle": "\'.angle\'",
      "gradientFill/enabled": "\'.gradientOverlay\'",
      "gradientFill/gradientSmoothness": "\'.gradientSmoothness\'",
      "gradientFill/mode2": "\'.blendMode\'",
      "gradientFill/offset": "\'.offset\'",
      "gradientFill/opacity": "\'.opacity\'",
      "gradientFill/reverse": "\'.reverse\'",
      "gradientFill/scale": "\'.scale\'",
      "gradientFill/type": "\'.style\'",
      "innerGlow/AEColorChoice": "\'.colorType\'",
      "innerGlow/blur": "\'.size\'",
      "innerGlow/chokeMatte": "\'.choke\'",
      "innerGlow/color": "\'.color\'",
      "innerGlow/enabled": "\'.innerGlow\'",
      "innerGlow/glowTechnique": "\'.technique\'",
      "innerGlow/gradientSmoothness": "\'.gradientSmoothness\'",
      "innerGlow/innerGlowSource": "\'.source\'",
      "innerGlow/inputRange": "\'.range\'",
      "innerGlow/mode2": "\'.blendMode\'",
      "innerGlow/noise": "\'.noise\'",
      "innerGlow/opacity": "\'.opacity\'",
      "innerGlow/shadingNoise": "\'.jitter\'",
      "innerShadow/blur": "\'.size\'",
      "innerShadow/chokeMatte": "\'.choke\'",
      "innerShadow/color": "\'.color\'",
      "innerShadow/distance": "\'.distance\'",
      "innerShadow/enabled": "\'.innerShadow\'",
      "innerShadow/localLightingAngle": "\'.angle\'",
      "innerShadow/mode2": "\'.blendMode\'",
      "innerShadow/noise": "\'.noise\'",
      "innerShadow/opacity": "\'.opacity\'",
      "innerShadow/useGlobalAngle": "\'.useGlobalLight\'",
      "outerGlow/AEColorChoice": "\'.colorType\'",
      "outerGlow/blur": "\'.size\'",
      "outerGlow/chokeMatte": "\'.spread\'",
      "outerGlow/color": "\'.color\'",
      "outerGlow/enabled": "\'.outerGlow\'",
      "outerGlow/glowTechnique": "\'.technique\'",
      "outerGlow/gradientSmoothness": "\'.gradientSmoothness\'",
      "outerGlow/inputRange": "\'.range\'",
      "outerGlow/mode2": "\'.blendMode\'",
      "outerGlow/noise": "\'.noise\'",
      "outerGlow/opacity": "\'.opacity\'",
      "outerGlow/shadingNoise": "\'.jitter\'",
      "patternFill/align": "\'.linkWithLayer\'",
      "patternFill/enabled": "\'.patternOverlay\'",
      "patternFill/mode2": "\'.blendMode\'",
      "patternFill/opacity": "\'.opacity\'",
      "patternFill/phase": "\'.offset\'",
      "patternFill/scale": "\'.scale\'",
      "solidFill/color": "\'.color\'",
      "solidFill/enabled": "\'.colorOverlay\'",
      "solidFill/mode2": "\'.blendMode\'",
      "solidFill/opacity": "\'.opacity\'",
    };
    return propCompactEnglishExprs[matchName];
  }
  function getPropCompactEnglishExpr(prop, matchName, name, source) {
    var translatedName = returnPropCompactEnglishExprs(matchName);
    if (translatedName !== undefined) {
      return eval(translatedName);
    } else {
      if (
        source.propertyType != PropertyType.INDEXED_GROUP &&
        ((name != undefined &&
          source != undefined &&
          prop.parentProperty.matchName == "ADBE Effect Parade") ||
          (prop.parentProperty.matchName == "ADBE Root Vectors Group" &&
            isInArrayDuplicateProperties(name, prop.parentProperty, "name")))
      ) {
        if (
          !RDT.dontRenameEffects &&
          !prop.name.match(new RegExp(RDT.strTextureSuffix + "$"))
        ) {
          try {
            oldName = prop.name;
            source.name = prop.name + RDT.strTextureSuffix;
            prop.name = source.name;
            app.project.autoFixExpressions(oldName, prop.name);
          } catch (e) {}
        }
        name = prop.name;
        return '("' + name + '")';
      } else {
        if (
          /ADBE [A-Za-z]+ (Group|Atom|Parade)/.test(matchName) ||
          /ADBE Vector (Shape|Filter|Graphic) \- .+/.test(matchName)
        ) {
          return '("' + name + '")';
        } else {
          return '("' + matchName + '")';
        }
      }
    }
  }
  function copyWithPropertyLinks(layer, isRelative, deleteKeys, omitEffects) {
    if (isRelative == undefined) {
      isRelative = true;
    }
    if (deleteKeys == undefined) {
      deleteKeys = false;
    }
    if (omitEffects == undefined) {
      omitEffects = false;
    }
    var myComp = app.project.activeItem;
    var compPath = "thisComp.";
    if (!isRelative) {
      compPath = 'comp("' + myComp.name + '").';
    }
    var path = compPath + 'layer("' + layer.name + '")';
    var dupLayer = !omitEffects
      ? layer.duplicate()
      : copyToCompNew(layer, layer.containingComp, true);
    recursePropertyGroup(
      layer,
      dupLayer,
      path,
      deleteKeys,
      undefined,
      undefined,
    );
    dupLayer.selected = false;
    return dupLayer;
  }
  function recursePropertyGroup(
    source,
    group,
    expressionPath,
    deleteKeys,
    findKeys,
    addPositions,
    foundKeys,
  ) {
    function recursePropertyGroupInner(
      source,
      group,
      expressionPath,
      deleteKeys,
      findKeys,
      addPositions,
    ) {
      for (var i = group.numProperties; i >= 1; i--) {
        if (findKeys && foundKeys) {
          break;
        }
        var path = expressionPath;
        if (group.property(i).enabled && group.property(i).active) {
          if (group.property(i).propertyType == PropertyType.PROPERTY) {
            if (findKeys && !foundKeys) {
              if (group.property(i).numKeys > 0) {
                foundKeys = true;
                return foundKeys;
                break;
              } else {
                recursePropertyGroupInner(
                  source.property(i),
                  group.property(i),
                  path,
                  deleteKeys,
                  findKeys,
                  addPositions,
                );
              }
            }
            if (
              !findKeys &&
              group.property(i).canSetExpression &&
              !isHidden(group.property(i))
            ) {
              if (!addPositions) {
                try {
                  var propName = getPropCompactEnglishExpr(
                    group.property(i),
                    group.property(i).matchName,
                    group.property(i).name,
                    source.property(i),
                  );
                  path += propName;
                  if (group.property(i).canSetExpression) {
                    try {
                      group.property(i).expressionEnabled = true;
                      group.property(i).expression = path;
                    } catch (e) {}
                  }
                  if (
                    deleteKeys &&
                    group.property(i).matchName != "ADBE Time Remapping"
                  ) {
                    deleteKeyframes(group.property(i));
                  }
                } catch (err) {}
              } else {
                if (
                  addPositions &&
                  group.property(i).matchName.match(/position|anchor point/i) &&
                  group != undefined &&
                  group.matchName.match(/transform/i)
                ) {
                  if (group.property(i).matchName.match(/vector position/i)) {
                    if (
                      group.parentProperty != undefined &&
                      group.parentProperty.parentProperty != undefined &&
                      group.parentProperty.parentProperty.matchName ==
                        "ADBE Root Vectors Group" &&
                      RDT.addPosition.currentShape !=
                        group.parentProperty.propertyIndex
                    ) {
                      RDT.addPosition.currentShape =
                        group.parentProperty.propertyIndex;
                      RDT.addPosition.shapesPositions.push([0, 0]);
                    }
                    var newPosition =
                      group.property(i).valueAtTime(0, false) -
                      group
                        .property("ADBE Vector Anchor")
                        .valueAtTime(0, false);
                    RDT.addPosition.shapesPositions[
                      RDT.addPosition.shapesPositions.length - 1
                    ] += newPosition;
                  }
                }
              }
            }
          } else {
            if (!findKeys) {
              var propName = getPropCompactEnglishExpr(
                group.property(i),
                group.property(i).matchName,
                group.property(i).name,
                source.property(i),
              );
              path += propName;
            }
            recursePropertyGroupInner(
              source.property(i),
              group.property(i),
              path,
              deleteKeys,
              findKeys,
              addPositions,
            );
          }
        }
      }
    }
    if (findKeys == undefined) {
      findKeys = false;
    }
    if (addPositions == undefined) {
      addPositions = false;
    }
    if (foundKeys == undefined) {
      foundKeys = false;
    }
    if (expressionPath == undefined) {
      expressionPath = "";
    }
    recursePropertyGroupInner(
      source,
      group,
      expressionPath,
      deleteKeys,
      findKeys,
      addPositions,
    );
    if (findKeys) {
      return foundKeys;
    }
  }
  function updateValueWithSourceLink(source, target, resetTransforms) {
    if (resetTransforms == undefined) {
      resetTransforms = true;
    }
    for (var i = 1; i <= target.numProperties; i += 1) {
      if (
        target.property(i).enabled &&
        target.property(i).active &&
        target.property(i) instanceof Property
      ) {
        if (
          target.property(i).isModified &&
          !isHidden(target.property(i)) &&
          !target.property(i).elided &&
          target.property(i).canSetExpression &&
          source.property(i).expression != ""
        ) {
          if (resetTransforms && target.property(i).numKeys == 0) {
            if (target.property(i).matchName == "ADBE Scale") {
              target.property(i).setValue([100, 100, 100]);
            }
            if (
              target.property(i).matchName == "ADBE Orientation" ||
              target.property(i).matchName == "ADBE Rotate X" ||
              target.property(i).matchName == "ADBE Rotate Y" ||
              target.property(i).matchName == "ADBE Rotate Z"
            ) {
              target.property(i).setValue(0);
            }
            if (target.property(i).matchName == "ADBE Opacity") {
              target.property(i).setValue(100);
            }
          }
          var sourceExpression = source.property(i).expression;
          if (
            RDT.replaceValueInExpression &&
            sourceExpression != undefined &&
            sourceExpression.match(/thisProperty.value/)
          ) {
            sourceExpression = replaceValueInPropertyExpression(
              sourceExpression,
              source.property(i),
              target.property(i),
            );
          }
          if (sourceExpression != undefined) {
            target.property(i).expression = sourceExpression;
          }
        }
      }
      if (source.numProperties >= i && target.numProperties >= i) {
        updateValueWithSourceLink(source.property(i), target.property(i));
      }
    }
  }
  function replaceValueInPropertyExpression(sourceExpression, source, target) {
    var myLayer = findContainingLayer(source);
    var myComp = myLayer.containingComp;
    var newLink =
      'comp("' +
      myComp.name +
      '").layer("' +
      myLayer.name +
      '")' +
      findContainingLayer(target, true).join("");
    sourceExpression = sourceExpression.replace(/thisProperty.value/g, newLink);
    return sourceExpression;
  }
  function copyToCompWorkAround(layer, comp, myLayerStart, offset) {
    var saveParent = null;
    if (layer.parent != null) {
      saveParent = layer.parent;
      layer.parent = null;
    }
    if (layer.effect.numProperties == 0) {
      layer.copyToComp(comp);
      newLayer =
        myLayerStart != undefined
          ? comp.layer(myLayerStart.index - offset)
          : comp.layer(1);
    } else {
      layerSave = layer;
      layerSaveName = layer.name;
      tempDupLayer = layer.duplicate();
      tempDupLayer.name = layerSaveName;
      tempDupLayer.moveAfter(layer);
      for (var r = layer.effect.numProperties; r >= 1; r--) {
        layer.effect(r).remove();
      }
      layer.copyToComp(comp);
      newLayer =
        myLayerStart != undefined
          ? comp.layer(myLayerStart.index - offset)
          : comp.layer(1);
      copyPropertiesFromLayer(
        tempDupLayer.property("ADBE Effect Parade"),
        newLayer.property("ADBE Effect Parade"),
        true,
        true,
        0,
        false,
        false,
      );
      layer = tempDupLayer;
      layerSave.remove();
    }
    if (saveParent != null) {
      layer.parent = saveParent;
    }
    for (var m = 1; m <= layer.mask.numProperties; m += 1) {
      newLayer.mask(m).maskMode = layer.mask(m).maskMode;
    }
    return [layer, newLayer];
  }
  function copyToCompNew(layer, comp, omitEffects) {
    var newLayer = null;
    if (layer.source) {
      newLayer = comp.layers.add(layer.source);
    } else {
      if (layer instanceof ShapeLayer) {
        newLayer = comp.layers.addShape();
      } else if (isNullLayer(layer)) {
        newLayer = comp.layers.addNull();
      } else {
        if (layer instanceof TextLayer) {
          newLayer = comp.layers.layers.addText("");
        }
      }
    }
    if (newLayer != null) {
      if (!layer.isNameFromSource) {
        newLayer.name = layer.name;
      }
      if (newLayer.hasAudio) {
        newLayer.audioEnabled = layer.audioEnabled;
      }
      newLayer.motionBlur = layer.motionBlur;
      newLayer.adjustmentLayer = layer.adjustmentLayer;
      newLayer.guideLayer = layer.guideLayer;
      newLayer.threeDLayer = layer.threeDLayer;
      if (layer.environmentLayer) {
        newLayer.environmentLayer = layer.environmentLayer;
      }
      if (newLayer.canSetCollapseTransformation) {
        newLayer.collapseTransformation = layer.collapseTransformation;
      }
      if (layer.frameBlending) {
        newLayer.frameBlendingType = layer.frameBlendingType;
      }
      if (layer.timeRemapEnabled) {
        newLayer.timeRemapEnabled = layer.timeRemapEnabled;
      }
      newLayer.blendingMode = layer.blendingMode;
      newLayer.preserveTransparency = layer.preserveTransparency;
      newLayer.quality = layer.quality;
      newLayer.autoOrient = layer.autoOrient;
      var isAdd = layer instanceof ShapeLayer ? true : undefined;
      newLayer = copyPropertiesFromLayer(
        layer,
        newLayer,
        true,
        true,
        comp.time - layer.inPoint,
        isAdd,
        omitEffects,
      );
    }
    return newLayer;
  }
  function canAddProperty(prop) {
    if (
      prop.parentProperty.matchName == "ADBE Vector Stroke Dashes" ||
      prop.parentProperty.matchName == "ADBE Layer Styles" ||
      prop.parentProperty.matchName == "ADBE Effect Parade"
    ) {
      return !isHidden(prop);
    }
    return false;
  }
  function copyPropertiesFromLayer(
    source,
    target,
    copyKeys,
    copyExpressions,
    timeOffset,
    isAdd,
    omitEffects,
  ) {
    if (copyKeys == undefined) {
      copyKeys = true;
    }
    if (copyExpressions == undefined) {
      copyExpressions = false;
    }
    if (timeOffset == undefined) {
      timeOffset = 0;
    }
    if (isAdd == undefined) {
      isAdd = false;
    }
    if (omitEffects == undefined) {
      omitEffects = false;
    }
    for (var i = 1; i <= source.numProperties; i += 1) {
      var sourceProp = source.property(i);
      var sourcePropName = source.property(i).name;
      var sourcePropMatchName = source.property(i).matchName;
      if (
        (source.property(i) instanceof PropertyGroup ||
          source instanceof PropertyGroup ||
          source.property(i).canSetEnabled) &&
        (source.property(i).isModified || canAddProperty(source.property(i))) &&
        (target.numProperties < i || isAdd)
      ) {
        if (
          omitEffects &&
          (source.property(i).matchName == "ADBE Effect Parade" ||
            source.property(i).matchName == "ADBE Mask Parade" ||
            source.property(i).matchName == "ADBE Layer Styles")
        ) {
          continue;
        }
        if (target.canAddProperty(source.property(i).matchName)) {
          newTarget = target.addProperty(source.property(i).matchName);
          if (newTarget.canSetEnabled) {
            newTarget.enabled = source.property(i).enabled;
          }
          if (
            source.property(i).propertyType != PropertyType.INDEXED_GROUP &&
            newTarget.name != source.property(i).name
          ) {
            newTarget.name = source.property(i).name;
          }
        } else {
          if (
            source.matchName == "ADBE Layer Styles" &&
            source.property(i).canSetEnabled &&
            RDT.layerStyles.hasOwnProperty(source.property(i).matchName)
          ) {
            var myComp = findContainingLayer(target).containingComp;
            myComp.openInViewer();
            app.executeCommand(
              RDT.layerStyles[source.property(i).matchName].id,
            );
          }
          newTarget = target.property(i);
        }
        copyPropertiesFromLayer(
          source.property(i),
          newTarget,
          copyKeys,
          copyExpressions,
          timeOffset,
          isAdd,
          omitEffects,
        );
      }
      if (source.property(i) instanceof Property) {
        if (source.property(i).isModified && !target.property(i).elided) {
          if (copyExpressions != "only") {
            copyValue(
              source.property(i),
              target.property(i),
              undefined,
              timeOffset,
            );
          }
          if (
            copyExpressions &&
            target.property(i).canSetExpression &&
            source.property(i).expression != ""
          ) {
            var sourceExpression = source.property(i).expression;
            if (
              RDT.replaceValueInExpression &&
              sourceExpression.match(/thisProperty.value/)
            ) {
              sourceExpression = replaceValueInPropertyExpression(
                sourceExpression,
                source.property(i),
                target.property(i),
              );
            }
            target.property(i).expression = sourceExpression;
          }
        }
      }
    }
    return target;
  }
  function findSetMatteEffect(layer) {
    for (var i = 1; i <= layer.effect.numProperties; i += 1) {
      if (
        layer.effect(i).matchName == "ADBE Set Matte3" &&
        layer.effect(i).name.match(new RegExp("^" + RDT.strTexturePrefix))
      ) {
        return i;
      }
    }
    return -1;
  }
  function getTextureType(layer, isCreate) {
    if (isCreate == undefined) {
      isCreate = false;
    }
    if (layer instanceof PropertyGroup || layer instanceof MaskPropertyGroup) {
      return "none";
    }
    if (layer.adjustmentLayer && !(layer instanceof ShapeLayer)) {
      return "addEffect";
    }
    if (layer instanceof ShapeLayer) {
      return "addShape";
    }
    if (layer.source && layer.source instanceof CompItem) {
      return "addTexture";
    }
    if (
      layer.source &&
      layer.source instanceof FootageItem &&
      !isNullLayer(layer)
    ) {
      return "addTexture";
    }
    if (
      layer instanceof Property ||
      (isNullLayer(layer) && !layer.adjustmentLayer)
    ) {
      return "addExpression";
    }
    if (layer.source && isCreate) {
      return "addLayer";
    }
    if (isCreate) {
      return "addLayer";
    } else {
      return "none";
    }
  }
  function progressUI(projNumItems, action) {
    var dlg = new Window("palette", RDT.actionPrettyNames[action], undefined, {
      resizeable: false,
    });
    var res =
      "group { \n\t\torientation:\'column\', alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n         margins:0, spacing:5, \n         ";
    if (projNumItems > 1) {
      res +=
        "itemName: Group { \n               orientation:\'column\', margins:0, spacing:5, \n               itemsTxtGrp: Group { \n               alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n                txt: StaticText {preferredSize: [70,-1], alignment:[\'left\',\'top\'] }, \n                item: StaticText {preferredSize: [350,-1], alignment:[\'left\',\'top\'] }, \n                amt: StaticText { preferredSize: [50,-1], alignment:[\'right\',\'top\'] }, \n             }\n         itemProgress: Group { \n\t\t\t\talignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'top\'], \n\t\t\t\tval: Progressbar {  }, \n            }, \n           } \n           ";
    }
    res +=
      "layerName: Group { \n                orientation:\'column\', margins:0, spacing:5, \n                layerTxtGrp: Group { \n                alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n                txt: StaticText {preferredSize: [70,-1], alignment:[\'left\',\'top\'] }, \n                item: StaticText {preferredSize: [350,-1], alignment:[\'left\',\'top\'] }, \n                amt: StaticText { preferredSize: [50,-1], alignment:[\'right\',\'top\'] }, \n             }\n           layerProgress: Group { \n\t\t\t\talignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'top\'], \n\t\t\t\tval: Progressbar {  }, \n            }, \n              } \n        };";
    dlg.grp = dlg.add(res);
    if (projNumItems > 1) {
      dlg.grp.itemName.itemsTxtGrp.txt.text = RDT.actionPrettyNames[action];
      dlg.grp.itemName.itemProgress.val.maximumSize.height = 2;
      dlg.grp.itemName.itemProgress.val.maxvalue = projNumItems;
    }
    dlg.grp.layerName.layerTxtGrp.txt.text = RDT.actionPrettyNames[action];
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
    if ($.hiresTimer > RDT.progressUIDelay) {
      dlgObj.show();
    }
  }
  function alertUI(text, okText, showCancel, cancelText) {
    if (okText == undefined) {
      okText = RDT.strOk;
    }
    if (showCancel == undefined) {
      showCancel = false;
    }
    if (cancelText == undefined) {
      cancelText = RDT.strCancel;
    }
    var dlg = new Window(
      "dialog",
      RDT.scriptName + " v" + RDT.scriptVersion + " Alert",
      undefined,
      { resizeable: false },
    );
    var res =
      "group { \n\t\torientation:\'column\', alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n         txt: StaticText {properties:{multiline:true}}, \n         buttons: Group { \n                 orientation:\'row\',\n                 alignment:[\'fill\',\'fill\'],\n                alignChildren:[\'right\',\'fill\'], \n                 dismiss: Checkbox{text:\'" +
      RDT.strDismiss +
      "\',alignment: [\'left\',\'center\']},\n                 cancel: Button {text:\'" +
      cancelText +
      "\',preferredSize: [-1,25]},\n                 ok: Button {text:\'" +
      okText +
      "\',preferredSize: [-1,25]},\n              }\n           };";
    dlg.grp = dlg.add(res);
    dlg.grp.txt.minimumSize = [400, 50];
    dlg.grp.txt.text = text.toString().replace(/\n/, "\n\n");
    dlg.grp.buttons.dismiss.value = !RDT.showErrors;
    dlg.grp.buttons.dismiss.onClick = function () {
      RDT.showErrors = !this.value;
      app.settings.saveSetting(
        RDT.prefsSectionName,
        "showErrors",
        RDT.showErrors,
      );
    };
    dlg.grp.buttons.cancel.visible = showCancel;
    dlg.grp.buttons.cancel.onClick = function () {
      dlg.close();
      RDT.alertUIReturn = false;
    };
    dlg.grp.buttons.ok.onClick = function () {
      dlg.close();
      RDT.alertUIReturn = true;
    };
    dlg.layout.layout(true);
    dlg.layout.resize();
    dlg.onResizing = dlg.onResize = function () {
      this.layout.resize();
    };
    if (RDT.showErrors) {
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
  function isInArrayDuplicateProperties(needle, haystack, type) {
    if (haystack.numProperties == undefined) {
      return -1;
    }
    var count = -1;
    for (var i = 1; i <= haystack.numProperties; i += 1) {
      if (
        haystack.property(i).hasOwnProperty(type) &&
        needle === haystack.property(i)[type]
      ) {
        count++;
      }
    }
    return count;
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
  function findContainingLayer(prop, getChain, depth) {
    if (getChain == undefined) {
      getChain = false;
    }
    if (depth == undefined) {
      depth = 1;
    }
    if (
      prop.parentProperty != undefined &&
      prop.parentProperty.matchName == "ADBE Effect Parade"
    ) {
      if (
        !RDT.dontRenameEffects &&
        !prop.name.match(new RegExp(RDT.strTextureSuffix + "$"))
      ) {
        oldName = prop.name;
        prop.name = prop.name + RDT.strTextureSuffix;
        app.project.autoFixExpressions(oldName, prop.name);
      }
      name = '("' + prop.name + '")';
    } else {
      name = '("' + prop.matchName + '")';
    }
    var propertyChain = [name];
    while (prop.propertyDepth > depth) {
      if (
        prop.parentProperty.parentProperty.matchName == "ADBE Effect Parade"
      ) {
        if (
          !RDT.dontRenameEffects &&
          prop.parentProperty.propertyType != PropertyType.INDEXED_GROUP &&
          !prop.parentProperty.name.match(
            new RegExp(RDT.strTextureSuffix + "$"),
          )
        ) {
          oldName = prop.name;
          prop.parentProperty.name =
            prop.parentProperty.name + RDT.strTextureSuffix;
          app.project.autoFixExpressions(oldName, prop.name);
        }
        name = '("' + prop.parentProperty.name + '")';
      } else {
        var translatedName = returnPropCompactEnglishExprs(
          prop.parentProperty.matchName,
        );
        if (translatedName !== undefined) {
          name = eval(translatedName);
        } else {
          if (
            /ADBE [A-Za-z]* (Group|Atom|Parade)/.test(
              prop.parentProperty.matchName,
            ) ||
            /ADBE Vector (Shape|Filter|Graphic) \- .+/.test(
              prop.parentProperty.matchName,
            )
          ) {
            name = '("' + prop.parentProperty.name + '")';
          } else {
            name = '("' + prop.parentProperty.matchName + '")';
          }
        }
      }
      propertyChain.unshift(name);
      prop = prop.parentProperty;
    }
    return getChain ? propertyChain : prop.parentProperty;
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
      if (RDT.stopSearch) {
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
                RDT.propCount++;
                break;
              case "invert":
                if (
                  myProperty.parentProperty != null &&
                  myProperty.parentProperty.parentProperty != null &&
                  myProperty.property(j).numKeys == 0
                ) {
                  if (myLayer == undefined) {
                    myLayer = findContainingLayer(myProperty);
                  }
                  if (
                    myProperty.matchName.toLowerCase().match(/fill|stroke/) &&
                    typeof RDT.invertObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ] == "undefined"
                  ) {
                    RDT.invertObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ] = { layer: myLayer };
                  }
                  if (
                    myProperty.matchName.toLowerCase().match(/fill/) &&
                    typeof RDT.invertObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].fill == "undefined"
                  ) {
                    RDT.invertObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].fill = myProperty.property(j);
                  }
                  if (
                    myProperty.matchName.toLowerCase().match(/stroke/) &&
                    typeof RDT.invertObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].stroke == "undefined"
                  ) {
                    RDT.invertObj[
                      myLayer.index +
                        "-" +
                        myProperty.parentProperty.parentProperty.propertyIndex
                    ].stroke = myProperty.property(j);
                  }
                }
                break;
              case "scan":
                if (
                  RDT.includeRayExpressionsInScan ||
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
            var value = mode == "Cap" ? RDT.capBtn : RDT.joinBtn;
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
      }
    }
    return true;
  }
  function checkForRdtSetMatteEffect(layer) {
    for (
      var i = 1;
      i <= layer.property("ADBE Effect Parade").numProperties;
      i += 1
    ) {
      if (
        layer.effect(i).matchName == "ADBE Set Matte3" &&
        layer.effect(i).name.match(new RegExp("^" + RDT.strTexturePrefix))
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
        !RDT.turnOffExpressions &&
        prop.expressionEnabled &&
        isRayExpression(prop);
      var currentValue =
        prop.numKeys == 0
          ? prop.valueAtTime(0, getPreExpressionValue)
          : prop.valueAtTime(prop.keyTime(keyIndex), getPreExpressionValue);
      var num = isInArrayObject(currentValue, RDT.sampleArray, "rgba");
      if (num == null && !addColors) {
        RDT.scanErrors.push(myLayer.name);
        continue;
      }
      if (num == null) {
        num = RDT.sampleArray.length;
        var name = prop.name.match(/^color$/i)
          ? prop.name + " " + num + 1
          : prop.name;
        RDT.sampleArray[num] = { name: name, rgba: currentValue };
        num = num + 1;
      } else {
        num = num + 1;
      }
      var keyTime =
        prop.numKeys == 0
          ? myLayer.containingComp.time
          : prop.keyTime(keyIndex);
      if (mode == "scan") {
        RDT.sampleApplyRayColorArray.push({
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
        RDT.addedRaytoComp = true;
      }
    }
    return true;
  }
  function isNullLayer(myLayer) {
    return (
      myLayer.nullLayer ||
      (myLayer.source &&
        myLayer.source.mainSource &&
        myLayer.source.mainSource instanceof SolidSource &&
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
  function isSecurityPrefSet() {
    var securitySetting = app.preferences.getPrefAsLong(
      "Main Pref Section",
      "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
    );
    if (!(securitySetting == 1)) {
      alert(RDT.errScriptAccess);
      try {
        app.executeCommand(2359);
      } catch (e) {
        alert(e);
      }
    }
    return securitySetting == 1;
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
  function matchObject(item, prop) {
    return item[prop];
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
      alertUI(RDT.errSelectPalette);
      return;
    }
    var comp = RDTf.textureComps[dropdown.selection.index];
    if (
      comp.numLayers > 0 &&
      comp.layer(1) instanceof ShapeLayer &&
      comp.layer(1).effect(1).matchName == "ADBE Color Control"
    ) {
      var palettes = [{ colors: [], title: comp.name }];
      for (var i = 1; i <= comp.layer(1).effect.numProperties; i += 1) {
        palettes[0].colors[palettes[0].colors.length] = [
          rgbToHex(comp.layer(1).effect(i)("ADBE Color Control-0001").value),
          comp.layer(1).effect(i).name,
        ];
      }
    } else {
      alertUI(RDT.strPaletteCompCorrupted);
      return;
    }
    var args = encodeURIComponent(JSONify(palettes, "stringify"));
    var url = "http://aescripts.com/external/ase.php?json=" + args;
    if (confirm(RDT.strExportAseConfirm.replace(/%1/, comp.name))) {
      y55rff.openURL(url);
    }
  }
  function getLabelColors() {
    var defaultLabelColorPreferences = {
      0: { color: [0.5, 0.5, 0.5], id: 0, name: "None" },
      1: {
        color: [0.70980392156863, 0.21960784313725, 0.21960784313725],
        id: 1,
        name: "Red",
      },
      10: {
        color: [0.55686274509804, 0.17254901960784, 0.60392156862745],
        id: 10,
        name: "Purple",
      },
      11: {
        color: [0.90980392156863, 0.57254901960784, 0.05098039215686],
        id: 11,
        name: "Orange",
      },
      12: {
        color: [0.49803921568627, 0.27058823529412, 0.16470588235294],
        id: 12,
        name: "Brown",
      },
      13: {
        color: [0.95686274509804, 0.42745098039216, 0.83921568627451],
        id: 13,
        name: "Fuschia",
      },
      14: {
        color: [0.23921568627451, 0.63529411764706, 0.64705882352941],
        id: 14,
        name: "Cyan",
      },
      15: {
        color: [0.65882352941176, 0.58823529411765, 0.46666666666667],
        id: 15,
        name: "Sandstone",
      },
      16: {
        color: [0.11764705882353, 0.25098039215686, 0.11764705882353],
        id: 16,
        name: "Dark Green",
      },
      2: {
        color: [0.89411764705882, 0.84705882352941, 0.29803921568627],
        id: 2,
        name: "Yellow",
      },
      3: {
        color: [0.66274509803922, 0.79607843137255, 0.78039215686275],
        id: 3,
        name: "Aqua",
      },
      4: {
        color: [0.89803921568627, 0.73725490196078, 0.78823529411765],
        id: 4,
        name: "Pink",
      },
      5: {
        color: [0.66274509803922, 0.66274509803922, 0.7921568627451],
        id: 5,
        name: "Lavender",
      },
      6: {
        color: [0.90588235294118, 0.75686274509804, 0.61960784313725],
        id: 6,
        name: "Peach",
      },
      7: {
        color: [0.70196078431373, 0.78039215686275, 0.70196078431373],
        id: 7,
        name: "Sea Foam",
      },
      8: {
        color: [0.40392156862745, 0.49019607843137, 0.87843137254902],
        id: 8,
        name: "Blue",
      },
      9: {
        color: [0.29019607843137, 0.64313725490196, 0.29803921568627],
        id: 9,
        name: "Green",
      },
    };
    var prefsAsString = getGeneralPrefsFileAsString();
    if (prefsAsString === null) {
      return defaultLabelColorPreferences;
    }
    var labelBlockStartEnd = findLabelBlockStartEnd(prefsAsString);
    var labelColoursStringBlock = prefsAsString.substring(
      labelBlockStartEnd.start,
      labelBlockStartEnd.end,
    );
    var labelColoursArray = labelColoursStringBlock.split("\n");
    labelColoursArray.shift();
    var labelNamesArray = getLabelColorNames();
    var encodedObjectArray = buildEncodedObjectArray(
      labelColoursArray,
      labelNamesArray,
    );
    return encodedObjectArray;
  }
  function findLabelBlockStartEnd(prefsAsString) {
    return {
      end:
        prefsAsString.indexOf(
          '["Label Preference Indices Section 5"]',
          this.start,
        ) - 2,
      start: prefsAsString.indexOf('["Label Preference Color Section 5"]'),
    };
  }
  function getNameOfPrefsFile(path, appVersion, prefsSuffix) {
    if (path.exists) {
      var files = path.getFiles();
      var FilenameRegex = prefsSuffix + "$";
      for (var i = 0; i < files.length; i += 1) {
        if (files[i].displayName.match(new RegExp(FilenameRegex))) {
          return files[i].name;
          break;
        }
      }
    }
    return null;
  }
  function getGeneralPrefsFileAsString() {
    var appVersion = parseFloat(app.version).toFixed(1).toString();
    var prefsSuffix = "-indep-general.txt";
    if (system.osName !== "MacOS") {
      if (appVersion < 12) {
        prefsSuffix = "-x64";
      }
      var folderPath =
        Folder.userData.fsName + "/Adobe/After Effects/" + appVersion;
    } else {
      if (appVersion < 12) {
        prefsSuffix = "-x64";
      }
      var folderPath =
        Folder.userData.parent.fsName +
        "/Preferences/Adobe/After Effects/" +
        appVersion;
    }
    var filePath = getNameOfPrefsFile(
      Folder(folderPath),
      appVersion,
      prefsSuffix,
    );
    if (filePath == null) {
      return null;
    }
    var myFile = File(folderPath + "/" + filePath);
    if (myFile.exists) {
      myFile.open("r");
      var myStr = myFile.read();
      myFile.close();
      return myStr;
    } else if (!myFile.exists) {
      writeLn("Unable to load layer label colors in  " + myFile.fsName);
      return null;
    } else {
      writeLn('Unable to find "' + prefsSuffix + '" in ' + myFile.fsName);
      return null;
    }
  }
  function buildEncodedObjectArray(labelColoursArray, labelNamesArray) {
    var labelColoursObject = {
      0: { color: [0.5, 0.5, 0.5], id: 0, name: "None" },
    };
    for (var i = 0, il = labelColoursArray.length; i < il; i++) {
      var thisLabel = labelColoursArray[i].split(" = ");
      if (thisLabel.length != 2) {
        alertUI(thisLabel[0] + " is missing a color value");
        return false;
      }
      var labelNum = parseInt(
        thisLabel[0].replace("Label Color ID 2 # ", "").replace('"', ""),
        10,
      );
      var thisLabelObject = {
        color: colorToFloat(colorToRGB(colorToHEX(thisLabel[1]))),
        id: labelNum,
        name: labelNamesArray[labelNum - 1],
      };
      labelColoursObject[labelNum] = thisLabelObject;
    }
    return labelColoursObject;
  }
  function getLabelColorNames() {
    var layerLabelColors = [];
    try {
      for (var i = 1; i <= 16; i += 1) {
        if (parseInt(app.version) < 12) {
          layerLabelColors[layerLabelColors.length] =
            app.preferences.getPrefAsString(
              "Label Preference Text Section 5",
              "Label Text ID 2 # " + i,
            );
        } else {
          if (
            app.preferences.havePref(
              "Label Preference Color Section 5",
              "Label Color ID 2 # " + i,
              PREFType.PREF_Type_MACHINE_INDEPENDENT,
            )
          ) {
            layerLabelColors[layerLabelColors.length] =
              app.preferences.getPrefAsString(
                "Label Preference Text Section 5",
                "Label Text ID 2 # " + i,
                PREFType.PREF_Type_MACHINE_INDEPENDENT,
              );
          }
        }
      }
    } catch (e) {
      alertUI(e);
    }
    return layerLabelColors;
  }
  function colorToHEX(color) {
    var hex = "";
    var insideParathenses = false;
    for (var i = 2; i < color.length; i += 1) {
      if (color[i] === '"') {
        insideParathenses = !insideParathenses;
      } else {
        if (insideParathenses) {
          hex += color[i].charCodeAt(0).toString(16);
        } else {
          hex += color[i];
        }
      }
    }
    return hex.toUpperCase();
  }
  function colorToFloat(rgb) {
    function remap(value) {
      return 0 + (1 * (value - 0)) / 255;
    }
    var r = remap(rgb[0]);
    var g = remap(rgb[1]);
    var b = remap(rgb[2]);
    return [r, g, b];
  }
  function colorToRGB(hex) {
    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);
    return [r, g, b];
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
  var RDT = {
    UIChangeCloseThreshold: 330,
    UIChangeOpenThreshold: 250,
    actionPrettyNames: {
      invert: "Inverting",
      normal: "Texturing",
      override: "Overriding",
      relink: "Relinking",
      scan: "Linking",
      select: "Texturing",
      swap: "Swapping",
      unlink: "Unlinking",
    },
    buttonSize: [32, 32],
    buttons: [{ color: [0, 0, 0, 1] }],
    buttonsPerRow: 10,
    confChangeToAnimate:
      'You have keyframes but are not using the "Animate" expression.\nThis will set hold keyframes and the color will not interpolate (it will switch at each key).\n\nWould you prefer to switch to the "Animate" expression?\n\n(saying No will leave the current expression and set all keys to hold keyframes)',
    convertExpressionToKeys: false,
    defaultAseFilename: "Default.ase",
    dontRenameEffects: false,
    errBakeRelink: "The %1 operation had errors on the following layers:",
    errCannotAddFromPaletteComp:
      'Did not add "%1" because it is already in the palette comp',
    errCannotReplaceLayer:
      'Cannot replace layer "%1" because it is not a texture',
    errCannotReplaceLayerSource:
      'Cannot replace layer "%1" because it does not have a source',
    errCannotReplaceTexture:
      'Cannot replace texture layer "%1" because it does not have a source or is not a track or set matte',
    errCannotTextureMatte:
      'Cannot texture layer "%1" because it is a track matte or has a track matte',
    errDiskPermission:
      "Error creating %1\nPlease check the permissions for this folder:\n%2\n\nA temp folder will be used instead",
    errFfx:
      "The necessary ffx file was not able to be created, please make sure After Effects has enough permissions to access the user folder.\nIf the problem persists please contact support for help:  http://aescripts.com/contact",
    errIsPaletteComp: "You cannot apply textures to the texture palette comp",
    errKeyframedProp: "You cannot have any keyframes on the color property.",
    errLinkWithoutSelection:
      "Please select Layers or Properties to link up to the selected texture.",
    errMaxColors:
      "This ase file contains more than the max number of colors allowed. Only the first 100 colors will be used.",
    errMissingFile:
      "Necessary file:\n%1\n\nis missing from:\n%2\n\nplease contact support and send a screenshot of this error\n\n%3",
    errNoCompSelected: "Please select a comp to apply the texture to",
    errNoElgibleCompsFound:
      "No eligle comps found for scanning (Ray texture comps are not scanned)",
    errNoInvertLayersSelected:
      "Please select a shape layer or color property to swap the fill and stroke",
    errNoLayersSelected: "Please select a layer to apply the texture to",
    errNoLayersSelected1:
      "Please select at least one layer or one footage item to add to the texture palette",
    errNoPropsSelected:
      "Please select at least one property to apply the expression to",
    errPaletteCompInvalid:
      "The selected texture palette comp no longer exists in this project\n",
    errRefreshFirst: "Please click the Refresh button first\nError: ",
    errSamePalette:
      "This texture is already applied, select a different texture to replace",
    errScanKeyframes:
      "Currently scanning of keyframed properties is not supported. These keyframed properties were skipped:",
    errScriptAccess:
      'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
    errSelectPalette: "Please select a texture palette from the pulldown menu.",
    errStroke: "Either Fill or Stroke (or both) must be selected",
    errSwapKeyframes:
      "Currently swapping of keyframed properties is not supported. These keyframed properties were skipped:",
    errSwapNonShapeLayer:
      "Swap only works on Shape Layers. These layers were skipped:",
    errTextureMustBeComp:
      'When working in "S" mode the texture must be a comp. Please pre-comp the texture in the palette comp and try again',
    errTrialButtonLimit: "The trial is limited to the first 3 texture buttons",
    errTrialLimit: "This feature is disabled in the trial version",
    errTrialMax: "The trial version is limited to one texture",
    errTurnOffExpressions:
      'You cannot use %1 when "Turn off expression link" is checked. Please turn it off to use this feature',
    errUiLayoutNumMax:
      "The number of texture buttons has been reset to the maximum number allowed for this layout",
    errWrongScanExpressions:
      'Ray requires the default "01 Color" and "05 Animate" expressions to work.\nPlease open the expressions folder and make sure they are the first and fifth expressions in the list, if not please re-install them.',
    forumUrl: "http://aescripts.com/forums/discussion/1481/",
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
    numberOfPaletteShortcutButtonsVertMax: 50,
    objPaletteComp: {
      duration: 1,
      frameRate: 24,
      height: 1200,
      pixelAspect: 1,
      width: 2400,
    },
    paletteSculptors: [
      "Magdalena Abakanowicz",
      "Ivor Abrahams",
      "Vito Acconci",
      "Roger Ackling",
      "Lambert-Sigisbert Adam",
      "Nicolas-Sebastien Adam",
      "Herbert Adams",
      "Robert Adams",
      "Agbonbiofe Adeshina",
      "Yaacov Agam",
      "Agostino di Duccio",
      "Agostino di Giovanni",
      "John Ahearn",
      "Kinji Akagawa",
      "Carl Ethan Akeley",
      "Benjamin Paul Akers",
      "Manasie Akpaliapik",
      "Alessandro Algardi",
      "Ali ibn Muhhamad",
      "Christophe-Gabriel Allegrain",
      "Terry Allen",
      "Charles Alston",
      "Giovanni Antonio Amadeo",
      "Bartolommeo Ammanati",
      "J. Anderson",
      "Carl Andre",
      "Libero Andreotti",
      "Barbara Andrus",
      "Francois Anguier",
      "Michel Anguier",
      "David Annesley",
      "Giovanni Anselmo",
      "Anselmo da Campione",
      "Benedetto Antelami",
      "Horst Antes",
      "Antico",
      "Alexander Archipenko",
      "Siah Armajani",
      "Kenneth Armitage",
      "Henry Hugh Armstead",
      "Alberto Arnoldi",
      "Charles Arnoldi",
      "Arnolfo di Cambio",
      "Jean Arnould",
      "Jean Arp",
      "Egid Quirin Asam",
      "Kosmas Damian Asam",
      "Tommy Ashevak",
      "Kaka Ashoona",
      "Tiziano Aspetti",
      "Federico Assler",
      "Rudy Autio",
      "Alice Aycock",
      "Edward Hodges Baily",
      "Saul Baizerman",
      "Bryant Baker",
      "Miroslaw Balka",
      "Thomas Ball",
      "Bambaia",
      "Baccio Bandinelli",
      "Giovanni Bandini",
      "Thomas Banks",
      "Frida Baranek",
      "Wladimir Baranoff-Rossine",
      "Jean Barbet",
      "Barisano da Trani",
      "Ernst Barlach",
      "George Grey Barnard",
      "Francois Barois",
      "Jean-Auguste Barre",
      "Bill Barrett",
      "Louis-Ernest Barrias",
      "Richmond Barthe",
      "Melchiorre Barthel",
      "Frederic-Auguste Bartholdi",
      "Paul-Albert Bartholome",
      "Paul Wayland Bartlett",
      "Lorenzo Bartolini",
      "Antoine-Louis Barye",
      "Mirko Basaldella",
      "Leonard Baskin",
      "Giovanni Bastianini",
      "David Bates",
      "Harry Bates",
      "Ernesto Bazzaro",
      "Mark Beam",
      "Bruce Beasley",
      "Andre Beauneveu",
      "Gaspar Becerra",
      "Tova Beck-Friedman",
      "William Behnes",
      "Larry Bell",
      "Bartolomeo Bellano",
      "Howard Ben Tre",
      "Benedetto da Maiano",
      "Benedetto da Rovezzano",
      "Lynda Benglis",
      "Billy Al Bengston",
      "Douglas Wayne Bentham",
      "Fletcher Benton",
      "Giovanni Maria Benzoni",
      "Gianlorenzo Bernini",
      "Pietro Bernini",
      "Alonso Berruguete",
      "David Berry",
      "Harry Bertoia",
      "Bertoldo di Giovanni",
      "Pierre Biard",
      "Biduino",
      "Charles Biederman",
      "Boleslas Biegas",
      "Guido Bigarelli",
      "Max Bill",
      "Charles Bell Birch",
      "Leonardo Bistolfi",
      "Ronald Bladen",
      "Barbara Bloom",
      "Etienne Bobillet",
      "Umberto Boccioni",
      "Floriano Bodini",
      "Herbert Boeckl",
      "Sir Joseph Edgar Boehm",
      "Louis-Simon Boizot",
      "Pedro de Bolduque",
      "Bartolomeo Bon",
      "Giovanni Bon",
      "Bonanno da Pisa",
      "Antonio Bonazza",
      "Evaristo Boncinelli",
      "Bonino da Campione",
      "Jonathan Bonner",
      "Lee Bontecou",
      "Pierre Bontemps",
      "Chakaia Booker",
      "Francesco Bordoni",
      "Carl Oscar Borg",
      "Gutzon Borglum",
      "Solon H. Borglum",
      "Luigi Borro",
      "Francois-Joseph Bosio",
      "Edme Bouchardon",
      "Emile Antoine Bourdelle",
      "Louise Bourgeois",
      "Paul Bowden",
      "Pietro Bracci",
      "Dove Bradshaw",
      "Constantin Brancusi",
      "Federico Brandani",
      "Victor Brecheret",
      "Andrea Bregno",
      "Antonio Bregno",
      "Victor David Brenner",
      "Benedetto Briosco",
      "Sir Thomas Brock",
      "Luigi Broggini",
      "Henry Kirke Brown",
      "Filippo Brunelleschi",
      "Emilie Benes Brzezinski",
      "Rembrandt Bugatti",
      "Ken Bunn",
      "Scott Burton",
      "Pol Bury",
      "John Bushnell",
      "Dionigi Bussola",
      "Kendall Buster",
      "Reg Butler",
      "Deborah Butterfield",
      "Pedro Cabrita Reis",
      "Giovanni Caccini",
      "Mike Cadwell",
      "Melchiore Caffa",
      "Jean-Jacques Caffieri",
      "Alexander Stirling Calder",
      "Mary Callery",
      "Aldo Calo",
      "Charles Calverley",
      "Sergio Camargo",
      "Camelio",
      "Girolamo Campagna",
      "Alonso Cano",
      "Antonio Canova",
      "Carmelo Cappello",
      "Kenneth Capps",
      "Rupert Carabin",
      "Sir Anthony Caro",
      "Nicolas Carone",
      "Jean-Baptiste Carpeaux",
      "Ed Carpenter",
      "Albert-Ernest Carrier-Belleuse",
      "Pierre Cartellier",
      "Andrea Cascella",
      "Shaun Cassidy",
      "Bruno Cassinari",
      "Alfio Castelli",
      "Elizabeth Catlett",
      "Danese Cattaneo",
      "Cosimo Cavallaro",
      "Claude-Augustin Cayot",
      "Marie Cazin",
      "Adriano Cecioni",
      "Benvenuto Cellini",
      "Giuseppe Ceracchi",
      "Cesar",
      "Mark Cesark",
      "Lynn Chadwick",
      "Sir Francis Legatt Chantrey",
      "Henri Michel Antoine Chapu",
      "Antoine-Denis Chaudet",
      "Sandro Cherchi",
      "Mykhailo Chereshnovsky",
      "Eduardo Chillida",
      "Joseph Chinard",
      "Ernest Christophe",
      "Virginio Ciminaghi",
      "Valerio Cioli",
      "Matteo Civitale",
      "Geoffrey Clarke",
      "Camille Claudel",
      "Claus de Werve",
      "Jean-Jacques Clerion",
      "Jean Baptiste Clesinger",
      "Clodion",
      "Willie Cole",
      "Ettore Colla",
      "Marie-Anne Collot",
      "Michel Colombe",
      "Marta Colvin Andrade",
      "Pietro Consagra",
      "Charles Henri Joseph Cordier",
      "Nicolas Cordier",
      "Thierry De Cordier",
      "Antonio Corradini",
      "Jean-Pierre Cortot",
      "William Couper",
      "Nicolas Coustou",
      "Guillaume Coustou the Elder",
      "Stephen Cox",
      "Antoine Coysevox",
      "Giacomo Cozzarelli",
      "Tony Cragg",
      "Thomas Crawford",
      "Pierre Jean David d\'Angers",
      "Prosper d\'Epinay",
      "Evrard d\'Orleans",
      "Achille D\'Orsi",
      "Jacobello Dalle Masegne",
      "Giovanni Dalmata",
      "Jules Dalou",
      "Anne Seymour Damer",
      "Vincenzo Danti",
      "Adolf Daucher",
      "Jo Davidson",
      "Ulysses Davis",
      "Leila Daw",
      "Giorgio de Chirico",
      "Walter De Maria",
      "Cathy de Monchaux",
      "Jose de Rivera",
      "Auke de Vries",
      "Richard Deacon",
      "John DeAndrea",
      "John Deare",
      "Jose DeCreeft",
      "Edgar Degas",
      "Dorothy Dehner",
      "Ad Dekkers",
      "Delfino",
      "Michael Dennis",
      "Andre Derain",
      "Desiderio da Settignano",
      "Martin Desjardins",
      "Charles Despiau",
      "Henry Dexter",
      "Mark di Suvero",
      "Sir William Reid Dick",
      "Diego de Pesquera",
      "James Dinerstein",
      "Frank Dobson",
      "Domenico De\'Cori",
      "Domenico del Barbiere",
      "Domenico di Paris",
      "Donatello",
      "Michele Oka Doner",
      "Georg Raphael Donner",
      "Carlos Dorrien",
      "Clarice Dreyer",
      "Edouard Drouot",
      "Alfred Drury",
      "Paul Dubois",
      "Raymond Duchamp-Villon",
      "Francois Dumont",
      "Jacques-Edme Dumont",
      "Giovanni Dupre",
      "Guillaume Dupre",
      "Francois Duquesnoy",
      "Joseph Durham",
      "Jehan Duseigneur",
      "Walter Dusenbery",
      "Rico Eastman",
      "Abastenia St. Leger Eberle",
      "Charles Edenshaw",
      "Melvin Edwards",
      "Juan Egenau Moore",
      "Dale Eldred",
      "Lin Emery",
      "Jacob Epstein",
      "Michel Erhardt",
      "Gregor Erhart",
      "Antoine Etex",
      "Sorel Etrog",
      "Agenore Fabbri",
      "Luciano Fabro",
      "Joe Fafard",
      "Avard T. Fairbanks",
      "Etienne-Maurice Falconet",
      "Jean-Alexandre-Joseph Falguiere",
      "Cosimo Fancelli",
      "Francesco Fanelli",
      "Cosimo Fanzago",
      "Luc Faydherbe",
      "Pericle Fazzini",
      "Herbert Ferber",
      "Gregorio Fernandez",
      "Angel Ferrant y Vazquez",
      "Jackie Ferrara",
      "Jean-Joseph-Hippolyte-Romain Ferrat",
      "Ercole Ferrata",
      "Ciro Ferri",
      "Francesco di Simone Ferrucci",
      "Jean-Jacques Feuchere",
      "Filarete",
      "Filippo della Valle",
      "Sally S. Fine",
      "Giuliano Finelli",
      "Ian Hamilton Finlay",
      "Ernesto de Fiori",
      "Eric Fischl",
      "Lars-Erik Fisk",
      "Pierre-Felix Fix-Masseau",
      "Audrey Flack",
      "Anselme Flamen",
      "Barry Flanagan",
      "John Flaxman",
      "Cornelis Floris",
      "Giambattista Foggini",
      "John Henry Foley",
      "Annibale Fontana",
      "Lucio Fontana",
      "Edward Onslow Ford",
      "Giovacchino Fortini",
      "Marc-Aurele de Foy Suzor-Cote",
      "Denis Foyatier",
      "Sir George Frampton",
      "Pietro Francavilla",
      "Francesco di Giorgio Martini",
      "Nino Franchina",
      "Mary Frank",
      "James Earle Fraser",
      "Christophe Fratin",
      "Wilhelm Freddie",
      "Emmanuel Fremiet",
      "Rene Fremin",
      "Daniel Chester French",
      "Otto Freundlich",
      "Tom Friedman",
      "Dame Elisabeth Frink",
      "Harriet Whitney Frishmuth",
      "Emil Fuchs",
      "Meta Warrick Fuller",
      "Naum Gabo",
      "Domenico Gagini",
      "Oscar Gallo",
      "Gano di Fazio",
      "Franco Garelli",
      "Pablo Gargallo",
      "Henri Gaudier-Brzeska",
      "August Gaul",
      "Gechu",
      "Frank Gehry",
      "Vincenzo Gemito",
      "Alberto Gerardi",
      "Gerardo",
      "Nicolaus Gerhaert",
      "Hubert Gerhard",
      "Jean-Leon Gerome",
      "Lorenzo Ghiberti",
      "Alberto Giacometti",
      "Giambologna",
      "John Gibson",
      "Piero Gilardi",
      "Alfred Gilbert",
      "Eric Gill",
      "Charles Ginnever",
      "Antonio Giorgetti",
      "Giovanni da Balduccio",
      "Giovanni da Campione",
      "Giovanni da Nola",
      "Francois Girardon",
      "Gislebertus",
      "Robert Gober",
      "Julio Gonzalez",
      "Glenna Goodacre",
      "Harry H. Gordon",
      "Jean Gorin",
      "Goro di Gregorio",
      "Jean Goujon",
      "Robert Graham",
      "Giuseppe Grandi",
      "Caspar Gras",
      "Philippe Grass",
      "Erasmus Grasser",
      "Philip Grausman",
      "Morris Graves",
      "Nancy Graves",
      "Emilio Greco",
      "George Greenamyer",
      "Horatio Greenough",
      "Peter Grippe",
      "Juan Gris",
      "Chaim Gross",
      "Luigi Grosso",
      "Henry de Groux",
      "Gruamonte",
      "Gilles Guerin",
      "Fra Guglielmo",
      "Mastro Guglielmo",
      "Domenico Guidi",
      "Simon Guillain",
      "Franz Ignaz Gunther",
      "Emanuel Hahn",
      "Nigel Hall",
      "Maggi Hambling",
      "Duane Hanson",
      "Bob Haozous",
      "David Hare",
      "Mags Harries",
      "Frederick Hart",
      "J. Scott Hartley",
      "Francis Harwood",
      "Herbert Haseltine",
      "Per Hasselberg",
      "Brower Hatcher",
      "Joseph Havel",
      "Gilbert Hay",
      "Pierre-Eugene-Emile Hebert",
      "Marion Held",
      "Ralph Helmick",
      "Richard Helzer",
      "Barbara Hepworth",
      "Jose Antonio Hernandez-Diez",
      "Eva Hesse",
      "Christopher Hewetson",
      "Jene Highstein",
      "Anthony Hill",
      "Jim Hodges",
      "Malvina Hoffman",
      "Martin Hoffmann",
      "George Hoffmeister",
      "Tim Holmes",
      "Donal Hord",
      "Harriet Goodhue Hosmer",
      "Jean-Antoine Houdon",
      "Allan Houser",
      "Shirazeh Houshiary",
      "Bryan Hunt",
      "Richard Hunt 1935",
      "Anna V. Hyatt Huntington",
      "Charles-Francois Hutin",
      "Michio Ihara",
      "Jean Ipousteguy",
      "Chauncey B. Ives",
      "Jake Jacobson",
      "Alfred Jacquemart",
      "Mathieu Jacquet",
      "Ponce Jacquiot",
      "Jean de Liege",
      "C. Paul Jennewein",
      "Luis Jimenez",
      "Jasper Johns",
      "Sargent Claude Johnson",
      "J. Seward Johnson Jr.",
      "Louis Paul Jonas",
      "Luther Jones",
      "Jacques Jonghelinck",
      "Juan de Juni",
      "Donald Judd",
      "Pierre Julien",
      "Menashe Kadishman",
      "Lila Katzen",
      "Kcho",
      "Ellsworth Kelly",
      "Zoltan Kemeny",
      "Edward Kemeys",
      "Mel Kendrick",
      "Eric Kennington",
      "Leonhard Kern",
      "Giorgio Kienerk",
      "Phillip King",
      "William King",
      "Ernst Ludwig Kirchner",
      "Max Klinger",
      "Bryan Kneale",
      "Imi Knoebel",
      "Ida Rittenberg Kohlmeyer",
      "Georg Kolbe",
      "Kathe Kollwitz",
      "Ron Kostyniuk",
      "Dennis Kowal",
      "Adam Kraft",
      "Hans Krumper",
      "Gaston Lachaise",
      "Georges Lacombe",
      "Daniel Ladd",
      "Stefano Lagerino",
      "Gerald Laing",
      "Piero di Niccolo Lamberti",
      "Taddeo Landini",
      "Edouard Lanteri",
      "Berto Lardera",
      "Philip Larson",
      "Jon Lash",
      "Ibram Lassaw",
      "Francesco Laurana",
      "Henri Laurens",
      "Robert Laurent",
      "Lee Lawrie",
      "Giusto Le Court",
      "Pierre Le Gros I",
      "Pierre Le Gros II",
      "Etienne Le Hongre",
      "Robert Le Lorrain",
      "Jean-Jules-Antoine Lecomte du Nouy",
      "Lee Bul",
      "Alphonse Legros",
      "Wilhelm Lehmbruck",
      "Lord Frederic Leighton",
      "Jac Leirner",
      "Francois-Frederic Lemot",
      "Jean-Louis Lemoyne",
      "Jean-Baptiste Lemoyne II",
      "Leochares",
      "Leonardi Leoncillo",
      "Leone Leoni",
      "Pompeo Leoni",
      "Pierre Lepautre",
      "Leonid Lerman",
      "Edmonia Lewis",
      "Andre Lhote",
      "Alexander Liberman",
      "Maya Lin",
      "Jacques Lipchitz",
      "Seymour Lipton",
      "Ken Little",
      "Robert Lobe",
      "Antonio Lombardo",
      "Pietro Lombardo",
      "Tullio Lombardo",
      "Ted Long",
      "Evelyn Beatrice Longman",
      "Stoldo Lorenzi",
      "John Graham Lough",
      "Boris Lovet-Lorski",
      "Albert Pike Lucas",
      "Sarah Lucas",
      "Bruno Lucchesi",
      "Michael Lucero",
      "George Lundeen",
      "Markus Lupertz",
      "Lysippus",
      "Patrick MacDowell",
      "Frederick W. MacMonnies",
      "Hermon Atkins MacNeil",
      "Stefano Maderno",
      "Maestro Pugliese-Abruzzese",
      "Philippe Magnier",
      "Aristide Maillol",
      "Camillo Maine",
      "Lorenzo Maitani",
      "Michael Malpass",
      "Paul Manship",
      "Antonio Mantegazza",
      "Cristoforo Mantegazza",
      "Giacomo Manzu",
      "Giovanni Marchiori",
      "Gerhard Marcks",
      "Camillo Mariani",
      "Javier Marin",
      "Joseph-Charles Marin",
      "Orazio Marinali",
      "Marino Marini",
      "Marisol",
      "Carlo Marochetti",
      "Gaspard Marsy II",
      "Kenneth Martin",
      "Arturo Martini",
      "Marcello Mascherini",
      "Raymond Mason",
      "Benoit Massou",
      "Master of the Codex of Saint George",
      "Master of the Marble Madonnas",
      "Master of the Mascoli Altar",
      "Umberto Mastroianni",
      "Henri Matisse",
      "Paul Matisse",
      "Marino Mazzacurati",
      "Guido Mazzoni",
      "Giuseppe Mazzuoli",
      "Edward Francis McCartan",
      "Paul McCarthy",
      "John McCracken",
      "John McEwen",
      "Robert Tait McKenzie",
      "Louise McKissick",
      "Frederick Edward McWilliam",
      "Mary Mead",
      "Bernard Meadows",
      "Conrad Meit",
      "Roberto Melli",
      "Fausto Melotti",
      "Pierre-Jules Mene",
      "Marius-Jean-Antonin Mercie",
      "Marisa Merz",
      "Franz Xaver Messerschmidt",
      "Francesco Messina",
      "Ivan Mestrovic",
      "Constantin Meunier",
      "Michelangelo Buonarroti",
      "Michelozzo di Bartolomeo",
      "Umberto Milani",
      "Carl Milles",
      "Luciano Minguzzi",
      "George Minne",
      "Mino da Fiesole",
      "Joan Miro",
      "Dhruva Mistry",
      "Igor Mitoraj",
      "Francesco Mochi",
      "Amedeo Modigliani",
      "Jean-Guillaume Moitte",
      "Pierre Etienne Monnot",
      "Juan Martinez Montanez",
      "Antonio Montauti",
      "Stewart Montgomerie",
      "Giovanni Angelo Montorsoli",
      "Ronald Moody",
      "Henry Moore",
      "Francois Morellet",
      "Giovan Maria Morlaiter",
      "Malcolm Morley",
      "Jesus Bautista Moroles",
      "George Morrison",
      "Paul Mosselmann",
      "Hypolyte-Alex-Andre-Julien Moulin",
      "Ron Mueck",
      "Vera Mukhina",
      "Hans Multscher",
      "Juan Munoz",
      "Alexander Munro",
      "Myron",
      "Elie Nadelman",
      "Reuben Nakian",
      "Dan Namingha",
      "Nanni di Banco",
      "Nanni di Bartolo",
      "Mario Negri",
      "Eric Nelson",
      "Manuel Neri",
      "Louise Nevelson",
      "Niccolo d\'Angelo",
      "Niccolo Dell\'Arca",
      "Niclaus of Haguenau",
      "Nicodemo da Guardiagrele",
      "Nicolaus",
      "Nicolo",
      "Isamu Noguchi",
      "Joseph Nollekens",
      "Bernt Notke",
      "Elliot Offner",
      "Claes Oldenburg",
      "Nathan Oliveira",
      "Olowe of Ise",
      "Gerard van Opstal",
      "Orso",
      "Michael Osborne",
      "Jorge Oteiza",
      "Alejandro Otero",
      "Tom Otterness",
      "Giovanni Paganin",
      "Roxy Paine",
      "Augustin Pajou",
      "Mimmo Paladino",
      "Albert Paley",
      "Erastus Dow Palmer",
      "Guilielmus Paludanus",
      "Giulio Paolini",
      "Paolo Romano",
      "Eduardo Paolozzi",
      "Barry Parker",
      "Michael Parkes",
      "Peter Parler",
      "Filippo Parodi",
      "Edward Pearce",
      "Pedro de Mena",
      "Marsha Pels",
      "Giuseppe Penone",
      "Beverly Pepper",
      "Augusto Perez",
      "Balthasar Permoser",
      "Jorg Petel",
      "Antoine Pevsner",
      "Judy Pfaff",
      "Phidias",
      "Pablo Picasso",
      "Pierino da Vinci",
      "Pietro da Rho",
      "Jean-Baptiste Pigalle",
      "Germain Pilon",
      "David Ruben Piqtoukun",
      "Andrea Pisano",
      "Giovanni Pisano",
      "Nicola Pisano",
      "Nino Pisano",
      "Michelangelo Pistoletto",
      "Domenico Poggini",
      "Antonio Pollaiolo",
      "Polykleitos",
      "Arnaldo Pomodoro",
      "Gio Pomodoro",
      "Giacomo Antonio Ponsonelli",
      "Kananginak Pootoogook",
      "Guglielmo della Porta",
      "Hiram Powers",
      "James Pradier",
      "Marina Nunez del Prado",
      "Bela Lyon Pratt",
      "Praxiteles",
      "Auguste Preault",
      "Barthelemy Prieur",
      "Francesco Primaticcio",
      "Giulio Cesare Procaccini",
      "Alexander Phimister Proctor",
      "Properzia de Rossi",
      "Jacques Prou",
      "Pierre Puget",
      "Jean Puiforcat",
      "Martin Puryear",
      "Artus Quellinus I",
      "Jacopo della Quercia",
      "Marc Quinn",
      "David Rabinowitch",
      "Sergio Ragalzi",
      "Antonio Raggi",
      "Peter Randall-Page",
      "Antonietta Raphael Mafai",
      "Richard Henry Recchia",
      "Ravinder Reddy",
      "Peter Reginato",
      "Bill Reid",
      "Frederic Remington",
      "Sir William Reynolds-Stephens",
      "Il Riccio",
      "Germaine Richier",
      "Ligier Richier",
      "Tilman Riemenschneider",
      "Martino Riezio",
      "Francesco Righetti",
      "William Rimmer",
      "William Henry Rinehart",
      "Tom Rippon",
      "Larry Rivers",
      "Antonio Rizzo",
      "Andrea della Robbia",
      "Giovanni della Robbia",
      "Girolamo della Robbia",
      "Luca della Robbia",
      "Roberto",
      "Niccolo Roccatagliata",
      "Pierre Roche",
      "Auguste Rodin",
      "John Rogers",
      "Randolph Rogers",
      "Philippe-Laurent Roland",
      "Luisa Roldan",
      "Samuel Roman Rojas",
      "Romano Romanelli",
      "Gian Cristoforo Romano",
      "Ercole Rosa",
      "James Rosati",
      "Richard Rosenblum",
      "Tony Rosenthal",
      "Antonio Rossellino",
      "Bernardo Rossellino",
      "Medardo Rosso",
      "Mino Rosso",
      "Theodore Roszak",
      "Louis-Francois Roubiliac",
      "Fremyn Roussel",
      "Francois Rude",
      "Camillo Rusconi",
      "William Rush",
      "Giovanni Francesco Rustici",
      "Mario Rutelli",
      "Ursula von Rydingsvard",
      "John Michael Rysbrack",
      "Alison Saar",
      "Pauta Saila",
      "Augustus Saint-Gaudens",
      "Niki de Saint-Phalle",
      "Doris Salcedo",
      "Nicola Salvi",
      "Jacques-Francois-Joseph Saly",
      "Francesco da Sangallo",
      "Giuseppe Sanmartino",
      "Andrea Sansovino",
      "Jacopo Sansovino",
      "Aligi Sassu",
      "Augusta Savage",
      "Johann Gottfried Schadow",
      "Henry Thomas Schafer",
      "Edwin Scharff",
      "Francesco Maria Schiaffino",
      "Andreas Schluter",
      "Dietrich Schro",
      "Ray Schultze",
      "Kurt Schwitters",
      "Joyce J. Scott",
      "Janet Scudder",
      "George Segal",
      "Johan Tobias Sergel",
      "Iakov Panfilovich Seriakov",
      "Giacomo Serpotta",
      "Richard Serra",
      "Severo da Ravenna",
      "David Shapiro",
      "Joel Shapiro",
      "Michael Shaughnessy",
      "Ed Shay",
      "Judith Shea",
      "Peter Shelton",
      "Henry Merwin Shrady",
      "Diego de Siloe",
      "Gil de Siloe",
      "Jonathan Silver",
      "Silvestro Dell\'Acquila",
      "Franklin Simmons",
      "Charles Simonds",
      "Konstantin Simun",
      "Michael Singer",
      "Renee Sintenis",
      "Michelangelo Slodtz",
      "Paul-Ambroise Slodtz",
      "Claus Sluter",
      "Alexis Smith",
      "David Smith",
      "Tony Smith",
      "Kenneth Snelson",
      "Dean Snyder",
      "Susana Solano",
      "Cristoforo Solari",
      "Massimiliano Soldani",
      "Paul Soldner",
      "Savelli Sperandio",
      "Cristoforo Stati",
      "Emma Stebbins",
      "Frank Stella",
      "Peter Stephenson",
      "Alfred Stevens 1817-1875",
      "Nicholas Stone",
      "Paul Storr",
      "John Storrs",
      "William Wetmore Story",
      "Veit Stoss",
      "Jean-Baptiste Stouf",
      "Renee Stout",
      "Johann Baptist Straub",
      "David Stromeyer",
      "Strong-Cuevas",
      "Michelle Stuart",
      "Franz von Stuck",
      "George Sugarman",
      "Master Suleiman",
      "James Surls",
      "Antonio Susini",
      "Gianfrancesco Susini",
      "John Macallan Swan",
      "Margaret Swan",
      "Sarah Sze",
      "Ferdinando Tacca",
      "Pietro Tacca",
      "Gerald Tailfeathers",
      "Dorothea Tanning",
      "Jean-Pierre-Antoine Tassaert",
      "Vittorio Tavernari",
      "Pietro Tenerani",
      "Willem van Tetrode",
      "David Thauberger",
      "William Theed",
      "Jean Baptiste Theodon",
      "Robert Therrien",
      "Jean Thierry",
      "James Havard Thomas",
      "Pierre-Philippe Thomire",
      "Sir Hamo Thornycroft",
      "Bertel Thorvaldsen",
      "Tino da Camaino",
      "Michael Todd",
      "Albert Toft",
      "Tommaso Cazzaniga",
      "Shokyusai Tomoyuki",
      "Herk Van Tongeren",
      "Joaquin Torres-Garcia",
      "Giuseppe Torretti",
      "Sebastiano Torrigiani",
      "Pietro Torrigiano",
      "Naito Toyomasa",
      "Nison Tregor",
      "Niccolo Tribolo",
      "Henri de Triqueti",
      "Paul Troubetzkoy",
      "Ernest Trova",
      "Anne Truitt",
      "Jean-Baptiste Tuby I",
      "William Tucker",
      "Oviloo Tunnillie",
      "William Turnbull",
      "Gunther Uecker",
      "Kent Ullberg",
      "Judas Ullulaq",
      "Leon Underwood",
      "Barry Le Va",
      "Francesco di Valdambrino",
      "Manolo Valdes",
      "John Van Alstine",
      "Coosje van Bruggen",
      "Corneille Van Cleve",
      "Johan Gregor van der Schardt",
      "Georges Vantongerloo",
      "Vasco de la Zarza",
      "Pietro Vassalletto",
      "Vecchietta",
      "Vincenzo Vela",
      "Hendrick Frans Verbruggen",
      "Rombout Verhulst",
      "Andrea del Verrocchio",
      "Alberto Viani",
      "Felipe Vigarny",
      "Gustav Vigeland",
      "Peter Vischer the Elder",
      "Peter Vischer the Younger",
      "Carel Visser",
      "Alessandro Vittoria",
      "Daniele da Volterra",
      "Bessie Potter Vonnoh",
      "Paul Voss",
      "Adriaen de Vries",
      "Vuolvinio",
      "Theodore J. Waddell",
      "Kitty Wales",
      "John Quincy Adams Ward",
      "Olin Levi Warner",
      "Rebecca Warren",
      "George Frederic Watts",
      "Henry Weekes",
      "Richard Wentworth",
      "Gary Wertheim",
      "Franz West",
      "H.C. Westermann",
      "James Sherwood Westmacott",
      "Joseph Wheelwright",
      "Dan Whetstone",
      "Anne Whitney",
      "Gertrude Vanderbilt Whitney",
      "Leslie Wilcox",
      "Alison Wilding",
      "Adolfo Wildt",
      "Wiligelmo",
      "Mike Wilkins",
      "Christopher Wilmarth",
      "John Wilson",
      "Joseph Wilton",
      "Jackie Winsor",
      "Isaac Witkin",
      "Elizabeth Wyn Wood",
      "Francis Derwent Wood",
      "Bill Woodrow",
      "Jan Woods",
      "Thomas Woolner",
      "Fritz Wotruba",
      "Rik Wouters",
      "Autin Wright",
      "Erwin Wurm",
      "Benedikt Wurzelbauer",
      "Yuriko Yamaguchi",
      "Ossip Zadkine",
      "Patrick Zentz",
      "William Zorach",
      "Gilberto Zorio",
      "Mathias Zundt",
    ],
    paletteSynonyms: [
      "bitexture",
      "bitextured",
      "bitextures",
      "texture",
      "textureable",
      "textureably",
      "textureado",
      "textureant",
      "textureants",
      "textureation",
      "textureations",
      "textureatura",
      "textureaturas",
      "textureblind",
      "textureblindness",
      "textureblindnesses",
      "texturebred",
      "texturectal",
      "textured",
      "texturerific",
      "texturer",
      "texturers",
      "texturefast",
      "texturefastness",
      "texturefastnesses",
      "textureful",
      "texturefully",
      "texturefulness",
      "texturefulnesses",
      "textureific",
      "textureimeter",
      "textureimeters",
      "textureimetric",
      "textureimetrically",
      "textureimetries",
      "textureimetry",
      "textureing",
      "textureings",
      "textureism",
      "textureisms",
      "textureist",
      "textureistic",
      "textureistically",
      "textureists",
      "textureization",
      "textureizations",
      "textureize",
      "textureized",
      "textureizes",
      "textureizing",
      "textureless",
      "texturelessly",
      "texturelessness",
      "texturelessnesses",
      "textureman",
      "texturemen",
      "texturepoint",
      "texturepoints",
      "textures",
      "detexture",
      "detextured",
      "detextureing",
      "detextureization",
      "detextureizations",
      "detextureize",
      "detextureized",
      "detextureizer",
      "detextureizers",
      "detextureizes",
      "detextureizing",
      "detextures",
      "distexture",
      "distextureation",
      "distextureations",
      "distextured",
      "distextureing",
      "distextures",
      "mistexture",
      "mistextured",
      "mistextureing",
      "mistextures",
      "multitexture",
      "multitextured",
      "multitextures",
      "nontexture",
      "nontextured",
      "nontexturefast",
      "nontextures",
      "retexture",
      "retextured",
      "retextureing",
      "retextures",
      "tritexture",
      "tritextured",
      "tritextures",
      "untextured",
      "unitexture",
      "varitextured",
      "watertexture",
      "watertextureist",
      "watertextureists",
      "watertextures",
    ],
    prefsSectionName: "RDT",
    progressUIDelay: 1000,
    rayAddedCompsArray: [],
    rows: [],
    scriptName: "Ray Dynamic Texture",
    scriptUrl: "http://aescripts.com/ray-dynamic-texture",
    scriptVersion: "1.5.6",
    strALS: "Matte Mode",
    strALSHelpTip:
      "Click to cycle different modes: Alpha, Luma or Set matte. Alt-Click to invert the matte.",
    strAddValueCheckbox: '"thisProperty.value"',
    strAddValueCheckboxHelpTip:
      'Will add "thisProperty.value" expression to selected properties',
    strAdvanced: "Advanced",
    strCancel: "Cancel",
    strCap: "Cap",
    strCloneHelpTip:
      "Clone the selected layer with property links. Alt-Click to clone without Effects, Masks or Layer Styles.",
    strDefault: "Default",
    strDefaultSelectPalette: "Please select a texture",
    strDismiss: "Turn off error messages",
    strEllipse: "#",
    strEllipseHelpTip: "Enter color number",
    strEnterNumber: "Please enter the texture number.",
    strExportAse: "Export ASE",
    strExportAseConfirm:
      "The colors needs to be sent to the aescripts servers to create the .ase file\nAfter processing, a file named:\n\n%1.ase\n\nwill be downloaded via your default browser. No other information besides the colors will be sent.\n\nDo you wish to proceed?",
    strExportAseShort: "Export",
    strHelp: "?",
    strImportAse: "+ ASE",
    strInvert: "Invert",
    strInvertHelpTip: "Invert the selected matte",
    strJoin: "Join",
    strLastSelected: "RDT-Last selected",
    strLayoutAlert: "You must restart RDT to get the new layout",
    strLink: "Link",
    strLinkHelpTip:
      "Adds the selected layer(s) into the selected RDT texture palette",
    strOk: "OK",
    strOpen: "Open",
    strOpenHelpTip: "Opens the selected Texture comp",
    strPaletteCompCorrupted:
      "The texture palette comp is not setup properly. Please make sure you have not added any layers or otherwise modified this comp besides adding or changing layers.",
    strPaletteName: "Please name the texture palette",
    strPlus: "+",
    strPlusHelpTip:
      "Select a couple layers and click to add them to a new Texture palette. Alt-Click to create a default palette.",
    strPrefsPath: "/Aescripts/RDT",
    strProjScanConfirm:
      "Are you sure you want to scan the entire project?\nThis might take a bit, if you only want to scan some comps select them first in the project panel, or any layers or properties. Open the info panel to see the progress, press ESC to cancel.\n\nIf you only want to scan a comp please select it in the Project Panel.",
    strRefresh: "Refresh",
    strRefreshHelpTip: "Refresh UI and look for new texture palettes",
    strReplace: "Replace",
    strReplaceHelpTip: "Replace RDT Texture",
    strReplaceValueCheckbox: "Link",
    strReplaceValueCheckboxHelpTip:
      'Will replace any instance of "thisProperty.value" in expressions with a link to the property in the palette comp',
    strReveal: "Reveal Expressions Folder",
    strRevealShort: "Folder",
    strScan: "+ Scan",
    strSelectAse: "Please select the ASE file to import",
    strShapeLayerComment: 'Change colors in the "Effect Controls" Shortcut: F3',
    strStroke: "Stroke",
    strStrokeHelpTip: "Apply color to Stroke (only applies to Shape Layers)",
    strTexture: "texture",
    strTextureBtnHelpTip: "Hold Shift to parent",
    strTextureFolder: "Textures",
    strTextureMainFolder: "Ray Dynamic Textures",
    strTexturePrefix: "RDT - ",
    strTextureSuffix: " - RDT",
    strUnLink: "UnLink",
    strUnLinkComment: "//RDT Bake Data - DO NOT DELETE OR MODIFY",
    strUnLinkHelpTip:
      "Unlink (bake) RDT expressions to keyframes for faster rendering. Please note that this will delete the Ray expression and will break the dynamic links to the colors.",
    supportUrl: "http://aescripts.com/contact/?direct=1&sku=SVDRDT-SUL",
    turnOffExpressions: false,
    turnOnButtonLetters: true,
  };
  RDT.uiLayout = app.settings.haveSetting(RDT.prefsSectionName, "uiLayout")
    ? parseInt(app.settings.getSetting(RDT.prefsSectionName, "uiLayout"), 10)
    : 0;
  RDT.uiLayoutNum = app.settings.haveSetting(
    RDT.prefsSectionName,
    "uiLayoutNum",
  )
    ? parseInt(app.settings.getSetting(RDT.prefsSectionName, "uiLayoutNum"), 10)
    : RDT.numberOfPaletteShortcutButtons;
  RDT.uiLayoutMod = app.settings.haveSetting(
    RDT.prefsSectionName,
    "uiLayoutMod",
  )
    ? parseInt(app.settings.getSetting(RDT.prefsSectionName, "uiLayoutMod"), 10)
    : RDT.numberOfPaletteShortcutButtonsPerRow;
  RDT.showErrors = app.settings.haveSetting(RDT.prefsSectionName, "showErrors")
    ? !(app.settings.getSetting(RDT.prefsSectionName, "showErrors") == "false")
    : true;
  if (
    RDT.uiLayoutNum > RDT.numberOfPaletteShortcutButtonsMax ||
    (RDT.uiLayout == 2 &&
      RDT.uiLayoutNum > RDT.numberOfPaletteShortcutButtonsVertMax)
  ) {
    alertUI(RDT.errUiLayoutNumMax);
    RDT.uiLayoutNum =
      RDT.uiLayout == 2
        ? RDT.numberOfPaletteShortcutButtonsVertMax
        : RDT.numberOfPaletteShortcutButtonsMax;
    app.settings.saveSetting(
      RDT.prefsSectionName,
      "uiLayoutNum",
      RDT.numberOfPaletteShortcutButtonsMax,
    );
  }
  RDT.strAbout1 =
    RDT.scriptName +
    " v" +
    RDT.scriptVersion +
    "\n" +
    "Copyright \xa9 2017 Sander van Dijk\n" +
    "Developed by Lloyd Alvarez http://aescripts.com\n" +
    "Layer Label Color code provided by Zack Lovatt and Kyle Martinez\n\n";
  RDT.strAbout2 =
    'Create Color Palette:\nClick the plus button. This will create a new "color palette composition" If you open that composition you will find a shape layer with seven default colors. This shape layer acts as a visual representation of the color palette. On this layer we can change the colors of the palette. Add more colors by duplicating one of the color controls or add the color control effect to this layer.\n\nClick the refresh button to update your changes in the Ray Dynamic Texture UI panel. Now you have access to you color palette from anywhere in After effects.\n\nASE files:\nAnother way to import colors, is using ASE files. Click on the plus ASE button. Select the ASE file and import it as a color palette composition. By default this new comp will be named after the ase file. You can always change the comp name but make sure to keep "Ray -" in front of the name. This is how Ray Dynamic Texture knows that this comp is actually a color palette composition.\n\nWhen your done making changes press the refresh button again.\n\nYou can import color palettes from Kuler the same way. Go to color.adobe.com and download one of the color palettes as ASE file. Then, import that ASE file the same way using the + ASE button.\n\nApply Color:\nSelect any layer in the timeline and assign one of the numbers to it by clicking on the number buttons in the UI panel. You assign a number so that later on you have the option to change the color that the number represents.\n\nAfter you apply this color you can still adjust it like normally. Click on the color property to change the color. Here all colors are still available to select but if you want a color out of the color palette, enter the number of the color into the blue channel. this will make the color property reference the color number you want.\n\nSearch for // to find all the color properties that are colored with Ray Dynamic Texture in the timeline view. Now you can easily get an overview of all the colors and adjust them without digging through property groups to find them.\n\nThe pound button:\nAllows you to type in any number.\n\nThe P button:\nAllows you to swap out a different color palette. Select the layer and the palette you want, then hit the P button. You can also change this manually. If you look in the group name of the color property, you can find the color palette name. Just change this name there to the color palette you want to use instead.';
  var afs = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [],
    helpText: RDT.strAbout2,
    offerBeta: false,
    offerTrial: true,
    privateNumber: 7647155561583311,
    productSKU: "SVDRDT-SUL",
    scriptAuthor:
      " Sander van Dijk\nDeveloped by Lloyd Alvarez http://aescripts.com",
    scriptName: RDT.scriptName,
    scriptURL: RDT.scriptUrl,
    scriptVersion: RDT.scriptVersion,
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
    var wx = __BLOB__BLOB_000496__;
    var mx = __BLOB__BLOB_000497__;
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
  var y55rff = new a(afs);
  if (!y55rff.c()) {
    return;
  }
  RDT.isTrial = y55rff.t();
  var binStr = {
    colorFfx: {
      code: __BLOB__BLOB_000498__,
      name: "Ray Master Color v2.0.1.ffx",
    },
    unzip: {
      code:
        "\'aescripts unzip - " +
        RDT.scriptName +
        " v" +
        RDT.scriptVersion +
        '\r\n\'copyright 2014 http://aescripts.com\r\n\'\r\n\' USAGE:\r\n\'\r\n\' cscript //b unzip.vbs zip_file_name_goes_here.zip\r\n\r\nSet ArgObj = WScript.Arguments\r\nIf (Wscript.Arguments.Count > 0) Then\r\n var1 = ArgObj(0)\r\nElse\r\n var1 = ""\r\nEnd if\r\nstrFileZIP = var1\r\nDim sCurPath\r\nsCurPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.Arguments.Item(0))\r\nstrZipFile = strFileZIP\r\n\'The folder the contents should be extracted to.\r\noutFolder = sCurPath & "\\"\r\nSet objShell = CreateObject( "Shell.Application" )\r\nSet objSource = objShell.NameSpace(strZipFile).Items()\r\nSet objTarget = objShell.NameSpace(outFolder)\r\nintOptions = 256\r\nobjTarget.CopyHere objSource, intOptions\r\n\r\n',
      name: "aescripts_unzip_v1",
    },
  };
  RDT.binaryStrings = {
    ALS0: { bin: __BLOB__BLOB_000499__, name: "ALS0Btn1.png" },
    ALS0i: { bin: __BLOB__BLOB_CLEANED__, name: "ALS0iBtn1.png" },
    ALS1: { bin: __BLOB__BLOB_000500__, name: "ALS1Btn1.png" },
    ALS1i: { bin: __BLOB__BLOB_000501__, name: "ALS1iBtn1.png" },
    ALS2: { bin: __BLOB__BLOB_000502__, name: "ALS2Btn1.png" },
    ALS2i: { bin: __BLOB__BLOB_000503__, name: "ALS2iBtn1.png" },
    clone: { bin: __BLOB__BLOB_CLEANED__, name: "cloneBtn1.png" },
    exprt: { bin: __BLOB__BLOB_CLEANED__, name: "exportBtn1.png" },
    gear: { bin: __BLOB__BLOB_CLEANED__, name: "gearBtn1.png" },
    helpHeader: { bin: __BLOB__BLOB_000504__, name: "helpHeader-RDT1.png" },
    helpHeaderRetina: {
      bin: __BLOB__BLOB_000505__,
      name: "helpHeader-RDT-Retina1.png",
    },
    imprt: { bin: __BLOB__BLOB_000506__, name: "importBtn1.png" },
    invert: { bin: __BLOB__BLOB_000507__, name: "invertBtn1.png" },
    link: { bin: __BLOB__BLOB_000508__, name: "linkBtn2.png" },
    open: { bin: __BLOB__BLOB_000509__, name: "openBtn1.png" },
    plus: { bin: __BLOB__BLOB_000510__, name: "plusBtn1.png" },
    refresh: { bin: __BLOB__BLOB_000511__, name: "refreshBtn1.png" },
    twirl: { bin: __BLOB__BLOB_CLEANED__, name: "paletteTwirl1.png" },
    twirlDown: { bin: __BLOB__BLOB_000512__, name: "paletteTwirlDown1.png" },
    unLink: { bin: __BLOB__BLOB_000513__, name: "unLinkBtn1.png" },
  };
  RDT.layerStyles = {
    "bevelEmboss/enabled": { id: 9004, name: "Bevel and Emboss" },
    "chromeFX/enabled": { id: 9005 },
    "dropShadow/enabled": { id: 9000, name: "Drop Shadow" },
    "frameFX/enabled": { id: 9008, name: "Stroke" },
    "gradientFill/enabled": { id: 9007, name: "Gradient Overlay" },
    "innerGlow/enabled": { id: 9003, name: "Inner Glow" },
    "innerShadow/enabled": { id: 9001, name: "Inner Shadow" },
    "outerGlow/enabled": { id: 9002, name: "Outer Glow" },
    "solidFill/enabled": { id: 9006, name: "Color Overlay" },
  };
  RDT.labelColors = getLabelColors();
  RDT.defaultCompFrameRate =
    parseFloat(app.version) >= 12
      ? app.preferences.getPrefAsLong(
          "Import Options Preference Section",
          "Import Options Default Sequence FPS",
          PREFType.PREF_Type_MACHINE_INDEPENDENT,
        )
      : app.preferences.getPrefAsLong(
          "Import Options Preference Section",
          "Import Options Default Sequence FPS",
        );
  RDT.defaultCompDuration = 1;
  var RDTf = {
    defaultLocation: app.settings.haveSetting(
      RDT.prefsSectionName,
      "DefaultLocation",
    )
      ? File(app.settings.getSetting(RDT.prefsSectionName, "DefaultLocation"))
      : File(Folder.desktop.fsName),
    numsButtons: [],
    textureComps: [],
    uiBrightness: 0.5,
    userDataFolder: getUserDataFolder(),
  };
  RDT.alertUIReturn = null;
  switch (mode) {
    case "clone":
      clone();
      break;
    default:
      startRDT(thisObj);
      break;
  }
}
var isKBarRunning = typeof kbar !== "undefined";
if (parseFloat(app.version) >= 11) {
  if (isKBarRunning && kbar.button && kbar.button.argument) {
    switch (kbar.button.argument.toLowerCase()) {
      case "clone":
        RayDynamicTexture(this, "clone");
        break;
      default:
        RayDynamicTexture(this);
        break;
    }
  } else {
    RayDynamicTexture(this);
  }
} else {
  alert("This script requires After Effects CS6 or above");
}
