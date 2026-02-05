/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function (thisObj) {
  function showWindow(myWindow) {
    if (myWindow instanceof Window) {
      myWindow.center();
      myWindow.show();
    }
    if (myWindow instanceof Panel) {
      myWindow.layout.layout(true);
      myWindow.layout.resize();
    }
  }
  function initSettings() {
    var i = 0;
    if (settingValues[i] != null) {
      loopKeyframes.text = settingValues[i];
    } else {
      loopKeyframes.text = settingDefaults[i];
    }
    i = 1;
    if (settingValues[i] != null && settingValues[i] === "false") {
      limitModifier.value = false;
    } else {
      limitModifier.value = true;
    }
    i = 2;
    if (settingValues[i] == null) {
      argLoopDirection = settingDefaults[i];
    } else {
      argLoopDirection = settingValues[i];
    }
    if (argLoopDirection == 1) {
      loopDirection.text = "In";
    }
    if (argLoopDirection == 2) {
      loopDirection.text = "Out";
    }
    if (argLoopDirection == 3) {
      loopDirection.text = "In+Out";
    }
    i = 3;
    if (settingValues[i] != null && settingValues[i] === "true") {
      keepExpression.value = true;
    } else {
      keepExpression.value = false;
    }
  }
  function loopyShowPanel() {
    if (l8.s() === false) {
      isTrial = true;
    }
    showWindow(loopyWindow);
    var windowLocation = settingValues[4];
    var windowSize = settingValues[5];
    if (windowLocation != null) {
      loopyWindow.location = windowLocation;
    }
    if (windowSize != null) {
      loopyWindow.size = windowSize;
    }
    loopyWindow.onClose = function () {
      app.settings.saveSetting(
        settingSection,
        "windowlocation",
        loopyWindow.location,
      );
      app.settings.saveSetting(settingSection, "windowsize", loopyWindow.size);
    };
  }
  function loopyRun(kbarArg1, kbarArg2) {
    if (l8.s() === false) {
      isTrial = true;
    }
    var modRef = {};
    modRef.start = loopKeyframes.text;
    loopCycle.onClick = function () {
      loopySetLoop("cycle", argLoopDirection);
    };
    loopPingPong.onClick = function () {
      loopySetLoop("pingpong", argLoopDirection);
    };
    loopOffset.onClick = function () {
      loopySetLoop("offset", argLoopDirection);
    };
    loopContinue.onClick = function () {
      loopySetLoop("continue", argLoopDirection);
    };
    loopDirection.onClick = function () {
      changeLoopDirection();
    };
    loopOptions.onClick = function () {
      settingsWindow.hide();
      settingsWindow.show();
      var settingsLocation = app.settings.getSetting(
        settingSection,
        "settingslocation",
      );
      if (settingsLocation != null) {
        settingsWindow.location = settingsLocation;
      }
    };
    settingsClose.onClick = function () {
      var settingsLocation = settingsWindow.location;
      app.settings.saveSetting(
        settingSection,
        "settingslocation",
        settingsLocation,
      );
      settingsWindow.hide();
    };
    loopyLogo.addEventListener("mousedown", function () {
      openURL("https://aescripts.com/loopy");
    });
    creditLine3.addEventListener("mousedown", function () {
      openURL("https://automotion.studio");
    });
    visitGetSupport.onClick = function () {
      l8.openSupportTicket();
    };
    settingsUpdateCheckNow.onClick = function () {
      l8.doUpdateCheckNow();
    };
    settingsUpdateCheckbox.onClick = function () {
      l8.doUpdateCheck();
    };
    if (l8.t() == true) {
      settingsDeactivate.enabled = false;
    }
    settingsDeactivate.onClick = function () {
      if (l8.r()) {
        registration.text = l8.getRegistration();
        this.visible = false;
      }
    };
    settingsReset.onClick = function () {
      loopKeyframes.text = settingDefaults[0];
      limitModifier.value = settingDefaults[1];
      argLoopDirection = settingDefaults[2];
      loopDirection.text = "Out";
      keepExpression.value = settingDefaults[3];
      automotionLoopy.updateUILayout(buttons2);
      app.settings.saveSetting(settingSection, "keyframes", loopKeyframes.text);
      app.settings.saveSetting(
        settingSection,
        "limitmodifier",
        limitModifier.value,
      );
      app.settings.saveSetting(settingSection, "direction", argLoopDirection);
      app.settings.saveSetting(
        settingSection,
        "expression",
        keepExpression.value,
      );
    };
    loopKeyframes.onChange = function () {
      var ref = null;
      if (modRef.updated != "undefined") {
        ref = modRef.updated;
      } else {
        ref = modRef.start;
      }
      var t = fieldValidation(loopKeyframes.text, ref);
      loopKeyframes.text = t;
      modRef.updated = t;
      app.settings.saveSetting(settingSection, "keyframes", loopKeyframes.text);
    };
    limitModifier.onClick = function () {
      app.settings.saveSetting(
        settingSection,
        "limitmodifier",
        limitModifier.value.toString(),
      );
    };
    keepExpression.onClick = function () {
      app.settings.saveSetting(
        settingSection,
        "expression",
        keepExpression.value.toString(),
      );
    };
  }
  function changeLoopDirection(showAlert) {
    if (argLoopDirection == 3) {
      argLoopDirection = 1;
    } else {
      argLoopDirection++;
    }
    if (argLoopDirection == 1) {
      loopDirection.text = "In";
    }
    if (argLoopDirection == 2) {
      loopDirection.text = "Out";
    }
    if (argLoopDirection == 3) {
      loopDirection.text = "In+Out";
    }
    if (showAlert == true) {
      alert("Loop direction: " + loopDirection.text, alertTitle);
    }
    automotionLoopy.updateUILayout(buttons2);
    app.settings.saveSetting(settingSection, "direction", argLoopDirection);
  }
  function loopySetLoop(loopType, loopDir) {
    app.beginUndoGroup("setLoop");
    var comp = app.project.activeItem;
    var fps = comp.frameRate;
    var layers = comp.selectedLayers;
    var loopAlert = {};
    var layersLength = layers.length;
    if (isTrial == true) {
      var numTrialLayers = 3;
      layersLength = Math.min(layers.length, numTrialLayers);
      if (layers.length > numTrialLayers) {
        loopAlert.trial =
          "Trial mode: Loops can only be applied to a maximum of " +
          numTrialLayers +
          " layers at a time.";
      }
    }
    if (layersLength > 0) {
      var unRemappable = false;
      var selectedPathProp = false;
      var argKeyframes = loopKeyframes.text;
      var argLimitModifier = limitModifier.value;
      var argLoopDirection = loopDir;
      argLoopDirection = parseInt(argLoopDirection);
      var argExpression = keepExpression.value;
      var layerProps = [];
      var i = 0;
      while (i < layersLength) {
        var prop = layers[i].selectedProperties;
        layerProps.push(prop);
        i++;
      }
      i = 0;
      while (i < layersLength) {
        var l = layers[i];
        var prop = layerProps[i];
        var pKeys = null;
        if (prop.length > 0) {
          var a = 0;
          while (a < prop.length) {
            var p = prop[a];
            pKeys = p.numKeys;
            var canSetExpression = p.canSetExpression;
            var propPath =
              p.matchName == "ADBE Vector Shape" ||
              p.matchName == "ADBE Mask Shape"
                ? true
                : false;
            if (propPath == true) {
              argLimitModifier = true;
            }
            var propColor = p.propertyValueType == 6418 ? true : false;
            if (propColor == true && loopType == "continue") {
              canSetExpression = false;
              loopAlert.color =
                "Cannot apply loop type \'Continue\' to Color properties. Any existing expressions have not been changed.";
            }
            var propSourceText =
              p.matchName == "ADBE Text Document" ? true : false;
            if (propSourceText == true) {
              canSetExpression = false;
              loopAlert.sourceText =
                "Cannot apply loops to Text Source properties. Any existing expressions have not been changed.";
            }
            var exprKeys = 0;
            if (
              argKeyframes > pKeys - 1 &&
              pKeys !== 0 &&
              argLimitModifier == true
            ) {
              exprKeys = pKeys - 1;
            } else {
              if (pKeys !== 0) {
                exprKeys = argKeyframes;
              }
            }
            var loopKeys = "";
            if (exprKeys != 0 && propPath == true) {
              loopKeys = exprKeys;
            } else {
              if (exprKeys != 0 && loopType != "continue") {
                loopKeys = ", " + exprKeys;
              }
            }
            var loopExpr = null;
            if (propPath == true) {
              if (loopType == "offset" || loopType == "continue") {
                selectedPathProp = true;
                canSetExpression = false;
              } else {
                switch (argLoopDirection) {
                  case 1:
                    loopExpr = exprLoopPath("in", loopType, loopKeys);
                    break;
                  case 3:
                    loopExpr = exprLoopPath("inout", loopType, loopKeys);
                    break;
                  default:
                    loopExpr = exprLoopPath("out", loopType, loopKeys);
                }
              }
            } else {
              switch (argLoopDirection) {
                case 1:
                  loopExpr = exprLoopProp("in", loopType, loopKeys);
                  break;
                case 3:
                  loopExpr = exprLoopProp("inout", loopType, loopKeys);
                  break;
                default:
                  loopExpr = exprLoopProp("out", loopType, loopKeys);
              }
            }
            if (
              p.expression != "" &&
              argExpression == true &&
              canSetExpression == true
            ) {
              loopExpr += "\n";
              var currExpr = p.expression;
              currExpr = currExpr.split("\n");
              var oldExpr = "";
              var e = 0;
              while (e < currExpr.length) {
                oldExpr += "\n// " + currExpr[e];
                e++;
              }
              p.expression =
                loopExpr + "\n\n\n// == PREVIOUS EXPRESSION: ==\n//" + oldExpr;
            } else {
              if (canSetExpression == true) {
                p.expression = loopExpr;
              }
            }
            p.selected = true;
            a++;
          }
        } else {
          if (prop.length == 0) {
            var timeRemap = l.canSetTimeRemapEnabled;
            if (timeRemap == true) {
              var layerIn = l.inPoint;
              var layerOut = l.outPoint;
              var remap = l.property("ADBE Time Remapping");
              var remapNumKeys = remap.numKeys;
              l.timeRemapEnabled = true;
              if (remapNumKeys == 0) {
                var loopStart = remap.valueAtTime(layerIn, true);
                var loopEnd = loopStart + (layerOut - layerIn) - 1 / fps;
                var e = remap.numKeys;
                while (e > 1) {
                  remap.removeKey(e);
                  e--;
                }
                var key1Time = remap.keyTime(1);
                if (key1Time < layerIn) {
                  remap.addKey(layerIn);
                  remap.removeKey(1);
                } else {
                  if (remap.keyTime(1) > layerIn) {
                    remap.removeKey(2);
                  }
                }
                remap.addKey(layerOut - 1 / fps);
                remap.setValueAtKey(1, loopStart);
                remap.setValueAtKey(2, loopEnd);
              }
              pKeys = remap.numKeys;
              var exprKeys = 0;
              if (
                argKeyframes > pKeys - 1 &&
                pKeys !== 0 &&
                argLimitModifier == true
              ) {
                exprKeys = pKeys - 1;
              } else if (pKeys !== 0) {
                exprKeys = argKeyframes;
              } else {
                exprKeys = 0;
              }
              var loopKeys = "";
              if (exprKeys != 0 && loopType != "continue") {
                loopKeys = ", " + exprKeys;
              }
              switch (argLoopDirection) {
                case 1:
                  var loopExpr = exprLoopProp("in", loopType, loopKeys);
                  break;
                case 3:
                  var loopExpr = exprLoopProp("inout", loopType, loopKeys);
                  break;
                default:
                  var loopExpr = exprLoopProp("out", loopType, loopKeys);
              }
              if (remap.expression != "" && argExpression == true) {
                loopExpr += "\n";
                var currExpr = remap.expression;
                var currExpr = currExpr.split("\n");
                var oldExpr = "";
                var e = 0;
                while (e < currExpr.length) {
                  oldExpr += "\n// " + currExpr[e];
                  e++;
                }
                remap.expression =
                  loopExpr +
                  "\n\n\n// == PREVIOUS EXPRESSION: ==\n//" +
                  oldExpr;
              } else {
                remap.expression = loopExpr;
              }
            } else {
              var unRemappable = true;
            }
          }
        }
        i++;
      }
      if (unRemappable == true) {
        loopAlert.unRemappable =
          "Time Remap could not be applied to some of the selected layers.";
      }
      if (selectedPathProp == true) {
        var loopTypeCapped =
          loopType.charAt().toUpperCase() + loopType.slice(1);
        loopAlert.pathNotApplied =
          "Cannot apply loop type \'" +
          loopTypeCapped +
          "\' to Path properties. Any existing expressions have not been changed.";
      }
      var i = 0;
      while (i < layersLength) {
        var props = layerProps[i];
        var a = 0;
        while (a < props.length && props !== 0) {
          var prop = props[a];
          prop.selected = true;
          a++;
        }
        i++;
      }
      var compViewer = comp.openInViewer();
      compViewer.setActive();
    } else {
      loopAlert.noSelection = "Please select at least one layer or property.";
    }
    var loopAlertMessage = "";
    for (var key in loopAlert) {
      if (Object.prototype.hasOwnProperty.call(loopAlert, key)) {
        loopAlertMessage += "\n\n";
        loopAlertMessage += loopAlert[key];
      }
    }
    if (loopAlertMessage.length > 0) {
      var loopAlertMessageTitle = alertTitle + ":";
      loopAlertMessage = loopAlertMessageTitle + loopAlertMessage;
      alert(loopAlertMessage, alertTitle);
    }
  }
  function exprLoopProp(dir, loopType, loopKeys) {
    if (dir == "in") {
      expr = 'loopIn("' + loopType + '"' + loopKeys + ");";
    } else if (dir == "out") {
      expr = 'loopOut("' + loopType + '"' + loopKeys + ");";
    } else {
      if (dir == "inout") {
        expr =
          'loopIn("' +
          loopType +
          '"' +
          loopKeys +
          ') + loopOut("' +
          loopType +
          '"' +
          loopKeys +
          ") - value;";
      }
    }
    return expr;
  }
  function exprLoopPath(dir, loopType, loopKeys) {
    var loopTypeCapped = loopType.charAt().toUpperCase() + loopType.slice(1);
    if (dir == "in") {
      expr = "// loopIn: " + loopTypeCapped + "\n";
    } else if (dir == "out") {
      expr = "// loopOut: " + loopTypeCapped + "\n";
    } else {
      if (dir == "inout") {
        expr = "// loopIn + loopOut: " + loopTypeCapped + "\n";
      }
    }
    if (loopKeys == "") {
      var loopKeys = 0;
    }
    expr = expr + "keyframeModifier = " + loopKeys + ";\n\n";
    if (dir == "in") {
      expr =
        expr +
        "k1 = key(1);\nk2 = (keyframeModifier == 0) ? key(numKeys) : key(keyframeModifier + 1);\nif (numKeys > 1 && time < key(1).time) {\n\tt1 = k1.time;\n\tt2 = k2.time;\n\tspan = t2 - t1;\n\tdelta = t2 - time;\n\tt = delta%span;\n\t";
      if (loopType == "cycle") {
        expr = expr + "valueAtTime(t2 - t);";
      } else {
        if (loopType == "pingpong") {
          expr =
            expr +
            "seg = Math.floor(delta/span);\n\tvalueAtTime((seg%2) ? (t1 + t) : (t2 - t));";
        }
      }
    } else if (dir == "out") {
      expr =
        expr +
        "k1 = (keyframeModifier == 0) ? key(1) : key(numKeys - keyframeModifier);\nk2 = key(numKeys);\nif (numKeys > 1 && time > k2.time) {\n\tt1 = k1.time;\n\tt2 = k2.time;\n\tspan = t2 - t1;\n\tdelta = time - t2;\n\tt = delta%span;\n\t";
      if (loopType == "cycle") {
        expr = expr + "valueAtTime(t1 + t);";
      } else {
        if (loopType == "pingpong") {
          expr =
            expr +
            "seg = Math.floor(delta/span);\n\tvalueAtTime((seg%2) ? (t1 + t) : (t2 - t));";
        }
      }
    } else {
      if (dir == "inout") {
        expr =
          expr +
          "tStart = key(1).time;\ntEnd = key(numKeys).time;\nif (numKeys > 1 && time < tStart) {\n\tk1 = key(1);\n\tk2 = (keyframeModifier == 0) ? key(numKeys) : key(keyframeModifier + 1);\n\tt1 = k1.time;\n\tt2 = k2.time;\n\tspan = t2 - t1;\n\tdelta = t2 - time;\n\tt = delta%span;\n\t";
        if (loopType == "cycle") {
          expr = expr + "valueAtTime(t2 - t);";
        } else {
          if (loopType == "pingpong") {
            expr =
              expr +
              "seg = Math.floor(delta/span);\n\tvalueAtTime((seg%2) ? (t1 + t) : (t2 - t));\n";
          }
        }
        expr =
          expr +
          "} else if (numKeys > 1 && time > tEnd) {\n\tk1 = (keyframeModifier == 0) ? key(1) : key(numKeys - keyframeModifier);\n\tk2 = key(numKeys);\n\tt1 = k1.time;\n\tt2 = k2.time;\n\tspan = t2 - t1;\n\tdelta = time - t2;\n\tt = delta%span;\n\t";
        if (loopType == "cycle") {
          expr = expr + "valueAtTime(t1 + t);";
        } else {
          if (loopType == "pingpong") {
            expr =
              expr +
              "seg = Math.floor(delta/span);\n\tvalueAtTime((seg%2) ? (t1 + t) : (t2 - t));";
          }
        }
      }
    }
    expr = expr + "\n} else {\n\tvalue;\n};";
    return expr;
  }
  function fieldValidation(txt, ref) {
    txt = txt.replace(/[^\d]/g, "");
    if (txt == "") {
      txt = ref;
    }
    return parseInt(txt, 10);
  }
  function openURL(url, useHttps) {
    if (!/^http/.test("" + url)) {
      url = useHttps ? "https://" : "http://" + url;
    }
    if ($.os[0] === "M") {
      system.callSystem("open " + url);
    } else {
      system.callSystem("cmd /c start " + url);
    }
  }
  function loopyKBar() {
    var isKBarRunning = typeof kbar !== "undefined";
    if (isKBarRunning && kbar.button) {
      var button = kbar.button;
      switch (button.argument) {
        case "1":
          loopySetLoop("cycle", argLoopDirection);
          break;
        case "2":
          loopySetLoop("pingpong", argLoopDirection);
          break;
        case "3":
          loopySetLoop("offset", argLoopDirection);
          break;
        case "4":
          loopySetLoop("continue", argLoopDirection);
          break;
        case "5":
          changeLoopDirection(true);
          break;
        default:
          loopyShowPanel();
          loopyRun();
          break;
      }
    } else {
      loopyShowPanel();
      loopyRun();
    }
  }
  var scriptName = "Loopy";
  var scriptVersionNumber = "1.0";
  var ab_settings = {
    betaExpirationDate: new Date("Nov 9, 2022"),
    betaStartDate: new Date("Nov 7, 2022"),
    betaSupportEmail: "feedback@automotion.studio",
    helpButtons: [],
    helpText: "This is the help docs. Use \n for new lines",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 66578221,
    productSKU: "ATML-SUL",
    scriptAuthor: "Rob Barrett (Automotion)",
    scriptName: scriptName,
    scriptURL: "http://aescripts.com/loopy/",
    scriptVersion: scriptVersionNumber,
  };
  function b(vars) {
    function licUI() {
      var licPal = new Window(
        "dialog",
        strTrialWelcomeHeader + " - " + strVersion + " " + strScriptVersion,
        undefined,
        { resizeable: true },
      );
      if (licPal != null) {
        var res =
          "group { \n\t\t\t\torientation: \'column\', \n\t\t\t\talignment: [\'fill\',\'fill\'], \n\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\tinfoGrp: Group { \n\t\t\t\t\talignment: [\'fill\',\'top\'], \n\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\torientation: \'column\', \n\t\t\t\t\t\thdrGrp: Group {\n\t\t\t\t\t\t\ttxt: StaticText {}, \n\t\t\t\t\t\t\tpaste: StaticText {}, \n\t\t\t\t\t\t}\n\t\t\t\t\t\ttrial: StaticText {}, \n\t\t\t\t\t} \n\t\t\t\t\tlicGrp: Group { \n\t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \n\t\t\t\t\t} \n\t\t\t\t\tokGrp: Group { \n\t\t\t\t\talignment: [\'fill\',\'bottom\'], \n\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \n                            buyGrp: Group { \n                            alignment: [\'left\',\'fill\'], \n                            alignChildren: [\'left\',\'fill\'], \n                            orientation: \'column\', \n                            spacing:5,\n                                retrieveReg: Button {text:\'" +
          strRetrieveLic.replace(/%t/, strLicense) +
          "\', name:\'retrieve\',preferredSize:[130,25]}\n                                buyLic: Button {text:\'" +
          strBuyLic.replace(/%t/, strLicense) +
          "\', name:\'buy\',preferredSize:[130,25]}\n                                }\n\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \n\t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', name: \'ok\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \n\t\t\t\t\t} \n\t\t\t\t}";
        licPal.grp = licPal.add(res);
        var boldFont = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        var smallFont = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.REGULAR,
          9,
        );
        licPal.grp.licGrp.txt.preferredSize = [600, 30];
        licPal.grp.infoGrp.hdrGrp.txt.text = strEnterLicenseCode;
        licPal.grp.infoGrp.hdrGrp.txt.graphics.font = boldFont;
        licPal.grp.infoGrp.hdrGrp.paste.text = "";
        licPal.grp.infoGrp.hdrGrp.paste.graphics.font = smallFont;
        licPal.grp.infoGrp.trial.text =
          betaMode || !offerTrial ? "" : strTrialInstructMsg;
        if (isServerConfigured(licenseValidity)) {
          if (isServerRunning(licenseValidity)) {
            licPal.grp.infoGrp.hdrGrp.txt.text = strServerInstructMsg;
            licPal.grp.infoGrp.trial.text = strTrialInstructMsg;
          } else {
            licPal.grp.infoGrp.hdrGrp.txt.text =
              strEnterLicenseCode + " " + strServerNotRunning;
            licPal.grp.infoGrp.trial.text =
              betaMode || !offerTrial ? "" : strTrialInstructMsg;
          }
        }
        licPal.grp.licGrp.txt.text = betaMode || !offerTrial ? "" : "trial";
        if (
          isServerConfigured(licenseValidity) &&
          isServerRunning(licenseValidity)
        ) {
          licPal.grp.licGrp.txt.text = "@REMOTE";
        }
        licPal.grp.okGrp.buyGrp.retrieveReg.visible =
          licPal.grp.okGrp.buyGrp.buyLic.visible = !betaMode;
        licPal.grp.okGrp.buyGrp.buyLic.onClick = function () {
          openURL(strTrialUrl);
          licPal.close(false);
        };
        licPal.grp.okGrp.buyGrp.retrieveReg.onClick = function () {
          var title = strRetrieveLic.replace(/%t/, strLicense);
          var txt = strLicenseDownloadOptions.replace(
            /%t/,
            strLicenses.toLowerCase(),
          );
          alertButtonsUI(
            title,
            txt,
            { name: strMyDownloads, url: retrieveUrl },
            { name: strDownloadManager, url: managerAppUrl },
          );
          licPal.close(false);
        };
        licPal.grp.okGrp.cancelBtn.onClick = function () {
          licPal.close(false);
        };
        licPal.grp.okGrp.okBtn.onClick = function () {
          license = licPal.grp.licGrp.txt.text
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "");
          licPal.close(true);
        };
        licPal.layout.layout(true);
        licPal.layout.resize();
        licPal.onResizing = licPal.onResize = function () {
          this.layout.resize();
        };
        return licPal;
      }
    }
    function alertButtonsUI(title, txt, btn1, btn2) {
      var updPal = new Window(
        "dialog",
        strScriptName + " v" + strScriptVersion,
        undefined,
        { resizeable: true },
      );
      if (updPal != null) {
        var res =
          "group { \n\t\t\t\torientation: \'column\', \n\t\t\t\talignment: [\'fill\',\'fill\'], \n\t\t\t\talignChildren: [\'fill\',\'fill\'], \n                    titleGrp: Group { \n                        orientation: \'column\', \n                        alignment: [\'fill\',\'fill\'], \n                        alignChildren: [\'fill\',\'fill\'], \n                        margins: 1, \n                        titleInnerGrp: Group { \n                            orientation: \'column\', \n                            alignment: [\'fill\',\'fill\'], \n                            alignChildren: [\'fill\',\'fill\'], \n                            margins: 5, \n                                title: StaticText {alignment: [\'fill\',\'top\'], minimumSize:[400,-1], properties:{multiline:false}},\n                                }, \n                            }, \n                    detailGrp: Group { \n                        orientation: \'column\', \n                        alignment: [\'fill\',\'fill\'], \n                        alignChildren: [\'fill\',\'fill\'], \n                                detail: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true} },\n                                }, \n                    buttonsGrp: Group { \n                        alignment: [\'fill\',\'bottom\'], \n                        alignChildren: [\'fill\',\'fill\'], \n                            btn1: Button {text:\'" +
          btn1.name +
          "\', minimumSize:[-1,30], alignment: [\'right\',\'center\']}, \n                            btn2: Button {text:\'" +
          btn2.name +
          "\', name: \'ok\', minimumSize:[-1,30], alignment: [\'right\',\'center\']}, \n                        }, \n\t\t\t\t}";
        updPal.grp = updPal.add(res);
        updPal.grp.titleGrp.graphics.backgroundColor = updPal.graphics.newBrush(
          updPal.graphics.BrushType.THEME_COLOR,
          "focusRing",
          1,
        );
        updPal.grp.titleGrp.titleInnerGrp.graphics.backgroundColor =
          updPal.graphics.newBrush(
            updPal.graphics.BrushType.THEME_COLOR,
            "background",
            1,
          );
        updPal.grp.titleGrp.titleInnerGrp.title.text = title;
        updPal.grp.detailGrp.detail.text = txt;
        if (
          (btn1.name == strGetHelp && btn1.url == undefined) ||
          btn1.url == ""
        ) {
          updPal.grp.buttonsGrp.btn1.visible = false;
        }
        updPal.grp.buttonsGrp.btn1.onClick = function () {
          if (
            btn1.hasOwnProperty("url") &&
            btn1.url != undefined &&
            btn1.url != ""
          ) {
            openURL(btn1.url);
          }
          updPal.close(false);
        };
        if (
          (btn2.name == strGetHelp && btn2.url == undefined) ||
          btn2.url == ""
        ) {
          updPal.grp.buttonsGrp.btn2.visible = false;
        }
        updPal.grp.buttonsGrp.btn2.onClick = function () {
          if (
            btn2.hasOwnProperty("url") &&
            btn2.url != undefined &&
            btn2.url != ""
          ) {
            openURL(btn2.url);
          }
          updPal.close(false);
        };
        updPal.layout.layout(true);
        updPal.layout.resize();
        updPal.onResizing = updPal.onResize = function () {
          this.layout.resize();
        };
        updPal.show();
      }
    }
    function checkBeta(betaExpiration, betaStart) {
      return new Date() < betaStart || new Date() > betaExpiration;
    }
    function helpUI() {
      var helpPal = new Window(
        "dialog",
        strScriptName + " - " + strVersion + " " + strScriptVersion,
        undefined,
        { resizeable: true },
      );
      if (helpPal != null) {
        var panel_alignment =
          $.os.indexOf("Windows") != -1 &&
          parseFloat(app.version) >= 12 &&
          parseFloat(app.version) < 14
            ? ["left", "top"]
            : ["fill", "fill"];
        var res =
          "group { \n\t\torientation: \'column\', \n\t\talignment: [\'" +
          panel_alignment[0] +
          "\',\'" +
          panel_alignment[1] +
          "\'], \n\t\talignChildren: [\'fill\',\'fill\'], \n                   infoGrp: Group { \n                   alignment: [\'fill\',\'top\'], \n                   alignChildren: [\'fill\',\'top\'], \n\t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]}, \n                      hdr: StaticText {properties:{multiline:true}}, \n                      removeLic: Button {text:\'" +
          strDeactivate +
          "\', preferredSize:[40,30]} \n\t\t\t\t} \n\t\t\t\thelpGrp: Group { \n                   alignment: [\'" +
          panel_alignment[0] +
          "\',\'" +
          panel_alignment[1] +
          "\'], \n                   alignChildren: [\'fill\',\'fill\'], \n                    txt: EditText {properties:{multiline:true, readonly:true}}, \n\t\t\t\t} \n                prefsGrp: Group {\n                       alignment: [\'fill\',\'bottom\'], \n                       alignChildren: [\'left\',\'center\'], \n                       orientation: \'row\', \n                       checkNow: Button {text:\'" +
          strCheckNow +
          "\', preferredSize:[150,25]} \n                       doUpdateCheck: Checkbox {text:\'" +
          strVersionCheck +
          "\', preferredSize:[-1,25]} \n                       }\n\t\t\tokGrp: Group { \n                alignment: [\'fill\',\'bottom\'], \n                alignChildren: [\'fill\',\'center\'], \n                supportBtn: Button {text:\'" +
          strGetSupport +
          "\', preferredSize:[150,30], alignment: [\'left\',\'center\']} \n                ";
        for (
          var i = 0;
          i < Math.min(maxUIButtons, vars.helpButtons.length);
          i += 1
        ) {
          if (vars.helpButtons[i].hasOwnProperty("name")) {
            var btnType =
              vars.helpButtons[i].hasOwnProperty("type") &&
              validateButtonType(vars.helpButtons[i].type)
                ? vars.helpButtons[i].type
                : "Button";
            res +=
              "btn" +
              i +
              ": " +
              btnType +
              " {id: \'" +
              i +
              "\', alignment: [\'left\',\'center\']}";
          }
        }
        res +=
          "\n\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \n\t\t\t\t} \n\t\t}";
        helpPal.grp = helpPal.add(res);
        helpPal.grp.helpGrp.txt.preferredSize = [800, 500];
        var currentYear = "\xa9" + (new Date().getYear() + 1900).toString();
        helpPal.grp.infoGrp.txt.text =
          strScriptName +
          " - " +
          strVersion +
          " " +
          strScriptVersion +
          "\n" +
          currentYear +
          " " +
          vars.scriptAuthor +
          "\n\n";
        helpPal.grp.infoGrp.hdr.text = getRegistration();
        helpPal.grp.helpGrp.txt.text = vars.helpText;
        if (haveSettings(prefsSectionName, prefsDoUpdateCheck)) {
          doUpdateCheck = !(
            getSettings(prefsSectionName, prefsDoUpdateCheck) == "false"
          );
        }
        helpPal.grp.prefsGrp.doUpdateCheck.value = doUpdateCheck;
        helpPal.grp.prefsGrp.doUpdateCheck.onClick = function () {
          setUpdateCheck(this.value);
        };
        helpPal.grp.prefsGrp.checkNow.onClick = function () {
          if (ScriptUI.environment.keyboardState.altKey) {
            alert("aescripts licensing framework version\n" + licensingVersion);
            return;
          }
          doUpdateCheckNow();
        };
        for (
          var i = 0;
          i < Math.min(maxUIButtons, vars.helpButtons.length);
          i += 1
        ) {
          if (vars.helpButtons[i].hasOwnProperty("name")) {
            helpPal.grp.okGrp["btn" + i].text = vars.helpButtons[i].name;
            if (vars.helpButtons[i].hasOwnProperty("helpTip")) {
              helpPal.grp.okGrp["btn" + i].helpTip =
                vars.helpButtons[i].helpTip;
            }
            if (vars.helpButtons[i].hasOwnProperty("url")) {
              helpPal.grp.okGrp["btn" + i].onClick = function () {
                openURL(vars.helpButtons[this.id].url);
              };
            } else {
              if (vars.helpButtons[i].hasOwnProperty("onClickFunction")) {
                helpPal.grp.okGrp["btn" + i].onClick =
                  vars.helpButtons[i].onClickFunction;
              }
              if (vars.helpButtons[i].hasOwnProperty("btnValue")) {
                helpPal.grp.okGrp["btn" + i].value =
                  vars.helpButtons[i].btnValue;
              }
            }
          }
        }
        helpPal.grp.infoGrp.removeLic.visible = !isResultTrial(
          licenseValidity.result,
        );
        helpPal.grp.infoGrp.removeLic.onClick = function () {
          if (removeLic()) {
            helpPal.grp.infoGrp.hdr.text = getRegistration();
            this.visible = false;
          }
        };
        helpPal.grp.okGrp.supportBtn.onClick = function () {
          if (
            ScriptUI.environment.keyboardState.shiftKey &&
            ScriptUI.environment.keyboardState.altKey
          ) {
            alert(
              "aescripts + aeplugins\nFramework version: " +
                licensingVersion +
                "\n" +
                strScriptName +
                " - " +
                strVersion +
                " " +
                strScriptVersion,
            );
          } else {
            createSupportTicket({});
            helpPal.close();
          }
        };
        helpPal.grp.okGrp.okBtn.onClick = function () {
          helpPal.close();
        };
        if (
          $.os.indexOf("Windows") != -1 &&
          parseFloat(app.version) >= 12 &&
          parseFloat(app.version) < 14
        ) {
          helpPal.maximumSize = [840, 670];
        }
        helpPal.layout.layout(true);
        helpPal.layout.resize();
        helpPal.onResizing = helpPal.onResize = function () {
          this.layout.resize();
        };
        helpPal.show();
      }
    }
    function validateButtonType(type) {
      return type === "Button" || type === "Checkbox";
    }
    function createSupportTicket(options, open) {
      if (open == undefined) {
        open = true;
      }
      message = diagnostic = "";
      subject = "&subject=";
      if (options != undefined && typeof options != "undefined") {
        if (options.hasOwnProperty("subject")) {
          subject += File.encode(options.subject);
        }
        if (options.hasOwnProperty("message")) {
          message = File.encode(options.message);
        }
        if (options.hasOwnProperty("diagnostic")) {
          diagnostic = File.encode(options.diagnostic + "\n--\n");
        }
      }
      var middle =
        isAescriptsSupportUrl === true
          ? supportTicketSKU == ""
            ? strSKU
            : supportTicketSKU + subject + "&message="
          : subject.replace(/\&/, "?") + "&body=";
      var end =
        middle != ""
          ? message +
            "%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A-------%0D%0A" +
            diagnostic +
            getDiagnosticData(true)
          : "";
      if (
        supportUrl.toString().match(/@/) &&
        !supportUrl.toString().match(/^mailto:/)
      ) {
        supportUrl = "mailto:" + supportUrl;
      }
      var sendUrl = supportUrl + middle + end;
      if (open) {
        openURL(sendUrl);
      } else {
        return sendUrl;
      }
    }
    function getDiagnosticData(encode) {
      var os =
        $.os.indexOf("Windows") != -1
          ? $.os.toString()
          : "macOS " + systemCall("sw_vers -productVersion").replace(/\n$/, "");
      var currentApp =
        BridgeTalk.getDisplayName(BridgeTalk.appName) +
        " (" +
        app.version +
        ") - " +
        $.locale.toString();
      var scriptVersion =
        strScriptName.replace(/&/, "and") + " - v" + strScriptVersion;
      var lastServerVersionChecked =
        "Last checked server version: " +
        haveSettings(prefsSectionName, prefsLastServerVersionChecked)
          ? getSettings(prefsSectionName, prefsLastServerVersionChecked)
          : "n/a";
      var licensingFrameworkVersion =
        "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return encode
        ? File.encode(scriptVersion) +
            "%0D%0A" +
            File.encode(os) +
            "%0D%0A" +
            File.encode(currentApp) +
            "%0D%0A" +
            File.encode(licensingFrameworkVersion) +
            "%0D%0A" +
            File.encode(lastServerVersionChecked)
        : scriptVersion +
            "\n" +
            os +
            "\n" +
            currentApp +
            "\n" +
            licensingFrameworkVersion +
            "\n" +
            lastServerVersionChecked;
    }
    function setUpdateCheck(val) {
      doUpdateCheck = val;
      saveSettings(prefsSectionName, prefsDoUpdateCheck, val);
    }
    function doUpdateCheckNow() {
      doUpdateCheck = true;
      checkForNewVersion(true);
    }
    function newVersionUI(newVersion) {
      var updPal = new Window("dialog", strNewVersionAvailableHdr, undefined, {
        resizeable: true,
      });
      if (updPal != null) {
        var res =
          "group { \n\t\t\t\torientation: \'column\', \n\t\t\t\talignment: [\'fill\',\'fill\'], \n\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t   hdrGrp: Group { \n\t\t\t\t   alignment: [\'fill\',\'fill\'], \n\t\t\t\t   alignChildren: [\'fill\',\'fill\'], \n\t\t\t\t   orientation: \'column\', \n                        hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
        if (newVersion.hasOwnProperty("header")) {
          res +=
            "   infoGrp: Panel { \n                           alignment: [\'fill\',\'fill\'], \n                           alignChildren: [\'fill\',\'fill\'], \n                           orientation: \'column\', \n                              info: StaticText {properties:{multiline:true}}, \n                              } ";
        }
        res +=
          "} \n\t\t\t\t\tokGrp: Group { \n\t\t\t\t\talignment: [\'fill\',\'bottom\'], \n\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\t\tskipVersionBtn: Button {text:\'" +
          strSkipVersion +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \n                        remindMeLaterBtn: Button {text:\'" +
          strRemindMeLater +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \n\t\t\t\t\t\tdownloadBtn: Button {text:\'" +
          strDownload +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \n\t\t\t\t\t} \n\t\t\t\t}";
        updPal.grp = updPal.add(res);
        var boldFont = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        var boldFontSm = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          11,
        );
        var smallFont = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.REGULAR,
          9,
        );
        updPal.grp.hdrGrp.hdr.graphics.font = boldFont;
        updPal.grp.hdrGrp.hdr.text =
          strNewVersionAvailable.replace(/%v/, newVersion.version) +
          "\n" +
          strCurrentVersion.replace(/%v/, strScriptVersion);
        if (newVersion.hasOwnProperty("header")) {
          updPal.grp.hdrGrp.infoGrp.info.text =
            newVersion.header + "\n\n" + newVersion.detail;
        }
        saveSettings(
          prefsSectionName,
          prefsLastServerVersionChecked,
          newVersion.version,
        );
        updPal.grp.okGrp.skipVersionBtn.onClick = function () {
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
            newVersion.version,
          );
          saveSettings(
            prefsSectionName,
            prefsLastServerVersionChecked,
            newVersion.version,
          );
          updPal.close(false);
        };
        updPal.grp.okGrp.remindMeLaterBtn.onClick = function () {
          try {
            var newDate = new Date();
            newDate = dateAddDays(remindMeLaterDays);
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
              newDate.toString(),
            );
            saveSettings(
              prefsSectionName,
              prefsLastServerVersionChecked,
              newVersion.version,
            );
            updPal.close(false);
          } catch (e) {
            alert(e.toString());
          }
        };
        updPal.grp.okGrp.downloadBtn.onClick = function () {
          var title = strRetrieveLic.replace(/%t/, strLicense);
          var txt = strLicenseDownloadOptions.replace(
            /%t/,
            strDownloads.toLowerCase(),
          );
          alertButtonsUI(
            title,
            txt,
            { name: strMyDownloads, url: retrieveUrl },
            { name: strDownloadManager, url: managerAppUrl },
          );
          updPal.close(true);
        };
        updPal.layout.layout(true);
        updPal.layout.resize();
        updPal.onResizing = updPal.onResize = function () {
          this.layout.resize();
        };
        if (newVersion.hasOwnProperty("header")) {
          updPal.grp.hdrGrp.infoGrp.size.height = Math.min(
            updPal.grp.hdrGrp.infoGrp.size.height,
            300,
          );
          updPal.layout.layout(true);
          updPal.layout.resize();
        }
        updPal.show();
      }
    }
    function dateAddDays(days) {
      var ms = new Date().getTime() + 86400000 * days;
      var added = new Date(ms);
      return added;
    }
    function checkForNewVersion(checkNow) {
      function showNewVersionUI(versionDifference) {
        return (
          (versionDifference > 0 && lastVersionChecked == undefined) ||
          lastTimeVersionChecked == undefined ||
          nextTimeVersionChecked == undefined ||
          checkNow ||
          currentTime >= nextTimeVersionChecked
        );
      }
      return;
      checkNow = false;
      if (!doUpdateCheck) {
        return;
      }
      if (haveSettings(prefsSectionName, prefsLastVersionChecked)) {
        return;
      }
      if (haveSettings(prefsSectionName, prefsLastServerVersionChecked)) {
        return;
      }
      if (haveSettings(prefsSectionName, prefsLastTimeVersionChecked)) {
        return;
      }
      if (
        haveSettings(prefsSectionName, prefsNextTimeVersionCheckedSkipVersion)
      ) {
        return;
      }
      if (haveSettings(prefsSectionName, prefsNextTimeVersionChecked)) {
        return;
      }
      if (haveSettings(prefsSectionName, prefsVersionCheckInit)) {
        return;
      }
      var currentTime = new Date();
      if (
        !checkNow &&
        versionCheckInit != undefined &&
        nextTimeVersionChecked != undefined &&
        currentTime < nextTimeVersionChecked
      ) {
        return;
      }
      var serverVersionCheck = versionCheck(strSKU, true, checkNow);
      if (serverVersionCheck == null) {
        doUpdateCheck = false;
        saveSettings(prefsSectionName, prefsDoUpdateCheck, false);
        return;
      }
      var serverVersion =
        serverVersionCheck != null &&
        serverVersionCheck.hasOwnProperty("version")
          ? serverVersionCheck.version
          : strScriptVersion;
      if (
        !checkNow &&
        lastServerVersionChecked != undefined &&
        lastServerVersionChecked == serverVersion
      ) {
        return;
      }
      if (
        !checkNow &&
        nextTimeVersionCheckedSkipVersion != undefined &&
        nextTimeVersionCheckedSkipVersion == lastServerVersionChecked
      ) {
        return;
      }
      saveSettings(prefsSectionName, prefsVersionCheckInit, 1);
      try {
        var newDate = new Date();
        newDate = dateAddDays(updateCheckInterval);
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
          newDate.toString(),
        );
      } catch (e) {
        alert(e.toString());
      }
      var versionDifference = compareVersions(serverVersion, strScriptVersion);
      var showNewVersion = showNewVersionUI(versionDifference);
      if (showNewVersion) {
        newVersionUI(serverVersionCheck);
      } else {
        if (versionDifference <= 0 && checkNow) {
          alert(strUpToDate);
        }
      }
    }
    function versionCheck(scriptSKU, latest, isCheckNow) {
      var checkLatest = latest ? "&latest=1" : "";
      var url =
        "https://notify.aescripts.com/versioncheck2.php?json=1&sku=" +
        scriptSKU +
        checkLatest;
      var resp = extComms(url, isCheckNow);
      if (resp == null || resp == "" || validateJSON(resp) == false) {
        if (isCheckNow) {
          alert(strUpdateCheckError);
          return null;
        } else {
          return null;
        }
      }
      try {
        resp = JSONify(resp.replace(/\\u2022/g, "-"), "parse");
        if (resp == null) {
          return null;
        }
      } catch (e) {
        return null;
      }
      if (resp.status != "ok") {
        return null;
      }
      if (latest) {
        version = {
          date: resp.latest.release_date,
          detail: resp.latest.detail,
          header: strVersionRev
            .replace(/%a/, resp.version)
            .replace(/%b/, "")
            .replace(/%c/, resp.latest.release_date),
          version: resp.version,
        };
      } else {
        version = { version: resp.version };
      }
      return version;
    }
    function extComms(url, isCheckNow) {
      try {
        var newExe = create_altool();
        if (!newExe.exists) {
          var title = "extComms error. alttool does not exists";
          var detail =
            "alttool does not exists. Please click on \'Open Support Ticket\' button for assistance.";
          var errDetail =
            "e" in licenseValidity ? "\n" + licenseValidity.e : "";
          var licError =
            "title" in licenseValidity ? " - " + licenseValidity.title : "";
          var url = createSupportTicket({
            message: errDetail,
            subject: title + licError,
          });
          alertButtonsUI(
            title,
            detail,
            { name: "Open Support Ticket", url: url },
            { name: strCancel },
          );
          return null;
        }
        var newExePath = newExe.fsName;
        var cmd = '"' + newExePath + '" -web "' + url + '"';
        var res = systemCall(cmd);
        newExe.remove();
        var lines = res.match(/[^\r\n]+/g);
        if (lines.length > 0 && lines[0] == "200") {
          if (lines.length >= 1) {
            return lines[1];
          } else {
            alertButtonsUI(
              "extComms error",
              "Empty Payload. Please click on \'Open Support Ticket\' button for assistance.",
              { name: "Open Support Ticket", url: url },
              { name: strCancel },
            );
            return null;
          }
        } else {
          if (isCheckNow) {
            alertButtonsUI(
              "extComms error",
              res.toString() +
                "\n\nPlease click on \'Open Support Ticket\' button for assistance.",
              { name: "Open Support Ticket", url: url },
              { name: strCancel },
            );
          }
          return null;
        }
      } catch (e) {
        alert("extComms error\n" + e.toString());
        return null;
      }
    }
    function createVbsHelper() {
      var vbsFile = new File(
        globalPrefsFolder.fullName + "/Aescripts/aescripts_helper.vbs",
      );
      vbsFile.open("w");
      vbsFile.write(
        'dim o: Set o = createobject("MSXML2.XMLHTTP.6.0")\no.Open "GET", WScript.Arguments(0), False\no.Send\nIf o.Status >= 200 And o.Status <= 202 Then\nWScript.Echo o.responseText\nElse\nWScript.Echo "Error"\nEnd If',
      );
      vbsFile.close();
      return vbsFile.exists ? vbsFile : null;
    }
    function socketConnect(url, get) {
      var conn = new Socket();
      conn.encoding = "binary";
      conn.timeout = 2;
      if (conn.open(url + ":80", "UTF-8")) {
        conn.write(
          "GET /" +
            get +
            " HTTP/1.1\nHost: " +
            url +
            "\n\nConnection: close\n\n",
        );
        var resp = conn.read(2000);
        conn.close();
        if (resp != undefined) {
          resp = resp.toString();
          return resp;
        } else {
          return null;
        }
      } else {
        return null;
      }
    }
    function curvaIsNotRunning() {
      var curvaObject = {};
      if (
        curvaObject.toSource().indexOf("isStaticText") != -1 &&
        curvaObject.toSource().indexOf("drawHoverBox") != -1
      ) {
        alertButtonsUI(
          "Curva script conflict",
          "Please close the \'Curva\' script and restart After Effects.\n\nUnfortunately this script interferes with other scripts and needs to remain closed\n\nPlease click on \'Open Support Ticket\' button for assistance.",
          { name: "Open Support Ticket", url: url },
          { name: strCancel },
        );
        return false;
      }
      return true;
    }
    function formatHistory(notes, clientVersion) {
      var data = notes.data;
      var releaseNotesFormatted = [];
      for (var m1 in data) {
        if (!data.hasOwnProperty(m1)) {
          continue;
        }
        var history = data[m1].history;
        for (var i = history.length - 1; i >= 0; i--) {
          var rel = history[i];
          var isCurrentVersionNote = "";
          var detail = rel.detail;
          if (i == history.length - 1) {
            isCurrentVersionNote = " (" + strNewestVersionAvailable + ")";
          }
          var myVersionFormatted = strVersionRev
            .replace(/%0/, rel.version_number)
            .replace(/%1/, isCurrentVersionNote)
            .replace(/%2/, rel.release_date)
            .replace(/%3/, detail);
          if (
            !options.summaryOnlyNewChanges ||
            compareVersions(clientVersion, rel.version_number) < 0
          ) {
            releaseNotesFormatted.push(myVersionFormatted);
          }
        }
      }
      var result = releaseNotesFormatted.join("\n\n");
      return result;
    }
    function create_altool() {
      var tempFolder = checkTempFolderAvailability();
      var tempLocation =
        tempFolder != null ? tempFolder : globalPrefsFolder.fullName;
      var tempExeFileName =
        tempLocation +
        "/" +
        Math.round(Math.random() * new Date().getTime() * 42132);
      if ($.os.indexOf("Win") != -1) {
        binStr = wx;
        base64IconStr = binStr;
        tempExeFileName += ".exe";
      } else {
        var getMacProcessor = systemCall("arch");
        if (getMacProcessor.toLowerCase().match(/ppc/)) {
          alert(strPpcNotSupported);
          return false;
        }
        binStr = mx;
        base64IconStr = binStr;
      }
      var newExe = createFile(File(tempExeFileName), base64IconStr, "BINARY");
      if ($.os.indexOf("Mac") != -1) {
        systemCall('chmod +x "' + newExe.fsName + '"');
      }
      newExe.hidden = true;
      return newExe;
    }
    function getVerifCode(lic) {
      return "1";
      if (lic.toLowerCase() == "trial") {
        lic = "";
      }
      var newExe = create_altool();
      if (!newExe.exists) {
        licenseData = {};
        licenseData.result = -108;
        return licenseData;
      }
      var newExePath = newExe.fsName;
      var thelic = lic == "-" ? " " + lic : ' "' + lic + '"';
      var verifCmd =
        '"' + newExePath + '" "' + strHeader + '" ' + privateNum + thelic;
      var verifCode = systemCall(verifCmd);
      newExe.remove();
      return parseResult(verifCode);
    }
    function parseResult(code) {
      try {
        licenseData = parseVerifCode(code.toString());
      } catch (e) {
        licenseData = {};
        licenseData.result = -101;
        licenseData.e = e.toString() + "\nresult:\n\n" + code.toString();
      }
      return licenseData;
    }
    function parseVerifCode(stdout) {
      var lines = stdout.match(/[^\r\n]+/g);
      var licenseData = {};
      for (var i = 0; i < lines.length; i += 1) {
        var parts = lines[i].split(":");
        if (parts.length >= 2) {
          var key = parts[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          var value = trimQuotes(parts[1]);
          if (key == "LS" && value == "UP") {
            key = "LSS";
          }
          if (!isNaN(value)) {
            value = parseFloat(value);
          }
          licenseData[key] = value;
        }
      }
      if (licenseData.result === undefined) {
        licenseData.result = -102;
        licenseData.e = stdout;
      }
      checkTrialDetails(licenseData);
      checkBetaDetails(licenseData);
      isTimeLimited = checkTimeLimited(licenseData);
      return licenseData;
    }
    function checkTimeLimited(licenseData) {
      var start = retProp("art$", licenseData);
      var end = retProp("end$", licenseData);
      validateTimeLimited(licenseData, start, end);
      return start != "" && end != "";
    }
    function validateTimeLimited(licenseData, start, end) {
      var resultCode = licenseData.result;
      switch (resultCode) {
        case -20:
          licenseData.e = parseDateString(start);
          break;
        case -21:
          licenseData.e = parseDateString(end);
          break;
      }
    }
    function checkOnlineActivationServerConnection(licenseData) {
      var a_try = parseInt(retProp("try$", licenseData), 10);
      var a_succ = parseInt(retProp("ucc$", licenseData), 10);
      var isBetaLicense = retProp("pe$", licenseData).match(/^B/);
      if (!isBetaLicense && a_try > 0 && a_succ == 0) {
        licenseData.result = -33;
      }
    }
    function checkOnlineDeactivation(licenseData) {
      var a_try = retProp("try$", licenseData);
      var a_succ = retProp("ucc$", licenseData);
      if (a_succ == 0) {
        licenseData.result = -38;
      }
    }
    function checkFloatingLicense(licenseData) {
      var license = retProp("ype$", licenseData);
      if (license == bD("RkxU") && !isServerRunning(licenseData)) {
        licenseData.result = -109;
      }
    }
    function checkTrialDetails(licenseData) {
      var resultCode = licenseData.result;
      if (resultCode !== -7) {
      } else if (tLD == 0) {
        licenseData.result = -106;
      } else {
        var tLDSoFar = retProp("^d", licenseData);
        if (tLDSoFar === undefined) {
          licenseData.result = -103;
          return;
        }
        var tDLeft = tLD - tLDSoFar;
        if (tDLeft > 0) {
          licenseData.result = 100;
          licenseData.tdl = tDLeft;
          licenseData.license = bD("VFJJQUw=");
        } else {
          licenseData.result = -100;
          licenseData.tdl = 0;
        }
      }
    }
    function checkBetaDetails(licenseData) {
      var result = licenseData.result;
      var isBetaLicense = retProp("pe$", licenseData).match(/^B/);
      if (
        (betaMode && isResultTrial(result)) ||
        result == -106 ||
        result == -7
      ) {
        licenseData.result = -107;
      } else {
        if (!betaMode && isBetaLicense) {
          licenseData.result = -105;
        }
      }
    }
    function isResultValidLicense(licenseData) {
      return true;
    }
    function isResultTrial(resultCode) {
      return false;
    }
    function isServerConfigured(licenseData) {
      try {
        var licenseServerIsConfigured = retProp("^L", licenseData).match(/^O/);
        return licenseServerIsConfigured;
      } catch (e) {}
    }
    function isServerRunning(licenseData) {
      try {
        var licenseServerIsConfigured = retProp("SS$", licenseData).match(/^U/);
        return licenseServerIsConfigured;
      } catch (e) {}
    }
    function trimQuotes(string) {
      string = string.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
      if (string[0] == "\'" && string[string.length - 1] == "\'") {
        string = string.substring(1, string.length - 1);
      }
      return string;
    }
    function sanitizeProductName(name) {
      return name.toString().replace(/[^a-z0-9]/gi, "");
    }
    function checkErrorCode(code) {
      if (licErrors.hasOwnProperty(code.toString())) {
        return code;
      } else {
        return "unknown";
      }
    }
    function string_encode3(str) {
      var encStr = 0;
      for (var i = 0; i < str.length; i += 1) {
        encStr = encStr + str.charCodeAt(i);
      }
      return encStr;
    }
    function getVerifCode3(lic) {
      var myRegArray = lic.split("*");
      if (myRegArray.length == 4) {
        var myLcns = myRegArray[3].replace(/^[0-9]+/, "");
        var code = myRegArray[3].match(/^[0-9]+/, "");
        var ranFront = code[0].substr(0, 2);
        var ranBack = code[0].substr(code[0].length - 2);
        var name =
          ranFront[0] +
          myRegArray[0] +
          ranFront[1] +
          myRegArray[1] +
          ranBack[0] +
          myRegArray[2] +
          ranBack[1] +
          myLcns;
        var tempKey = code[0].substring(2, code[0].length - 2);
        var nameEncode = string_encode3(name);
        var key = nameEncode * privateNum;
        if (key == tempKey) {
          return "1";
        } else {
          return "0";
        }
      } else {
        if (lic != bE("bad")) {
          alertButtonsUI(
            licErrors["-1"].title,
            strNewLicenseFormat,
            { name: strGetHelp, url: getHelpUrls.license_faq },
            { name: strOK },
          );
        }
        return "0";
      }
    }
    function string_encode(str) {
      return (
        str.length * str.charCodeAt(0) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.1)) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.2)) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.3)) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.4)) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.5)) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.7)) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.8)) +
        str.charCodeAt(Math.floor((str.length - 1) * 0.9)) +
        str.charCodeAt(str.length - 1)
      );
    }
    function check_v1_License(myReg) {
      var myRegArray = myReg.split("**");
      if (
        myReg
          .replace(/^ +|| +$/g, "")
          .match(/^.+\*\*.+\*\*[0-9]+[A-Za-z]{3}$/) &&
        myRegArray.length == 3
      ) {
        return true;
      } else {
        alertButtonsUI(
          licErrors["-1"].title,
          strOldLicenseFormat,
          { name: strGetHelp, url: getHelpUrls.license_faq },
          { name: strOK },
        );
        return false;
      }
    }
    function check_v2_License(myReg) {
      var myRegArray = myReg.split("*");
      return (
        myReg.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/) &&
        myRegArray.length == 4
      );
    }
    function check_timed_License(myReg) {
      var myRegArray = myReg.split("*");
      return (
        myReg.match(
          /^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[A-Z0-9#]+[A-Za-z]{3}[0-9]+$/,
        ) && myRegArray.length == 4
      );
    }
    function checkCode(doPrompt, myReg, privateNum) {
      if (myReg == undefined) {
        myReg = "";
      } else {
        myReg = myReg.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      myLcns = false;
      if (doPrompt) {
        regUI = licUI();
        myRegPrompt = regUI.show();
        if (!myRegPrompt) {
          return false;
        }
      }
      myReg = license == undefined ? myReg : license;
      var isLicServer = false;
      if (myReg.toLowerCase() == "@remote") {
        myReg = strHeader + myReg;
        isLicServer = true;
      }
      var myRegArray = myReg.split("*");
      var isTimeLimited = myReg.match(/#/);
      var isValidTimeLimited = isTimeLimited && check_timed_License(myReg);
      var isValidV2License = check_v2_License(myReg);
      var isValidTrialInitial = offerTrial && myReg.toLowerCase() == "trial";
      var goAhead =
        isValidTrialInitial ||
        isLicServer ||
        isValidV2License ||
        isValidTimeLimited;
      if (goAhead) {
        if (myReg.toLowerCase() != "trial" || isLicServer) {
          if (!isLicServer) {
            if (myRegArray[0] != null && myRegArray[0] != strHeader) {
              alertButtonsUI(
                strWrongProduct,
                "",
                { name: strGetHelp, url: getHelpUrls.license_faq },
                { name: strOK },
              );
              checkCode(doPrompt);
              return false;
            }
            var myLicenseMatch = myRegArray[3].match(/[A-Z]{3}[0-9]+$/);
            if (myLicenseMatch != null) {
              if (myLicenseMatch[0].match(bD("QlRB")) && !betaMode) {
                alertButtonsUI(
                  strBetaCodeAlert.title,
                  strBetaCodeAlert.detail,
                  { name: strGetHelp, url: getHelpUrls.license_faq },
                  { name: strOK },
                );
                saveSettings(prefsSectionName, prefsName, bE("bad"));
                checkCode(true);
                return false;
              }
              myLcns = true;
            }
          }
        }
        licenseValidity =
          licV == 2 ? getVerifCode(myReg) : getVerifCode3(myReg);
        if (isResultValidLicense(licenseValidity)) {
          isValidTrial =
            !isTimeLimited &&
            offerTrial &&
            myReg.toLowerCase() == "trial" &&
            isResultTrial(licenseValidity.result);
          if (doPrompt) {
            if (!isValidTrial) {
              var numUsers = parseInt(retProp("^n", licenseValidity), 10);
              var multiLicense =
                strFor + " " + numUsers + " " + numUsers > 1
                  ? strUsers
                  : strUser;
              var successAlert = betaMode
                ? strBTA + " "
                : "" + strRegSuccess + multiLicense + !betaMode &&
                    !isTimeLimited
                  ? "\n" + strRegSuccess1
                  : "\n" + strScriptName;
              if (isTimeLimited) {
                var licenseEnd = parseDateString(
                  retProp("nd$", licenseValidity),
                );
                successAlert += "\n\n" + strLicenseEnds + licenseEnd;
              }
              if (!myReg.match(/@remote/i)) {
                alert(successAlert);
              }
            }
          }
          myLcns = true;
        } else {
          if (!doPrompt) {
            doPrompt = true;
          }
          var errDetail =
            "e" in licenseValidity ? "\n" + licenseValidity.e : "";
          var url = licErrors[checkErrorCode(licenseValidity.result)].url;
          if (url == getHelpUrls.open_ticket) {
            url = createSupportTicket({
              message:
                licErrors[checkErrorCode(licenseValidity.result)].detail +
                errDetail,
              subject:
                "License Error " +
                licenseValidity.result +
                " - " +
                licErrors[checkErrorCode(licenseValidity.result)].title,
            });
          }
          alertButtonsUI(
            licErrors[checkErrorCode(licenseValidity.result)].title +
              " (" +
              licenseValidity.result +
              ")",
            licErrors[checkErrorCode(licenseValidity.result)].detail +
              errDetail,
            { name: strGetHelp, url: url },
            { name: strOK },
          );
          if (licenseValidity.result == -9) {
            if (confirm(strReset + "?")) {
              getVerifCode("-");
            }
          }
          checkCode(doPrompt);
          return myLcns;
        }
      } else {
        if (myReg.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
          var goToUrl = confirm(strTempCode);
          if (isSecurityPrefSet() && goToUrl) {
            openURL(exchangeUrl + "?serial=" + myReg);
          }
          return myLcns;
        } else {
          alertButtonsUI(
            strInvalidCode,
            !betaMode
              ? strNewLicenseFormat
              : strNewLicenseFormat.replace(
                  new RegExp(bD("U1VM"), "g"),
                  bD("QlRB"),
                ),
            { name: strGetHelp, url: getHelpUrls.license_faq },
            { name: strOK },
          );
          saveSettings(prefsSectionName, prefsName, bE("bad"));
          saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
          saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
          checkCode(true);
          return myLcns;
        }
      }
      return myLcns;
    }
    function checkForLegacyLic() {
      var myReg = haveSettings(prefsSectionName, prefsName)
        ? bD(getSettings(prefsSectionName, prefsName))
        : "";
      var license = check_v2_License(myReg) ? myReg : "";
      return license;
    }
    function trial_expired() {
      var goToUrl = confirm(strExpiredAlert);
      if (isSecurityPrefSet() && goToUrl) {
        openURL(strTrialUrl);
      } else {
        if (goToUrl && isAE()) {
          alert(strErrScriptAccess);
        }
      }
    }
    function bD(input) {
      var output = "";
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var key =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      while (i < input.length) {
        enc1 = key.indexOf(input.charAt(i++));
        enc2 = key.indexOf(input.charAt(i++));
        enc3 = key.indexOf(input.charAt(i++));
        enc4 = key.indexOf(input.charAt(i++));
        chr1 = (enc1 << 2) | (enc2 >> 4);
        chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
        chr3 = ((enc3 & 3) << 6) | enc4;
        output = output + String.fromCharCode(chr1);
        if (enc3 != 64) {
          output = output + String.fromCharCode(chr2);
        }
        if (enc4 != 64) {
          output = output + String.fromCharCode(chr3);
        }
      }
      return output;
    }
    function bE(input) {
      var output = "";
      var i = 0;
      var key =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      while (i < input.length) {
        chr1 = input.charCodeAt(i++);
        chr2 = input.charCodeAt(i++);
        chr3 = input.charCodeAt(i++);
        enc1 = chr1 >> 2;
        enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
        enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
        enc4 = chr3 & 63;
        if (isNaN(chr2)) {
          enc3 = enc4 = 64;
        } else {
          if (isNaN(chr3)) {
            enc4 = 64;
          }
        }
        output =
          output +
          key.charAt(enc1) +
          key.charAt(enc2) +
          key.charAt(enc3) +
          key.charAt(enc4);
      }
      return output;
    }
    function isSecurityPrefSet() {
      var prefSection =
        parseFloat(app.version) < 12
          ? "Main Pref Section"
          : "Main Pref Section v2";
      var securitySetting = app.preferences.getPrefAsLong(
        prefSection,
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return securitySetting == 1;
    }
    function openURL(url) {
      url = url.toString();
      if (!url.match(/@/) && !url.match(/^https?:\/\//)) {
        url = "http://" + url.replace(/^(http)?s?:?\/?\/?/, "");
      }
      if (isAE() || isPS()) {
        var winBrowserCmd = "start ";
        var macBrowserCmdStart = 'open "';
        var macBrowserCmdEnd = '"';
        if ($.os.indexOf("Windows") != -1) {
          url = url.replace(/&/g, "^&");
          command = 'cmd /c "' + winBrowserCmd + url + '"';
          systemCall(command);
        } else {
          command = macBrowserCmdStart + url + macBrowserCmdEnd;
          systemCall(command);
        }
      } else {
        var tempOutputFile = File(Folder.temp.fullName + "/openUrl.url");
        var f = createFile(
          tempOutputFile,
          "[InternetShortcut]\rURL=" + url + "\r",
          "UTF-8",
          true,
        );
        f.execute();
      }
    }
    function parseRegistration(s) {
      result = retProp("^r", licenseValidity);
      if (result == 0) {
        regFirstName = retProp("^f", licenseValidity);
        regLastName = retProp("^la", licenseValidity);
        numUsers = retProp("^n", licenseValidity);
        license = retProp("pe$", licenseValidity);
        if (isTimeLimited) {
          licenseStart = parseDateString(retProp("rt$", licenseValidity));
          licenseEnd = parseDateString(retProp("nd$", licenseValidity));
        }
        if (s > 0) {
          return (
            regFirstName +
            "\'" +
            regLastName +
            "\'" +
            retProp("^s", licenseValidity) +
            license +
            numUsers
          );
        }
        regName =
          regFirstName + regLastName.toString().match(/^@/)
            ? ""
            : " " + regLastName + " ";
        regLicense = license;
      } else {
        regName = "";
      }
      var multiLicense =
        strFor + " " + numUsers + " " + numUsers > 1 ? strUsers : strUser;
      switch (regLicense) {
        case bD("U1VM"):
          myLcns = " - " + strLicense + " " + multiLicense;
          break;
        case bD("QlRB"):
          myLcns = " - " + strBTA + " " + multiLicense;
          break;
        case bD("RURV"):
          myLcns = " - " + strEDU + " " + multiLicense;
          break;
        case bD("RkxU"):
          myLcns = " - " + strFLT + " " + multiLicense;
          break;
        default:
          tdl = retProp("^t", licenseValidity);
          if (!isTimeLimited) {
            if (tdl < 1) {
              myLcns = strTrialExpired;
            } else {
              myLcns = strTrialTxt.replace(/%E/, tdl);
            }
          }
          break;
      }
      regHeader = regName != "" ? strRegistration + regName + myLcns : myLcns;
      if (isTimeLimited) {
        regHeader += "\n" + strLicenseEnds + licenseEnd;
      }
      return regHeader;
    }
    function parseDateString(str) {
      var parts = str.toString().split("-");
      return new Date(
        parseInt(parts[0]),
        parseInt(parts[1] - 1),
        parseInt(parts[2]),
      ).toDateString();
    }
    function retProp(s, o) {
      for (var i in o) {
        if (o.hasOwnProperty(i)) {
          if (i.toString().match(new RegExp(s))) {
            return o[i];
          }
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
    function readFile(file) {
      if (file != undefined && file != null && file.exists && file.open("r")) {
        var string = file.read();
        file.close();
        return string;
      } else {
        return null;
      }
    }
    function createFile(file, encodedStr, encoding, overwrite, isVisible) {
      if ((file != undefined && file != null && !file.exists) || overwrite) {
        if (file.exists) {
          file.remove();
        }
        file =
          $.os.indexOf("Win") != -1
            ? new File(file.fullName)
            : new File(file.absoluteURI);
        file.encoding = encoding;
        file.open("w");
        file.write(encodedStr);
        file.close();
        if (isVisible == undefined || !isVisible) {
          file.hidden = true;
        }
        if ($.os.indexOf("Mac") != -1) {
          systemCall(bD("Y2htb2QgK3gg") + file.absoluteURI);
        }
      }
      return file;
    }
    function systemCall(command) {
      if (isAE()) {
        return system.callSystem(command);
      }
      if (isPS()) {
        var tempOutputFileName =
          $.os.indexOf("Win") != -1
            ? Folder.temp.fsName
            : Folder.temp.absoluteURI +
              "/" +
              Math.round(Math.random() * new Date().getTime() * 71827);
        app.system(command + " > " + tempOutputFileName);
        return readFile(File(tempOutputFileName));
      }
      return "";
    }
    function parseSettings(needle, obj) {
      for (var property in obj) {
        if (obj.hasOwnProperty(property)) {
          if (typeof obj[property] == "object") {
            return parseSettings(needle, obj[property]);
          } else {
            if (property === needle) {
              return obj[property];
            }
          }
        }
      }
    }
    function readJSON(json) {
      if (json == undefined || json == null) {
        return false;
      }
      if (!(json instanceof File)) {
        File(json);
      }
      var string = readFile(json);
      return JSONify(string, "parse");
    }
    function writeJSON(obj, file) {
      if (
        obj == undefined ||
        obj == null ||
        file == undefined ||
        file == null
      ) {
        return false;
      }
      if (!(file instanceof File)) {
        File(file);
      }
      var prettyJSON = "\t";
      createFile(
        file,
        JSONify(obj, "stringify", prettyJSON),
        "UTF-8",
        true,
        true,
      );
      return file.exists;
    }
    function getSettings(header, name, type) {
      if (isAE() && type != "settings") {
        return app.settings.getSetting(header, name);
      } else {
        var prefFile = File(prefsLocation + prefsPrefix + File.encode(header));
        var prefString = readFile(prefFile);
        var pref = JSONify(prefString, "parse");
        if (pref instanceof Array) {
          pref = fixSettingsFile(pref);
          prefFile.remove();
          for (var i in pref) {
            saveSettings(header, i, pref[i]);
          }
        }
        return pref[name];
      }
    }
    function haveSettings(header, name, type) {
      if (isAE() && type != "settings") {
        return app.settings.haveSetting(header, name);
      } else {
        var prefFile = File(prefsLocation + prefsPrefix + File.encode(header));
        var prefString = readFile(prefFile);
        if (prefString != null) {
          var pref = JSONify(prefString.toString(), "parse");
          if (pref instanceof Array) {
            pref = fixSettingsFile(pref);
          }
          return name in pref;
        } else {
          return false;
        }
      }
    }
    function fixSettingsFile(a) {
      var newObj = {};
      for (var i = 0; i < a.length - 1; i += 1) {
        newObj[a[i]] = a[i + 1];
        i++;
      }
      return newObj;
    }
    function saveSettings(header, name, value, type) {
      if (isAE() && type != "settings") {
        app.settings.saveSetting(header, name, value);
        app.preferences.saveToDisk();
      } else {
        var pref = {};
        var prefFile = File(prefsLocation + prefsPrefix + File.encode(header));
        if (prefFile.exists) {
          var prefString = readFile(prefFile);
          if (prefString != null) {
            pref = JSONify(prefString.toString(), "parse");
          }
        }
        if (pref instanceof Array) {
          pref = fixSettingsFile(pref);
        }
        pref[name] = value;
        var prettyJSON = "\t";
        createFile(
          File(prefsLocation + prefsPrefix + File.encode(header)),
          JSONify(pref, "stringify", prettyJSON),
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
      saveVersionsToPrefs;
      if (
        typeof licenseValidity == "undefined" ||
        !licenseValidity.hasOwnProperty("result")
      ) {
        licenseValidity = getVerifCode("");
      }
      return (
        isResultValidLicense(licenseValidity) &&
        isResultTrial(licenseValidity.result)
      );
    }
    function getRegistration(val) {
      saveVersionsToPrefs;
      if (
        typeof licenseValidity == "undefined" ||
        !licenseValidity.hasOwnProperty("result")
      ) {
        licenseValidity = getVerifCode("");
      }
      return parseRegistration(val);
    }
    function removeLic() {
      saveVersionsToPrefs;
      if (
        typeof licenseValidity == "undefined" ||
        !licenseValidity.hasOwnProperty("result")
      ) {
        licenseValidity = getVerifCode("");
      }
      var command =
        isServerConfigured(licenseValidity) && isServerRunning(licenseValidity)
          ? strHeader + "@REMOTE"
          : "";
      var isBetaLicense = retProp("ype$", licenseValidity).match(/^B/) != null;
      theLcs = false;
      licenseValidity = getVerifCode("-" + command);
      if (!isBetaLicense) {
        checkOnlineDeactivation(licenseValidity);
        if (licenseValidity.result != "-100") {
          alertButtonsUI(
            licErrors[checkErrorCode(licenseValidity.result)].title +
              " (" +
              licenseValidity.result +
              ")",
            licErrors[checkErrorCode(licenseValidity.result)].detail,
            {
              name: strGetHelp,
              url: licErrors[checkErrorCode(licenseValidity.result)].url,
            },
            { name: strOK },
          );
        } else {
          alert(
            strLicense + " " + strRemovedAndDeactivated + "\n" + strScriptName,
          );
        }
      } else {
        alert(strLicense + " " + strRemoved + "\n" + strScriptName);
      }
      if (!isServerConfigured(licenseValidity)) {
        saveSettings(prefsSectionName, prefsName, bE("bad"));
        saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
        saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
      }
      return !theLcs;
    }
    function checkTempFolderAvailability() {
      var folderToUse = null;
      try {
        testFolder = Folder.temp.fullName;
      } catch (e) {}
      try {
        testFolder = Folder.temp.fsName;
      } catch (e) {}
      return testFolder;
    }
    function checkFoldersAvailability() {
      var folderToUse = null;
      var testFolder = "";
      try {
        testFolder = Folder.appData.fullName;
        folderToUse = Folder.appData;
      } catch (e) {}
      try {
        testFolder = Folder.appPackage.fullName;
        folderToUse = Folder.appPackage;
      } catch (e) {}
      try {
        testFolder = Folder.commonFiles.fullName;
        folderToUse = Folder.commonFiles;
      } catch (e) {}
      try {
        testFolder = Folder.temp.fullName;
        folderToUse = Folder.temp;
      } catch (e) {}
      try {
        testFolder = Folder.myDocuments.fullName;
        folderToUse = Folder.myDocuments;
      } catch (e) {}
      try {
        testFolder = Folder.userData.fullName;
        folderToUse = Folder.userData;
      } catch (e) {}
      return folderToUse;
    }
    function userDataAccessCheck() {
      if (globalPrefsFolder == null) {
        var title =
          strScriptName +
          " is unable to continue as it can\'t access the file system.\n";
        var detail = "";
        var url = "";
        if ($.os.indexOf("Windows") == -1) {
          detail +=
            "A possible cause is Dropbox\'s \'Backup This Mac\' feature. If you\'re using this, try disabling Dropbox backup of your Desktop, then restart After Effects and try again\n\n";
          detail += "Click on " + strGetHelp + " below for more assistance";
          url =
            "https://aescripts.com/knowledgebase/index/view/faq/dropbox-macos-warning/";
        } else {
          detail +=
            "Please make sure you do not have any firewalls or virus software blocking access to the ~/AppData/Roaming folder";
          url = createSupportTicket({ subject: title });
        }
        alertButtonsUI(
          title,
          detail,
          { name: strGetHelp, url: url },
          { name: strOK },
        );
        return false;
      } else {
        return true;
      }
    }
    function mainFunc(cmd) {
      if (isAE() && !isSecurityPrefSet()) {
        alert(strErrScriptAccess);
        if (parseFloat(app.version) < 16.1) {
          app.executeCommand(2359);
        } else {
          app.executeCommand(3131);
        }
        if (!isSecurityPrefSet()) {
          return;
        }
      }
      if (!userDataAccessCheck()) {
        return;
      }
      if (!curvaIsNotRunning()) {
        return;
      }
      prefsLocation = globalPrefsFolder.fullName + "/Aescripts/";
      if (!isAE() && !Folder(prefsLocation).exists) {
        Folder(prefsLocation).create();
      }
      if (betaMode && checkBeta(betaExpirationDate, betaStartDate)) {
        if (cmd == "l") {
          alert(strBetaExpiredAlert);
        }
        return;
      }
      if (cmd == "l" || cmd == "c" || cmd == "r") {
        var doPrompt = false;
        if (cmd == "l" && doUpdateCheck) {
          checkForNewVersion();
        }
        if (licV == 2) {
          if (cmd == "r") {
            theLcs = !removeLic();
          } else {
            licenseValidity = getVerifCode("");
            if (licenseValidity.result == "-22") {
              var errDetail =
                "e" in licenseValidity ? "\n" + licenseValidity.e : "";
              alertButtonsUI(
                licErrors[checkErrorCode(licenseValidity.result)].title +
                  " (" +
                  licenseValidity.result +
                  ")",
                licErrors[checkErrorCode(licenseValidity.result)].detail +
                  errDetail,
                {
                  name: strGetHelp,
                  url: licErrors[checkErrorCode(licenseValidity.result)].url,
                },
                { name: strOK },
              );
              getVerifCode("-");
              doPrompt = true;
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
            } else {
              myReg = checkForLegacyLic();
              if (myReg == "") {
                doPrompt = true;
                myReg =
                  isServerConfigured(licenseValidity) &&
                  isServerRunning(licenseValidity)
                    ? "@REMOTE"
                    : "trial";
              }
              theLcs = checkCode(doPrompt, myReg, privateNum);
            }
          }
        } else {
          if (haveSettings(prefsSectionName, prefsName)) {
            myReg = getSettings(prefsSectionName, prefsName);
            if (
              ((cmd != "c" && myReg == "bad") ||
                bD(myReg) == "bad" ||
                offerTrial) &&
              bD(myReg) == "trial"
            ) {
              doPrompt = true;
            } else {
              doPrompt = false;
            }
          } else {
            if (cmd == "c") {
              myReg = !isTimeLimited && offerTrial ? "trial" : "";
              saveSettings(prefsSectionName, prefsName, bE(myReg));
              saveSettings(
                prefsSectionName,
                prefsVersionName,
                strScriptVersion,
              );
              saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
              doPrompt = false;
            } else {
              doPrompt = true;
            }
          }
          theLcs = checkCode(doPrompt, myReg, privateNum);
        }
        return theLcs;
      }
    }
    var mx = __BLOB__BLOB_000383__;
    var wx = __BLOB__BLOB_000384__;
    var strTempCode = localize({
      de:
        "Du hast eine tempor\xe4re Seriennummer eingegeben, die gegen eine permanente Lizenz eingetauscht werden muss.\n\nSobald Du eine permanente Lizenz erhalten hast, kannst Du sie verwenden um " +
        strScriptName +
        " zu registrieren.  Der Austausch ist schnell und unkompliziert, gehe einfach auf:\n\n" +
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
        "Vous avez entr\xe9 un num\xe9ro de s\xe9rie temporaire devant \xeatre \xe9chang\xe9 contre une licence permanente.\n\nQuand vous aurez obtenu votre licence permanente, vous pourrez l\'utiliser pour enregistrer " +
        strScriptName +
        ".  Faire cet \xe9change est rapide et facile! Allez simplement \xe0:\n\n" +
        exchangeUrl +
        "\n\nVoulez-vous y aller maintenant?",
      it:
        "Hai inserito un numero di serie temporaneo che deve essere sostituito con uno permanente.\nUna volta ottenuto il numero di serie permanente lo potrai utilizzare per registrare " +
        strScriptName +
        ". La sostituzione \xe8 facile e veloce, basta visitare:\n\n" +
        exchangeUrl +
        "\n\nVuoi farlo ora?",
      ja:
        "\u901a\u5e38\u30e9\u30a4\u30bb\u30f3\u30b9\u3068\u4ea4\u63db\u3059\u308b\u5fc5\u8981\u304c\u3042\u308b\u4e00\u6642\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u5165\u529b\u3055\u308c\u307e\u3057\u305f.\n\n\u901a\u5e38\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u4e00\u65e6\u5165\u624b\u3059\u308c\u3070, " +
        strScriptName +
        "\u3092\u767b\u9332\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059.  \u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u4ea4\u63db\u306f\u6b21\u306eURL\u306b\u3066\u7c21\u5358\u306b\u884c\u3048\u307e\u3059:\n\n" +
        exchangeUrl +
        "\n\nURL\u3092\u958b\u304d\u307e\u3059\u304b?",
      kr:
        "\uc601\uad6c\uc801\uc778 \ub77c\uc774\uc13c\uc2a4\ub97c \uc0ac\uc6a9\ud558\uae30 \uc704\ud574 \uc784\uc2dc\uc801\uc778 \uc2dc\ub9ac\uc5bc \ub118\ubc84\ub97c \uc0ac\uc6a9\ud558\uc5ec \ub85c\uadf8\uc778\ud558\uc600\uc2b5\ub2c8\ub2e4.\n\n\uc0ac\uc6a9\ub4f1\ub85d\uc744 \uc704\ud55c \uc601\uad6c\uc801\uc778 \ub77c\uc774\uc13c\uc2a4\ub97c \ubc1b\uc558\uc2b5\ub2c8\ub2e4. " +
        strScriptName +
        ". \uc27d\uace0 \ube60\ub978 \uad50\ud658\uc785\ub2c8\ub2e4. \uac04\ub2e8\ud558\uac8c:\n\n" +
        exchangeUrl +
        "\n\n\uc6d0\ud558\uc2dc\ub294 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
      pt:
        "Voc\xea colocou um n\xfamero de s\xe9rie tempor\xe1rio que precisa ser trocado por uma licen\xe7a permanente.\n\nAssim que tiver a licen\xe7a permanente, use-a para registrar " +
        strScriptName +
        ".  \xc9 f\xe1cil e r\xe1pido de mud\xe1-la, simplesmente acesse:\n\n" +
        exchangeUrl +
        "\n\nGostaria de acessar agora?",
      zh_CN:
        "\u60a8\u8f93\u5165\u7684\u4e34\u65f6\u5e8f\u5217\u53f7\u9700\u8981\u66ff\u6362\u4e3a\u6c38\u4e45\u5e8f\u5217\u53f7\u3002\n\n\u4e00\u65e6\u60a8\u83b7\u5f97\u4e86\u6c38\u4e45\u5e8f\u5217\u53f7\uff0c\u60a8\u53ef\u4ee5\u4f7f\u7528\u5b83\u6765\u6ce8\u518c " +
        strScriptName +
        "\u3002\u5e8f\u5217\u53f7\u7684\u66f4\u6362\u662f\u65b9\u4fbf\u548c\u5feb\u6377\u7684\uff0c\u53ea\u9700\u8bbf\u95ee:\n\n" +
        exchangeUrl +
        "\n\n\u60a8\u73b0\u5728\u60f3\u8981\u524d\u5f80\u5417\uff1f",
    });
    var licensingVersion = "4.0.3";
    if (vars.scriptName == undefined) {
      alert("scriptName variable missing in settings object");
    }
    var strScriptName = vars.scriptName;
    if (vars.scriptVersion == undefined) {
      alert("scriptVersion variable missing in settings object");
    }
    var strScriptVersion = vars.scriptVersion;
    if (vars.scriptURL == undefined) {
      alert("scriptURL variable missing in settings object");
    }
    var strTrialUrl = vars.scriptURL;
    if (vars.privateNumber == undefined) {
      alert("privateNumber variable missing in settings object");
    }
    var privateNum = vars.privateNumber;
    if (vars.productSKU == undefined) {
      alert("productSKU variable missing in settings object");
    }
    var strSKU = vars.productSKU;
    var strSKUArray = strSKU.toString().split("-");
    if (strSKUArray == null || strSKUArray.length != 2) {
      alert(
        "Product SKU incorrectly entered in settings. Should looks like this: XXXX-SUL",
      );
      return false;
    }
    var supportTicketSKU = vars.hasOwnProperty("supportTicketSKU")
      ? vars.supportTicketSKU
      : "";
    if (vars.helpText == undefined) {
      vars.helpText = "";
    }
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
        "D\xe9sol\xe9, la p\xe9riode d\'essai est expir\xe9e.\nVous pouvez acheter une licence en visitant " +
        strTrialUrl +
        "\n\nVoulez-vous ouvrir cette page maintenant?",
      it:
        "Siamo spiacenti, questa versione di prova \xe8 scaduta. \nPuoi acquistare una licenza visitando " +
        strTrialUrl +
        "\n\nVuoi farlo ora?",
      ja:
        "\u3053\u306e\u30c8\u30e9\u30a4\u30a2\u30eb\u7248\u306e\u8a66\u7528\u671f\u9593\u306f\u7d42\u4e86\u3057\u307e\u3057\u305f. \n\u6b21\u306eURL\u306b\u3066\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u8cfc\u5165\u3059\u308b\u3053\u3068\u304c\u3067\u304d\u307e\u3059 " +
        strTrialUrl +
        "\n\nURL\u3092\u958b\u304d\u307e\u3059\u304b?",
      kr:
        "kr: \uc8c4\uc1a1\ud569\ub2c8\ub2e4. \uc774 \uc2dc\ud5d8\ud310\uc740 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4. \n\ub77c\uc774\uc13c\uc2a4\ub97c \uc774\uacf3\uc5d0\uc11c \uad6c\uc785\ud558\uc2e4 \uc218 \uc788\uc2b5\ub2c8\ub2e4. " +
        strTrialUrl +
        "\n\n\uc6d0\ud558\uc2dc\ub294 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9\ud558\uc2dc\uaca0\uc2b5\ub2c8\uae4c?",
      pt:
        "Desculpe, essa vers\xe3o de teste expirou. \nVoc\xea pode comprar a licen\xe7a em " +
        strTrialUrl +
        "\n\nGostaria de acessar agora?",
      zh_CN:
        "\u5bf9\u4e0d\u8d77\uff0c\u8bd5\u7528\u7248\u5df2\u7ecf\u8fc7\u671f\u3002\n\u60a8\u53ef\u4ee5\u5728 " +
        strTrialUrl +
        " \u8d2d\u4e70\u4e00\u4e2a\u8bb8\u53ef\u8bc1\u3002\n\n\u60a8\u73b0\u5728\u60f3\u8981\u524d\u5f80\u5417\uff1f",
    });
    if (vars.helpButtons == undefined) {
      vars.helpButtons = [];
    }
    var isTimeLimited =
      vars.hasOwnProperty("isTimeLimited") && vars.isTimeLimited;
    var strHeader = strSKUArray[0];
    var betaSupportEmail = vars.hasOwnProperty("betaSupportEmail")
      ? vars.betaSupportEmail
      : "";
    var offerTrial = vars.hasOwnProperty("offerTrial") ? vars.offerTrial : true;
    var tLD = vars.hasOwnProperty("tLDXX")
      ? vars.tLDX
      : Math.round(Math.sqrt(parseInt(bD("NTU3Ng==").substr(0, 2))));
    var betaMode = vars.hasOwnProperty("offerBeta") ? vars.offerBeta : false;
    if (betaMode) {
      if (vars.betaStartDate == undefined) {
        alert("betaStartDate variable missing in settings object");
      }
      var betaStartDate = vars.betaStartDate;
      if (vars.betaExpirationDate == undefined) {
        alert("betaExpirationDate variable missing in settings object");
      }
      var betaExpirationDate = vars.betaExpirationDate;
    }
    var strBetaExpiredAlert = localize({
      de: "Die Betaversion ist leider abgelaufen",
      en: "Sorry, this beta version has expired",
      es: "Lo siento est\xe1 versi\xf3n beta ha expirado",
      fr: "D\xe9sol\xe9, cette version beta est expir\xe9e",
      it: "Siamo spiacenti, questa version beta \xe8 scaduta",
      ja: "\u30d9\u30fc\u30bf\u7248\u306e\u671f\u9650\u306f\u7d42\u4e86\u3057\u307e\u3057\u305f",
      kr: "\uc8c4\uc1a1\ud569\ub2c8\ub2e4. \uc774 \ubca0\ud0c0\ubc84\uc804\uc740 \uae30\ud55c\uc774 \ub9cc\ub8cc\ub418\uc5c8\uc2b5\ub2c8\ub2e4.",
      pt: "Desculpe, essa vers\xe3o beta expirou",
      zh_CN:
        "\u5bf9\u4e0d\u8d77\uff0c\u6b64 Beta \u7248\u672c\u5df2\u7ecf\u8fc7\u671f",
    });
    var tLD = vars.hasOwnProperty("tLDXX")
      ? vars.tLDX
      : Math.round(Math.sqrt(parseInt(bD("MTAwMTA=").substr(0, 3))));
    var supportEmail =
      vars.hasOwnProperty("externalSupportURL") && vars.externalSupportURL != ""
        ? vars.externalSupportURL
        : "https://aescripts.com/contact";
    if (betaMode && betaSupportEmail != "") {
      supportEmail = betaSupportEmail;
    }
    var aescriptsSupportUrl = "https://aescripts.com/contact";
    var supportUrl =
      vars.hasOwnProperty("externalSupportURL") && vars.externalSupportURL != ""
        ? vars.externalSupportURL
        : aescriptsSupportUrl;
    var isAescriptsSupportUrl =
      supportUrl === aescriptsSupportUrl ? true : false;
    if (isAescriptsSupportUrl) {
      supportUrl = supportUrl.replace(/\/*/, "") + "/?direct=1&sku=";
    }
    var aescriptsRetrieveUrl =
      "https://aescripts.com/downloadable/customer/products";
    var retrieveUrl =
      vars.hasOwnProperty("retrieveLicenseURL") && vars.retrieveLicenseURL != ""
        ? vars.retrieveLicenseURL
        : aescriptsRetrieveUrl;
    var strBetaCodeAlert = {
      detail: localize({
        de: "Beta Lizenzen k\xf6nnen nur f\xfcr Betaversionen verwendet werden. Bitte verwende eine normale Lizenz f\xfcr diese Version.",
        en: "Beta license codes can only be used on beta versions, please obtain a normal license to use this version.",
        es: "Las licencias beta s\xf3lo pueden ser usadas con versiones beta, por favor obtenga una licencia normal para usar esta versi\xf3n.",
        fr: "Les codes pour licence beta ne peuvent \xeatre utilis\xe9s que pour les versions beta, merci de demander une licence r\xe9guli\xe8re pour utiliser cette version.",
        it: "Le Licenze beta possono solo essere usate con versioni beta, si prega di ottenere una licenza regolare da utilizzare con questa versione.",
        ja: "\u30d9\u30fc\u30bf\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u30d9\u30fc\u30bf\u7248\u306e\u307f\u306b\u4f7f\u3046\u3053\u3068\u304c\u51fa\u6765\u307e\u3059. \u3053\u306e\u30d0\u30fc\u30b8\u30e7\u30f3\u3092\u4f7f\u7528\u3059\u308b\u305f\u3081\u306b\u306f, \u901a\u5e38\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u5165\u624b\u3057\u3066\u304f\u3060\u3055\u3044.",
        kr: "\ubca0\ud0c0\ub77c\uc774\uc13c\uc2a4 \ucf54\ub4dc\ub294 \ubca0\ud0c0\ubc84\uc804\uc5d0\ub9cc \uc0ac\uc6a9\uc774 \uac00\ub2a5\ud558\uba70, \uc774 \ubc84\uc804\uc758 \uc0ac\uc6a9\uc744 \uc6d0\ud558\uc2dc\uba74 \uc77c\ubc18\uc801\uc778 \ub77c\uc774\uc13c\uc2a4\ub97c \ub2e4\uc6b4\ub85c\ub4dc \ud558\uc2ed\uc2dc\uc624.",
        pt: "Licen\xe7a beta s\xf3 pode ser usada para vers\xf5es beta, por favor adquira uma licen\xe7a normal para usar com essa vers\xe3o.",
        zh_CN:
          "Beta \u8bb8\u53ef\u8bc1\u53ea\u80fd\u7528\u4e8e Beta \u7248\u672c\uff0c\u8bf7\u8d2d\u4e70\u4e00\u4e2a\u6b63\u5f0f\u8bb8\u53ef\u8bc1\u6765\u4f7f\u7528\u6b64\u7248\u672c\u3002",
      }),
      title: localize({
        de: "Beta Lizenz erkannt f\xfcr " + strScriptName,
        en: "Beta license code detected for " + strScriptName,
        es: "Licencia beta detectada para " + strScriptName,
        fr: "Licence beta d\xe9tect\xe9e pour " + strScriptName,
        it: "Licenza beta rilevata per " + strScriptName,
        ja:
          strScriptName +
          "\u306e\u30d9\u30fc\u30bf\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u691c\u51fa\u3055\u308c\u307e\u3057\u305f",
        kr:
          "\ubca0\ud0c0 \ub77c\uc774\uc13c\uc2a4\ub294 \uc9c4\ub2e8\ucc98\ub9ac\ub85c \ucc98\ub9ac\ud569\ub2c8\ub2e4. " +
          strScriptName,
        pt: "Licen\xe7a beta detectada para " + strScriptName,
        zh_CN:
          "\u68c0\u6d4b\u5230 " +
          strScriptName +
          " \u7684 Beta \u7248\u672c\u8bb8\u53ef\u8bc1",
      }),
    };
    var exchangeUrl = "https://license.aescripts.com/exchange";
    var useLegacyPrefsHeader = vars.hasOwnProperty("useLegacyPrefsHeader")
      ? vars.useLegacyPrefsHeader
      : false;
    var managerAppUrl =
      "https://aescripts.com/learn/aescripts-aeplugins-manager-app/";
    var remindMeLaterDays = 7;
    var doUpdateCheck = vars.hasOwnProperty("doUpdateCheck")
      ? vars.doUpdateCheck
      : true;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    $.locale = isAE() ? app.isoLanguage : $.locale;
    var locale = $.locale.split("_")[0];
    if (locale != "fr" || locale != "de" || locale != "es") {
      locale = "en";
    }
    var prefsSectionName = vars.hasOwnProperty("legacyPrefsGroup")
      ? vars.legacyPrefsGroup
      : "aescripts";
    var strBetaLicReq = localize({
      de: "F\xfcr diese Betaversion wird eine Lizenz ben\xf6tigt.\nBitte kontaktiere den Autor f\xfcr eine Betatester-Lizenz.",
      en: "A license is required to run this beta version\nPlease contact the author for a beta testing license.",
      es: "Es necesaria una licencia para utilizar esta versi\xf3n beta.\nPor favor, p\xf3ngase en contacto con el autor para obtener una licencia beta.",
      fr: "Une licence est requise pour ex\xe9cuter cette version beta\nMerci de contacter l\'auteur pour une licence beta.",
      it: "Una licenza \xe8 necessaria per utilizzare questa versione beta\nSi prega di contattare l\'autore per una licenza beta.",
      ja: "\u3053\u306e\u30d9\u30fc\u30bf\u7248\u3092\u4f7f\u3046\u305f\u3081\u306b\u306f\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u5fc5\u8981\u3067\u3059.\n\u30d9\u30fc\u30bf\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u88fd\u4f5c\u8005\u306b\u554f\u3044\u5408\u308f\u305b\u3066\u304f\u3060\u3055\u3044.",
      kr: "\ub77c\uc774\uc13c\uc2a4\ub294 \ubca0\ud0c0\ubc84\uc804 \uc774\uc6a9\uc2dc\uc5d0 \ud544\uc694\ud569\ub2c8\ub2e4.\n\ub77c\uc774\uc13c\uc2a4 \ud14c\uc2a4\ud2b8\ub97c \uc6d0\ud558\uc2dc\uba74 \uc800\uc790\uc5d0\uac8c \uc5f0\ub77d \ubd80\ud0c1\ub4dc\ub9bd\ub2c8\ub2e4.",
      pt: "\xc9 necess\xe1ria uma licen\xe7a para utilizar essa vers\xe3o beta.\nPor favor entre em contato com o autor para receber uma licen\xe7a beta.",
      zh_CN:
        "\u6b64 Beta \u7248\u672c\u9700\u8981\u8bb8\u53ef\u8bc1\u624d\u80fd\u8fd0\u884c\u3002\n\u8bf7\u8054\u7cfb\u4f5c\u8005\u83b7\u53d6 Beta \u7248\u672c\u7684\u6d4b\u8bd5\u8bb8\u53ef\u8bc1\u3002",
    });
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
    var strFor = localize({
      de: "f\xfcr",
      en: "for",
      es: "para",
      fr: "pour",
      it: "per",
      ja: "\u3078",
      kr: "\uc704\ud55c",
      pt: "para",
      zh_CN: "\u4e3a",
    });
    var doUpdateCheckDisabledAlertAlreadyIssued = false;
    if (haveSettings(prefsSectionName, prefsDoUpdateCheck)) {
      doUpdateCheckDisabledAlertAlreadyIssued = !(
        getSettings(prefsSectionName, prefsDoUpdateCheck) == "false"
      );
    }
    var globalPrefsFolder = checkFoldersAvailability();
    var strUser = localize({
      de: "Nutzer",
      en: "user",
      es: "usuario",
      fr: "utilisateur",
      it: "utente",
      ja: "\u30e6\u30fc\u30b6\u30fc",
      kr: "\uc0ac\uc6a9\uc790",
      pt: "usu\xe1rio",
      zh_CN: "\u7528\u6237",
    });
    var strUsers = localize({
      de: "Nutzer",
      en: "users",
      es: "usuarios",
      fr: "utilisateurs",
      it: "utenti",
      ja: "\u30e6\u30fc\u30b6\u30fc",
      kr: "\uc0ac\uc6a9\uc790\ub4e4",
      pt: "usu\xe1rios",
      zh_CN: "\u7528\u6237",
    });
    saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
    saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
    if ($.os.indexOf("Mac") != -1) {
      cmdKey = "cmd";
    } else {
      cmdKey = "Ctrl";
    }
    var strRegSuccess = localize({
      de: "Registrierung erfolgreich ",
      en: "Registration successful ",
      es: "Registro completado ",
      fr: "Enregistrement r\xe9ussi ",
      it: "Registrazione complatata con successo ",
      ja: "\u767b\u9332\u304c\u5b8c\u4e86\u3057\u307e\u3057\u305f",
      kr: "\ub4f1\ub85d \uc644\ub8cc ",
      pt: "Registro completado ",
      zh_CN: "\u6ce8\u518c\u6210\u529f ",
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
      privateNum *
      0.457
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
    var prefsPrefix = "pref_";
    var sanitizedName = sanitizeProductName(strScriptName);
    var strRegSuccess1 = localize({
      de: "Danke f\xfcr den Kauf von " + strScriptName,
      en: "Thank you for purchasing " + strScriptName,
      es: "Gracias por comprar " + strScriptName,
      fr: "Merci d\'avoir achet\xe9 " + strScriptName,
      it: "Grazie per aver acquistato " + strScriptName,
      ja:
        strScriptName +
        "\u3092\u3054\u8cfc\u5165\u3044\u305f\u3060\u304d, \u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059",
      kr:
        "\uad6c\uc785\ud574\uc8fc\uc154\uc11c \uac10\uc0ac\ud569\ub2c8\ub2e4. " +
        strScriptName,
      pt: "Obrigado por comprar " + strScriptName,
      zh_CN: "\u611f\u8c22\u60a8\u8d2d\u4e70 " + strScriptName,
    });
    var strInvalidCode = localize({
      de: "Entschuldigung, der Lizenzcode ist nicht g\xfcltig.",
      en: "Sorry, the license code is not valid",
      es: "Lo siento, la licencia no es v\xe1lida",
      fr: "D\xe9sol\xe9, cette licence n\'est pas valide.",
      it: "Siamo spiacenti, questa licenza non \xe8 valida",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u6709\u52b9\u3067\u306f\u3042\u308a\u307e\u305b\u3093",
      kr: "\uc8c4\uc1a1\ud569\ub2c8\ub2e4. \ub77c\uc774\uc13c\uc2a4 \ucf54\ub4dc\uac00 \uc720\ud6a8\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4.",
      pt: "Desculpe, essa licen\xe7a \xe9 inv\xe1lida",
      zh_CN: "\u5bf9\u4e0d\u8d77\uff0c\u8bb8\u53ef\u8bc1\u65e0\u6548",
    });
    var strFirewall = localize({
      de: "Eine Firewall oder ein Antivirus-Programm blockiert den Lizenz-Prozess. Bitte deaktiviere das Antivirus-Programm oder konfiguriere das System so, dass die Lizenz verifiziert werden kann.",
      en: "A firewall or virus protection software is blocking the licensing process.  Please disable this or configure it to allow this process so that the license can be verified.",
      es: 'Un software de "firewall" o de protecci\xf3n antivirus est\xe1 bloqueando el proceso de concesi\xf3n de licencias. Desactivela o configurela para permitir este proceso para que la licencia puede ser verificada.',
      fr: "Un logiciel pare-feu ou un logiciel antivirus bloque le processus de v\xe9rification de licence. Veuillez le d\xe9sactiver ou le configurer pour permettre \xe0 ce processus de v\xe9rifier la licence.",
      it: "Un firewall, o un antivirus, sta blocando il processo di verifica della licenza. Si suggerisce di disattivare o configurare tale software per permettere il processo di verifica.",
      ja: "\u30d5\u30a1\u30a4\u30a2\u30a6\u30a9\u30fc\u30eb, \u3082\u3057\u304f\u306f\u30a6\u30a3\u30eb\u30b9\u5bfe\u7b56\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u304c\u30e9\u30a4\u30bb\u30f3\u30b9\u8a8d\u8a3c\u3092\u59a8\u3052\u3066\u3044\u307e\u3059. \u30e9\u30a4\u30bb\u30f3\u30b9\u691c\u8a3c\u306e\u305f\u3081, \u3053\u308c\u3089\u3092\u7121\u52b9\u5316\u3059\u308b\u304b, \u3053\u306e\u30d7\u30ed\u30bb\u30b9\u3092\u8a31\u53ef\u3059\u308b\u8a2d\u5b9a\u3092\u884c\u3063\u3066\u304f\u3060\u3055\u3044.",
      kr: "\ubc15\ud654\ubcbd \ub610\ub294 \ubc14\uc774\ub7ec\uc2a4 \ubcf4\ud638 \uc18c\ud504\ud2b8\uc6e8\uc5b4\ub294 \uc778\ud5c8\uac00 \uc808\ucc28\ub97c \uc800\uc9c0\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4. \ub77c\uc774\uc13c\uc2a4\ub97c \uc785\uc99d\ud558\uae30 \uc704\ud574 \uacfc\uc815\uc744 \ud5c8\ub77d\ud558\ub294 \ud658\uacbd\uc124\uc815\uc73c\ub85c \ubcc0\uacbd\ud558\uc2dc\uae30 \ubc14\ub78d\ub2c8\ub2e4.",
      pt: "Um firewall ou antiv\xedrus est\xe1 bloqueando o processo de licenciamento. Por favor desabilite-o ou configure para permitir este processo, para que a licen\xe7a possa ser verificada.",
      zh_CN:
        "\u9632\u706b\u5899\u6216\u75c5\u6bd2\u4fdd\u62a4\u8f6f\u4ef6\u6b63\u5728\u963b\u6b62\u8bb8\u53ef\u8bc1\u8fdb\u7a0b\u3002\u8bf7\u7981\u7528\u8be5\u8f6f\u4ef6\u6216\u914d\u7f6e\u5b83\u4ee5\u5141\u8bb8\u8fd9\u4e2a\u8fdb\u7a0b\uff0c\u4ee5\u4fbf\u8bb8\u53ef\u8bc1\u53ef\u4ee5\u88ab\u9a8c\u8bc1\u3002",
    });
    var strContactSupport = localize({
      de: "Wenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + supportEmail,
      en: "If you require assistance please contact " + supportEmail,
      es: "Si necesita ayuda, por favor contacte " + supportEmail,
      fr: "Si vous avez besoin d\'aide, merci de contacter " + supportEmail,
      it: "Per l\'assistenza si prega di contattare " + supportEmail,
      ja:
        "\u30b5\u30dd\u30fc\u30c8\u304c\u5fc5\u8981\u3067\u3042\u308b\u5834\u5408\u306f, " +
        supportEmail +
        " \u307e\u3067\u3054\u9023\u7d61\u304f\u3060\u3055\u3044.",
      kr:
        "\ub3c4\uc6c0\uc774 \ud544\uc694\ud558\uc2dc\uba74 \uc5f0\ub77d \uc8fc\uc2ed\uc2dc\uc624 " +
        supportEmail,
      pt: "Se precisar de ajuda, por favor contate " + supportEmail,
      zh_CN:
        "\u5982\u679c\u9700\u8981\u5e2e\u52a9\uff0c\u8bf7\u8054\u7cfb " +
        supportEmail,
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
        ". Merci de bien vouloir le saisir \xe0 nouveau.\n" +
        strContactSupport,
      it:
        "Spiacente, \xe8 stato riscontrato un problema alla licenza per " +
        strScriptName +
        ". Si prega di reinserirla.\n" +
        strContactSupport,
      ja:
        strScriptName +
        " \u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306b\u554f\u984c\u304c\u767a\u751f\u3057\u307e\u3057\u305f. \u518d\u5ea6\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044.\n" +
        strContactSupport,
      kr:
        "\uc8c4\uc1a1\ud569\ub2c8\ub2e4. \uc5d0 \uc624\ub958\uac00 \ubc1c\uc0dd\ud558\uc600\uc2b5\ub2c8\ub2e4.  " +
        strScriptName +
        " \ub77c\uc774\uc13c\uc2a4 \ucf54\ub4dc, \uc989\uac01\uc801\uc73c\ub85c \ub2e4\uc2dc \ub4e4\uc5b4\uac00\uae30 \ubc14\ub78d\ub2c8\ub2e4. \n" +
        strContactSupport,
      pt:
        "Desculpe, aconteceu algum problema com o c\xf3digo de licen\xe7a para " +
        strScriptName +
        ".  Por favor, digite novamente.\n" +
        strContactSupport,
      zh_CN:
        "\u5bf9\u4e0d\u8d77\uff0c" +
        strScriptName +
        " \u7684\u8bb8\u53ef\u8bc1\u53d1\u751f\u4e86\u4e00\u4e9b\u95ee\u9898\u3002\u8bf7\u91cd\u65b0\u8f93\u5165\u3002\n" +
        strContactSupport,
    });
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
    var strTrialThanks = localize({
      de: "Danke, dass Du " + strScriptName + " ausprobierst!",
      en: "Thanks for trying " + strScriptName + "!",
      es: "\xa1Gracias por probar " + strScriptName + "!",
      fr: "Merci d\'avoir essay\xe9 " + strScriptName + "!",
      it: "Grazie per aver scelto di provare" + strScriptName + "!",
      ja:
        strScriptName +
        " \u3092\u3054\u8a66\u7528\u3044\u305f\u3060\u304d\u3042\u308a\u304c\u3068\u3046\u3054\u3056\u3044\u307e\u3059!",
      kr:
        "\uc2dc\ub3c4\ud574\uc8fc\uc154\uc11c \uac10\uc0ac\ud569\ub2c8\ub2e4 " +
        strScriptName +
        "!",
      pt: "Obrigado por testar " + strScriptName + "!",
      zh_CN: "\u611f\u8c22\u60a8\u8bd5\u7528 " + strScriptName + "!",
    });
    var strTrialTxt = localize({
      de: "Testversion - noch %E Tage g\xfcltig",
      en: "Trial version - %E days left",
      es: "Versi\xf3n de prueba - faltan %E d\xedas",
      fr: "Version d\'\xe9valuation - %E jour(s) restant(s)",
      it: "Versione di prova - %E giorni alla scadenza",
      ja: "\u30c8\u30e9\u30a4\u30a2\u30eb\u7248 - \u6b8b\u308a %E \u65e5",
      kr: "\uc2dc\ud5d8\ud310 - %E \ub0a8\uc558\uc2b5\ub2c8\ub2e4",
      pt: "Vers\xe3o de teste - faltam %E dias",
      zh_CN: "\u8bd5\u7528\u7248 - \u5269\u4f59 %E \u5929",
    });
    var strTrialTxt2 = localize({
      de: "%E Programmstarts \xfcbrig f\xfcr die Testversion",
      en: "%E launches left in the trial",
      es: "%E usos restantes de la versi\xf3n de prueba",
      fr: "Il vous reste %E essais",
      it: "%E avvii rimanenti per la versione di prova",
      ja: "\u6b8b\u308a %E \u56de \u30c8\u30e9\u30a4\u30a2\u30eb\u7248\u3092\u8d77\u52d5\u3067\u304d\u307e\u3059",
      kr: "%E \ud68c \uc2dc\ud5d8\uc5d0 \ub0a8\uc558\uc2b5\ub2c8\ub2e4",
      pt: "%E usos restantes da vers\xe3o de teste",
      zh_CN: "\u8bd5\u7528\u7248\u5269\u4f59 %E \u6b21\u4f7f\u7528\u6b21\u6570",
    });
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
    var strTrialWelcomeHeader = localize({
      de: "Willkommen bei " + strScriptName,
      en: "Welcome to " + strScriptName,
      es: "Bienvenido a " + strScriptName,
      fr: "Bienvenue sur " + strScriptName,
      it: "Benvenuto a " + strScriptName,
      ja: strScriptName + "\u3078\u3088\u3046\u3053\u305d",
      kr: "\ud658\uc601\ud569\ub2c8\ub2e4 " + strScriptName,
      pt: "Bem-vindo ao " + strScriptName,
      zh_CN: "\u6b22\u8fce\u4f7f\u7528 " + strScriptName,
    });
    var strOK = localize({
      de: "OK",
      en: "OK",
      es: "OK",
      fr: "OK",
      it: "OK",
      ja: "OK",
      kr: "\ub124",
      pt: "OK",
      zh_CN: "\u597d\u7684",
    });
    var strCancel = localize({
      de: "Abbrechen",
      en: "Cancel",
      es: "Cancelar",
      fr: "Annuler",
      it: "Annulla",
      ja: "\u30ad\u30e3\u30f3\u30bb\u30eb",
      kr: "\ucde8\uc18c",
      pt: "Cancelar",
      zh_CN: "\u53d6\u6d88",
    });
    var strGetSupport = localize({
      de: "Support erhalten",
      en: "Get support",
      es: "Obtener apoyo",
      fr: "Contacter le support client",
      it: "Chiedi assistenza",
      ja: "\u30b5\u30dd\u30fc\u30c8\u3078",
      kr: "\ub3c4\uc6c0\ubc1b\uae30",
      pt: "Ajuda",
      zh_CN: "\u83b7\u53d6\u652f\u6301",
    });
    var strRetrieveLic = localize({
      de: "%t vergessen?",
      en: "Retrieve %t",
      es: "Recuperar %t",
      fr: "Retrouver votre %t",
      it: "Recupera %t",
      ja: "%t \u3092\u53d6\u5f97\u3059\u308b",
      kr: "\uac80\uc0c9\ud558\uae30 %t",
      pt: "Recuperar %t",
      zh_CN: "\u6062\u590d %t",
    });
    var strBuyLic = localize({
      de: "%t Kaufen",
      en: "Buy %t",
      es: "Compra %t",
      fr: "Acheter une %t",
      it: "Acquista %t",
      ja: "%t \u3092\u8cfc\u5165\u3059\u308b",
      kr: "\uad6c\uc785\ud558\uae30 %t",
      pt: "Comprar %t",
      zh_CN: "\u8d2d\u4e70 %t",
    });
    var strLicense = localize({
      de: "Lizenz",
      en: "License",
      es: "licencia",
      fr: "Licence",
      it: "Licenza",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\ub77c\uc774\uc13c\uc2a4",
      pt: "Licen\xe7a",
      zh_CN: "\u8bb8\u53ef\u8bc1",
    });
    var strPpcNotSupported = localize({
      de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
      en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
      es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
      fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le support client pour plus de d\xe9tails.",
      it: "Spiacente, i processori PowerPC (PPC) non sono supportati, contattare l\'assistenza per ulteriori dettagli.",
      ja: "PowerPC (PPC)\u30d7\u30ed\u30bb\u30c3\u30b5\u30fc\u306f\u30b5\u30dd\u30fc\u30c8\u3055\u308c\u3066\u3044\u307e\u305b\u3093. \u8a73\u7d30\u306b\u3064\u304d\u307e\u3057\u3066\u306f\u30b5\u30dd\u30fc\u30c8\u307e\u3067\u304a\u554f\u3044\u5408\u308f\u305b\u304f\u3060\u3055\u3044.",
      kr: "\uc8c4\uc1a1\ud569\ub2c8\ub2e4. PowerPC (PPC) processors\ub294 \uc9c0\uc6d0\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4. \uacc4\uc18d\uc801\uc778 \ub3c4\uc6c0\ubc1b\uae30\ub97c \uc6d0\ud558\uc2dc\uba74 \uc11c\ube44\uc2a4\uc13c\ud130 \uc73c\ub85c \uc5f0\ub77d \uc8fc\uc2ed\uc2dc\uc624.",
      pt: "Desculpe, os processadores PowerPC (PPC) n\xe3o s\xe3o suportados, por favor entre em contato com o suporte para assist\xeancia.",
      zh_CN:
        "\u5bf9\u4e0d\u8d77\uff0c\u4e0d\u652f\u6301 PowerPC (PPC) \u5904\u7406\u5668\uff0c\u8bf7\u8054\u7cfb\u5ba2\u6237\u652f\u6301\u83b7\u53d6\u66f4\u591a\u5e2e\u52a9\u3002",
    });
    var strAllowScriptsPrefsSection =
      parseFloat(app.version) < 16.1
        ? localize({
            de: "Allgemein",
            en: "General",
            es: "General",
            fr: "G\xe9n\xe9ral",
            it: "Generale",
            ja: "\u4e00\u822c\u8a2d\u5b9a",
            kr: "\uc77c\ubc18",
            pt: "Geral",
            zh_CN: "\u5e38\u89c4",
          })
        : localize({
            de: "Skripterstellung und Expressions",
            en: "Scripting & Expressions",
            es: "Scripts y expresi\xf3nes",
            fr: "Scripts et expressions",
            it: "Scripting ed Espressioni",
            ja: "\u30b9\u30af\u30ea\u30d7\u30c8\u3068\u30a8\u30af\u30b9\u30d7\u30ec\u30c3\u30b7\u30e7\u30f3",
            kr: "\uc2a4\ud06c\ub9bd\ud2b8 & \uc775\uc2a4\ud504\ub808\uc158 ",
            pt: "Scripts e express\xf5es",
            zh_CN: "\u811a\u672c\u548c\u8868\u8fbe\u5f0f",
          });
    var strErrScriptAccess = localize({
      de:
        strScriptName +
        " ben\xf6tigt die Erlaubnis, Dateien zu schreiben\n " +
        'Gehe in den Voreinstellungen von After Effects in die Rubrik "' +
        strAllowScriptsPrefsSection +
        '" und aktiviere die ' +
        'Option "Skripte k\xf6nnen Dateien schreiben und haben Netzwerkzugriff".',
      en:
        strScriptName +
        " requires access to write files\n" +
        'Go to the "' +
        strAllowScriptsPrefsSection +
        '" panel of the application preferences and make sure ' +
        '"Allow Scripts to Write Files and Access Network" is checked.',
      es:
        strScriptName +
        " necesita poder escribir archivos\n" +
        'Vaya al panel "' +
        strAllowScriptsPrefsSection +
        '" de las Preferencias y aseg\xfarese de que ' +
        '"Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
      fr:
        strScriptName +
        " n\xe9cessite les droits d\'\xe9criture de fichiers\n" +
        'Allez dans le panneau "' +
        strAllowScriptsPrefsSection +
        "\" des pr\xe9f\xe9rences de l\'application et cochez \n" +
        '"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
      it:
        strScriptName +
        " ha bisogno di scrivere file\n" +
        "Vai nel pannello delle preferenze dell\'applicazione \"" +
        strAllowScriptsPrefsSection +
        '" e assicurati che ' +
        '"Consenti agli script di scrivere i file e accedere alla rete" sia spuntato.',
      ja:
        strScriptName +
        " \u304c\u30d5\u30a1\u30a4\u30eb\u3078\u306e\u66f8\u304d\u8fbc\u307f\u30a2\u30af\u30bb\u30b9\u3092\u8981\u6c42\u3057\u3066\u3044\u307e\u3059.\n" +
        '\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306e\u74b0\u5883\u8a2d\u5b9a\u304b\u3089 "' +
        strAllowScriptsPrefsSection +
        '" \u3092\u958b\u304d' +
        '"\u30b9\u30af\u30ea\u30d7\u30c8\u306b\u3088\u308b\u30d5\u30a1\u30a4\u30eb\u3078\u306e\u66f8\u304d\u8fbc\u307f\u3068\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u3078\u306e\u30a2\u30af\u30bb\u30b9\u3092\u8a31\u53ef" \u306b\u30c1\u30a7\u30c3\u30af\u3092\u5165\u308c\u3066\u304f\u3060\u3055\u3044.',
      kr:
        strScriptName +
        " \ud30c\uc77c\uc744 \uc4f0\uae30\uc704\ud574 \uc0ac\uc6a9\ud560 \uc218 \uc788\uc5b4\uc57c \ud569\ub2c8\ub2e4. \n" +
        '\ub85c \uac00\uc2ed\uc2dc\uc624"' +
        strAllowScriptsPrefsSection +
        '" \uc5b4\ud50c\ub9ac\ucf00\uc774\uc158 \uc138\ud305\uc758 \ud310\ub12c\uacfc \uc2a4\ud06c\ub9bd\ud2b8 \uc0ac\uc6a9, \ub124\ud2b8\uc6cc\ud06c\uc811\uadfc \ud5c8\uc6a9\ud558\uc2ed\uc2dc\uc624.',
      pt:
        strScriptName +
        " precisa de acesso para gravar arquivos\n" +
        'Acesse a op\xe7\xe3o "' +
        strAllowScriptsPrefsSection +
        '" nas Prefer\xeancias e certifique-se que ' +
        '"Permitir que scripts gravem arquivos e acessem as redes" esteja selecionado.',
      zh_CN:
        strScriptName +
        " \u9700\u8981\u5199\u6587\u4ef6\u7684\u6743\u9650\n" +
        '\u8bf7\u5230 After Effects \u5e94\u7528\u7a0b\u5e8f\u7684 \n"' +
        strAllowScriptsPrefsSection +
        '" \u9762\u677f\u4e2d\uff0c\u5e76\u786e\u8ba4"\u5141\u8bb8\u811a\u672c\u5199\u5165\u6587\u4ef6\u548c\u8bbf\u95ee\u7f51\u7edc"\u5df2\u9009\u4e2d\u3002',
    });
    var strUpdateLicenseHeader = localize({
      de: strScriptName + " Lizenz-Update ben\xf6tigt",
      en: strScriptName + " License Update Required",
      es: strScriptName + " necesita actualizar la licencia",
      fr: "La licence de " + strScriptName + " doit \xeatre mise \xe0 jour",
      it: "\xc8 necessario aggiornare la licenza di " + strScriptName,
      ja:
        strScriptName +
        "\u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u66f4\u65b0\u304c\u5fc5\u8981\u3067\u3059",
      kr:
        strScriptName +
        " \ub77c\uc774\uc13c\uc2a4\uc758 \uc5c5\ub370\uc774\ud2b8\uac00 \ud544\uc694\ud568",
      pt: "A licen\xe7a do " + strScriptName + " precisa ser atualizada",
      zh_CN:
        strScriptName + " \u7684\u8bb8\u53ef\u8bc1\u9700\u8981\u66f4\u65b0",
    });
    var strLicenseDownloadOptions = localize({
      de: 'Alle Deine %t findest Du unter "My Downloads & Licenses" in Deinem aescripts.com Benutzer-Account, oder \xfcber unsere Manager-App.',
      en: 'All your %t are in the "My Downloads & Licenses" section of your aescripts.com user account, or via our Manager App.',
      es: 'Todas sus %t est\xe1n en la secci\xf3n "My Downloads & Licenses" de su cuenta de usuario en aescripts.com, o a trav\xe9s de nuestra App Manager.',
      fr: 'Toutes vos %t se trouvent dans la section "My Downloads & Licenses" de votre compte utilisateur sur aescripts.com, ou via notre App Manager.',
      it: 'Tutti i tuoi %t sono nella sezione "My Downloads & Licenses" del tuo account utente su aescripts.com, o sulla nostra Manager App.',
      ja: '\u3059\u3079\u3066\u306e\u3042\u306a\u305f\u306e %t \u306f, aescripts.com\u306e\u30a2\u30ab\u30a6\u30f3\u30c8, \u3082\u3057\u304f\u306f\u30de\u30cd\u30fc\u30b8\u30e3\u30fc\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3\u306e"My Downloads & Licenses"\u30bb\u30af\u30b7\u30e7\u30f3\u306b\u3042\u308a\u307e\u3059.',
      kr: "\ubaa8\ub4e0 \uac83\ub4e4\uc740 My Downloads & Licenses \uc5d0 \uc788\uc2b5\ub2c8\ub2e4.  \ubd80\ubd84\uc740 \uadc0\ud558\uc758 aescripts.com \ub610\ub294 \ub2f9\uc0ac\uc758 \ub9e4\ub2c8\uc838 \uc571\uc5d0 \uc704\uce58",
      pt: 'Todos os seus %t est\xe3o na se\xe7\xe3o "My Downloads & Licenses" da sua conta no aescripts.com, ou pelo nosso App de gerenciamento.',
      zh_CN:
        '\u6240\u6709\u7684 %t \u5728\u60a8\u7684 aescripts.com \u7528\u6237\u8d26\u6237\u7684"My Downloads & Licenses"\u90e8\u5206\uff0c\u6216\u901a\u8fc7\u6211\u4eec\u7684 Manager App\u3002',
    });
    var strMyDownloads = localize({
      de: "Gehe zu My Downloads & Licenses",
      en: "Go to My Downloads & Licenses",
      es: "Ir a My Downloads & Licenses",
      fr: "Aller \xe0 My Downloads & Licenses",
      it: "Vai a My Downloads & Licenses",
      ja: "My Downloads & Licenses \u3092\u958b\u304f",
      kr: "\ub098\uc758 \ub2e4\uc6b4\ub85c\ub4dc & \ub77c\uc774\uc13c\uc2a4 \ud398\uc774\uc9c0\ub85c \uc774\ub3d9",
      pt: "Ir para meus Downloads e Licen\xe7as",
      zh_CN: "\u524d\u5f80 My Downloads & Licenses",
    });
    var strDownloadManager = localize({
      de: "Lade die Manager-App herunter",
      en: "Download Manager App",
      es: "Descargar App Manager",
      fr: "T\xe9l\xe9charger App Manager",
      it: "Scarica Manager App",
      ja: "\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9\u30de\u30cd\u30fc\u30b8\u30e3\u30fc\u30a2\u30d7\u30ea\u30b1\u30fc\u30b7\u30e7\u30f3",
      kr: "\ub2e4\uc6b4\ub85c\ub4dc \ub9e4\ub2c8\uc838 \uc571",
      pt: "Baixar o App de gerenciamento",
      zh_CN: "\u4e0b\u8f7d Manager App",
    });
    var strOldLicenseFormat = localize({
      de: "Die Lizenz sollte so aussehen:\n\nVorname**Nachname**111111111SUL",
      en: "License should look like this:\n\nFirstname**Lastname**111111111SUL",
      es: "La licencia debe tener este aspecto:\n\nNombre**Apellido**111111111SUL",
      fr: "Votre licence doit ressembler \xe0 : \n\nPr\xe9nom**Nom**111111111SUL",
      it: "La licenza dovrebbe avere il seguente formato:\n\nNome**Cognome**111111111SUL",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u4ee5\u4e0b\u306e\u3088\u3046\u306a\u5f62\u5f0f\u3092\u3057\u3066\u3044\u307e\u3059:\n\nNamae**Myouji**111111111SUL",
      kr: "\ub77c\uc774\uc13c\uc2a4\ub294 \uc774\ub984 \uc131 \uc73c\ub85c \ub4f1\ub85d\ud558\uc154\uc57c\ud569\ub2c8\ub2e4:\n\nFirstname**Lastname**111111111SUL",
      pt: "A licen\xe7a deve estar nesse formato:\n\nNome**Apelido**111111111SUL",
      zh_CN:
        "\u8bb8\u53ef\u8bc1\u5e94\u8be5\u50cf\u8fd9\u6837:\n\n\u540d\u5b57**\u59d3**111111111SUL",
    });
    var strNewLicenseFormat = localize({
      de: "Die Lizenz sollte so aussehen:\n\nPRODUCTID*VORNAME*NACHNAME*1111111SUL1",
      en: "License should look like this:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      es: "La licencia debe tener este aspecto:\n\nPRODUCTID*NOMBRE*APELLIDO*1111111SUL1",
      fr: "Votre licence doit ressembler \xe0 : \n\nPRODUCTID*PRENOM*NOM*1111111SUL1",
      it: "La licenza dovrebbe avere il seguente formato:\n\nPRODUCTID*NOME*COGNOME*1111111SUL1",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u4ee5\u4e0b\u306e\u3088\u3046\u306a\u5f62\u5f0f\u3092\u3057\u3066\u3044\u307e\u3059:\n\nPRODUCTID*NAMAE*MYOUJI*1111111SUL1",
      kr: "\ub77c\uc774\uc13c\uc2a4\ub294 \uc0c1\ud488\uba85, \uc774\ub984, \uc131:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      pt: "A licen\xe7a deve ter esse formato:\n\nPRODUCTID*NOME*SOBRENOME*1111111SUL1",
      zh_CN:
        "\u8bb8\u53ef\u8bc1\u5e94\u8be5\u50cf\u8fd9\u6837:\n\n\u4ea7\u54c1ID*\u540d\u5b57*\u59d3*1111111SUL1",
    });
    var strRegistration = localize({
      de: "Registriert f\xfcr: ",
      en: "Registered to: ",
      es: "Registrado a: ",
      fr: "Enregistr\xe9 pour: ",
      it: "Registrato a: ",
      ja: "\u767b\u9332\u5bfe\u8c61: ",
      kr: "\uc791\uc131\ud569\ub2c8\ub2e4: ",
      pt: "Registrado para: ",
      zh_CN: "\u5df2\u6ce8\u518c\u5230: ",
    });
    var strUnknownError = localize({
      de:
        "Es gab einen unerwarteten Fehler\nBitte er\xf6ffne hier ein Support-Ticket:\n" +
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
        "Une erreur vient de se produire \nVeuillez ouvrir un ticket de service \xe0 cette adresse:\n" +
        supportEmail +
        "\n\net n\'oubliez pas d\'y joindre une capture d\'\xe9cran de ce message\n\n",
      it:
        "Si sono riscontrati errori inaspettati\nSi prega di aprire un ticket di supporto qui:\n" +
        supportEmail +
        "\n\ne inserire uno screenshot di questo messaggio di errore\n\n",
      ja:
        "\u4e88\u671f\u3057\u306a\u3044\u30a8\u30e9\u30fc\u304c\u8d77\u3053\u308a\u307e\u3057\u305f.\n\u3053\u3061\u3089\u304b\u3089\u30b5\u30dd\u30fc\u30c8\u30c1\u30b1\u30c3\u30c8\u3092\u958b\u3044\u3066\u304f\u3060\u3055\u3044:\n" +
        supportEmail +
        "\n\n\u30a8\u30e9\u30fc\u30e1\u30c3\u30bb\u30fc\u30b8\u306e\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3092\u63d0\u793a\u3057\u3066\u304f\u3060\u3055\u3044.\n\n",
      kr:
        "\uc608\uae30\uce58 \uc54a\uc740 \uc5d0\ub7ec\uc785\ub2c8\ub2e4. \n\uc11c\ud3ec\ud2b8 \ud2f0\ucf13\uc744 \uc5ec\uc2ed\uc2dc\uc624.:\n" +
        supportEmail +
        "\n\n\uc5d0\ub7ec \uba54\uc138\uc9c0\ub97c \uc81c\ucd9c \ud558\uc138\uc694.\n\n",
      pt:
        "Ocorreu um erro inesperado.\nPor favor abra um ticket de atendimento aqui:\n" +
        supportEmail +
        "\n\ne envie uma imagem da mensagem de erro\n\n",
      zh_CN:
        "\u53d1\u751f\u4e86\u4e00\u4e2a\u610f\u5916\u9519\u8bef\n\u8bf7\u5728\u8fd9\u91cc\u6253\u5f00\u4e00\u4e2a\u652f\u6301\u5de5\u5355:\n" +
        supportEmail +
        "\n\n\u5e76\u5c06\u8fd9\u4e2a\u9519\u8bef\u6d88\u606f\u7684\u622a\u56fe\u53d1\u9001\u7ed9\u6211\u4eec\n\n",
    });
    var strWrongProduct = localize({
      de: "Dieser Lizenz-Code ist f\xfcr ein anderes Produkt. Bitte stelle sicher, dass du den richtigen Lizenzcode eingibst\n\n",
      en: "This license code is for a different product, please double check that you are entering the correct license\n\n",
      es: "Este c\xf3digo de licencia es para un producto diferente, por favor, comprobar que esta introduciendo la licencia correcta\n\n",
      fr: "Vous venez d\'entrer la cl\xe9 de licence d\'un autre produit, assurez-vous d\'utiliser la bonne cl\xe9 de licence\n\n",
      it: "Questo codice di licenza \xe8 valido per un prodotto differente, si prega di controllare che si stia inserendo la licenza corretta\n\n",
      ja: "\u3053\u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u4ed6\u306e\u88fd\u54c1\u306e\u3082\u306e\u3067\u3059. \u6b63\u3057\u3044\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u5165\u529b\u3057\u3066\u3044\u308b\u304b\u518d\u5ea6\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044\n\n",
      kr: "\uc774 \ub77c\uc774\uc13c\uc2a4 \ucf54\ub4dc\ub294 \ub2e4\ub978 \uc0c1\ud488\uc758 \ucf54\ub4dc\uc785\ub2c8\ub2e4. \ub2e4\uc2dc\ud55c\ubc88 \ud655\uc778\ud558\uc5ec \uc8fc\uc2ed\uc2dc\uc624.\n\n",
      pt: "Esta licen\xe7a \xe9 de outro produto, por favor verifique se voc\xea est\xe1 digitando a licen\xe7a correta\n\n",
      zh_CN:
        "\u6b64\u8bb8\u53ef\u8bc1\u7528\u4e8e\u4e0d\u540c\u7684\u4ea7\u54c1\uff0c\u8bf7\u518d\u6b21\u786e\u8ba4\u4f60\u6240\u8f93\u5165\u7684\u8bb8\u53ef\u8bc1\u662f\u5426\u6b63\u786e\n\n",
    });
    var strNewVersionAvailableHdr = localize({
      de: strScriptName + " Update verf\xfcgbar",
      en: strScriptName + " Update Available",
      es: strScriptName + " Actualizaci\xf3n disponible",
      fr: strScriptName + " Mise \xe0 jour disponible",
      it: strScriptName + " Aggiornamento Disponibile",
      ja:
        strScriptName +
        " \u306e\u30a2\u30c3\u30d7\u30c7\u30fc\u30c8\u304c\u5229\u7528\u53ef\u80fd\u3067\u3059",
      kr: strScriptName + " \uc5c5\ub370\uc774\ud2b8 \uac00\ub2a5",
      pt: strScriptName + " Atualiza\xe7\xe3o dispon\xedvel",
      zh_Cn: strScriptName + " \u6709\u53ef\u7528\u7684\u66f4\u65b0",
    });
    var strNewVersionAvailable = localize({
      de:
        "Eine neuere Version von " + strScriptName + " ist verf\xfcgbar: %v\n",
      en: "A newer version of " + strScriptName + " is available: %v\n",
      es:
        "Una versi\xf3n nueva de " +
        strScriptName +
        " est\xe1 disponible: %v\n",
      fr:
        "Une version plus r\xe9cente de " +
        strScriptName +
        " est disponible: %v\n",
      it: "\xc8 disponibile una nuova versione di" + strScriptName + ": %v\n",
      ja:
        strScriptName +
        " \u306e\u65b0\u3057\u3044\u30d0\u30fc\u30b8\u30e7\u30f3: %v \u304c\u5229\u7528\u53ef\u80fd\u3067\u3059\n",
      kr:
        " \uc758 \uc0c8\ub85c\uc6b4 \ubc84\uc804 " +
        strScriptName +
        " \uc740 \uc0ac\uc6a9\uac00\ub2a5: %v\n",
      pt:
        "Uma nova vers\xe3o do " +
        strScriptName +
        " est\xe1 dispon\xedvel: %v\n",
      zh_Cn: strScriptName + " \u6709\u65b0\u7248\u672c\u53ef\u7528: %v\n",
    });
    var strCurrentVersion = localize({
      de: "Deine installierte Version ist: %v",
      en: "Your installed version is: %v",
      es: "Su versi\xf3n instalada es: %v",
      fr: "Votre version install\xe9e est: %v",
      it: "La versione installata \xe8: %v",
      ja: "\u30d0\u30fc\u30b8\u30e7\u30f3 : %v \u304c\u30a4\u30f3\u30b9\u30c8\u30fc\u30eb\u3055\u308c\u3066\u3044\u307e\u3059",
      kr: "\uc124\uce58 \ubc84\uc804\uc740 : %v",
      pt: "A vers\xe3o instalada \xe9: %v",
      zh_Cn: "\u60a8\u5b89\u88c5\u7684\u7248\u672c\u662f: %v",
    });
    var strDownload = localize({
      de: "Download",
      en: "Download",
      es: "Descargar",
      fr: "T\xe9l\xe9charger",
      it: "Scarica",
      ja: "\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9",
      kr: "\ub2e4\uc6b4\ub85c\ub4dc",
      pt: "Baixar",
      zh_CN: "\u4e0b\u8f7d",
    });
    var strDownloads = localize({
      de: "Downloads",
      en: "Downloads",
      es: "Descargas",
      fr: "T\xe9l\xe9chargements",
      it: "Scarica",
      ja: "\u30c0\u30a6\u30f3\u30ed\u30fc\u30c9",
      kr: "\ub2e4\uc6b4\ub85c\ub4dc",
      ps: "Transfer\xeancias",
      zh_CN: "\u4e0b\u8f7d",
    });
    var strVersion = localize({
      de: "Version",
      en: "version",
      es: "versi\xf3n",
      fr: "version",
      it: "versione",
      ja: "\u30d0\u30fc\u30b8\u30e7\u30f3",
      kr: "\ubc84\uc804",
      pt: "vers\xe3o",
      zh_CN: "\u7248\u672c",
    });
    var strSkipVersion = localize({
      de: "Diese Version \xdcberspringen",
      en: "Skip this Version",
      es: "Salta esta versi\xf3n",
      fr: "Ignorer cette version",
      it: "Salta questa Versione",
      ja: "\u3053\u306e\u30d0\u30fc\u30b8\u30e7\u30f3\u3092\u30b9\u30ad\u30c3\u30d7\u3059\u308b",
      kr: "\uc774 \ubc84\uc804\uc740 \uc0dd\ub7b5",
      pt: "Pular essa vers\xe3o",
      zh_CN: "\u8df3\u8fc7\u6b64\u7248\u672c",
    });
    var strRemindMeLater = localize({
      de: "Sp\xe4ter erinnern",
      en: "Remind Me Later",
      es: "Recu\xe9rdame m\xe1s tarde",
      fr: "Me le rappeller plus tard",
      it: "Ricordamelo pi\xf9 tardi",
      ja: "\u5f8c\u3067\u77e5\u3089\u305b\u308b",
      kr: "\ub098\uc911\uc5d0 \uc0c1\uae30\uc2dc\ud0a4\uae30 ",
      pt: "Lembre mais tarde",
      zh_CN: "\u7a0d\u540e\u63d0\u9192\u6211",
    });
    var strNewestVersionAvailable = localize({
      de: "Neueste verf\xfcgbare Version",
      en: "Newest available version",
      es: "Versi\xf3n mas nueva disponible",
      fr: "Nouvelle version disponible",
      it: "Nuova versione disponibile",
      ja: "\u5229\u7528\u53ef\u80fd\u306a\u6700\u65b0\u306e\u30d0\u30fc\u30b8\u30e7\u30f3\u3067\u3059",
      kr: "\ucd5c\uc2e0 \uac00\ub2a5 \ubc84\uc804 ",
      pt: "\xdaltima vers\xe3o dispon\xedvel",
      zh_CN: "\u6700\u65b0\u53ef\u7528\u7248\u672c",
    });
    var strVersionRev = "v%a%b - %c";
    var strDeactivate = localize({
      de: "Lizenz deaktivieren",
      en: "Deactivate License",
      es: "Desactivar Licencia",
      fr: "D\xe9sactiver la licence",
      it: "Disattiva la Licenza",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u7121\u52b9\u5316\u3059\u308b",
      kr: "\ub77c\uc774\uc13c\uc2a4 \ube44\ud65c\uc131\ud654",
      pt: "Desativar Licen\xe7a",
      zh_CN: "\u505c\u7528\u8bb8\u53ef\u8bc1",
    });
    var strReset = localize({
      de: "Lizenz zur\xfccksetzen",
      en: "Reset License",
      es: "Restablecer licencia",
      fr: "R\xe9initialiser la licence",
      it: "Resetta la Licenza",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u30ea\u30bb\u30c3\u30c8\u3059\u308b",
      kr: "\ub9ac\uc14b \ub77c\uc774\uc13c\uc2a4",
      pt: "Reiniciar a licen\xe7a",
      zh_CN: "\u91cd\u7f6e\u8bb8\u53ef\u8bc1",
    });
    var strVersionCheck = localize({
      de: "Automatisch nach Aktualisierungen suchen",
      en: "Check for updates automatically",
      es: "Revisar actualizaciones automaticamente",
      fr: "V\xe9rifier les mises \xe0 jour automatiquement",
      it: "Controlla automaticamente la presenza di aggiornamenti",
      ja: "\u81ea\u52d5\u3067\u66f4\u65b0\u3092\u78ba\u8a8d\u3059\u308b",
      kr: "\uc790\ub3d9\uc801\uc73c\ub85c \uc5c5\ub370\uc774\ud2b8 \ud655\uc778",
      pt: "Verificar atualiza\xe7\xf5es automaticamente",
      zh_CN: "\u81ea\u52a8\u68c0\u67e5\u66f4\u65b0",
    });
    var strCheckNow = localize({
      de: "Jetzt nach Updates suchen",
      en: "Check for update now",
      es: "Buscar actualizaci\xf3n ahora",
      fr: "V\xe9rifier les mise \xe0 jour maintenant",
      it: "Controllo aggiornamenti",
      ja: "\u4eca\u3059\u3050\u66f4\u65b0\u3092\u78ba\u8a8d\u3059\u308b",
      kr: "\uc9c0\uae08 \uc5c5\ub370\uc774\ud2b8 \ud655\uc778\ud558\uae30",
      pt: "Checar atualiza\xe7\xf5es agora",
      zh_CN: "\u7acb\u5373\u68c0\u67e5\u66f4\u65b0",
    });
    var strUpdateCheckError = localize({
      de: "Bei der Suche nach Updates ist ein Fehler aufgetreten.\nBitte vergewissere dich, dass Du \xfcber eine funktionierende Internetverbindung verf\xfcgst und diese nicht durch Firewalls blockiert wird.",
      en: "There was an error when checking for updates.\nPlease verify that you have a valid internet connection and that it is not blocked by any firewalls.",
      es: "Hubo un error en la comprobaci\xf3n de actualizaciones.\nPor favor compruebe que tiene una conexi\xf3n a Internet v\xe1lida y que no est\xe9 bloqueada por un cortafuegos.",
      fr: "Une erreur s\'est produite lors de la recherche de mises \xe0 jour.\nV\xe9rifiez que votre connexion internet est valide et qu\'elle n\'est bloqu\xe9e par un pare-feu.",
      it: "Si \xe8 riscontrato un errore durante la fase di controllo degli aggiornamenti. \nSi prega di verificare il funzionamento della connessione internet e che questa non sia blocchata da un firewall",
      ja: "\u66f4\u65b0\u3092\u78ba\u8a8d\u4e2d\u306b\u30a8\u30e9\u30fc\u304c\u8d77\u3053\u308a\u307e\u3057\u305f.\n\u30a4\u30f3\u30bf\u30fc\u30cd\u30c3\u30c8\u63a5\u7d9a\u304c\u6709\u52b9\u3067\u3042\u308a, \u30d5\u30a1\u30a4\u30a2\u30a6\u30a9\u30fc\u30eb\u306b\u30d6\u30ed\u30c3\u30af\u3055\u308c\u3066\u3044\u306a\u3044\u3053\u3068\u3092\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044.",
      kr: "\uc5c5\ub370\uc774\ud2b8 \ud655\uc778 \ud560 \ub54c \uc5d0\ub7ec\uac00 \ubc1c\uc0dd\ud558\uc600\uc2b5\ub2c8\ub2e4. \uc778\ud130\ub137\uc774 \uc5f0\uacb0\uc0c1\ud0dc\uc640 \ubc29\ud654\ubcbd \ud65c\uc131\uc774 \ub418\uc5b4\uc788\ub294\uc9c0 \ud655\uc778\ud558\uc2ed\uc2dc\uc624.",
      pt: "Ocorreu um erro ao checar a atualiza\xe7\xe3o.\nPor favor verifique a conex\xe3o de internet ou se h\xe1 algum bloqueio do firewall.",
      zh_CN:
        "\u68c0\u67e5\u66f4\u65b0\u65f6\u53d1\u751f\u9519\u8bef\u3002\n\u8bf7\u786e\u4fdd\u60a8\u6709\u4e00\u4e2a\u6709\u6548\u7684\u4e92\u8054\u7f51\u8fde\u63a5\uff0c\u5e76\u4e14\u6ca1\u6709\u88ab\u9632\u706b\u5899\u963b\u6b62\u3002",
    });
    var strUpToDate = localize({
      de:
        "Du bist auf dem neuesten Stand! \n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " ist derzeit die neueste verf\xfcgbare Version.",
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
      it:
        "Hai gi\xe0 aggiornato!\n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " \xe8 attualmente l\'ultima versione disponibile.",
      ja:
        "\u6700\u65b0\u7248\u3067\u3059!\n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " \u306f\u73fe\u5728\u5229\u7528\u53ef\u80fd\u306a\u6700\u65b0\u7248\u3067\u3059.",
      kr:
        "\ucd5c\uc2e0\ubc84\uc804\uc785\ub2c8\ub2e4!\n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " \ud604\uc7ac \ucd5c\uc2e0 \ubc84\uc804 \uc774\uc6a9\uc774 \uac00\ub2a5\ud569\ub2c8\ub2e4.",
      pt:
        "Voc\xea est\xe1 atualizado!\n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " \xe9 a \xfaltima vers\xe3o dispon\xedvel.",
      zh_CN:
        "\u60a8\u5df2\u7ecf\u662f\u6700\u65b0\u7248\u672c!\n" +
        strScriptName +
        " " +
        strVersion +
        " " +
        strScriptVersion +
        " \u662f\u5f53\u524d\u6700\u65b0\u7248\u672c\u3002",
    });
    var strInvalidLicense = localize({
      de: "Ung\xfcltige Lizenz",
      en: "Invalid license",
      es: "La licencia no es v\xe1lida",
      fr: "Licence non valide",
      it: "Licenza non valida",
      ja: "\u7121\u52b9\u306a\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\uc0ac\uc6a9\ud560 \uc218 \uc5c6\ub294 \ub77c\uc774\uc13c\uc2a4",
      pt: "Licen\xe7a inv\xe1lida",
      zh_CN: "\u65e0\u6548\u7684\u8bb8\u53ef\u8bc1",
    });
    var strRemoved = localize({
      de: "entfernt",
      en: "removed",
      es: "eliminada",
      fr: "supprim\xe9e",
      it: "rimossa",
      ja: "\u524a\u9664\u3057\u307e\u3057\u305f",
      kr: "\uc0ad\uc81c\ub428",
      pt: "removida",
      zh_CN: "\u5df2\u5220\u9664",
    });
    var strDeactivated = localize({
      en: "deactivated",
      es: "desactivada",
      fr: "d\xe9sactiv\xe9",
      it: "disattivata",
      ja: "\u7121\u52b9\u5316\u3055\u308c\u307e\u3057\u305f",
      kr: "\ube44\ud65c\uc131\ud654",
      pt: "desativada",
      zh_CN: "\u5df2\u505c\u7528",
    });
    var strRemovedAndDeactivated = localize({
      de: "entfernt und deaktiviert",
      en: "removed and deactivated",
      es: "eliminada y desactivada",
      fr: "supprim\xe9e et d\xe9sactiv\xe9",
      it: "rimossa e disattivata",
      ja: "\u7121\u52b9\u306a\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\uc0ad\uc81c \uadf8\ub9ac\uace0 \ube44\ud65c\uc131\ud654",
      zh_CN: "\u5df2\u5220\u9664\u5e76\u505c\u7528",
    });
    var strLicenseRemoved = localize({
      de: "Lizenz entfernt",
      en: "License removed",
      es: "Licencia eliminada",
      fr: "Licence supprim\xe9e",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u524a\u9664\u3057\u307e\u3057\u305f",
      kr: "\ub77c\uc774\uc13c\uc2a4\uac00 \uc0ad\uc81c\ub418\uc5c8\uc2b5\ub2c8\ub2e4",
      pt: "Licen\xe7a removida",
      zh_CN: "\u8bb8\u53ef\u8bc1\u5df2\u5220\u9664",
    });
    var strLicense = localize({
      de: "Lizenz",
      en: "License",
      es: "Licencia",
      fr: "Licence",
      it: "Licenza",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\ub77c\uc774\uc13c\uc2a4",
      pt: "Licen\xe7a",
      zh_CN: "\u8bb8\u53ef\u8bc1",
    });
    var strLicenses = localize({
      de: "Lizenzen",
      en: "Licenses",
      es: "Licencias",
      fr: "Licences",
      it: "Licenze",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\ub77c\uc774\uc13c\uc2a4\ub4e4",
      zh_CN: "\u8bb8\u53ef\u8bc1",
    });
    var strLicenseEnds = localize({
      de: "Lizenzlaufzeit endet: ",
      en: "License expires: ",
      es: "Licencia expira: ",
      fr: "Licence expir\xe9e: ",
      it: "Licenza scaduta: ",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u671f\u9650\u304c\u5207\u308c\u307e\u3057\u305f: ",
      kr: "\ub77c\uc774\uc13c\uc2a4 \ub9cc\uae30: ",
      pt: "Licen\xe7a expira em: ",
      zh_CN: "\u8bb8\u53ef\u8bc1\u5230\u671f\u65e5: ",
    });
    var strBTA = localize({
      de: "Beta-Lizenz",
      en: "Beta License",
      es: "Licencia Beta",
      fr: "Licence Beta",
      it: "Licenza Beta",
      ja: "\u30d9\u30fc\u30bf\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\ubca0\ud0c0 \ub77c\uc774\uc13c\uc2a4",
      pt: "Licen\xe7a Beta",
      zh_CN: "Beta \u8bb8\u53ef\u8bc1",
    });
    var strEDU = localize({
      de: "EDU-Lizenz",
      en: "Educational License",
      es: "Licencia Educacional",
      fr: "Licence \xe9ducative",
      it: "Licenza Educational",
      ja: "\u6559\u80b2\u6a5f\u95a2\u7528\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\uad50\uc721\uc801\uc778 \ub77c\uc774\uc13c\uc2a4",
      pt: "Licen\xe7a Educacional",
      zh_CN: "\u6559\u80b2\u8bb8\u53ef\u8bc1",
    });
    var strFLT = localize({
      de: "Floating-Lizenz",
      en: "Floating License",
      es: "Licencia flotante",
      fr: "Licence flottante",
      it: "Licenza Floating",
      ja: "\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4",
      pt: "Licen\xe7a flutuante",
      zh_CN: "\u6d6e\u52a8\u8bb8\u53ef\u8bc1",
    });
    var strUNKNOWN = localize({
      de: "Lizenz mit unbekanntem Typ",
      en: "License of unknown type",
      es: "Licencia de tipo desconocido",
      fr: "Licence inconnue",
      it: "Licenza di tipo sconosciuto",
      ja: "\u4e0d\u660e\u306a\u7a2e\u985e\u306e\u30e9\u30a4\u30bb\u30f3\u30b9",
      kr: "\uc0c8\ub85c\uc6b4 \uc885\ub958\uc758 \ub77c\uc774\uc13c\uc2a4",
      pt: "Licen\xe7a de tipo desconhecido",
      zh_CN: "\u672a\u77e5\u7c7b\u578b\u7684\u8bb8\u53ef\u8bc1",
    });
    var strTrialExpired = localize({
      de: "Testversion abgelaufen",
      en: "Cgpersia Forum",
      es: "Termino de prueba expirado",
      fr: "P\xe9riode d\'\xe9valuation termin\xe9e",
      it: "Periodo di valutazione scaduto",
      ja: "\u30c8\u30e9\u30a4\u30a2\u30eb\u7248\u306e\u8a66\u7528\u671f\u9650\u304c\u5207\u308c\u307e\u3057\u305f",
      kr: "\uc528\uc9c0\ud398\ub974\uc2dc\uc544 \ud3ec\ub7fc",
      pt: "Vers\xe3o de teste expirou",
      zh_CN: "\u8bd5\u7528\u5df2\u8fc7\u671f",
    });
    var strEnterLicenseCode = localize({
      de: "Bitte gib den Lizenzcode ein.",
      en: "Please enter the license code.",
      es: "Por favor, introduzca el c\xf3digo de licencia.",
      fr: "Veuillez entrer votre num\xe9ro de licence.",
      it: "Si prega di inserire il codice di licenza.",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044",
      kr: "\ub77c\uc774\uc13c\uc2a4 \ucf54\ub4dc\ub97c \uc785\ub825\ud558\uc2ed\uc2dc\uc624",
      pt: "Por favor, digite o c\xf3digo da licen\xe7a",
      zh_CN: "\u8bf7\u8f93\u5165\u8bb8\u53ef\u8bc1\u3002",
    });
    var strPasteHelp = localize({
      de:
        "(Wenn das Einf\xfcgen mit " +
          cmdKey +
          "+V nicht funktioniert, versuche " +
          parseFloat(app.version) >=
        10
          ? "Rechtsklick und Einf\xfcgen)"
          : "Bearbeiten->Einf\xfcgen)",
      en:
        "(If pasting the code with " +
          cmdKey +
          "+V doesn\'t work try " +
          parseFloat(app.version) >=
        10
          ? "Right-Click and Paste)"
          : "Edit->Paste)",
      es:
        "(Si pegar la licencia usando " +
          cmdKey +
          "+V no funciona, pruebe " +
          parseFloat(app.version) >=
        10
          ? "Clic derecho y pegar)"
          : "Edici\xf3n->Pegar)",
      fr:
        "(Si vous ne parvenez pas \xe0 coller le code avec " +
          cmdKey +
          "+V, essayez " +
          parseFloat(app.version) >=
        10
          ? "Clic droit et Coller)"
          : "Edition->Coller)",
      it:
        "(Non \xe8 possibile incollare il codice con " +
          cmdKey +
          "+V, prova a " +
          parseFloat(app.version) >=
        10
          ? "cliccare il tasto destro del mouse e scegliere Incolla)"
          : "Modifica->Incolla)",
      ja:
        "(\u3082\u3057\u30da\u30fc\u30b9\u30c8\u306e\u30b7\u30e7\u30fc\u30c8\u30ab\u30c3\u30c8 " +
          cmdKey +
          "+V \u304c\u6a5f\u80fd\u3057\u306a\u3044\u5834\u5408, " +
          parseFloat(app.version) >=
        10
          ? "\u53f3\u30af\u30ea\u30c3\u30af\u304b\u3089\u30da\u30fc\u30b9\u30c8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044)"
          : "\u7de8\u96c6->\u30da\u30fc\u30b9\u30c8\u3092\u9078\u629e\u3057\u3066\u304f\u3060\u3055\u3044)",
      kr:
        "(\uc758 \ucf54\ub4dc\ub97c \ubcf5\uc0ac \ud588\uc744\ub54c \uc791\ub3d9 \ud558\uc9c0 \uc54a\ub294\ub2e4\uba74 \ub97c \uc2dc\ub3c4\ud558\uc2ed\uc2dc\uc624.  " +
          cmdKey +
          "+V \uc624\ub978\ucabd \ud074\ub9ad \uadf8\ub9ac\uace0 \ubcf5\uc0ac " +
          parseFloat(app.version) >=
        10
          ? "\uace0\uce58\uae30)"
          : "\ubcf5\uc0ac)",
      pt:
        "(Se colar o c\xf3digo com " +
          cmdKey +
          "+V n\xe3o funcionar, tente " +
          parseFloat(app.version) >=
        10
          ? "Bot\xe3o direito do mouse e Colar)"
          : "Editar->Colar)",
      zh_CN:
        "(\u5982\u679c\u65e0\u6cd5\u901a\u8fc7 " +
          cmdKey +
          "+V \u7c98\u8d34\u8bb8\u53ef\u8bc1\uff0c\u8bf7\u5c1d\u8bd5" +
          parseFloat(app.version) >=
        10
          ? "\u53f3\u952e\u7c98\u8d34)"
          : "\u7f16\u8f91->\u7c98\u8d34)",
    });
    var strTrialInstructMsg = localize({
      de: 'Um die Testversion zu starten, gib "trial" ein.',
      en: "To run in trial mode type: trial",
      es: "Para ejecutar el modo Trial, escriba: trial",
      fr: "Pour lancer la version de d\'\xe9valuation, tapez: trial",
      it: 'Per avviare in modalit\xe0 prova, scrivere: "trial"',
      ja: '\u30c8\u30e9\u30a4\u30a2\u30eb\u30e2\u30fc\u30c9\u3067\u5b9f\u884c\u3059\u308b\u306b\u306f, "trial"\u3068\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044',
      kr: "\uc2dc\ud5d8\ubaa8\ub4dc\ub97c \uc0ac\uc6a9\ud558\uace0 \uc2f6\uc73c\uba74 \uc2dc\ud5d8\ub97c \uc4f0\uc2ed\uc2dc\uc624",
      pt: 'Para rodar na vers\xe3o teste, digite "trial"',
      zh_CN:
        "\u5728\u8bd5\u7528\u6a21\u5f0f\u4e0b\u8fd0\u884c\uff0c\u8f93\u5165: trial",
    });
    var strOr = localize({
      de: "oder",
      en: "or",
      es: "o",
      fr: "ou",
      it: "o",
      ja: "\u307e\u305f\u306f",
      kr: "\ub610\ub294",
      pt: "ou",
      zh_CN: "\u6216",
    });
    var strServerInstructMsg = localize({
      de: "Aktiviere eine Lizenz vom Server mit @REMOTE",
      en: "Activate a license from the server with @REMOTE",
      es: "Activar una licencia del servidor con @REMOTE",
      fr: "Activer une licence depuis le serveur avec @REMOTE",
      it: "Attiva una licenza dal server con @REMOTE",
      ja: "@REMOTE \u30b5\u30fc\u30d0\u30fc\u304b\u3089\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u6709\u52b9\u5316\u3059\u308b",
      kr: "\ub77c\uc774\uc13c\uc2a4\ub97c @REMOTE \uc11c\ubc84\uc5d0\uc11c \ud65c\uc131\ud654\ud558\uc2ed\uc2dc\uc624",
      pt: "Ative uma licen\xe7a a partir do servidor com @REMOTE",
      zh_CN:
        "\u4f7f\u7528 @REMOTE \u4ece\u670d\u52a1\u5668\u6fc0\u6d3b\u8bb8\u53ef\u8bc1",
    });
    var strServerNotRunning = localize({
      de: "Der Client ist konfiguriert, aber der Floating License Server l\xe4uft nicht oder ist nicht erreichbar.",
      en: "Client configured but floating license server is either not running or not accessible.",
      es: "Cliente configurado pero servidor de licencias flotantes o no est\xe1 ejecutado o no es accesible.",
      fr: "Client configur\xe9 mais le serveur de licences flottantes est soit \xe9teint, soit il n\'est pas accessible.",
      it: "Client configurato, ma la licenza Floating Server risulta non funzionante o non accessibile",
      ja: "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u306b\u8a2d\u5b9a\u3055\u308c\u3066\u3044\u307e\u3059\u304c, \u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u304c\u52d5\u4f5c\u3057\u3066\u3044\u306a\u3044\u304b, \u305d\u308c\u306b\u30a2\u30af\u30bb\u30b9\u3067\u304d\u307e\u305b\u3093.",
      kr: "\uc0ac\uc6a9\uc790\uac00 \ud658\uacbd\uc744 \uc124\uc815 \ud558\uc600\uc9c0\ub9cc, \uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\ub294 \uc811\uadfc \ub610\ub294 \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4.",
      pt: "Cliente configurado, mas o servidor da licen\xe7a flutuante n\xe3o est\xe1 rodando ou est\xe1 inacess\xedvel.",
      zh_CN:
        "\u5ba2\u6237\u7aef\u5df2\u914d\u7f6e\uff0c\u4f46\u662f\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668\u65e0\u6cd5\u8fd0\u884c\u6216\u4e0d\u53ef\u8bbf\u95ee\u3002",
    });
    var strGetHelp = localize({
      de: "Hilfe",
      en: "Get Help",
      es: "Ayuda",
      fr: "Aide",
      it: "Assistenza",
      ja: "\u30d8\u30eb\u30d7",
      kr: "\ub3c4\uc6c0\ubc1b\uae30",
      pt: "Ajuda",
      zh_CN: "\u83b7\u5f97\u5e2e\u52a9",
    });
    var strClickOnGetHelp = localize({
      de:
        "Bitte klicke auf " +
        strGetHelp +
        " und sende einen Screenshot von diesem Fehler.",
      en:
        "Please click on " +
        strGetHelp +
        " and send a screenshot of this error.",
      fr:
        "Veuillez cliquer sur " +
        strGetHelp +
        " et envoyer une capture d\'\xe9cran de cette erreur.",
      it:
        "Si prega di cliccare su " +
        strGetHelp +
        " e inviare uno screenshot di questo errore.",
      ja:
        strGetHelp +
        "\u3092\u30af\u30ea\u30c3\u30af\u3057, \u3053\u306e\u30a8\u30e9\u30fc\u306e\u30b9\u30af\u30ea\u30fc\u30f3\u30b7\u30e7\u30c3\u30c8\u3092\u9001\u4fe1\u3057\u3066\u304f\u3060\u3055\u3044.",
      kr:
        "\ub204\ub974\uc2ed\uc2dc\uc624" +
        strGetHelp +
        " \uc5d0\ub7ec\ub97c \ucea1\uccd0\ud558\uc5ec \ubcf4\ub0b4\uae30.",
      pt:
        "Por favor, clique em " +
        strGetHelp +
        " e mande uma imagem desse erro.",
      zh_CN:
        "\u8bf7\u70b9\u51fb" +
        strGetHelp +
        "\u5e76\u53d1\u9001\u6b64\u9519\u8bef\u7684\u622a\u56fe\u3002",
    });
    var strPleaseEnterALicense = localize({
      de: "Bitte Lizenz installieren",
      en: "Please enter a license",
      es: "Por favor, instale una licencia",
      fr: "Veuillez entrer une licence",
      it: "Si prega di inserire la licenza",
      ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u5165\u529b\u3057\u3066\u304f\u3060\u3055\u3044",
      kr: "\ub77c\uc774\uc13c\uc2a4\ub97c \uc785\ub825\ud558\uc2ed\uc2dc\uc624",
      pt: "Digite a licen\xe7a",
      zh_CN: "\u8bf7\u8f93\u5165\u8bb8\u53ef\u8bc1",
    });
    var getHelpUrls = {
      activation_faq:
        "https://aescripts.com/knowledgebase/index/view/faq/license-activation-management/",
      floating_faq:
        "https://aescripts.com/knowledgebase/index/view/faq/floating-license-faq/",
      license_faq:
        "https://aescripts.com/knowledgebase/index/view/faq/license-code-faq/",
      open_ticket: "https://aescripts.com/contact/?direct=1",
    };
    var licErrors = {
      "-1": {
        detail: localize({ en: "" }),
        title: strInvalidLicense,
        url: getHelpUrls.license_faq,
      },
      "-10": {
        detail: localize({
          de: "Verifizierung des Lizenzformats fehlgeschlagen",
          en: "License format verification failed",
          es: "El formato de la licencia no verifica",
          it: "Verifica del formato della licenza fallita",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u5f62\u5f0f\u306e\u78ba\u8a8d\u306b\u5931\u6557\u3057\u307e\u3057\u305f",
          kr: "\ub77c\uc774\uc13c\uc2a4 \ud3ec\ub9f7 \ud655\uc778\uc774 \uc2e4\ud328\ud558\uc600\uc2b5\ub2c8\ub2e4",
          zh_CN: "\u8bb8\u53ef\u8bc1\u683c\u5f0f\u9a8c\u8bc1\u5931\u8d25",
        }),
        title: strInvalidLicense,
        url: getHelpUrls.license_faq,
      },
      "-100": {
        detail: localize({
          de: "Jetzt ist eine g\xfcltige Lizenz erforderlich. Du kannst eine Lizenz kaufen, indem du auf den Button \'Lizenz kaufen\' klickst",
          en: "A valid license is now required. You can purchase a license by clicking the \'Buy License\' button",
          fr: "Une licence valide est maintenant requise. Vous pouvez en acheter une en cliquant sur le bouton \'Acheter une licence\'",
          it: "\xc8 necessaria una licenza valida. Puoi comprarne una cliccando sul pulsante \'Buy License\'",
          ja: "\u6709\u52b9\u306a\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u5fc5\u8981\u3067\u3059. \'\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u8cfc\u5165\'\u3092\u30af\u30ea\u30c3\u30af\u3057\u3066\u30e9\u30a4\u30bb\u30f3\u30b9\u3092\u8cfc\u5165\u3057\u3066\u304f\u3060\u3055\u3044",
          kr: "\uc720\ud6a8\ud55c \ub77c\uc774\uc13c\uc2a4\uac00 \ud544\uc694\ud569\ub2c8\ub2e4.  \'\ub77c\uc774\uc13c\uc2a4 \uad6c\ub9e4 \ubc84\ud2bc\' \uc744 \ud074\ub9ad\ud558\uc5ec \ub77c\uc774\uc13c\uc2a4\ub97c \uad6c\uc785\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4",
          pt: "\xc9 necess\xe1ria uma licen\xe7a v\xe1lida. Compre uma licen\xe7a clicando no bot\xe3o \'Buy License\'",
          zh_CN:
            '\u73b0\u9700\u8981\u4e00\u4e2a\u6709\u6548\u7684\u8bb8\u53ef\u8bc1\u3002\u60a8\u53ef\u4ee5\u70b9\u51fb"\u8d2d\u4e70\u8bb8\u53ef\u8bc1"\u6309\u94ae\u8d2d\u4e70',
        }),
        title: localize({
          de: "Testversion abgelaufen",
          en: "Cgpersia Forum",
          es: "Esta versi\xf3n de prueba se ha expirado",
          fr: "P\xe9riode d\'\xe9valuation expir\xe9e",
          it: "Periodo di valutazione terminato",
          ja: "\u8a66\u7528\u671f\u9650\u5207\u308c",
          kr: "\uc528\uc9c0\ud398\ub974\uc2dc\uc544 \ud3ec\ub7fc",
          pt: "Vers\xe3o teste expirada",
          zh_CN: "\u8bd5\u7528\u5df2\u8fc7\u671f",
        }),
        url: "",
      },
      "-101": {
        detail: localize({
          de: "Bitte konfiguriere oder deaktiviere alle Firewalls oder Virenprogramme, die den Zugriff auf den Basisordner blockieren k\xf6nnten. Wenn dieser Zugriff blockiert ist, kann die Lizenz nicht verifiziert werden.",
          en: "Please configure or disable any firewalls or virus software that might be blocking access to the home folder. If this access is blocked the license cannot be verified.",
          es: "Configure o desactive cualquier firewall o software antivirus que pueda estar bloqueando el acceso a la carpeta de inicio. Si este acceso est\xe1 bloqueado, la licencia no se puede verificar.",
          fr: "Veuillez configurer ou d\xe9sactiver tous les parre-feux ou logiciels antivirus susceptibles de bloquer l\'acc\xe8s au dossier de l\'utilisateur. Si cet acc\xe8s est bloqu\xe9, la licence ne peut pas \xeatre v\xe9rifi\xe9e.",
          it: "Si prega di configurare o disabilitare tutti i firewall o il software antivirus che potrebbero bloccare l\'accesso alla cartella home. Se l\'accesso \xe8 bloccato, la licenza non pu\xf2 essere verificata.",
          ja: "\u30db\u30fc\u30e0\u30d5\u30a9\u30eb\u30c0\u3078\u306e\u30a2\u30af\u30bb\u30b9\u3092\u30d6\u30ed\u30c3\u30af\u3057\u3066\u3044\u308b\u53ef\u80fd\u6027\u306e\u3042\u308b\u30d5\u30a1\u30a4\u30a2\u30a6\u30a9\u30fc\u30eb\u307e\u305f\u306f\u30a6\u30a3\u30eb\u30b9\u5bfe\u7b56\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u3092\u7121\u52b9\u5316\u3057\u3066\u304f\u3060\u3055\u3044. \u3053\u306e\u30a2\u30af\u30bb\u30b9\u304c\u30d6\u30ed\u30c3\u30af\u3055\u308c\u3066\u3044\u308b\u3068\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u6709\u52b9\u5316\u3055\u308c\u307e\u305b\u3093.",
          kr: "\ud648 \ud3f4\ub354\uc5d0 \uc811\uadfc\ud558\uae30 \uc704\ud574 \ubc29\ud654\ubcbd\uacfc \ubc14\uc774\ub7ec\uc2a4 \uc18c\ud504\ud2b8 \uc6e8\uc5b4\uc758 \uc138\ud305\uc744 \ubcc0\uacbd \ud558\uc2ed\uc2dc\uc624. \ub9cc\uc57d \uc811\uadfc\uc774 \uc81c\ud55c\ub418\uba74 \uc774 \ub77c\uc774\uc13c\uc2a4\ub294 \uc811\uadfc\uc774 \ubd88\uac00\ud55c \ub77c\uc774\uc13c\uc2a4 \uc785\ub2c8\ub2e4.",
          pt: "Configure ou desabilite qualquer firewall ou antivirus que possa estar bloqueando acesso \xe0 pasta do usu\xe1rio. Se esse acesso estiver bloqueado, a licen\xe7a n\xe3o poder\xe1 ser verificada.",
          zh_CN:
            "\u8bf7\u914d\u7f6e\u6216\u7981\u7528\u4efb\u4f55\u9632\u706b\u5899\u6216\u75c5\u6bd2\u8f6f\u4ef6\uff0c\u4ee5\u9632\u6b62\u8bbf\u95ee home \u76ee\u5f55\u65f6\u88ab\u963b\u6b62\u3002\u5982\u679c\u8bbf\u95ee\u88ab\u963b\u6b62\uff0c\u5219\u8bb8\u53ef\u8bc1\u65e0\u6cd5\u88ab\u9a8c\u8bc1\u3002",
        }),
        title: localize({
          de: "Zugriff blockiert",
          en: "Access Blocked",
          es: "Acceso bloqueado",
          fr: "Acc\xe8s bloqu\xe9",
          it: "Accesso Bloccato",
          ja: "\u30a2\u30af\u30bb\u30b9\u304c\u30d6\u30ed\u30c3\u30af\u3055\u308c\u307e\u3057\u305f",
          kr: "\uc811\uadfc \uc81c\ud55c",
          pt: "Acesso bloqueado",
          zh_CN: "\u8bbf\u95ee\u88ab\u963b\u6b62",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-102": {
        detail: strClickOnGetHelp,
        title: localize({
          de: "Kein Ergebnis",
          en: "No result code",
          es: "No hay c\xf3digo de resultado",
          fr: "Pas de code de r\xe9sultat",
          it: "codice senza risultato",
          ja: "\u7d50\u679c\u30b3\u30fc\u30c9\u304c\u3042\u308a\u307e\u305b\u3093",
          kr: "\uacb0\uacfc \ubd80\ud638\uac00 \uc5c6\uc74c",
          pt: "Nenhum c\xf3digo retornado",
          zh_CN: "\u65e0\u7ed3\u679c\u7801",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-103": {
        detail: localize({
          de: "Die Anzahl der Test-Tage konnte nicht gefunden werden",
          en: "Could not find the number of trial days",
          es: "No se pudo encontrar el n\xfamero de d\xedas de prueba",
          fr: "Echec d\'identification du nombre de jour de p\xe9riode d\'essai disponibles",
          it: "Non \xe8 possibile trovare il numero di giorni di prova",
          ja: "\u8a66\u7528\u671f\u9593\u65e5\u6570\u304c\u898b\u3064\u3051\u3089\u308c\u307e\u305b\u3093\u3067\u3057\u305f",
          kr: "\uc2dc\ud589\uc77c \ubc88\ud638\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o foi poss\xedvel encontrar o n\xfamero de dias de teste",
          zh_CN: "\u672a\u80fd\u627e\u5230\u8bd5\u7528\u7684\u5929\u6570",
        }),
        title: localize({
          de: "Anzahl der Test-Tage nicht festgelegt",
          en: "No trial days found",
          es: "No se encontraron d\xedas de prueba",
          fr: "Impossible de trouver des jours d\'essai",
          it: "Nessun giorno di prova trovato",
          ja: "\u8a66\u7528\u671f\u9593\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093",
          kr: "\uc2dc\ud589\uc77c\uc774 \uc5c6\uc74c,",
          pt: "N\xe3o foram encontrados os dias de teste",
          zh_CN: "\u672a\u627e\u5230\u8bd5\u7528\u5929\u6570",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-104": {
        detail: localize({
          de: "Die Lizenz ist nicht f\xfcr dieses Produkt",
          en: "The license is not for this product",
          es: "La licencia no es para este producto",
          fr: "Cette licence n\'est pas valable pour ce produit",
          it: "La licenza non \xe8 valida per questo prodotto",
          ja: "\u3053\u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u3053\u306e\u88fd\u54c1\u306e\u3082\u306e\u3067\u306f\u3042\u308a\u307e\u305b\u3093",
          kr: "\uc774 \uc0c1\ud488\uc744 \uc704\ud55c \ub77c\uc774\uc13c\uc2a4\uac00 \uc544\ub2d9\ub2c8\ub2e4",
          pt: "A licen\xe7a n\xe3o \xe9 para esse produto",
          zh_CN:
            "\u6b64\u8bb8\u53ef\u8bc1\u5e76\u975e\u7528\u4e8e\u6b64\u4ea7\u54c1",
        }),
        title: localize({
          de: "Ung\xfcltige Lizenz",
          en: "License mismatch",
          es: "La licencia no es la correcta",
          fr: "Mauvaise licence",
          it: "Mancata corrispondenza della licenza",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u4e0d\u4e00\u81f4",
          kr: "\ubd80\ud569\ud55c \ub77c\uc774\uc13c\uc2a4",
          pt: "Licen\xe7a incorreta",
          zh_CN: "\u8bb8\u53ef\u8bc1\u4e0d\u5339\u914d",
        }),
        url: getHelpUrls.license_faq,
      },
      "-105": {
        detail: localize({
          de: "Eine Beta-Lizenz kann f\xfcr diese Vollversion nicht verwendet werden",
          en: "A beta license cannot be used for the full version",
          es: "No se puede utilizar una licencia \'beta\' con esta versi\xf3n",
          fr: "Une licence de version beta ne peut \xeatre utilis\xe9e pour le produit final",
          it: "La licenza beta non pu\xf2 essere usata per la versione completa",
          ja: "\u30d9\u30fc\u30bf\u7248\u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u88fd\u54c1\u7248\u306b\u306f\u4f7f\u3048\u307e\u305b\u3093.",
          kr: "\ud480\ubc84\uc804\uc5d0\ub294 \ubca0\ud0c0 \ub77c\uc774\uc13c\uc2a4\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o \xe9 poss\xedvel usar uma licen\xe7a beta para essa vers\xe3o",
          zh_CN:
            "Beta \u8bb8\u53ef\u8bc1\u4e0d\u80fd\u7528\u4e8e\u5b8c\u6574\u7248",
        }),
        title: localize({
          de: "Beta-Lizenz nicht verwendbar",
          en: "Cannot use beta license",
          es: "No se puede usar licencia beta",
          fr: "Licence beta invalide",
          it: "Impossibile usare la licenza beta",
          ja: "\u30d9\u30fc\u30bf\u7248\u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u4f7f\u3048\u307e\u305b\u3093",
          kr: "\ubca0\ud0c0\ub77c\uc774\uc13c\uc2a4\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o \xe9 poss\xedvel usar a licen\xe7a beta",
          zh_CN: "\u4e0d\u80fd\u4f7f\u7528 Beta \u8bb8\u53ef\u8bc1",
        }),
        url: getHelpUrls.license_faq,
      },
      "-106": {
        detail: localize({
          de: "Dieses Produkt beinhaltet keine Testversion und ben\xf6tigt eine Lizenz",
          en: "This product does not offer a trial and requires a license",
          es: "Este producto no ofrece una version de prueba y requiere una licencia",
          fr: "Ce produit ne propose pas de p\xe9riode d\'essai et n\xe9cessite une licence",
          it: "Questo prodotto non offre una versione di prova e richiede una licenza",
          ja: "\u3053\u306e\u88fd\u54c1\u306f\u8a66\u7528\u7248\u3067\u306f\u306a\u304f, \u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u5fc5\u8981\u3067\u3059",
          kr: "\uc774 \uc0c1\ud488\uc740 \uc2dc\ud5d8\uacfc \ub77c\uc774\uc13c\uc2a4\ub97c \uc81c\uacf5\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4",
          pt: "Esse produto n\xe3o oferece uma vers\xe3o de teste e precisa de uma licen\xe7a",
          zh_CN:
            "\u6b64\u4ea7\u54c1\u4e0d\u63d0\u4f9b\u8bd5\u7528\u5e76\u9700\u8981\u8bb8\u53ef",
        }),
        title: strPleaseEnterALicense,
        url: getHelpUrls.license_faq,
      },
      "-107": {
        detail: localize({
          de: "Diese Beta-Version beinhaltet keine Testversion und ben\xf6tigt eine Lizenz",
          en: "The beta version does not offer a trial and requires a license",
          es: "La versi\xf3n beta no ofrece una versi\xf3n de prueba y requiere una licencia",
          fr: "La version beta de ce produit ne propose pas de p\xe9riode d\'essai et n\xe9cessite une licence",
          it: "La veriosne beta non offre una versione di prova e richiede una licenza",
          ja: "\u30d9\u30fc\u30bf\u7248\u3067\u306f\u8a66\u7528\u7248\u306f\u63d0\u4f9b\u3055\u308c\u3066\u304a\u3089\u305a, \u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u5fc5\u8981\u3067\u3059",
          kr: "\ubca0\ud0c0\ubc84\uc804\uc740 \uc2dc\ud5d8\uacfc \ub77c\uc774\uc13c\uc2a4\ub97c \uc81c\uacf5\ud558\uc9c0 \uc54a\uc2b5\ub2c8\ub2e4",
          pt: "A vers\xe3o beta n\xe3o oferece vers\xe3o de teste, \xe9 necess\xe1rio uma licen\xe7a",
          zh_CN:
            "Beta \u7248\u4e0d\u63d0\u4f9b\u8bd5\u7528\u5e76\u9700\u8981\u8bb8\u53ef",
        }),
        title: strPleaseEnterALicense,
        url: getHelpUrls.license_faq,
      },
      "-108": {
        detail: localize({
          de: "Bitte konfigurieren oder deaktiviere alle Firewalls oder Virenprogramme, die den Zugriff auf den Basisordner blockieren k\xf6nnten. Wenn dieser Zugriff blockiert ist, kann die Lizenz nicht verifiziert werden.",
          en: "Please configure or disable any firewalls or virus software that might be blocking access to the home folder. If this access is blocked the license cannot be verified.",
          es: "Configure o desactive cualquier firewall o software antivirus que pueda estar bloqueando el acceso a la carpeta de inicio. Si este acceso est\xe1 bloqueado, la licencia no se puede verificar.",
          fr: "Veuillez configurer ou d\xe9sactiver tous les parre-feux ou logiciels antivirus susceptibles de bloquer l\'acc\xe8s au dossier de l\'utilisateur. Si cet acc\xe8s est bloqu\xe9, la licence ne peut pas \xeatre v\xe9rifi\xe9e.",
          it: "Si prega di configurare o disabilitare tutti i firewall o il software antivirus che potrebbero bloccare l\'accesso alla cartella home. Se l\'accesso \xe8 bloccato, la licenza non pu\xf2 essere verificata.",
          ja: "\u30db\u30fc\u30e0\u30d5\u30a9\u30eb\u30c0\u3078\u306e\u30a2\u30af\u30bb\u30b9\u3092\u30d6\u30ed\u30c3\u30af\u3057\u3066\u3044\u308b\u53ef\u80fd\u6027\u306e\u3042\u308b\u30d5\u30a1\u30a4\u30a2\u30a6\u30a9\u30fc\u30eb\u307e\u305f\u306f\u30a6\u30a4\u30eb\u30b9\u5bfe\u7b56\u30bd\u30d5\u30c8\u30a6\u30a7\u30a2\u3092\u7121\u52b9\u5316\u3057\u3066\u304f\u3060\u3055\u3044. \u3053\u306e\u30a2\u30af\u30bb\u30b9\u304c\u30d6\u30ed\u30c3\u30af\u3055\u308c\u3066\u3044\u308b\u3068\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u6709\u52b9\u5316\u3055\u308c\u307e\u305b\u3093.",
          kr: "\ud648 \ud3f4\ub354\uc5d0 \uc811\uadfc\ud558\uae30 \uc704\ud574 \ubc29\ud654\ubcbd\uacfc \ubc14\uc774\ub7ec\uc2a4 \uc18c\ud504\ud2b8 \uc6e8\uc5b4\uc758 \uc138\ud305\uc744 \ubcc0\uacbd \ud558\uc2ed\uc2dc\uc624. \ub9cc\uc57d \uc811\uadfc\uc774 \uc81c\ud55c\ub418\uba74 \uc774 \ub77c\uc774\uc13c\uc2a4\ub294 \uc811\uadfc\uc774 \ubd88\uac00\ud55c \ub77c\uc774\uc13c\uc2a4 \uc785\ub2c8\ub2e4.",
          pt: "Configure ou desabilite o firewall ou antivirus que possa estar bloqueando a pasta do usu\xe1rio. Se a pasta estiver bloqueada, a licen\xe7a n\xe3o pode ser verificada.",
          zh_CN:
            "\u8bf7\u914d\u7f6e\u6216\u7981\u7528\u4efb\u4f55\u53ef\u80fd\u963b\u6321\u8bbf\u95ee home \u6587\u4ef6\u5939\u7684\u9632\u706b\u5899\u6216\u75c5\u6bd2\u8f6f\u4ef6\u3002\u5982\u679c\u6b64\u8bbf\u95ee\u88ab\u963b\u6b62\uff0c\u5219\u65e0\u6cd5\u9a8c\u8bc1\u8bb8\u53ef\u8bc1",
        }),
        title: localize({
          de: "Nicht in der Lage, auf den Home-Ordner zuzugreifen",
          en: "Not able to access home folder",
          es: "No se puede acceder a la carpeta de inicio",
          fr: "Impossible d\'acc\xe9der au dossier de l\'utilisateur",
          it: "Non si riesce ad accedere alla cartella home",
          ja: "\u30db\u30fc\u30e0\u30d5\u30a9\u30eb\u30c0\u306b\u30a2\u30af\u30bb\u30b9\u51fa\u6765\u307e\u305b\u3093",
          kr: "\ud648 \ud3f4\ub354\uc5d0 \uc811\uadfc \ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o foi poss\xedvel acessar a pasta do usu\xe1rio",
          zh_CN: "\u65e0\u6cd5\u8bbf\u95ee home \u76ee\u5f55",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-11": {
        detail: localize({
          de: "Lizenz ist nicht mehr g\xfcltig",
          en: "License is no longer valid",
          es: "La licencia ya no es v\xe1lida",
          it: "Licenza non pi\xf9 valida",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u3082\u306f\u3084\u6709\u52b9\u3067\u306f\u3042\u308a\u307e\u305b\u3093",
          kr: "\uc0ac\uc6a9\ud560 \uc218 \uc5c6\ub294 \ub77c\uc774\uc13c\uc2a4 \uc785\ub2c8\ub2e4",
          zh_CN: "\u8bb8\u53ef\u8bc1\u4e0d\u518d\u6709\u6548",
        }),
        title: strInvalidLicense,
        url: getHelpUrls.open_ticket,
      },
      "-12": {
        detail: localize({
          de: "Lizenzschl\xfcssel ist ung\xfcltig",
          en: "License key is invalid",
          es: "La llave de la licencia no es v\xe1lida",
          it: "Chiave della licenza non valida",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u30ad\u30fc\u304c\u7121\u52b9\u3067\u3059",
          kr: "\ub77c\uc774\uc13c\uc2a4 \ud0a4\ub97c \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          zh_CN: "\u8bb8\u53ef\u8bc1\u5bc6\u94a5\u65e0\u6548",
        }),
        title: localize({
          de: "Ung\xfcltiger Schl\xfcssel",
          en: "Invalid key",
          es: "Invalida llave",
          it: "Chiave invalida",
          ja: "\u7121\u52b9\u306a\u30ad\u30fc",
          kr: "\ubb34\ud6a8\ud55c \ud0a4",
          zh_CN: "\u65e0\u6548\u7684\u5bc6\u94a5",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-14": {
        detail: localize({
          de: "Es konnte keine Netzwerkkarte gefunden werden",
          en: "Could not find a network adapter on this machine",
          es: "No se pudo encontrar un adaptador de red en esta maquina",
          fr: "Impossible de trouver une carte r\xe9seau",
          it: "Non \xe8 possibile trovare un adattatore di rete su questa macchina",
          ja: "\u3053\u306e\u7aef\u672b\u306e\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u30a2\u30c0\u30d7\u30bf\u30fc\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093",
          kr: "\ub124\ud2b8\uc6cc\ud06c \uc5b4\ub311\ud130\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o foi poss\xedvel encontrar um adaptador de rede nessa m\xe1quina",
          zh_CN:
            "\u5728\u8fd9\u53f0\u8bbe\u5907\u4e0a\u627e\u4e0d\u5230\u7f51\u7edc\u9002\u914d\u5668",
        }),
        title: localize({
          de: "Keine Netzwerkkarte",
          en: "Network adapter error",
          es: "Error de adaptador de red",
          fr: "Pas de carte r\xe9seau",
          it: "Errore dell\'adattatore di rete",
          ja: "\u30cd\u30c3\u30c8\u30ef\u30fc\u30af\u30a2\u30c0\u30d7\u30bf\u30fc\u30a8\u30e9\u30fc",
          kr: "\ub124\ud2b8\uc6cc\ud06c \uc5b4\ub311\ud130 \uc624\ub958",
          pt: "Erro ao ler adaptador de rede",
          zh_CN: "\u7f51\u7edc\u9002\u914d\u5668\u9519\u8bef",
        }),
        url: getHelpUrls.license_faq,
      },
      "-15": {
        detail: localize({
          de: "Lizenzlaufzeit beginnt am ",
          en: "License period starts on ",
          es: "El per\xedodo de licencia comienza en ",
          fr: "La p\xe9riode de licence commence ",
          it: "Il periodo di licenza inizia il ",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u671f\u9593\u306e\u958b\u59cb\u65e5  ",
          kr: "\ub77c\uc774\uc13c\uc2a4 \uae30\uac04\uc744 \uc2dc\uc791 ",
          pt: "Per\xedodo de licen\xe7a come\xe7a em ",
          zh_CN: "\u8bb8\u53ef\u8bc1\u6709\u6548\u671f\u5f00\u59cb\u4e8e",
        }),
        title: localize({
          de: "Lizenzlaufzeit hat noch nicht begonnen",
          en: "License period has not started yet",
          es: "El periodo de licencia no ha comenzado)",
          fr: "La p\xe9riode de licence n\'a pas encore commenc\xe9e",
          it: "Il periodo della licenza non \xe8 ancora partito",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u671f\u9593\u304c\u307e\u3060\u59cb\u307e\u3063\u3066\u3044\u307e\u305b\u3093",
          kr: "\ub77c\uc774\uc13c\uc2a4 \uae30\uac04\uc744 \uc544\uc9c1 \uc2dc\uc791\ud558\uc9c0 \uc54a\uc558\uc2b5\ub2c8\ub2e4",
          pt: "Per\xedodo de licen\xe7a ainda n\xe3o come\xe7ou",
          zh_CN: "\u8bb8\u53ef\u8bc1\u6709\u6548\u671f\u5c1a\u672a\u5f00\u59cb",
        }),
        url: getHelpUrls.license_faq,
      },
      "-16": {
        detail: localize({
          de: "Lizenzlaufzeit endete am ",
          en: "License period ended on ",
          es: "El per\xedodo de licencia termin\xf3 en ",
          fr: "La p\xe9riode de licence s\'est termin\xe9e le ",
          it: "Il periodo di licenza termina il ",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u671f\u9593\u306e\u7d42\u4e86\u65e5 ",
          kr: "\ub77c\uc774\uc13c\uc2a4 \uae30\uac04\uc774 \ub05d\ub0ac\uc2b5\ub2c8\ub2e4 ",
          pt: "Per\xedodo de licen\xe7a terminou em ",
          zh_CN: "\u8bb8\u53ef\u8bc1\u6709\u6548\u671f\u7ed3\u675f\u4e8e",
        }),
        title: localize({
          de: "Lizenzlaufzeit ist abgelaufen",
          en: "License period has ended",
          es: "El per\xedodo de licencia ha terminado",
          fr: "La p\xe9riode de licence est termin\xe9e",
          it: "Il periodo di licenza \xe8 terminato",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u671f\u9593\u304c\u7d42\u4e86\u3057\u307e\u3057\u305f",
          kr: "\ub77c\uc774\uc13c\uc2a4 \uae30\uac04\uc774 \uc885\ub8cc \ub418\uc5c8\uc2b5\ub2c8\ub2e4",
          pt: "Per\xedodo de licen\xe7a terminou",
          zh_CN: "\u8bb8\u53ef\u8bc1\u6709\u6548\u671f\u5df2\u7ed3\u675f",
        }),
        url: getHelpUrls.license_faq,
      },
      "-2": {
        detail: localize({
          de: "Diese Lizenz geh\xf6rt zu einem anderen Rechner",
          en: "This license belongs to a different machine",
          es: "Esta licencia pertence a otra maquina",
          it: "Questa licenza appartiene ad una differente macchina",
          ja: "\u3053\u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u4ed6\u306e\u30de\u30b7\u30f3\u3067\u4f7f\u308f\u308c\u3066\u3044\u307e\u3059",
          kr: "\uc774 \ub77c\uc774\uc13c\uc2a4\ub294 \ub2e4\ub978 \uae30\uacc4\uc5d0\uc11c \uc0ac\uc6a9\ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4",
          pt: "Esta licen\xe7a pertence a outra m\xe1quina",
          zh_CN: "\u6b64\u8bb8\u53ef\u8bc1\u5c5e\u4e8e\u5176\u4ed6\u8bbe\u5907",
        }),
        title: strInvalidLicense,
        url: getHelpUrls.license_faq,
      },
      "-20": {
        detail: localize({
          de: "Bitte \xfcberpr\xfcfe, ob die Floating-Lizenz in der Serverkonfiguration korrekt eingegeben wurde.",
          en: "Please double check that the floating license code was entered correctly in the server config",
          fr: "Veuillez v\xe9rifier que le code de licence flottante est entr\xe9 correctement dans la configuration du serveur",
          it: "Si prega di controllare che il codice della licenza floating sia stato inserito correttamente durante la configurazione del server",
          ja: "\u30b5\u30fc\u30d0\u30fc\u306e\u8a2d\u5b9a\u3067\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u6b63\u3057\u304f\u5165\u529b\u3055\u308c\u3066\u3044\u308b\u304b\u518d\u5ea6\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044",
          kr: "\ub77c\uc774\uc13c\uc2a4 \ucf54\ub4dc\ub97c \uc62c\ubc14\ub974\uac8c \uc785\ub825\ud558\uc600\ub294\uc9c0 \ub2e4\uc2dc\ud55c\ubc88 \ud655\uc778\ud558\uc5ec \uc8fc\uc2ed\uc2dc\uc624",
          pt: "Por favor, cheque se a licen\xe7a flutuante foi inserida corretamente nas configura\xe7\xf5es do servidor",
          zh_CN:
            "\u8bf7\u518d\u6b21\u786e\u8ba4\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u5728\u670d\u52a1\u5668\u914d\u7f6e\u4e2d\u88ab\u6b63\u786e\u7684\u8f93\u5165",
        }),
        title: localize({
          de: "Ung\xfcltige Floating-Lizenz",
          en: "Invalid floating license",
          es: "La licencia flotante no es v\xe1lida",
          fr: "Licence flottante non valide",
          it: "Licenza floating invalida",
          ja: "\u7121\u52b9\u306a\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9",
          kr: "\uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4\ub97c \uc0ac\uc6a9 \ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "Licen\xe7a flutuante inv\xe1lida",
          zh_CN: "\u65e0\u6548\u7684\u6d6e\u52a8\u8bb8\u53ef\u8bc1",
        }),
        url: getHelpUrls.floating_faq,
      },
      "-21": {
        detail: localize({
          de: "Bitte stellen Sie sicher, dass der Lizenzserver ordnungsgem\xe4\xdf arbeitet",
          en: "Please make sure the floating license server is running properly",
          es: "Aseg\xfarese de que el servidor de licencias est\xe1 funcionando correctamente",
          fr: "Verifiez que le serveur de licences fonctionne correctement",
          it: "Si prega di assicurarsi che il server per le licenze floating stia funzionando",
          ja: "\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u304c\u6b63\u5e38\u306b\u52d5\u4f5c\u3057\u3066\u3044\u308b\u304b\u78ba\u8a8d\u3057\u3066\u304f\u3060\u3055\u3044",
          kr: "\uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\uac00 \uc62c\ubc14\ub974\uac8c \uc791\ub3d9\ud558\ub294\uc9c0 \ud655\uc778\ud558\uc2ed\uc2dc\uc624",
          pt: "Verifique se o servidor da licen\xe7a flutuante est\xe1 funcionando corretamente",
          zh_CN:
            "\u8bf7\u786e\u4fdd\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668\u6b63\u5e38\u8fd0\u884c",
        }),
        title: localize({
          de: "Kann Floating License Server nicht kontaktieren",
          en: "Cannot connect to floating license server",
          es: "No es posible conectar con el servidor de licensias flotantes(-9)",
          fr: "Impossible de se connecter au serveur de licences flottantes",
          it: "Non \xe8 possibile connettersi al server per le licenze floating",
          ja: "\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u306b\u30a2\u30af\u30bb\u30b9\u3067\u304d\u307e\u305b\u3093",
          kr: "\uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\uc5d0 \uc5f0\uacb0\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o foi poss\xedvel conectar com o servidor da licen\xe7a flutuante",
          zh_CN:
            "\u65e0\u6cd5\u8fde\u63a5\u5230\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668",
        }),
        url: getHelpUrls.floating_faq,
      },
      "-22": {
        detail: localize({
          de: "Weitere Informationen zum Einrichten und Lizenzieren von Client-Computern finden Sie in den Anweisungen zum Server.",
          en: "Please refer to the server instructions on how to setup and license client machines.",
          es: "Consulte las instrucciones del servidor sobre c\xf3mo configurar y licenciar las m\xe1quinas cliente.",
          fr: "Veuillez vous reporter aux instructions du serveur pour savoir comment configurer et attribuer une licence aux ordinateurs clients.",
          it: "Si prega di far riferimento alle istruzioni del server per conoscere come impostare le macchine client.",
          ja: "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u30de\u30b7\u30f3\u306e\u30bb\u30c3\u30c8\u30a2\u30c3\u30d7\u3068\u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u53d6\u5f97\u65b9\u6cd5\u306b\u3064\u3044\u3066\u306f, \u30b5\u30fc\u30d0\u306e\u624b\u5f15\u3092\u53c2\u7167\u3057\u3066\u304f\u3060\u3055\u3044.",
          kr: "\uc14b\uc5c5\uacfc \ub77c\uc774\uc13c\uc2a4 \uae30\uacc4 \uc0ac\uc6a9\ubc95 \ud398\uc774\uc9c0\uc5d0\uc11c \uc11c\ubc84 \uc124\uba85\uc11c\ub97c \uc870\ud68c\ud558\uc2ed\uc2dc\uc624.",
          pt: "Consulte as instru\xe7\xf5es do servidor para configurar e licenciar as m\xe1quinas.",
          zh_CN:
            "\u5173\u4e8e\u5982\u4f55\u8bbe\u7f6e\u548c\u8bb8\u53ef\u5ba2\u6237\u7aef\u8bbe\u5907\uff0c\u8bf7\u53c2\u8003\u670d\u52a1\u5668\u8bf4\u660e\u3002",
        }),
        title: localize({
          de: "Floating-Lizenzen k\xf6nnen nur mit dem Floating License Server verwendet werden",
          en: "Floating licenses can only be used with the Floating License Server",
          es: "Las licencias flotantes solo se pueden utilizar con el servidor de licencias flotantes",
          fr: "Les licences flottantes ne peuvent \xeatre utilis\xe9es qu\'avec le serveur de licences flottantes",
          it: "Le licenze floating possono essere utilizzate esclusivamente con il server di licenze floating",
          ja: "\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u306f\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u3067\u306e\u307f\u4f7f\u3048\u307e\u3059",
          kr: "\uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4\ub294 \uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\uc5d0\uc11c\ub9cc \uc0ac\uc6a9 \ud560 \uc218 \uc788\uc2b5\ub2c8\ub2e4",
          pt: "Licen\xe7as flutuantes s\xf3 podem ser utilizadas no servidor de licen\xe7as flutuantes",
          zh_CN:
            "\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u53ea\u80fd\u7528\u4e8e\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668",
        }),
        url: getHelpUrls.floating_faq,
      },
      "-23": {
        detail: localize({
          de: "Auf dem Floating License Server sind aktuell alle Lizenzen vergeben",
          en: "There are no more free slots for this license on the license server",
          es: "No hay m\xe1s espacios libres para esta licencia en el servidor de licencias flotantes",
          fr: "Il n\'y a plus de place sur le serveur de licences flottantes",
          it: "Non ci sono pi\xf9 slot liberi per questa licenza sul server delle licenze floating",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u306b\u3053\u306e\u30e9\u30a4\u30bb\u30f3\u30b9\u306b\u5bfe\u3059\u308b\u7a7a\u3044\u305f\u30b9\u30ed\u30c3\u30c8\u304c\u3082\u3046\u3042\u308a\u307e\u305b\u3093",
          kr: "\ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\uc5d0 \ube48\uc790\ub9ac\uac00 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o h\xe1 mais espa\xe7os dispon\xedveis para esta licen\xe7a neste servidor",
          zh_CN:
            "\u6b64\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u5728\u670d\u52a1\u5668\u4e0a\u6ca1\u6709\u7a7a\u4f59\u7684\u5e2d\u4f4d",
        }),
        title: localize({
          de: "Keine freien Slots",
          en: "No free slots",
          es: "No hay espacios libres",
          fr: "Plus de place",
          it: "Non ci sono slot liberi",
          ja: "\u30b9\u30ed\u30c3\u30c8\u306e\u7a7a\u304d\u304c\u3042\u308a\u307e\u305b\u3093",
          kr: "\ube48\uc790\ub9ac \uc5c6\uc74c",
          pt: "N\xe3o h\xe1 mais espa\xe7os dispon\xedveis",
          zh_CN: "\u6ca1\u6709\u7a7a\u4f59\u7684\u5e2d\u4f4d",
        }),
        url: getHelpUrls.floating_faq,
      },
      "-24": {
        detail: localize({
          de: "Die Lizenz kann auf dem Floating License Server nicht gefunden werden",
          en: "The license cannot be found on the floating license server",
          es: "No se puede encontrar esta licencia en el servidor de licencias flotantes",
          fr: "La licence est introuvable sur le serveur de licences flottantes",
          it: "\xc8 impossibile trovare la licenza sul server delle licenze floating",
          ja: "\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u306b\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093",
          kr: "\uc6d0\ud558\ub294 \ub77c\uc774\uc13c\uc2a4\ub97c \uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\uc5d0\uc11c \ucc3e\uc9c0 \ubabb\ud588\uc2b5\ub2c8\ub2e4",
          pt: "Licen\xe7a n\xe3o encontrada no servidor de licen\xe7as flutuantes",
          zh_CN:
            "\u5728\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668\u4e0a\u627e\u4e0d\u5230\u6b64\u8bb8\u53ef\u8bc1",
        }),
        title: localize({
          de: "Unbekannte Lizenz",
          en: "Unknown license",
          es: "Licencia desconocida",
          fr: "Licence inconnue",
          it: "Licenza sconosciuta",
          ja: "\u672a\u77e5\u306e\u30e9\u30a4\u30bb\u30f3\u30b9",
          kr: "\uc54c\ub824\uc9c0\uc9c0 \uc54a\uc740 \ub77c\uc774\uc13c\uc2a4",
          pt: "Licen\xe7a desconhecida",
          zh_CN: "\u672a\u77e5\u7684\u8bb8\u53ef\u8bc1",
        }),
        url: getHelpUrls.floating_faq,
      },
      "-25": {
        detail: localize({
          de: "Die Lizenz konnte nicht deaktiviert werden, da sie auf dem Floating License Server nicht gefunden werden konnte",
          en: "The license you are trying to deactivate cannot be found on the floating license server",
          es: "La licencia que est\xe1 intentando de desactivar no se encuentra en el servidor de licencias flotantes",
          fr: "La licence que vous essayez de d\xe9sactiver est introuvable sur le serveur de licences flottantes",
          it: "La licenza che si sta provando a disattivare non si riesce a trovare sul server delle licenze floating",
          ja: "\u7121\u52b9\u5316\u3055\u308c\u3088\u3046\u3068\u3057\u3066\u3044\u308b\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u306b\u3042\u308a\u307e\u305b\u3093",
          kr: "\ube44\ud65c\uc131\ud654 \ud558\uace0 \uc2f6\uc740 \ub77c\uc774\uc13c\uc2a4\ub97c \uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\uc5d0\uc11c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "A licen\xe7a que est\xe1 sendo desativada n\xe3o foi encontrada no servidor de licen\xe7as flutuantes",
          zh_CN:
            "\u5728\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668\u4e0a\u627e\u4e0d\u5230\u60a8\u8981\u505c\u7528\u7684\u8bb8\u53ef\u8bc1",
        }),
        title: localize({
          de: "Unbekannte Lizenz",
          en: "Unknown license",
          es: "Licencia desconocida",
          fr: "Licence inconnue",
          it: "Licenza sconosciuta",
          ja: "\u672a\u77e5\u306e\u30e9\u30a4\u30bb\u30f3\u30b9",
          kr: "\uc54c\ub824\uc9c0\uc9c0 \uc54a\uc740 \ub77c\uc774\uc13c\uc2a4",
          pt: "Licen\xe7a desconhecida",
          zh_CN: "\u672a\u77e5\u7684\u8bb8\u53ef\u8bc1",
        }),
        url: getHelpUrls.floating_faq,
      },
      "-26": {
        detail: localize({
          de: "Deine Client IP wird vom Floating License Server abgelehnt",
          en: "Your client IP is being denied by the floating license server",
          it: "L\'indirizzo IP del client \xe8 bloccato dal server delle licenze floating",
          ja: "\u304a\u4f7f\u3044\u306e\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u306eIP\u304c\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u306b\u62d2\u5426\u3055\u308c\u3066\u3044\u307e\u3059",
          kr: "\uc758\ub8b0\uc778\uc758 IP\uac00 \uc720\ub3d9\uc801\uc778 \ub77c\uc774\uc13c\uc2a4 \uc11c\ubc84\uc5d0\uc11c \uac70\ubd80\ub2f9\ud558\uace0 \uc788\uc2b5\ub2c8\ub2e4",
          zh_CN:
            "\u60a8\u7684\u5ba2\u6237\u7aef IP \u88ab\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668\u62d2\u7edd",
        }),
        title: localize({
          de: "Clients ist in der Deny-Liste der Floating License Server-Konfiguration",
          en: "Client in deny list of floating license server config",
          it: "Il client compare nella lista di quelli bloccati nelle impostazioni del server delle licenze floating",
          ja: "\u30af\u30e9\u30a4\u30a2\u30f3\u30c8\u304c\u30d5\u30ed\u30fc\u30c6\u30a3\u30f3\u30b0\u30e9\u30a4\u30bb\u30f3\u30b9\u30b5\u30fc\u30d0\u30fc\u306e\u62d2\u5426\u30ea\u30b9\u30c8\u306b\u8a2d\u5b9a\u3055\u308c\u3066\u3044\u307e\u3059",
          kr: "\uc758\ub8b0\uc778\uc774 \uc720\ub3d9\uc801\uc778 \uc11c\ubc84 \ubc30\uc5f4\uc5d0\uc11c \uac70\ubd80\ub418\uc5c8\uc2b5\ub2c8\ub2e4",
          zh_CN:
            "\u5ba2\u6237\u7aef\u5728\u6d6e\u52a8\u8bb8\u53ef\u8bc1\u670d\u52a1\u5668\u914d\u7f6e\u7684\u62d2\u7edd\u540d\u5355\u4e2d",
        }),
        url: getHelpUrls.floating_faq,
      },
      "-3": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Lizenzdatei nicht gefunden",
          en: "License file not found",
          es: "No se encontr\xf3 el archivo de licencia",
          fr: "Fichier de licence introuvable",
          it: "File di licenza non trovato",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u30d5\u30a1\u30a4\u30eb\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093",
          kr: "\ub77c\uc774\uc13c\uc2a4 \ud30c\uc77c\uc744 \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "Arquivo de licen\xe7a n\xe3o encontrado",
          zh_CN: "\u672a\u627e\u5230\u8bb8\u53ef\u8bc1\u6587\u4ef6",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-30": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Online Aktivierung -  Lizenz ung\xfcltig",
          en: "Online activation -  license invalid",
          fr: "Activation en ligne - licence invalide",
          it: "Attivazione online - licenza invalida",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c - \u7121\u52b9\u306a\u30e9\u30a4\u30bb\u30f3\u30b9",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \uc0ac\uc6a9\ud560 \uc218 \uc5c6\ub294 \ub77c\uc774\uc13c\uc2a4",
          pt: "Ativa\xe7\xe3o online - licen\xe7a inv\xe1lida",
          zh_CN:
            "\u5728\u7ebf\u6fc0\u6d3b - \u65e0\u6548\u7684\u8bb8\u53ef\u8bc1",
        }),
        url: getHelpUrls.activation_faq,
      },
      "-31": {
        detail: localize({
          de: "Diese Lizenz ist nicht l\xe4nger g\xfcltig",
          en: "This license is no longer valid",
          fr: "Cette licence n\'est plus valide",
          it: "Questa licenza non \xe8 pi\xf9 valida",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u6709\u52b9\u671f\u9650\u304c\u5207\u308c\u3066\u3044\u307e\u3059",
          kr: "\uc774 \ub77c\uc774\uc13c\uc2a4\ub294 \ub354\uc774\uc0c1 \uc0ac\uc6a9\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "Essa licen\xe7a n\xe3o \xe9 mais v\xe1lida",
          zh_CN: "\u6b64\u8bb8\u53ef\u8bc1\u4e0d\u518d\u6709\u6548",
        }),
        title: localize({
          de: "Online Aktivierung -  Lizenz abgelaufen",
          en: "Online activation - license expired",
          fr: "Activation en ligne - licence expir\xe9e",
          it: "Attivazione online - licenza scaduta",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c - \u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u671f\u9650\u5207\u308c",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \uae30\ud55c\ub9cc\ub8cc\ub41c \ub77c\uc774\uc13c\uc2a4",
          pt: "Ativa\xe7\xe3o online - licen\xe7a expirada",
          zh_CN:
            "\u5728\u7ebf\u6fc0\u6d3b - \u8bb8\u53ef\u8bc1\u5df2\u8fc7\u671f",
        }),
        url: getHelpUrls.activation_faq,
      },
      "-32": {
        detail: localize({
          de: "Bitte deaktiviere zuerst eine Lizenz, um diese zu aktivieren",
          en: "Please deactivate an existing activation before activating this one.",
          fr: "Veuillez d\xe9sactiver une licence existante avant d\'activer celle-ci.",
          it: "Si prega di disattivare un\'attivazione gi\xe0 esistente prima di attivare questa",
          ja: "\u3053\u306e\u7aef\u672b\u3092\u6709\u52b9\u5316\u3059\u308b\u524d\u306b\u3059\u3067\u306b\u6709\u52b9\u5316\u3055\u308c\u305f\u3082\u306e\u304b\u3089\u4e00\u3064\u7121\u52b9\u5316\u3057\u3066\u304f\u3060\u3055\u3044.",
          kr: "\ud65c\uc131\ud654 \ud558\uc2dc\ub824\uba74 \ud604\uc7ac \uc0ac\uc6a9\ub418\uace0 \ud65c\uc131\uc744 \ube44\ud65c\uc131\ud654 \ud558\uc2ed\uc2dc\uc694",
          pt: "Desative alguma ativa\xe7\xe3o existente, antes de ativar essa.",
          zh_CN:
            "\u8bf7\u5728\u6fc0\u6d3b\u524d\u5148\u505c\u7528\u73b0\u6709\u7684\u6fc0\u6d3b\u3002",
        }),
        title: localize({
          de: "Online Aktivierung -  Die maximale Anzahl an Aktivierungen wurde erreicht",
          en: "Online activation - Maximum number of activations reached",
          fr: "Activation en ligne - Le nombre maximal d\'activations atteint",
          it: "Attivazione online - numero massimo di attivazioni raggiunto",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c - \u6709\u52b9\u5316\u3059\u308b\u6570\u304c\u6700\u5927\u306b\u9054\u3057\u3066\u3044\u307e\u3059",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \ud65c\uc131\ud654 \ubc94\uc704\uc758 \ucd5c\ub300 \uc218",
          pt: "Ativa\xe7\xe3o online - N\xfamero m\xe1ximo de ativa\xe7\xf5es atingido",
          zh_CN:
            "\u5728\u7ebf\u6fc0\u6d3b - \u5df2\u8fbe\u5230\u6700\u5927\u6fc0\u6d3b\u6b21\u6570",
        }),
        url: getHelpUrls.activation_faq,
      },
      "-33": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Keine Verbindung zum Online-Aktivierungsserver",
          en: "Cannot connect to online activation server",
          fr: "Impossible de se connecter au service d\'activation en ligne",
          it: "Impossibile connettersi al server di attivazione online",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c\u30b5\u30fc\u30d0\u30fc\u306b\u63a5\u7d9a\u3067\u304d\u307e\u305b\u3093",
          kr: "\ud65c\uc131\ud654 \uc11c\ubc84\uc5d0 \uc5f0\uacb0\ud560 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          pt: "N\xe3o foi poss\xedvel conectar com o servidor de ativa\xe7\xe3o online",
          zh_CN:
            "\u65e0\u6cd5\u8fde\u63a5\u5230\u5728\u7ebf\u6fc0\u6d3b\u670d\u52a1\u5668",
        }),
        url: getHelpUrls.activation_faq,
      },
      "-34": {
        detail: strClickOnGetHelp,
        title: localize({
          de: "Online Aktivierung - Ung\xfcltiger Payload",
          en: "Online activation - invalid payload",
          fr: "Activation en ligne - payload invalide",
          it: "Attivazione online - payload invalido",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c - \u4e0d\u6b63\u306a\u30da\u30a4\u30ed\u30fc\u30c9",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \ubb34\ud6a8\ud55c \ud398\uc774\ub85c\ub4dc",
          pt: "Ativa\xe7\xe3o online - Carga inv\xe1lida",
          zh_CN: "\u5728\u7ebf\u6fc0\u6d3b - \u65e0\u6548\u7684\u8f7d\u8377",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-35": {
        detail: localize({
          de:
            "Diese Aktivierung muss in deinem Account bei aescripts.com durchgef\xfchrt werden. " +
            strClickOnGetHelp,
          en:
            "This activation needs to be deactivated in your aescripts.com account. " +
            strClickOnGetHelp,
          ja:
            "\u3053\u306e\u8a8d\u8a3c\u306f aescripts.com \u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u7121\u52b9\u5316\u3055\u308c\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059. " +
            strClickOnGetHelp,
          kr:
            "\uc774 \ud65c\uc131\ud654\ub294 \ub2f9\uc2e0\uc758 aescripts.com account \uc5d0\uc11c \ube44\ud65c\uc131\ud654 \ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4." +
            strClickOnGetHelp,
          zh_CN:
            "\u6b64\u6fc0\u6d3b\u9700\u8981\u5728 aescripts.com \u8d26\u6237\u4e2d\u505c\u7528. " +
            strClickOnGetHelp,
        }),
        title: localize({
          de: "Online-Aktivierung - fehlende Ger\xe4te-ID",
          en: "Online activation - missing device id",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c - \u30c7\u30d0\u30a4\u30b9id\u304c\u3042\u308a\u307e\u305b\u3093",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \ubd84\uc2e4\ub41c \ub514\ubc14\uc774\uc2a4 \uc544\uc774\ub514",
          zh_CN: "\u5728\u7ebf\u6fc0\u6d3b - \u7f3a\u5c11\u8bbe\u5907 ID",
        }),
        url: getHelpUrls.activation_faq,
      },
      "-36": {
        detail: localize({
          de: "Keine passende Aktivierung gefunden. " + strClickOnGetHelp,
          en: "No matching activation found. " + strClickOnGetHelp,
          ja:
            "\u4e00\u81f4\u3059\u308b\u30a2\u30af\u30c6\u30a3\u30d9\u30fc\u30b7\u30e7\u30f3\u304c\u898b\u3064\u304b\u308a\u307e\u305b\u3093. " +
            strClickOnGetHelp,
          kr:
            "\ub9de\ub294 \ud65c\uc131\ud654\uac00 \uc5c6\uc2b5\ub2c8\ub2e4. " +
            strClickOnGetHelp,
          zh_CN:
            "\u6ca1\u6709\u5339\u914d\u7684\u6fc0\u6d3b\u8bb0\u5f55. " +
            strClickOnGetHelp,
        }),
        title: localize({
          de: "Online-Aktivierung - kein Datenbankeintrag",
          en: "Online activation - no record in db",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c - \u30c7\u30fc\u30bf\u30d9\u30fc\u30b9\u306b\u8a18\u9332\u304c\u3042\u308a\u307e\u305b\u3093",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \ub370\uc774\ud130\ubca0\uc774\uc2a4\uc5d0 \uae30\ub85d\ud558\uc9c0 \uc54a\uc74c",
          zh_CN:
            "\u5728\u7ebf\u6fc0\u6d3b - \u6570\u636e\u5e93\u4e2d\u6ca1\u6709\u8bb0\u5f55",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-37": {
        detail: strClickOnGetHelp,
        title: localize({
          de: "Online-Aktivierung - fehlende Parameter",
          en: "Online activation - missing parameters",
          ja: "\u30aa\u30f3\u30e9\u30a4\u30f3\u8a8d\u8a3c - \u30d1\u30e9\u30e1\u30fc\u30bf\u30fc\u304c\u3042\u308a\u307e\u305b\u3093",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \ubd84\uc2e4\ub41c \ud55c\ub3c4",
          zh_CN: "\u5728\u7ebf\u6fc0\u6d3b - \u7f3a\u5c11\u53c2\u6570",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-38": {
        detail: localize({
          de:
            "Diese Aktivierung muss in deinem Account bei aescripts.com durchgef\xfchrt werden. " +
            strClickOnGetHelp,
          en:
            "This activation needs to be deactivated in your aescripts.com account. " +
            strClickOnGetHelp,
          ja:
            "\u3053\u306e\u8a8d\u8a3c\u306f aescripts.com \u306e\u30a2\u30ab\u30a6\u30f3\u30c8\u3067\u7121\u52b9\u5316\u3055\u308c\u308b\u5fc5\u8981\u304c\u3042\u308a\u307e\u3059. " +
            strClickOnGetHelp,
          kr:
            "\uc774 \ud65c\uc131\ud654\ub294 \ub2f9\uc2e0\uc758 aescripts.com account \uc5d0\uc11c \ube44\ud65c\uc131\ud654 \ub418\uc5b4\uc57c \ud569\ub2c8\ub2e4. " +
            strClickOnGetHelp,
          zh_CN:
            "\u6b64\u6fc0\u6d3b\u9700\u8981\u5728 aescripts.com \u8d26\u6237\u4e2d\u505c\u7528. " +
            strClickOnGetHelp,
        }),
        title: localize({
          de: "Online-Aktivierung - ung\xfcltige Antwort vom Server",
          en: "Online activation - invalid response from server",
          kr: "\uc628\ub77c\uc778 \ud65c\uc131\ud654 - \uc11c\ubc84\uc5d0\uc11c \uc628 \ubb34\ud6a8\ud55c \uc751\ub2f5",
          zh_CN:
            "\u5728\u7ebf\u6fc0\u6d3b - \u65e0\u6548\u7684\u670d\u52a1\u5668\u54cd\u5e94",
        }),
        url: getHelpUrls.activation_faq,
      },
      "-4": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Lizenzdatei besch\xe4digt",
          en: "License file corrupted",
          es: "El archivo de licencia esta da\xf1ado",
          fr: "Fichier de licence corrompu",
          it: "File di licenza corrotto",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u30d5\u30a1\u30a4\u30eb\u304c\u58ca\u308c\u3066\u3044\u307e\u3059",
          kr: "\ub77c\uc774\uc13c\uc2a4 \ud30c\uc77c\uc774 \uc190\uc0c1\ub418\uc5c8\uc2b5\ub2c8\ub2e4",
          pt: "Arquivo de licen\xe7a est\xe1 corrompido",
          zh_CN: "\u8bb8\u53ef\u8bc1\u6587\u4ef6\u5df2\u635f\u574f",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-40": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Ung\xfcltiger Offline-Aktivierungscode",
          en: "Invalid offline activation code",
          fr: "Code d\'activation hors connexion invalide",
          it: "Codice di attivazione offline invalido",
          ja: "\u7121\u52b9\u306a\u30aa\u30d5\u30e9\u30a4\u30f3\u8a8d\u8a3c\u30b3\u30fc\u30c9",
          kr: "\ubb34\ud6a8\ud55c \uc628\ub77c\uc778 \ud65c\uc131\ud654 \ucf54\ub4dc",
          pt: "C\xf3digo de ativa\xe7\xe3o offline inv\xe1lido",
          zh_CN: "\u65e0\u6548\u7684\u79bb\u7ebf\u6fc0\u6d3b\u7801",
        }),
        url: getHelpUrls.activation_faq,
      },
      "-5": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Allgemeiner Fehler",
          en: "Generic error",
          es: "Error generico",
          fr: "Erreur g\xe9n\xe9rique",
          it: "Errore generico",
          ja: "\u4e00\u822c\u7684\u306a\u30a8\u30e9\u30fc",
          kr: "\ud3ec\uad04\uc801\uc778 \uc624\ub958",
          pt: "Erro gen\xe9rico",
          zh_CN: "\u4e00\u822c\u6027\u9519\u8bef",
        }),
        url: getHelpUrls.license_faq,
      },
      "-6": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Ung\xfcltiger Produktname",
          en: "Invalid product name",
          es: "El nombre de el producto no v\xe1lido",
          fr: "Nom de produit invalide",
          it: "Nome prodotto invalido",
          ja: "\u7121\u52b9\u306a\u88fd\u54c1\u540d",
          kr: "\uc0ac\uc6a9\ud560 \uc218 \uc5c6\ub294 \uc0c1\ud488\uba85",
          pt: "Nome do produto \xe9 inv\xe1lido",
          zh_CN: "\u65e0\u6548\u7684\u4ea7\u54c1\u540d\u79f0",
        }),
        url: getHelpUrls.open_ticket,
      },
      "-7": {
        detail: localize({ en: "" }),
        title: localize({
          de: "Testversion",
          en: "Trial",
          es: "Versi\xf3n de prueba",
          fr: "P\xe9riode d\'\xe9valuation",
          it: "Prova",
          ja: "\u30c8\u30e9\u30a4\u30a2\u30eb\u7248",
          kr: "\uc2dc\ud5d8",
          pt: "Vers\xe3o Teste",
          zh_CN: "\u8bd5\u7528",
        }),
        url: getHelpUrls.license_faq,
      },
      "-8": {
        detail: localize({
          de: "Lizenz hat ung\xfcltiges Format",
          en: "License has invalid format",
          es: "Licencia tiene un formato invalido",
          it: "La licenza ha un formato non valido",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u304c\u4e0d\u6b63\u306a\u5f62\u5f0f\u3067\u3059",
          kr: "\uc774 \ub77c\uc774\uc13c\uc2a4\ub294 \uc0ac\uc6a9\ud560 \uc218 \uc5c6\ub294 \ud3ec\ub9f7\uc744 \uac00\uc84c\uc2b5\ub2c8\ub2e4",
          zh_CN: "\u8bb8\u53ef\u8bc1\u683c\u5f0f\u65e0\u6548",
        }),
        title: strInvalidLicense,
        url: getHelpUrls.license_faq,
      },
      "-9": {
        detail: localize({
          de: "Lizenz-Typ nicht erkannt",
          en: "License type not recognized",
          es: "El tipo de la licencia no se reconoze",
          it: "Tipo di licenza non riconosciuto",
          ja: "\u30e9\u30a4\u30bb\u30f3\u30b9\u306e\u30bf\u30a4\u30d7\u304c\u8a8d\u8b58\u3067\u304d\u307e\u305b\u3093",
          kr: "\ub77c\uc774\uc13c\uc2a4 \uc885\ub958\ub97c \ucc3e\uc744 \uc218 \uc5c6\uc2b5\ub2c8\ub2e4",
          zh_CN: "\u8bb8\u53ef\u8bc1\u7c7b\u578b\u65e0\u6cd5\u8bc6\u522b",
        }),
        title: strInvalidLicense,
        url: getHelpUrls.license_faq,
      },
      "-99": {
        detail: strClickOnGetHelp,
        title: localize({
          de: "Unbekannter Fehler",
          en: "Unknown error",
          es: "Error desconocido",
          fr: "Erreur inconnue",
          it: "Errore sconosciuto",
          ja: "\u672a\u77e5\u306e\u30a8\u30e9\u30fc",
          kr: "\uc54c \uc218 \uc5c6\ub294 \uc5d0\ub7ec",
          pt: "Erro desconhecido",
          zh_CN: "\u672a\u77e5\u9519\u8bef",
        }),
        url: getHelpUrls.open_ticket,
      },
      unknown: {
        detail: localize({ en: "" }),
        title: localize({
          de: "Unbekannter Fehler",
          en: "Unknown error",
          es: "Error desconocido",
          fr: "Erreur inconnue",
          it: "Errore sconosciuto",
          ja: "\u672a\u77e5\u306e\u30a8\u30e9\u30fc",
          kr: "\uc54c \uc218 \uc5c6\ub294 \uc5d0\ub7ec",
          pt: "Erro desconhecido",
          zh_CN: "\u672a\u77e5\u9519\u8bef",
        }),
        url: getHelpUrls.open_ticket,
      },
    };
    this.getSetting = function (header, name) {
      header = strHeader + "_" + header;
      return getSettings(header, name, "settings");
    };
    this.readJSON = function (json) {
      return readJSON(json);
    };
    this.writeJSON = function (obj, file) {
      return writeJSON(obj, file);
    };
    this.JSONify = function (string, mode, prettyJSON) {
      return JSONify(string, mode, prettyJSON);
    };
    this.haveSetting = function (header, name) {
      header = strHeader + "_" + header;
      return haveSettings(header, name, "settings");
    };
    this.saveSetting = function (header, name, value) {
      header = strHeader + "_" + header;
      return saveSettings(header, name, value, "settings");
    };
    this.c = function () {
      saveVersionsToPrefs;
      return mainFunc("l");
    };
    this.s = function () {
      saveVersionsToPrefs;
      if (
        typeof licenseValidity == "undefined" ||
        !licenseValidity.hasOwnProperty("result")
      ) {
        licenseValidity = getVerifCode("");
      }
      return isResultValidLicense(licenseValidity);
    };
    this.r = function () {
      saveVersionsToPrefs;
      return !mainFunc("r");
    };
    this.t = function () {
      saveVersionsToPrefs;
      if (
        typeof licenseValidity == "undefined" ||
        !licenseValidity.hasOwnProperty("result")
      ) {
        licenseValidity = getVerifCode("");
      }
      return isResultTrial(licenseValidity.result);
    };
    this.l = function () {
      saveVersionsToPrefs;
      if (
        typeof licenseValidity == "undefined" ||
        !licenseValidity.hasOwnProperty("result")
      ) {
        licenseValidity = getVerifCode("");
      }
      return licenseValidity.license;
    };
    this.ss = function () {
      saveVersionsToPrefs;
      if (
        typeof licenseValidity == "undefined" ||
        !licenseValidity.hasOwnProperty("result")
      ) {
        licenseValidity = getVerifCode("");
      }
      return (
        isResultValidLicense(licenseValidity) &&
        !isResultTrial(licenseValidity.result)
      );
    };
    this.vt = function () {
      saveVersionsToPrefs;
      return isVT();
    };
    this.helpUI = function (options) {
      saveVersionsToPrefs;
      helpUI(options);
    };
    this.getRegistration = function (val) {
      saveVersionsToPrefs;
      return getRegistration(val);
    };
    this.openSupportTicket = function (options) {
      saveVersionsToPrefs;
      createSupportTicket(options);
    };
    this.openURL = function (url) {
      saveVersionsToPrefs;
      openURL(url);
    };
    this.doUpdateCheck = function (val) {
      saveVersionsToPrefs;
      setUpdateCheck(val);
    };
    this.getUpdateCheckStatus = function () {
      return doUpdateCheck;
    };
    this.doUpdateCheckNow = function () {
      return doUpdateCheckNow();
    };
    this.frameworkVersion = function () {
      saveVersionsToPrefs;
      return licensingVersion;
    };
    this.getPrefsFolder = function () {
      return checkFoldersAvailability();
    };
  }
  var l8 = new b(ab_settings);
  var isTrial = l8.t();
  var automotionLoopy = {};
  var alertTitle = scriptName;
  var settingSection = "rb_Loopy";
  var settingKeys = [
    "keyframes",
    "limitmodifier",
    "direction",
    "expression",
    "windowlocation",
    "windowsize",
    "settingslocation",
  ];
  var settingDefaults = ["0", "true", "2", "true", null, null, null, null];
  var settingValues = [];
  var s = 0;
  while (s < settingKeys.length) {
    var settingSaved = app.settings.haveSetting(settingSection, settingKeys[s]);
    var settingRead = null;
    if (settingSaved == true) {
      settingRead = app.settings.getSetting(settingSection, settingKeys[s]);
    }
    settingValues.push(settingRead);
    s++;
  }
  var loopyWindow =
    thisObj instanceof Panel
      ? thisObj
      : new Window("palette", undefined, undefined, { resizeable: true });
  loopyWindow.orientation = "column";
  loopyWindow.alignChildren = ["left", "top"];
  loopyWindow.spacing = 10;
  loopyWindow.margins = 5;
  loopyWindow.onResizing = loopyWindow.onResize = function () {
    loopyWindow.layout.resize();
  };
  var container = loopyWindow.add("group", undefined, { name: "container" });
  container.orientation = "column";
  container.alignChildren = ["center", "center"];
  container.spacing = 10;
  container.margins = 0;
  var buttons = container.add("group", undefined, { name: "buttons" });
  buttons.orientation = "row";
  buttons.alignChildren = ["center", "center"];
  buttons.spacing = 10;
  buttons.margins = 0;
  var loopCycle_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%12%08%06%00%00%00E%19%C3%8E%C2%A3%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C3%90IDAT8%C2%8D%C3%AD%C2%94%3D%12%C3%82%20%10%C2%85_B%0E%40z%0EaC%C2%AFG%C3%A0D%C3%AA%C2%89r%C2%84%C2%A4%C2%A7%C3%B1%066%C3%B4r%01Fgg%C3%96%0C%C3%8ED%C2%82Df%2C%7C%15%C3%85%C3%B2%3E%C3%B6%C2%8F%06%09)%1B%24%C2%80%2BG%1C%C2%9C%16%C2%97T%7CJmf%1C%01Ge%C3%83%C2%AE%0A%C3%88i%C3%A1)%13%00~%2B%2CY%C2%BA%C2%A7%C3%98%7Cd%C2%98%2F)c%C3%87%7D%18%00%C3%AC3%C3%AFH%C2%86%C3%B6x%C3%AD%C2%A3%7C%13%3F%010%C3%AD%C2%87%C2%90%12%C2%91%C3%B7%C3%90(%1B%C3%AE%7C%C3%B9%C3%AC%C2%B48-%19%C2%95%C2%96N%C3%99%40~G%3A%C3%8F%20%C2%A7%C3%85b%C2%BF%C2%B6%C3%B4%C2%87%C3%8Bz%C3%83%C3%9A%C3%94q%60%C3%B1%10%C3%B0%C3%94b%15%14%C2%A9h%C3%92bu%19%2F%C3%AAK%C3%8Dc%C3%A5f%C3%B4%07%C3%BD%00%C2%88%C2%97%C3%ABk%C2%A2%C3%95%C2%88%3DiaiOj~A%C2%A4%C2%8922%C3%BC%C3%B1U%C2%83%000%0F%C3%9D%02R)%C3%BB%C2%99%C2%87u%00%00%00%00IEND%C2%AEB%60%C2%82";
  var loopCycle = buttons.add(
    "iconbutton",
    undefined,
    File.decode(loopCycle_imgString),
    { name: "loopCycle", style: "toolbutton" },
  );
  loopCycle.helpTip =
    "Apply \'Cycle\' loop (this is the default loopIn/loopOut type)";
  loopCycle.preferredSize.width = 36;
  loopCycle.preferredSize.height = 36;
  var loopPingPong_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%0A%08%06%00%00%00%C2%AA%C2%9CNU%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%97IDAT8%C2%8D%C2%B5%C2%92%C2%B1%0D%C2%80%20%14DOq%00%C3%AD%1D%C3%82%C2%86%01%1C%C3%81%C2%89%1D%C3%80%C3%86%0D%C2%B4%C2%A0%C2%97%05L%0C%C2%86%C2%AF%C2%88%60%C3%82W%C2%AF%22%C2%90%C2%BB%C3%B79%C3%88%C3%A0%C2%A8%1E%C3%96%06%40ov%C2%94%14%15%12U%0Fk%09%60%C2%B2%C2%AEVI1RBN%0B%07R%C2%A6%02%022%19%C2%BD%C3%8D%3CA%1ED%C2%9Bi8%C3%A9J%0A%C3%B2j%1F%C2%96%C2%85%20%C3%AE%C2%959%0Ae%1A%C3%90%C3%B2Q%5DO%C3%929%C3%9F%C2%9B%C2%A6%C3%82vJ%C3%97%C2%9C%01t%C2%BFT%17%3B%C3%A0%C3%82bY%7Bu6%C3%B4%C3%B2%5B%C2%98%10%C3%B2%C3%9E%06%3E%C3%9E%C3%88%C2%83%C2%BD%C3%95%C2%B5%15%00%1B%C2%A8%C2%ADK%3B%C2%82%C3%91k%24%00%00%00%00IEND%C2%AEB%60%C2%82";
  var loopPingPong = buttons.add(
    "iconbutton",
    undefined,
    File.decode(loopPingPong_imgString),
    { name: "loopPingPong", style: "toolbutton" },
  );
  loopPingPong.helpTip = "Apply \'Ping Pong\' loop";
  loopPingPong.preferredSize.width = 36;
  loopPingPong.preferredSize.height = 36;
  var loopOffset_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%14%08%06%00%00%00%C2%93%40-%C2%BE%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%B2IDATH%C2%89%C3%AD%C2%931%0E%C2%84%20%10E%C2%BF%C2%AB%07p%7B%0Ea%C3%A3%01%3C%C2%B9%07%C2%A0%C3%B1%06%C3%9B%C3%98%3B%17%20%C2%BB%01%C2%87%C3%84%08%C2%AB%04%C2%86%C3%8E%C3%9F%12%C3%BE%C2%83%3F%7F%1A%08Ji%C3%93%03%C3%B8%C2%B0%C3%A3%C2%B4%C2%8E%C3%AD%C3%A2%C3%9D_%C2%92%C2%A0%C2%83%2CpV%C3%9A%0CU%40%C3%AB%C3%98%C2%92%C3%BD%09%00%3A%C3%83D%C2%A3%C3%B3b%C3%B3%C2%99a%0E%C2%9E%05%3A%C3%8C%C2%A2O%C2%BCB%25%C3%91%C2%A5B%C2%9C%C2%B2%C2%A3S%C3%9A%7C%C2%B1%C3%8F%25%C3%B0%C2%88E\'%C3%9E%C2%BA%18%C3%84%C3%96%5C%14%C3%84%C2%B3%0B%20%C2%A8%C2%B8Gt%5E%C3%98N%C3%92%C2%9D%C3%B7%C3%A8%1D%3B%C3%BB%0B%C3%8A%C2%A8%C3%B0%C2%A5%C3%AE%C2%A2%C2%BB%C2%83%C2%90%C3%84%23%5C%C2%85%7D%C2%8DKU%C2%AB%0C%C2%81%1EP%C2%B6%3A%C2%A5%C3%8D%26U%C3%A1%2B%C2%A5%C3%BC%C2%A8%C2%BC%C3%82%00~fc%3C%C3%8D%C3%A9%C2%86%C2%BA%C3%A2%00%00%00%00IEND%C2%AEB%60%C2%82";
  var loopOffset = buttons.add(
    "iconbutton",
    undefined,
    File.decode(loopOffset_imgString),
    { name: "loopOffset", style: "toolbutton" },
  );
  loopOffset.helpTip = "Apply \'Offset\' loop";
  loopOffset.preferredSize.width = 36;
  loopOffset.preferredSize.height = 36;
  var loopContinue_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1A%00%00%00%0A%08%06%00%00%00%C2%AA%C2%9CNU%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%8BIDAT8%C2%8D%C2%AD%C2%93%C2%B1%0D%C3%830%0C%04%C3%8FQ%06pz%0D%C2%91F%03dr%0F%C2%A0%C3%86%1B%C2%A4Qo-%20%C3%84%C2%A0A%03v%C2%A2T%C3%BE%07%C3%94%C2%90%C3%80%1F%C2%9E%0F%0D1%C2%B7%05%C2%A0%C2%A4%C3%B0%C3%A0%C2%A2bn%23%C3%B0v%C2%97WIa%C3%9E%1Do%C3%80%C3%A8O)%C3%B3%C2%9Bbn%C3%8F%23H%C2%A6%C2%92B%C2%B5%24%40%C3%BD%C2%86IA%5E%C3%81%C3%9C%C2%83YG%1F5%C2%AC%C2%A3*O%C3%B4O%C3%B7%7D%5ER%18T%C2%A6%C3%9E%C3%8B%C3%A4%C2%A7%C3%9Bz%C2%93\'%C3%AAA%C2%AC7)%C3%88%C3%BF%C3%91%0F%C3%84vv%3A%1B%C2%A8u%C2%82%00%C2%AC%C3%B2-1%2B%C2%A1%C3%97%C3%8F%5C%00%00%00%00IEND%C2%AEB%60%C2%82";
  var loopContinue = buttons.add(
    "iconbutton",
    undefined,
    File.decode(loopContinue_imgString),
    { name: "loopContinue", style: "toolbutton" },
  );
  loopContinue.helpTip =
    "Apply \'Continue\' loop\n(Keyframe modifiers not applicable)";
  loopContinue.preferredSize.width = 36;
  loopContinue.preferredSize.height = 36;
  var loopOptions_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%08%00%00%00%02%08%06%00%00%00e%C2%94%C2%9D%C3%AD%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%1FIDAT%08%C2%99c%C3%BC%C3%BF%C3%BF%C3%BF%7B%06%06%06%06FFFAll%26%10%C2%81%13000%00%00f%C2%A6%0B%C3%B0%C3%9C%40%2BM%00%00%00%00IEND%C2%AEB%60%C2%82";
  var loopOptions = buttons.add(
    "iconbutton",
    undefined,
    File.decode(loopOptions_imgString),
    { name: "loopOptions", style: "toolbutton" },
  );
  loopOptions.helpTip = "More information";
  loopOptions.preferredSize.width = 20;
  loopOptions.preferredSize.height = 20;
  var buttons2 = container.add("group", undefined, { name: "buttons2" });
  buttons2.orientation = "row";
  buttons2.alignChildren = ["center", "center"];
  buttons2.spacing = 15;
  buttons2.margins = 0;
  var loopDirection = buttons2.add("button", undefined, undefined, {
    name: "loopDirection",
  });
  loopDirection.text = "Out";
  loopDirection.helpTip =
    "Set the loop direction (loopIn, loopOut, or loopIn + loopOut).";
  loopDirection.preferredSize.width = 50;
  loopDirection.preferredSize.height = 22;
  var keyframeGroup = buttons2.add("group", undefined, {
    name: "keyframeGroup",
  });
  keyframeGroup.orientation = "row";
  keyframeGroup.alignChildren = ["center", "center"];
  keyframeGroup.spacing = 7;
  keyframeGroup.margins = 0;
  keyframeGroup.alignment = ["left", "fill"];
  var loopKeyframes = keyframeGroup.add(
    'edittext {justify: "center", properties: {name: "loopKeyframes"}}',
  );
  loopKeyframes.helpTip =
    "When set to 0, this loops between all keyframes.\n\nWhen set to any value other than zero, this specifies how many keyframes back from the last keyframe (when looping out), or how many keyframes forward from the first keyframe (when looping in), the loop should include.";
  loopKeyframes.text = "0";
  loopKeyframes.preferredSize.width = 35;
  loopKeyframes.preferredSize.height = 25;
  var limitModifierGroup = keyframeGroup.add("group", undefined, {
    name: "limitModifierGroup",
  });
  limitModifierGroup.orientation = "row";
  limitModifierGroup.alignChildren = ["left", "center"];
  limitModifierGroup.spacing = 5;
  limitModifierGroup.margins = 0;
  limitModifierGroup.alignment = ["left", "fill"];
  var limitModifierLabel_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%08%00%00%00%0A%08%06%00%00%00%C2%89%C3%87%1F%C2%80%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C2%88IDAT%18%C2%95%7D%C2%8E%C2%B1%0D%021%10%04%07D%01%C3%90%C3%89%C3%87%C2%9B%C3%91%01%C2%94%40%25%40%25%C2%94%C3%B0t%C3%A0lc%3A%C3%81%25%C2%A0%7D%C3%99%2F%C2%93%C3%BCJ\'%C3%99ws%C2%BA%C3%99%C3%99%C3%BE%02H%3A%C3%91b%C3%BB%02%C2%BC%C3%B2%C3%9B%03%C3%87VKl%3F%C2%80%C2%B9%C3%B7%0E%C3%83%20%C2%8Dle%3B%C3%B9%00%C2%B7%15%00%0A0%C2%B5%C3%B7%3BCIu%04%C3%BA%C3%B0))g%C2%96%C3%84a3%23%C2%90%C2%9B%C3%89%C3%9D%C3%B6%C3%9C%C2%9C%C3%BE%C2%80s%C2%BB%C2%9DD%C2%B4%C3%98%C2%9EV%20B%C2%92%C2%AEq%18%C2%9CJ%C2%80%C3%9A%C2%AA%C2%83%11%0CX%01~%C3%9A8(%C2%9B%7F%C3%91%C3%9D%C2%AC%00%00%00%00IEND%C2%AEB%60%C2%82";
  var limitModifierLabel = limitModifierGroup.add(
    "image",
    undefined,
    File.decode(limitModifierLabel_imgString),
    { name: "limitModifierLabel" },
  );
  limitModifierLabel.helpTip =
    "Limit keyframe modifier: When active, the keyframe modifier will be limited by the number of existing keyframes.";
  var limitModifierCheckboxGroup = limitModifierGroup.add("group", undefined, {
    name: "limitModifierCheckboxGroup",
  });
  limitModifierCheckboxGroup.spacing = 0;
  limitModifierCheckboxGroup.margins = [0, 5, 0, 0];
  var limitModifier = limitModifierCheckboxGroup.add(
    "checkbox",
    undefined,
    undefined,
    { name: "limitModifier" },
  );
  limitModifier.helpTip =
    "Limit keyframe modifier: When active, the keyframe modifier will be limited by the number of existing keyframes.";
  limitModifier.value = true;
  var keepExpressionGroup = buttons2.add("group", undefined, {
    name: "keepExpressionGroup",
  });
  keepExpressionGroup.orientation = "row";
  keepExpressionGroup.alignChildren = ["left", "center"];
  keepExpressionGroup.spacing = 5;
  keepExpressionGroup.margins = 0;
  keepExpressionGroup.alignment = ["left", "fill"];
  var keepExpressionLabel_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%14%00%00%00%0D%08%06%00%00%00%C2%A9PN%5E%00%00%00%09pHYs%00%00%0B%12%00%00%0B%12%01%C3%92%C3%9D~%C3%BC%00%00%00%C3%8BIDAT8%C2%8D%C2%AD%C2%93%C2%B1%11%C3%820%0CE%C2%85\'%08%1B%C3%80%06%C3%94%C2%AA%C3%88%24x%03fa%C2%830I%C2%A8%5Cg%03%C2%B3%01%C2%8C%C3%80%C2%99%C3%BB%C3%A4%14%C3%B9%C3%BB%C3%9C%C3%B0%1B%C3%87%C2%96%C3%B4%C3%8E%C3%BAr%C3%A4%C3%9F%C3%9Ay%5EJi(%C2%AB%C2%AA%C2%BE%C3%89yFl%C3%9F%C3%8A%0B%C2%AE%C3%A8%C2%84%C2%A2L.%1EE%C2%A4%40%06%03%C3%8F%C2%A8%C2%A9%C2%81%08%C3%8C(b%C2%BA%C3%A2l2%C2%B1%C2%92%3B%5Bh%20%C2%B0%C3%92%C3%82%C3%A8n~%16%C2%91%03%C2%B6w%C2%B49%22w%03%0D%0C%C2%A6%C2%AA%C2%8B%C2%BB%C3%A1%05%C3%ABSU%1F%C3%B0na%C3%90%C3%90%C2%83%C3%81%C2%AF%C2%88%C3%AD%C3%8D%C3%86%18t3%C2%94%C2%86%C2%A29%C2%9Ez%C3%89%C2%A1%C3%A5%C2%85%C3%91%3A%0C%C3%B2%C2%94*%C2%BBB%C3%8B%0B6%C2%8C%1E%C2%AC%C2%B0%C2%BE-3hk%18%C3%86W%C3%AA%C3%BD%C3%AA%C2%A1%C2%83%C3%BED%C2%87aT%0D%C2%B2%C3%BA%C3%B5%5C%5B%2F%7C%1E%C2%BD%7FT%22%C3%B2%01%C2%84%18yy6L%C2%99\'%00%00%00%00IEND%C2%AEB%60%C2%82";
  var keepExpressionLabel = keepExpressionGroup.add(
    "image",
    undefined,
    File.decode(keepExpressionLabel_imgString),
    { name: "keepExpressionLabel" },
  );
  keepExpressionLabel.helpTip =
    "Keep expressions: When active, existing expressions will be commented out below the new loop expression. When inactive, existing expressions will be overwritten.";
  var keepExpressionCheckboxGroup = keepExpressionGroup.add(
    "group",
    undefined,
    { name: "keepExpressionCheckboxGroup" },
  );
  keepExpressionCheckboxGroup.spacing = 0;
  keepExpressionCheckboxGroup.margins = [0, 5, 0, 0];
  var keepExpression = keepExpressionCheckboxGroup.add(
    "checkbox",
    undefined,
    undefined,
    { name: "keepExpression" },
  );
  keepExpression.helpTip =
    "Keep expressions: When active, existing expressions will be commented out below the new loop expression. When inactive, existing expressions will be overwritten.";
  keepExpression.value = true;
  var settingsWindow = new Window("palette", undefined, undefined, {
    closeButton: false,
  });
  settingsWindow.preferredSize.width = 532;
  settingsWindow.orientation = "column";
  settingsWindow.alignChildren = ["left", "top"];
  settingsWindow.spacing = 10;
  settingsWindow.margins = 16;
  var headerGroup = settingsWindow.add("group", undefined, {
    name: "headerGroup",
  });
  headerGroup.orientation = "row";
  headerGroup.alignChildren = ["left", "center"];
  headerGroup.spacing = 25;
  headerGroup.margins = [0, 0, 0, 5];
  headerGroup.alignment = ["center", "top"];
  var loopyLogo_imgString =
    "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%5C%00%00%00(%08%06%00%00%00s%5C%C2%9D%C2%8F%00%00%0F%C2%B6IDATh%C2%81%C3%AD%C2%9B%0Bp%5C%C3%95y%C3%87%7F%C3%B7%C3%9E%C2%BD%C2%BB%C2%AB%5Diw%C3%B5%C2%B4d%C3%ABi%C3%99%C3%98%C3%98%C3%B2%0B%C2%BF%20%C2%B6%13%C3%B34%C3%98%C3%A0%C3%B2%C3%8A%10%5E%C2%85%06H%02m%C2%A1IKfJ%C2%9BRh3CK%26t%26%C2%85%C2%84%C3%97%10%C2%98%C2%94%C2%92%C3%9A%40%12%08%C2%94%40%C3%8C%23%60%C3%80%C2%80m%C3%BC%C2%B6%0C%C2%B6%5E%C2%96%2CYo%C2%ADv%C2%B5%C2%8F%7BO%C3%A7%C2%9C%C2%BB%C2%92v-%C3%89%5E5%C2%B6%C2%A7%C2%9D%C3%B17%C2%B3%C3%92%C3%AA%C3%9Es%C3%8E%C3%BD%C3%8E%C3%BF~%C3%A7%3B%C3%BF%C3%AF%3B%C2%9F%C2%B4%C2%BA%25%C3%B7%09%C3%8E%C3%88i%13%C3%BD%0C%C3%94%C2%A7W%C3%8E%00~%C2%9A%C3%A5%0C%C3%A0%C2%A7Y%5C%13%3EN%C3%97%C3%91b1%C2%88%C3%85%C3%95wl%1B%3C%1E%C2%84%C3%87%C3%AD%7C%C3%8FR4M%C2%B6%C3%93%C2%88Db%C3%B4%C3%B6E%C2%88%C3%87%C2%93x%3C%26%C3%B9!%1F9%5E7%C2%B68%C3%B1%16%C2%A2i%1AB%08%C3%BA%07%C2%A2%C3%B4%C3%B5E%C2%B1m%C2%81%C3%9F%C3%AFQc%C2%98%C2%A6%C2%A1%C3%BE%1E%C2%A7%13%C2%9A%C3%94%3D%C2%9E%C3%92%7F%C2%9C%C3%B9%09%C2%B79%C3%B6%C2%9E%C2%AE%C2%A1%C3%85%C2%93%20%C3%A7.%C2%95%C2%97%C3%BA%19%06%C3%82%C3%AB%19%C3%BF%19C1H%24U%3F%07%237%C3%82%C3%A3%C2%99%10%C2%A3%C2%89%01%C2%B7m%07%C3%9C%1C%0F%08%C2%85%19%C3%88%C2%89Y%C2%B6%C3%B3%3D%0Bq%C2%B9%0Czz%C3%82%C2%B4%C2%B4tSYU%C3%84%C2%AA%15%C2%B3%08%05%7Dtu%C2%87%C3%99%C3%B6y%23_%1E%C3%AC%C2%A0%C2%AA%C2%AA%C2%88%60%C3%80G2i%C2%8D%0B%C2%B4%C2%AEk%C2%B4%1C%C3%AEV%40%C3%8F%C2%AB%2Bg%C3%85%C2%B931%C3%9D.%C2%9A%C2%9A%C2%BA%C3%98%C2%BA%C2%BDA%C2%BD%C3%80%C3%A95%25%C2%98.%03%2B%7D%C2%92B%20%C2%BCn%C3%B0%C2%A5%C3%B4%3F%06(%C3%A2%09%C3%B4%C3%AE%3E%C2%B4h%14%C2%BB0%1F%C2%91%C2%97%0B%C2%96%05I%0B%C3%9B%C2%9F%C2%83%C3%A6%C3%8F%C2%81DB%C2%81%C2%AD%C2%8C.%C2%99%04%C3%93t%5E%C3%80%C3%B0%18%C2%89%24%C3%82e%40%C2%AE%C3%8F%C3%A9%C3%AB2%10%C2%86%C2%81%16%19%1A%C2%B6%C2%B4%C3%AC%017%C2%8Et2%C3%B8%C3%8Dk%C2%89%5Cw1F%5B%1FVi%10%C3%BF3%C2%BF%C3%86%C3%B7%C3%82o%C2%B1%C3%8A%C2%8AO%C2%88%C2%B6%04%C2%BB%C2%A9%C2%A1%03%C2%AF%C3%9F%C3%83%C2%8F%1E%C2%BE%C2%91%1B%C2%AE%5DNIq%60%C3%A4%C3%BE%C3%A1%C3%96%1E%C3%BE%C3%A3%C2%85%C3%8D%C3%BC%C3%8B%23%C2%AF%C3%91%C3%9B%1B%C2%A1%C2%BA%C2%AA%C2%88Db%14te%C3%95%C2%B6%60%C3%B7%C3%BEV%C2%96-%C2%9E%C3%8E%C3%9F%C3%9E%7B9%17%C2%9E%3F%C2%97%1C%C2%AF9%C3%92f%C3%9B%C2%8EF%C3%BE%C3%BD%C2%A7o%C3%B1%C3%9C%C3%B3%1F0%C2%AD%2C%C2%9F%C3%BC%7C%C2%BF%C3%B3%C3%A2%C2%84%40%C3%AF%C3%ACa%C3%B0%3B7%10%C2%BD%7C%15F%7B_%C2%A6r%C3%8A%C2%8A%13%C3%A8%5D%C2%BD%C2%98%C2%BB%C3%AA%C3%B1%C3%BE%C3%A6-%C3%B4%C3%96v%C3%AC%C2%A9S%C3%90%C2%8Fv%13_%C2%B5%C2%84%C2%81%C3%AF%C3%9D%C2%86%C3%9E%3B%C2%80%C3%B0%C3%A7%60%C2%B4%C2%B6%C2%93%C3%B7%C3%83%C3%87%C3%90%22QD%C2%8E%C3%97%19%23%C2%99D%C2%8B%0E%11%C2%BE%C3%B7%0E%C3%A2%C2%8B%C3%A7%C2%A2w%C3%B6aM%0B%C3%A2%7FZb%C3%B4*VY%C3%89%24%00%C2%97%2F1a!%C2%82%5E%C3%AC%C3%A9%C2%A0%C2%99A%C3%ACr%10y%1Eu%C3%BDDb%C2%B8%0CZ%1A%3A(%C2%A9(b%C3%83%C3%86%C2%BF%C2%A6%C2%AE2%7FL%C2%8FiS%C3%B3%C3%B9%C3%BE%C3%B7%C3%96q%C3%B5%C2%9F%2Ca%C3%9D%C3%95%3F%C3%A6Pc\'%C3%95%C2%95E%C2%A3%C2%96%C2%AE%C3%81%C2%81%2F%C3%9A%C2%B8%C3%A5%C3%86%C2%95%3C%C3%B5%C3%987%C3%87%7D%C3%A2%C2%A2%C3%B9U%3C%C3%BD%C3%93%C3%9B8%C3%BF%C2%ABg%C3%B3%C2%9D%C2%BB%7F%C2%8Enh%C3%A4%C3%A5z%C2%B1-%C2%81%C2%96%C2%B4%11%C3%B99%C2%8E%C3%BE%C3%AE%C3%A0%C3%98)%1A%20%C3%A6%172%C2%B4%C2%B6%C2%96%C2%A15%C2%AB%08%C3%BC%C3%BD%23%C2%B8%0E5a%17%C2%84p%C3%957%C2%A0%C2%89~%C2%92u%01%C3%B4%01%C2%88WM%239%C2%B3%12%C3%8F%7B%5B%C2%B1R%C2%80%C3%AB%C3%BD%C2%83%24%C2%AB%C2%A7%12_9%17%C3%A1%07%C2%AB0%08%C3%92%C3%88%C3%B7%1Dp%5C%C3%8A%042%C3%B1%C2%A6i%001%C2%81%C3%96%03Z%C2%9F%C3%AD%C3%BC%C2%8E%C2%8B%13n%C2%B3r%25%C3%B5w%0F%C3%A0%09%C3%A5%C3%B2%C3%84s%7F9.%C3%98%C3%A92%C2%A3v%0A%C3%8F%C3%BF%C3%BCN%3C%C2%A6%C2%8B%C2%BE%C3%BE%C2%883%19%5D%C2%A7%C3%B1%60%07%17%C2%AFY4!%C3%98%C3%A9r%C3%93%C3%B5_%C3%A1%C2%87%0F%5CKsK%C3%B7%C3%88%C2%8A%17R%C3%8F!%C2%81%C3%96%0BZ%C2%BF%C3%94%C3%9Fv%C3%9C%C2%8C%1FD%C3%8AH%C2%8DV%C2%81k%C2%BFM%C2%A2.%C2%97%C2%BE%1F%C3%9D%C2%83%5D%5C%C2%A2%C3%BC%C2%BE%C3%91%C3%98%C2%8A%C3%A7%C3%AD%C3%8F%C2%9D%C3%B9t%C3%9Aj%C3%8E%C3%89%C2%B93%1C%17%23\'(%7Dw8BrN-v%00%C3%B46%C2%A1%5E%C2%A0%C3%BB%0F%7B0w~%C2%81%1D%0AL%C2%A8%C3%AB)%60)%1AG%3B%C3%BA%C2%B9%C3%A5%C2%AE5%C2%AC%C2%9A%3D%25%C3%A3%C3%8E%40x%C2%88%C3%9D%7B%0F%13%C2%89%C3%863%C2%AE%2F%5ET%C3%8D%C2%B7n%5BMcc\'%C2%86%C2%A1%13%1B%C2%8A%C3%A3%C3%B2y%C3%B8%C3%AE%C2%BDW%C2%8C%19%C2%BD%C3%ADH%2F%07%C2%BEh%1Fs%C3%BD%C2%9E%C2%BB.%C3%A1%C3%A2%0B%C3%A6r%C2%B8%C2%B5%7B%C3%9C-Fxu%C2%8C%C2%83%5Dx6%1D%C3%80%C3%BD%C3%81A%5C%C3%B5%5D%C3%98%C2%85%1A%22W%C3%87%C3%9Co%C2%93%C2%9C%13%60%C3%B0%C3%8F.C%C2%93%2F%C3%9D00%C2%B7%C3%AEA%C2%93%C3%AF%C3%9F%C2%A5%C2%A3E!qv-v(%C3%97%C3%99%20S%1Birn%C3%AD(%C2%82%12%C3%B0%C2%AD%C2%BB%C3%91%C3%A4%C3%9C%C2%8C%C2%89a%3D%C3%A9%C2%80G%C3%83C%C2%94%C3%96L%C3%A1%C2%82u%C2%8B2%C2%AE%7F%C3%B0%C3%A1%01V%5E%C3%B8%C3%8F%C2%9C%C2%BB%C3%BAA%C3%8E%C2%BF%C3%B4!v%C3%ACj%C3%89%C2%B8%7F%C3%ABM%2B%C2%A9(%2F%24%1C%1E%C3%A2HK%17%C3%A7%C2%AD%C2%9E%C3%8B%C3%AA%25%C3%95%19m%1E%7D%C3%BC%C3%B7%2C%5Eq%3FKW%C3%BD%23%C2%B7~%C3%BB)%C2%A2C%C2%89%C2%8C%C3%BBW%C2%AD_%C3%82%60%24%C3%8E%18%C3%A2%C2%A3i%C3%98E(_%1D%C2%BC%C3%B3%07%C3%A4%C3%9D%C3%BFo%C2%84%C3%AE~%C2%80%C3%9C%C2%9F%C2%BC%C2%AC%C2%9C%C2%AA%C3%B0%C3%A9%C3%A8%C3%AD%10_%3C%0F%C2%ABr%0A%22%C3%87%C2%83%C2%B9%C3%B3%00%C2%AE%7D%C3%AD%C3%98!%C3%94*I%C2%9EU%C2%8DU%5B%C2%89%C3%9E%1FV%C2%BE%C3%9B%C2%9AZDbV-Z%C2%9F%C3%AC%C2%AFa%C2%B4%261%3F%C3%9F%C2%8F%08%C3%A62V%C2%81Q9%C3%A9%C2%80%C2%87%C3%BB%23T%C3%8D%C2%9AJEu%C3%91%C3%88%C2%B5h4%C3%8E%C3%8D%C2%B7%3F%C3%81%C3%8E%5D-TL%2B%60%C3%8B%C2%87%C3%B5%C3%9C%7C%C3%BB%C3%A3%C2%A4%C3%AF%06%C2%92i%C2%AC%C2%BDt%01%0D%C2%8D%C2%9D%60%C2%BA%C2%B8%C3%AA%C3%AB%C3%A7e(%C3%B7%C3%A6%C2%A6%C3%9D%C3%BC%C3%85%C2%9DO%2B%0AX%5C%C2%9C%C3%87%C2%B3O%C2%BC%C3%86%C3%9F%3D%C3%B8b%C3%86%C2%B3%17.%C2%A8%C2%A4%20%C3%A4\'!%C2%AD%C3%B0%18%C3%91%C2%84%C3%9A%C3%89%C3%95%C2%A6\'%C3%BC%3Ee%C2%B9%C2%BE\'~%C2%89%C3%BB%C3%AD%C3%ADXS%40%0F%C2%83(%0AbU%C2%96*%26%C2%A6%1F%C3%A9%C3%82%C3%9C%C2%BA%1B%11%00mH%60%17CbN%C2%8Dr%25z_%C2%98%C3%A4%C2%8CJ%C2%AC%C2%AA%C2%90%C3%AAg%17%C2%80k%C3%A7~%C2%8C%2FZ%C2%B0%25%C3%A0%C3%87%C2%91%C2%93%0E%C2%B8mYx%7C%5E%C3%8C%C2%B4%C2%91%25%05%C3%AC%C3%AE%0Es%C3%B6%C3%AC2%C3%A52%C3%A6-%C2%ACf%C3%97%C2%AEf%C2%9E%7D%C3%A1%C3%83%C2%8C%C2%BE%C3%9F%C3%B8%C3%BAr%C2%ACp%C2%84%C3%99%C2%8BjX%7F%C3%B9%C2%82%C2%8C%7BO%3F%C3%BB.%C3%AE%60%0ESJ%C2%82%C2%8A%C2%A9%14M-%C3%A5%C3%93%1D%C3%8D%C2%A4%C3%B3%C2%8FP%C3%80%C2%87%C3%8F%C3%AF%26i%C2%8D%C3%83%C2%81%25%C3%A0r%C2%A9%C2%BB%5D%C2%8A%C2%BE%C3%99y%C2%B9%0A%7C%C3%97%C2%97%C3%8D)%C3%8A%C3%AB%C3%B8v%3B%3F%C2%88%C2%96H(J%C3%AC%C3%9E%C2%BE%17%C2%AD%1F05u%3F9g%C2%A6C5cq%12%C3%B3%C3%8ER%C3%BB%01%C2%96P%C3%BD%C3%9D%C2%9F%C3%ACpx%C3%BFx%C2%9C%3FMN%3A%C3%A0%C2%92%C3%8EI%2B%C2%8C%C2%A6%C2%AD*%C2%B7%C3%9B%C2%A5%40%C2%B2%C2%AC%C3%91%C2%8By~%0F%1B_%C3%BA%24%C2%A3%C3%AFWW%C3%8C%C2%A2nA5%0B%C2%96%C3%8D%20%C2%9Dx~%C2%BA%C3%B5%10om%C3%9A%C2%A3X%C2%8C-%C3%A3%03!q%C3%93%C3%91L%17%5DC%C2%A3cj%C2%BA%C2%9C%7B%C2%96A%C2%82%1C%C3%84%C3%A5Jq%C3%AFT%C2%9C!%C3%A3%1C%C3%890%C3%A4%C3%A6Z%10%C3%84%C2%B5%C3%BB%20%C2%AE%C3%BDm%C3%8A%C2%AD%C3%A8%C3%BD%C3%92%C2%AD%C3%94%60%17%C3%A7%2B%C3%90%C3%A5%26*%7D%C2%BB%C3%B0k%18%C3%8DC%C2%98%C3%9B%C3%B7c%C2%87%C3%B2%C2%8E%C3%ABN8%15%C2%80%C2%AB%C3%BD%04\'%3E%1A%C3%B6%C2%B0%C2%BA%C3%9C%C3%95%C3%B5Q%20d%C3%948uj%3E%C2%9B%C3%9F%C3%9F%C3%8Bo%C3%9E%C2%AB%C3%8F%C3%A8%C3%BF%C2%83%C2%87nd%C3%85%C3%9A%C3%85%19%C3%97%C3%BE%C3%AB%C3%85-%C3%B4%C3%B4%0E%C3%A2M%C3%A3%C3%A0%02%C2%81%26%C2%AD)%3D%C3%80%C2%98l%C3%9ES%12%0E!%1Cw%C2%93%C3%BA%5B%05%3Ar(%C2%8F%1B%C2%BD%C2%A3%1Bs%C3%BB%5ED%1Eh%03%60U%C3%A4a%C2%95%16!%0A%02%24%C2%A7W*%C3%BF-%C3%9D%C2%89%C2%B9c%3F%C2%AECm%C2%88%3C%C3%BF%09%1Fy%0A%2C%1C%15%C2%AEK%C2%BA%3E%C2%B2%C2%B0%C3%871%3A%19-%C3%86%2316n%C3%98%C2%9Cq%C3%BD%C3%8AK%C3%A73%7Bv9%C3%9D1%C2%A7w%7BG%1F%C2%AF%C2%BC%C2%B6M%C3%B1%C3%B6%C2%8C%10%3E%C3%85P%5DY%1A%C3%B4%C2%B8%22%40%C3%88%00kx%0C%C3%81hH%C2%AE%22U%0F%C3%AEOv)J%2C%C2%ADH%C3%88%C2%80%C2%B2r*%C3%89%C2%99U%C3%98%25%C2%92%26%3B%7D%C2%A4%C2%AFw%C3%82%C3%BB%13%C3%83y%C3%B2%7D%C2%B8%10%C3%8AO%C3%BB%C3%9Ci8%C2%8Fcy%12%C2%BCi%C3%93%0A%C3%98%C3%B4%C2%BB%1Dl%C2%A9%1F%C2%A5yn%C3%95%5Ec%7F%C3%94%C2%99%C3%B8%C2%86%C2%8D%5B%C2%A8%3FpD%C3%A5M%C3%86%C2%8A%C3%88f%C2%8E%C3%A3%C2%8B%C2%B4%0C%19%C2%AE%C3%8B%C3%90%C3%9C%C2%95%C3%92Q~d%C3%AE%25%C2%A5%C2%B9r%2B%7B%C2%BE%C3%84%C2%B5%C2%AFYY%C2%B2%C2%B4%C3%A8%C3%B8%C2%8AE%0C%C2%ADY%C2%A9(%C2%A3%C3%B4%C3%A1%C2%AE%C3%A6(%C3%A6%C3%A7%C3%B5%C3%98%C3%B9\'v\'%C2%9C2%C2%97%C2%A2%C2%A5%C2%80%3B%C2%81%C3%B8r%C2%BDt%C2%B4v%C3%B3%C2%AB%C2%97%C2%B7d4%2C%C3%B3j%C3%B4%C2%99.%06%C2%93%C2%82%17_%C3%BA%C2%98%C2%82%C2%82%C3%9Cq%C3%A7%22%C3%88j%C2%8E%C2%99%C3%8A%C3%99N%00%C2%A4Ec%C3%A8%C2%91(Vy%C2%A9sOb%C2%9C%00%C2%BD%C2%AF%C3%9F%C3%89%C2%8F%C3%88%C3%A6n%13%C2%BD%C2%BB%1F%C3%B7%C2%B6%3D%0A%5C%C2%BDK%C2%90%C2%AC%C2%9BI%7C%C3%99%3C%C3%B4%C2%A3%C3%82q\'%C3%9B%C3%B6%C3%A0%3At8%2Bw%C3%82%C2%A9%00%C3%9C%C3%905bI%C2%9Bp%3A%C3%A7%C2%9B%60%C3%99%2B%C2%8AW%14%C3%A0%C3%B5W%C2%B7%C3%92%1A%1E%0D%C2%86*%C2%BC%3A5~xx%C3%83\'%C3%AC%C3%9C%C3%9E%40%C3%A9%C2%94%C2%A0%C3%B2%C3%BB%C3%A9%22R%7BC%C2%B6%22%23Am0%C2%AAr%25zG%17zO%1F%C2%91%C3%AB%C2%AF%20v%C3%A1R%C3%B4%0E%C3%87Z%C3%B5%C3%8E%01%C2%8C%C3%866%C2%95%3FQ%22%C3%9DJ%C2%8E%17s%C3%AB%5E%C2%B4n%C3%80%23%C3%BD%C2%A5%C2%8Ef%C2%A5%C3%B6%0E%0B%C3%8C%C3%8Fv%C2%A7%12z%C3%99%C3%A92q%C2%B6%C3%B0%7F)%C3%83IE%C2%91%C3%BE6%C2%8Fc%C2%85%C2%85%25%01vo%3F%C3%84%C2%86%C3%BF%C3%9C%C3%8C%3Dw%C2%AC%1E%C2%B9%1E%C2%92%C3%AE%C3%A4%C2%B9%C3%B7%C2%94%C2%AF%1FN%C3%8F%C2%A6%C3%8B0%1B%C3%8A%C3%8A%C3%82e2%C2%ABKch%C3%9Dj%12%0Bf%23L%13QP%40%C3%BC%C2%9C%0A4e%C3%956%C2%89j%1D%C3%9F%C3%AFv%C2%AA%C3%8D%C3%8F*%1FM%3C%C3%99%C3%B9%01%C3%8C%C2%BD%C2%870%C3%B76%C2%91XX%C2%A9%2C%5B%0D%19%C3%90p5%0C%C3%A0%C3%9AQ%C2%8F%5D%10%C3%8Cz%C2%A9%C2%9D%12%1Fn%C2%BAt%19W%C2%90M%C3%96%5C%C3%928%C2%AF%0E%1F%C3%B5d%C2%86%C3%BB2)P%C3%A3%C3%95%08%5B%C3%A3OD%C2%BE%00%C2%B9%C2%9A%C3%9CFvzi%C2%832g2%C2%8D%C3%88uK%18Z%C2%BF%C2%80%C3%B8%C3%B2%0A%C3%B4%01%C2%81%C3%9Ek%C2%93%C2%AC%C3%951%1A%C2%A2%C3%B8%C2%9E%7B%03%C3%A1%C3%B7fZ%C2%AB%C3%9BD%C3%AB%C3%AEW%C2%AEC%C3%B1%C3%AE%C2%94%C2%AF%C2%B7%C3%B3Q%C2%91%C2%A5%C2%AB%C2%A9%7DtEd!%C2%A7%24%C2%97%22%C3%81%C3%902%2FM(%C3%A1%C2%AE~%C3%8E%C2%9A_M%C3%A0%C2%B2%C3%B3x7%C2%92%C3%99%C3%AAOoZE%3C%C2%96%1Cc%C3%9D%C2%8C%C2%AC%24A2%5B%1Fn%C2%80.%C3%93%24%C2%9D%C2%A0%C3%8BD%5CD%C2%82%C2%A6%C2%91%C2%98%C2%ABc%1C%C2%B1%08%C3%9E%C3%BB%18%C3%86%C3%A1%C3%83%C3%98E%C3%B9%C2%99%C3%96*%C3%9DJn%0E%C3%AEO%C3%B6%C2%A0%C2%B799%19%C2%95_%C2%89%C2%80%C3%B9%C3%B1n%07%C3%BDI%C2%B8%C2%B6%C2%93%0E%C2%B8%C2%A4%C3%9B%C2%96-%C2%B2%C3%89%C3%A2*n%C3%9E%C3%9F%C3%99%C3%8F%C2%82K%162%C3%B3%C3%AC%3C%3En%C2%8B9%C3%BE(%25W%C2%AD_%C3%8C%C3%82%05U%C2%B4w%C3%B4O0%C2%A7IpB%C3%994.%C3%90%C3%82%16Z%C3%94F%C3%ABK%C3%A0%C2%AA%C3%AF%C3%86%C3%BF%C3%B4%C3%87%C2%84%C2%BEu%3F%C3%A6%C3%8E%C2%BDX%C3%A5eN%20t%C2%8C%C3%88%0D%C3%91h9%C2%82%C3%91%C3%92%C2%A9%C2%A8%C2%A1p%C2%83~%C3%94%C3%82hnE%C3%88%C3%83%C2%87I%C3%AC%C3%9C\'%C3%9D%C2%87K%C2%BC%5C%C2%BA%C2%A6%5C%C3%8A%C2%88L%C2%A0Ol0F%C2%B04%C2%9F%C2%AF%C2%AC%5BJ0%09%C2%9B%C2%86l%C2%B6%0EX%C2%9C%13t%C3%94%C2%92%C3%87g%C3%97%5D%C2%B3%C2%8C%7B%C3%AF%7B%C2%81%C2%B2%C3%92%C3%8C%C2%8DS%7D%C3%93%C2%B2%C2%84%5C%C3%BA%C3%BBB%0D%C3%9F%13%C2%AF%C3%A3%7Du%13vi%C2%B1%0A%C3%9F%C2%B5%C3%AE%3E%C2%8C%C3%B6ND%20W%C3%B1%C3%AB%C3%B1%C3%80v%1E%26%10%C2%A6%C3%8ByX%C3%BA%5C%C2%8C%2C%C3%BDY%C2%9A%C2%9C%C2%B2Cd%C3%8F%C2%89%C3%B2%C3%A6%C2%BAFW%5B7sW%C3%8Fc%C3%A19%C3%93%C3%B0%C3%B5%C3%86p%09%C3%81%C3%AEd%26%C2%84%C3%9F%C2%B8v9%C2%B5%C3%93K%C3%94%11%C3%9B%C2%981%C3%88r%C3%93%C2%948%C2%99%60t%C3%B5%60%1Eh%C3%80%C3%95%C3%90%C2%82%C3%9EvTE%C2%99VE%C2%99%C2%93%C2%BF%C2%9E%08lRtRE%C2%B5i%C2%93%C2%92KN%C3%97%26%C3%89KO%05%0FG%60%C3%88%C2%B3%C3%88t%C2%8E%3C%C2%8E%19Z%09%0B%C3%8D%C3%A3%C3%A6%C2%A2%C2%AB%C2%97S%2BO%C2%80%C3%9C%1AK%2B%7Dly%7F%1F%C3%BB%C3%B6%C2%B5%C2%8E%C2%B4%C2%93)%C2%80u%C2%97-T%C3%A7%C2%9AzZz%20%C2%9D%0De%23%C2%9A%C2%A4%C3%9F9%5E%C3%85(%C3%AC%60%C2%9Er%13%C3%AA%C3%8C%C2%96%C3%89%C2%92%C3%B9%3FNNI%C3%B2*a%C3%9B%24R%01%10)%C2%BE%C2%9D%C3%AE%0Ed%C2%9B%C3%8E%C2%B6%1Ef-%C2%9B%C3%89%C3%BAK%C3%A6%20%0F%C3%80%C2%A6%04%C3%9C%C3%8C%C3%89%C2%85W%1E%C3%B8%05%2F%C2%BC%C2%94%19%08%5Dw%C3%8Dr%02%C2%81%1Cb%C2%B1d%C3%86%18%C2%96eg%1E%C2%8E%C3%BF1a%C3%BEi%C2%92%C2%93%C3%AFR%14%5D%C3%93G%C3%80FE%C3%8B%C2%96%3A%2C0R%17%C3%A5%C3%8F%C3%AEp%C2%8C%2B%C2%AE%5CJU%C3%AA%C3%AFR%17%1C%C3%99%5CO%C3%A3%C2%B6%C2%83l%C3%9A%5COzF%C3%BB%C3%9Ce%C2%B5%5Ct%C3%BE%1C%1A%C2%9B%3AG%C2%AC%5C%C2%A6%60%C3%AD%C2%A4%C2%A5%C2%B2%C2%AD%23%C2%8F%C2%B6\'%C2%9F%C2%BF%3A%C3%9D%C2%92%1D%C3%A0%C3%9A%C3%B0%19g%1C%C2%ADo%00m%60p%C3%ACG%5EO%24%C3%90M%C2%93%C3%98P%C2%8C%C2%81%C3%B8%C3%A8%C3%A4%C3%A7%C3%97%C2%95%13%C3%8C%C3%8B%199%1A%C2%93%C2%B9%C3%B0%C2%9A%C2%99e%C3%9Cy%C3%93%C2%8A%C2%8C%C3%87%C2%BC%C3%BE%C3%92%C3%87%C2%B8ss%C3%98%C3%B6%C3%A9A%5E%7Ccg%C3%86%C2%BD%5Bo%5E%C3%85POX%C2%95X%24%C2%936%1D%C2%87%C3%9B%C2%A9%C2%A9-%C2%A5%2Cm%C3%9F%C2%92u%2B%C2%B2%C3%BE%C3%858%C3%8E%11%C3%97%C3%BF%0F%C3%80%C2%85%C2%93g%C2%90%C2%B5%1Bve%19vY%C3%B1%C3%98OE%19%C3%82%C2%97%C2%83%3F%C3%87%C3%A4%C3%B0%C2%816%1A%C2%9A%C2%BBG%02%C2%9F%C3%9C%5C%2F%C3%8F%3C~%C2%BB*%C2%85%C2%A8%C3%BF%C3%A2%08s%C3%AA*x%C3%AE%C3%89%3B%08%C2%A4Q%C2%99%C2%86%C2%A6.%C3%BE%C3%BB%C2%8D%1D%C2%94W%16%23%C3%A2%096n%C3%B8(C%C2%85%C2%B5k%16%C3%B0%C3%B0%23%C2%B7%10%C2%89%C3%84%C2%95%C2%A5_u%C3%83%05%C3%BC%C3%B8%C3%81k3%C3%9A%C3%AC%C3%98%C3%99LO%C3%8F%20n%C3%B3%C2%A4%C2%93%C2%AF%C2%93%26Ykf%C2%B4%0Bb%C2%97~%C2%8D%C3%98%C3%85%2B%C3%87%12%7DI%C2%BBJL%C3%BC%3F%C3%B9%15%C2%B9%1B~K%C3%93%C3%91%01%3E%7Cs%3Bkk%2F%18)%22%C2%BA%60%C3%B5%1C%3Ez%C3%A7%1F%C2%A8%C3%BF%C2%B2%C2%9D%C3%99%C2%B3%C2%A6%12%0AdFg%C2%BFx%C3%BE%7D%0E5%1E%C2%A5nn%05%C2%AE%C3%B2B%C3%9E%C3%9D%C2%B4%C2%8Bw%C2%B65%C2%B1zQ%C3%A5H%C2%9B%C2%BF%C3%B9%C2%AB%C3%8B%C2%B8%C3%A6%C3%8A%25%C3%B4%C3%B6G%C2%98_W%C2%A1%5CW%C2%BA%C2%BC%C3%BC%C3%8Ag*g%3E%C2%898%C3%A4%C2%B4K%C3%B6k%C3%8F%C2%92%C2%89%1C%03%C2%BB%C3%90%C2%83%1Dr%1F%C3%B31%C2%B1%0Ae%C3%92%5E%26v%04%C2%81%C3%82%5C6%3E%C3%BA%06%C3%AF%C3%96wdld2%C3%ABw%C3%AE%C3%92%C3%9A1%60%C3%8B%C2%B3%C3%8E%C2%9F%3D%C3%B56%C2%95%15%C2%85%08a%C3%A3%C3%B5y%C2%88%0FDy%C3%A8__!q%C2%8C%1A5%C3%95%C3%85%C2%AA%1E%C3%A5X%C2%B0%7F%C3%B6%C3%94%26%C3%9Exs\'%C3%A5%C3%93%0A%C3%BEO%C3%BB%C3%B1%C2%89%01%C2%B7%C2%9D%C3%AC%C2%98%08IW%C2%A2%23%C2%82%3A%C3%82%C2%A3%C2%8D%C3%B6%1A%C3%AF%C2%93%C2%A2%C2%A5%C2%A1%C2%A2%00%03G%7B%C3%B9%C3%AE-%C2%8F%C3%B2%C2%87%C2%A6%C3%9E%C3%A3*%C3%90%7C%C2%B8%C2%9B%C3%ABo%7D%C2%8C%C3%B0%60%C2%8CP%C3%88%C3%AFdP-%C2%9B%C3%8A%C2%9A%12%C3%9E%7B%C3%BD3n%C2%BA%C3%ABY%C3%A2%C3%87%1D%01%5E%C3%BA%C3%B5%C2%A7%7C%C3%BF%C2%BE_RV%16%1A%C3%99T%25%0D%C3%84%C2%AB!d%5E)O%C3%83%C2%96%C2%BFSg%C2%93%C2%93%C2%96%C3%A1Z%C2%97%5C%5D%1D*%C2%ABO%5E*c8%C3%89%C2%B7%3B%C2%BEK%C3%91R%C3%B5%18%031%C3%B4f%C3%90%C2%8F%C2%84%C2%8F%3F%C2%8AJU%C3%BA%C3%91%22%09%C3%95%C3%8FJZ%C2%94%C3%97L%C3%A1pc%3B7%C2%AF%C3%B9\'%C2%AE%C3%BF%C3%B3%C2%B5%C2%AC%5D%C2%BF%C2%94%C3%A9%C2%95%01%0AS%C3%BBo%C3%B3%C2%91%01%5Ey%C3%B9%23e%C3%85%C2%92%C3%81L%C2%AF)%C3%8E(u%C2%932%7DF)%C2%AF%3E%C3%BF._%C3%BB%C2%B2%C2%8Do%C3%9F%C2%BD%C2%8E%C2%8B%C3%8E%3F%C2%9Br%C2%9F%C2%A3%C2%B2l%C2%B9%7B%7F%1BO%3E%C3%BE%7B%C2%9E%7C%C3%A6%1DJ%C2%8A%C3%B3%C3%88%0F%C3%B9G*%C2%B7%C2%84%C3%94%C2%BF%2F%C2%86%C3%9E%02z%C3%BB%20%24%C3%BDhQG%C2%BFIK%C3%AA%25%C3%AAG%07%C3%91%C3%BD!%C2%B4X%C3%82)%C3%A2%C2%94iY%7Dr%C3%BEk%C3%A2%C3%BF%C2%80P%C2%87%C2%ACNqbV%C2%81%C2%81%3C%C2%B7%C2%94%C2%93%C2%95%11%5B%C3%8A%C2%89%C3%8A%C2%92%C2%B7%C2%BE%C3%AE%01%3A%C3%9A%7B%C2%99VSJ%C3%95%C3%ACrB!%1F%C3%91%C2%BEA%C3%B6%C3%ACh%C2%A4%C2%A9%C3%A1(%C3%A5%C3%A5%C2%85%C2%A35%C2%81c%C2%86t%C2%8A9%5B%5B%C2%BA%C3%94%0A%C2%985%C2%BF%C2%9A%C2%9A%19%C2%A5x%C3%9C.up%C3%B1%C3%B9%C3%96C%0C%0CD%C2%99%3E%C2%BDD%5D%C2%B3%C2%AC%C3%8Cb%C3%8E%0C%C3%BD%C3%87%C3%91o%C2%B2%22%C3%A4%C2%A1%C2%B3%3Ej%C3%B1%C2%9A%3C1%C2%B2\'%C2%99%C3%92%C2%99%10pY%C2%AE%3C%C2%94V%C2%AE%7C%22%C2%91a%C2%9F%C3%97%3D%C2%A6%C2%9CY%C3%93%C2%9C%04Dd0%C3%86%C2%A0%2CWN%241L%17%C2%81%C2%90%1F%C2%9F%C2%ACl%C3%8D%22%3C%1F.%C3%AC%C3%AC%C3%AF%1F%24%C3%9C%3F%C2%A4%C2%AAds%7C%1E%C2%82!%3Fn%C2%8FK%C3%9D%1B%C2%AB%C2%BF%C3%A6TA%0D%C2%97%2B%C3%8B69n%C2%84%7Br%C3%A5%C3%96)%05%C2%9CS%22Y%15%3B%C3%9CW%C3%AA%C3%A4%C3%B3%3AcO%22R%3D%C3%B3%3F%3E%C2%A7Y%C3%8E%C3%BC%07%C3%84i%C2%963%C2%80%C2%9Ff9%03%C3%B8%C3%A9%14%C3%A0%7F%00%C3%AC%14%C2%9E%16j%C2%9C%C2%82p%00%00%00%00IEND%C2%AEB%60%C2%82";
  var loopyLogo = headerGroup.add(
    "image",
    undefined,
    File.decode(loopyLogo_imgString),
    { name: "loopyLogo" },
  );
  loopyLogo.helpTip = "Visit https://aescripts.com/loopy";
  var credit = headerGroup.add("group", undefined, { name: "credit" });
  credit.orientation = "column";
  credit.alignChildren = ["left", "center"];
  credit.spacing = 0;
  credit.margins = 0;
  var creditLine1 = credit.add("statictext", undefined, undefined, {
    name: "creditLine1",
  });
  creditLine1.text = "Loopy v" + scriptVersionNumber;
  var creditLine2 = credit.add("statictext", undefined, undefined, {
    name: "creditLine2",
  });
  creditLine2.text = "Script by Automotion";
  var creditLine3 = credit.add("statictext", undefined, undefined, {
    name: "creditLine3",
  });
  creditLine3.text = "automotion.studio";
  creditLine3.helpTip = "Visit https://automotion.studio";
  var linksGroup = headerGroup.add("group", undefined, { name: "linksGroup" });
  linksGroup.orientation = "row";
  linksGroup.alignChildren = ["left", "center"];
  linksGroup.spacing = 10;
  linksGroup.margins = 0;
  var visitGetSupport = linksGroup.add("button", undefined, undefined, {
    name: "visitGetSupport",
  });
  visitGetSupport.helpTip = "Open a support ticket at aescripts.com";
  visitGetSupport.text = "Get support";
  var loopyInstructions = settingsWindow.add(
    'edittext {size: [500,350], properties: {name: "loopyInstructions", readonly: true, multiline: true, scrollable: true}}',
  );
  loopyInstructions.text =
    "\rHOW TO USE LOOPY:\r\rSelect properties and/or layers, and press one of the four Loop buttons to apply a loop to these (Continue, Ping pong, Offset or Continue loop types). Loop expressions can be applied to multiple selected layers and/or properties at the same time.\r\rThe Loop Direction button toggles between \'loopIn\', \'loopOut\', and both \'loopIn\' and \'loopOut\' together.\r\rThe Set Keyframe Modifier field limits the loop behaviour to a specific number of keyframes (layer selections will be ignored).\r\rThe Keyframe Modifier checkbox ensures that the Keyframe Modifier value doesn\'t exceed the number of existing keyframes.\r\rThe Keep Expressions checkbox will comment out and retain any existing expression on a property.\r\r=====\r\rLOOPING AV FILES AND PRE-COMPS:\r\rWhen a layer is selected, Loopy will apply Time Remap, add the required keyframes, and loop this property. (If the layer does not support Time Remap, the layer will be skipped, with a warning shown.)\r\rLoop keyframes will be placed at the trimmed inPoint and endPoint.\r\rIf the Time Remap property is already active and has an expression applied, Loopy will only replace the expression, without modifying keyframes.\r\r=====\r\rPATH PROPERTIES:\r\rPath properties do not support standard \'loopIn()\' or \'loopOut()\' expressions. If a selected property is a path, Loopy will apply a custom loop expression to it.\r\r(Path loop expression developed from code by Dan Ebberts.)\r";
  var footerGroup = settingsWindow.add("group", undefined, {
    name: "footerGroup",
  });
  footerGroup.orientation = "row";
  footerGroup.alignChildren = ["left", "center"];
  footerGroup.spacing = 10;
  footerGroup.margins = [0, 5, 0, 0];
  footerGroup.alignment = ["fill", "bottom"];
  var footerLeftGroup = footerGroup.add("group", undefined, {
    name: "footerLeftGroup",
  });
  footerLeftGroup.preferredSize.width = 400;
  footerLeftGroup.orientation = "column";
  footerLeftGroup.alignChildren = ["left", "bottom"];
  footerLeftGroup.spacing = 10;
  footerLeftGroup.margins = 0;
  footerLeftGroup.alignment = ["left", "fill"];
  var settingsRegInfo = footerLeftGroup.add(
    "statictext",
    undefined,
    undefined,
    { name: "settingsRegInfo" },
  );
  settingsRegInfo.text = l8.getRegistration();
  var settingsUpdateCheckbox = footerLeftGroup.add(
    "checkbox",
    undefined,
    undefined,
    { name: "settingsUpdateCheckbox" },
  );
  settingsUpdateCheckbox.text = "Check for updates automatically";
  settingsUpdateCheckbox.value = l8.getUpdateCheckStatus();
  var footerLeftButtonsGroup = footerLeftGroup.add("group", undefined, {
    name: "footerLeftButtonsGroup",
  });
  footerLeftButtonsGroup.orientation = "row";
  footerLeftButtonsGroup.alignChildren = ["left", "center"];
  footerLeftButtonsGroup.spacing = 10;
  footerLeftButtonsGroup.margins = 0;
  footerLeftButtonsGroup.alignment = ["left", "top"];
  var settingsUpdateCheckNow = footerLeftButtonsGroup.add(
    "button",
    undefined,
    undefined,
    { name: "settingsUpdateCheckNow" },
  );
  settingsUpdateCheckNow.text = "Check for updates now";
  var settingsDeactivate = footerLeftButtonsGroup.add(
    "button",
    undefined,
    undefined,
    { name: "settingsDeactivate" },
  );
  settingsDeactivate.helpTip =
    "Deactivate your aescripts.com licence on this machine.";
  settingsDeactivate.text = "Deactivate licence";
  var settingsReset = footerLeftButtonsGroup.add(
    "button",
    undefined,
    undefined,
    { name: "settingsReset" },
  );
  settingsReset.helpTip = "Reset all settings to default values.";
  settingsReset.text = "RESET";
  var footerRightGroup = footerGroup.add("group", undefined, {
    name: "footerRightGroup",
  });
  footerRightGroup.preferredSize.width = 90;
  footerRightGroup.orientation = "column";
  footerRightGroup.alignChildren = ["right", "bottom"];
  footerRightGroup.spacing = 10;
  footerRightGroup.margins = 0;
  footerRightGroup.alignment = ["right", "fill"];
  var settingsClose = footerRightGroup.add("button", undefined, undefined, {
    name: "settingsClose",
  });
  settingsClose.helpTip = "Close this window";
  settingsClose.text = "Close";
  var argLoopDirection = null;
  initSettings();
  var expr = null;
  automotionLoopy.updateUILayout = function (container) {
    container.layout.layout(true);
    loopyWindow.layout.layout(true);
  };
  if (l8.c()) {
    loopyKBar();
  }
})(this);
