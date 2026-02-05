/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function la_expressionUniversalizer(thisObj) {
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
          }
          var response = system.callSystem(cmd);
        }
        var myFile = new File(
          resourceFolder + "/" + filename.replace(/\.zip$/, ""),
        );
        if (!File(myFile).exists) {
          alertUI(
            eu_globals.errMissingFile
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
  function getUserDataFolder() {
    var userDataFolder = Folder.userData;
    var aescriptsFolder = Folder(
      userDataFolder.toString() + "/Aescripts/ExpressionUniversalizer",
    );
    if (!aescriptsFolder.exists) {
      var checkFolder = aescriptsFolder.create();
      if (!checkFolder) {
        alert(
          eu_globals.errDiskPermission
            .replace("%1", checkFolder.fsName)
            .replace("%2", userDataFolder),
        );
        aescriptsFolder = Folder.temp;
      }
    }
    return aescriptsFolder.toString();
  }
  function eu_globals_buildUI1(thisObj) {
    if (thisObj instanceof Panel) {
      var myPal = thisObj;
    } else {
      var myPal =
        thisObj != null
          ? new Window(
              "palette",
              eu_globals.scriptName + " v" + eu_globals.scriptVersion,
              undefined,
              { resizeable: true },
            )
          : null;
    }
    if (myPal != null) {
      var res =
        "group { \n\t\t\t\t\talignment: [\'fill\',\'top\'], \n\t\t\t\t\talignChildren: [\'fill\',\'top\'], \n\t\t\t\t\torientation: \'column\', \n                        options: DropDownList {minimumSize:[170,20]}, \n                        buttonsGrp: Group {\n                        alignment: [\'fill\',\'fill\'], \n\t\t\t\t\t  alignChildren: [\'fill\',\'center\'], \n                        help: Button {text: \'?\', preferredSize: [20,20], alignment: [\'left\',\'center\'],},\n                        doItBtn: Button {text: \'Universalize Expressions\' ,preferredSize:[-1,40]} , \n                        }\n                        saveLog: Checkbox {text: \'Create log file\'}, \n                        tag: Checkbox {text: \'Add universalized tag to processed comps\', helpTip:\'This will add an \"Expressions Universalized\" tag in the comp\\\'s comment field in the project panel\'}, \n                        removeDisabledExpressions: Checkbox {text: \'Removed disabled expressions\', helpTip:\'This will remove any expressions that are disabled\'}, \n                        pseudoEffects: Checkbox {text: \'Ignore Pseudo Effects\', helpTip:\'If this is checked, Pseudo Effects will not be universalized\'}, \n                    suppress: Checkbox {text: \'Suppress all alerts\',alignment:[\'left\',\'center\'], helpTip:\'Will suppress all alerts including errors and save warnings, it is recommended to use the log when this is on\'}, \n                        batchGrp: Panel { \n                        text:\'Batch options\',\n                        visible: false, \n                        orientation: \'column\', \n                        projMatch: Group { \n\t\t\t\t\t\torientation:\'row\', \n\t\t\t\t\t\talignment:[\'fill\',\'center\'], alignChildren:[\'fill\',\'center\'], \n\t\t\t\t\t\ttxt: StaticText { text:\'" +
        eu_globals.projNameMatchTxt +
        "\', alignment:[\'left\',\'center\'] , helpTip:\'" +
        eu_globals.projNameMatchTxtHelp +
        "\' }, \n                           val: EditText{ alignment:[\'fill\',\'center\'], helpTip:\'" +
        eu_globals.projNameMatchTxtHelp +
        "\' }, \n\t\t\t\t\t}, \n                     suffix: Group { \n\t\t\t\t\t\torientation:\'row\', \n\t\t\t\t\t\talignment:[\'fill\',\'center\'], alignChildren:[\'fill\',\'center\'], \n\t\t\t\t\t\ttxt: StaticText { text:\'" +
        eu_globals.suffixTxt +
        "\', helpTip:\'" +
        eu_globals.suffixTxtHelp +
        "\', alignment:[\'left\',\'center\']}, \n                           opt: DropDownList { alignment:[\'left\',\'center\'], helpTip:\'" +
        eu_globals.suffixTxtHelp +
        "\'}, \n\t\t\t\t\t\tval: EditText{ alignment:[\'fill\',\'center\'], helpTip:\'" +
        eu_globals.suffixTxtHelp +
        "\'}, \n\t\t\t\t\t}, \n                    }\n\t\t\t\t}";
      myPal.grp = myPal.add(res);
      myPal.grp.options.add("item", "Process entire project");
      myPal.grp.options.add("item", "Process selected comp");
      myPal.grp.options.add("item", "Process selected layers");
      myPal.grp.options.add("item", "Batch process a folder");
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_ProcessOption",
        )
      ) {
        myPal.grp.options.selection = parseFloat(
          app.settings.getSetting(
            "aescripts",
            "ExpressionUniversalizer_ProcessOption",
          ),
        );
      } else {
        myPal.grp.options.selection = 0;
      }
      myPal.grp.batchGrp.visible = myPal.grp.options.selection.text
        .toLowerCase()
        .match(/batch/);
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_addCompTag",
        )
      ) {
        myPal.grp.tag.value = !(
          app.settings.getSetting(
            "aescripts",
            "ExpressionUniversalizer_addCompTag",
          ) == "false"
        );
      } else {
        myPal.grp.tag.value = false;
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_removeDisabledExpressions",
        )
      ) {
        myPal.grp.removeDisabledExpressions.value = !(
          app.settings.getSetting(
            "aescripts",
            "ExpressionUniversalizer_removeDisabledExpressions",
          ) == "false"
        );
      } else {
        myPal.grp.removeDisabledExpressions.value = false;
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_pseudoEffects",
        )
      ) {
        myPal.grp.pseudoEffects.value = !(
          app.settings.getSetting(
            "aescripts",
            "ExpressionUniversalizer_pseudoEffects",
          ) == "false"
        );
      } else {
        myPal.grp.pseudoEffects.value = false;
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_suppressAlertsUI",
        )
      ) {
        myPal.grp.suppress.value = !(
          app.settings.getSetting(
            "aescripts",
            "ExpressionUniversalizer_suppressAlertsUI",
          ) == "false"
        );
      } else {
        myPal.grp.suppress.value = false;
      }
      for (var i = 0; i < eu_globals.suffixOpt.length; i += 1) {
        myPal.grp.batchGrp.suffix.opt.add("item", eu_globals.suffixOpt[i]);
      }
      myPal.grp.batchGrp.suffix.opt.selection = 0;
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_projNameMatch",
        )
      ) {
        myPal.grp.batchGrp.projMatch.val.text = app.settings.getSetting(
          "aescripts",
          "ExpressionUniversalizer_projNameMatch",
        );
      }
      if (
        app.settings.haveSetting("aescripts", "ExpressionUniversalizer_suffix")
      ) {
        myPal.grp.batchGrp.suffix.val.text = app.settings.getSetting(
          "aescripts",
          "ExpressionUniversalizer_suffix",
        );
      }
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_suffixOption",
        )
      ) {
        myPal.grp.batchGrp.suffix.opt.selection = parseFloat(
          app.settings.getSetting(
            "aescripts",
            "ExpressionUniversalizer_suffixOption",
          ),
        );
      } else {
        myPal.grp.batchGrp.suffix.opt.selection = 0;
      }
      eu_globals.addCompTag = myPal.grp.tag.value;
      myPal.grp.tag.onClick = function () {
        eu_globals.addCompTag = myPal.grp.tag.value;
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_addCompTag",
          eu_globals.addCompTag,
        );
      };
      eu_globals.removeDisabledExpressions =
        myPal.grp.removeDisabledExpressions.value;
      myPal.grp.removeDisabledExpressions.onClick = function () {
        eu_globals.removeDisabledExpressions =
          myPal.grp.removeDisabledExpressions.value;
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_removeDisabledExpressions",
          eu_globals.removeDisabledExpressions,
        );
      };
      eu_globals.pseudoEffects = myPal.grp.pseudoEffects.value;
      myPal.grp.pseudoEffects.onClick = function () {
        eu_globals.pseudoEffects = myPal.grp.pseudoEffects.value;
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_pseudoEffects",
          eu_globals.pseudoEffects,
        );
      };
      eu_globals.suppressAlerts = eu_globals.suppressAlertsUI =
        myPal.grp.suppress.value;
      myPal.grp.suppress.onClick = function () {
        eu_globals.suppressAlerts = eu_globals.suppressAlertsUI =
          myPal.grp.suppress.value;
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_suppressAlertsUI",
          eu_globals.suppressAlerts,
        );
      };
      myPal.grp.saveLog.onClick = function () {
        if (this.value) {
          if (!isSecurityPrefSet()) {
            alert(eu_globals.strErrScriptAccess);
            this.value = false;
            return;
          }
          eu_globals.log = eu_globals.defaultLog.saveDlg(
            "Please select the Folder where you would like to save the log",
          );
          if (!eu_globals.log) {
            this.value = false;
          }
        }
        eu_globals.generateLog = this.value;
      };
      myPal.grp.buttonsGrp.help.onClick = function () {
        hs.helpUI();
      };
      myPal.grp.options.onChange = function () {
        myPal.grp.batchGrp.visible = this.selection.text
          .toLowerCase()
          .match(/batch/);
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_ProcessOption",
          this.selection.index,
        );
      };
      myPal.grp.batchGrp.suffix.opt.onChange = function () {
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_suffixOption",
          this.selection.index,
        );
      };
      myPal.grp.batchGrp.suffix.val.onChange = function () {
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_suffix",
          this.text,
        );
      };
      myPal.grp.batchGrp.projMatch.val.onChange = function () {
        app.settings.saveSetting(
          "aescripts",
          "ExpressionUniversalizer_projNameMatch",
          this.text,
        );
      };
      eu_globals.lastBatchDir = Folder.desktop;
      if (
        app.settings.haveSetting(
          "aescripts",
          "ExpressionUniversalizer_lastBatchDir",
        )
      ) {
        try {
          eu_globals.lastBatchDir = File(
            app.settings.getSetting(
              "aescripts",
              "ExpressionUniversalizer_lastBatchDir",
            ),
          );
        } catch (e) {}
      } else {
        eu_globals.lastBatchDir = Folder.desktop;
      }
      myPal.grp.buttonsGrp.doItBtn.onClick = function () {
        var options = myPal.grp.options.selection.text;
        var projNameMatch = myPal.grp.batchGrp.projMatch.val.text;
        var isRegex = projNameMatch.match(/^\/.+\/(g|i|gi)$/);
        var suffixOption = myPal.grp.batchGrp.suffix.opt.selection.text;
        var suffixText = myPal.grp.batchGrp.suffix.val.text;
        doExpressionUniversalizer(
          projNameMatch,
          isRegex,
          suffixOption,
          suffixText,
          options,
        );
      };
      myPal.layout.layout(true);
      myPal.layout.resize();
      myPal.onResizing = myPal.onResize = function () {
        this.layout.resize();
      };
    }
    return myPal;
  }
  function removeEmptySolidsFolder() {
    var allItems = app.project.rootFolder.items.length;
    for (var i = 1; i <= allItems; i += 1) {
      var curItem = app.project.rootFolder.items[i];
      if (
        curItem instanceof FolderItem &&
        curItem.name == "Solids" &&
        curItem.items.length == 0
      ) {
        curItem.remove();
        break;
      }
    }
  }
  function doExpressionUniversalizer(
    projNameMatch,
    isRegex,
    suffixOption,
    suffixText,
    options,
  ) {
    if (eu_globals.showTimer) {
      $.hiresTimer;
    }
    if (eu_globals.suppressAlerts) {
      eu_globals.suppressAlertsUI = true;
    }
    var isBatch = options.toLowerCase().match(/batch/);
    if (eu_globals.generateLog) {
      eu_globals.logFile = eu_globals.log;
      eu_globals.logFile.open("w");
      eu_globals.logFile.encoding = "UTF-8";
      eu_globals.logFile.writeln(
        eu_globals.scriptName + " v" + eu_globals.scriptVersion + " log file",
      );
      eu_globals.logFile.writeln(new Date().toString());
    }
    eu_globals.batchReplaceCounter = 0;
    eu_globals.batchErrorCounter = 0;
    if (eu_globals.suppressAlerts) {
      app.beginSuppressDialogs();
    }
    if (isBatch) {
      var projectProcessedCounter = 0;
      if (
        eu_globals.lastBatchDir == null ||
        !(eu_globals.lastBatchDir instanceof Folder)
      ) {
        eu_globals.lastBatchDir = Folder.desktop;
      }
      eu_globals.lastBatchDir = eu_globals.lastBatchDir.selectDlg(
        "Choose folder that contains AE projects to process",
      );
      if (!eu_globals.lastBatchDir) {
        return;
      }
      if (!eu_globals.lastBatchDir.exists) {
        alert(
          "Folder: " +
            eu_globals.lastBatchDir.fsName +
            " does not exist.\n Please try again",
        );
        return;
      }
      app.settings.saveSetting(
        "aescripts",
        "ExpressionUniversalizer_lastBatchDir",
        eu_globals.lastBatchDir.fsName,
      );
      var myProjects = eu_globals.lastBatchDir.getFiles();
      var regexFlags = "";
      if (isRegex != null && isRegex.length > 0) {
        projNameMatch = projNameMatch
          .replace(/^\//, "")
          .replace(/\/(g|i|gi)$/, "");
        regexFlags = isRegex[1];
      } else {
        projNameMatch = projNameMatch.replace(
          /[-[\]{}()*+?.\\^$|,#\s]/g,
          "\\$&",
        );
      }
      for (var i = 0; i < myProjects.length; i += 1) {
        if (
          myProjects[i].displayName.match(/\.aep(x)?$/) &&
          myProjects[i].displayName.match(new RegExp(projNameMatch, regexFlags))
        ) {
          try {
            var myProj = app.open(myProjects[i]);
          } catch (e) {
            eu_globals.errorCounter++;
            if (eu_globals.generateLog) {
              eu_globals.logFile.writeln(
                "--------------------------------------------------------------------------------",
              );
              eu_globals.logFile.writeln("ERROR OPENING PROJECT:");
              eu_globals.logFile.writeln(myProjects[i].fsName);
              eu_globals.logFile.writeln(e.toString());
              eu_globals.logFile.writeln(
                "--------------------------------------------------------------------------------",
              );
            }
            continue;
          }
          var counters = recurseProjectItems(0);
          eu_globals.replaceCounter = counters[0];
          eu_globals.errorCounter = counters[1];
          eu_globals.batchReplaceCounter =
            eu_globals.batchReplaceCounter + eu_globals.replaceCounter;
          eu_globals.batchErrorCounter =
            eu_globals.batchErrorCounter + eu_globals.errorCounter;
          projectProcessedCounter++;
          var newProjName = myProjects[i].fsName;
          if (suffixText != "") {
            switch (suffixOption.toLowerCase()) {
              case "suffix":
                newProjName =
                  myProjects[i].parent.fsName +
                  "/" +
                  myProjects[i].displayName.replace(
                    /\.(aep(x)?)/,
                    suffixText + ".$1",
                  );
                break;
              case "prefix":
                newProjName =
                  myProjects[i].parent.fsName +
                  "/" +
                  suffixText +
                  myProjects[i].displayName;
                break;
              case "replace":
                newProjName =
                  myProjects[i].parent.fsName +
                  "/" +
                  myProjects[i].displayName.replace(
                    new RegExp(projNameMatch, regexFlags),
                    suffixText,
                  );
                break;
            }
            app.project.save(new File(newProjName));
          } else {
            eu_globals.suppressAlerts
              ? app.project.save(myProjects[i])
              : app.project.save();
          }
        }
        removeEmptySolidsFolder();
        app.project.close(CloseOptions.DO_NOT_SAVE_CHANGES);
      }
    } else {
      var counters = recurseProjectItems(options);
      if (counters != undefined) {
        eu_globals.replaceCounter = counters[0];
        eu_globals.errorCounter = counters[1];
      }
    }
    if (eu_globals.suppressAlerts) {
      app.endSuppressDialogs(false);
    }
    removeEmptySolidsFolder();
    eu_globals.suppressAlertsUI = false;
    var finishTitle = eu_globals.stopSearch ? "Process stopped" : "Finito!";
    if (counters != undefined) {
      writeLn(finishTitle);
      writeLn(
        "Updated " +
          eu_globals.replaceCounter +
          " effect references to their universal match names.",
      );
      eu_globals.removeDisabledExpressions
        ? writeLn("Expressions that were disabled were deleted.")
        : writeLn("Expressions that were disabled were skipped.");
      writeLn(
        "Expressions that didn\'t require universalization were skipped.",
      );
      var logAlert = eu_globals.generateLog
        ? "\n\nLog file was created here:\n" +
          eu_globals.log.fsName +
          "\n\nWould you like to open the log now?"
        : "";
      var finishedAlert =
        finishTitle + "\n" + isBatch
          ? "Processed " +
            projectProcessedCounter +
            " projects and universalized "
          : "Universalized " + isBatch
            ? eu_globals.batchReplaceCounter
            : eu_globals.replaceCounter +
                  " effect references.\n" +
                  (eu_globals.errorCounter > 0) ||
                eu_globals.batchErrorCounter > 0
              ? "Logged " + isBatch
                ? eu_globals.batchErrorCounter
                : eu_globals.errorCounter +
                      " error" +
                      (eu_globals.errorCounter > 1) ||
                    eu_globals.batchErrorCounter > 1
                  ? "s"
                  : "" + ". (" + eu_globals.generateLog
                    ? "see log for details"
                    : "run again and turn on log for details" + ")\n"
              : "" + "\n" + eu_globals.removeDisabledExpressions
                ? "Expressions that were disabled were deleted."
                : "Expression that were disabled were skipped." +
                  "\nExpressions that did not require universalization were skipped." +
                  logAlert;
      if (eu_globals.showTimer) {
        finishedAlert += "\n\nProcess Time: " + msToTime($.hiresTimer / 1000);
      }
      if (eu_globals.generateLog) {
        eu_globals.logFile.writeln("");
        eu_globals.logFile.writeln(
          "--------------------------------------------------------------------------------",
        );
        eu_globals.logFile.writeln(
          "--------------------------------------------------------------------------------",
        );
        eu_globals.logFile.writeln("");
        eu_globals.logFile.writeln(
          finishedAlert
            .replace("Would you like to open the log now?", "")
            .replace(/\n/g, "\n\r"),
        );
        eu_globals.logFile.close();
        if (!eu_globals.suppressAlerts && confirm(finishedAlert)) {
          eu_globals.logFile.execute();
        }
      } else {
        if (!eu_globals.suppressAlerts) {
          alert(finishedAlert);
        }
      }
    }
    clearOutput();
    eu_globals.stopSearch = false;
  }
  function msToTime(s) {
    var ms = s % 1000;
    s = (s - ms) / 1000;
    var secs = s % 60;
    s = (s - secs) / 60;
    var mins = s % 60;
    var hrs = (s - mins) / 60;
    return hrs + "hrs " + mins + "mins " + secs + "." + ms.toFixed(0) + "secs";
  }
  function recurseProjectItems(processOption) {
    app.beginUndoGroup(eu_globals.scriptName);
    eu_globals.replacedItemsArray = new Array();
    eu_globals.renamedEffects = new Array();
    eu_globals.stopSearch = false;
    eu_globals.warnedAboutCustomName = false;
    if (eu_globals.generateLog) {
      eu_globals.logFile.writeln();
      var projName =
        app.project.file == null
          ? "Untitled Project.aep"
          : app.project.file.fsName;
      eu_globals.logFile.writeln(
        "--------------------------------------------------------------------------------",
      );
      eu_globals.logFile.writeln("Project: " + projName);
      eu_globals.logFile.writeln(
        "--------------------------------------------------------------------------------",
      );
      eu_globals.logFile.writeln();
    }
    eu_globals.replaceCounter = 0;
    eu_globals.errorCounter = 0;
    var projNumItems = app.project.numItems;
    var compArray = new Array();
    var layersArray = new Array();
    if (
      processOption
        .toString()
        .toLowerCase()
        .match(/(comp)|(layers?)/)
    ) {
      var numComps = 1;
      if (app.project.activeItem instanceof CompItem) {
        compArray.push(app.project.activeItem);
      } else {
        alert("Please select the comp you would like to process");
        return;
      }
      if (processOption.toLowerCase().match(/layers?/)) {
        if (app.project.activeItem.selectedLayers.length == 0) {
          alert("Please select the layers you would like to process");
          return;
        }
        layersArray = app.project.activeItem.selectedLayers;
      }
    } else {
      for (var h = 1; h <= projNumItems; h += 1) {
        if (app.project.item(h) instanceof CompItem) {
          compArray[compArray.length] = app.project.item(h);
        }
      }
      var numComps = compArray.length;
    }
    var progressDlg = eu_globals_progressUI(numComps);
    if (
      (parseFloat(app.version) >= 9 && $.os.indexOf("Mac") != -1) ||
      (parseFloat(app.version) >= 8 && $.os.indexOf("Win") != -1)
    ) {
      progressDlg.center();
      progressDlg.show();
    }
    for (var i = 0; i < compArray.length; i += 1) {
      if (eu_globals.stopSearch) {
        break;
      }
      var myComp = compArray[i];
      if (i > 0) {
        layersArray = [];
      }
      updateProgBar(progressDlg, i + 1, myComp.name, numComps, 0, "", 100);
      if (eu_globals.generateLog) {
        eu_globals.logFile.writeln(
          "--------------------------------------------------------------------------------",
        );
        eu_globals.logFile.writeln("Comp: " + myComp.name);
        eu_globals.logFile.writeln(
          "--------------------------------------------------------------------------------",
        );
      }
      if (layersArray.length == 0) {
        for (var l = 1; l <= myComp.numLayers; l += 1) {
          layersArray.push(myComp.layer(l));
        }
      }
      eu_globals.dummyNull = myComp.layers.addNull(
        Math.max(0, Math.min(myComp.duration, 10800)),
      );
      eu_globals.dummyNull.enabled = false;
      var saveReplaceCounter = eu_globals.replaceCounter;
      var saveErrorCounter = eu_globals.errorCounter;
      for (var j = 0; j < layersArray.length; j += 1) {
        if (eu_globals.stopSearch) {
          break;
        }
        updateProgBar(
          progressDlg,
          i + 1,
          myComp.name,
          numComps,
          j,
          layersArray[j].name,
          layersArray.length,
        );
        var progBar = {
          i: i,
          j: j,
          layers: layersArray,
          numComps: numComps,
          progressDlg: progressDlg,
        };
        recursePropertiesAndFixExpressions(
          layersArray[j],
          layersArray[j],
          progBar,
        );
      }
      eu_globals.dummyNull.source.remove();
      if (eu_globals.addCompTag) {
        if (
          myComp.comment != "" &&
          myComp.comment.toString().match(/expressions universalized/) == null
        ) {
          var confStr =
            "Comp: " +
            myComp.name +
            " has an existing comment. \n\nWould you like to go ahead and delete the comment and add the \'universalized\' tag?\n\nIf you choose \'Yes\' the comment will be deleted and the universalized tag will be added.\nChoosing \'No\' will preserve the comment but the comp will not be tagged.";
          if (!eu_globals.suppressAlerts) {
            eu_globals_confirmUI(confStr);
          }
        } else {
          eu_globals.deleteComment = true;
        }
        try {
          myComp.comment = eu_globals.deleteComment
            ? eu_globals.replaceCounter -
              saveReplaceCounter +
              " expressions universalized with " +
              (eu_globals.errorCounter - saveErrorCounter) +
              " errors on " +
              new Date().toString()
            : myComp.comment;
        } catch (e) {
          writeLn(e.toString());
          if (eu_globals.generateLog) {
            eu_globals.logFile.writeln("ERROR WRITING COMMENT TO COMP");
            eu_globals.logFile.writeln(e.toString());
          }
        }
      }
    }
    progressDlg.close();
    app.endUndoGroup;
    return [eu_globals.replaceCounter, eu_globals.errorCounter];
  }
  function decimalPlaces(num) {
    var match = ("" + num).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/);
    if (!match) {
      return 0;
    }
    return Math.max(
      0,
      match[1] ? match[1].length : 0 - match[2] ? match[2] : 0,
    );
  }
  function recursePropertiesAndFixExpressions(myProperty, myLayer, progBar) {
    for (var j = 1; j <= myProperty.numProperties; j += 1) {
      if (eu_globals.vT && eu_globals.replaceCounter >= 5) {
        alert(
          "The trial version is limited to universalizing 5 expressions. The full version does not have this limitation",
        );
        eu_globals.stopSearch = true;
      }
      if (eu_globals.stopSearch) {
        break;
      }
      eu_globals.didReplace = false;
      if (
        myProperty.property(j).elided ||
        myProperty.property(j).numProperties != undefined ||
        myProperty.property(j).numProperties > 0
      ) {
        recursePropertiesAndFixExpressions(
          myProperty.property(j),
          myLayer,
          progBar,
        );
      }
      if (
        eu_globals.removeDisabledExpressions &&
        !myProperty.property(j).expressionEnabled &&
        myProperty.property(j).expression != undefined &&
        myProperty.property(j).expression != ""
      ) {
        if (eu_globals.generateLog) {
          eu_globals.logFile.writeln(
            "<--------------------------------EXPRESSION REMOVED-------------------------------->",
          );
          eu_globals.logFile.writeln(
            "Layer: " + (myLayer.index - 1) + "." + myLayer.name,
          );
          eu_globals.logFile.writeln(
            "Property: " + myProperty.property(j).name,
          );
          eu_globals.logFile.writeln("Expression: ");
          eu_globals.logFile.writeln(myProperty.property(j).expression);
          eu_globals.logFile.writeln("REMOVED because it was disabled");
          eu_globals.logFile.writeln(
            "<---------------------------------------------------------------------------------------------->",
          );
        }
        myProperty.property(j).expression = "";
        continue;
      }
      if (
        myProperty.property(j).canSetExpression &&
        myProperty.property(j).expressionEnabled &&
        myProperty.property(j).expression != "" &&
        !myProperty.property(j).expression.match(/^( +)?<enc>/) &&
        !isHidden(myProperty.property(j)) &&
        (myProperty
          .property(j)
          .expression.replace(eu_globals.extraSpacesRemoverRegex, "")
          .match(eu_globals.effectRegex) ||
          myProperty
            .property(j)
            .expression.replace(eu_globals.extraSpacesRemoverRegex, "")
            .match(eu_globals.dataRegex))
      ) {
        var myProp = myProperty.property(j);
        var myExpression = myProp.expression;
        var saveExpression = myExpression;
        var newExpression = myExpression;
        var expressionLineArray = myExpression.split(/\n|\r/);
        var fullExpressionArray = new Array();
        for (var e = 0; e < expressionLineArray.length; e += 1) {
          if (expressionLineArray[e].length > 3) {
            var expressionSubLineArray = hs.JSONify(
              regexLib.split(
                expressionLineArray[e],
                eu_globals.lineSplitRegex,
                true,
              ),
              "parse",
            );
            for (var es = 0; es < expressionSubLineArray.length; es += 1) {
              var thisDotParentRegex = new RegExp(
                /(?:=)?\s*this((\.parent)+)(?=(?:[^"']|["|'][^"']*")*$)/,
              );
              var thisDotParentMatches = [];
              while (
                (thisDotParentMatches = thisDotParentRegex.exec(
                  expressionSubLineArray[es],
                ))
              ) {
                if (thisDotParentMatches[1] != null) {
                  var theParent = myLayer;
                  for (var p = 1; p < thisDotParentMatches.length; p += 1) {
                    if (
                      theParent.parent != undefined &&
                      theParent.parent != null
                    ) {
                      theParent = theParent.parent;
                    }
                  }
                  if (theParent instanceof AVLayer) {
                    expressionSubLineArray[es] = expressionSubLineArray[
                      es
                    ].replace(
                      thisDotParentRegex,
                      'thisComp.layer("' + theParent.name + '")',
                    );
                  }
                }
              }
              if (
                expressionSubLineArray[es].match(
                  new RegExp(
                    "\\beval\\b[^\\n|;]+\\b(" +
                      eu_globals_localize(eu_globals.effectsLocalizedName) +
                      "|effect)\\b",
                  ),
                )
              ) {
                eu_globals.errorCounter++;
                if (eu_globals.generateLog) {
                  eu_globals.logFile.writeln(
                    "<--------------------------------EXPRESSION LINE SKIPPED-------------------------------->",
                  );
                  eu_globals.logFile.writeln(
                    "Layer: " + (myLayer.index - 1) + "." + myLayer.name,
                  );
                  eu_globals.logFile.writeln(
                    "Property: " + myProperty.property(j).name,
                  );
                  eu_globals.logFile.writeln("Expression line " + e + 1 + ": ");
                  eu_globals.logFile.writeln(expressionLineArray[e]);
                  eu_globals.logFile.writeln(
                    "SKIPPED because effect references inside eval() statements are not supported",
                  );
                  eu_globals.logFile.writeln(
                    "<---------------------------------------------------------------------------------------------->",
                  );
                }
                continue;
              }
              var tempEffectsArray = expressionSubLineArray[es].match(
                eu_globals.fullExpressionRegex,
              );
              var tempDataArray = expressionSubLineArray[es].match(
                eu_globals.fullDataExpressionRegex,
              );
              if (tempEffectsArray != null || tempDataArray != null) {
                isEffect = tempEffectsArray != null;
                isData = tempDataArray != null;
                var arrayToUse = isEffect ? tempEffectsArray : tempDataArray;
                var regexToUse = isEffect
                  ? eu_globals.effectRegex
                  : eu_globals.dataRegex;
                for (var f = 0; f < arrayToUse.length; f += 1) {
                  fullExpressionArray.push({
                    expressionEffectsArray: arrayToUse[f]
                      .match(regexToUse)
                      .toString(),
                    fullExpression: arrayToUse[f],
                    fullExpressionLineNumberInFullArray: arrayToUse[f],
                    isData: isData,
                    isEffect: isEffect,
                  });
                }
              }
            }
          }
        }
        var newExpressionEffectsArray = new Array();
        for (var m = 0; m < fullExpressionArray.length; m += 1) {
          var myComp = myLayer.containingComp;
          updateProgBar(
            progBar.progressDlg,
            progBar.i + 1,
            myComp.name,
            progBar.numComps,
            progBar.j + 1,
            progBar.layers[progBar.j].name,
            progBar.layers.length,
            m + 1,
            myProperty.name + " - " + myProperty.property(j).name,
            fullExpressionArray.length,
          );
          var fullEffectPathRegex = [];
          var fullEffectPathRegexMatches = [];
          isEffect = fullExpressionArray[m].isEffect;
          regexToUse = isEffect
            ? eu_globals.effectHeader
            : eu_globals.dataHeader;
          var fullEffectPath = fullExpressionArray[
            m
          ].expressionEffectsArray.replace(
            new RegExp(regexToUse.replace(/2/, "1"), "g"),
            "",
          );
          var regexToUse = isEffect
            ? eu_globals.fullEffectPathRegex
            : eu_globals.fullDataPathRegex;
          while (
            (fullEffectPathRegexMatches = regexToUse.exec(fullEffectPath))
          ) {
            fullEffectPathRegex = fullEffectPathRegex.concat(
              fullEffectPathRegexMatches,
            );
          }
          regexToUse.lastIndex = 0;
          var fullLayerPathRegex = null;
          var fullLayerPathRegexMatches = null;
          while (
            (fullLayerPathRegexMatches = eu_globals.fullLayerPathRegex.exec(
              fullExpressionArray[m].fullExpression,
            ))
          ) {
            if (
              fullExpressionArray[m].fullExpression.match(
                new RegExp(
                  (
                    fullLayerPathRegexMatches[0] +
                    fullExpressionArray[m].expressionEffectsArray
                  ).replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&"),
                ),
              )
            ) {
              fullLayerPathRegex = fullLayerPathRegexMatches;
            }
          }
          eu_globals.fullLayerPathRegex.lastIndex = 0;
          var isThisComp = true;
          var layerNameIsIndex = false;
          if (fullLayerPathRegex != null && fullLayerPathRegex.length == 9) {
            if (fullLayerPathRegex[1] == "this_comp") {
              fullLayerPathRegex[1] = "thisComp";
            }
            if (fullLayerPathRegex[1] == "thisComp") {
              theComp = myLayer.containingComp;
            } else if (
              fullLayerPathRegex[3] != undefined &&
              fullLayerPathRegex[2] != undefined &&
              fullLayerPathRegex[2] != ""
            ) {
              compName = fullLayerPathRegex[3];
              isThisComp = false;
            } else {
              var variableCompName = fullLayerPathRegex[3];
              compName = eu_globals_createTextLayerToGetVariableName(
                myLayer.containingComp,
                myLayer,
                variableCompName,
                myExpression,
                myProperty.property(j),
                expressionLineArray,
              );
              isThisComp = false;
            }
            if (!isThisComp) {
              theComp = findCompByName(compName);
              if (theComp == null) {
                eu_globals.errorCounter++;
                if (eu_globals.generateLog) {
                  eu_globals.logFile.writeln(
                    "<--------------------------------ERROR-------------------------------->",
                  );
                  eu_globals.logFile.writeln(
                    "Layer: " + (myLayer.index - 1) + "." + myLayer.name,
                  );
                  eu_globals.logFile.writeln(
                    "Property: " + myProperty.property(j).name,
                  );
                  eu_globals.logFile.writeln("Expression line " + e + 1 + ": ");
                  eu_globals.logFile.writeln(
                    fullExpressionArray[m].fullExpression,
                  );
                  eu_globals.logFile.writeln(
                    "Could not resolve referenced comp: " + compName,
                  );
                  eu_globals.logFile.writeln(
                    "<---------------------------------------------------------------------------------------------->",
                  );
                }
              }
            }
            if (fullLayerPathRegex[6] != undefined) {
              layerName = fullLayerPathRegex[6];
              if (fullLayerPathRegex[5] == undefined) {
                if (layerName.toString().match(/^((index)|[0-9]+)$/)) {
                  layerName = layerName.replace(/index/, myLayer.index);
                  layerName = eval(layerName);
                  layerNameIsIndex = true;
                }
                if (layerName.toString().match(/thisLayer,\s*(-?[0-9]+)/)) {
                  layerName = layerName.replace(
                    /thisLayer,\s*(-?[0-9]+)/g,
                    function (str, match1) {
                      return (
                        "" +
                        myLayer.containingComp.layer(match1 + myLayer.index)
                          .name +
                        ""
                      );
                    },
                  );
                } else {
                  if (!layerNameIsIndex) {
                    layerName = eu_globals_createTextLayerToGetVariableName(
                      theComp,
                      myLayer,
                      layerName,
                      myExpression,
                      myProperty.property(j),
                      expressionLineArray,
                    );
                  }
                }
              }
              theLayer = null;
            }
          } else {
            theLayer = myLayer;
            theComp = myLayer.containingComp;
          }
          if (fullEffectPathRegex != null && fullEffectPathRegex.length >= 8) {
            function getVariable(variable) {
              return eu_globals_createTextLayerToGetVariableName(
                myLayer.containingComp,
                myLayer,
                variable,
                myExpression,
                myProperty.property(j),
                expressionLineArray,
              );
            }
            var primaryEffectFull = fullEffectPathRegex[0];
            var effectNameQuotes1 = fullEffectPathRegex[1];
            var effectIsIndex =
              effectNameQuotes1 == undefined &&
              fullEffectPathRegex[2].toString().match(/^[0-9]+$/) != null;
            var effectIsVariable =
              effectNameQuotes1 == undefined && !effectIsIndex;
            var effectName = effectIsVariable
              ? getVariable(fullEffectPathRegex[2])
              : fullEffectPathRegex[2];
            var effectNameQuotes2 = fullEffectPathRegex[3];
            var effectPropNameQuotes1 = isEffect
              ? fullEffectPathRegex[5]
              : fullEffectPathRegex[4];
            var effectPropNameQuotes2 = fullEffectPathRegex[7];
            var effectPropNameIsIndex =
              effectPropNameQuotes1 == undefined &&
              fullEffectPathRegex[6] != undefined &&
              fullEffectPathRegex[6].toString().match(/^[0-9]+$/) != null;
            var effectPropNameIsVariable =
              effectPropNameQuotes1 == undefined && !effectPropNameIsIndex;
            var effectPropName =
              fullEffectPathRegex[6] != undefined
                ? isEffect && effectPropNameIsVariable
                  ? getVariable(fullEffectPathRegex[6])
                  : fullEffectPathRegex[6]
                : "";
            var secondaryEffectFull = fullEffectPathRegex[8];
            var secondaryEffectQuotes1 = fullEffectPathRegex[9];
            var secondaryEffectQuotes2 = fullEffectPathRegex[11];
            var secondaryEffectIsIndex =
              secondaryEffectQuotes1 == undefined &&
              fullEffectPathRegex[10] != undefined &&
              fullEffectPathRegex[10].toString().match(/^[0-9]+$/) != null;
            var secondaryEffectIsVariable =
              secondaryEffectQuotes1 == undefined &&
              fullEffectPathRegex[10] != undefined &&
              !secondaryEffectIsIndex;
            var secondaryEffectName = secondaryEffectIsVariable
              ? getVariable(fullEffectPathRegex[10])
              : fullEffectPathRegex[10];
            var secondaryEffectPropNameQuotes1 = fullEffectPathRegex[13];
            var secondaryEffectPropNameQuotes2 = fullEffectPathRegex[15];
            var secondaryEffectPropNameIsIndex =
              secondaryEffectPropNameQuotes1 == undefined &&
              fullEffectPathRegex[14] != undefined &&
              fullEffectPathRegex[14].toString().match(/^[0-9]+$/) != null;
            var secondaryEffectPropNameIsVariable =
              secondaryEffectPropNameQuotes1 == undefined &&
              fullEffectPathRegex[14] != undefined &&
              !secondaryEffectPropNameIsIndex;
            var secondaryEffectPropName = secondaryEffectPropNameIsVariable
              ? getVariable(fullEffectPathRegex[14])
              : fullEffectPathRegex[14];
            if (effectNameQuotes1 == undefined) {
            }
            var matchNames = eu_globals_findMatchName(
              theComp,
              theLayer,
              compName,
              layerName,
              effectName,
              effectPropName,
              effectIsIndex,
              effectPropNameIsIndex,
              secondaryEffectName,
              secondaryEffectPropName,
              secondaryEffectIsIndex,
              secondaryEffectPropNameIsIndex,
              layerNameIsIndex,
              isEffect,
            );
            if (matchNames[0] == null || (isEffect && matchNames[1] == null)) {
              if (j + 1 <= myProperty.numProperties) {
                recursePropertiesAndFixExpressions(
                  myProperty.property(j + 1),
                  myLayer,
                  progBar,
                );
              }
              continue;
            }
            if (effectIsVariable) {
              matchNames[0] = fullEffectPathRegex[2];
            }
            if (effectIsVariable || effectIsIndex) {
              effectNameQuotes1 = effectNameQuotes2 = "";
            }
            if (effectIsIndex) {
              matchNames[1] = effectPropName;
            }
            if (eu_globals.pseudoEffects && matchNames[1] != null) {
              if (matchNames[1].toString().match(eu_globals.isPseudoRegex)) {
                matchNames[1] = effectPropName;
              }
            }
            if (effectNameQuotes1 == null) {
              effectNameQuotes1 = "";
            }
            if (effectNameQuotes2 == null) {
              effectNameQuotes2 = "";
            }
            fullEffectPathRegex[4] = "";
            var secondaryEffect =
              (secondaryProp =
              secondaryMatchName =
              secondaryPropMatchName =
                "");
            if (effectPropNameQuotes1 == null) {
              effectPropNameQuotes1 = "";
            }
            if (effectPropNameQuotes2 == null) {
              effectPropNameQuotes2 = "";
            }
            if (isEffect && secondaryEffect != null) {
              if (secondaryEffectIsVariable) {
                matchNames[2] = fullEffectPathRegex[10];
              }
              if (secondaryEffectIsIndex) {
                secondaryEffectQuotes1 = secondaryEffectQuotes2 = "";
                matchNames[3] = secondaryEffectPropName;
              }
              if (eu_globals.pseudoEffects && matchNames[3] != null) {
                if (matchNames[3].match(eu_globals.isPseudoRegex)) {
                  matchNames[3] = secondaryEffectPropName;
                }
              }
              if (secondaryEffectQuotes1 == null) {
                secondaryEffectQuotes1 = "";
              }
              if (secondaryEffectQuotes2 == null) {
                secondaryEffectQuotes2 = "";
              }
              if (secondaryEffectPropNameQuotes1 == null) {
                secondaryEffectPropNameQuotes1 = "";
              }
              if (secondaryEffectPropNameQuotes2 == null) {
                secondaryEffectPropNameQuotes2 = "";
              }
              secondaryMatchName =
                matchNames[2] != null ? matchNames[2] : secondaryEffectName;
              secondaryEffect =
                "(" +
                secondaryEffectQuotes1 +
                secondaryMatchName +
                secondaryEffectQuotes1 +
                ")";
              secondaryPropMatchName =
                matchNames[3] != null ? matchNames[3] : fullEffectPathRegex[14];
              if (secondaryEffectPropNameIsVariable) {
                secondaryEffectPropNameQuotes1 = '"';
              }
              secondaryProp =
                "(" +
                secondaryEffectPropNameQuotes1 +
                secondaryPropMatchName +
                secondaryEffectPropNameQuotes1 +
                ")";
              secondaryEffect += secondaryProp;
            }
            if (effectIsVariable) {
              matchNames[0] = fullEffectPathRegex[2];
            }
            if (isEffect && effectPropNameIsIndex) {
              matchNames[1] = effectPropName;
            }
            if (isEffect && effectPropNameIsVariable) {
              effectPropNameQuotes1 = '"';
            }
            var primaryEffect =
              "(" +
              effectNameQuotes1 +
              "" +
              matchNames[0] +
              "" +
              effectNameQuotes2 +
              ")";
            if (fullEffectPathRegex[4] != undefined && matchNames[1] != "") {
              primaryEffect +=
                fullEffectPathRegex[4] +
                "(" +
                effectPropNameQuotes1 +
                "" +
                matchNames[1] +
                "" +
                effectPropNameQuotes1 +
                ")";
            }
            var tempNewExpression = !isEffect
              ? fullExpressionArray[m].expressionEffectsArray.replace(
                  new RegExp("^" + eu_globals.dataHeader.replace(/2/, "1")),
                  '("' + eu_globals.dataMatchName + '")',
                )
              : fullExpressionArray[m].expressionEffectsArray.replace(
                  new RegExp(
                    primaryEffectFull.replace(
                      /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                      "\\$&",
                    ),
                  ),
                  primaryEffect,
                );
            if (isEffect && secondaryEffectFull != null) {
              tempNewExpression = tempNewExpression.replace(
                new RegExp(
                  secondaryEffectFull.replace(
                    /[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g,
                    "\\$&",
                  ),
                ),
                secondaryEffect,
              );
            }
            newExpressionEffectsArray[m] = tempNewExpression;
            if (
              newExpressionEffectsArray[m].toString() !=
              fullExpressionArray[m].expressionEffectsArray.toString()
            ) {
              eu_globals.replaceCounter++;
              var beforeExpression =
                fullExpressionArray[m].expressionEffectsArray.toString();
              var afterExpression = newExpressionEffectsArray[m].toString();
              eu_globals.replacedItemsArray[
                eu_globals.replacedItemsArray.length
              ] =
                "Comp: " +
                myLayer.containingComp.name +
                " Layer: " +
                (myLayer.index - 1) +
                ". " +
                myLayer.name +
                "\n" +
                beforeExpression +
                "\nconverted to:\n" +
                afterExpression;
              eu_globals.didReplace = true;
            }
            if (eu_globals.didReplace && newExpressionEffectsArray[m] != null) {
              newExpression = newExpression.replace(
                fullExpressionArray[m].expressionEffectsArray,
                newExpressionEffectsArray[m],
              );
            }
          } else {
            newExpressionEffectsArray[m] =
              fullExpressionArray[m].expressionEffectsArray;
          }
          if (eu_globals.didReplace && newExpressionEffectsArray[m] != null) {
            newExpression = newExpression.replace(
              fullExpressionArray[m].expressionEffectsArray,
              newExpressionEffectsArray[m],
            );
          }
        }
        if (eu_globals.generateLog && eu_globals.didReplace) {
          eu_globals.logFile.writeln();
          eu_globals.logFile.writeln(
            "Layer: " + (myLayer.index - 1) + "." + myLayer.name,
          );
          eu_globals.logFile.writeln(
            "Property: " + myProperty.property(j).name,
          );
          eu_globals.logFile.writeln(
            "Original expression: ---------------------->",
          );
          eu_globals.logFile.writeln(saveExpression);
          eu_globals.logFile.writeln();
          eu_globals.logFile.writeln(
            "Updated expression: ---------------------->",
          );
          eu_globals.logFile.writeln(newExpression);
          eu_globals.logFile.writeln();
        }
      }
      if (
        myProperty.property(j).canSetExpression &&
        myProperty.property(j).expression != "" &&
        !myProperty.property(j).expressionEnabled
      ) {
        if (eu_globals.generateLog) {
          eu_globals.logFile.writeln(
            "Layer: " + (myLayer.index - 1) + "." + myLayer.name,
          );
          eu_globals.logFile.writeln(
            "Property: " + myProperty.property(j).name,
          );
          eu_globals.logFile.writeln("SKIPPED because expression is disabled");
        }
        eu_globals.replacedItemsArray[eu_globals.replacedItemsArray.length] =
          "Comp: " +
          myLayer.containingComp.name +
          " Layer: " +
          (myLayer.index - 1) +
          ". " +
          myLayer.name +
          "\n" +
          "Property: " +
          myProperty.property(j).name +
          "\nSKIPPED because expression is disabled";
      }
      if (eu_globals.didReplace) {
        if (!eu_globals.suppressAlerts) {
          app.beginSuppressDialogs();
        }
        try {
          myProperty.property(j).expression = newExpression;
        } catch (e) {
          eu_globals.errorCounter++;
          myProperty.property(j).expression = saveExpression;
          eu_globals.replaceCounter--;
          if (eu_globals.generateLog) {
            eu_globals.logFile.writeln(
              "<--------------------------------ERROR-------------------------------->",
            );
            eu_globals.logFile.writeln(e.toString());
            eu_globals.logFile.writeln();
            eu_globals.logFile.writeln(
              "Restoring expression since updated expression caused an error.",
            );
            eu_globals.logFile.writeln(
              "IMPORTANT NOTICE: This expression was not universalized, please double check to make sure it does not require universalizing.",
            );
            eu_globals.logFile.writeln(
              "Restored expression: ---------------------->",
            );
            eu_globals.logFile.writeln(saveExpression);
          }
        }
        if (!eu_globals.suppressAlerts) {
          app.endSuppressDialogs(!eu_globals.suppressAlerts);
        }
      }
      if (eu_globals.generateLog && eu_globals.didReplace) {
        eu_globals.logFile.writeln(
          "--------------------------------------------------------------------------------",
        );
      }
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
  function findCompByName(compName) {
    var myComp = null;
    for (var i = 1; i <= app.project.numItems; i += 1) {
      curItem = app.project.item(i);
      if (curItem instanceof CompItem && curItem.name == compName) {
        myComp = curItem;
        break;
      }
    }
    return myComp;
  }
  function eu_globals_createTextLayerToGetVariableName(
    myComp,
    myLayer,
    variableName,
    theExpression,
    myProperty,
    expressionLineArray,
  ) {
    var myText = myComp.layers.addText();
    var newExpression = theExpression;
    var newExpressionArray = [];
    for (var m = 0; m < expressionLineArray.length; m += 1) {
      newExpressionArray[m] = expressionLineArray[m].replace(
        /layer\(thisLayer,\s*(-?[0-9]+)\)/g,
        function (str, match1) {
          return 'layer("' + myComp.layer(match1 + myLayer.index).name + '")';
        },
      );
      newExpressionArray[m] = newExpressionArray[m].replace(
        /thisComp\.layer\(index\)/g,
        "thisComp.layer(" + myLayer.index + ")",
      );
      newExpressionArray[m] = newExpressionArray[m].replace(
        new RegExp("([^\\.])value", "g"),
        " $1thisComp.layer(" +
          myLayer.index +
          ")" +
          eu_globals_getPropertyChain(myProperty).expressionChain,
      );
      var localEffectOrDataRefCheck = newExpressionArray[m].match(
        new RegExp(eu_globals.checkForPeriodBeforeEffectOrDataReference),
      );
      if (
        localEffectOrDataRefCheck != null &&
        localEffectOrDataRefCheck[1] == null
      ) {
        newExpressionArray[m] = newExpressionArray[m].replace(
          new RegExp(eu_globals.checkForPeriodBeforeEffectOrDataReference),
          "thisComp.layer(" +
            myLayer.index +
            ")." +
            localEffectOrDataRefCheck[0],
        );
      }
      var theExpressionLocalRefMatch = newExpressionArray[m].match(
        new RegExp(
          "(\\=\\s*|thisLayer.)(" +
            eu_globals.effectRegexString.replace(/2/, "4") +
            ")",
        ),
      );
      if (theExpressionLocalRefMatch && theExpressionLocalRefMatch[2] != null) {
        newExpressionArray[m] = eu_globals_fixLocalEffectReferences(
          myLayer,
          newExpressionArray[m],
          theExpressionLocalRefMatch,
        );
      }
      newExpression = newExpression.replace(
        expressionLineArray[m],
        newExpressionArray[m],
      );
    }
    try {
      myText.text.sourceText.expression =
        newExpression + "\n\r" + variableName + ";";
      actualName = myText.text.sourceText.value.text;
    } catch (e) {
      eu_globals.errorCounter++;
      if (eu_globals.generateLog) {
        eu_globals.logFile.writeln(
          "<--------------------------------ERROR-------------------------------->",
        );
        eu_globals.logFile.writeln(
          "<-------------------Could not create Text Layer To Get Variable Name-------------------------------->",
        );
        eu_globals.logFile.writeln("Comp: " + myComp.name);
        eu_globals.logFile.writeln("Layer: " + myLayer.name);
        u_globals.logFile.writeln("Variable: " + variableName);
        eu_globals.logFile.writeln(e.toString());
        eu_globals.logFile.writeln();
      }
    }
    myText.remove();
    return actualName;
  }
  function eu_globals_getPropertyChain(myProperty) {
    var propertyObject = new Object();
    propertyObject.property = myProperty;
    propertyObject.expressionChain = "";
    var propertyChain = [myProperty.name];
    while (myProperty.propertyDepth > 1) {
      propertyChain.unshift(myProperty.parentProperty.name);
      myProperty = myProperty.parentProperty;
    }
    propertyObject.propertyChain = propertyChain;
    propertyObject.expressionChain = '("' + propertyChain.join('")("') + '")';
    return propertyObject;
  }
  function eu_globals_fixLocalEffectReferences(
    myLayer,
    theExpression,
    theExpressionLocalRefMatch,
    myProperty,
  ) {
    var theExpressionLocalRefMatchBeginVariable = new RegExp(
      "([^\\.])" + eu_globals.effectRegexString.replace(/2/, "4") + "",
    ).exec(theExpression);
    if (
      theExpressionLocalRefMatchBeginVariable != null &&
      theExpressionLocalRefMatchBeginVariable.index != null &&
      theExpressionLocalRefMatchBeginVariable[1] != null
    ) {
      var insertIndex =
        theExpressionLocalRefMatchBeginVariable.index +
        theExpressionLocalRefMatchBeginVariable[1].length;
      theExpression =
        theExpression.substr(0, insertIndex) +
        "thisComp.layer(" +
        myLayer.index +
        ")." +
        theExpression.substr(insertIndex);
    }
    var theExpressionLocalRefMatchBegin = theExpression.match(
      new RegExp("(^" + eu_globals.effectRegexString.replace(/2/, "3") + ")"),
    );
    if (theExpressionLocalRefMatchBegin != null) {
      theExpression = theExpression.replace(
        new RegExp(
          theExpressionLocalRefMatchBegin[0].replace(
            /[-[\]{}()*+?.,\\^$|#\s]/g,
            "\\$&",
          ),
          "g",
        ),
        " thisComp.layer(" +
          myLayer.index +
          ")." +
          theExpressionLocalRefMatch[2],
      );
    }
    var theExpressionLocalRefMatchThisLayer = theExpression.match(
      new RegExp(
        "(thisLayer." + eu_globals.effectRegexString.replace(/2/, "3") + ")",
      ),
    );
    if (theExpressionLocalRefMatchThisLayer != null) {
      theExpression = theExpression.replace(
        new RegExp(
          theExpressionLocalRefMatchThisLayer[0].replace(
            /[-[\]{}()*+?.,\\^$|#\s]/g,
            "\\$&",
          ),
          "g",
        ),
        "= thisComp.layer(" +
          myLayer.index +
          ")." +
          theExpressionLocalRefMatch[2],
      );
    }
    return theExpression;
  }
  function eu_globals_findMatchName(
    myComp,
    myLayer,
    compName,
    layerName,
    effectName,
    effectPropertyName,
    effectIsIndex,
    effectPropertyIsIndex,
    secondaryEffectName,
    secondaryEffectPropName,
    secondaryEffectIsIndex,
    secondaryPropertyIsIndex,
    layerNameIsIndex,
    isEffect,
  ) {
    function getDataMatchName(
      myLayer,
      effectName,
      effectPropertyName,
      isIndex,
    ) {
      var effectMatchName = null;
      var theEffect = null;
      try {
        effectMatchName =
          isIndex || effectName == "Outline"
            ? effectName
            : myLayer(eu_globals.dataMatchName)(effectName).matchName;
        theEffect = myLayer.eu_globals.dataMatchName;
      } catch (e) {
        if (eu_globals.generateLog) {
          eu_globals.logFile.writeln();
          eu_globals.logFile.writeln(
            "Layer: " + (myLayer.index - 1) + "." + myLayer.name,
          );
          eu_globals.logFile.writeln("Property: " + effectName);
          eu_globals.logFile.writeln("Could not be universalized");
          eu_globals.logFile.writeln("Error: " + e.toString());
        }
      }
      return [effectMatchName, effectPropertyName, theEffect];
    }
    function getEffectMatchName(
      myLayer,
      effectName,
      effectPropertyName,
      isIndex,
      propIsIndex,
    ) {
      if (lengthInUtf8Bytes(effectName) > 38) {
        var errStr =
          "After Effects Error: Effect names cannot be more than 39 characters long\n\nEffect Name:\n" +
          effectName +
          "\nLayer Name:\n" +
          (myLayer.index - 1) +
          ". " +
          myLayer.name +
          "\nComp Name:\n" +
          myLayer.containingComp.name +
          "\nLength: " +
          effectName.length +
          " chrs long.\n\nIt will be skipped, please rename it shorter.";
        if (!eu_globals.suppressAlertsUI) {
          eu_globals_alertUI(errStr);
        }
        eu_globals.errorCounter++;
        if (eu_globals.generateLog) {
          eu_globals.logFile.writeln(
            "<--------------------------------ERROR-------------------------------->",
          );
          eu_globals.logFile.writeln();
          eu_globals.logFile.writeln(errStr.replace(/\\n/g, "\n\r"));
        }
        return [null, null, null];
      }
      if (typeof effectName === "string") {
        effectName.replace(/\(/g, "\\(").replace(/\)/g, "\\)");
      }
      if (isIndex) {
        effectName = parseInt(effectName, 10);
      }
      if (propIsIndex) {
        effectPropertyName = parseInt(effectPropertyName, 10);
      }
      theEffect =
        myLayer instanceof AVLayer ? myLayer.effect(effectName) : null;
      if (theEffect == null) {
        effectName = checkForRenamedEffectName(myLayer, effectName);
        theEffect = myLayer.effect(effectName);
      }
      effectMatchName = effectName;
      propertyMatchName = effectPropertyName;
      if (theEffect != undefined && theEffect != null) {
        if (
          eu_globals.dummyNull
            .property("ADBE Effect Parade")
            .canAddProperty(theEffect.matchName)
        ) {
          var defaultLocalizedEffect = eu_globals.dummyNull
            .property("ADBE Effect Parade")
            .addProperty(theEffect.matchName);
          if (theEffect.name == defaultLocalizedEffect.name) {
            var saveName = theEffect.name;
            theEffect.name = checkForDuplicateEffectNames(
              theEffect,
              theEffect.name,
              1,
            );
            if (saveName != theEffect.name) {
              var nextItem = eu_globals.renamedEffects.length;
              eu_globals.renamedEffects[nextItem] = new Object();
              eu_globals.renamedEffects[nextItem].compId = myComp.id;
              eu_globals.renamedEffects[nextItem].layerIndex = myLayer.index;
              eu_globals.renamedEffects[nextItem].propertyIndex =
                theEffect.propertyIndex;
              eu_globals.renamedEffects[nextItem].propertyType =
                theEffect.propertyType;
              eu_globals.renamedEffects[nextItem].oldName = saveName;
              eu_globals.renamedEffects[nextItem].newName = theEffect.name;
            }
            effectMatchName = theEffect.name;
            app.project.autoFixExpressions(saveName, effectMatchName);
            if (eu_globals.generateLog) {
              eu_globals.logFile.writeln();
              eu_globals.logFile.writeln(
                "Layer: " + (myLayer.index - 1) + "." + myLayer.name,
              );
              eu_globals.logFile.writeln("Property: " + saveName);
              eu_globals.logFile.writeln(
                "EFFECT RENAMED to " +
                  theEffect.name +
                  " to become universalized",
              );
            }
          } else {
            effectMatchName = theEffect.name;
            if (effectPropertyName.toString().match(/^[0-9]+$/)) {
              propertyMatchName = effectPropertyName;
            } else {
              propertyMatchName = theEffect.matchName;
            }
          }
          defaultLocalizedEffect.remove();
        } else {
          effectMatchName = theEffect.name;
        }
        if (theEffect.property(effectPropertyName) != null) {
          propertyMatchName = theEffect.property(effectPropertyName).matchName;
        }
        propertyMatchName = propertyMatchName
          .replace(/^APC Colorama-0017$/, "APC Colorama-0012")
          .replace(/^APC Colorama-0029$/, "APC Colorama-0016");
        if (isIndex) {
          effectMatchName = effectName;
        }
        if (propIsIndex) {
          propertyMatchName = effectPropertyName;
        }
        return [effectMatchName, propertyMatchName, theEffect];
      } else {
        return [null, null, null];
      }
    }
    var proj = app.project;
    if (effectIsIndex) {
      effectName = parseInt(effectName, 10);
    }
    if (effectPropertyIsIndex) {
      effectPropertyName = parseInt(effectPropertyName, 10);
    }
    if (secondaryEffectIsIndex) {
      secondaryEffectName = parseInt(secondaryEffectName, 10);
    }
    if (secondaryPropertyIsIndex) {
      secondaryEffectPropName = parseInt(secondaryEffectPropName, 10);
    }
    if (myComp == null) {
      for (var i = 1; i <= proj.numItems; i += 1) {
        var curItem = proj.item(i);
        if (curItem instanceof CompItem && curItem.name == compName) {
          myComp = curItem;
          break;
        }
      }
    }
    if (myComp != null && myLayer == null) {
      for (var h = 1; h <= myComp.numLayers; h += 1) {
        var curLayer = myComp.layer(h);
        if (
          (!layerNameIsIndex && curLayer.name == layerName) ||
          (layerNameIsIndex && curLayer.index - 1 == layerName)
        ) {
          myLayer = curLayer;
          break;
        }
      }
    }
    var gotMatchNames = [null, null];
    var gotSecondaryMatchNames = [null, null];
    if (myLayer != null) {
      gotMatchNames = isEffect
        ? getEffectMatchName(
            myLayer,
            effectName,
            effectPropertyName,
            effectIsIndex,
            effectPropertyIsIndex,
          )
        : getDataMatchName(
            myLayer,
            effectName,
            effectPropertyName,
            effectIsIndex,
          );
      theEffect = gotMatchNames[2];
      gotMatchNames.pop();
      if (isEffect) {
        if (
          secondaryEffectPropName != undefined &&
          secondaryEffectPropName != null
        ) {
          if (
            theEffect != null &&
            theEffect.property(effectPropertyName).matchName ==
              "ADBE Layer Control-0001"
          ) {
            var secondaryLayerIndex =
              theEffect.property(effectPropertyName).value;
            if (secondaryLayerIndex != null) {
              var tempSecondaryLayer = findContainingLayer(theEffect);
              if (
                tempSecondaryLayer != undefined &&
                tempSecondaryLayer != null
              ) {
                var secondaryLayer =
                  tempSecondaryLayer.containingComp.layer(secondaryLayerIndex);
                gotSecondaryMatchNames = getEffectMatchName(
                  secondaryLayer,
                  secondaryEffectName,
                  secondaryEffectPropName,
                  secondaryEffectIsIndex,
                  secondaryPropertyIsIndex,
                );
                theEffect = gotSecondaryMatchNames[2];
                gotSecondaryMatchNames.pop();
              }
            }
          }
        } else {
          if (
            secondaryEffectPropName != undefined &&
            theEffect.property(effectPropertyName) != null &&
            theEffect.property(effectPropertyName)(secondaryEffectPropName) !=
              null
          ) {
            gotSecondaryMatchNames = [
              theEffect.property(effectPropertyName).matchName,
              theEffect.property(effectPropertyName)(secondaryEffectPropName)
                .matchName,
            ];
          }
        }
      }
      return gotMatchNames.concat(gotSecondaryMatchNames);
    } else {
      return [null, null, null, null];
    }
  }
  function findContainingLayer(prop) {
    while (prop.propertyDepth > 1) {
      prop = prop.parentProperty;
    }
    return prop.parentProperty;
  }
  function checkForRenamedEffectName(theLayer, effectName) {
    for (var i = eu_globals.renamedEffects.length - 1; i >= 0; i--) {
      if (
        eu_globals.renamedEffects[i].compId == theLayer.containingComp.id &&
        eu_globals.renamedEffects[i].layerIndex == theLayer.index &&
        eu_globals.renamedEffects[i].oldName == effectName
      ) {
        var newName = eu_globals.renamedEffects[i].newName;
        var newEffect = theLayer.effect(newName);
        if (
          eu_globals.renamedEffects[i].propertyIndex ==
            newEffect.propertyIndex &&
          eu_globals.renamedEffects[i].propertyType == newEffect.propertyType
        ) {
          return newName;
        }
      }
    }
    return effectName;
  }
  function lengthInUtf8Bytes(str) {
    var m = encodeURIComponent(str).match(/%[89ABab]/g);
    return str.length + m ? m.length : 0;
  }
  function checkForDuplicateEffectNames(theEffect, name, num) {
    for (var i = 1; i <= theEffect.parentProperty.numProperties; i += 1) {
      if (
        theEffect.name + " " + num.toString() ==
        theEffect.parentProperty.property(i).name
      ) {
        checkForDuplicateEffectNames(theEffect, name, (0 + num++).toString());
      }
    }
    return theEffect.name + " " + num.toString();
  }
  function getLanguageId(theElement, theArray) {
    var arrayPosition = null;
    for (var i = 0; i < theArray.length; i += 1) {
      if (theElement == theArray[i]) {
        arrayPosition = i;
        break;
      }
    }
    return arrayPosition;
  }
  function eu_globals_findEffectName(controlName, theLanguage, theArray) {
    var effectName = null;
    for (var i = 0; i < theArray.length; i += 1) {
      if (controlName == theArray[i][1][theLanguage]) {
        effectName = theArray[i][0][theLanguage];
        break;
      }
    }
    return effectName;
  }
  function eu_globals_confirmUI(msg) {
    var dlg = new Window(
      "dialog",
      eu_globals.scriptName + " v" + eu_globals.scriptVersion + " Alert",
      undefined,
      { resizeable: false },
    );
    var res =
      "group { \n                orientation:\'column\', alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n                     txt: StaticText {alignment:[\'left\',\'top\'], preferredSize:[500,200], properties:{multiline:true}}, \n                     suppress:Checkbox{text:\'Suppress any further alerts and perform same action\'}, \n                     cancel: Button{text:\'No\', preferredSize:[50,30]},\n                     ok:Button{text:\'Yes\', preferredSize:[50,30]},\n                };";
    dlg.grp = dlg.add(res);
    dlg.grp.txt.text = msg;
    dlg.grp.suppress.onClick = function () {
      eu_globals.suppressAlertsUI = this.value;
    };
    dlg.grp.ok.onClick = function () {
      eu_globals.deleteComment = true;
      dlg.close();
    };
    dlg.grp.cancel.onClick = function () {
      eu_globals.deleteComment = false;
      dlg.close();
    };
    dlg.center();
    dlg.show();
  }
  function eu_globals_alertUI(msg) {
    var dlg = new Window(
      "dialog",
      eu_globals.scriptName + " v" + eu_globals.scriptVersion + " Alert",
      undefined,
      { resizeable: false },
    );
    var res =
      "group { \n                orientation:\'column\', alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n                     txt: StaticText {alignment:[\'left\',\'top\'], preferredSize:[450,200], properties:{multiline:true}}, \n                     suppress:Checkbox{text:\'Suppress any further alerts\'}, \n                     abort:Button{text:\'Stop Processing\', preferredSize:[50,30]},\n                     ok:Button{text:\'Continue Processing\', preferredSize:[50,30]},\n                };";
    dlg.grp = dlg.add(res);
    dlg.grp.txt.text = msg;
    dlg.grp.abort.onClick = function () {
      eu_globals.stopSearch = true;
      dlg.close();
    };
    dlg.grp.suppress.onClick = function () {
      eu_globals.suppressAlertsUI = this.value;
    };
    dlg.grp.ok.onClick = function () {
      dlg.close();
    };
    dlg.center();
    dlg.show();
  }
  function eu_globals_progressUI(projNumItems) {
    var dlg = new Window(
      "palette",
      eu_globals.scriptName +
        " v" +
        eu_globals.scriptVersion +
        " Processing...",
      undefined,
      { resizeable: false },
    );
    var res =
      "group { \n\t\torientation:\'column\', alignment:[\'left\',\'top\'], alignChildren:[\'fill\',\'fill\'], \n\t\titemName: Group { \n                orientation:\'column\', margins:0, spacing:0, \n                txt: StaticText {preferredSize: [600,20], alignment:[\'left\',\'top\'] }, \n         itemProgress: Group { \n\t\t\t\talignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'top\'], \n\t\t\t\tval: Progressbar {  }, \n            }, \n           } \n\t\tlayerName: Group { \n                orientation:\'column\', margins:0, spacing:0, \n                txt: StaticText {preferredSize: [600,20], alignment:[\'left\',\'top\'] }, \n           layerProgress: Group { \n\t\t\t\talignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'top\'], \n\t\t\t\tval: Progressbar {  }, \n            }, \n              } \n            propName: Group { \n                orientation:\'column\', margins:0, spacing:0, \n                txt: StaticText {preferredSize: [600,20], alignment:[\'left\',\'top\'] }, \n              } \n           replaceStatus: Group { \n                txt: StaticText {preferredSize: [600,100], alignment:[\'left\',\'top\'], properties:{multiline:true} }, \n            } \n        };";
    dlg.grp = dlg.add(res);
    dlg.grp.itemName.itemProgress.val.maxvalue = projNumItems;
    dlg.grp.layerName.layerProgress.val.maxvalue = 100;
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
    propAmount,
    propName,
    maxProps,
  ) {
    if (eu_globals.replacedItemsArray.length > 0) {
      dlgObj.grp.replaceStatus.txt.text =
        eu_globals.replacedItemsArray[eu_globals.replacedItemsArray.length - 1];
    }
    dlgObj.grp.layerName.layerProgress.val.maxvalue = maxLayers;
    dlgObj.grp.itemName.itemProgress.val.value = itemAmount;
    dlgObj.grp.itemName.txt.text =
      "Processing comp " + itemAmount + " out of " + maxItems + ": " + itemName;
    writeLn("Layer: " + layerAmount + ". " + layerName);
    writeLn("Processing...");
    dlgObj.grp.layerName.layerProgress.val.value = layerAmount;
    dlgObj.grp.layerName.txt.text = "Layer: " + layerAmount + ". " + layerName;
    writeLn("Comp " + itemAmount + " out of " + maxItems + ": " + itemName);
    if (propAmount != undefined) {
      writeLn("Prop " + propName);
      dlgObj.grp.propName.txt.text = "Property: " + propName;
    }
    if (parseFloat(app.version) >= 9) {
      dlgObj.window.update();
    }
  }
  function eu_globals_localize(strVar, rplVar) {
    if (rplVar == undefined) {
      rplVar = "";
    }
    var localLang = parseFloat(app.version) < 9 ? $.locale : app.isoLanguage;
    if (
      typeof strVar[localLang.substring(0, localLang.indexOf("_"))] ==
      "undefined"
    ) {
      var langStr = strVar.en.replace("%1", rplVar);
      alert(
        'You language is not currently supported, you will need to make sure your expressions are written in compact english\n\nThe preference for this is under General:\n"Expression Pickwhip Writes Compact English"\n\nIf you would like your language supported please contact support@aescripts.com',
      );
    } else {
      var langStr = strVar[
        localLang.substring(0, localLang.indexOf("_"))
      ].replace("%1", rplVar);
    }
    return langStr;
  }
  function isSecurityPrefSet() {
    var securitySetting = app.preferences.getPrefAsLong(
      "Main Pref Section",
      "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
    );
    return securitySetting == 1;
  }
  function eu_globals_preFlight(palObj) {
    if (parseFloat(app.version) < 8) {
      alert("This script requires After Effects CS3 or above");
      return;
    }
    eu_globals.strAboutTrial =
      "The trial version is limited to universalizing 5 expressions. The full version has no limits.\n\n";
    eu_globals.strAboutReg = hs.getRegistration();
    eu_globals.vT = hs.t();
    eu_globals.strAbout =
      eu_globals.strAboutReg + "\n\n" + eu_globals.vT
        ? eu_globals.strAboutTrial
        : "" + eu_globals.strAbout2;
    if (
      la_expressionUniversalizer_service.runAsService &&
      la_expressionUniversalizer_service.argument != ""
    ) {
      var options = "project";
      var suffixText = "";
      var suffixOption = "suffix";
      var isRegex = false;
      eu_globals.suppressAlerts =
        eu_globals.suppressAlertsUI =
        eu_globals.addCompTag =
          true;
      var euServiceArgs = hs.JSONify(
        la_expressionUniversalizer_service.argument,
        "parse",
      );
      if (euServiceArgs instanceof Object) {
        if (euServiceArgs.hasOwnProperty("scan")) {
          if (
            euServiceArgs.scan.toLowerCase() == "project" ||
            euServiceArgs.scan.toLowerCase() == "comps" ||
            euServiceArgs.scan.toLowerCase() == "layer" ||
            euServiceArgs.scan.toLowerCase() == "layers" ||
            euServiceArgs.scan.toLowerCase() == "batch"
          ) {
            options = euServiceArgs.scan;
          }
        }
        if (euServiceArgs.hasOwnProperty("batch")) {
          if (euServiceArgs.batch.hasOwnProperty("rename_mode")) {
            if (
              euServiceArgs.batch.rename_mode == "suffix" ||
              euServiceArgs.batch.rename_mode == "prefix" ||
              euServiceArgs.batch.rename_mode == "replace"
            ) {
              suffixOption = euServiceArgs.batch.rename_mode;
            }
          }
          if (euServiceArgs.batch.hasOwnProperty("rename_text")) {
            suffixText = euServiceArgs.batch.rename_text;
          }
          if (euServiceArgs.batch.hasOwnProperty("project_match")) {
            projNameMatch = euServiceArgs.batch.project_match;
            isRegex = projNameMatch.match(/^\/.+\/(g|i|gi)$/);
          }
        }
        if (euServiceArgs.hasOwnProperty("suppress")) {
          if (typeof euServiceArgs.suppress == "boolean") {
            eu_globals.suppressAlerts = eu_globals.suppressAlertsUI =
              euServiceArgs.suppress;
          }
        }
        if (euServiceArgs.hasOwnProperty("add_tag")) {
          if (typeof euServiceArgs.add_tag == "boolean") {
            eu_globals.addCompTag = euServiceArgs.add_tag;
          }
        }
        if (euServiceArgs.hasOwnProperty("remove_disabled_expressions")) {
          if (typeof euServiceArgs.remove_disabled_expressions == "boolean") {
            eu_globals.removeDisabledExpressions =
              euServiceArgs.remove_disabled_expressions;
          }
        }
        if (euServiceArgs.hasOwnProperty("logfile")) {
          if (Folder(euServiceArgs.logfile).parent.exists) {
            eu_globals.generateLog = true;
            eu_globals.log = File(euServiceArgs.logfile);
          }
        }
        doExpressionUniversalizer(
          projNameMatch,
          isRegex,
          suffixOption,
          suffixText,
          options,
        );
      }
    } else {
      var myPalette = eu_globals_buildUI1(palObj);
      if (myPalette != null && myPalette instanceof Window) {
        myPalette.show();
      }
    }
  }
  var eu_globals = new Object();
  eu_globals.scriptName = "ExpressionUniversalizer";
  eu_globals.scriptVersion = "4.0.5";
  eu_globals.betaMode = false;
  eu_globals.betaStart = new Date("May 4, 2020");
  eu_globals.betaExpiration = new Date("June 30, 2020");
  eu_globals.strErrScriptAccess =
    'This feature requires the scripting security preference to be set.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.';
  eu_globals.errDiskPermission =
    "Error creating %1\nPlease check the permissions for this folder:\n%2\n\nA temp folder will be used instead";
  eu_globals.errMissingFile =
    "Necessary file:\n%1\n\nis missing from:\n%2\n\nplease contact support and send a screenshot of this error\n\n%3";
  eu_globals.strAboutTitle = "About " + eu_globals.scriptName;
  eu_globals.strAbout2 =
    'Will convert the expressions in your projects so that they are compatible with After Effects running in any language.\n\n**IMPORTANT** You need to run the Universalizer in the same language as the expressions are written. If your expressions are written in German then you need to have After Effects running in German when you run the Universalizer.\n\nOnce the project has been "universalized" it will be able to be opened in any language.\nIt\'s very easy to use, simply choose whether you want to process the current comp or all the comps in your project and click on the Universalize Expressions button. That\'s it.\nThere is an option to create a log file in case you want a detailed record of what is being converted or if you run into any trouble. (recommended)\nYou can choose to delete expressions that are disabled\nYou also have the option to add a "Universalized" tag in the comp comment field in the project panel.\nTo batch process a folder of AE projects, choose the option for the pulldown and optionally in the Batch options you can add a string to search for. This will only process projects that match this string.\nYou can then have the new project name have this string replaced or add a suffix or prefix. If you leave the Proj Name Match field blank it will process all the projects in the folder.\n\nA common support issue for templates is from customers that don\'t run AE in the same language that the project was authored in.\nIf you are a template author and are submitting your template to a marketplace then this allows the reviewers to quickly check and see that your expressions have been universalized and will make your template more attractive since it will require less customer support from them.\n\nExpressionUniversalizer can be launched as a service from KBar (https://aescripts.com/kbar) by using this JSON syntax in the Argument field (please make sure you validate your JSON string):\n\nKBar argument example:\n         {"scan":"layers", "suppress": true, "add_tag": true, "remove_disabled_expressions": true, "logfile": "~/Desktop/EU_log.txt"}\n\n         "scan" options: "project", "comp", "layers" or "batch"\n         "batch" options: \n         "project_match" - the text that will be matched in the project name when running a batch\n         "rename_mode" - which can be "suffix", "prefix" or "replace"\n         "rename_text" - the text that will be added to the project name using the "rename_mode"\n';
  var af_settings = {
    betaExpirationDate: eu_globals.betaExpiration,
    betaStartDate: eu_globals.betaStart,
    betaSupportEmail: "http://aescripts.com/contact",
    helpText: eu_globals.strAbout2,
    offerBeta: eu_globals.betaMode,
    offerTrial: true,
    privateNumber: 5741847484277282,
    productSKU: "LAEU4-SUL",
    scriptAuthor: "Lloyd Alvarez",
    scriptName: eu_globals.scriptName,
    scriptURL: "https://aescripts.com/expressionuniversalizer/",
    scriptVersion: eu_globals.scriptVersion,
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
    var mx = __BLOB__BLOB_000164__;
    var wx = __BLOB__BLOB_000165__;
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
  var hs = new a(af_settings);
  eu_globals.effectsLocalizedName = {
    de: "Effekten",
    en: "Effects",
    es: "Efectos",
    fr: "Effets",
    it: "Effetti",
    ja: "\u30a8\u30d5\u30a7\u30af\u30c8",
    kr: "\ud6a8\uacfc",
    pt: "Efeitos",
    ru: "\u042d\u0444\u0444\u0435\u043a\u0442\u044b",
    zh: "\u6548\u679c",
  };
  eu_globals.dataMatchName = "ADBE Data Group";
  eu_globals.dataLocalizedName = {
    de: "Daten",
    en: "Data",
    es: "Datos",
    fr: "Donn\xe9es",
    it: "Dati",
    ja: "\u30c7\u30fc\u30bf",
    kr: "=\ub370\uc774\ud130",
    pt: "Dados",
    ru: "\u0414\u0430\u043d\u043d\u044b\u0435",
    zh: "\u6570\u636e",
  };
  eu_globals.hotWordsLanguages = [
    "en",
    "fr",
    "de",
    "it",
    "es",
    "ja",
    "kr",
    "pt",
    "ru",
    "zh",
  ];
  eu_globals.hotWords = [
    [
      [
        "Angle Control",
        "Param\xe8tre angle",
        "Einstellungen f\xfcr Winkel",
        "Controllo angolo",
        "Control de \xe1ngulo",
        "\u89d2\u5ea6\u5236\u5fa1",
        "\uac01\ub3c4 \ucee8\ud2b8\ub864",
        "Controle de \xe2ngulo",
        "\u042d\u043b\u0435\u043c\u0435\u043d\u0442 \u0443\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u044f \u0443\u0433\u043b\u0430",
        "\u89d2\u5ea6\u63a7\u5236",
      ],
      [
        "Angle",
        "Angle",
        "Winkel",
        "Angolo",
        "\xc1ngulo",
        "\u89d2\u5ea6",
        "\uac01\ub3c4",
        "\xc2ngulo",
        "\u0423\u0433\u043e\u043b",
        "\u89d2\u5ea6",
      ],
    ],
    [
      [
        "Checkbox Control",
        "Param\xe8tre case",
        "Einstellungen f\xfcr Kontrollk\xe4st.",
        "Controllo caselle",
        "Control de la casilla de verifi",
        "\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9\u5236\u5fa1",
      ],
      [
        "Checkbox",
        "Case",
        "Kontrollk\xe4stchen",
        "Casella",
        "Casilla de verificaci\xf3n",
        "\u30c1\u30a7\u30c3\u30af\u30dc\u30c3\u30af\u30b9",
      ],
    ],
    [
      [
        "Color Control",
        "Param\xe8tre couleurs",
        "Einstellungen f\xfcr Farben",
        "Controllo colore",
        "Control de color",
        "\u30ab\u30e9\u30fc\u5236\u5fa1",
      ],
      ["Color", "Couleur", "Farbe", "Colore", "Color", "\u30ab\u30e9\u30fc"],
    ],
    [
      [
        "Layer Control",
        "Param\xe8tre calque",
        "Einstellungen f\xfcr Ebenen",
        "Controllo livello",
        "Control de capa",
        "\u30ec\u30a4\u30e4\u30fc\u5236\u5fa1",
      ],
      [
        "Layer",
        "Calque",
        "Ebene",
        "Livello",
        "Capa",
        "\u30ec\u30a4\u30e4\u30fc",
      ],
    ],
    [
      [
        "Point Control",
        "Param\xe8tre point d\'effet",
        "Einstellungen f\xfcr Punkte",
        "Controllo punto",
        "Control de punto",
        "\u30dd\u30a4\u30f3\u30c8\u5236\u5fa1",
      ],
      [
        "Point",
        "Ponctuelle",
        "Punkt",
        "Punto",
        "Punto",
        "\u30dd\u30a4\u30f3\u30c8",
      ],
    ],
    [
      [
        "Slider Control",
        "Param\xe8tre glissi\xe8re",
        "Einstellungen f\xfcr Schieberegler",
        "Controllo cursore",
        "Control del indicador",
        "\u30b9\u30e9\u30a4\u30c0\u30fc\u5236\u5fa1",
      ],
      [
        "Slider",
        "Curseur",
        "Schieberegler",
        "Cursore",
        "Deslizador",
        "\u30b9\u30e9\u30a4\u30c0",
      ],
    ],
  ];
  eu_globals.localLang =
    parseFloat(app.version) < 9 ? $.locale : app.isoLanguage;
  eu_globals.effectHeader =
    "\\((\"|\')" +
    eu_globals_localize(eu_globals.effectsLocalizedName) +
    "(\\2)\\)|effect";
  eu_globals.effectRegexString =
    "(" +
    eu_globals.effectHeader +
    ')\\(.*(?=\\))\\)(\\.param)?\\(.*(?=\\))(?:\\))(?=(?:[^"\']|["|\'][^"\']*")*$)(\\(.*)?';
  eu_globals.effectRegexStringLazy =
    "(" +
    eu_globals.effectHeader +
    ")\\((.*?)(?=\\))\\)(\\.param)?\\((.*?)(?=\\))\\)(\\(.*)?";
  eu_globals.effectRegexEffectCaptureGroupsString =
    "(" +
    eu_globals.effectHeader +
    ")\\((.*)?(?=\\))\\)(\\.param)?\\((.*)?(?=\\))\\)";
  eu_globals.effectRegex = new RegExp(
    eu_globals.effectRegexString +
      "(\\.?" +
      eu_globals.effectRegexString.replace(/2/, "6") +
      ")?",
    "g",
  );
  eu_globals.effectRegexEffectCaptureGroups = new RegExp(
    eu_globals.effectRegexEffectCaptureGroupsString +
      "(\\.?" +
      eu_globals.effectRegexEffectCaptureGroupsString.replace(/2/, "6") +
      ")?",
    "g",
  );
  eu_globals.dataHeader =
    "\\((\"|\')" +
    eu_globals_localize(eu_globals.dataLocalizedName) +
    "(\\2)\\)|data";
  eu_globals.dataRegexString = "(" + eu_globals.dataHeader + ")\\(.*(?=\\))\\)";
  eu_globals.dataRegex = new RegExp(eu_globals.dataRegexString, "g");
  eu_globals.fullLayerPathRegex = new RegExp(
    "(thisComp|this_comp|comp\\((\"|\')(.*?)(\\2)\\))\\.layer\\((\"|\')?(.*?)(\\5)?\\)(\\.)?",
    "g",
  );
  eu_globals.fullExpressionRegexString =
    "(((thisComp|this_comp|comp\\(.*(?=\\)\\.)\\))\\.layer\\(.*(?=\\)\\.?)\\)\\.?)?)" +
    eu_globals.effectRegex.source.replace(/2/, "5").replace(/6/, "11");
  eu_globals.fullDataExpressionRegexString =
    "(((thisComp|this_comp|comp\\(.*(?=\\)\\.)\\))\\.layer\\(.*(?=\\)\\.?)\\)\\.?)?)" +
    eu_globals.dataRegex.source.replace(/2/, "5").replace(/6/, "11");
  eu_globals.fullExpressionRegex = new RegExp(
    eu_globals.fullExpressionRegexString,
    "g",
  );
  eu_globals.fullDataExpressionRegex = new RegExp(
    eu_globals.fullDataExpressionRegexString,
    "g",
  );
  eu_globals.fullEffectPathRegex = new RegExp(
    '\\(("|\')?(.*?)(\\1)?\\)(\\.param)?\\(("|\')?(.*?)(\\5)?(?:\\))(?=(?:[^"\']|["|\'][^"\']*")*$)',
    "g",
  );
  eu_globals.fullDataPathRegex = new RegExp(
    "\\((\"|\')?(.*?)(\\1)?\\)(\\((\"|\')?(.*?)(\\5)?\\))?",
    "g",
  );
  eu_globals.matchTextBetweenQuotes = new RegExp(
    "([\"\'])(?:(?=(\\\\?))\\2.)*?\\1",
    "g",
  );
  eu_globals.extraSpacesRemoverRegex = new RegExp("( +(?=\"|\'|\\(|\\)))", "g");
  eu_globals.variableRegex = "(var\\s+)?%1\\s?=(\\s+)?(\'|\")(.*?)(\'|\")";
  eu_globals.isPseudoRegex = new RegExp("^Pseudo\\/");
  eu_globals.checkForPeriodBeforeEffectOrDataReference = "(\\.)?(effect|data)";
  eu_globals.lineSplitRegex =
    "(;|,|\\?|\\:|\\{|\\}|>|<|=|\\+|\\[|\\]|else|\\/|\\*|-)(?=(?:[^\\\"\']|[\\\"|\'][^\\\"\']*[\\\"|\'])*$)";
  eu_globals.dupEffectRegex = new RegExp("(.+) [0-9]+$");
  eu_globals.defaultLog =
    app.project.file != null
      ? File(
          app.project.file.parent.fsName +
            "/" +
            eu_globals.scriptName +
            "_log.txt",
        )
      : File(Folder.desktop.fsName + "/" + eu_globals.scriptName + "_log.txt");
  eu_globals.generateLog = false;
  eu_globals.addCompTag = false;
  eu_globals.showTimer = true;
  eu_globals.suppressAlerts = eu_globals.suppressAlertsUI = false;
  eu_globals.projNameMatchTxt = "Project Name Match";
  eu_globals.projNameMatchTxtHelp =
    "Will only update projects whose name match the string provided.  Leave blank to update all the projects in the selected folder. You can also use Regex by putting the search within forward slashes, for example: /^my project [0-9]*/i";
  eu_globals.suffixTxt = "New project name";
  eu_globals.suffixOpt = ["suffix", "prefix", "replace"];
  eu_globals.suffixTxtHelp =
    "Suffix will append this word after the project name before the extension, prefix will put it before the project name and replace will replace the match string above with this string in the project name. Leave blank to save over the same file.";
  eu_globals.suffixDefault = eu_globals.saveSuffix = "_updated";
  eu_globals.errFramework =
    "A necessary " + $.os.indexOf("Windows") == -1
      ? "framework"
      : "dll" +
        " was not able to be created, please make sure After Effects has enough permissions to access the user folder.\n%p\n\nIf the problem persists please contact support for help:  https://aescripts.com/contact";
  var regexDll = __BLOB__BLOB_000166__;
  var regexFramework = __BLOB__BLOB_000167__;
  eu_globals.binaryStrings = {
    RegexMacOsFramework: { bin: regexFramework, name: "regex.framework" },
    RegexWindowsDll: { bin: regexDll, name: "regex.dll" },
  };
  var isZipFile = $.os.indexOf("Windows") == -1;
  eu_globals.userDataFolder = getUserDataFolder();
  var regexFramework =
    $.os.indexOf("Windows") == -1
      ? createResourceFile(
          eu_globals.binaryStrings.RegexMacOsFramework.name,
          eu_globals.binaryStrings.RegexMacOsFramework.bin,
          isZipFile,
          eu_globals.userDataFolder,
        )
      : createResourceFile(
          eu_globals.binaryStrings.RegexWindowsDll.name,
          eu_globals.binaryStrings.RegexWindowsDll.bin,
          isZipFile,
          eu_globals.userDataFolder,
        );
  if (regexFramework == null || !regexFramework.exists) {
    alert(eu_globals.errFramework.replace(/%p/, eu_globals.userDataFolder));
    return;
  }
  var regexLib = new ExternalObject("lib:" + regexFramework.fsName);
  if (hs.c()) {
    eu_globals_preFlight(thisObj);
  }
}
var la_expressionUniversalizer_service = { runAsService: false };
var isKBarRunning = typeof kbar !== "undefined";
if (isKBarRunning && kbar.button && kbar.button.argument) {
  la_expressionUniversalizer_service.runAsService = true;
  la_expressionUniversalizer_service.argument = kbar.button.argument;
  delete kbar.button;
}
la_expressionUniversalizer(this);
