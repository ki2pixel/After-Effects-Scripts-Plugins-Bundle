/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function () {
  function sx2x(cmd) {
    function licUI() {
      var licPal = new Window(
        "dialog",
        strTrialWelcomeHeader + " v" + strScriptVersion,
        undefined,
        { resizeable: true },
      );
      if (licPal != null) {
        var res =
          "group { \n\t\t\t\torientation: \'column\', \n\t\t\t\talignment: [\'fill\',\'fill\'], \n\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\tinfoGrp: Group { \n\t\t\t\t\talignment: [\'fill\',\'top\'], \n\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\torientation: \'column\', \n\t\t\t\t\t\thdrGrp: Group {\n\t\t\t\t\t\t\ttxt: StaticText {}, \n\t\t\t\t\t\t\tpaste: StaticText {}, \n\t\t\t\t\t\t}\n\t\t\t\t\t\ttrial: StaticText {}, \n\t\t\t\t\t} \n\t\t\t\t\tlicGrp: Group { \n\t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \n\t\t\t\t\t} \n\t\t\t\t\tokGrp: Group { \n\t\t\t\t\talignment: [\'fill\',\'bottom\'], \n\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\t\tretrieveReg: Button {text:\'" +
          strRetrieveLic +
          "\',  alignment: [\'left\',\'center\'],preferredSize:[150,30]}\n\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \n\t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \n\t\t\t\t\t} \n\t\t\t\t}";
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
          betaMode || !offerTrial ? "" : "SMAPG*MONTER*GROUP\xa9*1902203SUL9";
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
      if (!offerTrial) {
        trialExpired = true;
        return trialExpired;
      }
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
          parseInt(getSettings(prefHeader, prefSection2), 16) / 1000000000000,
        );
        if (mode != "balance" && cmd == "l") {
          saveSettings(
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
    function checkBeta(betaExpiration) {
      return new Date() > betaExpiration;
    }
    function updateLicenseUI(reg) {
      var updPal = new Window("dialog", strUpdateLicenseHeader, undefined, {
        resizeable: false,
      });
      if (updPal != null) {
        var res =
          "group { \n\t\t\t\torientation: \'column\', \n\t\t\t\talignment: [\'fill\',\'fill\'], \n\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t   infoGrp: Group { \n\t\t\t\t   alignment: [\'fill\',\'top\'], \n\t\t\t\t   alignChildren: [\'fill\',\'fill\'], \n\t\t\t\t   orientation: \'column\', \n\t\t\t\t\t  hdr: StaticText {}, \n\t\t\t\t\t  info: StaticText {preferredSize:[800,40], properties:{multiline:true}}, \n\t\t\t\t\t  url: StaticText {}, \n\t\t\t\t\t} \n\t\t\t\t\tokGrp: Group { \n\t\t\t\t\talignment: [\'fill\',\'bottom\'], \n\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \n\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \n\t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \n\t\t\t\t\t} \n\t\t\t\t}";
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
        $.os.indexOf("Win") != -1
          ? Folder.temp.fsName
          : Folder.temp.absoluteURI +
            "/" +
            Math.round(Math.random() * new Date().getTime() * 37915);
      if ($.os.indexOf("Win") != -1) {
        base64IconStr = winBase64KeyStr;
        tempExeFileName += ".exe";
      } else {
        var getMacProcessor = systemCall("arch");
        if (getMacProcessor.toLowerCase().match(/ppc/)) {
          alert(strPpcNotSupported);
          return false;
        }
        base64IconStr = macBase64KeyStr;
      }
      var newExe = createFile(File(tempExeFileName), base64IconStr, "BINARY");
      newExe.hidden = true;
      if ($.os.indexOf("Mac") != -1) {
        systemCall("chmod 757 " + newExe.absoluteURI);
      }
      var cmd =
        '"' + $.os.indexOf("Win") != -1
          ? newExe.fsName
          : newExe.absoluteURI + '" ' + lic + " " + privateNum;
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
        if (file.exists) {
          file.remove();
        }
        file =
          $.os.indexOf("Win") != -1
            ? new File(file.fsName)
            : new File(file.absoluteURI);
        file.encoding = encoding;
        file.open("w");
        file.write(encodedStr);
        file.close();
        file.hidden = true;
        if ($.os.indexOf("Mac") != -1) {
          systemCall("chmod 757 " + file.absoluteURI);
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
          $.os.indexOf("Win") != -1
            ? Folder.temp.fsName
            : Folder.temp.absoluteURI +
              "/" +
              Math.round(Math.random() * new Date().getTime() * 21876);
        app.system(cmd + ">" + tempOutputFileName);
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
    function getSettings(header, name) {
      if (isAE() && cmd != "settings") {
        return app.settings.getSetting(header, name);
      } else {
        var prefFile = File(prefsLocation + prefsPrefix + File.encode(header));
        var prefString = readFile(prefFile);
        var pref = JSONify(prefString, "parse");
        return pref[name];
      }
    }
    function haveSettings(header, name) {
      if (isAE() && cmd != "settings") {
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
      if (isAE() && cmd != "settings") {
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
        var prettyJSON = "\t";
        createFile(
          File(prefsLocation + prefsPrefix + File.encode(header)),
          JSONify(pref, "stringify", prettyJSON),
          "UTF-8",
          true,
        );
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
      switch (mode) {
        case "parse":
          return jsonParse(string);
          break;
        case "stringify":
          return JSON.stringify(string, undefined, prettyJSON);
          break;
      }
    }
    var licensingVersion = 2.74;
    if (cmd == undefined) {
      cmd = "l";
    }
    var strScriptName = "Anchor Point Gravity";
    var strScriptVersion = "1.0";
    var strTrialUrl = "http://aescripts.com/anchor-point-gravity/";
    var privateNum = 766778;
    var strHeader = "SMAPG";
    var supportEmail = "http://aescripts.com/contact";
    var offerTrial = true;
    var trialLengthDays = 7;
    var trialLengthLaunches = 7;
    var retrieveUrl = "https://aescripts.com/downloadable/customer/products/";
    var exchangeUrl = "https://license.aescripts.com/exchange";
    var useLegacyPrefsHeader = false;
    var betaMode = false;
    var betaExpirationDate = new Date("Dec 1, 2016");
    var licV = 2;
    if ($.os.indexOf("Mac") != -1) {
      var macBase64KeyStr = __BLOB__BLOB_000086__;
    } else {
      var winBase64KeyStr = __BLOB__BLOB_000087__;
    }
    $.locale = app.isoLanguage;
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
    this.getSetting = function (header, name) {
      header = strHeader + "_" + header;
      return getSettings(header, name);
    };
    this.haveSetting = function (header, name) {
      header = strHeader + "_" + header;
      return haveSettings(header, name);
    };
    this.saveSetting = function (header, name, value) {
      header = strHeader + "_" + header;
      return saveSettings(header, name, value);
    };
    if (isAE() && !isSecurityPrefSet()) {
      alert(strErrScriptAccess);
      app.executeCommand(2359);
      if (!isSecurityPrefSet()) {
        return;
      }
    }
    if (betaMode && checkBeta(betaExpirationDate)) {
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
  function AnchorUI(thisObj) {
    var UI_MARGINS = 1;
    var MAXIMUM_SIZE = 20;
    var ARROW_ICON = [
      __BLOB__BLOB_000088__,
      __BLOB__BLOB_000089__,
      __BLOB__BLOB_000090__,
      __BLOB__BLOB_000091__,
      __BLOB__BLOB_000092__,
      __BLOB__BLOB_000093__,
      __BLOB__BLOB_000094__,
      __BLOB__BLOB_000095__,
    ];
    var POINT_ICON = __BLOB__BLOB_000096__;
    if (thisObj instanceof Panel) {
      anchorWindow = thisObj;
    } else {
      anchorWindow = new Window("palette", "Anchor Point Gravity", undefined, {
        resizeable: true,
      });
    }
    var initGroupOption = function (grp) {
      grp.alignment = ["fill", "top"];
      grp.spacing = UI_MARGINS;
      grp.margins = [0, 0, 0, 0];
    };
    var initButtonPartsOption = function (guiParts) {
      guiParts.alignment = ["left", "top"];
      guiParts.minimumSize = [MAXIMUM_SIZE, MAXIMUM_SIZE];
      guiParts.maximumSize = [30, MAXIMUM_SIZE];
    };
    var initGUIPartsOption = function (guiParts) {
      guiParts.alignment = ["fill", "top"];
      guiParts.minimumSize = [MAXIMUM_SIZE, MAXIMUM_SIZE];
      guiParts.maximumSize = [5000, MAXIMUM_SIZE];
    };
    var mainGrp = anchorWindow.add("group");
    mainGrp.alignChildren = ["fill", "fill"];
    mainGrp.orientation = "column";
    initGroupOption(mainGrp);
    var topAnchorGrp = mainGrp.add("group");
    initGroupOption(topAnchorGrp);
    var topLeftBtn = topAnchorGrp.add("iconbutton", undefined, ARROW_ICON[0], {
      style: "toolbutton",
    });
    initButtonPartsOption(topLeftBtn);
    topLeftBtn.helpTip = "Top Left";
    var topCenterBtn = topAnchorGrp.add(
      "iconbutton",
      undefined,
      ARROW_ICON[1],
      { style: "toolbutton" },
    );
    initButtonPartsOption(topCenterBtn);
    topCenterBtn.helpTip = "Top Center";
    var topRightBtn = topAnchorGrp.add("iconbutton", undefined, ARROW_ICON[2], {
      style: "toolbutton",
    });
    initButtonPartsOption(topRightBtn);
    topRightBtn.helpTip = "Top Right";
    var middleAnchorGrp = mainGrp.add("group");
    initGroupOption(middleAnchorGrp);
    var middleLeftBtn = middleAnchorGrp.add(
      "iconbutton",
      undefined,
      ARROW_ICON[3],
      { style: "toolbutton" },
    );
    initButtonPartsOption(middleLeftBtn);
    middleLeftBtn.helpTip = "Middle Left";
    var middleCenterBtn = middleAnchorGrp.add(
      "iconbutton",
      undefined,
      POINT_ICON,
      { style: "toolbutton" },
    );
    initButtonPartsOption(middleCenterBtn);
    middleCenterBtn.helpTip = "Middle Center";
    var middleRightBtn = middleAnchorGrp.add(
      "iconbutton",
      undefined,
      ARROW_ICON[4],
      { style: "toolbutton" },
    );
    initButtonPartsOption(middleRightBtn);
    middleRightBtn.helpTip = "Middle Right";
    var bottomAnchorGrp = mainGrp.add("group");
    initGroupOption(bottomAnchorGrp);
    var bottomLeftBtn = bottomAnchorGrp.add(
      "iconbutton",
      undefined,
      ARROW_ICON[5],
      { style: "toolbutton" },
    );
    initButtonPartsOption(bottomLeftBtn);
    bottomLeftBtn.helpTip = "Bottom Left";
    var bottomCenterBtn = bottomAnchorGrp.add(
      "iconbutton",
      undefined,
      ARROW_ICON[6],
      { style: "toolbutton" },
    );
    initButtonPartsOption(bottomCenterBtn);
    bottomCenterBtn.helpTip = "Bottom Center";
    var bottomRightBtn = bottomAnchorGrp.add(
      "iconbutton",
      undefined,
      ARROW_ICON[7],
      { style: "toolbutton" },
    );
    initButtonPartsOption(bottomRightBtn);
    bottomRightBtn.helpTip = "Bottom Right";
    var panel1 = topAnchorGrp.add("panel");
    panel1.alignment = ["fill", "top"];
    panel1.minimumSize = [UI_MARGINS, MAXIMUM_SIZE];
    panel1.maximumSize = [UI_MARGINS, MAXIMUM_SIZE];
    var depthFrontBtn = topAnchorGrp.add("iconbutton", undefined, undefined, {
      style: "button",
    });
    depthFrontBtn.alignment = ["fill", "top"];
    depthFrontBtn.minimumSize = [MAXIMUM_SIZE, MAXIMUM_SIZE];
    depthFrontBtn.maximumSize = [5000, MAXIMUM_SIZE];
    depthFrontBtn.helpTip = FRONT;
    depthFrontBtn.text = FRONT;
    var panel2 = middleAnchorGrp.add("panel");
    panel2.alignment = ["fill", "top"];
    panel2.minimumSize = [UI_MARGINS, MAXIMUM_SIZE];
    panel2.maximumSize = [UI_MARGINS, MAXIMUM_SIZE];
    var depthCenterBtn = middleAnchorGrp.add(
      "iconbutton",
      undefined,
      undefined,
      { style: "button" },
    );
    depthCenterBtn.alignment = ["fill", "top"];
    depthCenterBtn.minimumSize = [MAXIMUM_SIZE, MAXIMUM_SIZE];
    depthCenterBtn.maximumSize = [5000, MAXIMUM_SIZE];
    depthCenterBtn.helpTip = CENTER;
    depthCenterBtn.text = CENTER;
    var panel3 = bottomAnchorGrp.add("panel");
    panel3.alignment = ["fill", "top"];
    panel3.minimumSize = [UI_MARGINS, MAXIMUM_SIZE];
    panel3.maximumSize = [UI_MARGINS, MAXIMUM_SIZE];
    var depthBackBtn = bottomAnchorGrp.add("iconbutton", undefined, undefined, {
      style: "button",
    });
    depthBackBtn.alignment = ["fill", "top"];
    depthBackBtn.minimumSize = [MAXIMUM_SIZE, MAXIMUM_SIZE];
    depthBackBtn.maximumSize = [5000, MAXIMUM_SIZE];
    depthBackBtn.helpTip = BACK;
    depthBackBtn.text = BACK;
    var panel4 = mainGrp.add("panel");
    panel4.alignment = ["fill", "top"];
    panel4.minimumSize = [MAXIMUM_SIZE, UI_MARGINS];
    panel4.maximumSize = [5000, UI_MARGINS];
    var targetGrp0 = mainGrp.add("group");
    initGroupOption(targetGrp0);
    var moveTargetText = getLocalizedText({
      en: ["Anchor Point", "Position", "-", "Gravity"],
      jp: [
        "\u30a2\u30f3\u30ab\u30fc\u30dd\u30a4\u30f3\u30c8",
        "\u4f4d\u7f6e",
        "-",
        "\u91cd\u5fc3",
      ],
    });
    var moveTargetDdl = targetGrp0.add(
      "dropdownlist",
      undefined,
      moveTargetText,
    );
    initGUIPartsOption(moveTargetDdl);
    moveTargetDdl.selection = 0;
    moveTargetDdl.helpTip = getLocalizedText({
      en: "Target",
      jp: "\u79fb\u52d5\u3059\u308b\u5bfe\u8c61",
    });
    var optionGrp1 = mainGrp.add("group");
    initGroupOption(optionGrp1);
    var depthCb = optionGrp1.add(
      "checkbox",
      undefined,
      getLocalizedText({ en: "Depth", jp: "\u62bc\u3057\u51fa\u3057" }),
    );
    initGUIPartsOption(depthCb);
    depthCb.value = true;
    depthCb.helpTip = getLocalizedText({
      en: "Calculate depth",
      jp: "\u62bc\u3057\u51fa\u3057\u3092\u8003\u616e\u3059\u308b",
    });
    var extentsCheck = optionGrp1.add(
      "checkbox",
      undefined,
      getLocalizedText({
        en: "Extents",
        jp: "\u30a8\u30af\u30b9\u30c6\u30f3\u30c8",
      }),
    );
    initGUIPartsOption(extentsCheck);
    extentsCheck.value = true;
    extentsCheck.helpTip = getLocalizedText({
      en: "Calculate extents",
      jp: "\u30a8\u30af\u30b9\u30c6\u30f3\u30c8\u3092\u8003\u616e\u3059\u308b",
    });
    var optionGrp2 = mainGrp.add("group");
    initGroupOption(optionGrp2);
    var wheelCb = optionGrp2.add(
      "checkbox",
      undefined,
      getLocalizedText({
        en: "Rotate child layer",
        jp: "\u5b50\u3092\u56de\u8ee2\u3055\u305b\u308b",
      }),
    );
    initGUIPartsOption(wheelCb);
    wheelCb.value = true;
    wheelCb.helpTip = getLocalizedText({
      en: "Rotate child layer",
      jp: "\u5b50\u3092\u56de\u8ee2\u3055\u305b\u308b",
    });
    var helpBtn = optionGrp2.add("button", undefined, "?");
    helpBtn.alignment = ["right", "top"];
    helpBtn.minimumSize = [MAXIMUM_SIZE, MAXIMUM_SIZE];
    helpBtn.maximumSize = [25, MAXIMUM_SIZE];
    anchorWindow.margins = [1, 1, 1, 1];
    anchorWindow.spacing = 0;
    anchorWindow.layout.layout(true);
    anchorWindow.layout.resize();
    anchorWindow.onResizing = anchorWindow.onResize = function () {
      this.layout.resize();
    };
    var calcAnchorPosition = function (iBtn, rect) {
      var anchor = [0, 0, 0];
      switch (iBtn.getAnchorPoint()) {
        case AnchorPosition.TOP_LEFT:
          anchor = [rect.left, rect.top];
          break;
        case AnchorPosition.TOP_CENTER:
          anchor = [rect.width / 2 + rect.left, rect.top];
          break;
        case AnchorPosition.TOP_RIGHT:
          anchor = [rect.left + rect.width, rect.top];
          break;
        case AnchorPosition.MIDDLE_LEFT:
          anchor = [rect.left, rect.height / 2 + rect.top];
          break;
        case AnchorPosition.MIDDLE_CENTER:
          anchor = [rect.width / 2 + rect.left, rect.height / 2 + rect.top];
          break;
        case AnchorPosition.MIDDLE_RIGHT:
          anchor = [rect.left + rect.width, rect.height / 2 + rect.top];
          break;
        case AnchorPosition.BOTTOM_LEFT:
          anchor = [rect.left, rect.top + rect.height];
          break;
        case AnchorPosition.BOTTOM_CENTER:
          anchor = [rect.width / 2 + rect.left, rect.top + rect.height];
          break;
        case AnchorPosition.BOTTOM_RIGHT:
          anchor = [rect.left + rect.width, rect.top + rect.height];
          break;
      }
      return anchor;
    };
    var setAnchorPoint = function (iconBtn) {
      var actComp = app.project.activeItem;
      if (!isCompActive(actComp)) {
        return 0;
      }
      var selLayers = actComp.selectedLayers;
      if (!isLayerSelected(selLayers)) {
        return 0;
      }
      var iBtn = new AnchorClass(iconBtn);
      var isSeparatedDimention = false;
      var movePosition = [];
      var sourceRect = {
        height: Number.MIN_VALUE,
        left: Number.MAX_VALUE,
        top: Number.MAX_VALUE,
        width: Number.MIN_VALUE,
      };
      var anchorResult = [0, 0, 0];
      var depth = 0;
      for (var _i = 0, selLayers_1 = selLayers; _i < selLayers_1.length; _i++) {
        var curLayer = selLayers_1[_i];
        if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
          sourceRect = curLayer.sourceRectAtTime(
            actComp.time,
            extentsCheck.value,
          );
        }
        if (depthCb.value) {
          depth =
            curLayer
              .property(ADBE_Extrsn_Options_Group)
              .property(ADBE_Extrsn_Depth).value / 2;
        }
        anchorResult = calcAnchorPosition(iBtn, sourceRect);
        anchorResult[2] = depth;
        anc = curLayer
          .property(ADBE_Transform_Group)
          .property(ADBE_Anchor_Point);
        pos = curLayer.property(ADBE_Transform_Group).property(ADBE_Position);
        if (pos.isSeparationLeader) {
          isSeparatedDimention = pos.dimensionsSeparated;
          pos.dimensionsSeparated = false;
        }
        movePosition = [
          anc.value[0] - anchorResult[0],
          anc.value[1] - anchorResult[1],
          anc.value[2],
        ];
        dupLayer = curLayer.duplicate();
        originalParentLayer = curLayer.parent;
        curLayer.parent = dupLayer;
        setValueAtSmart(anc, actComp, anchorResult);
        if (moveTargetDdl.selection == 0) {
          setValueAtSmart(pos, actComp, [
            pos.value[0] - movePosition[0],
            pos.value[1] - movePosition[1],
            pos.value[2] - movePosition[2] + depth,
          ]);
        }
        if (pos.isSeparationLeader) {
          pos.dimensionsSeparated = isSeparatedDimention;
        }
        curLayer.parent = originalParentLayer;
        dupLayer.remove();
      }
      return 0;
    };
    var setAnchorPointUndo = function (iconBtn) {
      app.beginUndoGroup("Anchor Point Gravity");
      setAnchorPoint(iconBtn);
      app.endUndoGroup();
    };
    var calcDepth = function (iBtn, layer) {
      var depth = 0;
      switch (iBtn.getBtn().helpTip) {
        case FRONT:
          depth = 0;
          break;
        case CENTER:
          depth =
            layer
              .property(ADBE_Extrsn_Options_Group)
              .property(ADBE_Extrsn_Depth).value / 2;
          break;
        case BACK:
          depth = layer
            .property(ADBE_Extrsn_Options_Group)
            .property(ADBE_Extrsn_Depth).value;
          break;
      }
      return depth;
    };
    var setDepth = function (iconBtn) {
      var actComp = app.project.activeItem;
      if (!isCompActive(actComp)) {
        return 0;
      }
      var selLayers = actComp.selectedLayers;
      if (!isLayerSelected(selLayers)) {
        return 0;
      }
      var iBtn = new AnchorClass(iconBtn);
      var isSeparatedDimention = false;
      var depth = 0;
      for (var _i = 0, selLayers_2 = selLayers; _i < selLayers_2.length; _i++) {
        var curLayer = selLayers_2[_i];
        anc = curLayer
          .property(ADBE_Transform_Group)
          .property(ADBE_Anchor_Point);
        pos = curLayer.property(ADBE_Transform_Group).property(ADBE_Position);
        depth = calcDepth(iBtn, curLayer);
        if (pos.isSeparationLeader) {
          isSeparatedDimention = pos.dimensionsSeparated;
          pos.dimensionsSeparated = false;
        }
        if (moveTargetDdl.selection == 0) {
          setValueAtSmart(pos, actComp, [
            pos.value[0],
            pos.value[1],
            pos.value[2] - anc.value[2] + depth,
          ]);
        }
        setValueAtSmart(anc, actComp, [anc.value[0], anc.value[1], depth]);
        if (pos.isSeparationLeader) {
          pos.dimensionsSeparated = isSeparatedDimention;
        }
      }
      return 0;
    };
    var setDepthUndo = function (iconBtn) {
      app.beginUndoGroup("Anchor Point Gravity");
      setDepth(iconBtn);
      app.endUndoGroup();
    };
    var setGravity = function (iconBtn) {
      var actComp = app.project.activeItem;
      if (!isCompActive(actComp)) {
        return 0;
      }
      var selLayers = actComp.selectedLayers;
      if (!isLayerSelected(selLayers)) {
        return 0;
      }
      var iBtn = new AnchorClass(iconBtn);
      var isSeparatedDimention = false;
      var depth = 0;
      var gravity = [0, 0, 0];
      var min = [Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE];
      var max = [Number.MIN_VALUE, Number.MIN_VALUE, Number.MIN_VALUE];
      for (var _i = 0, selLayers_3 = selLayers; _i < selLayers_3.length; _i++) {
        var curLayer = selLayers_3[_i];
        for (var i = 0; i < gravity.length; i += 1) {
          gravity[i] += curLayer
            .property(ADBE_Transform_Group)
            .property(ADBE_Position).value[i];
          if (
            min[i] >
            curLayer.property(ADBE_Transform_Group).property(ADBE_Position)
              .value[i]
          ) {
            min[i] = curLayer
              .property(ADBE_Transform_Group)
              .property(ADBE_Position).value[i];
          }
          if (
            max[i] <
            curLayer.property(ADBE_Transform_Group).property(ADBE_Position)
              .value[i]
          ) {
            max[i] = curLayer
              .property(ADBE_Transform_Group)
              .property(ADBE_Position).value[i];
          }
        }
      }
      for (var i = 0; i < gravity.length; i += 1) {
        gravity[i] /= selLayers.length;
      }
      if (!depthCb.value) {
        gravity[Dimension.Z] = 0;
      }
      var addedNull = actComp.layers.addNull(actComp.duration);
      addedNull.threeDLayer = true;
      addedNull.name = "Gravity";
      switch (iBtn.getAnchorPoint()) {
        case AnchorPosition.TOP_LEFT:
          gravity = min;
          break;
        case AnchorPosition.TOP_CENTER:
          gravity = [
            gravity[Dimension.X],
            min[Dimension.Y],
            gravity[Dimension.Z],
          ];
          break;
        case AnchorPosition.TOP_RIGHT:
          gravity = [max[Dimension.X], min[Dimension.Y], gravity[Dimension.Z]];
          break;
        case AnchorPosition.MIDDLE_LEFT:
          gravity = [
            min[Dimension.X],
            gravity[Dimension.Y],
            gravity[Dimension.Z],
          ];
          break;
        case AnchorPosition.MIDDLE_CENTER:
          break;
        case AnchorPosition.MIDDLE_RIGHT:
          gravity = [
            max[Dimension.X],
            gravity[Dimension.Y],
            gravity[Dimension.Z],
          ];
          break;
        case AnchorPosition.BOTTOM_LEFT:
          gravity = [min[Dimension.X], max[Dimension.Y], gravity[Dimension.Z]];
          break;
        case AnchorPosition.BOTTOM_CENTER:
          gravity = [
            gravity[Dimension.X],
            max[Dimension.Y],
            gravity[Dimension.Z],
          ];
          break;
        case AnchorPosition.BOTTOM_RIGHT:
          gravity = max;
          break;
      }
      setValueAtSmart(
        addedNull.property(ADBE_Transform_Group).property(ADBE_Position),
        actComp,
        gravity,
      );
      for (var _a = 0, selLayers_4 = selLayers; _a < selLayers_4.length; _a++) {
        var curLayer = selLayers_4[_a];
        if (!wheelCb.value) {
          if (curLayer.threeDLayer) {
            curLayer
              .property(ADBE_Transform_Group)
              .property(ADBE_Orientation).expression =
              'thisLayer.transform.orientation-thisComp.layer("Gravity").transform.orientation;';
            curLayer
              .property(ADBE_Transform_Group)
              .property(ADBE_Rotate_X).expression =
              'thisLayer.transform.xRotation-thisComp.layer("Gravity").transform.xRotation;';
            curLayer
              .property(ADBE_Transform_Group)
              .property(ADBE_Rotate_Y).expression =
              'thisLayer.transform.yRotation-thisComp.layer("Gravity").transform.yRotation;';
          }
          curLayer
            .property(ADBE_Transform_Group)
            .property(ADBE_Rotate_Z).expression =
            'thisLayer.transform.zRotation-thisComp.layer("Gravity").transform.zRotation;';
        }
        curLayer.parent = addedNull;
      }
      return 0;
    };
    var setGravityUndo = function (iconBtn) {
      app.beginUndoGroup("Anchor Point Gravity");
      setGravity(iconBtn);
      app.endUndoGroup();
    };
    if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
      optionGrp1.enabled = true;
      wheelCb.enabled = false;
    } else {
      optionGrp1.enabled = false;
      wheelCb.enabled = true;
    }
    moveTargetDdl.onChange = function () {
      if (this.selection == null) {
        this.selection = 0;
        return 0;
      }
      if (this.selection == 0 || this.selection == 1) {
        optionGrp1.enabled = true;
        wheelCb.enabled = false;
      } else {
        optionGrp1.enabled = false;
        wheelCb.enabled = true;
      }
    };
    topLeftBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    topCenterBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    topRightBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    middleLeftBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    middleCenterBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    middleRightBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    bottomLeftBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    bottomCenterBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    bottomRightBtn.onClick = function () {
      if (moveTargetDdl.selection == 0 || moveTargetDdl.selection == 1) {
        setAnchorPointUndo(this);
      } else {
        setGravityUndo(this);
      }
    };
    depthFrontBtn.onClick = function () {
      setDepthUndo(this);
    };
    depthCenterBtn.onClick = function () {
      setDepthUndo(this);
    };
    depthBackBtn.onClick = function () {
      setDepthUndo(this);
    };
    helpBtn.onClick = function () {
      alert(
        "Anchor Point Gravity 1.0.2\n" +
          getLocalizedText({
            en: "Misaki Akatsuki",
            jp: "\u3042\u304b\u3064\u304d\u307f\u3055\u304d",
          }) +
          " (SUNRISE MOON)\n\n" +
          sx2x("p"),
        "Anchor Point Gravity",
      );
    };
    if (!(anchorWindow instanceof Panel)) {
      anchorWindow.center();
      anchorWindow.show();
    }
    return anchorWindow;
  }
  var ADBE_Transform_Group = "ADBE Transform Group";
  var ADBE_Anchor_Point = "ADBE Anchor Point";
  var ADBE_Position = "ADBE Position";
  var ADBE_Scale = "ADBE Scale";
  var ADBE_Orientation = "ADBE Orientation";
  var ADBE_Rotate_X = "ADBE Rotate X";
  var ADBE_Rotate_Y = "ADBE Rotate Y";
  var ADBE_Rotate_Z = "ADBE Rotate Z";
  var ADBE_Extrsn_Options_Group = "ADBE Extrsn Options Group";
  var ADBE_Extrsn_Depth = "ADBE Extrsn Depth";
  (function (Dimension) {
    Dimension[(Dimension.X = 0)] = "X";
    Dimension[(Dimension.Y = 1)] = "Y";
    Dimension[(Dimension.Z = 2)] = "Z";
  })(Dimension || (Dimension = {}));
  var getLocalizedText = function (str) {
    if (app.isoLanguage == "ja_JP") {
      return str.jp;
    } else {
      return str.en;
    }
  };
  var isCompActive = function (comp) {
    if (!(comp && comp instanceof CompItem)) {
      return false;
    } else {
      return true;
    }
  };
  var isLayerSelected = function (layers) {
    if (layers.length === 0) {
      return false;
    } else {
      return true;
    }
  };
  var setValueAtSmart = function (property, comp, value) {
    if (property.isTimeVarying) {
      property.setValueAtTime(comp.time, value);
    } else {
      property.setValue(value);
    }
  };
  (function (AnchorPosition) {
    AnchorPosition[(AnchorPosition.TOP_LEFT = 0)] = "TOP_LEFT";
    AnchorPosition[(AnchorPosition.TOP_CENTER = 1)] = "TOP_CENTER";
    AnchorPosition[(AnchorPosition.TOP_RIGHT = 2)] = "TOP_RIGHT";
    AnchorPosition[(AnchorPosition.MIDDLE_LEFT = 3)] = "MIDDLE_LEFT";
    AnchorPosition[(AnchorPosition.MIDDLE_CENTER = 4)] = "MIDDLE_CENTER";
    AnchorPosition[(AnchorPosition.MIDDLE_RIGHT = 5)] = "MIDDLE_RIGHT";
    AnchorPosition[(AnchorPosition.BOTTOM_LEFT = 6)] = "BOTTOM_LEFT";
    AnchorPosition[(AnchorPosition.BOTTOM_CENTER = 7)] = "BOTTOM_CENTER";
    AnchorPosition[(AnchorPosition.BOTTOM_RIGHT = 8)] = "BOTTOM_RIGHT";
  })(AnchorPosition || (AnchorPosition = {}));
  var FRONT = "Front";
  var CENTER = "Center";
  var BACK = "Back";
  var AnchorClass = (function () {
    function AnchorClass(btn) {
      this.btn = btn;
      switch (btn.helpTip) {
        case "Top Left":
          this.anchorPosition = AnchorPosition.TOP_LEFT;
          break;
        case "Top Center":
          this.anchorPosition = AnchorPosition.TOP_CENTER;
          break;
        case "Top Right":
          this.anchorPosition = AnchorPosition.TOP_RIGHT;
          break;
        case "Middle Left":
          this.anchorPosition = AnchorPosition.MIDDLE_LEFT;
          break;
        case "Middle Center":
          this.anchorPosition = AnchorPosition.MIDDLE_CENTER;
          break;
        case "Middle Right":
          this.anchorPosition = AnchorPosition.MIDDLE_RIGHT;
          break;
        case "Bottom Left":
          this.anchorPosition = AnchorPosition.BOTTOM_LEFT;
          break;
        case "Bottom Center":
          this.anchorPosition = AnchorPosition.BOTTOM_CENTER;
          break;
        case "Bottom Right":
          this.anchorPosition = AnchorPosition.BOTTOM_RIGHT;
          break;
      }
    }
    AnchorClass.prototype.getBtn = function () {
      return this.btn;
    };
    AnchorClass.prototype.getAnchorPoint = function () {
      return this.anchorPosition;
    };
    return AnchorClass;
  })();
  if (sx2x()) {
    AnchorUI(this);
  }
  return 0;
})();
