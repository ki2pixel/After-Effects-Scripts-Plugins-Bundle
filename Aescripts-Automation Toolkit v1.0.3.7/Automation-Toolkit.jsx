/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function AutomationToolkitTool(thisObj) {
  var att_settings = {
    betaExpirationDate: new Date("Nov 22, 2020"),
    betaStartDate: new Date("May 1, 2020"),
    betaSupportEmail: "alonsss3@gmail.com",
    helpButtons: [],
    helpText:
      "Automation Toolkit is an After Effects tool that lets you automate many time consuming tasks.\nThis tool allows you to create a variety of script-like functions, called automations.\n\nAn automation works like any other After Effects script so even if you\u2019re in need of a script that doesn\'t exist, now for the first time you have the power to create it yourself exactly how you want it, without having a PhD in Computer Science...\n\nAutomation Toolkit contains an automation editor for creating and editing automations, and an automations toolbar for running the automations.\n\nYou can also share your automations with others!\n\nAutomation Toolkit makes the power of After Effects scripting accessible for non-coder users.\nThere is no need to know any code language to create an automation, although knowledge at programming will help getting started and creating more complex automations.",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6541755456680378,
    productSKU: "ASAT-SUL",
    scriptAuthor: "Alon Shemer",
    scriptName: "Automation Toolkit",
    scriptURL: "https://aescripts.com/automation-tookit",
    scriptVersion: "1.0.3.7",
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
    var wx = __BLOB__BLOB_000097__;
    var mx = __BLOB__BLOB_000098__;
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
  var AutomationToolkitLicenseObject = new a(att_settings);
  if (AutomationToolkitLicenseObject.c()) {
    var thisScriptFile = File($.fileName);
    function AutomationToolkitFunction(thisObj) {
      function GlobalScope(name) {
        this.name = name;
        this.scope = [];
        this.actions = [
          "loop",
          "if",
          "message",
          "ListBox",
          "set",
          "action",
          "variable",
          "",
          "",
        ];
        this.loopBackgroundData = {};
        this.loopCounter = 1;
        this.alertCounter = 1;
        this.textBoxCounter = 1;
        this.variableCounter = 1;
        this.useIcon = false;
        this.icon = "";
        this.description = "";
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.name = this.name;
          jasonObject.scope = [];
          for (var i = 0; i < this.scope.length; i += 1) {
            jasonObject.scope.push(this.scope[i].toJason());
          }
          jasonObject.loopCounter = this.loopCounter;
          jasonObject.alertCounter = this.alertCounter;
          jasonObject.textBoxCounter = this.textBoxCounter;
          jasonObject.variableCounter = this.variableCounter;
          jasonObject.useIcon = this.useIcon;
          jasonObject.icon = this.icon;
          jasonObject.description = this.description;
          return jasonObject;
        };
        this.run = function () {
          globalEnv = {};
          this.loopBackgroundData = {};
          for (var i = 0; i < this.scope.length; i += 1) {
            this.scope[i].run();
          }
          for (var key in globalEnv) {
            if (
              globalEnv[key] instanceof CustomObject ||
              globalEnv[key] instanceof ProjectObject ||
              globalEnv[key] instanceof GlobalVariableObject ||
              globalEnv[key] instanceof CollectionVariableObject ||
              globalEnv[key] instanceof PropertyObject ||
              globalEnv[key] instanceof MarkerObject ||
              globalEnv[key] instanceof RenderQueueItemObject ||
              globalEnv[key] instanceof OutputModuleObject ||
              globalEnv[key] instanceof EffectObject ||
              globalEnv[key] instanceof LayerObject ||
              globalEnv[key] instanceof ItemObject
            ) {
              globalEnv[key].destroy();
              globalEnv[key] = null;
            }
          }
          globalEnv = null;
          globalEnv = {};
        };
        this.destroy = function () {
          for (var i = 0; i < this.scope.length; i += 1) {
            this.scope[i].destroy();
            this.scope[i] = null;
          }
        };
      }
      function CustomObject(object) {
        this.properties = [new ValueCustomProperty(object), "", "", "", "", ""];
        this.actions = ["", "", ""];
        this.getPropertyValue = function (propertyUiName, loopElementName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(loopElementName);
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(
                value,
                loopElementName,
                reverseOrder,
              );
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(
                loopElementName,
                reverseOrder,
                value,
              );
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function ValueCustomProperty(object) {
        this.UiName = "value";
        this.objectType = "Number";
        this.getValue = function () {
          return object;
        };
      }
      function ProjectObject(object) {
        this.properties = projectObjectProps;
        this.actions = projectObjectActions;
        this.object = object;
        this.getPropertyValue = function (propertyUiName, loopElementName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(this.object);
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(value, this.object);
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(value, this.object);
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function GlobalVariableObject(object, objectType) {
        this.value = object;
        this.partText = "";
        this.randomMinimum = 0;
        this.randomMaximum = 100;
        this.roundRandom = true;
        this.actions = [];
        switch (objectType) {
          case "Number":
            this.properties = globalVariableNumberProps;
            this.actions = globalVariableNumberActions;
            break;
          case "Text":
            this.properties = globalVariableTextProps;
            this.actions = globalVariableTextActions;
            break;
          case "Boolean":
            this.properties = globalVariableBooleanProps;
            this.actions = [];
            break;
        }
        this.getPropertyValue = function (propertyUiName, loopElementName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(this);
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(value, this);
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(value, this);
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.value = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function CollectionVariableObject(objectType) {
        this.value = [];
        this.index = 1;
        this.collectionType = objectType;
        this.separator = "";
        switch (objectType) {
          case "Number":
            this.properties = collectionNumberProps;
            this.actions = collectionNumberActions;
            break;
          case "Text":
            this.properties = collectionTextProps;
            this.actions = collectionTextActions;
            break;
          case "Layer":
            this.properties = collectionLayerProps;
            this.actions = collectionLayerActions;
            break;
          case "Item":
            this.properties = collectionItemProps;
            this.actions = collectionItemActions;
            break;
          case "Property/Effect":
            this.properties = collectionPropertyProps;
            this.actions = collectionPropertyActions;
            break;
          case "Boolean":
            this.properties = collectionBooleanProps;
            this.actions = collectionBooleanActions;
            break;
        }
        this.getPropertyValue = function (propertyUiName, loopElementName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(this);
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(
                value,
                this,
                loopElementName,
                reverseOrder,
              );
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(value, this);
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.value = null;
          this.index = null;
          this.collectionType = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function PropertyObject(object, origianlProperty) {
        this.timeValue = 0;
        if (origianlProperty == undefined) {
          this.properties = propertyObjectProps;
        } else {
          this.properties = originalPropertyObjectProps;
        }
        this.actions = propertyObjectactions;
        this.object = object;
        this.origianlProperty = origianlProperty;
        this.objectType = "Text";
        this.getPropertyValue = function (propertyUiName) {
          if (propertyUiName == "value") {
            for (var i = 0; i < this.properties.length; i += 1) {
              if (this.properties[i].UiName == propertyUiName) {
                return this.properties[i].getValueAtTime(object, this);
              }
            }
          } else {
            for (var i = 0; i < this.properties.length; i += 1) {
              if (this.properties[i].UiName == propertyUiName) {
                return this.properties[i].getValue(object, this);
              }
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(
                value,
                object,
                this,
                loopElementName,
                reverseOrder,
              );
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(value, object, this);
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
          propertyAddKeyTime = null;
          indexProperty = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function MarkerObject(object) {
        this.timeValue = 0;
        this.properties = markerObjectProps;
        this.actions = markerObjectActions;
        this.object = object;
        this.getPropertyValue = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(object, this);
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(
                value,
                object,
                this,
                loopElementName,
                reverseOrder,
              );
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(value, object, this);
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function RenderQueueItemObject(object) {
        this.properties = renderQueueItemProps;
        this.actions = renderQueueItemActins;
        this.object = object;
        this.getPropertyValue = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(object);
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(
                value,
                object,
                loopElementName,
                reverseOrder,
              );
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(
                loopElementName,
                reverseOrder,
                value,
                this.object,
              );
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function OutputModuleObject(object, RQItem) {
        this.properties = outputModuleProps;
        this.actions = outputModuleActions;
        this.object = object;
        this.rqItem = RQItem;
        this.getPropertyValue = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(this.object, this.rqItem);
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(
                value,
                object,
                loopElementName,
                reverseOrder,
              );
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(value, object, this.rqItem);
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
          this.rqItem = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function EffectObject(object) {
        this.properties = effectProps;
        this.actions = effectActions;
        this.object = object;
        this.getPropertyValue = function (
          propertyUiName,
          loopElementName,
          valueB,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(
                object,
                loopElementName,
                valueB,
              );
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(value, object);
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(
                loopElementName,
                reverseOrder,
                value,
                this.object,
              );
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyObject = function (propertyUiName) {
          var propertyObject = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              propertyObject = this.properties[i];
            }
          }
          return new PropertyObject(
            propertyObject.getProperty(),
            propertyObject.getThis(),
          );
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function LayerObject(object) {
        this.properties = layerProps;
        this.actions = layerActions;
        this.object = object;
        this.getPropertyValue = function (
          propertyUiName,
          loopElementName,
          valueB,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(
                this.object,
                loopElementName,
                valueB,
              );
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(value, this.object);
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(
                loopElementName,
                reverseOrder,
                value,
                object,
              );
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyObject = function (propertyUiName) {
          var propertyObject = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              propertyObject = this.properties[i];
            }
          }
          return new PropertyObject(
            propertyObject.getProperty(object),
            propertyObject.getThis(),
          );
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
            }
          }
        };
      }
      function ItemObject(object) {
        this.properties = itemProps;
        this.actions = itemActions;
        this.object = object;
        this.getPropertyValue = function (
          propertyUiName,
          loopElementName,
          valueB,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].getValue(
                this.object,
                loopElementName,
                valueB,
              );
            }
          }
        };
        this.setPropertyValue = function (
          propertyUiName,
          value,
          loopElementName,
          reverseOrder,
        ) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              return this.properties[i].setValue(value, this.object);
            }
          }
        };
        this.makeAction = function (
          propertyUiName,
          loopElementName,
          reverseOrder,
          value,
        ) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              return this.actions[i].makeAction(
                loopElementName,
                reverseOrder,
                value,
                this.object,
              );
            }
          }
        };
        this.destroy = function () {
          this.properties = null;
          this.actions = null;
          this.object = null;
        };
        this.getProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i].UiName);
          }
          return propertyArray;
        };
        this.getWriteProperties = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].hasOwnProperty("setValue")) {
              propertyArray.push(this.properties[i].UiName);
            }
          }
          return propertyArray;
        };
        this.getPropertiesObjects = function () {
          var propertyArray = [];
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyArray.push(this.properties[i]);
          }
          return propertyArray;
        };
        this.getPropertyTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyTypeObject[this.properties[i].UiName] =
              this.properties[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getPropertyOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.properties.length; i += 1) {
            propertyOptionsObject[this.properties[i].UiName] =
              this.properties[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackPropertySupport = function (propertyUiName) {
          for (var i = 0; i < this.properties.length; i += 1) {
            if (this.properties[i].UiName == propertyUiName) {
              if (this.properties[i].hasOwnProperty("supportedVersion")) {
                if (this.properties[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the property "' +
                      this.properties[i].UiName +
                      '" supported only in after effects version "' +
                      this.properties[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
              break;
            }
          }
        };
        this.getActions = function () {
          var actionsArray = [];
          for (var i = 0; i < this.actions.length; i += 1) {
            actionsArray.push(this.actions[i].UiName);
          }
          return actionsArray;
        };
        this.getActionsTypeObject = function () {
          var propertyTypeObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyTypeObject[this.actions[i].UiName] =
              this.actions[i].objectType;
          }
          return propertyTypeObject;
        };
        this.getActionsOptionsObject = function () {
          var propertyOptionsObject = {};
          for (var i = 0; i < this.actions.length; i += 1) {
            propertyOptionsObject[this.actions[i].UiName] =
              this.actions[i].options;
          }
          return propertyOptionsObject;
        };
        this.chackActionSupport = function (propertyUiName) {
          for (var i = 0; i < this.actions.length; i += 1) {
            if (this.actions[i].UiName == propertyUiName) {
              if (this.actions[i].hasOwnProperty("supportedVersion")) {
                if (this.actions[i].supportedVersion > afterEffectsVersion) {
                  return [
                    false,
                    '~the action "' +
                      this.actions[i].UiName +
                      '" supported only in after effects version "' +
                      this.actions[i].supportedVersion.toString() +
                      '" and above.',
                  ];
                } else {
                  return [true, ""];
                }
              } else {
                return [true, ""];
              }
              break;
            }
          }
        };
      }
      function ProjectItems() {
        this.name = function () {
          return "items in the project";
        };
      }
      function SelectedCompItems() {
        this.name = function () {
          return "layers in the active comp";
        };
      }
      function CustomCompItem() {
        this.name = function () {
          return "layers in other comp";
        };
      }
      function LayerEffects() {
        this.name = function () {
          return "effects in the layer";
        };
      }
      function EffectProperties() {
        this.name = function () {
          return "properties in the effect";
        };
      }
      function LayerProperties() {
        this.name = function () {
          return "properties in the layer";
        };
      }
      function CustomProperty() {
        this.name = function () {
          return "keyframes in property";
        };
      }
      function MarkerProperty() {
        this.name = function () {
          return "markers in layer/item";
        };
      }
      function RenderQueueItems() {
        this.name = function () {
          return "items in the render queue";
        };
      }
      function OutputModules() {
        this.name = function () {
          return "output modules in render queue item";
        };
      }
      function CustomIterations() {
        this.value = 2;
        this.name = function () {
          return "custom amount of times";
        };
      }
      function BreakLoopIterationObject() {
        this.name = function () {
          return "stop loop";
        };
      }
      function Alert(parent) {
        this.parent = parent;
        this.elementName = "Message" + findGolbalScope(this).alertCounter++;
        this.alertItems = [];
        this.sumToText = false;
        this.alertItems.push(new AlertItem(this));
        this.mainColor = [Math.random(), Math.random(), Math.random(), 1];
        this.enabled = true;
        this.info =
          "The message automation line displays a window with a specified message and an OK button.\rMessage can show most of the properties of Layers/Project Items/Keyframes combined with custom text.\rMessage can also be used to make a list of text data from a specific properties.\r\rsum to list -\rsaves all the messages as a list without showing them, the list can be shown with the List Box automation line afterwards.";
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "Alert";
          jasonObject.elementName = this.elementName;
          jasonObject.enabled = this.enabled;
          jasonObject.alertItems = [];
          jasonObject.sumToText = this.sumToText;
          for (var i = 0; i < this.alertItems.length; i += 1) {
            jasonObject.alertItems.push(this.alertItems[i].toJason());
          }
          jasonObject.mainColor = this.mainColor;
          return jasonObject;
        };
        this.remove = remove;
        this.panel = null;
        this.destroy = function () {
          for (var i = 0; i < this.alertItems.length; i += 1) {
            this.alertItems[i].destroy();
            this.alertItems[i] = null;
          }
          this.alertItems = null;
          this.parent = null;
        };
      }
      function AlertItem(parent) {
        this.type = "custom";
        this.VarType = "Index";
        this.text = "";
        this.property = "";
        this.parent = parent;
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "AlertItem";
          jasonObject.type = this.type;
          jasonObject.VarType = this.VarType;
          jasonObject.text = this.text;
          jasonObject.property = this.property;
          return jasonObject;
        };
        this.destroy = function () {
          this.parent = null;
        };
      }
      function TextBox(parent) {
        this.parent = parent;
        this.elementName = "ListBox" + findGolbalScope(this).textBoxCounter++;
        this.textBoxItems = [];
        this.sumToText = false;
        this.textBoxItems.push(new TextBoxItem(this));
        this.mainColor = [Math.random(), Math.random(), Math.random(), 1];
        this.enabled = true;
        this.info =
          "The list box automation line displays a window with a specified list messages and an OK button.\rList Box can show only a message automation line(that should be set to \u201csum to list\u201d) and a custom text.\rList Box messages can be copied as plain text to any other application.\r\rdon\'t show -\rthe automation will skip this automation line and won\u2019t show this message.";
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "ListBox";
          jasonObject.elementName = this.elementName;
          jasonObject.textBoxItems = [];
          jasonObject.sumToText = this.sumToText;
          for (var i = 0; i < this.textBoxItems.length; i += 1) {
            jasonObject.textBoxItems.push(this.textBoxItems[i].toJason());
          }
          jasonObject.mainColor = this.mainColor;
          return jasonObject;
        };
        this.remove = remove;
        this.panel = null;
        this.destroy = function () {
          for (var i = 0; i < this.setItems.length; i += 1) {
            this.textBoxItems[i].destroy();
            this.textBoxItems[i] = null;
          }
          this.parent = null;
        };
      }
      function TextBoxItem(parent) {
        this.type = "custom";
        this.text = "";
        this.property = "";
        this.parent = parent;
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "TextBoxItem";
          jasonObject.type = this.type;
          jasonObject.text = this.text;
          jasonObject.property = this.property;
          return jasonObject;
        };
        this.destroy = function () {
          this.parent = null;
        };
      }
      function ForLoop(parent) {
        this.iterationsType = new SelectedCompItems();
        this.customIterations = 2;
        this.parent = parent;
        this.elementName = "loop" + findGolbalScope(this).loopCounter++;
        this.elementAName = null;
        this.elementAType = null;
        this.elementAProperty = "";
        this.scope = [];
        this.mainColor = [Math.random(), Math.random(), Math.random(), 1];
        this.scopeColor = undefined;
        this.reverseOrder = false;
        this.doPrecomps = false;
        this.collapse = false;
        this.enabled = true;
        this.info =
          "The loop purpose is to go through items and run the same operations on all of them.\rLoop enables you to run operations on all the layers,compositions,footages,keyframes.\rYou can add an automation line inside the loop so as you run the automation the loop will run it\u2019s automation lines on all specified items.\rWhen adding an automation line inside the loop a new option with the name of the loop will appear on the automation line properties,\rthis loop name will represent all of the items and show the properties/actions of this specific loop type layer/project item/property/number.\r\rloop types:\ritems in the project -\rthe loop will run its automation lines on all of the items in the project panel(Composition,Footage,Folders,Solids and more) from start to end.\r\rlayers in the active comp -\rthe loop will run its automation lines on all of the layers in the selected composition from start to end.\r\rlayers in other comp -\rthe loop will run its automation lines on all of the layers in the specified composition(item object) from start to end.\r\rproperties in the layer -\rthe loop will run its automation lines on all of the properties in the specified layer, from start to end.\r\reffects in the layer -\rthe loop will run its automation lines on all of the effects in the specified layer, from start to end.\r\rproperties in the effect -\rthe loop will run its automation lines on all of the properties in the specified effect, from start to end.\r\rkeyframes in property -\rthe loop will run its automation lines on all of the keyframes in the specified property(opacity,position,rotation and more) from start to end.\r\rmarkers in layer/item -\rthe loop will run its automation lines on all of the markers in the specified layer/item from start to end.\r\ritems in the render queue -\rthe loop will run its automation lines on all of the render queue items in the project from start to end.\r\routput modules in render queue item -\rthe loop will run its automation lines on all of the output modules of the specify render queue item from start to end.\r\rcustom amount of times -\rthe loop will run its automation lines on all of the keyframes in the specified property(opacity,position,rotation and more) from start to end.\r\rstop loop -\rthis loop type will stop the specified loop at this point.\r\rloop options:\rdo this for all precomps -\rrun its automation lines on all the precomps as well(and the precomps within the precomps infinitely).\r\rreverse -\rwill reverse the order and go from end to start.";
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "ForLoop";
          jasonObject.iterationsType = this.iterationsType.name();
          jasonObject.customIterations = this.customIterations;
          jasonObject.elementName = this.elementName;
          jasonObject.enabled = this.enabled;
          jasonObject.elementAName = this.elementAName;
          jasonObject.elementAType = this.elementAType;
          jasonObject.elementAProperty = this.elementAProperty;
          jasonObject.scope = [];
          for (var i = 0; i < this.scope.length; i += 1) {
            jasonObject.scope.push(this.scope[i].toJason());
          }
          jasonObject.mainColor = this.mainColor;
          jasonObject.scopeColor = this.scopeColor;
          jasonObject.reverseOrder = this.reverseOrder;
          jasonObject.doPrecomps = this.doPrecomps;
          return jasonObject;
        };
        this.remove = remove;
        this.panel = null;
        this.destroy = function () {
          for (var i = 0; i < this.scope.length; i += 1) {
            this.scope[i].destroy();
            this.scope[i] = null;
          }
          this.iterationsType = null;
          this.parent = null;
        };
      }
      function IfStatement(parent) {
        this.parent = parent;
        this.scope = [];
        this.mainColor = [Math.random(), Math.random(), Math.random(), 1];
        this.scopeColor = undefined;
        this.elementAName = null;
        this.elementAType = null;
        this.elementAProperty = "";
        this.elementAPropertyType = "";
        this.elementBName = null;
        this.elementBType = null;
        this.elementBProperty = "";
        this.condition = "";
        this.firstTrueCycle = 1;
        this.currentI;
        this.maxIterations;
        this.returnI = false;
        this.conditionsOptions = {
          bool: ["=", "!="],
          math: ["=", "!=", "<", ">", "<=", ">="],
        };
        this.collapse = false;
        this.enabled = true;
        this.info =
          "Sometimes, we need to perform different automations based on different conditions.\rThe if automation line purpose is to add logics to your automations so you can make automations that take effect only on specific items.\rfor example if you want to select all the text layers in the composition you should use if inside a loop(layers on the active comp),\rin the if you should select the loop name then it\'s property \u201cisText\u201d ,next choose \u201c=\u201d + \u201dtrue\u201d.\rinside the if you will add a set and set  it to the loop name, select the property  \u201cselected\u201d and select \u201c=\u201d +\u201dtrue\u201d.";
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "IfStatement";
          jasonObject.scope = [];
          for (var i = 0; i < this.scope.length; i += 1) {
            jasonObject.scope.push(this.scope[i].toJason());
          }
          jasonObject.mainColor = this.mainColor;
          jasonObject.scopeColor = this.scopeColor;
          jasonObject.enabled = this.enabled;
          jasonObject.elementAName = this.elementAName;
          jasonObject.elementAType = this.elementAType;
          jasonObject.elementAProperty = this.elementAProperty;
          jasonObject.elementAPropertyType = this.elementAPropertyType;
          jasonObject.elementBName = this.elementBName;
          jasonObject.elementBType = this.elementBType;
          jasonObject.elementBProperty = this.elementBProperty;
          jasonObject.condition = this.condition;
          return jasonObject;
        };
        this.remove = remove;
        this.panel = null;
        this.destroy = function () {
          for (var i = 0; i < this.scope.length; i += 1) {
            this.scope[i].destroy();
            this.scope[i] = null;
          }
          this.parent = null;
        };
      }
      function SetObject(parent) {
        this.parent = parent;
        this.setItems = [];
        this.setItems.push(new SetItem(this));
        this.mainColor = [Math.random(), Math.random(), Math.random(), 1];
        this.elementAName = null;
        this.elementAType = null;
        this.elementAProperty = "";
        this.elementAPropertyType = "";
        this.elementBName = null;
        this.elementBType = null;
        this.elementBProperty = "";
        this.enabled = true;
        this.info =
          "Set automation line will set the value of any property that can be changed by the user, for example the width and height of a layer can\u2019t be changed so they won\u2019t show in the set properties but the width and height of specific item like composition and solid can be changed so they will show in the set properties.\rfirst you have to specify which property to set and then specify what the new value of this property should be.\rSet can run mathematical calculation on many properties or custom value.\rfor example you can set the x position property of a layer to the width property of the composition multiply by 2 and the results will be the middle of the composition.\rSet won\u2019t change a value of property that has keyframes.";
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "SetObject";
          jasonObject.setItems = [];
          for (var i = 0; i < this.setItems.length; i += 1) {
            jasonObject.setItems.push(this.setItems[i].toJason());
          }
          jasonObject.mainColor = this.mainColor;
          jasonObject.enabled = this.enabled;
          jasonObject.elementAName = this.elementAName;
          jasonObject.elementAType = this.elementAType;
          jasonObject.elementAProperty = this.elementAProperty;
          jasonObject.elementAPropertyType = this.elementAPropertyType;
          jasonObject.elementBName = this.elementBName;
          jasonObject.elementBType = this.elementBType;
          jasonObject.elementBProperty = this.elementBProperty;
          return jasonObject;
        };
        this.remove = remove;
        this.panel = null;
        this.destroy = function () {
          for (var i = 0; i < this.setItems.length; i += 1) {
            this.setItems[i].destroy();
            this.setItems[i] = null;
          }
          this.parent = null;
        };
      }
      function SetItem(parent) {
        this.type = "custom";
        this.VarType = "Index";
        this.property = "";
        this.manipulator = " + ";
        this.showManipulator = false;
        this.parent = parent;
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "SetItem";
          jasonObject.type = this.type;
          jasonObject.VarType = this.VarType;
          jasonObject.property = this.property;
          jasonObject.manipulator = this.manipulator;
          return jasonObject;
        };
        this.destroy = function () {
          this.parent = null;
        };
      }
      function ObjectActions(parent) {
        this.parent = parent;
        this.mainColor = [Math.random(), Math.random(), Math.random(), 1];
        this.elementAName = null;
        this.elementAType = null;
        this.elementAAction = "";
        this.elementAActionType = "";
        this.elementBName = null;
        this.elementBType = null;
        this.elementBProperty = "";
        this.enabled = true;
        this.info =
          'Action automation line will do function on Layers/Items/Keyframes.\rThe functions enable to do manipulations that not connected to any property,\rfor example - duplicate,delete,replace and more.\rSome action will require specific input like layer/project item/number/text in order to successfully work.\rEvery object(Layer/Project Item/Keyframe) has its own actions and properties.\r\rin order the use the project action "run javascript code" you first have to enable the option "Allow automations to run external javascript code" in the settings';
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "ObjectActions";
          jasonObject.mainColor = this.mainColor;
          jasonObject.elementAName = this.elementAName;
          jasonObject.enabled = this.enabled;
          jasonObject.elementAType = this.elementAType;
          jasonObject.elementAAction = this.elementAAction;
          jasonObject.elementAActionType = this.elementAActionType;
          jasonObject.elementBName = this.elementBName;
          jasonObject.elementBType = this.elementBType;
          jasonObject.elementBProperty = this.elementBProperty;
          return jasonObject;
        };
        this.remove = remove;
        this.panel = null;
        this.destroy = function () {
          this.parent = null;
        };
      }
      function GlobalObject(parent) {
        this.parent = parent;
        this.elementName = "variable" + findGolbalScope(this).variableCounter++;
        this.mainColor = [Math.random(), Math.random(), Math.random(), 1];
        this.objectType = null;
        this.elementBName = null;
        this.elementBType = null;
        this.elementBProperty = "";
        this.userPrompt = false;
        this.promptText = "";
        this.userPromptOptions = false;
        this.promptOptions = "";
        this.enabled = true;
        this.info =
          "Variable automation line can contain every type of object:\rNumber,Text,Layer,Item,Property,Boolean.\rVariable purpose is to save custom value of any kind of object for later use.\rSome properties can be accessed only inside a loop so if you want to use this value outside of the loop you have to save it inside a variable.\rVariables have the option to get custom value from the user for automations that needs different value every time.\r\ruser prompt - open new window and asks the user to type a custom value for this variable, when user prompt selected, you have to specify instructions for the user.\rYou still have to type a value for this variable so if the user cancel the the value will be taken from the value of the variable.";
        this.toJason = function () {
          var jasonObject = {};
          jasonObject.className = "GlobalObject";
          jasonObject.elementName = this.elementName;
          jasonObject.enabled = this.enabled;
          jasonObject.mainColor = this.mainColor;
          jasonObject.objectType = this.objectType;
          jasonObject.elementBName = this.elementBName;
          jasonObject.elementBType = this.elementBType;
          jasonObject.elementBProperty = this.elementBProperty;
          jasonObject.userPrompt = this.userPrompt;
          jasonObject.promptText = this.promptText;
          jasonObject.userPromptOptions = this.userPromptOptions;
          jasonObject.promptOptions = this.promptOptions;
          return jasonObject;
        };
        this.remove = remove;
        this.panel = null;
        this.destroy = function () {
          this.parent = null;
        };
      }
      function remove(command) {
        for (var i = 0; i < command.parent.scope.length; i += 1) {
          if (command == command.parent.scope[i]) {
            command.parent.scope.splice(i, 1);
            break;
          }
        }
      }
      function findGolbalScope(command) {
        function find(child) {
          if (child.parent instanceof GlobalScope) {
            return child.parent;
          } else {
            return find(child.parent);
          }
        }
        if (command instanceof GlobalScope) {
          return command;
        } else {
          return find(command);
        }
      }
      function globalScopeArrayToJasonArray(arr) {
        var newArr = [];
        if (arr && arr.length) {
          for (var i = 0; i < arr.length; i += 1) {
            newArr.push(arr[i].toJason());
          }
        }
        return newArr;
      }
      function globalDataToJasonArray(dataObject) {
        var newData = {};
        for (var propertyObject1 in dataObject) {
          switch (propertyObject1) {
            default:
              newData[propertyObject1] = dataObject[propertyObject1];
              break;
            case "scriptsArray":
              newData[propertyObject1] = globalScopeArrayToJasonArray(
                dataObject[propertyObject1],
              );
              break;
          }
        }
        return newData;
      }
      function globalDataToFullObject(dataObject) {
        var newData = {};
        for (var propertyObject1 in dataObject) {
          switch (propertyObject1) {
            default:
              newData[propertyObject1] = dataObject[propertyObject1];
              break;
            case "scriptsArray":
              newData[propertyObject1] = jsonObjectToFullObject(
                dataObject[propertyObject1],
              );
              break;
          }
        }
        return newData;
      }
      function jsonObjectToFullObject(jsonObject) {
        var newArray = [];
        for (var i = 0; i < jsonObject.length; i += 1) {
          var globalScope = new GlobalScope(jsonObject[i].name);
          for (var propertyObject1 in globalScope) {
            for (var propertyObject2 in jsonObject[i]) {
              if (propertyObject1 == propertyObject2) {
                switch (propertyObject1) {
                  default:
                    if (propertyObject1 != "name") {
                      globalScope[propertyObject1] =
                        jsonObject[i][propertyObject1];
                    }
                    break;
                  case "scope":
                    globalScope[propertyObject1] = scopeToObject(
                      jsonObject[i][propertyObject1],
                      globalScope,
                    );
                    break;
                }
              }
            }
          }
          newArray.push(globalScope);
        }
        return newArray;
      }
      function scopeToObject(scope, parent) {
        var newScope = [];
        for (var i = 0; i < scope.length; i += 1) {
          switch (scope[i].className) {
            case "ForLoop":
              var newObject = new ForLoop(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "IfStatement":
              var newObject = new IfStatement(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "Alert":
              var newObject = new Alert(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "AlertItem":
              var newObject = new AlertItem(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "ListBox":
              var newObject = new TextBox(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "TextBoxItem":
              var newObject = new TextBoxItem(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "SetObject":
              var newObject = new SetObject(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "SetItem":
              var newObject = new SetItem(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "ObjectActions":
              var newObject = new ObjectActions(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
            case "GlobalObject":
              var newObject = new GlobalObject(parent);
              updateObjectBySameKeys(newObject, scope[i]);
              newScope.push(newObject);
              break;
          }
        }
        return newScope;
      }
      function makeItaretionObject(str) {
        switch (str) {
          case "items in the project":
            return new ProjectItems();
            break;
          case "layers in the active comp":
            return new SelectedCompItems();
            break;
          case "layers in other comp":
            return new CustomCompItem();
            break;
          case "effects in the layer":
            return new LayerEffects();
            break;
          case "properties in the effect":
            return new EffectProperties();
            break;
          case "properties in the layer":
            return new LayerProperties();
            break;
          case "keyframes in property":
            return new CustomProperty();
            break;
          case "markers in layer/item":
            return new MarkerProperty();
            break;
          case "items in the render queue":
            return new RenderQueueItems();
            break;
          case "output modules in render queue item":
            return new OutputModules();
            break;
          case "custom amount of times":
            return new CustomIterations();
            break;
          case "stop loop":
            return new BreakLoopIterationObject();
            break;
        }
      }
      function updateObjectBySameKeys(obj1, obj2) {
        for (var propertyObject1 in obj2) {
          for (var propertyObject2 in obj1) {
            if (propertyObject1 == propertyObject2) {
              switch (propertyObject1) {
                default:
                  obj1[propertyObject2] = obj2[propertyObject2];
                  break;
                case "scope":
                case "alertItems":
                case "textBoxItems":
                case "setItems":
                  obj1[propertyObject2] = scopeToObject(
                    obj2[propertyObject2],
                    obj1,
                  );
                  break;
                case "iterationsType":
                  obj1[propertyObject2] = makeItaretionObject(
                    obj2[propertyObject2],
                  );
                  break;
              }
            }
          }
        }
      }
      function findAllPrecomps(comp) {
        function find(comp, parentArray) {
          for (var i = 1; i <= comp.numLayers; i += 1) {
            if (
              i == comp.numLayers &&
              !(comp.layer(i).source instanceof CompItem)
            ) {
              return parentArray;
            } else {
              if (
                comp.layer(i).source instanceof CompItem &&
                !inArray2(comp.layer(i).source, parentArray)
              ) {
                parentArray.push(comp.layer(i).source);
                parentArray = find(comp.layer(i).source, parentArray);
              }
            }
          }
          return parentArray;
        }
        var ar = [];
        return find(comp, ar);
      }
      function startsWith(str, word) {
        if (str.lastIndexOf(word, 0) === 0) {
          return true;
        } else {
          return false;
        }
      }
      function endsWith(str, word) {
        if (str.indexOf(word, str.length - word.length) !== -1) {
          return true;
        } else {
          return false;
        }
      }
      function includeString(str, word) {
        if (str.indexOf(word) !== -1) {
          return true;
        } else {
          return false;
        }
      }
      function rd_Scooter_shiftKeyToNewTime(
        prop,
        keyToCopy,
        offset,
        keyToRemove,
      ) {
        var inInterp = prop.keyInInterpolationType(keyToCopy);
        var outInterp = prop.keyOutInterpolationType(keyToCopy);
        var keyToCopyValue = prop.keyValue(keyToCopy);
        if (
          inInterp === KeyframeInterpolationType.BEZIER &&
          outInterp === KeyframeInterpolationType.BEZIER
        ) {
          var tempAutoBezier = prop.keyTemporalAutoBezier(keyToCopy);
          var tempContBezier = prop.keyTemporalContinuous(keyToCopy);
        }
        if (outInterp !== KeyframeInterpolationType.HOLD) {
          var inTempEase = prop.keyInTemporalEase(keyToCopy);
          var outTempEase = prop.keyOutTemporalEase(keyToCopy);
        }
        if (
          prop.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
          prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL
        ) {
          var spatAutoBezier = prop.keySpatialAutoBezier(keyToCopy);
          var spatContBezier = prop.keySpatialContinuous(keyToCopy);
          var inSpatTangent = prop.keyInSpatialTangent(keyToCopy);
          var outSpatTangent = prop.keyOutSpatialTangent(keyToCopy);
          var roving = prop.keyRoving(keyToCopy);
          prop.setRovingAtKey(keyToCopy, false);
        }
        var newTime = prop.keyTime(keyToCopy) + offset;
        var newKeyIndex = prop.addKey(newTime);
        prop.setValueAtKey(newKeyIndex, keyToCopyValue);
        if (outInterp !== KeyframeInterpolationType.HOLD) {
          prop.setTemporalEaseAtKey(newKeyIndex, inTempEase, outTempEase);
        }
        prop.setInterpolationTypeAtKey(newKeyIndex, inInterp, outInterp);
        if (
          inInterp === KeyframeInterpolationType.BEZIER &&
          outInterp === KeyframeInterpolationType.BEZIER &&
          tempContBezier
        ) {
          prop.setTemporalContinuousAtKey(newKeyIndex, tempContBezier);
          prop.setTemporalAutoBezierAtKey(newKeyIndex, tempAutoBezier);
        }
        if (
          prop.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
          prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL
        ) {
          prop.setSpatialContinuousAtKey(newKeyIndex, spatContBezier);
          prop.setSpatialAutoBezierAtKey(newKeyIndex, spatAutoBezier);
          prop.setSpatialTangentsAtKey(
            newKeyIndex,
            inSpatTangent,
            outSpatTangent,
          );
          prop.setRovingAtKey(newKeyIndex, roving);
        }
        prop.removeKey(keyToRemove);
      }
      function rd_Scooter_scootAllPropGroupKeys(propGroup, offset) {
        for (var i = 1; i <= propGroup.numProperties; i += 1) {
          var keyTimes = new Array();
          prop = propGroup.property(i);
          if (prop.propertyType === PropertyType.PROPERTY) {
            if (prop.matchName === "ADBE Marker") {
              continue;
            }
            if (!prop.isTimeVarying) {
              continue;
            }
            if (prop.propertyValueType === PropertyValueType.CUSTOM_VALUE) {
              continue;
            }
            if (
              prop.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
              prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL
            ) {
              var roveKeysList = [];
              for (var j = 1; j <= prop.numKeys; j += 1) {
                roveKeysList.push(prop.keyRoving(j));
                prop.setRovingAtKey(j, false);
              }
            }
            if (offset > 0) {
              for (var j = prop.numKeys; j >= 1; j--) {
                rd_Scooter_shiftKeyToNewTime(prop, j, offset, j);
              }
            } else {
              for (var j = 1; j <= prop.numKeys; j += 1) {
                rd_Scooter_shiftKeyToNewTime(prop, j, offset, j + 1);
              }
            }
            if (
              prop.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
              prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL
            ) {
              for (var j = 1; j <= prop.numKeys; j += 1) {
                prop.setRovingAtKey(j, roveKeysList[j - 1]);
              }
            }
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP) {
            rd_Scooter_scootAllPropGroupKeys(prop, offset);
          } else {
            if (prop.propertyType === PropertyType.NAMED_GROUP) {
              rd_Scooter_scootAllPropGroupKeys(prop, offset);
            }
          }
        }
      }
      function rd_Scooter_findFirstKeyAllPropGroupKeys(propGroup, firstTime) {
        for (var i = 1; i <= propGroup.numProperties; i += 1) {
          var keyTimes = new Array();
          prop = propGroup.property(i);
          if (prop.propertyType === PropertyType.PROPERTY) {
            if (prop.matchName === "ADBE Marker") {
              continue;
            }
            if (!prop.isTimeVarying) {
              continue;
            }
            if (prop.propertyValueType === PropertyValueType.CUSTOM_VALUE) {
              continue;
            }
            for (var j = 1; j <= prop.numKeys; j += 1) {
              if (prop.keyTime(j) < firstTime) {
                firstTime = prop.keyTime(j);
              }
              if (j == 1) {
                break;
              }
            }
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP) {
            var results = rd_Scooter_findFirstKeyAllPropGroupKeys(
              prop,
              firstTime,
            );
            if (results < firstTime) {
              firstTime = results;
            }
          } else {
            if (prop.propertyType === PropertyType.NAMED_GROUP) {
              var results = rd_Scooter_findFirstKeyAllPropGroupKeys(
                prop,
                firstTime,
              );
              if (results < firstTime) {
                firstTime = results;
              }
            }
          }
        }
        return firstTime;
      }
      function rd_Scooter_getSelectedPropGroupKeys(propGroup, whichKeys) {
        var props = new Array();
        for (var i = 1; i <= propGroup.numProperties; i += 1) {
          prop = propGroup.property(i);
          if (prop.propertyType === PropertyType.PROPERTY) {
            if (prop.matchName === "ADBE Marker") {
              continue;
            }
            if (!prop.isTimeVarying) {
              continue;
            }
            propInfo = new Object();
            propInfo.prop = prop;
            propInfo.keyTimes = new Array();
            for (var j = 1; j <= prop.numKeys; j += 1) {
              if (
                (whichKeys === 0 && !prop.keySelected(j)) ||
                (whichKeys === 1 && prop.keySelected(j))
              ) {
                propInfo.keyTimes[propInfo.keyTimes.length] = prop.keyTime(j);
              }
            }
            if (propInfo.keyTimes.length > 0) {
              props[props.length] = propInfo;
            }
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP) {
            props = props.concat(
              rd_Scooter_getSelectedPropGroupKeys(prop, whichKeys),
            );
          } else {
            if (prop.propertyType === PropertyType.NAMED_GROUP) {
              props = props.concat(
                rd_Scooter_getSelectedPropGroupKeys(prop, whichKeys),
              );
            }
          }
        }
        return props;
      }
      function rd_Scooter_scootSelectedPropGroupKeys(
        propGroup,
        offset,
        whichKeys,
      ) {
        var allLayersProps = [];
        var comp = propGroup.containingComp;
        for (var i = 1; i <= comp.numLayers; i += 1) {
          if (comp.layer(i) != propGroup) {
            allLayersProps.push(
              rd_Scooter_getSelectedPropGroupKeys(comp.layer(i), whichKeys),
            );
          }
        }
        var props = rd_Scooter_getSelectedPropGroupKeys(propGroup, whichKeys);
        for (var i = 0; i < props.length; i += 1) {
          prop = props[i].prop;
          propKeyTimes = props[i].keyTimes;
          if (prop.propertyValueType === PropertyValueType.CUSTOM_VALUE) {
            continue;
          }
          if (
            prop.propertyValueType === PropertyValueType.TwoD_SPATIAL ||
            prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL
          ) {
            var roveKeysList = [];
            for (var j = 0; j < propKeyTimes.length; j += 1) {
              keyIndex2 = prop.nearestKeyIndex(propKeyTimes[j]);
              roveKeysList.push(prop.keyRoving(keyIndex2));
              prop.setRovingAtKey(keyIndex2, false);
            }
          }
          if (offset > 0) {
            for (var j = propKeyTimes.length - 1; j >= 0; j--) {
              keyIndex = prop.nearestKeyIndex(propKeyTimes[j]);
              rd_Scooter_shiftKeyToNewTime(prop, keyIndex, offset, keyIndex);
            }
          } else {
            for (var j = 0; j < propKeyTimes.length; j += 1) {
              keyIndex = prop.nearestKeyIndex(propKeyTimes[j]);
              keyIndex3 = prop.nearestKeyIndex(propKeyTimes[j] + offset);
              if (prop.keyTime(keyIndex3) == propKeyTimes[j] + offset) {
                rd_Scooter_shiftKeyToNewTime(prop, keyIndex, offset, keyIndex);
              } else {
                rd_Scooter_shiftKeyToNewTime(
                  prop,
                  keyIndex,
                  offset,
                  keyIndex + 1,
                );
              }
            }
          }
        }
        try {
          selectPropGroupKeys(props, offset);
        } catch (err) {}
        try {
          for (var i = 0; i < allLayersProps.length; i += 1) {
            selectPropGroupKeys(allLayersProps[i], 0);
          }
        } catch (err) {}
      }
      function selectPropGroupKeys(props, offset, whichKeys) {
        for (var i = 0; i < props.length; i += 1) {
          prop = props[i].prop;
          propKeyTimes = props[i].keyTimes;
          for (var j = 0; j < propKeyTimes.length; j += 1) {
            keyIndex = prop.nearestKeyIndex(propKeyTimes[j] + offset);
            prop.setSelectedAtKey(keyIndex, true);
          }
        }
      }
      function rd_Scooter_FindFirstKeySelectedPropGroupKeys(
        propGroup,
        whichKeys,
      ) {
        var props = rd_Scooter_getSelectedPropGroupKeys(propGroup, whichKeys);
        var firstTime = 1e182;
        for (var i = 0; i < props.length; i += 1) {
          prop = props[i].prop;
          propKeyTimes = props[i].keyTimes;
          for (var j = 0; j < propKeyTimes.length; j += 1) {
            if (propKeyTimes[j] < firstTime) {
              firstTime = propKeyTimes[j];
            }
            if (j == 0) {
              break;
            }
          }
        }
        if (!props.length) {
          firstTime = null;
        }
        return firstTime;
      }
      function adjustKeyframes(scootDist, scootLayer, selected, slide) {
        var kfsSelected = selected;
        var kfsAll = true;
        if (app.project === null) {
          return;
        }
        var layer = scootLayer;
        var comp = layer.containingComp;
        if (scootLayer === null) {
          return;
        }
        var offset = scootDist * comp.frameDuration;
        offset = scootDist;
        if (kfsSelected) {
          if (slide == false) {
            firstKey = rd_Scooter_FindFirstKeySelectedPropGroupKeys(layer, 1);
            rd_Scooter_scootSelectedPropGroupKeys(layer, offset - firstKey, 1);
          } else {
            rd_Scooter_scootSelectedPropGroupKeys(layer, parseFloat(offset), 1);
          }
        } else {
          if (kfsAll) {
            if (slide == false) {
              firstKey = rd_Scooter_findFirstKeyAllPropGroupKeys(layer, 1e174);
              rd_Scooter_scootAllPropGroupKeys(layer, offset - firstKey);
            } else {
              rd_Scooter_scootAllPropGroupKeys(layer, parseFloat(offset));
            }
          }
        }
      }
      function repositionLayerAnchorPoint(newLocId, layer) {
        var comp = layer.containingComp;
        var curTime = comp.time;
        try {
          if (comp instanceof CompItem) {
            comp.openInViewer();
          }
        } catch (err) {}
        var bBox = getLayerBoundingBox(layer);
        if (bBox) {
          var anchPt = layer.anchorPoint;
          var pos = layer.position;
          var posSepB = pos.dimensionsSeparated;
          if (posSepB) {
            pos.dimensionsSeparated = false;
          }
          var halfW = bBox.width / 2;
          var halfH = bBox.height / 2;
          var xoffset = bBox.xoffset;
          var yoffset = bBox.yoffset;
          var iax = (newLocId % 3) - 1;
          var iay = Math.floor(newLocId / 3) - 1;
          var ipx = newLocId % 3;
          var ipy = Math.floor(newLocId / 3);
          if (layer instanceof TextLayer && layer.Masks.numProperties < 1) {
            var textDocVal = layer
              .property("ADBE Text Properties")
              .property("ADBE Text Document").value;
            if (
              textDocVal.justification == ParagraphJustification.LEFT_JUSTIFY
            ) {
              iay -= 2;
              ipy -= 2;
            } else if (
              textDocVal.justification == ParagraphJustification.CENTER_JUSTIFY
            ) {
              iax -= 1;
              iay -= 2;
              ipx -= 1;
              ipy -= 2;
              xoffset += halfW;
            } else {
              if (
                textDocVal.justification == ParagraphJustification.RIGHT_JUSTIFY
              ) {
                iax -= 2;
                iay -= 2;
                ipx -= 2;
                ipy -= 2;
                xoffset += 2 * halfW;
              }
            }
          }
          if (layer.threeDLayer) {
            if (layer.orientation.expressionEnabled) {
              layer.orientation.numKeys
                ? layer.orientation.setValueAtTime(
                    curTime,
                    layer.orientation.valueAtTime(curTime, false),
                  )
                : layer.orientation.setValue(
                    layer.orientation.valueAtTime(curTime, false),
                  );
              layer.orientation.expression = "";
            }
            if (layer.rotationX.expressionEnabled) {
              layer.rotationX.numKeys
                ? layer.rotationX.setValueAtTime(
                    curTime,
                    layer.rotationX.valueAtTime(curTime, false),
                  )
                : layer.rotationX.setValue(
                    layer.rotationX.valueAtTime(curTime, false),
                  );
              layer.rotationX.expression = "";
            }
            if (layer.rotationY.expressionEnabled) {
              layer.rotationY.numKeys
                ? layer.rotationY.setValueAtTime(
                    curTime,
                    layer.rotationY.valueAtTime(curTime, false),
                  )
                : layer.rotationY.setValue(
                    layer.rotationY.valueAtTime(curTime, false),
                  );
              layer.rotationY.expression = "";
            }
            if (layer.rotationZ.expressionEnabled) {
              layer.rotationZ.numKeys
                ? layer.rotationZ.setValueAtTime(
                    curTime,
                    layer.rotationZ.valueAtTime(curTime, false),
                  )
                : layer.rotationZ.setValue(
                    layer.rotationZ.valueAtTime(curTime, false),
                  );
              layer.rotationZ.expression = "";
            }
          } else {
            if (layer.rotation.expressionEnabled) {
              layer.rotation.numKeys
                ? layer.rotation.setValueAtTime(
                    curTime,
                    layer.rotation.valueAtTime(curTime, false),
                  )
                : layer.rotation.setValue(
                    layer.rotation.valueAtTime(curTime, false),
                  );
              layer.rotation.expression = "";
            }
          }
          if (anchPt.expressionEnabled) {
            anchPt.numKeys
              ? anchPt.setValueAtTime(
                  curTime,
                  anchPt.valueAtTime(curTime, false),
                )
              : anchPt.setValue(anchPt.valueAtTime(curTime, false));
          }
          if (pos.expressionEnabled) {
            pos.numKeys
              ? pos.setValueAtTime(curTime, pos.valueAtTime(curTime, false))
              : pos.setValue(pos.valueAtTime(curTime, false));
          }
          anchPt.expression =
            "fromWorld(toWorld([" +
            halfW +
            "," +
            halfH +
            ",0] + [" +
            iax +
            "*" +
            halfW +
            "+" +
            xoffset +
            "," +
            iay +
            "*" +
            halfH +
            "+" +
            yoffset +
            ",0]));";
          pos.expression =
            "try {\r\tparent.fromWorld(toWorld([" +
            halfW +
            "," +
            halfH +
            ",0] + [" +
            iax +
            "*" +
            halfW +
            "+" +
            xoffset +
            "," +
            iay +
            "*" +
            halfH +
            "+" +
            yoffset +
            ",0]));\r" +
            "}\r" +
            "catch(e)\r" +
            "{\r" +
            "  toWorld([" +
            halfW +
            "," +
            halfH +
            ",0] + [" +
            iax +
            "*" +
            halfW +
            "+" +
            xoffset +
            "," +
            iay +
            "*" +
            halfH +
            "+" +
            yoffset +
            ",0]);\r" +
            "}";
          pos.expressionEnabled = false;
          pos.expressionEnabled = true;
          var anchPtVal = anchPt.valueAtTime(curTime, false);
          anchPt.expression = "";
          var posVal = pos.valueAtTime(curTime, false);
          pos.expression = "";
          anchPt.numKeys
            ? anchPt.setValueAtTime(curTime, anchPtVal)
            : anchPt.setValue(anchPtVal);
          pos.numKeys
            ? pos.setValueAtTime(curTime, posVal)
            : pos.setValue(posVal);
          if (posSepB) {
            pos.dimensionsSeparated = true;
          }
        }
      }
      function getLayerBoundingBox(layer) {
        function boundingBox(width, height, xoffset, yoffset) {
          var bBox = new Object();
          bBox.width = width;
          bBox.height = height;
          bBox.xoffset = xoffset;
          bBox.yoffset = yoffset;
          return bBox;
        }
        function min4(n1, n2, n3, n4) {
          return n1 < n2 && n1 < n3 && n1 < n4
            ? n1
            : n2 < n1 && n2 < n3 && n2 < n4
              ? n2
              : n3 < n1 && n3 < n2 && n3 < n4
                ? n3
                : n4;
        }
        function max4(n1, n2, n3, n4) {
          return n1 > n2 && n1 > n3 && n1 > n4
            ? n1
            : n2 > n1 && n2 > n3 && n2 > n4
              ? n2
              : n3 > n1 && n3 > n2 && n3 > n4
                ? n3
                : n4;
        }
        var bBox = null;
        var comp = layer.containingComp;
        var prevSelLayers = comp.selectedLayers;
        var curTime = comp.time;
        if (layer instanceof ShapeLayer) {
          while (comp.selectedLayers.length) {
            comp.selectedLayers[0].selected = false;
          }
          layer.selected = true;
          app.executeCommand(2367);
          var mask = layer.Masks.property(layer.Masks.numProperties);
          var verts = mask.maskShape.value.vertices;
          mask.remove();
          for (var z = 0; z < prevSelLayers.length; z += 1) {
            prevSelLayers[z].selected = true;
          }
          bBox = boundingBox(
            Math.abs(verts[0][0] - verts[3][0]),
            Math.abs(verts[0][1] - verts[1][1]),
            verts[0][0],
            verts[0][1],
          );
        } else {
          if (layer instanceof AVLayer || layer instanceof TextLayer) {
            var maskGrp = layer.Masks;
            if (maskGrp.numProperties) {
              var T = Infinity;
              var B = -Infinity;
              var L = Infinity;
              var R = -Infinity;
              for (var m = 1; m <= maskGrp.numProperties; m += 1) {
                var mask = maskGrp.property(m);
                var maskShape = mask.maskShape;
                var shape = maskShape.valueAtTime(curTime, false);
                var verts = shape.vertices;
                var intan = shape.inTangents;
                var outtan = shape.outTangents;
                for (var i = 0; i < verts.length; i += 1) {
                  T = min4(
                    T,
                    verts[i][1],
                    verts[i][1] + intan[i][1],
                    verts[i][1] + outtan[i][1],
                  );
                  B = max4(
                    B,
                    verts[i][1],
                    verts[i][1] + intan[i][1],
                    verts[i][1] + outtan[i][1],
                  );
                  L = min4(
                    L,
                    verts[i][0],
                    verts[i][0] + intan[i][0],
                    verts[i][0] + outtan[i][0],
                  );
                  R = max4(
                    R,
                    verts[i][0],
                    verts[i][0] + intan[i][0],
                    verts[i][0] + outtan[i][0],
                  );
                }
              }
              bBox = boundingBox(R - L, B - T, L, T);
            } else if (layer instanceof TextLayer) {
              while (comp.selectedLayers.length) {
                comp.selectedLayers[0].selected = false;
              }
              layer.selected = true;
              app.executeCommand(2367);
              var mask = layer.Masks.property(layer.Masks.numProperties);
              var verts = mask.maskShape.value.vertices;
              mask.remove();
              for (var z = 0; z < prevSelLayers.length; z += 1) {
                prevSelLayers[z].selected = true;
              }
              bBox = boundingBox(
                Math.abs(verts[0][0] - verts[3][0]),
                Math.abs(verts[0][1] - verts[1][1]),
                0,
                0,
              );
              if (verts[0][0] != 0) {
                bBox.xoffset += verts[0][0];
                bBox.yoffset += verts[1][1];
              }
            } else {
              bBox = boundingBox(layer.width, layer.height, 0, 0);
            }
          }
        }
        return bBox;
      }
      function getEffectProperties(effect) {
        var props = new Array();
        for (var i = 1; i <= effect.numProperties; i += 1) {
          prop = effect.property(i);
          if (prop.propertyType === PropertyType.PROPERTY) {
            props[props.length] = prop;
          } else if (prop.propertyType === PropertyType.INDEXED_GROUP) {
            props = props.concat(getEffectProperties(prop));
          } else {
            if (prop.propertyType === PropertyType.NAMED_GROUP) {
              props = props.concat(getEffectProperties(prop));
            }
          }
        }
        return props;
      }
      function getLayerProperties(effect) {
        var props = new Array();
        for (var i = 1; i <= effect.numProperties; i += 1) {
          prop = effect.property(i);
          if (prop.propertyType === PropertyType.PROPERTY) {
            props[props.length] = prop;
          } else if (
            prop.propertyType === PropertyType.INDEXED_GROUP &&
            prop.matchName != "ADBE Effect Parade"
          ) {
            props = props.concat(getEffectProperties(prop));
          } else {
            if (prop.propertyType === PropertyType.NAMED_GROUP) {
              props = props.concat(getEffectProperties(prop));
            }
          }
        }
        return props;
      }
      function ScriptCollection() {
        this.scope = [];
        this.toUi = function (dest) {
          var scriptsNum = data.scriptsPerRow;
          var orientation = data.orientation;
          var order = data.order;
          var btnSize = [26, 50];
          mainUIButtons.group1 = dest.add("group", undefined, {
            name: "group1",
          });
          mainUIButtons.group1.orientation = "column";
          mainUIButtons.group1.alignChildren = ["left", "top"];
          mainUIButtons.group1.spacing = 10;
          mainUIButtons.group1.margins = 0;
          switch (orientation) {
            case "horizontal":
              pal.orientation = "row";
              tempOrientation = "row";
              mainUIButtons.group1.orientation = "column";
              break;
            case "vertical":
              pal.orientation = "column";
              tempOrientation = "column";
              mainUIButtons.group1.orientation = "row";
              break;
          }
          if (this.scope.length) {
            switch (order) {
              case "Date created order":
                mainUIButtons.group2 = mainUIButtons.group1.add(
                  "group",
                  undefined,
                  { name: "group2" },
                );
                mainUIButtons.group2.orientation = tempOrientation;
                mainUIButtons.group2.alignChildren = ["left", "center"];
                mainUIButtons.group2.spacing = 10;
                mainUIButtons.group2.margins = 0;
                mainUIButtons.setGroup = mainUIButtons.group2;
                for (var i = 0; i < this.scope.length; i += 1) {
                  this.scope[i].toUi(mainUIButtons.setGroup);
                  if (Number.isInteger((i + 1) / scriptsNum)) {
                    mainUIButtons.setGroup = mainUIButtons.group1.add(
                      "group",
                      undefined,
                      { name: "group2" },
                    );
                    mainUIButtons.setGroup.orientation = tempOrientation;
                    mainUIButtons.setGroup.alignChildren = ["left", "center"];
                    mainUIButtons.setGroup.spacing = 10;
                    mainUIButtons.setGroup.margins = 0;
                  }
                }
                break;
              case "Alphabetical order":
                function compare(a, b) {
                  if (a.name < b.name) {
                    return -1;
                  }
                  if (a.name > b.name) {
                    return 1;
                  }
                  return 0;
                }
                var tempSortArr = [];
                for (var i = 0; i < this.scope.length; i += 1) {
                  tempSortArr[i] = { index: i, name: this.scope[i].name };
                }
                tempSortArr.sort(compare);
                mainUIButtons.group2 = mainUIButtons.group1.add(
                  "group",
                  undefined,
                  { name: "group2" },
                );
                mainUIButtons.group2.orientation = tempOrientation;
                mainUIButtons.group2.alignChildren = ["left", "center"];
                mainUIButtons.group2.spacing = 10;
                mainUIButtons.group2.margins = 0;
                mainUIButtons.setGroup = mainUIButtons.group2;
                for (var j = 0; j < tempSortArr.length; j += 1) {
                  for (var i = 0; i < this.scope.length; i += 1) {
                    if (tempSortArr[j].index == i) {
                      this.scope[i].toUi(mainUIButtons.setGroup);
                      if (Number.isInteger((j + 1) / scriptsNum)) {
                        mainUIButtons.setGroup = mainUIButtons.group1.add(
                          "group",
                          undefined,
                          { name: "group2" },
                        );
                        mainUIButtons.setGroup.orientation = tempOrientation;
                        mainUIButtons.setGroup.alignChildren = [
                          "left",
                          "center",
                        ];
                        mainUIButtons.setGroup.spacing = 10;
                        mainUIButtons.setGroup.margins = 0;
                      }
                    }
                  }
                }
                mainUIButtons.group2 = null;
                mainUIButtons.setGroup = null;
                break;
              case "Categories order":
                var tempIndex = [];
                for (var i = 0; i < this.scope.length; i += 1) {
                  tempIndex.push(
                    data.categories[data.selectedCategory].customOrder[i],
                  );
                }
                tempIndex.sort(function (a, b) {
                  return a - b;
                });
                mainUIButtons.group2 = mainUIButtons.group1.add(
                  "group",
                  undefined,
                  { name: "group2" },
                );
                mainUIButtons.group2.orientation = tempOrientation;
                mainUIButtons.group2.alignChildren = ["left", "center"];
                mainUIButtons.group2.spacing = 10;
                mainUIButtons.group2.margins = 0;
                mainUIButtons.setGroup = mainUIButtons.group2;
                for (
                  var j = 0;
                  j < data.categories[data.selectedCategory].customOrder.length;
                  j += 1
                ) {
                  for (var i = 0; i < tempIndex.length; i += 1) {
                    if (
                      data.categories[data.selectedCategory].customOrder[j] ==
                      tempIndex[i]
                    ) {
                      this.scope[i].toUi(mainUIButtons.setGroup);
                      if (Number.isInteger((j + 1) / scriptsNum)) {
                        mainUIButtons.setGroup = mainUIButtons.group1.add(
                          "group",
                          undefined,
                          { name: "group2" },
                        );
                        mainUIButtons.setGroup.orientation = tempOrientation;
                        mainUIButtons.setGroup.alignChildren = [
                          "left",
                          "center",
                        ];
                        mainUIButtons.setGroup.spacing = 10;
                        mainUIButtons.setGroup.margins = 0;
                      }
                    }
                  }
                }
                break;
            }
          }
        };
      }
      function ScriptItem(globalScope) {
        this.name = globalScope.name;
        this.toUi = function (dest) {
          function whatsup(p) {
            if (p.button == 2) {
              pal.size = [900, 550];
              removePalElements2(pal);
              for (var key in mainUIButtons) {
                if (mainUIButtons.hasOwnProperty(key)) {
                  mainUIButtons[key] = null;
                }
              }
              for (var key in mainStaticUiContainer) {
                if (mainStaticUiContainer.hasOwnProperty(key)) {
                  mainStaticUiContainer[key] = null;
                }
              }
              categoryUI = null;
              settingsIconButtons = null;
              licenseIconButtons = null;
              addScriptBtn = null;
              $.gc();
              $.gc();
              undoObject.currentScope = globalScope;
              undoObject.history = [
                {
                  alertCounter: globalScope.alertCounter,
                  loopCounter: globalScope.loopCounter,
                  scope: globalScope.toJason().scope,
                  textBoxCounter: globalScope.textBoxCounter,
                  variableCounter: globalScope.variableCounter,
                },
              ];
              undoObject.index = 0;
              build_second_window(pal, globalScope);
            }
          }
          if (globalScope.icon != "" && globalScope.useIcon == true) {
            mainUIButtons.scriptBtn = dest.add(
              "iconbutton",
              undefined,
              File.decode(globalScope.icon),
              { style: "toolbutton" },
            );
          } else {
            mainUIButtons.scriptBtn = dest.add(
              "button",
              undefined,
              globalScope.name,
            );
          }
          mainUIButtons.scriptBtn.helpTip =
            "(Right Click To Edit)\n" + globalScope.description;
          if (data.useSizeX) {
            mainUIButtons.scriptBtn.preferredSize.width = data.sizeX;
          }
          if (data.useSizeY) {
            mainUIButtons.scriptBtn.preferredSize.height = data.sizeY;
          }
          mainUIButtons.scriptBtn.addEventListener("click", function (k) {
            whatsup(k);
          });
          mainUIButtons.scriptBtn.onClick = function () {
            if (globalScope.scope.length > 0) {
              app.beginUndoGroup("Custom Automation");
              globalScope.run();
              app.endUndoGroup();
            } else {
              pal.size = [900, 550];
              for (var i = pal.children.length - 1; i >= 0; i--) {
                pal.remove(pal.children[i]);
              }
              undoObject.currentScope = globalScope;
              undoObject.history = [
                {
                  alertCounter: globalScope.alertCounter,
                  loopCounter: globalScope.loopCounter,
                  scope: globalScope.toJason().scope,
                  textBoxCounter: globalScope.textBoxCounter,
                  variableCounter: globalScope.variableCounter,
                },
              ];
              undoObject.index = 0;
              build_second_window(pal, globalScope);
            }
          };
        };
      }
      function refreshUi(this_UI, globalScope) {
        for (var i = this_UI.children.length - 1; i >= 0; i--) {
          this_UI.remove(this_UI.children[i]);
        }
        buildUi(this_UI, globalScope);
      }
      function buildPropertySelectionUI(
        elementAType,
        porpertyType,
        porpertyType2,
        elementAName,
        element,
      ) {
        var selection = "";
        var dlg = new Window("dialog", "Select Property");
        var set =
          "panel{orientation:\'column\', alignment:[\'center\', \'center\'],\n                }";
        var pal2 = dlg.add(set);
        pal2.margins = [5, 5, 5, 5];
        dlg.margins = [15, 15, 15, 15];
        dlg.preferredSize = [165, 260];
        pal2.preferredSize = [150, 230];
        var listbox1 = pal2.add("listbox", undefined, []);
        var properties = getObjectProperties(
          elementAType,
          porpertyType,
          undefined,
          elementAName,
          element,
        );
        switch (porpertyType) {
          case "properties":
          case "writeProperties":
            for (var i = 0; i < properties.length; i += 1) {
              listbox1.add("item", properties[i]);
            }
            break;
          case "object":
            for (var i = 0; i < properties.length; i += 1) {
              if (properties[i].objectType == porpertyType2) {
                listbox1.add("item", properties[i].UiName);
              }
            }
            break;
          case "objectDoubleInteger":
            properties = getObjectProperties(
              elementAType,
              "object",
              undefined,
              elementAName,
              element,
            );
            for (var i = 0; i < properties.length; i += 1) {
              if (properties[i].objectType == porpertyType2) {
                listbox1.add("item", properties[i].UiName);
              }
            }
            break;
        }
        listbox1.alignment = ["left", "center"];
        listbox1.preferredSize = [130, 215];
        listbox1.onChange = function () {
          selection = this.selection.text;
        };
        listbox1.onDoubleClick = function () {
          selection = this.selection.text;
          dlg.close();
        };
        dlg.onClose = function () {
          return selection;
        };
        var group2 = dlg.add("group", undefined, undefined);
        group2.margins = [0, 0, 0, 0];
        group2.alignment = ["right", "bottom"];
        var cancelBtn = group2.add(
          "button",
          undefined,
          "Cancel",
          ["right", "bottom"],
          { style: "toolbutton" },
        );
        cancelBtn.onClick = function () {
          selection = "";
          dlg.close();
        };
        var okBtn = group2.add("button", undefined, "Ok", ["right", "bottom"], {
          style: "toolbutton",
        });
        dlg.center();
        dlg.show();
        return selection;
      }
      function buildUi(this_UI, globalScope) {
        if (this_UI == pal) {
          window_group = null;
          pal2 = null;
          group2 = null;
          groupe01 = null;
          groupe03 = null;
          group3 = null;
          groupe02 = null;
          group_scroll = null;
          for (var key in editorStaticUiContainer) {
            if (editorStaticUiContainer.hasOwnProperty(key)) {
              editorStaticUiContainer[key] = null;
            }
          }
          for (var key in editorDynamicUIContainer) {
            if (editorDynamicUIContainer.hasOwnProperty(key)) {
              editorDynamicUIContainer[key] = null;
            }
          }
          key = null;
          build_second_window(this_UI, globalScope);
        } else {
          build_second_window(this_UI, globalScope);
        }
      }
      function build_main_window(this_UI) {
        this_UI.orientation = "row";
        this_UI.margins = [5, 5, 5, 5];
        this_UI.minimumSize = [10, 10];
        var scriptsNum = 5;
        mainStaticUiContainer.settingsGroup = this_UI.add(
          "group",
          undefined,
          undefined,
        );
        mainStaticUiContainer.settingsGroup.orientation = "column";
        mainStaticUiContainer.settingsGroup.alignChildren = ["left", "center"];
        mainStaticUiContainer.settingsGroup.alignment = ["left", "top"];
        mainStaticUiContainer.settingsGroup.spacing = 0;
        mainStaticUiContainer.settingsGroup.margins = 0;
        mainStaticUiContainer.settingsGroup3 = this_UI.add(
          "group",
          undefined,
          undefined,
        );
        mainStaticUiContainer.settingsGroup3.orientation = "column";
        mainStaticUiContainer.settingsGroup3.alignChildren = ["left", "center"];
        mainStaticUiContainer.settingsGroup3.alignment = ["left", "top"];
        mainStaticUiContainer.settingsGroup3.spacing = 5;
        mainStaticUiContainer.settingsGroup3.margins = 0;
        mainStaticUiContainer.settingsGroup4 =
          mainStaticUiContainer.settingsGroup3.add(
            "group",
            undefined,
            undefined,
          );
        mainStaticUiContainer.settingsGroup4.orientation = "column";
        mainStaticUiContainer.settingsGroup4.alignChildren = ["left", "center"];
        mainStaticUiContainer.settingsGroup4.alignment = ["left", "top"];
        mainStaticUiContainer.settingsGroup4.spacing = 0;
        mainStaticUiContainer.settingsGroup4.margins = 0;
        if (data.orientation == "horizontal") {
          mainStaticUiContainer.settingsGroup3.orientation = "column";
          mainStaticUiContainer.settingsGroup4.preferredSize = [5, 5];
        } else {
          mainStaticUiContainer.settingsGroup3.orientation = "row";
          mainStaticUiContainer.settingsGroup4.preferredSize = [5, 10];
        }
        var dropdown1_array = makeArrayFromAttribute("name", data.categories);
        categoryUI = mainStaticUiContainer.settingsGroup.add(
          "dropdownlist",
          undefined,
          undefined,
          { items: dropdown1_array, name: "categoryUI" },
        );
        dropdown1_array = null;
        categoryUI.helpTip =
          "Categories - Automations can be categorized in the settings - appearance";
        mainStaticUiContainer.settingsGroupB =
          mainStaticUiContainer.settingsGroup.add(
            "group",
            undefined,
            undefined,
          );
        mainStaticUiContainer.settingsGroupB.orientation = "row";
        mainStaticUiContainer.settingsGroupB.alignChildren = ["left", "center"];
        mainStaticUiContainer.settingsGroupB.alignment = ["left", "top"];
        mainStaticUiContainer.settingsGroupB.spacing = 0;
        mainStaticUiContainer.settingsGroupB.margins = 0;
        settingsIconButtons = mainStaticUiContainer.settingsGroupB.add(
          "iconbutton",
          undefined,
          File.decode(settingsSmallIcon),
          { style: "toolbutton" },
        );
        licenseIconButtons = mainStaticUiContainer.settingsGroupB.add(
          "iconbutton",
          undefined,
          File.decode(licenseIcon),
          { style: "toolbutton" },
        );
        settingsIconButtons.helpTip = "Settings and help";
        licenseIconButtons.helpTip = "License and updates";
        categoryUI.selection = data.selectedCategory;
        categoryUI.preferredSize = [55, 25];
        categoryUI.alignment = ["left", "top"];
        categoryUI.onChange = function () {
          data.selectedCategory = this.selection.index;
          if (scriptCategorySelectFile.exists) {
            if (scriptCategorySelectFile.open("w")) {
              try {
                scriptCategorySelectFile.write(
                  JSON.stringify(
                    { selectedCategory: data.selectedCategory },
                    null,
                    4,
                  ),
                );
                scriptCategorySelectFile.close();
              } catch (err) {
                scriptCategorySelectFile.close();
              }
            }
          }
          removePalElements2(pal);
          for (var key in mainUIButtons) {
            if (mainUIButtons.hasOwnProperty(key)) {
              mainUIButtons[key] = null;
            }
          }
          for (var key in mainStaticUiContainer) {
            if (mainStaticUiContainer.hasOwnProperty(key)) {
              mainStaticUiContainer[key] = null;
            }
          }
          categoryUI = null;
          settingsIconButtons = null;
          licenseIconButtons = null;
          addScriptBtn = null;
          $.gc();
          $.gc();
          build_main_window(pal);
          pal.layout.layout(true);
        };
        settingsIconButtons.alignment = ["center", "top"];
        settingsIconButtons.onClick = function () {
          settingsDlg();
          for (i = pal.children.length - 1; i >= 0; i--) {
            pal.remove(pal.children[i]);
          }
          build_main_window(pal);
          pal.layout.layout(true);
        };
        licenseIconButtons.alignment = ["center", "top"];
        licenseIconButtons.onClick = function () {
          AutomationToolkitLicenseObject.helpUI();
        };
        addScriptBtn = mainStaticUiContainer.settingsGroup3.add(
          "button",
          undefined,
          "+",
        );
        addScriptBtn.helpTip = "Add New Automation";
        uploadAutomationBtn = mainStaticUiContainer.settingsGroup3.add(
          "button",
          undefined,
          "\u21a5",
        );
        uploadAutomationBtn.helpTip = "Load automation";
        uploadAutomationBtn.size = [17, 17];
        uploadAutomationBtn.alignment = ["left", "top"];
        uploadAutomationBtn.onClick = function () {
          var newScriptFile = File.openDialog(
            "Choose Automation File (JSON)",
            "JSON:*.json",
          );
          if (newScriptFile != null) {
            if (getFileExtension(newScriptFile) === ".json") {
              if (newScriptFile.open("r")) {
                try {
                  lastRunTime = null;
                  var jsonObject = JSON.parse(newScriptFile.read());
                  newScriptFile.close();
                  var AutomationVersion = jsonObject[0].version;
                  var allSupportedVersions = compatibleVersions.concat([
                    att_settings.scriptVersion,
                  ]);
                  if (inArray(AutomationVersion, allSupportedVersions)) {
                    data.scriptsArray[data.scriptsArray.length] =
                      jsonObjectToFullObject([jsonObject[1]])[0];
                    data.categories[0].customOrder.push(
                      data.scriptsArray.length - 1,
                    );
                    if (categoryUI.selection.index !== 0) {
                      data.categories[
                        categoryUI.selection.index
                      ].customOrder.push(data.scriptsArray.length - 1);
                    }
                    removePalElements2(pal);
                    if (isSecurityPrefSet()) {
                      if (scriptFile.exists) {
                        if (scriptFile.open("w")) {
                          try {
                            scriptFile.write(
                              JSON.stringify(
                                globalDataToJasonArray(data),
                                null,
                                4,
                              ),
                            );
                            scriptFile.close();
                          } catch (err) {
                            scriptFile.close();
                          }
                        }
                      }
                    } else {
                      if (errorMessege) {
                        errorMessege = false;
                        alert(
                          "the automation \'\'" +
                            globalScope.name +
                            "\'\' can\'t be saved" +
                            "\r" +
                            "this script requires access to write files." +
                            "\r" +
                            "Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked." +
                            "\r" +
                            "then restart Automation Toolkit.",
                        );
                        try {
                          app.executeCommand(2359);
                          if (isSecurityPrefSet()) {
                            if (scriptFile.exists) {
                              if (scriptFile.open("w")) {
                                try {
                                  scriptFile.write(
                                    AutomationToolkitLicenseObject.JSONify(
                                      globalDataToJasonArray(data),
                                      "stringify",
                                      "\t",
                                    ),
                                  );
                                  scriptFile.close();
                                } catch (err) {
                                  scriptFile.close();
                                }
                              }
                            }
                          }
                        } catch (e) {
                          alert(e);
                        }
                      }
                    }
                    for (var key in mainUIButtons) {
                      if (mainUIButtons.hasOwnProperty(key)) {
                        mainUIButtons[key] = null;
                      }
                    }
                    for (var key in mainStaticUiContainer) {
                      if (mainStaticUiContainer.hasOwnProperty(key)) {
                        mainStaticUiContainer[key] = null;
                      }
                    }
                    categoryUI = null;
                    settingsIconButtons = null;
                    licenseIconButtons = null;
                    addScriptBtn = null;
                    $.gc();
                    $.gc();
                    build_main_window(pal);
                    pal.layout.layout(true);
                  } else {
                    alert(
                      "could not load the automation\rthe version of this automation not compatible with this version of automation toolkit",
                    );
                  }
                } catch (err) {
                  newScriptFile.close();
                  alert("The automation didn\'t load this properly");
                }
              }
            } else {
              alert("only \'\'.json\'\' extension is allowed");
            }
          }
        };
        var res1 =
          "panel{orientation:\'row\', alignment:[\'center\', \'top\'],\n                                            },\n                }";
        mainStaticUiContainer.palgr = this_UI.add(res1, undefined, "undefined");
        mainStaticUiContainer.palgr.alignment = ["left", "top"];
        mainStaticUiContainer.palgr.minimumSize = [10, 10];
        mainStaticUiContainer.palgr.margins = [3, 3, 3, 3];
        var scriptCollection = new ScriptCollection();
        for (var i = 0; i < data.scriptsArray.length; i += 1) {
          for (
            var k = 0;
            k < data.categories[categoryUI.selection.index].customOrder.length;
            k += 1
          ) {
            if (
              i === data.categories[categoryUI.selection.index].customOrder[k]
            ) {
              scriptCollection.scope.push(new ScriptItem(data.scriptsArray[i]));
            }
          }
        }
        scriptCollection.toUi(mainStaticUiContainer.palgr);
        for (var i = 0; i < scriptCollection.scope.length; i += 1) {
          scriptCollection.scope[i] = null;
        }
        scriptCollection.scope = null;
        scriptCollection = null;
        addScriptBtn.size = [17, 17];
        addScriptBtn.alignment = ["left", "top"];
        addScriptBtn.onClick = function () {
          data.scriptsArray.push(new GlobalScope("~New Automation"));
          data.categories[0].customOrder.push(data.scriptsArray.length - 1);
          if (categoryUI.selection.index !== 0) {
            data.categories[categoryUI.selection.index].customOrder.push(
              data.scriptsArray.length - 1,
            );
          }
          removePalElements2(pal);
          for (var key in mainUIButtons) {
            if (mainUIButtons.hasOwnProperty(key)) {
              mainUIButtons[key] = null;
            }
          }
          for (var key in mainStaticUiContainer) {
            if (mainStaticUiContainer.hasOwnProperty(key)) {
              mainStaticUiContainer[key] = null;
            }
          }
          categoryUI = null;
          settingsIconButtons = null;
          licenseIconButtons = null;
          addScriptBtn = null;
          $.gc();
          $.gc();
          build_main_window(pal);
          pal.layout.layout(true);
        };
      }
      function build_second_window(my_window, globalScope) {
        function savefunctionbtnMouseEventHandler(event) {
          try {
            if (event.type == "mouseover") {
              if (operatingSystem == "Windows") {
                event.target.onDraw = getDrawFuncrion(
                  -18,
                  -18,
                  false,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              } else {
                event.target.onDraw = getDrawFuncrion(
                  -8,
                  -8,
                  false,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              }
              event.target.fillBrush = event.target.graphics.newBrush(
                event.target.graphics.BrushType.SOLID_COLOR,
                [0.6, 0.6, 0.6, 1],
              );
              event.target.textPen = event.target.graphics.newPen(
                event.target.graphics.PenType.SOLID_COLOR,
                [0, 0, 0, 1],
                1,
              );
            }
            if (event.type == "mouseout") {
              if (operatingSystem == "Windows") {
                event.target.onDraw = getDrawFuncrion(
                  -18,
                  -18,
                  false,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              } else {
                event.target.onDraw = getDrawFuncrion(
                  -8,
                  -8,
                  false,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              }
              event.target.textPen = event.target.graphics.newPen(
                event.target.graphics.PenType.SOLID_COLOR,
                [0.2, 0.5, 0.9, 1],
                1,
              );
              event.target.fillBrush = event.target.graphics.newBrush(
                event.target.graphics.BrushType.SOLID_COLOR,
                [1, 1, 1, 0],
              );
            }
            event.target.notify("onDraw");
          } catch (e) {}
        }
        function btnMouseEventHandler(event) {
          try {
            if (event.type == "mouseover") {
              event.target.onDraw = getDrawFuncrion(
                -3,
                -2,
                ButtonStroke,
                2,
                [0.6, 0.6, 0.6, 1],
              );
              event.target.fillBrush = event.target.graphics.newBrush(
                event.target.graphics.BrushType.SOLID_COLOR,
                [0.6, 0.6, 0.6, 1],
              );
              event.target.textPen = event.target.graphics.newPen(
                event.target.graphics.PenType.SOLID_COLOR,
                [0, 0, 0, 1],
                1,
              );
            }
            if (event.type == "mouseout") {
              event.target.onDraw = getDrawFuncrion(
                -3,
                -2,
                ButtonStroke,
                2,
                [0.6, 0.6, 0.6, 1],
              );
              event.target.textPen = event.target.graphics.newPen(
                event.target.graphics.PenType.SOLID_COLOR,
                [0.6, 0.6, 0.6, 1],
                1,
              );
              if (operatingSystem == "Windows") {
                event.target.fillBrush = event.target.graphics.newBrush(
                  event.target.graphics.BrushType.SOLID_COLOR,
                  [1, 1, 1, 0],
                );
              } else {
                event.target.fillBrush = event.target.graphics.newBrush(
                  event.target.graphics.BrushType.SOLID_COLOR,
                  [0, 0, 0, 0.2],
                );
              }
            }
            event.target.notify("onDraw");
          } catch (e) {}
        }
        function okBtnbtnMouseEventHandler(event) {
          try {
            if (event.type == "mouseover") {
              if (operatingSystem == "Windows") {
                event.target.onDraw = getDrawFuncrion(
                  -10,
                  -12,
                  true,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              } else {
                event.target.onDraw = getDrawFuncrion(
                  -7,
                  2,
                  true,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              }
              event.target.fillBrush = event.target.graphics.newBrush(
                event.target.graphics.BrushType.SOLID_COLOR,
                [0.6, 0.6, 0.6, 1],
              );
              event.target.textPen = event.target.graphics.newPen(
                event.target.graphics.PenType.SOLID_COLOR,
                [0, 0, 0, 1],
                1,
              );
            }
            if (event.type == "mouseout") {
              if (operatingSystem == "Windows") {
                event.target.onDraw = getDrawFuncrion(
                  -10,
                  -12,
                  true,
                  2,
                  [0, 0.6, 0, 1],
                );
              } else {
                event.target.onDraw = getDrawFuncrion(
                  -7,
                  2,
                  true,
                  2,
                  [0, 0.6, 0, 1],
                );
              }
              event.target.textPen = event.target.graphics.newPen(
                event.target.graphics.PenType.SOLID_COLOR,
                [0, 0.6, 0, 1],
                1,
              );
              event.target.fillBrush = event.target.graphics.newBrush(
                event.target.graphics.BrushType.SOLID_COLOR,
                [1, 1, 1, 0],
              );
            }
            event.target.notify("onDraw");
          } catch (e) {}
        }
        function getDrawFuncrion(x, y, stroke, strokeWidth, strokeColor) {
          function customDraw() {
            with (this) {
              graphics.drawOSControl();
              graphics.rectPath(0, 0, size[0], size[1]);
              graphics.fillPath(fillBrush);
              if (stroke) {
                graphics.strokePath(
                  graphics.newPen(
                    graphics.PenType.SOLID_COLOR,
                    strokeColor,
                    strokeWidth,
                  ),
                );
              }
              if (text) {
                graphics.drawString(
                  text,
                  textPen,
                  (size[0] -
                    graphics.measureString(text, graphics.font, size[0])[0]) /
                    2 +
                    x,
                  y,
                  graphics.font,
                );
              }
            }
          }
          return customDraw;
        }
        if (editMode && editModeLoad) {
          editMode = false;
          editModeLoad = false;
        } else {
          if (editMode) {
            editModeLoad = true;
          }
        }
        if (pasteMode && pasteModeLoad) {
          pasteMode = false;
          pasteModeLoad = false;
        } else {
          if (pasteMode) {
            pasteModeLoad = true;
          }
        }
        window_group = my_window.add("panel", undefined, undefined);
        pal2 = window_group.add("group", undefined, undefined);
        group2 = window_group.add("panel", undefined, undefined);
        groupe01 = pal2.add("group", undefined, undefined);
        groupe03 = pal2.add("group", undefined, undefined);
        group3 = pal2.add("group", undefined, undefined);
        groupe02 = groupe03.add("panel", undefined, undefined);
        group_scroll = groupe03.add("group", undefined, undefined);
        editorStaticUiContainer.savefunction = groupe01.add(
          "button",
          undefined,
          "\u21e6",
        );
        editorStaticUiContainer.savefunction.helpTip =
          "Save automation and exit the editor";
        editorStaticUiContainer.savefunction.preferredSize = [50, 26];
        editorStaticUiContainer.savefunction.fillBrush =
          editorStaticUiContainer.savefunction.graphics.newBrush(
            editorStaticUiContainer.savefunction.graphics.BrushType.SOLID_COLOR,
            [0.03, 0.31, 1, 0],
          );
        editorStaticUiContainer.savefunction.textPen =
          editorStaticUiContainer.savefunction.graphics.newPen(
            editorStaticUiContainer.savefunction.graphics.PenType.SOLID_COLOR,
            [0.2, 0.5, 0.9, 1],
            1,
          );
        if (operatingSystem == "Windows") {
          editorStaticUiContainer.savefunction.graphics.font = "Arial-Bold:45";
          editorStaticUiContainer.savefunction.onDraw = getDrawFuncrion(
            -18,
            -18,
            false,
            2,
            [0.6, 0.6, 0.6, 1],
          );
        } else {
          editorStaticUiContainer.savefunction.graphics.font = "Arial-Bold:30";
          editorStaticUiContainer.savefunction.onDraw = getDrawFuncrion(
            -8,
            -8,
            false,
            2,
            [0.6, 0.6, 0.6, 1],
          );
        }
        editorStaticUiContainer.savefunction.addEventListener(
          "mouseover",
          savefunctionbtnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.savefunction.addEventListener(
          "mouseout",
          savefunctionbtnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.scriptNameTextUi = groupe01.add(
          "statictext",
          undefined,
          "Automation name:",
        );
        editorStaticUiContainer.scriptNameTextUi.fillBrush =
          editorStaticUiContainer.scriptNameTextUi.graphics.newBrush(
            editorStaticUiContainer.scriptNameTextUi.graphics.BrushType
              .SOLID_COLOR,
            [1, 0.5, 0.2, 0],
          );
        editorStaticUiContainer.scriptNameTextUi.textPen =
          editorStaticUiContainer.scriptNameTextUi.graphics.newPen(
            editorStaticUiContainer.scriptNameTextUi.graphics.PenType
              .SOLID_COLOR,
            [0.8, 0.8, 0.8, 1],
            1,
          );
        editorStaticUiContainer.scriptNameTextUi.graphics.font =
          "Arial-Bold:14";
        editorStaticUiContainer.scriptNameTextUi.preferredSize = [145, 27];
        if (operatingSystem == "Windows") {
          editorStaticUiContainer.scriptNameTextUi.onDraw = getDrawFuncrion(
            -20,
            -5,
          );
        } else {
          editorStaticUiContainer.scriptNameTextUi.onDraw = getDrawFuncrion(
            0,
            5,
          );
        }
        editorStaticUiContainer.scriptNameEdittextUi = groupe01.add(
          "edittext",
          undefined,
          globalScope.name,
        );
        editorStaticUiContainer.scriptNameEdittextUi.helpTip =
          "Edit the automation name";
        editorStaticUiContainer.deleteScriptBtn = groupe01.add(
          "button",
          undefined,
          "\u2716",
        );
        editorStaticUiContainer.deleteScriptBtn.fillBrush =
          editorStaticUiContainer.deleteScriptBtn.graphics.newBrush(
            editorStaticUiContainer.deleteScriptBtn.graphics.BrushType
              .SOLID_COLOR,
            [0, 0, 0, 0],
          );
        editorStaticUiContainer.deleteScriptBtn.textPen =
          editorStaticUiContainer.deleteScriptBtn.graphics.newPen(
            editorStaticUiContainer.deleteScriptBtn.graphics.PenType
              .SOLID_COLOR,
            [0.5, 0.3, 0.3, 1],
            5,
          );
        editorStaticUiContainer.deleteScriptBtn.onDraw = getGlobalDrawFuncrion(
          0,
          0,
          ButtonStroke,
          2,
          [0.6, 0.6, 0.6, 1],
        );
        editorStaticUiContainer.deleteScriptBtn.addEventListener(
          "mouseover",
          deleteScriptBtnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.deleteScriptBtn.addEventListener(
          "mouseout",
          deleteScriptBtnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.deleteScriptBtn.helpTip = "Delete automation";
        editorStaticUiContainer.deleteScriptBtn.size = [20, 20];
        editorStaticUiContainer.descriptionScriptBtn = groupe01.add(
          "button",
          undefined,
          "\u2634",
          { style: "toolbutton" },
        );
        editorStaticUiContainer.descriptionScriptBtn.size = [20, 20];
        editorStaticUiContainer.descriptionScriptBtn.helpTip =
          "Edit automation description";
        editorStaticUiContainer.emptySeparetionGroup2A = groupe01.add(
          "button",
          undefined,
          undefined,
        );
        editorStaticUiContainer.emptySeparetionGroup2A.size = [15, 20];
        editorStaticUiContainer.emptySeparetionGroup2A.enabled = false;
        editorStaticUiContainer.emptySeparetionGroup2A.hide();
        editorStaticUiContainer.undoScriptBtn = groupe01.add(
          "button",
          undefined,
          "\u25c4",
          { style: "toolbutton" },
        );
        editorStaticUiContainer.undoScriptBtn.size = [20, 20];
        editorStaticUiContainer.undoScriptBtn.helpTip = "undo";
        editorStaticUiContainer.undoScriptBtn.onClick = function () {
          if (undo()) {
            selectedLines = [];
            refreshUi(my_window, globalScope);
          }
        };
        editorStaticUiContainer.redoScriptBtn = groupe01.add(
          "button",
          undefined,
          "\u25ba",
          { style: "toolbutton" },
        );
        editorStaticUiContainer.redoScriptBtn.size = [20, 20];
        editorStaticUiContainer.redoScriptBtn.helpTip = "redo";
        editorStaticUiContainer.redoScriptBtn.onClick = function () {
          if (redo()) {
            selectedLines = [];
            refreshUi(my_window, globalScope);
          }
        };
        editorStaticUiContainer.emptySeparetionGroup2 = groupe01.add(
          "button",
          undefined,
          undefined,
        );
        editorStaticUiContainer.emptySeparetionGroup2.size = [15, 20];
        editorStaticUiContainer.emptySeparetionGroup2.enabled = false;
        editorStaticUiContainer.emptySeparetionGroup2.hide();
        editorStaticUiContainer.uploadfunction = groupe01.add(
          "button",
          undefined,
          "\u21a5",
        );
        editorStaticUiContainer.uploadfunction.size = [20, 20];
        editorStaticUiContainer.uploadfunction.helpTip = "Load automation";
        if (operatingSystem == "Windows") {
          editorStaticUiContainer.uploadfunction.fillBrush =
            editorStaticUiContainer.uploadfunction.graphics.newBrush(
              editorStaticUiContainer.uploadfunction.graphics.BrushType
                .SOLID_COLOR,
              [0, 0, 0, 0],
            );
        } else {
          editorStaticUiContainer.uploadfunction.fillBrush =
            editorStaticUiContainer.uploadfunction.graphics.newBrush(
              editorStaticUiContainer.uploadfunction.graphics.BrushType
                .SOLID_COLOR,
              [0, 0, 0, 0.2],
            );
        }
        editorStaticUiContainer.uploadfunction.textPen =
          editorStaticUiContainer.uploadfunction.graphics.newPen(
            editorStaticUiContainer.uploadfunction.graphics.PenType.SOLID_COLOR,
            [0.6, 0.6, 0.6, 1],
            5,
          );
        editorStaticUiContainer.uploadfunction.graphics.font = "Arial-Bold:18";
        editorStaticUiContainer.uploadfunction.onDraw = getDrawFuncrion(
          -3,
          -2,
          ButtonStroke,
          2,
          [0.6, 0.6, 0.6, 1],
        );
        editorStaticUiContainer.uploadfunction.addEventListener(
          "mouseover",
          btnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.uploadfunction.addEventListener(
          "mouseout",
          btnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.exportfunction = groupe01.add(
          "button",
          undefined,
          "\u21a7",
        );
        editorStaticUiContainer.exportfunction.size = [20, 20];
        editorStaticUiContainer.exportfunction.helpTip = "Export automation";
        if (operatingSystem == "Windows") {
          editorStaticUiContainer.exportfunction.fillBrush =
            editorStaticUiContainer.exportfunction.graphics.newBrush(
              editorStaticUiContainer.exportfunction.graphics.BrushType
                .SOLID_COLOR,
              [0, 0, 0, 0],
            );
        } else {
          editorStaticUiContainer.exportfunction.fillBrush =
            editorStaticUiContainer.exportfunction.graphics.newBrush(
              editorStaticUiContainer.exportfunction.graphics.BrushType
                .SOLID_COLOR,
              [0, 0, 0, 0.2],
            );
        }
        editorStaticUiContainer.exportfunction.textPen =
          editorStaticUiContainer.exportfunction.graphics.newPen(
            editorStaticUiContainer.exportfunction.graphics.PenType.SOLID_COLOR,
            [0.6, 0.6, 0.6, 1],
            5,
          );
        editorStaticUiContainer.exportfunction.graphics.font = "Arial-Bold:18";
        editorStaticUiContainer.exportfunction.onDraw = getDrawFuncrion(
          -3,
          -2,
          ButtonStroke,
          2,
          [0.6, 0.6, 0.6, 1],
        );
        editorStaticUiContainer.exportfunction.addEventListener(
          "mouseover",
          btnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.exportfunction.addEventListener(
          "mouseout",
          btnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.emptySeparetionGroup1 = groupe01.add(
          "button",
          undefined,
          undefined,
        );
        editorStaticUiContainer.emptySeparetionGroup1.size = [15, 20];
        editorStaticUiContainer.emptySeparetionGroup1.enabled = false;
        editorStaticUiContainer.emptySeparetionGroup1.hide();
        editorStaticUiContainer.scriptIconTextUi = groupe01.add(
          "statictext",
          undefined,
          "Icon:",
        );
        editorStaticUiContainer.scriptIconCheckbox = groupe01.add(
          "checkbox",
          undefined,
          undefined,
          { name: "scriptIconCheckbox" },
        );
        editorStaticUiContainer.scriptIconCheckbox.helpTip =
          "Use custom icon as the automation button (max 64*64 pixels)";
        editorStaticUiContainer.scriptIconCheckbox.value = globalScope.useIcon;
        editorStaticUiContainer.scriptIconCheckbox.onClick = function () {
          globalScope.useIcon = this.value;
          if (
            editorStaticUiContainer.scriptBrowseIconButton &&
            editorStaticUiContainer.scriptDeleteIconButton
          ) {
            editorStaticUiContainer.scriptBrowseIconButton.enabled = this.value;
            editorStaticUiContainer.scriptDeleteIconButton.enabled = this.value;
            if (globalScope.icon != "") {
              editorStaticUiContainer.scriptDeleteIconButton.show();
            }
          }
        };
        if (globalScope.icon != "") {
          editorStaticUiContainer.scriptBrowseIconButton = groupe01.add(
            "iconbutton",
            undefined,
            File.decode(globalScope.icon),
            { style: "toolbutton" },
          );
          editorStaticUiContainer.scriptDeleteIconButton = groupe01.add(
            "button",
            undefined,
            "\u2716",
          );
          editorStaticUiContainer.scriptDeleteIconButton.helpTip =
            "Delete icon";
          editorStaticUiContainer.scriptDeleteIconButton.size = [20, 20];
        } else {
          editorStaticUiContainer.scriptBrowseIconButton = groupe01.add(
            "button",
            undefined,
            "browse",
          );
          editorStaticUiContainer.scriptBrowseIconButton.helpTip =
            "Choose a custom PNG image file from your computer to function as the automation icon button (max 64*64 pixels)";
          editorStaticUiContainer.scriptBrowseIconButton.size = [50, 26];
          editorStaticUiContainer.scriptBrowseIconButton.onClick = function () {
            var newIconFile = File.openDialog(
              "Choose .PNG File (PNG)",
              "PNG:*.png",
            );
            if (newIconFile != null) {
              if (getFileExtension(newIconFile) === ".png") {
                newIconFile.encoding = "BINARY";
                if (newIconFile.open()) {
                  try {
                    var picstring = newIconFile.read();
                    binary = picstring
                      .replace("(new String(", "")
                      .replace(/\)\)$/, "");
                    newIconFile.close();
                    var ImageObject = ScriptUI.newImage(File.decode(binary));
                    if (
                      ImageObject.size[0] <= 64 &&
                      ImageObject.size[1] <= 64
                    ) {
                      globalScope.icon = File.encode(binary);
                      refreshUi(my_window, globalScope);
                    } else {
                      alert("Maximum resolution is 64x64 pixels");
                    }
                    false;
                  } catch (err) {
                    newIconFile.close();
                    alert("The script didn\'t load this image properly");
                    globalScope.icon = "";
                    refreshUi(my_window, globalScope);
                  }
                }
              } else {
                alert("Only \'\'.png\'\' extension is allowed");
              }
            }
          };
          editorStaticUiContainer.scriptDeleteIconButton = groupe01.add(
            "button",
            undefined,
            "\u2716",
          );
          editorStaticUiContainer.scriptDeleteIconButton.helpTip =
            "Delete icon";
          editorStaticUiContainer.scriptDeleteIconButton.size = [20, 20];
        }
        if (globalScope.useIcon == false) {
          editorStaticUiContainer.scriptBrowseIconButton.enabled = false;
          editorStaticUiContainer.scriptDeleteIconButton.enabled = false;
        }
        if (globalScope.icon == "") {
          editorStaticUiContainer.scriptDeleteIconButton.hide();
        }
        editorStaticUiContainer.scriptDeleteIconButton.onClick = function () {
          var bool = confirm(
            "are you sure you want to delete this icon?",
            false,
            "alert massage",
          );
          if (bool) {
            globalScope.icon = "";
            refreshUi(my_window, globalScope);
          }
        };
        editorStaticUiContainer.okBtn = groupe01.add(
          "button",
          undefined,
          "Run",
          ["right", "bottom"],
          { style: "toolbutton" },
        );
        editorStaticUiContainer.okBtn.helpTip = "Run this automation";
        editorStaticUiContainer.okBtn.preferredSize = [50, 26];
        editorStaticUiContainer.okBtn.fillBrush =
          editorStaticUiContainer.okBtn.graphics.newBrush(
            editorStaticUiContainer.okBtn.graphics.BrushType.SOLID_COLOR,
            [0.03, 0.31, 1, 0],
          );
        editorStaticUiContainer.okBtn.textPen =
          editorStaticUiContainer.okBtn.graphics.newPen(
            editorStaticUiContainer.okBtn.graphics.PenType.SOLID_COLOR,
            [0, 0.6, 0, 1],
            5,
          );
        editorStaticUiContainer.okBtn.graphics.font = "Arial-Bold:18";
        if (operatingSystem == "Windows") {
          editorStaticUiContainer.okBtn.onDraw = getDrawFuncrion(
            -10,
            -12,
            true,
            2,
            [0, 0.6, 0, 1],
          );
        } else {
          editorStaticUiContainer.okBtn.onDraw = getDrawFuncrion(
            -7,
            2,
            true,
            2,
            [0, 0.6, 0, 1],
          );
        }
        editorStaticUiContainer.okBtn.addEventListener(
          "mouseover",
          okBtnbtnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.okBtn.addEventListener(
          "mouseout",
          okBtnbtnMouseEventHandler,
          false,
        );
        if (securityState == false) {
          editorStaticUiContainer.problemfunction = groupe01.add(
            "button",
            undefined,
            "(!)",
          );
          editorStaticUiContainer.problemfunction.helpTip =
            "Error - click this for more information";
          var triengleString = "\u26a0";
          editorStaticUiContainer.problemfunction.size = [20, 20];
          editorStaticUiContainer.problemfunction.fillBrush =
            editorStaticUiContainer.problemfunction.graphics.newBrush(
              editorStaticUiContainer.problemfunction.graphics.BrushType
                .SOLID_COLOR,
              [1, 0.5, 0.2],
            );
          editorStaticUiContainer.problemfunction.textPen =
            editorStaticUiContainer.problemfunction.graphics.newPen(
              editorStaticUiContainer.problemfunction.graphics.PenType
                .SOLID_COLOR,
              [0, 0, 0, 1],
              1,
            );
          editorStaticUiContainer.problemfunction.graphics.font =
            "Arial-Bold:14";
          editorStaticUiContainer.problemfunction.onDraw = getDrawFuncrion(
            -2,
            -10,
          );
          triengleString = null;
        }
        editorStaticUiContainer.scriptNameEdittextUi.size = [100, 27];
        editorStaticUiContainer.scriptNameEdittextUi.onChange = function () {
          globalScope.name = this.text;
        };
        editorStaticUiContainer.optimizeViewCheckbox = groupe01.add(
          "checkbox",
          undefined,
          "optimized viewing mode",
        );
        editorStaticUiContainer.optimizeViewCheckbox.preferredSize = [170, 27];
        editorStaticUiContainer.optimizeViewCheckbox.helpTip =
          "this mode optimize the loading of the ui elements";
        editorStaticUiContainer.optimizeViewCheckbox.value =
          optimizeViewEnabled;
        editorStaticUiContainer.optimizeViewCheckbox.onClick = function () {
          optimizeViewEnabled = this.value;
          if (this.value == true) {
            if (scroll_memory >= 950) {
              function roundFunction(number, increment, offset) {
                return (
                  Math.round((number - offset) / increment) * increment + offset
                );
              }
              scroll_last_trget =
                roundFunction(scroll_memory / 50, 10, -1) * 50;
              scroll_minimum_trget = scroll_last_trget - 500;
              scroll_maximum_trget = scroll_last_trget + 500;
            } else {
              scroll_last_trget = 0;
              scroll_minimum_trget = -100;
              scroll_maximum_trget = 1450;
            }
          }
          if (this.value == false) {
            scroll_last_trget = 0;
            scroll_minimum_trget = -100;
            scroll_maximum_trget = 1450;
          }
          refreshUi(my_window, globalScope);
        };
        editorStaticUiContainer.addfunctionSpecialB = group3.add(
          "button",
          undefined,
          "\u27f4",
        );
        editorStaticUiContainer.addfunctionSpecialB.preferredSize = [22, 22];
        editorStaticUiContainer.addfunctionSpecialB.helpTip =
          "Add an automation line at custom position";
        editorStaticUiContainer.addfunctionSpecialB.fillBrush =
          editorStaticUiContainer.addfunctionSpecialB.graphics.newBrush(
            editorStaticUiContainer.addfunctionSpecialB.graphics.BrushType
              .SOLID_COLOR,
            [0, 0, 0, 0],
          );
        editorStaticUiContainer.addfunctionSpecialB.textPen =
          editorStaticUiContainer.addfunctionSpecialB.graphics.newPen(
            editorStaticUiContainer.addfunctionSpecialB.graphics.PenType
              .SOLID_COLOR,
            [0.6, 0.6, 0.6, 1],
            5,
          );
        editorStaticUiContainer.addfunctionSpecialB.graphics.font =
          "Arial-Bold:18";
        editorStaticUiContainer.addfunctionSpecialB.onDraw = getDrawFuncrion(
          -3,
          -2,
          ButtonStroke,
          2,
          [0.6, 0.6, 0.6, 1],
        );
        editorStaticUiContainer.addfunctionSpecialB.addEventListener(
          "mouseover",
          btnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.addfunctionSpecialB.addEventListener(
          "mouseout",
          btnMouseEventHandler,
          false,
        );
        editorStaticUiContainer.addfunctionSpecialB.onClick = function () {
          if (editMode) {
            editMode = false;
            editModeLoad = false;
          } else {
            pasteMode = false;
            pasteModeLoad = false;
            editMode = true;
          }
          refreshUi(my_window, globalScope);
        };
        editorStaticUiContainer.copyBtn = group3.add(
          "button",
          undefined,
          "copy",
        );
        editorStaticUiContainer.copyBtn.preferredSize = [45, 22];
        editorStaticUiContainer.copyBtn.onClick = function () {
          if (selectedLines.length > 0) {
            copyHighlight(globalScope);
          } else {
            alert(
              "Please select at least 1 automation line before clicking the copy button.",
            );
          }
        };
        editorStaticUiContainer.pasteBtn = group3.add(
          "button",
          undefined,
          "paste",
        );
        editorStaticUiContainer.pasteBtn.preferredSize = [45, 22];
        editorStaticUiContainer.pasteBtn.onClick = function () {
          if (pasteMode) {
            pasteMode = false;
            pasteModeLoad = false;
          } else {
            editMode = false;
            editModeLoad = false;
            if (copiedData != null) {
              pasteMode = true;
            } else {
              alert(
                "Please copy at least 1 automation line before clicking paste.",
              );
            }
          }
          refreshUi(my_window, globalScope);
        };
        editorStaticUiContainer.collapseAllBtn = group3.add(
          "button",
          undefined,
          "\u25b2",
        );
        editorStaticUiContainer.collapseAllBtn.helpTip =
          "collapse all the automation lines";
        editorStaticUiContainer.collapseAllBtn.preferredSize = [22, 22];
        editorStaticUiContainer.collapseAllBtn.onClick = function () {
          collapseAll(globalScope);
          refreshUi(my_window, globalScope);
        };
        editorStaticUiContainer.scroll_bar_x = group3.add(
          "scrollbar {stepdelta: 1}",
        );
        editorStaticUiContainer.scroll_bar = group_scroll.add(
          "scrollbar {stepdelta: 1}",
        );
        linesCounter = 0;
        if (globalScope.scope && globalScope.scope.length) {
          uiVariables.variables = [];
          uiVariables.alert = [];
          for (var i = 0; i < globalScope.scope.length; i += 1) {
            globalScope.scope[i].toUI(groupe02, [my_window, globalScope], 0);
          }
        }
        editorStaticUiContainer.addAutomationLinePanel = groupe02.add(
          "panel",
          undefined,
          undefined,
        );
        editorStaticUiContainer.addAutomationLinePanel.margins = [0, 0, 0, 0];
        editorStaticUiContainer.addAutomationLinePanel.orientation = "row";
        editorStaticUiContainer.addAutomationLinePanel.minimumSize = [2000, 40];
        editorStaticUiContainer.addAutomationLinePanel.maximumSize =
          editorStaticUiContainer.addAutomationLinePanel.minimumSize;
        editorStaticUiContainer.addAutomationLinePanel.alignChildren = [
          "left",
          "top",
        ];
        editorStaticUiContainer.addfunction =
          editorStaticUiContainer.addAutomationLinePanel.add(
            "button",
            undefined,
            "\u271a",
          );
        editorStaticUiContainer.addfunction.preferredSize = [36, 36];
        editorStaticUiContainer.addfunction.helpTip = "Add an automation line";
        editorStaticUiContainer.scriptLineCountTextUi = group3.add(
          "statictext",
          undefined,
          "lines: " + linesCounter.toString(),
        );
        editorStaticUiContainer.scriptRunTimeTextUi = group3.add(
          "statictext",
          undefined,
          "",
        );
        editorStaticUiContainer.scriptRunTimeTextUi.preferredSize = [50, 26];
        if (lastRunTime) {
          editorStaticUiContainer.scriptRunTimeTextUi.text =
            ", " + lastRunTime.toString() + "sec";
        }
        my_window.orientation = "column";
        pal2.orientation = "column";
        group2.orientation = "row";
        groupe01.orientation = "row";
        groupe03.orientation = "row";
        groupe02.orientation = "column";
        groupe02.alignment = "left";
        groupe02.alignChildren = "left";
        groupe03.alignment = "left";
        groupe02.alignment = "top";
        pal2.alignment = "left";
        groupe01.alignment = "left";
        my_window.margins = [0, 0, 0, 0];
        groupe03.margins = [0, 0, 0, 0];
        group3.margins = [0, 0, 0, 0];
        pal2.margins = [5, 5, 5, 5];
        group2.margins = [0, 0, 0, 0];
        groupe01.margins = [0, 0, 0, 0];
        window_group.margins = [0, 0, 0, 0];
        editorStaticUiContainer.scroll_bar.preferredSize = [20, 200];
        editorStaticUiContainer.scroll_bar_x.size = [600, 20];
        editorStaticUiContainer.scroll_bar.maxvalue =
          groupe02.children.length > 1
            ? (groupe02.children.length - 1) * 50
            : 0;
        if (groupe02.children.length == 1) {
          scroll_memory = 0;
        }
        editorStaticUiContainer.scroll_bar.value = scroll_memory;
        editorStaticUiContainer.scroll_bar_x.maxvalue =
          groupe02.children.length > 1 ? 2000 : 0;
        editorStaticUiContainer.scroll_bar_x.value = scroll_memory_x;
        var tempSize = pal.size;
        window_group.maximumSize = [
          pal.size[0] * (1 - 20 / pal.size[0]),
          pal.size[1] * (1 - 20 / pal.size[1]),
        ];
        var temp_window_group_size = window_group.maximumSize;
        pal2.maximumSize = [
          pal.size[0] * (1 - 20 / pal.size[0]),
          pal.size[1] * (1 - 30 / pal.size[1]),
        ];
        var temp_pal2_size = pal2.maximumSize;
        groupe03.maximumSize = [
          pal.size[0] * (1 - 40 / pal.size[0]),
          pal.size[1] * (1 - 110 / pal.size[1]),
        ];
        var temp_groupe03_size = groupe03.maximumSize;
        groupe02.maximumSize = [
          pal.size[0] * (1 - 75 / pal.size[0]),
          pal.size[1] * (1 - 110 / pal.size[1]),
        ];
        var temp_groupe02_size = groupe02.maximumSize;
        group_scroll.maximumSize[1] = groupe02.maximumSize[1];
        pal.maximumSize = tempSize;
        pal.minimumSize = pal.maximumSize;
        my_window.layout.layout(true);
        pal.size = tempSize;
        window_group.size = temp_window_group_size;
        pal2.size = temp_pal2_size;
        groupe03.size = temp_groupe03_size;
        groupe02.size = temp_groupe02_size;
        group_scroll.size[1] = temp_groupe02_size[1];
        pal.minimumSize = [0, 0];
        pal.maximumSize = [3840, 2160];
        my_window.layout.resize();
        tempSize = null;
        temp_window_group_size = null;
        temp_pal2_size = null;
        temp_groupe03_size = null;
        temp_groupe02_size = null;
        center_location(group2);
        for (var i = 0; i < groupe02.children.length; i += 1) {
          groupe02.children[i].location.x = 10 + -1 * scroll_memory_x;
          groupe02.children[i].location.y =
            10 +
            i * (groupe02.children[i].size[1] + groupe02.spacing) +
            -1 * scroll_memory;
        }
        editorStaticUiContainer.scroll_bar.onChanging = function () {
          for (var i = 0; i < groupe02.children.length; i += 1) {
            groupe02.children[i].location.y =
              10 +
              i * (groupe02.children[i].size[1] + groupe02.spacing) +
              -1 * this.value;
          }
          if (optimizeViewEnabled == true) {
            if (
              this.value >= scroll_current_trget &&
              scroll_current_trget !== scroll_last_trget &&
              scroll_last_trget < scroll_current_trget
            ) {
              scroll_minimum_trget = scroll_current_trget - 500;
              scroll_maximum_trget = scroll_current_trget + 500;
              scroll_last_trget = scroll_current_trget;
              refreshUi(my_window, globalScope);
            }
            if (this.value <= scroll_minimum_trget) {
              if (scroll_minimum_trget <= 450) {
                scroll_last_trget = 450;
                scroll_minimum_trget = -100;
                scroll_maximum_trget = 1450;
                refreshUi(my_window, globalScope);
              } else {
                scroll_last_trget = scroll_minimum_trget;
                scroll_maximum_trget = scroll_minimum_trget + 500;
                scroll_minimum_trget = scroll_minimum_trget - 500;
                refreshUi(my_window, globalScope);
              }
            }
            if (this.value >= scroll_maximum_trget) {
              editorStaticUiContainer.optimizeViewCheckbox.text = "max";
              scroll_last_trget = scroll_maximum_trget;
              scroll_minimum_trget = scroll_maximum_trget - 500;
              scroll_maximum_trget = scroll_maximum_trget + 500;
              refreshUi(my_window, globalScope);
            }
          }
          scroll_memory = this.value;
        };
        editorStaticUiContainer.scroll_bar_x.onChanging = function () {
          for (var i = 0; i < groupe02.children.length; i += 1) {
            groupe02.children[i].location.x = 10 + -1 * this.value;
          }
          scroll_memory_x = this.value;
        };
        editorStaticUiContainer.descriptionScriptBtn.onClick = function () {
          var dialog = new Window("dialog");
          dialog.text = "Dialog";
          dialog.preferredSize.height = 214;
          dialog.orientation = "column";
          dialog.alignChildren = ["center", "top"];
          dialog.spacing = 10;
          dialog.margins = 16;
          var statictext1 = dialog.add("statictext", undefined, undefined, {
            name: "statictext1",
          });
          statictext1.text = "Automation Description:";
          var edittext1 = dialog.add(
            'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
          );
          edittext1.text = globalScope.description;
          edittext1.preferredSize.width = 362;
          edittext1.preferredSize.height = 117;
          var group1 = dialog.add("group", undefined, { name: "group1" });
          group1.orientation = "row";
          group1.alignChildren = ["left", "center"];
          group1.spacing = 10;
          group1.margins = 0;
          var button1 = group1.add("button", undefined, undefined, {
            name: "button1",
          });
          button1.text = "Ok";
          button1.preferredSize.width = 55;
          button1.preferredSize.height = 27;
          button1.onClick = function () {
            globalScope.description = edittext1.text;
            dialog.close();
          };
          var button2 = group1.add("button", undefined, undefined, {
            name: "button2",
          });
          button2.text = "Cancel";
          button2.preferredSize.width = 55;
          button2.preferredSize.height = 27;
          dialog.show();
          dialog = null;
          statictext1 = null;
          edittext1 = null;
          group1 = null;
          button1 = null;
          button2 = null;
        };
        editorStaticUiContainer.addfunction.onClick = function () {
          globalScope.scope.push(new ForLoop(globalScope));
          refreshUi(my_window, globalScope);
          generateUndoStep();
        };
        editorStaticUiContainer.exportfunction.onClick = function () {
          if (isSecurityPrefSet()) {
            var dskTop = Folder.desktop;
            var dskPth = String(dskTop);
            var newSpot = new File(
              dskPth + "/" + globalScope.name.toString() + ".json",
            );
            var myDestination = newSpot.saveDlg("Select Destination Folder");
            if (myDestination != null) {
              myDestination.encoding = "UTF-8";
              if (getFileExtension(myDestination) === ".json") {
                if (myDestination.open("w")) {
                  try {
                    var thisScriptGlobalScope = globalScopeArrayToJasonArray([
                      globalScope,
                    ]);
                    thisScriptGlobalScope = [
                      { version: att_settings.scriptVersion },
                    ].concat(thisScriptGlobalScope);
                    myDestination.write(
                      JSON.stringify(thisScriptGlobalScope, null, 4),
                    );
                    myDestination.close();
                  } catch (err) {
                    myDestination.close();
                  }
                }
              } else {
                alert("only \'\'.json\'\' extension is allowed");
              }
            }
          } else {
            alert(
              "the automation \'\'" +
                globalScope.name +
                "\'\' cant be saved" +
                "\r" +
                "this script requires access to write files." +
                "\r" +
                "Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked." +
                "\r" +
                "then restart Automation Toolkit.",
            );
            try {
              app.executeCommand(2359);
            } catch (e) {
              alert(e);
            }
          }
        };
        editorStaticUiContainer.uploadfunction.onClick = function () {
          var bool1 = true;
          if (globalScope.scope.length > 0) {
            bool1 = confirm(
              "This action will overwrite and delete the current automation,\rDo you want to proceed? ",
              false,
              "massage",
            );
          }
          if (bool1) {
            selectedLines = [];
            var newScriptFile = File.openDialog(
              "Choose Automation File (JSON)",
              "JSON:*.json",
            );
            for (var i = 0; i < data.scriptsArray.length; i += 1) {
              if (globalScope == data.scriptsArray[i]) {
                dataIndex = i;
              }
            }
            var scriptBackup = JSON.stringify(
              globalScopeArrayToJasonArray([data.scriptsArray[dataIndex]]),
              null,
              4,
            );
            if (newScriptFile != null) {
              if (getFileExtension(newScriptFile) === ".json") {
                if (newScriptFile.open("r")) {
                  try {
                    lastRunTime = null;
                    var jsonObject = JSON.parse(newScriptFile.read());
                    newScriptFile.close();
                    var AutomationVersion = jsonObject[0].version;
                    var allSupportedVersions = compatibleVersions.concat([
                      att_settings.scriptVersion,
                    ]);
                    if (inArray(AutomationVersion, allSupportedVersions)) {
                      data.scriptsArray[dataIndex] = jsonObjectToFullObject([
                        jsonObject[1],
                      ])[0];
                      for (i = pal.children.length - 1; i >= 0; i--) {
                        pal.remove(pal.children[i]);
                      }
                      build_second_window(pal, data.scriptsArray[dataIndex]);
                    } else {
                      alert(
                        "could not load the automation\rthe version of this automation not compatible with this version of automation toolkit",
                      );
                    }
                  } catch (err) {
                    newScriptFile.close();
                    alert("The automation didn\'t load this properly");
                    var bool = confirm(
                      "click yes to continue loading the automation\r(click no to restore the last automation)",
                      false,
                      "error massage",
                    );
                    if (!bool) {
                      data.scriptsArray[dataIndex] = jsonObjectToFullObject(
                        JSON.parse(scriptBackup),
                      )[0];
                      for (i = pal.children.length - 1; i >= 0; i--) {
                        pal.remove(pal.children[i]);
                      }
                      build_second_window(pal, data.scriptsArray[dataIndex]);
                    }
                  }
                }
              } else {
                alert("only \'\'.json\'\' extension is allowed");
              }
            }
          }
        };
        if (securityState == false) {
          editorStaticUiContainer.problemfunction.onClick = function () {
            if (securityState == false) {
              if (!isSecurityPrefSet()) {
                alert(
                  "the automation \'\'" +
                    globalScope.name +
                    "\'\' cant be saved" +
                    "\r" +
                    "this script requires access to write files." +
                    "\r" +
                    "Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked." +
                    "\r" +
                    "then restart Automation Toolkit.",
                );
                try {
                  app.executeCommand(2359);
                } catch (e) {
                  alert(e);
                }
              } else {
                alert(
                  "please restart the Automation Toolkit in order to load all your previos automations",
                );
              }
            }
            this.active = false;
          };
        }
        editorStaticUiContainer.deleteScriptBtn.onClick = function () {
          var bool = confirm(
            "are you sure you want to delete \'\'" +
              globalScope.name +
              "\'\' automation ?",
            false,
            "alert massage",
          );
          if (bool) {
            for (var i = 0; i < data.scriptsArray.length; i += 1) {
              if (data.scriptsArray[i] === globalScope) {
                for (var j = 0; j < data.categories.length; j += 1) {
                  for (
                    var k = 0;
                    k < data.categories[j].customOrder.length;
                    k += 1
                  ) {
                    if (data.categories[j].customOrder[k] == i) {
                      data.categories[j].customOrder.splice(k, 1);
                    }
                  }
                  for (
                    var k = 0;
                    k < data.categories[j].customOrder.length;
                    k += 1
                  ) {
                    if (data.categories[j].customOrder[k] > i) {
                      data.categories[j].customOrder[k] =
                        data.categories[j].customOrder[k] - 1;
                    }
                  }
                }
                for (var k = 0; k < data.keyboardShortcuts.length; k += 1) {
                  if (data.keyboardShortcuts[k] == i) {
                    data.keyboardShortcuts.splice(k, 1);
                  }
                }
                for (var k = 0; k < data.keyboardShortcuts.length; k += 1) {
                  if (data.keyboardShortcuts[k] > i) {
                    data.keyboardShortcuts[k] = data.keyboardShortcuts[k] - 1;
                  }
                }
                data.scriptsArray.splice(i, 1);
                undoObject.currentScope = null;
                undoObject.history = [];
                undoObject.index = 0;
                lastRunTime = null;
                if (isSecurityPrefSet()) {
                  if (scriptFile.exists) {
                    if (scriptFile.open("w")) {
                      try {
                        scriptFile.write(
                          AutomationToolkitLicenseObject.JSONify(
                            globalDataToJasonArray(data),
                            "stringify",
                            "\t",
                          ),
                        );
                        scriptFile.close();
                      } catch (err) {
                        scriptFile.close();
                      }
                    }
                  }
                }
              }
            }
            removePalElements2(pal);
            undoObject.currentScope = null;
            undoObject.history = [];
            undoObject.index = 0;
            lastRunTime = null;
            scroll_memory = 0;
            scroll_memory_x = 0;
            window_group = null;
            pal2 = null;
            group2 = null;
            groupe01 = null;
            groupe03 = null;
            group3 = null;
            groupe02 = null;
            group_scroll = null;
            for (var key in editorStaticUiContainer) {
              if (editorStaticUiContainer.hasOwnProperty(key)) {
                editorStaticUiContainer[key] = null;
              }
            }
            for (var key in editorDynamicUIContainer) {
              if (editorDynamicUIContainer.hasOwnProperty(key)) {
                editorDynamicUIContainer[key] = null;
              }
            }
            $.gc();
            $.gc();
            build_main_window(pal);
            pal.layout.layout(true);
            selectedLines = [];
          }
        };
        editorStaticUiContainer.savefunction.onClick = function () {
          removePalElements2(pal);
          if (isSecurityPrefSet()) {
            if (scriptFile.exists) {
              if (scriptFile.open("w")) {
                try {
                  scriptFile.write(
                    JSON.stringify(globalDataToJasonArray(data), null, 4),
                  );
                  scriptFile.close();
                } catch (err) {
                  scriptFile.close();
                }
              }
            }
          } else {
            if (errorMessege) {
              errorMessege = false;
              alert(
                "the automation \'\'" +
                  globalScope.name +
                  "\'\' can\'t be saved" +
                  "\r" +
                  "this script requires access to write files." +
                  "\r" +
                  "Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked." +
                  "\r" +
                  "then restart Automation Toolkit.",
              );
              try {
                app.executeCommand(2359);
                if (isSecurityPrefSet()) {
                  if (scriptFile.exists) {
                    if (scriptFile.open("w")) {
                      try {
                        scriptFile.write(
                          AutomationToolkitLicenseObject.JSONify(
                            globalDataToJasonArray(data),
                            "stringify",
                            "\t",
                          ),
                        );
                        scriptFile.close();
                      } catch (err) {
                        scriptFile.close();
                      }
                    }
                  }
                }
              } catch (e) {
                alert(e);
              }
            }
          }
          undoObject.currentScope = null;
          undoObject.history = [];
          undoObject.index = 0;
          lastRunTime = null;
          scroll_memory = 0;
          scroll_memory_x = 0;
          window_group = null;
          pal2 = null;
          group2 = null;
          groupe01 = null;
          groupe03 = null;
          group3 = null;
          groupe02 = null;
          group_scroll = null;
          for (var key in editorStaticUiContainer) {
            if (editorStaticUiContainer.hasOwnProperty(key)) {
              editorStaticUiContainer[key] = null;
            }
          }
          for (var key in editorDynamicUIContainer) {
            if (editorDynamicUIContainer.hasOwnProperty(key)) {
              editorDynamicUIContainer[key] = null;
            }
          }
          $.gc();
          $.gc();
          build_main_window(pal);
          pal.layout.layout(true);
          scroll_last_trget = 0;
          scroll_minimum_trget = -100;
          scroll_maximum_trget = 1450;
          selectedLines = [];
        };
        editorStaticUiContainer.okBtn.onClick = function () {
          var timeNow = new Date(Date(0));
          app.beginUndoGroup("Custom Automation");
          globalScope.run();
          app.endUndoGroup();
          var timeNow1 = new Date(Date(0));
          lastRunTime = (timeNow1.getTime() - timeNow.getTime()) / 1000;
          editorStaticUiContainer.scriptRunTimeTextUi.text =
            lastRunTime.toString() + "sec";
        };
      }
      function newUiCodeLine(
        command,
        commandType,
        panel,
        indentationGroup,
        indentation,
        refresh_list,
      ) {
        function panelMouseEventHandler(event) {
          try {
            if (event.type == "mouseover") {
              if (inArray(command, selectedLines) == false) {
                event.target.graphics.backgroundColor =
                  event.target.graphics.newBrush(
                    event.target.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0.04],
                  );
              }
            }
            if (event.type == "mouseout") {
              if (inArray(command, selectedLines) == false) {
                event.target.graphics.backgroundColor =
                  event.target.graphics.newBrush(
                    event.target.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0],
                  );
              } else {
                event.target.graphics.backgroundColor =
                  event.target.graphics.newBrush(
                    event.target.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0.09],
                  );
              }
            }
            color.graphics.backgroundColor = color.graphics.newBrush(
              color.graphics.BrushType.SOLID_COLOR,
              command.mainColor,
            );
            switch (commandType) {
              case "loop":
              case "if":
                if (command.scopeColor) {
                  color02.graphics.backgroundColor = color02.graphics.newBrush(
                    color02.graphics.BrushType.SOLID_COLOR,
                    command.scopeColor,
                  );
                }
                break;
            }
            event.target.notify("onDraw");
          } catch (e) {}
        }
        function panelMouseClickEventHandler(event) {
          function selectScope(thisCommand) {
            if (thisCommand.scope && thisCommand.scope.length) {
              for (var i = 0; i < thisCommand.scope.length; i += 1) {
                selectedLines.push(thisCommand.scope[i]);
                if (thisCommand.scope[i].hasOwnProperty("scope")) {
                  selectScope(thisCommand.scope[i]);
                }
              }
            }
          }
          function unselectScope(thisCommand) {
            if (thisCommand.scope && thisCommand.scope.length) {
              for (var i = 0; i < thisCommand.scope.length; i += 1) {
                removeFromArray(thisCommand.scope[i], selectedLines);
                if (thisCommand.scope[i].hasOwnProperty("scope")) {
                  unselectScope(thisCommand.scope[i]);
                }
              }
            }
          }
          try {
            if (event.ctrlKey) {
              if (inArray(command, selectedLines) == false) {
                selectedLines.push(command);
                command.panel.graphics.backgroundColor =
                  command.panel.graphics.newBrush(
                    command.panel.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0.09],
                  );
                command.updateColors();
                if (command.hasOwnProperty("scope")) {
                  if (command.collapse) {
                    selectScope(command);
                  }
                }
              } else {
                removeFromArray(command, selectedLines);
                command.panel.graphics.backgroundColor =
                  command.panel.graphics.newBrush(
                    command.panel.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0.04],
                  );
                command.updateColors();
                if (command.hasOwnProperty("scope")) {
                  if (command.collapse) {
                    unselectScope(command);
                  }
                }
              }
            }
            if (event.shiftKey) {
              if (inArray(command, selectedLines) == false) {
                selectedLines.push(command);
                var itemsToSelect = findHighlightLines(command);
                for (var i = 0; i < itemsToSelect.length; i += 1) {
                  selectedLines.push(itemsToSelect[i]);
                  if (itemsToSelect[i].panel != null) {
                    itemsToSelect[i].panel.graphics.backgroundColor =
                      itemsToSelect[i].panel.graphics.newBrush(
                        itemsToSelect[i].panel.graphics.BrushType.SOLID_COLOR,
                        [1, 1, 1, 0.09],
                      );
                    itemsToSelect[i].updateColors();
                  }
                }
                command.panel.graphics.backgroundColor =
                  command.panel.graphics.newBrush(
                    command.panel.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0.09],
                  );
                command.updateColors();
              }
            }
            if (event.altKey) {
              if (inArray(command, selectedLines)) {
                removeFromArray(command, selectedLines);
                command.panel.graphics.backgroundColor =
                  command.panel.graphics.newBrush(
                    command.panel.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0.04],
                  );
                command.updateColors();
              }
            }
            if (!event.shiftKey && !event.altKey && !event.ctrlKey) {
              var isCommandSelected = false;
              for (var i = 0; i < selectedLines.length; i += 1) {
                if (selectedLines[i] === command) {
                  isCommandSelected = true;
                } else {
                  if (selectedLines[i].panel != null) {
                    selectedLines[i].panel.graphics.backgroundColor =
                      selectedLines[i].panel.graphics.newBrush(
                        selectedLines[i].panel.graphics.BrushType.SOLID_COLOR,
                        [1, 1, 1, 0],
                      );
                    selectedLines[i].updateColors();
                  }
                }
              }
              if (isCommandSelected) {
                selectedLines = [];
                command.panel.graphics.backgroundColor =
                  panel.graphics.newBrush(
                    command.panel.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0],
                  );
                if (command.hasOwnProperty("scope")) {
                  if (command.collapse) {
                    unselectScope(command);
                  }
                }
              } else {
                selectedLines = [];
                selectedLines.push(command);
                command.panel.graphics.backgroundColor =
                  panel.graphics.newBrush(
                    command.panel.graphics.BrushType.SOLID_COLOR,
                    [1, 1, 1, 0.09],
                  );
                if (command.hasOwnProperty("scope")) {
                  if (command.collapse) {
                    selectScope(command);
                  }
                }
              }
              color.graphics.backgroundColor = color.graphics.newBrush(
                color.graphics.BrushType.SOLID_COLOR,
                command.mainColor,
              );
              switch (commandType) {
                case "loop":
                case "if":
                  if (command.scopeColor) {
                    color02.graphics.backgroundColor =
                      color02.graphics.newBrush(
                        color02.graphics.BrushType.SOLID_COLOR,
                        command.scopeColor,
                      );
                  }
                  break;
              }
            }
          } catch (e) {}
        }
        function updateColors1() {
          color.graphics.backgroundColor = color.graphics.newBrush(
            color.graphics.BrushType.SOLID_COLOR,
            command.mainColor,
          );
        }
        indentationGroup.margins = [0, 0, 0, 0];
        if (indentation > 0) {
          var tempIndentationStr = "11111";
          var finalIndentationStr = "";
          for (var i = 0; i < indentation; i += 1) {
            finalIndentationStr += tempIndentationStr;
          }
          editorDynamicUIContainer.indentation_text = indentationGroup.add(
            "statictext",
            undefined,
            finalIndentationStr,
            ["left", "bottom"],
          );
          editorDynamicUIContainer.indentation_text.visible = false;
        } else {
          indentationGroup.size = [0, 0];
        }
        panel.alignment = ["center", "top"];
        if (inArray(command, selectedLines)) {
          panel.graphics.backgroundColor = panel.graphics.newBrush(
            panel.graphics.BrushType.SOLID_COLOR,
            [1, 1, 1, 0.09],
          );
        } else {
          panel.graphics.backgroundColor = panel.graphics.newBrush(
            panel.graphics.BrushType.SOLID_COLOR,
            [1, 1, 1, 0],
          );
        }
        panel.addEventListener("mouseover", panelMouseEventHandler, false);
        panel.addEventListener("mouseout", panelMouseEventHandler, false);
        panel.addEventListener("click", panelMouseClickEventHandler, false);
        if (editMode) {
          function getDrawFuncrion(x, y, stroke, strokeWidth, strokeColor) {
            function customDraw() {
              with (this) {
                graphics.drawOSControl();
                graphics.rectPath(0, 0, size[0], size[1]);
                graphics.fillPath(fillBrush);
                if (stroke) {
                  graphics.strokePath(
                    graphics.newPen(
                      graphics.PenType.SOLID_COLOR,
                      strokeColor,
                      strokeWidth,
                    ),
                  );
                }
                if (text) {
                  graphics.drawString(
                    text,
                    textPen,
                    (size[0] -
                      graphics.measureString(text, graphics.font, size[0])[0]) /
                      2 +
                      x,
                    y,
                    graphics.font,
                  );
                }
              }
            }
            return customDraw;
          }
          function addLineFunction() {
            function testScopeLength() {
              if (command.scope) {
                if (command.scope.length > 0 && command.collapse == false) {
                  return false;
                } else {
                  return true;
                }
              } else {
                return true;
              }
            }
            for (var i = 0; i < command.parent.scope.length; i += 1) {
              if (command.parent.scope[i] === command) {
                commandIndex = i + 1;
                break;
              }
            }
            if (
              command.parent.scope.length == commandIndex &&
              testScopeLength() &&
              !(command.parent instanceof GlobalScope)
            ) {
              function findWhereToAdd(command) {
                function find(child) {
                  for (var i = 0; i < child.parent.scope.length; i += 1) {
                    if (child.parent.scope[i] === child) {
                      findIndex = i;
                      break;
                    }
                  }
                  if (child.parent.scope.length == findIndex + 1) {
                    if (child.parent instanceof GlobalScope) {
                      return [child.parent, findIndex + 1];
                    } else {
                      return find(child.parent);
                    }
                  } else {
                    return [child.parent, findIndex + 1];
                  }
                }
                return find(command);
              }
              for (var i = 0; i < command.parent.parent.scope.length; i += 1) {
                if (command.parent.parent.scope[i] === command.parent) {
                  commandIndex = i + 1;
                  break;
                }
              }
              var pointerAddLine = findWhereToAdd(command);
              if (
                pointerAddLine[0] instanceof ForLoop ||
                pointerAddLine[0] instanceof IfStatement
              ) {
                pointerAddLine[0].addToScopePosition(
                  new ForLoop(pointerAddLine[0]),
                  pointerAddLine[1],
                );
              } else {
                pointerAddLine[0].scope.splice(
                  pointerAddLine[1],
                  0,
                  new ForLoop(pointerAddLine[0]),
                );
              }
            } else {
              if (
                (command instanceof ForLoop ||
                  command instanceof IfStatement) &&
                command.collapse == false
              ) {
                if (command.scope.length > 0) {
                  command.addToScopePosition(new ForLoop(command), 0);
                } else {
                  if (
                    command.parent instanceof ForLoop ||
                    command.parent instanceof IfStatement
                  ) {
                    command.parent.addToScopePosition(
                      new ForLoop(command.parent),
                      commandIndex,
                    );
                  } else {
                    command.parent.scope.splice(
                      commandIndex,
                      0,
                      new ForLoop(command.parent),
                    );
                  }
                }
              } else {
                if (
                  command.parent instanceof ForLoop ||
                  command.parent instanceof IfStatement
                ) {
                  command.parent.addToScopePosition(
                    new ForLoop(command.parent),
                    commandIndex,
                  );
                } else {
                  command.parent.scope.splice(
                    commandIndex,
                    0,
                    new ForLoop(command.parent),
                  );
                }
              }
            }
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          }
          var firstCommand = false;
          if (command.parent instanceof GlobalScope) {
            if (command.parent.scope.length > 0) {
              if (command.parent.scope[0] === command) {
                function addFirstLinebtnMouseEventHandler(event) {
                  try {
                    if (event.type == "mouseover") {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -5,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                      event.target.fillBrush = event.target.graphics.newBrush(
                        event.target.graphics.BrushType.SOLID_COLOR,
                        [0.6, 0.6, 0.6, 1],
                      );
                      event.target.textPen = event.target.graphics.newPen(
                        event.target.graphics.PenType.SOLID_COLOR,
                        [0, 0, 0, 1],
                        1,
                      );
                    }
                    if (event.type == "mouseout") {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -5,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                      event.target.textPen = event.target.graphics.newPen(
                        event.target.graphics.PenType.SOLID_COLOR,
                        [0.2, 0.5, 0.9, 1],
                        1,
                      );
                      event.target.fillBrush = event.target.graphics.newBrush(
                        event.target.graphics.BrushType.SOLID_COLOR,
                        [0.03, 0.31, 1, 0.2],
                      );
                    }
                    event.target.notify("onDraw");
                  } catch (e) {}
                }
                function addLineFistLinebtnMouseEventHandler(event) {
                  try {
                    if (event.type == "mouseover") {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -5,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                      event.target.fillBrush = event.target.graphics.newBrush(
                        event.target.graphics.BrushType.SOLID_COLOR,
                        [0.6, 0.6, 0.6, 1],
                      );
                      event.target.textPen = event.target.graphics.newPen(
                        event.target.graphics.PenType.SOLID_COLOR,
                        [0, 0, 0, 1],
                        1,
                      );
                    }
                    if (event.type == "mouseout") {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -5,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                      event.target.textPen = event.target.graphics.newPen(
                        event.target.graphics.PenType.SOLID_COLOR,
                        [0.2, 0.5, 0.9, 1],
                        1,
                      );
                      event.target.fillBrush = event.target.graphics.newBrush(
                        event.target.graphics.BrushType.SOLID_COLOR,
                        [0.03, 0.31, 1, 0.2],
                      );
                    }
                    event.target.notify("onDraw");
                  } catch (e) {}
                }
                firstCommand = true;
                editorDynamicUIContainer.buttonsGroup = indentationGroup.add(
                  "group",
                  undefined,
                  undefined,
                );
                editorDynamicUIContainer.buttonsGroup.alignment = [
                  "center",
                  "top",
                ];
                editorDynamicUIContainer.buttonsGroup.orientation = "column";
                editorDynamicUIContainer.buttonsGroup.minimumSize = [10, 40];
                editorDynamicUIContainer.buttonsGroup.maximumSize = [
                  editorDynamicUIContainer.buttonsGroup.minimumSize[0],
                  editorDynamicUIContainer.buttonsGroup.minimumSize[1],
                ];
                editorDynamicUIContainer.buttonsGroup.margins = [0, 0, 0, 0];
                editorDynamicUIContainer.buttonsGroup.spacing = 0;
                editorDynamicUIContainer.addFirstLine =
                  editorDynamicUIContainer.buttonsGroup.add(
                    "button",
                    undefined,
                    "+",
                    ["left", "bottom"],
                    { style: "toolbutton" },
                  );
                editorDynamicUIContainer.addFirstLine.helpTip =
                  "Add an automation line above this line";
                editorDynamicUIContainer.addFirstLine.preferredSize = [10, 20];
                editorDynamicUIContainer.addFirstLine.onClick = function () {
                  command.parent.scope.splice(
                    0,
                    0,
                    new ForLoop(command.parent),
                  );
                  refreshUi(refresh_list[0], refresh_list[1]);
                  generateUndoStep();
                };
                editorDynamicUIContainer.addFirstLine.fillBrush =
                  editorDynamicUIContainer.addFirstLine.graphics.newBrush(
                    editorDynamicUIContainer.addFirstLine.graphics.BrushType
                      .SOLID_COLOR,
                    [0.03, 0.31, 1, 0.2],
                  );
                editorDynamicUIContainer.addFirstLine.textPen =
                  editorDynamicUIContainer.addFirstLine.graphics.newPen(
                    editorDynamicUIContainer.addFirstLine.graphics.PenType
                      .SOLID_COLOR,
                    [0.2, 0.5, 0.9, 1],
                    5,
                  );
                editorDynamicUIContainer.addFirstLine.graphics.font =
                  "Arial-Bold:18";
                editorDynamicUIContainer.addFirstLine.onDraw = getDrawFuncrion(
                  -1,
                  -5,
                  false,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
                editorDynamicUIContainer.addFirstLine.addEventListener(
                  "mouseover",
                  addFirstLinebtnMouseEventHandler,
                  false,
                );
                editorDynamicUIContainer.addFirstLine.addEventListener(
                  "mouseout",
                  addFirstLinebtnMouseEventHandler,
                  false,
                );
                editorDynamicUIContainer.addLineFistLine =
                  editorDynamicUIContainer.buttonsGroup.add(
                    "button",
                    undefined,
                    "+",
                    ["left", "bottom"],
                    { style: "toolbutton" },
                  );
                editorDynamicUIContainer.addLineFistLine.onClick =
                  addLineFunction;
                editorDynamicUIContainer.addLineFistLine.helpTip =
                  "Add an automation line below this line";
                editorDynamicUIContainer.addLineFistLine.preferredSize = [
                  10, 20,
                ];
                editorDynamicUIContainer.addLineFistLine.fillBrush =
                  editorDynamicUIContainer.addLineFistLine.graphics.newBrush(
                    editorDynamicUIContainer.addLineFistLine.graphics.BrushType
                      .SOLID_COLOR,
                    [0.03, 0.31, 1, 0.2],
                  );
                editorDynamicUIContainer.addLineFistLine.textPen =
                  editorDynamicUIContainer.addLineFistLine.graphics.newPen(
                    editorDynamicUIContainer.addLineFistLine.graphics.PenType
                      .SOLID_COLOR,
                    [0.2, 0.5, 0.9, 1],
                    5,
                  );
                editorDynamicUIContainer.addLineFistLine.graphics.font =
                  "Arial-Bold:18";
                editorDynamicUIContainer.addLineFistLine.onDraw =
                  getDrawFuncrion(-1, -5, false, 2, [0.6, 0.6, 0.6, 1]);
                editorDynamicUIContainer.addLineFistLine.addEventListener(
                  "mouseover",
                  addLineFistLinebtnMouseEventHandler,
                  false,
                );
                editorDynamicUIContainer.addLineFistLine.addEventListener(
                  "mouseout",
                  addLineFistLinebtnMouseEventHandler,
                  false,
                );
              }
            }
          }
          if (!firstCommand) {
            function addLinebtnMouseEventHandler(event) {
              try {
                if (event.type == "mouseover") {
                  if (operatingSystem == "Windows") {
                    event.target.onDraw = getDrawFuncrion(
                      -1,
                      -12,
                      false,
                      2,
                      [0.6, 0.6, 0.6, 1],
                    );
                  } else {
                    event.target.onDraw = getDrawFuncrion(
                      -1,
                      -4,
                      false,
                      2,
                      [0.6, 0.6, 0.6, 1],
                    );
                  }
                  event.target.fillBrush = event.target.graphics.newBrush(
                    event.target.graphics.BrushType.SOLID_COLOR,
                    [0.6, 0.6, 0.6, 1],
                  );
                  event.target.textPen = event.target.graphics.newPen(
                    event.target.graphics.PenType.SOLID_COLOR,
                    [0, 0, 0, 1],
                    1,
                  );
                }
                if (event.type == "mouseout") {
                  if (operatingSystem == "Windows") {
                    event.target.onDraw = getDrawFuncrion(
                      -1,
                      -12,
                      false,
                      2,
                      [0.6, 0.6, 0.6, 1],
                    );
                  } else {
                    event.target.onDraw = getDrawFuncrion(
                      -1,
                      -4,
                      false,
                      2,
                      [0.6, 0.6, 0.6, 1],
                    );
                  }
                  event.target.textPen = event.target.graphics.newPen(
                    event.target.graphics.PenType.SOLID_COLOR,
                    [0.2, 0.5, 0.9, 1],
                    1,
                  );
                  event.target.fillBrush = event.target.graphics.newBrush(
                    event.target.graphics.BrushType.SOLID_COLOR,
                    [0.03, 0.31, 1, 0.2],
                  );
                }
                event.target.notify("onDraw");
              } catch (e) {}
            }
            editorDynamicUIContainer.addLine = indentationGroup.add(
              "button",
              undefined,
              "+\n\u2bae",
              ["left", "bottom"],
              { style: "toolbutton" },
            );
            editorDynamicUIContainer.addLine.helpTip =
              "Add an automation line below this line";
            editorDynamicUIContainer.addLine.preferredSize = [10, 40];
            editorDynamicUIContainer.addLine.fillBrush =
              editorDynamicUIContainer.addLine.graphics.newBrush(
                editorDynamicUIContainer.addLine.graphics.BrushType.SOLID_COLOR,
                [0.03, 0.31, 1, 0.2],
              );
            editorDynamicUIContainer.addLine.textPen =
              editorDynamicUIContainer.addLine.graphics.newPen(
                editorDynamicUIContainer.addLine.graphics.PenType.SOLID_COLOR,
                [0.2, 0.5, 0.9, 1],
                5,
              );
            editorDynamicUIContainer.addLine.graphics.font = "Arial-Bold:18";
            if (operatingSystem == "Windows") {
              editorDynamicUIContainer.addLine.onDraw = getDrawFuncrion(
                -1,
                -12,
                false,
                2,
                [0.6, 0.6, 0.6, 1],
              );
            } else {
              editorDynamicUIContainer.addLine.onDraw = getDrawFuncrion(
                -1,
                -4,
                false,
                2,
                [0.6, 0.6, 0.6, 1],
              );
            }
            editorDynamicUIContainer.addLine.addEventListener(
              "mouseover",
              addLinebtnMouseEventHandler,
              false,
            );
            editorDynamicUIContainer.addLine.addEventListener(
              "mouseout",
              addLinebtnMouseEventHandler,
              false,
            );
            editorDynamicUIContainer.addLine.onClick = addLineFunction;
          }
        } else {
          if (pasteMode) {
            function getDrawFuncrion(x, y, stroke, strokeWidth, strokeColor) {
              function customDraw() {
                with (this) {
                  graphics.drawOSControl();
                  graphics.rectPath(0, 0, size[0], size[1]);
                  graphics.fillPath(fillBrush);
                  if (stroke) {
                    graphics.strokePath(
                      graphics.newPen(
                        graphics.PenType.SOLID_COLOR,
                        strokeColor,
                        strokeWidth,
                      ),
                    );
                  }
                  if (text) {
                    graphics.drawString(
                      text,
                      textPen,
                      (size[0] -
                        graphics.measureString(
                          text,
                          graphics.font,
                          size[0],
                        )[0]) /
                        2 +
                        x,
                      y,
                      graphics.font,
                    );
                  }
                }
              }
              return customDraw;
            }
            function addLineFunction() {
              function testScopeLength() {
                if (command.scope) {
                  if (command.scope.length > 0 && command.collapse == false) {
                    return false;
                  } else {
                    return true;
                  }
                } else {
                  return true;
                }
              }
              for (var i = 0; i < command.parent.scope.length; i += 1) {
                if (command.parent.scope[i] === command) {
                  commandIndex = i + 1;
                  break;
                }
              }
              if (
                command.parent.scope.length == commandIndex &&
                testScopeLength() &&
                !(command.parent instanceof GlobalScope)
              ) {
                function findWhereToAdd(command) {
                  function find(child) {
                    for (var i = 0; i < child.parent.scope.length; i += 1) {
                      if (child.parent.scope[i] === child) {
                        findIndex = i;
                        break;
                      }
                    }
                    if (child.parent.scope.length == findIndex + 1) {
                      if (child.parent instanceof GlobalScope) {
                        return [child.parent, findIndex + 1];
                      } else {
                        return find(child.parent);
                      }
                    } else {
                      return [child.parent, findIndex + 1];
                    }
                  }
                  return find(command);
                }
                for (
                  var i = 0;
                  i < command.parent.parent.scope.length;
                  i += 1
                ) {
                  if (command.parent.parent.scope[i] === command.parent) {
                    commandIndex = i + 1;
                    break;
                  }
                }
                var pointerAddLine = findWhereToAdd(command);
                if (
                  pointerAddLine[0] instanceof ForLoop ||
                  pointerAddLine[0] instanceof IfStatement
                ) {
                  var newlines = scopeToObject(copiedData, pointerAddLine[0]);
                  fixDuplicatesNames(newlines, findGolbalScope(command));
                  for (var i = 0; i < newlines.length; i += 1) {
                    pointerAddLine[0].addToScopePosition(
                      newlines[i],
                      pointerAddLine[1],
                    );
                    pointerAddLine[1] = pointerAddLine[1] + 1;
                  }
                } else {
                  var newlines = scopeToObject(copiedData, pointerAddLine[0]);
                  fixDuplicatesNames(newlines, findGolbalScope(command));
                  for (var i = 0; i < newlines.length; i += 1) {
                    newlines[i].mainColor = [
                      Math.random(),
                      Math.random(),
                      Math.random(),
                      1,
                    ];
                    pointerAddLine[0].scope.splice(
                      pointerAddLine[1],
                      0,
                      newlines[i],
                    );
                    pointerAddLine[1] = pointerAddLine[1] + 1;
                  }
                }
              } else {
                if (
                  (command instanceof ForLoop ||
                    command instanceof IfStatement) &&
                  command.collapse == false
                ) {
                  if (command.scope.length > 0) {
                    var newlines = scopeToObject(copiedData, command);
                    fixDuplicatesNames(newlines, findGolbalScope(command));
                    for (var i = 0; i < newlines.length; i += 1) {
                      command.addToScopePosition(newlines[i], i);
                    }
                  } else {
                    if (
                      command.parent instanceof ForLoop ||
                      command.parent instanceof IfStatement
                    ) {
                      var addCommandIndex = commandIndex;
                      var newlines = scopeToObject(copiedData, command.parent);
                      fixDuplicatesNames(newlines, findGolbalScope(command));
                      for (var i = 0; i < newlines.length; i += 1) {
                        command.parent.addToScopePosition(
                          newlines[i],
                          addCommandIndex,
                        );
                        addCommandIndex++;
                      }
                    } else {
                      var addCommandIndex = commandIndex;
                      var newlines = scopeToObject(copiedData, command.parent);
                      fixDuplicatesNames(newlines, findGolbalScope(command));
                      for (var i = 0; i < newlines.length; i += 1) {
                        newlines[i].mainColor = [
                          Math.random(),
                          Math.random(),
                          Math.random(),
                          1,
                        ];
                        command.parent.scope.splice(
                          addCommandIndex,
                          0,
                          newlines[i],
                        );
                        addCommandIndex++;
                      }
                    }
                  }
                } else {
                  if (
                    command.parent instanceof ForLoop ||
                    command.parent instanceof IfStatement
                  ) {
                    var addCommandIndex = commandIndex;
                    var newlines = scopeToObject(copiedData, command.parent);
                    fixDuplicatesNames(newlines, findGolbalScope(command));
                    for (var i = 0; i < newlines.length; i += 1) {
                      command.parent.addToScopePosition(
                        newlines[i],
                        addCommandIndex,
                      );
                      addCommandIndex++;
                    }
                  } else {
                    var addCommandIndex = commandIndex;
                    var newlines = scopeToObject(copiedData, command.parent);
                    fixDuplicatesNames(newlines, findGolbalScope(command));
                    for (var i = 0; i < newlines.length; i += 1) {
                      newlines[i].mainColor = [
                        Math.random(),
                        Math.random(),
                        Math.random(),
                        1,
                      ];
                      command.parent.scope.splice(
                        addCommandIndex,
                        0,
                        newlines[i],
                      );
                      addCommandIndex++;
                    }
                  }
                }
              }
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            }
            var firstCommand = false;
            if (command.parent instanceof GlobalScope) {
              if (command.parent.scope.length > 0) {
                if (command.parent.scope[0] === command) {
                  function addFirstLinebtnMouseEventHandler(event) {
                    try {
                      if (event.type == "mouseover") {
                        event.target.onDraw = getDrawFuncrion(
                          -1,
                          -5,
                          false,
                          2,
                          [0.6, 0.6, 0.6, 1],
                        );
                        event.target.fillBrush = event.target.graphics.newBrush(
                          event.target.graphics.BrushType.SOLID_COLOR,
                          [0.6, 0.6, 0.6, 1],
                        );
                        event.target.textPen = event.target.graphics.newPen(
                          event.target.graphics.PenType.SOLID_COLOR,
                          [0, 0, 0, 1],
                          1,
                        );
                      }
                      if (event.type == "mouseout") {
                        event.target.onDraw = getDrawFuncrion(
                          -1,
                          -5,
                          false,
                          2,
                          [0.6, 0.6, 0.6, 1],
                        );
                        event.target.textPen = event.target.graphics.newPen(
                          event.target.graphics.PenType.SOLID_COLOR,
                          [0.2, 0.5, 0.9, 1],
                          1,
                        );
                        event.target.fillBrush = event.target.graphics.newBrush(
                          event.target.graphics.BrushType.SOLID_COLOR,
                          [0.03, 0.31, 1, 0.2],
                        );
                      }
                      event.target.notify("onDraw");
                    } catch (e) {}
                  }
                  function addLineFistLinebtnMouseEventHandler(event) {
                    try {
                      if (event.type == "mouseover") {
                        event.target.onDraw = getDrawFuncrion(
                          -1,
                          -5,
                          false,
                          2,
                          [0.6, 0.6, 0.6, 1],
                        );
                        event.target.fillBrush = event.target.graphics.newBrush(
                          event.target.graphics.BrushType.SOLID_COLOR,
                          [0.6, 0.6, 0.6, 1],
                        );
                        event.target.textPen = event.target.graphics.newPen(
                          event.target.graphics.PenType.SOLID_COLOR,
                          [0, 0, 0, 1],
                          1,
                        );
                      }
                      if (event.type == "mouseout") {
                        event.target.onDraw = getDrawFuncrion(
                          -1,
                          -5,
                          false,
                          2,
                          [0.6, 0.6, 0.6, 1],
                        );
                        event.target.textPen = event.target.graphics.newPen(
                          event.target.graphics.PenType.SOLID_COLOR,
                          [0.2, 0.5, 0.9, 1],
                          1,
                        );
                        event.target.fillBrush = event.target.graphics.newBrush(
                          event.target.graphics.BrushType.SOLID_COLOR,
                          [0.03, 0.31, 1, 0.2],
                        );
                      }
                      event.target.notify("onDraw");
                    } catch (e) {}
                  }
                  firstCommand = true;
                  editorDynamicUIContainer.buttonsGroup = indentationGroup.add(
                    "group",
                    undefined,
                    undefined,
                  );
                  editorDynamicUIContainer.buttonsGroup.alignment = [
                    "center",
                    "top",
                  ];
                  editorDynamicUIContainer.buttonsGroup.orientation = "column";
                  editorDynamicUIContainer.buttonsGroup.minimumSize = [10, 40];
                  editorDynamicUIContainer.buttonsGroup.maximumSize = [
                    editorDynamicUIContainer.buttonsGroup.minimumSize[0],
                    editorDynamicUIContainer.buttonsGroup.minimumSize[1],
                  ];
                  editorDynamicUIContainer.buttonsGroup.margins = [0, 0, 0, 0];
                  editorDynamicUIContainer.buttonsGroup.spacing = 0;
                  editorDynamicUIContainer.addFirstLine =
                    editorDynamicUIContainer.buttonsGroup.add(
                      "button",
                      undefined,
                      "+",
                      ["left", "bottom"],
                      { style: "toolbutton" },
                    );
                  editorDynamicUIContainer.addFirstLine.helpTip =
                    "Add an automation line above this line";
                  editorDynamicUIContainer.addFirstLine.preferredSize = [
                    10, 20,
                  ];
                  editorDynamicUIContainer.addFirstLine.onClick = function () {
                    var newlines = scopeToObject(copiedData, command.parent);
                    fixDuplicatesNames(newlines, findGolbalScope(command));
                    for (var i = 0; i < newlines.length; i += 1) {
                      newlines[i].mainColor = [
                        Math.random(),
                        Math.random(),
                        Math.random(),
                        1,
                      ];
                      command.parent.scope.splice(i, 0, newlines[i]);
                    }
                    refreshUi(refresh_list[0], refresh_list[1]);
                    generateUndoStep();
                  };
                  editorDynamicUIContainer.addFirstLine.fillBrush =
                    editorDynamicUIContainer.addFirstLine.graphics.newBrush(
                      editorDynamicUIContainer.addFirstLine.graphics.BrushType
                        .SOLID_COLOR,
                      [0.03, 0.31, 1, 0.2],
                    );
                  editorDynamicUIContainer.addFirstLine.textPen =
                    editorDynamicUIContainer.addFirstLine.graphics.newPen(
                      editorDynamicUIContainer.addFirstLine.graphics.PenType
                        .SOLID_COLOR,
                      [0.2, 0.5, 0.9, 1],
                      5,
                    );
                  editorDynamicUIContainer.addFirstLine.graphics.font =
                    "Arial-Bold:18";
                  editorDynamicUIContainer.addFirstLine.onDraw =
                    getDrawFuncrion(-1, -5, false, 2, [0.6, 0.6, 0.6, 1]);
                  editorDynamicUIContainer.addFirstLine.addEventListener(
                    "mouseover",
                    addFirstLinebtnMouseEventHandler,
                    false,
                  );
                  editorDynamicUIContainer.addFirstLine.addEventListener(
                    "mouseout",
                    addFirstLinebtnMouseEventHandler,
                    false,
                  );
                  editorDynamicUIContainer.addLineFistLine =
                    editorDynamicUIContainer.buttonsGroup.add(
                      "button",
                      undefined,
                      "+",
                      ["left", "bottom"],
                      { style: "toolbutton" },
                    );
                  editorDynamicUIContainer.addLineFistLine.onClick =
                    addLineFunction;
                  editorDynamicUIContainer.addLineFistLine.helpTip =
                    "Add an automation line below this line";
                  editorDynamicUIContainer.addLineFistLine.preferredSize = [
                    10, 20,
                  ];
                  editorDynamicUIContainer.addLineFistLine.fillBrush =
                    editorDynamicUIContainer.addLineFistLine.graphics.newBrush(
                      editorDynamicUIContainer.addLineFistLine.graphics
                        .BrushType.SOLID_COLOR,
                      [0.03, 0.31, 1, 0.2],
                    );
                  editorDynamicUIContainer.addLineFistLine.textPen =
                    editorDynamicUIContainer.addLineFistLine.graphics.newPen(
                      editorDynamicUIContainer.addLineFistLine.graphics.PenType
                        .SOLID_COLOR,
                      [0.2, 0.5, 0.9, 1],
                      5,
                    );
                  editorDynamicUIContainer.addLineFistLine.graphics.font =
                    "Arial-Bold:18";
                  editorDynamicUIContainer.addLineFistLine.onDraw =
                    getDrawFuncrion(-1, -5, false, 2, [0.6, 0.6, 0.6, 1]);
                  editorDynamicUIContainer.addLineFistLine.addEventListener(
                    "mouseover",
                    addLineFistLinebtnMouseEventHandler,
                    false,
                  );
                  editorDynamicUIContainer.addLineFistLine.addEventListener(
                    "mouseout",
                    addLineFistLinebtnMouseEventHandler,
                    false,
                  );
                }
              }
            }
            if (!firstCommand) {
              function addLinebtnMouseEventHandler(event) {
                try {
                  if (event.type == "mouseover") {
                    if (operatingSystem == "Windows") {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -12,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                    } else {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -4,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                    }
                    event.target.fillBrush = event.target.graphics.newBrush(
                      event.target.graphics.BrushType.SOLID_COLOR,
                      [0.6, 0.6, 0.6, 1],
                    );
                    event.target.textPen = event.target.graphics.newPen(
                      event.target.graphics.PenType.SOLID_COLOR,
                      [0, 0, 0, 1],
                      1,
                    );
                  }
                  if (event.type == "mouseout") {
                    if (operatingSystem == "Windows") {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -12,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                    } else {
                      event.target.onDraw = getDrawFuncrion(
                        -1,
                        -4,
                        false,
                        2,
                        [0.6, 0.6, 0.6, 1],
                      );
                    }
                    event.target.textPen = event.target.graphics.newPen(
                      event.target.graphics.PenType.SOLID_COLOR,
                      [0.2, 0.5, 0.9, 1],
                      1,
                    );
                    event.target.fillBrush = event.target.graphics.newBrush(
                      event.target.graphics.BrushType.SOLID_COLOR,
                      [0.03, 0.31, 1, 0.2],
                    );
                  }
                  event.target.notify("onDraw");
                } catch (e) {}
              }
              editorDynamicUIContainer.addLine = indentationGroup.add(
                "button",
                undefined,
                "+\n\u2bae",
                ["left", "bottom"],
                { style: "toolbutton" },
              );
              editorDynamicUIContainer.addLine.helpTip =
                "Add an automation line below this line";
              editorDynamicUIContainer.addLine.preferredSize = [10, 40];
              editorDynamicUIContainer.addLine.fillBrush =
                editorDynamicUIContainer.addLine.graphics.newBrush(
                  editorDynamicUIContainer.addLine.graphics.BrushType
                    .SOLID_COLOR,
                  [0.03, 0.31, 1, 0.2],
                );
              editorDynamicUIContainer.addLine.textPen =
                editorDynamicUIContainer.addLine.graphics.newPen(
                  editorDynamicUIContainer.addLine.graphics.PenType.SOLID_COLOR,
                  [0.2, 0.5, 0.9, 1],
                  5,
                );
              editorDynamicUIContainer.addLine.graphics.font = "Arial-Bold:18";
              if (operatingSystem == "Windows") {
                editorDynamicUIContainer.addLine.onDraw = getDrawFuncrion(
                  -1,
                  -12,
                  false,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              } else {
                editorDynamicUIContainer.addLine.onDraw = getDrawFuncrion(
                  -1,
                  -4,
                  false,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
              }
              editorDynamicUIContainer.addLine.addEventListener(
                "mouseover",
                addLinebtnMouseEventHandler,
                false,
              );
              editorDynamicUIContainer.addLine.addEventListener(
                "mouseout",
                addLinebtnMouseEventHandler,
                false,
              );
              editorDynamicUIContainer.addLine.onClick = addLineFunction;
            }
          }
        }
        var color = panel.add("group", undefined, undefined);
        panel.orientation = "row";
        panel.minimumSize = [2000, 40];
        panel.maximumSize = [panel.minimumSize[0], panel.minimumSize[1]];
        color.minimumSize = [10, 10];
        color.graphics.backgroundColor = color.graphics.newBrush(
          color.graphics.BrushType.SOLID_COLOR,
          command.mainColor,
        );
        command.updateColors = updateColors1;
        switch (commandType) {
          case "loop":
          case "if":
            if (
              commandType == "loop" &&
              command.iterationsType instanceof BreakLoopIterationObject
            ) {
              editorDynamicUIContainer.activeCheckbox = panel.add(
                "checkbox",
                undefined,
                undefined,
              );
            } else {
              function btnCollapseMouseEventHandler(event) {
                try {
                  if (event.type == "mouseover") {
                    if (operatingSystem == "Windows") {
                      event.target.onDraw = getCollapseDrawFuncrion(
                        -3,
                        -2,
                        ButtonStroke,
                        0,
                        [0.6, 0.6, 0.6, 1],
                      );
                    } else {
                      event.target.onDraw = getCollapseDrawFuncrion(
                        -1,
                        0,
                        ButtonStroke,
                        0,
                        [0.6, 0.6, 0.6, 1],
                      );
                    }
                    event.target.fillBrush = event.target.graphics.newBrush(
                      event.target.graphics.BrushType.SOLID_COLOR,
                      [0.6, 0.6, 0.6, 1],
                    );
                    event.target.textPen = event.target.graphics.newPen(
                      event.target.graphics.PenType.SOLID_COLOR,
                      [0, 0, 0, 1],
                      0,
                    );
                  }
                  if (event.type == "mouseout") {
                    if (operatingSystem == "Windows") {
                      event.target.onDraw = getCollapseDrawFuncrion(
                        -3,
                        -2,
                        ButtonStroke,
                        0,
                        [0.6, 0.6, 0.6, 1],
                      );
                    } else {
                      event.target.onDraw = getCollapseDrawFuncrion(
                        -1,
                        0,
                        ButtonStroke,
                        0,
                        [0.6, 0.6, 0.6, 1],
                      );
                    }
                    event.target.textPen = event.target.graphics.newPen(
                      event.target.graphics.PenType.SOLID_COLOR,
                      [0.6, 0.6, 0.6, 1],
                      0,
                    );
                    event.target.fillBrush = event.target.graphics.newBrush(
                      event.target.graphics.BrushType.SOLID_COLOR,
                      [1, 1, 1, 0],
                    );
                  }
                  event.target.notify("onDraw");
                } catch (e) {}
              }
              function getCollapseDrawFuncrion(
                x,
                y,
                stroke,
                strokeWidth,
                strokeColor,
              ) {
                function customDraw() {
                  with (this) {
                    graphics.drawOSControl();
                    graphics.rectPath(0, 0, size[0], size[1]);
                    graphics.fillPath(fillBrush);
                    if (stroke) {
                      graphics.strokePath(
                        graphics.newPen(
                          graphics.PenType.SOLID_COLOR,
                          strokeColor,
                          strokeWidth,
                        ),
                      );
                    }
                    if (text) {
                      graphics.drawString(
                        text,
                        textPen,
                        (size[0] -
                          graphics.measureString(
                            text,
                            graphics.font,
                            size[0],
                          )[0]) /
                          2 +
                          x,
                        y,
                        graphics.font,
                      );
                    }
                  }
                }
                return customDraw;
              }
              var color02 = panel.add("group", undefined, undefined);
              color02.minimumSize = [5, 10];
              if (command.scopeColor) {
                function updateColors2() {
                  color.graphics.backgroundColor = color.graphics.newBrush(
                    color.graphics.BrushType.SOLID_COLOR,
                    command.mainColor,
                  );
                  color02.graphics.backgroundColor = color02.graphics.newBrush(
                    color02.graphics.BrushType.SOLID_COLOR,
                    command.scopeColor,
                  );
                }
                color02.graphics.backgroundColor = color02.graphics.newBrush(
                  color02.graphics.BrushType.SOLID_COLOR,
                  command.scopeColor,
                );
                command.updateColors = updateColors2;
              }
              editorDynamicUIContainer.activeCheckbox = panel.add(
                "checkbox",
                undefined,
                undefined,
              );
              var collapseBtnIcon = "";
              if (command.collapse == true) {
                if (operatingSystem == "Windows") {
                  collapseBtnIcon = "\u25ba";
                } else {
                  collapseBtnIcon = "\u25ba";
                }
              }
              if (command.collapse == false) {
                if (operatingSystem == "Windows") {
                  collapseBtnIcon = "\u25bc";
                } else {
                  collapseBtnIcon = "\u25bc";
                }
              }
              editorDynamicUIContainer.collapseBtn = panel.add(
                "button",
                undefined,
                collapseBtnIcon,
                ["left", "bottom"],
                { style: "toolbutton" },
              );
              editorDynamicUIContainer.collapseBtn.helpTip = "Collapse";
              editorDynamicUIContainer.collapseBtn.preferredSize = [20, 20];
              editorDynamicUIContainer.collapseBtn.fillBrush =
                editorDynamicUIContainer.collapseBtn.graphics.newBrush(
                  editorDynamicUIContainer.collapseBtn.graphics.BrushType
                    .SOLID_COLOR,
                  [0, 0, 0, 0],
                );
              editorDynamicUIContainer.collapseBtn.textPen =
                editorDynamicUIContainer.collapseBtn.graphics.newPen(
                  editorDynamicUIContainer.collapseBtn.graphics.PenType
                    .SOLID_COLOR,
                  [0.6, 0.6, 0.6, 1],
                  0,
                );
              editorDynamicUIContainer.collapseBtn.graphics.font =
                "Arial-Bold:12";
              if (operatingSystem == "Windows") {
                editorDynamicUIContainer.collapseBtn.onDraw =
                  getCollapseDrawFuncrion(
                    -3,
                    -2,
                    ButtonStroke,
                    0,
                    [0.6, 0.6, 0.6, 0],
                  );
              } else {
                editorDynamicUIContainer.collapseBtn.onDraw =
                  getCollapseDrawFuncrion(
                    -1,
                    0,
                    ButtonStroke,
                    0,
                    [0.6, 0.6, 0.6, 0],
                  );
              }
              editorDynamicUIContainer.collapseBtn.addEventListener(
                "mouseover",
                btnCollapseMouseEventHandler,
                false,
              );
              editorDynamicUIContainer.collapseBtn.addEventListener(
                "mouseout",
                btnCollapseMouseEventHandler,
                false,
              );
              editorDynamicUIContainer.collapseBtn.onClick = function () {
                if (command.collapse == true) {
                  command.collapse = false;
                } else {
                  if (command.collapse == false) {
                    command.collapse = true;
                  }
                }
                if (inArray(command, selectedLines)) {
                  for (var i = 0; i < selectedLines.length; i += 1) {
                    if (
                      selectedLines[i] instanceof ForLoop ||
                      selectedLines[i] instanceof IfStatement
                    ) {
                      selectedLines[i].collapse = command.collapse;
                    }
                  }
                }
                refreshUi(refresh_list[0], refresh_list[1]);
              };
              break;
            }
        }
        if (commandType != "loop" && commandType != "if") {
          editorDynamicUIContainer.activeCheckbox = panel.add(
            "checkbox",
            undefined,
            undefined,
          );
        }
        editorDynamicUIContainer.activeCheckbox.helpTip = "active";
        if (command.hasOwnProperty("enabled")) {
          editorDynamicUIContainer.activeCheckbox.value = command.enabled;
        } else {
          command.enabled = true;
          editorDynamicUIContainer.activeCheckbox.value = true;
        }
        if (editorDynamicUIContainer.activeCheckbox.value == false) {
          editorDynamicUIContainer.textDisabled = panel.add(
            "statictext",
            undefined,
            undefined,
            { name: "statictext2" },
          );
          editorDynamicUIContainer.textDisabled.text = "{Disabled}";
        }
        editorDynamicUIContainer.activeCheckbox.onClick = function () {
          command.enabled = this.value;
          if (inArray(command, selectedLines)) {
            for (var i = 0; i < selectedLines.length; i += 1) {
              selectedLines[i].enabled = this.value;
            }
          }
          refreshUi(refresh_list[0], refresh_list[1]);
          generateUndoStep();
        };
        if (
          commandType == "loop" ||
          commandType == "ListBox" ||
          commandType == "message" ||
          commandType == "variable"
        ) {
          function btnMouseEventHandler(event) {
            try {
              if (event.type == "mouseover") {
                event.target.onDraw = getDrawFuncrion(
                  -4,
                  -2,
                  ButtonStroke,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
                event.target.fillBrush = event.target.graphics.newBrush(
                  event.target.graphics.BrushType.SOLID_COLOR,
                  [0.6, 0.6, 0.6, 1],
                );
                event.target.textPen = event.target.graphics.newPen(
                  event.target.graphics.PenType.SOLID_COLOR,
                  [0, 0, 0, 1],
                  1,
                );
              }
              if (event.type == "mouseout") {
                event.target.onDraw = getDrawFuncrion(
                  -4,
                  -2,
                  ButtonStroke,
                  2,
                  [0.6, 0.6, 0.6, 1],
                );
                event.target.textPen = event.target.graphics.newPen(
                  event.target.graphics.PenType.SOLID_COLOR,
                  [0.6, 0.6, 0.6, 1],
                  1,
                );
                event.target.fillBrush = event.target.graphics.newBrush(
                  event.target.graphics.BrushType.SOLID_COLOR,
                  [1, 1, 1, 0],
                );
              }
              event.target.notify("onDraw");
            } catch (e) {}
          }
          function getDrawFuncrion(x, y, stroke, strokeWidth, strokeColor) {
            function customDraw() {
              with (this) {
                graphics.drawOSControl();
                graphics.rectPath(0, 0, size[0], size[1]);
                graphics.fillPath(fillBrush);
                if (stroke) {
                  graphics.strokePath(
                    graphics.newPen(
                      graphics.PenType.SOLID_COLOR,
                      strokeColor,
                      strokeWidth,
                    ),
                  );
                }
                if (text) {
                  graphics.drawString(
                    text,
                    textPen,
                    (size[0] -
                      graphics.measureString(text, graphics.font, size[0])[0]) /
                      2 +
                      x,
                    y,
                    graphics.font,
                  );
                }
              }
            }
            return customDraw;
          }
          editorDynamicUIContainer.textChange = panel.add(
            "button",
            undefined,
            "\u270e",
            ["left", "bottom"],
            { style: "toolbutton" },
          );
          editorDynamicUIContainer.textChange.helpTip = "Change name";
          editorDynamicUIContainer.textChange.preferredSize = [20, 20];
          editorDynamicUIContainer.textChange.fillBrush =
            editorDynamicUIContainer.textChange.graphics.newBrush(
              editorDynamicUIContainer.textChange.graphics.BrushType
                .SOLID_COLOR,
              [0, 0, 0, 0],
            );
          editorDynamicUIContainer.textChange.textPen =
            editorDynamicUIContainer.textChange.graphics.newPen(
              editorDynamicUIContainer.textChange.graphics.PenType.SOLID_COLOR,
              [0.6, 0.6, 0.6, 1],
              1,
            );
          editorDynamicUIContainer.textChange.graphics.font = "Arial-Bold:18";
          editorDynamicUIContainer.textChange.onDraw = getDrawFuncrion(
            -4,
            -2,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.textChange.addEventListener(
            "mouseover",
            btnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.textChange.addEventListener(
            "mouseout",
            btnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.textChange.onClick = function () {
            var dialog = new Window("dialog");
            dialog.text = "change name";
            dialog.preferredSize.width = 250;
            dialog.orientation = "column";
            dialog.alignChildren = ["center", "top"];
            dialog.spacing = 10;
            dialog.margins = 16;
            var statictext1 = dialog.add("statictext", undefined, undefined, {
              name: "statictext1",
            });
            statictext1.text = "new name:";
            var edittext1 = dialog.add(
              'edittext {properties: {name: "edittext1"}}',
            );
            edittext1.text = command.elementName;
            edittext1.preferredSize.width = 201;
            edittext1.active = true;
            var group1 = dialog.add("group", undefined, { name: "group1" });
            group1.orientation = "row";
            group1.alignChildren = ["center", "fill"];
            group1.spacing = 0;
            group1.margins = 0;
            group1.alignment = ["fill", "top"];
            var group2 = group1.add("group", undefined, { name: "group2" });
            group2.preferredSize.width = 99;
            group2.orientation = "row";
            group2.alignChildren = ["left", "center"];
            group2.spacing = 0;
            group2.margins = 0;
            var button1 = group2.add("button", undefined, undefined, {
              name: "button1",
            });
            button1.text = "cancel";
            button1.onClick = function () {
              dialog.close();
              dialog = null;
              statictext1 = null;
              edittext1 = null;
              group1 = null;
              group2 = null;
              group3 = null;
              button1 = null;
              button2 = null;
            };
            var group3 = group1.add("group", undefined, { name: "group3" });
            group3.preferredSize.width = 99;
            group3.orientation = "column";
            group3.alignChildren = ["right", "center"];
            group3.spacing = 0;
            group3.margins = 0;
            var button2 = group3.add("button", undefined, undefined, {
              name: "button2",
            });
            button2.text = "ok";
            button2.alignment = ["right", "center"];
            button2.onClick = function () {
              if (!(edittext1.text.replace(/\s/g, "") == "")) {
                if (edittext1.text != "project") {
                  if (chackName(edittext1.text)) {
                    if (!findSimilarNames(edittext1.text, command)) {
                      var oldName = command.elementName;
                      command.elementName = edittext1.text;
                      changeAllTheNames(edittext1.text, oldName, command);
                      dialog.close();
                      dialog = null;
                      statictext1 = null;
                      edittext1 = null;
                      group1 = null;
                      group2 = null;
                      group3 = null;
                      button1 = null;
                      button2 = null;
                      generateUndoStep();
                    } else {
                      alert("This name is used by another object");
                    }
                  } else {
                    alert(
                      "cannot use this name because this name is reserved by the the program",
                    );
                  }
                } else {
                  alert("this name can\'t be used");
                }
              } else {
                alert("The name must be at least one character");
              }
            };
            dialog.show();
            dialog = null;
            statictext1 = null;
            edittext1 = null;
            group1 = null;
            group2 = null;
            group3 = null;
            button1 = null;
            button2 = null;
            for (i = pal.children.length - 1; i >= 0; i--) {
              pal.remove(pal.children[i]);
            }
            build_second_window(pal, findGolbalScope(command));
          };
          editorDynamicUIContainer.text01 = panel.add(
            "statictext",
            undefined,
            command.elementName,
            ["left", "bottom"],
          );
        }
        editorDynamicUIContainer.this_function_type = panel.add(
          "dropdownlist",
          undefined,
          [
            "loop",
            "if",
            "message",
            "ListBox",
            "set",
            "action",
            "variable",
            "",
            "",
          ],
        );
        editorDynamicUIContainer.this_function_type.helpTip =
          "Change automation line type";
        editorDynamicUIContainer.this_function_type.selection =
          editorDynamicUIContainer.this_function_type.find(commandType);
        editorDynamicUIContainer.this_function_type.onChange = function () {
          if (this.selection.text != "") {
            if (this.selection.text != commandType) {
              for (var i = 0; i < command.parent.scope.length; i += 1) {
                if (command == command.parent.scope[i]) {
                  command.parent.scope[i] = createCommand(
                    this.selection.text,
                    command.parent,
                  );
                  command.parent.scope[i].mainColor = command.mainColor;
                  break;
                }
              }
              command.scopeColor = null;
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            }
          } else {
            this.selection = this.find(commandType);
          }
        };
      }
      function infoDlg(infoData) {
        var dlg = new Window("dialog", "Info");
        var set =
          "panel{orientation:\'column\', alignment:[\'center\', \'center\'],\n                }";
        var pal2 = dlg.add(set);
        pal2.margins = [5, 5, 5, 5];
        dlg.margins = [15, 15, 15, 15];
        dlg.preferredSize = [400, 300];
        pal2.preferredSize = [380, 280];
        var infoEditText = pal2.add(
          'edittext {properties: {name: "edittext4", readonly: true, multiline: true, scrollable: true}}',
        );
        infoEditText.text = infoData;
        infoEditText.justify = "left";
        infoEditText.preferredSize = [370, 270];
        var infoCloseBtn = pal2.add("button", undefined, "ok");
        dlg.center();
        dlg.show();
        dlg = null;
        pal2 = null;
        set = null;
        infoEditText = null;
        infoCloseBtn = null;
      }
      function createCommand(str, parent) {
        switch (str) {
          case "loop":
            return new ForLoop(parent);
            findGolbalScope(parent).loopCounter++;
            break;
          case "message":
            return new Alert(parent);
            break;
          case "ListBox":
            return new TextBox(parent);
            break;
          case "if":
            return new IfStatement(parent);
            break;
          case "set":
            return new SetObject(parent);
            break;
          case "action":
            return new ObjectActions(parent);
            break;
          case "variable":
            return new GlobalObject(parent);
            break;
        }
      }
      function findParents(command) {
        function find(child, parentArray) {
          if (child.parent instanceof GlobalScope) {
            return parentArray;
          } else {
            if (child.parent instanceof ForLoop) {
              switch (child.parent.iterationsType.name()) {
                case "custom amount of times":
                  parentArray.push({
                    name: child.parent.elementName,
                    type: "Index",
                  });
                  break;
                case "items in the project":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Item",
                  });
                  break;
                case "layers in the active comp":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Layer",
                  });
                  break;
                case "effects in the layer":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Effect",
                  });
                  break;
                case "properties in the effect":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Property/Effect",
                  });
                  break;
                case "properties in the layer":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Property/Effect",
                  });
                  break;
                case "keyframes in property":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Property/Effect",
                  });
                  break;
                case "elements in the collection":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Collection",
                  });
                  break;
                case "markers in layer/item":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Marker",
                  });
                  break;
                case "items in the render queue":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "RQ Item",
                  });
                  break;
                case "output modules in render queue item":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Output-Module",
                  });
                  break;
                case "layers in other comp":
                  parentArray.push({
                    name: child.parent.elementName,
                    object: child.parent,
                    type: "Layer",
                  });
                  break;
              }
            }
            parentArray = find(child.parent, parentArray);
            return parentArray;
          }
        }
        var ar = [];
        var loopsAr = find(command, ar);
        return loopsAr.concat(findGlobalObjects(command, []));
      }
      function findGlobalObjects(command, ar) {
        function find(child, tempCommands, parentArray) {
          for (var i = 0; i < tempCommands.scope.length; i += 1) {
            if (child == tempCommands.scope[i]) {
              return parentArray;
            } else {
              if (tempCommands.scope[i].hasOwnProperty("scope")) {
                parentArray = find(child, tempCommands.scope[i], parentArray);
              } else {
                if (tempCommands.scope[i] instanceof GlobalObject) {
                  if (
                    tempCommands.scope[i].objectType == "Layer" ||
                    tempCommands.scope[i].objectType == "Item" ||
                    tempCommands.scope[i].objectType == "Property/Effect" ||
                    tempCommands.scope[i].objectType == "Project" ||
                    tempCommands.scope[i].objectType == "Collection"
                  ) {
                    parentArray.push({
                      name: tempCommands.scope[i].elementName,
                      object: tempCommands.scope[i],
                      type: tempCommands.scope[i].objectType,
                    });
                  } else {
                    parentArray.push({
                      name: tempCommands.scope[i].elementName,
                      object: tempCommands.scope[i],
                      type: "Variable",
                    });
                  }
                }
              }
            }
          }
          return parentArray;
        }
        return find(command, findGolbalScope(command), ar);
      }
      function findDeleteParents(tempParent, command) {
        function find(master, tempCommands, command) {
          for (var i = 0; i < tempCommands.scope.length; i += 1) {
            if (
              tempCommands.scope[i] instanceof ObjectActions &&
              tempCommands.scope[i] != command
            ) {
              if (
                tempCommands.scope[i].elementAName == master.elementName &&
                tempCommands.scope[i].elementAAction == "delete"
              ) {
                return true;
              }
            } else {
              if (tempCommands.scope[i].hasOwnProperty("scope")) {
                var results = find(master, tempCommands.scope[i], command);
                if (results == true) {
                  return results;
                }
              }
            }
          }
          return false;
        }
        if (tempParent instanceof ForLoop) {
          return find(tempParent, tempParent, command);
        } else {
          if (tempParent instanceof GlobalObject) {
            return find(tempParent, findGolbalScope(command), command);
          }
        }
      }
      function fixDuplicatesNames(duplicateArray, origianlScope) {
        function fixName(command) {
          if (command.hasOwnProperty("elementName")) {
            var uniqeName = false;
            var copyCounter = 0;
            var newName = command.elementName;
            while (uniqeName == false) {
              if (!findSimilarNamesInGlobalScope(newName, origianlScope)) {
                uniqeName = true;
              } else {
                copyCounter++;
                newName =
                  command.elementName + " copy " + copyCounter.toString();
              }
            }
            var elementOldName = command.elementName;
            var tempScope = { scope: duplicateArray };
            changeAllTheNames1(newName, elementOldName, tempScope);
            command.elementName = newName;
          }
          if (command.hasOwnProperty("scope")) {
            for (var i = 0; i < command.scope.length; i += 1) {
              fixName(command.scope[i]);
            }
          }
        }
        function changeAllTheNames1(newName, oldName, tempGlobalScope) {
          function changeScopeNames(newName, oldName, thisGlobalScope) {
            for (var i = 0; i < thisGlobalScope.scope.length; i += 1) {
              if (thisGlobalScope.scope[i].hasOwnProperty("elementAName")) {
                if (thisGlobalScope.scope[i].elementAName == oldName) {
                  thisGlobalScope.scope[i].elementAName = newName;
                }
              }
              if (thisGlobalScope.scope[i].hasOwnProperty("elementBName")) {
                if (thisGlobalScope.scope[i].elementBName == oldName) {
                  thisGlobalScope.scope[i].elementBName = newName;
                }
              }
              if (thisGlobalScope.scope[i].hasOwnProperty("alertItems")) {
                for (
                  var j = 0;
                  j < thisGlobalScope.scope[i].alertItems.length;
                  j += 1
                ) {
                  if (thisGlobalScope.scope[i].alertItems[j].type == oldName) {
                    thisGlobalScope.scope[i].alertItems[j].type = newName;
                  }
                }
              }
              if (thisGlobalScope.scope[i].hasOwnProperty("setItems")) {
                for (
                  var j = 0;
                  j < thisGlobalScope.scope[i].setItems.length;
                  j += 1
                ) {
                  if (thisGlobalScope.scope[i].setItems[j].type == oldName) {
                    thisGlobalScope.scope[i].setItems[j].type = newName;
                  }
                }
              }
              if (thisGlobalScope.scope[i].hasOwnProperty("textBoxItems")) {
                for (
                  var j = 0;
                  j < thisGlobalScope.scope[i].textBoxItems.length;
                  j += 1
                ) {
                  if (
                    thisGlobalScope.scope[i].textBoxItems[j].type == oldName
                  ) {
                    thisGlobalScope.scope[i].textBoxItems[j].type = newName;
                  }
                }
              }
              if (thisGlobalScope.scope[i].hasOwnProperty("scope")) {
                changeScopeNames(newName, oldName, thisGlobalScope.scope[i]);
              }
            }
          }
          return changeScopeNames(newName, oldName, tempGlobalScope);
        }
        for (var i = 0; i < duplicateArray.length; i += 1) {
          fixName(duplicateArray[i]);
        }
      }
      function findSimilarNames(newName, command) {
        function find(newName, thisGlobalScope, command) {
          for (var i = 0; i < thisGlobalScope.scope.length; i += 1) {
            if (thisGlobalScope.scope[i].hasOwnProperty("elementName")) {
              if (thisGlobalScope.scope[i].elementName == newName) {
                return true;
              }
            }
            if (thisGlobalScope.scope[i].hasOwnProperty("scope")) {
              var results = find(newName, thisGlobalScope.scope[i], command);
              if (results == true) {
                return results;
              }
            }
          }
          return false;
        }
        return find(newName, findGolbalScope(command), command);
      }
      function findSimilarNamesInGlobalScope(newName, thisGlobalScope) {
        for (var i = 0; i < thisGlobalScope.scope.length; i += 1) {
          if (thisGlobalScope.scope[i].hasOwnProperty("elementName")) {
            if (thisGlobalScope.scope[i].elementName == newName) {
              return true;
            }
          }
          if (thisGlobalScope.scope[i].hasOwnProperty("scope")) {
            var results = findSimilarNames(newName, thisGlobalScope.scope[i]);
            if (results == true) {
              return results;
            }
          }
        }
        return false;
      }
      function changeAllTheNames(newName, oldName, command) {
        function changeScopeNames(newName, oldName, thisGlobalScope, command) {
          for (var i = 0; i < thisGlobalScope.scope.length; i += 1) {
            if (thisGlobalScope.scope[i].hasOwnProperty("elementAName")) {
              if (thisGlobalScope.scope[i].elementAName == oldName) {
                thisGlobalScope.scope[i].elementAName = newName;
              }
            }
            if (thisGlobalScope.scope[i].hasOwnProperty("elementBName")) {
              if (thisGlobalScope.scope[i].elementBName == oldName) {
                thisGlobalScope.scope[i].elementBName = newName;
              }
            }
            if (thisGlobalScope.scope[i].hasOwnProperty("alertItems")) {
              for (
                var j = 0;
                j < thisGlobalScope.scope[i].alertItems.length;
                j += 1
              ) {
                if (thisGlobalScope.scope[i].alertItems[j].type == oldName) {
                  thisGlobalScope.scope[i].alertItems[j].type = newName;
                }
              }
            }
            if (thisGlobalScope.scope[i].hasOwnProperty("setItems")) {
              for (
                var j = 0;
                j < thisGlobalScope.scope[i].setItems.length;
                j += 1
              ) {
                if (thisGlobalScope.scope[i].setItems[j].type == oldName) {
                  thisGlobalScope.scope[i].setItems[j].type = newName;
                }
              }
            }
            if (thisGlobalScope.scope[i].hasOwnProperty("textBoxItems")) {
              for (
                var j = 0;
                j < thisGlobalScope.scope[i].textBoxItems.length;
                j += 1
              ) {
                if (thisGlobalScope.scope[i].textBoxItems[j].type == oldName) {
                  thisGlobalScope.scope[i].textBoxItems[j].type = newName;
                }
              }
            }
            if (thisGlobalScope.scope[i].hasOwnProperty("scope")) {
              changeScopeNames(
                newName,
                oldName,
                thisGlobalScope.scope[i],
                command,
              );
            }
          }
        }
        return changeScopeNames(
          newName,
          oldName,
          findGolbalScope(command),
          command,
        );
      }
      function findHighlightLines(command) {
        function createArrayFromGlobalScope(tempCommands, parentArray) {
          for (var i = 0; i < tempCommands.scope.length; i += 1) {
            parentArray.push(tempCommands.scope[i]);
            if (tempCommands.scope[i].hasOwnProperty("scope")) {
              parentArray = createArrayFromGlobalScope(
                tempCommands.scope[i],
                parentArray,
              );
            }
          }
          return parentArray;
        }
        function findFirstHighlight(tempCommands, parentArray) {
          for (var i = 0; i < tempCommands.scope.length; i += 1) {
            if (inArray(tempCommands.scope[i], selectedLines)) {
              parentArray.push(tempCommands.scope[i]);
            }
            if (tempCommands.scope[i].hasOwnProperty("scope")) {
              parentArray = findFirstHighlight(
                tempCommands.scope[i],
                parentArray,
              );
            }
          }
          return parentArray;
        }
        function selectScope(thisCommand) {
          if (thisCommand.scope && thisCommand.scope.length) {
            for (var i = 0; i < thisCommand.scope.length; i += 1) {
              selectedLines.push(thisCommand.scope[i]);
              if (thisCommand.scope[i].hasOwnProperty("scope")) {
                selectScope(thisCommand.scope[i]);
              }
            }
          }
        }
        var ar = [];
        var ar1 = [];
        var globalScope1 = findGolbalScope(command);
        var globalArray = createArrayFromGlobalScope(globalScope1, ar);
        var highlightObjects = findFirstHighlight(globalScope1, ar1);
        var selectedItems = [];
        if (highlightObjects[0] === command) {
          var foundFirst = false;
          for (var i = 0; i < globalArray.length; i += 1) {
            if (
              globalArray[i] === highlightObjects[highlightObjects.length - 1]
            ) {
              break;
            }
            if (foundFirst == true) {
              if (inArray(globalArray[i], selectedLines) == false) {
                selectedItems.push(globalArray[i]);
              }
            }
            if (globalArray[i] === command) {
              foundFirst = true;
            }
          }
          return selectedItems;
        }
        if (highlightObjects[highlightObjects.length - 1] === command) {
          var foundFirst = false;
          for (var i = 0; i < globalArray.length; i += 1) {
            if (globalArray[i] === command) {
              if (command.hasOwnProperty("scope")) {
                if (command.collapse) {
                  selectScope(command);
                }
              }
              break;
            }
            if (foundFirst == true) {
              if (inArray(globalArray[i], selectedLines) == false) {
                selectedItems.push(globalArray[i]);
              }
            }
            if (globalArray[i] === highlightObjects[0]) {
              foundFirst = true;
            }
          }
          return selectedItems;
        }
        if (
          highlightObjects[highlightObjects.length - 1] !== command &&
          highlightObjects[0] !== command
        ) {
        }
      }
      function copyHighlight(globalScope1) {
        function deleteOriginal(command) {
          for (var i = 0; i < command.scope.length; i += 1) {
            if (command.scope[i].hasOwnProperty("json")) {
              command.scope[i] = command.scope[i].json;
              if (command.scope[i].hasOwnProperty("scope")) {
                deleteOriginal(command.scope[i]);
              }
            }
          }
        }
        function organizeLines(command) {
          if (command.scope.length > 1) {
            var inOrder = false;
            while (inOrder == false) {
              inOrder = true;
              for (var i = 0; i < command.scope.length - 1; i += 1) {
                if (
                  indexInArray(command.scope[i + 1].original, ar2) <
                  indexInArray(command.scope[i].original, ar2)
                ) {
                  inOrder = false;
                  var tmp = command.scope[i + 1];
                  command.scope[i + 1] = command.scope[i];
                  command.scope[i] = tmp;
                }
              }
            }
          }
          for (var i = 0; i < command.scope.length; i += 1) {
            if (command.scope[i].json.hasOwnProperty("scope")) {
              organizeLines(command.scope[i].json);
            }
          }
        }
        function chackParents(command) {
          function find(child) {
            if (child.parent instanceof GlobalScope) {
              return false;
            } else {
              if (inArray(child.parent, selectedLines)) {
                return child.parent;
              } else {
                return find(child.parent);
              }
            }
          }
          return find(command);
        }
        function findMinDeepHiglight(ar1) {
          for (var i = 0; i < ar1.length; i += 1) {
            if (i == 0) {
              minDeepIndex = findDeepIndex(ar1[0], globalScope1);
            } else {
              var currDeepIndex = findDeepIndex(ar1[i], globalScope1);
              if (currDeepIndex > minDeepIndex) {
                minDeepIndex = currDeepIndex;
              }
            }
          }
          return minDeepIndex;
        }
        function findFirstHighlight(tempCommands, parentArray) {
          for (var i = 0; i < tempCommands.scope.length; i += 1) {
            if (inArray(tempCommands.scope[i], selectedLines)) {
              parentArray.push(tempCommands.scope[i]);
            }
            if (tempCommands.scope[i].hasOwnProperty("scope")) {
              parentArray = findFirstHighlight(
                tempCommands.scope[i],
                parentArray,
              );
            }
          }
          return parentArray;
        }
        function findDeepIndex(child, tempCommands) {
          function find(child, tempCommands) {
            index++;
            var lastIndex = index;
            for (var i = 0; i < tempCommands.scope.length; i += 1) {
              index = lastIndex;
              if (child == tempCommands.scope[i]) {
                return true;
                break;
              } else {
                if (tempCommands.scope[i].hasOwnProperty("scope")) {
                  if (find(child, tempCommands.scope[i])) {
                    return true;
                    break;
                  }
                }
              }
            }
            return false;
          }
          var index = 0;
          find(child, tempCommands);
          return index;
        }
        var ar = [];
        var arB = [];
        var ar1 = findFirstHighlight(globalScope1, ar);
        var ar2 = findFirstHighlight(globalScope1, arB);
        var arJsons = [];
        for (var i = 0; i < ar1.length; i += 1) {
          arJsons[i] = ar1[i].toJason();
          if (ar1[i].hasOwnProperty("scope")) {
            arJsons[i].scope = [];
          }
        }
        var lastMin = null;
        var minIndex = findMinDeepHiglight(ar1);
        while (lastMin != minIndex) {
          lastMin = minIndex;
          for (var i = 0; i < ar1.length; i += 1) {
            if (findDeepIndex(ar1[i], globalScope1) == minIndex) {
              var a = chackParents(ar1[i]);
              if (a != false) {
                for (var j = 0; j < ar1.length; j += 1) {
                  if (ar1[j] === a) {
                    arJsons[i].mainColor = arJsons[j].scopeColor;
                    arJsons[j].scope.push({
                      json: arJsons[i],
                      original: ar1[i],
                    });
                    ar1.splice(i, 1);
                    arJsons.splice(i, 1);
                    i = i - 1;
                    break;
                  }
                }
              }
            }
          }
          minIndex = findMinDeepHiglight(ar1);
        }
        for (var i = 0; i < arJsons.length; i += 1) {
          if (arJsons[i].hasOwnProperty("scope")) {
            organizeLines(arJsons[i]);
          }
        }
        for (var i = 0; i < arJsons.length; i += 1) {
          if (arJsons[i].hasOwnProperty("scope")) {
            deleteOriginal(arJsons[i]);
          }
        }
        copiedData = arJsons;
      }
      function chackName(name) {
        function testName(string, substring) {
          var testString = string;
          if (string.indexOf(substring) == 0) {
            testString.replace(substring, "");
            if (isNormalInteger(testString)) {
              return false;
            }
          } else {
            return true;
          }
        }
        function isNormalInteger(str) {
          return /^\+?(0|[1-9]\d*)$/.test(str);
        }
        if (
          testName(name, "Message") &&
          testName(name, "ListBox") &&
          testName(name, "loop") &&
          testName(name, "variable")
        ) {
          return true;
        } else {
          return false;
        }
      }
      function findObjectIndex(command) {
        function find(child, tempCommands) {
          for (var i = 0; i < tempCommands.scope.length; i += 1) {
            index = index + 1;
            if (child == tempCommands.scope[i]) {
              return true;
            } else {
              if (tempCommands.scope[i].hasOwnProperty("scope")) {
                if (find(child, tempCommands.scope[i]) == true) {
                  return true;
                }
              }
            }
          }
          return false;
        }
        var index = 0;
        find(command, findGolbalScope(command));
        return index;
      }
      function isVisible(command) {
        if (optimizeViewEnabled == true) {
          var commandIndex = findObjectIndex(command);
          if (commandIndex > 0) {
            if (scroll_last_trget > 500) {
              if (scroll_last_trget - 500 >= commandIndex * 50) {
                return false;
              } else {
                return true;
              }
            } else {
              return true;
            }
          }
        } else {
          return true;
        }
      }
      function getObjectProperties(
        objectType,
        returnType,
        property,
        elementName,
        command,
      ) {
        var trueProperty = property;
        switch (objectType) {
          case "Layer":
            myObject = variableObjectsProps.layer;
            break;
          case "Item":
            myObject = variableObjectsProps.item;
            break;
          case "Effect":
            myObject = variableObjectsProps.effect;
            break;
          case "Marker":
            myObject = variableObjectsProps.marker;
            break;
          case "RQ Item":
            myObject = variableObjectsProps.renderQueue;
            break;
          case "Output-Module":
            myObject = variableObjectsProps.renderQueueItem;
            break;
          case "Property/Effect":
            myObject = variableObjectsProps.property;
            break;
          case "Index":
            myObject = variableObjectsProps.customObject;
            break;
          case "Project":
            myObject = variableObjectsProps.project;
            break;
          case "Collection":
            for (var i = 0; i < uiVariables.variables.length; i += 1) {
              if (uiVariables.variables[i].name == elementName) {
                switch (uiVariables.variables[i].object.elementBType) {
                  case "Number":
                    myObject = variableObjectsProps.collection.number;
                    break;
                  case "Text":
                    myObject = variableObjectsProps.collection.text;
                    break;
                  case "Boolean":
                    myObject = variableObjectsProps.collection.boolean;
                    break;
                  case "Layer":
                    myObject = variableObjectsProps.collection.layer;
                    break;
                  case "Item":
                    myObject = variableObjectsProps.collection.item;
                    break;
                  case "Property/Effect":
                    myObject = variableObjectsProps.collection.property;
                    break;
                }
                break;
              }
            }
            break;
          case "Variable":
            for (var i = 0; i < uiVariables.variables.length; i += 1) {
              if (uiVariables.variables[i].name == elementName) {
                switch (uiVariables.variables[i].object.objectType) {
                  case "Number":
                    myObject = variableObjectsProps.variable.number;
                    break;
                  case "Text":
                    myObject = variableObjectsProps.variable.text;
                    break;
                  case "Boolean":
                    myObject = variableObjectsProps.variable.boolean;
                    break;
                }
                break;
              }
            }
            break;
          case null:
            myObject = null;
            break;
        }
        switch (objectType) {
          default:
            switch (returnType) {
              case "properties":
                return myObject.properties;
                break;
              case "object":
                return myObject.object;
                break;
              case "propertyType":
                return myObject.propertyType[trueProperty];
                break;
              case "writeProperties":
                return myObject.writeProperties;
                break;
              case "propertyOptions":
                return myObject.propertyOptions[property];
                break;
            }
            break;
          case null:
            switch (returnType) {
              default:
                return new Array();
                break;
              case "propertyType":
                return null;
                break;
            }
            break;
        }
      }
      function getObjectActions(
        objectType,
        returnType,
        property,
        elementName,
        command,
      ) {
        switch (objectType) {
          case "Layer":
            myObject = variableObjectsProps.layer;
            break;
          case "Item":
            myObject = variableObjectsProps.item;
            break;
          case "Effect":
            myObject = variableObjectsProps.effect;
            break;
          case "Marker":
            myObject = variableObjectsProps.marker;
            break;
          case "RQ Item":
            myObject = variableObjectsProps.renderQueue;
            break;
          case "Output-Module":
            myObject = variableObjectsProps.renderQueueItem;
            break;
          case "Property/Effect":
            myObject = variableObjectsProps.property;
            break;
          case "Index":
            myObject = variableObjectsProps.customObject;
            break;
          case "Project":
            myObject = variableObjectsProps.project;
            break;
          case "Collection":
            for (var i = 0; i < uiVariables.variables.length; i += 1) {
              if (uiVariables.variables[i].name == elementName) {
                switch (uiVariables.variables[i].object.elementBType) {
                  case "Number":
                    myObject = variableObjectsProps.collection.number;
                    break;
                  case "Text":
                    myObject = variableObjectsProps.collection.text;
                    break;
                  case "Boolean":
                    myObject = variableObjectsProps.collection.boolean;
                    break;
                  case "Layer":
                    myObject = variableObjectsProps.collection.layer;
                    break;
                  case "Item":
                    myObject = variableObjectsProps.collection.item;
                    break;
                  case "Property/Effect":
                    myObject = variableObjectsProps.collection.property;
                    break;
                }
                break;
              }
            }
            break;
          case "Variable":
            for (var i = 0; i < uiVariables.variables.length; i += 1) {
              if (uiVariables.variables[i].name == elementName) {
                switch (uiVariables.variables[i].object.objectType) {
                  case "Number":
                    myObject = variableObjectsProps.variable.number;
                    break;
                  case "Text":
                    myObject = variableObjectsProps.variable.text;
                    break;
                  case "Boolean":
                    myObject = variableObjectsProps.variable.boolean;
                    break;
                }
                break;
              }
            }
            break;
          case null:
            myObject = null;
            break;
        }
        switch (objectType) {
          default:
            switch (returnType) {
              case "Actions":
                return myObject.actions;
                break;
              case "propertyType":
                return myObject.actionsType[property];
                break;
              case "actionOptions":
                return myObject.actionsOptions[property];
                break;
            }
            break;
          case null:
            switch (returnType) {
              default:
                return new Array();
                break;
              case "propertyType":
                return null;
                break;
            }
            break;
        }
      }
      function checkSupport(type, propaction, name, elementName, command) {
        if (type && propaction && name && elementName && command) {
          switch (type) {
            case "Layer":
              tempObject = variableObjectsProps.layer;
              break;
            case "Item":
              tempObject = variableObjectsProps.item;
              break;
            case "Effect":
              tempObject = variableObjectsProps.effect;
              break;
            case "Marker":
              tempObject = variableObjectsProps.marker;
              break;
            case "RQ Item":
              tempObject = variableObjectsProps.renderQueue;
              break;
            case "Output-Module":
              tempObject = variableObjectsProps.renderQueueItem;
              break;
            case "Property/Effect":
              tempObject = variableObjectsProps.property;
              break;
            case "Index":
              tempObject = variableObjectsProps.customObject;
              break;
            case "Project":
              tempObject = variableObjectsProps.project;
              break;
            case "Collection":
              for (var i = 0; i < uiVariables.variables.length; i += 1) {
                if (uiVariables.variables[i].name == elementName) {
                  switch (uiVariables.variables[i].object.elementBType) {
                    case "Number":
                      tempObject = variableObjectsProps.collection.number;
                      break;
                    case "Text":
                      tempObject = variableObjectsProps.collection.text;
                      break;
                    case "Boolean":
                      tempObject = variableObjectsProps.collection.boolean;
                      break;
                    case "Layer":
                      tempObject = variableObjectsProps.collection.layer;
                      break;
                    case "Item":
                      tempObject = variableObjectsProps.collection.item;
                      break;
                    case "Property/Effect":
                      tempObject = variableObjectsProps.collection.property;
                      break;
                  }
                  break;
                }
              }
              break;
            case "Variable":
              for (var i = 0; i < uiVariables.variables.length; i += 1) {
                if (uiVariables.variables[i].name == elementName) {
                  switch (uiVariables.variables[i].object.objectType) {
                    case "Number":
                      tempObject = variableObjectsProps.variable.number;
                      break;
                    case "Text":
                      tempObject = variableObjectsProps.variable.text;
                      break;
                    case "Boolean":
                      tempObject = variableObjectsProps.variable.boolean;
                      break;
                  }
                  break;
                }
              }
              break;
            case null:
              tempObject = null;
              break;
          }
          switch (propaction) {
            case "action":
              return tempObject.baseObject.chackActionSupport(name);
              break;
            case "property":
              return tempObject.baseObject.chackPropertySupport(name);
              break;
          }
        }
      }
      function indexInArray(needle, haystack) {
        if (haystack && haystack.length) {
          for (var i = 0; i < haystack.length; i += 1) {
            if (haystack[i] === needle) {
              return i;
              break;
            }
          }
          return -1;
        } else {
          return -1;
        }
      }
      function removeFromArray(needle, haystack) {
        if (haystack && haystack.length) {
          for (var i = 0; i < haystack.length; i += 1) {
            if (haystack[i] === needle) {
              haystack.splice(i, 1);
              return true;
              break;
            }
          }
          return false;
        } else {
          return false;
        }
      }
      function getUserDataFolder() {
        var userDataFolder = Folder.userData;
        var aescriptsFolder = Folder(
          userDataFolder.toString() + "/Aescripts/Scripting Tool/logo",
        );
        if (!aescriptsFolder.exists) {
          var checkFolder = aescriptsFolder.create();
          if (!checkFolder) {
            alert("Error creating ");
            aescriptsFolder = Folder.temp;
          }
        }
        return aescriptsFolder.toString();
      }
      function createResourceFile(filename, binaryString, resourceFolder) {
        var myFile = new File(resourceFolder + "/" + filename);
        if (!File(myFile).exists) {
          if (!isSecurityPrefSet()) {
            alert(
              "This script requires access to write files. Go to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked.",
            );
            try {
              app.executeCommand(2359);
            } catch (e) {
              alert(e);
            }
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
      }
      function undo() {
        if (
          undoObject.currentScope != null &&
          undoObject.history.length > 1 &&
          undoObject.index != 0
        ) {
          undoObject.index = undoObject.index - 1;
          undoObject.currentScope.scope = scopeToObject(
            undoObject.history[undoObject.index].scope,
            undoObject.currentScope,
          );
          undoObject.currentScope.loopCounter =
            undoObject.history[undoObject.index].loopCounter;
          undoObject.currentScope.alertCounter =
            undoObject.history[undoObject.index].alertCounter;
          undoObject.currentScope.textBoxCounter =
            undoObject.history[undoObject.index].textBoxCounter;
          undoObject.currentScope.variableCounter =
            undoObject.history[undoObject.index].variableCounter;
          return true;
        } else {
          return false;
        }
      }
      function redo() {
        if (
          undoObject.currentScope != null &&
          undoObject.history.length > 1 &&
          undoObject.index != undoObject.history.length - 1
        ) {
          undoObject.index = undoObject.index + 1;
          undoObject.currentScope.scope = scopeToObject(
            undoObject.history[undoObject.index].scope,
            undoObject.currentScope,
          );
          undoObject.currentScope.loopCounter =
            undoObject.history[undoObject.index].loopCounter;
          undoObject.currentScope.alertCounter =
            undoObject.history[undoObject.index].alertCounter;
          undoObject.currentScope.textBoxCounter =
            undoObject.history[undoObject.index].textBoxCounter;
          undoObject.currentScope.variableCounter =
            undoObject.history[undoObject.index].variableCounter;
          return true;
        } else {
          return false;
        }
      }
      function generateUndoStep() {
        if (undoObject.currentScope != null) {
          if (undoObject.index == undoObject.history.length - 1) {
            undoObject.history.push({
              alertCounter: undoObject.currentScope.alertCounter,
              loopCounter: undoObject.currentScope.loopCounter,
              scope: undoObject.currentScope.toJason().scope,
              textBoxCounter: undoObject.currentScope.textBoxCounter,
              variableCounter: undoObject.currentScope.variableCounter,
            });
            if (undoObject.history.length > 20) {
              undoObject.history.shift();
            }
            undoObject.index = undoObject.history.length - 1;
          } else {
            undoObject.history.length = undoObject.index + 1;
            undoObject.history.push({
              alertCounter: undoObject.currentScope.alertCounter,
              loopCounter: undoObject.currentScope.loopCounter,
              scope: undoObject.currentScope.toJason().scope,
              textBoxCounter: undoObject.currentScope.textBoxCounter,
              variableCounter: undoObject.currentScope.variableCounter,
            });
            if (undoObject.history.length > 20) {
              undoObject.history.shift();
            }
            undoObject.index = undoObject.history.length - 1;
          }
        }
      }
      function center_location(item) {
        item.location.x = item.parent.size.width / 2 - item.size.width / 2;
      }
      function getGlobalDrawFuncrion(x, y, stroke, strokeWidth, strokeColor) {
        function customDraw() {
          with (this) {
            graphics.drawOSControl();
            graphics.rectPath(0, 0, size[0], size[1]);
            graphics.fillPath(fillBrush);
            if (stroke) {
              graphics.strokePath(
                graphics.newPen(
                  graphics.PenType.SOLID_COLOR,
                  strokeColor,
                  strokeWidth,
                ),
              );
            }
            if (text) {
              graphics.drawString(
                text,
                textPen,
                (size[0] -
                  graphics.measureString(text, graphics.font, size[0])[0]) /
                  2 +
                  x,
                (size[1] -
                  graphics.measureString(text, graphics.font, size[1])[1]) /
                  2 +
                  y,
                graphics.font,
              );
            }
          }
        }
        return customDraw;
      }
      function deleteScriptBtnMouseEventHandler(event) {
        try {
          if (event.type == "mouseover") {
            event.target.onDraw = getGlobalDrawFuncrion(
              0,
              0,
              ButtonStroke,
              2,
              [0.6, 0.6, 0.6, 1],
            );
            event.target.fillBrush = event.target.graphics.newBrush(
              event.target.graphics.BrushType.SOLID_COLOR,
              [0.6, 0.6, 0.6, 1],
            );
            event.target.textPen = event.target.graphics.newPen(
              event.target.graphics.PenType.SOLID_COLOR,
              [0, 0, 0, 1],
              1,
            );
          }
          if (event.type == "mouseout") {
            event.target.onDraw = getGlobalDrawFuncrion(
              0,
              0,
              ButtonStroke,
              2,
              [0.6, 0.6, 0.6, 1],
            );
            event.target.textPen = event.target.graphics.newPen(
              event.target.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              1,
            );
            if (operatingSystem == "Windows") {
              event.target.fillBrush = event.target.graphics.newBrush(
                event.target.graphics.BrushType.SOLID_COLOR,
                [1, 1, 1, 0],
              );
            } else {
              event.target.fillBrush = event.target.graphics.newBrush(
                event.target.graphics.BrushType.SOLID_COLOR,
                [0, 0, 0, 0.2],
              );
            }
          }
          event.target.notify("onDraw");
        } catch (e) {}
      }
      function versionErrorBtnfunctionbtnMouseEventHandler(event) {
        try {
          if (event.type == "mouseover") {
            if (operatingSystem == "Windows") {
              event.target.onDraw = getGlobalDrawFuncrion(
                -5,
                -5,
                ButtonStroke,
                2,
                [0.6, 0.6, 0.6, 1],
              );
            } else {
              event.target.onDraw = getGlobalDrawFuncrion(
                -5,
                -5,
                ButtonStroke,
                2,
                [0.6, 0.6, 0.6, 1],
              );
            }
            event.target.fillBrush = event.target.graphics.newBrush(
              event.target.graphics.BrushType.SOLID_COLOR,
              [0.6, 0.6, 0.6, 1],
            );
            event.target.textPen = event.target.graphics.newPen(
              event.target.graphics.PenType.SOLID_COLOR,
              [0, 0, 0, 1],
              1,
            );
          }
          if (event.type == "mouseout") {
            if (operatingSystem == "Windows") {
              event.target.onDraw = getGlobalDrawFuncrion(
                -5,
                -5,
                ButtonStroke,
                2,
                [0.6, 0.6, 0.6, 1],
              );
            } else {
              event.target.onDraw = getGlobalDrawFuncrion(
                -5,
                -5,
                ButtonStroke,
                2,
                [0.6, 0.6, 0.6, 1],
              );
            }
            event.target.textPen = event.target.graphics.newPen(
              event.target.graphics.PenType.SOLID_COLOR,
              [0, 0, 0, 1],
              1,
            );
            event.target.fillBrush = event.target.graphics.newBrush(
              event.target.graphics.BrushType.SOLID_COLOR,
              [0.79607843137, 0.63137254902, 0.08235294117, 1],
            );
          }
          event.target.notify("onDraw");
        } catch (e) {}
      }
      function settingsDlg() {
        function changeOrder() {
          data.order = this.text;
        }
        function showTab_verticaltabbedpanel2() {
          if (verticaltabbedpanel2_nav.selection !== null) {
            for (var i = verticaltabbedpanel2_tabs.length - 1; i >= 0; i--) {
              verticaltabbedpanel2_tabs[i].visible = false;
            }
            verticaltabbedpanel2_tabs[
              verticaltabbedpanel2_nav.selection.index
            ].visible = true;
          }
        }
        function showTab_verticaltabbedpanel1() {
          if (verticaltabbedpanel1_nav.selection !== null) {
            for (var i = verticaltabbedpanel1_tabs.length - 1; i >= 0; i--) {
              verticaltabbedpanel1_tabs[i].visible = false;
            }
            verticaltabbedpanel1_tabs[
              verticaltabbedpanel1_nav.selection.index
            ].visible = true;
          }
        }
        var scriptDataBackup = JSON.stringify(
          globalDataToJasonArray(data),
          null,
          4,
        );
        var dialog = new Window("dialog", undefined, undefined, {
          resizeable: true,
        });
        dialog.text = "Automation Toolkit Preferences";
        dialog.preferredSize.width = 887;
        dialog.preferredSize.height = 544;
        dialog.orientation = "column";
        dialog.alignChildren = ["center", "top"];
        dialog.spacing = 10;
        dialog.margins = 16;
        var verticaltabbedpanel1 = dialog.add("group", undefined, undefined, {
          name: "verticaltabbedpanel1",
        });
        verticaltabbedpanel1.alignChildren = ["left", "fill"];
        var verticaltabbedpanel1_nav = verticaltabbedpanel1.add(
          "listbox",
          undefined,
          ["General", "Appearance", "Keyboard Shortcuts", "Help", "About"],
        );
        verticaltabbedpanel1_nav.preferredSize.width = 137;
        var verticaltabbedpanel1_innerwrap = verticaltabbedpanel1.add("group");
        verticaltabbedpanel1_innerwrap.alignment = ["fill", "fill"];
        verticaltabbedpanel1_innerwrap.orientation = ["stack"];
        verticaltabbedpanel1.preferredSize.width = 684;
        verticaltabbedpanel1.preferredSize.height = 498;
        verticaltabbedpanel1.alignment = ["fill", "top"];
        var tab1 = verticaltabbedpanel1_innerwrap.add("group", undefined, {
          name: "tab1",
        });
        tab1.text = "General";
        tab1.orientation = "column";
        tab1.alignChildren = ["fill", "top"];
        tab1.spacing = 10;
        tab1.margins = 26;
        var group1 = tab1.add("group", undefined, { name: "group1" });
        group1.orientation = "row";
        group1.alignChildren = ["left", "center"];
        group1.spacing = 10;
        group1.margins = 0;
        var edittext1 = group1.add(
          'edittext {properties: {name: "edittext1"}}',
        );
        edittext1.text = data.scriptsPerRow;
        edittext1.preferredSize.width = 46;
        edittext1.onChange = function () {
          if (this.text.match(/^-{0,1}\d+$/)) {
            data.scriptsPerRow = this.text;
          } else {
            alert("Only round numbers are allowed");
            this.text = data.scriptsPerRow;
          }
        };
        var statictext1 = group1.add("statictext", undefined, undefined, {
          name: "statictext1",
        });
        statictext1.text = "Automations per row/column";
        var group2 = tab1.add("group", undefined, { name: "group2" });
        group2.orientation = "row";
        group2.alignChildren = ["left", "center"];
        group2.spacing = 10;
        group2.margins = 0;
        var statictext2 = group2.add("statictext", undefined, undefined, {
          name: "statictext2",
        });
        statictext2.text = "Automation Toolkit data file location - ";
        var button1 = group2.add("button", undefined, undefined, {
          name: "button1",
        });
        button1.text = "browse";
        button1.onClick = function () {
          if (Folder(scriptFile.parent.toString()).exists) {
            try {
              Folder(scriptFile.parent.toString()).execute();
            } catch (err) {
              alert("Can\'t open the folder");
              alert(
                "this script requires access to write files.\rGo to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked.",
              );
            }
          } else {
            alert("Can\'t find any setting file");
          }
        };
        var statictext2A = group2.add("statictext", undefined, undefined, {
          multiline: true,
          name: "statictext2A",
          scrolling: true,
        });
        statictext2A.text =
          '~if you already have an Automation Toolkit data file\nplace your file "Automation-Toolkit_Automations-Data.json" on this location\n (make a backup when you finish setup all the automations)';
        statictext2A.preferredSize = [420, 50];
        var group2A = tab1.add("group", undefined, { name: "group2A" });
        group2A.orientation = "row";
        group2A.alignChildren = ["left", "center"];
        group2A.spacing = 10;
        group2A.margins = 0;
        var Securitycheckbox1 = group2A.add("checkbox", undefined, undefined, {
          name: "checkbox1",
        });
        Securitycheckbox1.text =
          "Allow automations to run external javascript code\n(running unknown external javascript code could be potentially used maliciously, might lead to unwanted results,\n risk your computer and the files, damage software or hradware, risk the security)\nuse this option at your own risk and only if you trust the source code of the automation\nrecommended to leave off";
        if (data.hasOwnProperty("run_external_code")) {
          Securitycheckbox1.value = data.run_external_code;
        } else {
          data.run_external_code = false;
        }
        Securitycheckbox1.value = data.run_external_code;
        Securitycheckbox1.onClick = function () {
          if (this.value == true) {
            var bool = confirm(
              "running unknown external javascript code could be potentially used maliciously, might lead to unwanted results, risk your computer and the files, damage software or hradware, risk the security\nuse this option at your own risk and only if you trust the source code of all the automations\nAre you sure you want to enable is option?",
              false,
              "alert massage",
            );
            if (bool) {
              data.run_external_code = true;
            } else {
              this.value = false;
            }
          } else {
            data.run_external_code = false;
          }
        };
        Securitycheckbox1.preferredSize = [400, 60];
        var group2B = tab1.add("group", undefined, { name: "group2B" });
        group2B.orientation = "row";
        group2B.alignChildren = ["left", "center"];
        group2B.spacing = 10;
        group2B.margins = 0;
        var statictextExportAutomations = group2B.add(
          "statictext",
          undefined,
          undefined,
          { name: "statictext2Export" },
        );
        statictextExportAutomations.text =
          "Export all the automations as Automation Files - ";
        var exportButton1 = group2B.add("button", undefined, undefined, {
          name: "exportButton1",
        });
        exportButton1.text = "Export";
        exportButton1.onClick = function () {
          var dskTop = Folder.desktop;
          var dskPthFolder = String(dskTop);
          var newExportSpot = new File(
            dskPthFolder + "/" + "Automation-Tookit Export",
          );
          var myExportDestination = newExportSpot.saveDlg(
            "Select Destination Folder",
          );
          if (myExportDestination != null) {
            var exportFolder = Folder(
              myExportDestination.parent.toString() +
                "/" +
                myExportDestination.displayName.toString(),
            );
            if (!exportFolder.exists) {
              var checkExportFolder = exportFolder.create();
              if (checkExportFolder) {
                try {
                  for (var i = 0; i < data.scriptsArray.length; i += 1) {
                    var newExportFile = new File(
                      exportFolder.toString() +
                        "/" +
                        data.scriptsArray[i].name.toString() +
                        ".json",
                    );
                    newExportFile.encoding = "UTF-8";
                    if (newExportFile.open("w")) {
                      try {
                        var thisExportGlobalScope =
                          globalScopeArrayToJasonArray([data.scriptsArray[i]]);
                        thisExportGlobalScope = [
                          { version: att_settings.scriptVersion },
                        ].concat(thisExportGlobalScope);
                        newExportFile.write(
                          AutomationToolkitLicenseObject.JSONify(
                            thisExportGlobalScope,
                            "stringify",
                            "\t",
                          ),
                        );
                        newExportFile.close();
                      } catch (err) {
                        newExportFile.close();
                      }
                    }
                  }
                } catch (err) {
                  alert("error - could not complete this taks");
                }
                alert("Finished Exporting - \n" + exportFolder.toString());
              } else {
                alert("Error - Could not create the folder");
              }
            } else {
              alert(
                "Automation Toolkit found a folder with the same name, please type a diffrent name.",
              );
            }
          }
        };
        var statictextExport2 = group2B.add(
          "statictext",
          undefined,
          undefined,
          { multiline: true, name: "statictext2A", scrolling: true },
        );
        statictextExport2.text =
          "~ Click this button to export all the automations at once,\n It is recommended to use this function to back up all automations from time to time.";
        statictextExport2.preferredSize = [420, 50];
        var tab2 = verticaltabbedpanel1_innerwrap.add("group", undefined, {
          name: "tab2",
        });
        tab2.text = "Appearance";
        tab2.orientation = "column";
        tab2.alignChildren = ["fill", "top"];
        tab2.spacing = 10;
        tab2.margins = 26;
        var group3 = tab2.add("group", undefined, { name: "group3" });
        group3.orientation = "row";
        group3.alignChildren = ["left", "center"];
        group3.spacing = 10;
        group3.margins = 0;
        var statictext3 = group3.add("statictext", undefined, undefined, {
          name: "statictext3",
        });
        statictext3.text = "Automations order:";
        var radioButtonsGroup = group3.add("group", undefined, {
          name: "radioButtonsGroup",
        });
        radioButtonsGroup.orientation = "column";
        radioButtonsGroup.alignChildren = ["left", "center"];
        radioButtonsGroup.spacing = 10;
        radioButtonsGroup.margins = 0;
        var radiobutton1 = radioButtonsGroup.add(
          "radiobutton",
          undefined,
          undefined,
          { name: "radiobutton1" },
        );
        radiobutton1.text = "Alphabetical order";
        if (data.order == radiobutton1.text) {
          radiobutton1.value = true;
        }
        radiobutton1.onClick = changeOrder;
        var radiobutton2 = radioButtonsGroup.add(
          "radiobutton",
          undefined,
          undefined,
          { name: "radiobutton2" },
        );
        radiobutton2.text = "Categories order";
        if (data.order == radiobutton2.text) {
          radiobutton2.value = true;
        }
        radiobutton2.onClick = changeOrder;
        var radiobutton3 = radioButtonsGroup.add(
          "radiobutton",
          undefined,
          undefined,
          { name: "radiobutton3" },
        );
        radiobutton3.text = "Date created order";
        if (data.order == radiobutton3.text) {
          radiobutton3.value = true;
        }
        radiobutton3.onClick = changeOrder;
        var divider1 = tab2.add("panel", undefined, undefined, {
          name: "divider1",
        });
        divider1.alignment = "fill";
        var divider2 = tab2.add("panel", undefined, undefined, {
          name: "divider2",
        });
        divider2.alignment = "fill";
        var group4 = tab2.add("group", undefined, { name: "group4" });
        group4.orientation = "column";
        group4.alignChildren = ["left", "center"];
        group4.spacing = 10;
        group4.margins = 0;
        var group5 = group4.add("group", undefined, { name: "group5" });
        group5.orientation = "row";
        group5.alignChildren = ["left", "center"];
        group5.spacing = 10;
        group5.margins = 0;
        var statictext5 = group5.add("statictext", undefined, undefined, {
          name: "statictext5",
        });
        statictext5.text = "Orientation:";
        var radioButtonsGroup1 = group5.add("group", undefined, {
          name: "radioButtonsGroup1",
        });
        radioButtonsGroup1.orientation = "column";
        radioButtonsGroup1.alignChildren = ["left", "center"];
        radioButtonsGroup1.spacing = 10;
        radioButtonsGroup1.margins = 0;
        var radiobutton4 = radioButtonsGroup1.add(
          "radiobutton",
          undefined,
          undefined,
          { name: "radiobutton4" },
        );
        radiobutton4.text = "Horizontal";
        if (data.orientation == "horizontal") {
          radiobutton4.value = true;
        }
        radiobutton4.onClick = function () {
          data.orientation = "horizontal";
        };
        var radiobutton5 = radioButtonsGroup1.add(
          "radiobutton",
          undefined,
          undefined,
          { name: "radiobutton5" },
        );
        radiobutton5.text = "Vertical";
        if (data.orientation == "vertical") {
          radiobutton5.value = true;
        }
        radiobutton5.onClick = function () {
          data.orientation = "vertical";
        };
        var divider3 = group5.add("panel", undefined, undefined, {
          name: "divider3",
        });
        divider3.alignment = "fill";
        var statictext6 = group5.add("statictext", undefined, undefined, {
          name: "statictext6",
        });
        statictext6.text = "Size:";
        var group6 = group5.add("group", undefined, { name: "group6" });
        group6.orientation = "column";
        group6.alignChildren = ["left", "center"];
        group6.spacing = 10;
        group6.margins = 0;
        var group7 = group6.add("group", undefined, { name: "group7" });
        group7.orientation = "row";
        group7.alignChildren = ["left", "center"];
        group7.spacing = 10;
        group7.margins = 0;
        var statictext7 = group7.add("statictext", undefined, undefined, {
          name: "statictext7",
        });
        statictext7.text = "Width:";
        statictext7.preferredSize.width = 45;
        var checkbox3 = group7.add("checkbox", undefined, undefined, {
          name: "checkbox3",
        });
        checkbox3.value = data.useSizeX;
        checkbox3.onClick = function () {
          data.useSizeX = this.value;
          if (edittext2) {
            edittext2.enabled = this.value;
          }
        };
        var edittext2 = group7.add(
          'edittext {properties: {name: "edittext2"}}',
        );
        edittext2.preferredSize.width = 50;
        if (data.sizeX != null) {
          edittext2.text = data.sizeX;
        }
        if (!checkbox3.value) {
          edittext2.enabled = false;
        }
        edittext2.onChange = function () {
          if (this.text.match(/^-{0,1}\d+$/) && this.text != 0) {
            data.sizeX = parseInt(this.text);
          } else {
            alert("The minimum size is 17");
            this.text = 17;
            data.sizeY = 17;
          }
        };
        var statictext7A = group7.add("statictext", undefined, undefined, {
          name: "statictext7",
        });
        statictext7A.text = "(The default value is 80)";
        var group8 = group6.add("group", undefined, { name: "group8" });
        group8.orientation = "row";
        group8.alignChildren = ["left", "center"];
        group8.spacing = 10;
        group8.margins = 0;
        var statictext8 = group8.add("statictext", undefined, undefined, {
          name: "statictext8",
        });
        statictext8.text = "Height:";
        var checkbox4 = group8.add("checkbox", undefined, undefined, {
          name: "checkbox4",
        });
        checkbox4.value = data.useSizeY;
        checkbox4.onClick = function () {
          data.useSizeY = this.value;
          if (edittext3) {
            edittext3.enabled = this.value;
          }
        };
        var edittext3 = group8.add(
          'edittext {properties: {name: "edittext3"}}',
        );
        edittext3.preferredSize.width = 50;
        if (data.sizeY != null) {
          edittext3.text = data.sizeY;
        }
        if (!checkbox4.value) {
          edittext3.enabled = false;
        }
        edittext3.onChange = function () {
          if (this.text.match(/^-{0,1}\d+$/) && this.text != 0) {
            data.sizeY = parseInt(this.text);
          } else {
            alert("The minimum size is 17");
            this.text = 17;
            data.sizeY = 17;
          }
        };
        var statictext8A = group8.add("statictext", undefined, undefined, {
          name: "statictext8",
        });
        statictext8A.text = "(The default value is 28)";
        var statictext4 = group4.add("statictext", undefined, undefined, {
          name: "statictext4",
        });
        statictext4.text = "Automations:";
        var scriptBox_array = [];
        for (var i = 0; i < data.scriptsArray.length; i += 1) {
          scriptBox_array.push(data.scriptsArray[i].name);
        }
        var scriptBox = group4.add("listbox", undefined, undefined, {
          items: scriptBox_array,
          name: "scriptBox",
        });
        scriptBox.alignment = "fill";
        scriptBox.preferredSize.height = 111;
        scriptBox.onChange = function () {
          var temp_Selection = null;
          if (this.selection) {
            if (this.selection.index || this.selection.index === 0) {
              if (dropdown1) {
                if (
                  dropdown1.selection.index ||
                  dropdown1.selection.index === 0
                ) {
                  for (
                    var i = 0;
                    i <
                    data.categories[dropdown1.selection.index].customOrder
                      .length;
                    i += 1
                  ) {
                    if (
                      data.categories[dropdown1.selection.index].customOrder[
                        i
                      ] == this.selection.index
                    ) {
                      if (listbox1) {
                        temp_Selection = i;
                        break;
                      }
                    }
                  }
                }
              }
            }
          }
          if (listbox1) {
            listbox1.selection = temp_Selection;
          }
        };
        var divider4 = group4.add("panel", undefined, undefined, {
          name: "divider4",
        });
        divider4.alignment = "fill";
        var group9 = group4.add("group", undefined, { name: "group9" });
        group9.preferredSize.height = 250;
        group9.orientation = "column";
        group9.alignChildren = ["left", "top"];
        group9.spacing = 10;
        group9.margins = 0;
        group9.alignment = ["center", "center"];
        var group10 = group9.add("group", undefined, { name: "group10" });
        group10.orientation = "row";
        group10.alignChildren = ["left", "center"];
        group10.spacing = 10;
        group10.margins = 0;
        group10.alignment = ["center", "top"];
        var categoriesGroup10 = group9.add("group", undefined, {
          name: "group10",
        });
        categoriesGroup10.orientation = "row";
        categoriesGroup10.alignChildren = ["left", "center"];
        categoriesGroup10.spacing = 10;
        categoriesGroup10.margins = 0;
        categoriesGroup10.alignment = ["center", "top"];
        var statictext_Categories = categoriesGroup10.add(
          "statictext",
          undefined,
          undefined,
          { name: "statictext4" },
        );
        statictext_Categories.text = "Categories:";
        var dropdown1_array = makeArrayFromAttribute("name", data.categories);
        var dropdown1 = categoriesGroup10.add(
          "dropdownlist",
          undefined,
          undefined,
          { items: dropdown1_array, name: "dropdown1" },
        );
        dropdown1.selection = 0;
        dropdown1.preferredSize.width = 163;
        dropdown1.alignment = ["center", "top"];
        dropdown1.onChange = function () {
          try {
            if (this.selection.index || this.selection.index === 0) {
              if (listbox1) {
                listbox1.removeAll();
                for (
                  var i = 0;
                  i < data.categories[this.selection.index].customOrder.length;
                  i += 1
                ) {
                  listbox1.add(
                    "item",
                    data.scriptsArray[
                      data.categories[this.selection.index].customOrder[i]
                    ].name,
                  );
                }
              }
            }
          } catch (err) {}
        };
        var button2 = group10.add("button", undefined, undefined, {
          name: "button2",
        });
        button2.text = "Add category";
        button2.onClick = function () {
          var dialog = new Window("dialog");
          dialog.text = "Category name:";
          dialog.preferredSize.width = 250;
          dialog.orientation = "column";
          dialog.alignChildren = ["center", "top"];
          dialog.spacing = 10;
          dialog.margins = 16;
          var statictext1 = dialog.add("statictext", undefined, undefined, {
            name: "statictext1",
          });
          statictext1.text = "name:";
          var edittext1 = dialog.add(
            'edittext {properties: {name: "edittext1"}}',
          );
          edittext1.text = "";
          edittext1.preferredSize.width = 201;
          edittext1.active = true;
          var group1 = dialog.add("group", undefined, { name: "group1" });
          group1.orientation = "row";
          group1.alignChildren = ["center", "fill"];
          group1.spacing = 0;
          group1.margins = 0;
          group1.alignment = ["fill", "top"];
          var group2 = group1.add("group", undefined, { name: "group2" });
          group2.preferredSize.width = 99;
          group2.orientation = "row";
          group2.alignChildren = ["left", "center"];
          group2.spacing = 0;
          group2.margins = 0;
          var button1 = group2.add("button", undefined, undefined, {
            name: "button1",
          });
          button1.text = "cancel";
          var group3 = group1.add("group", undefined, { name: "group3" });
          group3.preferredSize.width = 99;
          group3.orientation = "column";
          group3.alignChildren = ["right", "center"];
          group3.spacing = 0;
          group3.margins = 0;
          var button2 = group3.add("button", undefined, undefined, {
            name: "button2",
          });
          button2.text = "ok";
          button2.alignment = ["right", "center"];
          button2.onClick = function () {
            if (!(edittext1.text.replace(/\s/g, "") == "")) {
              if (
                edittext1.text != "All" &&
                edittext1.text != "all" &&
                edittext1.text != "ALL"
              ) {
                data.categories.push({ customOrder: [], name: edittext1.text });
                dialog.close();
                dropdown1.removeAll();
                var temp_dropdown1_array = makeArrayFromAttribute(
                  "name",
                  data.categories,
                );
                for (var i = 0; i < data.categories.length; i += 1) {
                  dropdown1.add("item", temp_dropdown1_array[i]);
                }
                dropdown1.selection = data.categories.length - 1;
              } else {
                alert(
                  "the name can\'t be \'\'All\'\' (choose a different name)",
                );
              }
            } else {
              alert("The name must be at least one character");
            }
          };
          dialog.show();
          dialog = null;
          statictext1 = null;
          edittext1 = null;
          group1 = null;
          group2 = null;
          button1 = null;
          group3 = null;
          button2 = null;
        };
        var button3 = group10.add("button", undefined, undefined, {
          name: "button3",
        });
        button3.text = "Delete category";
        button3.onClick = function () {
          if (dropdown1.selection) {
            if (dropdown1.selection.index !== 0) {
              var bool = confirm(
                "are you sure you want to delete this category?",
                false,
                "alert massage",
              );
              if (bool) {
                try {
                  data.categories.splice(dropdown1.selection.index, 1);
                  dropdown1.remove(dropdown1.selection);
                  dropdown1.selection = 0;
                } catch (err) {}
              }
            } else {
              alert("The \'\'All\'\' category can\'t be deleted");
            }
          } else {
            alert("You have to select a category first");
          }
        };
        var group11 = group9.add("group", undefined, { name: "group11" });
        group11.orientation = "column";
        group11.alignChildren = ["left", "center"];
        group11.spacing = 4;
        group11.margins = 0;
        var statictext9 = group11.add("statictext", undefined, undefined, {
          name: "statictext9",
        });
        statictext9.text = "Automations in category:";
        var group12 = group11.add("group", undefined, { name: "group12" });
        group12.preferredSize.height = 250;
        group12.orientation = "row";
        group12.alignChildren = ["left", "top"];
        group12.spacing = 10;
        group12.margins = 0;
        var listbox1_array = [];
        for (var i = 0; i < data.categories[0].customOrder.length; i += 1) {
          listbox1_array.push(
            data.scriptsArray[data.categories[0].customOrder[i]].name,
          );
        }
        var listbox1 = group12.add("listbox", undefined, undefined, {
          items: listbox1_array,
          name: "listbox1",
        });
        listbox1.selection = 0;
        listbox1.preferredSize.width = 141;
        listbox1.preferredSize.height = 167;
        var group13 = group12.add("group", undefined, { name: "group13" });
        group13.orientation = "column";
        group13.alignChildren = ["left", "center"];
        group13.spacing = 10;
        group13.margins = 0;
        var button4 = group13.add("button", undefined, undefined, {
          name: "button4",
        });
        button4.text = "Add automation to category";
        button4.onClick = function () {
          if (scriptBox) {
            if (scriptBox.selection != null) {
              var exist = false;
              if (
                scriptBox.selection.index ||
                scriptBox.selection.index === 0
              ) {
                if (dropdown1) {
                  if (dropdown1.selection != null) {
                    if (dropdown1.selection.index != 0) {
                      if (
                        dropdown1.selection.index ||
                        dropdown1.selection.index === 0
                      ) {
                        for (
                          var i = 0;
                          i <
                          data.categories[dropdown1.selection.index].customOrder
                            .length;
                          i += 1
                        ) {
                          if (
                            data.categories[dropdown1.selection.index]
                              .customOrder[i] == scriptBox.selection.index
                          ) {
                            exist = true;
                            break;
                          }
                        }
                      }
                    } else {
                      alert(
                        "The \'\'All\'\' category already contain all the automations\n(change the selected category)",
                      );
                      exist = true;
                    }
                  } else {
                    exist = true;
                  }
                }
              }
              if (!exist) {
                data.categories[dropdown1.selection.index].customOrder.push(
                  scriptBox.selection.index,
                );
                listbox1.add("item", scriptBox.selection.toString());
              } else {
                if (dropdown1.selection.index != 0) {
                  alert("This automation is already in this category");
                }
              }
            } else {
              alert("Please select an automation to add");
            }
          }
        };
        var buttonRemoveFromCategory = group13.add(
          "button",
          undefined,
          undefined,
          { name: "buttonRemoveFromCategory" },
        );
        buttonRemoveFromCategory.text = "Remove Automation from category";
        buttonRemoveFromCategory.onClick = function () {
          if (dropdown1.selection.index != 0) {
            if (listbox1.selection != null) {
              data.categories[dropdown1.selection.index].customOrder.splice(
                listbox1.selection.index,
                1,
              );
              listbox1.remove(listbox1.selection.index);
            } else {
              alert("Please select an automation to remove");
            }
          } else {
            alert("Automation can\'t be removed from the \'\'All\'\' category");
          }
        };
        var button5 = group13.add("button", undefined, undefined, {
          name: "button5",
        });
        button5.text = "Move up";
        button5.onClick = function () {
          if (listbox1.selection != null) {
            if (
              data.categories[dropdown1.selection.index].customOrder.length >
                1 &&
              listbox1.selection.index != 0
            ) {
              var tempValue =
                data.categories[dropdown1.selection.index].customOrder[
                  listbox1.selection.index - 1
                ];
              data.categories[dropdown1.selection.index].customOrder[
                listbox1.selection.index - 1
              ] =
                data.categories[dropdown1.selection.index].customOrder[
                  listbox1.selection.index
                ];
              data.categories[dropdown1.selection.index].customOrder[
                listbox1.selection.index
              ] = tempValue;
              var newSelection = listbox1.selection.index - 1;
              listbox1.removeAll();
              for (
                var i = 0;
                i <
                data.categories[dropdown1.selection.index].customOrder.length;
                i += 1
              ) {
                listbox1.add(
                  "item",
                  data.scriptsArray[
                    data.categories[dropdown1.selection.index].customOrder[i]
                  ].name,
                );
              }
              listbox1.selection = newSelection;
            }
          } else {
            alert("Please select an automation to move");
          }
        };
        var button6 = group13.add("button", undefined, undefined, {
          name: "button6",
        });
        button6.text = "Move down";
        button6.onClick = function () {
          if (listbox1.selection != null) {
            if (
              data.categories[dropdown1.selection.index].customOrder.length >
                1 &&
              listbox1.selection.index !=
                data.categories[dropdown1.selection.index].customOrder.length -
                  1
            ) {
              var tempValue =
                data.categories[dropdown1.selection.index].customOrder[
                  listbox1.selection.index + 1
                ];
              data.categories[dropdown1.selection.index].customOrder[
                listbox1.selection.index + 1
              ] =
                data.categories[dropdown1.selection.index].customOrder[
                  listbox1.selection.index
                ];
              data.categories[dropdown1.selection.index].customOrder[
                listbox1.selection.index
              ] = tempValue;
              var newSelection = listbox1.selection.index + 1;
              listbox1.removeAll();
              for (
                var i = 0;
                i <
                data.categories[dropdown1.selection.index].customOrder.length;
                i += 1
              ) {
                listbox1.add(
                  "item",
                  data.scriptsArray[
                    data.categories[dropdown1.selection.index].customOrder[i]
                  ].name,
                );
              }
              listbox1.selection = newSelection;
            }
          } else {
            alert("Please select an automation to move");
          }
        };
        var group14 = dialog.add("group", undefined, { name: "group14" });
        group14.orientation = "row";
        group14.alignChildren = ["center", "center"];
        group14.spacing = 10;
        group14.margins = 0;
        var button8 = group14.add("button", undefined, undefined, {
          name: "button8",
        });
        button8.text = "Ok";
        button8.alignment = ["center", "center"];
        button8.onClick = function () {
          if (isSecurityPrefSet()) {
            if (scriptFile.exists) {
              if (scriptFile.open("w")) {
                try {
                  scriptFile.write(
                    JSON.stringify(globalDataToJasonArray(data), null, 4),
                  );
                  scriptFile.close();
                } catch (err) {
                  scriptFile.close();
                }
              }
            }
            dialog.close();
          } else {
            if (errorMessege) {
              errorMessege = false;
              alert(
                "the settings can\'t be saved\rthis script requires access to write files.\rGo to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked.\rthen restart the script.",
              );
            }
            dialog.close();
          }
        };
        var button7 = group14.add("button", undefined, undefined, {
          name: "button7",
        });
        button7.text = "Cancel";
        button7.alignment = ["center", "center"];
        button7.onClick = function () {
          var jsonObject = JSON.parse(scriptDataBackup);
          data = globalDataToFullObject(jsonObject);
          if (isSecurityPrefSet()) {
            if (scriptFile.exists) {
              if (scriptFile.open("w")) {
                try {
                  scriptFile.write(
                    JSON.stringify(globalDataToJasonArray(data), null, 4),
                  );
                  scriptFile.close();
                } catch (err) {
                  scriptFile.close();
                }
              }
            }
            dialog.close();
          } else {
            if (errorMessege) {
              errorMessege = false;
              alert(
                "the settings can\'t be saved\rthis script requires access to write files.\rGo to the  General  panel of the application preferences and make sure  Allow Scripts to Write Files and Access Network  is checked.\rthen restart the script.",
              );
            }
            dialog.close();
          }
          jsonObject = null;
        };
        var tabShortcuts = verticaltabbedpanel1_innerwrap.add(
          "group",
          undefined,
          { name: "tabShortcuts" },
        );
        tabShortcuts.text = "Keyboard Shortcuts";
        tabShortcuts.orientation = "column";
        tabShortcuts.alignChildren = ["fill", "top"];
        tabShortcuts.spacing = 10;
        tabShortcuts.margins = 26;
        var shortcutsTabGroup1 = tabShortcuts.add("group", undefined, {
          name: "group4",
        });
        shortcutsTabGroup1.orientation = "column";
        shortcutsTabGroup1.alignChildren = ["left", "center"];
        shortcutsTabGroup1.spacing = 10;
        shortcutsTabGroup1.margins = 0;
        var shortcutsTabstatictext1 = shortcutsTabGroup1.add(
          "statictext",
          undefined,
          undefined,
          { name: "statictext4" },
        );
        shortcutsTabstatictext1.text = "Automations:";
        var shortcutsScriptBox = shortcutsTabGroup1.add(
          "listbox",
          undefined,
          undefined,
          { items: scriptBox_array, name: "sortcutsScriptBox" },
        );
        shortcutsScriptBox.alignment = "fill";
        shortcutsScriptBox.preferredSize.height = 111;
        shortcutsScriptBox.onChange = function () {
          var temp_Selection = null;
          if (this.selection) {
            if (this.selection.index || this.selection.index === 0) {
              for (var i = 0; i < data.keyboardShortcuts.length; i += 1) {
                if (data.keyboardShortcuts[i] == this.selection.index) {
                  if (shortcuts_listbox) {
                    temp_Selection = i;
                    break;
                  }
                }
              }
            }
          }
          if (shortcuts_listbox) {
            shortcuts_listbox.selection = temp_Selection;
          }
        };
        var shortcutsTabstatictext2 = tabShortcuts.add(
          "statictext",
          undefined,
          undefined,
          { name: "statictext4" },
        );
        shortcutsTabstatictext2.text = "Keyboard Shortcuts:";
        var shortcutsTabGroup2 = tabShortcuts.add("group", undefined, {
          name: "shortcutsTabGroup2",
        });
        shortcutsTabGroup2.preferredSize.height = 170;
        shortcutsTabGroup2.orientation = "row";
        shortcutsTabGroup2.alignChildren = ["left", "top"];
        shortcutsTabGroup2.spacing = 10;
        shortcutsTabGroup2.margins = 0;
        var shortcuts_listbox_array = [];
        if (data.hasOwnProperty("keyboardShortcuts")) {
          for (var i = 0; i < data.keyboardShortcuts.length; i += 1) {
            shortcuts_listbox_array.push(
              data.scriptsArray[data.keyboardShortcuts[i]].name,
            );
          }
        } else {
          data.keyboardShortcuts = [];
        }
        var shortcuts_listbox = shortcutsTabGroup2.add(
          "listbox",
          undefined,
          undefined,
          { items: shortcuts_listbox_array, name: "shortcuts_listbox" },
        );
        shortcuts_listbox.selection = 0;
        shortcuts_listbox.preferredSize.width = 141;
        shortcuts_listbox.preferredSize.height = 167;
        var shortcutsTabGroup2B = shortcutsTabGroup2.add("group", undefined, {
          name: "group13",
        });
        shortcutsTabGroup2B.orientation = "column";
        shortcutsTabGroup2B.alignChildren = ["left", "center"];
        shortcutsTabGroup2B.spacing = 10;
        shortcutsTabGroup2B.margins = 0;
        var addShortcutButton = shortcutsTabGroup2B.add(
          "button",
          undefined,
          undefined,
          { name: "addShortcutButton" },
        );
        addShortcutButton.text = "Add automation to shortcuts";
        addShortcutButton.onClick = function () {
          if (shortcutsScriptBox) {
            if (shortcutsScriptBox.selection != null) {
              var exist = false;
              if (
                shortcutsScriptBox.selection.index ||
                shortcutsScriptBox.selection.index === 0
              ) {
                for (var i = 0; i < data.keyboardShortcuts.length; i += 1) {
                  if (
                    data.keyboardShortcuts[i] ==
                    shortcutsScriptBox.selection.index
                  ) {
                    exist = true;
                    break;
                  }
                }
              }
              if (!exist) {
                data.keyboardShortcuts.push(shortcutsScriptBox.selection.index);
                shortcuts_listbox.add(
                  "item",
                  shortcutsScriptBox.selection.toString(),
                );
              } else {
                alert("This automation already has a keyboard shortcut");
              }
            } else {
              alert("Please select an automation from the list box");
            }
          }
        };
        var removeShortcutButton = shortcutsTabGroup2B.add(
          "button",
          undefined,
          undefined,
          { name: "removeShortcutButton" },
        );
        removeShortcutButton.text = "Remove automation from shortcuts";
        removeShortcutButton.onClick = function () {
          if (shortcuts_listbox.selection != null) {
            data.keyboardShortcuts.splice(shortcuts_listbox.selection.index, 1);
            shortcuts_listbox.remove(shortcuts_listbox.selection.index);
          } else {
            alert("Please select an automation shortcut to remove");
          }
        };
        var shortcutsTabGroup3 = tabShortcuts.add("group", undefined, {
          name: "shortcutsTabGroup3",
        });
        shortcutsTabGroup3.preferredSize.height = 250;
        shortcutsTabGroup3.orientation = "column";
        shortcutsTabGroup3.alignChildren = ["left", "top"];
        shortcutsTabGroup3.spacing = 10;
        shortcutsTabGroup3.margins = 0;
        var generateShortcutButtons = shortcutsTabGroup3.add(
          "button",
          undefined,
          undefined,
          { name: "generateShortcutButtons" },
        );
        generateShortcutButtons.text = "Generate Shortcut Files";
        generateShortcutButtons.onClick = function () {
          if (afterEffectsVersion >= 15) {
            generateShortcutFiles();
          } else {
            alert(
              "Keyboard shortcuts supported from adobe after effects cc18 and above(version 15.0).",
            );
          }
        };
        var shortcutsTabstatictext3 = shortcutsTabGroup3.add(
          "statictext",
          undefined,
          undefined,
          { name: "shortcutsTabstatictext3" },
        );
        shortcutsTabstatictext3.text = "Help:";
        shortcutsTabstatictext3.alignment = ["center", "top"];
        var shortcutsTabDivider1 = shortcutsTabGroup3.add(
          "panel",
          undefined,
          undefined,
          { name: "divider20" },
        );
        shortcutsTabDivider1.alignment = "fill";
        var shortcutsTabEedittext = shortcutsTabGroup3.add(
          "statictext",
          undefined,
          undefined,
          { multiline: true, name: "edittext11", scrolling: true },
        );
        shortcutsTabEedittext.text =
          "after generating the shortcuts, you need to restart after effect effects in order to see the shortcut scripts in the after effect keyboard shortcut menu(go to edit menu and search for keyboard shortcuts, then search for Automation-Toolkit_yourAutomationName.jsxbin).\n\n in some cases Automation Toolkit can\'t write files to the after effects root folder because your user don\'t have premissions to write in this location.\n\n in this case you can manually copy the Automations Toolkit Shortcuts folder yourself,\n\n*do these steps only if you saved the Automation Toolkit Shortcuts folder in a custom location*\n1. save the Automation Toolkit Shortcuts folder to a custom location.\n2. copy this folder to the after effects scripts folder\n(on mac)/Applications/Adobe After Effects (version)/Scripts/\n(on windows)c:/Program Files/Adobe/Adobe After Effects (version)/Support Files/Scripts/\n3.restart after effects and assign new keyboard shortcut for this script(Automation-Toolkit_(AutoamtionName).jsxbin)";
        shortcutsTabEedittext.preferredSize.height = 216;
        shortcutsTabEedittext.preferredSize.width = 716;
        var shortcutsTabDivider2 = shortcutsTabGroup3.add(
          "panel",
          undefined,
          undefined,
          { name: "divider21" },
        );
        shortcutsTabDivider2.alignment = "fill";
        var tab3 = verticaltabbedpanel1_innerwrap.add("group", undefined, {
          name: "tab3",
        });
        tab3.text = "Help";
        tab3.orientation = "column";
        tab3.alignChildren = ["fill", "top"];
        tab3.spacing = 10;
        tab3.margins = 26;
        var panel1 = tab3.add("panel", undefined, undefined, {
          borderStyle: "gray",
          name: "panel1",
        });
        panel1.orientation = "column";
        panel1.alignChildren = ["left", "top"];
        panel1.spacing = 10;
        panel1.margins = 10;
        var statictext10 = panel1.add("statictext", undefined, undefined, {
          name: "statictext10",
        });
        statictext10.text = "Script Usage:";
        statictext10.alignment = ["center", "top"];
        var divider5 = panel1.add("panel", undefined, undefined, {
          name: "divider5",
        });
        divider5.alignment = "fill";
        var statictext11 = panel1.add("statictext", undefined, undefined, {
          multiline: true,
          name: "statictext11",
          scrolling: true,
        });
        statictext11.text =
          "1. Add new Automation by clicking in the main window on the \u201c+\u201d button.\n2. Right click on the new automation button \u201c~New Automation\u201d to edit the automation in the editor.\n3. Change the automation name and description.\n4. In the editor add Automation line by clicking the \u201c+\u201d button.\n5. Add the functionality you want by adding the automation lines you need(read more information on automation lines types below).\n6. Test the automation by clicking the \u201crun\u201d button and fix the problems if existing.\n7. Save your automation by clicking the \u201csave\u201d button.\n8. Run your new automation by clicking left clicking the automation name button.";
        statictext11.preferredSize = [700, 120];
        var divider6 = panel1.add("panel", undefined, undefined, {
          name: "divider6",
        });
        divider6.alignment = "fill";
        var verticaltabbedpanel2 = tab3.add("group", undefined, undefined, {
          name: "verticaltabbedpanel2",
        });
        verticaltabbedpanel2.alignChildren = ["left", "fill"];
        var verticaltabbedpanel2_nav = verticaltabbedpanel2.add(
          "listbox",
          undefined,
          ["Loop", "If", "Message", "List Box", "Set", "Action", "Variable"],
        );
        var verticaltabbedpanel2_innerwrap = verticaltabbedpanel2.add("group");
        verticaltabbedpanel2_innerwrap.alignment = ["fill", "fill"];
        verticaltabbedpanel2_innerwrap.orientation = ["stack"];
        verticaltabbedpanel2.preferredSize.height = 529;
        var tab4 = verticaltabbedpanel2_innerwrap.add("group", undefined, {
          name: "tab4",
        });
        tab4.text = "Loop";
        tab4.orientation = "column";
        tab4.alignChildren = ["fill", "top"];
        tab4.spacing = 10;
        tab4.margins = 0;
        var statictext12 = tab4.add("statictext", undefined, undefined, {
          name: "statictext12",
        });
        statictext12.text = "Loop:";
        statictext12.alignment = ["center", "top"];
        var divider7 = tab4.add("panel", undefined, undefined, {
          name: "divider7",
        });
        divider7.alignment = "fill";
        var edittext4 = tab4.add(
          'edittext {properties: {name: "edittext4", readonly: true, multiline: true, scrollable: true}}',
        );
        edittext4.text =
          "The loop purpose is to go through items and run the same operations on all of them.\rLoop enables you to run operations on all the layers,compositions,footages,keyframes.\rYou can add an automation line inside the loop so as you run the automation the loop will run it\u2019s automation lines on all specified items.\rWhen adding an automation line inside the loop a new option with the name of the loop will appear on the automation line properties,\rthis loop name will represent all of the items and show the properties/actions of this specific loop type layer/project item/property/number.\r\rloop types:\ritems in the project -\rthe loop will run its automation lines on all of the items in the project panel(Composition,Footage,Folders,Solids and more) from start to end.\r\rlayers in the active comp -\rthe loop will run its automation lines on all of the layers in the selected composition from start to end.\r\rlayers in other comp -\rthe loop will run its automation lines on all of the layers in the specified composition(item object) from start to end.\r\rproperties in the layer -\rthe loop will run its automation lines on all of the properties in the specified layer, from start to end.\r\reffects in the layer -\rthe loop will run its automation lines on all of the effects in the specified layer, from start to end.\r\rproperties in the effect -\rthe loop will run its automation lines on all of the properties in the specified effect, from start to end.\r\rkeyframes in property -\rthe loop will run its automation lines on all of the keyframes in the specified property(opacity,position,rotation and more) from start to end.\r\rmarkers in layer/item -\rthe loop will run its automation lines on all of the markers in the specified layer/item from start to end.\r\ritems in the render queue -\rthe loop will run its automation lines on all of the render queue items in the project from start to end.\r\routput modules in render queue item -\rthe loop will run its automation lines on all of the output modules of the specify render queue item from start to end.\r\rcustom amount of times -\rthe loop will run its automation lines on all of the keyframes in the specified property(opacity,position,rotation and more) from start to end.\r\rstop loop -\rthis loop type will stop the specified loop at this point.\r\rloop options:\rdo this for all precomps -\rrun its automation lines on all the precomps as well(and the precomps within the precomps infinitely).\r\rreverse -\rwill reverse the order and go from end to start.";
        edittext4.preferredSize.height = 464;
        var divider8 = tab4.add("panel", undefined, undefined, {
          name: "divider8",
        });
        divider8.alignment = "fill";
        var tab5 = verticaltabbedpanel2_innerwrap.add("group", undefined, {
          name: "tab5",
        });
        tab5.text = "If";
        tab5.orientation = "column";
        tab5.alignChildren = ["fill", "top"];
        tab5.spacing = 10;
        tab5.margins = 0;
        var statictext13 = tab5.add("statictext", undefined, undefined, {
          name: "statictext13",
        });
        statictext13.text = "If:";
        statictext13.alignment = ["center", "top"];
        var divider9 = tab5.add("panel", undefined, undefined, {
          name: "divider9",
        });
        divider9.alignment = "fill";
        var edittext5 = tab5.add(
          'edittext {properties: {name: "edittext5", readonly: true, multiline: true, scrollable: true}}',
        );
        edittext5.text =
          "Sometimes, we need to perform different automations based on different conditions.\rThe if automation line purpose is to add logics to your automations so you can make automations that take effect only on specific items.\rfor example if you want to select all the text layers in the composition you should use if inside a loop(layers on the active comp),\rin the if you should select the loop name then it\'s property \u201cisText\u201d ,next choose \u201c=\u201d + \u201dtrue\u201d.\rinside the if you will add a set and set  it to the loop name, select the property  \u201cselected\u201d and select \u201c=\u201d +\u201dtrue\u201d.";
        edittext5.preferredSize.height = 464;
        var divider10 = tab5.add("panel", undefined, undefined, {
          name: "divider10",
        });
        divider10.alignment = "fill";
        var tab6 = verticaltabbedpanel2_innerwrap.add("group", undefined, {
          name: "tab6",
        });
        tab6.text = "Message";
        tab6.orientation = "column";
        tab6.alignChildren = ["fill", "top"];
        tab6.spacing = 10;
        tab6.margins = 0;
        var statictext14 = tab6.add("statictext", undefined, undefined, {
          name: "statictext14",
        });
        statictext14.text = "Message:";
        statictext14.alignment = ["center", "top"];
        var divider11 = tab6.add("panel", undefined, undefined, {
          name: "divider11",
        });
        divider11.alignment = "fill";
        var edittext6 = tab6.add(
          'edittext {properties: {name: "edittext6", readonly: true, multiline: true, scrollable: true}}',
        );
        edittext6.text =
          "The message automation line displays a window with a specified message and an OK button.\rMessage can show most of the properties of Layers/Project Items/Keyframes combined with custom text.\rMessage can also be used to make a list of text data from a specific properties.\r\rsum to list -\rsaves all the messages as a list without showing them, the list can be shown with the List Box automation line afterwards.";
        edittext6.preferredSize.height = 464;
        var divider12 = tab6.add("panel", undefined, undefined, {
          name: "divider12",
        });
        divider12.alignment = "fill";
        var tab7 = verticaltabbedpanel2_innerwrap.add("group", undefined, {
          name: "tab7",
        });
        tab7.text = "List Box";
        tab7.orientation = "column";
        tab7.alignChildren = ["fill", "top"];
        tab7.spacing = 10;
        tab7.margins = 0;
        var statictext15 = tab7.add("statictext", undefined, undefined, {
          name: "statictext15",
        });
        statictext15.text = "List Box:";
        statictext15.alignment = ["center", "top"];
        var divider13 = tab7.add("panel", undefined, undefined, {
          name: "divider13",
        });
        divider13.alignment = "fill";
        var edittext7 = tab7.add(
          'edittext {properties: {name: "edittext7", readonly: true, multiline: true, scrollable: true}}',
        );
        edittext7.text =
          "The list box automation line displays a window with a specified list messages and an OK button.\rList Box can show only a message automation line(that should be set to \u201csum to list\u201d) and a custom text.\rList Box messages can be copied as plain text to any other application.\r\rdon\'t show -\rthe automation will skip this automation line and won\u2019t show this message.";
        edittext7.preferredSize.height = 464;
        var divider14 = tab7.add("panel", undefined, undefined, {
          name: "divider14",
        });
        divider14.alignment = "fill";
        var tab8 = verticaltabbedpanel2_innerwrap.add("group", undefined, {
          name: "tab8",
        });
        tab8.text = "Set";
        tab8.orientation = "column";
        tab8.alignChildren = ["fill", "top"];
        tab8.spacing = 10;
        tab8.margins = 0;
        var statictext16 = tab8.add("statictext", undefined, undefined, {
          name: "statictext16",
        });
        statictext16.text = "Set:";
        statictext16.alignment = ["center", "top"];
        var divider15 = tab8.add("panel", undefined, undefined, {
          name: "divider15",
        });
        divider15.alignment = "fill";
        var edittext8 = tab8.add(
          'edittext {properties: {name: "edittext8", readonly: true, multiline: true, scrollable: true}}',
        );
        edittext8.text =
          "Set automation line will set the value of any property that can be changed by the user, for example the width and height of a layer can\u2019t be changed so they won\u2019t show in the set properties but the width and height of specific item like composition and solid can be changed so they will show in the set properties.\rfirst you have to specify which property to set and then specify what the new value of this property should be.\rSet can run mathematical calculation on many properties or custom value.\rfor example you can set the x position property of a layer to the width property of the composition multiply by 2 and the results will be the middle of the composition.\rSet won\u2019t change a value of property that has keyframes.";
        edittext8.preferredSize.height = 464;
        var divider16 = tab8.add("panel", undefined, undefined, {
          name: "divider16",
        });
        divider16.alignment = "fill";
        var tab9 = verticaltabbedpanel2_innerwrap.add("group", undefined, {
          name: "tab9",
        });
        tab9.text = "Action";
        tab9.orientation = "column";
        tab9.alignChildren = ["fill", "top"];
        tab9.spacing = 10;
        tab9.margins = 0;
        var statictext17 = tab9.add("statictext", undefined, undefined, {
          name: "statictext17",
        });
        statictext17.text = "Action:";
        statictext17.alignment = ["center", "top"];
        var divider17 = tab9.add("panel", undefined, undefined, {
          name: "divider17",
        });
        divider17.alignment = "fill";
        var edittext9 = tab9.add(
          'edittext {properties: {name: "edittext9", readonly: true, multiline: true, scrollable: true}}',
        );
        edittext9.text =
          "Action automation line will do function on Layers/Items/Keyframes.\nThe functions enable to do manipulations that not connected to any property,\nfor example - duplicate,delete,replace and more.\nSome action will require specific input like layer/project item/number/text in order to successfully work.\nEvery object(Layer/Project Item/Keyframe) has its own actions and properties.\n\nAll The Actions:\n\nProject Object Actions:\n   add composition - get composition name (text object/text property).\n   add folder - get folder name (text object/text property).\n   menu command - get the name of a user interface manu command (text object/text property). for example \u201cCopy\u201d, \u201dClose Project\u201d, \u201dSave\u201d and more. The commands have to be typed exactly how they are spelled in the menu \u201cOpen Project...\u201d, some commands may be depended on user selection. not all the menu commands are supported.\n\nLayer Object Actions:\n   delete.\n   duplicate.\n   move to beginning - move the layer to index 1.\n   move to end - move the layer to last index.\n   move after - move the layer after specified other layer(layer object).\n   move before - move the layer before specified other layer(layer object).\n   remove all effects.\n   add effect - get the effect name(example:\u201cLevels\u201d).\n   replace layer - replace the layer with a specified project item(item object), function as alt dragging project item on top of layer to replace.\n\nProject Item Object Actions:\n   delete.\n   duplicate.\n   precompose(move all attributes) - if the project item object is a composition precompose all selected layers inside the comp.\n   precompose(leave all attributes) - if the project item object is a composition precompose all selected layers inside the comp.\n   add item - if the project item object is a composition add specified project item object(solid/composition/footage) inside it at index 1, function as if you drag and drop footage inside a composition.\n   replace item - replace the project item object (only if it is footage) with other specified project item object(solid/composition/footage) to replace.\n   replace with solid - replace the item with solid.\n   replace with placeholder - replace the item with a placeholder.\n   add solid - if the project item object is a composition adds new solid inside with a specified name(text object/property).\n   add null - if the project item object is a composition adds new null inside with a specified name(text object/property).\n   add text - if the project item object is a composition adds new text inside with a specified name(text object/property) that use as the source text too.\n   add camera - if the project item object is a composition adds new camera inside with a specified name(text object/property).\n   add light - if the project item object is a composition adds new light inside with a specified name(text object/property).\n   add shape - if the project item object is a composition adds new shape inside with a specified name(text object/property).\n   add to render queue - if the project item object is a composition/footage adds it to the render queue.\n   send to media encoder - if the project item object is a composition adds it to adobe media encoder queue(this action will interrupt the undo option of the main automation at this point).\n   set proxy - if the project item object is a composition/footage set its proxy to specified project item object.\n   unset proxy - remove the item\u2019s proxy.\n\nProperty Object Actions:\n   add key - add/change key with specified value at the time of the \u201ctime\u201d property for this property object. before adding keyframe set the \u201ctime\u201d property of the property object to the desired time for the new keyframe.\n   delete key - delete the keyframe at the time of the \u201ctime\u201dproperty value of the property object.\n   delete all keyframes.";
        edittext9.preferredSize.height = 464;
        var divider18 = tab9.add("panel", undefined, undefined, {
          name: "divider18",
        });
        divider18.alignment = "fill";
        var tab10 = verticaltabbedpanel2_innerwrap.add("group", undefined, {
          name: "tab10",
        });
        tab10.text = "Variable";
        tab10.orientation = "column";
        tab10.alignChildren = ["fill", "top"];
        tab10.spacing = 10;
        tab10.margins = 0;
        verticaltabbedpanel2_tabs = [tab4, tab5, tab6, tab7, tab8, tab9, tab10];
        for (var i = 0; i < verticaltabbedpanel2_tabs.length; i += 1) {
          verticaltabbedpanel2_tabs[i].alignment = ["fill", "fill"];
          verticaltabbedpanel2_tabs[i].visible = false;
        }
        verticaltabbedpanel2_nav.onChange = showTab_verticaltabbedpanel2;
        verticaltabbedpanel2_nav.selection = 0;
        showTab_verticaltabbedpanel2();
        var statictext18 = tab10.add("statictext", undefined, undefined, {
          name: "statictext18",
        });
        statictext18.text = "Variable:";
        statictext18.alignment = ["center", "top"];
        var divider19 = tab10.add("panel", undefined, undefined, {
          name: "divider19",
        });
        divider19.alignment = "fill";
        var edittext10 = tab10.add(
          'edittext {properties: {name: "edittext10", readonly: true, multiline: true, scrollable: true}}',
        );
        edittext10.text =
          "Variable automation line can contain every type of object:\rNumber,Text,Layer,Item,Property,Boolean.\rVariable purpose is to save custom value of any kind of object for later use.\rSome properties can be accessed only inside a loop so if you want to use this value outside of the loop you have to save it inside a variable.\rVariables have the option to get custom value from the user for automations that needs different value every time.\r\ruser prompt - open new window and asks the user to type a custom value for this variable, when user prompt selected, you have to specify instructions for the user.\rYou still have to type a value for this variable so if the user cancel the the value will be taken from the value of the variable.\r\rVariable Types:\r\rNumber:\rnumber can be a custom number you type or a Layer/Item/property object property value.\r\rText:\rText can be a custom text you type or a Layer/Item/property object property value.\r\rLayer:\rLayer can be assign to variable only within a loop, the variable Layer type will have all the properties and action of the specific layer assigned to it.\r\rItem:\rItem represents any project item compositions, footages , folders.\rItem can be assign to variable only within a loop, the variable Item type will have all the properties and action of the specific Item assigned to it.\r\rProperty/Effect:\rProperty/Effect purpose is to open up more setting for the Layer object properties.\rProperty/Effect enables to perform actions on keyframes and setting up expressions on a specific layer property.\r\rimportant\rfor version 1.0 effects properties not yet supported.\rall transform layer properties are supported:\ranchor point,position,scale,rotation,orientation,opacity.";
        edittext10.preferredSize.height = 464;
        var divider20 = tab10.add("panel", undefined, undefined, {
          name: "divider20",
        });
        divider20.alignment = "fill";
        var tab11 = verticaltabbedpanel1_innerwrap.add("group", undefined, {
          name: "tab11",
        });
        tab11.text = "About";
        tab11.orientation = "column";
        tab11.alignChildren = ["fill", "top"];
        tab11.spacing = 10;
        tab11.margins = 26;
        verticaltabbedpanel1_tabs = [tab1, tab2, tabShortcuts, tab3, tab11];
        for (var i = 0; i < verticaltabbedpanel1_tabs.length; i += 1) {
          verticaltabbedpanel1_tabs[i].alignment = ["fill", "fill"];
          verticaltabbedpanel1_tabs[i].visible = false;
        }
        verticaltabbedpanel1_nav.onChange = showTab_verticaltabbedpanel1;
        verticaltabbedpanel1_nav.selection = 0;
        showTab_verticaltabbedpanel1();
        var statictext19 = tab11.add("statictext", undefined, undefined, {
          name: "statictext19",
        });
        statictext19.text = "About:";
        statictext19.alignment = ["center", "top"];
        var divider20 = tab11.add("panel", undefined, undefined, {
          name: "divider20",
        });
        divider20.alignment = "fill";
        var edittext11 = tab11.add("statictext", undefined, undefined, {
          multiline: true,
          name: "edittext11",
          scrolling: true,
        });
        edittext11.text =
          "Automation Toolkit is an After Effects tool that lets you automate many time consuming tasks.\nThis tool allows you to create a variety of script-like functions, called automations.\n\nAn automation works like any other After Effects script so even if you\u2019re in need of a script that doesn\'t exist, now for the first time you have the power to create it yourself exactly how you want it, without having a PhD in Computer Science...\n\nAutomation Toolkit contains an automation editor for creating and editing automations, and an automations toolbar for running the automations.\n\nYou can also share your automations with others!\n\nAutomation Toolkit makes the power of After Effects scripting accessible for non-coder users.\nThere is no need to know any code language to create an automation, although knowledge at programming will help getting started and creating more complex automations.";
        edittext11.preferredSize.height = 216;
        var divider21 = tab11.add("panel", undefined, undefined, {
          name: "divider21",
        });
        divider21.alignment = "fill";
        var statictext20 = tab11.add("statictext", undefined, undefined, {
          multiline: true,
          name: "statictext20",
          scrolling: true,
        });
        statictext20.text =
          "Automation Toolkit - version " +
          att_settings.scriptVersion +
          "\n\xa92020 Alon Shemer";
        dialog.show();
        dialog = null;
        verticaltabbedpanel1 = null;
        verticaltabbedpanel1_nav = null;
        verticaltabbedpanel1_innerwrap = null;
        tab1 = null;
        group1 = null;
        edittext1 = null;
        statictext1 = null;
        group2 = null;
        statictext2 = null;
        button1 = null;
        statictext2A = null;
        group2A = null;
        Securitycheckbox1 = null;
        group2B = null;
        statictextExportAutomations = null;
        exportButton1 = null;
        statictextExport2 = null;
        tab2 = null;
        group3 = null;
        statictext3 = null;
        radioButtonsGroup = null;
        radiobutton1 = null;
        radiobutton2 = null;
        radiobutton3 = null;
        divider1 = null;
        divider2 = null;
        group4 = null;
        group5 = null;
        statictext5 = null;
        radioButtonsGroup1 = null;
        radiobutton4 = null;
        radiobutton5 = null;
        divider3 = null;
        statictext6 = null;
        group6 = null;
        group7 = null;
        statictext7 = null;
        checkbox3 = null;
        edittext2 = null;
        statictext7A = null;
        group8 = null;
        statictext8 = null;
        checkbox4 = null;
        edittext3 = null;
        statictext8A = null;
        statictext4 = null;
        scriptBox = null;
        divider4 = null;
        group9 = null;
        group10 = null;
        categoriesGroup10 = null;
        statictext_Categories = null;
        dropdown1 = null;
        button2 = null;
        button3 = null;
        group11 = null;
        statictext9 = null;
        group12 = null;
        listbox1 = null;
        group13 = null;
        button4 = null;
        buttonRemoveFromCategory = null;
        button5 = null;
        button6 = null;
        group14 = null;
        button8 = null;
        button7 = null;
        tabShortcuts = null;
        shortcutsTabGroup1 = null;
        shortcutsScriptBox = null;
        shortcutsTabstatictext2 = null;
        shortcutsTabGroup2 = null;
        shortcuts_listbox = null;
        shortcutsTabGroup2B = null;
        addShortcutButton = null;
        removeShortcutButton = null;
        shortcutsTabGroup3 = null;
        generateShortcutButtons = null;
        shortcutsTabstatictext3 = null;
        shortcutsTabDivider1 = null;
        shortcutsTabEedittext = null;
        shortcutsTabDivider2 = null;
        tab3 = null;
        panel1 = null;
        statictext10 = null;
        divider5 = null;
        statictext11 = null;
        divider6 = null;
        verticaltabbedpanel2 = null;
        verticaltabbedpanel2_nav = null;
        verticaltabbedpanel2_innerwrap = null;
        tab4 = null;
        statictext12 = null;
        divider7 = null;
        edittext4 = null;
        divider8 = null;
        tab5 = null;
        statictext13 = null;
        divider9 = null;
        edittext5 = null;
        divider10 = null;
        tab6 = null;
        statictext14 = null;
        divider11 = null;
        edittext6 = null;
        divider12 = null;
        tab7 = null;
        statictext15 = null;
        divider13 = null;
        edittext7 = null;
        divider14 = null;
        tab8 = null;
        statictext16 = null;
        divider15 = null;
        edittext8 = null;
        divider16 = null;
        tab9 = null;
        statictext17 = null;
        divider17 = null;
        edittext9 = null;
        divider18 = null;
        tab10 = null;
        statictext18 = null;
        divider19 = null;
        edittext10 = null;
        divider20 = null;
        tab11 = null;
        statictext19 = null;
        divider20 = null;
        edittext11 = null;
        divider21 = null;
        statictext20 = null;
      }
      function removePalElements2(paltemp) {
        if (
          paltemp.type == "group" ||
          paltemp.type == "panel" ||
          paltemp == pal
        ) {
          for (var i = paltemp.children.length - 1; i >= 0; i--) {
            removePalElements2(paltemp.children[i]);
          }
        }
        if (paltemp == pal) {
        } else {
          paltemp.parent.remove(paltemp);
        }
      }
      function collapseAll(object) {
        for (var i = 0; i < object.scope.length; i += 1) {
          if (object.scope[i].hasOwnProperty("scope")) {
            object.scope[i].collapse = true;
            collapseAll(object.scope[i]);
          }
        }
      }
      function getFileExtension(file) {
        var i = file.fsName.lastIndexOf(".");
        return i < 0 ? "" : file.fsName.substring(i);
      }
      function findAlerts(command) {
        function find(child, tempCommands, parentArray) {
          for (var i = 0; i < tempCommands.scope.length; i += 1) {
            if (child == tempCommands.scope[i]) {
              return parentArray;
            } else {
              if (tempCommands.scope[i].hasOwnProperty("scope")) {
                parentArray = find(child, tempCommands.scope[i], parentArray);
              } else {
                if (tempCommands.scope[i] instanceof Alert) {
                  parentArray.push({ name: tempCommands.scope[i].elementName });
                }
              }
            }
          }
          return parentArray;
        }
        var ar = [];
        return find(command, findGolbalScope(command), ar);
      }
      function inArray(needle, haystack) {
        if (haystack && haystack.length) {
          for (var i = 0; i < haystack.length; i += 1) {
            if (haystack[i] === needle) {
              return true;
              break;
            }
          }
          return false;
        } else {
          return false;
        }
      }
      function inArray2(needle, haystack) {
        if (haystack && haystack.length) {
          for (var i = 0; i < haystack.length; i += 1) {
            try {
              if (haystack[i] === needle) {
                return true;
                break;
              }
            } catch (err) {}
          }
          return false;
        } else {
          return false;
        }
      }
      function makeArrayFromAttribute(attribute, arrayObject) {
        var newArray = new Array();
        for (var i = 0; i < arrayObject.length; i += 1) {
          newArray.push(arrayObject[i][attribute]);
        }
        return newArray;
      }
      function addToArray(arr1, arr2, where) {
        if (arr2 && arr2.length) {
          for (var i = 0; i < arr2.length; i += 1) {
            switch (where) {
              case "start":
                arr1.unshift(arr2[i]);
                break;
              case "end":
                arr1.push(arr2[i]);
                break;
            }
          }
        }
      }
      function isSecurityPrefSet() {
        try {
          var securitySetting = app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          );
          return securitySetting == 1;
        } catch (e) {
          return (securitySetting = 1);
        }
      }
      function checkFileNameIsShortcutFile() {
        var fileDisplayName = thisScriptFile.displayName;
        for (var i = 0; i < data.scriptsArray.length; i += 1) {
          if (
            fileDisplayName ==
            "Automation-Toolkit_" + data.scriptsArray[i].name + ".jsxbin"
          ) {
            app.beginUndoGroup("Custom Automation");
            try {
              data.scriptsArray[i].run();
            } catch (err) {}
            app.endUndoGroup();
            return true;
            break;
          }
        }
        return false;
      }
      function generateShortcutFiles() {
        var scriptUIFolder = Folder(thisScriptFile.parent.toString());
        var mainScriptsFolder = Folder(scriptUIFolder.parent.toString());
        var WriteMessage = true;
        if (
          scriptUIFolder.displayName === "ScriptUI Panels" &&
          mainScriptsFolder.displayName === "Scripts"
        ) {
          var shortcutsFolder = Folder(
            mainScriptsFolder.toString() + "/Automation Toolkit Shortcuts",
          );
          var checkShortcutFolder = true;
          if (!shortcutsFolder.exists) {
            checkShortcutFolder = shortcutsFolder.create();
          }
          if (checkShortcutFolder) {
            var sciprtsFiles = shortcutsFolder.getFiles();
            if (sciprtsFiles) {
              for (var i = 0; i < sciprtsFiles.length; i += 1) {
                sciprtsFiles[i].remove();
              }
            }
            for (var i = 0; i < data.keyboardShortcuts.length; i += 1) {
              for (var j = 0; j < data.scriptsArray.length; j += 1) {
                if (data.keyboardShortcuts[i] == j) {
                  var automationName = data.scriptsArray[j].name;
                  var fixedFilename = automationName.replace(
                    /[\/|\\:*?"<>]/g,
                    " ",
                  );
                  if (automationName == fixedFilename) {
                    WriteMessage = thisScriptFile.copy(
                      mainScriptsFolder.toString() +
                        "/Automation Toolkit Shortcuts/Automation-Toolkit_" +
                        automationName.toString() +
                        ".jsxbin",
                    );
                  } else {
                    alert(
                      "the name \'\'" +
                        automationName +
                        "\'\' is invalid name for a file, please change the automation name and try again.",
                    );
                  }
                }
                if (!WriteMessage) {
                  break;
                }
              }
              if (!WriteMessage) {
                break;
              }
            }
            if (!WriteMessage) {
              alert(
                "Could not create the shortcut folder, Automation Toolkit don\'t have permissions to write files on this location-\n" +
                  mainScriptsFolder.toString() +
                  "\n1. please save this folder on a custom location\n2. copy the new Automation Toolkit Shortcuts folder to the after effects script folder(not the scriptUI folder)\n(on mac)/Applications/Adobe After Effects (version)/Scripts/\n(on windows)c:/Program Files/Adobe/Adobe After Effects (version)/Support Files/Scripts/\n3.restart after effects and assign new keyboard shortcut for this script",
              );
            } else {
              alert(
                data.keyboardShortcuts.length.toString() +
                  " keyboard shortcut files have been successfully created, please restart after effects now",
              );
            }
          } else {
            WriteMessage = false;
            alert(
              "Could not create the shortcut folder, Automation Toolkit don\'t have permissions to write files on this location-\n" +
                mainScriptsFolder.toString() +
                "\n1. please save this folder on a custom location\n2. copy the new Automation Toolkit Shortcuts folder to the after effects script folder(not the scriptUI folder)\n(on mac)/Applications/Adobe After Effects (version)/Scripts/\n(on windows)c:/Program Files/Adobe/Adobe After Effects (version)/Support Files/Scripts/\n3.restart after effects and assign new keyboard shortcut for this script",
            );
          }
        } else {
          WriteMessage = false;
          alert(
            "can\'t find the after effects scripts folder location,\n1. please save this folder on a custom location\n2. copy the new Automation Toolkit Shortcuts folder to the after effects scripts folder(not the scriptUI Panels folder)\n(on mac)/Applications/Adobe After Effects (version)/Scripts/\n(on windows)c:/Program Files/Adobe/Adobe After Effects (version)/Support Files/Scripts/\n3. restart after effects and assign new keyboard shortcut for this script (from the after effects keyboard shortcuts menu)",
          );
        }
        if (!WriteMessage) {
          var WriteMessage2 = true;
          var dskTop = Folder.desktop;
          var dskPthFolder = String(dskTop);
          var newExportSpot = new File(
            dskPthFolder + "/" + "Automation Toolkit Shortcuts",
          );
          var myExportDestination = newExportSpot.saveDlg(
            "Select Destination Folder",
          );
          if (myExportDestination != null) {
            var exportFolder = Folder(
              myExportDestination.parent.toString() +
                "/" +
                newExportSpot.displayName.toString(),
            );
            if (!exportFolder.exists) {
              var checkExportFolder = exportFolder.create();
              if (checkExportFolder) {
                try {
                  for (var i = 0; i < data.keyboardShortcuts.length; i += 1) {
                    for (var j = 0; j < data.scriptsArray.length; j += 1) {
                      if (data.keyboardShortcuts[i] == j) {
                        var automationName = data.scriptsArray[j].name;
                        WriteMessage2 = thisScriptFile.copy(
                          exportFolder.toString() +
                            "/Automation-Toolkit_" +
                            automationName.toString() +
                            ".jsxbin",
                        );
                      }
                      if (!WriteMessage2) {
                        break;
                      }
                    }
                    if (!WriteMessage2) {
                      break;
                    }
                  }
                  if (!WriteMessage2) {
                    alert("error - could not complete this taks");
                  } else {
                    alert(
                      data.keyboardShortcuts.length.toString() +
                        " keyboard shortcut files have been successfully created, please restart after effects now",
                    );
                  }
                } catch (err) {
                  alert("error - could not complete this taks");
                }
              } else {
                alert("Error - Could not create the folder");
              }
            } else {
              alert(
                "Automation Toolkit found a folder with the same name, please type a diffrent name.",
              );
            }
          }
        }
      }
      var compatibleVersions = [
        "1.0",
        "1.0.1",
        "1.0.2",
        "1.0.2.1",
        "1.0.2.2",
        "1.0.2.3",
        "1.0.2.4",
        "1.0.2.5",
        "1.0.2.6",
        "1.0.2.7",
        "1.0.3",
        "1.0.3.1",
        "1.0.3.2",
        "1.0.3.3",
        "1.0.3.4",
        "1.0.3.5",
        "1.0.3.6",
      ];
      var uiFolder = Folder(
        Folder.userData.toString() + "/Aescripts/Automation Toolkit/Ui",
      );
      if (!uiFolder.exists) {
        var checkFolder = uiFolder.create();
        if (!checkFolder) {
          uiFolder = Folder(
            Folder.temp.toString() + "/Aescripts/Automation Toolkit/Ui",
          );
          if (!uiFolder.exists) {
            uiFolder.create();
          }
        }
      }
      var scriptFile = File(
        uiFolder.parent.toString() +
          "/Automation-Toolkit_Automations-Data_v" +
          att_settings.scriptVersion +
          ".json",
      );
      scriptFile.encoding = "UTF-8";
      var scriptCategorySelectFile = File(
        uiFolder.toString() +
          "/Automation-Toolkit_Selected-Category-Data_v" +
          att_settings.scriptVersion +
          ".json",
      );
      var operatingSystem = Folder.fs;
      Number.isInteger =
        Number.isInteger ||
        function (value) {
          return (
            typeof value === "number" &&
            isFinite(value) &&
            Math.floor(value) === value
          );
        };
      var settingsSmallIcon =
        '\x89PNG\r\n\x1a\n\x00\x00\x00\rIHDR\x00\x00\x00\x10\x00\x00\x00\x10\b\x06\x00\x00\x00\x1f\xf3\xffa\x00\x00\x00\tpHYs\x00\x00\x00\x01\x00\x00\x00\x01\x00O%\xc4\xd6\x00\x00\x00$zTXtCreator\x00\x00\b\x99sL\xc9OJUpL+I-RpMKKM.)\x06\x00Az\x06\xcejz\x15\xc5\x00\x00\x01\x1eIDAT8\x8d\x8d\xd3\xbf+FQ\x1c\xc7\xf1\xd7\xe5\x1a\x94\xc4\xe4G\x89IO&\xa5\x98ld\x95\xf2\x07(1\x98M<#\xcab3)\x91Xdb\xb01z\x8c\x06e\xb0\xf9\xb11y\x94\x9e\x18\xeeQ\xb7\x93{\x1f\xef\xed{\xcf\xfd|\xce\xf7s\xce\xf7$\xb5ZM\x8e\x11l\xa3\x13\x1b\xb8\xd4\x84\x14}h\x0f\xf5\x19\xaax\xc2\t\xc6\xd0\x96[\x8f\xa9\xa7\xd8C\x0f\x12\f\x05\x93\x06\x1e1\x88u\f\x14\x18\xbc&Q\x84Ct\x87\x0e&0\x8e\xaf\xb2\b-Q\xbd\x80\x03\xdcb\xb2\x99\x98\xec\f\xf24pZ\xf0o+z\xf1\x8c\xef"\x83"\x86q\x11:\xaac\no\xbf\x06\xcb\xe8*\x11\x9fc\x15\x9b\xd8\xc7.\x8eq\x85\xf7\xf8\f\xcaH\xfe\xf8\xf6\x1d\xdfB\x11\xf9\b\x1f\x98\x96\x8b\xf0\x1f\x1eP\x91\xcd\xcbs~!\x8eP\xc1\x8a\xec\xfec\x1a\xb186\x18\x95\xcd~\xbfl\x16\xe6\xfe\xd3Z*\xcb\xd6\x13\x84GX\xc35\x96\xc2\xae\xd5\x12\xfdk\x8aE\xd9c\x99\xc5L\x881\x8f\xfb\xd0\xd1]\x89A=\xc5K(v\xd0\x11\xda\xbf\xc1\x16>e\x8f\xaa\x90\x1fq\xb5A\n}\xeb\x1a\xf6\x00\x00\x00\x00IEND\xaeB`\x82';
      var licenseIcon = __BLOB__BLOB_000099__;
      var pal =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", this.scriptTitle, undefined, {
              resizeable: true,
            });
      pal.orientation = "row";
      pal.spacing = 0;
      pal.preferredSize = [900, 550];
      pal.maximumSize = [3840, 2160];
      var afterEffectsVersion = parseFloat(app.version);
      var errorMessege = true;
      var securityState = isSecurityPrefSet();
      var editMode = false;
      var editModeLoad = false;
      var pasteMode = false;
      var pasteModeLoad = false;
      var ButtonStroke = false;
      var editorStaticUiContainer = {};
      var editorDynamicUIContainer = {};
      var mainStaticUiContainer = {};
      var mainUIButtons = {};
      if (operatingSystem == "Windows") {
        ButtonStroke = true;
      }
      if (operatingSystem == "Windows") {
        buttonBackgroundColor = [1, 1, 1, 0];
      } else {
        buttonBackgroundColor = [0, 0, 0, 0.2];
      }
      var scroll_memory = 0;
      var scroll_last_trget = 0;
      var scroll_current_trget = 950;
      var scroll_minimum_trget = -100;
      var scroll_maximum_trget = 1450;
      var scroll_memory_x = 0;
      var optimizeViewEnabled = false;
      var lastRunTime = null;
      var undoObject = { currentScope: null, history: [], index: null };
      var selectedLines = [];
      var copiedData = null;
      var uiVariables = { alert: [], variables: [] };
      var linesCounter = 0;
      if (typeof Array.isArray === "undefined") {
        Array.isArray = function (obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      var globalEnv = {};
      function AddCompItemAction() {
        this.UiName = "add composition";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            var newItem = object.items.addComp(value, 1920, 1080, 1, 10, 25);
          } catch (err) {}
        };
      }
      function AddFolderItemAction() {
        this.UiName = "add folder";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            var newItem = object.items.addFolder(value);
          } catch (err) {}
        };
      }
      function MenuCommandAction() {
        this.UiName = "menu command";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            app.executeCommand(app.findMenuCommandId(value));
          } catch (err) {}
        };
      }
      function JavaScriptCodeAction() {
        this.UiName = "run javascript code";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          if (data.hasOwnProperty("run_external_code")) {
            if (data.run_external_code == true) {
              try {
                var theInstructions = value;
                var F = new Function(theInstructions);
                return F();
              } catch (err) {}
            } else {
              alert(
                "This automation trying to run javascript code from unknown source, allow Automation Toolkit to run external javascript codes in the settings only if you trust the source of the automation",
              );
            }
          }
        };
      }
      function RenderProjectAction() {
        this.UiName = "start render";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          try {
            app.endUndoGroup();
            app.project.renderQueue.render();
            app.beginUndoGroup("Custom Automation");
          } catch (err) {}
        };
      }
      function RemoveUnusedFootageProjectAction() {
        this.UiName = "remove unused footage";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          try {
            app.project.removeUnusedFootage();
          } catch (err) {}
        };
      }
      function ProjectName() {
        this.UiName = "name";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.name;
        };
      }
      function LinearizeWorkingSpaceProjectProperty() {
        this.UiName = "linearize working space";
        this.objectType = "Boolean";
        this.supportedVersion = 16;
        this.getValue = function (object) {
          return object.linearizeWorkingSpace;
        };
        this.setValue = function (value, object) {
          object.linearizeWorkingSpace = value;
        };
      }
      function BlendingSpaceProjectProperty() {
        this.UiName = "linear blending";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.linearBlending;
        };
        this.setValue = function (value, object) {
          object.linearBlending = value;
        };
      }
      function BitsPerChannelProjectProperty() {
        this.UiName = "color bit depth";
        this.objectType = "Array";
        this.options = ["8", "16", "32"];
        this.optionsSet = { 16: 16, 32: 32, 8: 8 };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.bitsPerChannel) {
              return key;
              break;
            }
          }
          return object.bitsPerChannel;
        };
        this.setValue = function (value, object) {
          object.bitsPerChannel = this.optionsSet[value];
        };
      }
      function TimeDisplayStyleProjectProperty() {
        this.UiName = "time display style";
        this.objectType = "Array";
        this.options = ["timecode", "frames"];
        this.optionsSet = {
          frames: TimeDisplayType.FRAMES,
          timecode: TimeDisplayType.TIMECODE,
        };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.timeDisplayType) {
              return key;
              break;
            }
          }
          return object.timeDisplayType;
        };
        this.setValue = function (value, object) {
          object.timeDisplayType = this.optionsSet[value];
        };
      }
      function WorkingSpaceProjectProperty() {
        this.UiName = "working space";
        this.objectType = "Array";
        this.supportedVersion = 16;
        this.options = ["none"];
        try {
          this.options = app.project.listColorProfiles();
          this.options.unshift("none");
        } catch (err) {
          this.options = ["none"];
        }
        this.getValue = function (object) {
          return object.workingSpace;
        };
        this.setValue = function (value, object) {
          try {
            if (value == "none") {
              object.workingSpace = "";
            } else {
              object.workingSpace = value;
            }
          } catch (err) {
            object.workingSpace = "";
          }
        };
      }
      function WorkingGammaProjectProperty() {
        this.UiName = "working gamma";
        this.objectType = "Array";
        this.supportedVersion = 16;
        this.options = ["2.2(sRGB)", "2.4(Rec.709)"];
        this.optionsSet = { "2.2(sRGB)": 2.2, "2.4(Rec.709)": 2.4 };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.workingGamma) {
              return key;
              break;
            }
          }
          return object.workingGamma;
        };
        this.setValue = function (value, object) {
          object.workingGamma = this.optionsSet[value];
        };
      }
      function RenderQueueNumItems() {
        this.UiName = "number of render queue items";
        this.objectType = "Number";
        this.getValue = function (object) {
          return app.project.renderQueue.numItems;
        };
      }
      function RandomizeNumberVariableAction() {
        this.UiName = "randomize number";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          function getRndInteger(min, max) {
            return Math.floor(Math.random() * (max - min + 1)) + min;
          }
          function getRndFloat(min, max) {
            if (object.randomMinimum == 0 && object.randomMaximum == 1) {
              var rand = Math.random();
            } else {
              var rand =
                Math.random() < 0.5
                  ? (1 - Math.random()) * (max - min) + min
                  : Math.random() * (max - min) + min;
            }
            return rand;
          }
          try {
            if (object.roundRandom == true) {
              object.value = getRndInteger(
                object.randomMinimum,
                object.randomMaximum,
              );
            } else {
              object.value = getRndFloat(
                object.randomMinimum,
                object.randomMaximum,
              );
            }
          } catch (err) {}
        };
      }
      function RoundNumberVariableAction() {
        this.UiName = "round number";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          try {
            object.value = Math.round(object.value);
          } catch (err) {}
        };
      }
      function RoundNumberToFrameRateVariableAction() {
        this.UiName = "snap to frame rate";
        this.objectType = "Number";
        this.makeAction = function (value, object) {
          try {
            if (value > 0) {
              object.value = Math.ceil(object.value * value) / value;
            }
          } catch (err) {}
        };
      }
      function TextToNumberVariableAction() {
        this.UiName = "convert text to number";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            object.value = parseFloat(value);
          } catch (err) {}
        };
      }
      function ReplacePartTextVariableAction() {
        this.UiName = "find and replace text element";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            if (object.partText == "\\n" || value == "\\n") {
              if (object.partText == "\\n" && value == "\\n") {
              } else {
                if (object.partText == "\\n") {
                  object.value = object.value.replace(/(?:\r\n|\r|\n)/g, value);
                } else {
                  if (value == "\\n") {
                    object.value = object.value
                      .split(object.partText)
                      .join("\n");
                  }
                }
              }
            } else {
              object.value = object.value.split(object.partText).join(value);
            }
          } catch (err) {}
        };
      }
      function ReplaceLastPartTextVariableAction() {
        this.UiName = "find and replace last text element";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            object.value =
              object.value.substring(
                0,
                object.value.lastIndexOf(object.partText),
              ) + value;
          } catch (err) {}
        };
      }
      function ReplaceFirstPartTextVariableAction() {
        this.UiName = "find and replace first text element";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            object.value = object.value.replace(object.partText, value);
          } catch (err) {}
        };
      }
      function ToUpperCaseVariableAction() {
        this.UiName = "make uppercase";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          try {
            object.value = object.value.toUpperCase();
          } catch (err) {}
        };
      }
      function ToLowerCaseVariableAction() {
        this.UiName = "make lowercase";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          try {
            object.value = object.value.toLowerCase();
          } catch (err) {}
        };
      }
      function TrimTextVariableAction() {
        this.UiName = "remove whitespace";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          try {
            object.value = object.value.replace(
              /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,
              "",
            );
          } catch (err) {}
        };
      }
      function ValueVariableProperty(objectType) {
        this.UiName = "value";
        this.objectType = objectType;
        this.getValue = function (object) {
          return object.value;
        };
        this.setValue = function (value, object) {
          object.value = value;
        };
      }
      function RandomMinValueVariableProperty() {
        this.UiName = "random minimum";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.randomMinimum;
        };
        this.setValue = function (value, object) {
          object.randomMinimum = value;
        };
      }
      function RandomMaxValueVariableProperty() {
        this.UiName = "random maximum";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.randomMaximum;
        };
        this.setValue = function (value, object) {
          object.randomMaximum = value;
        };
      }
      function RoundRandomValueVariableProperty() {
        this.UiName = "round random";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.roundRandom;
        };
        this.setValue = function (value, object) {
          object.roundRandom = value;
        };
      }
      function WordTextVariableProperty() {
        this.UiName = "text element";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.partText;
        };
        this.setValue = function (value, object) {
          object.partText = value;
        };
      }
      function TextLengthVariableProperty() {
        this.UiName = "text length";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.value.length;
        };
      }
      function WordCountVariableProperty() {
        this.UiName = "word count";
        this.objectType = "Number";
        this.getValue = function (object) {
          function countWords(str) {
            if (typeof str === "string" || str instanceof String) {
              try {
                return str.match(/(\w+)/g).length;
              } catch (err) {
                return 0;
              }
            } else {
              return undefined;
            }
          }
          try {
            return countWords(object.value);
          } catch (err) {}
        };
      }
      function ContainsPartTextVariableProperty() {
        this.UiName = "contains text element";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          try {
            if (object.partText != "" && object.value != "") {
              return object.value.indexOf(object.partText) !== -1;
            } else {
              return false;
            }
          } catch (err) {}
        };
      }
      function StartWithContainsPartTextVariableProperty() {
        this.UiName = "starts with text element";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          try {
            if (object.partText != "" && object.value != "") {
              return startsWith(object.value, object.partText);
            } else {
              return false;
            }
          } catch (err) {}
        };
      }
      function EndWithContainsPartTextVariableProperty() {
        this.UiName = "ends with text element";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          try {
            if (object.partText != "" && object.value != "") {
              return endsWith(object.value, object.partText);
            } else {
              return false;
            }
          } catch (err) {}
        };
      }
      function AddPropertyElementAction(objectType) {
        this.UiName = "add element";
        this.objectType = objectType;
        this.makeAction = function (value, collection) {
          try {
            collection.value.push(value);
          } catch (err) {}
        };
      }
      function AddPropertyElementAtIndexAction(objectType) {
        this.UiName = "add element at index";
        this.objectType = objectType;
        this.makeAction = function (value, collection) {
          try {
            if (
              collection.index <= collection.value.length &&
              collection.index > 0
            ) {
              collection.value.splice(collection.index - 1, 0, value);
            }
          } catch (err) {}
        };
      }
      function RemovePropertyElementAction() {
        this.UiName = "remove element at index";
        this.objectType = "Void";
        this.makeAction = function (value, collection) {
          try {
            if (
              collection.index > 0 &&
              collection.index <= collection.value.length
            ) {
              collection.value.splice(collection.index - 1, 1);
            }
          } catch (err) {}
        };
      }
      function RemoveAllElementsAction() {
        this.UiName = "remove all";
        this.objectType = "Void";
        this.makeAction = function (value, collection) {
          try {
            collection.value = [];
          } catch (err) {}
        };
      }
      function AddLettersPropertyElementAction(objectType) {
        this.UiName = "add letters as elements";
        this.objectType = objectType;
        this.makeAction = function (value, collection) {
          try {
            var arr = value.split("");
            collection.value = collection.value.concat(arr);
          } catch (err) {}
        };
      }
      function AddWordsPropertyElementAction(objectType) {
        this.UiName = "add words as elements";
        this.objectType = objectType;
        this.makeAction = function (value, collection) {
          try {
            var arr = value.split(" ");
            collection.value = collection.value.concat(arr);
          } catch (err) {}
        };
      }
      function AddLinesPropertyElementAction(objectType) {
        this.UiName = "add lines as elements";
        this.objectType = objectType;
        this.makeAction = function (value, collection) {
          try {
            var arr = value.split("\n");
            collection.value = collection.value.concat(arr);
          } catch (err) {}
        };
      }
      function AddLettersBySeparatorElementAction(objectType) {
        this.UiName = "add text elements by separator";
        this.objectType = objectType;
        this.makeAction = function (value, collection) {
          try {
            var arr = value.split(collection.separator);
            collection.value = collection.value.concat(arr);
          } catch (err) {}
        };
      }
      function AddNumbersPropertyElementAction() {
        this.UiName = "add a list of numbers as elements";
        this.objectType = "Text";
        this.makeAction = function (value, collection) {
          try {
            var arr = value.split(",");
            var validNumbers = true;
            for (var i = 0; i < arr.length; i += 1) {
              arr[i] = parseFloat(arr[i]);
              if (isNaN(arr[i])) {
                validNumbers = false;
              }
            }
            if (validNumbers) {
              collection.value = collection.value.concat(arr);
            }
          } catch (err) {}
        };
      }
      function CollectionValueVariableProperty(objectType) {
        this.UiName = "element at index";
        this.objectType = objectType;
        this.getValue = function (collection) {
          return collection.value[collection.index - 1];
        };
        this.setValue = function (value, collection) {
          collection.value[collection.index - 1] = value;
        };
      }
      function PropertyCurrentIndex() {
        this.UiName = "index";
        this.objectType = "Number";
        this.getValue = function (collection) {
          return collection.index;
        };
        this.setValue = function (value, collection) {
          try {
            if (value > 0) {
              collection.index = value;
            }
          } catch (err) {}
        };
      }
      function PropertyCollectionSeparator() {
        this.UiName = "separator";
        this.objectType = "Text";
        this.getValue = function (collection) {
          return collection.separator;
        };
        this.setValue = function (value, collection) {
          try {
            collection.separator = value.replace(/\\n/g, "\n");
          } catch (err) {}
        };
      }
      function PropertyCollectionLength() {
        this.UiName = "collection length";
        this.objectType = "Number";
        this.getValue = function (collection) {
          return collection.value.length;
        };
      }
      function PropertyCollectionJoinedText() {
        this.UiName = "joined text";
        this.objectType = "Text";
        this.getValue = function (collection) {
          return collection.value.join("");
        };
      }
      function PropertyCollectionPrintAll() {
        this.UiName = "all elements as text";
        this.objectType = "Text";
        this.getValue = function (collection) {
          return collection.value.join(",");
        };
      }
      function PropertyCollectionPrintAllWithSeparator() {
        this.UiName = "all elements as text with separator";
        this.objectType = "Text";
        this.getValue = function (collection) {
          return collection.value.join(collection.separator);
        };
      }
      function DeletePropertyKeysAction() {
        this.UiName = "delete all keyframes";
        this.objectType = "Void";
        this.makeAction = function (value, object, propertyObject) {
          try {
            var tempValue = object.value;
            for (var i = object.numKeys; i > 0; i--) {
              object.removeKey(i);
            }
            object.setValue(tempValue);
          } catch (err) {}
        };
      }
      function AddPropertyKeysAction() {
        this.UiName = "add key";
        this.objectType = "Text";
        this.makeAction = function (value, object, propertyObject) {
          try {
            if (propertyObject.origianlProperty != undefined) {
              propertyObject.origianlProperty.setValueAtTime(
                object,
                propertyObject.timeValue,
                value,
              );
            } else {
              propertyObject.properties[2].setValueAtTime(
                object,
                propertyObject.timeValue,
                value,
              );
            }
          } catch (err) {}
        };
      }
      function DeletePropertyKeyAtTimeAction() {
        this.UiName = "delete key";
        this.objectType = "Void";
        this.makeAction = function (value, object, propertyObject) {
          try {
            var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
            if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
              object.removeKey(nearestIndex);
            }
          } catch (err) {}
        };
      }
      function PropertyName() {
        this.UiName = "name";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.name;
        };
      }
      function PropertyMatchName() {
        this.UiName = "match name";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.matchName;
        };
      }
      function PropertyIsTimeVarying() {
        this.UiName = "have keyframes";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.isTimeVarying;
        };
      }
      function PropertyNumKeys() {
        this.UiName = "number of keyframes";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.numKeys;
        };
      }
      function PropertyExpression() {
        this.UiName = "expression";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.expression;
        };
        this.setValue = function (value, object) {
          try {
            object.expression = value;
          } catch (err) {}
        };
      }
      function PropertyExpressionEnabled() {
        this.UiName = "is expression enabled";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.expressionEnabled;
        };
        this.setValue = function (value, object) {
          try {
            object.expressionEnabled = value;
          } catch (err) {}
        };
      }
      function PropertyValue() {
        this.UiName = "value";
        this.objectType = "Text";
        this.getValue = function (object, propertyObject) {
          return object.value;
        };
        this.setValue = function (value, object) {
          try {
            object.setValue(value);
          } catch (err) {
            try {
              var res = value.split(",");
              for (var i = 0; i < res.length; i += 1) {
                res[i] = parseFloat(res[i]);
              }
              if (res && res.length) {
                object.setValue(res);
              }
            } catch (err) {}
          }
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, value);
          } catch (err) {
            try {
              var res = value.split(",");
              for (var i = 0; i < res.length; i += 1) {
                res[i] = parseFloat(res[i]);
              }
              if (res && res.length) {
                object.setValueAtTime(time, res);
              }
            } catch (err) {}
          }
        };
        this.getValueAtTime = function (object, propertyObject) {
          try {
            return object
              .valueAtTime(propertyObject.timeValue, false)
              .toString();
          } catch (err) {}
        };
      }
      function OriginalPropertyValue() {
        this.UiName = "value";
        this.objectType = "Text";
        this.getValue = function (object, propertyObject) {
          return propertyObject.origianlProperty.getPropertyValue(object);
        };
        this.setValue = function (value, object, propertyObject) {
          propertyObject.origianlProperty.setPropertyValue(value, object);
        };
        this.setValueAtTime = function (object, time, value) {
          propertyObject.origianlProperty.setValueAtTime(object, time, value);
        };
        this.getValueAtTime = function (object, propertyObject) {
          try {
            return propertyObject.origianlProperty.getValueAtTime(
              object,
              propertyObject.timeValue,
            );
          } catch (err) {}
        };
      }
      function PropertyAddKeyTime() {
        this.UiName = "time";
        this.objectType = "Number";
        this.getValue = function (object, propertyObject) {
          return propertyObject.timeValue;
        };
        this.setValue = function (value, object, propertyObject) {
          try {
            propertyObject.timeValue = value;
          } catch (err) {}
        };
      }
      function PropertyKeyIndex() {
        this.UiName = "index";
        this.objectType = "Number";
        this.getValue = function (object, propertyObject) {
          var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
          if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
            return nearestIndex;
          } else {
            return -1;
          }
        };
      }
      function PropertyKeySelected() {
        this.UiName = "keyframe selected";
        this.objectType = "Boolean";
        this.getValue = function (object, propertyObject) {
          var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
          if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
            return object.keySelected(nearestIndex);
          } else {
            return false;
          }
        };
        this.setValue = function (value, object, propertyObject) {
          try {
            var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
            if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
              object.setSelectedAtKey(nearestIndex, value);
            }
          } catch (err) {}
        };
      }
      function PropertyPropertySelected() {
        this.UiName = "property selected";
        this.objectType = "Boolean";
        this.getValue = function (object, propertyObject) {
          try {
            return object.selected;
          } catch (err) {
            return false;
          }
        };
        this.setValue = function (value, object, propertyObject) {
          try {
            object.selected = value;
          } catch (err) {}
        };
      }
      function PropertykeySpeedIn() {
        this.UiName = "speed in";
        this.objectType = "Number";
        this.getValue = function (object, propertyObject) {
          var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
          if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
            return object.keyInTemporalEase(nearestIndex)[0].speed;
          } else {
            return false;
          }
        };
        this.setValue = function (value, object, propertyObject) {
          try {
            var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
            if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
              var easeIn = new KeyframeEase(
                value,
                object.keyInTemporalEase(nearestIndex)[0].influence,
              );
              var easeOut = new KeyframeEase(
                object.keyOutTemporalEase(nearestIndex)[0].speed,
                object.keyOutTemporalEase(nearestIndex)[0].influence,
              );
              object.setTemporalEaseAtKey(nearestIndex, [easeIn], [easeOut]);
            }
          } catch (err) {}
        };
      }
      function PropertykeySpeedOut() {
        this.UiName = "speed out";
        this.objectType = "Number";
        this.getValue = function (object, propertyObject) {
          var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
          if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
            return object.keyOutTemporalEase(nearestIndex)[0].speed;
          } else {
            return false;
          }
        };
        this.setValue = function (value, object, propertyObject) {
          try {
            var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
            if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
              var easeIn = new KeyframeEase(
                object.keyInTemporalEase(nearestIndex)[0].speed,
                object.keyInTemporalEase(nearestIndex)[0].influence,
              );
              var easeOut = new KeyframeEase(
                value,
                object.keyOutTemporalEase(nearestIndex)[0].influence,
              );
              object.setTemporalEaseAtKey(nearestIndex, [easeIn], [easeOut]);
            }
          } catch (err) {}
        };
      }
      function PropertykeyinfluenceIn() {
        this.UiName = "influence in";
        this.objectType = "Number";
        this.getValue = function (object, propertyObject) {
          var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
          if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
            return object.keyInTemporalEase(nearestIndex)[0].influence;
          } else {
            return false;
          }
        };
        this.setValue = function (value, object, propertyObject) {
          try {
            var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
            if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
              var easeIn = new KeyframeEase(
                object.keyInTemporalEase(nearestIndex)[0].speed,
                value,
              );
              var easeOut = new KeyframeEase(
                object.keyOutTemporalEase(nearestIndex)[0].speed,
                object.keyOutTemporalEase(nearestIndex)[0].influence,
              );
              object.setTemporalEaseAtKey(nearestIndex, [easeIn], [easeOut]);
            }
          } catch (err) {}
        };
      }
      function PropertykeyinfluenceOut() {
        this.UiName = "influence out";
        this.objectType = "Number";
        this.getValue = function (object, propertyObject) {
          var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
          if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
            return object.keyOutTemporalEase(nearestIndex)[0].influence;
          } else {
            return false;
          }
        };
        this.setValue = function (value, object, propertyObject) {
          try {
            var nearestIndex = object.nearestKeyIndex(propertyObject.timeValue);
            if (object.keyTime(nearestIndex) == propertyObject.timeValue) {
              var easeIn = new KeyframeEase(
                object.keyInTemporalEase(nearestIndex)[0].speed,
                object.keyInTemporalEase(nearestIndex)[0].influence,
              );
              var easeOut = new KeyframeEase(
                object.keyOutTemporalEase(nearestIndex)[0].speed,
                value,
              );
              object.setTemporalEaseAtKey(nearestIndex, [easeIn], [easeOut]);
            }
          } catch (err) {}
        };
      }
      function PropertyThisProperty() {
        this.UiName = "this property";
        this.objectType = "Property/Effect";
        this.getValue = function (object, propertyObject) {
          return new PropertyObject(object, propertyObject.origianlProperty);
        };
      }
      function AddMarkerKeysAction() {
        this.UiName = "add marker";
        this.objectType = "Text";
        this.makeAction = function (value, object, markerObject) {
          try {
            var newMarker = new MarkerValue(value);
            object.setValueAtTime(markerObject.timeValue, newMarker);
          } catch (err) {}
        };
      }
      function DeleteMarkerKeyAtTimeAction() {
        this.UiName = "delete marker";
        this.objectType = "Void";
        this.makeAction = function (value, object, markerObject) {
          try {
            var nearestIndex = object.nearestKeyIndex(markerObject.timeValue);
            if (object.keyTime(nearestIndex) == markerObject.timeValue) {
              object.removeKey(nearestIndex);
            }
          } catch (err) {}
        };
      }
      function MarkerComment() {
        this.UiName = "comment";
        this.objectType = "Text";
        this.getValue = function (object, markerObject) {
          return object.valueAtTime(markerObject.timeValue, true).comment;
        };
        this.setValue = function (value, object, markerObject) {
          try {
            var newMarker = new MarkerValue(value);
            newMarker.comment = value;
            newMarker.duration = object.valueAtTime(
              markerObject.timeValue,
              true,
            ).duration;
            try {
              newMarker.label = object.valueAtTime(
                markerObject.timeValue,
                true,
              ).label;
            } catch (err) {}
            return object.setValueAtTime(markerObject.timeValue, newMarker);
          } catch (err) {}
        };
      }
      function MarkerDuration() {
        this.UiName = "duration";
        this.objectType = "Number";
        this.getValue = function (object, markerObject) {
          return object.valueAtTime(markerObject.timeValue, true).duration;
        };
        this.setValue = function (
          value,
          object,
          markerObject,
          loopElementName,
          reverseOrder,
        ) {
          try {
            var newMarker = new MarkerValue(value);
            newMarker.comment = object.valueAtTime(
              markerObject.timeValue,
              true,
            ).comment;
            newMarker.duration = value;
            try {
              newMarker.label = object.valueAtTime(
                markerObject.timeValue,
                true,
              ).label;
            } catch (err) {}
            return object.setValueAtTime(markerObject.timeValue, newMarker);
          } catch (err) {}
        };
      }
      function MarkerNumKeys() {
        this.UiName = "number of markers";
        this.objectType = "Number";
        this.getValue = function (object, markerObject) {
          return object.numKeys;
        };
      }
      function MarkerAddKeyTime() {
        this.UiName = "time";
        this.objectType = "Number";
        this.getValue = function (object, markerObject) {
          return markerObject.timeValue;
        };
        this.setValue = function (value, object, markerObject) {
          try {
            markerObject.timeValue = value;
          } catch (err) {}
        };
      }
      function MarkerKeyIndex() {
        this.UiName = "index";
        this.objectType = "Number";
        this.getValue = function (object, markerObject) {
          var nearestIndex = object.nearestKeyIndex(markerObject.timeValue);
          if (object.keyTime(nearestIndex) == markerObject.timeValue) {
            return nearestIndex;
          } else {
            return -1;
          }
        };
      }
      function MarkerLabel() {
        this.UiName = "label";
        this.objectType = "Array";
        this.supportedVersion = 16;
        this.options = [
          "none",
          "Red",
          "Yellow",
          "Aqua",
          "Pink",
          "Lavender",
          "Peach",
          "Sea Foam",
          "Blue",
          "Green",
          "Purple",
          "Orange",
          "Brown",
          "Fuchsia",
          "Cyan",
          "Sandstone",
          "Dark Green",
        ];
        this.getValue = function (object, markerObject) {
          try {
            return this.options[
              object.valueAtTime(markerObject.timeValue, true).label
            ];
          } catch (err) {}
        };
        this.setValue = function (value, object, markerObject) {
          try {
            for (var i = 0; i < this.options.length; i += 1) {
              if (value == this.options[i]) {
                try {
                  var newMarker = new MarkerValue("");
                  newMarker.comment = object.valueAtTime(
                    markerObject.timeValue,
                    true,
                  ).comment;
                  newMarker.duration = object.valueAtTime(
                    markerObject.timeValue,
                    true,
                  ).duration;
                  try {
                    newMarker.label = i;
                  } catch (err) {}
                  object.setValueAtTime(markerObject.timeValue, newMarker);
                } catch (err) {}
                break;
              }
            }
          } catch (err) {}
        };
      }
      function DeleteRQItemAction() {
        this.UiName = "delete";
        this.objectType = "Void";
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          try {
            object.remove();
          } catch (err) {}
        };
      }
      function DuplicateRQItemAction() {
        this.UiName = "duplicate";
        this.objectType = "Void";
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          if (
            !inArray(object, loopBackgroundData.duplicateList) ||
            loopBackgroundData == null
          ) {
            try {
              var duplicatedItem = object.duplicate();
              loopBackgroundData.duplicateList.push(duplicatedItem);
              return duplicatedItem;
            } catch (err) {}
          }
        };
      }
      function AddOutputRQItemAction() {
        this.UiName = "add output module";
        this.objectType = "Void";
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          try {
            object.outputModules.add();
          } catch (err) {}
        };
      }
      function ApplyTemplateByNameAction() {
        this.UiName = "apply template by name";
        this.objectType = "Text";
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          try {
            var renderTemplates = object.templates;
            for (var i = 0; i < renderTemplates.length; i += 1) {
              if (renderTemplates[i] == value) {
                object.applyTemplate(renderTemplates[i]);
                break;
              }
            }
          } catch (err) {}
        };
      }
      function ApplyTemplateFromListAction() {
        this.UiName = "apply template from list";
        this.objectType = "Array";
        this.options = [
          "Best Settings",
          "Current Settings",
          "DV Settings",
          "Draft Settings",
          "Multi-Machine Settings",
        ];
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          try {
            object.applyTemplate(value);
          } catch (err) {}
        };
      }
      function StatusRQItemProperty() {
        this.UiName = "render status";
        this.objectType = "Array";
        this.options = [
          "will continue",
          "need output",
          "unqueued",
          "queued",
          "rendering",
          "user stopped",
          "error stopped",
          "done",
        ];
        this.optionsSet = {
          done: RQItemStatus.DONE,
          "error stopped": RQItemStatus.ERR_STOPPED,
          "need output": RQItemStatus.NEEDS_OUTPUT,
          queued: RQItemStatus.QUEUED,
          rendering: RQItemStatus.RENDERING,
          unqueued: RQItemStatus.UNQUEUED,
          "user stopped": RQItemStatus.USER_STOPPED,
          "will continue": RQItemStatus.WILL_CONTINUE,
        };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.status) {
              return key;
              break;
            }
          }
          return object.status;
        };
      }
      function IndexRQItemProperty() {
        this.UiName = "index";
        this.objectType = "Number";
        this.getValue = function (object) {
          for (var i = 1; i <= app.project.renderQueue.numItems; i += 1) {
            if (app.project.renderQueue.item(i) == object) {
              return i;
            }
          }
        };
      }
      function EnabledRQItemProperty() {
        this.UiName = "render enabled";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.render;
        };
        this.setValue = function (value, object) {
          object.render = value;
        };
      }
      function NumOutputsRQItemProperty() {
        this.UiName = "number of outputs";
        this.objectType = "Number";
        this.getValue = function (object) {
          try {
            return object.numOutputModules;
          } catch (err) {}
        };
      }
      function CompRQItemProperty() {
        this.UiName = "source comp";
        this.objectType = "Item";
        this.getValue = function (object) {
          try {
            return new ItemObject(object.comp);
          } catch (err) {}
        };
      }
      function DeleteOutputModuleAction() {
        this.UiName = "delete";
        this.objectType = "Void";
        this.makeAction = function (value, object) {
          try {
            object.remove();
          } catch (err) {}
        };
      }
      function ApplyTemplateOutputModuleAction() {
        this.UiName = "apply template";
        this.objectType = "Text";
        this.makeAction = function (value, object) {
          try {
            var renderTemplates = object.templates;
            for (var i = 0; i < renderTemplates.length; i += 1) {
              if (renderTemplates[i] == value) {
                object.applyTemplate(renderTemplates[i]);
                break;
              }
            }
          } catch (err) {}
        };
      }
      function SaveDestinationFileOutputModuleAction() {
        this.UiName = "save destination file";
        this.objectType = "Void";
        this.makeAction = function (value, object, rqItem) {
          try {
            if (object.file) {
              var myDestination = object.file.saveDlg(
                "Select Destination Folder",
              );
            } else {
              var myDestination = new File(
                String(Folder.desktop) + "/" + String(rqItem.object.comp.name),
              ).saveDlg("Select Destination Folder");
            }
            if (myDestination != null) {
              object.file = myDestination;
            }
          } catch (err) {}
        };
      }
      function NameOutputModuleProperty(object) {
        this.UiName = "name";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.name;
        };
      }
      function IndexOutputModuleProperty() {
        this.UiName = "index";
        this.objectType = "Number";
        this.getValue = function (object, RQItem) {
          for (var i = 1; i <= RQItem.object.numOutputModules; i += 1) {
            if (RQItem.object.outputModule(i) == object) {
              return i;
            }
          }
        };
      }
      function PostRenderOutputModuleProperty() {
        this.UiName = "post render";
        this.objectType = "Array";
        this.options = [
          "none",
          "import",
          "import and replace usage",
          "set proxy",
        ];
        this.optionsSet = {
          import: PostRenderAction.IMPORT,
          "import and replace usage": PostRenderAction.IMPORT_AND_REPLACE_USAGE,
          none: PostRenderAction.NONE,
          "set proxy": PostRenderAction.SET_PROXY,
        };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.postRenderAction) {
              return key;
              break;
            }
          }
          return object.postRenderAction;
        };
        this.setValue = function (value, object) {
          object.postRenderAction = this.optionsSet[value];
        };
      }
      function DeleteEffectAction() {
        this.UiName = "delete";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (reverseOrder == true) {
              object.remove();
            } else {
              object.remove();
            }
          } catch (err) {}
        };
      }
      function DuplicateEffectAction() {
        this.UiName = "duplicate";
        this.objectType = "Void";
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            if (
              !inArray(object, loopBackgroundData.duplicateList) ||
              loopBackgroundData == null
            ) {
              var duplicatedLayer = object.duplicate();
              loopBackgroundData.duplicateList.push(duplicatedLayer);
              return duplicatedLayer;
            }
          } else {
            if (
              !inArray(object, loopBackgroundData.duplicateList) ||
              loopBackgroundData == null
            ) {
              var duplicatedLayer = object.duplicate();
              loopBackgroundData.duplicateList.push(duplicatedLayer);
              return duplicatedLayer;
            }
          }
        };
      }
      function MoveToBeginningEffectAction() {
        this.UiName = "move to beginning";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (reverseOrder == true) {
              object.moveTo(parseInt(1));
            } else {
              object.moveTo(parseInt(1));
            }
          } catch (err) {}
        };
      }
      function MoveToEndEffectAction() {
        this.UiName = "move to end";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (reverseOrder == true) {
              if (object.parentProperty.numProperties > 1) {
                object.moveTo(parseInt(object.parentProperty.numProperties));
              }
            } else {
              if (object.parentProperty.numProperties > 1) {
                object.moveTo(parseInt(object.parentProperty.numProperties));
              }
            }
          } catch (err) {}
        };
      }
      function MoveToIndexEffectAction() {
        this.UiName = "move to";
        this.objectType = "Number";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            try {
              object.moveTo(parseInt(value));
            } catch (err) {}
          } else {
            try {
              object.moveTo(parseInt(value));
            } catch (err) {}
          }
        };
      }
      function MatchName() {
        this.UiName = "match name";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.matchName;
        };
      }
      function EnabledEffectProperty() {
        this.UiName = "enabled";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.enabled;
        };
        this.setValue = function (value, object) {
          try {
            object.enabled = value;
          } catch (err) {}
        };
      }
      function SelectedEffectProperty() {
        this.UiName = "selected";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.selected;
        };
        this.setValue = function (value, object) {
          object.selected = value;
        };
      }
      function IndexEffectProperty() {
        this.UiName = "index";
        this.objectType = "Number";
        this.getValue = function (object) {
          for (var i = 1; i <= object.parentProperty.numProperties; i += 1) {
            if (object.parentProperty(i) == object) {
              return i;
            }
          }
        };
      }
      function RepositionAnchorPointLayerAction() {
        this.UiName = "reposition anchor point";
        this.objectType = "Array";
        this.options = [
          "top left",
          "top center",
          "top right",
          "middle left",
          "middle center",
          "middle right",
          "bottom left",
          "bottom center",
          "bottom right",
        ];
        this.optionsSet = {
          "bottom center": 7,
          "bottom left": 6,
          "bottom right": 8,
          "middle center": 4,
          "middle left": 3,
          "middle right": 5,
          "top center": 1,
          "top left": 0,
          "top right": 2,
        };
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            repositionLayerAnchorPoint(this.optionsSet[value], object);
          } catch (err) {}
        };
      }
      function DeleteLayerAction() {
        this.UiName = "delete";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            object.remove();
          } else {
            object.remove();
          }
        };
      }
      function RemoveAllEffectsLayerAction() {
        this.UiName = "remove all effects";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            for (var i = object.effect.numProperties; i >= 1; i--) {
              object.effect(i).remove();
            }
          } catch (err) {}
        };
      }
      function DuplicateLayerAction() {
        this.UiName = "duplicate";
        this.objectType = "Void";
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (loopBackgroundData) {
              if (reverseOrder == true) {
                if (
                  !inArray(object, loopBackgroundData.duplicateList) ||
                  loopBackgroundData == null
                ) {
                  var duplicatedLayer = object.duplicate();
                  loopBackgroundData.duplicateList.push(duplicatedLayer);
                  return duplicatedLayer;
                }
              } else {
                if (
                  !inArray(object, loopBackgroundData.duplicateList) ||
                  loopBackgroundData == null
                ) {
                  var duplicatedLayer = object.duplicate();
                  loopBackgroundData.duplicateList.push(duplicatedLayer);
                  return duplicatedLayer;
                }
              }
            } else {
              object.duplicate();
            }
          } catch (err) {}
        };
      }
      function CopyToCompLayerAction() {
        this.UiName = "copy to comp";
        this.objectType = "Item";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            object.copyToComp(value.object);
          } catch (err) {}
        };
      }
      function MoveToBeginningLayerAction() {
        this.UiName = "move to beginning";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            object.moveToBeginning();
          } else {
            object.moveToBeginning();
          }
        };
      }
      function MoveToEndLayerAction() {
        this.UiName = "move to end";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            object.moveToEnd();
          } else {
            object.moveToEnd();
          }
        };
      }
      function MoveAfterLayerAction() {
        this.UiName = "move after";
        this.objectType = "Layer";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            try {
              object.moveAfter(value.object);
            } catch (err) {}
          } else {
            try {
              object.moveAfter(value.object);
            } catch (err) {}
          }
        };
      }
      function MoveBeforeLayerAction() {
        this.UiName = "move before";
        this.objectType = "Layer";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            try {
              object.moveBefore(value.object);
            } catch (err) {}
          } else {
            try {
              object.moveBefore(value.object);
            } catch (err) {}
          }
        };
      }
      function ReplaceLayerAction() {
        this.UiName = "replace layer";
        this.objectType = "Item";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            object.replaceSource(value.object, true);
          } catch (err) {}
        };
      }
      function AddEffectLayerAction() {
        this.UiName = "add effect";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            var appEffects = app.effects;
            for (var i = 0; i < appEffects.length; i += 1) {
              if (appEffects[i].displayName == value) {
                object.effect.addProperty(appEffects[i].matchName);
                break;
              }
            }
          } catch (err) {}
        };
      }
      function MoveSelectedKeyframesLayerAction() {
        this.UiName = "retime selected keyframes";
        this.objectType = "Number";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            adjustKeyframes(value, object, true, false);
          } catch (err) {}
        };
      }
      function MoveAllKeyframesLayerAction() {
        this.UiName = "retime all the keyframes";
        this.objectType = "Number";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            adjustKeyframes(value, object, false, false);
          } catch (err) {}
        };
      }
      function OffsetSelectedKeyframesLayerAction() {
        this.UiName = "offset selected keyframes";
        this.objectType = "Number";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (value != 0) {
              adjustKeyframes(value, object, true, true);
            }
          } catch (err) {}
        };
      }
      function OffsetAllKeyframesLayerAction() {
        this.UiName = "offset all the keyframes";
        this.objectType = "Number";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (value != 0) {
              adjustKeyframes(value, object, false, true);
            }
          } catch (err) {}
        };
      }
      function AddPresetLayerAction() {
        this.UiName = "apply animation preset";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          function getPresets(folder) {
            var files = new Array();
            var filesArray = folder.getFiles();
            for (var i = 0; i < filesArray.length; i += 1) {
              if (filesArray[i] instanceof File) {
                if (getFileExtension(filesArray[i]) == ".ffx") {
                  var presetName = filesArray[i].displayName;
                  files[files.length] = {
                    name: presetName.split(".").slice(0, -1).join("."),
                    presetFile: filesArray[i],
                  };
                }
              } else {
                if (filesArray[i] instanceof Folder) {
                  files = files.concat(getPresets(filesArray[i]));
                }
              }
            }
            return files;
          }
          try {
            if (operatingSystem == "Windows") {
              var allPresetsFolder = Folder(
                Folder.appPackage.toString() + "/" + "Presets",
              );
            } else {
              var allPresetsFolder = Folder(
                Folder.appPackage.parent.toString() + "/" + "Presets",
              );
            }
            if (allPresetsFolder.exists) {
              var presets = getPresets(allPresetsFolder);
              for (var i = 0; i < presets.length; i += 1) {
                if (presets[i].name == value) {
                  var selectedLayersArray = [];
                  for (
                    var j = 1;
                    j <= object.containingComp.numLayers;
                    j += 1
                  ) {
                    if (object.containingComp.layer(j).selected == true) {
                      selectedLayersArray.push(j);
                      object.containingComp.layer(j).selected = false;
                    }
                  }
                  object.selected = true;
                  object.applyPreset(presets[i].presetFile);
                  object.selected = false;
                  for (var j = 0; j < selectedLayersArray.length; j += 1) {
                    object.containingComp.layer(
                      selectedLayersArray[j],
                    ).selected = true;
                  }
                  break;
                }
              }
            }
          } catch (err) {}
        };
      }
      function ADDMarkerKeysLayerAction() {
        this.UiName = "add marker";
        this.objectType = "Number";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            var newMarker = new MarkerValue("");
            object.property("ADBE Marker").setValueAtTime(value, newMarker);
          } catch (err) {}
        };
      }
      function DeleteAllMarkerKeysLayerAction() {
        this.UiName = "delete all markers";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            for (var i = object.property("ADBE Marker").numKeys; i > 0; i--) {
              object.property("ADBE Marker").removeKey(i);
            }
          } catch (err) {}
        };
      }
      function IsDuplicatedLayerProperty() {
        this.UiName = "isDuplicate";
        this.objectType = "Boolean";
        this.getValue = function (object, loopBackgroundData) {
          return inArray(object, loopBackgroundData.duplicateList);
        };
      }
      function ActiveLayerProperty() {
        this.UiName = "active";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.active;
        };
      }
      function EnabledLayerProperty() {
        this.UiName = "enabled";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.enabled;
        };
        this.setValue = function (value, object) {
          object.enabled = value;
        };
      }
      function SelectedLayerProperty() {
        this.UiName = "selected";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.selected;
        };
        this.setValue = function (value, object) {
          object.selected = value;
        };
      }
      function IndexSelectedLayerProperty() {
        this.UiName = "selected index";
        this.objectType = "Number";
        this.getValue = function (object) {
          for (
            var i = 0;
            i < app.project.activeItem.selectedLayers.length;
            i += 1
          ) {
            if (object == app.project.activeItem.selectedLayers[i]) {
              return i + 1;
            }
          }
          return -1;
        };
      }
      function FirstSelectedLayerProperty() {
        this.UiName = "first selected";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          var selectedLayers = object.containingComp.selectedLayers;
          if (selectedLayers[0] == object) {
            return true;
          } else {
            return false;
          }
        };
      }
      function LastSelectedLayerProperty() {
        this.UiName = "last selected";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          var selectedLayers = object.containingComp.selectedLayers;
          if (selectedLayers[selectedLayers.length - 1] == object) {
            return true;
          } else {
            return false;
          }
        };
      }
      function IndexLayerProperty() {
        this.UiName = "index";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.index;
        };
      }
      function InPointLayerProperty() {
        this.UiName = "in point";
        this.objectType = "Number";
        this.getValue = function (object) {
          return parseFloat(object.inPoint);
        };
        this.setValue = function (value, object) {
          object.inPoint = value;
        };
      }
      function OutPointLayerProperty() {
        this.UiName = "out point";
        this.objectType = "Number";
        this.getValue = function (object) {
          return parseFloat(object.outPoint);
        };
        this.setValue = function (value, object) {
          object.outPoint = value;
        };
      }
      function StartTimeLayerProperty() {
        this.UiName = "start time";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.startTime;
        };
        this.setValue = function (value, object) {
          object.startTime = value;
        };
      }
      function TimeLayerProperty() {
        this.UiName = "current time";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.time;
        };
      }
      function LockedLayerProperty() {
        this.UiName = "is locked";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.locked;
        };
        this.setValue = function (value, object) {
          object.locked = value;
        };
      }
      function IsNullLayerProperty() {
        this.UiName = "is null";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.nullLayer;
        };
      }
      function IsSolidLayerProperty() {
        this.UiName = "is solid";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          try {
            if (
              object.source.mainSource instanceof SolidSource &&
              !object.nullLayer
            ) {
              return true;
            } else {
              return false;
            }
          } catch (err) {
            return false;
          }
        };
      }
      function IsCameraLayerProperty() {
        this.UiName = "is camera";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          if (object instanceof CameraLayer) {
            return true;
          } else {
            return false;
          }
        };
      }
      function IsLightLayerProperty() {
        this.UiName = "is light";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          if (object instanceof LightLayer) {
            return true;
          } else {
            return false;
          }
        };
      }
      function IsShapeLayerProperty() {
        this.UiName = "is shape";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          if (object instanceof ShapeLayer) {
            return true;
          } else {
            return false;
          }
        };
      }
      function IsTextLayerProperty() {
        this.UiName = "is text";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          if (object instanceof TextLayer) {
            return true;
          } else {
            return false;
          }
        };
      }
      function ParentLayerProperty() {
        this.UiName = "parent";
        this.objectType = "Layer";
        this.getValue = function (object) {
          return new LayerObject(object.parent);
        };
        this.setValue = function (value, object) {
          try {
            if (value == null) {
              object.parent = value;
            } else {
              object.parent = value.object;
            }
          } catch (err) {}
        };
      }
      function ThisLayerProperty() {
        this.UiName = "this layer";
        this.objectType = "Layer";
        this.getValue = function (object) {
          return new LayerObject(object);
        };
      }
      function ShyLayerProperty() {
        this.UiName = "is shy";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.shy;
        };
        this.setValue = function (value, object) {
          object.shy = value;
        };
      }
      function SoloLayerProperty() {
        this.UiName = "is solo";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.solo;
        };
        this.setValue = function (value, object) {
          object.solo = value;
        };
      }
      function StretchLayerProperty() {
        this.UiName = "stretch";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.stretch;
        };
        this.setValue = function (value, object) {
          object.stretch = value;
        };
      }
      function Name() {
        this.UiName = "name";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.name;
        };
        this.setValue = function (value, object) {
          object.name = value;
        };
      }
      function NameStartWith() {
        this.UiName = "name starts with";
        this.objectType = "Text";
        this.getValue = function (object, loopBackgroundData, valueB) {
          if (valueB) {
            if (startsWith(object.name, valueB) == true) {
              return valueB;
            } else {
              return -1;
            }
          }
        };
      }
      function NameEndWith() {
        this.UiName = "name ends with";
        this.objectType = "Text";
        this.getValue = function (object, loopBackgroundData, valueB) {
          if (valueB) {
            if (endsWith(object.name, valueB) == true) {
              return valueB;
            } else {
              return -1;
            }
          }
        };
      }
      function NameInculde() {
        this.UiName = "name include";
        this.objectType = "Text";
        this.getValue = function (object, loopBackgroundData, valueB) {
          if (valueB) {
            if (includeString(object.name, valueB) == true) {
              return valueB;
            } else {
              return -1;
            }
          }
        };
      }
      function Comment() {
        this.UiName = "comment";
        this.objectType = "Text";
        this.getValue = function (object) {
          return object.comment;
        };
        this.setValue = function (value, object) {
          object.comment = value;
        };
      }
      function Label() {
        this.UiName = "label";
        this.objectType = "Array";
        this.options = [
          "none",
          "Red",
          "Yellow",
          "Aqua",
          "Pink",
          "Lavender",
          "Peach",
          "Sea Foam",
          "Blue",
          "Green",
          "Purple",
          "Orange",
          "Brown",
          "Fuchsia",
          "Cyan",
          "Sandstone",
          "Dark Green",
        ];
        this.getValue = function (object) {
          return this.options[object.label];
        };
        this.setValue = function (value, object) {
          for (var i = 0; i < this.options.length; i += 1) {
            if (value == this.options[i]) {
              object.label = i;
              break;
            }
          }
        };
      }
      function ContainingCompProperty() {
        this.UiName = "containing comp";
        this.objectType = "Item";
        this.getValue = function (object) {
          return new ItemObject(object.containingComp);
        };
      }
      function NumMarkersLayerProperty() {
        this.UiName = "number of markers";
        this.objectType = "Number";
        this.getValue = function (object) {
          try {
            return object.property("ADBE Marker").numKeys;
          } catch (err) {
            return 0;
          }
        };
      }
      function AdjustmentLayerProperty() {
        this.UiName = "isAdjustment";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.adjustmentLayer;
        };
        this.setValue = function (value, object) {
          try {
            object.adjustmentLayer = value;
          } catch (err) {}
        };
      }
      function AudioEnabledLayerProperty() {
        this.UiName = "audio enabled";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.audioEnabled;
        };
        this.setValue = function (value, object) {
          object.audioEnabled = value;
        };
      }
      function MotionBlurLayerProperty() {
        this.UiName = "motion Blur";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.motionBlur;
        };
        this.setValue = function (value, object) {
          object.motionBlur = value;
        };
      }
      function threeDLayerProperty() {
        this.UiName = "3d";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.threeDLayer;
        };
        this.setValue = function (value, object) {
          object.threeDLayer = value;
        };
      }
      function blendingModeLayerProperty() {
        this.UiName = "blending mode";
        this.objectType = "Array";
        this.options = [
          "Normal",
          "Dissolve",
          "Dancing Dissolve",
          "Darken",
          "Multiply",
          "Color Burn",
          "Classic Color Burn",
          "Linear Burn",
          "Darker Color",
          "Add",
          "Lighten",
          "Screen",
          "Color Dodge",
          "Classic Color Dodge",
          "Linear Dodge",
          "Lighter Color",
          "Overlay",
          "Soft Light",
          "Hard Light",
          "Linear Light",
          "Vivid Light",
          "Pin Light",
          "Hard Mix",
          "Difference",
          "Classic Difference",
          "Exclusion",
          "Subtract",
          "Divide",
          "Hue",
          "Saturation",
          "Color",
          "Luminosity",
          "Stencil Alpha",
          "Stencil Luma",
          "Silhouette Alpha",
          "Silhouette Luma",
          "Alpha Add",
          "Luminescent Premul",
        ];
        this.optionsSet = {
          Add: 5220,
          "Alpha Add": 5244,
          "Classic Color Burn": 5219,
          "Classic Color Dodge": 5225,
          "Classic Difference": 5234,
          Color: 5238,
          "Color Burn": 5218,
          "Color Dodge": 5224,
          "Dancing Dissolve": 5214,
          Darken: 5215,
          "Darker Color": 5247,
          Difference: 5233,
          Dissolve: 5213,
          Divide: 5249,
          Exclusion: 5235,
          "Hard Light": 5228,
          "Hard Mix": 5232,
          Hue: 5236,
          Lighten: 5221,
          "Lighter Color": 5246,
          "Linear Burn": 5217,
          "Linear Dodge": 5223,
          "Linear Light": 5229,
          "Luminescent Premul": 5245,
          Luminosity: 5239,
          Multiply: 5216,
          Normal: 5212,
          Overlay: 5226,
          "Pin Light": 5231,
          Saturation: 5237,
          Screen: 5222,
          "Silhouette Alpha": 5242,
          "Silhouette Luma": 5243,
          "Soft Light": 5227,
          "Stencil Alpha": 5240,
          "Stencil Luma": 5241,
          Subtract: 5248,
          "Vivid Light": 5230,
        };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.blendingMode) {
              return key;
              break;
            }
          }
          return object.blendingMode;
        };
        this.setValue = function (value, object) {
          object.blendingMode = this.optionsSet[value];
        };
      }
      function TrackMatteLayerProperty() {
        this.UiName = "track matte";
        this.objectType = "Array";
        this.options = [
          "No Track Matte",
          "Alpha Matte",
          "Alpha Inverted Matte",
          "Luma Matte",
          "Luma Inverted Matte",
        ];
        this.optionsSet = {
          "Alpha Inverted Matte": 5014,
          "Alpha Matte": 5013,
          "Luma Inverted Matte": 5016,
          "Luma Matte": 5015,
          "No Track Matte": 5012,
        };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.trackMatteType) {
              return key;
              break;
            }
          }
          return object.trackMatteType;
        };
        this.setValue = function (value, object) {
          object.trackMatteType = this.optionsSet[value];
        };
      }
      function FrameBlendingLayerProperty() {
        this.UiName = "frame blending";
        this.objectType = "Array";
        this.options = ["None", "Frame Mix", "Pixel Motion"];
        this.optionsSet = {
          "Frame Mix": FrameBlendingType.FRAME_MIX,
          None: FrameBlendingType.NO_FRAME_BLEND,
          "Pixel Motion": FrameBlendingType.PIXEL_MOTION,
        };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (this.optionsSet[key] == object.frameBlendingType) {
              return key;
              break;
            }
          }
          return object.frameBlendingType;
        };
        this.setValue = function (value, object) {
          object.frameBlendingType = this.optionsSet[value];
        };
      }
      function CollapseTransformationLayerProperty() {
        this.UiName = "collapse transformation";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.collapseTransformation;
        };
        this.setValue = function (value, object) {
          if (object.canSetCollapseTransformation) {
            object.collapseTransformation = value;
          }
        };
      }
      function timeRemapEnabledLayerProperty() {
        this.UiName = "time remap enabled";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.timeRemapEnabled;
        };
        this.setValue = function (value, object) {
          if (object.canSetTimeRemapEnabled) {
            object.timeRemapEnabled = value;
          }
        };
      }
      function EffectsActiveLayerProperty() {
        this.UiName = "effects active";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.effectsActive;
        };
        this.setValue = function (value, object) {
          try {
            object.effectsActive = value;
          } catch (err) {}
        };
      }
      function GuideLayerLayerProperty() {
        this.UiName = "guide layer";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.guideLayer;
        };
        this.setValue = function (value, object) {
          try {
            object.guideLayer = value;
          } catch (err) {}
        };
      }
      function HeightLayerProperty() {
        this.UiName = "height";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object instanceof TextLayer) {
            try {
              var r = object.sourceRectAtTime(
                object.containingComp.time,
                false,
              );
              return r.height;
            } catch (err) {
              return object.height;
            }
          } else {
            return object.height;
          }
        };
      }
      function WidthLayerProperty() {
        this.UiName = "width";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object instanceof TextLayer) {
            try {
              var r = object.sourceRectAtTime(
                object.containingComp.time,
                false,
              );
              return r.width;
            } catch (err) {
              return object.width;
            }
          } else {
            return object.width;
          }
        };
      }
      function OpacityLayerProperty() {
        this.UiName = "opacity";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.opacity.value;
        };
        this.setValue = function (value, object) {
          try {
            object.opacity.setValue(value);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.opacity;
        };
        this.getThis = function () {
          return this;
        };
        this.getPropertyValue = function (object) {
          return object.value;
        };
        this.setPropertyValue = function (value, object) {
          try {
            object.setValue(value);
          } catch (err) {}
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, value);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false);
          } catch (err) {}
        };
      }
      function XPositionLayerProperty() {
        this.UiName = "position x";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object.position.dimensionsSeparated) {
            return object.property("Transform").property("X Position").value;
          } else {
            return object.position.value[0];
          }
        };
        this.setValue = function (value, object) {
          try {
            if (object.position.dimensionsSeparated) {
              object
                .property("Transform")
                .property("X Position")
                .setValue(value);
            } else {
              object.position.setValue([
                value,
                object.position.value[1],
                object.position.value[2],
              ]);
            }
          } catch (err) {}
        };
        this.getProperty = function (object) {
          if (object.position.dimensionsSeparated) {
            return object.property("Transform").property("X Position");
          } else {
            return object.position;
          }
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            if (object.matchName == "ADBE Position_0") {
              object.setValueAtTime(time, value);
            } else {
              object.setValueAtTime(time, [
                value,
                object.valueAtTime(time, true)[1],
                object.valueAtTime(time, true)[2],
              ]);
            }
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            if (object.matchName == "ADBE Position_0") {
              return object.valueAtTime(time, false);
            } else {
              return object.valueAtTime(time, false)[0];
            }
          } catch (err) {}
        };
      }
      function YPositionLayerProperty() {
        this.UiName = "position y";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object.position.dimensionsSeparated) {
            return object.property("Transform").property("Y Position").value;
          } else {
            return object.position.value[1];
          }
        };
        this.setValue = function (value, object) {
          try {
            if (object.position.dimensionsSeparated) {
              object
                .property("Transform")
                .property("Y Position")
                .setValue(value);
            } else {
              object.position.setValue([
                object.position.value[0],
                value,
                object.position.value[2],
              ]);
            }
          } catch (err) {}
        };
        this.getProperty = function (object) {
          if (object.position.dimensionsSeparated) {
            return object.property("Transform").property("Y Position");
          } else {
            return object.position;
          }
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            if (object.matchName == "ADBE Position_1") {
              object.setValueAtTime(time, value);
            } else {
              object.setValueAtTime(time, [
                object.valueAtTime(time, true)[0],
                value,
                object.valueAtTime(time, true)[2],
              ]);
            }
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            if (object.matchName == "ADBE Position_1") {
              return object.valueAtTime(time, false);
            } else {
              return object.valueAtTime(time, false)[1];
            }
          } catch (err) {}
        };
      }
      function ZPositionLayerProperty() {
        this.UiName = "position z";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object.position.dimensionsSeparated) {
            return object.property("Transform").property("Z Position").value;
          } else {
            return object.position.value[2];
          }
        };
        this.setValue = function (value, object) {
          try {
            if (object.position.dimensionsSeparated) {
              object
                .property("Transform")
                .property("Z Position")
                .setValue(value);
            } else {
              object.position.setValue([
                object.position.value[0],
                object.position.value[1],
                value,
              ]);
            }
          } catch (err) {}
        };
        this.getProperty = function (object) {
          if (object.matchName) {
            return object.property("Transform").property("Z Position");
          } else {
            return object.position;
          }
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            if (object.matchName == "ADBE Position_2") {
              object.setValueAtTime(time, value);
            } else {
              object.setValueAtTime(time, [
                object.valueAtTime(time, true)[0],
                object.valueAtTime(time, true)[1],
                value,
              ]);
            }
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            if (object.matchName == "ADBE Position_2") {
              return object.valueAtTime(time, false);
            } else {
              return object.valueAtTime(time, false)[2];
            }
          } catch (err) {}
        };
      }
      function XAnchorPointLayerProperty() {
        this.UiName = "anchor point x";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.anchorPoint.value[0];
        };
        this.setValue = function (value, object) {
          try {
            object.anchorPoint.setValue([
              value,
              object.anchorPoint.value[1],
              object.anchorPoint.value[2],
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.anchorPoint;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              value,
              object.valueAtTime(time, true)[1],
              object.valueAtTime(time, true)[2],
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[0];
          } catch (err) {}
        };
      }
      function YAnchorPointLayerProperty() {
        this.UiName = "anchor point y";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.anchorPoint.value[1];
        };
        this.setValue = function (value, object) {
          try {
            object.anchorPoint.setValue([
              object.anchorPoint.value[0],
              value,
              object.anchorPoint.value[2],
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.anchorPoint;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              object.valueAtTime(time, true)[0],
              value,
              object.valueAtTime(time, true)[2],
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[1];
          } catch (err) {}
        };
      }
      function ZAnchorPointLayerProperty() {
        this.UiName = "anchor point z";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.anchorPoint.value[2];
        };
        this.setValue = function (value, object) {
          try {
            object.anchorPoint.setValue([
              object.anchorPoint.value[0],
              object.anchorPoint.value[1],
              value,
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.anchorPoint;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              object.valueAtTime(time, true)[0],
              object.valueAtTime(time, true)[1],
              value,
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[2];
          } catch (err) {}
        };
      }
      function ScaleLayerProperty() {
        this.UiName = "scale";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.scale.value[0];
        };
        this.setValue = function (value, object) {
          try {
            object.scale.setValue([value, value, value]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.scale;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [value, value, value]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[0];
          } catch (err) {}
        };
      }
      function XScaleLayerProperty() {
        this.UiName = "scale x";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.scale.value[0];
        };
        this.setValue = function (value, object) {
          try {
            object.scale.setValue([
              value,
              object.scale.value[1],
              object.scale.value[2],
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.scale;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              value,
              object.valueAtTime(time, true)[1],
              object.valueAtTime(time, true)[2],
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[0];
          } catch (err) {}
        };
      }
      function YScaleLayerProperty() {
        this.UiName = "scale y";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.scale.value[1];
        };
        this.setValue = function (value, object) {
          try {
            object.scale.setValue([
              object.scale.value[0],
              value,
              object.scale.value[2],
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.scale;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              object.valueAtTime(time, true)[0],
              value,
              object.valueAtTime(time, true)[2],
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[1];
          } catch (err) {}
        };
      }
      function ZScaleLayerProperty() {
        this.UiName = "scale z";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.scale.value[2];
        };
        this.setValue = function (value, object) {
          try {
            object.scale.setValue([
              object.scale.value[0],
              object.scale.value[1],
              value,
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.scale;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              object.valueAtTime(time, true)[0],
              object.valueAtTime(time, true)[1],
              value,
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[2];
          } catch (err) {}
        };
      }
      function RotationLayerProperty() {
        this.UiName = "rotation";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.rotation.value;
        };
        this.setValue = function (value, object) {
          try {
            object.rotation.setValue(value);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.rotation;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, value);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false);
          } catch (err) {}
        };
      }
      function XRotationLayerProperty() {
        this.UiName = "rotation x";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.property("Transform").property("X Rotation").value;
        };
        this.setValue = function (value, object) {
          try {
            object.property("Transform").property("X Rotation").setValue(value);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.property("Transform").property("X Rotation");
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, value);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false);
          } catch (err) {}
        };
      }
      function YRotationLayerProperty() {
        this.UiName = "rotation y";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.property("Transform").property("Y Rotation").value;
        };
        this.setValue = function (value, object) {
          try {
            object.property("Transform").property("Y Rotation").setValue(value);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.property("Transform").property("Y Rotation");
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, value);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false);
          } catch (err) {}
        };
      }
      function ZRotationLayerProperty() {
        this.UiName = "rotation z";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.property("Transform").property("Z Rotation").value;
        };
        this.setValue = function (value, object) {
          try {
            object.property("Transform").property("ZRotation").setValue(value);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.property("Transform").property("Z Rotation");
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, value);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false);
          } catch (err) {}
        };
      }
      function OrientationLayerProperty() {
        this.UiName = "orientation";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.orientation.value[0];
        };
        this.setValue = function (value, object) {
          try {
            object.orientation.setValue([value, value, value]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.orientation;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [value, value, value]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[0];
          } catch (err) {}
        };
      }
      function XOrientationLayerProperty() {
        this.UiName = "orientation x";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.orientation.value[0];
        };
        this.setValue = function (value, object) {
          try {
            object.orientation.setValue([
              value,
              object.orientation.value[1],
              object.orientation.value[2],
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.orientation;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              value,
              object.valueAtTime(time, true)[1],
              object.valueAtTime(time, true)[2],
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[0];
          } catch (err) {}
        };
      }
      function YOrientationLayerProperty() {
        this.UiName = "orientation y";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.orientation.value[1];
        };
        this.setValue = function (value, object) {
          try {
            object.orientation.setValue([
              object.orientation.value[0],
              value,
              object.orientation.value[2],
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.orientation;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              object.valueAtTime(time, true)[0],
              value,
              object.valueAtTime(time, true)[2],
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[1];
          } catch (err) {}
        };
      }
      function ZOrientationLayerProperty() {
        this.UiName = "orientation z";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.orientation.value[2];
        };
        this.setValue = function (value, object) {
          try {
            object.orientation.setValue([
              object.orientation.value[0],
              object.orientation.value[1],
              value,
            ]);
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.orientation;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            object.setValueAtTime(time, [
              object.valueAtTime(time, true)[0],
              object.valueAtTime(time, true)[1],
              value,
            ]);
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            return object.valueAtTime(time, false)[2];
          } catch (err) {}
        };
      }
      function TextLayerProperty() {
        this.UiName = "source text";
        this.objectType = "Text";
        this.getValue = function (object) {
          try {
            return object.text.sourceText.value.text;
          } catch (err) {}
        };
        this.setValue = function (value, object) {
          try {
            if (object instanceof TextLayer) {
              var tempTextDoc = object.text.sourceText.value;
              tempTextDoc.text = value;
              object.text.sourceText.setValue(tempTextDoc);
            }
          } catch (err) {}
        };
        this.getProperty = function (object) {
          if (object instanceof TextLayer) {
            return object.text.sourceText;
          } else {
            return undefined;
          }
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            if (object.parentProperty.parentProperty instanceof TextLayer) {
              var tempTextDoc = object.valueAtTime(time, true);
              tempTextDoc.text = value;
              object.setValueAtTime(time, tempTextDoc);
            }
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            if (object.parentProperty.parentProperty instanceof TextLayer) {
              var tempTextDoc = object.valueAtTime(time, false);
              return tempTextDoc.text;
            }
          } catch (err) {}
        };
      }
      function TextFontLayerProperty() {
        this.UiName = "font";
        this.objectType = "Text";
        this.getValue = function (object) {
          try {
            return object.text.sourceText.value.font;
          } catch (err) {}
        };
        this.setValue = function (value, object) {
          try {
            if (object instanceof TextLayer) {
              var tempTextDoc = object.text.sourceText.value;
              tempTextDoc.font = value;
              object.text.sourceText.setValue(tempTextDoc);
            }
          } catch (err) {}
        };
        this.getProperty = function (object) {
          return object.text.sourceText;
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            if (object.parentProperty.parentProperty instanceof TextLayer) {
              var tempTextDoc = object.valueAtTime(time, true);
              tempTextDoc.font = value;
              object.setValueAtTime(time, tempTextDoc);
            }
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            if (object.parentProperty.parentProperty instanceof TextLayer) {
              var tempTextDoc = object.valueAtTime(time, false);
              return tempTextDoc.font;
            }
          } catch (err) {}
        };
      }
      function CameraZoomLayerProperty() {
        this.UiName = "camera zoom";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object instanceof CameraLayer) {
            try {
              return object
                .property("ADBE Camera Options Group")
                .property("ADBE Camera Zoom").value;
            } catch (err) {}
          }
        };
        this.setValue = function (value, object) {
          if (object instanceof CameraLayer) {
            try {
              return object
                .property("ADBE Camera Options Group")
                .property("ADBE Camera Zoom")
                .setValue(value);
            } catch (err) {}
          }
        };
        this.getProperty = function (object) {
          return object
            .property("ADBE Camera Options Group")
            .property("ADBE Camera Zoom");
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            if (object.parentProperty.parentProperty instanceof CameraLayer) {
              object.setValueAtTime(time, value);
            }
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            if (object.parentProperty.parentProperty instanceof CameraLayer) {
              return object.valueAtTime(time, false);
            }
          } catch (err) {}
        };
      }
      function TimeRemapLayerProperty() {
        this.UiName = "time remap";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object instanceof AVLayer) {
            try {
              return object.property("ADBE Time Remapping").value;
            } catch (err) {}
          }
        };
        this.setValue = function (value, object) {
          if (object instanceof AVLayer) {
            try {
              return object.property("ADBE Time Remapping").setValue(value);
            } catch (err) {}
          }
        };
        this.getProperty = function (object) {
          return object.property("ADBE Time Remapping");
        };
        this.getThis = function () {
          return this;
        };
        this.setValueAtTime = function (object, time, value) {
          try {
            if (object.parentProperty instanceof AVLayer) {
              object.setValueAtTime(time, value);
            }
          } catch (err) {}
        };
        this.getValueAtTime = function (object, time) {
          try {
            if (object.parentProperty instanceof AVLayer) {
              return object.valueAtTime(time, false);
            }
          } catch (err) {}
        };
      }
      function CameraDepthOfFieldLayerProperty() {
        this.UiName = "camera depth of field";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          if (object instanceof CameraLayer) {
            try {
              return object
                .property("ADBE Camera Options Group")
                .property("ADBE Camera Depth of Field").value;
            } catch (err) {}
          }
        };
        this.setValue = function (value, object) {
          if (object instanceof CameraLayer) {
            try {
              return object
                .property("ADBE Camera Options Group")
                .property("ADBE Camera Depth of Field")
                .setValue(value);
            } catch (err) {}
          }
        };
      }
      function TextFontSizeLayerProperty() {
        this.UiName = "font size";
        this.objectType = "Number";
        this.getValue = function (object) {
          try {
            return object.text.sourceText.value.fontSize;
          } catch (err) {}
        };
        this.setValue = function (value, object) {
          try {
            if (object instanceof TextLayer) {
              var tempTextDoc = object.text.sourceText.value;
              tempTextDoc.fontSize = value;
              object.text.sourceText.setValue(tempTextDoc);
            }
          } catch (err) {}
        };
      }
      function TextJustificationLayerProperty() {
        this.UiName = "text justification";
        this.objectType = "Array";
        this.options = [
          "Left",
          "Center",
          "Right",
          "Justify last left",
          "Justify last centered",
          "Justify last right",
          "Justify all",
        ];
        this.optionsSet = {
          Center: ParagraphJustification.CENTER_JUSTIFY,
          "Justify all": ParagraphJustification.FULL_JUSTIFY_LASTLINE_FULL,
          "Justify last centered":
            ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER,
          "Justify last left":
            ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT,
          "Justify last right":
            ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT,
          Left: ParagraphJustification.LEFT_JUSTIFY,
          Right: ParagraphJustification.RIGHT_JUSTIFY,
        };
        this.getValue = function (object) {
          for (var key in this.optionsSet) {
            if (
              this.optionsSet[key] == object.text.sourceText.value.justification
            ) {
              return key;
              break;
            }
          }
          return object.text.sourceText.value.justification;
        };
        this.setValue = function (value, object) {
          try {
            if (object instanceof TextLayer) {
              var tempTextDoc = object.text.sourceText.value;
              if (
                tempTextDoc.boxText != true &&
                (value == "Justify last left" ||
                  value == "Justify last centered" ||
                  value == "Justify last right" ||
                  value == "Justify all")
              ) {
              } else {
                tempTextDoc.justification = this.optionsSet[value];
                object.text.sourceText.setValue(tempTextDoc);
              }
            }
          } catch (err) {}
        };
      }
      function SourceLayerProperty() {
        this.UiName = "source";
        this.objectType = "Item";
        this.getValue = function (object) {
          return new ItemObject(object.source);
        };
      }
      function DeleteItemAction() {
        this.UiName = "delete";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (reverseOrder == true) {
            object.remove();
          } else {
            object.remove();
          }
        };
      }
      function OpenInViewerAction() {
        this.UiName = "open in viewer";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem || object instanceof FootageItem) {
              object.openInViewer();
            }
          } catch (err) {}
        };
      }
      function PrecompseMoveItemAction() {
        this.UiName = "precompose (move all attributes)";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var selectedLatersArray = [];
              for (var i = 0; i < object.selectedLayers.length; i += 1) {
                selectedLatersArray.push(object.selectedLayers[i].index);
              }
              object.layers.precompose(selectedLatersArray, value, true);
            }
          } catch (err) {}
        };
      }
      function PrecompseLeaveItemAction() {
        this.UiName = "precompose (leave all attributes)";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          if (object instanceof CompItem) {
            var selectedLatersArray = [];
            for (var i = 0; i < object.selectedLayers.length; i += 1) {
              selectedLatersArray.push(object.selectedLayers[i].index);
            }
          }
          try {
            object.layers.precompose(selectedLatersArray, value, false);
          } catch (err) {}
        };
      }
      function RenderItemAction() {
        this.UiName = "add to render queue";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            var renderItem = app.project.renderQueue.items.add(object);
          } catch (err) {}
        };
      }
      function SendAMEItemAction() {
        this.UiName = "send to media encoder";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (app.project.renderQueue.canQueueInAME == true) {
              app.endUndoGroup();
              app.project.renderQueue.queueInAME(false);
              sleep(5000);
              app.beginUndoGroup("Custom Automation");
              for (var i = app.project.renderQueue.numItems; i >= 1; i--) {
                app.project.renderQueue.item(i).remove();
              }
            }
          } catch (err) {}
        };
      }
      function DuplicateItemAction() {
        this.UiName = "duplicate";
        this.objectType = "Void";
        this.makeAction = function (
          loopBackgroundData,
          reverseOrder,
          value,
          object,
        ) {
          if (
            !inArray(object, loopBackgroundData.duplicateList) ||
            loopBackgroundData == null
          ) {
            try {
              if (object instanceof FootageItem) {
                if (object.mainSource instanceof FileSource) {
                  var duplicatedItem = app.project.importFile(
                    new ImportOptions(object.file),
                  );
                  loopBackgroundData.duplicateList.push(duplicatedItem);
                  return duplicatedItem;
                }
                if (object.mainSource instanceof SolidSource) {
                }
              } else {
                var duplicatedItem = object.duplicate();
                loopBackgroundData.duplicateList.push(duplicatedItem);
                return duplicatedItem;
              }
            } catch (err) {}
          }
        };
      }
      function AddSolidItemAction() {
        this.UiName = "add solid";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.addSolid(
                [0, 0, 0],
                value,
                object.width,
                object.height,
                1,
                object.duration,
              );
            }
          } catch (err) {}
        };
      }
      function AddAdjustmentItemAction() {
        this.UiName = "add adjustment layer";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.addSolid(
                [1, 1, 1],
                value,
                object.width,
                object.height,
                1,
                object.duration,
              );
              newLayer.adjustmentLayer = true;
              newLayer.label = 5;
            }
          } catch (err) {}
        };
      }
      function AddNullItemAction() {
        this.UiName = "add null";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.addNull([object.duration]);
              newLayer.name = value;
            }
          } catch (err) {}
        };
      }
      function AddTextItemAction() {
        this.UiName = "add text";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.addText(value);
            }
          } catch (err) {}
        };
      }
      function AddCameraItemAction() {
        this.UiName = "add Camera";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.addCamera(value, [
                object.width / 2,
                object.height / 2,
              ]);
              var pos = [
                object.width / 2,
                object.height / 2,
                newLayer.zoom.value * -1,
              ];
              newLayer.position.setValue(pos);
            }
          } catch (err) {}
        };
      }
      function AddLightItemAction() {
        this.UiName = "add light";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.addLight(value, [
                object.width / 2,
                object.height / 2,
              ]);
              newLayer.lightType = 4414;
              var pos = [object.width / 2, object.height / 2];
              newLayer.position.setValue(pos);
            }
          } catch (err) {}
        };
      }
      function AddShapeItemAction() {
        this.UiName = "add shape";
        this.objectType = "Text";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.addShape();
              newLayer.name = value;
            }
          } catch (err) {}
        };
      }
      function AddItemAction() {
        this.UiName = "add item";
        this.objectType = "Item";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              var newLayer = object.layers.add(value.object, object.duration);
            }
          } catch (err) {}
        };
      }
      function ReplaceItemAction() {
        this.UiName = "replace item";
        this.objectType = "Item";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof FootageItem) {
              object.replace(value.object.file);
            }
          } catch (err) {}
        };
      }
      function ReplaceItemWithSoildAction() {
        this.UiName = "replace with solid";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof FootageItem) {
              object.replaceWithSolid(
                [0, 0, 0],
                object.name,
                object.width,
                object.height,
                object.pixelAspect,
              );
            }
          } catch (err) {}
        };
      }
      function ReplaceItemWithPlaceholderAction() {
        this.UiName = "replace with placeholder";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof FootageItem) {
              object.replaceWithPlaceholder(
                object.name,
                object.width,
                object.height,
                object.frameRate != 0 ? object.frameRate : 1,
                object.duration,
              );
            }
          } catch (err) {}
        };
      }
      function SetProxyItemAction() {
        this.UiName = "set proxy";
        this.objectType = "Item";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem || object instanceof FootageItem) {
              object.setProxy(value.object.file);
            }
          } catch (err) {}
        };
      }
      function UnsetProxyItemAction() {
        this.UiName = "unset proxy";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem || object instanceof FootageItem) {
              object.setProxyToNone();
            }
          } catch (err) {}
        };
      }
      function AddVerticalGuideItemAction() {
        this.UiName = "add vertical guide";
        this.objectType = "Number";
        this.supportedVersion = 16.1;
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              object.addGuide(1, value);
            }
          } catch (err) {}
        };
      }
      function AddHorizontalGuideItemAction() {
        this.UiName = "add horizontal guide";
        this.objectType = "Number";
        this.supportedVersion = 16.1;
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              object.addGuide(0, value);
            }
          } catch (err) {}
        };
      }
      function RemoveAllGuidesItemAction() {
        this.UiName = "remove all guides";
        this.objectType = "Void";
        this.supportedVersion = 16.1;
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (object instanceof CompItem) {
              object.removeGuide(0);
              while (object.guides.length) {
                object.removeGuide(0);
              }
            }
          } catch (err) {}
        };
      }
      function CopyAllGuidesItemAction() {
        this.UiName = "copy all guides";
        this.objectType = "Item";
        this.supportedVersion = 16.1;
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            if (
              object instanceof CompItem &&
              value.object instanceof CompItem &&
              value.object != object
            ) {
              for (var i = 0; i < value.object.guides.length; i += 1) {
                var guideExists = false;
                for (var j = 0; j < object.guides.length; j += 1) {
                  if (
                    object.guides[j].orientationType ==
                      value.object.guides[i].orientationType &&
                    object.guides[j].position == value.object.guides[i].position
                  ) {
                    guideExists = true;
                  }
                }
                if (guideExists == false) {
                  object.addGuide(
                    value.object.guides[i].orientationType,
                    value.object.guides[i].position,
                  );
                }
              }
            }
          } catch (err) {}
        };
      }
      function ADDMarkerKeysItemAction() {
        this.UiName = "add marker";
        this.objectType = "Number";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            var newMarker = new MarkerValue("");
            object.markerProperty.setValueAtTime(value, newMarker);
          } catch (err) {}
        };
      }
      function DeleteAllMarkerKeysItemAction() {
        this.UiName = "delete all markers";
        this.objectType = "Void";
        this.makeAction = function (
          loopElementName,
          reverseOrder,
          value,
          object,
        ) {
          try {
            for (var i = object.markerProperty.numKeys; i > 0; i--) {
              object.markerProperty.removeKey(i);
            }
          } catch (err) {}
        };
      }
      function IsDuplicatedItemProperty() {
        this.UiName = "isDuplicate";
        this.objectType = "Boolean";
        this.getValue = function (object, loopBackgroundData) {
          return inArray(object, loopBackgroundData.duplicateList);
        };
      }
      function IdItemProperty() {
        this.UiName = "item id";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.id;
        };
      }
      function ParentFolderItemProperty() {
        this.UiName = "parent folder";
        this.objectType = "Item";
        this.getValue = function (object) {
          return new ItemObject(object.parentFolder);
        };
        this.setValue = function (value, object) {
          object.parentFolder = value.object;
        };
      }
      function SelectedItemProperty() {
        this.UiName = "is selected";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.selected;
        };
        this.setValue = function (value, object) {
          object.selected = value;
        };
      }
      function IsStillItemProperty() {
        this.UiName = "is still frame";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          try {
            return object.mainSource.isStill;
          } catch (err) {}
        };
      }
      function HasAlphaItemProperty() {
        this.UiName = "has alpha channel";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          try {
            return object.mainSource.hasAlpha;
          } catch (err) {}
        };
      }
      function AlphaModeItemProperty() {
        this.UiName = "alpha channel mode";
        this.objectType = "Array";
        this.options = [
          "Ignore",
          "Straight - Unmatted",
          "Premultiplied - Matted With Color",
        ];
        this.optionsSet = {
          Ignore: AlphaMode.IGNORE,
          "Premultiplied - Matted With Color": AlphaMode.PREMULTIPLIED,
          "Straight - Unmatted": AlphaMode.STRAIGHT,
        };
        this.getValue = function (object) {
          try {
            for (var key in this.optionsSet) {
              if (this.optionsSet[key] == object.mainSource.alphaMode) {
                return key;
                break;
              }
            }
            return object.trackMatteType;
          } catch (err) {}
        };
        this.setValue = function (value, object) {
          try {
            object.mainSource.alphaMode = this.optionsSet[value];
          } catch (err) {}
        };
      }
      function LoopItemProperty() {
        this.UiName = "loop";
        this.objectType = "Number";
        this.getValue = function (object) {
          try {
            return object.mainSource.loop;
          } catch (err) {}
        };
        this.setValue = function (value, object) {
          try {
            object.mainSource.loop = parseInt(value);
          } catch (err) {}
        };
      }
      function TypeNameItemProperty() {
        this.UiName = "item type";
        this.objectType = "Array";
        this.options = ["Folder", "Footage", "Composition"];
        this.getValue = function (object) {
          return object.typeName;
        };
      }
      function ThisItemProperty() {
        this.UiName = "this item";
        this.objectType = "Item";
        this.getValue = function (object) {
          return new ItemObject(object);
        };
      }
      function ExtensionItemProperty() {
        this.UiName = "file extension";
        this.objectType = "Text";
        this.getValue = function (object) {
          if (object instanceof FootageItem) {
            return getFileExtension(object.file);
          }
        };
      }
      function HeightItemProperty() {
        this.UiName = "height";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.height;
        };
        this.setValue = function (value, object) {
          try {
            object.height = parseInt(value);
          } catch (err) {}
        };
      }
      function WidthItemProperty() {
        this.UiName = "width";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.width;
        };
        this.setValue = function (value, object) {
          try {
            object.width = parseInt(value);
          } catch (err) {}
        };
      }
      function FrameRateItemProperty() {
        this.UiName = "frame rate";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.frameRate;
        };
        this.setValue = function (value, object) {
          try {
            if (object instanceof FootageItem) {
              object.mainSource.conformFrameRate = parseFloat(value);
            } else {
              object.frameRate = parseFloat(value);
            }
          } catch (err) {}
        };
      }
      function DurationItemProperty() {
        this.UiName = "duration";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.duration;
        };
        this.setValue = function (value, object) {
          try {
            object.duration = parseFloat(value);
          } catch (err) {}
        };
      }
      function StartTimeCodeItemProperty() {
        this.UiName = "start timecode";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.displayStartTime;
        };
        this.setValue = function (value, object) {
          try {
            object.displayStartTime = parseFloat(value);
          } catch (err) {}
        };
      }
      function WorkAreaStartItemProperty() {
        this.UiName = "work area start";
        this.objectType = "Number";
        this.getValue = function (object) {
          try {
            if (object instanceof CompItem) {
              return object.workAreaStart;
            }
          } catch (err) {}
        };
        this.setValue = function (value, object) {
          try {
            if (object instanceof CompItem) {
              object.workAreaStart = value;
              var differeceNum = 0;
              if (value > object.workAreaStart + object.workAreaDuration) {
                object.workAreaStart = value;
              } else {
                if (value > object.workAreaStart) {
                  differeceNum = value - object.workAreaStart;
                  object.workAreaStart = value;
                  object.workAreaDuration =
                    object.workAreaDuration - differeceNum;
                }
                if (value < object.workAreaStart) {
                  differeceNum = object.workAreaStart - value;
                  object.workAreaDuration =
                    object.workAreaDuration + differeceNum;
                  object.workAreaStart = value;
                }
              }
            }
          } catch (err) {}
        };
      }
      function WorkAreaEndItemProperty() {
        this.UiName = "work area end";
        this.objectType = "Number";
        this.getValue = function (object) {
          try {
            if (object instanceof CompItem) {
              return parseFloat(object.workAreaStart + object.workAreaDuration);
            }
          } catch (err) {}
        };
        this.setValue = function (value, object) {
          try {
            if (object instanceof CompItem) {
              var differeceNum = 0;
              if (parseFloat(value) > object.workAreaStart) {
                if (
                  parseFloat(value) >
                  object.workAreaStart + object.workAreaDuration
                ) {
                  differeceNum =
                    parseFloat(value) -
                    (object.workAreaStart + object.workAreaDuration);
                  object.workAreaDuration =
                    object.workAreaDuration + differeceNum;
                } else {
                  if (
                    parseFloat(value) <
                    object.workAreaStart + object.workAreaDuration
                  ) {
                    differeceNum =
                      object.workAreaStart +
                      object.workAreaDuration -
                      parseFloat(value);
                    object.workAreaDuration =
                      object.workAreaDuration - differeceNum;
                  }
                }
              } else {
                if (value < object.workAreaStart) {
                  object.workAreaStart =
                    parseFloat(value) - object.workAreaDuration;
                }
              }
            }
          } catch (err) {}
        };
      }
      function TimeIndicatorItemProperty() {
        this.UiName = "time indicator";
        this.objectType = "Number";
        this.getValue = function (object) {
          return object.time;
        };
        this.setValue = function (value, object) {
          try {
            object.time = parseFloat(value);
          } catch (err) {}
        };
      }
      function IsMissingItemProperty() {
        this.UiName = "isMissing";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.footageMissing;
        };
      }
      function UseProxyItemProperty() {
        this.UiName = "use proxy";
        this.objectType = "Boolean";
        this.getValue = function (object) {
          return object.useProxy;
        };
        this.setValue = function (value, object) {
          try {
            object.useProxy = value;
          } catch (err) {}
        };
      }
      function NumLayersItemProperty() {
        this.UiName = "number of layers";
        this.objectType = "Number";
        this.getValue = function (object) {
          if (object instanceof CompItem) {
            return object.numLayers;
          }
        };
      }
      function NumMarkersItemProperty() {
        this.UiName = "number of markers";
        this.objectType = "Number";
        this.getValue = function (object) {
          try {
            if (object instanceof CompItem || object instanceof AVItem) {
              return object.markerProperty.numKeys;
            } else {
              return 0;
            }
          } catch (err) {
            return 0;
          }
        };
      }
      function RootFolderItemProperty() {
        this.UiName = "root folder";
        this.objectType = "Item";
        this.getValue = function (object) {
          return app.project.rootFolder;
        };
      }
      function ProjectNameItemProperty() {
        this.UiName = "project name";
        this.objectType = "Text";
        this.getValue = function (object) {
          try {
            return app.project.file.fsName.slice(
              app.project.file.fsName.lastIndexOf("\\") + 1,
              app.project.file.fsName.length - 4,
            );
          } catch (err) {}
        };
      }
      ProjectItems.prototype.getValue = function () {
        return app.project.numItems;
      };
      ProjectItems.prototype.getObject = function (i) {
        return new ItemObject(app.project.item(i));
      };
      ProjectItems.prototype.getObjectCollection = function () {
        var objectCollcetion = [];
        var numObjects = app.project.numItems;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(app.project.item(i));
        }
        return objectCollcetion;
      };
      ProjectItems.prototype.getCollectionObject = function (object) {
        return new ItemObject(object);
      };
      SelectedCompItems.prototype.getValue = function () {
        if (app.project.activeItem instanceof CompItem) {
          return app.project.activeItem.numLayers;
        } else {
          alert("you have to select a comp");
        }
      };
      SelectedCompItems.prototype.getObject = function (i) {
        return new LayerObject(app.project.activeItem.layer(i));
      };
      SelectedCompItems.prototype.getObjectCollection = function () {
        var objectCollcetion = [];
        var numObjects = app.project.activeItem.numLayers;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(app.project.activeItem.layer(i));
        }
        return objectCollcetion;
      };
      SelectedCompItems.prototype.getCollectionObject = function (object) {
        return new LayerObject(object);
      };
      CustomCompItem.prototype.getValue = function (item) {
        if (item.object instanceof CompItem) {
          return item.object.numLayers;
        } else {
          return -1;
        }
      };
      CustomCompItem.prototype.getObject = function (i, item) {
        return new LayerObject(item.object.layer(i));
      };
      CustomCompItem.prototype.getObjectCollection = function (item) {
        var objectCollcetion = [];
        var numObjects = item.object.numLayers;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(item.object.layer(i));
        }
        return objectCollcetion;
      };
      CustomCompItem.prototype.getCollectionObject = function (object) {
        return new LayerObject(object);
      };
      LayerEffects.prototype.getValue = function (layer) {
        try {
          return layer.object.effect.numProperties;
        } catch (err) {
          return -1;
        }
      };
      LayerEffects.prototype.getObject = function (i, layer) {
        return new EffectObject(layer.object.effect(i));
      };
      LayerEffects.prototype.getObjectCollection = function (layer) {
        var objectCollcetion = [];
        var numObjects = layer.object.effect.numProperties;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(layer.object.effect(i));
        }
        return objectCollcetion;
      };
      LayerEffects.prototype.getCollectionObject = function (object) {
        return new EffectObject(object);
      };
      EffectProperties.prototype.getValue = function (effect) {
        try {
          if (effect instanceof EffectObject) {
            return getEffectProperties(effect.object).length;
          }
        } catch (err) {
          return -1;
        }
      };
      EffectProperties.prototype.getObject = function (i, effect) {
        return new PropertyObject(getEffectProperties(effect.object)[i]);
      };
      EffectProperties.prototype.getObjectCollection = function (effect) {
        var objectCollcetion = [];
        var numObjects = getEffectProperties(effect.object);
        return numObjects;
      };
      EffectProperties.prototype.getCollectionObject = function (object) {
        return new PropertyObject(object);
      };
      LayerProperties.prototype.getValue = function (layer) {
        try {
          if (layer instanceof LayerObject) {
            return getLayerProperties(layer.object).length;
          }
        } catch (err) {
          return -1;
        }
      };
      LayerProperties.prototype.getObject = function (i, layer) {
        return new PropertyObject(getLayerProperties(layer.object)[i]);
      };
      LayerProperties.prototype.getObjectCollection = function (layer) {
        var objectCollcetion = [];
        var numObjects = getLayerProperties(layer.object);
        return numObjects;
      };
      LayerProperties.prototype.getCollectionObject = function (object) {
        return new PropertyObject(object);
      };
      CustomProperty.prototype.getValue = function (layer, property) {
        if (layer instanceof LayerObject) {
          var propertyObject = layer.getPropertyObject(property);
        }
        if (layer instanceof PropertyObject) {
          var propertyObject = layer.getPropertyValue(property);
        }
        var numKeys = propertyObject.object.numKeys;
        if (numKeys != -1) {
          return numKeys;
        } else {
          return -1;
        }
      };
      CustomProperty.prototype.getObject = function (i, property) {
        return new LayerObject(item.object.layer(i));
      };
      CustomProperty.prototype.getObjectCollection = function (
        layer,
        property,
      ) {
        var objectCollcetion = [];
        if (layer instanceof LayerObject) {
          var propertyObject = layer.getPropertyObject(property);
        }
        if (layer instanceof PropertyObject) {
          var propertyObject = layer.getPropertyValue(property);
        }
        var numObjects = propertyObject.object.numKeys;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(propertyObject.object.keyTime(i));
        }
        return objectCollcetion;
      };
      CustomProperty.prototype.getCollectionObject = function (
        layer,
        property,
        time,
      ) {
        if (layer instanceof LayerObject) {
          var propertyAtKeyObject = layer.getPropertyObject(property);
        }
        if (layer instanceof PropertyObject) {
          var propertyAtKeyObject = layer.getPropertyValue(property);
        }
        propertyAtKeyObject.timeValue = time;
        return propertyAtKeyObject;
      };
      MarkerProperty.prototype.getValue = function (layer, property) {
        if (layer instanceof LayerObject) {
          var propertyObject = layer.object.property("ADBE Marker");
        }
        if (layer instanceof ItemObject) {
          var propertyObject = layer.object.markerProperty;
        }
        var numKeys = propertyObject.numKeys;
        if (
          numKeys &&
          numKeys != null &&
          numKeys != undefined &&
          numKeys != -1
        ) {
          return numKeys;
        } else {
          return -1;
        }
      };
      MarkerProperty.prototype.getObject = function (i, property) {
        return new MarkerObject();
      };
      MarkerProperty.prototype.getObjectCollection = function (
        markerObject,
        property,
      ) {
        var objectCollcetion = [];
        if (markerObject instanceof LayerObject) {
          var propertyObject = markerObject.object.property("ADBE Marker");
        }
        if (markerObject instanceof ItemObject) {
          var propertyObject = markerObject.object.markerProperty;
        }
        var numObjects = propertyObject.numKeys;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(propertyObject.keyTime(i));
        }
        return objectCollcetion;
      };
      MarkerProperty.prototype.getCollectionObject = function (
        markerObject,
        property,
        time,
      ) {
        if (markerObject instanceof LayerObject) {
          var markerAtKeyObject = new MarkerObject(
            markerObject.object.property("ADBE Marker"),
          );
        }
        if (markerObject instanceof ItemObject) {
          var markerAtKeyObject = new MarkerObject(
            markerObject.object.markerProperty,
          );
        }
        markerAtKeyObject.timeValue = time;
        return markerAtKeyObject;
      };
      RenderQueueItems.prototype.getValue = function () {
        return app.project.renderQueue.numItems;
      };
      RenderQueueItems.prototype.getObject = function (i) {
        return new RenderQueueItemObject(app.project.renderQueue.item(i));
      };
      RenderQueueItems.prototype.getObjectCollection = function () {
        var objectCollcetion = [];
        var numObjects = app.project.renderQueue.numItems;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(app.project.renderQueue.item(i));
        }
        return objectCollcetion;
      };
      RenderQueueItems.prototype.getCollectionObject = function (object) {
        return new RenderQueueItemObject(object);
      };
      OutputModules.prototype.getValue = function (renderQueueItem) {
        return renderQueueItem.object.numOutputModules;
      };
      OutputModules.prototype.getObject = function (i, renderQueueItem) {
        return new OutputModuleObject(renderQueueItem.object.outputModule(i));
      };
      OutputModules.prototype.getObjectCollection = function (renderQueueItem) {
        var objectCollcetion = [];
        var numObjects = renderQueueItem.object.numOutputModules;
        for (var i = 1; i <= numObjects; i += 1) {
          objectCollcetion.push(renderQueueItem.object.outputModule(i));
        }
        return objectCollcetion;
      };
      OutputModules.prototype.getCollectionObject = function (object, RQItem) {
        return new OutputModuleObject(object, RQItem);
      };
      CustomIterations.prototype.getValue = function () {
        return this.value;
      };
      CustomIterations.prototype.getObject = function (i) {
        return new CustomObject(i);
      };
      CustomIterations.prototype.getObjectCollection = function (item) {
        var objectCollcetion = [];
        return objectCollcetion;
      };
      CustomIterations.prototype.getCollectionObject = function (object) {
        return new LayerObject(object);
      };
      Alert.prototype.run = function (
        current_i,
        first_Cycle,
        num_Cycles,
        reverseOrder,
        duplicatedLayersMemory,
      ) {
        if (this.enabled == true) {
          finalString = "";
          if (current_i == first_Cycle) {
            globalEnv[this.elementName] = "";
          }
          for (var i = 0; i < this.alertItems.length; i += 1) {
            if (this.alertItems[i].type != "custom") {
              try {
                finalString += globalEnv[
                  this.alertItems[i].type
                ].getPropertyValue(
                  this.alertItems[i].property,
                  duplicatedLayersMemory,
                );
              } catch (err) {
                finalString += "Not existed layer property";
              }
            } else {
              finalString += this.alertItems[i].text;
            }
          }
          if (this.sumToText == true) {
            if (current_i == first_Cycle) {
              globalEnv[this.elementName] += finalString;
            } else {
              globalEnv[this.elementName] += "\n" + finalString;
            }
          } else {
            alert(finalString);
          }
        }
      };
      Alert.prototype.toUI = function (dest, refresh_list, indentation) {
        var testString = "\u271a";
        linesCounter++;
        editorDynamicUIContainer.mainGroup = dest.add(
          "group",
          undefined,
          undefined,
        );
        editorDynamicUIContainer.mainGroup.alignment = ["center", "top"];
        editorDynamicUIContainer.mainGroup.orientation = "row";
        editorDynamicUIContainer.mainGroup.minimumSize = [2000, 40];
        editorDynamicUIContainer.mainGroup.maximumSize = [
          editorDynamicUIContainer.mainGroup.minimumSize[0],
          editorDynamicUIContainer.mainGroup.minimumSize[1],
        ];
        editorDynamicUIContainer.mainGroup.margins = [0, 0, 0, 0];
        editorDynamicUIContainer.mainGroup.spacing = 0;
        editorDynamicUIContainer.indentationGroup =
          editorDynamicUIContainer.mainGroup.add("group", undefined, undefined);
        editorDynamicUIContainer.panel = editorDynamicUIContainer.mainGroup.add(
          "panel",
          undefined,
          undefined,
        );
        this.panel = editorDynamicUIContainer.panel;
        var command = this;
        if (isVisible(command)) {
          newUiCodeLine(
            command,
            "message",
            editorDynamicUIContainer.panel,
            editorDynamicUIContainer.indentationGroup,
            indentation,
            refresh_list,
          );
          for (var i = 0; i < this.alertItems.length; i += 1) {
            var forLoopParents = uiVariables.variables;
            this.alertItems[i].toUI(
              editorDynamicUIContainer.panel,
              refresh_list,
              forLoopParents,
            );
          }
          editorDynamicUIContainer.sumToTextBtn =
            editorDynamicUIContainer.panel.add(
              "checkbox",
              undefined,
              "sum to list",
            );
          editorDynamicUIContainer.sumToTextBtn.helpTip =
            "Saves this message\'s text data without showing the message and making a list of all the messages togther(use Textbox automation to show the list)";
          if (this.sumToText == true) {
            editorDynamicUIContainer.sumToTextBtn.value = true;
          }
          editorDynamicUIContainer.sumToTextBtn.onClick = function () {
            if (this.value == true) {
              command.sumToText = true;
            } else {
              command.sumToText = false;
            }
            generateUndoStep();
          };
          editorDynamicUIContainer.addAlert =
            editorDynamicUIContainer.panel.add("button", undefined, "\u271a");
          editorDynamicUIContainer.addAlert.helpTip =
            "Add text element to this message";
          editorDynamicUIContainer.addAlert.size = [20, 20];
          editorDynamicUIContainer.addAlert.onClick = function () {
            command.alertItems.push(new AlertItem(command));
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u2716",
          );
          editorDynamicUIContainer.del_btn.helpTip = "Delete";
          editorDynamicUIContainer.del_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn.onClick = function () {
            if (inArray(command, selectedLines)) {
              removeFromArray(command, selectedLines);
              for (var i = 0; i < selectedLines.length; i += 1) {
                if (inArray(selectedLines[i], selectedLines[i].parent.scope)) {
                  selectedLines[i].remove(selectedLines[i]);
                  if (selectedLines[i].parent.scope.length == 0) {
                    selectedLines[i].parent.scopeColor = undefined;
                  }
                }
              }
              selectedLines = [];
            }
            command.remove(command);
            if (command.parent.scope.length == 0) {
              command.parent.scopeColor = undefined;
            }
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn.fillBrush =
            editorDynamicUIContainer.del_btn.graphics.newBrush(
              editorDynamicUIContainer.del_btn.graphics.BrushType.SOLID_COLOR,
              buttonBackgroundColor,
            );
          editorDynamicUIContainer.del_btn.textPen =
            editorDynamicUIContainer.del_btn.graphics.newPen(
              editorDynamicUIContainer.del_btn.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              5,
            );
          editorDynamicUIContainer.del_btn.onDraw = getGlobalDrawFuncrion(
            0,
            0,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseover",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseout",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.info_btn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u24a4");
          editorDynamicUIContainer.info_btn.helpTip = "Info";
          editorDynamicUIContainer.info_btn.size = [20, 20];
          editorDynamicUIContainer.info_btn.onClick = function () {
            infoDlg(command.info);
          };
        }
      };
      AlertItem.prototype.toUI = function (dest, refresh_list, varList) {
        var testString = "\u271a";
        var objectType = "";
        editorDynamicUIContainer.alert_type = dest.add(
          "dropdownlist",
          undefined,
          ["custom"],
        );
        editorDynamicUIContainer.alert_type.size = [20, 26];
        for (var i = 0; i < varList.length; i += 1) {
          editorDynamicUIContainer.alert_type.add("item", varList[i].name);
          if (varList[i].name == this.type) {
            objectType = varList[i].type;
            this.VarType = varList[i].type;
          }
        }
        for (var i = 0; i < 5; i += 1) {
          editorDynamicUIContainer.alert_type.add("item", "");
        }
        if (this.type != "") {
          editorDynamicUIContainer.alert_type.selection =
            editorDynamicUIContainer.alert_type.find(this.type);
          if (editorDynamicUIContainer.alert_type.find(this.type) == null) {
            this.type = "custom";
            this.VarType = "Index";
            this.text = "";
            this.property = "";
          }
        }
        if (objectType != "") {
          editorDynamicUIContainer.text01 = dest.add(
            "statictext",
            undefined,
            objectType,
            ["left", "bottom"],
          );
        }
        var alertItem = this;
        switch (this.type) {
          default:
            editorDynamicUIContainer.alert_properties = dest.add(
              "dropdownlist",
              undefined,
              [],
            );
            editorDynamicUIContainer.alert_properties.size = [95, 26];
            var properties = getObjectProperties(
              this.VarType,
              "properties",
              undefined,
              this.type,
              this.parent,
            );
            for (var i = 0; i < properties.length; i += 1) {
              editorDynamicUIContainer.alert_properties.add(
                "item",
                properties[i],
              );
            }
            if (this.property != "") {
              editorDynamicUIContainer.alert_properties.selection =
                editorDynamicUIContainer.alert_properties.find(this.property);
              if (
                editorDynamicUIContainer.alert_properties.find(this.property) ==
                null
              ) {
                this.text = "";
                this.property = "";
              }
            }
            editorDynamicUIContainer.alert_properties.onChange = function () {
              if (this.selection.text != "") {
                alertItem.property = this.selection.text;
              } else {
                this.selection = 0;
              }
              generateUndoStep();
            };
            editorDynamicUIContainer.alert_properties_Btn = dest.add(
              "button",
              undefined,
              "(...)",
            );
            editorDynamicUIContainer.alert_properties_Btn.size = [20, 20];
            editorDynamicUIContainer.alert_properties_Btn.onClick =
              function () {
                var selectedProperty = buildPropertySelectionUI(
                  alertItem.VarType,
                  "properties",
                  undefined,
                  alertItem.type,
                  undefined,
                );
                if (selectedProperty != "") {
                  editorDynamicUIContainer.alert_properties.selection =
                    editorDynamicUIContainer.alert_properties.find(
                      selectedProperty,
                    );
                  generateUndoStep();
                }
              };
            break;
          case "custom":
            this.type = "custom";
            editorDynamicUIContainer.custom_value = dest.add(
              "edittext",
              undefined,
              this.text,
            );
            editorDynamicUIContainer.custom_value.size = [40, 26];
            editorDynamicUIContainer.custom_value.onChange = function () {
              alertItem.text = this.text;
              generateUndoStep();
            };
            editorDynamicUIContainer.custom_valueMore = dest.add(
              "button",
              undefined,
              "\ufe34",
            );
            editorDynamicUIContainer.custom_valueMore.size = [7, 24];
            editorDynamicUIContainer.custom_valueMore.helpTip =
              "click this for editing the text";
            editorDynamicUIContainer.custom_valueMore.onClick = function () {
              var dialog = new Window("dialog");
              dialog.text = "Dialog";
              dialog.preferredSize.height = 214;
              dialog.orientation = "column";
              dialog.alignChildren = ["center", "top"];
              dialog.spacing = 10;
              dialog.margins = 16;
              var statictext1 = dialog.add("statictext", undefined, undefined, {
                name: "statictext1",
              });
              statictext1.text = "Message Item Text:";
              var edittext1 = dialog.add(
                'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
              );
              edittext1.text = alertItem.text;
              edittext1.preferredSize.width = 362;
              edittext1.preferredSize.height = 117;
              var group1 = dialog.add("group", undefined, { name: "group1" });
              group1.orientation = "row";
              group1.alignChildren = ["left", "center"];
              group1.spacing = 10;
              group1.margins = 0;
              var button1 = group1.add("button", undefined, undefined, {
                name: "button1",
              });
              button1.text = "Ok";
              button1.preferredSize.width = 55;
              button1.preferredSize.height = 27;
              button1.onClick = function () {
                alertItem.text = edittext1.text;
                generateUndoStep();
                dialog.close();
                refreshUi(refresh_list[0], refresh_list[1]);
              };
              var button2 = group1.add("button", undefined, undefined, {
                name: "button2",
              });
              button2.text = "Cancel";
              button2.preferredSize.width = 55;
              button2.preferredSize.height = 27;
              dialog.show();
              dialog = null;
              statictext1 = null;
              edittext1 = null;
              group1 = null;
              button1 = null;
              button2 = null;
            };
            break;
        }
        editorDynamicUIContainer.removeAlert = dest.add(
          "button",
          undefined,
          "\u2715",
        );
        editorDynamicUIContainer.removeAlert.helpTip = "Remove text element";
        editorDynamicUIContainer.removeAlert.size = [20, 20];
        editorDynamicUIContainer.removeAlert.onClick = function () {
          for (var i = 0; i < alertItem.parent.alertItems.length; i += 1) {
            if (alertItem.parent.alertItems[i] == alertItem) {
              alertItem.parent.alertItems.splice(i, 1);
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            }
          }
        };
        editorDynamicUIContainer.alert_type.onChange = function () {
          switch (this.selection.text) {
            default:
              alertItem.type = this.selection.text;
              alertItem.text = "";
              refreshUi(refresh_list[0], refresh_list[1]);
              break;
            case "custom":
            case "":
              alertItem.type = "custom";
              refreshUi(refresh_list[0], refresh_list[1]);
              break;
          }
          generateUndoStep();
        };
      };
      TextBox.prototype.run = function (
        current_i,
        num_Cycles,
        reverseOrder,
        duplicatedLayersMemory,
      ) {
        if (this.enabled == true) {
          finalString = "";
          for (var i = 0; i < this.textBoxItems.length; i += 1) {
            if (this.textBoxItems[i].type != "custom") {
              if (
                inArray(
                  this.textBoxItems[i].type,
                  makeArrayFromAttribute("name", findAlerts(this)),
                ) == false
              ) {
                delete globalEnv[this.textBoxItems[i].type];
              } else {
                if (finalString == "") {
                  finalString += globalEnv[this.textBoxItems[i].type];
                } else {
                  finalString += "\n" + globalEnv[this.textBoxItems[i].type];
                }
              }
            } else {
              if (finalString == "") {
                finalString += this.textBoxItems[i].text;
              } else {
                finalString += "\n" + this.textBoxItems[i].text;
              }
            }
          }
          if (this.sumToText == true) {
          } else {
            var textBoxDlg = new Window("dialog", this.elementName);
            textBoxDlg.minimumSize = [400, 265];
            textBoxDlg.maximumSize = [
              textBoxDlg.minimumSize[0],
              textBoxDlg.minimumSize[1],
            ];
            textBoxDlg_window = textBoxDlg.add("panel", undefined, undefined);
            textBoxDlg_pal1 = textBoxDlg_window.add(
              "panel",
              undefined,
              undefined,
            );
            textBoxDlg_pal2 = textBoxDlg_window.add(
              "group",
              undefined,
              undefined,
            );
            textBoxDlg_window.orientation = "column";
            textBoxDlg_pal1.orientation = "column";
            var textBoxDlgText = textBoxDlg_pal1.add(
              "edittext",
              undefined,
              finalString,
              { multiline: true, readonly: true },
            );
            textBoxDlgText.size = [300, 150];
            var okBtn = textBoxDlg_pal2.add("button", undefined, "ok");
            textBoxDlg.show();
          }
        }
      };
      TextBox.prototype.toUI = function (dest, refresh_list, indentation) {
        var testString = "\u271a";
        linesCounter++;
        editorDynamicUIContainer.mainGroup = dest.add(
          "group",
          undefined,
          undefined,
        );
        editorDynamicUIContainer.mainGroup.alignment = ["center", "top"];
        editorDynamicUIContainer.mainGroup.orientation = "row";
        editorDynamicUIContainer.mainGroup.minimumSize = [2000, 40];
        editorDynamicUIContainer.mainGroup.maximumSize = [
          editorDynamicUIContainer.mainGroup.minimumSize[0],
          editorDynamicUIContainer.mainGroup.minimumSize[1],
        ];
        editorDynamicUIContainer.mainGroup.margins = [0, 0, 0, 0];
        editorDynamicUIContainer.mainGroup.spacing = 0;
        editorDynamicUIContainer.indentationGroup =
          editorDynamicUIContainer.mainGroup.add("group", undefined, undefined);
        editorDynamicUIContainer.panel = editorDynamicUIContainer.mainGroup.add(
          "panel",
          undefined,
          undefined,
        );
        this.panel = editorDynamicUIContainer.panel;
        var command = this;
        if (isVisible(command)) {
          newUiCodeLine(
            command,
            "ListBox",
            editorDynamicUIContainer.panel,
            editorDynamicUIContainer.indentationGroup,
            indentation,
            refresh_list,
          );
          for (var i = 0; i < this.textBoxItems.length; i += 1) {
            var forLoopParents = findAlerts(this);
            this.textBoxItems[i].toUI(
              editorDynamicUIContainer.panel,
              refresh_list,
              forLoopParents,
            );
            forLoopParents = null;
          }
          editorDynamicUIContainer.sumToTextBtn =
            editorDynamicUIContainer.panel.add(
              "checkbox",
              undefined,
              "don\'t show",
            );
          editorDynamicUIContainer.sumToTextBtn.helpTip =
            "Don\'t show this Textbox message";
          if (this.sumToText == true) {
            editorDynamicUIContainer.sumToTextBtn.value = true;
          }
          editorDynamicUIContainer.sumToTextBtn.onClick = function () {
            if (this.value == true) {
              command.sumToText = true;
            } else {
              command.sumToText = false;
            }
            generateUndoStep();
          };
          editorDynamicUIContainer.addAlert =
            editorDynamicUIContainer.panel.add("button", undefined, "\u271a");
          editorDynamicUIContainer.addAlert.helpTip =
            "Add text element to this text box";
          editorDynamicUIContainer.addAlert.size = [20, 20];
          editorDynamicUIContainer.addAlert.onClick = function () {
            command.textBoxItems.push(new TextBoxItem(command));
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u2716",
          );
          editorDynamicUIContainer.del_btn.helpTip = "Delete";
          editorDynamicUIContainer.del_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn.onClick = function () {
            if (inArray(command, selectedLines)) {
              removeFromArray(command, selectedLines);
              for (var i = 0; i < selectedLines.length; i += 1) {
                if (inArray(selectedLines[i], selectedLines[i].parent.scope)) {
                  selectedLines[i].remove(selectedLines[i]);
                  if (selectedLines[i].parent.scope.length == 0) {
                    selectedLines[i].parent.scopeColor = undefined;
                  }
                }
              }
              selectedLines = [];
            }
            command.remove(command);
            if (command.parent.scope.length == 0) {
              command.parent.scopeColor = undefined;
            }
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn.fillBrush =
            editorDynamicUIContainer.del_btn.graphics.newBrush(
              editorDynamicUIContainer.del_btn.graphics.BrushType.SOLID_COLOR,
              buttonBackgroundColor,
            );
          editorDynamicUIContainer.del_btn.textPen =
            editorDynamicUIContainer.del_btn.graphics.newPen(
              editorDynamicUIContainer.del_btn.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              5,
            );
          editorDynamicUIContainer.del_btn.onDraw = getGlobalDrawFuncrion(
            0,
            0,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseover",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseout",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.info_btn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u24a4");
          editorDynamicUIContainer.info_btn.helpTip = "Info";
          editorDynamicUIContainer.info_btn.size = [20, 20];
          editorDynamicUIContainer.info_btn.onClick = function () {
            infoDlg(command.info);
          };
        }
      };
      TextBoxItem.prototype.toUI = function (dest, refresh_list, varList) {
        var testString = "\u271a";
        editorDynamicUIContainer.alert_type = dest.add(
          "dropdownlist",
          undefined,
          ["custom"],
        );
        editorDynamicUIContainer.alert_type.size = [20, 26];
        for (var i = 0; i < varList.length; i += 1) {
          editorDynamicUIContainer.alert_type.add("item", varList[i].name);
        }
        for (var i = 0; i < 5; i += 1) {
          editorDynamicUIContainer.alert_type.add("item", "");
        }
        editorDynamicUIContainer.alert_type.selection =
          editorDynamicUIContainer.alert_type.find(this.type);
        if (editorDynamicUIContainer.alert_type.find(this.type) == null) {
          this.type = "custom";
          this.text = "";
          this.property = "";
        }
        var textBoxItem = this;
        switch (this.type) {
          default:
            break;
          case "custom":
            this.type = "custom";
            editorDynamicUIContainer.custom_value = dest.add(
              "edittext",
              undefined,
              this.text,
            );
            editorDynamicUIContainer.custom_value.size = [40, 26];
            editorDynamicUIContainer.custom_value.onChange = function () {
              textBoxItem.text = this.text;
              generateUndoStep();
            };
            editorDynamicUIContainer.custom_valueMore = dest.add(
              "button",
              undefined,
              "\ufe34",
            );
            editorDynamicUIContainer.custom_valueMore.size = [7, 24];
            editorDynamicUIContainer.custom_valueMore.helpTip =
              "click this for editing the text";
            editorDynamicUIContainer.custom_valueMore.onClick = function () {
              var dialog = new Window("dialog");
              dialog.text = "Dialog";
              dialog.preferredSize.height = 214;
              dialog.orientation = "column";
              dialog.alignChildren = ["center", "top"];
              dialog.spacing = 10;
              dialog.margins = 16;
              var statictext1 = dialog.add("statictext", undefined, undefined, {
                name: "statictext1",
              });
              statictext1.text = "TextBox Item Text:";
              var edittext1 = dialog.add(
                'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
              );
              edittext1.text = textBoxItem.text;
              edittext1.preferredSize.width = 362;
              edittext1.preferredSize.height = 117;
              var group1 = dialog.add("group", undefined, { name: "group1" });
              group1.orientation = "row";
              group1.alignChildren = ["left", "center"];
              group1.spacing = 10;
              group1.margins = 0;
              var button1 = group1.add("button", undefined, undefined, {
                name: "button1",
              });
              button1.text = "Ok";
              button1.preferredSize.width = 55;
              button1.preferredSize.height = 27;
              button1.onClick = function () {
                textBoxItem.text = edittext1.text;
                generateUndoStep();
                dialog.close();
                refreshUi(refresh_list[0], refresh_list[1]);
              };
              var button2 = group1.add("button", undefined, undefined, {
                name: "button2",
              });
              button2.text = "Cancel";
              button2.preferredSize.width = 55;
              button2.preferredSize.height = 27;
              dialog.show();
              dialog = null;
              statictext1 = null;
              edittext1 = null;
              group1 = null;
              button1 = null;
              button2 = null;
            };
            break;
        }
        editorDynamicUIContainer.removeAlert = dest.add(
          "button",
          undefined,
          "\u2715",
        );
        editorDynamicUIContainer.removeAlert.helpTip = "Remove text element";
        editorDynamicUIContainer.removeAlert.size = [20, 20];
        editorDynamicUIContainer.removeAlert.onClick = function () {
          for (var i = 0; i < textBoxItem.parent.textBoxItems.length; i += 1) {
            if (textBoxItem.parent.textBoxItems[i] == textBoxItem) {
              textBoxItem.parent.textBoxItems.splice(i, 1);
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            }
          }
        };
        editorDynamicUIContainer.alert_type.onChange = function () {
          switch (this.selection.text) {
            default:
              textBoxItem.type = this.selection.text;
              textBoxItem.text = "";
              refreshUi(refresh_list[0], refresh_list[1]);
              break;
            case "custom":
            case "":
              textBoxItem.type = "custom";
              refreshUi(refresh_list[0], refresh_list[1]);
              break;
          }
          generateUndoStep();
        };
      };
      ForLoop.prototype.addToScope = function (item) {
        if (this.scope.length == 0) {
          this.scopeColor = [Math.random(), Math.random(), Math.random(), 1];
        }
        this.scope.push(item);
        item.mainColor = this.scopeColor;
      };
      ForLoop.prototype.addToScopePosition = function (item, positionIndex) {
        if (this.scope.length == 0) {
          this.scopeColor = [Math.random(), Math.random(), Math.random(), 1];
        }
        this.scope.splice(positionIndex, 0, item);
        item.mainColor = this.scopeColor;
      };
      ForLoop.prototype.createVariables = function () {
        if (this.scope && this.scope.length) {
          switch (this.iterationsType.name()) {
            case "custom amount of times":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Index",
              });
              break;
            case "items in the project":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Item",
              });
              break;
            case "layers in the active comp":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Layer",
              });
              break;
            case "effects in the layer":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Effect",
              });
              break;
            case "properties in the effect":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Property/Effect",
              });
              break;
            case "properties in the layer":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Property/Effect",
              });
              break;
            case "keyframes in property":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Property/Effect",
              });
              break;
            case "elements in the collection":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Collection",
              });
              break;
            case "markers in layer/item":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Marker",
              });
              break;
            case "items in the render queue":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "RQ Item",
              });
              break;
            case "output modules in render queue item":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Output-Module",
              });
              break;
            case "layers in other comp":
              uiVariables.variables.unshift({
                name: this.elementName,
                object: this,
                type: "Layer",
              });
              break;
          }
          var variableLastArrayLength = uiVariables.variables.length;
          for (var i = 0; i < this.scope.length; i += 1) {
            if (
              this.scope[i] instanceof ForLoop ||
              this.scope[i] instanceof IfStatement ||
              this.scope[i] instanceof GlobalObject
            ) {
              this.scope[i].createVariables();
            }
          }
          uiVariables.variables.splice(
            uiVariables.variables.length - variableLastArrayLength,
            1,
          );
        }
      };
      ForLoop.prototype.run = function () {
        if (
          this.enabled == true &&
          !(this.iterationsType instanceof BreakLoopIterationObject)
        ) {
          var objectCollcetion = [];
          if (
            this.iterationsType instanceof CustomCompItem ||
            this.iterationsType instanceof CustomProperty ||
            this.iterationsType instanceof MarkerProperty ||
            this.iterationsType instanceof OutputModules ||
            this.iterationsType instanceof LayerEffects ||
            this.iterationsType instanceof EffectProperties ||
            this.iterationsType instanceof LayerProperties
          ) {
            if (this.iterationsType instanceof CustomCompItem) {
              if (this.elementAName != null && this.elementAName != "") {
                var numberIterations = this.iterationsType.getValue(
                  globalEnv[this.elementAName],
                );
                objectCollcetion = this.iterationsType.getObjectCollection(
                  globalEnv[this.elementAName],
                );
              } else {
                var numberIterations = -1;
              }
            }
            if (this.iterationsType instanceof LayerEffects) {
              if (this.elementAName != null && this.elementAName != "") {
                var numberIterations = this.iterationsType.getValue(
                  globalEnv[this.elementAName],
                );
                objectCollcetion = this.iterationsType.getObjectCollection(
                  globalEnv[this.elementAName],
                );
              } else {
                var numberIterations = -1;
              }
            }
            if (this.iterationsType instanceof OutputModules) {
              if (this.elementAName != null && this.elementAName != "") {
                var numberIterations = this.iterationsType.getValue(
                  globalEnv[this.elementAName],
                );
                objectCollcetion = this.iterationsType.getObjectCollection(
                  globalEnv[this.elementAName],
                );
              } else {
                var numberIterations = -1;
              }
            }
            if (this.iterationsType instanceof EffectProperties) {
              if (this.elementAName != null && this.elementAName != "") {
                var numberIterations = this.iterationsType.getValue(
                  globalEnv[this.elementAName],
                );
                objectCollcetion = this.iterationsType.getObjectCollection(
                  globalEnv[this.elementAName],
                );
              } else {
                var numberIterations = -1;
              }
            }
            if (this.iterationsType instanceof LayerProperties) {
              if (this.elementAName != null && this.elementAName != "") {
                var numberIterations = this.iterationsType.getValue(
                  globalEnv[this.elementAName],
                );
                objectCollcetion = this.iterationsType.getObjectCollection(
                  globalEnv[this.elementAName],
                );
              } else {
                var numberIterations = -1;
              }
            }
            if (this.iterationsType instanceof MarkerProperty) {
              if (this.elementAName != null && this.elementAName != "") {
                var numberIterations = this.iterationsType.getValue(
                  globalEnv[this.elementAName],
                );
                objectCollcetion = this.iterationsType.getObjectCollection(
                  globalEnv[this.elementAName],
                );
              } else {
                var numberIterations = -1;
              }
            }
            if (this.iterationsType instanceof CustomProperty) {
              if (
                this.elementAName != null &&
                this.elementAName != "" &&
                this.elementAProperty != ""
              ) {
                var numberIterations = this.iterationsType.getValue(
                  globalEnv[this.elementAName],
                  this.elementAProperty,
                );
                objectCollcetion = this.iterationsType.getObjectCollection(
                  globalEnv[this.elementAName],
                  this.elementAProperty,
                );
              } else {
                var numberIterations = -1;
              }
            }
          } else {
            var numberIterations = this.iterationsType.getValue();
            objectCollcetion = this.iterationsType.getObjectCollection();
          }
          if (this.iterationsType instanceof CustomIterations) {
            var thisGlobalScope = findGolbalScope(this);
            thisGlobalScope.loopBackgroundData[this.elementName] = {
              breakLoop: false,
              duplicateList: [],
            };
            if (this.elementAName == "custom") {
              numberIterations = this.customIterations;
            } else {
              numberIterations = globalEnv[this.elementAName].getPropertyValue(
                this.elementAProperty,
                undefined,
              );
            }
            switch (this.reverseOrder) {
              case false:
                for (var i = 1; i <= numberIterations; i += 1) {
                  globalEnv[this.elementName] = this.iterationsType.getObject(
                    i,
                    globalEnv[this.iterationsType.itemName],
                  );
                  for (var j = 0; j < this.scope.length; j += 1) {
                    var loopCorrect = this.scope[j].run(
                      i,
                      1,
                      numberIterations,
                      this.reverseOrder,
                      thisGlobalScope.loopBackgroundData[this.elementName],
                    );
                  }
                }
                break;
              case true:
                var tempIterations = numberIterations;
                var firstCycle = numberIterations;
                numberIterations = 1;
                for (var i = tempIterations; i >= numberIterations; i--) {
                  globalEnv[this.elementName] = this.iterationsType.getObject(
                    i,
                    globalEnv[this.iterationsType.itemName],
                  );
                  for (var j = 0; j < this.scope.length; j += 1) {
                    var loopCorrect = this.scope[j].run(
                      i,
                      firstCycle,
                      numberIterations,
                      this.reverseOrder,
                      thisGlobalScope.loopBackgroundData[this.elementName],
                    );
                  }
                }
                break;
            }
            delete globalEnv[this.elementName];
            delete thisGlobalScope.loopBackgroundData[this.elementName];
          } else {
            if (
              this.iterationsType instanceof CustomProperty ||
              this.iterationsType instanceof MarkerProperty
            ) {
              if (numberIterations != -1) {
                var thisGlobalScope = findGolbalScope(this);
                thisGlobalScope.loopBackgroundData[this.elementName] = {
                  breakLoop: false,
                  duplicateList: [],
                };
                switch (this.reverseOrder) {
                  case false:
                    for (var i = 0; i < objectCollcetion.length; i += 1) {
                      globalEnv[this.elementName] =
                        this.iterationsType.getCollectionObject(
                          globalEnv[this.elementAName],
                          this.elementAProperty,
                          objectCollcetion[i],
                        );
                      for (var j = 0; j < this.scope.length; j += 1) {
                        var loopCorrect = this.scope[j].run(
                          i,
                          0,
                          numberIterations,
                          this.reverseOrder,
                          thisGlobalScope.loopBackgroundData[this.elementName],
                        );
                      }
                    }
                    break;
                  case true:
                    var tempIterations = numberIterations;
                    var firstCycle = numberIterations;
                    numberIterations = 0;
                    for (var i = objectCollcetion.length - 1; i >= 0; i--) {
                      globalEnv[this.elementName] =
                        this.iterationsType.getCollectionObject(
                          globalEnv[this.elementAName],
                          this.elementAProperty,
                          objectCollcetion[i],
                        );
                      for (var j = 0; j < this.scope.length; j += 1) {
                        var loopCorrect = this.scope[j].run(
                          i,
                          firstCycle,
                          numberIterations,
                          this.reverseOrder,
                          thisGlobalScope.loopBackgroundData[this.elementName],
                        );
                      }
                    }
                    break;
                }
                delete globalEnv[this.elementName];
                delete thisGlobalScope.loopBackgroundData[this.elementName];
              }
            } else {
              if (numberIterations != -1) {
                var thisGlobalScope = findGolbalScope(this);
                thisGlobalScope.loopBackgroundData[this.elementName] = {
                  breakLoop: false,
                  duplicateList: [],
                };
                switch (this.reverseOrder) {
                  case false:
                    for (var i = 0; i < objectCollcetion.length; i += 1) {
                      if (
                        thisGlobalScope.loopBackgroundData[this.elementName]
                          .breakLoop
                      ) {
                        break;
                      }
                      if (isValid(objectCollcetion[i])) {
                        if (this.iterationsType instanceof OutputModules) {
                          globalEnv[this.elementName] =
                            this.iterationsType.getCollectionObject(
                              objectCollcetion[i],
                              globalEnv[this.elementAName],
                            );
                        } else {
                          globalEnv[this.elementName] =
                            this.iterationsType.getCollectionObject(
                              objectCollcetion[i],
                            );
                        }
                        for (var j = 0; j < this.scope.length; j += 1) {
                          if (
                            thisGlobalScope.loopBackgroundData[this.elementName]
                              .breakLoop
                          ) {
                            break;
                          }
                          var loopCorrect = this.scope[j].run(
                            i,
                            0,
                            numberIterations,
                            this.reverseOrder,
                            thisGlobalScope.loopBackgroundData[
                              this.elementName
                            ],
                          );
                          if (
                            loopCorrect &&
                            loopCorrect != undefined &&
                            loopCorrect != null
                          ) {
                            if (Array.isArray(loopCorrect)) {
                              if (loopCorrect.length) {
                                addToArray(
                                  objectCollcetion,
                                  loopCorrect,
                                  "end",
                                );
                              }
                            } else {
                              objectCollcetion.push(loopCorrect);
                            }
                          }
                        }
                      }
                    }
                    break;
                  case true:
                    var tempIterations = numberIterations;
                    var firstCycle = numberIterations - 1;
                    numberIterations = 0;
                    for (var i = objectCollcetion.length - 1; i >= 0; i--) {
                      if (
                        thisGlobalScope.loopBackgroundData[this.elementName]
                          .breakLoop
                      ) {
                        break;
                      }
                      if (isValid(objectCollcetion[i])) {
                        if (this.iterationsType instanceof OutputModules) {
                          globalEnv[this.elementName] =
                            this.iterationsType.getCollectionObject(
                              objectCollcetion[i],
                              globalEnv[this.elementAName],
                            );
                        } else {
                          globalEnv[this.elementName] =
                            this.iterationsType.getCollectionObject(
                              objectCollcetion[i],
                            );
                        }
                        for (var j = 0; j < this.scope.length; j += 1) {
                          if (
                            thisGlobalScope.loopBackgroundData[this.elementName]
                              .breakLoop
                          ) {
                            break;
                          }
                          var loopCorrect = this.scope[j].run(
                            i,
                            firstCycle,
                            numberIterations,
                            this.reverseOrder,
                            thisGlobalScope.loopBackgroundData[
                              this.elementName
                            ],
                          );
                          if (
                            loopCorrect &&
                            loopCorrect != undefined &&
                            loopCorrect != null
                          ) {
                            if (Array.isArray(loopCorrect)) {
                              if (loopCorrect.length) {
                                addToArray(
                                  objectCollcetion,
                                  loopCorrect,
                                  "start",
                                );
                                i++;
                              }
                            } else {
                              objectCollcetion.unshift(loopCorrect);
                              i++;
                            }
                          }
                        }
                      }
                    }
                    break;
                }
                delete globalEnv[this.elementName];
                delete thisGlobalScope.loopBackgroundData[this.elementName];
                if (this.doPrecomps == true) {
                  if (this.iterationsType instanceof CustomCompItem) {
                    var precomps = findAllPrecomps(
                      this.iterationsType.getObject(
                        this.iterationsType.getValue(
                          globalEnv[this.elementAName],
                        ),
                        globalEnv[this.elementAName],
                      ).object.containingComp,
                    );
                  } else {
                    var precomps = findAllPrecomps(
                      this.iterationsType.getObject(
                        this.iterationsType.getValue(),
                      ).object.containingComp,
                    );
                  }
                  for (var i = 0; i < precomps.length; i += 1) {
                    this.runOnPrecomp(precomps[i]);
                  }
                }
              }
            }
          }
        }
        if (this.iterationsType instanceof BreakLoopIterationObject) {
          if (
            this.elementAName != null &&
            this.elementAName != "" &&
            this.enabled == true
          ) {
            var thisGlobalScope = findGolbalScope(this);
            thisGlobalScope.loopBackgroundData[this.elementAName].breakLoop =
              true;
            var loopParents = findParents(this);
            for (var i = 0; i < loopParents.length; i += 1) {
              if (this.elementAName == loopParents[i].name) {
                break;
              }
              if (loopParents[i].object instanceof ForLoop) {
                thisGlobalScope.loopBackgroundData[
                  loopParents[i].name
                ].breakLoop = true;
              }
            }
          }
        }
      };
      ForLoop.prototype.runOnPrecomp = function (precomp) {
        var numberIterations = precomp.numLayers;
        var customIterationsType = new CustomCompItem();
        var objectCollcetion = customIterationsType.getObjectCollection(
          new ItemObject(precomp),
        );
        var thisGlobalScope = findGolbalScope(this);
        thisGlobalScope.loopBackgroundData[this.elementName] = {
          breakLoop: false,
          duplicateList: [],
        };
        switch (this.reverseOrder) {
          case false:
            for (var i = 0; i < objectCollcetion.length; i += 1) {
              if (isValid(objectCollcetion[i])) {
                globalEnv[this.elementName] = new LayerObject(
                  objectCollcetion[i],
                );
                for (var j = 0; j < this.scope.length; j += 1) {
                  var loopCorrect = this.scope[j].run(
                    i,
                    0,
                    numberIterations,
                    this.reverseOrder,
                    thisGlobalScope.loopBackgroundData[this.elementName],
                  );
                  if (
                    loopCorrect &&
                    loopCorrect != undefined &&
                    loopCorrect != null
                  ) {
                    if (Array.isArray(loopCorrect)) {
                      if (loopCorrect.length) {
                        addToArray(objectCollcetion, loopCorrect, "end");
                      }
                    } else {
                      objectCollcetion.push(loopCorrect);
                    }
                  }
                }
              }
            }
            break;
          case true:
            var tempIterations = numberIterations;
            var firstCycle = numberIterations;
            numberIterations = 0;
            for (var i = objectCollcetion.length - 1; i >= 0; i--) {
              if (isValid(objectCollcetion[i])) {
                globalEnv[this.elementName] = new LayerObject(
                  objectCollcetion[i],
                );
                for (var j = 0; j < this.scope.length; j += 1) {
                  var loopCorrect = this.scope[j].run(
                    i,
                    firstCycle,
                    numberIterations,
                    this.reverseOrder,
                    thisGlobalScope.loopBackgroundData[this.elementName],
                  );
                  if (
                    loopCorrect &&
                    loopCorrect != undefined &&
                    loopCorrect != null
                  ) {
                    if (Array.isArray(loopCorrect)) {
                      if (loopCorrect.length) {
                        addToArray(objectCollcetion, loopCorrect, "start");
                        i++;
                      }
                    } else {
                      objectCollcetion.unshift(loopCorrect);
                      i++;
                    }
                  }
                }
              }
            }
            break;
        }
        delete globalEnv[this.elementName];
        delete thisGlobalScope.loopBackgroundData[this.elementName];
      };
      ForLoop.prototype.toUI = function (dest, refresh_list, indentation) {
        var testString = "\u271a";
        linesCounter++;
        editorDynamicUIContainer.mainGroup = dest.add(
          "group",
          undefined,
          undefined,
        );
        editorDynamicUIContainer.mainGroup.alignment = ["center", "top"];
        editorDynamicUIContainer.mainGroup.orientation = "row";
        editorDynamicUIContainer.mainGroup.minimumSize = [2000, 40];
        editorDynamicUIContainer.mainGroup.maximumSize = [
          editorDynamicUIContainer.mainGroup.minimumSize[0],
          editorDynamicUIContainer.mainGroup.minimumSize[1],
        ];
        editorDynamicUIContainer.mainGroup.margins = [0, 0, 0, 0];
        editorDynamicUIContainer.mainGroup.spacing = 0;
        editorDynamicUIContainer.indentationGroup =
          editorDynamicUIContainer.mainGroup.add("group", undefined, undefined);
        editorDynamicUIContainer.panel = editorDynamicUIContainer.mainGroup.add(
          "panel",
          undefined,
          undefined,
        );
        this.panel = editorDynamicUIContainer.panel;
        var command = this;
        if (isVisible(command)) {
          newUiCodeLine(
            command,
            "loop",
            editorDynamicUIContainer.panel,
            editorDynamicUIContainer.indentationGroup,
            indentation,
            refresh_list,
          );
          editorDynamicUIContainer.functionType =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, [
              "items in the project",
              "layers in the active comp",
              "layers in other comp",
              "properties in the layer",
              "effects in the layer",
              "properties in the effect",
              "keyframes in property",
              "markers in layer/item",
              "items in the render queue",
              "output modules in render queue item",
              "custom amount of times",
              "stop loop",
              "",
              "",
              "",
            ]);
          editorDynamicUIContainer.functionType.minimumSize = [100, 25];
          editorDynamicUIContainer.functionType.maximumSize = [
            editorDynamicUIContainer.functionType.minimumSize[0],
            editorDynamicUIContainer.functionType.minimumSize[1],
          ];
          editorDynamicUIContainer.functionType.selection =
            editorDynamicUIContainer.functionType.find(
              this.iterationsType.name(),
            );
          if (this.iterationsType instanceof CustomIterations) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, [
                "custom",
              ]);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              editorDynamicUIContainer.elementA.add(
                "item",
                forLoopParents[i].name,
              );
              if (forLoopParents[i].name == this.elementAName) {
                this.elementAType = forLoopParents[i].type;
              }
            }
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.elementA.add("item", "");
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
                if (forLoopParents && forLoopParents.length) {
                  editorDynamicUIContainer.elementA.selection = 0;
                  this.elementAName = "custom";
                  this.elementAType = forLoopParents[0].type;
                }
              }
            } else {
              editorDynamicUIContainer.elementA.selection = 0;
              this.elementAName = "custom";
            }
            if (
              editorDynamicUIContainer.elementA.selection != null &&
              this.elementAName != "custom" &&
              this.elementAName != null
            ) {
              editorDynamicUIContainer.text02 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  this.elementAType,
                  ["left", "bottom"],
                );
            }
            switch (this.elementAName) {
              default:
                editorDynamicUIContainer.elementA_properties =
                  editorDynamicUIContainer.panel.add(
                    "dropdownlist",
                    undefined,
                    [],
                  );
                editorDynamicUIContainer.elementA_properties.size = [95, 26];
                var propertiesObjects = getObjectProperties(
                  this.elementAType,
                  "object",
                  undefined,
                  this.elementAName,
                  this,
                );
                for (var i = 0; i < propertiesObjects.length; i += 1) {
                  if (propertiesObjects[i].objectType == "Number") {
                    editorDynamicUIContainer.elementA_properties.add(
                      "item",
                      propertiesObjects[i].UiName,
                    );
                  }
                }
                for (var i = 0; i < 5; i += 1) {
                  editorDynamicUIContainer.elementA_properties.add("item", "");
                }
                if (this.elementAProperty != "") {
                  editorDynamicUIContainer.elementA_properties.selection =
                    editorDynamicUIContainer.elementA_properties.find(
                      this.elementAProperty,
                    );
                  if (
                    editorDynamicUIContainer.elementA_properties.find(
                      this.elementAProperty,
                    ) == null
                  ) {
                    this.elementAProperty = "";
                  }
                }
                if (forLoopParents.length > 0) {
                  editorDynamicUIContainer.elementA_properties.visible = true;
                } else {
                  editorDynamicUIContainer.elementA_properties.visible = false;
                }
                editorDynamicUIContainer.elementA_properties.onChange =
                  function () {
                    if (this.selection.text != "") {
                      command.elementAProperty = this.selection.text;
                    } else {
                      this.selection = 0;
                      command.elementAProperty = this.selection.text;
                    }
                    refreshUi(refresh_list[0], refresh_list[1]);
                    generateUndoStep();
                  };
                break;
              case "custom":
                editorDynamicUIContainer.custom_value =
                  editorDynamicUIContainer.panel.add(
                    "edittext",
                    undefined,
                    undefined,
                  );
                editorDynamicUIContainer.custom_value.size = [40, 25];
                editorDynamicUIContainer.custom_value.text =
                  this.customIterations;
                editorDynamicUIContainer.custom_value.onChange = function () {
                  var isnum = /^\d+$/.test(this.text);
                  if (isnum) {
                    command.customIterations = this.text;
                  } else {
                    alert("only number can be used");
                    command.customIterations = 2;
                  }
                  generateUndoStep();
                };
                break;
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  command.elementAType = null;
                  command.elementAProperty = "";
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
                case "":
                case "custom":
                  command.elementAName = "custom";
                  command.elementAType = null;
                  command.elementAProperty = "";
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof SelectedCompItems) {
            editorDynamicUIContainer.precompsCheckBox =
              editorDynamicUIContainer.panel.add(
                "checkbox",
                undefined,
                "do this for all precomps",
              );
            editorDynamicUIContainer.precompsCheckBox.helpTip =
              "Run this loop automation on all the precomps inside the active Composition and also all the precomps inside the precomps infinitely";
            if (this.doPrecomps == true) {
              editorDynamicUIContainer.precompsCheckBox.value = true;
            }
            editorDynamicUIContainer.precompsCheckBox.onClick = function () {
              if (this.value == true) {
                command.doPrecomps = true;
              } else {
                command.doPrecomps = false;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof CustomCompItem) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (forLoopParents[i].type == "Item") {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  "Item",
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  break;
                case "":
                  command.elementAName = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
            editorDynamicUIContainer.precompsCheckBox =
              editorDynamicUIContainer.panel.add(
                "checkbox",
                undefined,
                "do this for all precomps",
              );
            editorDynamicUIContainer.precompsCheckBox.helpTip =
              "Run this loop automation on all the precomps inside the specified Composition and also all the precomps inside the precomps infinitely";
            if (this.doPrecomps == true) {
              editorDynamicUIContainer.precompsCheckBox.value = true;
            }
            editorDynamicUIContainer.precompsCheckBox.onClick = function () {
              if (this.value == true) {
                command.doPrecomps = true;
              } else {
                command.doPrecomps = false;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof LayerEffects) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (forLoopParents[i].type == "Layer") {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  "Layer",
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  break;
                case "":
                  command.elementAName = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof LayerProperties) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (forLoopParents[i].type == "Layer") {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  "Layer",
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  break;
                case "":
                  command.elementAName = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof EffectProperties) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (forLoopParents[i].type == "Effect") {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  "Effect",
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  break;
                case "":
                  command.elementAName = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof CustomProperty) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (
                forLoopParents[i].type == "Layer" ||
                forLoopParents[i].type == "Property/Effect"
              ) {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
                if (forLoopParents[i].name == this.elementAName) {
                  this.elementAType = forLoopParents[i].type;
                }
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
                for (var i = 0; i < forLoopParents.length; i += 1) {
                  if (forLoopParents[i].name == this.elementAName) {
                    this.elementAType = forLoopParents[i].type;
                    break;
                  }
                }
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  this.elementAType,
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA_properties =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA_properties.size = [95, 26];
            if (forLoopParents.length > 0) {
              editorDynamicUIContainer.elementA_properties.visible = true;
            } else {
              editorDynamicUIContainer.elementA_properties.visible = false;
            }
            var properties = getObjectProperties(
              this.elementAType,
              "properties",
              undefined,
            );
            for (var i = 0; i < properties.length; i += 1) {
              switch (properties[i]) {
                case "opacity":
                case "position x":
                case "position y":
                case "position z":
                case "anchor point x":
                case "anchor point y":
                case "anchor point z":
                case "scale":
                case "scale x":
                case "scale y":
                case "scale z":
                case "rotation":
                case "rotation x":
                case "rotation y":
                case "rotation z":
                case "orientation":
                case "orientation x":
                case "orientation y":
                case "orientation z":
                case "source text":
                case "font":
                case "camera zoom":
                case "time remap":
                case "this property":
                  editorDynamicUIContainer.elementA_properties.add(
                    "item",
                    properties[i],
                  );
                  break;
              }
            }
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.elementA_properties.add("item", "");
            }
            if (this.elementAProperty != "") {
              editorDynamicUIContainer.elementA_properties.selection =
                editorDynamicUIContainer.elementA_properties.find(
                  this.elementAProperty,
                );
              if (
                editorDynamicUIContainer.elementA_properties.find(
                  this.elementAProperty,
                ) == null
              ) {
                this.elementAProperty = "";
                this.elementAType = null;
              }
            }
            editorDynamicUIContainer.elementA_properties.onChange =
              function () {
                if (this.selection.text != "") {
                  command.elementAProperty = this.selection.text;
                } else {
                  this.selection = 0;
                  command.elementAProperty = this.selection.text;
                }
                refreshUi(refresh_list[0], refresh_list[1]);
                generateUndoStep();
              };
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  command.elementAProperty = "";
                  command.elementAType = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
                case "":
                  command.elementAName = null;
                  command.elementAProperty = "";
                  command.elementAType = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof MarkerProperty) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (
                forLoopParents[i].type == "Layer" ||
                forLoopParents[i].type == "Item"
              ) {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
                if (forLoopParents[i].name == this.elementAName) {
                  this.elementAType = forLoopParents[i].type;
                }
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
                for (var i = 0; i < forLoopParents.length; i += 1) {
                  if (forLoopParents[i].name == this.elementAName) {
                    this.elementAType = forLoopParents[i].type;
                    break;
                  }
                }
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  this.elementAType,
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  command.elementAType = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
                case "":
                  command.elementAName = null;
                  command.elementAType = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          if (this.iterationsType instanceof OutputModules) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (forLoopParents[i].type == "RQ Item") {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  "RQ Item",
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  break;
                case "":
                  command.elementAName = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  generateUndoStep();
                  break;
              }
            };
          }
          if (this.iterationsType instanceof BreakLoopIterationObject) {
            var forLoopParents = uiVariables.variables;
            editorDynamicUIContainer.elementA =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
            editorDynamicUIContainer.elementA.size = [65, 26];
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (forLoopParents[i].object instanceof ForLoop) {
                editorDynamicUIContainer.elementA.add(
                  "item",
                  forLoopParents[i].name,
                );
                if (forLoopParents[i].name == this.elementAName) {
                  this.elementAType = forLoopParents[i].type;
                }
              }
            }
            if (forLoopParents.length > 0) {
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementA.add("item", "");
              }
            }
            if (this.elementAName != null) {
              editorDynamicUIContainer.elementA.selection =
                editorDynamicUIContainer.elementA.find(this.elementAName);
              if (
                editorDynamicUIContainer.elementA.find(this.elementAName) ==
                null
              ) {
                this.elementAName = null;
                this.elementAType = null;
                this.elementAProperty = "";
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAType = forLoopParents[0].type;
                this.elementAName =
                  editorDynamicUIContainer.elementA.selection.text;
              }
            }
            if (editorDynamicUIContainer.elementA.selection != null) {
              editorDynamicUIContainer.text01 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  this.elementAType,
                  ["left", "bottom"],
                );
            }
            editorDynamicUIContainer.elementA.onChange = function () {
              switch (this.selection.text) {
                default:
                  command.elementAName = this.selection.text;
                  command.elementAType = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
                case "":
                  command.elementAName = null;
                  command.elementAType = null;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          if (!(this.iterationsType instanceof BreakLoopIterationObject)) {
            editorDynamicUIContainer.reverseCheckBox =
              editorDynamicUIContainer.panel.add(
                "checkbox",
                undefined,
                "reverse order",
              );
            editorDynamicUIContainer.reverseCheckBox.helpTip =
              "Reverse the order of the loop going from end to start";
            if (this.reverseOrder == true) {
              editorDynamicUIContainer.reverseCheckBox.value = true;
            }
            editorDynamicUIContainer.reverseCheckBox.onClick = function () {
              if (this.value == true) {
                command.reverseOrder = true;
              } else {
                command.reverseOrder = false;
              }
              generateUndoStep();
            };
          }
          editorDynamicUIContainer.functionType.onChange = function () {
            switch (this.selection.text) {
              case "items in the project":
                command.iterationsType = new ProjectItems();
                command.scope = [];
                command.scopeColor = undefined;
                command.doPrecomps = false;
                break;
              case "layers in the active comp":
                command.iterationsType = new SelectedCompItems();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "layers in other comp":
                command.iterationsType = new CustomCompItem();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "effects in the layer":
                command.iterationsType = new LayerEffects();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "properties in the effect":
                command.iterationsType = new EffectProperties();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "properties in the layer":
                command.iterationsType = new LayerProperties();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "keyframes in property":
                command.iterationsType = new CustomProperty();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "elements in the collection":
                command.iterationsType = new CollectionElements();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "markers in layer/item":
                command.iterationsType = new MarkerProperty();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "items in the render queue":
                command.iterationsType = new RenderQueueItems();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "output modules in render queue item":
                command.iterationsType = new OutputModules();
                command.scope = [];
                command.scopeColor = undefined;
                break;
              case "custom amount of times":
                command.iterationsType = new CustomIterations();
                command.scope = [];
                command.scopeColor = undefined;
                command.doPrecomps = false;
                break;
              case "stop loop":
                command.iterationsType = new BreakLoopIterationObject();
                command.scope = [];
                command.scopeColor = undefined;
                command.doPrecomps = false;
                break;
            }
            command.elementAName = null;
            command.elementAProperty = "";
            command.elementAType = null;
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          if (!(this.iterationsType instanceof BreakLoopIterationObject)) {
            editorDynamicUIContainer.add_btn =
              editorDynamicUIContainer.panel.add("button", undefined, "\u271a");
            editorDynamicUIContainer.add_btn.helpTip =
              "Add automation line inside this";
            editorDynamicUIContainer.add_btn.size = [20, 20];
            editorDynamicUIContainer.add_btn.onClick = function () {
              command.addToScope(new ForLoop(command));
              command.collapse = false;
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            };
          }
          editorDynamicUIContainer.del_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u2716",
          );
          editorDynamicUIContainer.del_btn.helpTip = "Delete";
          editorDynamicUIContainer.del_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn.fillBrush =
            editorDynamicUIContainer.del_btn.graphics.newBrush(
              editorDynamicUIContainer.del_btn.graphics.BrushType.SOLID_COLOR,
              buttonBackgroundColor,
            );
          editorDynamicUIContainer.del_btn.textPen =
            editorDynamicUIContainer.del_btn.graphics.newPen(
              editorDynamicUIContainer.del_btn.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              5,
            );
          editorDynamicUIContainer.del_btn.onDraw = getGlobalDrawFuncrion(
            0,
            0,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseover",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseout",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.info_btn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u24a4");
          editorDynamicUIContainer.info_btn.helpTip = "Info";
          editorDynamicUIContainer.info_btn.size = [20, 20];
          editorDynamicUIContainer.info_btn.onClick = function () {
            infoDlg(command.info);
          };
          editorDynamicUIContainer.del_btn.onClick = function () {
            if (command.scope && command.scope.length > 0) {
              var bool = confirm(
                "if you delete this node all his children will delete too,\nare you still want to delete?",
                false,
                "alert massage",
              );
            } else {
              var bool = true;
            }
            if (bool) {
              if (inArray(command, selectedLines)) {
                removeFromArray(command, selectedLines);
                for (var i = 0; i < selectedLines.length; i += 1) {
                  if (
                    inArray(selectedLines[i], selectedLines[i].parent.scope)
                  ) {
                    selectedLines[i].remove(selectedLines[i]);
                    if (selectedLines[i].parent.scope.length == 0) {
                      selectedLines[i].parent.scopeColor = undefined;
                    }
                  }
                }
                selectedLines = [];
              }
              if (command.scope.length > 0) {
                selectedLines = [];
              }
              command.remove(command);
              if (command.parent.scope.length == 0) {
                command.parent.scopeColor = undefined;
              }
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            }
          };
        }
        if (this.collapse == false) {
          if (this.scope && this.scope.length) {
            switch (this.iterationsType.name()) {
              case "custom amount of times":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Index",
                });
                break;
              case "items in the project":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Item",
                });
                break;
              case "layers in the active comp":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Layer",
                });
                break;
              case "effects in the layer":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Effect",
                });
                break;
              case "properties in the effect":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Property/Effect",
                });
                break;
              case "properties in the layer":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Property/Effect",
                });
                break;
              case "keyframes in property":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Property/Effect",
                });
                break;
              case "elements in the collection":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Collection",
                });
                break;
              case "markers in layer/item":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Marker",
                });
                break;
              case "items in the render queue":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "RQ Item",
                });
                break;
              case "output modules in render queue item":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Output-Module",
                });
                break;
              case "layers in other comp":
                uiVariables.variables.unshift({
                  name: this.elementName,
                  object: this,
                  type: "Layer",
                });
                break;
            }
            var variableLastArrayLength = uiVariables.variables.length;
            for (var i = 0; i < this.scope.length; i += 1) {
              this.scope[i].toUI(dest, refresh_list, indentation + 1);
            }
            uiVariables.variables.splice(
              uiVariables.variables.length - variableLastArrayLength,
              1,
            );
          }
        } else {
          function disablePanels(thisCommand) {
            if (thisCommand.scope && thisCommand.scope.length) {
              for (var i = 0; i < thisCommand.scope.length; i += 1) {
                thisCommand.scope[i].panel = null;
                if (thisCommand.scope[i].hasOwnProperty("scope")) {
                  disablePanels(thisCommand.scope[i]);
                }
              }
            }
          }
          this.createVariables();
          disablePanels(this);
        }
      };
      IfStatement.prototype.addToScope = function (item) {
        if (this.scope.length == 0) {
          this.scopeColor = [Math.random(), Math.random(), Math.random(), 1];
        }
        this.scope.push(item);
        item.mainColor = this.scopeColor;
      };
      IfStatement.prototype.addToScopePosition = function (
        item,
        positionIndex,
      ) {
        if (this.scope.length == 0) {
          this.scopeColor = [Math.random(), Math.random(), Math.random(), 1];
        }
        this.scope.splice(positionIndex, 0, item);
        item.mainColor = this.scopeColor;
      };
      IfStatement.prototype.createVariables = function () {
        if (this.scope && this.scope.length) {
          for (var i = 0; i < this.scope.length; i += 1) {
            if (
              this.scope[i] instanceof ForLoop ||
              this.scope[i] instanceof IfStatement ||
              this.scope[i] instanceof GlobalObject
            ) {
              this.scope[i].createVariables();
            }
          }
        }
      };
      IfStatement.prototype.run = function (
        a,
        b,
        c,
        reverseOrder,
        duplicatedLayersMemory,
      ) {
        if (this.enabled == true) {
          try {
            this.newObjectsArray = [];
            if (a == b) {
              this.firstTrueCycle = b;
            }
            if (
              this.elementAName != null &&
              this.elementAType != null &&
              this.elementAProperty != "" &&
              this.elementBName != null &&
              ((this.elementBProperty !== "" &&
                this.elementBName != "custom") ||
                this.elementBName == "custom") &&
              this.condition != ""
            ) {
              if (this.elementBName != "custom") {
                var valueB = globalEnv[this.elementBName].getPropertyValue(
                  this.elementBProperty,
                  duplicatedLayersMemory,
                );
              } else {
                var valueB = this.elementBProperty;
              }
              if (
                valueB instanceof LayerObject ||
                valueB instanceof ItemObject
              ) {
                valueB = valueB.object;
              }
              var valueA = globalEnv[this.elementAName].getPropertyValue(
                this.elementAProperty,
                duplicatedLayersMemory,
                valueB,
              );
              if (
                valueA instanceof LayerObject ||
                valueA instanceof ItemObject
              ) {
                valueA = valueA.object;
              }
              switch (this.condition) {
                case "=":
                  if (valueA == valueB) {
                    conditionValue = true;
                  } else {
                    conditionValue = false;
                  }
                  break;
                case "!=":
                  if (valueA != valueB) {
                    conditionValue = true;
                  } else {
                    conditionValue = false;
                  }
                  break;
                case "<":
                  if (valueA < valueB) {
                    conditionValue = true;
                  } else {
                    conditionValue = false;
                  }
                  break;
                case ">":
                  if (valueA > valueB) {
                    conditionValue = true;
                  } else {
                    conditionValue = false;
                  }
                  break;
                case "<=":
                  if (valueA <= valueB) {
                    conditionValue = true;
                  } else {
                    conditionValue = false;
                  }
                  break;
                case ">=":
                  if (valueA >= valueB) {
                    conditionValue = true;
                  } else {
                    conditionValue = false;
                  }
                  break;
              }
              if (conditionValue == true) {
                for (var j = 0; j < this.scope.length; j += 1) {
                  if (
                    duplicatedLayersMemory != undefined &&
                    duplicatedLayersMemory.breakLoop
                  ) {
                    break;
                  }
                  var result = this.scope[j].run(
                    a,
                    this.firstTrueCycle,
                    c,
                    reverseOrder,
                    duplicatedLayersMemory,
                  );
                  if (result && result != undefined && result != null) {
                    this.returnI = true;
                    this.newObjectsArray.push(result);
                  }
                }
                if (this.returnI) {
                  return this.newObjectsArray;
                }
              } else {
                if (reverseOrder) {
                  this.firstTrueCycle--;
                } else {
                  this.firstTrueCycle++;
                }
              }
            }
          } catch (err) {}
        }
      };
      IfStatement.prototype.toUI = function (dest, refresh_list, indentation) {
        var testString = "\u271a";
        linesCounter++;
        editorDynamicUIContainer.mainGroup = dest.add(
          "group",
          undefined,
          undefined,
        );
        editorDynamicUIContainer.mainGroup.alignment = ["center", "top"];
        editorDynamicUIContainer.mainGroup.orientation = "row";
        editorDynamicUIContainer.mainGroup.minimumSize = [2000, 40];
        editorDynamicUIContainer.mainGroup.maximumSize = [
          editorDynamicUIContainer.mainGroup.minimumSize[0],
          editorDynamicUIContainer.mainGroup.minimumSize[1],
        ];
        editorDynamicUIContainer.mainGroup.margins = [0, 0, 0, 0];
        editorDynamicUIContainer.mainGroup.spacing = 0;
        editorDynamicUIContainer.indentationGroup =
          editorDynamicUIContainer.mainGroup.add("group", undefined, undefined);
        editorDynamicUIContainer.panel = editorDynamicUIContainer.mainGroup.add(
          "panel",
          undefined,
          undefined,
        );
        this.panel = editorDynamicUIContainer.panel;
        var command = this;
        if (isVisible(command)) {
          newUiCodeLine(
            command,
            "if",
            editorDynamicUIContainer.panel,
            editorDynamicUIContainer.indentationGroup,
            indentation,
            refresh_list,
          );
          var forLoopParents = uiVariables.variables;
          editorDynamicUIContainer.elementA =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
          editorDynamicUIContainer.elementA.size = [65, 26];
          for (var i = 0; i < forLoopParents.length; i += 1) {
            editorDynamicUIContainer.elementA.add(
              "item",
              forLoopParents[i].name,
            );
            if (forLoopParents[i].name == this.elementAName) {
              this.elementAType = forLoopParents[i].type;
            }
          }
          if (forLoopParents.length > 0) {
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.elementA.add("item", "");
            }
          }
          if (this.elementAName != null) {
            editorDynamicUIContainer.elementA.selection =
              editorDynamicUIContainer.elementA.find(this.elementAName);
            if (
              editorDynamicUIContainer.elementA.find(this.elementAName) == null
            ) {
              this.elementAName = null;
              this.elementAProperty = "";
              this.elementBProperty = "";
              this.elementAType = null;
              this.elementAPropertyType = "";
              this.elementBName = null;
              this.elementBType = null;
              this.condition = "";
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAType = forLoopParents[0].type;
                this.elementAName = forLoopParents[0].name;
              }
            }
          } else {
            if (forLoopParents && forLoopParents.length) {
              editorDynamicUIContainer.elementA.selection = 0;
              this.elementAType = forLoopParents[0].type;
              this.elementAName = forLoopParents[0].name;
            }
          }
          if (editorDynamicUIContainer.elementA.selection != null) {
            editorDynamicUIContainer.text01 =
              editorDynamicUIContainer.panel.add(
                "statictext",
                undefined,
                this.elementAType,
                ["left", "bottom"],
              );
          }
          var ifStatement = this;
          editorDynamicUIContainer.elementA_properties =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
          editorDynamicUIContainer.elementA_properties.size = [95, 26];
          editorDynamicUIContainer.elementA_properties_Btn =
            editorDynamicUIContainer.panel.add("button", undefined, "(...)");
          editorDynamicUIContainer.elementA_properties_Btn.size = [20, 20];
          editorDynamicUIContainer.elementA_properties_Btn.onClick =
            function () {
              var selectedProperty = buildPropertySelectionUI(
                ifStatement.elementAType,
                "properties",
                undefined,
                ifStatement.elementAName,
                ifStatement,
              );
              if (selectedProperty != "") {
                editorDynamicUIContainer.elementA_properties.selection =
                  editorDynamicUIContainer.elementA_properties.find(
                    selectedProperty,
                  );
                generateUndoStep();
              }
            };
          switch (this.elementAPropertyType) {
            case "":
            case "Boolean":
            case "Text":
            case "Folder":
            case "Layer":
            case "Item":
            case "Array":
              editorDynamicUIContainer.conditionElement =
                editorDynamicUIContainer.panel.add(
                  "dropdownlist",
                  undefined,
                  this.conditionsOptions.bool,
                );
              break;
            case "Number":
              editorDynamicUIContainer.conditionElement =
                editorDynamicUIContainer.panel.add(
                  "dropdownlist",
                  undefined,
                  this.conditionsOptions.math,
                );
              break;
          }
          if (forLoopParents.length > 0) {
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.conditionElement.add("item", "");
            }
            editorDynamicUIContainer.elementA_properties.visible = true;
            editorDynamicUIContainer.elementA_properties_Btn.visible = true;
          } else {
            editorDynamicUIContainer.elementA_properties.visible = false;
            editorDynamicUIContainer.elementA_properties_Btn.visible = false;
          }
          if (this.condition != "") {
            editorDynamicUIContainer.conditionElement.selection =
              editorDynamicUIContainer.conditionElement.find(this.condition);
            if (
              editorDynamicUIContainer.conditionElement.find(this.condition) ==
              null
            ) {
              this.condition = "";
            }
          }
          editorDynamicUIContainer.conditionElement.onChange = function () {
            if (this.selection.text != "") {
              ifStatement.condition = this.selection.text;
              generateUndoStep();
            } else {
              this.selection = this.find(ifStatement.condition);
            }
          };
          var properties = getObjectProperties(
            this.elementAType,
            "properties",
            undefined,
            this.elementAName,
            this,
          );
          for (var i = 0; i < properties.length; i += 1) {
            editorDynamicUIContainer.elementA_properties.add(
              "item",
              properties[i],
            );
          }
          for (var i = 0; i < 5; i += 1) {
            editorDynamicUIContainer.elementA_properties.add("item", "");
          }
          if (this.elementAProperty != "") {
            editorDynamicUIContainer.elementA_properties.selection =
              editorDynamicUIContainer.elementA_properties.find(
                this.elementAProperty,
              );
            if (
              editorDynamicUIContainer.elementA_properties.find(
                this.elementAProperty,
              ) == null
            ) {
              this.elementAProperty = "";
              this.elementAPropertyType = "";
              this.elementBProperty = "";
              this.elementBName = null;
              this.elementBType = null;
              this.condition = "";
            }
          }
          editorDynamicUIContainer.elementB =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, [
              "custom",
            ]);
          editorDynamicUIContainer.elementB.size = [65, 26];
          if (this.elementAProperty == "") {
            editorDynamicUIContainer.conditionElement.visible = false;
            editorDynamicUIContainer.elementB.visible = false;
          }
          for (var i = 0; i < forLoopParents.length; i += 1) {
            editorDynamicUIContainer.elementB.add(
              "item",
              forLoopParents[i].name,
            );
            if (forLoopParents[i].name == this.elementBName) {
              this.elementBType = forLoopParents[i].type;
            }
          }
          for (var i = 0; i < 5; i += 1) {
            editorDynamicUIContainer.elementB.add("item", "");
          }
          if (this.elementBName != null) {
            editorDynamicUIContainer.elementB.selection =
              editorDynamicUIContainer.elementB.find(this.elementBName);
            if (
              editorDynamicUIContainer.elementB.find(this.elementBName) == null
            ) {
              this.elementBName = null;
              this.elementBType = null;
              this.elementBProperty = "";
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementB.selection = 0;
                this.elementBName = "custom";
                this.elementBType = forLoopParents[0].type;
              }
            }
          } else {
            if (forLoopParents && forLoopParents.length) {
              editorDynamicUIContainer.elementB.selection = 0;
              this.elementBName = "custom";
              this.elementBType = forLoopParents[0].type;
            }
          }
          if (
            editorDynamicUIContainer.elementB.selection != null &&
            this.elementBName != "custom" &&
            this.elementBName != null
          ) {
            editorDynamicUIContainer.text02 =
              editorDynamicUIContainer.panel.add(
                "statictext",
                undefined,
                this.elementBType,
                ["left", "bottom"],
              );
          }
          switch (this.elementBName) {
            default:
              editorDynamicUIContainer.elementB_properties =
                editorDynamicUIContainer.panel.add(
                  "dropdownlist",
                  undefined,
                  [],
                );
              editorDynamicUIContainer.elementB_properties.size = [95, 26];
              var propertiesObjects = getObjectProperties(
                this.elementBType,
                "object",
                undefined,
                this.elementBName,
                this,
              );
              for (var i = 0; i < propertiesObjects.length; i += 1) {
                if (
                  propertiesObjects[i].objectType ==
                    this.elementAPropertyType ||
                  (propertiesObjects[i].objectType == "Text" &&
                    this.elementAPropertyType == "Number") ||
                  (propertiesObjects[i].objectType == "Number" &&
                    this.elementAPropertyType == "Text")
                ) {
                  editorDynamicUIContainer.elementB_properties.add(
                    "item",
                    propertiesObjects[i].UiName,
                  );
                }
              }
              for (var i = 0; i < 5; i += 1) {
                editorDynamicUIContainer.elementB_properties.add("item", "");
              }
              if (this.elementBProperty != "") {
                editorDynamicUIContainer.elementB_properties.selection =
                  editorDynamicUIContainer.elementB_properties.find(
                    this.elementBProperty,
                  );
                if (
                  editorDynamicUIContainer.elementB_properties.find(
                    this.elementBProperty,
                  ) == null
                ) {
                  this.elementBProperty = "";
                }
              }
              var elementB_properties_Btn = editorDynamicUIContainer.panel.add(
                "button",
                undefined,
                "(...)",
              );
              elementB_properties_Btn.size = [20, 20];
              elementB_properties_Btn.onClick = function () {
                var selectedProperty = buildPropertySelectionUI(
                  ifStatement.elementBType,
                  "object",
                  ifStatement.elementAPropertyType,
                  ifStatement.elementBName,
                  ifStatement,
                );
                if (selectedProperty != "") {
                  editorDynamicUIContainer.elementB_properties.selection =
                    editorDynamicUIContainer.elementB_properties.find(
                      selectedProperty,
                    );
                  generateUndoStep();
                }
              };
              if (forLoopParents.length > 0) {
                editorDynamicUIContainer.elementB_properties.visible = true;
              } else {
                editorDynamicUIContainer.elementB_properties.visible = false;
              }
              editorDynamicUIContainer.elementB_properties.onChange =
                function () {
                  if (this.selection.text != "") {
                    ifStatement.elementBProperty = this.selection.text;
                  } else {
                    this.selection = 0;
                    ifStatement.elementBProperty = this.selection.text;
                  }
                  refreshUi(refresh_list[0], refresh_list[1]);
                  generateUndoStep();
                };
              break;
            case "custom":
              switch (this.elementAPropertyType) {
                case "Number":
                  editorDynamicUIContainer.custom_value =
                    editorDynamicUIContainer.panel.add(
                      "edittext",
                      undefined,
                      undefined,
                    );
                  editorDynamicUIContainer.custom_value.size = [100, 26];
                  editorDynamicUIContainer.custom_value.text =
                    this.elementBProperty;
                  editorDynamicUIContainer.custom_value.onChange = function () {
                    if (
                      this.text.match(/^\d+\.\d+$/) ||
                      this.text.match(/^-{0,1}\d+$/)
                    ) {
                      ifStatement.elementBProperty = this.text;
                      generateUndoStep();
                    } else {
                      alert("Only numbers are allowed");
                      this.text = ifStatement.elementBProperty;
                    }
                  };
                  break;
                case "Text":
                  editorDynamicUIContainer.custom_value =
                    editorDynamicUIContainer.panel.add(
                      "edittext",
                      undefined,
                      undefined,
                    );
                  editorDynamicUIContainer.custom_value.size = [100, 26];
                  editorDynamicUIContainer.custom_value.text =
                    this.elementBProperty;
                  editorDynamicUIContainer.custom_value.onChange = function () {
                    ifStatement.elementBProperty = this.text;
                    generateUndoStep();
                  };
                  editorDynamicUIContainer.custom_valueMore =
                    editorDynamicUIContainer.panel.add(
                      "button",
                      undefined,
                      "\ufe34",
                    );
                  editorDynamicUIContainer.custom_valueMore.size = [7, 24];
                  editorDynamicUIContainer.custom_valueMore.helpTip =
                    "click this for editing the text";
                  editorDynamicUIContainer.custom_valueMore.onClick =
                    function () {
                      var dialog = new Window("dialog");
                      dialog.text = "Dialog";
                      dialog.preferredSize.height = 214;
                      dialog.orientation = "column";
                      dialog.alignChildren = ["center", "top"];
                      dialog.spacing = 10;
                      dialog.margins = 16;
                      var statictext1 = dialog.add(
                        "statictext",
                        undefined,
                        undefined,
                        { name: "statictext1" },
                      );
                      statictext1.text = "Text:";
                      var edittext1 = dialog.add(
                        'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
                      );
                      edittext1.text = ifStatement.elementBProperty;
                      edittext1.preferredSize.width = 362;
                      edittext1.preferredSize.height = 117;
                      var group1 = dialog.add("group", undefined, {
                        name: "group1",
                      });
                      group1.orientation = "row";
                      group1.alignChildren = ["left", "center"];
                      group1.spacing = 10;
                      group1.margins = 0;
                      var button1 = group1.add("button", undefined, undefined, {
                        name: "button1",
                      });
                      button1.text = "Ok";
                      button1.preferredSize.width = 55;
                      button1.preferredSize.height = 27;
                      button1.onClick = function () {
                        ifStatement.elementBProperty = edittext1.text;
                        generateUndoStep();
                        dialog.close();
                        refreshUi(refresh_list[0], refresh_list[1]);
                      };
                      var button2 = group1.add("button", undefined, undefined, {
                        name: "button2",
                      });
                      button2.text = "Cancel";
                      button2.preferredSize.width = 55;
                      button2.preferredSize.height = 27;
                      dialog.show();
                      dialog = null;
                      statictext1 = null;
                      edittext1 = null;
                      group1 = null;
                      button1 = null;
                      button2 = null;
                    };
                  break;
                case "Array":
                  editorDynamicUIContainer.custom_value =
                    editorDynamicUIContainer.panel.add(
                      "dropdownlist",
                      undefined,
                      getObjectProperties(
                        this.elementAType,
                        "propertyOptions",
                        this.elementAProperty,
                        this.elementAName,
                        this,
                      ),
                    );
                  editorDynamicUIContainer.custom_value.size = [100, 26];
                  if (this.elementBProperty != "") {
                    editorDynamicUIContainer.custom_value.selection =
                      editorDynamicUIContainer.custom_value.find(
                        this.elementBProperty,
                      );
                    if (
                      editorDynamicUIContainer.custom_value.find(
                        this.elementBProperty,
                      ) == null
                    ) {
                      this.elementBProperty = "";
                    }
                  }
                  editorDynamicUIContainer.custom_value.onChange = function () {
                    switch (this.selection.text) {
                      default:
                        ifStatement.elementBProperty = this.selection.text;
                        generateUndoStep();
                        break;
                      case "":
                        this.selection = this.find(
                          ifStatement.elementBProperty,
                        );
                        break;
                    }
                  };
                  break;
                case "Layer":
                  editorDynamicUIContainer.custom_value =
                    editorDynamicUIContainer.panel.add(
                      "dropdownlist",
                      undefined,
                      ["null", "", "", ""],
                    );
                  editorDynamicUIContainer.custom_value.size = [100, 26];
                  if (
                    this.elementBProperty != "" &&
                    this.elementBProperty == null
                  ) {
                    editorDynamicUIContainer.custom_value.selection =
                      editorDynamicUIContainer.custom_value.find("null");
                  }
                  editorDynamicUIContainer.custom_value.onChange = function () {
                    switch (this.selection.text) {
                      case "null":
                        ifStatement.elementBProperty = null;
                        break;
                      case "":
                        this.selection = this.find("null");
                        break;
                    }
                  };
                  break;
                case "Item":
                  break;
                case "Boolean":
                  editorDynamicUIContainer.custom_value =
                    editorDynamicUIContainer.panel.add(
                      "dropdownlist",
                      undefined,
                      ["true", "false"],
                    );
                  editorDynamicUIContainer.custom_value.size = [100, 26];
                  if (this.elementBProperty !== "") {
                    if (this.elementBProperty === 1) {
                      editorDynamicUIContainer.custom_value.selection =
                        editorDynamicUIContainer.custom_value.find("true");
                    }
                    if (this.elementBProperty === 0) {
                      editorDynamicUIContainer.custom_value.selection =
                        editorDynamicUIContainer.custom_value.find("false");
                    }
                  }
                  editorDynamicUIContainer.custom_value.onChange = function () {
                    switch (this.selection.text) {
                      case "true":
                        ifStatement.elementBProperty = 1;
                        generateUndoStep();
                        break;
                      case "false":
                        ifStatement.elementBProperty = 0;
                        generateUndoStep();
                        break;
                      case "":
                        switch (ifStatement.elementBProperty) {
                          case 1:
                            this.selection = this.find("true");
                            break;
                          case 0:
                            this.selection = this.find("false");
                            break;
                        }
                        break;
                    }
                  };
                  break;
              }
              break;
          }
          editorDynamicUIContainer.elementA_properties.onChange = function () {
            if (this.selection.text != "") {
              ifStatement.elementAProperty = this.selection.text;
              ifStatement.elementBProperty = "";
              ifStatement.condition = "";
              editorDynamicUIContainer.conditionElement.selection = null;
              editorDynamicUIContainer.conditionElement.visible = true;
              editorDynamicUIContainer.elementB.visible = true;
            } else {
              this.selection = 0;
              ifStatement.elementAProperty = this.selection.text;
              ifStatement.condition = "";
              ifStatement.elementBProperty = "";
              editorDynamicUIContainer.conditionElement.selection = null;
              editorDynamicUIContainer.conditionElement.visible = true;
              editorDynamicUIContainer.elementB.visible = true;
            }
            ifStatement.elementAPropertyType = getObjectProperties(
              ifStatement.elementAType,
              "propertyType",
              this.selection.text,
              ifStatement.elementAName,
              ifStatement,
            );
            editorDynamicUIContainer.conditionElement.removeAll();
            switch (ifStatement.elementAPropertyType) {
              case "Number":
                for (
                  var i = 0;
                  i < ifStatement.conditionsOptions.math.length;
                  i += 1
                ) {
                  editorDynamicUIContainer.conditionElement.add(
                    "item",
                    ifStatement.conditionsOptions.math[i],
                  );
                }
                for (var i = 0; i < 5; i += 1) {
                  editorDynamicUIContainer.conditionElement.add("item", "");
                }
                break;
              case "Text":
              case "Array":
              case "Boolean":
              case "Layer":
              case "Item":
                for (
                  var i = 0;
                  i < ifStatement.conditionsOptions.bool.length;
                  i += 1
                ) {
                  editorDynamicUIContainer.conditionElement.add(
                    "item",
                    ifStatement.conditionsOptions.bool[i],
                  );
                }
                for (var i = 0; i < 5; i += 1) {
                  editorDynamicUIContainer.conditionElement.add("item", "");
                }
                break;
            }
            ifStatement.condition =
              editorDynamicUIContainer.conditionElement.items[0].text;
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.elementA.onChange = function () {
            switch (this.selection.text) {
              default:
                ifStatement.elementAName = this.selection.text;
                ifStatement.elementAProperty = "";
                ifStatement.elementBProperty = "";
                ifStatement.elementAType = null;
                ifStatement.elementAPropertyType = "";
                ifStatement.elementBName = null;
                ifStatement.elementBType = null;
                ifStatement.condition = "";
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
              case "":
                ifStatement.elementAName = this.items[0].text;
                ifStatement.elementAProperty = "";
                ifStatement.elementBProperty = "";
                ifStatement.elementAType = null;
                ifStatement.elementAPropertyType = "";
                ifStatement.elementBName = null;
                ifStatement.elementBType = null;
                ifStatement.condition = "";
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
            }
            generateUndoStep();
          };
          editorDynamicUIContainer.elementB.onChange = function () {
            switch (this.selection.text) {
              default:
                ifStatement.elementBName = this.selection.text;
                ifStatement.elementBType = null;
                ifStatement.elementBProperty = "";
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
              case "":
              case "custom":
                ifStatement.elementBName = "custom";
                ifStatement.elementBType = null;
                ifStatement.elementBProperty = "";
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
            }
            generateUndoStep();
          };
          editorDynamicUIContainer.add_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u271a",
          );
          editorDynamicUIContainer.add_btn.helpTip =
            "Add automation line inside this";
          editorDynamicUIContainer.add_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u2716",
          );
          editorDynamicUIContainer.del_btn.helpTip = "Delete";
          editorDynamicUIContainer.del_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn.fillBrush =
            editorDynamicUIContainer.del_btn.graphics.newBrush(
              editorDynamicUIContainer.del_btn.graphics.BrushType.SOLID_COLOR,
              buttonBackgroundColor,
            );
          editorDynamicUIContainer.del_btn.textPen =
            editorDynamicUIContainer.del_btn.graphics.newPen(
              editorDynamicUIContainer.del_btn.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              5,
            );
          editorDynamicUIContainer.del_btn.onDraw = getGlobalDrawFuncrion(
            0,
            0,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseover",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseout",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.info_btn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u24a4");
          editorDynamicUIContainer.info_btn.helpTip = "Info";
          editorDynamicUIContainer.info_btn.size = [20, 20];
          editorDynamicUIContainer.info_btn.onClick = function () {
            infoDlg(command.info);
          };
          editorDynamicUIContainer.add_btn.onClick = function () {
            command.addToScope(new ForLoop(command));
            command.collapse = false;
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn.onClick = function () {
            if (command.scope && command.scope.length > 0) {
              var bool = confirm(
                "if you delete this node all his children will delete too,\nare you still want to delete?",
                false,
                "alert massage",
              );
            } else {
              var bool = true;
            }
            if (bool) {
              if (inArray(command, selectedLines)) {
                removeFromArray(command, selectedLines);
                for (var i = 0; i < selectedLines.length; i += 1) {
                  if (
                    inArray(selectedLines[i], selectedLines[i].parent.scope)
                  ) {
                    selectedLines[i].remove(selectedLines[i]);
                    if (selectedLines[i].parent.scope.length == 0) {
                      selectedLines[i].parent.scopeColor = undefined;
                    }
                  }
                }
                selectedLines = [];
              }
              if (command.scope.length > 0) {
                selectedLines = [];
              }
              command.remove(command);
              if (command.parent.scope.length == 0) {
                command.parent.scopeColor = undefined;
              }
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            }
          };
        }
        if (this.collapse == false) {
          if (this.scope && this.scope.length) {
            for (var i = 0; i < this.scope.length; i += 1) {
              this.scope[i].toUI(dest, refresh_list, indentation + 1);
            }
          }
        } else {
          function disablePanels(thisCommand) {
            if (thisCommand.scope && thisCommand.scope.length) {
              for (var i = 0; i < thisCommand.scope.length; i += 1) {
                thisCommand.scope[i].panel = null;
                if (thisCommand.scope[i].hasOwnProperty("scope")) {
                  disablePanels(thisCommand.scope[i]);
                }
              }
            }
          }
          this.createVariables();
          disablePanels(this);
        }
      };
      SetObject.prototype.checkSetItems = function () {
        for (var i = 0; i < this.setItems.length; i += 1) {
          if (
            this.setItems[i].type == "" ||
            this.setItems[i].type == null ||
            this.setItems[i].manipulator == "" ||
            (this.setItems[i].property === "" &&
              this.setItems[i].type != "custom")
          ) {
            return false;
          }
        }
        return true;
      };
      SetObject.prototype.getSetItemsValues = function (
        duplicatedLayersMemory,
      ) {
        function makeCalculation(str, arr) {
          var tempAr = arr;
          for (var i = 0; i < tempAr.length - 1; i += 1) {
            switch (str) {
              case "*/":
                switch (tempAr[i].manipulator) {
                  case " * ":
                    tempAr[i].value = tempAr[i].value * tempAr[i + 1].value;
                    tempAr[i].manipulator = tempAr[i + 1].manipulator;
                    tempAr.splice(i + 1, 1);
                    return true;
                    break;
                  case " / ":
                    tempAr[i].value = tempAr[i].value / tempAr[i + 1].value;
                    tempAr[i].manipulator = tempAr[i + 1].manipulator;
                    tempAr.splice(i + 1, 1);
                    return true;
                    break;
                  case "%":
                    tempAr[i].value = tempAr[i].value % tempAr[i + 1].value;
                    tempAr[i].manipulator = tempAr[i + 1].manipulator;
                    tempAr.splice(i + 1, 1);
                    return true;
                    break;
                }
                break;
              case "+-":
                switch (arr[i].manipulator) {
                  case " + ":
                    tempAr[i].value = tempAr[i].value + tempAr[i + 1].value;
                    tempAr[i].manipulator = tempAr[i + 1].manipulator;
                    tempAr.splice(i + 1, 1);
                    return true;
                    break;
                  case " - ":
                    tempAr[i].value = tempAr[i].value - tempAr[i + 1].value;
                    tempAr[i].manipulator = tempAr[i + 1].manipulator;
                    tempAr.splice(i + 1, 1);
                    return true;
                    break;
                }
                break;
            }
          }
        }
        function makeCalculationExponentiation(str, arr) {
          var tempAr = arr;
          var tempArLengthABC = tempAr.length;
          for (var i = tempArLengthABC - 1; i > 0; i--) {
            switch (str) {
              case "^exponentiation":
                switch (tempAr[i - 1].manipulator) {
                  case " ^ ":
                    tempAr[i - 1].value = Math.pow(
                      tempAr[i - 1].value,
                      tempAr[i].value,
                    );
                    tempAr[i - 1].manipulator = tempAr[i].manipulator;
                    tempAr.splice(i, 1);
                    return true;
                    break;
                }
                break;
            }
          }
        }
        var setItemsArr = [];
        for (var i = 0; i < this.setItems.length; i += 1) {
          if (this.setItems[i].type != "custom") {
            setItemsArr.push({
              manipulator: this.setItems[i].manipulator,
              value: globalEnv[this.setItems[i].type].getPropertyValue(
                this.setItems[i].property,
                duplicatedLayersMemory,
              ),
            });
          } else {
            setItemsArr.push({
              manipulator: this.setItems[i].manipulator,
              value: this.setItems[i].property,
            });
          }
        }
        switch (this.elementAPropertyType) {
          case "Number":
            for (var i = 0; i < setItemsArr.length; i += 1) {
              setItemsArr[i].value = parseFloat(setItemsArr[i].value);
            }
            break;
        }
        if (this.setItems.length > 1) {
          var status = true;
          while (status) {
            var status = makeCalculationExponentiation(
              "^exponentiation",
              setItemsArr,
            );
          }
          var status = true;
          while (status) {
            var status = makeCalculation("*/", setItemsArr);
          }
          status = true;
          while (status) {
            var status = makeCalculation("+-", setItemsArr);
          }
        }
        return setItemsArr[0].value;
      };
      SetObject.prototype.run = function (
        a,
        b,
        c,
        reverseOrder,
        duplicatedLayersMemory,
      ) {
        if (this.enabled == true) {
          if (this.parent instanceof GlobalScope) {
            a = 0;
            b = 0;
            c = 10;
            reverseOrder = false;
          }
          if (
            this.elementAName != null &&
            this.elementAType != null &&
            this.elementAProperty != "" &&
            this.checkSetItems()
          ) {
            var valueB = this.getSetItemsValues(duplicatedLayersMemory);
            try {
              var result = globalEnv[this.elementAName].setPropertyValue(
                this.elementAProperty,
                valueB,
                this.elementAName,
                reverseOrder,
              );
              if (!(this.parent instanceof GlobalScope)) {
                return result;
              }
            } catch (err) {}
          }
        }
      };
      SetObject.prototype.toUI = function (dest, refresh_list, indentation) {
        var testString = "\u271a";
        linesCounter++;
        editorDynamicUIContainer.mainGroup = dest.add(
          "group",
          undefined,
          undefined,
        );
        editorDynamicUIContainer.mainGroup.alignment = ["center", "top"];
        editorDynamicUIContainer.mainGroup.orientation = "row";
        editorDynamicUIContainer.mainGroup.minimumSize = [2000, 40];
        editorDynamicUIContainer.mainGroup.maximumSize = [
          editorDynamicUIContainer.mainGroup.minimumSize[0],
          editorDynamicUIContainer.mainGroup.minimumSize[1],
        ];
        editorDynamicUIContainer.mainGroup.margins = [0, 0, 0, 0];
        editorDynamicUIContainer.mainGroup.spacing = 0;
        editorDynamicUIContainer.indentationGroup =
          editorDynamicUIContainer.mainGroup.add("group", undefined, undefined);
        editorDynamicUIContainer.panel = editorDynamicUIContainer.mainGroup.add(
          "panel",
          undefined,
          undefined,
        );
        this.panel = editorDynamicUIContainer.panel;
        var command = this;
        if (isVisible(command)) {
          newUiCodeLine(
            command,
            "set",
            editorDynamicUIContainer.panel,
            editorDynamicUIContainer.indentationGroup,
            indentation,
            refresh_list,
          );
          var forLoopParents = uiVariables.variables;
          editorDynamicUIContainer.elementA =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
          editorDynamicUIContainer.elementA.size = [65, 26];
          for (var i = 0; i < forLoopParents.length; i += 1) {
            editorDynamicUIContainer.elementA.add(
              "item",
              forLoopParents[i].name,
            );
            if (forLoopParents[i].name == this.elementAName) {
              this.elementAType = forLoopParents[i].type;
            }
          }
          if (forLoopParents.length > 0) {
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.elementA.add("item", "");
            }
          }
          if (this.elementAName != null) {
            editorDynamicUIContainer.elementA.selection =
              editorDynamicUIContainer.elementA.find(this.elementAName);
            if (
              editorDynamicUIContainer.elementA.find(this.elementAName) == null
            ) {
              this.elementAName = null;
              this.elementAProperty = "";
              this.elementAType = null;
              this.elementAPropertyType = "";
              this.setItems = [];
              this.setItems.push(new SetItem(this));
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAType = forLoopParents[0].type;
                this.elementAName = forLoopParents[0].name;
              }
            } else {
              if (
                this.elementAType != null &&
                this.elementAName != null &&
                this.elementAPropertyType != ""
              ) {
                var tempProperty = this.elementAPropertyType;
                this.elementAPropertyType = getObjectProperties(
                  this.elementAType,
                  "propertyType",
                  this.elementAProperty,
                  this.elementAName,
                  this,
                );
                if (tempProperty != this.elementAPropertyType) {
                  this.setItems = [];
                  this.setItems.push(new SetItem(this));
                }
              }
            }
          } else {
            if (forLoopParents && forLoopParents.length) {
              editorDynamicUIContainer.elementA.selection = 0;
              this.elementAType = forLoopParents[0].type;
              this.elementAName = forLoopParents[0].name;
            }
          }
          if (editorDynamicUIContainer.elementA.selection != null) {
            editorDynamicUIContainer.text01 =
              editorDynamicUIContainer.panel.add(
                "statictext",
                undefined,
                this.elementAType,
                ["left", "bottom"],
              );
          }
          var setObject = this;
          editorDynamicUIContainer.elementA_properties =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
          editorDynamicUIContainer.elementA_properties.size = [95, 26];
          editorDynamicUIContainer.elementA_properties_Btn =
            editorDynamicUIContainer.panel.add("button", undefined, "(...)");
          editorDynamicUIContainer.elementA_properties_Btn.size = [20, 20];
          editorDynamicUIContainer.elementA_properties_Btn.onClick =
            function () {
              var selectedProperty = buildPropertySelectionUI(
                setObject.elementAType,
                "writeProperties",
                undefined,
                setObject.elementAName,
                setObject,
              );
              if (selectedProperty != "") {
                editorDynamicUIContainer.elementA_properties.selection =
                  editorDynamicUIContainer.elementA_properties.find(
                    selectedProperty,
                  );
                generateUndoStep();
              }
            };
          if (forLoopParents.length > 0) {
            editorDynamicUIContainer.elementA_properties.visible = true;
          } else {
            editorDynamicUIContainer.elementA_properties.visible = false;
          }
          var properties = getObjectProperties(
            this.elementAType,
            "writeProperties",
            undefined,
            this.elementAName,
            this,
          );
          for (var i = 0; i < properties.length; i += 1) {
            editorDynamicUIContainer.elementA_properties.add(
              "item",
              properties[i],
            );
          }
          for (var i = 0; i < 5; i += 1) {
            editorDynamicUIContainer.elementA_properties.add("item", "");
          }
          if (this.elementAProperty != "") {
            editorDynamicUIContainer.elementA_properties.selection =
              editorDynamicUIContainer.elementA_properties.find(
                this.elementAProperty,
              );
            if (
              editorDynamicUIContainer.elementA_properties.find(
                this.elementAProperty,
              ) == null
            ) {
              this.elementAProperty = "";
              this.elementAPropertyType = "";
              this.setItems = [];
              this.setItems.push(new SetItem(this));
            }
          }
          editorDynamicUIContainer.text03 = editorDynamicUIContainer.panel.add(
            "statictext",
            undefined,
            " == ",
            ["left", "bottom"],
          );
          editorDynamicUIContainer.elementA_properties.onChange = function () {
            if (this.selection.text != "") {
              setObject.elementAProperty = this.selection.text;
            } else {
              this.selection = 0;
              setObject.elementAProperty = this.selection.text;
            }
            var tempProperty = setObject.elementAPropertyType;
            setObject.elementAPropertyType = getObjectProperties(
              setObject.elementAType,
              "propertyType",
              this.selection.text,
              setObject.elementAName,
              setObject,
            );
            if (tempProperty != setObject.elementAPropertyType) {
              setObject.setItems = [];
              setObject.setItems.push(new SetItem(setObject));
            }
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.elementA.onChange = function () {
            switch (this.selection.text) {
              default:
                setObject.elementAName = this.selection.text;
                setObject.elementAProperty = "";
                setObject.elementAType = null;
                setObject.elementAPropertyType = "";
                setObject.setItems = [];
                setObject.setItems.push(new SetItem(setObject));
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
              case "":
                setObject.elementAName = this.items[0].text;
                setObject.elementAProperty = "";
                setObject.elementAType = null;
                setObject.elementAPropertyType = "";
                setObject.setItems = [];
                setObject.setItems.push(new SetItem(setObject));
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
            }
            generateUndoStep();
          };
          if (this.elementAProperty != "") {
            for (var i = 0; i < this.setItems.length; i += 1) {
              this.setItems[i].toUI(
                editorDynamicUIContainer.panel,
                refresh_list,
                forLoopParents,
              );
            }
          }
          if (
            this.elementAPropertyType != "Boolean" &&
            this.elementAPropertyType != "Item" &&
            this.elementAPropertyType != "Layer" &&
            this.elementAPropertyType != "Array"
          ) {
            editorDynamicUIContainer.addSetItem =
              editorDynamicUIContainer.panel.add("button", undefined, "\u271a");
            editorDynamicUIContainer.addSetItem.helpTip =
              "Add element to the calculation";
            editorDynamicUIContainer.addSetItem.size = [20, 20];
            editorDynamicUIContainer.addSetItem.onClick = function () {
              command.setItems.push(new SetItem(command));
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            };
          }
          editorDynamicUIContainer.del_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u2716",
          );
          editorDynamicUIContainer.del_btn.helpTip = "Delete";
          editorDynamicUIContainer.del_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn.onClick = function () {
            if (inArray(command, selectedLines)) {
              removeFromArray(command, selectedLines);
              for (var i = 0; i < selectedLines.length; i += 1) {
                if (inArray(selectedLines[i], selectedLines[i].parent.scope)) {
                  selectedLines[i].remove(selectedLines[i]);
                  if (selectedLines[i].parent.scope.length == 0) {
                    selectedLines[i].parent.scopeColor = undefined;
                  }
                }
              }
              selectedLines = [];
            }
            command.remove(command);
            if (command.parent.scope.length == 0) {
              command.parent.scopeColor = undefined;
            }
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn.fillBrush =
            editorDynamicUIContainer.del_btn.graphics.newBrush(
              editorDynamicUIContainer.del_btn.graphics.BrushType.SOLID_COLOR,
              buttonBackgroundColor,
            );
          editorDynamicUIContainer.del_btn.textPen =
            editorDynamicUIContainer.del_btn.graphics.newPen(
              editorDynamicUIContainer.del_btn.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              5,
            );
          editorDynamicUIContainer.del_btn.onDraw = getGlobalDrawFuncrion(
            0,
            0,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseover",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseout",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.info_btn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u24a4");
          editorDynamicUIContainer.info_btn.helpTip = "Info";
          editorDynamicUIContainer.info_btn.size = [20, 20];
          editorDynamicUIContainer.info_btn.onClick = function () {
            infoDlg(command.info);
          };
          editorDynamicUIContainer.errorVersionSupportBtn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u26a0");
          editorDynamicUIContainer.errorVersionSupportBtn.fillBrush =
            editorDynamicUIContainer.errorVersionSupportBtn.graphics.newBrush(
              editorDynamicUIContainer.errorVersionSupportBtn.graphics.BrushType
                .SOLID_COLOR,
              [0.79607843137, 0.63137254902, 0.08235294117, 1],
            );
          editorDynamicUIContainer.errorVersionSupportBtn.textPen =
            editorDynamicUIContainer.errorVersionSupportBtn.graphics.newPen(
              editorDynamicUIContainer.errorVersionSupportBtn.graphics.PenType
                .SOLID_COLOR,
              [0, 0, 0, 1],
              5,
            );
          editorDynamicUIContainer.errorVersionSupportBtn.graphics.font =
            "Arial-Bold:20";
          editorDynamicUIContainer.errorVersionSupportBtn.onDraw =
            getGlobalDrawFuncrion(-5, -5, ButtonStroke, 2, [0.6, 0.6, 0.6, 1]);
          editorDynamicUIContainer.errorVersionSupportBtn.addEventListener(
            "mouseover",
            versionErrorBtnfunctionbtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.errorVersionSupportBtn.addEventListener(
            "mouseout",
            versionErrorBtnfunctionbtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.errorVersionSupportBtn.helpTip =
            "Some of the properties/actions are not supported in this version of adobe after effects, click this button for more information";
          editorDynamicUIContainer.errorVersionSupportBtn.size = [20, 20];
          editorDynamicUIContainer.errorVersionSupportBtn.hide();
          try {
            var checksupport1 = checkSupport(
              this.elementAType,
              "property",
              this.elementAProperty,
              this.elementAName,
              this,
            );
            var message01 = "";
            try {
              if (checksupport1) {
                if (checksupport1[0] == false) {
                  editorDynamicUIContainer.errorVersionSupportBtn.show();
                  message01 = checksupport1[1];
                }
              }
            } catch (err) {
              message01 = "";
            }
            editorDynamicUIContainer.errorVersionSupportBtn.onClick =
              function () {
                infoDlg(
                  "The current version of after effect is - " +
                    afterEffectsVersion +
                    "." +
                    "\r\r" +
                    message01 +
                    "\r\r" +
                    "in order to use this line use newer vesrion of after effects",
                );
              };
          } catch (err) {}
        }
      };
      SetItem.prototype.toUI = function (dest, refresh_list, varList) {
        var testString = "\u271a";
        if (
          this.parent.setItems.length > 1 &&
          this.parent.setItems[this.parent.setItems.length - 1] != this
        ) {
          this.showManipulator = true;
        } else {
          this.showManipulator = false;
        }
        var objectType = "";
        editorDynamicUIContainer.set_type = dest.add(
          "dropdownlist",
          undefined,
          ["custom"],
        );
        editorDynamicUIContainer.set_type.size = [20, 26];
        for (var i = 0; i < varList.length; i += 1) {
          editorDynamicUIContainer.set_type.add("item", varList[i].name);
          if (varList[i].name == this.type) {
            objectType = varList[i].type;
            this.VarType = varList[i].type;
          }
        }
        for (var i = 0; i < 5; i += 1) {
          editorDynamicUIContainer.set_type.add("item", "");
        }
        if (this.type != "") {
          editorDynamicUIContainer.set_type.selection =
            editorDynamicUIContainer.set_type.find(this.type);
          if (editorDynamicUIContainer.set_type.find(this.type) == null) {
            this.type = "custom";
            this.VarType = "Index";
            this.property = "";
            this.manipulator = " + ";
          }
        }
        if (objectType != "") {
          editorDynamicUIContainer.text01 = dest.add(
            "statictext",
            undefined,
            objectType,
            ["left", "bottom"],
          );
        }
        var setItem = this;
        switch (this.type) {
          default:
            editorDynamicUIContainer.set_properties = dest.add(
              "dropdownlist",
              undefined,
              [],
            );
            editorDynamicUIContainer.set_properties.size = [95, 26];
            var propertiesObjects = getObjectProperties(
              this.VarType,
              "object",
              undefined,
              this.type,
              this.parent,
            );
            for (var i = 0; i < propertiesObjects.length; i += 1) {
              if (
                propertiesObjects[i].objectType ==
                this.parent.elementAPropertyType
              ) {
                editorDynamicUIContainer.set_properties.add(
                  "item",
                  propertiesObjects[i].UiName,
                );
              }
              if ("Text" == this.parent.elementAPropertyType) {
                if (
                  propertiesObjects[i].objectType == "Number" ||
                  propertiesObjects[i].objectType == "Boolean"
                ) {
                  editorDynamicUIContainer.set_properties.add(
                    "item",
                    propertiesObjects[i].UiName,
                  );
                }
              }
            }
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.set_properties.add("item", "");
            }
            if (this.property != "") {
              editorDynamicUIContainer.set_properties.selection =
                editorDynamicUIContainer.set_properties.find(this.property);
              if (
                editorDynamicUIContainer.set_properties.find(this.property) ==
                null
              ) {
                this.property = "";
              }
            }
            editorDynamicUIContainer.set_properties.onChange = function () {
              if (this.selection.text != "") {
                setItem.property = this.selection.text;
              } else {
                this.selection = 0;
                setItem.property = this.selection.text;
              }
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            };
            editorDynamicUIContainer.set_properties_Btn = dest.add(
              "button",
              undefined,
              "(...)",
            );
            editorDynamicUIContainer.set_properties_Btn.size = [20, 20];
            editorDynamicUIContainer.set_properties_Btn.onClick = function () {
              var selectedProperty = buildPropertySelectionUI(
                setItem.VarType,
                "objectDoubleInteger",
                this.parent.elementAPropertyType,
                setItem.type,
                this.parent,
              );
              if (selectedProperty != "") {
                editorDynamicUIContainer.set_properties.selection =
                  editorDynamicUIContainer.set_properties.find(
                    selectedProperty,
                  );
                generateUndoStep();
              }
            };
            if (varList.length > 0) {
              editorDynamicUIContainer.set_properties.visible = true;
            } else {
              editorDynamicUIContainer.set_properties.visible = false;
            }
            break;
          case "custom":
            switch (this.parent.elementAPropertyType) {
              case "Number":
                editorDynamicUIContainer.custom_value = dest.add(
                  "edittext",
                  undefined,
                  undefined,
                );
                editorDynamicUIContainer.custom_value.size = [50, 26];
                editorDynamicUIContainer.custom_value.text = this.property;
                editorDynamicUIContainer.custom_value.onChange = function () {
                  if (
                    this.text.match(/^\d+\.\d+$/) ||
                    this.text.match(/^-{0,1}\d+$/)
                  ) {
                    setItem.property = this.text;
                    generateUndoStep();
                  } else {
                    alert("Only numbers are allowed");
                    this.text = setItem.property;
                  }
                };
                break;
              case "Text":
                editorDynamicUIContainer.setItems = dest.add(
                  "group",
                  undefined,
                  undefined,
                );
                editorDynamicUIContainer.setItems.spacing = 0;
                editorDynamicUIContainer.setItems.margins = 0;
                editorDynamicUIContainer.custom_value =
                  editorDynamicUIContainer.setItems.add(
                    "edittext",
                    undefined,
                    undefined,
                  );
                editorDynamicUIContainer.custom_value.size = [50, 26];
                editorDynamicUIContainer.custom_value.text = this.property;
                editorDynamicUIContainer.custom_value.onChange = function () {
                  setItem.property = this.text;
                  generateUndoStep();
                };
                editorDynamicUIContainer.custom_valueMore =
                  editorDynamicUIContainer.setItems.add(
                    "button",
                    undefined,
                    "\ufe34",
                  );
                editorDynamicUIContainer.custom_valueMore.size = [7, 24];
                editorDynamicUIContainer.custom_valueMore.helpTip =
                  "click this for editing the text";
                editorDynamicUIContainer.custom_valueMore.onClick =
                  function () {
                    var dialog = new Window("dialog");
                    dialog.text = "Dialog";
                    dialog.preferredSize.height = 214;
                    dialog.orientation = "column";
                    dialog.alignChildren = ["center", "top"];
                    dialog.spacing = 10;
                    dialog.margins = 16;
                    var statictext1 = dialog.add(
                      "statictext",
                      undefined,
                      undefined,
                      { name: "statictext1" },
                    );
                    statictext1.text = "Set Item Text:";
                    var edittext1 = dialog.add(
                      'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
                    );
                    edittext1.text = setItem.property;
                    edittext1.preferredSize.width = 362;
                    edittext1.preferredSize.height = 117;
                    var group1 = dialog.add("group", undefined, {
                      name: "group1",
                    });
                    group1.orientation = "row";
                    group1.alignChildren = ["left", "center"];
                    group1.spacing = 10;
                    group1.margins = 0;
                    var button1 = group1.add("button", undefined, undefined, {
                      name: "button1",
                    });
                    button1.text = "Ok";
                    button1.preferredSize.width = 55;
                    button1.preferredSize.height = 27;
                    button1.onClick = function () {
                      setItem.property = edittext1.text;
                      generateUndoStep();
                      dialog.close();
                      refreshUi(refresh_list[0], refresh_list[1]);
                    };
                    var button2 = group1.add("button", undefined, undefined, {
                      name: "button2",
                    });
                    button2.text = "Cancel";
                    button2.preferredSize.width = 55;
                    button2.preferredSize.height = 27;
                    dialog.show();
                    dialog = null;
                    statictext1 = null;
                    edittext1 = null;
                    group1 = null;
                    button1 = null;
                    button2 = null;
                  };
                break;
              case "Array":
                editorDynamicUIContainer.custom_value = dest.add(
                  "dropdownlist",
                  undefined,
                  getObjectProperties(
                    this.parent.elementAType,
                    "propertyOptions",
                    this.parent.elementAProperty,
                    this.VarType,
                    this.parent,
                  ),
                );
                editorDynamicUIContainer.custom_value.size = [50, 26];
                if (this.property != "") {
                  editorDynamicUIContainer.custom_value.selection =
                    editorDynamicUIContainer.custom_value.find(this.property);
                  if (
                    editorDynamicUIContainer.custom_value.find(this.property) ==
                    null
                  ) {
                    this.property = "";
                  }
                }
                editorDynamicUIContainer.custom_value.onChange = function () {
                  switch (this.selection.text) {
                    default:
                      setItem.property = this.selection.text;
                      generateUndoStep();
                      break;
                    case "":
                      this.selection = this.find(setItem.property);
                      break;
                  }
                };
                break;
              case "Layer":
                editorDynamicUIContainer.custom_value = dest.add(
                  "dropdownlist",
                  undefined,
                  ["null", "", "", ""],
                );
                editorDynamicUIContainer.custom_value.size = [50, 26];
                if (this.property != "" && this.property == null) {
                  editorDynamicUIContainer.custom_value.selection =
                    editorDynamicUIContainer.custom_value.find("null");
                }
                editorDynamicUIContainer.custom_value.onChange = function () {
                  switch (this.selection.text) {
                    case "null":
                      setItem.property = null;
                      break;
                    case "":
                      this.selection = this.find("null");
                      break;
                  }
                };
                break;
              case "Boolean":
                editorDynamicUIContainer.custom_value = dest.add(
                  "dropdownlist",
                  undefined,
                  ["true", "false"],
                );
                editorDynamicUIContainer.custom_value.size = [50, 26];
                if (this.property !== "") {
                  if (this.property === 1) {
                    editorDynamicUIContainer.custom_value.selection =
                      editorDynamicUIContainer.custom_value.find("true");
                  }
                  if (this.property === 0) {
                    editorDynamicUIContainer.custom_value.selection =
                      editorDynamicUIContainer.custom_value.find("false");
                  }
                }
                editorDynamicUIContainer.custom_value.onChange = function () {
                  switch (this.selection.text) {
                    case "true":
                      setItem.property = 1;
                      generateUndoStep();
                      break;
                    case "false":
                      setItem.property = 0;
                      generateUndoStep();
                      break;
                    case "":
                      switch (setItem.property) {
                        case 1:
                          this.selection = this.find("true");
                          break;
                        case 0:
                          this.selection = this.find("false");
                          break;
                      }
                      break;
                  }
                };
                break;
            }
            break;
        }
        if (this.showManipulator) {
          editorDynamicUIContainer.manipulatorUi = dest.add(
            "dropdownlist",
            undefined,
            [" + ", " - ", " * ", " / ", "%", " ^ ", "", ""],
          );
          editorDynamicUIContainer.manipulatorUi.size = [40, 26];
          if (this.manipulator != "") {
            editorDynamicUIContainer.manipulatorUi.selection =
              editorDynamicUIContainer.manipulatorUi.find(this.manipulator);
            if (
              editorDynamicUIContainer.manipulatorUi.find(this.manipulator) ==
              null
            ) {
              this.manipulator = " + ";
            }
          }
          editorDynamicUIContainer.manipulatorUi.onChange = function () {
            switch (this.selection.text) {
              default:
                setItem.manipulator = this.selection.text;
                generateUndoStep();
                break;
              case "":
                this.selection = this.find(setItem.manipulator);
                break;
            }
          };
        }
        editorDynamicUIContainer.removeSetItem = dest.add(
          "button",
          undefined,
          "\u2715",
        );
        editorDynamicUIContainer.removeSetItem.helpTip = "Remove element";
        editorDynamicUIContainer.removeSetItem.size = [20, 20];
        editorDynamicUIContainer.removeSetItem.onClick = function () {
          for (var i = 0; i < setItem.parent.setItems.length; i += 1) {
            if (setItem.parent.setItems[i] == setItem) {
              setItem.parent.setItems.splice(i, 1);
              refreshUi(refresh_list[0], refresh_list[1]);
              generateUndoStep();
            }
          }
        };
        editorDynamicUIContainer.set_type.onChange = function () {
          switch (this.selection.text) {
            default:
              setItem.type = this.selection.text;
              setItem.property = "";
              refreshUi(refresh_list[0], refresh_list[1]);
              break;
            case "custom":
            case "":
              setItem.type = "custom";
              setItem.property = "";
              refreshUi(refresh_list[0], refresh_list[1]);
              break;
          }
          generateUndoStep();
        };
      };
      ObjectActions.prototype.run = function (
        a,
        b,
        c,
        reverseOrder,
        duplicatedLayersMemory,
      ) {
        if (this.enabled == true) {
          globalEnv.project = new ProjectObject(app.project);
          if (this.parent instanceof GlobalScope) {
            a = 0;
            b = 0;
            c = 10;
            reverseOrder = false;
          }
          if (this.elementAActionType != "Void") {
            if (
              this.elementAName != null &&
              this.elementAType != null &&
              this.elementAAction != "" &&
              this.elementBName != null &&
              ((this.elementBProperty !== "" &&
                this.elementBName !== "custom") ||
                this.elementBName == "custom")
            ) {
              if (this.elementBName != "custom") {
                var valueB = globalEnv[this.elementBName].getPropertyValue(
                  this.elementBProperty,
                  duplicatedLayersMemory,
                );
              } else {
                var valueB = this.elementBProperty;
              }
              var result = globalEnv[this.elementAName].makeAction(
                this.elementAAction,
                duplicatedLayersMemory,
                reverseOrder,
                valueB,
              );
              if (!(this.parent instanceof GlobalScope)) {
                return result;
              }
            }
          } else {
            if (
              this.elementAName != null &&
              this.elementAType != null &&
              this.elementAAction != ""
            ) {
              var result = globalEnv[this.elementAName].makeAction(
                this.elementAAction,
                duplicatedLayersMemory,
                reverseOrder,
              );
              if (!(this.parent instanceof GlobalScope)) {
                return result;
              }
            }
          }
          delete globalEnv.project;
        }
      };
      ObjectActions.prototype.toUI = function (
        dest,
        refresh_list,
        indentation,
      ) {
        var testString = "\u271a";
        linesCounter++;
        editorDynamicUIContainer.mainGroup = dest.add(
          "group",
          undefined,
          undefined,
        );
        editorDynamicUIContainer.mainGroup.alignment = ["center", "top"];
        editorDynamicUIContainer.mainGroup.orientation = "row";
        editorDynamicUIContainer.mainGroup.minimumSize = [2000, 40];
        editorDynamicUIContainer.mainGroup.maximumSize = [
          editorDynamicUIContainer.mainGroup.minimumSize[0],
          editorDynamicUIContainer.mainGroup.minimumSize[1],
        ];
        editorDynamicUIContainer.mainGroup.margins = [0, 0, 0, 0];
        editorDynamicUIContainer.mainGroup.spacing = 0;
        editorDynamicUIContainer.indentationGroup =
          editorDynamicUIContainer.mainGroup.add("group", undefined, undefined);
        editorDynamicUIContainer.panel = editorDynamicUIContainer.mainGroup.add(
          "panel",
          undefined,
          undefined,
        );
        this.panel = editorDynamicUIContainer.panel;
        var command = this;
        if (isVisible(command)) {
          newUiCodeLine(
            command,
            "action",
            editorDynamicUIContainer.panel,
            editorDynamicUIContainer.indentationGroup,
            indentation,
            refresh_list,
          );
          var forLoopParents = uiVariables.variables.slice();
          forLoopParents.unshift({ name: "project", type: "Project" });
          editorDynamicUIContainer.elementA =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
          editorDynamicUIContainer.elementA.size = [65, 26];
          for (var i = 0; i < forLoopParents.length; i += 1) {
            editorDynamicUIContainer.elementA.add(
              "item",
              forLoopParents[i].name,
            );
            if (forLoopParents[i].name == this.elementAName) {
              this.elementAType = forLoopParents[i].type;
            }
          }
          if (forLoopParents.length > 0) {
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.elementA.add("item", "");
            }
          }
          if (this.elementAName != null) {
            editorDynamicUIContainer.elementA.selection =
              editorDynamicUIContainer.elementA.find(this.elementAName);
            if (
              editorDynamicUIContainer.elementA.find(this.elementAName) == null
            ) {
              this.elementAName = null;
              this.elementAType = null;
              this.elementAAction = "";
              this.elementAActionType = "";
              this.elementBName = null;
              this.elementBType = null;
              this.elementBProperty = "";
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementA.selection = 0;
                this.elementAType = forLoopParents[0].type;
                this.elementAName = forLoopParents[0].name;
              }
            } else {
              if (
                this.elementAType != null &&
                this.elementAName != null &&
                this.elementAActionType != ""
              ) {
                var tempActionType = this.elementAActionType;
                this.elementAActionType = getObjectActions(
                  this.elementAType,
                  "propertyType",
                  this.elementAAction,
                  this.elementAName,
                  this,
                );
                if (tempActionType != this.elementAActionType) {
                  this.elementBProperty = "";
                }
              }
            }
          } else {
            if (forLoopParents && forLoopParents.length) {
              editorDynamicUIContainer.elementA.selection = 0;
              this.elementAType = forLoopParents[0].type;
              this.elementAName = forLoopParents[0].name;
            }
          }
          if (editorDynamicUIContainer.elementA.selection != null) {
            editorDynamicUIContainer.text01 =
              editorDynamicUIContainer.panel.add(
                "statictext",
                undefined,
                this.elementAType,
                ["left", "bottom"],
              );
          }
          var ObjectActions = this;
          editorDynamicUIContainer.elementA_actions =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
          editorDynamicUIContainer.elementA_actions.size = [95, 26];
          if (forLoopParents.length > 0) {
            editorDynamicUIContainer.elementA_actions.visible = true;
          } else {
            editorDynamicUIContainer.elementA_actions.visible = false;
          }
          var actions = getObjectActions(
            this.elementAType,
            "Actions",
            undefined,
            this.elementAName,
            this,
          );
          for (var i = 0; i < actions.length; i += 1) {
            editorDynamicUIContainer.elementA_actions.add("item", actions[i]);
          }
          for (var i = 0; i < 5; i += 1) {
            editorDynamicUIContainer.elementA_actions.add("item", "");
          }
          if (this.elementAAction != "") {
            editorDynamicUIContainer.elementA_actions.selection =
              editorDynamicUIContainer.elementA_actions.find(
                this.elementAAction,
              );
            if (
              editorDynamicUIContainer.elementA_actions.find(
                this.elementAAction,
              ) == null
            ) {
              this.elementAAction = "";
              this.elementAActionType = "";
              this.elementBName = null;
              this.elementBType = null;
              this.elementBProperty = "";
            }
          }
          if (this.elementAActionType != "Void" && this.elementAAction != "") {
            editorDynamicUIContainer.text03 =
              editorDynamicUIContainer.panel.add(
                "statictext",
                undefined,
                " == ",
                ["left", "bottom"],
              );
            editorDynamicUIContainer.elementB =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, [
                "custom",
              ]);
            editorDynamicUIContainer.elementB.size = [65, 26];
            if (this.elementAAction == "") {
              editorDynamicUIContainer.elementB.visible = false;
            }
            for (var i = 0; i < forLoopParents.length; i += 1) {
              if (i != 0) {
                editorDynamicUIContainer.elementB.add(
                  "item",
                  forLoopParents[i].name,
                );
                if (forLoopParents[i].name == this.elementBName) {
                  this.elementBType = forLoopParents[i].type;
                }
              }
            }
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.elementB.add("item", "");
            }
            if (this.elementBName != null) {
              editorDynamicUIContainer.elementB.selection =
                editorDynamicUIContainer.elementB.find(this.elementBName);
              if (
                editorDynamicUIContainer.elementB.find(this.elementBName) ==
                null
              ) {
                this.elementBName = null;
                this.elementBType = null;
                this.elementBProperty = "";
                if (forLoopParents && forLoopParents.length) {
                  editorDynamicUIContainer.elementB.selection = 0;
                  this.elementBName = "custom";
                  this.elementBType = forLoopParents[0].type;
                }
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementB.selection = 0;
                this.elementBName = "custom";
                this.elementBType = forLoopParents[0].type;
              }
            }
            if (
              editorDynamicUIContainer.elementB.selection != null &&
              this.elementBName != "custom" &&
              this.elementBName != null
            ) {
              editorDynamicUIContainer.text02 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  this.elementBType,
                  ["left", "bottom"],
                );
            }
            switch (this.elementBName) {
              default:
                editorDynamicUIContainer.elementB_properties =
                  editorDynamicUIContainer.panel.add(
                    "dropdownlist",
                    undefined,
                    [],
                  );
                editorDynamicUIContainer.elementB_properties.size = [95, 26];
                var propertiesObjects = getObjectProperties(
                  this.elementBType,
                  "object",
                  undefined,
                  this.elementBName,
                  this,
                );
                for (var i = 0; i < propertiesObjects.length; i += 1) {
                  if (
                    propertiesObjects[i].objectType == this.elementAActionType
                  ) {
                    editorDynamicUIContainer.elementB_properties.add(
                      "item",
                      propertiesObjects[i].UiName,
                    );
                  }
                  if ("Text" == this.elementAActionType) {
                    if (
                      propertiesObjects[i].objectType == "Number" ||
                      propertiesObjects[i].objectType == "Boolean"
                    ) {
                      editorDynamicUIContainer.elementB_properties.add(
                        "item",
                        propertiesObjects[i].UiName,
                      );
                    }
                  }
                }
                for (var i = 0; i < 5; i += 1) {
                  editorDynamicUIContainer.elementB_properties.add("item", "");
                }
                if (this.elementBProperty != "") {
                  editorDynamicUIContainer.elementB_properties.selection =
                    editorDynamicUIContainer.elementB_properties.find(
                      this.elementBProperty,
                    );
                  if (
                    editorDynamicUIContainer.elementB_properties.find(
                      this.elementBProperty,
                    ) == null
                  ) {
                    this.elementBProperty = "";
                  }
                }
                if (forLoopParents.length > 0) {
                  editorDynamicUIContainer.elementB_properties.visible = true;
                } else {
                  editorDynamicUIContainer.elementB_properties.visible = false;
                }
                editorDynamicUIContainer.elementB_properties.onChange =
                  function () {
                    if (this.selection.text != "") {
                      ObjectActions.elementBProperty = this.selection.text;
                    } else {
                      this.selection = 0;
                      ObjectActions.elementBProperty = this.selection.text;
                    }
                    refreshUi(refresh_list[0], refresh_list[1]);
                    generateUndoStep();
                  };
                break;
              case "custom":
                switch (this.elementAActionType) {
                  case "Void":
                    break;
                  case "Number":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "edittext",
                        undefined,
                        undefined,
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    editorDynamicUIContainer.custom_value.text =
                      this.elementBProperty;
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        if (
                          this.text.match(/^\d+\.\d+$/) ||
                          this.text.match(/^-{0,1}\d+$/)
                        ) {
                          ObjectActions.elementBProperty = this.text;
                          generateUndoStep();
                        } else {
                          alert("Only numbers are allowed");
                          this.text = ObjectActions.elementBProperty;
                        }
                      };
                    break;
                  case "Text":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "edittext",
                        undefined,
                        undefined,
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    editorDynamicUIContainer.custom_value.text =
                      this.elementBProperty;
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        ObjectActions.elementBProperty = this.text;
                        generateUndoStep();
                      };
                    editorDynamicUIContainer.custom_valueMore =
                      editorDynamicUIContainer.panel.add(
                        "button",
                        undefined,
                        "\ufe34",
                      );
                    editorDynamicUIContainer.custom_valueMore.size = [7, 24];
                    editorDynamicUIContainer.custom_valueMore.helpTip =
                      "click this for editing the text";
                    editorDynamicUIContainer.custom_valueMore.onClick =
                      function () {
                        var dialog = new Window("dialog");
                        dialog.text = "Dialog";
                        dialog.preferredSize.height = 214;
                        dialog.orientation = "column";
                        dialog.alignChildren = ["center", "top"];
                        dialog.spacing = 10;
                        dialog.margins = 16;
                        var statictext1 = dialog.add(
                          "statictext",
                          undefined,
                          undefined,
                          { name: "statictext1" },
                        );
                        statictext1.text = "Text:";
                        var edittext1 = dialog.add(
                          'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
                        );
                        edittext1.text = ObjectActions.elementBProperty;
                        edittext1.preferredSize.width = 362;
                        edittext1.preferredSize.height = 117;
                        var group1 = dialog.add("group", undefined, {
                          name: "group1",
                        });
                        group1.orientation = "row";
                        group1.alignChildren = ["left", "center"];
                        group1.spacing = 10;
                        group1.margins = 0;
                        var button1 = group1.add(
                          "button",
                          undefined,
                          undefined,
                          { name: "button1" },
                        );
                        button1.text = "Ok";
                        button1.preferredSize.width = 55;
                        button1.preferredSize.height = 27;
                        button1.onClick = function () {
                          ObjectActions.elementBProperty = edittext1.text;
                          generateUndoStep();
                          dialog.close();
                          refreshUi(refresh_list[0], refresh_list[1]);
                        };
                        var button2 = group1.add(
                          "button",
                          undefined,
                          undefined,
                          { name: "button2" },
                        );
                        button2.text = "Cancel";
                        button2.preferredSize.width = 55;
                        button2.preferredSize.height = 27;
                        dialog.show();
                        dialog = null;
                        statictext1 = null;
                        edittext1 = null;
                        group1 = null;
                        button1 = null;
                        button2 = null;
                      };
                    break;
                  case "Array":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "dropdownlist",
                        undefined,
                        getObjectActions(
                          this.elementAType,
                          "actionOptions",
                          this.elementAAction,
                          this.elementAName,
                          this,
                        ),
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    if (this.elementBProperty != "") {
                      editorDynamicUIContainer.custom_value.selection =
                        editorDynamicUIContainer.custom_value.find(
                          this.elementBProperty,
                        );
                      if (
                        editorDynamicUIContainer.custom_value.find(
                          this.elementBProperty,
                        ) == null
                      ) {
                        this.elementBProperty = "";
                      }
                    }
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        switch (this.selection.text) {
                          default:
                            ObjectActions.elementBProperty =
                              this.selection.text;
                            generateUndoStep();
                            break;
                          case "":
                            this.selection = this.find(
                              ObjectActions.elementBProperty,
                            );
                            break;
                        }
                      };
                    break;
                  case "Layer":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "dropdownlist",
                        undefined,
                        ["null", "", "", ""],
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    if (
                      this.elementBProperty != "" &&
                      this.elementBProperty == null
                    ) {
                      editorDynamicUIContainer.custom_value.selection =
                        editorDynamicUIContainer.custom_value.find("null");
                    }
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        switch (this.selection.text) {
                          case "null":
                            ObjectActions.elementBProperty = null;
                            break;
                          case "":
                            this.selection = this.find("null");
                            break;
                        }
                      };
                    break;
                  case "Boolean":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "dropdownlist",
                        undefined,
                        ["true", "false"],
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    if (this.elementBProperty !== "") {
                      if (this.elementBProperty === 1) {
                        editorDynamicUIContainer.custom_value.selection =
                          editorDynamicUIContainer.custom_value.find("true");
                      }
                      if (this.elementBProperty === 0) {
                        editorDynamicUIContainer.custom_value.selection =
                          editorDynamicUIContainer.custom_value.find("false");
                      }
                    }
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        switch (this.selection.text) {
                          case "true":
                            ObjectActions.elementBProperty = 1;
                            break;
                          case "false":
                            ObjectActions.elementBProperty = 0;
                            break;
                          case "":
                            switch (ObjectActions.elementBProperty) {
                              case 1:
                                this.selection = this.find("true");
                                break;
                              case 0:
                                this.selection = this.find("false");
                                break;
                            }
                            break;
                        }
                        generateUndoStep();
                      };
                    break;
                }
                break;
            }
            editorDynamicUIContainer.elementB.onChange = function () {
              switch (this.selection.text) {
                default:
                  ObjectActions.elementBName = this.selection.text;
                  ObjectActions.elementBType = null;
                  ObjectActions.elementBProperty = "";
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
                case "":
                case "custom":
                  ObjectActions.elementBName = "custom";
                  ObjectActions.elementBType = null;
                  ObjectActions.elementBProperty = "";
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          editorDynamicUIContainer.elementA_actions.onChange = function () {
            if (this.selection.text != "") {
              for (var i = 0; i < forLoopParents.length; i += 1) {
                if (forLoopParents[i].name == ObjectActions.elementAName) {
                  loopObj = i;
                }
              }
              if (
                !findDeleteParents(
                  forLoopParents[loopObj].object,
                  ObjectActions,
                )
              ) {
                ObjectActions.elementAAction = this.selection.text;
                ObjectActions.elementBName = null;
                ObjectActions.elementBType = null;
                ObjectActions.elementBProperty = "";
              } else {
                alert(" there is already delete node for this loop");
                this.selection = null;
                ObjectActions.elementAAction = "";
                ObjectActions.elementBName = null;
                ObjectActions.elementBType = null;
                ObjectActions.elementBProperty = "";
              }
            } else {
              this.selection = null;
              ObjectActions.elementAAction = "";
              ObjectActions.elementBName = null;
              ObjectActions.elementBType = null;
              ObjectActions.elementBProperty = "";
            }
            ObjectActions.elementAActionType = getObjectActions(
              ObjectActions.elementAType,
              "propertyType",
              this.selection.text,
              ObjectActions.elementAName,
              ObjectActions,
            );
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.elementA.onChange = function () {
            switch (this.selection.text) {
              default:
                ObjectActions.elementAName = this.selection.text;
                ObjectActions.elementAAction = "";
                ObjectActions.elementBProperty = "";
                ObjectActions.elementAType = null;
                ObjectActions.elementAActionType = "";
                ObjectActions.elementBName = null;
                ObjectActions.elementBType = null;
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
              case "":
                ObjectActions.elementAName = this.items[0].text;
                ObjectActions.elementAAction = "";
                ObjectActions.elementBProperty = "";
                ObjectActions.elementAType = null;
                ObjectActions.elementAActionType = "";
                ObjectActions.elementBName = null;
                ObjectActions.elementBType = null;
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
            }
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u2716",
          );
          editorDynamicUIContainer.del_btn.helpTip = "Delete";
          editorDynamicUIContainer.del_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn.onClick = function () {
            if (inArray(command, selectedLines)) {
              removeFromArray(command, selectedLines);
              for (var i = 0; i < selectedLines.length; i += 1) {
                if (inArray(selectedLines[i], selectedLines[i].parent.scope)) {
                  selectedLines[i].remove(selectedLines[i]);
                  if (selectedLines[i].parent.scope.length == 0) {
                    selectedLines[i].parent.scopeColor = undefined;
                  }
                }
              }
              selectedLines = [];
            }
            command.remove(command);
            if (command.parent.scope.length == 0) {
              command.parent.scopeColor = undefined;
            }
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn.fillBrush =
            editorDynamicUIContainer.del_btn.graphics.newBrush(
              editorDynamicUIContainer.del_btn.graphics.BrushType.SOLID_COLOR,
              buttonBackgroundColor,
            );
          editorDynamicUIContainer.del_btn.textPen =
            editorDynamicUIContainer.del_btn.graphics.newPen(
              editorDynamicUIContainer.del_btn.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              5,
            );
          editorDynamicUIContainer.del_btn.onDraw = getGlobalDrawFuncrion(
            0,
            0,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseover",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseout",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.info_btn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u24a4");
          editorDynamicUIContainer.info_btn.helpTip = "Info";
          editorDynamicUIContainer.info_btn.size = [20, 20];
          editorDynamicUIContainer.info_btn.onClick = function () {
            infoDlg(command.info);
          };
          editorDynamicUIContainer.errorVersionSupportBtn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u26a0");
          editorDynamicUIContainer.errorVersionSupportBtn.fillBrush =
            editorDynamicUIContainer.errorVersionSupportBtn.graphics.newBrush(
              editorDynamicUIContainer.errorVersionSupportBtn.graphics.BrushType
                .SOLID_COLOR,
              [0.79607843137, 0.63137254902, 0.08235294117, 1],
            );
          editorDynamicUIContainer.errorVersionSupportBtn.textPen =
            editorDynamicUIContainer.errorVersionSupportBtn.graphics.newPen(
              editorDynamicUIContainer.errorVersionSupportBtn.graphics.PenType
                .SOLID_COLOR,
              [0, 0, 0, 1],
              5,
            );
          editorDynamicUIContainer.errorVersionSupportBtn.graphics.font =
            "Arial-Bold:20";
          editorDynamicUIContainer.errorVersionSupportBtn.onDraw =
            getGlobalDrawFuncrion(-5, -5, ButtonStroke, 2, [0.6, 0.6, 0.6, 1]);
          editorDynamicUIContainer.errorVersionSupportBtn.addEventListener(
            "mouseover",
            versionErrorBtnfunctionbtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.errorVersionSupportBtn.addEventListener(
            "mouseout",
            versionErrorBtnfunctionbtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.errorVersionSupportBtn.helpTip =
            "Some of the properties/actions are not supported in this version of adobe after effects, click this button for more information";
          editorDynamicUIContainer.errorVersionSupportBtn.size = [20, 20];
          editorDynamicUIContainer.errorVersionSupportBtn.hide();
          try {
            var checksupport1 = checkSupport(
              this.elementAType,
              "action",
              this.elementAAction,
              this.elementAName,
              this,
            );
            var checksupport2 = checkSupport(
              this.elementBType,
              "property",
              this.elementBProperty,
              this.elementBName,
              this,
            );
            var message01 = "";
            var message02 = "";
            try {
              if (checksupport1) {
                if (checksupport1[0] == false) {
                  editorDynamicUIContainer.errorVersionSupportBtn.show();
                  message01 = checksupport1[1];
                }
              }
            } catch (err) {
              message01 = "";
            }
            try {
              if (checksupport2) {
                if (checksupport2[0] == false) {
                  editorDynamicUIContainer.errorVersionSupportBtn.show();
                  message02 = checksupport2[1];
                }
              }
            } catch (err) {
              message02 = "";
            }
            editorDynamicUIContainer.errorVersionSupportBtn.onClick =
              function () {
                infoDlg(
                  "The current version of after effect is - " +
                    afterEffectsVersion +
                    "." +
                    "\r\r" +
                    message01 +
                    "\r" +
                    message02 +
                    "\r\r" +
                    "in order to use this line use newer vesrion of after effects",
                );
              };
          } catch (err) {}
        }
      };
      GlobalObject.prototype.createVariables = function () {
        if (
          this.objectType == "Layer" ||
          this.objectType == "Item" ||
          this.objectType == "Property/Effect" ||
          this.objectType == "Project" ||
          this.objectType == "Collection"
        ) {
          uiVariables.variables.unshift({
            name: this.elementName,
            object: this,
            type: this.objectType,
          });
        } else {
          uiVariables.variables.unshift({
            name: this.elementName,
            object: this,
            type: "Variable",
          });
        }
      };
      GlobalObject.prototype.run = function (
        a,
        b,
        c,
        reverseOrder,
        duplicatedLayersMemory,
      ) {
        if (this.enabled == true) {
          if (
            this.objectType != null &&
            this.elementBName != null &&
            this.elementBProperty !== ""
          ) {
            if (this.elementBName != "custom") {
              var valueB = globalEnv[this.elementBName].getPropertyValue(
                this.elementBProperty,
                duplicatedLayersMemory,
              );
              if (
                this.objectType == "Property/Effect" &&
                this.elementBType == "Layer"
              ) {
                valueB = globalEnv[this.elementBName].getPropertyObject(
                  this.elementBProperty,
                );
              }
            } else {
              var valueB = this.elementBProperty;
            }
            try {
              if (
                this.objectType != "Layer" &&
                this.objectType != "Item" &&
                this.objectType != "Property/Effect"
              ) {
                if (this.userPrompt == true) {
                  if (
                    this.userPromptOptions == true &&
                    this.promptOptions != ""
                  ) {
                    if (this.promptText != "") {
                      var dialog = new Window("dialog");
                      dialog.text = "user prompt";
                      dialog.orientation = "column";
                      dialog.alignChildren = ["fill", "top"];
                      dialog.spacing = 10;
                      dialog.margins = 16;
                      dialog.preferredSize.width = 450;
                      var group1 = dialog.add("group", undefined, {
                        name: "group1",
                      });
                      group1.orientation = "row";
                      group1.alignChildren = ["center", "center"];
                      group1.spacing = 10;
                      group1.margins = 0;
                      var edittext1 = group1.add(
                        'edittext {properties: {name: "edittext1", readonly: true, multiline: true, scrollable: true, borderless: true}}',
                      );
                      edittext1.text = this.promptText;
                      edittext1.alignment = ["fill", "fill"];
                      var userOptions = this.promptOptions.split(",");
                      var radioButtonsCollection = [];
                      var thisObject = this;
                      var group2 = group1.add("group", undefined, {
                        name: "group2",
                      });
                      group2.orientation = "column";
                      group2.alignChildren = ["center", "center"];
                      group2.spacing = 10;
                      group2.margins = 0;
                      group2.alignment = ["right", "center"];
                      var buttonClicked = false;
                      var button1 = group2.add("button", undefined, undefined, {
                        name: "button1",
                      });
                      button1.text = "Ok";
                      button1.alignment = ["fill", "center"];
                      button1.onClick = function () {
                        for (
                          var i = 0;
                          i < radioButtonsCollection.length;
                          i += 1
                        ) {
                          if (radioButtonsCollection[i].value) {
                            globalEnv[thisObject.elementName] =
                              new GlobalVariableObject(
                                radioButtonsCollection[i].text,
                                thisObject.objectType,
                              );
                            buttonClicked = true;
                            break;
                          }
                        }
                        dialog.close();
                      };
                      var button2 = group2.add("button", undefined, undefined, {
                        name: "button2",
                      });
                      button2.text = "Cancel";
                      button2.alignment = ["fill", "center"];
                      button2.onClick = function () {
                        globalEnv[thisObject.elementName] =
                          new GlobalVariableObject(
                            valueB,
                            thisObject.objectType,
                          );
                        buttonClicked = true;
                        dialog.close();
                      };
                      var divider1 = dialog.add("panel", undefined, undefined, {
                        name: "divider1",
                      });
                      divider1.alignment = "fill";
                      var group3 = dialog.add("group", undefined, {
                        name: "group3",
                      });
                      group3.preferredSize.height = 40;
                      group3.orientation = "row";
                      group3.alignChildren = ["center", "center"];
                      group3.spacing = 20;
                      group3.margins = 0;
                      group3.alignment = ["fill", "top"];
                      for (var i = 0; i < userOptions.length; i += 1) {
                        var radiobutton1 = group3.add(
                          "radiobutton",
                          undefined,
                          undefined,
                          { name: "radiobutton1" },
                        );
                        radiobutton1.text = userOptions[i];
                        if (i == 0) {
                          radiobutton1.value = true;
                        }
                        radioButtonsCollection.push(radiobutton1);
                      }
                      globalEnv[this.elementName] = new GlobalVariableObject(
                        valueB,
                        this.objectType,
                      );
                      dialog.show();
                      dialog = null;
                      group1 = null;
                      edittext1 = null;
                      userOptions = null;
                      radioButtonsCollection = null;
                      thisObject = null;
                      group2 = null;
                      buttonClicked = null;
                      button1 = null;
                      button2 = null;
                      divider1 = null;
                      group3 = null;
                    } else {
                      var dialog = new Window("dialog");
                      dialog.text = "user prompt";
                      dialog.orientation = "column";
                      dialog.alignChildren = ["fill", "top"];
                      dialog.spacing = 10;
                      dialog.margins = 16;
                      dialog.preferredSize.width = 250;
                      var group1 = dialog.add("group", undefined, {
                        name: "group1",
                      });
                      group1.orientation = "row";
                      group1.alignChildren = ["fill", "center"];
                      group1.spacing = 10;
                      group1.margins = 0;
                      group1.alignment = "fill";
                      var userOptions = this.promptOptions.split(",");
                      var radioButtonsCollection = [];
                      var thisObject = this;
                      var group3 = group1.add("group", undefined, {
                        name: "group3",
                      });
                      group3.preferredSize.height = 40;
                      group3.orientation = "column";
                      group3.alignChildren = ["left", "center"];
                      group3.spacing = 20;
                      group3.margins = 0;
                      group3.alignment = ["fill", "top"];
                      for (var i = 0; i < userOptions.length; i += 1) {
                        var radiobutton1 = group3.add(
                          "radiobutton",
                          undefined,
                          undefined,
                          { name: "radiobutton1" },
                        );
                        radiobutton1.text = userOptions[i];
                        if (i == 0) {
                          radiobutton1.value = true;
                        }
                        radioButtonsCollection.push(radiobutton1);
                      }
                      var group2 = group1.add("group", undefined, {
                        name: "group2",
                      });
                      group2.orientation = "column";
                      group2.alignChildren = ["center", "center"];
                      group2.sizeX = 20;
                      group2.spacing = 10;
                      group2.margins = 0;
                      group2.alignment = ["fill", "top"];
                      var buttonClicked = false;
                      var button1 = group2.add("button", undefined, undefined, {
                        name: "button1",
                      });
                      button1.text = "Ok";
                      button1.alignment = ["center", "center"];
                      button1.onClick = function () {
                        for (
                          var i = 0;
                          i < radioButtonsCollection.length;
                          i += 1
                        ) {
                          if (radioButtonsCollection[i].value) {
                            globalEnv[thisObject.elementName] =
                              new GlobalVariableObject(
                                radioButtonsCollection[i].text,
                                thisObject.objectType,
                              );
                            buttonClicked = true;
                            break;
                          }
                        }
                        dialog.close();
                      };
                      var button2 = group2.add("button", undefined, undefined, {
                        name: "button2",
                      });
                      button2.text = "Cancel";
                      button2.alignment = ["center", "center"];
                      button2.onClick = function () {
                        globalEnv[thisObject.elementName] =
                          new GlobalVariableObject(
                            valueB,
                            thisObject.objectType,
                          );
                        buttonClicked = true;
                        dialog.close();
                      };
                      globalEnv[this.elementName] = new GlobalVariableObject(
                        valueB,
                        this.objectType,
                      );
                      dialog.show();
                      dialog = null;
                      group1 = null;
                      userOptions = null;
                      radioButtonsCollection = null;
                      thisObject = null;
                      group3 = null;
                      group2 = null;
                      buttonClicked = null;
                      button1 = null;
                      button2 = null;
                    }
                  } else {
                    switch (this.objectType) {
                      default:
                        var promptData = prompt(
                          this.promptText,
                          "Only " + this.objectType + " allowed",
                          "user prompt",
                        );
                        if (promptData != null) {
                          switch (this.objectType) {
                            case "Number":
                              if (
                                promptData.match(/^\d+\.\d+$/) ||
                                promptData.match(/^-{0,1}\d+$/)
                              ) {
                                globalEnv[this.elementName] =
                                  new GlobalVariableObject(
                                    promptData,
                                    this.objectType,
                                  );
                              }
                              break;
                            case "Text":
                              globalEnv[this.elementName] =
                                new GlobalVariableObject(
                                  promptData,
                                  this.objectType,
                                );
                              break;
                            case "Boolean":
                              if (
                                promptData == "true" ||
                                promptData == "True" ||
                                promptData == "TRUE"
                              ) {
                                promptData = 1;
                                globalEnv[this.elementName] =
                                  new GlobalVariableObject(
                                    promptData,
                                    this.objectType,
                                  );
                              }
                              if (
                                promptData == "false" ||
                                promptData == "False" ||
                                promptData == "FALSE"
                              ) {
                                promptData = 0;
                                globalEnv[this.elementName] =
                                  new GlobalVariableObject(
                                    promptData,
                                    this.objectType,
                                  );
                              }
                              break;
                          }
                        } else {
                          globalEnv[this.elementName] =
                            new GlobalVariableObject(valueB, this.objectType);
                        }
                        break;
                      case "Text":
                        var dialog = new Window("dialog");
                        dialog.text = "user prompt";
                        dialog.orientation = "column";
                        dialog.alignChildren = ["fill", "top"];
                        dialog.spacing = 10;
                        dialog.margins = 16;
                        dialog.preferredSize.width = 250;
                        var group1 = dialog.add("group", undefined, {
                          name: "group1",
                        });
                        group1.orientation = "row";
                        group1.alignChildren = ["fill", "center"];
                        group1.spacing = 10;
                        group1.margins = 0;
                        group1.alignment = "fill";
                        var thisObject = this;
                        var group3 = group1.add("group", undefined, {
                          name: "group3",
                        });
                        group3.preferredSize.height = 40;
                        group3.orientation = "column";
                        group3.alignChildren = ["left", "center"];
                        group3.spacing = 0;
                        group3.margins = 0;
                        group3.alignment = ["fill", "top"];
                        var statictext1 = group3.add(
                          "statictext",
                          undefined,
                          undefined,
                          { multiline: true, name: "statictext1" },
                        );
                        statictext1.text = this.promptText;
                        statictext1.preferredSize.width = 362;
                        statictext1.preferredSize.height = 70;
                        var edittext1 = group3.add(
                          'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
                        );
                        edittext1.text = "";
                        edittext1.preferredSize.width = 362;
                        edittext1.preferredSize.height = 117;
                        edittext1.active = true;
                        var group2 = group1.add("group", undefined, {
                          name: "group2",
                        });
                        group2.orientation = "column";
                        group2.alignChildren = ["center", "center"];
                        group2.sizeX = 20;
                        group2.spacing = 10;
                        group2.margins = 0;
                        group2.alignment = ["fill", "top"];
                        var buttonClicked = false;
                        var button1 = group2.add(
                          "button",
                          undefined,
                          undefined,
                          { name: "button1" },
                        );
                        button1.text = "Ok";
                        button1.alignment = ["center", "center"];
                        button1.onClick = function () {
                          globalEnv[thisObject.elementName] =
                            new GlobalVariableObject(
                              edittext1.text,
                              thisObject.objectType,
                            );
                          buttonClicked = true;
                          dialog.close();
                        };
                        var button2 = group2.add(
                          "button",
                          undefined,
                          undefined,
                          { name: "button2" },
                        );
                        button2.text = "Cancel";
                        button2.alignment = ["center", "center"];
                        button2.onClick = function () {
                          globalEnv[thisObject.elementName] =
                            new GlobalVariableObject(
                              valueB,
                              thisObject.objectType,
                            );
                          buttonClicked = true;
                          dialog.close();
                        };
                        globalEnv[this.elementName] = new GlobalVariableObject(
                          valueB,
                          this.objectType,
                        );
                        dialog.show();
                        dialog = null;
                        group1 = null;
                        userOptions = null;
                        radioButtonsCollection = null;
                        thisObject = null;
                        group3 = null;
                        group2 = null;
                        buttonClicked = null;
                        button1 = null;
                        button2 = null;
                        break;
                    }
                  }
                } else {
                  globalEnv[this.elementName] = new GlobalVariableObject(
                    valueB,
                    this.objectType,
                  );
                }
              } else {
                globalEnv[this.elementName] = valueB;
              }
            } catch (err) {}
          } else {
            if (this.objectType == "Project") {
              globalEnv[this.elementName] = new ProjectObject(app.project);
            }
            if (this.objectType == "Collection") {
              globalEnv[this.elementName] = new CollectionVariableObject(
                this.elementBType,
              );
            }
          }
        }
      };
      GlobalObject.prototype.toUI = function (dest, refresh_list, indentation) {
        var testString = "\u271a";
        linesCounter++;
        editorDynamicUIContainer.mainGroup = dest.add(
          "group",
          undefined,
          undefined,
        );
        editorDynamicUIContainer.mainGroup.alignment = ["center", "top"];
        editorDynamicUIContainer.mainGroup.orientation = "row";
        editorDynamicUIContainer.mainGroup.minimumSize = [2000, 40];
        editorDynamicUIContainer.mainGroup.maximumSize = [
          editorDynamicUIContainer.mainGroup.minimumSize[0],
          editorDynamicUIContainer.mainGroup.minimumSize[1],
        ];
        editorDynamicUIContainer.mainGroup.margins = [0, 0, 0, 0];
        editorDynamicUIContainer.mainGroup.spacing = 0;
        editorDynamicUIContainer.indentationGroup =
          editorDynamicUIContainer.mainGroup.add("group", undefined, undefined);
        editorDynamicUIContainer.panel = editorDynamicUIContainer.mainGroup.add(
          "panel",
          undefined,
          undefined,
        );
        this.panel = editorDynamicUIContainer.panel;
        var command = this;
        if (isVisible(command)) {
          newUiCodeLine(
            command,
            "variable",
            editorDynamicUIContainer.panel,
            editorDynamicUIContainer.indentationGroup,
            indentation,
            refresh_list,
          );
          var forLoopParents = uiVariables.variables;
          var objectTypeOptions = [
            "Number",
            "Text",
            "Layer",
            "Item",
            "Property/Effect",
            "Boolean",
            "Project",
            "Collection",
          ];
          editorDynamicUIContainer.objectTypeElement =
            editorDynamicUIContainer.panel.add("dropdownlist", undefined, []);
          editorDynamicUIContainer.objectTypeElement.size = [65, 26];
          for (var i = 0; i < objectTypeOptions.length; i += 1) {
            editorDynamicUIContainer.objectTypeElement.add(
              "item",
              objectTypeOptions[i],
            );
          }
          if (objectTypeOptions.length > 0) {
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.objectTypeElement.add("item", "");
            }
          }
          if (this.objectType != null) {
            editorDynamicUIContainer.objectTypeElement.selection =
              editorDynamicUIContainer.objectTypeElement.find(this.objectType);
            if (
              editorDynamicUIContainer.objectTypeElement.find(
                this.objectType,
              ) == null
            ) {
              editorDynamicUIContainer.objectTypeElement.selection = 0;
              this.objectType =
                editorDynamicUIContainer.objectTypeElement.selection.text;
              this.elementBName = null;
              this.elementBType = null;
              this.elementBProperty = "";
              this.userPrompt = false;
              this.promptText = "";
            }
          } else {
            editorDynamicUIContainer.objectTypeElement.selection = 0;
            this.objectType =
              editorDynamicUIContainer.objectTypeElement.selection.text;
            this.elementBName = null;
            this.elementBType = null;
            this.elementBProperty = "";
            this.userPrompt = false;
            this.promptText = "";
          }
          var globalObject = this;
          editorDynamicUIContainer.text03 = editorDynamicUIContainer.panel.add(
            "statictext",
            undefined,
            " == ",
            ["left", "bottom"],
          );
          if (this.objectType != "Project" && this.objectType != "Collection") {
            editorDynamicUIContainer.elementB =
              editorDynamicUIContainer.panel.add("dropdownlist", undefined, [
                "custom",
              ]);
            editorDynamicUIContainer.text03.visible = false;
            editorDynamicUIContainer.elementB.visible = false;
            editorDynamicUIContainer.text03.visible = true;
            editorDynamicUIContainer.elementB.visible = true;
            editorDynamicUIContainer.elementB.size = [65, 26];
            if (this.objectType == null) {
              editorDynamicUIContainer.elementB.visible = false;
            }
            for (var i = 0; i < forLoopParents.length; i += 1) {
              editorDynamicUIContainer.elementB.add(
                "item",
                forLoopParents[i].name,
              );
              if (forLoopParents[i].name == this.elementBName) {
                this.elementBType = forLoopParents[i].type;
              }
            }
            for (var i = 0; i < 5; i += 1) {
              editorDynamicUIContainer.elementB.add("item", "");
            }
            if (this.elementBName != null) {
              editorDynamicUIContainer.elementB.selection =
                editorDynamicUIContainer.elementB.find(this.elementBName);
              if (
                editorDynamicUIContainer.elementB.find(this.elementBName) ==
                null
              ) {
                this.elementBName = null;
                this.elementBType = null;
                this.elementBProperty = "";
                this.userPrompt = false;
                this.promptText = "";
                if (forLoopParents && forLoopParents.length) {
                  editorDynamicUIContainer.elementB.selection = 0;
                  this.elementBName = "custom";
                  this.elementBType = forLoopParents[0].type;
                } else {
                  editorDynamicUIContainer.elementB.selection = 0;
                  this.elementBName = "custom";
                  this.elementBType = this.objectType;
                }
              }
            } else {
              if (forLoopParents && forLoopParents.length) {
                editorDynamicUIContainer.elementB.selection = 0;
                this.elementBName = "custom";
                this.elementBType = forLoopParents[0].type;
              } else {
                editorDynamicUIContainer.elementB.selection = 0;
                this.elementBName = "custom";
                this.elementBType = this.objectType;
              }
            }
            forLoopParents = null;
            if (
              editorDynamicUIContainer.elementB.selection != null &&
              this.elementBName != "custom" &&
              this.elementBName != null
            ) {
              editorDynamicUIContainer.text02 =
                editorDynamicUIContainer.panel.add(
                  "statictext",
                  undefined,
                  this.elementBType,
                  ["left", "bottom"],
                );
            }
            switch (this.elementBName) {
              default:
                editorDynamicUIContainer.elementB_properties =
                  editorDynamicUIContainer.panel.add(
                    "dropdownlist",
                    undefined,
                    [],
                  );
                editorDynamicUIContainer.elementB_properties.size = [95, 26];
                var propertiesObjects = getObjectProperties(
                  this.elementBType,
                  "object",
                  undefined,
                  this.elementBName,
                  this,
                );
                for (var i = 0; i < propertiesObjects.length; i += 1) {
                  switch (this.objectType) {
                    default:
                      if (propertiesObjects[i].objectType == this.objectType) {
                        editorDynamicUIContainer.elementB_properties.add(
                          "item",
                          propertiesObjects[i].UiName,
                        );
                      }
                      if (
                        (propertiesObjects[i].objectType == "Number" ||
                          propertiesObjects[i].objectType == "Boolean") &&
                        this.objectType == "Text"
                      ) {
                        editorDynamicUIContainer.elementB_properties.add(
                          "item",
                          propertiesObjects[i].UiName,
                        );
                      }
                      break;
                    case "Property/Effect":
                      switch (propertiesObjects[i].UiName) {
                        case "opacity":
                        case "position x":
                        case "position y":
                        case "position z":
                        case "anchor point x":
                        case "anchor point y":
                        case "anchor point z":
                        case "scale":
                        case "scale x":
                        case "scale y":
                        case "scale z":
                        case "rotation":
                        case "rotation x":
                        case "rotation y":
                        case "rotation z":
                        case "orientation":
                        case "orientation x":
                        case "orientation y":
                        case "orientation z":
                        case "source text":
                        case "time remap":
                        case "this property":
                          editorDynamicUIContainer.elementB_properties.add(
                            "item",
                            propertiesObjects[i].UiName,
                          );
                          break;
                      }
                  }
                }
                propertiesObjects = null;
                for (var i = 0; i < 5; i += 1) {
                  editorDynamicUIContainer.elementB_properties.add("item", "");
                }
                if (this.elementBProperty != "") {
                  editorDynamicUIContainer.elementB_properties.selection =
                    editorDynamicUIContainer.elementB_properties.find(
                      this.elementBProperty,
                    );
                  if (
                    editorDynamicUIContainer.elementB_properties.find(
                      this.elementBProperty,
                    ) == null
                  ) {
                    this.elementBProperty = "";
                    this.userPrompt = false;
                    this.promptText = "";
                  }
                }
                editorDynamicUIContainer.elementB_properties_Btn =
                  editorDynamicUIContainer.panel.add(
                    "button",
                    undefined,
                    "(...)",
                  );
                editorDynamicUIContainer.elementB_properties_Btn.size = [
                  20, 20,
                ];
                editorDynamicUIContainer.elementB_properties_Btn.onClick =
                  function () {
                    var selectedProperty = buildPropertySelectionUI(
                      globalObject.elementBType,
                      "objectDoubleInteger",
                      globalObject.objectType,
                      globalObject.elementBName,
                      globalObject,
                    );
                    if (selectedProperty != "") {
                      editorDynamicUIContainer.elementB_properties.selection =
                        editorDynamicUIContainer.elementB_properties.find(
                          selectedProperty,
                        );
                      generateUndoStep();
                    }
                    selectedProperty = null;
                  };
                if (objectTypeOptions.length > 0) {
                  editorDynamicUIContainer.elementB_properties.visible = true;
                } else {
                  editorDynamicUIContainer.elementB_properties.visible = false;
                }
                editorDynamicUIContainer.elementB_properties.onChange =
                  function () {
                    if (this.selection.text != "") {
                      globalObject.elementBProperty = this.selection.text;
                    } else {
                      this.selection = 0;
                      globalObject.elementBProperty = this.selection.text;
                    }
                    refreshUi(refresh_list[0], refresh_list[1]);
                    generateUndoStep();
                  };
                break;
              case "custom":
                switch (this.objectType) {
                  case "Number":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "edittext",
                        undefined,
                        undefined,
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    editorDynamicUIContainer.custom_value.text =
                      this.elementBProperty;
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        if (
                          this.text.match(/^\d+\.\d+$/) ||
                          this.text.match(/^-{0,1}\d+$/)
                        ) {
                          globalObject.elementBProperty = this.text;
                          generateUndoStep();
                        } else {
                          alert("Only numbers are allowed");
                          this.text = globalObject.elementBProperty;
                        }
                      };
                    break;
                  case "Text":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "edittext",
                        undefined,
                        undefined,
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    editorDynamicUIContainer.custom_value.text =
                      this.elementBProperty;
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        globalObject.elementBProperty = this.text;
                        generateUndoStep();
                      };
                    editorDynamicUIContainer.custom_valueMore =
                      editorDynamicUIContainer.panel.add(
                        "button",
                        undefined,
                        "\ufe34",
                      );
                    editorDynamicUIContainer.custom_valueMore.size = [7, 24];
                    editorDynamicUIContainer.custom_valueMore.helpTip =
                      "click this for editing the text";
                    editorDynamicUIContainer.custom_valueMore.onClick =
                      function () {
                        var dialog = new Window("dialog");
                        dialog.text = "Dialog";
                        dialog.preferredSize.height = 214;
                        dialog.orientation = "column";
                        dialog.alignChildren = ["center", "top"];
                        dialog.spacing = 10;
                        dialog.margins = 16;
                        var statictext1 = dialog.add(
                          "statictext",
                          undefined,
                          undefined,
                          { name: "statictext1" },
                        );
                        statictext1.text = "Text:";
                        var edittext1 = dialog.add(
                          'edittext {properties: {name: "edittext1", multiline: true, scrollable: true}}',
                        );
                        edittext1.text = globalObject.elementBProperty;
                        edittext1.preferredSize.width = 362;
                        edittext1.preferredSize.height = 117;
                        var group1 = dialog.add("group", undefined, {
                          name: "group1",
                        });
                        group1.orientation = "row";
                        group1.alignChildren = ["left", "center"];
                        group1.spacing = 10;
                        group1.margins = 0;
                        var button1 = group1.add(
                          "button",
                          undefined,
                          undefined,
                          { name: "button1" },
                        );
                        button1.text = "Ok";
                        button1.preferredSize.width = 55;
                        button1.preferredSize.height = 27;
                        button1.onClick = function () {
                          globalObject.elementBProperty = edittext1.text;
                          generateUndoStep();
                          dialog.close();
                          refreshUi(refresh_list[0], refresh_list[1]);
                        };
                        var button2 = group1.add(
                          "button",
                          undefined,
                          undefined,
                          { name: "button2" },
                        );
                        button2.text = "Cancel";
                        button2.preferredSize.width = 55;
                        button2.preferredSize.height = 27;
                        dialog.show();
                        dialog = null;
                        statictext1 = null;
                        edittext1 = null;
                        group1 = null;
                        button1 = null;
                        button2 = null;
                      };
                    break;
                  case "Array":
                    break;
                  case "Layer":
                  case "Item":
                  case "Property/Effect":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "dropdownlist",
                        undefined,
                        ["null", "", "", ""],
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    if (
                      this.elementBProperty != "" &&
                      this.elementBProperty == null
                    ) {
                      editorDynamicUIContainer.custom_value.selection =
                        editorDynamicUIContainer.custom_value.find("null");
                    }
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        switch (this.selection.text) {
                          case "null":
                            globalObject.elementBProperty = null;
                            break;
                          case "":
                            this.selection = this.find("null");
                            break;
                        }
                      };
                    break;
                  case "Boolean":
                    editorDynamicUIContainer.custom_value =
                      editorDynamicUIContainer.panel.add(
                        "dropdownlist",
                        undefined,
                        ["true", "false"],
                      );
                    editorDynamicUIContainer.custom_value.size = [100, 26];
                    if (this.elementBProperty !== "") {
                      if (this.elementBProperty === 1) {
                        editorDynamicUIContainer.custom_value.selection =
                          editorDynamicUIContainer.custom_value.find("true");
                      }
                      if (this.elementBProperty === 0) {
                        editorDynamicUIContainer.custom_value.selection =
                          editorDynamicUIContainer.custom_value.find("false");
                      }
                    }
                    editorDynamicUIContainer.custom_value.onChange =
                      function () {
                        switch (this.selection.text) {
                          case "true":
                            globalObject.elementBProperty = 1;
                            generateUndoStep();
                            break;
                          case "false":
                            globalObject.elementBProperty = 0;
                            generateUndoStep();
                            break;
                          case "":
                            switch (globalObject.elementBProperty) {
                              case 1:
                                this.selection = this.find("true");
                                break;
                              case 0:
                                this.selection = this.find("false");
                                break;
                            }
                            break;
                        }
                      };
                    break;
                }
                if (
                  this.objectType != "Layer" &&
                  this.objectType != "Item" &&
                  this.objectType != "Property/Effect"
                ) {
                  editorDynamicUIContainer.userPromptCheckBox =
                    editorDynamicUIContainer.panel.add(
                      "checkbox",
                      undefined,
                      "user prompt",
                    );
                  editorDynamicUIContainer.userPromptCheckBox.helpTip =
                    "Open a new window that asks the user to fill this custom value";
                  if (this.userPrompt == true) {
                    editorDynamicUIContainer.userPromptCheckBox.value = true;
                    editorDynamicUIContainer.custom_Prompt =
                      editorDynamicUIContainer.panel.add(
                        "edittext",
                        undefined,
                        undefined,
                      );
                    editorDynamicUIContainer.custom_Prompt.size = [100, 26];
                    if (this.promptText != "") {
                      editorDynamicUIContainer.custom_Prompt.text =
                        this.promptText;
                    }
                    editorDynamicUIContainer.custom_Prompt.onChange =
                      function () {
                        globalObject.promptText = this.text;
                        generateUndoStep();
                      };
                    if (this.objectType == "Text") {
                      editorDynamicUIContainer.userPromptOptionsCheckBox =
                        editorDynamicUIContainer.panel.add(
                          "checkbox",
                          undefined,
                          "options",
                        );
                      editorDynamicUIContainer.userPromptOptionsCheckBox.helpTip =
                        "let the user select from premade options";
                      if (this.userPromptOptions == true) {
                        editorDynamicUIContainer.userPromptOptionsCheckBox.value = true;
                        editorDynamicUIContainer.custom_Prompt_Options =
                          editorDynamicUIContainer.panel.add(
                            "edittext",
                            undefined,
                            undefined,
                          );
                        editorDynamicUIContainer.custom_Prompt_Options.helpTip =
                          "type the options with a comma in between, for example - \'\'option1,option2,option3\'\'";
                        editorDynamicUIContainer.custom_Prompt_Options.size = [
                          100, 26,
                        ];
                        if (this.promptOptions != "") {
                          editorDynamicUIContainer.custom_Prompt_Options.text =
                            this.promptOptions;
                        }
                        editorDynamicUIContainer.custom_Prompt_Options.onChange =
                          function () {
                            var isLegalString = true;
                            var optionsCheck = this.text.split(",");
                            if (
                              optionsCheck.length &&
                              optionsCheck.length > 1
                            ) {
                              for (var i = 0; i < optionsCheck.length; i += 1) {
                                if (optionsCheck[i] === "") {
                                  isLegalString = false;
                                  break;
                                }
                              }
                            } else {
                              isLegalString = false;
                            }
                            if (isLegalString) {
                              globalObject.promptOptions = this.text;
                            } else {
                              this.text = "";
                              alert(
                                "The text entered does not match the requested format, please type the options with a comma in between, for example - \'\'option1,option2,option3\'\'",
                              );
                            }
                            generateUndoStep();
                            isLegalString = null;
                            optionsCheck = null;
                          };
                      }
                      editorDynamicUIContainer.userPromptOptionsCheckBox.onClick =
                        function () {
                          globalObject.promptOptions = "";
                          if (this.value == true) {
                            globalObject.userPromptOptions = true;
                          } else {
                            globalObject.userPromptOptions = false;
                          }
                          refreshUi(refresh_list[0], refresh_list[1]);
                          generateUndoStep();
                        };
                    }
                  }
                  editorDynamicUIContainer.userPromptCheckBox.onClick =
                    function () {
                      globalObject.promptText = "";
                      if (this.value == true) {
                        globalObject.userPrompt = true;
                      } else {
                        globalObject.userPrompt = false;
                      }
                      refreshUi(refresh_list[0], refresh_list[1]);
                      generateUndoStep();
                    };
                }
                break;
            }
          } else {
            if (this.objectType == "Collection") {
              var collectionObjectTypeOptions = [
                "Number",
                "Text",
                "Layer",
                "Item",
                "Property/Effect",
                "Boolean",
              ];
              editorDynamicUIContainer.collectionObjectTypeElement =
                editorDynamicUIContainer.panel.add(
                  "dropdownlist",
                  undefined,
                  [],
                );
              editorDynamicUIContainer.collectionObjectTypeElement.size = [
                65, 26,
              ];
              for (var i = 0; i < objectTypeOptions.length; i += 1) {
                editorDynamicUIContainer.collectionObjectTypeElement.add(
                  "item",
                  collectionObjectTypeOptions[i],
                );
              }
              if (collectionObjectTypeOptions.length > 0) {
                for (var i = 0; i < 5; i += 1) {
                  editorDynamicUIContainer.collectionObjectTypeElement.add(
                    "item",
                    "",
                  );
                }
              }
              collectionObjectTypeOptions = null;
              if (this.elementBType != null) {
                editorDynamicUIContainer.collectionObjectTypeElement.selection =
                  editorDynamicUIContainer.collectionObjectTypeElement.find(
                    this.elementBType,
                  );
                if (
                  editorDynamicUIContainer.collectionObjectTypeElement.find(
                    this.elementBType,
                  ) == null
                ) {
                  editorDynamicUIContainer.collectionObjectTypeElement.selection = 0;
                  this.elementBType =
                    editorDynamicUIContainer.collectionObjectTypeElement.selection.text;
                  this.elementBName = null;
                  this.elementBProperty = "";
                  this.userPrompt = false;
                  this.promptText = "";
                }
              } else {
                editorDynamicUIContainer.collectionObjectTypeElement.selection = 0;
                this.elementBType =
                  editorDynamicUIContainer.collectionObjectTypeElement.selection.text;
                this.elementBName = null;
                this.elementBProperty = "";
                this.userPrompt = false;
                this.promptText = "";
              }
              editorDynamicUIContainer.collectionObjectTypeElement.onChange =
                function () {
                  switch (this.selection.text) {
                    default:
                      globalObject.elementBType = this.selection.text;
                      globalObject.elementBProperty = "";
                      globalObject.elementBName = null;
                      refreshUi(refresh_list[0], refresh_list[1]);
                      break;
                    case "":
                      globalObject.elementBType = this.items[0].text;
                      globalObject.elementBProperty = "";
                      globalObject.elementBName = null;
                      refreshUi(refresh_list[0], refresh_list[1]);
                      break;
                  }
                  generateUndoStep();
                };
            }
          }
          objectTypeOptions = null;
          editorDynamicUIContainer.objectTypeElement.onChange = function () {
            switch (this.selection.text) {
              default:
                globalObject.objectType = this.selection.text;
                globalObject.elementBProperty = "";
                globalObject.elementBName = null;
                globalObject.elementBType = null;
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
              case "":
                globalObject.objectType = this.items[0].text;
                globalObject.elementBProperty = "";
                globalObject.elementBName = null;
                globalObject.elementBType = null;
                refreshUi(refresh_list[0], refresh_list[1]);
                break;
            }
            generateUndoStep();
          };
          if (this.objectType != "Project" && this.objectType != "Collection") {
            editorDynamicUIContainer.elementB.onChange = function () {
              switch (this.selection.text) {
                default:
                  globalObject.elementBName = this.selection.text;
                  globalObject.elementBType = null;
                  globalObject.elementBProperty = "";
                  globalObject.promptText = "";
                  globalObject.userPrompt = false;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
                case "":
                case "custom":
                  globalObject.elementBName = "custom";
                  globalObject.elementBType = globalObject.objectType;
                  globalObject.elementBProperty = "";
                  globalObject.promptText = "";
                  globalObject.userPrompt = false;
                  refreshUi(refresh_list[0], refresh_list[1]);
                  break;
              }
              generateUndoStep();
            };
          }
          editorDynamicUIContainer.del_btn = editorDynamicUIContainer.panel.add(
            "button",
            undefined,
            "\u2716",
          );
          editorDynamicUIContainer.del_btn.helpTip = "Delete";
          editorDynamicUIContainer.del_btn.size = [20, 20];
          editorDynamicUIContainer.del_btn.onClick = function () {
            if (inArray(command, selectedLines)) {
              removeFromArray(command, selectedLines);
              for (var i = 0; i < selectedLines.length; i += 1) {
                if (inArray(selectedLines[i], selectedLines[i].parent.scope)) {
                  selectedLines[i].remove(selectedLines[i]);
                  if (selectedLines[i].parent.scope.length == 0) {
                    selectedLines[i].parent.scopeColor = undefined;
                  }
                }
              }
              selectedLines = [];
            }
            command.remove(command);
            if (command.parent.scope.length == 0) {
              command.parent.scopeColor = undefined;
            }
            refreshUi(refresh_list[0], refresh_list[1]);
            generateUndoStep();
          };
          editorDynamicUIContainer.del_btn.fillBrush =
            editorDynamicUIContainer.del_btn.graphics.newBrush(
              editorDynamicUIContainer.del_btn.graphics.BrushType.SOLID_COLOR,
              buttonBackgroundColor,
            );
          editorDynamicUIContainer.del_btn.textPen =
            editorDynamicUIContainer.del_btn.graphics.newPen(
              editorDynamicUIContainer.del_btn.graphics.PenType.SOLID_COLOR,
              [0.5, 0.3, 0.3, 1],
              5,
            );
          editorDynamicUIContainer.del_btn.onDraw = getGlobalDrawFuncrion(
            0,
            0,
            ButtonStroke,
            2,
            [0.6, 0.6, 0.6, 1],
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseover",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.del_btn.addEventListener(
            "mouseout",
            deleteScriptBtnMouseEventHandler,
            false,
          );
          editorDynamicUIContainer.info_btn =
            editorDynamicUIContainer.panel.add("button", undefined, "\u24a4");
          editorDynamicUIContainer.info_btn.helpTip = "Info";
          editorDynamicUIContainer.info_btn.size = [20, 20];
          editorDynamicUIContainer.info_btn.onClick = function () {
            infoDlg(command.info);
          };
        }
        if (
          this.objectType == "Layer" ||
          this.objectType == "Item" ||
          this.objectType == "Property/Effect" ||
          this.objectType == "Project" ||
          this.objectType == "Collection"
        ) {
          uiVariables.variables.unshift({
            name: this.elementName,
            object: this,
            type: this.objectType,
          });
        } else {
          uiVariables.variables.unshift({
            name: this.elementName,
            object: this,
            type: "Variable",
          });
        }
      };
      var layerProps = [
        new Name(),
        new NameInculde(),
        new NameStartWith(),
        new NameEndWith(),
        new Comment(),
        new ActiveLayerProperty(),
        new EnabledLayerProperty(),
        new AudioEnabledLayerProperty(),
        new SelectedLayerProperty(),
        new IndexSelectedLayerProperty(),
        new FirstSelectedLayerProperty(),
        new LastSelectedLayerProperty(),
        new IndexLayerProperty(),
        new InPointLayerProperty(),
        new OutPointLayerProperty(),
        new StartTimeLayerProperty(),
        new TimeLayerProperty(),
        new LockedLayerProperty(),
        new IsNullLayerProperty(),
        new IsSolidLayerProperty(),
        new IsCameraLayerProperty(),
        new IsLightLayerProperty(),
        new IsShapeLayerProperty(),
        new IsTextLayerProperty(),
        new ParentLayerProperty(),
        new ThisLayerProperty(),
        new ShyLayerProperty(),
        new SoloLayerProperty(),
        new StretchLayerProperty(),
        new Label(),
        new AdjustmentLayerProperty(),
        new MotionBlurLayerProperty(),
        new threeDLayerProperty(),
        new blendingModeLayerProperty(),
        new TrackMatteLayerProperty(),
        new FrameBlendingLayerProperty(),
        new CollapseTransformationLayerProperty(),
        new timeRemapEnabledLayerProperty(),
        new EffectsActiveLayerProperty(),
        new GuideLayerLayerProperty(),
        new HeightLayerProperty(),
        new WidthLayerProperty(),
        new OpacityLayerProperty(),
        new XPositionLayerProperty(),
        new YPositionLayerProperty(),
        new ZPositionLayerProperty(),
        new XAnchorPointLayerProperty(),
        new YAnchorPointLayerProperty(),
        new ZAnchorPointLayerProperty(),
        new ScaleLayerProperty(),
        new XScaleLayerProperty(),
        new YScaleLayerProperty(),
        new ZScaleLayerProperty(),
        new RotationLayerProperty(),
        new XRotationLayerProperty(),
        new YRotationLayerProperty(),
        new ZRotationLayerProperty(),
        new OrientationLayerProperty(),
        new XOrientationLayerProperty(),
        new YOrientationLayerProperty(),
        new ZOrientationLayerProperty(),
        new TimeRemapLayerProperty(),
        new IsDuplicatedLayerProperty(),
        new TextLayerProperty(),
        new TextFontLayerProperty(),
        new TextFontSizeLayerProperty(),
        new TextJustificationLayerProperty(),
        new CameraDepthOfFieldLayerProperty(),
        new CameraZoomLayerProperty(),
        new NumMarkersLayerProperty(),
        new ContainingCompProperty(),
        new SourceLayerProperty(),
        "",
        "",
      ];
      var layerActions = [
        new DeleteLayerAction(),
        new DuplicateLayerAction(),
        new CopyToCompLayerAction(),
        new MoveToBeginningLayerAction(),
        new MoveToEndLayerAction(),
        new MoveAfterLayerAction(),
        new MoveBeforeLayerAction(),
        new RepositionAnchorPointLayerAction(),
        new RemoveAllEffectsLayerAction(),
        new AddEffectLayerAction(),
        new ADDMarkerKeysLayerAction(),
        new DeleteAllMarkerKeysLayerAction(),
        new AddPresetLayerAction(),
        new ReplaceLayerAction(),
        new MoveSelectedKeyframesLayerAction(),
        new MoveAllKeyframesLayerAction(),
        new OffsetSelectedKeyframesLayerAction(),
        new OffsetAllKeyframesLayerAction(),
      ];
      var itemProps = [
        new Name(),
        new NameInculde(),
        new NameStartWith(),
        new NameEndWith(),
        new ExtensionItemProperty(),
        new IdItemProperty(),
        new ParentFolderItemProperty(),
        new SelectedItemProperty(),
        new TypeNameItemProperty(),
        new IsStillItemProperty(),
        new UseProxyItemProperty(),
        new HasAlphaItemProperty(),
        new AlphaModeItemProperty(),
        new LoopItemProperty(),
        new NumLayersItemProperty(),
        new NumMarkersItemProperty(),
        new ThisItemProperty(),
        new Label(),
        new HeightItemProperty(),
        new WidthItemProperty(),
        new DurationItemProperty(),
        new StartTimeCodeItemProperty(),
        new FrameRateItemProperty(),
        new TimeIndicatorItemProperty(),
        new WorkAreaStartItemProperty(),
        new WorkAreaEndItemProperty(),
        new IsMissingItemProperty(),
        new MotionBlurLayerProperty(),
        new IsDuplicatedItemProperty(),
        new ProjectNameItemProperty(),
        new RootFolderItemProperty(),
      ];
      var itemActions = [
        new OpenInViewerAction(),
        new DeleteItemAction(),
        new DuplicateItemAction(),
        new PrecompseMoveItemAction(),
        new PrecompseLeaveItemAction(),
        new AddItemAction(),
        new ReplaceItemAction(),
        new ReplaceItemWithSoildAction(),
        new ReplaceItemWithPlaceholderAction(),
        new AddSolidItemAction(),
        new AddAdjustmentItemAction(),
        new AddNullItemAction(),
        new AddTextItemAction(),
        new AddCameraItemAction(),
        new AddLightItemAction(),
        new AddShapeItemAction(),
        new RenderItemAction(),
        new SendAMEItemAction(),
        new SetProxyItemAction(),
        new UnsetProxyItemAction(),
        new AddVerticalGuideItemAction(),
        new AddHorizontalGuideItemAction(),
        new RemoveAllGuidesItemAction(),
        new CopyAllGuidesItemAction(),
        new ADDMarkerKeysItemAction(),
        new DeleteAllMarkerKeysItemAction(),
      ];
      var effectProps = [
        new Name(),
        new MatchName(),
        new IndexEffectProperty(),
        new EnabledEffectProperty(),
        new SelectedEffectProperty(),
      ];
      var effectActions = [
        new DeleteEffectAction(),
        new MoveToBeginningEffectAction(),
        new MoveToEndEffectAction(),
        new MoveToIndexEffectAction(),
        new DuplicateEffectAction(),
      ];
      var outputModuleProps = [
        new NameOutputModuleProperty(),
        new IndexOutputModuleProperty(),
        new PostRenderOutputModuleProperty(),
      ];
      var outputModuleActions = [
        new DeleteOutputModuleAction(),
        new ApplyTemplateOutputModuleAction(),
        new SaveDestinationFileOutputModuleAction(),
      ];
      var renderQueueItemProps = [
        new EnabledRQItemProperty(),
        new IndexRQItemProperty(),
        new StatusRQItemProperty(),
        new NumOutputsRQItemProperty(),
        new CompRQItemProperty(),
      ];
      var renderQueueItemActins = [
        new DeleteRQItemAction(),
        new DuplicateRQItemAction(),
        new ApplyTemplateByNameAction(),
        new ApplyTemplateFromListAction(),
        new AddOutputRQItemAction(),
      ];
      var markerObjectProps = [
        new MarkerComment(),
        new MarkerAddKeyTime(),
        new MarkerKeyIndex(),
        new MarkerLabel(),
        new MarkerDuration(),
        new MarkerNumKeys(),
      ];
      var markerObjectActions = [
        new AddMarkerKeysAction(),
        new DeleteMarkerKeyAtTimeAction(),
      ];
      var propertyObjectProps = [
        new PropertyName(),
        new PropertyMatchName(),
        new PropertyValue(),
        new PropertyAddKeyTime(),
        new PropertyPropertySelected(),
        new PropertyKeySelected(),
        new PropertykeySpeedIn(),
        new PropertykeySpeedOut(),
        new PropertykeyinfluenceIn(),
        new PropertykeyinfluenceOut(),
        new PropertyKeyIndex(),
        new PropertyExpression(),
        new PropertyExpressionEnabled(),
        new PropertyIsTimeVarying(),
        new PropertyNumKeys(),
        new PropertyThisProperty(),
      ];
      var originalPropertyObjectProps = [
        new PropertyName(),
        new PropertyMatchName(),
        new OriginalPropertyValue(),
        new PropertyAddKeyTime(),
        new PropertyPropertySelected(),
        new PropertyKeySelected(),
        new PropertykeySpeedIn(),
        new PropertykeySpeedOut(),
        new PropertykeyinfluenceIn(),
        new PropertykeyinfluenceOut(),
        new PropertyKeyIndex(),
        new PropertyExpression(),
        new PropertyExpressionEnabled(),
        new PropertyIsTimeVarying(),
        new PropertyNumKeys(),
        new PropertyThisProperty(),
      ];
      var propertyObjectactions = [
        new AddPropertyKeysAction(),
        new DeletePropertyKeyAtTimeAction(),
        new DeletePropertyKeysAction(),
      ];
      var collectionNumberProps = [
        new PropertyCurrentIndex(),
        new CollectionValueVariableProperty("Number"),
        new PropertyCollectionLength(),
        new PropertyCollectionSeparator(),
        new PropertyCollectionPrintAll(),
        new PropertyCollectionPrintAllWithSeparator(),
      ];
      var collectionTextProps = [
        new PropertyCurrentIndex(),
        new CollectionValueVariableProperty("Text"),
        new PropertyCollectionLength(),
        new PropertyCollectionSeparator(),
        new PropertyCollectionJoinedText(),
        new PropertyCollectionPrintAll(),
        new PropertyCollectionPrintAllWithSeparator(),
      ];
      var collectionLayerProps = [
        new PropertyCurrentIndex(),
        new CollectionValueVariableProperty("Layer"),
        new PropertyCollectionLength(),
      ];
      var collectionItemProps = [
        new PropertyCurrentIndex(),
        new CollectionValueVariableProperty("Item"),
        new PropertyCollectionLength(),
      ];
      var collectionPropertyProps = [
        new PropertyCurrentIndex(),
        new CollectionValueVariableProperty("Property/Effect"),
        new PropertyCollectionLength(),
      ];
      var collectionBooleanProps = [
        new PropertyCurrentIndex(),
        new CollectionValueVariableProperty("Boolean"),
        new PropertyCollectionLength(),
        new PropertyCollectionSeparator(),
        new PropertyCollectionPrintAll(),
        new PropertyCollectionPrintAllWithSeparator(),
      ];
      var collectionNumberActions = [
        new AddPropertyElementAction("Number"),
        new AddPropertyElementAtIndexAction("Number"),
        new RemovePropertyElementAction(),
        new RemoveAllElementsAction(),
        new AddNumbersPropertyElementAction("Number"),
      ];
      var collectionTextActions = [
        new AddPropertyElementAction("Text"),
        new AddPropertyElementAtIndexAction("Text"),
        new RemovePropertyElementAction(),
        new RemoveAllElementsAction(),
        new AddLettersPropertyElementAction("Text"),
        new AddWordsPropertyElementAction("Text"),
        new AddLinesPropertyElementAction("Text"),
        new AddLettersBySeparatorElementAction("Text"),
      ];
      var collectionLayerActions = [
        new AddPropertyElementAction("Layer"),
        new AddPropertyElementAtIndexAction("Layer"),
        new RemovePropertyElementAction(),
        new RemoveAllElementsAction(),
      ];
      var collectionItemActions = [
        new AddPropertyElementAction("Item"),
        new AddPropertyElementAtIndexAction("Item"),
        new RemovePropertyElementAction(),
        new RemoveAllElementsAction(),
      ];
      var collectionPropertyActions = [
        new AddPropertyElementAction("Property/Effect"),
        new AddPropertyElementAtIndexAction("Property/Effect"),
        new RemovePropertyElementAction(),
        new RemoveAllElementsAction(),
      ];
      var collectionBooleanActions = [
        new AddPropertyElementAction("Boolean"),
        new AddPropertyElementAtIndexAction("Boolean"),
        new RemovePropertyElementAction(),
        new RemoveAllElementsAction(),
      ];
      var globalVariableNumberProps = [
        new ValueVariableProperty("Number"),
        new RandomMinValueVariableProperty(),
        new RandomMaxValueVariableProperty(),
        new RoundRandomValueVariableProperty(),
      ];
      var globalVariableTextProps = [
        new ValueVariableProperty("Text"),
        new WordTextVariableProperty(),
        new ContainsPartTextVariableProperty(),
        new StartWithContainsPartTextVariableProperty(),
        new EndWithContainsPartTextVariableProperty(),
        new TextLengthVariableProperty(),
        new WordCountVariableProperty(),
      ];
      var globalVariableBooleanProps = [new ValueVariableProperty("Boolean")];
      var globalVariableNumberActions = [
        new RandomizeNumberVariableAction(),
        new RoundNumberVariableAction(),
        new RoundNumberToFrameRateVariableAction(),
        new TextToNumberVariableAction(),
      ];
      var globalVariableTextActions = [
        new ReplacePartTextVariableAction(),
        new ReplaceFirstPartTextVariableAction(),
        new ReplaceLastPartTextVariableAction(),
        new ToUpperCaseVariableAction(),
        new ToLowerCaseVariableAction(),
        new TrimTextVariableAction(),
      ];
      var projectObjectProps = [
        new ProjectName(),
        new BitsPerChannelProjectProperty(),
        new LinearizeWorkingSpaceProjectProperty(),
        new BlendingSpaceProjectProperty(),
        new WorkingSpaceProjectProperty(),
        new WorkingGammaProjectProperty(),
        new TimeDisplayStyleProjectProperty(),
        new RenderQueueNumItems(),
      ];
      var projectObjectActions = [
        new AddCompItemAction(),
        new AddFolderItemAction(),
        new MenuCommandAction(),
        new JavaScriptCodeAction(),
        new RenderProjectAction(),
        new RemoveUnusedFootageProjectAction(),
      ];
      var variableObjectsProps = {};
      variableObjectsProps.layer = { baseObject: new LayerObject() };
      variableObjectsProps.layer.properties =
        variableObjectsProps.layer.baseObject.getProperties();
      variableObjectsProps.layer.object =
        variableObjectsProps.layer.baseObject.getPropertiesObjects();
      variableObjectsProps.layer.propertyType =
        variableObjectsProps.layer.baseObject.getPropertyTypeObject();
      variableObjectsProps.layer.writeProperties =
        variableObjectsProps.layer.baseObject.getWriteProperties();
      variableObjectsProps.layer.propertyOptions =
        variableObjectsProps.layer.baseObject.getPropertyOptionsObject();
      variableObjectsProps.layer.actions =
        variableObjectsProps.layer.baseObject.getActions();
      variableObjectsProps.layer.actionsType =
        variableObjectsProps.layer.baseObject.getActionsTypeObject();
      variableObjectsProps.layer.actionsOptions =
        variableObjectsProps.layer.baseObject.getActionsOptionsObject();
      variableObjectsProps.item = { baseObject: new ItemObject() };
      variableObjectsProps.item.properties =
        variableObjectsProps.item.baseObject.getProperties();
      variableObjectsProps.item.object =
        variableObjectsProps.item.baseObject.getPropertiesObjects();
      variableObjectsProps.item.propertyType =
        variableObjectsProps.item.baseObject.getPropertyTypeObject();
      variableObjectsProps.item.writeProperties =
        variableObjectsProps.item.baseObject.getWriteProperties();
      variableObjectsProps.item.propertyOptions =
        variableObjectsProps.item.baseObject.getPropertyOptionsObject();
      variableObjectsProps.item.actions =
        variableObjectsProps.item.baseObject.getActions();
      variableObjectsProps.item.actionsType =
        variableObjectsProps.item.baseObject.getActionsTypeObject();
      variableObjectsProps.item.actionsOptions =
        variableObjectsProps.item.baseObject.getActionsOptionsObject();
      variableObjectsProps.effect = { baseObject: new EffectObject() };
      variableObjectsProps.effect.properties =
        variableObjectsProps.effect.baseObject.getProperties();
      variableObjectsProps.effect.object =
        variableObjectsProps.effect.baseObject.getPropertiesObjects();
      variableObjectsProps.effect.propertyType =
        variableObjectsProps.effect.baseObject.getPropertyTypeObject();
      variableObjectsProps.effect.writeProperties =
        variableObjectsProps.effect.baseObject.getWriteProperties();
      variableObjectsProps.effect.propertyOptions =
        variableObjectsProps.effect.baseObject.getPropertyOptionsObject();
      variableObjectsProps.effect.actions =
        variableObjectsProps.effect.baseObject.getActions();
      variableObjectsProps.effect.actionsType =
        variableObjectsProps.effect.baseObject.getActionsTypeObject();
      variableObjectsProps.effect.actionsOptions =
        variableObjectsProps.effect.baseObject.getActionsOptionsObject();
      variableObjectsProps.marker = { baseObject: new MarkerObject() };
      variableObjectsProps.marker.properties =
        variableObjectsProps.marker.baseObject.getProperties();
      variableObjectsProps.marker.object =
        variableObjectsProps.marker.baseObject.getPropertiesObjects();
      variableObjectsProps.marker.propertyType =
        variableObjectsProps.marker.baseObject.getPropertyTypeObject();
      variableObjectsProps.marker.writeProperties =
        variableObjectsProps.marker.baseObject.getWriteProperties();
      variableObjectsProps.marker.propertyOptions =
        variableObjectsProps.marker.baseObject.getPropertyOptionsObject();
      variableObjectsProps.marker.actions =
        variableObjectsProps.marker.baseObject.getActions();
      variableObjectsProps.marker.actionsType =
        variableObjectsProps.marker.baseObject.getActionsTypeObject();
      variableObjectsProps.marker.actionsOptions =
        variableObjectsProps.marker.baseObject.getActionsOptionsObject();
      variableObjectsProps.renderQueue = {
        baseObject: new RenderQueueItemObject(),
      };
      variableObjectsProps.renderQueue.properties =
        variableObjectsProps.renderQueue.baseObject.getProperties();
      variableObjectsProps.renderQueue.object =
        variableObjectsProps.renderQueue.baseObject.getPropertiesObjects();
      variableObjectsProps.renderQueue.propertyType =
        variableObjectsProps.renderQueue.baseObject.getPropertyTypeObject();
      variableObjectsProps.renderQueue.writeProperties =
        variableObjectsProps.renderQueue.baseObject.getWriteProperties();
      variableObjectsProps.renderQueue.propertyOptions =
        variableObjectsProps.renderQueue.baseObject.getPropertyOptionsObject();
      variableObjectsProps.renderQueue.actions =
        variableObjectsProps.renderQueue.baseObject.getActions();
      variableObjectsProps.renderQueue.actionsType =
        variableObjectsProps.renderQueue.baseObject.getActionsTypeObject();
      variableObjectsProps.renderQueue.actionsOptions =
        variableObjectsProps.renderQueue.baseObject.getActionsOptionsObject();
      variableObjectsProps.renderQueueItem = {
        baseObject: new OutputModuleObject(),
      };
      variableObjectsProps.renderQueueItem.properties =
        variableObjectsProps.renderQueueItem.baseObject.getProperties();
      variableObjectsProps.renderQueueItem.object =
        variableObjectsProps.renderQueueItem.baseObject.getPropertiesObjects();
      variableObjectsProps.renderQueueItem.propertyType =
        variableObjectsProps.renderQueueItem.baseObject.getPropertyTypeObject();
      variableObjectsProps.renderQueueItem.writeProperties =
        variableObjectsProps.renderQueueItem.baseObject.getWriteProperties();
      variableObjectsProps.renderQueueItem.propertyOptions =
        variableObjectsProps.renderQueueItem.baseObject.getPropertyOptionsObject();
      variableObjectsProps.renderQueueItem.actions =
        variableObjectsProps.renderQueueItem.baseObject.getActions();
      variableObjectsProps.renderQueueItem.actionsType =
        variableObjectsProps.renderQueueItem.baseObject.getActionsTypeObject();
      variableObjectsProps.renderQueueItem.actionsOptions =
        variableObjectsProps.renderQueueItem.baseObject.getActionsOptionsObject();
      variableObjectsProps.property = { baseObject: new PropertyObject() };
      variableObjectsProps.property.properties =
        variableObjectsProps.property.baseObject.getProperties();
      variableObjectsProps.property.object =
        variableObjectsProps.property.baseObject.getPropertiesObjects();
      variableObjectsProps.property.propertyType =
        variableObjectsProps.property.baseObject.getPropertyTypeObject();
      variableObjectsProps.property.writeProperties =
        variableObjectsProps.property.baseObject.getWriteProperties();
      variableObjectsProps.property.propertyOptions =
        variableObjectsProps.property.baseObject.getPropertyOptionsObject();
      variableObjectsProps.property.actions =
        variableObjectsProps.property.baseObject.getActions();
      variableObjectsProps.property.actionsType =
        variableObjectsProps.property.baseObject.getActionsTypeObject();
      variableObjectsProps.property.actionsOptions =
        variableObjectsProps.property.baseObject.getActionsOptionsObject();
      variableObjectsProps.customObject = { baseObject: new CustomObject() };
      variableObjectsProps.customObject.properties =
        variableObjectsProps.customObject.baseObject.getProperties();
      variableObjectsProps.customObject.object =
        variableObjectsProps.customObject.baseObject.getPropertiesObjects();
      variableObjectsProps.customObject.propertyType =
        variableObjectsProps.customObject.baseObject.getPropertyTypeObject();
      variableObjectsProps.customObject.writeProperties =
        variableObjectsProps.customObject.baseObject.getWriteProperties();
      variableObjectsProps.customObject.propertyOptions =
        variableObjectsProps.customObject.baseObject.getPropertyOptionsObject();
      variableObjectsProps.customObject.actions =
        variableObjectsProps.customObject.baseObject.getActions();
      variableObjectsProps.customObject.actionsType =
        variableObjectsProps.customObject.baseObject.getActionsTypeObject();
      variableObjectsProps.customObject.actionsOptions =
        variableObjectsProps.customObject.baseObject.getActionsOptionsObject();
      variableObjectsProps.project = { baseObject: new ProjectObject() };
      variableObjectsProps.project.properties =
        variableObjectsProps.project.baseObject.getProperties();
      variableObjectsProps.project.object =
        variableObjectsProps.project.baseObject.getPropertiesObjects();
      variableObjectsProps.project.propertyType =
        variableObjectsProps.project.baseObject.getPropertyTypeObject();
      variableObjectsProps.project.writeProperties =
        variableObjectsProps.project.baseObject.getWriteProperties();
      variableObjectsProps.project.propertyOptions =
        variableObjectsProps.project.baseObject.getPropertyOptionsObject();
      variableObjectsProps.project.actions =
        variableObjectsProps.project.baseObject.getActions();
      variableObjectsProps.project.actionsType =
        variableObjectsProps.project.baseObject.getActionsTypeObject();
      variableObjectsProps.project.actionsOptions =
        variableObjectsProps.project.baseObject.getActionsOptionsObject();
      variableObjectsProps.variable = {};
      variableObjectsProps.variable.text = {
        baseObject: new GlobalVariableObject(undefined, "Text"),
      };
      variableObjectsProps.variable.text.properties =
        variableObjectsProps.variable.text.baseObject.getProperties();
      variableObjectsProps.variable.text.object =
        variableObjectsProps.variable.text.baseObject.getPropertiesObjects();
      variableObjectsProps.variable.text.propertyType =
        variableObjectsProps.variable.text.baseObject.getPropertyTypeObject();
      variableObjectsProps.variable.text.writeProperties =
        variableObjectsProps.variable.text.baseObject.getWriteProperties();
      variableObjectsProps.variable.text.propertyOptions =
        variableObjectsProps.variable.text.baseObject.getPropertyOptionsObject();
      variableObjectsProps.variable.text.actions =
        variableObjectsProps.variable.text.baseObject.getActions();
      variableObjectsProps.variable.text.actionsType =
        variableObjectsProps.variable.text.baseObject.getActionsTypeObject();
      variableObjectsProps.variable.text.actionsOptions =
        variableObjectsProps.variable.text.baseObject.getActionsOptionsObject();
      variableObjectsProps.variable.number = {
        baseObject: new GlobalVariableObject(undefined, "Number"),
      };
      variableObjectsProps.variable.number.properties =
        variableObjectsProps.variable.number.baseObject.getProperties();
      variableObjectsProps.variable.number.object =
        variableObjectsProps.variable.number.baseObject.getPropertiesObjects();
      variableObjectsProps.variable.number.propertyType =
        variableObjectsProps.variable.number.baseObject.getPropertyTypeObject();
      variableObjectsProps.variable.number.writeProperties =
        variableObjectsProps.variable.number.baseObject.getWriteProperties();
      variableObjectsProps.variable.number.propertyOptions =
        variableObjectsProps.variable.number.baseObject.getPropertyOptionsObject();
      variableObjectsProps.variable.number.actions =
        variableObjectsProps.variable.number.baseObject.getActions();
      variableObjectsProps.variable.number.actionsType =
        variableObjectsProps.variable.number.baseObject.getActionsTypeObject();
      variableObjectsProps.variable.number.actionsOptions =
        variableObjectsProps.variable.number.baseObject.getActionsOptionsObject();
      variableObjectsProps.variable.boolean = {
        baseObject: new GlobalVariableObject(undefined, "Boolean"),
      };
      variableObjectsProps.variable.boolean.properties =
        variableObjectsProps.variable.boolean.baseObject.getProperties();
      variableObjectsProps.variable.boolean.object =
        variableObjectsProps.variable.boolean.baseObject.getPropertiesObjects();
      variableObjectsProps.variable.boolean.propertyType =
        variableObjectsProps.variable.boolean.baseObject.getPropertyTypeObject();
      variableObjectsProps.variable.boolean.writeProperties =
        variableObjectsProps.variable.boolean.baseObject.getWriteProperties();
      variableObjectsProps.variable.boolean.propertyOptions =
        variableObjectsProps.variable.boolean.baseObject.getPropertyOptionsObject();
      variableObjectsProps.variable.boolean.actions =
        variableObjectsProps.variable.boolean.baseObject.getActions();
      variableObjectsProps.variable.boolean.actionsType =
        variableObjectsProps.variable.boolean.baseObject.getActionsTypeObject();
      variableObjectsProps.variable.boolean.actionsOptions =
        variableObjectsProps.variable.boolean.baseObject.getActionsOptionsObject();
      variableObjectsProps.collection = {};
      variableObjectsProps.collection.text = {
        baseObject: new CollectionVariableObject("Text"),
      };
      variableObjectsProps.collection.text.properties =
        variableObjectsProps.collection.text.baseObject.getProperties();
      variableObjectsProps.collection.text.object =
        variableObjectsProps.collection.text.baseObject.getPropertiesObjects();
      variableObjectsProps.collection.text.propertyType =
        variableObjectsProps.collection.text.baseObject.getPropertyTypeObject();
      variableObjectsProps.collection.text.writeProperties =
        variableObjectsProps.collection.text.baseObject.getWriteProperties();
      variableObjectsProps.collection.text.propertyOptions =
        variableObjectsProps.collection.text.baseObject.getPropertyOptionsObject();
      variableObjectsProps.collection.text.actions =
        variableObjectsProps.collection.text.baseObject.getActions();
      variableObjectsProps.collection.text.actionsType =
        variableObjectsProps.collection.text.baseObject.getActionsTypeObject();
      variableObjectsProps.collection.text.actionsOptions =
        variableObjectsProps.collection.text.baseObject.getActionsOptionsObject();
      variableObjectsProps.collection.number = {
        baseObject: new CollectionVariableObject("Number"),
      };
      variableObjectsProps.collection.number.properties =
        variableObjectsProps.collection.number.baseObject.getProperties();
      variableObjectsProps.collection.number.object =
        variableObjectsProps.collection.number.baseObject.getPropertiesObjects();
      variableObjectsProps.collection.number.propertyType =
        variableObjectsProps.collection.number.baseObject.getPropertyTypeObject();
      variableObjectsProps.collection.number.writeProperties =
        variableObjectsProps.collection.number.baseObject.getWriteProperties();
      variableObjectsProps.collection.number.propertyOptions =
        variableObjectsProps.collection.number.baseObject.getPropertyOptionsObject();
      variableObjectsProps.collection.number.actions =
        variableObjectsProps.collection.number.baseObject.getActions();
      variableObjectsProps.collection.number.actionsType =
        variableObjectsProps.collection.number.baseObject.getActionsTypeObject();
      variableObjectsProps.collection.number.actionsOptions =
        variableObjectsProps.collection.number.baseObject.getActionsOptionsObject();
      variableObjectsProps.collection.layer = {
        baseObject: new CollectionVariableObject("Layer"),
      };
      variableObjectsProps.collection.layer.properties =
        variableObjectsProps.collection.layer.baseObject.getProperties();
      variableObjectsProps.collection.layer.object =
        variableObjectsProps.collection.layer.baseObject.getPropertiesObjects();
      variableObjectsProps.collection.layer.propertyType =
        variableObjectsProps.collection.layer.baseObject.getPropertyTypeObject();
      variableObjectsProps.collection.layer.writeProperties =
        variableObjectsProps.collection.layer.baseObject.getWriteProperties();
      variableObjectsProps.collection.layer.propertyOptions =
        variableObjectsProps.collection.layer.baseObject.getPropertyOptionsObject();
      variableObjectsProps.collection.layer.actions =
        variableObjectsProps.collection.layer.baseObject.getActions();
      variableObjectsProps.collection.layer.actionsType =
        variableObjectsProps.collection.layer.baseObject.getActionsTypeObject();
      variableObjectsProps.collection.layer.actionsOptions =
        variableObjectsProps.collection.layer.baseObject.getActionsOptionsObject();
      variableObjectsProps.collection.item = {
        baseObject: new CollectionVariableObject("Item"),
      };
      variableObjectsProps.collection.item.properties =
        variableObjectsProps.collection.item.baseObject.getProperties();
      variableObjectsProps.collection.item.object =
        variableObjectsProps.collection.item.baseObject.getPropertiesObjects();
      variableObjectsProps.collection.item.propertyType =
        variableObjectsProps.collection.item.baseObject.getPropertyTypeObject();
      variableObjectsProps.collection.item.writeProperties =
        variableObjectsProps.collection.item.baseObject.getWriteProperties();
      variableObjectsProps.collection.item.propertyOptions =
        variableObjectsProps.collection.item.baseObject.getPropertyOptionsObject();
      variableObjectsProps.collection.item.actions =
        variableObjectsProps.collection.item.baseObject.getActions();
      variableObjectsProps.collection.item.actionsType =
        variableObjectsProps.collection.item.baseObject.getActionsTypeObject();
      variableObjectsProps.collection.item.actionsOptions =
        variableObjectsProps.collection.item.baseObject.getActionsOptionsObject();
      variableObjectsProps.collection.property = {
        baseObject: new CollectionVariableObject("Property/Effect"),
      };
      variableObjectsProps.collection.property.properties =
        variableObjectsProps.collection.property.baseObject.getProperties();
      variableObjectsProps.collection.property.object =
        variableObjectsProps.collection.property.baseObject.getPropertiesObjects();
      variableObjectsProps.collection.property.propertyType =
        variableObjectsProps.collection.property.baseObject.getPropertyTypeObject();
      variableObjectsProps.collection.property.writeProperties =
        variableObjectsProps.collection.property.baseObject.getWriteProperties();
      variableObjectsProps.collection.property.propertyOptions =
        variableObjectsProps.collection.property.baseObject.getPropertyOptionsObject();
      variableObjectsProps.collection.property.actions =
        variableObjectsProps.collection.property.baseObject.getActions();
      variableObjectsProps.collection.property.actionsType =
        variableObjectsProps.collection.property.baseObject.getActionsTypeObject();
      variableObjectsProps.collection.property.actionsOptions =
        variableObjectsProps.collection.property.baseObject.getActionsOptionsObject();
      variableObjectsProps.collection.boolean = {
        baseObject: new CollectionVariableObject("Boolean"),
      };
      variableObjectsProps.collection.boolean.properties =
        variableObjectsProps.collection.boolean.baseObject.getProperties();
      variableObjectsProps.collection.boolean.object =
        variableObjectsProps.collection.boolean.baseObject.getPropertiesObjects();
      variableObjectsProps.collection.boolean.propertyType =
        variableObjectsProps.collection.boolean.baseObject.getPropertyTypeObject();
      variableObjectsProps.collection.boolean.writeProperties =
        variableObjectsProps.collection.boolean.baseObject.getWriteProperties();
      variableObjectsProps.collection.boolean.propertyOptions =
        variableObjectsProps.collection.boolean.baseObject.getPropertyOptionsObject();
      variableObjectsProps.collection.boolean.actions =
        variableObjectsProps.collection.boolean.baseObject.getActions();
      variableObjectsProps.collection.boolean.actionsType =
        variableObjectsProps.collection.boolean.baseObject.getActionsTypeObject();
      variableObjectsProps.collection.boolean.actionsOptions =
        variableObjectsProps.collection.boolean.baseObject.getActionsOptionsObject();
      var data = {
        categories: [{ customOrder: [], name: "All" }],
        keyboardShortcuts: [],
        order: "Alphabetical order",
        orientation: "vertical",
        run_external_code: false,
        scriptsArray: [],
        scriptsPerRow: 10,
        selectedCategory: 0,
        sizeX: 80,
        sizeY: 28,
        useSizeX: false,
        useSizeY: false,
        version: att_settings.scriptVersion,
      };
      var selectedCategory = { selectedCategory: 0 };
      if (!scriptFile.exists) {
        var copyOldAutomations = false;
        for (var i = compatibleVersions.length - 1; i >= 0; i--) {
          var oldScriptFile = File(
            uiFolder.parent.toString() +
              "/Automation-Toolkit_Automations-Data_v" +
              compatibleVersions[i] +
              ".json",
          );
          if (oldScriptFile.exists) {
            var bool = confirm(
              "Do you want to copy all your automations from Automation Toolkit version " +
                compatibleVersions[i].toString(),
              false,
              "Automation Toolkit Utility",
            );
            if (bool) {
              copyOldAutomations = true;
              if (oldScriptFile.open("r")) {
                try {
                  var jsonObject = JSON.parse(oldScriptFile.read());
                  oldScriptFile.close();
                  data = globalDataToFullObject(jsonObject);
                  data.version = att_settings.scriptVersion;
                } catch (err) {
                  oldScriptFile.close();
                }
              }
              if (isSecurityPrefSet()) {
                if (scriptFile.open("w")) {
                  try {
                    scriptFile.write(
                      JSON.stringify(globalDataToJasonArray(data), null, 4),
                    );
                    scriptFile.close();
                  } catch (err) {
                    scriptFile.close();
                  }
                }
              }
            }
            break;
          }
        }
        if (copyOldAutomations == false) {
          var globalScope1 = new GlobalScope("~New Automation");
          data.scriptsArray = [globalScope1];
          data.categories[0].customOrder.push(0);
          if (isSecurityPrefSet()) {
            if (scriptFile.open("w")) {
              try {
                scriptFile.write(
                  JSON.stringify(globalDataToJasonArray(data), null, 4),
                );
                scriptFile.close();
              } catch (err) {
                scriptFile.close();
              }
            }
          }
        }
      } else {
        if (scriptFile.open("r")) {
          try {
            var backupData = scriptFile.read();
            scriptFile.close();
            var jsonObject = JSON.parse(backupData);
            data = globalDataToFullObject(jsonObject);
            backupData = null;
            jsonObject = null;
          } catch (err) {
            alert(
              "There was a problem loading the settings file (please submit a support ticket)",
            );
            scriptFile.close();
          }
        }
      }
      if (!scriptCategorySelectFile.exists) {
        data.selectedCategory = 0;
        if (scriptCategorySelectFile.open("w")) {
          try {
            scriptCategorySelectFile.write(
              JSON.stringify(selectedCategory, null, 4),
            );
            scriptCategorySelectFile.close();
          } catch (err) {
            scriptCategorySelectFile.close();
          }
        }
      } else {
        if (scriptCategorySelectFile.open("r")) {
          try {
            var jsonObject = AutomationToolkitLicenseObject.JSONify(
              scriptCategorySelectFile.read(),
              "parse",
            );
            scriptCategorySelectFile.close();
            selectedCategory = jsonObject;
            if (!data.categories[selectedCategory.selectedCategory]) {
              selectedCategory.selectedCategory = 0;
            }
            data.selectedCategory = selectedCategory.selectedCategory;
          } catch (err) {
            scriptCategorySelectFile.close();
          }
        }
      }
      if (!checkFileNameIsShortcutFile()) {
        build_main_window(pal);
        if (pal != null && pal instanceof Window) {
          pal.onResize = function () {
            this.layout.resize();
            try {
              window_group.maximumSize[0] =
                pal.size[0] * (1 - 20 / pal.size[0]);
              window_group.maximumSize[1] =
                pal.size[1] * (1 - 20 / pal.size[1]);
              window_group.size[0] = pal.size[0] * (1 - 20 / pal.size[0]);
              window_group.size[1] = pal.size[1] * (1 - 20 / pal.size[1]);
            } catch (err) {}
            try {
            } catch (err) {}
            try {
              pal2.maximumSize[0] = pal.size[0] * (1 - 20 / pal.size[0]);
              pal2.maximumSize[1] = pal.size[1] * (1 - 30 / pal.size[1]);
              pal2.size[0] = pal.size[0] * (1 - 20 / pal.size[0]);
              pal2.size[1] = pal.size[1] * (1 - 30 / pal.size[1]);
            } catch (err) {}
            try {
              groupe03.maximumSize[0] = pal.size[0] * (1 - 40 / pal.size[0]);
              groupe03.maximumSize[1] = pal.size[1] * (1 - 110 / pal.size[1]);
              groupe03.size[0] = pal.size[0] * (1 - 40 / pal.size[0]);
              groupe03.size[1] = pal.size[1] * (1 - 110 / pal.size[1]);
            } catch (err) {}
            try {
              groupe02.maximumSize[0] = pal.size[0] * (1 - 75 / pal.size[0]);
              groupe02.maximumSize[1] = pal.size[1] * (1 - 110 / pal.size[1]);
              groupe02.size[0] = pal.size[0] * (1 - 75 / pal.size[0]);
              groupe02.size[1] = pal.size[1] * (1 - 110 / pal.size[1]);
              group_scroll.maximumSize[1] = groupe02.maximumSize[1];
              group_scroll.size[1] = group_scroll.maximumSize[1];
              for (var i = 0; i < groupe02.children.length; i += 1) {
                groupe02.children[i].location.x = 10 + -1 * scroll_memory_x;
                groupe02.children[i].location.y =
                  10 +
                  i * (groupe02.children[i].size[1] + groupe02.spacing) +
                  -1 * scroll_memory;
              }
            } catch (err) {}
          };
          pal.center();
          pal.show();
        } else {
          pal.layout.layout(true);
          pal.onResize = function () {
            this.layout.resize();
            try {
              window_group.maximumSize[0] =
                pal.size[0] * (1 - 20 / pal.size[0]);
              window_group.maximumSize[1] =
                pal.size[1] * (1 - 20 / pal.size[1]);
              window_group.size[0] = pal.size[0] * (1 - 20 / pal.size[0]);
              window_group.size[1] = pal.size[1] * (1 - 20 / pal.size[1]);
            } catch (err) {}
            try {
            } catch (err) {}
            try {
              pal2.maximumSize[0] = pal.size[0] * (1 - 20 / pal.size[0]);
              pal2.maximumSize[1] = pal.size[1] * (1 - 30 / pal.size[1]);
              pal2.size[0] = pal.size[0] * (1 - 20 / pal.size[0]);
              pal2.size[1] = pal.size[1] * (1 - 30 / pal.size[1]);
            } catch (err) {}
            try {
              groupe03.maximumSize[0] = pal.size[0] * (1 - 40 / pal.size[0]);
              groupe03.maximumSize[1] = pal.size[1] * (1 - 110 / pal.size[1]);
              groupe03.size[0] = pal.size[0] * (1 - 40 / pal.size[0]);
              groupe03.size[1] = pal.size[1] * (1 - 110 / pal.size[1]);
            } catch (err) {}
            try {
              groupe02.maximumSize[0] = pal.size[0] * (1 - 75 / pal.size[0]);
              groupe02.maximumSize[1] = pal.size[1] * (1 - 110 / pal.size[1]);
              groupe02.size[0] = pal.size[0] * (1 - 75 / pal.size[0]);
              groupe02.size[1] = pal.size[1] * (1 - 110 / pal.size[1]);
              group_scroll.maximumSize[1] = groupe02.maximumSize[1];
              group_scroll.size[1] = group_scroll.maximumSize[1];
              for (var i = 0; i < groupe02.children.length; i += 1) {
                groupe02.children[i].location.x = 10 + -1 * scroll_memory_x;
                groupe02.children[i].location.y =
                  10 +
                  i * (groupe02.children[i].size[1] + groupe02.spacing) +
                  -1 * scroll_memory;
              }
            } catch (err) {}
          };
        }
        pal.onClose = function () {
          categoryUI.onChange = null;
          categoryUI = null;
          settingsIconButtons.onClick = null;
          settingsIconButtons = null;
          licenseIconButtons.onClick = null;
          licenseIconButtons = null;
          addScriptBtn.onClick = null;
          addScriptBtn = null;
          for (var i = 0; i < data.scriptsArray.length; i += 1) {
            data.scriptsArray[i].destroy();
            data.scriptsArray[i] = null;
          }
          data.scriptsArray = null;
          data = null;
        };
      } else {
        gearImageData = null;
        gearClickImageData = null;
        settingsSmallIcon = null;
        licenseIcon = null;
        descriptionIcon = null;
        pal = null;
        res = null;
        afterEffectsVersion = null;
        compatibleVersions = null;
        errorMessege = null;
        securityState = null;
        operatingSystem = null;
        editMode = null;
        editModeLoad = null;
        ButtonStroke = null;
        buttonBackgroundColor = null;
        scroll_memory = null;
        scroll_last_trget = null;
        scroll_current_trget = null;
        scroll_minimum_trget = null;
        scroll_maximum_trget = null;
        scroll_memory_x = null;
        optimizeViewEnabled = null;
        globalEnv = null;
        scriptingToolFile = null;
        uiFolder = null;
        data = null;
        selectedCategory = null;
      }
    }
    AutomationToolkitFunction(thisObj);
  }
}
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
    /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
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
AutomationToolkitTool(this);
