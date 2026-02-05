/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function escapeRegExp(str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
}
function tcd_getColorNames() {
  var colors = [];
  var prefKeyBase = "Label Preference Text Section ";
  var prefKey = null;
  for (var i = 1; i <= 10; i += 1) {
    var newPrefKey = prefKeyBase + i;
    if (parseFloat(app.version) >= 12) {
      if (
        app.preferences.havePref(
          newPrefKey,
          "Label Text ID 2 # 1",
          PREFType.PREF_Type_MACHINE_INDEPENDENT,
        )
      ) {
        prefKey = newPrefKey;
        break;
      }
    } else {
      if (app.preferences.havePref(newPrefKey, "Label Text ID 2 # 1")) {
        prefKey = newPrefKey;
        break;
      }
    }
  }
  if (prefKey) {
    if (parseFloat(app.version) >= 12) {
      for (var i = 1; i <= 16; i += 1) {
        if (
          app.preferences.havePref(
            newPrefKey,
            "Label Text ID 2 # " + i,
            PREFType.PREF_Type_MACHINE_INDEPENDENT,
          )
        ) {
          try {
            var col = app.preferences.getPrefAsString(
              prefKey,
              "Label Text ID 2 # " + i,
              PREFType.PREF_Type_MACHINE_INDEPENDENT,
            );
            colors.push(col);
          } catch (e) {}
        }
      }
    } else {
      for (var i = 1; i <= 16; i += 1) {
        if (app.preferences.havePref(newPrefKey, "Label Text ID 2 # " + i)) {
          try {
            var col = app.preferences.getPrefAsString(
              prefKey,
              "Label Text ID 2 # " + i,
            );
            colors.push(col);
          } catch (e) {}
        }
      }
    }
  }
  return colors;
}
function tcd_loadAndRegPref(prop, def) {
  var name = null;
  for (var child in prop.parent) {
    if (prop.parent[child] == prop) {
      name = child;
    }
  }
  if (name != null) {
    var value = def;
    if (app.settings.haveSetting(tcd_scriptName, name)) {
      value = app.settings.getSetting(tcd_scriptName, name);
    }
    if (prop instanceof Checkbox) {
      prop.value = !/^true$/i.test(value);
      prop.notify();
    } else if (prop instanceof EditText) {
      prop.text = value;
    } else {
      if (prop instanceof DropDownList) {
        for (var i = 0; i < prop.items.length; i += 1) {
          if (prop.items[i].text === value) {
            prop.selection = i;
          }
        }
      }
    }
  }
  tcd_prefsToSave.push(prop);
}
function tcd_savePrefs() {
  for (var i = 0; i < tcd_prefsToSave.length; i += 1) {
    var prop = tcd_prefsToSave[i];
    var value = "";
    if (prop instanceof Checkbox) {
      value = prop.value;
    } else if (prop instanceof EditText) {
      value = prop.text;
    } else {
      if (prop instanceof DropDownList && prop.selection) {
        value = prop.selection.text;
      }
    }
    var name = null;
    for (var child in prop.parent) {
      if (prop.parent[child] == prop) {
        name = child;
      }
    }
    if (name != null) {
      app.settings.saveSetting(tcd_scriptName, name, value);
    }
  }
}
function tcd_buildUI(thisObj) {
  if (thisObj instanceof Panel) {
    var myPal = thisObj;
  } else {
    var myPal = new Window(
      "palette",
      tcd_scriptName + " v" + tcd_version,
      undefined,
      { resizeable: true },
    );
  }
  if (myPal != null) {
    var res =
      "group { \n                alignment: [\'fill\', \'fill\'], \n                alignChildren: [\'left\',\'top\'], \n                orientation: \'column\', \n            newNamesGrp: Panel { \n                alignment: [\'fill\',\'top\'], \n                alignChildren: [\'left\',\'top\'], \n                text:\'\u65b0\u9879\u76ee\u547d\u540d\', \n                preSufGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    preSufChk: Checkbox {text:\'\'}, \n                    preSufDrp: DropDownList {alignment: [\'left\', \'center\']}, \n                    preSufTxt: EditText {alignment: [\'fill\',\'center\']}, \n                }, \n                replGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    replChk: Checkbox {text:\'\'}, \n                    replSrchLbl: StaticText {text:\'\u641c\u7d22\', aligment:[\'left\',\'left\']}, \n                    replSrchTxt: EditText {alignment: [\'left\',\'left\'], preferredSize:[100,20]}, \n                    replReplLbl: StaticText {text:\'\u66ff\u6362\', alignment:[\'left\',\'left\']}, \n                    replReplTxt: EditText {alignment:[\'fill\',\'left\'], preferredSize:[100,20]}, \n                }, \n                incGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    incChk: Checkbox {text:\'\'}, \n                    incLbl: StaticText {text:\'\u589e\u91cf\'}, \n                    incDrp: DropDownList {}, \n                    incLbl2: StaticText {text:\' \u7f16\u53f7\u540d\u79f0\', alignment:[\'fill\',\'left\']}, \n                }, \n                colGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    colChk: Checkbox {text:\'\'}, \n                    colLbl: StaticText {text:\'\u6807\u7b7e\u989c\u8272\'}, \n                    colDrp: DropDownList {alignment: [\'left\', \'center\']}, \n                }, \n            }, \n            optionsGrp: Panel { \n                alignment: [\'fill\',\'top\'], \n                alignChildren: [\'left\',\'top\'], \n                text:\'\u9009\u9879\', \n                grpFldGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    grpFldChk: Checkbox {text:\'\'}, \n                    grpFldLbl: StaticText {text:\'\u9879\u76ee\u5206\u7ec4\u5230\u6587\u4ef6\u5939\', alignment:[\'left\',\'left\']}, \n                    grpFldTxt: EditText {alignment:[\'fill\',\'left\']}, \n                }, \n                incExcGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    incExcChk: Checkbox {text:\'\'}, \n                    incExcLbl: StaticText {text:\'\u6392\u9664\u9879\u76ee\', alignment:[\'left\',\'left\']}, \n                    incExcDrp: DropDownList {alignment:[\'left\',\'center\']}, \n                    incExcTxt: EditText {alignment:[\'fill\',\'left\'], preferredSize:[100,20]}, \n                }, \n                depGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    depChk: Checkbox {text:\'\'}, \n                    depLbl: StaticText {text:\'\u6df1\u5ea6\u9650\u5236\'}, \n                    depTxt: EditText {alignment:[\'left\',\'left\'], text:\'1\', preferredSize:[30,20]}, \n                }, \n                expGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    expChk: Checkbox {text:\'\'}, \n                    expLbl: StaticText {text:\'\u66f4\u65b0\u8868\u8fbe\u5f0f\', alignment:[\'fill\',\'left\']}, \n                }, \n                dupFtgGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    dupFtgChk: Checkbox {text:\'\'}, \n                    dupFtgLbl: StaticText {text:\'\u590d\u5236\u7d20\u6750 (\u6162)\', alignment:[\'fill\',\'left\']}, \n                } \n                dupSldGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    dupSldChk: Checkbox {text:\'\'}, \n                    dupSldLbl: StaticText {text:\'\u590d\u5236\u7eaf\u8272\u5c42\', alignment:[\'fill\',\'left\']}, \n                } \n                selDupGrp: Group { \n                    orientation: \'row\', \n                    alignment: [\'fill\',\'top\'], \n                    selDupChk: Checkbox {text:\'\'}, \n                    selDupLbl: StaticText {text:\'\u9009\u62e9\u590d\u5236\', alignment:[\'fill\',\'left\']}, \n                } \n            }, \n            toolsGrp: Panel { \n                alignment: [\'fill\',\'top\'], \n                alignChildren: [\'left\',\'top\'], \n                text:\'\u5de5\u5177\', \n                collectGrp: Group { \n                    orientation: \'row\', \n                    collectBtn: Button {text:\'\u6536\u96c6\u76f8\u5173\u6027\', alignment:[\'right\',\'top\']} \n                } \n            }, \n            btnGrp: Group { \n                orientation: \'row\', \n                alignment: [\'fill\',\'top\'], \n                helpBtn: Button {text:\'?\', alignment:[\'left\',\'top\'], preferredSize:[30,20]}, \n                copyLbl: StaticText {text:\'\u590d\u5236\u6570\u91cf\', alignment:[\'right\',\'center\']}, \n                copyTxt: EditText {text:\'1\', alignment:[\'right\',\'top\'], preferredSize:[30,20]}, \n                dupSelBtn: Button {text:\' \u590d\u5236\u6240\u9009 \', alignment:[\'right\',\'top\']}, \n            } \n        }";
    myPal.grp = myPal.add(res);
    myPal.grp.newNamesGrp.preSufGrp.preSufDrp.enabled =
      myPal.grp.newNamesGrp.preSufGrp.preSufChk.enabled.value;
    myPal.grp.newNamesGrp.preSufGrp.preSufTxt.enabled =
      myPal.grp.newNamesGrp.preSufGrp.preSufChk.enabled.value;
    myPal.grp.newNamesGrp.preSufGrp.preSufChk.onClick = function () {
      myPal.grp.newNamesGrp.preSufGrp.preSufDrp.enabled = this.value;
      myPal.grp.newNamesGrp.preSufGrp.preSufTxt.enabled = this.value;
    };
    myPal.grp.newNamesGrp.replGrp.replSrchTxt.enabled =
      myPal.grp.newNamesGrp.replGrp.replChk.enabled.value;
    myPal.grp.newNamesGrp.replGrp.replReplTxt.enabled =
      myPal.grp.newNamesGrp.replGrp.replChk.enabled.value;
    myPal.grp.newNamesGrp.replGrp.replChk.onClick = function () {
      myPal.grp.newNamesGrp.replGrp.replSrchTxt.enabled = this.value;
      myPal.grp.newNamesGrp.replGrp.replReplTxt.enabled = this.value;
    };
    myPal.grp.newNamesGrp.incGrp.incDrp.enabled =
      myPal.grp.newNamesGrp.incGrp.incChk.enabled.value;
    myPal.grp.newNamesGrp.incGrp.incChk.onClick = function () {
      myPal.grp.newNamesGrp.incGrp.incDrp.enabled = this.value;
    };
    myPal.grp.newNamesGrp.colGrp.colDrp.enabled =
      myPal.grp.newNamesGrp.colGrp.colChk.enabled.value;
    myPal.grp.newNamesGrp.colGrp.colChk.onClick = function () {
      myPal.grp.newNamesGrp.colGrp.colDrp.enabled = this.value;
    };
    myPal.grp.optionsGrp.incExcGrp.incExcDrp.enabled =
      myPal.grp.optionsGrp.incExcGrp.incExcChk.enabled.value;
    myPal.grp.optionsGrp.incExcGrp.incExcTxt.enabled =
      myPal.grp.optionsGrp.incExcGrp.incExcChk.enabled.value;
    myPal.grp.optionsGrp.incExcGrp.incExcChk.onClick = function () {
      myPal.grp.optionsGrp.incExcGrp.incExcDrp.enabled = this.value;
      myPal.grp.optionsGrp.incExcGrp.incExcTxt.enabled = this.value;
    };
    myPal.grp.optionsGrp.grpFldGrp.grpFldTxt.enabled =
      myPal.grp.optionsGrp.grpFldGrp.grpFldChk.enabled.value;
    myPal.grp.optionsGrp.grpFldGrp.grpFldChk.onClick = function () {
      myPal.grp.optionsGrp.grpFldGrp.grpFldTxt.enabled = this.value;
    };
    myPal.grp.optionsGrp.depGrp.depTxt.enabled =
      myPal.grp.optionsGrp.depGrp.depChk.enabled.value;
    myPal.grp.optionsGrp.depGrp.depChk.onClick = function () {
      myPal.grp.optionsGrp.depGrp.depTxt.enabled = this.value;
    };
    var preSufOptions = ["\u524d\u7f00", "\u540e\u7f00"];
    for (var i = 0; i < preSufOptions.length; i += 1) {
      myPal.grp.newNamesGrp.preSufGrp.preSufDrp.add("item", preSufOptions[i]);
    }
    myPal.grp.newNamesGrp.preSufGrp.preSufDrp.selection = 1;
    var incOptions = ["First", "Last"];
    for (var i = 0; i < incOptions.length; i += 1) {
      myPal.grp.newNamesGrp.incGrp.incDrp.add("item", incOptions[i]);
    }
    myPal.grp.newNamesGrp.incGrp.incDrp.selection = 1;
    var incExcOptionsB = ["Prefix", "Suffix", "Matching Regex"];
    for (var i = 0; i < incExcOptionsB.length; i += 1) {
      myPal.grp.optionsGrp.incExcGrp.incExcDrp.add("item", incExcOptionsB[i]);
    }
    myPal.grp.optionsGrp.incExcGrp.incExcDrp.selection = 1;
    var colors = tcd_getColorNames();
    for (var i = 0; i < colors.length; i += 1) {
      myPal.grp.newNamesGrp.colGrp.colDrp.add("item", colors[i]);
    }
    myPal.grp.newNamesGrp.colGrp.colDrp.selection = 0;
    myPal.grp.optionsGrp.depGrp.depTxt.onChange = function () {
      if (/^\d*$/.test(this.text) != true) {
        alert("ERROR: Invalid Depth Limit.\nMust be a positive integer.");
        this.text = "1";
      }
    };
    myPal.grp.btnGrp.copyTxt.onChange = function () {
      if (/^\d*$/.test(this.text) != true) {
        alert(
          "ERROR: Invalid Copy Value.\nMust be a positive integer greater than zero.",
        );
        this.text = "1";
      }
    };
    var grp = myPal.grp;
    tcd_loadAndRegPref(grp.newNamesGrp.preSufGrp.preSufChk, false);
    tcd_loadAndRegPref(grp.newNamesGrp.preSufGrp.preSufTxt, "");
    tcd_loadAndRegPref(grp.newNamesGrp.replGrp.replChk, false);
    tcd_loadAndRegPref(grp.newNamesGrp.replGrp.replSrchTxt, "");
    tcd_loadAndRegPref(grp.newNamesGrp.replGrp.replReplTxt, "");
    tcd_loadAndRegPref(grp.newNamesGrp.incGrp.incChk, true);
    tcd_loadAndRegPref(grp.newNamesGrp.incGrp.incDrp, "Last");
    tcd_loadAndRegPref(grp.newNamesGrp.colGrp.colDrp, "Red");
    tcd_loadAndRegPref(grp.optionsGrp.grpFldGrp.grpFldChk, false);
    tcd_loadAndRegPref(grp.optionsGrp.grpFldGrp.grpFldTxt, "");
    tcd_loadAndRegPref(grp.optionsGrp.incExcGrp.incExcChk, false);
    tcd_loadAndRegPref(grp.optionsGrp.incExcGrp.incExcDrp, "Prefix");
    tcd_loadAndRegPref(grp.optionsGrp.incExcGrp.incExcTxt, "_");
    tcd_loadAndRegPref(grp.optionsGrp.depGrp.depChk, false);
    tcd_loadAndRegPref(grp.optionsGrp.depGrp.depTxt, "1");
    tcd_loadAndRegPref(grp.optionsGrp.expGrp.expChk, true);
    tcd_loadAndRegPref(grp.optionsGrp.dupFtgGrp.dupFtgChk, false);
    tcd_loadAndRegPref(grp.optionsGrp.dupSldGrp.dupSldChk, false);
    tcd_loadAndRegPref(grp.optionsGrp.selDupGrp.selDupChk, false);
    tcd_loadAndRegPref(grp.btnGrp.copyTxt, "1");
    myPal.grp.btnGrp.helpBtn.onClick = function () {
      if (typeof helpWindow_unitTest == "undefined") {
        new helpWindow().run();
      }
    };
    myPal.grp.btnGrp.dupSelBtn.onClick = function () {
      tcd_expFixCount = 0;
      var errors = [];
      if (myPal.grp.newNamesGrp.preSufGrp.preSufChk.value) {
        if (myPal.grp.newNamesGrp.preSufGrp.preSufTxt.text === "") {
          errors.push(
            "No value supplied for " +
              myPal.grp.newNamesGrp.preSufGrp.preSufDrp.selection.text,
          );
        }
      }
      if (myPal.grp.newNamesGrp.replGrp.replChk.value) {
        if (
          myPal.grp.newNamesGrp.replGrp.replSrchTxt.text === "" ||
          myPal.grp.newNamesGrp.replGrp.replReplTxt.text == ""
        ) {
          errors.push("No value supplied for Search and Replace");
        }
      }
      if (myPal.grp.optionsGrp.incExcGrp.incExcChk.value) {
        if (myPal.grp.optionsGrp.incExcGrp.incExcTxt.text == "") {
          errors.push(
            "No value supplied for " +
              myPal.grp.optionsGrp.incExcGrp.incExcLbl.text +
              " " +
              myPal.grp.optionsGrp.incExcGrp.incExcDrp.selection.text,
          );
        }
        if (
          TRUECOMPDUP_PALETTE.grp.optionsGrp.incExcGrp.incExcDrp.selection
            .text == "Matching Regex"
        ) {
          try {
            var re = new RegExp(
              myPal.grp.optionsGrp.incExcGrp.incExcTxt.text,
              "g",
            );
          } catch (e) {
            errors.push(
              "Invalid regex for exclude: " +
                myPal.grp.optionsGrp.incExcGrp.incExcTxt.text,
            );
          }
        }
      }
      if (myPal.grp.optionsGrp.grpFldGrp.grpFldChk.value) {
        if (myPal.grp.optionsGrp.grpFldGrp.grpFldTxt.text == "") {
          errors.push(
            "No value supplied for " +
              myPal.grp.optionsGrp.grpFldGrp.grpFldLbl.text,
          );
        }
      }
      var selItems = app.project.selection.slice(0);
      if (selItems.length <= 0) {
        errors.push("No item selected in the project panel.");
      }
      for (var i = 0; i < selItems.length; i += 1) {
        if (!(selItems[i] instanceof CompItem)) {
          errors.push(
            "Selection contains items other than comps, please only select the top-level comp(s) you want to duplicate",
          );
          break;
        }
      }
      tcd_savePrefs();
      tcd_fixExp = TRUECOMPDUP_PALETTE.grp.optionsGrp.expGrp.expChk.value;
      if (TRUECOMPDUP_PALETTE.grp.optionsGrp.depGrp.depChk.value) {
        tcd_maxDepth = TRUECOMPDUP_PALETTE.grp.optionsGrp.depGrp.depTxt.text;
      } else {
        tcd_maxDepth = -1;
      }
      var copies = parseInt(myPal.grp.btnGrp.copyTxt.text);
      var expErrors = [];
      if (errors.length > 0) {
        alert("Error\n" + errors.join("\n"));
      } else {
        app.beginUndoGroup("True Comp Duplicator");
        app.beginSuppressDialogs();
        var max = app.project.numItems * copies;
        if (tcd_fixExp) {
          max = max * 2;
        }
        tcd_progDlg = new progressDlg().create("Duplicating Selected...", max);
        var newComps = [];
        var newFolders = [];
        var newFootage = [];
        try {
          for (var c = 0; c < copies; c += 1) {
            tcd_progDlg.setTitle("Duplicating Selected...");
            previousComps = [];
            previousFolders = [];
            previousFootage = [];
            tcd_copyNum = c;
            if (TRUECOMPDUP_PALETTE.grp.optionsGrp.grpFldGrp.grpFldChk.value) {
              tcd_createGroupFolder(selItems[0]);
            }
            var result = {};
            for (var s = 0; s < selItems.length; s += 1) {
              result = tcd_duplicate(selItems[s]);
            }
            for (var i = 0; i < result.comps.length; i += 1) {
              newComps.push(result.comps[i].dest);
            }
            for (var i = 0; i < result.folders.length; i += 1) {
              newFolders.push(result.folders[i].dest);
            }
            for (var i = 0; i < result.footage.length; i += 1) {
              newFootage.push(result.footage[i].dest);
            }
            if (tcd_fixExp) {
              tcd_progDlg.setTitle(
                "\u4e66\u751f\u6c49\u5316\u63d0\u793a,\u66f4\u65b0\u8868\u8fbe\u5f0f\u4e2d...",
              );
              var expComps = [];
              for (var i = 0; i < result.comps.length; i += 1) {
                expComps.push(result.comps[i].dest);
              }
              var errors = tcd_updateExpressions(expComps);
              expErrors.push.apply(expErrors, errors);
            }
            if (TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colChk.value) {
              for (var i = 0; i < newComps.length; i += 1) {
                var index =
                  TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colDrp.selection
                    .index + 1;
                newComps[i].label = index;
              }
              for (var i = 0; i < newFolders.length; i += 1) {
                var index =
                  TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colDrp.selection
                    .index + 1;
                newFolders[i].label = index;
              }
              for (var i = 0; i < newFootage.length; i += 1) {
                var index =
                  TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colDrp.selection
                    .index + 1;
                newFootage[i].label = index;
              }
            }
          }
        } catch (err) {
          alert(err);
        }
        var statusTxt =
          newComps.length +
          newFolders.length +
          newFootage.length +
          " items duplicated";
        if (tcd_fixExp) {
          statusTxt =
            statusTxt + ", " + tcd_expFixCount + " expressions updated";
        }
        if (TRUECOMPDUP_PALETTE.grp.optionsGrp.selDupGrp.selDupChk.value) {
          var newSel = [];
          for (var i = 0; i < result.comps.length; i += 1) {
            for (var s = 0; s < selItems.length; s += 1) {
              if (selItems[s] == result.comps[i].source) {
                selItems[s].selected = false;
                result.comps[i].dest.selected = true;
              }
            }
          }
        }
        tcd_progDlg.complete("Process Complete!", statusTxt);
        app.endSuppressDialogs(false);
        app.endUndoGroup();
      }
      if (expErrors.length > 0) {
        new expErrWindow().run(expErrors);
      }
    };
    myPal.grp.toolsGrp.collectGrp.collectBtn.onClick = function () {
      tcd_expFixCount = 0;
      var errors = [];
      if (myPal.grp.optionsGrp.incExcGrp.incExcChk.value) {
        if (myPal.grp.optionsGrp.incExcGrp.incExcTxt.text == "") {
          errors.push(
            "No value supplied for " +
              myPal.grp.optionsGrp.incExcGrp.incExcLbl.text +
              " " +
              myPal.grp.optionsGrp.incExcGrp.incExcDrp.selection.text,
          );
        }
        if (
          TRUECOMPDUP_PALETTE.grp.optionsGrp.incExcGrp.incExcDrp.selection
            .text == "Matching Regex"
        ) {
          try {
            var re = new RegExp(
              myPal.grp.optionsGrp.incExcGrp.incExcTxt.text,
              "g",
            );
          } catch (e) {
            errors.push(
              "Invalid regex for exclude: " +
                myPal.grp.optionsGrp.incExcGrp.incExcTxt.text,
            );
          }
        }
      }
      if (myPal.grp.optionsGrp.grpFldGrp.grpFldChk.value) {
        if (myPal.grp.optionsGrp.grpFldGrp.grpFldTxt.text == "") {
          errors.push(
            "No value supplied for " +
              myPal.grp.optionsGrp.grpFldGrp.grpFldLbl.text,
          );
        }
      } else {
        errors.push(
          "To collect dependencies, you must enable \'Group Items Into Folder\'",
        );
      }
      var selItems = app.project.selection.slice(0);
      if (selItems.length <= 0) {
        errors.push("No item selected in the project panel.");
      }
      for (var i = 0; i < selItems.length; i += 1) {
        if (!(selItems[i] instanceof CompItem)) {
          errors.push(
            "Selection contains items other than comps, please only select the top-level comp(s) you want to collect dependencies for.",
          );
          break;
        }
      }
      tcd_savePrefs();
      if (TRUECOMPDUP_PALETTE.grp.optionsGrp.depGrp.depChk.value) {
        tcd_maxDepth = TRUECOMPDUP_PALETTE.grp.optionsGrp.depGrp.depTxt.text;
      } else {
        tcd_maxDepth = -1;
      }
      var expErrors = [];
      if (errors.length > 0) {
        alert("Error\n" + errors.join("\n"));
      } else {
        app.beginUndoGroup("Collect Dependencies");
        app.beginSuppressDialogs();
        tcd_progDlg = new progressDlg().create("Collecting Dependencies...");
        var newComps = [];
        var newFolders = [];
        var newFootage = [];
        try {
          tcd_progDlg.setTitle("Collecting Dependencies...");
          previousComps = [];
          previousFolders = [];
          previousFootage = [];
          tcd_createGroupFolder(selItems[0]);
          var results = [];
          for (var s = 0; s < selItems.length; s += 1) {
            results.push(tcd_collect(selItems[s]));
          }
          var newComps = [];
          var newFolders = [];
          var newFootage = [];
          for (var r = 0; r < results.length; r += 1) {
            var result = results[r];
            newComps.push.apply(newComps, result.newComps);
            newFolders.push.apply(newFolders, result.newFolders);
            newFootage.push.apply(newFootage, result.newFootage);
          }
          if (TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colChk.value) {
            for (var i = 0; i < newComps.length; i += 1) {
              var index =
                TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colDrp.selection
                  .index + 1;
              newComps[i].label = index;
            }
            for (var i = 0; i < newFolders.length; i += 1) {
              var index =
                TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colDrp.selection
                  .index + 1;
              newFolders[i].label = index;
            }
            for (var i = 0; i < newFootage.length; i += 1) {
              var index =
                TRUECOMPDUP_PALETTE.grp.newNamesGrp.colGrp.colDrp.selection
                  .index + 1;
              newFootage[i].label = index;
            }
          }
        } catch (err) {
          alert(err);
        }
        var statusTxt =
          newComps.length +
          newFolders.length +
          newFootage.length +
          " items colected";
        if (TRUECOMPDUP_PALETTE.grp.optionsGrp.selDupGrp.selDupChk.value) {
          var newSel = [];
          for (var s = 0; s < selItems.length; s += 1) {
            selItems[s].selected = false;
          }
          for (var i = 0; i < prevComps.length; i += 1) {
            prevComps[i].selected = true;
          }
        }
        tcd_progDlg.complete("Process Complete!", statusTxt);
        app.endSuppressDialogs(false);
        app.endUndoGroup();
      }
      if (expErrors.length > 0) {
        new expErrWindow().run(expErrors);
      }
    };
    myPal.layout.layout(true);
    myPal.layout.resize();
    myPal.onResizing = myPal.onResize = function () {
      this.layout.resize();
    };
  }
  return myPal;
}
function progressDlg() {
  this.windowRef = null;
}
function helpWindow() {
  this.windowRef = null;
}
function expErrWindow() {
  this.windowRef = null;
}
function openURL(url) {
  if ($.os.indexOf("Windows") != -1) {
    system.callSystem(
      'cmd /c "' +
        Folder.commonFiles.parent.fsName +
        "\\Internet Explorer\\iexplore.exe" +
        '" ' +
        url,
    );
  } else {
    var cmd = 'open "' + url + '"';
    system.callSystem(cmd);
  }
}
function tcd_saveProjItmSel() {
  var result = app.project.selection.slice(0);
  return result;
}
function tcd_loadProjItmSel(sel) {
  for (var i = 0; i < sel.length; i += 1) {
    sel[i].selected = true;
  }
}
function tcd_clearProjItmSel() {
  for (var i = 1; i <= app.project.numItems; i += 1) {
    app.project.item(i).selected = false;
  }
}
function tcd_duplicateProjItem(item) {
  var chk = tcd_checkPreviousFootage(item);
  var result = [];
  if (chk == null) {
    app.project.showWindow(true);
    var sel = tcd_saveProjItmSel();
    tcd_clearProjItmSel();
    var beforeIDs = [];
    for (var d = 1; d <= app.project.numItems; d += 1) {
      beforeIDs.push(app.project.item(d).id);
    }
    item.selected = true;
    app.executeCommand(2080);
    for (var d = 1; d <= app.project.numItems; d += 1) {
      var itm = app.project.item(d);
      var found = false;
      for (var i = 0; i < beforeIDs.length; i += 1) {
        if (itm.id == beforeIDs[i]) {
          found = true;
        }
      }
      if (found == false) {
        result.push(itm);
      }
    }
    tcd_clearProjItmSel();
    tcd_loadProjItmSel(sel);
    if (result.length > 0 && result[0] != null) {
      for (var r = 0; r < result.length; r += 1) {
        result[r].name = tcd_changeName(item.name);
      }
      if (
        tcd_progDlg.cancel == false &&
        TRUECOMPDUP_PALETTE.grp.optionsGrp.grpFldGrp.grpFldChk.value
      ) {
        result[0].parentFolder = tcd_duplicateFolderStructure(
          result[0].parentFolder,
        );
      }
      var ftg = {};
      ftg.source = item;
      ftg.dest = result[0];
      previousFootage.push(ftg);
    }
  } else {
    result.push(chk);
  }
  if (result.length > 1) {
    return result;
  } else if (result.length == 1) {
    return result[0];
  } else {
    return null;
  }
}
function tcd_collect_deps_for_comp(comp) {
  function _get_prevComp(comp) {
    for (var i = 0; i < prevComps.length; i += 1) {
      if (prevComps[i].id == comp.id) {
        return prevComps[i];
      }
    }
  }
  function _collect(comp, depth) {
    for (var i = 1; i <= comp.numLayers; i += 1) {
      var layer = comp.layer(i);
      if (tcd_progDlg.cancel) {
        break;
      }
      tcd_progDlg.update(1, comp.name);
      if (layer instanceof AVLayer && tcd_incExcFilter(layer.source.name)) {
        if (layer.source && layer.source instanceof CompItem) {
          if (tcd_maxDepth == -1 || depth < tcd_maxDepth) {
            check = _get_prevComp(layer.source);
            if (check == null) {
              _collect(layer.source, depth + 1);
              prevComps.push(layer.source.id);
            }
          }
        } else if (layer.source.mainSource instanceof FileSource) {
        } else {
          if (layer.source.mainSource instanceof SolidSource) {
          }
        }
      }
    }
    if (
      tcd_progDlg.cancel == false &&
      TRUECOMPDUP_PALETTE.grp.optionsGrp.grpFldGrp.grpFldChk.value
    ) {
      comp.parentFolder = tcd_duplicateFolderStructure(comp.parentFolder);
    }
    return comp;
  }
  var prevComps = [];
  var prevFootage = [];
  var prevFolders = [];
  _collect(comp, 0);
  result = {
    prevComps: prevComps,
    prevFolders: prevFolders,
    prevFootage: prevFootage,
  };
  return result;
}
function tcd_duplicateCompStructure(comp, tcd_depth) {
  var newCompName = tcd_changeName(comp.name);
  var compResult = {};
  compResult.source = comp;
  var comp = comp.duplicate();
  comp.name = newCompName;
  compResult.dest = comp;
  previousComps.push(compResult);
  for (var i = 1; i <= comp.numLayers; i += 1) {
    var layer = comp.layer(i);
    if (tcd_progDlg.cancel) {
      break;
    }
    tcd_progDlg.update(1, newCompName);
    if (layer instanceof AVLayer && tcd_incExcFilter(layer.source.name)) {
      if (layer.source && layer.source instanceof CompItem) {
        if (tcd_maxDepth == -1 || tcd_depth < tcd_maxDepth) {
          check = tcd_checkPreviousComps(layer.source);
          if (check != null) {
            tcd_replaceSource(layer, check, tcd_fixExp);
          } else {
            var compResult = {};
            compResult.source = layer.source;
            var newComp = tcd_duplicateCompStructure(
              layer.source,
              tcd_depth + 1,
            );
            tcd_replaceSource(layer, newComp, tcd_fixExp);
            compResult.dest = layer.source;
            previousComps.push(compResult);
          }
        }
      } else if (layer.source.mainSource instanceof FileSource) {
        if (TRUECOMPDUP_PALETTE.grp.optionsGrp.dupFtgGrp.dupFtgChk.value) {
          var newItem = tcd_duplicateProjItem(layer.source);
          if (newItem != null) {
            tcd_replaceSource(layer, newItem, tcd_fixExp);
          }
        }
      } else {
        if (layer.source.mainSource instanceof SolidSource) {
          if (TRUECOMPDUP_PALETTE.grp.optionsGrp.dupSldGrp.dupSldChk.value) {
            var newItem = tcd_duplicateProjItem(layer.source);
            if (newItem != null) {
              tcd_replaceSource(layer, newItem, tcd_fixExp);
            }
          }
        }
      }
    }
  }
  if (
    tcd_progDlg.cancel == false &&
    TRUECOMPDUP_PALETTE.grp.optionsGrp.grpFldGrp.grpFldChk.value
  ) {
    comp.parentFolder = tcd_duplicateFolderStructure(comp.parentFolder);
  }
  return comp;
}
function tcd_replaceSource(layer, newItem, fixExp) {
  layer.replaceSource(newItem, fixExp);
}
function tcd_incExcFilter(name) {
  if (TRUECOMPDUP_PALETTE.grp.optionsGrp.incExcGrp.incExcChk.value) {
    var preSufTypeB =
      TRUECOMPDUP_PALETTE.grp.optionsGrp.incExcGrp.incExcDrp.selection.text;
    var preSufTxt = TRUECOMPDUP_PALETTE.grp.optionsGrp.incExcGrp.incExcTxt.text;
    if (preSufTypeB.toLowerCase() == "prefix") {
      if (name.startsWith(preSufTxt)) {
        return false;
      }
    } else if (preSufTypeB.toLowerCase() == "suffix") {
      if (name.endsWith(preSufTxt)) {
        return false;
      }
    } else {
      if (preSufTypeB.toLowerCase() == "matching regex") {
        var re = new RegExp(preSufTxt, "g");
        if (re.test(name)) {
          return false;
        }
      }
    }
  }
  return true;
}
function tcd_duplicateFolderStructure(folder) {
  var check = tcd_checkPreviousFolders(folder);
  if (folder == tcd_origParentFolder) {
    return tcd_parentFolder;
  } else if (check == null) {
    var sourceID = folder.id;
    var newFolder = app.project.items.addFolder(tcd_changeName(folder.name));
    var destID = newFolder.id;
    var fldr = {};
    fldr.source = folder;
    fldr.dest = newFolder;
    previousFolders.push(fldr);
    if (folder.parentFolder != null) {
      newFolder.parentFolder = tcd_duplicateFolderStructure(
        folder.parentFolder,
      );
    }
    return newFolder;
  } else {
    return check;
  }
}
function tcd_checkPreviousComps(comp) {
  for (var i = 0; i < previousComps.length; i += 1) {
    if (previousComps[i].source.id == comp.id) {
      return previousComps[i].dest;
    }
  }
  return null;
}
function tcd_checkPreviousFolders(folder) {
  for (var i = 0; i < previousFolders.length; i += 1) {
    if (previousFolders[i].source.id == folder.id) {
      return previousFolders[i].dest;
    }
  }
  return null;
}
function tcd_checkPreviousFootage(footage) {
  for (var i = 0; i < previousFootage.length; i += 1) {
    if (previousFootage[i].source.id == footage.id) {
      return previousFootage[i].dest;
    }
  }
  return null;
}
function tcd_getItemWithID(id) {
  for (var x = 1; x <= app.project.numItems; x += 1) {
    if (app.project.item(x).id == id) {
      return app.project.item(x);
    }
  }
  return null;
}
function tcd_changeName(name) {
  var origName = name;
  if (TRUECOMPDUP_PALETTE.grp.newNamesGrp.preSufGrp.preSufChk.value) {
    var typ =
      TRUECOMPDUP_PALETTE.grp.newNamesGrp.preSufGrp.preSufDrp.selection.text;
    var txt = TRUECOMPDUP_PALETTE.grp.newNamesGrp.preSufGrp.preSufTxt.text;
    if (typ.toLowerCase() == "prefix") {
      name = txt + name;
      if (parseFloat(app.version) < 9) {
        name = name.substring(0, 29);
      }
    } else {
      if (typ.toLowerCase() == "suffix") {
        if (parseFloat(app.version) < 9) {
          name = name.substring(0, 29 - txt.length);
        }
        name = name + txt;
      }
    }
  }
  if (TRUECOMPDUP_PALETTE.grp.newNamesGrp.replGrp.replChk.value) {
    var srchTxt = TRUECOMPDUP_PALETTE.grp.newNamesGrp.replGrp.replSrchTxt.text;
    var replTxt = TRUECOMPDUP_PALETTE.grp.newNamesGrp.replGrp.replReplTxt.text;
    var srchClean = srchTxt.replace(/[-[\]{}()*+?.\\^$|,#\:\s]/g, "\\$&");
    var srchTermRegex = new RegExp(srchClean, "gi");
    name = name.replace(srchTermRegex, replTxt);
    if (parseFloat(app.version) < 9) {
      name = name.substring(0, 29);
    }
  }
  if (TRUECOMPDUP_PALETTE.grp.newNamesGrp.incGrp.incChk.value) {
    if (
      TRUECOMPDUP_PALETTE.grp.newNamesGrp.incGrp.incDrp.selection.text ==
      "First"
    ) {
      name = name.replace(/(\d+)/, function (match, c1) {
        var num = ++c1 + tcd_copyNum;
        return tcd_pad(num, match.length);
      });
    } else {
      if (
        TRUECOMPDUP_PALETTE.grp.newNamesGrp.incGrp.incDrp.selection.text ==
        "Last"
      ) {
        name = name.replace(/(\d+)(?=\D*$)/g, function (match, c1) {
          var num = ++c1 + tcd_copyNum;
          return tcd_pad(num, match.length);
        });
      }
    }
  }
  return name;
}
function tcd_updateExpressions(newComps) {
  var expErrors = [];
  for (var i = 0; i < newComps.length; i += 1) {
    if (tcd_progDlg.cancel) {
      break;
    }
    if (newComps[i] != null) {
      var myComp = newComps[i];
      for (var j = 1; j <= myComp.numLayers; j += 1) {
        if (tcd_progDlg.cancel) {
          break;
        }
        tcd_progDlg.update(
          1,
          "Comp: " + myComp.name + " - Layer: " + myComp.layer(j).name,
        );
        var errors = tcd_processExpressions(
          myComp.layer(j),
          myComp,
          tcd_progDlg,
        );
        if (errors.length > 0) {
          for (var e = 0; e < errors.length; e += 1) {
            expErrors.push(errors[e]);
          }
        }
      }
    }
  }
  return expErrors;
}
function tcd_processExpressions(myLayer, myComp) {
  var errors = [];
  for (var j = 1; j <= myLayer.numProperties; j += 1) {
    var prop = myLayer.property(j);
    if (prop.isModified == false) {
      continue;
    }
    if (prop.numProperties != undefined && prop.numProperties > 0) {
      var err = tcd_processExpressions(prop, myComp);
      errors.push.apply(errors, err);
    }
    if (prop.canSetExpression && prop.expression != "") {
      var origExpression = prop.expression;
      if (prop.expressionEnabled && prop.expressionError == "") {
        var changed = false;
        var expression = origExpression;
        if (exp_compCheckRegExp.test(expression)) {
          for (var k = 0; k < previousComps.length; k += 1) {
            var oldCompName = previousComps[k].source.name;
            if (expression.indexOf('comp("' + oldCompName + '")') != -1) {
              var newCompName = previousComps[k].dest.name;
              expression = expression
                .split('comp("' + oldCompName + '")')
                .join('comp("' + newCompName + '")');
            }
          }
        }
        var expLines = expression.split(/\r|\n/g);
        var result = null;
        for (var l = 0; l < expLines.length; l += 1) {
          result = exp_thisCompLyrRegEx.exec(expLines[l]);
          if (result != null) {
            var sourceLayerName = result[1];
            var sourceComp = null;
            for (var c = 0; c < previousComps.length; c += 1) {
              if (previousComps[c].dest == myComp) {
                sourceComp = previousComps[c].source;
              }
            }
            if (sourceComp != null) {
              expLines[l] = fixLyrExpr(
                expLines[l],
                sourceLayerName,
                sourceComp,
                myComp,
              );
            }
          }
          result = null;
          while ((result = exp_compLyrRegEx.exec(expLines[l]))) {
            var sourceComp = null;
            var destComp = null;
            for (var c = 0; c < previousComps.length; c += 1) {
              if (previousComps[c].dest.name == result[1]) {
                destComp = previousComps[c].dest;
                sourceComp = previousComps[c].source;
              }
            }
            var sourceLayerName = result[2];
            if (sourceComp != null && destComp != null) {
              expLines[l] = fixLyrExpr(
                expLines[l],
                sourceLayerName,
                sourceComp,
                destComp,
              );
            }
          }
        }
        expression = expLines.join("\r");
        if (expression === origExpression) {
          continue;
        }
        try {
          myLayer.property(j).expression = expression;
        } catch (err) {
          errors.push(err.toString().replace("\r\r", "\n"));
        }
        tcd_expFixCount++;
      }
    }
  }
  return errors;
}
function fixLyrExpr(expression, layerName, sourceComp, destComp) {
  var lyrNum = null;
  for (var l = 1; l <= sourceComp.numLayers; l += 1) {
    if (sourceComp.layer(l).name === layerName) {
      lyrNum = sourceComp.layer(l).index;
    }
  }
  var newLyrName = null;
  if (lyrNum != null) {
    newLyrName = destComp.layer(lyrNum).name;
  }
  if (newLyrName != null) {
    expression = expression.replace(
      'layer("' + layerName + '")',
      'layer("' + newLyrName + '")',
    );
  }
  return expression;
}
function tcd_createGroupFolder(sampleItem) {
  var folderName = TRUECOMPDUP_PALETTE.grp.optionsGrp.grpFldGrp.grpFldTxt.text;
  if (tcd_copyNum > 0) {
    if (/\d+(?!.*\d)/.test(folderName) != true) {
      folderName = folderName + "0";
    }
  }
  var num = /\d+(?!.*\d)/.exec(folderName);
  var numPadding = 1;
  if (num != null) {
    var numPadding = num.toString().length;
  }
  folderName = folderName.replace(/\d+(?!.*\d)/, function (n) {
    return tcd_pad(++n + tcd_copyNum - 1, numPadding);
  });
  tcd_parentFolder = app.project.items.addFolder(folderName);
  var fldr = {};
  fldr.source = { id: "0", name: "root" };
  fldr.dest = tcd_parentFolder;
  previousFolders.push(fldr);
  if (sampleItem.parentFolder.parentFolder) {
    tcd_parentFolder.parentFolder = sampleItem.parentFolder.parentFolder;
  } else {
    tcd_parentFolder.parentFolder = sampleItem.parentFolder;
  }
  var folder = {};
  folder.source = sampleItem.parentFolder;
  folder.dest = tcd_parentFolder;
  previousFolders.push(folder);
  tcd_origParentFolder = sampleItem.parentFolder;
  return tcd_parentFolder;
}
function tcd_duplicate(item) {
  if (item instanceof CompItem) {
    tcd_duplicateCompStructure(item, 0);
  } else {
    tcd_duplicateProjItem(item);
  }
  var result = {};
  result.comps = previousComps.slice(0);
  result.folders = previousFolders.slice(0);
  result.footage = previousFootage.slice(0);
  return result;
}
function tcd_collect(item) {
  if (item instanceof CompItem) {
    result = tcd_collect_deps_for_comp(item);
  }
  return result;
}
function tcd_pad(num, size) {
  var s = num + "";
  while (s.length < size) {
    s = "0" + s;
  }
  return s;
}
var tcd_scriptName = "True Comp Duplicator";
var tcd_version = "3.9.11";
var tcd_folderNameDef = "Duplicated Comps";
var tcd_strHelpHeader = tcd_scriptName + " v" + tcd_version;
var tcd_strHelpText =
  '\u4e66\u751f\u6c49\u5316514092538\uff0c\u66f4\u591a\u4f18\u79c0\u8d44\u6e90\u8bf7\u8bbf\u95eeC4DSKY.COM.\n\nTrue Comp Duplicator\u811a\u672c\u53ef\u4ee5\u521b\u5efa\u6240\u9009\u5408\u6210\u5c42\u6b21\u7ed3\u6784\u7684\u5b8c\u6574\u526f\u672c\uff0c\u5305\u62ec\u5b50\u5408\u6210.\n\n\u5982\u679c\u5408\u6210\u88ab\u591a\u6b21\u4f7f\u7528\uff0c\u5219\u5408\u6210\u4ec5\u91cd\u590d\u4e00\u6b21\uff0c\u6240\u6709\u5269\u4f59\u5f15\u7528\u90fd\u6307\u5411\u7b2c\u4e00\u4e2a\u91cd\u590d\u9879.\n\n\u5982\u679c\u5408\u6210\u88ab\u5b89\u6392\u5728\u9879\u76ee\u9762\u677f\u4e2d\u7684\u7279\u6b8a\u6587\u4ef6\u5939\u5c42\u6b21\u7ed3\u6784\u4e2d\uff0c\u5219\u8be5\u6587\u4ef6\u5939\u5c42\u6b21\u7ed3\u6784\u5c06\u4fdd\u7559\u6216\u590d\u5236\uff08\u53d6\u51b3\u4e8e\u7528\u6237\u9996\u9009\u9879\uff09\uff0c\u4ee5\u4fbf\u590d\u5236\u5408\u6210.\n\n\u6b64\u7248\u672c\u4e3a\u60a8\u8282\u7701\u66f4\u591a\u7684\u65f6\u95f4\uff0c\u901a\u8fc7\u5728\u590d\u5236\u8fc7\u7a0b\u4e2d\u6dfb\u52a0\u66f4\u5927\u7684\u63a7\u5236\u6743.\n\n\u65b0\u9879\u76ee\u547d\u540d\n- \u60a8\u53ef\u4ee5\u5c06\u524d\u7f00\u6216\u540e\u7f00\u6dfb\u52a0\u5230\u91cd\u590d\u9879\u76ee\u7684\u540d\u79f0.\n\t\u8fd9\u5305\u62ec\u5408\u6210\u3001\u6587\u4ef6\u5939\u548c\u7d20\u6750.\n- \u60a8\u53ef\u4ee5\u641c\u7d22\uff0c\u5e76\u5728\u590d\u5236\u9879\u76ee\u7684\u540d\u79f0\u66ff\u6362\u6587\u672c.\n\t\u6ce8\u610f\uff1a\u641c\u7d22\u5b57\u7b26\u4e32\u4e0d\u533a\u5206\u5927\u5c0f\u5199.\n\n\u9009\u9879\n- \u5c06\u590d\u5236\u7684\u9879\u76ee\u5206\u7ec4\u5230\u5177\u6709\u6307\u5b9a\u540d\u79f0\u7684\u65b0\u6587\u4ef6\u5939\u4e2d.\n- \u6392\u9664\u5176\u540d\u79f0\u5305\u542b\u63d0\u4f9b\u7684\u524d\u7f00/\u540e\u7f00\u7684\u9879.\n\t\u8fd9\u5141\u8bb8\u60a8\u4ec5\u590d\u5236\u4e00\u4e9b\u5d4c\u5957\u7684\u5408\u6210/\u7d20\u6750.\n- \u590d\u5236\u8fc7\u7a0b\u7684\u6df1\u5ea6\u9650\u5236.\n- \u66f4\u65b0\u8868\u8fbe\u5f0f\uff0c\u5e76\u66f4\u6539\u7531\n\t\u590d\u5236\u8fc7\u7a0b\u3002\u6ce8\u610f\uff1a\u66f4\u65b0\u8868\u8fbe\u5f0f\u65f6,\n\t\u4ec5\u66f4\u65b0\u4ee5\u4e0b\u9879\u76ee\u5f15\u7528.\n      comp("DUPLICATE ITEM\'S NAME")\n      comp("DUPLICATE ITEM\'S NAME").layer("DUPLICATE ITEM\'S NAME")\n      thisComp.layer("DUPLICATE ITEM\'S NAME")\n- \u590d\u5236\u7d20\u6750\u5c06\u590d\u5236\u9879\u76ee\u9762\u677f\u4e2d\u7684\u7d20\u6750\u5f15\u7528.\n\t\u7136\u540e\uff0c\u60a8\u53ef\u4ee5\u53f3\u952e\u5355\u51fb\u5e76\u66ff\u6362\u91cd\u590d\u7684\u7d20\u6750\n\t\u89c6\u9891\u4e0d\u540c\u7684\u7d20\u6750/\u89c6\u9891.\n\t\u6ce8\u610f\uff1a\u8fd9\u5b9e\u9645\u4e0a\u4e0d\u4f1a\u590d\u5236\u786c\u76d8\u4e0a\u7684\u9879\u76ee,\n\t\u53ea\u662f\u4ed6\u4eec\u5728\u9879\u76ee\u4e2d\u7684\u5f15\u7528\u3002\u8fd9\u5c06\u4e0d\u4f1a\u590d\u5236\u7eaf\u8272\u56fe\u5c42,\n\t\u8c03\u6574\u56fe\u5c42\u6216\u7a7a\u5bf9\u8c61.\n\n- \u590d\u5236\u7eaf\u8272\u56fe\u5c42\u5c06\u590d\u5236\u5408\u6210\u4e2d\u4f7f\u7528\u7684\u7eaf\u8272\u56fe\u5c42.\n\n- \u9009\u62e9\u590d\u5236\u5c06\u5728\u590d\u5236\u540e\u9009\u62e9\u65b0\u7684\u9876\u7ea7\u526f\u672c.\n\n\u60a8\u8fd8\u53ef\u4ee5\u6307\u5b9a\u8981\u5236\u4f5c\u7684\u526f\u672c\u6570\u91cf.\n\u6ce8\u610f\uff1a\u6bcf\u4e2a\u526f\u672c\u540d\u79f0\u4e2d\u7684\u6700\u540e\u4e00\u4e2a\u6570\u5b57\u5c06\u81ea\u52a8\u9012\u589e\u3002\u5982\u679c\u6ca1\u6709\u6570\u5b57\uff0c\u5c06\u6dfb\u52a0\u4e00\u4e2a\u6570\u5b57.\n\n\u6b64\u7248\u672c\u7684\u811a\u672c\u9700\u8981After Effects CS3 \u6216\u66f4\u9ad8\u7248\u672c\u3002\u5b83\u53ef\u4ee5\u901a\u8fc7\u5c06\u811a\u672c\u653e\u5728Script\u6587\u4ef6\u5939\u7684ScriptUI\u6587\u4ef6\u5939\u4e2d\uff0c\u7136\u540e\u4ece\u7a97\u53e3\u83dc\u5355\u4e2d\u9009\u62e9\u6b64\u811a\u672c\uff0c\u5c06\u5176\u7528\u4f5c\u53ef\u505c\u9760\u9762\u677f.';
var previousComps = [];
var previousFolders = [];
var previousFootage = [];
var tcd_prefsToSave = [];
var tcd_expFixCount = 0;
if (typeof String.prototype.startsWith != "function") {
  String.prototype.startsWith = function (str) {
    return this.indexOf(str) == 0;
  };
}
if (typeof String.prototype.endsWith != "function") {
  String.prototype.endsWith = function (str) {
    return this.slice(-str.length) == str;
  };
}
progressDlg.prototype.create = function (title, max) {
  var win = new Window("palette", tcd_scriptName + " Progress", undefined, {
    closeButton: false,
    resizeable: true,
  });
  this.windowRef = win;
  var res =
    "group { \n        alignment: [\'fill\', \'fill\'], \n        alignChildren: [\'left\',\'top\'], \n        orientation: \'column\', \n        titleTxt: StaticText {text:\'" +
    title +
    "\', alignment:[\'fill\',\'left\']}, \n        statusTxt: StaticText {text:\'\', alignment:[\'fill\',\'left\']}, \n        progGrp: Group { \n            orientation: \'row\', \n            alignment: [\'fill\',\'top\'], \n            progBar: Progressbar {alignment:[\'fill\',\'center\'], preferredSize:[200,-1], maxvalue:\'" +
    max +
    "\'}, \n            progBtn: Button {text:\'Cancel\', alignment:[\'right\',\'center\'], properties:{name:\u2019cancel\u2019}}, \n        }, \n    }";
  win.grp = win.add(res);
  win.cancelElement = win.grp.progGrp.progBtn;
  win.defaultElement = win.grp.progGrp.progBtn;
  this.cancel = false;
  win.grp.progGrp.progBtn.onClick = function () {
    this.cancel = true;
    win.close();
  };
  win.layout.layout(true);
  win.layout.resize();
  win.onResizing = win.onResize = function () {
    this.layout.resize();
  };
  win.center();
  win.show();
  return this;
};
progressDlg.prototype.setTitle = function (titleTxt) {
  this.windowRef.grp.titleTxt.text = titleTxt;
};
progressDlg.prototype.update = function (increment, statusTxt) {
  this.windowRef.grp.progGrp.progBar.value =
    this.windowRef.grp.progGrp.progBar.value + increment;
  this.windowRef.grp.statusTxt.text = statusTxt;
};
progressDlg.prototype.close = function () {
  this.windowRef.close();
};
progressDlg.prototype.complete = function (titleTxt, statusTxt) {
  this.windowRef.grp.titleTxt.text = titleTxt;
  this.windowRef.grp.statusTxt.text = statusTxt;
  this.windowRef.grp.progGrp.progBar.value =
    this.windowRef.grp.progGrp.progBar.maxvalue;
  this.windowRef.grp.progGrp.progBtn.text = "Ok";
  this.windowRef.grp.progGrp.progBtn.active = true;
};
helpWindow.prototype.run = function () {
  var win = new Window("palette", tcd_scriptName, [100, 0, 580, 600]);
  this.windowRef = win;
  win.btnPanel = win.add("group", [10, 10, 600, 600]);
  win.btnPanel.text = win.btnPanel.add(
    "statictext",
    [10, 10, 400, 25],
    tcd_strHelpHeader,
  );
  win.btnPanel.warnBtn = win.btnPanel.add(
    "edittext",
    [10, 40, 450, 540],
    tcd_strHelpText,
    { multiline: true },
  );
  win.btnPanel.aesBtn = win.btnPanel.add(
    "button",
    [310, 550, 450, 580],
    "\u4e66\u751fCG\u8d44\u6e90\u7ad9",
  );
  win.btnPanel.aesBtn.onClick = function () {
    openURL("http://c4dsky.com");
  };
  win.center();
  win.show();
  return true;
};
expErrWindow.prototype.run = function (expErrors) {
  var win = new Window(
    "palette",
    tcd_scriptName + " - Expression Errors",
    [100, 0, 580, 600],
  );
  this.windowRef = win;
  win.btnPanel = win.add("group", [10, 10, 600, 600]);
  win.btnPanel.text = win.btnPanel.add(
    "statictext",
    [10, 10, 400, 25],
    "Duplication complete, but with " +
      expErrors.length +
      " expression error(s)...",
  );
  win.btnPanel.warnBtn = win.btnPanel.add(
    "edittext",
    [10, 40, 450, 540],
    expErrors.join("\n\n"),
    { multiline: true },
  );
  win.btnPanel.aesBtn = win.btnPanel.add("button", [310, 550, 450, 580], "Ok");
  win.btnPanel.aesBtn.onClick = function () {
    win.close();
  };
  win.center();
  win.show();
  return true;
};
var exp_compCheckRegExp = new RegExp('comp("*.")', "g");
var exp_compLyrRegEx = /comp\(\"(.+?)\"\)\.layer\(\"(.+?)\"\)/g;
var exp_thisCompLyrRegEx = /thisComp.layer\(\"(.+?)\"\)/g;
var TRUECOMPDUP_PALETTE = tcd_buildUI(this);
if (parseFloat(app.version) < 8) {
  alert(
    "This script requires Adobe After Effects CS3 or later.",
    tcd_scriptName,
  );
} else {
  if (TRUECOMPDUP_PALETTE != null && TRUECOMPDUP_PALETTE instanceof Window) {
    TRUECOMPDUP_PALETTE.show();
  }
}
