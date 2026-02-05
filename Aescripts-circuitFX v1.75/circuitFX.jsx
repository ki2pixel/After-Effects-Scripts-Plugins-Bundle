/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function circuitFX(thisObj) {
  var af_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [
      {
        name: "Check out more products from Real Creations",
        url: "http://aescripts.com/authors/real-creations",
      },
    ],
    helpText:
      "Here is a short explanation of circuitFX interface. For more detailed information, please read the included .PDF user guide.\nIf you like my work, please visit: www.realcreations.gr\n\n--\n\n______ grid - tab______\n\n[ Fill ]\n    creates a circuit that fills the whole composition\n\n[ Center Out ]\n    Creates a circuit that fills the composition, leaving a center rectangular part empty\n\n[ radius % ]\n      Set the size -in %- of the center rectangular area, that will be left empty\n\n[ Using Masks ]\n    Creates a circuit by using masks, drawn on the Grid Guide Layer\n\n[ Grid X ]\n    Set the number of grid points for the X dimension (horizontal)\n\n[ Grid Y ]\n    Set the number of grid points for the Y dimension (vertical)\n\n[ Populate % ]\n    Set the fill percentage of the grid. At 100%, every part of the grid is used\n\n\n______ parts - tab______\n\n[ Number of Line Vertices ]\n    Set the minimum and maximum number of vertices of each circuit line\n\n[ Clusters ]\n    Set the percentage of clusters in the circuit lines.\n    Clusters are circuit lines with multiple offsets applied to simulate parallel circuit paths\n\n[ Chips ]\n    Set the number of chips to create\n\n[ Capacitors ]\n    Set the number of capacitors to create\n\n[ Resistors ]\n    Set the number of resistors to create\n\n\n______ settings - tab______\n\n[ Generation Orientation ]\n    Set the direction of the circuit generation, along with the strength bias.\n    Setting the strength bias to 5, creates completely straight lines, in the selected direction\n\n[ Put circuit parts on separate layers? ]\n    Separates the circuit in layers. Circles, lines, chips, resistors,\n    capacitors and the background plate are placed on separate layers\n\n[ Randomize Trim starting point? ]\n    Randomizes the Trim Starting point for each circuit line, to avoid a visible looping point\n\n[ Avoid crossing of circuit lines ]\n     Uses a more complex algorithm (slower generation) to prevent circuit lines from crossing\n\n[ Create layer with lines as masks ]\n     Creates a simple solid layer, with all the generated circuit lines as masks.\n     You can adjust the thickness of the generated masks with the Offset setting.\n\n[ Show \'Generating Circuit\' message + progress bar]\n     Recommended! Creates a temporary composition, which prevents After Effects\n     from constantly updating the composition and timeline panels while generating the circuit,\n     thus speeding up the process significantly.\n  The temporary composition is automatically removed after the successful creation of the circuit.\n\n______\n\n[ Create Circuit Button]\n   Creates the circuit!\n\nWhen the \'Using Masks\' mode is selected two buttons appear:\n\n[ Create Grid Guide ]\n   Creates a grid guide layer to draw masks on, which is going to be used in the circuit generation process\n\n[ Create Circuit by using mask ]\n   Creates the actual circuit by using the masks drawn on the grid guide layer",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6836559492481290,
    productSKU: "TTCF-SUL",
    scriptAuthor: "Real Creations",
    scriptName: "circuitFX",
    scriptURL: "https://aescripts.com/circuitfx/",
    scriptVersion: "1.75",
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
          ? strSKU + t + "&message="
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
      var r = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return e
        ? File.encode(n) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(i) +
            "%0D%0A" +
            File.encode(r)
        : n + "\n" + t + "\n" + i + "\n" + r;
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
        i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(
          /%v/,
          t.version + "\n" + strCurrentVersion.replace(/%v/, strScriptVersion),
        );
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
        if (null == (n = JSONify(n, "parse"))) {
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
              Folder.userData.fsName + "/Aescripts/aescripts_helper.vbs",
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
          ? Folder.userData.fsName
          : Folder.temp.fsName +
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
      var r = systemCall(
        '"' + n.fsName + '" "' + strHeader + '" ' + privateNum + ' "' + e + '"',
      );
      return (n.remove(), parseResult(r));
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
      if ("" == t || "" == i) {
        return false;
      }
      switch (e.result) {
        case -20:
          e.e = t;
          break;
        case -21:
          e.e = i;
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
        var t = retProp("^d", e);
        if (void 0 === t) {
          return void (e.result = -103);
        }
        var i = trialLengthDays - t;
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
        (myLicense = false),
        e && ((regUI = licUI()), (myRegPrompt = regUI.show()), !myRegPrompt))
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
          myLicense = true;
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
          myLicense
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
        t.match(/@remote/i) ||
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
        isTimeLimited && (i += "\nLicense ends: " + f),
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
              ? new File(e.fsName)
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
                i = !removeLic();
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
                  t =
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
                "" == (t = checkForLegacyLic()) &&
                  ((n = true),
                  (t =
                    isServerConfigured(licenseValidity) &&
                    isServerRunning(licenseValidity)
                      ? "@REMOTE"
                      : "trial"));
                i = checkCode(n, t, privateNum);
              }
            } else {
              haveSettings(prefsSectionName, prefsName)
                ? ((t = getSettings(prefsSectionName, prefsName)),
                  (n = !(
                    "c" == e ||
                    !(
                      ("bad" == t || "bad" == bD(t) || offerTrial) &&
                      "trial" == bD(t)
                    )
                  )))
                : "c" == e
                  ? (saveSettings(
                      prefsSectionName,
                      prefsName,
                      bE((t = !isTimeLimited && offerTrial ? "trial" : "")),
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
              i = checkCode(n, t, privateNum);
            }
            return i;
          }
        }
      }
    }
    var licensingVersion = "3.0.42";
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
    var doUpdateCheck =
      !vars.hasOwnProperty("doUpdateCheck") || vars.doUpdateCheck;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    var wx = __BLOB__BLOB_000586__;
    var mx = __BLOB__BLOB_000587__;
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
  var Ili1 = new a(af_settings);
  if (Ili1.c()) {
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
            GridX.text = GridXSlider.value = GridYSlider.value = GridY.text;
          }
          if (textfield == GridX) {
            GridY.text = GridYSlider.value = GridXSlider.value = GridX.text;
          }
        }
        if (name != undefined) {
          eval(name + "Slider").value = textfield.text;
        }
      }
    }
    function visualize_grid(e, r) {
      if (Ili1.s() == false) {
        isTrial = !Ili1.s();
      }
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = r;
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Shape - Ellipse").name = "circle";
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Root Vectors Group")(r)(
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
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")("circle")("ADBE Vector Ellipse Position")
        .setValue([0, 0]);
      if (r == "Layer Guide Grid") {
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Root Vectors Group")(r)(
            "ADBE Vectors Group",
          )("circle")("ADBE Vector Ellipse Position")
          .setValue([-curComp.width * 0.5, -curComp.height * 0.5]);
      } else {
        app.project.activeItem
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")("circle")("ADBE Vector Ellipse Position")
          .setValue([0, 0]);
      }
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Repeater").name = "grid_x_repeater";
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Root Vectors Group")(r)(
          "ADBE Vectors Group",
        )("grid_x_repeater")("ADBE Vector Repeater Copies")
        .setValue(Number(GridX.text) + 1);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")("grid_x_repeater")("ADBE Vector Repeater Transform")("ADBE Vector Repeater Position")
        .setValue([step_W, 0]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Repeater").name = "grid_y_repeater";
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Root Vectors Group")(r)(
          "ADBE Vectors Group",
        )("grid_y_repeater")("ADBE Vector Repeater Copies")
        .setValue(Number(GridY.text) + 1);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")("grid_y_repeater")("ADBE Vector Repeater Transform")("ADBE Vector Repeater Position")
        .setValue([0, step_H]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")("ADBE Vector Fill Color")
        .setValue([1, 1, 1, 1]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Color")
        .setValue([0, 0, 0, 1]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")(r)("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width")
        .setValue(4);
      app.project.activeItem.layer(shapeLayer.name).guideLayer = true;
      app.project.activeItem
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      if (r == "Layer Guide Grid") {
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
          .setValue([0, 0]);
      } else {
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      }
    }
    function visualize_array(e, r) {
      for (var t = 0; t < e.length; t += 1) {
        shape_pointer = new Shape();
        shape_pointer.vertices = [[e[t][0], e[t][1]]];
        shape_pointer.closed = false;
        if (t == 0) {
          app.project.activeItem
            .layer(
              shapeLayer.name,
            )("ADBE Root Vectors Group")("DEBUG")("ADBE Vectors Group")
            .addProperty("ADBE Vector Group").name = r;
        }
        b = t + 1;
        app.project.activeItem
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("DEBUG")("ADBE Vectors Group")(r)("ADBE Vectors Group")
          .addProperty("ADBE Vector Group").name = "vertex " + b;
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Root Vectors Group")("DEBUG")(
            "ADBE Vectors Group",
          )(r)("ADBE Vectors Group")("vertex " + b)("ADBE Vectors Group")
          .addProperty("ADBE Vector Shape - Ellipse").name = "circle";
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Root Vectors Group")("DEBUG")(
            "ADBE Vectors Group",
          )(r)("ADBE Vectors Group")("vertex " + b)("ADBE Vectors Group")(
            "circle",
          )("ADBE Vector Ellipse Size")
          .setValue([10, 10]);
        app.project.activeItem
          .layer(shapeLayer.name)("ADBE Root Vectors Group")("DEBUG")(
            "ADBE Vectors Group",
          )(r)("ADBE Vectors Group")("vertex " + b)("ADBE Vectors Group")(
            "circle",
          )("ADBE Vector Ellipse Position")
          .setValue([
            shape_pointer.vertices[0][0],
            shape_pointer.vertices[0][1],
          ]);
      }
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("DEBUG")("ADBE Vectors Group")(r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")("ADBE Vector Fill Color")
        .setValue([1, 1, 1, 1]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("DEBUG")("ADBE Vectors Group")(r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Color")
        .setValue([0, 0, 0, 1]);
      app.project.activeItem
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("DEBUG")("ADBE Vectors Group")(r)("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width")
        .setValue(4);
      app.project.activeItem.layer(shapeLayer.name).guideLayer = true;
    }
    function create_all_available_vertices_lines_chips() {
      all_available_vertices = [];
      all_available_vertices_chips = [];
      pass_GridX = GridX.text;
      pass_GridY = GridY.text;
      step_W = Math.round(curComp.width / pass_GridX);
      step_H = Math.round(curComp.height / pass_GridY);
      for (var a = 0; a < pass_GridX; a += 1) {
        for (var b = 0; b < pass_GridY; b += 1) {
          all_available_vertices.push([a * step_W, b * step_H]);
          writeLn(
            "Calculating grid vertices [ " +
              a * b +
              " of " +
              Number(pass_GridX) * Number(pass_GridY) +
              " ]",
          );
          progressBar_text.text =
            "Calculating grid vertices [ " +
            (a + 1) * (b + 1) +
            " of " +
            Number(pass_GridX) * Number(pass_GridY) +
            " ]";
          PB.value = Math.round(
            (((a + 1) * (b + 1)) / (pass_GridX * pass_GridY)) * 100,
          );
          PresetsPal.update();
        }
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        all_available_vertices_chips = all_available_vertices.slice(0);
      }
    }
    function create_TempMessageComp() {
      if (Ili1.s() == false) {
        isTrial = !Ili1.s();
      }
      if (TempMessageCheckbox.value) {
        tempComp = app.project.items.addComp(
          "Generating circuit (you can safely delete this comp)",
          4,
          4,
          1,
          1,
          1,
        );
        tempComp.openInViewer();
      }
      PresetsPal = new Window("palette", undefined, undefined, {
        borderless: true,
      });
      PresetsPal.margins = [0, 0, 0, 0];
      myPanel = PresetsPal.add("panel");
      progressBar_text = myPanel.add(
        "statictext",
        undefined,
        "circuitFX - Calculating Grid",
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
        if (TempMessageCheckbox.value) {
          PresetsPal.show();
        }
      }
    }
    function inside(e, r) {
      var t = e[0];
      var a = e[1];
      var o = false;
      for (var i = 0, s = r.length - 1; i < r.length; s = i++) {
        var c = r[i][0];
        var l = r[i][1];
        var n = r[s][0];
        var p = r[s][1];
        var u = l > a != p > a && t < ((n - c) * (a - l)) / (p - l) + c;
        if (u) {
          o = !o;
        }
      }
      return o;
    }
    function createCircuit_center() {
      var l = [];
      var n = [];
      var p = [];
      var u = [];
      var h = [];
      var d = [];
      var f = [];
      var A = [];
      var E = 0;
      curComp = app.project.activeItem;
      create_TempMessageComp();
      shapeLayer = curComp.layers.addShape();
      ruler = 1;
      o = 1;
      while (o <= curComp.numLayers) {
        if (curComp.layer(o).name.substring(0, 11) == "circuitFX " + ruler) {
          ruler++;
          o = 1;
        } else {
          o++;
        }
      }
      if (labelColor + 1 == 17) {
        labelColor = 0;
      }
      labelColor += 1;
      shapeLayer.label = labelColor;
      shapeLayer.name = "circuitFX " + ruler;
      shapeLayer.comment = "circuitFX v" + af_settings.scriptVersion;
      var m = 0;
      if (masksCheckbox.value) {
        var j = curComp.layers.addSolid(
          [1, 1, 1],
          "circuitFX " + ruler + " - Masks Layer",
          curComp.width,
          curComp.height,
          curComp.pixelAspect,
          curComp.duration,
        );
        j.label = labelColor;
        j.enabled = false;
        j.Effects.addProperty("ADBE Slider Control").name = "Masks Expansion";
        j("ADBE Effect Parade")("Masks Expansion")(
          "ADBE Slider Control-0001",
        ).setValue(0);
        j.Effects.addProperty("ADBE Slider Control").name = "Masks Feather";
        j("ADBE Effect Parade")("Masks Feather")(
          "ADBE Slider Control-0001",
        ).setValue(0);
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim Start";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim End";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: trim End")("ADBE Slider Control-0001")
        .setValue(100);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Angle Control").name =
        "[ LINES ]: trim Offset";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Checkbox Control").name =
        "[ LINES ]: trim individually";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: width";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: width")(
          "ADBE Slider Control-0001",
        )
        .setValue(step_W > step_H ? step_H * 0.02 : step_W * 0.02);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: round corners";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: round corners")("ADBE Slider Control-0001")
        .setValue(3);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name = "[ LINES ]: color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: color")(
          "ADBE Color Control-0001",
        )
        .setValue([rL / 255, gL / 255, bL / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      if (ClustersPerCentCheckbox.value) {
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Effect Parade")("[ LINES ]: cluster offset")("ADBE Slider Control-0001")
          .setValue(3);
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset randomness";
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ CIRCLES ]: size";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ CIRCLES ]: size")(
          "ADBE Slider Control-0001",
        )
        .setValue(
          step_W > step_H
            ? Math.round((step_H / 6.667) * 100) * 0.01
            : Math.round((step_W / 6.667) * 100) * 0.01,
        );
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: fill color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: fill color",
        )("ADBE Color Control-0001")
        .setValue([rFC / 255, gFC / 255, bFC / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: fill opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")
        .setValue(10);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: stroke color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke color",
        )("ADBE Color Control-0001")
        .setValue([rSC / 255, gSC / 255, bSC / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: stroke width";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke width",
        )("ADBE Slider Control-0001")
        .setValue(step_W > step_H ? step_H * 0.05 : step_W * 0.05);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      if (ChipsCheckbox.value) {
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "chips";
      }
      if (CapacitorsCheckbox.value) {
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "capacitors";
      }
      if (ResistorsCheckbox.value) {
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "resistors";
      }
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit circles";
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit lines";
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      create_all_available_vertices_lines_chips();
      PB.value = 0;
      for (var a = 0; a <= GridX.text; a += 1) {
        l.push([step_W * a, 0]);
      }
      for (var a = 0; a < GridX.text; a += 1) {
        l.push([step_W * a, step_H * GridY.text]);
      }
      for (var a = 1; a < GridY.text; a += 1) {
        l.push([0, step_H * a]);
      }
      for (var a = 1; a <= GridY.text; a += 1) {
        l.push([step_W * GridX.text, step_H * a]);
      }
      n = l.slice(0);
      for (
        var s = 0;
        s <=
        Math.floor(
          ((Number(GridX.text) < Number(GridY.text)
            ? GridX.text
            : GridY.text / 2) -
            2) *
            boxRadius.text *
            0.01,
        );
        s += 1
      ) {
        for (
          a = Math.floor(GridX.text * 0.5) - s;
          a <= Math.floor(GridX.text * 0.5) + s;
          a++
        ) {
          l.push([step_W * a, (Math.floor(GridY.text * 0.5) - s) * step_H]);
        }
        for (
          a = Math.floor(GridX.text * 0.5) - s;
          a < Math.floor(GridX.text * 0.5) + s;
          a++
        ) {
          l.push([step_W * a, (Math.floor(GridY.text * 0.5) + s) * step_H]);
        }
        for (
          a = Math.floor(GridY.text * 0.5) - s + 1;
          a < Math.floor(GridY.text * 0.5) + s;
          a++
        ) {
          l.push([(Math.floor(GridX.text * 0.5) - s) * step_W, step_H * a]);
        }
        for (
          a = Math.floor(GridY.text * 0.5) - s + 1;
          a <= Math.floor(GridY.text * 0.5) + s;
          a++
        ) {
          l.push([(Math.floor(GridX.text * 0.5) + s) * step_W, step_H * a]);
        }
      }
      s++;
      for (
        a = Math.floor(GridX.text * 0.5) - s + 1;
        a <= Math.floor(GridX.text * 0.5) + s - 1;
        a++
      ) {
        u.push([step_W * a, (Math.floor(GridY.text * 0.5) - s) * step_H]);
      }
      for (
        a = Math.floor(GridX.text * 0.5) - s + 1;
        a < Math.floor(GridX.text * 0.5) + s;
        a++
      ) {
        h.push([step_W * a, (Math.floor(GridY.text * 0.5) + s) * step_H]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - s + 2;
        a < Math.floor(GridY.text * 0.5) + s - 1;
        a++
      ) {
        d.push([(Math.floor(GridX.text * 0.5) - s) * step_W, step_H * a]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - s + 2;
        a <= Math.floor(GridY.text * 0.5) + s - 2;
        a++
      ) {
        f.push([(Math.floor(GridX.text * 0.5) + s) * step_W, step_H * a]);
      }
      A = u.concat(h);
      A = A.concat(d);
      A = A.concat(f);
      l = l.concat(A);
      u = [];
      h = [];
      d = [];
      f = [];
      A = [];
      s--;
      for (
        a = Math.floor(GridX.text * 0.5) - s;
        a <= Math.floor(GridX.text * 0.5) + s;
        a++
      ) {
        u.push([step_W * a, (Math.floor(GridY.text * 0.5) - s) * step_H]);
      }
      for (
        a = Math.floor(GridX.text * 0.5) - s;
        a < Math.floor(GridX.text * 0.5) + s + 1;
        a++
      ) {
        h.push([step_W * a, (Math.floor(GridY.text * 0.5) + s) * step_H]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - s + 1;
        a < Math.floor(GridY.text * 0.5) + s;
        a++
      ) {
        d.push([(Math.floor(GridX.text * 0.5) - s) * step_W, step_H * a]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - s + 1;
        a <= Math.floor(GridY.text * 0.5) + s - 1;
        a++
      ) {
        f.push([(Math.floor(GridX.text * 0.5) + s) * step_W, step_H * a]);
      }
      A = u.concat(h);
      A = A.concat(d);
      A = A.concat(f);
      l = l.concat(A);
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        var p = l.slice(0);
        for (var a = 1; a <= GridX.text - 1; a += 1) {
          p.push([step_W * a, step_H]);
        }
        for (var a = 1; a < GridX.text - 1; a += 1) {
          p.push([step_W * a, step_H * (GridY.text - 1)]);
        }
        for (var a = 2; a < GridY.text - 1; a += 1) {
          p.push([step_W, step_H * a]);
        }
        for (var a = 2; a <= GridY.text - 1; a += 1) {
          p.push([step_W * (GridX.text - 1), step_H * a]);
        }
      }
      for (var r = 0; r < l.length; r += 1) {
        for (var e = 0; e < all_available_vertices.length; e += 1) {
          if (l[r].toString() == all_available_vertices[e].toString()) {
            all_available_vertices.splice(e, 1);
          }
        }
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        for (var r = 0; r < p.length; r += 1) {
          for (var e = 0; e < all_available_vertices_chips.length; e += 1) {
            if (p[r].toString() == all_available_vertices_chips[e].toString()) {
              all_available_vertices_chips.splice(e, 1);
            }
          }
        }
      }
      var B =
        all_available_vertices.length -
        Math.floor(all_available_vertices.length * Populate.text * 0.01);
      for (var r = 1; r < B; r += 1) {
        delete_vertex = Math.floor(
          Math.random() * all_available_vertices.length,
        );
        l.push(all_available_vertices[delete_vertex]);
        all_available_vertices.splice(delete_vertex, 1);
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        var D =
          all_available_vertices_chips.length -
          Math.floor(
            all_available_vertices_chips.length * Populate.text * 0.01,
          );
        for (var r = 1; r < D; r += 1) {
          delete_vertex = Math.floor(
            Math.random() * all_available_vertices_chips.length,
          );
          p.push(all_available_vertices_chips[delete_vertex]);
          all_available_vertices_chips.splice(delete_vertex, 1);
        }
      }
      var C = A.length;
      old_vertex = [];
      do {
        actual_circuit_path = [];
        shortest_length = 10000000;
        writeLn(
          "Generating center-out circuit lines [ " +
            (C - A.length) +
            1 +
            " of " +
            C +
            " ]",
        );
        progressBar_text.text =
          "Generating center-out circuit lines [ " +
          (C - A.length) +
          1 +
          " of " +
          C +
          " ]";
        PB.value = Math.round(((C - A.length) / C) * 100);
        PresetsPal.update();
        next_found = true;
        y = [];
        c = Math.floor(Math.random() * A.length);
        current_vertex = A[c];
        A.splice(c, 1);
        old_vertex = current_vertex;
        e = 0;
        for (; e < all_available_vertices.length; e++) {
          if (
            current_vertex.toString() == all_available_vertices[e].toString()
          ) {
            all_available_vertices.splice(e, 1);
            l.push(current_vertex);
            break;
          }
        }
        var y = [0, 0];
        actual_circuit_path.push(current_vertex);
        while (E < 1) {
          a = 0;
          for (; a < u.length; a++) {
            if (current_vertex.toString() == u[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0],
                current_vertex[1] - step_H,
              ]);
            }
            if (current_vertex.toString() == h[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0],
                current_vertex[1] + step_H,
              ]);
            }
          }
          a = 0;
          for (; a < f.length; a++) {
            if (current_vertex.toString() == f[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0] + step_W,
                current_vertex[1],
              ]);
            }
            if (current_vertex.toString() == d[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0] - step_W,
                current_vertex[1],
              ]);
            }
          }
          current_vertex = actual_circuit_path[actual_circuit_path.length - 1];
          l.push(current_vertex);
          E++;
        }
        var _ = curComp.width * 0.5 - current_vertex[0];
        var S = curComp.height * 0.5 - current_vertex[1];
        var V = Math.sqrt(_ * _ + S * S);
        destinationX = Math.round(
          current_vertex[0] +
            ((current_vertex[0] - curComp.width * 0.5) / V) * 2000,
        );
        destinationY = Math.round(
          current_vertex[1] +
            ((current_vertex[1] - curComp.height * 0.5) / V) * 2000,
        );
        destination_vertex = [destinationX, destinationY];
        E = 0;
        while (y.length > 0) {
          if (
            DirectionDropdown.selection.index == 13 ||
            DirectionDropdown.selection.index == 14
          ) {
            possible_movements_outwards();
          } else {
            possible_movements();
          }
          var y = [];
          for (var r = 0; r < try_array.length; r += 1) {
            next_found = true;
            for (var t = 0; t < l.length; t += 1) {
              if (l[t].toString() == try_array[r].toString()) {
                next_found = false;
                break;
              }
            }
            if (CrossingCheckbox.value && next_found) {
              switch (try_array[r]) {
                case pano_deksia:
                  for (var t = 0; t < l.length; t += 1) {
                    if (l[t].toString() == pano.toString()) {
                      if (t != l.length - 1) {
                        if (l[t + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (l[t - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_aristera:
                  for (var t = 0; t < l.length; t += 1) {
                    if (l[t].toString() == kato.toString()) {
                      if (t != l.length - 1) {
                        if (l[t + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (l[t - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case pano_aristera:
                  for (var t = 0; t < l.length; t += 1) {
                    if (l[t].toString() == pano.toString()) {
                      if (t != l.length - 1) {
                        if (l[t + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (l[t - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_deksia:
                  for (var t = 0; t < l.length; t += 1) {
                    if (l[t].toString() == kato.toString()) {
                      if (t != l.length - 1) {
                        if (l[t + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (l[t - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
              }
            }
            if (next_found == true) {
              y.push(try_array[r]);
            }
          }
          r = 0;
          for (; r < n.length; r++) {
            if (current_vertex.toString() == n[r].toString()) {
              y = [];
              break;
            }
          }
          if (y.length == 0) {
            break;
          }
          if (actual_circuit_path.length >= LinesMax.text) {
            break;
          }
          verified_vertex = y[Math.floor(Math.random() * y.length)];
          actual_circuit_path.push(verified_vertex);
          old_vertex = current_vertex;
          current_vertex = verified_vertex;
          e = 0;
          for (; e < all_available_vertices.length; e++) {
            if (
              current_vertex.toString() == all_available_vertices[e].toString()
            ) {
              all_available_vertices.splice(e, 1);
              l.push(current_vertex);
              break;
            }
          }
        }
        if (actual_circuit_path.length >= LinesMin.text) {
          shape_pointer = new Shape();
          shape_pointer.vertices = actual_circuit_path;
          shape_pointer.closed = false;
          m++;
          curComp
            .layer(
              shapeLayer.name,
            )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
            .addProperty("ADBE Vector Group").name = "circles " + m;
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(
                shapeLayer.name,
              )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
              .addProperty("ADBE Vector Group").name = "line " + m;
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
              .setValue(shape_pointer);
            if (ClustersPerCentCheckbox.value) {
              var G = Math.floor(Math.random() * 100 + 1);
              if (G <= ClustersPerCent.text) {
                G = Math.floor(Math.random() * 100 + 1);
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - Offset")(
                    "ADBE Vector Offset Line Join",
                  )
                  .setValue(2);
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                  "ADBE Vector Filter - Offset",
                )("ADBE Vector Offset Amount").expression =
                  'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                  Math.random() * 4 +
                  ")";
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
                  .setValue(shape_pointer);
                if (G >= 33 && G < 66) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
                if (G < 33) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .property(6).name = "Offset 3";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                    "Offset 3",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
              }
            }
            if (RandomizeTrimStartCheckbox.value) {
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - RC")(
                "ADBE Vector RoundCorner Radius",
              ).expression =
                'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Start").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim End").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Offset").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")+' +
                Math.random() * 359 +
                1 +
                ";";
            }
          }
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")
            .addProperty("ADBE Vector Shape - Ellipse").name = "start circle";
          curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
            "circuit circles",
          )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
            "start circle",
          )("ADBE Vector Ellipse Size").expression =
            '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
              "start circle",
            )("ADBE Vector Ellipse Position")
            .setValue([
              shape_pointer.vertices[0][0],
              shape_pointer.vertices[0][1],
            ]);
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Ellipse").name = "end circle";
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
              "end circle",
            )("ADBE Vector Ellipse Size").expression =
              '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
                "end circle",
              )("ADBE Vector Ellipse Position")
              .setValue([
                shape_pointer.vertices[shape_pointer.vertices.length - 1][0],
                shape_pointer.vertices[shape_pointer.vertices.length - 1][1],
              ]);
          }
        }
        if (masksCheckbox.value) {
          if (actual_circuit_path.length > 1) {
            offset_path();
            j("ADBE Mask Parade").addProperty("Mask").name =
              "circuit Line " + j("ADBE Mask Parade").numProperties + 1;
            myShape = j("ADBE Mask Parade")(
              "circuit Line " + j("ADBE Mask Parade").numProperties.toString(),
            )("ADBE Mask Shape").value;
            myShape.vertices = actual_circuit_path_offset_A.concat(
              actual_circuit_path_offset_B.slice().reverse(),
            );
            myShape.closed = true;
            j("ADBE Mask Parade")(
              "circuit Line " + j("ADBE Mask Parade").numProperties,
            )("ADBE Mask Shape").setValue(myShape);
            j("ADBE Mask Parade")(
              "circuit Line " + j("ADBE Mask Parade").numProperties,
            )("ADBE Mask Offset").expression =
              'value + effect("Masks Expansion")("ADBE Slider Control-0001")';
            j("ADBE Mask Parade")(
              "circuit Line " + j("ADBE Mask Parade").numProperties,
            )("ADBE Mask Feather").expression =
              'value + effect("Masks Feather")("ADBE Slider Control-0001")';
          }
        }
      } while (A.length != 0);
      PB.value = 0;
      var C = all_available_vertices.length;
      if (DirectionDropdown.selection.index != 14) {
        do {
          writeLn(
            "Generating circuit lines [ " +
              (C - all_available_vertices.length) +
              1 +
              " of " +
              C +
              " ]",
          );
          progressBar_text.text =
            "Generating circuit lines [ " +
            (C - all_available_vertices.length) +
            1 +
            " of " +
            C +
            " ]";
          PB.value = Math.round(
            ((C - all_available_vertices.length) / C) * 100,
          );
          PresetsPal.update();
          next_found = true;
          old_vertex = [];
          y = [];
          actual_circuit_path = [];
          shortest_length = 10000000;
          c = Math.floor(Math.random() * all_available_vertices.length);
          current_vertex = all_available_vertices[c];
          all_available_vertices.splice(c, 1);
          l.push(current_vertex);
          var _ = curComp.width * 0.5 - current_vertex[0];
          var S = curComp.height * 0.5 - current_vertex[1];
          var V = Math.sqrt(_ * _ + S * S);
          destinationX = Math.round(
            current_vertex[0] +
              ((current_vertex[0] - curComp.width * 0.5) / V) * 2000,
          );
          destinationY = Math.round(
            current_vertex[1] +
              ((current_vertex[1] - curComp.height * 0.5) / V) * 2000,
          );
          destination_vertex = [destinationX, destinationY];
          var y = [0, 0];
          actual_circuit_path.push(current_vertex);
          while (y.length > 0) {
            if (DirectionDropdown.selection.index == 13) {
              possible_movements_outwards();
            } else {
              possible_movements();
            }
            var y = [];
            for (var r = 0; r < try_array.length; r += 1) {
              next_found = true;
              for (var t = 0; t < l.length; t += 1) {
                if (l[t].toString() == try_array[r].toString()) {
                  next_found = false;
                  break;
                }
              }
              if (CrossingCheckbox.value && next_found) {
                switch (try_array[r]) {
                  case pano_deksia:
                    for (var t = 0; t < l.length; t += 1) {
                      if (l[t].toString() == pano.toString()) {
                        if (t != l.length - 1) {
                          if (l[t + 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (l[t - 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                    break;
                  case kato_aristera:
                    for (var t = 0; t < l.length; t += 1) {
                      if (l[t].toString() == kato.toString()) {
                        if (t != l.length - 1) {
                          if (l[t + 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (l[t - 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                    break;
                  case pano_aristera:
                    for (var t = 0; t < l.length; t += 1) {
                      if (l[t].toString() == pano.toString()) {
                        if (t != l.length - 1) {
                          if (l[t + 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (l[t - 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                    break;
                  case kato_deksia:
                    for (var t = 0; t < l.length; t += 1) {
                      if (l[t].toString() == kato.toString()) {
                        if (t != l.length - 1) {
                          if (l[t + 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (l[t - 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                }
              }
              if (next_found) {
                y.push(try_array[r]);
              }
            }
            for (var r = 0; r < n.length; r += 1) {
              if (current_vertex.toString() == n[r].toString()) {
                y = [];
                break;
              }
            }
            if (y.length == 0) {
              break;
            }
            if (actual_circuit_path.length >= LinesMax.text) {
              break;
            }
            verified_vertex = y[Math.floor(Math.random() * y.length)];
            actual_circuit_path.push(verified_vertex);
            old_vertex = current_vertex;
            current_vertex = verified_vertex;
            for (var e = 0; e < all_available_vertices.length; e += 1) {
              if (
                current_vertex.toString() ==
                all_available_vertices[e].toString()
              ) {
                all_available_vertices.splice(e, 1);
                l.push(current_vertex);
                break;
              }
            }
          }
          if (actual_circuit_path.length >= LinesMin.text) {
            shape_pointer = new Shape();
            shape_pointer.vertices = actual_circuit_path;
            shape_pointer.closed = false;
            m++;
            curComp
              .layer(
                shapeLayer.name,
              )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
              .addProperty("ADBE Vector Group").name = "circles " + m;
            if (actual_circuit_path.length > 1) {
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
                .addProperty("ADBE Vector Group").name = "line " + m;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
                .setValue(shape_pointer);
              if (ClustersPerCentCheckbox.value) {
                var G = Math.floor(Math.random() * 100 + 1);
                if (G <= ClustersPerCent.text) {
                  G = Math.floor(Math.random() * 100 + 1);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                    "ADBE Vector Filter - Offset",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                  if (G >= 33 && G < 66) {
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Filter - Offset")(
                        "ADBE Vector Offset Line Join",
                      )
                      .setValue(2);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .property(4).name = "Offset 2";
                    curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                      "Offset 2",
                    )("ADBE Vector Offset Amount").expression =
                      'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                      Math.random() * 4 +
                      ")";
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Shape - Group")(
                        "ADBE Vector Shape",
                      )
                      .setValue(shape_pointer);
                  }
                  if (G < 33) {
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Filter - Offset")(
                        "ADBE Vector Offset Line Join",
                      )
                      .setValue(2);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .property(4).name = "Offset 2";
                    curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                      "Offset 2",
                    )("ADBE Vector Offset Amount").expression =
                      'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                      Math.random() * 4 +
                      ")";
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Shape - Group")(
                        "ADBE Vector Shape",
                      )
                      .setValue(shape_pointer);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Filter - Offset")(
                        "ADBE Vector Offset Line Join",
                      )
                      .setValue(2);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .property(6).name = "Offset 3";
                    curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                      "Offset 3",
                    )("ADBE Vector Offset Amount").expression =
                      'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                      Math.random() * 4 +
                      ")";
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Shape - Group")(
                        "ADBE Vector Shape",
                      )
                      .setValue(shape_pointer);
                  }
                }
              }
              if (RandomizeTrimStartCheckbox.value) {
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - RC")(
                  "ADBE Vector RoundCorner Radius",
                ).expression =
                  'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - Trim").name =
                  "Trim Paths 1";
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                  "Trim Paths 1",
                )("ADBE Vector Trim Start").expression =
                  'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                  "Trim Paths 1",
                )("ADBE Vector Trim End").expression =
                  'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + m)("ADBE Vectors Group")(
                  "Trim Paths 1",
                )("ADBE Vector Trim Offset").expression =
                  'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")+' +
                  Math.random() * 359 +
                  1 +
                  ";";
              }
            }
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Ellipse").name = "start circle";
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
              "start circle",
            )("ADBE Vector Ellipse Size").expression =
              '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
                "start circle",
              )("ADBE Vector Ellipse Position")
              .setValue([
                shape_pointer.vertices[0][0],
                shape_pointer.vertices[0][1],
              ]);
            if (actual_circuit_path.length > 1) {
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit circles",
                )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Ellipse").name = "end circle";
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
                "end circle",
              )("ADBE Vector Ellipse Size").expression =
                '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit circles",
                )("ADBE Vectors Group")("circles " + m)("ADBE Vectors Group")(
                  "end circle",
                )("ADBE Vector Ellipse Position")
                .setValue([
                  shape_pointer.vertices[shape_pointer.vertices.length - 1][0],
                  shape_pointer.vertices[shape_pointer.vertices.length - 1][1],
                ]);
            }
          }
          if (masksCheckbox.value) {
            if (actual_circuit_path.length > 1) {
              offset_path();
              j("ADBE Mask Parade").addProperty("Mask").name =
                "circuit Line " + j("ADBE Mask Parade").numProperties + 1;
              myShape = j("ADBE Mask Parade")(
                "circuit Line " +
                  j("ADBE Mask Parade").numProperties.toString(),
              )("ADBE Mask Shape").value;
              myShape.vertices = actual_circuit_path_offset_A.concat(
                actual_circuit_path_offset_B.slice().reverse(),
              );
              myShape.closed = true;
              j("ADBE Mask Parade")(
                "circuit Line " + j("ADBE Mask Parade").numProperties,
              )("ADBE Mask Shape").setValue(myShape);
              j("ADBE Mask Parade")(
                "circuit Line " + j("ADBE Mask Parade").numProperties,
              )("ADBE Mask Offset").expression =
                'value + effect("Masks Expansion")("ADBE Slider Control-0001")';
              j("ADBE Mask Parade")(
                "circuit Line " + j("ADBE Mask Parade").numProperties,
              )("ADBE Mask Feather").expression =
                'value + effect("Masks Feather")("ADBE Slider Control-0001")';
            }
          }
        } while (all_available_vertices.length != 0);
      }
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vector Transform Group")("ADBE Vector Group Opacity").expression =
        'effect("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression =
        'effect("[ CIRCLES ]: stroke color")("ADBE Color Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression =
        'effect("[ CIRCLES ]: fill color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Opacity",
      ).expression =
        'effect("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression =
        'effect("[ CIRCLES ]: stroke width")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression = 'effect("[ LINES ]: color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression = 'effect("[ LINES ]: width")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Opacity",
      ).expression = 'effect("[ LINES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Line Cap")
        .setValue(2);
      if (RandomizeTrimStartCheckbox.value == false) {
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - RC")(
          "ADBE Vector RoundCorner Radius",
        ).expression =
          'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Start",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim End",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Offset",
        ).expression =
          'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      }
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 2";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("Trim Paths 2")("ADBE Vector Trim Type")
        .setValue(2);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Start",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim Start")("ADBE Slider Control-0001"):0';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim End",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim End")("ADBE Slider Control-0001"):100';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Offset",
      ).expression =
        'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      if (ChipsCheckbox.value) {
        createCircuit_Chips();
      }
      if (CapacitorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Capacitors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips, and there is no more room on this circuit to put any Capacitors!\r\rNo Capacitors group will be created.",
            "circuitFX alert",
          );
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")
            .remove();
          Capacitors.text = CapacitorsSlider.value = 0;
        } else {
          createCircuit_Capacitors();
        }
      }
      if (ResistorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Resistors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips and/or Capacitors, and there is no more room on this circuit to put any Resistors!\r\rNo Resistors group will be created.",
            "circuitFX alert",
          );
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")
            .remove();
          Resistors.text = ResistorsSlider.value = 0;
        } else {
          createCircuit_Resistors();
        }
      }
      createCircuit_Backplate();
      PB.value = 0;
      PresetsPal.close();
      PresetsPal = null;
      if (TempMessageCheckbox.value) {
        tempComp.remove();
      }
      curComp.openInViewer();
      app.activeViewer.setActive();
      app.executeCommand(2771);
      app.executeCommand(2387);
      curComp.layer(shapeLayer.name).selected = true;
    }
    function createCircuit_center_seperate() {
      if (Ili1.s() == false) {
        isTrial = !Ili1.s();
      }
      createCircuit_Backplate();
      var s = [];
      var c = [];
      var l = [];
      var n = [];
      var p = [];
      var u = [];
      var h = [];
      var d = 0;
      curComp = app.project.activeItem;
      create_TempMessageComp();
      shapeLayer = curComp.layers.addShape();
      shapeLayer2 = curComp.layers.addShape();
      shapeLayer.name = "circuitFX " + ruler + " - Lines";
      shapeLayer2.name = "circuitFX " + ruler + " - Circles";
      shapeLayer.comment = shapeLayer2.comment =
        "circuitFX v" + af_settings.scriptVersion;
      shapeLayer.label = shapeLayer2.label = labelColor;
      var f = 0;
      if (masksCheckbox.value) {
        var A = curComp.layers.addSolid(
          [1, 1, 1],
          "circuitFX " + ruler + " - Masks Layer",
          curComp.width,
          curComp.height,
          curComp.pixelAspect,
          curComp.duration,
        );
        A.label = labelColor;
        A.enabled = false;
        A.Effects.addProperty("ADBE Slider Control").name = "Masks Expansion";
        A("ADBE Effect Parade")("Masks Expansion")(
          "ADBE Slider Control-0001",
        ).setValue(0);
        A.Effects.addProperty("ADBE Slider Control").name = "Masks Feather";
        A("ADBE Effect Parade")("Masks Feather")(
          "ADBE Slider Control-0001",
        ).setValue(0);
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim Start";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim End";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: trim End")("ADBE Slider Control-0001")
        .setValue(100);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Angle Control").name =
        "[ LINES ]: trim Offset";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Checkbox Control").name =
        "[ LINES ]: trim individually";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: width";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: width")(
          "ADBE Slider Control-0001",
        )
        .setValue(step_W > step_H ? step_H * 0.02 : step_W * 0.02);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: round corners";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: round corners")("ADBE Slider Control-0001")
        .setValue(3);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name = "[ LINES ]: color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: color")(
          "ADBE Color Control-0001",
        )
        .setValue([rL / 255, gL / 255, bL / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      if (ClustersPerCentCheckbox.value) {
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Effect Parade")("[ LINES ]: cluster offset")("ADBE Slider Control-0001")
          .setValue(3);
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset randomness";
      }
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ CIRCLES ]: size";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")("[ CIRCLES ]: size")(
          "ADBE Slider Control-0001",
        )
        .setValue(
          step_W > step_H
            ? Math.round((step_H / 6.667) * 100) * 0.01
            : Math.round((step_W / 6.667) * 100) * 0.01,
        );
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: fill color";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: fill color",
        )("ADBE Color Control-0001")
        .setValue([rFC / 255, gFC / 255, bFC / 255, 1]);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: fill opacity";
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")
        .setValue(10);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: stroke color";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke color",
        )("ADBE Color Control-0001")
        .setValue([rSC / 255, gSC / 255, bSC / 255, 1]);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: stroke width";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke width",
        )("ADBE Slider Control-0001")
        .setValue(step_W > step_H ? step_H * 0.05 : step_W * 0.05);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: opacity";
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      curComp
        .layer(shapeLayer2.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit circles";
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit lines";
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer2.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer2.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      pass_GridX = GridX.text;
      pass_GridY = GridY.text;
      create_all_available_vertices_lines_chips();
      PB.value = 0;
      for (var a = 0; a <= GridX.text; a += 1) {
        s.push([step_W * a, 0]);
      }
      for (var a = 0; a < GridX.text; a += 1) {
        s.push([step_W * a, step_H * GridY.text]);
      }
      for (var a = 1; a < GridY.text; a += 1) {
        s.push([0, step_H * a]);
      }
      for (var a = 1; a <= GridY.text; a += 1) {
        s.push([step_W * GridX.text, step_H * a]);
      }
      for (
        var o = 0;
        o <=
        Math.floor(
          ((Number(GridX.text) < Number(GridY.text)
            ? GridX.text
            : GridY.text / 2) -
            2) *
            boxRadius.text *
            0.01,
        );
        o += 1
      ) {
        for (
          a = Math.floor(GridX.text * 0.5) - o;
          a <= Math.floor(GridX.text * 0.5) + o;
          a++
        ) {
          s.push([step_W * a, (Math.floor(GridY.text * 0.5) - o) * step_H]);
        }
        for (
          a = Math.floor(GridX.text * 0.5) - o;
          a < Math.floor(GridX.text * 0.5) + o;
          a++
        ) {
          s.push([step_W * a, (Math.floor(GridY.text * 0.5) + o) * step_H]);
        }
        for (
          a = Math.floor(GridY.text * 0.5) - o + 1;
          a < Math.floor(GridY.text * 0.5) + o;
          a++
        ) {
          s.push([(Math.floor(GridX.text * 0.5) - o) * step_W, step_H * a]);
        }
        for (
          a = Math.floor(GridY.text * 0.5) - o + 1;
          a <= Math.floor(GridY.text * 0.5) + o;
          a++
        ) {
          s.push([(Math.floor(GridX.text * 0.5) + o) * step_W, step_H * a]);
        }
      }
      o++;
      for (
        a = Math.floor(GridX.text * 0.5) - o + 1;
        a <= Math.floor(GridX.text * 0.5) + o - 1;
        a++
      ) {
        l.push([step_W * a, (Math.floor(GridY.text * 0.5) - o) * step_H]);
      }
      for (
        a = Math.floor(GridX.text * 0.5) - o + 1;
        a < Math.floor(GridX.text * 0.5) + o;
        a++
      ) {
        n.push([step_W * a, (Math.floor(GridY.text * 0.5) + o) * step_H]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - o + 2;
        a < Math.floor(GridY.text * 0.5) + o - 1;
        a++
      ) {
        p.push([(Math.floor(GridX.text * 0.5) - o) * step_W, step_H * a]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - o + 2;
        a <= Math.floor(GridY.text * 0.5) + o - 2;
        a++
      ) {
        u.push([(Math.floor(GridX.text * 0.5) + o) * step_W, step_H * a]);
      }
      h = l.concat(n);
      h = h.concat(p);
      h = h.concat(u);
      s = s.concat(h);
      l = [];
      n = [];
      p = [];
      u = [];
      h = [];
      o--;
      for (
        a = Math.floor(GridX.text * 0.5) - o;
        a <= Math.floor(GridX.text * 0.5) + o;
        a++
      ) {
        l.push([step_W * a, (Math.floor(GridY.text * 0.5) - o) * step_H]);
      }
      for (
        a = Math.floor(GridX.text * 0.5) - o;
        a < Math.floor(GridX.text * 0.5) + o + 1;
        a++
      ) {
        n.push([step_W * a, (Math.floor(GridY.text * 0.5) + o) * step_H]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - o + 1;
        a < Math.floor(GridY.text * 0.5) + o;
        a++
      ) {
        p.push([(Math.floor(GridX.text * 0.5) - o) * step_W, step_H * a]);
      }
      for (
        a = Math.floor(GridY.text * 0.5) - o + 1;
        a <= Math.floor(GridY.text * 0.5) + o - 1;
        a++
      ) {
        u.push([(Math.floor(GridX.text * 0.5) + o) * step_W, step_H * a]);
      }
      h = l.concat(n);
      h = h.concat(p);
      h = h.concat(u);
      s = s.concat(h);
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        var c = s.slice(0);
        for (var a = 1; a <= GridX.text - 1; a += 1) {
          c.push([step_W * a, step_H]);
        }
        for (var a = 1; a < GridX.text - 1; a += 1) {
          c.push([step_W * a, step_H * (GridY.text - 1)]);
        }
        for (var a = 2; a < GridY.text - 1; a += 1) {
          c.push([step_W, step_H * a]);
        }
        for (var a = 2; a <= GridY.text - 1; a += 1) {
          c.push([step_W * (GridX.text - 1), step_H * a]);
        }
      }
      for (var r = 0; r < s.length; r += 1) {
        for (var e = 0; e < all_available_vertices.length; e += 1) {
          if (s[r].toString() == all_available_vertices[e].toString()) {
            all_available_vertices.splice(e, 1);
          }
        }
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        for (var r = 0; r < c.length; r += 1) {
          for (var e = 0; e < all_available_vertices_chips.length; e += 1) {
            if (c[r].toString() == all_available_vertices_chips[e].toString()) {
              all_available_vertices_chips.splice(e, 1);
            }
          }
        }
      }
      var E =
        all_available_vertices.length -
        Math.floor(all_available_vertices.length * Populate.text * 0.01);
      for (var r = 1; r < E; r += 1) {
        delete_vertex = Math.floor(
          Math.random() * all_available_vertices.length,
        );
        s.push(all_available_vertices[delete_vertex]);
        all_available_vertices.splice(delete_vertex, 1);
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        var m =
          all_available_vertices_chips.length -
          Math.floor(
            all_available_vertices_chips.length * Populate.text * 0.01,
          );
        for (var r = 1; r < m; r += 1) {
          delete_vertex = Math.floor(
            Math.random() * all_available_vertices_chips.length,
          );
          c.push(all_available_vertices_chips[delete_vertex]);
          all_available_vertices_chips.splice(delete_vertex, 1);
        }
      }
      _ = h.length;
      old_vertex = [];
      do {
        actual_circuit_path = [];
        shortest_length = 10000000;
        writeLn(
          "Generating center-out circuit lines [ " +
            (_ - h.length) +
            1 +
            " of " +
            _ +
            " ]",
        );
        progressBar_text.text =
          "Generating center-out circuit lines [ " +
          (_ - h.length) +
          1 +
          " of " +
          _ +
          " ]";
        PB.value = Math.round(((_ - h.length) / _) * 100);
        PresetsPal.update();
        next_found = true;
        j = [];
        i = Math.floor(Math.random() * h.length);
        current_vertex = h[i];
        h.splice(i, 1);
        old_vertex = current_vertex;
        for (var e = 0; e < all_available_vertices.length; e += 1) {
          if (
            current_vertex.toString() == all_available_vertices[e].toString()
          ) {
            all_available_vertices.splice(e, 1);
          }
        }
        var j = [0, 0];
        actual_circuit_path.push(current_vertex);
        while (d < 1) {
          for (var a = 0; a < l.length; a += 1) {
            if (current_vertex.toString() == l[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0],
                current_vertex[1] - step_H,
              ]);
            }
            if (current_vertex.toString() == n[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0],
                current_vertex[1] + step_H,
              ]);
            }
          }
          for (var a = 0; a < u.length; a += 1) {
            if (current_vertex.toString() == u[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0] + step_W,
                current_vertex[1],
              ]);
            }
            if (current_vertex.toString() == p[a].toString()) {
              actual_circuit_path.push([
                current_vertex[0] - step_W,
                current_vertex[1],
              ]);
            }
          }
          current_vertex = actual_circuit_path[actual_circuit_path.length - 1];
          s.push(current_vertex);
          d++;
        }
        var B = curComp.width * 0.5 - current_vertex[0];
        var D = curComp.height * 0.5 - current_vertex[1];
        var C = Math.sqrt(B * B + D * D);
        destinationX = Math.round(
          current_vertex[0] +
            ((current_vertex[0] - curComp.width * 0.5) / C) * 2000,
        );
        destinationY = Math.round(
          current_vertex[1] +
            ((current_vertex[1] - curComp.height * 0.5) / C) * 2000,
        );
        destination_vertex = [destinationX, destinationY];
        d = 0;
        while (j.length > 0) {
          if (
            DirectionDropdown.selection.index == 13 ||
            DirectionDropdown.selection.index == 14
          ) {
            possible_movements_outwards();
          } else {
            possible_movements();
          }
          var j = [];
          for (var r = 0; r < try_array.length; r += 1) {
            next_found = true;
            for (var t = 0; t < s.length; t += 1) {
              if (s[t].toString() == try_array[r].toString()) {
                next_found = false;
                break;
              }
            }
            if (CrossingCheckbox.value && next_found) {
              switch (try_array[r]) {
                case pano_deksia:
                  for (var t = 0; t < s.length; t += 1) {
                    if (s[t].toString() == pano.toString()) {
                      if (t != s.length - 1) {
                        if (s[t + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (s[t - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_aristera:
                  for (var t = 0; t < s.length; t += 1) {
                    if (s[t].toString() == kato.toString()) {
                      if (t != s.length - 1) {
                        if (s[t + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (s[t - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case pano_aristera:
                  for (var t = 0; t < s.length; t += 1) {
                    if (s[t].toString() == pano.toString()) {
                      if (t != s.length - 1) {
                        if (s[t + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (s[t - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_deksia:
                  for (var t = 0; t < s.length; t += 1) {
                    if (s[t].toString() == kato.toString()) {
                      if (t != s.length - 1) {
                        if (s[t + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (t != 0) {
                        if (s[t - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
              }
            }
            if (next_found) {
              j.push(try_array[r]);
            }
          }
          if (j.length == 0) {
            break;
          }
          if (actual_circuit_path.length >= LinesMax.text) {
            break;
          }
          verified_vertex = j[Math.floor(Math.random() * j.length)];
          actual_circuit_path.push(verified_vertex);
          old_vertex = current_vertex;
          current_vertex = verified_vertex;
          for (var e = 0; e < all_available_vertices.length; e += 1) {
            if (
              current_vertex.toString() == all_available_vertices[e].toString()
            ) {
              all_available_vertices.splice(e, 1);
              s.push(current_vertex);
              break;
            }
          }
        }
        if (actual_circuit_path.length >= LinesMin.text) {
          shape_pointer = new Shape();
          shape_pointer.vertices = actual_circuit_path;
          shape_pointer.closed = false;
          f++;
          curComp
            .layer(
              shapeLayer2.name,
            )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
            .addProperty("ADBE Vector Group").name = "circles " + f;
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(
                shapeLayer.name,
              )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
              .addProperty("ADBE Vector Group").name = "line " + f;
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
              .setValue(shape_pointer);
            if (ClustersPerCentCheckbox.value) {
              var y = Math.floor(Math.random() * 100 + 1);
              if (y <= ClustersPerCent.text) {
                y = Math.floor(Math.random() * 100 + 1);
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - Offset")(
                    "ADBE Vector Offset Line Join",
                  )
                  .setValue(2);
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                  "ADBE Vector Filter - Offset",
                )("ADBE Vector Offset Amount").expression =
                  'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                  Math.random() * 4 +
                  ")";
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
                  .setValue(shape_pointer);
                if (y >= 33 && y < 66) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
                if (y < 33) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .property(6).name = "Offset 3";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                    "Offset 3",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
              }
            }
            if (RandomizeTrimStartCheckbox.value) {
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - RC")(
                "ADBE Vector RoundCorner Radius",
              ).expression =
                'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Start").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim End").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Offset").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")+' +
                Math.random() * 359 +
                1 +
                ";";
            }
          }
          curComp
            .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")
            .addProperty("ADBE Vector Shape - Ellipse").name = "start circle";
          curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
            "circuit circles",
          )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
            "start circle",
          )("ADBE Vector Ellipse Size").expression =
            '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
          curComp
            .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
              "start circle",
            )("ADBE Vector Ellipse Position")
            .setValue([
              shape_pointer.vertices[0][0],
              shape_pointer.vertices[0][1],
            ]);
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Ellipse").name = "end circle";
            curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
              "end circle",
            )("ADBE Vector Ellipse Size").expression =
              '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
            curComp
              .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
                "end circle",
              )("ADBE Vector Ellipse Position")
              .setValue([
                shape_pointer.vertices[shape_pointer.vertices.length - 1][0],
                shape_pointer.vertices[shape_pointer.vertices.length - 1][1],
              ]);
          }
        }
        if (masksCheckbox.value) {
          if (actual_circuit_path.length > 1) {
            offset_path();
            A("ADBE Mask Parade").addProperty("Mask").name =
              "circuit Line " + A("ADBE Mask Parade").numProperties + 1;
            myShape = A("ADBE Mask Parade")(
              "circuit Line " + A("ADBE Mask Parade").numProperties.toString(),
            )("ADBE Mask Shape").value;
            myShape.vertices = actual_circuit_path_offset_A.concat(
              actual_circuit_path_offset_B.slice().reverse(),
            );
            myShape.closed = true;
            A("ADBE Mask Parade")(
              "circuit Line " + A("ADBE Mask Parade").numProperties,
            )("ADBE Mask Shape").setValue(myShape);
            A("ADBE Mask Parade")(
              "circuit Line " + A("ADBE Mask Parade").numProperties,
            )("ADBE Mask Offset").expression =
              'value + effect("Masks Expansion")("ADBE Slider Control-0001")';
            A("ADBE Mask Parade")(
              "circuit Line " + A("ADBE Mask Parade").numProperties,
            )("ADBE Mask Feather").expression =
              'value + effect("Masks Feather")("ADBE Slider Control-0001")';
          }
        }
      } while (h.length != 0);
      PB.value = 0;
      var _ = all_available_vertices.length;
      if (DirectionDropdown.selection.index != 14) {
        do {
          writeLn(
            "Generating circuit lines [ " +
              (_ - all_available_vertices.length) +
              1 +
              " of " +
              _ +
              " ]",
          );
          progressBar_text.text =
            "Generating circuit lines [ " +
            (_ - all_available_vertices.length) +
            1 +
            " of " +
            _ +
            " ]";
          PB.value = Math.round(
            ((_ - all_available_vertices.length) / _) * 100,
          );
          PresetsPal.update();
          next_found = true;
          old_vertex = [];
          j = [];
          actual_circuit_path = [];
          shortest_length = 10000000;
          i = Math.floor(Math.random() * all_available_vertices.length);
          current_vertex = all_available_vertices[i];
          all_available_vertices.splice(i, 1);
          s.push(current_vertex);
          var B = curComp.width * 0.5 - current_vertex[0];
          var D = curComp.height * 0.5 - current_vertex[1];
          var C = Math.sqrt(B * B + D * D);
          destinationX = Math.round(
            current_vertex[0] +
              ((current_vertex[0] - curComp.width * 0.5) / C) * 2000,
          );
          destinationY = Math.round(
            current_vertex[1] +
              ((current_vertex[1] - curComp.height * 0.5) / C) * 2000,
          );
          destination_vertex = [destinationX, destinationY];
          var j = [0, 0];
          actual_circuit_path.push(current_vertex);
          while (j.length > 0) {
            if (DirectionDropdown.selection.index == 13) {
              possible_movements_outwards();
            } else {
              possible_movements();
            }
            var j = [];
            for (var r = 0; r < try_array.length; r += 1) {
              next_found = true;
              for (var t = 0; t < s.length; t += 1) {
                if (s[t].toString() == try_array[r].toString()) {
                  next_found = false;
                  break;
                }
              }
              if (CrossingCheckbox.value && next_found) {
                switch (try_array[r]) {
                  case pano_deksia:
                    for (var t = 0; t < s.length; t += 1) {
                      if (s[t].toString() == pano.toString()) {
                        if (t != s.length - 1) {
                          if (s[t + 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (s[t - 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                    break;
                  case kato_aristera:
                    for (var t = 0; t < s.length; t += 1) {
                      if (s[t].toString() == kato.toString()) {
                        if (t != s.length - 1) {
                          if (s[t + 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (s[t - 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                    break;
                  case pano_aristera:
                    for (var t = 0; t < s.length; t += 1) {
                      if (s[t].toString() == pano.toString()) {
                        if (t != s.length - 1) {
                          if (s[t + 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (s[t - 1].toString() == aristera.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                    break;
                  case kato_deksia:
                    for (var t = 0; t < s.length; t += 1) {
                      if (s[t].toString() == kato.toString()) {
                        if (t != s.length - 1) {
                          if (s[t + 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                        if (t != 0) {
                          if (s[t - 1].toString() == deksia.toString()) {
                            next_found = false;
                          }
                        }
                      }
                    }
                }
              }
              if (next_found) {
                j.push(try_array[r]);
              }
            }
            if (j.length == 0) {
              break;
            }
            if (actual_circuit_path.length >= LinesMax.text) {
              break;
            }
            verified_vertex = j[Math.floor(Math.random() * j.length)];
            actual_circuit_path.push(verified_vertex);
            old_vertex = current_vertex;
            current_vertex = verified_vertex;
            for (var e = 0; e < all_available_vertices.length; e += 1) {
              if (
                current_vertex.toString() ==
                all_available_vertices[e].toString()
              ) {
                all_available_vertices.splice(e, 1);
                s.push(current_vertex);
                break;
              }
            }
          }
          if (actual_circuit_path.length >= LinesMin.text) {
            shape_pointer = new Shape();
            shape_pointer.vertices = actual_circuit_path;
            shape_pointer.closed = false;
            f++;
            curComp
              .layer(
                shapeLayer2.name,
              )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
              .addProperty("ADBE Vector Group").name = "circles " + f;
            if (actual_circuit_path.length > 1) {
              curComp
                .layer(
                  shapeLayer.name,
                )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
                .addProperty("ADBE Vector Group").name = "line " + f;
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
                .setValue(shape_pointer);
              if (ClustersPerCentCheckbox.value) {
                var y = Math.floor(Math.random() * 100 + 1);
                if (y <= ClustersPerCent.text) {
                  y = Math.floor(Math.random() * 100 + 1);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                    "ADBE Vector Filter - Offset",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                  if (y >= 33 && y < 66) {
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Filter - Offset")(
                        "ADBE Vector Offset Line Join",
                      )
                      .setValue(2);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .property(4).name = "Offset 2";
                    curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                      "Offset 2",
                    )("ADBE Vector Offset Amount").expression =
                      'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                      Math.random() * 4 +
                      ")";
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Shape - Group")(
                        "ADBE Vector Shape",
                      )
                      .setValue(shape_pointer);
                  }
                  if (y < 33) {
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Filter - Offset")(
                        "ADBE Vector Offset Line Join",
                      )
                      .setValue(2);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .property(4).name = "Offset 2";
                    curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                      "Offset 2",
                    )("ADBE Vector Offset Amount").expression =
                      'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                      Math.random() * 4 +
                      ")";
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Shape - Group")(
                        "ADBE Vector Shape",
                      )
                      .setValue(shape_pointer);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Filter - Offset")(
                        "ADBE Vector Offset Line Join",
                      )
                      .setValue(2);
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .property(6).name = "Offset 3";
                    curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                      "Offset 3",
                    )("ADBE Vector Offset Amount").expression =
                      'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                      Math.random() * 4 +
                      ")";
                    curComp
                      .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                        "circuit lines",
                      )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                      .addProperty("ADBE Vector Shape - Group")(
                        "ADBE Vector Shape",
                      )
                      .setValue(shape_pointer);
                  }
                }
              }
              if (RandomizeTrimStartCheckbox.value) {
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - RC")(
                  "ADBE Vector RoundCorner Radius",
                ).expression =
                  'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - Trim").name =
                  "Trim Paths 1";
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                  "Trim Paths 1",
                )("ADBE Vector Trim Start").expression =
                  'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                  "Trim Paths 1",
                )("ADBE Vector Trim End").expression =
                  'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + f)("ADBE Vectors Group")(
                  "Trim Paths 1",
                )("ADBE Vector Trim Offset").expression =
                  'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")+' +
                  Math.random() * 359 +
                  1 +
                  ";";
              }
            }
            curComp
              .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Ellipse").name = "start circle";
            curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
              "start circle",
            )("ADBE Vector Ellipse Size").expression =
              '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
            curComp
              .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
                "start circle",
              )("ADBE Vector Ellipse Position")
              .setValue([
                shape_pointer.vertices[0][0],
                shape_pointer.vertices[0][1],
              ]);
            if (actual_circuit_path.length > 1) {
              curComp
                .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                  "circuit circles",
                )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")
                .addProperty("ADBE Vector Shape - Ellipse").name = "end circle";
              curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
                "end circle",
              )("ADBE Vector Ellipse Size").expression =
                '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
              curComp
                .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                  "circuit circles",
                )("ADBE Vectors Group")("circles " + f)("ADBE Vectors Group")(
                  "end circle",
                )("ADBE Vector Ellipse Position")
                .setValue([
                  shape_pointer.vertices[shape_pointer.vertices.length - 1][0],
                  shape_pointer.vertices[shape_pointer.vertices.length - 1][1],
                ]);
            }
          }
          if (masksCheckbox.value) {
            if (actual_circuit_path.length > 1) {
              A("ADBE Mask Parade").addProperty("Mask").name =
                "circuit Line " + A("ADBE Mask Parade").numProperties + 1;
              myShape = A("ADBE Mask Parade")(
                "circuit Line " +
                  A("ADBE Mask Parade").numProperties.toString(),
              )("ADBE Mask Shape").value;
              myShape.vertices = actual_circuit_path_offset_A.concat(
                actual_circuit_path_offset_B.slice().reverse(),
              );
              myShape.closed = true;
              A("ADBE Mask Parade")(
                "circuit Line " + A("ADBE Mask Parade").numProperties,
              )("ADBE Mask Shape").setValue(myShape);
              A("ADBE Mask Parade")(
                "circuit Line " + A("ADBE Mask Parade").numProperties,
              )("ADBE Mask Offset").expression =
                'value + effect("Masks Expansion")("ADBE Slider Control-0001")';
              A("ADBE Mask Parade")(
                "circuit Line " + A("ADBE Mask Parade").numProperties,
              )("ADBE Mask Feather").expression =
                'value + effect("Masks Feather")("ADBE Slider Control-0001")';
            }
          }
        } while (all_available_vertices.length != 0);
      }
      curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vector Transform Group")("ADBE Vector Group Opacity").expression =
        'effect("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression =
        'effect("[ CIRCLES ]: stroke color")("ADBE Color Control-0001")';
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression =
        'effect("[ CIRCLES ]: fill color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Opacity",
      ).expression =
        'effect("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression =
        'effect("[ CIRCLES ]: stroke width")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression = 'effect("[ LINES ]: color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression = 'effect("[ LINES ]: width")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Opacity",
      ).expression = 'effect("[ LINES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Line Cap")
        .setValue(2);
      if (RandomizeTrimStartCheckbox.value == false) {
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - RC")(
          "ADBE Vector RoundCorner Radius",
        ).expression =
          'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Start",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim End",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Offset",
        ).expression =
          'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      }
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 2";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("Trim Paths 2")("ADBE Vector Trim Type")
        .setValue(2);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Start",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim Start")("ADBE Slider Control-0001"):0';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim End",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim End")("ADBE Slider Control-0001"):100';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Offset",
      ).expression =
        'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      if (ChipsCheckbox.value) {
        createCircuit_Chips();
      }
      if (CapacitorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Capacitors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips, and there is no more room on this circuit to put any Capacitors!\r\rNo separate Capacitors layer will be created.",
            "circuitFX alert",
          );
          Capacitors.text = CapacitorsSlider.value = 0;
        } else {
          createCircuit_Capacitors();
        }
      }
      if (ResistorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Resistors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips and/or Capacitors, and there is no more room on this circuit to put any Resistors!\r\rNo separate Resistors layer will be created.",
            "circuitFX alert",
          );
          Resistors.text = ResistorsSlider.value = 0;
        } else {
          createCircuit_Resistors();
        }
      }
      PB.value = 0;
      PresetsPal.close();
      PresetsPal = null;
      if (TempMessageCheckbox.value) {
        tempComp.remove();
      }
      curComp.openInViewer();
      app.activeViewer.setActive();
      app.executeCommand(2004);
      app.executeCommand(2771);
      app.executeCommand(2387);
      curComp.layer(shapeLayer.name).selected = true;
    }
    function createCircuit_fill(e, r, t) {
      if (Ili1.s() == false) {
        isTrial = !Ili1.s();
      }
      var p = [];
      var u = [];
      var h = [];
      curComp = app.project.activeItem;
      create_TempMessageComp();
      shapeLayer = curComp.layers.addShape();
      ruler = 1;
      c = 1;
      while (c <= curComp.numLayers) {
        if (curComp.layer(c).name.substring(0, 11) == "circuitFX " + ruler) {
          ruler++;
          c = 1;
        } else {
          c++;
        }
      }
      if (labelColor + 1 == 17) {
        labelColor = 0;
      }
      labelColor += 1;
      shapeLayer.label = labelColor;
      shapeLayer.name = "circuitFX " + ruler;
      shapeLayer.comment = "circuitFX v" + af_settings.scriptVersion;
      var d = 0;
      if (masksCheckbox.value) {
        var f = curComp.layers.addSolid(
          [1, 1, 1],
          "circuitFX " + ruler + " - Masks Layer",
          curComp.width,
          curComp.height,
          curComp.pixelAspect,
          curComp.duration,
        );
        f.label = labelColor;
        f.enabled = false;
        f.Effects.addProperty("ADBE Slider Control").name = "Masks Expansion";
        f("ADBE Effect Parade")("Masks Expansion")(
          "ADBE Slider Control-0001",
        ).setValue(0);
        f.Effects.addProperty("ADBE Slider Control").name = "Masks Feather";
        f("ADBE Effect Parade")("Masks Feather")(
          "ADBE Slider Control-0001",
        ).setValue(0);
      }
      if (typeof r != "undefined") {
        GridXSlider.value = GridX.text = r;
      }
      if (typeof t != "undefined") {
        GridYSlider.value = GridY.text = t;
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim Start";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim End";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: trim End")("ADBE Slider Control-0001")
        .setValue(100);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Angle Control").name =
        "[ LINES ]: trim Offset";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Checkbox Control").name =
        "[ LINES ]: trim individually";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: width";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: width")(
          "ADBE Slider Control-0001",
        )
        .setValue(step_W > step_H ? step_H * 0.02 : step_W * 0.02);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: round corners";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: round corners")("ADBE Slider Control-0001")
        .setValue(3);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name = "[ LINES ]: color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: color")(
          "ADBE Color Control-0001",
        )
        .setValue([rL / 255, gL / 255, bL / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      if (ClustersPerCentCheckbox.value) {
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Effect Parade")("[ LINES ]: cluster offset")("ADBE Slider Control-0001")
          .setValue(3);
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset randomness";
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ CIRCLES ]: size";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ CIRCLES ]: size")(
          "ADBE Slider Control-0001",
        )
        .setValue(
          step_W > step_H
            ? Math.round((step_H / 6.667) * 100) * 0.01
            : Math.round((step_W / 6.667) * 100) * 0.01,
        );
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: fill color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: fill color",
        )("ADBE Color Control-0001")
        .setValue([rFC / 255, gFC / 255, bFC / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: fill opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")
        .setValue(10);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: stroke color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke color",
        )("ADBE Color Control-0001")
        .setValue([rSC / 255, gSC / 255, bSC / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: stroke width";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke width",
        )("ADBE Slider Control-0001")
        .setValue(step_W > step_H ? step_H * 0.05 : step_W * 0.05);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      if (ChipsCheckbox.value) {
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "chips";
      }
      if (CapacitorsCheckbox.value) {
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "capacitors";
      }
      if (ResistorsCheckbox.value) {
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "resistors";
      }
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit circles";
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit lines";
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      create_all_available_vertices_lines_chips();
      PB.value = 0;
      s = 0;
      for (; s <= GridX.text; s++) {
        p.push([step_W * s, 0]);
      }
      s = 0;
      for (; s < GridX.text; s++) {
        p.push([step_W * s, step_H * GridY.text]);
      }
      s = 1;
      for (; s < GridY.text; s++) {
        p.push([0, step_H * s]);
      }
      s = 1;
      for (; s <= GridY.text; s++) {
        p.push([step_W * GridX.text, step_H * s]);
      }
      u = p.slice(0);
      if (typeof e != "undefined") {
        p = p.concat(mask_vertices);
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        var h = p.slice(0);
        s = 1;
        for (; s <= GridX.text - 1; s++) {
          h.push([step_W * s, step_H]);
        }
        s = 1;
        for (; s < GridX.text - 1; s++) {
          h.push([step_W * s, step_H * (GridY.text - 1)]);
        }
        s = 2;
        for (; s < GridY.text - 1; s++) {
          h.push([step_W, step_H * s]);
        }
        s = 2;
        for (; s <= GridY.text - 1; s++) {
          h.push([step_W * (GridX.text - 1), step_H * s]);
        }
        if (typeof e != "undefined") {
          h = h.concat(mask_vertices);
        }
      }
      o = 0;
      for (; o < p.length; o++) {
        for (var a = 0; a < all_available_vertices.length; a += 1) {
          if (p[o].toString() == all_available_vertices[a].toString()) {
            all_available_vertices.splice(a, 1);
          }
        }
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        o = 0;
        for (; o < h.length; o++) {
          for (var a = 0; a < all_available_vertices_chips.length; a += 1) {
            if (h[o].toString() == all_available_vertices_chips[a].toString()) {
              all_available_vertices_chips.splice(a, 1);
            }
          }
        }
      }
      var A =
        all_available_vertices.length -
        Math.floor(all_available_vertices.length * Populate.text * 0.01);
      o = 1;
      for (; o < A; o++) {
        delete_vertex = Math.floor(
          Math.random() * all_available_vertices.length,
        );
        p.push(all_available_vertices[delete_vertex]);
        all_available_vertices.splice(delete_vertex, 1);
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        var E =
          all_available_vertices_chips.length -
          Math.floor(
            all_available_vertices_chips.length * Populate.text * 0.01,
          );
        o = 1;
        for (; o < E; o++) {
          delete_vertex = Math.floor(
            Math.random() * all_available_vertices_chips.length,
          );
          h.push(all_available_vertices_chips[delete_vertex]);
          all_available_vertices_chips.splice(delete_vertex, 1);
        }
      }
      var m = all_available_vertices.length;
      do {
        writeLn(
          "Generating circuit lines [ " +
            (m - all_available_vertices.length) +
            1 +
            " of " +
            m +
            " ]",
        );
        progressBar_text.text =
          "Generating circuit lines [ " +
          (m - all_available_vertices.length) +
          1 +
          " of " +
          m +
          " ]";
        PB.value = Math.round(((m - all_available_vertices.length) / m) * 100);
        PresetsPal.update();
        next_found = old_vertex = [];
        C = [];
        actual_circuit_path = [];
        shortest_length = 10000000;
        n = Math.floor(Math.random() * all_available_vertices.length);
        current_vertex = all_available_vertices[n];
        all_available_vertices.splice(n, 1);
        p.push(current_vertex);
        var j = curComp.width * 0.5 - current_vertex[0];
        var B = curComp.height * 0.5 - current_vertex[1];
        var D = Math.sqrt(j * j + B * B);
        destinationX = Math.round(
          current_vertex[0] +
            ((current_vertex[0] - curComp.width * 0.5) / D) * 2000,
        );
        destinationY = Math.round(
          current_vertex[1] +
            ((current_vertex[1] - curComp.height * 0.5) / D) * 2000,
        );
        destination_vertex = [destinationX, destinationY];
        var C = [0, 0];
        actual_circuit_path.push(current_vertex);
        while (C.length > 0) {
          if (DirectionDropdown.selection.index == 13) {
            possible_movements_outwards();
          } else {
            possible_movements();
          }
          var C = [];
          for (var o = 0; o < try_array.length; o += 1) {
            next_found = true;
            for (var i = 0; i < p.length; i += 1) {
              if (p[i].toString() == try_array[o].toString()) {
                next_found = false;
                break;
              }
            }
            if (CrossingCheckbox.value) {
              switch (try_array[o]) {
                case pano_deksia:
                  for (var i = 0; i < p.length; i += 1) {
                    if (p[i].toString() == pano.toString()) {
                      if (i != p.length - 1) {
                        if (p[i + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (p[i - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_aristera:
                  for (var i = 0; i < p.length; i += 1) {
                    if (p[i].toString() == kato.toString()) {
                      if (i != p.length - 1) {
                        if (p[i + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (p[i - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case pano_aristera:
                  for (var i = 0; i < p.length; i += 1) {
                    if (p[i].toString() == pano.toString()) {
                      if (i != p.length - 1) {
                        if (p[i + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (p[i - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_deksia:
                  for (var i = 0; i < p.length; i += 1) {
                    if (p[i].toString() == kato.toString()) {
                      if (i != p.length - 1) {
                        if (p[i + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (p[i - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
              }
            }
            if (next_found) {
              C.push(try_array[o]);
            }
          }
          o = 0;
          for (; o < u.length; o++) {
            if (current_vertex.toString() == u[o].toString()) {
              C = [];
              break;
            }
          }
          if (C.length == 0) {
            break;
          }
          if (actual_circuit_path.length >= LinesMax.text) {
            break;
          }
          verified_vertex = C[Math.floor(Math.random() * C.length)];
          actual_circuit_path.push(verified_vertex);
          old_vertex = current_vertex;
          current_vertex = verified_vertex;
          a = 0;
          for (; a < all_available_vertices.length; a++) {
            if (
              current_vertex.toString() == all_available_vertices[a].toString()
            ) {
              all_available_vertices.splice(a, 1);
              p.push(current_vertex);
              break;
            }
          }
        }
        if (actual_circuit_path.length >= LinesMin.text) {
          shape_pointer = new Shape();
          shape_pointer.vertices = actual_circuit_path;
          shape_pointer.closed = false;
          d++;
          curComp
            .layer(
              shapeLayer.name,
            )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
            .addProperty("ADBE Vector Group").name = "circles " + d;
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(
                shapeLayer.name,
              )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
              .addProperty("ADBE Vector Group").name = "line " + d;
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
              .setValue(shape_pointer);
            if (ClustersPerCentCheckbox.value) {
              var y = Math.floor(Math.random() * 100 + 1);
              if (y <= ClustersPerCent.text) {
                y = Math.floor(Math.random() * 100 + 1);
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - Offset")(
                    "ADBE Vector Offset Line Join",
                  )
                  .setValue(2);
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")(
                  "ADBE Vector Filter - Offset",
                )("ADBE Vector Offset Amount").expression =
                  'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                  Math.random() * 4 +
                  ")";
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
                  .setValue(shape_pointer);
                if (y >= 33 && y < 66) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
                if (y < 33) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .property(6).name = "Offset 3";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")(
                    "Offset 3",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
              }
            }
            if (RandomizeTrimStartCheckbox.value) {
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - RC")(
                "ADBE Vector RoundCorner Radius",
              ).expression =
                'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Start").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim End").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + d)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Offset").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")+' +
                Math.random() * 359 +
                1 +
                ";";
            }
          }
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + d)("ADBE Vectors Group")
            .addProperty("ADBE Vector Shape - Ellipse").name = "start circle";
          curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
            "circuit circles",
          )("ADBE Vectors Group")("circles " + d)("ADBE Vectors Group")(
            "start circle",
          )("ADBE Vector Ellipse Size").expression =
            '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + d)("ADBE Vectors Group")(
              "start circle",
            )("ADBE Vector Ellipse Position")
            .setValue([
              shape_pointer.vertices[0][0],
              shape_pointer.vertices[0][1],
            ]);
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + d)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Ellipse").name = "end circle";
            curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + d)("ADBE Vectors Group")(
              "end circle",
            )("ADBE Vector Ellipse Size").expression =
              '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + d)("ADBE Vectors Group")(
                "end circle",
              )("ADBE Vector Ellipse Position")
              .setValue([
                shape_pointer.vertices[shape_pointer.vertices.length - 1][0],
                shape_pointer.vertices[shape_pointer.vertices.length - 1][1],
              ]);
          }
        }
        if (masksCheckbox.value) {
          if (actual_circuit_path.length > 1) {
            offset_path();
            f("ADBE Mask Parade").addProperty("Mask").name =
              "circuit Line " + f("ADBE Mask Parade").numProperties + 1;
            myShape = f("ADBE Mask Parade")(
              "circuit Line " + f("ADBE Mask Parade").numProperties.toString(),
            )("ADBE Mask Shape").value;
            myShape.vertices = actual_circuit_path_offset_A.concat(
              actual_circuit_path_offset_B.slice().reverse(),
            );
            myShape.closed = true;
            f("ADBE Mask Parade")(
              "circuit Line " + f("ADBE Mask Parade").numProperties,
            )("ADBE Mask Shape").setValue(myShape);
            f("ADBE Mask Parade")(
              "circuit Line " + f("ADBE Mask Parade").numProperties,
            )("ADBE Mask Offset").expression =
              'value + effect("Masks Expansion")("ADBE Slider Control-0001")';
            f("ADBE Mask Parade")(
              "circuit Line " + f("ADBE Mask Parade").numProperties,
            )("ADBE Mask Feather").expression =
              'value + effect("Masks Feather")("ADBE Slider Control-0001")';
          }
        }
      } while (all_available_vertices.length != 0);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vector Transform Group")("ADBE Vector Group Opacity").expression =
        'effect("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression =
        'effect("[ CIRCLES ]: stroke color")("ADBE Color Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression =
        'effect("[ CIRCLES ]: fill color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Opacity",
      ).expression =
        'effect("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression =
        'effect("[ CIRCLES ]: stroke width")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression = 'effect("[ LINES ]: color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression = 'effect("[ LINES ]: width")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Opacity",
      ).expression = 'effect("[ LINES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Line Cap")
        .setValue(2);
      if (RandomizeTrimStartCheckbox.value == false) {
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - RC")(
          "ADBE Vector RoundCorner Radius",
        ).expression =
          'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Start",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim End",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Offset",
        ).expression =
          'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      }
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 2";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("Trim Paths 2")("ADBE Vector Trim Type")
        .setValue(2);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Start",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim Start")("ADBE Slider Control-0001"):0';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim End",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim End")("ADBE Slider Control-0001"):100';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Offset",
      ).expression =
        'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      if (ChipsCheckbox.value) {
        createCircuit_Chips();
      }
      if (CapacitorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Capacitors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips, and there is no more room on this circuit to put any Capacitors!\r\rNo Capacitors group will be created.",
            "circuitFX alert",
          );
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")
            .remove();
          Capacitors.text = CapacitorsSlider.value = 0;
        } else {
          createCircuit_Capacitors();
        }
      }
      if (ResistorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Resistors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips and/or Capacitors, and there is no more room on this circuit to put any Resistors!\r\rNo Resistors group will be created.",
            "circuitFX alert",
          );
          curComp
            .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")
            .remove();
          Resistors.text = ResistorsSlider.value = 0;
        } else {
          createCircuit_Resistors();
        }
      }
      createCircuit_Backplate();
      PB.value = 0;
      PresetsPal.close();
      PresetsPal = null;
      if (TempMessageCheckbox.value) {
        tempComp.remove();
      }
      curComp.openInViewer();
      app.activeViewer.setActive();
      app.executeCommand(2771);
      app.executeCommand(2387);
      curComp.layer(shapeLayer.name).selected = true;
    }
    function createCircuit_fill_separate(e, r, t) {
      createCircuit_Backplate();
      var n = [];
      var p = [];
      curComp = app.project.activeItem;
      create_TempMessageComp();
      shapeLayer = curComp.layers.addShape();
      shapeLayer2 = curComp.layers.addShape();
      shapeLayer.comment = shapeLayer2.comment =
        "circuitFX v" + af_settings.scriptVersion;
      shapeLayer.name = "circuitFX " + ruler + " - Lines";
      shapeLayer2.name = "circuitFX " + ruler + " - Circles";
      shapeLayer.label = shapeLayer2.label = labelColor;
      var u = 0;
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer2.name)("ADBE Transform Group")("ADBE Anchor Point")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(shapeLayer2.name)("ADBE Transform Group")("ADBE Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      if (masksCheckbox.value) {
        var h = curComp.layers.addSolid(
          [1, 1, 1],
          "circuitFX " + ruler + " - Masks Layer",
          curComp.width,
          curComp.height,
          curComp.pixelAspect,
          curComp.duration,
        );
        h.label = labelColor;
        h.enabled = false;
        h.Effects.addProperty("ADBE Slider Control").name = "Masks Expansion";
        h("ADBE Effect Parade")("Masks Expansion")(
          "ADBE Slider Control-0001",
        ).setValue(0);
        h.Effects.addProperty("ADBE Slider Control").name = "Masks Feather";
        h("ADBE Effect Parade")("Masks Feather")(
          "ADBE Slider Control-0001",
        ).setValue(0);
      }
      if (typeof r != "undefined") {
        GridXSlider.value = GridX.text = r;
      }
      if (typeof t != "undefined") {
        GridYSlider.value = GridY.text = t;
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim Start";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: trim End";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: trim End")("ADBE Slider Control-0001")
        .setValue(100);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Angle Control").name =
        "[ LINES ]: trim Offset";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Checkbox Control").name =
        "[ LINES ]: trim individually";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: width";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: width")(
          "ADBE Slider Control-0001",
        )
        .setValue(step_W > step_H ? step_H * 0.02 : step_W * 0.02);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ LINES ]: round corners";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: round corners")("ADBE Slider Control-0001")
        .setValue(3);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name = "[ LINES ]: color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ LINES ]: color")(
          "ADBE Color Control-0001",
        )
        .setValue([rL / 255, gL / 255, bL / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ LINES ]: opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ LINES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      if (ClustersPerCentCheckbox.value) {
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset";
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Effect Parade")("[ LINES ]: cluster offset")("ADBE Slider Control-0001")
          .setValue(3);
        curComp
          .layer(shapeLayer.name)
          .Effects.addProperty("ADBE Slider Control").name =
          "[ LINES ]: cluster offset randomness";
      }
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ CIRCLES ]: size";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")("[ CIRCLES ]: size")(
          "ADBE Slider Control-0001",
        )
        .setValue(
          step_W > step_H
            ? Math.round((step_H / 6.667) * 100) * 0.01
            : Math.round((step_W / 6.667) * 100) * 0.01,
        );
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: fill color";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: fill color",
        )("ADBE Color Control-0001")
        .setValue([rFC / 255, gFC / 255, bFC / 255, 1]);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: fill opacity";
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")
        .setValue(10);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CIRCLES ]: stroke color";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke color",
        )("ADBE Color Control-0001")
        .setValue([rSC / 255, gSC / 255, bSC / 255, 1]);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: stroke width";
      curComp
        .layer(shapeLayer2.name)("ADBE Effect Parade")(
          "[ CIRCLES ]: stroke width",
        )("ADBE Slider Control-0001")
        .setValue(step_W > step_H ? step_H * 0.05 : step_W * 0.05);
      curComp
        .layer(shapeLayer2.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CIRCLES ]: opacity";
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Effect Parade")("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      curComp
        .layer(shapeLayer2.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit circles";
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "circuit lines";
      if (typeof e == "undefined") {
        create_all_available_vertices_lines_chips();
      }
      PB.value = 0;
      for (var s = 0; s <= GridX.text; s += 1) {
        n.push([step_W * s, 0]);
      }
      for (var s = 0; s < GridX.text; s += 1) {
        n.push([step_W * s, step_H * GridY.text]);
      }
      for (var s = 1; s < GridY.text; s += 1) {
        n.push([0, step_H * s]);
      }
      for (var s = 1; s <= GridY.text; s += 1) {
        n.push([step_W * GridX.text, step_H * s]);
      }
      p = n.slice(0);
      if (typeof e != "undefined") {
        n = n.concat(mask_vertices);
      }
      for (var o = 0; o < n.length; o += 1) {
        for (var a = 0; a < all_available_vertices.length; a += 1) {
          if (n[o].toString() == all_available_vertices[a].toString()) {
            all_available_vertices.splice(a, 1);
          }
        }
      }
      var d =
        all_available_vertices.length -
        Math.floor(all_available_vertices.length * Populate.text * 0.01);
      for (var o = 1; o < d; o += 1) {
        delete_vertex = Math.floor(
          Math.random() * all_available_vertices.length,
        );
        n.push(all_available_vertices[delete_vertex]);
        all_available_vertices.splice(delete_vertex, 1);
      }
      if (
        ChipsCheckbox.value ||
        CapacitorsCheckbox.value ||
        ResistorsCheckbox.value
      ) {
        used_vertices_chips = [];
        for (var s = 0; s <= GridX.text; s += 1) {
          used_vertices_chips.push([step_W * s, 0]);
        }
        for (var s = 0; s < GridX.text; s += 1) {
          used_vertices_chips.push([step_W * s, step_H * GridY.text]);
        }
        for (var s = 1; s < GridY.text; s += 1) {
          used_vertices_chips.push([0, step_H * s]);
        }
        for (var s = 1; s <= GridY.text; s += 1) {
          used_vertices_chips.push([step_W * GridX.text, step_H * s]);
        }
        for (var s = 1; s <= GridX.text - 1; s += 1) {
          used_vertices_chips.push([step_W * s, step_H]);
        }
        for (var s = 1; s < GridX.text - 1; s += 1) {
          used_vertices_chips.push([step_W * s, step_H * (GridY.text - 1)]);
        }
        for (var s = 2; s < GridY.text - 1; s += 1) {
          used_vertices_chips.push([step_W, step_H * s]);
        }
        for (var s = 2; s <= GridY.text - 1; s += 1) {
          used_vertices_chips.push([step_W * (GridX.text - 1), step_H * s]);
        }
        if (typeof e != "undefined") {
          used_vertices_chips = used_vertices_chips.concat(mask_vertices);
        }
        for (var o = 0; o < used_vertices_chips.length; o += 1) {
          for (var a = 0; a < all_available_vertices_chips.length; a += 1) {
            if (
              used_vertices_chips[o].toString() ==
              all_available_vertices_chips[a].toString()
            ) {
              all_available_vertices_chips.splice(a, 1);
            }
          }
        }
        var f =
          all_available_vertices_chips.length -
          Math.floor(
            all_available_vertices_chips.length * Populate.text * 0.01,
          );
        for (var o = 1; o < f; o += 1) {
          delete_vertex = Math.floor(
            Math.random() * all_available_vertices_chips.length,
          );
          used_vertices_chips.push(all_available_vertices_chips[delete_vertex]);
          all_available_vertices_chips.splice(delete_vertex, 1);
        }
      }
      var A = all_available_vertices.length;
      do {
        writeLn(
          "Generating circuit lines [ " +
            (A - all_available_vertices.length) +
            1 +
            " of " +
            A +
            " ]",
        );
        progressBar_text.text =
          "Generating circuit lines [ " +
          (A - all_available_vertices.length) +
          1 +
          " of " +
          A +
          " ]";
        PB.value = Math.round(((A - all_available_vertices.length) / A) * 100);
        PresetsPal.update();
        next_found = true;
        old_vertex = [];
        B = [];
        actual_circuit_path = [];
        shortest_length = 10000000;
        l = Math.floor(Math.random() * all_available_vertices.length);
        current_vertex = all_available_vertices[l];
        all_available_vertices.splice(l, 1);
        n.push(current_vertex);
        var E = curComp.width * 0.5 - current_vertex[0];
        var m = curComp.height * 0.5 - current_vertex[1];
        var j = Math.sqrt(E * E + m * m);
        destinationX = Math.round(
          current_vertex[0] +
            ((current_vertex[0] - curComp.width * 0.5) / j) * 2000,
        );
        destinationY = Math.round(
          current_vertex[1] +
            ((current_vertex[1] - curComp.height * 0.5) / j) * 2000,
        );
        destination_vertex = [destinationX, destinationY];
        var B = [0, 0];
        actual_circuit_path.push(current_vertex);
        while (B.length > 0) {
          if (DirectionDropdown.selection.index == 13) {
            possible_movements_outwards();
          } else {
            possible_movements();
          }
          var B = [];
          for (var o = 0; o < try_array.length; o += 1) {
            next_found = true;
            for (var i = 0; i < n.length; i += 1) {
              if (n[i].toString() == try_array[o].toString()) {
                next_found = false;
                break;
              }
            }
            if (CrossingCheckbox.value) {
              switch (try_array[o]) {
                case pano_deksia:
                  for (var i = 0; i < n.length; i += 1) {
                    if (n[i].toString() == pano.toString()) {
                      if (i != n.length - 1) {
                        if (n[i + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (n[i - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_aristera:
                  for (var i = 0; i < n.length; i += 1) {
                    if (n[i].toString() == kato.toString()) {
                      if (i != n.length - 1) {
                        if (n[i + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (n[i - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case pano_aristera:
                  for (var i = 0; i < n.length; i += 1) {
                    if (n[i].toString() == pano.toString()) {
                      if (i != n.length - 1) {
                        if (n[i + 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (n[i - 1].toString() == aristera.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
                  break;
                case kato_deksia:
                  for (var i = 0; i < n.length; i += 1) {
                    if (n[i].toString() == kato.toString()) {
                      if (i != n.length - 1) {
                        if (n[i + 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                      if (i != 0) {
                        if (n[i - 1].toString() == deksia.toString()) {
                          next_found = false;
                        }
                      }
                    }
                  }
              }
            }
            if (next_found) {
              B.push(try_array[o]);
            }
          }
          for (var o = 0; o < p.length; o += 1) {
            if (current_vertex.toString() == p[o].toString()) {
              B = [];
              break;
            }
          }
          if (B.length == 0) {
            break;
          }
          if (actual_circuit_path.length >= LinesMax.text) {
            break;
          }
          verified_vertex = B[Math.floor(Math.random() * B.length)];
          actual_circuit_path.push(verified_vertex);
          old_vertex = current_vertex;
          current_vertex = verified_vertex;
          for (var a = 0; a < all_available_vertices.length; a += 1) {
            if (
              current_vertex.toString() == all_available_vertices[a].toString()
            ) {
              all_available_vertices.splice(a, 1);
              n.push(current_vertex);
              break;
            }
          }
        }
        if (actual_circuit_path.length >= LinesMin.text) {
          shape_pointer = new Shape();
          shape_pointer.vertices = actual_circuit_path;
          shape_pointer.closed = false;
          u++;
          curComp
            .layer(
              shapeLayer2.name,
            )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
            .addProperty("ADBE Vector Group").name = "circles " + u;
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(
                shapeLayer.name,
              )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
              .addProperty("ADBE Vector Group").name = "line " + u;
            curComp
              .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
              .setValue(shape_pointer);
            if (ClustersPerCentCheckbox.value) {
              var D = Math.floor(Math.random() * 100 + 1);
              if (D <= ClustersPerCent.text) {
                D = Math.floor(Math.random() * 100 + 1);
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - Offset")(
                    "ADBE Vector Offset Line Join",
                  )
                  .setValue(2);
                curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")(
                  "ADBE Vector Filter - Offset",
                )("ADBE Vector Offset Amount").expression =
                  'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                  Math.random() * 4 +
                  ")";
                curComp
                  .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                  .addProperty("ADBE Vector Shape - Group")("ADBE Vector Shape")
                  .setValue(shape_pointer);
                if (D >= 33 && D < 66) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
                if (D < 33) {
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .property(4).name = "Offset 2";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")(
                    "Offset 2",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Filter - Offset")(
                      "ADBE Vector Offset Line Join",
                    )
                    .setValue(2);
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .property(6).name = "Offset 3";
                  curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                    "circuit lines",
                  )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")(
                    "Offset 3",
                  )("ADBE Vector Offset Amount").expression =
                    'effect("[ LINES ]: cluster offset")("ADBE Slider Control-0001") + (effect("[ LINES ]: cluster offset randomness")("ADBE Slider Control-0001") * ' +
                    Math.random() * 4 +
                    ")";
                  curComp
                    .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                      "circuit lines",
                    )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                    .addProperty("ADBE Vector Shape - Group")(
                      "ADBE Vector Shape",
                    )
                    .setValue(shape_pointer);
                }
              }
            }
            if (RandomizeTrimStartCheckbox.value) {
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - RC")(
                "ADBE Vector RoundCorner Radius",
              ).expression =
                'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
              curComp
                .layer(shapeLayer.name)("ADBE Root Vectors Group")(
                  "circuit lines",
                )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")
                .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Start").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim End").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
              curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
                "circuit lines",
              )("ADBE Vectors Group")("line " + u)("ADBE Vectors Group")(
                "Trim Paths 1",
              )("ADBE Vector Trim Offset").expression =
                'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")+' +
                Math.random() * 359 +
                1 +
                ";";
            }
          }
          curComp
            .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + u)("ADBE Vectors Group")
            .addProperty("ADBE Vector Shape - Ellipse").name = "start circle";
          curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
            "circuit circles",
          )("ADBE Vectors Group")("circles " + u)("ADBE Vectors Group")(
            "start circle",
          )("ADBE Vector Ellipse Size").expression =
            '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
          curComp
            .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + u)("ADBE Vectors Group")(
              "start circle",
            )("ADBE Vector Ellipse Position")
            .setValue([
              shape_pointer.vertices[0][0],
              shape_pointer.vertices[0][1],
            ]);
          if (actual_circuit_path.length > 1) {
            curComp
              .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + u)("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Ellipse").name = "end circle";
            curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
              "circuit circles",
            )("ADBE Vectors Group")("circles " + u)("ADBE Vectors Group")(
              "end circle",
            )("ADBE Vector Ellipse Size").expression =
              '[effect("[ CIRCLES ]: size")("ADBE Slider Control-0001"), effect("[ CIRCLES ]: size")("ADBE Slider Control-0001")]';
            curComp
              .layer(shapeLayer2.name)("ADBE Root Vectors Group")(
                "circuit circles",
              )("ADBE Vectors Group")("circles " + u)("ADBE Vectors Group")(
                "end circle",
              )("ADBE Vector Ellipse Position")
              .setValue([
                shape_pointer.vertices[shape_pointer.vertices.length - 1][0],
                shape_pointer.vertices[shape_pointer.vertices.length - 1][1],
              ]);
          }
        }
        if (masksCheckbox.value) {
          if (actual_circuit_path.length > 1) {
            offset_path();
            h("ADBE Mask Parade").addProperty("Mask").name =
              "circuit Line " + h("ADBE Mask Parade").numProperties + 1;
            myShape = h("ADBE Mask Parade")(
              "circuit Line " + h("ADBE Mask Parade").numProperties.toString(),
            )("ADBE Mask Shape").value;
            myShape.vertices = actual_circuit_path_offset_A.concat(
              actual_circuit_path_offset_B.slice().reverse(),
            );
            myShape.closed = true;
            h("ADBE Mask Parade")(
              "circuit Line " + h("ADBE Mask Parade").numProperties,
            )("ADBE Mask Shape").setValue(myShape);
            h("ADBE Mask Parade")(
              "circuit Line " + h("ADBE Mask Parade").numProperties,
            )("ADBE Mask Offset").expression =
              'value + effect("Masks Expansion")("ADBE Slider Control-0001")';
            h("ADBE Mask Parade")(
              "circuit Line " + h("ADBE Mask Parade").numProperties,
            )("ADBE Mask Feather").expression =
              'value + effect("Masks Feather")("ADBE Slider Control-0001")';
          }
        }
      } while (all_available_vertices.length != 0);
      curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vector Transform Group")("ADBE Vector Group Opacity").expression =
        'effect("[ CIRCLES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression =
        'effect("[ CIRCLES ]: stroke color")("ADBE Color Control-0001")';
      curComp
        .layer(
          shapeLayer2.name,
        )("ADBE Root Vectors Group")("circuit circles")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression =
        'effect("[ CIRCLES ]: fill color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Opacity",
      ).expression =
        'effect("[ CIRCLES ]: fill opacity")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer2.name)("ADBE Root Vectors Group")(
        "circuit circles",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression =
        'effect("[ CIRCLES ]: stroke width")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Color",
      ).expression = 'effect("[ LINES ]: color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Width",
      ).expression = 'effect("[ LINES ]: width")("ADBE Slider Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
        "ADBE Vector Stroke Opacity",
      ).expression = 'effect("[ LINES ]: opacity")("ADBE Slider Control-0001")';
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Line Cap")
        .setValue(2);
      if (RandomizeTrimStartCheckbox.value == false) {
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - RC")(
          "ADBE Vector RoundCorner Radius",
        ).expression =
          'effect("[ LINES ]: round corners")("ADBE Slider Control-0001")';
        curComp
          .layer(
            shapeLayer.name,
          )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
          .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 1";
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Start",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?0:effect("[ LINES ]: trim Start")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim End",
        ).expression =
          'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?100:effect("[ LINES ]: trim End")("ADBE Slider Control-0001");';
        curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
          "circuit lines",
        )("ADBE Vectors Group")("Trim Paths 1")(
          "ADBE Vector Trim Offset",
        ).expression =
          'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      }
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")
        .addProperty("ADBE Vector Filter - Trim").name = "Trim Paths 2";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("circuit lines")("ADBE Vectors Group")("Trim Paths 2")("ADBE Vector Trim Type")
        .setValue(2);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Start",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim Start")("ADBE Slider Control-0001"):0';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim End",
      ).expression =
        'effect("[ LINES ]: trim individually")("ADBE Checkbox Control-0001").value?effect("[ LINES ]: trim End")("ADBE Slider Control-0001"):100';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")(
        "circuit lines",
      )("ADBE Vectors Group")("Trim Paths 2")(
        "ADBE Vector Trim Offset",
      ).expression =
        'effect("[ LINES ]: trim Offset")("ADBE Angle Control-0001")';
      if (ChipsCheckbox.value) {
        createCircuit_Chips();
      }
      if (CapacitorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Capacitors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips, and there is no more room on this circuit to put any Capacitors!\r\rNo separate Capacitors layer will be created.",
            "circuitFX alert",
          );
          Capacitors.text = CapacitorsSlider.value = 0;
        } else {
          createCircuit_Capacitors();
        }
      }
      if (ResistorsCheckbox.value) {
        if (all_available_vertices_chips.length == 0) {
          alert(
            "The number of Resistors has automatically been reduced to 0 because there are currently, no more available vertices.\r\rIn other words, all the free space was taken by Chips and/or Capacitors, and there is no more room on this circuit to put any Resistors!\r\rNo separate Resistors layer will be created.",
            "circuitFX alert",
          );
          Resistors.text = ResistorsSlider.value = 0;
        } else {
          createCircuit_Resistors();
        }
      }
      PB.value = 0;
      PresetsPal.close();
      PresetsPal = null;
      if (TempMessageCheckbox.value) {
        tempComp.remove();
      }
      curComp.openInViewer();
      app.activeViewer.setActive();
      app.executeCommand(2004);
      app.executeCommand(2771);
      app.executeCommand(2387);
      curComp.layer(shapeLayer.name).selected = true;
    }
    function createCircuit_Chips() {
      if (SeperateLayersCheckbox.value) {
        shapeLayer = curComp.layers.addShape();
        shapeLayer.comment = "circuitFX v" + af_settings.scriptVersion;
        shapeLayer.name = "circuitFX " + ruler + " - Chips";
        shapeLayer.label = labelColor;
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "chips";
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name = "[ CHIPS ]: size";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ CHIPS ]: size")(
          "ADBE Slider Control-0001",
        )
        .setValue(step_W > step_H ? step_H * 0.75 : step_W * 0.75);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CHIPS ]: size randomness";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name = "[ CHIPS ]: color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ CHIPS ]: color")(
          "ADBE Color Control-0001",
        )
        .setValue([rCC / 255, gCC / 255, bCC / 255, 1]);
      if (all_available_vertices_chips.length < Chips.text) {
        alert(
          "The number of Chips has automatically been reduced from " +
            Chips.text +
            " to " +
            all_available_vertices_chips.length +
            ". That is the maximum number of chips allowed by the currently available vertices.\r\rIn other words, there was no more room on this circuit, to fit all these Chips!",
          "circuitFX alert",
        );
        Chips.text = ChipsSlider.value = all_available_vertices_chips.length;
      }
      var e = Number(Chips.text);
      var r = 1;
      var t = Math.floor(Math.random() * all_available_vertices_chips.length);
      var a = all_available_vertices_chips[t];
      all_available_vertices_chips.splice(t, 1);
      var o = Math.floor(Math.random() * 91) + 10;
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("chips")("ADBE Vectors Group")
        .addProperty("ADBE Vector Group").name = "chip " + r;
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Shape - Rect")("ADBE Vector Rect Position")
        .setValue(a);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vector Transform Group")("ADBE Vector Position")
        .setValue(a);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vector Transform Group")("ADBE Vector Anchor")
        .setValue(a);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
        "ADBE Vectors Group",
      )("chip " + r)("ADBE Vector Transform Group")(
        "ADBE Vector Scale",
      ).expression =
        '[effect("[ CHIPS ]: size")("ADBE Slider Control-0001") + ' +
        o +
        ' * effect("[ CHIPS ]: size randomness")("ADBE Slider Control-0001")/100, effect("[ CHIPS ]: size")("ADBE Slider Control-0001") + ' +
        o +
        ' * effect("[ CHIPS ]: size randomness")("ADBE Slider Control-0001")/100]';
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression = 'effect("[ CHIPS ]: color")("ADBE Color Control-0001")';
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width")
        .setValue(12);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
          "ADBE Vector Stroke Dashes",
        )
        .addProperty("ADBE Vector Stroke Dash 1")
        .setValue(2);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
          "ADBE Vector Stroke Dashes",
        )
        .addProperty("ADBE Vector Stroke Gap 1")
        .setValue(2);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
          "ADBE Vectors Group",
        )("chip " + r)("ADBE Vectors Group")("ADBE Vector Graphic - Stroke")(
          "ADBE Vector Stroke Dashes",
        )
        .addProperty("ADBE Vector Stroke Offset")
        .setValue(3);
      for (var r = 2; r <= Chips.text; r += 1) {
        writeLn("Creating chips [ " + r + " of " + Chips.text + " ]");
        progressBar_text.text =
          "Creating chips [ " + r + " of " + Chips.text + " ]";
        PB.value = Math.round((r / e) * 100);
        PresetsPal.update();
        t = Math.floor(Math.random() * all_available_vertices_chips.length);
        a = all_available_vertices_chips[t];
        all_available_vertices_chips.splice(t, 1);
        o = Math.floor(Math.random() * 91) + 10;
        var i = curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")("chips")(
            "ADBE Vectors Group",
          )("chip " + (r - 1))
          .duplicate();
        i.name = "chip " + r;
        i("ADBE Vectors Group")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Position",
        ).setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Position").setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Anchor").setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Scale").expression =
          '[effect("[ CHIPS ]: size")("ADBE Slider Control-0001") + ' +
          o +
          ' * effect("[ CHIPS ]: size randomness")("ADBE Slider Control-0001")/100, effect("[ CHIPS ]: size")("ADBE Slider Control-0001") + ' +
          o +
          ' * effect("[ CHIPS ]: size randomness")("ADBE Slider Control-0001")/100]';
      }
      PB.value = 0;
    }
    function createCircuit_Capacitors() {
      if (SeperateLayersCheckbox.value) {
        shapeLayer = curComp.layers.addShape();
        shapeLayer.comment = "circuitFX v" + af_settings.scriptVersion;
        shapeLayer.name = "circuitFX " + ruler + " - Capacitors";
        shapeLayer.label = labelColor;
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "capacitors";
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CAPACITORS ]: size";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ CAPACITORS ]: size")(
          "ADBE Slider Control-0001",
        )
        .setValue(step_W > step_H ? step_H * 0.7 : step_W * 0.7);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ CAPACITORS ]: size randomness";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CAPACITORS ]: inner color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CAPACITORS ]: inner color",
        )("ADBE Color Control-0001")
        .setValue([rCaInnerC / 255, gCaInnerC / 255, bCaInnerC / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ CAPACITORS ]: outer color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")(
          "[ CAPACITORS ]: outer color",
        )("ADBE Color Control-0001")
        .setValue([rCaC / 255, gCaC / 255, bCaC / 255, 1]);
      if (all_available_vertices_chips.length < Capacitors.text) {
        alert(
          "The number of Capacitors has automatically been reduced from " +
            Capacitors.text +
            " to " +
            all_available_vertices_chips.length +
            ". That is the maximum number of capacitors allowed by the currently available vertices.\r\rIn other words, there was no more room on this circuit, to fit all these Capacitors!",
          "circuitFX alert",
        );
        Capacitors.text = CapacitorsSlider.value =
          all_available_vertices_chips.length;
      }
      var e = Number(Capacitors.text);
      var r = 1;
      var t = Math.floor(Math.random() * all_available_vertices_chips.length);
      var a = all_available_vertices_chips[t];
      all_available_vertices_chips.splice(t, 1);
      var o = Math.floor(Math.random() * 91) + 10;
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("capacitors")("ADBE Vectors Group")
        .addProperty("ADBE Vector Group").name = "capacitor " + r;
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Shape - Ellipse")(
          "ADBE Vector Ellipse Position",
        )
        .setValue(a);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        )
        .setValue(a);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vector Transform Group")("ADBE Vector Anchor")
        .setValue(a);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
        "ADBE Vectors Group",
      )("capacitor " + r)("ADBE Vector Transform Group")(
        "ADBE Vector Scale",
      ).expression =
        '[effect("[ CAPACITORS ]: size")("ADBE Slider Control-0001") + ' +
        o +
        ' * effect("[ CAPACITORS ]: size randomness")("ADBE Slider Control-0001")/100, effect("[ CAPACITORS ]: size")("ADBE Slider Control-0001") + ' +
        o +
        ' * effect("[ CAPACITORS ]: size randomness")("ADBE Slider Control-0001")/100]';
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vector Transform Group")(
          "ADBE Vector Rotation",
        )
        .setValue(Math.floor(Math.random() * 180 + 0));
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Color")
        .setValue([0.65, 0.65, 0.65, 1]);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")(
          "ADBE Vector Graphic - Stroke",
        )("ADBE Vector Stroke Width")
        .setValue(20);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")(
          "ADBE Vector Graphic - Stroke",
        )("ADBE Vector Stroke Dashes")
        .addProperty("ADBE Vector Stroke Dash 1")
        .setValue(40);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")(
          "ADBE Vector Graphic - Stroke",
        )("ADBE Vector Stroke Dashes")
        .addProperty("ADBE Vector Stroke Gap 1")
        .setValue(250);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Stroke").name = "Stroke 2";
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")("Stroke 2")(
          "ADBE Vector Stroke Width",
        )
        .setValue(23);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
        "ADBE Vectors Group",
      )("capacitor " + r)("ADBE Vectors Group")("Stroke 2")(
        "ADBE Vector Stroke Color",
      ).expression =
        'effect("[ CAPACITORS ]: outer color")("ADBE Color Control-0001")';
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
          "ADBE Vectors Group",
        )("capacitor " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression =
        'effect("[ CAPACITORS ]: inner color")("ADBE Color Control-0001")';
      for (var r = 2; r <= Capacitors.text; r += 1) {
        writeLn("Creating capacitors [ " + r + " of " + Capacitors.text + " ]");
        progressBar_text.text =
          "Creating capacitors [ " + r + " of " + Capacitors.text + " ]";
        PB.value = Math.round((r / e) * 100);
        PresetsPal.update();
        t = Math.floor(Math.random() * all_available_vertices_chips.length);
        a = all_available_vertices_chips[t];
        all_available_vertices_chips.splice(t, 1);
        o = Math.floor(Math.random() * 91) + 10;
        var i = curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")("capacitors")(
            "ADBE Vectors Group",
          )("capacitor " + (r - 1))
          .duplicate();
        i.name = "capacitor " + r;
        i("ADBE Vectors Group")("ADBE Vector Shape - Ellipse")(
          "ADBE Vector Ellipse Position",
        ).setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Position").setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Anchor").setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Scale").expression =
          '[effect("[ CAPACITORS ]: size")("ADBE Slider Control-0001") + ' +
          o +
          ' * effect("[ CAPACITORS ]: size randomness")("ADBE Slider Control-0001")/100, effect("[ CAPACITORS ]: size")("ADBE Slider Control-0001") + ' +
          o +
          ' * effect("[ CAPACITORS ]: size randomness")("ADBE Slider Control-0001")/100]';
        i("ADBE Vector Transform Group")("ADBE Vector Rotation").setValue(
          Math.floor(Math.random() * 180 + 0),
        );
      }
      PB.value = 0;
    }
    function createCircuit_Resistors() {
      if (SeperateLayersCheckbox.value) {
        shapeLayer = curComp.layers.addShape();
        shapeLayer.comment = "circuitFX v" + af_settings.scriptVersion;
        shapeLayer.name = "circuitFX " + ruler + " - Resistors";
        shapeLayer.label = labelColor;
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group").name = "resistors";
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ RESISTORS ]: size";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ RESISTORS ]: size")(
          "ADBE Slider Control-0001",
        )
        .setValue(step_W > step_H ? step_H * 1.5 : step_W * 1.5);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ RESISTORS ]: size randomness";
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ RESISTORS ]: color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ RESISTORS ]: color")(
          "ADBE Color Control-0001",
        )
        .setValue([rRC / 255, gRC / 255, bRC / 255, 1]);
      if (all_available_vertices_chips.length < Resistors.text) {
        alert(
          "The number of Resistors has automatically been reduced from " +
            Resistors.text +
            " to " +
            all_available_vertices_chips.length +
            ". That is the maximum number of resistors allowed by the currently available vertices.\r\rIn other words, there was no more room on this circuit, to fit all these Resistors!",
          "circuitFX alert",
        );
        Resistors.text = ResistorsSlider.value =
          all_available_vertices_chips.length;
      }
      var e = Number(Resistors.text);
      var r = 1;
      var t = Math.floor(Math.random() * all_available_vertices_chips.length);
      var a = all_available_vertices_chips[t];
      all_available_vertices_chips.splice(t, 1);
      var o = Math.floor(Math.random() * 91) + 10;
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("resistors")("ADBE Vectors Group")
        .addProperty("ADBE Vector Group").name = "resistor " + r;
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        )
        .setValue(a);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vector Transform Group")("ADBE Vector Anchor")
        .setValue(a);
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
        "ADBE Vectors Group",
      )("resistor " + r)("ADBE Vector Transform Group")(
        "ADBE Vector Scale",
      ).expression =
        '[effect("[ RESISTORS ]: size")("ADBE Slider Control-0001") + ' +
        o +
        ' * effect("[ RESISTORS ]: size randomness")("ADBE Slider Control-0001")/100, effect("[ RESISTORS ]: size")("ADBE Slider Control-0001") + ' +
        o +
        ' * effect("[ RESISTORS ]: size randomness")("ADBE Slider Control-0001")/100]';
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vector Transform Group")(
          "ADBE Vector Rotation",
        )
        .setValue((Math.floor(Math.random() * 2) + 0) * 90);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Group").name = "body";
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")("body")("ADBE Vectors Group")
        .addProperty("ADBE Vector Shape - Rect")("ADBE Vector Rect Position")
        .setValue(a);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")("body")("ADBE Vectors Group")(
          "ADBE Vector Shape - Rect",
        )("ADBE Vector Rect Size")
        .setValue([20, 40]);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")("body")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression =
        'effect("[ RESISTORS ]: color")("ADBE Color Control-0001")';
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")
        .addProperty("ADBE Vector Group").name = "connectors";
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")("connectors")(
          "ADBE Vectors Group",
        )
        .addProperty("ADBE Vector Shape - Rect")("ADBE Vector Rect Position")
        .setValue(a);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")("connectors")(
          "ADBE Vectors Group",
        )("ADBE Vector Shape - Rect")("ADBE Vector Rect Size")
        .setValue([20, 52]);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
          "ADBE Vectors Group",
        )("resistor " + r)("ADBE Vectors Group")("connectors")(
          "ADBE Vectors Group",
        )
        .addProperty("ADBE Vector Graphic - Fill")("ADBE Vector Fill Color")
        .setValue([0.6, 0.6, 0.6, 1]);
      for (var r = 2; r <= Resistors.text; r += 1) {
        writeLn("Creating resistors [ " + r + " of " + Resistors.text + " ]");
        progressBar_text.text =
          "Creating resistors [ " + r + " of " + Resistors.text + " ]";
        PB.value = Math.round((r / e) * 100);
        PresetsPal.update();
        t = Math.floor(Math.random() * all_available_vertices_chips.length);
        a = all_available_vertices_chips[t];
        all_available_vertices_chips.splice(t, 1);
        o = Math.floor(Math.random() * 91) + 10;
        var i = curComp
          .layer(shapeLayer.name)("ADBE Root Vectors Group")("resistors")(
            "ADBE Vectors Group",
          )("resistor " + (r - 1))
          .duplicate();
        i.name = "resistor " + r;
        i("ADBE Vector Transform Group")("ADBE Vector Position").setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Anchor").setValue(a);
        i("ADBE Vector Transform Group")("ADBE Vector Scale").expression =
          '[effect("[ RESISTORS ]: size")("ADBE Slider Control-0001") + ' +
          o +
          ' * effect("[ RESISTORS ]: size randomness")("ADBE Slider Control-0001")/100, effect("[ RESISTORS ]: size")("ADBE Slider Control-0001") + ' +
          o +
          ' * effect("[ RESISTORS ]: size randomness")("ADBE Slider Control-0001")/100]';
        i("ADBE Vector Transform Group")("ADBE Vector Rotation").setValue(
          (Math.floor(Math.random() * 2) + 0) * 90,
        );
        i("ADBE Vectors Group")("body")("ADBE Vectors Group")(
          "ADBE Vector Shape - Rect",
        )("ADBE Vector Rect Position").setValue(a);
        i("ADBE Vectors Group")("connectors")("ADBE Vectors Group")(
          "ADBE Vector Shape - Rect",
        )("ADBE Vector Rect Position").setValue(a);
      }
      PB.value = 0;
    }
    function createCircuit_Backplate() {
      if (SeperateLayersCheckbox.value) {
        shapeLayer = curComp.layers.addShape();
        ruler = 1;
        shapeLayer.comment = "circuitFX v" + af_settings.scriptVersion;
        k = 1;
        while (k <= curComp.numLayers) {
          if (curComp.layer(k).name.substring(0, 11) == "circuitFX " + ruler) {
            ruler++;
            k = 1;
          } else {
            k++;
          }
        }
        shapeLayer.name = "circuitFX " + ruler + " - Backplate";
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Anchor Point")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        curComp
          .layer(shapeLayer.name)("ADBE Transform Group")("ADBE Position")
          .setValue([curComp.width * 0.5, curComp.height * 0.5]);
        if (labelColor + 1 == 17) {
          labelColor = 0;
        }
        labelColor += 1;
        shapeLayer.label = labelColor;
      }
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Color Control").name =
        "[ BACKPLATE ]: color";
      curComp
        .layer(shapeLayer.name)("ADBE Effect Parade")("[ BACKPLATE ]: color")(
          "ADBE Color Control-0001",
        )
        .setValue([rBP / 255, gBP / 255, bBP / 255, 1]);
      curComp
        .layer(shapeLayer.name)
        .Effects.addProperty("ADBE Slider Control").name =
        "[ BACKPLATE ]: opacity";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Effect Parade")("[ BACKPLATE ]: opacity")("ADBE Slider Control-0001")
        .setValue(100);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Group").name = "backplate";
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("backplate")("ADBE Vectors Group")
        .addProperty("ADBE Vector Shape - Rect")("ADBE Vector Rect Size")
        .setValue([curComp.width, curComp.height]);
      curComp
        .layer(shapeLayer.name)("ADBE Root Vectors Group")("backplate")(
          "ADBE Vectors Group",
        )("ADBE Vector Shape - Rect")("ADBE Vector Rect Position")
        .setValue([curComp.width * 0.5, curComp.height * 0.5]);
      curComp
        .layer(
          shapeLayer.name,
        )("ADBE Root Vectors Group")("backplate")("ADBE Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill")(
        "ADBE Vector Fill Color",
      ).expression =
        'effect("[ BACKPLATE ]: color")("ADBE Color Control-0001")';
      curComp.layer(shapeLayer.name)("ADBE Root Vectors Group")("backplate")(
        "ADBE Vectors Group",
      )("ADBE Vector Graphic - Fill")("ADBE Vector Fill Opacity").expression =
        'effect("[ BACKPLATE ]: opacity")("ADBE Slider Control-0001")';
    }
    var isTrial = Ili1.t();
    var mainPalette =
      thisObj instanceof Panel
        ? thisObj
        : new Window(
            "palette",
            isTrial ? "circuitFX - Trial" : "circuitFX",
            undefined,
            { resizeable: true },
          );
    if (mainPalette === null) {
      return;
    }
    mainPalette.margins = 10;
    function loadImage(e, r, t) {
      var a = Folder.userData.fsName + "/Adobe/ScriptData/" + t;
      if (!Folder(a).exists) {
        Folder(a).create();
        if (!Folder(a).exists) {
          alert("Could not create folder: " + a + ".");
          return;
        }
      }
      var o = a + "/" + r + ".png";
      var i = new File(o);
      if (!i.exists) {
        i.encoding = "BINARY";
        i.open("w");
        i.write(e);
        i.close();
        if (!i.exists) {
          alert("Could not create file in: " + a + ".");
          return;
        }
      }
      return i;
    }
    var myWin = mainPalette.add("group");
    myWin.orientation = "column";
    var tempComp = 0;
    var shape = new Shape();
    shape.vertices = [
      [9, -287.5],
      [-9, -287.5],
      [0, 0],
    ];
    shape.closed = true;
    var shape_pointer = new Shape();
    shape_pointer.vertices = [
      [17, -25],
      [0, -48],
      [-17, -25],
      [-17, 3],
      [17, 3],
    ];
    shape_pointer.closed = true;
    var step_W = 0;
    var step_H = 0;
    mask_vertices = [];
    var PB_max = 0;
    var ruler = 0;
    var shapeLayer = "";
    var labelColor = 0;
    var curComp = 0;
    var rFC = 255;
    var gFC = 255;
    var bFC = 255;
    var rSC = 255;
    var gSC = 255;
    var bSC = 255;
    var rCC = 0;
    var gCC = 0;
    var bCC = 0;
    var rCaC = 0;
    var gCaC = 0;
    var bCaC = 0;
    var rCaInnerC = 255;
    var gCaInnerC = 255;
    var bCaInnerC = 255;
    var rRC = 0;
    var gRC = 0;
    var bRC = 0;
    var rL = 158;
    var gL = 255;
    var bL = 176;
    var rBP = 0;
    var gBP = 48;
    var bBP = 5;
    var pass_GridX = 8;
    var pass_GridY = 8;
    imagelogo = __BLOB__BLOB_000588__;
    lock = __BLOB__BLOB_000589__;
    fill_circuit = __BLOB__BLOB_000590__;
    centerOut_circuit = __BLOB__BLOB_000591__;
    using_masks_circuit = __BLOB__BLOB_000592__;
    logo = myWin.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(imagelogo, "circuitFXLogo", "circuitFX")
        : imagelogo,
      { style: "toolbutton" },
    );
    logo.alignment = ["left", "fill"];
    logo.onClick = Ili1.helpUI;
    var er_panels = myWin.add("tabbedpanel");
    er_panels.preferredSize = [2, ""];
    er_panels.minimumSize = [284, 0];
    var rulerType_tab = er_panels.add("tab", undefined, "grid");
    rulerType_tab.spacing = 0;
    rulerType_tab.margins = [0, 10, 0, 0];
    var CircuitTypeGroup = rulerType_tab.add("group", undefined, "");
    CircuitTypeGroup.orientation = "row";
    CircuitTypeGroup.spacing = 0;
    CircuitTypeGroup.margins = [0, 0, 0, 0];
    var FillCircuitIconGroup = CircuitTypeGroup.add(
      "group",
      undefined,
      "Line Icon",
    );
    FillCircuitIconGroup.orientation = "column";
    FillCircuitIconGroup.alignment = ["fill", "fill"];
    FillCircuitIconGroup.spacing = 3;
    FillCircuitIconGroup.margins = [10, 0, 0, 0];
    var FillCircuitLabel = FillCircuitIconGroup.add(
      "StaticText",
      undefined,
      "Fill",
    );
    FillCircuitLabel.justify = "center";
    FillCircuitLabel.size = [90, 12];
    var FillCircuit = FillCircuitIconGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(fill_circuit, "FillCircuitIcon", "circuitFX")
        : fill_circuit,
      { style: "toolbutton", toggle: true },
    );
    FillCircuit.value = true;
    FillCircuit.helpTip = "Creates a circuit that fills the whole composition";
    FillCircuit.size = [85, 85];
    var CenterOutCircuitIconGroup = CircuitTypeGroup.add(
      "group",
      undefined,
      "Center Out Icon",
    );
    CenterOutCircuitIconGroup.orientation = "column";
    CenterOutCircuitIconGroup.alignment = ["fill", "fill"];
    CenterOutCircuitIconGroup.spacing = 3;
    CenterOutCircuitIconGroup.margins = [0, 0, 0, 0];
    var CenterOutCircuitLabel = CenterOutCircuitIconGroup.add(
      "StaticText",
      undefined,
      "Center Out",
    );
    CenterOutCircuitLabel.justify = "center";
    CenterOutCircuitLabel.size = [90, 12];
    var CenterOutCircuit = CenterOutCircuitIconGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(centerOut_circuit, "CenterOutCircuitIcon", "circuitFX")
        : centerOut_circuit,
      { style: "toolbutton", toggle: true },
    );
    CenterOutCircuit.value = false;
    CenterOutCircuit.helpTip =
      "Creates a circuit the fills the composition but leaves a center (defined by the radius parameter) rectangular part empty";
    CenterOutCircuit.size = [85, 85];
    var MaskCircuitIconGroup = CircuitTypeGroup.add(
      "group",
      undefined,
      "Mask Icon",
    );
    MaskCircuitIconGroup.orientation = "column";
    MaskCircuitIconGroup.alignment = ["fill", "fill"];
    MaskCircuitIconGroup.spacing = 3;
    MaskCircuitIconGroup.margins = [0, 0, 0, 0];
    var MaskCircuitLabel = MaskCircuitIconGroup.add(
      "StaticText",
      undefined,
      "Using Masks",
    );
    MaskCircuitLabel.justify = "center";
    MaskCircuitLabel.size = [90, 12];
    var MaskCircuit = MaskCircuitIconGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(using_masks_circuit, "MaskCircuitIcon", "circuitFX")
        : using_masks_circuit,
      { style: "toolbutton", toggle: true },
    );
    MaskCircuit.value = false;
    MaskCircuit.helpTip =
      "Creates a circuit by using masks to mask in/out specific areas of the composition";
    MaskCircuit.size = [85, 85];
    var boxRadiusGroup = rulerType_tab.add("group", undefined, "Group");
    boxRadiusGroup.orientation = "row";
    boxRadiusGroup.margins = [0, 5, 0, 0];
    boxRadiusGroup.alignment = ["center", "fill"];
    boxRadiusGroup.spacing = 0;
    boxRadiusGroup.alignChildren = "center";
    boxRadiusGroup.enabled = false;
    var boxRadiusLabel = boxRadiusGroup.add(
      "StaticText",
      undefined,
      "radius %:",
    );
    boxRadiusLabel.justify = "right";
    boxRadiusLabel.size = [60, 23];
    var boxRadius = boxRadiusGroup.add(
      'EditText {text:50, justify: "center"}',
      undefined,
      95,
    );
    boxRadius.size = [32, 20];
    boxRadius.helpTip = "Set how big the center empty rectangular area will be";
    boxRadius.addEventListener("keydown", function (e) {
      arrowsPressed(boxRadius, 10, 95);
    });
    var DimensionsGroup = rulerType_tab.add(
      "group",
      undefined,
      "LockDimensions",
    );
    DimensionsGroup.margins = [0, 5, 0, 0];
    DimensionsGroup.spacing = 0;
    DimensionsGroup.alignment = ["right", "fill"];
    DimensionsGroup.orientation = "row";
    var LockDimensionsGroup = DimensionsGroup.add(
      "group",
      undefined,
      "LockDimensions",
    );
    LockDimensionsGroup.margins = [0, 10, 0, 0];
    LockDimensionsGroup.spacing = 0;
    LockDimensionsGroup.alignment = ["left", "fill"];
    var LockDimensionsButton = LockDimensionsGroup.add(
      "iconbutton",
      undefined,
      parseFloat(app.version) < 12
        ? loadImage(lock, "circuitFX_lock_icon", "circuitFX")
        : lock,
      { style: "toolbutton", toggle: true },
    );
    LockDimensionsButton.value = false;
    LockDimensionsButton.size = [24, 36];
    LockDimensionsButton.helpTip = "Locks X and Y grid dimensions";
    var XYGroup = DimensionsGroup.add("group", undefined, "LockDimensions");
    XYGroup.margins = [0, 0, 0, 0];
    XYGroup.spacing = 0;
    XYGroup.alignment = ["right", "fill"];
    XYGroup.orientation = "column";
    var groupGridX = XYGroup.add("group", undefined, "GroupGridX");
    groupGridX.orientation = "row";
    groupGridX.margins = [0, 10, 0, 0];
    groupGridX.alignment = ["right", "fill"];
    groupGridX.alignChildren = "right";
    var GridXLabel = groupGridX.add("StaticText", undefined, "Grid X:");
    GridXLabel.size = [45, 23];
    GridXLabel.justify = "right";
    var GridX = groupGridX.add(
      'EditText {text:8, justify: "center"}',
      undefined,
      8,
    );
    GridX.size = [38, 23];
    GridX.helpTip =
      "Set the number of grid points for the X dimension (horizontal)";
    GridX.addEventListener("keydown", function (e) {
      arrowsPressed(GridX, 4, 100, "GridX");
    });
    var GridXSlider = groupGridX.add("Slider", undefined, 8, 4, 50);
    GridXSlider.helpTip = "Set the X grid dimension";
    GridXSlider.size = [130, 23];
    var groupGridY = XYGroup.add("group", undefined, "GroupGridY");
    groupGridY.orientation = "row";
    groupGridY.margins = [0, 0, 0, 0];
    groupGridY.alignment = ["right", "fill"];
    groupGridY.alignChildren = "right";
    var GridYLabel = groupGridY.add("StaticText", undefined, "Grid Y:");
    GridYLabel.size = [45, 23];
    GridYLabel.justify = "right";
    var GridY = groupGridY.add(
      'EditText {text:8, justify: "center"}',
      undefined,
      8,
    );
    GridY.size = [38, 23];
    GridY.helpTip =
      "Set the number of grid points for the Y dimension (vertical)";
    GridY.addEventListener("keydown", function (e) {
      arrowsPressed(GridY, 4, 100, "GridY");
    });
    var GridYSlider = groupGridY.add("Slider", undefined, 8, 4, 50);
    GridYSlider.helpTip = "Set the Y grid dimension";
    GridYSlider.size = [130, 23];
    var groupPopulate = rulerType_tab.add("group", undefined, "Populate");
    groupPopulate.orientation = "row";
    groupPopulate.margins = [0, 20, 0, 0];
    groupPopulate.alignment = ["right", "fill"];
    groupPopulate.alignChildren = "right";
    var PopulateLabel = groupPopulate.add(
      "StaticText",
      undefined,
      "Populate %:",
    );
    PopulateLabel.justify = "right";
    PopulateLabel.size = [65, 23];
    var Populate = groupPopulate.add(
      'EditText {text:90, justify: "center"}',
      undefined,
      90,
    );
    Populate.size = [38, 23];
    Populate.helpTip = "Set the fill percentage of the grid";
    Populate.addEventListener("keydown", function (e) {
      arrowsPressed(Populate, 10, 100, "Populate");
    });
    var PopulateSlider = groupPopulate.add("Slider", undefined, 90, 10, 100);
    PopulateSlider.helpTip = "Set the fill percentage of the grid";
    PopulateSlider.size = [130, 23];
    var parts_tab = er_panels.add("tab", undefined, "parts");
    parts_tab.margins = [10, 15, 0, 10];
    var groupLines = parts_tab.add(
      "panel",
      undefined,
      "Number of Line Vertices",
    );
    groupLines.orientation = "row";
    groupLines.margins = [0, 15, 0, 10];
    groupLines.alignChildren = "right";
    groupLines.alignment = ["fill", "fill"];
    var LinesMinLabel = groupLines.add("StaticText", undefined, "Minimum:");
    LinesMinLabel.justify = "right";
    LinesMinLabel.size = [75, 23];
    var LinesMin = groupLines.add(
      'EditText {text:1, justify: "center"}',
      undefined,
      1,
    );
    LinesMin.size = [35, 23];
    LinesMin.helpTip =
      "Set the minimum number of vertices of each circuit line";
    LinesMin.addEventListener("keydown", function (e) {
      arrowsPressed(LinesMin, 1, 100);
    });
    LinesMin.text = 1;
    var LinesMaxLabel = groupLines.add("StaticText", undefined, "Maximum:");
    LinesMaxLabel.justify = "right";
    LinesMaxLabel.size = [75, 23];
    var LinesMax = groupLines.add(
      'EditText {text:15, justify: "center"}',
      undefined,
      15,
    );
    LinesMax.size = [35, 23];
    LinesMax.helpTip =
      "Set the maximum number of vertices of each circuit line";
    LinesMax.addEventListener("keydown", function (e) {
      arrowsPressed(LinesMax, 1, 100);
    });
    LinesMax.text = 15;
    var groupClusters = parts_tab.add("panel", undefined, "Clusters");
    groupClusters.orientation = "row";
    groupClusters.margins = [8, 0, 0, 10];
    groupClusters.alignChildren = "right";
    groupClusters.alignment = ["fill", "fill"];
    var groupClustersPerCent = groupClusters.add(
      "group",
      undefined,
      "Clusters %",
    );
    groupClustersPerCent.orientation = "row";
    groupClustersPerCent.margins = [0, 10, 0, 0];
    groupClustersPerCent.alignChildren = "right";
    var ClustersPerCentLabel = groupClustersPerCent.add(
      "StaticText",
      undefined,
      "Clusters %:",
    );
    ClustersPerCentLabel.justify = "right";
    ClustersPerCentLabel.size = [65, 23];
    ClustersPerCentLabel.enabled = false;
    var ClustersPerCent = groupClustersPerCent.add(
      'EditText {text:50, justify: "center"}',
      undefined,
      50,
    );
    ClustersPerCent.size = [35, 23];
    ClustersPerCent.helpTip =
      "Set the percentage of clusters in the circuit lines. Clusters are circuit lines with multiple offsets applied to simulate parallel circuit paths";
    ClustersPerCent.addEventListener("keydown", function (e) {
      arrowsPressed(ClustersPerCent, 1, 100, "ClustersPerCent");
    });
    ClustersPerCent.enabled = false;
    var ClustersPerCentSlider = groupClustersPerCent.add(
      "Slider",
      undefined,
      50,
      1,
      100,
    );
    ClustersPerCentSlider.helpTip =
      "Set the percentage of clusters in the circuit lines. Clusters are circuit lines with multiple offsets applied to simulate parallel circuit paths";
    ClustersPerCentSlider.size = [100, 23];
    ClustersPerCentSlider.enabled = false;
    var ClustersPerCentCheckbox = groupClustersPerCent.add(
      "checkbox",
      undefined,
      "",
    );
    ClustersPerCentCheckbox.size = [20, 20];
    ClustersPerCentCheckbox.margins = [0, 0, 0, 0];
    ClustersPerCentCheckbox.value = false;
    ClustersPerCentCheckbox.helpTip =
      "enable/disable the generation of clusters";
    var groupAllParts = parts_tab.add("panel", undefined, "Components");
    groupAllParts.orientation = "column";
    groupAllParts.margins = [0, 0, 0, 0];
    groupAllParts.spacing = 0;
    groupAllParts.alignment = ["fill", "fill"];
    var groupChips = groupAllParts.add("group", undefined, "Chips");
    groupChips.orientation = "row";
    groupChips.margins = [0, 15, 0, 0];
    groupChips.alignChildren = "right";
    var ChipsLabel = groupChips.add("StaticText", undefined, "Chips:");
    ChipsLabel.justify = "right";
    ChipsLabel.size = [65, 23];
    ChipsLabel.enabled = false;
    var Chips = groupChips.add(
      'EditText {text:5, justify: "center"}',
      undefined,
      5,
    );
    Chips.size = [35, 23];
    Chips.helpTip = "Set the number of chips to create";
    Chips.addEventListener("keydown", function (e) {
      arrowsPressed(Chips, 1, 10, "Chips");
    });
    Chips.enabled = false;
    var ChipsSlider = groupChips.add("Slider", undefined, 5, 1, 10);
    ChipsSlider.helpTip = "Set the number of chips to create";
    ChipsSlider.size = [100, 23];
    ChipsSlider.enabled = false;
    var ChipsCheckbox = groupChips.add("checkbox", undefined, "");
    ChipsCheckbox.size = [20, 20];
    ChipsCheckbox.margins = [0, 0, 0, 0];
    ChipsCheckbox.value = false;
    ChipsCheckbox.helpTip = "enable/disable the generation of chips";
    var groupCapacitors = groupAllParts.add("group", undefined, "Capacitors");
    groupCapacitors.orientation = "row";
    groupCapacitors.margins = [0, 0, 0, 0];
    groupCapacitors.alignChildren = "right";
    var CapacitorsLabel = groupCapacitors.add(
      "StaticText",
      undefined,
      "Capacitors:",
    );
    CapacitorsLabel.justify = "right";
    CapacitorsLabel.size = [65, 23];
    CapacitorsLabel.enabled = false;
    var Capacitors = groupCapacitors.add(
      'EditText {text:5, justify: "center"}',
      undefined,
      5,
    );
    Capacitors.size = [35, 23];
    Capacitors.helpTip = "Set the number of capacitors to create";
    Capacitors.addEventListener("keydown", function (e) {
      arrowsPressed(Capacitors, 1, 30, "Capacitors");
    });
    Capacitors.enabled = false;
    var CapacitorsSlider = groupCapacitors.add("Slider", undefined, 5, 1, 30);
    CapacitorsSlider.helpTip = "Set the number of capacitors to create";
    CapacitorsSlider.size = [100, 23];
    CapacitorsSlider.enabled = false;
    var CapacitorsCheckbox = groupCapacitors.add("checkbox", undefined, "");
    CapacitorsCheckbox.size = [20, 20];
    CapacitorsCheckbox.margins = [0, 0, 0, 0];
    CapacitorsCheckbox.value = false;
    CapacitorsCheckbox.helpTip = "enable/disable the generation of capacitors";
    var groupResistors = groupAllParts.add("group", undefined, "Resistors");
    groupResistors.orientation = "row";
    groupResistors.margins = [0, 0, 0, 10];
    groupResistors.alignChildren = "right";
    var ResistorsLabel = groupResistors.add(
      "StaticText",
      undefined,
      "Resistors:",
    );
    ResistorsLabel.justify = "right";
    ResistorsLabel.size = [65, 23];
    ResistorsLabel.enabled = false;
    var Resistors = groupResistors.add(
      'EditText {text:5, justify: "center"}',
      undefined,
      5,
    );
    Resistors.size = [35, 23];
    Resistors.helpTip = "Set the number of resistors to create";
    Resistors.addEventListener("keydown", function (e) {
      arrowsPressed(Resistors, 1, 30, "Resistors");
    });
    Resistors.enabled = false;
    var ResistorsSlider = groupResistors.add("Slider", undefined, 5, 1, 30);
    ResistorsSlider.helpTip = "Set the number of resistors to create";
    ResistorsSlider.size = [100, 23];
    ResistorsSlider.enabled = false;
    var ResistorsCheckbox = groupResistors.add("checkbox", undefined, "");
    ResistorsCheckbox.size = [20, 20];
    ResistorsCheckbox.margins = [0, 0, 0, 0];
    ResistorsCheckbox.value = false;
    ResistorsCheckbox.helpTip = "enable/disable the generation of resistors";
    var settings_tab = er_panels.add("tab", undefined, "settings");
    settings_tab.margins = [10, 20, 0, 0];
    var groupDirection = settings_tab.add(
      "panel",
      undefined,
      "Generation orientation",
    );
    groupDirection.orientation = "column";
    groupDirection.margins = [0, 15, 0, 10];
    groupDirection.alignment = ["fill", "fill"];
    var groupDirectionDropdown = groupDirection.add("group", undefined, "");
    groupDirectionDropdown.orientation = "row";
    groupDirectionDropdown.margins = [0, 0, 25, 0];
    groupDirectionDropdown.alignment = ["right", "fill"];
    var DirectionLabel = groupDirectionDropdown.add(
      'StaticText {text:"Direction: ", justify: "right"}',
      undefined,
    );
    DirectionLabel.size = [55, 15];
    var DirectionDropdown = groupDirectionDropdown.add(
      "dropdownlist",
      undefined,
      [
        "Random",
        "Horizontal \u2194",
        "Vertical \u2195",
        "Diagonal 1 \\\\",
        "Diagonal 2 //",
        "Left to Right \u2192",
        "Right to Left \u2190",
        "Top to Bottom \u2193",
        "Bottom to Top \u2191",
        "Diagonal 1 \\\\ - \u2191",
        "Diagonal 1 \\\\ - \u2193   ",
        "Diagonal 2 // - \u2191",
        "Diagonal 2 // - \u2193",
        "Outwards",
        "Outwards - Only lines from center-out",
      ],
    );
    DirectionDropdown.helpTip = "Select the direction";
    DirectionDropdown.size = [156, 15];
    DirectionDropdown.selection = 0;
    DirectionDropdown.items[14].enabled = false;
    var groupDirectionSlider = groupDirection.add("group", undefined, "");
    groupDirectionSlider.orientation = "row";
    groupDirectionSlider.margins = [0, 0, 20, 0];
    groupDirectionSlider.alignChildren = "right";
    groupDirectionSlider.alignment = ["right", "fill"];
    var DirectionBiasLabel = groupDirectionSlider.add(
      "StaticText",
      undefined,
      "Strength:",
    );
    DirectionBiasLabel.justify = "right";
    DirectionBiasLabel.size = [65, 23];
    DirectionBiasLabel.enabled = false;
    var DirectionBias = groupDirectionSlider.add(
      'EditText {text:1, justify: "center"}',
      undefined,
      1,
    );
    DirectionBias.size = [35, 23];
    DirectionBias.helpTip = "Set the the direction bias strength";
    DirectionBias.addEventListener("keydown", function (e) {
      arrowsPressed(DirectionBias, 1, 5, "DirectionBias");
    });
    DirectionBias.enabled = false;
    var DirectionBiasSlider = groupDirectionSlider.add(
      "Slider",
      undefined,
      1,
      1,
      5,
    );
    DirectionBiasSlider.helpTip = "Set the direction bias strength";
    DirectionBiasSlider.size = [120, 23];
    DirectionBiasSlider.enabled = false;
    var SettingsGroup = settings_tab.add("group", undefined, "Settings Group");
    SettingsGroup.orientation = "column";
    SettingsGroup.alignment = ["fill", "fill"];
    SettingsGroup.margins = [0, 15, 0, 0];
    SettingsGroup.spacing = 0;
    var SeperateLayersCheckbox = SettingsGroup.add(
      "checkbox",
      undefined,
      "Put circuit parts on separate layers",
    );
    SeperateLayersCheckbox.value = false;
    SeperateLayersCheckbox.size = [240, 22];
    SeperateLayersCheckbox.helpTip =
      "Seperates the circuit in layers. Circles, lines, chips, resistors, capacitors and the background plate are placed on different layers";
    var RandomizeTrimStartCheckbox = SettingsGroup.add(
      "checkbox",
      undefined,
      "Randomize Trim starting point",
    );
    RandomizeTrimStartCheckbox.value = false;
    RandomizeTrimStartCheckbox.size = [240, 22];
    RandomizeTrimStartCheckbox.helpTip =
      "Randomizes the Trim Starting point for each circuit line, to avoid a visible looping point";
    var CrossingCheckbox = SettingsGroup.add(
      "checkbox",
      undefined,
      "Avoid crossing of circuit lines",
    );
    CrossingCheckbox.value = true;
    CrossingCheckbox.size = [240, 22];
    CrossingCheckbox.helpTip =
      "Uses a more complex algorithm (a bit slower generation) to prevent circuit lines from crossing.";
    var masksOffsetGroup = SettingsGroup.add("group", undefined, "Group");
    masksOffsetGroup.orientation = "row";
    masksOffsetGroup.margins = [15, 0, 0, 5];
    masksOffsetGroup.alignment = ["left", ""];
    masksOffsetGroup.spacing = 0;
    var masksCheckbox = masksOffsetGroup.add(
      "checkbox",
      undefined,
      "Create layer with lines as masks",
    );
    masksCheckbox.value = false;
    masksCheckbox.size = [183, 14];
    masksCheckbox.helpTip =
      "Creates a simple solid layer, with all the generated circuit lines as masks.";
    var masksLabel = masksOffsetGroup.add(
      "StaticText",
      undefined,
      "|   offset:",
    );
    masksLabel.justify = "left";
    masksLabel.size = [46, 22];
    masksLabel.enabled = false;
    masksLabel.helpTip = "Set the offset (thickness) of the generated masks.";
    var masksOffset = masksOffsetGroup.add(
      'EditText {text:3, justify: "center"}',
      undefined,
      200,
    );
    masksOffset.size = [25, 22];
    masksOffset.helpTip =
      "Set how big the center empty rectangular area will be";
    masksOffset.addEventListener("keydown", function (e) {
      arrowsPressed(masksOffset, 1, 200);
    });
    masksOffset.enabled = false;
    var TempMessageCheckbox = SettingsGroup.add(
      "checkbox",
      undefined,
      "Show progress bar",
    );
    TempMessageCheckbox.size = [240, 23];
    TempMessageCheckbox.helpTip =
      "Recommended! Enables the progress bar and also creates a temporary composition, which prevents After Effects from constantly updating the circuit generating composition, thus speeding up the generation process significantly.";
    TempMessageCheckbox.value = true;
    var ButtonsGroup = myWin.add("group", undefined, "GroupSix");
    ButtonsGroup.orientation = "column";
    ButtonsGroup.alignment = ["fill", "fill"];
    var StackedButtons = ButtonsGroup.add("group", undefined, "GroupSix");
    StackedButtons.orientation = "stack";
    StackedButtons.alignment = ["fill", "fill"];
    var TeoButton = StackedButtons.add("button", undefined, "Create Circuit");
    TeoButton.alignment = ["fill", "fill"];
    TeoButton.size = ["", "48"];
    TeoButton.helpTip = "Let\'s create some circuits!";
    var CreateGridGuide = StackedButtons.add(
      "button",
      undefined,
      "Create Grid Guide",
    );
    CreateGridGuide.alignment = ["left", "fill"];
    CreateGridGuide.size = ["120", "28"];
    CreateGridGuide.helpTip = "Creates a Grid Guide Layer";
    CreateGridGuide.visible = false;
    var CreateMaskCircuit = StackedButtons.add(
      "button",
      undefined,
      "Create Circuit by using mask",
    );
    CreateMaskCircuit.alignment = ["right", "fill"];
    CreateMaskCircuit.size = ["170", "28"];
    CreateMaskCircuit.helpTip = "Let\'s create some circuits!";
    CreateMaskCircuit.visible = false;
    LockDimensionsButton.onClick = function () {
      if (this.value) {
        this.value = true;
        GridYSlider.value = GridY.text = GridX.text;
        GridY.enabled = GridYLabel.enabled = GridYSlider.enabled = false;
      } else {
        this.value = false;
        GridY.enabled = GridYLabel.enabled = GridYSlider.enabled = true;
      }
    };
    boxRadius.onChange = function () {
      this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "") {
        this.text = 50;
      }
      if (this.text < 10) {
        this.text = 10;
      }
      if (this.text > 90) {
        this.text = 90;
      }
      var e = Number(GridX.text) < Number(GridY.text) ? GridX.text : GridY.text;
      if (
        Math.floor(e * 0.5 - 2) -
          Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
        2
      ) {
        for (
          var r = boxRadius.text;
          Math.floor(e * 0.5 - 2) -
            Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
          2;
          r++
        ) {
          boxRadius.text = boxRadius.text - 1;
        }
      }
    };
    GridX.onChange = function () {
      this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text < 4) {
        GridXSlider.value = this.text = 4;
      }
      if (CenterOutCircuit.value) {
        if (this.text < 8) {
          this.text = 8;
        }
        var e =
          Number(GridX.text) < Number(GridY.text) ? GridX.text : GridY.text;
        if (
          Math.floor(e * 0.5 - 2) -
            Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
          2
        ) {
          for (
            var r = boxRadius.text;
            Math.floor(e * 0.5 - 2) -
              Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
            2;
            r++
          ) {
            boxRadius.text = boxRadius.text - 1;
          }
        }
      }
      GridXSlider.value = GridX.text;
      if (LockDimensionsButton.value) {
        GridYSlider.value = GridY.text = this.text;
      }
    };
    GridY.onChange = function () {
      this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text < 4) {
        GridYSlider.value = this.text = 4;
      }
      if (CenterOutCircuit.value) {
        if (this.text < 8) {
          this.text = 8;
        }
        var e =
          Number(GridX.text) < Number(GridY.text) ? GridX.text : GridY.text;
        if (
          Math.floor(e * 0.5 - 2) -
            Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
          2
        ) {
          for (
            var r = boxRadius.text;
            Math.floor(e * 0.5 - 2) -
              Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
            2;
            r++
          ) {
            boxRadius.text = boxRadius.text - 1;
          }
        }
      }
      GridYSlider.value = this.text;
      if (LockDimensionsButton.value) {
        GridX.text = this.text;
      }
    };
    Populate.onChange = function () {
      PopulateSlider.value = this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text == 0) {
        PopulateSlider.value = this.text = 1;
      }
      if (this.text > 100) {
        PopulateSlider.value = this.text = 100;
      }
      if (this.text < 10) {
        PopulateSlider.value = this.text = 10;
      }
    };
    ClustersPerCent.onChange = function () {
      ClustersPerCentSlider.value = this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text == 0) {
        PopulateSlider.value = this.text = 1;
      }
      if (this.text > 100) {
        ClustersPerCentSlider.value = this.text = 100;
      }
      if (this.text < 0) {
        ClustersPerCentSlider.value = this.text = 0;
      }
    };
    DirectionBias.onChange = function () {
      DirectionBiasSlider.value = this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text < 1) {
        DirectionBiasSlider.value = this.text = 1;
      }
      if (this.text > 5) {
        DirectionBiasSlider.value = this.text = 5;
      }
    };
    LinesMin.onChange = function () {
      this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text == 0) {
        LinesMin.text = 1;
      }
      if (Number(LinesMin.text) > Number(LinesMax.text)) {
        LinesMin.text = LinesMax.text;
      }
    };
    LinesMax.onChange = function () {
      this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text == 0) {
        LinesMax.text = 1;
      }
      if (Number(LinesMax.text) < Number(LinesMin.text)) {
        LinesMax.text = LinesMin.text;
      }
    };
    Chips.onChange = function () {
      ChipsSlider.value = this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text == 0) {
        ChipsSlider.value = this.text = 1;
      }
    };
    Capacitors.onChange = function () {
      CapacitorsSlider.value = this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text == 0) {
        CapacitorsSlider.value = this.text = 1;
      }
    };
    masksOffset.onChange = function () {
      this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "") {
        this.text = 1;
      }
      if (this.text > 100) {
        this.text = 100;
      }
    };
    Resistors.onChange = function () {
      ResistorsSlider.value = this.text = this.text.replace(/[^\d]/g, "");
      if (this.text == "" || this.text == 0) {
        ResistorsSlider.value = this.text = 1;
      }
    };
    Populate.onChanging = function () {
      PopulateSlider.value = this.text;
    };
    Chips.onChanging = function () {
      ChipsSlider.value = this.text;
    };
    ClustersPerCent.onChanging = function () {
      ClustersPerCentSlider.value = this.text;
    };
    Capacitors.onChanging = function () {
      CapacitorsSlider.value = this.text;
    };
    Resistors.onChanging = function () {
      ResistorsSlider.value = this.text;
    };
    DirectionBias.onChanging = function () {
      DirectionBiasSlider.value = this.text;
    };
    DirectionDropdown.onChange = function () {
      if (this.selection == null) {
        this.selection = 0;
      }
      DirectionBias.enabled =
        DirectionBiasSlider.enabled =
        DirectionBiasLabel.enabled =
          DirectionDropdown.selection.index == 0 ? false : true;
    };
    GridXSlider.onChanging = GridXSlider.onChange = function () {
      GridX.text = Math.round(GridXSlider.value);
      if (LockDimensionsButton.value) {
        GridY.text = GridX.text;
        GridYSlider.value = GridXSlider.value;
      }
      if (CenterOutCircuit.value) {
        var e =
          Number(GridX.text) < Number(GridY.text) ? GridX.text : GridY.text;
        if (
          Math.floor(e * 0.5 - 2) -
            Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
          2
        ) {
          for (
            var r = boxRadius.text;
            Math.floor(e * 0.5 - 2) -
              Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
            2;
            r++
          ) {
            boxRadius.text = boxRadius.text - 1;
          }
        }
      }
    };
    GridYSlider.onChanging = GridYSlider.onChange = function () {
      GridY.text = Math.round(GridYSlider.value);
      if (CenterOutCircuit.value) {
        var e =
          Number(GridX.text) < Number(GridY.text) ? GridX.text : GridY.text;
        if (
          Math.floor(e * 0.5 - 2) -
            Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
          2
        ) {
          for (
            var r = boxRadius.text;
            Math.floor(e * 0.5 - 2) -
              Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
            2;
            r++
          ) {
            boxRadius.text = boxRadius.text - 1;
          }
        }
      }
    };
    PopulateSlider.onChanging = PopulateSlider.onChange = function () {
      Populate.text = Math.round(PopulateSlider.value);
    };
    ClustersPerCentSlider.onChanging = ClustersPerCentSlider.onChange =
      function () {
        ClustersPerCent.text = Math.round(ClustersPerCentSlider.value);
      };
    ChipsSlider.onChanging = ChipsSlider.onChange = function () {
      Chips.text = Math.round(ChipsSlider.value);
    };
    CapacitorsSlider.onChanging = CapacitorsSlider.onChange = function () {
      Capacitors.text = Math.round(CapacitorsSlider.value);
    };
    ResistorsSlider.onChanging = ResistorsSlider.onChange = function () {
      Resistors.text = Math.round(ResistorsSlider.value);
    };
    DirectionBiasSlider.onChanging = DirectionBiasSlider.onChange =
      function () {
        DirectionBias.text = Math.round(DirectionBiasSlider.value);
      };
    FillCircuit.onClick = function () {
      FillCircuit.value = true;
      CenterOutCircuit.value =
        MaskCircuit.value =
        boxRadiusGroup.enabled =
          false;
      TeoButton.visible = true;
      CreateGridGuide.visible = CreateMaskCircuit.visible = false;
      GridXSlider.minvalue = GridYSlider.minvalue = 4;
      if (DirectionDropdown.selection.index == 14) {
        DirectionDropdown.selection = 0;
      }
      DirectionDropdown.items[14].enabled = false;
    };
    CenterOutCircuit.onClick = function () {
      CenterOutCircuit.value = true;
      FillCircuit.value = false;
      MaskCircuit.value = false;
      boxRadiusGroup.enabled = true;
      TeoButton.visible = true;
      CreateGridGuide.visible = CreateMaskCircuit.visible = false;
      GridXSlider.minvalue = GridYSlider.minvalue = 8;
      if (GridX.text < 8) {
        GridX.text = 8;
      }
      if (GridY.text < 8) {
        GridY.text = 8;
      }
      var e = Number(GridX.text) < Number(GridY.text) ? GridX.text : GridY.text;
      if (
        Math.floor(e * 0.5 - 2) -
          Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
        2
      ) {
        for (
          var r = boxRadius.text;
          Math.floor(e * 0.5 - 2) -
            Math.floor((e * 0.5 - 2) * boxRadius.text * 0.01) <
          2;
          r++
        ) {
          boxRadius.text = boxRadius.text - 1;
        }
      }
      DirectionDropdown.items[14].enabled = true;
    };
    MaskCircuit.onClick = function () {
      MaskCircuit.value = true;
      FillCircuit.value = false;
      CenterOutCircuit.value = false;
      boxRadiusGroup.enabled = false;
      TeoButton.visible = false;
      CreateGridGuide.visible = true;
      CreateMaskCircuit.visible = true;
      GridXSlider.minvalue = GridYSlider.minvalue = 4;
      if (DirectionDropdown.selection.index == 14) {
        DirectionDropdown.selection = 0;
      }
      DirectionDropdown.items[14].enabled = false;
    };
    masksCheckbox.onClick = function () {
      masksLabel.enabled = masksOffset.enabled = this.value ? true : false;
    };
    ChipsCheckbox.onClick = function () {
      ChipsLabel.enabled =
        Chips.enabled =
        ChipsSlider.enabled =
          this.value ? true : false;
    };
    ClustersPerCentCheckbox.onClick = function () {
      ClustersPerCentLabel.enabled =
        ClustersPerCent.enabled =
        ClustersPerCentSlider.enabled =
          this.value ? true : false;
    };
    CapacitorsCheckbox.onClick = function () {
      CapacitorsLabel.enabled =
        Capacitors.enabled =
        CapacitorsSlider.enabled =
          this.value ? true : false;
    };
    ResistorsCheckbox.onClick = function () {
      ResistorsLabel.enabled =
        Resistors.enabled =
        ResistorsSlider.enabled =
          this.value ? true : false;
    };
    TeoButton.onClick = function () {
      curComp = app.project.activeItem;
      app.beginUndoGroup("Creation of circuitFX");
      if (curComp === null || !(curComp instanceof CompItem)) {
        alert("Please select a comp first!", "circuitFX alert");
      } else {
        step_W = Math.round(curComp.width / GridX.text);
        step_H = Math.round(curComp.height / GridY.text);
        if (GridX.text > 15 || GridY.text > 15) {
          if (isTrial) {
            alert(
              "The max grid size that can be created in trial mode is 15 x 15.\n\nPlease readjust the Grid X and Grid Y values and try again",
              "circuitFX alert",
            );
          } else {
            if (GridX.text > 50 || GridY.text > 50) {
              if (
                confirm(
                  "The settings you have selected will create a " +
                    GridX.text +
                    " x " +
                    GridY.text +
                    " grid which is quite large. Are you sure you want to continue?\n\nIf you choose to continue, be prepared to wait a while. After Effects may seem unresponsive, but it will be doing hard work under the hood! Please be patient.",
                  "noAsDefault",
                  "circuitFX",
                ) === true
              ) {
                if (SeperateLayersCheckbox.value) {
                  CenterOutCircuit.value
                    ? createCircuit_center_seperate()
                    : createCircuit_fill_separate();
                } else {
                  CenterOutCircuit.value
                    ? createCircuit_center()
                    : createCircuit_fill();
                }
              }
            } else {
              if (SeperateLayersCheckbox.value) {
                CenterOutCircuit.value
                  ? createCircuit_center_seperate()
                  : createCircuit_fill_separate();
              } else {
                CenterOutCircuit.value
                  ? createCircuit_center()
                  : createCircuit_fill();
              }
            }
          }
        } else {
          if (GridX.text > 50 || GridY.text > 50) {
            if (
              confirm(
                "The settings you have selected will create a " +
                  GridX.text +
                  " x " +
                  GridY.text +
                  " grid which is quite large. Are you sure you want to continue?\n\nIf you choose to continue, be prepared to wait a while. After Effects may seem unresponsive, but it will be doing hard work under the hood! Please be patient.",
                "noAsDefault",
                "circuitFX",
              ) === true
            ) {
              if (SeperateLayersCheckbox.value) {
                CenterOutCircuit.value
                  ? createCircuit_center_seperate()
                  : createCircuit_fill_separate();
              } else {
                CenterOutCircuit.value
                  ? createCircuit_center()
                  : createCircuit_fill();
              }
            }
          } else {
            if (SeperateLayersCheckbox.value) {
              CenterOutCircuit.value
                ? createCircuit_center_seperate()
                : createCircuit_fill_separate();
            } else {
              CenterOutCircuit.value
                ? createCircuit_center()
                : createCircuit_fill();
            }
          }
        }
      }
      app.endUndoGroup();
    };
    CreateGridGuide.onClick = function () {
      var e = [];
      var r = [];
      all_available_vertices = [];
      all_available_vertices_chips = [];
      var t = [];
      var a = [];
      var o = [];
      var i = [];
      var s = [];
      var c = 0;
      var l = app.project.activeItem;
      app.beginUndoGroup("Creation of circuitFX Guide Layer");
      if (l === null || !(l instanceof CompItem)) {
        alert("Please select a comp first!", "circuitFX alert");
      } else {
        curComp = app.project.activeItem;
        if (GridX.text > 15 || GridY.text > 15) {
          if (isTrial) {
            alert(
              "The max grid size that can be created in trial mode is 15 x 15.\n\nPlease readjust the Grid X and Grid Y values and try again",
              "circuitFX alert",
            );
          } else {
            shapeLayer = curComp.layers.addShape();
            ruler = 1;
            shapeLayer.comment =
              "CircuitFX Grid Guide Layer - [ GridX: " +
              GridX.text +
              " - GridY: " +
              GridY.text +
              " ]";
            for (var n = 1; n < app.project.activeItem.numLayers; n += 1) {
              shapeLayer.name = "CircuitFX - Grid Guide " + ruler;
              if (app.project.activeItem.layer(n).name == shapeLayer.name) {
                ruler += 1;
                n = 1;
              }
            }
            if (labelColor + 1 == 17) {
              labelColor = 0;
            }
            labelColor += 1;
            shapeLayer.name = "CircuitFX - Grid Guide " + ruler;
            shapeLayer.label = labelColor;
            var p = 0;
            step_W = Math.round(curComp.width / GridX.text);
            step_H = Math.round(curComp.height / GridY.text);
            visualize_grid(all_available_vertices, "Layer Guide Grid");
            app.project.activeItem
              .layer(shapeLayer.name)
              .Effects.addProperty("ADBE Slider Control").name =
              "Grid Guide - Dots Size";
            app.project.activeItem
              .layer(shapeLayer.name)("ADBE Effect Parade")(
                "Grid Guide - Dots Size",
              )("ADBE Slider Control-0001")
              .setValue(
                step_W > step_H
                  ? (curComp.height / step_H) * 0.1
                  : (curComp.width / step_W) * 0.1,
              );
            app.project.activeItem.layer(shapeLayer.name)(
              "ADBE Root Vectors Group",
            )("ADBE Vector Group")("ADBE Vectors Group")(
              "ADBE Vector Shape - Ellipse",
            )("ADBE Vector Ellipse Size").expression =
              '[effect("Grid Guide - Dots Size")("ADBE Slider Control-0001"),effect("Grid Guide - Dots Size")("ADBE Slider Control-0001")]';
          }
        } else {
          shapeLayer = curComp.layers.addShape();
          ruler = 1;
          shapeLayer.comment =
            "CircuitFX Grid Guide Layer - [ GridX: " +
            GridX.text +
            " - GridY: " +
            GridY.text +
            " ]";
          for (var n = 1; n < app.project.activeItem.numLayers; n += 1) {
            shapeLayer.name = "CircuitFX - Grid Guide " + ruler;
            if (app.project.activeItem.layer(n).name == shapeLayer.name) {
              ruler += 1;
              n = 1;
            }
          }
          if (labelColor + 1 == 17) {
            labelColor = 0;
          }
          labelColor += 1;
          shapeLayer.name = "CircuitFX - Grid Guide " + ruler;
          shapeLayer.label = labelColor;
          var p = 0;
          step_W = Math.round(curComp.width / GridX.text);
          step_H = Math.round(curComp.height / GridY.text);
          visualize_grid(all_available_vertices, "Layer Guide Grid");
          app.project.activeItem
            .layer(shapeLayer.name)
            .Effects.addProperty("ADBE Slider Control").name =
            "Grid Guide - Dots Size";
          app.project.activeItem
            .layer(shapeLayer.name)("ADBE Effect Parade")(
              "Grid Guide - Dots Size",
            )("ADBE Slider Control-0001")
            .setValue(
              step_W > step_H
                ? step_H * GridY.text * 0.01
                : step_W * GridX.text * 0.01,
            );
          app.project.activeItem.layer(shapeLayer.name)(
            "ADBE Root Vectors Group",
          )("ADBE Vector Group")("ADBE Vectors Group")(
            "ADBE Vector Shape - Ellipse",
          )("ADBE Vector Ellipse Size").expression =
            '[effect("Grid Guide - Dots Size")("ADBE Slider Control-0001"),effect("Grid Guide - Dots Size")("ADBE Slider Control-0001")]';
        }
      }
      parseFloat(app.version) > 13
        ? (app.project.toolType = ToolType.Tool_Pen)
        : null;
      app.endUndoGroup();
    };
    possible_movements = function () {
      pano = [current_vertex[0], current_vertex[1] - step_H];
      pano_deksia = [current_vertex[0] + step_W, current_vertex[1] - step_H];
      deksia = [current_vertex[0] + step_W, current_vertex[1]];
      kato_deksia = [current_vertex[0] + step_W, current_vertex[1] + step_H];
      kato = [current_vertex[0], current_vertex[1] + step_H];
      kato_aristera = [current_vertex[0] - step_W, current_vertex[1] + step_H];
      aristera = [current_vertex[0] - step_W, current_vertex[1]];
      pano_aristera = [current_vertex[0] - step_W, current_vertex[1] - step_H];
      try_array = [];
      if (DirectionDropdown.selection.index == 0) {
        switch (old_vertex.toString()) {
          case pano.toString():
            try_array = [kato_deksia, kato, kato_aristera];
            break;
          case pano_deksia.toString():
            try_array = [kato, kato_aristera, aristera];
            break;
          case deksia.toString():
            try_array = [kato_aristera, aristera, pano_aristera];
            break;
          case kato_deksia.toString():
            try_array = [pano, aristera, pano_aristera];
            break;
          case kato.toString():
            try_array = [pano, pano_deksia, pano_aristera];
            break;
          case kato_aristera.toString():
            try_array = [pano, pano_deksia, deksia];
            break;
          case aristera.toString():
            try_array = [pano_deksia, deksia, kato_deksia];
            break;
          case pano_aristera.toString():
            try_array = [deksia, kato_deksia, kato];
            break;
          default:
            try_array = [
              pano,
              pano_deksia,
              pano_aristera,
              kato,
              aristera,
              deksia,
              kato_deksia,
              kato_aristera,
            ];
        }
      } else {
        var e = 0;
        switch (old_vertex.toString()) {
          case pano.toString():
            switch (DirectionDropdown.selection.index) {
              case 1:
                for (; e < 5; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato);
                }
                break;
              case 7:
              case 2:
                for (; e < 5; e++) {
                  try_array.push(kato);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_deksia, kato_aristera);
                }
                break;
              case 10:
              case 3:
                for (; e < 5; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_aristera);
                }
                break;
              case 9:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_aristera);
                }
                break;
              case 12:
              case 4:
                for (; e < 5; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_deksia);
                }
                break;
              case 11:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_deksia);
                }
                break;
              case 5:
                for (; e < 5; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato);
                }
                break;
              case 6:
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato);
                }
            }
            break;
          case pano_deksia.toString():
            switch (DirectionDropdown.selection.index) {
              case 5:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato);
                }
                break;
              case 6:
              case 1:
                for (; e < 5; e++) {
                  try_array.push(aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato);
                }
                break;
              case 7:
              case 2:
                for (; e < 5; e++) {
                  try_array.push(kato);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(aristera);
                }
                break;
              case 8:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(aristera);
                }
                break;
              case 3:
                for (; e < 5; e++) {
                  try_array.push(aristera, kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato);
                }
                break;
              case 10:
                for (; e < 5; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato);
                }
                break;
              case 9:
                for (; e < 5; e++) {
                  try_array.push(aristera, kato_aristera);
                }
                break;
              case 12:
              case 4:
                for (; e < 5; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato, aristera);
                }
            }
            break;
          case deksia.toString():
            switch (DirectionDropdown.selection.index) {
              case 6:
              case 1:
                for (; e < 5; e++) {
                  try_array.push(aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_aristera, pano_aristera);
                }
                break;
              case 2:
                for (; e < 5; e++) {
                  try_array.push(kato_aristera, pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(aristera);
                }
                break;
              case 8:
                for (; e < 5; e++) {
                  try_array.push(pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(aristera);
                }
                break;
              case 7:
                for (; e < 5; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(aristera);
                }
                break;
              case 9:
              case 3:
                for (; e < 5; e++) {
                  try_array.push(pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_aristera);
                }
                break;
              case 11:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_aristera);
                }
                break;
              case 10:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_aristera);
                }
                break;
              case 12:
              case 4:
                for (; e < 5; e++) {
                  try_array.push(kato_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_aristera);
                }
            }
            break;
          case kato_deksia.toString():
            switch (DirectionDropdown.selection.index) {
              case 5:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano);
                }
                break;
              case 6:
              case 1:
                for (; e < 5; e++) {
                  try_array.push(aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano);
                }
                break;
              case 8:
              case 2:
                for (; e < 5; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(aristera);
                }
                break;
              case 7:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(aristera);
                }
                break;
              case 9:
              case 3:
                for (; e < 5; e++) {
                  try_array.push(pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano, aristera);
                }
                break;
              case 11:
                for (; e < 5; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_aristera);
                }
                break;
              case 12:
                for (; e < 5; e++) {
                  try_array.push(aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_aristera);
                }
                break;
              case 4:
                for (; e < 5; e++) {
                  try_array.push(pano, aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_aristera);
                }
            }
            break;
          case kato.toString():
            switch (DirectionDropdown.selection.index) {
              case 5:
                for (; e < 5; e++) {
                  try_array.push(pano_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano);
                }
                break;
              case 6:
                for (; e < 5; e++) {
                  try_array.push(pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano);
                }
                break;
              case 1:
                for (; e < 5; e++) {
                  try_array.push(pano_deksia, pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano);
                }
                break;
              case 8:
              case 2:
                for (; e < 5; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_aristera, pano_deksia);
                }
                break;
              case 9:
              case 3:
                for (; e < 5; e++) {
                  try_array.push(pano_aristera);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 10:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 11:
              case 4:
                for (; e < 5; e++) {
                  try_array.push(pano_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_aristera);
                }
                break;
              case 12:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_aristera);
                }
            }
            break;
          case kato_aristera.toString():
            switch (DirectionDropdown.selection.index) {
              case 6:
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano);
                }
                break;
              case 5:
              case 1:
                for (; e < 5; e++) {
                  try_array.push(deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 8:
              case 2:
                for (; e < 5; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(deksia);
                }
                break;
              case 7:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(deksia);
                }
                break;
              case 3:
                for (; e < 5; e++) {
                  try_array.push(pano, deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 10:
                for (; e < 5; e++) {
                  try_array.push(deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 9:
                for (; e < 5; e++) {
                  try_array.push(pano);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 11:
              case 4:
                for (; e < 5; e++) {
                  try_array.push(pano_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(deksia, pano);
                }
            }
            break;
          case aristera.toString():
            switch (DirectionDropdown.selection.index) {
              case 5:
              case 1:
                for (; e < 5; e++) {
                  try_array.push(deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_deksia, pano_deksia);
                }
                break;
              case 2:
                for (; e < 5; e++) {
                  try_array.push(pano_deksia, kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(deksia);
                }
                break;
              case 8:
                for (; e < 5; e++) {
                  try_array.push(pano_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(deksia);
                }
                break;
              case 7:
                for (; e < 5; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(deksia);
                }
                break;
              case 10:
              case 3:
                for (; e < 5; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 9:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(pano_deksia);
                }
                break;
              case 11:
              case 4:
                for (; e < 5; e++) {
                  try_array.push(pano_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_deksia);
                }
                break;
              case 12:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato_deksia);
                }
            }
            break;
          case pano_aristera.toString():
            switch (DirectionDropdown.selection.index) {
              case 6:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato);
                }
                break;
              case 5:
              case 1:
                for (; e < 5; e++) {
                  try_array.push(deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(kato);
                }
                break;
              case 7:
              case 2:
                for (; e < 5; e++) {
                  try_array.push(kato);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(deksia);
                }
                break;
              case 8:
                for (; e < 5 - DirectionBias.text - 1; e++) {
                  try_array.push(deksia);
                }
                break;
              case 10:
              case 3:
                for (; e < 5; e++) {
                  try_array.push(kato_deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato, deksia);
                }
                break;
              case 11:
                for (; e < 5; e++) {
                  try_array.push(deksia);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_deksia);
                }
                break;
              case 4:
                for (; e < 5; e++) {
                  try_array.push(deksia, kato);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_deksia);
                }
                break;
              case 12:
                for (; e < 5; e++) {
                  try_array.push(kato);
                }
                e = 0;
                for (; e < 5 - DirectionBias.text; e++) {
                  try_array.push(kato_deksia);
                }
            }
            break;
          default:
            switch (DirectionDropdown.selection.index) {
              case 1:
                try_array = [aristera, deksia];
                break;
              case 2:
                try_array = [pano, kato];
                break;
              case 3:
                try_array = [pano_aristera, kato_deksia];
                break;
              case 4:
                try_array = [pano_deksia, kato_aristera];
                break;
              case 5:
                try_array = [deksia];
                break;
              case 6:
                try_array = [aristera];
                break;
              case 7:
                try_array = [kato];
                break;
              case 8:
                try_array = [pano];
                break;
              case 9:
                try_array = [pano_aristera];
                break;
              case 10:
                try_array = [kato_deksia];
                break;
              case 11:
                try_array = [pano_deksia];
                break;
              case 12:
                try_array = [kato_aristera];
            }
        }
      }
    };
    possible_movements_outwards = function () {
      pano = [current_vertex[0], current_vertex[1] - step_H];
      pano_deksia = [current_vertex[0] + step_W, current_vertex[1] - step_H];
      deksia = [current_vertex[0] + step_W, current_vertex[1]];
      kato_deksia = [current_vertex[0] + step_W, current_vertex[1] + step_H];
      kato = [current_vertex[0], current_vertex[1] + step_H];
      kato_aristera = [current_vertex[0] - step_W, current_vertex[1] + step_H];
      aristera = [current_vertex[0] - step_W, current_vertex[1]];
      pano_aristera = [current_vertex[0] - step_W, current_vertex[1] - step_H];
      try_array = [];
      shortest_vertex = [current_vertex[0], current_vertex[1]];
      switch (old_vertex.toString()) {
        case pano.toString():
          try_array = [kato_deksia, kato, kato_aristera];
          break;
        case pano_deksia.toString():
          try_array = [kato, kato_aristera, aristera];
          break;
        case deksia.toString():
          try_array = [kato_aristera, aristera, pano_aristera];
          break;
        case kato_deksia.toString():
          try_array = [pano, aristera, pano_aristera];
          break;
        case kato.toString():
          try_array = [pano, pano_deksia, pano_aristera];
          break;
        case kato_aristera.toString():
          try_array = [pano, pano_deksia, deksia];
          break;
        case aristera.toString():
          try_array = [pano_deksia, deksia, kato_deksia];
          break;
        case pano_aristera.toString():
          try_array = [deksia, kato_deksia, kato];
          break;
        default:
          try_array = [
            pano,
            pano_deksia,
            pano_aristera,
            kato,
            aristera,
            deksia,
            kato_deksia,
            kato_aristera,
          ];
      }
      for (var e = 0; e < try_array.length; e += 1) {
        a_plebra = try_array[e][0] - destination_vertex[0];
        b_plebra = try_array[e][1] - destination_vertex[1];
        var r = Math.sqrt(a_plebra * a_plebra + b_plebra * b_plebra);
        if (r < shortest_length) {
          shortest_length = r;
          shortest_vertex = try_array[e];
        }
      }
      if (typeof shortest_vertex != "undefined") {
        switch (parseInt(DirectionBias.text)) {
          case 1:
            try_array.unshift(shortest_vertex);
            break;
          case 2:
            try_array.pop();
            try_array.unshift(shortest_vertex);
            break;
          case 3:
            try_array.pop();
            try_array.pop();
            try_array.unshift(shortest_vertex);
            break;
          case 4:
            try_array.pop();
            try_array.pop();
            try_array.push(shortest_vertex);
            try_array.push(shortest_vertex);
            try_array.push(shortest_vertex);
            try_array.unshift(shortest_vertex);
            try_array.unshift(shortest_vertex);
            try_array.unshift(shortest_vertex);
            break;
          case 5:
            try_array = [];
            try_array[0] = [shortest_vertex[0], shortest_vertex[1]];
        }
      }
    };
    offset_path = function () {
      actual_circuit_path_offset_A = [];
      actual_circuit_path_offset_B = [];
      offset_amount = parseInt(masksOffset.text);
      pano = [actual_circuit_path[0][0], actual_circuit_path[0][1] - step_H];
      pano_deksia = [
        actual_circuit_path[0][0] + step_W,
        actual_circuit_path[0][1] - step_H,
      ];
      deksia = [actual_circuit_path[0][0] + step_W, actual_circuit_path[0][1]];
      kato_deksia = [
        actual_circuit_path[0][0] + step_W,
        actual_circuit_path[0][1] + step_H,
      ];
      kato = [actual_circuit_path[0][0], actual_circuit_path[0][1] + step_H];
      kato_aristera = [
        actual_circuit_path[0][0] - step_W,
        actual_circuit_path[0][1] + step_H,
      ];
      aristera = [
        actual_circuit_path[0][0] - step_W,
        actual_circuit_path[0][1],
      ];
      pano_aristera = [
        actual_circuit_path[0][0] - step_W,
        actual_circuit_path[0][1] - step_H,
      ];
      origin_x = actual_circuit_path[0][0];
      origin_y = actual_circuit_path[0][1];
      ax = origin_x - offset_amount;
      ay = origin_y;
      bx = origin_x + offset_amount;
      by = origin_y;
      switch (actual_circuit_path[1].toString()) {
        case pano.toString():
          angle = (-180 * Math.PI) / 180;
          break;
        case pano_deksia.toString():
          angle = (-135 * Math.PI) / 180;
          break;
        case deksia.toString():
          angle = (-90 * Math.PI) / 180;
          break;
        case kato_deksia.toString():
          angle = (-45 * Math.PI) / 180;
          break;
        case kato.toString():
          angle = 0;
          break;
        case kato_aristera.toString():
          angle = (45 * Math.PI) / 180;
          break;
        case aristera.toString():
          angle = (90 * Math.PI) / 180;
          break;
        case pano_aristera.toString():
          angle = (135 * Math.PI) / 180;
      }
      final_ax =
        (ax - origin_x) * Math.cos(angle) - (ay - origin_y) * Math.sin(angle);
      final_ay =
        (ay - origin_y) * Math.cos(angle) + (ax - origin_x) * Math.sin(angle);
      final_bx =
        (bx - origin_x) * Math.cos(angle) - (by - origin_y) * Math.sin(angle);
      final_by =
        (by - origin_y) * Math.cos(angle) + (bx - origin_x) * Math.sin(angle);
      actual_circuit_path_offset_A.push([
        final_ax + origin_x,
        final_ay + origin_y,
      ]);
      actual_circuit_path_offset_B.push([
        final_bx + origin_x,
        final_by + origin_y,
      ]);
      for (var i = 1; i < actual_circuit_path.length - 1; i += 1) {
        pano = [actual_circuit_path[i][0], actual_circuit_path[i][1] - step_H];
        pano_deksia = [
          actual_circuit_path[i][0] + step_W,
          actual_circuit_path[i][1] - step_H,
        ];
        deksia = [
          actual_circuit_path[i][0] + step_W,
          actual_circuit_path[i][1],
        ];
        kato_deksia = [
          actual_circuit_path[i][0] + step_W,
          actual_circuit_path[i][1] + step_H,
        ];
        kato = [actual_circuit_path[i][0], actual_circuit_path[i][1] + step_H];
        kato_aristera = [
          actual_circuit_path[i][0] - step_W,
          actual_circuit_path[i][1] + step_H,
        ];
        aristera = [
          actual_circuit_path[i][0] - step_W,
          actual_circuit_path[i][1],
        ];
        pano_aristera = [
          actual_circuit_path[i][0] - step_W,
          actual_circuit_path[i][1] - step_H,
        ];
        origin_x = actual_circuit_path[i][0];
        origin_y = actual_circuit_path[i][1];
        ax = origin_x - offset_amount;
        ay = origin_y;
        bx = origin_x + offset_amount;
        by = origin_y;
        switch (actual_circuit_path[i - 1].toString()) {
          case pano.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case kato_deksia.toString():
                angle = (-22.5 * Math.PI) / 180;
                break;
              case kato.toString():
                angle = (0 * Math.PI) / 180;
                break;
              case kato_aristera.toString():
                angle = (22.5 * Math.PI) / 180;
            }
            break;
          case pano_deksia.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case kato.toString():
                angle = (22.5 * Math.PI) / 180;
                break;
              case kato_aristera.toString():
                angle = (45 * Math.PI) / 180;
                break;
              case aristera.toString():
                angle = (67.5 * Math.PI) / 180;
            }
            break;
          case deksia.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case kato_aristera.toString():
                angle = (67.5 * Math.PI) / 180;
                break;
              case aristera.toString():
                angle = (90 * Math.PI) / 180;
                break;
              case pano_aristera.toString():
                angle = (-247.5 * Math.PI) / 180;
            }
            break;
          case kato_deksia.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case pano.toString():
                angle = (157.5 * Math.PI) / 180;
                break;
              case aristera.toString():
                angle = (112.5 * Math.PI) / 180;
                break;
              case pano_aristera.toString():
                angle = (135 * Math.PI) / 180;
            }
            break;
          case kato.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case pano.toString():
                angle = (180 * Math.PI) / 180;
                break;
              case pano_deksia.toString():
                angle = (202.5 * Math.PI) / 180;
                break;
              case pano_aristera.toString():
                angle = (157.5 * Math.PI) / 180;
            }
            break;
          case kato_aristera.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case pano.toString():
                angle = (-157.5 * Math.PI) / 180;
                break;
              case pano_deksia.toString():
                angle = (-135 * Math.PI) / 180;
                break;
              case deksia.toString():
                angle = (-112.5 * Math.PI) / 180;
            }
            break;
          case aristera.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case pano_deksia.toString():
                angle = (-112.5 * Math.PI) / 180;
                break;
              case deksia.toString():
                angle = (-90 * Math.PI) / 180;
                break;
              case kato_deksia.toString():
                angle = (-67.5 * Math.PI) / 180;
            }
            break;
          case pano_aristera.toString():
            switch (actual_circuit_path[i + 1].toString()) {
              case deksia.toString():
                angle = (-67.5 * Math.PI) / 180;
                break;
              case kato_deksia.toString():
                angle = (-45 * Math.PI) / 180;
                break;
              case kato.toString():
                angle = (-22.5 * Math.PI) / 180;
            }
            break;
        }
        final_ax =
          (ax - origin_x) * Math.cos(angle) - (ay - origin_y) * Math.sin(angle);
        final_ay =
          (ay - origin_y) * Math.cos(angle) + (ax - origin_x) * Math.sin(angle);
        final_bx =
          (bx - origin_x) * Math.cos(angle) - (by - origin_y) * Math.sin(angle);
        final_by =
          (by - origin_y) * Math.cos(angle) + (bx - origin_x) * Math.sin(angle);
        actual_circuit_path_offset_A.push([
          final_ax + origin_x,
          final_ay + origin_y,
        ]);
        actual_circuit_path_offset_B.push([
          final_bx + origin_x,
          final_by + origin_y,
        ]);
      }
      origin_x = actual_circuit_path[i][0];
      origin_y = actual_circuit_path[i][1];
      ax = origin_x - offset_amount;
      ay = origin_y;
      bx = origin_x + offset_amount;
      by = origin_y;
      switch (actual_circuit_path[actual_circuit_path.length - 1].toString()) {
        case pano.toString():
          angle = (-180 * Math.PI) / 180;
          break;
        case pano_deksia.toString():
          angle = (-135 * Math.PI) / 180;
          break;
        case deksia.toString():
          angle = (-90 * Math.PI) / 180;
          break;
        case kato_deksia.toString():
          angle = (-45 * Math.PI) / 180;
          break;
        case kato.toString():
          angle = 0;
          break;
        case kato_aristera.toString():
          angle = (45 * Math.PI) / 180;
          break;
        case aristera.toString():
          angle = (90 * Math.PI) / 180;
          break;
        case pano_aristera.toString():
          angle = (135 * Math.PI) / 180;
      }
      final_ax =
        (ax - origin_x) * Math.cos(angle) - (ay - origin_y) * Math.sin(angle);
      final_ay =
        (ay - origin_y) * Math.cos(angle) + (ax - origin_x) * Math.sin(angle);
      final_bx =
        (bx - origin_x) * Math.cos(angle) - (by - origin_y) * Math.sin(angle);
      final_by =
        (by - origin_y) * Math.cos(angle) + (bx - origin_x) * Math.sin(angle);
      actual_circuit_path_offset_A.push([
        final_ax + origin_x,
        final_ay + origin_y,
      ]);
      actual_circuit_path_offset_B.push([
        final_bx + origin_x,
        final_by + origin_y,
      ]);
    };
    CreateMaskCircuit.onClick = function () {
      mask_vertices = [];
      curComp = app.project.activeItem;
      var e = app.project.activeItem;
      app.beginUndoGroup("Creation of circuitFX using masks");
      if (e === null || !(e instanceof CompItem)) {
        alert(
          "Please select a comp first and then a circuitFX Grid Guide layer and try again.",
          "circuitFX alert",
        );
      } else {
        if (app.project.activeItem.selectedLayers[0] == null) {
          alert(
            "Please select a circuitFX Grid Guide layer and try again.",
            "circuitFX alert",
          );
        } else {
          if (app.project.activeItem.selectedLayers.length > 1) {
            alert(
              "You have more than one layer selected.\nPlease select only one circuitFX Grid Guide layer and try again.",
              "circuitFX alert",
            );
          } else {
            if (
              app.project.activeItem.selectedLayers[0].comment.indexOf(
                "CircuitFX Grid Guide Layer",
              ) == -1
            ) {
              alert(
                "This is not a circtuiFX Grid Guide layer.\nPlease select a circtuiFX Grid Guide layer and try again.",
                "circuitFX alert",
              );
            } else {
              if (
                app.project.activeItem.selectedLayers[0]("ADBE Mask Parade")(
                  "ADBE Mask Atom",
                ) == null
              ) {
                alert(
                  "No masks found on the selected Grid Guide Layer!\nPlease create a mask and try again.",
                  "circuitFX alert",
                );
              } else {
                guideLayer = app.project.activeItem.selectedLayers[0];
                pass_GridX = guideLayer.comment.substring(
                  guideLayer.comment.indexOf("GridX: ") + 7,
                  guideLayer.comment.indexOf("- GridY:") - 1,
                );
                pass_GridY = guideLayer.comment.substring(
                  guideLayer.comment.indexOf("GridY: ") + 7,
                  guideLayer.comment.indexOf("]") - 1,
                );
                all_available_vertices = [];
                step_W = Math.round(curComp.width / pass_GridX);
                step_H = Math.round(curComp.height / pass_GridY);
                for (var a = 0; a <= pass_GridX; a += 1) {
                  for (var b = 0; b <= pass_GridY; b += 1) {
                    all_available_vertices.push([a * step_W, b * step_H]);
                  }
                }
                if (
                  ChipsCheckbox.value ||
                  CapacitorsCheckbox.value ||
                  ResistorsCheckbox.value
                ) {
                  all_available_vertices_chips =
                    all_available_vertices.slice(0);
                }
                for (
                  var maskNum = 1;
                  maskNum <= guideLayer("ADBE Mask Parade").numProperties;
                  maskNum += 1
                ) {
                  var r =
                    guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                      .value.vertices;
                  var t =
                    guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                      .value.inTangents;
                  var o =
                    guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                      .value.outTangents;
                  for (var s = 0; s < r.length; s += 1) {
                    r[s][0] += curComp.width * 0.5;
                    r[s][1] += curComp.height * 0.5;
                  }
                  if (
                    guideLayer("ADBE Mask Parade")(maskNum)("ADBE Mask Shape")
                      .value.closed == true
                  ) {
                    r.push(r[0]);
                    t.push(t[0]);
                    o.push(o[0]);
                  }
                  r.reverse();
                  t.reverse();
                  o.reverse();
                  var c = [0.16, 0.33, 0.5, 0.66, 0.83];
                  for (var s = 0; s < r.length - 1; s += 1) {
                    A0 = r[s][0];
                    D0 = r[s + 1][0];
                    B0 = r[s][0] + t[s][0];
                    C0 = r[s + 1][0] + o[s + 1][0];
                    A1 = r[s][1];
                    D1 = r[s + 1][1];
                    B1 = r[s][1] + t[s][1];
                    C1 = r[s + 1][1] + o[s + 1][1];
                    for (var l = 0; l < c.length; l += 1) {
                      E0 = (1 - c[l]) * A0 + c[l] * B0;
                      F0 = (1 - c[l]) * B0 + c[l] * C0;
                      G0 = (1 - c[l]) * C0 + c[l] * D0;
                      H0 = (1 - c[l]) * E0 + c[l] * F0;
                      J0 = (1 - c[l]) * F0 + c[l] * G0;
                      K0 = (1 - c[l]) * H0 + c[l] * J0;
                      E1 = (1 - c[l]) * A1 + c[l] * B1;
                      F1 = (1 - c[l]) * B1 + c[l] * C1;
                      G1 = (1 - c[l]) * C1 + c[l] * D1;
                      H1 = (1 - c[l]) * E1 + c[l] * F1;
                      J1 = (1 - c[l]) * F1 + c[l] * G1;
                      K1 = (1 - c[l]) * H1 + c[l] * J1;
                      r.splice(s + 1, 0, [K0, K1]);
                      t.splice(s + 1, 0, [0, 0]);
                      o.splice(s + 1, 0, [0, 0]);
                      s++;
                    }
                  }
                  r.pop();
                  t.pop();
                  o.pop();
                  if (
                    guideLayer("ADBE Mask Parade")(maskNum).maskMode ==
                    MaskMode.SUBTRACT
                  ) {
                    for (var i = 0; i < all_available_vertices.length; i += 1) {
                      if (inside(all_available_vertices[i], r) == true) {
                        mask_vertices.push(all_available_vertices[i]);
                      }
                    }
                  } else {
                    for (var i = 0; i < all_available_vertices.length; i += 1) {
                      if (maskNum == 1) {
                        if (inside(all_available_vertices[i], r) == false) {
                          mask_vertices.push(all_available_vertices[i]);
                        }
                      } else {
                        if (inside(all_available_vertices[i], r) == true) {
                          for (var k = 0; k < mask_vertices.length; k += 1) {
                            if (all_available_vertices[i] == mask_vertices[k]) {
                              mask_vertices.splice(k, 1);
                            }
                          }
                        }
                      }
                    }
                  }
                }
                pass_GridX = guideLayer.comment.substring(
                  guideLayer.comment.indexOf("GridX: ") + 7,
                  guideLayer.comment.indexOf("- GridY:") - 1,
                );
                pass_GridY = guideLayer.comment.substring(
                  guideLayer.comment.indexOf("GridY: ") + 7,
                  guideLayer.comment.indexOf("]") - 1,
                );
                if (SeperateLayersCheckbox.value) {
                  createCircuit_fill_separate(1, pass_GridX, pass_GridY);
                } else {
                  createCircuit_fill(1, pass_GridX, pass_GridY);
                }
              }
            }
          }
        }
      }
      app.endUndoGroup();
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
circuitFX(this);
