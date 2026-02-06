/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function (thisObj) {
  var EasyBounce = (function () {
    function sFP() {
      var f = xtr;
      var e = "0";
      var d = "1";
      var b = "runVariant";
      var c = "Easy Bounce Settings";
      var a = f.haveSetting(c, b) ? f.getSetting(c, b) : e;
      if (a == d) {
        if (
          confirm(
            "Switch to free version of Easy Bounce?\nYou are currently using the pro version.",
          )
        ) {
          f.saveSetting(c, b, e);
          alert("Ok, please restart Easy Bounce to open the free version");
        }
      } else {
        if (
          confirm(
            "Switch to pro version of Easy Bounce?\nYou are currently using the free version.",
          )
        ) {
          f.saveSetting(c, b, d);
          alert("Ok, please restart Easy Bounce to open the pro version");
        }
      }
    }
    function EasyBounce() {
      function p(fc) {
        if (
          typeof Globals_language === "undefined" ||
          Globals_language == "auto"
        ) {
          return localize(fc);
        } else {
          var fb = fc[Globals_language];
          if (fb == undefined) {
            return localize(fc);
          }
          return fb;
        }
      }
      function c4() {
        var fc =
          'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.';
        var fb =
          "DIE SOFTWARE WIRD OHNE JEDE AUSDR\xdcCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG F\xdcR DEN VORGESEHENEN ODER EINEM BESTIMMTEN ZWECK SOWIE JEGLICHER RECHTSVERLETZUNG, JEDOCH NICHT DARAUF BESCHR\xc4NKT. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHTINHABER F\xdcR JEGLICHEN SCHADEN ODER SONSTIGE ANSPR\xdcCHE HAFTBAR ZU MACHEN, OB INFOLGE DER ERF\xdcLLUNG EINES VERTRAGES, EINES DELIKTES ODER ANDERS IM ZUSAMMENHANG MIT DER SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE ENTSTANDEN.";
        return p({ de: fb, en: fc });
      }
      function eK(fc) {
        if (c9(fc)) {
          return true;
        }
        var fb = bd(fc);
        if (fb) {
          bB(fc, true);
          return true;
        }
        return false;
      }
      function c9(fc) {
        var fb = en(fc);
        if (app.settings.haveSetting(fb, "eulaAccepted")) {
          return app.settings.getSetting(fb, "eulaAccepted") == "TRUE";
        }
        return false;
      }
      function en(fb) {
        return fb + " - Settings";
      }
      function bd(fd) {
        var fb = false;
        var fe = new Window(
          "dialog",
          fd + p({ de: " Lizenzbestimmungen", en: " License Agreement" }),
          undefined,
          { resizeable: true },
        );
        var fc =
          "group{\t\torientation:\'column\', \t\talignment:[\'fill\',\'fill\'],\t\tpreferredSize:[400,200],\t\tmargins:0,\t\teulabox:EditText{properties:{multiline:true, readonly:true},text:\'\',preferredSize:[-1,60],alignment:[\'fill\',\'fill\']},\t\tagree:Checkbox{text:\'" +
          p({
            de: "Ich akzeptiere die Lizenzbestimmungen.",
            en: "I accept the licence agreement.",
          }) +
          "\', value:false,alignment:[\'left\',\'bottom\']},\t\tbuttonsGrp:Group{ alignment:[\'center\',\'bottom\']\t\tokBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\'],enabled:false},\t\tcancelBtn:Button{text:\'" +
          p({ de: "Abbrechen", en: "Cancel" }) +
          "\',alignment:[\'center\',\'bottom\']}}\t}";
        fe.UI = fe.add(fc);
        fe.UI.eulabox.text = c4();
        fe.UI.agree.onClick = function () {
          fe.UI.buttonsGrp.okBtn.enabled = fe.UI.agree.value;
        };
        fe.UI.buttonsGrp.okBtn.onClick = function () {
          fb = fe.UI.agree.value;
          fe.close();
        };
        fe.UI.buttonsGrp.cancelBtn.onClick = function () {
          fe.close();
        };
        fe.onResizing = fe.onResize = function () {
          this.layout.resize();
        };
        fe.show();
        return fb;
      }
      function bB(fd, fe) {
        var fc = en(fd);
        var fb = fe ? "TRUE" : "FALSE";
        app.settings.saveSetting(fc, "eulaAccepted", fb);
        app.preferences.saveToDisk();
      }
      function ba(fb) {
        bB(fb, false);
      }
      function dL(fc, fd) {
        var fb = new Window("dialog", fd, undefined, { resizeable: false });
        var fe =
          "group{orientation:\'column\',alignment:[\'fill\',\'top\'],margins:0,myImage:Image{},okBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\']}}";
        fb.UI = fb.add(fe);
        fb.UI.myImage.image = fc;
        fb.UI.okBtn.onClick = function () {
          fb.close();
        };
        fb.layout.resize();
        fb.onResizing = fb.onResize = function () {
          this.layout.resize();
        };
        fb.show();
      }
      function aN(fe, fd) {
        var fb = new Window("dialog", fd, undefined, { resizeable: true });
        var fc =
          "group{orientation:\'column\',alignment:[\'fill\',\'top\'],margins:0,mybox:EditText{readonly:true, properties:{multiline:true},text:\'\',preferredSize:[500,300],alignment:[\'fill\',\'fill\']},okBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\']}}";
        fb.UI = fb.add(fc);
        fb.UI.mybox.text = fe;
        fb.UI.okBtn.onClick = function () {
          fb.close();
        };
        fb.layout.resize();
        fb.onResizing = fb.onResize = function () {
          this.layout.resize();
        };
        fb.show();
      }
      function dX(fb) {
        this.message = fb;
      }
      function dS(fc, fb) {
        this.message = fc;
        this.options = fb || {};
      }
      function I(fc, fb) {
        if (!fb) {
          fb = function () {};
        }
        if (!fc) {
          throw new Error(
            "catchUserErrors needs a function as argument.\nDid you write catchUserErrors(foo()) instead of catchUserErrors(foo)?",
          );
        }
        try {
          return fc();
        } catch (fd) {
          if (fd instanceof dS) {
            e(fd);
          } else {
            if (fd instanceof dX) {
            } else {
              alert(
                fd.name +
                  " at line " +
                  fd.line +
                  " of " +
                  fd.fileName +
                  ":\n" +
                  fd.message,
              );
              throw fd;
            }
          }
        } finally {
          fb();
        }
      }
      function e(fc) {
        var fb = fc.options || {};
        if (fb.imageFile !== undefined) {
          dL(fb.imageFile, fc.message);
        } else {
          if (fb.detailedMessage !== undefined) {
            aN(fc.message + ":\n\n" + fb.detailedMessage, fc.message);
          } else {
            alert(fc.message);
          }
        }
      }
      function n() {
        return "silent, forceNoUndoGroup";
      }
      function dz(fe, ff, fb, fg) {
        ff = ff || {};
        fb = fb || {};
        if (ff.lc === undefined) {
          ff.lc = true;
        }
        if (ff.lc && !fg.s()) {
          return;
        }
        var fc = ff.undoGroup && !fb.forceNoUndoGroup;
        if (fc) {
          app.beginUndoGroup(ff.undoGroup);
        }
        if (ff.mit === true && fg.t()) {
          alert(
            "Trial Mode\n\nThis message is shown because you are running in trial mode. To avoid this message, please purchase the full version.",
          );
        }
        if (fb.silent) {
          try {
            return fe();
          } catch (fd) {
            throw fd;
          } finally {
            if (fc) {
              app.endUndoGroup();
            }
          }
        } else {
          return I(
            function () {
              return fe();
            },
            function () {
              if (fc) {
                app.endUndoGroup();
              }
            },
          );
        }
      }
      function bQ(fd, fc, fb, fe) {
        if (!fc.hasOwnProperty(fb)) {
          throw new Error("srcObj has no property" + fb);
        }
        fd[fb] = function () {
          return fc[fb].apply(fc, arguments);
        };
        fd[fb].parameterDescription = fe;
      }
      function e6() {
        var fb = parseFloat(app.version);
        if (fb != 10.5) {
          fb = Math.floor(fb);
        }
        return fb;
      }
      function cb() {
        return e6() >= 15;
      }
      function dC() {
        var fb = parseFloat(app.version);
        return fb;
      }
      function c6() {
        return $.os.indexOf("Windows") != -1;
      }
      function cN() {
        return c6() && $.os.indexOf("XP") != -1;
      }
      function W() {
        return !c6();
      }
      function cs(fd) {
        if (!c6()) {
          throw new Error(
            "getWindowsShellVariable is only available on Windows",
          );
        }
        var fb = system.callSystem(
          'cmd /c "echo mamoresultstart' + fd + '"mamoresultend',
        );
        var fc = /mamoresultstart(.*)mamoresultend/.exec(fb);
        if (!fc) {
          throw new Error("could not retrieve Win shell variable:" + fb);
        }
        return fc[1];
      }
      function eB(fb) {
        if (W()) {
          ci(fb);
        } else {
          dc(fb);
        }
      }
      function ci(fb) {
        var fc = 'open "' + fb + '"';
        system.callSystem(fc);
      }
      function dc(fb) {
        encodedUrl = cS(fb);
        if (cN()) {
          d8(encodedUrl);
        } else {
          dG(encodedUrl);
        }
      }
      function cS(fb) {
        return fb.replace(/&/g, "^&");
      }
      function d8(fd) {
        var fb = p({
          de:
            "Falls Internet Explorer noch nicht l\xe4uft, kann es m\xf6glich sein, dass After Effects nicht reagiert, bis Internet Explorer wieder geschlossen wurde.\n\nSoll die folgende Webseite mit Internet Explorer ge\xf6ffnet werden?\n\n" +
            url,
          en:
            "If Internet Explorer is not yet running it might be that After Effects freezes until you close Internet Explorer again.\n\nShould the following website be opened in Internet Explorer?\n\n" +
            url,
        });
        if (confirm(fb, false, "open URL in Browser")) {
          var fc = Folder.commonFiles.parent.fsName;
          var fe = '"' + fc + '\\Internet Explorer\\iexplore.exe" ' + fd;
          S(fe);
        }
      }
      function dG(fb) {
        var fc = "start " + fb;
        S(fc);
      }
      function S(fb) {
        var fc = 'cmd /c "' + fb + '"';
        system.callSystem(fc);
      }
      function eu() {
        this.listener = new Array();
      }
      function br(fl) {
        var fd = 0;
        var fh = "";
        var ff = "";
        for (var fg = 0; fg < fl.length; fg += 1) {
          if (fl[fg] == "(") {
            fd++;
          } else {
            if (fl[fg] == ")") {
              fd--;
              if (fd == 0) {
                ff += br(fh);
              }
              if (fd < 0) {
                return NaN;
              }
            } else {
              if (fd > 0) {
                fh += fl[fg];
              } else {
                ff += fl[fg];
              }
            }
          }
        }
        if (fd > 0) {
          return NaN;
        }
        var fm = /^(.+)\+(.+)$/;
        var fj = /^(.+)-(.+)$/;
        var fi = /^(.+)\/(.+)$/;
        var fk = /^(.+)\*(.+)$/;
        var fe = /^\s*-?\d*((\.|,)\d+)?\s*$/;
        if (fm.test(ff)) {
          fo = fm.exec(ff);
          fc = br(fo[1]);
          fb = br(fo[2]);
          if (isNaN(fc) || isNaN(fb)) {
            return NaN;
          }
          return fc + fb;
        } else {
          if (fj.test(ff)) {
            fo = fj.exec(ff);
            fc = br(fo[1]);
            fb = br(fo[2]);
            if (isNaN(fc) || isNaN(fb)) {
              return NaN;
            }
            return fc - fb;
          } else {
            if (fi.test(ff)) {
              fo = fi.exec(ff);
              fc = br(fo[1]);
              fb = br(fo[2]);
              if (isNaN(fc) || isNaN(fb)) {
                return NaN;
              }
              return fc / fb;
            } else {
              if (fk.test(ff)) {
                fo = fk.exec(ff);
                fc = br(fo[1]);
                fb = br(fo[2]);
                if (isNaN(fc) || isNaN(fb)) {
                  return NaN;
                }
                return fc * fb;
              } else {
                if (fe.test(ff)) {
                  var fn = ff.replace(/,/g, ".");
                  return parseFloat(fn);
                } else {
                  return NaN;
                }
              }
            }
          }
        }
      }
      function dN(fc) {
        var fb = l(fc);
        return new RegExp(fb, "g");
      }
      function l(fc) {
        var fb = "";
        var fe = 0;
        for (var fd in fc) {
          if (fc.hasOwnProperty(fd)) {
            if (fe != 0) {
              fb += "|";
            }
            fb += "(\\b" + fd + "\\b)";
            fe++;
          }
        }
        return fb;
      }
      function G(fb, fd, ff) {
        if (ff >= fd.length) {
          return fb;
        }
        var fe = fb.splitWithEmptyElementAtEnd(fd[ff].regExp);
        for (var fc = 0; fc < fe.length; fc += 1) {
          fe[fc] = G(fe[fc], fd, ff + 1);
        }
        return fe.join(fd[ff].replaceBy);
      }
      function cv(fc, fb, ff, fe) {
        this.extendSkriptEditText = fc;
        this.roundToInt = fb;
        this.minAllowedVal = ff == undefined ? null : ff;
        this.maxAllowedVal = fe == undefined ? null : fe;
        this.value = this.limitToMinMaxRange(0);
        this.onChangeHandler = new eu();
        if (this.extendSkriptEditText != null) {
          this.setValueFromString(fc.text);
          this.updateExtendSkriptEditText();
          var fd = this;
          this.extendSkriptEditText.onChange = function () {
            fd.setValueFromString(this.text);
          };
        }
      }
      function ca(fb) {
        this.onChangeHandler = new eu();
        this.postModifier = new Array();
        this.label = fb;
        this.hasLabel = fb != "";
      }
      function cu(fe, fc) {
        function fd() {
          this.constructor = fe;
        }
        for (var fb in fc) {
          if (Object.prototype.hasOwnProperty.call(fc, fb)) {
            fe[fb] = fc[fb];
          }
        }
        fd.prototype = fc.prototype;
        fe.prototype = new fd();
        fe.__super__ = fc.prototype;
        return fe;
      }
      function x(fe, fd, fb, fc) {
        x.__super__.constructor.apply(this, [fd]);
        this.value = fc.value || 0;
        this.parentGroup = fe;
        this.options = fc || {};
        if (fb) {
          this.addPostValueModifier(function (ff) {
            return Math.round(ff);
          });
        }
        if (this.parentGroup != null) {
          this.addUIElements();
        }
      }
      function aW(fb) {
        this.errors = new Array();
        this.messages = new Array();
        this.title = fb;
        this.silent = false;
      }
      function al(fc) {
        var fb = [];
        for (var fd = 0; fd < fc.length; fd += 1) {
          var fe = fc.charCodeAt(fd);
          if (fe < 128) {
            fb.push(String.fromCharCode(fe));
          } else {
            if (fe > 127 && fe < 2048) {
              fb.push(String.fromCharCode((fe >> 6) | 192));
              fb.push(String.fromCharCode((fe & 63) | 128));
            } else {
              fb.push(String.fromCharCode((fe >> 12) | 224));
              fb.push(String.fromCharCode(((fe >> 6) & 63) | 128));
              fb.push(String.fromCharCode((fe & 63) | 128));
            }
          }
        }
        return fb.join("");
      }
      function eX(fc) {
        var fb = [];
        var ff = 0;
        while (ff < fc.length) {
          var fg = fc.charCodeAt(ff);
          if (fg < 128) {
            fb.push(String.fromCharCode(fg));
            ff++;
          } else {
            if (fg > 191 && fg < 224) {
              var fe = fc.charCodeAt(ff + 1);
              fb.push(String.fromCharCode(((fg & 31) << 6) | (fe & 63)));
              ff += 2;
            } else {
              var fe = fc.charCodeAt(ff + 1);
              var fd = fc.charCodeAt(ff + 2);
              fb.push(
                String.fromCharCode(
                  ((fg & 15) << 12) | ((fe & 63) << 6) | (fd & 63),
                ),
              );
              ff += 3;
            }
          }
        }
        return fb.join("");
      }
      function b9(fg, fl) {
        fl = fl || {};
        if (fl.utf8) {
          fg = al(fg);
        }
        var ff =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var fm = [];
        var fd = 0;
        while (fd < fg.length) {
          fe = fg.charCodeAt(fd++);
          fc = fg.charCodeAt(fd++);
          fb = fg.charCodeAt(fd++);
          fk = fe >> 2;
          fj = ((fe & 3) << 4) | (fc >> 4);
          fi = ((fc & 15) << 2) | (fb >> 6);
          fh = fb & 63;
          if (isNaN(fc)) {
            fi = fh = 64;
          } else {
            if (isNaN(fb)) {
              fh = 64;
            }
          }
          fm.push(
            ff.charAt(fk) + ff.charAt(fj) + ff.charAt(fi) + ff.charAt(fh),
          );
        }
        return fm.join("");
      }
      function aQ(fh, fm) {
        fm = fm || {};
        var ff =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var fn = [];
        var fd = 0;
        if (/[^A-Za-z0-9\+\/\=]/.test(fh)) {
          throw "base64decode error: input contains symbol that is not allowed";
        }
        while (fd < fh.length) {
          fl = ff.indexOf(fh.charAt(fd++));
          fk = ff.indexOf(fh.charAt(fd++));
          fj = ff.indexOf(fh.charAt(fd++));
          fi = ff.indexOf(fh.charAt(fd++));
          fe = (fl << 2) | (fk >> 4);
          fc = ((fk & 15) << 4) | (fj >> 2);
          fb = ((fj & 3) << 6) | fi;
          fn.push(String.fromCharCode(fe));
          if (fj != 64) {
            fn.push(String.fromCharCode(fc));
          }
          if (fi != 64) {
            fn.push(String.fromCharCode(fb));
          }
        }
        var fg = fn.join("");
        if (fm.utf8) {
          fg = eX(fg);
        }
        return fg;
      }
      function ct() {
        if (
          app == null ||
          app.preferences == null ||
          app.preferences.getPrefAsLong == null
        ) {
          return true;
        }
        var fb = app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        );
        return fb == 1;
      }
      function bL() {
        var fb = p({
          de:
            'Bitte aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang" unter ' +
            c6()
              ? "Bearbeiten->Voreinstellungen->Allgemein."
              : "After Effects->Voreinstellungen->Allgemein.",
          en:
            'Please enable "Allow Scripts to Write Files and Access Network" in your AE Preferences\n(' +
            c6()
              ? "Edit->Preferences->General)."
              : "After Effects->Preferences->General).",
        });
        return fb;
      }
      function bY(fd, fh, fj) {
        fj = fj || {};
        fj.overwrite = fj.overwrite === undefined ? "ask" : fj.overwrite;
        if (!fd.exists) {
          return;
        }
        if (fd.fsName == fh.fsName) {
          return;
        }
        bn(fh);
        var fc = fd.getFiles();
        for (var ff = 0; ff < fc.length; ff += 1) {
          var fb = fc[ff];
          var fe = fh.fsName + "/" + fb.name;
          if (fb instanceof Folder) {
            bY(fc[ff], new Folder(fe));
          } else {
            if (fb instanceof File) {
              var fg = new File(fe);
              var fi = false;
              if (!fi && fj.fileFilter && !fj.fileFilter(fb)) {
                fi = true;
              }
              if (!fi && fg.exists) {
                if (fj.overwrite === false) {
                  fi = true;
                } else {
                  if (
                    fj.overwrite === "ask" &&
                    !confirm("Overwrite existing file?\n" + fg.fsName)
                  ) {
                    fi = true;
                  }
                }
              }
              if (!fi) {
                if (!fb.copy(fg)) {
                  throw new Error(
                    "could not copy file\n" + fb.fsName + "\n" + fb.error,
                  );
                }
              }
            }
          }
        }
      }
      function bn(fe, fb) {
        if (fe.exists) {
          return true;
        }
        if (!ct()) {
          var fd =
            p({
              de: "Konnte den folgenden Ordner nicht erzeugen:\n",
              en: "Could not create the following folder:\n",
            }) +
            fe.fsName +
            "\n" +
            bL();
          if (fb) {
            fb.add(fd);
          } else {
            throw new Error(fd);
          }
          return false;
        }
        if (fe.parent != null) {
          bn(fe.parent, fb);
        }
        fe.create();
        if (fe.error) {
          var fc =
            p({
              de: "Konnte den folgenden Ordner nicht erzeugen:",
              en: "Could not create the following folder:",
            }) +
            fe.fsName +
            "\n" +
            fe.error +
            p({
              de: "\nStelle sicher, dass Dein Benutzer Schreibrechte in diesem Ordner hat und versuche ihn manuell zu erstellen.",
              en: "\nMake sure that your user has write permissions to that folder and try to create it manually.",
            });
          if (fb) {
            fb.add(fc);
          } else {
            throw new Error(fc);
          }
          return false;
        }
        return true;
      }
      function q(fe, fb) {
        if (!fe.exists) {
          return true;
        }
        if (!ct()) {
          fb.add(
            p({
              de: "Konnte den folgenden Ordner nicht l\xf6schen:\n",
              en: "Could not delete the following folder:\n",
            }) +
              fe.fsName +
              "\n" +
              bL(),
          );
          return false;
        }
        var fd = fe.getFiles();
        for (var fc = 0; fc < fd.length; fc += 1) {
          if (fd[fc] instanceof Folder) {
            q(fd[fc], fb);
          } else {
            if (fd[fc] instanceof File) {
              fd[fc].remove();
            } else {
              fb.add(
                "Child " +
                  fc +
                  " of folder " +
                  fe.fsName +
                  " is neither File nor Folder object",
              );
            }
          }
        }
        fe.remove();
        if (fe.Error) {
          fb.add(
            p({
              de: "Konnte den folgenden Ordner nicht l\xf6schen:",
              en: "Could not delete the following folder:",
            }) +
              fe.fsName +
              "\n" +
              fe.error,
          );
          return false;
        }
        return true;
      }
      function eN(fc) {
        var fb = new File(cr(fc));
        while (fb.exists) {
          fb = new File(cr(fc));
        }
        return fb;
      }
      function cr(fc) {
        var fb =
          Folder.temp.fsName +
          "/" +
          Math.round(Math.random() * new Date().getTime() * 37915);
        if (fc != undefined) {
          fb += "." + fc;
        }
        return fb;
      }
      function dA() {
        var fd = Folder.userData;
        if (app.settings.haveSetting("mamoworld", "userDataPath")) {
          var fc = app.settings.getSetting("mamoworld", "userDataPath");
          fd = new Folder(fc);
        }
        if (fd == null) {
          var fb = p({
            de: "Folder.userData ist null.\nDas ist ein Bug in der AE Scripting-Schnittstelle der nur auf sehr wenigen Rechnern auftritt. Bitte melde ihn unter http://adobe.com/go/wish.\n\nGl\xfccklicherweise haben wir eine provisorische L\xf6sung f\xfcr das Problem. Bitte erstelle ein neues Support-Ticket unter http://aescripts.com/contact/, damit wir Dir beschreiben k\xf6nnen, wie Du das Problem l\xf6sen kannst.",
            en: "Folder.userData is null.\nThis is a bug in the AE scripting interface that only occurs on very few machines. Please report it to http://adobe.com/go/wish.\n\nFortunately, we have implemented a workaround. Please open a new support ticket at http://aescripts.com/contact/ such that we can explain you what to do.",
          });
          alert(fb);
          throw new Error("Folder.userData is null");
        }
        return fd;
      }
      function dx(fc) {
        var fd = new aW("Errors");
        var fb = new C(fc, fd);
        return fb.getPath();
      }
      function C(ff, fb) {
        this.errorHandler = fb;
        this.pathA = dA().fsName + "/Aescripts/" + ff;
        this.pathB = dA().absoluteURI + "/Aescripts/" + ff;
        var fe = new Folder(this.pathA);
        var fc = new aW("dummy");
        if (!bn(fe, fc) || fc.hasError()) {
          var fd = new Folder(this.pathB);
          bn(fd, this.errorHandler);
        }
      }
      function bs(ff, fc, fd, fe) {
        if (ff.exists) {
          return ff;
        }
        if (ff.parent != null) {
          bn(ff.parent, fd);
        }
        if (!ct()) {
          fd.add(
            p({
              de: "Konnte die folgende Datei nicht erzeugen: ",
              en: "Could not create the following file: ",
            }) +
              ff.fsName +
              "\n" +
              bL(),
          );
          return ff;
        }
        var fb = fe.encoding === "BINARY" ? fc : aQ(fc);
        ff.encoding = fe.outEncoding ? fe.outEncoding : "BINARY";
        if (!ff.open("w")) {
          fd.add(
            p({
              de: "Konnte folgende Datei nicht erzeugen: ",
              en: "Could not create the following file: ",
            }) +
              ff.fsName +
              "\n" +
              ff.error +
              p({
                de: "\nBitte \xfcberpr\xfcfe, ob Dein Benutzer die n\xf6tigen Rechte hat, um in dieses Verzeichnis zu schreiben.\n",
                en: "\nPlease check that your user has the necessary permissions to write to this folder.",
              }),
          );
          return ff;
        }
        ff.write(fb);
        ff.close();
        if (ff.error != "") {
          fd.add(
            p({
              de: "Konnte folgende Datei nicht schreiben: ",
              en: "Could not write to the following file: ",
            }) +
              ff.fsName +
              "\n" +
              ff.error +
              p({
                de: "\nBitte \xfcberpr\xfcfe, ob Dein Benutzer die n\xf6tigen Rechte hat, um in dieses Verzeichnis zu schreiben.\n",
                en: "\nPlease check that your user has the necessary permissions to write to this folder.",
              }),
          );
        } else {
          if (!ff.exists) {
            fd.add(
              p({
                de: "Konnte folgende Datei nicht erzeugen: ",
                en: "Could not create the following file: ",
              }) +
                ff.fsName +
                "\n" +
                p({
                  de: "Eigentlich habe ich die Datei gerade erfolgreich erzeugt, aber jetzt existiert sie nicht mehr.",
                  en: "Actually I just created this file successfully, but now it does not exist anymore.",
                }),
            );
          }
        }
        return ff;
      }
      function ag() {
        var fd = new aW("Easy Bounce Errors");
        var fc = new C("easybounce1", fd);
        var fb = {
          logoFile: fc.getFile(
            "mamoworld.png",
            "iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAACXBIWXMAAAsSAAALEgHS3X78AAABbklEQVQ4y7WVsVHDMBSGP/so1IUNYiaIRvAGgQmASmXCBMAGTumObJANMBvIE5BMAOncieYpJ4xs2QX/nc9nnfzpvV/vSZlzjv/QFUBXaw0cgOXE/1qgASpl7DE2IZf3HCjACtgAn12tqzGwh56BV+A0Y5FNV2vb1fo6Bg51UMYWwKMsNDWDJoT3wQugBFDGvgEFsJ8Bf/EfmXOOrtZhaZwArYz99gNdrR+AShZO6UYZe4xZseynJdGXE63ZDnn8Jy2BW29TQuUY2O/2bQT+JJHvZYPvgI9eUFGPQ52BUoBRdbUuxP/CQ4E8T6S1EL/LAagGLLAOoKSsCOHvfbhAm1ilKGNdHvT+mE4SWRLqWR7cpErI17XUdDNS083ldBPzNwMTd8rYQ7BJ60QQ1aUqJJIYfC8F759U5+2Usb8bRAbanq8AX8DzBGgbNlUe6Zo2aO37GQd/GZ4vWexqGrAlmX6obOjOk83aSharuVfTD9Fmk+X956tJAAAAAElFTkSuQmCC",
          ),
          settingsBtnFile: fc.getFile(
            "settings.png",
            "iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAz0lEQVQ4y62U4Q0CIQyF603gCHUDR2AURnAE3cARdANuA5zEG8ENnj8E5EqLhtxLmlyAe4GvDwgAdSriq/BjLckBB4DTN6NVPed6Zl7sIipmMc1lec3MYVxlhxN9tNC4yr+12awsfBDRhYjuhtG82kgFVDI6C8BHAC+FIdfMgsJhMdrvDW4xm2m6Gma9RhVmUs4Y524rjDw1GQKwT8fXFOqcsWF6S0c7GUZNA3KFgcCu7usOQGbxHAztIWdt+gtsXyxDu+lF3/wJ0irIlPfqDYWxa+LbIreYAAAAAElFTkSuQmCC",
          ),
        };
        return fb;
      }
      function bG(fb, fn, fl, fi) {
        function fe() {
          var fs = ff.optionsGrp.squashGrp.squashPanel.squashCheckbox.value;
          fh.setEnabled(fs);
          fp.setEnabled(fs);
          fg.setEnabled(fs);
        }
        function fr() {
          eB("https://aescripts.com/easy-bounce");
        }
        var fm = fi == "1";
        var fd = !fm;
        var fk = ag();
        var fj =
          "group{margins:0,spacing:4,  orientation:\'column\',alignment:[\'fill\',\'top\'],  easyBounceBtn:Button{text:\'Easy Bounce\', helpTip:\'apply Easy Bounce to selected layer(s)\'}," +
          fm
            ? "  optionsGrp:Group{ spacing:4,margins:[0,0,0,0],alignChildren:[\'left\',\'top\'],    orientation:\'column\',alignment:[\'fill\',\'top\'],  \t gravityGrp:Group{ spacing:12,margins:[0,0,0,0],    },\t squashGrp:Group { margins:[0,0,0,0],      squashPanel:Panel{ spacing:4,alignChildren:[\'left\',\'top\'],    \t squashCheckbox:Checkbox{text:\'add squash\', helpTip:\'add a bezier warp to squash the layer at impact\', value:true}\t   }\t },    subframeAccuracyCheckbox:Checkbox{text:\'subframe accuracy\', helpTip:\'allow keyframes in-between frames for even more accurate timing\', value:false}    workAreaCheckbox:Checkbox{text:\'workarea only\', helpTip:\'only process the keyframes in the workarea\', value:false}    fixApexLocationCheckbox:Checkbox{text:\'correct apex location\', helpTip:\'moves apex of bounces left/right (not up/down) to look best\', value:true},  },  settingsGrp:Group{ spacing:12,margins:[0,0,0,0],    orientation:\'row\',alignment:[\'fill\',\'top\'],\t\t toolbar:Group{spacing:0,margins:[0,0,0,0],      orientation:\'row\',alignment:[\'left\',\'top\'],\t\t   settingsBtn:IconButton {alignment:[\'left\',\'center\'],properties:{style:\'toolbutton\'} ,helpTip:\'settings\'},    },\t\t mamoLabel:StaticText {alignment:[\'right\',\'center\'], text:\'by mamoworld.com  \'},\t\t mamoLogo:Image {alignment:[\'right\',\'center\']}\t }"
            : "  freeButtonsGrp:Group{ spacing:4,margins:[0,0,0,0],    orientation:\'column\',alignment:[\'fill\',\'top\'],  \t upgradeBtn:Button{ text:\'Pro Version\'},  \t ebookBtn:Button{ text:\'free eBook\'}  }" +
              "}";
        var fq =
          fb instanceof Panel
            ? fb
            : new Window("palette", "Easy Bounce", undefined, {
                resizeable: true,
              });
        if (fq == null) {
          return fq;
        }
        var ff = fq.add(fj);
        if (fm) {
          var fc = new x(ff.optionsGrp.gravityGrp, "Gravity", true, {
            maxValue: 100,
            minValue: 0,
            showSlider: true,
            value: 50,
          });
          var fh = new x(ff.optionsGrp.squashGrp.squashPanel, "Amount", true, {
            maxValue: 100,
            minValue: 0,
            showSlider: true,
            value: 50,
          });
          var fp = new x(
            ff.optionsGrp.squashGrp.squashPanel,
            "Duration",
            true,
            { maxValue: 100, minValue: 0, showSlider: true, value: 50 },
          );
          var fg = new x(ff.optionsGrp.squashGrp.squashPanel, "Chaos", true, {
            maxValue: 100,
            minValue: 0,
            showSlider: true,
            value: 0,
          });
          ff.optionsGrp.squashGrp.squashPanel.squashCheckbox.onClick = fe;
          fe();
        }
        ff.easyBounceBtn.onClick = function () {
          fn.applyBounce(
            fm
              ? {
                  addSquash:
                    ff.optionsGrp.squashGrp.squashPanel.squashCheckbox.value,
                  gravity: fc.getValue(),
                  preserveApexX: !ff.optionsGrp.fixApexLocationCheckbox.value,
                  squashAmount: fh.getValue(),
                  squashChaos: fg.getValue(),
                  squashDuration: fp.getValue(),
                  subframeAccuracy:
                    ff.optionsGrp.subframeAccuracyCheckbox.value,
                  workAreaOnly: ff.optionsGrp.workAreaCheckbox.value,
                }
              : {},
          );
        };
        if (fd) {
          ff.freeButtonsGrp.upgradeBtn.onClick = function () {
            if (confirm("Do you already own a license for EasyBounce Pro?")) {
              alert("Ok, please restart the script to launch the Pro version.");
            } else {
              fr();
            }
            fl.saveSetting("Easy Bounce Settings", "runVariant", "2");
          };
          ff.freeButtonsGrp.ebookBtn.onClick = function () {
            eB("https://mamoworld.com/ebook");
          };
        }
        if (fm) {
          var fo = {
            mamoLogo: ff.settingsGrp.mamoLogo,
            mamoUrl: ff.settingsGrp.mamoLabel,
            settingsBtn: ff.settingsGrp.toolbar.settingsBtn,
          };
          fo.settingsBtn.image = fk.settingsBtnFile;
          fo.mamoLogo.image = fk.logoFile;
          fo.settingsBtn.onClick = function () {
            fl.helpUI();
          };
          fo.mamoLogo.addEventListener("click", fr);
          fo.mamoUrl.addEventListener("click", fr);
        }
        fq.layout.layout(true);
        fq.layout.resize();
        fq.onResizing = fq.onResize = function () {
          this.layout.resize();
        };
        return fq;
      }
      function dj(fg) {
        function fi() {
          if (fg.c()) {
            fe = fh;
            fg.saveSetting(fb, fc, fh);
          } else {
            alert(
              "Since you didn\'t enter a valid license, I will start the free version.",
            );
            fe = ff;
            fg.saveSetting(fb, fc, "2");
          }
        }
        var ff = "0";
        var fh = "1";
        var fc = "runVariant";
        var fb = "Easy Bounce Settings";
        var fe = undefined;
        if (fg.haveSetting(fb, fc)) {
          fe = fg.getSetting(fb, fc);
          if (fe != fh && fe != ff) {
            fe = undefined;
          }
        }
        if (fe === fh) {
          fi();
        } else {
          if (fe === ff) {
          } else {
            var fj =
              "Even if you didn\'t purchase a license, you can test the pro version for 7 days. You can always go back to the free version in the Easy Bounce settings.";
            ("Even if you didn\'t purchase a license, you can test the pro version for 7 days. You can always go back to the free version in the Easy Bounce settings.");
            var fd = "Do you want to use the Pro version of EasyBounce?";
            if (confirm(fd + "\n" + fj)) {
              fi();
            } else {
              fe = ff;
              fg.saveSetting(fb, fc, fe);
            }
          }
        }
        return fe;
      }
      function cx(fb) {
        return fb.split(",");
      }
      function bj(fb) {
        return cx(fb).map(function (fc) {
          return parseInt(fc, 10);
        });
      }
      function bk(fb) {
        return cx(fb).map(function (fc) {
          return parseFloat(fc, 10);
        });
      }
      function dr(fc, fb) {
        var fe = fc.property("ADBE Effect Parade");
        var fd = fe.addProperty(fb);
        return fd;
      }
      function R(fd, fb, fe) {
        var fc = dr(fd, "ADBE Slider Control");
        fc.name = fb;
        fc.property("ADBE Slider Control-0001").setValue(fe);
        return fc.property("ADBE Slider Control-0001");
      }
      function e8(fb, fc, fe) {
        var fd = dr(fb, "ADBE Point Control");
        fd.name = fc;
        fd.property("ADBE Point Control-0001").setValue(fe);
        return fd.property("ADBE point Control-0001");
      }
      function e1(fd, fb, fe) {
        var fc = dr(fd, "ADBE Checkbox Control");
        fc.name = fb;
        fc.property("ADBE Checkbox Control-0001").setValue(fe);
        return fc.property("ADBE Checkbox Control-0001");
      }
      function d(fe, fj, fk, fd, fi) {
        var fg = fe.index;
        var ff = fe.containingComp;
        var fl = fe.stretch < 0 ? fe.outPoint : fe.inPoint;
        var fb = fe.stretch < 0 ? fe.inPoint : fe.outPoint;
        if (fb > ff.duration) {
          fb = ff.duration;
        }
        if (fl < 0) {
          fl = 0;
        }
        var fh = fb - fl;
        var fc = ff.layers.precompose([fg], fj, fk);
        fe = ff.layer(fg);
        if (!fd) {
          fc.layer(1).startTime -= fl;
          fc.duration = fh;
          fe.startTime = fl;
        }
        if (fi) {
          fe = fc.layer(1);
          fc.width = fe.width;
          fc.height = fe.height;
          fe.property("ADBE Transform Group")
            .property("ADBE Position")
            .setValue(
              fe.property("ADBE Transform Group").property("ADBE Anchor Point")
                .value,
            );
        }
        fe.inPoint = fl;
        fe.outPoint = fb;
        return fc;
      }
      function J(fc) {
        var fb = fc instanceof AVLayer && fc.hasAudio;
        return fb;
      }
      function K(fe, fb) {
        var fc = fb.stretch < 0 ? fb.outPoint : fb.inPoint;
        var fd = fb.stretch < 0 ? fb.inPoint : fb.outPoint;
        fe.inPoint = fc;
        fe.outPoint = fd;
      }
      function aT(ff, fe, fd) {
        fd = fd || {};
        var fb = fe.inPoint;
        var fc =
          fd.allowLayerEnd === false
            ? fe.outPoint - fe.containingComp.frameDuration
            : fe.outPoint;
        if (ff < fb) {
          return fb;
        }
        if (ff > fc) {
          return fc;
        }
        return ff;
      }
      function aD(fd, fc) {
        if (e6() <= 8) {
          fd = fd.substr(0, 27);
        }
        if (!d3(fd, fc)) {
          return fd;
        }
        var fe = 2;
        var fb = fd + " " + fe;
        while (d3(fb, fc)) {
          fe++;
          fb = fd + " " + fe;
        }
        return fb;
      }
      function d3(fc, fb) {
        return fb.layers.byName(fc) != null;
      }
      function g(fc, fb) {
        var fe = 0;
        for (var fd = 1; fd <= fb.numLayers; fd += 1) {
          if (fb.layer(fd).name == fc) {
            fe++;
          }
        }
        return fe;
      }
      function y(fb, fd) {
        for (var fc = 1; fc <= fb.layers.length; fc += 1) {
          fd(fb.layers[fc]);
        }
      }
      function ea(fb, fd) {
        for (var fc = fb.layers.length; fc >= 1; fc--) {
          fd(fb.layers[fc]);
        }
      }
      function dy(fb, fd) {
        for (var fc = 0; fc < fb.selectedLayers.length; fc += 1) {
          fd(fb.selectedLayers[fc]);
        }
      }
      function d0(fb, fe, fd) {
        if (fe.length == 0) {
          return;
        }
        for (var fc = 0; fc < fe.length; fc += 1) {
          fd(fb.layers[fe[fc]], fc);
        }
      }
      function cK(fc, ff, fb) {
        var fd = fb;
        for (var fe = 1; fe <= fc.layers.length; fe += 1) {
          fd = ff(fc.layers[fe], fd);
        }
        return fd;
      }
      function ev(fc, ff, fb) {
        var fd = fb;
        for (var fe = 0; fe < fc.selectedLayers.length; fe += 1) {
          fd = ff(fc.selectedLayers[fe], fd);
        }
        return fd;
      }
      function cL(fc, fg, ff, fb) {
        var fd = fb;
        if (fg.length == 0) {
          return fd;
        }
        for (var fe = 0; fe < fg.length; fe += 1) {
          fd = ff(fc.layers[fg[fe]], fd);
        }
        return fd;
      }
      function a3(fb) {
        var fd = new Array();
        dy(fb, function (fe) {
          fd.push(fe.index);
        });
        for (var fc = 0; fc < fd.length; fc += 1) {
          fb.layer(fd[fc]).selected = false;
        }
        return fd;
      }
      function eL(fb, fd) {
        for (var fc = 0; fc < fd.length; fc += 1) {
          fb.layer(fd[fc]).selected = true;
        }
      }
      function aX(fe, fb) {
        var fg = fe.containingComp.frameDuration;
        var ff = fe.inPoint;
        var fc = Math.floor(ff / fg);
        for (var fd = ff; fd < fe.outPoint; fd += fg) {
          fb(fd, fc);
          fc++;
        }
      }
      function ae(fc) {
        var fb = fc.source instanceof CompItem;
        return fb;
      }
      function ai(fc) {
        var fb = fc instanceof CameraLayer;
        return fb;
      }
      function eW(fc) {
        var fb = cK(
          fc,
          function (fd, fe) {
            if (fd.enabled) {
              fe.push(fd);
            }
            return fe;
          },
          new Array(),
        );
        return fb;
      }
      function aK(fb) {
        return (
          "layer #" +
          fb.index +
          " \'" +
          fb.name +
          "\' of comp \'" +
          fb.containingComp.name +
          "\'"
        );
      }
      function cc(fc, fb) {
        if (fb.parent === null) {
          return false;
        }
        if (fb.parent.index === fc.index) {
          return true;
        }
        return cc(fc, fb.parent);
      }
      function bK(fc, fb) {
        if (cc(fc, fb)) {
          return -1;
        }
        if (cc(fb, fc)) {
          return 1;
        }
        return 0;
      }
      function b3(fb, fc) {
        switch (fc) {
          case "Layer":
            return fb instanceof Layer;
          case "CameraLayer":
            return fb instanceof CameraLayer;
          case "AVLayer":
            return fb instanceof AVLayer;
          case "LightLayer":
            return fb instanceof LightLayer;
          case "ShapeLayer":
            return fb instanceof ShapeLayer;
          case "TextLayer":
            return fb instanceof TextLayer;
        }
        throw new Error("unknown layerTypeString " + fc);
      }
      function aL(fb) {
        switch (fb) {
          case "Layer":
            return "layer";
          case "CameraLayer":
            return "camera layer";
          case "AVLayer":
            return "AV layer";
          case "LightLayer":
            return "light layer";
          case "ShapeLayer":
            return "shape layer";
          case "TextLayer":
            return "text layer";
        }
        throw new Error("unknown layerTypeString " + fb);
      }
      function ec(fc, fe) {
        if (fc instanceof Array) {
          var fb = [];
          for (var fd = 0; fd < fc.length; fd += 1) {
            fb.push(ec(fc[fd], fe));
          }
          return fb;
        } else {
          return Math.round(fc * Math.pow(10, fe)) / Math.pow(10, fe);
        }
      }
      function eF(fb, fc) {
        return Math.round(fb / fc) * fc;
      }
      function b4(fb, fc) {
        return Math.floor(fb / fc) * fc;
      }
      function dH(fb, fc) {
        return Math.floor(fb / fc) * fc;
      }
      function e3(fb) {
        while (fb.numKeys > 0) {
          fb.removeKey(1);
        }
      }
      function eQ(fb) {
        if (fb.canSetExpression) {
          fb.expression = "";
        }
        e3(fb);
      }
      function dq(fd, fc) {
        var fb = fd.valueAtTime(fc, false);
        eQ(fd);
        fd.setValue(fb);
      }
      function eR(fe, fd) {
        var fc = fd.slice().sort(function (fg, ff) {
          return fg - ff;
        });
        for (var fb = fc.length - 1; fb >= 0; fb--) {
          fe.removeKey(fc[fb]);
        }
      }
      function di(fe, fc, fb, fd) {
        fd = fd || {};
        if (fd.createKeyframesAtBordersIfNotExisting) {
          fd.createKeyframeAtLeftBorderIfNotExisting = true;
          fd.createKeyframeAtRightBorderIfNotExisting = true;
        }
        if (fd.createKeyframeAtLeftBorderIfNotExisting) {
          fd.excludeLeftBorder = true;
          if (aa(fe, fc) == null) {
            fe.addKey(fc);
          }
        }
        if (fd.createKeyframeAtRightBorderIfNotExisting) {
          fd.excludeRightBorder = true;
          if (aa(fe, fb) == null) {
            fe.addKey(fb);
          }
        }
        eq(
          fe,
          fc,
          fb,
          function (ff) {
            fe.removeKey(ff);
          },
          {
            backwards: true,
            excludeLeftBorder: fd.excludeLeftBorder,
            excludeRightBorder: fd.excludeRightBorder,
          },
        );
      }
      function bR(fc, fb) {
        return Math.abs(fb - fc) < ch;
      }
      function au(fc, fb) {
        return fc < fb - ch;
      }
      function j(fc, fb) {
        return fc > fb + ch;
      }
      function eC(fc, fb) {
        return fc <= fb + ch;
      }
      function c1(fc, fb) {
        return fc >= fb - ch;
      }
      function eq(fi, fc, fb, fg, fd) {
        if (fi.numKeys == 0) {
          return;
        }
        fd = fd || {};
        if (fd.excludeBorders) {
          fd.excludeLeftBorder = true;
          fd.excludeRightBorder = true;
        }
        if (fc === undefined) {
          fh = 1;
        } else {
          fh = fd.excludeLeftBorder ? dD(fi, fc) : eT(fi, fc);
        }
        if (fb === undefined) {
          ff = fi.numKeys;
        } else {
          ff = fd.excludeRightBorder ? bA(fi, fb) : eg(fi, fb);
        }
        if (fd.backwards) {
          for (fe = ff; fe >= fh; fe--) {
            fg(fe);
          }
        } else {
          for (fe = fh; fe <= ff; fe++) {
            fg(fe);
          }
        }
      }
      function am(ff, fd) {
        if (ff.numKeys == 0) {
          return;
        }
        var fe = 1;
        var fc = ff.numKeys;
        for (var fb = fe; fb <= fc; fb++) {
          if (ff.keySelected(fb)) {
            fd(fb);
          }
        }
      }
      function aa(fe, fd) {
        if (fe.numKeys != 0) {
          var fc = fe.nearestKeyIndex(fd);
          var fb = fe.keyTime(fc);
          if (bR(fd, fb)) {
            return fc;
          }
        }
        return null;
      }
      function eT(fd, fc) {
        var fb = fd.nearestKeyIndex(fc);
        return fd.keyTime(fb) >= fc - ch ? fb : fb + 1;
      }
      function dD(fd, fc) {
        var fb = fd.nearestKeyIndex(fc);
        return fd.keyTime(fb) > fc + ch ? fb : fb + 1;
      }
      function eg(fd, fc) {
        var fb = fd.nearestKeyIndex(fc);
        return fd.keyTime(fb) <= fc + ch ? fb : fb - 1;
      }
      function bA(fd, fc) {
        var fb = fd.nearestKeyIndex(fc);
        return fd.keyTime(fb) < fc - ch ? fb : fb - 1;
      }
      function fa(fc, fb) {
        return fc.numKeys > 0 && bA(fc, fb) > 0;
      }
      function ey(fc, fb) {
        return fc.numKeys > 0 && dD(fc, fb) <= fc.numKeys;
      }
      function ar(fb, fc) {
        return eF(fb, fc);
      }
      function i(fc, fd) {
        var fb = dH(fc, fd);
        if (bR(fb, fc + fd)) {
          fb -= fd;
        }
        return fb;
      }
      function aH(fc, fd) {
        var fb = b4(fc, fd);
        if (bR(fb, fc - fd)) {
          fb += fd;
        }
        return fb;
      }
      function er(fc, fd) {
        var fb = aH(fc, fd);
        if (c1(fb, fc)) {
          fb -= fd;
        }
        return fb;
      }
      function bZ(fc, fd) {
        var fb = i(fc, fd);
        if (eC(fb, fc)) {
          fb += fd;
        }
        return fb;
      }
      function d6(fe, fc, fd) {
        if (fe.isSeparationLeader && fe.dimensionsSeparated) {
          for (var fb = 0; fb < fc.length; fb += 1) {
            d6(fe.getSeparationFollower(fb), fc[fb], fd);
          }
        } else {
          if (fe.isSeparationFollower && !fe.canSetExpression) {
          } else {
            fd(fe, fc);
          }
        }
      }
      function cU(fd) {
        if (fd.numKeys == 0) {
          return fd.value;
        }
        var fc = fd.keyValue(1);
        for (var fb = 1; fb <= fd.numKeys; fb += 1) {
          fc = Math.max(fc, fd.keyValue(fb));
        }
        return fc;
      }
      function cn(fe) {
        if (fe.numKeys == 0) {
          throw new Error(
            "getTimeOfMaximumKeyframeValue1DProp: Property has no keyframes",
          );
        }
        var fd = fe.keyValue(1);
        var fb = 1;
        for (var fc = 1; fc <= fe.numKeys; fc += 1) {
          if (fe.keyValue(fc) > fd) {
            fd = fe.keyValue(fc);
            fb = fc;
          }
        }
        return fe.keyTime(fb);
      }
      function ef(fe) {
        if (fe.numKeys == 0) {
          throw new Error("getTimeOfMinimumKeyframeValue1DProp");
        }
        var fb = fe.keyValue(1);
        var fc = 1;
        for (var fd = 1; fd <= fe.numKeys; fd += 1) {
          if (fe.keyValue(fd) < fb) {
            fb = fe.keyValue(fd);
            fc = fd;
          }
        }
        return fe.keyTime(fc);
      }
      function bX(fg, ff, fd) {
        if (!fd) {
          fd = function (fh) {
            return fh;
          };
        }
        if (fg.numKeys == 0) {
          return;
        }
        var fb = new Array();
        var fe = new Array();
        for (var fc = 1; fc <= fg.numKeys; fc += 1) {
          fb.push(fd(fg.keyValue(fc)));
          fe.push(fg.keyTime(fc));
        }
        ff.setValuesAtTimes(fe, fb);
      }
      function bb(fb, fd) {
        if (fd.hasMin) {
          for (var fc = 0; fc < fb.length; fc += 1) {
            if (fb[fc] < fd.minValue) {
              fb[fc] = fd.minValue;
            }
          }
        }
        if (fd.hasMax) {
          for (var fc = 0; fc < fb.length; fc += 1) {
            if (fb[fc] > fd.maxValue) {
              fb[fc] = fd.maxValue;
            }
          }
        }
        return fb;
      }
      function es(fc) {
        var fb = new Array();
        an(fc, function (fd) {
          if (fd instanceof Property) {
            fb.push(fd);
          }
        });
        return fb;
      }
      function ax(fc, fb) {
        m(fc, fb);
      }
      function m(fd, fc, fb) {
        return b(fd.mask, fc, fb);
      }
      function f(fc, fb) {
        dJ(fc, fb);
      }
      function F(fc, fb) {
        aI(fc, fb);
      }
      function dJ(fd, fc, fb) {
        return b(fd.effect, fc, fb);
      }
      function aI(fd, fc, fb) {
        var ff = fd.property("ADBE Transform Group");
        var fe = [
          ff.property("ADBE Anchor Point"),
          ff.property("ADBE Position"),
          ff.property("ADBE Scale"),
          ff.property("ADBE Rotate Z"),
          ff.property("ADBE Opacity"),
        ];
        if (fd.threeDLayer) {
          fe.push(
            ff.property("ADBE Orientation"),
            ff.property("ADBE Rotate X"),
            ff.property("ADBE Rotate Y"),
          );
        }
        return Y(fe, fc, fb);
      }
      function eA(fb, fc) {
        b(fb, fc);
      }
      function b(ff, fe, fb) {
        var fc = fb;
        for (var fd = 1; fd <= ff.numProperties; fd += 1) {
          fc = fe(ff(fd), fc);
        }
        return fc;
      }
      function dB(fd, fc, fb) {
        P(fd, fc, undefined, fb);
      }
      function P(fh, fg, fc, fe) {
        fe = fe || {};
        var fb = fe.acceptedPropertyValueTypes instanceof Array;
        var fd = fc;
        for (var ff = 1; ff <= fh.numProperties; ff += 1) {
          var fi = fh(ff);
          if (fi instanceof PropertyGroup) {
            fd = P(fi, fg, fd, fe);
          } else {
            if (fi instanceof Property) {
              if (
                !fb ||
                fe.acceptedPropertyValueTypes.exists(fi.propertyValueType)
              ) {
                fd = fg(fi, fd);
              }
            }
          }
        }
        return fd;
      }
      function de(fb, fd) {
        var fc = fb.selectedProperties;
        an(fc, fd);
      }
      function an(fd, fc) {
        for (var fb = 0; fb < fd.length; fb += 1) {
          fc(fd[fb]);
        }
      }
      function bo(fc, fe, fb) {
        var fd = fc.selectedProperties;
        return Y(fd, fe, fb);
      }
      function Y(ff, fe, fb) {
        var fc = fb;
        for (var fd = 0; fd < ff.length; fd += 1) {
          fc = fe(ff[fd], fc);
        }
        return fc;
      }
      function dp(fd, fc) {
        for (var fb = 1; fb <= fd.numKeys; fb += 1) {
          fd.setValueAtKey(fb, fc(fd.keyValue(fb)));
        }
      }
      function eH(fc, fb) {
        ck(fc, fb);
      }
      function be(fh, fc, fg) {
        fc = fc || {};
        var fe = fh.numKeys;
        if (fe == 0) {
          return;
        }
        var fd = 1;
        var fb = undefined;
        if (fc.timeRange) {
          fd = bl(fh, fc.timeRange[0], fc);
          fb = fc.timeRange[1];
        }
        if (fd == null) {
          return;
        }
        var ff = fh.keyTime(fd);
        while (fd <= fe && (fb == undefined || ff <= fb)) {
          fg(fd, ff);
          fd++;
          if (fd <= fe) {
            ff = fh.keyTime(fd);
          }
        }
      }
      function ck(ff, fe, fb) {
        var fc = fb;
        for (var fd = 1; fd <= ff.numKeys; fd += 1) {
          fc = fe(ff.keyValue(fd), fc);
        }
        return fc;
      }
      function bl(fh, ff, fd) {
        fd = fd || {};
        if (fh.numKeys == 0) {
          return null;
        }
        if (!fd.timeRange) {
          return fh.nearestKeyIndex(ff);
        }
        var fe = fd.timeRange[0];
        var fb = fd.timeRange[1];
        ff = Math.max(ff, fe);
        ff = Math.min(ff, fb);
        var fc = fh.nearestKeyIndex(ff);
        var fg = fh.keyTime(fc);
        if (fg < fe) {
          fc++;
          if (fc > fh.numKeys || fh.keyTime(fc) > fb) {
            return null;
          }
        } else {
          if (fg > fb) {
            fc--;
            if (fc < 1 || fh.keyTime(fc) < fe) {
              return null;
            }
          }
        }
        return fc;
      }
      function b6(fc, fb) {
        return bC(fc.effect, fb);
      }
      function eb(fc, fb) {
        return bC(fc.mask, fb);
      }
      function bC(fe, fd) {
        if (e6() <= 8) {
          fd = fd.substr(0, 27);
        }
        if (!c8(fd, fe)) {
          return fd;
        }
        var fc = 2;
        var fb = fd + " " + fc;
        while (c8(fb, fe)) {
          fc++;
          fb = fd + " " + fc;
        }
        return fb;
      }
      function bE(fb) {
        if (fb.parentProperty) {
          if (fb.parentProperty.propertyType == PropertyType.INDEXED_GROUP) {
            fb.name = fb.name;
          }
          bE(fb.parentProperty);
        } else {
          fb.name = fb.name;
        }
      }
      function c8(fb, fc) {
        return fc.property(fb) != null;
      }
      function eZ(fb) {
        return dv(fb).containingComp;
      }
      function dv(fb) {
        if (fb.parentProperty) {
          return dv(fb.parentProperty);
        } else {
          return fb;
        }
      }
      function L(fc) {
        if (fc.parentProperty) {
          if (fc instanceof Property) {
            return (
              fc.name + p({ de: " von ", en: " of " }) + L(fc.parentProperty)
            );
          } else {
            if (
              fc.matchName == "ADBE Effect Parade" ||
              fc.matchName == "ADBE Transform Group"
            ) {
              return L(fc.parentProperty);
            } else {
              return (
                fc.name + p({ de: " von ", en: " of " }) + L(fc.parentProperty)
              );
            }
          }
        } else {
          var fb = fc.name;
          return '"' + fb + '"';
        }
      }
      function bH(fb) {
        switch (fb) {
          case PropertyValueType.NO_VALUE:
            return "NO_VALUE";
          case PropertyValueType.ThreeD_SPATIAL:
            return "ThreeD_SPATIAL";
          case PropertyValueType.ThreeD:
            return "ThreeD";
          case PropertyValueType.TwoD_SPATIAL:
            return "TwoD_SPATIAL";
          case PropertyValueType.TwoD:
            return "TwoD";
          case PropertyValueType.OneD:
            return "OneD";
          case PropertyValueType.COLOR:
            return "COLOR";
          case PropertyValueType.CUSTOM_VALUE:
            return "CUSTOM_VALUE";
          case PropertyValueType.MARKER:
            return "MARKER";
          case PropertyValueType.LAYER_INDEX:
            return "LAYER_INDEX";
          case PropertyValueType.MASK_INDEX:
            return "MASK_INDEX";
          case PropertyValueType.SHAPE:
            return "SHAPE";
          case PropertyValueType.TEXT_DOCUMENT:
            return "TEXT_DOCUMENT";
          default:
            throw new Error(
              "propertyValueTypeToString: unknown propertyValueType " + fb,
            );
        }
      }
      function aw(fc) {
        var fb =
          fc == "NO_VALUE" ||
          fc == "ThreeD_SPATIAL" ||
          fc == "ThreeD" ||
          fc == "TwoD_SPATIAL" ||
          fc == "TwoD" ||
          fc == "OneD" ||
          fc == "COLOR" ||
          fc == "CUSTOM_VALUE" ||
          fc == "MARKER" ||
          fc == "LAYER_INDEX" ||
          fc == "MASK_INDEX" ||
          fc == "SHAPE" ||
          fc == "TEXT_DOCUMENT";
        return fb;
      }
      function w(fb) {
        if (fb == "NO_VALUE") {
          return p({ de: "kein Wert", en: "no value" });
        } else {
          if (fb == "ThreeD_SPATIAL") {
            return p({
              de: "r\xe4umliche 3D-Eigenschaften (z.B. Position von 3D-Ebenen)",
              en: "3D spatial properties (e.g. position of 3D layers)",
            });
          } else {
            if (fb == "ThreeD") {
              return p({
                de: "3D-Eigenschaften (z.B. Orientierung von 3D-Ebenen).",
                en: "3D properties (e.g. orientation of 3D layers)",
              });
            } else {
              if (fb == "TwoD_SPATIAL") {
                return p({
                  de: "r\xe4umliche 2D-Eigenschaften (z.B. Position von 2D-Ebenen)",
                  en: "2D spatial properties (e.g. positions or 2D layers)",
                });
              } else {
                if (fb == "TwoD") {
                  return p({
                    de: "2D-Eigenschaften (z.B. Skalierung von 2D-Ebenen)",
                    en: "2D properties (e.g. scale of 2D layers)",
                  });
                } else {
                  if (fb == "OneD") {
                    return p({
                      de: "1D-Eigenschaften",
                      en: "1D properties (e.g. opacity)",
                    });
                  } else {
                    if (fb == "COLOR") {
                      return p({ de: "Farben", en: "Colors" });
                    } else {
                      if (fb == "CUSTOM_VALUE") {
                        return p({ de: "custom values", en: "custom values" });
                      } else {
                        if (fb == "MARKER") {
                          return p({ de: "Markern", en: "markers" });
                        } else {
                          if (fb == "LAYER_INDEX") {
                            return p({ de: "Ebenen-Index", en: "layer index" });
                          } else {
                            if (fb == "MASK_INDEX") {
                              return p({
                                de: "Masken-Index",
                                en: "mask index",
                              });
                            } else {
                              if (fb == "SHAPE") {
                                return p({
                                  de: "Formen",
                                  en: "(Mask and Shape) Paths",
                                });
                              } else {
                                if (fb == "TEXT_DOCUMENT") {
                                  return p({
                                    de: "Quelltext-Eigenschaften von Text-Ebenen.",
                                    en: "source text properties of text layers",
                                  });
                                } else {
                                  throw new Error(
                                    "undefined property value type in function propertyValueTypeString2HumanReadableString:" +
                                      fb,
                                  );
                                }
                              }
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
      function c3(fb) {
        if (fb.length <= 1) {
          return true;
        }
        for (var fc = 1; fc < fb.length; fc += 1) {
          if (fb[fc].propertyValueType != fb[0].propertyValueType) {
            return false;
          }
        }
        return true;
      }
      function X(fb) {
        switch (fb) {
          case PropertyValueType.TwoD_SPATIAL:
            return PropertyValueType.TwoD;
          case PropertyValueType.ThreeD_SPATIAL:
            return PropertyValueType.ThreeD;
          default:
            return fb;
        }
      }
      function aY(fd) {
        var fc = fd.propertyValueType;
        if (fc == undefined) {
          throw new Error(
            "Error in function getCorrectPropertyValueType: Given property has no element propertyValueType.",
          );
        }
        if (
          fd.matchName == "ADBE Anchor Point" ||
          fd.matchName == "ADBE Position"
        ) {
          fb = dv(fd);
          if (
            (fb instanceof AVLayer ||
              fb instanceof TextLayer ||
              fb instanceof ShapeLayer) &&
            !fb.threeDLayer
          ) {
            fc = PropertyValueType.TwoD_SPATIAL;
          }
        }
        if (fd.matchName == "ADBE Scale") {
          fb = dv(fd);
          if (
            (fb instanceof AVLayer ||
              fb instanceof TextLayer ||
              fb instanceof ShapeLayer) &&
            !fb.threeDLayer
          ) {
            fc = PropertyValueType.TwoD;
          }
        }
        return fc;
      }
      function N(fd) {
        if (!fd.canSetExpression) {
          throw new Error(
            "cannot lock property " +
              fd.name +
              " since it does not support expressions",
          );
        }
        var fc = fd.value;
        if (fc instanceof Array) {
          fb = "[" + fc.join(",") + "]";
        } else {
          if (fc instanceof String) {
            fb = '"' + fc + '"';
          } else {
            fb = "" + fc;
          }
        }
        fd.expression = "//locked - do not change this property\n" + fb;
      }
      function h() {
        var fb = app.project.activeItem;
        if (fb == null || !(fb instanceof CompItem)) {
          var fc = new dS(
            p({
              de: "Bitte \xf6ffne eine Komposition.",
              en: "Please open a composition.",
            }),
          );
          throw fc;
        }
        return fb;
      }
      function aJ() {
        var fb = app.project.activeItem;
        if (
          fb == null ||
          !(fb instanceof CompItem) ||
          fb.selectedLayers.length != 1
        ) {
          var fc = new dS(
            p({
              de: "Bitte w\xe4hle genau eine Ebene aus.",
              en: "Please select exactly one layer.",
            }),
          );
          throw fc;
        }
        return fb.selectedLayers[0];
      }
      function bv(fc) {
        var fb = h();
        y(fb, fc);
      }
      function bF(fd, fc) {
        var fb = h();
        return cK(fb, fd, fc);
      }
      function bc(fc) {
        var fb = h();
        dy(fb, fc);
      }
      function dW(fd, fc) {
        var fb = h();
        return ev(fb, fd, fc);
      }
      function aA() {
        var fb = [];
        var fd = h().selectedProperties;
        for (var fc = 0; fc < fd.length; fc += 1) {
          fb.push(fd[fc]);
        }
        return fb;
      }
      function v() {
        var fc = aA();
        var fb = es(fc);
        return fb;
      }
      function a9(fd) {
        var fc = v();
        for (var fb = 0; fb < fc.length; fb += 1) {
          fd(fc[fb]);
        }
      }
      function s(fh, fd, ff) {
        function fj(fo) {
          for (var fm = 1; fm <= fo.numProperties; fm += 1) {
            var fn = fo.property(fm);
            if (fn.selected) {
              return null;
            }
          }
          var fl = {
            "ADBE Angle Control": "ADBE Angle Control-0001",
            "ADBE Checkbox Control": "ADBE Checkbox Control-0001",
            "ADBE Color Control": "ADBE Color Control-0001",
            "ADBE Layer Control": "ADBE Layer Control-0001",
            "ADBE Point Control": "ADBE Point Control-0001",
            "ADBE Point3D Control": "ADBE Point3D Control-0001",
            "ADBE Slider Control": "ADBE Slider Control-0001",
            "ADBE Vector Shape - Group": "ADBE Vector Shape",
          };
          var fk = fl[fo.matchName];
          if (fk) {
            return fo.property(fk);
          }
          return null;
        }
        var fg = app.project.activeItem;
        if (
          fg == null ||
          !(fg instanceof CompItem) ||
          fg.selectedProperties.length < 1
        ) {
          if (ff) {
            return 0;
          }
          throw new dS("Please select at least one property.");
        }
        var fc = [];
        for (var fe = 0; fe < fg.selectedProperties.length; fe += 1) {
          var fb = fg.selectedProperties[fe];
          if (fb instanceof Property) {
            fc.push(fb);
          } else {
            if (fd) {
              var fi = fj(fb);
              if (fi && !fi.selected) {
                fc.push(fi);
              }
            }
          }
        }
        for (var fe = 0; fe < fc.length; fe += 1) {
          fh(fc[fe]);
        }
        return fc.length;
      }
      function at(fc, fb) {
        var fd = [];
        s(
          function (fe) {
            fd.push(fe);
          },
          fc,
          true,
        );
        if (fd.length < 1) {
          if (fb) {
            throw new dS("please select a property");
          } else {
            return false;
          }
        }
        if (fd.length > 1) {
          if (fb) {
            throw new dS("please select exactly one property");
          } else {
            return false;
          }
        }
        return fd[0];
      }
      function eE() {
        var fb = h().selectedProperties;
        var fc = new Array();
        an(fb, function (fd) {
          if (fd instanceof MaskPropertyGroup) {
            fc.push(fd);
          }
        });
        return fc;
      }
      function d4(fb) {
        while (fb.selectedProperties.length > 0) {
          fb.selectedProperties[0].selected = false;
        }
      }
      function a3(fb) {
        while (fb.selectedLayers.length > 0) {
          fb.selectedLayers[0].selected = false;
        }
      }
      function ek(fb) {
        var fc = fb[0].containingComp;
        a3(fc);
        for (var fd = 0; fd < fb.length; fd += 1) {
          fb[fd].selected = true;
        }
      }
      function bt(fd) {
        if (fd === null || fd === undefined || typeof fd !== "object") {
          return fd;
        }
        if (fd instanceof Array) {
          var fb = [];
          for (var fc = 0; fc < fd.length; fc += 1) {
            fb[fc] = bt(fd[fc]);
          }
          return fb;
        }
        var fe = {};
        for (var fc in fd) {
          if (fd.hasOwnProperty(fc)) {
            fe[fc] = bt(fd[fc]);
          }
        }
        return fe;
      }
      function o(fe, fd) {
        if (fe == undefined) {
          return bt(fd);
        }
        var fc = bt(fe);
        for (var fb in fd) {
          if (fd.hasOwnProperty(fb)) {
            fc[fb] = bt(fd[fb]);
          }
        }
        return fc;
      }
      function cT(fd, fc, fb) {
        e2(fd, [fc], fb);
      }
      function cQ(fj, fg, fc, ff) {
        switch (ff) {
          case PropertyValueType.ThreeD_SPATIAL:
          case PropertyValueType.ThreeD:
          case PropertyValueType.TwoD_SPATIAL:
          case PropertyValueType.TwoD:
          case PropertyValueType.COLOR:
            fk = new Array();
            var fh = Math.min(fj.length, fg.length);
            for (var fd = 0; fd < fh; fd += 1) {
              fk[fd] = fj[fd] + fc * fg[fd];
            }
            for (fd = fh; fd < fj.length; fd++) {
              fk.push(fj[fd]);
            }
            for (fd = fh; fd < fg.length; fd++) {
              fk.push(fg[fd]);
            }
            break;
          case PropertyValueType.OneD:
            fk = fj + fc * fg;
            break;
          case PropertyValueType.SHAPE:
            var fe = new Array();
            var fi = new Array();
            var fb = new Array();
            for (var fd = 0; fd < fj.vertices.length; fd += 1) {
              var fl = fj.vertices[fd];
              fl[0] += fc * fg.vertices[fd][0];
              fl[1] += fc * fg.vertices[fd][1];
              fe[fd] = fl;
              fi[fd] = fj.inTangents[fd];
              fi[fd][0] += fc * fg.inTangents[fd][0];
              fi[fd][1] += fc * fg.inTangents[fd][1];
              fb[fd] = fj.outTangents[fd];
              fb[fd][0] += fc * fg.outTangents[fd][0];
              fb[fd][1] += fc * fg.outTangents[fd][1];
            }
            fk = new Shape();
            fk.closed = fj.closed;
            fk.vertices = fe;
            fk.inTangents = fi;
            fk.outTangents = fb;
            break;
          default:
            throw new Error("propAddFactored: unsupported property value type");
        }
        return fk;
      }
      function dM(fd, fc, fb) {
        return cQ(fd, fc, -1, fb);
      }
      function O(fd, fc, fb) {
        return cQ(fd, fc, 1, fb);
      }
      function bN(fi, fb, fd, fc, fe, fg) {
        var ff = (fi - fb) / (fd - fb);
        var fj = dM(fe, fc, fg);
        var fh = cQ(fc, fj, ff, fg);
        return fh;
      }
      function co(fd, fc, fb) {
        return cQ(fd, fd, fc - 1, fb);
      }
      function U(fb) {
        return Math.sqrt(bD(fb));
      }
      function bD(fe) {
        var fb = 0;
        var fc = fe.length;
        for (var fd = 0; fd < fc; fd += 1) {
          fb += fe[fd] * fe[fd];
        }
        return fb;
      }
      function dQ() {
        if (arguments.length < 2) {
          throw Error("vecNDForEachComponent must have at least 2 arguments");
        }
        var ff = arguments[arguments.length - 1];
        var fe = [];
        for (var fc = 0; fc < arguments.length - 1; fc += 1) {
          fe.push(arguments[fc]);
        }
        if (fe.length == 0) {
          return;
        }
        el.apply(null, fe);
        var fb = [];
        for (var fg = 0; fg < fe[0].length; fg += 1) {
          var fd = [];
          for (var fc = 0; fc < fe.length; fc += 1) {
            fd.push(fe[fc][fg]);
          }
          fb.push(ff.apply(null, fd));
        }
        return fb;
      }
      function el() {
        for (var fb = 1; fb < arguments.length; fb += 1) {
          if (arguments[fb].length != arguments[0].length) {
            throw new Error("vectors must have equal length");
          }
        }
        return;
      }
      function aZ(fc, fb) {
        return dQ(fc, fb, function (fe, fd) {
          return fe + fd;
        });
      }
      function b1(fc, fb) {
        return dQ(fc, fb, function (fe, fd) {
          return fe - fd;
        });
      }
      function eJ(fc, fb) {
        return dQ(fc, fb, function (fe, fd) {
          return fe * fd;
        });
      }
      function cX(fc, fb) {
        return dQ(fc, fb, function (fe, fd) {
          return fe / fd;
        });
      }
      function aS(fb, fc) {
        return dQ(fc, function (fd) {
          return fb * fd;
        });
      }
      function dO() {
        this.m = new Array();
        this.m[0] = new Array();
        this.m[1] = new Array();
        this.m[2] = new Array();
        this.m[0][0] = 1;
        this.m[0][1] = 0;
        this.m[0][2] = 0;
        this.m[1][0] = 0;
        this.m[1][1] = 1;
        this.m[1][2] = 0;
        this.m[2][0] = 0;
        this.m[2][1] = 0;
        this.m[2][2] = 1;
        this.applyBefore = function (fb) {
          var fc = t(this, fb);
          this.m = fc.m;
        };
        this.applyAfter = function (fb) {
          var fc = t(fb, this);
          this.m = fc.m;
        };
        this.transform = function (fc) {
          var fb = new Array();
          fb[0] =
            fc[0] * this.m[0][0] + fc[1] * this.m[0][1] + 1 * this.m[0][2];
          fb[1] =
            fc[0] * this.m[1][0] + fc[1] * this.m[1][1] + 1 * this.m[1][2];
          return fb;
        };
        this.transformVector = function (fb) {
          var fd = this.transform([0, 0]);
          var fc = this.transform(fb);
          return [fc[0] - fd[0], fc[1] - fd[1]];
        };
        this.to1DArray = function () {
          return [
            this.m[0][0],
            this.m[0][1],
            this.m[0][2],
            this.m[1][0],
            this.m[1][1],
            this.m[1][2],
            this.m[2][0],
            this.m[2][1],
            this.m[2][2],
          ];
        };
        this.from1DArray = function (fb) {
          this.m[0][0] = fb[0];
          this.m[0][1] = fb[1];
          this.m[0][2] = fb[2];
          this.m[1][0] = fb[3];
          this.m[1][1] = fb[4];
          this.m[1][2] = fb[5];
          this.m[2][0] = fb[6];
          this.m[2][1] = fb[7];
          this.m[2][2] = fb[8];
        };
        this.getRotation = function () {
          var fb = Math.atan2(this.m[0][1], this.m[1][1]);
          var fc = (fb * 180) / Math.PI;
          return fc;
        };
        this.getScaleFactor = function () {
          return this.transformVector([1, 1]);
        };
      }
      function t(ff, fe) {
        var fb = new dO();
        for (var fd = 0; fd < 3; fd += 1) {
          for (var fc = 0; fc < 3; fc += 1) {
            fb.m[fd][fc] = 0;
            for (var fg = 0; fg < 3; fg += 1) {
              fb.m[fd][fc] += ff.m[fd][fg] * fe.m[fg][fc];
            }
          }
        }
        return fb;
      }
      function cj(fd) {
        var fc = (fd / 360) * 2 * Math.PI;
        var fb = new dO();
        fb.m[0][0] = Math.cos(fc);
        fb.m[0][1] = Math.sin(fc);
        fb.m[1][0] = -Math.sin(fc);
        fb.m[1][1] = Math.cos(fc);
        fb.m[0][2] = 0;
        fb.m[1][2] = 0;
        fb.m[2][0] = 0;
        fb.m[2][1] = 0;
        fb.m[2][2] = 1;
        return fb;
      }
      function ah(fd, fc) {
        var fb = new dO();
        fb.applyAfter(bg([fc[0] * -1, fc[1] * -1]));
        fb.applyAfter(cj(fd));
        fb.applyAfter(bg(fc));
        return fb;
      }
      function cH(fb) {
        return cj(-fb);
      }
      function dI(fc) {
        var fb = new dO();
        fb.m[0][0] = fc[0];
        fb.m[0][1] = 0;
        fb.m[1][0] = 0;
        fb.m[1][1] = fc[1];
        fb.m[0][2] = 0;
        fb.m[1][2] = 0;
        fb.m[2][0] = 0;
        fb.m[2][1] = 0;
        fb.m[2][2] = 1;
        return fb;
      }
      function bg(fc) {
        var fb = new dO();
        fb.m[0][0] = 1;
        fb.m[0][1] = 0;
        fb.m[0][2] = fc[0];
        fb.m[1][0] = 0;
        fb.m[1][1] = 1;
        fb.m[1][2] = fc[1];
        fb.m[2][0] = 0;
        fb.m[2][1] = 0;
        fb.m[2][3] = 1;
        return fb;
      }
      function dY(fd, fe, fc) {
        fc = fc || {};
        var fb = cd(fd, fe);
        if (fd.parent) {
          fb.applyAfter(dY(fd.parent, fe, fc));
        } else {
          if (fc.forceCompSquarePixels) {
            fb.applyAfter(dI([fd.containingComp.pixelAspect, 1]));
          }
        }
        return fb;
      }
      function cd(fc, fg) {
        var fb = new dO();
        if (fc.adjustmentLayer) {
          return fb;
        }
        var fh = fc.containingComp.pixelAspect;
        var fe = fc.parent == null ? fh : a8(fc.parent);
        var fd = a8(fc);
        var ff = fd / fe;
        fb.applyAfter(
          bg(-1 * fc.property("anchorPoint").valueAtTime(fg, false)),
        );
        fb.applyAfter(
          dI([
            (fc.property("scale").valueAtTime(fg, false)[0] / 100) * ff,
            fc.property("scale").valueAtTime(fg, false)[1] / 100,
          ]),
        );
        fb.applyAfter(dI([fe, 1]));
        fb.applyAfter(cj(-1 * fc.property("rotation").valueAtTime(fg, false)));
        fb.applyAfter(dI([1 / fe, 1]));
        fb.applyAfter(bg(fc.property("position").valueAtTime(fg, false)));
        return fb;
      }
      function ak(fd, fe, fc) {
        fc = fc || {};
        var fb = cE(fd, fe);
        if (fd.parent) {
          fb.applyBefore(ak(fd.parent, fe, fc));
        } else {
          if (fc.forceCompSquarePixels) {
            fb.applyBefore(dI([1 / fd.containingComp.pixelAspect, 1]));
          }
        }
        return fb;
      }
      function cE(fc, fg) {
        var fb = new dO();
        if (fc.adjustmentLayer) {
          return fb;
        }
        var fh = fc.containingComp.pixelAspect;
        var fe = fc.parent == null ? fh : a8(fc.parent);
        var fd = a8(fc);
        var ff = fd / fe;
        fb.applyBefore(bg(fc.property("anchorPoint").valueAtTime(fg, false)));
        fb.applyBefore(
          dI([
            1 / ((fc.property("scale").valueAtTime(fg, false)[0] / 100) * ff),
            100 / fc.property("scale").valueAtTime(fg, false)[1],
          ]),
        );
        fb.applyBefore(dI([1 / fe, 1]));
        fb.applyBefore(cj(fc.property("rotation").valueAtTime(fg, false)));
        fb.applyBefore(dI([fe, 1]));
        fb.applyBefore(bg(-1 * fc.property("position").valueAtTime(fg, false)));
        return fb;
      }
      function ee(fe, fc, fd) {
        var fb = dY(fe, fd);
        fb.applyAfter(ak(fc, fd));
        return fb;
      }
      function aP(fe, fc) {
        var fb = dv(fe);
        if (fe.matchName === "ADBE Position") {
          if (fb.parent === null) {
            var fd = new dO();
            return fd;
          }
          fb = fb.parent;
        }
        return dY(fb, fc);
      }
      function dv(fb) {
        if (fb.parentProperty) {
          return dv(fb.parentProperty);
        } else {
          return fb;
        }
      }
      function a8(fb) {
        var fc = fb.source != null ? fb.source.pixelAspect : 1;
        if (fb.adjustmentLayer) {
          fc = fb.containingComp.pixelAspect;
        }
        return fc;
      }
      function bT(fc) {
        var fb = new dO();
        fb.from1DArray(k(fc.to1DArray()));
        return fb;
      }
      function aV(fc, fb) {
        return [fc[0] + fb[0], fc[1] + fb[1]];
      }
      function b7(fc, fb) {
        return [fc[0] - fb[0], fc[1] - fb[1]];
      }
      function ez(fc, fb) {
        return [fc[0] * fb[0], fc[1] * fb[1]];
      }
      function cq(fc, fb) {
        return [fc[0] / fb[0], fc[1] / fb[1]];
      }
      function aE(fb, fc) {
        return [fb * fc[0], fb * fc[1]];
      }
      function r(fb, fc) {
        return [fc[0] / fb, fc[1] / fb];
      }
      function ce(fb) {
        return Math.sqrt(fb[0] * fb[0] + fb[1] * fb[1]);
      }
      function cJ(fc, fb) {
        return ce(b7(fb, fc));
      }
      function d2(fc) {
        var fb = new dO();
        fb.applyAfter(bg(aE(-1, fc.anchorPoint)));
        fb.applyAfter(dI([fc.scale[0] / 100, fc.scale[1] / 100]));
        fb.applyAfter(cj(-1 * fc.rotation));
        fb.applyAfter(bg(fc.position));
        return fb;
      }
      function c7(fc) {
        var fb = new dO();
        fb.applyBefore(bg(fc.anchorPoint));
        fb.applyBefore(dI([100 / fc.scale[0], 100 / fc.scale[1]]));
        fb.applyBefore(cj(fc.rotation));
        fb.applyBefore(bg(-1 * fc.position));
        return fb;
      }
      function e5(fd, fc) {
        var fb = fc[0];
        var ff = fc[1];
        var fe = A(fd, [fb, ff, 1]);
        return [fe[0] / fe[2], fe[1] / fe[2]];
      }
      function cC(fc, fl) {
        var fo = fc[0][0];
        var fd = fc[0][1];
        var fu = fl[0][0];
        var fi = fl[0][1];
        var fv = fc[1][0];
        var fk = fc[1][1];
        var fg = fl[1][0];
        var fr = fl[1][1];
        var fh = fc[2][0];
        var fs = fc[2][1];
        var fn = fl[2][0];
        var fe = fl[2][1];
        var fp = fc[3][0];
        var ff = fc[3][1];
        var fw = fl[3][0];
        var fj = fl[3][1];
        var fm = a5(fo, fd, fv, fk, fh, fs, fp, ff);
        var ft = a5(fu, fi, fg, fr, fn, fe, fw, fj);
        var fb = B(ft, ed(fm));
        for (var fq = 0; fq < 9; fq += 1) {
          fb[fq] = fb[fq] / fb[8];
        }
        return fb;
      }
      function a1(fq, fm) {
        var fh = new Array();
        var fi = new Array();
        var ff = new Array();
        for (var fe = 0; fe < fq.vertices.length; fe += 1) {
          var fg = fq.vertices[fe];
          var fb = fq.inTangents[fe];
          var fp = fq.outTangents[fe];
          var fc = e5(fm, fg);
          var fo = [fb[0] + fg[0], fb[1] + fg[1]];
          var fd = e5(fm, fo);
          var fn = [fd[0] - fc[0], fd[1] - fc[1]];
          var fl = [fp[0] + fg[0], fp[1] + fg[1]];
          var fk = e5(fm, fl);
          var fj = [fk[0] - fc[0], fk[1] - fc[1]];
          fh.push(fc);
          fi.push(fn);
          ff.push(fj);
        }
        fq.vertices = fh;
        fq.inTangents = fi;
        fq.outTangents = ff;
        return fq;
      }
      function ep() {
        var fb = [1, 0, 0, 0, 1, 0, 0, 0, 1];
        return fb;
      }
      function cO(fc) {
        var fe = fc instanceof Array ? fc[0] : fc;
        var fd = fc instanceof Array ? fc[1] : fc;
        var fb = [fe, 0, 0, 0, fd, 0, 0, 0, 1];
        return fb;
      }
      function k(fc) {
        var fe = ed(fc);
        var fd = dt(fc);
        var fb = [
          fe[0] / fd,
          fe[1] / fd,
          fe[2] / fd,
          fe[3] / fd,
          fe[4] / fd,
          fe[5] / fd,
          fe[6] / fd,
          fe[7] / fd,
          fe[8] / fd,
        ];
        return fb;
      }
      function B(fc, fb) {
        var fh = Array(9);
        for (var fg = 0; fg != 3; ++fg) {
          for (var fe = 0; fe != 3; ++fe) {
            var ff = 0;
            for (var fd = 0; fd != 3; ++fd) {
              ff += fc[3 * fg + fd] * fb[3 * fd + fe];
            }
            fh[3 * fg + fe] = ff;
          }
        }
        return fh;
      }
      function e9(fc) {
        var fb =
          fc[0] +
          " , " +
          fc[1] +
          " , " +
          fc[2] +
          "\n" +
          fc[3] +
          " , " +
          fc[4] +
          " , " +
          fc[5] +
          "\n" +
          fc[6] +
          " , " +
          fc[7] +
          " , " +
          fc[8] +
          "\n";
        return fb;
      }
      function aO(fc, ff, fe) {
        var fb = dY(ff, fe).to1DArray();
        var fg = B(fc, fb);
        var fd = B(k(fb), fg);
        return fd;
      }
      function A(fb, fc) {
        return [
          fb[0] * fc[0] + fb[1] * fc[1] + fb[2] * fc[2],
          fb[3] * fc[0] + fb[4] * fc[1] + fb[5] * fc[2],
          fb[6] * fc[0] + fb[7] * fc[1] + fb[8] * fc[2],
        ];
      }
      function ed(fb) {
        return [
          fb[4] * fb[8] - fb[5] * fb[7],
          fb[2] * fb[7] - fb[1] * fb[8],
          fb[1] * fb[5] - fb[2] * fb[4],
          fb[5] * fb[6] - fb[3] * fb[8],
          fb[0] * fb[8] - fb[2] * fb[6],
          fb[2] * fb[3] - fb[0] * fb[5],
          fb[3] * fb[7] - fb[4] * fb[6],
          fb[1] * fb[6] - fb[0] * fb[7],
          fb[0] * fb[4] - fb[1] * fb[3],
        ];
      }
      function dt(fb) {
        var fk = fb[0];
        var fj = fb[1];
        var fi = fb[2];
        var fh = fb[3];
        var fg = fb[4];
        var ff = fb[5];
        var fe = fb[6];
        var fd = fb[7];
        var fc = fb[8];
        var fl =
          fk * (fg * fc - ff * fd) -
          fj * (fh * fc - ff * fe) +
          fi * (fh * fd - fg * fe);
        return fl;
      }
      function a5(fd, fi, fc, fh, fb, fg, fk, ff) {
        var fe = [fd, fc, fb, fi, fh, fg, 1, 1, 1];
        var fj = A(ed(fe), [fk, ff, 1]);
        return B(fe, [fj[0], 0, 0, 0, fj[1], 0, 0, 0, fj[2]]);
      }
      function cW(fd, fe, fc) {
        fc = fc || {};
        for (var fb = 0; fb < fd.length; fb += 1) {
          if (fc.minTime && au(fd[fb].time, fc.minTime)) {
            continue;
          }
          if (fc.maxTime && j(fd[fb].time, fc.maxTime)) {
            continue;
          }
          if (fc.minTimeExclusive && eC(fd[fb].time, fc.minTime)) {
            continue;
          }
          if (fc.maxTimeExclusive && c1(fd[fb].time, fc.maxTime)) {
            continue;
          }
          fe(fd[fb], fc);
        }
      }
      function dV(fc, fd, fb) {
        cW(
          fc,
          function (fe) {
            bf(fe, fd);
          },
          fb,
        );
      }
      function ei(fd, fb, fc) {
        cW(
          fd,
          function (fe) {
            cz(fe, fb);
          },
          fc,
        );
      }
      function bq(fd, fc, fb) {
        cW(
          fd,
          function (fe) {
            u(fe, fc);
          },
          fb,
        );
      }
      function eY(fc, fb) {
        cW(
          fc,
          function (fd) {
            aq(fd);
          },
          fb,
        );
      }
      function bf(fc, fd) {
        function fb(fe) {
          fe.vertices += fd;
        }
        if (fc.value.isShape) {
          fb(fc.value);
        } else {
          fc.value += fd;
        }
      }
      function eS(fc, fb) {
        if (fc instanceof Array && fb instanceof Array) {
          if (fc.length != fb.length) {
            return false;
          }
          for (var fd = 0; fd < fc.length; fd += 1) {
            if (!eS(fc[fd], fb[fd])) {
              return false;
            }
          }
          return true;
        }
        if (fc instanceof Object && fb instanceof Object) {
          return JSON.stringify(fc) === JSON.stringify(fb);
        }
        return fc === fb;
      }
      function dk(fb) {
        return bt(fb);
      }
      function cp(fb) {
        this.message = fb;
      }
      function cl(fh, ff, fd) {
        var fc = [];
        if (fh.numKeys == 0) {
          return fc;
        }
        var fb = ff == undefined ? 1 : eT(fh, ff);
        var fg = fd == undefined ? fh.numKeys : eg(fh, fd);
        for (var fe = fb; fe <= fg; fe++) {
          fc.push(c2(fh, fe));
        }
        return fc;
      }
      function b2(fb) {
        return bP(fb, fb.selectedKeys);
      }
      function bP(fe, fd) {
        var fb = [];
        if (fd.length == 0) {
          return fb;
        }
        for (var fc = 0; fc < fd.length; fc += 1) {
          fb.push(c2(fe, fd[fc]));
        }
        return fb;
      }
      function bw(fc) {
        var fb = fc.map(function (fd) {
          return a2(fd);
        });
        return fb;
      }
      function eP(fg) {
        if (fg.length == 0) {
          return bw(fg);
        }
        var ff = fg[0].time;
        var fc = fg[fg.length - 1].time;
        var fb = [];
        for (var fe = fg.length - 1; fe >= 0; fe--) {
          var fd = a2(fg[fe]);
          fd.time = fc - (fd.time - ff);
          fd = du(fd);
          fb.push(fd);
        }
        return fb;
      }
      function c0(fe, fc, fd) {
        fd = fd || {};
        if (!(fe instanceof Array)) {
          throw new Error(
            "keyframeRegionShift: keyRegion must be an array but is " + fe,
          );
        }
        var fb = fd.overwriteOriginal == true ? fe : bw(fe);
        fb = fb.map(function (ff) {
          ff.time += fc;
          return ff;
        });
        return fb;
      }
      function cf(fh, fe) {
        if (!(fh instanceof Array)) {
          throw new Error(
            "keyframeRegionTimeStretch: keyRegion must be an array but is " +
              fh,
          );
        }
        var fb = bw(fh);
        if (fh.length <= 1) {
          return fb;
        }
        var fg = fh[0].time;
        var fd = fh[fh.length - 1].time;
        var ff = fd - fg;
        var fc = fe / ff;
        fb = fb.map(function (fi) {
          fi.time = fg + (fi.time - fg) * fc;
          return fi;
        });
        return fb;
      }
      function dl(ff, fh, fb, fi) {
        fi = fi || {};
        var fj = bw(ff);
        var fg = bw(ff);
        var fe = fi.pingpong ? eP(ff) : fg;
        for (var fd = 1; fd < fh; fd += 1) {
          var fc = fd % 2 == 0 ? fg : fe;
          fj = a(fj, fc, fb);
        }
        return fj;
      }
      function a(fh, fg, fi) {
        fi = fi || 0;
        if (fi < 0) {
          throw new cp("keyframeRegionAppend: distance may not be negative");
        }
        if (fh.length == 0) {
          return bw(fg);
        }
        if (fg.length == 0) {
          return bw(fh);
        }
        var fd = bw(fh);
        var fe = fd.pop();
        var fc = fe.time - fg[0].time + fi;
        var fb = c0(fg, fc);
        var ff = fb.shift();
        fd.appendArray(ex(fe, ff));
        fd.appendArray(fb);
        return fd;
      }
      function ex(fc, fb) {
        if (!cy(fc, fb)) {
          if (fc.time > fb.time) {
            throw new cp(
              "mergeKeyframesIfNecessaryAndPossible: keyA.time must be less or equal to keyB.time",
            );
          }
          return [fc, fb];
        } else {
          if (eS(fc.value, fb.value)) {
            var fd = a2(fc);
            em(fd, fb, false);
            return [fd];
          } else {
            var fe = 0.0004;
            fb.time = fc.time + fe;
            return [fc, fb];
          }
        }
      }
      function T(fc, fb) {
        return eS(fc, fb);
      }
      function cy(fc, fb) {
        return bR(fc.time, fb.time);
      }
      function bO(fb) {
        var fg = [];
        for (var fc = 0; fc < fb.vertices.length - 1; fc += 1) {
          var fh = fb.vertices[fc];
          var fd = fb.vertices[fc + 1];
          var ff = fb.outTangents[fc] + fh;
          var fe = fb.inTangents[fc + 1] + fd;
          fg.push(
            new aM(fh[0], fh[1], ff[0], ff[1], fe[0], fe[1], fd[0], fd[1]),
          );
        }
        if (fb.closed) {
          var fi = fb.vertices.length - 1;
          var fh = fb.vertices[fi];
          var fd = fb.vertices[0];
          var ff = fb.outTangents[fi] + fh;
          var fe = fb.inTangents[0] + fd;
          fg.push(
            new aM(fh[0], fh[1], ff[0], ff[1], fe[0], fe[1], fd[0], fd[1]),
          );
        }
        return fg;
      }
      function c2(fd, fc) {
        var fb = {};
        fb.value = cI(fd.keyValue(fc));
        fb.time = fd.keyTime(fc);
        fb.InInterpolationType = ds(fd.keyInInterpolationType(fc));
        fb.OutInterpolationType = ds(fd.keyOutInterpolationType(fc));
        fb.InTemporalEase = fd.keyInTemporalEase(fc).map(c);
        fb.OutTemporalEase = fd.keyOutTemporalEase(fc).map(c);
        fb.TemporalContinuous = fd.keyTemporalContinuous(fc);
        fb.TemporalAutoBezier = fd.keyTemporalAutoBezier(fc);
        if (E(fd.propertyValueType)) {
          fb.isSpatial = true;
          fb.Roving = fd.keyRoving(fc);
          fb.InSpatialTangent = fd.keyInSpatialTangent(fc);
          fb.OutSpatialTangent = fd.keyOutSpatialTangent(fc);
          fb.SpatialContinuous = fd.keySpatialContinuous(fc);
          fb.SpatialAutoBezier = fd.keySpatialAutoBezier(fc);
        }
        return fb;
      }
      function eD(fc, fb) {
        return bS(fb, fc.valueAtTime(fb, true), fc.propertyValueType);
      }
      function bS(fg, ff, fe) {
        var fd = {};
        fd.value = cI(ff);
        fd.time = fg;
        fd.InInterpolationType = ds(KeyframeInterpolationType.HOLD);
        fd.OutInterpolationType = ds(KeyframeInterpolationType.HOLD);
        var fb = new KeyframeEase(0.5, 50);
        var fc = [fb];
        if (fe == PropertyValueType.ThreeD) {
          fc = [fb, fb, fb];
        } else {
          if (fe == PropertyValueType.TwoD) {
            fc = [fb, fb];
          }
        }
        fd.InTemporalEase = fc;
        fd.OutTemporalEase = fc;
        fd.TemporalContinuous = false;
        fd.TemporalAutoBezier = false;
        if (E(fe)) {
          fd.isSpatial = true;
          fd.Roving = false;
          fd.InSpatialTangent = fd.value.length == 3 ? [0, 0, 0] : [0, 0];
          fd.OutSpatialTangent = fd.value.length == 3 ? [0, 0, 0] : [0, 0];
          fd.SpatialContinuous = false;
          fd.SpatialAutoBezier = false;
        }
        return fd;
      }
      function cI(fb) {
        if (fb instanceof TextDocument) {
          return da.toJSON(fb);
        }
        if (fb instanceof Shape) {
          return ao.toJSON(fb);
        } else {
          return fb;
        }
      }
      function b5(fb, fc) {
        if (fb.isTextDocument) {
          return da.fromJSON(fb, fc.value);
        } else {
          if (fb.isShape) {
            return ao.fromJSON(fb);
          } else {
            return fb;
          }
        }
      }
      function E(fb) {
        return (
          fb == PropertyValueType.TwoD_SPATIAL ||
          fb == PropertyValueType.ThreeD_SPATIAL
        );
      }
      function c(fc) {
        var fb = { influence: fc.influence, speed: fc.speed };
        return fb;
      }
      function cR(fc) {
        var fb = fc.influence;
        fb = Math.min(fb, 100);
        fb = Math.max(fb, 0.1);
        var fd = new KeyframeEase(fc.speed, fb);
        return fd;
      }
      function ds(fc) {
        for (var fb in KeyframeInterpolationType) {
          if (KeyframeInterpolationType.hasOwnProperty(fb)) {
            if (KeyframeInterpolationType[fb] == fc) {
              return fb;
            }
          }
        }
        throw "invalid KeyframeInterpolationType:" + fc;
      }
      function bU(fb) {
        return KeyframeInterpolationType[fb];
      }
      function a2(fb) {
        return bt(fb);
      }
      function bM(fc, fb) {
        fc.TemporalContinuous = false;
        fc.TemporalAutoBezier = false;
        if (fb) {
          fc.OutInterpolationType = fc.InInterpolationType;
          fc.OutTemporalEase = fc.InTemporalEase;
        } else {
          fc.InInterpolationType = fc.OutInterpolationType;
          fc.InTemporalEase = fc.OutTemporalEase;
        }
        fc.Roving = false;
        if (fc.isSpatial) {
          fc.SpatialContinuous = false;
          fc.SpatialAutoBezier = false;
          if (fb) {
            fc.OutSpatialTangent = fc.InSpatialTangent;
          } else {
            fc.InSpatialTangent = fc.OutSpatialTangent;
          }
        }
        return fc;
      }
      function du(fb) {
        fc = fb.OutInterpolationType;
        fb.OutInterpolationType = fb.InInterpolationType;
        fb.InInterpolationType = fc;
        fc = fb.OutTemporalEase;
        fb.OutTemporalEase = fb.InTemporalEase;
        fb.InTemporalEase = fc;
        if (fb.isSpatial) {
          fc = fb.OutSpatialTangent;
          fb.OutSpatialTangent = fb.InSpatialTangent;
          fb.InSpatialTangent = fc;
        }
        return fb;
      }
      function em(fc, fb, fd) {
        fc.TemporalContinuous = false;
        fc.TemporalAutoBezier = false;
        if (fd) {
          fc.InInterpolationType = fb.InInterpolationType;
          fc.InTemporalEase = fb.InTemporalEase;
        } else {
          fc.OutInterpolationType = fb.OutInterpolationType;
          fc.OutTemporalEase = fb.OutTemporalEase;
        }
        if (fc.isSpatial) {
          fc.SpatialContinuous = false;
          fc.SpatialAutoBezier = false;
          if (fd) {
            fc.InSpatialTangent = fb.InSpatialTangent;
          } else {
            fc.OutSpatialTangent = fb.OutSpatialTangent;
          }
        }
        return fc;
      }
      function dE(fc) {
        var fb = fc.property("ADBE Mask Parade");
        if (fb == null) {
          return 0;
        }
        return fb.numProperties;
      }
      function cB(fd, fe) {
        var fb = fd.property("ADBE Mask Parade");
        if (fb == null) {
          return;
        }
        for (var fc = 1; fc <= fb.numProperties; fc += 1) {
          fe(fb.property(fc));
        }
      }
      function aR(ff, fe, fd) {
        var fc = ff.property("ADBE Mask Parade");
        if (fc == null) {
          throw new Error(
            "cannot create mask on layer " +
              ff.name +
              ": the layer has no mask group",
          );
        }
        var fb = fc.addProperty("Mask");
        if (fb == null) {
          throw new Error(
            "cannot create mask on layer " +
              ff.name +
              ": creating the mask failed",
          );
        }
        var fg = fb.property("ADBE Mask Shape");
        fg.setValue(fd);
        fb.name = fe;
        return fb;
      }
      function by(ff, fe, fc, fb) {
        var fd = new Shape();
        if (fd == null) {
          throw new Error("could not create mask shape");
        }
        fd.vertices = [
          [ff, fe],
          [ff, fb],
          [fc, fb],
          [fc, fe],
        ];
        return fd;
      }
      function af(fh, fg, fc, fb) {
        var ff = (fh + fc) / 2;
        var fd = (fg + fb) / 2;
        var fi = Math.abs(fc - fh) / 2;
        var fe = Math.abs(fb - fg) / 2;
        return e0(ff, fd, fi, fe);
      }
      function e0(fg, fe, fd, fc) {
        var fj = 0.5522847498;
        var fm = new Shape();
        if (fm == null) {
          throw new Error("could not create mask shape");
        }
        var ff = [fg, fe - fc];
        var fi = [fg, fe + fc];
        var fb = [fg - fd, fe];
        var fh = [fg + fd, fe];
        var fl = fj * fd;
        var fk = fj * fc;
        fm.vertices = [ff, fb, fi, fh];
        fm.inTangents = [
          [fl, 0],
          [0, -fk],
          [-fl, 0],
          [0, fk],
        ];
        fm.outTangents = [
          [-fl, 0],
          [0, fk],
          [fl, 0],
          [0, -fk],
        ];
        return fm;
      }
      function dU(fb, fl, fd, fc) {
        var fm = new Shape();
        if (fm == null) {
          throw new Error("could not create mask shape");
        }
        var fk = [0, fl / 2];
        var fj = [fb - fd * fc, fl / 2];
        var fi = [fb - fd * fc, fd / 2];
        var fh = [fb, 0];
        var fg = [fi[0], -fi[1]];
        var ff = [fj[0], -fj[1]];
        var fe = [fk[0], -fk[1]];
        fm.vertices = [fk, fj, fi, fh, fg, ff, fe];
        return fm;
      }
      function ad(fb) {
        var fc = fb.property("ADBE Mask Shape");
        return eU(fc);
      }
      function eU(fd) {
        if (fd.numKeys < 2) {
          return true;
        }
        var fc = fd.keyValue(1).vertices.length;
        for (var fb = 2; fb < fd.numKeys; fb += 1) {
          if (fd.keyValue(fb).vertices.length != fc) {
            return false;
          }
        }
        return true;
      }
      function cA(fd) {
        var fb = { max: 0, min: 9999999999 };
        var fc = ck(
          fd,
          function (fg, fe) {
            var ff = fg.vertices.length;
            fe.min = Math.min(fe.min, ff);
            fe.max = Math.max(fe.max, ff);
            return fe;
          },
          fb,
        );
        return fc;
      }
      function et(fb) {
        var fc = cA(fb);
        if (fc.min < fc.max) {
          eh(fb, fc.max);
        }
      }
      function eh(fb, fc) {
        dp(fb, function (fd) {
          var fe = new Array();
          var fg = new Array();
          var fh = new Array();
          for (var ff = 0; ff < fd.vertices.length; ff += 1) {
            fe[ff] = [fd.vertices[ff][0], fd.vertices[ff][1]];
            fg[ff] = [fd.inTangents[ff][0], fd.inTangents[ff][1]];
            fh[ff] = [fd.outTangents[ff][0], fd.outTangents[ff][1]];
          }
          for (ff = fd.vertices.length; ff < fc; ff++) {
            fe[ff] = [fe[ff - 1][0], fe[ff - 1][1]];
            fh[ff] = [fh[ff - 1][0], fh[ff - 1][1]];
            fg[ff] = [0, 0];
            fh[ff - 1] = [0, 0];
          }
          fd.vertices = fe;
          fd.inTangents = fg;
          fd.outTangents = fh;
          return fd;
        });
      }
      function az(fc) {
        if (fc.length == 0) {
          throw new Error("cannot compute bounding box for empty point cloud");
        }
        var fd = {
          x: { max: fc[0][0], min: fc[0][0] },
          y: { max: fc[0][1], min: fc[0][1] },
        };
        for (var fb = 1; fb < fc.length; fb += 1) {
          fd.x.min = Math.min(fd.x.min, fc[fb][0]);
          fd.x.max = Math.max(fd.x.max, fc[fb][0]);
          fd.y.min = Math.min(fd.y.min, fc[fb][1]);
          fd.y.max = Math.max(fd.y.max, fc[fb][1]);
        }
        dZ(fd);
        return fd;
      }
      function e4(fd, fc, fe) {
        var fb = {
          x: { max: fd.x.max, min: fd.x.min },
          y: { max: fd.y.max, min: fd.y.min },
        };
        if (fe == "add") {
          fb.x.min = Math.min(fb.x.min, fc.x.min);
          fb.x.max = Math.max(fb.x.max, fc.x.max);
          fb.y.min = Math.min(fb.y.min, fc.y.min);
          fb.y.max = Math.max(fb.y.max, fc.y.max);
        } else {
          if (fe == "intersect") {
            fb.x.min = Math.max(fb.x.min, fc.x.min);
            fb.x.max = Math.min(fb.x.max, fc.x.max);
            fb.y.min = Math.max(fb.y.min, fc.y.min);
            fb.y.max = Math.min(fb.y.max, fc.y.max);
          } else {
            if (fe == "subtract") {
              if (fc.y.min <= fb.y.min && fc.y.max >= fb.y.max) {
                if (fc.x.min < fb.x.max && fc.x.max >= fb.x.max) {
                  fb.x.max = fc.x.min;
                }
                if (fc.x.min <= fb.x.min && fc.x.max > fb.x.min) {
                  fb.x.min = fc.x.max;
                }
              }
              if (fc.x.min <= fb.x.min && fc.x.max >= fb.x.max) {
                if (fc.y.min <= fb.y.min && fc.y.max > fb.y.min) {
                  fb.y.min = fc.y.max;
                }
                if (fc.y.min < fb.y.max && fc.y.max >= fb.y.max) {
                  fb.y.max = fc.y.min;
                }
              }
            } else {
              if (fe == "ignore") {
              } else {
                throw new Error("mergeBoundingBox: unknown mode " + fe);
              }
            }
          }
        }
        dZ(fb);
        return fb;
      }
      function dZ(fb) {
        fb.x.mid = (fb.x.max + fb.x.min) / 2;
        fb.x.size = fb.x.max - fb.x.min;
        fb.y.mid = (fb.y.max + fb.y.min) / 2;
        fb.y.size = fb.y.max - fb.y.min;
      }
      function eM(fc, fb) {
        fc.x.min -= fb[0];
        fc.x.max += fb[0];
        fc.y.min -= fb[1];
        fc.y.max += fb[1];
        dZ(fc);
      }
      function cg(fb) {
        var fd = bO(fb);
        var fe = fd[0].bbox();
        for (var fc = 1; fc < fd.length; fc += 1) {
          fe = e4(fe, fd[fc].bbox(), "add");
        }
        return fe;
      }
      function cm(fb, ff) {
        var fc = fb.property("ADBE Mask Shape").valueAtTime(ff, false);
        var fd = fb.property("ADBE Mask Offset").valueAtTime(ff, false);
        var fe = fb.property("ADBE Mask Feather").valueAtTime(ff, false);
        var fg = cg(fc);
        eM(fg, [fd + fe[0] / 2, fd + fe[1] / 2]);
        return fg;
      }
      function bx(fb, fc) {
        var fd = null;
        cB(fb, function (fe) {
          var fg = cm(fe, fc);
          if (fe.maskMode == MaskMode.NONE) {
            return;
          }
          if (fe.maskMode == MaskMode.ADD) {
            ff = "add";
          } else {
            if (fe.maskMode == MaskMode.SUBTRACT) {
              ff = "ignore";
            } else {
              if (fe.maskMode == MaskMode.INTERSECT) {
                ff = "intersect";
              } else {
                if (fe.maskMode == MaskMode.LIGHTEN) {
                  ff = "add";
                } else {
                  if (fe.maskMode == MaskMode.DARKEN) {
                    ff = "intersect";
                  } else {
                    if (fe.maskMode == MaskMode.DIFFERENCE) {
                      ff = "add";
                    } else {
                      throw new Error("unsupported mask mode: " + fe.maskMode);
                    }
                  }
                }
              }
            }
          }
          if (fd == null) {
            if (fe.maskMode == MaskMode.SUBTRACT) {
              fd = d5(fb.sourceRectAtTime(fc, true));
            } else {
              fd = fg;
            }
          } else {
            fd = e4(fd, fg, ff);
          }
        });
        if (fd == null) {
          fd = d5(fb.sourceRectAtTime(fc, true));
        }
        return fd;
      }
      function dF(fb) {
        return {
          height: fb.y.size,
          left: fb.x.min,
          top: fb.y.min,
          width: fb.x.size,
        };
      }
      function d5(fb) {
        var fc = {
          x: { max: fb.left + fb.width, min: fb.left },
          y: { max: fb.top + fb.height, min: fb.top },
        };
        dZ(fc);
        return fc;
      }
      function a7(fe, fd, fb) {
        var fc = cG(fd + "/" + bi.basename(fe));
        if (fc == null) {
          fc = ew(fe, fd, fb);
        }
        return fc;
      }
      function ew(fh, fg, fd) {
        fd = fd || {};
        var fb = fd.importOptions || new ImportOptions();
        var ff = cY(fg, fd.root);
        var fe = new File(fh);
        if (!fe.exists) {
          throw new Error("could not find file:" + fe.fsName);
        }
        fb.file = fe;
        var fc = app.project.importFile(fb);
        fc.parentFolder = ff;
        return fc;
      }
      function cY(fe, fb) {
        fe = cF(fe);
        if (dw(fe) || fb == undefined) {
          fb = app.project.rootFolder;
          fe = bh(fe);
        }
        var fc = ab(fe);
        var fd = fc.foldl(function (ff, fh) {
          if (ff == "..") {
            fg = fh == app.project.rootFolder ? fh : fh.parentFolder;
          } else {
            fg = aj(ff, fh);
          }
          return fg;
        }, fb);
        return fd;
      }
      function aj(fb, ff) {
        for (var fd = 1; fd <= ff.numItems; fd += 1) {
          var fc = ff.item(fd);
          if (fc.name == fb && fc instanceof FolderItem) {
            return fc;
          }
        }
        var fe = ff.items.addFolder(fb);
        return fe;
      }
      function Q(fe, fb) {
        fe = cF(fe);
        if (dw(fe) || fb == undefined) {
          fb = app.project.rootFolder;
          fe = bh(fe);
        }
        var fc = ab(fe);
        var fd = fc.foldl(function (ff, fh) {
          if (fh == null) {
            fg = null;
          } else {
            if (ff == "..") {
              fg = fh == app.project.rootFolder ? fh : fh.parentFolder;
            } else {
              fg = c5(ff, fh);
            }
          }
          return fg;
        }, fb);
        return fd;
      }
      function bI(fc, fb) {
        return Q(fc, fb) != null;
      }
      function c5(fb, fe) {
        for (var fd = 1; fd <= fe.numItems; fd += 1) {
          var fc = fe.item(fd);
          if (fc.name == fb && fc instanceof FolderItem) {
            return fc;
          }
        }
        return null;
      }
      function bV(fb, fe) {
        for (var fd = 1; fd <= fe.numItems; fd += 1) {
          var fc = fe.item(fd);
          if (fc.name == fb && !(fc instanceof FolderItem)) {
            return fc;
          }
        }
        return null;
      }
      function cF(fc) {
        var fb = fc.trim();
        fb = fb.replaceAll("\\", "/");
        return fb;
      }
      function dw(fb) {
        return fb.hasPrefix("/");
      }
      function bh(fc) {
        var fb = new RegExp("^(/*)?(.*)$");
        return fb.exec(fc)[2];
      }
      function e7(fc) {
        var fb = new RegExp("(/*)?$");
        return fc.replace(fb, "");
      }
      function ab(fc) {
        fc = bh(fc);
        fc = e7(fc);
        if (fc.containsOnlyWhitespace()) {
          return new Array();
        }
        var fb = fc.split("/");
        return fb;
      }
      function cV(fc) {
        if (fc == app.project.rootFolder) {
          return "/";
        }
        var fb = cV(fc.parentFolder);
        var fd = fb.hasSuffix("/") ? "" : "/";
        return fb + fd + fc.name;
      }
      function cG(fg, fb) {
        fg = cF(fg);
        if (dw(fg) || fb == undefined) {
          fb = app.project.rootFolder;
          fg = bh(fg);
        }
        var fc = ab(fg);
        var ff = fc.pop();
        var fe = fc.foldl(function (fh, fj) {
          if (fj == null) {
            fi = null;
          } else {
            if (fh == "..") {
              fi = fj == app.project.rootFolder ? fj : fj.parentFolder;
            } else {
              fi = c5(fh, fj);
            }
          }
          return fi;
        }, fb);
        if (fe == null) {
          return null;
        }
        var fd = bV(ff, fe);
        return fd;
      }
      function d7(fh, fg, fc, fd) {
        fd = fd || {};
        var fb = fc;
        for (var ff = 1; ff <= fh.numItems; ff += 1) {
          var fe = fh.item(ff);
          fb = fg(fe, fb);
          if (fd.includeSubfolders && fe instanceof FolderItem) {
            fb = d7(fe, fg, fb, fd);
          }
        }
        return fb;
      }
      function bu(ff, fe, fc, fd) {
        var fb = d7(
          ff,
          function (fg, fh) {
            if (fg instanceof CompItem) {
              fh = fe(fg, fh);
            }
            return fh;
          },
          fc,
          fd,
        );
        return fb;
      }
      function ay(fb, fd, fc) {
        cM(fb, fd);
        cM(fb, fc);
      }
      function cM(fb, ff) {
        var fh = fb;
        var fe = fh.inPoint;
        var fd = fh.outPoint;
        if (fh.startTime > ff) {
          var fg = fh.startTime - ff;
          fh.startTime = ff;
          fh.source.duration = fh.source.duration + fg;
          fd += fg;
          aC(fh, fg);
        }
        var fc = fh.startTime + fh.source.duration;
        if (fc < ff) {
          var fg = ff - fc;
          fh.source.duration = fh.source.duration + fg;
          fd += fg;
        }
        timeInPrecompTime = ff - fh.startTime;
        fh.inPoint = Math.min(fe, timeInPrecompTime);
        fh.outPoint = Math.max(fd, timeInPrecompTime);
      }
      function aC(fd, fc) {
        var fb = fd.source;
        y(fb, function (fe) {
          fe.startTime = fe.startTime + fc;
        });
      }
      function cD(fg, ff, fb, fi, fh, fd) {
        fd = fd || {};
        if (ff > fb) {
          var fc = ff;
          ff = fb;
          fb = fc;
          fc = fi;
          fi = fh;
          fh = fc;
        }
        if (fd.noClipping) {
          if (ff == fb) {
            throw new Error(
              "linear(t, tMin, tMax, vMin, vMax): tMin and tMax may not have the same value",
            );
          }
        } else {
          if (fg <= ff) {
            return fi;
          }
          if (fg >= fb) {
            return fh;
          }
        }
        var fe = (fg - ff) / (fb - ff);
        return fi + (fh - fi) * fe;
      }
      function b0(ff, fe, fb, fh, fg) {
        var fc = cD(ff, fe, fb, 0, 100);
        var fd = 1 - Math.pow(0.5, fc * 0.08);
        return fh + (fg - fh) * fd;
      }
      function dd(ff, fe, fb, fh, fg) {
        var fc = cD(ff, fe, fb, 100, 0);
        var fd = Math.pow(0.5, fc * 0.08);
        return fh + (fg - fh) * fd;
      }
      function d9(fb) {
        return function (fh, fg, fd, fi, fe) {
          if (fi.length != fe.length) {
            throw new Error(
              "can only interpolate between two arrays if their length is identical",
            );
          }
          var fc = [];
          for (var ff = 0; ff < fi.length; ff += 1) {
            fc.push(fb(fh, fg, fd, fi[ff], fe[ff]));
          }
          return fc;
        };
      }
      function aU(fb) {
        var fc = d9(fb);
        return function (fp, fe, fj, fn, ff) {
          if (fn.vertices.length != ff.vertices.length) {
            throw new Error(
              "shapes can only be interpolated if they have the same number of vertices!",
            );
          }
          var fl = [];
          var fg = [];
          var fm = [];
          for (var fh = 0; fh < fn.vertices.length; fh += 1) {
            var fi = fc(fp, fe, fj, fn.vertices[fh], ff.vertices[fh]);
            var fd = b7(
              fc(
                fp,
                fe,
                fj,
                aV(fn.vertices[fh], fn.inTangents[fh]),
                aV(ff.vertices[fh], ff.inTangents[fh]),
              ),
              fi,
            );
            var fo = b7(
              fc(
                fp,
                fe,
                fj,
                aV(fn.vertices[fh], fn.outTangents[fh]),
                aV(ff.vertices[fh], ff.outTangents[fh]),
              ),
              fi,
            );
            fl.push(fi);
            fg.push(fd);
            fm.push(fo);
          }
          var fk = new Shape();
          fk.vertices = fl;
          fk.inTangents = fg;
          fk.outTangents = fm;
          fk.closed = fn.closed;
          return fk;
        };
      }
      function dg(fc) {
        var fb = [];
        for (var fd = 0; fd < fc.length; fd += 1) {
          if (fc[fd] !== null) {
            fb.push(fc[fd]);
          }
        }
        return fb;
      }
      function bW(ff, fc, fj, fh, fk, fg) {
        fk = fk || {};
        var fb = 5000;
        var fi =
          fk.gravity === undefined
            ? fb
            : fk.gravity < 50
              ? cD(fk.gravity, 0, 50, fb * 0.25, fb)
              : cD(fk.gravity, 50, 100, fb, fb * 4, { noClipping: true });
        var fe = [];
        fe[dR] = [];
        fe[df] = [];
        fe[bJ] = [];
        fe[z] = [];
        fe[cP] = [];
        fe[aG] = [];
        fe[a6] = [];
        fe[H] = [];
        fe[cw] = [];
        fe[D] = [];
        fe[d1] = [];
        fe[ac] = [];
        fe[Z] = [];
        a4(fe, fj, fh);
        eI(fe, ff, fc);
        bm(fe, fi);
        if (!fk.preserveApexX) {
          a0(fe);
        }
        if (fg == "1") {
          eO(fe, fk);
        } else {
          cZ(fe);
        }
        if (!fk.subframeAccuracy) {
          var fd = function (fl) {
            if (fl == null) {
              return fl;
            }
            return ar(fl, fk.frameDuration);
          };
          fe[ac] = fe[ac].map(fd);
          fe[df] = fe[df].map(fd);
          fe[cw] = fe[cw].map(fd);
        }
        return fe;
      }
      function a4(fd, fm, fj) {
        function fb() {
          for (var fn = 0; fn < fm.length - 1; fn += 1) {
            if (Math.abs(fm[fn][1] - fm[fn + 1][1]) < 1) {
              fm.splice(fn + 1, 1);
              fj.splice(fn + 1, 1);
            }
          }
        }
        function fi(fn) {
          fd[H].push(fm[fn]);
          fd[D].push(fj[fn]);
        }
        function fc(fn) {
          fd[dR].push(fm[fn]);
          fd[bJ].push(fj[fn]);
        }
        function ff() {
          fd[H].push(null);
          fd[D].push(null);
        }
        function fg() {
          fd[dR].push(null);
          fd[bJ].push(null);
        }
        if (fm.length <= 1) {
          return;
        }
        var fh = null;
        fb();
        for (var fe = 0; fe < fm.length; fe += 1) {
          var fk = fm[fe][1];
          var fl = fe == fm.length - 1 ? null : fm[fe + 1][1];
          if (fh === null) {
            if (fl != null && fl > fk) {
              fi(fe);
            } else {
              ff();
              fc(fe);
            }
          } else {
            if (fh > fk && (fl == null || fl > fk)) {
              fi(fe);
            } else {
              if (fh < fk && (fl == null || fl < fk)) {
                fc(fe);
              }
            }
          }
          fh = fk;
        }
        if (fd[dR].length < fd[H].length) {
          fg();
        }
      }
      function eI(fe, fh, fd) {
        function fc(fm, fl) {
          if (!fe[d1][fm]) {
            fe[d1][fm] = [];
          }
          fe[d1][fm].push(fl);
        }
        var fi = null;
        var ff = 0;
        for (var fg = 0; fg < fh.length; fg += 1) {
          var fj = fh[fg][0];
          var fb = fd[fg];
          while (
            ff < fe[bJ].length &&
            (fe[bJ][ff] == null || fe[bJ][ff] < fb)
          ) {
            if (fe[dR][ff] != null) {
              fi = fe[dR][ff][0];
            }
            ff++;
          }
          if (ff >= fe[bJ].length) {
            continue;
          }
          if (bR(fb, fe[bJ][ff])) {
            continue;
          }
          if (fi == null && fe[D][ff] !== null && au(fe[D][ff], fb)) {
            fi = fe[H][ff][0];
          }
          if (fi != null) {
            var fk = fg == fh.length - 1 ? null : fh[fg + 1][0];
            if (au(fe[bJ][ff], fd[fg + 1])) {
              fk = fe[dR][ff][0];
            }
            if (fi < fj && (fk == null || fk < fj)) {
              fc(ff, fj);
            }
            if (fi > fj && (fk == null || fk > fj)) {
              fc(ff, fj);
            }
          }
          fi = fj;
        }
      }
      function cZ(fc) {
        for (var fb = 0; fb < fc[d1].length; fb += 1) {
          if (fc[d1][fb] && fc[d1][fb].length > 0) {
            alert(
              "Free Version does not support bouncing off the walls\nYour motion path looks like it bounces of some walls. Only Easy Bounce Pro supports that, therefore those bounces will be removed from the motion path.",
            );
            return;
          }
        }
      }
      function bm(fe, fj) {
        function fc(fk) {
          return Math.sqrt((2 * fk) / fj);
        }
        var fg = fe[D][0];
        if (fg == null) {
          fg = fe[bJ][0];
        }
        for (var ff = 0; ff < fe[dR].length; ff += 1) {
          if (fe[dR][ff] == null) {
            fe[z].push(null);
            fe[cP].push(null);
            fe[aG].push(null);
            fe[a6].push(null);
            fe[cw].push(fg);
            fe[df].push(null);
          } else {
            var fh =
              ff == fe[H].length - 1
                ? 0
                : Math.abs(fe[H][ff + 1][1] - fe[dR][ff][1]);
            var fd = fc(fh);
            if (fe[H][ff] == null) {
              fe[z].push(null);
              fe[aG].push(null);
              fe[cw].push(null);
              fe[df].push(fg);
              fg += fd;
            } else {
              var fb = Math.abs(fe[H][ff][1] - fe[dR][ff][1]);
              var fi = fc(fb);
              fe[z].push(fj * fi);
              fe[aG].push(fi);
              fe[cw].push(fg);
              fe[df].push(fg + fi);
              fg += fi + fd;
            }
            fe[cP].push(fj * fd);
            fe[a6].push(fd);
          }
        }
      }
      function a0(fe) {
        for (var fc = 1; fc < fe[H].length; fc += 1) {
          if (fe[dR][fc] == null) {
            continue;
          }
          var fd = fe[a6][fc - 1];
          var fb = fe[aG][fc];
          fe[H][fc][0] =
            (fe[dR][fc - 1][0] * fb + fe[dR][fc][0] * fd) / (fd + fb);
        }
      }
      function eO(fw, ff) {
        var fv = !ff.preserveApexX;
        var fd = [];
        var fi = [];
        for (var fu = 0; fu < fw[d1].length; fu += 1) {
          if (!fw[d1][fu]) {
            continue;
          }
          var ft = fw[d1][fu];
          var fy = fw[aG][fu];
          var fo = fw[H][fu] ? fw[H][fu][0] : null;
          var fm = fw[cw][fu] ? fw[cw][fu] : null;
          if (fu > 0 && fw[a6][fu - 1]) {
            fy += fw[a6][fu - 1];
            fo = fw[dR][fu - 1][0];
            fm = fw[df][fu - 1];
          }
          if (fy === null || fo === null) {
            continue;
          }
          var fk = fw[dR][fu][0];
          var fq = Math.abs(fo - ft[0]);
          var fg = Math.abs(fk - ft[ft.length - 1]);
          var fj = fq + fg;
          ft.foreachSuccessivePair(function (fA, fz) {
            fj += Math.abs(fA - fz);
          });
          var fx = fu == 0 || !fw[a6][fu - 1] ? null : fw[a6][fu - 1];
          var fe = 0;
          var fs = fo;
          var fr = 0;
          for (var fn = 0; fn < ft.length; fn += 1) {
            var fh = ft[fn];
            fe = fr;
            fr += Math.abs(fh - fs);
            var fl = fm + fy * (fr / fj);
            fd.push(fh);
            fi.push(fl);
            if (fv && fx != null) {
              var fp = fx / fy;
              var fc = fe / fj;
              var fb = fr / fj;
              if (fp > fc && fp <= fb) {
                fw[H][fu][0] = cD(fp, fc, fb, fs, fh);
              } else {
                if (fn == ft.length - 1 && fp > fb) {
                  fw[H][fu][0] = cD(fp, fb, 1, fh, fk);
                }
              }
            }
            fs = fh;
          }
        }
        fw[ac] = fi;
        fw[Z] = fd;
      }
      function bz(fb) {
        var fc = new eo();
        fc.addTimePairs(dg(fb[bJ]), dg(fb[df]));
        fc.addTimePairs(dg(fb[D]), dg(fb[cw]));
        return fc;
      }
      function eo() {
        function fc(fh, fg) {
          if (fh.length != fg.length) {
            throw new Error("timesBefore and timeAfter must have same length");
          }
          for (var ff = 0; ff < fh.length; ff += 1) {
            fe.push([fh[ff], fg[ff]]);
          }
          fb();
        }
        function fb() {
          fe.sort(function (fg, ff) {
            return fg[0] - ff[0];
          });
        }
        function fd(fg) {
          if (fe.lengt == 0) {
            return fg;
          }
          if (fg <= fe[0][0]) {
            return fg - fe[0][0] + fe[0][1];
          }
          var fi = fe.length - 1;
          if (fg >= fe[fi][0]) {
            return fg - fe[fi][0] + fe[fi][1];
          }
          for (var ff = 0; ff < fe.length - 1; ff += 1) {
            var fj = fe[ff];
            var fh = fe[ff + 1];
            if (fg >= fj[0] && fg <= fh[0]) {
              return cD(fg, fj[0], fh[0], fj[1], fh[1]);
            }
          }
        }
        var fe = [];
        this.addTimePairs = fc;
        this.remap = fd;
      }
      function d2(fc) {
        var fb = new dO();
        fb.applyAfter(bg(aE(-1, fc.anchorPoint)));
        fb.applyAfter(dI([fc.scale[0] / 100, fc.scale[1] / 100]));
        fb.applyAfter(cj(-1 * fc.rotation));
        fb.applyAfter(bg(fc.position));
        return fb;
      }
      function c7(fc) {
        var fb = new dO();
        fb.applyBefore(bg(fc.anchorPoint));
        fb.applyBefore(dI([100 / fc.scale[0], 100 / fc.scale[1]]));
        fb.applyBefore(cj(fc.rotation));
        fb.applyBefore(bg(-1 * fc.position));
        return fb;
      }
      function d2(fc) {
        var fb = new dO();
        fb.applyAfter(bg(aE(-1, fc.anchorPoint)));
        fb.applyAfter(dI([fc.scale[0] / 100, fc.scale[1] / 100]));
        fb.applyAfter(cj(-1 * fc.rotation));
        fb.applyAfter(bg(fc.position));
        return fb;
      }
      function c7(fc) {
        var fb = new dO();
        fb.applyBefore(bg(fc.anchorPoint));
        fb.applyBefore(dI([100 / fc.scale[0], 100 / fc.scale[1]]));
        fb.applyBefore(cj(fc.rotation));
        fb.applyBefore(bg(-1 * fc.position));
        return fb;
      }
      function eV(fe, fh) {
        var fb = dY(fe, fh);
        var ff = fe.height;
        var fc = fe.width;
        var fd = [
          [0, 0],
          [fc, 0],
          [fc, ff],
          [0, ff],
        ];
        var fg = fd.map(function (fi) {
          return fb.transform(fi);
        });
        return db(fg);
      }
      function db(fb) {
        if (fb.length == 0) {
          throw new Error("cannot compute bounding box for empty array");
        }
        var fg = fb[0][0];
        var ff = fb[0][1];
        var fe = fg;
        var fc = ff;
        for (var fd = 1; fd < fb.length; fd += 1) {
          fg = Math.min(fb[fd][0], fg);
          ff = Math.min(fb[fd][1], ff);
          fe = Math.max(fb[fd][0], fe);
          fc = Math.max(fb[fd][1], fc);
        }
        return { bottom: fc, left: fg, right: fe, top: ff };
      }
      function ap(fA, fB, fn, fh, fg) {
        function fu(fC) {
          return [(fC[0] * fm[0]) / 100, (fC[1] * fm[1]) / 100];
        }
        function fp(fD, fF, fC) {
          var fE = b7(fD, fF);
          return aV(fF, aE(fC, fE));
        }
        var fk = 4000;
        var fz = 200;
        var fi = fg.squashDuration === undefined ? 50 : fg.squashDuration;
        var ff = cD(fi, 0, 100, 0.05, 0.25);
        var fo = fg.squashAmount === undefined ? 50 : fg.squashAmount;
        var fx = cD(fo, 0, 100, 0, 2);
        var fd = fg.squashChaos === undefined ? 0 : fg.squashChaos;
        var fy = cD(fd, 0, 100, 0, 0.5);
        if (!fg.subframeAccuracy) {
          ff = ar(ff, fg.frameDuration);
        }
        var fw = dT(fA);
        if (!fw) {
          return;
        }
        var fm = [fA.width, fA.height];
        av.forAllPoints(function (fE) {
          var fC = fn;
          var fD = fu(fE.defaultValue);
          var fF = fw.property(fE.name);
          di(fF, fn, fh);
          fF.setValueAtTime(fC, fD);
          fF.setInterpolationTypeAtKey(
            fF.nearestKeyIndex(fC),
            KeyframeInterpolationType.LINEAR,
            KeyframeInterpolationType.HOLD,
          );
        });
        for (var ft = 0; ft < fB[df].length; ft += 1) {
          var fl = fB[df][ft];
          var fc = eV(fA, fl);
          var fs = [(fc.left + fc.right) / 2, fc.bottom];
          var fj = ak(fA, fl);
          var fr = dY(fA, fl);
          var fe = new dO();
          fe.applyAfter(fr);
          fe.applyAfter(bg([fs[0] * -1, fs[1] * -1]));
          var fb = new dO();
          fb.applyAfter(bg(fs));
          fb.applyAfter(fj);
          var fq = fl + ff;
          if (ft + 1 < fB[cw].length && fB[cw][ft + 1] != null) {
            fq = Math.min(fq, fB[cw][ft + 1]);
          }
          var fv = fB[z][ft] == null ? 0 : cD(fB[z][ft], fz, fk, 0, 1);
          av.forAllPoints(function (fJ) {
            var fF = fu(fJ.defaultValue);
            var fH = fe.transform(fF);
            var fE = [1.2 * fH[0], 0.5 * fH[1]];
            var fD = cD(fv, 0, 1, fH, fE);
            var fK = fb.transform(fD);
            var fC = fw.property(fJ.name);
            var fG = fx * cD(Math.random(), 0, 1, 1 - fy, 1 + fy);
            var fI = fp(fK, fF, fG);
            fC.setValueAtTime(fl, fI);
            fC.setInterpolationTypeAtKey(
              fC.nearestKeyIndex(fl),
              KeyframeInterpolationType.LINEAR,
              KeyframeInterpolationType.LINEAR,
            );
            fC.setValueAtTime(fq, fF);
            fC.setInterpolationTypeAtKey(
              fC.nearestKeyIndex(fq),
              KeyframeInterpolationType.LINEAR,
              KeyframeInterpolationType.HOLD,
            );
          });
        }
      }
      function dT(fb) {
        var fd = "Bezier Warp Easy Bounce";
        var fc = fb.property("ADBE Effect Parade");
        if (!fc) {
          return null;
        }
        var fe = fc.property(fd);
        if (fe) {
          return fe;
        }
        if (!fc.canAddProperty("ADBE BEZMESH")) {
          return;
        }
        fe = fc.addProperty("ADBE BEZMESH");
        fe.name = fd;
        return fe;
      }
      function aF(fs, fb, fg) {
        fb = fb || {};
        var fj = fs.inPoint;
        var fd = fs.outPoint;
        var fq = fs.containingComp;
        if (fb.workAreaOnly) {
          fj = Math.max(fj, fq.workAreaStart);
          fd = Math.min(fd, fq.workAreaStart + fq.workAreaDuration);
        }
        if (fb.addSquash && av.layerNeedsToBePrecomposedToApplyBezMesh(fs)) {
          if (
            fb.precomposeConfirmed ||
            (!fb.precomposeRejected &&
              confirm(
                "May I precompose?\nText layers, shape layers and continuously rasterized layers need to be precomposed for the bezier warp we use for squashing. If you choose no, I will skip those layers. Alternatively you can disable the squash option.",
              ))
          ) {
            fb.precomposeConfirmed = true;
            fs = av.precomposeIfNecessary(fs, fq.time);
          } else {
            fb.precomposeRejected = true;
            return;
          }
        }
        var fo = fs.property("ADBE Transform Group").property("ADBE Position");
        if (!fo.dimensionsSeparated) {
          fo.dimensionsSeparated = true;
        }
        var fn = fs
          .property("ADBE Transform Group")
          .property("ADBE Position_0");
        var ff = fs
          .property("ADBE Transform Group")
          .property("ADBE Position_1");
        var fe = [];
        var fm = [];
        var fh = [];
        var fc = [];
        eq(fn, fj, fd, function (fu) {
          var fv = fn.keyTime(fu);
          fe.push([fn.keyValue(fu), ff.valueAtTime(fv, false)]);
          fm.push(fv);
        });
        eq(ff, fj, fd, function (fu) {
          var fv = ff.keyTime(fu);
          fh.push([fn.valueAtTime(fv, false), ff.keyValue(fu)]);
          fc.push(fv);
        });
        if (fh.length < 2) {
          return;
        }
        fb.frameDuration = fs.containingComp.frameDuration;
        var ft = bW(fe, fm, fh, fc, fb, fg);
        di(fn, fj, fd);
        di(ff, fj, fd);
        fn.setValuesAtTimes(
          dg(ft[df]),
          dg(ft[dR]).map(function (fu) {
            return fu[0];
          }),
        );
        ff.setValuesAtTimes(
          dg(ft[df]),
          dg(ft[dR]).map(function (fu) {
            return fu[1];
          }),
        );
        fn.setValuesAtTimes(
          dg(ft[cw]),
          dg(ft[H]).map(function (fu) {
            return fu[0];
          }),
        );
        ff.setValuesAtTimes(
          dg(ft[cw]),
          dg(ft[H]).map(function (fu) {
            return fu[1];
          }),
        );
        if (ft[ac].length > 0) {
          fn.setValuesAtTimes(ft[ac], ft[Z]);
        }
        for (var fp = 0; fp < ft[dR].length; fp += 1) {
          if (ft[df][fp] == null) {
            continue;
          }
          var fr = ff.nearestKeyIndex(ft[df][fp]);
          var fk = new KeyframeEase(ft[z][fp], 33);
          var fl = new KeyframeEase(-1 * ft[cP][fp], 33);
          ff.setTemporalEaseAtKey(fr, [fk], [fl]);
        }
        for (var fp = 0; fp < ft[H].length; fp += 1) {
          if (ft[cw][fp] == null) {
            continue;
          }
          fr = ff.nearestKeyIndex(ft[cw][fp]);
          fk = new KeyframeEase(0, 33);
          fl = new KeyframeEase(0, 33);
          ff.setTemporalEaseAtKey(fr, [fk], [fl]);
        }
        var fi = []
          .appendArray(dg(ft[df]))
          .appendArray(dg(ft[cw]))
          .appendArray(dg(ft[ac]));
        for (var fp = 0; fp < fi.length; fp += 1) {
          fr = fn.nearestKeyIndex(fi[fp]);
          fn.setInterpolationTypeAtKey(
            fr,
            KeyframeInterpolationType.LINEAR,
            KeyframeInterpolationType.LINEAR,
          );
        }
        if (fg == "1") {
          dh(fs, ft, fj, fd);
          if (fb.addSquash) {
            ap(fs, ft, fj, fd, fb);
          }
        } else {
          ej(fs);
        }
      }
      function ej(fd) {
        var fb = bp(fd);
        if (fb.length > 0) {
          var fc = fb[0].name;
          if (fb.length > 1) {
            fc += " and other properties.";
          }
          var fe =
            "Warning: Free version only sets the position!\nYou have keyframed " +
            fc +
            ". But only the Pro version of Easy Bounce can adjust the timing of those keyframes. In the free version you have to do that manually.";
          alert(fe);
        }
      }
      function bp(fb) {
        var fc = [];
        aB(fb, function (fe) {
          var fd = ["ADBE Position", "ADBE Position_0", "ADBE Position_1"];
          if (fd.exists(fe.matchName)) {
            return;
          }
          fc.push(fe);
        });
        return fc;
      }
      function dh(fi, ff, fd, fj) {
        function fl(fn) {
          return fk.remap(fn);
        }
        var fk = bz(ff);
        var fh = bp(fi);
        for (var fg = 0; fg < fh.length; fg += 1) {
          var fb = fh[fg];
          var fe = ["ADBE Position", "ADBE Position_0", "ADBE Position_1"];
          if (fe.exists(fb.matchName)) {
            continue;
          }
          var fc = [
            PropertyValueType.NO_VALUE,
            PropertyValueType.CUSTOM_VALUE,
            PropertyValueType.MARKER,
          ];
          if (fc.exists(fb.propertyValueType)) {
            continue;
          }
          var fm = cl(fb, fd, fj);
          di(fb, fd, fj);
          e2(fb, fm, { mergeStrategy: "none", timeRemap: fl });
        }
      }
      this.version = "1.0.000";
      Math.log2 =
        Math.log2 ||
        function (fb) {
          return Math.log(fb) * Math.LOG2E;
        };
      if (!Array.prototype.map) {
        Array.prototype.map = function (fj, fi) {
          if (this == null) {
            throw new TypeError(" this is null or not defined");
          }
          var ff = Object(this);
          var fg = ff.length >>> 0;
          if (typeof fj !== "function") {
            throw new TypeError(fj + " is not a function");
          }
          if (arguments.length > 1) {
            fc = fi;
          }
          fb = new Array(fg);
          fd = 0;
          while (fd < fg) {
            if (fd in ff) {
              fe = ff[fd];
              fh = fj.call(fc, fe, fd, ff);
              fb[fd] = fh;
            }
            fd++;
          }
          return fb;
        };
      }
      dX.prototype = new Error();
      dS.prototype = new Error();
      eu.prototype.addListener = function (fb) {
        this.listener.push(fb);
      };
      eu.prototype.informListener = function () {
        for (var fb = 0; fb < this.listener.length; fb += 1) {
          this.listener[fb].apply(this, arguments);
        }
      };
      String.prototype.getNumLines = function () {
        return this.valueOf().split(/\r?\n|\r/).length;
      };
      String.prototype.hasPrefix = function (fb) {
        return this.slice(0, fb.length) == fb;
      };
      String.prototype.hasSuffix = function (fb) {
        return this.slice(-fb.length) == fb;
      };
      String.prototype.containsSubstring = function (fb) {
        var fc = this.valueOf();
        return fc.indexOf(fb) !== -1;
      };
      String.prototype.getLinesArray = function () {
        var fd = this.valueOf();
        var fc = fd.convertLinebeaksToN();
        var fb = fc.split("\n");
        if (fb[fb.length - 1] == "") {
          fb.length--;
        }
        return fb;
      };
      String.prototype.convertLinebeaksToN = function () {
        var fc = this.valueOf();
        var fb = fc.replace(/(\r\n)/g, "\n").replace(/(\r)|(\n)|(\x03)/g, "\n");
        return fb;
      };
      String.prototype.convertLinebeaksToR = function () {
        var fc = this.valueOf();
        var fb = fc.replace(/(\r\n)/g, "\r").replace(/(\r)|(\n)|(\x03)/g, "\r");
        return fb;
      };
      String.prototype.quoteIfContainsSpaces = function () {
        var fb = this.valueOf();
        if (fb.indexOf(" ") != -1 || fb === "") {
          return '"' + fb + '"';
        }
        return fb;
      };
      String.prototype.quoteForShell = function () {
        var fb = this.valueOf();
        if (
          fb.indexOf(" ") != -1 ||
          fb.indexOf("(") != -1 ||
          fb.indexOf(")") != -1 ||
          fb === ""
        ) {
          return '"' + fb + '"';
        }
        return fb;
      };
      String.prototype.quoteForBashShell = function () {
        var fb = this.valueOf();
        return "\'" + fb.replaceAll("\'", "\'\"\'\"\'") + "\'";
      };
      String.prototype.quoteForWindowsCmd = function () {
        var fb = this.valueOf();
        fb = fb.prefixAnyOf(
          ["^", "(", ")", "%", "!", '"', "<", ">", "&", "|", "\n"],
          "^",
        );
        return fb;
      };
      String.prototype.prefixAnyOf = function (fe, fd) {
        var fb = this.valueOf();
        for (var fc = 0; fc < fe.length; fc += 1) {
          fb = fb.replaceAll(fe[fc], fd + fe[fc]);
        }
        return fb;
      };
      String.prototype.quoteForWindowsCommandLineArgument = function (fd) {
        if (fd == undefined) {
          fd = false;
        }
        var fc = this.valueOf();
        if (
          !fd &&
          fc !== "" &&
          !fc.containsSubstring(" ") &&
          !fc.containsSubstring("\t") &&
          !fc.containsSubstring("\n") &&
          !fc.containsSubstring("\v") &&
          !fc.containsSubstring('"')
        ) {
          return fc;
        }
        var fb = '"';
        for (var fe = 0; fe < fc.length + 1; fe += 1) {
          var ff = 0;
          while (fe < fc.length && fc[fe] == "\\") {
            ff++;
            fe++;
          }
          if (fe == fc.length) {
            fb += "\\".duplicate(2 * ff);
          } else {
            if (fc[fe] == '"') {
              fb += "\\".duplicate(2 * ff + 1);
              fb += '"';
            } else {
              fb += "\\".duplicate(ff);
              fb += fc[fe];
            }
          }
        }
        fb += '"';
        return fb;
      };
      String.prototype.escapeRegExp = function () {
        var fb = this.valueOf();
        var fc = fb.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        return fc;
      };
      String.prototype.trim = function () {
        var fb = this.valueOf();
        return fb.replace(/^\s+/, "").replace(/\s+$/, "");
      };
      String.prototype.containsOnlyWhitespace = function () {
        var fb = new RegExp(/^\s*$/);
        return fb.test(this.valueOf());
      };
      String.prototype.findFirstDifferenceTo = function (fd) {
        var fb = this.valueOf();
        var fc = 0;
        while (fc < fb.length && fc < fd.length && fb[fc] == fd[fc]) {
          fc++;
        }
        return fc;
      };
      String.prototype.detailedComparison = function (fd) {
        var fb = this.valueOf();
        var fc = fb.findFirstDifferenceTo(fd);
        if (fc == fb.length && fc == fd.length) {
          return "strings are identical";
        } else {
          return (
            "string difference:\n" +
            fb.substring(fc, fc + 50) +
            "\n<<<<<<<<<<<>>>>>>>>>>>>\n" +
            fd.substring(fc, fc + 50)
          );
        }
      };
      String.prototype.parseBool = function () {
        var fb = this.valueOf();
        return fb == "true" || fb == "True" || fb == "TRUE";
      };
      String.prototype.parseFormula = function () {
        var fb = this.valueOf();
        return br(fb);
      };
      String.prototype.replaceAll = function (fc, fb) {
        return this.split(fc).join(fb);
      };
      String.prototype.applyReplaceMapToFullString = function (fc) {
        var fb = this.valueOf();
        if (fc[fb] == undefined) {
          return fb;
        }
        return fc[fb];
      };
      String.prototype.applyReplaceMapToSubwords = function (fc) {
        var fd = dN(fc);
        var fb = this.valueOf();
        fb = fb.replace(fd, function (fe) {
          return fc[fe];
        });
        return fb;
      };
      String.prototype.applyRegExpReplaceMulti = function (fd) {
        var fc = this.valueOf();
        var fb = G(fc, fd, 0);
        return fb;
      };
      String.prototype.splitWithEmptyElementAtEnd = function (fg) {
        var ff = this.valueOf();
        var fh = ff.match(fg);
        if (fh == null) {
          return [ff];
        }
        var fd = ff.search(fg);
        var fi = fh[0].length;
        var fe = ff.substr(0, fd);
        var fc = ff.substr(fd + fi, ff.length - (fd + fi));
        var fb = fc.splitWithEmptyElementAtEnd(fg);
        fb.unshift(fe);
        return fb;
      };
      String.prototype.duplicate = function (fe) {
        var fc = this.valueOf();
        var fb = "";
        for (var fd = 0; fd < fe; fd += 1) {
          fb += fc;
        }
        return fb;
      };
      cv.prototype.addOnChangeListener = function (fb) {
        this.onChangeHandler.addListener(fb);
      };
      cv.prototype.getValue = function () {
        return this.value;
      };
      cv.prototype.setValueFromString = function (fb) {
        var fc = fb.parseFormula();
        if (isNaN(fc)) {
          this.updateExtendSkriptEditText();
        } else {
          this.setValueFromNumber(fc);
        }
      };
      cv.prototype.setValueFromNumber = function (fb) {
        fb = this.limitToMinMaxRange(fb);
        if (this.roundToInt) {
          fb = Math.round(fb);
        }
        this.value = fb;
        this.updateExtendSkriptEditText();
        this.onChangeHandler.informListener(this.value);
      };
      cv.prototype.limitToMinMaxRange = function (fb) {
        fb = Math.max(this.minAllowedVal != null ? this.minAllowedVal : fb, fb);
        fb = Math.min(this.maxAllowedVal != null ? this.maxAllowedVal : fb, fb);
        return fb;
      };
      cv.prototype.updateExtendSkriptEditText = function () {
        var fb = String(this.value);
        if (this.extendSkriptEditText != null) {
          if (this.extendSkriptEditText.text != fb) {
            this.extendSkriptEditText.text = fb;
          }
        }
      };
      ca.prototype.addOnChangeListener = function (fb) {
        this.onChangeHandler.addListener(fb);
      };
      ca.prototype.setValue = function (fb) {
        this.value = fb;
        this.applyPostValueModifiers();
        this.updateExtendSkriptEditText();
        this.onChange();
      };
      ca.prototype.getValue = function () {
        return this.value;
      };
      ca.prototype.onChange = function () {
        this.onChangeHandler.informListener(this.value);
      };
      ca.prototype.addPostValueModifier = function (fb) {
        this.postModifier.push(fb);
      };
      ca.prototype.applyPostValueModifiers = function () {
        var fc = this.value;
        for (var fb = 0; fb < this.postModifier.length; fb += 1) {
          fc = this.postModifier[fb](fc);
        }
        if (fc != this.value) {
          this.value = fc;
          return true;
        }
        return false;
      };
      ca.prototype.setEnabled = function (fb) {
        if (!this.ui) {
          return;
        }
        this.ui.enabled = fb;
      };
      cu(x, ca);
      x.prototype.addUIElements = function () {
        var fc = this;
        var fb =
          "group{ orientation:\'row\',margins:0,alignment:[\'fill\',\'top\']," +
          this.hasLabel
            ? "label: StaticText {text:\'" + this.label + "\'},"
            : "" + this.options.showSlider
              ? "slider: Slider {},"
              : "" +
                "xValue: EditText {text:\'XXXXX\',characters:6,alignment:[\'right\',\'center\']}" +
                "}";
        var fd = this.parentGroup.add(fb);
        this.ui = fd;
        if (this.options.helpTip) {
          fd.xValue.helpTip = this.options.helpTip;
          if (this.hasLabel) {
            fd.label.helpTip = this.options.helpTip;
          }
        }
        if (this.options.showSlider) {
          fd.slider.value = this.value;
          fd.slider.minvalue = this.options.minValue;
          fd.slider.maxvalue = this.options.maxValue;
          fd.slider.onChanging = function () {
            fc.xEditText.setValueFromNumber(fd.slider.value);
          };
        }
        this.xEditText = new cv(fd.xValue);
        this.xEditText.setValueFromNumber(this.value);
        this.xEditText.addOnChangeListener(function (fe) {
          fc.setValue(fe);
          if (fc.options.showSlider) {
            fd.slider.value = fe;
          }
        });
      };
      x.prototype.updateExtendSkriptEditText = function () {
        if (this.parentGroup != null) {
          if (this.xEditText.getValue() != this.value) {
            this.xEditText.setValueFromNumber(this.value);
          }
        }
      };
      aW.prototype.setSilent = function (fb) {
        this.silent = fb;
      };
      aW.prototype.hasError = function () {
        return this.errors.length > 0;
      };
      aW.prototype.hasMessage = function () {
        return this.messages.length > 0;
      };
      aW.prototype.add = function (fb) {
        this.errors.push(fb);
      };
      aW.prototype.message = function (fb) {
        if (this.silent) {
          this.messages.push(fb);
        } else {
          alert(fb);
        }
      };
      aW.prototype.clear = function () {
        this.errors = new Array();
      };
      aW.prototype.clearMessages = function () {
        this.messages = new Array();
      };
      aW.prototype.getErrorString = function () {
        var fb = "";
        for (var fc = 0; fc < this.errors.length; fc += 1) {
          fb += "Error " + fc + 1 + ":\n" + this.errors[fc] + "\n\n";
        }
        return fb;
      };
      aW.prototype.getMessageString = function (fd) {
        var fb = "";
        for (var fc = 0; fc < this.messages.length; fc += 1) {
          if (fd) {
            fb += this.messages[fc] + "\n\n";
          } else {
            fb += "Message " + fc + 1 + ":\n" + this.messages[fc] + "\n\n";
          }
        }
        return fb;
      };
      aW.prototype.popFirstMessage = function () {
        if (this.messages.length == 0) {
          return null;
        }
        return this.messages.shift();
      };
      aW.prototype.show = function (fc) {
        if (this.errors.length == 0) {
          return;
        }
        var fd = new Window("dialog", this.title, undefined, {
          resizeable: true,
        });
        var fb =
          "group{orientation:\'column\', alignment:[\'fill\',\'fill\'],message:StaticText{text:\'\',alignment:[\'left\',\'top\']},spacer:Group{},label:StaticText{text:\'Details\',alignment:[\'left\',\'top\']},detailsBox:EditText{properties:{multiline:true, readonly:true},text:\'\',preferredSize:[600,400],alignment:[\'fill\',\'fill\']},okBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\']}}";
        fd.UI = fd.add(fb);
        fd.UI.message.text = fc;
        fd.UI.detailsBox.text = this.getErrorString();
        fd.onResizing = fd.onResize = function () {
          this.layout.resize();
        };
        fd.show();
        this.clear();
      };
      C.prototype.getPath = function () {
        return this.pathA;
      };
      C.prototype.getFile = function (fh, fe, ff) {
        ff = ff || {};
        var fd = new File(this.pathA + "/" + fh);
        var fg = new aW("dummy");
        var fc = bs(fd, fe, fg, ff);
        if (fg.hasError()) {
          var fb = new File(this.pathB + "/" + fh);
          fc = bs(fb, fe, this.errorHandler, ff);
        }
        return fc;
      };
      C.prototype.clear = function () {
        var fb = new Folder(this.pathA);
        q(fb, this.errorHandler);
        return !this.errorHandler.hasError();
      };
      var dK = dj(xtr);
      Array.prototype.intArrayToString = function () {
        var fb = new String();
        for (var fc = 0; fc < this.length; fc += 1) {
          if (typeof this[fc] != "number") {
            throw new Error("Array must be all numbers");
          } else {
            if (this[fc] < 0) {
              throw new Error("Numbers must be 0 and up");
            }
          }
          fb += String.fromCharCode(this[fc]);
        }
        return fb;
      };
      Array.prototype.compareArrays = function (fb) {
        if (this.length != fb.length) {
          return false;
        }
        for (var fc = 0; fc < fb.length; fc += 1) {
          if (this[fc].compareArrays) {
            if (!this[fc].compareArrays(fb[fc])) {
              return false;
            } else {
              continue;
            }
          }
          if (this[fc] != fb[fc]) {
            return false;
          }
        }
        return true;
      };
      Array.prototype.appendArray = function (fd, fb) {
        fb = fb || {};
        if (fb.atFront) {
          for (fc = fd.length - 1; fc >= 0; fc--) {
            this.unshift(fd[fc]);
          }
        } else {
          for (var fc = 0; fc < fd.length; fc += 1) {
            this.push(fd[fc]);
          }
        }
        return this;
      };
      Array.prototype.insertArray = function (fe, fc, fb) {
        var fd = fb.numElementsToDelete || 0;
        this.splice.apply(this, [fe, fd].concat(fc));
      };
      Array.prototype.clear = function () {
        while (this.length > 0) {
          this.pop();
        }
      };
      Array.prototype.map = function (fd) {
        var fb = new Array(this.length);
        for (var fc = 0; fc < this.length; fc += 1) {
          fb[fc] = fd(this[fc]);
        }
        return fb;
      };
      Array.prototype.mapWithIndex = function (fd) {
        var fb = new Array(this.length);
        for (var fc = 0; fc < this.length; fc += 1) {
          fb[fc] = fd(this[fc], fc);
        }
        return fb;
      };
      Array.prototype.foreach = function (fc) {
        for (var fb = 0; fb < this.length; fb += 1) {
          fc(this[fb], fb);
        }
      };
      Array.prototype.foreachSuccessivePair = function (fc) {
        for (var fb = 1; fb < this.length; fb += 1) {
          fc(this[fb - 1], this[fb]);
        }
      };
      Array.prototype.foldr = function (fd, fe) {
        var fb = fe;
        for (var fc = this.length - 1; fc > -1; fc--) {
          fb = fd(this[fc], fb);
        }
        return fb;
      };
      Array.prototype.foldl = function (fd, fe) {
        var fb = fe;
        for (var fc = 0; fc < this.length; fc += 1) {
          fb = fd(this[fc], fb);
        }
        return fb;
      };
      Array.prototype.exists = function (fb) {
        for (var fc = 0; fc < this.length; fc += 1) {
          if (this[fc] == fb) {
            return true;
          }
        }
        return false;
      };
      Array.prototype.contains = Array.prototype.exists;
      Array.prototype.all = function (fc) {
        for (var fb = 0; fb < this.length; fb += 1) {
          if (!fc(this[fb])) {
            return false;
          }
        }
        return true;
      };
      Array.prototype.filter = function (fd) {
        var fb = new Array();
        for (var fc = 0; fc < this.length; fc += 1) {
          if (fd(this[fc])) {
            fb.push(this[fc]);
          }
        }
        return fb;
      };
      Array.prototype.max = function () {
        if (this.length == 0) {
          return NaN;
        }
        return this.foldl(Math.max, this[0]);
      };
      Array.prototype.min = function () {
        if (this.length == 0) {
          return NaN;
        }
        return this.foldl(Math.min, this[0]);
      };
      Array.prototype.average = function () {
        if (this.length == 0) {
          return NaN;
        }
        var fb = this.length;
        return this.foldl(function (fd, fc) {
          return fc + fd / fb;
        }, 0);
      };
      Array.prototype.getEntryClosestTo = function (ff) {
        if (this.length == 0) {
          return null;
        }
        var fd = 0;
        var fe = Math.abs(this[0] - ff);
        for (var fb = 1; fb < this.length; fb += 1) {
          var fc = Math.abs(this[fb] - ff);
          if (fc < fe) {
            fe = fc;
            fd = fb;
          }
        }
        return fd;
      };
      Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
      };
      Array.prototype.shuffle = function () {
        for (fd = this.length; fd; fd--) {
          fc = Math.floor(Math.random() * fd);
          fb = this[fd - 1];
          this[fd - 1] = this[fc];
          this[fc] = fb;
        }
      };
      Array.prototype.prettyPrint = function () {
        var fb =
          "[" +
          this.map(function (fc) {
            return '"' + fc + '"';
          }).join(",") +
          "]";
        return fb;
      };
      var ch = 0.001;
      var aB = (function () {
        function fb(fe, fd) {
          if (fe instanceof Property && fe.numKeys > 0) {
            fd(fe);
          }
          if (
            fe instanceof Layer ||
            fe instanceof PropertyGroup ||
            fe.propertyType == PropertyType.INDEXED_GROUP ||
            fe.propertyType == PropertyType.NAMED_GROUP
          ) {
            for (var fc = 1; fc <= fe.numProperties; fc += 1) {
              fb(fe.property(fc), fd);
            }
          }
        }
        return fb;
      })();
      var dm = (function () {
        function fb(fe, fd) {
          if (fe instanceof Property && fe.expressionEnabled) {
            fd(fe);
          }
          if (
            fe instanceof Layer ||
            fe instanceof PropertyGroup ||
            fe.propertyType == PropertyType.INDEXED_GROUP ||
            fe.propertyType == PropertyType.NAMED_GROUP
          ) {
            for (var fc = 1; fc <= fe.numProperties; fc += 1) {
              fb(fe.property(fc), fd);
            }
          }
        }
        return fb;
      })();
      var e2 = (function () {
        function fb(fc, fj, fk) {
          function fe(fl) {
            return (
              fl == PropertyValueType.TwoD_SPATIAL ||
              fl == PropertyValueType.ThreeD_SPATIAL
            );
          }
          fk = fk || {};
          if (fj.length == 0) {
            return;
          }
          if (fk.timeRemap) {
            var fg = bw(fj);
            for (var ff = 0; ff < fj.length; ff += 1) {
              fg[ff].time = fk.timeRemap(fj[ff].time);
            }
            fj = fg;
          }
          M(fk.mergeStrategy, fc, fj, fk.mergeOffsets);
          var fh = fj.map(function (fl) {
            return b5(fl.value, fc);
          });
          var fd = fj.map(function (fl) {
            return fl.time;
          });
          fc.setValuesAtTimes(fd, fh);
          var fi = fd.map(function (fl) {
            return fc.nearestKeyIndex(fl);
          });
          fj.foreach(function (fo, fn) {
            var fm = fi[fn];
            var fl = bU(fo.InInterpolationType);
            var fp = bU(fo.OutInterpolationType);
            if (
              fp == KeyframeInterpolationType.BEZIER ||
              fl == KeyframeInterpolationType.BEZIER
            ) {
              fc.setTemporalEaseAtKey(
                fm,
                fo.InTemporalEase.map(cR),
                fo.OutTemporalEase.map(cR),
              );
            }
            fc.setInterpolationTypeAtKey(fm, fl, fp);
            if (
              fp == KeyframeInterpolationType.BEZIER &&
              fl == KeyframeInterpolationType.BEZIER
            ) {
              fc.setTemporalContinuousAtKey(fm, fo.TemporalContinuous);
              fc.setTemporalAutoBezierAtKey(fm, fo.TemporalAutoBezier);
            }
          });
          if (fe(fc.propertyValueType)) {
            fj.foreach(function (fn, fm) {
              var fl = fi[fm];
              fc.setRovingAtKey(fl, fn.Roving);
              fc.setSpatialTangentsAtKey(
                fl,
                fn.InSpatialTangent,
                fn.OutSpatialTangent,
              );
              fc.setSpatialContinuousAtKey(fl, fn.SpatialContinuous);
              fc.setSpatialAutoBezierAtKey(fl, fn.SpatialAutoBezier);
            });
          }
        }
        return fb;
      })();
      var M = (function () {
        function fh(fn, fj, fy, fm) {
          fn = fd(fn);
          if (fn === undefined) {
            return;
          }
          var fp = fy[0].time;
          var fl = fy[fy.length - 1].time;
          ff(fn, fj, fy, fp, fl);
          var fo = [];
          if (fn[0] == "offsetFrame") {
            fo[0] = fj.valueAtTime(fp, true);
          } else {
            if (fn[0] == "offsetKeyframe") {
              fo[0] = fj.keyValue(bA(fj, fp));
            }
          }
          if (fn[1] == "offsetFrame") {
            fo[1] = fj.valueAtTime(fl, true);
          } else {
            if (fn[1] == "offsetKeyframe") {
              fo[1] = fj.keyValue(dD(fj, fl));
            }
          }
          if (fn[0] != "none" && fc(fj, fp, fy[0])) {
            var fi = er(fp, eZ(fj).frameDuration);
            if (fa(fj, fp)) {
              var fq = fj.keyTime(bA(fj, fp));
              fu = au(fq, fi);
            } else {
              fu = true;
            }
            if (fu) {
              fk = fj.addKey(fi);
              fr = fj.keyInInterpolationType(fk);
              fx = KeyframeInterpolationType.HOLD;
              fj.setInterpolationTypeAtKey(fk, fr, fx);
            }
          }
          if (fn[1] != "none" && fc(fj, fl, fy[fy.length - 1])) {
            var fv = bZ(fl, eZ(fj).frameDuration);
            if (ey(fj, fl)) {
              var fw = fj.keyTime(dD(fj, fl));
              fu = au(fv, fw);
            } else {
              fu = true;
            }
            if (fu) {
              fk = fj.addKey(fv);
              fr = KeyframeInterpolationType.HOLD;
              fx = fj.keyOutInterpolationType(fk);
              fj.setInterpolationTypeAtKey(fk, fr, fx);
            }
          }
          di(fj, fp, fl, {});
          if (fn[0] == "offsetFrame" || fn[0] == "offsetKeyframe") {
            var fs = dM(fy[0].value, fo[0], fj.propertyValueType);
            if (fm instanceof Array) {
              fs = O(fs, fm[0], fj.propertyValueType);
            }
            eq(
              fj,
              undefined,
              fp,
              function (fB) {
                var fz = fj.keyValue(fB);
                var fA = O(fz, fs, fj.propertyValueType);
                fj.setValueAtKey(fB, fA);
              },
              { excludeRightBorder: true },
            );
          }
          if (fn[1] == "offsetFrame" || fn[1] == "offsetKeyframe") {
            var ft = dM(fy[fy.length - 1].value, fo[1], fj.propertyValueType);
            if (fm instanceof Array) {
              ft = O(ft, fm[1], fj.propertyValueType);
            }
            eq(
              fj,
              fl,
              undefined,
              function (fB) {
                var fz = fj.keyValue(fB);
                var fA = O(fz, ft, fj.propertyValueType);
                fj.setValueAtKey(fB, fA);
              },
              { excludeLeftBorder: true },
            );
          }
        }
        function fc(fk, fj, fi) {
          return !fe(fk.valueAtTime(fj, true), fi.value);
        }
        function fe(fj, fi) {
          if (fj instanceof Array) {
            return fg(fj, fi);
          }
          if (fj instanceof Shape) {
            return (
              fg(fj.vertices, fi.vertices) &&
              fg(fj.inTangents, fi.inTangents) &&
              fg(fj.outTangents, fi.outTangents)
            );
          }
          return Math.abs(fi - fj) < 1e-7;
        }
        function fg(fj, fi) {
          for (var fk = 0; fk < fj.length; fk += 1) {
            if (!fe(fj[fk], fi[fk])) {
              return false;
            }
          }
          return true;
        }
        function ff(fl, fm, fk, fj, fi) {
          if (fl[0] == "holdEvenIfNoKeysExist") {
            fl[0] = "hold";
          } else {
            if (fl[0] != "none" && !fa(fm, fj)) {
              fl[0] = "none";
            }
          }
          if (fl[1] == "holdEvenIfNoKeysExist") {
            fl[1] = "hold";
          } else {
            if (fl[1] != "none" && !ey(fm, fi)) {
              fl[1] = "none";
            }
          }
          if (fl[0] == "offsetFrameOnlyIfOffsetIsMultipleOf360") {
            fl[0] = fb(fm, fk, fj, 0);
          }
          if (fl[1] == "offsetFrameOnlyIfOffsetIsMultipleOf360") {
            fl[1] = fb(fm, fk, fi, fk.length - 1);
          }
        }
        function fb(fn, fl, fm, fk) {
          var fj = fn.valueAtTime(fm, true);
          var fi = fl[fk].value;
          return (((fj - fi) % 360) + 360) % 360 == 0 ? "offsetFrame" : "none";
        }
        var fd = (function () {
          function fi(fk) {
            if (fk === undefined) {
              return undefined;
            }
            if (fk instanceof Array) {
              if (fk.length != 2) {
                throw new Error(
                  "merge strategy must have two components (for merge at start and end)",
                );
              }
              fj(fk[0]);
              fj(fk[1]);
              return fk;
            } else {
              fj(fk);
              return [fk, fk];
            }
          }
          function fj(fk) {
            return [
              "none",
              "hold",
              "holdEvenIfNoKeysExist",
              "offsetFrame",
              "offsetFrameOnlyIfOffsetIsMultipleOf360",
              "offsetKeyframe",
            ].exists(fk);
          }
          return fi;
        })();
        return fh;
      })();
      var u = (function () {
        function fb(ff, fi) {
          var fe = ff.length;
          for (var fh = 0; fh < fe; fh += 1) {
            var fg = fh >= fi.length ? 1 : fi[fh];
            ff[fh] *= fg;
          }
        }
        function fd(fi, fl, ff, fk) {
          if (fi.length == 1) {
            if (fl !== null && fl !== 0) {
              fj = ff / fl;
            } else {
              fj = fk.length ? fk[0] : fk;
            }
            fi[0].speed *= fj;
          } else {
            var fe = fi.length;
            for (var fh = 0; fh < fe; fh += 1) {
              var fg = fh >= fk.length ? 1 : fk[fh];
              fi[fh].speed *= fg;
            }
          }
        }
        function fc(fg, fh) {
          if (fg.value.length) {
            fb(fg.value, fh);
          } else {
            fg.value *= fh;
          }
          var fj = null;
          var fi = null;
          var fe = null;
          var ff = null;
          if (fg.InSpatialTangent) {
            fj = U(fg.InSpatialTangent);
            fb(fg.InSpatialTangent, fh);
            fe = U(fg.InSpatialTangent);
          }
          if (fg.OutSpatialTangent) {
            fi = U(fg.OutSpatialTangent);
            fb(fg.OutSpatialTangent, fh);
            ff = U(fg.OutSpatialTangent);
          }
          if (fg.InTemporalEase) {
            fd(fg.InTemporalEase, fj, fe, fh);
          }
          if (fg.OutTemporalEase) {
            fd(fg.OutTemporalEase, fi, ff, fh);
          }
        }
        return fc;
      })();
      var cz = (function () {
        function fc(fe, fd) {
          fe[0] = fd[0];
          fe[1] = fd[1];
        }
        function fb(ff, fe) {
          if (!ff.value.length) {
            throw new Error("cannot rotate 1D properties");
          }
          var fd = cj(fe);
          fc(ff.value, fd.transform(ff.value));
          if (ff.InSpatialTangent) {
            fc(ff.InSpatialTangent, fd.transform(ff.InSpatialTangent));
          }
          if (ff.OutSpatialTangent) {
            fc(ff.OutSpatialTangent, fd.transform(ff.OutSpatialTangent));
          }
        }
        return fb;
      })();
      var aq = (function () {
        function fc(fe) {
          var fd = fe[0];
          fe[0] = fe[1];
          fe[1] = fd;
        }
        function fb(fd) {
          if (!fd.value.length) {
            throw new Error("cannot rotate 1D properties");
          }
          fc(fd.value);
          if (fd.InTemporalEase.length) {
            fc(fd.InTemporalEase);
          }
          if (fd.OutTemporalEase.length) {
            fc(fd.OutTemporalEase);
          }
          if (fd.InSpatialTangent) {
            fc(fd.InSpatialTangent);
          }
          if (fd.OutSpatialTangent) {
            fc(fd.OutSpatialTangent);
          }
        }
        return fb;
      })();
      cp.prototype = new Error();
      var aM = (function () {
        function fj(fq, fr, fo, fw, fu) {
          if (typeof fu === "undefined") {
            fu = 0.5;
          }
          var ft = fk.projectionratio(fu, fq);
          var fs = 1 - ft;
          var fn = { x: ft * fr.x + fs * fw.x, y: ft * fr.y + fs * fw.y };
          var fv = fk.abcratio(fu, fq);
          var fp = {
            x: fo.x + (fo.x - fn.x) / fv,
            y: fo.y + (fo.y - fn.y) / fv,
          };
          return { A: fp, B: fo, C: fn };
        }
        var fm = Math.abs;
        var fe = Math.min;
        var fi = Math.max;
        var fh = Math.acos;
        var fl = Math.sqrt;
        var ff = Math.PI;
        var fg = { x: 0, y: 0, z: 0 };
        var fk = (function () {
          var fz = Math.abs;
          var fx = Math.cos;
          var fs = Math.sin;
          var fr = Math.acos;
          var fy = Math.atan2;
          var fv = Math.sqrt;
          var fq = Math.pow;
          var fu = function (fA) {
            return fA < 0
              ? -fq(-fA, 0.3333333333333333)
              : fq(fA, 0.3333333333333333);
          };
          var fp = Math.PI;
          var fo = 2 * fp;
          var fn = fp / 2;
          var fw = 1e-6;
          var ft = {
            Cvalues: [
              0.12793819534675216, 0.12793819534675216, 0.1258374563468283,
              0.1258374563468283, 0.1216704729278034, 0.1216704729278034,
              0.1155056680537256, 0.1155056680537256, 0.10744427011596563,
              0.10744427011596563, 0.09761865210411388, 0.09761865210411388,
              0.08619016153195327, 0.08619016153195327, 0.0733464814110803,
              0.0733464814110803, 0.05929858491543678, 0.05929858491543678,
              0.04427743881741981, 0.04427743881741981, 0.02853138862893366,
              0.02853138862893366, 0.0123412297999872, 0.0123412297999872,
            ],
            Tvalues: [
              -0.06405689286260563, 0.06405689286260563, -0.1911188674736163,
              0.1911188674736163, -0.3150426796961634, 0.3150426796961634,
              -0.4337935076260451, 0.4337935076260451, -0.5454214713888396,
              0.5454214713888396, -0.6480936519369755, 0.6480936519369755,
              -0.7401241915785544, 0.7401241915785544, -0.820001985973903,
              0.820001985973903, -0.8864155270044011, 0.8864155270044011,
              -0.9382745520027328, 0.9382745520027328, -0.9747285559713096,
              0.9747285559713096, -0.9951872199970212, 0.9951872199970212,
            ],
            abcratio: function (fB, fD) {
              if (fD !== 2 && fD !== 3) {
                return false;
              }
              if (typeof fB === "undefined") {
                fB = 0.5;
              } else {
                if (fB === 0 || fB === 1) {
                  return fB;
                }
              }
              var fA = fq(fB, fD) + fq(1 - fB, fD);
              var fC = fA - 1;
              return fz(fC / fA);
            },
            align: function (fE, fD) {
              var fC = fD.p1.x;
              var fA = fD.p1.y;
              var fB = -fy(fD.p2.y - fA, fD.p2.x - fC);
              var fF = function (fG) {
                return {
                  x: (fG.x - fC) * fx(fB) - (fG.y - fA) * fs(fB),
                  y: (fG.x - fC) * fs(fB) + (fG.y - fA) * fx(fB),
                };
              };
              return fE.map(fF);
            },
            angle: function (fB, fG, fF) {
              var fI = fG.x - fB.x;
              var fD = fG.y - fB.y;
              var fH = fF.x - fB.x;
              var fC = fF.y - fB.y;
              var fE = fI * fC - fD * fH;
              var fK = fv(fI * fI + fD * fD);
              var fJ = fv(fH * fH + fC * fC);
              fI /= fK;
              fD /= fK;
              fH /= fJ;
              fC /= fJ;
              fA = fI * fH + fD * fC;
              return fy(fE, fA);
            },
            approximately: function (fC, fA, fB) {
              return fz(fC - fA) <= fB || fw;
            },
            arcfn: function (fB, fC) {
              var fD = fC(fB);
              var fA = fD.x * fD.x + fD.y * fD.y;
              if (typeof fD.z !== "undefined") {
                fA += fD.z * fD.z;
              }
              return fv(fA);
            },
            bboxoverlap: function (fG, fF) {
              var fH = ["x", "y"];
              var fD = fH.length;
              for (var fB = 0; fB < fD; fB += 1) {
                fC = fH[fB];
                fA = fG[fC].mid;
                fI = fF[fC].mid;
                fE = (fG[fC].size + fF[fC].size) / 2;
                if (fz(fA - fI) >= fE) {
                  return false;
                }
              }
              return true;
            },
            between: function (fB, fA, fC) {
              return (
                (fA <= fB && fB <= fC) ||
                ft.approximately(fB, fA) ||
                ft.approximately(fB, fC)
              );
            },
            closest: function (fB, fA) {
              var fD = fq(2, 63);
              fB.forEach(function (fG, fF) {
                fE = ft.dist(fA, fG);
                if (fE < fD) {
                  fD = fE;
                  fC = fF;
                }
              });
              return { mdist: fD, mpos: fC };
            },
            copy: function (fA) {
              return JSON.parse(JSON.stringify(fA));
            },
            dist: function (fD, fC) {
              var fB = fD.x - fC.x;
              var fA = fD.y - fC.y;
              return fv(fB * fB + fA * fA);
            },
            droots: function (fA) {
              if (fA.length === 3) {
                var fF = fA[0];
                var fD = fA[1];
                var fC = fA[2];
                var fB = fF - 2 * fD + fC;
                if (fB !== 0) {
                  var fI = -fv(fD * fD - fF * fC);
                  var fH = -fF + fD;
                  var fG = -(fI + fH) / fB;
                  var fE = -(-fI + fH) / fB;
                  return [fG, fE];
                } else {
                  if (fD !== fC && fB === 0) {
                    return [(2 * fD - fC) / (2 * (fD - fC))];
                  }
                }
                return [];
              }
              if (fA.length === 2) {
                var fF = fA[0];
                var fD = fA[1];
                if (fF !== fD) {
                  return [fF / (fF - fD)];
                }
                return [];
              }
            },
            expandbox: function (fB, fA) {
              if (fA.x.min < fB.x.min) {
                fB.x.min = fA.x.min;
              }
              if (fA.y.min < fB.y.min) {
                fB.y.min = fA.y.min;
              }
              if (fA.z && fA.z.min < fB.z.min) {
                fB.z.min = fA.z.min;
              }
              if (fA.x.max > fB.x.max) {
                fB.x.max = fA.x.max;
              }
              if (fA.y.max > fB.y.max) {
                fB.y.max = fA.y.max;
              }
              if (fA.z && fA.z.max > fB.z.max) {
                fB.z.max = fA.z.max;
              }
              fB.x.mid = (fB.x.min + fB.x.max) / 2;
              fB.y.mid = (fB.y.min + fB.y.max) / 2;
              if (fB.z) {
                fB.z.mid = (fB.z.min + fB.z.max) / 2;
              }
              fB.x.size = fB.x.max - fB.x.min;
              fB.y.size = fB.y.max - fB.y.min;
              if (fB.z) {
                fB.z.size = fB.z.max - fB.z.min;
              }
            },
            findbbox: function (fE) {
              var fC = 99999999;
              var fA = fC;
              var fD = -fC;
              var fB = fD;
              fE.forEach(function (fF) {
                var fG = fF.bbox();
                if (fC > fG.x.min) {
                  fC = fG.x.min;
                }
                if (fA > fG.y.min) {
                  fA = fG.y.min;
                }
                if (fD < fG.x.max) {
                  fD = fG.x.max;
                }
                if (fB < fG.y.max) {
                  fB = fG.y.max;
                }
              });
              return {
                x: { max: fD, mid: (fC + fD) / 2, min: fC, size: fD - fC },
                y: { max: fB, mid: (fA + fB) / 2, min: fA, size: fB - fA },
              };
            },
            getccenter: function (fC, fB, fA) {
              var fG = fB.x - fC.x;
              var fO = fB.y - fC.y;
              var fE = fA.x - fB.x;
              var fL = fA.y - fB.y;
              var fS = fG * fx(fn) - fO * fs(fn);
              var fH = fG * fs(fn) + fO * fx(fn);
              var fW = fE * fx(fn) - fL * fs(fn);
              var fN = fE * fs(fn) + fL * fx(fn);
              var fF = (fC.x + fB.x) / 2;
              var fM = (fC.y + fB.y) / 2;
              var fD = (fB.x + fA.x) / 2;
              var fK = (fB.y + fA.y) / 2;
              var fX = fF + fS;
              var fP = fM + fH;
              var fI = fD + fW;
              var fV = fK + fN;
              var fJ = ft.lli8(fF, fM, fX, fP, fD, fK, fI, fV);
              var fR = ft.dist(fJ, fC);
              var fQ = fy(fC.y - fJ.y, fC.x - fJ.x);
              var fT = fy(fB.y - fJ.y, fB.x - fJ.x);
              var fU = fy(fA.y - fJ.y, fA.x - fJ.x);
              if (fQ < fU) {
                if (fQ > fT || fT > fU) {
                  fQ += fo;
                }
                if (fQ > fU) {
                  fY = fU;
                  fU = fQ;
                  fQ = fY;
                }
              } else {
                if (fU < fT && fT < fQ) {
                  fY = fU;
                  fU = fQ;
                  fQ = fY;
                } else {
                  fU += fo;
                }
              }
              fJ.s = fQ;
              fJ.e = fU;
              fJ.r = fR;
              return fJ;
            },
            getminmax: function (fA, fF, fE) {
              if (!fE) {
                return { max: 0, min: 0 };
              }
              var fB = 1.8446744073709552e19;
              var fH = -fB;
              if (fE.indexOf(0) === -1) {
                fE = [0].concat(fE);
              }
              if (fE.indexOf(1) === -1) {
                fE.push(1);
              }
              for (var fC = 0, fD = fE.length; fC < fD; fC++) {
                fI = fE[fC];
                fG = fA.get(fI);
                if (fG[fF] < fB) {
                  fB = fG[fF];
                }
                if (fG[fF] > fH) {
                  fH = fG[fF];
                }
              }
              return { max: fH, mid: (fB + fH) / 2, min: fB, size: fH - fB };
            },
            inflections: function (fK) {
              if (fK.length < 4) {
                return [];
              }
              var fB = ft.align(fK, { p1: fK[0], p2: fK.slice(-1)[0] });
              var fH = fB[2].x * fB[1].y;
              var fF = fB[3].x * fB[1].y;
              var fD = fB[1].x * fB[2].y;
              var fC = fB[3].x * fB[2].y;
              var fJ = 18 * (-3 * fH + 2 * fF + 3 * fD - fC);
              var fG = 18 * (3 * fH - fF - 3 * fD);
              var fE = 18 * (fD - fH);
              if (ft.approximately(fJ, 0)) {
                return [];
              }
              var fI = fG * fG - 4 * fJ * fE;
              var fA = Math.sqrt(fI);
              var fC = 2 * fJ;
              if (ft.approximately(fC, 0)) {
                return [];
              }
              return [(fA - fG) / fC, -(fG + fA) / fC].filter(function (fL) {
                return 0 <= fL && fL <= 1;
              });
            },
            length: function (fE) {
              var fF = 0.5;
              var fD = 0;
              var fA = ft.Tvalues.length;
              for (var fC = 0; fC < fA; fC += 1) {
                fB = fF * ft.Tvalues[fC] + fF;
                fD += ft.Cvalues[fC] * ft.arcfn(fB, fE);
              }
              return fF * fD;
            },
            lerp: function (fB, fD, fC) {
              var fA = {
                x: fD.x + fB * (fC.x - fD.x),
                y: fD.y + fB * (fC.y - fD.y),
              };
              if (!!fD.z && !!fC.z) {
                fA.z = fD.z + fB * (fC.z - fD.z);
              }
              return fA;
            },
            lli: function (fB, fA) {
              return ft.lli4(fB, fB.c, fA, fA.c);
            },
            lli4: function (fK, fJ, fI, fG) {
              var fC = fK.x;
              var fH = fK.y;
              var fB = fJ.x;
              var fF = fJ.y;
              var fA = fI.x;
              var fE = fI.y;
              var fL = fG.x;
              var fD = fG.y;
              return ft.lli8(fC, fH, fB, fF, fA, fE, fL, fD);
            },
            lli8: function (fC, fJ, fB, fI, fA, fH, fK, fG) {
              var fE =
                (fC * fI - fJ * fB) * (fA - fK) -
                (fC - fB) * (fA * fG - fH * fK);
              var fD =
                (fC * fI - fJ * fB) * (fH - fG) -
                (fJ - fI) * (fA * fG - fH * fK);
              var fF = (fC - fB) * (fH - fG) - (fJ - fI) * (fA - fK);
              if (fF == 0) {
                return false;
              }
              return { x: fE / fF, y: fD / fF };
            },
            makeline: function (fH, fG) {
              var fD = fH.x;
              var fF = fH.y;
              var fC = fG.x;
              var fE = fG.y;
              var fB = (fC - fD) / 3;
              var fA = (fE - fF) / 3;
              return new fb(
                fD,
                fF,
                fD + fB,
                fF + fA,
                fD + 2 * fB,
                fF + 2 * fA,
                fC,
                fE,
              );
            },
            makeshape: function (fE, fD, fB) {
              var fH = fD.points.length;
              var fF = fE.points.length;
              var fA = ft.makeline(fD.points[fH - 1], fE.points[0]);
              var fC = ft.makeline(fE.points[fF - 1], fD.points[0]);
              var fG = {
                back: fD,
                bbox: ft.findbbox([fA, fE, fD, fC]),
                endcap: fC,
                forward: fE,
                startcap: fA,
              };
              var fI = ft;
              fG.intersections = function (fJ) {
                return fI.shapeintersections(fG, fG.bbox, fJ, fJ.bbox, fB);
              };
              return fG;
            },
            map: function (fI, fD, fH, fF, fE) {
              var fC = fH - fD;
              var fB = fE - fF;
              var fG = fI - fD;
              var fA = fG / fC;
              return fF + fB * fA;
            },
            pairiteration: function (fG, fE, fC) {
              var fD = fG.bbox();
              var fI = fE.bbox();
              var fA = 100000;
              var fH = fC || 0.5;
              if (fD.x.size + fD.y.size < fH && fI.x.size + fI.y.size < fH) {
                return [
                  (((fA * (fG._t1 + fG._t2)) / 2) | 0) / fA +
                    "/" +
                    (((fA * (fE._t1 + fE._t2)) / 2) | 0) / fA,
                ];
              }
              var fK = fG.split(0.5);
              var fJ = fE.split(0.5);
              var fB = [
                { left: fK.left, right: fJ.left },
                { left: fK.left, right: fJ.right },
                { left: fK.right, right: fJ.right },
                { left: fK.right, right: fJ.left },
              ];
              fB = fB.filter(function (fL) {
                return ft.bboxoverlap(fL.left.bbox(), fL.right.bbox());
              });
              var fF = [];
              if (fB.length === 0) {
                return fF;
              }
              fB.forEach(function (fL) {
                fF = fF.concat(ft.pairiteration(fL.left, fL.right, fH));
              });
              fF = fF.filter(function (fL, fM) {
                return fF.indexOf(fL) === fM;
              });
              return fF;
            },
            pointToString: function (fB) {
              var fA = fB.x + "/" + fB.y;
              if (typeof fB.z !== "undefined") {
                fA += "/" + fB.z;
              }
              return fA;
            },
            pointsToString: function (fA) {
              return "[" + fA.map(ft.pointToString).join(", ") + "]";
            },
            projectionratio: function (fB, fD) {
              if (fD !== 2 && fD !== 3) {
                return false;
              }
              if (typeof fB === "undefined") {
                fB = 0.5;
              } else {
                if (fB === 0 || fB === 1) {
                  return fB;
                }
              }
              var fC = fq(1 - fB, fD);
              var fA = fq(fB, fD) + fC;
              return fC / fA;
            },
            roots: function (fW, fO) {
              fO = fO || { p1: { x: 0, y: 0 }, p2: { x: 1, y: 0 } };
              var fU = fW.length - 1;
              var fT = ft.align(fW, fO);
              var fP = function (f8) {
                return 0 <= f8 && f8 <= 1;
              };
              if (fU === 2) {
                var f6 = fT[0].y;
                var f5 = fT[1].y;
                var f4 = fT[2].y;
                var f2 = f6 - 2 * f5 + f4;
                if (f2 !== 0) {
                  var fF = -fv(f5 * f5 - f6 * f4);
                  var fD = -f6 + f5;
                  var fJ = -(fF + fD) / f2;
                  var fH = -(-fF + fD) / f2;
                  return [fJ, fH].filter(fP);
                } else {
                  if (f5 !== f4 && f2 === 0) {
                    return [((2 * f5 - f4) / 2) * (f5 - f4)].filter(fP);
                  }
                }
                return [];
              }
              var fG = fT[0].y;
              var fE = fT[1].y;
              var fB = fT[2].y;
              var f7 = fT[3].y;
              var f2 = -fG + 3 * fE - 3 * fB + f7;
              var f6 = (3 * fG - 6 * fE + 3 * fB) / f2;
              var f5 = (-3 * fG + 3 * fE) / f2;
              var f4 = fG / f2;
              var fT = (3 * f5 - f6 * f6) / 3;
              var fC = fT / 3;
              var fS = (2 * f6 * f6 * f6 - 9 * f6 * f5 + 27 * f4) / 27;
              var fL = fS / 2;
              var f3 = fL * fL + fC * fC * fC;
              if (f3 < 0) {
                var fK = -fT / 3;
                var fN = fK * fK * fK;
                var fR = fv(fN);
                var fQ = -fS / (2 * fR);
                var f0 = fQ < -1 ? -1 : fQ > 1 ? 1 : fQ;
                var fI = fr(f0);
                var f1 = fu(fR);
                var fM = 2 * f1;
                fZ = fM * fx(fI / 3) - f6 / 3;
                fX = fM * fx((fI + fo) / 3) - f6 / 3;
                fV = fM * fx((fI + 2 * fo) / 3) - f6 / 3;
                return [fZ, fX, fV].filter(fP);
              } else {
                if (f3 === 0) {
                  fY = fL < 0 ? fu(-fL) : -fu(fL);
                  fZ = 2 * fY - f6 / 3;
                  fX = -fY - f6 / 3;
                  return [fZ, fX].filter(fP);
                } else {
                  var fA = fv(f3);
                  fY = fu(-fL + fA);
                  fJ = fu(fL + fA);
                  return [fY - fJ - f6 / 3].filter(fP);
                }
              }
            },
            round: function (fA, fC) {
              var fB = "" + fA;
              var fD = fB.indexOf(".");
              return parseFloat(fB.substring(0, fD + 1 + fC));
            },
            shapeintersections: function (fE, fG, fD, fF, fC) {
              if (!ft.bboxoverlap(fG, fF)) {
                return [];
              }
              var fH = [];
              var fB = [fE.startcap, fE.forward, fE.back, fE.endcap];
              var fA = [fD.startcap, fD.forward, fD.back, fD.endcap];
              fB.forEach(function (fI) {
                if (fI.virtual) {
                  return;
                }
                fA.forEach(function (fJ) {
                  if (fJ.virtual) {
                    return;
                  }
                  var fK = fI.intersects(fJ, fC);
                  if (fK.length > 0) {
                    fK.c1 = fI;
                    fK.c2 = fJ;
                    fK.s1 = fE;
                    fK.s2 = fD;
                    fH.push(fK);
                  }
                });
              });
              return fH;
            },
          };
          return ft;
        })();
        var fd = (function () {
          var fn = function (fo) {
            this.curves = [];
            this._3d = false;
            if (fo) {
              this.curves = fo;
              this._3d = this.curves[0]._3d;
            }
          };
          fn.prototype = {
            addCurve: function (fo) {
              this.curves.push(fo);
              this._3d = this._3d || fo._3d;
            },
            bbox: function () {
              var fq = this.curves;
              var fp = fq[0].bbox();
              for (var fo = 1; fo < fq.length; fo += 1) {
                fk.expandbox(fp, fq[fo].bbox());
              }
              return fp;
            },
            curve: function (fo) {
              return this.curves[fo];
            },
            length: function () {
              return this.curves
                .map(function (fo) {
                  return fo.length();
                })
                .reduce(function (fp, fo) {
                  return fp + fo;
                });
            },
            offset: function (fp) {
              var fo = [];
              this.curves.forEach(function (fq) {
                fo = fo.concat(fq.offset(fp));
              });
              return new fn(fo);
            },
            toString: function () {
              return fk.pointsToString(this.points);
            },
            valueOf: function () {
              return this.toString();
            },
          };
          return fn;
        })();
        var fb = function (fs) {
          var fr = fs && fs.forEach ? fs : [].slice.call(arguments);
          var fy = false;
          if (typeof fr[0] === "object") {
            fy = fr.length;
            var fx = [];
            fr.forEach(function (fz) {
              ["x", "y", "z"].forEach(function (fA) {
                if (typeof fz[fA] !== "undefined") {
                  fx.push(fz[fA]);
                }
              });
            });
            fr = fx;
          }
          var fo = false;
          var fq = fr.length;
          if (fy) {
            if (fy > 4) {
              if (arguments.length !== 1) {
                throw new Error(
                  "Only new Bezier(point[]) is accepted for 4th and higher order curves",
                );
              }
              fo = true;
            }
          } else {
            if (fq !== 6 && fq !== 8 && fq !== 9 && fq !== 12) {
              if (arguments.length !== 1) {
                throw new Error(
                  "Only new Bezier(point[]) is accepted for 4th and higher order curves",
                );
              }
            }
          }
          var fp =
            (!fo && (fq === 9 || fq === 12)) ||
            (fs && fs[0] && typeof fs[0].z !== "undefined");
          this._3d = fp;
          var fw = [];
          for (var fv = 0, fn = fp ? 3 : 2; fv < fq; fv += fn) {
            var fu = { x: fr[fv], y: fr[fv + 1] };
            if (fp) {
              fu.z = fr[fv + 2];
            }
            fw.push(fu);
          }
          this.order = fw.length - 1;
          this.points = fw;
          var ft = ["x", "y"];
          if (fp) {
            ft.push("z");
          }
          this.dims = ft;
          this.dimlen = ft.length;
          (function (fD) {
            var fz = fD.order;
            var fC = fD.points;
            var fA = fk.align(fC, { p1: fC[0], p2: fC[fz] });
            for (var fB = 0; fB < fA.length; fB += 1) {
              if (fm(fA[fB].y) > 0.0001) {
                fD._linear = false;
                return;
              }
            }
            fD._linear = true;
          })(this);
          this._t1 = 0;
          this._t2 = 1;
          this.update();
        };
        fb.fromSVG = function (fn) {
          var fp = fn.match(/[-+]?\d*\.?\d+(?:[eE][-+]?\d+)?/g).map(parseFloat);
          var fo = /[cq]/.test(fn);
          if (!fo) {
            return new fb(fp);
          }
          fp = fp.map(function (fq, fr) {
            return fr < 2 ? fq : fq + fp[fr % 2];
          });
          return new fb(fp);
        };
        fb.quadraticFromPoints = function (fr, fq, fp, fn) {
          if (typeof fn === "undefined") {
            fn = 0.5;
          }
          if (fn === 0) {
            return new fb(fq, fq, fp);
          }
          if (fn === 1) {
            return new fb(fr, fq, fq);
          }
          var fo = fj(2, fr, fq, fp, fn);
          return new fb(fr, fo.A, fp);
        };
        fb.cubicFromPoints = function (fs, fB, fz, fA, fH) {
          if (typeof fA === "undefined") {
            fA = 0.5;
          }
          var fE = fj(3, fs, fB, fz, fA);
          if (typeof fH === "undefined") {
            fH = fk.dist(fB, fE.C);
          }
          var fF = (fH * (1 - fA)) / fA;
          var fD = fk.dist(fs, fz);
          var fr = (fz.x - fs.x) / fD;
          var fq = (fz.y - fs.y) / fD;
          var fn = fH * fr;
          var fw = fH * fq;
          var fG = fF * fr;
          var fv = fF * fq;
          var fu = { x: fB.x - fn, y: fB.y - fw };
          var ft = { x: fB.x + fG, y: fB.y + fv };
          var fC = fE.A;
          var fp = {
            x: fC.x + (fu.x - fC.x) / (1 - fA),
            y: fC.y + (fu.y - fC.y) / (1 - fA),
          };
          var fo = {
            x: fC.x + (ft.x - fC.x) / fA,
            y: fC.y + (ft.y - fC.y) / fA,
          };
          var fy = {
            x: fs.x + (fp.x - fs.x) / fA,
            y: fs.y + (fp.y - fs.y) / fA,
          };
          var fx = {
            x: fz.x + (fo.x - fz.x) / (1 - fA),
            y: fz.y + (fo.y - fz.y) / (1 - fA),
          };
          return new fb(fs, fy, fx, fz);
        };
        var fc = function () {
          return fk;
        };
        fb.getUtils = fc;
        fb.prototype = {
          __normal2: function (fn) {
            var fp = this.derivative(fn);
            var fo = fl(fp.x * fp.x + fp.y * fp.y);
            return { x: -fp.y / fo, y: fp.x / fo };
          },
          __normal3: function (fv) {
            var fp = this.derivative(fv);
            var fn = this.derivative(fv + 0.01);
            var ft = fl(fp.x * fp.x + fp.y * fp.y + fp.z * fp.z);
            var fs = fl(fn.x * fn.x + fn.y * fn.y + fn.z * fn.z);
            fp.x /= ft;
            fp.y /= ft;
            fp.z /= ft;
            fn.x /= fs;
            fn.y /= fs;
            fn.z /= fs;
            var fu = {
              x: fn.y * fp.z - fn.z * fp.y,
              y: fn.z * fp.x - fn.x * fp.z,
              z: fn.x * fp.y - fn.y * fp.x,
            };
            var fq = fl(fu.x * fu.x + fu.y * fu.y + fu.z * fu.z);
            fu.x /= fq;
            fu.y /= fq;
            fu.z /= fq;
            var fr = [
              fu.x * fu.x,
              fu.x * fu.y - fu.z,
              fu.x * fu.z + fu.y,
              fu.x * fu.y + fu.z,
              fu.y * fu.y,
              fu.y * fu.z - fu.x,
              fu.x * fu.z - fu.y,
              fu.y * fu.z + fu.x,
              fu.z * fu.z,
            ];
            var fo = {
              x: fr[0] * fp.x + fr[1] * fp.y + fr[2] * fp.z,
              y: fr[3] * fp.x + fr[4] * fp.y + fr[5] * fp.z,
              z: fr[6] * fp.x + fr[7] * fp.y + fr[8] * fp.z,
            };
            return fo;
          },
          _error: function (fu, fv, fw, ft) {
            var fp = (ft - fw) / 4;
            var fs = this.get(fw + fp);
            var fr = this.get(ft - fp);
            var fq = fk.dist(fu, fv);
            var fo = fk.dist(fu, fs);
            var fn = fk.dist(fu, fr);
            return fm(fo - fq) + fm(fn - fq);
          },
          _iterate: function (fu, fr) {
            var fC = 0;
            var ft = 1;
            do {
              fs = 0;
              ft = 1;
              var fA = this.get(fC);
              var fw = false;
              var fB = false;
              var fo = ft;
              var fp = 1;
              do {
                fB = fw;
                fz = fn;
                fo = (fC + ft) / 2;
                fy = this.get(fo);
                fx = this.get(ft);
                fn = fk.getccenter(fA, fy, fx);
                var fv = this._error(fn, fA, fC, ft);
                fw = fv <= fu;
                fq = fB && !fw;
                if (!fq) {
                  fp = ft;
                }
                if (fw) {
                  if (ft >= 1) {
                    fp = 1;
                    fz = fn;
                    break;
                  }
                  ft = ft + (ft - fC) / 2;
                } else {
                  ft = fo;
                }
              } while (!fq && fs++ < 100);
              if (fs >= 100) {
                console.error("arc abstraction somehow failed...");
                break;
              }
              fz = fz ? fz : fn;
              fr.push(fz);
              fC = fp;
            } while (ft < 1);
            return fr;
          },
          _lut: [],
          arcs: function (fn) {
            fn = fn || 0.5;
            var fo = [];
            return this._iterate(fn, fo);
          },
          bbox: function () {
            var fo = this.extrema();
            var fn = {};
            this.dims.forEach(
              function (fp) {
                fn[fp] = fk.getminmax(this, fp, fo[fp]);
              }.bind(this),
            );
            return fn;
          },
          compute: function (fy) {
            if (fy === 0) {
              return this.points[0];
            }
            if (fy === 1) {
              return this.points[this.order];
            }
            var fo = this.points;
            var fn = 1 - fy;
            if (this.order === 1) {
              fs = {
                x: fn * fo[0].x + fy * fo[1].x,
                y: fn * fo[0].y + fy * fo[1].y,
              };
              if (this._3d) {
                fs.z = fn * fo[0].z + fy * fo[1].z;
              }
              return fs;
            }
            if (this.order < 4) {
              var fp = fn * fn;
              var fr = fy * fy;
              var ft = 0;
              if (this.order === 2) {
                fo = [fo[0], fo[1], fo[2], fg];
                fw = fp;
                fv = fn * fy * 2;
                fu = fr;
              } else {
                if (this.order === 3) {
                  fw = fp * fn;
                  fv = fp * fy * 3;
                  fu = fn * fr * 3;
                  ft = fy * fr;
                }
              }
              var fs = {
                x: fw * fo[0].x + fv * fo[1].x + fu * fo[2].x + ft * fo[3].x,
                y: fw * fo[0].y + fv * fo[1].y + fu * fo[2].y + ft * fo[3].y,
              };
              if (this._3d) {
                fs.z =
                  fw * fo[0].z + fv * fo[1].z + fu * fo[2].z + ft * fo[3].z;
              }
              return fs;
            }
            var fx = JSON.parse(JSON.stringify(this.points));
            while (fx.length > 1) {
              for (var fq = 0; fq < fx.length - 1; fq += 1) {
                fx[fq] = {
                  x: fx[fq].x + (fx[fq + 1].x - fx[fq].x) * fy,
                  y: fx[fq].y + (fx[fq + 1].y - fx[fq].y) * fy,
                };
                if (typeof fx[fq].z !== "undefined") {
                  fx[fq] = fx[fq].z + (fx[fq + 1].z - fx[fq].z) * fy;
                }
              }
              fx.splice(fx.length - 1, 1);
            }
            return fx[0];
          },
          computedirection: function () {
            var fn = this.points;
            var fo = fk.angle(fn[0], fn[this.order], fn[1]);
            this.clockwise = fo > 0;
          },
          curveintersects: function (fp, fo, fn) {
            var fq = [];
            fp.forEach(function (fs) {
              fo.forEach(function (ft) {
                if (fs.overlaps(ft)) {
                  fq.push({ left: fs, right: ft });
                }
              });
            });
            var fr = [];
            fq.forEach(function (ft) {
              var fs = fk.pairiteration(ft.left, ft.right, fn);
              if (fs.length > 0) {
                fr = fr.concat(fs);
              }
            });
            return fr;
          },
          derivative: function (fr) {
            var fp = 1 - fr;
            var ft = 0;
            var fs = this.dpoints[0];
            if (this.order === 2) {
              fs = [fs[0], fs[1], fg];
              fo = fp;
              fn = fr;
            }
            if (this.order === 3) {
              fo = fp * fp;
              fn = fp * fr * 2;
              ft = fr * fr;
            }
            var fq = {
              x: fo * fs[0].x + fn * fs[1].x + ft * fs[2].x,
              y: fo * fs[0].y + fn * fs[1].y + ft * fs[2].y,
            };
            if (this._3d) {
              fq.z = fo * fs[0].z + fn * fs[1].z + ft * fs[2].z;
            }
            return fq;
          },
          extrema: function () {
            var fr = this.dims;
            var fn = {};
            var fo = [];
            fr.forEach(
              function (fs) {
                fq = function (ft) {
                  return ft[fs];
                };
                fp = this.dpoints[0].map(fq);
                fn[fs] = fk.droots(fp);
                if (this.order === 3) {
                  fp = this.dpoints[1].map(fq);
                  fn[fs] = fn[fs].concat(fk.droots(fp));
                }
                fn[fs] = fn[fs].filter(function (ft) {
                  return ft >= 0 && ft <= 1;
                });
                fo = fo.concat(fn[fs].sort());
              }.bind(this),
            );
            fo = fo.sort().filter(function (ft, fs) {
              return fo.indexOf(ft) === fs;
            });
            fn.values = fo;
            return fn;
          },
          get: function (fn) {
            return this.compute(fn);
          },
          getLUT: function (fn) {
            fn = fn || 100;
            if (this._lut.length === fn) {
              return this._lut;
            }
            this._lut = [];
            for (var fo = 0; fo <= fn; fo += 1) {
              this._lut.push(this.compute(fo / fn));
            }
            return this._lut;
          },
          getUtils: fc,
          hull: function (fr) {
            var fu = this.points;
            var fo = [];
            var fs = [];
            var fn = 0;
            var fq = 0;
            var fp = 0;
            fs[fn++] = fu[0];
            fs[fn++] = fu[1];
            fs[fn++] = fu[2];
            if (this.order === 3) {
              fs[fn++] = fu[3];
            }
            while (fu.length > 1) {
              fo = [];
              for (fq = 0, fp = fu.length - 1; fq < fp; fq++) {
                ft = fk.lerp(fr, fu[fq], fu[fq + 1]);
                fs[fn++] = ft;
                fo.push(ft);
              }
              fu = fo;
            }
            return fs;
          },
          infiniteLineIntersects: function (fn) {
            self = this;
            return fk.roots(this.points, fn);
          },
          inflections: function () {
            return fk.inflections(this.points);
          },
          intersects: function (fo, fn) {
            if (!fo) {
              return this.selfintersects(fn);
            }
            if (fo.p1 && fo.p2) {
              return this.lineIntersects(fo);
            }
            if (fo instanceof fb) {
              fo = fo.reduce();
            }
            return this.curveintersects(this.reduce(), fo, fn);
          },
          length: function () {
            return fk.length(this.derivative.bind(this));
          },
          lineIntersects: function (fn) {
            var fr = fe(fn.p1.x, fn.p2.x);
            var fp = fe(fn.p1.y, fn.p2.y);
            var fs = fi(fn.p1.x, fn.p2.x);
            var fq = fi(fn.p1.y, fn.p2.y);
            var fo = this;
            return fk.roots(this.points, fn).filter(function (ft) {
              var fu = fo.get(ft);
              return fk.between(fu.x, fr, fs) && fk.between(fu.y, fp, fq);
            });
          },
          normal: function (fn) {
            return this._3d ? this.__normal3(fn) : this.__normal2(fn);
          },
          offset: function (fq, fs) {
            if (typeof fs !== "undefined") {
              var fu = this.get(fq);
              var ft = this.normal(fq);
              var fp = {
                c: fu,
                n: ft,
                x: fu.x + ft.x * fs,
                y: fu.y + ft.y * fs,
              };
              if (this._3d) {
                fp.z = fu.z + ft.z * fs;
              }
              return fp;
            }
            if (this._linear) {
              var fo = this.normal(0);
              var fr = this.points.map(function (fw) {
                var fv = { x: fw.x + fq * fo.x, y: fw.y + fq * fo.y };
                if (fw.z && ft.z) {
                  fv.z = fw.z + fq * fo.z;
                }
                return fv;
              });
              return [new fb(fr)];
            }
            var fn = this.reduce();
            return fn.map(function (fv) {
              return fv.scale(fq);
            });
          },
          on: function (fo, fp) {
            fp = fp || 5;
            var fs = this.getLUT();
            var fn = [];
            var fr = 0;
            for (var fq = 0; fq < fs.length; fq += 1) {
              ft = fs[fq];
              if (fk.dist(ft, fo) < fp) {
                fn.push(ft);
                fr += fq / fs.length;
              }
            }
            if (!fn.length) {
              return false;
            }
            return (fr /= fn.length);
          },
          outline: function (fI, fH, fF, fE) {
            function ft(fJ, fM, fs, fK, fL) {
              return function (fO) {
                var fN = fK / fs;
                var fQ = (fK + fL) / fs;
                var fP = fM - fJ;
                return fk.map(fO, 0, 1, fJ + fN * fP, fJ + fQ * fP);
              };
            }
            fH = typeof fH === "undefined" ? fI : fH;
            var fy = this.reduce();
            var fA = fy.length;
            var fB = [];
            var fo = [];
            var fq = 0;
            var fn = this.length();
            var fG = typeof fF !== "undefined" && typeof fE !== "undefined";
            fy.forEach(function (fs) {
              fC = fs.length();
              if (fG) {
                fB.push(fs.scale(ft(fI, fF, fn, fq, fC)));
                fo.push(fs.scale(ft(-fH, -fE, fn, fq, fC)));
              } else {
                fB.push(fs.scale(fI));
                fo.push(fs.scale(-fH));
              }
              fq += fC;
            });
            fo = fo
              .map(function (fs) {
                fx = fs.points;
                if (fx[3]) {
                  fs.points = [fx[3], fx[2], fx[1], fx[0]];
                } else {
                  fs.points = [fx[2], fx[1], fx[0]];
                }
                return fs;
              })
              .reverse();
            var fr = fB[0].points[0];
            var fv = fB[fA - 1].points[fB[fA - 1].points.length - 1];
            var fD = fo[fA - 1].points[fo[fA - 1].points.length - 1];
            var fp = fo[0].points[0];
            var fu = fk.makeline(fD, fr);
            var fw = fk.makeline(fv, fp);
            var fz = [fu].concat(fB).concat([fw]).concat(fo);
            var fC = fz.length;
            return new fd(fz);
          },
          outlineshapes: function (fu, ft, fq) {
            ft = ft || fu;
            var fs = this.outline(fu, ft).curves;
            var fo = [];
            for (var fr = 1, fn = fs.length; fr < fn / 2; fr++) {
              var fp = fk.makeshape(fs[fr], fs[fn - fr], fq);
              fp.startcap.virtual = fr > 1;
              fp.endcap.virtual = fr < fn / 2 - 1;
              fo.push(fp);
            }
            return fo;
          },
          overlaps: function (fp) {
            var fo = this.bbox();
            var fn = fp.bbox();
            return fk.bboxoverlap(fo, fn);
          },
          point: function (fn) {
            return this.points[fn];
          },
          project: function (fz) {
            var fs = this.getLUT();
            var fu = fs.length - 1;
            var fo = fk.closest(fs, fz);
            var fq = fo.mdist;
            var fr = fo.mpos;
            if (fr === 0 || fr === fu) {
              var fA = fr / fu;
              var fB = this.compute(fA);
              fB.t = fA;
              fB.d = fq;
              return fB;
            }
            var fx = (fr - 1) / fu;
            var fv = (fr + 1) / fu;
            var fp = 0.1 / fu;
            fq += 1;
            for (fA = fx, fw = fA; fA < fv + fp; fA += fp) {
              fn = this.compute(fA);
              fy = fk.dist(fz, fn);
              if (fy < fq) {
                fq = fy;
                fw = fA;
              }
            }
            fn = this.compute(fw);
            fn.t = fw;
            fn.d = fq;
            return fn;
          },
          raise: function () {
            var fs = this.points;
            var fr = [fs[0]];
            var fn = fs.length;
            for (var fp = 1; fp < fn; fp += 1) {
              fq = fs[fp];
              fo = fs[fp - 1];
              fr[fp] = {
                x: ((fn - fp) / fn) * fq.x + (fp / fn) * fo.x,
                y: ((fn - fp) / fn) * fq.y + (fp / fn) * fo.y,
              };
            }
            fr[fn] = fs[fn - 1];
            return new fb(fr);
          },
          reduce: function () {
            var ft = 0;
            var fq = 0;
            var fs = 0.01;
            var fo = [];
            var fn = [];
            var fu = this.extrema().values;
            if (fu.indexOf(0) === -1) {
              fu = [0].concat(fu);
            }
            if (fu.indexOf(1) === -1) {
              fu.push(1);
            }
            for (ft = fu[0], fp = 1; fp < fu.length; fp++) {
              fq = fu[fp];
              fr = this.split(ft, fq);
              fr._t1 = ft;
              fr._t2 = fq;
              fo.push(fr);
              ft = fq;
            }
            fo.forEach(function (fv) {
              ft = 0;
              fq = 0;
              while (fq <= 1) {
                for (fq = ft + fs; fq <= 1 + fs; fq += fs) {
                  fr = fv.split(ft, fq);
                  if (!fr.simple()) {
                    fq -= fs;
                    if (fm(ft - fq) < fs) {
                      return [];
                    }
                    fr = fv.split(ft, fq);
                    fr._t1 = fk.map(ft, 0, 1, fv._t1, fv._t2);
                    fr._t2 = fk.map(fq, 0, 1, fv._t1, fv._t2);
                    fn.push(fr);
                    ft = fq;
                    break;
                  }
                }
              }
              if (ft < 1) {
                fr = fv.split(ft, 1);
                fr._t1 = fk.map(ft, 0, 1, fv._t1, fv._t2);
                fr._t2 = fv._t2;
                fn.push(fr);
              }
            });
            return fn;
          },
          scale: function (ft) {
            var fs = this.order;
            var fo = false;
            if (typeof ft === "function") {
              fo = ft;
            }
            if (fo && fs === 2) {
              return this.raise().scale(fo);
            }
            var fn = this.clockwise;
            var fr = fo ? fo(0) : ft;
            var fq = fo ? fo(1) : ft;
            var fw = [this.offset(0, 10), this.offset(1, 10)];
            var fp = fk.lli4(fw[0], fw[0].c, fw[1], fw[1].c);
            if (!fp) {
              throw new Error(
                "cannot scale this curve. Try reducing it first.",
              );
            }
            var fv = this.points;
            var fu = [];
            [0, 1].forEach(
              function (fx) {
                var fy = (fu[fx * fs] = fk.copy(fv[fx * fs]));
                fy.x += fx ? fq : fr * fw[fx].n.x;
                fy.y += fx ? fq : fr * fw[fx].n.y;
              }.bind(this),
            );
            if (!fo) {
              [0, 1].forEach(
                function (fx) {
                  if (this.order === 2 && !!fx) {
                    return;
                  }
                  var fz = fu[fx * fs];
                  var fA = this.derivative(fx);
                  var fy = { x: fz.x + fA.x, y: fz.y + fA.y };
                  fu[fx + 1] = fk.lli4(fz, fy, fp, fv[fx + 1]);
                }.bind(this),
              );
              return new fb(fu);
            }
            [0, 1].forEach(
              function (fz) {
                if (this.order === 2 && !!fz) {
                  return;
                }
                var fB = fv[fz + 1];
                var fy = { x: fB.x - fp.x, y: fB.y - fp.y };
                var fA = fo ? fo((fz + 1) / fs) : ft;
                if (fo && !fn) {
                  fA = -fA;
                }
                var fx = fl(fy.x * fy.x + fy.y * fy.y);
                fy.x /= fx;
                fy.y /= fx;
                fu[fz + 1] = { x: fB.x + fA * fy.x, y: fB.y + fA * fy.y };
              }.bind(this),
            );
            return new fb(fu);
          },
          selfintersects: function (fq) {
            var fp = this.reduce();
            var fo = fp.length - 2;
            var fs = [];
            for (var ft = 0; ft < fo; ft += 1) {
              fu = fp.slice(ft, ft + 1);
              fr = fp.slice(ft + 2);
              fn = this.curveintersects(fu, fr, fq);
              fs = fs.concat(fn);
            }
            return fs;
          },
          simple: function () {
            if (this.order === 3) {
              var fo = fk.angle(this.points[0], this.points[3], this.points[1]);
              var fn = fk.angle(this.points[0], this.points[3], this.points[2]);
              if (((fo > 0 && fn < 0) || fo < 0) && fn > 0) {
                return false;
              }
            }
            var fr = this.normal(0);
            var fp = this.normal(1);
            var fq = fr.x * fp.x + fr.y * fp.y;
            if (this._3d) {
              fq += fr.z * fp.z;
            }
            var fs = fm(fh(fq));
            return fs < ff / 3;
          },
          split: function (fp, fo) {
            if (fp === 0 && !!fo) {
              return this.split(fo).left;
            }
            if (fo === 1) {
              return this.split(fp).right;
            }
            var fq = this.hull(fp);
            var fn = {
              left:
                this.order === 2
                  ? new fb([fq[0], fq[3], fq[5]])
                  : new fb([fq[0], fq[4], fq[7], fq[9]]),
              right:
                this.order === 2
                  ? new fb([fq[5], fq[4], fq[2]])
                  : new fb([fq[9], fq[8], fq[6], fq[3]]),
              span: fq,
            };
            fn.left._t1 = fk.map(0, 0, 1, this._t1, this._t2);
            fn.left._t2 = fk.map(fp, 0, 1, this._t1, this._t2);
            fn.right._t1 = fk.map(fp, 0, 1, this._t1, this._t2);
            fn.right._t2 = fk.map(1, 0, 1, this._t1, this._t2);
            if (!fo) {
              return fn;
            }
            fo = fk.map(fo, fp, 1, 0, 1);
            var fr = fn.right.split(fo);
            return fr.left;
          },
          toSVG: function (fr) {
            if (this._3d) {
              return false;
            }
            var fs = this.points;
            var fn = fs[0].x;
            var ft = fs[0].y;
            var fp = ["M", fn, ft, this.order === 2 ? "Q" : "C"];
            for (var fo = 1, fq = fs.length; fo < fq; fo++) {
              fp.push(fs[fo].x);
              fp.push(fs[fo].y);
            }
            return fp.join(" ");
          },
          toString: function () {
            return fk.pointsToString(this.points);
          },
          update: function () {
            this.dpoints = [];
            for (
              var fq = this.points, fr = fq.length, fs = fr - 1;
              fr > 1;
              fr--, fs--
            ) {
              var fp = [];
              for (var fn = 0, fo; fn < fs; fn++) {
                fo = {
                  x: fs * (fq[fn + 1].x - fq[fn].x),
                  y: fs * (fq[fn + 1].y - fq[fn].y),
                };
                if (this._3d) {
                  fo.z = fs * (fq[fn + 1].z - fq[fn].z);
                }
                fp.push(fo);
              }
              this.dpoints.push(fp);
              fq = fp;
            }
            this.computedirection();
          },
          valueOf: function () {
            return this.toString();
          },
        };
        return fb;
      })();
      if (!Function.prototype.bind) {
        Function.prototype.bind = function (fb) {
          if (typeof this !== "function") {
            throw new TypeError(
              "Function.prototype.bind - what is trying to be bound is not callable",
            );
          }
          var ff = Array.prototype.slice.call(arguments, 1);
          var fe = this;
          var fc = function () {};
          var fd = function () {
            return fe.apply(
              this instanceof fc ? this : fb,
              ff.concat(Array.prototype.slice.call(arguments)),
            );
          };
          if (this.prototype) {
            fc.prototype = this.prototype;
          }
          fd.prototype = new fc();
          return fd;
        };
      }
      if (!Array.prototype.forEach) {
        Array.prototype.forEach = function (fh, fc) {
          if (this == null) {
            throw new TypeError(" this is null or not defined");
          }
          var fg = Object(this);
          var fb = fg.length >>> 0;
          if (typeof fh !== "function") {
            throw new TypeError(fh + " is not a function");
          }
          if (arguments.length > 1) {
            fe = fc;
          }
          fd = 0;
          while (fd < fb) {
            if (fd in fg) {
              ff = fg[fd];
              fh.call(fe, ff, fd, fg);
            }
            fd++;
          }
        };
      }
      if (!String.prototype.endsWith) {
        String.prototype.endsWith = function (fd, fc) {
          var fb = this.toString();
          if (
            typeof fc !== "number" ||
            !isFinite(fc) ||
            Math.floor(fc) !== fc ||
            fc > fb.length
          ) {
            fc = fb.length;
          }
          fc -= fd.length;
          var fe = fb.indexOf(fd, fc);
          return fe !== -1 && fe === fc;
        };
      }
      if (!Array.prototype.some) {
        Array.prototype.some = function (fd) {
          if (this == null) {
            throw new TypeError(
              "Array.prototype.some called on null or undefined",
            );
          }
          if (typeof fd !== "function") {
            throw new TypeError();
          }
          var ff = Object(this);
          var fb = ff.length >>> 0;
          var fc = arguments.length >= 2 ? arguments[1] : void 0;
          for (var fe = 0; fe < fb; fe += 1) {
            if (fe in ff && fd.call(fc, ff[fe], fe, ff)) {
              return true;
            }
          }
          return false;
        };
      }
      if (!Array.prototype.indexOf) {
        Array.prototype.indexOf = function (fd, fe) {
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }
          var ff = Object(this);
          var fb = ff.length >>> 0;
          if (fb === 0) {
            return -1;
          }
          var fg = fe || 0;
          if (Math.abs(fg) === Infinity) {
            fg = 0;
          }
          if (fg >= fb) {
            return -1;
          }
          fc = Math.max(fg >= 0 ? fg : fb - Math.abs(fg), 0);
          while (fc < fb) {
            if (fc in ff && ff[fc] === fd) {
              return fc;
            }
            fc++;
          }
          return -1;
        };
      }
      if ("function" !== typeof Array.prototype.reduceRight) {
        Array.prototype.reduceRight = function (ff) {
          if (null === this || "undefined" === typeof this) {
            throw new TypeError(
              "Array.prototype.reduce called on null or undefined",
            );
          }
          if ("function" !== typeof ff) {
            throw new TypeError(ff + " is not a function");
          }
          var fd = Object(this);
          var fb = fd.length >>> 0;
          var fc = fb - 1;
          if (arguments.length >= 2) {
            fe = arguments[1];
          } else {
            while (fc >= 0 && !(fc in fd)) {
              fc--;
            }
            if (fc < 0) {
              throw new TypeError(
                "Reduce of empty array with no initial value",
              );
            }
            fe = fd[fc--];
          }
          for (; fc >= 0; fc--) {
            if (fc in fd) {
              fe = ff(fe, fd[fc], fc, fd);
            }
          }
          return fe;
        };
      }
      if (!Array.prototype.filter) {
        Array.prototype.filter = function (fg, fc) {
          if (
            !((typeof fg === "Function" || typeof fg === "function") && this)
          ) {
            throw new TypeError();
          }
          var fb = this.length >>> 0;
          var ff = new Array(fb);
          var fe = this;
          var fh = 0;
          var fd = -1;
          if (fc === undefined) {
            while (++fd !== fb) {
              if (fd in this) {
                if (fg(fe[fd], fd, fe)) {
                  ff[fh++] = fe[fd];
                }
              }
            }
          } else {
            while (++fd !== fb) {
              if (fd in this) {
                if (fg.call(fc, fe[fd], fd, fe)) {
                  ff[fh++] = fe[fd];
                }
              }
            }
          }
          ff.length = fh;
          return ff;
        };
      }
      var dP = (function () {
        function fg(fr, fs) {
          return 1 - 3 * fs + 3 * fr;
        }
        function fc(fr, fs) {
          return 3 * fs - 6 * fr;
        }
        function fb(fr) {
          return 3 * fr;
        }
        function fi(ft, fr, fs) {
          return ((fg(fr, fs) * ft + fc(fr, fs)) * ft + fb(fr)) * ft;
        }
        function fe(ft, fr, fs) {
          return 3 * fg(fr, fs) * ft * ft + 2 * fc(fr, fs) * ft + fb(fr);
        }
        function fm(fv, fw, fu, fy, fx) {
          var fs = 0;
          do {
            ft = fw + (fu - fw) / 2;
            fr = fi(ft, fy, fx) - fv;
            if (fr > 0) {
              fu = ft;
            } else {
              fw = ft;
            }
          } while (Math.abs(fr) > fl && ++fs < ff);
          return ft;
        }
        function fq(fu, fs, fx, fv) {
          for (var ft = 0; ft < fj; ft += 1) {
            var fw = fe(fs, fx, fv);
            if (fw === 0) {
              return fs;
            }
            var fr = fi(fs, fx, fv) - fu;
            fs -= fr / fw;
          }
          return fs;
        }
        var fj = 4;
        var fk = 0.001;
        var fl = 1e-7;
        var ff = 10;
        var fp = 11;
        var fn = 1 / (fp - 1);
        var fd = typeof Float32Array === "function";
        var fo = function fh(fw, fs, fv, fy) {
          function fr(fD) {
            var fE = 0;
            var fC = 1;
            var fz = fp - 1;
            for (; fC !== fz && fx[fC] <= fD; ++fC) {
              fE += fn;
            }
            --fC;
            var fF = (fD - fx[fC]) / (fx[fC + 1] - fx[fC]);
            var fB = fE + fF * fn;
            var fA = fe(fB, fw, fv);
            if (fA >= fk) {
              return fq(fD, fB, fw, fv);
            } else {
              if (fA === 0) {
                return fB;
              } else {
                return fm(fD, fE, fE + fn, fw, fv);
              }
            }
          }
          if (!(0 <= fw && fw <= 1 && 0 <= fv && fv <= 1)) {
            throw new Error("bezier x values must be in [0, 1] range");
          }
          var fx = fd ? new Float32Array(fp) : new Array(fp);
          if (fw !== fs || fv !== fy) {
            for (var fu = 0; fu < fp; fu += 1) {
              fx[fu] = fi(fu * fn, fw, fv);
            }
          }
          return function ft(fz) {
            if (fw === fs && fv === fy) {
              return fz;
            }
            if (fz === 0) {
              return 0;
            }
            if (fz === 1) {
              return 1;
            }
            return fi(fr(fz), fs, fy);
          };
        };
        return fo;
      })();
      var dn = (function () {
        function ff(fq, fn) {
          var fr = fq.speed;
          var fm = fn.speed;
          var fs = fq.influence;
          var fl = fn.influence;
          var fu = fs / 100;
          var fp = fr * fu;
          var ft = -0.01 * fl + 1;
          var fo = fm * (ft - 1) + 1;
          return [fu, fp, ft, fo];
        }
        function fc(fn, fl) {
          var fm = ff(fl, fn);
          var fp = dP(fm[0], fm[1], fm[2], fm[3]);
          var fo = function (fs, fr, fq) {
            return fg(fs, fr, fp(fq));
          };
          return fo;
        }
        function fi(fl) {
          return fl;
        }
        function fb(fm, fl) {
          return fl;
        }
        function fg(fn, fm, fl) {
          return fn + (fm - fn) * fl;
        }
        function fh(fo, fn, fm, fl) {
          if (fo == KeyframeInterpolationType.HOLD) {
            return fi;
          } else {
            if (fn == KeyframeInterpolationType.HOLD) {
              return fb;
            } else {
              if (
                fo == KeyframeInterpolationType.LINEAR &&
                fn == KeyframeInterpolationType.LINEAR
              ) {
                return fg;
              } else {
                return fc(fm, fl);
              }
            }
          }
        }
        function fd(fo, fp) {
          var fn = 0;
          var fl = fo.length - 1;
          while (fl - fn > 1) {
            fm = Math.floor((fn + fl) / 2);
            if (fo[fm].time < fp) {
              fn = fm;
            } else {
              fl = fm;
            }
          }
          if (fp >= fo[fl].time) {
            return [fo[fl]];
          } else {
            if (fp <= fo[fn].time) {
              return [fo[fn]];
            } else {
              return [fo[fn], fo[fl]];
            }
          }
        }
        function fe(fn, fm) {
          if (!fn.isSpatial) {
            throw "bezierCurveFromSpatialKeys: keys must be spatial";
          }
          if (fn.value.length == 2) {
            fl = new aM(
              fn.value[0],
              fn.value[1],
              fn.OutSpatialTangent[0],
              fn.OutSpatialTangent[1],
              fm.InSpatialTangent[0],
              fm.InSpatialTangent[1],
              fm.value[0],
              fm.value[1],
            );
          } else {
            fl = new aM(
              fn.value[0],
              fn.value[1],
              fn.value[2],
              fn.OutSpatialTangent[0],
              fn.OutSpatialTangent[1],
              fn.OutSpatialTangent[2],
              fm.InSpatialTangent[0],
              fm.InSpatialTangent[1],
              fm.InSpatialTangent[2],
              fm.value[0],
              fm.value[1],
              fm.value[2],
            );
          }
          return fl;
        }
        function fj(fq, fp, fm) {
          if (fq.isSpatial) {
            fs = fh(
              fq.OutInterpolationType,
              fp.InInterpolationType,
              fq.OutTemporalEase[0],
              fp.InTemporalEase[0],
            );
            var fo = fs(0, 1, fm);
            var fl = fe(fq, fp);
            var fr = fl.compute(fo);
            return [fr.x, fr.y, 0];
          } else {
            if (fq.value instanceof Array) {
              var ft = [];
              for (var fn = 0; fn < fq.value.length; fn += 1) {
                fs = fh(
                  fq.OutInterpolationType,
                  fp.InInterpolationType,
                  fq.OutTemporalEase[fn],
                  fp.InTemporalEase[fn],
                );
                ft.push(fs(fq.value[fn], fp.value[fn], fm));
              }
              return ft;
            } else {
              fs = fh(
                fq.OutInterpolationType,
                fp.InInterpolationType,
                fq.OutTemporalEase[0],
                fp.InTemporalEase[0],
              );
              return fs(fq.value, fp.value, fm);
            }
          }
        }
        function fk(fn, fo) {
          var fm = fd(fn, fo);
          if (fm.length == 1) {
            return fm[0].value;
          } else {
            if (fm.length == 2) {
              var fl = (fo - fm[0].time) / (fm[1].time - fm[0].time);
              return fj(fm[0], fm[1], fl);
            }
          }
          throw "keyframeRegionValueAtTime: could not find sourrounding keyframes";
        }
        return fk;
      })();
      var da = (function () {
        function fe(fg, ff) {
          fc(
            [
              "applyFill",
              "applyStroke",
              "font",
              "fontSize",
              "justification",
              "tracking",
              "leading",
            ],
            fg,
            ff,
          );
          if (fg.applyFill) {
            fc(["fillColor"], fg, ff);
          }
          if (fg.applyStroke) {
            fc(["strokeColor", "strokeWidth"], fg, ff);
          }
          if (fg.applyStroke && fg.applyFill) {
            fc(["strokeOverFill"], fg, ff);
          }
        }
        function fc(fh, fi, ff) {
          for (var fg = 0; fg < fh.length; fg += 1) {
            if (fi[fh[fg]] !== undefined) {
              ff[fh[fg]] = fi[fh[fg]];
            }
          }
        }
        function fd(fg, ff) {
          if (fg.isTextDocument !== true) {
            throw new Error("jsonVal mut be a text doument JSON");
          }
          ff.text = fg.text;
          fe(fg, ff);
          return ff;
        }
        function fb(fg) {
          if (!(fg instanceof TextDocument)) {
            throw new Error("textDoc must be a TextDocument");
          }
          var ff = { isTextDocument: true, text: fg.text };
          fe(fg, ff);
          return ff;
        }
        return { fromJSON: fd, toJSON: fb };
      })();
      var ao = (function () {
        function fd(fg, ff) {
          fc(
            [
              "closed",
              "vertices",
              "inTangents",
              "outTangents",
              "featherSegLocs",
              "featherRelSegLocs",
              "featherRadii",
              "featherInterps",
              "featherTensions",
              "featherTypes",
              "featherRelCornerAngles",
            ],
            fg,
            ff,
          );
        }
        function fc(fh, fi, ff) {
          for (var fg = 0; fg < fh.length; fg += 1) {
            if (fi[fh[fg]] !== undefined) {
              ff[fh[fg]] = fi[fh[fg]];
            }
          }
        }
        function fe(fg) {
          var ff = new Shape();
          if (fg.isShape !== true) {
            throw new Error("jsonVal mut be a Shape JSON");
          }
          fd(fg, ff);
          return ff;
        }
        function fb(fg) {
          if (!(fg instanceof Shape)) {
            throw new Error("shape must be a Shape");
          }
          var ff = { isShape: true };
          fd(fg, ff);
          return ff;
        }
        return { fromJSON: fe, toJSON: fb };
      })();
      var bi = (function () {
        function fi(fo) {
          return fm(fo).basename;
        }
        function fg(fo) {
          return fm(fo).dirname;
        }
        function fl(fo) {
          return fk(fi(fo)).prefix;
        }
        function fh(fo) {
          return fk(fi(fo)).suffix;
        }
        function fe(fq) {
          var fp = fh(fq);
          var fo = fp.length > 0 ? fp.substring(1) : fp;
          return fo;
        }
        function fj(fp, fo) {
          return ff(fp) + fn + fo;
        }
        function fc() {
          if (arguments.length == 0) {
            return "";
          }
          var fo = arguments[0];
          for (var fp = 1; fp < arguments.length; fp += 1) {
            fo = fj(fo, arguments[fp]);
          }
          return fo;
        }
        function fb(fs, fp) {
          var fo = fg(fs);
          var fq = fi(fs);
          var fr = fd(fq, fp);
          return fc(fo, fr);
        }
        var fn = $.os.indexOf("Windows") != -1 ? "\\" : "/";
        var fk = (function () {
          function fo(fr) {
            var fs = fp.exec(fr);
            var fq = {};
            if (fs) {
              fq.prefix = fs[1];
              fq.suffix = fs[2];
            } else {
              fq.prefix = fr;
              fq.suffix = "";
            }
            return fq;
          }
          var fp = /^(.*)(\.[^.]*)$/;
          return fo;
        })();
        var fm = (function () {
          function fo(fr) {
            var fs = fp.exec(fr);
            var fq = {};
            if (fs) {
              fq.dirname = fs[1];
              fq.basename = fs[2];
            } else {
              throw "splitPathRegexp should always match !?!?";
            }
            return fq;
          }
          var fp = /^(?:(.*)[\\\/])?([^\\\/]*)$/;
          return fo;
        })();
        var ff = (function () {
          function fo(fq) {
            return fq.replace(fp, "");
          }
          var fp = /[\\\/]+$/;
          return fo;
        })();
        var fd = (function () {
          function fp(fA) {
            var fz = encodeURIComponent(fA).match(/%[89ABab]/g);
            return fA.length + fz ? fz.length : 0;
          }
          function ft(fz) {
            return fz >= 55296 && fz <= 56319;
          }
          function fs(fz) {
            return fz >= 56320 && fz <= 57343;
          }
          function fu(fC, fz) {
            if (typeof fC !== "string") {
              throw new Error("Input must be string");
            }
            var fB = fC.length;
            var fF = 0;
            for (var fD = 0; fD < fB; fD += 1) {
              fA = fC.charCodeAt(fD);
              fE = fC[fD];
              if (ft(fA) && fs(fC.charCodeAt(fD + 1))) {
                fD += 1;
                fE += fC[fD];
              }
              fF += fp(fE);
              if (fF === fz) {
                return fC.slice(0, fD + 1);
              } else {
                if (fF > fz) {
                  return fC.slice(0, fD - fE.length + 1);
                }
              }
            }
            return fC;
          }
          function fq(fz, fB) {
            var fE = fz;
            if (fB.removeLinebreaks == true) {
              fE = fE.replace(fw, "");
            }
            fE = fE
              .replace(fx, fB.replacement)
              .replace(fv, fB.replacement)
              .replace(fy, fB.replacement)
              .replace(fo, fB.replacement);
            var fC = fk(fE);
            var fA = fC.suffix.length;
            var fD =
              fA < 10
                ? fu(fC.prefix, fB.maxLength - fA) + fC.suffix
                : fu(fE, fB.maxLength);
            return fD;
          }
          function fr(fA, fB) {
            fB = fB || {};
            fB.replacement = fB.replacement || "";
            fB.maxLength = fB.maxLength || 255;
            var fz = fq(fA, fB);
            if (fB.replacement === "") {
              return fz;
            }
            return fq(fz, fB);
          }
          var fx = /[\/\?<>\\:\*\|":]/g;
          var fv = /[\x00-\x1f\x80-\x9f]/g;
          var fy = /^\.+$/;
          var fo = /^(con|prn|aux|nul|com[0-9]|lpt[0-9])(\..*)?$/i;
          var fw = /\r?\n|\r/g;
          return fr;
        })();
        return {
          basename: fi,
          basenameWithoutExt: fl,
          dirname: fg,
          extname: fh,
          extnameNoDot: fe,
          join: fc,
          sanitizeFilename: fd,
          sanitizePath: fb,
          sep: fn,
        };
      })();
      var eG = function (fd, fg, fc) {
        var fb = bx(fd, fg);
        var ff = d5(fd.sourceRectAtTime(fg, true));
        var fh = e4(fb, ff, "intersect");
        var fe = dF(fh);
        return b8(fd, fe, fg, fc);
      };
      var b8 = (function () {
        function fd(fm, fj, fk) {
          if (fm.isSeparationLeader) {
            if (fj.dimensionsSeparated != fm.dimensionsSeparated) {
              fj.dimensionsSeparated = fm.dimensionsSeparated;
            }
            if (fm.dimensionsSeparated) {
              var fi = fm.value.length;
              for (var fl = 0; fl < fi; fl += 1) {
                fd(
                  fm.getSeparationFollower(fl),
                  fj.getSeparationFollower(fl),
                  fk,
                );
              }
              return;
            } else {
              ff(fm, fj, fk);
            }
          } else {
            if (fm.isSeparationFollower && !fm.canSetExpression) {
            } else {
              ff(fm, fj, fk);
            }
          }
        }
        function ff(fn, fi, fj) {
          fj = fj || {};
          e3(fi);
          var fm = fn.value;
          if (fj.offset) {
            for (var fk = 0; fk < fj.offset.length; fk += 1) {
              fm[fk] = fm[fk] + fj.offset[fk];
            }
          }
          if (fj.scaleFactor) {
            for (var fk = 0; fk < fj.scaleFactor.length; fk += 1) {
              fm[fk] = fm[fk] * fj.scaleFactor[fk];
            }
          }
          fi.setValue(fm);
          var fl = cl(fn);
          if (fj.offset) {
            dV(fl, fj.offset);
          }
          if (fj.scaleFactor) {
            bq(fl, fj.scaleFactor);
          }
          e2(fi, fl);
          if (fi.canSetExpression) {
            fi.expression = fn.expression;
            fi.expressionEnabled = fn.expressionEnabled;
          }
        }
        function fc(fj, fi) {
          d6(fj, fi, function (fk, fl) {
            e3(fk);
            fk.setValue(fl);
            if (fk.canSetExpression) {
              fk.expression = "";
            }
          });
        }
        function fe(fj) {
          var fn = fj.source;
          var fm = fn.layer(1);
          var fk = fm.stretch < 0 ? fm.outPoint : fm.inPoint;
          var fl = fm.stretch < 0 ? fm.inPoint : fm.outPoint;
          var fi = fl - fk;
          fm.startTime -= fk;
          fn.duration = fi;
          fj.startTime = fk;
          if (!bR(fk, 0)) {
            fb(fj, fk * -1);
          }
        }
        function fb(fj, fi) {
          aB(fj, function (fl) {
            var fk = cl(fl);
            fk = c0(fk, fi, { overwriteOriginal: true });
            e3(fl);
            e2(fl, fk);
          });
        }
        function fg(fm, fl, fj) {
          var fi = fl.parentFolder;
          var fk = cY(fj, fi);
          fm.parentFolder = fk;
        }
        function fh(fy, fl, fp, fn) {
          fn = fn || {};
          var ft = null;
          if (fy.parent != null) {
            ft = fy.parent;
            fy.parent = null;
          }
          var fi = TrackMatteType.NO_TRACK_MATTE;
          if (fy.hasTrackMatte) {
            fi = fy.trackMatteType;
            fy.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
          }
          if (fn.autoScale) {
            var fx = fy
              .property("ADBE Transform Group")
              .property("ADBE Scale")
              .valueAtTime(fp, true);
            if (fy.collapseTransformation && (fx[0] > 100 || fx[1] > 100)) {
              fn.scaleFactor = [fx[0] / 100, fx[1] / 100];
            }
          }
          var fk = fn.scaleFactor ? fn.scaleFactor : [1, 1];
          var fv = [1 / fk[0], 1 / fk[1]];
          var fw = fy.containingComp;
          var fq = fy.index;
          var fs = true;
          var fm = fw.layers[fq].name;
          var fz = fw.layers.precompose([fq], fm, fs);
          var fj = fw.layers[fq];
          var fo = fz.layers[1];
          fz.width = Math.ceil(fl.width * fk[0]);
          fz.height = Math.ceil(fl.height * fk[1]);
          var fr = fj.property("ADBE Transform Group");
          var fu = fo.property("ADBE Transform Group");
          fd(fu["ADBE Position"], fr["ADBE Position"]);
          fd(fu["ADBE Anchor Point"], fr["ADBE Anchor Point"], {
            offset: [-fl.left, -fl.top],
            scaleFactor: fk,
          });
          fd(fu["ADBE Scale"], fr["ADBE Scale"], { scaleFactor: fv });
          fd(fu["ADBE Rotate Z"], fr["ADBE Rotate Z"]);
          fc(fu.property("ADBE Position"), [-fl.left * fk[0], -fl.top * fk[1]]);
          fc(fu.property("ADBE Anchor Point"), [0, 0, 0]);
          fc(fu.property("ADBE Scale"), [100 * fk[0], 100 * fk[1], 100]);
          fc(fu.property("ADBE Rotate Z"), 0);
          if (fn.trimToLayerDuration == true) {
            fe(fj);
          }
          if (fi != TrackMatteType.NO_TRACK_MATTE) {
            fj.trackMatteType = fi;
          }
          if (ft != null) {
            fj.parent = ft;
          }
          if (fn.precompLocation !== undefined) {
            fg(fz, fw, fn.precompLocation);
          }
          return fj;
        }
        return fh;
      })();
      var av = (function () {
        function fd(ff) {
          fe.foreach(ff);
        }
        function fb(ff) {
          return (
            ff instanceof TextLayer ||
            ff instanceof ShapeLayer ||
            ff.collapseTransformation
          );
        }
        function fc(ff, fg) {
          if (!fb(ff)) {
            return ff;
          }
          ff = eG(ff, fg, { autoScale: true, trimToLayerDuration: true });
          return ff;
        }
        var fe = [
          { defaultValue: [0, 0], name: "ADBE BEZMESH-0001" },
          { defaultValue: [33.333333333333336, 0], name: "ADBE BEZMESH-0002" },
          { defaultValue: [66.66666666666667, 0], name: "ADBE BEZMESH-0003" },
          { defaultValue: [100, 0], name: "ADBE BEZMESH-0004" },
          {
            defaultValue: [100, 33.333333333333336],
            name: "ADBE BEZMESH-0005",
          },
          { defaultValue: [100, 66.66666666666667], name: "ADBE BEZMESH-0006" },
          { defaultValue: [100, 100], name: "ADBE BEZMESH-0007" },
          { defaultValue: [66.66666666666667, 100], name: "ADBE BEZMESH-0008" },
          {
            defaultValue: [33.333333333333336, 100],
            name: "ADBE BEZMESH-0009",
          },
          { defaultValue: [0, 100], name: "ADBE BEZMESH-0010" },
          { defaultValue: [0, 66.66666666666667], name: "ADBE BEZMESH-0011" },
          { defaultValue: [0, 33.333333333333336], name: "ADBE BEZMESH-0012" },
        ];
        return {
          forAllPoints: fd,
          layerNeedsToBePrecomposedToApplyBezMesh: fb,
          pointDetails: fe,
          precomposeIfNecessary: fc,
        };
      })();
      var dR = 0;
      var df = 1;
      var bJ = 2;
      var z = 3;
      var cP = 4;
      var aG = 5;
      var a6 = 6;
      var H = 7;
      var cw = 8;
      var D = 9;
      var d1 = 10;
      var ac = 11;
      var Z = 12;
      var V = (function (fd, fc) {
        function fb(ff) {
          ff = ff || {};
          var fe = ff.layerArray;
          if (!fe) {
            fe = [];
            bc(function (fh) {
              fe.push(fh);
            });
          }
          if (!fe || fe.length == 0) {
            throw new dS("Please select a layer");
          }
          for (var fg = 0; fg < fe.length; fg += 1) {
            aF(fe[fg], ff, fc);
          }
        }
        return {
          applyBounce: function (fe) {
            return dz(
              function () {
                return fb(fe);
              },
              { lc: false, mit: false, undoGroup: "applyBounce" },
              fe,
              fd,
            );
          },
        };
      })(xtr, dK);
      this.showUI = function (fc) {
        if (eK("Easy Bounce")) {
          var fb = bG(fc, V, xtr, dK);
          if (fb != null && fb instanceof Window) {
            fb.show();
          }
        }
      };
      if (dK == "1") {
        bQ(
          this,
          V,
          "applyBounce",
          "({\r\n\tlayerArray (default: selected layers), \r\n\tpreserveApexX (bool, default:false),\r\n\tworkAreaOnly (bool, default:false),\r\n\tgravity ([0,100], default: 50),\r\n\taddSquash (bool, default:false), \r\n\tsquashAmount ([0,100], default: 50), \r\nsquashDuration ([0,100], default: 50), \r\nsquashChaos ([0,100], default: 0), \r\n\tsubframeAccuracy (bool, default:false)," +
            n() +
            "\n})",
        );
      }
    }
    function a(vars) {
      function licUI() {
        var t = new Window(
          "dialog",
          strTrialWelcomeHeader + " - version " + strScriptVersion,
          void 0,
          { resizeable: true },
        );
        if (null != t) {
          var e =
            "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\tinfoGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'top\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\torientation: \'column\', \r\t\t\t\t\t\thdrGrp: Group {\r\t\t\t\t\t\t\ttxt: StaticText {}, \r\t\t\t\t\t\t\tpaste: StaticText {}, \r\t\t\t\t\t\t}\r\t\t\t\t\t\ttrial: StaticText {}, \r\t\t\t\t\t} \r\t\t\t\t\tlicGrp: Group { \r\t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \r\t\t\t\t\t} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r                            buyGrp: Group { \r                            alignment: [\'left\',\'fill\'], \r                            alignChildren: [\'left\',\'fill\'], \r                            orientation: \'column\', \r                            spacing:1,\r                                  retrieveReg: Button {text:\'" +
            strRetrieveLic +
            "\', name:\'retrieve\',preferredSize:[130,25]}\r                                   buyLic: Button {text:\'" +
            strBuyLic +
            "\', name:\'buy\',preferredSize:[130,25]}\r                                   }\r\t\t\t\t\t\tcancelBtn: Button {text:\'" +
            strCancel +
            "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tokBtn: Button {text:\'" +
            strOK +
            "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
          t.grp = t.add(e);
          var i = ScriptUI.newFont(
            "dialog || palette",
            ScriptUI.FontStyle.BOLD,
            12,
          );
          var r = ScriptUI.newFont(
            "dialog || palette",
            ScriptUI.FontStyle.REGULAR,
            9,
          );
          return (
            (t.grp.licGrp.txt.preferredSize = [600, 30]),
            (t.grp.infoGrp.hdrGrp.txt.text = strTrialWelcomeMsg),
            (t.grp.infoGrp.hdrGrp.txt.graphics.font = i),
            (t.grp.infoGrp.hdrGrp.paste.text = strPasteHelp),
            (t.grp.infoGrp.hdrGrp.paste.graphics.font = r),
            (t.grp.infoGrp.trial.text =
              betaMode || isTimeLimited || !offerTrial
                ? ""
                : strTrialInstructMsg),
            isServerConfigured(licenseValidity) &&
              (t.grp.infoGrp.trial.text = strServerInstructMsg),
            (t.grp.licGrp.txt.text =
              betaMode || isTimeLimited || !offerTrial ? "" : "trial"),
            isServerConfigured(licenseValidity) &&
              (t.grp.licGrp.txt.text = "@REMOTE"),
            (t.grp.okGrp.buyGrp.retrieveReg.visible =
              t.grp.okGrp.buyGrp.buyLic.visible =
                !betaMode),
            (t.grp.okGrp.buyGrp.retrieveReg.visible =
              t.grp.okGrp.buyGrp.buyLic.visible =
                !isTimeLimited),
            (t.grp.okGrp.buyGrp.retrieveReg.onClick =
              t.grp.okGrp.buyGrp.buyLic.onClick =
                function () {
                  var e = "buy" == this.name ? strTrialUrl : retrieveUrl;
                  (e != retrieveUrl ||
                    retrieveUrl != aescriptsRetrieveUrl ||
                    confirm(strWebWarning)) &&
                    openURL(e);
                  t.close(false);
                }),
            (t.grp.okGrp.cancelBtn.onClick = function () {
              t.close(false);
            }),
            (t.grp.okGrp.okBtn.onClick = function () {
              license = t.grp.licGrp.txt.text
                .replace(/^\s\s*/, "")
                .replace(/\s\s*$/, "");
              t.close(true);
            }),
            t.layout.layout(true),
            t.layout.resize(),
            (t.onResizing = t.onResize =
              function () {
                this.layout.resize();
              }),
            t
          );
        }
      }
      function checkBeta(e, t) {
        return new Date() < t || new Date() > e;
      }
      function helpUI() {
        var e = new Window(
          "dialog",
          strScriptName + " - version " + strScriptVersion,
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
                "group { \r\t\torientation: \'column\', \r\t\talignment: [\'" +
                t[0] +
                "\',\'" +
                t[1] +
                "\'], \r\t\talignChildren: [\'fill\',\'fill\'], \r                   infoGrp: Group { \r                   alignment: [\'fill\',\'top\'], \r                   alignChildren: [\'fill\',\'top\'], \r\t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]}, \r                      hdr: StaticText {properties:{multiline:true}}, \r                      removeLic: Button {text:\'" +
                strDeactivate +
                "\', preferredSize:[40,30]} \r\t\t\t\t} \r\t\t\t\thelpGrp: Group { \r                   alignment: [\'" +
                t[0] +
                "\',\'" +
                t[1] +
                "\'], \r                   alignChildren: [\'fill\',\'fill\'], \r                    txt: EditText {properties:{multiline:true, readonly:true}}, \r\t\t\t\t} \r                prefsGrp: Group {\r                       alignment: [\'fill\',\'bottom\'], \r                       alignChildren: [\'left\',\'center\'], \r                       orientation: \'row\', \r                       doUpdateCheck: Checkbox {text:\'" +
                strVersionCheck +
                "\', alignment: [\'left\',\'center\']} \r                       checkNow: Button {text:\'" +
                strCheckNow +
                "\', preferredSize:[150,20], alignment: [\'left\',\'center\']} \r                       }\r\t\t\tokGrp: Group { \r                alignment: [\'fill\',\'bottom\'], \r                alignChildren: [\'fill\',\'center\'], \r                 supportBtn: Button {text:\'" +
                strGetSupport +
                "\', preferredSize:[150,30], alignment: [\'left\',\'center\']} \r                ",
              r = 0;
            r < Math.min(maxUIButtons, vars.helpButtons.length);
            r++
          ) {
            if (vars.helpButtons[r].hasOwnProperty("name")) {
              i +=
                "btn" + r + ": " + vars.helpButtons[r].hasOwnProperty("type") &&
                validateButtonType(vars.helpButtons[r].type)
                  ? vars.helpButtons[r].type
                  : "Button" +
                    " {id: \'" +
                    r +
                    "\', alignment: [\'left\',\'center\']}";
            }
          }
          i +=
            "\r\t\t\t\t\tokBtn: Button {text:\'" +
            strOK +
            "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \r\t\t\t\t} \r\t\t}";
          e.grp = e.add(i);
          e.grp.helpGrp.txt.preferredSize = [800, 500];
          var n = new Date().getYear() + 1900;
          e.grp.infoGrp.txt.text =
            strScriptName +
            " - version " +
            strScriptVersion +
            "\n\xa9" +
            n +
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
            doUpdateCheckNow();
          };
          for (
            var r = 0;
            r < Math.min(maxUIButtons, vars.helpButtons.length);
            r += 1
          ) {
            vars.helpButtons[r].hasOwnProperty("name") &&
              ((e.grp.okGrp["btn" + r].text = vars.helpButtons[r].name),
              vars.helpButtons[r].hasOwnProperty("url")
                ? (e.grp.okGrp["btn" + r].onClick = function () {
                    openURL(vars.helpButtons[this.id].url);
                  })
                : vars.helpButtons[r].hasOwnProperty("onClickFunction") &&
                  (e.grp.okGrp["btn" + r].onClick =
                    vars.helpButtons[r].onClickFunction),
              vars.helpButtons[r].hasOwnProperty("btnValue") &&
                (e.grp.okGrp["btn" + r].value = vars.helpButtons[r].btnValue));
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
        i = r = "";
        t = "&subject=";
        null != e &&
          void 0 !== e &&
          (e.hasOwnProperty("subject") && (t += File.encode(e.subject)),
          e.hasOwnProperty("message") && (i = File.encode(e.message)),
          e.hasOwnProperty("diagnostic") &&
            (r = File.encode(e.diagnostic + "\n--\n")));
        var n =
          true === isAescriptsSupportUrl
            ? strSKU + t + "&message="
            : t.replace(/\&/, "?") + "&body=";
        var a =
          "" != n
            ? i +
              "%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A-------%0D%0A" +
              r +
              getDiagnosticData(true)
            : "";
        supportUrl.toString().match(/@/) &&
          !supportUrl.toString().match(/^mailto:/) &&
          (supportUrl = "mailto:" + supportUrl);
        openURL(supportUrl + n + a);
      }
      function getDiagnosticData(e) {
        var t = $.os.toString();
        var i =
          BridgeTalk.getDisplayName(BridgeTalk.appName) +
          " (" +
          app.version +
          ") - " +
          $.locale.toString();
        var r =
          strScriptName.replace(/&/, "and") + " - version " + strScriptVersion;
        var n = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
        return e
          ? File.encode(r) +
              "%0D%0A" +
              File.encode(t) +
              "%0D%0A" +
              File.encode(i) +
              "%0D%0A" +
              File.encode(n)
          : r + "\n" + t + "\n" + i + "\n" + n;
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
            "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   hdrGrp: Group { \r\t\t\t\t   alignment: [\'fill\',\'fill\'], \r\t\t\t\t   alignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   orientation: \'column\', \r                        hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
          t.hasOwnProperty("header") &&
            (e +=
              "   infoGrp: Panel { \r                           alignment: [\'fill\',\'fill\'], \r                           alignChildren: [\'fill\',\'fill\'], \r                           orientation: \'column\', \r                              info: StaticText {properties:{multiline:true}}, \r                              } ");
          e +=
            "} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\t\tskipVersionBtn: Button {text:\'" +
            strSkipVersion +
            "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r                           remindMeLaterBtn: Button {text:\'" +
            strRemindMeLater +
            "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tdownloadBtn: Button {text:\'" +
            strDownload +
            "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
          i.grp = i.add(e);
          var r = ScriptUI.newFont(
            "dialog || palette",
            ScriptUI.FontStyle.BOLD,
            12,
          );
          ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
          ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
          i.grp.hdrGrp.hdr.graphics.font = r;
          i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(
            /%v/,
            t.version,
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
              prefsNextTimeVersionCheckedStatus,
              "skip",
            );
            saveSettings(
              prefsSectionName,
              prefsLastServerVersionChecked,
              t.version,
            );
            i.close(false);
          };
          i.grp.okGrp.remindMeLaterBtn.onClick = function () {
            var e = new Date();
            e = new Date(e.setDate(e.getDate() + remindMeLaterDays));
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
          };
          i.grp.okGrp.downloadBtn.onClick = function () {
            openURL(retrieveUrl);
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
      function checkForNewVersion(e) {
        if ((null == e && (e = false), doUpdateCheck)) {
          haveSettings(prefsSectionName, prefsLastVersionChecked) &&
            (i = getSettings(prefsSectionName, prefsLastVersionChecked));
          haveSettings(prefsSectionName, prefsLastServerVersionChecked) &&
            (lastServerVersionChecked = getSettings(
              prefsSectionName,
              prefsLastServerVersionChecked,
            ));
          haveSettings(prefsSectionName, prefsLastTimeVersionChecked) &&
            (r = new Date(
              getSettings(prefsSectionName, prefsLastTimeVersionChecked),
            ));
          haveSettings(prefsSectionName, prefsNextTimeVersionCheckedStatus) &&
            (a = getSettings(
              prefsSectionName,
              prefsNextTimeVersionCheckedStatus,
            ));
          haveSettings(prefsSectionName, prefsNextTimeVersionChecked) &&
            (n = new Date(
              getSettings(prefsSectionName, prefsNextTimeVersionChecked),
            ));
          haveSettings(prefsSectionName, prefsVersionCheckInit) &&
            (t = getSettings(prefsSectionName, prefsVersionCheckInit));
          var s = new Date();
          if (e || null == t || null == n || !(s < n)) {
            var o = versionCheck(strSKU, true);
            if (null != o) {
              var l =
                null != o && o.hasOwnProperty("version")
                  ? o.version
                  : strScriptVersion;
              if (
                e ||
                null == a ||
                "skip" != a ||
                null == lastServerVersionChecked ||
                lastServerVersionChecked != l
              ) {
                saveSettings(prefsSectionName, prefsVersionCheckInit, 1);
                var c = new Date();
                c = new Date(c.setDate(c.getDate() + updateCheckInterval));
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
                  c.toString(),
                );
                null != l && 0 < compare(l, strScriptVersion)
                  ? ((null != i && null != r && null != n) || newVersionUI(o),
                    null != i && 0 < compare(l, i) && newVersionUI(o),
                    null != i &&
                      0 == compare(l, i) &&
                      n <= s &&
                      newVersionUI(o))
                  : e && alert(strUpToDate);
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
      function versionCheck(e, t) {
        var i = extComms(
          "https://notify.aescripts.com/versioncheck2.php?json=1&plain=1&sku=" +
            e +
            t
            ? "&latest=1"
            : "" + parseFloat(app.version) < 12
              ? "&clip_length=200"
              : "&clip_length=300",
        );
        if (null == i || "" == i) {
          return null;
        }
        try {
          if (null == (i = JSONify(i, "parse"))) {
            return null;
          }
        } catch (e) {
          return null;
        }
        return "ok" != i.status
          ? null
          : t
            ? {
                date: i.latest.release_date,
                detail: i.latest.detail,
                header: strVersionRev
                  .replace(/%a/, i.version)
                  .replace(/%b/, "")
                  .replace(/%c/, i.latest.release_date),
                version: i.version,
              }
            : { version: i.version };
      }
      function extComms(e) {
        try {
          if (-1 != $.os.indexOf("Mac")) {
            var t = system.callSystem('curl -s 2 "' + e + '"');
          } else {
            var i =
              ((r = new File(
                Folder.userData.fsName + "/Aescripts/aescripts_helper.vbs",
              )).open("w"),
              r.write(
                'dim o: Set o = createobject("MSXML2.XMLHTTP.6.0")\no.Open "GET", WScript.Arguments(0), False\no.Send\nIf o.Status >= 200 And o.Status <= 202 Then\nWScript.Echo o.responseText\nElse\nWScript.Echo "Error"\nEnd If',
              ),
              r.close(),
              r.exists ? r : null);
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
          var r = i.read(2000);
          return (i.close(), null != r ? (r = r.toString()) : null);
        }
        return null;
      }
      function formatHistory(e, t) {
        var i = e.data;
        var r = [];
        for (var n in i) {
          if (i.hasOwnProperty(n)) {
            for (var a = i[n].history, s = a.length - 1; 0 <= s; s--) {
              var o = a[s];
              var l = "";
              var c = o.detail;
              s == a.length - 1 && (l = " (" + strCurrentVersion + ")");
              var f = strVersionRev
                .replace(/%0/, o.version_number)
                .replace(/%1/, l)
                .replace(/%2/, o.release_date)
                .replace(/%3/, c);
              (!options.summaryOnlyNewChanges ||
                compare(t, o.version_number) < 0) &&
                r.push(f);
            }
          }
        }
        return r.join("\n\n");
      }
      function getVerifCode(e) {
        return "1";
        "trial" == e.toLowerCase() && (e = "");
        var i =
          -1 != $.os.indexOf("Mac") && Folder("/Volumes/Private").exists
            ? Folder.userData.fsName
            : Folder.temp.fsName +
              "/" +
              Math.round(Math.random() * 42132 * new Date().getTime());
        if (-1 != $.os.indexOf("Win")) {
          t = isTimeLimited ? wx1 : wx;
          i += ".exe";
        } else {
          if (systemCall("arch").toLowerCase().match(/ppc/)) {
            return (alert(strPpcNotSupported), false);
          }
          t = isTimeLimited ? mx1 : mx;
        }
        var r = createFile(File(i), t, "BINARY");
        if (!r.exists) {
          return ((licenseData = { result: -108 }), licenseData);
        }
        r.hidden = true;
        -1 != $.os.indexOf("Mac") && systemCall('chmod 757 "' + r.fsName + '"');
        var n = systemCall(
          '"' + r.fsName + '" "' + strHeader + '" ' + privateNum + " " + e,
        );
        return (r.remove(), parseResult(n));
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
        for (var t = e.match(/[^\r\n]+/g), i = {}, r = 0; r < t.length; r++) {
          var n = t[r].split(":");
          if (2 <= n.length) {
            var a = n[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
            var s = trimQuotes(n[1]);
            isNaN(s) || (s = parseFloat(s));
            i[a] = s;
          }
        }
        return (
          void 0 === i.result && ((i.result = -102), (i.e = e)),
          checkTrialDetails(i),
          checkBetaDetails(i),
          i
        );
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
      function trimQuotes(e) {
        return (
          "\'" ==
            (e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))[0] &&
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
          var r = t[3].match(/^[0-9]+/, "");
          var n = r[0].substr(0, 2);
          var a = r[0].substr(r[0].length - 2);
          var s = n[0] + t[0] + n[1] + t[1] + a[0] + t[2] + a[1] + i;
          var o = r[0].substring(2, r[0].length - 2);
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
        var r = false;
        "@remote" == (t = null == license ? t : license).toLowerCase() &&
          ((t = strHeader + t), (r = true));
        var n = t.split("*");
        var a = t.match(/#/);
        var s = a && check_timed_License(t);
        var o = check_v2_License(t);
        if (!((offerTrial && "trial" == t.toLowerCase()) || r || o || s)) {
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
        if (("trial" != t.toLowerCase() || r) && !r) {
          if (null != n[0] && n[0] != strHeader) {
            return (
              alert(strWrongProduct + "\n" + strContactSupport),
              checkCode(e),
              false
            );
          }
          var c = n[3].match(/[A-Z]{3}[0-9]+$/);
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
            (licenseValidity = 2 == licV ? getVerifCode(t) : getVerifCode3(t))
              .result,
          )
        ) {
          e || (e = true);
          var f = "e" in licenseValidity ? "\n" + licenseValidity.e : "";
          return (
            alert(
              licErrors[locale][checkErrorCode(licenseValidity.result)].title +
                "\n" +
                licErrors[locale][checkErrorCode(licenseValidity.result)]
                  .detail +
                f,
            ),
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
            ((n = c.indexOf(e.charAt(l++))) >> 4);
          i = ((15 & n) << 4) | ((a = c.indexOf(e.charAt(l++))) >> 2);
          r = ((3 & a) << 6) | (s = c.indexOf(e.charAt(l++)));
          o += String.fromCharCode(t);
          64 != a && (o += String.fromCharCode(i));
          64 != s && (o += String.fromCharCode(r));
        }
        return o;
      }
      function bE(e) {
        for (
          t,
            i,
            r,
            n,
            a,
            s,
            o,
            l = "",
            c = 0,
            f =
              "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
          c < e.length;
        ) {
          n = (t = e.charCodeAt(c++)) >> 2;
          a = ((3 & t) << 4) | ((i = e.charCodeAt(c++)) >> 4);
          s = ((15 & i) << 2) | ((r = e.charCodeAt(c++)) >> 6);
          o = 63 & r;
          isNaN(i) ? (s = o = 64) : isNaN(r) && (o = 64);
          l = l + f.charAt(n) + f.charAt(a) + f.charAt(s) + f.charAt(o);
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
          app.preferences.getPrefAsLong(
            e,
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          )
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
              (f = parseDateString(retProp("d$", licenseValidity)))),
            0 < e)
          ) {
            return a + "\'" + s + "\'" + retProp("^s", licenseValidity) + l + o;
          }
          r = a + s.toString().match(/^@/) ? "" : " " + s + " ";
          n = l;
        } else {
          r = "";
        }
        var d =
          strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
        switch (n) {
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
          (i = "" != r ? strRegistration + r + t : t),
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
        return BridgeTalk.appName == bD("YWZ0ZXJlZmZlY3Rz");
      }
      function isPS() {
        return BridgeTalk.appName == bD("cGhvdG9zaG9w");
      }
      function readFile(e) {
        if (null != e && null != e && e.exists && e.open("r")) {
          var t = e.read();
          return (e.close(), t);
        }
        return null;
      }
      function createFile(e, t, i, r, n) {
        return (
          ((null == e || null == e || e.exists) && !r) ||
            (e.exists && e.remove(),
            ((e =
              -1 != $.os.indexOf("Win")
                ? new File(e.fsName)
                : new File(e.absoluteURI)).encoding = i),
            e.open("w"),
            e.write(t),
            e.close(),
            (null != n && n) || (e.hidden = true),
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
        var r = File(prefsLocation + prefsPrefix + File.encode(e));
        var n = readFile(r);
        var a = JSONify(n, "parse");
        if (a instanceof Array) {
          for (var s in ((a = fixSettingsFile(a)), r.remove(), a)) {
            saveSettings(e, s, a[s]);
          }
        }
        return a[t];
      }
      function haveSettings(e, t, i) {
        if (isAE() && "settings" != i) {
          return app.settings.haveSetting(e, t);
        }
        var r = readFile(File(prefsLocation + prefsPrefix + File.encode(e)));
        if (null != r) {
          var n = JSONify(r.toString(), "parse");
          return (n instanceof Array && (n = fixSettingsFile(n)), t in n);
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
      function saveSettings(e, t, i, r) {
        if (isAE() && "settings" != r) {
          app.settings.saveSetting(e, t, i);
          app.preferences.saveToDisk();
        } else {
          var n = {};
          var a = File(prefsLocation + prefsPrefix + File.encode(e));
          if (a.exists) {
            var s = readFile(a);
            null != s && (n = JSONify(s.toString(), "parse"));
          }
          n instanceof Array && (n = fixSettingsFile(n));
          n[t] = i;
          createFile(
            File(prefsLocation + prefsPrefix + File.encode(e)),
            JSONify(n, "stringify", "\t"),
            "UTF-8",
            true,
          );
        }
      }
      function saveVersionsToPrefs() {
        saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
        saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
      }
      function compare(e, t) {
        if (e === t) {
          return 0;
        }
        for (
          var i = e.toString().split("."),
            r = t.toString().split("."),
            n = Math.min(i.length, r.length),
            a = 0;
          a < n;
          a++
        ) {
          if (parseInt(i[a]) > parseInt(r[a])) {
            return 1;
          }
          if (parseInt(i[a]) < parseInt(r[a])) {
            return -1;
          }
        }
        return i.length > r.length ? 1 : i.length < r.length ? -1 : 0;
      }
      function isVT() {
        return (
          (void 0 !== licenseValidity &&
            licenseValidity.hasOwnProperty("result")) ||
            (licenseValidity = getVerifCode("")),
          isResultValidLicense(licenseValidity.result) &&
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
        var e = isServerConfigured(licenseValidity)
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
          app.executeCommand(2359),
          isSecurityPrefSet())
        ) {
          if (betaMode && checkBeta(betaExpirationDate, betaStartDate)) {
            "l" == e && alert(strBetaExpiredAlert);
          } else {
            if ("l" == e || "c" == e || "r" == e) {
              var r = false;
              if (
                ("l" == e && doUpdateCheck && checkForNewVersion(), 2 == licV)
              ) {
                if ("r" == e) {
                  i = !removeLic();
                } else {
                  if (
                    isResultValidLicense(
                      (licenseValidity = getVerifCode("")).result,
                    ) &&
                    !isResultTrial(licenseValidity.result)
                  ) {
                    return true;
                  }
                  "" == (t = checkForLegacyLic()) &&
                    ((r = true),
                    (t = isServerConfigured(licenseValidity)
                      ? "@REMOTE"
                      : "trial"));
                  i = checkCode(r, t, privateNum);
                }
              } else {
                haveSettings(prefsSectionName, prefsName)
                  ? ((t = getSettings(prefsSectionName, prefsName)),
                    (r = !(
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
                      (r = false))
                    : (r = true);
                i = checkCode(r, t, privateNum);
              }
              return i;
            }
          }
        }
      }
      var licensingVersion = "3.0.32";
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
      var trialLengthDays = vars.hasOwnProperty("trialLengthDays")
        ? vars.trialLengthDays
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
        vars.hasOwnProperty("externalSupportURL") &&
        "" != vars.externalSupportURL
          ? vars.externalSupportURL
          : "http://aescripts.com/contact";
      betaMode && "" != betaSupportEmail && (supportEmail = betaSupportEmail);
      var aescriptsSupportUrl = "https://aescripts.com/contact";
      var supportUrl =
        vars.hasOwnProperty("externalSupportURL") &&
        "" != vars.externalSupportURL
          ? vars.externalSupportURL
          : aescriptsSupportUrl;
      var isAescriptsSupportUrl = supportUrl === aescriptsSupportUrl;
      isAescriptsSupportUrl &&
        (supportUrl = supportUrl.replace(/\/*/, "") + "/?direct=1&sku=");
      var aescriptsRetrieveUrl =
        "https://aescripts.com/downloadable/customer/products";
      var retrieveUrl =
        vars.hasOwnProperty("retrieveLicenseURL") &&
        "" != vars.retrieveLicenseURL
          ? vars.retrieveLicenseURL
          : aescriptsRetrieveUrl;
      var exchangeUrl = "https://license.aescripts.com/exchange";
      var useLegacyPrefsHeader =
        !!vars.hasOwnProperty("useLegacyPrefsHeader") &&
        vars.useLegacyPrefsHeader;
      var remindMeLaterDays = 7;
      var doUpdateCheck = true;
      var updateCheckInterval = 7;
      var maxUIButtons = 3;
      var licV = 2;
      if ($.os.indexOf("Mac") != -1) {
        mx = __BLOB__BLOB_000144__;
      } else {
        wx = __BLOB__BLOB_000145__;
      }
      if ($.os.indexOf("Mac") != -1) {
        mx1 = __BLOB__BLOB_000146__;
      } else {
        wx1 = __BLOB__BLOB_000147__;
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
                      : "\\u" +
                          ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
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
                if (
                  Object.prototype.toString.apply(value) === "[object Array]"
                ) {
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
        de: "Lizenz vergessen?",
        en: "Retrieve License",
        es: "Recuperar licencia",
        fr: "Retrouver votre Licence",
      });
      var strBuyLic = localize({
        de: "Lizenz Kaufen",
        en: "Buy License",
        es: "Compra licencia",
        fr: "Acheter une licence",
      });
      var strPpcNotSupported = localize({
        de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
        en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
        es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
        fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
      });
      var strErrScriptAccess = localize({
        de:
          strScriptName +
          ' ben\xf6tigt die Erlaubnis Dateien zu schreiben\n Gehe in Voreinstellungen von After Effects in die Rubrik "Allgemein" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
        en:
          strScriptName +
          ' requires access to write files\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
        es:
          strScriptName +
          ' necesita poder escribir archivos\nVaya al panel "General" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
        fr:
          strScriptName +
          ' n\xe9cessite les droits d\'\xe9criture de fichiers\nAllez dans le panneau "G\xe9n\xe9ral" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
      });
      var strUpdateLicenseHeader = localize({
        de: strScriptName + " Lizenz-Update ben\xf6tigt",
        en: strScriptName + " License Update Required",
        es: strScriptName + " necesita actualizar la licencia",
        fr: "La licence de " + strScriptName + " doit \xeatre mise \xe0 jour",
      });
      var strWebWarning = localize({
        de: "Alle Deine Lizenzen findest Du unter \'My Downloads & Licenses\' in Deinem aescripts.com Benutzer-Account.\n\nWillst Du jetzt dorthin gehen?",
        en: "All your licenses are in the \'My Downloads & Licenses\' section of your aescripts.com user account.\n\nWould you like to go there now?",
        es: "Todas sus licencias est\xe1n en la secci\xf3n \'My Downloads & Licenses\' de su cuenta de usuario en aescripts.com.\n\n\xbfQuiere ir all\xed ahora?",
        fr: "Toutes vos licences se trouvent dans la section \'My Downloads & Licenses\' de votre compte utilisateur sur aescripts.com.\n\nVoulez-vous y aller maintenant?",
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
          "Eine neuere Version von " +
          strScriptName +
          " ist verf\xfcgbar: v%\n\nWenn Sie gerne auf deiner Downloadseite bei aescripts.com gehen kannst, um sie herunterzuladen?",
        en:
          "A newer version of " +
          strScriptName +
          " is available: %v\n\nWould you like to go to your downloads page at aescripts.com to download it?",
        es:
          "Una versi\xf3n nueva de " +
          strScriptName +
          " est\xe1 disponible: v%\n\n\xbfQuieres ir a la p\xe1gina de descargas de aescripts.com para descargarla?",
        fr:
          "Une version plus de " +
          strScriptName +
          " est disponible: v%\n\nVous souhaitez acc\xe9der \xe0 votre page de t\xe9l\xe9chargements chez aescripts.com pour la t\xe9l\xe9charger?",
      });
      var strDownload = localize({
        de: "Download",
        en: "Download",
        es: "Descargar",
        fr: "T\xe9l\xe9charger",
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
      var strCurrentVersion = localize({
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
      var strUpToDate = localize({
        de:
          "Sie sind auf dem neuesten Stand! \n" +
          strScriptName +
          " " +
          strScriptVersion +
          " ist derzeit die neueste Version verf\xfcgbar.",
        en:
          "You are up to date!\n" +
          strScriptName +
          " " +
          strScriptVersion +
          " is currently the latest version available.",
        es:
          "\xa1Est\xe1 actualizado! \n" +
          strScriptName +
          " " +
          strScriptVersion +
          " es actualmente la \xfaltima versi\xf3n disponible.",
        fr:
          "Vous \xeates \xe0 jour!\n" +
          strScriptName +
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
        en: "CGPERSIA",
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
            title: "Nicht in der Lage, auf den Home-Ordner zuzugreifen(-108)",
          },
          "-11": {
            detail:
              "Die Lizenz kann auf dem Lizenzserver nicht gefunden werden",
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
            title: "CGPERSIA",
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
            detail:
              "This product does not offer a trial and requires a license",
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
            detail: "",
            title: "License period has not started yet (-20)",
          },
          "-21": { detail: "", title: "License period has ended (-21)" },
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
          "-3": { detail: "", title: "Fichier de licence introuvable (-3)" },
          "-4": { detail: "", title: "Fichier de licence corrompu (-4)" },
          "-5": { detail: "", title: "Erreur g\xe9n\xe9rique (-5)" },
          "-6": { detail: "", title: "Nom de produit invalide (-6)" },
          "-7": { detail: "", title: "P\xe9riode d\'\xe9valuation (-7)" },
          "-8": { detail: "", title: "Licence non valide (-8)" },
          "-9": {
            detail:
              "Verifiez que le serveur de licence fonctionne correctement",
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
      var prefsLastServerVersionChecked =
        strHeader + "_LastServerVersionChecked";
      var prefsLastTimeVersionChecked = strHeader + "_LastTimeVersionChecked";
      var prefsNextTimeVersionChecked = strHeader + "_NextTimeVersionChecked";
      var prefsNextTimeVersionCheckedStatus =
        strHeader + "_NextTimeVersionCheckedStatus";
      var prefsDoUpdateCheck = strHeader + "_doUpdateCheck";
      haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
        (doUpdateCheck = !(
          "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
        ));
      ScriptUI.environment.keyboardState.shiftKey &&
        ScriptUI.environment.keyboardState.altKey &&
        ((doUpdateCheck = false),
        saveSettings(prefsSectionName, prefsDoUpdateCheck, false));
      cmdKey = -1 != $.os.indexOf("Mac") ? "cmd" : "Ctrl";
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
            10 <=
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
        en: "To run in trial mode type: trial\n",
        es: "Para ejecutar el modo Trial, escriba: trial\n",
        fr: "Pour lancer la version de d\xe9monstration, tapez : trial\n",
      });
      var strServerInstructMsg = localize({
        de: "Aktivieren Sie eine Lizenz vom Server mit @REMOTE\n",
        en: "Activate a license from the server with @REMOTE\n",
        es: "Activar una licencia del servidor con @REMOTE\n",
        fr: "Activer une licence du serveur avec @REMOTE\n",
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
                      : "\\u" +
                          ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
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
                if (
                  Object.prototype.toString.apply(value) === "[object Array]"
                ) {
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
      this.c = function () {
        return mainFunc("l");
      };
      this.s = function () {
        return (
          (void 0 !== licenseValidity &&
            licenseValidity.hasOwnProperty("result")) ||
            (licenseValidity = getVerifCode("")),
          isResultValidLicense(licenseValidity.result)
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
          isResultValidLicense(licenseValidity.result) &&
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
    var myVersionNumber = "1.0.000";
    var helpText =
      '--------- USAGE --------- \r\n\r\nSTEP 1\r\nRoughly keyframe the motion path you\u2019d like. Make sure to add\r\n- one keyframe at each bounce (on the ground or also on walls)\r\n- one keykframe at each apex\r\nIn addition to position you can also keyframe rotation or even other properties (say the path of shape layers if they should change their shape over time). For rotation note that in realistic bounces the rotation should not change abruptly during the flight, so I recommend to only set rotation keyframes at the frames where the layer bounces off the ground.\r\n\r\nSTEP 2\r\nSelect the layer and click the "Easy Bounce" button.\r\nThis will refine the motion path to add a realistic timing/easing. Other keyframes (like rotation, shape etc) will be moved accordingly to fit the new timing.\r\n\r\nSTEP 3\r\nYou can now refine/change the movement by simply modifying the keyframes manually again (say make some bounces higher, add new bounces,...) After each change, just click "Easy Bounce" again to update all the refinement done by the tool.\r\n\r\n--------- OPTIONS --------- \r\n\r\nGravity\r\nControls the speed of the animation. Low gravity (like on the moon) results in slow movements, whereas high gravity causes faster movements that feel more heavy.\r\n\r\nAdd Squash\r\nthis will add a Bezier Warp that squashes the layer on each impact. For certain layer types, this needs to precompose the layer, since otherwise the Bezier Warp will not work properly. The tool warns you in that case.\r\n\r\nSquash - Amount\r\nHow much a layer deforms when it hits the ground. \r\n\r\nSquash - Duration\r\nHow long it takes until the layer goes back to its normal shape after the impact. \r\n\r\nSquash - Chaos\r\nAdds randomness to the deformation, such that it looks less regular. Each time you apply it, the randomness will be different. Just apply Easy Bounce several times to see different variants.\r\n\r\nSubframe Accuracy\r\nWill place keyframes also in-between frames to get an even more physically accurate timing.\r\n\r\nWorkarea Only\r\nWill limit all the refinement of Easy Bounce to only the keyframes in the work area.\r\n\r\nCorrect Apex Location\r\nMoves your apex keyframes left/right to get a physically correct motion path. It is recommended to keep this enabled, but I see that sometimes you might want to force a strange movement, so if you need full control about the apex points, you can disable this.\r\n';
    var tqt = {
      betaExpirationDate: new Date("Nov 15, 2020"),
      betaStartDate: new Date("Oct 1, 2020"),
      helpButtons: [
        {
          helpTip:
            "Switch to the free version of Easy Bounce, which has limited features but is fully functional without a license for unlimited time.",
          name: "Switch to Free Version",
          onClickFunction: sFP,
        },
        {
          helpTip: "Watch Easy Bounce tutorials on mamoworld.com",
          name: "Video Tutorials",
          url: "https://mamoworld.com/tutorials?filter=tid-535",
        },
        {
          helpTip:
            "read our free eBook \'Motion Graphics in After Effects that Speaks to Your Brain\'",
          name: "free eBook",
          url: "https://mamoworld.com/ebook",
        },
      ],
      helpText: helpText,
      offerBeta: false,
      offerTrial: true,
      privateNumber: 7140257551878289,
      productSKU: "MMEBP-SUL",
      scriptAuthor: "mamoworld tools",
      scriptName: "Easy Bounce Pro",
      scriptURL: "https://aescripts.com/easy-bounce",
      scriptVersion: myVersionNumber,
    };
    var xtr = new a(tqt);
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
        String.prototype.toJSON =
          Number.prototype.toJSON =
          Boolean.prototype.toJSON =
            function () {
              return this.valueOf();
            };
      }
      if (typeof JSON.stringify !== "function") {
        escapable =
          /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
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
      if (typeof JSON.parse !== "function") {
        cx =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
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
    return EasyBounce;
  })();
  var runScriptOrExecuteKbarCommand = (function () {
    function runScriptOrExecuteKbarCommand(scriptAPI, thisObj) {
      var isKBarInstalled = typeof kbar !== "undefined";
      var scriptWasLaunchedFromKBar = isKBarInstalled && kbar.button;
      if (scriptWasLaunchedFromKBar && kbar.button.argument != "") {
        var argument = kbar.button.argument;
        kbar.button = undefined;
        return executeCommands(scriptAPI, argument);
      } else {
        if (scriptWasLaunchedFromKBar) {
          kbar.button = undefined;
        }
        scriptAPI.showUI(thisObj);
        return scriptAPI;
      }
    }
    function executeCommands(scriptAPI, commandString) {
      var commands = splitIntoCommands(commandString);
      for (var i = 0; i < commands.length; i += 1) {
        result = executeCommand(scriptAPI, commands[i]);
      }
      return result;
    }
    function executeCommand(scriptAPI, commandString) {
      var commandsRegex = /([A-Za-z0-9_]+)((\(.*\))|())/gm;
      var result = undefined;
      if ((match = commandsRegex.exec(commandString)) !== null) {
        if (isCommand(scriptAPI, match[1])) {
          var suffix = match[2] === undefined || match[2] === "" ? "()" : "";
          writeLn(match[0] + suffix);
          result = eval("scriptAPI." + match[0] + suffix);
        } else {
          if (match[1] == "eval") {
            writeLn(match[1]);
            if (match[2] !== undefined) {
              var stringWithoutSourroundingQuotes = match[2]
                .substr(1)
                .slice(0, -1);
              result = eval(stringWithoutSourroundingQuotes);
            }
          } else {
            if (match[1] == "getAPI") {
              return scriptAPI;
            } else {
              alert(
                "Unknown command \'" +
                  match[0] +
                  "\' - available Commands:\n" +
                  getAllCommandDescriptions(scriptAPI).join("\n\n") +
                  "\n\neval (evals any code given as argument)" +
                  "\n\ngetAPI (returns the api of this script)",
              );
            }
          }
        }
      }
      return result;
    }
    function isCommand(scriptAPI, key) {
      return (
        scriptAPI.hasOwnProperty(key) && typeof scriptAPI[key] == "function"
      );
    }
    function getAllCommandDescriptions(scriptAPI) {
      var result = [];
      for (var key in scriptAPI) {
        if (isCommand(scriptAPI, key) && scriptAPI[key].parameterDescription) {
          var description = key + " " + scriptAPI[key].parameterDescription;
          result.push(description);
        }
      }
      return result;
    }
    function splitIntoCommands(string) {
      function isCommandNameSymbol(c) {
        var isCommandSymbol = /[A-Za-z0-9_]/.test(c);
        return isCommandSymbol;
      }
      function startNewSegment() {
        var segment = string.substring(segmentStart, i + 1);
        segmentStart = i + 1;
        var segmentTrimmed = segment.replace(/^\s+/, "").replace(/\s+$/, "");
        if (segmentTrimmed != "") {
          result.push(segmentTrimmed);
        }
      }
      var result = [];
      var segmentStart = 0;
      var openQuotes = 0;
      for (var i = 0; i < string.length; i += 1) {
        if (string[i] == "(") {
          openQuotes++;
        } else {
          if (string[i] == ")") {
            openQuotes--;
            openQuotes = Math.max(0, openQuotes);
            if (openQuotes == 0) {
              startNewSegment();
            }
          } else {
            if (openQuotes == 0 && !isCommandNameSymbol(string[i])) {
              startNewSegment();
            }
          }
        }
      }
      if (segmentStart < string.length) {
        result.push(string.substring(segmentStart, string.length));
      }
      return result;
    }
    return runScriptOrExecuteKbarCommand;
  })();
  easyBounce = new EasyBounce();
  return runScriptOrExecuteKbarCommand(easyBounce, thisObj);
})(this);
