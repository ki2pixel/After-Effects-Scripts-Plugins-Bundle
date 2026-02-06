/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function tj_CuttanaNir(thisObj) {
  var mScriptName = "CuttanaNir";
  var mScriptVersion = "1.1";
  var af_settings = {
    helpText:
      "This script is the comprehensive toolkit for creating stroke order animations.\n\nThe Quick Start movie is here.\nhttps://youtu.be/JMhvoy-B4Vc\n\nThe Tutorial movie is here.\nhttps://youtu.be/cVpoozX2OTs\n\nThe Quick Start\nSwitch to \u201cT\u201d. Select the text layer. Click on \u201cSeparate\u201d to separate each letter one at a time from the whole word.\nSwitch to \u201cP\u201d. In the case of a cross, select the four points and click on \u201cCut\u201d to separate one path from the other path! Of course, a two-point split is also possible. Cut the other letters in this way as well.\nSwitch to \u201cS\u201d. Select all letters and click on \u201cSeparate\u201d to split the layers of each path.\nSwitch to \u201cL\u201d. Select one or two starting points and click on \u201cFirst\u201d to get the number for each point. Select the end point in the same way, and click on \u201cCreate\u201d. Now the animation is complete! Work on other letters as well.\nSwitch to \u201cQ\u201d and select the layers. Enter frames for each letter in \u201cName\u201d and frames for each stroke in \u201cStroke\u201d. Click on \u201cSequence\u201d, and the sequence is complete.\n",
    privateNumber: 7747558532084365,
    productSKU: "TJSCN-SUL",
    scriptAuthor: "Terrible Junk Show",
    scriptName: mScriptName,
    scriptURL: "https://aescripts.com/cuttananir/",
    scriptVersion: mScriptVersion,
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
    var mx = __BLOB__BLOB_000042__;
    var wx = __BLOB__BLOB_000043__;
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
  var rtctjwsj109 = new a(af_settings);
  if (rtctjwsj109.c() === true) {
    function CuttanaNirMainFunc(aGbl) {
      function mAddIndexToParts(aPnl) {
        var mElmts = mGetElementsForSettings(aPnl);
        for (var i = 0; i < mElmts.length; i += 1) {
          if (mElmts[i] instanceof Object === true) {
            mElmts[i].mIndexInPnl = i;
          }
        }
      }
      function mGetAllSettings(aPnl, aSecName) {
        var mElmts = mGetElementsForSettings(aPnl);
        var mSecName = aSecName;
        for (var i = 0; i < mElmts.length; i += 1) {
          if (app.settings.haveSetting(mSecName, i) === true) {
            var mSettingTmp = app.settings.getSetting(mSecName, i);
            var mCldTmp = mElmts[i];
            if (
              mCldTmp instanceof Checkbox === true ||
              mCldTmp instanceof RadioButton === true
            ) {
              if (mSettingTmp === "true") {
                mCldTmp.value = true;
              } else {
                if (mSettingTmp === "false") {
                  mCldTmp.value = false;
                }
              }
            } else {
              if (
                mCldTmp instanceof EditText === true ||
                mCldTmp instanceof Button === true
              ) {
                mCldTmp.text = mSettingTmp;
              }
            }
          }
          if (app.settings.haveSetting(mSecName, i + "enabled") === true) {
            var mSettingTmp = app.settings.getSetting(mSecName, i + "enabled");
            var mCldTmp = mElmts[i];
            if (mSettingTmp === "true") {
              mCldTmp.enabled = true;
            } else {
              if (mSettingTmp === "false") {
                mCldTmp.enabled = false;
              }
            }
          }
        }
      }
      function mAddSaveEventOn(aPnl, aSecName) {
        var mElmts = mGetElementsForSettings(aPnl);
        var mSecName = aSecName;
        for (var i = 0; i < mElmts.length; i += 1) {
          var mCldTmp = mElmts[i];
          if (mCldTmp instanceof Checkbox === true) {
            mCldTmp.onClick = function () {
              app.settings.saveSetting(mSecName, this.mIndexInPnl, this.value);
            };
          } else {
            if (mCldTmp instanceof EditText === true) {
              mCldTmp.onChange = function () {
                app.settings.saveSetting(mSecName, this.mIndexInPnl, this.text);
              };
            }
          }
        }
      }
      function mSaveSettingOgl(aParts, aSecName) {
        if (aParts instanceof Checkbox === true) {
          app.settings.saveSetting(aSecName, aParts.mIndexInPnl, aParts.value);
        } else {
          if (
            aParts instanceof EditText === true ||
            aParts instanceof Button === true
          ) {
            app.settings.saveSetting(aSecName, aParts.mIndexInPnl, aParts.text);
          }
        }
      }
      function mSaveSettingRdo(aPartsAry, aSecName) {
        for (var i = 0; i < aPartsAry.length; i += 1) {
          app.settings.saveSetting(
            aSecName,
            aPartsAry[i].mIndexInPnl,
            aPartsAry[i].value,
          );
        }
      }
      function mSaveSettingEnbld(aParts, aSecName) {
        app.settings.saveSetting(
          aSecName,
          aParts.mIndexInPnl + "enabled",
          aParts.enabled,
        );
      }
      function mGetElementsForSettings(aPnl) {
        function mGet(aObj) {
          for (var i = 0; i < aObj.children.length; i += 1) {
            if (
              aObj.children[i] instanceof Group === true ||
              aObj.children[i] instanceof Panel === true
            ) {
              mGet(aObj.children[i]);
            } else {
              mAllElmt.push(aObj.children[i]);
            }
          }
        }
        var mAllElmt = [];
        mGet(aPnl);
        return mAllElmt;
      }
      function mCatchErrorActItm() {
        var mAi = app.project.activeItem;
        if (mAi === null) {
          throw new Error();
        }
      }
      function mCatchErrorActItmNotOnPanel() {
        function mGetActiveItemNotOnPanel() {
          var mAi = app.project.activeItem;
          if (mAi === null) {
            return null;
          }
          if (mAi instanceof CompItem !== true) {
            return null;
          }
          if (mAi.selected === false) {
            return mAi;
          }
          mAi.selected = false;
          mNewAi = app.project.activeItem;
          if (mNewAi === null) {
            mAi.selected = true;
            return null;
          }
          mAi.selected = true;
          return mNewAi;
        }
        var mAi = mGetActiveItemNotOnPanel();
        if (mAi === null) {
          throw new Error();
        }
      }
      function mCatchErrorLyr(aLyrsOrNot) {
        mCatchErrorActItmNotOnPanel();
        var mAi = app.project.activeItem;
        var mSls = mAi.selectedLayers;
        if (aLyrsOrNot === false) {
          if (mSls.length === 0 || mSls.length >= 2) {
            throw new Error();
          }
        } else {
          if (mSls.length < 2) {
            throw new Error();
          }
        }
      }
      function mCatchErrorLyrAtLeastOne() {
        mCatchErrorActItmNotOnPanel();
        var mAi = app.project.activeItem;
        var mSls = mAi.selectedLayers;
        if (mSls.length === 0) {
          throw new Error();
        }
      }
      function mCatchErrorPpty(aLyrsOrNot, aPptysOrNot) {
        mCatchErrorActItmNotOnPanel();
        var mAi = app.project.activeItem;
        var mSls = mAi.selectedLayers;
        if (aLyrsOrNot === false) {
          if (mSls.length === 0 || mSls.length >= 2) {
            throw new Error();
          } else {
            var mSps = mAi.selectedProperties;
            if (aPptysOrNot === false) {
              if (mSps.length === 0 || mSps.length >= 2) {
                throw new Error();
              }
            } else {
              if (mSps.length < 2) {
                throw new Error();
              }
            }
          }
        } else {
          if (mSls.length < 2) {
            throw new Error();
          } else {
            var mSps = mAi.selectedProperties;
            if (aPptysOrNot === false) {
              if (mSps.length === 0 || mSps.length >= 2) {
                throw new Error();
              }
            } else {
              if (mSps.length < 2) {
                throw new Error();
              }
            }
          }
        }
      }
      function mCatchErrorOgl(aToF) {
        if (aToF === true) {
          throw new Error();
        }
      }
      function mConvertFromComp(aLyr, aTgtPt) {
        function mGetRtn(aPt1, aPt2) {
          var mRd = Math.atan2(aPt2[1] - aPt1[1], aPt2[0] - aPt1[0]);
          var mRtn = mRd * (180 / Math.PI);
          return mRtn;
        }
        function mGetRotatedPt(aStdPt, aTgtPt, aRtn) {
          var mLgtRX = aTgtPt[0] - aStdPt[0];
          var mLgtRY = aTgtPt[1] - aStdPt[1];
          var mLgtR = Math.sqrt(Math.pow(mLgtRX, 2) + Math.pow(mLgtRY, 2));
          var mROgl = Math.atan2(mLgtRY, mLgtRX);
          var mRd = aRtn * (Math.PI / 180);
          var mPtR = [
            Math.cos(mROgl + mRd) * mLgtR,
            Math.sin(mROgl + mRd) * mLgtR,
          ];
          return mPtR + aStdPt;
        }
        function mGetCrossPtFromLines(aP1, aP2, aP3, aP4) {
          var mS1 =
            ((aP4[0] - aP3[0]) * (aP1[1] - aP3[1]) -
              (aP4[1] - aP3[1]) * (aP1[0] - aP3[0])) /
            2;
          var mS2 =
            ((aP4[0] - aP3[0]) * (aP3[1] - aP2[1]) -
              (aP4[1] - aP3[1]) * (aP3[0] - aP2[0])) /
            2;
          var mX = aP1[0] + ((aP2[0] - aP1[0]) * mS1) / (mS1 + mS2);
          var mY = aP1[1] + ((aP2[1] - aP1[1]) * mS1) / (mS1 + mS2);
          if (!isFinite(mX) || isNaN(mX) || !isFinite(mY) || isNaN(mY)) {
            mRst = false;
          } else {
            mRst = [mX, mY];
          }
          return mRst;
        }
        if (aLyr.matchName === "ADBE Vector Group") {
          var mVg = aLyr;
          var mLyr = aLyr.propertyGroup(aLyr.propertyDepth);
        } else {
          var mLyr = aLyr;
        }
        var mWidth = mLyr.width;
        var mHeight = mLyr.height;
        var mLU = [0, 0];
        var mRU = [mWidth, 0];
        var mLD = [0, mHeight];
        if (aLyr.matchName === "ADBE Vector Group") {
          mLU = mConvertToComp(mVg, mLU);
          mRU = mConvertToComp(mVg, mRU);
          mLD = mConvertToComp(mVg, mLD);
        } else {
          mLU = mConvertToComp(mLyr, mLU);
          mRU = mConvertToComp(mLyr, mRU);
          mLD = mConvertToComp(mLyr, mLD);
        }
        var mSqrCords = [mLU, mRU, mLD, aTgtPt];
        var mStdPt = mLU.slice();
        for (var i = 0; i < mSqrCords.length; i += 1) {
          mSqrCords[i] = mSqrCords[i] - mStdPt;
        }
        var mRtnDif = mGetRtn([0, 0], mSqrCords[1]);
        for (var i = 1; i < mSqrCords.length; i += 1) {
          mSqrCords[i] = mGetRotatedPt([0, 0], mSqrCords[i], -mRtnDif);
        }
        var mYptForRtn = mGetRotatedPt([0, 0], mSqrCords[2], -90);
        var mRtnDif2 = mGetRtn([0, 0], mYptForRtn);
        if (mRtnDif2 !== 0) {
          var mCrsPt = mGetCrossPtFromLines(
            mSqrCords[3],
            mSqrCords[3] + mSqrCords[2],
            [0, 0],
            [1, 0],
          );
          mSqrCords[2] = mGetRotatedPt([0, 0], mSqrCords[2], -mRtnDif2);
          mSqrCords[3] = mGetRotatedPt(mCrsPt, mSqrCords[3], -mRtnDif2);
        }
        var mUnitVecX = mSqrCords[1][0] / mWidth;
        var mUnitVecY = mSqrCords[2][1] / mHeight;
        var mRatioX = 1 / mUnitVecX;
        var mRatioY = 1 / mUnitVecY;
        var mRstPtX = mSqrCords[3][0] * mRatioX;
        var mRstPtY = mSqrCords[3][1] * mRatioY;
        var mRstPt = [mRstPtX, mRstPtY];
        return mRstPt;
      }
      function mConvertToComp(aLyr, aTgtPt) {
        function mGetRotatedPt(aStdPt, aTgtPt, aRtn) {
          var mLgtRX = aTgtPt[0] - aStdPt[0];
          var mLgtRY = aTgtPt[1] - aStdPt[1];
          var mLgtR = Math.sqrt(Math.pow(mLgtRX, 2) + Math.pow(mLgtRY, 2));
          var mROgl = Math.atan2(mLgtRY, mLgtRX);
          var mRd = aRtn * (Math.PI / 180);
          var mPtR = [
            Math.cos(mROgl + mRd) * mLgtR,
            Math.sin(mROgl + mRd) * mLgtR,
          ];
          return mPtR + aStdPt;
        }
        function mGetSkewedPt(aOriginPt, aVtx, aRtn, aAxis) {
          var mOriginPt = aOriginPt;
          var mVtx = aVtx;
          var mAxis = aAxis;
          var mRtn = aRtn;
          var mRtdXY = mGetRotatedPt(mOriginPt, mVtx, mAxis);
          var mVecXY = mRtdXY - mOriginPt;
          var mRad = mRtn * (Math.PI / 180);
          var mTgt = -Math.tan(mRad);
          var mSkewX = mVecXY[0] + mVecXY[1] * mTgt;
          var mSkwdPt = [mSkewX, mVecXY[1]];
          var mVecFromOrgXY = mSkwdPt + mOriginPt;
          var mRst = mGetRotatedPt(mOriginPt, mVecFromOrgXY, -mAxis);
          return mRst;
        }
        if (aLyr.matchName === "ADBE Vector Group") {
          var mLyr = aLyr.propertyGroup(aLyr.propertyDepth);
        } else {
          var mLyr = aLyr;
        }
        var mAtr = mLyr;
        var mLyrs = [mLyr];
        while (mAtr.parent != null) {
          mLyrs.unshift(mAtr.parent);
          mAtr = mAtr.parent;
        }
        if (aLyr.matchName === "ADBE Vector Group") {
          var mVgPptys = [aLyr];
          for (var i = 1; i <= aLyr.propertyDepth; i += 1) {
            var mPrtPpty = aLyr.propertyGroup(i);
            if (mPrtPpty.matchName === "ADBE Vector Group") {
              mVgPptys.push(mPrtPpty);
            }
          }
          mVgPptys.reverse();
          mLyrs = mLyrs.concat(mVgPptys);
        }
        var mLyrPptys = [];
        for (var i = 0; i < mLyrs.length; i += 1) {
          var mPptysTmp = {};
          mPptysTmp.mAp = mLyrs[i].transform.anchorPoint.value;
          mPptysTmp.mPt = mLyrs[i].transform.position.value;
          mPptysTmp.mScl = mLyrs[i].transform.scale.value;
          mPptysTmp.mRtn = mLyrs[i].transform.Rotation.value;
          if (mLyrs[i].matchName === "ADBE Vector Group") {
            mPptysTmp.mSkwRtn =
              mLyrs[i].transform.property("ADBE Vector Skew").value;
            mPptysTmp.mSkwAxis = mLyrs[i].transform.property(
              "ADBE Vector Skew Axis",
            ).value;
          }
          mLyrPptys.push(mPptysTmp);
        }
        for (var i = 0; i < mLyrPptys.length; i += 1) {
          if (i === 0) {
            var mX = mLyrPptys[0].mPt[0];
            var mY = mLyrPptys[0].mPt[1];
            mLyrPptys[0].mEachPt = [mX, mY];
          } else {
            mX = mX - mLyrPptys[i - 1].mAp[0] + mLyrPptys[i].mPt[0];
            mY = mY - mLyrPptys[i - 1].mAp[1] + mLyrPptys[i].mPt[1];
            mLyrPptys[i].mEachPt = [mX, mY];
          }
        }
        var mTgtX = mX - mLyrPptys[mLyrPptys.length - 1].mAp[0];
        var mTgtY = mY - mLyrPptys[mLyrPptys.length - 1].mAp[1];
        mTgtX = mTgtX + aTgtPt[0];
        mTgtY = mTgtY + aTgtPt[1];
        mLyrPptys.reverse();
        for (var i = 0; i < mLyrPptys.length; i += 1) {
          mVecX = mTgtX - mLyrPptys[i].mEachPt[0];
          mVecY = mTgtY - mLyrPptys[i].mEachPt[1];
          var mScldX = mVecX * (mLyrPptys[i].mScl[0] / 100);
          var mScldY = mVecY * (mLyrPptys[i].mScl[1] / 100);
          mTgtX = mLyrPptys[i].mEachPt[0] + mScldX;
          mTgtY = mLyrPptys[i].mEachPt[1] + mScldY;
          if (
            mLyrPptys[i].mSkwRtn !== undefined &&
            mLyrPptys[i].mSkwRtn !== 0
          ) {
            var mNewSkwdPt = mGetSkewedPt(
              mLyrPptys[i].mEachPt,
              [mTgtX, mTgtY],
              mLyrPptys[i].mSkwRtn,
              mLyrPptys[i].mSkwAxis,
            );
            mTgtX = mNewSkwdPt[0];
            mTgtY = mNewSkwdPt[1];
          }
          var mNewRtdPt = mGetRotatedPt(
            mLyrPptys[i].mEachPt,
            [mTgtX, mTgtY],
            mLyrPptys[i].mRtn,
          );
          mTgtX = mNewRtdPt[0];
          mTgtY = mNewRtdPt[1];
        }
        return [mTgtX, mTgtY];
      }
      function mConvertExpStrToStr(aExpStr, aDeleteLinebreak) {
        function mCutString(aTgtTxt, aTxtF, aTxtL) {
          var mIdx1 = aTgtTxt.indexOf(aTxtF);
          if (aTxtL === undefined) {
            var mIdx2 = aTgtTxt.length - 1;
          } else {
            var mIdx2 = aTgtTxt.lastIndexOf(aTxtL);
          }
          var mRst = aTgtTxt.slice(mIdx1 + 1, mIdx2);
          return mRst;
        }
        var mExpStr = aExpStr;
        var mDeleteLinebreak = aDeleteLinebreak;
        if (mDeleteLinebreak === true) {
          var mRegExpLiteral1 = /\/\/.*\n/g;
          mExpStr = mExpStr.replace(mRegExpLiteral1, "\n");
          var mRegExpLiteral2 = /\n[\t\s]*/g;
          mExpStr = mExpStr.replace(mRegExpLiteral2, "");
        } else {
          mExpStr = mCutString(mExpStr, "\n");
          var mRegExpLiteral1 = /^[\t\s]+/;
          var mBlank = mExpStr.match(mRegExpLiteral1);
          if (mBlank !== null) {
            mExpStr = mExpStr.replace(mBlank[0], "");
            var mRegExp2 = new RegExp("\n" + mBlank[0], "g");
            mExpStr = mExpStr.replace(mRegExp2, "\n");
          }
        }
        return mExpStr;
      }
      function mGetSelVtxIdxs(aSp) {
        function mDetectVtxs(mAllVtx, mNoUseVtx, aDp) {
          var mbucketForVtx = new Array(mAllVtx.length);
          var mCnt = 0;
          for (var i = 0; i < mNoUseVtx.length; i += 1) {
            var mTgtVtx = mNoUseVtx[i];
            while (mCnt < mAllVtx.length) {
              var mCprVtx = mAllVtx[mCnt];
              if (mMatch(mTgtVtx, mCprVtx, aDp) == true) {
                mbucketForVtx.splice(mCnt, 1, true);
                mCnt++;
                break;
              } else {
                mCnt++;
              }
            }
          }
          var mRstIdxsAry = [];
          for (var i = 0; i < mbucketForVtx.length; i += 1) {
            if (mbucketForVtx[i] == undefined) {
              mRstIdxsAry.push(i);
            }
          }
          return mRstIdxsAry;
        }
        var mSp = aSp;
        if (mSp.matchName !== "ADBE Vector Shape - Group") {
          return null;
        }
        app.beginUndoGroup("GetSelVtxPre");
        var mSl = mSp.propertyGroup(mSp.propertyDepth);
        if (mSl.position.numKeys === 0) {
          mSl.position.setValue([10000, 10000]);
        } else {
          mSl.position.setValueAtTime(
            app.project.activeItem.time,
            [10000, 10000],
          );
        }
        var mAllVtx = mSp.path.value.vertices;
        app.beginSuppressDialogs();
        app.executeCommand(21);
        app.endSuppressDialogs(false);
        if (isValid(mSp) == false) {
          var mNoUseVtx = [];
        } else {
          var mNoUseVtx = mSp.path.value.vertices;
        }
        app.endUndoGroup();
        app.executeCommand(16);
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSp = mSl.selectedProperties[0];
        var mIdxNumToFind = mAllVtx.length - mNoUseVtx.length;
        var mRstIdxsAry = mDetectVtxs(mAllVtx, mNoUseVtx, 2);
        if (mRstIdxsAry.length == mIdxNumToFind) {
        } else {
          mRstIdxsAry = mDetectVtxs(mAllVtx, mNoUseVtx, 1);
        }
        if (mRstIdxsAry.length == mIdxNumToFind) {
        } else {
          mRstIdxsAry = null;
        }
        app.beginUndoGroup("GetSelectedVertex");
        var mCmt = mSl.comment;
        mSl.comment = "";
        mSl.comment = mCmt;
        app.endUndoGroup();
        clearOutput();
        return mRstIdxsAry;
      }
      function mGetSelVtxObjAry(aSps) {
        var mSps = aSps;
        for (var i = 0; i < mSps.length; i += 1) {
          if (mSps[i].matchName !== "ADBE Vector Shape - Group") {
            return null;
          }
        }
        app.beginUndoGroup("getSelVtxPre");
        var mSl = mSps[0].propertyGroup(mSps[0].propertyDepth);
        if (mSl.position.numKeys === 0) {
          mSl.position.setValue([10000, 10000]);
        } else {
          mSl.position.setValueAtTime(
            app.project.activeItem.time,
            [10000, 10000],
          );
        }
        var mAllVtxs = [];
        for (var i = 0; i < mSps.length; i += 1) {
          var mAllVtx = mSps[i].path.value.vertices;
          mAllVtxs.push(mAllVtx);
        }
        app.beginSuppressDialogs();
        app.executeCommand(21);
        app.endSuppressDialogs(false);
        var mNoUseVtxs = [];
        for (var i = 0; i < mSps.length; i += 1) {
          if (isValid(mSps[i]) == false) {
            var mNoUseVtx = [];
          } else {
            var mNoUseVtx = mSps[i].path.value.vertices;
          }
          mNoUseVtxs.push(mNoUseVtx);
        }
        app.endUndoGroup();
        app.executeCommand(16);
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSpsTmp = mSl.selectedProperties;
        var mSps = [];
        for (var i = 0; i < mSpsTmp.length; i += 1) {
          if (mSpsTmp[i].matchName === "ADBE Vector Shape - Group") {
            mSps.push(mSpsTmp[i]);
          }
        }
        var mRstIdxsArys = [];
        for (var k = 0; k < mSps.length; k += 1) {
          function mDetectVtxs(mAllVtx, mNoUseVtx, aDp) {
            var mbucketForVtx = new Array(mAllVtx.length);
            var mCnt = 0;
            for (var i = 0; i < mNoUseVtx.length; i += 1) {
              var mTgtVtx = mNoUseVtx[i];
              while (mCnt < mAllVtx.length) {
                var mCprVtx = mAllVtx[mCnt];
                if (mMatch(mTgtVtx, mCprVtx, aDp) == true) {
                  mbucketForVtx.splice(mCnt, 1, true);
                  mCnt++;
                  break;
                } else {
                  mCnt++;
                }
              }
            }
            var mRstIdxsAry = [];
            for (var i = 0; i < mbucketForVtx.length; i += 1) {
              if (mbucketForVtx[i] == undefined) {
                mRstIdxsAry.push(i);
              }
            }
            return mRstIdxsAry;
          }
          var mSp = mSps[k];
          var mAllVtx = mAllVtxs[k];
          var mNoUseVtx = mNoUseVtxs[k];
          var mIdxNumToFind = mAllVtx.length - mNoUseVtx.length;
          var mRstIdxsAry = mDetectVtxs(mAllVtx, mNoUseVtx, 2);
          if (mRstIdxsAry.length == mIdxNumToFind) {
          } else {
            mRstIdxsAry = mDetectVtxs(mAllVtx, mNoUseVtx, 1);
          }
          if (mRstIdxsAry.length == mIdxNumToFind) {
          } else {
            mRstIdxsAry = null;
          }
          mRstIdxsArys.push(mRstIdxsAry);
        }
        var mIdxBox = [];
        for (var k = 0; k < mSps.length; k += 1) {
          var mSp = mSps[k];
          var mRstIdxsAry = mRstIdxsArys[k];
          if (mRstIdxsAry == undefined) {
            var mPointsObj = undefined;
          } else {
            var mPointsObj = new mCreatePoints();
            for (var i = 0; i < mRstIdxsAry.length; i += 1) {
              var mRstNum = mRstIdxsAry[i];
              var mPointInfoObj = new mCreatePointInfoObj();
              mPointInfoObj.mIdx = mRstNum;
              mPointInfoObj.mVtx = mSp.path.value.vertices[mRstNum];
              mPointInfoObj.mIn = mSp.path.value.inTangents[mRstNum];
              mPointInfoObj.mOut = mSp.path.value.outTangents[mRstNum];
              mPointsObj.points.push(mPointInfoObj);
            }
          }
          mIdxBox.push(mPointsObj);
        }
        app.beginUndoGroup("GetSelectedVertex");
        var mSl = app.project.activeItem.selectedLayers[0];
        var mCmt = mSl.comment;
        mSl.comment = "";
        mSl.comment = mCmt;
        app.endUndoGroup();
        clearOutput();
        return mIdxBox;
      }
      function mGetSelVtxIdxsForMaskOrShape(aSp) {
        function mDetectVtxs(mAllVtx, mNoUseVtx, aDp) {
          var mbucketForVtx = new Array(mAllVtx.length);
          var mCnt = 0;
          for (var i = 0; i < mNoUseVtx.length; i += 1) {
            var mTgtVtx = mNoUseVtx[i];
            while (mCnt < mAllVtx.length) {
              var mCprVtx = mAllVtx[mCnt];
              if (mMatch(mTgtVtx, mCprVtx, aDp) == true) {
                mbucketForVtx.splice(mCnt, 1, true);
                mCnt++;
                break;
              } else {
                mCnt++;
              }
            }
          }
          var mRstIdxsAry = [];
          for (var i = 0; i < mbucketForVtx.length; i += 1) {
            if (mbucketForVtx[i] == undefined) {
              mRstIdxsAry.push(i);
            }
          }
          return mRstIdxsAry;
        }
        var mSp = aSp;
        if (
          mSp.matchName !== "ADBE Vector Shape - Group" &&
          mSp.matchName !== "ADBE Mask Atom"
        ) {
          return null;
        }
        app.beginUndoGroup("GetSelVtxPre");
        var mSl = mSp.propertyGroup(mSp.propertyDepth);
        if (mSl.position.numKeys === 0) {
          mSl.position.setValue([10000, 10000]);
        } else {
          mSl.position.setValueAtTime(
            app.project.activeItem.time,
            [10000, 10000],
          );
        }
        if (mSp.matchName === "ADBE Mask Atom") {
          var mAllVtx = mSp.property("ADBE Mask Shape").value.vertices;
        } else {
          if (mSp.matchName === "ADBE Vector Shape - Group") {
            var mAllVtx = mSp.property("ADBE Vector Shape").value.vertices;
          }
        }
        app.beginSuppressDialogs();
        app.executeCommand(21);
        app.endSuppressDialogs(false);
        if (isValid(mSp) == false) {
          var mNoUseVtx = [];
        } else {
          if (mSp.matchName === "ADBE Mask Atom") {
            var mNoUseVtx = mSp.property("ADBE Mask Shape").value.vertices;
          } else {
            if (mSp.matchName === "ADBE Vector Shape - Group") {
              var mNoUseVtx = mSp.property("ADBE Vector Shape").value.vertices;
            }
          }
        }
        app.endUndoGroup();
        app.executeCommand(16);
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSp = mSl.selectedProperties[0];
        var mIdxNumToFind = mAllVtx.length - mNoUseVtx.length;
        var mRstIdxsAry = mDetectVtxs(mAllVtx, mNoUseVtx, 2);
        if (mRstIdxsAry.length == mIdxNumToFind) {
        } else {
          mRstIdxsAry = mDetectVtxs(mAllVtx, mNoUseVtx, 1);
        }
        if (mRstIdxsAry.length == mIdxNumToFind) {
        } else {
          mRstIdxsAry = null;
        }
        app.beginUndoGroup("GetSelectedVertex");
        var mCmt = mSl.comment;
        mSl.comment = "";
        mSl.comment = mCmt;
        app.endUndoGroup();
        clearOutput();
        return mRstIdxsAry;
      }
      function mMatch(aVtx1, aVtx2, aDp) {
        function mChk4And5(aFig1, aFig2, aDp) {
          var mFig1 = aFig1 * Math.pow(10, aDp);
          mFig1 = Math.floor(mFig1);
          mFig1 = mFig1.toString();
          mFig1 = mFig1.slice(-1);
          Number(mFig1);
          var mFig2 = aFig2 * Math.pow(10, aDp);
          mFig2 = Math.floor(mFig2);
          mFig2 = mFig2.toString();
          mFig2 = mFig2.slice(-1);
          Number(mFig2);
          if ((mFig1 == 4 && mFig2 == 5) || (mFig1 == 5 && mFig2 == 4)) {
            return true;
          } else {
            return false;
          }
        }
        function mRound(aFigure, aDp) {
          var mDp10 = Math.pow(10, aDp - 1);
          var mRst = Math.round(aFigure * mDp10) / mDp10;
          return mRst;
        }
        function mFloor(aFigure, aDp) {
          var mDp10 = Math.pow(10, aDp - 1);
          var mRst = Math.floor(aFigure * mDp10) / mDp10;
          return mRst;
        }
        var mXChk4And5 = mChk4And5(aVtx1[0], aVtx2[0], aDp);
        if (mXChk4And5 == false) {
          var mXMacth = mRound(aVtx1[0], aDp) == mRound(aVtx2[0], aDp);
        } else {
          var mXMacthTmp1 = mRound(aVtx1[0], aDp) == mRound(aVtx2[0], aDp);
          var mXMacthTmp2 = mFloor(aVtx1[0], aDp) == mFloor(aVtx2[0], aDp);
          if (mXMacthTmp1 == true || mXMacthTmp2 == true) {
            var mXMacth = true;
          } else {
            var mXMacth = false;
          }
        }
        var mYChk4And5 = mChk4And5(aVtx1[1], aVtx2[1], aDp);
        if (mYChk4And5 == false) {
          var mYMacth = mRound(aVtx1[1], aDp) == mRound(aVtx2[1], aDp);
        } else {
          var mYMacthTmp1 = mRound(aVtx1[1], aDp) == mRound(aVtx2[1], aDp);
          var mYMacthTmp2 = mFloor(aVtx1[1], aDp) == mFloor(aVtx2[1], aDp);
          if (mYMacthTmp1 == true || mYMacthTmp2 == true) {
            var mYMacth = true;
          } else {
            var mYMacth = false;
          }
        }
        if (mXMacth == true && mYMacth == true) {
          return true;
        } else {
          return false;
        }
      }
      function mCreatePoints() {
        this.points = [];
        this.check = false;
      }
      function mCreatePointInfoObj() {
        this.mIdx;
        this.mVtx;
        this.mIn;
        this.mOut;
      }
      function mGetSelPptyAdrs(aSp) {
        var mSp = aSp;
        var mAdrs = [];
        for (var i = mSp.propertyDepth; i >= 1; i--) {
          var mPropTmp = mSp.propertyGroup(i);
          if (i === mSp.propertyDepth) {
            mAdrs.push(mSp.propertyGroup(mSp.propertyDepth));
          } else {
            mAdrs.push(mPropTmp.propertyIndex);
          }
        }
        mAdrs.push(mSp.propertyIndex);
        return mAdrs;
      }
      function mGetSelPptyAdrsName(aSp) {
        var mSp = aSp;
        var mAdrs = [];
        for (var i = mSp.propertyDepth; i >= 1; i--) {
          var mPropTmp = mSp.propertyGroup(i);
          if (i === mSp.propertyDepth) {
            mAdrs.push(mSp.propertyGroup(mSp.propertyDepth));
          } else {
            mAdrs.push(mPropTmp.name);
          }
        }
        mAdrs.push(mSp.name);
        return mAdrs;
      }
      function mGetSelPptyAdrsExact(aProp) {
        var mProp = aProp;
        var mAdrs = [];
        for (var i = mProp.propertyDepth; i >= 1; i--) {
          var mPropTmp = mProp.propertyGroup(i);
          if (i === mProp.propertyDepth) {
            mAdrs.push(mSp.propertyGroup(mSp.propertyDepth));
          } else {
            var mPrtPropTypeTmp = mPropTmp.propertyGroup(1).propertyType;
            if (mPrtPropTypeTmp === PropertyType.INDEXED_GROUP) {
              mAdrs.push(mPropTmp.name);
            } else if (mPrtPropTypeTmp === PropertyType.NAMED_GROUP) {
              mAdrs.push(mPropTmp.propertyIndex);
            } else {
              if (mPrtPropTypeTmp === PropertyType.PROPERTY) {
                mAdrs.push(mPropTmp.propertyIndex);
              }
            }
          }
        }
        var mPrtPropType = mProp.propertyGroup(1).propertyType;
        if (mPrtPropType === PropertyType.INDEXED_GROUP) {
          mAdrs.push(mProp.name);
        } else if (mPrtPropType === PropertyType.NAMED_GROUP) {
          mAdrs.push(mProp.propertyIndex);
        } else {
          if (mPrtPropType === PropertyType.PROPERTY) {
            mAdrs.push(mProp.propertyIndex);
          }
        }
        return mAdrs;
      }
      function mGetPptyFromAdrs(aAdrs, aNum) {
        var mAdrs = aAdrs;
        var mSpfydPpty = aAdrs[0];
        for (var i = 1; i < mAdrs.length - aNum; i += 1) {
          mSpfydPpty = mSpfydPpty(mAdrs[i]);
        }
        return mSpfydPpty;
      }
      function mMoveTo(aPpty, aNum, aAdrs) {
        var mPptyDpt = aPpty.propertyDepth;
        var mSelPptyIdx = aAdrs[mPptyDpt];
        var mTgtPptyIdx = aPpty.propertyIndex;
        if (mSelPptyIdx < mTgtPptyIdx && aNum <= mSelPptyIdx) {
          aAdrs[mPptyDpt] = aAdrs[mPptyDpt] + 1;
        } else if (mSelPptyIdx > mTgtPptyIdx && aNum > mSelPptyIdx) {
          aAdrs[mPptyDpt] = aAdrs[mPptyDpt] - 1;
        } else {
          if (mSelPptyIdx === mTgtPptyIdx) {
            aAdrs[mPptyDpt] = aNum;
          }
        }
        aPpty.moveTo(aNum);
      }
      function mConvertExpStrToStr(aExpStr, aDeleteLinebreak) {
        function mCutString(aTgtTxt, aTxtF, aTxtL) {
          var mIdx1 = aTgtTxt.indexOf(aTxtF);
          if (aTxtL === undefined) {
            var mIdx2 = aTgtTxt.length - 1;
          } else {
            var mIdx2 = aTgtTxt.lastIndexOf(aTxtL);
          }
          var mRst = aTgtTxt.slice(mIdx1 + 1, mIdx2);
          return mRst;
        }
        var mExpStr = aExpStr;
        var mDeleteLinebreak = aDeleteLinebreak;
        if (mDeleteLinebreak === true) {
          var mRegExpLiteral1 = /\/\/.*\n/g;
          mExpStr = mExpStr.replace(mRegExpLiteral1, "\n");
          var mRegExpLiteral2 = /\n[\t\s]*/g;
          mExpStr = mExpStr.replace(mRegExpLiteral2, "");
        } else {
          mExpStr = mCutString(mExpStr, "\n");
          var mRegExpLiteral1 = /^[\t\s]+/;
          var mBlank = mExpStr.match(mRegExpLiteral1);
          if (mBlank !== null) {
            mExpStr = mExpStr.replace(mBlank[0], "");
            var mRegExp2 = new RegExp("\n" + mBlank[0], "g");
            mExpStr = mExpStr.replace(mRegExp2, "\n");
          }
        }
        return mExpStr;
      }
      function mGetTimeFromEtStr(aStr, aAi, aTCorF) {
        var mAi = aAi;
        var mTxt = aStr;
        var mTCorF = aTCorF;
        var mTdtFRAMESorNot = false;
        if (app.project.timeDisplayType === TimeDisplayType.FRAMES) {
          app.project.timeDisplayType = TimeDisplayType.TIMECODE;
          mTdtFRAMESorNot = true;
        }
        if (mTCorF === true) {
          var mTimeTmp = mTCtoT(mTxt, mAi);
        } else {
          var mTimeTmp = mFtoT(mTxt, mAi);
        }
        if (mTdtFRAMESorNot === true) {
          app.project.timeDisplayType = TimeDisplayType.FRAMES;
        }
        return mTimeTmp;
      }
      function mConvertTime(aStr, aAi, aTCorF) {
        var mAi = aAi;
        var mTxt = aStr;
        var mTCorF = aTCorF;
        var mTdtFRAMESorNot = false;
        if (app.project.timeDisplayType == TimeDisplayType.FRAMES) {
          app.project.timeDisplayType = TimeDisplayType.TIMECODE;
          mTdtFRAMESorNot = true;
        }
        if (mTCorF === true) {
          var mTimeTmp = mTCtoT(mTxt, mAi);
          mTimeTmp = mTtoF(mTimeTmp, mAi);
        } else {
          var mTimeTmp = mFtoT(mTxt, mAi);
          mTimeTmp = mTtoTC(mTimeTmp, mAi);
        }
        if (mTdtFRAMESorNot === true) {
          app.project.timeDisplayType = TimeDisplayType.FRAMES;
        }
        return mTimeTmp;
      }
      function mTCtoT(aTC, aAi) {
        var mAi = aAi;
        var mFps = mAi.frameRate;
        var mFdtn = mAi.frameDuration;
        var RstT = currentFormatToTime(aTC, mFps);
        return RstT;
      }
      function mTtoTC(aT, aAi) {
        var mAi = aAi;
        var mFps = mAi.frameRate;
        var mFdtn = mAi.frameDuration;
        var RstTC = timeToCurrentFormat(aT, mFps);
        return RstTC;
      }
      function mFtoT(aF, aAi) {
        var mAi = aAi;
        var mFps = mAi.frameRate;
        var mFdtn = mAi.frameDuration;
        var mF = parseFloat(aF);
        if (isNaN(mF) === true) {
          mF = 0;
        }
        var RstT = mFdtn * mF;
        return RstT;
      }
      function mTtoF(aT, aAi) {
        var mAi = aAi;
        var mFps = mAi.frameRate;
        var mFdtn = mAi.frameDuration;
        var RstF = Math.round(aT / mFdtn);
        return RstF;
      }
      function createUI(aObj) {
        var mPorW =
          aObj instanceof Panel
            ? aObj
            : new Window("palette", mScriptName, [0, 0, 210, 280]);
        mPorW.mTbp = mPorW.add(
          "panel { type : \'tabbedpanel\' , bounds : [0,0,200,270] , location : [5,5] , \n    mTbTxt : Panel{ type : \'tab\' , text : \'T\' } \n    mTbPth : Panel{ type : \'tab\' , text : \'P\' } \n    mTbShp : Panel{ type : \'tab\' , text : \'S\' } \n    mTbLine : Panel{ type : \'tab\' , text : \'L\' } \n    mTbScr : Panel{ type : \'tab\' , text : \'Q\' } }",
        );
        mPorW.mTbp.mTbTxt.add(
          "panel { bounds : [0,0,180,0] , location : [10,0] }",
        );
        mPorW.mTbp.mTbPth.add(
          "panel { bounds : [0,0,180,0] , location : [10,0] }",
        );
        mPorW.mTbp.mTbShp.add(
          "panel { bounds : [0,0,180,0] , location : [10,0] }",
        );
        mPorW.mTbp.mTbLine.add(
          "panel { bounds : [0,0,180,0] , location : [10,0] }",
        );
        mPorW.mTbp.mTbScr.add(
          "panel { bounds : [0,0,180,0] , location : [10,0] }",
        );
        mPorW.mBtSepTxt = mPorW.mTbp.mTbTxt.add(
          "button { bounds : [0,0,60,20] , location : [10,10] , text : \'Separate\' }",
        );
        mPorW.mTbp.mTbTxt.add(
          "panel { bounds : [0,0,10,0] , location : [75,20] }",
        );
        mPorW.mCbCtr = mPorW.mTbp.mTbTxt.add(
          "checkbox { bounds : [0,0,100,20] , location : [90,10] , text : \'Center Ap\' }",
        );
        mPorW.mCbCtr.value = true;
        mPorW.mCbPcp = mPorW.mTbp.mTbTxt.add(
          "checkbox { bounds : [0,0,85,20] , location : [90,30] , text : \'PreComp\' }",
        );
        mPorW.mCbPcp.value = true;
        mPorW.mCbShare = mPorW.mTbp.mTbTxt.add(
          "checkbox { bounds : [0,0,85,20] , location : [110,50] , text : \'Share\' }",
        );
        mPorW.mCbShare.value = true;
        mPorW.mStMgn = mPorW.mTbp.mTbTxt.add(
          "statictext { bounds : [0,0,85,20] , location : [110,70] , text : \'Margin\' }",
        );
        mPorW.mEtMgn = mPorW.mTbp.mTbTxt.add(
          "edittext { bounds : [0,0,30,20] , location : [150,70] , text : \'20\' }",
        );
        mPorW.mBtHelpUI = mPorW.mTbp.mTbTxt.add(
          "button { bounds : [0,0,20,20] , location : [170,210] , text : \'?\' }",
        );
        mPorW.mBtHelpUI.onClick = function () {
          rtctjwsj109.helpUI();
        };
        mPorW.mGpMgeTxt = mPorW.mTbp.mTbTxt.add(
          "group { bounds : [0,0,100,100] , location : [90,90] }",
        );
        mPorW.mCbMgeTxt = mPorW.mGpMgeTxt.add(
          "checkbox { bounds : [0,0,100,20] , location : [0,0] , text : \'Marge Vtx\' }",
        );
        mPorW.mCbMgeTxt.value = true;
        mPorW.mRbMgeTxtAuto = mPorW.mGpMgeTxt.add(
          "radiobutton { bounds : [0,0,85,20] , location : [20,20] , text : \'Auto\' }",
        );
        mPorW.mRbMgeTxtAuto.value = true;
        mPorW.mRbMgeTxtLim = mPorW.mGpMgeTxt.add(
          "radiobutton { bounds : [0,0,85,20] , location : [20,40] , text : \'Lim.\' }",
        );
        mPorW.mEtMgeTxtLim = mPorW.mGpMgeTxt.add(
          "edittext { bounds : [0,0,30,20] , location : [60,40] , text : \'1\' }",
        );
        mPorW.mBtCut = mPorW.mTbp.mTbPth.add(
          "button { bounds : [0,0,60,20] , location : [10,10] , text : \'Cut\' }",
        );
        mPorW.mTbp.mTbPth.add(
          "panel { bounds : [0,0,10,0] , location : [75,20] }",
        );
        mPorW.mCbSmt1 = mPorW.mTbp.mTbPth.add(
          "checkbox { bounds : [0,0,60,20] , location : [90,10] , text : \'Smooth\' }",
        );
        mPorW.mCbWithMge = mPorW.mTbp.mTbPth.add(
          "checkbox { bounds : [0,0,80,20] , location : [90,30] , text : \'& Marge\' }",
        );
        mPorW.mBtPat = mPorW.mTbp.mTbPth.add(
          "button { bounds : [0,0,60,20] , location : [10,30] , text : \'Patch\' }",
        );
        mPorW.mBtMge = mPorW.mTbp.mTbPth.add(
          "button { bounds : [0,0,60,20] , location : [10,50] , text : \'Marge\' }",
        );
        mPorW.mTbp.mTbPth.add(
          "panel { bounds : [0,0,10,0] , location : [75,60] }",
        );
        mPorW.mRbMge2Vtx = mPorW.mTbp.mTbPth.add(
          "radiobutton { bounds : [0,0,60,20] , location : [90,50] , text : \'2 Vtx\' }",
        );
        mPorW.mRbMgeAll = mPorW.mTbp.mTbPth.add(
          "radiobutton { bounds : [0,0,90,20] , location : [90,70] , text : \'Near Vtx\' }",
        );
        mPorW.mRbMgeAll.value = true;
        mPorW.mStMgeAll = mPorW.mTbp.mTbPth.add(
          "statictext { bounds : [0,0,80,20] , location : [110,90] , text : \'Lim.\' }",
        );
        mPorW.mEtMgeAll = mPorW.mTbp.mTbPth.add(
          "edittext { bounds : [0,0,30,20] , location : [135,90] , text : \'1\' }",
        );
        mPorW.mTbp.mTbPth.add(
          "panel { bounds : [0,0,170,0] , location : [10,120] }",
        );
        mPorW.mStDir = mPorW.mTbp.mTbPth.add(
          "statictext { bounds : [0,0,60,20] , location : [10,110] , text : \'Slice\' , justify: \'center\' }",
        );
        mPorW.mBtDirGp = mPorW.mTbp.mTbPth.add(
          "group { bounds : [0,0,90,90] , location : [10,130] }",
        );
        mPorW.mBtDirU = mPorW.mBtDirGp.add(
          "button { bounds : [0,0,20,20] , location : [20,0] , text : \'^\' }",
        );
        mPorW.mBtDirD = mPorW.mBtDirGp.add(
          "button { bounds : [0,0,20,20] , location : [20,40] , text : \'v\' }",
        );
        mPorW.mBtDirL = mPorW.mBtDirGp.add(
          "button { bounds : [0,0,20,20] , location : [0,20] , text : \'<\' }",
        );
        mPorW.mBtDirR = mPorW.mBtDirGp.add(
          "button { bounds : [0,0,20,20] , location : [40,20] , text : \'>\' }",
        );
        mPorW.mTbp.mTbPth.add(
          "panel { bounds : [0,0,10,0] , location : [75,160] }",
        );
        mPorW.mCbSmt2 = mPorW.mTbp.mTbPth.add(
          "checkbox { bounds : [0,0,60,20] , location : [90,150] , text : \'Smooth\' }",
        );
        mPorW.mBtSepShp = mPorW.mTbp.mTbShp.add(
          "button { bounds : [0,0,60,20] , location : [10,10] , text : \'Separate\' }",
        );
        mPorW.mBtUniteShp = mPorW.mTbp.mTbShp.add(
          "button { bounds : [0,0,60,20] , location : [10,30] , text : \'Unite\' }",
        );
        mPorW.mTbp.mTbShp.add(
          "panel { bounds : [0,0,10,0] , location : [75,20] }",
        );
        mPorW.mCbShpCtr = mPorW.mTbp.mTbShp.add(
          "checkbox { bounds : [0,0,100,20] , location : [90,10] , text : \'Center Ap\' }",
        );
        mPorW.mBtExtShp = mPorW.mTbp.mTbShp.add(
          "button { bounds : [0,0,60,20] , location : [10,70] , text : \'Extract \' }",
        );
        mPorW.mBtFpt = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,60,20] , location : [10,10] , text : \'First\' }",
        );
        mPorW.mBtLpt = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,60,20] , location : [10,30] , text : \'Last\' }",
        );
        mPorW.mBtIpt = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,60,20] , location : [10,50] , text : \'Invalid\' }",
        );
        mPorW.mBtDpt = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,60,20] , location : [10,70] , text : \'Definitive\' }",
        );
        mPorW.mEtFpt = mPorW.mTbp.mTbLine.add(
          "edittext { bounds : [0,0,110,20] , location : [70,10] , text : \'\' }",
        );
        mPorW.mEtLpt = mPorW.mTbp.mTbLine.add(
          "edittext { bounds : [0,0,110,20] , location : [70,30] , text : \'\' }",
        );
        mPorW.mEtIpt = mPorW.mTbp.mTbLine.add(
          "edittext { bounds : [0,0,110,20] , location : [70,50] , text : \'\' }",
        );
        mPorW.mEtDpt = mPorW.mTbp.mTbLine.add(
          "edittext { bounds : [0,0,110,20] , location : [70,70] , text : \'\' }",
        );
        mPorW.mBtSep = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,30,20] , location : [10,95] , text : \'sep.\' }",
        );
        mPorW.mEtSep = mPorW.mTbp.mTbLine.add(
          "edittext { bounds : [0,0,30,20] , location : [40,95] , text : \'10\' }",
        );
        mPorW.mStSep = mPorW.mTbp.mTbLine.add(
          "staticText { bounds : [0,0,30,20] , location : [70,95] , text : \'pix\' }",
        );
        mPorW.mCbBoneless = mPorW.mTbp.mTbLine.add(
          "checkbox { bounds : [0,0,90,20] , location : [110,95] , text : \'Boneless\' }",
        );
        mPorW.mTbp.mTbLine.add(
          "panel { bounds : [0,0,170,0] , location : [10,120] }",
        );
        mPorW.mLineInitF = "0;00;00;12";
        mPorW.mEtLineFrame = mPorW.mTbp.mTbLine.add(
          "edittext { bounds : [0,0,65,20] , location : [10,130] , text : \'\' }",
        );
        mPorW.mEtLineFrame.text = mPorW.mLineInitF;
        mPorW.mBtLineFrame = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,20,20] , location : [75,130] , text : \'TC\' }",
        );
        mPorW.mCbZero = mPorW.mTbp.mTbLine.add(
          "checkbox { bounds : [0,0,80,20] , location : [110,130] , text : \'InPoint\' }",
        );
        mPorW.mCbZero.value = true;
        mPorW.mCbEase = mPorW.mTbp.mTbLine.add(
          "checkbox { bounds : [0,0,80,20] , location : [110,150] , text : \'Ease Out\' }",
        );
        mPorW.mCbEase.value = true;
        mPorW.mBtDiv = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,60,20] , location : [120,190] , text : \'Create\' }",
        );
        mPorW.mBtUnit = mPorW.mTbp.mTbLine.add(
          "button { bounds : [0,0,60,20] , location : [120,210] , text : \'Restore\' }",
        );
        mPorW.mBtSqc = mPorW.mTbp.mTbScr.add(
          "button { bounds : [0,0,60,20] , location : [10,10] , text : \'Sequence\' }",
        );
        mPorW.mStSn = mPorW.mTbp.mTbScr.add(
          "staticText { bounds : [0,0,70,20] , location : [80,10] , text : \'Name\' }",
        );
        mPorW.mEtSn = mPorW.mTbp.mTbScr.add(
          "EditText { bounds : [0,0,40,20] , location : [140,10] , text : \'6\' }",
        );
        mPorW.mStEo = mPorW.mTbp.mTbScr.add(
          "staticText { bounds : [0,0,70,20] , location : [80,30] , text : \'Stroke\' }",
        );
        mPorW.mEtEo = mPorW.mTbp.mTbScr.add(
          "EditText { bounds : [0,0,40,20] , location : [140,30] , text : \'3\' }",
        );
        mPorW.mCbCmps = mPorW.mTbp.mTbScr.add(
          "checkbox { bounds : [0,0,180,20] , location : [80,50] , text : \'Include Comps\' }",
        );
        mPorW.mCbCmps.value = true;
        mPorW.mTbp.mTbScr.add(
          "panel { bounds : [0,0,170,0] , location : [10,80] }",
        );
        mPorW.mBtKey = mPorW.mTbp.mTbScr.add(
          "button { bounds : [0,0,60,20] , location : [10,90] , text : \'Stretch Key\' }",
        );
        mPorW.mGpFrame = mPorW.mTbp.mTbScr.add(
          "group { bounds : [0,0,120,20] , location : [80,90] }",
        );
        mPorW.mScrInitF = "0;00;00;24";
        mPorW.mEtScrFrame = mPorW.mGpFrame.add(
          "editText { bounds : [0,0,70,20] , location : [0,0] , text : \'\' }",
        );
        mPorW.mEtScrFrame.text = mPorW.mScrInitF;
        mPorW.mBtScrFrame = mPorW.mGpFrame.add(
          "button { bounds : [0,0,20,20] , location : [70,0] , text : \'TC\' }",
        );
        var mSecName = mScriptName + mScriptVersion;
        mAddIndexToParts(mPorW);
        mGetAllSettings(mPorW, mSecName);
        mAddSaveEventOn(mPorW, mSecName);
        mPorW.mEtFpt.text = "";
        mPorW.mEtLpt.text = "";
        mPorW.mEtIpt.text = "";
        mPorW.mEtDpt.text = "";
        mPorW.mRbMgeTxtAuto.onClick = function () {
          mSaveSettingRdo([mPorW.mRbMgeTxtAuto, mPorW.mRbMgeTxtLim], mSecName);
        };
        mPorW.mRbMgeTxtLim.onClick = function () {
          mSaveSettingRdo([mPorW.mRbMgeTxtAuto, mPorW.mRbMgeTxtLim], mSecName);
        };
        mPorW.mCbPcp.onClick = function () {
          mPorW.mCbShare.enabled = mPorW.mCbPcp.value;
          mPorW.mStMgn.enabled = mPorW.mCbPcp.value;
          mPorW.mEtMgn.enabled = mPorW.mCbPcp.value;
          mSaveSettingOgl(mPorW.mCbPcp, mSecName);
          mSaveSettingEnbld(mPorW.mCbShare, mSecName);
          mSaveSettingEnbld(mPorW.mStMgn, mSecName);
          mSaveSettingEnbld(mPorW.mEtMgn, mSecName);
        };
        mPorW.mCbMgeTxt.onClick = function () {
          mPorW.mRbMgeTxtAuto.enabled = mPorW.mCbMgeTxt.value;
          mPorW.mEtMgeTxtLim.enabled = mPorW.mCbMgeTxt.value;
          mPorW.mRbMgeTxtLim.enabled = mPorW.mCbMgeTxt.value;
          mSaveSettingOgl(mPorW.mCbMgeTxt, mSecName);
          mSaveSettingEnbld(mPorW.mRbMgeTxtAuto, mSecName);
          mSaveSettingEnbld(mPorW.mEtMgeTxtLim, mSecName);
          mSaveSettingEnbld(mPorW.mRbMgeTxtLim, mSecName);
        };
        mPorW.mCbSmt1.onClick = function () {
          if (mPorW.mCbSmt1.value === true) {
            mPorW.mCbSmt2.value = true;
          } else {
            mPorW.mCbSmt2.value = false;
          }
          mSaveSettingOgl(mPorW.mCbSmt1, mSecName);
          mSaveSettingOgl(mPorW.mCbSmt2, mSecName);
        };
        mPorW.mCbSmt2.onClick = function () {
          if (mPorW.mCbSmt2.value === true) {
            mPorW.mCbSmt1.value = true;
          } else {
            mPorW.mCbSmt1.value = false;
          }
          mSaveSettingOgl(mPorW.mCbSmt1, mSecName);
          mSaveSettingOgl(mPorW.mCbSmt2, mSecName);
        };
        mPorW.mRbMgeAll.onClick = function () {
          mPorW.mEtMgeAll.enabled = mPorW.mRbMgeAll.value;
          mPorW.mStMgeAll.enabled = mPorW.mRbMgeAll.value;
          mSaveSettingRdo([mPorW.mRbMgeAll, mPorW.mRbMge2Vtx], mSecName);
        };
        mPorW.mRbMge2Vtx.onClick = function () {
          mPorW.mEtMgeAll.enabled = mPorW.mRbMgeAll.value;
          mPorW.mStMgeAll.enabled = mPorW.mRbMgeAll.value;
          mSaveSettingRdo([mPorW.mRbMgeAll, mPorW.mRbMge2Vtx], mSecName);
        };
        return mPorW;
      }
      function mCreateCrsPtAndGetInfo(aVtxIdx, aPathPpty, aDirNum, aSpAdrs) {
        function mGetBezierCrsVnTnIdx(aLineSet, aVtx1, aVtx2) {
          var mLineSet0 = aLineSet;
          var mDirVtx1 = aVtx1;
          var mDirVtx2 = aVtx2;
          var m2LineSets = mGetNewLineSets(mLineSet0);
          var mLineSet1 = m2LineSets[0];
          var mLineSet2 = m2LineSets[1];
          var mDstX = 2;
          var mDstY = 2;
          var mCntRef = 0;
          var mPickedT = 0;
          var mDivDst = 0.5;
          var mLimitDst = 0.1;
          while (mDstX > mLimitDst || mDstY > mLimitDst || mCntRef < 100) {
            var mChkCrs1 = mChkCrsSqrHalfIneSeg(mDirVtx1, mDirVtx2, mLineSet1);
            var mChkCrs2 = mChkCrsSqrHalfIneSeg(mDirVtx1, mDirVtx2, mLineSet2);
            if (mChkCrs1 === true && mChkCrs2 === false) {
              var mCrsVtx1 = mLineSet1.mVtx1;
              var mCrsVtx2 = mLineSet1.mVtx2;
              var mChk1or2 = true;
              mPickedT = mPickedT;
            } else if (mChkCrs1 === false && mChkCrs2 === true) {
              var mCrsVtx1 = mLineSet2.mVtx1;
              var mCrsVtx2 = mLineSet2.mVtx2;
              var mChk1or2 = false;
              mPickedT = mPickedT + mDivDst;
            } else if (mChkCrs1 === false && mChkCrs2 === false) {
              return null;
            } else {
              if (mChkCrs1 === true && mChkCrs2 === true) {
                var mVtxF1 = mLineSet1.mVtx1;
                var mVtxL1 = mLineSet1.mVtx2;
                var mVtxF2 = mLineSet2.mVtx1;
                var mVtxL2 = mLineSet2.mVtx2;
                if (
                  mVtxF1.toString() === mDirVtx1.toString() ||
                  mVtxL1.toString() === mDirVtx1.toString()
                ) {
                  var mCrsVtx1 = mLineSet2.mVtx1;
                  var mCrsVtx2 = mLineSet2.mVtx2;
                  var mChk1or2 = false;
                  mPickedT = mPickedT + mDivDst;
                } else if (
                  mVtxF2.toString() === mDirVtx1.toString() ||
                  mVtxL2.toString() === mDirVtx1.toString()
                ) {
                  var mCrsVtx1 = mLineSet1.mVtx1;
                  var mCrsVtx2 = mLineSet1.mVtx2;
                  var mChk1or2 = true;
                  mPickedT = mPickedT;
                } else {
                  var mSqrLgt1 = mGetSqrLgt(mLineSet1.mVtx1, mDirVtx1);
                  var mSqrLgt2 = mGetSqrLgt(mLineSet1.mVtx2, mDirVtx1);
                  if (mSqrLgt1 < mSqrLgt2) {
                    var mCrsVtx1 = mLineSet1.mVtx1;
                    var mCrsVtx2 = mLineSet1.mVtx2;
                    var mChk1or2 = true;
                    mPickedT = mPickedT;
                  } else {
                    var mCrsVtx1 = mLineSet2.mVtx1;
                    var mCrsVtx2 = mLineSet2.mVtx2;
                    var mChk1or2 = false;
                    mPickedT = mPickedT + mDivDst;
                  }
                }
              }
            }
            mDstX = Math.abs(mCrsVtx1[0] - mCrsVtx2[0]);
            mDstY = Math.abs(mCrsVtx1[1] - mCrsVtx2[1]);
            if (mDstX <= mLimitDst && mDstY <= mLimitDst) {
              break;
            }
            if (mChk1or2 == true) {
              m2LineSets = mGetNewLineSets(mLineSet1);
              mLineSet1 = m2LineSets[0];
              mLineSet2 = m2LineSets[1];
            } else {
              if (mChk1or2 == false) {
                m2LineSets = mGetNewLineSets(mLineSet2);
                mLineSet1 = m2LineSets[0];
                mLineSet2 = m2LineSets[1];
              }
            }
            mDivDst = mDivDst / 2;
            mCntRef++;
          }
          var mRst = {};
          mRst.mVtx = mGetCrsPtLines(mDirVtx1, mDirVtx2, mCrsVtx1, mCrsVtx2);
          if (mRst.mVtx === null) {
            mRst.mVtx = mCrsVtx1;
          }
          if (mGetLgt(mRst.mVtx, mDirVtx1) < 1) {
            return null;
          }
          mRst.mT = mPickedT + mDivDst / 2;
          mRst.mIdx = mLineSet0.mIdx;
          return mRst;
        }
        function mGetNewLineSets(aLineSet) {
          function mDivLine(aPt1, aPt2, t) {
            var mX = (1 - t) * aPt1[0] + t * aPt2[0];
            var mY = (1 - t) * aPt1[1] + t * aPt2[1];
            return [mX, mY];
          }
          var mVtx1Pre = aLineSet.mVtx1;
          var mOut1Pre = aLineSet.mOut1;
          var mVtx2Pre = aLineSet.mVtx2;
          var mIn2Pre = aLineSet.mIn2;
          var t = 0.5;
          var mOut1H = mDivLine(mVtx1Pre, mOut1Pre, t);
          var mInOutH = mDivLine(mOut1Pre, mIn2Pre, t);
          var mIn2H = mDivLine(mIn2Pre, mVtx2Pre, t);
          var mNewInTgnt = mDivLine(mOut1H, mInOutH, t);
          var mNewOutTgnt = mDivLine(mInOutH, mIn2H, t);
          var mNewPt = mDivLine(mNewInTgnt, mNewOutTgnt, t);
          var m2LineSet1 = {};
          m2LineSet1.mVtx1 = mVtx1Pre;
          m2LineSet1.mOut1 = mOut1H;
          m2LineSet1.mIn2 = mNewInTgnt;
          m2LineSet1.mVtx2 = mNewPt;
          var m2LineSet2 = {};
          m2LineSet2.mVtx1 = mNewPt;
          m2LineSet2.mOut1 = mNewOutTgnt;
          m2LineSet2.mIn2 = mIn2H;
          m2LineSet2.mVtx2 = mVtx2Pre;
          return [m2LineSet1, m2LineSet2];
        }
        function mChkCrsSqrHalfIneSeg(a, b, aObj) {
          function mRoundDec(afFigure, aNum) {
            var mRst = Math.round(afFigure * aNum) / aNum;
            return mRst;
          }
          function mCrsChkExp(a, b, c) {
            var mRst =
              (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
            return mRst;
          }
          function mGetRotPt(aStdPt, aTgtPt, aStdRot) {
            var mTgtPtZr = aTgtPt - aStdPt;
            var mRotRd = aStdRot * (Math.PI / 180);
            var mRstX =
              mTgtPtZr[0] * Math.cos(mRotRd) - mTgtPtZr[1] * Math.sin(mRotRd);
            var mRstY =
              mTgtPtZr[0] * Math.sin(mRotRd) + mTgtPtZr[1] * Math.cos(mRotRd);
            return [mRstX, mRstY] + aStdPt;
          }
          var mAry = [aObj.mVtx1, aObj.mOut1, aObj.mIn2, aObj.mVtx2];
          var mRst = false;
          for (var i = 0; i < mAry.length; i += 1) {
            var mExp = mCrsChkExp(a, b, mAry[i]);
            mExp = mRoundDec(mExp, 10000);
            if (mExp == 0) {
              mRst = true;
              break;
            }
            if (i !== 0) {
              if (mToF !== mExp > 0) {
                mRst = true;
                break;
              }
            }
            mToF = mExp > 0;
          }
          if (mRst === false) {
            return false;
          }
          var mNmlVtx = mGetRotPt(a, b, 90);
          var mStdPorM = mCrsChkExp(a, mNmlVtx, b);
          var mStdToF = mStdPorM > 0;
          for (var i = 0; i < mAry.length; i += 1) {
            var mExp = mCrsChkExp(a, mNmlVtx, mAry[i]);
            mExp = mRoundDec(mExp, 10000);
            if (mExp == 0) {
              return true;
            } else {
              if (mStdToF === mExp > 0) {
                return true;
              }
            }
          }
          return false;
        }
        function mGetCrsPtLines(aP1, aP2, aP3, aP4) {
          var mS1 =
            ((aP4[0] - aP3[0]) * (aP1[1] - aP3[1]) -
              (aP4[1] - aP3[1]) * (aP1[0] - aP3[0])) /
            2;
          var mS2 =
            ((aP4[0] - aP3[0]) * (aP3[1] - aP2[1]) -
              (aP4[1] - aP3[1]) * (aP3[0] - aP2[0])) /
            2;
          var mX = aP1[0] + ((aP2[0] - aP1[0]) * mS1) / (mS1 + mS2);
          var mY = aP1[1] + ((aP2[1] - aP1[1]) * mS1) / (mS1 + mS2);
          if (!isFinite(mX) || isNaN(mX) || !isFinite(mY) || isNaN(mY)) {
            return null;
          }
          return [mX, mY];
        }
        function mGetLgt(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        function mGetSqrLgt(aPt1, aPt2) {
          mSqrLgt =
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2);
          return mSqrLgt;
        }
        function mGetPathPIO(aP1, aO1, aI2, aP2, aT) {
          function mDivLine(aV01, aV02, aDiv) {
            var mX = (1 - aDiv) * aV01[0] + aDiv * aV02[0];
            var mY = (1 - aDiv) * aV01[1] + aDiv * aV02[1];
            return [mX, mY];
          }
          var mO1 = aO1 + aP1;
          var mI2 = aI2 + aP2;
          var mNpreO = mDivLine(aP1, mO1, aT);
          var mHd = mDivLine(mO1, mI2, aT);
          var mNnexI = mDivLine(mI2, aP2, aT);
          var mNi = mDivLine(mNpreO, mHd, aT);
          var mNo = mDivLine(mHd, mNnexI, aT);
          var mNp = mDivLine(mNi, mNo, aT);
          var mNiR = mNi - mNp;
          var mNoR = mNo - mNp;
          var mNpreOR = mNpreO - aP1;
          var mNnexIR = mNnexI - aP2;
          return [mNp, mNiR, mNoR, mNpreOR, mNnexIR];
        }
        var mSp = aPathPpty;
        var mSpAdrs = aSpAdrs;
        var mPrtPpty = mGetPptyFromAdrs(mSpAdrs, 1);
        var mDirVtx1 = mSp.path.value.vertices[aVtxIdx];
        if (aDirNum === 0) {
          var mVtx2Vec = [0, -1];
        } else if (aDirNum === 1) {
          var mVtx2Vec = [1, 0];
        } else if (aDirNum === 2) {
          var mVtx2Vec = [0, 1];
        } else {
          if (aDirNum === 3) {
            var mVtx2Vec = [-1, 0];
          }
        }
        var mDirVtx2 = mDirVtx1 + mVtx2Vec;
        var mSpIdx = mSp.propertyIndex;
        var mPaths = [];
        for (var i = 1; i <= mPrtPpty.numProperties; i += 1) {
          if (mPrtPpty(i).matchName == "ADBE Vector Shape - Group") {
            mPaths.push(mPrtPpty(i));
          }
        }
        var mNearVnTs = [];
        for (var j = 0; j < mPaths.length; j += 1) {
          var mPath = mPaths[j];
          var mLineSets = [];
          var mPathLgt = mPath.path.value.vertices.length;
          for (var i = 0; i < mPathLgt; i += 1) {
            var mIdxNex = (i + 1 + mPathLgt) % mPathLgt;
            var mLineSet = {};
            mLineSet.mVtx1 = mPath.path.value.vertices[i];
            mLineSet.mVtx2 = mPath.path.value.vertices[mIdxNex];
            mLineSet.mOut1 = mLineSet.mVtx1 + mPath.path.value.outTangents[i];
            mLineSet.mIn2 =
              mLineSet.mVtx2 + mPath.path.value.inTangents[mIdxNex];
            mLineSet.mVtx1 = mPath.path.value.vertices[i];
            mLineSet.mIdx = i;
            mLineSets.push(mLineSet);
          }
          var mCrsLines = [];
          for (var i = 0; i < mLineSets.length; i += 1) {
            if (
              mChkCrsSqrHalfIneSeg(mDirVtx1, mDirVtx2, mLineSets[i]) == true
            ) {
              mCrsLines.push(mLineSets[i]);
            }
          }
          var mCrsVnTs = [];
          for (var i = 0; i < mCrsLines.length; i += 1) {
            var mVtxAndTTmp = mGetBezierCrsVnTnIdx(
              mCrsLines[i],
              mDirVtx1,
              mDirVtx2,
            );
            if (mVtxAndTTmp !== null) {
              mCrsVnTs.push(mVtxAndTTmp);
            }
          }
          if (mCrsVnTs.length !== 0) {
            mCrsVnTs.sort(function (a, b) {
              return (
                mGetSqrLgt(mDirVtx1, a.mVtx) - mGetSqrLgt(mDirVtx1, b.mVtx)
              );
            });
            var mCrsVnTFst = mCrsVnTs[0];
            mNearVnTs.push([mCrsVnTFst, j]);
          }
        }
        if (mNearVnTs.length === 0) {
          return null;
        } else {
          mNearVnTs.sort(function (a, b) {
            return (
              mGetSqrLgt(mDirVtx1, a[0].mVtx) - mGetSqrLgt(mDirVtx1, b[0].mVtx)
            );
          });
          var mRstT = mNearVnTs[0][0].mT;
          var mRstIdx = mNearVnTs[0][0].mIdx;
          var mRstPathPpty = mPaths[mNearVnTs[0][1]];
        }
        var mCrsPtF = mRstPathPpty.path.value.vertices[mRstIdx];
        var mCrsOutF = mRstPathPpty.path.value.outTangents[mRstIdx];
        var mIdxNex =
          (mRstIdx + 1 + mRstPathPpty.path.value.vertices.length) %
          mRstPathPpty.path.value.vertices.length;
        var mCrsPtL = mRstPathPpty.path.value.vertices[mIdxNex];
        var mCrsInL = mRstPathPpty.path.value.inTangents[mIdxNex];
        var mCrsPIO = mGetPathPIO(mCrsPtF, mCrsOutF, mCrsInL, mCrsPtL, mRstT);
        var mNewShape = mRstPathPpty.path.value;
        var mNewVtxs = mNewShape.vertices;
        var mNewIns = mNewShape.inTangents;
        var mNewOuts = mNewShape.outTangents;
        mNewOuts.splice(mRstIdx, 1, mCrsPIO[3]);
        mNewIns.splice(mIdxNex, 1, mCrsPIO[4]);
        mNewVtxs.splice(mRstIdx + 1, 0, mCrsPIO[0]);
        mNewIns.splice(mRstIdx + 1, 0, mCrsPIO[1]);
        mNewOuts.splice(mRstIdx + 1, 0, mCrsPIO[2]);
        mNewShape.vertices = mNewVtxs;
        mNewShape.inTangents = mNewIns;
        mNewShape.outTangents = mNewOuts;
        mRstPathPpty.path.setValue(mNewShape);
        var mPtInfo = {};
        mPtInfo.mIdx = mRstIdx + 1;
        mPtInfo.mVtx = mCrsPIO[0];
        mPtInfo.mIn = mCrsPIO[1];
        mPtInfo.mOut = mCrsPIO[2];
        mPtInfo.mPpty = mRstPathPpty;
        mPtInfo.mPptyIdx = mRstPathPpty.propertyIndex;
        return mPtInfo;
      }
      function mShapeDivider01(
        aSelPtInfos,
        aAllPtInfos,
        aCBValue,
        aOglName,
        aSpAdrs,
      ) {
        function mDivAry(a, b, c) {
          var SL01 = a.slice(b, c + 1);
          var PRE01 = a.slice(0, b + 1);
          var PRE02 = a.slice(c, a.length);
          var SL02 = PRE02.concat(PRE01);
          var V = [SL01, SL02];
          return V;
        }
        function mCreateNewShapeFromPts(aPts) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aPts.length; i += 1) {
            mV.push(aPts[i].mVtx);
            mI.push(aPts[i].mIn);
            mO.push(aPts[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          return mShape;
        }
        function mGetUnitVector(aTgnt) {
          if (aTgnt.toString() == "0,0") {
            return [0, 0];
          }
          var mVecX = aTgnt[0];
          var mVecY = aTgnt[1];
          var mLength = Math.sqrt(Math.pow(mVecX, 2) + Math.pow(mVecY, 2));
          var mUnitVecX = mVecX / mLength;
          var mUnitVecY = mVecY / mLength;
          return [mUnitVecX, mUnitVecY];
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mReturnSmthOutIn(aNAry) {
          var mNAryTmp = aNAry;
          var mNAryTmpLgt = mGetLength(
            mNAryTmp[0].mVtx,
            mNAryTmp[mNAryTmp.length - 1].mVtx,
          );
          if (mNAryTmp[0].mOut.toString() == "0,0") {
            var mVec1ForSmth = (mNAryTmp[1].mVtx - mNAryTmp[0].mVtx) * -1;
          } else {
            var mVec1ForSmth = mNAryTmp[0].mOut * -1;
          }
          var mUnitVec1ForSmth = mGetUnitVector(mVec1ForSmth);
          var mRstmIn = mUnitVec1ForSmth * mNAryTmpLgt * 0.33;
          var mNewSetForRstmIn = new mCreatePointInfoObj();
          mNewSetForRstmIn.mIdx = mNAryTmp[0].mIdx;
          mNewSetForRstmIn.mVtx = mNAryTmp[0].mVtx;
          mNewSetForRstmIn.mIn = mRstmIn;
          mNewSetForRstmIn.mOut = mNAryTmp[0].mOut;
          mNAryTmp[0] = mNewSetForRstmIn;
          if (mNAryTmp[mNAryTmp.length - 1].mIn.toString() == "0,0") {
            var mVec2ForSmth =
              (mNAryTmp[mNAryTmp.length - 2].mVtx -
                mNAryTmp[mNAryTmp.length - 1].mVtx) *
              -1;
          } else {
            var mVec2ForSmth = mNAryTmp[mNAryTmp.length - 1].mIn * -1;
          }
          var mUnitVec2ForSmth = mGetUnitVector(mVec2ForSmth);
          var mRstmOut = mUnitVec2ForSmth * mNAryTmpLgt * 0.33;
          var mNewSetForRstmOut = new mCreatePointInfoObj();
          mNewSetForRstmOut.mIdx = mNAryTmp[mNAryTmp.length - 1].mIdx;
          mNewSetForRstmOut.mVtx = mNAryTmp[mNAryTmp.length - 1].mVtx;
          mNewSetForRstmOut.mIn = mNAryTmp[mNAryTmp.length - 1].mIn;
          mNewSetForRstmOut.mOut = mRstmOut;
          mNAryTmp[mNAryTmp.length - 1] = mNewSetForRstmOut;
          return mNAryTmp;
        }
        function mReturnZeroOutIn(aNAry) {
          var mNAryTmp = aNAry;
          var mNewSetForRstmIn = new mCreatePointInfoObj();
          mNewSetForRstmIn.mIdx = mNAryTmp[0].mIdx;
          mNewSetForRstmIn.mVtx = mNAryTmp[0].mVtx;
          mNewSetForRstmIn.mIn = [0, 0];
          mNewSetForRstmIn.mOut = mNAryTmp[0].mOut;
          mNAryTmp[0] = mNewSetForRstmIn;
          var mNewSetForRstmOut = new mCreatePointInfoObj();
          mNewSetForRstmOut.mIdx = mNAryTmp[mNAryTmp.length - 1].mIdx;
          mNewSetForRstmOut.mVtx = mNAryTmp[mNAryTmp.length - 1].mVtx;
          mNewSetForRstmOut.mIn = mNAryTmp[mNAryTmp.length - 1].mIn;
          mNewSetForRstmOut.mOut = [0, 0];
          mNAryTmp[mNAryTmp.length - 1] = mNewSetForRstmOut;
          return mNAryTmp;
        }
        var mSelPtInfos = aSelPtInfos;
        var mAllPtInfos = aAllPtInfos;
        var mOglName = aOglName;
        var mCBValue = aCBValue;
        var mSpAdrs = aSpAdrs;
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSp = mSl.selectedProperties[0];
        var mSpIdx = mSp.propertyIndex;
        var mVgName = mSp.propertyGroup(2).name;
        var mPts = mAllPtInfos[0].points;
        var mSelIdx1 = mSelPtInfos[0].points[0].mIdx;
        var mSelIdx2 = mSelPtInfos[0].points[1].mIdx;
        var mNewPtsAry = mDivAry(mPts, mSelIdx1, mSelIdx2);
        if (mCBValue == true) {
          var mNewPts1 = mReturnSmthOutIn(mNewPtsAry[0]);
          var mNewPts2 = mReturnSmthOutIn(mNewPtsAry[1]);
        } else {
          var mNewPts1 = mReturnZeroOutIn(mNewPtsAry[0]);
          var mNewPts2 = mReturnZeroOutIn(mNewPtsAry[1]);
        }
        var mPrtPpty = mGetPptyFromAdrs(mSpAdrs, 1);
        var mNshape1 = mCreateNewShapeFromPts(mNewPts1);
        var mNshape2 = mCreateNewShapeFromPts(mNewPts2);
        var mShpPptyTmp1 = mPrtPpty.addProperty("ADBE Vector Shape - Group");
        mShpPptyTmp1(2).setValue(mNshape1);
        var mShpPptyTmp2 = mPrtPpty.addProperty("ADBE Vector Shape - Group");
        mShpPptyTmp2(2).setValue(mNshape2);
        mPrtPpty(mSpIdx).remove();
        var mPptyNum = mPrtPpty.numProperties;
        for (var i = 0; i < 2; i += 1) {
          mPrtPpty(mPptyNum).moveTo(mSpIdx);
        }
        mPrtPpty(mSpIdx).selected = true;
        mPrtPpty(mSpIdx + 1).selected = true;
        mPrtPpty(mSpIdx).name = mOglName;
        mPrtPpty(mSpIdx + 1).name = mOglName;
      }
      function mShapeDivider02(
        aSelPtInfos,
        aAllPtInfos,
        aCBValue,
        aOglName,
        aSpAdrs,
      ) {
        function mCreateNewShapeFromPts(aPts) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aPts.length; i += 1) {
            mV.push(aPts[i].mVtx);
            mI.push(aPts[i].mIn);
            mO.push(aPts[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          return mShape;
        }
        function mRearrangeAry(aAry, b) {
          var mPre1 = aAry.slice(0, b + 1);
          var mPre2 = aAry.slice(b, aAry.length);
          var mRst = mPre2.concat(mPre1);
          return mRst;
        }
        function mGetUnitVector(aTgnt) {
          if (aTgnt.toString() == "0,0") {
            return [0, 0];
          }
          var mVecX = aTgnt[0];
          var mVecY = aTgnt[1];
          var mLength = Math.sqrt(Math.pow(mVecX, 2) + Math.pow(mVecY, 2));
          var mUnitVecX = mVecX / mLength;
          var mUnitVecY = mVecY / mLength;
          return [mUnitVecX, mUnitVecY];
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mReturnSmthOutInFor2(aNAry1, aNAry2) {
          var mNAry1 = aNAry1;
          var mNAry2 = aNAry2;
          var mNAry1Lgt = mGetLength(mNAry1[0].mVtx, mNAry2[0].mVtx);
          if (mNAry1[0].mOut.toString() == "0,0") {
            var mVec1ForSmth = (mNAry1[1].mVtx - mNAry1[0].mVtx) * -1;
          } else {
            var mVec1ForSmth = mNAry1[0].mOut * -1;
          }
          var mUnitVec1ForSmth = mGetUnitVector(mVec1ForSmth);
          var mRstmIn = mUnitVec1ForSmth * mNAry1Lgt * 0.33;
          var mNewSetForRstmIn = new mCreatePointInfoObj();
          mNewSetForRstmIn.mIdx = mNAry1[0].mIdx;
          mNewSetForRstmIn.mVtx = mNAry1[0].mVtx;
          mNewSetForRstmIn.mIn = mRstmIn;
          mNewSetForRstmIn.mOut = mNAry1[0].mOut;
          mNAry1[0] = mNewSetForRstmIn;
          if (mNAry1[mNAry1.length - 1].mIn.toString() == "0,0") {
            var mVec2ForSmth =
              (mNAry1[mNAry1.length - 2].mVtx -
                mNAry1[mNAry1.length - 1].mVtx) *
              -1;
          } else {
            var mVec2ForSmth = mNAry1[mNAry1.length - 1].mIn * -1;
          }
          var mUnitVec2ForSmth = mGetUnitVector(mVec2ForSmth);
          var mRstmOut = mUnitVec2ForSmth * mNAry1Lgt * 0.33;
          var mNewSetForRstmOut = new mCreatePointInfoObj();
          mNewSetForRstmOut.mIdx = mNAry1[mNAry1.length - 1].mIdx;
          mNewSetForRstmOut.mVtx = mNAry1[mNAry1.length - 1].mVtx;
          mNewSetForRstmOut.mIn = mNAry1[mNAry1.length - 1].mIn;
          mNewSetForRstmOut.mOut = mRstmOut;
          mNAry1[mNAry1.length - 1] = mNewSetForRstmOut;
          return mNAry1;
        }
        function mReturnZeroOutIn(aNAry) {
          var mNAryTmp = aNAry;
          var mNewSetForRstmIn = new mCreatePointInfoObj();
          mNewSetForRstmIn.mIdx = mNAryTmp[0].mIdx;
          mNewSetForRstmIn.mVtx = mNAryTmp[0].mVtx;
          mNewSetForRstmIn.mIn = [0, 0];
          mNewSetForRstmIn.mOut = mNAryTmp[0].mOut;
          mNAryTmp[0] = mNewSetForRstmIn;
          var mNewSetForRstmOut = new mCreatePointInfoObj();
          mNewSetForRstmOut.mIdx = mNAryTmp[mNAryTmp.length - 1].mIdx;
          mNewSetForRstmOut.mVtx = mNAryTmp[mNAryTmp.length - 1].mVtx;
          mNewSetForRstmOut.mIn = mNAryTmp[mNAryTmp.length - 1].mIn;
          mNewSetForRstmOut.mOut = [0, 0];
          mNAryTmp[mNAryTmp.length - 1] = mNewSetForRstmOut;
          return mNAryTmp;
        }
        var mSelPtInfos = aSelPtInfos;
        var mAllPtInfos = aAllPtInfos;
        var mOglName = aOglName;
        var mCBValue = aCBValue;
        var mSpAdrs = aSpAdrs;
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSp01 = mSl.selectedProperties[0];
        var mSp02 = mSl.selectedProperties[1];
        var mSpIdx1 = mSp01.propertyIndex;
        var mSpIdx2 = mSp02.propertyIndex;
        var mVgName = mSp01.propertyGroup(2).name;
        var mPts1 = mAllPtInfos[0].points;
        var mPts2 = mAllPtInfos[1].points;
        var mSelIdx1 = mSelPtInfos[0].points[0].mIdx;
        var mSelIdx2 = mSelPtInfos[1].points[0].mIdx;
        var mNewPts1Pre = mRearrangeAry(mPts1, mSelIdx1);
        var mNewPts2Pre = mRearrangeAry(mPts2, mSelIdx2);
        if (mCBValue == true) {
          var mNewPts1 = mReturnSmthOutInFor2(mNewPts1Pre, mNewPts2Pre);
          var mNewPts2 = mReturnSmthOutInFor2(mNewPts2Pre, mNewPts1Pre);
        } else {
          var mNewPts1 = mReturnZeroOutIn(mNewPts1Pre);
          var mNewPts2 = mReturnZeroOutIn(mNewPts2Pre);
        }
        var mNewPts = mNewPts1.concat(mNewPts2);
        var mPrtPpty = mGetPptyFromAdrs(mSpAdrs, 1);
        var mNshape = mCreateNewShapeFromPts(mNewPts);
        var mShpPptyTmp = mPrtPpty.addProperty("ADBE Vector Shape - Group");
        mShpPptyTmp(2).setValue(mNshape);
        mPrtPpty(mSpIdx2).remove();
        mPrtPpty(mSpIdx1).remove();
        var mPptyNum = mPrtPpty.numProperties;
        mPrtPpty(mPptyNum).moveTo(mSpIdx1);
        mPrtPpty(mSpIdx1).selected = true;
        mPrtPpty(mSpIdx1).name = mOglName;
      }
      function mShapeDividerX(
        aSelPtInfos,
        aAllPtInfos,
        aCBValue,
        aOglName,
        aSpAdrs,
      ) {
        function mGetSelVtxObjAry() {
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSp = mSl.selectedProperties;
          app.beginUndoGroup("set01");
          var mAllVtxs = [];
          for (var i = 0; i < mSp.length; i += 1) {
            mAllVtxs.push(mSp[i].path.value.vertices);
          }
          app.executeCommand(21);
          var mNoUseVtxs = [];
          for (var i = 0; i < mSp.length; i += 1) {
            mNoUseVtxs.push(mSp[i].path.value.vertices);
          }
          app.endUndoGroup();
          app.executeCommand(16);
          var mIdxBox = [];
          for (var k = 0; k < mSp.length; k += 1) {
            mPointsObj = new mCreatePoints();
            for (var i = 0; i < mAllVtxs[k].length; i += 1) {
              mChk = false;
              for (var j = 0; j < mNoUseVtxs[k].length; j += 1) {
                if (mMatch(mAllVtxs[k][i], mNoUseVtxs[k][j])) {
                  mChk = true;
                  break;
                }
              }
              if (mChk == false) {
                mPointInfoObj = new mCreatePointInfoObj();
                mPointInfoObj.mIdx = i;
                mPointInfoObj.mVtx = mSp[k].path.value.vertices[i];
                mPointInfoObj.mIn = [0, 0];
                mPointInfoObj.mOut = [0, 0];
                mPointsObj.points.push(mPointInfoObj);
              }
            }
            mIdxBox.push(mPointsObj);
          }
          return mIdxBox;
        }
        function mCreatePointsObj(aPathPrt) {
          var mPointsObj = new mCreatePoints();
          for (var i = 0; i < aPathPrt.path.value.vertices.length; i += 1) {
            mPointInfoObj = new mCreatePointInfoObj();
            mPointInfoObj.mIdx = i;
            mPointInfoObj.mVtx = aPathPrt.path.value.vertices[i];
            mPointInfoObj.mIn = aPathPrt.path.value.inTangents[i];
            mPointInfoObj.mOut = aPathPrt.path.value.outTangents[i];
            mPointsObj.points.push(mPointInfoObj);
          }
          return mPointsObj;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mCreatePoints() {
          this.points = [];
          this.check = false;
        }
        function mSorting(aAry, aNbrs) {
          var mNarys = [];
          for (var i = 0; i < aNbrs.length - 1; i += 1) {
            mNewPointsObj = new mCreatePoints();
            mNewPointsObj.points = aAry.slice(
              aNbrs[i].mIdx,
              aNbrs[i + 1].mIdx + 1,
            );
            mNarys.push(mNewPointsObj);
          }
          var mPre1 = aAry.slice(aNbrs[aNbrs.length - 1].mIdx, aAry.length);
          var mPre2 = aAry.slice(0, aNbrs[0].mIdx + 1);
          mNewPointsObj = new mCreatePoints();
          mNewPointsObj.points = mPre1.concat(mPre2);
          mNarys.push(mNewPointsObj);
          return mNarys;
        }
        function mCreateNewShape(aPathPrt) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aPathPrt.points.length; i += 1) {
            mV.push(aPathPrt.points[i].mVtx);
            mI.push(aPathPrt.points[i].mIn);
            mO.push(aPathPrt.points[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          return mShape;
        }
        function crossChk(a, b, c, d) {
          var mR01 =
            (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
          var mR02 =
            (a[0] - b[0]) * (d[1] - a[1]) + (a[1] - b[1]) * (a[0] - d[0]);
          var mR03 =
            (c[0] - d[0]) * (a[1] - c[1]) + (c[1] - d[1]) * (c[0] - a[0]);
          var mR04 =
            (c[0] - d[0]) * (b[1] - c[1]) + (c[1] - d[1]) * (c[0] - b[0]);
          mR01 * mR02 < 0 && mR03 * mR04 < 0 ? (mToF = true) : (mToF = false);
          return mToF;
        }
        function judgeInOrOut(aPset, aMdlPt) {
          var mRSum = 0;
          for (var i = 0; i < aPset.points.length; i += 1) {
            mIdxNex = (i + 1 + aPset.points.length) % aPset.points.length;
            mA = aPset.points[i].mVtx - aMdlPt;
            mB = aPset.points[mIdxNex].mVtx - aMdlPt;
            mCos = mA[0] * mB[0] + mA[1] * mB[1];
            mSin = mA[0] * mB[1] - mA[1] * mB[0];
            mRSum -= (180 / Math.PI) * Math.atan2(mSin, mCos);
          }
          return Math.round(mRSum) > 0;
        }
        function mConnectPath(aPointsObjAry, aSelPointsObj) {
          var mPointsObjAryNew = [];
          for (var i = 0; i < aPointsObjAry.length; i += 1) {
            mFnum = aPointsObjAry[i].points.length - 1;
            mNewPointsTmp = new mCreatePoints();
            mNewPointsTmp.points = aPointsObjAry[i].points.slice();
            for (var j = 0; j < aSelPointsObj.points.length; j += 1) {
              if (
                mMatch(
                  mNewPointsTmp.points[mFnum].mVtx,
                  aSelPointsObj.points[j].mVtx,
                )
              ) {
                mIdxNex =
                  (j + 1 + aSelPointsObj.points.length) %
                  aSelPointsObj.points.length;
                var mNewSelPointsTmp = new mCreatePointInfoObj();
                mNewSelPointsTmp.mIdx = aSelPointsObj.points[mIdxNex].mIdx;
                mNewSelPointsTmp.mVtx = aSelPointsObj.points[mIdxNex].mVtx;
                mNewSelPointsTmp.mIn = aSelPointsObj.points[mIdxNex].mIn;
                mNewSelPointsTmp.mOut = aSelPointsObj.points[mIdxNex].mOut;
                mNewPointsTmp.points.push(mNewSelPointsTmp);
                break;
              }
            }
            mPointsObjAryNew.push(mNewPointsTmp);
          }
          var mAry = [];
          for (var i = 0; i < mPointsObjAryNew.length; i += 1) {
            mNewPointsObj = new mCreatePoints();
            mFnum = mPointsObjAryNew[i].points.length - 1;
            if (
              mMatch(
                mPointsObjAryNew[i].points[0].mVtx,
                mPointsObjAryNew[i].points[mFnum].mVtx,
              )
            ) {
              mNewPointsObj.points = mPointsObjAryNew[i].points.slice();
              mAry.push(mNewPointsObj);
              mPointsObjAryNew[i].check = true;
            }
          }
          for (var i = 0; i < mPointsObjAryNew.length; i += 1) {
            if (mPointsObjAryNew[i].check != true) {
              mNewPointsObj = new mCreatePoints();
              mNewPointsObj.points = mPointsObjAryNew[i].points.slice();
              mChk = false;
              mCnt = 0;
              while (mChk == false && mCnt < mPointsObjAryNew.length) {
                for (var j = 0; j < mPointsObjAryNew.length; j += 1) {
                  mFnum = mNewPointsObj.points.length - 1;
                  if (
                    mPointsObjAryNew[j].check != true &&
                    j != i &&
                    mMatch(
                      mNewPointsObj.points[mFnum].mVtx,
                      mPointsObjAryNew[j].points[0].mVtx,
                    ) == true
                  ) {
                    mNewPointsObj.points.pop();
                    mNewPointsObj.points = mNewPointsObj.points.concat(
                      mPointsObjAryNew[j].points.slice(),
                    );
                    mPointsObjAryNew[j].check = true;
                  }
                }
                mFnum2 = mNewPointsObj.points.length - 1;
                if (
                  mMatch(
                    mNewPointsObj.points[0].mVtx,
                    mNewPointsObj.points[mFnum2].mVtx,
                  ) == true
                ) {
                  mChk = true;
                }
                mCnt = mCnt + 1;
              }
              mAry.push(mNewPointsObj);
            }
          }
          for (var i = 0; i < mAry.length; i += 1) {
            mAry[i].points.pop();
          }
          return mAry;
        }
        function mRound(afFigure) {
          var mRst = Math.round(afFigure * 100) / 100;
          return mRst;
        }
        function mMatch(aVtx1, aVtx2) {
          if (
            mRound(aVtx1[0]) == mRound(aVtx2[0]) &&
            mRound(aVtx1[1]) == mRound(aVtx2[1])
          ) {
            return true;
          } else {
            return false;
          }
        }
        function mCreateForSmoothObj() {
          this.mNowIdx;
          this.mOglIdx;
        }
        function mGetUnitVector(aTgnt) {
          if (aTgnt.toString() == "0,0") {
            return [0, 0];
          }
          var mVecX = aTgnt[0];
          var mVecY = aTgnt[1];
          var mLength = Math.sqrt(Math.pow(mVecX, 2) + Math.pow(mVecY, 2));
          var mUnitVecX = mVecX / mLength;
          var mUnitVecY = mVecY / mLength;
          return [mUnitVecX, mUnitVecY];
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        function mChkSelfIntersect(aVtxs) {
          function mChkCrossLineSegsFrom2LineSegs(aSegs1, aSegs2, aToF) {
            function mCrsChkExp(a, b, c) {
              var mRst =
                (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
              return mRst;
            }
            function mRoundDec(afFigure, aNum) {
              var mRst = Math.round(afFigure * aNum) / aNum;
              return mRst;
            }
            var a = aSegs1[0];
            var b = aSegs1[1];
            var c = aSegs2[0];
            var d = aSegs2[1];
            var mR01 = mCrsChkExp(a, b, c);
            var mR02 = mCrsChkExp(a, b, d);
            var mR01Rnd = mRoundDec(mR01, 10000);
            var mR02Rnd = mRoundDec(mR02, 10000);
            var mPorMNum1 = mR01Rnd * mR02Rnd;
            var mR03 = mCrsChkExp(c, d, a);
            var mR04 = mCrsChkExp(c, d, b);
            var mR03Rnd = mRoundDec(mR03, 10000);
            var mR04Rnd = mRoundDec(mR04, 10000);
            var mPorMNum2 = mR03Rnd * mR04Rnd;
            if (aToF == true) {
              mPorMNum1 <= 0 && mPorMNum2 <= 0 ? (mRst = true) : (mRst = false);
            } else {
              mPorMNum1 < 0 && mPorMNum2 < 0 ? (mRst = true) : (mRst = false);
            }
            return mRst;
          }
          var mVtxs = aVtxs;
          var mAllSegs = [];
          for (var i = 0; i < mVtxs.length; i += 1) {
            var mIdxNex = (i + 1 + mVtxs.length) % mVtxs.length;
            mAllSegs.push([mVtxs[i], mVtxs[mIdxNex]]);
          }
          for (var i = 0; i < mAllSegs.length; i += 1) {
            for (var j = i; j < mAllSegs.length; j++) {
              var mIdxNex = (i + 1 + mAllSegs.length) % mAllSegs.length;
              var mIdxPre = (i - 1 + mAllSegs.length) % mAllSegs.length;
              if (j !== i || j !== mIdxPre || j !== mIdxNex) {
                if (
                  mChkCrossLineSegsFrom2LineSegs(
                    mAllSegs[i],
                    mAllSegs[j],
                    false,
                  ) == true
                ) {
                  return true;
                }
              }
            }
          }
          return false;
        }
        function mGetAreaAndAntiClock(aVtxs) {
          function mGetTriArea(aStd, aDir1, aDir2) {
            var Vec1 = aDir1 - aStd;
            var Vec2 = aDir2 - aStd;
            var crossZ = Vec1[0] * Vec2[1] - Vec2[0] * Vec1[1];
            return crossZ / 2;
          }
          var mAreaSum = 0;
          for (var i = 0; i < aVtxs.length; i += 1) {
            var mIdxNex = (i + 1 + aVtxs.length) % aVtxs.length;
            var mTriArea = mGetTriArea(0, aVtxs[i], aVtxs[mIdxNex]);
            mAreaSum += mTriArea;
          }
          if (mAreaSum > 0) {
            var mAnti = false;
          } else {
            var mAnti = true;
          }
          mAreaSum = Math.abs(mAreaSum);
          var mRst = {};
          mRst.mArea = mAreaSum;
          mRst.mAnti = mAnti;
          return mRst;
        }
        function mInvertPath(aSp) {
          var mSp = aSp;
          var mShapeObj = mSp.path.value;
          var mVtxs = mSp.path.value.vertices;
          var mIns = mSp.path.value.inTangents;
          var mOuts = mSp.path.value.outTangents;
          mShapeObj.vertices = mVtxs.reverse();
          mShapeObj.inTangents = mOuts.reverse();
          mShapeObj.outTangents = mIns.reverse();
          mSp.path.setValue(mShapeObj);
        }
        function mChkLargestAntiClock(aSl) {
          var mSl = aSl;
          var mPptyInCtsNum = mSl.property(
            "ADBE Root Vectors Group",
          ).numProperties;
          var mTxtGpTmp = mSl.property("ADBE Root Vectors Group")(1)(
            "ADBE Vectors Group",
          );
          var mPathes = [];
          for (var j = 1; j <= mTxtGpTmp.numProperties; j += 1) {
            var mPptyTmp = mTxtGpTmp(j);
            if (mPptyTmp.matchName !== "ADBE Vector Shape - Group") {
              continue;
            } else {
              var mVtxs = mPptyTmp.path.value.vertices;
              var mAreaAndAnti = mGetAreaAndAntiClock(mVtxs);
              mPathes.push(mAreaAndAnti);
            }
          }
          var mPathesSorted = mPathes.sort(function (a, b) {
            return a.mArea - b.mArea;
          });
          var mAntiOrNot = mPathesSorted[mPathesSorted.length - 1].mAnti;
          return mAntiOrNot;
        }
        var mSelVtxObjAry = aSelPtInfos;
        var mPointsObjAry = aAllPtInfos;
        var mCBValue = aCBValue;
        var mOglName = aOglName;
        var mSpAdrs = aSpAdrs;
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSps = mSl.selectedProperties;
        var mSpIdxs = [];
        for (var i = 0; i < mSps.length; i += 1) {
          mSpIdxs.push(mSps[i].propertyIndex);
        }
        var mVgName = mSps[0].propertyGroup(2).name;
        var mPptyNum = mSps.length;
        var mSelPointsObj = new mCreatePoints();
        for (var i = 0; i < mSps.length; i += 1) {
          for (var j = 0; j < mSelVtxObjAry[i].points.length; j += 1) {
            mSelPointsObj.points.push(mSelVtxObjAry[i].points[j]);
          }
        }
        var mSelPointsObjSorted = new mCreatePoints();
        mSelPointsObjSorted.points.push(mSelPointsObj.points[0]);
        for (var i = 0; i < mSelPointsObj.points.length - 1; i += 1) {
          var mIdx1 = (i % (mSelPointsObj.points.length - 1)) + 1;
          var mIdx2 = ((i + 1) % (mSelPointsObj.points.length - 1)) + 1;
          var mIdx3 = ((i + 2) % (mSelPointsObj.points.length - 1)) + 1;
          var mVtx1 = mSelPointsObj.points[0].mVtx;
          var mVtx2 = mSelPointsObj.points[mIdx1].mVtx;
          var mVtx3 = mSelPointsObj.points[mIdx2].mVtx;
          var mVtx4 = mSelPointsObj.points[mIdx3].mVtx;
          if (crossChk(mVtx1, mVtx2, mVtx3, mVtx4) == false) {
            mSelPointsObjSorted.points.push(mSelPointsObj.points[mIdx1]);
          } else {
            mCrossPoint = mSelPointsObj.points[mIdx1];
          }
        }
        mSelPointsObjSorted.points.splice(2, 0, mCrossPoint);
        var mMidPtX =
          (mSelPointsObjSorted.points[0].mVtx[0] +
            mSelPointsObjSorted.points[2].mVtx[0]) /
          2;
        var mMidPtY =
          (mSelPointsObjSorted.points[0].mVtx[1] +
            mSelPointsObjSorted.points[2].mVtx[1]) /
          2;
        var mMidPt = [mMidPtX, mMidPtY];
        var mPointsObjArySorted = [];
        for (var i = 0; i < mSps.length; i += 1) {
          mPointsObjArySorted = mPointsObjArySorted.concat(
            mSorting(mPointsObjAry[i].points, mSelVtxObjAry[i].points),
          );
        }
        for (var i = 0; i < mPointsObjArySorted.length; i += 1) {
          var mInfoF = mPointsObjArySorted[i].points[0];
          var mNewInfoF = new mCreatePointInfoObj();
          mNewInfoF.mIdx = mInfoF.mIdx;
          mNewInfoF.mVtx = mInfoF.mVtx;
          mNewInfoF.mIn = [0, 0];
          mNewInfoF.mOut = mInfoF.mOut;
          mPointsObjArySorted[i].points.splice(0, 1, mNewInfoF);
          var mLastNum = mPointsObjArySorted[i].points.length - 1;
          var mInfoL = mPointsObjArySorted[i].points[mLastNum];
          var mNewInfoL = new mCreatePointInfoObj();
          mNewInfoL.mIdx = mInfoL.mIdx;
          mNewInfoL.mVtx = mInfoL.mVtx;
          mNewInfoL.mIn = mInfoL.mIn;
          mNewInfoL.mOut = [0, 0];
          mPointsObjArySorted[i].points.splice(mLastNum, 1, mNewInfoL);
        }
        var mPointsObjArySortedConnected = mConnectPath(
          mPointsObjArySorted.slice(),
          mSelPointsObjSorted,
        );
        var mRevTof = false;
        if (mPptyNum === 1) {
          if (mPointsObjArySortedConnected.length !== 2) {
            mRevTof = true;
          }
        } else if (mPptyNum === 2) {
          var mSelPtNum1 = mSelVtxObjAry[0].points.length;
          var mSelPtNum2 = mSelVtxObjAry[1].points.length;
          if (mSelPtNum1 === 2 && mSelPtNum2 === 2) {
            for (var i = 0; i < mPointsObjArySortedConnected.length; i += 1) {
              var mPtObjTmp = mPointsObjArySortedConnected[i];
              var mVtxsTmp = [];
              for (var j = 0; j < mPtObjTmp.points.length; j += 1) {
                mVtxsTmp.push(mPtObjTmp.points[j].mVtx);
              }
              if (i === 0) {
                var mAntiChkStd = mGetAreaAndAntiClock(mVtxsTmp).mAnti;
                continue;
              } else {
                var mAntiChk = mGetAreaAndAntiClock(mVtxsTmp).mAnti;
                if (mAntiChk !== mAntiChkStd) {
                  break;
                }
              }
              mRevTof = true;
            }
          } else {
            if (mPointsObjArySortedConnected.length !== 1) {
              mRevTof = true;
            }
          }
        } else {
          if (mPptyNum === 3 || mPptyNum === 4) {
            mRevTof = true;
            for (var i = 0; i < mPointsObjArySortedConnected.length; i += 1) {
              var mPtObjTmp = mPointsObjArySortedConnected[i];
              var mVtxsTmp = [];
              for (var j = 0; j < mPtObjTmp.points.length; j += 1) {
                var mTgtVtx = mPtObjTmp.points[j].mVtx;
                var mMatchChk = false;
                for (var k = 0; k < mSelPointsObjSorted.points.length; k += 1) {
                  var mStdVtx = mSelPointsObjSorted.points[k].mVtx;
                  if (mMatch(mTgtVtx, mStdVtx) === true) {
                    mMatchChk = true;
                    break;
                  }
                }
                if (mMatchChk === false) {
                  mVtxsTmp.push(mTgtVtx);
                }
              }
              if (mChkSelfIntersect(mVtxsTmp) === true) {
                mRevTof = false;
                break;
              }
            }
          }
        }
        if (mRevTof === true) {
          mSelPointsObjSorted.points.reverse();
          mPointsObjArySortedConnected = mConnectPath(
            mPointsObjArySorted,
            mSelPointsObjSorted,
          );
        }
        if (mCBValue == true) {
          var mSelIVtxs = [];
          for (var i = 0; i < mSelPointsObjSorted.points.length; i += 1) {
            mSelIVtxs.push(mSelPointsObjSorted.points[i].mVtx);
          }
          for (var i = 0; i < mPointsObjArySortedConnected.length; i += 1) {
            var mNewForSmoothObjs = [];
            for (
              var j = 0;
              j < mPointsObjArySortedConnected[i].points.length;
              j += 1
            ) {
              var mStdVtx = mPointsObjArySortedConnected[i].points[j].mVtx;
              for (var k = 0; k < mSelIVtxs.length; k += 1) {
                if (mMatch(mStdVtx, mSelIVtxs[k]) == true) {
                  var mNewForSmoothObj = new mCreateForSmoothObj();
                  mNewForSmoothObj.mNowIdx = j;
                  mNewForSmoothObj.mVtx = mStdVtx;
                  mNewForSmoothObjs.push(mNewForSmoothObj);
                  break;
                }
              }
            }
            for (var j = 0; j < mNewForSmoothObjs.length; j += 1) {
              var mAllLength = mNewForSmoothObjs.length;
              var mNexJ = (j + 1 + mAllLength) % mAllLength;
              if (
                mNewForSmoothObjs[j].mNowIdx ==
                  mNewForSmoothObjs[mNexJ].mNowIdx - 1 ||
                (mNewForSmoothObjs[j].mNowIdx ==
                  mPointsObjArySortedConnected[i].points.length - 1 &&
                  mNewForSmoothObjs[mNexJ].mNowIdx == 0)
              ) {
                if (
                  mMatch(
                    mNewForSmoothObjs[j].mVtx,
                    mNewForSmoothObjs[mNexJ].mVtx,
                  ) == false
                ) {
                  var mPtForSmooth1 =
                    mPointsObjArySortedConnected[i].points[
                      mNewForSmoothObjs[j].mNowIdx
                    ];
                  var mPtForSmooth2 =
                    mPointsObjArySortedConnected[i].points[
                      mNewForSmoothObjs[mNexJ].mNowIdx
                    ];
                  var mNAry1Lgt = mGetLength(
                    mPtForSmooth1.mVtx,
                    mPtForSmooth2.mVtx,
                  );
                  if (mPtForSmooth1.mIn.toString() == "0,0") {
                    var mArySum = mPointsObjArySortedConnected[i].points.length;
                    var mIdxPre =
                      (mNewForSmoothObjs[j].mNowIdx - 1 + mArySum) % mArySum;
                    var mVtxPre =
                      mPointsObjArySortedConnected[i].points[mIdxPre].mVtx;
                    var mVec1ForSmooth = (mVtxPre - mPtForSmooth1.mVtx) * -1;
                  } else {
                    var mVec1ForSmooth = mPtForSmooth1.mIn * -1;
                  }
                  var mUnitVec1ForSmooth = mGetUnitVector(mVec1ForSmooth);
                  var mRstmOut = mUnitVec1ForSmooth * mNAry1Lgt * 0.33;
                  var mNewSetForRstmOut = new mCreatePointInfoObj();
                  mNewSetForRstmOut.mIdx = mPtForSmooth1.mIdx;
                  mNewSetForRstmOut.mVtx = mPtForSmooth1.mVtx;
                  mNewSetForRstmOut.mIn = mPtForSmooth1.mIn;
                  mNewSetForRstmOut.mOut = mRstmOut;
                  mPointsObjArySortedConnected[i].points[
                    mNewForSmoothObjs[j].mNowIdx
                  ] = mNewSetForRstmOut;
                  if (mPtForSmooth2.mOut.toString() == "0,0") {
                    var mArySum = mPointsObjArySortedConnected[i].points.length;
                    var mIdxNex =
                      (mNewForSmoothObjs[mNexJ].mNowIdx + 1 + mArySum) %
                      mArySum;
                    var mVtxNex =
                      mPointsObjArySortedConnected[i].points[mIdxNex].mVtx;
                    var mVec2ForSmooth = (mVtxNex - mPtForSmooth2.mVtx) * -1;
                  } else {
                    var mVec2ForSmooth = mPtForSmooth2.mOut * -1;
                  }
                  var mUnitVec2ForSmooth = mGetUnitVector(mVec2ForSmooth);
                  var mRstmIn = mUnitVec2ForSmooth * mNAry1Lgt * 0.33;
                  var mNewSetForRstmIn = new mCreatePointInfoObj();
                  mNewSetForRstmIn.mIdx = mPtForSmooth2.mIdx;
                  mNewSetForRstmIn.mVtx = mPtForSmooth2.mVtx;
                  mNewSetForRstmIn.mIn = mRstmIn;
                  mNewSetForRstmIn.mOut = mPtForSmooth2.mOut;
                  mPointsObjArySortedConnected[i].points[
                    mNewForSmoothObjs[mNexJ].mNowIdx
                  ] = mNewSetForRstmIn;
                }
              }
            }
          }
        }
        var mPrtPpty = mGetPptyFromAdrs(mSpAdrs, 1);
        for (var i = 0; i < mPointsObjArySortedConnected.length; i += 1) {
          var mNshape = mCreateNewShape(mPointsObjArySortedConnected[i]);
          var mShpPptyTmp = mPrtPpty.addProperty("ADBE Vector Shape - Group");
          mShpPptyTmp(2).setValue(mNshape);
        }
        for (var i = mSpIdxs.length - 1; i >= 0; i--) {
          mPrtPpty(mSpIdxs[i]).remove();
        }
        var mPptyNum = mPrtPpty.numProperties;
        for (var i = 0; i < mPointsObjArySortedConnected.length; i += 1) {
          mPrtPpty(mPptyNum).moveTo(mSpIdxs[0]);
        }
        var mPathNum = mPointsObjArySortedConnected.length;
        for (var i = 0; i < mPathNum; i += 1) {
          mPrtPpty(mSpIdxs[0] + i).selected = true;
          mPrtPpty(mSpIdxs[0] + i).name = mOglName;
        }
      }
      function mShapePatch01(aSelPtInfos, aAllPtInfos, aOglName, aSpAdrs) {
        function mDivAry(aAry, aIdx) {
          function mSlice(aAry, aN1, aN2) {
            if (aN2 < aN1) {
              var mFa = aAry.slice(aN1, aAry.length);
              var mLa = aAry.slice(0, aN2);
              mRst = mFa.concat(mLa);
            } else {
              mRst = aAry.slice(aN1, aN2);
            }
            return mRst;
          }
          var mAry01 = mSlice(aAry, aIdx[1], aIdx[2] + 1);
          var mAry02 = mSlice(aAry, aIdx[3], aIdx[0] + 1);
          return [mAry01, mAry02];
        }
        function mCreateNewShapeFromPts(aPoints) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aPoints.length; i += 1) {
            mV.push(aPoints[i].mVtx);
            mI.push(aPoints[i].mIn);
            mO.push(aPoints[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          return mShape;
        }
        function mAddShpPpty(aLyr, aGname) {
          var mShp = aLyr
            .property("ADBE Root Vectors Group")(aGname)("ADBE Vectors Group")
            .addProperty("ADBE Vector Shape - Group");
          return mShp;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        var mSelPtInfos = aSelPtInfos;
        var mAllPtInfos = aAllPtInfos;
        var mOglName = aOglName;
        var mSpAdrs = aSpAdrs;
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSp = mSl.selectedProperties[0];
        var mSpIdx = mSp.propertyIndex;
        var mVgName = mSp.propertyGroup(2).name;
        var mPtInfos = mAllPtInfos[0].points;
        var mSelIdxs = [];
        for (var i = 0; i < mSelPtInfos[0].points.length; i += 1) {
          mSelIdxs.push(mSelPtInfos[0].points[i].mIdx);
        }
        var mChkForF = false;
        var mChkForL = false;
        for (var i = 0; i < mSelIdxs.length; i += 1) {
          if (mSelIdxs[i] == 0) {
            mChkForF = true;
          }
          if (mSelIdxs[i] == mPtInfos.length - 1) {
            mChkForL = true;
          }
        }
        var mSelIdxsFixed = mSelIdxs;
        if (mChkForF == true && mChkForL == true) {
          mSelIdxsFixed = mSelIdxs
            .slice(mSelIdxs.length - 1, mSelIdxs.length)
            .concat(mSelIdxs.slice(0, mSelIdxs.length - 1));
        }
        var mNew2PtInfos = mDivAry(mPtInfos, mSelIdxsFixed);
        var mNewPtInfos1 = mNew2PtInfos[0];
        var mNewPtInfo = new mCreatePointInfoObj();
        mNewPtInfo.mIdx = mNewPtInfos1[0].mIdx;
        mNewPtInfo.mVtx = mNewPtInfos1[0].mVtx;
        mNewPtInfo.mIn = mNewPtInfos1[mNewPtInfos1.length - 1].mIn;
        mNewPtInfo.mOut = mNewPtInfos1[0].mOut;
        mNewPtInfos1[0] = mNewPtInfo;
        mNewPtInfos1.pop();
        var mNewPtInfos2 = mNew2PtInfos[1];
        var mNewPtInfo = new mCreatePointInfoObj();
        mNewPtInfo.mIdx = mNewPtInfos2[0].mIdx;
        mNewPtInfo.mVtx = mNewPtInfos2[0].mVtx;
        mNewPtInfo.mIn = mNewPtInfos2[mNewPtInfos2.length - 1].mIn;
        mNewPtInfo.mOut = mNewPtInfos2[0].mOut;
        mNewPtInfos2[0] = mNewPtInfo;
        mNewPtInfos2.pop();
        var mPrtPpty = mGetPptyFromAdrs(mSpAdrs, 1);
        var mNshape1 = mCreateNewShapeFromPts(mNewPtInfos1);
        var mNshape2 = mCreateNewShapeFromPts(mNewPtInfos2);
        var mShpPptyTmp1 = mPrtPpty.addProperty("ADBE Vector Shape - Group");
        mShpPptyTmp1(2).setValue(mNshape1);
        var mShpPptyTmp2 = mPrtPpty.addProperty("ADBE Vector Shape - Group");
        mShpPptyTmp2(2).setValue(mNshape2);
        mPrtPpty(mSpIdx).remove();
        var mPptyNum = mPrtPpty.numProperties;
        mPrtPpty(mPptyNum).moveTo(mSpIdx);
        mPrtPpty(mPptyNum).moveTo(mSpIdx);
        mPrtPpty(mSpIdx).selected = true;
        mPrtPpty(mSpIdx + 1).selected = true;
        mPrtPpty(mSpIdx).name = aOglName;
        mPrtPpty(mSpIdx + 1).name = aOglName;
      }
      function mShapePatch02(aSelPtInfos, aAllPtInfos, aOglName, aSpAdrs) {
        function mCnctAry(aAry01, aAry02, aIdx01, aIdx02) {
          var mNary01 = [];
          var mNary02 = [];
          if (aIdx01[0] == 0 && aIdx01[1] == aAry01.length - 1) {
            mNary01 = aAry01;
          } else {
            mNary01 = aAry01
              .slice(aIdx01[1], aAry01.length)
              .concat(aAry01.slice(0, aIdx01[0] + 1));
          }
          if (aIdx02[0] == 0 && aIdx02[1] == aAry02.length - 1) {
            mNary02 = aAry02;
          } else {
            mNary02 = aAry02
              .slice(aIdx02[1], aAry02.length)
              .concat(aAry02.slice(0, aIdx02[0] + 1));
          }
          var mNewPtInfos1 = mNary01;
          var mNewPtInfo1 = new mCreatePointInfoObj();
          mNewPtInfo1.mIdx = mNary01[0].mIdx;
          mNewPtInfo1.mVtx = mNary01[0].mVtx;
          mNewPtInfo1.mIn = mNary02[mNary02.length - 1].mIn;
          mNewPtInfo1.mOut = mNary01[0].mOut;
          mNewPtInfos1[0] = mNewPtInfo1;
          var mNewPtInfos2 = mNary02;
          var mNewPtInfo2 = new mCreatePointInfoObj();
          mNewPtInfo2.mIdx = mNary02[0].mIdx;
          mNewPtInfo2.mVtx = mNary02[0].mVtx;
          mNewPtInfo2.mIn = mNary01[mNary01.length - 1].mIn;
          mNewPtInfo2.mOut = mNary02[0].mOut;
          mNewPtInfos2[0] = mNewPtInfo2;
          mNewPtInfos1.pop();
          mNewPtInfos2.pop();
          return mNewPtInfos1.concat(mNewPtInfos2);
        }
        function mCreateNewShapeFromPts(aPoints) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aPoints.length; i += 1) {
            mV.push(aPoints[i].mVtx);
            mI.push(aPoints[i].mIn);
            mO.push(aPoints[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          return mShape;
        }
        function mAddShpPpty(aLyr, aGname) {
          var mShp = aLyr
            .property("ADBE Root Vectors Group")(aGname)("ADBE Vectors Group")
            .addProperty("ADBE Vector Shape - Group");
          return mShp;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        var mSelPtInfos = aSelPtInfos;
        var mAllPtInfos = aAllPtInfos;
        var mOglName = aOglName;
        var mSpAdrs = aSpAdrs;
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSp01 = mSl.selectedProperties[0];
        var mSp02 = mSl.selectedProperties[1];
        var mSpIdx1 = mSp01.propertyIndex;
        var mSpIdx2 = mSp02.propertyIndex;
        var mVgName = mSp01.propertyGroup(2).name;
        var mPtInfos1 = mAllPtInfos[0].points;
        var mPtInfos2 = mAllPtInfos[1].points;
        var mSelIdxs1 = [];
        for (var i = 0; i < mSelPtInfos[0].points.length; i += 1) {
          mSelIdxs1.push(mSelPtInfos[0].points[i].mIdx);
        }
        var mSelIdxs2 = [];
        for (var i = 0; i < mSelPtInfos[1].points.length; i += 1) {
          mSelIdxs2.push(mSelPtInfos[1].points[i].mIdx);
        }
        var mPtInfosFixed = mCnctAry(
          mPtInfos1,
          mPtInfos2,
          mSelIdxs1,
          mSelIdxs2,
        );
        var mPrtPpty = mGetPptyFromAdrs(mSpAdrs, 1);
        var mNshape1 = mCreateNewShapeFromPts(mPtInfosFixed);
        var mShpPptyTmp1 = mPrtPpty.addProperty("ADBE Vector Shape - Group");
        mShpPptyTmp1(2).setValue(mNshape1);
        mPrtPpty(mSpIdx2).remove();
        mPrtPpty(mSpIdx1).remove();
        var mPptyNum = mPrtPpty.numProperties;
        mPrtPpty(mPptyNum).moveTo(mSpIdx1);
        mPrtPpty(mSpIdx1).selected = true;
        mPrtPpty(mSpIdx1).name = mOglName;
      }
      function mShapePatchX(aSelPtInfos, aAllPtInfos, aOglName, aSpAdrs) {
        function mGetSelVtxObjAry() {
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSp = mSl.selectedProperties;
          app.beginUndoGroup("set01");
          var mAllVtxs = [];
          for (var i = 0; i < mSp.length; i += 1) {
            mAllVtxs.push(mSp[i].path.value.vertices);
          }
          app.executeCommand(21);
          var mNoUseVtxs = [];
          for (var i = 0; i < mSp.length; i += 1) {
            mNoUseVtxs.push(mSp[i].path.value.vertices);
          }
          app.endUndoGroup();
          app.executeCommand(16);
          var mIdxBox = [];
          for (var k = 0; k < mSp.length; k += 1) {
            mPointsObj = new mCreatePoints();
            for (var i = 0; i < mAllVtxs[k].length; i += 1) {
              mChk = false;
              for (var j = 0; j < mNoUseVtxs[k].length; j += 1) {
                if (mMatch(mAllVtxs[k][i], mNoUseVtxs[k][j])) {
                  mChk = true;
                  break;
                }
              }
              if (mChk == false) {
                mPointInfoObj = new mCreatePointInfoObj();
                mPointInfoObj.mIdx = i;
                mPointInfoObj.mVtx = mSp[k].path.value.vertices[i];
                mPointInfoObj.mIn = [0, 0];
                mPointInfoObj.mOut = [0, 0];
                mPointsObj.points.push(mPointInfoObj);
              }
            }
            mIdxBox.push(mPointsObj);
          }
          return mIdxBox;
        }
        function mCreatePointsObj(aPathPrt) {
          var mPointsObj = new mCreatePoints();
          for (var i = 0; i < aPathPrt.path.value.vertices.length; i += 1) {
            mPointInfoObj = new mCreatePointInfoObj();
            mPointInfoObj.mIdx = i;
            mPointInfoObj.mVtx = aPathPrt.path.value.vertices[i];
            mPointInfoObj.mIn = aPathPrt.path.value.inTangents[i];
            mPointInfoObj.mOut = aPathPrt.path.value.outTangents[i];
            mPointsObj.points.push(mPointInfoObj);
          }
          return mPointsObj;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mCreatePoints() {
          this.points = [];
          this.mChk0 = false;
          this.mChk = false;
          this.mChk2 = false;
        }
        function mSorting(aAry, aNbrs) {
          var mNarys = [];
          for (var i = 0; i < aNbrs.length - 1; i += 1) {
            mNewPointsObj = new mCreatePoints();
            mNewPointsObj.points = aAry.slice(
              aNbrs[i].mIdx,
              aNbrs[i + 1].mIdx + 1,
            );
            mNarys.push(mNewPointsObj);
          }
          var mPre1 = aAry.slice(aNbrs[aNbrs.length - 1].mIdx, aAry.length);
          var mPre2 = aAry.slice(0, aNbrs[0].mIdx + 1);
          mNewPointsObj = new mCreatePoints();
          mNewPointsObj.points = mPre1.concat(mPre2);
          mNarys.push(mNewPointsObj);
          return mNarys;
        }
        function mCreateNewShape(aPathPrt) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aPathPrt.points.length; i += 1) {
            mV.push(aPathPrt.points[i].mVtx);
            mI.push(aPathPrt.points[i].mIn);
            mO.push(aPathPrt.points[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          return mShape;
        }
        function mAddShpPpty(aLyr, aGname) {
          var mShp = aLyr
            .property("ADBE Root Vectors Group")(aGname)("ADBE Vectors Group")
            .addProperty("ADBE Vector Shape - Group");
          return mShp;
        }
        function crossChk(a, b, c, d) {
          var mR01 =
            (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
          var mR02 =
            (a[0] - b[0]) * (d[1] - a[1]) + (a[1] - b[1]) * (a[0] - d[0]);
          var mR03 =
            (c[0] - d[0]) * (a[1] - c[1]) + (c[1] - d[1]) * (c[0] - a[0]);
          var mR04 =
            (c[0] - d[0]) * (b[1] - c[1]) + (c[1] - d[1]) * (c[0] - b[0]);
          mR01 * mR02 < 0 && mR03 * mR04 < 0 ? (mToF = true) : (mToF = false);
          return mToF;
        }
        function judgeInOrOut(aPset, aMdlPt) {
          var mRSum = 0;
          for (var i = 0; i < aPset.points.length; i += 1) {
            mIdxNex = (i + 1 + aPset.points.length) % aPset.points.length;
            mA = aPset.points[i].mVtx - aMdlPt;
            mB = aPset.points[mIdxNex].mVtx - aMdlPt;
            mCos = mA[0] * mB[0] + mA[1] * mB[1];
            mSin = mA[0] * mB[1] - mA[1] * mB[0];
            mRSum -= (180 / Math.PI) * Math.atan2(mSin, mCos);
          }
          return Math.round(mRSum) > 0;
        }
        function mConnectPath(aPointsObjAry, aSelPointsObj) {
          var mPointsObjAryNew = [];
          for (var i = 0; i < aPointsObjAry.length; i += 1) {
            mFnum = aPointsObjAry[i].points.length - 1;
            mNewPointsTmp = new mCreatePoints();
            mNewPointsTmp.points = aPointsObjAry[i].points.slice();
            for (var j = 0; j < aSelPointsObj.points.length; j += 1) {
              if (
                mMatch(
                  mNewPointsTmp.points[mFnum].mVtx,
                  aSelPointsObj.points[j].mVtx,
                )
              ) {
                mIdxNex =
                  (j + 1 + aSelPointsObj.points.length) %
                  aSelPointsObj.points.length;
                var mNewSelPointsTmp = new mCreatePointInfoObj();
                mNewSelPointsTmp.mIdx = aSelPointsObj.points[mIdxNex].mIdx;
                mNewSelPointsTmp.mVtx = aSelPointsObj.points[mIdxNex].mVtx;
                mNewSelPointsTmp.mIn = aSelPointsObj.points[mIdxNex].mIn;
                mNewSelPointsTmp.mOut = aSelPointsObj.points[mIdxNex].mOut;
                mNewPointsTmp.points.push(mNewSelPointsTmp);
                break;
              }
            }
            mPointsObjAryNew.push(mNewPointsTmp);
          }
          var mAry = [];
          for (var i = 0; i < mPointsObjAryNew.length; i += 1) {
            mNewPointsObj = new mCreatePoints();
            mFnum = mPointsObjAryNew[i].points.length - 1;
            if (
              mMatch(
                mPointsObjAryNew[i].points[0].mVtx,
                mPointsObjAryNew[i].points[mFnum].mVtx,
              )
            ) {
              mNewPointsObj.points = mPointsObjAryNew[i].points.slice();
              mAry.push(mNewPointsObj);
              mPointsObjAryNew[i].mChk = true;
            }
          }
          for (var i = 0; i < mPointsObjAryNew.length; i += 1) {
            if (mPointsObjAryNew[i].mChk != true) {
              mNewPointsObj = new mCreatePoints();
              mNewPointsObj.points = mPointsObjAryNew[i].points.slice();
              mChk = false;
              mCnt = 0;
              while (mChk == false && mCnt < mPointsObjAryNew.length) {
                for (var j = 0; j < mPointsObjAryNew.length; j += 1) {
                  mFnum = mNewPointsObj.points.length - 1;
                  if (
                    mPointsObjAryNew[j].mChk != true &&
                    j != i &&
                    mMatch(
                      mNewPointsObj.points[mFnum].mVtx,
                      mPointsObjAryNew[j].points[0].mVtx,
                    ) == true
                  ) {
                    mNewPointsObj.points.pop();
                    mNewPointsObj.points = mNewPointsObj.points.concat(
                      mPointsObjAryNew[j].points.slice(),
                    );
                    mPointsObjAryNew[j].mChk = true;
                  }
                }
                mFnum2 = mNewPointsObj.points.length - 1;
                if (
                  mMatch(
                    mNewPointsObj.points[0].mVtx,
                    mNewPointsObj.points[mFnum2].mVtx,
                  ) == true
                ) {
                  mChk = true;
                }
                mCnt = mCnt + 1;
              }
              mAry.push(mNewPointsObj);
            }
          }
          for (var i = 0; i < mAry.length; i += 1) {
            mAry[i].points.pop();
          }
          return mAry;
        }
        function mRound(afFigure) {
          var mRst = Math.round(afFigure * 100) / 100;
          return mRst;
        }
        function mMatch(aVtx1, aVtx2) {
          if (
            mRound(aVtx1[0]) == mRound(aVtx2[0]) &&
            mRound(aVtx1[1]) == mRound(aVtx2[1])
          ) {
            return true;
          } else {
            return false;
          }
        }
        function mCreateForSmoothObj() {
          this.mNowIdx;
          this.mOglIdx;
        }
        function mGetUnitVector(aTgnt) {
          if (aTgnt.toString() == "0,0") {
            return [0, 0];
          }
          var mVecX = aTgnt[0];
          var mVecY = aTgnt[1];
          var mLength = Math.sqrt(Math.pow(mVecX, 2) + Math.pow(mVecY, 2));
          var mUnitVecX = mVecX / mLength;
          var mUnitVecY = mVecY / mLength;
          return [mUnitVecX, mUnitVecY];
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        function mChkSelfIntersect(aVtxs) {
          function mChkCrossLineSegsFrom2LineSegs(aSegs1, aSegs2, aToF) {
            function mCrsChkExp(a, b, c) {
              var mRst =
                (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
              return mRst;
            }
            function mRoundDec(afFigure, aNum) {
              var mRst = Math.round(afFigure * aNum) / aNum;
              return mRst;
            }
            var a = aSegs1[0];
            var b = aSegs1[1];
            var c = aSegs2[0];
            var d = aSegs2[1];
            var mR01 = mCrsChkExp(a, b, c);
            var mR02 = mCrsChkExp(a, b, d);
            var mR01Rnd = mRoundDec(mR01, 10000);
            var mR02Rnd = mRoundDec(mR02, 10000);
            var mPorMNum1 = mR01Rnd * mR02Rnd;
            var mR03 = mCrsChkExp(c, d, a);
            var mR04 = mCrsChkExp(c, d, b);
            var mR03Rnd = mRoundDec(mR03, 10000);
            var mR04Rnd = mRoundDec(mR04, 10000);
            var mPorMNum2 = mR03Rnd * mR04Rnd;
            if (aToF == true) {
              mPorMNum1 <= 0 && mPorMNum2 <= 0 ? (mRst = true) : (mRst = false);
            } else {
              mPorMNum1 < 0 && mPorMNum2 < 0 ? (mRst = true) : (mRst = false);
            }
            return mRst;
          }
          var mVtxs = aVtxs;
          var mAllSegs = [];
          for (var i = 0; i < mVtxs.length; i += 1) {
            var mIdxNex = (i + 1 + mVtxs.length) % mVtxs.length;
            mAllSegs.push([mVtxs[i], mVtxs[mIdxNex]]);
          }
          for (var i = 0; i < mAllSegs.length; i += 1) {
            for (var j = i; j < mAllSegs.length; j++) {
              var mIdxNex = (i + 1 + mAllSegs.length) % mAllSegs.length;
              var mIdxPre = (i - 1 + mAllSegs.length) % mAllSegs.length;
              if (j !== i || j !== mIdxPre || j !== mIdxNex) {
                if (
                  mChkCrossLineSegsFrom2LineSegs(
                    mAllSegs[i],
                    mAllSegs[j],
                    false,
                  ) == true
                ) {
                  return true;
                }
              }
            }
          }
          return false;
        }
        function mGetAreaAndAntiClock(aVtxs) {
          function mGetTriArea(aStd, aDir1, aDir2) {
            var Vec1 = aDir1 - aStd;
            var Vec2 = aDir2 - aStd;
            var crossZ = Vec1[0] * Vec2[1] - Vec2[0] * Vec1[1];
            return crossZ / 2;
          }
          var mAreaSum = 0;
          for (var i = 0; i < aVtxs.length; i += 1) {
            var mIdxNex = (i + 1 + aVtxs.length) % aVtxs.length;
            var mTriArea = mGetTriArea(0, aVtxs[i], aVtxs[mIdxNex]);
            mAreaSum += mTriArea;
          }
          if (mAreaSum > 0) {
            var mAnti = false;
          } else {
            var mAnti = true;
          }
          mAreaSum = Math.abs(mAreaSum);
          var mRst = {};
          mRst.mArea = mAreaSum;
          mRst.mAnti = mAnti;
          return mRst;
        }
        function mInvertPath(aSp) {
          var mSp = aSp;
          var mShapeObj = mSp.path.value;
          var mVtxs = mSp.path.value.vertices;
          var mIns = mSp.path.value.inTangents;
          var mOuts = mSp.path.value.outTangents;
          mShapeObj.vertices = mVtxs.reverse();
          mShapeObj.inTangents = mOuts.reverse();
          mShapeObj.outTangents = mIns.reverse();
          mSp.path.setValue(mShapeObj);
        }
        function mChkLargestAntiClock(aSl) {
          var mSl = aSl;
          var mPptyInCtsNum = mSl.property(
            "ADBE Root Vectors Group",
          ).numProperties;
          var mTxtGpTmp = mSl.property("ADBE Root Vectors Group")(1)(
            "ADBE Vectors Group",
          );
          var mPathes = [];
          for (var j = 1; j <= mTxtGpTmp.numProperties; j += 1) {
            var mPptyTmp = mTxtGpTmp(j);
            if (mPptyTmp.matchName !== "ADBE Vector Shape - Group") {
              continue;
            } else {
              var mVtxs = mPptyTmp.path.value.vertices;
              var mAreaAndAnti = mGetAreaAndAntiClock(mVtxs);
              mPathes.push(mAreaAndAnti);
            }
          }
          var mPathesSorted = mPathes.sort(function (a, b) {
            return a.mArea - b.mArea;
          });
          var mAntiOrNot = mPathesSorted[mPathesSorted.length - 1].mAnti;
          return mAntiOrNot;
        }
        function mSortAryForPatchX(aAllAry, aSelAry) {
          mAry = aAllAry;
          mSel = aSelAry;
          var mFChk = false;
          if (mSel[0] === 0) {
            mFChk = true;
          } else {
            mSel.unshift(0);
          }
          var mLChk = false;
          if (mSel[mSel.length - 1] === mAry.length - 1) {
            mLChk = true;
          } else {
            mSel.push(mAry.length - 1);
          }
          var mNewArys = [];
          for (var i = 0; i < mSel.length - 1; i += 1) {
            var mIdxNex = (i + 1 + mSel.length) % mSel.length;
            var mNewAry = mAry.slice(mSel[i], mSel[mIdxNex]);
            mNewAry.push(mAry[mSel[mIdxNex]]);
            mNewArys.push(mNewAry);
          }
          if (mFChk === false && mLChk === false) {
            var mFAry = mNewArys.slice(0, 1);
            var mLAry = mNewArys.slice(mNewArys.length - 1, mNewArys.length);
            var mAdd2Ary = mLAry.concat(mFAry);
            mNewArys.splice(mNewArys.length - 1, 1, mAdd2Ary);
            mNewArys.shift();
          }
          return mNewArys;
        }
        var mSelVtxObjAry = aSelPtInfos;
        var mPointsObjAry = aAllPtInfos;
        var mOglName = aOglName;
        var mSpAdrs = aSpAdrs;
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSps = mSl.selectedProperties;
        var mSpIdxs = [];
        for (var i = 0; i < mSps.length; i += 1) {
          mSpIdxs.push(mSps[i].propertyIndex);
        }
        var mVgName = mSps[0].propertyGroup(2).name;
        var mSelPointsObj = new mCreatePoints();
        for (var i = 0; i < mSelVtxObjAry.length; i += 1) {
          for (var j = 0; j < mSelVtxObjAry[i].points.length; j += 1) {
            mSelPointsObj.points.push(mSelVtxObjAry[i].points[j]);
          }
        }
        var mBucketsFor4Pt = new Array(mSelPointsObj.points.length);
        for (var i = 0; i < mSelPointsObj.points.length; i += 1) {
          mBucketsFor4Pt[i] = [mSelPointsObj.points[i]];
        }
        for (var i = 0; i < mBucketsFor4Pt.length; i += 1) {
          if (mBucketsFor4Pt[i].mChk0 === true) {
            continue;
          }
          for (var j = 0; j < mSelPointsObj.points.length; j += 1) {
            if (mSelPointsObj.points[j].mChk0 === true || j === i) {
              continue;
            }
            if (
              mMatch(mBucketsFor4Pt[i][0].mVtx, mSelPointsObj.points[j].mVtx)
            ) {
              mBucketsFor4Pt[i].push(mSelPointsObj.points[j]);
              mBucketsFor4Pt[i].mChk0 = true;
              mSelPointsObj.points[j].mChk0 = true;
            }
          }
        }
        for (var i = mBucketsFor4Pt.length - 1; i >= 0; i--) {
          if (mBucketsFor4Pt[i].length === 1) {
            mBucketsFor4Pt.splice(i, 1);
          }
        }
        var mPointsTmp = [];
        for (var i = 0; i < mBucketsFor4Pt.length; i += 1) {
          var mObjTmp = new mCreatePointInfoObj();
          mObjTmp.mVtx = mBucketsFor4Pt[i][0].mVtx;
          mPointsTmp.push(mObjTmp);
        }
        for (var i = 0; i < mBucketsFor4Pt.length; i += 1) {
          var mInTmp = mBucketsFor4Pt[i][0].mIn;
          if (mInTmp.toString() === "0,0") {
            for (var j = 0; j < mBucketsFor4Pt[i].length; j += 1) {
              if (mBucketsFor4Pt[i][j].mIn !== "0,0") {
                mInTmp = mBucketsFor4Pt[i][j].mIn;
              }
            }
          }
          mPointsTmp[i].mIn = mInTmp;
          var mOutTmp = mBucketsFor4Pt[i][0].mOut;
          if (mOutTmp.toString() === "0,0") {
            for (var j = 0; j < mBucketsFor4Pt[i].length; j += 1) {
              if (mBucketsFor4Pt[i][j].mOut !== "0,0") {
                mOutTmp = mBucketsFor4Pt[i][j].mOut;
              }
            }
          }
          mPointsTmp[i].mOut = mOutTmp;
        }
        mSelPointsObj.points = mPointsTmp;
        var mNewPathObjs = [];
        for (var i = 0; i < mPointsObjAry.length; i += 1) {
          var mTgtPtObj = mPointsObjAry[i];
          var mSelPtIdxs = [];
          for (var j = 0; j < mTgtPtObj.points.length; j += 1) {
            for (var k = 0; k < mSelPointsObj.points.length; k += 1) {
              if (
                mMatch(
                  mTgtPtObj.points[j].mVtx,
                  mSelPointsObj.points[k].mVtx,
                ) === true
              ) {
                mSelPtIdxs.push(j);
                break;
              }
            }
          }
          var mPtsTmp = mSortAryForPatchX(mTgtPtObj.points, mSelPtIdxs);
          for (var j = 0; j < mPtsTmp.length; j += 1) {
            var mPtsObjTmp = new mCreatePoints();
            mPtsObjTmp.points = mPtsTmp[j].slice();
            mNewPathObjs.push(mPtsObjTmp);
          }
        }
        for (var i = mNewPathObjs.length - 1; i >= 0; i--) {
          if (mNewPathObjs[i].points.length < 3) {
            mNewPathObjs.splice(i, 1);
          }
        }
        var mNewPathObjsCtd = [];
        for (var i = 0; i < mNewPathObjs.length; i += 1) {
          if (
            mMatch(
              mNewPathObjs[i].points[0].mVtx,
              mNewPathObjs[i].points[mNewPathObjs[i].points.length - 1].mVtx,
            )
          ) {
            var mPathObjPtsTmp = mNewPathObjs[i].points.slice();
            var mPathObjTmp = new mCreatePoints();
            mPathObjTmp.points = mPathObjPtsTmp.slice();
            mNewPathObjsCtd.push(mPathObjTmp);
            mNewPathObjs[i].mChk = true;
          }
        }
        for (var i = mNewPathObjs.length - 1; i >= 0; i--) {
          if (mNewPathObjs[i].mChk === true) {
            mNewPathObjs.splice(i, 1);
          }
        }
        var mNewPathObjsCtdTmp = [];
        for (var i = 0; i < mNewPathObjs.length; i += 1) {
          if (mNewPathObjs[i].mChk === true) {
            continue;
          }
          var mPathObjPtsTmp = mNewPathObjs[i].points.slice();
          for (var j = 0; j < mNewPathObjs.length; j += 1) {
            if (mNewPathObjs[j].mChk === true || j === i) {
              continue;
            }
            if (
              mMatch(
                mPathObjPtsTmp[mPathObjPtsTmp.length - 1].mVtx,
                mNewPathObjs[j].points[0].mVtx,
              )
            ) {
              var mPathObjPtsTmp1 = mPathObjPtsTmp.slice(
                0,
                mPathObjPtsTmp.length - 1,
              );
              var mPathObjPtsTmp2 = mNewPathObjs[j].points.slice();
              var mPathObjPtsTmp = mPathObjPtsTmp1.concat(mPathObjPtsTmp2);
              mNewPathObjs[i].mChk = true;
              mNewPathObjs[j].mChk = true;
            }
          }
          var mPathObjTmp = new mCreatePoints();
          mPathObjTmp.points = mPathObjPtsTmp.slice();
          mNewPathObjsCtdTmp.push(mPathObjTmp);
        }
        for (var i = 0; i < mNewPathObjsCtdTmp.length; i += 1) {
          if (mNewPathObjsCtdTmp[i].mChk2 === true) {
            continue;
          }
          var mPathObjPtsTmp = mNewPathObjsCtdTmp[i].points.slice();
          for (var j = 0; j < mNewPathObjsCtdTmp.length; j += 1) {
            if (mNewPathObjsCtdTmp[j].mChk2 === true || j === i) {
              continue;
            }
            if (
              mMatch(
                mPathObjPtsTmp[mPathObjPtsTmp.length - 1].mVtx,
                mNewPathObjsCtdTmp[j].points[0].mVtx,
              )
            ) {
              var mPathObjPtsTmp1 = mPathObjPtsTmp.slice(
                0,
                mPathObjPtsTmp.length - 1,
              );
              var mPathObjPtsTmp2 = mNewPathObjsCtdTmp[j].points.slice();
              var mPathObjPtsTmp = mPathObjPtsTmp1.concat(mPathObjPtsTmp2);
              mNewPathObjsCtdTmp[i].mChk2 = true;
              mNewPathObjsCtdTmp[j].mChk2 = true;
            }
          }
          var mPathObjTmp = new mCreatePoints();
          mPathObjTmp.points = mPathObjPtsTmp.slice();
          mNewPathObjsCtd.push(mPathObjTmp);
        }
        for (var i = 0; i < mNewPathObjsCtd.length; i += 1) {
          mNewPathObjsCtd[i].points = mNewPathObjsCtd[i].points.slice(
            0,
            mNewPathObjsCtd[i].points.length - 1,
          );
        }
        for (var i = 0; i < mNewPathObjsCtd.length; i += 1) {
          var mTgtObjTmp = mNewPathObjsCtd[i];
          for (var j = 0; j < mTgtObjTmp.points.length; j += 1) {
            for (var k = 0; k < mSelPointsObj.points.length; k += 1) {
              if (
                mMatch(mTgtObjTmp.points[j].mVtx, mSelPointsObj.points[k].mVtx)
              ) {
                mNewPathObjsCtd[i].points.splice(j, 1, mSelPointsObj.points[k]);
              }
            }
          }
        }
        var mPrtPpty = mGetPptyFromAdrs(mSpAdrs, 1);
        for (var i = 0; i < mNewPathObjsCtd.length; i += 1) {
          var mNshape = mCreateNewShape(mNewPathObjsCtd[i]);
          var mShpPptyTmp = mPrtPpty.addProperty("ADBE Vector Shape - Group");
          mShpPptyTmp(2).setValue(mNshape);
        }
        for (var i = mSpIdxs.length - 1; i >= 0; i--) {
          mPrtPpty(mSpIdxs[i]).remove();
        }
        var mPptyNum = mPrtPpty.numProperties;
        for (var i = 0; i < mNewPathObjsCtd.length; i += 1) {
          mPrtPpty(mPptyNum).moveTo(mSpIdxs[0]);
        }
        for (var i = 0; i < mNewPathObjsCtd.length; i += 1) {
          mPrtPpty(mSpIdxs[0] + i).selected = true;
          mPrtPpty(mSpIdxs[0] + i).name = mOglName;
        }
      }
      function mShapeMarge(aSelPtInfos, aAllPtInfos, aPpty) {
        function mDivAry(a, b, c) {
          var SL01 = a.slice(b, c + 1);
          var PRE01 = a.slice(0, b + 1);
          var PRE02 = a.slice(c, a.length);
          var SL02 = PRE02.concat(PRE01);
          var V = [SL01, SL02];
          return V;
        }
        function mOverwritePath(aObjAry, aPathPpty) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aObjAry.length; i += 1) {
            mV.push(aObjAry[i].mVtx);
            mI.push(aObjAry[i].mIn);
            mO.push(aObjAry[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          aPathPpty.path.setValue(mShape);
          return aPathPpty;
        }
        function mGetUnitVector(aTgnt) {
          if (aTgnt.toString() == "0,0") {
            return [0, 0];
          }
          var mVecX = aTgnt[0];
          var mVecY = aTgnt[1];
          var mLength = Math.sqrt(Math.pow(mVecX, 2) + Math.pow(mVecY, 2));
          var mUnitVecX = mVecX / mLength;
          var mUnitVecY = mVecY / mLength;
          return [mUnitVecX, mUnitVecY];
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mReturnSmoothOutIn(aNAry) {
          var mNAry1 = aNAry;
          var mNAry1Lgt = mGetLength(
            mNAry1[0].mVtx,
            mNAry1[mNAry1.length - 1].mVtx,
          );
          if (mNAry1[0].mOut.toString() == "0,0") {
            var mVec1ForSmooth = (mNAry1[1].mVtx - mNAry1[0].mVtx) * -1;
          } else {
            var mVec1ForSmooth = mNAry1[0].mOut * -1;
          }
          var mUnitVec1ForSmooth = mGetUnitVector(mVec1ForSmooth);
          var mRstmIn = mUnitVec1ForSmooth * mNAry1Lgt * 0.33;
          var mNewSetForRstmIn = new mCreatePointInfoObj();
          mNewSetForRstmIn.mIdx = mNAry1[0].mIdx;
          mNewSetForRstmIn.mVtx = mNAry1[0].mVtx;
          mNewSetForRstmIn.mIn = mRstmIn;
          mNewSetForRstmIn.mOut = mNAry1[0].mOut;
          mNAry1[0] = mNewSetForRstmIn;
          if (mNAry1[mNAry1.length - 1].mIn.toString() == "0,0") {
            var mVec2ForSmooth =
              (mNAry1[mNAry1.length - 2].mVtx -
                mNAry1[mNAry1.length - 1].mVtx) *
              -1;
          } else {
            var mVec2ForSmooth = mNAry1[mNAry1.length - 1].mIn * -1;
          }
          var mUnitVec2ForSmooth = mGetUnitVector(mVec2ForSmooth);
          var mRstmOut = mUnitVec2ForSmooth * mNAry1Lgt * 0.33;
          var mNewSetForRstmOut = new mCreatePointInfoObj();
          mNewSetForRstmOut.mIdx = mNAry1[mNAry1.length - 1].mIdx;
          mNewSetForRstmOut.mVtx = mNAry1[mNAry1.length - 1].mVtx;
          mNewSetForRstmOut.mIn = mNAry1[mNAry1.length - 1].mIn;
          mNewSetForRstmOut.mOut = mRstmOut;
          mNAry1[mNAry1.length - 1] = mNewSetForRstmOut;
          return mNAry1;
        }
        function mReturnZeroOutIn(aNAry) {
          var mNAry1 = aNAry;
          var mNewSetForRstmIn = new mCreatePointInfoObj();
          mNewSetForRstmIn.mIdx = mNAry1[0].mIdx;
          mNewSetForRstmIn.mVtx = mNAry1[0].mVtx;
          mNewSetForRstmIn.mIn = [0, 0];
          mNewSetForRstmIn.mOut = mNAry1[0].mOut;
          mNAry1[0] = mNewSetForRstmIn;
          var mNewSetForRstmOut = new mCreatePointInfoObj();
          mNewSetForRstmOut.mIdx = mNAry1[mNAry1.length - 1].mIdx;
          mNewSetForRstmOut.mVtx = mNAry1[mNAry1.length - 1].mVtx;
          mNewSetForRstmOut.mIn = mNAry1[mNAry1.length - 1].mIn;
          mNewSetForRstmOut.mOut = [0, 0];
          mNAry1[mNAry1.length - 1] = mNewSetForRstmOut;
          return mNAry1;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mCreatePoints() {
          this.points = [];
          this.check = false;
        }
        var mSelPtInfos = aSelPtInfos;
        var mAllPtInfos = aAllPtInfos;
        var mSp = aPpty;
        var mPtInfos = mAllPtInfos[0].points;
        var mSelIdx1 = mSelPtInfos[0].points[0].mIdx;
        var mSelIdx2 = mSelPtInfos[0].points[1].mIdx;
        if (mSelIdx1 == 0 && mSelIdx2 == mPtInfos.length - 1) {
          var mSelIPt1 = mSelPtInfos[0].points[1];
          var mSelIPt2 = mSelPtInfos[0].points[0];
        } else {
          var mSelIPt1 = mSelPtInfos[0].points[0];
          var mSelIPt2 = mSelPtInfos[0].points[1];
        }
        var mMidPt = new mCreatePointInfoObj();
        mMidPt.mVtx = (mSelIPt1.mVtx + mSelIPt2.mVtx) / 2;
        mMidPt.mIn = mSelIPt1.mIn;
        mMidPt.mOut = mSelIPt2.mOut;
        mPtInfos[mSelIPt1.mIdx].mVtx = null;
        mPtInfos[mSelIPt2.mIdx].mVtx = null;
        for (var i = mPtInfos.length - 1; i >= 0; i--) {
          if (mPtInfos[i].mVtx === null) {
            mPtInfos.splice(i, 1);
            var mInsertNum = i;
          }
        }
        mPtInfos.splice(mInsertNum, 0, mMidPt);
        mOverwritePath(mPtInfos, mSp);
      }
      function mShapeMargeAll(aAllPtInfos, aPptys, aLmtLgt) {
        function mGetMgedPtsAry(aPtAry, aLmtLgt, aVgPpty) {
          var mLmtLgt = aLmtLgt;
          var mPts = aPtAry;
          var mVgPpty = aVgPpty;
          var mNewPtArys = [];
          var mCntK = 0;
          for (var j = 0; j < mPts.length; j = mCntK) {
            var mNewPtAry = [];
            var mStdPt = mPts[j];
            for (var k = j + 1; k < mPts.length; k++) {
              var mVtx1 = mConvertToComp(mVgPpty, mStdPt.mVtx);
              var mVtx2 = mConvertToComp(mVgPpty, mPts[k].mVtx);
              if (mGetLength(mVtx1, mVtx2) < mLmtLgt) {
                if (k === j + 1) {
                  mNewPtAry.push(mPts[j]);
                  mNewPtAry.push(mPts[k]);
                } else {
                  mNewPtAry.push(mPts[k]);
                }
                mStdPt = mPts[k];
                mCntK += 1;
                if (k === mPts.length - 1) {
                  mNewPtArys.push(mNewPtAry);
                  var mLastChk = true;
                }
              } else {
                if (mNewPtAry.length !== 0) {
                  mNewPtArys.push(mNewPtAry);
                } else {
                  mNewPtArys.push([mPts[j]]);
                }
                break;
              }
            }
            if (j === mPts.length - 1 && mLastChk !== true) {
              mNewPtArys.push([mPts[j]]);
            }
            mCntK += 1;
          }
          if (mNewPtArys.length >= 2) {
            var mPtFst = mNewPtArys[0][0];
            var mPtLst =
              mNewPtArys[mNewPtArys.length - 1][
                mNewPtArys[mNewPtArys.length - 1].length - 1
              ];
            var mVtx1 = mConvertToComp(mVgPpty, mPtFst.mVtx);
            var mVtx2 = mConvertToComp(mVgPpty, mPtLst.mVtx);
            if (mGetLength(mVtx1, mVtx2) < mLmtLgt) {
              var mNewAryTmp = mNewPtArys[mNewPtArys.length - 1].concat(
                mNewPtArys[0],
              );
              mNewPtArys.pop();
              mNewPtArys.splice(0, 1, mNewAryTmp);
            }
          }
          for (var i = 0; i < mNewPtArys.length; i += 1) {
            if (mNewPtArys[i].length === 1) {
              mNewPtArys.splice(i, 1, mNewPtArys[i][0]);
            } else {
              var mPtTmpF = mNewPtArys[i][0];
              var mPtTmpL = mNewPtArys[i][mNewPtArys[i].length - 1];
              var mMidPtInfo = {};
              mMidPtInfo.mVtx = (mPtTmpF.mVtx + mPtTmpL.mVtx) / 2;
              mMidPtInfo.mIn = mPtTmpF.mIn;
              mMidPtInfo.mOut = mPtTmpL.mOut;
              mNewPtArys.splice(i, 1, mMidPtInfo);
            }
          }
          return mNewPtArys;
        }
        function mOverwritePath(aObjAry, aPathPpty) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aObjAry.length; i += 1) {
            mV.push(aObjAry[i].mVtx);
            mI.push(aObjAry[i].mIn);
            mO.push(aObjAry[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          aPathPpty.path.setValue(mShape);
          return aPathPpty;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        var mAllPtInfos = aAllPtInfos;
        var mSps = aPptys;
        var mLmtLgt = aLmtLgt;
        for (var i = 0; i < mAllPtInfos.length; i += 1) {
          var mVgTmp = mSps[i].propertyGroup(2);
          var mMgedPtsAry = mGetMgedPtsAry(
            mAllPtInfos[i].points,
            mLmtLgt,
            mVgTmp,
          );
          mOverwritePath(mMgedPtsAry, mSps[i]);
        }
      }
      function mShapeMargeFontSize(aVgs, aFontSizes) {
        function mGetMgedPtsAryInPptyCord(aPtAry, aLmtLgt) {
          var mLmtLgt = aLmtLgt;
          var mPts = aPtAry;
          var mNewPtArys = [];
          var mCntK = 0;
          for (var j = 0; j < mPts.length; j = mCntK) {
            var mNewPtAry = [];
            var mStdPt = mPts[j];
            for (var k = j + 1; k < mPts.length; k++) {
              var mVtx1 = mStdPt.mVtx;
              var mVtx2 = mPts[k].mVtx;
              if (mGetLength(mVtx1, mVtx2) < mLmtLgt) {
                if (k === j + 1) {
                  mNewPtAry.push(mPts[j]);
                  mNewPtAry.push(mPts[k]);
                } else {
                  mNewPtAry.push(mPts[k]);
                }
                mStdPt = mPts[k];
                mCntK += 1;
                if (k === mPts.length - 1) {
                  mNewPtArys.push(mNewPtAry);
                  var mLastChk = true;
                }
              } else {
                if (mNewPtAry.length !== 0) {
                  mNewPtArys.push(mNewPtAry);
                } else {
                  mNewPtArys.push([mPts[j]]);
                }
                break;
              }
            }
            if (j === mPts.length - 1 && mLastChk !== true) {
              mNewPtArys.push([mPts[j]]);
            }
            mCntK += 1;
          }
          if (mNewPtArys.length >= 2) {
            var mPtFst = mNewPtArys[0][0];
            var mPtLst =
              mNewPtArys[mNewPtArys.length - 1][
                mNewPtArys[mNewPtArys.length - 1].length - 1
              ];
            var mVtx1 = mPtFst.mVtx;
            var mVtx2 = mPtLst.mVtx;
            if (mGetLength(mVtx1, mVtx2) < mLmtLgt) {
              var mNewAryTmp = mNewPtArys[mNewPtArys.length - 1].concat(
                mNewPtArys[0],
              );
              mNewPtArys.pop();
              mNewPtArys.splice(0, 1, mNewAryTmp);
            }
          }
          for (var i = 0; i < mNewPtArys.length; i += 1) {
            if (mNewPtArys[i].length === 1) {
              mNewPtArys.splice(i, 1, mNewPtArys[i][0]);
            } else {
              var mPtTmpF = mNewPtArys[i][0];
              var mPtTmpL = mNewPtArys[i][mNewPtArys[i].length - 1];
              var mMidPtInfo = {};
              mMidPtInfo.mVtx = (mPtTmpF.mVtx + mPtTmpL.mVtx) / 2;
              mMidPtInfo.mIn = mPtTmpF.mIn;
              mMidPtInfo.mOut = mPtTmpL.mOut;
              mNewPtArys.splice(i, 1, mMidPtInfo);
            }
          }
          return mNewPtArys;
        }
        function mOverwritePath(aObjAry, aPathPpty) {
          var mShape = new Shape();
          var mV = [];
          var mI = [];
          var mO = [];
          for (var i = 0; i < aObjAry.length; i += 1) {
            mV.push(aObjAry[i].mVtx);
            mI.push(aObjAry[i].mIn);
            mO.push(aObjAry[i].mOut);
          }
          mShape.vertices = mV;
          mShape.inTangents = mI;
          mShape.outTangents = mO;
          mShape.closed = true;
          aPathPpty.path.setValue(mShape);
          return aPathPpty;
        }
        function mCreatePointInfoObj() {
          this.mIdx;
          this.mVtx;
          this.mIn;
          this.mOut;
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        var mVgs = aVgs;
        var mFontSizes = aFontSizes;
        var mStdRatio = 0.01;
        for (var i = 0; i < mVgs.length; i += 1) {
          var mVg = mVgs[i];
          var mFontSize = mFontSizes[i];
          var mLmtLgt = mFontSize * mStdRatio;
          for (var j = 0; j < mVg.length; j += 1) {
            var mPathPpty = mVg[j];
            var mInfos = [];
            for (var k = 0; k < mPathPpty.path.value.vertices.length; k += 1) {
              var mInfo = new mCreatePointInfoObj();
              mInfo.mIdx = j;
              mInfo.mVtx = mPathPpty.path.value.vertices[k];
              mInfo.mIn = mPathPpty.path.value.inTangents[k];
              mInfo.mOut = mPathPpty.path.value.outTangents[k];
              mInfos.push(mInfo);
            }
            var mMgedPtsAry = mGetMgedPtsAryInPptyCord(mInfos, mLmtLgt);
            mOverwritePath(mMgedPtsAry, mPathPpty);
          }
        }
      }
      function mTextSeparater(
        aChkCtr,
        aChkPreCmp,
        aMargin,
        aChkSame,
        aChkMrge,
        aChkAuto,
        aChkLim,
        aLmtMrge,
      ) {
        function mGetAreaAndAntiClock(aVtxs) {
          function mGetTriArea(aStd, aDir1, aDir2) {
            var Vec1 = aDir1 - aStd;
            var Vec2 = aDir2 - aStd;
            var crossZ = Vec1[0] * Vec2[1] - Vec2[0] * Vec1[1];
            return crossZ / 2;
          }
          var mAreaSum = 0;
          for (var i = 0; i < aVtxs.length; i += 1) {
            var mIdxNex = (i + 1 + aVtxs.length) % aVtxs.length;
            var mTriArea = mGetTriArea(0, aVtxs[i], aVtxs[mIdxNex]);
            mAreaSum += mTriArea;
          }
          if (mAreaSum > 0) {
            var mAnti = false;
          } else {
            var mAnti = true;
          }
          mAreaSum = Math.abs(mAreaSum);
          var mRst = {};
          mRst.mArea = mAreaSum;
          mRst.mAnti = mAnti;
          return mRst;
        }
        function mInvertPath(aSp) {
          var mSp = aSp;
          var mShapeObj = mSp.path.value;
          var mVtxs = mSp.path.value.vertices;
          var mIns = mSp.path.value.inTangents;
          var mOuts = mSp.path.value.outTangents;
          mShapeObj.vertices = mVtxs.reverse();
          mShapeObj.inTangents = mOuts.reverse();
          mShapeObj.outTangents = mIns.reverse();
          mSp.path.setValue(mShapeObj);
        }
        function mChkAntiClockAndInvert(aSl) {
          var mSl = aSl;
          var mTxtGpTmp = mSl.property("ADBE Root Vectors Group")(1)(
            "ADBE Vectors Group",
          );
          var mPathes = [];
          for (var j = 1; j <= mTxtGpTmp.numProperties; j += 1) {
            var mPptyTmp = mTxtGpTmp(j);
            if (mPptyTmp.matchName !== "ADBE Vector Shape - Group") {
              continue;
            } else {
              var mVtxs = mPptyTmp.path.value.vertices;
              var mAreaAndAnti = mGetAreaAndAntiClock(mVtxs);
              mPathes.push(mAreaAndAnti);
            }
          }
          var mPathesSorted = mPathes.sort(function (a, b) {
            return a.mArea - b.mArea;
          });
          var mAntiOrNot = mPathesSorted[mPathesSorted.length - 1].mAnti;
          if (mAntiOrNot === true) {
          } else {
            var mTxtGps = mSl.property("ADBE Root Vectors Group");
            for (var i = 1; i <= mTxtGps.numProperties; i += 1) {
              var mTxtGpTmp = mTxtGps(i)("ADBE Vectors Group");
              for (var j = 1; j <= mTxtGpTmp.numProperties; j += 1) {
                var mPptyTmp = mTxtGpTmp(j);
                if (mPptyTmp.matchName !== "ADBE Vector Shape - Group") {
                  continue;
                } else {
                  mInvertPath(mPptyTmp);
                }
              }
            }
          }
        }
        function mCeil(aNum) {
          var mRst = Math.ceil(aNum);
          if (mRst % 2 === 1) {
            mRst = mRst + 1;
          }
          return mRst;
        }
        function mGetRotatedPt(aStdPt, aTgtPt, aRtn) {
          var mLgtRX = aTgtPt[0] - aStdPt[0];
          var mLgtRY = aTgtPt[1] - aStdPt[1];
          var mLgtR = Math.sqrt(Math.pow(mLgtRX, 2) + Math.pow(mLgtRY, 2));
          var mROgl = Math.atan2(mLgtRY, mLgtRX);
          var mRd = aRtn * (Math.PI / 180);
          var mPtR = [
            Math.cos(mROgl + mRd) * mLgtR,
            Math.sin(mROgl + mRd) * mLgtR,
          ];
          return mPtR + aStdPt;
        }
        function mGetStyleStrs(aSl) {
          function mGetStyleStr(aSyl1) {
            var mRstStr = "";
            mRstStr = mRstStr + aSyl1.text.toString();
            mRstStr = mRstStr + aSyl1.font.toString();
            mRstStr = mRstStr + aSyl1.fontSize.toString();
            mRstStr = mRstStr + aSyl1.applyFill.toString();
            if (aSyl1.applyFill === true) {
              mRstStr = mRstStr + aSyl1.fillColor.toString();
            }
            mRstStr = mRstStr + aSyl1.applyStroke.toString();
            if (aSyl1.applyStroke === true) {
              mRstStr = mRstStr + aSyl1.strokeColor.toString();
            }
            mRstStr = mRstStr + aSyl1.strokeOverFill.toString();
            mRstStr = mRstStr + aSyl1.strokeWidth.toString();
            mRstStr = mRstStr + aSyl1.fauxBold.toString();
            mRstStr = mRstStr + aSyl1.fauxItalic.toString();
            mRstStr = mRstStr + aSyl1.allCaps.toString();
            mRstStr = mRstStr + aSyl1.smallCaps.toString();
            mRstStr = mRstStr + aSyl1.superscript.toString();
            mRstStr = mRstStr + aSyl1.subscript.toString();
            mRstStr = mRstStr + aSyl1.verticalScale.toString();
            mRstStr = mRstStr + aSyl1.horizontalScale.toString();
            mRstStr = mRstStr + aSyl1.baselineShift.toString();
            mRstStr = mRstStr + aSyl1.tsume.toString();
            return mRstStr;
          }
          function mGetFontSize(aSyl1) {
            var mRst = aSyl1.fontSize;
            return mRst;
          }
          var mSl = aSl;
          var mSp = mSl.property("ADBE Text Properties")("ADBE Text Document");
          var mSourceTxt = mSl.property("ADBE Text Properties")(
            "ADBE Text Document",
          ).value;
          var mTxtNum = mSourceTxt.text.length;
          var mSld = mSl.effect.addProperty("ADBE Slider Control");
          mSld.name = "TextSeparater Slider";
          var mExpForTxtStyle =
            '\n        var mIdx =  effect("TextSeparater Slider")("ADBE Slider Control-0001");\n        var mT = value[ mIdx ];\n        var mStl = getStyleAt( mIdx, t = time );\n        mStl.setText(mT);\n    ';
          var mFuncTxt = mConvertExpStrToStr(mExpForTxtStyle, true);
          mSp.expression = mFuncTxt;
          var mStylStrs = [];
          var mFontSizes = [];
          for (var i = 0; i < mTxtNum; i += 1) {
            mSl
              .effect("TextSeparater Slider")("ADBE Slider Control-0001")
              .setValue(i);
            mSourceTxt = mSl.property("ADBE Text Properties")(
              "ADBE Text Document",
            ).value;
            var mStylSr = mGetStyleStr(mSourceTxt);
            var mFontSize = mGetFontSize(mSourceTxt);
            mStylStrs.push(mStylSr);
            mFontSizes.push(mFontSize);
          }
          mSp.expression = "";
          mSl.effect("TextSeparater Slider").remove();
          var mRstStyles = {};
          mRstStyles.mStyleStrs = mStylStrs;
          mRstStyles.mFontSizes = mFontSizes;
          return mRstStyles;
        }
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSps = mSl.selectedProperties;
        for (var i = 0; i < mSps.length; i += 1) {
          mSps[i].selected = false;
        }
        var mSlOglname = mAi.selectedLayers[0].name;
        var mSlInP = mSl.inPoint;
        var mSlDur = mSl.outPoint - mSl.inPoint;
        var mStylesObj = mGetStyleStrs(mSl);
        var mStylesStrs = mStylesObj.mStyleStrs;
        var mFontSizes = mStylesObj.mFontSizes;
        for (var i = mStylesStrs.length - 1; i >= 0; i--) {
          if (
            mStylesStrs[i].slice(0, 1) === " " ||
            mStylesStrs[i].slice(0, 1) === "\u3000" ||
            mStylesStrs[i].slice(0, 1) === "\r" ||
            mStylesStrs[i].slice(0, 1) === "\n"
          ) {
            mStylesStrs.splice(i, 1);
            mFontSizes.splice(i, 1);
          }
        }
        app.executeCommand(3781);
        var mSl = mAi.selectedLayers[0];
        var mSlname = (mAi.selectedLayers[0].name = "AllShapes");
        var mPptyInCtsNum = mSl("ADBE Root Vectors Group").numProperties;
        var mGnames = [];
        for (var i = 1; i <= mPptyInCtsNum; i += 1) {
          mGnames.push(mSl("ADBE Root Vectors Group").property(i).name);
        }
        var mChkMrge = aChkMrge;
        var mChkAuto = aChkAuto;
        var mChkLim = aChkLim;
        var mLmtMrge = aLmtMrge;
        if (mChkMrge === true && mChkAuto === true) {
          var mVgs = new Array(mPptyInCtsNum);
          for (var i = 1; i <= mPptyInCtsNum; i += 1) {
            var mHidePptyTmp = mSl("ADBE Root Vectors Group")(i)(
              "ADBE Vectors Group",
            );
            var mPathPptysTmp = [];
            for (var j = 1; j <= mHidePptyTmp.numProperties; j += 1) {
              if (mHidePptyTmp(j).matchName === "ADBE Vector Shape - Group") {
                mPathPptysTmp.push(mHidePptyTmp(j));
              }
            }
            mVgs.splice(i - 1, 1, mPathPptysTmp);
          }
          mShapeMargeFontSize(mVgs, mFontSizes);
        } else {
          if (mChkMrge === true && mChkLim === true) {
            function mGetPathPpty(aPpty) {
              for (var i = 1; i <= aPpty.numProperties; i += 1) {
                var mTgtPpty = aPpty(i);
                if (mTgtPpty.matchName === "ADBE Vector Group") {
                  var mNewPpty = mTgtPpty("ADBE Vectors Group");
                  mGetPathPpty(mNewPpty);
                } else {
                  if (mTgtPpty.matchName === "ADBE Vector Shape - Group") {
                    mPptyAry.push(mTgtPpty);
                  }
                }
              }
            }
            var mCts = mSl("ADBE Root Vectors Group");
            var mPptyAry = [];
            mGetPathPpty(mCts);
            var mPathPrtAry = [];
            for (var i = 0; i < mPptyAry.length; i += 1) {
              var mPointsObj = new mCreatePoints();
              for (
                var j = 0;
                j < mPptyAry[i].path.value.vertices.length;
                j += 1
              ) {
                var mPointInfoObj = new mCreatePointInfoObj();
                mPointInfoObj.mIdx = j;
                mPointInfoObj.mVtx = mPptyAry[i].path.value.vertices[j];
                mPointInfoObj.mIn = mPptyAry[i].path.value.inTangents[j];
                mPointInfoObj.mOut = mPptyAry[i].path.value.outTangents[j];
                mPointsObj.points.push(mPointInfoObj);
              }
              mPathPrtAry.push(mPointsObj);
            }
            mShapeMargeAll(mPathPrtAry, mPptyAry, mLmtMrge);
          }
        }
        mChkAntiClockAndInvert(mSl);
        var mDpctLyrs = [];
        for (var i = mPptyInCtsNum - 1; i >= 0; i--) {
          var mDpctLyr = mAi.selectedLayers[0].duplicate();
          mDpctLyrs.push(mDpctLyr);
        }
        var mChkPreCmp = aChkPreCmp;
        if (mChkPreCmp === true) {
          var mFolderChk = false;
          for (var i = 1; i <= app.project.numItems; i += 1) {
            if (app.project.items[i].name === "TextsForCuttana") {
              var mTgtFolder = app.project.items[i];
              mFolderChk = true;
              break;
            }
          }
          if (mFolderChk === false) {
            var mTgtFolder = app.project.items.addFolder("TextsForCuttana");
          }
          mFolderChk = false;
          for (var i = 1; i <= mTgtFolder.numItems; i += 1) {
            if (mTgtFolder.items[i].name === mSlOglname) {
              mTgtFolder = mTgtFolder.items[i];
              mFolderChk = true;
              break;
            }
          }
          if (mFolderChk === false) {
            var mTgtFolder = mTgtFolder.items.addFolder(mSlOglname);
          }
        }
        var mPreComps = [];
        for (var i = 0; i < mPptyInCtsNum; i += 1) {
          mTmpLyr = mAi.layer(mAi.layer(mSlname).index - (mPptyInCtsNum - i));
          mTmpLyr.name = mGnames[i];
          mTmpLyr
            .property("ADBE Root Vectors Group")
            .property(i + 1)
            .moveTo(1);
          for (var j = mPptyInCtsNum; j > 1; j--) {
            mTmpLyr.property("ADBE Root Vectors Group").property(j).remove();
          }
          var mPrtChk = false;
          if (mTmpLyr.parent !== null) {
            mPrtChk = true;
            var mPrt = mTmpLyr.parent;
          }
          var mTmpLyrOglPos = mConvertToComp(
            mTmpLyr,
            mTmpLyr.anchorPoint.value,
          );
          var mChkCtr = aChkCtr;
          if (mChkPreCmp === true || mChkCtr === true) {
            var mRect = mTmpLyr.sourceRectAtTime(mAi.time, true);
            var mXmid = mRect.left + mRect.width / 2;
            var mYmid = mRect.top + mRect.height / 2;
            var mAp = [mXmid, mYmid];
            var mCvtPt = mConvertToComp(mTmpLyr, mAp);
            mTmpLyr.anchorPoint.setValue(mAp);
            if (mPrtChk === true) {
              mTmpLyr.position.setValue(
                mConvertFromComp(mTmpLyr.parent, mCvtPt),
              );
            } else {
              mTmpLyr.position.setValue(mCvtPt);
            }
          }
          var mTmpLyrCtrPos = mConvertToComp(
            mTmpLyr,
            mTmpLyr.anchorPoint.value,
          );
          if (mChkPreCmp === true) {
            var mNewComp = mAi.layers.precompose(
              [mTmpLyr.index],
              mTmpLyr.name,
              true,
            );
            mNewCompLyr = mAi.selectedLayers[0];
            var mTxtLyr = mNewComp.layer(1);
            mTxtLyr.startTime = mTxtLyr.startTime - mTxtLyr.inPoint;
            mNewComp.duration = mSlDur;
            mNewCompLyr.collapseTransformation = true;
            mNewCompLyr.startTime = mSlInP;
            var mMargin = aMargin;
            if (mTxtLyr.scale.value.toString() !== "100,100") {
              var mRectWRst = mRect.width * (mTxtLyr.scale.value[0] / 100);
              var mRectHRst = mRect.height * (mTxtLyr.scale.value[1] / 100);
              if (mTxtLyr.rotation.value !== 0) {
                var mRectMidTmp = [mRectWRst / 2, mRectHRst / 2];
                var mRectLU = [0, 0];
                var mRectRU = [mRectWRst, 0];
                var mRectRD = [mRectWRst, mRectHRst];
                var mRectLD = [0, mRectHRst];
                mRectLU = mGetRotatedPt(
                  mRectMidTmp,
                  mRectLU,
                  mTxtLyr.rotation.value,
                );
                mRectRU = mGetRotatedPt(
                  mRectMidTmp,
                  mRectRU,
                  mTxtLyr.rotation.value,
                );
                mRectRD = mGetRotatedPt(
                  mRectMidTmp,
                  mRectRD,
                  mTxtLyr.rotation.value,
                );
                mRectLD = mGetRotatedPt(
                  mRectMidTmp,
                  mRectLD,
                  mTxtLyr.rotation.value,
                );
                var mRectLRst = Math.min.apply(null, [
                  mRectLU[0],
                  mRectRU[0],
                  mRectRD[0],
                  mRectLD[0],
                ]);
                var mRectRRst = Math.max.apply(null, [
                  mRectLU[0],
                  mRectRU[0],
                  mRectRD[0],
                  mRectLD[0],
                ]);
                var mRectURst = Math.min.apply(null, [
                  mRectLU[1],
                  mRectRU[1],
                  mRectRD[1],
                  mRectLD[1],
                ]);
                var mRectDRst = Math.max.apply(null, [
                  mRectLU[1],
                  mRectRU[1],
                  mRectRD[1],
                  mRectLD[1],
                ]);
                mRectWRst = mRectRRst - mRectLRst;
                mRectHRst = mRectDRst - mRectURst;
              }
            } else {
              var mRectWRst = mRect.width;
              var mRectHRst = mRect.height;
            }
            mNewComp.width = mCeil(mRectWRst + mMargin);
            mNewComp.height = mCeil(mRectHRst + mMargin);
            mTxtLyr.position.setValue([
              mNewComp.width / 2,
              mNewComp.height / 2,
            ]);
            if (mChkCtr === true) {
              mNewCompLyr.position.setValue(mTmpLyrCtrPos);
            } else {
              mNewCompLyr.position.setValue(mTmpLyrOglPos);
              var mDif = mTmpLyrCtrPos - mTmpLyrOglPos;
              mNewCompLyr.anchorPoint.setValue(
                mNewCompLyr.anchorPoint.value - mDif,
              );
            }
            if (mPrtChk === true) {
              mNewCompLyr.parent = mPrt;
            }
            mPreComps.push(mNewCompLyr);
            mNewComp.parentFolder = mTgtFolder;
          }
        }
        mChkSame = aChkSame;
        if (mChkSame === true && mChkPreCmp === true) {
          for (var i = 0; i < mPreComps.length; i += 1) {
            mPreComps[i].comment = mStylesStrs[i];
          }
          var mBucketChk = new Array(mPreComps.length);
          for (var i = 0; i < mPreComps.length; i += 1) {
            if (mBucketChk[i] === true) {
              continue;
            }
            for (var j = 0; j < mPreComps.length; j += 1) {
              if (mBucketChk[j] === true) {
                continue;
              }
              if (mPreComps[i].comment === mPreComps[j].comment) {
                mPreComps[j].replaceSource(mPreComps[i].source, false);
                mBucketChk[j] = true;
              }
            }
            mBucketChk[i] = true;
          }
          for (var i = 0; i < mPreComps.length; i += 1) {
            mPreComps[i].comment = "";
          }
          var mPrtFolder = mPreComps[0].source.parentFolder;
          for (var i = mPrtFolder.numItems; i >= 1; i--) {
            if (mPrtFolder.item(i).usedIn.length === 0) {
              mPrtFolder.item(i).remove();
            }
          }
        }
        if (mChkPreCmp === true) {
          var mlyrsForLtr = mPreComps;
        } else {
          var mlyrsForLtr = mDpctLyrs;
        }
        var mSameLetters = [];
        var mLetterTmp = undefined;
        for (var i = 0; i < mlyrsForLtr.length; i += 1) {
          if (mlyrsForLtr[i].name !== mLetterTmp) {
            var mNewLetters = [mlyrsForLtr[i]];
            mSameLetters.push(mNewLetters);
            mLetterTmp = mlyrsForLtr[i].name;
          } else {
            mSameLetters[mSameLetters.length - 1].push(mlyrsForLtr[i]);
          }
        }
        for (var i = 0; i < mSameLetters.length; i += 1) {
          var mTgtAry = mSameLetters[i];
          if (mTgtAry.length > 1) {
            for (var j = 0; j < mTgtAry.length; j += 1) {
              mTgtAry[j].name = mTgtAry[j].name + " " + j + 1;
            }
          }
        }
        if (mChkPreCmp === true) {
          var mPreCompsSrtd = mPreComps.slice();
          mPreCompsSrtd = mPreCompsSrtd.sort(function (a, b) {
            return b.height - a.height;
          });
          var mRatioForNewCmpH = mAi.height / mPreCompsSrtd[0].height;
          for (var i = 0; i < mPreComps.length; i += 1) {
            if (i === 0) {
              var mTgtCmp = mPreComps[i];
              mTgtCmp.source.openInViewer();
              var mNewZoom =
                app.activeViewer.views[0].options.zoom * mRatioForNewCmpH;
              app.activeViewer.views[0].options.zoom = mNewZoom;
            } else {
              var mTgtCmp = mPreComps[i];
              mTgtCmp.source.openInViewer();
            }
          }
          mAi.openInViewer();
        }
        mAi.layer(mSlname).remove();
      }
      function mShapesExtracter(aAi, aSl, aSps, aShpCtrChk) {
        function mGetAllPathAdrs(aCts) {
          function mExecute(aCts) {
            for (var j = 1; j <= aCts.numProperties; j += 1) {
              if (aCts(j).matchName === "ADBE Vector Group") {
                mExecute(aCts(j)(2));
              } else {
                if (aCts(j).matchName === "ADBE Vector Shape - Group") {
                  var mPthAdrs = mGetSelPptyAdrs(aCts(j));
                  mRstAry.push(mPthAdrs);
                }
              }
            }
          }
          var mRstAry = [];
          mExecute(aCts);
          return mRstAry;
        }
        var mAi = aAi;
        var mSl = aSl;
        var mSps = aSps;
        var mShpCtrChk = aShpCtrChk;
        var mPathPptyObjs = [];
        for (var i = 0; i < mSps.length; i += 1) {
          if (mSps[i].matchName === "ADBE Vector Shape - Group") {
            mPathPptyObj = {};
            mPathPptyObj.Adrs = mGetSelPptyAdrs(mSps[i]);
            mPathPptyObj.AdrsStr = mPathPptyObj.Adrs.join(",");
            mPathPptyObjs.push(mPathPptyObj);
          }
        }
        mSl.blendingMode = BlendingMode.ALPHA_ADD;
        var mDpcLyr = mSl.duplicate();
        mDpcLyr.name = mSl.name;
        var mCts = mSl("ADBE Root Vectors Group");
        var mAllPathAdrs = mGetAllPathAdrs(mCts);
        Label1: for (var i = mAllPathAdrs.length - 1; i >= 0; i--) {
          var mDelAdrsStr = mAllPathAdrs[i].join(",");
          for (var j = mPathPptyObjs.length - 1; j >= 0; j--) {
            if (mDelAdrsStr === mPathPptyObjs[j].AdrsStr) {
              continue Label1;
            }
          }
          var mDelPathPpty = mGetPptyFromAdrs(mAllPathAdrs[i], 0);
          mDelPathPpty.remove();
        }
        if (mShpCtrChk === true) {
          var mSrcRect = mSl.sourceRectAtTime(mAi.time, true);
          var mMidLyrAp = [
            mSrcRect.left + mSrcRect.width / 2,
            mSrcRect.top + mSrcRect.height / 2,
          ];
          var mDif = mSl.anchorPoint.value - mMidLyrAp;
          var mDifCmp =
            mConvertToComp(mSl, mSl.anchorPoint.value) -
            mConvertToComp(mSl, mMidLyrAp);
          mSl.anchorPoint.setValue(mSl.anchorPoint.value - mDif);
          mSl.position.setValue(mSl.position.value - mDifCmp);
        }
        for (var j = mPathPptyObjs.length - 1; j >= 0; j--) {
          var mDelAdrs = mPathPptyObjs[j].Adrs;
          mDelAdrs[0] = mDpcLyr;
          var mDelOglPpty = mGetPptyFromAdrs(mDelAdrs, 0);
          mDelOglPpty.remove();
        }
        mDpcLyr.moveAfter(mSl);
      }
      function mShapesSeparater(aAi, aSls, aShpCtrChk) {
        function mSepShpLyrs(aAi, aSls) {
          var mAi = aAi;
          var mSls = aSls;
          var mLyrsWotOgl = [];
          for (var i = 0; i < mSls.length; i += 1) {
            var mTmpLyr = mSls[i];
            if (mTmpLyr.matchName !== "ADBE Vector Layer") {
              continue;
            }
            mTmpLyr.blendingMode = BlendingMode.ALPHA_ADD;
            var mCts = mTmpLyr("ADBE Root Vectors Group");
            var mRst = mGetAllPathAdrs(mCts);
            var mLyrs = [];
            for (var k = 0; k < mRst.length - 1; k += 1) {
              var mDpctLyr = mTmpLyr.duplicate();
              mDpctLyr.selected = true;
              mDpctLyr.name = mTmpLyr.name;
              mLyrs.push(mDpctLyr);
              mLyrsWotOgl.push(mDpctLyr);
            }
            mLyrs.push(mTmpLyr);
            for (var k = mLyrs.length - 1; k >= 0; k--) {
              var mTgtLyr = mLyrs[k];
              for (var l = mRst.length - 1; l >= 0; l--) {
                if (l === k) {
                  continue;
                } else {
                  mRst[l].splice(0, 1, mTgtLyr);
                  var mDelPathPpty = mGetPptyFromAdrs(mRst[l], 0);
                  mDelPathPpty.remove();
                }
              }
            }
          }
          if (mShpCtrChk === true) {
            var mAllLyrs = mSls.concat(mLyrsWotOgl);
            for (var k = 0; k < mAllLyrs.length; k += 1) {
              var mLyrForCtr = mAllLyrs[k];
              var mSrcRect = mLyrForCtr.sourceRectAtTime(mAi.time, true);
              var mMidLyrAp = [
                mSrcRect.left + mSrcRect.width / 2,
                mSrcRect.top + mSrcRect.height / 2,
              ];
              var mDif = mLyrForCtr.anchorPoint.value - mMidLyrAp;
              var mDifCmp =
                mConvertToComp(mLyrForCtr, mLyrForCtr.anchorPoint.value) -
                mConvertToComp(mLyrForCtr, mMidLyrAp);
              mLyrForCtr.anchorPoint.setValue(
                mLyrForCtr.anchorPoint.value - mDif,
              );
              mLyrForCtr.position.setValue(mLyrForCtr.position.value - mDifCmp);
            }
          }
        }
        function mGetCmpAndLyrsForShpSep(aSls) {
          var mSls = aSls;
          var mRstAry = [];
          var mSlsNotCmp = [];
          var mSlsCmpLyr = [];
          for (var i = 0; i < mSls.length; i += 1) {
            if (mSls[i].source instanceof CompItem === true) {
              mSlsCmpLyr.push(mSls[i]);
            } else {
              mSlsNotCmp.push(mSls[i]);
            }
          }
          mRstAry.push(mSlsNotCmp);
          for (var i = mSlsCmpLyr.length - 1; i >= 0; i--) {
            for (var j = i - 1; j >= 0; j--) {
              if (mSlsCmpLyr[i].source.id === mSlsCmpLyr[j].source.id) {
                mSlsCmpLyr.splice(i, 1);
                break;
              }
            }
          }
          for (var i = 0; i < mSlsCmpLyr.length; i += 1) {
            var mLyrsTmp = [];
            for (var j = 1; j <= mSlsCmpLyr[i].source.layers.length; j += 1) {
              mLyrsTmp.push(mSlsCmpLyr[i].source.layer(j));
            }
            var mLrysRst = mLyrsTmp.slice();
            mRstAry.push(mLrysRst);
          }
          return mRstAry;
        }
        function mGetAllPathAdrs(aCts) {
          function mExecute(aCts) {
            for (var j = 1; j <= aCts.numProperties; j += 1) {
              if (aCts(j).matchName === "ADBE Vector Group") {
                mExecute(aCts(j)(2));
              } else {
                if (aCts(j).matchName === "ADBE Vector Shape - Group") {
                  var mPthAdrs = mGetSelPptyAdrs(aCts(j));
                  mRstAry.push(mPthAdrs);
                }
              }
            }
          }
          var mRstAry = [];
          mExecute(aCts);
          return mRstAry;
        }
        var mAi = aAi;
        var mSls = aSls;
        var mShpCtrChk = aShpCtrChk;
        var mCmpLyrsAry = mGetCmpAndLyrsForShpSep(mSls);
        for (var i = 0; i < mCmpLyrsAry.length; i += 1) {
          mSepShpLyrs(mAi, mCmpLyrsAry[i]);
        }
      }
      function mShapesUniter(aAi, aSls, aShpCtrChk) {
        function mUniteLyrs(aAi, aSls) {
          var mAi = aAi;
          var mSls = aSls;
          var mAllBucket = new Array(mAi.layers.length);
          for (var i = 0; i < mSls.length; i += 1) {
            if (mSls[i].matchName === "ADBE Vector Layer") {
              mAllBucket.splice(mSls[i].index - 1, 1, mSls[i]);
            }
          }
          for (var i = mAllBucket.length - 1; i >= 0; i--) {
            if (
              mAllBucket[i] == null ||
              mAllBucket[i] == undefined ||
              mAllBucket[i] == ""
            ) {
              mAllBucket.splice(i, 1);
            }
          }
          if (mAllBucket.length === 0) {
            return null;
          }
          var mSlsSorted = [];
          var mStdName = mAllBucket[0].name;
          var mSlsTmp = [];
          for (var i = 0; i < mAllBucket.length; i += 1) {
            if (mAllBucket[i].name == mStdName) {
              mSlsTmp.push(mAllBucket[i]);
            } else {
              mSlsSorted.push(mSlsTmp);
              mSlsTmp = [mAllBucket[i]];
              mStdName = mAllBucket[i].name;
            }
            if (i == mAllBucket.length - 1) {
              mSlsSorted.push(mSlsTmp);
            }
          }
          var mTgtLyrs = [];
          for (var i = 0; i < mSlsSorted.length; i += 1) {
            var mSameLyrs = mSlsSorted[i];
            var mStdLyr = mSameLyrs[mSameLyrs.length - 1];
            mStdLyr.blendingMode = BlendingMode.NORMAL;
            for (var j = mSameLyrs.length - 2; j >= 0; j--) {
              var TgtLyr = mSameLyrs[j];
              var mCts = TgtLyr("ADBE Root Vectors Group");
              var mtAllPathPpty = mGetAllPathPpty(mCts);
              var mtAllPathAdrs = [];
              for (var k = 0; k < mtAllPathPpty.length; k += 1) {
                mtAllPathAdrs.push(mGetSelPptyAdrs(mtAllPathPpty[k]));
              }
              for (var k = 0; k < mtAllPathAdrs.length; k += 1) {
                var mTgtAdrs = mtAllPathAdrs[k];
                var mNewAdrs = mTgtAdrs.slice(1, mTgtAdrs.length);
                mNewAdrs.unshift(mStdLyr);
                var mTgtPpty = mGetPptyFromAdrs(mNewAdrs, 1);
                var mNewPathPpty = mTgtPpty.addProperty(
                  "ADBE Vector Shape - Group",
                );
                var mNewPathValue = mtAllPathPpty[k].path.value;
                mNewPathPpty.path.setValue(mNewPathValue);
                mNewPathPpty.name = mtAllPathPpty[k].name;
                mNewPathPpty.moveTo(1);
              }
            }
            for (var j = mSameLyrs.length - 2; j >= 0; j--) {
              mSameLyrs[j].remove();
            }
            mTgtLyrs.push(mSameLyrs[mSameLyrs.length - 1]);
          }
          if (mShpCtrChk === true) {
            var mAllLyrs = mTgtLyrs;
            for (var k = 0; k < mAllLyrs.length; k += 1) {
              var mLyrForCtr = mAllLyrs[k];
              var mSrcRect = mLyrForCtr.sourceRectAtTime(mAi.time, true);
              var mMidLyrAp = [
                mSrcRect.left + mSrcRect.width / 2,
                mSrcRect.top + mSrcRect.height / 2,
              ];
              var mDif = mLyrForCtr.anchorPoint.value - mMidLyrAp;
              var mDifCmp =
                mConvertToComp(mLyrForCtr, mLyrForCtr.anchorPoint.value) -
                mConvertToComp(mLyrForCtr, mMidLyrAp);
              mLyrForCtr.anchorPoint.setValue(
                mLyrForCtr.anchorPoint.value - mDif,
              );
              mLyrForCtr.position.setValue(mLyrForCtr.position.value - mDifCmp);
            }
          }
        }
        function mGetCmpAndLyrsForShpSep(aSls) {
          var mSls = aSls;
          var mRstAry = [];
          var mSlsNotCmp = [];
          var mSlsCmpLyr = [];
          for (var i = 0; i < mSls.length; i += 1) {
            if (mSls[i].source instanceof CompItem === true) {
              mSlsCmpLyr.push(mSls[i]);
            } else {
              mSlsNotCmp.push(mSls[i]);
            }
          }
          mRstAry.push(mSlsNotCmp);
          for (var i = mSlsCmpLyr.length - 1; i >= 0; i--) {
            for (var j = i - 1; j >= 0; j--) {
              if (mSlsCmpLyr[i].source.id === mSlsCmpLyr[j].source.id) {
                mSlsCmpLyr.splice(i, 1);
                break;
              }
            }
          }
          for (var i = 0; i < mSlsCmpLyr.length; i += 1) {
            var mLyrsTmp = [];
            for (var j = 1; j <= mSlsCmpLyr[i].source.layers.length; j += 1) {
              mLyrsTmp.push(mSlsCmpLyr[i].source.layer(j));
            }
            var mLrysRst = mLyrsTmp.slice();
            mRstAry.push(mLrysRst);
          }
          return mRstAry;
        }
        function mGetAllPathPpty(aCts) {
          function mExecute(aCts) {
            for (var j = 1; j <= aCts.numProperties; j += 1) {
              if (aCts(j).matchName === "ADBE Vector Group") {
                mExecute(aCts(j)(2));
              } else {
                if (aCts(j).matchName === "ADBE Vector Shape - Group") {
                  var mPthPpty = aCts(j);
                  mRstAry.push(mPthPpty);
                }
              }
            }
          }
          var mRstAry = [];
          mExecute(aCts);
          return mRstAry;
        }
        var mAi = aAi;
        var mSls = aSls;
        var mShpCtrChk = aShpCtrChk;
        var mCmpLyrsAry = mGetCmpAndLyrsForShpSep(mSls);
        for (var i = 0; i < mCmpLyrsAry.length; i += 1) {
          mUniteLyrs(mAi, mCmpLyrsAry[i]);
        }
      }
      function mCreateAllPtInfoObj() {
        var mAi = app.project.activeItem;
        var mSl = mAi.selectedLayers[0];
        var mSps = mSl.selectedProperties;
        var mPathPrtAry = [];
        for (var j = 0; j < mSps.length; j += 1) {
          var mPointsObj = new mCreatePoints();
          for (var i = 0; i < mSps[j].path.value.vertices.length; i += 1) {
            var mPointInfoObj = new mCreatePointInfoObj();
            mPointInfoObj.mIdx = i;
            mPointInfoObj.mVtx = mSps[j].path.value.vertices[i];
            mPointInfoObj.mIn = mSps[j].path.value.inTangents[i];
            mPointInfoObj.mOut = mSps[j].path.value.outTangents[i];
            mPointsObj.points.push(mPointInfoObj);
          }
          mPathPrtAry.push(mPointsObj);
        }
        return mPathPrtAry;
      }
      function mCreatePoints() {
        this.points = [];
        this.check = false;
      }
      function mCreatePointInfoObj() {
        this.mIdx;
        this.mVtx;
        this.mIn;
        this.mOut;
      }
      function mGetAreaAndAntiClock(aVtxs) {
        function mGetTriArea(aStd, aDir1, aDir2) {
          var Vec1 = aDir1 - aStd;
          var Vec2 = aDir2 - aStd;
          var crossZ = Vec1[0] * Vec2[1] - Vec2[0] * Vec1[1];
          return crossZ / 2;
        }
        var mAreaSum = 0;
        for (var i = 0; i < aVtxs.length; i += 1) {
          var mIdxNex = (i + 1 + aVtxs.length) % aVtxs.length;
          var mTriArea = mGetTriArea(0, aVtxs[i], aVtxs[mIdxNex]);
          mAreaSum += mTriArea;
        }
        if (mAreaSum > 0) {
          var mAnti = false;
        } else {
          var mAnti = true;
        }
        mAreaSum = Math.abs(mAreaSum);
        var mRst = {};
        mRst.mArea = mAreaSum;
        mRst.mAnti = mAnti;
        return mRst;
      }
      function mInvertPath(aSp) {
        var mSp = aSp;
        var mShapeObj = mSp.path.value;
        var mVtxs = mSp.path.value.vertices;
        var mIns = mSp.path.value.inTangents;
        var mOuts = mSp.path.value.outTangents;
        mShapeObj.vertices = mVtxs.reverse();
        mShapeObj.inTangents = mOuts.reverse();
        mShapeObj.outTangents = mIns.reverse();
        mSp.path.setValue(mShapeObj);
      }
      function mChAntiClockAndInvert(aSl) {
        var mSl = aSl;
        var mPptyInCtsNum = mSl.property(
          "ADBE Root Vectors Group",
        ).numProperties;
        var mTxtGpTmp = mSl.property("ADBE Root Vectors Group")(1)(
          "ADBE Vectors Group",
        );
        var mPathes = [];
        for (var j = 1; j <= mTxtGpTmp.numProperties; j += 1) {
          var mPptyTmp = mTxtGpTmp(j);
          if (mPptyTmp.matchName !== "ADBE Vector Shape - Group") {
            continue;
          } else {
            var mVtxs = mPptyTmp.path.value.vertices;
            var mAreaAndAnti = mGetAreaAndAntiClock(mVtxs);
            mPathes.push(mAreaAndAnti);
          }
        }
        var mPathesSorted = mPathes.sort(function (a, b) {
          return a.mArea - b.mArea;
        });
        var mAntiOrNot = mPathesSorted[mPathesSorted.length - 1].mAnti;
        if (mAntiOrNot === true) {
        } else {
          var mTxtGps = mSl.property("ADBE Root Vectors Group");
          for (var i = 1; i <= mTxtGps.numProperties; i += 1) {
            var mTxtGpTmp = mTxtGps(i)("ADBE Vectors Group");
            for (var j = 1; j <= mTxtGpTmp.numProperties; j += 1) {
              var mPptyTmp = mTxtGpTmp(j);
              if (mPptyTmp.matchName !== "ADBE Vector Shape - Group") {
                continue;
              } else {
                mInvertPath(mPptyTmp);
              }
            }
          }
        }
      }
      function mGetCmpAndLyrsObjsForTextSep(aAi, aSls) {
        var mAi = aAi;
        var mSls = aSls;
        var mSlsNotCmp = [];
        var mSlsCmpLyr = [];
        for (var i = 0; i < mSls.length; i += 1) {
          if (mSls[i].source instanceof CompItem === true) {
            mSlsCmpLyr.push(mSls[i]);
          } else {
            mSlsNotCmp.push(mSls[i]);
          }
        }
        var mCmpObjs = [];
        var mCmpObjTmp = {};
        mCmpObjTmp.mCmp = mAi;
        mCmpObjTmp.mLyrs = mSlsNotCmp;
        mCmpObjs.push(mCmpObjTmp);
        for (var i = mSlsCmpLyr.length - 1; i >= 0; i--) {
          for (var j = i - 1; j >= 0; j--) {
            if (mSlsCmpLyr[i].source.id === mSlsCmpLyr[j].source.id) {
              mSlsCmpLyr.splice(i, 1);
              break;
            }
          }
        }
        for (var i = 0; i < mSlsCmpLyr.length; i += 1) {
          var mCmpObjTmp = {};
          mCmpObjTmp.mCmp = mSlsCmpLyr[i].source;
          var mLyrsTmp = [];
          for (var j = 1; j <= mSlsCmpLyr[i].source.layers.length; j += 1) {
            mLyrsTmp.push(mSlsCmpLyr[i].source.layer(j));
          }
          mCmpObjTmp.mLyrs = mLyrsTmp;
          mCmpObjs.push(mCmpObjTmp);
        }
        return mCmpObjs;
      }
      function mPthCut() {
        var mErrTxt1 = "Please select 2 or 4 Pts.";
        try {
          mCatchErrorLyr(false);
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSps = mSl.selectedProperties;
          var mToF = mSps.length === 0;
          mCatchErrorOgl(mToF);
          var mOglName = mSps[0].name;
          var mSpAdrs = mGetSelPptyAdrs(mSps[0]);
          for (var i = 0; i < mSps.length; i += 1) {
            var mToF = mSps[i].matchName !== "ADBE Vector Shape - Group";
            mCatchErrorOgl(mToF);
          }
          var mSelPtInfos = mGetSelVtxObjAry(mSps);
          var mAllPtInfos = mCreateAllPtInfoObj();
          if (mPnl.mCbWithMge.value === true) {
            function mVtxMgeNbrs(aSelPtInfos, aAllPtInfos) {
              mSelPtInfos = aSelPtInfos;
              mAllPtInfos = aAllPtInfos;
              for (var j = 0; j < mSelPtInfos.length; j += 1) {
                function mMarge2Vtx(aPt1, aPt2, aPts, aInsertNum) {
                  var mSelIPt1 = aPt1;
                  var mSelIPt2 = aPt2;
                  var mPts = aPts;
                  var mMidPt = {};
                  mMidPt.mVtx = [
                    (mSelIPt1.mVtx[0] + mSelIPt2.mVtx[0]) / 2,
                    (mSelIPt1.mVtx[1] + mSelIPt2.mVtx[1]) / 2,
                  ];
                  mMidPt.mIn = mSelIPt1.mIn;
                  mMidPt.mOut = mSelIPt2.mOut;
                  if (aInsertNum !== aPts.length - 1) {
                    mPts.splice(aInsertNum, 2, mMidPt, null);
                  } else {
                    mPts.splice(aInsertNum, 1, mMidPt);
                    mPts.splice(0, 1, null);
                  }
                }
                var mPtsTmp = mAllPtInfos[j].points;
                var mSelPtsTmp = mSelPtInfos[j].points;
                var mTFAry = new Array(mPtsTmp.length);
                for (var i = 0; i < mTFAry.length; i += 1) {
                  mTFAry[i] = false;
                }
                for (var i = 0; i < mSelPtsTmp.length; i += 1) {
                  mTFAry[mSelPtsTmp[i].mIdx] = true;
                }
                for (var i = 0; i < mTFAry.length; i += 1) {
                  var mIdxNex = (i + 1 + mTFAry.length) % mTFAry.length;
                  if (mTFAry[i] === true && mTFAry[mIdxNex] === true) {
                    mMarge2Vtx(mPtsTmp[i], mPtsTmp[mIdxNex], mPtsTmp, i);
                    mTFAry[mIdxNex] = false;
                  }
                }
                for (var i = mPtsTmp.length - 1; i >= 0; i--) {
                  if (mPtsTmp[i] === null) {
                    mPtsTmp.splice(i, 1);
                    mTFAry.splice(i, 1);
                  }
                }
                for (var i = 0; i < mPtsTmp.length; i += 1) {
                  mPtsTmp[i].mIdx = i;
                }
                var mNewIdxs = [];
                for (var i = 0; i < mTFAry.length; i += 1) {
                  if (mTFAry[i] === true) {
                    mNewIdxs.push(i);
                  }
                }
                var mNewSelPts = [];
                for (var i = 0; i < mNewIdxs.length; i += 1) {
                  mNewSelPts.push(mPtsTmp[mNewIdxs[i]]);
                }
                mSelPtInfos[j].points = mNewSelPts.slice();
              }
            }
            mVtxMgeNbrs(mSelPtInfos, mAllPtInfos);
          }
          var mPptyN = mSelPtInfos.length;
          var mVtxN = 0;
          for (var i = 0; i < mSelPtInfos.length; i += 1) {
            mVtxN += mSelPtInfos[i].points.length;
          }
          var mToF = mVtxN !== 2 && mVtxN !== 4;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        var mSmthChk = mPnl.mCbSmt1.value;
        app.beginUndoGroup("Cut");
        if (mVtxN == 2) {
          if (mPptyN == 1) {
            mShapeDivider01(
              mSelPtInfos,
              mAllPtInfos,
              mSmthChk,
              mOglName,
              mSpAdrs,
            );
          } else {
            if (mPptyN > 1) {
              mShapeDivider02(
                mSelPtInfos,
                mAllPtInfos,
                mSmthChk,
                mOglName,
                mSpAdrs,
              );
            }
          }
        } else {
          if (mVtxN == 4) {
            mShapeDividerX(
              mSelPtInfos,
              mAllPtInfos,
              mSmthChk,
              mOglName,
              mSpAdrs,
            );
          }
        }
        app.endUndoGroup();
      }
      function mPthPtch() {
        var mErrTxt1 = "Please select 4 or 8 Pts.";
        try {
          mCatchErrorLyr(false);
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSps = mSl.selectedProperties;
          var mToF = mSps.length === 0;
          mCatchErrorOgl(mToF);
          var mOglName = mSps[0].name;
          var mSpAdrs = mGetSelPptyAdrs(mSps[0]);
          for (var i = 0; i < mSps.length; i += 1) {
            var mToF = mSps[i].matchName !== "ADBE Vector Shape - Group";
            mCatchErrorOgl(mToF);
          }
          var mSelPtInfos = mGetSelVtxObjAry(mSps);
          var mAllPtInfos = mCreateAllPtInfoObj();
          var mPptyN = mSelPtInfos.length;
          var mVtxN = 0;
          for (var i = 0; i < mSelPtInfos.length; i += 1) {
            mVtxN += mSelPtInfos[i].points.length;
          }
          var mToF = mVtxN !== 4 && mVtxN !== 8;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        app.beginUndoGroup("Patch");
        if (mVtxN == 4) {
          if (mPptyN == 1) {
            mShapePatch01(mSelPtInfos, mAllPtInfos, mOglName, mSpAdrs);
          } else {
            if (mPptyN > 1) {
              mShapePatch02(mSelPtInfos, mAllPtInfos, mOglName, mSpAdrs);
            }
          }
        } else {
          if (mVtxN == 8) {
            mShapePatchX(mSelPtInfos, mAllPtInfos, mOglName, mSpAdrs);
          }
        }
        app.endUndoGroup();
      }
      function mPthSlce(aDirNum) {
        var mErrTxt1 = "Please select 1 Pt.";
        var mErrTxt2 = "Could\'nt find Pt.";
        try {
          mCatchErrorPpty(false, false);
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSps = mSl.selectedProperties;
          var mOglName = mSps[0].name;
          var mSpAdrs = mGetSelPptyAdrs(mSps[0]);
          var mToF = mSps[0].matchName !== "ADBE Vector Shape - Group";
          mCatchErrorOgl(mToF);
          var mSelPtInfos = mGetSelVtxObjAry(mSps);
          var mAllPtInfos = mCreateAllPtInfoObj();
          var mPptyN = mSelPtInfos.length;
          var mVtxN = 0;
          for (var i = 0; i < mSelPtInfos.length; i += 1) {
            mVtxN += mSelPtInfos[i].points.length;
          }
          var mToF = mVtxN !== 1;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        var mSmoothChk = mPnl.mCbSmt1.value;
        app.beginUndoGroup("CutDir");
        try {
          var mNewCrsPtInfo = mCreateCrsPtAndGetInfo(
            mSelPtInfos[0].points[0].mIdx,
            mSps[0],
            aDirNum,
            mSpAdrs,
          );
          var mToF = mNewCrsPtInfo === null;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt2);
          app.endUndoGroup();
          return;
        }
        if (mNewCrsPtInfo.mPptyIdx === mSps[0].propertyIndex) {
          if (mSelPtInfos[0].points[0].mIdx >= mNewCrsPtInfo.mIdx) {
            mSelPtInfos[0].points[0].mIdx = mSelPtInfos[0].points[0].mIdx + 1;
            mSelPtInfos[0].points.unshift(mNewCrsPtInfo);
          } else {
            mSelPtInfos[0].points.push(mNewCrsPtInfo);
          }
          mAllPtInfos = mCreateAllPtInfoObj();
          mShapeDivider01(
            mSelPtInfos,
            mAllPtInfos,
            mSmoothChk,
            mOglName,
            mSpAdrs,
          );
        } else {
          var mNewPtsObj = new mCreatePoints();
          mNewPtsObj.points.push(mNewCrsPtInfo);
          if (mSps[0].propertyIndex < mNewCrsPtInfo.mPptyIdx) {
            mSelPtInfos.push(mNewPtsObj);
          } else {
            mSelPtInfos.unshift(mNewPtsObj);
          }
          mNewCrsPtInfo.mPpty.selected = true;
          mAllPtInfos = mCreateAllPtInfoObj();
          mShapeDivider02(
            mSelPtInfos,
            mAllPtInfos,
            mSmoothChk,
            mOglName,
            mSpAdrs,
          );
        }
        app.endUndoGroup();
      }
      function mShpExt() {
        var mErrTxt1 = "Please select 1 Path Property in 1Layer.";
        try {
          mCatchErrorLyr(false);
          mCatchErrorLyrAtLeastOne();
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          mCatchErrorOgl(mSl.matchName !== "ADBE Vector Layer");
          var mSps = mSl.selectedProperties;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        app.beginUndoGroup("ShapesExtracter");
        var mShpCtrChk = mPnl.mCbShpCtr.value;
        mShapesExtracter(mAi, mSl, mSps, mShpCtrChk);
        app.endUndoGroup();
      }
      function mShpSep() {
        var mErrTxt1 = "Please select at least 1 Layer.";
        try {
          mCatchErrorLyrAtLeastOne();
          var mAi = app.project.activeItem;
          var mSls = mAi.selectedLayers;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        app.beginUndoGroup("ShapesSeparater");
        var mShpCtrChk = mPnl.mCbShpCtr.value;
        mShapesSeparater(mAi, mSls, mShpCtrChk);
        app.endUndoGroup();
      }
      function mShpUnte() {
        var mErrTxt1 = "Please select at least 1 Layer.";
        try {
          mCatchErrorLyrAtLeastOne();
          var mAi = app.project.activeItem;
          var mSls = mAi.selectedLayers;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        app.beginUndoGroup("ShapesUniter");
        var mShpCtrChk = mPnl.mCbShpCtr.value;
        mShapesUniter(mAi, mSls, mShpCtrChk);
        app.endUndoGroup();
      }
      function mTxtSep() {
        var mErrTxt1 = "Please select 1 Text Layer.";
        var mErrTxt2 = "Please input Number.";
        try {
          mCatchErrorLyr(false);
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mToF = mSl.matchName !== "ADBE Text Layer";
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        try {
          var mTxt1 = mPnl.mEtMgn.text;
          var mTxt2 = mPnl.mEtMgeTxtLim.text;
          if (mTxt1 === "") {
            mTxt1 = "0";
          }
          if (mTxt2 === "") {
            mTxt2 = "0";
          }
          var mMargin = parseFloat(mTxt1);
          var mLmtMrge = parseFloat(mTxt2);
          var mToF = isNaN(mMargin) === true;
          mCatchErrorOgl(mToF);
          var mToF = isNaN(mLmtMrge) === true;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt2);
          return;
        }
        app.beginUndoGroup("TextSeparater");
        var mChkCtr = mPnl.mCbCtr.value;
        var mChkPreCmp = mPnl.mCbPcp.value;
        var mChkSame = mPnl.mCbShare.value;
        var mChkMrge = mPnl.mCbMgeTxt.value;
        var mChkAuto = mPnl.mRbMgeTxtAuto.value;
        var mChkLim = mPnl.mRbMgeTxtLim.value;
        mTextSeparater(
          mChkCtr,
          mChkPreCmp,
          mMargin,
          mChkSame,
          mChkMrge,
          mChkAuto,
          mChkLim,
          mLmtMrge,
        );
        app.endUndoGroup();
      }
      function mVtxMge() {
        if (mPnl.mRbMgeAll.value === false) {
          var mErrTxt1 = "Please select Neighbor 2 Pts in 1 Path.";
          try {
            mCatchErrorPpty(false, false);
            var mAi = app.project.activeItem;
            var mSl = mAi.selectedLayers[0];
            var mSps = mSl.selectedProperties;
            var mToF = mSps[0].matchName !== "ADBE Vector Shape - Group";
            mCatchErrorOgl(mToF);
            var mSelPtInfos = mGetSelVtxObjAry(mSps);
            var mAllPtInfos = mCreateAllPtInfoObj();
            var mPptyN = mSelPtInfos.length;
            var mVtxN = 0;
            for (var i = 0; i < mSelPtInfos.length; i += 1) {
              mVtxN += mSelPtInfos[i].points.length;
            }
            var mToF = mVtxN !== 2;
            mCatchErrorOgl(mToF);
            var mIdx1 = mSelPtInfos[0].points[0].mIdx;
            var mIdx2 = mSelPtInfos[0].points[1].mIdx;
            var mToF =
              mIdx1 + 1 !== mIdx2 &&
              mIdx1 === 0 &&
              (mIdx2 === mAllPtInfos[0].points.length - 1) !== true;
            mCatchErrorOgl(mToF);
          } catch (e) {
            clearOutput();
            writeLn(mErrTxt1);
            return;
          }
          app.beginUndoGroup("Marge 2 Vtx");
          mShapeMarge(mSelPtInfos, mAllPtInfos, mSps[0]);
          app.endUndoGroup();
        } else {
          var mErrTxt1 = "Please at least 1 layer.";
          var mErrTxt2 = "Please input Number.";
          try {
            mCatchErrorLyrAtLeastOne();
            var mAi = app.project.activeItem;
            var mSls = mAi.selectedLayers;
          } catch (e) {
            clearOutput();
            writeLn(mErrTxt1);
            return;
          }
          try {
            var mTxt1 = mPnl.mEtMgeAll.text;
            if (mTxt1 === "") {
              mTxt1 = "0";
            }
            var mLmtPix = parseFloat(mTxt1);
            var mToF = isNaN(mLmtPix) === true;
            mCatchErrorOgl(mToF);
          } catch (e) {
            clearOutput();
            writeLn(mErrTxt2);
            return;
          }
          app.beginUndoGroup("Marge All Vtxs");
          var mCmpAndLyrsObj = mGetCmpAndLyrsObjsForTextSep(mAi, mSls);
          var mAllLys = [];
          for (var i = 0; i < mCmpAndLyrsObj.length; i += 1) {
            mAllLys = mAllLys.concat(mCmpAndLyrsObj[i].mLyrs);
          }
          for (var i = mAllLys.length - 1; i >= 0; i--) {
            if (mAllLys[i].matchName !== "ADBE Vector Layer") {
              mAllLys.splice(i, 1);
            }
          }
          for (var k = 0; k < mAllLys.length; k += 1) {
            var mSl = mAllLys[k];
            var mSps = mSl.selectedProperties;
            var mAllPathChk = false;
            if (mSps.length === 0) {
              mAllPathChk = true;
            } else {
              for (var i = 0; i < mSps.length; i += 1) {
                if (mSps[i].matchName === "ADBE Root Vectors Group") {
                  mAllPathChk = true;
                  break;
                }
              }
            }
            if (mAllPathChk === true) {
              function mGetPathPpty(aPpty) {
                for (var i = 1; i <= aPpty.numProperties; i += 1) {
                  var mTgtPpty = aPpty(i);
                  if (mTgtPpty.matchName === "ADBE Vector Group") {
                    var mNewPpty = mTgtPpty("ADBE Vectors Group");
                    mGetPathPpty(mNewPpty);
                  } else {
                    if (mTgtPpty.matchName === "ADBE Vector Shape - Group") {
                      mPptyAry.push(mTgtPpty);
                    }
                  }
                }
              }
              var mCts = mSl("ADBE Root Vectors Group");
              var mPptyAry = [];
              mGetPathPpty(mCts);
              var mPathPrtAry = [];
              for (var i = 0; i < mPptyAry.length; i += 1) {
                var mPointsObj = new mCreatePoints();
                for (
                  var j = 0;
                  j < mPptyAry[i].path.value.vertices.length;
                  j += 1
                ) {
                  var mPointInfoObj = new mCreatePointInfoObj();
                  mPointInfoObj.mIdx = j;
                  mPointInfoObj.mVtx = mPptyAry[i].path.value.vertices[j];
                  mPointInfoObj.mIn = mPptyAry[i].path.value.inTangents[j];
                  mPointInfoObj.mOut = mPptyAry[i].path.value.outTangents[j];
                  mPointsObj.points.push(mPointInfoObj);
                }
                mPathPrtAry.push(mPointsObj);
              }
              mShapeMargeAll(mPathPrtAry, mPptyAry, mLmtPix);
            } else {
              function mReselPpty(aPpty) {
                if (
                  aPpty.matchName !== "ADBE Vector Shape - Group" &&
                  aPpty.matchName !== "ADBE Vectors Group"
                ) {
                  aPpty.selected = false;
                }
                if (aPpty.matchName === "ADBE Vector Group") {
                  var mNewPpty = aPpty("ADBE Vectors Group");
                  mReselPpty(mNewPpty);
                } else {
                  if (aPpty.matchName === "ADBE Vectors Group") {
                    for (var i = 1; i <= aPpty.numProperties; i += 1) {
                      var mTgtPpty = aPpty(i);
                      if (mTgtPpty.matchName === "ADBE Vector Group") {
                        var mNewPpty = mTgtPpty("ADBE Vectors Group");
                        mReselPpty(mNewPpty);
                      } else {
                        if (
                          mTgtPpty.matchName === "ADBE Vector Shape - Group"
                        ) {
                          mTgtPpty.selected = true;
                        }
                      }
                    }
                  }
                }
              }
              var mPptyAdrss = [];
              for (var i = 0; i < mSps.length; i += 1) {
                mPptyAdrss.push(mGetSelPptyAdrs(mSps[i]));
              }
              for (var i = 0; i < mSps.length; i += 1) {
                mReselPpty(mSps[i]);
              }
              var mPptys = mSl.selectedProperties;
              var mPathPrtAry = [];
              for (var i = 0; i < mPptys.length; i += 1) {
                var mPointsObj = new mCreatePoints();
                for (
                  var j = 0;
                  j < mPptys[i].path.value.vertices.length;
                  j += 1
                ) {
                  var mPointInfoObj = new mCreatePointInfoObj();
                  mPointInfoObj.mIdx = j;
                  mPointInfoObj.mVtx = mPptys[i].path.value.vertices[j];
                  mPointInfoObj.mIn = mPptys[i].path.value.inTangents[j];
                  mPointInfoObj.mOut = mPptys[i].path.value.outTangents[j];
                  mPointsObj.points.push(mPointInfoObj);
                }
                mPathPrtAry.push(mPointsObj);
              }
              mShapeMargeAll(mPathPrtAry, mPptys, mLmtPix);
              for (var i = 0; i < mPptys.length; i += 1) {
                mPptys[i].selected = false;
              }
              for (var i = 0; i < mPptyAdrss.length; i += 1) {
                var mPptyTmp = mGetPptyFromAdrs(mPptyAdrss[i], 0);
                mPptyTmp.selected = true;
              }
            }
          }
          app.endUndoGroup();
        }
      }
      function mCreateGuidePtForOneSelPt(aSp, aAllInfos, aTgtIdx) {
        function mGetSameLgtVtxAndT(aLineSet, aLength) {
          var mLineSet0 = aLineSet;
          var mStdPt = mLineSet0.mVtx1;
          var mLength = aLength;
          var m2LineSets = mGetNewLineSets(mLineSet0);
          var mLineSet1 = m2LineSets[0];
          var mLineSet2 = m2LineSets[1];
          var mCntRef = 0;
          var mPickedT = 1;
          var mDivDstc = 0.5;
          var mAllowableLimit = 0.01;
          var mLgtLmtMax = mLength + mAllowableLimit;
          var mLgtLmtMin = mLength - mAllowableLimit;
          var mCmprLgt = undefined;
          while (
            mLgtLmtMin > mCmprLgt ||
            mCmprLgt > mLgtLmtMax ||
            mCntRef < 100
          ) {
            var mLgtNear = mGetLength(mStdPt, mLineSet1.mVtx2);
            var mLgtFar = mGetLength(mStdPt, mLineSet2.mVtx2);
            if (mLgtFar > mLength && mLgtNear > mLength) {
              var mNewLineSet = mLineSet1;
              mCmprLgt = mLgtNear;
              mPickedT = mPickedT - mDivDstc;
            } else if (mLgtFar > mLength && mLgtNear < mLength) {
              var mNewLineSet = mLineSet2;
              mCmprLgt = mLgtFar;
              mPickedT = mPickedT;
            } else if (mLgtNear == mLength) {
              var mRst = {};
              mRst.mVtx = mLineSet1.mVtx2;
              mRst.mT = mPickedT - mDivDstc;
              return mRst;
            } else if (mLgtFar == mLength) {
              var mRst = {};
              mRst.mVtx = mLineSet2.mVtx2;
              mRst.mT = mPickedT;
              return mRst;
            } else {
              return null;
            }
            if (mLgtLmtMin <= mCmprLgt && mCmprLgt <= mLgtLmtMax) {
              break;
            }
            m2LineSets = mGetNewLineSets(mNewLineSet);
            mLineSet1 = m2LineSets[0];
            mLineSet2 = m2LineSets[1];
            mDivDstc = mDivDstc / 2;
            mCntRef++;
          }
          var mRst = {};
          mRst.mVtx = mNewLineSet.mVtx2;
          mRst.mT = mPickedT;
          return mRst;
        }
        function mGetNewLineSets(aLineSet) {
          function mDivLine(aPt1, aPt2, t) {
            var mX = (1 - t) * aPt1[0] + t * aPt2[0];
            var mY = (1 - t) * aPt1[1] + t * aPt2[1];
            return [mX, mY];
          }
          var mVtx1Pre = aLineSet.mVtx1;
          var mOut1Pre = aLineSet.mOut1;
          var mVtx2Pre = aLineSet.mVtx2;
          var mIn2Pre = aLineSet.mIn2;
          var t = 0.5;
          var mOut1H = mDivLine(mVtx1Pre, mOut1Pre, t);
          var mInOutH = mDivLine(mOut1Pre, mIn2Pre, t);
          var mIn2H = mDivLine(mIn2Pre, mVtx2Pre, t);
          var mNewInTgnt = mDivLine(mOut1H, mInOutH, t);
          var mNewOutTgnt = mDivLine(mInOutH, mIn2H, t);
          var mNewPt = mDivLine(mNewInTgnt, mNewOutTgnt, t);
          var m2LineSet1 = new mCreateLineSet();
          m2LineSet1.mVtx1 = mVtx1Pre;
          m2LineSet1.mVtx2 = mNewPt;
          m2LineSet1.mOut1 = mOut1H;
          m2LineSet1.mIn2 = mNewInTgnt;
          var m2LineSet2 = new mCreateLineSet();
          m2LineSet2.mVtx1 = mNewPt;
          m2LineSet2.mVtx2 = mVtx2Pre;
          m2LineSet2.mOut1 = mNewOutTgnt;
          m2LineSet2.mIn2 = mIn2H;
          return [m2LineSet1, m2LineSet2];
        }
        function mChkCrossSqrLine1sideSegFromObj(a, b, aObj) {
          function mRoundDec(afFigure, aNum) {
            var mRst = Math.round(afFigure * aNum) / aNum;
            return mRst;
          }
          function mCrsChkExp(a, b, c) {
            var mRst =
              (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
            return mRst;
          }
          function mGetRotatedPt(aStdPt, aTgtPt, aRtn) {
            var mLgtRX = aTgtPt[0] - aStdPt[0];
            var mLgtRY = aTgtPt[1] - aStdPt[1];
            var mLgtR = Math.sqrt(Math.pow(mLgtRX, 2) + Math.pow(mLgtRY, 2));
            var mROgl = Math.atan2(mLgtRY, mLgtRX);
            var mRd = aRtn * (Math.PI / 180);
            var mPtR = [
              Math.cos(mROgl + mRd) * mLgtR,
              Math.sin(mROgl + mRd) * mLgtR,
            ];
            return mPtR + aStdPt;
          }
          var mAry = [aObj.mVtx1, aObj.mOut1, aObj.mIn2, aObj.mVtx2];
          var mRst = false;
          for (var i = 0; i < mAry.length; i += 1) {
            var mExp = mCrsChkExp(a, b, mAry[i]);
            mExp = mRoundDec(mExp, 10000);
            if (mExp == 0) {
              mRst = true;
              break;
            }
            if (i !== 0) {
              if (mToF !== mExp > 0) {
                mRst = true;
                break;
              }
            }
            var mToF = mExp > 0;
          }
          if (mRst === false) {
            return false;
          }
          var mNmlVtx = mGetRotatedPt(a, b, 90);
          var mStdPorM = mCrsChkExp(a, mNmlVtx, b);
          var mStdToF = mStdPorM > 0;
          for (var i = 0; i < mAry.length; i += 1) {
            var mExp = mCrsChkExp(a, mNmlVtx, mAry[i]);
            mExp = mRoundDec(mExp, 10000);
            if (mExp == 0) {
              return true;
            } else {
              if (mStdToF === mExp > 0) {
                return true;
              }
            }
          }
          return false;
        }
        function mCreateLineSet() {
          this.mVtx1;
          this.mVtx2;
          this.mIn2;
          this.mOut1;
          this.mIdx;
        }
        function mGetCrossPt(aP1, aP2, aP3, aP4) {
          var mS1 =
            ((aP4[0] - aP3[0]) * (aP1[1] - aP3[1]) -
              (aP4[1] - aP3[1]) * (aP1[0] - aP3[0])) /
            2;
          var mS2 =
            ((aP4[0] - aP3[0]) * (aP3[1] - aP2[1]) -
              (aP4[1] - aP3[1]) * (aP3[0] - aP2[0])) /
            2;
          var mX = aP1[0] + ((aP2[0] - aP1[0]) * mS1) / (mS1 + mS2);
          var mY = aP1[1] + ((aP2[1] - aP1[1]) * mS1) / (mS1 + mS2);
          if (!isFinite(mX) || isNaN(mX) || !isFinite(mY) || isNaN(mY)) {
            mRst = [0, 0];
          } else {
            mRst = [mX, mY];
          }
          return mRst;
        }
        function mGetLength(aPt1, aPt2) {
          var mLength = Math.sqrt(
            Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
          );
          return mLength;
        }
        function mGetPathPIO(aP1, aO1, aI2, aP2, aT) {
          function mDivLine(aV01, aV02, aDiv) {
            var mX = (1 - aDiv) * aV01[0] + aDiv * aV02[0];
            var mY = (1 - aDiv) * aV01[1] + aDiv * aV02[1];
            return [mX, mY];
          }
          var mO1 = aO1 + aP1;
          var mI2 = aI2 + aP2;
          var mNpreO = mDivLine(aP1, mO1, aT);
          var mHd = mDivLine(mO1, mI2, aT);
          var mNnexI = mDivLine(mI2, aP2, aT);
          var mNi = mDivLine(mNpreO, mHd, aT);
          var mNo = mDivLine(mHd, mNnexI, aT);
          var mNp = mDivLine(mNi, mNo, aT);
          var mNiR = mNi - mNp;
          var mNoR = mNo - mNp;
          var mNpreOR = mNpreO - aP1;
          var mNnexIR = mNnexI - aP2;
          return [mNp, mNiR, mNoR, mNpreOR, mNnexIR];
        }
        var mSp = aSp;
        var mAllInfos = aAllInfos;
        var mTgtIdx = aTgtIdx;
        var mObjsTmp1 = mAllInfos.slice(mTgtIdx, mAllInfos.length);
        var mObjsTmp2 = mAllInfos.slice(0, mTgtIdx);
        mAllInfos = mObjsTmp1.concat(mObjsTmp2);
        mOpstIdxsRate1 = [mAllInfos.length - mTgtIdx, mAllInfos.length];
        mTgtIdx = 0;
        var mIdxNex = 1;
        var mIdxPre = mAllInfos.length - 1;
        var mLgtToNex = mGetLength(
          mAllInfos[mTgtIdx].mVtx,
          mAllInfos[mIdxNex].mVtx,
        );
        var mLgtToPre = mGetLength(
          mAllInfos[mTgtIdx].mVtx,
          mAllInfos[mIdxPre].mVtx,
        );
        if (mLgtToNex > mLgtToPre) {
          var IdxForLgt = mIdxPre;
          var IdxForPtAdd = mIdxNex;
          var mOpstIdxsRate2 = [1, mAllInfos.length + 1];
          var mRevChk = false;
        } else if (mLgtToNex < mLgtToPre) {
          var IdxForLgt = mIdxNex;
          var IdxForPtAdd = mIdxPre;
          var mOpstIdxsRate2 = [null, null];
          var mRevChk = true;
        } else {
          return null;
        }
        var mVtx1 = mAllInfos[mTgtIdx].mVtx;
        var mVtx2 = mAllInfos[IdxForLgt].mVtx;
        var mLgt = mGetLength(mVtx1, mVtx2);
        var mLineSetTmp = new mCreateLineSet();
        if (mRevChk === false) {
          mLineSetTmp.mVtx1 = mAllInfos[mTgtIdx].mVtx;
          mLineSetTmp.mOut1 = mAllInfos[mTgtIdx].mOut + mAllInfos[mTgtIdx].mVtx;
          mLineSetTmp.mVtx2 = mAllInfos[IdxForPtAdd].mVtx;
          mLineSetTmp.mIn2 =
            mAllInfos[IdxForPtAdd].mIn + mAllInfos[IdxForPtAdd].mVtx;
        } else {
          mLineSetTmp.mVtx1 = mAllInfos[mTgtIdx].mVtx;
          mLineSetTmp.mOut1 = mAllInfos[mTgtIdx].mIn + mAllInfos[mTgtIdx].mVtx;
          mLineSetTmp.mVtx2 = mAllInfos[IdxForPtAdd].mVtx;
          mLineSetTmp.mIn2 =
            mAllInfos[IdxForPtAdd].mOut + mAllInfos[IdxForPtAdd].mVtx;
        }
        var mRstPtObj = mGetSameLgtVtxAndT(mLineSetTmp, mLgt);
        if (mRstPtObj === null) {
          return null;
        }
        var mRstT = mRstPtObj.mT;
        if (mRevChk === false) {
          var mNewPIO = mGetPathPIO(
            mAllInfos[mTgtIdx].mVtx,
            mAllInfos[mTgtIdx].mOut,
            mAllInfos[IdxForPtAdd].mIn,
            mAllInfos[IdxForPtAdd].mVtx,
            mRstT,
          );
        } else {
          var mNewPIO = mGetPathPIO(
            mAllInfos[mTgtIdx].mVtx,
            mAllInfos[mTgtIdx].mIn,
            mAllInfos[IdxForPtAdd].mOut,
            mAllInfos[IdxForPtAdd].mVtx,
            mRstT,
          );
        }
        var mNewShape = new Shape();
        if (mRevChk === false) {
          mAllInfos[mTgtIdx].mOut = mNewPIO[3];
          mAllInfos[IdxForPtAdd].mIn = mNewPIO[4];
        } else {
          mAllInfos[mTgtIdx].mIn = mNewPIO[3];
          mAllInfos[IdxForPtAdd].mOut = mNewPIO[4];
        }
        var mNewPtAdd = {};
        mNewPtAdd.mVtx = mNewPIO[0];
        if (mRevChk === false) {
          mNewPtAdd.mIn = mNewPIO[1];
          mNewPtAdd.mOut = mNewPIO[2];
          mAllInfos.splice(mTgtIdx + 1, 0, mNewPtAdd);
        } else {
          mNewPtAdd.mIn = mNewPIO[2];
          mNewPtAdd.mOut = mNewPIO[1];
          mAllInfos.splice(mAllInfos.length, 0, mNewPtAdd);
        }
        var mRstObj = {};
        mRstObj.mRate1PlusNum = mOpstIdxsRate1[0];
        mRstObj.mRate1Sum = mOpstIdxsRate1[1];
        mRstObj.mRate2PlusNum = mOpstIdxsRate2[0];
        mRstObj.mRate2Sum = mOpstIdxsRate2[1];
        for (var i = 0; i < mAllInfos.length; i += 1) {
          mAllInfos[i].mIdx = i;
        }
        mRstObj.mAllInfos = mAllInfos;
        return mRstObj;
      }
      function mShiftNum(aIdxAry, mRateObj) {
        if (mRateObj === null) {
          return;
        }
        var mIdxs = aIdxAry;
        for (var i = 0; i < mIdxs.length; i += 1) {
          var mNewIdx =
            (mIdxs[i] + mRateObj.mRate1PlusNum + mRateObj.mRate1Sum) %
            mRateObj.mRate1Sum;
          if (mRateObj.mRate2PlusNum !== null && mNewIdx !== 0) {
            mNewIdx =
              (mNewIdx + mRateObj.mRate2PlusNum + mRateObj.mRate2Sum) %
              mRateObj.mRate2Sum;
          }
          mIdxs.splice(i, 1, mNewIdx);
        }
        mIdxs.sort(function (a, b) {
          return a - b;
        });
      }
      function mGetPathPptys(aLyr) {
        function mExecute(aCts) {
          for (var j = 1; j <= aCts.numProperties; j += 1) {
            if (aCts(j).matchName === "ADBE Vector Group") {
              mExecute(aCts(j)(2));
            } else {
              if (aCts(j).matchName === "ADBE Vector Shape - Group") {
                mRst.push(aCts(j));
              }
            }
          }
        }
        if (aLyr.matchName !== "ADBE Vector Layer") {
          return null;
        }
        var mCts = aLyr("ADBE Root Vectors Group");
        var mRst = [];
        mExecute(mCts);
        return mRst;
      }
      function mCreatePathAmt(aObjAry) {
        var mShape = new Shape();
        var mV = [];
        var mI = [];
        var mO = [];
        for (var i = 0; i < aObjAry.length; i += 1) {
          mV.push(aObjAry[i].mVtx);
          mI.push(aObjAry[i].mIn);
          mO.push(aObjAry[i].mOut);
        }
        mShape.vertices = mV;
        mShape.inTangents = mI;
        mShape.outTangents = mO;
        mShape.closed = false;
        return mShape;
      }
      function mOverwritePath(aObjAry, aPathPpty) {
        var mShape = new Shape();
        var mV = [];
        var mI = [];
        var mO = [];
        for (var i = 0; i < aObjAry.length; i += 1) {
          mV.push(aObjAry[i].mVtx);
          mI.push(aObjAry[i].mIn);
          mO.push(aObjAry[i].mOut);
        }
        mShape.vertices = mV;
        mShape.inTangents = mI;
        mShape.outTangents = mO;
        mShape.closed = true;
        aPathPpty.path.setValue(mShape);
        return aPathPpty;
      }
      function mCreatePoints() {
        this.points = [];
        this.check = false;
      }
      function mCreatePointSet() {
        this.mVtx;
        this.mIn;
        this.mOut;
        this.mIdx;
      }
      function mTxtToAry(aTxt) {
        if (aTxt === "") {
          var mTxtAry = [];
        } else if (aTxt.indexOf(",") !== -1) {
          var mTxtAry = aTxt.split(",");
        } else {
          var mTxtAry = [aTxt];
        }
        var mNamAry = [];
        for (var i = 0; i < mTxtAry.length; i += 1) {
          mNamAry.push(parseInt(mTxtAry[i]));
        }
        return mNamAry;
      }
      function mGetPathPIO(aP1, aO1, aI2, aP2, aT) {
        function mDivLine(aV01, aV02, aDiv) {
          var mX = (1 - aDiv) * aV01[0] + aDiv * aV02[0];
          var mY = (1 - aDiv) * aV01[1] + aDiv * aV02[1];
          return [mX, mY];
        }
        var mO1 = aO1 + aP1;
        var mI2 = aI2 + aP2;
        var mNpreO = mDivLine(aP1, mO1, aT);
        var mHd = mDivLine(mO1, mI2, aT);
        var mNnexI = mDivLine(mI2, aP2, aT);
        var mNi = mDivLine(mNpreO, mHd, aT);
        var mNo = mDivLine(mHd, mNnexI, aT);
        var mNp = mDivLine(mNi, mNo, aT);
        var mNiR = mNi - mNp;
        var mNoR = mNo - mNp;
        var mNpreOR = mNpreO - aP1;
        var mNnexIR = mNnexI - aP2;
        return [mNp, mNiR, mNoR, mNpreOR, mNnexIR];
      }
      function mGetPathLength(aPathObjAry) {
        var mSeg = 100;
        var mPathLgt = 0;
        for (var i = 1; i < aPathObjAry.length; i += 1) {
          if (i == 1) {
            mPreP = aPathObjAry[0];
          }
          mNowP = aPathObjAry[i];
          mP1 = mPreP.mVtx;
          mO1 = mPreP.mOut;
          mI2 = mNowP.mIn;
          mP2 = mNowP.mVtx;
          for (var j = 1; j <= mSeg; j += 1) {
            if (j == 1) {
              mPreS = mP1;
            }
            mNowS = mGetPathPIO(mP1, mO1, mI2, mP2, j / mSeg)[0];
            mPathLgt += Math.sqrt(
              Math.pow(mNowS[0] - mPreS[0], 2) +
                Math.pow(mNowS[1] - mPreS[1], 2),
            );
            mPreS = mNowS;
          }
          mPreP = mNowP;
        }
        return mPathLgt;
      }
      function mGetPathLengthE(aPathObjAry, aFnum, aLnum) {
        var mPathLgt = 0;
        for (var i = aFnum + 1; i < aLnum + 1; i++) {
          if (i == 1) {
            var mPreP = aPathObjAry[0];
          } else {
            var mPreP = aPathObjAry[i - 1];
          }
          var mNowP = aPathObjAry[i];
          var mP1 = mPreP.mVtx;
          var mO1 = mPreP.mOut;
          var mI2 = mNowP.mIn;
          var mP2 = mNowP.mVtx;
          var mLgt1 = mGetLength(mP1, mP1 + mO1);
          var mLgt2 = mGetLength(mP1 + mO1, mP2 + mI2);
          var mLgt3 = mGetLength(mP2 + mI2, mP2);
          mPathLgt += mLgt1 + mLgt2 + mLgt3;
          mPreP = mNowP;
        }
        return mPathLgt;
      }
      function mGetLength(aPt1, aPt2) {
        var mLength = Math.sqrt(
          Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
        );
        return mLength;
      }
      function mGet2Line(aObjAry, aIdxsF, aIdxsL) {
        aIdxsF.sort(function (a, b) {
          return a - b;
        });
        aIdxsL.sort(function (a, b) {
          return a - b;
        });
        var mIdxsAll = aIdxsF.concat(aIdxsL);
        mIdxsAll.sort(function (a, b) {
          return a - b;
        });
        var mLines = [];
        for (var i = 0; i < mIdxsAll.length; i += 1) {
          if (i == 0) {
            var mLine1Tail = aObjAry.slice(0, mIdxsAll[i] + 1);
          }
          if (i == mIdxsAll.length - 1) {
            var mLine1Head = aObjAry.slice(mIdxsAll[i], aObjAry.length);
            var mLine1 = mLine1Head.concat(mLine1Tail);
            mLines.push(mLine1);
          } else {
            var mLineOther = aObjAry.slice(mIdxsAll[i], mIdxsAll[i + 1] + 1);
            mLines.push(mLineOther);
          }
        }
        for (var i = mLines.length - 1; i >= 0; i--) {
          var mLineIdxs = [];
          for (var j = 0; j < mLines[i].length; j += 1) {
            mLineIdxs.push(mLines[i][j].mIdx);
          }
          if (
            mLineIdxs.toString() == aIdxsF.toString() ||
            mLineIdxs.toString() == aIdxsL.toString()
          ) {
            mLines.splice(i, 1);
          }
        }
        return mLines;
      }
      function mMidInfo() {
        this.mVtx;
        this.mIn = [0, 0];
        this.mOut = [0, 0];
        this.mHalfLength;
      }
      function mGetNmlUnitVector(aPtPre, aPtNex) {
        var mPtPre = aPtPre;
        var mPtNex = aPtNex;
        var mPtMid = (mPtPre + mPtNex) / 2;
        var mPtStd = mGetRotatedPt(mPtMid, aPtPre, 90);
        var mUnitVector = mGetUnitVector(mPtStd - mPtMid);
        return mUnitVector;
      }
      function mGetRotatedPt(aStdPt, aTgtPt, aRtn) {
        var mLgtRX = aTgtPt[0] - aStdPt[0];
        var mLgtRY = aTgtPt[1] - aStdPt[1];
        var mLgtR = Math.sqrt(Math.pow(mLgtRX, 2) + Math.pow(mLgtRY, 2));
        var mROgl = Math.atan2(mLgtRY, mLgtRX);
        var mRd = aRtn * (Math.PI / 180);
        var mPtR = [
          Math.cos(mROgl + mRd) * mLgtR,
          Math.sin(mROgl + mRd) * mLgtR,
        ];
        return mPtR + aStdPt;
      }
      function mGetUnitVector(aTgnt) {
        if (aTgnt.toString() == "0,0") {
          return [0, 0];
        }
        var mVecX = aTgnt[0];
        var mVecY = aTgnt[1];
        var mLength = Math.sqrt(Math.pow(mVecX, 2) + Math.pow(mVecY, 2));
        var mUnitVecX = mVecX / mLength;
        var mUnitVecY = mVecY / mLength;
        return [mUnitVecX, mUnitVecY];
      }
      function mGetAreaAndAntiClock(aVtxs) {
        function mGetTriArea(aStd, aDir1, aDir2) {
          var Vec1 = aDir1 - aStd;
          var Vec2 = aDir2 - aStd;
          var crossZ = Vec1[0] * Vec2[1] - Vec2[0] * Vec1[1];
          return crossZ / 2;
        }
        var mAreaSum = 0;
        for (var i = 0; i < aVtxs.length; i += 1) {
          var mIdxNex = (i + 1 + aVtxs.length) % aVtxs.length;
          var mTriArea = mGetTriArea(0, aVtxs[i], aVtxs[mIdxNex]);
          mAreaSum += mTriArea;
        }
        if (mAreaSum > 0) {
          var mAnti = false;
        } else {
          var mAnti = true;
        }
        mAreaSum = Math.abs(mAreaSum);
        var mRst = {};
        mRst.mArea = mAreaSum;
        mRst.mAnti = mAnti;
        return mRst;
      }
      function mGuideMake() {
        var mErrTxt1 = "Please input Number.";
        var mErrTxt21 = "Please select 2-4 Pts";
        var mErrTxt22 = "that include overlapping Pt.";
        var mErrTxt3 = 'Could\'nt find "_Base".';
        try {
          var mTxt = mPnl.mEtSep.text;
          if (mTxt === "") {
            mTxt = 0;
          }
          var mDivLength = parseInt(mTxt);
          var mToF = isNaN(mDivLength) === true;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        try {
          mCatchErrorPpty(false, false);
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSp = mSl.selectedProperties[0];
          var mToF = mSp.matchName !== "ADBE Vector Shape - Group";
          mCatchErrorOgl(mToF);
          var mFstIdxs = mGetSelVtxIdxs(mSp);
          mToF = mFstIdxs.length < 2 || 4 < mFstIdxs.length;
          mCatchErrorOgl(mToF);
          var mPtsForGde = [];
          var mVtxSetTmp = [];
          for (var i = 0; i < mSp.path.value.vertices.length; i += 1) {
            mVtxSetTmp.push(mSp.path.value.vertices[i]);
            var mPtForGde = new mCreatePointSet();
            mPtForGde.mVtx = mSp.path.value.vertices[i];
            mPtForGde.mIn = mSp.path.value.inTangents[i];
            mPtForGde.mOut = mSp.path.value.outTangents[i];
            mPtForGde.mIdx = i;
            mPtsForGde.push(mPtForGde);
          }
          var mAnti = mGetAreaAndAntiClock(mVtxSetTmp).mAnti;
          if (mFstIdxs.length != 4) {
            var mNewIdxs = [];
            for (var i = 0; i < mFstIdxs.length; i += 1) {
              var mTgtIdx = mFstIdxs[i];
              var mTgtVtx = mPtsForGde[mTgtIdx].mVtx;
              for (var j = 0; j < mPtsForGde.length; j += 1) {
                if (
                  mPtsForGde[j].mIdx != mTgtIdx &&
                  mMatch(mPtsForGde[j].mVtx, mTgtVtx, 2) == true
                ) {
                  mNewIdxs.push(j);
                }
              }
            }
            var mRstIdxs = mFstIdxs.concat(mNewIdxs);
            var mMaxNum = Math.max.apply(null, mRstIdxs);
            var mBucketForIdxs = new Array(mMaxNum);
            for (var i = 0; i < mRstIdxs.length; i += 1) {
              mBucketForIdxs.splice(mRstIdxs[i], 1, mRstIdxs[i]);
            }
            for (var i = mBucketForIdxs.length - 1; i >= 0; i--) {
              if (mBucketForIdxs[i] == undefined) {
                mBucketForIdxs.splice(i, 1);
              }
            }
            mFstIdxs = mBucketForIdxs;
          }
          mToF = mFstIdxs.length !== 4;
          mCatchErrorOgl(mToF);
          var mNabrs1 = [];
          var mNabrs2 = [];
          if (mFstIdxs[0] == 0 && mFstIdxs[3] == mPtsForGde.length - 1) {
            mNabrs1.push(mFstIdxs[3]);
            mNabrs1.push(mFstIdxs[0]);
            mNabrs2.push(mFstIdxs[1]);
            mNabrs2.push(mFstIdxs[2]);
            mToF = mFstIdxs[1] + 1 !== mFstIdxs[2];
            mCatchErrorOgl(mToF);
          } else {
            mNabrs1.push(mFstIdxs[0]);
            mNabrs1.push(mFstIdxs[1]);
            mNabrs2.push(mFstIdxs[2]);
            mNabrs2.push(mFstIdxs[3]);
            mToF =
              mFstIdxs[0] + 1 !== mFstIdxs[1] &&
              mFstIdxs[2] + 1 !== mFstIdxs[3];
            mCatchErrorOgl(mToF);
          }
        } catch (e) {
          alert(e);
          clearOutput();
          writeLn(mErrTxt21);
          writeLn(mErrTxt22);
          return;
        }
        app.beginUndoGroup("Separate");
        var mUnitVec1 = mGetNmlUnitVector(
          mPtsForGde[mNabrs1[0]].mVtx,
          mPtsForGde[mNabrs1[1]].mVtx,
        );
        var mUnitVec2 = mGetNmlUnitVector(
          mPtsForGde[mNabrs2[0]].mVtx,
          mPtsForGde[mNabrs2[1]].mVtx,
        );
        if (mAnti === false) {
          mDivLength = mDivLength * -1;
        }
        var mVecForNml1 = mUnitVec1 * mDivLength;
        var mVecForNml2 = mUnitVec2 * mDivLength;
        mPtsForGde[mNabrs1[0]].mVtx = mPtsForGde[mNabrs1[0]].mVtx + mVecForNml1;
        mPtsForGde[mNabrs1[1]].mVtx = mPtsForGde[mNabrs1[1]].mVtx + mVecForNml1;
        mPtsForGde[mNabrs2[0]].mVtx = mPtsForGde[mNabrs2[0]].mVtx + mVecForNml2;
        mPtsForGde[mNabrs2[1]].mVtx = mPtsForGde[mNabrs2[1]].mVtx + mVecForNml2;
        var PrtCtsPpty = mSp.propertyGroup(1);
        var mOglChkNum = false;
        for (var i = 1; i <= PrtCtsPpty.numProperties; i += 1) {
          if (PrtCtsPpty(i).name.indexOf("_Base") !== -1) {
            mOglChkNum = true;
            break;
          }
        }
        try {
          mToF = mSp.name === "Guide" && mOglChkNum === false;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt3);
          return;
        }
        var mOglName = mSp.name;
        if (mOglChkNum === false) {
          var mDpctPpty = mSp.duplicate();
          mDpctPpty.name = mOglName + "_Base";
          mDpctPpty.enabled = false;
          mSp = mSl.selectedProperties[0];
        }
        mSp.name = "Guide";
        mOverwritePath(mPtsForGde, mSp);
        app.endUndoGroup();
      }
      function mKeyChg() {
        var mErrTxt1 = "Please at least 1 Layer.";
        var mErrTxt2 = "Please input a Number greater than 1.";
        try {
          mCatchErrorLyrAtLeastOne();
          var mAi = app.project.activeItem;
          var mSls = mAi.selectedLayers;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        try {
          var mTxt = mPnl.mEtScrFrame.text;
          if (mPnl.mBtScrFrame.text == "TC") {
            var mTimeTmp = mGetTimeFromEtStr(mTxt, mAi, true);
          } else {
            if (mPnl.mBtScrFrame.text == "F") {
              var mTimeTmp = mGetTimeFromEtStr(mTxt, mAi, false);
            }
          }
          var mToF = mTimeTmp <= 0;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt2);
          return;
        }
        app.beginUndoGroup("Stretch Key");
        var mLyrs = [];
        for (var i = 0; i < mSls.length; i += 1) {
          if (mSls[i].source instanceof CompItem === true) {
            for (var j = 1; j <= mSls[i].source.layers.length; j += 1) {
              mLyrs.push(mSls[i].source.layer(j));
            }
          } else {
            mLyrs.push(mSls[i]);
          }
        }
        var mSpan = mTimeTmp;
        for (var i = 0; i < mLyrs.length; i += 1) {
          if (mLyrs[i].property("ADBE Effect Parade").numProperties !== 0) {
            for (
              var j = 1;
              j <= mLyrs[i].property("ADBE Effect Parade").numProperties;
              j += 1
            ) {
              if (
                mLyrs[i].property("ADBE Effect Parade")(j).name ===
                  "ShapeNir Slider" &&
                mLyrs[i].property("ADBE Effect Parade")(j).matchName ===
                  "ADBE Slider Control"
              ) {
                var mSld = mLyrs[i].property("ADBE Effect Parade")(j)(
                  "ADBE Slider Control-0001",
                );
                if (mSld.numKeys === 2) {
                  var mSldKeyTimeF = mSld.keyTime(1);
                  var mTgtTime = mSldKeyTimeF + mSpan;
                  var mSldKeyValL = mSld.keyValue(2);
                  var mSldKeyEaseInL = mSld.keyInTemporalEase(2);
                  var mSldKeyEaseOutL = mSld.keyOutTemporalEase(2);
                  mSld.removeKey(2);
                  mSld.setValueAtTime(mTgtTime, mSldKeyValL);
                  mSld.setTemporalEaseAtKey(2, mSldKeyEaseInL, mSldKeyEaseOutL);
                }
              } else {
                continue;
              }
            }
          }
        }
        app.endUndoGroup();
      }
      function mLyrNameSeq() {
        var mErrTxt1 = "Please at least 1 Layer.";
        var mErrTxt2 = "Please input Number.";
        try {
          mCatchErrorLyrAtLeastOne();
          var mAi = app.project.activeItem;
          var mSls = mAi.selectedLayers;
          var mInitTime = mSls[0].inPoint;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        try {
          var mTxt1 = mPnl.mEtSn.text;
          var mTxt2 = mPnl.mEtEo.text;
          if (mTxt1 === "") {
            mTxt1 = "0";
          }
          if (mTxt2 === "") {
            mTxt2 = "0";
          }
          var mOfset1Pre = parseFloat(mTxt1);
          var mOfset2Pre = parseFloat(mTxt2);
          var mToF = isNaN(mOfset1Pre) === true;
          mCatchErrorOgl(mToF);
          mToF = isNaN(mOfset2Pre) === true;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt2);
          return;
        }
        app.beginUndoGroup("Sequence");
        var mOfset1 = mOfset1Pre * mAi.frameDuration;
        var mOfset2 = mOfset2Pre * mAi.frameDuration;
        mSqcSameNames(mSls, mOfset1, mOfset2, mInitTime);
        if (mPnl.mCbCmps.value === true) {
          var mInvt = false;
          if (mSls.length >= 2 && mSls[0].index > mSls[1].index) {
            mInvt = true;
          }
          var mTgtLetter = undefined;
          for (var i = 0; i < mSls.length; i += 1) {
            var mSl = mSls[i];
            if (mSl.source instanceof CompItem === true) {
              var mSlsInCmp = [];
              if (mInvt === false) {
                for (var k = 1; k <= mSl.source.layers.length; k += 1) {
                  mSlsInCmp.push(mSl.source.layers[k]);
                }
              } else {
                for (var k = mSl.source.layers.length; k >= 1; k--) {
                  mSlsInCmp.push(mSl.source.layers[k]);
                }
              }
              if (mSlsInCmp.length === 0) {
                var mDif = 0;
                var mTgtLetter = mSl.name;
              } else {
                var mDif = mSqcSameNames(
                  mSlsInCmp,
                  0,
                  mOfset2,
                  mSl.inPoint - mSl.startTime,
                );
                var mTgtLetter = mSl.name;
              }
              continue;
            }
            if (mSl.name === mTgtLetter) {
              mSl.startTime = mSl.startTime + mDif;
            } else {
              mTgtLetter = undefined;
            }
          }
        }
        app.endUndoGroup();
      }
      function mSqcSameNames(aSls, aOfset1, aOfset2, aInitTime) {
        var mSls = aSls;
        var mOfset1 = aOfset1;
        var mOfset2 = aOfset2;
        var mInitTime = aInitTime;
        var mlyrNm = "";
        var mCnt1 = 0;
        var mCnt2 = 1;
        for (var i = 0; i < mSls.length; i += 1) {
          if (mlyrNm != mSls[i].name) {
            if (i != 0) {
              mCnt1++;
            }
            mSls[i].startTime =
              mInitTime +
              mOfset1 * mCnt1 -
              (mSls[i].inPoint - mSls[i].startTime);
            mCnt2 = 1;
          } else {
            mSls[i].startTime =
              mInitTime +
              mOfset1 * mCnt1 +
              mOfset2 * mCnt2 -
              (mSls[i].inPoint - mSls[i].startTime);
            mCnt2++;
          }
          mlyrNm = mSls[i].name;
        }
        return mSls[mSls.length - 1].inPoint - mInitTime;
      }
      function mTCorFConv(aBt, aEt) {
        var mErrTxt = "Please select Timeine or ViewPanel.";
        try {
          mCatchErrorActItmNotOnPanel();
          var mAi = app.project.activeItem;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt);
          return;
        }
        app.beginUndoGroup("ConvertTime");
        var mTimeTxt = aEt.text;
        if (aBt.text == "TC") {
          var mTimeTmp = mConvertTime(mTimeTxt, mAi, true);
          aEt.text = mTimeTmp;
          aBt.text = "F";
        } else {
          if (aBt.text == "F") {
            var mTimeTmp = mConvertTime(mTimeTxt, mAi, false);
            aEt.text = mTimeTmp;
            aBt.text = "TC";
          }
        }
        mSaveSettingOgl(aBt, mPnl.mSecName);
        mSaveSettingOgl(aEt, mPnl.mSecName);
        app.endUndoGroup();
      }
      function mTrailDel() {
        function mGetPptyForDelAndChangeName(aLyr) {
          function mExecute(aCts) {
            for (var j = 1; j <= aCts.numProperties; j += 1) {
              if (aCts(j).matchName === "ADBE Vector Group") {
                mExecute(aCts(j)(2));
              } else {
                if (
                  aCts(j).name.indexOf("_Bone") !== -1 ||
                  aCts(j).name.indexOf("_forAnimation") !== -1 ||
                  aCts(j).matchName === "ADBE Vector Filter - Trim"
                ) {
                  mRst.push(aCts(j));
                } else {
                  var mNameIdx = aCts(j).name.indexOf("_Original");
                  if (mNameIdx !== -1) {
                    aCts(j).name = aCts(j).name.substring(0, mNameIdx);
                    aCts(j).enabled = true;
                  }
                }
              }
            }
          }
          if (aLyr.matchName !== "ADBE Vector Layer") {
            return;
          }
          var mCts = aLyr("ADBE Root Vectors Group");
          var mRst = [];
          mExecute(mCts);
          return mRst;
        }
        var mErrTxt1 = "Please select at least 1 Layer";
        try {
          mCatchErrorLyrAtLeastOne();
          var mAi = app.project.activeItem;
          var mSls = mAi.selectedLayers;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return;
        }
        app.beginUndoGroup("Restore");
        for (var i = 0; i < mSls.length; i += 1) {
          var mPptyForDel = mGetPptyForDelAndChangeName(mSls[i]);
          mPptyForDel.reverse();
          var mPptyForDelAdrs = [];
          for (var k = 0; k < mPptyForDel.length; k += 1) {
            var mAdrsTmp = mGetSelPptyAdrs(mPptyForDel[k]);
            mPptyForDelAdrs.push(mAdrsTmp);
          }
          for (var j = 0; j < mPptyForDelAdrs.length; j += 1) {
            var mTgtPpty = mGetPptyFromAdrs(mPptyForDelAdrs[j], 0);
            mTgtPpty.remove();
          }
          var mEfts = mSls[i].effect;
          for (var j = mEfts.numProperties; j >= 1; j--) {
            if (mEfts(j).name == "ShapeNir Slider") {
              mEfts(j).remove();
            }
          }
        }
        app.endUndoGroup();
      }
      function mTrailMake() {
        function mMidLineMake(
          aObjAry1,
          aObjAry2,
          aPtNumAndTgntChkF,
          aPtNumAndTgntChkL,
          aInvalidIdxs,
          aDifIdxs,
        ) {
          function mCreatePath2(aPtAry) {
            var mAi = app.project.activeItem;
            var mSl = mAi.selectedLayers[0];
            var mSp = mSl.selectedProperties[0];
            var mShPath = mSp
              .propertyGroup(1)
              .addProperty("ADBE Vector Shape - Group");
            var mShape = new Shape();
            mShape.vertices = aPtAry;
            mShape.closed = false;
            mShPath(2).setValue(mShape);
            return mShPath.name;
          }
          function mCreatePathBone(aObjAry) {
            var mShape = new Shape();
            var mV = [];
            var mI = [];
            var mO = [];
            for (var i = 0; i < aObjAry.length; i += 1) {
              mV.push(aObjAry[i].mVtx);
              mI.push(aObjAry[i].mIn);
              mO.push(aObjAry[i].mOut);
            }
            mShape.vertices = mV;
            mShape.inTangents = mI;
            mShape.outTangents = mO;
            mShape.closed = false;
            return mShape;
          }
          function mCreateDtlPathObjAry(aVtx, aIn, aOut, aIdx) {
            var mVtsxs = aVtx;
            var mInTgnts = aIn;
            var mOutTgnts = aOut;
            var mOglIdx = aIdx;
            var mRnum = mVtsxs.length;
            var mNewpathPtSets = [];
            for (var i = 0; i < mRnum; i += 1) {
              if (i != mRnum - 1) {
                var mPreviousPt = new mCreatePathPtSet();
                mPreviousPt.mVtx = mVtsxs[i];
                mPreviousPt.mOglIdxs.push(mOglIdx[i]);
                if (i != 0) {
                  mPreviousPt.mIn = NexIn;
                }
                mNewpathPtSets.push(mPreviousPt);
                var mPrePt1 = mVtsxs[i];
                var mNexPt2 = mVtsxs[i + 1];
                var mNexInTgnt2 = mInTgnts[i + 1];
                var mPreOutTgnt1 = mOutTgnts[i];
                var mNewPt = mGetPathPIO(
                  mPrePt1,
                  mPreOutTgnt1,
                  mNexInTgnt2,
                  mNexPt2,
                  0.5,
                );
                mPreviousPt.mOut = mNewPt[3];
                var mNewPtSet = new mCreatePathPtSet();
                mNewPtSet.mVtx = mNewPt[0];
                mNewPtSet.mIn = mNewPt[1];
                mNewPtSet.mOut = mNewPt[2];
                mNewPtSet.mOglIdxs.push(mOglIdx[i]);
                mNewPtSet.mOglIdxs.push(mOglIdx[i + 1]);
                mNewpathPtSets.push(mNewPtSet);
                var NexIn = mNewPt[4];
              } else {
                var mLastPt = new mCreatePathPtSet();
                mLastPt.mVtx = mVtsxs[i];
                mLastPt.mIn = NexIn;
                mLastPt.mOglIdxs.push(mOglIdx[i]);
                mNewpathPtSets.push(mLastPt);
              }
            }
            mNewpathPtSets[0].mIn = [0, 0];
            mNewpathPtSets[mNewpathPtSets.length - 1].mOut = [0, 0];
            return mNewpathPtSets;
          }
          function mGetLength(aPt1, aPt2) {
            var mLength = Math.sqrt(
              Math.pow(aPt1[0] - aPt2[0], 2) + Math.pow(aPt1[1] - aPt2[1], 2),
            );
            return mLength;
          }
          function crossChk(a, b, c, d) {
            var mR01 =
              (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
            var mR02 =
              (a[0] - b[0]) * (d[1] - a[1]) + (a[1] - b[1]) * (a[0] - d[0]);
            var mR03 =
              (c[0] - d[0]) * (a[1] - c[1]) + (c[1] - d[1]) * (c[0] - a[0]);
            var mR04 =
              (c[0] - d[0]) * (b[1] - c[1]) + (c[1] - d[1]) * (c[0] - b[0]);
            mR01 * mR02 < 0 && mR03 * mR04 < 0 ? (mToF = true) : (mToF = false);
            return mToF;
          }
          function mChkCrossLineSegs(a, b, c, d, aToF) {
            function mCrsChkExp(a, b, c) {
              var mRst =
                (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
              return mRst;
            }
            function mRoundDec(afFigure, aNum) {
              var mRst = Math.round(afFigure * aNum) / aNum;
              return mRst;
            }
            var mR01 = mCrsChkExp(a, b, c);
            var mR02 = mCrsChkExp(a, b, d);
            var mR01Rnd = mRoundDec(mR01, 10000);
            var mR02Rnd = mRoundDec(mR02, 10000);
            var mPorMNum1 = mR01Rnd * mR02Rnd;
            var mR03 = mCrsChkExp(c, d, a);
            var mR04 = mCrsChkExp(c, d, b);
            var mR03Rnd = mRoundDec(mR03, 10000);
            var mR04Rnd = mRoundDec(mR04, 10000);
            var mPorMNum2 = mR03Rnd * mR04Rnd;
            if (aToF == true) {
              mPorMNum1 <= 0 && mPorMNum2 <= 0 ? (mRst = true) : (mRst = false);
            } else {
              mPorMNum1 < 0 && mPorMNum2 < 0 ? (mRst = true) : (mRst = false);
            }
            return mRst;
          }
          function mGetExtendedPt(aPt1, aPt2, aLgt) {
            var px = aPt1[0];
            var py = aPt1[1];
            var qx = aPt2[0];
            var qy = aPt2[1];
            var PQ = Math.sqrt(Math.pow(px - qx, 2) + Math.pow(py - qy, 2));
            var rx = (-aLgt * px + (PQ + aLgt) * qx) / PQ;
            var ry = (-aLgt * py + (PQ + aLgt) * qy) / PQ;
            return [rx, ry];
          }
          function mCreatePtInfoSet() {
            this.mOptns = [];
            this.mValue;
            this.mIdx;
            this.mOglIdxs = [];
            this.mVtx;
            this.mIn;
            this.mOut;
            this.mTgntChkX;
            this.mTgntChkY;
            this.mDcdOptn = {};
            this.mDcdOptn.mValue;
            this.mDcdOptn.mIdx;
            this.mDcdOptn.mLength;
            this.mDcdOptn.mChk = false;
            this.mDcdOptn.mOglIdxs = [];
          }
          function mCreateOptn() {
            this.mValue;
            this.mLength;
            this.mIdx;
            this.mChk = false;
            this.mOglIdxs = [];
          }
          function mGetDrtString(aAnum, aBnum) {
            var mRstNum = aBnum - aAnum;
            if (mRstNum > 0) {
              mRstD = "+";
            } else if (mRstNum < 0) {
              mRstD = "-";
            } else {
              mRstD = "=";
            }
            return mRstD;
          }
          function mGetPathLength(aPathObjAry, aFnum, aLnum) {
            var mSeg = 100;
            var mPathLgt = 0;
            for (var i = aFnum + 1; i < aLnum + 1; i++) {
              if (i == 1) {
                var mPreP = aPathObjAry[0];
              } else {
                var mPreP = aPathObjAry[i - 1];
              }
              var mNowP = aPathObjAry[i];
              var mP1 = mPreP.mVtx;
              var mO1 = mPreP.mOut;
              var mI2 = mNowP.mIn;
              var mP2 = mNowP.mVtx;
              for (var j = 1; j <= mSeg; j += 1) {
                if (j == 1) {
                  var mPreS = mP1;
                }
                var mNowS = mGetPathPIO(mP1, mO1, mI2, mP2, j / mSeg)[0];
                mPathLgt += Math.sqrt(
                  Math.pow(mNowS[0] - mPreS[0], 2) +
                    Math.pow(mNowS[1] - mPreS[1], 2),
                );
                mPreS = mNowS;
              }
              mPreP = mNowP;
            }
            return mPathLgt;
          }
          function mGetPathLengthE(aPathObjAry, aFnum, aLnum) {
            var mPathLgt = 0;
            for (var i = aFnum + 1; i < aLnum + 1; i++) {
              if (i == 1) {
                var mPreP = aPathObjAry[0];
              } else {
                var mPreP = aPathObjAry[i - 1];
              }
              var mNowP = aPathObjAry[i];
              var mP1 = mPreP.mVtx;
              var mO1 = mPreP.mOut;
              var mI2 = mNowP.mIn;
              var mP2 = mNowP.mVtx;
              var mLgt1 = mGetLength(mP1, mP1 + mO1);
              var mLgt2 = mGetLength(mP1 + mO1, mP2 + mI2);
              var mLgt3 = mGetLength(mP2 + mI2, mP2);
              mPathLgt += mLgt1 + mLgt2 + mLgt3;
              mPreP = mNowP;
            }
            return mPathLgt;
          }
          function mGetPathPIO(aP1, aO1, aI2, aP2, aT) {
            function mDivLine(aV01, aV02, aDiv) {
              var mX = (1 - aDiv) * aV01[0] + aDiv * aV02[0];
              var mY = (1 - aDiv) * aV01[1] + aDiv * aV02[1];
              return [mX, mY];
            }
            var mO1 = aO1 + aP1;
            var mI2 = aI2 + aP2;
            var mNpreO = mDivLine(aP1, mO1, aT);
            var mHd = mDivLine(mO1, mI2, aT);
            var mNnexI = mDivLine(mI2, aP2, aT);
            var mNi = mDivLine(mNpreO, mHd, aT);
            var mNo = mDivLine(mHd, mNnexI, aT);
            var mNp = mDivLine(mNi, mNo, aT);
            var mNiR = mNi - mNp;
            var mNoR = mNo - mNp;
            var mNpreOR = mNpreO - aP1;
            var mNnexIR = mNnexI - aP2;
            return [mNp, mNiR, mNoR, mNpreOR, mNnexIR];
          }
          function mCreatePathPtSet() {
            this.mVtx;
            this.mIn;
            this.mOut;
            this.mOglIdxs = [];
          }
          function mReversePathPtSets(aPathSets) {
            var mReversedPathPtSets = [];
            for (var i = 0; i < aPathSets.length; i += 1) {
              var newPathSet = new mCreatePathPtSet();
              newPathSet.mVtx = aPathSets[aPathSets.length - 1 - i].mVtx;
              newPathSet.mOglIdxs =
                aPathSets[aPathSets.length - 1 - i].mOglIdxs;
              newPathSet.mIn = aPathSets[aPathSets.length - 1 - i].mOut;
              newPathSet.mOut = aPathSets[aPathSets.length - 1 - i].mIn;
              mReversedPathPtSets.push(newPathSet);
            }
            return mReversedPathPtSets;
          }
          function mCreateOverlapedPtsObj() {
            this.mVtx;
            this.mIdx;
          }
          function mCreate4PairObj() {
            this.mPtAry = [];
            this.mCrossVtx;
            this.mChk = false;
          }
          function mJudgeInOrOut(aMdlPt, aVtxAry) {
            for (var i = 0; i < aVtxAry.length; i += 1) {
              var mVtxAryIdxNex = (i + 1 + aVtxAry.length) % aVtxAry.length;
              if (
                mJudgeLineAndPt(aMdlPt, aVtxAry[i], aVtxAry[mVtxAryIdxNex]) ==
                true
              ) {
                return true;
              }
            }
            var mRSum = 0;
            for (var i = 0; i < aVtxAry.length; i += 1) {
              var mIdxNex = (i + 1 + aVtxAry.length) % aVtxAry.length;
              var mA = aVtxAry[i] - aMdlPt;
              var mB = aVtxAry[mIdxNex] - aMdlPt;
              var mCos = mA[0] * mB[0] + mA[1] * mB[1];
              var mSin = mA[0] * mB[1] - mA[1] * mB[0];
              mRSum -= (180 / Math.PI) * Math.atan2(mSin, mCos);
            }
            return Math.round(mRSum) > 0;
          }
          function mJudgeLineAndPt(aMdlPt, aPt1, aPt2) {
            var mLgtAll = aPt1 - aPt2;
            var mLgtMid = aPt1 - aMdlPt;
            var RatioX = mLgtMid[0] / mLgtAll[0];
            var RatioY = mLgtMid[1] / mLgtAll[1];
            if (
              Math.min(aPt1[0], aPt2[0]) <= aMdlPt[0] &&
              aMdlPt[0] <= Math.max(aPt1[0], aPt2[0]) &&
              Math.min(aPt1[1], aPt2[1]) <= aMdlPt[1] &&
              aMdlPt[1] <= Math.max(aPt1[1], aPt2[1]) &&
              RatioX == RatioY
            ) {
              return true;
            } else {
              return false;
            }
          }
          function mGetCrossVtx(aFp1, aFp2, aLp1, aLp2) {
            var mSqr1 =
              ((aLp2[0] - aLp1[0]) * (aFp1[1] - aLp1[1]) -
                (aLp2[1] - aLp1[1]) * (aFp1[0] - aLp1[0])) /
              2;
            var mSqr2 =
              ((aLp2[0] - aLp1[0]) * (aLp1[1] - aFp2[1]) -
                (aLp2[1] - aLp1[1]) * (aLp1[0] - aFp2[0])) /
              2;
            var mX = aFp1[0] + ((aFp2[0] - aFp1[0]) * mSqr1) / (mSqr1 + mSqr2);
            var mY = aFp1[1] + ((aFp2[1] - aFp1[1]) * mSqr1) / (mSqr1 + mSqr2);
            if (!isFinite(mX) || isNaN(mX) || !isFinite(mY) || isNaN(mY)) {
              mRst = false;
            } else {
              mRst = [mX, mY];
            }
            return mRst;
          }
          function crossChkDir(a, b, c, d) {
            var mR01 =
              (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
            var mR02 =
              (a[0] - b[0]) * (d[1] - a[1]) + (a[1] - b[1]) * (a[0] - d[0]);
            if (mR01 == 0 || mR02 == 0) {
              mToF = true;
            } else {
              mR01 * mR02 < 0 ? (mToF = true) : (mToF = false);
            }
            return mToF;
          }
          function crossChkRange(a, b, c) {
            var mR01 =
              (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
            mR01 <= 0 ? (mToF = true) : (mToF = false);
            return mToF;
          }
          function mGetCrossPtFrom3Pt(
            aPtPre,
            aPtMid,
            aPtNex,
            aPt2Init,
            aPt2End,
          ) {
            var mPtPre = aPtPre;
            var mPtMid = aPtMid;
            var mPtNex = aPtNex;
            var mLgt1 = mGetLength(mPtMid, mPtPre);
            var mLgt2 = mGetLength(mPtMid, mPtNex);
            var mPtNexFix = mGetExtendedPt(mPtMid, mPtNex, mLgt1 - mLgt2);
            var mPtRStd = (mPtPre + mPtNexFix) / 2;
            var mPt2Init = aPt2Init;
            var mPt2End = aPt2End;
            var mCrsChkDir = crossChkDir(mPtMid, mPtRStd, mPt2Init, mPt2End);
            if (mCrsChkDir == false) {
              return false;
            } else {
              var mCrossPt = mGetCrossVtx(mPtMid, mPtRStd, mPt2Init, mPt2End);
              if (mCrossPt == false) {
                return false;
              }
              var mPtPreForChkRng = mPtPre + (mPtMid - mPtRStd);
              var mPtNexForChkRng = mPtNexFix + (mPtMid - mPtRStd);
              var mCrsChkRngF = crossChkRange(
                mPtPreForChkRng,
                mPtNexForChkRng,
                mPt2Init,
              );
              var mCrsChkRngL = crossChkRange(
                mPtPreForChkRng,
                mPtNexForChkRng,
                mPt2End,
              );
              var mCrsChkRngC = crossChkRange(
                mPtPreForChkRng,
                mPtNexForChkRng,
                mCrossPt,
              );
              if (
                (mCrsChkRngF == true || mCrsChkRngL == true) &&
                mCrsChkRngC == true
              ) {
                var mLgtCrossInit = mGetLength(mCrossPt, mPt2Init);
                var mLgtCrossEnd = mGetLength(mCrossPt, mPt2End);
                var mRstPtInfo1 = {};
                mRstPtInfo1.mVtx = mCrossPt;
                mRstPtInfo1.mIdxAdd = 0;
                var mRstPtInfo2 = {};
                mRstPtInfo2.mVtx = mCrossPt;
                mRstPtInfo2.mIdxAdd = 1;
                if (mLgtCrossInit <= mLgtCrossEnd) {
                  return [mRstPtInfo1, mRstPtInfo2];
                } else {
                  return [mRstPtInfo2, mRstPtInfo1];
                }
              } else {
                return false;
              }
            }
          }
          function mTxtToAry(aTxt) {
            if (aTxt.indexOf(",") != -1) {
              var mTxtAry = aTxt.split(",");
            } else {
              var mTxtAry = [aTxt];
            }
            var mNamAry = [];
            for (var i = 0; i < mTxtAry.length; i += 1) {
              mNamAry.push(parseInt(mTxtAry[i]));
            }
            return mNamAry;
          }
          function mGet3VtxDirCoord(aPtF, aPtM, aPtL) {
            var mStdVtx = aPtM;
            var vec1 = mGetUnitVector(aPtM - aPtF) * 500;
            var vec2 = mGetUnitVector(aPtL - aPtM) * 500;
            var mVecRst = vec2 - vec1;
            if (mGet3VtxRtnSigned(aPtF, aPtM, aPtL) > 0) {
              mVecRst = mVecRst * -1;
            }
            return mStdVtx + mVecRst;
          }
          function mGet3VtxRtn(aPtF, aPtM, aPtL) {
            var vec1 = aPtM - aPtF;
            var vec2 = aPtM - aPtL;
            var mS =
              (vec1[0] * vec2[0] + vec1[1] * vec2[1]) /
              (Math.sqrt(Math.pow(vec1[0], 2) + Math.pow(vec1[1], 2)) *
                Math.sqrt(Math.pow(vec2[0], 2) + Math.pow(vec2[1], 2)));
            var mRtn = Math.acos(mS) * (180 / Math.PI);
            return mRtn;
          }
          function mGet3VtxRtnSigned(aVtxF, aMdlPt, aVtxL) {
            var mA = aVtxF - aMdlPt;
            var mB = aVtxL - aMdlPt;
            var mCos = mA[0] * mB[0] + mA[1] * mB[1];
            var mSin = mA[0] * mB[1] - mA[1] * mB[0];
            var mRSum = (180 / Math.PI) * Math.atan2(mSin, mCos);
            return mRSum;
          }
          function mGetRealRtn(aPt1, aPt2) {
            var mRd = Math.atan2(aPt2[1] - aPt1[1], aPt2[0] - aPt1[0]);
            var mRtn = mRd * (180 / Math.PI);
            if (mRtn < 0) {
              mRtn = 360 + mRtn;
            } else {
              mRtn = mRtn;
            }
            return mRtn;
          }
          function mChkVtxOntheline(a, b, c) {
            function mCrsChkExp(a, b, c) {
              var mRst =
                (a[0] - b[0]) * (c[1] - a[1]) + (a[1] - b[1]) * (a[0] - c[0]);
              return mRst;
            }
            function mRoundDec(afFigure, aNum) {
              var mRst = Math.round(afFigure * aNum) / aNum;
              return mRst;
            }
            var mR01 = mCrsChkExp(a, b, c);
            var mR01Rnd = mRoundDec(mR01, 10000);
            if (mR01Rnd == 0) {
              return true;
            } else {
              return false;
            }
          }
          function mGet3VtxDirRtn(aPtF, aPtM, aPtL) {
            var mVecF = mGetUnitVector(aPtF - aPtM);
            var mvecL = mGetUnitVector(aPtL - aPtM);
            var mRtnTmp = mGetRealRtn(mVecF, mvecL);
            return mRtnTmp;
          }
          function mChkRotWithinRange(aStdRot, aTgtRot, aLimRot) {
            var mStdRot = aStdRot;
            var mTgtRot = aTgtRot;
            var mLimRot = aLimRot;
            var mRtnTmpP = mStdRot + mLimRot;
            if (mRtnTmpP >= 360) {
              mRtnTmpP = mRtnTmpP % 360;
            }
            var mRtnTmpM = mStdRot - mLimRot;
            if (mRtnTmpM < 0) {
              mRtnTmpM = 360 + mRtnTmpM;
            }
            if (mRtnTmpP > mRtnTmpM) {
              if (mRtnTmpM <= mTgtRot && mTgtRot <= mRtnTmpP) {
                return true;
              } else {
                return false;
              }
            } else {
              if (mRtnTmpM <= mTgtRot || mTgtRot <= mRtnTmpP) {
                return true;
              } else {
                return false;
              }
            }
          }
          function mChkInOrOut(aVtxs, aTgtVtx) {
            var mRSum = 0;
            for (var i = 0; i < aVtxs.length; i += 1) {
              var mIdxNex = (i + 1 + aVtxs.length) % aVtxs.length;
              var mA = aVtxs[i] - aTgtVtx;
              var mB = aVtxs[mIdxNex] - aTgtVtx;
              var mCos = mA[0] * mB[0] + mA[1] * mB[1];
              var mSin = mA[0] * mB[1] - mA[1] * mB[0];
              mRSum -= (180 / Math.PI) * Math.atan2(mSin, mCos);
            }
            var mRotSum = Math.round(mRSum);
            return mRotSum !== 0;
          }
          var mInputVtxs1 = [];
          var mInputIn1 = [];
          var mInputOut1 = [];
          var mInputOglIdxs1 = [];
          for (var i = 0; i < aObjAry1.length; i += 1) {
            mInputVtxs1.push(aObjAry1[i].mVtx);
            mInputIn1.push(aObjAry1[i].mIn);
            mInputOut1.push(aObjAry1[i].mOut);
            mInputOglIdxs1.push(aObjAry1[i].mIdx);
          }
          var mInputVtxs2 = [];
          var mInputIn2 = [];
          var mInputOut2 = [];
          var mInputOglIdxs2 = [];
          for (var i = 0; i < aObjAry2.length; i += 1) {
            mInputVtxs2.push(aObjAry2[i].mVtx);
            mInputIn2.push(aObjAry2[i].mIn);
            mInputOut2.push(aObjAry2[i].mOut);
            mInputOglIdxs2.push(aObjAry2[i].mIdx);
          }
          var mDtlPathObjAry1 = mCreateDtlPathObjAry(
            mInputVtxs1,
            mInputIn1,
            mInputOut1,
            mInputOglIdxs1,
          );
          var mDtlPathObjAry2Pre = mCreateDtlPathObjAry(
            mInputVtxs2,
            mInputIn2,
            mInputOut2,
            mInputOglIdxs2,
          );
          var mDtlPathObjAry2 = mReversePathPtSets(mDtlPathObjAry2Pre);
          var mRndPts1 = [];
          var mRndPts2 = [];
          for (var i = 0; i < mDtlPathObjAry1.length; i += 1) {
            mRndPts1.push(mDtlPathObjAry1[i].mVtx);
          }
          for (var i = 0; i < mDtlPathObjAry2.length; i += 1) {
            mRndPts2.push(mDtlPathObjAry2[i].mVtx);
          }
          var mRndOglIdxs1 = [];
          var mRndOglIdxs2 = [];
          for (var i = 0; i < mDtlPathObjAry1.length; i += 1) {
            mRndOglIdxs1.push(mDtlPathObjAry1[i].mOglIdxs);
          }
          for (var i = 0; i < mDtlPathObjAry2.length; i += 1) {
            mRndOglIdxs2.push(mDtlPathObjAry2[i].mOglIdxs);
          }
          var mMinusNumForF = 1;
          var mMinusNumForL = 1;
          if (aPtNumAndTgntChkF[0] == true) {
            mMinusNumForF = 1;
          }
          if (aPtNumAndTgntChkL[0] == true) {
            mMinusNumForL = 1;
          }
          if (aPtNumAndTgntChkF[0] == false && aPtNumAndTgntChkF[1] == true) {
            mMinusNumForF = 3;
          }
          if (aPtNumAndTgntChkL[0] == false && aPtNumAndTgntChkL[1] == true) {
            mMinusNumForL = 3;
          }
          var sumNum1Zero = 0 + mMinusNumForF;
          var sumNum1Lgt = mRndPts1.length - mMinusNumForL;
          var sumNum2Zero = 0 + mMinusNumForF;
          var sumNum2Lgt = mRndPts2.length - mMinusNumForL;
          var mOverlapedPts1Objs = [];
          for (var i = sumNum1Zero; i < sumNum1Lgt; i++) {
            for (var j = sumNum1Zero; j < sumNum1Lgt; j++) {
              if (i != j && mRndPts1[i].toString() == mRndPts1[j].toString()) {
                var mOverlapedPtsObj = new mCreateOverlapedPtsObj();
                mOverlapedPtsObj.mVtx = mRndPts1[i];
                mOverlapedPtsObj.mIdx = i;
                mOverlapedPts1Objs.push(mOverlapedPtsObj);
                break;
              }
            }
            for (var k = sumNum2Zero; k < sumNum2Lgt; k++) {
              if (mRndPts1[i].toString() == mRndPts2[k].toString()) {
                var mOverlapedPtsObj = new mCreateOverlapedPtsObj();
                mOverlapedPtsObj.mVtx = mRndPts1[i];
                mOverlapedPtsObj.mIdx = i;
                mOverlapedPts1Objs.push(mOverlapedPtsObj);
                break;
              }
            }
          }
          var mOverlapedPts2Objs = [];
          for (var i = sumNum2Zero; i < sumNum2Lgt; i++) {
            for (var j = sumNum2Zero; j < sumNum2Lgt; j++) {
              if (i != j && mRndPts2[i].toString() == mRndPts2[j].toString()) {
                var mOverlapedPtsObj = new mCreateOverlapedPtsObj();
                mOverlapedPtsObj.mVtx = mRndPts2[i];
                mOverlapedPtsObj.mIdx = i;
                mOverlapedPts2Objs.push(mOverlapedPtsObj);
                break;
              }
            }
            for (var k = sumNum1Zero; k < sumNum1Lgt; k++) {
              if (mRndPts2[i].toString() == mRndPts1[k].toString()) {
                var mOverlapedPtsObj = new mCreateOverlapedPtsObj();
                mOverlapedPtsObj.mVtx = mRndPts2[i];
                mOverlapedPtsObj.mIdx = i;
                mOverlapedPts2Objs.push(mOverlapedPtsObj);
                break;
              }
            }
          }
          var m4Pairs = [];
          for (var i = 0; i < mOverlapedPts1Objs.length - 1; i += 1) {
            var m4Pair = new mCreate4PairObj();
            m4Pair.mPtAry.push(mOverlapedPts1Objs[i]);
            m4Pair.mPtAry.push(mOverlapedPts2Objs[i]);
            m4Pair.mPtAry.push(mOverlapedPts2Objs[i + 1]);
            m4Pair.mPtAry.push(mOverlapedPts1Objs[i + 1]);
            var mPtforMidVtxF1 = mOverlapedPts1Objs[i].mVtx;
            var mPtforMidVtxF2 = mOverlapedPts2Objs[i + 1].mVtx;
            var mPtforMidVtxL1 = mOverlapedPts2Objs[i].mVtx;
            var mPtforMidVtxL2 = mOverlapedPts1Objs[i + 1].mVtx;
            var mMidVtxTmp = mGetCrossVtx(
              mPtforMidVtxF1,
              mPtforMidVtxF2,
              mPtforMidVtxL1,
              mPtforMidVtxL2,
            );
            m4Pair.mCrossVtx = mMidVtxTmp;
            m4Pairs.push(m4Pair);
          }
          var mOverlaped4Pts = [];
          for (var i = 0; i < m4Pairs.length; i += 1) {
            if (m4Pairs[i].mChk != true) {
              for (var j = 0; j < m4Pairs.length; j += 1) {
                if (
                  j != i &&
                  m4Pairs[j].mChk != true &&
                  m4Pairs[i].mCrossVtx.toString() ==
                    m4Pairs[j].mCrossVtx.toString()
                ) {
                  mOverlaped4Pts.push(m4Pairs[i]);
                  m4Pairs[i].mChk = true;
                }
              }
            }
          }
          var mPtInfoSets = [];
          for (var i = 1; i < mRndPts1.length - 1; i += 1) {
            var mPtInfoSet = new mCreatePtInfoSet();
            mPtInfoSet.mIdx = i;
            mPtInfoSet.mValue = mRndPts1[i];
            mPtInfoSet.mOglIdxs = mRndOglIdxs1[i];
            mPtInfoSet.mDirNum = mGet3VtxDirRtn(
              mRndPts1[i - 1],
              mRndPts1[i],
              mRndPts1[i + 1],
            );
            for (var j = 1; j < mRndPts2.length - 1; j += 1) {
              var mOptn1 = new mCreateOptn();
              mOptn1.mValue = mRndPts2[j];
              mOptn1.mLength = mGetLength(mPtInfoSet.mValue, mRndPts2[j]);
              mOptn1.mIdx = j;
              mOptn1.mOglIdxs = mRndOglIdxs2[j];
              mOptn1.mDirNum = mGet3VtxDirRtn(
                mRndPts2[j - 1],
                mRndPts2[j],
                mRndPts2[j + 1],
              );
              mPtInfoSet.mOptns.push(mOptn1);
            }
            mPtInfoSets.push(mPtInfoSet);
          }
          if (aPtNumAndTgntChkF[0] == false && aPtNumAndTgntChkF[1] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              if (
                mPtInfoSets[i].mIdx == 1 ||
                mPtInfoSets[i].mIdx == 2 ||
                mPtInfoSets[i].mIdx == 3
              ) {
                mPtInfoSets[i].mDcdOptn.mChk = true;
              }
            }
          }
          if (aPtNumAndTgntChkL[0] == false && aPtNumAndTgntChkL[1] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              if (
                mPtInfoSets[i].mIdx == mRndPts1.length - 2 ||
                mPtInfoSets[i].mIdx == mRndPts1.length - 3 ||
                mPtInfoSets[i].mIdx == mRndPts1.length - 4
              ) {
                mPtInfoSets[i].mDcdOptn.mChk = true;
              }
            }
          }
          for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
            if (mPtInfoSets[i].mDcdOptn.mChk == true) {
              mPtInfoSets.splice(i, 1);
            }
          }
          if (aPtNumAndTgntChkF[0] == false && aPtNumAndTgntChkF[1] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
                if (
                  mPtInfoSets[i].mOptns[j].mIdx == 1 ||
                  mPtInfoSets[i].mOptns[j].mIdx == 2 ||
                  mPtInfoSets[i].mOptns[j].mIdx == 3
                ) {
                  mPtInfoSets[i].mOptns.splice(j, 1);
                }
              }
            }
          }
          if (aPtNumAndTgntChkL[0] == false && aPtNumAndTgntChkL[1] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
                if (
                  mPtInfoSets[i].mOptns[j].mIdx == mRndPts2.length - 2 ||
                  mPtInfoSets[i].mOptns[j].mIdx == mRndPts2.length - 3 ||
                  mPtInfoSets[i].mOptns[j].mIdx == mRndPts2.length - 4
                ) {
                  mPtInfoSets[i].mOptns.splice(j, 1);
                }
              }
            }
          }
          if (aPtNumAndTgntChkF[0] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              if (mPtInfoSets[i].mIdx == 1 || mPtInfoSets[i].mIdx == 2) {
                mPtInfoSets[i].mDcdOptn.mChk = true;
              }
            }
          }
          if (aPtNumAndTgntChkL[0] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              if (
                mPtInfoSets[i].mIdx == mRndPts1.length - 2 ||
                mPtInfoSets[i].mIdx == mRndPts1.length - 3
              ) {
                mPtInfoSets[i].mDcdOptn.mChk = true;
              }
            }
          }
          for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
            if (mPtInfoSets[i].mDcdOptn.mChk == true) {
              mPtInfoSets.splice(i, 1);
            }
          }
          if (aPtNumAndTgntChkF[0] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
                if (
                  mPtInfoSets[i].mOptns[j].mIdx == 1 ||
                  mPtInfoSets[i].mOptns[j].mIdx == 2
                ) {
                  mPtInfoSets[i].mOptns.splice(j, 1);
                }
              }
            }
          }
          if (aPtNumAndTgntChkL[0] == true) {
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
                if (
                  mPtInfoSets[i].mOptns[j].mIdx == mRndPts2.length - 2 ||
                  mPtInfoSets[i].mOptns[j].mIdx == mRndPts2.length - 3
                ) {
                  mPtInfoSets[i].mOptns.splice(j, 1);
                }
              }
            }
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
              for (var k = 0; k < mRndPts1.length - 1; k += 1) {
                if (
                  mChkCrossLineSegs(
                    mPtInfoSets[i].mValue,
                    mPtInfoSets[i].mOptns[j].mValue,
                    mRndPts1[k],
                    mRndPts1[k + 1],
                    false,
                  ) == true
                ) {
                  mPtInfoSets[i].mOptns.splice(j, 1);
                  break;
                }
              }
            }
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
              for (var k = 0; k < mRndPts2.length - 1; k += 1) {
                if (
                  mChkCrossLineSegs(
                    mPtInfoSets[i].mValue,
                    mPtInfoSets[i].mOptns[j].mValue,
                    mRndPts2[k],
                    mRndPts2[k + 1],
                    false,
                  ) == true
                ) {
                  mPtInfoSets[i].mOptns.splice(j, 1);
                  break;
                }
              }
            }
          }
          var mFstVtx1 = mRndPts1[0];
          var mFstVtx2 = mRndPts2[0];
          var mLstVtx1 = mRndPts1[mRndPts1.length - 1];
          var mLstVtx2 = mRndPts2[mRndPts2.length - 1];
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
              for (var k = 0; k < mRndPts2.length - 1; k += 1) {
                if (
                  mChkCrossLineSegs(
                    mPtInfoSets[i].mValue,
                    mPtInfoSets[i].mOptns[j].mValue,
                    mFstVtx1,
                    mFstVtx2,
                    false,
                  ) ||
                  mChkCrossLineSegs(
                    mPtInfoSets[i].mValue,
                    mPtInfoSets[i].mOptns[j].mValue,
                    mLstVtx1,
                    mLstVtx2,
                    false,
                  ) == true
                ) {
                  mPtInfoSets[i].mOptns.splice(j, 1);
                  break;
                }
              }
            }
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
              if (
                mMatch(
                  mPtInfoSets[i].mValue,
                  mPtInfoSets[i].mOptns[j].mValue,
                  2,
                ) == true
              ) {
                mPtInfoSets[i].mOptns.splice(j, 1);
              }
            }
          }
          var mRndPts1ForTmpShp = mRndPts1.slice();
          var mRndPts2ForTmpShp = mRndPts2.slice();
          mRndPts2ForTmpShp.reverse();
          var mRndShpVtxs = mRndPts1ForTmpShp.concat(mRndPts2ForTmpShp);
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
              var mMdlPtForChkInOut =
                (mPtInfoSets[i].mValue + mPtInfoSets[i].mOptns[j].mValue) / 2;
              if (mChkInOrOut(mRndShpVtxs, mMdlPtForChkInOut) === false) {
                mPtInfoSets[i].mOptns.splice(j, 1);
              }
            }
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            var mDirRot1 = mPtInfoSets[i].mDirNum;
            for (var j = mPtInfoSets[i].mOptns.length - 1; j >= 0; j--) {
              var mDirRot2 = mPtInfoSets[i].mOptns[j].mDirNum;
              if (mChkRotWithinRange(mDirRot1, mDirRot2, 22.5) === false) {
                mPtInfoSets[i].mOptns.splice(j, 1);
              }
            }
          }
          for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
            if (mPtInfoSets[i].mOptns.length == 0) {
              mPtInfoSets.splice(i, 1);
            }
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            mPtInfoSets[i].mOptns.sort(function (a, b) {
              return a.mLength - b.mLength;
            });
            mPtInfoSets[i].mDcdOptn = mPtInfoSets[i].mOptns[0];
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            if (mPtInfoSets[i].mDcdOptn.mChk != true) {
              for (var j = 0; j < mPtInfoSets.length; j += 1) {
                if (
                  mPtInfoSets[j].mDcdOptn.mChk != true &&
                  i != j &&
                  mPtInfoSets[i].mDcdOptn.mIdx ==
                    mPtInfoSets[j].mDcdOptn.mIdx &&
                  mPtInfoSets[i].mDcdOptn.mLength >=
                    mPtInfoSets[j].mDcdOptn.mLength
                ) {
                  mPtInfoSets[i].mDcdOptn.mChk = true;
                  break;
                }
              }
            }
          }
          for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
            if (mPtInfoSets[i].mDcdOptn.mChk == true) {
              mPtInfoSets.splice(i, 1);
            }
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            var mHztlLinePt1 = mPtInfoSets[i].mValue;
            var mHztlLinePt2 = mPtInfoSets[i].mDcdOptn.mValue;
            for (var j = i; j < mPtInfoSets.length; j++) {
              if (j != i) {
                var mHztlLinePt3 = mPtInfoSets[j].mValue;
                var mHztlLinePt4 = mPtInfoSets[j].mDcdOptn.mValue;
                if (
                  crossChk(
                    mHztlLinePt1,
                    mHztlLinePt2,
                    mHztlLinePt3,
                    mHztlLinePt4,
                  ) == true
                ) {
                  var mHztlLineLength1 = mGetLength(mHztlLinePt1, mHztlLinePt2);
                  var mHztlLineLength2 = mGetLength(mHztlLinePt3, mHztlLinePt4);
                  if (mHztlLineLength1 >= mHztlLineLength2) {
                    mPtInfoSets[i].mDcdOptn.mChk = true;
                  } else {
                    mPtInfoSets[j].mDcdOptn.mChk = true;
                  }
                }
              }
            }
          }
          for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
            if (mPtInfoSets[i].mDcdOptn.mChk == true) {
              mPtInfoSets.splice(i, 1);
            }
          }
          if (aPtNumAndTgntChkF[0] == false && aPtNumAndTgntChkF[1] == true) {
            for (var i = 2; i >= 1; i += -1) {
              var mFSet = new mCreatePtInfoSet();
              mFSet.mValue = mDtlPathObjAry1[i].mVtx;
              mFSet.mIdx = i;
              mFSet.mOglIdxs = mDtlPathObjAry1[i].mOglIdxs;
              mFSet.mTgntChkX = "+-";
              mFSet.mTgntChkY = "No Data";
              mFSet.mDcdOptn = {};
              mFSet.mDcdOptn.mValue = mDtlPathObjAry2[i].mVtx;
              mFSet.mDcdOptn.mIdx = i;
              mFSet.mDcdOptn.mChk = false;
              mFSet.mDcdOptn.mOglIdxs = mDtlPathObjAry2[i].mOglIdxs;
              mPtInfoSets.unshift(mFSet);
            }
          }
          if (aPtNumAndTgntChkL[0] == false && aPtNumAndTgntChkL[1] == true) {
            for (var i = 3; i >= 2; i += -1) {
              var mLSet = new mCreatePtInfoSet();
              mLSet.mValue = mDtlPathObjAry1[mDtlPathObjAry1.length - i].mVtx;
              mLSet.mIdx = mDtlPathObjAry1.length - i;
              mLSet.mOglIdxs =
                mDtlPathObjAry1[mDtlPathObjAry1.length - i].mOglIdxs;
              mLSet.mTgntChkX = "+-";
              mLSet.mTgntChkY = "No Data";
              mLSet.mDcdOptn = {};
              mLSet.mDcdOptn.mValue =
                mDtlPathObjAry2[mDtlPathObjAry2.length - i].mVtx;
              mLSet.mDcdOptn.mIdx = mDtlPathObjAry2.length - i;
              mLSet.mDcdOptn.mChk = false;
              mLSet.mDcdOptn.mOglIdxs =
                mDtlPathObjAry2[mDtlPathObjAry2.length - i].mOglIdxs;
              mPtInfoSets.push(mLSet);
            }
          }
          if (aPtNumAndTgntChkF[0] == true) {
            for (var i = 2; i >= 1; i += -1) {
              var mFSet = new mCreatePtInfoSet();
              mFSet.mValue = mDtlPathObjAry1[i].mVtx;
              mFSet.mIdx = i;
              mFSet.mOglIdxs = mDtlPathObjAry1[i].mOglIdxs;
              mFSet.mTgntChkX = "+-";
              mFSet.mTgntChkY = "No Data";
              mFSet.mDcdOptn = {};
              mFSet.mDcdOptn.mValue = mDtlPathObjAry2[i].mVtx;
              mFSet.mDcdOptn.mIdx = i;
              mFSet.mDcdOptn.mChk = false;
              mFSet.mDcdOptn.mOglIdxs = mDtlPathObjAry2[i].mOglIdxs;
              mPtInfoSets.unshift(mFSet);
            }
          }
          if (aPtNumAndTgntChkL[0] == true) {
            for (var i = 3; i >= 2; i += -1) {
              var mLSet = new mCreatePtInfoSet();
              mLSet.mValue = mDtlPathObjAry1[mDtlPathObjAry1.length - i].mVtx;
              mLSet.mIdx = mDtlPathObjAry1.length - i;
              mLSet.mOglIdxs =
                mDtlPathObjAry1[mDtlPathObjAry1.length - i].mOglIdxs;
              mLSet.mTgntChkX = "+-";
              mLSet.mTgntChkY = "No Data";
              mLSet.mDcdOptn = {};
              mLSet.mDcdOptn.mValue =
                mDtlPathObjAry2[mDtlPathObjAry2.length - i].mVtx;
              mLSet.mDcdOptn.mIdx = mDtlPathObjAry2.length - i;
              mLSet.mDcdOptn.mChk = false;
              mLSet.mDcdOptn.mOglIdxs =
                mDtlPathObjAry2[mDtlPathObjAry2.length - i].mOglIdxs;
              mPtInfoSets.push(mLSet);
            }
          }
          var mInvalidIdxs = aInvalidIdxs;
          if (mInvalidIdxs.length !== 0) {
            for (var i = 0; i < mInvalidIdxs.length; i += 1) {
              var mInvalidIdx = mInvalidIdxs[i];
              for (var j = 0; j < mPtInfoSets.length; j += 1) {
                var mAllIdxs = mPtInfoSets[j].mOglIdxs.concat(
                  mPtInfoSets[j].mDcdOptn.mOglIdxs,
                );
                for (var k = 0; k < mAllIdxs.length; k += 1) {
                  if (mInvalidIdx == mAllIdxs[k]) {
                    mPtInfoSets[j].mDcdOptn.mChk = true;
                    break;
                  }
                }
              }
            }
          }
          for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
            if (mPtInfoSets[i].mDcdOptn.mChk == true) {
              mPtInfoSets.splice(i, 1);
            }
          }
          var mDifIdxs = aDifIdxs;
          if (mDifIdxs.length !== 0) {
            if (
              aPtNumAndTgntChkF[0] == false &&
              aPtNumAndTgntChkF[1] == false
            ) {
              var mSelPglIdxsTmp = [mRndOglIdxs1[0], mRndOglIdxs2[0]];
              mSelPglIdxsTmp.sort(function (a, b) {
                return a - b;
              });
              for (var i = mDifIdxs.length - 1; i >= 0; i--) {
                var mDifIdxsTmp = mDifIdxs[i];
                mDifIdxsTmp.sort(function (a, b) {
                  return a - b;
                });
                if (mSelPglIdxsTmp.toString() === mDifIdxsTmp.toString()) {
                  mDifIdxs.splice(i, 1);
                }
              }
            }
            if (
              aPtNumAndTgntChkL[0] == false &&
              aPtNumAndTgntChkL[1] == false
            ) {
              var mSelPglIdxsTmp = [
                mRndOglIdxs1[mRndOglIdxs1.length - 1],
                mRndOglIdxs2[mRndOglIdxs2.length - 1],
              ];
              mSelPglIdxsTmp.sort(function (a, b) {
                return a - b;
              });
              for (var i = mDifIdxs.length - 1; i >= 0; i--) {
                var mDifIdxsTmp = mDifIdxs[i];
                mDifIdxsTmp.sort(function (a, b) {
                  return a - b;
                });
                if (mSelPglIdxsTmp.toString() === mDifIdxsTmp.toString()) {
                  mDifIdxs.splice(i, 1);
                }
              }
            }
            var mNewInfoObjForAdds = [];
            for (var i = 0; i < mDifIdxs.length; i += 1) {
              var mDifIdxsTgt = mDifIdxs[i];
              var mNewInfoObjForAdd = new mCreatePtInfoSet();
              var mKChk = false;
              for (var j = 0; j < mRndOglIdxs1.length; j += 1) {
                if (mKChk == true) {
                  break;
                }
                var mRndOglIdxs1Tgt = mRndOglIdxs1[j];
                if (mRndOglIdxs1Tgt.length !== 1) {
                  continue;
                } else {
                  if (
                    mDifIdxsTgt[0] == mRndOglIdxs1Tgt[0] ||
                    mDifIdxsTgt[1] == mRndOglIdxs1Tgt[0]
                  ) {
                    if (mDifIdxsTgt[1] == mRndOglIdxs1Tgt[0]) {
                      mDifIdxsTgt = [mDifIdxsTgt[1], mDifIdxsTgt[0]];
                    }
                    mNewInfoObjForAdd.mIdx = j;
                    mNewInfoObjForAdd.mValue = mRndPts1[j];
                    mNewInfoObjForAdd.mOglIdxs = mDifIdxsTgt[0];
                    var mOglIdxForOpt = mDifIdxsTgt[1];
                    for (var k = 0; k < mRndOglIdxs2.length; k += 1) {
                      var mRndOglIdxs2Tgt = mRndOglIdxs2[k];
                      if (mRndOglIdxs2Tgt.length !== 1) {
                        continue;
                      } else {
                        if (mOglIdxForOpt == mRndOglIdxs2Tgt[0]) {
                          mNewInfoObjForAdd.mDcdOptn.mIdx = k;
                          mNewInfoObjForAdd.mDcdOptn.mValue = mRndPts2[k];
                          mNewInfoObjForAdd.mDcdOptn.mOglIdxs = mOglIdxForOpt;
                          mNewInfoObjForAdd.mDcdOptn.mChk = false;
                          mNewInfoObjForAdds.push(mNewInfoObjForAdd);
                          mKChk = true;
                          break;
                        }
                      }
                    }
                  }
                }
              }
            }
            for (var i = 0; i < mPtInfoSets.length; i += 1) {
              var mHztlLinePt1 = mPtInfoSets[i].mValue;
              var mHztlLinePt2 = mPtInfoSets[i].mDcdOptn.mValue;
              for (var j = 0; j < mNewInfoObjForAdds.length; j += 1) {
                var mHztlLinePt3 = mNewInfoObjForAdds[j].mValue;
                var mHztlLinePt4 = mNewInfoObjForAdds[j].mDcdOptn.mValue;
                if (
                  crossChk(
                    mHztlLinePt1,
                    mHztlLinePt2,
                    mHztlLinePt3,
                    mHztlLinePt4,
                  ) === true
                ) {
                  mPtInfoSets[i].mDcdOptn.mChk = true;
                  break;
                }
              }
            }
            mNewInfoObjForAdds = mNewInfoObjForAdds.sort(function (a, b) {
              return a.mIdx - b.mIdx;
            });
            var mInfosForUnshift = [];
            if (mPtInfoSets.length === 0) {
              mPtInfoSets = mNewInfoObjForAdds;
            } else {
              mFlagI: for (var i = mNewInfoObjForAdds.length - 1; i >= 0; i--) {
                for (var j = mPtInfoSets.length - 1; j >= 0; j--) {
                  if (mNewInfoObjForAdds[i].mIdx === mPtInfoSets[j].mIdx) {
                    mPtInfoSets.splice(j, 1, mNewInfoObjForAdds[i]);
                    continue mFlagI;
                  } else {
                    if (mNewInfoObjForAdds[i].mIdx > mPtInfoSets[j].mIdx) {
                      mPtInfoSets.splice(j + 1, 0, mNewInfoObjForAdds[i]);
                      continue mFlagI;
                    }
                  }
                }
                mInfosForUnshift.unshift(mNewInfoObjForAdds[i]);
              }
              mPtInfoSets = mInfosForUnshift.concat(mPtInfoSets);
              for (var i = mNewInfoObjForAdds.length - 1; i >= 0; i--) {
                for (var j = mPtInfoSets.length - 1; j >= 0; j--) {
                  if (
                    mNewInfoObjForAdds[i].mIdx != mPtInfoSets[j].mIdx &&
                    mNewInfoObjForAdds[i].mDcdOptn.mIdx ==
                      mPtInfoSets[j].mDcdOptn.mIdx
                  ) {
                    mPtInfoSets[j].mDcdOptn.mChk = true;
                  }
                }
              }
            }
            for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
              if (mPtInfoSets[i].mDcdOptn.mChk == true) {
                mPtInfoSets.splice(i, 1);
              }
            }
          }
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            mPtInfoSets[i].mVtx =
              (mPtInfoSets[i].mValue + mPtInfoSets[i].mDcdOptn.mValue) / 2;
          }
          var mOverlaped4VtxsAry = [];
          for (var j = 0; j < mOverlaped4Pts.length; j += 1) {
            var mOverlaped4Vtxs = [];
            for (var k = 0; k < mOverlaped4Pts[j].mPtAry.length; k += 1) {
              mOverlaped4Vtxs.push(mOverlaped4Pts[j].mPtAry[k].mVtx);
            }
            mOverlaped4VtxsAry.push(mOverlaped4Vtxs);
          }
          for (var i = mPtInfoSets.length - 1; i >= 0; i--) {
            for (var j = 0; j < mOverlaped4VtxsAry.length; j += 1) {
              if (
                mJudgeInOrOut(mPtInfoSets[i].mVtx, mOverlaped4VtxsAry[j]) ==
                true
              ) {
                mPtInfoSets.splice(i, 1);
                break;
              }
            }
          }
          var mInitPt = (mRndPts1[0] + mRndPts2[0]) / 2;
          var mLastPt =
            (mRndPts1[mRndPts1.length - 1] + mRndPts2[mRndPts2.length - 1]) / 2;
          var mInitSet = new mCreatePtInfoSet();
          mInitSet.mVtx = mInitPt;
          mInitSet.mIdx = 0;
          mInitSet.mDcdOptn.mIdx = 0;
          mInitSet.mTgntChkX = "NoData";
          mInitSet.mTgntChkY = "NoData";
          var mLastSet = new mCreatePtInfoSet();
          mLastSet.mVtx = mLastPt;
          mLastSet.mIdx = mRndPts1.length - 1;
          mLastSet.mDcdOptn.mIdx = mDtlPathObjAry2.length - 1;
          mLastSet.mTgntChkX = "NoData";
          mLastSet.mTgntChkY = "NoData";
          mPtInfoSets.unshift(mInitSet);
          mPtInfoSets.push(mLastSet);
          for (var i = 0; i < mPtInfoSets.length - 1; i += 1) {
            var mOutTgnt =
              (mDtlPathObjAry1[mPtInfoSets[i].mIdx].mOut +
                mDtlPathObjAry2[mPtInfoSets[i].mDcdOptn.mIdx].mOut) /
              2;
            var mOutTgntVec = mGetUnitVector(mOutTgnt);
            var mInTgnt =
              (mDtlPathObjAry1[mPtInfoSets[i + 1].mIdx].mIn +
                mDtlPathObjAry2[mPtInfoSets[i + 1].mDcdOptn.mIdx].mIn) /
              2;
            var mInTgntVec = mGetUnitVector(mInTgnt);
            var mCrossPtForMidLines = mGetCrossVtx(
              mPtInfoSets[i].mVtx,
              mPtInfoSets[i].mVtx + mOutTgntVec,
              mPtInfoSets[i + 1].mVtx,
              mPtInfoSets[i + 1].mVtx + mInTgntVec,
            );
            var mLgtMidLinesDirect = mGetLength(
              mPtInfoSets[i].mVtx,
              mPtInfoSets[i + 1].mVtx,
            );
            if (mCrossPtForMidLines == false) {
              var mLgtMidLines = mLgtMidLinesDirect;
            } else {
              var mLgtMidLinesOut = mGetLength(
                mPtInfoSets[i].mVtx,
                mCrossPtForMidLines,
              );
              var mLgtMidLinesIn = mGetLength(
                mPtInfoSets[i + 1].mVtx,
                mCrossPtForMidLines,
              );
              if (
                mLgtMidLinesDirect <= mLgtMidLinesOut ||
                mLgtMidLinesDirect <= mLgtMidLinesIn
              ) {
                var mLgtMidLines = mLgtMidLinesDirect;
              } else {
                var mLgtMidLines = mLgtMidLinesOut + mLgtMidLinesIn;
              }
            }
            mPtInfoSets[i].mOut = mOutTgntVec * mLgtMidLines * 0.33;
            mPtInfoSets[i + 1].mIn = mInTgntVec * mLgtMidLines * 0.33;
          }
          mPtInfoSets[0].mIn = [0, 0];
          mPtInfoSets[mPtInfoSets.length - 1].mOut = [0, 0];
          if (
            aPtNumAndTgntChkF[0] == true ||
            (aPtNumAndTgntChkF[0] == false && aPtNumAndTgntChkF[1] == true)
          ) {
            mPtInfoSets[0].mOut = [0, 0];
          }
          if (
            aPtNumAndTgntChkL[0] == true ||
            (aPtNumAndTgntChkL[0] == false && aPtNumAndTgntChkL[1] == true)
          ) {
            mPtInfoSets[mPtInfoSets.length - 1].mIn = [0, 0];
          }
          var mMidPathShape = mCreatePathBone(mPtInfoSets);
          for (var i = 1; i < mPtInfoSets.length - 1; i += 1) {
            if (
              mPtInfoSets[i].mTgntChkX === undefined &&
              mPtInfoSets[i].mTgntChkY === undefined
            ) {
              var mDrtStringPreX = mGetDrtString(
                mPtInfoSets[i].mVtx[0],
                mPtInfoSets[i - 1].mVtx[0],
              );
              var mDrtStringPreY = mGetDrtString(
                mPtInfoSets[i].mVtx[1],
                mPtInfoSets[i - 1].mVtx[1],
              );
              var mDrtStringNexX = mGetDrtString(
                mPtInfoSets[i + 1].mVtx[0],
                mPtInfoSets[i].mVtx[0],
              );
              var mDrtStringNexY = mGetDrtString(
                mPtInfoSets[i + 1].mVtx[1],
                mPtInfoSets[i].mVtx[1],
              );
              mPtInfoSets[i].mTgntChkX = mDrtStringPreX + mDrtStringNexX;
              mPtInfoSets[i].mTgntChkY = mDrtStringPreY + mDrtStringNexY;
            }
          }
          var mTgntChkIdxs = [];
          for (var i = 0; i < mPtInfoSets.length; i += 1) {
            if (
              mPtInfoSets[i].mTgntChkX == "+-" ||
              mPtInfoSets[i].mTgntChkX == "-+" ||
              mPtInfoSets[i].mTgntChkY == "+-" ||
              mPtInfoSets[i].mTgntChkY == "-+"
            ) {
              mTgntChkIdxs.push(i);
            }
          }
          var mMidlineLgtAll = mGetPathLengthE(
            mPtInfoSets,
            0,
            mPtInfoSets.length - 1,
          );
          if (mTgntChkIdxs.length == 0) {
            var mMidlineRatios = [0, 1];
          } else {
            var mMidlineLgts = [
              mGetPathLengthE(mPtInfoSets, 0, mTgntChkIdxs[0]),
            ];
            for (var i = 0; i < mTgntChkIdxs.length - 1; i += 1) {
              var mMidlineLgtTmp = mGetPathLengthE(
                mPtInfoSets,
                mTgntChkIdxs[i],
                mTgntChkIdxs[i + 1],
              );
              mMidlineLgts.push(mMidlineLgtTmp);
            }
            mMidlineLgts.push(
              mGetPathLengthE(
                mPtInfoSets,
                mTgntChkIdxs[mTgntChkIdxs.length - 1],
                mPtInfoSets.length - 1,
              ),
            );
            var mMidlineRatios = [0];
            var mMidlineRatioTmp = 0;
            for (var i = 0; i < mMidlineLgts.length; i += 1) {
              mMidlineRatioTmp += mMidlineLgts[i] / mMidlineLgtAll;
              mMidlineRatios.push(mMidlineRatioTmp);
            }
          }
          if (mTgntChkIdxs.length == 0) {
            var mPt1Ratios = [0, 1];
          } else {
            var mPt1Idxs = [];
            for (var i = 0; i < mTgntChkIdxs.length; i += 1) {
              mPt1Idxs.push(mPtInfoSets[mTgntChkIdxs[i]].mIdx);
            }
            var mPt1LgtAll = mGetPathLengthE(
              mDtlPathObjAry1,
              0,
              mDtlPathObjAry1.length - 1,
            );
            var mPt1Lgts = [mGetPathLengthE(mDtlPathObjAry1, 0, mPt1Idxs[0])];
            for (var i = 0; i < mPt1Idxs.length - 1; i += 1) {
              var mPt1LgtTmp = mGetPathLengthE(
                mDtlPathObjAry1,
                mPt1Idxs[i],
                mPt1Idxs[i + 1],
              );
              mPt1Lgts.push(mPt1LgtTmp);
            }
            mPt1Lgts.push(
              mGetPathLengthE(
                mDtlPathObjAry1,
                mPt1Idxs[mPt1Idxs.length - 1],
                mDtlPathObjAry1.length - 1,
              ),
            );
            var mPt1Ratios = [0];
            var mPt1RatioTmp = 0;
            for (var i = 0; i < mPt1Lgts.length; i += 1) {
              mPt1RatioTmp += mPt1Lgts[i] / mPt1LgtAll;
              mPt1Ratios.push(mPt1RatioTmp);
            }
          }
          if (mTgntChkIdxs.length == 0) {
            var mPt2Ratios = [0, 1];
          } else {
            var mPt2Idxs = [];
            for (var i = 0; i < mTgntChkIdxs.length; i += 1) {
              mPt2Idxs.push(mPtInfoSets[mTgntChkIdxs[i]].mDcdOptn.mIdx);
            }
            var mPt2LgtAll = mGetPathLengthE(
              mDtlPathObjAry2,
              0,
              mDtlPathObjAry2.length - 1,
            );
            var mPt2Lgts = [mGetPathLengthE(mDtlPathObjAry2, 0, mPt2Idxs[0])];
            for (var i = 0; i < mPt2Idxs.length - 1; i += 1) {
              var mPt2LgtTmp = mGetPathLengthE(
                mDtlPathObjAry2,
                mPt2Idxs[i],
                mPt2Idxs[i + 1],
              );
              mPt2Lgts.push(mPt2LgtTmp);
            }
            mPt2Lgts.push(
              mGetPathLengthE(
                mDtlPathObjAry2,
                mPt2Idxs[mPt2Idxs.length - 1],
                mDtlPathObjAry2.length - 1,
              ),
            );
            var mPt2Ratios = [0];
            var mPt2RatioTmp = 0;
            for (var i = 0; i < mPt2Lgts.length; i += 1) {
              mPt2RatioTmp += mPt2Lgts[i] / mPt2LgtAll;
              mPt2Ratios.push(mPt2RatioTmp);
            }
          }
          var mRstRatios = {};
          mRstRatios.Mid = mMidlineRatios;
          mRstRatios.Fst = mPt1Ratios;
          mRstRatios.Lst = mPt2Ratios;
          mRstRatios.mBoneShp = mMidPathShape;
          return mRstRatios;
        }
        var mErrTxt11 = "Please select 1 Layer";
        var mErrTxt12 = "including Only 1 path";
        var mErrTxt13 = 'or 2 Path "Guide" and "_Base".';
        var mErrTxt3 = "Please input a TC Number greater than 1.";
        var mErrTxt41 = "Please input Numbers";
        var mErrTxt42 = "and 1-2 Numbers in F & L.";
        try {
          mCatchErrorLyr(false);
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSps = mSl.selectedProperties;
          for (var i = 0; i < mSps.length; i += 1) {
            mSps[i].selected = false;
          }
          var mPathPptys = mGetPathPptys(mSl);
          mCatchErrorOgl(mPathPptys === null);
          mCatchErrorOgl(
            mPathPptys.length !== 1 &&
              (mPathPptys.length !== 2 ||
                mPathPptys[0].name !== "Guide" ||
                mPathPptys[1].name.indexOf("_Base") === -1),
          );
          if (mPathPptys.length === 1) {
            var mSp = mPathPptys[0];
            var mSpAdrs = mGetSelPptyAdrs(mSp);
            var mGuideAdrs = null;
            var mOglName = mSp.name;
          } else if (mPathPptys[0].name === "Guide") {
            var mSp = mPathPptys[1];
            var mSpAdrs = mGetSelPptyAdrs(mSp);
            var mGuideAdrs = mGetSelPptyAdrs(mPathPptys[0]);
            var mOglName = mSp.name.substring(0, mSp.name.indexOf("_Base"));
          } else {
            var mSp = mPathPptys[0];
            var mSpAdrs = mGetSelPptyAdrs(mSp);
            var mGuideAdrs = mGetSelPptyAdrs(mPathPptys[1]);
            var mOglName = mSp.name.substring(0, mSp.name.indexOf("_Base"));
          }
          var mSpIdx = mSp.propertyIndex;
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt11);
          writeLn(mErrTxt12);
          writeLn(mErrTxt13);
          return;
        }
        try {
          var mTxt = mPnl.mEtLineFrame.text;
          if (mPnl.mBtLineFrame.text == "TC") {
            var mTimeTmp = mGetTimeFromEtStr(mTxt, mAi, true);
          } else {
            if (mPnl.mBtLineFrame.text == "F") {
              var mTimeTmp = mGetTimeFromEtStr(mTxt, mAi, false);
            }
          }
          var mToF = mTimeTmp <= 0;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt3);
          return;
        }
        try {
          var mIdxsF = mTxtToAry(mPnl.mEtFpt.text);
          var mToF = mIdxsF.length === 0 || mIdxsF.length > 2;
          mCatchErrorOgl(mToF);
          if (mIdxsF.length === 2) {
            var mAllNum = mSp.path.value.vertices.length - 1;
            mToF =
              (mIdxsF[0] !== 0 || mIdxsF[1] !== mAllNum) &&
              mIdxsF[0] + 1 !== mIdxsF[1];
            mCatchErrorOgl(mToF);
          }
          for (var i = 0; i < mIdxsF.length; i += 1) {
            mToF = isNaN(mIdxsF[i]) === true;
            mCatchErrorOgl(mToF);
          }
          var mIdxsL = mTxtToAry(mPnl.mEtLpt.text);
          mToF = mIdxsL.length === 0 || mIdxsL.length > 2;
          mCatchErrorOgl(mToF);
          if (mIdxsL.length === 2) {
            mToF =
              (mIdxsL[0] !== 0 || mIdxsL[1] !== mAllNum) &&
              mIdxsL[0] + 1 !== mIdxsL[1];
            mCatchErrorOgl(mToF);
          }
          for (var i = 0; i < mIdxsL.length; i += 1) {
            mToF = isNaN(mIdxsL[i]) === true;
            mCatchErrorOgl(mToF);
          }
          var mInvalidIdxs = mTxtToAry(mPnl.mEtIpt.text);
          for (var i = 0; i < mInvalidIdxs.length; i += 1) {
            var mToF = isNaN(mInvalidIdxs[i]) === true;
            mCatchErrorOgl(mToF);
          }
          var mDifIdxs = mPnl.mEtDpt.text;
          if (mDifIdxs === "") {
            mDifIdxs = [];
          } else {
            mDifIdxs = mDifIdxs.replace(/ /g, "");
            mDifIdxs = mDifIdxs.match(/\[(.+?)\]/g);
            var mToF = mDifIdxs === null;
            mCatchErrorOgl(mToF);
            for (var i = 0; i < mDifIdxs.length; i += 1) {
              mDifIdxs[i] = mDifIdxs[i].slice(1);
              mDifIdxs[i] = mDifIdxs[i].slice(0, -1);
            }
            for (var i = 0; i < mDifIdxs.length; i += 1) {
              mDifIdxs[i] = mDifIdxs[i].split(",");
            }
            for (var i = 0; i < mDifIdxs.length; i += 1) {
              for (var j = 0; j < mDifIdxs[i].length; j += 1) {
                mDifIdxs[i][j] = parseInt(mDifIdxs[i][j]);
                var mToF = isNaN(mDifIdxs[i][j]) === true;
                mCatchErrorOgl(mToF);
              }
            }
          }
        } catch (e) {
          alert(e);
          clearOutput();
          writeLn(mErrTxt41);
          writeLn(mErrTxt42);
          return;
        }
        app.beginUndoGroup("Create");
        var mPointSets = [];
        for (var i = 0; i < mSp.path.value.vertices.length; i += 1) {
          var mPointSet = new mCreatePointSet();
          mPointSet.mVtx = mSp.path.value.vertices[i];
          mPointSet.mIn = mSp.path.value.inTangents[i];
          mPointSet.mOut = mSp.path.value.outTangents[i];
          mPointSet.mIdx = i;
          mPointSets.push(mPointSet);
        }
        if (mIdxsF.length === 1) {
          var mDifRateObjF = mCreateGuidePtForOneSelPt(
            mSp,
            mPointSets,
            mIdxsF[0],
          );
          mShiftNum(mIdxsF, mDifRateObjF);
          mShiftNum(mIdxsL, mDifRateObjF);
          if (mInvalidIdxs.length !== 0) {
            mShiftNum(mInvalidIdxs, mDifRateObjF);
          }
          if (mDifIdxs.length !== 0) {
            for (var i = 0; i < mDifIdxs.length; i += 1) {
              mShiftNum(mDifIdxs[i], mDifRateObjF);
            }
          }
          if (mDifRateObjF !== null) {
            mPointSets = mDifRateObjF.mAllInfos;
          }
        }
        if (mIdxsL.length === 1) {
          var mDifRateObjL = mCreateGuidePtForOneSelPt(
            mSp,
            mPointSets,
            mIdxsL[0],
          );
          mShiftNum(mIdxsF, mDifRateObjL);
          mShiftNum(mIdxsL, mDifRateObjL);
          if (mInvalidIdxs.length !== 0) {
            mShiftNum(mInvalidIdxs, mDifRateObjL);
          }
          if (mDifIdxs.length !== 0) {
            for (var i = 0; i < mDifIdxs.length; i += 1) {
              mShiftNum(mDifIdxs[i], mDifRateObjL);
            }
          }
          if (mDifRateObjL !== null) {
            mPointSets = mDifRateObjL.mAllInfos;
          }
        }
        var m2Line = mGet2Line(mPointSets, mIdxsF, mIdxsL);
        var mLineInit = m2Line[0].slice();
        var mLineLast = m2Line[1].slice();
        for (var i = 0; i < mIdxsF.length; i += 1) {
          if (mLineLast[0].mIdx == mIdxsF[i]) {
            mLineInit = m2Line[1].slice();
            mLineLast = m2Line[0].slice();
          }
        }
        var mPtNumAndTgntChkL = [true, true];
        var mLastPt1 = mLineInit[mLineInit.length - 1];
        var mLastPt2 = mLineLast[0];
        if (mIdxsL.length != 1) {
          mPtNumAndTgntChkL[0] = false;
        }
        if (
          mLastPt1.mOut.toString() == "0,0" &&
          mLastPt2.mIn.toString() == "0,0"
        ) {
          mPtNumAndTgntChkL[1] = false;
        }
        var mPtNumAndTgntChkF = [true, true];
        var mFirstPt1 = mLineLast[mLineLast.length - 1];
        var mFirstPt2 = mLineInit[0];
        if (mIdxsF.length != 1) {
          mPtNumAndTgntChkF[0] = false;
        }
        if (
          mFirstPt1.mOut.toString() == "0,0" &&
          mFirstPt2.mIn.toString() == "0,0"
        ) {
          mPtNumAndTgntChkF[1] = false;
        }
        if (mPtNumAndTgntChkL[0] == false && mPtNumAndTgntChkL[1] == true) {
          var mMidPtForTgntL = mGetPathPIO(
            mLastPt1.mVtx,
            mLastPt1.mOut,
            mLastPt2.mIn,
            mLastPt2.mVtx,
            0.5,
          );
          var mPointSetL = new mCreatePointSet();
          mPointSetL.mVtx = mMidPtForTgntL[0];
          mPointSetL.mIn = mMidPtForTgntL[1];
          mPointSetL.mOut = mMidPtForTgntL[2];
          mLineInit[mLineInit.length - 1].mOut = mMidPtForTgntL[3];
          mLineLast[0].mIn = mMidPtForTgntL[4];
        }
        if (mPtNumAndTgntChkF[0] == false && mPtNumAndTgntChkF[1] == true) {
          var mMidPtForTgntF = mGetPathPIO(
            mFirstPt1.mVtx,
            mFirstPt1.mOut,
            mFirstPt2.mIn,
            mFirstPt2.mVtx,
            0.5,
          );
          var mPointSetF = new mCreatePointSet();
          mPointSetF.mVtx = mMidPtForTgntF[0];
          mPointSetF.mIn = mMidPtForTgntF[1];
          mPointSetF.mOut = mMidPtForTgntF[2];
          mLineLast[mLineLast.length - 1].mOut = mMidPtForTgntF[3];
          mLineInit[0].mIn = mMidPtForTgntF[4];
        }
        if (mPtNumAndTgntChkL[0] == false && mPtNumAndTgntChkL[1] == true) {
          mLineInit.push(mPointSetL);
          mLineLast.unshift(mPointSetL);
        }
        if (mPtNumAndTgntChkF[0] == false && mPtNumAndTgntChkF[1] == true) {
          mLineLast.push(mPointSetF);
          mLineInit.unshift(mPointSetF);
        }
        var mMidlineRatios = mMidLineMake(
          mLineInit,
          mLineLast,
          mPtNumAndTgntChkF,
          mPtNumAndTgntChkL,
          mInvalidIdxs,
          mDifIdxs,
        );
        if (mPnl.mCbBoneless.value == true) {
          var mRatiosMStr = "var mRatiosM = [ 0 , 1 ]";
          var mRatiosFStr = "var mRatiosF = [ 0 , 1 ]";
          var mRatiosLStr = "var mRatiosL = [ 0 , 1 ]";
        } else {
          var mRatiosMStr =
            "var mRatiosM = [" + mMidlineRatios.Mid.join(",") + "]";
          var mRatiosFStr =
            "var mRatiosF = [" + mMidlineRatios.Fst.join(",") + "]";
          var mRatiosLStr =
            "var mRatiosL = [" + mMidlineRatios.Lst.join(",") + "]";
        }
        if (mPtNumAndTgntChkL[0] == false && mPtNumAndTgntChkL[1] == false) {
          var mLastPt1 = mLineInit[mLineInit.length - 1];
          var mLastPt2 = mLineLast[0];
          var mMidPtL = new mMidInfo();
          mMidPtL.mVtx = (mLastPt1.mVtx + mLastPt2.mVtx) / 2;
          mMidPtL.mHalfLength = mGetLength(mLastPt1.mVtx, mLastPt2.mVtx) / 2;
          mLineInit.push(mMidPtL);
          mLineLast.unshift(mMidPtL);
        }
        if (mPtNumAndTgntChkF[0] == false && mPtNumAndTgntChkF[1] == false) {
          var mFirstPt1 = mLineLast[mLineLast.length - 1];
          var mFirstPt2 = mLineInit[0];
          var mMidPtF = new mMidInfo();
          mMidPtF.mVtx = (mFirstPt1.mVtx + mFirstPt2.mVtx) / 2;
          mMidPtF.mHalfLength = mGetLength(mFirstPt1.mVtx, mFirstPt2.mVtx) / 2;
          mLineInit.unshift(mMidPtF);
        } else {
          mLineLast.pop();
        }
        var mLineAll = mLineLast.concat(mLineInit);
        var mNewPathShape = mCreatePathAmt(mLineAll);
        var mOglPathPptyPrt = mGetPptyFromAdrs(mSpAdrs, 1);
        var mNewPathPpty = mOglPathPptyPrt.addProperty(
          "ADBE Vector Shape - Group",
        );
        mNewPathPpty.path.setValue(mNewPathShape);
        mNewPathPpty.name = mOglName + "_forAnimation";
        var mLgt01 = mGetPathLength(mLineInit, 0, mLineInit.length - 1);
        var mLgtAll = mGetPathLength(mLineAll, 0, mLineAll.length - 1);
        var mLgt02 = mLgtAll - mLgt01;
        var mMidRatio = mLgt02 / mLgtAll;
        var mStartPctF = mMidRatio * 100;
        var mStartPctL = 100;
        var mEndPctF = mMidRatio * 100;
        var mEndPctL = 0;
        var mStartPctFedit = mStartPctF;
        var mStartPctLedit = mStartPctL;
        var mEndPctFedit = mEndPctF;
        var mEndPctLedit = mEndPctL;
        if (mPtNumAndTgntChkL[0] == false && mPtNumAndTgntChkL[1] == false) {
          var mEdgePctL = (mMidPtL.mHalfLength / mLgtAll) * 100;
          mStartPctLedit = mStartPctL - mEdgePctL;
          mEndPctLedit = mEndPctL + mEdgePctL;
        }
        if (mPtNumAndTgntChkF[0] == false && mPtNumAndTgntChkF[1] == false) {
          var mEdgePctF = (mMidPtF.mHalfLength / mLgtAll) * 100;
          mStartPctFedit = mStartPctF + mEdgePctF;
          mEndPctFedit = mEndPctF - mEdgePctF;
        }
        var mEft = mSl.effect.addProperty("ADBE Slider Control");
        mEft.name = "ShapeNir Slider";
        var mEftPty = mEft.property("ADBE Slider Control-0001");
        mTimeTmp = Math.abs(mTimeTmp);
        if (mPnl.mCbZero.value == true) {
          var mStartTime = mSl.inPoint;
          var mEndTime = mStartTime + mTimeTmp;
        } else {
          var mStartTime = mAi.time;
          var mEndTime = mStartTime + mTimeTmp;
        }
        mEftPty.setValueAtTime(mStartTime, 0);
        mEftPty.setValueAtTime(mEndTime, 100);
        if (mPnl.mCbEase.value == true) {
          var mKfe1 = new KeyframeEase(0, 33.33);
          var mKfe2 = new KeyframeEase(0, 100);
          mEftPty.setTemporalEaseAtKey(1, [mKfe1], [mKfe1]);
          mEftPty.setTemporalEaseAtKey(2, [mKfe2], [mKfe1]);
        }
        var mTrim = mSl
          .property("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Filter - Trim");
        var mExpTxtF = mConvertExpStrToStr(mExpStrForLineF, true);
        mTrim.property("ADBE Vector Trim Start").expression =
          "var mN01 = " +
          mStartPctF +
          ";\n" +
          "var mN02 = " +
          mStartPctL +
          ";\n" +
          "var mN01Edt = " +
          mStartPctFedit +
          ";\n" +
          "var mN02Edt = " +
          mStartPctLedit +
          ";\n" +
          mRatiosMStr +
          ";\n" +
          mRatiosFStr +
          ";\n" +
          mExpTxtF;
        var mExpTxtL = mConvertExpStrToStr(mExpStrForLineL, true);
        mTrim.property("ADBE Vector Trim End").expression =
          "var mN01 = " +
          mEndPctF +
          ";\n" +
          "var mN02 = " +
          mEndPctL +
          ";\n" +
          "var mN01Edt = " +
          mEndPctFedit +
          ";\n" +
          "var mN02Edt = " +
          mEndPctLedit +
          ";\n" +
          mRatiosMStr +
          ";\n" +
          mRatiosLStr +
          ";\n" +
          mExpTxtL;
        var mOglPathPpty = mGetPptyFromAdrs(mSpAdrs, 0);
        mOglPathPpty.name = mOglName + "_Original";
        mOglPathPpty.enabled = false;
        if (mGuideAdrs !== null) {
          var mGuideForRemove = mGetPptyFromAdrs(mGuideAdrs, 0);
          mGuideForRemove.remove();
        }
        var mOglPathPptyPrt = mGetPptyFromAdrs(mSpAdrs, 1);
        mOglPathPptyPrt(mOglPathPptyPrt.numProperties).moveTo(mSpIdx);
        var mOglPathPptyPrt = mGetPptyFromAdrs(mSpAdrs, 1);
        var mBonePathPpty = mOglPathPptyPrt.addProperty(
          "ADBE Vector Shape - Group",
        );
        mBonePathPpty.path.setValue(mMidlineRatios.mBoneShp);
        mBonePathPpty.name = mOglName + "_Bone";
        mBonePathPpty.selected = true;
        app.executeCommand(18);
        mSl.property("ADBE Root Vectors Group").selected = true;
        app.executeCommand(20);
        var mActiveViewer = app.activeViewer;
        if (
          mActiveViewer != null &&
          mActiveViewer.type == ViewerType.VIEWER_COMPOSITION
        ) {
          mActiveViewer.setActive();
        }
        app.endUndoGroup();
      }
      function mVtxIdxGetsF() {
        var mIdxs = mGetVtxsForBt();
        if (mIdxs === null) {
          return;
        }
        var mErrTxt1 = "Please select 1 or Neighbor 2 Pt in 1 Path.";
        try {
          var mToF = mIdxs.length === 0 || mIdxs.length > 2;
          mCatchErrorOgl(mToF);
          if (mIdxs.length === 2) {
            var mAllNum =
              app.project.activeItem.selectedLayers[0].selectedProperties[0]
                .path.value.vertices.length - 1;
            mToF =
              (mIdxs[0] !== 0 || mIdxs[1] !== mAllNum) &&
              mIdxs[0] + 1 !== mIdxs[1];
            mCatchErrorOgl(mToF);
          }
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return null;
        }
        mPnl.mEtFpt.text = mIdxs;
        mPnl.mEtIpt.text = "";
        mPnl.mEtDpt.text = "";
      }
      function mVtxIdxGetsL() {
        var mIdxs = mGetVtxsForBt();
        if (mIdxs === null) {
          return;
        }
        var mErrTxt1 = "Please select 1 or Neighbor 2 Pt in 1 Path.";
        try {
          var mToF = mIdxs.length === 0 || mIdxs.length > 2;
          mCatchErrorOgl(mToF);
          if (mIdxs.length === 2) {
            var mAllNum =
              app.project.activeItem.selectedLayers[0].selectedProperties[0]
                .path.value.vertices.length - 1;
            mToF =
              (mIdxs[0] !== 0 || mIdxs[1] !== mAllNum) &&
              mIdxs[0] + 1 !== mIdxs[1];
            mCatchErrorOgl(mToF);
          }
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return null;
        }
        mPnl.mEtLpt.text = mIdxs;
        mPnl.mEtIpt.text = "";
        mPnl.mEtDpt.text = "";
      }
      function mVtxIdxGetsI() {
        var mIdxs = mGetVtxsForBt();
        if (mIdxs === null) {
          return;
        }
        var mIvdIdxs = mIdxs;
        var mOglAry = mTxtToAry(mPnl.mEtIpt.text);
        var mRstAry = mOglAry.concat(mIvdIdxs);
        mPnl.mEtIpt.text = mRstAry;
      }
      function mVtxIdxGetsD() {
        var mIdxs = mGetVtxsForBt();
        if (mIdxs === null) {
          return;
        }
        var mErrTxt1 = "Please select 2 Pt in 1 Path.";
        try {
          var mIvdIdxs = mIdxs;
          var mToF = mIvdIdxs.length !== 2;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return null;
        }
        var mIvdIdxsTxt = "[ " + mIvdIdxs.toString() + " ]";
        if (mPnl.mEtDpt.text !== "") {
          mPnl.mEtDpt.text = mPnl.mEtDpt.text + " , " + mIvdIdxsTxt;
        } else {
          mPnl.mEtDpt.text = mIvdIdxsTxt;
        }
      }
      function mGetVtxsForBt() {
        var mErrTxt1 = "Please select at least 1 Pt in 1 Path.";
        var mErrTxt2 = "Could\'nt get Index.";
        try {
          mCatchErrorLyr(false);
          var mAi = app.project.activeItem;
          var mSl = mAi.selectedLayers[0];
          var mSps = mSl.selectedProperties;
          var mToF =
            (mSps.length !== 1 ||
              mSps[0].matchName !== "ADBE Vector Shape - Group") &&
            (mSps.length !== 2 ||
              mSps[0].matchName !== "ADBE Vector Shape - Group" ||
              mSps[1].matchName !== "ADBE Vector Shape");
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt1);
          return null;
        }
        try {
          var mSp = mSps[0];
          var mSelIdxs = mGetSelVtxIdxs(mSp);
          mToF = mSelIdxs === null;
          mCatchErrorOgl(mToF);
        } catch (e) {
          clearOutput();
          writeLn(mErrTxt2);
          return null;
        }
        return mSelIdxs;
      }
      var mExpStrForLineF =
        '\n    function mLinear( aInput , aInNumF , aInNumL , aOutNumF , aOutNumL ){\n        var mInputLgt = aInNumL - aInNumF;\n        var mOutputLgt = aOutNumL - aOutNumF;\n        var mRatio = mOutputLgt / mInputLgt;\n\n        if( aInNumF <= aInput \n        && aInput <= aInNumL ){\n            var mOutput = ( ( aInput - aInNumF ) * mRatio ) + aOutNumF;\n        }else{\n            var mOutput = aInput;\n        }\n        return mOutput;\n    }\n\n    var mSld = thisLayer("ADBE Effect Parade")("ShapeNir Slider")("ADBE Slider Control-0001") / 100;\n\n    if( mSld <= 0){ var mRst = mN01; }\n    else if( mSld >= 1 ){ var mRst = mN02; }\n    else{\n        for( var i = 1 ; i < mRatiosM.length ; i++ ){\n            if( mRatiosM[ i - 1 ] < mSld\n            && mSld < mRatiosM [ i ] ){\n                var mCtl = mLinear( mSld , mRatiosM[ i - 1 ] , mRatiosM[ i ] , mRatiosF[ i - 1 ] , mRatiosF[ i ] );\n                break;\n            }\n        }\n\n        var mRst = mLinear( mCtl, 0, 1 , mN01Edt ,  mN02Edt );\n    }\n\n    mRst;\n';
      var mExpStrForLineL =
        '\n    function mLinear( aInput , aInNumF , aInNumL , aOutNumF , aOutNumL ){\n        var mInputLgt = aInNumL - aInNumF;\n        var mOutputLgt = aOutNumL - aOutNumF;\n        var mRatio = mOutputLgt / mInputLgt;\n\n        if( aInNumF <= aInput \n        && aInput <= aInNumL ){\n            var mOutput = ( ( aInput - aInNumF ) * mRatio ) + aOutNumF;\n        }else{\n            var mOutput = aInput;\n        }\n        return mOutput;\n    }\n\n    var mSld = thisLayer("ADBE Effect Parade")("ShapeNir Slider")("ADBE Slider Control-0001") / 100;\n\n    if( mSld <= 0){ var mRst = mN01; }\n    else if( mSld >= 1 ){ var mRst = mN02; }\n    else{\n        for( var i = 1 ; i < mRatiosM.length ; i++ ){\n            if( mRatiosM[ i - 1 ] < mSld\n            && mSld < mRatiosM [ i ] ){\n                var mCtl = mLinear( mSld , mRatiosM[ i - 1 ] , mRatiosM[ i ] , mRatiosL[ i - 1 ] , mRatiosL[ i ] );\n                break;\n            }\n        }\n\n        var mRst = mLinear( mCtl, 0, 1 , mN01Edt ,  mN02Edt );\n    }\n\n    mRst;\n';
      var mPnl = createUI(aGbl);
      if (mPnl instanceof Window) {
        mPnl.center();
        mPnl.show();
      }
      mPnl.mBtSepTxt.onClick = function () {
        if (rtctjwsj109.t()) {
          try {
            var mTrialPpty =
              app.project.activeItem.selectedLayers[0].property("Source Text")
                .value.text;
          } catch (e) {
            alert("Select a text layer.");
          }
          if (mTrialPpty.length <= 3) {
            mTxtSep();
          } else {
            alert("Trial mode can separate 3 letters or less.");
          }
        } else {
          if (rtctjwsj109.s()) {
            mTxtSep();
          }
        }
      };
      mPnl.mBtDirU.onClick = function () {
        if (rtctjwsj109.s()) {
          mPthSlce(0);
        }
      };
      mPnl.mBtDirD.onClick = function () {
        if (rtctjwsj109.s()) {
          mPthSlce(2);
        }
      };
      mPnl.mBtDirL.onClick = function () {
        if (rtctjwsj109.s()) {
          mPthSlce(3);
        }
      };
      mPnl.mBtDirR.onClick = function () {
        if (rtctjwsj109.s()) {
          mPthSlce(1);
        }
      };
      mPnl.mBtCut.onClick = function () {
        if (rtctjwsj109.s()) {
          mPthCut();
        }
      };
      mPnl.mBtPat.onClick = function () {
        if (rtctjwsj109.s()) {
          mPthPtch();
        }
      };
      mPnl.mBtMge.onClick = function () {
        if (rtctjwsj109.s()) {
          mVtxMge();
        }
      };
      mPnl.mBtSepShp.onClick = function () {
        if (rtctjwsj109.s()) {
          mShpSep();
        }
      };
      mPnl.mBtUniteShp.onClick = function () {
        if (rtctjwsj109.s()) {
          mShpUnte();
        }
      };
      mPnl.mBtExtShp.onClick = function () {
        if (rtctjwsj109.s()) {
          mShpExt();
        }
      };
      mPnl.mBtFpt.onClick = function () {
        if (rtctjwsj109.s()) {
          mVtxIdxGetsF();
        }
      };
      mPnl.mBtLpt.onClick = function () {
        if (rtctjwsj109.s()) {
          mVtxIdxGetsL();
        }
      };
      mPnl.mBtIpt.onClick = function () {
        if (rtctjwsj109.s()) {
          mVtxIdxGetsI();
        }
      };
      mPnl.mBtDpt.onClick = function () {
        if (rtctjwsj109.s()) {
          mVtxIdxGetsD();
        }
      };
      mPnl.mBtSep.onClick = function () {
        if (rtctjwsj109.s()) {
          mGuideMake();
        }
      };
      mPnl.mBtUnit.onClick = function () {
        if (rtctjwsj109.s()) {
          mTrailDel();
        }
      };
      mPnl.mBtDiv.onClick = function () {
        if (rtctjwsj109.s()) {
          mTrailMake();
        }
      };
      mPnl.mBtLineFrame.onClick = function () {
        if (rtctjwsj109.s()) {
          mTCorFConv(mPnl.mBtLineFrame, mPnl.mEtLineFrame);
        }
      };
      mPnl.mBtScrFrame.onClick = function () {
        if (rtctjwsj109.s()) {
          mTCorFConv(mPnl.mBtScrFrame, mPnl.mEtScrFrame);
        }
      };
      mPnl.mBtKey.onClick = function () {
        if (rtctjwsj109.s()) {
          mKeyChg();
        }
      };
      mPnl.mBtSqc.onClick = function () {
        if (rtctjwsj109.s()) {
          mLyrNameSeq();
        }
      };
    }
    CuttanaNirMainFunc(thisObj);
  }
}
tj_CuttanaNir(this);
