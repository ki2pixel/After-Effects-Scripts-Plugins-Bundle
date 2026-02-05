/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function DPaeSplash(thisObj) {
  var versionNum = 1.03;
  var windowTitle = "Splash";
  var splashPseudoMatchName = "Pseudo/aeSplashV1.03";
  var blobPseudoMatchName = "Pseudo/aeSplashBlob_0.97";
  var af_settings = {
    betaExpirationDate: new Date("Sep 14, 2020"),
    betaStartDate: new Date("Aug 1, 2020"),
    betaSupportEmail: "danny@pluginplay.app",
    helpButtons: [
      { name: "Video Tutorial", url: "https://youtu.be/jqbs7fVJr8Q" },
      {
        name: "Other Products",
        url: "http://aescripts.com/authors/plugin-play",
      },
    ],
    helpText:
      "Splash\nHello and welcome to Splash! Splash is a project stemming from the Plugin Play team and aims to provide an intuitive framework for making liquid animations. Please refer to the PDF provided in the original zip along with the tutorial video for detailed instrucitons :)\n\n** General instructions **\n1. Select a moving layer inside of After Effects.\n2. Click the \'Splash\' button to create x amount of trails on the moving object.\n3. In order to control these new Splashes please use the effect control on the original moving layer. Here you will be able to control many different parameters.\n4. If you would like to add a Blob to your moving object (very useful when a null is your moving object) select the moving layer and click the \'Blob\' button. Effect controls for the Blob will be found on the moving layer just like the splash effect.\n\n** Troubleshooting **\n\nI applied the Splash Effect, but I am not seeing any Splashes.\nPlease check that the Speed Threshold property is turned down low enough for the movement speed of the Control Layer.\n\nMy preview isn\u2019t updating when I change a Splash Property.\nWhen After Effects is under high loads it can start choosing to not render incremental changes. Try restarting After Effects and changing to a different seed. If this fails try Purging Disk Cache.\n\nI am trying to control the direction of the Smoke and Fire preset\nPlease use the Direction property located in the Splash effect under Generator / Manual Direction.",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6934260513178254,
    productSKU: "PPSP-SUL",
    scriptAuthor: "Plugin Play",
    scriptName: windowTitle,
    scriptURL: "https://aescripts.com/splash/",
    scriptVersion: versionNum.toString(),
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
    var licensingVersion = "3.0.48";
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
    var mx = __BLOB__BLOB_000540__;
    var wx = __BLOB__BLOB_000541__;
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
  var splashGatekeep = new a(af_settings);
  if (splashGatekeep.c()) {
    function getUserDataFolder() {
      var userDataFolder = Folder.userData;
      var aescriptsFolder = Folder(
        userDataFolder.toString() + "/Aescripts/PluginPlay",
      );
      if (!aescriptsFolder.exists) {
        var checkFolder = aescriptsFolder.create();
        if (!checkFolder) {
          alert(
            "Error creating " +
              checkFolder.fsName +
              "\nPlease check the permissions for this folder:\n" +
              userDataFolder +
              "\n\nA temp folder will be used instead",
          );
          aescriptsFolder = Folder.temp;
        }
      }
      return aescriptsFolder.toString();
    }
    function myScript_buildUI(thisObj) {
      function customDraw() {
        with (this) {
          graphics.drawOSControl();
          graphics.rectPath(0, 0, size[0], size[1]);
          graphics.fillPath(fillBrush);
        }
      }
      function changeColor(button, color) {
        button.fillBrush = button.graphics.newBrush(
          button.graphics.BrushType.SOLID_COLOR,
          color,
        );
        button.onDraw = customDraw;
        button.enabled = false;
        button.enabled = true;
      }
      function mouseoverImgOff(event) {
        try {
          myPanel.grp.splashPanel.groupOne.splashIcon.image = splashOffImg;
          event.target.notify("onDraw");
        } catch (e) {}
      }
      function mouseoverImgOn(event) {
        try {
          myPanel.grp.splashPanel.groupOne.splashIcon.image = splashOnImg;
          event.target.notify("onDraw");
        } catch (e) {}
      }
      var myPanel =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", windowTitle, undefined, { resizeable: true });
      res =
        "group{orientation:\'column\', alignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'top\'],spacing:5,\n                splashPanel: Panel{ orientation:\'column\',spacing:5,margins:[5,5,5,5],\n                    groupOne: Group{orientation:\'row\', alignment:[\'fill\',\'fill\'], alignChildren:[\'left\',\'fill\'],spacing: 5,\n                        splashIcon: Image{text:\'Splash\', alignment:[\'left\',\'center\'],preferredSize:[81,39]},\n                        helpButton: Button{text:\'?\', alignment:[\'left\',\'center\'],preferredSize:[30,39],spacing: 15},\n                        quantityStatic: StaticText{text:\'Quantity\',alignment:[\'right\',\'center\'],spacing:0},\n                        quantityEdit: EditText{text:3,preferredSize:[30,30], alignment:[\'fill\',\'center\'],spacing:0},\n                    },\n                    presetGroup: Group{orientation: \'row\', alignment:[\'fill\',\'top\'], alignChildren:[\'fill\',\'center\'], spacing: 0,\n                        updateButton: Button{text:\'\u21ba\', alignment:[\'left\',\'center\'],preferredSize:[27,20]},\n                        saveButton: Button{text:\'\u270e\',alignment:[\'left\',\'center\'],preferredSize:[27,20]},\n                        deleteButton: Button{text:\'X\',alignment:[\'left\',\'center\'],preferredSize:[27,20]},\n                        presetDropdown: DropDownList{properties:{items: [\'Presets\']}},\n                    },\n                },\n                blobPanel: Panel{ orientation:\'column\',spacing:5,margins:[5,5,5,5],\n                    blobTopGroup: Group{orientation:\'row\', alignment:[\'fill\',\'top\'],spacing:5,\n                        blobButton: Button{text:\'Blob\',alignment:[\'left\',\'center\'],preferredSize:[-1,20]},\n                        blobColorBox: IconButton{alignment:[\'fill\',\'center\'],preferredSize:[-1,20]},\n                    },\n                    blobInputGroup: Group{orientation:\'row\', alignment:[\'fill\',\'top\'],spacing:5,\n                        blobSizeGroup: Group{orientation:\'row\', alignment:[\'fill\',\'center\'],spacing:5,\n                            blobSizeStatic: StaticText{text:\'Size\',preferredSize:[-1,20],alignment:[\'left\',\'center\']},\n                            blobSizeEdit: EditText{text:50,alignment:[\'fill\',\'top\'],preferredSize:[20,20]},\n                        },\n                        blobStretchGroup: Group{orientation:\'row\', alignment:[\'fill\',\'center\'],spacing:5,\n                            blobStretchStatic: StaticText{text:\'Stretch\',alignment:[\'left\',\'center\']},\n                            blobStretchEdit: EditText{text:50, alignment:[\'fill\',\'center\']},\n                        },\n                    },\n                },\n            }";
      myPanel.grp = myPanel.add(res);
      myPanel.layout.layout(true);
      myPanel.grp.minimumSize = myPanel.grp.size;
      myPanel.layout.resize();
      myPanel.onResizing = myPanel.onResize = function () {
        this.layout.resize();
      };
      var presetDropdown = myPanel.grp.splashPanel.presetGroup.presetDropdown;
      presetDropdown.selection = 0;
      addBeginningPresets();
      populateDropDown(presetDropdown);
      var blobColorBox = myPanel.grp.blobPanel.blobTopGroup.blobColorBox;
      blobColorBox.fillBrush = blobColorBox.graphics.newBrush(
        blobColorBox.graphics.BrushType.SOLID_COLOR,
        blobColorArray,
      );
      blobColorBox.onDraw = customDraw;
      blobColorBox.onClick = function () {
        blobColorArray = colorPicker(blobColorArray);
        changeColor(blobColorBox, blobColorArray);
      };
      myPanel.grp.splashPanel.groupOne.splashIcon.image = splashOffImg;
      myPanel.grp.splashPanel.groupOne.splashIcon.addEventListener(
        "mouseout",
        mouseoverImgOff,
        false,
      );
      myPanel.grp.splashPanel.groupOne.splashIcon.addEventListener(
        "mouseover",
        mouseoverImgOn,
        false,
      );
      myPanel.grp.splashPanel.groupOne.splashIcon.addEventListener(
        "click",
        function () {
          createLayer(this.parent.parent);
        },
      );
      myPanel.grp.splashPanel.presetGroup.updateButton.onClick = function () {
        app.beginUndoGroup("Update Layers");
        updatePropValues(false, presetDropdown);
        app.endUndoGroup();
      };
      myPanel.grp.splashPanel.presetGroup.saveButton.onClick = function () {
        var mainComp = app.project.activeItem;
        if (!(mainComp instanceof CompItem)) {
          alert("Please Select a layer first.");
          return false;
        }
        var selectedLayer = mainComp.selectedLayers;
        if (selectedLayer.length != 1) {
          alert("Please, select one layer with Splash on it. Ty bby.");
          return false;
        }
        if (
          hasAESplashEffect(selectedLayer[0], splashPseudoMatchName) == false
        ) {
          alert(
            "Yo, your selected layer doesn\'t have the Splash effect on it. Choose a layer that already has Splash on it.",
          );
          return false;
        }
        var newPresetName = prompt(
          "Choose a name for your new preset",
          "Super Wet",
        );
        if (newPresetName != null) {
          var NewPresetArray = [];
          var positionSpreadVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0001").value;
          var ranPositionVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0002").value;
          var seedVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0003").value;
          var ranTimeOffsetVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0006").value;
          var ranThresholdVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0007").value;
          var ranAmplitudeVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0008").value;
          var ranVelocityVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0009").value;
          var ranDirectionRanVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0010").value;
          var timeOffsetVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0012").value;
          var speedThresholdVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0013").value;
          var amplitudeVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0014").value;
          var initialVelVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0015").value;
          var inheritedVelVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0016").value;
          var DirectionRanVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0017").value;
          var manualModeTog = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0019").value;
          var manualModeDir = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0020").value;
          var ranLifespanVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0025").value;
          var ranSizeVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0026").value;
          var lifspanVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0028").value;
          var sizeVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0029").value;
          var sizeRanVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0030").value;
          var birthColorVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0031")
            .value.toString()
            .split(",")
            .join("-");
          var deathColorVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0032")
            .value.toString()
            .split(",")
            .join("-");
          var ranGravityVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0036").value;
          var ranGravityAngleVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0037").value;
          var ranResistanceVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0038").value;
          var gravityVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0040").value;
          var gravityAngleVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0041").value;
          var resistanceVal = selectedLayer[0]
            .property("ADBE Effect Parade")
            .property(splashPseudoMatchName)
            .property(splashPseudoMatchName + "-0042").value;
          NewPresetArray.push(
            positionSpreadVal,
            ranPositionVal,
            seedVal,
            ranTimeOffsetVal,
            ranThresholdVal,
            ranAmplitudeVal,
            ranVelocityVal,
            ranDirectionRanVal,
            timeOffsetVal,
            speedThresholdVal,
            amplitudeVal,
            initialVelVal,
            inheritedVelVal,
            DirectionRanVal,
            manualModeTog,
            manualModeDir,
            ranLifespanVal,
            ranSizeVal,
            lifspanVal,
            sizeVal,
            sizeRanVal,
            birthColorVal,
            deathColorVal,
            ranGravityVal,
            ranGravityAngleVal,
            ranResistanceVal,
            gravityVal,
            gravityAngleVal,
            resistanceVal,
          );
          app.settings.saveSetting(
            "aeSplash",
            newPresetName,
            NewPresetArray.toString(),
          );
          if (
            app.settings.haveSetting("aeSplash", "fullUserPresetList") == false
          ) {
            app.settings.saveSetting(
              "aeSplash",
              "fullUserPresetList",
              newPresetName,
            );
            populateDropDown(presetDropdown);
            alert("Saved fullUserPresetList");
          } else if (
            app.settings
              .getSetting("aeSplash", "fullUserPresetList")
              .indexOf(newPresetName) != -1
          ) {
            alert("Preset exists, updating preset with new parameters");
            return false;
          } else {
            var presetListArray = app.settings
              .getSetting("aeSplash", "fullUserPresetList")
              .split(",");
            presetListArray === ""
              ? (presetListArray = [newPresetName])
              : presetListArray.push(newPresetName);
            app.settings.saveSetting(
              "aeSplash",
              "fullUserPresetList",
              presetListArray.toString(),
            );
            populateDropDown(presetDropdown);
            presetDropdown.selection = presetListArray.length;
          }
          app.preferences.saveToDisk();
          alert(app.settings.getSetting("aeSplash", "fullUserPresetList"));
        }
      };
      myPanel.grp.splashPanel.presetGroup.deleteButton.onClick = function () {
        if (presetDropdown.selection.index == 0) {
          alert("Please select a preset before atempting to delete it.");
          return false;
        } else {
          if (
            confirm("Are you sure that you would like to delete that preset?")
          ) {
            var presetArray = app.settings
              .getSetting("aeSplash", "fullUserPresetList")
              .split(",");
            var selectedPreset = presetDropdown.selection.index - 1;
            presetArray.splice(selectedPreset, 1);
            app.settings.saveSetting(
              "aeSplash",
              "fullUserPresetList",
              presetArray.toString(),
            );
            populateDropDown(presetDropdown);
            presetDropdown.selection = 0;
            app.preferences.saveToDisk();
          } else {
            return false;
          }
        }
      };
      myPanel.grp.blobPanel.blobTopGroup.blobButton.onClick = function () {
        createBlob(this.parent.parent);
      };
      myPanel.grp.splashPanel.groupOne.helpButton.onClick = function () {
        splashGatekeep.helpUI();
      };
      return myPanel;
    }
    function createLayer(event) {
      var maxTrialLimit = 5;
      var myPanel = event;
      var mainComp = app.project.activeItem;
      if (!(mainComp instanceof CompItem)) {
        alert("Please Select a layer first.");
        return false;
      }
      var selectedLayer = mainComp.selectedLayers;
      var quantity = parseInt(myPanel.groupOne.quantityEdit.text);
      if (selectedLayer.length != 1) {
        alert("Please select 1 layer to Apply Splash.");
        return false;
      }
      var controlLayerText = selectedLayer[0].name.toString();
      if (controlLayerText.indexOf("AE Splash Blob") != -1) {
        alert("Please select a Control Layer other than a Blob layer.");
        return false;
      }
      var compSize = function () {
        if (mainComp instanceof CompItem) {
          return [mainComp.width, mainComp.height];
        }
      };
      var existingSplashCount = 0;
      if (splashGatekeep.t()) {
        function countExistingSplash() {
          existingSplashCount = 0;
          for (var i = 1; i <= mainComp.numLayers; i += 1) {
            var layerName = mainComp.layer(i).name.toString();
            if (layerName.indexOf("Splash -") != -1) {
              existingSplashCount++;
            }
          }
          return existingSplashCount;
        }
        if (countExistingSplash() + quantity > maxTrialLimit) {
          quantity + existingSplashCount <= maxTrialLimit
            ? quantity
            : (quantity = Math.max(0, maxTrialLimit - existingSplashCount));
          alert(
            "The trial version of Splash is limited to a maximum of " +
              maxTrialLimit +
              " Splashes per Composition.\n\n" +
              quantity +
              " Splashes will be made due to your existing " +
              existingSplashCount +
              ". Please consider purchasing if you would like to use more!",
          );
        } else {
          if (existingSplashCount >= 5) {
            alert(
              "The trial version of Splash is limited to a maximum of " +
                maxTrialLimit +
                " Splashes per Composition.\n\nPlease consider purchasing if you would like to use more!",
            );
            return false;
          }
        }
      }
      app.beginUndoGroup("Create Layers");
      if (hasAESplashEffect(selectedLayer[0], splashPseudoMatchName) == false) {
        applyPseudo(0);
        var pseudoNameChange = (selectedLayer[0]
          .property("Effects")
          .property("").name = "Splash");
        updatePropValues(true, myPanel.presetGroup.presetDropdown);
      }
      for (var i = 0; i < quantity; i += 1) {
        function applyPartExp(property, partExpression, seeded, operatorVal) {
          if (seeded == "noSeed") {
            aeSplashLayer
              .property("ADBE Effect Parade")
              .property("ADBE Playgnd")
              .property(property).expression = partExpression;
          } else if (seeded == "seed") {
            var ranExpression = partExpression
              .split("partOperator")
              .join(operatorVal * 11);
            aeSplashLayer
              .property("ADBE Effect Parade")
              .property("ADBE Playgnd")
              .property(property).expression = ranExpression;
          } else {
            if (seeded == "pos") {
              distributePosition(selectedLayer[0], quantity, operatorVal);
              var ranExpression = partExpression
                .split("partOperator")
                .join(operatorVal * 11)
                .split("partAngle")
                .join(p[1])
                .split("partLength")
                .join(p[0]);
              aeSplashLayer
                .property("ADBE Effect Parade")
                .property("ADBE Playgnd")
                .property(property).expression = ranExpression;
            }
          }
        }
        var mult = 1.5;
        var aeSplashLayer = mainComp.layers.addShape();
        var splashLayerName = (aeSplashLayer.name =
          "Splash - " + selectedLayer[0].name);
        var shapeGroup = aeSplashLayer
          .property("Contents")
          .addProperty("ADBE Vector Group");
        var shapeName = (shapeGroup.name = "Splash");
        var shapePath = shapeGroup
          .property("Contents")
          .addProperty("ADBE Vector Shape - Rect");
        var shapeSetSize = shapePath
          .property("ADBE Vector Rect Size")
          .setValue(compSize() * mult);
        var shapeFill = shapeGroup
          .property("Contents")
          .addProperty("ADBE Vector Graphic - Fill");
        var shapeSetFill = shapeFill
          .property("ADBE Vector Fill Color")
          .setValue([1, 1, 1]);
        var labelChange = (aeSplashLayer.label = 3);
        var particlePlayground =
          aeSplashLayer.Effects.addProperty("ADBE Playgnd");
        var boxBlur = aeSplashLayer.Effects.addProperty("ADBE Box Blur2");
        var levels = aeSplashLayer.Effects.addProperty("ADBE Pro Levels2");
        var turbulentDisplace = aeSplashLayer.Effects.addProperty(
          "ADBE Turbulent Displace",
        );
        var shiftChannels = aeSplashLayer.Effects.addProperty(
          "ADBE Shift Channels",
        );
        var tint = aeSplashLayer.Effects.addProperty("ADBE Tint");
        var layerControl =
          aeSplashLayer.Effects.addProperty("ADBE Layer Control");
        var layerControlNameChange = (aeSplashLayer
          .property("Effects")
          .property("ADBE Layer Control").name = "Control Layer");
        var layerControlLayerChanger = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Layer Control")
          .property("ADBE Layer Control-0001")
          .setValue(selectedLayer[0].index);
        applyPartExp(
          "ADBE Playgnd-0101",
          particleExpressions.partPosition,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0103",
          particleExpressions.partPartSecond,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0105",
          particleExpressions.partDirection,
          "noSeed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0305",
          particleExpressions.directionCalc,
          "noSeed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0131",
          particleExpressions.partGridPos,
          "pos",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0106",
          particleExpressions.partDirectionRan,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0107",
          particleExpressions.partVelocity,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0110",
          particleExpressions.partPartRad,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0331",
          particleExpressions.partForce,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0333",
          particleExpressions.partForceDir,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0520",
          particleExpressions.partFricFeather,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0521",
          particleExpressions.partFricAge,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0570",
          particleExpressions.partOlderYoungTwo,
          "seed",
          i,
        );
        applyPartExp(
          "ADBE Playgnd-0571",
          particleExpressions.partAgeFeatherTwo,
          "seed",
          i,
        );
        var partSetPersMap = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0501")
          .setValue(1);
        var partVelRan = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0108")
          .setValue(50);
        var partSetFricMap = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0506")
          .setValue([5]);
        var partSetEpheMap = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0551")
          .setValue(1);
        var partSetScaleMap = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0552")
          .setValue([7]);
        var partsetRes = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0509")
          .setValue(0.11);
        var partScaleMax = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0555")
          .setValue(0);
        var partSetGreenMap = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0556")
          .setValue([3]);
        var partGreenMax = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Playgnd")
          .property("ADBE Playgnd-0559")
          .setValue(2);
        var blurRad = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Box Blur2")
          .property("ADBE Box Blur2-0001")
          .setValue(8);
        var lvlAlphaInputBlk = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Pro Levels2")
          .property("ADBE Pro Levels2-0032")
          .setValue(0.15);
        var lvlAlphaInputWht = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Pro Levels2")
          .property("ADBE Pro Levels2-0033")
          .setValue(0.15);
        var turbAmt = aeSplashLayer
          .property(
            "ADBE Effect Parade",
          )("ADBE Turbulent Displace")("ADBE Turbulent Displace-0002")
          .setValue(30);
        var turbAmt = aeSplashLayer
          .property(
            "ADBE Effect Parade",
          )("ADBE Turbulent Displace")("ADBE Turbulent Displace-0003")
          .setValue(15);
        var shftTakeRed = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Shift Channels")
          .property("ADBE Shift Channels-0002")
          .setValue(3);
        var shftTakeBlue = aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Shift Channels")
          .property("ADBE Shift Channels-0004")
          .setValue(3);
        var tintMapBlack = (aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Tint")
          .property("ADBE Tint-0001").expression = tintExpression.tintMapBlack);
        var tintMapWhite = (aeSplashLayer
          .property("ADBE Effect Parade")
          .property("ADBE Tint")
          .property("ADBE Tint-0002").expression = tintExpression.tintMapWhite);
        aeSplashLayer.moveAfter(selectedLayer[0]);
        var layerArray = [];
        for (var y = 1; y <= mainComp.numLayers; y += 1) {
          layerArray.push(mainComp.layer(y));
        }
        mainComp.layer(layerArray[selectedLayer[0].index - 1].name).selected =
          true;
        mainComp.layer(layerArray[selectedLayer[0].index].name).selected =
          false;
      }
      alert("Created " + quantity + " Splashes!");
      app.endUndoGroup();
    }
    function createBlob(blobTab) {
      app.beginUndoGroup("Create Blob");
      var mainComp = app.project.activeItem;
      if (!(mainComp instanceof CompItem)) {
        alert("Please Select a layer first.");
        return false;
      }
      var blobSelectedLayer = mainComp.selectedLayers;
      var compSize = function () {
        if (mainComp instanceof CompItem) {
          return [mainComp.width, mainComp.height];
        } else {
          alert("Please make sure that the composition is selected.");
        }
      };
      var selectedChecker = blobSelectedLayer.length == 1 ? true : false;
      var blobSizeVal = blobTab.blobInputGroup.blobSizeGroup.blobSizeEdit.text;
      var blobStretchVal =
        blobTab.blobInputGroup.blobStretchGroup.blobStretchEdit.text;
      var blobMult = 1.5;
      if (selectedChecker == false) {
        alert("Please select one layer to apply AE Blob to.");
        return false;
      } else {
        if (
          hasAESplashEffect(blobSelectedLayer[0], blobPseudoMatchName) == false
        ) {
          applyPseudo(1);
          var pseudoNameChange = (blobSelectedLayer[0]
            .property("Effects")
            .property("").name = "Blob");
        }
        var mult = 1.5;
        var aeBlobLayer = mainComp.layers.addShape();
        var splashLayerName = (aeBlobLayer.name =
          "Blob - " + blobSelectedLayer[0].name);
        var shapeGroup = aeBlobLayer
          .property("Contents")
          .addProperty("ADBE Vector Group");
        var shapeName = (shapeGroup.name = "Blob");
        var shapePath = shapeGroup
          .property("Contents")
          .addProperty("ADBE Vector Shape - Rect");
        var shapeSetSize = shapePath
          .property("ADBE Vector Rect Size")
          .setValue(compSize() * mult);
        var shapeFill = shapeGroup
          .property("Contents")
          .addProperty("ADBE Vector Graphic - Fill");
        var shapeSetFill = shapeFill
          .property("ADBE Vector Fill Color")
          .setValue([1, 1, 1]);
        var labelChange = (aeBlobLayer.label = 3);
        var blobLabel = (aeBlobLayer.label = 5);
      }
      var particlePlayground = aeBlobLayer.Effects.addProperty("ADBE Playgnd");
      var boxBlur = aeBlobLayer.Effects.addProperty("ADBE Box Blur2");
      var levels = aeBlobLayer.Effects.addProperty("ADBE Pro Levels2");
      var layerControl = aeBlobLayer.Effects.addProperty("ADBE Layer Control");
      var layerControlNameChange = (aeBlobLayer
        .property("Effects")
        .property("ADBE Layer Control").name = "Control Layer");
      var layerControlLayerChanger = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Layer Control")
        .property("ADBE Layer Control-0001")
        .setValue(blobSelectedLayer[0].index);
      var setBlobSize = blobSelectedLayer[0]
        .property("Effects")
        .property("Blob")
        .property("Blob Size")
        .setValue(blobSizeVal);
      var setBlobStretch = blobSelectedLayer[0]
        .property("Effects")
        .property("Blob")
        .property("Blob Stretch")
        .setValue(blobStretchVal);
      var setBlobColor = blobSelectedLayer[0]
        .property("Effects")
        .property("Blob")
        .property("Blob Color")
        .setValue(blobColorArray);
      var setPartPerSec = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0103")
        .setValue(500);
      var setPartDirRand = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0106")
        .setValue(0);
      var setPartVelocity = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0107")
        .setValue(0);
      var setPartVelocityRand = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0108")
        .setValue(0);
      var setPersMap = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0501")
        .setValue(aeBlobLayer.index);
      var setPersMapRedLayer = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0502")
        .setValue(21);
      var setPersMapRedMax = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0505")
        .setValue(0);
      var setUseLayerMap = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0551")
        .setValue(aeBlobLayer.index);
      var setMapRed = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0552")
        .setValue(7);
      var setMapRedMax = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0555")
        .setValue(0);
      var setBlurIterations = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Box Blur2")
        .property("ADBE Box Blur2-0002")
        .setValue(7);
      var setLvlsInBlk = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Pro Levels2")
        .property("ADBE Pro Levels2-0032")
        .setValue(0.34);
      var setLvlsInWht = aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Pro Levels2")
        .property("ADBE Pro Levels2-0033")
        .setValue(0.357156);
      var blobPartPositon = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0101").expression =
        blobExpressions.partPosition);
      var blobPartPositonCalc = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0131").expression =
        blobExpressions.partPositionCalc);
      var blobpartColor = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0104").expression = blobExpressions.partColor);
      var blobpartRadius = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0110").expression = blobExpressions.partRadius);
      var blobGravity = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0331").expression =
        blobExpressions.gravityForce);
      var blobGravityAngle = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0333").expression =
        blobExpressions.gravityAngle);
      var blobOThanYThanStretch = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0570").expression =
        blobExpressions.oThanYThanStretch);
      var blobAgeFeatherStretch = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0571").expression =
        blobExpressions.ageFeatherStretch);
      var blobPersOYThan = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Playgnd")
        .property("ADBE Playgnd-0520").expression =
        blobExpressions.persOThanYThan);
      var BlobBlurRadius = (aeBlobLayer
        .property("ADBE Effect Parade")
        .property("ADBE Box Blur2")
        .property("ADBE Box Blur2-0001").expression =
        blobExpressions.blurRadius);
      if (selectedChecker == true) {
        aeBlobLayer.moveBefore(blobSelectedLayer[0]);
        blobSelectedLayer[0].selected = true;
        aeBlobLayer.selected = false;
      }
      alert("Created a blob!");
      app.endUndoGroup();
    }
    function updatePropValues(creation, dropdown) {
      if (dropdown.selection.index == 0 && creation == false) {
        alert(
          "If you would like to update a Splash, please select a preset from the dropdown.",
        );
        return false;
      }
      if (dropdown.selection.index == 0) {
        return false;
      }
      var mainComp = app.project.activeItem;
      var selectedLayer = mainComp.selectedLayers;
      var selectedPreset = dropdown.selection.text;
      var presetArray = app.settings
        .getSetting("aeSplash", selectedPreset)
        .split(",");
      if (creation == false) {
        if (selectedLayer.length != 1) {
          alert("Please, select one layer with Splash on it. Ty bby.");
          return false;
        }
        if (
          hasAESplashEffect(selectedLayer[0], splashPseudoMatchName) == false
        ) {
          alert(
            "Yo, your selected layer doesn\'t have the Splash effect on it. Choose a layer that already has Splash on it.",
          );
          return false;
        }
      }
      var positionSpreadVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0001");
      var ranPositionVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0002");
      var seedVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0003");
      var ranTimeOffsetVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0006");
      var ranThresholdVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0007");
      var ranAmplitudeVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0008");
      var ranVelocityVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0009");
      var ranDirectionRanVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0010");
      var timeOffsetVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0012");
      var speedThresholdVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0013");
      var amplitudeVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0014");
      var initialVelVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0015");
      var inheritedVelVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0016");
      var DirectionRanVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0017");
      var manualModeTog = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0019");
      var manualModeDir = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0020");
      var ranLifespanVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0025");
      var ranSizeVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0026");
      var lifspanVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0028");
      var sizeVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0029");
      var sizeRanVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0030");
      var birthColorVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0031");
      var deathColorVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0032");
      var ranGravityVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0036");
      var ranGravityAngleVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0037");
      var ranResistanceVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0038");
      var gravityVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0040");
      var gravityAngleVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0041");
      var resistanceVal = selectedLayer[0]
        .property("ADBE Effect Parade")
        .property(splashPseudoMatchName)
        .property(splashPseudoMatchName + "-0042");
      var propPathArray = [
        positionSpreadVal,
        ranPositionVal,
        seedVal,
        ranTimeOffsetVal,
        ranThresholdVal,
        ranAmplitudeVal,
        ranVelocityVal,
        ranDirectionRanVal,
        timeOffsetVal,
        speedThresholdVal,
        amplitudeVal,
        initialVelVal,
        inheritedVelVal,
        DirectionRanVal,
        manualModeTog,
        manualModeDir,
        ranLifespanVal,
        ranSizeVal,
        lifspanVal,
        sizeVal,
        sizeRanVal,
        birthColorVal,
        deathColorVal,
        ranGravityVal,
        ranGravityAngleVal,
        ranResistanceVal,
        gravityVal,
        gravityAngleVal,
        resistanceVal,
      ];
      for (var s = 0; s <= propPathArray.length - 1; s += 1) {
        if (s <= 19) {
          propPathArray[s].setValue(presetArray[s].toString());
        } else if (s == 21 || s == 22) {
          propPathArray[s].setValue(presetArray[s].split("-"));
        } else {
          propPathArray[s].setValue(presetArray[s].toString());
        }
      }
      if (creation == false) {
        alert("Updated Layer with preset " + selectedPreset.toString());
      }
    }
    function applyPseudo(type) {
      function applyPseudoEffect(myPseudoEffect, effectsProp) {
        var userDataFolder = getUserDataFolder();
        var animationPreset = createResourceFile(
          myPseudoEffect.presetName + versionNum.toString(),
          myPseudoEffect.presetBinary,
          userDataFolder,
        );
        var masterLayer = effectsProp.parentProperty;
        var curentComp = masterLayer.containingComp;
        var tempSolid = curentComp.layers.addSolid(
          [0, 0, 0],
          "Temp Solid",
          10,
          10,
          1,
        );
        var tempSolidSource = tempSolid.source;
        var tempSolidFolder = tempSolidSource.parentFolder;
        tempSolid.applyPreset(File(animationPreset));
        myPseudoEffect.matchName = tempSolid
          .property("ADBE Effect Parade")
          .property(1).matchName;
        masterLayer.selected = true;
        effectsProp.addProperty(myPseudoEffect.matchName);
        tempSolidSource.remove();
        if (tempSolidFolder.numItems === 0) {
          tempSolidFolder.remove();
        }
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
            if (!isSecurityPrefSet()) {
              alert(
                'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure\n"Allow Scripts to Write Files and Access Network" is checked.',
              );
              app.executeCommand(2359);
              if (!isSecurityPrefSet()) {
                return null;
              }
            }
            myFile.encoding = "BINARY";
            myFile.open("w");
            myFile.write(binaryString);
            myFile.close();
          }
          return myFile;
        } catch (err) {
          alert("Error in createResourceFile function\n" + err.toString());
        }
        alert("wrote binary string");
      }
      function isSecurityPrefSet() {
        try {
          var securitySetting = app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          );
          return securitySetting == 1;
        } catch (err) {
          alert("Error in isSecurityPrefSet function\n" + err.toString());
        }
      }
      if (type == 0) {
        var myPseudoEffect = {
          matchName: splashPseudoMatchName,
          presetBinary: __BLOB__BLOB_000542__,
          presetName: "Splash",
        };
      }
      if (type == 1) {
        var myPseudoEffect = {
          matchName: blobPseudoMatchName,
          presetBinary: __BLOB__BLOB_000543__,
          presetName: "Blob",
        };
      }
      var myComp = app.project.activeItem;
      var myLayer = myComp.selectedLayers[0];
      var effectsProp = myLayer.property("ADBE Effect Parade");
      if (effectsProp.canAddProperty(myPseudoEffect.matchName)) {
        applyPseudoEffect(myPseudoEffect, effectsProp);
      } else {
        applyPseudoEffect(myPseudoEffect, effectsProp);
      }
    }
    function distributePosition(mainLayer, numOf, operator) {
      var selectedSize = mainLayer.sourceRectAtTime(0, true);
      var inputBoxText = numOf;
      var sizeL = selectedSize.width;
      var sizeH = selectedSize.height;
      var sizeSmaller =
        sizeH <= sizeL ? [sizeH / 2, sizeL / 2] : [sizeH / 2, sizeL / 2];
      var percentDone = operator / inputBoxText;
      if (percentDone < 0.25) {
        adjustedLength = lerp(
          sizeSmaller[0],
          sizeSmaller[1],
          percentDone / 0.25,
        );
      } else if (percentDone >= 0.25 && percentDone < 0.5) {
        adjustedLength = lerp(
          sizeSmaller[1],
          sizeSmaller[0],
          (percentDone - 0.25) / 0.25,
        );
      } else if (percentDone >= 0.5 && percentDone < 0.75) {
        adjustedLength = lerp(
          sizeSmaller[0],
          sizeSmaller[1],
          (percentDone - 0.5) / 0.25,
        );
      } else {
        if (percentDone >= 0.75 && percentDone <= 1) {
          adjustedLength = lerp(
            sizeSmaller[1],
            sizeSmaller[0],
            (percentDone - 0.75) / 0.25,
          );
        }
      }
      var rot = (360 / inputBoxText) * operator;
      return (p = [adjustedLength, rot]);
    }
    function randomNum(seedTxt, intensity, operator) {
      var seedNum = parseInt(seedTxt);
      var seed = (operator + 55) * seedNum;
      var x = Math.sin(seed++) * 10000;
      var intense = parseInt(intensity) * 0.01;
      return (x - Math.floor(x)) * intense * isEven(operator + seedNum) + 1;
    }
    function lerp(v0, v1, t) {
      return v0 * (1 - t) + v1 * t;
    }
    function populateDropDown(dd) {
      if (app.settings.haveSetting("aeSplash", "fullUserPresetList") == true) {
        dd.removeAll();
        if (app.settings.getSetting("aeSplash", "fullUserPresetList") === "") {
          presetArray = ["Presets"];
          dd.add("item", presetArray);
        } else {
          var originalPresetArray = app.settings
            .getSetting("aeSplash", "fullUserPresetList")
            .split(",");
          var presetArray = ["Presets"].concat(originalPresetArray);
          for (var w = 0; w < presetArray.length; w += 1) {
            dd.add("item", presetArray[w]);
          }
        }
      }
      dd.selection = 0;
    }
    function hasAESplashEffect(targetLayer, pseudo) {
      var hasEffect = false;
      for (
        var l = 1;
        l <= targetLayer.property("Effects").numProperties;
        l += 1
      ) {
        if (targetLayer.property("Effects").property(l).matchName == pseudo) {
          hasEffect = true;
          break;
        }
      }
      return hasEffect;
    }
    function addBeginningPresets() {
      if (
        app.settings.haveSetting("aeSplash", "beginningPresetIndicator") ==
        false
      ) {
        app.settings.saveSetting(
          "aeSplash",
          "beginningPresetIndicator",
          "true",
        );
        var beginningPresets = [
          [
            "Smoke",
            "30,20,11,0,0,0,0,0,0,0,40,250,10,20,1,0,50,15,1.7,42,80,0.80194544792175-0.80194544792175-0.80194544792175-1,0.90272670984268-0.90272670984268-0.90272670984268-1,0,0,0,0,-90,250",
          ],
          [
            "Fire",
            "10,20,11,0,0,0,0,0,0,0,60,250,30,20,1,0,50,15,0.75,35,80,1-0.47499999403954-0-1,1-0-0-1,0,0,0,0,-90,200",
          ],
          [
            "Flicky Liquid",
            "30,20,11,30,0,0,0,0,0,100,40,50,80,0,0,0,20,20,1.3,25,40,0-0.28235295414925-1-1,0-0.28235295414925-1-1,0,0,15,0,-90,90",
          ],
          [
            "Write On",
            "30,20,1,30,0,0,0,0,80,100,40,50,80,15,0,0,20,20,1,33,40,0-0.28235295414925-1-1,0-0.28235295414925-1-1,0,0,15,0,-90,90",
          ],
          [
            "Bubbles",
            "30,20,1,30,0,15,15,0,-30,70,25,70,80,0,0,0,20,20,1.5,27,40,0-0.28235295414925-1-1,0-0.28235295414925-1-1,0,0,15,100,90,160",
          ],
          [
            "Short and Thin",
            "30,20,3,30,0,15,15,0,-30,70,50,35,90,0,0,0,20,20,1,18,40,0-0.28235295414925-1-1,0-0.28235295414925-1-1,0,0,15,0,90,120",
          ],
        ];
        var begPresetNames = function () {
          var names = [];
          for (var p = 0; p <= beginningPresets.length - 1; p += 1) {
            names.push(beginningPresets[p][0]);
          }
          return names.toString();
        };
        if (
          app.settings.haveSetting("aeSplash", "fullUserPresetList") == false
        ) {
          app.settings.saveSetting(
            "aeSplash",
            "fullUserPresetList",
            begPresetNames(),
          );
        } else {
          var presetListArray = app.settings.getSetting(
            "aeSplash",
            "fullUserPresetList",
          );
          presetListArray === ""
            ? presetListArray.concat(begPresetNames())
            : presetListArray.split(",").unshift(begPresetNames().split(","));
          app.settings.saveSetting(
            "aeSplash",
            "fullUserPresetList",
            presetListArray.toString(),
          );
        }
        for (var p = 0; p <= beginningPresets.length - 1; p += 1) {
          app.settings.saveSetting(
            "aeSplash",
            beginningPresets[p][0],
            beginningPresets[p][1],
          );
        }
        app.preferences.saveToDisk();
      }
      return false;
    }
    function isEven(value) {
      if (value % 2 == 0) {
        return 1;
      } else {
        return -1;
      }
    }
    var p = [0, 0];
    var blobColorArray = [0.08, 0.13, 1];
    var splashImageBin = {
      off: __BLOB__BLOB_000544__,
      on: __BLOB__BLOB_000545__,
    };
    var userDataFolder = getUserDataFolder();
    var splashOnImg = new File(userDataFolder + "/splashImageOn.png");
    splashOnImg.encoding = "BINARY";
    splashOnImg.open("w");
    splashOnImg.write(splashImageBin.on);
    splashOnImg.close();
    var splashOffImg = new File(userDataFolder + "/splashImageOff.png");
    splashOffImg.encoding = "BINARY";
    splashOffImg.open("w");
    splashOffImg.write(splashImageBin.off);
    splashOffImg.close();
    var particleExpressions = {
      directionCalc:
        'driverPos =  thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0131");\r\nv = driverPos.velocity;\r\ntoDeg = radiansToDegrees(Math.atan2(v[1],v[0]));\r\ntoDeg+90;',
      partAgeFeatherTwo:
        'thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0570")*2;',
      partDirection:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ntimeOff = cntrlLayer.effect("Splash")("Time Offset")*-.001;\r\nspd = thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0131").speed\r\nrot = thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0305");\r\ncheck = cntrlLayer.effect("Splash")("Manual Mode");\r\nangle = cntrlLayer.effect("Splash")("Direction");\r\ncalc = rot.valueAtTime(time - (spd/80000)-timeOff);\r\ncheck == 0 ? calc:angle;',
      partDirectionRan:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Direction Randomness Ran")*-.01,cntrlLayer.effect("Splash")("Direction Randomness Ran")*.01)+1\r\ndRan = cntrlLayer.effect("Splash")("Direction Randomness")*ran;\r\ndRan*ran;',
      partForce:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Gravity Ran")*-.01,cntrlLayer.effect("Splash")("Gravity Ran")*.01)+1;\r\ncntrlLayer.effect("Splash")("Gravity")*10*ran;',
      partForceDir:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Gravity Angle Ran")*-.01,cntrlLayer.effect("Splash")("Gravity Angle Ran")*.01)+1;\r\ncntrlLayer.effect("Splash")("Gravity Angle")*ran;',
      partFricAge:
        'thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0520")*2',
      partFricFeather:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nres = cntrlLayer.effect("Splash")("Resistance");\r\n100/(res+1);',
      partFricMax:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Resistance Ran")*-.01,cntrlLayer.effect("Splash")("Resistance Ran")*.01)+1;\r\nres = cntrlLayer.effect("Splash")("Resistance")*.0005*ran;',
      partGridPos:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Position Random")*-.01,cntrlLayer.effect("Splash")("Position Random")*.01)+1\r\npLength = partLength*ran*cntrlLayer.effect("Splash")("Position Spread")*.01;\r\npAngle = partAngle*ran;\r\nvar largerScale = cntrlLayer.transform.scale[0] <= cntrlLayer.transform.scale[1] ? cntrlLayer.transform.scale[0] : cntrlLayer.transform.scale[1];\r\nhyp = (largerScale)*(pLength/100);\r\ntheta = degreesToRadians(cntrlLayer.transform.rotation+pAngle);\r\nvar anchorPos = cntrlLayer.toWorld(cntrlLayer.anchorPoint)\r\nh=Math.sin(theta);\r\nv=-Math.cos(theta);\r\n([h,v]*hyp)+anchorPos;',
      partOlderYoungTwo:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Lifespan Ran")*-.01,cntrlLayer.effect("Splash")("Lifespan Ran")*.01)+1;\r\nlife = cntrlLayer.effect("Splash")("Lifespan")*ran*.5;',
      partPartRad:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Size Ran")*-.01,cntrlLayer.effect("Splash")("Size Ran")*.01)+1\r\nsizeStandard = cntrlLayer.effect("Splash")("Size")/4;\r\nvary = (noise(time*Math.PI*11)*cntrlLayer.effect("Splash")("Size Randomness")*.01)+1;\r\nthreshCheck = (cntrlLayer.effect("Splash")("Speed Threshold")+cntrlLayer.effect("Splash")("Speed Threshold Ran"))*.005;\r\nsizeStandard*ran*vary+threshCheck;',
      partPartSecond:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nranAmp = random(cntrlLayer.effect("Splash")("Amplitude Ran")*-.01,cntrlLayer.effect("Splash")("Amplitude Ran")*.01)+1\r\nranThresh = random(cntrlLayer.effect("Splash")("Speed Threshold Ran")*-.01,cntrlLayer.effect("Splash")("Speed Threshold Ran")*.01)+1\r\nspd = thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0131").speed;\r\nthresh = cntrlLayer.effect("Splash")("Speed Threshold")*8*ranThresh;\r\namp = cntrlLayer.effect("Splash")("Amplitude");\r\nvary = (noise(time*Math.PI*(partOperator2+3))*.5)+1;\r\nthreshCheck = (cntrlLayer.effect("Splash")("Speed Threshold")+cntrlLayer.effect("Splash")("Speed Threshold Ran"))*.003;\r\nsecondsToFrames = 1/(1/thisComp.frameDuration);\r\nif(Math.abs(effect("ADBE Playgnd")("ADBE Playgnd-0105").valueAtTime(time+secondsToFrames)-effect("ADBE Playgnd")("ADBE Playgnd-0105").valueAtTime(time)) < 100){\r\noutput = spd >= thresh ? ((spd*amp*.0006)+amp)*vary*ranAmp*Math.floor(vary+.3)+threshCheck : 0;}else{0};',
      partPosition:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true);\r\nran = random(cntrlLayer.effect("Splash")("Time Offset Ran")*-.01,cntrlLayer.effect("Splash")("Time Offset Ran")*.01)+1\r\ntimeOffset = cntrlLayer.effect("Splash")("Time Offset")*-.001*ran;\r\npos = thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0131");\r\npos.valueAtTime(time - (pos.speed/90000) - timeOffset);',
      partVelocity:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\nseedRandom(partOperator+cntrlLayer.effect("Splash")("Seed"),true)\r\nran = random(cntrlLayer.effect("Splash")("Velocity Ran")*-.01,cntrlLayer.effect("Splash")("Velocity Ran")*.01)+1\r\nspd = thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0131").speed;\r\nvel = cntrlLayer.effect("Splash")("Initial Velocity")*4;\r\ninVel = cntrlLayer.effect("Splash")("Inherited Velocity")*.002;\r\n((spd*inVel)+vel)*ran;',
    };
    var blobExpressions = {
      ageFeatherStretch:
        'var stretchSlider = effect("ADBE Layer Control")("ADBE Layer Control-0001").effect("Blob")("Blob Stretch");\r\nstretchSlider/800+(stretchSlider/1000);',
      blurRadius:
        'effect("ADBE Layer Control")("ADBE Layer Control-0001").effect("Blob")("Blob Size")/6',
      gravityAngle:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ncntrlLayer.effect("Blob")("Gravity Angle")',
      gravityForce:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ncntrlLayer.effect("Blob")("Gravity")*10;',
      oThanYThanStretch:
        'effect("ADBE Layer Control")("ADBE Layer Control-0001").effect("Blob")("Blob Stretch")/800;',
      partColor:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ncntrlLayer.effect("Blob")("Blob Color")',
      partPosition:
        'delay = 90000;\r\nspd = thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0131").speed;\r\npos = thisLayer("ADBE Effect Parade")("ADBE Playgnd")("ADBE Playgnd-0131");\r\npos.valueAtTime(time - (spd/delay));',
      partPositionCalc:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ntoWorld(cntrlLayer.position)-([thisComp.width,thisComp.height]/2);',
      partRadius:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ncntrlLayer.effect("Blob")("Blob Size")/2',
      persOThanYThan:
        'var stretchSlider = effect("ADBE Layer Control")("ADBE Layer Control-0001").effect("Blob")("Blob Stretch");\r\nstretchSlider/800+(stretchSlider/1000);',
    };
    var tintExpression = {
      tintMapBlack:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ncntrlLayer.effect("Splash")("Birth Color");',
      tintMapWhite:
        'cntrlLayer = effect("ADBE Layer Control")("ADBE Layer Control-0001");\r\ncntrlLayer.effect("Splash")("Death Color");',
    };
    var myScriptPal = myScript_buildUI(thisObj);
    if (myScriptPal != null && myScriptPal instanceof Window) {
      myScriptPal.center();
      myScriptPal.show();
    }
    (function () {
      function colorPicker(inputColour, options) {
        if (!(this instanceof colorPicker)) {
          return new colorPicker(inputColour, options);
        }
        this.options = {
          backupLocation: [],
          name: "Adobe Color Picker ",
          shouldUpdateCursor: false,
          version: "v2.0",
          windowType: "dialog",
        };
        if (options && colorPicker.isType(options, "Object")) {
          for (var i in options) {
            this.options[i] = options[i];
          }
        }
        this.inputColour = colorPicker.parseColor(inputColour);
        this.outputColour = this.inputColour.slice(0);
        this.initSetting();
        return this.showColorPicker();
      }
      colorPicker.parseColor = function (inputValue) {
        if (!inputValue) {
          return [1, 1, 1];
        }
        if (colorPicker.isRgb(inputValue)) {
          return colorPicker.parseRgb(inputValue);
        } else if (colorPicker.isLargeRgb(inputValue)) {
          return colorPicker.parseLargeRgb(inputValue);
        } else if (colorPicker.isHex(inputValue)) {
          return colorPicker.parseHex(inputValue);
        } else if (colorPicker.isShortHex(inputValue)) {
          return colorPicker.parseShortHex(inputValue);
        } else if (colorPicker.isHsb(inputValue)) {
          return colorPicker.parseHsb(inputValue);
        } else {
          return [1, 1, 1];
        }
      };
      colorPicker.prototype.showColorPicker = function () {
        var win = this.initWindow();
        if (win.type == "dialog" || win.type == "palette") {
          if (this.haveSetting("location")) {
            win.location = this.getSetting("location").split(",");
            if (win.location.length != 2) {
              win.center();
            } else {
              if (win.location[0] < 0 || win.location[1] < 0) {
                win.center();
              }
            }
          }
          win.show();
          this.saveSetting("location", win.location);
        } else {
          if (win.type == "panel") {
            win.layout.layout(true);
          }
        }
        if (!this.isSmallMode) {
          this.outputColour.hex = colorPicker.RgbToHex(this.outputColour);
          this.outputColour.hsb = colorPicker.RgbToHsb(this.outputColour);
          this.outputColour.rgb = this.outputColour.slice(0);
          return this.outputColour;
        } else {
          return { colorPicker: this, window: win };
        }
      };
      colorPicker.prototype.initWindow = function () {
        var _this = this;
        var type = this.options.windowType;
        if (type == "palette") {
          var win = new Window(
            "palette",
            this.options.name + this.options.version,
            undefined,
            { maximizeButton: false, minimizeButton: false },
          );
          this.size = this.options.size = 90;
        } else if (type instanceof Panel) {
          var win = type;
          this.size = this.options.size = 90;
        } else {
          var win = new Window(
            "dialog",
            this.options.name + this.options.version,
            undefined,
            {
              closeButton: false,
              maximizeButton: false,
              minimizeButton: false,
            },
          );
          this.size = this.options.size = 130;
        }
        var isSmallMode = (this.isSmallMode = this.size != 130);
        var targetImage = isSmallMode ? this.options.smallColorWheel : this.img;
        var targetSize = this.size * 2;
        var colourGroup = win.add("group");
        colourGroup.orientation = "stack";
        win.image = colourGroup.add("image", undefined, targetImage);
        var colourCursorGroup = (this.colourCursorGroup = colourGroup.add(
          "customBoundedValue",
          [0, 0, targetSize + 2, targetSize + 2],
        ));
        colourCursorGroup.fillColour = [0, 0, 0, 0];
        var colourSelectCursor =
          (this.colourSelectCursor =
          colourCursorGroup.colourSelectCursor =
            {});
        colourSelectCursor.size = [12, 12];
        colourSelectCursor.strokeWidth = 1;
        colourSelectCursor.strokeColour = [0, 0, 0];
        this.setCursorLocation(this.inputColour);
        colourCursorGroup.onDraw = function () {
          this.graphics.drawOSControl();
          this.graphics.newPath();
          this.graphics.ellipsePath(0, 0, this.size[0], this.size[1]);
          this.graphics.fillPath(
            colourCursorGroup.graphics.newBrush(
              colourCursorGroup.graphics.BrushType.SOLID_COLOR,
              colourCursorGroup.fillColour,
            ),
          );
          this.graphics.newPath();
          this.graphics.ellipsePath(
            this.colourSelectCursor.location[0] +
              this.colourSelectCursor.strokeWidth / 2 +
              1,
            this.colourSelectCursor.location[1] +
              this.colourSelectCursor.strokeWidth / 2 +
              1,
            this.colourSelectCursor.size[0] -
              this.colourSelectCursor.strokeWidth,
            this.colourSelectCursor.size[1] -
              this.colourSelectCursor.strokeWidth,
          );
          this.graphics.strokePath(
            this.graphics.newPen(
              this.graphics.PenType.SOLID_COLOR,
              this.colourSelectCursor.strokeColour,
              this.colourSelectCursor.strokeWidth,
            ),
          );
        };
        win.brightGroup = win.add("group");
        win.staticBright = win.brightGroup.add(
          "statictext",
          undefined,
          "Bright:",
        );
        win.editBright = win.brightGroup.add(
          "edittext{text:\'0\',characters:3,justify:\'center\',active:1}",
        );
        win.slider = win.brightGroup.add("slider", undefined, 100, 0, 100);
        if (!isSmallMode) {
          win.slider.size = "width:160,height:20";
          var spacing = 10;
          var character = 4;
        } else {
          win.slider.size = "width:100,height:20";
          win.brightGroup.spacing = 2;
          win.spacing = 5;
          win.margins = 2;
          var spacing = 0;
          var character = 3;
        }
        var editor = win.add("group");
        editor.orientation = "column";
        editor.gulu = editor.add("group");
        editor.gulu.uni = editor.gulu.add("group");
        editor.gulu.uni.spacing = spacing;
        editor.gulu.uni.Ed = editor.gulu.uni.add("statictext", undefined, "#");
        editor.gulu.uni.unicode = editor.gulu.uni.add(
          "edittext",
          undefined,
          "FF0000",
        );
        editor.gulu.uni.unicode.characters = 6;
        editor.gulu.uni.unicode.justify = "center";
        editor.gulu.color = editor.gulu.add(
          "customBoundedValue",
          undefined,
          "Redraw original image",
        );
        editor.gulu.color.size = [80, 25];
        editor.colorHolder = editor.add("group");
        editor.colorHolder.orientation = "row";
        editor.colorHolder.colorCol1 = editor.colorHolder.add("group");
        editor.colorHolder.colorCol1.orientation = "column";
        editor.colorHolder.colorCol1.hGroup =
          editor.colorHolder.colorCol1.add("group");
        editor.colorHolder.colorCol1.hGroup.spacing = spacing;
        editor.colorHolder.colorCol1.hGroup.hRad =
          editor.colorHolder.colorCol1.hGroup.add(
            "statictext",
            undefined,
            "H:",
          );
        editor.colorHolder.colorCol1.hGroup.hValue =
          editor.colorHolder.colorCol1.hGroup.add("edittext", undefined, "0");
        editor.colorHolder.colorCol1.hGroup.hValue.characters = character;
        editor.colorHolder.colorCol1.hGroup.hValue.justify = "center";
        editor.colorHolder.colorCol1.hGroup.hValue._index = 0;
        editor.colorHolder.colorCol1.rGroup =
          editor.colorHolder.colorCol1.add("group");
        editor.colorHolder.colorCol1.rGroup.spacing = spacing;
        editor.colorHolder.colorCol1.rGroup.rRad =
          editor.colorHolder.colorCol1.rGroup.add(
            "statictext",
            undefined,
            "R:",
          );
        editor.colorHolder.colorCol1.rGroup.rValue =
          editor.colorHolder.colorCol1.rGroup.add("edittext", undefined, "0");
        editor.colorHolder.colorCol1.rGroup.rValue.characters = character;
        editor.colorHolder.colorCol1.rGroup.rValue.justify = "center";
        editor.colorHolder.colorCol1.rGroup.rValue._index = 0;
        editor.colorHolder.colorCol2 = editor.colorHolder.add("group");
        editor.colorHolder.colorCol2.orientation = "column";
        editor.colorHolder.colorCol2.sGroup =
          editor.colorHolder.colorCol2.add("group");
        editor.colorHolder.colorCol2.sGroup.spacing = spacing;
        editor.colorHolder.colorCol2.sGroup.sRad =
          editor.colorHolder.colorCol2.sGroup.add(
            "statictext",
            undefined,
            "S:",
          );
        editor.colorHolder.colorCol2.sGroup.sValue =
          editor.colorHolder.colorCol2.sGroup.add("edittext", undefined, "0");
        editor.colorHolder.colorCol2.sGroup.sValue.characters = character;
        editor.colorHolder.colorCol2.sGroup.sValue.justify = "center";
        editor.colorHolder.colorCol2.sGroup.sValue._index = 1;
        editor.colorHolder.colorCol2.gGroup =
          editor.colorHolder.colorCol2.add("group");
        editor.colorHolder.colorCol2.gGroup.spacing = spacing;
        editor.colorHolder.colorCol2.gGroup.gRad =
          editor.colorHolder.colorCol2.gGroup.add(
            "statictext",
            undefined,
            "G:",
          );
        editor.colorHolder.colorCol2.gGroup.gValue =
          editor.colorHolder.colorCol2.gGroup.add("edittext", undefined, "0");
        editor.colorHolder.colorCol2.gGroup.gValue.characters = character;
        editor.colorHolder.colorCol2.gGroup.gValue.justify = "center";
        editor.colorHolder.colorCol2.gGroup.gValue._index = 1;
        editor.colorHolder.colorCol3 = editor.colorHolder.add("group");
        editor.colorHolder.colorCol3.orientation = "column";
        editor.colorHolder.colorCol3.lGroup =
          editor.colorHolder.colorCol3.add("group");
        editor.colorHolder.colorCol3.lGroup.spacing = spacing;
        editor.colorHolder.colorCol3.lGroup.lRad =
          editor.colorHolder.colorCol3.lGroup.add(
            "statictext",
            undefined,
            "B:",
          );
        editor.colorHolder.colorCol3.lGroup.lValue =
          editor.colorHolder.colorCol3.lGroup.add("edittext", undefined, "0");
        editor.colorHolder.colorCol3.lGroup.lValue.characters = character;
        editor.colorHolder.colorCol3.lGroup.lValue.justify = "center";
        editor.colorHolder.colorCol3.lGroup.lValue._index = 2;
        editor.colorHolder.colorCol3.bGroup =
          editor.colorHolder.colorCol3.add("group");
        editor.colorHolder.colorCol3.bGroup.spacing = spacing;
        editor.colorHolder.colorCol3.bGroup.bRad =
          editor.colorHolder.colorCol3.bGroup.add(
            "statictext",
            undefined,
            "B:",
          );
        editor.colorHolder.colorCol3.bGroup.bValue =
          editor.colorHolder.colorCol3.bGroup.add("edittext", undefined, "0");
        editor.colorHolder.colorCol3.bGroup.bValue.characters = character;
        editor.colorHolder.colorCol3.bGroup.bValue.justify = "center";
        editor.colorHolder.colorCol3.bGroup.bValue._index = 2;
        win.editor = editor;
        if (win.type == "dialog") {
          editor.oc = win.editor.oc = win.add(
            "Group{ok:Button{text:\'Ok\'},can:Button{text:\'Cancel\'}}",
          );
          editor.oc.ok.onClick = function () {
            win.close();
          };
          editor.oc.can.onClick = function () {
            colorPicker.copyArr(_this.outputColour, _this.inputColour);
            win.close();
          };
        }
        editor.gulu.color.onDraw = function (draw) {
          var targetColour = _this.outputColour;
          var gfxs = this.graphics;
          gfxs.newPath();
          gfxs.rectPath(0, 0, this.size[0], this.size[1]);
          gfxs.fillPath(
            gfxs.newBrush(gfxs.BrushType.SOLID_COLOR, targetColour),
          );
        };
        this.updateCursor(win);
        this.setDefaultValue(win);
        this.bindingKeydown(win);
        this.bindingHandler(win);
        return win;
      };
      colorPicker.prototype.setDefaultValue = function (win) {
        var pi = win.editor;
        var startColour = this.outputColour;
        pi.gulu.uni.unicode.text = colorPicker.RgbToHex(startColour);
        pi.gulu.uni.unicode.active = true;
        pi.colorHolder.colorCol1.rGroup.rValue.text = Math.round(
          startColour[0] * 255,
        );
        pi.colorHolder.colorCol2.gGroup.gValue.text = Math.round(
          startColour[1] * 255,
        );
        pi.colorHolder.colorCol3.bGroup.bValue.text = Math.round(
          startColour[2] * 255,
        );
        var hsbHere = colorPicker.RgbToHsb([
          startColour[0] * 255,
          startColour[1] * 255,
          startColour[2] * 255,
        ]);
        pi.colorHolder.colorCol1.hGroup.hValue.text = hsbHere[0];
        pi.colorHolder.colorCol2.sGroup.sValue.text = hsbHere[1];
        pi.colorHolder.colorCol3.lGroup.lValue.text = hsbHere[2];
        win.slider.value = hsbHere[2];
        win.editBright.text = hsbHere[2];
        this.colourCursorGroup.fillColour[3] = 1 - hsbHere[2] / 100;
        this.colourCursorGroup.notify("onDraw");
      };
      colorPicker.prototype.bindingHandler = function (win) {
        var _this = this;
        win.editor.colorHolder.colorCol1.hGroup.hValue.onChange =
          win.editor.colorHolder.colorCol2.sGroup.sValue.onChange =
          win.editor.colorHolder.colorCol3.lGroup.lValue.onChange =
            function () {
              _this.options.backupLocation.length = 0;
              this.text = Math.round(this.text);
              if (this._index == 0) {
                if (
                  this.text < 0 ||
                  this.text > 360 ||
                  isNaN(this.text) == true
                ) {
                  this.text = colorPicker.RgbToHsb([
                    _this.outputColour[0] * 255,
                    _this.outputColour[1] * 255,
                    _this.outputColour[2] * 255,
                  ])[this._index];
                }
              } else {
                if (
                  this.text < 0 ||
                  this.text > 100 ||
                  isNaN(this.text) == true
                ) {
                  this.text = colorPicker.RgbToHsb([
                    _this.outputColour[0] * 255,
                    _this.outputColour[1] * 255,
                    _this.outputColour[2] * 255,
                  ])[this._index];
                }
              }
              var hsbArr = [
                Math.round(win.editor.colorHolder.colorCol1.hGroup.hValue.text),
                Math.round(win.editor.colorHolder.colorCol2.sGroup.sValue.text),
                Math.round(win.editor.colorHolder.colorCol3.lGroup.lValue.text),
              ];
              var rgbArr = colorPicker.HsbToRgb(hsbArr);
              var hexStr = colorPicker.RgbToHex([
                rgbArr[0] / 255,
                rgbArr[1] / 255,
                rgbArr[2] / 255,
              ]);
              win.editor.gulu.uni.unicode.text = hexStr;
              win.editor.gulu.uni.unicode.notify("onChange");
            };
        win.editor.colorHolder.colorCol1.rGroup.rValue.onChange =
          win.editor.colorHolder.colorCol2.gGroup.gValue.onChange =
          win.editor.colorHolder.colorCol3.bGroup.bValue.onChange =
            function () {
              _this.options.backupLocation.length = 0;
              this.text = Math.round(this.text);
              if (
                this.text < 0 ||
                this.text > 255 ||
                isNaN(this.text) == true
              ) {
                this.text = Math.round(_this.outputColour[this._index] * 255);
              }
              if (this._index == 0) {
                win.editor.gulu.uni.unicode.text = colorPicker.RgbToHex([
                  this.text / 255,
                  _this.outputColour[1],
                  _this.outputColour[2],
                ]);
              } else if (this._index == 1) {
                win.editor.gulu.uni.unicode.text = colorPicker.RgbToHex([
                  _this.outputColour[0],
                  this.text / 255,
                  _this.outputColour[2],
                ]);
              } else {
                if (this._index == 2) {
                  win.editor.gulu.uni.unicode.text = colorPicker.RgbToHex([
                    _this.outputColour[0],
                    _this.outputColour[1],
                    this.text / 255,
                  ]);
                }
              }
              win.editor.gulu.uni.unicode.notify("onChange");
            };
        win.editBright.onChange = win.editBright.onChanging = function () {
          _this.options.backupLocation.length = 0;
          if (this.text < 0) {
            this.text = 0;
          }
          if (this.text > 100) {
            this.text = 100;
          }
          if (isNaN(this.text) == true) {
            this.text = 100;
          }
          win.slider.value = parseInt(this.text);
          if (isNaN(win.slider.value)) {
            return;
          }
          win.slider.notify("onChange");
        };
        win.slider.onChange = win.slider.onChanging = function () {
          var thisColor = colorPicker.HsbToRgb([
            Math.round(win.editor.colorHolder.colorCol1.hGroup.hValue.text),
            Math.round(win.editor.colorHolder.colorCol2.sGroup.sValue.text),
            Math.round(this.value),
          ]);
          if (this.value != 0) {
            if (
              _this.options.backupLocation.length != 0 &&
              _this.options.shouldUpdateCursor == true
            ) {
              _this.getColor({
                clientX: _this.options.backupLocation[0] + 6,
                clientY: _this.options.backupLocation[1] + 6,
                type: "mouseup",
              });
              _this.options.backupLocation.length = 0;
              _this.colourCursorGroup.fillColour[3] = 1 - this.value / 100;
              _this.colourCursorGroup.notify("onDraw");
              return;
            }
          }
          colorPicker.copyArr(_this.outputColour, [
            thisColor[0] / 255,
            thisColor[1] / 255,
            thisColor[2] / 255,
          ]);
          _this.setDefaultValue(win);
          _this.notifyColor(win);
          _this.updateCursor(win);
          _this.setCursorLocation(_this.outputColour);
          if (this.value == 0) {
            _this.options.shouldUpdateCursor = true;
          } else {
            _this.options.shouldUpdateCursor = false;
          }
          if (_this.options.backupLocation.length == 0) {
            colorPicker.copyArr(
              _this.options.backupLocation,
              _this.colourSelectCursor.location,
            );
          }
          _this.colourCursorGroup.fillColour[3] = 1 - this.value / 100;
          _this.colourCursorGroup.notify("onDraw");
        };
        win.editor.gulu.uni.unicode.onChange = function () {
          var hexHere = "0x" + this.text;
          var eV = 0;
          if (
            colorPicker.isHex(this.text) == false &&
            colorPicker.isShortHex(this.text) == false
          ) {
            this.text = colorPicker.RgbToHex(_this.outputColour);
            eV = 1;
          }
          if (eV == 0) {
            var rgbHere =
              this.text.length == 6
                ? colorPicker.parseHex(this.text)
                : colorPicker.parseShortHex(this.text);
            colorPicker.copyArr(_this.outputColour, rgbHere);
            _this.setDefaultValue(win);
            _this.setCursorLocation(rgbHere);
            _this.notifyColor(win);
          }
        };
      };
      colorPicker.prototype.updateCursor = function (win) {
        if (
          colorPicker.arraysEqual(
            this.colourSelectCursor.strokeColour,
            [1, 1, 1],
          )
        ) {
          if (win.slider.value > 63) {
            this.colourSelectCursor.strokeColour = [0, 0, 0];
          }
        } else {
          if (
            colorPicker.arraysEqual(
              this.colourSelectCursor.strokeColour,
              [0, 0, 0],
            )
          ) {
            if (win.slider.value <= 63) {
              this.colourSelectCursor.strokeColour = [1, 1, 1];
            }
          }
        }
      };
      colorPicker.prototype.notifyColor = function (win) {
        win.editor.gulu.color.notify("onDraw");
      };
      colorPicker.prototype.setCursorLocation = function (inputColor) {
        this.colourSelectCursor.location = (function (_this) {
          var hsb = colorPicker.RgbToHsb(inputColor);
          hsb = colorPicker.convertHsbToKulerHsb(hsb);
          var angle = Math.round(hsb[0]);
          var length = Math.round((hsb[1] / 100) * _this.size);
          var point = [
            length * Math.cos((angle * 2 * Math.PI) / 360),
            length * Math.sin((angle * 2 * Math.PI) / 360),
          ];
          return [point[0] + _this.size, _this.size - point[1]];
        })(this);
        this.colourSelectCursor.location = [
          this.colourSelectCursor.location[0] -
            this.colourSelectCursor.size[0] / 2,
          this.colourSelectCursor.location[1] -
            this.colourSelectCursor.size[1] / 2,
        ];
      };
      colorPicker.prototype.bindingKeydown = function (win) {
        var _this = this;
        var keyDownHandle1 = function (k) {
          if (k.keyName == "Up") {
            if (k.shiftKey == false) {
              this.text = parseFloat(this.text) + 1;
            } else {
              this.text = parseFloat(this.text) + 10;
            }
          } else {
            if (k.keyName == "Down") {
              if (k.shiftKey == false) {
                this.text = parseFloat(this.text) - 1;
              } else {
                this.text = parseFloat(this.text) - 10;
              }
            }
          }
        };
        win.editor.colorHolder.colorCol1.rGroup.rValue.addEventListener(
          "keydown",
          keyDownHandle1,
        );
        win.editor.colorHolder.colorCol2.gGroup.gValue.addEventListener(
          "keydown",
          keyDownHandle1,
        );
        win.editor.colorHolder.colorCol3.bGroup.bValue.addEventListener(
          "keydown",
          keyDownHandle1,
        );
        win.editBright.addEventListener("keydown", keyDownHandle1);
        win.addEventListener("keydown", function (k) {
          if (k.keyName == "Escape") {
            win.close();
          }
        });
        var leftPressed = false;
        var getColor = (this.getColor = function (k) {
          _this.options.backupLocation.length = 0;
          if (k.type == "mouseup") {
            leftPressed = false;
          } else if (k.type == "mousemove") {
            if (leftPressed == false) {
              return;
            }
          } else {
            if (k.type == "mousedown") {
              leftPressed = true;
            }
          }
          var point = [k.clientX, k.clientY];
          if (!_this.isInCircle(point)) {
            return;
          }
          var thisColor = _this.getColorFromPoint(point);
          thisColor = colorPicker.RgbToHsb(thisColor);
          thisColor[2] = win.slider.value;
          thisColor = colorPicker.HsbToRgb(thisColor);
          colorPicker.copyArr(_this.outputColour, [
            thisColor[0] / 255,
            thisColor[1] / 255,
            thisColor[2] / 255,
          ]);
          _this.setCursorLocation(_this.outputColour);
          _this.setDefaultValue(win);
          win.editor.gulu.color.notify("onDraw");
        });
        this.colourCursorGroup.addEventListener("mouseup", getColor);
        this.colourCursorGroup.addEventListener("mousemove", getColor);
        this.colourCursorGroup.addEventListener("mousedown", getColor);
      };
      colorPicker.prototype.isInCircle = function (point) {
        return (
          Math.pow(point[0] - this.size, 2) +
            Math.pow(point[1] - this.size, 2) <=
          Math.pow(this.size, 2)
        );
      };
      colorPicker.prototype.getColorFromPoint = function (point) {
        var transformedPoint = this.transformPoint(point);
        var hAndS = this.getAngleAndLength(transformedPoint);
        return this.CoreGetColorFromPoint(hAndS[0], hAndS[1]);
      };
      colorPicker.prototype.getAngleAndLength = function (point) {
        var x = point[0];
        var y = point[1];
        length = Math.sqrt(x * x + y * y);
        angle = (Math.atan2(y, x) / Math.PI) * 180;
        if (angle <= 0) {
          angle += 360;
        }
        return [angle, length / this.size];
      };
      colorPicker.prototype.transformPoint = function (point) {
        var x = point[0];
        var y = point[1];
        return [x - this.size, this.size - y];
      };
      colorPicker.prototype.CoreGetColorFromPoint = function (h, s) {
        var r = 1;
        var g = 1;
        var b = 1;
        var v = 1;
        if (s == 0) {
          v = Math.floor(v * 255);
          return [v, v, v];
        }
        var originHeight = h;
        if (originHeight < 45 && originHeight >= 0) {
          i = 0;
          f = originHeight / 90;
        } else if (originHeight < 120 && originHeight >= 45) {
          i = 1;
          f = (originHeight - 45) / 75;
        } else if (originHeight < 180 && originHeight >= 120) {
          i = 2;
          f = (originHeight - 120) / 60;
        } else if (originHeight < 220 && originHeight >= 180) {
          i = 3;
          f = (originHeight - 180) / 40;
        } else if (originHeight < 275 && originHeight >= 220) {
          i = 4;
          f = (originHeight - 220) / 55;
        } else if (originHeight < 320 && originHeight >= 275) {
          i = 5;
          f = (originHeight - 275) / 45;
        } else {
          if (originHeight < 360 && originHeight >= 320) {
            i = 6;
            f = (originHeight - 320) / 40;
          }
        }
        p = 1 - s;
        q = 1 - s * f;
        t = 1 - s * (1 - f);
        switch (i) {
          case 0:
            r = v;
            g = t;
            b = p;
            break;
          case 1:
            r = v;
            g = 0.5 + t / 2;
            b = p;
            break;
          case 2:
            r = q;
            g = v;
            b = p;
            break;
          case 3:
            r = p;
            g = v;
            b = t;
            break;
          case 4:
            r = p;
            g = q;
            b = v;
            break;
          case 5:
            r = t;
            g = p;
            b = v;
            break;
          case 6:
            r = v;
            g = p;
            b = q;
            break;
        }
        return [r, g, b];
      };
      colorPicker.copyArr = function (defaultArr, otherArr) {
        while (defaultArr.length != 0) {
          defaultArr.pop();
        }
        defaultArr.push(otherArr[0]);
        defaultArr.push(otherArr[1]);
        defaultArr.push(otherArr[2]);
        return defaultArr;
      };
      colorPicker.HexToRgb = function (hex) {
        var ccolorhex = hex.toString(16);
        ccolorb = parseInt(ccolorhex.substr(-2), 16);
        ccolorg = parseInt(ccolorhex.substr(-4).substr(0, 2), 16);
        ccolorr = parseInt(ccolorhex.substr(-6).substr(0, 2), 16);
        return [ccolorr / 255, ccolorg / 255, ccolorb / 255];
      };
      colorPicker.RgbToHex = function (rgb) {
        var a = (rgb[0] * 255).toString(16);
        var b = (rgb[1] * 255).toString(16);
        var c = (rgb[2] * 255).toString(16);
        if (a.length != 2) {
          a = "0" + a;
        }
        if (b.length != 2) {
          b = "0" + b;
        }
        if (c.length != 2) {
          c = "0" + c;
        }
        return (a + b + c).toUpperCase();
      };
      colorPicker.HsbToRgb = function (hsb) {
        var rgb = [];
        hsb = [hsb[0], hsb[1] / 100, hsb[2] / 100];
        for (var offset = 240, i = 0; i < 3; i++, offset -= 120) {
          x = Math.abs(((hsb[0] + offset) % 360) - 240);
          if (x <= 60) {
            rgb[i] = 255;
          } else if (60 < x && x < 120) {
            rgb[i] = (1 - (x - 60) / 60) * 255;
          } else {
            rgb[i] = 0;
          }
        }
        for (var i = 0; i < 3; i += 1) {
          rgb[i] += (255 - rgb[i]) * (1 - hsb[1]);
        }
        for (var i = 0; i < 3; i += 1) {
          rgb[i] *= hsb[2];
        }
        return [rgb[0], rgb[1], rgb[2]];
      };
      colorPicker.RgbToHsb = function (rgb) {
        rgb = colorPicker.parseColor(rgb);
        rgb = [rgb[0] * 255, rgb[1] * 255, rgb[2] * 255];
        var hsb = [];
        var rearranged = rgb.slice(0);
        var maxIndex = 0;
        var minIndex = 0;
        rearranged.sort(function (a, b) {
          return a - b;
        });
        for (var i = 0; i < 3; i += 1) {
          if (rearranged[0] == rgb[i]) {
            minIndex = i;
          }
          if (rearranged[2] == rgb[i]) {
            maxIndex = i;
          }
        }
        if (rearranged[2] != 0) {
          hsb[2] = rearranged[2] / 255;
          hsb[1] = 1 - rearranged[0] / rearranged[2];
          if (hsb[1] != 0) {
            hsb[0] =
              maxIndex * 120 +
              (60 *
                (rearranged[1] / hsb[1] / rearranged[2] + (1 - 1 / hsb[1])) *
                ((maxIndex - minIndex + 3) % 3) ==
              1
                ? 1
                : -1);
            hsb[0] = (hsb[0] + 360) % 360;
          } else {
            hsb[0] = 0;
          }
        } else {
          hsb[2] = 0;
          hsb[1] = 0;
          hsb[0] = 0;
        }
        return [
          Math.round(hsb[0]),
          Math.round(hsb[1] * 100),
          Math.round(hsb[2] * 100),
        ];
      };
      colorPicker.convertHsbToKulerHsb = function (hsb) {
        var originHeight = hsb[0];
        var s = hsb[1];
        var b = hsb[2];
        if (originHeight < 30 && originHeight >= 0) {
          h = ((originHeight - 0) / 30) * 45 + 0;
        } else if (originHeight < 60 && originHeight >= 30) {
          h = ((originHeight - 30) / 30) * 75 + 45;
        } else if (originHeight < 120 && originHeight >= 60) {
          h = ((originHeight - 60) / 60) * 60 + 120;
        } else if (originHeight < 180 && originHeight >= 120) {
          h = ((originHeight - 120) / 60) * 40 + 180;
        } else if (originHeight < 240 && originHeight >= 180) {
          h = ((originHeight - 180) / 60) * 55 + 220;
        } else if (originHeight < 300 && originHeight >= 240) {
          h = ((originHeight - 240) / 60) * 45 + 275;
        } else if (originHeight < 360 && originHeight >= 300) {
          h = ((originHeight - 300) / 60) * 40 + 320;
        } else {
          return hsb;
        }
        return [h, s, b];
      };
      colorPicker.isType = function (content, type) {
        return (
          Object.prototype.toString.call(content) == "[object " + type + "]"
        );
      };
      colorPicker.isRgb = function (rgbArr) {
        if (!rgbArr) {
          return false;
        }
        if (!colorPicker.isType(rgbArr, "Array")) {
          return false;
        }
        if (rgbArr.length != 3) {
          return false;
        }
        for (var i = 0, len = rgbArr.length; i < len; i++) {
          if (rgbArr[i] > 1 || rgbArr[i] < 0) {
            return false;
          }
        }
        return true;
      };
      colorPicker.isLargeRgb = function (rgbArr) {
        if (!rgbArr) {
          return false;
        }
        if (!colorPicker.isType(rgbArr, "Array")) {
          return false;
        }
        if (rgbArr.length != 3) {
          return false;
        }
        for (var i = 0, len = rgbArr.length; i < len; i++) {
          if (rgbArr[i] > 255 || rgbArr[i] < 0) {
            return false;
          }
        }
        return true;
      };
      colorPicker.isHex = function (hexStr) {
        if (!hexStr) {
          return false;
        }
        if (!colorPicker.isType(hexStr, "String")) {
          return false;
        }
        if (hexStr.length != 6) {
          return false;
        }
        var arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ];
        var isHex = true;
        hexStr = hexStr.toUpperCase();
        for (var i = 0, len = hexStr.length; i < len; i++) {
          if (this.arrayIndexOf(arr, hexStr[i]) == false) {
            isHex = false;
            break;
          }
        }
        return isHex;
      };
      colorPicker.isShortHex = function (hexStr) {
        if (!hexStr) {
          return false;
        }
        if (!colorPicker.isType(hexStr, "String")) {
          return false;
        }
        if (hexStr.length != 3) {
          return false;
        }
        var arr = [
          "0",
          "1",
          "2",
          "3",
          "4",
          "5",
          "6",
          "7",
          "8",
          "9",
          "A",
          "B",
          "C",
          "D",
          "E",
          "F",
        ];
        var isShortHex = true;
        hexStr = hexStr.toUpperCase();
        for (var i = 0, len = hexStr.length; i < len; i++) {
          if (colorPicker.arrayIndexOf(arr, hexStr[i]) == false) {
            isShortHex = false;
            break;
          }
        }
        return isShortHex;
      };
      colorPicker.isHsb = function (hsbArr) {
        if (!hsbArr) {
          return false;
        }
        if (!colorPicker.isType(hsbArr, "Array")) {
          return false;
        }
        if (hsbArr.length != 4) {
          return false;
        }
        if (hsbArr[3] != "hsb") {
          return false;
        }
        if (hsbArr[0] > 360 || hsbArr[0] < 0) {
          return false;
        }
        if (hsbArr[1] > 100 || hsbArr[1] < 0) {
          return false;
        }
        if (hsbArr[2] > 100 || hsbArr[2] < 0) {
          return false;
        }
        return true;
      };
      colorPicker.parseRgb = function (inputValue) {
        return inputValue;
      };
      colorPicker.parseLargeRgb = function (inputValue) {
        var arr = [
          inputValue[0] / 255,
          inputValue[1] / 255,
          inputValue[2] / 255,
        ];
        return arr;
      };
      colorPicker.parseHex = function (inputValue) {
        return colorPicker.HexToRgb("0x" + inputValue);
      };
      colorPicker.parseShortHex = function (inputValue) {
        inputValue = inputValue.toUpperCase();
        var hex =
          "0x" +
          inputValue[0].toString() +
          inputValue[0].toString() +
          inputValue[1].toString() +
          inputValue[1].toString() +
          inputValue[2].toString() +
          inputValue[2].toString();
        return colorPicker.HexToRgb(hex);
      };
      colorPicker.parseHsb = function (inputValue) {
        var hsb = [inputValue[0], inputValue[1], inputValue[2]];
        return colorPicker.parseLargeRgb(colorPicker.HsbToRgb(hsb));
      };
      colorPicker.arrayIndexOf = function (arr, str) {
        for (var i = 0, len = arr.length; i < len; i++) {
          if (arr[i] == str) {
            return true;
          }
        }
        return false;
      };
      colorPicker.arraysEqual = function (a, b) {
        if (a === b) {
          return true;
        }
        if (a == null || b == null) {
          return false;
        }
        if (a.length != b.length) {
          return false;
        }
        for (var i = 0; i < a.length; i += 1) {
          if (a[i] !== b[i]) {
            return false;
          }
        }
        return true;
      };
      colorPicker.prototype.initSetting = function () {
        this.img = __BLOB__BLOB_000546__;
        this.slash = "/";
        var targetFolder = new Folder(
          Folder.userData.fullName +
            this.slash +
            "Aescripts" +
            this.slash +
            "colorPicker",
        );
        !targetFolder.exists && targetFolder.create();
        this.settingFile = new File(
          targetFolder.fullName + this.slash + "colorPicker.xml",
        );
        if (!this.settingFile.exists) {
          this.settingFile.open("w");
          this.settingFile.write("<setting></setting>");
          this.settingFile.close();
        }
        this.haveSetting = function (name) {
          this.settingFile.open("r");
          var content = this.settingFile.read();
          this.settingFile.close();
          return content.toString().indexOf("<" + name + ">") != -1;
        };
        this.getSetting = function (name) {
          this.settingFile.open("r");
          var xml = new XML(this.settingFile.read());
          this.settingFile.close();
          return xml[name].toString();
        };
        this.getSettingAsBool = function (name) {
          var result = this.getSetting(name);
          return result == "true" ? true : false;
        };
        this.saveSetting = function (name, value) {
          this.settingFile.open("r");
          var xml = new XML(this.settingFile.read());
          this.settingFile.close();
          var isOk = true;
          try {
            xml[name] = value.toString();
          } catch (err) {
            isOk = false;
          }
          this.settingFile.open("w");
          this.settingFile.write(xml);
          this.settingFile.close();
          return isOk;
        };
      };
      $.global.colorPicker = colorPicker;
      return colorPicker;
    })();
  }
}
DPaeSplash(this);
