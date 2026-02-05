/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function mazeFX(thisObj) {
  var af_settings = {
    betaExpirationDate: new Date("Feb 15, 2017"),
    betaStartDate: new Date("Jan 26, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [
      {
        name: "Check out more products from Real Creations",
        url: "http://aescripts.com/authors/real-creations",
      },
    ],
    helpText:
      "Below is a short description of mazeFX interface. For more detailed information, please read the included .PDF user guide.\nIf you like this tool, please visit: www.realcreations.gr\n\n--\n\nThere are two tabs in the interface:\n\n\n______ Grid - Tab ______\n\n[ Fill ]\n    creates a maze that fills the entire composition\n\n[ Using Masks ]\n    creates a maze by using masks from the Grid Guide Layer\n\n[ Grid X ]\n    set the number of grid points for the X dimension (horizontal)\n\n[ Grid Y ]\n    set the number of grid points for the Y dimension (vertical)\n\n\n\n______ Settings - Tab ______\n\n[ Keep start/end walls closed? ]\n    keeps the starting and ending wall open\n\n[ Put maze parts on separate layers? ]\n    separates the maze in layers. The solution path, walls and empty walls are placed on separate layers\n\n[ Create a null that follows the path ]\n    creates a null layer, that is attached at the tip of the solution path and follows its position (this option is only available in AFX CC2018 and above)\n\n[ Create filled boxes on empty parts ]\n    It fills the empty cells of a maze with box shapes. This option is only available in the \'Using Masks\' mode\n\n[ Solution start ]\n    set the starting point of the first cell to one of the 13 predefined positions\n\n[ Solution end ]\n    set the ending point of the last cell to one of the 13 predefined positions\n\n[ Mask Precision ]\n    set the precision for bezier masks. If you use masks with a lot of bezier vertices, set this to \'high\'\n\n\n--\n\n\n[ Create Maze ]\n   Button that creates the maze!\n\n___When the \'Using Mask\' mode is selected the following two buttons appear:\n\n[ Create Guide ]\n   creates a Grid Guide layer to draw masks on, which is going\n   to be used in the maze generation process\n\n[ Create Maze by using mask ]\n   creates the actual maze by using the masks drawn on the Grid Guide layer",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 8246763531986393,
    productSKU: "TTMF-SUL",
    scriptAuthor: "Real Creations",
    scriptName: "mazeFX",
    scriptURL: "https://aescripts.com/mazefx",
    scriptVersion: "1.32",
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
    var mx = __BLOB__BLOB_000668__;
    var wx = __BLOB__BLOB_000669__;
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
  var O0OO = new a(af_settings);
  if (O0OO.c()) {
    function PseudoEffectManagement() {
      function n() {
        CS6_tab = er_panels.add("tab", undefined, "CS6");
        CS6_tab.margins = [0, 0, 0, 0];
        InstallCS6PseudoEffectsButton = CS6_tab.add(
          "button",
          undefined,
          "Install mazeFX effect controls for CS6",
        );
        InstallCS6PseudoEffectsButton.alignment = ["", "center"];
        InstallCS6PseudoEffectsButton.size = [210, 25];
        InstallCS6PseudoEffectsButton.helpTip =
          "This will add the appropriate entries in the PresetEffects.xml of AE CS6 which eliminates the \'missing effect\' message on the effects control panel.\n\nIf for some reason the installation is not succesfull there is no need to worry. mazeFX will continue to work properly, besides the \'missing effect\' warning.\n\nAfter successful installation, this \'CS6\' tab will no longer be visible.";
        InstallCS6PseudoEffectsButton.onClick = function () {
          u();
        };
      }
      function i() {
        e = app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        );
        if (!e) {
          alert(
            'Please set preference "Allow Scripts to Write Files and Access Network". \n \nWindows:   After Effects  > Edit > Preferences > General \n \nMac:   After Effects > Preferences > General   ',
          );
        }
        return e;
      }
      function p(e) {
        if ($.os.indexOf("Mac") != -1) {
          system.callSystem('open -R "' + e.fsName + '"');
        } else {
          system.callSystem('EXPLORER.EXE /select,"' + e.fsName + '"');
        }
      }
      function d() {
        if ($.os.indexOf("Windows") > -1) {
          e = Folder.appPackage.fsName;
          t = 'cmd /c attrib -r /S /D "' + e + '"';
          system.callSystem(t);
          t = 'cmd /c attrib -r /S /D "' + e + "\\" + 'PresetEffects.xml"';
          e = e + "\\";
          system.callSystem(t);
        } else {
          e = Folder.appPackage.fsName + "/Contents/Resources/";
          t = 'chmod u+rwx  "' + e + 'PresetEffects.xml"';
          system.callSystem(t);
        }
        return e;
      }
      function c() {
        e = false;
        t = d();
        a = File(t + "PresetEffects.xml");
        r = a.open("r");
        if (!r) {
          alert("Installation Error: Can\'t read PresetEffects.xml");
          return "";
        }
        while (!a.eof) {
          s = a.readln();
          if (s == decodeURIComponent(o)) {
            e = true;
            break;
          }
        }
        a.close();
        return e;
      }
      function u() {
        c = false;
        e = d();
        r = File(e + "PresetEffects.xml");
        a = new File(Folder.temp.fsName + "/temp.xml");
        r.copy(Folder.temp.fsName + "/temp.xml");
        h = File(
          r.parent.fsName + "/" + r.name.replace(/\.xml/, "_backup.xml"),
        );
        r.copy(h);
        if (!h.exists) {
          if ($.os.indexOf("Mac") > -1) {
            m =
              Folder.desktop.fsName +
              "/After Effects PresetEffects.xml File Backup/";
            h = File(m + r.name);
            if (!h.parent.exists) {
              h.parent.create();
            }
          } else {
            h = File(Folder.desktop.fsName + "/" + r.name);
          }
          r.copy(h);
          if (!h.exists) {
            alert(
              "Installation Error: Failed to make backup. Please quit and restart After Effects as Administrator and try again.",
            );
            return "";
          } else {
            c = true;
          }
        }
        u = c ? h : r;
        l = u.open("r");
        if (!l) {
          alert("Installation Error: Can\'t read PresetEffects.xml");
          return "";
        }
        n = a.open("w");
        while (!u.eof) {
          i = u.readln();
          if (i.indexOf("</Effects>") == -1) {
            a.writeln(i);
          } else {
            break;
          }
        }
        a.writeln(
          decodeURIComponent(o + "%0A" + t + "%0A" + s + "%0A%3C%2FEffects%3E"),
        );
        r.close();
        a.close();
        r.remove();
        j = a.copy(r);
        if (c) {
          if (j) {
            alert(
              "Installation complete\nPlease restart After Effects. A backup of the original PresetEffects.xml was made on the Desktop should you wish to restore it. Otherwise you can delete it.",
            );
          } else {
            h.rename("PresetEffects_backup.xml");
            D =
              $.os.indexOf("Mac") > -1
                ? a.copy(m + "/PresetEffects.xml")
                : a.copy(Folder.desktop.fsName + "/PresetEffects.xml");
            A = "Desktop";
            if (!D) {
              r = File(m + "/PresetEffects.xml");
              A = "Temp Folder";
            }
            if ($.os.indexOf("Mac") > -1) {
              alert(
                "New PresetEffects.xml file created\nThere were not enough permissions to replace the file automatically so you will need to do it manually.\n\nAfter you hit OK two folders will be opened in the Finder.   Copy the PresetEffects.xml file from the " +
                  A +
                  " to replace the one inside the After Effects folder.\n\nA backup of the original unmodified file was also created on the Desktop should you need to restore it for any reason, otherwise you can discard it.\n\nPlease restart AE after replacing the file.",
              );
            } else {
              alert(
                "New PresetEffects.xml file created\nThere were not enough permissions to replace the file automatically so you will need to do it manually.\n\nAfter you hit OK, the After Effects resources folder will be opened in the File Explorer and you will find the new PresetEffects.xml file on the " +
                  A +
                  ". Rename the PresetEffects.xml file in the After Effects folder to keep it as a backup and then drag the PresetEffects.xml file from the " +
                  A +
                  " into the After Effects folder.\n\nPlease restart AE after replacing the file.",
              );
            }
            if ($.os.indexOf("Mac") > -1) {
              p(File(m + "/PresetEffects.xml"));
            }
            p(r);
          }
        } else {
          alert("Installation complete!\nPlease restart After Effects.");
        }
      }
      if (parseFloat(app.version) >= 12) {
        return;
      }
      var e = "1.1";
      if (!i()) {
        return "";
      }
      var t =
        "%3C!--%20BEGIN%20mazeFX%20-%20main%20--%3E%0A%3CEffect%20matchname%3D%22Pseudo%2FmazeFX%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FmazeFX%3DmazeFX%22%3E%0A%0A%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fsolution%20path%3DSolution%20Path\'%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20completion%3DCompletion%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20start%3DStart%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%20%20%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20offset%3DOffset%22%20default%3D%220%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20width%3DWidth%22%20default%3D%225%22%20valid_min%3D%220%22%20valid_max%3D%2210000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20roundness%3DRoundness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20wiggliness%3DWiggliness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CPopup%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20tips%3DTips%22%20default%3D%221%22%20popup_string%3D%22%24%24%24%2FAE%2FPreset%2Fpopup%3DFlat%7CRounded%22%2F%3E%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20color%3DColor%22%20default_red%3D%22255%22%20default_green%3D%22255%22%20default_blue%3D%22255%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%0A%20%20%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fdashes%3DDashes\'%3E%0A%20%20%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20gap%3DGap%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20size%3DSize%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%20%20%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20offset%3DOffset%22%20default%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FGroup%3E%0A%0A%20%20%3C%2FGroup%3E%0A%0A%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fwalls%3DWalls\'%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20thickness%3DThickness%22%20default%3D%2210%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20roundness%3DRoundness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20color%3DColor%22%20default_red%3D%2246%22%20default_green%3D%22179%22%20default_blue%3D%22255%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%3C%2FGroup%3E%0A%0A%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fempty%20walls%3DEmpty%20Walls\'%3E%20%20%20%20%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fempty%20wall%20color%3DColor%22%20default_red%3D%220%22%20default_green%3D%2237%22%20default_blue%3D%2265%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fempty%20wall%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%3C%2FGroup%3E%0A%0A%3C%2FEffect%3E%0A%3C!--%20END%20mazeFX%20-%20main%20--%3E%0A%0A%0A%3C!--%20BEGIN%20mazeFX%20-%20no%20empty%20walls%20--%3E%0A%3CEffect%20matchname%3D%22Pseudo%2FmazeFX_no_empty_walls%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FmazeFX%3DmazeFX%22%3E%0A%0A%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fsolution%20path%3DSolution%20Path\'%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20completion%3DCompletion%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20start%3DStart%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%20%20%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20offset%3DOffset%22%20default%3D%220%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20width%3DWidth%22%20default%3D%225%22%20valid_min%3D%220%22%20valid_max%3D%2210000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20roundness%3DRoundness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20wiggliness%3DWiggliness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CPopup%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20tips%3DTips%22%20default%3D%221%22%20popup_string%3D%22%24%24%24%2FAE%2FPreset%2Fpopup%3DFlat%7CRounded%22%2F%3E%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20color%3DColor%22%20default_red%3D%22255%22%20default_green%3D%22255%22%20default_blue%3D%22255%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%0A%20%20%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fdashes%3DDashes\'%3E%0A%20%20%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20gap%3DGap%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20size%3DSize%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%20%20%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20offset%3DOffset%22%20default%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FGroup%3E%20%20%0A%0A%20%20%3C%2FGroup%3E%0A%0A%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fwalls%3DWalls\'%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20thickness%3DThickness%22%20default%3D%2210%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20roundness%3DRoundness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20color%3DColor%22%20default_red%3D%2246%22%20default_green%3D%22179%22%20default_blue%3D%22255%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%3C%2FGroup%3E%0A%0A%3C%2FEffect%3E%0A%3C!--%20END%20mazeFX%20-%20no%20empty%20walls%20--%3E%0A%0A%0A%3C!--%20BEGIN%20mazeFX%20-%20solution%20path%20only%20--%3E%0A%3CEffect%20matchname%3D%22Pseudo%2FmazeFX_solution_path%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FmazeFX%3DmazeFX%20-%20Solution%20Path%22%3E%0A%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20completion%3DCompletion%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20start%3DStart%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%20%20%20%20%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20offset%3DOffset%22%20default%3D%220%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20width%3DWidth%22%20default%3D%225%22%20valid_min%3D%220%22%20valid_max%3D%2210000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20roundness%3DRoundness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20wiggliness%3DWiggliness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CPopup%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20tips%3DTips%22%20default%3D%221%22%20popup_string%3D%22%24%24%24%2FAE%2FPreset%2Fpopup%3DFlat%7CRounded%22%2F%3E%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20color%3DColor%22%20default_red%3D%22255%22%20default_green%3D%22255%22%20default_blue%3D%22255%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fpath%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%0A%20%20%20%20%3CGroup%20name%3D\'%24%24%24%2FAE%2FPreset%2Fdashes%3DDashes\'%3E%0A%20%20%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20gap%3DGap%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20size%3DSize%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%20%20%3CAngle%20name%3D%22%24%24%24%2FAE%2FPreset%2Fdashes%20offset%3DOffset%22%20default%3D%220%22%2F%3E%0A%20%20%20%20%3C%2FGroup%3E%0A%0A%3C%2FEffect%3E%0A%3C!--%20END%20mazeFX%20-%20solution%20path%20only%20--%3E%0A%0A%0A%3C!--%20BEGIN%20mazeFX%20-%20walls%20only--%3E%0A%3CEffect%20matchname%3D%22Pseudo%2FmazeFX_walls%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FmazeFX%3DmazeFX%20-%20Walls%22%3E%0A%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20thickness%3DThickness%22%20default%3D%2210%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20roundness%3DRoundness%22%20default%3D%220%22%20valid_min%3D%220%22%20valid_max%3D%221000%22%20slider_min%3D%220%22%20slider_max%3D%221000%22%2F%3E%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20color%3DColor%22%20default_red%3D%2246%22%20default_green%3D%22179%22%20default_blue%3D%22255%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fwall%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%0A%3C%2FEffect%3E%0A%3C!--%20END%20mazeFX%20-%20walls%20only%20--%3E%0A%20%0A%20%0A%20%3C!--%20BEGIN%20mazeFX%20-%20empty%20walls%20only--%3E%0A%3CEffect%20matchname%3D%22Pseudo%2FmazeFX_empty_walls%22%20name%3D%22%24%24%24%2FAE%2FPreset%2FmazeFX%3DmazeFX%20-%20Empty%20Walls%22%3E%0A%0A%20%20%20%20%3CColor%20name%3D%22%24%24%24%2FAE%2FPreset%2Fempty%20wall%20color%3DColor%22%20default_red%3D%220%22%20default_green%3D%2237%22%20default_blue%3D%2265%22%2F%3E%0A%20%20%20%20%3CSlider%20name%3D%22%24%24%24%2FAE%2FPreset%2Fempty%20wall%20opacity%3DOpacity%22%20DISPLAY_PERCENT%3D%22true%22%20default%3D%22100%22%20valid_min%3D%220%22%20valid_max%3D%22100%22%20slider_min%3D%220%22%20slider_max%3D%22100%22%2F%3E%0A%0A%3C%2FEffect%3E%0A%3C!--%20END%20mazeFX%20-%20empty%20walls%20only%20--%3E";
      var a = "mazeFX v1.1";
      r = decodeURIComponent(a);
      o = encodeURIComponent("<!-- ") + a + encodeURIComponent("_start -->");
      s = encodeURIComponent("<!-- ") + a + encodeURIComponent("_end -->");
      var l = c();
      if (!l) {
        n();
        return;
      }
    }
    function create_TempMessageComp() {
      isTrial = !O0OO.s();
      tempComp = app.project.items.addComp(
        "Generating maze (you can safely delete this comp)",
        4,
        4,
        1,
        1,
        1,
      );
      tempComp.openInViewer();
      PresetsPal = new Window("palette", undefined, undefined, {
        borderless: parseFloat(app.version) < 12 ? false : true,
      });
      PresetsPal.margins = [0, 0, 0, 0];
      myPanel = PresetsPal.add("panel");
      progressBar_text = myPanel.add(
        "statictext",
        undefined,
        "mazeFX - Initialising",
      );
      progressBar_text.alignment = ["fill", ""];
      PB = myPanel.add("progressbar", undefined, 0, 100);
      PB.alignment = ["fill", "fill"];
      PB.size = [300, 6];
      PresetsPal.addEventListener("keydown", function (e) {
        if (ScriptUI.environment.keyboardState.keyName == "Escape") {
          PresetsPal.close();
          PresetsPal = null;
          tempComp.remove();
          curComp.openInViewer();
        }
      });
      if (PresetsPal !== null) {
        PresetsPal.layout.layout(true);
        PresetsPal.show();
      }
      PresetsPal.update();
    }
    function loadImage(e, t, a) {
      var r = Folder.userData.fsName + "/Adobe/ScriptData/" + a;
      if (!Folder(r).exists) {
        Folder(r).create();
        if (!Folder(r).exists) {
          alert("Could not create folder: " + r + ".");
          return;
        }
      }
      var o = r + "/" + t + ".png";
      var s = new File(o);
      if (!s.exists) {
        s.encoding = "BINARY";
        s.open("w");
        s.write(e);
        s.close();
        if (!s.exists) {
          alert("Could not create file in: " + r + ".");
          return;
        }
      }
      return s;
    }
    function arrowsPressed(textfield, minValue, maxValue, name) {
      if (
        ScriptUI.environment.keyboardState.keyName == "Up" ||
        ScriptUI.environment.keyboardState.keyName == "Down"
      ) {
        if (ScriptUI.environment.keyboardState.keyName == "Up") {
          if (Number(textfield.text) + 1 <= maxValue) {
            textfield.text = Number(textfield.text) + 1;
          }
        } else {
          if (Number(textfield.text) - 1 >= minValue) {
            textfield.text = Number(textfield.text) - 1;
          }
        }
        if (LockDimensionsButton.value) {
          if (textfield == GridY) {
            GridX.text = GridY.text;
          }
          if (textfield == GridX) {
            GridY.text = GridX.text;
          }
        }
        if (name !== undefined) {
          eval(name + "Slider").value = textfield.text;
        }
      }
    }
    function CreatePseudoFX(e, t) {
      function s(e, t) {
        var a = l();
        var r = n(e.presetName, e.presetBinary, a);
        var o = t.parentProperty;
        var s = o.containingComp;
        var i = s.layers.addSolid([0, 0, 0], "Temp Solid", 10, 10, 1);
        var p = i.source;
        var d = p.parentFolder;
        i.applyPreset(File(r));
        e.matchName = i("ADBE Effect Parade")(1).matchName;
        o.selected = true;
        t.addProperty(e.matchName);
        p.remove();
        if (d.numItems == 0) {
          d.remove();
        }
      }
      function l() {
        try {
          var e = Folder.userData;
          var t = Folder(e.toString() + "/Aescripts/mazeFX/");
          if (!t.exists) {
            var a = t.create();
            if (!a) {
              alert(
                'Error creating "' +
                  a.fsName +
                  "\nPlease check the permissions for this folder:\n" +
                  e +
                  "\n\nA temp folder will be used instead",
              );
              t = Folder.temp;
            }
          }
          return t.toString();
        } catch (e) {
          alert(
            "Permissions issue with user data folder\nPlease give AE full read and write permissions to the ~/Library/Application Support/Aescripts/mazeFX folder.",
          );
        }
      }
      function n(e, t, a) {
        try {
          var r = new File(a + "/" + e);
          if (!File(r).exists) {
            if (!i()) {
              alert(
                'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure\n"Allow Scripts to Write Files and Access Network" is checked.',
              );
              app.executeCommand(2359);
              if (!i()) {
                return null;
              }
            }
            r.encoding = "BINARY";
            r.open("w");
            r.write(t);
            r.close();
          }
          return r;
        } catch (e) {
          alert("Error in createResourceFile function\n" + e.toString());
        }
      }
      function i() {
        try {
          var e = app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          );
          return e == 1;
        } catch (e) {
          alert("Error in isSecurityPrefSet function\n" + e.toString());
        }
      }
      switch (t) {
        case 1:
          var a = {
            matchName: null,
            presetBinary: [__BLOB__BLOB_000670__],
            presetName: "mazeFX_Solution_Path.ffx",
          };
          PseudoName = "Pseudo/mazeFX_solution_path";
          break;
        case 2:
          var a = {
            matchName: null,
            presetBinary: [__BLOB__BLOB_000671__],
            presetName: "mazeFX_Walls.ffx",
          };
          PseudoName = "Pseudo/mazeFX_walls";
          break;
        case 3:
          var a = {
            matchName: null,
            presetBinary: [__BLOB__BLOB_000672__],
            presetName: "mazeFX_Empty_Walls.ffx",
          };
          PseudoName = "Pseudo/mazeFX_empty_walls";
      }
      var r = app.project.activeItem;
      if (!r || !(r instanceof CompItem)) {
        r = app.project.items.addComp("My Comp", 1920, 1080, 1, 10, 24);
        r.openInViewer();
      }
      var o = e("ADBE Effect Parade");
      if (o.canAddProperty(a.matchName)) {
        o.addProperty(a.matchName);
      } else {
        s(a, o);
      }
    }
    function fillRect() {
      with (this) {
        graphics.drawOSControl();
        graphics.rectPath(0, 0, size[0], size[1]);
        graphics.fillPath(fillBrush);
      }
    }
    function visualize_grid(e, t) {
      isTrial = !O0OO.s();
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = t;
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")
        .addProperty("ADBE Vector Shape - Ellipse").name = "circle";
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Root Vectors Group")(t)(
          "ADBE Vectors Group",
        )("circle")("ADBE Vector Ellipse Size")
        .setValue([
          curComp.width > curComp.height
            ? curComp.width / 150
            : curComp.height / 150,
          curComp.width > curComp.height
            ? curComp.width / 150
            : curComp.height / 150,
        ]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")("circle")("ADBE Vector Ellipse Position")
        .setValue([0, 0]);
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Root Vectors Group")(t)(
          "ADBE Vectors Group",
        )("circle")("ADBE Vector Ellipse Position")
        .setValue([
          -curComp.width * 0.5 + step_W * 0.5,
          -curComp.height * 0.5 + step_H * 0.5,
        ]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Repeater").name = "grid_x_repeater";
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")("grid_x_repeater")("ADBE Vector Repeater Copies")
        .setValue(Number(GridX.text));
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")("grid_x_repeater")("ADBE Vector Repeater Transform")("ADBE Vector Repeater Position")
        .setValue([step_W, 0]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Repeater").name = "grid_y_repeater";
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")("grid_y_repeater")("ADBE Vector Repeater Copies")
        .setValue(Number(GridY.text));
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")("grid_y_repeater")("ADBE Vector Repeater Transform")("ADBE Vector Repeater Position")
        .setValue([0, step_H]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")("ADBE Vector Fill Color")
        .setValue([1, 1, 1, 1]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Color")
        .setValue([0, 0, 0, 1]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(t)("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width")
        .setValue(4);
      app.project.activeItem.layer(shapeLayer.name).guideLayer = true;
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([0, 0]);
    }
    function inside(e, t) {
      var a = e[0];
      var r = e[1];
      var o = false;
      for (var s = 0, l = t.length - 1; s < t.length; l = s++) {
        var n = t[s][0];
        var i = t[s][1];
        var p = t[l][0];
        var d = t[l][1];
        var c = i > r != d > r && a < ((p - n) * (r - i)) / (d - i) + n;
        if (c) {
          o = !o;
        }
      }
      return o;
    }
    function create_all_available_vertices() {
      var e = GridX.text;
      var t = GridY.text;
      mask_vertices_boolean = new Array();
      all_available_vertices = [];
      step_W = Math.round(curComp.width / pass_GridX);
      step_H = Math.round(curComp.height / pass_GridY);
      var a = 0;
      for (; a < pass_GridY; a++) {
        mask_vertices_boolean[a] = new Array();
        var r = 0;
        for (; r < pass_GridX; r++) {
          all_available_vertices.push([
            r * step_W + step_W * 0.5,
            a * step_H + step_H * 0.5,
          ]);
          mask_vertices_boolean[a][r] = true;
        }
      }
    }
    function createGridGuideLayer() {
      isTrial = !O0OO.s();
      shapeLayer = curComp.layers.addShape();
      ruler = 1;
      shapeLayer.comment =
        "mazeFX Grid Guide Layer - [ GridX: " +
        GridX.text +
        " - GridY: " +
        GridY.text +
        " ]";
      for (var e = 1; e < app.project.activeItem.numLayers; e += 1) {
        shapeLayer.name = "mazeFX - Grid Guide " + ruler;
        if (app.project.activeItem.layer(e).name == shapeLayer.name) {
          ruler += 1;
          e = 1;
        }
      }
      if (labelColor + 1 == 17) {
        labelColor = 0;
      }
      labelColor += 1;
      shapeLayer.name = "mazeFX - Grid Guide " + ruler;
      shapeLayer.label = labelColor;
      step_W = Math.round(curComp.width / GridX.text);
      step_H = Math.round(curComp.height / GridY.text);
      visualize_grid(all_available_vertices, "Layer Guide Grid");
      app.project.activeItem
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "Grid Guide - Dots Size";
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Effect Parade")("Grid Guide - Dots Size")(
          "ADBE Slider Control-0001",
        )
        .setValue(
          step_W > step_H
            ? (step_H * GridY.text) / 100
            : (step_W * GridX.text) / 100,
        );
      app.project.activeItem.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "ADBE Vector Group",
      )("ADBE Vectors Group")("ADBE Vector Shape - Ellipse")(
        "ADBE Vector Ellipse Size",
      ).expression =
        'try { [effect("Grid Guide - Dots Size")("ADBE Slider Control-0001"),effect("Grid Guide - Dots Size")("ADBE Slider Control-0001")] } catch(e) {value}';
    }
    function newMaze(e, t, a) {
      var r = t * e;
      var o = new Array();
      var s = new Array();
      var l = 0;
      var n = Math.sqrt(curComp.width * curComp.height);
      var i = Math.sqrt(curComp.width * curComp.height);
      if (a) {
        var p = 0;
        for (; p < e; p++) {
          for (var d = 0; d < t; d += 1) {
            if (mask_vertices_boolean[d][p]) {
              switch (SolutionStartDropdown.selection.index) {
                case 2:
                case 9:
                  var c = 0 - (p * step_W + step_W * 0.5);
                  var u = 0 - (d * step_H + step_H * 0.5);
                  break;
                case 1:
                  var c = curComp.width * 0.5 - (p * step_W + step_W * 0.5);
                  var u = 0 - (d * step_H + step_H * 0.5);
                  break;
                case 10:
                  var c = 0 - (p * step_W + step_W * 0.5);
                  var u = curComp.height * 0.5 - (d * step_H + step_H * 0.5);
                  break;
                case 0:
                case 3:
                  var c = curComp.width - (p * step_W + step_W * 0.5);
                  var u = 0 - (d * step_H + step_H * 0.5);
                  break;
                case 5:
                case 8:
                  var c = curComp.width - (p * step_W + step_W * 0.5);
                  var u = curComp.height - (d * step_H + step_H * 0.5);
                  break;
                case 7:
                  var c = curComp.width * 0.5 - (p * step_W + step_W * 0.5);
                  var u = curComp.height - (d * step_H + step_H * 0.5);
                  break;
                case 4:
                  var c = curComp.width - (p * step_W + step_W * 0.5);
                  var u = curComp.height * 0.5 - (d * step_H + step_H * 0.5);
                  break;
                case 6:
                case 11:
                  var c = 0 - (p * step_W + step_W * 0.5);
                  var u = curComp.height - (d * step_H + step_H * 0.5);
                  break;
                case 12:
                  var c = curComp.width * 0.5 - (p * step_W + step_W * 0.5);
                  var u = curComp.height * 0.5 - (d * step_H + step_H * 0.5);
              }
              if (Math.sqrt(c * c + u * u) < n) {
                n = Math.sqrt(c * c + u * u);
                start_vertex = [
                  p * step_W + step_W * 0.5,
                  d * step_H + step_H * 0.5,
                ];
                start_cell = [d, p];
              }
              switch (SolutionEndDropdown.selection.index) {
                case 2:
                case 9:
                  var m = 0 - (p * step_W + step_W * 0.5);
                  var h = 0 - (d * step_H + step_H * 0.5);
                  break;
                case 1:
                  var m = curComp.width * 0.5 - (p * step_W + step_W * 0.5);
                  var h = 0 - (d * step_H + step_H * 0.5);
                  break;
                case 10:
                  var m = 0 - (p * step_W + step_W * 0.5);
                  var h = curComp.height * 0.5 - (d * step_H + step_H * 0.5);
                  break;
                case 0:
                case 3:
                  var m = curComp.width - (p * step_W + step_W * 0.5);
                  var h = 0 - (d * step_H + step_H * 0.5);
                  break;
                case 5:
                case 8:
                  var m = curComp.width - (p * step_W + step_W * 0.5);
                  var h = curComp.height - (d * step_H + step_H * 0.5);
                  break;
                case 7:
                  var m = curComp.width * 0.5 - (p * step_W + step_W * 0.5);
                  var h = curComp.height - (d * step_H + step_H * 0.5);
                  break;
                case 4:
                  var m = curComp.width - (p * step_W + step_W * 0.5);
                  var h = curComp.height * 0.5 - (d * step_H + step_H * 0.5);
                  break;
                case 6:
                case 11:
                  var m = 0 - (p * step_W + step_W * 0.5);
                  var h = curComp.height - (d * step_H + step_H * 0.5);
                  break;
                case 12:
                  var c = curComp.width * 0.5 - (p * step_W + step_W * 0.5);
                  var u = curComp.height * 0.5 - (d * step_H + step_H * 0.5);
              }
              if (Math.sqrt(m * m + h * h) < i) {
                i = Math.sqrt(m * m + h * h);
                end_vertex = [
                  p * step_W + step_W * 0.5,
                  d * step_H + step_H * 0.5,
                ];
                end_cell = [d, p];
              }
            }
          }
        }
        var j = [start_cell[1], start_cell[0]];
        p = 0;
        for (; p < e; p++) {
          o[p] = new Array();
          s[p] = new Array();
          for (var d = 0; d < t; d += 1) {
            o[p][d] = [0, 0, 0, 0];
            s[p][d] = true;
            if (mask_vertices_boolean[d][p] == false) {
              s[p][d] = false;
              o[p][d] = [2, 1, 1, 1];
              l++;
            }
          }
        }
      } else {
        switch (SolutionStartDropdown.selection.index) {
          case 10:
            var j = [0, Math.floor(t * 0.5)];
            start_cell = [Math.floor(t * 0.5), 0];
            break;
          case 4:
            var j = [e - 1, Math.floor(t * 0.5)];
            start_cell = [Math.floor(t * 0.5), e - 1];
            break;
          case 6:
          case 11:
            var j = [0, t - 1];
            start_cell = [t - 1, 0];
            break;
          case 8:
          case 5:
            var j = [e - 1, t - 1];
            start_cell = [t - 1, e - 1];
            break;
          case 7:
            var j = [Math.floor(e * 0.5), t - 1];
            start_cell = [t - 1, Math.floor(e * 0.5)];
            break;
          case 1:
            var j = [Math.floor(e * 0.5), 0];
            start_cell = [0, Math.floor(e * 0.5)];
            break;
          case 3:
          case 0:
            var j = [e - 1, 0];
            start_cell = [0, e - 1];
            break;
          case 9:
          case 2:
            var j = [0, 0];
            start_cell = [0, 0];
            break;
          case 12:
            var j = [Math.floor(e * 0.5), Math.floor(t * 0.5)];
            start_cell = [Math.floor(t * 0.5), Math.floor(e * 0.5)];
        }
        switch (SolutionEndDropdown.selection.index) {
          case 10:
            end_cell = [Math.floor(t * 0.5), 0];
            break;
          case 4:
            end_cell = [Math.floor(t * 0.5), e - 1];
            break;
          case 6:
          case 11:
            end_cell = [t - 1, 0];
            break;
          case 8:
          case 5:
            end_cell = [t - 1, e - 1];
            break;
          case 7:
            end_cell = [t - 1, Math.floor(e * 0.5)];
            break;
          case 1:
            end_cell = [0, Math.floor(e * 0.5)];
            break;
          case 3:
          case 0:
            end_cell = [0, e - 1];
            break;
          case 9:
          case 2:
            end_cell = [0, 0];
            break;
          case 12:
            end_cell = [Math.floor(t * 0.5), Math.floor(e * 0.5)];
        }
        var p = 0;
        for (; p < e; p++) {
          o[p] = new Array();
          s[p] = new Array();
          var d = 0;
          for (; d < t; d++) {
            o[p][d] = [0, 0, 0, 0];
            s[p][d] = true;
          }
        }
      }
      var D = [j];
      full_path = [j];
      s[j[0]][j[1]] = false;
      var A = 1 + l;
      while (A < r) {
        var f = [
          [j[0] - 1, j[1], 0, 2],
          [j[0], j[1] + 1, 1, 3],
          [j[0] + 1, j[1], 2, 0],
          [j[0], j[1] - 1, 3, 1],
        ];
        var E = new Array();
        var F = 0;
        for (; F < 4; F++) {
          if (
            f[F][0] > -1 &&
            f[F][0] < e &&
            f[F][1] > -1 &&
            f[F][1] < t &&
            s[f[F][0]][f[F][1]]
          ) {
            E.push(f[F]);
          }
        }
        if (E.length) {
          full_path.push(j);
          next = E[Math.floor(Math.random() * E.length)];
          o[j[0]][j[1]][next[2]] = 1;
          o[next[0]][next[1]][next[3]] = 1;
          s[next[0]][next[1]] = false;
          A++;
          j = [next[0], next[1]];
          D.push(j);
          if (j[0] == end_cell[1] && j[1] == end_cell[0]) {
            full_path.push(j);
            full_path[0] = [start_cell[1], start_cell[0]];
            if (KeepStartEndClosedCheckbox.value == false) {
              switch (SolutionStartDropdown.selection.index) {
                case 0:
                case 1:
                case 2:
                  full_path[0] = [start_cell[1], start_cell[0] - 1];
                  break;
                case 3:
                case 4:
                case 5:
                  full_path[0] = [start_cell[1] + 1, start_cell[0]];
                  break;
                case 6:
                case 7:
                case 8:
                  full_path[0] = [start_cell[1], start_cell[0] + 1];
                  break;
                case 9:
                case 10:
                case 11:
                  full_path[0] = [start_cell[1] - 1, start_cell[0]];
                  break;
              }
              switch (SolutionEndDropdown.selection.index) {
                case 0:
                case 1:
                case 2:
                  full_path.push([end_cell[1], end_cell[0] - 1]);
                  break;
                case 3:
                case 4:
                case 5:
                  full_path.push([end_cell[1] + 1, end_cell[0]]);
                  break;
                case 6:
                case 7:
                case 8:
                  full_path.push([end_cell[1], end_cell[0] + 1]);
                  break;
                case 9:
                case 10:
                case 11:
                  full_path.push([end_cell[1] - 1, end_cell[0]]);
                  break;
              }
            }
            solution_path = full_path.slice(0);
          }
        } else {
          j = D.pop();
          j = full_path.pop();
        }
        writeLn("Calculating maze [" + A + " of " + r + "]");
        progressBar_text.text = "Calculating maze [" + A + " of " + r + "]";
        PB.value = (A / r) * 100;
        PresetsPal.update();
      }
      return o;
    }
    function createMaze(e, t) {
      create_TempMessageComp();
      if (typeof e !== "undefined") {
        grid_x = e;
        grid_y = t;
        var a = true;
      } else {
        grid_x = GridX.text;
        grid_y = GridY.text;
        var a = false;
      }
      var r = curComp.width / grid_x;
      var o = curComp.height / grid_y;
      var s = 0;
      try {
        var l = newMaze(grid_x, grid_y, a);
      } catch (e) {
        alert(e);
        alert(
          "Unfortunately mazeFX can not complete the maze creation. This is probably caused because you are using a mask(s) that split the maze grid in two or more separate parts. mazeFX can only work with a continuous region. Please re-adjust your mask(s) and try again. For more info, please read the included manual.",
        );
        writeLn("Maze creation was NOT completed");
        PB.value = 0;
        PresetsPal.close();
        PresetsPal = null;
        tempComp.remove();
        curComp.openInViewer();
        app.activeViewer.setActive();
        if (guideLayer.enabled == false) {
          guideLayer.enabled = true;
        }
        return;
      }
      var n = 0;
      for (; n < solution_path.length; n++) {
        solution_path[n][0] *= r;
        solution_path[n][1] *= o;
      }
      shape_pointer = new Shape();
      shape_pointer.vertices = solution_path;
      shape_pointer.closed = false;
      if (curComp) {
        shapeLayer = curComp.layers.addShape();
        ruler = 1;
        shapeLayer.comment = "mazeFX v" + af_settings.scriptVersion;
        for (var i = 1; i < curComp.numLayers; i += 1) {
          shapeLayer.name = "mazeFX " + ruler;
          if (curComp.layer(i).name == shapeLayer.name) {
            ruler += 1;
            i = 1;
          }
        }
        if (labelColor + 1 == 17) {
          labelColor = 0;
        }
        labelColor += 1;
        shapeLayer.name = "mazeFX " + ruler;
        shapeLayer.label = labelColor;
        CreatePseudoFX(curComp.layer(shapeLayer.name), 1);
        CreatePseudoFX(curComp.layer(shapeLayer.name), 2);
        if (
          CreateEmptyWallsCheckbox.value &&
          CreateEmptyWallsCheckbox.enabled
        ) {
          CreatePseudoFX(curComp.layer(shapeLayer.name), 3);
        }
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
          .setValue([
            curComp.layer(shapeLayer.name)("ADBE Transform Group")(
              "ADBE Position",
            ).value[0] +
              r * 0.5,
            curComp.layer(shapeLayer.name)("ADBE Transform Group")(
              "ADBE Position",
            ).value[1] +
              o * 0.5,
          ]);
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "solution";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
          .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
          .setValue(shape_pointer);
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
          .addProperty("ADBE Vector Graphic - Stroke").name = "Stroke 1 - Flat";
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
          "ADBE Vectors Group",
        )("Stroke 1 - Flat")("ADBE Vector Stroke Width").expression =
          'try { (effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0007") == 1?effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0004"):0) } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Line Cap")
          .setValue(1);
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
          "ADBE Vectors Group",
        )("Stroke 1 - Flat")("ADBE Vector Stroke Color").expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0008") } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
          "ADBE Vectors Group",
        )("Stroke 1 - Flat")("ADBE Vector Stroke Opacity").expression =
          'try { if (effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0007") == 1) { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0009") } else {0} } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Dashes")
          .addProperty("ADBE Vector Stroke Dash 1").expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0012") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Dashes")
          .addProperty("ADBE Vector Stroke Offset").expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0013") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Dashes")
          .addProperty("ADBE Vector Stroke Gap 1").expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0011") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")
          .duplicate().name = "Stroke 2 - Round";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 2 - Round")("ADBE Vector Stroke Line Cap")
          .setValue(2);
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
          "ADBE Vectors Group",
        )("Stroke 2 - Round")("ADBE Vector Stroke Width").expression =
          'try { (effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0007") == 2?effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0004"):0) } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
          "ADBE Vectors Group",
        )("Stroke 2 - Round")("ADBE Vector Stroke Opacity").expression =
          'try { if (effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0007") == 2) {effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0009") } else {0} } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - RC")(
          "ADBE Vector RoundCorner Radius",
        ).expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0005") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Roughen")(
          "ADBE Vector Roughen Size",
        ).expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0006") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("ADBE Vector Filter - Roughen")("ADBE Vector Roughen Detail")
          .setValue(0);
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("ADBE Vector Filter - Roughen")("ADBE Vector Roughen Points")
          .setValue(2);
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("ADBE Vector Filter - Roughen")("ADBE Vector Temporal Freq")
          .setValue(0);
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Trim")(
          "ADBE Vector Trim Start",
        ).expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0002") } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
          "ADBE Vectors Group",
        )("ADBE Vector Filter - Trim")("ADBE Vector Trim End").expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0001") } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
          "ADBE Vectors Group",
        )("ADBE Vector Filter - Trim")("ADBE Vector Trim Offset").expression =
          'try { effect("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0003") } catch(e) {value}';
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")(
            "ADBE Vector Group",
          )("ADBE Vector Transform Group")("ADBE Vector Position")
          .setValue([-curComp.width * 0.5, -curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "maze walls";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Group").name = "wall paths";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Merge");
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty(
            "ADBE Vector Filter - Offset",
          )("ADBE Vector Offset Amount")
          .setValue(0.5);
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - RC")(
          "ADBE Vector RoundCorner Radius",
        ).expression =
          'try { effect("Pseudo/mazeFX_walls")("Pseudo/mazeFX_walls-0002") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Graphic - Stroke")(
          "ADBE Vector Stroke Color",
        ).expression =
          'try { effect("Pseudo/mazeFX_walls")("Pseudo/mazeFX_walls-0003") } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("maze walls")(
          "ADBE Vectors Group",
        )("ADBE Vector Graphic - Stroke")(
          "ADBE Vector Stroke Width",
        ).expression =
          'try { effect("Pseudo/mazeFX_walls")("Pseudo/mazeFX_walls-0001") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Graphic - Fill")(
          "ADBE Vector Fill Color",
        ).expression =
          'try { effect("Pseudo/mazeFX_walls")("Pseudo/mazeFX_walls-0003") } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("maze walls")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Group Opacity").expression =
          'try { effect("Pseudo/mazeFX_walls")("Pseudo/mazeFX_walls-0004") } catch(e) {value}';
        if (
          CreateEmptyWallsCheckbox.value &&
          CreateEmptyWallsCheckbox.enabled
        ) {
          curComp
            .layer(
              shapeLayer.name,
            )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
            .addProperty("ADBE Vector Group").name = "empty walls";
          curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
            "maze walls",
          )("ADBE Vectors Group")("empty walls")("ADBE Vector Transform Group")(
            "ADBE Vector Group Opacity",
          ).expression =
            'try { effect("Pseudo/mazeFX_empty_walls")("Pseudo/mazeFX_empty_walls-0002") } catch(e) {value}';
        }
        if (parseFloat(app.version) >= 15 && CreateNullCheckbox.value) {
          var p = curComp.layers.addNull();
          p.label = labelColor;
          p.name = shapeLayer.name + " - Solution Path Position Null";
          p("ADBE Transform Group")("ADBE Anchor Point").setValue([50, 50]);
          p("ADBE Transform Group")("ADBE Position").expression =
            "try { [" +
            r * 0.5 +
            ' + thisComp.layer("' +
            shapeLayer.name +
            '")("ADBE Root Vectors Group")("ADBE Vector Group")("ADBE Vectors Group")("ADBE Vector Shape - Group")("ADBE Vector Shape").pointOnPath(percentage = thisComp.layer("' +
            shapeLayer.name +
            '")("ADBE Effect Parade")("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0001")/100, t = time)[0], ' +
            o * 0.5 +
            ' + thisComp.layer("' +
            shapeLayer.name +
            '")("ADBE Root Vectors Group")("ADBE Vector Group")("ADBE Vectors Group")("ADBE Vector Shape - Group")("ADBE Vector Shape").pointOnPath(percentage = thisComp.layer("' +
            shapeLayer.name +
            '")("ADBE Effect Parade")("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0001")/100, t = time)[1]] } catch(e) {value}';
        }
        var d = 0;
        for (; d < l.length; d++) {
          for (var n = 0; n < l[d].length; n += 1) {
            progressBar_text.text =
              "Drawing maze wall [" +
              d * l[0].length +
              n +
              " of " +
              l.length * l[0].length +
              "]";
            writeLn(progressBar_text.text);
            PB.value = ((d * l[0].length + n) / (l.length * l[0].length)) * 100;
            PresetsPal.update();
            line_shape = new Shape();
            line_shape.closed = false;
            if (typeof e !== "undefined") {
              if (CreateEmptyWallsCheckbox.value) {
                if (l[d][n].toString() == "2,1,1,1") {
                  curComp
                    .layer(
                      shapeLayer.name,
                    )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("empty walls")("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Rect").name =
                    "empty wall " + s;
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "maze walls",
                    )("ADBE Vectors Group")("empty walls")(
                      "ADBE Vectors Group",
                    )("empty wall " + s)("ADBE Vector Rect Size")
                    .setValue([r, o]);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "maze walls",
                    )("ADBE Vectors Group")("empty walls")(
                      "ADBE Vectors Group",
                    )("empty wall " + s)("ADBE Vector Rect Position")
                    .setValue([
                      -curComp.width * 0.5 + d * r,
                      -curComp.height * 0.5 + n * o,
                    ]);
                  s++;
                }
              }
            }
            if (l[d][n][0] == 0) {
              line_shape.vertices = [
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var c = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var u = s;
              }
              s++;
            }
            if (l[d][n][1] == 0) {
              line_shape.vertices = [
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var m = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var h = s;
              }
              s++;
            }
            if (l[d][n][2] == 0) {
              line_shape.vertices = [
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var j = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var D = s;
              }
              s++;
            }
            if (l[d][n][3] == 0) {
              line_shape.vertices = [
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var A = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var f = s;
              }
              s++;
            }
          }
        }
        if (KeepStartEndClosedCheckbox.value == false) {
          if (
            SolutionStartDropdown.selection == 0 ||
            SolutionStartDropdown.selection == 1 ||
            SolutionStartDropdown.selection == 2
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + A + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 0 ||
            SolutionEndDropdown.selection == 1 ||
            SolutionEndDropdown.selection == 2
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + f + "",
            ).enabled = false;
          }
          if (
            SolutionStartDropdown.selection == 3 ||
            SolutionStartDropdown.selection == 4 ||
            SolutionStartDropdown.selection == 5
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + j + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 3 ||
            SolutionEndDropdown.selection == 4 ||
            SolutionEndDropdown.selection == 5
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + D + "",
            ).enabled = false;
          }
          if (
            SolutionStartDropdown.selection == 6 ||
            SolutionStartDropdown.selection == 7 ||
            SolutionStartDropdown.selection == 8
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + m + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 6 ||
            SolutionEndDropdown.selection == 7 ||
            SolutionEndDropdown.selection == 8
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + h + "",
            ).enabled = false;
          }
          if (
            SolutionStartDropdown.selection == 9 ||
            SolutionStartDropdown.selection == 10 ||
            SolutionStartDropdown.selection == 11
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + c + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 9 ||
            SolutionEndDropdown.selection == 10 ||
            SolutionEndDropdown.selection == 11
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + u + "",
            ).enabled = false;
          }
        }
      }
      if (CreateEmptyWallsCheckbox.value && CreateEmptyWallsCheckbox.enabled) {
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("empty walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Graphic - Fill")(
          "ADBE Vector Fill Color",
        ).expression =
          'try { effect("Pseudo/mazeFX_empty_walls")("Pseudo/mazeFX_empty_walls-0001") } catch(e) {value}';
      }
      writeLn("Maze creation completed");
      PB.value = 0;
      PresetsPal.close();
      PresetsPal = null;
      tempComp.remove();
      curComp.openInViewer();
      if (CreateNullCheckbox.value) {
        curComp.layer(p.name).selected = false;
      }
      app.executeCommand(2771);
      app.executeCommand(2387);
      app.executeCommand(2004);
      curComp.layer(shapeLayer.name).selected = true;
      app.activeViewer.setActive();
    }
    function createMazeSeparated(e, t) {
      create_TempMessageComp();
      if (typeof e !== "undefined") {
        grid_x = e;
        grid_y = t;
        var a = true;
      } else {
        grid_x = GridX.text;
        grid_y = GridY.text;
        var a = false;
      }
      var r = curComp.width / grid_x;
      var o = curComp.height / grid_y;
      var s = 0;
      try {
        var l = newMaze(grid_x, grid_y, a);
      } catch (e) {
        alert(e);
        alert(
          "Unfortunately mazeFX can not complete the maze creation. This is probably caused because you are using a mask(s) that split the maze grid in two or more separate parts. mazeFX can only work with a continuous region. Please re-adjust your mask(s) and try again. For more info, please read the included manual.",
        );
        writeLn("Maze creation was NOT completed");
        PB.value = 0;
        PresetsPal.close();
        PresetsPal = null;
        tempComp.remove();
        curComp.openInViewer();
        app.activeViewer.setActive();
        if (guideLayer.enabled == false) {
          guideLayer.enabled = true;
        }
        return;
      }
      var n = 0;
      for (; n < solution_path.length; n++) {
        solution_path[n][0] *= r;
        solution_path[n][1] *= o;
      }
      if (curComp) {
        shapeLayer = curComp.layers.addShape();
        ruler = 1;
        shapeLayer.comment = "mazeFX v" + af_settings.scriptVersion;
        for (var i = 1; i < curComp.numLayers; i += 1) {
          shapeLayer.name = "mazeFX " + ruler + " - Walls";
          if (curComp.layer(i).name == shapeLayer.name) {
            ruler += 1;
            i = 1;
          }
        }
        if (labelColor + 1 == 17) {
          labelColor = 0;
        }
        labelColor += 1;
        shapeLayer.name = "mazeFX " + ruler + " - Walls";
        shapeLayer.label = labelColor;
        CreatePseudoFX(curComp.layer(shapeLayer.name), 2);
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
          .setValue([
            curComp.layer(shapeLayer.name)("ADBE Transform Group")(
              "ADBE Position",
            ).value[0] +
              r * 0.5,
            curComp.layer(shapeLayer.name)("ADBE Transform Group")(
              "ADBE Position",
            ).value[1] +
              o * 0.5,
          ]);
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "maze walls";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Group").name = "wall paths";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Merge");
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty(
            "ADBE Vector Filter - Offset",
          )("ADBE Vector Offset Amount")
          .setValue(0.5);
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - RC")(
          "ADBE Vector RoundCorner Radius",
        ).expression =
          'try { effect("' +
          PseudoName +
          '")("' +
          PseudoName +
          '-0002") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Graphic - Stroke")(
          "ADBE Vector Stroke Color",
        ).expression =
          'try { effect("' +
          PseudoName +
          '")("' +
          PseudoName +
          '-0003") } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("maze walls")(
          "ADBE Vectors Group",
        )("ADBE Vector Graphic - Stroke")(
          "ADBE Vector Stroke Width",
        ).expression =
          'try {effect("' +
          PseudoName +
          '")("' +
          PseudoName +
          '-0001") } catch(e) {value}';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Graphic - Fill")(
          "ADBE Vector Fill Color",
        ).expression =
          'try { effect("' +
          PseudoName +
          '")("' +
          PseudoName +
          '-0003") } catch(e) {value}';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("maze walls")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Group Opacity").expression =
          'try { effect("' +
          PseudoName +
          '")("' +
          PseudoName +
          '-0004") } catch(e) {value}';
        if (
          CreateEmptyWallsCheckbox.value &&
          CreateEmptyWallsCheckbox.enabled
        ) {
          var p = curComp.layers.addShape();
          p.comment = "mazeFX v" + af_settings.scriptVersion;
          p.name = "mazeFX " + ruler + " - Empty Walls";
          if (labelColor + 1 == 17) {
            labelColor = 0;
          }
          labelColor += 1;
          p.label = labelColor;
          CreatePseudoFX(curComp.layer(p.name), 3);
          curComp
            .layer(p.name)("ADBE Transform Group")("ADBE Position")
            .setValue([
              curComp.layer(p.name)("ADBE Transform Group")("ADBE Position")
                .value[0] +
                r * 0.5,
              curComp.layer(p.name)("ADBE Transform Group")("ADBE Position")
                .value[1] +
                o * 0.5,
            ]);
          curComp.layer(p.name).moveAfter(shapeLayer);
          curComp
            .layer(p.name)("ADBE Root Vectors Group")
            .addProperty("ADBE Vector Group").name = "empty walls";
          curComp.layer(p.name)("ADBE Root Vectors Group")("empty walls")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Group Opacity").expression =
            'try { effect("' +
            PseudoName +
            '")("' +
            PseudoName +
            '-0002") } catch(e) {value}';
        }
        var d = 0;
        for (; d < l.length; d++) {
          for (var n = 0; n < l[d].length; n += 1) {
            progressBar_text.text =
              "Drawing maze wall [" +
              d * l[0].length +
              n +
              " of " +
              l.length * l[0].length +
              "]";
            writeLn(progressBar_text.text);
            PB.value = ((d * l[0].length + n) / (l.length * l[0].length)) * 100;
            PresetsPal.update();
            line_shape = new Shape();
            line_shape.closed = false;
            if (typeof e !== "undefined") {
              if (CreateEmptyWallsCheckbox.value) {
                if (l[d][n].toString() == "2,1,1,1") {
                  curComp
                    .layer(
                      p.name,
                    )("ADBE Root Vectors Group")("empty walls")("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Rect").name =
                    "empty wall " + s;
                  curComp
                    .layer(p.name)("ADBE Root Vectors Group")("empty walls")(
                      "ADBE Vectors Group",
                    )("empty wall " + s)("ADBE Vector Rect Size")
                    .setValue([r, o]);
                  curComp
                    .layer(p.name)("ADBE Root Vectors Group")("empty walls")(
                      "ADBE Vectors Group",
                    )("empty wall " + s)("ADBE Vector Rect Position")
                    .setValue([
                      -curComp.width * 0.5 + d * r,
                      -curComp.height * 0.5 + n * o,
                    ]);
                  s++;
                }
              }
            }
            if (l[d][n][0] == 0) {
              line_shape.vertices = [
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var c = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var u = s;
              }
              s++;
            }
            if (l[d][n][1] == 0) {
              line_shape.vertices = [
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var m = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var h = s;
              }
              s++;
            }
            if (l[d][n][2] == 0) {
              line_shape.vertices = [
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  o + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var j = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var D = s;
              }
              s++;
            }
            if (l[d][n][3] == 0) {
              line_shape.vertices = [
                [
                  0 + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
                [
                  r + (-curComp.width * 0.5 + d * r - r * 0.5),
                  0 + (-curComp.height * 0.5 + n * o - o * 0.5),
                ],
              ];
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("maze walls")("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group").name =
                "wall path " + s;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "maze walls",
                )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
                  "wall path " + s,
                )("ADBE Vector Shape")
                .setValue(line_shape);
              if (d == start_cell[1] && n == start_cell[0]) {
                var A = s;
              }
              if (d == end_cell[1] && n == end_cell[0]) {
                var f = s;
              }
              s++;
            }
          }
        }
        if (KeepStartEndClosedCheckbox.value == false) {
          if (
            SolutionStartDropdown.selection == 0 ||
            SolutionStartDropdown.selection == 1 ||
            SolutionStartDropdown.selection == 2
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + A + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 0 ||
            SolutionEndDropdown.selection == 1 ||
            SolutionEndDropdown.selection == 2
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + f + "",
            ).enabled = false;
          }
          if (
            SolutionStartDropdown.selection == 3 ||
            SolutionStartDropdown.selection == 4 ||
            SolutionStartDropdown.selection == 5
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + j + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 3 ||
            SolutionEndDropdown.selection == 4 ||
            SolutionEndDropdown.selection == 5
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + D + "",
            ).enabled = false;
          }
          if (
            SolutionStartDropdown.selection == 6 ||
            SolutionStartDropdown.selection == 7 ||
            SolutionStartDropdown.selection == 8
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + m + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 6 ||
            SolutionEndDropdown.selection == 7 ||
            SolutionEndDropdown.selection == 8
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + h + "",
            ).enabled = false;
          }
          if (
            SolutionStartDropdown.selection == 9 ||
            SolutionStartDropdown.selection == 10 ||
            SolutionStartDropdown.selection == 11
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + c + "",
            ).enabled = false;
          }
          if (
            SolutionEndDropdown.selection == 9 ||
            SolutionEndDropdown.selection == 10 ||
            SolutionEndDropdown.selection == 11
          ) {
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "maze walls",
            )("ADBE Vectors Group")("wall paths")("ADBE Vectors Group")(
              "wall path " + u + "",
            ).enabled = false;
          }
        }
      }
      if (CreateEmptyWallsCheckbox.value && CreateEmptyWallsCheckbox.enabled) {
        curComp
          .layer(
            p.name,
          )("ADBE Root Vectors Group")("empty walls")("ADBE Vectors Group")
          .addProperty("ADBE Vector Graphic - Fill")(
          "ADBE Vector Fill Color",
        ).expression =
          'try { effect("' +
          PseudoName +
          '")("' +
          PseudoName +
          '-0001") } catch(e) {value}';
      }
      shape_pointer = new Shape();
      shape_pointer.vertices = solution_path;
      shape_pointer.closed = false;
      shapeLayer = curComp.layers.addShape();
      shapeLayer.comment = "mazeFX v" + af_settings.scriptVersion;
      shapeLayer.name = "mazeFX " + ruler + " - Solution Path";
      if (labelColor + 1 == 17) {
        labelColor = 0;
      }
      labelColor += 1;
      shapeLayer.label = labelColor;
      CreatePseudoFX(curComp.layer(shapeLayer.name), 1);
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([
          curComp.layer(shapeLayer.name)("ADBE Transform Group")(
            "ADBE Position",
          ).value[0] +
            r * 0.5,
          curComp.layer(shapeLayer.name)("ADBE Transform Group")(
            "ADBE Position",
          ).value[1] +
            o * 0.5,
        ]);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "solution";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
        .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
        .setValue(shape_pointer);
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke").name = "Stroke 1 - Flat";
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
        "ADBE Vectors Group",
      )("Stroke 1 - Flat")("ADBE Vector Stroke Width").expression =
        'try { (effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0007") == 1?effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0004"):0) } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Line Cap")
        .setValue(1);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
        "ADBE Vectors Group",
      )("Stroke 1 - Flat")("ADBE Vector Stroke Color").expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0008") } catch(e) {value}';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
        "ADBE Vectors Group",
      )("Stroke 1 - Flat")("ADBE Vector Stroke Opacity").expression =
        'try { if (effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0007") == 1) {effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0009") } else {0} } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Dashes")
        .addProperty("ADBE Vector Stroke Dash 1").expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0012") } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Dashes")
        .addProperty("ADBE Vector Stroke Offset").expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0013") } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")("ADBE Vector Stroke Dashes")
        .addProperty("ADBE Vector Stroke Gap 1").expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0011") } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 1 - Flat")
        .duplicate().name = "Stroke 2 - Round";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("Stroke 2 - Round")("ADBE Vector Stroke Line Cap")
        .setValue(2);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
        "ADBE Vectors Group",
      )("Stroke 2 - Round")("ADBE Vector Stroke Width").expression =
        'try { (effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0007") == 2?effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0004"):0) } catch(e) {value}';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
        "ADBE Vectors Group",
      )("Stroke 2 - Round")("ADBE Vector Stroke Opacity").expression =
        'try { if (effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0007") == 2) {effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0009") } else {0} } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - RC")(
        "ADBE Vector RoundCorner Radius",
      ).expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0005") } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Roughen")(
        "ADBE Vector Roughen Size",
      ).expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0006") } catch(e) {value}';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("ADBE Vector Filter - Roughen")("ADBE Vector Roughen Detail")
        .setValue(0);
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("ADBE Vector Filter - Roughen")("ADBE Vector Roughen Points")
        .setValue(2);
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")("ADBE Vector Filter - Roughen")("ADBE Vector Temporal Freq")
        .setValue(0);
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("solution")("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Trim")(
        "ADBE Vector Trim Start",
      ).expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0002") } catch(e) {value}';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
        "ADBE Vectors Group",
      )("ADBE Vector Filter - Trim")("ADBE Vector Trim End").expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0001") } catch(e) {value}';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("solution")(
        "ADBE Vectors Group",
      )("ADBE Vector Filter - Trim")("ADBE Vector Trim Offset").expression =
        'try { effect("' +
        PseudoName +
        '")("' +
        PseudoName +
        '-0003") } catch(e) {value}';
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("ADBE Vector Group")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Position")
        .setValue([-curComp.width * 0.5, -curComp.height * 0.5]);
      if (parseFloat(app.version) >= 15 && CreateNullCheckbox.value) {
        var E = curComp.layers.addNull();
        E.label = labelColor;
        E.name = shapeLayer.name + " Position Null";
        E("ADBE Transform Group")("ADBE Anchor Point").setValue([50, 50]);
        E("ADBE Transform Group")("ADBE Position").expression =
          "try { [" +
          r * 0.5 +
          ' + thisComp.layer("' +
          shapeLayer.name +
          '")("ADBE Root Vectors Group")("ADBE Vector Group")("ADBE Vectors Group")("ADBE Vector Shape - Group")("ADBE Vector Shape").pointOnPath(percentage = thisComp.layer("' +
          shapeLayer.name +
          '")("ADBE Effect Parade")("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0001")/100, t = time)[0], ' +
          o * 0.5 +
          ' + thisComp.layer("' +
          shapeLayer.name +
          '")("ADBE Root Vectors Group")("ADBE Vector Group")("ADBE Vectors Group")("ADBE Vector Shape - Group")("ADBE Vector Shape").pointOnPath(percentage = thisComp.layer("' +
          shapeLayer.name +
          '")("ADBE Effect Parade")("Pseudo/mazeFX_solution_path")("Pseudo/mazeFX_solution_path-0001")/100, t = time)[1]] } catch(e) {value}';
      }
      writeLn("Maze creation completed");
      PB.value = 0;
      PresetsPal.close();
      PresetsPal = null;
      tempComp.remove();
      curComp.openInViewer();
      if (CreateNullCheckbox.value) {
        curComp.layer(E.name).selected = false;
      }
      app.executeCommand(2771);
      app.executeCommand(2387);
      app.executeCommand(2004);
      curComp.layer(shapeLayer.name).selected = true;
      app.activeViewer.setActive();
    }
    var isTrial = O0OO.t();
    var mainPalette =
      thisObj instanceof Panel
        ? thisObj
        : new Window(
            "palette",
            isTrial ? "mazeFX - Trial" : "mazeFX",
            undefined,
            { resizeable: true },
          );
    if (mainPalette == null) {
      return;
    }
    mainPalette.margins = 9;
    var myWin = mainPalette.add("group");
    myWin.orientation = "column";
    var full_path = new Array();
    var solution_path = new Array();
    var counter = 0;
    mask_vertices_boolean = [];
    var start_vertex = [0, 0];
    var end_vertex = [0, 0];
    var start_cell = [0, 0];
    var end_cell = [0, 0];
    var grid_x = 0;
    var grid_y = 0;
    var PB_max = 0;
    var ruler = 0;
    var shapeLayer = "";
    var labelColor = 0;
    var curComp = 0;
    imagelogo = __BLOB__BLOB_000673__;
    lock = __BLOB__BLOB_000674__;
    fill_maze = __BLOB__BLOB_000675__;
    using_masks_maze = __BLOB__BLOB_000676__;
    logo = myWin.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(imagelogo, "mazeFX_logo", "mazeFX")
        : imagelogo,
      { style: "toolbutton" },
    );
    logo.alignment = ["left", "fill"];
    logo.onClick = O0OO.helpUI;
    var er_panels = myWin.add("tabbedpanel");
    er_panels.preferredSize = [2, ""];
    er_panels.minimumSize = [240, 0];
    var rulerType_tab = er_panels.add("tab", undefined, "grid");
    rulerType_tab.spacing = 0;
    rulerType_tab.margins = [0, 10, 0, 0];
    var MazeTypeGroup = rulerType_tab.add("group", undefined, "");
    MazeTypeGroup.orientation = "row";
    MazeTypeGroup.spacing = 0;
    MazeTypeGroup.margins = [0, 0, 0, 0];
    var FillMazeIconGroup = MazeTypeGroup.add("group", undefined, "Line Icon");
    FillMazeIconGroup.orientation = "column";
    FillMazeIconGroup.alignment = ["fill", "fill"];
    FillMazeIconGroup.spacing = 3;
    FillMazeIconGroup.margins = [10, 0, 0, 0];
    var FillMazeLabel = FillMazeIconGroup.add("StaticText", undefined, "Fill");
    FillMazeLabel.justify = "center";
    FillMazeLabel.size = [90, 16];
    var FillMaze = FillMazeIconGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(fill_maze, "mazeFX_fill_icon", "mazeFX")
        : fill_maze,
      { style: "toolbutton", toggle: true },
    );
    FillMaze.value = true;
    FillMaze.helpTip = "Creates a maze that fills the entire composition";
    FillMaze.size = [85, 85];
    var MaskMazeIconGroup = MazeTypeGroup.add("group", undefined, "Mask Icon");
    MaskMazeIconGroup.orientation = "column";
    MaskMazeIconGroup.alignment = ["fill", "fill"];
    MaskMazeIconGroup.spacing = 3;
    MaskMazeIconGroup.margins = [0, 0, 0, 0];
    var MaskMazeLabel = MaskMazeIconGroup.add(
      "StaticText",
      undefined,
      "Using Masks",
    );
    MaskMazeLabel.justify = "center";
    MaskMazeLabel.size = [90, 16];
    var MaskMaze = MaskMazeIconGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(using_masks_maze, "mazeFX_masks_icon", "mazeFX")
        : using_masks_maze,
      { style: "toolbutton", toggle: true },
    );
    MaskMaze.value = false;
    MaskMaze.helpTip =
      "Creates a maze by using a mask to include/exclude specific areas of the composition";
    MaskMaze.size = [85, 85];
    var DimensionsGroup = rulerType_tab.add(
      "group",
      undefined,
      "LockDimensions",
    );
    DimensionsGroup.margins = [0, 0, 0, 5];
    DimensionsGroup.spacing = 0;
    DimensionsGroup.alignment = ["right", "fill"];
    DimensionsGroup.orientation = "row";
    var LockDimensionsGroup = DimensionsGroup.add(
      "group",
      undefined,
      "LockDimensions",
    );
    LockDimensionsGroup.margins = [0, 15, 0, 0];
    LockDimensionsGroup.spacing = 0;
    LockDimensionsGroup.alignment = ["left", "fill"];
    var LockDimensionsButton = LockDimensionsGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(lock, "mazeFX_lock_icon", "mazeFX")
        : lock,
      { style: "toolbutton", toggle: true },
    );
    LockDimensionsButton.value = false;
    LockDimensionsButton.size = [24, 52];
    LockDimensionsButton.helpTip = "Locks X and Y grid dimensions";
    var XYGroup = DimensionsGroup.add("group", undefined, "LockDimensions");
    XYGroup.margins = [0, 0, 0, 0];
    XYGroup.spacing = 0;
    XYGroup.alignment = ["right", "fill"];
    XYGroup.orientation = "column";
    var groupGridX = XYGroup.add("group", undefined, "GroupGridX");
    groupGridX.orientation = "row";
    groupGridX.margins = [0, 15, 0, 0];
    groupGridX.alignment = ["right", "fill"];
    groupGridX.alignChildren = "right";
    var GridXLabel = groupGridX.add("StaticText", undefined, "Grid X:");
    GridXLabel.size = [40, 23];
    GridXLabel.justify = "right";
    var GridX = groupGridX.add(
      'EditText {text:8, justify: "center"}',
      undefined,
      8,
    );
    GridX.size = [36, 23];
    GridX.helpTip =
      "Set the number of grid points for the X dimension (horizontal)";
    GridX.addEventListener("keydown", function (e) {
      arrowsPressed(GridX, 2, 100, "GridX");
    });
    var GridXSlider = groupGridX.add("Slider", undefined, 8, 2, 50);
    GridXSlider.helpTip = "Set the X grid dimension";
    GridXSlider.size = [120, 23];
    var groupGridY = XYGroup.add("group", undefined, "GroupGridY");
    groupGridY.orientation = "row";
    groupGridY.margins = [0, 0, 0, 0];
    groupGridY.alignment = ["right", "fill"];
    groupGridY.alignChildren = "right";
    var GridYLabel = groupGridY.add("StaticText", undefined, "Grid Y:");
    GridYLabel.size = [40, 23];
    GridYLabel.justify = "right";
    var GridY = groupGridY.add(
      'EditText {text:8, justify: "center"}',
      undefined,
      8,
    );
    GridY.size = [36, 23];
    GridY.helpTip =
      "Set the number of grid points for the Y dimension (vertical)";
    GridY.addEventListener("keydown", function (e) {
      arrowsPressed(GridY, 2, 100, "GridY");
    });
    var GridYSlider = groupGridY.add("Slider", undefined, 8, 2, 50);
    GridYSlider.helpTip = "Set the Y grid dimension";
    GridYSlider.size = [120, 23];
    var settings_tab = er_panels.add("tab", undefined, "settings");
    settings_tab.margins = [10, 20, 0, 0];
    var SettingsGroup = settings_tab.add("group", undefined, "Settings Group");
    SettingsGroup.orientation = "column";
    SettingsGroup.alignment = ["fill", "fill"];
    SettingsGroup.margins = [0, -5, 0, 0];
    SettingsGroup.spacing = 3;
    var KeepStartEndClosedCheckbox = SettingsGroup.add(
      "checkbox",
      undefined,
      " Keep start/end walls closed?",
    );
    KeepStartEndClosedCheckbox.value = false;
    KeepStartEndClosedCheckbox.size = [210, 18];
    KeepStartEndClosedCheckbox.helpTip = "Keep start/end walls closed?";
    var SeperateLayersCheckbox = SettingsGroup.add(
      "checkbox",
      undefined,
      " Put maze parts on separate layers",
    );
    SeperateLayersCheckbox.value = false;
    SeperateLayersCheckbox.size = [210, 18];
    SeperateLayersCheckbox.helpTip =
      "Seperates the maze in layers. Walls, solution path and the background plate are placed on different layers";
    if (parseFloat(app.version) >= 15) {
      var CreateNullCheckbox = SettingsGroup.add(
        "checkbox",
        undefined,
        " Create a null that follows the path",
      );
      CreateNullCheckbox.value = false;
      CreateNullCheckbox.size = [210, 18];
      CreateNullCheckbox.helpTip =
        "Creates a null that follows the tip of the solution path";
    }
    var CreateEmptyWallsCheckbox = SettingsGroup.add(
      "checkbox",
      undefined,
      " Create filled boxes, on empty parts",
    );
    CreateEmptyWallsCheckbox.value = false;
    CreateEmptyWallsCheckbox.size = [210, 30];
    CreateEmptyWallsCheckbox.helpTip = "Creates empty wall boxes";
    CreateEmptyWallsCheckbox.enabled = false;
    var SolutionStartGroup = settings_tab.add("group", undefined, "maze start");
    SolutionStartGroup.orientation = "row";
    SolutionStartGroup.margins = [-10, -10, 0, 0];
    var SolutionStartLabel = SolutionStartGroup.add(
      "StaticText",
      undefined,
      "Solution start:",
    );
    SolutionStartLabel.justify = "right";
    SolutionStartLabel.size = [100, 23];
    var SolutionStartDropdown = SolutionStartGroup.add(
      "dropdownlist",
      undefined,
      [
        "Top (right)",
        "Top (middle)",
        "Top (left)",
        "Right (top)",
        "Right (middle)",
        "Right (bottom)",
        "Bottom (left)",
        "Bottom (middle)",
        "Bottom (right)",
        "Left (top)",
        "Left (middle)",
        "Left (bottom)",
        "Center",
      ],
    );
    SolutionStartDropdown.helpTip =
      "Select the starting point of the solution path";
    SolutionStartDropdown.size = [110, 22];
    SolutionStartDropdown.selection = 2;
    var SolutionEndGroup = settings_tab.add("group", undefined, "maze End");
    SolutionEndGroup.orientation = "row";
    SolutionEndGroup.margins = [-10, 0, 0, 0];
    var SolutionEndLabel = SolutionEndGroup.add(
      "StaticText",
      undefined,
      "Solution end:",
    );
    SolutionEndLabel.justify = "right";
    SolutionEndLabel.size = [100, 23];
    var SolutionEndDropdown = SolutionEndGroup.add("dropdownlist", undefined, [
      "Top (right)",
      "Top (middle)",
      "Top (left)",
      "Right (top)",
      "Right (middle)",
      "Right (bottom)",
      "Bottom (left)",
      "Bottom (middle)",
      "Bottom (right)",
      "Left (top)",
      "Left (middle)",
      "Left (bottom)",
      "Center",
    ]);
    SolutionEndDropdown.helpTip =
      "Select the ending point of the solution path";
    SolutionEndDropdown.size = [110, 22];
    SolutionEndDropdown.selection = 8;
    var MaskPrecisionGroup = settings_tab.add(
      "group",
      undefined,
      "mask precision",
    );
    MaskPrecisionGroup.orientation = "row";
    MaskPrecisionGroup.margins = [-10, 0, 0, 5];
    MaskPrecisionGroup.enabled = false;
    var MaskPrecisionLabel = MaskPrecisionGroup.add(
      "StaticText",
      undefined,
      "Mask precision:",
    );
    MaskPrecisionLabel.justify = "right";
    MaskPrecisionLabel.size = [100, 23];
    var MaskPrecisionDropdown = MaskPrecisionGroup.add(
      "dropdownlist",
      undefined,
      ["low", "average", "high"],
    );
    MaskPrecisionDropdown.helpTip =
      "Select the mask precision setting. If your mask consists of lots of bezier masks, set the mask precision to \'High\'";
    MaskPrecisionDropdown.size = [110, 22];
    MaskPrecisionDropdown.selection = 0;
    var ButtonsGroup = myWin.add("group", undefined, "GroupSix");
    ButtonsGroup.orientation = "column";
    ButtonsGroup.alignment = ["fill", "fill"];
    var StackedButtons = ButtonsGroup.add("group", undefined, "GroupSix");
    StackedButtons.orientation = "stack";
    StackedButtons.alignment = ["fill", "fill"];
    var TeoButton = StackedButtons.add("button", undefined, "Create Maze");
    TeoButton.alignment = ["fill", "fill"];
    TeoButton.size = ["", "48"];
    TeoButton.helpTip = "Let\'s create a maze!";
    var CreateGridGuide = StackedButtons.add(
      "button",
      undefined,
      "Create Guide",
    );
    CreateGridGuide.alignment = ["left", "fill"];
    CreateGridGuide.size = ["88", "28"];
    CreateGridGuide.helpTip = "Creates a Grid Guide Layer";
    CreateGridGuide.visible = false;
    var CreateMaskMaze = StackedButtons.add(
      "button",
      undefined,
      "Create Maze by using mask",
    );
    CreateMaskMaze.alignment = ["right", "fill"];
    CreateMaskMaze.size = ["162", "28"];
    CreateMaskMaze.helpTip = "Let\'s create a-maze!";
    CreateMaskMaze.visible = false;
    PseudoEffectManagement();
    LockDimensionsButton.onClick = function () {
      if (this.value) {
        this.value = true;
        GridYSlider.value = GridY.text = GridX.text;
        GridYLabel.enabled = false;
        GridYSlider.enabled = false;
        GridY.enabled = false;
      } else {
        this.value = false;
        GridYLabel.enabled = true;
        GridYSlider.enabled = true;
        GridY.enabled = true;
      }
    };
    FillMaze.onClick = function () {
      FillMaze.value = true;
      MaskMaze.value = false;
      TeoButton.visible = true;
      CreateGridGuide.visible = CreateMaskMaze.visible = false;
      MaskPrecisionGroup.enabled = false;
      GridXSlider.minvalue = GridYSlider.minvalue = 2;
      CreateEmptyWallsCheckbox.enabled = false;
    };
    MaskMaze.onClick = function () {
      MaskMaze.value = true;
      FillMaze.value = false;
      TeoButton.visible = false;
      CreateGridGuide.visible = CreateMaskMaze.visible = true;
      MaskPrecisionGroup.enabled = true;
      GridXSlider.minvalue = GridYSlider.minvalue = 2;
      CreateEmptyWallsCheckbox.enabled = true;
    };
    CreateGridGuide.onClick = function () {
      grid_x = GridX.text;
      grid_y = GridY.text;
      all_available_vertices = [];
      curComp = app.project.activeItem;
      app.beginUndoGroup("Creation of mazeFX Guide Layer");
      if (curComp == null || !(curComp instanceof CompItem)) {
        alert("Please select a composition first!", "mazeFX alert");
      } else {
        curComp = app.project.activeItem;
        if (GridX.text > 15 || GridY.text > 15) {
          if (isTrial) {
            alert(
              "The max grid size that can be created in trial mode is 15 x 15.\n\nPlease readjust the Grid X and Grid Y values and try again",
              "mazeFX alert",
            );
          } else {
            createGridGuideLayer();
          }
        } else {
          createGridGuideLayer();
        }
      }
      parseFloat(app.version) > 13
        ? (app.project.toolType = ToolType.Tool_Pen)
        : null;
      app.endUndoGroup();
    };
    CreateMaskMaze.onClick = function () {
      isTrial = !O0OO.s();
      mask_vertices_boolean = [];
      var e = app.project.activeItem;
      app.beginUndoGroup("Creation of maze using masks");
      if (e == null || !(e instanceof CompItem)) {
        alert(
          "Please select a composition first and then a mazeFX Grid Guide layer and try again.",
          "mazeFX alert",
        );
      } else {
        if (app.project.activeItem.selectedLayers[0] == null) {
          alert(
            "Please select a mazeFX Grid Guide layer and try again.",
            "mazeFX alert",
          );
        } else {
          if (app.project.activeItem.selectedLayers.length > 1) {
            alert(
              "You have more than one layer selected.\nPlease select only one mazeFX Grid Guide layer and try again.",
              "mazeFX alert",
            );
          } else {
            if (
              app.project.activeItem.selectedLayers[0].comment.indexOf(
                "mazeFX Grid Guide Layer",
              ) == -1
            ) {
              alert(
                "This is not a mazeFX Grid Guide layer.\nPlease select a mazeFX Grid Guide layer and try again.",
                "mazeFX alert",
              );
            } else {
              if (
                app.project.activeItem.selectedLayers[0]("ADBE Mask Parade")(
                  "ADBE Mask Atom",
                ) == null
              ) {
                alert(
                  "No masks found on the selected Grid Guide Layer!\nPlease create a mask and try again.",
                  "mazeFX alert",
                );
              } else {
                guideLayer = app.project.activeItem.selectedLayers[0];
                if (guideLayer.enabled == false) {
                  guideLayer.enabled = true;
                }
                pass_GridX = guideLayer.comment.substring(
                  guideLayer.comment.indexOf("GridX: ") + 7,
                  guideLayer.comment.indexOf("- GridY:") - 1,
                );
                pass_GridY = guideLayer.comment.substring(
                  guideLayer.comment.indexOf("GridY: ") + 7,
                  guideLayer.comment.indexOf("]") - 1,
                );
                var t = false;
                if (pass_GridX * pass_GridY > 2000) {
                  if (
                    confirm(
                      "The settings you have selected will create a " +
                        pass_GridX * pass_GridY +
                        " cell grid which is quite large. Are you sure you want to continue?\n\nIf you choose to continue, be prepared to wait a while. After Effects may seem unresponsive, but it will be doing hard work under the hood! Please be patient.",
                      "noAsDefault",
                      "mazeFX",
                    ) == true
                  ) {
                    t = true;
                  }
                } else {
                  t = true;
                }
                if (t) {
                  GridX.text = pass_GridX;
                  GridY.text = pass_GridY;
                  start_vertex = [e.width, e.height];
                  end_vertex = [0, 0];
                  create_all_available_vertices();
                  for (
                    var maskNum = 1;
                    maskNum <= guideLayer("ADBE Mask Parade").numProperties;
                    maskNum += 1
                  ) {
                    var a =
                      guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                        .value.vertices;
                    var r =
                      guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                        .value.inTangents;
                    var o =
                      guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                        .value.outTangents;
                    for (var s = 0; s < a.length; s += 1) {
                      a[s][0] += e.width * 0.5;
                      a[s][1] += e.height * 0.5;
                    }
                    if (
                      guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                        .value.closed
                    ) {
                      a.push(a[0]);
                      r.push(r[0]);
                      o.push(o[0]);
                    }
                    a.reverse();
                    r.reverse();
                    o.reverse();
                    switch (MaskPrecisionDropdown.selection.index) {
                      case 0:
                        var l = [0.33, 0.66];
                        break;
                      case 1:
                        var l = [0.25, 0.5, 0.75];
                        break;
                      case 2:
                        var l = [0.16, 0.33, 0.5, 0.66, 0.83];
                    }
                    for (var s = 0; s < a.length - 1; s += 1) {
                      A0 = a[s][0];
                      D0 = a[s + 1][0];
                      B0 = a[s][0] + r[s][0];
                      C0 = a[s + 1][0] + o[s + 1][0];
                      A1 = a[s][1];
                      D1 = a[s + 1][1];
                      B1 = a[s][1] + r[s][1];
                      C1 = a[s + 1][1] + o[s + 1][1];
                      for (var n = 0; n < l.length; n += 1) {
                        E0 = (1 - l[n]) * A0 + l[n] * B0;
                        F0 = (1 - l[n]) * B0 + l[n] * C0;
                        G0 = (1 - l[n]) * C0 + l[n] * D0;
                        H0 = (1 - l[n]) * E0 + l[n] * F0;
                        J0 = (1 - l[n]) * F0 + l[n] * G0;
                        K0 = (1 - l[n]) * H0 + l[n] * J0;
                        E1 = (1 - l[n]) * A1 + l[n] * B1;
                        F1 = (1 - l[n]) * B1 + l[n] * C1;
                        G1 = (1 - l[n]) * C1 + l[n] * D1;
                        H1 = (1 - l[n]) * E1 + l[n] * F1;
                        J1 = (1 - l[n]) * F1 + l[n] * G1;
                        K1 = (1 - l[n]) * H1 + l[n] * J1;
                        a.splice(s + 1, 0, [K0, K1]);
                        r.splice(s + 1, 0, [0, 0]);
                        o.splice(s + 1, 0, [0, 0]);
                        s++;
                      }
                    }
                    a.pop();
                    r.pop();
                    o.pop();
                    if (
                      guideLayer("ADBE Mask Parade")(maskNum).maskMode ==
                      MaskMode.SUBTRACT
                    ) {
                      for (
                        var i = 0;
                        i < all_available_vertices.length;
                        i += 1
                      ) {
                        var p = i % GridX.text;
                        var d = Math.floor(i / GridX.text);
                        if (inside(all_available_vertices[i], a)) {
                          mask_vertices_boolean[d][p] = false;
                        }
                      }
                    } else {
                      for (
                        var i = 0;
                        i < all_available_vertices.length;
                        i += 1
                      ) {
                        var p = i % GridX.text;
                        var d = Math.floor(i / GridX.text);
                        mask_vertices_boolean[d][p] = false;
                        if (inside(all_available_vertices[i], a)) {
                          mask_vertices_boolean[d][p] = true;
                        }
                      }
                    }
                  }
                  guideLayer.enabled = false;
                  SeperateLayersCheckbox.value
                    ? createMazeSeparated(pass_GridX, pass_GridY)
                    : createMaze(pass_GridX, pass_GridY);
                }
              }
            }
          }
        }
      }
      app.endUndoGroup();
    };
    TeoButton.onClick = function () {
      isTrial = !O0OO.s();
      if (
        SolutionStartDropdown.selection.index ==
        SolutionEndDropdown.selection.index
      ) {
        alert(
          "Start and ending points, can\'t be the same cell.\rPlease select another option.",
        );
        return;
      }
      if (
        SolutionStartDropdown.selection.index == 0 &&
        SolutionEndDropdown.selection.index == 3
      ) {
        alert(
          "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (right) and Right (top) cells are actually the same cell.",
        );
        return;
      }
      if (
        SolutionStartDropdown.selection.index == 2 &&
        SolutionEndDropdown.selection.index == 9
      ) {
        alert(
          "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (left) and Left (top) cells are actually the same cell.",
        );
        return;
      }
      if (
        SolutionStartDropdown.selection.index == 5 &&
        SolutionEndDropdown.selection.index == 8
      ) {
        alert(
          "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Right (bottom) and Bottom (right) cells are actually the same cell.",
        );
        return;
      }
      if (
        SolutionStartDropdown.selection.index == 6 &&
        SolutionEndDropdown.selection.index == 11
      ) {
        alert(
          "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Left (bottom) and Bottom (left) cells are actually the same cell.",
        );
        return;
      }
      curComp = app.project.activeItem;
      app.beginUndoGroup("Creation of maze");
      if (curComp == null || !(curComp instanceof CompItem)) {
        alert("Please select a composition first!", "mazeFX alert");
      } else {
        if (GridX.text > 15 || GridY.text > 15) {
          if (isTrial) {
            alert(
              "The max grid size that can be created in trial mode is 15 x 15.\n\nPlease readjust the Grid X and Grid Y values and try again",
              "mazeFX alert",
            );
          } else {
            if (GridX.text * GridY.text > 2000) {
              if (
                confirm(
                  "The settings you have selected will create a " +
                    GridX.text * GridY.text +
                    " cell grid which is quite large. Are you sure you want to continue?\n\nIf you choose to continue, be prepared to wait a while. After Effects may seem unresponsive, but it will be doing hard work under the hood! Please be patient.",
                  "noAsDefault",
                  "mazeFX",
                ) == true
              ) {
                SeperateLayersCheckbox.value
                  ? createMazeSeparated()
                  : createMaze();
              }
            } else {
              SeperateLayersCheckbox.value
                ? createMazeSeparated()
                : createMaze();
            }
          }
        } else {
          SeperateLayersCheckbox.value ? createMazeSeparated() : createMaze();
        }
      }
      app.endUndoGroup();
    };
    MaskPrecisionDropdown.onChange = function () {
      if (this.selection == null) {
        this.selection = 0;
      }
    };
    SolutionStartDropdown.onChange = function () {
      if (this.selection == null) {
        this.selection = 0;
      }
      switch (SolutionStartDropdown.selection.index) {
        case 0:
          if (
            SolutionEndDropdown.selection.index == 0 ||
            SolutionEndDropdown.selection.index == 3
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (right) and Right (top) cells are actually the same cell.",
            );
          }
          break;
        case 1:
          if (SolutionEndDropdown.selection.index == 1) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 2:
          if (
            SolutionEndDropdown.selection.index == 2 ||
            SolutionEndDropdown.selection.index == 9
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (left) and Left (top) cells are actually the same cell.",
            );
          }
          break;
        case 3:
          if (
            SolutionEndDropdown.selection.index == 3 ||
            SolutionEndDropdown.selection.index == 0
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (left) and Left (top) cells are actually the same cell.",
            );
          }
          break;
        case 4:
          if (SolutionEndDropdown.selection.index == 4) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 5:
          if (
            SolutionEndDropdown.selection.index == 5 ||
            SolutionEndDropdown.selection.index == 8
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Right (bottom) and Bottom (right) cells are actually the same cell.",
            );
          }
          break;
        case 6:
          if (
            SolutionEndDropdown.selection.index == 6 ||
            SolutionEndDropdown.selection.index == 11
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Left (bottom) and Bottom (left) cells are actually the same cell.",
            );
          }
          break;
        case 7:
          if (SolutionEndDropdown.selection.index == 7) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 8:
          if (
            SolutionEndDropdown.selection.index == 8 ||
            SolutionEndDropdown.selection.index == 5
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Right (bottom) and Bottom (right) cells are actually the same cell.",
            );
          }
          break;
        case 9:
          if (
            SolutionEndDropdown.selection.index == 9 ||
            SolutionEndDropdown.selection.index == 2
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (left) and Left (top) cells are actually the same cell.",
            );
          }
          break;
        case 10:
          if (SolutionEndDropdown.selection.index == 10) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 11:
          if (
            SolutionEndDropdown.selection.index == 11 ||
            SolutionEndDropdown.selection.index == 6
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Left (bottom) and Bottom (left) cells are actually the same cell.",
            );
          }
      }
    };
    SolutionEndDropdown.onChange = function () {
      if (this.selection == null) {
        this.selection = 0;
      }
      switch (SolutionEndDropdown.selection.index) {
        case 0:
          if (
            SolutionStartDropdown.selection.index == 0 ||
            SolutionStartDropdown.selection.index == 3
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (right) and Right (top) cells are actually the same cell.",
            );
          }
          break;
        case 1:
          if (SolutionStartDropdown.selection.index == 1) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 2:
          if (
            SolutionStartDropdown.selection.index == 2 ||
            SolutionStartDropdown.selection.index == 9
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (left) and Left (top) cells are actually the same cell.",
            );
          }
          break;
        case 3:
          if (
            SolutionStartDropdown.selection.index == 3 ||
            SolutionStartDropdown.selection.index == 0
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (right) and Right (top) cells are actually the same cell.",
            );
          }
          break;
        case 4:
          if (SolutionStartDropdown.selection.index == 4) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 5:
          if (
            SolutionStartDropdown.selection.index == 5 ||
            SolutionStartDropdown.selection.index == 8
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Right (bottom) and Bottom (right) cells are actually the same cell.",
            );
          }
          break;
        case 6:
          if (
            SolutionStartDropdown.selection.index == 6 ||
            SolutionStartDropdown.selection.index == 11
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Left (bottom) and Bottom (left) cells are actually the same cell.",
            );
          }
          break;
        case 7:
          if (SolutionStartDropdown.selection.index == 7) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 8:
          if (
            SolutionStartDropdown.selection.index == 8 ||
            SolutionStartDropdown.selection.index == 5
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Right (bottom) and Bottom (right) cells are actually the same cell.",
            );
          }
          break;
        case 9:
          if (
            SolutionStartDropdown.selection.index == 9 ||
            SolutionStartDropdown.selection.index == 2
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Top (left) and Left (top) cells are actually the same cell.",
            );
          }
          break;
        case 10:
          if (SolutionStartDropdown.selection.index == 10) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.",
            );
          }
          break;
        case 11:
          if (
            SolutionStartDropdown.selection.index == 11 ||
            SolutionStartDropdown.selection.index == 6
          ) {
            alert(
              "Start and ending points, can\'t be the same cell.\rPlease select another option.\r\rTip: the Left (bottom) and Bottom (left) cells are actually the same cell.",
            );
          }
      }
    };
    GridX.onChange = function () {
      GridXSlider.value = this.text = this.text.replace(/[^\d+$]/g, "");
      if (this.text < 2) {
        GridXSlider.value = this.text = 2;
      }
      if (LockDimensionsButton.value) {
        GridYSlider.value = GridY.text = this.text;
      }
    };
    GridY.onChange = function () {
      GridYSlider.value = this.text = this.text.replace(/[^\d+$]/g, "");
      if (this.text < 2) {
        GridYSlider.value = this.text = 2;
      }
    };
    GridX.onChanging = function () {
      GridXSlider.value = this.text;
      if (LockDimensionsButton.value) {
        GridYSlider.value = GridY.text = this.text;
      }
    };
    GridY.onChanging = function () {
      GridYSlider.value = this.text;
      if (LockDimensionsButton.value) {
        GridX.text = this.text;
      }
    };
    GridXSlider.onChanging = GridXSlider.onChange = function () {
      GridX.text = Math.round(GridXSlider.value);
      if (LockDimensionsButton.value) {
        GridY.text = GridX.text;
        GridYSlider.value = GridXSlider.value;
      }
    };
    GridYSlider.onChanging = GridYSlider.onChange = function () {
      GridY.text = Math.round(GridYSlider.value);
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
mazeFX(this);
