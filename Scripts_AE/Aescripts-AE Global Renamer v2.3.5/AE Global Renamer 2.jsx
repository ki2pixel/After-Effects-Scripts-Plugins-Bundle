/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function ae_global_renamer2(thisObj) {
  function getUserDataFolder() {
    var userDataFolder = Folder.userData;
    var aescriptsFolder = Folder(
      userDataFolder.toString() +
        "/Aescripts/" +
        aegr_strings.scriptName.replace(/ /g, ""),
    );
    if (!aescriptsFolder.exists) {
      var checkFolder = aescriptsFolder.create();
      if (!checkFolder) {
        alert(
          aegr_strings.errDiskPermission
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
      alert(
        "There was an error writing necessary files to the home folder, please check to make sure After Effects has the correct write permissions to the home folder.\nUnless AE is able to write to the home folder, we are not able to proceed.",
      );
      return null;
    }
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
  function aegr_buildUI(thisObj) {
    var pal =
      thisObj instanceof Panel
        ? thisObj
        : new Window(
            "palette",
            aegr_strings.scriptName + " v" + aegr_strings.scriptVersion,
            undefined,
            { resizeable: true },
          );
    if (pal != null) {
      function addSubSearchFieldPairs() {
        aegr_strings.searchReplaceCounter++;
        var addGroup =
          "group {\n                        alignment:[\'fill\',\'top\'], \n                        alignChildren:[\'fill\',\'top\'], \n                        margins: 0, padding: 0, spacing:0, \n                        orientation:\'row\', \n                            iconsGrp: Group { \n                            alignment:[\'left\',\'top\'], \n                            margins: 0, padding: 0, spacing:0, \n                            orientation:\'column\', \n                                    search: IconButton {name:\'search" +
          aegr_strings.searchReplaceCounter +
          "\',counter:\'" +
          aegr_strings.searchReplaceCounter +
          "\',properties:{style:\'toolbutton\'}, preferredSize:[20,20],alignment:[\'left\',\'top\']}, \n                                    replace: IconButton {name:\'replace" +
          aegr_strings.searchReplaceCounter +
          "\',counter:\'" +
          aegr_strings.searchReplaceCounter +
          "\',properties:{style:\'toolbutton\'},preferredSize:[20,20],alignment:[\'left\',\'top\']}, \n                                    }\n                            fieldsGrp: Group { \n                                 alignment:[\'fill\',\'top\'], \n                                 alignChildren:[\'fill\',\'top\'], \n                                 orientation:\'column\', \n                                 margins: 0, padding: 0, spacing:0, \n                                 search: EditText {preferredSize:[-1,20],alignment:[\'fill\',\'top\'],properties: {multiline: true}}, \n                                 replace: EditText {preferredSize:[-1,20],alignment:[\'fill\',\'top\'],properties: {multiline: true}}, \n                                 } \n                           presetsGrp: Group { \n                                 alignment:[\'right\',\'top\'], \n                                 orientation:\'column\', \n                                 margins: 0, padding: 0, spacing:0, \n                                 presets:DropDownList {name:\'search" +
          aegr_strings.searchReplaceCounter +
          "\', preferredSize:[30,20],alignment:[\'right\',\'top\']},\n                                 addSub: Group { \n                                                alignment:[\'right\',\'top\'], \n                                                alignChildren:[\'right\',\'top\'], \n                                                margins: 0, padding: 0, spacing:0, \n                                                counter:\'" +
          aegr_strings.searchReplaceCounter +
          "\',\n                                                subBtn: Button { text:\'-\',preferredSize:[15," +
          (15 + palAdjust).toString() +
          "] }, \n                                                addBtn: Button { text:\'+\',preferredSize:[15," +
          (15 + palAdjust).toString() +
          "]}, \n                                                }, \n                                 }\n                        }";
        aegr_strings.searchArray[aegr_strings.searchReplaceCounter] =
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ] = pal.grp.searchReplaceMaster.add(addGroup);
        if (parseFloat(app.version) < 9) {
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].fieldsGrp.search.graphics.foregroundColor = darkColorBrush;
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].fieldsGrp.replace.graphics.foregroundColor = darkColorBrush;
        }
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].iconsGrp.search.image =
          pal.grp.topGrp.mainMode.mode.selection.index != 1
            ? searchIcon
            : inIcon2;
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].iconsGrp.replace.image = inIcon2;
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.addSub.subBtn.enabled =
          aegr_strings.searchReplaceCounter > 1;
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.addSub.subBtn.text = pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.addSub.subBtn.enabled
          ? "-"
          : "";
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.addSub.visible =
          pal.grp.topGrp.mainMode.mode.selection.index == 0 &&
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.counter == aegr_strings.searchReplaceCounter;
        populatePresetsDropDown(
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.presets,
        );
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.presets.onChange = function () {
          presetOnChange(
            this,
            this.parent.parent.fieldsGrp.search,
            this.parent.parent.fieldsGrp.replace,
            pal.grp.footer.footerLeft.optns.regexOpt.regex,
            pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase,
            pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCase,
            pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode,
            pal.grp.footer.footerLeft.main.replaceModeGrp,
          );
        };
        if (aegr_strings.searchReplaceCounter > 1) {
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].fieldsGrp.search.onChanging = pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].fieldsGrp.replace.onChanging = function () {
            var carriageReturnCount =
              this.text.match(/\r|\n/g) != null
                ? this.text.match(/\r|\n/g).length
                : 0;
            var extraPad = $.os.indexOf("Windows") != -1 ? 20 : 0;
            if (carriageReturnCount > 0) {
              this.size = [
                this.size[0],
                15 * (carriageReturnCount + 1) + extraPad,
              ];
            } else {
              this.size = [this.size[0], 20];
            }
            pal.layout.layout(true);
            pal.layout.resize();
          };
        }
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].iconsGrp.search.onClick = pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].iconsGrp.replace.onClick = function () {
          var saveText1 =
            pal.grp.searchReplaceMaster[
              "searchReplace" + this.name.match(/[0-9]*$/).toString()
            ].fieldsGrp.search.text;
          var saveText2 =
            pal.grp.searchReplaceMaster[
              "searchReplace" + this.name.match(/[0-9]*$/).toString()
            ].fieldsGrp.replace.text;
          pal.grp.searchReplaceMaster[
            "searchReplace" + this.name.match(/[0-9]*$/).toString()
          ].fieldsGrp.replace.text = saveText1;
          pal.grp.searchReplaceMaster[
            "searchReplace" + this.name.match(/[0-9]*$/).toString()
          ].fieldsGrp.search.text = saveText2;
        };
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.addSub.addBtn.onClick = function () {
          this.parent.visible = false;
          addSubSearchFieldPairs();
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.subBtn.enabled =
            aegr_strings.searchReplaceCounter > 1;
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.subBtn.text = pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.subBtn.enabled
            ? "-"
            : "";
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.visible =
            pal.grp.topGrp.mainMode.mode.selection.index == 0 &&
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].presetsGrp.addSub.counter == aegr_strings.searchReplaceCounter;
          pal.layout.layout(true);
          pal.layout.resize();
        };
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.addSub.subBtn.onClick = function () {
          aegr_removeSearchReplacePairs(pal);
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.subBtn.enabled =
            aegr_strings.searchReplaceCounter > 1;
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.subBtn.text = pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.subBtn.enabled
            ? "-"
            : "";
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.visible =
            pal.grp.topGrp.mainMode.mode.selection.index == 0 &&
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].presetsGrp.addSub.counter == aegr_strings.searchReplaceCounter;
          pal.layout.layout(true);
          pal.layout.resize();
        };
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].iconsGrp.search.onDraw = pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].iconsGrp.replace.onDraw = colorIconsCustomDraw;
      }
      var res =
        "group { \n                    orientation:\'column\', \n                    alignment:[\'fill\',\'fill\'], \n                    alignChildren:[\'fill\',\'top\'], \n                    topGrp: Group {\n                    margins: 0, padding: 0, spacing:0, \n                    orientation:\'column\', \n                            mainMode:Group {\n                                    alignment:[\'fill\',\'top\'], \n                                    alignChildren:[\'fill\',\'top\'], \n                                margins: 0, padding: 0, spacing:0, \n                                    orientation:\'row\', \n                                        mode:DropDownList {name: \'modes\', alignment:[\'fill\',\'center\']}, \n                                }\n                                items:Group {\n                                    alignment:[\'fill\',\'top\'], \n                                    alignChildren:[\'fill\',\'top\'], \n                                margins: 0, padding: 0, spacing:0, \n                                    orientation:\'row\', \n                                        item:DropDownList {name: \'items\', alignment:[\'fill\',\'center\']}, \n                                }\n                                scopes:Group {\n                                    alignment:[\'fill\',\'top\'], \n                                    alignChildren:[\'fill\',\'top\'], \n                                margins: 0, padding: 0, spacing:0, \n                                    orientation:\'row\', \n                                        scope:DropDownList {name: \'scopes\', alignment:[\'fill\',\'center\']}, \n                                }\n                    }\n                    searchReplaceMaster: Group {\n                    alignment:[\'fill\',\'top\'], \n                    alignChildren:[\'fill\',\'top\'], \n                    margins: 0, padding: 0, spacing:0, \n                    orientation:\'column\', \n                    }\n                   footer: Group { \n                   orientation:\'row\', \n                   alignment:[\'fill\',\'top\'], \n                   alignChildren:[\'fill\',\'top\'], \n                           footerLeft: Group { \n                            alignment:[\'fill\',\'top\'], \n                            alignChildren:[\'fill\',\'top\'], \n                            orientation:\'stack\', \n                                   main: Group { \n                                        alignment:[\'fill\',\'top\'], \n                                            orientation:\'column\', \n                                            visible: true,\n                                            margins: 4, padding: 4, spacing:4, \n                                            alignment:[\'fill\',\'top\'] \n                                            alignChildren:[\'fill\',\'top\'] \n                                            replaceModeGrp : Group { \n                                                     alignment:[\'fill\',\'top\'], \n                                                     alignChildren:[\'fill\',\'center\'], \n                                                     orientation:\'row\', \n                                                     margins: 0, padding: 0, spacing:5, \n                                                                    replaceMode:DropDownList {preferredSize:[-1,30]}, \n                                                                    matchCase: IconButton {properties:{style:\'toolbutton\'},preferredSize:[20,20], alignment:[\'right\',\'center\'], helpTip:\'" +
        aegr_strings.matchCaseTxtHelp +
        "\'}, \n                                                                    regex: IconButton {properties:{style:\'toolbutton\'},preferredSize:[20,20], alignment:[\'right\',\'center\'],helpTip:\'" +
        aegr_strings.useRegExpTxtHelp +
        "\'}, \n                                                                    duplicatesOnly: IconButton {properties:{style:\'toolbutton\'},preferredSize:[20,20], alignment:[\'right\',\'center\'],helpTip:\'" +
        aegr_strings.dupsOnlyTxtHelp +
        "\' }, \n                                                                    }\n                                            goGroup: Group { \n                                                                    alignment:[\'fill\',\'center\'], \n                                                                    alignChildren:[\'fill\',\'center\'], \n                                                goNext: Button { text:\'" +
        aegr_strings.strNextButton +
        "\', preferredSize:[-1,40] }, \n                                                goAll: Button { text:\'" +
        aegr_strings.strAllButton +
        "\', preferredSize:[-1,40]}, \n                                            }\n                                    }, \n                                 optns: Group { \n                                        alignment:[\'fill\',\'top\'] \n                                        alignChildren:[\'left\',\'top\'] \n                                        orientation:\'column\', \n                                        visible: false,\n                                            margins: 0, padding: 0, spacing:0, \n                                                    matchCaseGrp: Group {\n                                                                    orientation:\'row\', \n                                                                     matchCase: Checkbox  { text:\'" +
        aegr_strings.matchCaseStr +
        "\', helpTip:\'" +
        aegr_strings.matchCaseTxtHelp +
        "\' },  \n                                                                     }\n                                                         regexOpt: Group { \n                                                               orientation:\'row\', \n                                                               regex: Checkbox  { text:\'" +
        aegr_strings.useRegExpTxt +
        "\', helpTip:\'" +
        aegr_strings.useRegExpTxtHelp +
        "\'},  \n                                                               modes: DropDownList {visible:false}, \n                                                               } \n                                                       dupsGrp: Group {\n                                                            orientation:\'row\', \n                                                             dupsOnly: Checkbox  { text:\'" +
        aegr_strings.dupsOnlyTxt +
        "\', helpTip:\'" +
        aegr_strings.dupsOnlyTxtHelp +
        "\' },  \n                                                             }\n                                                       changeCaseGrp: Group {\n                                                            orientation:\'row\', \n                                                             changeCase: Checkbox  { text:\'" +
        aegr_strings.changeCaseStr +
        "\', helpTip:\'" +
        aegr_strings.changeCaseTxtHelp +
        "\' },  \n                                                             changeCaseMode: DropDownList {visible:false}, \n                                                             }\n                                          fixExpressionsGrp: Group {\n                                                orientation:\'row\', \n                                                 fixExpressions: Checkbox  { text:\'" +
        aegr_strings.fixExpressionsTxt +
        "\', helpTip:\'" +
        aegr_strings.fixExpressionsTxtHelp +
        "\' },  \n                                                 }\n                                                showConsole: Checkbox { text:\'Show Log\'}, \n                                                }\n                      }\n                                    }\n                    helpStatusGrp: Group {\n                                alignment:[\'fill\',\'top\'] \n                                alignChildren:[\'fill\',\'top\'] \n                        margins: 4, padding: 4, spacing:4, \n                        helpGrp : Group {\n                                         orientation:\'row\', \n                                            alignment:[\'left\',\'top\'], \n                                            alignChildren:[\'left\',\'top\'], \n                                            margins: 4, padding: 4, spacing:4, \n                                            gear: IconButton {properties:{style:\'toolbutton\', toggle: true}, alignment:[\'left\',\'center\']}, \n                                            help: Button {text:\'?\', alignment:[\'left\',\'center\'],preferredSize:[20,20],}, \n                                            }\n                    status: StaticText {alignment:[\'left\',\'middle\'],text:\'A very very very very very very very very very very very very long string to initialize UI.\'}, \n                        }\n                    consoleGrp: Panel { \n                    text:\'Log\',\n                    alignment:[\'fill\',\'fill\'] \n                     alignChildren:[\'fill\',\'fill\'] \n                     orientation:\'column\', \n                     console: ListBox{properties:{multiselect:false, numberOfColumns:4, showHeaders:true,columnWidths:[-1,-1], columnTitles: [\'Container\',\'Item\',\'Old\',\'New\']},enabled:false} \n                     buttons : Group {\n                     alignment:[\'fill\',\'bottom\'] \n                     alignChildren:[\'left\',\'bottom\'] \n                     clear: Button { text:\'" +
        aegr_strings.strClearButton +
        "\', preferredSize:[95,20] }, \n                     exportList: Button { text:\'" +
        aegr_strings.strExportButton +
        "\', preferredSize:[95,20] }, \n                     }\n                    }\n\t\t\t\t} ";
      pal.grp = pal.add(res);
      var palGfx = pal.graphics;
      var darkColorBrush = palGfx.newPen(
        palGfx.BrushType.SOLID_COLOR,
        [0, 0, 0],
        1,
      );
      if (parseFloat(app.version) < 9) {
        pal.grp.footer.footerLeft.optns.regexOpt.modes.graphics.foregroundColor =
          darkColorBrush;
        pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode.graphics.foregroundColor =
          darkColorBrush;
        pal.grp.footer.footerLeft.main.replaceModeGrp.replaceMode.graphics.foregroundColor =
          darkColorBrush;
      }
      if (parseFloat(app.version) < 12) {
        pal.grp.helpStatusGrp.helpGrp.gear.image = gearIcon;
      } else {
        pal.grp.helpStatusGrp.helpGrp.gear.onDraw = function () {
          var image = ScriptUI.newImage(gearIcon);
          this.graphics.drawImage(image, 0, 0, image.size[0], image.size[1]);
        };
      }
      populateDropDown(pal.grp.topGrp.mainMode.mode);
      if (
        app.settings.haveSetting("aescripts", aegr_strings.scriptName + "_mode")
      ) {
        pal.grp.topGrp.mainMode.mode.selection = app.settings.getSetting(
          "aescripts",
          aegr_strings.scriptName + "_mode",
        );
      } else {
        pal.grp.topGrp.mainMode.mode.selection = 0;
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_matchCase",
        )
      ) {
        pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.value =
          matchCase =
          aegr_strings.matchCase =
            !(
              app.settings.getSetting(
                "aescripts",
                aegr_strings.scriptName + "_matchCase",
              ) == "false"
            );
      } else {
        pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.value =
          matchCase =
          aegr_strings.matchCase =
            false;
      }
      pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.imageON =
        matchCaseOn;
      pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.imageOFF =
        matchCaseOff;
      if (parseFloat(app.version) < 12) {
        pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.image =
          matchCaseOff;
      } else {
        pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.onDraw =
          function () {
            var image = ScriptUI.newImage(
              aegr_strings.matchCase ? this.imageON : this.imageOFF,
            );
            this.graphics.drawImage(image, 0, 0, image.size[0], image.size[1]);
          };
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_changeCase",
        )
      ) {
        pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCase.value =
          changeCase =
          aegr_strings.changeCase =
            !(
              app.settings.getSetting(
                "aescripts",
                aegr_strings.scriptName + "_changeCase",
              ) == "false"
            );
      } else {
        pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCase.value =
          changeCase =
          aegr_strings.changeCase =
            false;
      }
      pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode.visible =
        changeCase;
      for (var a = 0; a < aegr_strings.changeCaseModes.length; a += 1) {
        pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode.add(
          "item",
          aegr_strings.changeCaseModes[a],
        );
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_changeCaseMode",
        )
      ) {
        pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode.selection =
          changeCaseMode =
          aegr_strings.changeCaseMode =
            app.settings.getSetting(
              "aescripts",
              aegr_strings.scriptName + "_changeCaseMode",
            );
      } else {
        pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode.selection =
          changeCaseMode =
          aegr_strings.changeCaseMode =
            0;
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_regex",
        )
      ) {
        pal.grp.footer.footerLeft.optns.regexOpt.regex.value =
          useRegex =
          aegr_strings.useRegex =
            !(
              app.settings.getSetting(
                "aescripts",
                aegr_strings.scriptName + "_regex",
              ) == "false"
            );
      } else {
        pal.grp.footer.footerLeft.optns.regexOpt.regex.value =
          useRegex =
          aegr_strings.useRegex =
            false;
      }
      pal.grp.footer.footerLeft.main.replaceModeGrp.regex.imageON = regexOn;
      pal.grp.footer.footerLeft.main.replaceModeGrp.regex.imageOFF = regexOff;
      if (parseFloat(app.version) < 12) {
        pal.grp.footer.footerLeft.main.replaceModeGrp.regex.image = regexOff;
      } else {
        pal.grp.footer.footerLeft.main.replaceModeGrp.regex.onDraw =
          function () {
            var image = ScriptUI.newImage(
              aegr_strings.useRegex ? this.imageON : this.imageOFF,
            );
            this.graphics.drawImage(image, 0, 0, image.size[0], image.size[1]);
          };
      }
      for (var a = 0; a < aegr_strings.regExpModes.length; a += 1) {
        pal.grp.footer.footerLeft.optns.regexOpt.modes.add(
          "item",
          aegr_strings.regExpModes[a],
        );
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_dupsOnly",
        )
      ) {
        pal.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.value = dupsOnly = !(
          app.settings.getSetting(
            "aescripts",
            aegr_strings.scriptName + "_dupsOnly",
          ) == "false"
        );
      } else {
        pal.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.value =
          dupsOnly = false;
      }
      pal.grp.footer.footerLeft.main.replaceModeGrp.duplicatesOnly.imageON =
        duplicatesOn;
      pal.grp.footer.footerLeft.main.replaceModeGrp.duplicatesOnly.imageOFF =
        duplicatesOff;
      if (parseFloat(app.version) < 12) {
        pal.grp.footer.footerLeft.main.replaceModeGrp.duplicatesOnly.image =
          duplicatesOff;
      } else {
        pal.grp.footer.footerLeft.main.replaceModeGrp.duplicatesOnly.onDraw =
          function () {
            var image = ScriptUI.newImage(
              dupsOnly ? this.imageON : this.imageOFF,
            );
            this.graphics.drawImage(image, 0, 0, image.size[0], image.size[1]);
          };
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_fixExpressions",
        )
      ) {
        pal.grp.footer.footerLeft.optns.fixExpressionsGrp.fixExpressions.value =
          !(
            app.settings.getSetting(
              "aescripts",
              aegr_strings.scriptName + "_fixExpressions",
            ) == "false"
          );
      } else {
        pal.grp.footer.footerLeft.optns.fixExpressionsGrp.fixExpressions.value = true;
      }
      pal.grp.helpStatusGrp.status.visible =
        pal.grp.helpStatusGrp.status.text != "";
      pil_setReplaceModes(pal);
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_replaceMode",
        )
      ) {
        pal.grp.footer.footerLeft.main.replaceModeGrp.replaceMode.selection =
          app.settings.getSetting(
            "aescripts",
            aegr_strings.scriptName + "_replaceMode",
          );
      } else {
        pal.grp.footer.footerLeft.main.replaceModeGrp.replaceMode.selection = 1;
      }
      populateDropDown(pal.grp.topGrp.items.item);
      if (
        app.settings.haveSetting("aescripts", aegr_strings.scriptName + "_item")
      ) {
        pal.grp.topGrp.items.item.selection = app.settings.getSetting(
          "aescripts",
          aegr_strings.scriptName + "_item",
        );
      } else {
        pal.grp.topGrp.items.item.selection = 0;
      }
      populateDropDown(
        pal.grp.topGrp.scopes.scope,
        pal.grp.topGrp.items.item.selection.index,
      );
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_scope",
        )
      ) {
        pal.grp.topGrp.scopes.scope.selection = app.settings.getSetting(
          "aescripts",
          aegr_strings.scriptName + "_scope",
        );
      } else {
        pal.grp.topGrp.scopes.scope.selection = 0;
      }
      var palAdjust = thisObj instanceof Panel ? 4 : 0;
      addSubSearchFieldPairs();
      pal.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.visible = !(
        pal.grp.topGrp.items.item.selection.index ==
        pal.grp.topGrp.items.item.items.length - 1
      );
      pal.grp.topGrp.items.item.onChange = function () {
        populateDropDown(pal.grp.topGrp.scopes.scope, this.selection.index);
        pil_setReplaceModes(pal);
        app.settings.saveSetting(
          "aescripts",
          aegr_strings.scriptName + "_item",
          this.selection.index,
        );
      };
      pal.grp.topGrp.scopes.scope.onChange = function () {
        pil_setReplaceModes(pal);
        if (this.selection !== null) {
          pal.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.visible =
            !this.selection.text.match(/Render Queue/);
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_scope",
            this.selection.index,
          );
        }
      };
      pal.grp.footer.footerLeft.optns.fixExpressionsGrp.fixExpressions.onClick =
        function () {
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_fixExpressions",
            this.value,
          );
        };
      pal.grp.footer.footerLeft.main.replaceModeGrp.replaceMode.onChange =
        function () {
          if (this.selection != null) {
            app.settings.saveSetting(
              "aescripts",
              aegr_strings.scriptName + "_replaceMode",
              this.selection.index,
            );
          }
        };
      pal.grp.footer.footerLeft.main.replaceModeGrp.regex.visible =
        pal.grp.footer.footerLeft.optns.regexOpt.regex.visible =
        pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.visible =
        pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.visible =
          pal.grp.topGrp.mainMode.mode.selection.index == 0;
      pal.grp.topGrp.mainMode.mode.onChange = function () {
        if (aegr_strings.searchReplaceCounter > 1) {
          for (var i = aegr_strings.searchReplaceCounter; i > 1; i--) {
            aegr_removeSearchReplacePairs(pal);
          }
        }
        pal.grp.searchReplaceMaster[
          "searchReplace" + aegr_strings.searchReplaceCounter
        ].presetsGrp.addSub.visible =
          this.selection.index == 0 &&
          pal.grp.searchReplaceMaster[
            "searchReplace" + aegr_strings.searchReplaceCounter
          ].presetsGrp.addSub.counter == aegr_strings.searchReplaceCounter;
        aegr_updateUIElements(pal);
        pil_setReplaceModes(pal);
        pal.grp.footer.footerLeft.main.replaceModeGrp.regex.visible =
          pal.grp.footer.footerLeft.optns.regexOpt.regex.visible =
          pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.visible =
          pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.visible =
            this.selection.index == 0;
        switch (this.selection.index) {
          case 0:
            pal.grp.footer.footerLeft.main.goGroup.enabled =
              pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search
                .text != "";
            pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.size.height =
              pal.grp.searchReplaceMaster.searchReplace1.iconsGrp.search.size.height = 20;
            pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.visible =
              pal.grp.searchReplaceMaster.searchReplace1.iconsGrp.search.visible = true;
            break;
          case 1:
            pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.size.height =
              pal.grp.searchReplaceMaster.searchReplace1.iconsGrp.search.size.height = 0;
            pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.visible =
              pal.grp.searchReplaceMaster.searchReplace1.iconsGrp.search.visible = false;
            pal.grp.footer.footerLeft.main.goGroup.enabled =
              changeCase ||
              pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.replace
                .text != "";
            break;
          case 2:
            pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.size.height =
              pal.grp.searchReplaceMaster.searchReplace1.iconsGrp.search.size.height = 20;
            pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.visible =
              pal.grp.searchReplaceMaster.searchReplace1.iconsGrp.search.visible = true;
            pal.grp.footer.footerLeft.main.goGroup.enabled = !(
              pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search
                .text == "" &&
              pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.replace
                .text == ""
            );
            break;
        }
        app.settings.saveSetting(
          "aescripts",
          aegr_strings.scriptName + "_mode",
          this.selection.index,
        );
        pal.layout.layout(true);
        pal.layout.resize();
      };
      pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.onClick =
        function () {
          matchCase = aegr_strings.matchCase = this.value;
          pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.image =
            matchCase ? matchCaseOn : matchCaseOff;
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_matchCase",
            this.value,
          );
        };
      pal.grp.footer.footerLeft.main.replaceModeGrp.matchCase.onClick =
        function () {
          this.image = this.image == matchCaseOff ? matchCaseOn : matchCaseOff;
          matchCase = aegr_strings.matchCase = this.image == matchCaseOn;
          pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.value =
            matchCase;
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_matchCase",
            pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.value,
          );
        };
      pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCase.onClick =
        function () {
          changeCase = aegr_strings.changeCase = this.value;
          pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode.visible =
            this.value;
          if (this.value && pal.grp.topGrp.mainMode.mode.selection.index == 1) {
            pal.grp.footer.footerLeft.main.goGroup.enabled = true;
          }
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_changeCase",
            this.value,
          );
        };
      pal.grp.footer.footerLeft.optns.changeCaseGrp.changeCaseMode.onChange =
        function () {
          changeCaseMode = aegr_strings.changeCaseMode = this.selection.index;
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_changeCaseMode",
            this.selection.index,
          );
        };
      pal.grp.footer.footerLeft.optns.regexOpt.regex.onClick = function () {
        useRegex = aegr_strings.useRegex = this.value;
        pal.grp.footer.footerLeft.main.replaceModeGrp.regex.image = useRegex
          ? regexOn
          : regexOff;
        app.settings.saveSetting(
          "aescripts",
          aegr_strings.scriptName + "_regex",
          this.value,
        );
      };
      pal.grp.footer.footerLeft.main.replaceModeGrp.regex.onClick =
        function () {
          this.image = this.image == regexOff ? regexOn : regexOff;
          useRegex = aegr_strings.useRegex = this.image == regexOn;
          pal.grp.footer.footerLeft.optns.regexOpt.regex.value = useRegex;
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_regex",
            pal.grp.footer.footerLeft.optns.regexOpt.regex.value,
          );
        };
      pal.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.onClick = function () {
        dupsOnly = this.value;
        pal.grp.footer.footerLeft.main.replaceModeGrp.duplicatesOnly.image =
          dupsOnly ? duplicatesOn : duplicatesOff;
        app.settings.saveSetting(
          "aescripts",
          aegr_strings.scriptName + "_dupsOnly",
          this.value,
        );
      };
      pal.grp.footer.footerLeft.main.replaceModeGrp.duplicatesOnly.onClick =
        function () {
          this.image =
            this.image == duplicatesOff ? duplicatesOn : duplicatesOff;
          dupsOnly = this.image == duplicatesOn;
          pal.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.value = dupsOnly;
          app.settings.saveSetting(
            "aescripts",
            aegr_strings.scriptName + "_dupsOnly",
            pal.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.value,
          );
        };
      if (pal.grp.topGrp.mainMode.mode.selection.index == 0) {
        pal.grp.footer.footerLeft.main.goGroup.enabled =
          pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.text !=
          "";
      } else if (pal.grp.topGrp.mainMode.mode.selection.index == 1) {
        pal.grp.footer.footerLeft.main.goGroup.enabled =
          changeCase ||
          pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.replace.text !=
            "";
      } else {
        pal.grp.footer.footerLeft.main.goGroup.enabled = !(
          pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.text ==
            "" &&
          pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.replace.text ==
            ""
        );
      }
      pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.onChanging =
        pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.replace.onChanging =
          function () {
            if (pal.grp.topGrp.mainMode.mode.selection.index == 0) {
              pal.grp.footer.footerLeft.main.goGroup.enabled =
                pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search
                  .text != "";
            } else {
              pal.grp.footer.footerLeft.main.goGroup.enabled = !(
                pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search
                  .text == "" &&
                pal.grp.searchReplaceMaster.searchReplace1.fieldsGrp.replace
                  .text == ""
              );
            }
            var carriageReturnCount =
              this.text.match(/\r|\n/g) != null
                ? this.text.match(/\r|\n/g).length
                : 0;
            var extraPad = $.os.indexOf("Windows") != -1 ? 20 : 0;
            if (carriageReturnCount > 0) {
              this.size = [
                this.size[0],
                15 * (carriageReturnCount + 1) + extraPad,
              ];
            } else {
              this.size = [this.size[0], 20];
            }
            pal.layout.layout(true);
            pal.layout.resize();
          };
      pal.grp.helpStatusGrp.helpGrp.gear.onClick = function () {
        pal.grp.footer.footerLeft.optns.visible = this.value;
        pal.grp.footer.footerLeft.optns.regexOpt.regex.visible =
          pal.grp.footer.footerLeft.optns.matchCaseGrp.matchCase.visible =
            pal.grp.topGrp.mainMode.mode.selection.index == 0;
        pal.grp.footer.footerLeft.main.visible = !this.value;
      };
      pal.grp.helpStatusGrp.helpGrp.help.onClick = function () {
        oo89l.helpUI();
      };
      if (
        app.settings.haveSetting(
          "aescripts",
          aegr_strings.scriptName + "_consoleVisible",
        )
      ) {
        pal.grp.footer.footerLeft.optns.showConsole.value =
          pal.grp.consoleGrp.visible = !(
            app.settings.getSetting(
              "aescripts",
              aegr_strings.scriptName + "_consoleVisible",
            ) == "false"
          );
      } else {
        pal.grp.footer.footerLeft.optns.showConsole.value =
          pal.grp.consoleGrp.visible = false;
      }
      pal.grp.footer.footerLeft.optns.showConsole.onClick = function () {
        pal.grp.consoleGrp.visible = this.value;
        app.settings.saveSetting(
          "aescripts",
          aegr_strings.scriptName + "_consoleVisible",
          this.value,
        );
      };
      pal.grp.consoleGrp.buttons.clear.onClick = function () {
        this.parent.parent.console.removeAll();
      };
      pal.grp.consoleGrp.buttons.exportList.onClick = function () {
        var file = File(
          Folder.desktop.fsName + "/" + aegr_strings.scriptName + " Log.txt",
        );
        file = file.saveDlg(
          "Please select the name and location to save tab-delimited log file",
        );
        if (file) {
          file.open("w");
          file.encoding = "UTF-8";
          file.writeln(
            this.parent.parent.console.properties.columnTitles[0] +
              "\t" +
              this.parent.parent.console.properties.columnTitles[1] +
              "\t" +
              this.parent.parent.console.properties.columnTitles[2] +
              "\t" +
              this.parent.parent.console.properties.columnTitles[3],
          );
          for (var i = 0; i < this.parent.parent.console.items.length; i += 1) {
            var myItem = this.parent.parent.console.items[i];
            file.writeln(
              myItem.subItems[0].text +
                "\t" +
                myItem.subItems[1].text +
                "\t" +
                myItem.subItems[2].text +
                "\t" +
                myItem.subItems[2].text,
            );
          }
          file.close();
        }
      };
      pal.grp.footer.footerLeft.main.goGroup.goAll.onClick = function () {
        app.beginUndoGroup(aegr_strings.scriptName);
        aegr_doIt(pal, "all");
        app.endUndoGroup();
        var mainMode = pal.grp.topGrp.mainMode.mode.selection.index;
        for (var i = aegr_strings.searchReplaceCounter; i >= 1; i--) {
          saveDeletePreset(
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].presetsGrp.presets,
            "recents",
            undefined,
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].fieldsGrp.search.text,
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].fieldsGrp.replace.text,
            mainMode,
          );
        }
      };
      pal.grp.footer.footerLeft.main.goGroup.goNext.onClick = function () {
        app.beginUndoGroup(aegr_strings.scriptName);
        aegr_doIt(pal, "next");
        app.endUndoGroup();
        var mainMode = pal.grp.topGrp.mainMode.mode.selection.index;
        for (var i = aegr_strings.searchReplaceCounter; i >= 1; i--) {
          saveDeletePreset(
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].presetsGrp.presets,
            "recents",
            undefined,
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].fieldsGrp.search.text,
            pal.grp.searchReplaceMaster[
              "searchReplace" + aegr_strings.searchReplaceCounter
            ].fieldsGrp.replace.text,
            mainMode,
          );
        }
      };
      pal.layout.layout(true);
      pal.layout.resize();
      pal.onResizing = pal.onResize = function () {
        this.layout.resize();
      };
      pal.grp.helpStatusGrp.status.text = "";
      aegr_updateUIElements(pal);
    }
    return pal;
  }
  function colorIconsCustomDraw() {
    try {
      var graphics = this.graphics;
      graphics.drawImage(
        this.image,
        0,
        0,
        this.image.size[0],
        this.image.size[1],
      );
      if (
        aegr_strings.searchReplaceCounter > 1 &&
        this.counter > 1 &&
        this.name.match(/search/)
      ) {
        var textPen = graphics.newPen(
          graphics.PenType.SOLID_COLOR,
          [1, 1, 1],
          1,
        );
        var textFont = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          8,
        );
        graphics.drawString(
          this.counter,
          textPen,
          this.size[0] / 1.5 - graphics.measureString(this.counter)[0] / 2,
          this.size[1] / 2 - graphics.measureString(this.counter)[1] / 2,
          textFont,
        );
      }
    } catch (e) {}
  }
  function populateDropDown(pulldown, index) {
    if (pulldown != null) {
      pulldown.removeAll();
      var list =
        pulldown.name == "items"
          ? aegr_strings.items
          : pulldown.name == "modes"
            ? aegr_strings.mainModes
            : aegr_strings.items[index].scopes;
      var length =
        pulldown.name == "items"
          ? aegr_strings.items.length
          : pulldown.name == "modes"
            ? aegr_strings.mainModes.length
            : aegr_strings.items[index].scopes.length;
      for (var i = 0; i < length; i += 1) {
        var item = pulldown.name == "items" ? list[i].item : list[i];
        pulldown.add("item", item);
      }
      if (aegr_strings.dropdownFix) {
        var pulldownNumItems = pulldown.items.length;
        for (var i = 0; i < pulldownNumItems; i += 1) {
          pulldown.add("item", "");
        }
      }
      pulldown.selection = 0;
    }
  }
  function presetOnChange(
    pulldown,
    searchText,
    replaceText,
    useRegexCheckbox,
    matchCaseCheckbox,
    changeCaseCheckbox,
    changeCaseMode,
    icons,
  ) {
    if (pulldown.selection == null || pulldown.selection.text == null) {
      return null;
    }
    if (pulldown.selection.text == aegr_strings.savePreset) {
      if (
        !ScriptUI.environment.keyboardState.altKey &&
        searchText.text == "" &&
        replaceText.text == ""
      ) {
        alert("Please enter something in the search or replace fields to save");
        pulldown.selection = null;
        return null;
      }
      var name = searchText.text != "" ? searchText.text : replaceText.text;
      if (!ScriptUI.environment.keyboardState.altKey) {
        name = prompt(
          "Please name the preset\nBypass this step by holding the ALT key",
          name,
        );
        if (name == null) {
          pulldown.selection = null;
          return null;
        }
      }
      saveDeletePreset(
        pulldown,
        "save",
        name,
        searchText.text,
        replaceText.text,
      );
    } else if (pulldown.selection.text == aegr_strings.deletePreset) {
      alert(
        "To delete a preset hold the ALT key and select the preset from the list",
      );
      return;
    } else if (ScriptUI.environment.keyboardState.altKey) {
      saveDeletePreset(
        pulldown,
        "delete",
        undefined,
        searchText.text,
        replaceText.text,
      );
    } else {
      var item =
        pulldown.selection.index - 3 <= aegr_strings.presetsArray.length - 1
          ? aegr_strings.presetsArray[pulldown.selection.index - 3]
          : aegr_strings.recentsArray[
              pulldown.selection.index - aegr_strings.presetsArray.length - 4
            ];
      if (item != undefined) {
        searchText.text = item.searchText;
        replaceText.text = item.replaceText;
        var isRename = item.isRename;
        if (!isRename) {
          useRegexCheckbox.value = aegr_strings.useRegex = item.useRegex;
          matchCaseCheckbox.value = aegr_strings.matchCase = item.matchCase;
          changeCaseCheckbox.value = aegr_strings.changeCase = item.changeCase;
          changeCaseMode.selection = aegr_strings.changeCaseMode =
            item.changeCaseMode;
          icons.regex.image = item.useRegex
            ? icons.regex.imageON
            : icons.regex.imageOFF;
          icons.matchCase.image = item.matchCase
            ? icons.matchCase.imageON
            : icons.matchCase.imageOFF;
        }
        pulldown.selection = null;
        pulldown.parent.parent.parent.parent.footer.footerLeft.main.goGroup.enabled = true;
      }
    }
  }
  function saveDeletePreset(
    pulldown,
    mode,
    name,
    searchText,
    replaceText,
    mainMode,
  ) {
    if (name == undefined) {
      name = "";
    }
    var isRename = mainMode != undefined && mainMode == 1;
    if (mode == "delete") {
      var index =
        pulldown.selection.index - 3 <= aegr_strings.presetsArray.length - 1
          ? pulldown.selection.index - 3
          : pulldown.selection.index - aegr_strings.presetsArray.length - 4;
      var array =
        pulldown.selection.index - 3 <= aegr_strings.presetsArray.length - 1
          ? aegr_strings.presetsArray
          : aegr_strings.recentsArray;
      if (array.length >= index) {
        array.splice(index, 1);
        oo89l.saveSetting(
          aegr_strings.scriptName,
          "savedPresets",
          aegr_strings.presetsArray,
        );
        oo89l.saveSetting(
          aegr_strings.scriptName,
          "savedRecents",
          aegr_strings.recentsArray,
        );
        populatePresetsDropDown(pulldown);
        return;
      } else {
        alert("ERROR: Dropdown index out of sync");
        return;
      }
    }
    var isRecents = false;
    var isDuplicate = false;
    var currentArray =
      mode == "recents" ? aegr_strings.recentsArray : aegr_strings.presetsArray;
    if (
      mode == "save" &&
      aegr_strings.presetsArray.length + 1 > aegr_strings.presetLimit
    ) {
      alert(
        "You can only save " +
          aegr_strings.presetLimit +
          " presets, please delete some before you can save any new ones",
      );
      pulldown.selection = null;
      return;
    }
    if (name == "") {
      name = searchText;
    }
    if (isRename) {
      searchText = "";
      if (name == "" && replaceText != "") {
        name = replaceText;
      }
    }
    if (changeCase) {
      name +=
        "- " +
        aegr_strings.changeCaseStr +
        ": " +
        aegr_strings.changeCaseModes[changeCaseMode];
    }
    for (var i = 0; i < currentArray.length; i += 1) {
      if (
        mode == "save" &&
        searchText == currentArray[i].searchText &&
        replaceText == currentArray[i].replaceText &&
        useRegex == currentArray[i].useRegex &&
        matchCase == currentArray[i].matchCase &&
        changeCase == currentArray[i].changeCase &&
        changeCaseMode == currentArray[i].changeCaseMode
      ) {
        isDuplicate = true;
      }
    }
    if ((mode == "recents" || mode == "save") && !isDuplicate) {
      if (mode == "save") {
        aegr_strings.presetsArray.unshift({
          changeCase: changeCase,
          changeCaseMode: changeCaseMode,
          isRename: isRename,
          matchCase: matchCase,
          name: name,
          replaceText: replaceText,
          searchText: searchText,
          useRegex: useRegex,
        });
      }
      if (mode == "recents") {
        aegr_strings.recentsArray.unshift({
          changeCase: changeCase,
          changeCaseMode: changeCaseMode,
          isRename: isRename,
          matchCase: matchCase,
          name: name,
          replaceText: replaceText,
          searchText: searchText,
          useRegex: useRegex,
        });
      }
    }
    if (
      mode == "recents" &&
      aegr_strings.recentsArray.length > aegr_strings.recentsLimit
    ) {
      aegr_strings.recentsArray = aegr_strings.recentsArray.slice(
        0,
        aegr_strings.recentsLimit - 1,
      );
    }
    if (mode == "recents") {
      oo89l.saveSetting(
        aegr_strings.scriptName,
        "savedRecents",
        aegr_strings.recentsArray,
      );
    } else {
      oo89l.saveSetting(
        aegr_strings.scriptName,
        "savedPresets",
        aegr_strings.presetsArray,
      );
    }
    populatePresetsDropDown(pulldown);
  }
  function populatePresetsDropDown(pulldown) {
    if (pulldown != null) {
      aegr_strings.presetsArray = oo89l.haveSetting(
        aegr_strings.scriptName,
        "savedPresets",
      )
        ? oo89l.getSetting(aegr_strings.scriptName, "savedPresets")
        : [];
      aegr_strings.recentsArray = oo89l.haveSetting(
        aegr_strings.scriptName,
        "savedRecents",
      )
        ? oo89l.getSetting(aegr_strings.scriptName, "savedRecents")
        : [];
      pulldown.removeAll();
      pulldown.add("item", aegr_strings.savePreset);
      pulldown.add("item", aegr_strings.deletePreset);
      pulldown.add("separator");
      for (var i = 0; i < aegr_strings.presetsArray.length; i += 1) {
        if (aegr_strings.presetsArray[i] != "") {
          hasRegex = aegr_strings.presetsArray[i].useRegex;
          hasMatchCase = aegr_strings.presetsArray[i].matchCase;
          isRename = aegr_strings.presetsArray[i].isRename;
          item = pulldown.add("item", aegr_strings.presetsArray[i].name);
          if (!isRename && (hasRegex || hasMatchCase)) {
            item.image =
              hasRegex && hasMatchCase ? matchCaseRegexIcon : regexIcon;
            item.matchCase = hasMatchCase;
          }
        }
      }
      pulldown.add("separator");
      for (var i = 0; i < aegr_strings.recentsArray.length; i += 1) {
        if (aegr_strings.recentsArray[i] != "") {
          hasRegex = aegr_strings.recentsArray[i].useRegex;
          hasMatchCase = aegr_strings.recentsArray[i].matchCase;
          isRename = aegr_strings.recentsArray[i].isRename;
          item = pulldown.add("item", aegr_strings.recentsArray[i].name);
          if (!isRename && (hasRegex || hasMatchCase)) {
            item.image =
              hasRegex && hasMatchCase ? matchCaseRegexIcon : regexIcon;
            item.matchCase = hasMatchCase;
          }
        }
      }
      if (aegr_strings.dropdownFix) {
        pulldownNumItems = pulldown.items.length;
        for (var i = 0; i < pulldownNumItems; i += 1) {
          pulldown.add("item", "");
        }
      }
    }
  }
  function pil_setReplaceModes(palObj, saveSelection) {
    if (saveSelection == undefined) {
      saveSelection =
        palObj.grp.footer.footerLeft.main.replaceModeGrp.replaceMode
          .selection != null
          ? palObj.grp.footer.footerLeft.main.replaceModeGrp.replaceMode
              .selection.index
          : 1;
    }
    if (palObj.grp.topGrp.mainMode.mode.selection.index > 1) {
      pil_populateDropDown(
        palObj.grp.footer.footerLeft.main.replaceModeGrp.replaceMode,
        aegr_strings.addModes,
        0,
      );
    } else {
      pil_populateDropDown(
        palObj.grp.footer.footerLeft.main.replaceModeGrp.replaceMode,
        aegr_strings.replaceModes,
        saveSelection,
      );
    }
  }
  function pil_parseText(text, comp, layer, counter, i) {
    if (layer != null) {
      text = text.replace(/\[layername\]/gi, layer.name);
      text = text.replace(/\[layercomment\]/gi, layer.comment);
      if (text.match(/\[(0+)?layerindex\]/) != null) {
        var pad =
          text.match(/\[(0+)?layerindex\]/)[1] != null
            ? text.match(/\[(0+)?layerindex\]/)[1].length
            : 0;
        text = text.replace(
          /\[(0+)?layerindex\]/gi,
          pil_padDigits(layer.index, pad),
        );
      }
    } else {
      text = text.replace(/\[layername\]/gi, "");
      text = text.replace(/\[layerindex\]/gi, "");
      text = text.replace(/\[layercomment\]/gi, "");
    }
    if (comp != null) {
      text = text.replace(/\[compname\]/gi, comp.name);
      var layerNumMatch = text.match(/\[layer([0-9]+)name\]/);
      if (
        layerNumMatch != null &&
        layerNumMatch.length > 1 &&
        layerNumMatch[1] != null
      ) {
        var layerNum = parseInt(layerNumMatch[1], 10);
        if (layerNum <= comp.numLayers) {
          text = text.replace(
            /\[layer([0-9]+)name\]/gi,
            comp.layer(layerNum).name,
          );
        } else {
          text = text.replace(/\[layer([0-9]+)name\]/gi, "");
        }
      } else {
        text = text.replace(/\[layer([0-9]+)name\]/gi, "");
      }
    } else {
      text = text.replace(/\[compname\]/gi, "");
    }
    if (text.match(/\[projectname\]/i) && app.project.file == null) {
      text = text.replace(/\[projectname\]/gi, "Untitled Project.aep");
    }
    if (app.project.file != null) {
      text = text.replace(
        /\[projectname\]/gi,
        File.decode(app.project.file.name),
      );
    }
    if (text.match(/(\[date:)(.*)(\])/i) != null) {
      var dateText = text.match(/(\[date:)(.*)(\])/i);
      var dateRegex = new RegExp(
        dateText[0].replace(/[-[\]{}()*+?.\\^$|,#\s]/gi, "\\$&"),
        "gi",
      );
      text = text.replace(
        dateRegex,
        new Date().format(
          dateText[2].replace(/\//g, ":::::").replace(/-/g, "zzzzzzz"),
        ),
      );
      text = text.replace(/:::::/g, "/").replace(/zzzzzzz/g, "-");
    }
    var numMatch = text.match(/\[num=(-?[0-9]+),? ?(inc=-?[0-9]+)?\]/);
    if (numMatch != null && numMatch.length > 1 && numMatch[1] != null) {
      var inc = numMatch[2] != null && numMatch[2].match(/inc/)[0] != null;
      var rawNum = numMatch[1];
      var group = numMatch[3] != null;
      var startNum = parseFloat(rawNum);
      var padding = rawNum.length;
      counter = group ? i : counter;
      text = text.replace(
        /\[num=(-?[0-9]+),? ?(inc=-?[0-9]+)?\]/g,
        pil_padDigits(
          startNum +
            (counter * inc ? parseFloat(numMatch[2].match(/-?[0-9]+/)) : 1),
          padding,
        ),
      );
    }
    return text;
  }
  function pil_padDigits(n, totalDigits) {
    n = n.toString();
    var isNegative = n.match(/^-/);
    if (isNegative) {
      n = n.replace(/^-/, "");
    }
    var pd = "";
    if (totalDigits > n.length) {
      for (var m = 0; m < totalDigits - n.length; m += 1) {
        pd += "0";
      }
    }
    return isNegative ? "-" : "" + pd + n.toString();
  }
  function pil_populateDropDown(dropDown, itemsArray, sel) {
    dropDown.removeAll();
    for (var a = 0; a < itemsArray.length; a += 1) {
      dropDown.add("item", itemsArray[a]);
    }
    dropDown.selection = sel;
  }
  function aegr_removeSearchReplacePairs(palObj) {
    palObj.grp.searchReplaceMaster.remove(
      aegr_strings.searchArray[aegr_strings.searchReplaceCounter],
    );
    aegr_strings.searchArray.pop();
    aegr_strings.searchReplaceCounter--;
  }
  function aegr_updateUIElements(palObj) {
    palObj.grp.searchReplaceMaster[
      "searchReplace" + aegr_strings.searchReplaceCounter
    ].iconsGrp.search.image =
      palObj.grp.topGrp.mainMode.mode.selection.text.match(/rename/i)
        ? searchIcon
        : prefixIcon;
    palObj.grp.searchReplaceMaster[
      "searchReplace" + aegr_strings.searchReplaceCounter
    ].iconsGrp.replace.image =
      palObj.grp.topGrp.mainMode.mode.selection.text.match(/rename/i)
        ? inIcon2
        : suffixIcon;
    palObj.grp.searchReplaceMaster[
      "searchReplace" + aegr_strings.searchReplaceCounter
    ].fieldsGrp.search.size.height = palObj.grp.searchReplaceMaster[
      "searchReplace" + aegr_strings.searchReplaceCounter
    ].iconsGrp.search.size.height =
      palObj.grp.topGrp.mainMode.mode.selection.index == 1 ? 0 : 20;
    palObj.grp.searchReplaceMaster[
      "searchReplace" + aegr_strings.searchReplaceCounter
    ].iconsGrp.search.count = palObj.grp.searchReplaceMaster[
      "searchReplace" + aegr_strings.searchReplaceCounter
    ].iconsGrp.replace.count =
      aegr_strings.searchReplaceCounter == 1
        ? ""
        : aegr_strings.searchReplaceCounter;
    palObj.layout.layout(true);
    palObj.layout.resize();
  }
  function returnDuplicatesArray(sorted_arr, scope) {
    var results = [];
    for (var i = 0; i < sorted_arr.length - 1; i += 1) {
      if (scope == 8 && sorted_arr[i].item.hasOwnProperty("file")) {
        if (
          sorted_arr[i + 1].item.file.fsName == sorted_arr[i].item.file.fsName
        ) {
          results.push(sorted_arr[i]);
          results.push(sorted_arr[i + 1]);
          i++;
        } else {
          if (
            sorted_arr[i - 1].item.file.fsName == sorted_arr[i].item.file.fsName
          ) {
            results.push(sorted_arr[i]);
          }
        }
      } else {
        if (sorted_arr[i].item.hasOwnProperty("name")) {
          if (sorted_arr[i + 1].item.name == sorted_arr[i].item.name) {
            results.push(sorted_arr[i]);
            results.push(sorted_arr[i + 1]);
            i++;
          } else {
            if (
              i - 1 >= 0 &&
              sorted_arr[i - 1].item.name == sorted_arr[i].item.name
            ) {
              results.push(sorted_arr[i]);
            }
          }
        }
      }
    }
    return results;
  }
  function item_sort_desc(a, b) {
    if (a.item.name != undefined && b.item.name != undefined) {
      if (a.item.name < b.item.name) {
        return 1;
      }
      if (a.item.name > b.item.name) {
        return -1;
      }
      if (a.item.index != undefined && b.item.index != undefined) {
        if (a.item.index < b.item.index) {
          return -1;
        }
        if (a.item.index > b.item.index) {
          return 1;
        }
      }
      if (
        a.item.propertyIndex != undefined &&
        b.item.propertyIndex != undefined
      ) {
        if (a.item.propertyIndex < b.item.propertyIndex) {
          return -1;
        }
        if (a.item.propertyIndex > b.item.propertyIndex) {
          return 1;
        }
      }
      return 0;
    } else if (a.item.file != undefined && b.item.file != undefined) {
      if (a.item.file.fsName > b.item.file.fsName) {
        return 1;
      }
      if (a.item.file.fsName < b.item.file.fsName) {
        return -1;
      }
      return 0;
    } else {
      return 0;
    }
  }
  function aegr_doIt(palObj, allNext) {
    aegr_strings.changeCounter = [];
    var item = palObj.grp.topGrp.items.item.selection.text;
    var scope = palObj.grp.topGrp.scopes.scope.selection.text;
    var mainMode = palObj.grp.topGrp.mainMode.mode.selection.text;
    var replaceMode =
      palObj.grp.footer.footerLeft.main.replaceModeGrp.replaceMode.selection
        .index;
    var queued = scope == aegrs.renderQueueQueued;
    var unqueued = scope == aegrs.renderQueueUnqueued;
    var dupsOnly = palObj.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.value;
    var selArray = [];
    switch (item) {
      case aegri.projectPanelItemNames:
        if (replaceMode == 0) {
          app.project.selection.length = 0;
        }
        if (scope == aegrs.entireProject) {
          var start = 1;
          var projItems = app.project.items;
          var projSelectionLength = app.project.items.length;
        } else {
          var start = 0;
          var projItems = app.project.selection;
          var projSelectionLength = app.project.selection.length - 1;
        }
        for (var a = start; a <= projSelectionLength; a++) {
          if (
            mainMode.match(/add/i) ||
            replaceMode != 0 ||
            (replaceMode == 0 && !projItems[a].selected)
          ) {
            selArray.push({ container: "Project", item: projItems[a] });
          }
        }
        if (dupsOnly) {
          selArray = returnDuplicatesArray(
            selArray.sort(item_sort_desc),
            scope,
          );
        }
        aegr_doReplace(palObj, allNext, selArray, 0, selArray.length);
        break;
      case aegri.layerNames:
      case aegri.textInTextLayers:
      case aegri.effectNames:
      case aegri.layerMarkerComments:
      case aegri.compMarkerComments:
      case aegri.propertyNames:
      case aegri.expressions:
        switch (scope) {
          case aegrs.entireProject:
            projItemsLength = app.project.items.length;
            loopStart = 1;
            break;
          case aegrs.selectedComps:
            projItemsLength = app.project.selection.length - 1;
            loopStart = 0;
            break;
          case aegrs.selectedLayers:
          case aegrs.allLayers:
            if (
              app.project.activeItem == null ||
              !(app.project.activeItem instanceof CompItem)
            ) {
              if (scope == aegrs.selectedLayers) {
                alert("Please select some layers in the active comp");
              } else {
                alert("Please select a comp");
              }
              return false;
            }
            projItemsLength = 1;
            loopStart = 1;
            break;
          case aegrs.selectedProperties:
          case aegrs.selectedPropertiesChildren:
            if (
              app.project.activeItem == null ||
              app.project.activeItem.selectedProperties.length == 0
            ) {
              alert("Please select at least one property");
              return;
            }
            projItemsLength = 1;
            loopStart = 1;
            break;
        }
        for (var p = loopStart; p <= projItemsLength; p++) {
          switch (scope) {
            case aegrs.selectedLayers:
            case aegrs.allLayers:
            case aegrs.selectedProperties:
            case aegrs.selectedPropertiesChildren:
              selItem = app.project.activeItem;
              break;
            case aegrs.selectedComps:
              selItem = app.project.selection[p];
              break;
            case aegrs.entireProject:
              selItem = app.project.items[p];
              break;
          }
          if (selItem instanceof CompItem) {
            var myComp = selItem;
            switch (scope) {
              case aegrs.selectedLayers:
                compLoopStart = 0;
                compItemsLength = myComp.selectedLayers.length - 1;
                break;
              case aegrs.selectedProperties:
              case aegrs.selectedPropertiesChildren:
                compLoopStart = 0;
                compItemsLength = myComp.selectedProperties.length - 1;
                break;
              default:
                compLoopStart = 1;
                compItemsLength =
                  item == aegri.compMarkerComments ? 1 : myComp.numLayers;
                break;
            }
            for (var l = compLoopStart; l <= compItemsLength; l++) {
              if (scope == aegrs.selectedLayers) {
                myLayer = myComp.selectedLayers[l];
              } else if (
                scope == aegrs.selectedProperties ||
                scope == aegrs.selectedPropertiesChildren
              ) {
                myLayer = aegr_findContainingLayer(
                  myComp.selectedProperties[l],
                );
                curProp = myComp.selectedProperties[l];
              } else {
                myLayer = myComp.layer(l);
              }
              switch (item) {
                case aegri.layerNames:
                  selArray.push({ container: myComp.name, item: myLayer });
                  break;
                case aegri.effectNames:
                  if (myLayer.hasOwnProperty("effect")) {
                    for (var e = 1; e <= myLayer.effect.numProperties; e += 1) {
                      selArray.push({
                        container:
                          scope != aegrs.selectedLayers
                            ? myComp.name + " - "
                            : "" + myLayer.index + ". " + myLayer.name,
                        item: myLayer.effect(e),
                      });
                    }
                  }
                  break;
                case aegri.layerMarkerComments:
                  for (
                    var e = 1;
                    e <= myLayer.property("Marker").numKeys;
                    e += 1
                  ) {
                    var markerObj = {};
                    for (var k in myLayer.property("Marker").keyValue(e)) {
                      if (
                        k != "comment" &&
                        myLayer.property("Marker").keyValue(e).hasOwnProperty(k)
                      ) {
                        markerObj[k] = myLayer.property("Marker").keyValue(e)[
                          k
                        ];
                      }
                    }
                    selArray.push({
                      container:
                        scope != aegrs.selectedLayers
                          ? myComp.name + " - "
                          : "" + myLayer.index + ". " + myLayer.name,
                      index: e,
                      item: myLayer.property("Marker").keyValue(e),
                      marker: myLayer.property("Marker"),
                      markerObj: markerObj,
                    });
                  }
                  break;
                case aegri.compMarkerComments:
                  for (var e = 1; e <= myComp.markerProperty.numKeys; e += 1) {
                    var markerObj = {};
                    for (var k in myComp.markerProperty.keyValue(e)) {
                      if (
                        k != "comment" &&
                        myComp.markerProperty.keyValue(e).hasOwnProperty(k)
                      ) {
                        markerObj[k] = myComp.markerProperty.keyValue(e)[k];
                      }
                    }
                    selArray.push({
                      container: myComp.name,
                      index: e,
                      item: myComp.markerProperty.keyValue(e),
                      marker: myComp.markerProperty,
                      markerObj: markerObj,
                    });
                  }
                  break;
                case aegri.propertyNames:
                  if (
                    curProp.parentProperty.propertyType ===
                      PropertyType.INDEXED_GROUP &&
                    !isHidden(curProp)
                  ) {
                    selArray.push({ container: myLayer.name, item: curProp });
                  }
                  if (scope == aegrs.selectedPropertiesChildren) {
                    recursePropertyGroup(
                      curProp,
                      myLayer,
                      selArray,
                      PropertyType.INDEXED_GROUP,
                    );
                  }
                  break;
                case aegri.textInTextLayers:
                  if (myLayer.hasOwnProperty("text")) {
                    selArray.push({
                      container:
                        scope != aegrs.selectedLayers
                          ? myComp.name + " - "
                          : "" + myLayer.index + ". " + myLayer.name,
                      item: myLayer,
                    });
                  }
                  break;
                case aegri.expressions:
                  if (
                    scope == aegrs.selectedProperties ||
                    scope == aegrs.selectedPropertiesChildren
                  ) {
                    if (curProp.propertyType === PropertyType.PROPERTY) {
                      selArray.push({ container: myLayer.name, item: curProp });
                    }
                    if (scope == aegrs.selectedPropertiesChildren) {
                      recursePropertyGroup(
                        curProp,
                        myLayer,
                        selArray,
                        PropertyType.PROPERTY,
                      );
                    }
                  } else {
                    var expressionPropsArray =
                      aegr_getExpressionProperties(myLayer);
                    for (var e = 0; e < expressionPropsArray.length; e += 1) {
                      selArray.push({
                        container:
                          scope != aegrs.selectedLayers
                            ? myComp.name + " - "
                            : "" + myLayer.index + ". " + myLayer.name,
                        item: expressionPropsArray[e],
                      });
                    }
                  }
                  break;
              }
            }
            if (dupsOnly) {
              selArray = returnDuplicatesArray(
                selArray.sort(item_sort_desc),
                scope,
              );
            }
          }
        }
        aegr_doReplace(palObj, allNext, selArray, 0, selArray.length);
        break;
      case aegri.outputFilePaths:
        var myRQ = app.project.renderQueue;
        for (var a = 1; a <= myRQ.numItems; a += 1) {
          var curItem = app.project.renderQueue.item(a);
          if (
            (queued && curItem.status == RQItemStatus.QUEUED) ||
            (unqueued && curItem.status == RQItemStatus.UNQUEUED)
          ) {
            aegr_doReplace(
              palObj,
              allNext,
              curItem.outputModules,
              1,
              curItem.numOutputModules + 1,
            );
          }
        }
        break;
    }
    var replaceText =
      palObj.grp.footer.footerLeft.main.replaceModeGrp.replaceMode.selection.text
        .replace(/Rename/, "Renamed")
        .replace(/Select/, "Selected");
    var scopeText = palObj.grp.topGrp.items.item.selection.text;
    palObj.grp.helpStatusGrp.status.text = (
      aegr_strings.changeCounter.length +
      " " +
      scopeText +
      " " +
      replaceText
    ).toLowerCase();
    palObj.grp.helpStatusGrp.status.visible =
      palObj.grp.helpStatusGrp.status.text != "";
    for (var c = 0; c < aegr_strings.changeCounter.length; c += 1) {
      var myItem = palObj.grp.consoleGrp.console.add(
        "item",
        aegr_strings.changeCounter[c].container,
      );
      myItem.subItems[0].text = aegr_strings.changeCounter[c].item;
      myItem.subItems[1].text = aegr_strings.changeCounter[c].oldName;
      myItem.subItems[2].text = aegr_strings.changeCounter[c].newName;
    }
  }
  function recursePropertyGroup(curProp, myLayer, selArray, property_type) {
    for (var c = 1; c <= curProp.numProperties; c += 1) {
      theProp =
        property_type === PropertyType.INDEXED_GROUP
          ? curProp(c).parentProperty.propertyType
          : curProp(c).propertyType;
      if (theProp === property_type && !isHidden(curProp(c))) {
        selArray.push({ container: myLayer.name, item: curProp(c) });
      }
      if (curProp(c).numProperties > 0) {
        recursePropertyGroup(curProp(c), myLayer, selArray, property_type);
      }
    }
    return selArray;
  }
  function aegr_getExpressionProperties(source) {
    function aegr_getExpressionProperties_inner(source) {
      for (var i = 1; i <= source.numProperties; i += 1) {
        var sourceProp = source.property(i);
        var sourcePropName = source.property(i).name;
        var sourcePropMatchName = source.property(i).matchName;
        if (
          source.property(i) instanceof PropertyGroup ||
          source instanceof PropertyGroup ||
          source.property(i).canSetEnabled ||
          source.property(i).isModified
        ) {
          aegr_getExpressionProperties_inner(source.property(i));
        }
        if (
          source.property(i) instanceof Property &&
          source.property(i).isModified &&
          !source.property(i).elided &&
          source.property(i).canSetExpression &&
          source.property(i).expression != ""
        ) {
          expressionsPropsArray.push(source.property(i));
        }
      }
    }
    var expressionsPropsArray = [];
    aegr_getExpressionProperties_inner(source);
    return expressionsPropsArray;
  }
  function aegr_findContainingLayer(prop) {
    while (prop.parentProperty instanceof PropertyGroup) {
      prop = prop.parentProperty;
    }
    return prop.parentProperty;
  }
  function aegr_findDeepestSelectedProp() {
    var comp = app.project.activeItem;
    var numDeepestProps = 0;
    var deepestPropDepth = 0;
    for (var i = 0; i < comp.selectedProperties.length; i += 1) {
      prop = comp.selectedProperties[i];
      if (prop.propertyDepth >= deepestPropDepth) {
        if (prop.propertyDepth > deepestPropDepth) {
          numDeepestProps = 0;
        }
        deepestProp = prop;
        numDeepestProps++;
        deepestPropDepth = prop.propertyDepth;
      } else {
        continue;
      }
    }
    return numDeepestProps > 1 ? null : deepestProp;
  }
  function aegr_doReplace(palObj, allNext, itemArray, start, end) {
    if (
      aegr_strings.isTrial &&
      aegr_strings.trialCount > aegr_strings.trialCountLimit
    ) {
      alert(aegr_strings.errTrialCountLimit);
      return;
    }
    if (aegr_strings.isTrial) {
      aegr_strings.trialCount++;
      app.settings.saveSetting(
        "aescripts",
        aegr_strings.scriptName + "_tCount",
        aegr_strings.trialCount,
      );
    }
    if (
      (aegr_strings.isTrial && end - start > aegr_strings.trialLimit) ||
      aegr_strings.isTrial
    ) {
      alert(aegr_strings.errTrialLimit);
      end = aegr_strings.trialLimit - start;
    }
    var item = palObj.grp.topGrp.items.item.selection.text;
    var scope = palObj.grp.topGrp.scopes.scope.selection.text;
    var mainMode = palObj.grp.topGrp.mainMode.mode.selection.index;
    var replaceMode =
      palObj.grp.footer.footerLeft.main.replaceModeGrp.replaceMode.selection
        .text;
    var fixExpressions =
      palObj.grp.footer.footerLeft.optns.fixExpressionsGrp.fixExpressions.value;
    var regexMode = "";
    regexMode = matchCase ? "g" : "gi";
    var numCounter = 0;
    var lastDup = "";
    for (var i = start; i < end; i++) {
      if (replaceMode.match(/select/i)) {
        itemArray[i].item.selected = false;
      }
      switch (item) {
        case aegri.outputFilePaths:
          myName = mySearchItem = itemArray[i].file.fsName;
          break;
        case aegri.textInTextLayers:
          mySearchItem = itemArray[i].item.text.sourceText.value.text;
          myName = itemArray[i].item.name;
          break;
        case aegri.layerMarkerComments:
        case aegri.compMarkerComments:
          mySearchItem = itemArray[i].item.comment;
          myName = itemArray[i].container;
          break;
        case aegri.expressions:
          mySearchItem = itemArray[i].item.expression;
          myName = itemArray[i].item.name;
          break;
        default:
          mySearchItem = itemArray[i].item.name;
          break;
      }
      var dupsOnly = palObj.grp.footer.footerLeft.optns.dupsGrp.dupsOnly.value;
      if (dupsOnly) {
        if (lastDup == "") {
          lastDup = mySearchItem;
        }
        switch (item) {
          case aegri.outputFilePaths:
            mySearchItemNext = i + 1 < end ? itemArray[i + 1].file.fsName : "";
            break;
          case aegri.textInTextLayers:
            mySearchItemNext =
              i + 1 < end ? itemArray[i + 1].item.text.sourceText : "";
            break;
          case aegri.layerMarkerComments:
          case aegri.compMarkerComments:
            mySearchItemNext = i + 1 < end ? itemArray[i + 1].item.comment : "";
            break;
          case aegri.expressions:
            mySearchItemNext =
              i + 1 < end ? itemArray[i + 1].item.expression : "";
            break;
          default:
            mySearchItemNext = i + 1 < end ? itemArray[i + 1].item.name : "";
            break;
        }
        if (mySearchItem != lastDup) {
          numCounter = 0;
          lastDup = mySearchItem;
        } else {
          lastDup =
            mySearchItem != mySearchItemNext ? mySearchItem : mySearchItemNext;
        }
      }
      if (mySearchItem.match(/\r|\n/g)) {
        regexMode += "m";
      }
      switch (mainMode) {
        case 0:
        case 1:
          for (var h = 1; h <= aegr_strings.searchReplaceCounter; h += 1) {
            if (mainMode == 0) {
              if (palObj.grp.footer.footerLeft.optns.regexOpt.regex.value) {
                try {
                  searchRegex = new RegExp(
                    palObj.grp.searchReplaceMaster["searchReplace" + h]
                      .fieldsGrp.search.text,
                    regexMode,
                  );
                } catch (e) {
                  alert(
                    "Regular Expression syntax Error\nPlease check that your search string has proper RegEx syntax and try again\n\n" +
                      e.toString(),
                  );
                  return;
                }
              } else {
                searchTextCleaned = palObj.grp.searchReplaceMaster[
                  "searchReplace" + h
                ].fieldsGrp.search.text.replace(
                  /[-[\]{}()*+?.\\^$|,#\s\/]/gm,
                  "\\$&",
                );
                searchRegex = new RegExp(
                  searchTextCleaned.replace(/(\n|\r)/gm, "\r"),
                  regexMode,
                );
              }
            } else {
              searchRegex = new RegExp(/.*/m);
            }
            var replaceString =
              palObj.grp.searchReplaceMaster["searchReplace" + h].fieldsGrp
                .replace.text;
            var comp =
              itemArray[i].item instanceof CompItem ? itemArray[i].item : null;
            var layer = null;
            if (
              itemArray[i].item instanceof AVLayer ||
              itemArray[i].item instanceof CameraLayer ||
              itemArray[i].item instanceof LightLayer ||
              itemArray[i].item instanceof ShapeLayer ||
              itemArray[i].item instanceof TextLayer
            ) {
              layer = itemArray[i].item;
              comp = itemArray[i].item.containingComp;
            } else {
              if (
                itemArray[i].item instanceof Property ||
                itemArray[i].item instanceof PropertyGroup
              ) {
                layer = aegr_findContainingLayer(itemArray[i].item);
              }
            }
            replaceString = pil_parseText(
              replaceString,
              comp,
              layer,
              numCounter,
              i,
            );
            if (changeCase && replaceString == "") {
              replaceString = mySearchItem;
            }
            if (
              palObj.grp.footer.footerLeft.optns.regexOpt.regex.value &&
              replaceString == ""
            ) {
              regexMode = regexMode.replace(/g/, "");
              searchRegex = new RegExp(searchRegex.source, regexMode);
            }
            var oldSearchItem = mySearchItem;
            if (mySearchItem.match(searchRegex)) {
              switch (item) {
                case aegri.outputFilePaths:
                  mySearchItem = mySearchItem.replace(
                    searchRegex,
                    replaceString,
                  );
                  mySearchItem = doChangeCase(mySearchItem);
                  itemArray[i].file = new File(mySearchItem);
                  aegr_strings.changeCounter.push({
                    container: "Render Queue",
                    item: itemArray[i].file.displayName,
                    newName: mySearchItem,
                    oldName: oldSearchItem,
                  });
                  numCounter++;
                  break;
                default:
                  if (!isHidden(itemArray[i].item)) {
                    try {
                      if (replaceMode.match(/rename/i)) {
                        if (useRegex) {
                          mySearchItem = mySearchItem.replace(
                            searchRegex,
                            replaceString,
                          );
                        } else {
                          mySearchItem = mySearchItem.replace(
                            searchRegex,
                            function () {
                              return replaceString;
                            },
                          );
                        }
                        mySearchItem = doChangeCase(mySearchItem);
                        switch (item) {
                          case aegri.textInTextLayers:
                            itemArray[i].item.text.sourceText.setValue(
                              new TextDocument(mySearchItem),
                            );
                            itemArray[i].item.name = mySearchItem;
                            break;
                          case aegri.layerMarkerComments:
                          case aegri.compMarkerComments:
                            var newMarkerValue = new MarkerValue(mySearchItem);
                            for (var k in itemArray[i].markerObj) {
                              newMarkerValue[k] = itemArray[i].markerObj[k];
                            }
                            itemArray[i].marker.setValueAtKey(
                              itemArray[i].index,
                              newMarkerValue,
                            );
                            break;
                          case aegri.expressions:
                            itemArray[i].item.expression = mySearchItem;
                            break;
                          default:
                            if (
                              itemArray[i].item.propertyType !=
                                PropertyType.INDEXED_GROUP &&
                              itemArray[i].item.hasOwnProperty("name")
                            ) {
                              itemArray[i].item.name = mySearchItem;
                            }
                            break;
                        }
                        if (fixExpressions && item != aegri.expressions) {
                          app.project.autoFixExpressions(
                            oldSearchItem,
                            mySearchItem,
                          );
                        }
                      }
                      if (replaceMode.match(/select/i)) {
                        itemArray[i].item.selected = true;
                      }
                      if (item.match(/Marker Comments/)) {
                        aegr_strings.changeCounter.push({
                          container: itemArray[i].container,
                          item: "Marker",
                          newName: mySearchItem,
                          oldName: oldSearchItem,
                        });
                      } else {
                        aegr_strings.changeCounter.push({
                          container: itemArray[i].container,
                          item: itemArray[i].item.name,
                          newName: mySearchItem,
                          oldName: oldSearchItem,
                        });
                      }
                      numCounter++;
                    } catch (e) {
                      alert("Replace Error\n" + e.toString());
                    }
                  }
                  break;
              }
            }
          }
          break;
        case 2:
          var oldSearchItem = mySearchItem;
          var prefix =
            palObj.grp.searchReplaceMaster.searchReplace1.fieldsGrp.search.text;
          var suffix =
            palObj.grp.searchReplaceMaster.searchReplace1.fieldsGrp.replace
              .text;
          var comp =
            itemArray[i].item instanceof CompItem ? itemArray[i].item : null;
          if (itemArray[i].item instanceof AVLayer) {
            var layer = itemArray[i].item;
            comp = itemArray[i].item.containingComp;
          } else {
            var layer = null;
          }
          prefix = pil_parseText(prefix, comp, layer, numCounter, i);
          suffix = pil_parseText(suffix, comp, layer, numCounter, i);
          mySearchItem = prefix + mySearchItem + suffix;
          mySearchItem = doChangeCase(mySearchItem);
          switch (item) {
            case aegri.outputFilePaths:
              itemArray[i].item.file = new File(mySearchItem);
              aegr_strings.changeCounter.push({
                container: "Render Queue",
                item: itemArray[i].file.displayName,
                newName: mySearchItem,
                oldName: oldSearchItem,
              });
              break;
            case aegri.textInTextLayers:
              itemArray[i].item.text.sourceText.setValue(
                new TextDocument(mySearchItem),
              );
              break;
            case aegri.layerMarkerComments:
            case aegri.compMarkerComments:
              var newMarkerValue = new MarkerValue(mySearchItem);
              for (var k in itemArray[i].markerObj) {
                newMarkerValue[k] = itemArray[i].markerObj[k];
              }
              itemArray[i].marker.setValueAtKey(
                itemArray[i].index,
                newMarkerValue,
              );
              break;
            case aegri.expressions:
              itemArray[i].item.expression = mySearchItem;
              break;
            default:
              if (
                itemArray[i].item.propertyType != PropertyType.INDEXED_GROUP &&
                itemArray[i].item.hasOwnProperty("name")
              ) {
                itemArray[i].item.name = mySearchItem;
              }
              aegr_strings.changeCounter.push({
                container: itemArray[i].container,
                item: itemArray[i].item.name,
                newName: mySearchItem,
                oldName: oldSearchItem,
              });
              break;
          }
          numCounter++;
      }
      if (allNext == "next") {
        if (replaceMode.match(/rename/i) || oldSearchItem.match(searchRegex)) {
          return;
        }
      }
    }
  }
  function doChangeCase(str) {
    if (changeCase) {
      switch (changeCaseMode.toString()) {
        case "0":
          return str.toLowerCase();
          break;
        case "1":
          return str.toUpperCase();
          break;
        case "2":
          return str.toLowerCase().replace(/\b\w/g, function (m) {
            return m.toUpperCase();
          });
          break;
      }
    } else {
      return str;
    }
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
  var aegri = {
    compMarkerComments: "Comp Marker Comments",
    effectNames: "Effect Names",
    expressions: "Expressions",
    layerMarkerComments: "Layer Marker Comments",
    layerNames: "Layer Names",
    outputFilePaths: "Output file paths",
    projectPanelItemNames: "Project Panel Item Names",
    propertyNames: "Property Names",
    textInTextLayers: "Text in Text Layers",
  };
  var aegrs = {
    allLayers: "In All Layers in Active Comp",
    entireProject: "In Entire Project",
    renderQueueQueued: "In RQ Queued Items",
    renderQueueUnqueued: "In RQ Unqueued Items",
    selectedComps: "In Selected Comps in Project Panel",
    selectedItems: "In Selected Items in Project Panel",
    selectedLayers: "In Selected Layers in Active Comp",
    selectedProperties: "In Selected Properties",
    selectedPropertiesChildren: "In Selected Properties and Children",
  };
  var aegr_strings = {
    addModes: ["Add"],
    all: ["Once", "All"],
    betaExpirationDate: new Date("Sep 30, 2018"),
    beta_mode: false,
    blankIcon: {
      bin: __BLOB__BLOB_000015__,
      name: "blankIcon.png",
    },
    changeCaseModes: ["lower", "UPPER", "Capitalize"],
    changeCaseStr: "Change Case",
    changeCaseTxtHelp: "Will change the case of the renamed item",
    changeCounter: [],
    customVariables: [
      "layerName",
      "layerIndex",
      "compName",
      "projectName",
      "date:MM/dd/yy",
      "date:MMM dd, yyyy",
      "date:E MMM dd, yyyy hh:mm a",
    ],
    deletePreset: "Delete from presets",
    duplicatesOff: {
      bin: __BLOB__BLOB_000016__,
      name: "duplicatesOff.png",
    },
    duplicatesOn: {
      bin: __BLOB__BLOB_000017__,
      name: "duplicatesOn.png",
    },
    dupsOnlyTxt: "Duplicates only",
    dupsOnlyTxtHelp: "Will only rename duplicate items",
    errDiskPermission:
      "Error creating %1\nPlease check the permissions for this folder:\n%2\n\nA temp folder will be used instead",
    errTrialCountLimit:
      "You have reached the trial version use limit, please purchase a license to continue using it",
    errTrialLimit:
      "The trial version is limited and will only replace the first 2 items. The full version does not have any limitations",
    fixExpressionsTxt: "Fix expressions",
    fixExpressionsTxtHelp:
      "Will fix any references in expressions throughout the project. This is slower to process but expressions will not break.",
    gearIcon: {
      bin: __BLOB__BLOB_CLEANED__,
      name: "gearBtn1.png",
    },
    groupDupsTxt: "group",
    groupDupsTxtHelp:
      "Will group duplicates when numbering. ie: Black Solid 1, Black Solid 2, Black Solid 3, Red Solid 1, Red Solid 2, Red Solid 3",
    inIcon: {
      bin: __BLOB__BLOB_000018__,
      name: "inIcon.png",
    },
    inIcon1: {
      bin: __BLOB__BLOB_000019__,
      name: "inIcon1.png",
    },
    inIcon2: {
      bin: __BLOB__BLOB_000020__,
      name: "inIcon2.png",
    },
    inIcon50: {
      bin: __BLOB__BLOB_000021__,
      name: "inIcon2.png",
    },
    items: [
      {
        item: aegri.projectPanelItemNames,
        scopes: [aegrs.selectedItems, aegrs.entireProject],
      },
      {
        item: aegri.layerNames,
        scopes: [
          aegrs.allLayers,
          aegrs.selectedLayers,
          aegrs.selectedComps,
          aegrs.entireProject,
        ],
      },
      {
        item: aegri.textInTextLayers,
        scopes: [
          aegrs.selectedLayers,
          aegrs.allLayers,
          aegrs.selectedComps,
          aegrs.entireProject,
        ],
      },
      {
        item: aegri.layerMarkerComments,
        scopes: [
          aegrs.selectedLayers,
          aegrs.allLayers,
          aegrs.selectedComps,
          aegrs.entireProject,
        ],
      },
      {
        item: aegri.compMarkerComments,
        scopes: [aegrs.selectedComps, aegrs.entireProject],
      },
      {
        item: aegri.effectNames,
        scopes: [
          aegrs.selectedLayers,
          aegrs.allLayers,
          aegrs.selectedComps,
          aegrs.entireProject,
        ],
      },
      {
        item: aegri.propertyNames,
        scopes: [aegrs.selectedProperties, aegrs.selectedPropertiesChildren],
      },
      {
        item: aegri.expressions,
        scopes: [
          aegrs.selectedLayers,
          aegrs.selectedProperties,
          aegrs.selectedPropertiesChildren,
          aegrs.selectedComps,
          aegrs.entireProject,
        ],
      },
      {
        item: aegri.outputFilePaths,
        scopes: [aegrs.renderQueueQueued, aegrs.renderQueueUnqueued],
      },
    ],
    lookGlasses: {
      bin: __BLOB__BLOB_000022__,
      name: "lookGlasses.png",
    },
    lookIcon: {
      bin: __BLOB__BLOB_000023__,
      name: "lookIcon.png",
    },
    mainModes: ["Search/Rename", "Rename", "Add Prefix/Suffix to"],
    matchCaseOff: {
      bin: __BLOB__BLOB_000024__,
      name: "matchCaseOff.png",
    },
    matchCaseOn: {
      bin: __BLOB__BLOB_000025__,
      name: "matchCaseOn.png",
    },
    matchCaseRegexIcon: {
      bin: __BLOB__BLOB_000026__,
      name: "matchCaseRegexIcon1.png",
    },
    matchCaseStr: "Match Case",
    matchCaseTxtHelp: "Case sensitive match",
    multiline: {
      bin: __BLOB__BLOB_000027__,
      name: "multiline.png",
    },
    prefixIcon: {
      bin: __BLOB__BLOB_000028__,
      name: "prefixIcon.png",
    },
    presetLimit: 10,
    presetsArray: [],
    queued: ["All queued items", "All un-queued items"],
    recentsArray: [],
    recentsLimit: 5,
    regExpModes: ['"g" global', '"i" ignore case', '"gi" both', "no flags"],
    regexIcon: {
      bin: __BLOB__BLOB_000029__,
      name: "regexIcon.png",
    },
    regexOff: {
      bin: __BLOB__BLOB_000030__,
      name: "regexOff.png",
    },
    regexOn: {
      bin: __BLOB__BLOB_000031__,
      name: "regexOn.png",
    },
    replaceArray: [],
    replaceIcon: {
      bin: __BLOB__BLOB_000032__,
      name: "replaceIcon.png",
    },
    replaceIcon50: {
      bin: __BLOB__BLOB_000033__,
      name: "replaceIcon50.png",
    },
    replaceModes: ["Select", "Rename", "Rename & Select"],
    replaceOnlyModes: ["Rename"],
    savePreset: "Save to presets",
    scriptName: "AE Global Renamer",
    scriptUrl: "ae-global-renamer",
    scriptVersion: "2.3.5",
    searchArray: [],
    searchDotsIcon: {
      bin: __BLOB__BLOB_000034__,
      name: "searchDotsIcon.png",
    },
    searchIcon: {
      bin: __BLOB__BLOB_000035__,
      name: "searchIcon.png",
    },
    searchIcon50: {
      bin: __BLOB__BLOB_000036__,
      name: "searchIcon50.png",
    },
    searchReplaceCounter: 0,
    searchTextIcon: {
      bin: __BLOB__BLOB_000037__,
      name: "searchTextIcon.png",
    },
    selectionIcon: {
      bin: __BLOB__BLOB_000038__,
      name: "selectionIcon.png",
    },
    strAllButton: "All",
    strClearButton: "Clear Log",
    strExportButton: "Export Log",
    strHelp:
      "//////////////////\n//////USAGE//////\n//////////////////\nSet the pulldowns from top to bottom. Set what you want to do, what you are looking for and where you are looking for it.  For search and rename it will search for the \'Search\' string and rename it with the \'Rename\' string. Hit the + and - buttons to add search/rename pairs. The search and renaming will be done in order, so the second search will happen on the result of the first rename, etc.\n\n//////////////////\n//////REGEX//////\n//////////////////\nFor fancy search and rename click on the gear icon and use regular expressions by checking the \'Use Regex\' option.  Regex is very powerful and too much to explain how to use here but one tip is you can put search terms in parenthesis to create capture groups and then call them back in the rename field using $1, $2, etc.\n\nSearch: (Main) (Comp)_(Shot1)\nReplace: $3_$2-$1\n\nwill replace: Main Comp_Shot1\nwith: Shot1_Comp-Main\n\n//////////////////////\n//////KEYWORDS//////\n//////////////////////\nUse these special keywords in the rename field:\n[layername] - will insert the layer name\n[layerindex] - will insert the layer index. Tip: adding zeroes will pad [000layerindex] = 001,002,etc\n[layercomment] - will insert the layer comment\n[layer#name] - will insert the name of the layer # indicated. To insert the name of layer 5: [layer5name]\n[compname] - will insert the comp name\n[projectname] - will insert the project name\n[date:E MMM dd, yyyy hh:mm a] - will insert the current date and time, this field uses the JavascriptToolbox.com date function which can be further customized.\n[num=##,inc=##] - will insert a padded number and increment by the optional inc; numbers can be negative, add leading zeros to pad. For example: [num=005,inc=10] will start numbering at 5 and increment by 10 with 3 number padding: 010, 020, 030, etc\n[num=015,inc=-10] will start numbering at 15 and increase (decrease really) by -10 with 3 number padding: 015, 005, -005, etc\n",
    strHelpBtn: "?",
    strItem: "Search",
    strMode: "Do",
    strNextButton: "Next",
    strQueued: ["Queued", "Un-Queued"],
    strRegex: "Regex",
    strReplace: ["Rename", "Suffix"],
    strScope: "In",
    strSearch: ["Search", "Prefix"],
    suffixIcon: {
      bin: __BLOB__BLOB_000039__,
      name: "suffixIcon.png",
    },
    trialCount: 0,
    trialCountLimit: 30,
    trialLimit: 2,
    useRegExpTxt: "Use Regex",
    useRegExpTxtHelp:
      "Use Regular Expression Syntax.  If you don\\\'t know what this is, then it is probably best to leave it off",
  };
  if (
    app.settings.haveSetting(
      "aescripts",
      aegr_strings.scriptName + "_dropdownFix",
    )
  ) {
    aegr_strings.dropdownFix = !(
      app.settings.getSetting(
        "aescripts",
        aegr_strings.scriptName + "_dropdownFix",
      ) == "false"
    );
  } else {
    aegr_strings.dropdownFix = false;
  }
  var afs = {
    betaExpirationDate: aegr_strings.betaExpirationDate,
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "https://aescripts.com/contact/",
    helpButtons: [
      $.os.indexOf("Windows") != -1
        ? {
            btnValue: aegr_strings.dropdownFix,
            name: "Cutoff DropDown Menu Fix",
            onClickFunction: function () {
              aegr_strings.dropdownFix = this.value;
              app.settings.saveSetting(
                "aescripts",
                aegr_strings.scriptName + "_dropdownFix",
                this.value,
              );
              alert(
                "Please restart " +
                  aegr_strings.scriptName +
                  " to have the change take effect",
              );
            },
            type: "Checkbox",
          }
        : {},
    ],
    helpText: aegr_strings.strHelp,
    offerBeta: aegr_strings.beta_mode,
    offerTrial: true,
    privateNumber: 5533251455577250,
    productSKU: "LAAGR2-SUL",
    scriptAuthor: "Lloyd Alvarez",
    scriptName: aegr_strings.scriptName,
    scriptURL: aegr_strings.scriptUrl,
    scriptVersion: aegr_strings.scriptVersion,
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
    var mx = __BLOB__BLOB_000040__;
    var wx = __BLOB__BLOB_000041__;
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
  var oo89l = new a(afs);
  if (
    app.settings.haveSetting("aescripts", aegr_strings.scriptName + "_tCount")
  ) {
    aegr_strings.trialCount = parseInt(
      app.settings.getSetting("aescripts", aegr_strings.scriptName + "_tCount"),
      10,
    );
  }
  var regexIcon = createImageResourceFile(
    aegr_strings.regexIcon,
    getUserDataFolder(),
  ).fsName;
  var matchCaseRegexIcon = createImageResourceFile(
    aegr_strings.matchCaseRegexIcon,
    getUserDataFolder(),
  ).fsName;
  var regexOn = createImageResourceFile(
    aegr_strings.regexOn,
    getUserDataFolder(),
  ).fsName;
  var regexOff = createImageResourceFile(
    aegr_strings.regexOff,
    getUserDataFolder(),
  ).fsName;
  var matchCaseOn = createImageResourceFile(
    aegr_strings.matchCaseOn,
    getUserDataFolder(),
  ).fsName;
  var matchCaseOff = createImageResourceFile(
    aegr_strings.matchCaseOff,
    getUserDataFolder(),
  ).fsName;
  var duplicatesOn = createImageResourceFile(
    aegr_strings.duplicatesOn,
    getUserDataFolder(),
  ).fsName;
  var duplicatesOff = createImageResourceFile(
    aegr_strings.duplicatesOff,
    getUserDataFolder(),
  ).fsName;
  var useRegex = false;
  aegr_strings.useRegex = useRegex;
  var dupsOnly = false;
  var matchCase = 0;
  aegr_strings.matchCase = matchCase;
  var changeCase = (aegr_strings.changeCase = false);
  var changeCaseMode = (aegr_strings.changeCaseMode = 0);
  aegr_strings.savedPresetsArrayRegexSeparatorRegExp = new RegExp(
    "^([0-3])" + aegr_strings.savedPresetsArrayRegexSeparator,
  );
  var searchIcon = createImageResourceFile(
    aegr_strings.searchIcon,
    getUserDataFolder(),
  ).fsName;
  var replaceIcon = createImageResourceFile(
    aegr_strings.replaceIcon,
    getUserDataFolder(),
  ).fsName;
  var searchIcon50 = createImageResourceFile(
    aegr_strings.searchIcon50,
    getUserDataFolder(),
  ).fsName;
  var replaceIcon50 = createImageResourceFile(
    aegr_strings.replaceIcon50,
    getUserDataFolder(),
  ).fsName;
  var prefixIcon = createImageResourceFile(
    aegr_strings.prefixIcon,
    getUserDataFolder(),
  ).fsName;
  var suffixIcon = createImageResourceFile(
    aegr_strings.suffixIcon,
    getUserDataFolder(),
  ).fsName;
  var lookIcon = createImageResourceFile(
    aegr_strings.lookIcon,
    getUserDataFolder(),
  ).fsName;
  var inIcon = createImageResourceFile(
    aegr_strings.inIcon,
    getUserDataFolder(),
  ).fsName;
  var inIcon1 = createImageResourceFile(
    aegr_strings.inIcon1,
    getUserDataFolder(),
  ).fsName;
  var inIcon2 = createImageResourceFile(
    aegr_strings.inIcon2,
    getUserDataFolder(),
  ).fsName;
  var inIcon50 = createImageResourceFile(
    aegr_strings.inIcon50,
    getUserDataFolder(),
  ).fsName;
  var blankIcon = createImageResourceFile(
    aegr_strings.blankIcon,
    getUserDataFolder(),
  ).fsName;
  var gearIcon = createImageResourceFile(
    aegr_strings.gearIcon,
    getUserDataFolder(),
  ).fsName;
  var selectionIcon = createImageResourceFile(
    aegr_strings.selectionIcon,
    getUserDataFolder(),
  ).fsName;
  var searchTextIcon = createImageResourceFile(
    aegr_strings.searchTextIcon,
    getUserDataFolder(),
  ).fsName;
  var lookGlasses = createImageResourceFile(
    aegr_strings.lookGlasses,
    getUserDataFolder(),
  ).fsName;
  Date.$VERSION = 1.02;
  Date.LZ = function (x) {
    return x < 0 || x > 9 ? "" : "0" + x;
  };
  Date.monthNames = new Array(
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  );
  Date.monthAbbreviations = new Array(
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  );
  Date.dayNames = new Array(
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  );
  Date.dayAbbreviations = new Array(
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat",
  );
  Date.preferAmericanFormat = true;
  if (!Date.prototype.getFullYear) {
    Date.prototype.getFullYear = function () {
      var yy = this.getYear();
      return yy < 1900 ? yy + 1900 : yy;
    };
  }
  Date.parseString = function (val, format) {
    if (typeof format == "undefined" || format == null || format == "") {
      var generalFormats = new Array(
        "y-M-d",
        "MMM d, y",
        "MMM d,y",
        "y-MMM-d",
        "d-MMM-y",
        "MMM d",
        "MMM-d",
        "d-MMM",
      );
      var monthFirst = new Array("M/d/y", "M-d-y", "M.d.y", "M/d", "M-d");
      var dateFirst = new Array("d/M/y", "d-M-y", "d.M.y", "d/M", "d-M");
      var checkList = new Array(
        generalFormats,
        Date.preferAmericanFormat ? monthFirst : dateFirst,
        Date.preferAmericanFormat ? dateFirst : monthFirst,
      );
      for (var i = 0; i < checkList.length; i += 1) {
        var l = checkList[i];
        for (var j = 0; j < l.length; j += 1) {
          var d = Date.parseString(val, l[j]);
          if (d != null) {
            return d;
          }
        }
      }
      return null;
    }
    this.isInteger = function (val) {
      for (var i = 0; i < val.length; i += 1) {
        if ("1234567890".indexOf(val.charAt(i)) == -1) {
          return false;
        }
      }
      return true;
    };
    this.getInt = function (str, i, minlength, maxlength) {
      for (var x = maxlength; x >= minlength; x--) {
        var token = str.substring(i, i + x);
        if (token.length < minlength) {
          return null;
        }
        if (this.isInteger(token)) {
          return token;
        }
      }
      return null;
    };
    val = val + "";
    format = format + "";
    var i_val = 0;
    var i_format = 0;
    var c = "";
    var token = "";
    var token2 = "";
    var year = new Date().getFullYear();
    var month = 1;
    var date = 1;
    var hh = 0;
    var mm = 0;
    var ss = 0;
    var ampm = "";
    while (i_format < format.length) {
      c = format.charAt(i_format);
      token = "";
      while (format.charAt(i_format) == c && i_format < format.length) {
        token += format.charAt(i_format++);
      }
      if (token == "yyyy" || token == "yy" || token == "y") {
        if (token == "yyyy") {
          x = 4;
          y = 4;
        }
        if (token == "yy") {
          x = 2;
          y = 2;
        }
        if (token == "y") {
          x = 2;
          y = 4;
        }
        year = this.getInt(val, i_val, x, y);
        if (year == null) {
          return null;
        }
        i_val += year.length;
        if (year.length == 2) {
          if (year > 70) {
            year = 1900 + (year - 0);
          } else {
            year = 2000 + (year - 0);
          }
        }
      } else if (token == "MMM" || token == "NNN") {
        month = 0;
        var names =
          token == "MMM"
            ? Date.monthNames.concat(Date.monthAbbreviations)
            : Date.monthAbbreviations;
        for (var i = 0; i < names.length; i += 1) {
          var month_name = names[i];
          if (
            val.substring(i_val, i_val + month_name.length).toLowerCase() ==
            month_name.toLowerCase()
          ) {
            month = (i % 12) + 1;
            i_val += month_name.length;
            break;
          }
        }
        if (month < 1 || month > 12) {
          return null;
        }
      } else if (token == "EE" || token == "E") {
        var names = token == "EE" ? Date.dayNames : Date.dayAbbreviations;
        for (var i = 0; i < names.length; i += 1) {
          var day_name = names[i];
          if (
            val.substring(i_val, i_val + day_name.length).toLowerCase() ==
            day_name.toLowerCase()
          ) {
            i_val += day_name.length;
            break;
          }
        }
      } else if (token == "MM" || token == "M") {
        month = this.getInt(val, i_val, token.length, 2);
        if (month == null || month < 1 || month > 12) {
          return null;
        }
        i_val += month.length;
      } else if (token == "dd" || token == "d") {
        date = this.getInt(val, i_val, token.length, 2);
        if (date == null || date < 1 || date > 31) {
          return null;
        }
        i_val += date.length;
      } else if (token == "hh" || token == "h") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 1 || hh > 12) {
          return null;
        }
        i_val += hh.length;
      } else if (token == "HH" || token == "H") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 0 || hh > 23) {
          return null;
        }
        i_val += hh.length;
      } else if (token == "KK" || token == "K") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 0 || hh > 11) {
          return null;
        }
        i_val += hh.length;
        hh++;
      } else if (token == "kk" || token == "k") {
        hh = this.getInt(val, i_val, token.length, 2);
        if (hh == null || hh < 1 || hh > 24) {
          return null;
        }
        i_val += hh.length;
        hh--;
      } else if (token == "mm" || token == "m") {
        mm = this.getInt(val, i_val, token.length, 2);
        if (mm == null || mm < 0 || mm > 59) {
          return null;
        }
        i_val += mm.length;
      } else if (token == "ss" || token == "s") {
        ss = this.getInt(val, i_val, token.length, 2);
        if (ss == null || ss < 0 || ss > 59) {
          return null;
        }
        i_val += ss.length;
      } else if (token == "a") {
        if (val.substring(i_val, i_val + 2).toLowerCase() == "am") {
          ampm = "AM";
        } else if (val.substring(i_val, i_val + 2).toLowerCase() == "pm") {
          ampm = "PM";
        } else {
          return null;
        }
        i_val += 2;
      } else {
        if (val.substring(i_val, i_val + token.length) != token) {
          return null;
        } else {
          i_val += token.length;
        }
      }
    }
    if (i_val != val.length) {
      return null;
    }
    if (month == 2) {
      if ((year % 4 == 0 && year % 100 != 0) || year % 400 == 0) {
        if (date > 29) {
          return null;
        }
      } else {
        if (date > 28) {
          return null;
        }
      }
    }
    if (month == 4 || month == 6 || month == 9 || month == 11) {
      if (date > 30) {
        return null;
      }
    }
    if (hh < 12 && ampm == "PM") {
      hh = hh - 0 + 12;
    } else {
      if (hh > 11 && ampm == "AM") {
        hh -= 12;
      }
    }
    return new Date(year, month - 1, date, hh, mm, ss);
  };
  Date.isValid = function (val, format) {
    return Date.parseString(val, format) != null;
  };
  Date.prototype.isBefore = function (date2) {
    if (date2 == null) {
      return false;
    }
    return this.getTime() < date2.getTime();
  };
  Date.prototype.isAfter = function (date2) {
    if (date2 == null) {
      return false;
    }
    return this.getTime() > date2.getTime();
  };
  Date.prototype.equals = function (date2) {
    if (date2 == null) {
      return false;
    }
    return this.getTime() == date2.getTime();
  };
  Date.prototype.equalsIgnoreTime = function (date2) {
    if (date2 == null) {
      return false;
    }
    var d1 = new Date(this.getTime()).clearTime();
    var d2 = new Date(date2.getTime()).clearTime();
    return d1.getTime() == d2.getTime();
  };
  Date.prototype.format = function (format) {
    format = format + "";
    var result = "";
    var i_format = 0;
    var c = "";
    var token = "";
    var y = this.getYear() + "";
    var M = this.getMonth() + 1;
    var d = this.getDate();
    var E = this.getDay();
    var H = this.getHours();
    var m = this.getMinutes();
    var s = this.getSeconds();
    var value = new Object();
    if (y.length < 4) {
      y = "" + y + 1900;
    }
    value.y = "" + y;
    value.yyyy = y;
    value.yy = y.substring(2, 4);
    value.M = M;
    value.MM = Date.LZ(M);
    value.MMM = Date.monthNames[M - 1];
    value.NNN = Date.monthAbbreviations[M - 1];
    value.d = d;
    value.dd = Date.LZ(d);
    value.E = Date.dayAbbreviations[E];
    value.EE = Date.dayNames[E];
    value.H = H;
    value.HH = Date.LZ(H);
    if (H == 0) {
      value.h = 12;
    } else if (H > 12) {
      value.h = H - 12;
    } else {
      value.h = H;
    }
    value.hh = Date.LZ(value.h);
    value.K = value.h - 1;
    value.k = value.H + 1;
    value.KK = Date.LZ(value.K);
    value.kk = Date.LZ(value.k);
    if (H > 11) {
      value.a = "PM";
    } else {
      value.a = "AM";
    }
    value.m = m;
    value.mm = Date.LZ(m);
    value.s = s;
    value.ss = Date.LZ(s);
    while (i_format < format.length) {
      c = format.charAt(i_format);
      token = "";
      while (format.charAt(i_format) == c && i_format < format.length) {
        token += format.charAt(i_format++);
      }
      if (typeof value[token] != "undefined") {
        result = result + value[token];
      } else {
        result = result + token;
      }
    }
    return result;
  };
  Date.prototype.getDayName = function () {
    return Date.dayNames[this.getDay()];
  };
  Date.prototype.getDayAbbreviation = function () {
    return Date.dayAbbreviations[this.getDay()];
  };
  Date.prototype.getMonthName = function () {
    return Date.monthNames[this.getMonth()];
  };
  Date.prototype.getMonthAbbreviation = function () {
    return Date.monthAbbreviations[this.getMonth()];
  };
  Date.prototype.clearTime = function () {
    this.setHours(0);
    this.setMinutes(0);
    this.setSeconds(0);
    this.setMilliseconds(0);
    return this;
  };
  Date.prototype.add = function (interval, number) {
    if (
      typeof interval == "undefined" ||
      interval == null ||
      typeof number == "undefined" ||
      number == null
    ) {
      return this;
    }
    number = number;
    if (interval == "y") {
      this.setFullYear(this.getFullYear() + number);
    } else if (interval == "M") {
      this.setMonth(this.getMonth() + number);
    } else if (interval == "d") {
      this.setDate(this.getDate() + number);
    } else if (interval == "w") {
      var step = number > 0 ? 1 : -1;
      while (number != 0) {
        this.add("d", step);
        while (this.getDay() == 0 || this.getDay() == 6) {
          this.add("d", step);
        }
        number -= step;
      }
    } else if (interval == "h") {
      this.setHours(this.getHours() + number);
    } else if (interval == "m") {
      this.setMinutes(this.getMinutes() + number);
    } else {
      if (interval == "s") {
        this.setSeconds(this.getSeconds() + number);
      }
    }
    return this;
  };
  if (!oo89l.c()) {
    return;
  }
  aegr_strings.isTrial = oo89l.t();
  var myPal = aegr_buildUI(thisObj);
  if (myPal instanceof Window) {
    myPal.center();
    myPal.show();
  } else {
    myPal.layout.layout(true);
  }
}
ae_global_renamer2(this);
