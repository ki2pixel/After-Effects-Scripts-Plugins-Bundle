/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function AS_3DPG_My3DPGAwesomeTool(thisObj) {
  var af_settings = {
    helpButtons: [
      {
        name: "Video Tutorial",
        url: "https://www.youtube.com/watch?v=fRmsDuDVlhs",
      },
      { name: "Promo", url: "https://www.youtube.com/watch?v=dat5w4ANEwo" },
      {
        name: "Developer Profile",
        url: "https://www.instagram.com/ahmedsami94",
      },
    ],
    helpText:
      "Few dimensions, MIGTY results!\n\n3D Primitives Generator is your handy toolbox to create 3D primitives with ease.\nAnd now with two more!  (Pyramid and Prism).\nYou can combine a bunch of them to create very cool 3D models inside after effects!\n\nFeatures:\n  - A Redesigned UI with minimal space now yet with MIGHT!\n  - Fast and Light!\n  - Everything created from shape layers, solids, and pre-comps\n  - Easy material and color change and manipulation\n  - Easy-to-use slider controls for all of the generated primitives\n  - Taper with Full control for Cubes, Pyramids, and Prisms)\n  - Better naming for the generated primitives and layers to make it easier to move them to other projects",
    offerTrial: false,
    privateNumber: 32665187,
    productSKU: "AHSP3-SUL",
    scriptAuthor: "Ahmed Studio",
    scriptName: "3D Primitives Generator",
    scriptURL: "https://aescripts.com/3d-primitives-generator",
    scriptVersion: "3.0",
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
    var mx = __BLOB__BLOB_000001__;
    var wx = __BLOB__BLOB_000002__;
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
  var aspg3 = new b(af_settings);
  if (aspg3.c()) {
    function isSecurityPrefSet() {
      return (
        app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        ) === 1
      );
    }
    function detect() {
      var touches = "";
      var keyState = ScriptUI.environment.keyboardState;
      if (keyState.shiftKey) {
        touches += "shift";
      }
      if (keyState.altKey) {
        touches += "alt";
      }
      if (keyState.ctrlKey || keyState.metaKey) {
        touches += "ctrl";
      }
      return touches;
    }
    function CalculateSize(Layer) {
      var rect = Layer.sourceRectAtTime(Layer.containingComp.time, false);
      StaticGet_X.text = "X: " + Math.floor(rect.width) + "px";
      StaticGet_Y.text = "Y: " + Math.floor(rect.height) + "px";
    }
    function CalculateSizeToApply(Layer) {
      var rect = Layer.sourceRectAtTime(Layer.containingComp.time, false);
      EditText_X.text = Math.floor(rect.width);
      EditText_Z.text = Math.floor(rect.width);
      EditText_Y.text = Math.floor(rect.height);
    }
    function getFolderByName(folderName) {
      if (app.project == null) {
        return;
      }
      var myProject = app.project;
      for (var i = 1; i <= myProject.numItems; i += 1) {
        if (
          myProject.item(i) instanceof FolderItem &&
          myProject.item(i).name == folderName
        ) {
          return myProject.item(i);
        }
      }
      myFolder = myProject.items.addFolder(folderName);
      return myFolder;
    }
    function CalculateSize(Layer) {
      var rect = Layer.sourceRectAtTime(Layer.containingComp.time, false);
      StaticGet_X.text = "X: " + Math.floor(rect.width) + "px";
      StaticGet_Y.text = "Y: " + Math.floor(rect.height) + "px";
    }
    function CalculateSizeToApply(Layer) {
      var rect = Layer.sourceRectAtTime(Layer.containingComp.time, false);
      EditText_X.text = Math.floor(rect.width);
      EditText_Z.text = Math.floor(rect.width);
      EditText_Y.text = Math.floor(rect.height);
    }
    function GenerateCube() {
      app.beginUndoGroup("Execute Code");
      if (app.project.file != null) {
        projectName = app.project.file.name;
      } else {
        projectName = "Untitled";
      }
      ScriptFolderName = "3D-Primitives-Generator-Objects_" + projectName;
      curComp = app.project.activeItem;
      time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var myStr = projectName + "." + "Primitive";
      var maxNum_FacesName = 0;
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (
          app.project.item(i) instanceof CompItem &&
          app.project.item(i).name.indexOf(myStr) == 0
        ) {
          maxNum_FacesName = Math.max(
            maxNum_FacesName,
            parseInt(app.project.item(i).name.split("_")[1], 10),
          );
        }
      }
      var Cube_F = make_Cube_face(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Front",
        Cube_Main_X,
        Cube_Main_Y,
      );
      var Cube_B = make_Cube_face(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Back",
        Cube_Main_X,
        Cube_Main_Y,
      );
      var Cube_R = make_Cube_Side(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Right",
        Cube_Main_Z,
        Cube_Main_Y,
      );
      var Cube_L = make_Cube_Side(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Left",
        Cube_Main_Z,
        Cube_Main_Y,
      );
      var Cube_T = make_Cube_Top(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Top",
        Cube_Main_X,
        Cube_Main_Z,
      );
      var Cube_D = make_Cube_Top(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Down",
        Cube_Main_X,
        Cube_Main_Z,
      );
      var Cube_Face = curComp.layer(Cube_F.name);
      var Cube_Back = curComp.layer(Cube_B.name);
      var Cube_Right = curComp.layer(Cube_R.name);
      var Cube_Left = curComp.layer(Cube_L.name);
      var Cube_Top = curComp.layer(Cube_T.name);
      var Cube_Down = curComp.layer(Cube_D.name);
      Cube_Face.selected = true;
      Cube_Back.selected = true;
      Cube_Right.selected = true;
      Cube_Left.selected = true;
      Cube_Top.selected = true;
      Cube_Down.selected = true;
      var myLayers = [];
      for (var i = 0; i < curComp.selectedLayers.length; i += 1) {
        myLayers.push(curComp.selectedLayers[i].index);
      }
      var Str = projectName + "." + "Primitive";
      var maxNum_PrimitiveName = 0;
      for (var i = 1; i <= curComp.numLayers; i += 1) {
        if (curComp.layer(i).name.indexOf(Str) == 0) {
          maxNum_PrimitiveName = Math.max(
            maxNum_PrimitiveName,
            parseInt(curComp.layer(i).name.split("_")[1], 10),
          );
        }
      }
      var precompIndices = myLayers;
      var precompName = Str + "_" + maxNum_PrimitiveName;
      var precomp = curComp.layers.precompose(
        precompIndices,
        precompName,
        true,
      );
      curComp.layer(precompName).threeDLayer = true;
      curComp.layer(precompName).collapseTransformation = true;
      var NullControler = precomp.layers.addSolid(
        [15, 199, 156] / 255,
        precompName + "_" + "Controller",
        60,
        60,
        1,
      );
      NullControler.name = precompName + "_" + "Controller";
      NullControler.source.name = precompName + "_" + "Controller";
      NullControler.label = 14;
      NullControler.enabled = false;
      NullControler.moveToBeginning();
      var Final_Front_Comp = precomp.layer(7);
      var Final_Back_Comp = precomp.layer(6);
      var Final_Left_Comp = precomp.layer(5);
      var Final_Right_Comp = precomp.layer(4);
      var Final_Top_Comp = precomp.layer(3);
      var Final_Down_Comp = precomp.layer(2);
      var CubeFacePosition = Final_Front_Comp.transform.position.value;
      var CubeBackPosition = Final_Back_Comp.transform.position.value;
      var CubeLeftPosition = Final_Left_Comp.transform.position.value;
      var CubeRightPosition = Final_Right_Comp.transform.position.value;
      var CubeTopPosition = Final_Top_Comp.transform.position.value;
      var CubeDownPosition = Final_Down_Comp.transform.position.value;
      if (RadioTaper_Top.value == true) {
        applyPseudoEffect(TopTaperPseudoEffect, precomp.layer(1));
        var PrimitiveControls = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .property("3D Primitive Controls");
        PrimitiveControls(2).setValue(0);
        PrimitiveControls(3).setValue(Cube_Main_X / 2);
        PrimitiveControls(4).setValue(Cube_Main_Z / 2);
        PrimitiveControls(5).setValue(CubeTopPosition[1] - Cube_Main_Y / 2);
        PrimitiveControls(6).setValue(100);
        PrimitiveControls(7).setValue(100);
        PrimitiveControls(10).setValue([38, 0, 100, 255] / 255);
        PrimitiveControls(11).setValue([38, 0, 100, 255] / 255);
        PrimitiveControls(12).setValue([21, 0, 54, 255] / 255);
        PrimitiveControls(13).setValue([21, 0, 54, 255] / 255);
        PrimitiveControls(14).setValue([82, 0, 210, 255] / 255);
        PrimitiveControls(15).setValue([82, 0, 210, 255] / 255);
      }
      if (RadioTaper_Down.value == true) {
        applyPseudoEffect(DownTaperPseudoEffect, precomp.layer(1));
        var PrimitiveControls = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .property("3D Primitive Controls");
        PrimitiveControls(2).setValue(0);
        PrimitiveControls(3).setValue(Cube_Main_X / 2);
        PrimitiveControls(4).setValue(Cube_Main_Z / 2);
        PrimitiveControls(5).setValue(CubeDownPosition[1] + Cube_Main_Y / 2);
        PrimitiveControls(6).setValue(100);
        PrimitiveControls(7).setValue(100);
        PrimitiveControls(10).setValue([38, 0, 100, 255] / 255);
        PrimitiveControls(11).setValue([38, 0, 100, 255] / 255);
        PrimitiveControls(12).setValue([21, 0, 54, 255] / 255);
        PrimitiveControls(13).setValue([21, 0, 54, 255] / 255);
        PrimitiveControls(14).setValue([82, 0, 210, 255] / 255);
        PrimitiveControls(15).setValue([82, 0, 210, 255] / 255);
      }
      precomp.parentFolder = MainParentFolder;
      Final_Front_Comp.transform.position.setValue(
        CubeFacePosition - [0, 0, Cube_Main_Z / 2],
      );
      if (RadioTaper_Top.value == true) {
        Final_Front_Comp.transform.xRotation.expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0002\')";
        Cube_F.layer(1).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0003\');\n[TaperValueTopRight*2, value[1]]";
        Cube_F.layer(4).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0003\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
        Cube_F.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0010\') ";
      }
      if (RadioTaper_Down.value == true) {
        Final_Front_Comp.transform.xRotation.expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0002\')";
        Cube_F.layer(2).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0003\');\n[TaperValueDownRight*2, value[1]]";
        Cube_F.layer(3).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0003\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
        Cube_F.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0010\') ";
      }
      Final_Back_Comp.transform.position.setValue(
        CubeBackPosition + [0, 0, Cube_Main_Z / 2],
      );
      if (RadioTaper_Top.value == true) {
        Final_Back_Comp.transform.xRotation.expression =
          "-comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0002\')";
        Cube_B.layer(1).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0003\');\n[TaperValueTopRight*2, value[1]]";
        Cube_B.layer(4).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0003\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
        Cube_B.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0011\')";
      }
      if (RadioTaper_Down.value == true) {
        Final_Back_Comp.transform.xRotation.expression =
          "-comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0002\')";
        Cube_B.layer(2).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0003\');\n[TaperValueDownRight*2, value[1]]";
        Cube_B.layer(3).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0003\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
        Cube_B.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0011\')";
      }
      Final_Right_Comp.transform.yRotation.setValue(-90);
      CubeRightPosition = Final_Right_Comp.transform.position.value;
      Final_Right_Comp.transform.position.setValue(
        CubeRightPosition + [Cube_Main_X / 2, 0, 0],
      );
      if (RadioTaper_Top.value == true) {
        Final_Right_Comp.transform.orientation.expression =
          "[0,0,comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0002\')]";
        Cube_R.layer(1).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0004\');\n[TaperValueTopRight*2, value[1]]";
        Cube_R.layer(4).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0004\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
        Cube_R.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0013\')";
      }
      if (RadioTaper_Down.value == true) {
        Final_Right_Comp.transform.orientation.expression =
          "[0,0,comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0002\')]";
        Cube_R.layer(2).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0004\');\n[TaperValueDownRight*2, value[1]]";
        Cube_R.layer(3).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0004\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
        Cube_R.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0013\')";
      }
      Final_Left_Comp.transform.yRotation.setValue(90);
      CubeLeftPosition = Final_Left_Comp.transform.position.value;
      Final_Left_Comp.transform.position.setValue(
        CubeLeftPosition - [Cube_Main_X / 2, 0, 0],
      );
      if (RadioTaper_Top.value == true) {
        Final_Left_Comp.transform.orientation.expression =
          "-[0,0,comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0002\')]";
        Cube_L.layer(1).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0004\');\n[TaperValueTopRight*2, value[1]]";
        Cube_L.layer(4).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0004\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
        Cube_L.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0012\')";
      }
      if (RadioTaper_Down.value == true) {
        Final_Left_Comp.transform.orientation.expression =
          "-[0,0,comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0002\')]";
        Cube_L.layer(2).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0004\');\n[TaperValueDownRight*2, value[1]]";
        Cube_L.layer(3).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0004\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
        Cube_L.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0012\')";
      }
      Final_Top_Comp.transform.xRotation.setValue(-90);
      CubeTopPosition = Final_Top_Comp.transform.position.value;
      Final_Top_Comp.transform.position.setValue(
        CubeTopPosition - [0, Cube_Main_Y / 2, 0],
      );
      if (RadioTaper_Top.value == true) {
        Final_Top_Comp.transform.scale.expression =
          "TopScaleX = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0006\');TopScaleY = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0007\');[TopScaleX,TopScaleY,value[2]]";
        Final_Top_Comp.transform.position.expression =
          "TopPos = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0005\');[value[0],TopPos,value[2]]";
        Cube_T.layer(1).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0014\')";
      }
      if (RadioTaper_Down.value == true) {
        Cube_T.layer(1).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0014\')";
      }
      Final_Down_Comp.transform.xRotation.setValue(90);
      CubeDownPosition = Final_Down_Comp.transform.position.value;
      Final_Down_Comp.transform.position.setValue(
        CubeDownPosition + [0, Cube_Main_Y / 2, 0],
      );
      if (RadioTaper_Down.value == true) {
        Final_Down_Comp.transform.scale.expression =
          "DownScaleX = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0006\');DownScaleY = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0007\');[DownScaleX,DownScaleY,value[2]]";
        Final_Down_Comp.transform.position.expression =
          "DownPos = comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0005\');[value[0],DownPos,value[2]]";
        Cube_D.layer(1).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsDown-0015\')";
      }
      if (RadioTaper_Top.value == true) {
        Cube_D.layer(1).property("ADBE Effect Parade").property("ADBE Fill")(
          "Color",
        ).expression =
          "comp(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "\').layer(\'" +
          myStr +
          "_" +
          maxNum_FacesName +
          1 +
          "_Controller" +
          "\').effect(\'3D Primitive Controls\')(\'Pseudo/3DPrimitiveControlsTop-0015\')";
      }
      app.endUndoGroup();
    }
    function make_Cube_face(name, Cube_X, Cube_Y) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var FaceSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        Cube_X,
        Cube_Y,
        1,
      );
      var newMask = FaceSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var FaceFillColor =
        FaceSolid.property("ADBE Effect Parade").addProperty("ADBE Fill");
      FaceFillColor.name = "Color";
      var masksGroup = FaceSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var F_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      F_precomp.width = Cube_X;
      F_precomp.height = Cube_Y;
      curComp.layer(name).threeDLayer = true;
      F_precomp.layers[5].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      if (RadioTaper_Top.value == true) {
        moveAnchor(1, 2);
      }
      if (RadioTaper_Down.value == true) {
        moveAnchor(1, 0);
      }
      F_precomp.parentFolder = MainParentFolder;
      return F_precomp;
    }
    function make_Cube_Side(name, Cube_Z, Cube_Y) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var SideSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        Cube_Z,
        Cube_Y,
        1,
      );
      var newMask = SideSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var SideFillColor =
        SideSolid.property("ADBE Effect Parade").addProperty("ADBE Fill");
      SideFillColor.name = "Color";
      var masksGroup = SideSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var F_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      F_precomp.width = Cube_Z;
      F_precomp.height = Cube_Y;
      curComp.layer(name).threeDLayer = true;
      F_precomp.layers[5].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      if (RadioTaper_Top.value == true) {
        moveAnchor(1, 2);
      }
      if (RadioTaper_Down.value == true) {
        moveAnchor(1, 0);
      }
      F_precomp.parentFolder = MainParentFolder;
      return F_precomp;
    }
    function make_Cube_Top(name, Cube_X, Cube_Z) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var TopSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        Cube_X,
        Cube_Z,
        1,
      );
      var TopFillColor =
        TopSolid.property("ADBE Effect Parade").addProperty("ADBE Fill");
      TopFillColor.name = "Color";
      moveAnchor(1, 1);
      var F_precomp = app.project.activeItem.layers.precompose([1], name, true);
      F_precomp.width = Cube_X;
      F_precomp.height = Cube_Z;
      curComp.layer(name).threeDLayer = true;
      F_precomp.layers[1].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      F_precomp.parentFolder = MainParentFolder;
      return F_precomp;
    }
    function applyPseudoEffect(TopTaperPseudoEffect, myLayerToApply) {
      var userDataFolder = getUserDataFolder();
      var animationPreset = createResourceFile(
        TopTaperPseudoEffect.presetName,
        TopTaperPseudoEffect.presetBinary,
        userDataFolder,
      );
      myLayerToApply.applyPreset(File(animationPreset));
    }
    function getUserDataFolder() {
      try {
        var userDataFolder = Folder.userData;
        var aescriptsFolder = Folder(
          userDataFolder.toString() + "/Aescripts/test/",
        );
        if (!aescriptsFolder.exists) {
          var checkFolder = aescriptsFolder.create();
          if (!checkFolder) {
            alert(
              'Error creating "' +
                checkFolder.fsName +
                "\nPlease check the permissions for this folder:\n" +
                userDataFolder +
                "\n\nA temp folder will be used instead",
            );
            aescriptsFolder = Folder.temp;
          }
        }
        return aescriptsFolder.toString();
      } catch (err) {
        alert(
          "Permissions issue with user data folder\nPlease give AE full read and write permissions to the ~/Library/Application Support/Aescripts/test folder.",
        );
      }
    }
    function createResourceFile(filename, binaryString, resourceFolder) {
      try {
        var myFile = new File(resourceFolder + "/" + filename);
        if (!File(myFile).exists) {
          myFile.encoding = "BINARY";
          myFile.open("w");
          myFile.write(binaryString);
          myFile.close();
        } else {
          File(myFile).remove();
          myFile.encoding = "BINARY";
          myFile.open("w");
          myFile.write(binaryString);
          myFile.close();
        }
        return myFile;
      } catch (err) {
        alert("Error in createResourceFile function\n" + err.toString());
      }
    }
    function Extrude3D(radius, height) {
      app.beginUndoGroup("Add new shape layer");
      if (app.project.file != null) {
        projectName = app.project.file.name;
      } else {
        projectName = "Untitled";
      }
      ScriptFolderName = "3D-Primitives-Generator-Objects_" + projectName;
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var myStr = projectName + "." + "Primitive";
      var maxNum_FacesName = 0;
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (
          app.project.item(i) instanceof CompItem &&
          app.project.item(i).name.indexOf(myStr) == 0
        ) {
          maxNum_FacesName = Math.max(
            maxNum_FacesName,
            parseInt(app.project.item(i).name.split("_")[1], 10),
          );
        }
      }
      var F = make3D_Circular(
        myStr + "_" + maxNum_FacesName + 1 + "_Face",
        radius,
      );
      var B = make3D_Circular(
        myStr + "_" + maxNum_FacesName + 1 + "_Back",
        radius,
      );
      var E = make3D_Edge(
        myStr + "_" + maxNum_FacesName + 1 + "_Edge",
        radius,
        height,
      );
      var Face = curComp.layer(F.name);
      var Back = curComp.layer(B.name);
      var Edge = curComp.layer(E.name);
      var xFace = Face.transform.scale.value[0];
      var yFace = Face.transform.scale.value[1];
      var zFace = Face.transform.scale.value[2];
      var bounds = Face.sourceRectAtTime(time, true);
      var widthFace = Math.round((bounds.width * xFace) / 100);
      var heghtFace = Math.round((bounds.height * yFace) / 100);
      var xBack = Back.transform.scale.value[0];
      var yBack = Back.transform.scale.value[1];
      var zBack = Back.transform.scale.value[2];
      var bounds = Back.sourceRectAtTime(time, true);
      var widthBack = Math.round((bounds.width * xBack) / 100);
      var heghtBack = Math.round((bounds.height * yBack) / 100);
      var xEdge = Edge.transform.scale.value[0];
      var yEdge = Edge.transform.scale.value[1];
      var zEdge = Edge.transform.scale.value[2];
      var bounds = Edge.sourceRectAtTime(time, true);
      var widthEdge = Math.round((bounds.width * xEdge) / 100);
      var heghtEdge = Math.round((bounds.height * yEdge) / 100);
      var Circumference = widthFace * 3.14;
      var NE = Math.round(Circumference / widthEdge);
      var Factor = 360 / NE;
      var NullControler = curComp.layers.addSolid(
        [180, 31, 171] / 255,
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Controller",
        60,
        60,
        1,
      );
      NullControler.name =
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Controller";
      NullControler.source.name =
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Controller";
      NullControler.label = 13;
      NullControler.enabled = false;
      var SegNum = NullControler.property("ADBE Effect Parade").addProperty(
        "ADBE Slider Control",
      );
      SegNum.name = "Segments Number";
      SegNum(1).setValue(NE);
      var Rad = NullControler.property("ADBE Effect Parade").addProperty(
        "ADBE Slider Control",
      );
      Rad.name = "Radius";
      Rad(1).setValue(radius);
      var Gaps = NullControler.property("ADBE Effect Parade").addProperty(
        "ADBE Slider Control",
      );
      Gaps.name = "Gaps";
      Gaps(1).setValue(NE / 10);
      var expr =
        "Radius=thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Radius\')(\'ADBE Slider Control-0001\');\nMoh=2*(22/7)*Radius;\nSegNum=thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Segments Number\')(\'ADBE Slider Control-0001\');\nindex*(360/SegNum )";
      for (var i = 0; i <= NE; i += 1) {
        var RepeatedEdge = Edge.duplicate();
        RepeatedEdge.transform.yRotation.expression = expr;
        var anchVal = RepeatedEdge.property("anchorPoint").value;
        RepeatedEdge.property("anchorPoint").expression =
          "[" +
          anchVal[0] +
          "," +
          anchVal[1] +
          ",thisComp.layer(\'" +
          NullControler.name +
          "\').effect(\'Radius\')(\'ADBE Slider Control-0001\')]";
        RepeatedEdge.property("scale").expression =
          "Radius=thisComp.layer(\'" +
          NullControler.name +
          "\').effect(\'Radius\')(\'ADBE Slider Control-0001\');SegNum=thisComp.layer(\'" +
          NullControler.name +
          "\').effect(\'Segments Number\')(\'ADBE Slider Control-0001\');circumference =2*(22/7)*Radius;Width = circumference/SegNum;var dimensions = thisLayer.sourceRectAtTime(time);[Width / dimensions.width * 100,value[1]]+[thisComp.layer(\'" +
          NullControler.name +
          "\').effect(\'Gaps\')(\'ADBE Slider Control-0001\'),0]";
        RepeatedEdge.shy = true;
      }
      curComp.hideShyLayers = true;
      Edge.transform.yRotation.expression = expr;
      var anchEdgeVal = Edge.property("anchorPoint").value;
      Edge.property("anchorPoint").expression =
        "[" +
        anchVal[0] +
        "," +
        anchVal[1] +
        ",thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Radius\')(\'ADBE Slider Control-0001\')]";
      Edge.property("scale").expression =
        "Radius=thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Radius\')(\'ADBE Slider Control-0001\');SegNum=thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Segments Number\')(\'ADBE Slider Control-0001\');circumference =2*(22/7)*Radius;Width = circumference/SegNum;var dimensions = thisLayer.sourceRectAtTime(time);[Width / dimensions.width * 100,value[1]]+[thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Gaps\')(\'ADBE Slider Control-0001\'),0]";
      var BackPosition = Back.transform.position.value;
      Back.transform.position.setValue(
        BackPosition + [0, 0, heghtEdge / 2 + 1],
      );
      Back.transform.scale.expression =
        "var targetSize = [thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Radius\')(\'ADBE Slider Control-0001\')*2, thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Radius\')(\'ADBE Slider Control-0001\')*2];\nvar sr = thisLayer.sourceRectAtTime(time);\n[targetSize[0] / sr.width * 100, targetSize[1] / sr.height * 100];";
      var FacePosition = Face.transform.position.value;
      Face.transform.position.setValue(
        FacePosition - [0, 0, heghtEdge / 2 + 1],
      );
      Face.transform.scale.expression =
        "var targetSize = [thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Radius\')(\'ADBE Slider Control-0001\')*2, thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Radius\')(\'ADBE Slider Control-0001\')*2];\nvar sr = thisLayer.sourceRectAtTime(time);\n[targetSize[0] / sr.width * 100, targetSize[1] / sr.height * 100];";
      Face.moveToBeginning();
      NullControler.moveToBeginning();
      var myStr01 = myStr + "_" + maxNum_FacesName + 1 + "_Face";
      var myStr02 = myStr + "_" + maxNum_FacesName + 1 + "_Back";
      var myStr03 = myStr + "_" + maxNum_FacesName + 1 + "_Edge";
      var maxNum = 0;
      for (var i = 1; i <= curComp.numLayers; i += 1) {
        if (
          curComp.layer(i).name.indexOf(myStr01) == 0 ||
          curComp.layer(i).name.indexOf(myStr02) == 0 ||
          curComp.layer(i).name.indexOf(myStr03) == 0
        ) {
          curComp.layers[i].selected = true;
        }
      }
      var myLayers = [];
      for (var i = 0; i < curComp.selectedLayers.length; i += 1) {
        myLayers.push(curComp.selectedLayers[i].index);
      }
      var precompIndices = myLayers;
      var precompName = myStr + "_" + maxNum_FacesName + 1;
      var precomp = curComp.layers.precompose(
        precompIndices,
        precompName,
        true,
      );
      curComp.layer(precompName).threeDLayer = true;
      curComp.layer(precompName).collapseTransformation = true;
      precomp.parentFolder = MainParentFolder;
      app.endUndoGroup();
    }
    function make3D_Circular(name, radius) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var myShapeLayer = curComp.layers.addShape();
      myShapeLayer.name = name;
      var shapeGroup = myShapeLayer
        .property("Contents")
        .addProperty("ADBE Vector Group");
      var myEllipse = shapeGroup
        .property("Contents")
        .addProperty("ADBE Vector Shape - Ellipse");
      myEllipse.property("Size").setValue([radius * 2, radius * 2]);
      var myFill = shapeGroup
        .property("Contents")
        .addProperty("ADBE Vector Graphic - Fill");
      myFill.property("Color").setValue([38, 0, 100, 255] / 255);
      moveAnchor(1, 1);
      var F_precomp = app.project.activeItem.layers.precompose([1], name, true);
      F_precomp.width = radius * 2;
      F_precomp.height = radius * 2;
      curComp.layer(name).threeDLayer = true;
      F_precomp.layers[1].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      F_precomp.parentFolder = MainParentFolder;
      return F_precomp;
    }
    function make3D_Edge(name, radius, height) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var myShapeLayer = curComp.layers.addShape();
      myShapeLayer.name = name;
      var shapeGroup = myShapeLayer
        .property("Contents")
        .addProperty("ADBE Vector Group");
      var myEllipse = shapeGroup
        .property("Contents")
        .addProperty("ADBE Vector Shape - Rect");
      myEllipse.property("Size").setValue([30, height]);
      var myFill = shapeGroup
        .property("Contents")
        .addProperty("ADBE Vector Graphic - Fill");
      myFill.property("Color").setValue([21, 0, 54, 255] / 255);
      moveAnchor(1, 1);
      var F_precomp = app.project.activeItem.layers.precompose([1], name, true);
      F_precomp.width = 30;
      F_precomp.height = height;
      curComp.layer(name).threeDLayer = true;
      F_precomp.layers[1].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      curComp.layer(name).rotationX.setValue(90);
      var myVal = curComp.layer(name).property("anchorPoint").value;
      curComp
        .layer(name)
        .property("anchorPoint")
        .setValue(myVal + [0, 0, radius]);
      F_precomp.parentFolder = MainParentFolder;
      return F_precomp;
    }
    function GenerateCubeFromFaces() {
      app.beginUndoGroup("Execute Code");
      moveAnchor(1, 1);
      curComp = app.project.activeItem;
      time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var Selected_Face_Data = Get_Cube_face_From_Selected(
        From_Faces_Front_Layer,
      );
      var Selected_Back_Data = Get_Cube_face_From_Selected(
        From_Faces_Back_Layer,
      );
      var Selected_Left_Data = Get_Cube_Left_From_Selected(
        From_Faces_Left_Layer,
      );
      var Selected_Right_Data = Get_Cube_Left_From_Selected(
        From_Faces_Right_Layer,
      );
      var Selected_Top_Data = Get_Cube_Top_From_Selected(From_Faces_Top_Layer);
      var Selected_Down_Data = Get_Cube_Top_From_Selected(
        From_Faces_Down_Layer,
      );
      var Cube_Face = Selected_Face_Data[0];
      Cube_Main_X = Selected_Face_Data[1];
      Cube_Main_Y = Selected_Face_Data[2];
      var Cube_Back = Selected_Back_Data[0];
      var Cube_Left = Selected_Left_Data[0];
      Cube_Main_Z = Selected_Left_Data[1];
      var Cube_Right = Selected_Right_Data[0];
      var Cube_Top = Selected_Top_Data[0];
      var Cube_Down = Selected_Down_Data[0];
      var FromFacesPrimitiveName = "FromFacesPrimitive##";
      var premitiveCount = 0;
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (
          app.project.item(i) instanceof CompItem &&
          app.project.item(i).name.indexOf(FromFacesPrimitiveName) == 0
        ) {
          premitiveCount++;
        }
      }
      var Final_Face_Comp = curComp.layer(Cube_Face.name);
      var Final_Back_Comp = curComp.layer(Cube_Back.name);
      var Final_Left_Comp = curComp.layer(Cube_Left.name);
      var Final_Right_Comp = curComp.layer(Cube_Right.name);
      var Final_Top_Comp = curComp.layer(Cube_Top.name);
      var Final_Down_Comp = curComp.layer(Cube_Down.name);
      var CubeFacePosition = Final_Face_Comp.transform.position.value;
      var CubeBackPosition = Final_Back_Comp.transform.position.value;
      var CubeLeftPosition = Final_Left_Comp.transform.position.value;
      var CubeRightPosition = Final_Right_Comp.transform.position.value;
      var CubeTopPosition = Final_Top_Comp.transform.position.value;
      var CubeDownPosition = Final_Down_Comp.transform.position.value;
      Final_Face_Comp.selected = true;
      Final_Back_Comp.selected = true;
      Final_Left_Comp.selected = true;
      Final_Right_Comp.selected = true;
      Final_Top_Comp.selected = true;
      Final_Down_Comp.selected = true;
      var myLayers = [];
      for (var i = 0; i < curComp.selectedLayers.length; i += 1) {
        myLayers.push(curComp.selectedLayers[i].index);
      }
      var precompIndices = myLayers;
      var precompName = FromFacesPrimitiveName + "_" + premitiveCount;
      if (premitiveCount == 0) {
        precomp = curComp.layers.precompose(
          precompIndices,
          "FromFacesPrimitive##_0",
          true,
        );
      } else {
        precomp = curComp.layers.precompose(precompIndices, precompName, true);
      }
      curComp.layer(precompName).threeDLayer = true;
      curComp.layer(precompName).collapseTransformation = true;
      var NullControler = precomp.layers.addSolid(
        [15, 199, 156] / 255,
        precompName + "_" + "Controller",
        60,
        60,
        1,
      );
      NullControler.name = precompName + "_" + "Controller";
      NullControler.source.name = precompName + "_" + "Controller";
      NullControler.label = 14;
      NullControler.enabled = false;
      NullControler.moveToBeginning();
      precomp.parentFolder = MainParentFolder;
      if (RadioTaper_Top.value == true) {
        var TopTaperSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        TopTaperSlider.name = "Top Taper";
        TopTaperSlider(1).setValue(0);
        var TopTaperFBSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        TopTaperFBSlider.name = "Top Taper (Front - Back)";
        TopTaperFBSlider(1).setValue(Cube_Main_X / 2);
        var TopTaperLRSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        TopTaperLRSlider.name = "Top Taper (Right - Left)";
        TopTaperLRSlider(1).setValue(Cube_Main_Z / 2);
        var TopPositionSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        TopPositionSlider.name = "Top Position";
        TopPositionSlider(1).setValue(CubeTopPosition[1] - Cube_Main_Y / 2);
        var TopScaleSliderX = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        TopScaleSliderX.name = "Top Scale X";
        TopScaleSliderX(1).setValue(100);
        var TopScaleSliderY = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        TopScaleSliderY.name = "Top Scale Y";
        TopScaleSliderY(1).setValue(100);
      }
      if (RadioTaper_Down.value == true) {
        var DownTaperSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        DownTaperSlider.name = "Down Taper";
        DownTaperSlider(1).setValue(0);
        var DownTaperFBSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        DownTaperFBSlider.name = "Down Taper (Front - Back)";
        DownTaperFBSlider(1).setValue(Cube_Main_X / 2);
        var DownTaperLRSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        DownTaperLRSlider.name = "Down Taper (Right - Left)";
        DownTaperLRSlider(1).setValue(Cube_Main_Z / 2);
        var DownPositionSlider = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        DownPositionSlider.name = "Down Position";
        DownPositionSlider(1).setValue(CubeDownPosition[1] + Cube_Main_Y / 2);
        var DownScaleSliderX = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        DownScaleSliderX.name = "Down Scale X";
        DownScaleSliderX(1).setValue(100);
        var DownScaleSliderY = precomp
          .layer(1)
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        DownScaleSliderY.name = "Down Scale Y";
        DownScaleSliderY(1).setValue(100);
      }
      var Final_Face_Comp_02 = precomp.layer(7);
      var Final_Back_Comp_02 = precomp.layer(6);
      var Final_Left_Comp_02 = precomp.layer(5);
      var Final_Right_Comp_02 = precomp.layer(4);
      var Final_Top_Comp_02 = precomp.layer(3);
      var Final_Down_Comp_02 = precomp.layer(2);
      Final_Face_Comp_02.transform.position.setValue(
        CubeFacePosition - [0, 0, Cube_Main_Z / 2],
      );
      if (RadioTaper_Top.value == true) {
        Final_Face_Comp_02.transform.xRotation.expression =
          "thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper\')(\'ADBE Slider Control-0001\')";
        Cube_Face.layer(2).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\n[TaperValueTopRight*2, value[1]]";
        Cube_Face.layer(5).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
      }
      if (RadioTaper_Down.value == true) {
        Final_Face_Comp_02.transform.xRotation.expression =
          "thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper\')(\'ADBE Slider Control-0001\')";
        Cube_Face.layer(3).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\n[TaperValueDownRight*2, value[1]]";
        Cube_Face.layer(4).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
      }
      Final_Back_Comp_02.transform.position.setValue(
        CubeBackPosition + [0, 0, Cube_Main_Z / 2],
      );
      if (RadioTaper_Top.value == true) {
        Final_Back_Comp_02.transform.xRotation.expression =
          "-thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper\')(\'ADBE Slider Control-0001\')";
        Cube_Back.layer(2).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\n[TaperValueTopRight*2, value[1]]";
        Cube_Back.layer(5).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
      }
      if (RadioTaper_Down.value == true) {
        Final_Back_Comp_02.transform.xRotation.expression =
          "-thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper\')(\'ADBE Slider Control-0001\')";
        Cube_Back.layer(3).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\n[TaperValueDownRight*2, value[1]]";
        Cube_Back.layer(4).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Front - Back)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
      }
      Final_Left_Comp_02.transform.yRotation.setValue(90);
      Final_Left_Comp_02.transform.position.setValue(
        CubeLeftPosition - [Cube_Main_X / 2, 0, 0],
      );
      if (RadioTaper_Top.value == true) {
        Final_Left_Comp_02.transform.orientation.expression =
          "-[0,0,thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper\')(\'ADBE Slider Control-0001\')]";
        Cube_Left.layer(2).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\n[TaperValueTopRight*2, value[1]]";
        Cube_Left.layer(5).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
      }
      if (RadioTaper_Down.value == true) {
        Final_Left_Comp_02.transform.orientation.expression =
          "-[0,0,thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper\')(\'ADBE Slider Control-0001\')]";
        Cube_Left.layer(3).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\n[TaperValueDownRight*2, value[1]]";
        Cube_Left.layer(4).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
      }
      Final_Right_Comp_02.transform.yRotation.setValue(-90);
      Final_Right_Comp_02.transform.position.setValue(
        CubeRightPosition + [Cube_Main_X / 2, 0, 0],
      );
      if (RadioTaper_Top.value == true) {
        Final_Right_Comp_02.transform.orientation.expression =
          "[0,0,thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper\')(\'ADBE Slider Control-0001\')]";
        Cube_Right.layer(2).transform.position.expression =
          "TaperValueTopRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\n[TaperValueTopRight*2, value[1]]";
        Cube_Right.layer(5).transform.position.expression =
          "TaperValueTopLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueTopLeft*2, value[1]]";
      }
      if (RadioTaper_Down.value == true) {
        Final_Right_Comp_02.transform.orientation.expression =
          "[0,0,thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper\')(\'ADBE Slider Control-0001\')]";
        Cube_Right.layer(3).transform.position.expression =
          "TaperValueDownRight = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\n[TaperValueDownRight*2, value[1]]";
        Cube_Right.layer(4).transform.position.expression =
          "TaperValueDownLeft = comp(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "\').layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Taper (Right - Left)\')(\'ADBE Slider Control-0001\');\nCWidth = thisComp.width;\n[CWidth - TaperValueDownLeft*2, value[1]]";
      }
      Final_Top_Comp_02.transform.xRotation.setValue(-90);
      Final_Top_Comp_02.transform.position.setValue(
        CubeTopPosition - [0, Cube_Main_Y / 2, 0],
      );
      if (RadioTaper_Top.value == true) {
        Final_Top_Comp_02.transform.scale.expression =
          "TopScaleX = thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Scale X\')(\'ADBE Slider Control-0001\');TopScaleY = thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Scale Y\')(\'ADBE Slider Control-0001\');[TopScaleX,TopScaleY,value[2]]";
        Final_Top_Comp_02.transform.position.expression =
          "TopPos = thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Top Position\')(\'ADBE Slider Control-0001\');[value[0],TopPos,value[2]]";
      }
      Final_Down_Comp_02.transform.xRotation.setValue(90);
      Final_Down_Comp_02.transform.position.setValue(
        CubeDownPosition + [0, Cube_Main_Y / 2, 0],
      );
      if (RadioTaper_Down.value == true) {
        Final_Down_Comp_02.transform.scale.expression =
          "DownScaleX = thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Scale X\')(\'ADBE Slider Control-0001\');DownScaleY = thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Scale Y\')(\'ADBE Slider Control-0001\');[DownScaleX,DownScaleY,value[2]]";
        Final_Down_Comp_02.transform.position.expression =
          "DownPos = thisComp.layer(\'" +
          FromFacesPrimitiveName +
          "_" +
          premitiveCount +
          "_Controller" +
          "\').effect(\'Down Position\')(\'ADBE Slider Control-0001\');[value[0],DownPos,value[2]]";
      }
      app.endUndoGroup();
    }
    function Get_Cube_face_From_Selected(Facelayer) {
      MainParentFolder = getFolderByName(ScriptFolderName);
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var FaceLayerDiminsions = Facelayer.sourceRectAtTime(time, false);
      var Facelayer_X = Math.floor(FaceLayerDiminsions.width);
      var Facelayer_Y = Math.floor(FaceLayerDiminsions.height);
      var FaceSolid = curComp.layers.addSolid(
        [255, 255, 255],
        Facelayer.name + "_" + "Solid",
        Facelayer_X,
        Facelayer_Y,
        1,
      );
      var newMask = FaceSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var masksGroup = FaceSolid("Masks");
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var F_precomp = app.project.activeItem.layers.precompose(
        [Facelayer.index, 1, 2, 3, 4, 5],
        Facelayer.name,
        true,
      );
      F_precomp.width = Facelayer_X;
      F_precomp.height = Facelayer_Y;
      F_precomp.layers[6].threeDLayer = false;
      F_precomp.layers[6].preserveTransparency = true;
      F_precomp.layers[6].transform.position.setValue([
        Facelayer_X / 2,
        Facelayer_Y / 2,
        0,
      ]);
      F_precomp.layers[6].moveToBeginning();
      F_precomp.layers[6].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      curComp.layer(F_precomp.name).threeDLayer = true;
      if (RadioTaper_Top.value == true) {
        moveAnchor(1, 2);
      }
      if (RadioTaper_Down.value == true) {
        moveAnchor(1, 0);
      }
      F_precomp.parentFolder = MainParentFolder;
      return [F_precomp, Facelayer_X, Facelayer_Y];
    }
    function Get_Cube_Left_From_Selected(Leftlayer) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var LeftLayerDiminsions = Leftlayer.sourceRectAtTime(time, false);
      var Leftlayer_X = Math.floor(LeftLayerDiminsions.width);
      var Leftlayer_Y = Math.floor(LeftLayerDiminsions.height);
      var LeftSolid = curComp.layers.addSolid(
        [255, 255, 255],
        Leftlayer.name + "_" + "Solid",
        Leftlayer_X,
        Leftlayer_Y,
        1,
      );
      var newMask = LeftSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var masksGroup = LeftSolid("Masks");
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var F_precomp = app.project.activeItem.layers.precompose(
        [Leftlayer.index, 1, 2, 3, 4, 5],
        Leftlayer.name,
        true,
      );
      F_precomp.width = Leftlayer_X;
      F_precomp.height = Leftlayer_Y;
      F_precomp.layers[6].threeDLayer = false;
      F_precomp.layers[6].preserveTransparency = true;
      F_precomp.layers[6].transform.position.setValue([
        Leftlayer_X / 2,
        Leftlayer_Y / 2,
        0,
      ]);
      F_precomp.layers[6].moveToBeginning();
      F_precomp.layers[6].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      curComp.layer(F_precomp.name).threeDLayer = true;
      if (RadioTaper_Top.value == true) {
        moveAnchor(1, 2);
      }
      if (RadioTaper_Down.value == true) {
        moveAnchor(1, 0);
      }
      MainParentFolder = getFolderByName(ScriptFolderName);
      F_precomp.parentFolder = MainParentFolder;
      return [F_precomp, Leftlayer_X, Leftlayer_Y];
    }
    function Get_Cube_Top_From_Selected(Toplayer) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      var TopLayerDiminsions = Toplayer.sourceRectAtTime(time, false);
      var Toplayer_X = Math.floor(TopLayerDiminsions.width);
      var Toplayer_Y = Math.floor(TopLayerDiminsions.height);
      var TopSolid = curComp.layers.addSolid(
        [255, 255, 255],
        Toplayer.name + "_" + "Solid",
        Toplayer_X,
        Toplayer_Y,
        1,
      );
      var newMask = TopSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var masksGroup = TopSolid("Masks");
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var F_precomp = app.project.activeItem.layers.precompose(
        [Toplayer.index, 1, 2, 3, 4, 5],
        Toplayer.name,
        true,
      );
      F_precomp.width = Toplayer_X;
      F_precomp.height = Toplayer_Y;
      F_precomp.layers[6].threeDLayer = false;
      F_precomp.layers[6].preserveTransparency = true;
      F_precomp.layers[6].transform.position.setValue([
        Toplayer_X / 2,
        Toplayer_Y / 2,
        0,
      ]);
      F_precomp.layers[6].moveToBeginning();
      F_precomp.layers[6].transform.position.setValue([
        F_precomp.width / 2,
        F_precomp.height / 2,
        0,
      ]);
      curComp.layer(F_precomp.name).threeDLayer = true;
      moveAnchor(1, 1);
      MainParentFolder = getFolderByName(ScriptFolderName);
      F_precomp.parentFolder = MainParentFolder;
      return [F_precomp, Toplayer_X, Toplayer_Y];
    }
    function make_Pyramid_Base(name, BaseWidth_X, BaseLength_Y) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var BaseSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        BaseWidth_X,
        BaseLength_Y,
        1,
      );
      var newMask = BaseSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var BaseFillColor =
        BaseSolid.property("ADBE Effect Parade").addProperty("ADBE Fill");
      BaseFillColor.property("Color").setValue([82, 0, 210, 255] / 255);
      var masksGroup = BaseSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var Base_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      Base_precomp.width = BaseWidth_X;
      Base_precomp.height = BaseLength_Y;
      curComp.layer(name).threeDLayer = true;
      Base_precomp.layers[5].transform.position.setValue([
        Base_precomp.width / 2,
        Base_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      Base_precomp.parentFolder = MainParentFolder;
      return Base_precomp;
    }
    function make_Pyramid_Back(name, BaseWidth_X, BaseWidth_Y, PyramidHeight) {
      var opposite = PyramidHeight;
      var adjacent = BaseWidth_Y / 2;
      var hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
      var FinalHypotenuse = Math.round(hypotenuse);
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidFrontBackSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        BaseWidth_X,
        FinalHypotenuse,
        1,
      );
      var newMask = PyramidFrontBackSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidFrontBackSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var masksGroup = PyramidFrontBackSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidFrontBack_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidFrontBack_precomp.width = BaseWidth_X;
      PyramidFrontBack_precomp.height = FinalHypotenuse;
      curComp.layer(name).threeDLayer = true;
      PyramidFrontBack_precomp.layers[5].transform.position.setValue([
        PyramidFrontBack_precomp.width / 2,
        PyramidFrontBack_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      var Back_FirstNull_pos =
        PyramidFrontBack_precomp.layer(1).transform.position.value;
      var Back_SecondNull_pos =
        PyramidFrontBack_precomp.layer(4).transform.position.value;
      PyramidFrontBack_precomp.layer(1).transform.position.setValue(
        Back_FirstNull_pos + [-PyramidFrontBack_precomp.width / 2, 0],
      );
      PyramidFrontBack_precomp.layer(4).transform.position.setValue(
        Back_SecondNull_pos + [PyramidFrontBack_precomp.width / 2, 0],
      );
      PyramidFrontBack_precomp.parentFolder = MainParentFolder;
      return PyramidFrontBack_precomp;
    }
    function make_Pyramid_Front(name, BaseWidth_X, BaseWidth_Y, PyramidHeight) {
      var opposite = PyramidHeight;
      var adjacent = BaseWidth_Y / 2;
      var hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
      var FinalHypotenuse = Math.round(hypotenuse);
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidFrontBackSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        BaseWidth_X,
        FinalHypotenuse,
        1,
      );
      var newMask = PyramidFrontBackSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidFrontBackSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var masksGroup = PyramidFrontBackSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidFrontBack_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidFrontBack_precomp.width = BaseWidth_X;
      PyramidFrontBack_precomp.height = FinalHypotenuse;
      curComp.layer(name).threeDLayer = true;
      PyramidFrontBack_precomp.layers[5].transform.position.setValue([
        PyramidFrontBack_precomp.width / 2,
        PyramidFrontBack_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      var Front_FirstNull_pos =
        PyramidFrontBack_precomp.layer(2).transform.position.value;
      var Front_SecondNull_pos =
        PyramidFrontBack_precomp.layer(3).transform.position.value;
      PyramidFrontBack_precomp.layer(2).transform.position.setValue(
        Front_FirstNull_pos + [-PyramidFrontBack_precomp.width / 2, 0],
      );
      PyramidFrontBack_precomp.layer(3).transform.position.setValue(
        Front_SecondNull_pos + [PyramidFrontBack_precomp.width / 2, 0],
      );
      PyramidFrontBack_precomp.parentFolder = MainParentFolder;
      return PyramidFrontBack_precomp;
    }
    function make_Pyramid_Left(name, BaseWidth_X, BaseWidth_Y, PyramidHeight) {
      var opposite = PyramidHeight;
      var adjacent = BaseWidth_X / 2;
      var hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
      var FinalHypotenuse = Math.round(hypotenuse);
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidLeftRightSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        FinalHypotenuse,
        BaseWidth_Y,
        1,
      );
      var newMask = PyramidLeftRightSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidLeftRightSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var masksGroup = PyramidLeftRightSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidLeftRight_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidLeftRight_precomp.width = FinalHypotenuse;
      PyramidLeftRight_precomp.height = BaseWidth_Y;
      curComp.layer(name).threeDLayer = true;
      PyramidLeftRight_precomp.layers[5].transform.position.setValue([
        PyramidLeftRight_precomp.width / 2,
        PyramidLeftRight_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      var Left_FirstNull_pos =
        PyramidLeftRight_precomp.layer(3).transform.position.value;
      var Left_SecondNull_pos =
        PyramidLeftRight_precomp.layer(4).transform.position.value;
      PyramidLeftRight_precomp.layer(3).transform.position.setValue(
        Left_FirstNull_pos + [0, -PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.layer(4).transform.position.setValue(
        Left_SecondNull_pos + [0, PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.parentFolder = MainParentFolder;
      return PyramidLeftRight_precomp;
    }
    function make_Pyramid_Right(name, BaseWidth_X, BaseWidth_Y, PyramidHeight) {
      var opposite = PyramidHeight;
      var adjacent = BaseWidth_X / 2;
      var hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
      var FinalHypotenuse = Math.round(hypotenuse);
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidLeftRightSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        FinalHypotenuse,
        BaseWidth_Y,
        1,
      );
      var newMask = PyramidLeftRightSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidLeftRightSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var masksGroup = PyramidLeftRightSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidLeftRight_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidLeftRight_precomp.width = FinalHypotenuse;
      PyramidLeftRight_precomp.height = BaseWidth_Y;
      curComp.layer(name).threeDLayer = true;
      PyramidLeftRight_precomp.layers[5].transform.position.setValue([
        PyramidLeftRight_precomp.width / 2,
        PyramidLeftRight_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      var Right_FirstNull_pos =
        PyramidLeftRight_precomp.layer(2).transform.position.value;
      var Right_SecondNull_pos =
        PyramidLeftRight_precomp.layer(1).transform.position.value;
      PyramidLeftRight_precomp.layer(2).transform.position.setValue(
        Right_FirstNull_pos + [0, -PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.layer(1).transform.position.setValue(
        Right_SecondNull_pos + [0, PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.parentFolder = MainParentFolder;
      return PyramidLeftRight_precomp;
    }
    function GeneratePyramid(BaseWidth_X, BaseLength_Y, PyramidHeight) {
      app.beginUndoGroup("Execute Code");
      if (app.project.file != null) {
        projectName = app.project.file.name;
      } else {
        projectName = "Untitled";
      }
      ScriptFolderName = "3D-Primitives-Generator-Objects_" + projectName;
      curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var myStr = projectName + "." + "Primitive";
      var maxNum_FacesName = 0;
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (
          app.project.item(i) instanceof CompItem &&
          app.project.item(i).name.indexOf(myStr) == 0
        ) {
          maxNum_FacesName = Math.max(
            maxNum_FacesName,
            parseInt(app.project.item(i).name.split("_")[1], 10),
          );
        }
      }
      var PyramidMainBase = make_Pyramid_Base(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Base",
        BaseWidth_X,
        BaseLength_Y,
      );
      var PyramidMainFront = make_Pyramid_Front(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Front",
        BaseWidth_X,
        BaseLength_Y,
        PyramidHeight,
      );
      moveAnchor(1, 0);
      var PyramidMainBack = make_Pyramid_Back(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Back",
        BaseWidth_X,
        BaseLength_Y,
        PyramidHeight,
      );
      moveAnchor(1, 2);
      var PyramidMainLeft = make_Pyramid_Left(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Left",
        BaseWidth_X,
        BaseLength_Y,
        PyramidHeight,
      );
      moveAnchor(2, 1);
      var PyramidMainRight = make_Pyramid_Right(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Right",
        BaseWidth_X,
        BaseLength_Y,
        PyramidHeight,
      );
      moveAnchor(0, 1);
      var Pyramid_Base = curComp.layer(PyramidMainBase.name);
      var Pyramid_Front = curComp.layer(PyramidMainFront.name);
      var Pyramid_Back = curComp.layer(PyramidMainBack.name);
      var Pyramid_Left = curComp.layer(PyramidMainLeft.name);
      var Pyramid_Right = curComp.layer(PyramidMainRight.name);
      Pyramid_Base.selected = true;
      Pyramid_Front.selected = true;
      Pyramid_Back.selected = true;
      Pyramid_Left.selected = true;
      Pyramid_Right.selected = true;
      var myLayers = [];
      for (var i = 0; i < curComp.selectedLayers.length; i += 1) {
        myLayers.push(curComp.selectedLayers[i].index);
      }
      var Str = projectName + "." + "Primitive";
      var maxNum_PrimitiveName = 0;
      for (var i = 1; i <= curComp.numLayers; i += 1) {
        if (curComp.layer(i).name.indexOf(Str) == 0) {
          maxNum_PrimitiveName = Math.max(
            maxNum_PrimitiveName,
            parseInt(curComp.layer(i).name.split("_")[1], 10),
          );
        }
      }
      var precompIndices = myLayers;
      var precompName = Str + "_" + maxNum_PrimitiveName;
      var precomp = curComp.layers.precompose(
        precompIndices,
        precompName,
        true,
      );
      curComp.layer(precompName).threeDLayer = true;
      curComp.layer(precompName).collapseTransformation = true;
      moveAnchor(1, 1);
      var NullControler = precomp.layers.addSolid(
        [255, 195, 0] / 255,
        precompName + "_" + "Controller",
        60,
        60,
        1,
      );
      NullControler.name = precompName + "_" + "Controller";
      NullControler.source.name = precompName + "_" + "Controller";
      NullControler.label = 11;
      NullControler.enabled = false;
      NullControler.moveToBeginning();
      curComp.layer(precompName).transform.xRotation.setValue(-90);
      curComp
        .layer(precompName)
        .transform.position.setValue([
          curComp.width / 2,
          curComp.height / 2 + PyramidHeight / 2,
        ]);
      var Final_Base_Comp = precomp.layer(6);
      var Final_Front_Comp = precomp.layer(5);
      var Final_Back_Comp = precomp.layer(4);
      var Final_Left_Comp = precomp.layer(3);
      var Final_Right_Comp = precomp.layer(2);
      var PyramidBasePosition = Final_Base_Comp.transform.position.value;
      var PyramidFrontPosition = Final_Front_Comp.transform.position.value;
      var PyramidBackPosition = Final_Back_Comp.transform.position.value;
      var PyramidLeftPosition = Final_Left_Comp.transform.position.value;
      var PyramidRightPosition = Final_Right_Comp.transform.position.value;
      precomp.parentFolder = MainParentFolder;
      Final_Front_Comp.transform.position.setValue(
        PyramidBasePosition + [0, BaseLength_Y / 2, 0],
      );
      Final_Back_Comp.transform.position.setValue(
        PyramidBasePosition - [0, BaseLength_Y / 2, 0],
      );
      Final_Left_Comp.transform.position.setValue(
        PyramidBasePosition - [BaseWidth_X / 2, 0, 0],
      );
      Final_Right_Comp.transform.position.setValue(
        PyramidBasePosition + [BaseWidth_X / 2, 0, 0],
      );
      var F_Angle = 90 - face_angle(PyramidHeight, BaseLength_Y / 2);
      var B_Angle = 90 - face_angle(PyramidHeight, BaseLength_Y / 2);
      var L_Angle = 90 - face_angle(PyramidHeight, BaseWidth_X / 2);
      var R_Angle = 90 - face_angle(PyramidHeight, BaseWidth_X / 2);
      var TaperFBSlider = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Slider Control");
      TaperFBSlider.name = "Taper (Front - Back)";
      TaperFBSlider(1).setValue(B_Angle + 90);
      var TopTaperLRSlider = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Slider Control");
      TopTaperLRSlider.name = "Taper (Right - Left)";
      TopTaperLRSlider(1).setValue(R_Angle + 90);
      var PyramidBaseFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidBaseFillColor.name = "Base Color";
      PyramidBaseFillColor.property("Color").setValue([82, 0, 210, 255] / 255);
      var PyramidFrontFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidFrontFillColor.name = "Front Color";
      PyramidFrontFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var PyramidBackFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidBackFillColor.name = "Back Color";
      PyramidBackFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var PyramidRightFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidRightFillColor.name = "Right Color";
      PyramidRightFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var PyramidLeftFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidLeftFillColor.name = "Left Color";
      PyramidLeftFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var myBaseComp = Get_Comp_By_Name(precomp.layer(6).name);
      myBaseComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Base Color\')(\'Color\')";
      var myFrontComp = Get_Comp_By_Name(precomp.layer(5).name);
      myFrontComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Front Color\')(\'Color\')";
      var myBackComp = Get_Comp_By_Name(precomp.layer(4).name);
      myBackComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Back Color\')(\'Color\')";
      var myLeftComp = Get_Comp_By_Name(precomp.layer(3).name);
      myLeftComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Left Color\')(\'Color\')";
      var myRightComp = Get_Comp_By_Name(precomp.layer(2).name);
      myRightComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Right Color\')(\'Color\')";
      Final_Front_Comp.transform.xRotation.expression =
        "-thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Front - Back)\')(\'ADBE Slider Control-0001\')";
      Final_Back_Comp.transform.xRotation.expression =
        "thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Front - Back)\')(\'ADBE Slider Control-0001\')";
      Final_Right_Comp.transform.yRotation.expression =
        "thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Right - Left)\')(\'ADBE Slider Control-0001\')";
      Final_Left_Comp.transform.yRotation.expression =
        "-thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Right - Left)\')(\'ADBE Slider Control-0001\')";
      app.endUndoGroup();
    }
    function Get_Comp_By_Name(compname) {
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (
          app.project.item(i) instanceof CompItem &&
          app.project.item(i).name === compname
        ) {
          myComp = app.project.item(i);
          break;
        }
      }
      return myComp;
    }
    function make_Prisim_Base(name, Prisim_BaseWidth_X, Prisim_BaseLength_Y) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var BaseSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        Prisim_BaseWidth_X,
        Prisim_BaseLength_Y,
        1,
      );
      var newMask = BaseSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var BaseFillColor =
        BaseSolid.property("ADBE Effect Parade").addProperty("ADBE Fill");
      BaseFillColor.name = "Color";
      BaseFillColor.property("Color").setValue([82, 0, 210, 255] / 255);
      var masksGroup = BaseSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var Base_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      Base_precomp.width = Prisim_BaseWidth_X;
      Base_precomp.height = Prisim_BaseLength_Y;
      curComp.layer(name).threeDLayer = true;
      Base_precomp.layers[5].transform.position.setValue([
        Base_precomp.width / 2,
        Base_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      Base_precomp.parentFolder = MainParentFolder;
      return Base_precomp;
    }
    function make_Prisim_Front(
      name,
      Prisim_BaseWidth_X,
      BaseWidth_Y,
      PrisimHeight,
    ) {
      var opposite = PrisimHeight;
      var adjacent = BaseWidth_Y / 2;
      var hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
      var FinalHypotenuse = Math.round(hypotenuse);
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidFrontBackSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        Prisim_BaseWidth_X,
        FinalHypotenuse,
        1,
      );
      var newMask = PyramidFrontBackSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidFrontBackSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.name = "Color";
      PyramidFrontFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var masksGroup = PyramidFrontBackSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidFrontBack_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidFrontBack_precomp.width = Prisim_BaseWidth_X;
      PyramidFrontBack_precomp.height = FinalHypotenuse;
      curComp.layer(name).threeDLayer = true;
      PyramidFrontBack_precomp.layers[5].transform.position.setValue([
        PyramidFrontBack_precomp.width / 2,
        PyramidFrontBack_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      PyramidFrontBack_precomp.parentFolder = MainParentFolder;
      return PyramidFrontBack_precomp;
    }
    function make_Prisim_Back(
      name,
      Prisim_BaseWidth_X,
      BaseWidth_Y,
      PrisimHeight,
    ) {
      var opposite = PrisimHeight;
      var adjacent = BaseWidth_Y / 2;
      var hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
      var FinalHypotenuse = Math.round(hypotenuse);
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidFrontBackSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        Prisim_BaseWidth_X,
        FinalHypotenuse,
        1,
      );
      var newMask = PyramidFrontBackSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidFrontBackSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.name = "Color";
      PyramidFrontFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var masksGroup = PyramidFrontBackSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidFrontBack_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidFrontBack_precomp.width = Prisim_BaseWidth_X;
      PyramidFrontBack_precomp.height = FinalHypotenuse;
      curComp.layer(name).threeDLayer = true;
      PyramidFrontBack_precomp.layers[5].transform.position.setValue([
        PyramidFrontBack_precomp.width / 2,
        PyramidFrontBack_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      PyramidFrontBack_precomp.parentFolder = MainParentFolder;
      return PyramidFrontBack_precomp;
    }
    function make_Prisim_Left(
      name,
      Prisim_BaseWidth_X,
      BaseWidth_Y,
      PrisimHeight,
    ) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidLeftRightSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        PrisimHeight,
        BaseWidth_Y,
        1,
      );
      var newMask = PyramidLeftRightSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidLeftRightSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.name = "Color";
      PyramidFrontFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var masksGroup = PyramidLeftRightSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidLeftRight_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidLeftRight_precomp.width = PrisimHeight;
      PyramidLeftRight_precomp.height = BaseWidth_Y;
      curComp.layer(name).threeDLayer = true;
      PyramidLeftRight_precomp.layers[5].transform.position.setValue([
        PyramidLeftRight_precomp.width / 2,
        PyramidLeftRight_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      var Left_FirstNull_pos =
        PyramidLeftRight_precomp.layer(3).transform.position.value;
      var Left_SecondNull_pos =
        PyramidLeftRight_precomp.layer(4).transform.position.value;
      PyramidLeftRight_precomp.layer(3).transform.position.setValue(
        Left_FirstNull_pos + [0, -PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.layer(4).transform.position.setValue(
        Left_SecondNull_pos + [0, PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.parentFolder = MainParentFolder;
      return PyramidLeftRight_precomp;
    }
    function mmake_Prisim_Right(
      name,
      Prisim_BaseWidth_X,
      BaseWidth_Y,
      PrisimHeight,
    ) {
      var curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var PyramidLeftRightSolid = curComp.layers.addSolid(
        [255, 255, 255],
        name + "_" + "Solid",
        PrisimHeight,
        BaseWidth_Y,
        1,
      );
      var newMask = PyramidLeftRightSolid.Masks.addProperty("Mask");
      var shape = newMask.property("ADBE Mask Shape");
      var path = shape.value;
      path.closed = true;
      var PyramidFrontFillColor =
        PyramidLeftRightSolid.property("ADBE Effect Parade").addProperty(
          "ADBE Fill",
        );
      PyramidFrontFillColor.name = "Color";
      PyramidFrontFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var masksGroup = PyramidLeftRightSolid("Masks");
      var selectedMasks = new Array();
      if (masksGroup != null) {
        for (var i = 1; i <= masksGroup.numProperties; i += 1) {
          MaskSelectedPsth = masksGroup.property(i).property("Mask Path");
          MaskSelectedPsth.selected = true;
        }
      }
      (function createNullsFromPaths(thisObj) {
        function getActiveComp() {
          var theComp = app.project.activeItem;
          if (theComp == undefined) {
            var errorMsg = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoComp=Error: Please select a composition.",
            );
            alert(errorMsg);
            return null;
          }
          return theComp;
        }
        function getSelectedLayers(targetComp) {
          var targetLayers = targetComp.selectedLayers;
          return targetLayers;
        }
        function createNull(targetComp) {
          return targetComp.layers.addNull();
        }
        function getSelectedProperties(targetLayer) {
          var props = targetLayer.selectedProperties;
          if (props.length < 1) {
            return null;
          }
          return props;
        }
        function forEachLayer(targetLayerArray, doSomething) {
          for (var i = 0, ii = targetLayerArray.length; i < ii; i++) {
            doSomething(targetLayerArray[i]);
          }
        }
        function forEachProperty(targetProps, doSomething) {
          for (var i = 0, ii = targetProps.length; i < ii; i++) {
            doSomething(targetProps[i]);
          }
        }
        function forEachEffect(targetLayer, doSomething) {
          for (
            var i = 1,
              ii = targetLayer.property("ADBE Effect Parade").numProperties;
            i <= ii;
            i++
          ) {
            doSomething(targetLayer.property("ADBE Effect Parade").property(i));
          }
        }
        function matchMatchName(targetEffect, matchNameString) {
          if (
            targetEffect != null &&
            targetEffect.matchName === matchNameString
          ) {
            return targetEffect;
          } else {
            return null;
          }
        }
        function getPropPath(currentProp, pathHierarchy) {
          var pathPath = "";
          while (currentProp.parentProperty !== null) {
            if (
              currentProp.parentProperty.propertyType ===
              PropertyType.INDEXED_GROUP
            ) {
              pathHierarchy.unshift(currentProp.propertyIndex);
              pathPath = "(" + currentProp.propertyIndex + ")" + pathPath;
            } else {
              pathPath =
                '("' + currentProp.matchName.toString() + '")' + pathPath;
            }
            currentProp = currentProp.parentProperty;
          }
          return pathPath;
        }
        function getPathPoints(path) {
          return path.value.vertices;
        }
        function forEachPath(doSomething) {
          var comp = getActiveComp();
          if (comp == null) {
            return;
          }
          var selectedLayers = getSelectedLayers(comp);
          if (selectedLayers == null) {
            return;
          }
          var selectedPaths = [];
          var parentLayers = [];
          forEachLayer(selectedLayers, function (selectedLayer) {
            var paths = getSelectedProperties(selectedLayer);
            if (paths == null) {
              return;
            }
            forEachProperty(paths, function (path) {
              var isShapePath = matchMatchName(path, "ADBE Vector Shape");
              var isMaskPath = matchMatchName(path, "ADBE Mask Shape");
              if (isShapePath != null || isMaskPath != null) {
                selectedPaths.push(path);
                parentLayers.push(selectedLayer);
              }
            });
          });
          if (selectedPaths.length == 0) {
            var pathError = localize(
              "$$$/AE/Script/CreatePathNulls/ErrorNoPathsSelected=Error: No paths selected.",
            );
            alert(pathError);
            return;
          }
          for (var p = 0; p < selectedPaths.length; p += 1) {
            doSomething(comp, parentLayers[p], selectedPaths[p]);
          }
        }
        function linkPointsToNulls() {
          forEachPath(function (comp, selectedLayer, path) {
            var pathHierarchy = [];
            var pathPath = getPropPath(path, pathHierarchy);
            var nullSet = [];
            var pathPoints = getPathPoints(path);
            for (var i = 0, ii = pathPoints.length; i < ii; i++) {
              var nullName =
                selectedLayer.name +
                ": " +
                path.parentProperty.name +
                " [" +
                pathHierarchy.join(".") +
                "." +
                i +
                "]";
              nullSet.push(nullName);
              if (comp.layer(nullName) == undefined) {
                var newNull = createNull(comp);
                newNull.name = nullName;
                newNull.source.name = nullName;
                newNull.transform.position;
                newNull
                  .property("Transform")
                  .property("Scale")
                  .setValue([30, 30]);
                newNull.label = 11;
                newNull.position.setValue(pathPoints[i]);
                newNull.position.expression =
                  'var srcLayer = thisComp.layer("' +
                  selectedLayer.name +
                  '"); \r' +
                  "var srcPath = srcLayer" +
                  pathPath +
                  ".points()[" +
                  i +
                  "]; \r" +
                  "srcLayer.toComp(srcPath);";
                newNull.position.setValue(newNull.position.value);
                newNull.position.expression = "";
                newNull.parent = selectedLayer;
              }
            }
            var existingEffects = [];
            forEachEffect(selectedLayer, function (targetEffect) {
              if (matchMatchName(targetEffect, "ADBE Layer Control") != null) {
                var P_Layer = existingEffects.push(targetEffect.name);
              }
            });
            for (var n = 0; n < nullSet.length; n += 1) {
              if (existingEffects.join("|").indexOf(nullSet[n]) != -1) {
                selectedLayer
                  .property("ADBE Effect Parade")(nullSet[n])
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              } else {
                var newControl = selectedLayer
                  .property("ADBE Effect Parade")
                  .addProperty("ADBE Layer Control");
                newControl.name = nullSet[n];
                newControl
                  .property("ADBE Layer Control-0001")
                  .setValue(comp.layer(nullSet[n]).index);
              }
            }
            path.expression =
              'var nullLayerNames = ["' +
              nullSet.join('","') +
              '"]; \r' +
              "var origPath = thisProperty; \r" +
              "var origPoints = origPath.points(); \r" +
              "var origInTang = origPath.inTangents(); \r" +
              "var origOutTang = origPath.outTangents(); \r" +
              "var getNullLayers = []; \r" +
              "for (var i = 0; i < nullLayerNames.length; i++){ \r" +
              "    try{  \r" +
              '        getNullLayers.push(effect(nullLayerNames[i])("ADBE Layer Control-0001")); \r' +
              "    } catch(err) { \r" +
              "        getNullLayers.push(null); \r" +
              "    }} \r" +
              "for (var i = 0; i < getNullLayers.length; i++){ \r" +
              "    if (getNullLayers[i] != null && getNullLayers[i].index != thisLayer.index){ \r" +
              "        origPoints[i] = fromCompToSurface(getNullLayers[i].toComp(getNullLayers[i].anchorPoint));  \r" +
              "    }} \r" +
              "createPath(origPoints,origInTang,origOutTang,origPath.isClosed());";
          });
        }
        linkPointsToNulls();
      })(this);
      var PyramidLeftRight_precomp = app.project.activeItem.layers.precompose(
        [1, 2, 3, 4, 5],
        name,
        true,
      );
      PyramidLeftRight_precomp.width = PrisimHeight;
      PyramidLeftRight_precomp.height = BaseWidth_Y;
      curComp.layer(name).threeDLayer = true;
      PyramidLeftRight_precomp.layers[5].transform.position.setValue([
        PyramidLeftRight_precomp.width / 2,
        PyramidLeftRight_precomp.height / 2,
        0,
      ]);
      moveAnchor(1, 1);
      var Right_FirstNull_pos =
        PyramidLeftRight_precomp.layer(2).transform.position.value;
      var Right_SecondNull_pos =
        PyramidLeftRight_precomp.layer(1).transform.position.value;
      PyramidLeftRight_precomp.layer(2).transform.position.setValue(
        Right_FirstNull_pos + [0, -PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.layer(1).transform.position.setValue(
        Right_SecondNull_pos + [0, PyramidLeftRight_precomp.height / 2],
      );
      PyramidLeftRight_precomp.parentFolder = MainParentFolder;
      return PyramidLeftRight_precomp;
    }
    function GeneratePrisim(
      Prisim_BaseWidth_X,
      Prisim_BaseLength_Y,
      PrisimHeight,
    ) {
      app.beginUndoGroup("Execute Code");
      if (app.project.file != null) {
        projectName = app.project.file.name;
      } else {
        projectName = "Untitled";
      }
      ScriptFolderName = "3D-Primitives-Generator-Objects_" + projectName;
      curComp = app.project.activeItem;
      var time = app.project.activeItem.time;
      MainParentFolder = getFolderByName(ScriptFolderName);
      var myStr = projectName + "." + "Primitive";
      var maxNum_FacesName = 0;
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (
          app.project.item(i) instanceof CompItem &&
          app.project.item(i).name.indexOf(myStr) == 0
        ) {
          maxNum_FacesName = Math.max(
            maxNum_FacesName,
            parseInt(app.project.item(i).name.split("_")[1], 10),
          );
        }
      }
      var PyramidMainBase = make_Prisim_Base(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Base",
        Prisim_BaseWidth_X,
        Prisim_BaseLength_Y,
      );
      var PyramidMainFront = make_Prisim_Front(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Front",
        Prisim_BaseWidth_X,
        Prisim_BaseLength_Y,
        PrisimHeight,
      );
      moveAnchor(1, 0);
      var PyramidMainBack = make_Prisim_Back(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Back",
        Prisim_BaseWidth_X,
        Prisim_BaseLength_Y,
        PrisimHeight,
      );
      moveAnchor(1, 2);
      var PyramidMainLeft = make_Prisim_Left(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Left",
        Prisim_BaseWidth_X,
        Prisim_BaseLength_Y,
        PrisimHeight,
      );
      moveAnchor(2, 1);
      var PyramidMainRight = mmake_Prisim_Right(
        myStr + "_" + maxNum_FacesName + 1 + "_" + "Right",
        Prisim_BaseWidth_X,
        Prisim_BaseLength_Y,
        PrisimHeight,
      );
      moveAnchor(0, 1);
      var Pyramid_Base = curComp.layer(PyramidMainBase.name);
      var Pyramid_Front = curComp.layer(PyramidMainFront.name);
      var Pyramid_Back = curComp.layer(PyramidMainBack.name);
      var Pyramid_Left = curComp.layer(PyramidMainLeft.name);
      var Pyramid_Right = curComp.layer(PyramidMainRight.name);
      Pyramid_Base.selected = true;
      Pyramid_Front.selected = true;
      Pyramid_Back.selected = true;
      Pyramid_Left.selected = true;
      Pyramid_Right.selected = true;
      var myLayers = [];
      for (var i = 0; i < curComp.selectedLayers.length; i += 1) {
        myLayers.push(curComp.selectedLayers[i].index);
      }
      var Str = projectName + "." + "Primitive";
      var maxNum_PrimitiveName = 0;
      for (var i = 1; i <= curComp.numLayers; i += 1) {
        if (curComp.layer(i).name.indexOf(Str) == 0) {
          maxNum_PrimitiveName = Math.max(
            maxNum_PrimitiveName,
            parseInt(curComp.layer(i).name.split("_")[1], 10),
          );
        }
      }
      var precompIndices = myLayers;
      var precompName = Str + "_" + maxNum_PrimitiveName;
      var precomp = curComp.layers.precompose(
        precompIndices,
        precompName,
        true,
      );
      curComp.layer(precompName).threeDLayer = true;
      curComp.layer(precompName).collapseTransformation = true;
      moveAnchor(1, 1);
      var NullControler = precomp.layers.addSolid(
        [10, 180, 28] / 255,
        precompName + "_" + "Controller",
        60,
        60,
        1,
      );
      NullControler.name = precompName + "_" + "Controller";
      NullControler.source.name = precompName + "_" + "Controller";
      NullControler.label = 9;
      NullControler.enabled = false;
      NullControler.moveToBeginning();
      curComp.layer(precompName).transform.xRotation.setValue(-90);
      curComp
        .layer(precompName)
        .transform.position.setValue([
          curComp.width / 2,
          curComp.height / 2 + PrisimHeight / 2,
        ]);
      var Final_Base_Comp = precomp.layer(6);
      var Final_Front_Comp = precomp.layer(5);
      var Final_Back_Comp = precomp.layer(4);
      var Final_Left_Comp = precomp.layer(3);
      var Final_Right_Comp = precomp.layer(2);
      var PyramidBasePosition = Final_Base_Comp.transform.position.value;
      var PyramidFrontPosition = Final_Front_Comp.transform.position.value;
      var PyramidBackPosition = Final_Back_Comp.transform.position.value;
      var PyramidLeftPosition = Final_Left_Comp.transform.position.value;
      var PyramidRightPosition = Final_Right_Comp.transform.position.value;
      precomp.parentFolder = MainParentFolder;
      Final_Front_Comp.transform.position.setValue(
        PyramidBasePosition + [0, Prisim_BaseLength_Y / 2, 0],
      );
      Final_Back_Comp.transform.position.setValue(
        PyramidBasePosition - [0, Prisim_BaseLength_Y / 2, 0],
      );
      Final_Left_Comp.transform.position.setValue(
        PyramidBasePosition - [Prisim_BaseWidth_X / 2, 0, 0],
      );
      Final_Right_Comp.transform.position.setValue(
        PyramidBasePosition + [Prisim_BaseWidth_X / 2, 0, 0],
      );
      var F_Angle = 90 - face_angle(PrisimHeight, Prisim_BaseLength_Y / 2);
      var B_Angle = 90 - face_angle(PrisimHeight, Prisim_BaseLength_Y / 2);
      var TaperFBSlider = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Slider Control");
      TaperFBSlider.name = "Taper (Front - Back)";
      TaperFBSlider(1).setValue(B_Angle + 90);
      var TopTaperLRSlider = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Slider Control");
      TopTaperLRSlider.name = "Taper (Right - Left)";
      TopTaperLRSlider(1).setValue(90);
      var PyramidBaseFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidBaseFillColor.name = "Base Color";
      PyramidBaseFillColor.property("Color").setValue([82, 0, 210, 255] / 255);
      var PyramidFrontFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidFrontFillColor.name = "Front Color";
      PyramidFrontFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var PyramidBackFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidBackFillColor.name = "Back Color";
      PyramidBackFillColor.property("Color").setValue([38, 0, 100, 255] / 255);
      var PyramidRightFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidRightFillColor.name = "Right Color";
      PyramidRightFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var PyramidLeftFillColor = precomp
        .layer(1)
        .property("ADBE Effect Parade")
        .addProperty("ADBE Color Control");
      PyramidLeftFillColor.name = "Left Color";
      PyramidLeftFillColor.property("Color").setValue([21, 0, 54, 255] / 255);
      var myBaseComp = Get_Comp_By_Name(precomp.layer(6).name);
      myBaseComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Base Color\')(\'Color\')";
      var myFrontComp = Get_Comp_By_Name(precomp.layer(5).name);
      myFrontComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Front Color\')(\'Color\')";
      var myBackComp = Get_Comp_By_Name(precomp.layer(4).name);
      myBackComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Back Color\')(\'Color\')";
      var myLeftComp = Get_Comp_By_Name(precomp.layer(3).name);
      myLeftComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Left Color\')(\'Color\')";
      var myRightComp = Get_Comp_By_Name(precomp.layer(2).name);
      myRightComp.layer(5).property("ADBE Effect Parade").property("ADBE Fill")(
        "Color",
      ).expression =
        "comp(\'" +
        precomp.name +
        "\').layer(\'" +
        NullControler.name +
        "\').effect(\'Right Color\')(\'Color\')";
      Final_Front_Comp.transform.xRotation.expression =
        "-thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Front - Back)\')(\'ADBE Slider Control-0001\')";
      Final_Back_Comp.transform.xRotation.expression =
        "thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Front - Back)\')(\'ADBE Slider Control-0001\')";
      Final_Right_Comp.transform.yRotation.expression =
        "thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Right - Left)\')(\'ADBE Slider Control-0001\')";
      Final_Left_Comp.transform.yRotation.expression =
        "-thisComp.layer(\'" +
        NullControler.name +
        "\').effect(\'Taper (Right - Left)\')(\'ADBE Slider Control-0001\')";
      app.endUndoGroup();
    }
    function face_angle(opposite, adjacent) {
      var hypotenuse = Math.sqrt(opposite * opposite + adjacent * adjacent);
      var HypoAngle = opposite / hypotenuse;
      var HypoAngle_result = Math.asin(HypoAngle);
      var HypoAngle_result_inDegrees = (HypoAngle_result * 180) / Math.PI;
      var HypoAngle_result_Final = Number(
        HypoAngle_result_inDegrees.toPrecision(4),
      );
      return HypoAngle_result_Final;
    }
    function moveAnchor(row, col, ignoreMasks, cust1, cust2) {
      var curTime = app.project.activeItem.time;
      var theLayers = app.project.activeItem.selectedLayers;
      if (theLayers.length == 0) {
        alert("You do not have any layers selected");
        return;
      }
      for (var num = 0; num < theLayers.length; num += 1) {
        var theLayer = theLayers[num];
        if (theLayer instanceof CameraLayer) {
          if (theLayers.length == 1) {
            alert(
              "Move Anchor Point will not change the anchor point of a camera",
            );
          }
          continue;
        }
        var noMasks = true;
        if (ignoreMasks == true) {
          noMasks = true;
        } else {
          if (theLayer.mask.numProperties != 0) {
            for (var i = 1; i <= theLayer.mask.numProperties; i += 1) {
              if (theLayer.mask(i).maskMode != MaskMode.NONE) {
                noMasks = false;
              }
            }
          }
        }
        if (noMasks) {
          switch (row) {
            case 0:
              var x = 0;
              break;
            case 1:
              var x = theLayer.sourceRectAtTime(curTime, false).width / 2;
              break;
            case 2:
              var x = theLayer.sourceRectAtTime(curTime, false).width;
              break;
            case 3:
              var x = theLayer.sourceRectAtTime(curTime, false).width * cust1;
              break;
            default:
          }
          switch (col) {
            case 0:
              var y = 0;
              break;
            case 1:
              var y = theLayer.sourceRectAtTime(curTime, false).height / 2;
              break;
            case 2:
              var y = theLayer.sourceRectAtTime(curTime, false).height;
              break;
            case 3:
              var y = theLayer.sourceRectAtTime(curTime, false).height * cust2;
              break;
            default:
          }
          if (theLayer instanceof TextLayer || theLayer instanceof ShapeLayer) {
            x += theLayer.sourceRectAtTime(curTime, false).left;
            y += theLayer.sourceRectAtTime(curTime, false).top;
          }
        } else {
          var xBounds = Array();
          var yBounds = Array();
          var numMasks = theLayer.mask.numProperties;
          for (var i = 1; i <= numMasks; i += 1) {
            var numVerts = theLayer.mask(i).maskShape.value.vertices.length;
            if (theLayer.mask(i).maskMode == MaskMode.NONE) {
              continue;
            }
            for (var j = 0; j < numVerts; j += 1) {
              var curVerts = theLayer
                .mask(i)
                .maskShape.valueAtTime(curTime, false).vertices[j];
              xBounds.push(curVerts[0]);
              yBounds.push(curVerts[1]);
            }
          }
          xBounds.sort(function (a, b) {
            return a - b;
          });
          yBounds.sort(function (a, b) {
            return a - b;
          });
          var xl = xBounds.shift();
          var xh = xBounds.pop();
          var yl = yBounds.shift();
          var yh = yBounds.pop();
          if (theLayer instanceof TextLayer || theLayer instanceof ShapeLayer) {
            var xl2 = theLayer.sourceRectAtTime(curTime, false).left;
            var xh2 = xl2 + theLayer.sourceRectAtTime(curTime, false).width;
            var yl2 = theLayer.sourceRectAtTime(curTime, false).top;
            var yh2 = yl2 + theLayer.sourceRectAtTime(curTime, false).height;
            if (xl < xl2) {
              xl = xl2;
            }
            if (xh > xh2) {
              xh = xh2;
            }
            if (yl < yl2) {
              yl = yl2;
            }
            if (yh > yh2) {
              yh = yh2;
            }
          }
          switch (row) {
            case 0:
              var x = xl;
              break;
            case 1:
              var x = xl + (xh - xl) / 2;
              break;
            case 2:
              var x = xh;
              break;
            case 3:
              var x = xl + (xh - xl) * cust1;
              break;
            default:
          }
          switch (col) {
            case 0:
              var y = yl;
              break;
            case 1:
              var y = yl + (yh - yl) / 2;
              break;
            case 2:
              var y = yh;
              break;
            case 3:
              var y = yl + (yh - yl) * cust2;
              break;
            default:
          }
        }
        if (theLayer.anchorPoint.isTimeVarying) {
          theComp = app.project.activeItem;
          theLayer.anchorPoint.setValueAtTime(theComp.time, [x, y]);
        } else {
          var curAnchor = theLayer.anchorPoint.value;
          var xMove = (x - curAnchor[0]) * (theLayer.scale.value[0] / 100);
          var yMove = (y - curAnchor[1]) * (theLayer.scale.value[1] / 100);
          var posEx = false;
          if (theLayer.position.expressionEnabled) {
            theLayer.position.expressionEnabled = false;
            posEx = true;
          }
          var dupLayer = theLayer.duplicate();
          var oldParent = theLayer.parent;
          dupLayer.moveToEnd();
          if (dupLayer.scale.isTimeVarying) {
            dupLayer.scale.setValueAtTime(
              app.project.activeItem.time,
              [100, 100],
            );
          } else {
            dupLayer.scale.setValue([100, 100]);
          }
          theLayer.parent = dupLayer;
          theLayer.anchorPoint.setValue([x, y]);
          if (theLayer.position.isTimeVarying) {
            var numKeys = theLayer.position.numKeys;
            for (var k = 1; k <= numKeys; k += 1) {
              var curPos = theLayer.position.keyValue(k);
              curPos[0] += xMove;
              curPos[1] += yMove;
              theLayer.position.setValueAtKey(k, curPos);
            }
          } else {
            var curPos = theLayer.position.value;
            theLayer.position.setValue([
              curPos[0] + xMove,
              curPos[1] + yMove,
              curPos[2],
            ]);
          }
          theLayer.parent = oldParent;
          if (posEx) {
            theLayer.position.expressionEnabled = true;
          }
          dupLayer.remove();
        }
      }
    }
    var cube_main_btn_img = __BLOB__BLOB_000003__;
    var cylinder_main_btn_img = __BLOB__BLOB_000004__;
    var pyramid_main_btn_img = __BLOB__BLOB_000005__;
    var prisim_main_btn_img = __BLOB__BLOB_000006__;
    var settings_main_btn_img = __BLOB__BLOB_000007__;
    var ScriptFolderName = "";
    var Front_Str = "FromFacesPrimitive_Front";
    var Back_Str = "FromFacesPrimitive_Back";
    var Left_Str = "FromFacesPrimitive_Left";
    var Right_Str = "FromFacesPrimitive_Right";
    var Top_Str = "FromFacesPrimitive_Top";
    var Down_Str = "FromFacesPrimitive_Down";
    var TopTaperPseudoEffect = {
      matchName: "Pseudo/3DPrimitiveControlsTop",
      presetBinary: [__BLOB__BLOB_000008__],
      presetName: "3D Primitives Generator - Top Taper.ffx",
    };
    var DownTaperPseudoEffect = {
      matchName: "Pseudo/3DPrimitiveControlsDown",
      presetBinary: [__BLOB__BLOB_000009__],
      presetName: "3D Primitives Generator - Down Taper.ffx",
    };
    var V_SPRITES = 3;
    var CC_FLAG = 9 <= parseFloat(app.version);
    var FIX_OFFSET = CC_FLAG ? 0 : 1;
    Image.prototype.refresh = CC_FLAG
      ? function () {
          var wh = this.size;
          this.size = [1 + wh[0], 1 + wh[1]];
          this.size = [wh[0], wh[1]];
          wh = null;
        }
      : function () {
          this.size = [this.size[0], this.size[1]];
        };
    var cube_generate_btn_img = __BLOB__BLOB_000010__;
    var cube_generate_faces_btn_img = __BLOB__BLOB_000011__;
    var CubePalette = new Window("window", undefined, undefined, {
      closeButton: false,
    });
    CubePalette.text = "Cube";
    CubePalette.orientation = "column";
    CubePalette.alignChildren = ["center", "top"];
    CubePalette.spacing = 10;
    CubePalette.margins = 16;
    var grp_fromValues = CubePalette.add("group", undefined, {
      name: "grp_fromValues",
    });
    grp_fromValues.orientation = "row";
    grp_fromValues.alignChildren = ["center", "bottom"];
    grp_fromValues.spacing = 10;
    grp_fromValues.margins = 0;
    var pnl_CubeDimensions = grp_fromValues.add("panel", undefined, undefined, {
      name: "pnl_CubeDimensions",
    });
    pnl_CubeDimensions.text = "Values";
    pnl_CubeDimensions.orientation = "row";
    pnl_CubeDimensions.alignChildren = ["center", "center"];
    pnl_CubeDimensions.spacing = 5;
    pnl_CubeDimensions.margins = [5, 10, 5, 5];
    var grpXYZ = pnl_CubeDimensions.add("group", undefined, { name: "grpXYZ" });
    grpXYZ.orientation = "column";
    grpXYZ.alignChildren = ["center", "center"];
    grpXYZ.spacing = 10;
    grpXYZ.margins = 0;
    var Static_X = grpXYZ.add("statictext", undefined, undefined, {
      name: "Static_X",
    });
    Static_X.text = "X-";
    var Static_Y = grpXYZ.add("statictext", undefined, undefined, {
      name: "Static_Y",
    });
    Static_Y.text = "Y-";
    var Static_Z = grpXYZ.add("statictext", undefined, undefined, {
      name: "Static_Z",
    });
    Static_Z.text = "Z-";
    var grpTextXYZ = pnl_CubeDimensions.add("group", undefined, {
      name: "grpTextXYZ",
    });
    grpTextXYZ.orientation = "column";
    grpTextXYZ.alignChildren = ["center", "center"];
    grpTextXYZ.spacing = 5;
    grpTextXYZ.margins = 0;
    var EditText_X = grpTextXYZ.add(
      'edittext {properties: {name: "EditText_X"}}',
    );
    EditText_X.preferredSize.width = 40;
    var EditText_Y = grpTextXYZ.add(
      'edittext {properties: {name: "EditText_Y"}}',
    );
    EditText_Y.preferredSize.width = 40;
    var EditText_Z = grpTextXYZ.add(
      'edittext {properties: {name: "EditText_Z"}}',
    );
    EditText_Z.preferredSize.width = 40;
    var pnl_CubeTaper = grp_fromValues.add("panel", undefined, undefined, {
      name: "pnl_CubeTaper",
    });
    pnl_CubeTaper.text = "Taper";
    pnl_CubeTaper.preferredSize.height = 108;
    pnl_CubeTaper.orientation = "column";
    pnl_CubeTaper.alignChildren = ["left", "center"];
    pnl_CubeTaper.spacing = 15;
    pnl_CubeTaper.margins = [5, 10, 5, 5];
    var RadioTaper_Top = pnl_CubeTaper.add(
      "radiobutton",
      undefined,
      undefined,
      { name: "RadioTaper_Top" },
    );
    RadioTaper_Top.text = "Top";
    RadioTaper_Top.value = true;
    var RadioTaper_Down = pnl_CubeTaper.add(
      "radiobutton",
      undefined,
      undefined,
      { name: "RadioTaper_Down" },
    );
    RadioTaper_Down.text = "Down";
    var btn_GenerateCube_FromValues = grp_fromValues.add(
      "image",
      undefined,
      cube_generate_btn_img,
      { state: 0 },
    );
    CFV_iSize = btn_GenerateCube_FromValues.image.size;
    CFV_spriteHeight = CFV_iSize[1] / V_SPRITES;
    btn_GenerateCube_FromValues.size = [CFV_iSize[0], CFV_spriteHeight];
    btn_GenerateCube_FromValues.onDraw = function () {
      var dy = this.properties.state * CFV_spriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_GenerateCube_FromValues.addEventListener(
      "mouseover",
      mouseEventHandler,
    );
    btn_GenerateCube_FromValues.addEventListener(
      "mousedown",
      mouseEventHandler,
    );
    btn_GenerateCube_FromValues.addEventListener("mouseup", mouseEventHandler);
    btn_GenerateCube_FromValues.addEventListener("mouseout", mouseEventHandler);
    var CubeDivider = CubePalette.add("panel", undefined, undefined, {
      name: "CubeDivider",
    });
    CubeDivider.alignment = "fill";
    var grp_fromFaces = CubePalette.add("group", undefined, {
      name: "grp_fromFaces",
    });
    grp_fromFaces.orientation = "row";
    grp_fromFaces.alignChildren = ["center", "center"];
    grp_fromFaces.spacing = 5;
    grp_fromFaces.margins = 0;
    var grp_fromFacesBtnsMain = grp_fromFaces.add("group", undefined, {
      name: "grp_fromFacesBtnsMain",
    });
    grp_fromFacesBtnsMain.orientation = "column";
    grp_fromFacesBtnsMain.alignChildren = ["center", "center"];
    grp_fromFacesBtnsMain.spacing = 10;
    grp_fromFacesBtnsMain.margins = 0;
    var grp_fromFacesBtns = grp_fromFacesBtnsMain.add("group", undefined, {
      name: "grp_fromFacesBtns",
    });
    grp_fromFacesBtns.orientation = "row";
    grp_fromFacesBtns.alignChildren = ["center", "center"];
    grp_fromFacesBtns.spacing = 10;
    grp_fromFacesBtns.margins = 0;
    var btn_rename_F = grp_fromFacesBtns.add("button", undefined, undefined, {
      name: "btn_rename_F",
    });
    btn_rename_F.text = "F";
    btn_rename_F.preferredSize.width = 30;
    btn_rename_F.preferredSize.height = 30;
    var btn_rename_B = grp_fromFacesBtns.add("button", undefined, undefined, {
      name: "btn_rename_B",
    });
    btn_rename_B.text = "B";
    btn_rename_B.preferredSize.width = 30;
    btn_rename_B.preferredSize.height = 30;
    var btn_rename_L = grp_fromFacesBtns.add("button", undefined, undefined, {
      name: "btn_rename_L",
    });
    btn_rename_L.text = "L";
    btn_rename_L.preferredSize.width = 30;
    btn_rename_L.preferredSize.height = 30;
    var btn_rename_R = grp_fromFacesBtns.add("button", undefined, undefined, {
      name: "btn_rename_R",
    });
    btn_rename_R.text = "R";
    btn_rename_R.preferredSize.width = 30;
    btn_rename_R.preferredSize.height = 30;
    var btn_rename_T = grp_fromFacesBtns.add("button", undefined, undefined, {
      name: "btn_rename_T",
    });
    btn_rename_T.text = "T";
    btn_rename_T.preferredSize.width = 30;
    btn_rename_T.preferredSize.height = 30;
    var btn_rename_D = grp_fromFacesBtns.add("button", undefined, undefined, {
      name: "btn_rename_D",
    });
    btn_rename_D.text = "D";
    btn_rename_D.preferredSize.width = 30;
    btn_rename_D.preferredSize.height = 30;
    var grp_FromFacesButton = grp_fromFacesBtnsMain.add("group", undefined, {
      name: "grp_FromFacesButton",
    });
    grp_FromFacesButton.orientation = "row";
    grp_FromFacesButton.alignChildren = ["center", "center"];
    grp_FromFacesButton.spacing = 5;
    grp_FromFacesButton.margins = 0;
    var btn_GenerateCube_FromFaces = grp_FromFacesButton.add(
      "image",
      undefined,
      cube_generate_faces_btn_img,
      { state: 0 },
    );
    CFF_iSize = btn_GenerateCube_FromFaces.image.size;
    CFF_spriteHeight = CFF_iSize[1] / V_SPRITES;
    btn_GenerateCube_FromFaces.size = [CFF_iSize[0], CFF_spriteHeight];
    btn_GenerateCube_FromFaces.onDraw = function () {
      var dy = this.properties.state * CFF_spriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_GenerateCube_FromFaces.addEventListener("mouseover", mouseEventHandler);
    btn_GenerateCube_FromFaces.addEventListener("mousedown", mouseEventHandler);
    btn_GenerateCube_FromFaces.addEventListener("mouseup", mouseEventHandler);
    btn_GenerateCube_FromFaces.addEventListener("mouseout", mouseEventHandler);
    var grpCloseCube = grp_fromFacesBtnsMain.add("group", undefined, {
      name: "grpCloseCube",
    });
    grpCloseCube.orientation = "row";
    grpCloseCube.alignChildren = ["right", "center"];
    grpCloseCube.spacing = 10;
    grpCloseCube.margins = 0;
    grpCloseCube.alignment = ["fill", "center"];
    var btnCubePalette_Close_imgString =
      "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%05%C3%B1iTXtXML%3Acom.adobe.xmp%00%00%00%00%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%206.0-c003%2079.164527%2C%202020%2F10%2F15-17%3A48%3A32%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aphotoshop%3D%22http%3A%2F%2Fns.adobe.com%2Fphotoshop%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstEvt%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceEvent%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20xmp%3ACreateDate%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20xmp%3AModifyDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20xmp%3AMetadataDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20dc%3Aformat%3D%22image%2Fpng%22%20photoshop%3AColorMode%3D%223%22%20photoshop%3AICCProfile%3D%22sRGB%20IEC61966-2.1%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20xmpMM%3ADocumentID%3D%22adobe%3Adocid%3Aphotoshop%3Ae647bfcd-bf8e-fc43-a92b-3660168a95c7%22%20xmpMM%3AOriginalDocumentID%3D%22xmp.did%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%3E%20%3CxmpMM%3AHistory%3E%20%3Crdf%3ASeq%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22created%22%20stEvt%3AinstanceID%3D%22xmp.iid%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%20stEvt%3Awhen%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20stEvt%3Awhen%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3C%2Frdf%3ASeq%3E%20%3C%2FxmpMM%3AHistory%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%2FgF%2B%00%00%03%C3%8AIDATH%C2%89%C3%A5%C2%97%C3%8FkTW%14%C3%87%3F%C3%B7%C2%BD%C2%B9%C3%B3%23A%26%03%C3%85%C3%A0%2C%C2%8A)%C3%8E%26%24%C2%A8t%16%01%C2%8D4M%C3%A8%0F%C2%B5%10%C2%AC%C2%A5%C3%BD%03%C2%84%2C%C2%8A%10%C2%95bE%C3%90%C2%AC%22%C2%A4hEa%10%05W%C2%82%5D4%C2%A4%C2%9B%20%C3%92%C3%98RQ%C2%A1%12%03%C2%A2%01%13%C3%9B%C2%85%14%C2%8B%1B%11%C2%84L%C3%A2%C2%BC7%C3%B7vq%C3%B3%C3%A6%C2%BE%C3%A4%C2%BD7%0E%C3%99%C2%B8%C3%A8%C2%81%07%C3%B3%C3%8E9%C3%B7~%C2%BF%C3%A7%C3%97%C2%BDo%C2%84%C3%96%C2%9Aw!%C3%8E%3BA%05R%C2%8D_BX%C3%AD%C2%B6m%C3%90%C3%93%03%C2%BEo%C2%9Ft%C3%BA%03%C2%B4%C3%BE%1C%C3%A8%07z%C2%80%22%20%C2%80%7F%C2%81y%C3%A0%0EB%C3%9C%C2%A4V%5B%40%08%C3%88d%C3%80uaa%01%C2%9E%3C%C2%B1%7B%C2%AFf%C3%98%02\'%C2%89%10%1F%C3%A2%C2%BA%C3%9F%C2%A1%C3%B5%C3%97%09%1E%1D%407%C3%B0%15%00%C2%AE%C3%BB%0B%C2%8E%C3%B3%03Z%C3%9Fk%C2%B6m%7C%C2%AA%C2%B5%0E%C2%98%C2%8D%01%C2%B38N%12ht%C2%9D%C3%A3%0C%23%C3%84%5D%C3%A0LC%C3%972%C2%B0R%C2%90%C3%89%C3%BC%C2%8CR%C2%A7%5B%02%C2%8C%23%C2%A0%C3%B5%C3%B7%C2%A4%C3%937P*%C3%96%C3%85%C2%A6z%C3%87%0EpVy%C2%B4%C2%B5M%C3%B1%C3%A6%C3%8Dp%12%C3%9B%C2%96%C3%81k%C2%B5%C3%8F%C3%98%C2%B2e%C2%86M%C2%9B%C2%86%00%C3%82%24%2Cpo%C2%AFi0%C3%8F%3BM%C2%B5%3A%C3%8C%C3%8A%C2%8A%25%C2%B2QYY%C2%81%C2%8E%C2%8EA%C2%8A%C3%85%C3%B3H9%1A6%C2%89%C3%86%1C%0F%0E%C2%82%C2%94%25%5Cw%11%C2%A5%C3%96vy%2B%C2%A2u%C3%BC%C2%9A%40%C2%AFT%2F%C2%9E%C3%B7%C2%98%5B%C2%B7%C2%80p%C2%8D%3D%0F%3C%C3%AF%C2%BC%C2%A1%23%C2%A2%C2%8B%C2%A54c%26%C2%A5%C2%B1%07%0D(%C2%84%C3%91uu%11KX%08%C3%B3%C3%B8%C3%BE%25%3C%C2%AF%C2%A1%C2%B6%C3%80%C3%B9%7C%C2%91lvol3%C2%B8%C2%AE)%C3%85%C2%85%0B06fJ%C3%A0%C2%BA%C2%96%C3%94%C3%A8(T*04%04%C3%B5zt%C2%BDi%C3%96%5D%C3%A4%C3%B3%C2%A5(%C2%B0%C3%AF%7F%C2%99%C2%98.)%C3%A1%C3%B8q%C3%B3%7B%C3%A7N%18%19%C2%81%C3%B6v%C3%88f%C3%A1%C3%90!%18%180%C2%B6c%C3%87%C3%A2%C2%81%C2%83%0C%C3%95%C3%AB%C3%9FD%C2%81%C2%85%C3%B8(%C2%BAbU%C3%AAu8w%C3%8E%C2%BE%C3%AF%C3%9F%0F%7D%7Dp%C3%B0%20%1C8%60%C3%B5%17%2F%C2%BE%C2%AD!%1B%18%C2%B6%C2%B9%C3%B6%C3%AD%5BD%C3%ABR%C2%AC%C2%BBR%26%C3%82%C3%AD%C3%9B%C3%A1%C3%94%C2%A9%C3%B8-O%C2%9C%C2%80%C3%B9yC2i%0C%C2%85%C3%B8%C2%87%C3%A9%C3%A9%C3%B7!%1C%C2%B1%C3%96%C3%85D%C2%9E%C2%8E%03KK%C3%B0%C3%A8%11%1C%3E%0C%C2%B5%C2%9A%C2%B5%C3%B9%3E%C2%9C%3C%09O%C2%9F%1A%7D%C2%B3%C3%99%C3%97%C2%BA%C3%90%C3%982%C3%99%2BF%C2%96%C2%97a%C3%AB%C3%96%C2%B5%C3%A9%0C%C3%AA%C3%97%C3%9A%C3%B85%C2%9C%C3%825~%C2%91%C3%88V)hk%C2%83%C3%AEn%C3%93%40%C2%A9%C3%90%C3%9D%C3%A2%C2%BA0%3E%0E%C2%A5%C2%92%C2%B9%C2%91%C2%9A%11%10%C3%A2U%14%C3%98%5Cm%C3%B1%22%C2%A5%C2%A9%C3%AF%C3%84%C2%84%C3%95%C2%9D%3D%0B%C3%97%C2%AE%C3%99%C3%B7%C3%B1q%C3%98%C2%B3%C3%87%C2%A4%3EY%C3%BE%C2%8E%02%2B%C3%B5%7B%22%C3%9Bt%C3%9A%C3%8Cj%20SSp%C3%BF%3E%5C%C2%BF%0E%C2%93%C2%93V%7F%C3%A4H%C3%BC8%05%C2%A2%C3%B5%1FQ%C3%A0Tj%12%C3%87%C2%89o%0E%C3%8F%C2%833%C3%A6%C2%96cn%0E%C2%AE%5E%C2%85j%C3%95%C3%B8%5E%C2%B9%0233%C3%86V%C2%A9%C3%98%C2%83e-%C2%A0%C3%A9%C2%8BT%C3%AA%C2%A7%40e%C3%87%C2%A9%C2%BF%1F%C3%92%C3%A9%19%C2%B2%C3%99%C3%81%08%C2%B89yLc%3D%7Bf%C3%92%19Df6%C2%84%C3%8D%C2%9B%C2%8DM%C3%8A(y%C3%87%C2%81%C3%A5%C3%A5%07x%5E%C2%99%C3%9B%C2%B7%C3%97E%2C%25H9%C3%9A%C3%A8%C3%92%C3%B5%0B%3D%C3%8F%C2%8ELp%26%07%C2%BE%C2%BE%0F%C3%8F%C2%9F%1B%02%C3%AB%C3%97%06%C3%AF%C2%A9%C3%94H%C2%B8)-pg\'%14%0A%C2%8F%C3%89%C3%A5%26%C3%88fI%C2%BA%C3%80c%C2%A5%C3%994d2%C2%90%C3%8B%5D%C2%A6Px%40gg%C3%83dS%5D.%C2%9B%C3%88%C2%84%C2%80%5C%C3%AEW%C3%B2%C3%B9%C2%A1%C3%B0m%C2%B2!%C2%91%12%5E%C2%BF%C3%BE%C2%93j%C2%B5%0F%C2%AD%0D%C2%91%C3%99%C3%99u%C3%80%C3%A1%C2%8E%C3%AE%C3%AA%C2%82r%C3%B9%26KK%C2%9Fl%C3%B8%2BD%08ho%C2%BF%C3%8B%C3%83%C2%87%03%2C.%C3%9A%08V%C3%B7%C2%8B%3F%C2%B9LM%3FE%C2%88%1F7%0C%0A%15%3Co7%10%C2%9B%C2%B6x%C3%A0%20z!%C2%8E%02%C2%BBP%C3%AAF%C3%8B%C2%80J%C3%BD%C2%86R%1F%23%C3%84%C2%B7%C3%8D%C2%8E%C3%92%C2%B7%7FWk%7D%0F%C2%AD%C3%B7%22D%2FZ%7F%01%C3%AC%06J%C3%80%7B%C2%98%C2%B3%C3%B7%25%C3%B0%17p%07%C2%98%C2%A6%5E%C2%9FC%C2%88%C2%B5%C3%87j%1C%C3%87%C3%BF%C3%9D%7F%C2%A7%C3%BF%00%60%22nX%C2%95MM%C3%9B%00%00%00%00IEND%C2%AEB%60%C2%82";
    var btnCubePalette_Close = grpCloseCube.add(
      "iconbutton",
      undefined,
      File.decode(btnCubePalette_Close_imgString),
      { name: "btnCubePalette_Close", style: "toolbutton" },
    );
    btnCubePalette_Close.onClick = function () {
      CubePalette.hide();
      CubePalette.close();
    };
    btn_GenerateCube_FromValues.addEventListener("click", function () {
      if (isSecurityPrefSet()) {
        if (
          app.project.activeItem == null ||
          !(app.project.activeItem instanceof CompItem)
        ) {
          alert("Please select a composition.");
          return false;
        }
        Cube_Main_X = parseInt(EditText_X.text);
        Cube_Main_Z = parseInt(EditText_Z.text);
        Cube_Main_Y = parseInt(EditText_Y.text);
        if (!isNaN(Cube_Main_X) && !isNaN(Cube_Main_Z) && !isNaN(Cube_Main_Y)) {
          if (Cube_Main_X == 0 || Cube_Main_Z == 0 || Cube_Main_Y == 0) {
            alert("Please enter a valid numaric values (Not Zero!).");
          } else {
            GenerateCube();
          }
        } else {
          alert("Please enter a valid numaric values (Not Zero!).");
        }
      } else {
        var appVersion = parseFloat(app.version);
        if (appVersion >= 16.1) {
          tabName = "Scripting & Expressions";
        } else {
          tabName = "General";
        }
        alert(
          (message =
            '3D primitives Generator requires access to write files.\nGo to the "' +
            tabName +
            '" panel of the application preferences and make sure ' +
            '"Allow Scripts to Write Files and Access Network" is checked.'),
        );
      }
    });
    btn_GenerateCube_FromFaces.addEventListener("click", function () {
      if (isSecurityPrefSet()) {
        if (
          app.project.activeItem == null ||
          !(app.project.activeItem instanceof CompItem)
        ) {
          alert("Please select a composition.");
          return false;
        }
        var ftTb_MyComp = app.project.activeItem;
        if (ftTb_MyComp.selectedLayers.length == 6) {
          var FrontCount = 0;
          var BackCount = 0;
          var LeftCount = 0;
          var RightCount = 0;
          var TopCount = 0;
          var DownCount = 0;
          for (var i = 0; i < ftTb_MyComp.selectedLayers.length; i += 1) {
            ftTb_currentLayer = ftTb_MyComp.selectedLayers[i];
            if (ftTb_currentLayer.name.indexOf(Front_Str) == 0) {
              From_Faces_Front_Layer = ftTb_currentLayer;
              FrontCount++;
            } else if (ftTb_currentLayer.name.indexOf(Back_Str) == 0) {
              From_Faces_Back_Layer = ftTb_currentLayer;
              BackCount++;
            } else if (ftTb_currentLayer.name.indexOf(Left_Str) == 0) {
              From_Faces_Left_Layer = ftTb_currentLayer;
              LeftCount++;
            } else if (ftTb_currentLayer.name.indexOf(Right_Str) == 0) {
              From_Faces_Right_Layer = ftTb_currentLayer;
              RightCount++;
            } else if (ftTb_currentLayer.name.indexOf(Top_Str) == 0) {
              From_Faces_Top_Layer = ftTb_currentLayer;
              TopCount++;
            } else if (ftTb_currentLayer.name.indexOf(Down_Str) == 0) {
              From_Faces_Down_Layer = ftTb_currentLayer;
              DownCount++;
            } else {
              alert("Not a proper layers naming");
              return;
            }
          }
          if (
            FrontCount != 0 &&
            BackCount != 0 &&
            LeftCount != 0 &&
            RightCount != 0 &&
            TopCount != 0 &&
            DownCount != 0
          ) {
            if (
              From_Faces_Front_Layer.name.indexOf(Front_Str) == 0 &&
              From_Faces_Back_Layer.name.indexOf(Back_Str) == 0 &&
              From_Faces_Left_Layer.name.indexOf(Left_Str) == 0 &&
              From_Faces_Right_Layer.name.indexOf(Right_Str) == 0 &&
              From_Faces_Top_Layer.name.indexOf(Top_Str) == 0 &&
              From_Faces_Down_Layer.name.indexOf(Down_Str) == 0
            ) {
              app.beginUndoGroup("Make 3d Layers");
              From_Faces_Front_Layer.threeDLayer = true;
              From_Faces_Back_Layer.threeDLayer = true;
              From_Faces_Left_Layer.threeDLayer = true;
              From_Faces_Right_Layer.threeDLayer = true;
              From_Faces_Top_Layer.threeDLayer = true;
              From_Faces_Down_Layer.threeDLayer = true;
              app.endUndoGroup();
              GenerateCubeFromFaces();
            } else {
              alert(
                "One or more of the selected layers is not a Primitive Face.\nPlease rename each layer properly using the letters buttons.\nF : Front - B : Back - L : Left - R : Right - T : Top - D : Down",
              );
            }
          } else {
            alert("Not a proper layers naming");
          }
        } else {
          alert("Please select 6 layers (Cube Faces)");
        }
      } else {
        var appVersion = parseFloat(app.version);
        if (appVersion >= 16.1) {
          tabName = "Scripting & Expressions";
        } else {
          tabName = "General";
        }
        alert(
          (message =
            '3D primitives Generator requires access to write files.\nGo to the "' +
            tabName +
            '" panel of the application preferences and make sure ' +
            '"Allow Scripts to Write Files and Access Network" is checked.'),
        );
      }
    });
    btn_rename_F.onClick = function () {
      app.beginUndoGroup("Execute Code");
      var ftTb_MyComp = app.project.activeItem;
      if (ftTb_MyComp.selectedLayers.length >= 1) {
        for (var i = 0; i < ftTb_MyComp.selectedLayers.length; i += 1) {
          var ftTb_currentLayer = ftTb_MyComp.selectedLayers[i];
          ftTb_currentLayer.name =
            "FromFacesPrimitive_Front$-." + ftTb_currentLayer.name;
        }
      } else {
        alert("Please select at least one Layer");
      }
      app.endUndoGroup();
    };
    btn_rename_B.onClick = function () {
      app.beginUndoGroup("Execute Code");
      var ftTb_MyComp = app.project.activeItem;
      if (ftTb_MyComp.selectedLayers.length >= 1) {
        for (var i = 0; i < ftTb_MyComp.selectedLayers.length; i += 1) {
          var ftTb_currentLayer = ftTb_MyComp.selectedLayers[i];
          ftTb_currentLayer.name =
            "FromFacesPrimitive_Back$-." + ftTb_currentLayer.name;
        }
      } else {
        alert("Please select at least one Layer");
      }
      app.endUndoGroup();
    };
    btn_rename_L.onClick = function () {
      app.beginUndoGroup("Execute Code");
      var ftTb_MyComp = app.project.activeItem;
      if (ftTb_MyComp.selectedLayers.length >= 1) {
        for (var i = 0; i < ftTb_MyComp.selectedLayers.length; i += 1) {
          var ftTb_currentLayer = ftTb_MyComp.selectedLayers[i];
          ftTb_currentLayer.name =
            "FromFacesPrimitive_Left$-." + ftTb_currentLayer.name;
        }
      } else {
        alert("Please select at least one Layer");
      }
      app.endUndoGroup();
    };
    btn_rename_R.onClick = function () {
      app.beginUndoGroup("Execute Code");
      var ftTb_MyComp = app.project.activeItem;
      if (ftTb_MyComp.selectedLayers.length >= 1) {
        for (var i = 0; i < ftTb_MyComp.selectedLayers.length; i += 1) {
          var ftTb_currentLayer = ftTb_MyComp.selectedLayers[i];
          ftTb_currentLayer.name =
            "FromFacesPrimitive_Right$-." + ftTb_currentLayer.name;
        }
      } else {
        alert("Please select at least one Layer");
      }
      app.endUndoGroup();
    };
    btn_rename_T.onClick = function () {
      app.beginUndoGroup("Execute Code");
      var ftTb_MyComp = app.project.activeItem;
      if (ftTb_MyComp.selectedLayers.length >= 1) {
        for (var i = 0; i < ftTb_MyComp.selectedLayers.length; i += 1) {
          var ftTb_currentLayer = ftTb_MyComp.selectedLayers[i];
          ftTb_currentLayer.name =
            "FromFacesPrimitive_Top$-." + ftTb_currentLayer.name;
        }
      } else {
        alert("Please select at least one Layer");
      }
      app.endUndoGroup();
    };
    btn_rename_D.onClick = function () {
      app.beginUndoGroup("Execute Code");
      var ftTb_MyComp = app.project.activeItem;
      if (ftTb_MyComp.selectedLayers.length >= 1) {
        for (var i = 0; i < ftTb_MyComp.selectedLayers.length; i += 1) {
          var ftTb_currentLayer = ftTb_MyComp.selectedLayers[i];
          ftTb_currentLayer.name =
            "FromFacesPrimitive_Down$-." + ftTb_currentLayer.name;
        }
      } else {
        alert("Please select at least one Layer");
      }
      app.endUndoGroup();
    };
    var cylinder_generate_btn_img = __BLOB__BLOB_000012__;
    var palletCylinder = new Window("window", undefined, undefined, {
      closeButton: false,
    });
    palletCylinder.text = "Cylinder";
    palletCylinder.orientation = "column";
    palletCylinder.alignChildren = ["center", "top"];
    palletCylinder.spacing = 10;
    palletCylinder.margins = 16;
    var grpCylinder = palletCylinder.add("group", undefined, {
      name: "grpCylinder",
    });
    grpCylinder.orientation = "row";
    grpCylinder.alignChildren = ["center", "bottom"];
    grpCylinder.spacing = 10;
    grpCylinder.margins = 0;
    var pnlValues = grpCylinder.add("panel", undefined, undefined, {
      name: "pnlValues",
    });
    pnlValues.text = "Values";
    pnlValues.preferredSize.height = 105;
    pnlValues.orientation = "row";
    pnlValues.alignChildren = ["center", "center"];
    pnlValues.spacing = 5;
    pnlValues.margins = 10;
    var grpStatics = pnlValues.add("group", undefined, { name: "grpStatics" });
    grpStatics.orientation = "column";
    grpStatics.alignChildren = ["center", "center"];
    grpStatics.spacing = 20;
    grpStatics.margins = 0;
    var sttcRadius = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcRadius",
    });
    sttcRadius.text = "Radius -";
    var sttcHeight = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcHeight",
    });
    sttcHeight.text = "Height -";
    var grpText = pnlValues.add("group", undefined, { name: "grpText" });
    grpText.orientation = "column";
    grpText.alignChildren = ["center", "center"];
    grpText.spacing = 5;
    grpText.margins = 0;
    var Edit_Radius = grpText.add(
      'edittext {properties: {name: "Edit_Radius"}}',
    );
    Edit_Radius.text = "240";
    Edit_Radius.preferredSize.width = 70;
    Edit_Radius.preferredSize.height = 30;
    var Edit_CylinderHeight = grpText.add(
      'edittext {properties: {name: "Edit_CylinderHeight"}}',
    );
    Edit_CylinderHeight.text = "40";
    Edit_CylinderHeight.preferredSize.width = 70;
    Edit_CylinderHeight.preferredSize.height = 30;
    var grpCloseCylinder = palletCylinder.add("group", undefined, {
      name: "grpCloseCylinder",
    });
    grpCloseCylinder.orientation = "row";
    grpCloseCylinder.alignChildren = ["right", "center"];
    grpCloseCylinder.spacing = 10;
    grpCloseCylinder.margins = 0;
    grpCloseCylinder.alignment = ["fill", "top"];
    var btnCylinderPalette_Close_imgString =
      "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%05%C3%B1iTXtXML%3Acom.adobe.xmp%00%00%00%00%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%206.0-c003%2079.164527%2C%202020%2F10%2F15-17%3A48%3A32%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aphotoshop%3D%22http%3A%2F%2Fns.adobe.com%2Fphotoshop%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstEvt%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceEvent%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20xmp%3ACreateDate%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20xmp%3AModifyDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20xmp%3AMetadataDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20dc%3Aformat%3D%22image%2Fpng%22%20photoshop%3AColorMode%3D%223%22%20photoshop%3AICCProfile%3D%22sRGB%20IEC61966-2.1%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20xmpMM%3ADocumentID%3D%22adobe%3Adocid%3Aphotoshop%3Ae647bfcd-bf8e-fc43-a92b-3660168a95c7%22%20xmpMM%3AOriginalDocumentID%3D%22xmp.did%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%3E%20%3CxmpMM%3AHistory%3E%20%3Crdf%3ASeq%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22created%22%20stEvt%3AinstanceID%3D%22xmp.iid%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%20stEvt%3Awhen%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20stEvt%3Awhen%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3C%2Frdf%3ASeq%3E%20%3C%2FxmpMM%3AHistory%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%2FgF%2B%00%00%03%C3%8AIDATH%C2%89%C3%A5%C2%97%C3%8FkTW%14%C3%87%3F%C3%B7%C2%BD%C2%B9%C3%B3%23A%26%03%C3%85%C3%A0%2C%C2%8A)%C3%8E%26%24%C2%A8t%16%01%C2%8D4M%C3%A8%0F%C2%B5%10%C2%AC%C2%A5%C3%BD%03%C2%84%2C%C2%8A%10%C2%95bE%C3%90%C2%AC%22%C2%A4hEa%10%05W%C2%82%5D4%C2%A4%C2%9B%20%C3%92%C3%98RQ%C2%A1%12%03%C2%A2%01%13%C3%9B%C2%85%14%C2%8B%1B%11%C2%84L%C3%A2%C2%BC7%C3%B7vq%C3%B3%C3%A6%C2%BE%C3%A4%C2%BD7%0E%C3%99%C2%B8%C3%A8%C2%81%07%C3%B3%C3%8E9%C3%B7~%C2%BF%C3%A7%C3%97%C2%BDo%C2%84%C3%96%C2%9Aw!%C3%8E%3BA%05R%C2%8D_BX%C3%AD%C2%B6m%C3%90%C3%93%03%C2%BEo%C2%9Ft%C3%BA%03%C2%B4%C3%BE%1C%C3%A8%07z%C2%80%22%20%C2%80%7F%C2%81y%C3%A0%0EB%C3%9C%C2%A4V%5B%40%08%C3%88d%C3%80uaa%01%C2%9E%3C%C2%B1%7B%C2%AFf%C3%98%02\'%C2%89%10%1F%C3%A2%C2%BA%C3%9F%C2%A1%C3%B5%C3%97%09%1E%1D%407%C3%B0%15%00%C2%AE%C3%BB%0B%C2%8E%C3%B3%03Z%C3%9Fk%C2%B6m%7C%C2%AA%C2%B5%0E%C2%98%C2%8D%01%C2%B38N%12ht%C2%9D%C3%A3%0C%23%C3%84%5D%C3%A0LC%C3%972%C2%B0R%C2%90%C3%89%C3%BC%C2%8CR%C2%A7%5B%02%C2%8C%23%C2%A0%C3%B5%C3%B7%C2%A4%C3%937P*%C3%96%C3%85%C2%A6z%C3%87%0EpVy%C2%B4%C2%B5M%C3%B1%C3%A6%C3%8Dp%12%C3%9B%C2%96%C3%81k%C2%B5%C3%8F%C3%98%C2%B2e%C2%86M%C2%9B%C2%86%00%C3%82%24%2Cpo%C2%AFi0%C3%8F%3BM%C2%B5%3A%C3%8C%C3%8A%C2%8A%25%C2%B2QYY%C2%81%C2%8E%C2%8EA%C2%8A%C3%85%C3%B3H9%1A6%C2%89%C3%86%1C%0F%0E%C2%82%C2%94%25%5Cw%11%C2%A5%C3%96vy%2B%C2%A2u%C3%BC%C2%9A%40%C2%AFT%2F%C2%9E%C3%B7%C2%98%5B%C2%B7%C2%80p%C2%8D%3D%0F%3C%C3%AF%C2%BC%C2%A1%23%C2%A2%C2%8B%C2%A54c%26%C2%A5%C2%B1%07%0D(%C2%84%C3%91uu%11KX%08%C3%B3%C3%B8%C3%BE%25%3C%C2%AF%C2%A1%C2%B6%C3%80%C3%B9%7C%C2%91lvol3%C2%B8%C2%AE)%C3%85%C2%85%0B06fJ%C3%A0%C2%BA%C2%96%C3%94%C3%A8(T*04%04%C3%B5zt%C2%BDi%C3%96%5D%C3%A4%C3%B3%C2%A5(%C2%B0%C3%AF%7F%C2%99%C2%98.)%C3%A1%C3%B8q%C3%B3%7B%C3%A7N%18%19%C2%81%C3%B6v%C3%88f%C3%A1%C3%90!%18%180%C2%B6c%C3%87%C3%A2%C2%81%C2%83%0C%C3%95%C3%AB%C3%9FD%C2%81%C2%85%C3%B8(%C2%BAbU%C3%AAu8w%C3%8E%C2%BE%C3%AF%C3%9F%0F%7D%7Dp%C3%B0%20%1C8%60%C3%B5%17%2F%C2%BE%C2%AD!%1B%18%C2%B6%C2%B9%C3%B6%C3%AD%5BD%C3%ABR%C2%AC%C2%BBR%26%C3%82%C3%AD%C3%9B%C3%A1%C3%94%C2%A9%C3%B8-O%C2%9C%C2%80%C3%B9yC2i%0C%C2%85%C3%B8%C2%87%C3%A9%C3%A9%C3%B7!%1C%C2%B1%C3%96%C3%85D%C2%9E%C2%8E%03KK%C3%B0%C3%A8%11%1C%3E%0C%C2%B5%C2%9A%C2%B5%C3%B9%3E%C2%9C%3C%09O%C2%9F%1A%7D%C2%B3%C3%99%C3%97%C2%BA%C3%90%C3%982%C3%99%2BF%C2%96%C2%97a%C3%AB%C3%96%C2%B5%C3%A9%0C%C3%AA%C3%97%C3%9A%C3%B85%C2%9C%C3%825~%C2%91%C3%88V)hk%C2%83%C3%AEn%C3%93%40%C2%A9%C3%90%C3%9D%C3%A2%C2%BA0%3E%0E%C2%A5%C2%92%C2%B9%C2%91%C2%9A%11%10%C3%A2U%14%C3%98%5Cm%C3%B1%22%C2%A5%C2%A9%C3%AF%C3%84%C2%84%C3%95%C2%9D%3D%0B%C3%97%C2%AE%C3%99%C3%B7%C3%B1q%C3%98%C2%B3%C3%87%C2%A4%3EY%C3%BE%C2%8E%02%2B%C3%B5%7B%22%C3%9Bt%C3%9A%C3%8Cj%20SSp%C3%BF%3E%5C%C2%BF%0E%C2%93%C2%93V%7F%C3%A4H%C3%BC8%05%C2%A2%C3%B5%1FQ%C3%A0Tj%12%C3%87%C2%89o%0E%C3%8F%C2%833%C3%A6%C2%96cn%0E%C2%AE%5E%C2%85j%C3%95%C3%B8%5E%C2%B9%0233%C3%86V%C2%A9%C3%98%C2%83e-%C2%A0%C3%A9%C2%8BT%C3%AA%C2%A7%40e%C3%87%C2%A9%C2%BF%1F%C3%92%C3%A9%19%C2%B2%C3%99%C3%81%08%C2%B89yLc%3D%7Bf%C3%92%19Df6%C2%84%C3%8D%C2%9B%C2%8DM%C3%8A(y%C3%87%C2%81%C3%A5%C3%A5%07x%5E%C2%99%C3%9B%C2%B7%C3%97E%2C%25H9%C3%9A%C3%A8%C3%92%C3%B5%0B%3D%C3%8F%C2%8ELp%26%07%C2%BE%C2%BE%0F%C3%8F%C2%9F%1B%02%C3%AB%C3%97%06%C3%AF%C2%A9%C3%94H%C2%B8)-pg\'%14%0A%C2%8F%C3%89%C3%A5%26%C3%88fI%C2%BA%C3%80c%C2%A5%C3%994d2%C2%90%C3%8B%5D%C2%A6Px%40gg%C3%83dS%5D.%C2%9B%C3%88%C2%84%C2%80%5C%C3%AEW%C3%B2%C3%B9%C2%A1%C3%B0m%C2%B2!%C2%91%12%5E%C2%BF%C3%BE%C2%93j%C2%B5%0F%C2%AD%0D%C2%91%C3%99%C3%99u%C3%80%C3%A1%C2%8E%C3%AE%C3%AA%C2%82r%C3%B9%26KK%C2%9Fl%C3%B8%2BD%08ho%C2%BF%C3%8B%C3%83%C2%87%03%2C.%C3%9A%08V%C3%B7%C2%8B%3F%C2%B9LM%3FE%C2%88%1F7%0C%0A%15%3Co7%10%C2%9B%C2%B6x%C3%A0%20z!%C2%8E%02%C2%BBP%C3%AAF%C3%8B%C2%80J%C3%BD%C2%86R%1F%23%C3%84%C2%B7%C3%8D%C2%8E%C3%92%C2%B7%7FWk%7D%0F%C2%AD%C3%B7%22D%2FZ%7F%01%C3%AC%06J%C3%80%7B%C2%98%C2%B3%C3%B7%25%C3%B0%17p%07%C2%98%C2%A6%5E%C2%9FC%C2%88%C2%B5%C3%87j%1C%C3%87%C3%BF%C3%9D%7F%C2%A7%C3%BF%00%60%22nX%C2%95MM%C3%9B%00%00%00%00IEND%C2%AEB%60%C2%82";
    var btnCylinderPalette_Close = grpCloseCylinder.add(
      "iconbutton",
      undefined,
      File.decode(btnCylinderPalette_Close_imgString),
      { name: "btnCylinderPalette_Close", style: "toolbutton" },
    );
    btnCylinderPalette_Close.onClick = function () {
      palletCylinder.hide();
      palletCylinder.close();
    };
    var btn_GenerateCylinder = grpCylinder.add(
      "image",
      undefined,
      cylinder_generate_btn_img,
      { state: 0 },
    );
    GenCyiSize = btn_GenerateCylinder.image.size;
    GenCyspriteHeight = GenCyiSize[1] / V_SPRITES;
    btn_GenerateCylinder.size = [GenCyiSize[0], GenCyspriteHeight];
    btn_GenerateCylinder.onDraw = function () {
      var dy = this.properties.state * GenCyspriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_GenerateCylinder.addEventListener("mouseover", mouseEventHandler);
    btn_GenerateCylinder.addEventListener("mousedown", mouseEventHandler);
    btn_GenerateCylinder.addEventListener("mouseup", mouseEventHandler);
    btn_GenerateCylinder.addEventListener("mouseout", mouseEventHandler);
    btn_GenerateCylinder.addEventListener("click", function () {
      if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
      ) {
        alert("Please select a composition.");
        return false;
      }
      Cylinder_Radius = parseInt(Edit_Radius.text);
      Cylinder_Height = parseInt(Edit_CylinderHeight.text);
      if (
        !isNaN(Cylinder_Radius) &&
        Cylinder_Radius >= 50 &&
        !isNaN(Cylinder_Height) &&
        Cylinder_Height >= 10
      ) {
        Extrude3D(Cylinder_Radius, Cylinder_Height);
      } else {
        alert(
          "Please enter a valid numaric values!\n(50px or Larger for Radius)\n(10px or Larger for Height)",
        );
      }
    });
    var pyramid_generate_btn_img = __BLOB__BLOB_000013__;
    var palletPyramid = new Window("window", undefined, undefined, {
      closeButton: false,
    });
    palletPyramid.text = "Pyramid";
    palletPyramid.orientation = "column";
    palletPyramid.alignChildren = ["center", "top"];
    palletPyramid.spacing = 10;
    palletPyramid.margins = 16;
    var grpPyramid = palletPyramid.add("group", undefined, {
      name: "grpPyramid",
    });
    grpPyramid.orientation = "row";
    grpPyramid.alignChildren = ["center", "bottom"];
    grpPyramid.spacing = 10;
    grpPyramid.margins = 0;
    var pnlValues = grpPyramid.add("panel", undefined, undefined, {
      name: "pnlValues",
    });
    pnlValues.text = "Values";
    pnlValues.orientation = "row";
    pnlValues.alignChildren = ["center", "center"];
    pnlValues.spacing = 5;
    pnlValues.margins = [10, 14, 10, 10];
    var grpStatics = pnlValues.add("group", undefined, { name: "grpStatics" });
    grpStatics.orientation = "column";
    grpStatics.alignChildren = ["center", "center"];
    grpStatics.spacing = 10;
    grpStatics.margins = 0;
    var sttcBaseX = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcBaseX",
    });
    sttcBaseX.text = "Base X -";
    var sttcBaseY = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcBaseY",
    });
    sttcBaseY.text = "Base Y -";
    var sttcHeight = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcHeight",
    });
    sttcHeight.text = "Height -";
    var grpText = pnlValues.add("group", undefined, { name: "grpText" });
    grpText.orientation = "column";
    grpText.alignChildren = ["center", "center"];
    grpText.spacing = 5;
    grpText.margins = 0;
    var Edit_PyramidBase_X = grpText.add(
      'edittext {properties: {name: "Edit_PyramidBase_X"}}',
    );
    Edit_PyramidBase_X.preferredSize.width = 60;
    var Edit_PyramidBase_Y = grpText.add(
      'edittext {properties: {name: "Edit_PyramidBase_Y"}}',
    );
    Edit_PyramidBase_Y.preferredSize.width = 60;
    var Edit_PyramidHeight = grpText.add(
      'edittext {properties: {name: "Edit_PyramidHeight"}}',
    );
    Edit_PyramidHeight.preferredSize.width = 60;
    var grpBtn = grpPyramid.add("group", undefined, { name: "grpBtn" });
    grpBtn.orientation = "row";
    grpBtn.alignChildren = ["center", "center"];
    grpBtn.spacing = 10;
    grpBtn.margins = [0, 0, 0, 4];
    var grpClosePyramid = palletPyramid.add("group", undefined, {
      name: "grpClosePyramid",
    });
    grpClosePyramid.orientation = "row";
    grpClosePyramid.alignChildren = ["right", "center"];
    grpClosePyramid.spacing = 10;
    grpClosePyramid.margins = 0;
    grpClosePyramid.alignment = ["fill", "top"];
    var btnPyramidPalette_Close_imgString =
      "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%05%C3%B1iTXtXML%3Acom.adobe.xmp%00%00%00%00%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%206.0-c003%2079.164527%2C%202020%2F10%2F15-17%3A48%3A32%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aphotoshop%3D%22http%3A%2F%2Fns.adobe.com%2Fphotoshop%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstEvt%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceEvent%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20xmp%3ACreateDate%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20xmp%3AModifyDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20xmp%3AMetadataDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20dc%3Aformat%3D%22image%2Fpng%22%20photoshop%3AColorMode%3D%223%22%20photoshop%3AICCProfile%3D%22sRGB%20IEC61966-2.1%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20xmpMM%3ADocumentID%3D%22adobe%3Adocid%3Aphotoshop%3Ae647bfcd-bf8e-fc43-a92b-3660168a95c7%22%20xmpMM%3AOriginalDocumentID%3D%22xmp.did%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%3E%20%3CxmpMM%3AHistory%3E%20%3Crdf%3ASeq%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22created%22%20stEvt%3AinstanceID%3D%22xmp.iid%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%20stEvt%3Awhen%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20stEvt%3Awhen%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3C%2Frdf%3ASeq%3E%20%3C%2FxmpMM%3AHistory%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%2FgF%2B%00%00%03%C3%8AIDATH%C2%89%C3%A5%C2%97%C3%8FkTW%14%C3%87%3F%C3%B7%C2%BD%C2%B9%C3%B3%23A%26%03%C3%85%C3%A0%2C%C2%8A)%C3%8E%26%24%C2%A8t%16%01%C2%8D4M%C3%A8%0F%C2%B5%10%C2%AC%C2%A5%C3%BD%03%C2%84%2C%C2%8A%10%C2%95bE%C3%90%C2%AC%22%C2%A4hEa%10%05W%C2%82%5D4%C2%A4%C2%9B%20%C3%92%C3%98RQ%C2%A1%12%03%C2%A2%01%13%C3%9B%C2%85%14%C2%8B%1B%11%C2%84L%C3%A2%C2%BC7%C3%B7vq%C3%B3%C3%A6%C2%BE%C3%A4%C2%BD7%0E%C3%99%C2%B8%C3%A8%C2%81%07%C3%B3%C3%8E9%C3%B7~%C2%BF%C3%A7%C3%97%C2%BDo%C2%84%C3%96%C2%9Aw!%C3%8E%3BA%05R%C2%8D_BX%C3%AD%C2%B6m%C3%90%C3%93%03%C2%BEo%C2%9Ft%C3%BA%03%C2%B4%C3%BE%1C%C3%A8%07z%C2%80%22%20%C2%80%7F%C2%81y%C3%A0%0EB%C3%9C%C2%A4V%5B%40%08%C3%88d%C3%80uaa%01%C2%9E%3C%C2%B1%7B%C2%AFf%C3%98%02\'%C2%89%10%1F%C3%A2%C2%BA%C3%9F%C2%A1%C3%B5%C3%97%09%1E%1D%407%C3%B0%15%00%C2%AE%C3%BB%0B%C2%8E%C3%B3%03Z%C3%9Fk%C2%B6m%7C%C2%AA%C2%B5%0E%C2%98%C2%8D%01%C2%B38N%12ht%C2%9D%C3%A3%0C%23%C3%84%5D%C3%A0LC%C3%972%C2%B0R%C2%90%C3%89%C3%BC%C2%8CR%C2%A7%5B%02%C2%8C%23%C2%A0%C3%B5%C3%B7%C2%A4%C3%937P*%C3%96%C3%85%C2%A6z%C3%87%0EpVy%C2%B4%C2%B5M%C3%B1%C3%A6%C3%8Dp%12%C3%9B%C2%96%C3%81k%C2%B5%C3%8F%C3%98%C2%B2e%C2%86M%C2%9B%C2%86%00%C3%82%24%2Cpo%C2%AFi0%C3%8F%3BM%C2%B5%3A%C3%8C%C3%8A%C2%8A%25%C2%B2QYY%C2%81%C2%8E%C2%8EA%C2%8A%C3%85%C3%B3H9%1A6%C2%89%C3%86%1C%0F%0E%C2%82%C2%94%25%5Cw%11%C2%A5%C3%96vy%2B%C2%A2u%C3%BC%C2%9A%40%C2%AFT%2F%C2%9E%C3%B7%C2%98%5B%C2%B7%C2%80p%C2%8D%3D%0F%3C%C3%AF%C2%BC%C2%A1%23%C2%A2%C2%8B%C2%A54c%26%C2%A5%C2%B1%07%0D(%C2%84%C3%91uu%11KX%08%C3%B3%C3%B8%C3%BE%25%3C%C2%AF%C2%A1%C2%B6%C3%80%C3%B9%7C%C2%91lvol3%C2%B8%C2%AE)%C3%85%C2%85%0B06fJ%C3%A0%C2%BA%C2%96%C3%94%C3%A8(T*04%04%C3%B5zt%C2%BDi%C3%96%5D%C3%A4%C3%B3%C2%A5(%C2%B0%C3%AF%7F%C2%99%C2%98.)%C3%A1%C3%B8q%C3%B3%7B%C3%A7N%18%19%C2%81%C3%B6v%C3%88f%C3%A1%C3%90!%18%180%C2%B6c%C3%87%C3%A2%C2%81%C2%83%0C%C3%95%C3%AB%C3%9FD%C2%81%C2%85%C3%B8(%C2%BAbU%C3%AAu8w%C3%8E%C2%BE%C3%AF%C3%9F%0F%7D%7Dp%C3%B0%20%1C8%60%C3%B5%17%2F%C2%BE%C2%AD!%1B%18%C2%B6%C2%B9%C3%B6%C3%AD%5BD%C3%ABR%C2%AC%C2%BBR%26%C3%82%C3%AD%C3%9B%C3%A1%C3%94%C2%A9%C3%B8-O%C2%9C%C2%80%C3%B9yC2i%0C%C2%85%C3%B8%C2%87%C3%A9%C3%A9%C3%B7!%1C%C2%B1%C3%96%C3%85D%C2%9E%C2%8E%03KK%C3%B0%C3%A8%11%1C%3E%0C%C2%B5%C2%9A%C2%B5%C3%B9%3E%C2%9C%3C%09O%C2%9F%1A%7D%C2%B3%C3%99%C3%97%C2%BA%C3%90%C3%982%C3%99%2BF%C2%96%C2%97a%C3%AB%C3%96%C2%B5%C3%A9%0C%C3%AA%C3%97%C3%9A%C3%B85%C2%9C%C3%825~%C2%91%C3%88V)hk%C2%83%C3%AEn%C3%93%40%C2%A9%C3%90%C3%9D%C3%A2%C2%BA0%3E%0E%C2%A5%C2%92%C2%B9%C2%91%C2%9A%11%10%C3%A2U%14%C3%98%5Cm%C3%B1%22%C2%A5%C2%A9%C3%AF%C3%84%C2%84%C3%95%C2%9D%3D%0B%C3%97%C2%AE%C3%99%C3%B7%C3%B1q%C3%98%C2%B3%C3%87%C2%A4%3EY%C3%BE%C2%8E%02%2B%C3%B5%7B%22%C3%9Bt%C3%9A%C3%8Cj%20SSp%C3%BF%3E%5C%C2%BF%0E%C2%93%C2%93V%7F%C3%A4H%C3%BC8%05%C2%A2%C3%B5%1FQ%C3%A0Tj%12%C3%87%C2%89o%0E%C3%8F%C2%833%C3%A6%C2%96cn%0E%C2%AE%5E%C2%85j%C3%95%C3%B8%5E%C2%B9%0233%C3%86V%C2%A9%C3%98%C2%83e-%C2%A0%C3%A9%C2%8BT%C3%AA%C2%A7%40e%C3%87%C2%A9%C2%BF%1F%C3%92%C3%A9%19%C2%B2%C3%99%C3%81%08%C2%B89yLc%3D%7Bf%C3%92%19Df6%C2%84%C3%8D%C2%9B%C2%8DM%C3%8A(y%C3%87%C2%81%C3%A5%C3%A5%07x%5E%C2%99%C3%9B%C2%B7%C3%97E%2C%25H9%C3%9A%C3%A8%C3%92%C3%B5%0B%3D%C3%8F%C2%8ELp%26%07%C2%BE%C2%BE%0F%C3%8F%C2%9F%1B%02%C3%AB%C3%97%06%C3%AF%C2%A9%C3%94H%C2%B8)-pg\'%14%0A%C2%8F%C3%89%C3%A5%26%C3%88fI%C2%BA%C3%80c%C2%A5%C3%994d2%C2%90%C3%8B%5D%C2%A6Px%40gg%C3%83dS%5D.%C2%9B%C3%88%C2%84%C2%80%5C%C3%AEW%C3%B2%C3%B9%C2%A1%C3%B0m%C2%B2!%C2%91%12%5E%C2%BF%C3%BE%C2%93j%C2%B5%0F%C2%AD%0D%C2%91%C3%99%C3%99u%C3%80%C3%A1%C2%8E%C3%AE%C3%AA%C2%82r%C3%B9%26KK%C2%9Fl%C3%B8%2BD%08ho%C2%BF%C3%8B%C3%83%C2%87%03%2C.%C3%9A%08V%C3%B7%C2%8B%3F%C2%B9LM%3FE%C2%88%1F7%0C%0A%15%3Co7%10%C2%9B%C2%B6x%C3%A0%20z!%C2%8E%02%C2%BBP%C3%AAF%C3%8B%C2%80J%C3%BD%C2%86R%1F%23%C3%84%C2%B7%C3%8D%C2%8E%C3%92%C2%B7%7FWk%7D%0F%C2%AD%C3%B7%22D%2FZ%7F%01%C3%AC%06J%C3%80%7B%C2%98%C2%B3%C3%B7%25%C3%B0%17p%07%C2%98%C2%A6%5E%C2%9FC%C2%88%C2%B5%C3%87j%1C%C3%87%C3%BF%C3%9D%7F%C2%A7%C3%BF%00%60%22nX%C2%95MM%C3%9B%00%00%00%00IEND%C2%AEB%60%C2%82";
    var btnPyramidPalette_Close = grpClosePyramid.add(
      "iconbutton",
      undefined,
      File.decode(btnPyramidPalette_Close_imgString),
      { name: "btnPyramidPalette_Close", style: "toolbutton" },
    );
    btnPyramidPalette_Close.onClick = function () {
      palletPyramid.hide();
      palletPyramid.close();
    };
    var btn_GeneratePyramid = grpBtn.add(
      "image",
      undefined,
      pyramid_generate_btn_img,
      { state: 0 },
    );
    GenPyiSize = btn_GeneratePyramid.image.size;
    GenPyspriteHeight = GenPyiSize[1] / V_SPRITES;
    btn_GeneratePyramid.size = [GenPyiSize[0], GenPyspriteHeight];
    btn_GeneratePyramid.onDraw = function () {
      var dy = this.properties.state * GenPyspriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_GeneratePyramid.addEventListener("mouseover", mouseEventHandler);
    btn_GeneratePyramid.addEventListener("mousedown", mouseEventHandler);
    btn_GeneratePyramid.addEventListener("mouseup", mouseEventHandler);
    btn_GeneratePyramid.addEventListener("mouseout", mouseEventHandler);
    btn_GeneratePyramid.addEventListener("click", function () {
      if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
      ) {
        alert("Please select a composition.");
        return false;
      }
      BaseWidth_X = parseInt(Edit_PyramidBase_X.text);
      BaseLength_Y = parseInt(Edit_PyramidBase_Y.text);
      PyramidHeight = parseInt(Edit_PyramidHeight.text);
      if (
        !isNaN(BaseWidth_X) &&
        BaseWidth_X >= 50 &&
        !isNaN(BaseLength_Y) &&
        BaseLength_Y >= 50 &&
        !isNaN(PyramidHeight) &&
        PyramidHeight >= 10
      ) {
        GeneratePyramid(BaseWidth_X, BaseLength_Y, PyramidHeight);
      } else {
        alert(
          "Please enter a valid numaric values!\n(50px or Larger for both X and Y)\n(10px or Larger for Height)",
        );
      }
    });
    var prisim_generate_btn_img = __BLOB__BLOB_000014__;
    var palettePrisim = new Window("window", undefined, undefined, {
      closeButton: false,
    });
    palettePrisim.text = "Prisim";
    palettePrisim.orientation = "column";
    palettePrisim.alignChildren = ["center", "top"];
    palettePrisim.spacing = 10;
    palettePrisim.margins = 16;
    var grpPrisim = palettePrisim.add("group", undefined, {
      name: "grpPrisim",
    });
    grpPrisim.orientation = "row";
    grpPrisim.alignChildren = ["center", "bottom"];
    grpPrisim.spacing = 10;
    grpPrisim.margins = 0;
    var grpValues = grpPrisim.add("panel", undefined, undefined, {
      name: "grpValues",
    });
    grpValues.text = "Values";
    grpValues.orientation = "row";
    grpValues.alignChildren = ["center", "center"];
    grpValues.spacing = 5;
    grpValues.margins = [10, 14, 10, 10];
    var grpStatics = grpValues.add("group", undefined, { name: "grpStatics" });
    grpStatics.orientation = "column";
    grpStatics.alignChildren = ["center", "center"];
    grpStatics.spacing = 10;
    grpStatics.margins = 0;
    var sttcBaseX = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcBaseX",
    });
    sttcBaseX.text = "Base X -";
    var sttcBaseY = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcBaseY",
    });
    sttcBaseY.text = "Base Y -";
    var sttcHeight = grpStatics.add("statictext", undefined, undefined, {
      name: "sttcHeight",
    });
    sttcHeight.text = "Height -";
    var grpText = grpValues.add("group", undefined, { name: "grpText" });
    grpText.orientation = "column";
    grpText.alignChildren = ["center", "center"];
    grpText.spacing = 5;
    grpText.margins = 0;
    var Edit_PrisimBase_X = grpText.add(
      'edittext {properties: {name: "Edit_PrisimBase_X"}}',
    );
    Edit_PrisimBase_X.preferredSize.width = 60;
    var Edit_PrisimBase_Y = grpText.add(
      'edittext {properties: {name: "Edit_PrisimBase_Y"}}',
    );
    Edit_PrisimBase_Y.preferredSize.width = 60;
    var Edit_PrisimHeight = grpText.add(
      'edittext {properties: {name: "Edit_PrisimHeight"}}',
    );
    Edit_PrisimHeight.preferredSize.width = 60;
    var grpBtn = grpPrisim.add("group", undefined, { name: "grpBtn" });
    grpBtn.orientation = "row";
    grpBtn.alignChildren = ["center", "center"];
    grpBtn.spacing = 10;
    grpBtn.margins = [0, 0, 0, 4];
    var grpClosePrisim = palettePrisim.add("group", undefined, {
      name: "grpClosePrisim",
    });
    grpClosePrisim.orientation = "row";
    grpClosePrisim.alignChildren = ["right", "center"];
    grpClosePrisim.spacing = 10;
    grpClosePrisim.margins = 0;
    grpClosePrisim.alignment = ["fill", "top"];
    var btnPrisimPalette_Close_imgString =
      "%C2%89PNG%0D%0A%1A%0A%00%00%00%0DIHDR%00%00%00%1E%00%00%00%1E%08%06%00%00%00%3B0%C2%AE%C2%A2%00%00%00%09pHYs%00%00%0B%13%00%00%0B%13%01%00%C2%9A%C2%9C%18%00%00%05%C3%B1iTXtXML%3Acom.adobe.xmp%00%00%00%00%00%3C%3Fxpacket%20begin%3D%22%C3%AF%C2%BB%C2%BF%22%20id%3D%22W5M0MpCehiHzreSzNTczkc9d%22%3F%3E%20%3Cx%3Axmpmeta%20xmlns%3Ax%3D%22adobe%3Ans%3Ameta%2F%22%20x%3Axmptk%3D%22Adobe%20XMP%20Core%206.0-c003%2079.164527%2C%202020%2F10%2F15-17%3A48%3A32%20%20%20%20%20%20%20%20%22%3E%20%3Crdf%3ARDF%20xmlns%3Ardf%3D%22http%3A%2F%2Fwww.w3.org%2F1999%2F02%2F22-rdf-syntax-ns%23%22%3E%20%3Crdf%3ADescription%20rdf%3Aabout%3D%22%22%20xmlns%3Axmp%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2F%22%20xmlns%3Adc%3D%22http%3A%2F%2Fpurl.org%2Fdc%2Felements%2F1.1%2F%22%20xmlns%3Aphotoshop%3D%22http%3A%2F%2Fns.adobe.com%2Fphotoshop%2F1.0%2F%22%20xmlns%3AxmpMM%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2Fmm%2F%22%20xmlns%3AstEvt%3D%22http%3A%2F%2Fns.adobe.com%2Fxap%2F1.0%2FsType%2FResourceEvent%23%22%20xmp%3ACreatorTool%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20xmp%3ACreateDate%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20xmp%3AModifyDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20xmp%3AMetadataDate%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20dc%3Aformat%3D%22image%2Fpng%22%20photoshop%3AColorMode%3D%223%22%20photoshop%3AICCProfile%3D%22sRGB%20IEC61966-2.1%22%20xmpMM%3AInstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20xmpMM%3ADocumentID%3D%22adobe%3Adocid%3Aphotoshop%3Ae647bfcd-bf8e-fc43-a92b-3660168a95c7%22%20xmpMM%3AOriginalDocumentID%3D%22xmp.did%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%3E%20%3CxmpMM%3AHistory%3E%20%3Crdf%3ASeq%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22created%22%20stEvt%3AinstanceID%3D%22xmp.iid%3Afd347127-08c7-2248-85cc-680ec0f24efd%22%20stEvt%3Awhen%3D%222022-10-31T23%3A37%3A01%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%2F%3E%20%3Crdf%3Ali%20stEvt%3Aaction%3D%22saved%22%20stEvt%3AinstanceID%3D%22xmp.iid%3A0a9a826c-f23c-724c-8a0c-7288cc2662dc%22%20stEvt%3Awhen%3D%222022-10-31T23%3A41%3A25%2B02%3A00%22%20stEvt%3AsoftwareAgent%3D%22Adobe%20Photoshop%2022.1%20(Windows)%22%20stEvt%3Achanged%3D%22%2F%22%2F%3E%20%3C%2Frdf%3ASeq%3E%20%3C%2FxmpMM%3AHistory%3E%20%3C%2Frdf%3ADescription%3E%20%3C%2Frdf%3ARDF%3E%20%3C%2Fx%3Axmpmeta%3E%20%3C%3Fxpacket%20end%3D%22r%22%3F%3E%2FgF%2B%00%00%03%C3%8AIDATH%C2%89%C3%A5%C2%97%C3%8FkTW%14%C3%87%3F%C3%B7%C2%BD%C2%B9%C3%B3%23A%26%03%C3%85%C3%A0%2C%C2%8A)%C3%8E%26%24%C2%A8t%16%01%C2%8D4M%C3%A8%0F%C2%B5%10%C2%AC%C2%A5%C3%BD%03%C2%84%2C%C2%8A%10%C2%95bE%C3%90%C2%AC%22%C2%A4hEa%10%05W%C2%82%5D4%C2%A4%C2%9B%20%C3%92%C3%98RQ%C2%A1%12%03%C2%A2%01%13%C3%9B%C2%85%14%C2%8B%1B%11%C2%84L%C3%A2%C2%BC7%C3%B7vq%C3%B3%C3%A6%C2%BE%C3%A4%C2%BD7%0E%C3%99%C2%B8%C3%A8%C2%81%07%C3%B3%C3%8E9%C3%B7~%C2%BF%C3%A7%C3%97%C2%BDo%C2%84%C3%96%C2%9Aw!%C3%8E%3BA%05R%C2%8D_BX%C3%AD%C2%B6m%C3%90%C3%93%03%C2%BEo%C2%9Ft%C3%BA%03%C2%B4%C3%BE%1C%C3%A8%07z%C2%80%22%20%C2%80%7F%C2%81y%C3%A0%0EB%C3%9C%C2%A4V%5B%40%08%C3%88d%C3%80uaa%01%C2%9E%3C%C2%B1%7B%C2%AFf%C3%98%02\'%C2%89%10%1F%C3%A2%C2%BA%C3%9F%C2%A1%C3%B5%C3%97%09%1E%1D%407%C3%B0%15%00%C2%AE%C3%BB%0B%C2%8E%C3%B3%03Z%C3%9Fk%C2%B6m%7C%C2%AA%C2%B5%0E%C2%98%C2%8D%01%C2%B38N%12ht%C2%9D%C3%A3%0C%23%C3%84%5D%C3%A0LC%C3%972%C2%B0R%C2%90%C3%89%C3%BC%C2%8CR%C2%A7%5B%02%C2%8C%23%C2%A0%C3%B5%C3%B7%C2%A4%C3%937P*%C3%96%C3%85%C2%A6z%C3%87%0EpVy%C2%B4%C2%B5M%C3%B1%C3%A6%C3%8Dp%12%C3%9B%C2%96%C3%81k%C2%B5%C3%8F%C3%98%C2%B2e%C2%86M%C2%9B%C2%86%00%C3%82%24%2Cpo%C2%AFi0%C3%8F%3BM%C2%B5%3A%C3%8C%C3%8A%C2%8A%25%C2%B2QYY%C2%81%C2%8E%C2%8EA%C2%8A%C3%85%C3%B3H9%1A6%C2%89%C3%86%1C%0F%0E%C2%82%C2%94%25%5Cw%11%C2%A5%C3%96vy%2B%C2%A2u%C3%BC%C2%9A%40%C2%AFT%2F%C2%9E%C3%B7%C2%98%5B%C2%B7%C2%80p%C2%8D%3D%0F%3C%C3%AF%C2%BC%C2%A1%23%C2%A2%C2%8B%C2%A54c%26%C2%A5%C2%B1%07%0D(%C2%84%C3%91uu%11KX%08%C3%B3%C3%B8%C3%BE%25%3C%C2%AF%C2%A1%C2%B6%C3%80%C3%B9%7C%C2%91lvol3%C2%B8%C2%AE)%C3%85%C2%85%0B06fJ%C3%A0%C2%BA%C2%96%C3%94%C3%A8(T*04%04%C3%B5zt%C2%BDi%C3%96%5D%C3%A4%C3%B3%C2%A5(%C2%B0%C3%AF%7F%C2%99%C2%98.)%C3%A1%C3%B8q%C3%B3%7B%C3%A7N%18%19%C2%81%C3%B6v%C3%88f%C3%A1%C3%90!%18%180%C2%B6c%C3%87%C3%A2%C2%81%C2%83%0C%C3%95%C3%AB%C3%9FD%C2%81%C2%85%C3%B8(%C2%BAbU%C3%AAu8w%C3%8E%C2%BE%C3%AF%C3%9F%0F%7D%7Dp%C3%B0%20%1C8%60%C3%B5%17%2F%C2%BE%C2%AD!%1B%18%C2%B6%C2%B9%C3%B6%C3%AD%5BD%C3%ABR%C2%AC%C2%BBR%26%C3%82%C3%AD%C3%9B%C3%A1%C3%94%C2%A9%C3%B8-O%C2%9C%C2%80%C3%B9yC2i%0C%C2%85%C3%B8%C2%87%C3%A9%C3%A9%C3%B7!%1C%C2%B1%C3%96%C3%85D%C2%9E%C2%8E%03KK%C3%B0%C3%A8%11%1C%3E%0C%C2%B5%C2%9A%C2%B5%C3%B9%3E%C2%9C%3C%09O%C2%9F%1A%7D%C2%B3%C3%99%C3%97%C2%BA%C3%90%C3%982%C3%99%2BF%C2%96%C2%97a%C3%AB%C3%96%C2%B5%C3%A9%0C%C3%AA%C3%97%C3%9A%C3%B85%C2%9C%C3%825~%C2%91%C3%88V)hk%C2%83%C3%AEn%C3%93%40%C2%A9%C3%90%C3%9D%C3%A2%C2%BA0%3E%0E%C2%A5%C2%92%C2%B9%C2%91%C2%9A%11%10%C3%A2U%14%C3%98%5Cm%C3%B1%22%C2%A5%C2%A9%C3%AF%C3%84%C2%84%C3%95%C2%9D%3D%0B%C3%97%C2%AE%C3%99%C3%B7%C3%B1q%C3%98%C2%B3%C3%87%C2%A4%3EY%C3%BE%C2%8E%02%2B%C3%B5%7B%22%C3%9Bt%C3%9A%C3%8Cj%20SSp%C3%BF%3E%5C%C2%BF%0E%C2%93%C2%93V%7F%C3%A4H%C3%BC8%05%C2%A2%C3%B5%1FQ%C3%A0Tj%12%C3%87%C2%89o%0E%C3%8F%C2%833%C3%A6%C2%96cn%0E%C2%AE%5E%C2%85j%C3%95%C3%B8%5E%C2%B9%0233%C3%86V%C2%A9%C3%98%C2%83e-%C2%A0%C3%A9%C2%8BT%C3%AA%C2%A7%40e%C3%87%C2%A9%C2%BF%1F%C3%92%C3%A9%19%C2%B2%C3%99%C3%81%08%C2%B89yLc%3D%7Bf%C3%92%19Df6%C2%84%C3%8D%C2%9B%C2%8DM%C3%8A(y%C3%87%C2%81%C3%A5%C3%A5%07x%5E%C2%99%C3%9B%C2%B7%C3%97E%2C%25H9%C3%9A%C3%A8%C3%92%C3%B5%0B%3D%C3%8F%C2%8ELp%26%07%C2%BE%C2%BE%0F%C3%8F%C2%9F%1B%02%C3%AB%C3%97%06%C3%AF%C2%A9%C3%94H%C2%B8)-pg\'%14%0A%C2%8F%C3%89%C3%A5%26%C3%88fI%C2%BA%C3%80c%C2%A5%C3%994d2%C2%90%C3%8B%5D%C2%A6Px%40gg%C3%83dS%5D.%C2%9B%C3%88%C2%84%C2%80%5C%C3%AEW%C3%B2%C3%B9%C2%A1%C3%B0m%C2%B2!%C2%91%12%5E%C2%BF%C3%BE%C2%93j%C2%B5%0F%C2%AD%0D%C2%91%C3%99%C3%99u%C3%80%C3%A1%C2%8E%C3%AE%C3%AA%C2%82r%C3%B9%26KK%C2%9Fl%C3%B8%2BD%08ho%C2%BF%C3%8B%C3%83%C2%87%03%2C.%C3%9A%08V%C3%B7%C2%8B%3F%C2%B9LM%3FE%C2%88%1F7%0C%0A%15%3Co7%10%C2%9B%C2%B6x%C3%A0%20z!%C2%8E%02%C2%BBP%C3%AAF%C3%8B%C2%80J%C3%BD%C2%86R%1F%23%C3%84%C2%B7%C3%8D%C2%8E%C3%92%C2%B7%7FWk%7D%0F%C2%AD%C3%B7%22D%2FZ%7F%01%C3%AC%06J%C3%80%7B%C2%98%C2%B3%C3%B7%25%C3%B0%17p%07%C2%98%C2%A6%5E%C2%9FC%C2%88%C2%B5%C3%87j%1C%C3%87%C3%BF%C3%9D%7F%C2%A7%C3%BF%00%60%22nX%C2%95MM%C3%9B%00%00%00%00IEND%C2%AEB%60%C2%82";
    var btnPrisimPalette_Close = grpClosePrisim.add(
      "iconbutton",
      undefined,
      File.decode(btnPrisimPalette_Close_imgString),
      { name: "btnPrisimPalette_Close", style: "toolbutton" },
    );
    btnPrisimPalette_Close.onClick = function () {
      palettePrisim.hide();
      palettePrisim.close();
    };
    var btn_GeneratePrisim = grpBtn.add(
      "image",
      undefined,
      prisim_generate_btn_img,
      { state: 0 },
    );
    GenPriiSize = btn_GeneratePrisim.image.size;
    GenPrispriteHeight = GenPriiSize[1] / V_SPRITES;
    btn_GeneratePrisim.size = [GenPriiSize[0], GenPrispriteHeight];
    btn_GeneratePrisim.onDraw = function () {
      var dy = this.properties.state * GenPrispriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_GeneratePrisim.addEventListener("mouseover", mouseEventHandler);
    btn_GeneratePrisim.addEventListener("mousedown", mouseEventHandler);
    btn_GeneratePrisim.addEventListener("mouseup", mouseEventHandler);
    btn_GeneratePrisim.addEventListener("mouseout", mouseEventHandler);
    btn_GeneratePrisim.addEventListener("click", function () {
      if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
      ) {
        alert("Please select a composition.");
        return false;
      }
      Prisim_BaseWidth_X = parseInt(Edit_PrisimBase_X.text);
      Prisim_BaseLength_Y = parseInt(Edit_PrisimBase_Y.text);
      PrisimHeight = parseInt(Edit_PrisimHeight.text);
      if (
        !isNaN(Prisim_BaseWidth_X) &&
        Prisim_BaseWidth_X >= 50 &&
        !isNaN(Prisim_BaseLength_Y) &&
        Prisim_BaseLength_Y >= 50 &&
        !isNaN(PrisimHeight) &&
        PrisimHeight >= 10
      ) {
        GeneratePrisim(Prisim_BaseWidth_X, Prisim_BaseLength_Y, PrisimHeight);
      } else {
        alert(
          "Please enter a valid numaric values!\n(50px or Larger for both Width and Length)\n(10px or Larger for Height)",
        );
      }
    });
    var panelGlobal = thisObj;
    var palette =
      panelGlobal instanceof Panel ? panelGlobal : new Window("palette");
    if (!(panelGlobal instanceof Panel)) {
      palette.text = "3D PG v3.0";
    }
    palette.orientation = "column";
    palette.alignChildren = ["center", "top"];
    palette.spacing = 10;
    palette.margins = 10;
    var grpMain = palette.add("group", undefined, { name: "grpMain" });
    grpMain.orientation = "row";
    grpMain.alignChildren = ["center", "center"];
    grpMain.spacing = 10;
    grpMain.margins = 0;
    var grpGetApply = grpMain.add("group", undefined, { name: "grpGetApply" });
    grpGetApply.orientation = "column";
    grpGetApply.alignChildren = ["center", "top"];
    grpGetApply.spacing = 10;
    grpGetApply.margins = 5;
    grpGetApply.alignment = ["center", "top"];
    var btn_Get = grpGetApply.add("button", undefined, undefined, {
      name: "btn_Get",
    });
    btn_Get.text = "Get";
    btn_Get.preferredSize.width = 50;
    var btn_Apply = grpGetApply.add("button", undefined, undefined, {
      name: "btn_Apply",
    });
    btn_Apply.text = "Apply";
    btn_Apply.preferredSize.width = 50;
    var StaticGet_X = grpGetApply.add("statictext", undefined, undefined, {
      name: "StaticGet_X",
    });
    StaticGet_X.preferredSize.width = 50;
    StaticGet_X.text = "X: - px";
    var StaticGet_Y = grpGetApply.add("statictext", undefined, undefined, {
      name: "StaticGet_Y",
    });
    StaticGet_Y.preferredSize.width = 50;
    StaticGet_Y.text = "Y: - px";
    btn_Get.onClick = function () {
      if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
      ) {
        alert("Please select a composition.");
        return false;
      }
      if (app.project.activeItem.selectedLayers.length != 1) {
        StaticGet_X.text = "X: - px";
        StaticGet_Y.text = "Y: - px";
        return false;
      }
      CalculateSize(app.project.activeItem.selectedLayers[0]);
    };
    btn_Apply.onClick = function () {
      if (
        app.project.activeItem == null ||
        !(app.project.activeItem instanceof CompItem)
      ) {
        alert("Please select a composition.");
        return false;
      }
      if (app.project.activeItem.selectedLayers.length != 1) {
        alert("To \'Apply\' Dimensions Please select one Layer.");
        return false;
      }
      CalculateSizeToApply(app.project.activeItem.selectedLayers[0]);
    };
    var divider1 = grpMain.add("panel", undefined, undefined, {
      name: "divider1",
    });
    divider1.alignment = "fill";
    var grpAll_Elements = grpMain.add("group", undefined, {
      name: "grpAll_Elements",
    });
    grpAll_Elements.orientation = "column";
    grpAll_Elements.alignChildren = ["center", "center"];
    grpAll_Elements.spacing = 10;
    grpAll_Elements.margins = 0;
    var grpElements = grpAll_Elements.add("group", undefined, {
      name: "grpElements",
    });
    grpElements.orientation = "column";
    grpElements.alignChildren = ["center", "center"];
    grpElements.spacing = 10;
    grpElements.margins = 0;
    var btn_MainGenerateCube = grpElements.add(
      "image",
      undefined,
      cube_main_btn_img,
      { state: 0 },
    );
    MGCiSize = btn_MainGenerateCube.image.size;
    MGCspriteHeight = MGCiSize[1] / V_SPRITES;
    btn_MainGenerateCube.size = [MGCiSize[0], MGCspriteHeight];
    btn_MainGenerateCube.onDraw = function () {
      var dy = this.properties.state * MGCspriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_MainGenerateCube.addEventListener("mouseover", mouseEventHandler);
    btn_MainGenerateCube.addEventListener("mousedown", mouseEventHandler);
    btn_MainGenerateCube.addEventListener("mouseup", mouseEventHandler);
    btn_MainGenerateCube.addEventListener("mouseout", mouseEventHandler);
    btn_MainGenerateCube.addEventListener("click", function () {
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
      } else if (touches.indexOf("shift") != -1) {
      } else if (touches.indexOf("ctrl") != -1) {
      } else {
        CubePalette.show();
      }
    });
    var btn_MainGenerateCylinder = grpElements.add(
      "image",
      undefined,
      cylinder_main_btn_img,
      { state: 0 },
    );
    MGCyiSize = btn_MainGenerateCylinder.image.size;
    MGCyspriteHeight = MGCyiSize[1] / V_SPRITES;
    btn_MainGenerateCylinder.size = [MGCyiSize[0], MGCyspriteHeight];
    btn_MainGenerateCylinder.onDraw = function () {
      var dy = this.properties.state * MGCyspriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_MainGenerateCylinder.addEventListener("mouseover", mouseEventHandler);
    btn_MainGenerateCylinder.addEventListener("mousedown", mouseEventHandler);
    btn_MainGenerateCylinder.addEventListener("mouseup", mouseEventHandler);
    btn_MainGenerateCylinder.addEventListener("mouseout", mouseEventHandler);
    btn_MainGenerateCylinder.addEventListener("click", function () {
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
      } else if (touches.indexOf("shift") != -1) {
      } else if (touches.indexOf("ctrl") != -1) {
      } else {
        palletCylinder.show();
      }
    });
    var btn_MainGeneratePyramid = grpElements.add(
      "image",
      undefined,
      pyramid_main_btn_img,
      { state: 0 },
    );
    MGPyiSize = btn_MainGeneratePyramid.image.size;
    MGPyspriteHeight = MGPyiSize[1] / V_SPRITES;
    btn_MainGeneratePyramid.size = [MGPyiSize[0], MGPyspriteHeight];
    btn_MainGeneratePyramid.onDraw = function () {
      var dy = this.properties.state * MGPyspriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_MainGeneratePyramid.addEventListener("mouseover", mouseEventHandler);
    btn_MainGeneratePyramid.addEventListener("mousedown", mouseEventHandler);
    btn_MainGeneratePyramid.addEventListener("mouseup", mouseEventHandler);
    btn_MainGeneratePyramid.addEventListener("mouseout", mouseEventHandler);
    btn_MainGeneratePyramid.addEventListener("click", function () {
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
      } else if (touches.indexOf("shift") != -1) {
      } else if (touches.indexOf("ctrl") != -1) {
      } else {
        palletPyramid.show();
      }
    });
    var btn_MainGeneratePrisim = grpElements.add(
      "image",
      undefined,
      prisim_main_btn_img,
      { state: 0 },
    );
    MGPriSize = btn_MainGeneratePrisim.image.size;
    MGPrspriteHeight = MGPriSize[1] / V_SPRITES;
    btn_MainGeneratePrisim.size = [MGPriSize[0], MGPrspriteHeight];
    btn_MainGeneratePrisim.onDraw = function () {
      var dy = this.properties.state * MGPrspriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_MainGeneratePrisim.addEventListener("mouseover", mouseEventHandler);
    btn_MainGeneratePrisim.addEventListener("mousedown", mouseEventHandler);
    btn_MainGeneratePrisim.addEventListener("mouseup", mouseEventHandler);
    btn_MainGeneratePrisim.addEventListener("mouseout", mouseEventHandler);
    btn_MainGeneratePrisim.addEventListener("click", function () {
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
      } else if (touches.indexOf("shift") != -1) {
      } else if (touches.indexOf("ctrl") != -1) {
      } else {
        palettePrisim.show();
      }
    });
    var dvdr = grpElements.add("panel", undefined, undefined, { name: "dvdr" });
    dvdr.alignment = "fill";
    var btn_Settings = grpElements.add(
      "image",
      undefined,
      settings_main_btn_img,
      { state: 0 },
    );
    MSeiSize = btn_Settings.image.size;
    MSespriteHeight = MSeiSize[1] / V_SPRITES;
    btn_Settings.size = [MSeiSize[0], MSespriteHeight];
    btn_Settings.onDraw = function () {
      var dy = this.properties.state * MSespriteHeight + FIX_OFFSET;
      this.graphics.drawImage(this.image, 0, -dy);
    };
    var mouseEventHandler = function (ev) {
      this.properties.state =
        ("mouseover" == ev.type) + 2 * ("mousedown" == ev.type);
      this.refresh();
    };
    btn_Settings.addEventListener("mouseover", mouseEventHandler);
    btn_Settings.addEventListener("mousedown", mouseEventHandler);
    btn_Settings.addEventListener("mouseup", mouseEventHandler);
    btn_Settings.addEventListener("mouseout", mouseEventHandler);
    btn_Settings.addEventListener("click", function () {
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
      } else if (touches.indexOf("shift") != -1) {
      } else if (touches.indexOf("ctrl") != -1) {
      } else {
        aspg3.helpUI();
      }
    });
    palette.onClose = function () {};
    palette.layout.layout(true);
    palette.layout.resize();
    palette.onResizing = palette.onResize = function () {
      this.layout.resize();
    };
    if (palette instanceof Window) {
      palette.show();
    }
  }
}
AS_3DPG_My3DPGAwesomeTool(this);
