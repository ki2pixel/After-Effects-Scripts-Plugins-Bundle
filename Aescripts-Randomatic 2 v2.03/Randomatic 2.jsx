/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function rc_randomatic2(thisObj) {
  var scriptName = "Randomatic 2";
  var scriptVersion = "2.03";
  var help =
    '\r\n - - - - - - - - - -  PROPERTIES PANEL  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\r\n\r\n\u2666 Options   >   Required option for all properties\r\n        \u25ca Static random (SR): Non-animated static values. You can still shuffle the result over time with the "Random generator" parameter.\r\n        \u25ca Animated random (AR): Use of the Random algorithm with animated values.\r\n        \u25ca Wiggle (W): Use of the wiggle algorithm. Possibility to loop the animations.\r\n\r\n\u2666 Colors   >   Only required for colors properties. These options can be used with "Random" and "Animated Random" only.\r\n        \u25ca Gradient: Properties will use a random color in the gradient defined by two colors.\r\n        \u25ca Palette: Properties will only use user-defined colors (up to 10 colors). \r\n        \u25ca HSL: Ability to obtain random colors by adjusting the hue, saturation and luminosity\r\n\r\n\u2666 Controllers on selected Layers\r\n        Allows to create the Randomatic effect on the selected layer instead of the default "Randomatic controllers" layer.        \r\n        If there are multiple selected layers the effect will be created on the first selected layer.\r\n\r\n\u2666 Replace   >   Replace any selected Randomatic effect(s) with the new "options" and/or "colors" lists parameters.\r\n\r\n\u2666 Delete   >   Deletes the selected effect(s).\r\n\r\n\u2666 Transfer   >   Transfer the selected Randomatic effects to any layer in the project.\r\n\r\n\u2666 Random Generator   >   Randomly modify all the "Random generator" parameters of all the Randomatic effects in the open composition.\r\n\r\n\u2666 Save property + Auto selection >    Auto select automatically the same property across the selected layers.\r\n        1 > Select a property that you want to select on multiple layers.\r\n        2 > Click "Save property".\r\n        3 > Select the layers you want to affect.\r\n        4 > Click "Auto-selection".\r\n        Pro tip: double press "S" on your keyboard to show selected properties.\r\n\r\n\r\n\r\n - - - - - - - - - -  OFFSET  /  LAYERS PANEL  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \r\n\r\n\u2666 Unit   >   Choose the unit you want to work with between "Frames", "Seconds" or "Composition duration percentage"\r\n\r\n\u2666 Method\r\n        \u25ca Classic offset: True randomness. The selected layers can be shuffled anywhere between the 2 range parameters.\r\n        \u25ca Step offset: the range is replaced by a "step" parameters. Allows an even distribution of layers over time.\r\n\r\n\u2666 Origin\r\n        \u25ca Composition first frame: True randomness. The selected layers can be shuffled anywhere between the 2 range parameters.\r\n        \u25ca Current time: Origin is based on the time marker in the timeline.\r\n        \u25ca Layers in point: The range parameters are based on the in point of each individual layers. Helps to keep the layers flow.\r\n        \u25ca Working area: Shuffles layers within the working area. "Range" parameters are disabled.\r\n\r\n\r\n\r\n - - - - - - - - - -  STRETCH  /  LAYERS PANEL  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - \r\n\r\n\u2666 Based on   >   The selected layers are stretched from the following:\r\n        \u25ca Layers in point\r\n        \u25ca Layers out point\r\n        \u25ca Current time\r\n\r\n\u2666 Don\'t affect keyframes   >   Stretching only affects the layers themselves and allows the keyframes to remain intact.\r\n\r\n\r\n\r\n - - - - - - - - - -  INDEX  /  LAYERS PANEL  - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -\r\n\r\n\u2666 Method\r\n        \u25ca All composition layers: Shuffles selected layers order across all layers in the composition.\r\n        \u25ca Preserve groups: All unselected layers keep their original index.\r\n\r\n\r\n\r\n\r\n\r\n**  Thank you for using Randomatic!\r\n**  \u2665\r\n**  Romain\r\n\r\n';
  var rc24_af_settings = {};
  rc24_af_settings = {
    betaExpirationDate: new Date("May 10, 2020"),
    betaStartDate: new Date("Apr 05, 2020"),
    betaSupportEmail: "contact@romaincousin.fr",
    helpButtons: [
      { name: "Video Tutorial", url: "https://aescripts.com/randomatic" },
      {
        name: "Follow me on Behance",
        url: "https://www.behance.net/romaincousin",
      },
      {
        name: "Follow me on Instagram",
        url: "https://www.instagram.com/romaincousin",
      },
    ],
    helpText: help,
    offerBeta: false,
    offerTrial: true,
    privateNumber: 7746058533780394,
    productSKU: "RCNR2-SUL",
    scriptAuthor: "Romain Cousin",
    scriptName: scriptName,
    scriptURL: "https://aescripts.com/randomatic/",
    scriptVersion: scriptVersion,
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
      var i =
        -1 != $.os.indexOf("Mac") &&
        (Folder("/Volumes/Private").exists || Folder("/Volumes/private").exists)
          ? Folder.userData.fullName
          : Folder.temp.fullName +
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
      var r = n.fsName;
      -1 != $.os.indexOf("Windows") &&
        n.relativeURI.match(/^\.\.\//) &&
        (r = n.relativeURI);
      var a = systemCall(
        '"' + r + '" "' + strHeader + '" ' + privateNum + ' "' + e + '"',
      );
      return (n.remove(), parseResult(a));
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
            prompt(strDeactivate + "?") &&
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
    var licensingVersion = "3.0.47";
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
    var mx = __BLOB__BLOB_000458__;
    var wx = __BLOB__BLOB_000459__;
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
  var rc2410 = new a(rc24_af_settings);
  if (rc2410.c()) {
    function fctHelpTip() {
      var para = "\r\n\n";
      var retour = "\r\n";
      var collHelpTip = {
        animationHelpTip:
          "Select one of these options for any type of property." +
          retour +
          "For colors you also have to choose a color option below.",
        colorsHelpTip:
          "- Gradient: randomly picks a color between 2 selected colors." +
          retour +
          "- Palette: uses between 1 and 10 specific colors." +
          retour +
          '- HSL: independently controls "hue", "saturation" and "luminosity".' +
          para +
          'Color options can not be used with the "Wiggle" parameter.',
        deleteHelpTip:
          "Delete the selected Randomatic effects" +
          retour +
          "and all the associated expressions." +
          para +
          "ALT: Clears the selected layers of any" +
          retour +
          "Randomatic occurrence.",
        randomGeneratorHelpTip:
          'Random all the "random generator" properties' +
          para +
          'ALT: Random all the "layer speed" parameters.',
        replaceHelpTip:
          "Replace the selected Randomatic effect with the new" +
          retour +
          "new selected options on the script panel." +
          para +
          "ALT: Execute this option only in the open composition.",
        transferHelpTip:
          "Transfer selected Randomatic controllers" +
          retour +
          "on any other layer of the project.",
      };
      return collHelpTip;
    }
    function fctFolder(argSubFolder) {
      var userDataFolder = Folder.userData;
      var randomaticFolder = Folder(
        userDataFolder.toString() +
          "/Aescripts/Randomatic2/" +
          scriptVersion +
          argSubFolder,
      );
      if (!randomaticFolder.exists) {
        randomaticFolder.create();
      }
      var randomaticFolderPath = randomaticFolder.absoluteURI.toString();
      return randomaticFolderPath;
    }
    function getUserDataFolder() {
      try {
        var userDataFolder = Folder.userData;
        var aescriptsFolder = Folder(
          userDataFolder.toString() + "/Aescripts/Randomatic 2/",
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
      } catch (err) {}
    }
    function fctBinaryIcons() {
      var randomaticFolderPath = fctFolder("/icons");
      var applyBinary = __BLOB__BLOB_000460__;
      var binaryDelete = __BLOB__BLOB_000461__;
      var binaryRandomGenerator = __BLOB__BLOB_000462__;
      var binaryReplace = __BLOB__BLOB_000463__;
      var binaryTransfer = __BLOB__BLOB_000464__;
      var filetBinary = __BLOB__BLOB_000465__;
      var arrayBinaryIcons = [
        applyBinary,
        binaryReplace,
        binaryDelete,
        binaryTransfer,
        binaryRandomGenerator,
        filetBinary,
      ];
      var arrayIconsName = [
        "apply",
        "replace",
        "delete",
        "transfer",
        "randomGenerator",
        "filet",
      ];
      var arrayBinaryIconsFiles = [];
      for (var b = 0; b < arrayBinaryIcons.length; b += 1) {
        var myFile = new File(
          randomaticFolderPath + "/" + "icon_" + arrayIconsName[b] + ".png",
        );
        var myFilePath = myFile.absoluteURI;
        arrayBinaryIconsFiles.push(myFilePath);
        if (!myFile.exists) {
          myFile.encoding = "BINARY";
          myFile.open("w");
          myFile.write(arrayBinaryIcons[b]);
          myFile.close();
        }
      }
      return arrayBinaryIconsFiles;
    }
    function fctRadioChange() {
      if (radioOffset.value === true) {
        pnlOffset.visible = true;
        pnlStretch.visible = false;
        pnlIndex.visible = false;
      } else if (radioStretch.value === true) {
        pnlOffset.visible = false;
        pnlStretch.visible = true;
        pnlIndex.visible = false;
      } else {
        if (radioIndex.value === true) {
          pnlOffset.visible = false;
          pnlStretch.visible = false;
          pnlIndex.visible = true;
        }
      }
    }
    function fctInputOnChange(argInput, argPrevInput) {
      var blacklist = new RegExp("[a-zA-Z]");
      var res = blacklist.test(argInput.text);
      var parseResult = parseFloat(argInput.text);
      if (isNaN(parseResult) === false && res === false) {
        argInput.text = eval(argInput.text);
        return argInput.text;
      } else {
        argInput.text = argPrevInput;
        return argPrevInput;
      }
    }
    function fctSetMyComp() {
      app.activeViewer.setActive();
      myComp = app.project.activeItem;
      return myComp;
    }
    function getRandomInt(minValue, maxValue) {
      return Math.round(Math.random() * (maxValue - minValue) + minValue);
    }
    function fctStretch() {
      app.beginUndoGroup("undofctStretch");
      try {
        myComp = fctSetMyComp();
        myLayers = myComp.selectedLayers;
        stretchOriginChoice = listStretchOrigin.selection.index;
        var trap = myLayers[0].name;
      } catch (e) {
        return alert("Please select at least one layer.", "Randomatic 2");
      }
      if (rcTrial === true) {
        if (myComp.selectedLayers.length > 5) {
          alert(
            "The random stretching is limited to 5 layers in the trial version.",
            "Randomatic 2 - trial version",
          );
          return;
        }
      }
      var minStretch = inputStretchMin.text;
      var maxStretch = inputStretchMax.text;
      var min = Math.round(minStretch * 10) / 10;
      var max = Math.round(maxStretch * 10) / 10;
      for (var a = 0; a < myLayers.length; a += 1) {
        var myLayer = myLayers[a];
        var myLayerIn = myLayer.inPoint;
        var myLayerOut = myLayer.outPoint;
        var myLayerStart = myLayer.startTime;
        var randomStretchValue = getRandomInt(min, max);
        if (chkAffectKeys.value === true) {
          myLayer.duplicate();
        }
        myLayer.stretch = randomStretchValue;
        if (stretchOriginChoice === 0) {
          var myLayerNewIn = myLayer.inPoint;
          var myLayerDiffIn = myLayerIn - myLayerNewIn;
          myLayer.startTime += myLayerDiffIn;
        } else if (stretchOriginChoice === 1) {
          var myLayerNewOut = myLayer.outPoint;
          var diffOut = myLayerOut - myLayerNewOut;
          myLayer.startTime += diffOut;
        } else {
          var myLayerNewIn = myLayer.inPoint;
          var myLayerNewOut = myLayer.outPoint;
          var currentTime = myLayer.time;
          var myLayerDuration = myLayerOut - myLayerIn;
          var myLayerNewDuration = myLayerNewOut - myLayerNewIn;
          var pourcent = ((currentTime - myLayerIn) * 100) / myLayerDuration;
          var diffInCurrentTime = currentTime - myLayerNewIn;
          var newTimePourcent = (myLayerNewDuration / 100) * pourcent;
          myLayer.startTime =
            myLayer.startTime - (newTimePourcent - diffInCurrentTime);
        }
        if (chkAffectKeys.value === true) {
          fctSearchKeys(myLayer);
          myComp.layer(myLayer.index - 1).remove();
        }
      }
      app.endUndoGroup();
    }
    function fctCopyright() {
      var optionName = fctOptionNames();
      var animationFullName = optionName.animationFullName;
      var colorFullName = optionName.colorFullName;
      var troncCommun =
        "// " +
        scriptName +
        " v" +
        scriptVersion +
        " - " +
        animationFullName +
        " - " +
        "coucou" +
        retour +
        "// aescripts.com/randomatic" +
        retour +
        "// Romain Cousin - www.behance.net/romaincousin" +
        para;
      if (p < 4) {
        copyright = troncCommun.replace("coucou", p + "D");
      } else {
        copyright = troncCommun.replace("coucou", colorFullName);
      }
      return copyright;
    }
    function fctRandomGenerator() {
      if (fctAltState() === true) {
        fctSpeedRandom();
        return;
      }
      var shiftState = fctShiftState();
      app.beginUndoGroup("undoFctRandomGenerator");
      try {
        myComp = fctSetMyComp();
        var trap = myComp.name;
      } catch (e) {
        return alert(
          "Please select at least one Randomatic controller.",
          "Randomatic 2",
        );
      }
      var selectedProperties = myComp.selectedProperties;
      if (selectedProperties.length != 0) {
        for (var s = 0; s < selectedProperties.length; s += 1) {
          var currentEffect = selectedProperties[s];
          var verifSingleRandomaticEffect =
            fctVerifSingleRandomaticEffect(currentEffect);
          if (verifSingleRandomaticEffect === true) {
            var randomGeneratorProp =
              currentEffect.property("random generator");
            var randomGeneratorValue = Math.round(Math.random() * 10000);
            if (randomGeneratorProp.numKeys > 0) {
              randomGeneratorProp.setValueAtTime(
                myComp.time,
                randomGeneratorValue,
              );
            } else {
              randomGeneratorProp.setValue(randomGeneratorValue);
            }
          }
        }
        if (verifSingleRandomaticEffect === false) {
          fctRandomGeneratorAll(shiftState);
        }
      } else {
        if (
          myComp.selectedLayers.length === 0 ||
          selectedProperties.length === 0
        ) {
          fctRandomGeneratorAll();
        }
      }
      app.endUndoGroup();
    }
    function fctRandomGeneratorAll(arguShiftState) {
      var myComp = app.project.activeItem;
      var numRandomatic = 0;
      var numLayers = myComp.numLayers;
      for (var l = 1; l <= numLayers; l += 1) {
        var currentLayer = myComp.layer(l);
        try {
          numEffects =
            currentLayer.property("ADBE Effect Parade").numProperties;
          arrayRandomaticEffects = [];
        } catch (e) {
          numEffects = 0;
        }
        for (var e = 1; e <= numEffects; e += 1) {
          var currentEffect = currentLayer
            .property("ADBE Effect Parade")
            .property(e);
          var randomGeneratorProp = currentEffect.property("random generator");
          var verifSingleRandomaticEffect =
            fctVerifSingleRandomaticEffect(currentEffect);
          if (verifSingleRandomaticEffect === true) {
            var randomGeneratorValue = Math.round(Math.random() * 10000);
            if (randomGeneratorProp.numKeys > 0 || arguShiftState === true) {
              randomGeneratorProp.setValueAtTime(
                myComp.time,
                randomGeneratorValue,
              );
            } else {
              randomGeneratorProp.setValue(randomGeneratorValue);
            }
            numRandomatic++;
          }
        }
      }
      if (numRandomatic === 0) {
        return alert(
          "There is no Randomatic controller in this composition.",
          "Randomatic 2",
        );
      }
    }
    function fctStoreProp() {
      try {
        altState = fctAltState();
        myComp = fctSetMyComp();
        var trap =
          app.project.activeItem.selectedLayers[0].selectedProperties[0].name;
      } catch (e) {
        return alert("Please select a property.", "Randomatic 2");
      }
      var arrayStore = [];
      for (var m = 0; m < myComp.selectedLayers.length; m += 1) {
        propGroup = myComp.selectedLayers[m];
        for (var i = 0; i < propGroup.selectedProperties.length; i += 1) {
          prop = propGroup.selectedProperties[i];
          if (prop.propertyType == PropertyType.PROPERTY) {
            arrayStore.push(prop);
          }
        }
      }
      if (arrayStore.length > 1) {
        return alert("Please select a single property.", "Randomatic 2");
      } else if (arrayStore.length < 1) {
        return alert("Please select a property.", "Randomatic 2");
      } else if (
        myComp.selectedLayers.length > 1 ||
        (arrayStore.length === 1 && myComp.selectedLayers.length > 1)
      ) {
        return alert("Please select a single layer.", "Randomatic 2");
      } else {
        myProp = arrayStore[0];
      }
      defPropPath = fctBuildPropPath(arrayStore[0], "property");
      fctNoSelection();
      if (altState === true) {
        fctAutoSelectProps();
      }
    }
    function fctBuildPropPath(
      argCurrentProp,
      argCompIndex,
      argLayerIndex,
      argDepth,
    ) {
      var arrayParent = [];
      var arrayParentReverse = [];
      var currentProp = argCurrentProp;
      var propDepth = argCurrentProp.propertyDepth;
      if (currentProp.parentProperty.isEffect === false) {
        arrayParent.push('("' + currentProp.name + '")');
      } else {
        arrayParent.push('("' + currentProp.matchName + '")');
      }
      for (var a = 1; a <= propDepth - 1; a += 1) {
        currentParentProp = currentProp.propertyGroup(a);
        arrayParent.push('("' + currentParentProp.name + '")');
      }
      if (argDepth == "layer") {
        arrayParent.push(
          "app.project.item(" + argCompIndex + ").layer(" + argLayerIndex + ")",
        );
      }
      arrayParentReverse = arrayParent.reverse();
      var propPath = arrayParentReverse.join("");
      return propPath;
    }
    function fctToggleJSDebugger() {
      app.beginUndoGroup("Toggle Javascript Debugger");
      try {
        if (parseFloat(app.version) >= 12) {
          newSetting = !(
            app.preferences.getPrefAsLong(
              "Main Pref Section v2",
              "Pref_JAVASCRIPT_DEBUGGER",
              PREFType.PREF_Type_MACHINE_INDEPENDENT,
            ) === 1
          );
          app.preferences.savePrefAsLong(
            "Main Pref Section v2",
            "Pref_JAVASCRIPT_DEBUGGER",
            newSetting,
            PREFType.PREF_Type_MACHINE_INDEPENDENT,
          );
        } else {
          newSetting = !(
            app.preferences.getPrefAsLong(
              "Main Pref Section",
              "Pref_JAVASCRIPT_DEBUGGER",
            ) === 1
          );
          app.preferences.savePrefAsLong(
            "Main Pref Section",
            "Pref_JAVASCRIPT_DEBUGGER",
            newSetting,
          );
        }
        app.preferences.saveToDisk();
        app.preferences.reload();
      } catch (e) {}
      app.endUndoGroup();
    }
    function getDebuggerState() {
      if (parseFloat(app.version) >= 12) {
        return Boolean(
          app.preferences.getPrefAsLong(
            "Main Pref Section v2",
            "Pref_JAVASCRIPT_DEBUGGER",
            PREFType.PREF_Type_MACHINE_INDEPENDENT,
          ),
        );
      } else {
        return Boolean(
          app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_JAVASCRIPT_DEBUGGER",
          ),
        );
      }
    }
    function fctAutoSelectProps() {
      var JSdebug = getDebuggerState();
      if (JSdebug === true) {
        fctToggleJSDebugger();
      }
      var myComp = fctSetMyComp();
      var selectedProps = myComp.selectedProperties;
      var arrayUndefinedLayers = [];
      for (var a = 0; a < selectedProps.length; a += 1) {
        selectedProps[a].selected = false;
      }
      var selectedLayers = myComp.selectedLayers;
      if (selectedLayers.length === 0) {
        for (var n = 1; n <= myComp.numLayers; n += 1) {
          myComp.layer(n).selected = true;
        }
      }
      selectedLayers = myComp.selectedLayers;
      for (var b = 0; b < selectedLayers.length; b += 1) {
        var propPath =
          "app.project.activeItem.selectedLayers[" + b + "]" + defPropPath;
        try {
          if (isValid(eval(propPath)) === true) {
            eval(propPath).selected = true;
          } else {
            continue;
          }
        } catch (e) {
          arrayUndefinedLayers.push(app.project.activeItem.selectedLayers[b]);
        }
      }
      for (var c = 0; c < arrayUndefinedLayers.length; c += 1) {
        arrayUndefinedLayers[c].selected = false;
      }
      if (JSdebug === true && getDebuggerState() === false) {
        fctToggleJSDebugger();
      }
    }
    function fctSpeedRandom() {
      app.beginUndoGroup("undoFctSpeedRandom");
      var myComp = fctSetMyComp();
      var numLayers = myComp.numLayers;
      for (var i = 1; i <= numLayers; i += 1) {
        currentLayer = app.project.activeItem.layer(i);
        if (
          currentLayer.effect("Pseudo/RandomaticLayer") != "undefined" &&
          currentLayer.effect("Pseudo/RandomaticLayer") != null
        ) {
          var currentEffect = currentLayer.effect("Pseudo/RandomaticLayer");
          var layerSpeedValue = Math.random() * 100;
          currentEffect.property("layer speed").setValue(layerSpeedValue);
        }
      }
      app.endUndoGroup();
    }
    function fctUIProgressBar(argPBLimit, argTitle) {
      var winL = 380;
      var margins = 20;
      var txtH = 25;
      var PBy = margins + txtH + margins - 10;
      var PBwidth = 10;
      var btnL = 90;
      var btnH = 35;
      var btnY = PBy + PBwidth + margins;
      var winH = btnY + btnH + margins;
      PBWin = new Window("palette", argTitle, [0, 0, winL, winH], {
        closeButton: true,
      });
      ProgressText = PBWin.add(
        "statictext",
        [margins, margins - 5, winL - margins, margins + txtH],
        "Progress...",
        { multiline: false },
      );
      ProgressBar = PBWin.add(
        "progressbar",
        [margins, PBy, winL - margins, PBy + PBwidth],
        0,
        argPBLimit,
      );
      btnDone = PBWin.add(
        "button",
        [winL - margins - btnL, btnY, winL - margins - 2, btnY + btnH],
        "Ok",
      );
      this.windowRef = PBWin;
      PBWin.show();
      PBWin.center();
      btnDone.onClick = function () {
        PBWin.close();
      };
      PBWin.update();
    }
    function fctPBValue(newValue) {
      ProgressBar.value = newValue;
      PBWin.update();
    }
    function fctUITransfer(argTransferPBLimit, argArray, argNbEffects) {
      var winL = 390;
      var margins = 30;
      var pnlMargins = 25;
      var txtH = 25;
      var PBwidth = 10;
      var btnL = 100;
      var btnH = 35;
      var effectsListHeight = argNbEffects * 15;
      if (argNbEffects > 1) {
        var txtPanel = "Selected controllers";
      } else {
        var txtPanel = "Selected controller";
      }
      PBWin = new Window(
        "palette",
        "Randomatic - Transfer",
        [0, 0, winL, 330 + effectsListHeight],
        { closeButton: true },
      );
      var pnlTransferProps = PBWin.add(
        "panel",
        [pnlMargins, 20, winL - pnlMargins, 70 + effectsListHeight],
        "1/2  -  " + txtPanel,
      );
      var pnlTransferListProps = pnlTransferProps.add(
        "staticText",
        [pnlMargins, 20, 355, 20 + effectsListHeight],
        argArray,
        { multiline: true },
      );
      var pnlTransferLayer = PBWin.add(
        "panel",
        [
          pnlMargins,
          90 + effectsListHeight,
          winL - pnlMargins,
          180 + effectsListHeight,
        ],
        "2/2  -  Select the new destination layer",
      );
      btnTransfer = pnlTransferLayer.add(
        "button",
        [margins, 20, winL - pnlMargins - margins * 2, 60],
        "Transfer",
      );
      var grpProgressBar = PBWin.add("group", [
        pnlMargins,
        200 + effectsListHeight,
        winL - pnlMargins + 2,
        280 + effectsListHeight,
      ]);
      ProgressText = grpProgressBar.add(
        "staticText",
        [0, 0, winL - pnlMargins, 20],
        "",
      );
      ProgressBar = grpProgressBar.add(
        "progressbar",
        [0, margins, winL - pnlMargins * 2, margins + PBwidth],
        0,
        argTransferPBLimit,
      );
      var grpBoutonsOkCancel = PBWin.add("group", [
        pnlMargins,
        265 + effectsListHeight,
        winL - pnlMargins,
        300 + effectsListHeight,
      ]);
      btnTransferCancel = grpBoutonsOkCancel.add(
        "button",
        [0, 0, btnL, btnH],
        "Cancel",
      );
      btnTransferOk = grpBoutonsOkCancel.add(
        "button",
        [
          btnL + (winL - 2 * btnL - 2 * pnlMargins),
          0,
          winL - pnlMargins * 2,
          btnH,
        ],
        "Ok",
      );
      this.windowRef = PBWin;
      PBWin.show();
      PBWin.center();
      btnTransferOk.onClick = function () {
        PBWin.close();
      };
      btnTransferCancel.onClick = function () {
        PBWin.close();
      };
      btnTransfer.onClick = fctTransfer;
      PBWin.update();
    }
    function fctTransferSelect() {
      arrayTransferControllersName = [];
      arrayTransferControllersIndex = [];
      arrayTransferControllers = [];
      try {
        myLayer = app.project.activeItem.selectedLayers[0];
        transferEffects =
          app.project.activeItem.selectedLayers[0].selectedProperties;
        selectedEffects =
          app.project.activeItem.selectedLayers[0].selectedProperties;
        var trap =
          app.project.activeItem.selectedLayers[0].selectedProperties[0].name;
        transferLayerA = myLayer;
        transferOriginalCompName = app.project.activeItem.name;
        transferCompAIndex = fctGetCompIndex(app.project.activeItem);
        if (app.project.activeItem.selectedLayers.length > 1) {
          return alert(
            "Please select Randomatic controllers from a unique layer.",
            "Randomatic 2",
          );
        }
      } catch (e) {
        return alert(
          "Please select at least one Randomatic controller" +
            retour +
            " you want to move.",
          "Randomatic 2",
        );
      }
      var returnFctVerifRandomaticEffect =
        fctVerifRandomaticEffect(selectedEffects);
      var verifRandomaticEffect =
        returnFctVerifRandomaticEffect.verifRandomaticEffect;
      if (verifRandomaticEffect === true) {
        for (var a = 0; a < selectedEffects.length; a += 1) {
          arrayTransferControllersIndex.push(selectedEffects[a].index);
          arrayTransferControllersName.push(selectedEffects[a].name);
          arrayTransferControllers.push(selectedEffects[a]);
        }
        var arrayListNames = arrayTransferControllersName.join(retour);
        fctUITransfer(
          transferPBLimit,
          arrayListNames,
          arrayTransferControllersName.length,
        );
        btnTransferOk.enabled = false;
      } else {
        return alert(
          "Please only select Randomatic controllers.",
          "Randomatic 2",
        );
      }
    }
    function fctTransfer() {
      app.beginUndoGroup("undoTransfer");
      btnTransferCancel.enabled = false;
      btnTransfer.enabled = false;
      var transferCompBIndex = fctGetCompIndex(app.project.activeItem);
      var arrTransferEffectsIndex = [];
      for (var e = 0; e <= transferEffects.length - 1; e += 1) {
        arrTransferEffectsIndex.push(transferEffects[e].propertyIndex);
      }
      try {
        myComp = app.project.activeItem;
        transferDestinationCompName = myComp.name;
        transferLayerB = myComp.selectedLayers[0];
        var trap = myComp.selectedLayers[0].name;
      } catch (e) {
        btnTransferCancel.enabled = true;
        btnTransfer.enabled = true;
        ProgressText.text = "Please select a destination layer.";
        return;
      }
      var numLayersCompB = myComp.numLayers;
      for (var n = 1; n <= numLayersCompB; n += 1) {
        currentLayer = myComp.layer(n);
        if (
          currentLayer != transferLayerB &&
          currentLayer.name === transferLayerB.name
        ) {
          btnTransferCancel.enabled = true;
          btnTransfer.enabled = true;
          return (ProgressText.text =
            "To avoid errors please rename your layer with a unique name.");
        }
      }
      if (transferLayerA == transferLayerB) {
        btnTransferCancel.enabled = true;
        btnTransfer.enabled = true;
        return (ProgressText.text =
          "You have selected the original layer. Please select a new one.");
      }
      try {
        for (var a = 0; a < arrayTransferControllers.length; a += 1) {
          if (
            arrayTransferControllers[a].index !=
            arrayTransferControllersIndex[a]
          ) {
            transferLayerB.selected = false;
            transferLayerA.selected = true;
            return alert(
              "Randomatic cannot find the selected controllers." +
                retour +
                "They may have been moved or deleted. Please select them again.",
              "Randomatic 2",
            );
          }
        }
      } catch (e) {
        transferLayerA.selected = true;
        transferLayerB.selected = false;
        return alert(
          "Randomatic cannot find the selected controllers." +
            retour +
            "They may have been moved or deleted. Please select them again.",
          "Randomatic 2",
        );
      }
      var numEffects =
        transferLayerB.property("ADBE Effect Parade").numProperties;
      var arrayExistingEffects = [];
      for (var a = 1; a <= numEffects; a += 1) {
        var currentEffect = transferLayerB
          .property("ADBE Effect Parade")
          .property(a);
        arrayExistingEffects.push(a);
      }
      for (var b = 1; b <= numEffects; b += 1) {
        for (var c = 0; c < arrayTransferControllers.length; c += 1) {
          if (
            transferLayerB.property("ADBE Effect Parade").property(b).name ===
            arrayTransferControllers[c].name
          ) {
            var oldName = arrayTransferControllers[c].name;
            var increment = fctIncrement(true, oldName, arrayExistingEffects);
            var newName = oldName + increment;
            arrayTransferControllers[c].name = newName;
            app.project.autoFixExpressions(oldName, newName);
            arrayExistingEffects.push(newName);
          }
        }
      }
      fctNoSelection();
      for (var d = 1; d <= numEffects; d += 1) {
        myComp
          .layer(transferLayerB.index)
          .property("ADBE Effect Parade")
          .property(d).selected = true;
      }
      app.executeCommand(2080);
      selectedProps = myComp.layer(transferLayerB.index).selectedProperties;
      for (var f = 0; f < selectedProps.length; f += 1) {
        selectedProps[f].name = "duplicate effect - you can delete it safely";
      }
      transferLayerB.selected = false;
      for (var g = 0; g < arrayTransferControllers.length; g += 1) {
        arrayTransferControllers[g].selected = true;
      }
      app.executeCommand(19);
      transferLayerA.selected = false;
      transferLayerB.selected = true;
      app.executeCommand(20);
      var myNewEffects = transferLayerB.selectedProperties;
      var numComps = fctNumComps();
      transferPBLimit = numComps.length;
      PBWin.update();
      for (var p = 0; p < transferLayerB.selectedProperties.length; p += 1) {
        ProgressText.text =
          'Transferring "' + transferLayerB.selectedProperties[p].name + '"...';
        PBWin.update();
        for (var h = 0; h < numComps.length; h += 1) {
          var currentComp = numComps[h];
          var currentCompIndex = fctGetCompIndex(currentComp);
          fctPBValue(h + 1);
          for (var c = 1; c <= currentComp.numLayers; c += 1) {
            currentLayer = currentComp.layer(c);
            currentEffect = transferLayerB.selectedProperties[p];
            fctTransferScanExpressions(
              currentLayer,
              currentEffect,
              currentComp,
              transferCompAIndex,
              transferCompBIndex,
              currentCompIndex,
            );
          }
        }
      }
      var numEffectsDuplicate =
        transferLayerB.property("ADBE Effect Parade").numProperties;
      for (
        var j = numEffectsDuplicate - arrayTransferControllers.length;
        j > 0;
        j -= 2
      ) {
        transferLayerB.property("ADBE Effect Parade").property(j).remove();
      }
      for (var e = arrTransferEffectsIndex.length - 1; e >= 0; e--) {
        transferLayerA.effect(arrTransferEffectsIndex[e]).remove();
      }
      var newNumEffects =
        transferLayerB.property("ADBE Effect Parade").numProperties;
      fctNoSelection();
      var transferLayersAB = [transferLayerA, transferLayerB];
      fctLayerSpeed(transferLayersAB);
      for (
        var n = newNumEffects;
        n > newNumEffects - arrayTransferControllers.length;
        n -= 1
      ) {
        transferLayerB.property("ADBE Effect Parade").property(n).selected =
          true;
      }
      if (arrayTransferControllersName.length === 1) {
        ProgressText.text =
          '"' +
          arrayTransferControllersName[0] +
          '" has been successfully transfered.';
      } else {
        ProgressText.text = "Transfer completed.";
      }
      fctPBValue(1000);
      btnTransferOk.enabled = true;
      btnTransferCancel.enabled = false;
      PBWin.show();
      PBWin.update();
      arrayTransferControllersName = [];
      arrayTransferControllersIndex = [];
      arrayTransferControllers = [];
      app.endUndoGroup();
    }
    function fctRandomatic() {
      var altState = fctAltState();
      app.executeCommand(2372);
      app.beginUndoGroup("undoFctRandomatic");
      var animationChoice = listAnimation.selection.index;
      var colorChoice = listColors.selection.index;
      if (
        animationChoice != 0 &&
        animationChoice != 1 &&
        animationChoice != 2
      ) {
        return alert(
          'Please select an option between "Static random", "Animated random" or "Wiggle".',
          "Randomatic 2",
        );
      } else {
        if (colorChoice != 0 && colorChoice != 1 && colorChoice != 2) {
          return alert("Please select a color option.", "Randomatic 2");
        }
      }
      try {
        myComp = fctSetMyComp();
        myLayer = myComp.selectedLayers[0];
        numLayers = myComp.numLayers;
        selectedProps = myComp.selectedProperties;
        numSelectedProps = selectedProps.length;
        indexFirstSelectedLayer = myComp.selectedLayers[0].index;
        var trap = myComp.selectedProperties[0].name;
      } catch (e) {
        return alert("Please select at least one property.", "Randomatic 2");
      }
      if (
        chkControllerLayer.value === true &&
        (myLayer instanceof LightLayer || myLayer instanceof CameraLayer)
      ) {
        return alert(
          "After Effects doesn\'t allow the creation of controllers on camera or light layers." +
            retour +
            'Please uncheck "Controllers on selected layers" and try again.',
          "Randomatic 2",
        );
      }
      var isEffect = false;
      var isEffectFirstLayer = false;
      if (animationChoice === 1 || animationChoice === 2) {
        for (var e = 0; e < selectedProps.length; e += 1) {
          if (selectedProps[e].isEffect === true) {
            isEffect = true;
            break;
          }
        }
      } else {
        for (
          var a = 0;
          a < myComp.selectedLayers[0].selectedProperties.length;
          a += 1
        ) {
          if (
            myComp.selectedLayers[0].selectedProperties[a].isEffect === true
          ) {
            isEffectFirstLayer = true;
            break;
          }
        }
      }
      var rtnStockProperties = fctStockProperties();
      var arrayStockProps = rtnStockProperties.arrayStockProps;
      var arrayLayers = rtnStockProperties.arrayLayers;
      if (arrayStockProps.length === 0) {
        if (numSelectedProps === 1) {
          alert(
            "Randomatic cannot be applied on this property.",
            "Randomatic 2",
          );
          return;
        } else {
          alert(
            "Randomatic cannot be applied on these properties.",
            "Randomatic 2",
          );
          return;
        }
      }
      var arrayFctDimensions = [];
      arrayFctDimensions = fctDimensions(arrayStockProps, arrayLayers);
      var arrayPropsName = arrayFctDimensions[0];
      var arrayDimensions = arrayFctDimensions[1];
      var arrayRandomaticProps = arrayFctDimensions[2];
      if (
        fctIdenticalProps(arrayPropsName, arrayDimensions) === false ||
        fctWiggleColor() === false
      ) {
        return;
      }
      if (p === 0) {
        var propName = arrayPropsName[0];
        alert(
          'Randomatic cannot be applied on "' +
            propName +
            '".' +
            retour +
            "Please select another property.",
          "Randomatic 2",
        );
        return;
      }
      PBLimit = numSelectedProps * 1.3;
      fctUIProgressBar(PBLimit, "Randomatic");
      ProgressText.text = "Creating the Randomatic effect...";
      btnDone.enabled = false;
      fctPBValue(0);
      nameSelectedProperty = arrayStockProps[0].name;
      var futureName = fctControllerName(nameSelectedProperty);
      var copyright = fctCopyright();
      fctPBValue(ProgressBar.value + numSelectedProps * 0.1);
      if (altState === true || chkControllerLayer.value === true) {
        bingo = myLayer.index;
      } else {
        bingo = fctLayerNameSearch("Randomatic Controllers");
      }
      if (
        bingo === 0 &&
        chkControllerLayer.value === false &&
        altState === false
      ) {
        fctCreateNull("Randomatic Controllers", "[0,0]", "[100,100]", 2);
        bingo = 1;
        fctNoSelection();
        myComp.layer(bingo).selected = true;
        increment = "";
      } else {
        var arrayControllersName = fctArrayControllersName(bingo, undefined);
        var identicalEffectsName = fctEffectsNameComparaison(
          futureName,
          arrayControllersName,
        );
        increment = fctIncrement(
          identicalEffectsName,
          futureName,
          arrayControllersName,
        );
      }
      fctPBValue(ProgressBar.value + numSelectedProps * 0.1);
      var myCompIndex = fctGetCompIndex(myComp);
      var newArrayRandomaticProps = [];
      if (isEffect === true) {
        for (var n = 0; n < arrayRandomaticProps.length; n += 1) {
          var propPath = fctBuildPropPath(
            arrayRandomaticProps[n],
            myCompIndex,
            fctPropToLayerIndex(arrayRandomaticProps[n]),
            "layer",
          );
          newArrayRandomaticProps.push(propPath);
        }
      } else {
        if (isEffectFirstLayer === true) {
          var propPath = fctBuildPropPath(
            arrayRandomaticProps[0],
            myCompIndex,
            fctPropToLayerIndex(arrayRandomaticProps[0]),
            "layer",
          );
          newArrayRandomaticProps.push(propPath);
        }
      }
      var effectFileName = fctEffectFileName();
      fctEffectCreation(
        bingo,
        effectFileName,
        expressionController,
        futureName,
        increment,
      );
      myComp.layer(bingo).effect(effectFileName).name = futureName + increment;
      fctNoSelection();
      fctLayerSpeedBingo(bingo);
      fctLoopEffectLayer(arrayLayers);
      if (newArrayRandomaticProps.length != 0) {
        for (var n = 0; n < newArrayRandomaticProps.length; n += 1) {
          arrayRandomaticProps.splice(n, 1, eval(newArrayRandomaticProps[n]));
        }
      }
      var expressionController = fctSetExpressions(
        bingo,
        fctRandomatic,
        futureName,
        increment,
        copyright,
        arrayRandomaticProps,
      );
      myComp.layer(bingo).effect(futureName + increment)(
        "sync. layers value",
      ).expression = expressionController;
      myComp.layer(bingo).effect(futureName + increment).selected = true;
      ProgressText.text =
        '"' + futureName + increment + '" has been successfully created.';
      btnDone.enabled = true;
      fctPBValue(PBLimit);
      app.endUndoGroup();
    }
    function fctGetCompIndex(comp) {
      var itemNum = 0;
      for (var i = 1; i <= app.project.numItems; i += 1) {
        currentItem = app.project.item(i);
        if (currentItem instanceof CompItem && currentItem === comp) {
          itemNum = i;
          break;
        }
      }
      return itemNum;
    }
    function fctReplaceController() {
      var altState = fctAltState();
      app.executeCommand(2372);
      app.beginUndoGroup("undoReplaceController");
      var animationChoice = listAnimation.selection.index;
      var colorChoice = listColors.selection.index;
      try {
        var compIndex = fctGetCompIndex(app.project.activeItem);
        var myComp = app.project.item(compIndex);
        var myLayer = app.project.activeItem.selectedLayers[0];
        var selectedEffects =
          app.project.activeItem.selectedLayers[0].selectedProperties;
        myEffectLayerIndex = myComp.selectedLayers[0].index;
        myEffect = myComp.selectedLayers[0].selectedProperties[0];
        myEffectPropIndex = myEffect.propertyIndex;
      } catch (e) {
        return alert(
          "Please select the Randomatic controller you want to replace.",
          "Randomatic 2",
        );
      }
      var returnFctVerifRandomaticEffect =
        fctVerifRandomaticEffect(selectedEffects);
      var verifRandomaticEffect =
        returnFctVerifRandomaticEffect.verifRandomaticEffect;
      var nbAnimController = returnFctVerifRandomaticEffect.nbAnimController;
      if (verifRandomaticEffect === false && selectedEffects.length === 1) {
        alert(
          "The selected property is not a Randomatic controller.",
          "Randomatic 2",
        );
        return;
      } else {
        if (selectedEffects.length >= 2) {
          alert(
            "Please select a single Randomatic controller.",
            "Randomatic 2",
          );
          return;
        }
      }
      if (altState === true) {
        var numComps = [myComp];
      } else {
        var numComps = fctNumComps();
      }
      PBLimit = numComps.length * 1.3;
      fctUIProgressBar(PBLimit, "Randomatic");
      btnDone.enabled = false;
      var currentController = selectedEffects[0];
      ProgressText.text = 'Updating "' + currentController.name + '"...';
      PBWin.update();
      var objAllRandomaticProps = {
        compsIndex: [],
        layers: [],
        layersIndex: [],
        props: [],
      };
      for (var c = 0; c < numComps.length; c += 1) {
        var currentComp = numComps[c];
        var currentCompIndex = fctGetCompIndex(currentComp);
        for (var l = 1; l <= currentComp.numLayers; l += 1) {
          var currentLayer = currentComp.layer(l);
          objAllRandomaticProps = fctFindRandomaticProps(
            currentLayer,
            currentLayer,
            objAllRandomaticProps,
            currentCompIndex,
            l,
          );
        }
      }
      var objReplaceRandomaticProps = {
        compsIndex: [],
        expPath: [],
        layers: [],
        layersIndex: [],
        props: [],
        propsDimensions: [],
        propsName: [],
      };
      for (var p = 0; p < objAllRandomaticProps.props.length; p += 1) {
        var currentProp = objAllRandomaticProps.props[p];
        var str = currentProp.expression;
        var relative =
          'thisComp.layer("' +
          myComp.selectedLayers[0].name +
          '").effect("' +
          currentController.name +
          '")';
        var absolute =
          'comp("' +
          myComp.name +
          '").layer("' +
          myComp.selectedLayers[0].name +
          '").effect("' +
          currentController.name +
          '")';
        var currentCompIndex = objAllRandomaticProps.compsIndex[p];
        var currentLayerIndex = objAllRandomaticProps.layersIndex[p];
        if (currentCompIndex == compIndex) {
          if (str.indexOf(relative) != -1 || str.indexOf(absolute) != -1) {
            objReplaceRandomaticProps.props.push(currentProp);
            objReplaceRandomaticProps.layers.push(
              app.project.item(currentCompIndex).layer(currentLayerIndex),
            );
            objReplaceRandomaticProps.layersIndex.push(currentLayerIndex);
            objReplaceRandomaticProps.compsIndex.push(currentCompIndex);
            objReplaceRandomaticProps.expPath.push("relative");
          }
        } else {
          if (str.indexOf(absolute) != -1) {
            objReplaceRandomaticProps.props.push(currentProp);
            objReplaceRandomaticProps.layers.push(
              app.project.item(currentCompIndex).layer(currentLayerIndex),
            );
            objReplaceRandomaticProps.layersIndex.push(currentLayerIndex);
            objReplaceRandomaticProps.compsIndex.push(currentCompIndex);
            objReplaceRandomaticProps.expPath.push("absolute");
          }
        }
      }
      if (objReplaceRandomaticProps.props.length === 0) {
        if (
          confirm(
            "This effect is not associated with any layer." +
              para +
              "Do you want to delete it?",
            true,
            "Randomatic",
          )
        ) {
          myEffect.remove();
        }
        fctPBValue(PBLimit);
        ProgressText.text = "The controller has been successfully removed.";
        btnDone.enabled = true;
        return;
      }
      var returnFctDimensions = fctDimensions(
        objReplaceRandomaticProps.props,
        objReplaceRandomaticProps.layers,
      );
      objReplaceRandomaticProps.propsName = returnFctDimensions[0];
      objReplaceRandomaticProps.propsDimensions = returnFctDimensions[1];
      var proceedIdenticalProps = fctIdenticalProps(
        objReplaceRandomaticProps.propsName,
        objReplaceRandomaticProps.propsDimensions,
      );
      if (fctWiggleColor() === false) {
        ProgressText.text = 'You can not use the "Wiggle" option with colors.';
        btnDone.enabled = true;
        return;
      }
      if (proceedIdenticalProps === false) {
        return;
      } else {
        fctPBValue(numComps.length * 1.1);
        bingo = myEffectLayerIndex;
        var futureName = fctReplaceControllerName(currentController.name);
        var copyright = fctCopyright();
        var arrayControllersName = fctArrayControllersName(
          bingo,
          currentController.propertyIndex,
        );
        var identicalEffectsName = fctEffectsNameComparaison(
          futureName,
          arrayControllersName,
        );
        var increment = fctIncrement(
          identicalEffectsName,
          futureName,
          arrayControllersName,
        );
        var newArrayReplaceProps = [];
        for (var n = 0; n < objReplaceRandomaticProps.props.length; n += 1) {
          var currentProp = objReplaceRandomaticProps.props[n];
          var compIndex = objReplaceRandomaticProps.compsIndex[n];
          var layerIndex = objReplaceRandomaticProps.layersIndex[n];
          var propPath = fctBuildPropPath(
            currentProp,
            compIndex,
            layerIndex,
            "layer",
          );
          newArrayReplaceProps.push(propPath);
        }
        fctNoSelection();
        myComp.layer(bingo).selected = true;
        fctEffectCreation(
          bingo,
          fctEffectFileName(),
          null,
          futureName,
          increment,
        );
        myComp.layer(bingo).effect(fctEffectFileName()).name =
          futureName + increment;
        myComp.layer(bingo).selected = false;
        fctLoopEffectLayer(objReplaceRandomaticProps.layers);
        if (newArrayReplaceProps.length != 0) {
          for (var n = 0; n < newArrayReplaceProps.length; n += 1) {
            objReplaceRandomaticProps.props.splice(
              n,
              1,
              eval(newArrayReplaceProps[n]),
            );
          }
        }
        myComp.layer(bingo).selected = true;
        var arrayExpressions = fctSetExpressions(
          bingo,
          fctReplaceController,
          futureName,
          increment,
          copyright,
          objReplaceRandomaticProps.props,
        );
        var expressionController = arrayExpressions[2];
        var expressionProperties = arrayExpressions[0];
        var expressionPropertiesAbs = arrayExpressions[1];
        for (var e = 0; e < objReplaceRandomaticProps.props.length; e += 1) {
          var currentProp = objReplaceRandomaticProps.props[e];
          if (objReplaceRandomaticProps.expPath[e] == "absolute") {
            currentProp.expression = expressionPropertiesAbs;
          } else if (objReplaceRandomaticProps.expPath[e] == "relative") {
            currentProp.expression = expressionProperties;
          } else {
            currentProp.expression = expressionPropertiesAbs;
          }
        }
        fctScanEffects(bingo, myEffectPropIndex);
        fctPBValue(numComps.length * 1.2);
        myComp.layer(bingo).effect(myEffectPropIndex).remove();
        newEffectIndex = myComp
          .layer(bingo)
          .property("ADBE Effect Parade").numProperties;
        myComp.layer(bingo).effect(newEffectIndex).moveTo(myEffectPropIndex);
        fctNoSelection();
        fctLayerSpeedBingo(bingo);
        fctLayerSpeed(objReplaceRandomaticProps.layers);
        myComp.layer(bingo).effect(futureName + increment)(
          "sync. layers value",
        ).expression = expressionController;
        myComp.layer(bingo).effect(futureName + increment).selected = true;
        fctPBValue(PBLimit);
        ProgressText.text = "The controller has been successfully updated.";
        btnDone.enabled = true;
      }
      app.endUndoGroup();
    }
    function fctTransferScanExpressions(
      propGroup,
      arguCurrentEffect,
      arguCurrentComp,
      arguTransferCompAIndex,
      arguTransferCompBIndex,
      arguCurrentCompIndex,
    ) {
      var myComp = fctSetMyComp();
      var transferDestinationCompName = app.project.activeItem.name;
      for (var i = 1; i <= propGroup.numProperties; i += 1) {
        prop = propGroup.property(i);
        if (prop.propertyType === PropertyType.PROPERTY) {
          var str = prop.expression;
          if (
            prop.canSetExpression === true &&
            str.indexOf("// Romain Cousin") != -1 &&
            str.indexOf('"' + transferLayerA.name + '"') != -1 &&
            str.indexOf('"' + arguCurrentEffect.name + '"') != -1
          ) {
            var transferCompBIndex = fctGetCompIndex(app.project.activeItem);
            if (arguTransferCompBIndex == arguCurrentCompIndex) {
              if (
                str.indexOf('thisComp.layer("' + transferLayerA.name + '"') !=
                -1
              ) {
                var res = str.replace(
                  'thisComp.layer("' + transferLayerA.name + '"',
                  'thisComp.layer("' + transferLayerB.name + '"',
                );
                prop.expression = res;
              } else {
                if (
                  str.indexOf(
                    'comp("' +
                      transferOriginalCompName +
                      '").layer("' +
                      transferLayerA.name +
                      '"',
                  ) != -1
                ) {
                  var res = str.replace(
                    'comp("' +
                      transferOriginalCompName +
                      '").layer("' +
                      transferLayerA.name +
                      '"',
                    'thisComp.layer("' + transferLayerB.name + '"',
                  );
                  prop.expression = res;
                }
              }
            } else if (arguTransferCompAIndex == arguCurrentCompIndex) {
              if (
                str.indexOf('thisComp.layer("' + transferLayerA.name + '"') !=
                -1
              ) {
                var res = str.replace(
                  'thisComp.layer("' + transferLayerA.name + '"',
                  'comp("' +
                    transferDestinationCompName +
                    '").layer("' +
                    transferLayerB.name +
                    '"',
                );
                prop.expression = res;
              } else {
                if (
                  str.indexOf(
                    'comp("' +
                      transferOriginalCompName +
                      '").layer("' +
                      transferLayerA.name +
                      '"',
                  ) != -1
                ) {
                  var res = str.replace(
                    'comp("' +
                      transferOriginalCompName +
                      '").layer("' +
                      transferLayerA.name +
                      '"',
                    'comp("' +
                      transferDestinationCompName +
                      '").layer("' +
                      transferLayerB.name +
                      '"',
                  );
                  prop.expression = res;
                }
              }
            } else {
              if (
                str.indexOf(
                  'comp("' +
                    transferOriginalCompName +
                    '").layer("' +
                    transferLayerA.name +
                    '"',
                ) != -1
              ) {
                var res = str.replace(
                  'comp("' +
                    transferOriginalCompName +
                    '").layer("' +
                    transferLayerA.name +
                    '"',
                  'comp("' +
                    transferDestinationCompName +
                    '").layer("' +
                    transferLayerB.name +
                    '"',
                );
                prop.expression = res;
              }
            }
          }
        } else {
          if (
            prop.propertyType === PropertyType.INDEXED_GROUP ||
            prop.propertyType === PropertyType.NAMED_GROUP
          ) {
            fctTransferScanExpressions(
              prop,
              arguCurrentEffect,
              arguCurrentComp,
              arguTransferCompAIndex,
              arguTransferCompBIndex,
              arguCurrentCompIndex,
            );
          }
        }
      }
    }
    function fctPropToLayerIndex(arguProp) {
      var propDepth = arguProp.propertyDepth;
      var layerIndex = arguProp.propertyGroup(propDepth).index;
      return layerIndex;
    }
    function fctDimensions(argArrayProps, argArrayLayers) {
      var arrayDimensions = [];
      var arrayPropsName = [];
      var arrayProps = [];
      for (var k = 0; k < argArrayProps.length; k += 1) {
        myLayer = argArrayLayers[k];
        myProp = argArrayProps[k];
        if (myProp.propertyType == PropertyType.PROPERTY) {
          switch (myProp.propertyValueType) {
            case PropertyValueType.OneD:
              p = 1;
              break;
            case PropertyValueType.TwoD:
            case PropertyValueType.TwoD_SPATIAL:
              p = 2;
              break;
            case PropertyValueType.ThreeD:
            case PropertyValueType.ThreeD_SPATIAL:
              var indexLayer = fctPropToLayerIndex(myProp);
              if (myLayer.threeDLayer === false) {
                p = 2;
              } else {
                p = 3;
              }
              break;
            case PropertyValueType.COLOR:
              p = 4;
              break;
            default:
              p = 0;
              break;
          }
          arrayDimensions.push(p);
          arrayPropsName.push(myProp.name);
          arrayProps.push(myProp);
        }
      }
      return [arrayPropsName, arrayDimensions, arrayProps];
    }
    function fctIdenticalProps(arrPropsName, arrPropsDim) {
      var verifName = null;
      var verifDim = null;
      var verifSetExpression = null;
      var arrayConfirmName = [];
      var newArrayName = arrPropsName.unique();
      var newArrayDim = arrPropsDim.unique();
      if (newArrayName.length > 1) {
        verifName = false;
      } else {
        verifName = true;
      }
      if (newArrayDim.length > 1) {
        verifDim = false;
      } else {
        verifDim = true;
        if (newArrayDim[0].canSetExpression === false) {
          verifSetExpression = false;
        } else {
          verifSetExpression = true;
        }
      }
      if (verifDim === false) {
        alert(
          "Please select properties with identical names or number of dimensions.",
          "Randomatic 2",
        );
        proceedIdenticalProps = false;
      } else if (verifSetExpression === false) {
        alert(
          "Randomatic can be only used on properties that accept expressions.",
          "Randomatic 2",
        );
      } else if (verifName === false && verifDim === true) {
        if (
          confirm(
            "The selected properties are not identical but have the same number of dimensions:" +
              para +
              "- " +
              newArrayName.join(retour + "- ") +
              para +
              " Do you want to continue?",
          ) == true
        ) {
          proceedIdenticalProps = true;
        } else {
          proceedIdenticalProps = false;
        }
      } else {
        if (verifName === true && verifDim === true) {
          proceedIdenticalProps = true;
        }
      }
      return proceedIdenticalProps;
    }
    function fctWiggleColor() {
      var animationChoice = listAnimation.selection.index;
      if (p === 4 && animationChoice === 2) {
        alert(
          'You can not use the "Wiggle" option with colors properties.' +
            retour +
            'Use "Static random" or "Animated random" instead.',
          "Randomatic 2",
        );
        return false;
      } else {
        return true;
      }
    }
    function fctRandomaticLayerSearch() {
      var myComp = fctSetMyComp();
      var bingo = 0;
      for (var c = 1; c <= myComp.numLayers; c += 1) {
        if (myComp.layer(c).name === "Randomatic Controllers") {
          bingo = c;
          return bingo;
        }
      }
      return bingo;
    }
    function fctSR1D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("min. / max.")[0];\r\n\tvar maxX = rc("min. / max.")[1];\r\n\tvar seed = rc("random generator");\r\n\t\r\n\tseedRandom(seed, true);\r\n\t\r\n\tvar absolute = rc("absolute").value;\r\n\tvar valX;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t} else {\r\n\t\tvalX = value;\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar easingResult;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementSlider = rc("increment value");\r\n\t\tvar diff = Math.abs(minX-maxX);\r\n\t\tvar entier = (Math.floor(diff/incrementSlider))+1;\r\n\t\teasingResult = Math.floor(random()*entier)*incrementSlider+(Math.min(minX,maxX))+valX;\r\n\t} else if (incrementChk === 0) {\r\n\t\teasingResult = random(minX+valX,maxX+valX);\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1 && onOff === 1) {\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tif (absolute === 1) {\r\n\t\tsyncResult = syncLayersValue;\r\n\t} else {\r\n\t\tsyncResult = syncLayersValue + value;\r\n\t}\r\n} else {\r\n\tvar minX = rc("min. / max.")[0];\r\n\tvar maxX = rc("min. / max.")[1];\r\n\tvar seed = rc("random generator");\r\n\t\r\n\tseedRandom(seed, true);\r\n\t\r\n\tvar valX;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t} else {\r\n\t\tvalX = value;\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar easingResult;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementSlider = rc("increment value");\r\n\t\tvar diff = Math.abs(minX-maxX);\r\n\t\tvar entier = (Math.floor(diff/incrementSlider))+1;\r\n\t\teasingResult = Math.floor(random()*entier)*incrementSlider+(Math.min(minX,maxX))+valX;\r\n\t} else if (incrementChk === 0) {\r\n\t\teasingResult = random(minX+valX,maxX+valX);\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctSR2D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar seed = rc("random generator");\r\n\tvar incrementChk = rc("increments").value;\r\n\tseedRandom(seed, true);\r\n\t\r\n\tvar valX, valY;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t}\r\n\t\r\n\tvar endVal;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tendVal = [endValX,endValY];\r\n\t} else if (incrementChk === 0) {\r\n\t\tendVal = random([minX+valX,minY+valY],[maxX+valX,maxY+valY]);\r\n\t}\r\n\r\n\tvar easingResult;\r\n\tif (proportions === 0) {\r\n\t\teasingResult = endVal;\r\n\t} else {\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tratio = value[0]/value[1];\r\n\t\t\teasingResult = [endVal[0],endVal[0]/ratio];\r\n\t\t} else {\r\n\t\t\teasingResult = [endVal[0],endVal[0]];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1) {\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tif (absolute === 1) {\r\n\t\tsyncLayersValue;\r\n\t} else if (proportions === 0) {\r\n\t\tsyncLayersValue+value;\r\n\t} else {\r\n\t\tvar ratio = value[0]/value[1];\r\n\t\tvar syncRelativeX = syncLayersValue[0]+value[0]; \r\n\t\t[syncRelativeX, syncRelativeX / ratio];\r\n\t}\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar seed = rc("random generator");\r\n\tvar incrementChk = rc("increments").value;\r\n\tseedRandom(seed, true);\r\n\t\r\n\tvar valX, valY;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t}\r\n\t\r\n\tvar endVal;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tendVal = [endValX,endValY];\r\n\t} else if (incrementChk === 0) {\r\n\t\tendVal = random([minX+valX,minY+valY],[maxX+valX,maxY+valY]);\r\n\t}\r\n\r\n\tvar easingResult;\r\n\tif (proportions === 0) {\r\n\t\teasingResult = endVal;\r\n\t} else {\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tratio = value[0]/value[1];\r\n\t\t\teasingResult = [endVal[0],endVal[0]/ratio];\r\n\t\t} else {\r\n\t\t\teasingResult = [endVal[0],endVal[0]];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctSR3D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar minZ = rc("Z axis (min. / max.)")[0];\r\n\tvar maxZ = rc("Z axis (min. / max.)")[1];\r\n\tvar seed = rc("random generator");\r\n\tvar incrementChk = rc("increments").value;\r\n\tseedRandom(seed, true);\r\n\t\r\n\tvar valX, valY, valZ;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t\tvalZ = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t\tvalZ = value[2];\r\n\t}\r\n\t\r\n\tvar endVal;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar incrementZSlider = rc("Z increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar diffZ = Math.abs(minZ-maxZ);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar entierZ = (Math.floor(diffZ/incrementZSlider))+1;\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar endValZ = Math.floor(random()*entierZ)*incrementZSlider+(Math.min(minZ,maxZ))+valZ;\r\n\t\tendVal = [endValX,endValY,endValZ];\r\n\t} else if (incrementChk === 0) {\r\n\t\tendVal = random([minX+valX,minY+valY,minZ+valZ],[maxX+valX,maxY+valY,maxZ+valZ]);\r\n\t}\r\n\r\n\tvar easingResult;\r\n\tif (proportions === 0) {\r\n\t\teasingResult = endVal;\r\n\t} else {\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tvar ratioZ = value[0]/value[2];\r\n\t\t\teasingResult = [endVal[0],endVal[0]/ratioY,endVal[0]/ratioZ];\r\n\t\t} else {\r\n\t\t\teasingResult = [endVal[0],endVal[0],endVal[0]];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1) {\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tif (absolute === 1) {\r\n\t\tsyncLayersValue;\r\n\t} else if (proportions === 0) {\r\n\t\tsyncLayersValue+value;\r\n\t} else {\r\n\t\tvar ratioY = value[0]/value[1];\r\n\t\tvar ratioZ = value[0]/value[2];\r\n\t\tvar syncRelativeX = syncLayersValue[0]+value[0];\t\t\r\n\t\t[syncRelativeX, syncRelativeX/ratioY, syncRelativeX/ratioZ];\r\n\t}\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar minZ = rc("Z axis (min. / max.)")[0];\r\n\tvar maxZ = rc("Z axis (min. / max.)")[1];\r\n\tvar seed = rc("random generator");\r\n\tvar incrementChk = rc("increments").value;\r\n\tseedRandom(seed, true);\r\n\t\r\n\tvar valX, valY, valZ;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t\tvalZ = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t\tvalZ = value[2];\r\n\t}\r\n\t\r\n\tvar endVal;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar incrementZSlider = rc("Z increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar diffZ = Math.abs(minZ-maxZ);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar entierZ = (Math.floor(diffZ/incrementZSlider))+1;\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar endValZ = Math.floor(random()*entierZ)*incrementZSlider+(Math.min(minZ,maxZ))+valZ;\r\n\t\tendVal = [endValX,endValY,endValZ];\r\n\t} else if (incrementChk === 0) {\r\n\t\tendVal = random([minX+valX,minY+valY,minZ+valZ],[maxX+valX,maxY+valY,maxZ+valZ]);\r\n\t}\r\n\r\n\tvar easingResult;\r\n\tif (proportions === 0) {\r\n\t\teasingResult = endVal;\r\n\t} else {\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tvar ratioZ = value[0]/value[2];\r\n\t\t\teasingResult = [endVal[0],endVal[0]/ratioY,endVal[0]/ratioZ];\r\n\t\t} else {\r\n\t\t\teasingResult = [endVal[0],endVal[0],endVal[0]];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctSRGradient() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar seed = rc("random generator");\r\n\tseedRandom(seed, true);\r\n\tvar factor = random(0,100);\r\n\tvar color1 = rc("color 1");\r\n\tvar color2 = rc("color 2");\r\n\tvar easingResult = linear(factor, 0, 100, color1, color2);\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1 && onOff === 1) {\r\n\tsyncLayersValue;\r\n\tif (strengthSld === 100) { syncLayersValue; } else { linear(strengthSld, 0, 100, value, syncLayersValue); }\r\n} else {\r\n\tvar seed = rc("random generator");\r\n\tseedRandom(seed, true);\r\n\tvar factor = random(0,100);\r\n\tvar color1 = rc("color 1");\r\n\tvar color2 = rc("color 2");\r\n\tvar easingResult = linear(factor, 0, 100, color1, color2);\r\n\t\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctSRPalette() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minCol = 0;\r\n\tvar maxCol = rc("number of colors").value;\r\n\tvar allColors = [];\r\n\tfor (var c = 1; c < maxCol+1; c++) {\r\n\t\tvar currentCol = rc("color "+c);\r\n\t\tallColors.push(currentCol);\r\n\t}\r\n\r\n\tvar seed = rc("random generator");\r\n\tseedRandom(seed, true);\r\n\r\n\tvar startCol =  Math.floor(random(minCol,maxCol));\r\n\tvar easingResult = allColors[startCol];\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1 && onOff === 1) {\r\n\tif (strengthSld === 100) {\r\n\t\tsyncLayersValue;\r\n\t} else {\r\n\t\tlinear(strengthSld, 0, 100, value, syncLayersValue);\r\n\t}\r\n} else {\r\n\tvar minCol = 0;\r\n\tvar maxCol = rc("number of colors").value;\r\n\tvar allColors = [];\r\n\tfor (var c = 1; c < maxCol+1; c++) {\r\n\t\tvar currentCol = rc("color "+c);\r\n\t\tallColors.push(currentCol);\r\n\t}\r\n\r\n\tvar seed = rc("random generator");\r\n\tseedRandom(seed, true);\r\n\r\n\tvar startCol =  Math.floor(random(minCol,maxCol));\r\n\tvar easingResult = allColors[startCol];\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctSRHSL() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar h = rc("hue (0 > 360)")/360;\r\n\tvar s = rc("saturation")/100;\r\n\tvar l = rc("luminosity")/100;\r\n\r\n\tvar seed = rc("random generator");\r\n\tseedRandom(seed, true);\r\n\trandom([-h, -s, -l],[h, s, l]);\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\n\r\nif (onOff === false || strengthSld === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar syncLayersChk = rc("sync. layers").value;\t\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tvar absolute = rc("absolute").value;\r\n\tvar absoluteColor = rc("absolute color");\r\n\r\n\tvar rgb;\r\n\tif (absolute === 1) {\r\n\t\trgb = absoluteColor;\r\n\t} else {\r\n\t\trgb = value;\r\n\t}\r\n\r\n\tvar hsl = rgbToHsl(rgb);\r\n\tvar newHsl;\r\n\tif (syncLayersChk === 1) {\r\n\t\tvar syncH = syncLayersValue[0];\r\n\t\tvar syncS = syncLayersValue[1];\r\n\t\tvar syncL = syncLayersValue[2];\r\n\t\tnewHsl = [hsl[0]+syncH, hsl[1]+syncS, hsl[2]+syncL, 1];\r\n\t\tvar syncResult = hslToRgb(newHsl);\r\n\t} else {\r\n\t\tvar h = rc("hue (0 > 360)")/360;\r\n\t\tvar s = rc("saturation")/100;\r\n\t\tvar l = rc("luminosity")/100;\r\n\r\n\t\tvar minH = hsl[0]-h;\r\n\t\tvar minS = hsl[1]-s;\r\n\t\tvar minL = hsl[2]-l;\r\n\t\tvar maxH = hsl[0]+h;\r\n\t\tvar maxS = hsl[1]+s;\r\n\t\tvar maxL = hsl[2]+l;\r\n\r\n\t\tvar seed = rc("random generator");\r\n\t\tseedRandom(seed, true);\r\n\r\n\t\tnewHsl = random([minH, minS, minL, 1],[maxH, maxS, maxL, 1]);\r\n\t\tvar randomResult = hslToRgb(newHsl);\r\n\t\t\r\n\t\tlinear(strengthSld, 0, 100, value, randomResult);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctAR1D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("min. / max.")[0];\r\n\tvar maxX = rc("min. / max.")[1];\r\n\t\r\n\tvar valX;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t} else {\r\n\t\tvalX = value;\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar speedResult;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tvar x = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tvar segStart = seed*speedResult;\r\n\tvar startVal, endVal;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementSlider = rc("increment value");\r\n\t\tvar diff = Math.abs(minX-maxX);\r\n\t\tvar entier = (Math.floor(diff/incrementSlider))+1;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tstartVal = Math.floor(random()*entier)*incrementSlider+(Math.min(minX,maxX))+valX;\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tendVal = Math.floor(random()*entier)*incrementSlider+(Math.min(minX,maxX))+valX;\r\n\t} else {\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tstartVal = random(minX+valX, maxX+valX);\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tendVal = random(minX+valX, maxX+valX);\r\n\t}\r\n\r\n\tvar easing = rc("easing").value;\r\n\tvar easingResult;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1 && onOff === 1) {\r\n\tvar syncResult;\r\n\tif (absolute === 1) {\r\n\t\tsyncResult = syncLayersValue;\r\n\t} else {\r\n\t\tsyncResult = syncLayersValue + value;\r\n\t}\r\n} else {\r\n\tvar minX = rc("min. / max.")[0];\r\n\tvar maxX = rc("min. / max.")[1];\r\n\t\r\n\tvar valX;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t} else {\r\n\t\tvalX = value;\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar speedResult;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tvar x = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tvar segStart = seed*speedResult;\r\n\tvar startVal, endVal;\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementSlider = rc("increment value");\r\n\t\tvar diff = Math.abs(minX-maxX);\r\n\t\tvar entier = (Math.floor(diff/incrementSlider))+1;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tstartVal = Math.floor(random()*entier)*incrementSlider+(Math.min(minX,maxX))+valX;\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tendVal = Math.floor(random()*entier)*incrementSlider+(Math.min(minX,maxX))+valX;\r\n\t} else {\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tstartVal = random(minX+valX, maxX+valX);\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tendVal = random(minX+valX, maxX+valX);\r\n\t}\r\n\r\n\tvar easing = rc("easing").value;\r\n\tvar easingResult;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctAR2D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\t\r\n\tvar valX, valY;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t}\r\n\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tx = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar startValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar startVal =  [startValX,startValY];\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar endVal =  [endValX,endValY];\r\n\t} else {\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startVal = random([minX+valX, minY+valY],[maxX+valX, maxY+valY]);\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endVal = random([minX+valX, minY+valY],[maxX+valX, maxY+valY]);\r\n\t}\r\n\r\n\tvar easing = rc("easing").value;\r\n\tvar easingResult;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tvar proportions = rc("keep proportions").value;\r\n\tif (proportions === 1) {\r\n\t\tvar x = easingResult[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratio = value[0]/value[1];\r\n\t\t\teasingResult = [x,x/ratio];\r\n\t\t} else {\r\n\t\t\teasingResult = [x,x];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1) {\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tif (absolute === 1) {\r\n\t\tsyncLayersValue;\r\n\t} else if (proportions === 0) {\r\n\t\tsyncLayersValue+value;\r\n\t} else {\r\n\t\tvar ratio = value[0]/value[1];\r\n\t\tvar syncRelativeX = syncLayersValue[0]+value[0]; \r\n\t\t[syncRelativeX, syncRelativeX / ratio];\r\n\t}\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\t\r\n\tvar valX, valY;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t}\r\n\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tx = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar startValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar startVal =  [startValX,startValY];\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar endVal =  [endValX,endValY];\r\n\t} else {\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startVal = random([minX+valX, minY+valY],[maxX+valX, maxY+valY]);\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endVal = random([minX+valX, minY+valY],[maxX+valX, maxY+valY]);\r\n\t}\r\n\r\n\tvar easing = rc("easing").value;\r\n\tvar easingResult;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (proportions === 1) {\r\n\t\tvar x = easingResult[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratio = value[0]/value[1];\r\n\t\t\teasingResult = [x,x/ratio];\r\n\t\t} else {\r\n\t\t\teasingResult = [x,x];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctAR3D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar minZ = rc("Z axis (min. / max.)")[0];\r\n\tvar maxZ = rc("Z axis (min. / max.)")[1];\r\n\t\r\n\tvar absolute = rc("absolute").value;\t\r\n\tvar valX, valY, valZ;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t\tvalZ = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t\tvalZ = value[2];\r\n\t}\r\n\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedResult;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tx = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar incrementZSlider = rc("Z increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar diffZ = Math.abs(minZ-maxZ);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar entierZ = (Math.floor(diffZ/incrementZSlider))+1;\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar startValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar startValZ = Math.floor(random()*entierZ)*incrementZSlider+(Math.min(minZ,maxZ))+valZ;\r\n\t\tvar startVal =  [startValX,startValY,startValZ];\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar endValZ = Math.floor(random()*entierZ)*incrementZSlider+(Math.min(minZ,maxZ))+valZ;\r\n\t\tvar endVal =  [endValX,endValY];\r\n\t} else {\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startVal = random([minX+valX, minY+valY, minZ+valZ],[maxX+valX, maxY+valY, maxZ+valZ]);\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endVal = random([minX+valX, minY+valY, minZ+valZ],[maxX+valX, maxY+valY, maxZ+valZ]);\r\n\t}\r\n\r\n\tvar easing = rc("easing").value;\r\n\tvar easingResult;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tvar proportions = rc("keep proportions").value;\r\n\tif (proportions === 1) {\r\n\t\tvar x = easingResult[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tvar ratioZ = value[0]/value[2];\r\n\t\t\teasingResult = [x, x/ratioY, x/ratioZ];\r\n\t\t} else {\r\n\t\t\teasingResult = [x,x,x];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1) {\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tif (absolute === 1) {\r\n\t\tsyncLayersValue;\r\n\t} else if (proportions === 0) {\r\n\t\tsyncLayersValue+value;\r\n\t} else {\r\n\t\tvar ratioY = value[0]/value[1];\r\n\t\tvar ratioZ = value[0]/value[2];\r\n\t\tvar syncRelativeX = syncLayersValue[0]+value[0];\t\t\r\n\t\t[syncRelativeX, syncRelativeX/ratioY, syncRelativeX/ratioZ];\r\n\t}\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar minZ = rc("Z axis (min. / max.)")[0];\r\n\tvar maxZ = rc("Z axis (min. / max.)")[1];\r\n\tvar valX, valY, valZ;\r\n\tif (absolute === 1) {\r\n\t\tvalX = 0;\r\n\t\tvalY = 0;\r\n\t\tvalZ = 0;\r\n\t} else {\r\n\t\tvalX = value[0];\r\n\t\tvalY = value[1];\r\n\t\tvalZ = value[2];\r\n\t}\r\n\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tx = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar incrementChk = rc("increments").value;\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tif (incrementChk === 1) {\r\n\t\tvar incrementXSlider = rc("X increment");\r\n\t\tvar incrementYSlider = rc("Y increment");\r\n\t\tvar diffX = Math.abs(minX-maxX);\r\n\t\tvar diffY = Math.abs(minY-maxY);\r\n\t\tvar diffZ = Math.abs(minZ-maxZ);\r\n\t\tvar entierX = (Math.floor(diffX/incrementXSlider))+1;\r\n\t\tvar entierY = (Math.floor(diffY/incrementYSlider))+1;\r\n\t\tvar entierZ = (Math.floor(diffZ/incrementZSlider))+1;\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar startValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar startValZ = Math.floor(random()*entierZ)*incrementZSlider+(Math.min(minZ,maxZ))+valZ;\r\n\t\tvar startVal =  [startValX,startValY,startValZ];\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endValX = Math.floor(random()*entierX)*incrementXSlider+(Math.min(minX,maxX))+valX;\r\n\t\tvar endValY = Math.floor(random()*entierY)*incrementYSlider+(Math.min(minY,maxY))+valY;\r\n\t\tvar endValZ = Math.floor(random()*entierZ)*incrementZSlider+(Math.min(minZ,maxZ))+valZ;\r\n\t\tvar endVal =  [endValX,endValY];\r\n\t} else {\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startVal = random([minX+valX, minY+valY, minZ+valZ],[maxX+valX, maxY+valY, maxZ+valZ]);\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endVal = random([minX+valX, minY+valY, minZ+valZ],[maxX+valX, maxY+valY, maxZ+valZ]);\r\n\t}\r\n\r\n\tvar easing = rc("easing").value;\r\n\tvar easingResult;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (proportions === 1) {\r\n\t\tvar x = easingResult[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tvar ratioZ = value[0]/value[2];\r\n\t\t\teasingResult = [x, x/ratioY, x/ratioZ];\r\n\t\t} else {\r\n\t\t\teasingResult = [x,x,x];\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctARGradient() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar color1 = rc("color 1");\r\n\tvar color2 = rc("color 2");\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar speedResult;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tvar x = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tvar segStart = seed*speedResult;\r\n\tseedRandom(seed+seedSlider,true);\r\n\tvar startVal =  linear ((random(0,100)), 0,100, color1, color2);\r\n\tseedRandom(seed+seedSlider+1,true);\r\n\tvar endVal = linear ((random(0,100)), 0,100, color1, color2);\r\n\t\r\n\tvar easingResult;\r\n\tvar easing = rc("easing").value;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1 && onOff === 1) {\r\n\tsyncLayersValue;\r\n\tif (strengthSld === 100) {\r\n\t\tsyncLayersValue;\r\n\t} else {\r\n\t\tlinear(strengthSld, 0, 100, value, syncLayersValue);\r\n\t}\r\n} else {\r\n\tvar color1 = rc("color 1");\r\n\tvar color2 = rc("color 2");\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar speedResult;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tvar x = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tvar segStart = seed*speedResult;\r\n\tseedRandom(seed+seedSlider,true);\r\n\tvar startVal =  linear ((random(0,100)), 0,100, color1, color2);\r\n\tseedRandom(seed+seedSlider+1,true);\r\n\tvar endVal = linear ((random(0,100)), 0,100, color1, color2);\r\n\t\r\n\tvar easingResult;\r\n\tvar easing = rc("easing").value;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctARPalette() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar speedResult;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tvar x = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar minCol = 0;\r\n\tvar maxCol = rc("number of colors").value;\r\n\tvar allColors = [];\r\n\tfor (var c = 1; c < maxCol+1; c++) {\r\n\t\tvar currentCol = rc("color "+c);\r\n\t\tallColors.push(currentCol);\r\n\t}\r\n\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tvar segStart = seed*speedResult;\r\n\tseedRandom(seed+seedSlider,true);\r\n\tvar startCol =  Math.floor(random(minCol,maxCol));\r\n\tvar startVal = allColors[startCol];\r\n\tseedRandom(seed+1+seedSlider,true);\r\n\tvar endCol =  Math.floor(random(minCol,maxCol));\r\n\tvar endVal = allColors[endCol];\r\n\t\r\n\tvar easingResult;\r\n\tvar easing = rc("easing").value;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1 && onOff === 1) {\r\n\tsyncLayersValue;\r\n\tif (strengthSld === 100) {\r\n\t\tsyncLayersValue;\r\n\t} else {\r\n\t\tlinear(strengthSld, 0, 100, value, syncLayersValue);\r\n\t}\r\n} else {\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\r\n\tvar speedResult;\r\n\tif(syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tvar x = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tvar minCol = 0;\r\n\tvar maxCol = rc("number of colors").value;\r\n\tvar allColors = [];\r\n\tfor (var c = 1; c < maxCol+1; c++) {\r\n\t\tvar currentCol = rc("color "+c);\r\n\t\tallColors.push(currentCol);\r\n\t}\r\n\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tvar segStart = seed*speedResult;\r\n\tseedRandom(seed+seedSlider,true);\r\n\tvar startCol =  Math.floor(random(minCol,maxCol));\r\n\tvar startVal = allColors[startCol];\r\n\tseedRandom(seed+1+seedSlider,true);\r\n\tvar endCol =  Math.floor(random(minCol,maxCol));\r\n\tvar endVal = allColors[endCol];\r\n\t\r\n\tvar easingResult;\r\n\tvar easing = rc("easing").value;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t\teasingResult = linear(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t} else {\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\r\n\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\t}\r\n\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctARHSL() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\t\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion - (speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion + (speedConversion*speedRandomSlider);\r\n\tvar speedResult = random(speedMin,speedMax);\r\n\r\n\tvar h = rc("hue (0 > 360)")/360;\r\n\tvar s = rc("saturation")/100;\r\n\tvar l = rc("luminosity")/100;\r\n\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t}\r\n\r\n\tvar seed = Math.floor(time/speedResult);\r\n\tvar segStart = seed*speedResult;\r\n\tseedRandom(seed+seedSlider, true);\r\n\tvar startVal = random([-h, -s, -l],[h, s, l]);\r\n\tseedRandom (seed+seedSlider+1, true);\r\n\tvar endVal = random([-h, -s, -l],[h, s, l]);\r\n\t\r\n\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\t\r\n\t\r\n\tvar easing = rc("easing").value;\r\n\tswitch (easing) {\r\n\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\n\r\nif (onOff === false || strengthSld === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar syncLayersChk = rc("sync. layers").value;\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tvar absolute = rc("absolute").value;\r\n\tvar absoluteColor = rc("absolute color");\r\n\tvar seedSlider = rc("random generator");\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar syncSpeedChk = rc("sync. speed").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedConversion = 1/speedSlider;\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar speedMin = speedConversion -(speedConversion*speedRandomSlider);\r\n\tvar speedMax = speedConversion +(speedConversion*speedRandomSlider);\r\n\t\r\n\tvar layerSpeed;\r\n\ttry {\r\n\t\tlayerSpeed = effect("Randomatic - Layer")("layer speed");\r\n\t} catch(e) {\r\n\t\tvar x = Math.sin(index+seedSlider)*4096;\r\n\t\tvar custRand = x - Math.floor(x);\r\n\t\tlayerSpeed = linear(custRand,0,1,-100,100);\r\n\t}\r\n\t\r\n\tvar speedResult;\r\n\tif (syncSpeedChk === 1) {\r\n\t\tspeedResult = linear(layerSpeed,-100,100,speedMin,speedMax);\r\n\t} else {\r\n\t\tvar x = Math.sin(layerSpeed+seedSlider) * 10000;\r\n\t\tvar customRandom = x - Math.floor(x);\r\n\t\tspeedResult = linear(customRandom,0,10000,speedMin,speedMax);\r\n\t}\r\n\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(1/speedResult);\r\n\t}\r\n\r\n\tvar rgb;\r\n\tif (absolute === 1) {\r\n\t\trgb = absoluteColor;\r\n\t} else {\r\n\t\trgb = value;\r\n\t}\r\n\r\n\tvar hsl = rgbToHsl(rgb);\r\n\r\n\tif (syncLayersChk === 1) {\r\n\t\tvar syncH = syncLayersValue[0];\r\n\t\tvar syncS = syncLayersValue[1];\r\n\t\tvar syncL = syncLayersValue[2];\r\n\t\tvar newHsl = [hsl[0]+syncH, hsl[1]+syncS, hsl[2]+syncL, 1];\r\n\t\tsyncResult = hslToRgb(newHsl);\r\n\t\t\r\n\t} else {\r\n\t\tvar h = rc("hue (0 > 360)")/360;\r\n\t\tvar s = rc("saturation")/100;\r\n\t\tvar l = rc("luminosity")/100;\r\n\t\tvar minH = hsl[0]-h;\r\n\t\tvar minS = hsl[1]-s;\r\n\t\tvar minL = hsl[2]-l;\r\n\t\tvar maxH = hsl[0]+h;\r\n\t\tvar maxS = hsl[1]+s;\r\n\t\tvar maxL = hsl[2]+l;\r\n\r\n\t\tvar seed = Math.floor(time/speedResult);\r\n\t\tvar segStart = seed*speedResult;\r\n\t\tseedRandom(seed+seedSlider,true);\r\n\t\tvar startVal = random([minH, minS, minL, 1],[maxH, maxS, maxL, 1]);\r\n\t\tseedRandom(seed+seedSlider+1,true);\r\n\t\tvar endVal = random([minH, minS, minL, 1],[maxH, maxS, maxL, 1]);\r\n\r\n\t\tfunction quad(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,2)+v1;p--;return-v/2*(p*(p-2)-1)+v1};\r\n\t\tfunction quart(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,4)+v1;p-=2;return-v/2*(Math.pow(p,4)-2)+v1};\r\n\t\tfunction expo(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(2,10*(p-1))+v1;p--;return v/2*(-Math.pow(2,-10*p)+2)+v1};\r\n\t\tfunction quint(t,t1,t2,v1,v2){var d=t2-t1;var v=v2-v1;var p=(t-t1)/(d/2);if(p<1)return v/2*Math.pow(p,5)+v1;p-=2;return v/2*(Math.pow(p,5)+2)+v1};\t\r\n\t\t\r\n\t\tvar easing = rc("easing").value;\r\n\t\tswitch (easing) {\r\n\t\t\tcase 1 : easingResult = linear(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 2 : easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 3 : easingResult = quad(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 4 : easingResult = quart(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 5 : easingResult = quint(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tcase 6 : easingResult = expo(time,segStart,segStart + speedResult, startVal, endVal); break;\r\n\t\t\tdefault: easingResult = ease(time,segStart,segStart + speedResult, startVal, endVal);\r\n\t\t}\r\n\r\n\t\tvar randomResult = hslToRgb(easingResult);\r\n\r\n\t\tlinear(strengthSld, 0, 100, value, randomResult);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctW1D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("min. / max.")[0];\r\n\tvar maxX = rc("min. / max.")[1];\r\n\tvar deltaX = Math.abs(minX-maxX);\r\n\tvar loopChk = rc("loop").value;\r\n\tvar posterizeChk = rc("posterize time").value;\t\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar seed = rc("random generator");\r\n\t\r\n\tvar absolute = rc("absolute").value;\r\n\tvar valX;\r\n\tif (absolute === 1) {\r\n\t\tvalX = ((minX+maxX)/2)-value;\r\n\t} else {\r\n\t\tvalX = ((minX+maxX)/2);\r\n\t}\r\n\r\n\tseedRandom(seed,true);\r\n\tvar magicSeed = random(10000);\r\n\tseedRandom(seed+magicSeed,true);\r\n\tvar speedRandom = random(speedSlider-(speedSlider*speedRandomSlider),speedSlider+(speedSlider*speedRandomSlider));\r\n\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(speedRandom);\r\n\t}\r\n\r\n\tvar w;\r\n\tif (loopChk === 1) {\r\n\t\tvar loopTime = rc("loop duration (sec.)");\r\n\t\tvar t = time % loopTime;\r\n\t\tvar wiggle1 = wiggle(speedRandom,deltaX/2,1,0.5,t);\r\n\t\tvar wiggle2 = wiggle(speedRandom,deltaX/2,1,0.5,t-loopTime);\r\n\t\tw = linear(t, 0,  loopTime, wiggle1, wiggle2)\r\n\t} else {\r\n\t\tw = wiggle(speedRandom,deltaX/2);\r\n\t}\r\n\r\n\tvar easingResult = w+valX;\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar syncLayersValue = rc("sync. layers value");\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1 && onOff === 1) {\r\n\tvar syncResult;\t\r\n\tif (absolute === 1) {\r\n\t\tsyncResult = syncLayersValue;\r\n\t} else {\r\n\t\tsyncResult = syncLayersValue + value;\r\n\t}\r\n} else {\r\n\tvar minX = rc("min. / max.")[0];\r\n\tvar maxX = rc("min. / max.")[1];\r\n\tvar deltaX = Math.abs(minX-maxX);\t\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar seed = rc("random generator");\r\n\t\r\n\tvar absolute = rc("absolute").value;\r\n\tvar valX;\r\n\tif (absolute === 1) {\r\n\t\tvalX = ((minX+maxX)/2)-value;\r\n\t} else {\r\n\t\tvalX = ((minX+maxX)/2);\r\n\t}\r\n\r\n\tseedRandom(seed,true);\r\n\tvar magicSeed = random(10000);\r\n\tseedRandom(seed+magicSeed,true);\r\n\tvar speedRandom = random(speedSlider-(speedSlider*speedRandomSlider),speedSlider+(speedSlider*speedRandomSlider));\r\n\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(speedRandom);\r\n\t}\r\n\r\n\tvar loopChk = rc("loop").value;\r\n\tvar w;\r\n\tif (loopChk === 1) {\r\n\t\tvar loopTime = rc("loop duration (sec.)");\r\n\t\tvar t = time % loopTime;\r\n\t\tvar wiggle1 = wiggle(speedRandom,deltaX/2,1,0.5,t);\r\n\t\tvar wiggle2 = wiggle(speedRandom,deltaX/2,1,0.5,t-loopTime);\r\n\t\tw = linear(t, 0,  loopTime, wiggle1, wiggle2);\r\n\t} else {\r\n\t\tw = wiggle(speedRandom,deltaX/2);\r\n\t}\r\n\r\n\tvar easingResult = w+valX;\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctW2D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar deltaX = Math.abs(minX-maxX);\r\n\tvar deltaY = Math.abs(minY-maxY);\r\n\tvar loopChk = rc("loop").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar seed = rc("random generator");\r\n\t\r\n\tvar absolute = rc("absolute").value;\r\n\tvar valX, valY;\r\n\tif (absolute === 1) {\r\n\t\tvalX = ((minX+maxX)/2)-value[0];\r\n\t\tvalY = ((minY+maxY)/2)-value[1];\r\n\t} else {\r\n\t\tvalX = ((minX+maxX)/2);\r\n\t\tvalY = ((minY+maxY)/2);\r\n\t}\r\n\r\n\tseedRandom(seed,true);\r\n\tvar magicSeed = random(10000);\r\n\r\n\tseedRandom(seed+magicSeed,true);\r\n\tvar speedRandom = random(speedSlider-(speedSlider*speedRandomSlider),speedSlider+(speedSlider*speedRandomSlider));\r\n\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(speedRandom);\r\n\t} else {};\r\n\r\n\tif (loopChk === 1) {\r\n\t\tvar loopTime = rc("loop duration (sec.)");\r\n\t\tvar t = time % loopTime;\r\n\t\tvar w1X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t);\r\n\t\tvar w1Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t);\r\n\t\tvar w2X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t - loopTime);\r\n\t\tvar w2Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t - loopTime);\r\n\t\tvar wX = linear(t, 0, loopTime, w1X, w2X);\r\n\t\tvar wY = linear(t, 0, loopTime, w1Y, w2Y);\r\n\t} else {\r\n\t\tvar wX = wiggle(speedRandom,deltaX / 2);\r\n\t\tvar wY = wiggle(speedRandom,deltaY / 2);\r\n\t}\r\n\r\n\tvar w, val;\r\n\tvar proportions = rc("keep proportions").value;\r\n\tif (proportions === 1) {\r\n\t\tvar x = wX[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tw = [x,x/ratioY];\r\n\t\t\tval = [valX,valX/ratioY];\r\n\t\t} else {\r\n\t\t\tw = [x,x];\r\n\t\t\tval = [valX,valX];\r\n\t\t}\r\n\t} else {\r\n\t\tw = [wX[0],wY[1]];\r\n\t\tval = [valX,valY];\r\n\t}\r\n\r\n\tvar easingResult = w+val;\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1) {\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tif (absolute === 1) {\r\n\t\tsyncLayersValue;\r\n\t} else if (proportions === 0) {\r\n\t\tsyncLayersValue+value;\r\n\t} else {\r\n\t\tvar ratio = value[0]/value[1];\r\n\t\tvar syncRelativeX = syncLayersValue[0]+value[0]; \r\n\t\t[syncRelativeX, syncRelativeX / ratio];\r\n\t}\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar deltaX = Math.abs(minX-maxX);\r\n\tvar deltaY = Math.abs(minY-maxY);\r\n\tvar loopChk = rc("loop").value;\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar absolute = rc("absolute").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar seed = rc("random generator");\r\n\r\n\tvar valX, valY;\r\n\tif (absolute === 1) {\r\n\t\tvalX = ((minX+maxX)/2)-value[0];\r\n\t\tvalY = ((minY+maxY)/2)-value[1];\r\n\t} else {\r\n\t\tvalX = ((minX+maxX)/2);\r\n\t\tvalY = ((minY+maxY)/2);\r\n\t}\r\n\r\n\tseedRandom(seed,true);\r\n\tvar magicSeed = random(10000);\r\n\r\n\tseedRandom(seed+magicSeed,true);\r\n\tvar speedRandom = random(speedSlider-(speedSlider*speedRandomSlider),speedSlider+(speedSlider*speedRandomSlider));\r\n\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(speedRandom);\r\n\t}\r\n\r\n\tif (loopChk === 1) {\r\n\t\tvar loopTime = rc("loop duration (sec.)");\r\n\t\tvar t = time % loopTime;\r\n\t\tvar w1X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t);\r\n\t\tvar w1Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t);\r\n\t\tvar w2X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t - loopTime);\r\n\t\tvar w2Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t - loopTime);\r\n\t\tvar wX = linear(t, 0, loopTime, w1X, w2X);\r\n\t\tvar wY = linear(t, 0, loopTime, w1Y, w2Y);\r\n\t} else {\r\n\t\tvar wX = wiggle(speedRandom,deltaX / 2);\r\n\t\tvar wY = wiggle(speedRandom,deltaY / 2);\r\n\t}\r\n\r\n\tvar w, val;\r\n\tif (proportions === 1) {\r\n\t\tvar x = wX[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tw = [x,x/ratioY];\r\n\t\t\tval = [valX,valX/ratioY];\r\n\t\t} else {\r\n\t\t\tw = [x,x];\r\n\t\t\tval = [valX,valX];\r\n\t\t}\r\n\t} else {\r\n\t\tw = [wX[0],wY[1]];\r\n\t\tval = [valX,valY];\r\n\t}\r\n\r\n\tvar easingResult = w+val;\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctW3D() {
      var rcExpression = {
        expController:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\n\r\nif (onOff === 0 || strengthSld === 0 || syncLayersChk === 0 || rc.active === false) {\r\n\tvalue;\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar minZ = rc("Y axis (min. / max.)")[0];\r\n\tvar maxZ = rc("Y axis (min. / max.)")[1];\r\n\tvar deltaX = Math.abs(minX-maxX);\r\n\tvar deltaY = Math.abs(minY-maxY);\r\n\tvar deltaZ = Math.abs(minZ-maxZ);\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar seed = rc("random generator");\r\n\t\r\n\tvar absolute = rc("absolute").value;\r\n\tvar valX, valY, valZ;\r\n\tif (absolute === 1) {\r\n\t\tvalX = ((minX+maxX)/2)-value[0];\r\n\t\tvalY = ((minY+maxY)/2)-value[1];\r\n\t\tvalZ = ((minZ+maxZ)/2)-value[2];\r\n\t} else {\r\n\t\tvalX = ((minX+maxX)/2);\r\n\t\tvalY = ((minY+maxY)/2);\r\n\t\tvalZ = ((minZ+maxZ)/2);\r\n\t}\r\n\r\n\tseedRandom(seed,true);\r\n\tvar magicSeed = random(10000);\r\n\r\n\tseedRandom(seed+magicSeed,true);\r\n\tvar speedRandom = random(speedSlider-(speedSlider*speedRandomSlider),speedSlider+(speedSlider*speedRandomSlider));\r\n\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(speedRandom);\r\n\t}\r\n\r\n\tvar loopChk = rc("loop").value;\r\n\tif (loopChk === 1) {\r\n\t\tvar loopTime = rc("loop duration (sec.)");\r\n\t\tvar t = time % loopTime;\r\n\t\tvar w1X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t);\r\n\t\tvar w1Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t);\r\n\t\tvar w1Z = wiggle(speedRandom, deltaZ / 2, 1, 0.5, t);\r\n\t\tvar w2X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t - loopTime);\r\n\t\tvar w2Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t - loopTime);\r\n\t\tvar w2Z = wiggle(speedRandom, deltaZ / 2, 1, 0.5, t - loopTime);\r\n\t\tvar wX = linear(t, 0, loopTime, w1X, w2X);\r\n\t\tvar wY = linear(t, 0, loopTime, w1Y, w2Y);\r\n\t\tvar wZ = linear(t, 0, loopTime, w1Z, w2Z);\r\n\t} else {\r\n\t\tvar wX = wiggle(speedRandom,deltaX / 2);\r\n\t\tvar wY = wiggle(speedRandom,deltaY / 2);\r\n\t\tvar wZ = wiggle(speedRandom,deltaZ / 2);\r\n\t}\r\n\r\n\tvar w, val;\r\n\tvar proportions = rc("keep proportions").value;\r\n\tif (proportions === 1) {\r\n\t\tvar x = wX[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tvar ratioZ = value[0]/value[2];\r\n\t\t\tw = [x, x/ratioY, x/ratioZ];\r\n\t\t\tval = [valX, valX/ratioY, valX/ratioZ];\r\n\t\t} else {\r\n\t\t\tw = [x,x,x];\r\n\t\t\tval = [valX,valX,valX];\r\n\t\t}\r\n\t} else {\r\n\t\tw = [wX[0],wY[1],wZ[2]];\r\n\t\tval = [valX,valY,valZ];\r\n\t}\r\n\r\n\tvar easingResult = w+val;\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
        expProperty:
          'var onOff = rc("on / off").value;\r\nvar strengthSld = rc("strength").value;\r\nvar absolute = rc("absolute").value;\r\nvar syncLayersChk = rc("sync. layers").value;\r\nvar proportions = rc("keep proportions").value;\r\n\r\nif (onOff === 0 || (strengthSld === 0 && syncLayersChk === 0) || rc.active === false) {\r\n\tvalue;\r\n} else if (syncLayersChk === 1) {\r\n\tvar syncLayersValue = rc("sync. layers value");\r\n\tif (absolute === 1) {\r\n\t\tsyncLayersValue;\r\n\t} else if (proportions === 0) {\r\n\t\tsyncLayersValue+value;\r\n\t} else {\r\n\t\tvar ratioY = value[0]/value[1];\r\n\t\tvar ratioZ = value[0]/value[2];\r\n\t\tvar syncRelativeX = syncLayersValue[0]+value[0];\t\t\r\n\t\t[syncRelativeX, syncRelativeX/ratioY, syncRelativeX/ratioZ];\r\n\t}\r\n} else {\r\n\tvar minX = rc("X axis (min. / max.)")[0];\r\n\tvar maxX = rc("X axis (min. / max.)")[1];\r\n\tvar minY = rc("Y axis (min. / max.)")[0];\r\n\tvar maxY = rc("Y axis (min. / max.)")[1];\r\n\tvar minZ = rc("Z axis (min. / max.)")[0];\r\n\tvar maxZ = rc("Z axis (min. / max.)")[1];\r\n\tvar deltaX = Math.abs(minX-maxX);\r\n\tvar deltaY = Math.abs(minY-maxY);\r\n\tvar deltaZ = Math.abs(minZ-maxZ);\r\n\tvar loopChk = rc("loop").value;\r\n\tvar posterizeChk = rc("posterize time").value;\r\n\tvar absolute = rc("absolute").value;\r\n\tvar speedSlider = rc("speed");\r\n\tvar speedRandomSlider = rc("speed random")/100;\r\n\tvar seed = rc("random generator");\r\n\r\n\tvar valX, valY, valZ;\r\n\tif (absolute === 1) {\r\n\t\tvalX = ((minX+maxX)/2)-value[0];\r\n\t\tvalY = ((minY+maxY)/2)-value[1];\r\n\t\tvalZ = ((minZ+maxZ)/2)-value[2];\r\n\t} else {\r\n\t\tvalX = ((minX+maxX)/2);\r\n\t\tvalY = ((minY+maxY)/2);\r\n\t\tvalZ = ((minZ+maxZ)/2);\r\n\t}\r\n\r\n\tseedRandom(seed,true);\r\n\tvar magicSeed = random(10000);\r\n\r\n\tseedRandom(seed+magicSeed,true);\r\n\tvar speedRandom = random(speedSlider-(speedSlider*speedRandomSlider),speedSlider+(speedSlider*speedRandomSlider));\r\n\r\n\tif (posterizeChk === 1) {\r\n\t\tposterizeTime(speedRandom);\r\n\t}\r\n\r\n\tif (loopChk === 1) {\r\n\t\tvar loopTime = rc("loop duration (sec.)");\r\n\t\tvar t = time % loopTime;\r\n\t\tvar w1X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t);\r\n\t\tvar w1Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t);\r\n\t\tvar w1Z = wiggle(speedRandom, deltaZ / 2, 1, 0.5, t);\r\n\t\tvar w2X = wiggle(speedRandom, deltaX / 2, 1, 0.5, t - loopTime);\r\n\t\tvar w2Y = wiggle(speedRandom, deltaY / 2, 1, 0.5, t - loopTime);\r\n\t\tvar w2Z = wiggle(speedRandom, deltaZ / 2, 1, 0.5, t - loopTime);\r\n\t\tvar wX = linear(t, 0, loopTime, w1X, w2X);\r\n\t\tvar wY = linear(t, 0, loopTime, w1Y, w2Y);\r\n\t\tvar wZ = linear(t, 0, loopTime, w1Z, w2Z);\r\n\t} else {\r\n\t\tvar wX = wiggle(speedRandom,deltaX / 2);\r\n\t\tvar wY = wiggle(speedRandom,deltaY / 2);\r\n\t\tvar wZ = wiggle(speedRandom,deltaZ / 2);\r\n\t}\r\n\r\n\tvar w, val;\r\n\tif (proportions === 1) {\r\n\t\tvar x = wX[0];\r\n\t\tif (thisProperty.name != "sync. layers value") {\r\n\t\t\tvar ratioY = value[0]/value[1];\r\n\t\t\tvar ratioZ = value[0]/value[2];\r\n\t\t\tw = [x, x/ratioY, x/ratioZ];\r\n\t\t\tval = [valX, valX/ratioY, valX/ratioZ];\r\n\t\t} else {\r\n\t\t\tw = [x,x,x];\r\n\t\t\tval = [valX,valX,valX];\r\n\t\t}\r\n\t} else {\r\n\t\tw = [wX[0],wY[1],wZ[2]];\r\n\t\tval = [valX,valY,valZ];\r\n\t\tvalue;\r\n\t}\r\n\r\n\tvar easingResult = w+val;\r\n\tif (strengthSld === 100) {\r\n\t\teasingResult;\r\n\t} else {\r\n\t\tvar vector = easingResult-value;\r\n\t\tvar vectorMin = vector*-10 + value;\r\n\t\tvar vectorMax = vector*10 + value;\r\n\t\tlinear (strengthSld, -1000, 1000, vectorMin, vectorMax);\r\n\t}\r\n}',
      };
      return rcExpression;
    }
    function fctSetExpressions(
      arguBingo,
      arguSourceFunction,
      futureName,
      increment,
      copyright,
      argArrayProps,
      arguExpPath,
    ) {
      var animationChoice = listAnimation.selection.index;
      var colorChoice = listColors.selection.index;
      var myComp = fctSetMyComp();
      var myLayer = myComp.selectedLayers[0];
      var randomaticControllersName = myComp.layer(arguBingo).name;
      var randomaticCompName = myComp.name;
      switch (animationChoice) {
        case 0:
          animation = "SR";
          break;
        case 1:
          animation = "AR";
          break;
        case 2:
          animation = "W";
          break;
      }
      switch (colorChoice) {
        case 0:
          color = "Gradient";
          break;
        case 1:
          color = "Palette";
          break;
        case 2:
          color = "HSL";
          break;
      }
      if (p != 4) {
        dimension = p + "D";
        color = "";
      } else {
        dimension = "";
      }
      var functionName = "fct" + animation + dimension + color;
      var evalFunctionName = eval(functionName);
      var rcExpression = evalFunctionName();
      var rcProperty =
        'var rc = thisComp.layer("' +
        randomaticControllersName +
        '").effect("' +
        futureName +
        increment +
        '");\r\n';
      var rcController =
        'var rc = thisLayer.effect("' + futureName + increment + '");\r\n';
      var expressionProperties =
        copyright + rcProperty + rcExpression.expProperty;
      var expressionController =
        copyright + rcController + rcExpression.expController;
      if (arguSourceFunction === fctRandomatic) {
        fctPBValue(ProgressBar.value + 1);
      }
      if (arguSourceFunction == fctReplaceController) {
        var expressionPropertiesAbs = expressionProperties.replace(
          "thisComp",
          'comp("' + randomaticCompName + '")',
        );
        var arrayExpressions = [];
        arrayExpressions.push(expressionProperties);
        arrayExpressions.push(expressionPropertiesAbs);
        arrayExpressions.push(expressionController);
        return arrayExpressions;
      } else {
        for (var i = 0; i < argArrayProps.length; i += 1) {
          argArrayProps[i].expression = expressionProperties;
        }
        return expressionController;
      }
    }
    function fctEffectFileName() {
      var optionName = fctOptionNames();
      var animationShortName = optionName.animationShortName;
      var colorFullName = optionName.colorFullName;
      if (p >= 1 && p <= 3) {
        var effectFileName = "Randomatic " + animationShortName + " " + p + "D";
      } else {
        if (p === 4) {
          var effectFileName =
            "Randomatic " + animationShortName + " " + colorFullName;
        }
      }
      return effectFileName;
    }
    function fctEffectCreation(
      arguBingo,
      arguEffectFileName,
      arguExpressionController,
      arguFutureName,
      arguIncrement,
    ) {
      var randomaticFolderPath = fctFolder("/ffx");
      var test = arguEffectFileName
        .replace(/ /g, "_")
        .replace("Randomatic", "binaryEffect");
      var myFile = new File(
        randomaticFolderPath + "/" + arguEffectFileName + ".ffx",
      );
      if (!myFile.exists) {
        var binaryEffect_AR_1D = __BLOB__BLOB_000466__;
        var binaryEffect_AR_2D = __BLOB__BLOB_000467__;
        var binaryEffect_AR_3D = __BLOB__BLOB_000468__;
        var binaryEffect_AR_Gradient = __BLOB__BLOB_000469__;
        var binaryEffect_AR_HSL = __BLOB__BLOB_000470__;
        var binaryEffect_AR_Palette = __BLOB__BLOB_000471__;
        var binaryEffect_SR_1D = __BLOB__BLOB_000472__;
        var binaryEffect_SR_2D = __BLOB__BLOB_000473__;
        var binaryEffect_SR_3D = __BLOB__BLOB_000474__;
        var binaryEffect_SR_Gradient = __BLOB__BLOB_000475__;
        var binaryEffect_SR_HSL = __BLOB__BLOB_000476__;
        var binaryEffect_SR_Palette = __BLOB__BLOB_000477__;
        var binaryEffect_W_1D = __BLOB__BLOB_000478__;
        var binaryEffect_W_2D = __BLOB__BLOB_000479__;
        var binaryEffect_W_3D = __BLOB__BLOB_000480__;
        myFile.encoding = "BINARY";
        myFile.open("w");
        myFile.write(eval(test));
        $.sleep(600);
        myFile.close();
      }
      fctNoSelection();
      app.project.activeItem.layer(arguBingo).selected = true;
      app.project.activeItem.layer(arguBingo).applyPreset(myFile);
      app.project.activeItem.layer(arguBingo).selected = false;
    }
    function fctEffectLayerCreation(arguLayer) {
      var randomaticFolderPath = fctFolder("/ffx");
      var binaryEffectRandomaticLayer = __BLOB__BLOB_000481__;
      var myFile = new File(randomaticFolderPath + "/RandomaticLayer.ffx");
      if (!myFile.exists) {
        myFile.encoding = "BINARY";
        myFile.open("w");
        myFile.write(binaryEffectRandomaticLayer);
        $.sleep(600);
        myFile.close();
      }
      arguLayer.selected = true;
      arguLayer.applyPreset(myFile);
      var currentEffect = arguLayer.effect("Pseudo/RandomaticLayer");
      var layerSpeedValue = Math.random() * 100;
      currentEffect("layer speed").setValue(layerSpeedValue);
      currentEffect("layer speed").expression =
        "seedRandom(value,true);\r\nrandom(-100,100);";
      arguLayer.selected = false;
    }
    function fctCreateNull(
      argName,
      argExpPosition,
      argExpScale,
      argLabelColor,
      argIndex,
    ) {
      var myComp = fctSetMyComp();
      var myNull = myComp.layers.addNull(myComp.duration);
      if (argName != undefined) {
        myNull.name = argName;
        myNull.source.name = argName;
      }
      if (argExpPosition != undefined) {
        myNull.transform.position.expression = argExpPosition;
      }
      if (argExpScale != undefined) {
        myNull.transform.scale.expression = argExpScale;
      }
      if (argLabelColor != undefined) {
        myNull.label = argLabelColor;
      }
    }
    function fctControllerName(argNameSelectedProperty) {
      var optionName = fctOptionNames();
      var animationShortName = optionName.animationShortName;
      var colorFullName = optionName.colorFullName;
      if (p < 4) {
        var futureName = animationShortName + " - " + argNameSelectedProperty;
      } else {
        var futureName =
          animationShortName +
          " " +
          colorFullName +
          " - " +
          argNameSelectedProperty;
      }
      return futureName;
    }
    function fctOptionNames() {
      var animationChoice = listAnimation.selection.index;
      var colorChoice = listColors.selection.index;
      var arrayAnimationFullName = [
        "Static random",
        "Animated Random",
        "Wiggle",
      ];
      var arrayAnimationShortName = ["SR", "AR", "W"];
      var arrayColorFullName = ["Gradient", "Palette", "HSL"];
      var optionName = {
        animationFullName: arrayAnimationFullName[animationChoice],
        animationShortName: arrayAnimationShortName[animationChoice],
        colorFullName: arrayColorFullName[colorChoice],
      };
      return optionName;
    }
    function fctReplaceControllerName(arguOldName) {
      var optionName = fctOptionNames();
      var animationShortName = optionName.animationShortName;
      var colorFullName = optionName.colorFullName;
      var str = arguOldName;
      if (p < 4) {
        var newPrefix = animationShortName + " -";
        if (str.search("SR -") != -1) {
          futureName = str.replace("SR -", newPrefix);
        } else if (str.search("AR -") != -1) {
          futureName = str.replace("AR -", newPrefix);
        } else if (str.search("W -") != -1) {
          futureName = str.replace("W -", newPrefix);
        } else {
          futureName = arguOldName;
        }
      } else {
        var newColorPrefix = animationShortName + " " + colorFullName + " -";
        if (str.search("SR Gradient -") != -1) {
          futureName = str.replace("SR Gradient -", newColorPrefix);
        } else if (str.search("AR Gradient -") != -1) {
          futureName = str.replace("AR Gradient -", newColorPrefix);
        } else if (str.search("SR Palette -") != -1) {
          futureName = str.replace("SR Palette -", newColorPrefix);
        } else if (str.search("AR Palette -") != -1) {
          futureName = str.replace("AR Palette -", newColorPrefix);
        } else if (str.search("SR HSL -") != -1) {
          futureName = str.replace("SR HSL -", newColorPrefix);
        } else if (str.search("AR HSL -") != -1) {
          futureName = str.replace("AR HSL -", newColorPrefix);
        } else {
          futureName = arguOldName;
        }
      }
      return futureName;
    }
    function fctArrayControllersName(arguBingo, oldControllerIndex) {
      var myComp = fctSetMyComp();
      var arrayControllersName = [];
      var effectName = "";
      for (
        var e = 1;
        e <=
        myComp.layer(arguBingo).property("ADBE Effect Parade").numProperties;
        e += 1
      ) {
        effectName = myComp
          .layer(arguBingo)
          .property("ADBE Effect Parade")
          .property(e).name;
        if (e != oldControllerIndex) {
          arrayControllersName.push(effectName);
        }
      }
      return arrayControllersName;
    }
    function fctEffectsNameComparaison(
      arguFutureName,
      argArrayControllersName,
    ) {
      if (argArrayControllersName.length > 0) {
        for (var n = 0; n < argArrayControllersName.length; n += 1) {
          if (argArrayControllersName[n] === arguFutureName) {
            return true;
          }
        }
      }
      return false;
    }
    function fctIncrement(
      arguIdenticalEffectsName,
      arguFutureName,
      argArrayControllersName,
    ) {
      if (arguIdenticalEffectsName === false) {
        increment = "";
        return increment;
      } else {
        var i = 2;
        var e = 0;
        do {
          if (arguFutureName + " " + i === argArrayControllersName[e]) {
            i++;
            e = 0;
            continuerIncrement = true;
          } else {
            e++;
            continuerIncrement = false;
          }
        } while (
          e < argArrayControllersName.length &&
          (continuerIncrement = true)
        );
        increment = " " + i;
        return increment;
      }
    }
    function fctNoSelection() {
      var numComps = fctNumComps();
      for (var c = 0; c < numComps.length; c += 1) {
        currentComp = numComps[c];
        var selectedLayers = currentComp.selectedLayers;
        for (var s = 0; s < selectedLayers.length; s += 1) {
          selectedLayers[s].selected = false;
        }
      }
    }
    function fctStockProperties() {
      var arrayLayers = [];
      var arrayStockProps = [];
      var myComp = fctSetMyComp();
      for (var m = 0; m < myComp.selectedLayers.length; m += 1) {
        propGroup = myComp.selectedLayers[m];
        for (var i = 0; i < propGroup.selectedProperties.length; i += 1) {
          prop = propGroup.selectedProperties[i];
          if (
            prop.propertyType === PropertyType.PROPERTY &&
            prop.canSetExpression === true
          ) {
            arrayStockProps.push(prop);
            arrayLayers.push(myComp.selectedLayers[m]);
          }
        }
      }
      return { arrayLayers: arrayLayers, arrayStockProps: arrayStockProps };
    }
    function fctSearchProperties(
      propGroup,
      arguCurrentController,
      arguCurrentLayer,
      argArrayProps,
      argArrayLayers,
      argArrayPropsName,
    ) {
      var myComp = fctSetMyComp();
      for (var i = 1; i <= propGroup.numProperties; i += 1) {
        currentProp = propGroup.property(i);
        if (currentProp.propertyType === PropertyType.PROPERTY) {
          var str = currentProp.expression;
          if (
            str.indexOf("// Randomatic 2 ") != -1 &&
            currentProp.name != "sync. layers value" &&
            str.indexOf(
              'comp("' +
                myComp.name +
                '").layer("' +
                myComp.selectedLayers[0].name +
                '").effect("' +
                arguCurrentController.name +
                '")',
            ) != -1
          ) {
            argArrayProps.push(currentProp);
            argArrayLayers.push(arguCurrentLayer);
            argArrayPropsName.push(currentProp.name);
          }
        } else {
          if (
            currentProp.propertyType === PropertyType.INDEXED_GROUP ||
            currentProp.propertyType === PropertyType.NAMED_GROUP
          ) {
            fctSearchProperties(
              currentProp,
              arguCurrentController,
              arguCurrentLayer,
              argArrayProps,
              argArrayLayers,
              argArrayPropsName,
            );
          }
        }
      }
      return [argArrayProps, argArrayLayers, argArrayPropsName];
    }
    function fctFindRandomaticProps(
      propGroup,
      arguCurrentLayer,
      arguObjAllRandomaticProps,
      argCompIndex,
      argLayerIndex,
    ) {
      for (var i = 1; i <= propGroup.numProperties; i += 1) {
        currentProp = propGroup.property(i);
        if (currentProp.propertyType === PropertyType.PROPERTY) {
          var str = currentProp.expression;
          if (
            str.indexOf("// aescripts.com/randomatic") != -1 &&
            currentProp.name != "sync. layers value"
          ) {
            arguObjAllRandomaticProps.props.push(currentProp);
            arguObjAllRandomaticProps.layers.push(
              app.project.item(argCompIndex).layer(argLayerIndex),
            );
            arguObjAllRandomaticProps.layersIndex.push(argLayerIndex);
            arguObjAllRandomaticProps.compsIndex.push(argCompIndex);
          }
        } else {
          if (
            currentProp.propertyType === PropertyType.INDEXED_GROUP ||
            currentProp.propertyType === PropertyType.NAMED_GROUP
          ) {
            fctFindRandomaticProps(
              currentProp,
              arguCurrentLayer,
              arguObjAllRandomaticProps,
              argCompIndex,
              argLayerIndex,
            );
          }
        }
      }
      return arguObjAllRandomaticProps;
    }
    function fctScanEffects(arguBingo, arguOldIndex) {
      var myComp = fctSetMyComp();
      var newIndex = myComp
        .layer(arguBingo)
        .property("ADBE Effect Parade").numProperties;
      var oldEffect = myComp.layer(arguBingo).effect(arguOldIndex);
      var newEffect = myComp.layer(arguBingo).effect(newIndex);
      for (var o = 1; o < oldEffect.numProperties; o += 1) {
        oldProp = oldEffect.property(o);
        oldPropName = oldEffect.property(o).name;
        if (
          newEffect.property(oldPropName) != undefined &&
          newEffect.property(oldPropName).canSetExpression === true
        ) {
          oldValue = oldProp.value;
          newProp = newEffect.property(oldPropName);
          if (oldEffect.property(o).expressionEnabled === true) {
            oldEffect.property(o).expressionEnabled = false;
            oldValue = oldProp.value;
          } else {
            oldValue = oldProp.value;
          }
          if (oldEffect.property(oldPropName).numKeys > 0) {
            for (var k = 1; k <= oldProp.numKeys; k += 1) {
              fctCopyPasteKey(k, oldProp, newProp);
            }
          } else if (
            oldEffect.property(oldPropName).name === "sync. layers value"
          ) {
          } else {
            oldValue = oldProp.value;
            myComp
              .layer(arguBingo)
              .effect(newIndex)
              .property(oldPropName)
              .setValue(oldValue);
          }
          if (
            oldEffect.property(oldPropName).expression != "" &&
            oldEffect.property(oldPropName).name != "sync. layers value"
          ) {
            strExpression = oldEffect.property(oldPropName).expression;
            str = oldEffect.name;
            if (strExpression.indexOf(str) != -1) {
              strExpressionReplace = strExpression.replace(
                oldEffect.name,
                newEffect.name,
              );
              newEffect.property(oldPropName).expression = strExpressionReplace;
            } else {
              newEffect.property(oldPropName).expression = strExpression;
            }
          }
        }
      }
      if (oldEffect.active === false) {
        newEffect.enabled = false;
      }
    }
    function fctCopyPasteKey(arguKeyIndex, arguOldProp, arguNewProp) {
      var keyObj = {};
      keyObj.time = arguOldProp.keyTime(arguKeyIndex);
      keyObj.value = arguOldProp.keyValue(arguKeyIndex);
      keyObj.keyInInterpolationType =
        arguOldProp.keyInInterpolationType(arguKeyIndex);
      keyObj.keyOutInterpolationType =
        arguOldProp.keyOutInterpolationType(arguKeyIndex);
      if (
        arguOldProp.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
        arguOldProp.propertyValueType === PropertyValueType.ThreeD_SPATIAL
      ) {
        keyObj.keyInSpatialTangent =
          arguOldProp.keyInSpatialTangent(arguKeyIndex);
        keyObj.keyOutSpatialTangent =
          arguOldProp.keyOutSpatialTangent(arguKeyIndex);
        keyObj.keySpatialContinuous =
          arguOldProp.keySpatialContinuous(arguKeyIndex);
        keyObj.keySpatialAutoBezier =
          arguOldProp.keySpatialAutoBezier(arguKeyIndex);
        keyObj.keyRoving = arguOldProp.keyRoving(arguKeyIndex);
      }
      keyObj.keyInTemporalEase = arguOldProp.keyInTemporalEase(arguKeyIndex);
      keyObj.keyOutTemporalEase = arguOldProp.keyOutTemporalEase(arguKeyIndex);
      keyObj.keyTemporalContinuous =
        arguOldProp.keyTemporalContinuous(arguKeyIndex);
      keyObj.keyTemporalAutoBezier =
        arguOldProp.keyTemporalAutoBezier(arguKeyIndex);
      arguNewProp.addKey(keyObj.time);
      arguNewProp.setValueAtKey(arguKeyIndex, keyObj.value);
      if (
        arguOldProp.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
        arguOldProp.propertyValueType === PropertyValueType.ThreeD_SPATIAL
      ) {
        arguNewProp.setSpatialTangentsAtKey(
          arguKeyIndex,
          keyObj.keyInSpatialTangent,
          keyObj.keyOutSpatialTangent,
        );
        arguNewProp.setSpatialContinuousAtKey(
          arguKeyIndex,
          keyObj.keySpatialContinuous,
        );
        arguNewProp.setSpatialAutoBezierAtKey(
          arguKeyIndex,
          keyObj.keySpatialAutoBezier,
        );
        arguNewProp.setRovingAtKey(arguKeyIndex, keyObj.keyRoving);
      }
      if (keyObj.keyOutInterpolationType != 6614) {
        arguNewProp.setTemporalEaseAtKey(
          arguKeyIndex,
          keyObj.keyInTemporalEase,
          keyObj.keyOutTemporalEase,
        );
      }
      arguNewProp.setTemporalContinuousAtKey(
        arguKeyIndex,
        keyObj.keyTemporalContinuous,
      );
      arguNewProp.setTemporalAutoBezierAtKey(
        arguKeyIndex,
        keyObj.keyTemporalAutoBezier,
      );
      arguNewProp.setInterpolationTypeAtKey(
        arguKeyIndex,
        keyObj.keyInInterpolationType,
        keyObj.keyOutInterpolationType,
      );
      arguNewProp.setSelectedAtKey(arguKeyIndex, false);
    }
    function fctNumComps() {
      var numComps = [];
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (app.project.item(i).typeName === "Composition") {
          numComps.push(app.project.item(i));
        }
      }
      return numComps;
    }
    function fctProjectNumLayers() {
      var numComps = fctNumComps();
      var arrayNumLayers = [];
      for (var i = 0; i < numComps.length; i += 1) {
        var currentComp = numComps[i];
        arrayNumLayers.push(currentComp.numLayers);
      }
      var projectNumLayers = arrayNumLayers.sum();
      return projectNumLayers;
    }
    function fctIndexRandom() {
      app.beginUndoGroup("undoFctIndexRandom");
      var myComp = fctSetMyComp();
      if (rcTrial === true) {
        if (myComp.selectedLayers.length > 5) {
          alert(
            "The index randomization is limited to 5 layers in the trial version.",
            "Randomatic 2 - trial version",
          );
          return;
        }
      }
      var minIndex = 0;
      var maxIndex = 0;
      var arrayLayers = [];
      var arrayIndexes = [];
      if (chkPreserveGroups.value === false) {
        var numLayers = myComp.numLayers;
        minIndex = 1;
        maxIndex = numLayers;
      } else {
        for (var s = 0; s < myComp.selectedLayers.length; s += 1) {
          currentLayer = myComp.selectedLayers[s];
          arrayLayers.push(currentLayer);
          arrayIndexes.push(currentLayer.index);
        }
        var arrayNonSelectedLayers = [];
        var arrayNonSelectedLayersIndexes = [];
        for (var p = 0; p < myComp.numLayers; p += 1) {
          currentLayer = myComp.layer(p + 1);
          if (currentLayer.selected === false) {
            arrayNonSelectedLayers.push(currentLayer);
            arrayNonSelectedLayersIndexes.push(currentLayer.index);
          }
        }
      }
      if (chkPreserveGroups.value === false) {
        for (var r = 0; r < myComp.selectedLayers.length; r += 1) {
          currentLayer = myComp.selectedLayers[r];
          newIndex =
            Math.floor(Math.random() * (maxIndex - minIndex + 1)) + minIndex;
          if (currentLayer.index > newIndex) {
            currentLayer.moveBefore(myComp.layer(newIndex));
          } else {
            if (currentLayer.index < newIndex) {
              currentLayer.moveAfter(myComp.layer(newIndex));
            }
          }
        }
      } else {
        var newArrayIndexes = fctShuffleArray(arrayIndexes);
        for (var a = 0; a < arrayLayers.length; a += 1) {
          currentLayer = arrayLayers[a];
          newIndex = newArrayIndexes[a];
          if (currentLayer.index > newIndex) {
            currentLayer.moveBefore(myComp.layer(newIndex));
          } else {
            if (currentLayer.index < newIndex) {
              currentLayer.moveAfter(myComp.layer(newIndex));
            }
          }
        }
        var numLayers = myComp.numLayers;
        for (var y = 0; y < arrayNonSelectedLayers.length; y += 1) {
          currentLayer = arrayNonSelectedLayers[y];
          if (currentLayer.locked === true) {
            var locked = true;
            currentLayer.locked = false;
          } else {
            var locked = false;
          }
          currentLayer.moveAfter(myComp.layer(numLayers));
          if (locked === true) {
            currentLayer.locked = true;
          }
        }
        for (var x = 0; x < arrayNonSelectedLayers.length; x += 1) {
          currentLayer = arrayNonSelectedLayers[x];
          newIndex = arrayNonSelectedLayersIndexes[x];
          if (currentLayer.locked === true) {
            var locked = true;
            currentLayer.locked = false;
          } else {
            var locked = false;
          }
          if (currentLayer.index > newIndex) {
            currentLayer.moveBefore(myComp.layer(newIndex));
          } else {
            if (currentLayer.index < newIndex) {
              currentLayer.moveAfter(myComp.layer(newIndex));
            }
          }
          if (locked === true) {
            currentLayer.locked = true;
          }
        }
      }
      app.endUndoGroup();
    }
    function fctSecondsToFrames(seconds) {
      var frames = seconds * app.project.activeItem.frameRate;
      return frames;
    }
    function fctFramesToSeconds(frames) {
      var seconds = frames * app.project.activeItem.frameDuration;
      return seconds;
    }
    function fctClassicOffset() {
      app.beginUndoGroup("undofctClassicOffset");
      try {
        myComp = fctSetMyComp();
        var trap = myComp.selectedLayers[0].name;
      } catch (e) {
        alert("Please select at least one layer.", "Randomatic 2");
        return;
      }
      if (rcTrial === true) {
        if (myComp.selectedLayers.length > 5) {
          alert(
            "The classic offset is limited to 5 layers in the trial version.",
            "Randomatic 2 - trial version",
          );
          return;
        }
      }
      var unitChoice = listUnit.selection.index;
      var originChoice = listClassicOffsetOrigin.selection.index;
      var subframes = chkSubframes.value;
      if (originChoice != 3) {
        var frameRate = myComp.frameRate;
        if (unitChoice === 0) {
          minOffset = inputOffsetMin.text;
          maxOffset = inputOffsetMax.text;
        } else if (unitChoice === 1) {
          minOffset = inputOffsetMin.text * frameRate;
          maxOffset = inputOffsetMax.text * frameRate;
        } else {
          var compDuration = myComp.duration;
          var numFrames = Math.floor(compDuration * frameRate);
          minOffset = numFrames * (inputOffsetMin.text / 100);
          maxOffset = numFrames * (inputOffsetMax.text / 100);
        }
      } else {
        minOffset = fctSecondsToFrames(myComp.workAreaStart);
        maxOffset = minOffset + fctSecondsToFrames(myComp.workAreaDuration);
      }
      if (subframes === false) {
        var min = Math.ceil(minOffset);
        var max = Math.floor(maxOffset);
      } else {
        var min = minOffset;
        var max = maxOffset;
      }
      for (
        var l = 0;
        l < app.project.activeItem.selectedLayers.length;
        l += 1
      ) {
        var currentLayer = app.project.activeItem.selectedLayers[l];
        if (originChoice === 0 || originChoice === 3) {
          correcOrigin = 0;
        } else if (originChoice === 1) {
          correcOrigin = fctSecondsToFrames(myComp.time);
        } else {
          if (originChoice === 2) {
            correcOrigin = fctSecondsToFrames(currentLayer.inPoint);
          }
        }
        if (subframes === false) {
          var decimals = 0;
        } else {
          var decimals = 2;
        }
        var newStartFrame =
          fctRandomInterval(min, max, decimals) + correcOrigin;
        var diffStartIn = currentLayer.inPoint - currentLayer.startTime;
        app.project.activeItem.selectedLayers[l].startTime =
          fctFramesToSeconds(newStartFrame) - diffStartIn;
      }
      app.endUndoGroup();
    }
    function fctCloneArray(argArray) {
      var newArray = [];
      for (var i = 0; i < argArray.length; i += 1) {
        newArray[i] = argArray[i];
      }
      return newArray;
    }
    function fctShuffleArray(argArray) {
      var m = argArray.length;
      while (m) {
        i = Math.floor(Math.random() * m--);
        t = argArray[m];
        argArray[m] = argArray[i];
        argArray[i] = t;
      }
      return argArray;
    }
    function fctMinArray(array) {
      var min = array[0];
      for (var i = 0; i < array.length; i += 1) {
        if (array[i] < min) {
          min = array[i];
        }
      }
      return min;
    }
    function fctRandomInterval(arguMin, arguMax, arguDecimals) {
      var mult = Math.pow(10, arguDecimals);
      var x = Math.floor(
        Math.random() * (arguMax * mult - arguMin * mult + 1) + arguMin * mult,
      );
      var y = x / mult;
      return y;
    }
    function fctStepOffset() {
      app.beginUndoGroup("undofctClassicOffset");
      try {
        myComp = fctSetMyComp();
        selectedLayers = myComp.selectedLayers;
        var trap = selectedLayers[0].name;
      } catch (e) {
        alert("Please select at least one layer.", "Randomatic 2");
        return;
      }
      if (rcTrial === true) {
        if (selectedLayers.length > 5) {
          alert(
            "The step offset is limited to 5 layers in the trial version.",
            "Randomatic 2 - trial version",
          );
          return;
        }
      }
      var subframes = chkSubframes.value;
      var step = eval(inputStep.text);
      var tolerance = eval(inputTolerance.text);
      var unitChoice = listUnit.selection.index;
      var startChoice = listStepOffsetStart.selection.index;
      if (unitChoice === 0) {
        newStep = step;
        newTolerance = tolerance;
      } else if (unitChoice === 1) {
        newStep = fctSecondsToFrames(step);
        newTolerance = fctSecondsToFrames(tolerance);
      } else {
        var compDuration = myComp.duration;
        var frameRate = myComp.frameRate;
        var numFrames = Math.floor(compDuration * frameRate);
        newStep = Math.floor(numFrames * (step / 100));
        newTolerance = numFrames * (tolerance / 100);
      }
      if (subframes === false) {
        newTolerance = Math.floor(newTolerance);
      }
      if (startChoice === 0) {
        var arrayInPoint = [];
        for (var t = 0; t < myComp.selectedLayers.length; t += 1) {
          currentLayer = myComp.selectedLayers[t];
          arrayInPoint.push(currentLayer.inPoint);
        }
        var correcStart = fctSecondsToFrames(fctMinArray(arrayInPoint));
      } else if (startChoice === 2) {
        var correcStart = fctSecondsToFrames(app.project.activeItem.time);
      } else {
        if (startChoice === 1) {
          var correcStart = 0;
        }
      }
      var arraySelectedIndex = [];
      for (var s = 0; s < selectedLayers.length; s += 1) {
        arraySelectedIndex.push(selectedLayers[s].index);
      }
      var arrayShuffleIndex = [];
      arrayShuffleIndex = fctShuffleArray(arraySelectedIndex);
      for (var l = 0; l < arrayShuffleIndex.length; l += 1) {
        currentLayer = myComp.layer(arrayShuffleIndex[l]);
        if (l > 0) {
          correcStart = fctSecondsToFrames(
            myComp.layer(arrayShuffleIndex[l - 1]).inPoint,
          );
        }
        if (newTolerance === 0) {
          stepOffset = newStep;
        } else {
          if (subframes === false) {
            decimals = 0;
          } else {
            decimals = 2;
          }
          stepOffset = fctRandomInterval(
            newStep - newTolerance,
            newStep + newTolerance,
            decimals,
          );
        }
        var newTimeFrame = eval(correcStart + stepOffset);
        var diffStartIn = currentLayer.inPoint - currentLayer.startTime;
        if (l === 0) {
          currentLayer.startTime =
            fctFramesToSeconds(correcStart) - diffStartIn;
        } else {
          currentLayer.startTime =
            fctFramesToSeconds(newTimeFrame) - diffStartIn;
        }
      }
      app.endUndoGroup();
    }
    function fctVerifSingleRandomaticEffect(arguEffect) {
      if (
        arguEffect.matchName.indexOf("Pseudo/Randomatic") != -1 &&
        arguEffect.matchName.indexOf("-") === -1 &&
        arguEffect.matchName.indexOf("RandomaticLayer") === -1
      ) {
        verifRandomaticEffect = true;
      } else {
        verifRandomaticEffect = false;
      }
      return verifRandomaticEffect;
    }
    function fctVerifRandomaticEffect(arguSelectedControllers) {
      var nbAnimController = 0;
      for (var p = 0; p < arguSelectedControllers.length; p += 1) {
        currentController = arguSelectedControllers[p];
        if (
          currentController.matchName.indexOf("Pseudo/Randomatic") != -1 &&
          currentController.matchName.indexOf("-") === -1 &&
          currentController.matchName.indexOf("RandomaticLayer") === -1
        ) {
          verifRandomaticEffect = true;
          if (
            currentController.matchName.indexOf("Pseudo/RandomaticSR") === -1
          ) {
            nbAnimController++;
          }
        } else {
          verifRandomaticEffect = false;
          break;
        }
      }
      return {
        nbAnimController: nbAnimController,
        verifRandomaticEffect: verifRandomaticEffect,
      };
    }
    function fctDeleteController() {
      var altState = fctAltState();
      if (altState === true) {
        fctPrecisionDelete();
        return;
      }
      app.beginUndoGroup("undoDeleteController");
      try {
        myComp = fctSetMyComp();
        myLayer = myComp.selectedLayers[0];
        bingo = myLayer.index;
        myEffect = myComp.selectedLayers[0].selectedProperties[0];
        selectedEffects = myLayer.selectedProperties;
        myCompIndex = fctGetCompIndex(myComp);
        var trap = myEffect.name;
      } catch (e) {
        return alert(
          "Please select at least one Randomatic controller" +
            retour +
            "you want to delete.",
          "Randomatic 2",
        );
      }
      var returnFctVerifRandomaticEffect =
        fctVerifRandomaticEffect(selectedEffects);
      var verifRandomaticEffect =
        returnFctVerifRandomaticEffect.verifRandomaticEffect;
      var nbAnimController = returnFctVerifRandomaticEffect.nbAnimController;
      if (verifRandomaticEffect === false) {
        if (selectedEffects.length < 2) {
          return alert(
            "Please select a Randomatic controller.",
            "Randomatic 2",
          );
        } else {
          return alert(
            "Please only select Randomatic controllers.",
            "Randomatic 2",
          );
        }
      } else if (verifRandomaticEffect === true) {
      } else {
        return alert(
          "Something unexpected happened. Please try again.",
          "Randomatic 2",
        );
      }
      var arrDeleteEffectsIndex = [];
      for (var e = 0; e <= selectedEffects.length - 1; e += 1) {
        arrDeleteEffectsIndex.push(selectedEffects[e].propertyIndex);
      }
      var projectNumLayers = fctProjectNumLayers();
      if (projectNumLayers > 5) {
        var PBLimit = Math.floor(projectNumLayers / 5);
      } else {
        var PBLimit = 5;
      }
      var numComps = fctNumComps();
      fctUIProgressBar(PBLimit, "Randomatic");
      btnDone.enabled = false;
      var arrayRandomaticProps = [];
      var arrayRandomaticLayers = [];
      var arrayPB = [];
      var objAllRandomaticProps = {
        compsIndex: [],
        layers: [],
        layersIndex: [],
        props: [],
      };
      for (var i = 0; i < numComps.length; i += 1) {
        var currentComp = numComps[i];
        var currentCompIndex = fctGetCompIndex(currentComp);
        for (var c = 1; c <= currentComp.numLayers; c += 1) {
          var currentLayer = currentComp.layer(c);
          arrayPB.push(1);
          if (arrayPB.length % 5 === 0) {
            fctPBValue(arrayPB.length / 5);
          }
          objAllRandomaticProps = fctFindRandomaticProps(
            currentLayer,
            currentLayer,
            objAllRandomaticProps,
            currentCompIndex,
            c,
          );
        }
      }
      var objDeleteRandomaticProps = {
        compsIndex: [],
        layers: [],
        layersIndex: [],
        props: [],
      };
      var arrayDeleteProps = [];
      var arrayDeleteLayers = [];
      for (var c = 0; c < selectedEffects.length; c += 1) {
        var currentController = selectedEffects[c];
        for (var p = 0; p < objAllRandomaticProps.props.length; p += 1) {
          var currentProp = objAllRandomaticProps.props[p];
          var str = currentProp.expression;
          var currentLayerIndex = objAllRandomaticProps.layersIndex[p];
          var currentCompIndex = objAllRandomaticProps.compsIndex[p];
          var relative =
            'thisComp.layer("' +
            myComp.selectedLayers[0].name +
            '").effect("' +
            currentController.name +
            '")';
          var absolute =
            'comp("' +
            myComp.name +
            '").layer("' +
            myComp.selectedLayers[0].name +
            '").effect("' +
            currentController.name +
            '")';
          if (currentCompIndex === myCompIndex) {
            if (str.indexOf(relative) != -1 || str.indexOf(absolute) != -1) {
              objDeleteRandomaticProps.props.push(currentProp);
              objDeleteRandomaticProps.layers.push(
                app.project.item(currentCompIndex).layer(currentLayerIndex),
              );
            }
          } else {
            if (str.indexOf(absolute) != -1) {
              objDeleteRandomaticProps.props.push(currentProp);
              objDeleteRandomaticProps.layers.push(
                app.project.item(currentCompIndex).layer(currentLayerIndex),
              );
            }
          }
        }
      }
      for (var a = 0; a < objDeleteRandomaticProps.props.length; a += 1) {
        objDeleteRandomaticProps.props[a].expression = "";
      }
      try {
        numSelectedEffects = selectedEffects.length;
        propName = selectedEffects[0].name;
        for (var e = arrDeleteEffectsIndex.length - 1; e >= 0; e--) {
          myLayer.effect(arrDeleteEffectsIndex[e]).remove();
        }
      } catch (e) {
        ProgressText.text = "Something went wrong... Please try again.";
        myLayer.selected = true;
        btnDone.enabled = true;
        return;
      }
      myLayer.selected = false;
      fctLayerSpeedBingo(bingo);
      var arrayUniqueDeleteLayers = objDeleteRandomaticProps.layers.unique();
      fctLayerSpeed(arrayUniqueDeleteLayers);
      fctPBValue(PBLimit);
      if (numSelectedEffects < 2) {
        ProgressText.text = '"' + propName + '" has been successfully deleted.';
      } else {
        ProgressText.text =
          "The Randomatic controllers have been successfully deleted.";
      }
      myLayer.selected = true;
      btnDone.enabled = true;
      app.endUndoGroup();
    }
    function fctPrecisionDelete(arguLayers) {
      app.beginUndoGroup("undoFctPrecisionDelete");
      var myComp = fctSetMyComp();
      var selectedLayers = myComp.selectedLayers;
      var objAllRandomaticProps = {
        compsIndex: [],
        layers: [],
        layersIndex: [],
        props: [],
      };
      for (var s = 0; s < selectedLayers.length; s += 1) {
        var currentLayer = selectedLayers[s];
        objAllRandomaticProps = fctFindRandomaticProps(
          currentLayer,
          currentLayer,
          objAllRandomaticProps,
          1,
          1,
        );
      }
      var PBLimit = objAllRandomaticProps.props.length + selectedLayers.length;
      fctUIProgressBar(PBLimit, "Randomatic - Clean");
      for (var p = 0; p < objAllRandomaticProps.props.length; p += 1) {
        var currentProp = objAllRandomaticProps.props[p];
        currentProp.expression = "";
        fctPBValue(p + 1);
      }
      var layerRemove = 0;
      for (var s = 0; s < selectedLayers.length; s += 1) {
        var currentLayer = selectedLayers[s];
        try {
          currentLayer.effect("Pseudo/RandomaticLayer").remove();
          layerRemove++;
        } catch (e) {}
        fctPBValue(p + s + 1);
      }
      fctPBValue(PBLimit);
      if (layerRemove != 0 || objAllRandomaticProps.props.length != 0) {
        ProgressText.text = "The layers have been successfully cleaned.";
      } else {
        ProgressText.text =
          "There were no Randomatic expressions. No cleaning needed.";
      }
      app.endUndoGroup();
    }
    function fctLayerSpeed_original(argArrayLayers) {
      var arrayAnimExp = [];
      for (var a = 0; a < argArrayLayers.length; a += 1) {
        var currentLayer = argArrayLayers[a];
        var arrayAnimExp = fctSearchAnimEffects(currentLayer, arrayAnimExp);
        var nbAnimExp = arrayAnimExp.length;
        if (
          currentLayer.effect("Pseudo/RandomaticLayer") != null &&
          currentLayer.effect("Pseudo/RandomaticLayer") != undefined
        ) {
          if (nbAnimExp === 0) {
            currentLayer.effect("Pseudo/RandomaticLayer").remove();
          }
        } else {
          currentLayer.selected = true;
          if (nbAnimExp != 0) {
            fctEffectLayerCreation(currentLayer);
          }
          currentLayer.selected = false;
        }
      }
    }
    function fctLayerSpeed(argArrayLayers) {
      var arrayAnimExp = [];
      for (var a = 0; a < argArrayLayers.length; a += 1) {
        var currentLayer = argArrayLayers[a];
        if (
          currentLayer instanceof LightLayer ||
          currentLayer instanceof CameraLayer
        ) {
          break;
        }
        arrayAnimExp = fctSearchAnimEffects(currentLayer, arrayAnimExp);
        var nbAnimExp = arrayAnimExp.length;
        if (
          currentLayer.effect("Pseudo/RandomaticLayer") != null &&
          currentLayer.effect("Pseudo/RandomaticLayer") != undefined
        ) {
          if (nbAnimExp === 0) {
            currentLayer.effect("Pseudo/RandomaticLayer").remove();
          }
        } else {
          currentLayer.selected = true;
          if (nbAnimExp != 0) {
            fctEffectLayerCreation(currentLayer);
          }
          currentLayer.selected = false;
        }
      }
    }
    function fctSearchAnimEffects(propGroup, argArrayAnimExp) {
      for (var i = 1; i <= propGroup.numProperties; i += 1) {
        currentProp = propGroup.property(i);
        if (
          currentProp.propertyType === PropertyType.PROPERTY &&
          currentProp.canSetExpression === true
        ) {
          var str = currentProp.expression;
          if (str.indexOf('k = rc("posterize time")') != -1) {
            argArrayAnimExp.push(1);
          }
        } else {
          if (
            currentProp.propertyType === PropertyType.INDEXED_GROUP ||
            currentProp.propertyType === PropertyType.NAMED_GROUP
          ) {
            fctSearchAnimEffects(currentProp, argArrayAnimExp);
          }
        }
      }
      return argArrayAnimExp;
    }
    function fctSearchKeys(arguPropGroup) {
      for (var i = 1; i <= arguPropGroup.numProperties; i += 1) {
        currentProp = arguPropGroup.property(i);
        if (currentProp.numKeys > 0) {
          if (currentProp.dimensionsSeparated === true) {
          } else {
            for (var j = currentProp.numKeys; j > 0; j--) {
              currentProp.removeKey(j);
            }
            var duplicateLayerIndex = fctPropToLayerIndex(currentProp) - 1;
            var duplicatePropPath = fctBuildPropPath(currentProp, "property");
            var duplicateProp =
              "app.project.activeItem.layer(" +
              duplicateLayerIndex +
              ")" +
              duplicatePropPath;
            var evalDuplicateProp = eval(duplicateProp);
            for (var k = 1; k <= evalDuplicateProp.numKeys; k += 1) {
              fctCopyPasteKey(k, evalDuplicateProp, currentProp);
            }
          }
        } else {
          if (
            currentProp.propertyType === PropertyType.INDEXED_GROUP ||
            currentProp.propertyType === PropertyType.NAMED_GROUP
          ) {
            fctSearchKeys(currentProp);
          }
        }
      }
    }
    function fctLoopEffectLayer(argArrayLayers) {
      if (listAnimation.selection.index === 0) {
        return;
      }
      for (var i = 0; i < argArrayLayers.length; i += 1) {
        var currentLayer = argArrayLayers[i];
        if (
          currentLayer instanceof LightLayer ||
          currentLayer instanceof CameraLayer
        ) {
          break;
        }
        if (currentLayer.effect("Pseudo/RandomaticLayer") === null) {
          fctEffectLayerCreation(currentLayer);
        }
      }
    }
    function fctLoopEffectLayer_OLD(argArrayLayers) {
      var animationChoice = listAnimation.selection.index;
      if (animationChoice === 0) {
        return;
      } else {
        for (var i = 0; i < argArrayLayers.length; i += 1) {
          var currentLayer = argArrayLayers[i];
          if (currentLayer.effect("Pseudo/RandomaticLayer") === null) {
            currentLayer.selected = true;
            fctEffectLayerCreation(currentLayer);
            currentLayer.selected = false;
          }
        }
      }
    }
    function fctLayerNameSearch(argStrLayerName) {
      var myComp = fctSetMyComp();
      var i = 0;
      for (var c = 1; c <= myComp.numLayers; c += 1) {
        if (myComp.layer(c).name === argStrLayerName) {
          i = c;
          return i;
        }
      }
      return i;
    }
    function fctLayerSpeedBingo(layerBingo) {
      var randomaticLayer = app.project.activeItem.layer(layerBingo);
      var numEffects =
        randomaticLayer.property("ADBE Effect Parade").numProperties;
      randomaticAnimEffect = false;
      for (var e = 1; e <= numEffects; e += 1) {
        var currentEffect = randomaticLayer
          .property("ADBE Effect Parade")
          .property(e);
        if (
          currentEffect.matchName.indexOf("Pseudo/RandomaticAR") != -1 ||
          currentEffect.matchName.indexOf("Pseudo/RandomaticW") != -1
        ) {
          randomaticAnimEffect = true;
        }
      }
      var animationChoice = listAnimation.selection.index;
      if (
        randomaticAnimEffect === true &&
        randomaticLayer.effect("Pseudo/RandomaticLayer") === null
      ) {
        randomaticLayer.selected = true;
        fctEffectLayerCreation(randomaticLayer);
        randomaticLayer.selected = false;
        randomaticLayer.effect("Pseudo/RandomaticLayer").moveTo(numEffects + 1);
      } else if (
        randomaticAnimEffect === false &&
        randomaticLayer.effect("Pseudo/RandomaticLayer") != null
      ) {
        randomaticLayer.effect("Pseudo/RandomaticLayer").remove();
      } else {
        if (
          randomaticAnimEffect === true &&
          randomaticLayer.effect("Pseudo/RandomaticLayer") != null
        ) {
          randomaticLayer.effect("Pseudo/RandomaticLayer").moveTo(numEffects);
        }
      }
    }
    function fctAltState() {
      var myKeyState = ScriptUI.environment.keyboardState;
      if (myKeyState.altKey === true) {
        return true;
      } else {
        return false;
      }
    }
    function fctShiftState() {
      var myKeyState = ScriptUI.environment.keyboardState;
      if (myKeyState.shiftKey === true) {
        return true;
      } else {
        return false;
      }
    }
    var rcTrial = rc2410.t();
    var para = "\r\n\n";
    var retour = "\r\n";
    var prevInputOffsetMin = 0;
    var prevInputOffsetMax = 10;
    var prevInputStretchMin = 80;
    var prevInputStretchMax = 100;
    var prevInputStep = 5;
    var prevInputTolerance = 0;
    var arrayTransferControllersName = [];
    var arrayTransferControllers = [];
    var arrayTransferControllersIndex = [];
    var nbSelectedEffect = 0;
    var nbOtherEffect = 0;
    Array.prototype.unique = function () {
      var r = new Array();
      o: for (var i = 0, n = this.length; i < n; i++) {
        for (var x = 0, y = r.length; x < y; x++) {
          if (r[x] == this[i]) {
            continue o;
          }
        }
        r[r.length] = this[i];
      }
      return r;
    };
    Array.prototype.sum = function calcul() {
      sum = 0;
      for (var i = 0; i < this.length; i += 1) {
        if (!isNaN(Number(this[i]))) {
          sum += Number(this[i]);
        }
      }
      return sum;
    };
    var mainPalette =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", scriptName, undefined, { resizeable: true });
    if (mainPalette === null) {
      return;
    }
    mainPalette.alignChildren = ["fill", "fill"];
    mainPalette.margins = 0;
    mainPalette.spacing = 0;
    var tpanel = mainPalette.add("tabbedpanel");
    tpanel.spacing = 0;
    tpanel.margins = 0;
    var marginsTab = [7, 7, 0, 0];
    var marginsPnl = [5, 11, 5, 6];
    var espace = 3;
    var espaceBtn = 5;
    var arrayBinaryIconsFiles = fctBinaryIcons();
    var colTextProperties = 58;
    var tabProps = tpanel.add("tab", undefined, "\u25ba  PROPERTIES");
    tabProps.alignChildren = "fill";
    tabProps.margins = marginsTab;
    tabProps.spacing = espace;
    var grpAnimation = tabProps.add("group");
    grpAnimation.spacing = 0;
    grpAnimation.margins = 0;
    var txtAnimation = grpAnimation.add(
      'statictext {text: "Options", justify: "left"}',
    );
    txtAnimation.preferredSize = [colTextProperties, 25];
    var listAnimation = grpAnimation.add("dropdownlist", undefined, [
      "Static random",
      "Animated random",
      "Wiggle",
    ]);
    listAnimation.preferredSize = [130, 25];
    listAnimation.helpTip = fctHelpTip().animationHelpTip;
    var grpColors = tabProps.add("group");
    grpColors.spacing = 0;
    grpColors.margins = 0;
    var txtColors = grpColors.add(
      'statictext {text: "Colors", justify: "left"}',
    );
    txtColors.preferredSize = [colTextProperties, 25];
    var listColors = grpColors.add("dropdownlist", undefined, [
      "Gradient",
      "Palette",
      "HSL",
    ]);
    listColors.preferredSize = [130, 25];
    listColors.helpTip = fctHelpTip().colorsHelpTip;
    var grpControllers = tabProps.add("group");
    var chkControllerLayer = grpControllers.add(
      "checkbox",
      [10, 35, 180, 55],
      "Controllers on selected layer",
    );
    var grpButtons = tabProps.add("group");
    grpButtons.spacing = 5;
    var btnApply = grpButtons.add(
      "iconbutton",
      [0, 0, 150, 32],
      arrayBinaryIconsFiles[0],
    );
    var btnHelp = grpButtons.add("button", [0, 0, 32, 32], "?");
    var grpManagingButtons = tabProps.add("group");
    grpManagingButtons.margins = 0;
    grpManagingButtons.spacing = 0;
    var pnlManagingButtons = grpManagingButtons.add(
      "panel {orientation:\'row\', text:\'Managing controllers\'}",
    );
    pnlManagingButtons.margins = [4, 10, 4, 4];
    pnlManagingButtons.spacing = 0;
    var sizeIconbutton = [0, 0, 44, 36];
    var btnReplace = pnlManagingButtons.add(
      "iconbutton",
      sizeIconbutton,
      arrayBinaryIconsFiles[1],
      { style: "toolbutton" },
    );
    btnReplace.helpTip = fctHelpTip().replaceHelpTip;
    var btnDelete = pnlManagingButtons.add(
      "iconbutton",
      sizeIconbutton,
      arrayBinaryIconsFiles[2],
      { style: "toolbutton" },
    );
    btnDelete.helpTip = fctHelpTip().deleteHelpTip;
    var btnTransfer = pnlManagingButtons.add(
      "iconbutton",
      sizeIconbutton,
      arrayBinaryIconsFiles[3],
      { style: "toolbutton" },
    );
    btnTransfer.helpTip = fctHelpTip().transferHelpTip;
    var btnRandomGenerator = pnlManagingButtons.add(
      "iconbutton",
      sizeIconbutton,
      arrayBinaryIconsFiles[4],
      { style: "toolbutton" },
    );
    btnRandomGenerator.helpTip = fctHelpTip().randomGeneratorHelpTip;
    var grpAutoSelectParent = tabProps.add("group");
    grpAutoSelectParent.margins = 0;
    grpAutoSelectParent.spacing = 0;
    var pnlAutoSelect = grpAutoSelectParent.add(
      "panel {orientation:\'row\', text:\'Properties selection\'}",
    );
    pnlAutoSelect.margins = [4, 12, 4, 7];
    pnlAutoSelect.spacing = 0;
    var grpAutoSelect = pnlAutoSelect.add("group {orientation:\'row\'}");
    var hauteurBtnAutoSelect = 28;
    grpAutoSelect.margins = 0;
    grpAutoSelect.spacing = 4;
    var grpStorePropBtn = grpAutoSelect.add("group", undefined);
    grpStorePropBtn.margins = 0;
    grpStorePropBtn.spacing = 0;
    var btnStoreProp = grpStorePropBtn.add(
      "button",
      [0, 0, 86, hauteurBtnAutoSelect],
      "Save property",
    );
    var grpAutoSelectPropsBtn = grpAutoSelect.add("group", undefined);
    grpAutoSelectPropsBtn.spacing = 0;
    grpAutoSelectPropsBtn.margins = 0;
    var btnAutoSelectProps = grpAutoSelectPropsBtn.add(
      "button",
      [0, 0, 86, hauteurBtnAutoSelect],
      "Auto-selection",
    );
    var marginLeft = 50;
    var sizeInput = [38, 24];
    var sizeLayersList = [120, 25];
    var sizeLayersBtn = [0, 0, 180, 32];
    var marginsLayersPanel = 5;
    var tabLayers = tpanel.add("tab", undefined, "\u25ba  LAYERS");
    tabLayers.alignChildren = "left";
    tabLayers.margins = marginsTab;
    tabLayers.spacing = espace;
    var grpRadio = tabLayers.add("group");
    grpRadio.margins = 0;
    grpRadio.spacing = 5;
    var radioOffset = grpRadio.add("radiobutton", undefined, "Offset");
    var radioStretch = grpRadio.add("radiobutton", undefined, "Stretch");
    var radioIndex = grpRadio.add("radiobutton", undefined, "Index");
    var stackgroup = tabLayers.add("group {orientation: \'stack\'}");
    stackgroup.alignChildren = "top";
    var pnlOffset = stackgroup.add("panel {text:\'\'}");
    pnlOffset.alignChildren = "left";
    pnlOffset.margins = marginsLayersPanel;
    pnlOffset.spacing = espace;
    var grpUnit = pnlOffset.add("group");
    var txtUnit = grpUnit.add('statictext {text: "Unit", justify: "left"}');
    txtUnit.preferredSize = [marginLeft, 25];
    var listUnit = grpUnit.add("dropdownlist", undefined, [
      "Frames",
      "Seconds",
      "Comp. duration %",
    ]);
    listUnit.preferredSize = sizeLayersList;
    var grpChkSubframes = pnlOffset.add("group");
    grpChkSubframes.orientation = "row";
    grpChkSubframes.alignChildren = ["left", "center"];
    grpChkSubframes.spacing = 0;
    grpChkSubframes.margins = [marginLeft + 10, 2, 5, 0];
    var chkSubframes = grpChkSubframes.add(
      "checkbox",
      undefined,
      "Allow subframes",
    );
    chkSubframes.preferredSize = [120, 16];
    var grpStepOffset = pnlOffset.add("group");
    grpStepOffset.orientation = "row";
    grpStepOffset.alignChildren = ["left", "center"];
    grpStepOffset.spacing = 0;
    grpStepOffset.margins = [marginLeft + 10, 2, 5, 0];
    var chkStepOffset = grpStepOffset.add("checkbox", undefined, "Step Offset");
    chkStepOffset.preferredSize = [120, 16];
    var grpFilet = pnlOffset.add("group");
    grpFilet.orientation = "row";
    grpFilet.alignChildren = ["left", "top"];
    grpFilet.spacing = 0;
    grpFilet.margins = [0, 6, 0, 6];
    var filet1 = grpFilet.add(
      "image",
      [0, 0, 180, 1],
      arrayBinaryIconsFiles[5],
    );
    filet1.alignment = ["left", "top"];
    var stackgroupOffset = pnlOffset.add("group {orientation: \'stack\'}");
    stackgroupOffset.margins = stackgroupOffset.spacing = 0;
    stackgroupOffset.alignChildren = "top";
    var grpClassicOffset = stackgroupOffset.add(
      "group {orientation: \'column\'}",
    );
    grpClassicOffset.alignChildren = "left";
    grpClassicOffset.margins = 0;
    grpClassicOffset.spacing = espace;
    var grpOrigin = grpClassicOffset.add("group");
    var txtOrigin = grpOrigin.add(
      'statictext {text: "Origin", justify: "left"}',
    );
    txtOrigin.preferredSize = [marginLeft, 25];
    var listClassicOffsetOrigin = grpOrigin.add("dropdownlist", undefined, [
      "Comp. first frame",
      "Current time",
      "Layers in point",
      "Working area",
    ]);
    listClassicOffsetOrigin.preferredSize = sizeLayersList;
    var grpRange = grpClassicOffset.add("group");
    var txtRange = grpRange.add('statictext {text: "Range", justify: "left"}');
    txtRange.preferredSize = [marginLeft, 25];
    var inputOffsetMin = grpRange.add("edittext", undefined, "0");
    inputOffsetMin.active = false;
    inputOffsetMin.preferredSize = sizeInput;
    var inputOffsetMax = grpRange.add("edittext", undefined, "10");
    inputOffsetMax.active = false;
    inputOffsetMax.preferredSize = sizeInput;
    var grpClassicOffsetBtn = grpClassicOffset.add("group");
    grpClassicOffsetBtn.margins.top = espaceBtn;
    var btnClassicOffset = grpClassicOffsetBtn.add(
      "iconbutton",
      sizeLayersBtn,
      arrayBinaryIconsFiles[0],
    );
    var grpStepOffset = stackgroupOffset.add("group {orientation: \'column\'}");
    grpStepOffset.alignChildren = "left";
    grpStepOffset.margins = 0;
    grpStepOffset.spacing = espace;
    var grpStart = grpStepOffset.add("group");
    var txtStart = grpStart.add('statictext {text: "Start", justify: "left"}');
    txtStart.preferredSize = [marginLeft, 25];
    var listStepOffsetStart = grpStart.add("dropdownlist", undefined, [
      "Earliest layer",
      "Comp. first frame",
      "Current time",
    ]);
    listStepOffsetStart.preferredSize = sizeLayersList;
    var grpStep = grpStepOffset.add("group");
    var subGrpStep = grpStep.add("group");
    var txtStep = subGrpStep.add('statictext {text: "Step", justify: "left"}');
    txtStep.preferredSize = [marginLeft, 25];
    var inputStep = subGrpStep.add("edittext", undefined, "5");
    inputStep.active = false;
    inputStep.preferredSize = sizeInput;
    var subGrpTolerance = grpStep.add("group");
    subGrpTolerance.spacing = 5;
    subGrpTolerance.margins = 0;
    var txtTolerance = subGrpTolerance.add(
      'statictext {text: "+ -", justify: "right"}',
    );
    var inputTolerance = subGrpTolerance.add("edittext", undefined, "0");
    inputTolerance.active = false;
    inputTolerance.preferredSize = sizeInput;
    var grpStepOffsetBtn = grpStepOffset.add("group");
    grpStepOffsetBtn.margins.top = espaceBtn;
    var btnStepOffset = grpStepOffsetBtn.add(
      "iconbutton",
      sizeLayersBtn,
      arrayBinaryIconsFiles[0],
    );
    var pnlStretch = stackgroup.add("panel {text:\'\'}");
    pnlStretch.alignChildren = "left";
    pnlStretch.margins = marginsLayersPanel;
    pnlStretch.spacing = espace;
    var grpStretchOrigin = pnlStretch.add("group");
    var txtStretchOrigin = grpStretchOrigin.add(
      'statictext {text: "Based on", justify: "left"}',
    );
    txtStretchOrigin.preferredSize = [marginLeft, 25];
    var listStretchOrigin = grpStretchOrigin.add("dropdownlist", undefined, [
      "Layers in point",
      "Layers out point",
      "Current time",
    ]);
    listStretchOrigin.preferredSize = sizeLayersList;
    var grpStretchValue = pnlStretch.add("group");
    var txtStretchMinMax = grpStretchValue.add(
      'statictext {text: "Min/Max", justify: "left"}',
    );
    txtStretchMinMax.preferredSize = [marginLeft, 25];
    var grpStretchMinMax = grpStretchValue.add("group");
    grpStretchMinMax.spacing = 0;
    var inputStretchMin = grpStretchMinMax.add("edittext", undefined, "80");
    inputStretchMin.characters = 3;
    inputStretchMin.active = false;
    inputStretchMin.preferredSize = sizeInput;
    grpStretchMinMax.add('statictext {text: "/", justify: "left", spacing :0}');
    var inputStretchMax = grpStretchMinMax.add("edittext", undefined, "100");
    inputStretchMax.characters = 3;
    inputStretchMax.active = false;
    inputStretchMax.preferredSize = sizeInput;
    grpStretchMinMax.add('statictext {text: "%", justify: "left", spacing :0}');
    var grpAffectKeys = pnlStretch.add("group");
    var chkAffectKeys = grpAffectKeys.add(
      "checkbox",
      [0, 0, 150, 25],
      "Don\'t affect keyframes",
    );
    var grpStretchBtn = pnlStretch.add("group");
    grpStretchBtn.margins.top = espaceBtn - 10;
    var btnStretch = grpStretchBtn.add(
      "iconbutton",
      sizeLayersBtn,
      arrayBinaryIconsFiles[0],
    );
    var pnlIndex = stackgroup.add("panel {text:\'\'}");
    pnlIndex.margins = marginsLayersPanel;
    pnlIndex.spacing = espace;
    pnlIndex.alignChildren = "left";
    var grpIndexMethod = pnlIndex.add("group");
    var grpPreserveGroups = pnlIndex.add("group");
    var chkPreserveGroups = grpPreserveGroups.add(
      "checkbox",
      [0, 0, 150, 20],
      "Preserve layers groups",
    );
    var grpIndexBtn = pnlIndex.add("group");
    grpIndexBtn.margins.top = espaceBtn;
    var btnIndex = grpIndexBtn.add(
      "iconbutton",
      sizeLayersBtn,
      arrayBinaryIconsFiles[0],
    );
    listAnimation.selection = 0;
    listColors.selection = 0;
    listClassicOffsetOrigin.selection = 0;
    listUnit.selection = 0;
    listStretchOrigin.selection = 0;
    listStepOffsetStart.selection = 0;
    chkStepOffset.value = false;
    grpClassicOffset.visible = true;
    grpStepOffset.visible = false;
    chkSubframes.value = false;
    radioOffset.value = true;
    pnlOffset.visible = true;
    pnlStretch.visible = false;
    pnlIndex.visible = false;
    btnApply.onClick = fctRandomatic;
    btnReplace.onClick = fctReplaceController;
    btnDelete.onClick = fctDeleteController;
    btnTransfer.onClick = fctTransferSelect;
    btnRandomGenerator.onClick = fctRandomGenerator;
    btnClassicOffset.onClick = fctClassicOffset;
    btnStepOffset.onClick = fctStepOffset;
    btnStretch.onClick = fctStretch;
    btnIndex.onClick = fctIndexRandom;
    radioOffset.onClick = fctRadioChange;
    radioStretch.onClick = fctRadioChange;
    radioIndex.onClick = fctRadioChange;
    btnStoreProp.onClick = fctStoreProp;
    btnAutoSelectProps.onClick = fctAutoSelectProps;
    btnHelp.onClick = rc2410.helpUI;
    listAnimation.onChange = function () {
      var animationChoice = listAnimation.selection.index;
      if (animationChoice === 2) {
        listColors.enabled = false;
      } else {
        listColors.enabled = true;
      }
    };
    listClassicOffsetOrigin.onChange = function () {
      var originChoice = listClassicOffsetOrigin.selection.index;
      if (originChoice === 3) {
        inputOffsetMin.enabled = false;
        inputOffsetMax.enabled = false;
      } else {
        inputOffsetMin.enabled = true;
        inputOffsetMax.enabled = true;
      }
    };
    chkStepOffset.onClick = function () {
      if (chkStepOffset.value === false) {
        grpClassicOffset.visible = true;
        grpStepOffset.visible = false;
      } else {
        grpClassicOffset.visible = false;
        grpStepOffset.visible = true;
      }
    };
    inputOffsetMin.onChange = function () {
      prevInputOffsetMin = fctInputOnChange(inputOffsetMin, prevInputOffsetMin);
    };
    inputOffsetMax.onChange = function () {
      prevInputOffsetMax = fctInputOnChange(inputOffsetMax, prevInputOffsetMax);
    };
    inputStretchMin.onChange = function () {
      prevInputStretchMin = fctInputOnChange(
        inputStretchMin,
        prevInputStretchMin,
      );
    };
    inputStretchMax.onChange = function () {
      prevInputStretchMax = fctInputOnChange(
        inputStretchMax,
        prevInputStretchMax,
      );
    };
    inputStep.onChange = function () {
      prevInputStep = fctInputOnChange(inputStep, prevInputStep);
    };
    inputTolerance.onChange = function () {
      prevInputTolerance = fctInputOnChange(inputTolerance, prevInputTolerance);
    };
    listUnit.onChange = function () {
      unitChoice = listUnit.selection.index;
    };
    mainPalette.layout.layout(true);
    mainPalette.layout.resize();
    mainPalette.onResizing = mainPalette.onResize = function () {
      mainPalette.layout.resize();
    };
    if (!(mainPalette instanceof Panel)) {
      mainPalette.show();
    }
  }
}
rc_randomatic2(this);
