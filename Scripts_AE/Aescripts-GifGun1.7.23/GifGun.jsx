/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

var gifGun = this;
(function (gifGun) {
  gifGun.helpers = {
    filter: function (arr, callback) {
      var filteredArr = [];
      var len = arr.length;
      for (var i = 0; i < len; i += 1) {
        if (callback(arr[i], i, arr)) {
          filteredArr.push(arr[i]);
        }
      }
      return filteredArr;
    },
    forEach: function (arr, callback) {
      var len = arr.length;
      for (var i = 0; i < len; i += 1) {
        callback(arr[i], i, arr);
      }
    },
    indexOf: function (arr, searchElement, fromIndex) {
      if (this === null) {
        throw new Error('"this" is null or not defined');
      }
      var len = arr.length >>> 0;
      if (len === 0) {
        return -1;
      }
      var n = fromIndex || 0;
      if (Math.abs(n) === Infinity) {
        n = 0;
      }
      if (n >= len) {
        return -1;
      }
      k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
      while (k < len) {
        if (k in arr && arr[k] === searchElement) {
          return k;
        }
        k++;
      }
      return -1;
    },
    lastIndexOf: function (arr, el) {
      var reversedIndex = gifGun.helpers.indexOf(arr.slice().reverse(), el, 0);
      if (reversedIndex === -1) {
        return -1;
      }
      return arr.length - reversedIndex - 1;
    },
    stringEndsWith: function (str, suffix) {
      return str.indexOf(suffix, str.length - suffix.length) !== -1;
    },
  };
})(gifGun || (gifGun = {}));
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
            helpPal.grp.okGrp["btn" + i].helpTip = vars.helpButtons[i].helpTip;
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
              helpPal.grp.okGrp["btn" + i].value = vars.helpButtons[i].btnValue;
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
      serverVersionCheck != null && serverVersionCheck.hasOwnProperty("version")
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
      saveSettings(prefsSectionName, prefsLastVersionChecked, strScriptVersion);
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
        var errDetail = "e" in licenseValidity ? "\n" + licenseValidity.e : "";
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
        "GET /" + get + " HTTP/1.1\nHost: " + url + "\n\nConnection: close\n\n",
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
    if ((betaMode && isResultTrial(result)) || result == -106 || result == -7) {
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
      myReg.replace(/^ +|| +$/g, "").match(/^.+\*\*.+\*\*[0-9]+[A-Za-z]{3}$/) &&
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
      myReg.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[A-Z0-9#]+[A-Za-z]{3}[0-9]+$/) &&
      myRegArray.length == 4
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
      licenseValidity = licV == 2 ? getVerifCode(myReg) : getVerifCode3(myReg);
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
              strFor + " " + numUsers + " " + numUsers > 1 ? strUsers : strUser;
            var successAlert = betaMode
              ? strBTA + " "
              : "" + strRegSuccess + multiLicense + !betaMode && !isTimeLimited
                ? "\n" + strRegSuccess1
                : "\n" + strScriptName;
            if (isTimeLimited) {
              var licenseEnd = parseDateString(retProp("nd$", licenseValidity));
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
        var errDetail = "e" in licenseValidity ? "\n" + licenseValidity.e : "";
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
          licErrors[checkErrorCode(licenseValidity.result)].detail + errDetail,
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
    if (obj == undefined || obj == null || file == undefined || file == null) {
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
            saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
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
  var mx = __BLOB__BLOB_000241__;
  var wx = __BLOB__BLOB_000242__;
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
  var isAescriptsSupportUrl = supportUrl === aescriptsSupportUrl ? true : false;
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
    zh_CN: strScriptName + " \u7684\u8bb8\u53ef\u8bc1\u9700\u8981\u66f4\u65b0",
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
    de: "Eine neuere Version von " + strScriptName + " ist verf\xfcgbar: %v\n",
    en: "A newer version of " + strScriptName + " is available: %v\n",
    es:
      "Una versi\xf3n nueva de " + strScriptName + " est\xe1 disponible: %v\n",
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
      "Uma nova vers\xe3o do " + strScriptName + " est\xe1 dispon\xedvel: %v\n",
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
      "Please click on " + strGetHelp + " and send a screenshot of this error.",
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
      "Por favor, clique em " + strGetHelp + " e mande uma imagem desse erro.",
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
(function (gifGun) {
  gifGun.GUIvariables = {
    customFolder: { defValue: "false", lookup: ["true", "false"] },
    experimentalRender: { defValue: "0", lookup: ["0", "1"] },
    fps: {
      defValue: "as comp",
      lookup: ["as comp", "10", "12", "15", "20", "25", "30"],
    },
    gifFolder: { defValue: "", lookup: null },
    keepAlpha: { defValue: "0", lookup: ["0", "1"] },
    loopChkbx: { defValue: "1", lookup: ["0", "1"] },
    loopEditField: { defValue: "1", lookup: null },
    loops: { defValue: "0", lookup: null },
    lossyQuality: { defValue: "0", lookup: ["0", "1", "2", "3", "4"] },
    maxColors: { defValue: "256", lookup: [8, 16, 32, 64, 128, 256] },
    openFldrChkbx: { defValue: "true", lookup: ["true", "false"] },
    output: { defValue: "Lossless", lookup: null },
    outputModules: { defValue: [], lookup: null },
    pixelart: { defValue: "false", lookup: ["true", "false"] },
    qualityRender: { defValue: "Best", lookup: ["0", "1", "2", "3"] },
    removeAfterChkbx: { defValue: "true", lookup: ["true", "false"] },
    renderSpeed: { defValue: "true", lookup: ["true", "false"] },
    resChkbx: { defValue: "true", lookup: ["true", "false"] },
    resWidth: { defValue: "800", lookup: null },
  };
  gifGun.setPrefs = function () {
    for (var key in gifGun.GUIvariables) {
      if (!(gifGun.GUIvariables[key] instanceof Function)) {
        if (gifGun[key] instanceof Array) {
          app.settings.saveSetting(
            "GifGunPrefs",
            key,
            Base64.encode(gifGun[key].toString()),
          );
        } else {
          app.settings.saveSetting(
            "GifGunPrefs",
            key,
            Base64.encode(String(gifGun[key])),
          );
        }
      }
    }
  };
  gifGun.getPrefs = function () {
    for (var key in gifGun.GUIvariables) {
      var thisKey = gifGun.GUIvariables[key];
      if (!(thisKey instanceof Function)) {
        if (app.settings.haveSetting("GifGunPrefs", key) === false) {
          gifGun[key] = thisKey.defValue;
        } else {
          gifGun[key] = Base64.decode(
            app.settings.getSetting("GifGunPrefs", key),
          );
        }
      }
    }
    gifGun.checkGatan();
  };
  gifGun.checkGatan = function () {
    for (var key in gifGun.GUIvariables) {
      var thisKey = gifGun.GUIvariables[key];
      if (thisKey.lookup != null) {
        found = false;
        for (var l = 0; l < thisKey.lookup.length; l += 1) {
          if (gifGun[key] == thisKey.lookup[l]) {
            found = true;
          }
        }
        if (found == false) {
          gifGun[key] = thisKey.defValue;
        }
      }
    }
    gifGun.resWidth = Number(gifGun.resWidth);
    if (
      gifGun.resWidth == NaN ||
      gifGun.resWidth <= 0 ||
      gifGun.resWidth > 2560
    ) {
      gifGun.resWidth = 800;
    }
    var tstFldr = new Folder(String(gifGun.gifFolder));
    if (tstFldr.exists === false) {
      gifGun.gifFolder = new Folder(
        Folder.userData.fullName + "/Aescripts/gifGun/",
      ).fsName;
    }
  };
  gifGun.setFG = function (obj, colorArray) {
    if (typeof colorArray != "undefined" && colorArray.length >= 3) {
      obj.graphics.foregroundColor = obj.graphics.newPen(
        obj.graphics.PenType.SOLID_COLOR,
        colorArray,
        1,
      );
    }
    return obj;
  };
  gifGun.setBG = function (obj, colorArray) {
    if (typeof colorArray != "undefined" && colorArray.length >= 3) {
      obj.graphics.backgroundColor = obj.graphics.newBrush(
        obj.graphics.BrushType.SOLID_COLOR,
        colorArray,
      );
    }
    return obj;
  };
  gifGun.setTip = function (obj, hlpTip) {
    if (hlpTip) {
      if (obj.icon) {
        obj.icon.helpTip = hlpTip;
      } else {
        obj.helpTip = hlpTip;
      }
    }
    return obj;
  };
  gifGun.addNewBttn = function (
    thisObj,
    parentGroup,
    _size,
    txt,
    icon,
    iconOver,
    iconOnly,
  ) {
    iconOnly = iconOnly || false;
    var newBttnGroup = parentGroup.add("group{orientation: \'stack\'}");
    var newBttnBG = newBttnGroup.add("group");
    newBttnBG.preferredSize = _size;
    if (iconOnly === false) {
      thisObj.setBG(newBttnBG, [94, 94, 94, 255] / 255);
    }
    var newBttn = newBttnGroup.add(
      "group{margins:[1,1,0,0],alignChildren: [\'center\', \'center\']}",
    );
    newBttn.preferredSize = _size - [2, 2];
    if (iconOnly === false) {
      thisObj.setBG(newBttn, [39, 39, 39, 255] / 255);
    }
    if (txt !== "") {
      newBttn.bttnText = newBttn.add("statictext", undefined, txt);
      newBttn.bttnText.characters = 20;
      newBttn.bttnText.justify = "center";
      newBttn.bttnText.preferredSize = _size - [4, 4];
      newBttn.bttnText.alignment = newBttn.bttnText.alignChildren = [
        "center",
        "center",
      ];
    } else {
      if (icon !== "") {
        newBttn.icon = newBttn.add("image", undefined, icon);
      }
    }
    var newBttnClickZone = newBttnGroup.add("group");
    newBttnClickZone.size =
      newBttnClickZone.preferredSize =
      newBttnClickZone.minimumSize =
      newBttnClickZone.maximumSize =
        _size;
    newBttnClickZone.setText = function (_text) {
      newBttn.bttnText.text = _text;
    };
    newBttnClickZone.setDisabled = function () {
      newBttn.enabled = false;
      newBttnBG.enabled = false;
    };
    newBttnClickZone.setEnabled = function () {
      newBttn.enabled = true;
      newBttnBG.enabled = true;
    };
    newBttnClickZone.addEventListener("mouseover", function (e) {
      if (e.target === e.currentTarget && newBttn.enabled) {
        if (iconOnly === false) {
          thisObj.setBG(newBttnBG, [92, 232, 254, 255] / 255);
          thisObj.setBG(newBttn, [42, 49, 50, 255] / 255);
        }
        if (txt !== "") {
          thisObj.setFG(newBttn.bttnText, [1, 1, 1, 1]);
        } else {
          newBttn.icon.image = iconOver;
        }
      }
    });
    newBttnClickZone.addEventListener("mouseout", function (e) {
      if (e.target === e.currentTarget && newBttn.enabled) {
        if (iconOnly === false) {
          thisObj.setBG(newBttnBG, [94, 94, 94, 255] / 255);
          thisObj.setBG(newBttn, [39, 39, 39, 255] / 255);
        }
        if (txt !== "") {
          thisObj.setFG(newBttn.bttnText, [192, 192, 192, 192] / 255);
        } else {
          newBttn.icon.image = icon;
        }
      }
    });
    newBttnClickZone.addEventListener("mousedown", function () {
      if (iconOnly === false && newBttn.enabled) {
        thisObj.setBG(newBttn, [23, 23, 23, 255] / 255);
      }
    });
    newBttnClickZone.addEventListener("mouseup", function () {
      if (iconOnly === false && newBttn.enabled) {
        thisObj.setBG(newBttn, [39, 39, 39, 255] / 255);
      }
    });
    return newBttnClickZone;
  };
  gifGun.getOutputSettings = function (recalculate) {
    recalculate = recalculate || false;
    var getOut = function () {
      var outputModules = [];
      var tmpComp = app.project.items.addComp("ggOutputTST", 4, 4, 1, 1, 1);
      var renderComp = app.project.renderQueue.items.add(tmpComp);
      app.project.renderQueue.showWindow(false);
      var om = renderComp.outputModule(1);
      for (var t = 0; t < om.templates.length; t += 1) {
        try {
          if (om.templates[t].indexOf("_HIDDEN") == -1) {
            try {
              renderComp.outputModule(1).applyTemplate(om.templates[t]);
            } catch (err) {
              alert(err);
            }
            if (renderComp.outputModule(1).file == null) {
              var fldr = new Folder(
                Folder.userData.fullName + "/Aescripts/gifGun/",
              );
              renderComp.outputModules[1].file = File(fldr.path + "/tst");
              t--;
              var omName = renderComp.outputModule(1).file.name;
              var extension = omName.match(/(\w+)$/)[0];
              if (
                extension == "mov" ||
                extension == "avi" ||
                extension == "mp4"
              ) {
                outputModules.push(om.templates[t]);
              }
            } else {
              var omName = renderComp.outputModule(1).file.name;
              var extension = omName.match(/(\w+)$/)[0];
              if (
                extension == "mov" ||
                extension == "avi" ||
                extension == "mp4"
              ) {
                outputModules.push(om.templates[t]);
              }
            }
          }
        } catch (e) {}
      }
      tmpComp.remove();
      app.endUndoGroup();
      outputModules.push("-");
      outputModules.push("[UPDATE PRESETS]");
      app.settings.saveSetting(
        "GifGunPrefs",
        "outputModules",
        Base64.encode(outputModules.toString()),
      );
      return outputModules;
    };
    if (
      app.settings.haveSetting("GifGunPrefs", "outputModules") === false ||
      recalculate === true
    ) {
      outputModules = getOut();
    } else {
      var modules = Base64.decode(
        app.settings.getSetting("GifGunPrefs", "outputModules"),
      );
      if (
        modules === null ||
        modules === "null" ||
        modules === '["-", "[UPDATE PRESETS]"]' ||
        modules.length === 0
      ) {
        outputModules = getOut();
      } else {
        outputModules = Base64.decode(
          app.settings.getSetting("GifGunPrefs", "outputModules"),
        ).split(",");
      }
    }
    return outputModules;
  };
})(gifGun || (gifGun = {}));
(function (gifGun) {
  gifGun.names = {
    colorList: {
      colors: [],
      hlpTip: "Set the maximum number of color\nMore colors means larger GIFs.",
    },
    cstmFldr: {
      hlpTip: "Save GIF to a folder of your choice",
      name: "Output to Custom Folder",
    },
    doneBttn: { hlpTip: "Click to save settings", name: "DONE" },
    experimentalRender: {
      hlpTip:
        "Use the new experimental engine for GIF render.\nThe result would be much better for multi color comps, like movie clips or 3D scenes, at the cost of increased size.\nYou may still use compression to bring size down.",
      hlpTip2:
        "Rendering with Alpha channel does not support Experimental Engine.",
      name: "Use Experimental Engine",
    },
    fldrBttn: { hlpTip: "Click to select custom folder" },
    fldrLine: { hlpTip: "Path to the GIF folder" },
    fps: { name: "Framerate" },
    fpsList: {
      fpssssss: [],
      hlpTip:
        "Choose a new FPS value (will affect size).\nOr leave it as in source comp.",
    },
    keepAlpha: {
      hlpTip:
        "Check this to preserve alpha channel for your GIFs. Note that this will affect both size and quality.",
      hlpTip2: "Experimental Engine mode does not support Alpha channel.",
      name: "Keep Alpha",
    },
    loopGif: {
      hlpTip:
        "Uncheck to set the amount of loops you need.\n\nRendering with Alpha or Experimental is only possible with infinite or no loop.",
      name: "Infinite Loop",
    },
    lossyQualityList: ["None", "Low", "Medium", "High", "Insane"],
    lossyQualityValue: { hlpTip: "Compression value.", name: "Compress" },
    maxColors: { name: "Max Colors" },
    openFldr: {
      hlpTip: "Open a folder containing GIF after render",
      name: "Open GIF folder",
    },
    optionsText: { name: "OPTIONS" },
    outputList: { hlpTip: "Choose an output module to render GIF." },
    outputTo: { name: "OUTPUT TO" },
    pixelart: {
      hlpTip: "Will set Render Quality to Draft to render pixelart gifs.",
      hlpTip2: "Pixelart support works for CC2014 and up.",
      name: "Pixelart",
    },
    prjFldr: {
      hlpTip:
        "Save GIF to a project folder\nWill create /renders/gifGunGIFS subfolder",
      name: "Output to Project Folder",
    },
    qualityRender: { name: "Render Quality" },
    qualityRenderList: {
      colors: [],
      hlpTip: "Set the quality of gif compression. Better means larger GIFs.",
    },
    qualityRenderListContent: ["Best", "High", "Medium", "Low"],
    renderBttn: {
      hereitComes: "Here it comes!",
      hlpTip: "Click -> GIF",
      idle: "Make GIF",
      rendering: "Rendering",
    },
    renderSpeed: {
      hlpTip:
        "Will work only when you choose to resize to smaller GIF size.\nThe more you resize, the faster the render process.\nMay slightly affect quality",
      hlpTip2: "This feature is supported for AE CC2015.3 and higher",
      hlpTip3: "This feature doesn\'t work with Pixelart",
      name: "Faster Resize",
    },
    renderWith: { name: "Render Preset" },
    resToWidth: {
      hlpTip:
        "GifGun will keep composition aspect ratio.\nYes, you can upscale.",
      name: "Resize to Width",
    },
    saveVideoCopy: {
      hlpTip:
        "GifGun removes the temporary video by default.\nWe are totally cool if you choose not to.",
      name: "Save Video Copy",
    },
    settingsBttn: { hlpTip: "Adjust settings" },
  };
})(gifGun || (gifGun = {}));
(function (gifGun) {
  gifGun.buildGUI = function (thisObj, reg) {
    gifGun.getPrefs();
    gifGun.outputModules = gifGun.getOutputSettings(false);
    thisObj.iconsFiles = new Array();
    var fldr = new Folder(Folder.userData.fullName + "/Aescripts/gifGun/");
    fldr.create();
    for (var i = 0; i < 4; i += 1) {
      thisObj.iconsFiles[i] = new File(
        fldr.fullName + "/gifGunIconFile_" + i + ".png",
      );
      thisObj.iconsFiles[i].encoding = "BINARY";
      thisObj.iconsFiles[i].open("w");
      thisObj.iconsFiles[i].write(
        thisObj.bin10ToString(thisObj.iconsBinaries[i]),
      );
      thisObj.iconsFiles[i].close();
    }
    thisObj.ggGUI =
      thisObj instanceof Panel
        ? thisObj
        : new Window(
            "palette{margins: 10}",
            thisObj.scriptTitle + " v" + thisObj.version,
            undefined,
            { resizeable: true },
          );
    thisObj.ggGUI.alignChildren = ["left", "top"];
    var g = thisObj.ggGUI.add(
      "group{orientation:\'row\', alignChildren: [\'left\', \'top\'], spacing: 3}",
    );
    gifGun.Glob_GifStatus = gifGun.addNewBttn(
      thisObj,
      g,
      [100, 40],
      gifGun.makeGifName,
      "",
      "",
      false,
    );
    var setBttn = gifGun.addNewBttn(
      thisObj,
      g,
      [40, 40],
      "",
      thisObj.iconsFiles[0],
      thisObj.iconsFiles[1],
      false,
    );
    gifGun.setTip(setBttn, gifGun.names.settingsBttn.hlpTip);
    setBttn.addEventListener("click", function (e) {
      if (e.target === e.currentTarget) {
        gifGun.buildGUIsettings(gifGun, reg);
      }
    });
    gifGun.Glob_GifStatus.addEventListener("click", function (e) {
      if (e.target === e.currentTarget) {
        gifGun.writeln("starting render queue");
        gifGun.setPrefs();
        gifGun.startRenderQueue();
      }
    });
    if (thisObj.ggGUI instanceof Window) {
      thisObj.ggGUI.center();
      thisObj.ggGUI.show();
    } else {
      thisObj.ggGUI.layout.layout(false);
    }
  };
  Group.prototype.setIcon = function (iconFile) {
    if (iconFile) {
      this.icon = this.add("image", undefined, iconFile);
    }
    return this;
  };
  gifGun.bin10ToString = function (arr) {
    var result = "";
    for (var i = 0; i < arr.length; i += 1) {
      result += String.fromCharCode(parseInt(arr[i], 10));
    }
    return result;
  };
  gifGun.__settingsIcon = [
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 20,
    0, 0, 0, 20, 8, 6, 0, 0, 0, 141, 137, 29, 13, 0, 0, 0, 25, 116, 69, 88, 116,
    83, 111, 102, 116, 119, 97, 114, 101, 0, 65, 100, 111, 98, 101, 32, 73, 109,
    97, 103, 101, 82, 101, 97, 100, 121, 113, 201, 101, 60, 0, 0, 1, 140, 73,
    68, 65, 84, 120, 218, 172, 85, 129, 109, 131, 48, 16, 4, 196, 0, 237, 4, 13,
    27, 176, 65, 96, 130, 194, 6, 201, 4, 13, 19, 132, 76, 16, 152, 160, 116, 2,
    178, 65, 189, 65, 217, 160, 108, 80, 186, 65, 239, 162, 115, 107, 89, 36,
    77, 43, 44, 189, 108, 252, 254, 243, 255, 189, 255, 9, 131, 153, 97, 140,
    89, 97, 154, 178, 44, 155, 244, 253, 138, 41, 147, 122, 224, 22, 164, 133,
    126, 244, 109, 67, 15, 232, 14, 211, 30, 178, 35, 32, 36, 135, 112, 143,
    128, 91, 8, 1, 30, 33, 5, 215, 0, 204, 125, 192, 216, 3, 163, 33, 189, 171,
    100, 248, 102, 213, 48, 238, 126, 142, 154, 79, 204, 235, 185, 232, 98, 103,
    109, 193, 114, 24, 51, 172, 6, 134, 59, 121, 53, 204, 216, 174, 160, 39, 13,
    41, 228, 1, 54, 213, 119, 200, 242, 238, 29, 210, 89, 197, 181, 129, 243, 4,
    121, 22, 216, 40, 90, 206, 182, 17, 15, 136, 252, 86, 220, 252, 58, 20, 1,
    249, 75, 176, 78, 48, 31, 200, 59, 147, 25, 58, 183, 214, 74, 72, 50, 151,
    189, 27, 188, 102, 132, 167, 24, 11, 186, 190, 209, 126, 231, 130, 137, 138,
    222, 121, 50, 124, 46, 165, 125, 78, 62, 38, 35, 140, 4, 70, 222, 238, 113,
    112, 235, 29, 234, 197, 79, 41, 177, 23, 248, 222, 213, 194, 49, 54, 203,
    195, 133, 91, 51, 121, 116, 146, 225, 249, 18, 114, 101, 35, 81, 166, 73,
    85, 133, 189, 38, 10, 254, 49, 174, 113, 108, 1, 83, 241, 53, 199, 203, 30,
    186, 130, 34, 79, 140, 7, 110, 148, 229, 35, 243, 65, 64, 86, 192, 17, 242,
    161, 4, 185, 163, 84, 9, 246, 146, 73, 123, 190, 199, 181, 112, 210, 197,
    159, 141, 207, 225, 120, 43, 24, 41, 82, 87, 10, 84, 162, 92, 183, 177, 243,
    222, 158, 228, 118, 240, 151, 210, 195, 218, 150, 94, 67, 103, 220, 230, 64,
    197, 6, 7, 94, 84, 90, 129, 219, 28, 60, 207, 11, 129, 228, 182, 57, 40, 49,
    65, 120, 161, 125, 29, 212, 190, 50, 167, 125, 229, 30, 223, 235, 185, 126,
    184, 120, 131, 13, 151, 254, 5, 124, 9, 48, 0, 22, 180, 212, 219, 245, 225,
    123, 11, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
  ];
  gifGun.__settingsIconHover = [
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 20,
    0, 0, 0, 20, 8, 6, 0, 0, 0, 141, 137, 29, 13, 0, 0, 0, 25, 116, 69, 88, 116,
    83, 111, 102, 116, 119, 97, 114, 101, 0, 65, 100, 111, 98, 101, 32, 73, 109,
    97, 103, 101, 82, 101, 97, 100, 121, 113, 201, 101, 60, 0, 0, 1, 0, 73, 68,
    65, 84, 120, 218, 180, 85, 129, 17, 131, 32, 12, 196, 94, 7, 112, 131, 50,
    130, 35, 216, 13, 28, 161, 35, 208, 13, 186, 129, 221, 128, 81, 28, 1, 55,
    192, 13, 58, 2, 77, 188, 239, 53, 229, 98, 203, 245, 48, 119, 17, 208, 240,
    36, 159, 16, 141, 81, 36, 165, 100, 73, 91, 177, 158, 210, 91, 2, 233, 200,
    54, 230, 151, 48, 8, 140, 89, 30, 164, 29, 105, 143, 245, 5, 115, 254, 30,
    249, 144, 18, 176, 0, 32, 151, 121, 53, 101, 182, 183, 45, 192, 163, 152,
    179, 1, 135, 113, 110, 154, 102, 166, 241, 206, 192, 52, 46, 164, 179, 178,
    151, 105, 233, 105, 236, 72, 79, 180, 231, 154, 123, 199, 158, 141, 166, 64,
    64, 69, 128, 247, 81, 221, 139, 48, 162, 41, 20, 56, 97, 49, 119, 0, 183,
    57, 96, 42, 202, 158, 126, 64, 92, 189, 164, 135, 23, 228, 123, 197, 139,
    143, 228, 200, 114, 202, 108, 253, 26, 33, 12, 157, 102, 8, 0, 230, 106,
    128, 6, 45, 187, 34, 58, 255, 2, 236, 55, 78, 101, 25, 196, 122, 200, 105,
    17, 117, 202, 21, 97, 14, 255, 240, 69, 37, 178, 124, 35, 179, 122, 200, 53,
    147, 18, 234, 151, 205, 46, 133, 93, 253, 234, 101, 157, 166, 19, 239, 29,
    146, 97, 181, 107, 138, 146, 113, 104, 105, 237, 46, 237, 107, 191, 6, 91,
    235, 23, 240, 20, 96, 0, 154, 210, 120, 201, 244, 251, 198, 15, 0, 0, 0, 0,
    73, 69, 78, 68, 174, 66, 96, 130,
  ];
  gifGun.__folderIcon = [
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 16,
    0, 0, 0, 14, 8, 6, 0, 0, 0, 38, 47, 156, 138, 0, 0, 0, 25, 116, 69, 88, 116,
    83, 111, 102, 116, 119, 97, 114, 101, 0, 65, 100, 111, 98, 101, 32, 73, 109,
    97, 103, 101, 82, 101, 97, 100, 121, 113, 201, 101, 60, 0, 0, 0, 129, 73,
    68, 65, 84, 120, 218, 98, 60, 112, 224, 64, 3, 3, 3, 67, 61, 3, 118, 176,
    192, 193, 193, 33, 145, 1, 31, 0, 26, 240, 31, 106, 8, 186, 184, 1, 16, 191,
    7, 226, 249, 248, 244, 51, 130, 12, 0, 218, 194, 136, 195, 112, 3, 32, 181,
    31, 136, 5, 112, 232, 111, 100, 193, 103, 58, 208, 224, 11, 64, 74, 16, 135,
    225, 96, 175, 51, 49, 144, 9, 128, 134, 131, 189, 77, 182, 1, 48, 192, 2,
    11, 72, 138, 12, 0, 2, 71, 50, 245, 239, 167, 200, 118, 144, 94, 138, 195,
    96, 144, 24, 0, 74, 20, 64, 44, 64, 162, 255, 27, 96, 73, 25, 95, 102, 34,
    4, 26, 1, 2, 12, 0, 39, 144, 55, 198, 91, 142, 134, 48, 0, 0, 0, 0, 73, 69,
    78, 68, 174, 66, 96, 130,
  ];
  gifGun.__folderIconHover = [
    137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0, 16,
    0, 0, 0, 14, 8, 6, 0, 0, 0, 38, 47, 156, 138, 0, 0, 0, 25, 116, 69, 88, 116,
    83, 111, 102, 116, 119, 97, 114, 101, 0, 65, 100, 111, 98, 101, 32, 73, 109,
    97, 103, 101, 82, 101, 97, 100, 121, 113, 201, 101, 60, 0, 0, 0, 122, 73,
    68, 65, 84, 120, 218, 98, 44, 254, 125, 179, 129, 129, 129, 161, 158, 1, 59,
    88, 208, 203, 170, 158, 200, 128, 15, 0, 13, 248, 15, 53, 4, 93, 220, 0,
    136, 223, 3, 241, 124, 124, 250, 25, 65, 6, 0, 109, 97, 196, 97, 184, 1,
    144, 218, 15, 196, 2, 56, 244, 55, 130, 93, 192, 64, 6, 0, 185, 26, 164,
    151, 137, 129, 76, 0, 116, 53, 216, 219, 100, 27, 0, 3, 44, 176, 128, 164,
    200, 0, 32, 112, 36, 83, 255, 126, 138, 108, 167, 40, 16, 97, 96, 144, 24,
    0, 77, 20, 2, 164, 38, 36, 88, 82, 198, 151, 153, 8, 129, 70, 128, 0, 3, 0,
    162, 7, 60, 137, 207, 178, 21, 161, 0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96,
    130,
  ];
  gifGun.iconsBinaries = [
    gifGun.__settingsIcon,
    gifGun.__settingsIconHover,
    gifGun.__folderIcon,
    gifGun.__folderIconHover,
  ];
})(gifGun || (gifGun = {}));
(function (gifGun) {
  gifGun.buildWatUI = function (thisObj, reg) {
    thisObj.gifGunWAT = new Window(
      "palette",
      thisObj.scriptTitle + " v" + thisObj.version,
      undefined,
      { resizeable: false },
    );
    thisObj.gifGunWAT.alignChildren = ["left", "top"];
    var logoFile = [
      137, 80, 78, 71, 13, 10, 26, 10, 0, 0, 0, 13, 73, 72, 68, 82, 0, 0, 0,
      138, 0, 0, 0, 35, 8, 3, 0, 0, 0, 124, 74, 98, 112, 0, 0, 0, 96, 80, 76,
      84, 69, 0, 0, 0, 220, 237, 220, 220, 237, 220, 220, 237, 220, 220, 237,
      220, 255, 246, 161, 220, 237, 220, 220, 237, 220, 220, 237, 220, 220, 237,
      220, 255, 246, 161, 220, 237, 220, 220, 237, 220, 220, 237, 220, 220, 237,
      220, 255, 246, 161, 255, 246, 161, 255, 246, 161, 255, 246, 161, 220, 237,
      220, 255, 246, 161, 220, 237, 220, 255, 246, 161, 220, 237, 220, 255, 246,
      161, 255, 246, 161, 255, 246, 161, 255, 246, 161, 255, 246, 161, 255, 246,
      161, 255, 246, 161, 220, 237, 220, 45, 148, 31, 228, 0, 0, 0, 30, 116, 82,
      78, 83, 0, 128, 191, 64, 96, 239, 207, 48, 223, 143, 48, 16, 239, 159, 32,
      175, 16, 207, 133, 112, 223, 175, 159, 80, 191, 64, 96, 32, 80, 112, 32,
      199, 105, 201, 0, 0, 2, 116, 73, 68, 65, 84, 88, 195, 205, 151, 235, 146,
      162, 48, 16, 70, 191, 164, 3, 132, 59, 138, 92, 188, 108, 250, 253, 223,
      114, 153, 33, 8, 74, 130, 142, 181, 197, 236, 249, 97, 197, 174, 182, 114,
      236, 36, 29, 0, 144, 148, 198, 152, 254, 140, 103, 46, 167, 33, 222, 94,
      177, 31, 151, 192, 124, 83, 86, 88, 82, 245, 99, 56, 72, 176, 23, 73, 96,
      44, 167, 196, 25, 14, 42, 236, 68, 105, 238, 4, 183, 185, 84, 102, 166,
      197, 78, 152, 37, 71, 27, 60, 46, 131, 39, 236, 132, 153, 153, 118, 239,
      249, 240, 24, 196, 78, 152, 39, 14, 253, 233, 41, 18, 96, 39, 14, 230, 21,
      45, 188, 68, 181, 16, 162, 75, 97, 161, 98, 138, 83, 241, 144, 162, 10,
      188, 193, 217, 188, 34, 129, 7, 165, 153, 67, 153, 49, 75, 26, 3, 44, 198,
      217, 67, 182, 35, 116, 161, 77, 9, 213, 219, 71, 200, 207, 17, 110, 82,
      201, 178, 195, 64, 81, 107, 142, 151, 42, 58, 35, 140, 228, 54, 37, 85,
      33, 75, 188, 164, 58, 153, 45, 14, 62, 147, 48, 235, 48, 33, 8, 51, 29,
      207, 38, 245, 92, 66, 245, 94, 147, 243, 226, 111, 112, 13, 71, 112, 35,
      244, 52, 96, 133, 31, 114, 51, 62, 252, 109, 159, 88, 192, 167, 98, 151,
      162, 224, 28, 239, 145, 18, 193, 114, 52, 62, 46, 240, 208, 104, 172, 145,
      10, 136, 164, 206, 164, 252, 26, 197, 92, 184, 82, 30, 71, 50, 2, 73, 30,
      136, 237, 57, 236, 141, 155, 18, 62, 56, 118, 5, 5, 80, 8, 169, 133, 16,
      4, 232, 198, 153, 242, 56, 98, 138, 89, 42, 26, 62, 243, 237, 19, 125,
      133, 7, 98, 114, 207, 51, 47, 80, 202, 245, 59, 42, 211, 214, 142, 121,
      179, 209, 149, 240, 171, 68, 27, 42, 179, 237, 107, 149, 73, 56, 154, 84,
      90, 79, 75, 241, 171, 224, 31, 169, 104, 88, 62, 168, 202, 122, 30, 30,
      144, 43, 149, 136, 187, 167, 20, 167, 74, 124, 255, 254, 225, 94, 137, 88,
      45, 188, 136, 194, 149, 138, 253, 54, 167, 228, 78, 149, 217, 151, 183,
      239, 196, 30, 110, 86, 199, 67, 58, 84, 100, 136, 37, 194, 173, 66, 143,
      42, 237, 143, 47, 32, 8, 46, 94, 169, 40, 166, 13, 21, 114, 170, 92, 140,
      159, 27, 220, 164, 153, 196, 2, 215, 2, 65, 135, 41, 102, 226, 239, 112,
      54, 169, 228, 46, 149, 196, 152, 15, 58, 191, 90, 182, 245, 156, 93, 42,
      180, 76, 81, 99, 138, 108, 166, 205, 230, 80, 169, 130, 237, 155, 185,
      130, 155, 152, 27, 187, 70, 133, 228, 204, 165, 2, 197, 97, 100, 83, 26,
      30, 11, 23, 103, 197, 183, 73, 214, 56, 84, 250, 79, 31, 226, 84, 198,
      185, 34, 170, 27, 214, 36, 157, 42, 32, 205, 77, 77, 164, 114, 206, 212,
      24, 46, 50, 173, 168, 203, 89, 166, 107, 149, 139, 121, 197, 25, 30, 210,
      58, 228, 1, 169, 82, 196, 241, 124, 195, 169, 120, 145, 162, 36, 15, 132,
      117, 58, 133, 163, 175, 223, 104, 181, 184, 14, 45, 242, 141, 103, 219,
      18, 59, 177, 154, 248, 88, 26, 243, 63, 188, 124, 148, 87, 0, 215, 254,
      247, 85, 130, 139, 13, 254, 249, 149, 183, 195, 214, 217, 67, 110, 193,
      178, 227, 238, 196, 53, 112, 118, 144, 228, 112, 47, 74, 133, 189, 72, 2,
      231, 159, 175, 142, 214, 36, 193, 126, 84, 237, 201, 4, 237, 122, 198,
      115, 57, 136, 28, 247, 171, 201, 95, 80, 14, 131, 190, 227, 241, 218, 127,
      0, 0, 0, 0, 73, 69, 78, 68, 174, 66, 96, 130,
    ];
    var fldr = new Folder(Folder.userData.fullName + "/Aescripts/gifGun/");
    fldr.create();
    iconFile = new File(fldr.fullName + "/gifGunIconFileWat.png");
    iconFile.encoding = "BINARY";
    iconFile.open("w");
    iconFile.write(thisObj.bin10ToString(logoFile));
    iconFile.close();
    var prefix = "open ";
    if ($.os.substr(0, 7).toLowerCase() == "windows") {
      prefix = "explorer ";
    }
    thisObj.link1 = prefix + "http://twitter.com/extrabitesoft";
    thisObj.link5 = prefix + "https://www.facebook.com/messages/t/gifgunae";
    var mainGroup = thisObj.gifGunWAT.add(
      "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], spacing: 0}",
    );
    mainGroup.add("image", undefined, iconFile);
    var txtGroup = mainGroup.add(
      "group{spacing: 0, margins:[2,10,0,0], alignChildren: [\'left\', \'top\'], orientation: \'column\'}",
    );
    txtGroup
      .add("group{margins:[0,10,0,0]}")
      .add(
        "statictext",
        undefined,
        "GifGun is the one click GIF making tool for After Effects.\n\nNot much to say here, it just works.\n\nFor any questions or support:",
        { multiline: true },
      );
    var txt0 = txtGroup.add("statictext", undefined, "Hit us up on Twitter");
    txt0.addEventListener("mouseup", function (k) {
      if (k.button === 0) {
        system.callSystem(thisObj.link1);
      }
    });
    gifGun.setFG(txt0, [67, 170, 207, 255] / 255);
    var txt1 = txtGroup.add("statictext", undefined, "Or on Facebook");
    txt1.addEventListener("mouseup", function (k) {
      if (k.button == 0) {
        system.callSystem(thisObj.link5);
      }
    });
    gifGun.setFG(txt1, [67, 170, 207, 255] / 255);
    if (thisObj.kektek === false) {
      var registration = reg.getRegistration();
      registration = registration.replace(":", ":\n");
      txtGroup.add("statictext", undefined, "");
      var registration_text = txtGroup.add(
        "statictext",
        undefined,
        registration,
        { multiline: true },
      );
      gifGun.setFG(registration_text, [0.4, 0.4, 0.4, 1]);
      registration_text.preferredSize[0] = 160;
      var remove_licence_btn = txtGroup.add(
        "statictext",
        undefined,
        "[ Remove license ]",
        { multiline: true },
      );
      gifGun.setFG(remove_licence_btn, [0.4, 0.4, 0.4, 1]);
      remove_licence_btn.preferredSize[0] = 160;
      remove_licence_btn.addEventListener("mouseup", function () {
        if (reg.r()) {
          thisObj.kektek = true;
          thisObj.s.close();
          thisObj.gifGunWAT.close();
        }
      });
    } else {
      var txt2 = txtGroup.add(
        "statictext",
        undefined,
        "\nYOU ARE IN TRIAL MODE\n-Width is limited to 350px\n-FPS is limited to 15\n-Only Low compression is available",
        { multiline: true },
      );
      gifGun.setFG(txt2, [0.4, 0.4, 0.4, 1]);
    }
    if (
      app.settings.haveSetting("aeupdates_gifgun", "statsEnabled") === false
    ) {
      statsState = "true";
    } else {
      statsState = app.settings.getSetting("aeupdates_gifgun", "statsEnabled");
    }
    statsState = statsState === "true";
    if (
      app.settings.haveSetting("aeupdates_gifgun", "statsEnabled") === false
    ) {
      app.settings.saveSetting("aeupdates_gifgun", "statsEnabled", statsState);
    } else {
      statsState = app.settings.getSetting("aeupdates_gifgun", "statsEnabled");
    }
    var stats = txtGroup
      .add("group{margins:[0,5,0,0]}")
      .add("statictext", undefined, "Anonymous statistics: disabled", {
        multiline: true,
      });
    gifGun.setFG(stats, [0.4, 0.4, 0.4, 1]);
    if (statsState === "true") {
      stats.text = "Anonymous statistics: enabled ";
    } else {
      stats.text = "Anonymous statistics: disabled";
    }
    stats.addEventListener("mouseup", function (k) {
      if (k.button == 0) {
        statsState = !statsState;
        if (statsState === true) {
          stats.text = "Anonymous statistics: enabled ";
        } else {
          stats.text = "Anonymous statistics: disabled";
        }
        app.settings.saveSetting(
          "aeupdates_gifgun",
          "statsEnabled",
          statsState,
        );
      }
    });
    var debugLine = "";
    if (gifGun.godMode) {
      debugLine += "G";
    }
    if (gifGun.devMode) {
      debugLine += "D";
    }
    if (gifGun.logMode) {
      debugLine += "L";
    }
    if (debugLine.length) {
      var debugDisplay = txtGroup
        .add("group{margins:[0,5,0,0]}")
        .add("statictext", undefined, debugLine, { multiline: false });
      gifGun.setFG(debugDisplay, [0.9, 0.2, 0.2, 1]);
    }
    if (thisObj.gifGunWAT instanceof Window) {
      thisObj.gifGunWAT.center();
      thisObj.gifGunWAT.show();
    } else {
      thisObj.gifGunWAT.layout.layout(true);
    }
  };
})(gifGun || (gifGun = {}));
(function (gifGun) {
  gifGun.buildGUIsettings = function (thisObj, reg) {
    gifGun.getPrefs();
    var updateResolutionState = function () {
      resWidth.enabled = resChkbx.value;
    };
    var updateFolderState = function () {
      folderInput.enabled = gifGun.customFolder;
      gifGun.customFolder
        ? chooseFolderBttn.setEnabled()
        : chooseFolderBttn.setDisabled();
    };
    var syncOutputValueListWithAlpha = function () {
      outputValue.enabled = !keepAlpha.value;
    };
    thisObj.s = new Window("palette{margins: 5}", "Settings", undefined, {
      resizeable: false,
    });
    thisObj.s.alignChildren = ["left", "top"];
    var mainGroup = thisObj.s.add(
      "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins: 0, spacing: 0}",
    );
    var folderGroup = mainGroup.add(
      "group{orientation: \'column\', alignChildren: [\'left\', \'top\'], spacing: 0, margins: [0,0,0,0]}",
    );
    var outputToRadioGroup = folderGroup.add(
      "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins:[5,5,0,0], spacing:5}",
    );
    outputToRadioGroup.add(
      "radiobutton",
      undefined,
      gifGun.names.prjFldr.name,
    ).helpTip = gifGun.names.prjFldr.hlpTip;
    outputToRadioGroup.add(
      "radiobutton",
      undefined,
      gifGun.names.cstmFldr.name,
    ).helpTip = gifGun.names.cstmFldr.hlpTip;
    outputToRadioGroup.children[0].value = gifGun.customFolder !== "true";
    outputToRadioGroup.children[1].value = gifGun.customFolder === "true";
    var folderLine = folderGroup.add(
      "group{orientation:\'row\', alignChildren: [\'left\', \'top\'], spacing:0, margins: [5,5,0,10]}",
    );
    var folderTextHolder = folderLine.add(
      "group{orientation:\'stack\', alignChildren: [\'center\', \'center\']}",
    );
    folderTextHolder.preferredSize = [160, 32];
    var folderInput = folderTextHolder
      .add("group{spacing:0, margins:0}")
      .add("edittext", undefined, gifGun.gifFolder, { readonly: true });
    folderInput.helpTip = gifGun.names.fldrLine.hlpTip;
    folderInput.preferredSize = [162, 30];
    var chooseFolderBttn = gifGun.addNewBttn(
      thisObj,
      folderLine,
      [32, 32],
      "",
      thisObj.iconsFiles[2],
      thisObj.iconsFiles[3],
      true,
    );
    chooseFolderBttn.helpTip = gifGun.names.fldrBttn.hlpTip;
    gifGun.customFolder = gifGun.customFolder === "true";
    updateFolderState();
    mainGroup.add("panel{margins:[0,0,0,0], spacing:0}", [0, 0, 200, 1]);
    var optionsPanel = mainGroup.add(
      "group{orientation:\'column\', text: \'\', alignChildren: [\'left\', \'top\'], margins: [5,10,5,0], spacing: 0}",
    );
    var resLine = optionsPanel.add(
      "group{orientation:\'row\', margins: [0,0,0,8], spacing: 0}",
    );
    var resChkbx = resLine
      .add(
        "group{orientation:\'row\', alignChildren: [\'left\', \'center\'], margins: [0,3,0,0], preferredSize: [117, 25]}",
      )
      .add("checkbox", undefined, gifGun.names.resToWidth.name);
    resChkbx.alignment = "left";
    resChkbx.helpTip = gifGun.names.resToWidth.hlpTip;
    resChkbx.value = gifGun.resChkbx === "true";
    var resolutionLine = resLine.add("group{orientation:\'row\'}");
    var resWidth = resolutionLine.add("edittext");
    resWidth.preferredSize = [76, 28];
    resWidth.text = thisObj.resWidth;
    updateResolutionState();
    var fpsList = ["as comp", "10", "12", "15", "20", "25", "30"];
    var fpsGroup = optionsPanel.add(
      "group{orientation:\'row\', margins: [0,0,0,8], spacing: 0}",
    );
    fpsGroup
      .add(
        "group{orientation:\'row\', alignChildren: [\'left\', \'center\'], preferredSize: [88,25], size: [88,25]}",
      )
      .add("statictext", undefined, gifGun.names.fps.name);
    var fpsValue = fpsGroup.add("dropdownlist", undefined, fpsList);
    fpsValue.helpTip = gifGun.names.fpsList.hlpTip;
    fpsValue.selection = gifGun.helpers.lastIndexOf(
      fpsList,
      String(gifGun.fps),
    );
    fpsValue.preferredSize = [105, 28];
    var colorList = ["256", "128", "64", "32", "16", "8"];
    var replacebleDropdowns = optionsPanel.add("group{orientation:\'stack\'}");
    var renderQualityGroup = replacebleDropdowns.add(
      "group{orientation:\'row\', margins: [0,0,0,8], spacing: 0}",
    );
    renderQualityGroup
      .add(
        "group{orientation:\'row\', alignChildren: [\'left\', \'center\'], preferredSize: [88,25], size: [88,25]}",
      )
      .add("statictext", undefined, gifGun.names.qualityRender.name);
    var qualityRender = renderQualityGroup.add(
      "dropdownlist",
      undefined,
      gifGun.names.qualityRenderListContent,
    );
    qualityRender.helpTip = gifGun.names.qualityRenderList.hlpTip;
    qualityRender.selection = Number(gifGun.qualityRender);
    qualityRender.preferredSize = [105, 28];
    var maxColorsGroup = replacebleDropdowns.add(
      "group{orientation:\'row\', margins: [0,0,0,8], spacing: 0}",
    );
    maxColorsGroup
      .add(
        "group{orientation:\'row\', alignChildren: [\'left\', \'center\'], preferredSize: [88,25], size: [88,25]}",
      )
      .add("statictext", undefined, gifGun.names.maxColors.name);
    var maxColors = maxColorsGroup.add("dropdownlist", undefined, colorList);
    maxColors.helpTip = gifGun.names.colorList.hlpTip;
    maxColors.selection = gifGun.helpers.lastIndexOf(
      colorList,
      gifGun.maxColors,
    );
    maxColors.preferredSize = [105, 28];
    if (gifGun.experimentalRender === "1") {
      renderQualityGroup.visible = true;
      maxColorsGroup.visible = false;
    } else {
      renderQualityGroup.visible = false;
      maxColorsGroup.visible = true;
    }
    var outputGroup = optionsPanel.add(
      "group{orientation:\'row\', margins: [0,0,0,8], spacing: 0}",
    );
    outputGroup
      .add(
        "group{orientation:\'row\', alignChildren: [\'left\', \'center\'], preferredSize: [88,25], size: [88,25]}",
      )
      .add("statictext", undefined, gifGun.names.renderWith.name);
    if (typeof gifGun.outputModules === "string") {
      gifGun.outputModules = gifGun.outputModules.split(",");
    }
    var outputValue = outputGroup.add(
      "dropdownlist",
      undefined,
      gifGun.outputModules,
    );
    outputValue.helpTip = gifGun.names.outputList.hlpTip;
    if (gifGun.helpers.lastIndexOf(gifGun.outputModules, gifGun.output) == -1) {
      gifGun.getOutputSettings(true);
      outputValue.value = gifGun.outputModules;
      outputValue.selection = 1;
    } else {
      outputValue.selection = gifGun.helpers.lastIndexOf(
        gifGun.outputModules,
        gifGun.output,
      );
    }
    outputValue.preferredSize = [105, 28];
    outputValue.updateItems = function (newItems) {
      outputValue.selection = 0;
      var items = outputValue.items;
      for (var i = items.length; i >= 0; i--) {
        outputValue.remove(items[i]);
      }
      for (var i = 0; i < newItems.length; i += 1) {
        outputValue.add("item", newItems[i], i);
      }
      outputValue.selection = 0;
    };
    var lossyGroup = optionsPanel.add(
      "group{orientation:\'row\', margins: [0,0,0,8], spacing: 0}",
    );
    lossyGroup
      .add(
        "group{orientation:\'row\', alignChildren: [\'left\', \'center\'], preferredSize: [88,25], size: [88,25]}",
      )
      .add("statictext", undefined, "Compress");
    var lossyQualityValue = lossyGroup.add(
      "dropdownlist",
      undefined,
      gifGun.names.lossyQualityList,
    );
    lossyQualityValue.helpTip = gifGun.names.lossyQualityValue.hlpTip;
    lossyQualityValue.selection = Number(gifGun.lossyQuality);
    lossyQualityValue.preferredSize = [105, 28];
    var renderSpeedGroup = optionsPanel.add(
      "group{orientation: \'column\', spacing: 5, margins:[0,5,0,0]}",
    );
    var keepAlpha = renderSpeedGroup.add(
      "checkbox",
      undefined,
      gifGun.names.keepAlpha.name,
    );
    keepAlpha.helpTip = gifGun.names.keepAlpha.hlpTip;
    keepAlpha.value = gifGun.keepAlpha === "1";
    keepAlpha.alignment = ["left", "top"];
    syncOutputValueListWithAlpha();
    var renderSpeed = renderSpeedGroup.add(
      "checkbox",
      undefined,
      gifGun.names.renderSpeed.name,
    );
    renderSpeed.helpTip = gifGun.names.renderSpeed.hlpTip;
    renderSpeed.value = gifGun.renderSpeed === "true";
    renderSpeed.alignment = ["left", "top"];
    if (gifGun.pixelart === true || gifGun.pixelart === "true") {
      renderSpeed.value = false;
      renderSpeed.enabled = false;
    }
    var experimentalRender = renderSpeedGroup.add(
      "checkbox",
      undefined,
      gifGun.names.experimentalRender.name,
    );
    experimentalRender.helpTip = gifGun.names.experimentalRender.hlpTip;
    experimentalRender.value = gifGun.experimentalRender === "1";
    experimentalRender.alignment = ["left", "top"];
    if (gifGun.AEversion < 13.8) {
      renderSpeed.enabled = false;
      renderSpeed.helpTip = gifGun.names.renderSpeed.hlpTip2;
    }
    var pixelart = renderSpeedGroup.add(
      "checkbox",
      undefined,
      gifGun.names.pixelart.name,
    );
    pixelart.helpTip = gifGun.names.pixelart.hlpTip;
    pixelart.value = gifGun.pixelart === "true";
    pixelart.alignment = ["left", "top"];
    if (gifGun.AEversion < 13.8) {
      pixelart.enabled = false;
      pixelart.helpTip = gifGun.names.pixelart.hlpTip2;
    }
    mainGroup
      .add("group{margins:[0,5,0,0]}")
      .add("panel{margins:[0,0,0,0], spacing:0}", [0, 0, 200, 2]);
    var chkbxPanel = mainGroup.add(
      "group{orientation:\'column\',text: \'\', alignChildren: [\'left\', \'top\'], margins: [5,10,5,5], spacing: 0}",
    );
    var removeAfterChkbx = chkbxPanel.add(
      "checkbox",
      undefined,
      gifGun.names.saveVideoCopy.name,
    );
    removeAfterChkbx.helpTip = gifGun.names.saveVideoCopy.hlpTip;
    removeAfterChkbx.value = gifGun.removeAfterChkbx === "true";
    var loopChkbxLine = chkbxPanel.add(
      "group{orientation:\'row\', margins:[0,0,0,0], alignChildren: [\'left\', \'bottom\']}",
    );
    var loopCheckbox = loopChkbxLine
      .add("group{}")
      .add("checkbox", undefined, gifGun.names.loopGif.name);
    loopCheckbox.helpTip = gifGun.names.loopGif.hlpTip;
    loopCheckbox.value = gifGun.loopChkbx === "1" ? true : false;
    var loopEdit = loopChkbxLine
      .add("group{margins: [63,0,0,0]}")
      .add("edittext", undefined, "1");
    loopEdit.size = [40, 25];
    loopEdit.enabled = loopCheckbox.value;
    loopEdit.text = gifGun.loopEditField;
    var loopEditUpdateState = function () {
      if (keepAlpha.value || experimentalRender.value) {
        loopEdit.enabled = false;
      } else {
        loopEdit.enabled = !loopCheckbox.value;
      }
    };
    loopEditUpdateState();
    gifGun.openFldrChkbx = gifGun.openFldrChkbx === "true";
    var openFldrChkbx = chkbxPanel
      .add("group{margins:[0,5,0,0]}")
      .add("checkbox", undefined, gifGun.names.openFldr.name);
    openFldrChkbx.helpTip = gifGun.names.openFldr.hlpTip;
    openFldrChkbx.value = gifGun.openFldrChkbx;
    var okBttnGroup = mainGroup
      .add("group{margins:[5,0,0,5]}")
      .add("group{orientation: \'row\', spacing: 3}");
    var OKbbtn = gifGun.addNewBttn(
      thisObj,
      okBttnGroup,
      [160, 30],
      "DONE",
      "",
      "",
      false,
    );
    OKbbtn.helpTip = gifGun.names.doneBttn.hlpTip;
    var watBttn = gifGun.addNewBttn(
      thisObj,
      okBttnGroup,
      [30, 30],
      "?",
      "",
      "",
      false,
    );
    var numFilter = /(\d*)/;
    resWidth.onChanging = function () {
      resWidth.text = resWidth.text.match(numFilter)[0];
    };
    outputValue.onChange = function () {
      if (
        outputValue.selection &&
        outputValue.selection.text === "[UPDATE PRESETS]"
      ) {
        gifGun.outputModules = gifGun.getOutputSettings(true);
        gifGun.createTemplate();
        outputValue.value = gifGun.outputModules;
        outputValue.updateItems(gifGun.outputModules);
        outputValue.selection = 1;
      }
    };
    watBttn.addEventListener("click", function (e) {
      if (e.target === e.currentTarget) {
        thisObj.buildWatUI(thisObj, reg);
      }
    });
    chooseFolderBttn.addEventListener("click", function (e) {
      if (e.target === e.currentTarget && gifGun.customFolder) {
        var mainPassFile = Folder.selectDialog("Select a folder for all GIFs");
        if (mainPassFile) {
          folderInput.text = mainPassFile.fsName;
          gifGun.gifFolder = mainPassFile.fsName;
          if (gifGun.gifFolder.indexOf("IDKFA") !== -1) {
            gifGun.logMode = true;
          }
          if (gifGun.gifFolder.indexOf("IDSPISPOPD") !== -1) {
            gifGun.devMode = true;
          }
          gifGun.setPrefs();
        }
        return null;
      }
    });
    OKbbtn.addEventListener("click", function (e) {
      if (e.target === e.currentTarget) {
        gifGun.resWidth = resWidth.text;
        gifGun.resChkbx = resChkbx.value;
        gifGun.customFolder = String(outputToRadioGroup.children[1].value);
        gifGun.removeAfterChkbx = removeAfterChkbx.value;
        gifGun.renderSpeed = renderSpeed.value;
        gifGun.experimentalRender = experimentalRender.value;
        gifGun.pixelart = pixelart.value;
        if (experimentalRender.value === true) {
          gifGun.experimentalRender = "1";
          if (qualityRender) {
            gifGun.qualityRender = qualityRender.selection.index;
          }
        } else {
          gifGun.experimentalRender = "0";
          if (maxColors) {
            gifGun.maxColors = maxColors.selection.text;
          }
        }
        if (keepAlpha.value === true) {
          gifGun.keepAlpha = "1";
        } else {
          gifGun.keepAlpha = "0";
        }
        if (loopCheckbox.value) {
          gifGun.loopChkbx = "1";
          gifGun.loops = "0";
        } else {
          gifGun.loopChkbx = "0";
          if (!keepAlpha.value && !experimentalRender.value) {
            loopEdit.text === "0"
              ? (gifGun.loops = "-1")
              : (gifGun.loops = loopEdit.text);
          } else {
            gifGun.loops = "-1";
          }
        }
        gifGun.loopEditField = loopEdit.text;
        gifGun.fps = fpsValue.selection.text;
        gifGun.output = outputValue.selection.text;
        gifGun.lossyQuality = lossyQualityValue.selection.index;
        gifGun.openFldrChkbx = openFldrChkbx.value;
        gifGun.gifFolder = folderInput.text;
        gifGun.setPrefs();
        thisObj.s.close();
      }
    });
    resChkbx.onClick = function () {
      if (gifGun.kektek === true && resChkbx.value === false) {
        resChkbx.value = true;
      }
      updateResolutionState();
    };
    keepAlpha.onClick = function () {
      gifGun.checkIfAlphaPresetOK();
      syncOutputValueListWithAlpha();
      if (keepAlpha.value) {
        experimentalRender.value = false;
        experimentalRender.enabled = false;
        experimentalRender.helpTip = gifGun.names.experimentalRender.hlpTip2;
      } else {
        experimentalRender.enabled = true;
        experimentalRender.helpTip = gifGun.names.experimentalRender.hlpTip;
      }
      loopEditUpdateState();
    };
    loopCheckbox.onClick = loopEditUpdateState;
    experimentalRender.onClick = function () {
      gifGun.experimentalRender = experimentalRender.value;
      if (experimentalRender.value) {
        renderQualityGroup.visible = true;
        maxColorsGroup.visible = false;
      } else {
        renderQualityGroup.visible = false;
        maxColorsGroup.visible = true;
      }
      if (experimentalRender.value) {
        keepAlpha.value = false;
        keepAlpha.enabled = false;
        keepAlpha.helpTip = gifGun.names.keepAlpha.hlpTip2;
        syncOutputValueListWithAlpha();
      } else {
        keepAlpha.enabled = true;
        keepAlpha.helpTip = gifGun.names.keepAlpha.hlpTip;
        syncOutputValueListWithAlpha();
      }
      loopEditUpdateState();
    };
    pixelart.onClick = function () {
      gifGun.pixelart = pixelart.value;
      if (pixelart.value) {
        renderSpeed.value = false;
        renderSpeed.enabled = false;
        renderSpeed.helpTip = gifGun.names.renderSpeed.hlpTip3;
      } else {
        renderSpeed.enabled = true;
        renderSpeed.helpTip = gifGun.names.renderSpeed.hlpTip;
      }
    };
    loopEdit.onChanging = function () {
      loopEdit.text = loopEdit.text.match(numFilter)[0];
    };
    loopEdit.onChange = function () {
      if (loopEdit.text.length === 0) {
        loopEdit.text = "1";
      } else {
        loopEdit.text = String(Number(loopEdit.text));
      }
    };
    outputToRadioGroup.children[0].onClick = function () {
      gifGun.customFolder = false;
      updateFolderState();
    };
    outputToRadioGroup.children[1].onClick = function () {
      gifGun.customFolder = true;
      updateFolderState();
    };
    if (thisObj.s instanceof Window) {
      thisObj.s.center();
      thisObj.s.show();
    } else {
      thisObj.s.layout.layout(true);
    }
  };
})(gifGun || (gifGun = {}));
if (typeof JSON !== "object") {
  JSON = {};
}
var updater = {};
(function () {
  updater.MHNG_getCurrEpochTimeInMilSeconds = function () {
    var D = new Date();
    if (D && D.setUTCDate) {
      return parseInt(D.setUTCDate());
    } else {
      return 512;
    }
  };
  (function () {
    if (app.settings.haveSetting("aeupdates", "user_uid") == false) {
      uid = new Date();
      uid = updater.MHNG_getCurrEpochTimeInMilSeconds(uid).toString();
      app.settings.saveSetting("aeupdates", "user_uid", uid);
    } else {
      uid = app.settings.getSetting("aeupdates", "user_uid");
    }
    updater.MHNG_USER_UID = uid;
  })();
  updater.MHNG_getPrefs = function (script_postfix) {
    if (
      app.settings.haveSetting("aeupdates_" + script_postfix, "last_checked") ==
      false
    ) {
      updater.MHNG_lastChecked = "0";
    } else {
      updater.MHNG_lastChecked = parseInt(
        app.settings.getSetting("aeupdates_" + script_postfix, "last_checked"),
      );
    }
    if (
      app.settings.haveSetting(
        "aeupdates_" + script_postfix,
        "skip_if_version",
      ) == false
    ) {
      updater.MHNG_skipVersion = "-1337";
    } else {
      updater.MHNG_skipVersion = app.settings.getSetting(
        "aeupdates_" + script_postfix,
        "skip_if_version",
      );
    }
    if (
      app.settings.haveSetting(
        "aeupdates_" + script_postfix,
        "check_for_updates",
      ) === false
    ) {
      updater.MHNG_check_for_updates = "true";
    } else {
      updater.MHNG_check_for_updates = app.settings.getSetting(
        "aeupdates_" + script_postfix,
        "check_for_updates",
      );
    }
    if (
      app.settings.haveSetting(
        "aeupdates_" + script_postfix,
        "statsEnabled",
      ) === false
    ) {
      updater.statsEnabled = "true";
    } else {
      updater.statsEnabled = app.settings.getSetting(
        "aeupdates_" + script_postfix,
        "statsEnabled",
      );
    }
  };
  updater.MHNG_setPrefs = function (script_postfix) {
    app.settings.saveSetting(
      "aeupdates_" + script_postfix,
      "last_checked",
      updater.MHNG_lastChecked,
    );
    app.settings.saveSetting(
      "aeupdates_" + script_postfix,
      "check_for_updates",
      updater.MHNG_check_for_updates,
    );
  };
  updater.MHNG_WORKING_DIR = Folder.userData.fsName;
  updater.MHNG_webRequest = function (method, endpoint, query) {
    var response = null;
    var wincurl = updater.MHNG_WORKING_DIR + "\\aeupdater" + "\\" + "curl.vbs";
    var curlCmd = "";
    var stats_data = {
      ae_lang: app.isoLanguage,
      ae_vers: app.version,
      os: "undefined",
      product: updater.settings.name,
      timestamp: updater.MHNG_getCurrEpochTimeInMilSeconds(new Date()),
      user_id: updater.MHNG_USER_UID,
    };
    try {
      if (updater.os() == "Win") {
        stats_data.os = "Win";
        updater.createAeUpdatesFolderIfNone();
        user_stats = Base64.encode(JSON.stringify(stats_data));
        var vbsFile = new File(
          updater.MHNG_WORKING_DIR + "\\" + "aeupdater" + "\\" + "curl.vbs",
        );
        vbsFile.open("w");
        vbsFile.encoding = "UTF-8";
        var vbsSrt =
          'set namedArgs = WScript.Arguments.Named\n\n    sMethod = namedArgs.Item("Method")\n\n    sUrl = namedArgs.Item("URL")\n\n    sRequest = namedArgs.Item("Query")\n    sData = namedArgs.Item("Data")\n    HTTPPost sMethod, sUrl, sRequest\n\n    Function HTTPPost(sMethod, sUrl, sRequest)\n        If sMethod = "POST" Then\n            oHTTP.open "POST", sUrl, True\n            oHTTP.setRequestHeader "Content-Type", "application/x-www-form-urlencoded"\n            oHTTP.setRequestHeader "Content-Length", Len(sRequest)\n            oHTTP.send sRequest\n        ElseIf sMethod = "GET" Then\n            set oHTTP = CreateObject("MSXML2.ServerXMLHTTP.3.0")\n            oHTTP.setTimeouts 5000, 5000, 5000, 5000\n            oHTTP.setOption 2, 13056\n            oHTTP.open "GET", sUrl, False\n            oHTTP.setRequestHeader "AEUPDATESDATA", sData\n            oHTTP.send\n            HTTPPost = oHTTP.responseText\n            WScript.Echo HTTPPost\n            WScript.Quit\n        End If\n\n    End Function\n';
        vbsFile.write(vbsSrt);
        vbsFile.close();
        endpoint += "?include=news";
        curlCmd =
          'cscript "' +
          wincurl +
          '" /Method:' +
          method +
          " /URL:" +
          endpoint +
          " /Query:" +
          query +
          " /Data:" +
          user_stats +
          " //nologo";
      } else {
        stats_data.os = "Osx";
        user_stats = Base64.encode(JSON.stringify(stats_data));
        user_stats = "AEUPDATESDATA:" + user_stats;
        query = "include=news";
        if (method === "POST") {
          curlCmd =
            "curl -m 4 -s -H " + user_stats + ' -d "' + query + '" ' + endpoint;
        } else {
          if (method === "GET") {
            curlCmd =
              "curl -m 4 -s -H " +
              user_stats +
              ' -G -d "' +
              query +
              '" ' +
              endpoint;
          }
        }
      }
      response = system.callSystem(curlCmd);
    } catch (err) {}
    return response;
  };
  updater.os = function () {
    var os = system.osName;
    if (!os.length) {
      os = $.os;
    }
    var app_os = os.indexOf("Win") != -1 ? "Win" : "Mac";
    return app_os;
  };
  updater._6HOURS = 21600000;
  updater.createAeUpdatesFolderIfNone = function () {
    if (updater.os === "Win") {
      f = Folder(updater.MHNG_WORKING_DIR + "\\aeupdater");
    } else {
      f = Folder(updater.MHNG_WORKING_DIR + "/aeupdater");
    }
    if (!f.exists) {
      var createdFolder = f.create();
      if (!createdFolder) {
      }
    }
  };
  updater.MHNG_ABSChecker = function (url) {
    try {
      updater.MHNG_getPrefs(updater.settings.name);
      if (
        updater.MHNG_getCurrEpochTimeInMilSeconds() - updater.MHNG_lastChecked >
          updater._6HOURS &&
        updater.MHNG_lastChecked < updater.MHNG_getCurrEpochTimeInMilSeconds()
      ) {
        var r = updater.MHNG_webRequest("GET", url);
        if (!r) {
          return { status: 0 };
        }
        while (r[r.length - 1] === "\n" || r[r.length - 1] === "\r") {
          r = r.replace(/\r$/, "");
          r = r.replace(/\n$/, "");
        }
        var response_json = JSON.parse(r);
        updater.MHNG_lastChecked = updater.MHNG_getCurrEpochTimeInMilSeconds();
        updater.MHNG_setPrefs(updater.settings.name);
        return { response: response_json, status: 1 };
      }
    } catch (err) {}
    updater.MHNG_setPrefs(updater.settings.name);
    return { status: 0 };
  };
  updater.MHNG_markVersionAsSkipped = function (ver) {
    app.settings.saveSetting(
      "aeupdates_" + updater.settings.name,
      "skip_if_version",
      ver,
    );
  };
  updater.MHNG_flatterize_api_response = function (jsonobj) {
    var displayable = {};
    displayable.version = jsonobj.data.attributes.version;
    displayable.name = jsonobj.data.attributes.name;
    displayable.product = jsonobj.data.attributes.product;
    displayable.url = jsonobj.data.attributes.url;
    displayable.news = [];
    for (var i = 0; i < jsonobj.data.relationships.news.data.length; i += 1) {
      var id = jsonobj.data.relationships.news.data[i].id;
      for (var j = 0; j < jsonobj.included.length; j += 1) {
        var lookup = jsonobj.included[j];
        if (lookup.id == id) {
          displayable.news.push(lookup.attributes);
        }
      }
    }
    return displayable;
  };
  updater.MHNG_buildAlertGUI = function (scr) {
    var script = updater.MHNG_flatterize_api_response(scr);
    var popUp_window = new Window("palette", "", undefined, {
      resizeable: false,
    });
    popUp_window.alignChildren = ["center", "top"];
    var cG = popUp_window.add(
      "group{orientation:\'column\', alignChildren: [\'left\', \'top\']}",
    );
    var content = "";
    var textLine = cG.add(
      "group{orientation: \'column\', alignChildren: [\'left\', \'top\'], margins:[10,10,10,0], spacing: 5}",
    );
    textLine.add(
      "statictext",
      undefined,
      script.product + " have new version available: (" + script.version + ")",
    );
    textLine.add(
      "statictext",
      undefined,
      "Your current version: " + updater.settings.version,
    );
    textLine.add("statictext", undefined, "Here\'s the list of updates: ");
    for (var i = 0; i < script.news.length; i += 1) {
      content += script.news[i].version + ":\n";
      content += script.news[i].changes + "\n";
      content += "\n";
    }
    var txt = cG
      .add(
        "group{orientation: \'column\', alignChildren:[\'left\', \'top\'], margins: [10,0,0,0], spacing: 5}",
      )
      .add("edittext", undefined, content, {
        multiline: true,
        readonly: true,
        scrolling: true,
      });
    txt.maximumSize = [350, 200];
    txt.size = [350, 100];
    var bttnLine = popUp_window.add(
      "group{orientation:\'row\', alignChildren: [\'center\', \'top\'], margins:[0,0,0,0]}",
    );
    var okBttn = (bttnLine.add("button", undefined, "Download").onClick =
      function () {
        var urlLaunchCode = updater.os() == "Mac" ? "Open" : "Start";
        system.callSystem(urlLaunchCode + " " + script.url);
        updater.MHNG_check_for_updates = checkForUpdatesCheckbox.value;
        updater.MHNG_setPrefs(updater.settings.name);
        popUp_window.close();
      });
    var skipBttn = (bttnLine.add("button", undefined, "Skip Version").onClick =
      function () {
        updater.MHNG_markVersionAsSkipped(script.version);
        updater.MHNG_check_for_updates = checkForUpdatesCheckbox.value;
        updater.MHNG_setPrefs(updater.settings.name);
        popUp_window.close();
      });
    var nopeBttn = (bttnLine.add("button", undefined, "Later").onClick =
      function () {
        updater.MHNG_check_for_updates = checkForUpdatesCheckbox.value;
        updater.MHNG_setPrefs(updater.settings.name);
        popUp_window.close();
      });
    var checkForUpdatesCheckbox = cG
      .add("group{margins:[9,0,0,0]}")
      .add("checkbox", undefined, "Check for updates");
    checkForUpdatesCheckbox.value = updater.MHNG_check_for_updates === "true";
    okBttn.size = nopeBttn.size = skipBttn.size = [40, 25];
    popUp_window.show();
  };
  updater.MHNG_is_version_old = function (updater_version, result_version) {
    try {
      var _updater_version = updater_version.split(".");
      var _result_version = result_version.split(".");
      for (var i = 0; i < _updater_version.length; i += 1) {
        if (
          _result_version[i] != undefined &&
          parseInt(_updater_version[i]) != parseInt(_result_version[i])
        ) {
          return parseInt(_updater_version[i]) < parseInt(_result_version[i])
            ? true
            : false;
        }
      }
      if (_result_version.length > _updater_version.length) {
        return true;
      }
    } catch (err) {}
    return false;
  };
  updater.check = function (settings) {
    updater.MHNG_getPrefs(settings.name);
    updater.settings = settings;
    if (
      updater.MHNG_check_for_updates === "false" ||
      updater.statsEnabled === "false"
    ) {
      return null;
    }
    if (settings.builder) {
      try {
        var builded_url =
          settings.url.slice(-1) === "/" ? settings.url : settings.url + "/";
        builded_url += settings.version;
        var result = updater.MHNG_ABSChecker(builded_url);
        var result_version = void 0;
        if (result.status == 1) {
          result_version = result.response.data.attributes.version;
        }
        if (
          result.status == 1 &&
          result_version != settings.version &&
          updater.MHNG_skipVersion != result_version &&
          updater.MHNG_is_version_old(settings.version, result_version)
        ) {
          updater.MHNG_buildAlertGUI(result.response);
        }
      } catch (err) {}
    }
  };
})();
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
                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
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
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }
      return str("", { "": value });
    };
  }
  if (typeof JSON.parse !== "function") {
    JSON.parse = function (text, reviver) {
      function walk(holder, key) {
        var value = holder[key];
        if (value && typeof value === "object") {
          for (var k in value) {
            if (Object.prototype.hasOwnProperty.call(value, k)) {
              v = walk(value, k);
              if (v !== undefined) {
                value[k] = v;
              } else {
                delete value[k];
              }
            }
          }
        }
        return reviver.call(holder, key, value);
      }
      text = String(text);
      rx_dangerous.lastIndex = 0;
      if (rx_dangerous.test(text)) {
        text = text.replace(rx_dangerous, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (
        rx_one.test(
          text.replace(rx_two, "@").replace(rx_three, "]").replace(rx_four, ""),
        )
      ) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }
      throw new SyntaxError("JSON.parse");
    };
  }
})();
var Base64 = {
  _keyStr: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
  _utf8_decode: function (utftext) {
    var string = "";
    var i = 0;
    var c = (c1 = c2 = 0);
    while (i < utftext.length) {
      c = utftext.charCodeAt(i);
      if (c < 128) {
        string += String.fromCharCode(c);
        i++;
      } else if (c > 191 && c < 224) {
        c2 = utftext.charCodeAt(i + 1);
        string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
        i += 2;
      } else {
        c2 = utftext.charCodeAt(i + 1);
        c3 = utftext.charCodeAt(i + 2);
        string += String.fromCharCode(
          ((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63),
        );
        i += 3;
      }
    }
    return string;
  },
  _utf8_encode: function (string) {
    string = string.replace(/\r\n/g, "\n");
    var utftext = "";
    for (var n = 0; n < string.length; n += 1) {
      var c = string.charCodeAt(n);
      if (c < 128) {
        utftext += String.fromCharCode(c);
      } else if (c > 127 && c < 2048) {
        utftext += String.fromCharCode((c >> 6) | 192);
        utftext += String.fromCharCode((c & 63) | 128);
      } else {
        utftext += String.fromCharCode((c >> 12) | 224);
        utftext += String.fromCharCode(((c >> 6) & 63) | 128);
        utftext += String.fromCharCode((c & 63) | 128);
      }
    }
    return utftext;
  },
  decode: function (input) {
    var output = "";
    var i = 0;
    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
    while (i < input.length) {
      enc1 = this._keyStr.indexOf(input.charAt(i++));
      enc2 = this._keyStr.indexOf(input.charAt(i++));
      enc3 = this._keyStr.indexOf(input.charAt(i++));
      enc4 = this._keyStr.indexOf(input.charAt(i++));
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
    output = Base64._utf8_decode(output);
    return output;
  },
  encode: function (input) {
    var output = "";
    var i = 0;
    input = Base64._utf8_encode(input);
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
        this._keyStr.charAt(enc1) +
        this._keyStr.charAt(enc2) +
        this._keyStr.charAt(enc3) +
        this._keyStr.charAt(enc4);
    }
    return output;
  },
};
(function (gifGun) {
  function b6d(input) {
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
  function b6e(input) {
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
  gifGun.version = "1.7.23";
  gifGun.scriptTitle = "Gif Gun";
  if (typeof generateRandomNumber != "undefined") {
    Math.random = function () {
      return generateRandomNumber();
    };
  }
  gifGun.godMode = false;
  gifGun.devMode = false;
  gifGun.logMode = false;
  gifGun.kektek = true;
  gifGun.paths_file = "";
  gifGun.GLOB_RUNNING_TASK = 0;
  gifGun.PERCENT = "-1";
  gifGun.Glob_GifStatus = "Loading";
  gifGun.SOCKET_IP = "127.0.0.1:39274";
  gifGun.makeGifName = "Make GIF";
  gifGun.DURATION_IN_FRAMES = 1;
  gifGun.OUT_PATH = "";
  gifGun.GIF = ".gif";
  gifGun.HANDSHAKED = false;
  gifGun.TASKS = [];
  gifGun.INITIAL_TASKS_LENGTH = 0;
  gifGun.PREV_RUNTHISSHIT_TASK = false;
  gifGun._IN_FILE = "";
  gifGun.prevStatus = "0";
  gifGun.started = false;
  var versionArr = app.version.split("x")[0].split(".");
  gifGun.AEversion = Number(versionArr[0] + "." + versionArr[1]);
  gifGun.TaskItemCreator = function (settings) {
    return {
      DUR_IN_FRMS: settings.DUR_IN_FRMS,
      OUT_PATH: settings.OUT_PATH,
      _IN_FILE: settings._IN_FILE,
      experimentalRender: settings.experimentalRender,
      fps: settings.fps,
      keepAlpha: settings.keepAlpha,
      loops: settings.loops,
      lossyQuality: settings.lossyQuality,
      maxColors: settings.maxColors || 256,
      qualityRender: settings.qualityRender || 0,
      resWidth: settings.resWidth,
    };
  };
  gifGun.writeln = function (args) {
    if (gifGun.logMode) {
      if (!debugLogLocation) {
        var now = new Date();
        debugLogLocation = File(
          Folder.desktop.fsName +
            "/" +
            "GifGun" +
            "_debug_" +
            now.toString().replace(/:/g, ".") +
            ".log",
        ).saveDlg("Debug Mode Location");
      } else {
        debugLogLocation.open("a");
        debugLogLocation.encoding = "UTF-8";
        debugLogLocation.writeln(b6e(args));
        debugLogLocation.close();
      }
    }
    if (gifGun.godMode) {
      return $.writeln(args);
    }
    if (gifGun.devMode) {
      return $.writeln(b6e(args));
    }
  };
  gifGun.notSafeDeleteFolderContent = function (folder_to_remove) {
    var fls = folder_to_remove.getFiles("");
    for (var i = 0; i < fls.length; i += 1) {
      var f = new File(fls[i].toString());
      f.remove();
    }
  };
  gifGun.gen_gif_def_folder = function (_IN_FILE) {
    if (gifGun.keepAlpha === "0" || !gifGun.keepAlpha) {
      gif_def_folder = new Folder(new File(_IN_FILE).parent).fsName;
    } else {
      gif_def_folder = new Folder(
        new Folder(new Folder(new File(_IN_FILE).parent).parent).parent,
      ).fsName;
    }
    return gif_def_folder;
  };
  gifGun.get_OS_specifics = function () {
    var OSX = {
      ALPHA_PRESET:
        new File($.fileName).parent.fsName + "/(gifGun)/GifGun_Alpha_Png.aep",
      DEF_GIF_FOLDER: "/gifGunGIFS",
      LosslessEXT: ".mov",
      PNG_EXT: ".png",
      PNG_RENDER_FLDR_NAME: "PngSeq_GifGun",
      PNG_TMPLT: "data_[##########].png",
      PNG_TMPLT_NAME: "GifGun_Alpha_Png",
      SCRIPT_PATH: new File($.fileName).parent.fsName,
      deleteContent: function (path) {
        if (gifGun.helpers.stringEndsWith(path, OSX.PNG_EXT)) {
          var folder_to_remove = new Folder(new File(path).parent);
          if (
            gifGun.helpers.stringEndsWith(
              folder_to_remove.fsName,
              OSX.PNG_RENDER_FLDR_NAME,
            )
          ) {
            gifGun.notSafeDeleteFolderContent(folder_to_remove);
            folder_to_remove.remove();
          }
        } else if (gifGun.helpers.stringEndsWith(path, OSX.LosslessEXT)) {
          var file = new File(path);
          file.remove();
        } else {
          gifGun.writeln("NOT SAFE TO DELETE :" + path + " " + OSX.LosslessEXT);
        }
      },
      gif_name_gen: function (name) {
        return "/" + name + gifGun.GIF;
      },
      integrityCheck: function () {
        var mainPath = new Folder(OSX.SCRIPT_PATH + "/(gifGun)");
        var staticLibPath = new Folder(
          OSX.SCRIPT_PATH + "/(gifGun)/static_libs",
        );
        var gifBabyFile = new File(OSX.SCRIPT_PATH + "/(gifGun)/GifBaby");
        var shFilePath = new File(OSX.SCRIPT_PATH + "/(gifGun)/run.sh");
        var ffmpegFile = new File(
          OSX.SCRIPT_PATH + "/(gifGun)/static_libs/ffmpeg",
        );
        var compressorFile = new File(
          OSX.SCRIPT_PATH + "/(gifGun)/static_libs/gifextras",
        );
        var convertFile = new File(
          OSX.SCRIPT_PATH + "/(gifGun)/static_libs/convert",
        );
        if (mainPath.exists === false) {
          alert("Copy (gifGun) folder to the script location!");
          return false;
        } else if (staticLibPath.exists === false) {
          alert("Copy static_libs folder to the (gifGun) folder location!");
          return false;
        } else {
          if (
            gifBabyFile.exists === false ||
            shFilePath.exists === false ||
            ffmpegFile.exists === false ||
            compressorFile.exists === false ||
            convertFile.exists === false
          ) {
            alert("Engine files are missing. Reinstall the script.");
            return false;
          }
        }
        return true;
      },
      runer: "/(gifGun)/run.sh",
      sanitize_sh: function (path) {
        return path.replace(/ /g, "\\ ");
      },
      separator: "/",
      syscall_args: function (
        in_file,
        fps,
        resize,
        duration,
        loop,
        max_colors,
        lossy,
        alpha,
        experimental_render,
        quality_render,
      ) {
        in_file = in_file.toString();
        fps = fps.toString();
        resize = resize.toString();
        duration = duration.toString();
        alpha = alpha.toString();
        gifGun.writeln("AAAA" + resize);
        gifGun.writeln(
          "With args :" +
            in_file +
            fps +
            resize +
            duration +
            loop +
            max_colors +
            lossy +
            alpha +
            experimental_render,
        );
        var call =
          'nohup  "' +
          OSX.SCRIPT_PATH +
          '/(gifGun)/run.sh"' +
          ' "' +
          OSX.SCRIPT_PATH +
          "/(gifGun)/GifBaby" +
          '" "' +
          in_file +
          '" ' +
          fps +
          " " +
          resize +
          " " +
          duration +
          " " +
          loop +
          " " +
          max_colors +
          " " +
          lossy +
          " " +
          alpha +
          " " +
          experimental_render +
          " " +
          quality_render +
          " <&- &>/dev/null &";
        return call;
      },
    };
    var WIN = {
      ALPHA_PRESET:
        new File($.fileName).parent.fsName + "\\(gifGun)\\GifGun_Alpha_Png.aep",
      DEF_GIF_FOLDER: "\\gifGunGIFS",
      LosslessEXT: ".avi",
      PNG_EXT: ".png",
      PNG_RENDER_FLDR_NAME: "PngSeq_GifGun",
      PNG_TMPLT: "data_[##########].png",
      PNG_TMPLT_NAME: "GifGun_Alpha_Png",
      SCRIPT_PATH: new File($.fileName).parent.fsName,
      deleteContent: function (path) {
        if (gifGun.helpers.stringEndsWith(path, WIN.PNG_EXT)) {
          var folder_to_remove = new Folder(new File(path).parent);
          if (
            gifGun.helpers.stringEndsWith(
              folder_to_remove.fsName,
              WIN.PNG_RENDER_FLDR_NAME,
            )
          ) {
            gifGun.notSafeDeleteFolderContent(folder_to_remove);
            folder_to_remove.remove();
          }
        } else if (gifGun.helpers.stringEndsWith(path, WIN.LosslessEXT)) {
          var file = new File(path);
          file.remove();
        } else {
          gifGun.writeln("NOT SAFE TO DELETE :" + path + " " + WIN.LosslessEXT);
        }
      },
      gif_name_gen: function (name) {
        return "\\" + name + gifGun.GIF;
      },
      integrityCheck: function () {
        var mainPath = new Folder(WIN.SCRIPT_PATH + "\\(gifGun)");
        var staticLibPath = new Folder(
          WIN.SCRIPT_PATH + "\\(gifGun)\\static_libs",
        );
        var gifBabyFile = new File(WIN.SCRIPT_PATH + "\\(gifGun)\\GifBaby.exe");
        var shFilePath = new File(WIN.SCRIPT_PATH + "\\(gifGun)\\run.vbs");
        var ffmpegFile = new File(
          WIN.SCRIPT_PATH + "\\(gifGun)\\static_libs\\ffmpeg.exe",
        );
        var compressorFile = new File(
          WIN.SCRIPT_PATH + "\\(gifGun)\\static_libs\\gifextras.exe",
        );
        var convertFile = new File(
          WIN.SCRIPT_PATH + "\\(gifGun)\\static_libs\\convert.exe",
        );
        if (mainPath.exists === false) {
          alert("Copy (gifGun) folder to the script location!");
          return false;
        } else if (staticLibPath.exists === false) {
          alert("Copy static_libs folder to the (gifGun) folder location!");
          return false;
        } else {
          if (
            gifBabyFile.exists === false ||
            shFilePath.exists === false ||
            ffmpegFile.exists === false ||
            compressorFile.exists === false ||
            convertFile.exists === false
          ) {
            alert("Engine files are missing. Reinstall the script.");
            return false;
          }
        }
        return true;
      },
      runer: "\\(gifGun)\\run.vbs",
      sanitize_sh: function (path) {
        return path;
      },
      separator: "\\",
      syscall_args: function (
        in_file,
        fps,
        resize,
        duration,
        loop,
        max_colors,
        lossy,
        alpha,
        experimental_render,
        quality_render,
      ) {
        in_file = in_file.toString();
        fps = parseInt(fps.toString(), 10).toString();
        resize = resize.toString();
        duration = duration.toString();
        alpha = alpha.toString();
        var call =
          'cmd /c wscript.exe "' +
          WIN.SCRIPT_PATH +
          WIN.runer +
          '" "' +
          WIN.SCRIPT_PATH +
          "\\(gifGun)\\GifBaby.exe" +
          '" "' +
          in_file +
          '" ' +
          fps +
          " " +
          resize +
          " " +
          duration +
          " " +
          loop +
          " " +
          max_colors +
          " " +
          lossy +
          " " +
          alpha +
          " " +
          experimental_render +
          " " +
          quality_render;
        return call;
      },
    };
    return $.os.substr(0, 7).toLowerCase() == "windows" ? WIN : OSX;
  };
  gifGun.OS = gifGun.get_OS_specifics();
  gifGun.openFolder = function (folder) {
    var prefix = "";
    gifGun.writeln("TO OPEN:" + folder);
    var fs_folder = new Folder(folder);
    if ($.os.substr(0, 7).toLowerCase() == "windows") {
      prefix = "explorer ";
      if (fs_folder) {
        system.callSystem(prefix + '"' + fs_folder.fsName + '"');
      }
    } else {
      var AppData_fldr = new Folder(Folder.userData.fsName + "/GifGun");
      if (!AppData_fldr.exists) {
        AppData_fldr.create();
      }
      var paths_file_1 = new File(AppData_fldr.fsName + "/open.txt");
      if (paths_file_1.open("w")) {
        paths_file_1.encoding = "UTF-8";
        paths_file_1.write(fs_folder.fsName);
        paths_file_1.close();
      }
      var cmd4 = "value=$(<\'" + paths_file_1.fsName + '\'); open "$value"';
      gifGun.writeln(cmd4);
      var f = system.callSystem(cmd4);
      gifGun.writeln(f);
      system.callSystem(cmd4);
    }
  };
  gifGun.getUserAppDataFolder = function () {
    var AppData_fldr = new Folder(Folder.userData.fsName + "/GifGun");
    if (!AppData_fldr.exists) {
      AppData_fldr.create();
    }
    return Folder.userData.fsName + "/GifGun";
  };
  gifGun.writeln(gifGun.OS.runer);
  gifGun.string_sanitizer = function (comp_name) {
    return comp_name.replace(/[\W_]+/g, "_");
  };
  gifGun.paths_file_create = function (in_path, out_path) {
    var AppData_fldr = new Folder(Folder.userData.fsName + "/GifGun");
    AppData_fldr.create();
    var paths_file = new File(AppData_fldr.fsName + "/data.txt");
    if (paths_file.open("w")) {
      paths_file.encoding = "UTF-8";
      paths_file.write(in_path);
      paths_file.write("\n");
      paths_file.write(out_path);
      paths_file.write("\n");
      paths_file.close();
    }
    return unescape(paths_file.fsName);
  };
  gifGun.fsFolder = function (fsName) {
    var ind = 0;
    if ($.os.substr(0, 7).toLowerCase() == "windows") {
      ind = fsName.lastIndexOf("\\");
    } else {
      ind = fsName.lastIndexOf("/");
    }
    return fsName.substr(0, ind);
  };
  gifGun.OS.sanitize_sh = function (path) {
    return path.replace(/ /g, "\\ ");
  };
  gifGun.getNameBack = function () {
    if (gifGun.TASKS.length > 0 && gifGun.TASKS.length === 1) {
      gifGun.Glob_GifStatus.setText(String(gifGun.TASKS.length) + " Gif left");
      return;
    }
    if (gifGun.TASKS.length > 0 && gifGun.TASKS.length !== 1) {
      gifGun.Glob_GifStatus.setText(String(gifGun.TASKS.length) + " Gifs left");
      return;
    }
    gifGun.Glob_GifStatus.setText(gifGun.makeGifName);
    gifGun.Glob_GifStatus.setEnabled();
  };
  gifGun.getStateBack = function () {
    gifGun.prevStatus = "0";
    gifGun.started = false;
  };
  gifGun.getStateBack();
  gifGun.jsinterval_checker = function () {
    var conn = new Socket();
    var handshake = false;
    var status_repr = gifGun.prevStatus;
    gifGun.writeln("im running" + gifGun.PERCENT);
    if (!gifGun.started) {
      gifGun.Glob_GifStatus.setText("Here it comes");
    }
    gifGun.Glob_GifStatus.setDisabled();
    if (conn.open(gifGun.SOCKET_IP)) {
      conn.write("GET / HTTP/1.0\n\n");
      gifGun.PERCENT = conn.read(400);
      if (gifGun.PERCENT != "-1") {
        if (!gifGun.HANDSHAKED) {
          handshake = new Socket();
          handshake.open(gifGun.SOCKET_IP);
          handshake.write("GET /is_finished HTTP/1.0\n\n");
          handshake.read(400);
          gifGun.HANDSHAKED = true;
          gifGun.writeln("SEND TO IS_FINISHED!");
        }
        gifGun.started = true;
        status_repr = gifGun.PERCENT;
      }
      gifGun.writeln("im running" + gifGun.PERCENT);
      if (status_repr != gifGun.prevStatus) {
        if (status_repr[0] === "S") {
          gifGun.Glob_GifStatus.setText(status_repr.substring(1));
        } else if (status_repr[0] === "E") {
          gifGun.Glob_GifStatus.setText(status_repr);
        } else {
          if (gifGun.INITIAL_TASKS_LENGTH !== 1) {
            gifGun.Glob_GifStatus.setText(
              "(" +
                String(gifGun.INITIAL_TASKS_LENGTH - gifGun.TASKS.length) +
                "/" +
                String(gifGun.INITIAL_TASKS_LENGTH) +
                ") " +
                status_repr +
                "% ready",
            );
          } else {
            gifGun.Glob_GifStatus.setText(status_repr + "% ready");
          }
        }
        gifGun.prevStatus = status_repr;
      }
      conn.close();
    } else {
      if (gifGun.PERCENT != "-1") {
        app.cancelTask(gifGun.GLOB_RUNNING_TASK);
        gifGun.GLOB_RUNNING_TASK = 0;
        gifGun.writeln("Im done!");
        gifGun.HANDSHAKED = false;
        gifGun.Glob_GifStatus.setText("Done!");
        gifGun.PERCENT = "-1";
        gifGun.writeln("GIF FOLDER: " + gifGun.gifFolder);
        gifGun.writeln(
          gifGun.removeAfterChkbx + typeof gifGun.removeAfterChkbx,
        );
        if (
          gifGun.removeAfterChkbx === "false" ||
          gifGun.removeAfterChkbx === false
        ) {
          gifGun.writeln("REMOVING FILES AFTER SUCCESS : " + gifGun._IN_FILE);
          gifGun.OS.deleteContent(gifGun.CURRENT_TASK._IN_FILE);
        }
        gifGun.writeln(
          "FOLDER CHECKBOX :" +
            typeof gifGun.customFolder +
            gifGun.customFolder,
        );
        if (
          gifGun.TASKS.length === 0 &&
          (gifGun.openFldrChkbx === "true" || gifGun.openFldrChkbx === true)
        ) {
          if (
            gifGun.gifFolder &&
            (gifGun.customFolder === "true" || gifGun.customFolder === true)
          ) {
            gifGun.openFolder(gifGun.gifFolder);
          } else {
            var gif_def_folder = gifGun.gen_gif_def_folder(gifGun._IN_FILE);
            gifGun.openFolder(gif_def_folder + gifGun.OS.DEF_GIF_FOLDER);
          }
        }
        app.scheduleTask(
          "gifGun.getNameBack(); gifGun.getStateBack();",
          600,
          false,
        );
      }
    }
  };
  gifGun.run_ffmpeg = function (task) {
    try {
      gifGun.writeln("STARTING FFMPEG");
      var paths_file_2 = gifGun.paths_file_create(task._IN_FILE, task.OUT_PATH);
      gifGun.writeln(
        gifGun.OS.syscall_args(
          paths_file_2,
          task.fps,
          task.resWidth,
          task.DUR_IN_FRMS,
          task.loops,
          task.maxColors,
          task.lossyQuality,
          task.keepAlpha,
          task.experimentalRender,
          task.qualityRender,
        ),
      );
      system.callSystem(
        gifGun.OS.syscall_args(
          paths_file_2,
          task.fps,
          task.resWidth,
          task.DUR_IN_FRMS,
          task.loops,
          task.maxColors,
          task.lossyQuality,
          task.keepAlpha,
          task.experimentalRender,
          task.qualityRender,
        ),
      );
      gifGun.writeln("ENDED FFMPEG");
    } catch (err) {
      gifGun.writeln("err:");
      gifGun.writeln(err);
    }
  };
  gifGun.increment_name = function (path) {
    var path_no_ext = path.slice(0, path.length - gifGun.GIF.length);
    var path_arr = path_no_ext.split("_");
    if (
      path_arr.length > 1 &&
      !isNaN(parseInt(path_arr[path_arr.length - 1]))
    ) {
      path_arr[path_arr.length - 1] = (
        parseInt(path_arr[path_arr.length - 1]) + 1
      ).toString();
      return gifGun.find_not_used_name(path_arr.join("_") + gifGun.GIF);
    }
    if (
      path_arr.length >= 1 &&
      isNaN(parseInt(path_arr[path_arr.length - 1]))
    ) {
      return path_arr.join("_") + "_1" + gifGun.GIF;
    }
    return path;
  };
  gifGun.find_not_used_name = function (path) {
    var file = new File(path);
    while (file.exists) {
      path = gifGun.increment_name(path);
      file = new File(path);
    }
    return path;
  };
  gifGun.save_project_to_file = function (proj) {
    if (!proj.file) {
      var default_save_fldr = new Folder(Folder.userData.fsName + "/GifGun");
      if (!default_save_fldr.exists) {
        default_save_fldr.create();
      }
      var savepath = new File(default_save_fldr.fsName + "/tmp.aep");
      proj.save(savepath);
      new File(proj.file.path);
    } else {
      proj.save();
    }
  };
  gifGun.buildIssueUI = function (issueCode) {
    var buildUI = function (mssg, contact) {
      var prefix = "open ";
      if ($.os.substr(0, 7).toLowerCase() == "windows") {
        prefix = "explorer ";
      }
      gifGun.link4 = prefix + "https://www.facebook.com/messages/t/gifgunae";
      var cleanWindow = new Window("palette", "", undefined, {
        borderless: true,
        resizeable: false,
        size: [150, 100],
      });
      cleanWindow.alignChildren = ["left", "top"];
      var cG = cleanWindow.add(
        "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins: 0, spacing: 0}",
      );
      var textLine = cG.add(
        "group{orientation: \'column\',spacing: 0, margins:[5,10,5,15], alignChildren: [\'left\', \'top\']}",
      );
      textLine.add("statictext", undefined, mssg, { multiline: true });
      if (contact === true || contact === undefined) {
        var contactBttn = cG.add("button", undefined, "Contact us on Facebook");
        contactBttn.onClick = function () {
          system.callSystem(gifGun.link4);
        };
        cG.add(
          "group{justify: \'center\', alignChildren: [\'center\', \'center\'], alignment: [\'center\', \'center\'], margins: [0,10,0,10]}",
        ).add("statictext", undefined, "OR");
        closePanel = cG.add("button", undefined, "Or close this window");
        closePanel.preferredSize = contactBttn.preferredSize = [200, 30];
      } else {
        closePanel = cG.add("button", undefined, "Close this window");
        closePanel.preferredSize = [200, 30];
      }
      closePanel.onClick = function () {
        cleanWindow.close();
      };
      cleanWindow.show();
    };
    if (issueCode == 1) {
      gifGun.buildGUIsettings(gifGun);
      buildUI(
        "There seems to be a preset issue\n\nWe have opened GifGun settings for you, uncheck \'Keep Alpha\' or \'Use Experimental Engine\' and select [UPDATE PRESETS] in the \'Render Preset\' dropdown.\n\nThen relaunch After Effects and try again.\n\nIn case it didn\'t help",
      );
    } else {
      if (issueCode == 2) {
        buildUI(
          "Due to the way GifGun works it is unfortunately not compatible with script launchers.\nUntil we find a solution please launch only via Window -> gifGun.jsxbin",
          false,
        );
      }
    }
  };
  gifGun.checkIfAlphaPresetOK = function () {
    if (app.settings.haveSetting("GifGunPrefs", "AlphaPreset") === false) {
      gifGun.createTemplate();
    }
  };
  gifGun.startRenderQueue = function () {
    var activeComp = app.project.activeItem;
    gifGun.comp = null;
    gifGun.comps = [];
    if (activeComp && activeComp instanceof CompItem) {
      try {
        gifGun.save_project_to_file(app.project);
        gifGun.comp = activeComp;
        gifGun.checkRenderQueue();
      } catch (err) {
        if (gifGun.devMode === true || gifGun.logMode === true) {
          alert(err);
        }
        gifGun.buildIssueUI(1);
      }
    } else {
      if (activeComp === null && app.project.selection.length > 0) {
        var activeComps = gifGun.helpers.filter(
          app.project.selection,
          function (el) {
            return el instanceof CompItem;
          },
        );
        if (activeComps.length > 0) {
          try {
            gifGun.save_project_to_file(app.project);
            gifGun.comps = activeComps;
            gifGun.checkRenderQueue();
          } catch (err) {
            if (gifGun.devMode === true || gifGun.logMode === true) {
              alert(err);
            }
            gifGun.buildIssueUI(1);
          }
        }
      }
    }
  };
  gifGun.createResourceFile = function (
    filename,
    binaryString,
    resourceFolder,
  ) {
    var myFile = new File(resourceFolder + "/" + filename);
    if (!File(myFile).exists) {
      myFile.encoding = "BINARY";
      myFile.open("w");
      myFile.write(binaryString);
      myFile.close();
    }
    return myFile;
  };
  gifGun.createTemplate = function () {
    try {
      tempPrj = app.project.importFile(
        new ImportOptions(new File(gifGun.OS.ALPHA_PRESET)),
      );
    } catch (e) {
      alert(e.toString() + "\n" + "Can\'t import Alpha template.");
      return false;
    }
    var allQueue = app.project.renderQueue.numItems;
    for (var q = 1; q <= allQueue; q += 1) {
      var nameTemp = app.project.renderQueue.item(q).outputModule(1).file.name;
      if (nameTemp.substring(0, 8) == "gg_alpha") {
        app.project.renderQueue
          .item(q)
          .outputModule(1)
          .saveAsTemplate("GifGun_Alpha_Png");
        tempPrj.remove();
        app.settings.saveSetting("GifGunPrefs", "AlphaPreset", "1");
        return true;
      }
    }
    return false;
  };
  gifGun.createFolderInsidePath = function (path, folder) {
    var tmp_fldr = new Folder(path + gifGun.OS.separator + folder);
    if (!tmp_fldr.exists) {
      tmp_fldr.create();
    }
  };
  gifGun.cleanFolderInsidePath = function (path, folder) {
    var tmp_fldr = new Folder(path + gifGun.OS.separator + folder);
    if (tmp_fldr.exists) {
      gifGun.notSafeDeleteFolderContent(tmp_fldr);
    }
  };
  gifGun.reallyStartRenderQueue = function () {
    var rQ = app.project.renderQueue;
    if (gifGun.comps.length === 0) {
      gifGun.comps.push(gifGun.comp);
    }
    gifGun.helpers.forEach(gifGun.comps, function (el) {
      rQ.items.add(el);
    });
    var fldrName = gifGun.comps[0].parentFolder.name;
    if (fldrName == "Root") {
      fldrName = "";
    }
    gifGun.writeln(
      gifGun.fsFolder(app.project.file.fsName) + "/renders/" + fldrName,
    );
    var fldr = new Folder(
      gifGun.fsFolder(app.project.file.fsName) + "/renders/" + fldrName,
    );
    fldr.create();
    gifGun.writeln("created");
    var OUT_FOLDER_FOR_BATCHES = "";
    var _loop_1 = function (_i) {
      gifGun.comp = gifGun.comps[_i];
      var task_index_in_queue = rQ.items.length - gifGun.comps.length + _i + 1;
      if (
        gifGun.AEversion >= 13.8 &&
        (gifGun.renderSpeed === true || gifGun.renderSpeed === "true")
      ) {
        var renderSettings = rQ
          .item(task_index_in_queue)
          .getSettings(GetSettingsFormat.STRING_SETTABLE);
        var resFactor = gifGun.comp.width / gifGun.resWidth;
        var quality = void 0;
        if (resFactor >= 4) {
          quality = "Quarter";
        } else if (resFactor >= 3) {
          quality = "Third";
        } else if (resFactor >= 2) {
          quality = "Half";
        } else {
          quality = "Full";
        }
        renderSettings.Resolution = quality;
        rQ.item(task_index_in_queue).setSettings(renderSettings);
      }
      if (
        gifGun.AEversion >= 13.8 &&
        (gifGun.pixelart === true || gifGun.pixelart === "true")
      ) {
        rQ.item(task_index_in_queue).setSetting("Quality", "Draft");
        rQ.item(task_index_in_queue).setSetting("Resolution", "Full");
      }
      if (gifGun.fps === "as comp") {
        gifGun.fps = 1 / gifGun.comp.frameDuration;
      } else {
        gifGun.fps = Number(gifGun.fps);
      }
      if (gifGun.AEversion >= 13.8 && gifGun.keepAlpha === "1") {
        rQ.item(task_index_in_queue).setSetting(
          "Use this frame rate",
          gifGun.fps,
        );
      }
      var full_file = "";
      if (rQ.item(task_index_in_queue).outputModules[1].file === null) {
        if ($.os.substr(0, 7).toLowerCase() == "windows") {
          full_file = "OutModule.avi";
        } else {
          full_file = "OutModule.mov";
        }
      }
      var output_file_path = void 0;
      var output_file_with_ext = void 0;
      if (
        gifGun.gifFolder &&
        (gifGun.customFolder === "true" || gifGun.customFolder === true)
      ) {
        output_file_path = gifGun.gifFolder;
      } else {
        output_file_path = fldr.fsName;
      }
      if (gifGun.keepAlpha === "0" || !gifGun.keepAlpha) {
        rQ.item(task_index_in_queue).outputModules[1].applyTemplate(
          gifGun.output,
        );
        if (!full_file) {
          full_file = rQ
            .item(task_index_in_queue)
            .outputModules[1].file.toString();
        }
        output_file_path +=
          gifGun.OS.separator + gifGun.string_sanitizer(gifGun.comp.name);
        gifGun.OS.LosslessEXT =
          "." + full_file.split(".")[full_file.split(".").length - 1];
        output_file_with_ext = output_file_path + gifGun.OS.LosslessEXT;
      } else {
        rQ.item(task_index_in_queue).outputModules[1].applyTemplate(
          gifGun.OS.PNG_TMPLT_NAME,
        );
        output_file_path +=
          gifGun.OS.separator + gifGun.string_sanitizer(gifGun.comp.name);
        output_file_with_ext =
          output_file_path +
          gifGun.OS.separator +
          gifGun.OS.PNG_RENDER_FLDR_NAME +
          gifGun.OS.separator +
          gifGun.string_sanitizer(gifGun.comp.name) +
          "_[##########].png";
        gifGun.createFolderInsidePath(
          output_file_path,
          gifGun.OS.PNG_RENDER_FLDR_NAME,
        );
        gifGun.cleanFolderInsidePath(
          output_file_path,
          gifGun.OS.PNG_RENDER_FLDR_NAME,
        );
      }
      gifGun.writeln("OUTPUT PATH:" + output_file_with_ext);
      rQ.item(task_index_in_queue).outputModules[1].file = new File(
        output_file_with_ext.replace(/%/g, "%2525"),
      );
      gifGun.writeln("!! STATUS: " + app.project.renderQueue.item(1).status);
      gifGun._IN_FILE = output_file_with_ext;
      gifGun.DURATION_IN_FRAMES = Math.floor(
        parseFloat(gifGun.comp.frameRate.toString()) *
          parseFloat(gifGun.comp.workAreaDuration.toString()),
      );
      gifGun.fileOutName = gifGun.string_sanitizer(gifGun.comp.name);
      if (gifGun.resChkbx === "false" || gifGun.resChkbx === false) {
        gifGun.resWidth = gifGun.comp.width;
      }
      if (_i === 0) {
        if (
          gifGun.gifFolder &&
          (gifGun.customFolder === "true" || gifGun.customFolder === true)
        ) {
          gifGun.OUT_PATH =
            gifGun.gifFolder + gifGun.OS.gif_name_gen(gifGun.fileOutName);
          OUT_FOLDER_FOR_BATCHES = gifGun.gifFolder;
        } else {
          var gif_def_folder = gifGun.gen_gif_def_folder(gifGun._IN_FILE);
          gifGun.OUT_PATH =
            gif_def_folder +
            gifGun.OS.DEF_GIF_FOLDER +
            gifGun.OS.gif_name_gen(gifGun.fileOutName);
          var folder_path = gif_def_folder + gifGun.OS.DEF_GIF_FOLDER;
          var tmp_fldr = new Folder(folder_path);
          if (!tmp_fldr.exists) {
            tmp_fldr.create();
          }
          OUT_FOLDER_FOR_BATCHES = folder_path;
        }
      } else {
        gifGun.OUT_PATH =
          OUT_FOLDER_FOR_BATCHES + gifGun.OS.gif_name_gen(gifGun.fileOutName);
      }
      gifGun.writeln("gifGun.OUT_PATH path here: " + gifGun.OUT_PATH);
      gifGun.OUT_PATH = gifGun.find_not_used_name(gifGun.OUT_PATH);
      if (gifGun.OS.integrityCheck() === true) {
        gifGun.writeln("FPS NEW = " + gifGun.fps.toString());
        if (gifGun.customFolder === true) {
          var newFolder = new Folder(gifGun.gifFolder);
          newFolder.create();
        }
        rQ.item(task_index_in_queue).onStatusChanged = function () {
          gifGun.Glob_GifStatus.setText("Rendering");
        };
        if (_i === gifGun.comps.length - 1) {
          rQ.item(task_index_in_queue).onStatusChanged = function () {
            if (
              app.project.renderQueue.item(task_index_in_queue).status ==
              RQItemStatus.DONE
            ) {
              gifGun.runThisShit();
            }
          };
        }
        gifGun.TASKS.push(
          gifGun.TaskItemCreator({
            DUR_IN_FRMS: gifGun.DURATION_IN_FRAMES,
            OUT_PATH: gifGun.OUT_PATH,
            _IN_FILE: gifGun._IN_FILE,
            experimentalRender: gifGun.experimentalRender,
            fps: gifGun.fps,
            keepAlpha: gifGun.keepAlpha,
            loops: gifGun.loops,
            lossyQuality: gifGun.lossyQuality,
            maxColors: gifGun.maxColors,
            qualityRender: gifGun.qualityRender,
            resWidth: gifGun.resWidth,
          }),
        );
      }
    };
    for (var _i = 0; _i < gifGun.comps.length; _i += 1) {
      _loop_1(_i);
    }
    gifGun.INITIAL_TASKS_LENGTH = gifGun.TASKS.length;
    rQ.render();
  };
  gifGun.runThisShit = function () {
    if (gifGun && gifGun.TASKS && gifGun.TASKS.length > 0) {
      if (!gifGun.GLOB_RUNNING_TASK) {
        gifGun.CURRENT_TASK = gifGun.TASKS.shift();
        gifGun.PREV_RUNTHISSHIT_TASK = false;
        app.scheduleTask("gifGun.run_ffmpeg(gifGun.CURRENT_TASK)", 600, false);
        gifGun.GLOB_RUNNING_TASK = app.scheduleTask(
          "gifGun.jsinterval_checker()",
          300,
          true,
        );
      }
      app.scheduleTask("gifGun.runThisShit()", 2000, false);
    }
  };
  gifGun.checkMacOSVersion = function () {
    var os = $.os;
    if (os.substr(0, 7).toLowerCase() !== "windows") {
      var macOSVersion = os.split(".");
      var macOSVersion_major = macOSVersion[0].slice(-2);
      var macOSVersion_minor = macOSVersion[1];
      if (
        macOSVersion &&
        Number(macOSVersion_major) == 10 &&
        Number(macOSVersion_minor) < 13
      ) {
        return false;
      }
    }
    return true;
  };
  gifGun.checkRenderQueue = function () {
    var cleanRenderQueue = function (_rQ) {
      for (var r = _rQ.items.length; r > 0; r--) {
        if ((_rQ.item(r).statue = RQItemStatus.QUEUED)) {
          _rQ.item(r).remove();
        }
      }
    };
    var buildAlertGUI = function () {
      var cleanWindow = new Window("palette", "", undefined, {
        borderless: false,
        resizeable: false,
        size: [100, 100],
      });
      cleanWindow.alignChildren = ["left", "top"];
      var cG = cleanWindow.add(
        "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins: 0, spacing: 0}",
      );
      var textLine = cG.add(
        "group{orientation: \'column\',spacing: 0, margins:[5,10,5,15]}",
      );
      textLine.add(
        "statictext",
        undefined,
        "Render Queue is not empty.\nYou should clean it before making GIF with GifGun. \n\nClean Render Queue for you?",
        { multiline: true },
      );
      var bttnLine = cG.add("group{orientation:\'row\', spacing: 10}");
      var okBttn = (bttnLine.add("button", undefined, "OK").onClick =
        function () {
          cleanRenderQueue(rQ);
          gifGun.reallyStartRenderQueue();
          cleanWindow.close();
        });
      var nopeBttn = (bttnLine.add("button", undefined, "NOPE").onClick =
        function () {
          cleanWindow.close();
        });
      okBttn.size = nopeBttn.size = [40, 25];
      cleanWindow.show();
    };
    var rQ = app.project.renderQueue;
    var isEmpty = true;
    for (var r = 1; r <= rQ.items.length; r += 1) {
      if (rQ.item(r).status == RQItemStatus.QUEUED) {
        isEmpty = false;
        break;
      }
    }
    if (isEmpty === false) {
      buildAlertGUI();
    } else {
      gifGun.reallyStartRenderQueue();
    }
  };
  gifGun.run = function () {
    var buildPurchaseUI = function () {
      var prefix = "open ";
      if ($.os.substr(0, 7).toLowerCase() == "windows") {
        prefix = "explorer ";
      }
      gifGun.link3 = prefix + "http://aescripts.com/gifgun";
      var cleanWindow = new Window("palette", "", undefined, {
        borderless: true,
        resizeable: false,
        size: [150, 100],
      });
      cleanWindow.alignChildren = ["left", "top"];
      var cG = cleanWindow.add(
        "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins: 0, spacing: 0}",
      );
      var textLine = cG.add(
        "group{orientation: \'column\',spacing: 0, margins:[5,10,5,15], alignChildren: [\'left\', \'top\']}",
      );
      textLine.add(
        "statictext",
        undefined,
        "Aw, shucks! Your trial period for using GifGun has just expired. We hope you enjoyed it.\n\nNow have two options:",
        { multiline: true },
      );
      var purchaseBttn = cG.add("button", undefined, "Purchase GifGun");
      purchaseBttn.onClick = function () {
        system.callSystem(gifGun.link3);
      };
      cG.add(
        "group{justify: \'center\', alignChildren: [\'center\', \'center\'], alignment: [\'center\', \'center\'], margins: [0,10,0,10]}",
      ).add("statictext", undefined, "OR");
      var closePanel = cG.add("button", undefined, "Or close this window");
      closePanel.preferredSize = purchaseBttn.preferredSize = [200, 30];
      closePanel.onClick = function () {
        cleanWindow.close();
      };
      cG.add("group{margins:[0,5,0,0]}").add(
        "statictext",
        undefined,
        "and never make one-click GIFs inside After Effects again \xaf\\_(\u30c4)_/\xaf",
        { multiline: true },
      );
      cleanWindow.show();
    };
    var buildUpdateUI = function () {
      var prefix = "open ";
      if ($.os.substr(0, 7).toLowerCase() == "windows") {
        prefix = "explorer ";
      }
      var currentMacOSVersion = $.os.match(/\s10\.(\d+)(\.\d+)?/)[0];
      gifGun.link4 = prefix + "https://www.facebook.com/gifgunae";
      var updateWindow = new Window("palette", "UPDATE MACOS", undefined, {
        borderless: true,
        resizeable: false,
        size: [150, 100],
      });
      updateWindow.alignChildren = ["left", "top"];
      var cG = updateWindow.add(
        "group{orientation:\'column\', alignChildren: [\'left\', \'top\'], margins: 0, spacing: 0}",
      );
      var textLine = cG.add(
        "group{orientation: \'column\',spacing: 0, margins:[5,10,5,15], alignChildren: [\'left\', \'top\']}",
      );
      textLine.add(
        "statictext",
        undefined,
        "Unfortunately, new GifGun builds do not support MacOS 10.12 and older.\n\nYour MacOS version is: " +
          currentMacOSVersion +
          "\n\nPlease contact us to get a compatible GifGun build.",
        { multiline: true },
      );
      var contactBttn = cG.add("button", undefined, "Contact us");
      contactBttn.onClick = function () {
        system.callSystem(gifGun.link4);
      };
      cG.add(
        "group{justify: \'center\', alignChildren: [\'center\', \'center\'], alignment: [\'center\', \'center\'], margins: [0,10,0,10]}",
      ).add("statictext", undefined, "OR");
      var closePanel = cG.add("button", undefined, "Close this window");
      closePanel.preferredSize = contactBttn.preferredSize = [200, 30];
      closePanel.onClick = function () {
        updateWindow.close();
      };
      updateWindow.show();
    };
    var af_settings = {
      helpText: "Documentation is available at https://aescripts.com/gifgun",
      offerTrial: true,
      privateNumber: 6333958471880265,
      productSKU: "NSGG-SUL",
      scriptAuthor: "Extrabite",
      scriptName: "GifGun",
      scriptURL: "https://aescripts.com/gifgun/",
      scriptVersion: "1.7.23",
      supportTicketSKU: "NSMAGG-SUL",
    };
    var zshkvr = new b(af_settings);
    var macOSCheck = gifGun.checkMacOSVersion();
    if (zshkvr.c()) {
      gifGun.getPrefs();
      gifGun.setPrefs();
      gifGun.kektek = zshkvr.t();
      zshkvr.doUpdateCheck(false);
      updater.check({
        builder: "true",
        name: "gifgun",
        url: "https://aeupdates.com/status/gifgun",
        version: "1.7.23",
      });
      if (macOSCheck) {
        this.buildGUI(this, zshkvr);
      } else {
        buildUpdateUI();
      }
    } else {
      buildPurchaseUI();
    }
  };
  if (
    String($.stack).indexOf("GifGun.jsx") === 1 ||
    String($.stack).indexOf("gifGun.jsx") === 1 ||
    gifGun.devMode ||
    String($.stack).indexOf("bgrenderer2Injection") !== -1 ||
    String($.stack).indexOf("openGifGun") !== -1
  ) {
    gifGun.run();
  } else {
    gifGun.buildIssueUI(2);
  }
})(gifGun || (gifGun = {}));
