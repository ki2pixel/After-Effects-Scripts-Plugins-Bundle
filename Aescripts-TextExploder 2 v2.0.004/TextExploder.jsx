/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function (thisObj) {
  var TextExploderV2 = (function () {
    function TextExploderV2() {
      function bG(cf) {
        if (
          typeof Globals_language === "undefined" ||
          Globals_language == "auto"
        ) {
          return localize(cf);
        } else {
          var ce = cf[Globals_language];
          if (ce == undefined) {
            return localize(cf);
          }
          return ce;
        }
      }
      function E() {
        var cf =
          'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.';
        var ce =
          "DIE SOFTWARE WIRD OHNE JEDE AUSDR\xdcCKLICHE ODER IMPLIZIERTE GARANTIE BEREITGESTELLT, EINSCHLIESSLICH DER GARANTIE ZUR BENUTZUNG F\xdcR DEN VORGESEHENEN ODER EINEM BESTIMMTEN ZWECK SOWIE JEGLICHER RECHTSVERLETZUNG, JEDOCH NICHT DARAUF BESCHR\xc4NKT. IN KEINEM FALL SIND DIE AUTOREN ODER COPYRIGHTINHABER F\xdcR JEGLICHEN SCHADEN ODER SONSTIGE ANSPR\xdcCHE HAFTBAR ZU MACHEN, OB INFOLGE DER ERF\xdcLLUNG EINES VERTRAGES, EINES DELIKTES ODER ANDERS IM ZUSAMMENHANG MIT DER SOFTWARE ODER SONSTIGER VERWENDUNG DER SOFTWARE ENTSTANDEN.";
        return bG({ de: ce, en: cf });
      }
      function k(cf) {
        if (N(cf)) {
          return true;
        }
        var ce = aW(cf);
        if (ce) {
          a2(cf, true);
          return true;
        }
        return false;
      }
      function N(cf) {
        var ce = U(cf);
        if (app.settings.haveSetting(ce, "eulaAccepted")) {
          return app.settings.getSetting(ce, "eulaAccepted") == "TRUE";
        }
        return false;
      }
      function U(ce) {
        return ce + " - Settings";
      }
      function aW(cg) {
        var ce = false;
        var ch = new Window(
          "dialog",
          cg + bG({ de: " Lizenzbestimmungen", en: " License Agreement" }),
          undefined,
          { resizeable: true },
        );
        var cf =
          "group{\t\torientation:\'column\', \t\talignment:[\'fill\',\'fill\'],\t\tpreferredSize:[400,200],\t\tmargins:0,\t\teulabox:EditText{properties:{multiline:true, readonly:true},text:\'\',preferredSize:[-1,60],alignment:[\'fill\',\'fill\']},\t\tagree:Checkbox{text:\'" +
          bG({
            de: "Ich akzeptiere die Lizenzbestimmungen.",
            en: "I accept the licence agreement.",
          }) +
          "\', value:false,alignment:[\'left\',\'bottom\']},\t\tbuttonsGrp:Group{ alignment:[\'center\',\'bottom\']\t\tokBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\'],enabled:false},\t\tcancelBtn:Button{text:\'" +
          bG({ de: "Abbrechen", en: "Cancel" }) +
          "\',alignment:[\'center\',\'bottom\']}}\t}";
        ch.UI = ch.add(cf);
        ch.UI.eulabox.text = E();
        ch.UI.agree.onClick = function () {
          ch.UI.buttonsGrp.okBtn.enabled = ch.UI.agree.value;
        };
        ch.UI.buttonsGrp.okBtn.onClick = function () {
          ce = ch.UI.agree.value;
          ch.close();
        };
        ch.UI.buttonsGrp.cancelBtn.onClick = function () {
          ch.close();
        };
        ch.onResizing = ch.onResize = function () {
          this.layout.resize();
        };
        ch.show();
        return ce;
      }
      function a2(cg, ch) {
        var cf = U(cg);
        var ce = ch ? "TRUE" : "FALSE";
        app.settings.saveSetting(cf, "eulaAccepted", ce);
        app.preferences.saveToDisk();
      }
      function M(ce) {
        a2(ce, false);
      }
      function b4(cf, cg) {
        var ce = new Window("dialog", cg, undefined, { resizeable: false });
        var ch =
          "group{orientation:\'column\',alignment:[\'fill\',\'top\'],margins:0,myImage:Image{},okBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\']}}";
        ce.UI = ce.add(ch);
        ce.UI.myImage.image = cf;
        ce.UI.okBtn.onClick = function () {
          ce.close();
        };
        ce.layout.resize();
        ce.onResizing = ce.onResize = function () {
          this.layout.resize();
        };
        ce.show();
      }
      function aJ(ch, cg) {
        var ce = new Window("dialog", cg, undefined, { resizeable: true });
        var cf =
          "group{orientation:\'column\',alignment:[\'fill\',\'top\'],margins:0,mybox:EditText{readonly:true, properties:{multiline:true},text:\'\',preferredSize:[500,300],alignment:[\'fill\',\'fill\']},okBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\']}}";
        ce.UI = ce.add(cf);
        ce.UI.mybox.text = ch;
        ce.UI.okBtn.onClick = function () {
          ce.close();
        };
        ce.layout.resize();
        ce.onResizing = ce.onResize = function () {
          this.layout.resize();
        };
        ce.show();
      }
      function bm(ce) {
        this.message = ce;
      }
      function br(cf, ce) {
        this.message = cf;
        this.options = ce || {};
      }
      function bh(cf, ce) {
        if (!ce) {
          ce = function () {};
        }
        if (!cf) {
          throw new Error(
            "catchUserErrors needs a function as argument.\nDid you write catchUserErrors(foo()) instead of catchUserErrors(foo)?",
          );
        }
        try {
          return cf();
        } catch (cg) {
          if (cg instanceof br) {
            cc(cg);
          } else {
            if (cg instanceof bm) {
            } else {
              alert(
                cg.name +
                  " at line " +
                  cg.line +
                  " of " +
                  cg.fileName +
                  ":\n" +
                  cg.message,
              );
              throw cg;
            }
          }
        } finally {
          ce();
        }
      }
      function cc(cf) {
        var ce = cf.options || {};
        if (ce.imageFile !== undefined) {
          b4(ce.imageFile, cf.message);
        } else {
          if (ce.detailedMessage !== undefined) {
            aJ(cf.message + ":\n\n" + ce.detailedMessage, cf.message);
          } else {
            alert(cf.message);
          }
        }
      }
      function bb() {
        return "silent, forceNoUndoGroup";
      }
      function bB(ch, ci, ce, cj) {
        ci = ci || {};
        ce = ce || {};
        if (!cj.s()) {
          return;
        }
        var cf = ci.undoGroup && !ce.forceNoUndoGroup;
        if (cf) {
          app.beginUndoGroup(ci.undoGroup);
        }
        if (ci.mit === true && cj.t()) {
          alert(
            "Trial Mode\n\nThis message is shown because you are running in trial mode. To avoid this message, please purchase the full version.",
          );
        }
        if (ce.silent) {
          try {
            return ch();
          } catch (cg) {
            throw cg;
          } finally {
            if (cf) {
              app.endUndoGroup();
            }
          }
        } else {
          return bh(
            function () {
              return ch();
            },
            function () {
              if (cf) {
                app.endUndoGroup();
              }
            },
          );
        }
      }
      function av(cg, cf, ce, ch) {
        if (!cf.hasOwnProperty(ce)) {
          throw new Error("srcObj has no property" + ce);
        }
        cg[ce] = function () {
          return cf[ce].apply(cf, arguments);
        };
        cg[ce].parameterDescription = ch;
      }
      function bP() {
        var ce = parseFloat(app.version);
        if (ce != 10.5) {
          ce = Math.floor(ce);
        }
        return ce;
      }
      function bW() {
        return bP() >= 15;
      }
      function q() {
        var ce = parseFloat(app.version);
        return ce;
      }
      function s() {
        return $.os.indexOf("Windows") != -1;
      }
      function aj() {
        return s() && $.os.indexOf("XP") != -1;
      }
      function a8() {
        return !s();
      }
      function aq(cg) {
        if (!s()) {
          throw new Error(
            "getWindowsShellVariable is only available on Windows",
          );
        }
        var ce = system.callSystem(
          'cmd /c "echo mamoresultstart' + cg + '"mamoresultend',
        );
        var cf = /mamoresultstart(.*)mamoresultend/.exec(ce);
        if (!cf) {
          throw new Error("could not retrieve Win shell variable:" + ce);
        }
        return cf[1];
      }
      function a7(ce) {
        if (a8()) {
          ae(ce);
        } else {
          aZ(ce);
        }
      }
      function ae(ce) {
        var cf = 'open "' + ce + '"';
        system.callSystem(cf);
      }
      function aZ(ce) {
        encodedUrl = bj(ce);
        if (aj()) {
          ad(encodedUrl);
        } else {
          b3(encodedUrl);
        }
      }
      function bj(ce) {
        return ce.replace(/&/g, "^&");
      }
      function ad(cg) {
        var ce = bG({
          de:
            "Falls Internet Explorer noch nicht l\xe4uft, kann es m\xf6glich sein, dass After Effects nicht reagiert, bis Internet Explorer wieder geschlossen wurde.\n\nSoll die folgende Webseite mit Internet Explorer ge\xf6ffnet werden?\n\n" +
            url,
          en:
            "If Internet Explorer is not yet running it might be that After Effects freezes until you close Internet Explorer again.\n\nShould the following website be opened in Internet Explorer?\n\n" +
            url,
        });
        if (confirm(ce, false, "open URL in Browser")) {
          var cf = Folder.commonFiles.parent.fsName;
          var ch = '"' + cf + '\\Internet Explorer\\iexplore.exe" ' + cg;
          v(ch);
        }
      }
      function b3(ce) {
        var cf = "start " + ce;
        v(cf);
      }
      function v(ce) {
        var cf = 'cmd /c "' + ce + '"';
        system.callSystem(cf);
      }
      function n(co) {
        var cg = 0;
        var ck = "";
        var ci = "";
        for (var cj = 0; cj < co.length; cj += 1) {
          if (co[cj] == "(") {
            cg++;
          } else {
            if (co[cj] == ")") {
              cg--;
              if (cg == 0) {
                ci += n(ck);
              }
              if (cg < 0) {
                return NaN;
              }
            } else {
              if (cg > 0) {
                ck += co[cj];
              } else {
                ci += co[cj];
              }
            }
          }
        }
        if (cg > 0) {
          return NaN;
        }
        var cp = /^(.+)\+(.+)$/;
        var cm = /^(.+)-(.+)$/;
        var cl = /^(.+)\/(.+)$/;
        var cn = /^(.+)\*(.+)$/;
        var ch = /^\s*-?\d*((\.|,)\d+)?\s*$/;
        if (cp.test(ci)) {
          cr = cp.exec(ci);
          cf = n(cr[1]);
          ce = n(cr[2]);
          if (isNaN(cf) || isNaN(ce)) {
            return NaN;
          }
          return cf + ce;
        } else {
          if (cm.test(ci)) {
            cr = cm.exec(ci);
            cf = n(cr[1]);
            ce = n(cr[2]);
            if (isNaN(cf) || isNaN(ce)) {
              return NaN;
            }
            return cf - ce;
          } else {
            if (cl.test(ci)) {
              cr = cl.exec(ci);
              cf = n(cr[1]);
              ce = n(cr[2]);
              if (isNaN(cf) || isNaN(ce)) {
                return NaN;
              }
              return cf / ce;
            } else {
              if (cn.test(ci)) {
                cr = cn.exec(ci);
                cf = n(cr[1]);
                ce = n(cr[2]);
                if (isNaN(cf) || isNaN(ce)) {
                  return NaN;
                }
                return cf * ce;
              } else {
                if (ch.test(ci)) {
                  var cq = ci.replace(/,/g, ".");
                  return parseFloat(cq);
                } else {
                  return NaN;
                }
              }
            }
          }
        }
      }
      function aV(cf) {
        var ce = S(cf);
        return new RegExp(ce, "g");
      }
      function S(cf) {
        var ce = "";
        var ch = 0;
        for (var cg in cf) {
          if (cf.hasOwnProperty(cg)) {
            if (ch != 0) {
              ce += "|";
            }
            ce += "(\\b" + cg + "\\b)";
            ch++;
          }
        }
        return ce;
      }
      function b6(ce, cg, ci) {
        if (ci >= cg.length) {
          return ce;
        }
        var ch = ce.splitWithEmptyElementAtEnd(cg[ci].regExp);
        for (var cf = 0; cf < ch.length; cf += 1) {
          ch[cf] = b6(ch[cf], cg, ci + 1);
        }
        return ch.join(cg[ci].replaceBy);
      }
      function a4(cf) {
        var cg = new Window("dialog", "explode text", undefined, {
          resizeable: true,
        });
        var ce = {
          callbackCancel: function () {
            cg.close(0);
          },
          callbackOk: function () {
            cg.close(1);
          },
        };
        aE(cg, cg, cf, ce);
        cg.layout.layout(true);
        cg.layout.resize();
        cg.layout.layout(true);
        cg.onResizing = cg.onResize = function () {
          cg.layout.resize();
        };
        return cg.show();
      }
      function aE(cg, cm, cj, ci) {
        function ck() {
          var co = ch.splitType.choice.items;
          for (var cp = 0; cp < co.length; cp += 1) {
            if (co[cp].splitType == cj.split) {
              co[cp].selected = true;
            }
          }
          var cq = ch.layerOrder.choice.items;
          for (var cp = 0; cp < cq.length; cp += 1) {
            if (cq[cp].layerOrder == cj.layerOrder) {
              cq[cp].selected = true;
            }
          }
          ch.customDetails.customSplitWord.text = cj.splitWord || "";
          ch.deleteOriginal.value = cj.deleteOriginal || false;
          ch.rtlText.value = cj.rtlText || false;
        }
        function cf() {
          cj.split = ch.splitType.choice.selection.splitType;
          cj.layerOrder = ch.layerOrder.choice.selection.layerOrder;
          cj.splitWord = ch.customDetails.customSplitWord.text;
          cj.deleteOriginal = ch.deleteOriginal.value;
          cj.rtlText = ch.rtlText.value;
        }
        function ce(co) {
          var cp = ch.splitType.choice.selection.splitType;
          if (cp == "custom word") {
            ch.customDetails.visible = true;
            ch.customDetails.maximumSize = [1000, 1000];
            ch.customDetails.label.text = bG({
              de: "Wort",
              en: "split at word",
            });
            ch.customDetails.customSplitWord.helpTip = bG({
              de: 'Splittet den Text so, dass jedes Vorkommen des hier eingegebenen Teilst\xfccks eine eigenen Ebene wird. Wenn du "m" eingibts, w\xfcrde beispielsweise der Text "mamoworld" in "m-a-m-oworld" zerlegt. Wenn du statt dessen "amo" eingeben w\xfcrdest, w\xfcrde sich die Zerlegung "m-amo-world" ergeben.',
              en: 'Splits the text such that each occurrence of the text you enter here becomes a separate layer. If you enter "m", it will split the text "mamoworld" into "m-a-m-oworld". If you enter "amo", instead, it will split it into "m-amo-world"',
            });
          } else {
            if (cp == "custom regular expression") {
              ch.customDetails.visible = true;
              ch.customDetails.maximumSize = [1000, 1000];
              ch.customDetails.label.text = bG({
                de: "RegEx",
                en: "split at RegEx",
              });
              ch.customDetails.customSplitWord.helpTip = bG({
                de: 'Splitted den Text so auf, dass jeder Treffer des regul\xe4ren Ausdrucks eine eigene Ebene wird. Wenn du "you|me|we" eingibst, wird der Text so aufgesplittet, dass jedes Vorkommen von "you" oder "me" oder "we" eine eigene Ebene wird. Regul\xe4re Ausdr\xfccke k\xf6nnen noch viel mehr - google nach regul\xe4ren Ausdr\xfccken um mehr dar\xfcber zu erfahren.',
                en: 'Splits the text such that each match of the regular expression you enter here becomes a separate layer. If you enter "you|me|we", it will split the text such that each occurrence of "you" or "me" or "we" becomes its own layer. Regular expressions can do much more - google for regular expression to learn more about them.',
              });
            } else {
              ch.customDetails.visible = false;
              ch.customDetails.maximumSize = [0, 0];
            }
          }
          if (co) {
            cg.layout.layout(true);
          }
        }
        ci = ci || {};
        ci.callbackOk = ci.callbackOk || function () {};
        var cn = ci.callbackCancel != undefined;
        var cl =
          "group{orientation:\'column\',alignment:[\'fill\',\'top\'],margins:0, spacing:4,  splitType: Group{orientation:\'row\',alignment:[\'fill\',\'top\'],margins:0,   label: StaticText{ text:\'" +
          bG({ de: "Aufsplitten in", en: "Split into" }) +
          "\'}," +
          "\t\tchoice: DropDownList { alignment:[\'fill\',\'top\'], helpTip:\'" +
          bG({
            de: "W\xe4hle aus, in welche Teile der Text zerlegt werden soll",
            en: "Choose what each of the created text layers should contain",
          }) +
          "\'}" +
          "  }," +
          "  customDetails: Group{orientation:\'row\',alignment:[\'fill\',\'top\'],margins:0," +
          "   label: StaticText{ text:\'split at RegEx\'}," +
          "\t\tcustomSplitWord: EditText { alignment:[\'fill\',\'top\'], text:\'\', characters:20}" +
          "  }," +
          "  deleteOriginal: Checkbox{text:\'" +
          bG({ de: "Original l\xf6schen", en: "Delete original" }) +
          "\',alignment:[\'left\',\'top\'], helpTip:\'" +
          bG({
            de: "L\xf6scht die Original-Textebene, nachdem die Textebenen f\xfcr die einzelnen Teile erzeugt wurden",
            en: "deletes the original text layer after creating the layers for the individual parts",
          }) +
          "\'}," +
          "  rtlText: Checkbox{text:\'" +
          bG({ de: "RTL-Text", en: "RTL text" }) +
          "\',alignment:[\'left\',\'top\'], helpTip:\'" +
          bG({
            de: "Aktiviere diese Option, wenn es sich bei dem Text um eine von rechts nach links geschriebene Sprache wie etwa Arabisch oder Hebr\xe4isch handelt.",
            en: "enable this if text is Right To Left text (like Arabic or Hebrew)",
          }) +
          "\'}," +
          "  layerOrder: Group{orientation:\'row\',alignment:[\'fill\',\'top\'],margins:0," +
          "   label: StaticText{ text:\'" +
          bG({ de: "Ebenen-Reihenfolge", en: "Layer Order" }) +
          "\'}," +
          "\t\tchoice: DropDownList { alignment:[\'fill\',\'top\'], helpTip:\'" +
          bG({
            de: "W\xe4hle aus, welche Reihenfolge die erzeugten Ebenen haben sollen.",
            en: "Choose which order the generated layers should have ",
          }) +
          "\'}" +
          "  }," +
          "buttonsGrp: Group{orientation:\'row\'," +
          cn
            ? "alignment:[\'center\',\'bottom\']"
            : "alignment:[\'fill\',\'bottom\']" +
                ",margins:0," +
                "  okBtn:Button{text:\'" +
                bG({ de: "Anwenden", en: "Apply" }) +
                "\'" +
                cn
              ? ""
              : ",alignment:[\'fill\',\'top\']" + "}," + cn
                ? "  cancelBtn:Button{text:\'" +
                  bG({ de: "Abbrechen", en: "Cancel" }) +
                  "\'}"
                : "" + "  }" + "}";
        var ch = cm.add(cl);
        ch.splitType.choice.add(
          "item",
          bG({ de: "Buchstaben", en: "Characters" }),
        );
        ch.splitType.choice.add("item", bG({ de: "W\xf6rter", en: "Words" }));
        ch.splitType.choice.add("item", bG({ de: "Zeilen", en: "Lines" }));
        ch.splitType.choice.add(
          "item",
          bG({ de: "Einzelnes Wort", en: "Custom word" }),
        );
        ch.splitType.choice.add(
          "item",
          bG({ de: "Regul\xe4rer Ausdruck", en: "Custom regular expression" }),
        );
        ch.splitType.choice.items[0].selected = true;
        ch.splitType.choice.items[0].splitType = "characters";
        ch.splitType.choice.items[1].splitType = "words";
        ch.splitType.choice.items[2].splitType = "lines";
        ch.splitType.choice.items[3].splitType = "custom word";
        ch.splitType.choice.items[4].splitType = "custom regular expression";
        ch.layerOrder.choice.add(
          "item",
          bG({ de: "Von oben nach unten", en: "Top to Bottom" }),
        );
        ch.layerOrder.choice.add(
          "item",
          bG({ de: "Von unten nach oben", en: "Bottom to Top" }),
        );
        ch.layerOrder.choice.items[0].selected = true;
        ch.layerOrder.choice.items[0].layerOrder = "topToBottom";
        ch.layerOrder.choice.items[1].layerOrder = "bottomToTop";
        ch.buttonsGrp.okBtn.onClick = function () {
          cf();
          ci.callbackOk();
        };
        if (cn) {
          ch.buttonsGrp.cancelBtn.onClick = ci.callbackCancel;
        }
        ch.splitType.choice.onChange = function () {
          ce(true);
        };
        ck();
        ce(false);
      }
      function bt(cf) {
        var ce = "mamoworldTextExplode";
        if (cf.split !== undefined) {
          app.settings.saveSetting(ce, "split", cf.split);
        }
        if (cf.splitWord !== undefined) {
          app.settings.saveSetting(ce, "splitWord", cf.splitWord);
        }
        if (cf.deleteOriginal !== undefined) {
          app.settings.saveSetting(
            ce,
            "deleteOriginal",
            cf.deleteOriginal ? "true" : "false",
          );
        }
        if (cf.rtlText !== undefined) {
          app.settings.saveSetting(
            ce,
            "rtlText",
            cf.rtlText ? "true" : "false",
          );
        }
        if (cf.layerOrder !== undefined) {
          app.settings.saveSetting(ce, "layerOrder", cf.layerOrder);
        }
      }
      function al(cf) {
        cf = cf || {};
        var ce = "mamoworldTextExplode";
        if (app.settings.haveSetting(ce, "split")) {
          cf.split = app.settings.getSetting(ce, "split");
        }
        if (app.settings.haveSetting(ce, "splitWord")) {
          cf.splitWord = app.settings.getSetting(ce, "splitWord");
        }
        if (app.settings.haveSetting(ce, "deleteOriginal")) {
          cf.deleteOriginal =
            app.settings.getSetting(ce, "deleteOriginal") == "true";
        }
        if (app.settings.haveSetting(ce, "rtlText")) {
          cf.rtlText = app.settings.getSetting(ce, "rtlText") == "true";
        }
        if (app.settings.haveSetting(ce, "layerOrder")) {
          cf.layerOrder = app.settings.getSetting(ce, "layerOrder");
        }
        return cf;
      }
      function aU(ce) {
        this.errors = new Array();
        this.messages = new Array();
        this.title = ce;
        this.silent = false;
      }
      function H(cf) {
        var ce = [];
        for (var cg = 0; cg < cf.length; cg += 1) {
          var ch = cf.charCodeAt(cg);
          if (ch < 128) {
            ce.push(String.fromCharCode(ch));
          } else {
            if (ch > 127 && ch < 2048) {
              ce.push(String.fromCharCode((ch >> 6) | 192));
              ce.push(String.fromCharCode((ch & 63) | 128));
            } else {
              ce.push(String.fromCharCode((ch >> 12) | 224));
              ce.push(String.fromCharCode(((ch >> 6) & 63) | 128));
              ce.push(String.fromCharCode((ch & 63) | 128));
            }
          }
        }
        return ce.join("");
      }
      function aG(cf) {
        var ce = [];
        var ci = 0;
        while (ci < cf.length) {
          var cj = cf.charCodeAt(ci);
          if (cj < 128) {
            ce.push(String.fromCharCode(cj));
            ci++;
          } else {
            if (cj > 191 && cj < 224) {
              var ch = cf.charCodeAt(ci + 1);
              ce.push(String.fromCharCode(((cj & 31) << 6) | (ch & 63)));
              ci += 2;
            } else {
              var ch = cf.charCodeAt(ci + 1);
              var cg = cf.charCodeAt(ci + 2);
              ce.push(
                String.fromCharCode(
                  ((cj & 15) << 12) | ((ch & 63) << 6) | (cg & 63),
                ),
              );
              ci += 3;
            }
          }
        }
        return ce.join("");
      }
      function A(cj, co) {
        co = co || {};
        if (co.utf8) {
          cj = H(cj);
        }
        var ci =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var cp = [];
        var cg = 0;
        while (cg < cj.length) {
          ch = cj.charCodeAt(cg++);
          cf = cj.charCodeAt(cg++);
          ce = cj.charCodeAt(cg++);
          cn = ch >> 2;
          cm = ((ch & 3) << 4) | (cf >> 4);
          cl = ((cf & 15) << 2) | (ce >> 6);
          ck = ce & 63;
          if (isNaN(cf)) {
            cl = ck = 64;
          } else {
            if (isNaN(ce)) {
              ck = 64;
            }
          }
          cp.push(
            ci.charAt(cn) + ci.charAt(cm) + ci.charAt(cl) + ci.charAt(ck),
          );
        }
        return cp.join("");
      }
      function au(ck, cp) {
        cp = cp || {};
        var ci =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        var cq = [];
        var cg = 0;
        if (/[^A-Za-z0-9\+\/\=]/.test(ck)) {
          throw "base64decode error: input contains symbol that is not allowed";
        }
        while (cg < ck.length) {
          co = ci.indexOf(ck.charAt(cg++));
          cn = ci.indexOf(ck.charAt(cg++));
          cm = ci.indexOf(ck.charAt(cg++));
          cl = ci.indexOf(ck.charAt(cg++));
          ch = (co << 2) | (cn >> 4);
          cf = ((cn & 15) << 4) | (cm >> 2);
          ce = ((cm & 3) << 6) | cl;
          cq.push(String.fromCharCode(ch));
          if (cm != 64) {
            cq.push(String.fromCharCode(cf));
          }
          if (cl != 64) {
            cq.push(String.fromCharCode(ce));
          }
        }
        var cj = cq.join("");
        if (cp.utf8) {
          cj = aG(cj);
        }
        return cj;
      }
      function p() {
        if (
          app == null ||
          app.preferences == null ||
          app.preferences.getPrefAsLong == null
        ) {
          return true;
        }
        var ce = app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        );
        return ce == 1;
      }
      function e() {
        var ce = bG({
          de:
            'Bitte aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang" unter ' +
            s()
              ? "Bearbeiten->Voreinstellungen->Allgemein."
              : "After Effects->Voreinstellungen->Allgemein.",
          en:
            'Please enable "Allow Scripts to Write Files and Access Network" in your AE Preferences\n(' +
            s()
              ? "Edit->Preferences->General)."
              : "After Effects->Preferences->General).",
        });
        return ce;
      }
      function aP(cf, ce) {
        if (cf.exists) {
          return true;
        }
        if (!p()) {
          ce.add(
            bG({
              de: "Konnte den folgenden Ordner nicht erzeugen:\n",
              en: "Could not create the following folder:\n",
            }) +
              cf.fsName +
              "\n" +
              e(),
          );
          return false;
        }
        if (cf.parent != null) {
          aP(cf.parent, ce);
        }
        cf.create();
        if (cf.error) {
          ce.add(
            bG({
              de: "Konnte den folgenden Ordner nicht erzeugen:",
              en: "Could not create the following folder:",
            }) +
              cf.fsName +
              "\n" +
              cf.error +
              bG({
                de: "\nStelle sicher, dass Dein Benutzer Schreibrechte in diesem Ordner hat und versuche ihn manuell zu erstellen.",
                en: "\nMake sure that your user has write permissions to that folder and try to create it manually.",
              }),
          );
          return false;
        }
        return true;
      }
      function at(ch, ce) {
        if (!ch.exists) {
          return true;
        }
        if (!p()) {
          ce.add(
            bG({
              de: "Konnte den folgenden Ordner nicht l\xf6schen:\n",
              en: "Could not delete the following folder:\n",
            }) +
              ch.fsName +
              "\n" +
              e(),
          );
          return false;
        }
        var cg = ch.getFiles();
        for (var cf = 0; cf < cg.length; cf += 1) {
          if (cg[cf] instanceof Folder) {
            at(cg[cf], ce);
          } else {
            if (cg[cf] instanceof File) {
              cg[cf].remove();
            } else {
              ce.add(
                "Child " +
                  cf +
                  " of folder " +
                  ch.fsName +
                  " is neither File nor Folder object",
              );
            }
          }
        }
        ch.remove();
        if (ch.Error) {
          ce.add(
            bG({
              de: "Konnte den folgenden Ordner nicht l\xf6schen:",
              en: "Could not delete the following folder:",
            }) +
              ch.fsName +
              "\n" +
              ch.error,
          );
          return false;
        }
        return true;
      }
      function b8(cf) {
        var ce = new File(af(cf));
        while (ce.exists) {
          ce = new File(af(cf));
        }
        return ce;
      }
      function af(cf) {
        var ce =
          Folder.temp.fsName +
          "/" +
          Math.round(Math.random() * new Date().getTime() * 37915);
        if (cf != undefined) {
          ce += "." + cf;
        }
        return ce;
      }
      function aI() {
        var cg = Folder.userData;
        if (app.settings.haveSetting("mamoworld", "userDataPath")) {
          var cf = app.settings.getSetting("mamoworld", "userDataPath");
          cg = new Folder(cf);
        }
        if (cg == null) {
          var ce = bG({
            de: "Folder.userData ist null.\nDas ist ein Bug in der AE Scripting-Schnittstelle der nur auf sehr wenigen Rechnern auftritt. Bitte melde ihn unter http://adobe.com/go/wish.\n\nGl\xfccklicherweise haben wir eine provisorische L\xf6sung f\xfcr das Problem. Bitte erstelle ein neues Support-Ticket unter http://aescripts.com/contact/, damit wir Dir beschreiben k\xf6nnen, wie Du das Problem l\xf6sen kannst.",
            en: "Folder.userData is null.\nThis is a bug in the AE scripting interface that only occurs on very few machines. Please report it to http://adobe.com/go/wish.\n\nFortunately, we have implemented a workaround. Please open a new support ticket at http://aescripts.com/contact/ such that we can explain you what to do.",
          });
          alert(ce);
          throw new Error("Folder.userData is null");
        }
        return cg;
      }
      function bE(cf) {
        var cg = new aU("Errors");
        var ce = new a9(cf, cg);
        return ce.getPath();
      }
      function a9(ci, ce) {
        this.errorHandler = ce;
        this.pathA = aI().fsName + "/Aescripts/" + ci;
        this.pathB = aI().absoluteURI + "/Aescripts/" + ci;
        var ch = new Folder(this.pathA);
        var cf = new aU("dummy");
        if (!aP(ch, cf) || cf.hasError()) {
          var cg = new Folder(this.pathB);
          aP(cg, this.errorHandler);
        }
      }
      function ba(ci, cf, cg, ch) {
        if (ci.exists) {
          return ci;
        }
        if (ci.parent != null) {
          aP(ci.parent, cg);
        }
        if (!p()) {
          cg.add(
            bG({
              de: "Konnte die folgende Datei nicht erzeugen: ",
              en: "Could not create the following file: ",
            }) +
              ci.fsName +
              "\n" +
              e(),
          );
          return ci;
        }
        var ce = ch.encoding === "BINARY" ? cf : au(cf);
        ci.encoding = ch.outEncoding ? ch.outEncoding : "BINARY";
        if (!ci.open("w")) {
          cg.add(
            bG({
              de: "Konnte folgende Datei nicht erzeugen: ",
              en: "Could not create the following file: ",
            }) +
              ci.fsName +
              "\n" +
              ci.error +
              bG({
                de: "\nBitte \xfcberpr\xfcfe, ob Dein Benutzer die n\xf6tigen Rechte hat, um in dieses Verzeichnis zu schreiben.\n",
                en: "\nPlease check that your user has the necessary permissions to write to this folder.",
              }),
          );
          return ci;
        }
        ci.write(ce);
        ci.close();
        if (ci.error != "") {
          cg.add(
            bG({
              de: "Konnte folgende Datei nicht schreiben: ",
              en: "Could not write to the following file: ",
            }) +
              ci.fsName +
              "\n" +
              ci.error +
              bG({
                de: "\nBitte \xfcberpr\xfcfe, ob Dein Benutzer die n\xf6tigen Rechte hat, um in dieses Verzeichnis zu schreiben.\n",
                en: "\nPlease check that your user has the necessary permissions to write to this folder.",
              }),
          );
        } else {
          if (!ci.exists) {
            cg.add(
              bG({
                de: "Konnte folgende Datei nicht erzeugen: ",
                en: "Could not create the following file: ",
              }) +
                ci.fsName +
                "\n" +
                bG({
                  de: "Eigentlich habe ich die Datei gerade erfolgreich erzeugt, aber jetzt existiert sie nicht mehr.",
                  en: "Actually I just created this file successfully, but now it does not exist anymore.",
                }),
            );
          }
        }
        return ci;
      }
      function ca() {
        var cg = new aU("TextExploder Errors");
        var cf = new a9("textexploder2", cg);
        var ce = {
          logoFile: cf.getFile(
            "mamoworld.png",
            "iVBORw0KGgoAAAANSUhEUgAAABYAAAAVCAYAAABCIB6VAAAACXBIWXMAAAsSAAALEgHS3X78AAABbklEQVQ4y7WVsVHDMBSGP/so1IUNYiaIRvAGgQmASmXCBMAGTumObJANMBvIE5BMAOncieYpJ4xs2QX/nc9nnfzpvV/vSZlzjv/QFUBXaw0cgOXE/1qgASpl7DE2IZf3HCjACtgAn12tqzGwh56BV+A0Y5FNV2vb1fo6Bg51UMYWwKMsNDWDJoT3wQugBFDGvgEFsJ8Bf/EfmXOOrtZhaZwArYz99gNdrR+AShZO6UYZe4xZseynJdGXE63ZDnn8Jy2BW29TQuUY2O/2bQT+JJHvZYPvgI9eUFGPQ52BUoBRdbUuxP/CQ4E8T6S1EL/LAagGLLAOoKSsCOHvfbhAm1ilKGNdHvT+mE4SWRLqWR7cpErI17XUdDNS083ldBPzNwMTd8rYQ7BJ60QQ1aUqJJIYfC8F759U5+2Usb8bRAbanq8AX8DzBGgbNlUe6Zo2aO37GQd/GZ4vWexqGrAlmX6obOjOk83aSharuVfTD9Fmk+X956tJAAAAAElFTkSuQmCC",
          ),
          settingsBtnFile: cf.getFile(
            "settings.png",
            "iVBORw0KGgoAAAANSUhEUgAAABMAAAASCAYAAAC5DOVpAAAACXBIWXMAAAsSAAALEgHS3X78AAAAz0lEQVQ4y62U4Q0CIQyF603gCHUDR2AURnAE3cARdANuA5zEG8ENnj8E5EqLhtxLmlyAe4GvDwgAdSriq/BjLckBB4DTN6NVPed6Zl7sIipmMc1lec3MYVxlhxN9tNC4yr+12awsfBDRhYjuhtG82kgFVDI6C8BHAC+FIdfMgsJhMdrvDW4xm2m6Gma9RhVmUs4Y524rjDw1GQKwT8fXFOqcsWF6S0c7GUZNA3KFgcCu7usOQGbxHAztIWdt+gtsXyxDu+lF3/wJ0irIlPfqDYWxa+LbIreYAAAAAElFTkSuQmCC",
          ),
        };
        return ce;
      }
      function bv(ce, cf) {
        function cn() {
          a7("https://aescripts.com/textexploder/");
        }
        var cj = ca();
        var ci =
          "group{margins:0,spacing:4,  orientation:\'column\',alignment:[\'fill\',\'top\'],  mainUiGrp: Group{ spacing:6,margins:0, alignment:[\'fill\',\'top\']}  settingsGrp:Group{ spacing:12,margins:[0,6,0,0],\t\t orientation:\'row\',alignment:[\'fill\',\'top\'],\t\t settingsBtn:IconButton {alignment:[\'left\',\'center\'],properties:{style:\'toolbutton\'} ,helpTip:\'Settings\'},\t\t mamoLabel:StaticText {alignment:[\'right\',\'center\'], text:\'by mamoworld.com  \'},\t\t mamoLogo:Image {alignment:[\'right\',\'center\']}\t }}";
        var cm =
          ce instanceof Panel
            ? ce
            : new Window("palette", "TextExploder", undefined, {
                resizeable: true,
              });
        if (cm == null) {
          return cm;
        }
        var cg = cm.add(ci);
        var ck = al();
        var ch = {
          callbackOk: function () {
            bt(ck);
            cf.explode(ck);
          },
        };
        aE(cm, cg.mainUiGrp, ck, ch);
        var cl = {
          mamoLogo: cg.settingsGrp.mamoLogo,
          mamoUrl: cg.settingsGrp.mamoLabel,
          settingsBtn: cg.settingsGrp.settingsBtn,
        };
        cl.settingsBtn.image = cj.settingsBtnFile;
        cl.mamoLogo.image = cj.logoFile;
        cl.settingsBtn.onClick = function () {
          frw.helpUI();
        };
        cl.mamoUrl.addEventListener("click", cn);
        cl.mamoLogo.addEventListener("click", cn);
        cm.layout.layout(true);
        cm.layout.resize();
        cm.onResizing = cm.onResize = function () {
          this.layout.resize();
        };
        return cm;
      }
      function bR(cf, ce) {
        var ch = cf.property("ADBE Effect Parade");
        var cg = ch.addProperty(ce);
        return cg;
      }
      function ar(cg, ce, ch) {
        var cf = bR(cg, "ADBE Slider Control");
        cf.name = ce;
        cf.property("ADBE Slider Control-0001").setValue(ch);
        return cf.property("ADBE Slider Control-0001");
      }
      function aO(ce, cf, ch) {
        var cg = bR(ce, "ADBE Point Control");
        cg.name = cf;
        cg.property("ADBE Point Control-0001").setValue(ch);
        return cg.property("ADBE point Control-0001");
      }
      function z(cg, ce, ch) {
        var cf = bR(cg, "ADBE Checkbox Control");
        cf.name = ce;
        cf.property("ADBE Checkbox Control-0001").setValue(ch);
        return cf.property("ADBE Checkbox Control-0001");
      }
      function ay(ch, cm, cn, cg, cl) {
        var cj = ch.index;
        var ci = ch.containingComp;
        var co = ch.stretch < 0 ? ch.outPoint : ch.inPoint;
        var ce = ch.stretch < 0 ? ch.inPoint : ch.outPoint;
        if (ce > ci.duration) {
          ce = ci.duration;
        }
        if (co < 0) {
          co = 0;
        }
        var ck = ce - co;
        var cf = ci.layers.precompose([cj], cm, cn);
        ch = ci.layer(cj);
        if (!cg) {
          cf.layer(1).startTime -= co;
          cf.duration = ck;
          ch.startTime = co;
        }
        if (cl) {
          ch = cf.layer(1);
          cf.width = ch.width;
          cf.height = ch.height;
          ch.property("ADBE Transform Group")
            .property("ADBE Position")
            .setValue(
              ch.property("ADBE Transform Group").property("ADBE Anchor Point")
                .value,
            );
        }
        ch.inPoint = co;
        ch.outPoint = ce;
        return cf;
      }
      function c(cf) {
        var ce = cf instanceof AVLayer && cf.hasAudio;
        return ce;
      }
      function h(ch, ce) {
        var cf = ce.stretch < 0 ? ce.outPoint : ce.inPoint;
        var cg = ce.stretch < 0 ? ce.inPoint : ce.outPoint;
        ch.inPoint = cf;
        ch.outPoint = cg;
      }
      function ag(ci, ch, cg) {
        cg = cg || {};
        var ce = ch.inPoint;
        var cf =
          cg.allowLayerEnd === false
            ? ch.outPoint - ch.containingComp.frameDuration
            : ch.outPoint;
        if (ci < ce) {
          return ce;
        }
        if (ci > cf) {
          return cf;
        }
        return ci;
      }
      function bz(cg, cf) {
        if (bP() <= 8) {
          cg = cg.substr(0, 27);
        }
        if (!r(cg, cf)) {
          return cg;
        }
        var ch = 2;
        var ce = cg + " " + ch;
        while (r(ce, cf)) {
          ch++;
          ce = cg + " " + ch;
        }
        return ce;
      }
      function r(cf, ce) {
        return ce.layers.byName(cf) != null;
      }
      function bI(cf, ce) {
        var ch = 0;
        for (var cg = 1; cg <= ce.numLayers; cg += 1) {
          if (ce.layer(cg).name == cf) {
            ch++;
          }
        }
        return ch;
      }
      function x(ce, cg) {
        for (var cf = 1; cf <= ce.layers.length; cf += 1) {
          cg(ce.layers[cf]);
        }
      }
      function b1(ce, cg) {
        for (var cf = ce.layers.length; cf >= 1; cf--) {
          cg(ce.layers[cf]);
        }
      }
      function P(ce, cg) {
        for (var cf = 0; cf < ce.selectedLayers.length; cf += 1) {
          cg(ce.selectedLayers[cf]);
        }
      }
      function b5(ce, ch, cg) {
        if (ch.length == 0) {
          return;
        }
        for (var cf = 0; cf < ch.length; cf += 1) {
          cg(ce.layers[ch[cf]], cf);
        }
      }
      function bq(cf, ci, ce) {
        var cg = ce;
        for (var ch = 1; ch <= cf.layers.length; ch += 1) {
          cg = ci(cf.layers[ch], cg);
        }
        return cg;
      }
      function bD(cf, ci, ce) {
        var cg = ce;
        for (var ch = 0; ch < cf.selectedLayers.length; ch += 1) {
          cg = ci(cf.selectedLayers[ch], cg);
        }
        return cg;
      }
      function V(cf, cj, ci, ce) {
        var cg = ce;
        if (cj.length == 0) {
          return cg;
        }
        for (var ch = 0; ch < cj.length; ch += 1) {
          cg = ci(cf.layers[cj[ch]], cg);
        }
        return cg;
      }
      function ak(ce) {
        var cg = new Array();
        P(ce, function (ch) {
          cg.push(ch.index);
        });
        for (var cf = 0; cf < cg.length; cf += 1) {
          ce.layer(cg[cf]).selected = false;
        }
        return cg;
      }
      function bJ(ce, cg) {
        for (var cf = 0; cf < cg.length; cf += 1) {
          ce.layer(cg[cf]).selected = true;
        }
      }
      function a1(ch, ce) {
        var cj = ch.containingComp.frameDuration;
        var ci = ch.inPoint;
        var cf = Math.floor(ci / cj);
        for (var cg = ci; cg < ch.outPoint; cg += cj) {
          ce(cg, cf);
          cf++;
        }
      }
      function by(cf) {
        var ce = cf.source instanceof CompItem;
        return ce;
      }
      function J(cf) {
        var ce = cf instanceof CameraLayer;
        return ce;
      }
      function bi(cf) {
        var ce = bq(
          cf,
          function (cg, ch) {
            if (cg.enabled) {
              ch.push(cg);
            }
            return ch;
          },
          new Array(),
        );
        return ce;
      }
      function bN(ce) {
        return (
          "layer #" +
          ce.index +
          " \'" +
          ce.name +
          "\' of comp \'" +
          ce.containingComp.name +
          "\'"
        );
      }
      function bU(cf, ce) {
        if (ce.parent === null) {
          return false;
        }
        if (ce.parent.index === cf.index) {
          return true;
        }
        return bU(cf, ce.parent);
      }
      function m(cf, ce) {
        if (bU(cf, ce)) {
          return -1;
        }
        if (bU(ce, cf)) {
          return 1;
        }
        return 0;
      }
      function a5(ce, cf) {
        switch (cf) {
          case "Layer":
            return ce instanceof Layer;
          case "CameraLayer":
            return ce instanceof CameraLayer;
          case "AVLayer":
            return ce instanceof AVLayer;
          case "LightLayer":
            return ce instanceof LightLayer;
          case "ShapeLayer":
            return ce instanceof ShapeLayer;
          case "TextLayer":
            return ce instanceof TextLayer;
        }
        throw new Error("unknown layerTypeString " + cf);
      }
      function aM(ce) {
        switch (ce) {
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
        throw new Error("unknown layerTypeString " + ce);
      }
      function bf(ce) {
        return ce.split(",");
      }
      function bx(ce) {
        return bf(ce).map(function (cf) {
          return parseInt(cf, 10);
        });
      }
      function L(ce) {
        return bf(ce).map(function (cf) {
          return parseFloat(cf, 10);
        });
      }
      function Q(cf, ch) {
        if (cf instanceof Array) {
          var ce = [];
          for (var cg = 0; cg < cf.length; cg += 1) {
            ce.push(Q(cf[cg], ch));
          }
          return ce;
        } else {
          return Math.round(cf * Math.pow(10, ch)) / Math.pow(10, ch);
        }
      }
      function aL(ce, cf) {
        return Math.round(ce / cf) * cf;
      }
      function K(ce, cf) {
        return Math.floor(ce / cf) * cf;
      }
      function bA(ce, cf) {
        return Math.floor(ce / cf) * cf;
      }
      function a6(ce) {
        while (ce.numKeys > 0) {
          ce.removeKey(1);
        }
      }
      function d(ce) {
        if (ce.canSetExpression) {
          ce.expression = "";
        }
        a6(ce);
      }
      function aR(cg, cf) {
        var ce = cg.valueAtTime(cf, false);
        d(cg);
        cg.setValue(ce);
      }
      function a0(ch, cg) {
        var cf = cg.slice().sort(function (cj, ci) {
          return cj - ci;
        });
        for (var ce = cf.length - 1; ce >= 0; ce--) {
          ch.removeKey(cf[ce]);
        }
      }
      function b7(ch, cf, ce, cg) {
        cg = cg || {};
        if (cg.createKeyframesAtBordersIfNotExisting) {
          cg.createKeyframeAtLeftBorderIfNotExisting = true;
          cg.createKeyframeAtRightBorderIfNotExisting = true;
        }
        if (cg.createKeyframeAtLeftBorderIfNotExisting) {
          cg.excludeLeftBorder = true;
          if (ab(ch, cf) == null) {
            ch.addKey(cf);
          }
        }
        if (cg.createKeyframeAtRightBorderIfNotExisting) {
          cg.excludeRightBorder = true;
          if (ab(ch, ce) == null) {
            ch.addKey(ce);
          }
        }
        C(
          ch,
          cf,
          ce,
          function (ci) {
            ch.removeKey(ci);
          },
          {
            backwards: true,
            excludeLeftBorder: cg.excludeLeftBorder,
            excludeRightBorder: cg.excludeRightBorder,
          },
        );
      }
      function g(cf, ce) {
        return Math.abs(ce - cf) < bF;
      }
      function G(cf, ce) {
        return cf < ce - bF;
      }
      function bo(cf, ce) {
        return cf > ce + bF;
      }
      function bw(cf, ce) {
        return cf <= ce + bF;
      }
      function aA(cf, ce) {
        return cf >= ce - bF;
      }
      function C(cl, cf, ce, cj, cg) {
        if (cl.numKeys == 0) {
          return;
        }
        cg = cg || {};
        if (cg.excludeBorders) {
          cg.excludeLeftBorder = true;
          cg.excludeRightBorder = true;
        }
        if (cf === undefined) {
          ck = 1;
        } else {
          ck = cg.excludeLeftBorder ? Z(cl, cf) : ai(cl, cf);
        }
        if (ce === undefined) {
          ci = cl.numKeys;
        } else {
          ci = cg.excludeRightBorder ? a3(cl, ce) : bL(cl, ce);
        }
        if (cg.backwards) {
          for (ch = ci; ch >= ck; ch--) {
            cj(ch);
          }
        } else {
          for (ch = ck; ch <= ci; ch++) {
            cj(ch);
          }
        }
      }
      function bY(ci, cg) {
        if (ci.numKeys == 0) {
          return;
        }
        var ch = 1;
        var cf = ci.numKeys;
        for (var ce = ch; ce <= cf; ce++) {
          if (ci.keySelected(ce)) {
            cg(ce);
          }
        }
      }
      function ab(ch, cg) {
        if (ch.numKeys != 0) {
          var cf = ch.nearestKeyIndex(cg);
          var ce = ch.keyTime(cf);
          if (g(cg, ce)) {
            return cf;
          }
        }
        return null;
      }
      function ai(cg, cf) {
        var ce = cg.nearestKeyIndex(cf);
        return cg.keyTime(ce) >= cf - bF ? ce : ce + 1;
      }
      function Z(cg, cf) {
        var ce = cg.nearestKeyIndex(cf);
        return cg.keyTime(ce) > cf + bF ? ce : ce + 1;
      }
      function bL(cg, cf) {
        var ce = cg.nearestKeyIndex(cf);
        return cg.keyTime(ce) <= cf + bF ? ce : ce - 1;
      }
      function a3(cg, cf) {
        var ce = cg.nearestKeyIndex(cf);
        return cg.keyTime(ce) < cf - bF ? ce : ce - 1;
      }
      function b(cf, ce) {
        return cf.numKeys > 0 && a3(cf, ce) > 0;
      }
      function t(cf, ce) {
        return cf.numKeys > 0 && Z(cf, ce) <= cf.numKeys;
      }
      function bs(ce, cf) {
        return aL(ce, cf);
      }
      function bV(cf, cg) {
        var ce = bA(cf, cg);
        if (g(ce, cf + cg)) {
          ce -= cg;
        }
        return ce;
      }
      function cd(cf, cg) {
        var ce = K(cf, cg);
        if (g(ce, cf - cg)) {
          ce += cg;
        }
        return ce;
      }
      function i(cf, cg) {
        var ce = cd(cf, cg);
        if (aA(ce, cf)) {
          ce -= cg;
        }
        return ce;
      }
      function f(cf, cg) {
        var ce = bV(cf, cg);
        if (bw(ce, cf)) {
          ce += cg;
        }
        return ce;
      }
      function aH(ch, cf, cg) {
        if (ch.isSeparationLeader && ch.dimensionsSeparated) {
          for (var ce = 0; ce < cf.length; ce += 1) {
            aH(ch.getSeparationFollower(ce), cf[ce], cg);
          }
        } else {
          if (ch.isSeparationFollower && !ch.canSetExpression) {
          } else {
            cg(ch, cf);
          }
        }
      }
      function aD(cg) {
        if (cg.numKeys == 0) {
          return cg.value;
        }
        var cf = cg.keyValue(1);
        for (var ce = 1; ce <= cg.numKeys; ce += 1) {
          cf = Math.max(cf, cg.keyValue(ce));
        }
        return cf;
      }
      function aC(ch) {
        if (ch.numKeys == 0) {
          throw new Error(
            "getTimeOfMaximumKeyframeValue1DProp: Property has no keyframes",
          );
        }
        var cg = ch.keyValue(1);
        var ce = 1;
        for (var cf = 1; cf <= ch.numKeys; cf += 1) {
          if (ch.keyValue(cf) > cg) {
            cg = ch.keyValue(cf);
            ce = cf;
          }
        }
        return ch.keyTime(ce);
      }
      function Y(ch) {
        if (ch.numKeys == 0) {
          throw new Error("getTimeOfMinimumKeyframeValue1DProp");
        }
        var ce = ch.keyValue(1);
        var cf = 1;
        for (var cg = 1; cg <= ch.numKeys; cg += 1) {
          if (ch.keyValue(cg) < ce) {
            ce = ch.keyValue(cg);
            cf = cg;
          }
        }
        return ch.keyTime(cf);
      }
      function aS(cj, ci, cg) {
        if (!cg) {
          cg = function (ck) {
            return ck;
          };
        }
        if (cj.numKeys == 0) {
          return;
        }
        var ce = new Array();
        var ch = new Array();
        for (var cf = 1; cf <= cj.numKeys; cf += 1) {
          ce.push(cg(cj.keyValue(cf)));
          ch.push(cj.keyTime(cf));
        }
        ci.setValuesAtTimes(ch, ce);
      }
      function D(ce, cg) {
        if (cg.hasMin) {
          for (var cf = 0; cf < ce.length; cf += 1) {
            if (ce[cf] < cg.minValue) {
              ce[cf] = cg.minValue;
            }
          }
        }
        if (cg.hasMax) {
          for (var cf = 0; cf < ce.length; cf += 1) {
            if (ce[cf] > cg.maxValue) {
              ce[cf] = cg.maxValue;
            }
          }
        }
        return ce;
      }
      function X(cf) {
        var ce = new Array();
        b9(cf, function (cg) {
          if (cg instanceof Property) {
            ce.push(cg);
          }
        });
        return ce;
      }
      function bH(cf, ce) {
        bM(cf, ce);
      }
      function bM(cg, cf, ce) {
        return T(cg.mask, cf, ce);
      }
      function bC(cf, ce) {
        ap(cf, ce);
      }
      function aX(cf, ce) {
        aQ(cf, ce);
      }
      function ap(cg, cf, ce) {
        return T(cg.effect, cf, ce);
      }
      function aQ(cg, cf, ce) {
        var ci = cg.property("ADBE Transform Group");
        var ch = [
          ci.property("ADBE Anchor Point"),
          ci.property("ADBE Position"),
          ci.property("ADBE Scale"),
          ci.property("ADBE Rotate Z"),
          ci.property("ADBE Opacity"),
        ];
        if (cg.threeDLayer) {
          ch.push(
            ci.property("ADBE Orientation"),
            ci.property("ADBE Rotate X"),
            ci.property("ADBE Rotate Y"),
          );
        }
        return F(ch, cf, ce);
      }
      function aN(ce, cf) {
        T(ce, cf);
      }
      function T(ci, ch, ce) {
        var cf = ce;
        for (var cg = 1; cg <= ci.numProperties; cg += 1) {
          cf = ch(ci(cg), cf);
        }
        return cf;
      }
      function j(cg, cf, ce) {
        b0(cg, cf, undefined, ce);
      }
      function b0(ck, cj, cf, ch) {
        ch = ch || {};
        var ce = ch.acceptedPropertyValueTypes instanceof Array;
        var cg = cf;
        for (var ci = 1; ci <= ck.numProperties; ci += 1) {
          var cl = ck(ci);
          if (cl instanceof PropertyGroup) {
            cg = b0(cl, cj, cg, ch);
          } else {
            if (cl instanceof Property) {
              if (
                !ce ||
                ch.acceptedPropertyValueTypes.exists(cl.propertyValueType)
              ) {
                cg = cj(cl, cg);
              }
            }
          }
        }
        return cg;
      }
      function bO(ce, cg) {
        var cf = ce.selectedProperties;
        b9(cf, cg);
      }
      function b9(cg, cf) {
        for (var ce = 0; ce < cg.length; ce += 1) {
          cf(cg[ce]);
        }
      }
      function aY(cf, ch, ce) {
        var cg = cf.selectedProperties;
        return F(cg, ch, ce);
      }
      function F(ci, ch, ce) {
        var cf = ce;
        for (var cg = 0; cg < ci.length; cg += 1) {
          cf = ch(ci[cg], cf);
        }
        return cf;
      }
      function B(cg, cf) {
        for (var ce = 1; ce <= cg.numKeys; ce += 1) {
          cg.setValueAtKey(ce, cf(cg.keyValue(ce)));
        }
      }
      function b2(cf, ce) {
        I(cf, ce);
      }
      function an(ck, cf, cj) {
        cf = cf || {};
        var ch = ck.numKeys;
        if (ch == 0) {
          return;
        }
        var cg = 1;
        var ce = undefined;
        if (cf.timeRange) {
          cg = bd(ck, cf.timeRange[0], cf);
          ce = cf.timeRange[1];
        }
        if (cg == null) {
          return;
        }
        var ci = ck.keyTime(cg);
        while (cg <= ch && (ce == undefined || ci <= ce)) {
          cj(cg, ci);
          cg++;
          if (cg <= ch) {
            ci = ck.keyTime(cg);
          }
        }
      }
      function I(ci, ch, ce) {
        var cf = ce;
        for (var cg = 1; cg <= ci.numKeys; cg += 1) {
          cf = ch(ci.keyValue(cg), cf);
        }
        return cf;
      }
      function bd(ck, ci, cg) {
        cg = cg || {};
        if (ck.numKeys == 0) {
          return null;
        }
        if (!cg.timeRange) {
          return ck.nearestKeyIndex(ci);
        }
        var ch = cg.timeRange[0];
        var ce = cg.timeRange[1];
        ci = Math.max(ci, ch);
        ci = Math.min(ci, ce);
        var cf = ck.nearestKeyIndex(ci);
        var cj = ck.keyTime(cf);
        if (cj < ch) {
          cf++;
          if (cf > ck.numKeys || ck.keyTime(cf) > ce) {
            return null;
          }
        } else {
          if (cj > ce) {
            cf--;
            if (cf < 1 || ck.keyTime(cf) < ch) {
              return null;
            }
          }
        }
        return cf;
      }
      function O(cf, ce) {
        return bX(cf.effect, ce);
      }
      function a(cf, ce) {
        return bX(cf.mask, ce);
      }
      function bX(ch, cg) {
        if (bP() <= 8) {
          cg = cg.substr(0, 27);
        }
        if (!w(cg, ch)) {
          return cg;
        }
        var cf = 2;
        var ce = cg + " " + cf;
        while (w(ce, ch)) {
          cf++;
          ce = cg + " " + cf;
        }
        return ce;
      }
      function bp(ce) {
        if (ce.parentProperty) {
          if (ce.parentProperty.propertyType == PropertyType.INDEXED_GROUP) {
            ce.name = ce.name;
          }
          bp(ce.parentProperty);
        } else {
          ce.name = ce.name;
        }
      }
      function w(ce, cf) {
        return cf.property(ce) != null;
      }
      function bn(ce) {
        return bc(ce).containingComp;
      }
      function bc(ce) {
        if (ce.parentProperty) {
          return bc(ce.parentProperty);
        } else {
          return ce;
        }
      }
      function y(cf) {
        if (cf.parentProperty) {
          if (cf instanceof Property) {
            return (
              cf.name + bG({ de: " von ", en: " of " }) + y(cf.parentProperty)
            );
          } else {
            if (
              cf.matchName == "ADBE Effect Parade" ||
              cf.matchName == "ADBE Transform Group"
            ) {
              return y(cf.parentProperty);
            } else {
              return (
                cf.name + bG({ de: " von ", en: " of " }) + y(cf.parentProperty)
              );
            }
          }
        } else {
          var ce = cf.name;
          return '"' + ce + '"';
        }
      }
      function ac(ce) {
        switch (ce) {
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
              "propertyValueTypeToString: unknown propertyValueType " + ce,
            );
        }
      }
      function bZ(cf) {
        var ce =
          cf == "NO_VALUE" ||
          cf == "ThreeD_SPATIAL" ||
          cf == "ThreeD" ||
          cf == "TwoD_SPATIAL" ||
          cf == "TwoD" ||
          cf == "OneD" ||
          cf == "COLOR" ||
          cf == "CUSTOM_VALUE" ||
          cf == "MARKER" ||
          cf == "LAYER_INDEX" ||
          cf == "MASK_INDEX" ||
          cf == "SHAPE" ||
          cf == "TEXT_DOCUMENT";
        return ce;
      }
      function bT(ce) {
        if (ce == "NO_VALUE") {
          return bG({ de: "kein Wert", en: "no value" });
        } else {
          if (ce == "ThreeD_SPATIAL") {
            return bG({
              de: "r\xe4umliche 3D-Eigenschaften (z.B. Position von 3D-Ebenen)",
              en: "3D spatial properties (e.g. position of 3D layers)",
            });
          } else {
            if (ce == "ThreeD") {
              return bG({
                de: "3D-Eigenschaften (z.B. Orientierung von 3D-Ebenen).",
                en: "3D properties (e.g. orientation of 3D layers)",
              });
            } else {
              if (ce == "TwoD_SPATIAL") {
                return bG({
                  de: "r\xe4umliche 2D-Eigenschaften (z.B. Position von 2D-Ebenen)",
                  en: "2D spatial properties (e.g. positions or 2D layers)",
                });
              } else {
                if (ce == "TwoD") {
                  return bG({
                    de: "2D-Eigenschaften (z.B. Skalierung von 2D-Ebenen)",
                    en: "2D properties (e.g. scale of 2D layers)",
                  });
                } else {
                  if (ce == "OneD") {
                    return bG({
                      de: "1D-Eigenschaften",
                      en: "1D properties (e.g. opacity)",
                    });
                  } else {
                    if (ce == "COLOR") {
                      return bG({ de: "Farben", en: "Colors" });
                    } else {
                      if (ce == "CUSTOM_VALUE") {
                        return bG({ de: "custom values", en: "custom values" });
                      } else {
                        if (ce == "MARKER") {
                          return bG({ de: "Markern", en: "markers" });
                        } else {
                          if (ce == "LAYER_INDEX") {
                            return bG({
                              de: "Ebenen-Index",
                              en: "layer index",
                            });
                          } else {
                            if (ce == "MASK_INDEX") {
                              return bG({
                                de: "Masken-Index",
                                en: "mask index",
                              });
                            } else {
                              if (ce == "SHAPE") {
                                return bG({
                                  de: "Formen",
                                  en: "(Mask and Shape) Paths",
                                });
                              } else {
                                if (ce == "TEXT_DOCUMENT") {
                                  return bG({
                                    de: "Quelltext-Eigenschaften von Text-Ebenen.",
                                    en: "source text properties of text layers",
                                  });
                                } else {
                                  throw new Error(
                                    "undefined property value type in function propertyValueTypeString2HumanReadableString:" +
                                      ce,
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
      function aK(ce) {
        if (ce.length <= 1) {
          return true;
        }
        for (var cf = 1; cf < ce.length; cf += 1) {
          if (ce[cf].propertyValueType != ce[0].propertyValueType) {
            return false;
          }
        }
        return true;
      }
      function bg(ce) {
        switch (ce) {
          case PropertyValueType.TwoD_SPATIAL:
            return PropertyValueType.TwoD;
          case PropertyValueType.ThreeD_SPATIAL:
            return PropertyValueType.ThreeD;
          default:
            return ce;
        }
      }
      function W(cg) {
        var cf = cg.propertyValueType;
        if (cf == undefined) {
          throw new Error(
            "Error in function getCorrectPropertyValueType: Given property has no element propertyValueType.",
          );
        }
        if (
          cg.matchName == "ADBE Anchor Point" ||
          cg.matchName == "ADBE Position"
        ) {
          ce = bc(cg);
          if (
            (ce instanceof AVLayer ||
              ce instanceof TextLayer ||
              ce instanceof ShapeLayer) &&
            !ce.threeDLayer
          ) {
            cf = PropertyValueType.TwoD_SPATIAL;
          }
        }
        if (cg.matchName == "ADBE Scale") {
          ce = bc(cg);
          if (
            (ce instanceof AVLayer || ce instanceof TextLayer) &&
            !ce.threeDLayer
          ) {
            cf = PropertyValueType.TwoD;
          }
        }
        return cf;
      }
      function bu(cg) {
        if (!cg.canSetExpression) {
          throw new Error(
            "cannot lock property " +
              cg.name +
              " since it does not support expressions",
          );
        }
        var cf = cg.value;
        if (cf instanceof Array) {
          ce = "[" + cf.join(",") + "]";
        } else {
          if (cf instanceof String) {
            ce = '"' + cf + '"';
          } else {
            ce = "" + cf;
          }
        }
        cg.expression = "//locked - do not change this property\n" + ce;
      }
      function aF() {
        var ce = app.project.activeItem;
        if (ce == null || !(ce instanceof CompItem)) {
          var cf = new br(
            bG({
              de: "Bitte \xf6ffne eine Komposition.",
              en: "Please open a composition.",
            }),
          );
          throw cf;
        }
        return ce;
      }
      function aw() {
        var ce = app.project.activeItem;
        if (
          ce == null ||
          !(ce instanceof CompItem) ||
          ce.selectedLayers.length != 1
        ) {
          var cf = new br(
            bG({
              de: "Bitte w\xe4hle genau eine Ebene aus.",
              en: "Please select exactly one layer.",
            }),
          );
          throw cf;
        }
        return ce.selectedLayers[0];
      }
      function aB(cf) {
        var ce = aF();
        x(ce, cf);
      }
      function o(cg, cf) {
        var ce = aF();
        return bq(ce, cg, cf);
      }
      function ax(cf) {
        var ce = aF();
        P(ce, cf);
      }
      function bK(cg, cf) {
        var ce = aF();
        return bD(ce, cg, cf);
      }
      function ah() {
        var cf = aF().selectedProperties;
        var ce = X(cf);
        return ce;
      }
      function am(cg) {
        var cf = ah();
        for (var ce = 0; ce < cf.length; ce += 1) {
          cg(cf[ce]);
        }
      }
      function be(ck, cg, ci) {
        function cm(cr) {
          for (var cp = 1; cp <= cr.numProperties; cp += 1) {
            var cq = cr.property(cp);
            if (cq.selected) {
              return null;
            }
          }
          var co = {
            "ADBE Angle Control": "ADBE Angle Control-0001",
            "ADBE Checkbox Control": "ADBE Checkbox Control-0001",
            "ADBE Color Control": "ADBE Color Control-0001",
            "ADBE Layer Control": "ADBE Layer Control-0001",
            "ADBE Point Control": "ADBE Point Control-0001",
            "ADBE Point3D Control": "ADBE Point3D Control-0001",
            "ADBE Slider Control": "ADBE Slider Control-0001",
            "ADBE Vector Shape - Group": "ADBE Vector Shape",
          };
          var cn = co[cr.matchName];
          if (cn) {
            return cr.property(cn);
          }
          return null;
        }
        var cj = app.project.activeItem;
        if (
          cj == null ||
          !(cj instanceof CompItem) ||
          cj.selectedProperties.length < 1
        ) {
          if (ci) {
            return 0;
          }
          throw new br("Please select at least one property.");
        }
        var cf = [];
        for (var ch = 0; ch < cj.selectedProperties.length; ch += 1) {
          var ce = cj.selectedProperties[ch];
          if (ce instanceof Property) {
            cf.push(ce);
          } else {
            if (cg) {
              var cl = cm(ce);
              if (cl && !cl.selected) {
                cf.push(cl);
              }
            }
          }
        }
        for (var ch = 0; ch < cf.length; ch += 1) {
          ck(cf[ch]);
        }
        return cf.length;
      }
      function az(cf, ce) {
        var cg = [];
        be(
          function (ch) {
            cg.push(ch);
          },
          cf,
          true,
        );
        if (cg.length < 1) {
          if (ce) {
            throw new br("please select a property");
          } else {
            return false;
          }
        }
        if (cg.length > 1) {
          if (ce) {
            throw new br("please select exactly one property");
          } else {
            return false;
          }
        }
        return cg[0];
      }
      function l() {
        var ce = aF().selectedProperties;
        var cf = new Array();
        b9(ce, function (cg) {
          if (cg instanceof MaskPropertyGroup) {
            cf.push(cg);
          }
        });
        return cf;
      }
      function R(ce) {
        while (ce.selectedProperties.length > 0) {
          ce.selectedProperties[0].selected = false;
        }
      }
      function ak(ce) {
        while (ce.selectedLayers.length > 0) {
          ce.selectedLayers[0].selected = false;
        }
      }
      function aT(ce) {
        var cf = ce[0].containingComp;
        ak(cf);
        for (var cg = 0; cg < ce.length; cg += 1) {
          ce[cg].selected = true;
        }
      }
      function bk(cl) {
        function cf(cm) {
          return cj[cm * 4];
        }
        function ce(cm) {
          return cj[cm * 4 + 1];
        }
        function ci(cm) {
          return cj[cm * 4 + 2];
        }
        function cg(cm) {
          return cj[cm * 4 + 3];
        }
        function ck() {
          var cm = [];
          for (var cn = 0; cn < ch; cn += 1) {
            cm.push(
              "(" +
                cf(cn) +
                "," +
                ce(cn) +
                ") to (" +
                ci(cn) +
                "," +
                cg(cn) +
                ")",
            );
          }
          return cm.join("\n");
        }
        this.isSupported = cl.baselineLocs !== undefined;
        if (!this.isSupported) {
          return;
        }
        var cj = cl.baselineLocs;
        var ch = cj.length / 4;
        this.numLines = ch;
        this.getLineStartX = cf;
        this.getLineStartY = ce;
        this.getLineEndX = ci;
        this.getLineEndY = cg;
        this.prettyPrint = ck;
      }
      function bS(cf, ce) {
        this.message = cf;
        this.code = ce;
      }
      bm.prototype = new Error();
      br.prototype = new Error();
      String.prototype.getNumLines = function () {
        return this.valueOf().split(/\r?\n|\r/).length;
      };
      String.prototype.hasPrefix = function (ce) {
        return this.slice(0, ce.length) == ce;
      };
      String.prototype.hasSuffix = function (ce) {
        return this.slice(-ce.length) == ce;
      };
      String.prototype.containsSubstring = function (ce) {
        var cf = this.valueOf();
        return cf.indexOf(ce) !== -1;
      };
      String.prototype.getLinesArray = function () {
        var cg = this.valueOf();
        var cf = cg.convertLinebeaksToN();
        var ce = cf.split("\n");
        if (ce[ce.length - 1] == "") {
          ce.length--;
        }
        return ce;
      };
      String.prototype.convertLinebeaksToN = function () {
        var cf = this.valueOf();
        var ce = cf.replace(/(\r\n)/g, "\n").replace(/(\r)|(\n)|(\x03)/g, "\n");
        return ce;
      };
      String.prototype.convertLinebeaksToR = function () {
        var cf = this.valueOf();
        var ce = cf.replace(/(\r\n)/g, "\r").replace(/(\r)|(\n)|(\x03)/g, "\r");
        return ce;
      };
      String.prototype.quoteIfContainsSpaces = function () {
        var ce = this.valueOf();
        if (ce.indexOf(" ") != -1 || ce === "") {
          return '"' + ce + '"';
        }
        return ce;
      };
      String.prototype.quoteForShell = function () {
        var ce = this.valueOf();
        if (
          ce.indexOf(" ") != -1 ||
          ce.indexOf("(") != -1 ||
          ce.indexOf(")") != -1 ||
          ce === ""
        ) {
          return '"' + ce + '"';
        }
        return ce;
      };
      String.prototype.quoteForBashShell = function () {
        var ce = this.valueOf();
        return "\'" + ce.replaceAll("\'", "\'\"\'\"\'") + "\'";
      };
      String.prototype.quoteForWindowsCmd = function () {
        var ce = this.valueOf();
        ce = ce.prefixAnyOf(
          ["^", "(", ")", "%", "!", '"', "<", ">", "&", "|", "\n"],
          "^",
        );
        return ce;
      };
      String.prototype.prefixAnyOf = function (ch, cg) {
        var ce = this.valueOf();
        for (var cf = 0; cf < ch.length; cf += 1) {
          ce = ce.replaceAll(ch[cf], cg + ch[cf]);
        }
        return ce;
      };
      String.prototype.quoteForWindowsCommandLineArgument = function (cg) {
        if (cg == undefined) {
          cg = false;
        }
        var cf = this.valueOf();
        if (
          !cg &&
          cf !== "" &&
          !cf.containsSubstring(" ") &&
          !cf.containsSubstring("\t") &&
          !cf.containsSubstring("\n") &&
          !cf.containsSubstring("\v") &&
          !cf.containsSubstring('"')
        ) {
          return cf;
        }
        var ce = '"';
        for (var ch = 0; ch < cf.length + 1; ch += 1) {
          var ci = 0;
          while (ch < cf.length && cf[ch] == "\\") {
            ci++;
            ch++;
          }
          if (ch == cf.length) {
            ce += "\\".duplicate(2 * ci);
          } else {
            if (cf[ch] == '"') {
              ce += "\\".duplicate(2 * ci + 1);
              ce += '"';
            } else {
              ce += "\\".duplicate(ci);
              ce += cf[ch];
            }
          }
        }
        ce += '"';
        return ce;
      };
      String.prototype.escapeRegExp = function () {
        var ce = this.valueOf();
        var cf = ce.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
        return cf;
      };
      String.prototype.trim = function () {
        var ce = this.valueOf();
        return ce.replace(/^\s+/, "").replace(/\s+$/, "");
      };
      String.prototype.containsOnlyWhitespace = function () {
        var ce = new RegExp(/^\s*$/);
        return ce.test(this.valueOf());
      };
      String.prototype.findFirstDifferenceTo = function (cg) {
        var ce = this.valueOf();
        var cf = 0;
        while (cf < ce.length && cf < cg.length && ce[cf] == cg[cf]) {
          cf++;
        }
        return cf;
      };
      String.prototype.detailedComparison = function (cg) {
        var ce = this.valueOf();
        var cf = ce.findFirstDifferenceTo(cg);
        if (cf == ce.length && cf == cg.length) {
          return "strings are identical";
        } else {
          return (
            "string difference:\n" +
            ce.substring(cf, cf + 50) +
            "\n<<<<<<<<<<<>>>>>>>>>>>>\n" +
            cg.substring(cf, cf + 50)
          );
        }
      };
      String.prototype.parseBool = function () {
        var ce = this.valueOf();
        return ce == "true" || ce == "True" || ce == "TRUE";
      };
      String.prototype.parseFormula = function () {
        var ce = this.valueOf();
        return n(ce);
      };
      String.prototype.replaceAll = function (cf, ce) {
        return this.split(cf).join(ce);
      };
      String.prototype.applyReplaceMapToFullString = function (cf) {
        var ce = this.valueOf();
        if (cf[ce] == undefined) {
          return ce;
        }
        return cf[ce];
      };
      String.prototype.applyReplaceMapToSubwords = function (cf) {
        var cg = aV(cf);
        var ce = this.valueOf();
        ce = ce.replace(cg, function (ch) {
          return cf[ch];
        });
        return ce;
      };
      String.prototype.applyRegExpReplaceMulti = function (cg) {
        var cf = this.valueOf();
        var ce = b6(cf, cg, 0);
        return ce;
      };
      String.prototype.splitWithEmptyElementAtEnd = function (cj) {
        var ci = this.valueOf();
        var ck = ci.match(cj);
        if (ck == null) {
          return [ci];
        }
        var cg = ci.search(cj);
        var cl = ck[0].length;
        var ch = ci.substr(0, cg);
        var cf = ci.substr(cg + cl, ci.length - (cg + cl));
        var ce = cf.splitWithEmptyElementAtEnd(cj);
        ce.unshift(ch);
        return ce;
      };
      String.prototype.duplicate = function (ch) {
        var cf = this.valueOf();
        var ce = "";
        for (var cg = 0; cg < ch; cg += 1) {
          ce += cf;
        }
        return ce;
      };
      aU.prototype.setSilent = function (ce) {
        this.silent = ce;
      };
      aU.prototype.hasError = function () {
        return this.errors.length > 0;
      };
      aU.prototype.hasMessage = function () {
        return this.messages.length > 0;
      };
      aU.prototype.add = function (ce) {
        this.errors.push(ce);
      };
      aU.prototype.message = function (ce) {
        if (this.silent) {
          this.messages.push(ce);
        } else {
          alert(ce);
        }
      };
      aU.prototype.clear = function () {
        this.errors = new Array();
      };
      aU.prototype.clearMessages = function () {
        this.messages = new Array();
      };
      aU.prototype.getErrorString = function () {
        var ce = "";
        for (var cf = 0; cf < this.errors.length; cf += 1) {
          ce += "Error " + cf + 1 + ":\n" + this.errors[cf] + "\n\n";
        }
        return ce;
      };
      aU.prototype.getMessageString = function (cg) {
        var ce = "";
        for (var cf = 0; cf < this.messages.length; cf += 1) {
          if (cg) {
            ce += this.messages[cf] + "\n\n";
          } else {
            ce += "Message " + cf + 1 + ":\n" + this.messages[cf] + "\n\n";
          }
        }
        return ce;
      };
      aU.prototype.popFirstMessage = function () {
        if (this.messages.length == 0) {
          return null;
        }
        return this.messages.shift();
      };
      aU.prototype.show = function (cf) {
        if (this.errors.length == 0) {
          return;
        }
        var cg = new Window("dialog", this.title, undefined, {
          resizeable: true,
        });
        var ce =
          "group{orientation:\'column\', alignment:[\'fill\',\'fill\'],message:StaticText{text:\'\',alignment:[\'left\',\'top\']},spacer:Group{},label:StaticText{text:\'Details\',alignment:[\'left\',\'top\']},detailsBox:EditText{properties:{multiline:true, readonly:true},text:\'\',preferredSize:[600,400],alignment:[\'fill\',\'fill\']},okBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\']}}";
        cg.UI = cg.add(ce);
        cg.UI.message.text = cf;
        cg.UI.detailsBox.text = this.getErrorString();
        cg.onResizing = cg.onResize = function () {
          this.layout.resize();
        };
        cg.show();
        this.clear();
      };
      a9.prototype.getPath = function () {
        return this.pathA;
      };
      a9.prototype.getFile = function (ck, ch, ci) {
        ci = ci || {};
        var cg = new File(this.pathA + "/" + ck);
        var cj = new aU("dummy");
        var cf = ba(cg, ch, cj, ci);
        if (cj.hasError()) {
          var ce = new File(this.pathB + "/" + ck);
          cf = ba(ce, ch, this.errorHandler, ci);
        }
        return cf;
      };
      a9.prototype.clear = function () {
        var ce = new Folder(this.pathA);
        at(ce, this.errorHandler);
        return !this.errorHandler.hasError();
      };
      Array.prototype.intArrayToString = function () {
        var ce = new String();
        for (var cf = 0; cf < this.length; cf += 1) {
          if (typeof this[cf] != "number") {
            throw new Error("Array must be all numbers");
          } else {
            if (this[cf] < 0) {
              throw new Error("Numbers must be 0 and up");
            }
          }
          ce += String.fromCharCode(this[cf]);
        }
        return ce;
      };
      Array.prototype.compareArrays = function (ce) {
        if (this.length != ce.length) {
          return false;
        }
        for (var cf = 0; cf < ce.length; cf += 1) {
          if (this[cf].compareArrays) {
            if (!this[cf].compareArrays(ce[cf])) {
              return false;
            } else {
              continue;
            }
          }
          if (this[cf] != ce[cf]) {
            return false;
          }
        }
        return true;
      };
      Array.prototype.appendArray = function (cg, ce) {
        ce = ce || {};
        if (ce.atFront) {
          for (cf = cg.length - 1; cf >= 0; cf--) {
            this.unshift(cg[cf]);
          }
        } else {
          for (var cf = 0; cf < cg.length; cf += 1) {
            this.push(cg[cf]);
          }
        }
      };
      Array.prototype.insertArray = function (ch, cf, ce) {
        var cg = ce.numElementsToDelete || 0;
        this.splice.apply(this, [ch, cg].concat(cf));
      };
      Array.prototype.clear = function () {
        while (this.length > 0) {
          this.pop();
        }
      };
      Array.prototype.map = function (cg) {
        var ce = new Array(this.length);
        for (var cf = 0; cf < this.length; cf += 1) {
          ce[cf] = cg(this[cf]);
        }
        return ce;
      };
      Array.prototype.mapWithIndex = function (cg) {
        var ce = new Array(this.length);
        for (var cf = 0; cf < this.length; cf += 1) {
          ce[cf] = cg(this[cf], cf);
        }
        return ce;
      };
      Array.prototype.foreach = function (cf) {
        for (var ce = 0; ce < this.length; ce += 1) {
          cf(this[ce], ce);
        }
      };
      Array.prototype.foreachSuccessivePair = function (cf) {
        for (var ce = 1; ce < this.length; ce += 1) {
          cf(this[ce - 1], this[ce]);
        }
      };
      Array.prototype.foldr = function (cg, ch) {
        var ce = ch;
        for (var cf = this.length - 1; cf > -1; cf--) {
          ce = cg(this[cf], ce);
        }
        return ce;
      };
      Array.prototype.foldl = function (cg, ch) {
        var ce = ch;
        for (var cf = 0; cf < this.length; cf += 1) {
          ce = cg(this[cf], ce);
        }
        return ce;
      };
      Array.prototype.exists = function (ce) {
        for (var cf = 0; cf < this.length; cf += 1) {
          if (this[cf] == ce) {
            return true;
          }
        }
        return false;
      };
      Array.prototype.contains = Array.prototype.exists;
      Array.prototype.all = function (cf) {
        for (var ce = 0; ce < this.length; ce += 1) {
          if (!cf(this[ce])) {
            return false;
          }
        }
        return true;
      };
      Array.prototype.filter = function (cg) {
        var ce = new Array();
        for (var cf = 0; cf < this.length; cf += 1) {
          if (cg(this[cf])) {
            ce.push(this[cf]);
          }
        }
        return ce;
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
        var ce = this.length;
        return this.foldl(function (cg, cf) {
          return cf + cg / ce;
        }, 0);
      };
      Array.prototype.getEntryClosestTo = function (ci) {
        if (this.length == 0) {
          return null;
        }
        var cg = 0;
        var ch = Math.abs(this[0] - ci);
        for (var ce = 1; ce < this.length; ce += 1) {
          var cf = Math.abs(this[ce] - ci);
          if (cf < ch) {
            ch = cf;
            cg = ce;
          }
        }
        return cg;
      };
      Array.prototype.random = function () {
        return this[Math.floor(Math.random() * this.length)];
      };
      Array.prototype.shuffle = function () {
        for (cg = this.length; cg; cg--) {
          cf = Math.floor(Math.random() * cg);
          ce = this[cg - 1];
          this[cg - 1] = this[cf];
          this[cf] = ce;
        }
      };
      Array.prototype.prettyPrint = function () {
        var ce =
          "[" +
          this.map(function (cf) {
            return '"' + cf + '"';
          }).join(",") +
          "]";
        return ce;
      };
      var bF = 0.001;
      var u = (function () {
        function ce(ch, cg) {
          if (ch instanceof Property && ch.numKeys > 0) {
            cg(ch);
          }
          if (
            ch instanceof Layer ||
            ch instanceof PropertyGroup ||
            ch.propertyType == PropertyType.INDEXED_GROUP ||
            ch.propertyType == PropertyType.NAMED_GROUP
          ) {
            for (var cf = 1; cf <= ch.numProperties; cf += 1) {
              ce(ch.property(cf), cg);
            }
          }
        }
        return ce;
      })();
      var ao = (function () {
        function ce(ch, cg) {
          if (ch instanceof Property && ch.expressionEnabled) {
            cg(ch);
          }
          if (
            ch instanceof Layer ||
            ch instanceof PropertyGroup ||
            ch.propertyType == PropertyType.INDEXED_GROUP ||
            ch.propertyType == PropertyType.NAMED_GROUP
          ) {
            for (var cf = 1; cf <= ch.numProperties; cf += 1) {
              ce(ch.property(cf), cg);
            }
          }
        }
        return ce;
      })();
      var bl = (function () {
        function cf(co, cn, cl, cm) {
          if (cj(cn, cl)) {
            return;
          }
          ck(co, cn, cl, cm);
        }
        function cg(co, cn, cl, cm) {
          if (cj(cn, cl)) {
            return true;
          }
          return ci(co, cn, cl, cm);
        }
        function cj(cn, cl) {
          var cm =
            app.settings.haveSetting(cn, cl) &&
            app.settings.getSetting(cn, cl) == "true";
          return cm;
        }
        function ce(cm, cl) {
          app.settings.saveSetting(cm, cl, "true");
        }
        function ch(cm, cl) {
          app.settings.saveSetting(cm, cl, "false");
        }
        function ck(cr, cl, cm, ct) {
          ct = ct || {};
          var cp = ct.windowTitle || "";
          var cq = new Window("dialog", cp, undefined, { resizeable: true });
          var co =
            "group{orientation:\'column\',alignment:[\'fill\',\'top\'],margins:0,content:Group{orientation:\'column\',alignment:[\'fill\',\'fill\'],spacing:0, alignChildren:[\'left\',\'top\']},\tdontShowOption:Checkbox{text:\'don\\\'t show again\',alignment:[\'left\',\'top\']},\tokBtn:Button{text:\'OK\',alignment:[\'center\',\'bottom\']}}";
          cq.UI = cq.add(co);
          var cu = cr.getLinesArray();
          for (var cn = 0; cn < cu.length; cn += 1) {
            var cs = cq.UI.content.add("staticText{margins:0}");
            cs.text = cu[cn];
          }
          cq.UI.okBtn.onClick = function () {
            if (cq.UI.dontShowOption.value) {
              ce(cl, cm);
            }
            cq.close();
          };
          cq.layout.resize();
          cq.onResizing = cq.onResize = function () {
            this.layout.resize();
          };
          cq.show();
        }
        function ci(cr, cl, cm, cu) {
          cu = cu || {};
          var cp = cu.windowTitle || "";
          var cq = new Window("dialog", cp, undefined, { resizeable: true });
          var cv = undefined;
          var co =
            "group{orientation:\'column\',alignment:[\'fill\',\'top\'],margins:0, content:Group{orientation:\'column\',alignment:[\'fill\',\'fill\'],spacing:0, alignChildren:[\'left\',\'top\']},\tdontShowOption:Checkbox{text:\'don\\\'t show again\',alignment:[\'left\',\'top\']}, btnGroup:Group{orientation:\'row\',alignment:[\'fill\',\'bottom\'],\t  yesBtn:Button{text:\'Yes\',alignment:[\'center\',\'bottom\']},\t  noBtn:Button{text:\'No\',alignment:[\'center\',\'bottom\']}  }}";
          cq.UI = cq.add(co);
          var ct = cr.getLinesArray();
          for (var cn = 0; cn < ct.length; cn += 1) {
            var cs = cq.UI.content.add("staticText{margins:0}");
            cs.text = ct[cn];
          }
          cq.UI.btnGroup.yesBtn.onClick = function () {
            if (cq.UI.dontShowOption.value) {
              ce(cl, cm);
            }
            cv = true;
            cq.close();
          };
          cq.UI.btnGroup.noBtn.onClick = function () {
            if (cq.UI.dontShowOption.value) {
              ce(cl, cm);
            }
            cv = false;
            cq.close();
          };
          cq.layout.resize();
          cq.onResizing = cq.onResize = function () {
            this.layout.resize();
          };
          cq.show();
          return cv;
        }
        return {
          confirm: cg,
          disableDontShow: ch,
          enableDontShow: ce,
          isDontShowEnabled: cj,
          show: cf,
        };
      })();
      var cb = (function () {
        function cj(cr) {
          if (!(cr instanceof TextLayer)) {
            throw new Error("argument is no text layer");
          }
          var cp = cr
            .property("ADBE Text Properties")
            .property("ADBE Text Document").value;
          if (cp.pointText) {
            throw new Error("argument is point text and no box text layer");
          }
          var co = ck(cr);
          var cq = cn(cp.text);
          ci(co, cq, cp);
          return co;
        }
        function ce(cp) {
          var co = new bk(cp);
          if (!co.isSupported) {
            return 9999999;
          }
          return co.numLines;
        }
        function ci(cA, cu, cB) {
          var cr = cB.boxTextSize[0];
          var ct = "";
          var cs = cA
            .property("ADBE Text Properties")
            .property("ADBE Text Document").value;
          var cx = ce(cs);
          if (cs.pointText) {
            cl(cB, cs);
          } else {
            cs = cB;
            cs.text = "";
            cs.boxTextSize = [ch, cB.boxTextSize[1]];
          }
          for (var cq = 0; cq < cu.length; cq += 1) {
            cs.text = ct + cu[cq];
            cA.property("ADBE Text Properties")
              .property("ADBE Text Document")
              .setValue(cs);
            var cy = cA.sourceRectAtTime(0, false);
            var cw = false;
            if (cy.width > cr) {
              cw = true;
              cs.text = ct + "\n" + cu[cq];
              cA.property("ADBE Text Properties")
                .property("ADBE Text Document")
                .setValue(cs);
              cy = cA.sourceRectAtTime(0, false);
              var cz = 1;
              if (cy.width > cr + cz) {
                var cv = cm(cA, cu[cq], cr);
                var cp = cu[cq].substring(0, cv);
                var co = cu[cq].substring(cv);
                cu.splice(cq, 1, cp, co);
              }
            }
            var cC = ct.getLinesArray();
            if (cC.length > cx) {
              cC.length = cx;
              ct = cC.join("\n");
              cs.text = ct;
              cA.property("ADBE Text Properties")
                .property("ADBE Text Document")
                .setValue(cs);
              return;
            }
            if (cw) {
              ct += "\n";
            }
            ct += cu[cq];
          }
        }
        function cm(cr, cq, cu) {
          var ct = cq.split("");
          var cv = "";
          var co = cr
            .property("ADBE Text Properties")
            .property("ADBE Text Document").value;
          for (var cp = 0; cp < ct.length; cp += 1) {
            cv += ct[cp];
            co.text = cv;
            cr.property("ADBE Text Properties")
              .property("ADBE Text Document")
              .setValue(co);
            var cs = cr.sourceRectAtTime(0, false);
            if (cs.width > cu) {
              return Math.max(1, cp);
            }
          }
          throw new Error(
            "could not find split position (looks like the entire token fits properly)",
          );
        }
        function cl(cp, co) {
          cg(
            [
              "applyFill",
              "applyStroke",
              "font",
              "fontSize",
              "justification",
              "tracking",
              "leading",
            ],
            cp,
            co,
          );
          if (cp.applyFill) {
            cg(["fillColor"], cp, co);
          }
          if (cp.applyStroke) {
            cg(["strokeColor", "strokeWidth"], cp, co);
          }
          if (cp.applyStroke && cp.applyFill) {
            cg(["strokeOverFill"], cp, co);
          }
          return cp;
        }
        function cg(cq, cr, co) {
          for (var cp = 0; cp < cq.length; cp += 1) {
            if (cr[cq[cp]] !== undefined) {
              co[cq[cp]] = cr[cq[cp]];
            }
          }
        }
        function cn(co) {
          var cr = [];
          var cq = /\S+\s*/g;
          while ((cp = cq.exec(co)) !== null) {
            cr.push(cp[0]);
          }
          return cr;
        }
        function ck(cq) {
          var cp = cq.containingComp;
          var co = cp.layers.addText("");
          co.name = cq.name;
          co.moveBefore(cq);
          return co;
        }
        function cf(cr) {
          if (!(cr instanceof TextLayer)) {
            throw new Error("argument is no text layer");
          }
          var cp = cr
            .property("ADBE Text Properties")
            .property("ADBE Text Document").value;
          if (cp.pointText) {
            throw new Error("argument is point text and no box text layer");
          }
          var cq = cn(cp.text);
          var co = cp.boxTextSize[0];
          ci(cr, cq, cp);
          cp = cr
            .property("ADBE Text Properties")
            .property("ADBE Text Document").value;
          cp.boxTextSize = [co, cp.boxTextSize[1]];
          cr.property("ADBE Text Properties")
            .property("ADBE Text Document")
            .setValue(cp);
          return cp;
        }
        var ch = 10000;
        return {
          bakeLinebreaks: cf,
          copyBoxTextToPointText: cj,
          kindOfMaximumBoxTextWidth: ch,
        };
      })();
      bS.prototype = new Error();
      bS.errorCode3DLayer = 1;
      bS.errorCodeBoxText = 2;
      bS.errorCodeNoTextLayer = 3;
      bS.errorCodeKeyframedSourceText = 4;
      bS.errorCodeKeyframedPosition = 5;
      bS.errorCodeUnsupportedAlignment = 6;
      var bQ = (function () {
        function cf(cL, cx) {
          cx = cx || {};
          var cG = [];
          var cy = /./;
          if (cx.split == "custom regular expression") {
            cy =
              cx.splitWord instanceof RegExp
                ? cx.splitWord
                : new RegExp(cx.splitWord);
          } else {
            if (cx.split == "custom word") {
              cy = new RegExp(cx.splitWord.escapeRegExp());
            } else {
              if (cx.split == "characters") {
              } else {
                if (cx.split == "words") {
                  cy = /\S+/;
                } else {
                  if (cx.split == "lines") {
                    cy = /^.+$/;
                  }
                }
              }
            }
          }
          if (!(cL instanceof TextLayer)) {
            throw new bS("layer must be a text layer", bS.errorCodeNoTextLayer);
          }
          if (
            cL.property("ADBE Text Properties").property("ADBE Text Document")
              .numKeys > 0
          ) {
            throw new bS(
              "source text of text layer may not be keyframed",
              bS.errorCodeKeyframedSourceText,
            );
          }
          var cD = cL
            .property("ADBE Text Properties")
            .property("ADBE Text Document").value;
          var cB = [
            ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER,
            ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT,
            ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT,
            ParagraphJustification.FULL_JUSTIFY_LASTLINE_FULL,
          ];
          if (cB.exists(cD.justification)) {
            throw new bS(
              "Unsupported paragraph justicifaction. Paragraph Alignment \'Justify\' is not supported, please choose text that is left, right or center aligned.",
              bS.errorCodeUnsupportedAlignment,
            );
          }
          var cI = null;
          var cw = cD.boxText;
          if (cw) {
            cI = { boxWidth: cD.boxTextSize[0], text: cD.text };
            cb.bakeLinebreaks(cL);
            cD = cL
              .property("ADBE Text Properties")
              .property("ADBE Text Document").value;
            cD.boxTextSize = [cb.kindOfMaximumBoxTextWidth, cD.boxTextSize[1]];
            cL.property("ADBE Text Properties")
              .property("ADBE Text Document")
              .setValue(cD);
          }
          var cv = ci(cD.text, cy);
          var cM = cx.limit;
          if (cM !== undefined) {
            cs(cv, cM);
          }
          for (var cJ = 0; cJ < cv.length; cJ += 1) {
            var cF = cv[cJ];
            if (cx.rtlText === true) {
              cF = cF.reverse();
            }
            for (var cE = 0; cE < cF.length; cE += 1) {
              var cA = cF[cE];
              if (!cA.containsOnlyWhitespace()) {
                var cH = cL.duplicate();
                cH.name = cA;
                cn(cH);
                cH.setParentWithJump(cL);
                var cz = cl(cv, cJ, cE, cL, cH);
                ct(
                  cH.property("ADBE Transform Group").property("ADBE Position"),
                  cz,
                );
                var cK = cH
                  .property("ADBE Text Properties")
                  .property("ADBE Text Document").value;
                cK.text = cA;
                if (cw) {
                  cK.boxTextSize = [cI.boxWidth, cD.boxTextSize[1]];
                }
                cH.property("ADBE Text Properties")
                  .property("ADBE Text Document")
                  .setValue(cK);
                cG.push(cH);
              }
            }
          }
          if (cx.deleteOriginal == true) {
            if (cq(cL)) {
              cL.enabled = false;
              if (!cx.silent) {
                var cC =
                  "Ignored \'Delete Original\' option.\n\nSince the original layer is animated, we need it to preserve\nthe animation (the created layers are parented to it).";
                bl.show(cC, "TextExploder 2", "warnDeleteOriginalIgnored");
              }
            } else {
              cL.remove();
            }
          } else {
            if (cw) {
              cD = cL
                .property("ADBE Text Properties")
                .property("ADBE Text Document").value;
              cD.text = cI.text;
              cD.boxTextSize = [cI.boxWidth, cD.boxTextSize[1]];
              cL.property("ADBE Text Properties")
                .property("ADBE Text Document")
                .setValue(cD);
            }
          }
          if (cx.layerOrder == "bottomToTop" && cG.length > 0) {
            cr(cG[0].containingComp, cG[0].index, cG.length);
          }
          return cG;
        }
        function cn(cv) {
          var cw = cv.property("ADBE Transform Group");
          cj(cw.property("ADBE Anchor Point"), [0, 0, 0]);
          cj(cw.property("ADBE Position"), [0, 0, 0]);
          cj(cw.property("ADBE Scale"), [100, 100, 100]);
          cj(cw.property("ADBE Rotate Z"), 0);
          if (cv.threeDLayer) {
            cj(cw.property("ADBE Orientation"), [0, 0, 0]);
            cj(cw.property("ADBE Rotate X"), 0);
            cj(cw.property("ADBE Rotate Y"), 0);
          }
        }
        function cq(cv) {
          var cw = false;
          aX(cv, function (cx) {
            aH(cx, cx.value, function (cy) {
              cw = cw || cy.numKeys > 0 || cy.expressionEnabled;
            });
          });
          return cw;
        }
        function cj(cv, cw) {
          aH(cv, cw, function (cx, cy) {
            d(cx);
            cx.setValue(cy);
          });
        }
        function ct(cv, cw) {
          aH(cv, cw, function (cx, cy) {
            cx.setValue(cy);
          });
        }
        function cr(cx, cw, cz) {
          var cv = cw + cz - 1;
          if (cz == 0) {
            return;
          }
          for (var cy = 0; cy < cz - 1; cy += 1) {
            cx.layer(cv).moveBefore(cx.layer(cw + cy));
          }
        }
        function ci(cy, cw) {
          var cv = cy.getLinesArray();
          var cx = cv.map(function (cz) {
            return cm(cz, cw);
          });
          co(cx, cw);
          return cx;
        }
        function cm(cw, cy) {
          var cz = [];
          var cA = -1;
          var cv = -2;
          while ((cx = cy.exec(cw)) != null && cA != cv) {
            cA = cx.index;
            cv = cx.index + cx[0].length;
            if (cA > 0) {
              cz.push(cw.slice(0, cA));
            }
            cz.push(cw.slice(cA, cv));
            cw = cw.slice(cv);
          }
          cz.push(cw);
          return cz;
        }
        function co(cA, cy) {
          for (var cz = 0; cz < cA.length - 1; cz += 1) {
            var cx = cA[cz];
            var cw = cA[cz + 1];
            if (
              cx.length == 1 &&
              cw.length == 1 &&
              cy.exec(cx[0]) == null &&
              cy.exec(cw[0]) == null
            ) {
              var cv = [cx[0] + "\r" + cw[0]];
              cA.splice(cz, 2, cv);
              cz--;
            }
          }
        }
        function cs(cB, cw) {
          var cz = 0;
          for (var cv = 0; cv < cB.length; cv += 1) {
            var cA = cB[cv];
            for (var cy = 0; cy < cA.length; cy += 1) {
              var cx = cA[cy];
              if (!cx.containsOnlyWhitespace()) {
                cz++;
                if (cz >= cw) {
                  cB.length = cv + 1;
                  cB[cv].length = cy + 1;
                }
              }
            }
          }
        }
        function cl(cv, cF, cD, cJ, cM) {
          var cL = cM
            .property("ADBE Transform Group")
            .property("ADBE Position").value;
          var cC = cJ
            .property("ADBE Text Properties")
            .property("ADBE Text Document").value;
          var cH = cv[cF][cD];
          var cy = cv[cF].slice(0, cD + 1).join("");
          var cI = cv[cF].slice(cD).join("");
          var cE = cv[cF].join("");
          var cG = cv
            .slice(0, cF + 1)
            .map(function (cO) {
              return cO.join("");
            })
            .join("\r");
          var cA = cF == cv.length - 1;
          var cK = cF == 0;
          var cN = 0;
          var cB = 0;
          var cw = {};
          if (!cK) {
            cw.allLinesUpToCurrentLine =
              cw.allLinesUpToCurrentLine || cu(cM, cG);
            cw.fullLine = cw.fullLine || cu(cM, cE);
            cB = ce(cw);
          }
          if (
            cC.justification == ParagraphJustification.LEFT_JUSTIFY ||
            (cA &&
              cC.justification ==
                ParagraphJustification.FULL_JUSTIFY_LASTLINE_LEFT)
          ) {
            cw.sameLineUpToToken = cw.sameLineUpToToken || cu(cM, cy);
            cw.token = cw.token || cu(cM, cH);
            cN = cp(cw);
          } else {
            if (
              cC.justification == ParagraphJustification.RIGHT_JUSTIFY ||
              (cA &&
                cC.justification ==
                  ParagraphJustification.FULL_JUSTIFY_LASTLINE_RIGHT)
            ) {
              cw.sameLineAfterToken = cw.sameLineAfterToken || cu(cM, cI);
              cw.token = cw.token || cu(cM, cH);
              cN = ch(cw);
            } else {
              if (
                cC.justification == ParagraphJustification.CENTER_JUSTIFY ||
                (cA &&
                  cC.justification ==
                    ParagraphJustification.FULL_JUSTIFY_LASTLINE_CENTER)
              ) {
                cw.fullLine = cw.fullLine || cu(cM, cE);
                cw.sameLineUpToToken = cw.sameLineUpToToken || cu(cM, cy);
                cw.token = cw.token || cu(cM, cH);
                cN = ck(cw);
              } else {
                throw new bS(
                  "Unsupported paragraph justicifaction. Paragraph Alignment \'Justify\' is not supported, please choose text that is left, right or center aligned.",
                  bS.errorCodeUnsupportedAlignment,
                );
              }
            }
          }
          var cz = [cN, cB];
          var cx = [cL[0] + cz[0], cL[1] + cz[1], cL[2]];
          return cx;
        }
        function ce(cv) {
          var cw =
            cv.allLinesUpToCurrentLine.sourceRect.top +
            cv.allLinesUpToCurrentLine.sourceRect.height -
            cv.fullLine.sourceRect.height -
            cv.fullLine.sourceRect.top;
          return cw;
        }
        function cp(cw) {
          var cv =
            cw.sameLineUpToToken.sourceRect.left +
            cw.sameLineUpToToken.sourceRect.width -
            cw.token.sourceRect.width -
            cw.token.sourceRect.left;
          return cv;
        }
        function ch(cw) {
          var cv =
            cw.sameLineAfterToken.sourceRect.left - cw.token.sourceRect.left;
          return cv;
        }
        function ck(cw) {
          var cv =
            cw.fullLine.sourceRect.left +
            cw.sameLineUpToToken.sourceRect.width -
            cw.token.sourceRect.width -
            cw.token.sourceRect.left;
          return cv;
        }
        function cu(cv, cy) {
          var cx = cv.containingComp.time;
          cg(cv, cy);
          var cw = {};
          cw.text = cy;
          cw.sourceRect = cv.sourceRectAtTime(cx, false);
          return cw;
        }
        function cg(cw, cy) {
          var cx = cw
            .property("ADBE Text Properties")
            .property("ADBE Text Document");
          var cv = cx.value;
          cv.text = cy;
          cx.setValue(cv);
          return cv;
        }
        return cf;
      })();
      var aa = (function (ch) {
        function cg(ck) {
          ck = ck || {};
          var ci = al();
          ce(ck, ci);
          var cp = ch.t();
          if (cp) {
            ck.limit = 5;
          }
          var co = ck.layerArray || aF().selectedLayers;
          var cj = [];
          for (var cm = 0; cm < co.length; cm += 1) {
            var cl = co[cm];
            try {
              bQ(cl, ck);
            } catch (cn) {
              if (cn instanceof bS) {
                cj.push({ layer: cl, message: cn.message });
              } else {
                throw cn;
              }
            }
          }
          if (cp) {
            alert("In trial mode only the first 5 layers are created.");
          }
          if (!ck.silent) {
            cf(cj);
          }
        }
        function cf(ck) {
          if (ck.length == 1) {
            alert(
              "Could not explode layer " +
                ck[0].layer.index +
                "\n" +
                ck[0].message,
            );
          } else {
            if (ck.length > 1) {
              var cj = ck
                .map(function (cl) {
                  return cl.layer.index;
                })
                .join(", ");
              cj = cj.replace(/\s?,\s?([^,]*)$/, " and $1");
              var ci = ck
                .map(function (cl) {
                  return "layer " + cl.layer.index + ": " + cl.message;
                })
                .join("\n");
              alert("Could not explode layers " + cj + "\n" + ci);
            }
          }
        }
        function ce(cj, ci) {
          for (var ck in ci) {
            if (ci.hasOwnProperty(ck) && cj[ck] === undefined) {
              cj[ck] = ci[ck];
            }
          }
        }
        return {
          explode: function (ci) {
            return bB(
              function () {
                return cg(ci);
              },
              { undoGroup: "Text Explode" },
              ci,
              ch,
            );
          },
        };
      })(frw);
      this.version = "2.0.004";
      this.showUI = function (cf) {
        if (k("TextExploder")) {
          if (frw.c()) {
            var ce = bv(cf, aa);
            if (ce != null && ce instanceof Window) {
              ce.show();
            }
          }
        }
      };
      av(
        this,
        aa,
        "explode",
        '({layerArray, \n\tsplit (string: "characters","words","lines","custom word"),\n\trtlText (bool),\n\tdeleteOriginal (bool),\n\tlayerOrder (string: "bottomToTop"|"topToBottom"),\n\tsplitWord(string - the custom text where to split),\n\t' +
          bb() +
          "})",
      );
    }
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
            t.version +
              "\n" +
              strCurrentVersion.replace(/%v/, strScriptVersion),
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
          (Folder("/Volumes/Private").exists ||
            Folder("/Volumes/private").exists)
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
          '"' +
            n.fsName +
            '" "' +
            strHeader +
            '" ' +
            privateNum +
            ' "' +
            e +
            '"',
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
                licErrors[locale][checkErrorCode(licenseValidity.result)]
                  .detail +
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
        var d =
          strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
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
          isServerConfigured(licenseValidity) &&
          isServerRunning(licenseValidity)
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
                        licErrors[locale][
                          checkErrorCode(licenseValidity.result)
                        ].detail +
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
      var managerAppUrl =
        "https://aescripts.com/learn/aescripts-aeplugins-manager-app/";
      var remindMeLaterDays = 7;
      var doUpdateCheck =
        !vars.hasOwnProperty("doUpdateCheck") || vars.doUpdateCheck;
      var updateCheckInterval = 5;
      var maxUIButtons = 3;
      var licV = 2;
      var wx = __BLOB__BLOB_000696__;
      var mx = __BLOB__BLOB_000697__;
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
          "Eine neuere Version von " +
          strScriptName +
          " ist verf\xfcgbar: v%\n",
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
    var myVersionNumber = "2.0.004";
    var mySettingsSection = "TextExploder 2";
    var helpText =
      "TextExploder allows to split a text layer into many text layers, like one for each character, word or line.\r\n\r\nBasic Usage:\r\n1. choose how to explode (into characters, words, lines, isolate a custom word, or based on a regular expression)\r\n2. select a text layer (or several layers) and click \u201capply\u201d.\r\n\r\n\u2014\u2014\u2014 Split Variants \u2014\u2014\u2014 \r\n\r\nCharacters\r\ncreates one layer for each character of the text.\r\n\r\nWords\r\ncreates one layer for each word of the text.\r\n\r\nLines\r\ncreates one layer for each line of the text\r\n\r\nCustom Word\r\ncreates one layer for each occurrence of the given custom word (and also layers for the parts of the\r\ntext before and after those occurrences). \r\nExample:\r\n\u201cWelcome to mamoworld TextExploder\u201d with custom word \u201cmamoworld\u201d is split into\r\n\u201cWelcome to \u201c, \u201cmamoworld\u201d and \u201cTextExploder\u201d\r\n\u201cWelcome to mamoworld TextExploder\u201d with custom word \u201cm\u201d is split into\r\n\u201cWelco\u201c, \u201cm\u201c, \u201ce to \u201c, \u201cm\u201c, \u201ca\u201c, \u201cm\u201c, \u201coworld TextExploder\u201d\r\n\r\nCustom Regular Expression\r\nsplits the text as described by the given regular expression (RegEx). A RegEx is a very powerful language to describe patterns of words. If you don\u2019t know RegEx, yet, you best think about it as an advanced version of the  \u201cCustom Word\u201d function, which allows very advanced wildcards.\r\nTextExploder creates one layer for each occurrence of the given pattern. \r\nA \u201c.\u201d is a placeholder for any letter, for example. So the RegEx\r\n\u201c\u2026\u201d will split your text in fragments of 3 letters length and \u201c.A.\u201d will split at each \u201cA\u201d in the text, but not directly at the A, but one letter before and after the A.\r\nFor more information about Regular Expressions, google or see here\r\nhttp://www.aivosto.com/articles/regex.html\r\nTo test regular expressions I recommend:\r\nhttps://regexr.com/ (test and experiment with regular expressions)\r\n\r\n\r\n\u2014\u2014\u2014 Options \u2014\u2014\u2014 \r\n\r\nDelete Original\r\n deletes the original text layer after the copies for the individual parts have been created.\r\n\r\nRTL text\r\nenable this for languages that are written right to left\r\n\r\nLayer Order\r\nControls how the generated text layers are sorted (in reading order from top to bottom or from bottom to top)\r\n\r\n\r\n\u2014\u2014\u2014 Limitations \u2014\u2014\u2014 \r\n\r\nTextExploder can only split text that is aligned left, right or centered. It cannot split paragraph text (bounded text) whose alignment is set to \u201cJustify\u201d.\r\n\r\nTextExploder cannot deal with text layers where the font, size, kerning etc. has been modified for individual parts of the text. Changes that affect the entire text (like changing the tracking, leading, font-size or font for the entire text) are supported by TextExploder, but as soon as you start tweaking individual letters, TextExploder will be unable to detect the changes. So, if you need to adjust the tracking (or anything else) for individual letters, do this after exploding the text with TextExploder to avoid inaccurate placement. \r\n";
    var zhe = {
      helpButtons: [
        {
          name: "Video Tutorials",
          url: "https://mamoworld.com/tutorials?filter=tid-324",
        },
        {
          name: "Reset Messages",
          onClickFunction: function () {
            app.settings.saveSetting(
              mySettingsSection,
              "warnDeleteOriginalIgnored",
              "false",
            );
            alert(
              'All messages will be shown again\nuntil you again explicitly check their "don\'t show" option.',
            );
          },
          type: "Button",
        },
      ],
      helpText: helpText,
      offerBeta: false,
      offerTrial: true,
      privateNumber: 6933266443779338,
      productSKU: "MMTE2-SUL",
      scriptAuthor: "mamoworld",
      scriptName: "TextExploder V2",
      scriptURL: "https://aescripts.com/textexploder/",
      scriptVersion: myVersionNumber,
    };
    var frw = new a(zhe);
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
    return TextExploderV2;
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
  if (typeof textExploderV2 == "undefined") {
    textExploderV2 = new TextExploderV2();
  }
  return runScriptOrExecuteKbarCommand(textExploderV2, thisObj);
})(this);
