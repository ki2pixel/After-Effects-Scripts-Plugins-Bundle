/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function rl_markerRemap(thisObj) {
  var af_settings = {
    helpButtons: [
      {
        name: "Video and In-Depth Tutorials",
        url: "https://aescripts.com/marker-remap/",
      },
    ],
    helpText:
      "BASIC USAGE IS ONLY THREE STEPS!\nAs a rule, if nothing is selected, buttons will act on the comp\'s timeline. If a layer is selected, buttons will act on that layer.\n\nSTEP 1: Add markers to the timeline of a comp, split around key actions.\n\u2022  Click \'ADD MARKER\' and enter a name. Use flags to set durations or batch add markers.\n\n\nSTEP 2: Place that comp inside of another comp. Select it and click \"ENABLE RETIMING\u201d\n    Time Remapping gets enabled and code is added to the expression field.\n\n\nSTEP 3: Adjust pre-comp\'s layer markers to retime segments\n\u2022  Use the EXTRACT, EDIT, SHIFT and DURATION functions to restore or manipulate pre-comp markers as needed.\n\u2022  Add behavior or easing flags as needed\n\n\n---------------------------------\nADDITIONAL FUNCTIONS\n---------------------------------\n\nCOPY / PASTE / DELETE: Place playhead anywhere within a marker and click. Use the dialogue boxes for multiple marker selections. Use the DELETE dialogue box for CUT functionality. Hover over buttons for additional functionality.\n\nTIP: SHIFT + clicking either the COPY or DELETE buttons will Copy or Delete markers within the work area.\n\n\nSHIFT:\nShift buttons act on \'Next All\' or \'Next Amount\', depending on the radio button setting\n\u2022  Shift to current time, or shift left or right using the buttons \n\u2022  SHIFT+clicking left or right will shift markers in increments of 10\n\u2022  ALT+clicking any of the shift buttons is a shortcut to affecting only the next marker (the same as selecting \'SHIFT NEXT: 1\'\n\nDURATION:\nSet in and out points as well as durations of markers\n\u2022  If the playhead is between two makers, \'IN\' will set the inpoint of the next marker. \'OUT\' will set the outpoint of the previous marker.\n\nFIT:\nShift current marker\'s in and/or out points to meet previous and next markers.\n\nFLAGS:\nDynamically labels markers to one of various retiming variations if the playhead is anywhere within the marker range of a selected layer (or the timeline, if nothing is selected)\n\u2022  Behavior flags: reverse, loop, loop segment, pingpong\n\u2022  Easing flags: ease in, ease both, ease out\n\u2022  Click the \'CLR\' buttons to remove eiather behavior or easing flags from a marker\n\u2022  Click \'CLEAR ALL FLAGS\' to remove both behavior and easing flags from a marker (TIP: ALT+CLEAR ALL FLAGS will remove all flags from all markers on that layer)\n\nBAKE TO KEYFRAMES:\nCreates keyframes for all Marker Remap values and removes the Marker Remap expression from the Time Remapping property. Please note that there is no need to bake when sending files to someone who doesn\'t have Marker Remap, as all expressions will work without the Marker Remap Panel.\n\n\nClick the \'VIDEO AND IN-DEPTH TUTORIALS\' for more detailed walkthroughs of all functions.\n\nPlease leave feadback in the comments section of https://aescripts.com/marker-remap! I\'d love to hear how you are using Marker Remap and what features you\'d like to see. Thanks for your support.\n\n\n\n",
    offerTrial: true,
    privateNumber: 7146557483780395,
    productSKU: "RLMR-SUL",
    scriptAuthor: "Reuben Lara",
    scriptName: "Marker Remap",
    scriptURL: "https://aescripts.com/marker-remap/",
    scriptVersion: "1.4",
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
          openSupportTicket({});
          e.close();
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
      -1 != $.os.indexOf("Mac") && systemCall('chmod 757 "' + n.fsName + '"');
      var r = systemCall(
        '"' + n.fsName + '" "' + strHeader + '" ' + privateNum + " " + e,
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
      if ("" == i || "" == t) {
        return false;
      }
      switch (e.result) {
        case -20:
          e.e = i;
          break;
        case -21:
          e.e = t;
      }
    }
    function checkFloatingLicense(e) {
      retProp("pe$", e) != bD("RkxU") ||
        isServerRunning(e) ||
        (e.result = -109);
    }
    function checkTrialDetails(e) {
      if (-7 !== e.result) {
      } else if (0 == trialLengthDays) {
        e.result = -106;
      } else {
        var i = retProp("^d", e);
        if (void 0 === i) {
          return void (e.result = -103);
        }
        var t = trialLengthDays - i;
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
        i.match(/@remote/i) ||
          alert(
            strRegSuccess.replace("%u", d) + (1 < d) && "de" != locale
              ? "s"
              : "" + betaMode
                ? ""
                : "\n" + strRegSuccess1,
          );
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
        isTimeLimited && (t += "\nLicense ends: " + f),
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
      return BridgeTalk.appName == bD("YWZ0ZXJlZmZlY3Rz");
    }
    function isPS() {
      return BridgeTalk.appName == bD("cGhvdG9zaG9w");
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
            systemCall(bD("Y2htb2QgNzU3IA==") + e.absoluteURI)),
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
    var licensingVersion = "3.0.38";
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
    var trialLengthDays = vars.hasOwnProperty("trialLengthDaysX")
      ? vars.trialLengthDaysX
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
    var doUpdateCheck = true;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    var wx = __BLOB__BLOB_000335__;
    var mx = __BLOB__BLOB_000336__;
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
          detail: "Die Lizenzdauer beginnt am ",
          title: "Die Lizenzdauer hat noch nicht begonnen (-20)",
        },
        "-21": {
          detail: "Lizenzlaufzeit endete am ",
          title: "Die Lizenzdauer ist abgelaufen (-21)",
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
  var r4 = new a(af_settings);
  if (r4.c()) {
    function myScript_buildUI(thisObj) {
      function addTabButtons() {
        btn_setup.enabled = true;
        btn_edit.enabled = true;
      }
      function removeTabButtons() {
        btn_setup.enabled = false;
        btn_edit.enabled = false;
      }
      function updateUILayout(container) {
        container.layout.layout(true);
        mrPanel.layout.layout(true);
      }
      function enableRetiming(mode) {
        var TimeRemapWithMarkers =
          "//Marker Remap v1.4\n//http://aescripts.com/marker-remap\naction = comp(source.name); \nn = 0;\noneFrame = thisComp.frameDuration;\nrange = 1;\nlimit = 0;\nif (marker.numKeys > 0){\n    n = marker.nearestKey(time).index;\n    if (marker.key(n).time > time){\n        n--;\n    }\n}\nif (n == 0){\n     if(marker.numKeys > 0){\n       \n        m = marker.key(1);\n        myComment = m.comment;\n        if(myComment.charAt( 0 ) == \'{\'){\n            myComment = myComment.substr(1);\n        } \n        if(myComment.charAt( 0 ) == \'%\'){\n            myComment = myComment.substr(1);\n        }\n        if(myComment.charAt( 0 ) == \'@\'){\n            myComment = myComment.substr(1);\n        }\n        lastChar = myComment.substr(-1);\n        if(lastChar == \'}\'){\n            myComment = myComment.slice(0, -1);\n        }\n        rangeArray = myComment.split(\'=\');\n        if(rangeArray.length > 1){\n            myComment = rangeArray[0];\n            range = rangeArray[1]/100;\n        }\n        limitArray = myComment.split(\'>\');\n        if(limitArray.length > 1){\n            myComment = limitArray[0];\n            limit = m.duration - ((limitArray[1]/100)*m.duration);\n            range = limitArray[1]/100;\n        }\n         if(myComment.charAt( 0 ) == \'<\'){\n            myComment = myComment.substr(1);\n            actMarker = action.marker.key(myComment);\n            actMarker.time + (actMarker.duration*range);\n         }else{\n            actMarker = action.marker.key(myComment);\n            actMarker.time; \n         }\n    }else{\n        0\n    }\n}else{\n    m = marker.key(n);\n    myComment = m.comment;\n    easeIn_m = false;\n    easeOut_m = false;\n    easeInOut_m = false;\n    if(myComment.charAt( 0 ) == \'{\'){\n        myComment = myComment.substr(1);\n        easeIn_m=true;\n    }\n    lastChar = myComment.substr(-1);\n    if(lastChar == \'}\'){\n        myComment = myComment.slice(0, -1);\n        easeOut_m=true;\n    }\n    if(easeIn_m==true && easeOut_m==true){\n        easeInOut_m = true;\n        easeIn_m = false;\n        easeOut_m = false;\n    }\n    rangeArray = myComment.split(\'=\');\n    if(rangeArray.length > 1){\n        myComment = rangeArray[0];\n        range = rangeArray[1]/100;\n    }\n    limitArray = myComment.split(\'>\');\n    if(limitArray.length > 1){\n        myComment = limitArray[0];\n        limit = m.duration - ((limitArray[1]/100)*m.duration);\n        range = limitArray[1]/100;\n    }\n    try{\n        if(myComment.charAt( 0 ) == \'<\'){\n            myCommentName = myComment.split(\'<\');\n            actMarker = action.marker.key(myCommentName[1]);\n            originalStart = actMarker.time;\n            originalEnd = originalStart + (actMarker.duration*range);\n            newStart = m.time;\n            newEnd = newStart + m.duration - limit;\n            if(easeIn_m==true){\n                easeIn(time,newStart,newEnd,originalEnd,originalStart);\n            }else if(easeOut_m==true){\n                easeOut(time,newStart,newEnd,originalEnd,originalStart);\n            }else if(easeInOut_m==true){\n                ease(time,newStart,newEnd,originalEnd,originalStart);\n            }else{\n                linear(time,newStart,newEnd,originalEnd,originalStart);\n            }\n        }else if(myComment == \'@\'){\n           \n            prevMarker = marker.key(n-1);\n            prevComment = prevMarker.comment;\n            if(prevComment.charAt( 0 ) == \'{\'){\n                prevComment = prevComment.substr(1);\n            }\n            lastChar = prevComment.substr(-1);\n            if(lastChar == \'}\'){\n                prevComment = prevComment.slice(0, -1);\n            }\n            rangeArray = prevComment.split(\'=\');\n            if(rangeArray.length > 1){\n                prevComment = rangeArray[0];\n                range = rangeArray[1]/100;\n            }\n            if(prevComment.charAt( 0 ) == \'<\'){\n                prevCommentSplit = prevComment.split(\'<\');\n                prevCommentName = prevCommentSplit[1];\n                reversed = true;\n                actMarker = action.marker.key(prevCommentName);\n            }else{\n                actMarker = action.marker.key(prevComment);\n                reversed = false;\n            }\n                originalStart = actMarker.time;\n                originalEnd = originalStart + (actMarker.duration*range);\n                currentLoop = Math.floor((timeToFrames(time) - timeToFrames(m.time))/timeToFrames(prevMarker.duration));\n                howManyLoops = Math.ceil(timeToFrames(m.duration) / timeToFrames(prevMarker.duration))\n                loopRemainder = ( timeToFrames(m.duration) / timeToFrames(prevMarker.duration) ) % 1;\n                loopRemainderTime = ( m.duration / prevMarker.duration) % 1;\n                framesRemainder = timeToFrames(prevMarker.duration) * loopRemainder;\n                originalEndRemainder = originalStart + (actMarker.duration * loopRemainderTime);\n                newStart = m.time + (prevMarker.duration * currentLoop);\n                newEnd = newStart + prevMarker.duration  - limit - oneFrame;\n                if(reversed == true){\n                    if(currentLoop == 0){\n                        if(easeIn_m==true){\n                            easeIn(time,newStart,newEnd,originalEnd,originalStart);\n                        }else if(easeInOut_m==true){\n                            easeIn(time,newStart,newEnd,originalEnd,originalStart);\n                        }else{\n                            linear(time,newStart,newEnd,originalEnd,originalStart);\n                        }  \n                    }else if(currentLoop == howManyLoops-1){\n                        if(easeOut_m==true){\n                            easeOut(time,newStart,newEnd,originalEnd,originalStart);\n                        }else if(easeInOut_m==true){\n                            easeOut(time,newStart,newEnd,originalEnd,originalStart);\n                        }else{\n                            linear(time,newStart,newEnd,originalEnd,originalStart);\n                        }  \n                    }else if(currentLoop >= howManyLoops){\n                        originalStart; \n                    }else{\n                        linear(time,newStart,newEnd,originalEnd,originalStart);\n                    }\n                }else{\n                    if(currentLoop == 0){\n                        if(easeIn_m==true){\n                            easeIn(time,newStart,newEnd,originalStart,originalEnd);\n                        }else if(easeInOut_m==true){\n                            easeIn(time,newStart,newEnd,originalStart,originalEnd);\n                        }else{\n                            linear(time,newStart,newEnd,originalStart,originalEnd);\n                        }  \n                    }else if(currentLoop == howManyLoops-1){\n                        if(easeOut_m==true){\n                            easeOut(time,newStart,newEnd,originalStart,originalEnd);\n                        }else if(easeInOut_m==true){\n                            easeOut(time,newStart,newEnd,originalStart,originalEnd);\n                        }else{\n                            linear(time,newStart,newEnd,originalStart,originalEnd);\n                        } \n                    }else if(currentLoop >= howManyLoops){\n                        originalEnd;\n                    }else{\n                        linear(time,newStart,newEnd,originalStart,originalEnd);\n                    }\n                }\n        }else if(myComment.charAt( 0 ) == \'@\'){\n            myCommentName = myComment.split(\'@\');\n            actMarker = action.marker.key(myCommentName[1]);\n            originalStart = actMarker.time;\n            originalEnd = originalStart + (actMarker.duration*range);\n            currentLoop = Math.floor( (timeToFrames(time) - timeToFrames(m.time))/timeToFrames(m.duration) );\n            newStart = m.time + (m.duration * currentLoop);\n            newEnd = newStart + m.duration  - limit;\n            if(easeIn_m==true){\n                easeIn(time,newStart,newEnd,originalStart,originalEnd);\n            }else if(easeOut_m==true){\n                easeOut(time,newStart,newEnd,originalStart,originalEnd);\n            }else if(easeInOut_m==true){\n                ease(time,newStart,newEnd,originalStart,originalEnd);\n            }else{\n                linear(time,newStart,newEnd,originalStart,originalEnd);\n            }\n        }else if(myComment.charAt( 0 ) == \'%\'){\n            myCommentName = myComment.split(\'%\');\n            actMarker = action.marker.key(myCommentName[1]);\n            originalStart = actMarker.time;\n            originalEnd = originalStart + (actMarker.duration*range);\n            currentLoop = Math.floor( (timeToFrames(time) - timeToFrames(m.time))/timeToFrames(m.duration) );\n            newStart = m.time + (m.duration * currentLoop);\n            newEnd = newStart + m.duration - limit;\n            if ((currentLoop ) %2 == 0){\n                if(easeIn_m==true){\n                    easeIn(time,newStart,newEnd,originalStart,originalEnd);\n                }else if(easeOut_m==true){\n                    easeOut(time,newStart,newEnd,originalStart,originalEnd);\n                }else if(easeInOut_m==true){\n                    ease(time,newStart,newEnd,originalStart,originalEnd);\n                }else{\n                    linear(time,newStart,newEnd,originalStart,originalEnd);\n                }\n            }else{\n                if(easeIn_m==true){\n                    easeIn(time,newStart,newEnd,originalEnd,originalStart);\n                }else if(easeOut_m==true){\n                    easeOut(time,newStart,newEnd,originalEnd,originalStart);\n                }else if(easeInOut_m==true){\n                    ease(time,newStart,newEnd,originalEnd,originalStart);\n                }else{\n                    linear(time,newStart,newEnd,originalEnd,originalStart);\n                }\n            }  \n        }else{\n            actMarker = action.marker.key(myComment);\n            originalStart = actMarker.time;\n            originalEnd = originalStart + (actMarker.duration*range);\n            newStart = m.time;\n            newEnd = newStart + m.duration - limit;\n            if(easeIn_m==true){\n                easeIn(time,newStart,newEnd,originalStart,originalEnd);\n            }else if(easeOut_m==true){\n                easeOut(time,newStart,newEnd,originalStart,originalEnd);\n            }else if(easeInOut_m==true){\n                ease(time,newStart,newEnd,originalStart,originalEnd);\n            }else{\n                linear(time,newStart,newEnd,originalStart,originalEnd);\n            }\n        }\n    }catch (err){\n        0\n    }\n}\n";
        var triggerAlert = false;
        var selection = app.project.activeItem.selectedLayers;
        for (var i = 0; i < selection.length; i += 1) {
          if (selection[i].source instanceof CompItem) {
            selection[i].timeRemapEnabled = true;
            selection[i].property("timeRemap").expression =
              TimeRemapWithMarkers;
            if (mode == "auto") {
              var compName = selection[0].source.name;
              var proj = app.project;
              for (var i = 1; i <= proj.numItems; i += 1) {
                if (proj.item(i).name === compName) {
                  target = proj.item(i);
                  var oneFrame = 1 / target.frameRate;
                  var markers = target.markerProperty;
                  var compMarker = new MarkerValue(compName);
                  var markerStart = 0;
                  var markerEnd = target.duration;
                  compMarker.duration = markerEnd - markerStart - oneFrame;
                  target.markerProperty.setValueAtTime(markerStart, compMarker);
                }
              }
              extractAllMarkers();
            }
          } else {
            triggerAlert = true;
          }
        }
        if (triggerAlert == true) {
          alert(
            "One of your selected layers was not a pre-comp and did not have Time Remapping enabled.",
          );
        }
        if (i == 0) {
          alert("Select pre-comp(s) to enable Time Remap Marker Retiming");
        }
      }
      function roundToNearestFrameinTime(value) {
        var myComp = app.project.activeItem;
        var frameRate = myComp.frameRate;
        value = value * frameRate;
        value = Math.round(value);
        value = value / frameRate;
        return value;
      }
      function delAllMarkers(markerTimesToDelete, index) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection.length < 1) {
          var markerStream = myComp.markerProperty;
          if (markerStream === null) {
            return;
          }
          if (markerTimesToDelete != null && markerTimesToDelete.length > 0) {
            for (var i = 0; i < markerTimesToDelete.length; i += 1) {
              for (var k = 1; k <= markerStream.numKeys; k += 1) {
                if (
                  parseFloat(markerStream.keyTime(k).toFixed(2)) ==
                  markerTimesToDelete[i]
                ) {
                  markerStream.removeKey(k);
                }
              }
            }
          } else {
            for (var k = markerStream.numKeys; k > 0; k--) {
              markerStream.removeKey(k);
            }
          }
        } else {
          var markerStream = mySelection[index].property("Marker");
          if (markerStream === null) {
            return;
          }
          if (markerTimesToDelete != null && markerTimesToDelete.length > 0) {
            for (var i = 0; i < markerTimesToDelete.length; i += 1) {
              for (var k = 1; k <= markerStream.numKeys; k += 1) {
                if (
                  parseFloat(markerStream.keyTime(k).toFixed(2)) ==
                  markerTimesToDelete[i]
                ) {
                  markerStream.removeKey(k);
                }
              }
            }
          } else {
            for (var k = markerStream.numKeys; k > 0; k--) {
              markerStream.removeKey(k);
            }
          }
        }
      }
      function copyMarkers(index, mode, supressAlert, callbackFunction) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        isTrial = !r4.s();
        if (mode === undefined) {
          mode = "all";
        }
        if (mySelection.length < 1) {
          copiedMarkersTime = [];
          copiedMarkersValue = [];
          var markers = myComp.markerProperty;
          if (markers.numKeys == 0) {
            if (supressAlert != true) {
              alert("There are no markers on the timeline.");
            }
            return false;
          } else {
            if (mode === "all") {
              for (var i = 1; i <= markers.numKeys; i += 1) {
                copiedMarkersTime.push(markers.keyTime(i));
                copiedMarkersValue.push(markers.keyValue(i));
              }
            } else if (mode === "current") {
              var thisMarker = getMarkerName("");
              copiedMarkersTime.push(markers.keyTime(thisMarker.index));
              copiedMarkersValue.push(markers.keyValue(thisMarker.index));
            } else {
              if (mode === "range") {
                var workAreaIn = myComp.workAreaStart;
                var workAreaOut =
                  myComp.workAreaStart + myComp.workAreaDuration;
                for (var i = 1; i <= markers.numKeys; i += 1) {
                  if (
                    markers.keyTime(i) >= workAreaIn &&
                    markers.keyTime(i) <= workAreaOut
                  ) {
                    copiedMarkersTime.push(markers.keyTime(i));
                    copiedMarkersValue.push(markers.keyValue(i));
                  }
                }
              }
            }
          }
        } else {
          copiedMarkersTime = [];
          copiedMarkersValue = [];
          var layer = mySelection[index];
          var markers = layer.property("marker");
          if (markers.numKeys == 0) {
            if (supressAlert != true) {
              alert("There are no markers on this layer.");
            }
            return false;
          } else {
            if (mode === "all") {
              for (var i = 1; i <= markers.numKeys; i += 1) {
                copiedMarkersTime.push(markers.keyTime(i));
                copiedMarkersValue.push(markers.keyValue(i));
              }
            } else if (mode === "current") {
              var thisMarker = getMarkerName("", index);
              copiedMarkersTime.push(markers.keyTime(thisMarker.index));
              copiedMarkersValue.push(markers.keyValue(thisMarker.index));
            } else {
              if (mode === "range") {
                var workAreaIn = myComp.workAreaStart;
                var workAreaOut =
                  myComp.workAreaStart + myComp.workAreaDuration;
                for (var i = 1; i <= markers.numKeys; i += 1) {
                  if (
                    markers.keyTime(i) >= workAreaIn &&
                    markers.keyTime(i) <= workAreaOut
                  ) {
                    copiedMarkersTime.push(markers.keyTime(i));
                    copiedMarkersValue.push(markers.keyValue(i));
                  }
                }
              }
            }
          }
        }
        if (callbackFunction) {
          callbackFunction();
        }
      }
      function emptyClipboard() {
        copiedMarkersTime = [];
        copiedMarkersValue = [];
      }
      function pasteMarkers(
        shiftRate,
        direction,
        nextOne,
        activeTime,
        deleteExisting,
        index,
        callbackFunction,
      ) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        var shiftRate = shiftRate / myComp.frameRate;
        var activeTime = parseFloat(activeTime);
        if (!activeTime > 0) {
          activeTime = 0;
        }
        isTrial = !r4.s();
        if (nextOne == true) {
          nextAmount = 1;
        } else {
          if (radioNextAll.value == true) {
            nextAmount = 0;
          } else {
            nextAmount = parseInt(inputNextAmount.text);
          }
        }
        if (deleteExisting == true) {
          delAllMarkers(null, index);
        }
        if (mySelection.length < 1) {
          n = 1;
          for (var i = 0; i <= copiedMarkersTime.length; i += 1) {
            if (i == copiedMarkersTime.length) {
              break;
            }
            if (shiftRate > 0) {
              if (
                copiedMarkersTime[i] >= app.project.activeItem.time ||
                (copiedMarkersTime[i] <= app.project.activeItem.time &&
                  copiedMarkersTime[i] + copiedMarkersValue[i].duration >=
                    app.project.activeItem.time)
              ) {
                if (nextAmount != 0) {
                  if (n <= nextAmount) {
                    if (direction == "left") {
                      newTime =
                        parseFloat(copiedMarkersTime[i]) -
                        parseFloat(shiftRate);
                    } else {
                      newTime =
                        parseFloat(copiedMarkersTime[i]) +
                        parseFloat(shiftRate);
                    }
                    myComp.markerProperty.setValueAtTime(
                      newTime,
                      copiedMarkersValue[i],
                    );
                    n++;
                  } else {
                    myComp.markerProperty.setValueAtTime(
                      copiedMarkersTime[i],
                      copiedMarkersValue[i],
                    );
                  }
                } else {
                  if (direction == "left") {
                    newTime =
                      parseFloat(copiedMarkersTime[i]) - parseFloat(shiftRate);
                  } else {
                    newTime =
                      parseFloat(copiedMarkersTime[i]) + parseFloat(shiftRate);
                  }
                  myComp.markerProperty.setValueAtTime(
                    newTime,
                    copiedMarkersValue[i],
                  );
                  n++;
                }
              } else {
                myComp.markerProperty.setValueAtTime(
                  copiedMarkersTime[i],
                  copiedMarkersValue[i],
                );
              }
            } else {
              myComp.markerProperty.setValueAtTime(
                copiedMarkersTime[i] + activeTime,
                copiedMarkersValue[i],
              );
            }
          }
        } else {
          n = 1;
          for (var i = 0; i <= copiedMarkersTime.length; i += 1) {
            if (i == copiedMarkersTime.length) {
              break;
            }
            if (shiftRate > 0) {
              if (
                copiedMarkersTime[i] >= app.project.activeItem.time ||
                (copiedMarkersTime[i] <= app.project.activeItem.time &&
                  copiedMarkersTime[i] + copiedMarkersValue[i].duration >=
                    app.project.activeItem.time)
              ) {
                if (nextAmount != 0) {
                  if (n <= nextAmount) {
                    if (direction == "left") {
                      newTime =
                        parseFloat(copiedMarkersTime[i]) -
                        parseFloat(shiftRate);
                    } else {
                      newTime =
                        parseFloat(copiedMarkersTime[i]) +
                        parseFloat(shiftRate);
                    }
                    mySelection[index]
                      .property("marker")
                      .setValueAtTime(newTime, copiedMarkersValue[i]);
                    n++;
                  } else {
                    mySelection[index]
                      .property("marker")
                      .setValueAtTime(
                        copiedMarkersTime[i],
                        copiedMarkersValue[i],
                      );
                  }
                } else {
                  if (direction == "left") {
                    newTime =
                      parseFloat(copiedMarkersTime[i]) - parseFloat(shiftRate);
                  } else {
                    newTime =
                      parseFloat(copiedMarkersTime[i]) + parseFloat(shiftRate);
                  }
                  mySelection[index]
                    .property("marker")
                    .setValueAtTime(newTime, copiedMarkersValue[i]);
                  n++;
                }
              } else {
                mySelection[index]
                  .property("marker")
                  .setValueAtTime(copiedMarkersTime[i], copiedMarkersValue[i]);
              }
            } else {
              mySelection[index]
                .property("marker")
                .setValueAtTime(
                  copiedMarkersTime[i] + activeTime,
                  copiedMarkersValue[i],
                );
            }
          }
        }
        if (callbackFunction) {
          callbackFunction();
        }
      }
      function pasteMarkersButtons(e, mode) {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          var myComp = app.project.activeItem;
          var mySelection = app.project.activeItem.selectedLayers;
          if (mode === "pasteAll") {
            if (copiedMarkersTime.length < 1) {
              alert("There\'s nothing in the clipboard.");
            } else {
              app.beginUndoGroup("Paste and Replace All Markers");
              if (mySelection < 1) {
                pasteMarkers(0, "left", false, 0, true);
              } else {
                for (var i = 0; i < mySelection.length; i += 1) {
                  pasteMarkers(0, "left", false, 0, true, i);
                }
              }
              this.active = true;
              this.active = false;
              app.endUndoGroup;
            }
          } else if (mode === "optionbox") {
            if (copiedMarkersTime.length < 1) {
              alert("There\'s nothing in the clipboard.");
            } else {
              app.beginUndoGroup("Paste Selected Markers");
              var markerNameList = [];
              for (var i = 0; i < copiedMarkersValue.length; i += 1) {
                var convertToFrames = parseInt(
                  copiedMarkersTime[i] * myComp.frameRate,
                ).pad(3);
                markerNameList.push(
                  i +
                    1 +
                    " - " +
                    convertToFrames +
                    " : " +
                    copiedMarkersValue[i].comment,
                );
              }
              var mr_markerlist4 = new Window("dialog");
              mr_markerlist4.add(
                "statictext",
                undefined,
                "The following markers have been copied. Select ONE or MORE markers to paste.\n",
                { multiline: true },
              );
              mr_markerlist4.add(
                "statictext",
                undefined,
                'TIP: In the panel, ALT + PASTE will "Paste All", replacing existing markers.',
                { multiline: true },
              );
              var myList4 = mr_markerlist4.add(
                "listbox",
                [0, 0, 200, 200],
                markerNameList,
                { multiselect: true },
              );
              mr_markerlist4.add("statictext", undefined, "Paste markers at:", {
                multiline: false,
              });
              var radio_group4 = mr_markerlist4.add("panel");
              radio_group4.alignChildren = "left";
              radio_group4.add("radiobutton", undefined, "Current Time");
              radio_group4.add("radiobutton", undefined, "Original Time");
              radio_group4.children[0].value = true;
              var check4 = mr_markerlist4.add(
                "checkbox",
                undefined,
                "Delete existing",
              );
              check4.value = false;
              mr_markerlist4.add("button", undefined, "PASTE", { name: "ok" });
              mr_markerlist4.add("button", undefined, "CANCEL", {
                name: "cancel",
              });
              var newTimeArray = [];
              var newValueArray = [];
              if (mr_markerlist4.show() == 1) {
                for (var k = 0; k < myList4.selection.length; k += 1) {
                  var markerIndexArray = myList4.selection[k].text.split(" - ");
                  var markerIndex = parseInt(markerIndexArray[0]) - 1;
                  newTimeArray.push(copiedMarkersTime[markerIndex]);
                  newValueArray.push(copiedMarkersValue[markerIndex]);
                }
                var copiedMarkersTimeClone = [];
                var copiedMarkersValueClone = [];
                copiedMarkersTimeClone = copiedMarkersTime.slice(0);
                copiedMarkersValueClone = copiedMarkersValue.slice(0);
                copiedMarkersTime = [];
                copiedMarkersValue = [];
                copiedMarkersTime = newTimeArray.slice(0);
                copiedMarkersValue = newValueArray.slice(0);
                if (radio_group4.children[0].value == true) {
                  if (newTimeArray[0] < app.project.activeItem.time) {
                    shiftClipboard =
                      app.project.activeItem.time - newTimeArray[0];
                  } else {
                    shiftClipboard =
                      (newTimeArray[0] - app.project.activeItem.time) * -1;
                  }
                  if (mySelection.length < 1) {
                    pasteMarkers(
                      0,
                      "left",
                      false,
                      shiftClipboard,
                      check4.value,
                    );
                  } else {
                    for (var i = 0; i < mySelection.length; i += 1) {
                      pasteMarkers(
                        0,
                        "left",
                        false,
                        shiftClipboard,
                        check4.value,
                        i,
                      );
                    }
                  }
                }
                if (radio_group4.children[1].value == true) {
                  if (mySelection.length < 1) {
                    pasteMarkers(0, "left", false, 0, check4.value);
                  } else {
                    for (var i = 0; i < mySelection.length; i += 1) {
                      pasteMarkers(0, "left", false, 0, check4.value, i);
                    }
                  }
                }
                copiedMarkersTime = copiedMarkersTimeClone.slice(0);
                copiedMarkersValue = copiedMarkersValueClone.slice(0);
              } else {
                exit();
              }
              this.active = true;
              this.active = false;
              app.endUndoGroup;
            }
          } else {
            if (copiedMarkersTime.length < 1) {
              alert("There\'s nothing in the clipboard.");
            } else {
              app.beginUndoGroup("Paste Markers at Current Time");
              if (copiedMarkersTime[0] < app.project.activeItem.time) {
                shiftClipboard =
                  app.project.activeItem.time - copiedMarkersTime[0];
              } else {
                shiftClipboard =
                  (copiedMarkersTime[0] - app.project.activeItem.time) * -1;
              }
              if (mySelection.length < 1) {
                pasteMarkers(0, "left", false, shiftClipboard, false);
              } else {
                for (var i = 0; i < mySelection.length; i += 1) {
                  pasteMarkers(0, "left", false, shiftClipboard, false, i);
                }
              }
              this.active = true;
              this.active = false;
              app.endUndoGroup;
            }
          }
        }
      }
      function deleteMarkerButton(mode) {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          app.beginUndoGroup("Delete Markers");
          var myComp = app.project.activeItem;
          var mySelection = app.project.activeItem.selectedLayers;
          if (mode === "deleteAll") {
            if (mySelection.length < 1) {
              delAllMarkers();
            } else {
              for (var i = 0; i < mySelection.length; i += 1) {
                delAllMarkers(null, i);
              }
            }
          } else if (mode === "optionBox") {
            if (mySelection.length > 1) {
              alert(
                "Only select one layer to delete specific markers.\nTIP: ALT + DELETE (Delete All) works on multiple selections.",
              );
            } else {
              var copiedMarkersTimeClone = [];
              var copiedMarkersValueClone = [];
              copiedMarkersTimeClone = copiedMarkersTime.slice(0);
              copiedMarkersValueClone = copiedMarkersValue.slice(0);
              if (copyMarkers(0) == false) {
                return;
              }
              var markerNameList = [];
              for (var i = 0; i < copiedMarkersValue.length; i += 1) {
                var convertToFrames = parseInt(
                  copiedMarkersTime[i] * myComp.frameRate,
                ).pad(3);
                markerNameList.push(
                  i +
                    1 +
                    " - " +
                    convertToFrames +
                    " : " +
                    copiedMarkersValue[i].comment,
                );
              }
              var mr_markerlist5 = new Window("dialog");
              mr_markerlist5.add(
                "statictext",
                undefined,
                "Select ONE or MORE markers to delete.\n",
                { multiline: true },
              );
              mr_markerlist5.add(
                "statictext",
                undefined,
                'TIP: In the panel, ALT + DELETE will "Delete All"',
                { multiline: true },
              );
              var myList5 = mr_markerlist5.add(
                "listbox",
                [0, 0, 200, 200],
                markerNameList,
                { multiselect: true },
              );
              var cutButton = mr_markerlist5.add("button", undefined, "CUT", {
                name: "cut",
              });
              var deleteButton = mr_markerlist5.add(
                "button",
                undefined,
                "DELETE",
                { name: "ok" },
              );
              var closeButton = mr_markerlist5.add(
                "button",
                undefined,
                "CANCEL",
                { name: "cancel" },
              );
              var markerTimesToDelete = [];
              var cutMarkersTime = [];
              var cutMarkersValue = [];
              cutButton.onClick = function () {
                for (var k = 0; k < myList5.selection.length; k += 1) {
                  var markerIndexArray = myList5.selection[k].text.split(" - ");
                  var markerIndex = parseInt(markerIndexArray[0]) - 1;
                  markerTimesToDelete.push(
                    parseFloat(copiedMarkersTime[markerIndex].toFixed(2)),
                  );
                  cutMarkersTime.push(copiedMarkersTime[markerIndex]);
                  cutMarkersValue.push(copiedMarkersValue[markerIndex]);
                }
                copiedMarkersTimeClone = cutMarkersTime.slice(0);
                copiedMarkersValueClone = cutMarkersValue.slice(0);
                delAllMarkers(markerTimesToDelete, 0);
                mr_markerlist5.close();
              };
              if (mr_markerlist5.show() == 1) {
                for (var k = 0; k < myList5.selection.length; k += 1) {
                  var markerIndexArray = myList5.selection[k].text.split(" - ");
                  var markerIndex = parseInt(markerIndexArray[0]) - 1;
                  markerTimesToDelete.push(
                    parseFloat(copiedMarkersTime[markerIndex].toFixed(2)),
                  );
                }
                copiedMarkersTime = copiedMarkersTimeClone.slice(0);
                copiedMarkersValue = copiedMarkersValueClone.slice(0);
                delAllMarkers(markerTimesToDelete, 0);
              } else {
                copiedMarkersTime = copiedMarkersTimeClone.slice(0);
                copiedMarkersValue = copiedMarkersValueClone.slice(0);
                exit();
              }
            }
          } else if (mode === "deleteRange") {
            var workAreaIn = myComp.workAreaStart;
            var workAreaOut = myComp.workAreaStart + myComp.workAreaDuration;
            if (mySelection.length < 1) {
              var markerTimesToDelete = [];
              var markers = myComp.markerProperty;
              for (var i = 1; i <= markers.numKeys; i += 1) {
                if (
                  markers.keyTime(i) >= workAreaIn &&
                  markers.keyTime(i) <= workAreaOut
                ) {
                  markerTimesToDelete.push(
                    parseFloat(markers.keyTime(i).toFixed(2)),
                  );
                }
              }
              if (markerTimesToDelete.length > 0) {
                delAllMarkers(markerTimesToDelete);
              }
            } else {
              for (var index = 0; index < mySelection.length; index += 1) {
                var markerTimesToDelete = [];
                var markers = mySelection[index].property("Marker");
                for (var i = 1; i <= markers.numKeys; i += 1) {
                  if (
                    markers.keyTime(i) >= workAreaIn &&
                    markers.keyTime(i) <= workAreaOut
                  ) {
                    markerTimesToDelete.push(
                      parseFloat(markers.keyTime(i).toFixed(2)),
                    );
                  }
                }
                if (markerTimesToDelete.length > 0) {
                  delAllMarkers(markerTimesToDelete, index);
                }
              }
            }
          } else {
            if (mySelection.length < 1) {
              var markerTimesToDelete = [];
              var thisMarker = getMarkerName();
              var markers = myComp.markerProperty;
              for (var i = 1; i <= markers.numKeys; i += 1) {
                if (markers.keyTime(i) === thisMarker.time) {
                  markerTimesToDelete.push(
                    parseFloat(markers.keyTime(i).toFixed(2)),
                  );
                }
              }
              if (markerTimesToDelete.length > 0) {
                delAllMarkers(markerTimesToDelete);
              }
            } else {
              var noMarkerFlag = true;
              for (var index = 0; index < mySelection.length; index += 1) {
                var markerTimesToDelete = [];
                var thisMarker = getMarkerName("check", index);
                if (thisMarker != false && thisMarker != undefined) {
                  noMarkerFlag = false;
                }
                var markers = mySelection[index].property("Marker");
                for (var i = 1; i <= markers.numKeys; i += 1) {
                  if (markers.keyTime(i) === thisMarker.time) {
                    markerTimesToDelete.push(
                      parseFloat(markers.keyTime(i).toFixed(2)),
                    );
                  }
                }
                if (markerTimesToDelete.length > 0) {
                  delAllMarkers(markerTimesToDelete, index);
                }
              }
              if (noMarkerFlag == true) {
                alert(
                  "None of the selected pre-comps have markers on this frame.",
                );
              }
            }
          }
          this.active = true;
          this.active = false;
          app.endUndoGroup;
        }
      }
      function shiftMarkerButtons(shiftAmount, direction, altFlag, index) {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          var mySelection = app.project.activeItem.selectedLayers;
          var copiedMarkersTimeClone = [];
          var copiedMarkersValueClone = [];
          copiedMarkersTimeClone = copiedMarkersTime.slice(0);
          copiedMarkersValueClone = copiedMarkersValue.slice(0);
          copyMarkers(index);
          pasteMarkers(
            shiftAmount,
            direction,
            altFlag,
            0,
            true,
            index,
            function () {
              copiedMarkersTime = copiedMarkersTimeClone.slice(0);
              copiedMarkersValue = copiedMarkersValueClone.slice(0);
            },
          );
          this.active = true;
          this.active = false;
        }
      }
      function findPrevMarkerTime(index) {
        var myComp = app.project.activeItem;
        var copiedMarkersTimeClone = [];
        var copiedMarkersValueClone = [];
        copiedMarkersTimeClone = copiedMarkersTime.slice(0);
        copiedMarkersValueClone = copiedMarkersValue.slice(0);
        copyMarkers(index, "all", true);
        var onAmarker = false;
        var thisMarker = getMarkerName("check", index);
        if (thisMarker != false) {
          onAmarker = true;
        }
        for (var i = 0; i < copiedMarkersTime.length; i += 1) {
          if (app.project.activeItem.time >= copiedMarkersTime[i]) {
            if (onAmarker == false) {
              prevMarkerTime = copiedMarkersTime[i];
              prevMarkerDuration = copiedMarkersValue[i].duration;
            } else {
              var prevMarkerIndex = i - 1;
              if (prevMarkerIndex < 0) {
                prevMarkerTime = undefined;
                prevMarkerDuration = undefined;
              } else {
                prevMarkerTime = copiedMarkersTime[prevMarkerIndex];
                prevMarkerDuration =
                  copiedMarkersValue[prevMarkerIndex].duration;
              }
            }
          } else {
            break;
          }
        }
        copiedMarkersTime = copiedMarkersTimeClone.slice(0);
        copiedMarkersValue = copiedMarkersValueClone.slice(0);
        return { duration: prevMarkerDuration, start: prevMarkerTime };
      }
      function findNextMarkerTime(index) {
        var myComp = app.project.activeItem;
        var copiedMarkersTimeClone = [];
        var copiedMarkersValueClone = [];
        copiedMarkersTimeClone = copiedMarkersTime.slice(0);
        copiedMarkersValueClone = copiedMarkersValue.slice(0);
        copyMarkers(index, "all", true);
        for (var i = 0; i < copiedMarkersTime.length; i += 1) {
          if (app.project.activeItem.time < copiedMarkersTime[i]) {
            nextMarkerTime = copiedMarkersTime[i];
            nextMarkerDuration = copiedMarkersValue[i].duration;
            break;
          }
        }
        copiedMarkersTime = copiedMarkersTimeClone.slice(0);
        copiedMarkersValue = copiedMarkersValueClone.slice(0);
        return { duration: nextMarkerDuration, start: nextMarkerTime };
      }
      function findNextMarkerIndex(index) {
        var copiedMarkersTimeClone = [];
        var copiedMarkersValueClone = [];
        copiedMarkersTimeClone = copiedMarkersTime.slice(0);
        copiedMarkersValueClone = copiedMarkersValue.slice(0);
        copyMarkers(index);
        for (var i = 0; i < copiedMarkersTime.length; i += 1) {
          if (app.project.activeItem.time <= copiedMarkersTime[i]) {
            nextMarkerIndex = i + 1;
            break;
          }
        }
        copiedMarkersTime = copiedMarkersTimeClone.slice(0);
        copiedMarkersValue = copiedMarkersValueClone.slice(0);
        return nextMarkerIndex;
      }
      function findPrevMarkerIndex(index) {
        var copiedMarkersTimeClone = [];
        var copiedMarkersValueClone = [];
        copiedMarkersTimeClone = copiedMarkersTime.slice(0);
        copiedMarkersValueClone = copiedMarkersValue.slice(0);
        copyMarkers(index);
        for (var i = 0; i < copiedMarkersTime.length; i += 1) {
          if (
            app.project.activeItem.time >
            copiedMarkersTime[i] + copiedMarkersValue[i].duration
          ) {
            prevMarkerIndex = i;
            break;
          }
        }
        copiedMarkersTime = copiedMarkersTimeClone.slice(0);
        copiedMarkersValue = copiedMarkersValueClone.slice(0);
        return prevMarkerIndex;
      }
      function checkForMarkers(index) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection.length < 1) {
          var markers = myComp.markerProperty;
          if (markers.numKeys == 0) {
            return false;
          } else {
            return true;
          }
        } else {
          var markers = mySelection[index].property("marker");
          if (markers.numKeys == 0) {
            return false;
          } else {
            return true;
          }
        }
      }
      function getMarkerName(mode, index) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection.length < 1) {
          var myMarker = myComp.markerProperty;
        } else {
          var myLayer = mySelection[index];
          var myMarker = myLayer.property("Marker");
        }
        var myIndex = 0;
        var currentTime = app.project.activeItem.time;
        if (myMarker.numKeys > 0) {
          myIndex = myMarker.nearestKeyIndex(myComp.time);
          var myMarkerTime = myMarker.keyTime(myIndex);
          if (myMarkerTime > currentTime && myIndex != 1) {
            myIndex--;
          }
          var myComment = myMarker.keyValue(myIndex).comment;
          var myMarkerTime = myMarker.keyTime(myIndex);
          var myMarkerDuration = myMarker.keyValue(myIndex).duration;
        }
        if (myIndex == 0) {
          if (mode != "check") {
            if (mySelection.length < 1) {
              alert("There are no markers on the timeline");
            } else {
              alert("There are no markers on this layer");
            }
          }
        } else {
          if (
            currentTime >= myMarkerTime &&
            currentTime <= myMarkerTime + myMarkerDuration
          ) {
            return {
              duration: myMarkerDuration,
              index: parseInt(myIndex),
              name: myComment,
              time: myMarkerTime,
            };
          } else {
            if (mode == "check") {
              return false;
            } else {
              alert("There is no marker on this frame.");
            }
          }
        }
      }
      function setFit(mode, index) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        var currentTime = app.project.activeItem.time;
        var oneFrame = 1 / myComp.frameRate;
        if (mySelection.length < 1) {
          var markers = myComp.markerProperty;
        } else {
          var myLayer = mySelection[index];
          var markers = myLayer.property("Marker");
        }
        var thisMarker = getMarkerName("check", index);
        if (thisMarker == false) {
          alert("There is no marker on this frame.");
        } else {
          var prevMarkerTime = findPrevMarkerTime(index);
          var nextMarkerTime = findNextMarkerTime(index);
          var thisMarkerTime = markers.keyTime(thisMarker.index);
          var thisMarkerValue = markers.keyValue(thisMarker.index);
          var thisMarkerDuration = markers.keyValue(thisMarker.index).duration;
          switch (mode) {
            case "left":
              if (prevMarkerTime.start === undefined) {
                oneFrame = 0;
                prevMarkerTime.start = 0;
                prevMarkerTime.duration = 0;
                var startTime = prevMarkerTime.start;
                if (mySelection.length >= 1) {
                  var startTime = mySelection[index].inPoint;
                }
              }
              var newStart = roundToNearestFrameinTime(
                startTime + prevMarkerTime.duration + oneFrame,
              );
              var currentEnd = thisMarker.time + thisMarker.duration;
              thisMarkerValue.duration = roundToNearestFrameinTime(
                currentEnd - newStart,
              );
              markers.removeKey(thisMarker.index);
              markers.setValueAtTime(newStart, thisMarkerValue);
              break;
            case "right":
              var endTime = nextMarkerTime.start;
              if (nextMarkerTime.start === undefined) {
                oneFrame = 0;
                if (mySelection.length >= 1) {
                  endTime = mySelection[index].outPoint;
                } else {
                  endTime = myComp.duration;
                }
              }
              thisMarkerValue.duration = roundToNearestFrameinTime(
                endTime - oneFrame - thisMarker.time,
              );
              markers.removeKey(thisMarker.index);
              markers.setValueAtTime(thisMarker.time, thisMarkerValue);
              break;
            case "both":
              if (prevMarkerTime.start === undefined) {
                oneFrame = 0;
                prevMarkerTime.start = 0;
                prevMarkerTime.duration = 0;
                var startTime = prevMarkerTime.start;
                if (mySelection.length >= 1) {
                  var startTime = mySelection[index].inPoint;
                }
              } else {
                oneFrame = 1 / myComp.frameRate;
              }
              var newStart = roundToNearestFrameinTime(
                startTime + prevMarkerTime.duration + oneFrame,
              );
              var endTime = nextMarkerTime.start;
              if (nextMarkerTime.start === undefined) {
                if (mySelection.length >= 1) {
                  endTime = mySelection[index].outPoint;
                } else {
                  endTime = myComp.duration;
                }
              } else {
                oneFrame = 1 / myComp.frameRate;
              }
              thisMarkerValue.duration = roundToNearestFrameinTime(
                endTime - newStart - oneFrame,
              );
              markers.removeKey(thisMarker.index);
              markers.setValueAtTime(newStart, thisMarkerValue);
              break;
            default:
          }
        }
      }
      function setMarkerData(mode, index) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        var thisMarker = getMarkerName("check", index);
        if (mySelection.length < 1) {
          var myMarkers = myComp.markerProperty;
        } else {
          var myLayer = mySelection[index];
          var myMarkers = myLayer.property("Marker");
        }
        if (thisMarker == false) {
          var nextMarkerIndex = findNextMarkerIndex(index);
          if (mode == "in") {
            thisMarkerIndex = nextMarkerIndex;
          } else if (mode == "out") {
            if (nextMarkerIndex != undefined) {
              thisMarkerIndex = nextMarkerIndex - 1;
            } else {
              thisMarkerIndex = myMarkers.numKeys;
            }
          } else {
            if (mode == "duration") {
              alert("There is no marker on this frame.");
              return;
            }
          }
        } else {
          thisMarkerIndex = thisMarker.index;
        }
        var thisMarkerTime = myMarkers.keyTime(thisMarkerIndex);
        var thisMarkerValue = myMarkers.keyValue(thisMarkerIndex);
        var thisMarkerDuration = myMarkers.keyValue(thisMarkerIndex).duration;
        var currentTime = app.project.activeItem.time;
        switch (mode) {
          case "in":
            thisMarkerValue.duration =
              thisMarkerTime + thisMarkerDuration - currentTime;
            myMarkers.removeKey(thisMarkerIndex);
            myMarkers.setValueAtTime(currentTime, thisMarkerValue);
            break;
          case "out":
            thisMarkerValue.duration = currentTime - thisMarkerTime;
            myMarkers.removeKey(thisMarkerIndex);
            myMarkers.setValueAtTime(thisMarkerTime, thisMarkerValue);
            break;
          case "duration":
            thisMarkerValue.duration =
              parseInt(inputFrameDuration.text) / myComp.frameRate;
            myMarkers.removeKey(thisMarkerIndex);
            myMarkers.setValueAtTime(thisMarkerTime, thisMarkerValue);
            break;
        }
      }
      function setRange(rangeValue, index) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        var myLayer = mySelection[index];
        var myMarker = myLayer.property("Marker");
        if (getMarkerName("check", index) != false) {
          var thisMarker = getMarkerName("", index);
          var thisMarkerIndex = parseInt(thisMarker.index);
          var thisMarkerName = thisMarker.name;
          var thisMarkerTime = myMarker.keyTime(thisMarkerIndex);
          var thisMarkerValue = myMarker.keyValue(thisMarkerIndex);
          var easeInDetected = false;
          var easeOutDetected = false;
          var easeType = "linear";
          if (thisMarkerName.indexOf("{") > -1) {
            thisMarkerName = thisMarkerName.replace("{", "");
            easeInDetected = true;
            easeType = "easeIn";
          }
          if (thisMarkerName.indexOf("}") > -1) {
            thisMarkerName = thisMarkerName.replace("}", "");
            easeOutDetected = true;
            easeType = "easeOut";
          }
          if (easeInDetected == true && easeOutDetected == true) {
            easeType = "easeBoth";
          }
          if (thisMarkerName === "@") {
            alert("Range values cannot be appplied to Loop Segments");
            return;
          }
          var rangeMode = "=";
          if (thisMarkerName.indexOf("=") > -1) {
            rangeMode = "=";
          } else {
            if (thisMarkerName.indexOf(">") > -1) {
              rangeMode = ">";
            }
          }
          var rangeArray = thisMarkerName.split(rangeMode);
          if (rangeArray.length > 1) {
            if (rangeValue == 100) {
              thisMarkerName = rangeArray[0];
            } else {
              thisMarkerName = rangeArray[0] + rangeMode + rangeValue;
            }
          } else {
            thisMarkerName = thisMarkerName + rangeMode + rangeValue;
          }
          thisMarkerName = switchEasingName(thisMarkerName, easeType);
          thisMarkerValue.comment = thisMarkerName;
          myMarker.setValueAtTime(thisMarkerTime, thisMarkerValue);
        }
      }
      function switchFlags(convertToFlag, supressWarnings, selectionIndex) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection.length < 1 && supressWarnings != true) {
          if (mySelection.length < 1) {
            alert(
              "Marker Remap flags should only be applied to layer markers. Please select a layer.",
            );
            return;
          }
        }
        if (mySelection.length < 1) {
          var myMarker = myComp.markerProperty;
          if (getMarkerName("check") != false) {
            if (selectionIndex == 0) {
              var thisMarker = getMarkerName("");
            } else {
              var thisMarker = getMarkerName("check");
            }
            var markerExists = true;
          }
        } else {
          var myLayer = mySelection[selectionIndex];
          var myMarker = myLayer.property("Marker");
          if (getMarkerName("check", selectionIndex) != false) {
            if (selectionIndex == 0) {
              var thisMarker = getMarkerName("", selectionIndex);
            } else {
              var thisMarker = getMarkerName("check", selectionIndex);
            }
            var markerExists = true;
          }
        }
        if (markerExists == true) {
          var thisMarkerIndex = parseInt(thisMarker.index);
          var thisMarkerName = thisMarker.name;
          var easeInDetected = false;
          var easeOutDetected = false;
          var easeType = "linear";
          if (thisMarkerName.indexOf("{") > -1) {
            thisMarkerName = thisMarkerName.replace("{", "");
            easeInDetected = true;
            easeType = "easeIn";
          }
          if (thisMarkerName.indexOf("}") > -1) {
            thisMarkerName = thisMarkerName.replace("}", "");
            easeOutDetected = true;
            easeType = "easeOut";
          }
          if (easeInDetected == true && easeOutDetected == true) {
            easeType = "easeBoth";
          }
          var flagChar = thisMarkerName.charAt(0);
          var thisMarkerTime = myMarker.keyTime(thisMarkerIndex);
          var thisMarkerValue = myMarker.keyValue(thisMarkerIndex);
          if (thisMarkerName === "@") {
            var compName = myLayer.source.name;
            copiedMarkersTime = [];
            copiedMarkersValue = [];
            var proj = app.project;
            for (var i = 1; i <= proj.numItems; i += 1) {
              if (proj.item(i).name === compName) {
                target = proj.item(i);
                var markers = target.markerProperty;
              }
            }
            for (var i = 1; i <= markers.numKeys; i += 1) {
              copiedMarkersTime.push(markers.keyTime(i));
              copiedMarkersValue.push(markers.keyValue(i));
            }
            markerNameList = [];
            for (var i = 0; i < copiedMarkersValue.length; i += 1) {
              markerNameList.push(copiedMarkersValue[i].comment);
            }
            var mr_markerlist2 = new Window("dialog");
            mr_markerlist2.add(
              "statictext",
              undefined,
              "The following markers have been found in the selected pre-comp. Select ONE MARKER to extract. It will replace the current marker name.",
              { multiline: true },
            );
            var myList = mr_markerlist2.add(
              "listbox",
              [0, 0, 200, 100],
              markerNameList,
              { multiselect: false },
            );
            var radio_group = mr_markerlist2.add("panel");
            radio_group.alignChildren = "left";
            radio_group.add("radiobutton", undefined, "Normal");
            radio_group.add("radiobutton", undefined, "Time-Reverse");
            radio_group.add("radiobutton", undefined, "Loop");
            radio_group.add("radiobutton", undefined, "Ping pong");
            radio_group.children[0].value = true;
            mr_markerlist2.add("button", undefined, "EXTRACT", { name: "ok" });
            mr_markerlist2.add("button", undefined, "CANCEL", {
              name: "cancel",
            });
            if (mr_markerlist2.show() == 1) {
              for (var i = 0; i <= copiedMarkersTime.length; i += 1) {
                commentName = copiedMarkersValue[i].comment;
                if (copiedMarkersValue[i].comment === myList.selection.text) {
                  if (radio_group.children[1].value == true) {
                    copiedMarkersValue[i].comment = "<" + commentName;
                  }
                  if (radio_group.children[2].value == true) {
                    copiedMarkersValue[i].comment = "@" + commentName;
                  }
                  if (radio_group.children[3].value == true) {
                    copiedMarkersValue[i].comment = "%" + commentName;
                  }
                  copiedMarkersValue[i].comment = switchEasingName(
                    copiedMarkersValue[i].comment,
                    easeType,
                  );
                  copiedMarkersValue[i].duration = thisMarkerValue.duration;
                  myComp.selectedLayers[0]
                    .property("marker")
                    .setValueAtTime(thisMarkerTime, copiedMarkersValue[i]);
                }
              }
            }
            exit();
          } else {
            var flags = ["@", "<", "%", "[@]"];
            if (flags.contains(flagChar)) {
              if (convertToFlag === "[@]") {
                thisMarkerName = "@";
              } else {
                thisMarkerName = thisMarkerName.replace(
                  flagChar,
                  convertToFlag,
                );
              }
              thisMarkerName = switchEasingName(thisMarkerName, easeType);
              thisMarkerValue.comment = thisMarkerName;
              myMarker.setValueAtTime(thisMarkerTime, thisMarkerValue);
            } else {
              if (convertToFlag === "[@]") {
                thisMarkerName = "@";
              } else {
                thisMarkerName = convertToFlag + thisMarkerName;
              }
              thisMarkerName = switchEasingName(thisMarkerName, easeType);
              thisMarkerValue.comment = thisMarkerName;
              myMarker.setValueAtTime(thisMarkerTime, thisMarkerValue);
            }
          }
        }
      }
      function switchEasingName(easedMarkerName, easeType) {
        if (easeType != "linear") {
          if (easeType == "easeIn") {
            easedMarkerName = "{" + easedMarkerName;
          }
          if (easeType == "easeOut") {
            easedMarkerName = easedMarkerName + "}";
          }
          if (easeType == "easeBoth") {
            easedMarkerName = "{" + easedMarkerName + "}";
          }
        }
        return easedMarkerName;
      }
      function switchEasing(easeType, supressWarnings, selectionIndex) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection.length < 1 && supressWarnings != true) {
          alert(
            "Marker Remap flags should only be applied to layer markers. Please select a layer.",
          );
          return;
        }
        if (mySelection.length < 1) {
          var myMarker = myComp.markerProperty;
        } else {
          var myLayer = mySelection[selectionIndex];
          var myMarker = myLayer.property("Marker");
        }
        if (selectionIndex == 0) {
          var thisMarker = getMarkerName("", selectionIndex);
        } else {
          var thisMarker = getMarkerName("check", selectionIndex);
        }
        if (getMarkerName("check", selectionIndex) != false) {
          var thisMarkerIndex = parseInt(thisMarker.index);
          var thisMarkerName = thisMarker.name;
          var thisMarkerTime = myMarker.keyTime(thisMarkerIndex);
          var thisMarkerValue = myMarker.keyValue(thisMarkerIndex);
          thisMarkerName = thisMarkerName.replace("{", "");
          thisMarkerName = thisMarkerName.replace("}", "");
          if (easeType == "easeIn") {
            thisMarkerName = "{" + thisMarkerName;
          }
          if (easeType == "easeOut") {
            thisMarkerName = thisMarkerName + "}";
          }
          if (easeType == "easeBoth") {
            thisMarkerName = "{" + thisMarkerName + "}";
          }
          thisMarkerValue.comment = thisMarkerName;
          myMarker.setValueAtTime(thisMarkerTime, thisMarkerValue);
        }
      }
      function clearFlags() {
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          switchEasing("", true);
          switchFlags("", true);
        }
        for (var i = 0; i < mySelection.length; i += 1) {
          switchEasing("", true, i);
          switchFlags("", true, i);
        }
      }
      function clearAllFlags() {
        var copiedMarkersTimeClone = [];
        var copiedMarkersValueClone = [];
        copiedMarkersTimeClone = copiedMarkersTime.slice(0);
        copiedMarkersValueClone = copiedMarkersValue.slice(0);
        var mySelection = app.project.activeItem.selectedLayers;
        var timeLineMode = false;
        if (mySelection < 1) {
          timeLineMode = true;
        }
        for (var j = 0; i < mySelection.length; j++) {
          copyMarkers(j);
          for (var i = 0; i < copiedMarkersValue.length; i += 1) {
            var thisMarkerName = copiedMarkersValue[i].comment;
            thisMarkerName = thisMarkerName.replace(/{/g, "");
            thisMarkerName = thisMarkerName.replace(/}/g, "");
            thisMarkerName = thisMarkerName.replace(/</g, "");
            thisMarkerName = thisMarkerName.replace(/@/g, "");
            thisMarkerName = thisMarkerName.replace(/%/g, "");
            if (timeLineMode == true) {
              thisMarkerName = thisMarkerName.split("=")[0];
            }
            copiedMarkersValue[i].comment = thisMarkerName;
          }
          pasteMarkers(0, "left", false, 0, true, j);
        }
        copiedMarkersTime = copiedMarkersTimeClone.slice(0);
        copiedMarkersValue = copiedMarkersValueClone.slice(0);
      }
      function updateListboxArray(listbox, listArray) {
        listbox.removeAll();
        var i = 0;
        while (listbox.items.length < listArray.length) {
          listbox.add("item", listArray[i]);
          i++;
        }
      }
      function extractMarkerList() {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        var markerNameList = [];
        if (mySelection.length > 0) {
          if (mySelection[0].source instanceof CompItem) {
            var compName = mySelection[0].source.name;
            copiedMarkersTime = [];
            copiedMarkersValue = [];
            var proj = app.project;
            for (var i = 1; i <= proj.numItems; i += 1) {
              if (proj.item(i).name === compName) {
                target = proj.item(i);
                var markers = target.markerProperty;
              }
            }
            if (markers.numKeys > 0) {
              for (var i = 1; i <= markers.numKeys; i += 1) {
                copiedMarkersTime.push(markers.keyTime(i));
                copiedMarkersValue.push(markers.keyValue(i));
              }
              for (var i = 0; i < copiedMarkersValue.length; i += 1) {
                var convertToFrames = parseInt(
                  copiedMarkersTime[i] * myComp.frameRate,
                ).pad(3);
                markerNameList.push(
                  i +
                    1 +
                    " - " +
                    convertToFrames +
                    " : " +
                    copiedMarkersValue[i].comment,
                );
              }
              return markerNameList;
            } else {
              markerNameList = [
                "There are no timeline markers",
                "to extract in this comp",
              ];
              return markerNameList;
            }
          } else {
            markerNameList = ["The selected item", "is not a comp"];
            return markerNameList;
          }
        } else {
          markerNameList = ["Select a comp"];
          return markerNameList;
        }
      }
      function extractAllMarkers() {
        var mySelection = app.project.activeItem.selectedLayers;
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection < 1) {
          alert("Select at least one pre-comp layer");
        } else {
          for (var j = 0; j < mySelection.length; j += 1) {
            try {
              var compName = mySelection[j].source.name;
              copiedMarkersTime = [];
              copiedMarkersValue = [];
              var proj = app.project;
              for (var i = 1; i <= proj.numItems; i += 1) {
                if (proj.item(i).name === compName) {
                  target = proj.item(i);
                  var markers = target.markerProperty;
                }
              }
              if (markers.numKeys == 0) {
                alert("This pre-comp has no timeline markers to extract.");
              } else {
                enableRetiming();
                for (var i = 1; i <= markers.numKeys; i += 1) {
                  isTrial = !r4.s();
                  mySelection[j]
                    .property("marker")
                    .setValueAtTime(
                      markers.keyTime(i) + mySelection[j].inPoint,
                      markers.keyValue(i),
                    );
                }
              }
            } catch (err) {
              alert("One of your layers is not a pre-comp layer");
            }
          }
        }
      }
      function extractSomeMarkers() {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection.length < 1) {
          alert("Select a pre-comp layer");
        } else if (mySelection[0].source instanceof CompItem) {
          if (mySelection.length > 1) {
            alert("Select only one pre-comp layer");
          } else {
            var compName = mySelection[0].source.name;
            copiedMarkersTime = [];
            copiedMarkersValue = [];
            var proj = app.project;
            for (var i = 1; i <= proj.numItems; i += 1) {
              if (proj.item(i).name === compName) {
                target = proj.item(i);
                var markers = target.markerProperty;
              }
            }
            if (markers.numKeys == 0) {
              alert("This pre-comp has no timeline markers to extract.");
            } else {
              enableRetiming();
              for (var i = 1; i <= markers.numKeys; i += 1) {
                copiedMarkersTime.push(
                  markers.keyTime(i) + mySelection[0].inPoint,
                );
                copiedMarkersValue.push(markers.keyValue(i));
              }
              var markerNameList = [];
              for (var i = 0; i < copiedMarkersValue.length; i += 1) {
                var convertToFrames = parseInt(
                  (copiedMarkersTime[i] - mySelection[0].inPoint) *
                    myComp.frameRate,
                ).pad(3);
                markerNameList.push(
                  i +
                    1 +
                    " - " +
                    convertToFrames +
                    " : " +
                    copiedMarkersValue[i].comment,
                );
              }
              var mr_markerlist = new Window("dialog");
              mr_markerlist.add(
                "statictext",
                undefined,
                "The following markers have been found in the selected pre-comp. Select ONE or MORE markers to extract. They will be placed at their respective timecodes.",
                { multiline: true },
              );
              var myList = mr_markerlist.add(
                "listbox",
                [0, 0, 200, 100],
                markerNameList,
                { multiselect: true },
              );
              mr_markerlist.add("button", undefined, "EXTRACT", { name: "ok" });
              mr_markerlist.add("button", undefined, "CANCEL", {
                name: "cancel",
              });
              if (mr_markerlist.show() == 1) {
                for (var i = 0; i <= copiedMarkersTime.length; i += 1) {
                  for (var k = 0; k < myList.selection.length; k += 1) {
                    var markerIndexArray =
                      myList.selection[k].text.split(" - ");
                    var markerIndex = parseInt(markerIndexArray[0]) - 1;
                    var markerNameArray = markerIndexArray[1].split(" : ");
                    var markerName = markerNameArray[1];
                    if (copiedMarkersValue[i].comment === markerName) {
                      myComp.selectedLayers[0]
                        .property("marker")
                        .setValueAtTime(
                          copiedMarkersTime[i],
                          copiedMarkersValue[i],
                        );
                    }
                  }
                }
              }
              exit();
            }
          }
        } else {
          alert("This layer is not a pre-comp. Please select a pre-comp layer");
        }
      }
      function bakeMarkers(mode) {
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        var oneFrame = 1 / myComp.frameRate;
        var frameRate = myComp.frameRate;
        var easingDetected = false;
        if (mySelection.length > 0) {
          for (var i = 0; i < mySelection.length; i += 1) {
            if (mySelection[i].source instanceof CompItem) {
              var markers = mySelection[i].property("marker");
              targetParam = mySelection[i].property("timeRemap");
              while (targetParam.numKeys != 1) {
                targetParam.removeKey(2);
              }
              var initialKeyframeValue = mySelection[i]
                .property("timeRemap")
                .valueAtTime(0, false);
              mySelection[i]
                .property("timeRemap")
                .setValueAtTime(0, initialKeyframeValue);
              mySelection[i]
                .property("timeRemap")
                .setInterpolationTypeAtKey(
                  1,
                  KeyframeInterpolationType.HOLD,
                  KeyframeInterpolationType.HOLD,
                );
              while (targetParam.numKeys != 1) {
                targetParam.removeKey(2);
              }
              for (var k = 1; k <= markers.numKeys; k += 1) {
                if (markers.numKeys > 1) {
                  if (k == markers.numKeys) {
                    var nextMarkerStartTime = mySelection[i].outPoint;
                  } else {
                    var nextMarkerStartTime = markers.keyTime(k + 1);
                  }
                } else {
                  var nextMarkerStartTime = mySelection[i].outPoint;
                }
                var mName = markers.keyValue(k).comment;
                var mStartTime = markers.keyTime(k);
                var mDuration = markers.keyValue(k).duration;
                var mFramesDuration = mDuration * frameRate;
                mFramesDuration = Math.round(mFramesDuration);
                var flagMode = "none";
                var intIn = {
                  end: KeyframeInterpolationType.LINEAR,
                  start: KeyframeInterpolationType.LINEAR,
                };
                var intOut = {
                  end: KeyframeInterpolationType.HOLD,
                  start: KeyframeInterpolationType.LINEAR,
                };
                var easeInDetected = false;
                var easeOutDetected = false;
                var easeType = "linear";
                if (mName.indexOf("{") > -1) {
                  var easeInDetected = true;
                  mName = mName.replace("{", "");
                  easeType = "easeIn";
                  intIn.start = KeyframeInterpolationType.LINEAR;
                  intIn.end = KeyframeInterpolationType.BEZIER;
                  intOut.start = KeyframeInterpolationType.LINEAR;
                }
                if (mName.indexOf("}") > -1) {
                  var easeOutDetected = true;
                  mName = mName.replace("}", "");
                  easeType = "easeOut";
                  intIn.start = KeyframeInterpolationType.LINEAR;
                  intIn.end = KeyframeInterpolationType.LINEAR;
                  intOut.start = KeyframeInterpolationType.BEZIER;
                }
                if (easeInDetected == true && easeOutDetected == true) {
                  easeType = "easeBoth";
                  intIn.start = KeyframeInterpolationType.LINEAR;
                  intIn.end = KeyframeInterpolationType.BEZIER;
                  intOut.start = KeyframeInterpolationType.BEZIER;
                }
                if (
                  easeType == "easeIn" ||
                  easeType == "easeOut" ||
                  easeType == "easeBoth"
                ) {
                  easingDetected = true;
                }
                if (mName == "@") {
                  flagMode = "loopSegment";
                } else if (mName.indexOf("@") > -1) {
                  flagMode = "loop";
                } else {
                  if (mName.indexOf("%") > -1) {
                    flagMode = "pingPong";
                    intOut.end = KeyframeInterpolationType.LINEAR;
                    if (easeType == "easeIn") {
                      intOut.end = KeyframeInterpolationType.BEZIER;
                    }
                    if (easeType == "easeBoth") {
                      intIn.start = KeyframeInterpolationType.BEZIER;
                      intOut.end = KeyframeInterpolationType.BEZIER;
                    }
                  }
                }
                var fullModeExists = false;
                if (mName.indexOf("=") > -1) {
                  fullModeExists = true;
                }
                var mappedModeExists = false;
                if (mName.indexOf(">") > -1) {
                  mappedModeExists = true;
                }
                if (flagMode != "loopSegment") {
                  var myValstart = mySelection[i]
                    .property("timeRemap")
                    .valueAtTime(mStartTime, false);
                  if (flagMode == "loop") {
                    var mEndTime = mStartTime + mDuration - oneFrame;
                  } else {
                    var mEndTime = mStartTime + mDuration;
                  }
                  var myValend = mySelection[i]
                    .property("timeRemap")
                    .valueAtTime(mEndTime, false);
                  mySelection[i]
                    .property("timeRemap")
                    .setValueAtTime(mStartTime, myValstart);
                  currentKey = mySelection[i]
                    .property("timeRemap")
                    .nearestKeyIndex(mStartTime);
                  mySelection[i]
                    .property("timeRemap")
                    .setInterpolationTypeAtKey(
                      currentKey,
                      intIn.start,
                      intIn.end,
                    );
                  if (
                    (mode == "exact" &&
                      (easeType == "easeIn" ||
                        easeType == "easeOut" ||
                        easeType == "easeBoth")) ||
                    mappedModeExists == true
                  ) {
                    var timeToFreeze = mStartTime;
                    if (flagMode == "loop") {
                      mFramesDuration = mFramesDuration - 1;
                    }
                    for (var n = 0; n <= mFramesDuration; n += 1) {
                      var myNewValstart = mySelection[i]
                        .property("timeRemap")
                        .valueAtTime(timeToFreeze, false);
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(timeToFreeze, myNewValstart);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(timeToFreeze);
                      if (n < mFramesDuration) {
                        mySelection[i]
                          .property("timeRemap")
                          .setInterpolationTypeAtKey(
                            currentKey,
                            KeyframeInterpolationType.LINEAR,
                            KeyframeInterpolationType.LINEAR,
                          );
                      } else {
                        mySelection[i]
                          .property("timeRemap")
                          .setInterpolationTypeAtKey(
                            currentKey,
                            KeyframeInterpolationType.LINEAR,
                            KeyframeInterpolationType.HOLD,
                          );
                      }
                      timeToFreeze = timeToFreeze + oneFrame;
                    }
                  }
                  mySelection[i]
                    .property("timeRemap")
                    .setValueAtTime(mEndTime, myValend);
                  currentKey = mySelection[i]
                    .property("timeRemap")
                    .nearestKeyIndex(mEndTime);
                  mySelection[i]
                    .property("timeRemap")
                    .setInterpolationTypeAtKey(
                      currentKey,
                      intOut.start,
                      intOut.end,
                    );
                }
                if (flagMode == "loop") {
                  var loopStartTime = mEndTime + oneFrame;
                  var loopEndTime = loopStartTime + (mDuration - oneFrame);
                  if (
                    (mode == "exact" &&
                      (easeType == "easeIn" ||
                        easeType == "easeOut" ||
                        easeType == "easeBoth")) ||
                    mappedModeExists == true
                  ) {
                    var timeToFreeze = loopStartTime;
                    var loopCounter = 1;
                    while (timeToFreeze < nextMarkerStartTime) {
                      var valueToFreeze = mySelection[i]
                        .property("timeRemap")
                        .valueAtTime(timeToFreeze, false);
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(timeToFreeze, valueToFreeze);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(timeToFreeze);
                      mySelection[i]
                        .property("timeRemap")
                        .setInterpolationTypeAtKey(
                          currentKey,
                          KeyframeInterpolationType.LINEAR,
                          KeyframeInterpolationType.LINEAR,
                        );
                      if (loopCounter % (mFramesDuration + 1) === 0) {
                        mySelection[i]
                          .property("timeRemap")
                          .setInterpolationTypeAtKey(
                            currentKey,
                            KeyframeInterpolationType.LINEAR,
                            KeyframeInterpolationType.HOLD,
                          );
                      }
                      loopCounter++;
                      timeToFreeze = timeToFreeze + oneFrame;
                    }
                  } else {
                    while (loopStartTime < nextMarkerStartTime) {
                      var lastLoopStartTime = loopStartTime;
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(loopStartTime, myValstart);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(loopStartTime);
                      mySelection[i]
                        .property("timeRemap")
                        .setInterpolationTypeAtKey(
                          currentKey,
                          intIn.start,
                          intIn.end,
                        );
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(loopEndTime, myValend);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(loopEndTime);
                      mySelection[i]
                        .property("timeRemap")
                        .setInterpolationTypeAtKey(
                          currentKey,
                          intOut.start,
                          intOut.end,
                        );
                      if (loopEndTime >= nextMarkerStartTime) {
                        if (
                          nextMarkerStartTime - lastLoopStartTime <=
                          oneFrame
                        ) {
                          mySelection[i]
                            .property("timeRemap")
                            .removeKey(currentKey);
                        } else {
                          mySelection[i]
                            .property("timeRemap")
                            .addKey(nextMarkerStartTime - oneFrame);
                          mySelection[i]
                            .property("timeRemap")
                            .removeKey(currentKey + 1);
                        }
                      }
                      loopStartTime = loopEndTime + oneFrame;
                      loopEndTime = loopStartTime + mDuration - oneFrame;
                    }
                  }
                }
                if (flagMode == "pingPong") {
                  var nextPingPong = mStartTime + mDuration * 2;
                  if (
                    (mode == "exact" &&
                      (easeType == "easeIn" ||
                        easeType == "easeOut" ||
                        easeType == "easeBoth")) ||
                    mappedModeExists == true
                  ) {
                    var timeToFreeze = mEndTime + oneFrame;
                    var loopCounter = 1;
                    while (timeToFreeze < nextMarkerStartTime) {
                      var valueToFreeze = mySelection[i]
                        .property("timeRemap")
                        .valueAtTime(timeToFreeze, false);
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(timeToFreeze, valueToFreeze);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(timeToFreeze);
                      mySelection[i]
                        .property("timeRemap")
                        .setInterpolationTypeAtKey(
                          currentKey,
                          KeyframeInterpolationType.LINEAR,
                          KeyframeInterpolationType.LINEAR,
                        );
                      if (loopCounter % mFramesDuration === 0) {
                        mySelection[i]
                          .property("timeRemap")
                          .setInterpolationTypeAtKey(
                            currentKey,
                            KeyframeInterpolationType.LINEAR,
                            KeyframeInterpolationType.HOLD,
                          );
                      }
                      loopCounter++;
                      timeToFreeze = timeToFreeze + oneFrame;
                    }
                  } else {
                    var value01 = true;
                    var value02 = false;
                    while (nextPingPong < nextMarkerStartTime) {
                      if (value01 == true) {
                        mySelection[i]
                          .property("timeRemap")
                          .setValueAtTime(nextPingPong, myValstart);
                        currentKey = mySelection[i]
                          .property("timeRemap")
                          .nearestKeyIndex(nextPingPong);
                        mySelection[i]
                          .property("timeRemap")
                          .setInterpolationTypeAtKey(
                            currentKey,
                            intIn.start,
                            intIn.end,
                          );
                        value01 = false;
                        value02 = true;
                      } else {
                        if (value02 == true) {
                          mySelection[i]
                            .property("timeRemap")
                            .setValueAtTime(nextPingPong, myValend);
                          currentKey = mySelection[i]
                            .property("timeRemap")
                            .nearestKeyIndex(nextPingPong);
                          mySelection[i]
                            .property("timeRemap")
                            .setInterpolationTypeAtKey(
                              currentKey,
                              intIn.start,
                              intIn.end,
                            );
                          value02 = false;
                          value01 = true;
                        }
                      }
                      nextPingPong = nextPingPong + mDuration;
                      if (nextPingPong >= nextMarkerStartTime) {
                        if (value01 == true) {
                          mySelection[i]
                            .property("timeRemap")
                            .setValueAtTime(nextPingPong, myValstart);
                          currentKey = mySelection[i]
                            .property("timeRemap")
                            .nearestKeyIndex(nextPingPong);
                          mySelection[i]
                            .property("timeRemap")
                            .setInterpolationTypeAtKey(
                              currentKey,
                              intIn.start,
                              intIn.end,
                            );
                        } else {
                          if (value02 == true) {
                            mySelection[i]
                              .property("timeRemap")
                              .setValueAtTime(nextPingPong, myValend);
                            currentKey = mySelection[i]
                              .property("timeRemap")
                              .nearestKeyIndex(nextPingPong);
                            mySelection[i]
                              .property("timeRemap")
                              .setInterpolationTypeAtKey(
                                currentKey,
                                intIn.start,
                                intIn.end,
                              );
                          }
                        }
                        mySelection[i]
                          .property("timeRemap")
                          .addKey(nextMarkerStartTime - oneFrame);
                        mySelection[i]
                          .property("timeRemap")
                          .removeKey(currentKey + 1);
                      }
                    }
                  }
                }
                if (flagMode == "loopSegment") {
                  var prevStartTime = markers.keyTime(k - 1);
                  var prevDuration = markers.keyValue(k - 1).duration;
                  var loopStartTime = mStartTime;
                  var loopEndTime = mStartTime + prevDuration - oneFrame;
                  if (
                    (mode == "exact" &&
                      (easeType == "easeIn" ||
                        easeType == "easeOut" ||
                        easeType == "easeBoth")) ||
                    mappedModeExists == true
                  ) {
                    var timeToFreeze = loopStartTime;
                    var loopCounter = 1;
                    while (timeToFreeze < nextMarkerStartTime) {
                      var valueToFreeze = mySelection[i]
                        .property("timeRemap")
                        .valueAtTime(timeToFreeze, false);
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(timeToFreeze, valueToFreeze);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(timeToFreeze);
                      mySelection[i]
                        .property("timeRemap")
                        .setInterpolationTypeAtKey(
                          currentKey,
                          KeyframeInterpolationType.LINEAR,
                          KeyframeInterpolationType.LINEAR,
                        );
                      if (loopCounter % (mFramesDuration + 1) === 0) {
                        mySelection[i]
                          .property("timeRemap")
                          .setInterpolationTypeAtKey(
                            currentKey,
                            KeyframeInterpolationType.LINEAR,
                            KeyframeInterpolationType.HOLD,
                          );
                      }
                      loopCounter++;
                      timeToFreeze = timeToFreeze + oneFrame;
                    }
                  } else {
                    var myValstart = mySelection[i]
                      .property("timeRemap")
                      .valueAtTime(prevStartTime, false);
                    var myValend = mySelection[i]
                      .property("timeRemap")
                      .valueAtTime(prevStartTime + prevDuration, false);
                    while (loopStartTime < mStartTime + mDuration) {
                      var lastLoopStartTime = loopStartTime;
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(loopStartTime, myValstart);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(loopStartTime);
                      mySelection[i]
                        .property("timeRemap")
                        .setInterpolationTypeAtKey(
                          currentKey,
                          intIn.start,
                          intIn.end,
                        );
                      mySelection[i]
                        .property("timeRemap")
                        .setValueAtTime(loopEndTime, myValend);
                      currentKey = mySelection[i]
                        .property("timeRemap")
                        .nearestKeyIndex(loopEndTime);
                      mySelection[i]
                        .property("timeRemap")
                        .setInterpolationTypeAtKey(
                          currentKey,
                          intOut.start,
                          intOut.end,
                        );
                      if (loopEndTime >= nextMarkerStartTime) {
                        if (
                          nextMarkerStartTime - lastLoopStartTime <=
                          oneFrame
                        ) {
                          mySelection[i]
                            .property("timeRemap")
                            .removeKey(currentKey);
                        } else {
                          mySelection[i]
                            .property("timeRemap")
                            .addKey(nextMarkerStartTime - oneFrame);
                          mySelection[i]
                            .property("timeRemap")
                            .removeKey(currentKey + 1);
                        }
                      }
                      loopStartTime = loopEndTime + oneFrame;
                      loopEndTime = loopStartTime + prevDuration - oneFrame;
                    }
                  }
                }
              }
              mySelection[i].property("timeRemap").expression = "";
            }
          }
          if (easingDetected == true && mode != "exact") {
            alert(
              "NOTE: Any marker spans with easing flags have been converted to default EaseIn and EaseOut keyframes. Due to current AE scripting algorithms, these may differ from Marker Remap\'s easing calculations and may behave with slightly different Velocities. \n\nFor a one-to-one bake, undo this action and\nbake using \'EXACT MODE\' by pressing ALT+BAKE KEYFRAMES",
            );
          }
        } else {
          alert("Select one or more layers to bake.");
        }
      }
      function findLayer(curComp, name) {
        for (var i = 1; i <= curComp.numLayers; i += 1) {
          var curItem = curComp.layer(i);
          if (curItem.name === name) {
            return curItem;
          }
        }
      }
      var mrPanel =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", "Panel Name", [0, 0, 0, 0]);
      var grp = mrPanel.add(
        "group {orientation:\'column\', borderStyle:\'none\', alignment:[\'center\', \'top\'], alignChildren:[\'center\', \'top\']}",
      );
      var panel_tabs = grp.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_hoverNotice = grp.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var panelsGroup = grp.add(
        "group {alignment:[\'center\', \'top\'], alignChildren:[\'center\', \'top\']}",
      );
      panelsGroup.orientation = "stack";
      var panel_setup = panelsGroup.add(
        "group{orientation:\'column\', alignment:[\'fill\', \'top\'], alignChildren:[\'center\', \'top\']}",
      );
      var group_addMarkers = panel_setup.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_enableRetiming = panel_setup.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_extractAllSomeLabel = panel_setup.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_extractAllSome = panel_setup.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_markerList = panel_setup.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_allControls = panel_setup.add(
        "group{orientation:\'stack\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var panel_edit = panelsGroup.add(
        "group{orientation:\'column\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_copyPaste = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_delAll = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_shift = panel_edit.add(
        "group{ orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'center\']}",
      );
      var group_shiftLabels = group_shift.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_shiftButtons = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_duration = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_inOut = group_duration.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_durationFramesInput = group_duration.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_durationFrames = group_duration.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_fit = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_range = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_addFlagsLabel = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_addFlags = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_ease01 = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'fill\', \'top\'], alignChildren:[\'left\', \'top\']}",
      );
      var group_clearFlags = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left \', \'top\']}",
      );
      var group_bakeMarkers = panel_edit.add(
        "group{orientation:\'row\', alignment:[\'left\', \'top\'], alignChildren:[\'left \', \'top\']}",
      );
      var imgAddMarker = __BLOB__BLOB_000337__;
      var imgBakeMarkers = __BLOB__BLOB_000338__;
      var imgCopy = __BLOB__BLOB_000339__;
      var imgCutDelete = __BLOB__BLOB_000340__;
      var imgDialogueBottom = __BLOB__BLOB_000341__;
      var imgDialogueSingle = __BLOB__BLOB_000342__;
      var imgDialogueTop = __BLOB__BLOB_000343__;
      var imgEditOff = __BLOB__BLOB_000344__;
      var imgEditOn = __BLOB__BLOB_000345__;
      var imgEnableRetiming = __BLOB__BLOB_000346__;
      var imgExtractAllMarkers = __BLOB__BLOB_000347__;
      var imgExtractOneToCurrent = __BLOB__BLOB_000348__;
      var imgFitBoth = __BLOB__BLOB_000349__;
      var imgFitLeft = __BLOB__BLOB_000350__;
      var imgFitRight = __BLOB__BLOB_000351__;
      var imgFlagClear = __BLOB__BLOB_000352__;
      var imgFlagClearAll = __BLOB__BLOB_000353__;
      var imgFlagEaseBoth = __BLOB__BLOB_000354__;
      var imgFlagEaseIn = __BLOB__BLOB_000355__;
      var imgFlagEaseOut = __BLOB__BLOB_000356__;
      var imgFlagLoop = __BLOB__BLOB_000357__;
      var imgFlagLoopSegment = __BLOB__BLOB_000358__;
      var imgFlagPingPong = __BLOB__BLOB_000359__;
      var imgFlagReverse = __BLOB__BLOB_000360__;
      var imgHelptips = __BLOB__BLOB_000361__;
      var imgIndicates = __BLOB__BLOB_000362__;
      var imgLabelExtract = __BLOB__BLOB_000363__;
      var imgLabelFlags = __BLOB__BLOB_000364__;
      var imgLabelShiftnext = __BLOB__BLOB_000365__;
      var imgPaste = __BLOB__BLOB_000366__;
      var imgSetFrames = __BLOB__BLOB_000367__;
      var imgSetIn = __BLOB__BLOB_000368__;
      var imgSetOut = __BLOB__BLOB_000369__;
      var imgShiftLeft = __BLOB__BLOB_CLEANED__;
      var imgShiftRight = __BLOB__BLOB_000370__;
      var imgShiftToPlayhead = __BLOB__BLOB_000371__;
      var imgToggleRange = __BLOB__BLOB_000372__;
      var btn_setup = panel_tabs.add("iconbutton", [0, 0, 45, 20], undefined, {
        style: "toolbutton",
      });
      btn_setup.text = "SETUP";
      var btn_edit = panel_tabs.add("iconbutton", [0, 0, 35, 20], undefined, {
        style: "toolbutton",
      });
      btn_edit.text = "EDIT";
      var btn_help = panel_tabs.add("iconbutton", [0, 0, 20, 20], undefined, {
        style: "toolbutton",
      });
      btn_help.text = "?";
      var hoverNotice = group_hoverNotice.add("image", undefined, imgHelptips);
      var btn_addLayerMarker = group_addMarkers.add(
        "iconbutton",
        [1, 0, 162, 40],
        ScriptUI.newImage(
          imgAddMarker,
          imgAddMarker,
          imgAddMarker,
          imgAddMarker,
        ),
        { style: "toolbutton" },
      );
      var btn_TriggerMarkers = group_enableRetiming.add(
        "iconbutton",
        [1, 0, 162, 40],
        ScriptUI.newImage(
          imgEnableRetiming,
          imgEnableRetiming,
          imgEnableRetiming,
          imgEnableRetiming,
        ),
        { style: "toolbutton" },
      );
      btn_addLayerMarker.helpTip =
        "Add markers to selected layer or timeline (nothing selected)\n[+SHIFT : Automatically add one timeline marker per frame for length of comp]\n[+ALT : Automatically add timeline marker to length of comp]";
      btn_TriggerMarkers.helpTip =
        "Enables marker retiming on selected comp(s)\n[+ALT : Automatically applies Marker Remap setup on selected comp(s): Enables retiming, adds a layer marker and full length internal timeline marker]";
      var labelExtract = group_extractAllSomeLabel.add(
        "image",
        undefined,
        imgLabelExtract,
      );
      var btn_extractSelMarkers = group_extractAllSome.add(
        "iconbutton",
        [1, 0, 135, 22],
        ScriptUI.newImage(
          imgExtractAllMarkers,
          imgExtractAllMarkers,
          imgExtractAllMarkers,
          imgExtractAllMarkers,
        ),
        { style: "toolbutton" },
      );
      btn_extractSelMarkers.helpTip =
        "Extract all comp timeline markers as layer markers";
      var btn_extractOptions = group_extractAllSome.add(
        "iconbutton",
        [1, 0, 31, 22],
        ScriptUI.newImage(
          imgDialogueSingle,
          imgDialogueSingle,
          imgDialogueSingle,
          imgDialogueSingle,
        ),
        { style: "toolbutton" },
      );
      btn_extractOptions.helpTip =
        "Dialogue box to extract select comp timeline markers as layer markers";
      var btn_extractSelMarkersToCurrentTime = group_extractAllSome.add(
        "iconbutton",
        [1, 0, 51, 22],
        ScriptUI.newImage(
          imgExtractOneToCurrent,
          imgExtractOneToCurrent,
          imgExtractOneToCurrent,
          imgExtractOneToCurrent,
        ),
        { style: "toolbutton" },
      );
      btn_extractSelMarkersToCurrentTime.visible = false;
      btn_extractSelMarkersToCurrentTime.helpTip =
        "Dialogue box to extract one comp timeline marker as layer marker (with options)";
      var markerList = group_markerList.add(
        "listbox",
        [0, 0, 160, 170],
        [
          "EXTRACT ONE MARKER",
          "TO CURRENT TIME:",
          "Select a comp layer,",
          "then hover over this box to",
          "select a marker",
        ],
        { multiselect: false },
      );
      var btn_copyAllMarkers = group_copyPaste.add(
        "iconbutton",
        [1, 0, 80, 22],
        ScriptUI.newImage(imgCopy, imgCopy, imgCopy, imgCopy),
        { style: "toolbutton" },
      );
      btn_copyAllMarkers.helpTip =
        "Copy marker at current time\n[+SHIFT : Copy markers within work area]\n[+ALT : Copy all markers]";
      var btn_pasteMarkers = group_copyPaste.add(
        "iconbutton",
        [1, 0, 54, 22],
        ScriptUI.newImage(imgPaste, imgPaste, imgPaste, imgPaste),
        { style: "toolbutton" },
      );
      btn_pasteMarkers.helpTip =
        "Paste marker(s) at current time\n[+ALT : Paste (and replace) all markers at source times]";
      var btn_pasteOptions = group_copyPaste.add(
        "iconbutton",
        [1, 0, 31, 22],
        ScriptUI.newImage(
          imgDialogueTop,
          imgDialogueTop,
          imgDialogueTop,
          imgDialogueTop,
        ),
        { style: "toolbutton" },
      );
      btn_pasteOptions.helpTip = "Dialogue box to paste selected markers";
      var btn_deleteMarkers = group_delAll.add(
        "iconbutton",
        [1, 0, 134, 22],
        ScriptUI.newImage(
          imgCutDelete,
          imgCutDelete,
          imgCutDelete,
          imgCutDelete,
        ),
        { style: "toolbutton" },
      );
      btn_deleteMarkers.helpTip =
        "Delete markers at current time\n[+SHIFT : Delete markers within work area]\n[+ALT : Delete all markers]";
      var btn_deleteOptions = group_delAll.add(
        "iconbutton",
        [1, 0, 31, 22],
        ScriptUI.newImage(
          imgDialogueBottom,
          imgDialogueBottom,
          imgDialogueBottom,
          imgDialogueBottom,
        ),
        { style: "toolbutton" },
      );
      btn_deleteOptions.helpTip =
        "Dialogue box to cut or delete selected markers";
      var btn_allControls = group_allControls.add(
        "iconbutton",
        [1, 0, 162, 17],
        ScriptUI.newImage(imgEditOn, imgEditOn, imgEditOn, imgEditOn),
        { style: "toolbutton" },
      );
      btn_allControls.helpTip = "Toggles between tabbed UI and single panel UI";
      var btn_allControlsOFF = group_allControls.add(
        "iconbutton",
        [1, 0, 162, 17],
        ScriptUI.newImage(imgEditOff, imgEditOff, imgEditOff, imgEditOff),
        { style: "toolbutton" },
      );
      btn_allControlsOFF.helpTip =
        "Toggles between tabbed UI and single panel UI";
      btn_allControlsOFF.visible = false;
      btn_allControlsOFF.enabled = false;
      var shiftLabel = group_shiftLabels.add(
        "image",
        [0, 0, 64, 20],
        imgLabelShiftnext,
      );
      var radioNextAll = group_shiftLabels.add(
        "radiobutton",
        [0, 0, 45, 20],
        "ALL ",
      );
      var radioNextAmount = group_shiftLabels.add(
        "radiobutton",
        [0, 0, 18, 20],
        "",
      );
      radioNextAll.value = true;
      var inputNextAmount = group_shift.add("edittext", [0, 0, 34, 23], "2");
      inputNextAmount.onChange = function () {
        radioNextAmount.value = true;
      };
      group_shiftLabels.minimumSize.height = 23;
      group_shiftLabels.alignment = ["left", "center"];
      group_shiftLabels.alignChildren = ["left", "center"];
      var btn_markerToTime = group_shiftButtons.add(
        "iconbutton",
        [1, 0, 45, 22],
        ScriptUI.newImage(
          imgShiftToPlayhead,
          imgShiftToPlayhead,
          imgShiftToPlayhead,
          imgShiftToPlayhead,
        ),
        { style: "toolbutton" },
      );
      var btn_markerLeft1 = group_shiftButtons.add(
        "iconbutton",
        [1, 0, 57, 22],
        ScriptUI.newImage(
          imgShiftLeft,
          imgShiftLeft,
          imgShiftLeft,
          imgShiftLeft,
        ),
        { style: "toolbutton" },
      );
      var btn_markerRight1 = group_shiftButtons.add(
        "iconbutton",
        [1, 0, 57, 22],
        ScriptUI.newImage(
          imgShiftRight,
          imgShiftRight,
          imgShiftRight,
          imgShiftRight,
        ),
        { style: "toolbutton" },
      );
      btn_markerToTime.helpTip =
        "Shift next markers to current time\n[+ALT : Only apply to next marker]";
      btn_markerLeft1.helpTip =
        "Shift next markers back 1 frame\n[+SHIFT : 10 frames]\n[+ALT : Only apply to next marker]";
      btn_markerRight1.helpTip =
        "Shift next markers forward 1 frame\n[+SHIFT : 10 frames]\n[+ALT : Only apply to next marker]";
      var btn_setInpoint = group_inOut.add(
        "iconbutton",
        [1, 0, 48, 22],
        ScriptUI.newImage(imgSetIn, imgSetIn, imgSetIn, imgSetIn),
        { style: "toolbutton" },
      );
      var btn_setOutpoint = group_inOut.add(
        "iconbutton",
        [1, 0, 48, 22],
        ScriptUI.newImage(imgSetOut, imgSetOut, imgSetOut, imgSetOut),
        { style: "toolbutton" },
      );
      var inputFrameDuration = group_durationFramesInput.add(
        "edittext",
        [0, 0, 34, 25],
        "10",
      );
      var btn_setFrameDuration = group_durationFrames.add(
        "iconbutton",
        [1, 0, 25, 22],
        ScriptUI.newImage(
          imgSetFrames,
          imgSetFrames,
          imgSetFrames,
          imgSetFrames,
        ),
        { style: "toolbutton" },
      );
      btn_setInpoint.helpTip =
        "Set inpoint of marker at current frame\n(or next marker, if between frames) ";
      btn_setOutpoint.helpTip =
        "Set outpoint of marker at current frame\n(or previous marker, if between frames)";
      btn_setFrameDuration.helpTip = "Set duration of marker at current frame";
      var btn_fitLeft = group_fit.add(
        "iconbutton",
        [1, 0, 52, 22],
        ScriptUI.newImage(imgFitLeft, imgFitLeft, imgFitLeft, imgFitLeft),
        { style: "toolbutton" },
      );
      var btn_fitBoth = group_fit.add(
        "iconbutton",
        [1, 0, 53, 22],
        ScriptUI.newImage(imgFitBoth, imgFitBoth, imgFitBoth, imgFitBoth),
        { style: "toolbutton" },
      );
      var btn_fitRight = group_fit.add(
        "iconbutton",
        [1, 0, 53, 22],
        ScriptUI.newImage(imgFitRight, imgFitRight, imgFitRight, imgFitRight),
        { style: "toolbutton" },
      );
      btn_fitLeft.helpTip =
        "Shift current marker\'s inpoint to meet previous marker";
      btn_fitBoth.helpTip =
        "Shift current marker\'s in and out points to meet previous and next markers";
      btn_fitRight.helpTip =
        "Shift current marker\'s outpoint to meet next marker";
      var rangeSlider = group_range.add("slider", [0, 0, 90, 25], 100, 0, 100);
      var rangeValue = group_range.add("edittext", [0, 0, 34, 25], 100);
      var group_rangeToggle = group_range.add("group");
      var rangeToggle = group_rangeToggle.add(
        "iconbutton",
        [1, 0, 30, 22],
        ScriptUI.newImage(
          imgToggleRange,
          imgToggleRange,
          imgToggleRange,
          imgToggleRange,
        ),
        { style: "toolbutton" },
      );
      rangeSlider.helpTip = "Set how much of the target sequence is mapped";
      rangeToggle.helpTip = "Toggle between Full Mode and Mapped Mode";
      group_addFlagsLabel.add("image", undefined, imgLabelFlags);
      var btn_flagReverse = group_addFlags.add(
        "iconbutton",
        [1, 0, 30, 22],
        ScriptUI.newImage(
          imgFlagReverse,
          imgFlagReverse,
          imgFlagReverse,
          imgFlagReverse,
        ),
        { style: "toolbutton" },
      );
      var btn_flagLoop = group_addFlags.add(
        "iconbutton",
        [1, 0, 30, 22],
        ScriptUI.newImage(imgFlagLoop, imgFlagLoop, imgFlagLoop, imgFlagLoop),
        { style: "toolbutton" },
      );
      var btn_flagLoopSegment = group_addFlags.add(
        "iconbutton",
        [1, 0, 30, 22],
        ScriptUI.newImage(
          imgFlagLoopSegment,
          imgFlagLoopSegment,
          imgFlagLoopSegment,
          imgFlagLoopSegment,
        ),
        { style: "toolbutton" },
      );
      var btn_flagPingPong = group_addFlags.add(
        "iconbutton",
        [1, 0, 30, 22],
        ScriptUI.newImage(
          imgFlagPingPong,
          imgFlagPingPong,
          imgFlagPingPong,
          imgFlagPingPong,
        ),
        { style: "toolbutton" },
      );
      group_addFlags.add("statictext", [0, 0, 5, 22], "");
      var btn_flagClear = group_addFlags.add(
        "iconbutton",
        [1, 0, 30, 22],
        ScriptUI.newImage(
          imgFlagClear,
          imgFlagClear,
          imgFlagClear,
          imgFlagClear,
        ),
        { style: "toolbutton" },
      );
      btn_flagReverse.helpTip = "Time-reverse";
      btn_flagClear.helpTip = "Normal";
      btn_flagLoop.helpTip = "Loop";
      btn_flagLoopSegment.helpTip = "Loop Segment";
      btn_flagPingPong.helpTip = "Ping-pong";
      var btn_easeIn = group_ease01.add(
        "iconbutton",
        [1, 0, 40, 22],
        ScriptUI.newImage(
          imgFlagEaseIn,
          imgFlagEaseIn,
          imgFlagEaseIn,
          imgFlagEaseIn,
        ),
        { style: "toolbutton" },
      );
      var btn_easeBoth = group_ease01.add(
        "iconbutton",
        [1, 0, 42, 22],
        ScriptUI.newImage(
          imgFlagEaseBoth,
          imgFlagEaseBoth,
          imgFlagEaseBoth,
          imgFlagEaseBoth,
        ),
        { style: "toolbutton" },
      );
      var btn_easeOut = group_ease01.add(
        "iconbutton",
        [1, 0, 39, 22],
        ScriptUI.newImage(
          imgFlagEaseOut,
          imgFlagEaseOut,
          imgFlagEaseOut,
          imgFlagEaseOut,
        ),
        { style: "toolbutton" },
      );
      group_ease01.add("statictext", [0, 0, 5, 22], "");
      var btn_easeClear = group_ease01.add(
        "iconbutton",
        [1, 0, 30, 22],
        ScriptUI.newImage(
          imgFlagClear,
          imgFlagClear,
          imgFlagClear,
          imgFlagClear,
        ),
        { style: "toolbutton" },
      );
      btn_easeIn.helpTip = "Ease In";
      btn_easeBoth.helpTip = "Ease Both";
      btn_easeOut.helpTip = "Ease Out";
      btn_easeClear.helpTip = "Linear";
      var btn_clearAllFlags = group_clearFlags.add(
        "iconbutton",
        [1, 0, 162, 22],
        ScriptUI.newImage(
          imgFlagClearAll,
          imgFlagClearAll,
          imgFlagClearAll,
          imgFlagClearAll,
        ),
        { style: "toolbutton" },
      );
      btn_clearAllFlags.helpTip =
        "Clear flags from this marker\n[+ALT : Clear all flags from all markers on this layer]";
      var btn_bakeMarkers = group_bakeMarkers.add(
        "iconbutton",
        [1, 0, 162, 22],
        ScriptUI.newImage(
          imgBakeMarkers,
          imgBakeMarkers,
          imgBakeMarkers,
          imgBakeMarkers,
        ),
        { style: "toolbutton" },
      );
      btn_bakeMarkers.helpTip =
        "Bakes all Marker Remap ranges into keyframes\n[+ALT : EXACT MODE - Bakes individual keyframes for markers with easing applied. See Help for more details.]";
      var leftMargin = 0;
      group_hoverNotice.margins = [5, -8, 0, 0];
      group_addMarkers.margins = [leftMargin, -3, -5, 0];
      group_enableRetiming.margins = [leftMargin, -8, 0, 3];
      group_extractAllSomeLabel.margins = [leftMargin, -7, 0, 0];
      group_extractAllSome.margins = [leftMargin, -7, 0, 0];
      group_extractAllSome.spacing = 1;
      group_copyPaste.margins = [leftMargin, 0, 0, 0];
      group_copyPaste.spacing = 1;
      btn_pasteMarkers.margins = [2, 0, 0, 0];
      group_delAll.margins = [leftMargin, -8, 0, 0];
      group_delAll.spacing = 1;
      group_allControls.margins = [leftMargin, 0, 0, 0];
      group_shift.margins = [leftMargin, 0, 0, 0];
      group_shift.spacing = 0;
      group_shiftLabels.margins = [0, 5, 0, 0];
      group_shiftLabels.spacing = 0;
      group_shiftButtons.margins = [leftMargin, -9, 0, 0];
      group_shiftButtons.spacing = 2;
      group_duration.margins = [leftMargin, 3, 0, 0];
      group_inOut.margins = [leftMargin, 2, 0, 0];
      group_inOut.spacing = 2;
      group_fit.margins = [leftMargin, 2, 0, 0];
      group_fit.spacing = 2;
      group_range.margins = [leftMargin, 0, 0, 0];
      group_range.spacing = 2;
      group_rangeToggle.margins = [2, 2, 0, 0];
      group_durationFramesInput.margins = [-4, 0, 0, 0];
      group_durationFramesInput.spacing = 0;
      group_durationFrames.margins = [-10, 2, 0, 0];
      group_durationFrames.spacing = 0;
      group_addFlagsLabel.margins = [leftMargin, -2, 0, 0];
      group_addFlags.margins = [leftMargin, -4, 0, 0];
      group_addFlags.spacing = 2;
      group_ease01.margins = [leftMargin, -5, 0, 0];
      group_ease01.spacing = 2;
      group_clearFlags.margins = [leftMargin, -2, 0, 0];
      group_clearFlags.spacing = 2;
      grp.maximumSize.width = 161;
      var isTrial = r4.t();
      panel_edit.enabled = false;
      panel_edit.visible = false;
      var mode = "compact";
      mrPanel.onResizing = mrPanel.onResize = function () {
        mrPanel.layout.resize();
      };
      btn_setup.onClick = function () {
        panel_setup.enabled = true;
        panel_setup.visible = true;
        panel_edit.visible = false;
        panel_edit.enabled = false;
        btn_allControls.enabled = true;
        btn_allControls.visible = true;
        btn_allControlsOFF.enabled = false;
        btn_allControlsOFF.visible = false;
        this.active = true;
        this.active = false;
      };
      btn_edit.onClick = function () {
        if (mode == "full") {
          mode = "compact";
          panelsGroup.orientation = "stack";
          updateUILayout(panelsGroup);
        }
        panel_setup.visible = false;
        panel_setup.enabled = false;
        panel_edit.enabled = true;
        panel_edit.visible = true;
        updateUILayout(panelsGroup);
        mrPanel.layout.resize();
        this.active = true;
        this.active = false;
      };
      btn_help.onClick = function () {
        r4.helpUI();
        updateUILayout(panelsGroup);
        mrPanel.layout.resize();
        this.active = true;
        this.active = false;
      };
      btn_allControls.onClick = function () {
        if (mode == "compact") {
          mode = "full";
          panelsGroup.orientation = "column";
          updateUILayout(panelsGroup);
        }
        removeTabButtons();
        panel_edit.enabled = true;
        panel_edit.visible = true;
        btn_allControls.enabled = false;
        btn_allControls.visible = false;
        btn_allControlsOFF.enabled = true;
        btn_allControlsOFF.visible = true;
        mrPanel.layout.resize();
        this.active = true;
        this.active = false;
      };
      btn_allControlsOFF.onClick = function () {
        addTabButtons();
        panel_edit.enabled = false;
        panel_edit.visible = false;
        btn_allControls.enabled = true;
        btn_allControls.visible = true;
        btn_allControlsOFF.enabled = false;
        btn_allControlsOFF.visible = false;
        mrPanel.layout.resize();
        this.active = true;
        this.active = false;
      };
      Number.prototype.pad = function (size) {
        var s = String(this);
        while (s.length < size || 2) {
          s = "0" + s;
        }
        return s;
      };
      btn_TriggerMarkers.onClick = function () {
        app.beginUndoGroup("Time Remap Marker Retiming");
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        if (isAltPressed == true) {
          enableRetiming("auto");
        } else {
          enableRetiming();
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_addLayerMarker.onClick = function () {
        app.beginUndoGroup("Add Layer Marker");
        var isShiftPressed = ScriptUI.environment.keyboardState.shiftKey;
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        var myComp = app.project.activeItem;
        var oneFrame = 1 / myComp.frameRate;
        if (isAltPressed === true) {
          var activeCompName = myComp.name;
          var compMarker = new MarkerValue(activeCompName);
          var shiftRate = (1 / myComp.frameRate).toFixed(3);
          compMarker.duration = roundToNearestFrameinTime(
            myComp.duration - parseFloat(oneFrame),
          );
          myComp.markerProperty.setValueAtTime(0, compMarker);
        } else if (isShiftPressed === true) {
          var compLength = parseInt(myComp.duration * myComp.frameRate);
          for (var i = 0; i < compLength; i += 1) {
            var compMarker = new MarkerValue(i);
            var currentTime = i / myComp.frameRate;
            compMarker.duration = 0;
            myComp.markerProperty.setValueAtTime(currentTime, compMarker);
          }
        } else {
          var mySelection = app.project.activeItem.selectedLayers;
          if (mySelection < 1) {
            var myCompMarkerNameEntry = prompt(
              "Enter timeline marker name(s):\nSET FRAME DURATION OPTIONS\n\u2022 One second (default) - \u201cname\u201d\n\u2022 Number of frames - \u201cname:10\u201d\n\u2022 Equal durations - \u201cnameA=nameB=nameC:10\u201d\n\u2022 Batch add - \u201cnameA:10,nameB:20,nameC:5\u201d\n\u2022 Fit between existing markers - \u201cname:\u201d\n",
              "name",
            );
            myCompMarkerNameEntry = myCompMarkerNameEntry.split(",");
            var startTime = app.project.activeItem.time;
            for (var i = 0; i < myCompMarkerNameEntry.length; i += 1) {
              if (myCompMarkerNameEntry[i].indexOf(":") > -1) {
                var nameSplit = myCompMarkerNameEntry[i].split(":");
                var myCompMarkerName = nameSplit[0];
                var markerDuration = 0;
                if (nameSplit[1] != "") {
                  var nameArray = myCompMarkerName.split("=");
                  for (var j = 0; j < nameArray.length; j += 1) {
                    var compMarker = new MarkerValue(nameArray[j]);
                    markerDuration = (
                      parseInt(nameSplit[1]) / myComp.frameRate
                    ).toFixed(4);
                    compMarker.duration = markerDuration;
                    myComp.markerProperty.setValueAtTime(startTime, compMarker);
                    startTime +=
                      parseFloat(markerDuration) + parseFloat(oneFrame);
                    startTime = roundToNearestFrameinTime(startTime);
                  }
                } else {
                  if (myCompMarkerNameEntry.length === 1) {
                    var compMarker = new MarkerValue(myCompMarkerName);
                    var oneFrame = (1 / myComp.frameRate).toFixed(3);
                    var prevMarkerTime = findPrevMarkerTime();
                    var nextMarkerTime = findNextMarkerTime();
                    if (prevMarkerTime.start === undefined) {
                      markerStart = 0;
                    } else {
                      markerStart =
                        parseFloat(prevMarkerTime.start) +
                        parseFloat(prevMarkerTime.duration) +
                        parseFloat(oneFrame);
                      markerStart = roundToNearestFrameinTime(markerStart);
                    }
                    if (nextMarkerTime.start === undefined) {
                      markerEnd = myComp.duration - parseFloat(oneFrame);
                    } else {
                      markerEnd = nextMarkerTime.start - parseFloat(oneFrame);
                    }
                    markerDuration =
                      parseFloat(markerEnd) - parseFloat(markerStart);
                    markerDuration = roundToNearestFrameinTime(markerDuration);
                    if (markerDuration < 0) {
                      alert("There is no space to place a marker.");
                    } else {
                      compMarker.duration = markerDuration;
                      myComp.markerProperty.setValueAtTime(
                        markerStart,
                        compMarker,
                      );
                    }
                  } else {
                    alert(
                      'The marker named "' +
                        myCompMarkerName +
                        '" was set to "fit" and was ignored. You can only set "fit" markers one at a time.',
                    );
                  }
                }
              } else {
                var markerDuration = 1;
                var nameArray = myCompMarkerNameEntry[i].split("=");
                for (var j = 0; j < nameArray.length; j += 1) {
                  var compMarker = new MarkerValue(nameArray[j]);
                  compMarker.duration = markerDuration;
                  myComp.markerProperty.setValueAtTime(startTime, compMarker);
                  startTime +=
                    parseFloat(markerDuration) + parseFloat(oneFrame);
                  startTime = roundToNearestFrameinTime(startTime);
                }
              }
            }
          } else {
            var myCompMarkerNameEntry = prompt(
              "Enter timeline marker name(s):\nSET FRAME DURATION OPTIONS\n\u2022 One second (default) - \u201cname\u201d\n\u2022 Number of frames - \u201cname:10\u201d\n\u2022 Equal durations - \u201cnameA=nameB=nameC:10\u201d\n\u2022 Batch add - \u201cnameA:10,nameB:20,nameC:5\u201d\n\u2022 Fit between existing markers - \u201cname:\u201d\n",
              "name",
            );
            myCompMarkerNameEntry = myCompMarkerNameEntry.split(",");
            var startTime = app.project.activeItem.time;
            for (var i = 0; i < myCompMarkerNameEntry.length; i += 1) {
              if (myCompMarkerNameEntry[i].indexOf(":") > -1) {
                var nameSplit = myCompMarkerNameEntry[i].split(":");
                var myCompMarkerName = nameSplit[0];
                var markerDuration = 0;
                if (nameSplit[1] != "") {
                  var nameArray = myCompMarkerName.split("=");
                  for (var j = 0; j < nameArray.length; j += 1) {
                    var compMarker = new MarkerValue(nameArray[j]);
                    markerDuration = (
                      parseInt(nameSplit[1]) / myComp.frameRate
                    ).toFixed(4);
                    compMarker.duration = markerDuration;
                    mySelection[0].Marker.setValueAtTime(startTime, compMarker);
                    startTime +=
                      parseFloat(markerDuration) + parseFloat(oneFrame);
                    startTime = roundToNearestFrameinTime(startTime);
                  }
                } else {
                  if (myCompMarkerNameEntry.length === 1) {
                    var compMarker = new MarkerValue(myCompMarkerName);
                    var oneFrame = (1 / myComp.frameRate).toFixed(3);
                    var prevMarkerTime = findPrevMarkerTime(i);
                    var nextMarkerTime = findNextMarkerTime(i);
                    if (prevMarkerTime.start === undefined) {
                      markerStart = mySelection[0].inPoint;
                    } else {
                      markerStart =
                        parseFloat(prevMarkerTime.start) +
                        parseFloat(prevMarkerTime.duration) +
                        parseFloat(oneFrame);
                      markerStart = roundToNearestFrameinTime(markerStart);
                    }
                    if (nextMarkerTime.start === undefined) {
                      markerEnd =
                        mySelection[0].outPoint - mySelection[0].inPoint;
                    } else {
                      markerEnd = nextMarkerTime.start - parseFloat(oneFrame);
                    }
                    markerDuration =
                      parseFloat(markerEnd) - parseFloat(markerStart);
                    markerDuration = roundToNearestFrameinTime(markerDuration);
                    if (markerDuration < 0) {
                      alert("There is no space to place a marker.");
                    } else {
                      compMarker.duration = markerDuration;
                      mySelection[0].Marker.setValueAtTime(
                        markerStart,
                        compMarker,
                      );
                    }
                  } else {
                    alert(
                      'The marker named "' +
                        myCompMarkerName +
                        '" was set to "fit" and was ignored. You can only set "fit" markers one at a time.',
                    );
                  }
                }
              } else {
                var markerDuration = 1;
                var nameArray = myCompMarkerNameEntry[i].split("=");
                for (var j = 0; j < nameArray.length; j += 1) {
                  var compMarker = new MarkerValue(nameArray[j]);
                  compMarker.duration = markerDuration;
                  mySelection[0].Marker.setValueAtTime(startTime, compMarker);
                  startTime +=
                    parseFloat(markerDuration) + parseFloat(oneFrame);
                  startTime = roundToNearestFrameinTime(startTime);
                }
              }
            }
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      var copiedMarkersTime = [];
      var copiedMarkersValue = [];
      var markerNameList = [];
      btn_copyAllMarkers.onClick = function () {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          var isAltPressed = ScriptUI.environment.keyboardState.altKey;
          var isShiftPressed = ScriptUI.environment.keyboardState.shiftKey;
          if (isShiftPressed === true) {
            app.beginUndoGroup("Copy Markers Within Work Area");
            var mySelection = app.project.activeItem.selectedLayers;
            var myComp = app.project.activeItem;
            if (mySelection.length > 1) {
              alert(
                "Only one set of layer markers can be copied at once. Please select only one layer",
              );
            } else {
              copyMarkers(0, "range");
            }
            this.active = true;
            this.active = false;
            app.endUndoGroup;
          } else if (isAltPressed === true) {
            app.beginUndoGroup("Copy All Markers");
            var mySelection = app.project.activeItem.selectedLayers;
            var myComp = app.project.activeItem;
            if (mySelection.length > 1) {
              alert(
                "Only one set of layer markers can be copied at once. Please select only one layer",
              );
            } else {
              copyMarkers(0, "all");
            }
            this.active = true;
            this.active = false;
            app.endUndoGroup;
          } else {
            app.beginUndoGroup("Copy Current Marker");
            var mySelection = app.project.activeItem.selectedLayers;
            var myComp = app.project.activeItem;
            if (mySelection.length > 1) {
              alert(
                "Only one set of layer markers can be copied at once. Please select only one layer",
              );
            } else {
              copyMarkers(0, "current");
            }
            this.active = true;
            this.active = false;
            app.endUndoGroup;
          }
        }
        this.active = true;
        this.active = false;
      };
      btn_pasteMarkers.onClick = function (e) {
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        if (isAltPressed === true) {
          pasteMarkersButtons(e, "pasteAll");
        } else {
          pasteMarkersButtons(e);
        }
        this.active = true;
        this.active = false;
      };
      btn_pasteOptions.onClick = function (e) {
        pasteMarkersButtons(e, "optionbox");
        this.active = true;
        this.active = false;
      };
      btn_deleteMarkers.onClick = function () {
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        var isShiftPressed = ScriptUI.environment.keyboardState.shiftKey;
        if (isAltPressed === true) {
          deleteMarkerButton("deleteAll");
        } else if (isShiftPressed === true) {
          deleteMarkerButton("deleteRange");
        } else {
          deleteMarkerButton();
        }
        this.active = true;
        this.active = false;
      };
      btn_deleteOptions.onClick = function () {
        deleteMarkerButton("optionBox");
        this.active = true;
        this.active = false;
      };
      btn_markerToTime.onClick = function () {
        app.beginUndoGroup("Shift Markers to Current Time");
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection < 1) {
          if (checkForMarkers() == true) {
            if (getMarkerName("check") == false) {
              var nextMarkerTime = findNextMarkerTime(i);
              var timeToNextMarker = (
                parseFloat(nextMarkerTime.start) - app.project.activeItem.time
              ).toFixed(2);
              var convertToFrames = parseInt(
                Math.round(timeToNextMarker * myComp.frameRate),
              );
              if (isAltPressed === true) {
                shiftMarkerButtons(convertToFrames, "left", true, i);
              } else {
                shiftMarkerButtons(convertToFrames, "left", false, i);
              }
            } else {
              var thisMarker = getMarkerName("check");
              var timeFromPrevMarker = (
                app.project.activeItem.time - thisMarker.time
              ).toFixed(2);
              var convertToFrames = parseInt(
                Math.round(timeFromPrevMarker * myComp.frameRate),
              );
              if (isAltPressed === true) {
                shiftMarkerButtons(convertToFrames, "right", true, i);
              } else {
                shiftMarkerButtons(convertToFrames, "right", false, i);
              }
            }
          } else {
            alert("There are no markers on the timeline.");
          }
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            if (checkForMarkers(i) == true) {
              if (getMarkerName("check", i) == false) {
                var nextMarkerTime = findNextMarkerTime(i);
                var timeToNextMarker = (
                  parseFloat(nextMarkerTime.start) - app.project.activeItem.time
                ).toFixed(2);
                var convertToFrames = parseInt(
                  Math.round(timeToNextMarker * myComp.frameRate),
                );
                if (isAltPressed === true) {
                  shiftMarkerButtons(convertToFrames, "left", true, i);
                } else {
                  shiftMarkerButtons(convertToFrames, "left", false, i);
                }
              } else {
                var thisMarker = getMarkerName("check", i);
                var timeFromPrevMarker = (
                  app.project.activeItem.time - thisMarker.time
                ).toFixed(2);
                var convertToFrames = parseInt(
                  Math.round(timeFromPrevMarker * myComp.frameRate),
                );
                if (isAltPressed === true) {
                  shiftMarkerButtons(convertToFrames, "right", true, i);
                } else {
                  shiftMarkerButtons(convertToFrames, "right", false, i);
                }
              }
            }
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_markerLeft1.onClick = function () {
        app.beginUndoGroup("Shift Markers Left");
        var isShiftPressed = ScriptUI.environment.keyboardState.shiftKey;
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        if (isShiftPressed === true && isAltPressed === true) {
          var bothPressed = true;
        }
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection < 1) {
          if (isShiftPressed === true && isAltPressed === false) {
            shiftMarkerButtons(10, "left", false, i);
          } else if (isShiftPressed === false && isAltPressed === false) {
            shiftMarkerButtons(1, "left", false, i);
          } else if (isShiftPressed === false && isAltPressed === true) {
            shiftMarkerButtons(1, "left", true, i);
          } else {
            if (bothPressed === true) {
              shiftMarkerButtons(10, "left", true, i);
            }
          }
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            if (isShiftPressed === true && isAltPressed === false) {
              shiftMarkerButtons(10, "left", false, i);
            } else if (isShiftPressed === false && isAltPressed === false) {
              shiftMarkerButtons(1, "left", false, i);
            } else if (isShiftPressed === false && isAltPressed === true) {
              shiftMarkerButtons(1, "left", true, i);
            } else {
              if (bothPressed === true) {
                shiftMarkerButtons(10, "left", true, i);
              }
            }
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_markerRight1.onClick = function () {
        app.beginUndoGroup("Shift Markers Right");
        var isShiftPressed = ScriptUI.environment.keyboardState.shiftKey;
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        if (isShiftPressed === true && isAltPressed === true) {
          var bothPressed = true;
        }
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection < 1) {
          if (isShiftPressed === true && isAltPressed === false) {
            shiftMarkerButtons(10, "right", false, i);
          } else if (isShiftPressed === false && isAltPressed === false) {
            shiftMarkerButtons(1, "right", false, i);
          } else if (isShiftPressed === false && isAltPressed === true) {
            shiftMarkerButtons(1, "right", true, i);
          } else {
            if (bothPressed === true) {
              shiftMarkerButtons(10, "right", true, i);
            }
          }
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            if (isShiftPressed === true && isAltPressed === false) {
              shiftMarkerButtons(10, "right", false, i);
            } else if (isShiftPressed === false && isAltPressed === false) {
              shiftMarkerButtons(1, "right", false, i);
            } else if (isShiftPressed === false && isAltPressed === true) {
              shiftMarkerButtons(1, "right", true, i);
            } else {
              if (bothPressed === true) {
                shiftMarkerButtons(10, "right", true, i);
              }
            }
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_fitLeft.onClick = function () {
        app.beginUndoGroup("Fit Left InPoint");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          setFit("left");
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            setFit("left", i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_fitRight.onClick = function () {
        app.beginUndoGroup("Fit Right InPoint");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          setFit("right");
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            setFit("right", i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_fitBoth.onClick = function () {
        app.beginUndoGroup("Fit Left and Right InPoints");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          setFit("both");
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            setFit("both", i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_setInpoint.onClick = function () {
        app.beginUndoGroup("Set Inpoint");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          setMarkerData("in");
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            setMarkerData("in", i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_setOutpoint.onClick = function () {
        app.beginUndoGroup("Set Outpoint");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          setMarkerData("out");
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            setMarkerData("out", i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_setFrameDuration.onClick = function () {
        app.beginUndoGroup("Set Frame Duration");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          setMarkerData("duration");
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            setMarkerData("duration", i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      rangeSlider.onChanging = function () {
        app.beginUndoGroup("Set Marker Range");
        rangeValue.text = rangeSlider.value.toFixed(1);
        if (rangeValue.text == 100) {
          rangeValue.text = rangeSlider.value.toFixed(0);
        }
        var mySelection = app.project.activeItem.selectedLayers;
        rangeSlider.value = rangeValue.text;
        if (mySelection.length < 1) {
          alert(
            "Marker Remap flags should only be applied to layer markers. Please select a layer.",
          );
          return;
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            setRange(rangeValue.text, i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      rangeValue.onChange = function () {
        app.beginUndoGroup("Set Marker Range");
        var mySelection = app.project.activeItem.selectedLayers;
        rangeSlider.value = rangeValue.text;
        for (var i = 0; i < mySelection.length; i += 1) {
          setRange(rangeValue.text, i);
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      rangeToggle.onClick = function () {
        app.beginUndoGroup("Toggle Full/Mapped Range Mode");
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        var rangeModeFound = false;
        for (var i = 0; i < mySelection.length; i += 1) {
          if (mySelection.length < 1) {
            var myMarker = myComp.markerProperty;
          } else {
            var myLayer = mySelection[i];
            var myMarker = myLayer.property("Marker");
          }
          if (getMarkerName("check", i) != false) {
            var thisMarker = getMarkerName("check", i);
            var thisMarkerIndex = parseInt(thisMarker.index);
            var thisMarkerName = thisMarker.name;
            var thisMarkerTime = myMarker.keyTime(thisMarkerIndex);
            var thisMarkerValue = myMarker.keyValue(thisMarkerIndex);
            if (rangeModeFound == false) {
              if (thisMarkerName.indexOf("=") > -1) {
                rangeMode = ">";
                rangeModeReplacement = "=";
                rangeModeFound = true;
                thisMarkerName = thisMarkerName.replace("=", ">");
              } else {
                if (thisMarkerName.indexOf(">") > -1) {
                  rangeMode = "=";
                  rangeModeReplacement = ">";
                  rangeModeFound = true;
                  thisMarkerName = thisMarkerName.replace(">", "=");
                }
              }
            } else {
              thisMarkerName = thisMarkerName.replace(
                rangeModeReplacement,
                rangeMode,
              );
            }
            thisMarkerValue.comment = thisMarkerName;
            myMarker.setValueAtTime(thisMarkerTime, thisMarkerValue);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      Array.prototype.contains = function (needle) {
        for (var i in this) {
          if (this[i] == needle) {
            return true;
          }
        }
        return false;
      };
      btn_clearAllFlags.onClick = function () {
        app.beginUndoGroup("Clear Flags");
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        if (isAltPressed === true) {
          clearAllFlags();
        } else {
          clearFlags();
        }
        app.endUndoGroup;
      };
      btn_easeIn.onClick = function () {
        app.beginUndoGroup("Ease Marker In");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          alert(
            "Flags should only be applied to layers. Please select a layer.",
          );
        }
        for (var i = 0; i < mySelection.length; i += 1) {
          switchEasing("easeIn", null, i);
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_easeOut.onClick = function () {
        app.beginUndoGroup("Ease Marker Out");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          alert(
            "Flags should only be applied to layers. Please select a layer.",
          );
        }
        for (var i = 0; i < mySelection.length; i += 1) {
          switchEasing("easeOut", null, i);
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_easeBoth.onClick = function () {
        app.beginUndoGroup("Ease Marker In and Out");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          alert(
            "Flags should only be applied to layers. Please select a layer.",
          );
        }
        for (var i = 0; i < mySelection.length; i += 1) {
          switchEasing("easeBoth", null, i);
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_easeClear.onClick = function () {
        app.beginUndoGroup("Clear Easing");
        var mySelection = app.project.activeItem.selectedLayers;
        if (mySelection < 1) {
          switchEasing("", true);
        } else {
          for (var i = 0; i < mySelection.length; i += 1) {
            switchEasing("", null, i);
          }
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_flagClear.onClick = function () {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          app.beginUndoGroup("Clear Flags");
          var mySelection = app.project.activeItem.selectedLayers;
          if (mySelection < 1) {
            switchFlags("", true);
          } else {
            for (var i = 0; i < mySelection.length; i += 1) {
              switchFlags("", null, i);
            }
          }
          this.active = true;
          this.active = false;
          app.endUndoGroup;
        }
      };
      btn_flagLoop.onClick = function () {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          app.beginUndoGroup("Convert to Loop");
          var mySelection = app.project.activeItem.selectedLayers;
          if (mySelection < 1) {
            alert(
              "Flags should only be applied to layers. Please select a layer.",
            );
          }
          for (var i = 0; i < mySelection.length; i += 1) {
            switchFlags("@", null, i);
          }
          this.active = true;
          this.active = false;
          app.endUndoGroup;
        }
      };
      btn_flagLoopSegment.onClick = function () {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          app.beginUndoGroup("Convert to Loop Segment");
          var mySelection = app.project.activeItem.selectedLayers;
          if (mySelection < 1) {
            alert(
              "Flags should only be applied to layers. Please select a layer.",
            );
          }
          for (var i = 0; i < mySelection.length; i += 1) {
            switchFlags("[@]", null, i);
          }
          this.active = true;
          this.active = false;
          app.endUndoGroup;
        }
      };
      btn_flagReverse.onClick = function () {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          app.beginUndoGroup("Convert to Reverse");
          var mySelection = app.project.activeItem.selectedLayers;
          if (mySelection < 1) {
            alert(
              "Flags should only be applied to layers. Please select a layer.",
            );
          }
          for (var i = 0; i < mySelection.length; i += 1) {
            switchFlags("<", null, i);
          }
          this.active = true;
          this.active = false;
          app.endUndoGroup;
        }
      };
      btn_flagPingPong.onClick = function () {
        if (isTrial) {
          alert("This feature is unavailable in trial mode.");
        } else {
          app.beginUndoGroup("Convert to Ping Pong");
          var mySelection = app.project.activeItem.selectedLayers;
          if (mySelection < 1) {
            alert(
              "Flags should only be applied to layers. Please select a layer.",
            );
          }
          for (var i = 0; i < mySelection.length; i += 1) {
            switchFlags("%", null, i);
          }
          this.active = true;
          this.active = false;
          app.endUndoGroup;
        }
      };
      markerList.addEventListener("mouseover", function (k) {
        emptyArray = [];
        updateListboxArray(markerList, emptyArray);
        var myComp = app.project.activeItem;
        if (myComp != undefined) {
          var markerNameList = extractMarkerList();
          updateListboxArray(markerList, markerNameList);
        } else {
          emptyArray = [
            "EXTRACT ONE MARKER",
            "TO CURRENT TIME:",
            "Select a comp layer,",
            "then hover over this box to",
            "select a marker",
          ];
          updateListboxArray(markerList, emptyArray);
        }
      });
      markerList.addEventListener("mouseout", function (k) {
        emptyArray = [
          "EXTRACT ONE MARKER",
          "TO CURRENT TIME:",
          "Select a comp layer,",
          "then hover over this box to",
          "select a marker",
        ];
        updateListboxArray(markerList, emptyArray);
        btn_copyAllMarkers.active = true;
        btn_copyAllMarkers.active = false;
      });
      markerList.onChange = function () {
        app.beginUndoGroup("Extract marker from comp");
        var myComp = app.project.activeItem;
        var markerNameList = extractMarkerList();
        var markerIndexArray = markerList.selection.text.split(" - ");
        var markerIndex = parseInt(markerIndexArray[0]) - 1;
        var markerNameArray = markerIndexArray[1].split(" : ");
        var markerName = markerNameArray[1];
        for (var i = 0; i <= copiedMarkersTime.length; i += 1) {
          if (copiedMarkersValue[i].comment === markerName) {
            myComp.selectedLayers[0]
              .property("marker")
              .setValueAtTime(
                app.project.activeItem.time,
                copiedMarkersValue[i],
              );
          }
        }
        app.endUndoGroup;
      };
      btn_extractSelMarkers.onClick = function () {
        app.beginUndoGroup("Extract All Markers");
        extractAllMarkers();
        app.endUndoGroup;
        this.active = true;
        this.active = false;
      };
      btn_extractOptions.onClick = function () {
        app.beginUndoGroup("Extract Selected Markers");
        extractSomeMarkers();
        app.endUndoGroup;
        this.active = true;
        this.active = false;
      };
      btn_extractSelMarkersToCurrentTime.onClick = function () {
        app.beginUndoGroup("Extract Selected Markers To Current Time");
        var mySelection = app.project.activeItem.selectedLayers;
        var myComp = app.project.activeItem;
        if (mySelection.length < 1) {
          alert("Select a pre-comp layer");
        } else if (mySelection[0].source instanceof CompItem) {
          if (mySelection.length > 1) {
            alert("Select only one pre-comp layer");
          } else {
            var compName = mySelection[0].source.name;
            copiedMarkersTime = [];
            copiedMarkersValue = [];
            var proj = app.project;
            for (var i = 1; i <= proj.numItems; i += 1) {
              if (proj.item(i).name === compName) {
                target = proj.item(i);
                var markers = target.markerProperty;
              }
            }
            if (markers.numKeys == 0) {
              alert("This pre-comp has no timeline markers to extract.");
            } else {
              enableRetiming();
              var onAmarker = false;
              var onAmarkerDuration = "";
              var thisMarkerStream = mySelection[0].property("Marker");
              for (var i = 1; i <= thisMarkerStream.numKeys; i += 1) {
                if (
                  thisMarkerStream.keyTime(i) == app.project.activeItem.time
                ) {
                  onAmarker = true;
                  onAmarkerDuration = parseInt(
                    thisMarkerStream.keyValue(i).duration * myComp.frameRate,
                  );
                  onAMarkerName = thisMarkerStream.keyValue(i).comment;
                  var easeInDetected = false;
                  var easeOutDetected = false;
                  var easeType = "linear";
                  if (onAMarkerName.indexOf("{") > -1) {
                    easeInDetected = true;
                    easeType = "easeIn";
                  }
                  if (onAMarkerName.indexOf("}") > -1) {
                    easeOutDetected = true;
                    easeType = "easeOut";
                  }
                  if (easeInDetected == true && easeOutDetected == true) {
                    easeType = "easeBoth";
                  }
                }
              }
              for (var i = 1; i <= markers.numKeys; i += 1) {
                copiedMarkersTime.push(markers.keyTime(i));
                copiedMarkersValue.push(markers.keyValue(i));
              }
              var markerNameList = [];
              for (var i = 0; i < copiedMarkersValue.length; i += 1) {
                var convertToFrames = parseInt(
                  copiedMarkersTime[i] * myComp.frameRate,
                ).pad(3);
                markerNameList.push(
                  i +
                    1 +
                    " - " +
                    convertToFrames +
                    " : " +
                    copiedMarkersValue[i].comment,
                );
              }
              var mr_markerlist2 = new Window("dialog");
              mr_markerlist2.add(
                "statictext",
                undefined,
                "The following markers have been found in the selected pre-comp. Select ONE MARKER to extract. It will be placed at the current timecode.",
                { multiline: true },
              );
              var myList = mr_markerlist2.add(
                "listbox",
                [0, 0, 200, 100],
                markerNameList,
                { multiselect: false },
              );
              var durationGroup2 = mr_markerlist2.add("group");
              durationGroup2.orientation = "row";
              durationGroup2.add("statictext", undefined, "New duration: ");
              var markerDuration = durationGroup2.add(
                "edittext",
                [0, 0, 50, 20],
                onAmarkerDuration,
              );
              var radio_group = mr_markerlist2.add("panel");
              radio_group.alignChildren = "left";
              radio_group.add("radiobutton", undefined, "Normal");
              radio_group.add("radiobutton", undefined, "Time-Reverse");
              radio_group.add("radiobutton", undefined, "Loop");
              radio_group.add("radiobutton", undefined, "Ping pong");
              radio_group.children[0].value = true;
              mr_markerlist2.add("button", undefined, "EXTRACT", {
                name: "ok",
              });
              mr_markerlist2.add("button", undefined, "CANCEL", {
                name: "cancel",
              });
              if (mr_markerlist2.show() == 1) {
                for (var i = 0; i <= copiedMarkersTime.length; i += 1) {
                  var markerIndexArray = myList.selection.text.split(" - ");
                  var markerIndex = parseInt(markerIndexArray[0]) - 1;
                  var markerNameArray = markerIndexArray[1].split(" : ");
                  var markerName = markerNameArray[1];
                  commentName = copiedMarkersValue[i].comment;
                  if (copiedMarkersValue[i].comment === markerName) {
                    if (radio_group.children[1].value == true) {
                      copiedMarkersValue[i].comment = "<" + commentName;
                    }
                    if (radio_group.children[2].value == true) {
                      copiedMarkersValue[i].comment = "@" + commentName;
                    }
                    if (radio_group.children[3].value == true) {
                      copiedMarkersValue[i].comment = "%" + commentName;
                    }
                    if (markerDuration.text != "") {
                      copiedMarkersValue[i].duration = parseFloat(
                        parseInt(markerDuration.text) / myComp.frameRate,
                      );
                    }
                    copiedMarkersValue[i].comment = switchEasingName(
                      copiedMarkersValue[i].comment,
                      easeType,
                    );
                    myComp.selectedLayers[0]
                      .property("marker")
                      .setValueAtTime(
                        app.project.activeItem.time,
                        copiedMarkersValue[i],
                      );
                  }
                }
              }
              exit();
            }
          }
        } else {
          alert("This layer is not a pre-comp. Please select a pre-comp layer");
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      btn_bakeMarkers.onClick = function () {
        app.beginUndoGroup("Bake Marker Remap Markers");
        var isAltPressed = ScriptUI.environment.keyboardState.altKey;
        if (isAltPressed === true) {
          bakeMarkers("exact");
        } else {
          bakeMarkers();
        }
        this.active = true;
        this.active = false;
        app.endUndoGroup;
      };
      mrPanel.layout.layout(true);
      grp.minimumSize = grp.size;
      mrPanel.layout.resize();
      mrPanel.onResizing = mrPanel.onResize = function () {
        this.layout.resize();
      };
      return mrPanel;
    }
    var myScriptPal = myScript_buildUI(thisObj);
    if (myScriptPal != null && myScriptPal instanceof Window) {
      myScriptPal.center();
      myScriptPal.show();
    }
  }
}
rl_markerRemap(this);
