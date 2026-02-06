/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function vn_CreditsAreDue(thisObj) {
  function f4Gd(cmd) {
    function licUI() {
      var licPal = new Window(
        "dialog",
        strTrialWelcomeHeader + " v" + strScriptVersion,
        undefined,
        { resizeable: true },
      );
      if (licPal != null) {
        var res =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\tinfoGrp: Group { \t\t\t\t\talignment: [\'fill\',\'top\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\torientation: \'column\', \t\t\t\t\t\thdrGrp: Group {\t\t\t\t\t\t\ttxt: StaticText {}, \t\t\t\t\t\t\tpaste: StaticText {}, \t\t\t\t\t\t}\t\t\t\t\t\ttrial: StaticText {}, \t\t\t\t\t} \t\t\t\t\tlicGrp: Group { \t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \t\t\t\t\t} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\t\tretrieveReg: Button {text:\'" +
          strRetrieveLic +
          "\',  alignment: [\'left\',\'center\'],preferredSize:[150,30]}\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
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
        licPal.grp.infoGrp.hdrGrp.txt.text = strTrialWelcomeMsg;
        licPal.grp.infoGrp.hdrGrp.txt.graphics.font = boldFont;
        licPal.grp.infoGrp.hdrGrp.paste.text = strPasteHelp;
        licPal.grp.infoGrp.hdrGrp.paste.graphics.font = smallFont;
        licPal.grp.infoGrp.trial.text =
          betaMode || !offerTrial ? "" : strTrialInstructMsg;
        licPal.grp.licGrp.txt.text =
          betaMode || !offerTrial ? "" : "VNCD*MONTER*GROUP\xa9*1902203SUL9";
        licPal.grp.okGrp.retrieveReg.visible = !betaMode;
        licPal.grp.okGrp.retrieveReg.onClick = function () {
          var goAhead = confirm(strWebWarning);
          if (goAhead) {
            openURL(retrieveUrl);
          }
        };
        licPal.grp.okGrp.cancelBtn.onClick = function () {
          licPal.close(false);
        };
        licPal.grp.okGrp.okBtn.onClick = function () {
          var license = licPal.grp.licGrp.txt.text
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "");
          saveSettings(prefsSectionName, prefsName, base64Encode(license));
          saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
          saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
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
    function checkTrial(mode) {
      var trialExpired = false;
      var today = new Date();
      var one_day = 86400000;
      var todayInMsFixed = (parseInt(today, 10) / one_day / 1000000).toFixed(6);
      if (haveSettings(prefHeader, prefSection1)) {
        trialStartDate =
          parseInt(getSettings(prefHeader, prefSection1), 16) / 100000000000;
      } else {
        trialStartDate = todayInMsFixed;
        saveSettings(
          prefHeader,
          prefSection1,
          (trialStartDate * 100000000000).toString(16),
        );
      }
      if (haveSettings(prefHeader, prefSection2)) {
        launchCount = Math.max(
          1,
          parseInt(app.settings.getSetting(prefHeader, prefSection2), 16) /
            1000000000000,
        );
        if (mode != "balance" && cmd == "l") {
          app.settings.saveSetting(
            prefHeader,
            prefSection2,
            ((launchCount + 1) * 1000000000000).toString(16),
          );
        }
      } else {
        launchCount = 1;
        saveSettings(
          prefHeader,
          prefSection2,
          (launchCount * 1000000000000).toString(16),
        );
      }
      var trialLengthSoFar = Math.max(
        0,
        parseInt(today, 10) / one_day - trialStartDate * 1000000,
      );
      if (isAE()) {
        clearOutput();
      }
      var trialDaysLeft =
        trialLengthSoFar > trialLengthDays || todayInMsFixed < trialStartDate
          ? 0
          : Math.ceil(trialLengthDays - trialLengthSoFar);
      var launchesLeft = Math.max(0, trialLengthLaunches - launchCount);
      if (
        (trialLengthSoFar > trialLengthDays &&
          launchCount > trialLengthLaunches) ||
        todayInMsFixed < trialStartDate
      ) {
        trialExpired = true;
      }
      if (cmd != "c") {
        if (trialDaysLeft > 0 && mode != "balance") {
          if (isAE()) {
            writeLn(strTrialThanks);
          }
          if (isAE()) {
            writeLn(strTrialTxt.replace(/%E/g, trialDaysLeft));
          }
        } else {
          if (!trialExpired && mode != "balance") {
            if (isAE()) {
              writeLn(strTrialThanks);
            }
            if (isAE()) {
              writeLn(strTrialTxt2.replace(/%E/g, launchesLeft));
            }
          }
        }
      }
      if (mode == "balance") {
        return trialDaysLeft;
      } else {
        return trialExpired;
      }
    }
    function checkBeta(betaExpDate) {
      var betaExpired = false;
      var today = new Date();
      var one_day = 86400000;
      var todayInMs = parseInt(today, 10) / one_day;
      var betaExpInMs = parseInt(betaExpDate, 10) / one_day;
      if (todayInMs > betaExpInMs) {
        betaExpired = true;
      }
      return betaExpired;
    }
    function updateLicenseUI(reg) {
      var updPal = new Window("dialog", strUpdateLicenseHeader, undefined, {
        resizeable: false,
      });
      if (updPal != null) {
        var res =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t   infoGrp: Group { \t\t\t\t   alignment: [\'fill\',\'top\'], \t\t\t\t   alignChildren: [\'fill\',\'fill\'], \t\t\t\t   orientation: \'column\', \t\t\t\t\t  hdr: StaticText {}, \t\t\t\t\t  info: StaticText {preferredSize:[800,40], properties:{multiline:true}}, \t\t\t\t\t  url: StaticText {}, \t\t\t\t\t} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
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
        updPal.grp.infoGrp.hdr.text = strUpdateLicenseHdr;
        updPal.grp.infoGrp.hdr.graphics.font = boldFont;
        updPal.grp.infoGrp.info.text = strUpdateLicense;
        updPal.grp.infoGrp.url.text = strTrialUrl;
        updPal.grp.infoGrp.url.graphics.font = boldFontSm;
        updPal.grp.okGrp.cancelBtn.onClick = function () {
          updPal.close(false);
        };
        updPal.grp.okGrp.okBtn.onClick = function () {
          openURL(strTrialUrl);
          updPal.close(true);
        };
        updPal.layout.layout(true);
        updPal.layout.resize();
        updPal.onResizing = updPal.onResize = function () {
          this.layout.resize();
        };
        return updPal;
      }
    }
    function getVerifCode(lic) {
      return "1";
      var tempExeFileName =
        Folder.temp.fsName +
        "/" +
        Math.round(Math.random() * new Date().getTime() * 37915);
      if ($.os.indexOf("Win") != -1) {
        base64IconStr = winBase64KeyStr;
        tempExeFileName += ".exe";
      } else {
        var getMacProcessor = systemCall("arch");
        if (getMacProcessor.toLowerCase().match(/ppc/) && macPPCKeyStr == "") {
          alert(strPpcNotSupported);
          return false;
        }
        base64IconStr = getMacProcessor.toLowerCase().match(/ppc/)
          ? macPPCKeyStr
          : macBase64KeyStr;
      }
      var newExe = createFile(File(tempExeFileName), base64IconStr, "BINARY");
      newExe.hidden = true;
      if ($.os.indexOf("Mac") != -1) {
        systemCall("chmod 757 " + newExe.fsName);
      }
      var cmd = '"' + newExe.fsName + '" ' + lic + " " + privateNum;
      var verifCode = systemCall(cmd);
      newExe.remove();
      return verifCode;
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
        var myLicense = myRegArray[3].replace(/^[0-9]+/, "");
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
          myLicense;
        var tempKey = code[0].substring(2, code[0].length - 2);
        var nameEncode = string_encode3(name);
        var key = nameEncode * privateNum;
        if (key == tempKey) {
          return "1";
        } else {
          return "0";
        }
      } else {
        if (lic != base64Encode("bad")) {
          alert(strNewLicenseFormat);
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
        alert(strOldLicenseFormat);
        return false;
      }
    }
    function checkCode(doPrompt, myReg, privateNum) {
      if (myReg != undefined) {
        myReg = myReg.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      myLicense = false;
      if (doPrompt) {
        regUI = licUI();
        myRegPrompt = regUI.show();
      } else {
        myRegPrompt = true;
      }
      regOK = false;
      if (myRegPrompt || (myReg && !doPrompt)) {
        if (haveSettings(prefsSectionName, prefsName)) {
          myReg = getSettings(prefsSectionName, prefsName);
        } else {
          if (isAE()) {
            alert(strErrScriptAccess);
          }
          return myLicense;
        }
        myReg = base64Decode(myReg);
        if (!offerTrial || myReg.toLowerCase() != "trial") {
          var myRegArray = myReg.split("*");
          if (
            myReg.match(
              /^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/,
            ) &&
            myRegArray.length == 4
          ) {
            if (myRegArray[0] != null && myRegArray[0] != strHeader) {
              alert(strWrongProduct + "\n" + strContactSupport);
              saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
              saveSettings(
                prefsSectionName,
                prefsVersionName,
                strScriptVersion,
              );
              saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
              checkCode(doPrompt);
              return false;
            }
            var myLicenseMatch = myRegArray[3].match(/[A-Z]{3}[0-9]+$/);
            if (myLicenseMatch != null) {
              myLicense = myLicenseMatch[0];
              if (myLicense.match("BTA") && !betaMode) {
                alert(strBetaCodeAlert);
                saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
                saveSettings(
                  prefsSectionName,
                  prefsVersionName,
                  strScriptVersion,
                );
                saveSettings(
                  prefsSectionName,
                  prefsLicVersion,
                  licensingVersion,
                );
                checkCode(doPrompt);
                return false;
              }
            } else {
              alert(strInvalidCode + "\n" + strContactSupport);
              saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
              saveSettings(
                prefsSectionName,
                prefsVersionName,
                strScriptVersion,
              );
              saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
              checkCode(doPrompt);
              return myLicense;
            }
            var licenseValidity =
              licV == 2 ? getVerifCode(myReg) : getVerifCode3(myReg);
            if (parseInt(licenseValidity, 10) == 1) {
              if (doPrompt) {
                saveSettings(prefsSectionName, prefsName, base64Encode(myReg));
                var numUsers = parseInt(myReg.match(/[0-9]+$/), 10);
                alert(
                  strRegSuccess.replace(
                    "%u",
                    numUsers + " user" + numUsers > 1 ? "s" : "",
                  ) + !betaMode
                    ? strRegSuccess1
                    : "",
                );
              }
              regOK = true;
              saveSettings(
                prefsSectionName,
                prefsVersionName,
                strScriptVersion,
              );
              saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
            } else {
              if (doPrompt) {
                if (parseInt(licenseValidity, 10) == 0) {
                  alert(strInvalidCode + "\n" + strContactSupport);
                } else {
                  if (licenseValidity.match(/ERROR: /i)) {
                    alert(
                      strFirewall +
                        "\n" +
                        strContactSupport +
                        "\n" +
                        licenseValidity,
                    );
                  } else {
                    alert(strUnknownError + licenseValidity);
                  }
                }
                saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
                saveSettings(
                  prefsSectionName,
                  prefsVersionName,
                  strScriptVersion,
                );
                saveSettings(
                  prefsSectionName,
                  prefsLicVersion,
                  licensingVersion,
                );
                checkCode(doPrompt);
                return myLicense;
              } else {
                alert(strCorruptedCode);
                doPrompt = true;
                saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
                saveSettings(
                  prefsSectionName,
                  prefsVersionName,
                  strScriptVersion,
                );
                saveSettings(
                  prefsSectionName,
                  prefsLicVersion,
                  licensingVersion,
                );
                checkCode(doPrompt);
                return myLicense;
              }
            }
          } else {
            if (myReg.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
              var goToUrl = confirm(strTempCode);
              if (isSecurityPrefSet() && goToUrl) {
                openURL(exchangeUrl + "?serial=" + myReg);
              }
              saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
              saveSettings(
                prefsSectionName,
                prefsVersionName,
                strScriptVersion,
              );
              saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
              return myLicense;
            } else {
              alert(
                strInvalidCode + "\n" + !betaMode
                  ? strNewLicenseFormat
                  : strNewLicenseFormat.replace(/SUL/g, "BTA") +
                      "\n\n" +
                      strContactSupport,
              );
              doPrompt = true;
              saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
              saveSettings(
                prefsSectionName,
                prefsVersionName,
                strScriptVersion,
              );
              saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
              checkCode(doPrompt);
              return myLicense;
            }
          }
        } else {
          if (!betaMode && !checkTrial()) {
            myLicense = offerTrial ? "trial" : "";
            regOK = true;
            saveSettings(prefsSectionName, prefsName, base64Encode("trial"));
            saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
            saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
          } else {
            if (betaMode) {
              alert(strBetaLicReq);
              saveSettings(prefsSectionName, prefsName, base64Encode("bad"));
              saveSettings(
                prefsSectionName,
                prefsVersionName,
                strScriptVersion,
              );
              saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
              return myLicense;
            } else {
              if (cmd == "l") {
                var goToUrl = confirm(strExpiredAlert);
                if (isSecurityPrefSet() && goToUrl) {
                  openURL(strTrialUrl);
                } else {
                  if (goToUrl && isAE()) {
                    alert(strErrScriptAccess);
                  }
                }
              }
            }
          }
        }
      }
      return myLicense;
    }
    function base64Decode(input) {
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
    function base64Encode(input) {
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
      var securitySetting = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return securitySetting == 1;
    }
    function openURL(url) {
      if (isAE() || isPS()) {
        var winProgramFiles = Folder.commonFiles.parent.fsName;
        var winBrowserCmd = "explorer ";
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
        var tempOutputFile = File(Folder.temp.fsName + "/openUrl.url");
        var f = createFile(
          tempOutputFile,
          "[InternetShortcut]\rURL=" + url + "\r",
          "UTF-8",
          true,
        );
        f.execute();
      }
    }
    function parseRegistration(checkReg, mode) {
      if (mode == undefined) {
        mode = "p";
      }
      if (!offerTrial || checkReg != "trial") {
        var myReg = checkReg.replace(/_/g, " ");
        var myRegArray = myReg.split("*");
        if (myRegArray.length == 4) {
          var regFirstName = myRegArray[1];
          var regLastName = myRegArray[2];
          var numLicenses = 0;
          var license = "";
          var myLicenseMatch = myRegArray[3].match(/([A-Z]{3})([0-9]+)$/);
          if (myLicenseMatch != null && myLicenseMatch.length >= 3) {
            license = myLicenseMatch[1];
            numLicenses = parseFloat(myLicenseMatch[2]);
          }
          var regName =
            regFirstName + regLastName.match(/^@/) ? "" : " " + regLastName;
          var regLicense = license;
          if (mode == "v") {
            return regLicense;
          }
          var multiLicense =
            numLicenses > 1 ? " for " + numLicenses + " Users" : " for 1 User";
          switch (regLicense) {
            case "SUL":
              myLicense = " - License" + multiLicense;
              break;
            case "Pro":
              myLicense = " - Pro License" + multiLicense;
              break;
            case "STE":
              myLicense = " - Site License";
              break;
            case "psr":
              myLicense = " - Pro Site License";
              break;
            case "BTA":
              myLicense = " - Beta Test License";
              break;
            case "EDU":
              myLicense = " - Educational License";
              break;
            default:
              myLicense = " - Invalid License";
              break;
          }
          regHeader = regName + " " + myLicense;
        } else {
          regHeader = "License is invalid";
        }
      } else {
        var daysLeft = checkTrial("balance");
        regHeader = "Trial (" + daysLeft + " days left)";
      }
      return regHeader;
    }
    function isAE() {
      return BridgeTalk.appName == "aftereffects";
    }
    function isPS() {
      return BridgeTalk.appName == "photoshop";
    }
    function readFile(file) {
      if (file.exists && file.open("r")) {
        var string = file.read();
        file.close();
        return string;
      } else {
        return null;
      }
    }
    function createFile(file, encodedStr, encoding, overwrite) {
      if (!file.exists || overwrite) {
        file = new File(file.fsName);
        file.encoding = encoding;
        file.open("w");
        file.write(encodedStr);
        file.close();
        file.hidden = true;
        if ($.os.indexOf("Mac") != -1) {
          systemCall("chmod 757 " + file.fsName);
        }
      }
      return file;
    }
    function systemCall(cmd) {
      if (isAE()) {
        return system.callSystem(cmd);
      }
      if (isPS()) {
        var tempOutputFileName =
          Folder.temp.fsName +
          "/" +
          Math.round(Math.random() * new Date().getTime() * 21876);
        app.system(cmd + ">" + tempOutputFileName);
        return readFile(File(tempOutputFileName));
      }
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
    function getSettings(header, name) {
      if (isAE()) {
        return app.settings.getSetting(header, name);
      } else {
        var prefFile = File(prefsLocation + prefsPrefix + File.encode(header));
        var prefString = readFile(prefFile);
        var pref = JSONify(prefString, "parse");
        return pref[name];
      }
    }
    function haveSettings(header, name) {
      if (isAE()) {
        return app.settings.haveSetting(header, name);
      } else {
        var prefFile = File(prefsLocation + prefsPrefix + File.encode(header));
        var prefString = readFile(prefFile);
        if (prefString != null) {
          var pref = JSONify(prefString.toString(), "parse");
          return name in pref;
        } else {
          return false;
        }
      }
    }
    function saveSettings(header, name, value) {
      if (isAE()) {
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
        pref[name] = value;
        var prettyJSON = "\r";
        createFile(
          File(prefsLocation + prefsPrefix + File.encode(header)),
          JSONify(pref, "stringify", prettyJSON),
          "UTF-8",
          true,
        );
      }
    }
    var licensingVersion = 2.62;
    if (cmd == undefined) {
      cmd = "l";
    }
    var strScriptName = "Credits are Due";
    var strScriptVersion = "1.0";
    var strTrialUrl = "http://aescripts.com/credits-are-due";
    var privateNum = 102079;
    var strHeader = "VNCD";
    var supportEmail = "http://aescripts.com/contact";
    var offerTrial = true;
    var trialLengthDays = 7;
    var trialLengthLaunches = 7;
    var retrieveUrl = "https://aescripts.com/downloadable/customer/products/";
    var exchangeUrl = "https://license.aescripts.com/exchange";
    var useLegacyPrefsHeader = false;
    var betaMode = false;
    var betaExpiration = new Date(2013, 2, 1);
    var licV = 2;
    if ($.os.indexOf("Mac") != -1) {
      var macBase64KeyStr = __BLOB__BLOB_000109__;
      var macPPCKeyStr = "";
    } else {
      var winBase64KeyStr = __BLOB__BLOB_000110__;
    }
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
        "Die Testversion des Skriptes ist leider abgelaufen.\nDu kannst unter " +
        strTrialUrl +
        " eine Lizenz erwerben.\n\nM\xf6chtest Du jetzt dorthin gehen?",
      en:
        "Sorry, this trial version of the script has expired. \nYou can purchase a license at " +
        strTrialUrl +
        "\n\nWould you like to go there now?",
      es:
        "Lo siento, esta versi\xf3n de prueba del script ha expirado.\nPuede obtener una licencia en" +
        strTrialUrl +
        "\n\n\xbfQuiere ir all\xed ahora?",
      fr:
        "D\xe9sol\xe9, la p\xe9riode d\'essai du script a expir\xe9.\nPour acheter une licence, veuillez vous rendre sur la page " +
        strTrialUrl +
        "\n\nVoulez-vous ouvrir cette page maintenant ?",
    });
    var strBetaExpiredAlert = localize({
      de: "Die Betaversion des Skriptes ist leider abgelaufen",
      en: "Sorry, this beta version of the script has expired",
      es: "Lo siento est\xe1 versi\xf3n beta del script ha expirado",
      fr: "D\xe9sol\xe9, la p\xe9riode beta du script a expir\xe9",
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
    var strRegSuccess = localize({
      de: "Registrierung erfolgreich f\xfcr %u\n",
      en: "Registration successful for %u\n",
      es: "Registro completado al %u\n",
      fr: "Enregistrement r\xe9ussi pour %u\n",
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
      de: "%E Tage \xfcbrig f\xfcr die Testversion",
      en: "%E days left in the trial",
      es: "%E d\xedas de prueba restantes",
      fr: "Il vous reste %E jours d\'essai",
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
    var strRetrieveLic = localize({
      de: "Lizenz vergessen?",
      en: "Retrieve License",
      es: "Recuperar licencia",
      fr: "Retrouver votre Licence",
    });
    var strPpcNotSupported = localize({
      de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
      en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
      es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
      fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
    });
    var strErrScriptAccess = localize({
      de: 'Dieses Skript ben\xf6tigt die Erlaubnis Dateien zu schreiben.\n Gehe in Voreinstellungen von After Effects in die Rubrik "Allgemein" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
      en: 'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
      es: 'Este script necesita poder escribir archivos.\nVaya al panel "General" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
      fr: 'Ce script n\xe9cessite les droits d\'\xe9criture de fichiers.\nAllez dans le panneau "G\xe9n\xe9ral" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
    });
    var strUpdateLicenseHeader = localize({
      de: strScriptName + " Lizenz-Update ben\xf6tigt",
      en: strScriptName + " License Update Required",
      es: strScriptName + " necesita actualizar la licencia",
      fr: "La licence de " + strScriptName + " doit \xeatre mise \xe0 jour",
    });
    var strWebWarning = localize({
      de: "Alle Deine Lizenzen findest Du unter \'My Licenses & Downloads\' in Deinem aescripts.com Benutzer-Account.\n\nBenutzer-Accounts sind Teil des neuen aescripts.com.  Wenn Du noch keinen Account erzeugt hast, erzeuge einen neuen Account mit der selben Email-Adresse, die Du f\xfcr Deine bisherigen K\xe4ufe verwendet hast. Diese weden dann automatisch importiert.\n\nWillst Du jetzt dorthin gehen?",
      en: "All your licenses are in the \'My Licenses & Downloads\' section of your aescripts.com user account.\n\nUser accounts are part of the new aescripts.com.  If you have not created an account yet, create a new account using the same email address you used for the original purchase and your order history will be imported.\n\nWould you like to go there now?",
      es: "Todas sus licencias est\xe1n en la secci\xf3n \'My Licenses & Downloads\' de su cuenta de usuario en aescripts.com.\n\nLas cuentas de usuario son parte del nuevo aescripts.com. Si no ha creado una cuenta a\xfan, cree una nueva utilizando el mismo correo electr\xf3nico usado para la compra original y su historial de compras ser\xe1 importado.\n\n\xbfQuiere ir all\xed ahora?",
      fr: "Toutes vos licences se trouvent dans la section \'My Licenses & Downloads\' de votre compte utilisateur sur aescripts.com.\n\nLes comptes d\'utilisateurs font partie de la nouvelle version de aescripts.com. Si vous n\'avez pas encore cr\xe9\xe9 de compte, cr\xe9ez un nouveau compte en utilisant la m\xeame adresse email que vous avez utilis\xe9e pour l\'achat initial et l\'historique des commandes sera import\xe9.\n\nVoulez-vous y aller maintenant?",
    });
    var strOldLicenseFormat = localize({
      de: "Die Lizenz sollte so aussehen:\n\nFirstname**Lastname**111111111SUL",
      en: "License should look like this:\n\nFirstname**Lastname**111111111SUL",
      es: "La licencia debe tener este aspecto:\nNombre**Apellido**111111111SUL",
      fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPr\xe9nom**Nom**111111111SUL",
    });
    var strNewLicenseFormat = localize({
      de: "Die Lizenz sollte so aussehen:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      en: "License should look like this:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      es: "La licencia debe tener este aspecto:\nPRODUCTID*NOMBRE*APELLIDO*1111111SUL1",
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
        "\nund f\xfcge einen Screenshot der Fehlermeldung bei\n\n",
      en:
        "There was an unexpected error\nPlease please open a support ticket here:\n" +
        supportEmail +
        "\nand submit screenshot of this error message\n\n",
      es:
        "Se ha producido un error desconocido\nPor favor habra un ticket de soporte aqui:\n" +
        supportEmail +
        "\ny presente una captura de pantalla con este mensaje de error\n\n",
      fr:
        "Une erreur vient de se produire \nVeuillez ouvrir un ticket de service client \xe0 cette adresse:\n" +
        supportEmail +
        "\net n\'oubliez pas d\'y joindre une capture d\'\xe9cran de ce message\n\n",
    });
    var strWrongProduct = localize({
      de: "Dieser Lizenz-Code ist f\xfcr ein anderes Produkt, bitte stelle sicher, dass du den richtigen Lizenzcode eingibst\n\n",
      en: "This license code is for a different product, please double check that you are entering the correct license\n\n",
      es: "Este c\xf3digo de licencia es para un producto diferente, por favor, comprobar que esta introduciendo la licencia correcta\n\n",
      fr: "Vous venez d\'entrer la cl\xe9 de licence d\'un autre produit, assurez-vous d\'utiliser la bonne cl\xe9 de licence\n\n",
    });
    var prefsSectionName = "aescripts";
    var prefsName = useLegacyPrefsHeader
      ? strScriptName
      : strHeader + "_Registration";
    var prefsVersionName = useLegacyPrefsHeader
      ? strScriptName
      : strHeader + "_Version";
    var prefsLicVersion = useLegacyPrefsHeader
      ? strScriptName
      : strHeader + "_LicVersion";
    if ($.os.indexOf("Mac") != -1) {
      cmdKey = "\u2318";
    } else {
      cmdKey = "Ctrl";
    }
    var strTrialWelcomeMsg = localize({
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
          "+V essayez " +
          parseFloat(app.version) >=
        10
          ? "Clique droit et Coller)"
          : "Edition->Coller)",
    });
    var strTrialInstructMsg = localize({
      de: 'Um die Testversion zu starten, gebe "trial" ein.',
      en: "To run in trial mode type: trial\n",
      es: "Para ejecutar el modo Trial, escriba: trial\n",
      fr: "Pour lancer la version de d\xe9monstration, tapez : trial\n",
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
    var prefsLocation = Folder.userData.fsName + "/Aescripts/";
    var prefsPrefix = "pref_";
    if (!isAE() && !Folder(prefsLocation).exists) {
      Folder(prefsLocation).create();
    }
    if (isAE() && !isSecurityPrefSet()) {
      alert(strErrScriptAccess);
      app.executeCommand(2359);
      if (!isSecurityPrefSet()) {
        return;
      }
    }
    if (betaMode && checkBeta(betaExpiration)) {
      if (cmd == "l") {
        alert(strBetaExpiredAlert);
      }
      return;
    }
    if (cmd == "l" || cmd == "c") {
      if (haveSettings(prefsSectionName, prefsName)) {
        myReg = getSettings(prefsSectionName, prefsName);
        if (
          cmd != "c" &&
          (myReg == "bad" ||
            base64Decode(myReg) == "bad" ||
            (offerTrial && base64Decode(myReg) == "trial"))
        ) {
          doPrompt = true;
        } else {
          doPrompt = false;
        }
        theLicense = checkCode(doPrompt, myReg, privateNum);
      } else {
        if (cmd == "c") {
          myReg = offerTrial ? "trial" : "";
          saveSettings(prefsSectionName, prefsName, base64Encode(myReg));
          saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
          saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
          doPrompt = false;
        } else {
          doPrompt = true;
        }
        theLicense = checkCode(doPrompt, myReg, privateNum);
      }
      return theLicense;
    } else {
      if (haveSettings(prefsSectionName, prefsName)) {
        myReg = base64Decode(getSettings(prefsSectionName, prefsName));
        theRegistration = parseRegistration(myReg, cmd);
      } else {
        theRegistration = offerTrial
          ? parseRegistration("trial", cmd)
          : parseRegistration("", cmd);
      }
      return cmd == "p"
        ? strRegistration
        : "" + (cmd == "v") && theRegistration.match("Trial")
          ? "trial"
          : theRegistration;
    }
    return theLicense;
  }
  function JSONify(string, mode, prettyJSON) {
    if (typeof JSON !== "object") {
      JSON = {};
    }
    (function () {
      function f(n) {
        return n < 10 ? "0" + n : n;
      }
      function quote(string) {
        escapable.lastIndex = 0;
        return escapable.test(string)
          ? '"' +
              string.replace(escapable, function (a) {
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
      if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function (key) {
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
        String.prototype.toJSON =
          Number.prototype.toJSON =
          Boolean.prototype.toJSON =
            function (key) {
              return this.valueOf();
            };
      }
      var cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var escapable =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      };
      if (typeof JSON.stringify !== "function") {
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
          cx.lastIndex = 0;
          if (cx.test(text)) {
            text = text.replace(cx, function (a) {
              return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            });
          }
          if (
            /^[\],:{}\s]*$/.test(
              text
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]",
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
            )
          ) {
            j = eval("(" + text + ")");
            return typeof reviver === "function" ? walk({ "": j }, "") : j;
          }
          throw new SyntaxError("JSON.parse");
        };
      }
    })();
    switch (mode) {
      case "parse":
        return JSON.parse(string);
        break;
      case "stringify":
        return JSON.stringify(string, undefined, prettyJSON);
        break;
    }
  }
  if (f4Gd()) {
    function getUserDataFolder() {
      var userDataFolder = Folder.userData;
      var aescriptsFolder = Folder(
        userDataFolder.toString() + "/Aescripts/CreditsAreDue",
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
    function createResourceFile(filename, binaryString, resourceFolder) {
      var myFile = new File(resourceFolder + "/" + filename);
      if (!File(myFile).exists) {
        if (!isSecurityPrefSet()) {
          alert(
            'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
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
    function isSecurityPrefSet() {
      var securitySetting = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return securitySetting == 1;
    }
    function vn_fromZL_createPalette(thisObj) {
      var win =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", "Credits Are Due", undefined, {
              resizeable: true,
            });
      buttonSize = [36, 36, 5];
      win.mainGrp = win.add("group");
      vn_fromZL_makeButtonArray(win);
      win.size = [
        buttonSize[0] * win.mainGrp.children.length +
          buttonSize[2] * (win.mainGrp.children.length - 1),
        buttonSize[1],
      ];
      win.onResize = win.onResizing = function () {
        buttonSize = [36, 36, 5];
        if (win.size.width < buttonSize[0]) {
          win.size.width = buttonSize[0];
        }
        if (win.size.height < buttonSize[1]) {
          win.size.height = buttonSize[1];
        }
        vn_fromZL_adjustButtons(win, win.mainGrp.children, buttonSize);
      };
      if (win instanceof Window) {
        win.show();
        vn_fromZL_adjustButtons(win, win.mainGrp.children, buttonSize);
      } else {
        win.layout.layout(true);
      }
    }
    function vn_fromZL_makeButtonArray(win) {
      for (var i = win.mainGrp.children.length - 1; i >= 0; i--) {
        win.mainGrp.remove(0);
      }
      var buttonScroller = win.mainGrp.add(
        "iconbutton",
        undefined,
        scrollIcon,
        "Create Scroller",
      );
      buttonScroller.preferredSize = [36, 36];
      buttonScroller.helpTip = "Add a new credit scroll template to your comp";
      buttonScroller.name = "Create Scroll Template";
      buttonScroller.onClick = function () {
        vn_createScroller();
      };
      var buttonTrim = win.mainGrp.add(
        "iconbutton",
        undefined,
        trimIcon,
        "Trim",
      );
      buttonTrim.preferredSize = [36, 36];
      buttonTrim.helpTip =
        "Trim selected layer duration to match on-screen visibility";
      buttonTrim.name = "Trim";
      buttonTrim.onClick = function () {
        vn_trimText();
      };
      var buttonHeader = win.mainGrp.add(
        "iconbutton",
        undefined,
        headerIcon,
        "Header",
      );
      buttonHeader.preferredSize = [36, 36];
      buttonHeader.helpTip =
        "Create new header layer or format selected layer as header";
      buttonHeader.name = "Header";
      buttonHeader.onClick = function () {
        vn_selectEltType(1, vn_header);
      };
      var buttonSubhead = win.mainGrp.add(
        "iconbutton",
        undefined,
        subheadIcon,
        "Subhead",
      );
      buttonSubhead.preferredSize = [36, 36];
      buttonSubhead.helpTip =
        "Create new header layer or format selected layer as subhead";
      buttonSubhead.name = "Subhead";
      buttonSubhead.onClick = function () {
        vn_selectEltType(4, vn_subhead);
      };
      var buttonBodyText = win.mainGrp.add(
        "iconbutton",
        undefined,
        bodyIcon,
        "Body Text",
      );
      buttonBodyText.preferredSize = [36, 36];
      buttonBodyText.helpTip =
        "Create new body text layer or format selected layer as body text";
      buttonBodyText.name = "Body Text";
      buttonBodyText.onClick = function () {
        vn_selectEltType(10, vn_bodytext);
      };
      var buttonLeftCol = win.mainGrp.add(
        "iconbutton",
        undefined,
        lColIcon,
        "Left Col",
      );
      buttonLeftCol.preferredSize = [36, 36];
      buttonLeftCol.helpTip =
        "Create new left column layer or format selected layer as left column";
      buttonLeftCol.name = "Left Column";
      buttonLeftCol.onClick = function () {
        vn_selectEltType(14, vn_leftCol);
      };
      var buttonRightCol = win.mainGrp.add(
        "iconbutton",
        undefined,
        rColIcon,
        "Right Col",
      );
      buttonRightCol.preferredSize = [36, 36];
      buttonRightCol.helpTip =
        "Create new right column layer or format selected layer as right column";
      buttonRightCol.name = "Right Column";
      buttonRightCol.onClick = function () {
        vn_selectEltType(7, vn_rightCol);
      };
      var buttonMulticolumn = win.mainGrp.add(
        "iconbutton",
        undefined,
        multicolIcon,
        "Multicolumn",
      );
      buttonMulticolumn.preferredSize = [36, 36];
      buttonMulticolumn.helpTip =
        "Create multicolumn setup or arrange selected layers as multicolumn group";
      buttonMulticolumn.name = "Multicolumn";
      buttonMulticolumn.onClick = function () {
        vn_selectEltType(5, vn_multiCol);
      };
    }
    function vn_fromZL_adjustButtons(win, buttonArray, buttonSize) {
      var startPoint = [0, 0];
      var offsetAmt = [
        buttonSize[0] + buttonSize[2],
        buttonSize[1] + buttonSize[2],
      ];
      win.mainGrp.bounds = [
        0,
        0,
        win.windowBounds.width,
        win.windowBounds.height,
      ];
      for (var i = 0; i < buttonArray.length; i += 1) {
        buttonArray[i].location = [startPoint[0], startPoint[1]];
        buttonArray[i].size = [buttonSize[0], buttonSize[1]];
        startPoint[0] += offsetAmt[0];
        if (startPoint[0] + buttonSize[0] > win.size[0]) {
          startPoint[0] = 0;
          startPoint[1] += offsetAmt[1];
        }
      }
    }
    function checkTemplate() {
      theComp = app.project.activeItem;
      if (theComp == null || !(theComp instanceof CompItem)) {
        alert("Please select a comp.");
        return false;
      }
      if (!theComp.layer("Scroller")) {
        alert("No scroll template found.");
        return false;
      }
      if (theComp.selectedLayers.length > 0) {
        for (var i = 0, ii = theComp.selectedLayers.length; i < ii; i++) {
          if (theComp.selectedLayers[i].name === "Scroller") {
            alert("Cannot apply settings to Scroller control.");
            return false;
          }
        }
      }
      return true;
    }
    function vn_createCheckboxes(targetLayer) {
      if (!targetLayer.property("ADBE Effect Parade").property("Header")) {
        var headerBox = targetLayer
          .property("ADBE Effect Parade")
          .addProperty("ADBE Checkbox Control");
        headerBox.property("ADBE Checkbox Control-0001").setValue(false);
        headerBox.name = "Header";
      }
      if (!targetLayer.property("ADBE Effect Parade").property("Subhead")) {
        var subheadBox = targetLayer
          .property("ADBE Effect Parade")
          .addProperty("ADBE Checkbox Control");
        subheadBox.property("ADBE Checkbox Control-0001").setValue(false);
        subheadBox.name = "Subhead";
      }
      if (!targetLayer.property("ADBE Effect Parade").property("Subcolumn")) {
        var subcolumnBox = targetLayer
          .property("ADBE Effect Parade")
          .addProperty("ADBE Checkbox Control");
        subcolumnBox.property("ADBE Checkbox Control-0001").setValue(false);
        subcolumnBox.name = "Subcolumn";
      }
    }
    function vn_setScrollPosition(targetLayer) {
      targetLayer.parent = theComp.layer("Scroller");
      targetLayer.transform.position.setValue([0, 0]);
      targetLayer.transform.position.expression =
        'var scroller = thisComp.layer("Scroller");\nposArray = scroller.text.sourceText.split(",");\nxPos = scroller.effect("X Position")("ADBE Slider Control-0001");\nposterizeTime(.00001);\n[xPos,posArray[index - 2]] + value';
    }
    function vn_styleLayer(targetLayer, labelNum, textAlign) {
      targetLayer.label = labelNum;
      if (!(targetLayer instanceof TextLayer)) {
        targetLayer.transform.anchorPoint.setValue([
          targetLayer.width / 2,
          targetLayer.height * 0.15,
        ]);
      }
      if (targetLayer instanceof TextLayer) {
        textProp = targetLayer
          .property("ADBE Text Properties")
          .property("ADBE Text Document");
        var textDocument = textProp.value;
        textProp.setValue(textDocument);
        if (textAlign === "left") {
          textDocument.justification = ParagraphJustification.LEFT_JUSTIFY;
        }
        if (textAlign === "center") {
          textDocument.justification = ParagraphJustification.CENTER_JUSTIFY;
        }
        if (textAlign === "right") {
          textDocument.justification = ParagraphJustification.RIGHT_JUSTIFY;
        }
        textProp.setValue(textDocument);
      }
    }
    function vn_propsPerLayer(selection, labelNum, textAlign, box) {
      for (var i = 0, ii = selection.length; i < ii; ++i) {
        var curLayer = selection[i];
        vn_createCheckboxes(curLayer);
        for (
          var p = 1;
          p <= curLayer.property("ADBE Effect Parade").numProperties;
          p += 1
        ) {
          if (
            curLayer
              .property("ADBE Effect Parade")
              .property(p)
              .property("ADBE Checkbox Control-0001") != undefined
          ) {
            curLayer
              .property("ADBE Effect Parade")
              .property(p)
              .property("ADBE Checkbox Control-0001")
              .setValue(false);
          }
        }
        if (box != undefined) {
          curLayer
            .property("ADBE Effect Parade")
            .property(box)
            .property("ADBE Checkbox Control-0001")
            .setValue(true);
        }
        vn_styleLayer(curLayer, labelNum, textAlign);
        vn_setScrollPosition(curLayer);
      }
    }
    function vn_newTextElt(defaultText) {
      var newElt = theComp.layers.addText(defaultText);
      newElt.moveToEnd();
      return newElt;
    }
    function vn_setSelection() {
      var keyState = ScriptUI.environment.keyboardState;
      var shift = keyState.shiftKey;
      if (shift) {
        var selected = [];
      } else {
        var selected = theComp.selectedLayers;
      }
      return selected;
    }
    function vn_selectEltType(element, callback) {
      var keyState = ScriptUI.environment.keyboardState;
      var control = keyState.ctrlKey || keyState.metaKey;
      if (!control) {
        callback();
      } else {
        var r = checkTemplate();
        if (r === true) {
          for (var i = 1, ii = theComp.numLayers; i <= ii; ++i) {
            var curLayer = theComp.layer(i);
            if (curLayer.label === element) {
              curLayer.selected = true;
            } else {
              curLayer.selected = false;
            }
          }
        }
      }
    }
    function vn_createScroller() {
      theComp = app.project.activeItem;
      if (theComp == null || !(theComp instanceof CompItem)) {
        alert("Please select a comp.");
      } else {
        app.beginUndoGroup("Create credit scroll template");
        var cH = theComp.height;
        var cW = theComp.width;
        var scroller = theComp.layers.addText();
        scroller.name = "Scroller";
        scroller.label = 9;
        scroller.enabled = false;
        var scrollSpeed = scroller
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        scrollSpeed.property("ADBE Slider Control-0001").setValue(3);
        scrollSpeed.name = "Scroll Speed";
        var sectionSpacing = scroller
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        sectionSpacing.property("ADBE Slider Control-0001").setValue(30);
        sectionSpacing.name = "Section Spacing";
        var xPosition = scroller
          .property("ADBE Effect Parade")
          .addProperty("ADBE Slider Control");
        xPosition.property("ADBE Slider Control-0001").setValue(cW / 2);
        xPosition.name = "X Position";
        scroller.text.sourceText.expression =
          'posterizeTime(.000001);\nvar layerArray = [];\nvar spacingSetting = effect("Section Spacing")("ADBE Slider Control-0001");\n\nfor(var i = 1, ii = thisComp.numLayers; i < ii;  i++) {\nvar layerHeight = Math.round(thisComp.layer(i).sourceRectAtTime().height * (thisComp.layer(i).scale[1]/100));\n\n    if (i > 1) {\n        var prevLayerSize = layerArray[layerArray.length -1];\n        var prevLayer = thisComp.layer(i+1);\n        var spacing = spacingSetting;\n        if (prevLayer.effect("Header")("ADBE Checkbox Control-0001") == true) { // Purple (head)\n            spacing = spacing*3;\n        } else {\n            if (prevLayer.effect("Subhead")("ADBE Checkbox Control-0001") == true) { // Pink\n            spacing = spacing*2;\n        }}\n        \n    } else {\n        var prevLayerSize = 0;\n        var spacing = 0;\n        }\n    if (i > 1 && prevLayer.effect("Subcolumn")("ADBE Checkbox Control-0001") == true) {\n        layerArray.push(prevLayerSize); \n        } else {\n        layerArray.push(prevLayerSize + layerHeight + spacing);\n        }\n}\n\nlayerArray;';
        scroller.transform.position.setValue([0, cH * 1.05]);
        scroller.transform.position.expression =
          'rate = effect("Scroll Speed")("ADBE Slider Control-0001"); //value in px/sec.\nif (marker.numKeys > 0){\nif (time > marker.key(1).time){\nvalue - [0,rate*timeToFrames(time-marker.key(1).time)];\n}else{ \nvalue;\n}\n}else{\nvalue - [0,rate*timeToFrames(time-inPoint)];\n}';
        scroller.selected = false;
        app.endUndoGroup();
      }
    }
    function vn_header() {
      var r = checkTemplate();
      if (r === true) {
        app.beginUndoGroup("Set or Create Headers");
        var selection = vn_setSelection();
        if (selection.length === 0) {
          selection.push(vn_newTextElt("Header Text"));
        }
        vn_propsPerLayer(selection, 1, "center", "Header");
        app.endUndoGroup();
      }
    }
    function vn_subhead() {
      var r = checkTemplate();
      if (r === true) {
        app.beginUndoGroup("Set or Create Subheads");
        var selection = vn_setSelection();
        if (selection.length === 0) {
          selection.push(vn_newTextElt("Subhead Text"));
        }
        vn_propsPerLayer(selection, 4, "center", "Subhead");
        app.endUndoGroup();
      }
    }
    function vn_bodytext() {
      var r = checkTemplate();
      if (r === true) {
        app.beginUndoGroup("Set or Create Body Text");
        var selection = vn_setSelection();
        if (selection.length === 0) {
          selection.push(vn_newTextElt("Body Text"));
        }
        vn_propsPerLayer(selection, 10, "center");
        app.endUndoGroup();
      }
    }
    function vn_leftCol() {
      var r = checkTemplate();
      if (r === true) {
        app.beginUndoGroup("Create or Set as Left Column");
        var selection = vn_setSelection();
        if (selection.length === 0) {
          selection.push(vn_newTextElt("Left Column"));
        }
        vn_propsPerLayer(selection, 14, "right");
        for (var i = 0, ii = selection.length; i < ii; ++i) {
          var curLayer = selection[i];
          curLayer.transform.position.setValue([-20, 0]);
        }
        app.endUndoGroup();
      }
    }
    function vn_rightCol() {
      var r = checkTemplate();
      if (r === true) {
        app.beginUndoGroup("Create or Set as Right Column");
        var selection = vn_setSelection();
        if (selection.length === 0) {
          selection.push(vn_newTextElt("Right Column"));
        }
        vn_propsPerLayer(selection, 7, "left", "Subcolumn");
        for (var i = 0, ii = selection.length; i < ii; ++i) {
          var curLayer = selection[i];
          curLayer.transform.position.setValue([20, 0]);
        }
        app.endUndoGroup();
      }
    }
    function vn_multiCol() {
      if (isTrial === true) {
        alert("Sorry, this feature is not available in trial mode.");
        return;
      }
      var r = checkTemplate();
      if (r === true) {
        app.beginUndoGroup("Create or set as Multicolumn");
        var selection = vn_setSelection().sort(function (a, b) {
          return a.index - b.index;
        });
        if (selection.length === 1) {
          alert("Select more than one layer to create a multicolumn set.");
          return;
        }
        if (selection.length === 0) {
          selection.push(vn_newTextElt("Multicolumn A"));
          selection.push(vn_newTextElt("Multicolumn B"));
          selection.push(vn_newTextElt("Multicolumn C"));
        }
        vn_propsPerLayer(selection.slice(0, 1), 5, "center");
        vn_propsPerLayer(selection.slice(1), 5, "center", "Subcolumn");
        for (var i = 0, ii = selection.length; i < ii; ++i) {
          var curLayer = selection[i];
          var compCrop = theComp.width * 0.8;
          var columnPosition = compCrop / selection.length;
          curLayer.transform.position.setValue([
            columnPosition * i - (columnPosition * (selection.length - 1)) / 2,
            0,
          ]);
        }
        app.endUndoGroup();
      }
    }
    function vn_trimText() {
      var r = confirm(
        "This is a slow process. If you selected a lot of layers, you might want to go have a sandwich or something. Continue?",
      );
      if (r == true) {
        var handle = 0.5;
        var frameInc = 10;
        var theComp = app.project.activeItem;
        if (theComp == null || !(theComp instanceof CompItem)) {
          alert("Please select a comp.");
        } else {
          var cH = theComp.height;
          var frameDur = theComp.frameDuration;
          var startCheck = theComp.workAreaStart;
          var compDur = startCheck + theComp.workAreaDuration;
          var selection = theComp.selectedLayers;
          if (selection.length > 0) {
            app.beginUndoGroup("Trim to visible");
            for (var i = 0, ii = selection.length; i < ii; ++i) {
              var curLayer = selection[i];
              if (curLayer.position.isTimeVarying === true) {
                var doOnce = false;
                for (
                  var d = startCheck, dd = compDur;
                  d <= dd;
                  d += frameDur * frameInc
                ) {
                  var framePos =
                    curLayer.position.valueAtTime(d, false) +
                    theComp.layer("Scroller").position.valueAtTime(d, false);
                  if (doOnce === false && framePos[1] < cH) {
                    curLayer.inPoint = d - handle - frameDur * frameInc;
                    doOnce = true;
                  }
                  if (doOnce === true) {
                    var dim = curLayer.sourceRectAtTime(d, false);
                    var layerBottom = framePos[1] + dim.height;
                    if (layerBottom < 0) {
                      curLayer.outPoint = d + handle + frameDur * frameInc;
                      break;
                    }
                  }
                }
              }
            }
            app.endUndoGroup();
          } else {
            alert("Nothing selected!");
          }
        }
      }
    }
    var userDataFolder = getUserDataFolder();
    var b_bodyIcon = [__BLOB__BLOB_000111__];
    var b_subheadIcon = [__BLOB__BLOB_000112__];
    var b_headerIcon = [__BLOB__BLOB_000113__];
    var b_trimIcon = [__BLOB__BLOB_000114__];
    var b_scrollIcon = [__BLOB__BLOB_000115__];
    var b_rColIcon = [__BLOB__BLOB_000116__];
    var b_lColIcon = [__BLOB__BLOB_000117__];
    var b_multicolIcon = [__BLOB__BLOB_000118__];
    var scrollIcon = createResourceFile(
      "new-scroller.png",
      b_scrollIcon,
      userDataFolder,
    );
    var trimIcon = createResourceFile(
      "trim-layers.png",
      b_trimIcon,
      userDataFolder,
    );
    var headerIcon = createResourceFile(
      "header.png",
      b_headerIcon,
      userDataFolder,
    );
    var subheadIcon = createResourceFile(
      "subhead.png",
      b_subheadIcon,
      userDataFolder,
    );
    var bodyIcon = createResourceFile("body.png", b_bodyIcon, userDataFolder);
    var lColIcon = createResourceFile(
      "left-col.png",
      b_lColIcon,
      userDataFolder,
    );
    var rColIcon = createResourceFile(
      "right-col.png",
      b_rColIcon,
      userDataFolder,
    );
    var multicolIcon = createResourceFile(
      "multicol.png",
      b_multicolIcon,
      userDataFolder,
    );
    if (parseFloat(app.version) >= 13.2) {
      vn_fromZL_createPalette(thisObj);
    } else {
      alert(
        "Sorry, Credits Are Due requires After Effects CC2014 (13.2) and up.",
      );
    }
    var theComp = app.project.activeItem;
    var isTrial = f4Gd("v").match(/^t/) ? true : false;
  }
}
vn_CreditsAreDue(this);
