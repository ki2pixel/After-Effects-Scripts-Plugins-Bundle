/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function NA_LoopMaster(thisObj) {
  var nomDeMonScript = "LoopMaster";
  var versionDuScript = "1.0";
  var ab_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "joedeveloper@me.com",
    helpButtons: [],
    helpText:
      "This script is designed to help you create seamless loop.\nMost effects loop according to the length of your comp!\n\nLOOP KAYFRAMES: It\'s is similar to a loop expression but this one can loop Properties and Path!\n\n2D WIGGLE: Apply a wiggle effect on selected layer(s) linked to the Position, Scale, Rotation and Opacity.\nSpeed: the Frequency\nStrength: the Amplitude\nFPS: Control the frames per second of this effect. Set it to 12 or lower to get some \'stop motion\' effect.\n\n3D WIGGLE: Similart to the above but turn the layer into a 3D layer and the Z axis is in consideration.\nSpeed: the Frequency\nStrength: the Amplitude\nFPS: Control the frames per second of this effect. Set it to 12 or lower to get some \'stop motion\' effect.\n\n2D SPIN: The layer will turn around a point, in a 2D space.\nSpeed: Speed of the rotation\nDistance from Origin: Bigger numbers = further away.\nOrigin: Set the position of the origin point.\nStart Angle: To start your rotation from a different angle.\nFPS: Control the frames per second of this effect.\n\n3D ORBIT: Turn a 2D layer into a 3D Orbit. A Null layer is created to control the orbit rotation.\nSpeed: Speed of the rotation\nDistance from Origin: Bigger numbers = further away.\nOrigin: Set the position of the origin point.\nTrajectory: Change the angle of rotation.\nCustom Orientation: To rotate the layer on itself.\n\nLOOP ITEM: Loop a footage or a comp thanks a auto-TimeRemap. \n\nTO REMOVE ANY EFFECT:\nPress ALT (Win) or OPTION (Max) then Click on the desired icon to remove the pseudo effect and expressions associated with it.\nFor Orbit 3D, you need to select the Null Orbit to remove the effect. No need to select the original footage.\n\nSPECIAL THANKS:\nThank you Fremox for your open written script! It was the start of LoopMaster!",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 77619984,
    productSKU: "NALM-SUL",
    scriptAuthor: "NirinA",
    scriptName: nomDeMonScript,
    scriptURL: "https://aescripts.com/loopmaster",
    scriptVersion: versionDuScript,
  };
  function a(e) {
    function t() {
      var e = new Window(
        "dialog",
        Oe + " v" + Q + BD("RX9tDpISJFcYDUpfJ90M"),
        void 0,
        { resizeable: true },
      );
      if (null != e) {
        var t =
          "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\tinfoGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'top\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\torientation: \'column\', \r\t\t\t\t\t\thdrGrp: Group {\r\t\t\t\t\t\t\ttxt: StaticText {}, \r\t\t\t\t\t\t\tpaste: StaticText {}, \r\t\t\t\t\t\t}\r\t\t\t\t\t\ttrial: StaticText {}, \r\t\t\t\t\t} \r\t\t\t\t\tlicGrp: Group { \r\t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \r\t\t\t\t\t} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r                            buyGrp: Group { \r                            alignment: [\'left\',\'fill\'], \r                            alignChildren: [\'left\',\'fill\'], \r                            orientation: \'column\', \r                            spacing:1,\r                                  retrieveReg: Button {text:\'" +
          Ge +
          "\', name:\'retrieve\',preferredSize:[130,25]}\r                                   buyLic: Button {text:\'" +
          Te +
          "\', name:\'buy\',preferredSize:[130,25]}\r                                   }\r\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          Ee +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tokBtn: Button {text:\'" +
          Be +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
        e.grp = e.add(t);
        var n = ScriptUI.newFont(
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
          (e.grp.licGrp.txt.preferredSize = [600, 30]),
          (e.grp.infoGrp.hdrGrp.txt.text = vt),
          (e.grp.infoGrp.hdrGrp.txt.graphics.font = n),
          (e.grp.infoGrp.hdrGrp.paste.text = mt),
          (e.grp.infoGrp.hdrGrp.paste.graphics.font = r),
          (e.grp.infoGrp.trial.text = oe || !ie ? "" : bt),
          z(wt) && (e.grp.infoGrp.trial.text = zt),
          (e.grp.licGrp.txt.text = oe || !ie ? "" : "trial"),
          z(wt) && (e.grp.licGrp.txt.text = "@REMOTE"),
          (e.grp.okGrp.buyGrp.retrieveReg.visible =
            e.grp.okGrp.buyGrp.buyLic.visible =
              !oe),
          (e.grp.okGrp.buyGrp.retrieveReg.onClick =
            e.grp.okGrp.buyGrp.buyLic.onClick =
              function () {
                var t = "buy" == this.name ? H : fe;
                (t != fe || fe != pe || confirm(Ie)) && O(t);
                e.close(false);
              }),
          (e.grp.okGrp.cancelBtn.onClick = function () {
            e.close(false);
          }),
          (e.grp.okGrp.okBtn.onClick = function () {
            kt = e.grp.licGrp.txt.text
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
    function n(e, t) {
      return new Date() < t || new Date() > e;
    }
    function r() {
      var t = new Window("dialog", Z + " v" + Q, void 0, { resizeable: true });
      if (null != t) {
        for (
          var n =
              -1 != $.os.indexOf("Windows") &&
              parseFloat(app.version) >= 12 &&
              parseFloat(app.version) < 14
                ? ["left", "top"]
                : ["fill", "fill"],
            r =
              "group { \r\t\torientation: \'column\', \r\t\talignment: [\'" +
              n[0] +
              "\',\'" +
              n[1] +
              "\'], \r\t\talignChildren: [\'fill\',\'fill\'], \r                   infoGrp: Group { \r                   alignment: [\'fill\',\'top\'], \r                   alignChildren: [\'fill\',\'top\'], \r\t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]}, \r                      hdr: StaticText {properties:{multiline:true}}, \r                      removeLic: Button {text:\'" +
              Ye +
              "\', preferredSize:[40,30]} \r\t\t\t\t} \r\t\t\t\thelpGrp: Group { \r                   alignment: [\'" +
              n[0] +
              "\',\'" +
              n[1] +
              "\'], \r                   alignChildren: [\'fill\',\'fill\'], \r                    txt: EditText {properties:{multiline:true, readonly:true}}, \r\t\t\t\t} \r                prefsGrp: Group {\r                       alignment: [\'fill\',\'bottom\'], \r                       alignChildren: [\'left\',\'center\'], \r                       orientation: \'row\', \r                       doUpdateCheck: Checkbox {text:\'" +
              Ze +
              "\'} \r                       }\r\t\t\tokGrp: Group { \r                alignment: [\'fill\',\'bottom\'], \r                alignChildren: [\'fill\',\'center\'], \r                 supportBtn: Button {text:\'" +
              Fe +
              "\', preferredSize:[150,30], alignment: [\'left\',\'center\']} \r                ",
            o = 0;
          o < Math.min(ze, e.helpButtons.length);
          o++
        ) {
          e.helpButtons[o].hasOwnProperty("name") &&
            (r +=
              "btn" + o + ": " + e.helpButtons[o].hasOwnProperty("type") &&
              i(e.helpButtons[o].type)
                ? e.helpButtons[o].type
                : "Button" +
                  " {text:\'" +
                  e.helpButtons[o].name +
                  "\', id: \'" +
                  o +
                  "\', alignment: [\'left\',\'center\']}");
        }
        r +=
          "\r\t\t\t\t\tokBtn: Button {text:\'" +
          Be +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \r\t\t\t\t} \r\t\t}";
        t.grp = t.add(r);
        t.grp.helpGrp.txt.preferredSize = [800, 500];
        var s = new Date().getYear() + 1900;
        t.grp.infoGrp.txt.text =
          Z + " v" + Q + "\n\xa9" + s + " " + e.scriptAuthor + "\n\n";
        t.grp.infoGrp.hdr.text = W();
        t.grp.helpGrp.txt.text = e.helpText;
        t.grp.prefsGrp.doUpdateCheck.value = me;
        t.grp.prefsGrp.doUpdateCheck.onChange = function () {
          l(this.value);
        };
        for (var o = 0; o < Math.min(ze, e.helpButtons.length); o += 1) {
          e.helpButtons[o].hasOwnProperty("name") &&
            (e.helpButtons[o].hasOwnProperty("url")
              ? (t.grp.okGrp["btn" + o].onClick = function () {
                  O(e.helpButtons[this.id].url);
                })
              : e.helpButtons[o].hasOwnProperty("onClickFunction") &&
                (t.grp.okGrp["btn" + o].onClick =
                  e.helpButtons[o].onClickFunction),
            e.helpButtons[o].hasOwnProperty("btnValue") &&
              (t.grp.okGrp["btn" + o].value = e.helpButtons[o].btnValue));
        }
        t.grp.infoGrp.removeLic.visible = !b(wt.result);
        t.grp.infoGrp.removeLic.onClick = function () {
          K() || ((t.grp.infoGrp.hdr.text = W()), (this.visible = false));
        };
        t.grp.okGrp.supportBtn.onClick = function () {
          a({});
          t.close();
        };
        t.grp.okGrp.okBtn.onClick = function () {
          t.close();
        };
        -1 != $.os.indexOf("Windows") &&
          parseFloat(app.version) >= 12 &&
          parseFloat(app.version) < 14 &&
          (t.maximumSize = [840, 670]);
        t.layout.layout(true);
        t.layout.resize();
        t.onResizing = t.onResize = function () {
          this.layout.resize();
        };
        t.show();
      }
    }
    function i(e) {
      return "Button" === e || "Checkbox" === e;
    }
    function a(e) {
      n = r = "";
      t = "&subject=";
      void 0 != e &&
        void 0 !== e &&
        (e.hasOwnProperty("subject") && (t += File.encode(e.subject)),
        e.hasOwnProperty("message") && (n = File.encode(e.message)),
        e.hasOwnProperty("diagnostic") &&
          (r = File.encode(e.diagnostic + "\n--\n")));
      var i =
        true === de ? ee + t + "&message=" : t.replace(/\&/, "?") + "&body=";
      var a =
        "" != i
          ? n +
            "%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A-------%0D%0A" +
            r +
            o(true)
          : "";
      ue.toString().match(/@/) &&
        !ue.toString().match(/^mailto:/) &&
        (ue = "mailto:" + ue);
      O(ue + i + a);
    }
    function o(e) {
      var t = $.os.toString();
      var n =
        BridgeTalk.getDisplayName(BridgeTalk.appName) +
        " (" +
        app.version +
        ") - " +
        $.locale.toString();
      var r = Z + " v" + Q;
      var i = "Lic. fw v" + Y;
      return e
        ? File.encode(r) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(n) +
            "%0D%0A" +
            File.encode(i)
        : r + "\n" + t + "\n" + n + "\n" + i;
    }
    function l(e) {
      V(it, ht, (me = e));
    }
    function s(e) {
      var t = new Window("dialog", qe, void 0, { resizeable: true });
      if (null != t) {
        var n =
          "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   hdrGrp: Group { \r\t\t\t\t   alignment: [\'fill\',\'fill\'], \r\t\t\t\t   alignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   orientation: \'column\', \r                        hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
        e.hasOwnProperty("header") &&
          (n +=
            "   infoGrp: Panel { \r                           alignment: [\'fill\',\'fill\'], \r                           alignChildren: [\'fill\',\'fill\'], \r                           orientation: \'column\', \r                              info: StaticText {properties:{multiline:true}}, \r                              } ");
        n +=
          "} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\t\tskipVersionBtn: Button {text:\'" +
          Ke +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r                           remindMeLaterBtn: Button {text:\'" +
          _e +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tdownloadBtn: Button {text:\'" +
          $e +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
        t.grp = t.add(n);
        var r = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
        t.grp.hdrGrp.hdr.graphics.font = r;
        t.grp.hdrGrp.hdr.text = We.replace(/%v/, e.version);
        e.hasOwnProperty("header") &&
          (t.grp.hdrGrp.infoGrp.info.text = e.header + "\n\n" + e.detail);
        t.grp.okGrp.skipVersionBtn.onClick = function () {
          V(it, ct, Q);
          V(it, dt, new Date().toString());
          V(it, ft, "skip");
          V(it, ut, e.version);
          t.close(false);
        };
        t.grp.okGrp.remindMeLaterBtn.onClick = function () {
          var n = new Date();
          n = new Date(n.setDate(n.getDate() + ve));
          V(it, ct, Q);
          V(it, dt, new Date().toString());
          V(it, pt, n.toString());
          V(it, ut, e.version);
          t.close(false);
        };
        t.grp.okGrp.downloadBtn.onClick = function () {
          O(fe);
          t.close(true);
        };
        t.layout.layout(true);
        t.layout.resize();
        t.onResizing = t.onResize = function () {
          this.layout.resize();
        };
        e.hasOwnProperty("header") &&
          ((t.grp.hdrGrp.infoGrp.size.height = Math.min(
            t.grp.hdrGrp.infoGrp.size.height,
            300,
          )),
          t.layout.layout(true),
          t.layout.resize());
        t.show();
      }
    }
    function c() {
      if (me) {
        M(it, ct) && (t = I(it, ct));
        M(it, ut) && (lastServerVersionChecked = I(it, ut));
        M(it, dt) && (n = new Date(I(it, dt)));
        M(it, ft) && (i = I(it, ft));
        M(it, pt) && (r = new Date(I(it, pt)));
        M(it, st) && (e = I(it, st));
        var a = new Date();
        if (!(void 0 != e && void 0 != r && a < r)) {
          var o = u(ee, true);
          var l = null != o && o.hasOwnProperty("version") ? o.version : Q;
          if (
            void 0 == i ||
            "skip" != i ||
            void 0 == lastServerVersionChecked ||
            lastServerVersionChecked != l
          ) {
            V(it, st, 1);
            var c = new Date();
            c = new Date(c.setDate(c.getDate() + be));
            V(it, ct, Q);
            V(it, dt, new Date().toString());
            V(it, pt, c.toString());
            null != l &&
              j(l, Q) > 0 &&
              ((void 0 != t && void 0 != n && void 0 != r) || s(o),
              void 0 != t && j(l, t) > 0 && s(o),
              void 0 != t && 0 == j(l, t) && a >= r && s(o));
          }
        }
      }
    }
    function u(e, t) {
      function n(r) {
        var r = {};
        var i = d(
          "notify.aescripts.com",
          "versioncheck2.php?json=1&plain=1&sku=" + e + t ? "&latest=1" : "",
        );
        if (null != i && "" != i) {
          if (-1 == (i = i.substr(i.indexOf("{") - 1)).lastIndexOf("}")) {
            return ((t = false), (r = n(r)));
          }
          i = i.substr(0, i.lastIndexOf("}") + 1);
          try {
            i = q(i, "parse");
          } catch (e) {
            return null;
          }
          return "ok" == i.status
            ? (r = t
                ? {
                    date: i.latest.release_date,
                    detail: i.latest.detail,
                    header: Je.replace(/%a/, i.version)
                      .replace(/%b/, "")
                      .replace(/%c/, i.latest.release_date),
                    version: i.version,
                  }
                : { version: i.version })
            : null;
        }
        return null;
      }
      return n(e);
    }
    function d(e, t) {
      var n = new Socket();
      if (
        ((n.encoding = "binary"), (n.timeout = 2), n.open(e + ":80", "UTF-8"))
      ) {
        n.write(
          "GET /" + t + " HTTP/1.1\nHost: " + e + "\n\nConnection: close\n\n",
        );
        var r = n.read(2000);
        return (n.close(), void 0 != r ? (r = r.toString()) : null);
      }
      return null;
    }
    function p(e) {
      return f(
        "result:0\ne:0\ntld:0\nlic:SUL\nfirst:Made with \u2665\nlast:By ZDCRACKER\nnum:1",
      );
      if (e == "") {
        var file = File(Folder.userData.fullName + "/" + ne + "_ZD.lic");
        if (file.exists) {
          file.open("r");
          var t = BD(file.read());
          file.close();
          return f(t);
        } else {
          return f("result:-1");
        }
      }
      if (getVerifCode3(e) == "1") {
        var reArr = e.split("*");
        logInfo(
          BE(
            "result:0\ne:0\ntld:0\nlic:SUL\nfirst:" +
              reArr[1] +
              "\nlast:" +
              reArr[2] +
              "\nnum:1",
          ),
        );
        return f(
          "result:0\ne:0\ntld:0\nlic:SUL\nfirst:" +
            reArr[1] +
            "\nlast:" +
            reArr[2] +
            "\nnum:1",
        );
      } else {
        return f("result:-1");
      }
    }
    function logInfo(Txt) {
      var file = new File(Folder.userData.fullName + "/" + ne + "_ZD.lic");
      file.open("e", "TEXT", "????");
      file.seek(0, 2);
      $.os.search(/windows/i) != -1
        ? (file.lineFeed = "windows")
        : (file.lineFeed = "macintosh");
      file.writeln(Txt);
      file.close();
      file.hidden = true;
    }
    function f(e) {
      try {
        t = h(e);
      } catch (e) {
        (t = {}).result = -101;
        t.e = e.toString();
      }
      return t;
    }
    function h(e) {
      for (var t = e.match(/[^\r\n]+/g), n = {}, r = 0; r < t.length; r++) {
        var i = t[r].split(":");
        if (i.length >= 2) {
          var a = i[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          var o = L(i[1]);
          isNaN(o) || (o = parseFloat(o));
          n[a] = o;
        }
      }
      return (void 0 === n.result && (n.result = 102), g(n), v(n), n);
    }
    function g(e) {
      if (-7 !== e.result) {
      } else if (0 == ae) {
        e.result = -106;
      } else {
        var t = E("d", e);
        if (void 0 === t) {
          return void (e.result = -103);
        }
        var n = ae - t;
        n > 0
          ? ((e.result = 100), (e.tdl = n), (e.license = D("VFJJQUw=")))
          : ((e.result = -100), (e.tdl = 0));
      }
    }
    function v(e) {
      var t = e.result;
      var n = E("li", e).match(/^B/);
      oe && (b(t) || -106 == t || -7 == t)
        ? (e.result = -107)
        : !oe && n && (e.result = -105);
    }
    function m(e) {
      return e >= 0;
    }
    function b(e) {
      return 100 == e || -100 == e;
    }
    function z(e) {
      try {
        return E("L", e).match(/^O/);
      } catch (e) {}
    }
    function L(e) {
      return (
        "\'" == (e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))[0] &&
          "\'" == e[e.length - 1] &&
          (e = e.substring(1, e.length - 1)),
        e
      );
    }
    function y(e) {
      return rt[ye].hasOwnProperty(e.toString()) ? e : "unknown";
    }
    function k(e) {
      for (var t = 0, n = 0; n < e.length; n++) {
        t += e.charCodeAt(n);
      }
      return t;
    }
    function S(e) {
      var t = e.split("*");
      if (4 == t.length) {
        var n = t[3].replace(/^[0-9]+/, "");
        var r = t[3].match(/^[0-9]+/, "");
        var i = r[0].substr(0, 2);
        var a = r[0].substr(r[0].length - 2);
        var o = i[0] + t[0] + i[1] + t[1] + a[0] + t[2] + a[1] + n;
        var l = r[0].substring(2, r[0].length - 2);
        return k(o) * X == l ? "1" : "0";
      }
      return (e != U("bad") && alert(Me), "0");
    }
    function w(e) {
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
    function x(e) {
      var t = e.split("*");
      return (
        e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/) &&
        4 == t.length
      );
    }
    function C(e, n, r) {
      if (
        ((n = void 0 == n ? "" : n.replace(/^\s\s*/, "").replace(/\s\s*$/, "")),
        (myLicense = false),
        e && ((regUI = t()), (myRegPrompt = regUI.show()), !myRegPrompt))
      ) {
        return false;
      }
      var i = false;
      "@remote" == (n = void 0 == kt ? n : kt).toLowerCase() &&
        ((n = ne + n), (i = true));
      var a = n.split("*");
      if (!((ie && "trial" == n.toLowerCase()) || i || x(n))) {
        if (n.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
          var o = confirm(ke);
          return (A() && o && O(he + "?serial=" + n), myLicense);
        }
        return (
          alert(
            De + "\n" + oe
              ? Me.replace(new RegExp(D("U1VM"), "g"), D("QlRB"))
              : Me + "\n\n" + Ue,
          ),
          V(it, at, U("bad")),
          V(it, ot, Q),
          V(it, lt, Y),
          C(true),
          myLicense
        );
      }
      if (("trial" != n.toLowerCase() || i) && !i) {
        if (null != a[0] && a[0].toUpperCase() != "ZDGALAXY") {
          return (alert(je + "\n" + Ue), C(e), false);
        }
        var l = a[3].match(/[A-Z]{3}[0-9]+$/);
        if (null != l) {
          if (l[0].match(D("QlRB")) && !oe) {
            return (alert(we), V(it, at, U("bad")), C(true), false);
          }
          myLicense = true;
        }
      }
      if (((wt = 2 == Le ? p(n) : S(n)), !m(wt.result))) {
        return (
          e || (e = true),
          alert(
            rt[ye][y(wt.result)].title + "\n" + rt[ye][y(wt.result)].detail,
          ),
          C(e),
          myLicense
        );
      }
      if (((St = ie && "trial" == n.toLowerCase() && b(wt.result)), e && !St)) {
        var s = parseInt(E("n", wt), 10);
        n.match(/@remote/i) ||
          alert(
            Ce.replace("%u", s) + (s > 1) && "de" != ye
              ? "s"
              : "" + oe
                ? ""
                : "\n" + Pe,
          );
      }
      return ((myLicense = true), myLicense);
    }
    function P() {
      var e = M(it, at) ? D(I(it, at)) : "";
      return x(e) ? e : "";
    }
    function D(e) {
      var l = "";
      var s = 0;
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      for (
        var c =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        s < e.length;
      ) {
        t =
          (c.indexOf(e.charAt(s++)) << 2) |
          ((i = c.indexOf(e.charAt(s++))) >> 4);
        n = ((15 & i) << 4) | ((a = c.indexOf(e.charAt(s++))) >> 2);
        r = ((3 & a) << 6) | (o = c.indexOf(e.charAt(s++)));
        l += String.fromCharCode(t);
        64 != a && (l += String.fromCharCode(n));
        64 != o && (l += String.fromCharCode(r));
      }
      return l;
    }
    function U(e) {
      for (
        t,
          n,
          r,
          i,
          a,
          o,
          l,
          s = "",
          c = 0,
          u =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        c < e.length;
      ) {
        i = (t = e.charCodeAt(c++)) >> 2;
        a = ((3 & t) << 4) | ((n = e.charCodeAt(c++)) >> 4);
        o = ((15 & n) << 2) | ((r = e.charCodeAt(c++)) >> 6);
        l = 63 & r;
        isNaN(n) ? (o = l = 64) : isNaN(r) && (l = 64);
        s = s + u.charAt(i) + u.charAt(a) + u.charAt(o) + u.charAt(l);
      }
      return s;
    }
    function A() {
      return (
        1 ==
        app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        )
      );
    }
    function O(e) {
      if (
        ((e = e.toString()).match(/@/) ||
          e.match(/^https?:\/\//) ||
          (e = "http://" + e.replace(/^(http)?s?:?\/?\/?/, "")),
        F() || G())
      ) {
        Folder.commonFiles.parent.fsName;
        N(
          -1 != $.os.indexOf("Windows")
            ? 'cmd /c "start ' + (e = e.replace(/&/g, "^&")) + '"'
            : 'open "' + e + '"',
        );
      } else {
        R(
          File(Folder.temp.fsName + "/openUrl.url"),
          "[InternetShortcut]\rURL=" + e + "\r",
          "UTF-8",
          true,
        ).execute();
      }
    }
    function B(e) {
      if (0 == E("r", wt)) {
        if (
          ((i = E("f", wt)),
          (a = E("la", wt)),
          (o = E("n", wt)),
          (l = E("li", wt)),
          e > 0)
        ) {
          return i + "\'" + a + "\'" + E("s", wt) + l + o;
        }
        n = i + a.toString().match(/^@/) ? "" : " " + a + " ";
        r = l;
      } else {
        n = "";
      }
      var c = xe.replace("%u", o) + (o > 1) && "de" != ye ? "s" : "";
      switch (r) {
        case D("U1VM"):
          t = " - " + He + " " + c;
          break;
        case D("QlRB"):
          t = " - " + Xe + " " + c;
          break;
        case D("RURV"):
          t = " - " + et + " " + c;
          break;
        case D("RkxU"):
          t = " - " + tt + " " + c;
          break;
        default:
          t = "Made with \u2665 By ZDCRACKER";
      }
      return "" != n ? Ve + n + t : t;
    }
    function E(e, t) {
      for (var n in t) {
        if (t.hasOwnProperty(n) && n.toString().match(new RegExp("^" + e))) {
          return t[n];
        }
      }
      return "";
    }
    function F() {
      return BridgeTalk.appName == D("YWZ0ZXJlZmZlY3Rz");
    }
    function G() {
      return BridgeTalk.appName == D("cGhvdG9zaG9w");
    }
    function BD(input) {
      var output = "";
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var key =
        "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba9876543210+/";
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
    function BE(input) {
      var output = "";
      var i = 0;
      var key =
        "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba9876543210+/";
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
    function T(e) {
      if (e.exists && e.open("r")) {
        var t = e.read();
        return (e.close(), t);
      }
      return null;
    }
    function R(e, t, n, r) {
      return (
        (e.exists && !r) ||
          (e.exists && e.remove(),
          ((e =
            -1 != $.os.indexOf("Win")
              ? new File(e.fsName)
              : new File(e.absoluteURI)).encoding = n),
          e.open("w"),
          e.write(t),
          e.close(),
          (e.hidden = true),
          -1 != $.os.indexOf("Mac") &&
            N(D("Y2htb2QgNzU3IA==") + e.absoluteURI)),
        e
      );
    }
    function N(e) {
      if (F()) {
        return system.callSystem(e);
      }
      if (G()) {
        var t =
          -1 != $.os.indexOf("Win")
            ? Folder.temp.fsName
            : Folder.temp.absoluteURI +
              "/" +
              Math.round(Math.random() * 71827 * new Date().getTime());
        return (app.system(e + " > " + t), T(File(t)));
      }
      return "";
    }
    function I(e, t) {
      return F() && "settings" != J
        ? app.settings.getSetting(e, t)
        : q(T(File(Lt + yt + File.encode(e))), "parse")[t];
    }
    function M(e, t) {
      if (F() && "settings" != J) {
        return app.settings.haveSetting(e, t);
      }
      var n = T(File(Lt + yt + File.encode(e)));
      return null != n && t in q(n.toString(), "parse");
    }
    function V(e, t, n) {
      if (F() && "settings" != J) {
        app.settings.saveSetting(e, t, n);
        app.preferences.saveToDisk();
      } else {
        var r = {};
        var i = File(Lt + yt + File.encode(e));
        if (i.exists) {
          var a = T(i);
          null != a && (r = q(a.toString(), "parse"));
        }
        r[t] = n;
        R(
          File(Lt + yt + File.encode(e)),
          q(r, "stringify", "\t"),
          "UTF-8",
          true,
        );
      }
    }
    function j(e, t) {
      if (e === t) {
        return 0;
      }
      for (
        var n = e.toString().split("."),
          r = t.toString().split("."),
          i = Math.min(n.length, r.length),
          a = 0;
        a < i;
        a++
      ) {
        if (parseInt(n[a]) > parseInt(r[a])) {
          return 1;
        }
        if (parseInt(n[a]) < parseInt(r[a])) {
          return -1;
        }
      }
      return n.length > r.length ? 1 : n.length < r.length ? -1 : 0;
    }
    function string_encode3(str) {
      var encStr = 0;
      for (var i = 0; i < str.length; i += 1) {
        encStr = encStr + str.charCodeAt(i);
      }
      return encStr;
    }
    function q(e, t, n) {
      "object" != typeof JSON && (JSON = {});
      (function () {
        function e(e) {
          return e < 10 ? "0" + e : e;
        }
        function t() {
          return this.valueOf();
        }
        function n(e) {
          return (
            (i.lastIndex = 0),
            i.test(e)
              ? '"' +
                e.replace(i, function (e) {
                  var t = l[e];
                  return "string" == typeof t
                    ? t
                    : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
              : '"' + e + '"'
          );
        }
        function r(e, t) {
          var p = a;
          var f = t[e];
          switch (
            (f &&
              "object" == typeof f &&
              "function" == typeof f.toJSON &&
              (f = f.toJSON(e)),
            "function" == typeof s && (f = s.call(t, e, f)),
            typeof f)
          ) {
            case "string":
              return n(f);
            case "number":
              return isFinite(f) ? String(f) : "null";
            case "boolean":
            case "null":
              return String(f);
            case "object":
              if (!f) {
                return "null";
              }
              if (
                ((a += o),
                (d = []),
                "[object Array]" === Object.prototype.toString.apply(f))
              ) {
                for (u = f.length, i = 0; i < u; i += 1) {
                  d[i] = r(i, f) || "null";
                }
                return (
                  (c =
                    0 === d.length
                      ? "[]"
                      : a
                        ? "[\n" + a + d.join(",\n" + a) + "\n" + p + "]"
                        : "[" + d.join(",") + "]"),
                  (a = p),
                  c
                );
              }
              if (s && "object" == typeof s) {
                for (u = s.length, i = 0; i < u; i += 1) {
                  "string" == typeof s[i] &&
                    (c = r((l = s[i]), f)) &&
                    d.push(n(l) + a ? ": " : ":" + c);
                }
              } else {
                for (var l in f) {
                  Object.prototype.hasOwnProperty.call(f, l) &&
                    (c = r(l, f)) &&
                    d.push(n(l) + a ? ": " : ":" + c);
                }
              }
              return (
                (c =
                  0 === d.length
                    ? "{}"
                    : a
                      ? "{\n" + a + d.join(",\n" + a) + "\n" + p + "}"
                      : "{" + d.join(",") + "}"),
                (a = p),
                c
              );
          }
        }
        ("use strict");
        var i =
          /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        "function" != typeof Date.prototype.toJSON &&
          ((Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
              ? this.getUTCFullYear() +
                  "-" +
                  e(this.getUTCMonth() + 1) +
                  "-" +
                  e(this.getUTCDate()) +
                  "T" +
                  e(this.getUTCHours()) +
                  ":" +
                  e(this.getUTCMinutes()) +
                  ":" +
                  e(this.getUTCSeconds()) +
                  "Z"
              : null;
          }),
          (Boolean.prototype.toJSON = t),
          (Number.prototype.toJSON = t),
          (String.prototype.toJSON = t));
        "function" != typeof JSON.stringify &&
          ((l = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
          }),
          (JSON.stringify = function (e, t, n) {
            if (((a = ""), (o = ""), "number" == typeof n)) {
              for (var i = 0; i < n; i += 1) {
                o += " ";
              }
            } else {
              "string" == typeof n && (o = n);
            }
            if (
              ((s = t),
              t &&
                "function" != typeof t &&
                ("object" != typeof t || "number" != typeof t.length))
            ) {
              throw new Error("JSON.stringify");
            }
            return r("", { "": e });
          }));
      })();
      var r = (function () {
        function e(e, t, n) {
          return t ? i[t] : String.fromCharCode(parseInt(n, 16));
        }
        var t =
          '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
        t = '(?:"' + t + '*")';
        var n = new RegExp(
          "(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|" +
            t +
            ")",
          "g",
        );
        var r = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
        var i = {
          '"': '"',
          "/": "/",
          "\\": "\\",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "\t",
        };
        var a = new String("");
        var o = Object.hasOwnProperty;
        return function (t, i) {
          var s = (t = t.match(n))[0];
          var c = false;
          "{" === s ? (l = {}) : "[" === s ? (l = []) : ((l = []), (c = true));
          for (u, d = [l], p = 1 - c, f = t.length; p < f; ++p) {
            switch ((s = t[p]).charCodeAt(0)) {
              default:
                h = d[0][u || h.length] = s;
                u = void 0;
                break;
              case 34:
                if (
                  (-1 !== (s = s.substring(1, s.length - 1)).indexOf("\\") &&
                    (s = s.replace(r, e)),
                  (h = d[0]),
                  !u)
                ) {
                  if (!(h instanceof Array)) {
                    u = s || a;
                    break;
                  }
                  u = h.length;
                }
                h[u] = s;
                u = void 0;
                break;
              case 91:
                h = d[0];
                d.unshift((h[u || h.length] = []));
                u = void 0;
                break;
              case 93:
                d.shift();
                break;
              case 102:
                h = d[0][u || h.length] = false;
                u = void 0;
                break;
              case 110:
                h = d[0][u || h.length] = null;
                u = void 0;
                break;
              case 116:
                h = d[0][u || h.length] = true;
                u = void 0;
                break;
              case 123:
                h = d[0];
                d.unshift((h[u || h.length] = {}));
                u = void 0;
                break;
              case 125:
                d.shift();
            }
          }
          if (c) {
            if (1 !== d.length) {
              throw new Error();
            }
            l = l[0];
          } else {
            if (d.length) {
              throw new Error();
            }
          }
          if (i) {
            var g = function (e, t) {
              var n = e[t];
              if (n && "object" == typeof n) {
                var r = null;
                for (var a in n) {
                  if (o.call(n, a) && n !== e) {
                    var l = g(n, a);
                    void 0 !== l ? (n[a] = l) : (r || (r = []), r.push(a));
                  }
                }
                if (r) {
                  for (a = r.length; --a >= 0; ) {
                    delete n[r[a]];
                  }
                }
              }
              return i.call(e, t, n);
            };
            l = g({ "": l }, "");
          }
          return l;
        };
      })();
      switch (t) {
        case "parse":
          return r(e);
        case "stringify":
          return JSON.stringify(e, void 0, n);
      }
    }
    function delLic() {
      var lFile = File(Folder.userData.fullName + "/" + ne + "_ZD.lic");
      return lFile.remove();
    }
    function W(e) {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        B(e)
      );
    }
    function getVerifCode3(lic) {
      var myRegArray = lic.split("*");
      if (myRegArray.length == 4) {
        var myLcns = myRegArray[3].replace(/^[0-9]+/, "");
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
          myLcns;
        var tempKey = code[0].substring(2, code[0].length - 2);
        var nameEncode = string_encode3(name);
        var key = nameEncode * e.privateNumber;
        if (key == tempKey) {
          return "1";
        } else {
          return "0";
        }
      } else {
        return "0";
      }
    }
    function K() {
      (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p(""));
      var e = z(wt) ? ne + "@REMOTE" : "";
      delLic();
      return (
        (wt = p("-" + e)),
        (theLicense = false),
        alert(Z + ": " + Qe),
        z(wt) || (V(it, at, U("bad")), V(it, ot, Q), V(it, lt, Y)),
        theLicense
      );
    }
    function _(e) {
      if (!F() || A() || (alert(Ne), app.executeCommand(2359), A())) {
        if (oe && n(se, le)) {
          "l" == e && alert(Se);
        } else {
          if ("l" == e || "c" == e || "r" == e) {
            var i = false;
            if (("l" == e && me && c(), 2 == Le)) {
              if ("r" == e) {
                r = K();
              } else {
                if (((wt = p("")), m(wt.result) && !b(wt.result))) {
                  return true;
                }
                "" == (t = P()) &&
                  ((i = true), (t = z(wt) ? "@REMOTE" : "trial"));
                r = C(i, t, X);
              }
            } else {
              M(it, at)
                ? ((t = I(it, at)),
                  (i = !(
                    "c" == e ||
                    !(("bad" == t || "bad" == D(t) || ie) && "trial" == D(t))
                  )))
                : "c" == e
                  ? (V(it, at, U((t = ie ? "trial" : ""))),
                    V(it, ot, Q),
                    V(it, lt, Y),
                    (i = false))
                  : (i = true);
              r = C(i, t, X);
            }
            return r;
          }
        }
      }
    }
    function logInfoDev(Txt) {
      var file = new File("~/Desktop/ScriptLog.txt");
      file.open("e", "TEXT", "????");
      file.seek(0, 2);
      $.os.search(/windows/i) != -1
        ? (file.lineFeed = "windows")
        : (file.lineFeed = "macintosh");
      file.writeln(Txt);
      file.close();
    }
    var sku = e.productSKU.toString().split("-");
    var Y = "3.0.5";
    void 0 == e.scriptName &&
      alert("scriptName variable missing in settings object");
    var Z = e.scriptName;
    void 0 == e.scriptVersion &&
      alert("scriptVersion variable missing in settings object");
    var Q = e.scriptVersion;
    void 0 == e.scriptURL &&
      alert("scriptURL variable missing in settings object");
    var H = e.scriptURL;
    void 0 == e.privateNumber &&
      alert("privateNumber variable missing in settings object");
    var X = e.privateNumber;
    void 0 == e.productSKU &&
      alert("productSKU variable missing in settings object");
    var ee = e.productSKU;
    var te = ee.toString().split("-");
    if (null == te || 2 != te.length) {
      return (
        alert(
          "Product SKU incorrectly entered in settings. Should looks like this: XXXX-SUL",
        ),
        false
      );
    }
    var ne = te[0];
    var re = e.hasOwnProperty("betaSupportEmail") ? e.betaSupportEmail : "";
    var ie = e.hasOwnProperty("offerTriaal") && e.offerTrial;
    var ae = e.hasOwnProperty("trialLengthDays") ? e.trialLengthDays : 7;
    var oe = !!e.hasOwnProperty("offerBeta") && e.offerBeta;
    if (oe) {
      void 0 == e.betaStartDate &&
        alert("betaStartDate variable missing in settings object");
      var le = e.betaStartDate;
      void 0 == e.betaExpirationDate &&
        alert("betaExpirationDate variable missing in settings object");
      var se = e.betaExpirationDate;
    }
    var ce =
      e.hasOwnProperty("externalSupportURL") && "" != e.externalSupportURL
        ? e.externalSupportURL
        : "http://aescripts.com/contact";
    oe && "" != re && (ce = re);
    var ue =
      e.hasOwnProperty("externalSupportURL") && "" != e.externalSupportURL
        ? e.externalSupportURL
        : "https://aescripts.com/contact";
    var de = "https://aescripts.com/contact" === ue;
    de && (ue = ue.replace(/\/*/, "") + "/?direct=1&sku=");
    var pe = "https://aescripts.com/downloadable/customer/products";
    var fe =
      e.hasOwnProperty("retrieveLicenseURL") && "" != e.retrieveLicenseURL
        ? e.retrieveLicenseURL
        : pe;
    var he = "https://license.aescripts.com/exchange";
    var ge =
      !!e.hasOwnProperty("useLegacyPrefsHeader") && e.useLegacyPrefsHeader;
    var ve = 7;
    var me = true;
    var be = 7;
    var ze = 3;
    var Le = 2;
    if ($.os.indexOf("Mac") != -1) {
      mx = __BLOB__BLOB_000327__;
    } else {
      wx = __BLOB__BLOB_000328__;
    }
    $.locale = F() ? app.isoLanguage : $.locale;
    var ye = $.locale.split("_")[0];
    ("fr" == ye && "de" == ye && "es" == ye) || (ye = "en");
    var ke = localize({
      de:
        "Du hast eine tempor\xe4re Seriennummer eingegeben, die gegen eine permanente Lizenz eingetauscht werden muss.\n\nSobald Du eine permanente Lizenz erhalten hast, kannst Du sie verwenden um" +
        Z +
        " zu registrieren.  Der Austausch ist schnell und unkompliziert, gehe einfach zu:\n\n" +
        he +
        "\n\nWillst Du jetzt dorthin gehen?",
      en:
        "You entered a temporary serial number that needs to be exchanged for a permanent license.\n\nOnce you obtain your permanent license you can use it to register " +
        Z +
        ".  It is quick and easy to exchange it, simply go to:\n\n" +
        he +
        "\n\nWould you like to go there now?",
      es:
        "Ha introducido un n\xfamero de serie provisional que necesita ser sustituido por una licencia permanente.\n\nUna vez obtenga una licencia permamente puede usarla para registrar " +
        Z +
        ". Reemplazarla es r\xe1pido y sencillo, simplemente vaya a:\n\n" +
        he +
        "\n\n\xbfQuiere ir all\xed ahora?",
      fr:
        "Vous avez entr\xe9 un num\xe9ro de s\xe9rie temporaire devant \xeatre \xe9chang\xe9 contre une licence permanente.\n\nUne fois votre licence permanente acquise, vous pouvez l\'utiliser pour vous enregistrer " +
        Z +
        ".  Le changement est rapide et facile,  allez simplement \xe0:\n\n" +
        he +
        "\n\nVoulez-vous y aller maintenant?",
    });
    var Se =
      (localize({
        de:
          "Die Testversion des Skriptes ist leider abgelaufen.\nDu kannst unter " +
          H +
          " eine Lizenz erwerben.\n\nM\xf6chtest Du jetzt dorthin gehen?",
        en:
          "Sorry, this trial version of the script has expired. \nYou can purchase a license at " +
          H +
          "\n\nWould you like to go there now?",
        es:
          "Lo siento, esta versi\xf3n de prueba del script ha expirado.\nPuede obtener una licencia en" +
          H +
          "\n\n\xbfQuiere ir all\xed ahora?",
        fr:
          "D\xe9sol\xe9, la p\xe9riode d\'essai du script a expir\xe9.\nPour acheter une licence, veuillez vous rendre sur la page " +
          H +
          "\n\nVoulez-vous ouvrir cette page maintenant ?",
      }),
      localize({
        de: "Die Betaversion des Skriptes ist leider abgelaufen",
        en: "Sorry, this beta version of the script has expired",
        es: "Lo siento est\xe1 versi\xf3n beta del script ha expirado",
        fr: "D\xe9sol\xe9, la p\xe9riode beta du script a expir\xe9",
      }));
    var we = localize({
      de:
        "Beta Lizenzcode erkannt f\xfcr " +
        Z +
        "\nBeta Lizenzen k\xf6nnen nur f\xfcr Betaversionen verwendet werden. Bitte verwende eine normale Lizenz f\xfcr diese Version.",
      en:
        "Beta license code detected for " +
        Z +
        "\nBeta license codes can only be used on beta versions, please obtain a normal license to use this version.",
      es:
        "Licencia beta detectada para " +
        Z +
        "\nLas licencias beta s\xf3lo pueden ser usadas con versiones beta, por favor obtenga una licencia normal para usar esta versi\xf3n.",
      fr:
        "Licence beta d\xe9tect\xe9e pour " +
        Z +
        "\nLes codes pour licence beta ne peuvent \xeatre utilis\xe9s que pour les versions beta, merci de demander une licence r\xe9guli\xe8re pour utiliser cette version.",
    });
    var xe =
      (localize({
        de: "F\xfcr diese Betaversion wird eine Lizenz ben\xf6tigt.\nBitte kontaktiere den Autor f\xfcr eine Betatester-Lizenz.",
        en: "A license is required to run this beta version\nPlease contact the author for a beta testing license.",
        es: "Es necesaria una licencia para utilizar esta versi\xf3n beta.\nPor favor, p\xf3ngase en contacto con el autor para obtener una licencia beta.",
        fr: "Une licence est requise pour ex\xe9cuter cette version beta\nMerci de contacter l\'auteur pour une licence beta de test.",
      }),
      localize({
        de: "f\xfcr %u Nutzer",
        en: "for %u user",
        es: "para %u usuario",
        fr: "pour %u utilisateur",
      }));
    var Ce = localize({
      de: "Registrierung erfolgreich " + xe,
      en: "Registration successful " + xe,
      es: "Registro completado " + xe,
      fr: "Enregistrement r\xe9ussi " + xe,
    });
    var Pe = localize({
      de: "Danke f\xfcr den Kauf von " + Z,
      en: "Thank you for purchasing " + Z,
      es: "Gracias por comprar " + Z,
      fr: "Merci d\'avoir achet\xe9 " + Z,
    });
    var De = localize({
      de: "Entschuldigung, der Lizenzcode ist nicht g\xfcltig.",
      en: "Sorry, the license code is not valid",
      es: "Lo siento, la licencia no es v\xe1lida",
      fr: "D\xe9sol\xe9, ce num\xe9ro de licence n\'est pas valide.",
    });
    var Ue =
      (localize({
        de: "Eine Firewall oder ein Antivirus-Programm blockiert den Lizenz-Prozess. Bitte deaktiviere das Antivirus-Programm oder konfiguriere das System so, dass die Lizenz verifiziert werden kann.",
        en: "A firewall or virus protection software is blocking the licensing process.  Please disable this or configure it to allow this process so that the license can be verified.",
        es: 'Un software de "firewall" o de protecci\xf3n antivirus est\xe1 bloqueando el proceso de concesi\xf3n de licencias. Desactivela o configurela para permitir este proceso para que la licencia puede ser verificada.',
        fr: "Un logiciel pare-feu ou un logiciel antivirus bloque le processus de v\xe9rification de licence. Veuillez le d\xe9sactiver ou le configurer pour permettre \xe0 ce processus de v\xe9rifier la licence.",
      }),
      localize({
        de: "Wenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + ce,
        en: "If you require assistance please contact " + ce,
        es: "Si necesita ayuda, por favor contacte " + ce,
        fr: "Si vous avez besoin d\'aide, merci de contacter " + ce,
      }));
    var Ae =
      (localize({
        de:
          "Entschuldigung, irgendetwas ist mit dem " +
          Z +
          " Lizenzcode passiert. Bitte gebe ihn erneut ein.\n\n" +
          Ue,
        en:
          "Sorry, something must have happened to the " +
          Z +
          " license code.  Please re-enter it at the prompt.\n" +
          Ue,
        es:
          "Lo siento, algo ha ocurrido con la licencia de " +
          Z +
          ". Por favor, vuelva a introducirla en la casilla.\n" +
          Ue,
        fr:
          "D\xe9sol\xe9, il y a eu un probl\xe8me avec le num\xe9ro de licence pour " +
          Z +
          ". Merci de bien vouloir le saisir \xe0 nouveau.n\n" +
          Ue,
      }),
      localize({
        de: "Danke, dass Du " + Z + " ausprobierst!",
        en: "Thanks for trying " + Z + "!",
        es: "\xa1Gracias por probar " + Z + "!",
        fr: "Merci d\'avoir essay\xe9 " + Z + "!",
      }),
      localize({
        de: "Testversion - noch %E Tage g\xfcltig",
        en: "Trial version - %E days left",
        es: "Versi\xf3n de prueba - faltan %E d\xedas",
        fr: "Version d\'\xe9valuation - %E jour(s) restant",
      }));
    var Oe =
      (localize({
        de: "%E Programmstarts \xfcbrig f\xfcr die Testversion",
        en: "%E launches left in the trial",
        es: "%E usos restantes de la versi\xf3n de prueba",
        fr: "Il vous reste %E essais",
      }),
      localize({
        de: "Willkommen bei " + Z,
        en: "Welcome to " + Z,
        es: "Bienvenido a " + Z,
        fr: "Bienvenue sur " + Z,
      }));
    var Be = localize({ de: "OK", en: "OK", es: "OK", fr: "OK" });
    var Ee = localize({
      de: "Abbrechen",
      en: "Cancel",
      es: "Cancelar",
      fr: "Annuler",
    });
    var Fe = localize({
      de: "Support zu erhalten",
      en: "Get support",
      es: "Obtener apoyo",
      fr: "Contacter le support client",
    });
    var Ge = localize({
      de: "Lizenz vergessen?",
      en: "Retrieve License",
      es: "Recuperar licencia",
      fr: "Retrouver votre Licence",
    });
    var Te = localize({
      de: "Lizenz Kaufen",
      en: "Buy License",
      es: "Compra licencia",
      fr: "Acheter une licence",
    });
    var Re = localize({
      de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
      en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
      es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
      fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
    });
    var Ne = localize({
      de: 'Dieses Skript ben\xf6tigt die Erlaubnis Dateien zu schreiben.\n Gehe in Voreinstellungen von After Effects in die Rubrik "Allgemein" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
      en: 'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
      es: 'Este script necesita poder escribir archivos.\nVaya al panel "General" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
      fr: 'Ce script n\xe9cessite les droits d\'\xe9criture de fichiers.\nAllez dans le panneau "G\xe9n\xe9ral" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
    });
    var Ie =
      (localize({
        de: Z + " Lizenz-Update ben\xf6tigt",
        en: Z + " License Update Required",
        es: Z + " necesita actualizar la licencia",
        fr: "La licence de " + Z + " doit \xeatre mise \xe0 jour",
      }),
      localize({
        de: "Alle Deine Lizenzen findest Du unter \'My Downloads & Licenses\' in Deinem aescripts.com Benutzer-Account.\n\nWillst Du jetzt dorthin gehen?",
        en: "All your licenses are in the \'My Downloads & Licenses\' section of your aescripts.com user account.\n\nWould you like to go there now?",
        es: "Todas sus licencias est\xe1n en la secci\xf3n \'My Downloads & Licenses\' de su cuenta de usuario en aescripts.com.\n\n\xbfQuiere ir all\xed ahora?",
        fr: "Toutes vos licences se trouvent dans la section \'My Downloads & Licenses\' de votre compte utilisateur sur aescripts.com.\n\nVoulez-vous y aller maintenant?",
      }));
    var Me =
      (localize({
        de: "Die Lizenz sollte so aussehen:\n\nFirstname**Lastname**111111111SUL",
        en: "License should look like this:\n\nFirstname**Lastname**111111111SUL",
        es: "La licencia debe tener este aspecto:\n\nNombre**Apellido**111111111SUL",
        fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPr\xe9nom**Nom**111111111SUL",
      }),
      localize({
        de: "Die Lizenz sollte so aussehen:\n\nZDGALAXY*FIRSTNAME*LASTNAME*1111111SUL1",
        en: "License should look like this:\n\nZDGALAXY*FIRSTNAME*LASTNAME*1111111SUL1",
        es: "La licencia debe tener este aspecto:\n\nZDGALAXY*NOMBRE*APELLIDO*1111111SUL1",
        fr: "Votre licence doit \xeatre similaire \xe0 : \n\nZDGALAXY*PRENOM*NOM*1111111SUL1",
      }));
    var Ve = localize({
      de: "Registriert f\xfcr: ",
      en: "Registered to: ",
      es: "Registrado a: ",
      fr: "Enregistr\xe9 pour: ",
    });
    var je =
      (localize({
        de:
          "Es gab einen unerwarteten Fehler\nBitte \xf6ffne hier ein Support-Ticket:\n" +
          ce +
          "\nund f\xfcge einen Screenshot der Fehlermeldung bei\n\n",
        en:
          "There was an unexpected error\nPlease please open a support ticket here:\n" +
          ce +
          "\nand submit screenshot of this error message\n\n",
        es:
          "Se ha producido un error desconocido\nPor favor habra un ticket de soporte aqui:\n" +
          ce +
          "\ny presente una captura de pantalla con este mensaje de error\n\n",
        fr:
          "Une erreur vient de se produire \nVeuillez ouvrir un ticket de service client \xe0 cette adresse:\n" +
          ce +
          "\net n\'oubliez pas d\'y joindre une capture d\'\xe9cran de ce message\n\n",
      }),
      localize({
        de: "Dieser Lizenz-Code ist f\xfcr ein anderes Produkt, bitte stelle sicher, dass du den richtigen Lizenzcode eingibst\n\n",
        en: "This license code is for a different product, please double check that you are entering the correct license\n\n",
        es: "Este c\xf3digo de licencia es para un producto diferente, por favor, comprobar que esta introduciendo la licencia correcta\n\n",
        fr: "Vous venez d\'entrer la cl\xe9 de licence d\'un autre produit, assurez-vous d\'utiliser la bonne cl\xe9 de licence\n\n",
      }));
    var qe = localize({
      de: Z + " Update verf\xfcgbar",
      en: Z + " Update Available",
      es: Z + " Actualizaci\xf3n disponible",
      fr: Z + " Mise \xe0 jour disponible",
    });
    var We = localize({
      de:
        "Eine neuere Version von " +
        Z +
        " ist verf\xfcgbar: v%\n\nWenn Sie gerne auf deiner Downloadseite bei aescripts.com gehen kannst, um sie herunterzuladen?",
      en:
        "A newer version of " +
        Z +
        " is available: %v\n\nWould you like to go to your downloads page at aescripts.com to download it?",
      es:
        "Una versi\xf3n nueva de " +
        Z +
        " est\xe1 disponible: v%\n\n\xbfQuieres ir a la p\xe1gina de descargas de aescripts.com para descargarla?",
      fr:
        "Une version plus de " +
        Z +
        " est disponible: v%\n\nVous souhaitez acc\xe9der \xe0 votre page de t\xe9l\xe9chargements chez aescripts.com pour la t\xe9l\xe9charger?",
    });
    var $e = localize({
      de: "Download",
      en: "Download",
      es: "Descargar",
      fr: "T\xe9l\xe9charger",
    });
    var Ke = localize({
      de: "Diese Version \xdcberspringen",
      en: "Skip this Version",
      es: "Salta esta versi\xf3n",
      fr: "Ignorer cette version",
    });
    var _e = localize({
      de: "Erinnere mich sp\xe4ter",
      en: "Remind Me Later",
      es: "Recu\xe9rdame m\xe1s tarde",
      fr: "Rappelle-moi plus tard",
    });
    var Je =
      (localize({
        de: "Neueste verf\xfcgbare Version",
        en: "Newest available version",
        es: "Versi\xf3n mas nueva disponible",
        fr: "Nouvelle version disponible",
      }),
      localize({
        de: "v%a%b - %c",
        en: "v%a%b - %c",
        es: "v%a%b - %c",
        fr: "v%a%b - %c",
      }));
    var Ye = localize({
      de: "Lizenz Deaktivieren",
      en: "Deactivate License",
      es: "Desactivar Licencia",
      fr: "D\xe9sactiver la licence",
    });
    var Ze = localize({
      de: "Automatisch nach Aktualisierungen suchen",
      en: "Check for updates automatically",
      es: "Revisar actualizaciones automaticamente",
      fr: "V\xe9rifier les mises \xe0 jour automatiquement",
    });
    var Qe =
      (localize({
        de: "Ung\xfcltige Lizenz",
        en: "Invalid license",
        es: "La licencia no es v\xe1lida",
        fr: "Licence non valide",
      }),
      localize({
        de: "Lizenz entfernt",
        en: "License removed",
        es: "Licencia eliminada",
        fr: "Licence supprim\xe9e",
      }));
    var He = localize({
      de: "Lizenz",
      en: "License",
      es: "Licencia",
      fr: "Licence",
    });
    var Xe = localize({
      de: "Beta-Lizenz",
      en: "Beta License",
      es: "Licencia Beta",
      fr: "Licence Beta",
    });
    var et = localize({
      de: "EDU-Lizenz",
      en: "Educational License",
      es: "Licencia Educacional",
      fr: "T\xe9l\xe9charger",
    });
    var tt = localize({
      de: "Floating-Lizenz",
      en: "Floating License",
      es: "Licencia flotante",
      fr: "Licence flottante",
    });
    var nt =
      (localize({
        de: "License mit unbekanntem Typ",
        en: "License of unknown type",
        es: "Licencia de tipo desconocido",
        fr: "Licence inconnue",
      }),
      localize({
        de: "Gedeactiveerd ",
        en: "Deactivated",
        es: "Desactivado",
        fr: "D\xe9sactiv\xe9",
      }));
    var rt = {
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
        "-101": { detail: "", title: "Konnte Ergebnis nicht parsen (-101)" },
        "-102": { detail: "", title: "Kein Ergebnis (-102)" },
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
          title: "Trial expired",
        },
        "-101": { detail: "", title: "Could not parse result (-101)" },
        "-102": { detail: "", title: "No result code (-102)" },
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
          detail: "",
          title: "No se pudo analizar el resultado (-101)",
        },
        "-102": { detail: "", title: "No hay c\xf3digo de resultado (-102)" },
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
          detail: "",
          title: "Impossible de parcourir le r\xe9sultat (-101)",
        },
        "-102": { detail: "", title: "Pas de code de r\xe9sultat (-102)" },
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
          detail: "Verifiez que le serveur de licence fonctionne correctement",
          title: "Impossible de se connecter au serveur (-9)",
        },
        "-99": { detail: "", title: "Erreur inconnue (-99)" },
        unknown: { detail: "", title: "Erreur inconnue (0)" },
      },
    };
    var it = e.hasOwnProperty("legacyPrefsGroup")
      ? e.legacyPrefsGroup
      : "aescripts";
    var at = ge ? Z : ne + "_Registration";
    var ot = ne + "_Version";
    var lt = ne + "_LicVersion";
    var st = ne + "_VersionCheckInit";
    var ct = ne + "_LastVersionChecked";
    var ut = ne + "_LastServerVersionChecked";
    var dt = ne + "_LastTimeVersionChecked";
    var pt = ne + "_NextTimeVersionChecked";
    var ft = ne + "_NextTimeVersionCheckedStatus";
    var ht = ne + "_doUpdateCheck";
    M(it, ht) && (me = !("false" == I(it, ht)));
    gt = -1 != $.os.indexOf("Mac") ? "cmd" : "Ctrl";
    var vt = localize({
      de: "Bitte gebe den Lizenzcode ein.",
      en: "Please enter the license code.",
      es: "Por favor, introduzca el c\xf3digo de licencia.",
      fr: "Veuillez entrer votre num\xe9ro de licence.",
    });
    var mt = localize({
      de:
        "(Wenn das Einf\xfcgen mit " +
        gt +
        "+V nicht funktioniert, versuche Bearbeiten->Einf\xfcgen.)",
      en:
        "(If pasting the code with " +
          gt +
          "+V doesn\'t work try " +
          parseFloat(app.version) >=
        10
          ? "Right-Click and Paste)"
          : "Edit->Paste)",
      es:
        "(Si pegar la licencia usando " +
          gt +
          "+V no funciona, pruebe " +
          parseFloat(app.version) >=
        10
          ? "Clic derecho y pegar)"
          : "Edici\xf3n->Pegar)",
      fr:
        "(Si vous ne parvenez pas \xe0 coller le code avec " +
          gt +
          "+V essayez " +
          parseFloat(app.version) >=
        10
          ? "Clique droit et Coller)"
          : "Edition->Coller)",
    });
    var bt = localize({
      de: 'Um die Testversion zu starten, gebe "trial" ein.',
      en: "To run in trial mode type: trial\n",
      es: "Para ejecutar el modo Trial, escriba: trial\n",
      fr: "Pour lancer la version de d\xe9monstration, tapez : trial\n",
    });
    var zt = localize({
      de: "Aktivieren Sie eine Lizenz vom Server mit @REMOTE\n",
      en: "Activate a license from the server with @REMOTE\n",
      es: "Activar una licencia del servidor con @REMOTE\n",
      fr: "Activer une licence du serveur avec @REMOTE\n",
    });
    var Lt =
      ((
        w(
          Math.floor(parseFloat(app.version))
            .toString()
            .charAt(
              Math.max(
                0,
                Math.floor(parseFloat(app.version)).toString().length - 1,
              ),
            ) +
            Z.substring(Math.max(0, Z.length - 15), Z.length) +
            Q,
        ) *
        0.457 *
        X
      ).toString(36),
      (
        w(
          Math.floor(parseFloat(app.version))
            .toString()
            .charAt(
              Math.max(
                0,
                Math.floor(parseFloat(app.version)).toString().length - 1,
              ),
            ) +
            Z.substring(Math.max(0, Z.length - 15), Z.length) +
            Q,
        ) *
        (X / 3.981)
      ).toString(36),
      Folder.userData.fsName + "/Aescripts/");
    var yt = "pref_";
    F() || Folder(Lt).exists || Folder(Lt).create();
    !(function (e) {
      e.toString().replace(/[^a-z0-9]/gi, "");
    })(Z);
    this.getSetting = function (e, t) {
      return ((J = "settings"), (e = ne + "_" + e), I(e, t));
    };
    this.haveSetting = function (e, t) {
      return ((J = "settings"), (e = ne + "_" + e), M(e, t));
    };
    this.saveSetting = function (e, t, n) {
      return ((J = "settings"), (e = ne + "_" + e), V(e, t, n));
    };
    this.c = function () {
      return _("l");
    };
    this.s = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        m(wt.result)
      );
    };
    this.r = function () {
      return _("r");
    };
    this.t = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        b(wt.result)
      );
    };
    this.l = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        wt.license
      );
    };
    this.ss = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        m(wt.result) && !b(wt.result)
      );
    };
    this.vt = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        m(wt.result) && b(wt.result)
      );
    };
    this.helpUI = function (e) {
      r();
    };
    this.getRegistration = function (e) {
      return W(e);
    };
    this.openSupportTicket = function (e) {
      a(e);
    };
    this.openURL = function (e) {
      O(e);
    };
    this.doUpdateCheck = function (e) {
      l(e);
    };
    this.getUpdateCheckStatus = function () {
      return me;
    };
    this.frameworkVersion = function () {
      return Y;
    };
  }
  function b(e) {
    function t() {
      var e = new Window(
        "dialog",
        Oe + " v" + Q + BD("RX9tDpISJFcYDUpfJ90M"),
        void 0,
        { resizeable: true },
      );
      if (null != e) {
        var t =
          "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\tinfoGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'top\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\torientation: \'column\', \r\t\t\t\t\t\thdrGrp: Group {\r\t\t\t\t\t\t\ttxt: StaticText {}, \r\t\t\t\t\t\t\tpaste: StaticText {}, \r\t\t\t\t\t\t}\r\t\t\t\t\t\ttrial: StaticText {}, \r\t\t\t\t\t} \r\t\t\t\t\tlicGrp: Group { \r\t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \r\t\t\t\t\t} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r                            buyGrp: Group { \r                            alignment: [\'left\',\'fill\'], \r                            alignChildren: [\'left\',\'fill\'], \r                            orientation: \'column\', \r                            spacing:1,\r                                  retrieveReg: Button {text:\'" +
          Ge +
          "\', name:\'retrieve\',preferredSize:[130,25]}\r                                   buyLic: Button {text:\'" +
          Te +
          "\', name:\'buy\',preferredSize:[130,25]}\r                                   }\r\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          Ee +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tokBtn: Button {text:\'" +
          Be +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
        e.grp = e.add(t);
        var n = ScriptUI.newFont(
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
          (e.grp.licGrp.txt.preferredSize = [600, 30]),
          (e.grp.infoGrp.hdrGrp.txt.text = vt),
          (e.grp.infoGrp.hdrGrp.txt.graphics.font = n),
          (e.grp.infoGrp.hdrGrp.paste.text = mt),
          (e.grp.infoGrp.hdrGrp.paste.graphics.font = r),
          (e.grp.infoGrp.trial.text = oe || !ie ? "" : bt),
          z(wt) && (e.grp.infoGrp.trial.text = zt),
          (e.grp.licGrp.txt.text = oe || !ie ? "" : "trial"),
          z(wt) && (e.grp.licGrp.txt.text = "@REMOTE"),
          (e.grp.okGrp.buyGrp.retrieveReg.visible =
            e.grp.okGrp.buyGrp.buyLic.visible =
              !oe),
          (e.grp.okGrp.buyGrp.retrieveReg.onClick =
            e.grp.okGrp.buyGrp.buyLic.onClick =
              function () {
                var t = "buy" == this.name ? H : fe;
                (t != fe || fe != pe || confirm(Ie)) && O(t);
                e.close(false);
              }),
          (e.grp.okGrp.cancelBtn.onClick = function () {
            e.close(false);
          }),
          (e.grp.okGrp.okBtn.onClick = function () {
            kt = e.grp.licGrp.txt.text
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
    function n(e, t) {
      return new Date() < t || new Date() > e;
    }
    function r() {
      var t = new Window("dialog", Z + " v" + Q, void 0, { resizeable: true });
      if (null != t) {
        for (
          var n =
              -1 != $.os.indexOf("Windows") &&
              parseFloat(app.version) >= 12 &&
              parseFloat(app.version) < 14
                ? ["left", "top"]
                : ["fill", "fill"],
            r =
              "group { \r\t\torientation: \'column\', \r\t\talignment: [\'" +
              n[0] +
              "\',\'" +
              n[1] +
              "\'], \r\t\talignChildren: [\'fill\',\'fill\'], \r                   infoGrp: Group { \r                   alignment: [\'fill\',\'top\'], \r                   alignChildren: [\'fill\',\'top\'], \r\t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]}, \r                      hdr: StaticText {properties:{multiline:true}}, \r                      removeLic: Button {text:\'" +
              Ye +
              "\', preferredSize:[40,30]} \r\t\t\t\t} \r\t\t\t\thelpGrp: Group { \r                   alignment: [\'" +
              n[0] +
              "\',\'" +
              n[1] +
              "\'], \r                   alignChildren: [\'fill\',\'fill\'], \r                    txt: EditText {properties:{multiline:true, readonly:true}}, \r\t\t\t\t} \r                prefsGrp: Group {\r                       alignment: [\'fill\',\'bottom\'], \r                       alignChildren: [\'left\',\'center\'], \r                       orientation: \'row\', \r                       doUpdateCheck: Checkbox {text:\'" +
              Ze +
              "\'} \r                       }\r\t\t\tokGrp: Group { \r                alignment: [\'fill\',\'bottom\'], \r                alignChildren: [\'fill\',\'center\'], \r                 supportBtn: Button {text:\'" +
              Fe +
              "\', preferredSize:[150,30], alignment: [\'left\',\'center\']} \r                ",
            o = 0;
          o < Math.min(ze, e.helpButtons.length);
          o++
        ) {
          e.helpButtons[o].hasOwnProperty("name") &&
            (r +=
              "btn" + o + ": " + e.helpButtons[o].hasOwnProperty("type") &&
              i(e.helpButtons[o].type)
                ? e.helpButtons[o].type
                : "Button" +
                  " {text:\'" +
                  e.helpButtons[o].name +
                  "\', id: \'" +
                  o +
                  "\', alignment: [\'left\',\'center\']}");
        }
        r +=
          "\r\t\t\t\t\tokBtn: Button {text:\'" +
          Be +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \r\t\t\t\t} \r\t\t}";
        t.grp = t.add(r);
        t.grp.helpGrp.txt.preferredSize = [800, 500];
        var s = new Date().getYear() + 1900;
        t.grp.infoGrp.txt.text =
          Z + " v" + Q + "\n\xa9" + s + " " + e.scriptAuthor + "\n\n";
        t.grp.infoGrp.hdr.text = W();
        t.grp.helpGrp.txt.text = e.helpText;
        t.grp.prefsGrp.doUpdateCheck.value = me;
        t.grp.prefsGrp.doUpdateCheck.onChange = function () {
          l(this.value);
        };
        for (var o = 0; o < Math.min(ze, e.helpButtons.length); o += 1) {
          e.helpButtons[o].hasOwnProperty("name") &&
            (e.helpButtons[o].hasOwnProperty("url")
              ? (t.grp.okGrp["btn" + o].onClick = function () {
                  O(e.helpButtons[this.id].url);
                })
              : e.helpButtons[o].hasOwnProperty("onClickFunction") &&
                (t.grp.okGrp["btn" + o].onClick =
                  e.helpButtons[o].onClickFunction),
            e.helpButtons[o].hasOwnProperty("btnValue") &&
              (t.grp.okGrp["btn" + o].value = e.helpButtons[o].btnValue));
        }
        t.grp.infoGrp.removeLic.visible = !b(wt.result);
        t.grp.infoGrp.removeLic.onClick = function () {
          K() || ((t.grp.infoGrp.hdr.text = W()), (this.visible = false));
        };
        t.grp.okGrp.supportBtn.onClick = function () {
          a({});
          t.close();
        };
        t.grp.okGrp.okBtn.onClick = function () {
          t.close();
        };
        -1 != $.os.indexOf("Windows") &&
          parseFloat(app.version) >= 12 &&
          parseFloat(app.version) < 14 &&
          (t.maximumSize = [840, 670]);
        t.layout.layout(true);
        t.layout.resize();
        t.onResizing = t.onResize = function () {
          this.layout.resize();
        };
        t.show();
      }
    }
    function i(e) {
      return "Button" === e || "Checkbox" === e;
    }
    function a(e) {
      n = r = "";
      t = "&subject=";
      void 0 != e &&
        void 0 !== e &&
        (e.hasOwnProperty("subject") && (t += File.encode(e.subject)),
        e.hasOwnProperty("message") && (n = File.encode(e.message)),
        e.hasOwnProperty("diagnostic") &&
          (r = File.encode(e.diagnostic + "\n--\n")));
      var i =
        true === de ? ee + t + "&message=" : t.replace(/\&/, "?") + "&body=";
      var a =
        "" != i
          ? n +
            "%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A-------%0D%0A" +
            r +
            o(true)
          : "";
      ue.toString().match(/@/) &&
        !ue.toString().match(/^mailto:/) &&
        (ue = "mailto:" + ue);
      O(ue + i + a);
    }
    function o(e) {
      var t = $.os.toString();
      var n =
        BridgeTalk.getDisplayName(BridgeTalk.appName) +
        " (" +
        app.version +
        ") - " +
        $.locale.toString();
      var r = Z + " v" + Q;
      var i = "Lic. fw v" + Y;
      return e
        ? File.encode(r) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(n) +
            "%0D%0A" +
            File.encode(i)
        : r + "\n" + t + "\n" + n + "\n" + i;
    }
    function l(e) {
      V(it, ht, (me = e));
    }
    function s(e) {
      var t = new Window("dialog", qe, void 0, { resizeable: true });
      if (null != t) {
        var n =
          "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   hdrGrp: Group { \r\t\t\t\t   alignment: [\'fill\',\'fill\'], \r\t\t\t\t   alignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   orientation: \'column\', \r                        hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
        e.hasOwnProperty("header") &&
          (n +=
            "   infoGrp: Panel { \r                           alignment: [\'fill\',\'fill\'], \r                           alignChildren: [\'fill\',\'fill\'], \r                           orientation: \'column\', \r                              info: StaticText {properties:{multiline:true}}, \r                              } ");
        n +=
          "} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\t\tskipVersionBtn: Button {text:\'" +
          Ke +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r                           remindMeLaterBtn: Button {text:\'" +
          _e +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tdownloadBtn: Button {text:\'" +
          $e +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
        t.grp = t.add(n);
        var r = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
        t.grp.hdrGrp.hdr.graphics.font = r;
        t.grp.hdrGrp.hdr.text = We.replace(/%v/, e.version);
        e.hasOwnProperty("header") &&
          (t.grp.hdrGrp.infoGrp.info.text = e.header + "\n\n" + e.detail);
        t.grp.okGrp.skipVersionBtn.onClick = function () {
          V(it, ct, Q);
          V(it, dt, new Date().toString());
          V(it, ft, "skip");
          V(it, ut, e.version);
          t.close(false);
        };
        t.grp.okGrp.remindMeLaterBtn.onClick = function () {
          var n = new Date();
          n = new Date(n.setDate(n.getDate() + ve));
          V(it, ct, Q);
          V(it, dt, new Date().toString());
          V(it, pt, n.toString());
          V(it, ut, e.version);
          t.close(false);
        };
        t.grp.okGrp.downloadBtn.onClick = function () {
          O(fe);
          t.close(true);
        };
        t.layout.layout(true);
        t.layout.resize();
        t.onResizing = t.onResize = function () {
          this.layout.resize();
        };
        e.hasOwnProperty("header") &&
          ((t.grp.hdrGrp.infoGrp.size.height = Math.min(
            t.grp.hdrGrp.infoGrp.size.height,
            300,
          )),
          t.layout.layout(true),
          t.layout.resize());
        t.show();
      }
    }
    function c() {
      if (me) {
        M(it, ct) && (t = I(it, ct));
        M(it, ut) && (lastServerVersionChecked = I(it, ut));
        M(it, dt) && (n = new Date(I(it, dt)));
        M(it, ft) && (i = I(it, ft));
        M(it, pt) && (r = new Date(I(it, pt)));
        M(it, st) && (e = I(it, st));
        var a = new Date();
        if (!(void 0 != e && void 0 != r && a < r)) {
          var o = u(ee, true);
          var l = null != o && o.hasOwnProperty("version") ? o.version : Q;
          if (
            void 0 == i ||
            "skip" != i ||
            void 0 == lastServerVersionChecked ||
            lastServerVersionChecked != l
          ) {
            V(it, st, 1);
            var c = new Date();
            c = new Date(c.setDate(c.getDate() + be));
            V(it, ct, Q);
            V(it, dt, new Date().toString());
            V(it, pt, c.toString());
            null != l &&
              j(l, Q) > 0 &&
              ((void 0 != t && void 0 != n && void 0 != r) || s(o),
              void 0 != t && j(l, t) > 0 && s(o),
              void 0 != t && 0 == j(l, t) && a >= r && s(o));
          }
        }
      }
    }
    function u(e, t) {
      function n(r) {
        var r = {};
        var i = d(
          "notify.aescripts.com",
          "versioncheck2.php?json=1&plain=1&sku=" + e + t ? "&latest=1" : "",
        );
        if (null != i && "" != i) {
          if (-1 == (i = i.substr(i.indexOf("{") - 1)).lastIndexOf("}")) {
            return ((t = false), (r = n(r)));
          }
          i = i.substr(0, i.lastIndexOf("}") + 1);
          try {
            i = q(i, "parse");
          } catch (e) {
            return null;
          }
          return "ok" == i.status
            ? (r = t
                ? {
                    date: i.latest.release_date,
                    detail: i.latest.detail,
                    header: Je.replace(/%a/, i.version)
                      .replace(/%b/, "")
                      .replace(/%c/, i.latest.release_date),
                    version: i.version,
                  }
                : { version: i.version })
            : null;
        }
        return null;
      }
      return n(e);
    }
    function d(e, t) {
      var n = new Socket();
      if (
        ((n.encoding = "binary"), (n.timeout = 2), n.open(e + ":80", "UTF-8"))
      ) {
        n.write(
          "GET /" + t + " HTTP/1.1\nHost: " + e + "\n\nConnection: close\n\n",
        );
        var r = n.read(2000);
        return (n.close(), void 0 != r ? (r = r.toString()) : null);
      }
      return null;
    }
    function p(e) {
      return f(
        "result:0\ne:0\ntld:0\nlic:SUL\nfirst:Made with \u2665\nlast:By ZDCRACKER\nnum:1",
      );
      if (e == "") {
        var file = File(Folder.userData.fullName + "/" + ne + "_ZD.lic");
        if (file.exists) {
          file.open("r");
          var t = BD(file.read());
          file.close();
          return f(t);
        } else {
          return f("result:-1");
        }
      }
      if (getVerifCode3(e) == "1") {
        var reArr = e.split("*");
        logInfo(
          BE(
            "result:0\ne:0\ntld:0\nlic:SUL\nfirst:" +
              reArr[1] +
              "\nlast:" +
              reArr[2] +
              "\nnum:1",
          ),
        );
        return f(
          "result:0\ne:0\ntld:0\nlic:SUL\nfirst:" +
            reArr[1] +
            "\nlast:" +
            reArr[2] +
            "\nnum:1",
        );
      } else {
        return f("result:-1");
      }
    }
    function logInfo(Txt) {
      var file = new File(Folder.userData.fullName + "/" + ne + "_ZD.lic");
      file.open("e", "TEXT", "????");
      file.seek(0, 2);
      $.os.search(/windows/i) != -1
        ? (file.lineFeed = "windows")
        : (file.lineFeed = "macintosh");
      file.writeln(Txt);
      file.close();
      file.hidden = true;
    }
    function f(e) {
      try {
        t = h(e);
      } catch (e) {
        (t = {}).result = -101;
        t.e = e.toString();
      }
      return t;
    }
    function h(e) {
      for (var t = e.match(/[^\r\n]+/g), n = {}, r = 0; r < t.length; r++) {
        var i = t[r].split(":");
        if (i.length >= 2) {
          var a = i[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          var o = L(i[1]);
          isNaN(o) || (o = parseFloat(o));
          n[a] = o;
        }
      }
      return (void 0 === n.result && (n.result = 102), g(n), v(n), n);
    }
    function g(e) {
      if (-7 !== e.result) {
      } else if (0 == ae) {
        e.result = -106;
      } else {
        var t = E("d", e);
        if (void 0 === t) {
          return void (e.result = -103);
        }
        var n = ae - t;
        n > 0
          ? ((e.result = 100), (e.tdl = n), (e.license = D("VFJJQUw=")))
          : ((e.result = -100), (e.tdl = 0));
      }
    }
    function v(e) {
      var t = e.result;
      var n = E("li", e).match(/^B/);
      oe && (b(t) || -106 == t || -7 == t)
        ? (e.result = -107)
        : !oe && n && (e.result = -105);
    }
    function m(e) {
      return e >= 0;
    }
    function b(e) {
      return 100 == e || -100 == e;
    }
    function z(e) {
      try {
        return E("L", e).match(/^O/);
      } catch (e) {}
    }
    function L(e) {
      return (
        "\'" == (e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))[0] &&
          "\'" == e[e.length - 1] &&
          (e = e.substring(1, e.length - 1)),
        e
      );
    }
    function y(e) {
      return rt[ye].hasOwnProperty(e.toString()) ? e : "unknown";
    }
    function k(e) {
      for (var t = 0, n = 0; n < e.length; n++) {
        t += e.charCodeAt(n);
      }
      return t;
    }
    function S(e) {
      var t = e.split("*");
      if (4 == t.length) {
        var n = t[3].replace(/^[0-9]+/, "");
        var r = t[3].match(/^[0-9]+/, "");
        var i = r[0].substr(0, 2);
        var a = r[0].substr(r[0].length - 2);
        var o = i[0] + t[0] + i[1] + t[1] + a[0] + t[2] + a[1] + n;
        var l = r[0].substring(2, r[0].length - 2);
        return k(o) * X == l ? "1" : "0";
      }
      return (e != U("bad") && alert(Me), "0");
    }
    function w(e) {
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
    function x(e) {
      var t = e.split("*");
      return (
        e.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/) &&
        4 == t.length
      );
    }
    function C(e, n, r) {
      if (
        ((n = void 0 == n ? "" : n.replace(/^\s\s*/, "").replace(/\s\s*$/, "")),
        (myLicense = false),
        e && ((regUI = t()), (myRegPrompt = regUI.show()), !myRegPrompt))
      ) {
        return false;
      }
      var i = false;
      "@remote" == (n = void 0 == kt ? n : kt).toLowerCase() &&
        ((n = ne + n), (i = true));
      var a = n.split("*");
      if (!((ie && "trial" == n.toLowerCase()) || i || x(n))) {
        if (n.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
          var o = confirm(ke);
          return (A() && o && O(he + "?serial=" + n), myLicense);
        }
        return (
          alert(
            De + "\n" + oe
              ? Me.replace(new RegExp(D("U1VM"), "g"), D("QlRB"))
              : Me + "\n\n" + Ue,
          ),
          V(it, at, U("bad")),
          V(it, ot, Q),
          V(it, lt, Y),
          C(true),
          myLicense
        );
      }
      if (("trial" != n.toLowerCase() || i) && !i) {
        if (null != a[0] && a[0].toUpperCase() != "ZDGALAXY") {
          return (alert(je + "\n" + Ue), C(e), false);
        }
        var l = a[3].match(/[A-Z]{3}[0-9]+$/);
        if (null != l) {
          if (l[0].match(D("QlRB")) && !oe) {
            return (alert(we), V(it, at, U("bad")), C(true), false);
          }
          myLicense = true;
        }
      }
      if (((wt = 2 == Le ? p(n) : S(n)), !m(wt.result))) {
        return (
          e || (e = true),
          alert(
            rt[ye][y(wt.result)].title + "\n" + rt[ye][y(wt.result)].detail,
          ),
          C(e),
          myLicense
        );
      }
      if (((St = ie && "trial" == n.toLowerCase() && b(wt.result)), e && !St)) {
        var s = parseInt(E("n", wt), 10);
        n.match(/@remote/i) ||
          alert(
            Ce.replace("%u", s) + (s > 1) && "de" != ye
              ? "s"
              : "" + oe
                ? ""
                : "\n" + Pe,
          );
      }
      return ((myLicense = true), myLicense);
    }
    function P() {
      var e = M(it, at) ? D(I(it, at)) : "";
      return x(e) ? e : "";
    }
    function D(e) {
      var l = "";
      var s = 0;
      e = e.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      for (
        var c =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        s < e.length;
      ) {
        t =
          (c.indexOf(e.charAt(s++)) << 2) |
          ((i = c.indexOf(e.charAt(s++))) >> 4);
        n = ((15 & i) << 4) | ((a = c.indexOf(e.charAt(s++))) >> 2);
        r = ((3 & a) << 6) | (o = c.indexOf(e.charAt(s++)));
        l += String.fromCharCode(t);
        64 != a && (l += String.fromCharCode(n));
        64 != o && (l += String.fromCharCode(r));
      }
      return l;
    }
    function U(e) {
      for (
        t,
          n,
          r,
          i,
          a,
          o,
          l,
          s = "",
          c = 0,
          u =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        c < e.length;
      ) {
        i = (t = e.charCodeAt(c++)) >> 2;
        a = ((3 & t) << 4) | ((n = e.charCodeAt(c++)) >> 4);
        o = ((15 & n) << 2) | ((r = e.charCodeAt(c++)) >> 6);
        l = 63 & r;
        isNaN(n) ? (o = l = 64) : isNaN(r) && (l = 64);
        s = s + u.charAt(i) + u.charAt(a) + u.charAt(o) + u.charAt(l);
      }
      return s;
    }
    function A() {
      return (
        1 ==
        app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        )
      );
    }
    function O(e) {
      if (
        ((e = e.toString()).match(/@/) ||
          e.match(/^https?:\/\//) ||
          (e = "http://" + e.replace(/^(http)?s?:?\/?\/?/, "")),
        F() || G())
      ) {
        Folder.commonFiles.parent.fsName;
        N(
          -1 != $.os.indexOf("Windows")
            ? 'cmd /c "start ' + (e = e.replace(/&/g, "^&")) + '"'
            : 'open "' + e + '"',
        );
      } else {
        R(
          File(Folder.temp.fsName + "/openUrl.url"),
          "[InternetShortcut]\rURL=" + e + "\r",
          "UTF-8",
          true,
        ).execute();
      }
    }
    function B(e) {
      if (0 == E("r", wt)) {
        if (
          ((i = E("f", wt)),
          (a = E("la", wt)),
          (o = E("n", wt)),
          (l = E("li", wt)),
          e > 0)
        ) {
          return i + "\'" + a + "\'" + E("s", wt) + l + o;
        }
        n = i + a.toString().match(/^@/) ? "" : " " + a + " ";
        r = l;
      } else {
        n = "";
      }
      var c = xe.replace("%u", o) + (o > 1) && "de" != ye ? "s" : "";
      switch (r) {
        case D("U1VM"):
          t = " - " + He + " " + c;
          break;
        case D("QlRB"):
          t = " - " + Xe + " " + c;
          break;
        case D("RURV"):
          t = " - " + et + " " + c;
          break;
        case D("RkxU"):
          t = " - " + tt + " " + c;
          break;
        default:
          t = "Made with \u2665 By ZDCRACKER";
      }
      return "" != n ? Ve + n + t : t;
    }
    function E(e, t) {
      for (var n in t) {
        if (t.hasOwnProperty(n) && n.toString().match(new RegExp("^" + e))) {
          return t[n];
        }
      }
      return "";
    }
    function F() {
      return BridgeTalk.appName == D("YWZ0ZXJlZmZlY3Rz");
    }
    function G() {
      return BridgeTalk.appName == D("cGhvdG9zaG9w");
    }
    function BD(input) {
      var output = "";
      var i = 0;
      input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var key =
        "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba9876543210+/";
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
    function BE(input) {
      var output = "";
      var i = 0;
      var key =
        "ZYXWVUTSRQPONMLKJIHGFEDCBAzyxwvutsrqponmlkjihgfedcba9876543210+/";
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
    function T(e) {
      if (e.exists && e.open("r")) {
        var t = e.read();
        return (e.close(), t);
      }
      return null;
    }
    function R(e, t, n, r) {
      return (
        (e.exists && !r) ||
          (e.exists && e.remove(),
          ((e =
            -1 != $.os.indexOf("Win")
              ? new File(e.fsName)
              : new File(e.absoluteURI)).encoding = n),
          e.open("w"),
          e.write(t),
          e.close(),
          (e.hidden = true),
          -1 != $.os.indexOf("Mac") &&
            N(D("Y2htb2QgNzU3IA==") + e.absoluteURI)),
        e
      );
    }
    function N(e) {
      if (F()) {
        return system.callSystem(e);
      }
      if (G()) {
        var t =
          -1 != $.os.indexOf("Win")
            ? Folder.temp.fsName
            : Folder.temp.absoluteURI +
              "/" +
              Math.round(Math.random() * 71827 * new Date().getTime());
        return (app.system(e + " > " + t), T(File(t)));
      }
      return "";
    }
    function I(e, t) {
      return F() && "settings" != J
        ? app.settings.getSetting(e, t)
        : q(T(File(Lt + yt + File.encode(e))), "parse")[t];
    }
    function M(e, t) {
      if (F() && "settings" != J) {
        return app.settings.haveSetting(e, t);
      }
      var n = T(File(Lt + yt + File.encode(e)));
      return null != n && t in q(n.toString(), "parse");
    }
    function V(e, t, n) {
      if (F() && "settings" != J) {
        app.settings.saveSetting(e, t, n);
        app.preferences.saveToDisk();
      } else {
        var r = {};
        var i = File(Lt + yt + File.encode(e));
        if (i.exists) {
          var a = T(i);
          null != a && (r = q(a.toString(), "parse"));
        }
        r[t] = n;
        R(
          File(Lt + yt + File.encode(e)),
          q(r, "stringify", "\t"),
          "UTF-8",
          true,
        );
      }
    }
    function j(e, t) {
      if (e === t) {
        return 0;
      }
      for (
        var n = e.toString().split("."),
          r = t.toString().split("."),
          i = Math.min(n.length, r.length),
          a = 0;
        a < i;
        a++
      ) {
        if (parseInt(n[a]) > parseInt(r[a])) {
          return 1;
        }
        if (parseInt(n[a]) < parseInt(r[a])) {
          return -1;
        }
      }
      return n.length > r.length ? 1 : n.length < r.length ? -1 : 0;
    }
    function string_encode3(str) {
      var encStr = 0;
      for (var i = 0; i < str.length; i += 1) {
        encStr = encStr + str.charCodeAt(i);
      }
      return encStr;
    }
    function q(e, t, n) {
      "object" != typeof JSON && (JSON = {});
      (function () {
        function e(e) {
          return e < 10 ? "0" + e : e;
        }
        function t() {
          return this.valueOf();
        }
        function n(e) {
          return (
            (i.lastIndex = 0),
            i.test(e)
              ? '"' +
                e.replace(i, function (e) {
                  var t = l[e];
                  return "string" == typeof t
                    ? t
                    : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
              : '"' + e + '"'
          );
        }
        function r(e, t) {
          var p = a;
          var f = t[e];
          switch (
            (f &&
              "object" == typeof f &&
              "function" == typeof f.toJSON &&
              (f = f.toJSON(e)),
            "function" == typeof s && (f = s.call(t, e, f)),
            typeof f)
          ) {
            case "string":
              return n(f);
            case "number":
              return isFinite(f) ? String(f) : "null";
            case "boolean":
            case "null":
              return String(f);
            case "object":
              if (!f) {
                return "null";
              }
              if (
                ((a += o),
                (d = []),
                "[object Array]" === Object.prototype.toString.apply(f))
              ) {
                for (u = f.length, i = 0; i < u; i += 1) {
                  d[i] = r(i, f) || "null";
                }
                return (
                  (c =
                    0 === d.length
                      ? "[]"
                      : a
                        ? "[\n" + a + d.join(",\n" + a) + "\n" + p + "]"
                        : "[" + d.join(",") + "]"),
                  (a = p),
                  c
                );
              }
              if (s && "object" == typeof s) {
                for (u = s.length, i = 0; i < u; i += 1) {
                  "string" == typeof s[i] &&
                    (c = r((l = s[i]), f)) &&
                    d.push(n(l) + a ? ": " : ":" + c);
                }
              } else {
                for (var l in f) {
                  Object.prototype.hasOwnProperty.call(f, l) &&
                    (c = r(l, f)) &&
                    d.push(n(l) + a ? ": " : ":" + c);
                }
              }
              return (
                (c =
                  0 === d.length
                    ? "{}"
                    : a
                      ? "{\n" + a + d.join(",\n" + a) + "\n" + p + "}"
                      : "{" + d.join(",") + "}"),
                (a = p),
                c
              );
          }
        }
        ("use strict");
        var i =
          /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        "function" != typeof Date.prototype.toJSON &&
          ((Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
              ? this.getUTCFullYear() +
                  "-" +
                  e(this.getUTCMonth() + 1) +
                  "-" +
                  e(this.getUTCDate()) +
                  "T" +
                  e(this.getUTCHours()) +
                  ":" +
                  e(this.getUTCMinutes()) +
                  ":" +
                  e(this.getUTCSeconds()) +
                  "Z"
              : null;
          }),
          (Boolean.prototype.toJSON = t),
          (Number.prototype.toJSON = t),
          (String.prototype.toJSON = t));
        "function" != typeof JSON.stringify &&
          ((l = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
          }),
          (JSON.stringify = function (e, t, n) {
            if (((a = ""), (o = ""), "number" == typeof n)) {
              for (var i = 0; i < n; i += 1) {
                o += " ";
              }
            } else {
              "string" == typeof n && (o = n);
            }
            if (
              ((s = t),
              t &&
                "function" != typeof t &&
                ("object" != typeof t || "number" != typeof t.length))
            ) {
              throw new Error("JSON.stringify");
            }
            return r("", { "": e });
          }));
      })();
      var r = (function () {
        function e(e, t, n) {
          return t ? i[t] : String.fromCharCode(parseInt(n, 16));
        }
        var t =
          '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
        t = '(?:"' + t + '*")';
        var n = new RegExp(
          "(?:false|true|null|[\\{\\}\\[\\]]|(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)|" +
            t +
            ")",
          "g",
        );
        var r = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
        var i = {
          '"': '"',
          "/": "/",
          "\\": "\\",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "\t",
        };
        var a = new String("");
        var o = Object.hasOwnProperty;
        return function (t, i) {
          var s = (t = t.match(n))[0];
          var c = false;
          "{" === s ? (l = {}) : "[" === s ? (l = []) : ((l = []), (c = true));
          for (u, d = [l], p = 1 - c, f = t.length; p < f; ++p) {
            switch ((s = t[p]).charCodeAt(0)) {
              default:
                h = d[0][u || h.length] = s;
                u = void 0;
                break;
              case 34:
                if (
                  (-1 !== (s = s.substring(1, s.length - 1)).indexOf("\\") &&
                    (s = s.replace(r, e)),
                  (h = d[0]),
                  !u)
                ) {
                  if (!(h instanceof Array)) {
                    u = s || a;
                    break;
                  }
                  u = h.length;
                }
                h[u] = s;
                u = void 0;
                break;
              case 91:
                h = d[0];
                d.unshift((h[u || h.length] = []));
                u = void 0;
                break;
              case 93:
                d.shift();
                break;
              case 102:
                h = d[0][u || h.length] = false;
                u = void 0;
                break;
              case 110:
                h = d[0][u || h.length] = null;
                u = void 0;
                break;
              case 116:
                h = d[0][u || h.length] = true;
                u = void 0;
                break;
              case 123:
                h = d[0];
                d.unshift((h[u || h.length] = {}));
                u = void 0;
                break;
              case 125:
                d.shift();
            }
          }
          if (c) {
            if (1 !== d.length) {
              throw new Error();
            }
            l = l[0];
          } else {
            if (d.length) {
              throw new Error();
            }
          }
          if (i) {
            var g = function (e, t) {
              var n = e[t];
              if (n && "object" == typeof n) {
                var r = null;
                for (var a in n) {
                  if (o.call(n, a) && n !== e) {
                    var l = g(n, a);
                    void 0 !== l ? (n[a] = l) : (r || (r = []), r.push(a));
                  }
                }
                if (r) {
                  for (a = r.length; --a >= 0; ) {
                    delete n[r[a]];
                  }
                }
              }
              return i.call(e, t, n);
            };
            l = g({ "": l }, "");
          }
          return l;
        };
      })();
      switch (t) {
        case "parse":
          return r(e);
        case "stringify":
          return JSON.stringify(e, void 0, n);
      }
    }
    function delLic() {
      var lFile = File(Folder.userData.fullName + "/" + ne + "_ZD.lic");
      return lFile.remove();
    }
    function W(e) {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        B(e)
      );
    }
    function getVerifCode3(lic) {
      var myRegArray = lic.split("*");
      if (myRegArray.length == 4) {
        var myLcns = myRegArray[3].replace(/^[0-9]+/, "");
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
          myLcns;
        var tempKey = code[0].substring(2, code[0].length - 2);
        var nameEncode = string_encode3(name);
        var key = nameEncode * e.privateNumber;
        if (key == tempKey) {
          return "1";
        } else {
          return "0";
        }
      } else {
        return "0";
      }
    }
    function K() {
      (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p(""));
      var e = z(wt) ? ne + "@REMOTE" : "";
      delLic();
      return (
        (wt = p("-" + e)),
        (theLicense = false),
        alert(Z + ": " + Qe),
        z(wt) || (V(it, at, U("bad")), V(it, ot, Q), V(it, lt, Y)),
        theLicense
      );
    }
    function _(e) {
      if (!F() || A() || (alert(Ne), app.executeCommand(2359), A())) {
        if (oe && n(se, le)) {
          "l" == e && alert(Se);
        } else {
          if ("l" == e || "c" == e || "r" == e) {
            var i = false;
            if (("l" == e && me && c(), 2 == Le)) {
              if ("r" == e) {
                r = K();
              } else {
                if (((wt = p("")), m(wt.result) && !b(wt.result))) {
                  return true;
                }
                "" == (t = P()) &&
                  ((i = true), (t = z(wt) ? "@REMOTE" : "trial"));
                r = C(i, t, X);
              }
            } else {
              M(it, at)
                ? ((t = I(it, at)),
                  (i = !(
                    "c" == e ||
                    !(("bad" == t || "bad" == D(t) || ie) && "trial" == D(t))
                  )))
                : "c" == e
                  ? (V(it, at, U((t = ie ? "trial" : ""))),
                    V(it, ot, Q),
                    V(it, lt, Y),
                    (i = false))
                  : (i = true);
              r = C(i, t, X);
            }
            return r;
          }
        }
      }
    }
    function logInfoDev(Txt) {
      var file = new File("~/Desktop/ScriptLog.txt");
      file.open("e", "TEXT", "????");
      file.seek(0, 2);
      $.os.search(/windows/i) != -1
        ? (file.lineFeed = "windows")
        : (file.lineFeed = "macintosh");
      file.writeln(Txt);
      file.close();
    }
    var sku = e.productSKU.toString().split("-");
    var Y = "3.0.5";
    void 0 == e.scriptName &&
      alert("scriptName variable missing in settings object");
    var Z = e.scriptName;
    void 0 == e.scriptVersion &&
      alert("scriptVersion variable missing in settings object");
    var Q = e.scriptVersion;
    void 0 == e.scriptURL &&
      alert("scriptURL variable missing in settings object");
    var H = e.scriptURL;
    void 0 == e.privateNumber &&
      alert("privateNumber variable missing in settings object");
    var X = e.privateNumber;
    void 0 == e.productSKU &&
      alert("productSKU variable missing in settings object");
    var ee = e.productSKU;
    var te = ee.toString().split("-");
    if (null == te || 2 != te.length) {
      return (
        alert(
          "Product SKU incorrectly entered in settings. Should looks like this: XXXX-SUL",
        ),
        false
      );
    }
    var ne = te[0];
    var re = e.hasOwnProperty("betaSupportEmail") ? e.betaSupportEmail : "";
    var ie = e.hasOwnProperty("offerTriaal") && e.offerTrial;
    var ae = e.hasOwnProperty("trialLengthDays") ? e.trialLengthDays : 7;
    var oe = !!e.hasOwnProperty("offerBeta") && e.offerBeta;
    if (oe) {
      void 0 == e.betaStartDate &&
        alert("betaStartDate variable missing in settings object");
      var le = e.betaStartDate;
      void 0 == e.betaExpirationDate &&
        alert("betaExpirationDate variable missing in settings object");
      var se = e.betaExpirationDate;
    }
    var ce =
      e.hasOwnProperty("externalSupportURL") && "" != e.externalSupportURL
        ? e.externalSupportURL
        : "http://aescripts.com/contact";
    oe && "" != re && (ce = re);
    var ue =
      e.hasOwnProperty("externalSupportURL") && "" != e.externalSupportURL
        ? e.externalSupportURL
        : "https://aescripts.com/contact";
    var de = "https://aescripts.com/contact" === ue;
    de && (ue = ue.replace(/\/*/, "") + "/?direct=1&sku=");
    var pe = "https://aescripts.com/downloadable/customer/products";
    var fe =
      e.hasOwnProperty("retrieveLicenseURL") && "" != e.retrieveLicenseURL
        ? e.retrieveLicenseURL
        : pe;
    var he = "https://license.aescripts.com/exchange";
    var ge =
      !!e.hasOwnProperty("useLegacyPrefsHeader") && e.useLegacyPrefsHeader;
    var ve = 7;
    var me = true;
    var be = 7;
    var ze = 3;
    var Le = 2;
    if ($.os.indexOf("Mac") != -1) {
      mx = __BLOB__BLOB_000329__;
    } else {
      wx = __BLOB__BLOB_000330__;
    }
    $.locale = F() ? app.isoLanguage : $.locale;
    var ye = $.locale.split("_")[0];
    ("fr" == ye && "de" == ye && "es" == ye) || (ye = "en");
    var ke = localize({
      de:
        "Du hast eine tempor\xe4re Seriennummer eingegeben, die gegen eine permanente Lizenz eingetauscht werden muss.\n\nSobald Du eine permanente Lizenz erhalten hast, kannst Du sie verwenden um" +
        Z +
        " zu registrieren.  Der Austausch ist schnell und unkompliziert, gehe einfach zu:\n\n" +
        he +
        "\n\nWillst Du jetzt dorthin gehen?",
      en:
        "You entered a temporary serial number that needs to be exchanged for a permanent license.\n\nOnce you obtain your permanent license you can use it to register " +
        Z +
        ".  It is quick and easy to exchange it, simply go to:\n\n" +
        he +
        "\n\nWould you like to go there now?",
      es:
        "Ha introducido un n\xfamero de serie provisional que necesita ser sustituido por una licencia permanente.\n\nUna vez obtenga una licencia permamente puede usarla para registrar " +
        Z +
        ". Reemplazarla es r\xe1pido y sencillo, simplemente vaya a:\n\n" +
        he +
        "\n\n\xbfQuiere ir all\xed ahora?",
      fr:
        "Vous avez entr\xe9 un num\xe9ro de s\xe9rie temporaire devant \xeatre \xe9chang\xe9 contre une licence permanente.\n\nUne fois votre licence permanente acquise, vous pouvez l\'utiliser pour vous enregistrer " +
        Z +
        ".  Le changement est rapide et facile,  allez simplement \xe0:\n\n" +
        he +
        "\n\nVoulez-vous y aller maintenant?",
    });
    var Se =
      (localize({
        de:
          "Die Testversion des Skriptes ist leider abgelaufen.\nDu kannst unter " +
          H +
          " eine Lizenz erwerben.\n\nM\xf6chtest Du jetzt dorthin gehen?",
        en:
          "Sorry, this trial version of the script has expired. \nYou can purchase a license at " +
          H +
          "\n\nWould you like to go there now?",
        es:
          "Lo siento, esta versi\xf3n de prueba del script ha expirado.\nPuede obtener una licencia en" +
          H +
          "\n\n\xbfQuiere ir all\xed ahora?",
        fr:
          "D\xe9sol\xe9, la p\xe9riode d\'essai du script a expir\xe9.\nPour acheter une licence, veuillez vous rendre sur la page " +
          H +
          "\n\nVoulez-vous ouvrir cette page maintenant ?",
      }),
      localize({
        de: "Die Betaversion des Skriptes ist leider abgelaufen",
        en: "Sorry, this beta version of the script has expired",
        es: "Lo siento est\xe1 versi\xf3n beta del script ha expirado",
        fr: "D\xe9sol\xe9, la p\xe9riode beta du script a expir\xe9",
      }));
    var we = localize({
      de:
        "Beta Lizenzcode erkannt f\xfcr " +
        Z +
        "\nBeta Lizenzen k\xf6nnen nur f\xfcr Betaversionen verwendet werden. Bitte verwende eine normale Lizenz f\xfcr diese Version.",
      en:
        "Beta license code detected for " +
        Z +
        "\nBeta license codes can only be used on beta versions, please obtain a normal license to use this version.",
      es:
        "Licencia beta detectada para " +
        Z +
        "\nLas licencias beta s\xf3lo pueden ser usadas con versiones beta, por favor obtenga una licencia normal para usar esta versi\xf3n.",
      fr:
        "Licence beta d\xe9tect\xe9e pour " +
        Z +
        "\nLes codes pour licence beta ne peuvent \xeatre utilis\xe9s que pour les versions beta, merci de demander une licence r\xe9guli\xe8re pour utiliser cette version.",
    });
    var xe =
      (localize({
        de: "F\xfcr diese Betaversion wird eine Lizenz ben\xf6tigt.\nBitte kontaktiere den Autor f\xfcr eine Betatester-Lizenz.",
        en: "A license is required to run this beta version\nPlease contact the author for a beta testing license.",
        es: "Es necesaria una licencia para utilizar esta versi\xf3n beta.\nPor favor, p\xf3ngase en contacto con el autor para obtener una licencia beta.",
        fr: "Une licence est requise pour ex\xe9cuter cette version beta\nMerci de contacter l\'auteur pour une licence beta de test.",
      }),
      localize({
        de: "f\xfcr %u Nutzer",
        en: "for %u user",
        es: "para %u usuario",
        fr: "pour %u utilisateur",
      }));
    var Ce = localize({
      de: "Registrierung erfolgreich " + xe,
      en: "Registration successful " + xe,
      es: "Registro completado " + xe,
      fr: "Enregistrement r\xe9ussi " + xe,
    });
    var Pe = localize({
      de: "Danke f\xfcr den Kauf von " + Z,
      en: "Thank you for purchasing " + Z,
      es: "Gracias por comprar " + Z,
      fr: "Merci d\'avoir achet\xe9 " + Z,
    });
    var De = localize({
      de: "Entschuldigung, der Lizenzcode ist nicht g\xfcltig.",
      en: "Sorry, the license code is not valid",
      es: "Lo siento, la licencia no es v\xe1lida",
      fr: "D\xe9sol\xe9, ce num\xe9ro de licence n\'est pas valide.",
    });
    var Ue =
      (localize({
        de: "Eine Firewall oder ein Antivirus-Programm blockiert den Lizenz-Prozess. Bitte deaktiviere das Antivirus-Programm oder konfiguriere das System so, dass die Lizenz verifiziert werden kann.",
        en: "A firewall or virus protection software is blocking the licensing process.  Please disable this or configure it to allow this process so that the license can be verified.",
        es: 'Un software de "firewall" o de protecci\xf3n antivirus est\xe1 bloqueando el proceso de concesi\xf3n de licencias. Desactivela o configurela para permitir este proceso para que la licencia puede ser verificada.',
        fr: "Un logiciel pare-feu ou un logiciel antivirus bloque le processus de v\xe9rification de licence. Veuillez le d\xe9sactiver ou le configurer pour permettre \xe0 ce processus de v\xe9rifier la licence.",
      }),
      localize({
        de: "Wenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + ce,
        en: "If you require assistance please contact " + ce,
        es: "Si necesita ayuda, por favor contacte " + ce,
        fr: "Si vous avez besoin d\'aide, merci de contacter " + ce,
      }));
    var Ae =
      (localize({
        de:
          "Entschuldigung, irgendetwas ist mit dem " +
          Z +
          " Lizenzcode passiert. Bitte gebe ihn erneut ein.\n\n" +
          Ue,
        en:
          "Sorry, something must have happened to the " +
          Z +
          " license code.  Please re-enter it at the prompt.\n" +
          Ue,
        es:
          "Lo siento, algo ha ocurrido con la licencia de " +
          Z +
          ". Por favor, vuelva a introducirla en la casilla.\n" +
          Ue,
        fr:
          "D\xe9sol\xe9, il y a eu un probl\xe8me avec le num\xe9ro de licence pour " +
          Z +
          ". Merci de bien vouloir le saisir \xe0 nouveau.n\n" +
          Ue,
      }),
      localize({
        de: "Danke, dass Du " + Z + " ausprobierst!",
        en: "Thanks for trying " + Z + "!",
        es: "\xa1Gracias por probar " + Z + "!",
        fr: "Merci d\'avoir essay\xe9 " + Z + "!",
      }),
      localize({
        de: "Testversion - noch %E Tage g\xfcltig",
        en: "Trial version - %E days left",
        es: "Versi\xf3n de prueba - faltan %E d\xedas",
        fr: "Version d\'\xe9valuation - %E jour(s) restant",
      }));
    var Oe =
      (localize({
        de: "%E Programmstarts \xfcbrig f\xfcr die Testversion",
        en: "%E launches left in the trial",
        es: "%E usos restantes de la versi\xf3n de prueba",
        fr: "Il vous reste %E essais",
      }),
      localize({
        de: "Willkommen bei " + Z,
        en: "Welcome to " + Z,
        es: "Bienvenido a " + Z,
        fr: "Bienvenue sur " + Z,
      }));
    var Be = localize({ de: "OK", en: "OK", es: "OK", fr: "OK" });
    var Ee = localize({
      de: "Abbrechen",
      en: "Cancel",
      es: "Cancelar",
      fr: "Annuler",
    });
    var Fe = localize({
      de: "Support zu erhalten",
      en: "Get support",
      es: "Obtener apoyo",
      fr: "Contacter le support client",
    });
    var Ge = localize({
      de: "Lizenz vergessen?",
      en: "Retrieve License",
      es: "Recuperar licencia",
      fr: "Retrouver votre Licence",
    });
    var Te = localize({
      de: "Lizenz Kaufen",
      en: "Buy License",
      es: "Compra licencia",
      fr: "Acheter une licence",
    });
    var Re = localize({
      de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
      en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
      es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
      fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
    });
    var Ne = localize({
      de: 'Dieses Skript ben\xf6tigt die Erlaubnis Dateien zu schreiben.\n Gehe in Voreinstellungen von After Effects in die Rubrik "Allgemein" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
      en: 'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
      es: 'Este script necesita poder escribir archivos.\nVaya al panel "General" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
      fr: 'Ce script n\xe9cessite les droits d\'\xe9criture de fichiers.\nAllez dans le panneau "G\xe9n\xe9ral" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
    });
    var Ie =
      (localize({
        de: Z + " Lizenz-Update ben\xf6tigt",
        en: Z + " License Update Required",
        es: Z + " necesita actualizar la licencia",
        fr: "La licence de " + Z + " doit \xeatre mise \xe0 jour",
      }),
      localize({
        de: "Alle Deine Lizenzen findest Du unter \'My Downloads & Licenses\' in Deinem aescripts.com Benutzer-Account.\n\nWillst Du jetzt dorthin gehen?",
        en: "All your licenses are in the \'My Downloads & Licenses\' section of your aescripts.com user account.\n\nWould you like to go there now?",
        es: "Todas sus licencias est\xe1n en la secci\xf3n \'My Downloads & Licenses\' de su cuenta de usuario en aescripts.com.\n\n\xbfQuiere ir all\xed ahora?",
        fr: "Toutes vos licences se trouvent dans la section \'My Downloads & Licenses\' de votre compte utilisateur sur aescripts.com.\n\nVoulez-vous y aller maintenant?",
      }));
    var Me =
      (localize({
        de: "Die Lizenz sollte so aussehen:\n\nFirstname**Lastname**111111111SUL",
        en: "License should look like this:\n\nFirstname**Lastname**111111111SUL",
        es: "La licencia debe tener este aspecto:\n\nNombre**Apellido**111111111SUL",
        fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPr\xe9nom**Nom**111111111SUL",
      }),
      localize({
        de: "Die Lizenz sollte so aussehen:\n\nZDGALAXY*FIRSTNAME*LASTNAME*1111111SUL1",
        en: "License should look like this:\n\nZDGALAXY*FIRSTNAME*LASTNAME*1111111SUL1",
        es: "La licencia debe tener este aspecto:\n\nZDGALAXY*NOMBRE*APELLIDO*1111111SUL1",
        fr: "Votre licence doit \xeatre similaire \xe0 : \n\nZDGALAXY*PRENOM*NOM*1111111SUL1",
      }));
    var Ve = localize({
      de: "Registriert f\xfcr: ",
      en: "Registered to: ",
      es: "Registrado a: ",
      fr: "Enregistr\xe9 pour: ",
    });
    var je =
      (localize({
        de:
          "Es gab einen unerwarteten Fehler\nBitte \xf6ffne hier ein Support-Ticket:\n" +
          ce +
          "\nund f\xfcge einen Screenshot der Fehlermeldung bei\n\n",
        en:
          "There was an unexpected error\nPlease please open a support ticket here:\n" +
          ce +
          "\nand submit screenshot of this error message\n\n",
        es:
          "Se ha producido un error desconocido\nPor favor habra un ticket de soporte aqui:\n" +
          ce +
          "\ny presente una captura de pantalla con este mensaje de error\n\n",
        fr:
          "Une erreur vient de se produire \nVeuillez ouvrir un ticket de service client \xe0 cette adresse:\n" +
          ce +
          "\net n\'oubliez pas d\'y joindre une capture d\'\xe9cran de ce message\n\n",
      }),
      localize({
        de: "Dieser Lizenz-Code ist f\xfcr ein anderes Produkt, bitte stelle sicher, dass du den richtigen Lizenzcode eingibst\n\n",
        en: "This license code is for a different product, please double check that you are entering the correct license\n\n",
        es: "Este c\xf3digo de licencia es para un producto diferente, por favor, comprobar que esta introduciendo la licencia correcta\n\n",
        fr: "Vous venez d\'entrer la cl\xe9 de licence d\'un autre produit, assurez-vous d\'utiliser la bonne cl\xe9 de licence\n\n",
      }));
    var qe = localize({
      de: Z + " Update verf\xfcgbar",
      en: Z + " Update Available",
      es: Z + " Actualizaci\xf3n disponible",
      fr: Z + " Mise \xe0 jour disponible",
    });
    var We = localize({
      de:
        "Eine neuere Version von " +
        Z +
        " ist verf\xfcgbar: v%\n\nWenn Sie gerne auf deiner Downloadseite bei aescripts.com gehen kannst, um sie herunterzuladen?",
      en:
        "A newer version of " +
        Z +
        " is available: %v\n\nWould you like to go to your downloads page at aescripts.com to download it?",
      es:
        "Una versi\xf3n nueva de " +
        Z +
        " est\xe1 disponible: v%\n\n\xbfQuieres ir a la p\xe1gina de descargas de aescripts.com para descargarla?",
      fr:
        "Une version plus de " +
        Z +
        " est disponible: v%\n\nVous souhaitez acc\xe9der \xe0 votre page de t\xe9l\xe9chargements chez aescripts.com pour la t\xe9l\xe9charger?",
    });
    var $e = localize({
      de: "Download",
      en: "Download",
      es: "Descargar",
      fr: "T\xe9l\xe9charger",
    });
    var Ke = localize({
      de: "Diese Version \xdcberspringen",
      en: "Skip this Version",
      es: "Salta esta versi\xf3n",
      fr: "Ignorer cette version",
    });
    var _e = localize({
      de: "Erinnere mich sp\xe4ter",
      en: "Remind Me Later",
      es: "Recu\xe9rdame m\xe1s tarde",
      fr: "Rappelle-moi plus tard",
    });
    var Je =
      (localize({
        de: "Neueste verf\xfcgbare Version",
        en: "Newest available version",
        es: "Versi\xf3n mas nueva disponible",
        fr: "Nouvelle version disponible",
      }),
      localize({
        de: "v%a%b - %c",
        en: "v%a%b - %c",
        es: "v%a%b - %c",
        fr: "v%a%b - %c",
      }));
    var Ye = localize({
      de: "Lizenz Deaktivieren",
      en: "Deactivate License",
      es: "Desactivar Licencia",
      fr: "D\xe9sactiver la licence",
    });
    var Ze = localize({
      de: "Automatisch nach Aktualisierungen suchen",
      en: "Check for updates automatically",
      es: "Revisar actualizaciones automaticamente",
      fr: "V\xe9rifier les mises \xe0 jour automatiquement",
    });
    var Qe =
      (localize({
        de: "Ung\xfcltige Lizenz",
        en: "Invalid license",
        es: "La licencia no es v\xe1lida",
        fr: "Licence non valide",
      }),
      localize({
        de: "Lizenz entfernt",
        en: "License removed",
        es: "Licencia eliminada",
        fr: "Licence supprim\xe9e",
      }));
    var He = localize({
      de: "Lizenz",
      en: "License",
      es: "Licencia",
      fr: "Licence",
    });
    var Xe = localize({
      de: "Beta-Lizenz",
      en: "Beta License",
      es: "Licencia Beta",
      fr: "Licence Beta",
    });
    var et = localize({
      de: "EDU-Lizenz",
      en: "Educational License",
      es: "Licencia Educacional",
      fr: "T\xe9l\xe9charger",
    });
    var tt = localize({
      de: "Floating-Lizenz",
      en: "Floating License",
      es: "Licencia flotante",
      fr: "Licence flottante",
    });
    var nt =
      (localize({
        de: "License mit unbekanntem Typ",
        en: "License of unknown type",
        es: "Licencia de tipo desconocido",
        fr: "Licence inconnue",
      }),
      localize({
        de: "Gedeactiveerd ",
        en: "Deactivated",
        es: "Desactivado",
        fr: "D\xe9sactiv\xe9",
      }));
    var rt = {
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
        "-101": { detail: "", title: "Konnte Ergebnis nicht parsen (-101)" },
        "-102": { detail: "", title: "Kein Ergebnis (-102)" },
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
          title: "Trial expired",
        },
        "-101": { detail: "", title: "Could not parse result (-101)" },
        "-102": { detail: "", title: "No result code (-102)" },
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
          detail: "",
          title: "No se pudo analizar el resultado (-101)",
        },
        "-102": { detail: "", title: "No hay c\xf3digo de resultado (-102)" },
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
          detail: "",
          title: "Impossible de parcourir le r\xe9sultat (-101)",
        },
        "-102": { detail: "", title: "Pas de code de r\xe9sultat (-102)" },
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
          detail: "Verifiez que le serveur de licence fonctionne correctement",
          title: "Impossible de se connecter au serveur (-9)",
        },
        "-99": { detail: "", title: "Erreur inconnue (-99)" },
        unknown: { detail: "", title: "Erreur inconnue (0)" },
      },
    };
    var it = e.hasOwnProperty("legacyPrefsGroup")
      ? e.legacyPrefsGroup
      : "aescripts";
    var at = ge ? Z : ne + "_Registration";
    var ot = ne + "_Version";
    var lt = ne + "_LicVersion";
    var st = ne + "_VersionCheckInit";
    var ct = ne + "_LastVersionChecked";
    var ut = ne + "_LastServerVersionChecked";
    var dt = ne + "_LastTimeVersionChecked";
    var pt = ne + "_NextTimeVersionChecked";
    var ft = ne + "_NextTimeVersionCheckedStatus";
    var ht = ne + "_doUpdateCheck";
    M(it, ht) && (me = !("false" == I(it, ht)));
    gt = -1 != $.os.indexOf("Mac") ? "cmd" : "Ctrl";
    var vt = localize({
      de: "Bitte gebe den Lizenzcode ein.",
      en: "Please enter the license code.",
      es: "Por favor, introduzca el c\xf3digo de licencia.",
      fr: "Veuillez entrer votre num\xe9ro de licence.",
    });
    var mt = localize({
      de:
        "(Wenn das Einf\xfcgen mit " +
        gt +
        "+V nicht funktioniert, versuche Bearbeiten->Einf\xfcgen.)",
      en:
        "(If pasting the code with " +
          gt +
          "+V doesn\'t work try " +
          parseFloat(app.version) >=
        10
          ? "Right-Click and Paste)"
          : "Edit->Paste)",
      es:
        "(Si pegar la licencia usando " +
          gt +
          "+V no funciona, pruebe " +
          parseFloat(app.version) >=
        10
          ? "Clic derecho y pegar)"
          : "Edici\xf3n->Pegar)",
      fr:
        "(Si vous ne parvenez pas \xe0 coller le code avec " +
          gt +
          "+V essayez " +
          parseFloat(app.version) >=
        10
          ? "Clique droit et Coller)"
          : "Edition->Coller)",
    });
    var bt = localize({
      de: 'Um die Testversion zu starten, gebe "trial" ein.',
      en: "To run in trial mode type: trial\n",
      es: "Para ejecutar el modo Trial, escriba: trial\n",
      fr: "Pour lancer la version de d\xe9monstration, tapez : trial\n",
    });
    var zt = localize({
      de: "Aktivieren Sie eine Lizenz vom Server mit @REMOTE\n",
      en: "Activate a license from the server with @REMOTE\n",
      es: "Activar una licencia del servidor con @REMOTE\n",
      fr: "Activer une licence du serveur avec @REMOTE\n",
    });
    var Lt =
      ((
        w(
          Math.floor(parseFloat(app.version))
            .toString()
            .charAt(
              Math.max(
                0,
                Math.floor(parseFloat(app.version)).toString().length - 1,
              ),
            ) +
            Z.substring(Math.max(0, Z.length - 15), Z.length) +
            Q,
        ) *
        0.457 *
        X
      ).toString(36),
      (
        w(
          Math.floor(parseFloat(app.version))
            .toString()
            .charAt(
              Math.max(
                0,
                Math.floor(parseFloat(app.version)).toString().length - 1,
              ),
            ) +
            Z.substring(Math.max(0, Z.length - 15), Z.length) +
            Q,
        ) *
        (X / 3.981)
      ).toString(36),
      Folder.userData.fsName + "/Aescripts/");
    var yt = "pref_";
    F() || Folder(Lt).exists || Folder(Lt).create();
    !(function (e) {
      e.toString().replace(/[^a-z0-9]/gi, "");
    })(Z);
    this.getSetting = function (e, t) {
      return ((J = "settings"), (e = ne + "_" + e), I(e, t));
    };
    this.haveSetting = function (e, t) {
      return ((J = "settings"), (e = ne + "_" + e), M(e, t));
    };
    this.saveSetting = function (e, t, n) {
      return ((J = "settings"), (e = ne + "_" + e), V(e, t, n));
    };
    this.c = function () {
      return _("l");
    };
    this.s = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        m(wt.result)
      );
    };
    this.r = function () {
      return _("r");
    };
    this.t = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        b(wt.result)
      );
    };
    this.l = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        wt.license
      );
    };
    this.ss = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        m(wt.result) && !b(wt.result)
      );
    };
    this.vt = function () {
      return (
        (void 0 !== wt && wt.hasOwnProperty("result")) || (wt = p("")),
        m(wt.result) && b(wt.result)
      );
    };
    this.helpUI = function (e) {
      r();
    };
    this.getRegistration = function (e) {
      return W(e);
    };
    this.openSupportTicket = function (e) {
      a(e);
    };
    this.openURL = function (e) {
      O(e);
    };
    this.doUpdateCheck = function (e) {
      l(e);
    };
    this.getUpdateCheckStatus = function () {
      return me;
    };
    this.frameworkVersion = function () {
      return Y;
    };
  }
  var n8 = new b(ab_settings);
  if (n8.c()) {
    function isTheOnlySelectedLayer(maCompActive) {
      var maSelectionDeCalques = maCompActive.selectedLayers;
      if (maSelectionDeCalques.length == 1) {
        return true;
      } else if (maSelectionDeCalques.length == 0) {
        alert("Please select a layer before applying this effect.");
        return;
      } else {
        alert("Please select 1 layer only for this effect.");
        return;
      }
    }
    function detect() {
      var touches = "";
      var etatDesTouchesSurLeClavier = ScriptUI.environment.keyboardState;
      if (etatDesTouchesSurLeClavier.altKey) {
        touches += "alt";
      }
      return touches;
    }
    function isNotAlreadyApplied(leCalqueATester, nomDeLeffetATester) {
      if (
        leCalqueATester
          .property("ADBE Effect Parade")
          .property(nomDeLeffetATester) === null
      ) {
        return true;
      } else {
        alert(nomDeLeffetATester + " alreay applied.");
        return;
      }
    }
    function isApplied(leCalqueATester, nomDeLeffetATester) {
      if (
        leCalqueATester
          .property("ADBE Effect Parade")
          .property(nomDeLeffetATester) === null
      ) {
        return;
      } else {
        return true;
      }
    }
    function hexToArray(hexString) {
      var hexColor = hexString.replace("#", "");
      var r = parseInt(hexColor.slice(0, 2), 16) / 255;
      var g = parseInt(hexColor.slice(2, 4), 16) / 255;
      var b = parseInt(hexColor.slice(4, 6), 16) / 255;
      return [r, g, b, 1];
    }
    function vecToPoints(vecCoord) {
      var points = [];
      for (var i = 0; i < vecCoord.length; i += 1) {
        var eachNum = vecCoord[i].split(/[\s,]/);
        var coordinates = [];
        var sets = [];
        for (var k = 0; k < eachNum.length; k += 2) {
          sets.push(eachNum[k] + "," + eachNum[k + 1]);
        }
        for (var j = 0; j < sets.length; j += 1) {
          n = sets[j].split(",");
          coordinates[j] = n;
          coordinates[j][0] = parseFloat(coordinates[j][0]);
          coordinates[j][1] = parseFloat(coordinates[j][1]);
        }
        points.push(coordinates);
      }
      return points;
    }
    function vecDraw() {
      this.graphics.drawOSControl();
      this.graphics.rectPath(0, 0, this.size[0], this.size[1]);
      this.graphics.fillPath(
        this.graphics.newBrush(
          this.graphics.BrushType.SOLID_COLOR,
          [0, 0, 0, 0.15],
        ),
      );
      try {
        for (var i = 0; i < this.coord.length; i += 1) {
          var line = this.coord[i];
          this.graphics.newPath();
          this.graphics.moveTo(
            line[0][0] + (this.size[0] / 2 - this.artSize[0] / 2),
            line[0][1] + (this.size[1] / 2 - this.artSize[1] / 2),
          );
          for (var j = 0; j < line.length; j += 1) {
            this.graphics.lineTo(
              line[j][0] + (this.size[0] / 2 - this.artSize[0] / 2),
              line[j][1] + (this.size[1] / 2 - this.artSize[1] / 2),
            );
          }
          this.graphics.fillPath(
            this.graphics.newBrush(
              this.graphics.BrushType.SOLID_COLOR,
              hexToArray(this.iconColor),
            ),
          );
        }
      } catch (e) {}
    }
    function buttonColorVector(parentObj, iconVec, size, staticColor) {
      var btn = parentObj.add("button", [0, 0, size[0], size[1]], undefined);
      btn.coord = vecToPoints(iconVec);
      btn.iconColor = staticColor;
      btn.artSize = size;
      btn.onDraw = vecDraw;
      return btn;
    }
    function renamePseudoEffect(layer, pseudoEffectName) {
      effectsProperty = layer.property("ADBE Effect Parade");
      for (var i = 1, il = effectsProperty.numProperties; i <= il; i++) {
        if (effectsProperty.property(i).name === "") {
          effectsProperty.property(i).name = pseudoEffectName;
        }
      }
    }
    function perfectLoop() {
      var comp = app.project.activeItem;
      var layers = comp.selectedLayers;
      if (layers == undefined || layers == null || layers == 0) {
        alert("Select 1+ properties or paths.");
        return;
      }
      for (var layer = 0; layer < layers.length; layer += 1) {
        var props = layers[layer].selectedProperties;
        for (var p = 0; p < props.length; p += 1) {
          if (!(props[p] instanceof PropertyGroup)) {
            var prop = props[p];
            var myExpr =
              "//LoopMaster - Perfect Loop\nif (numKeys >1 && time > key(numKeys).time){t1 = key(1).time;t2 = key(numKeys).time;span = t2 - t1;delta = time - t2;t = delta%span;valueAtTime(t1 + t)} else {value}";
            prop.expression = myExpr;
          }
        }
      }
    }
    function twoDwiggleCC() {
      var maComp = app.project.activeItem;
      var monCalqueCheck = maComp.selectedLayers[0];
      if (monCalqueCheck == undefined) {
        alert("Select 1+ layer(s).");
        return;
      }
      var nomEffetTest = "LoopMaster - 2D Wiggle";
      var matchName = "Pseudo/LoopMaster_2D_wiggle_CC";
      var selectedArray = [];
      for (var i = 0; i < maComp.selectedLayers.length; i += 1) {
        selectedArray.push(maComp.selectedLayers[i].index);
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        maComp.layer(selectedArray[i]).selected = false;
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        monCalque.selected = true;
        if (isNotAlreadyApplied(monCalque, nomEffetTest)) {
          PseudoEffect.applyByMatchName(monCalque, matchName);
          renamePseudoEffect(monCalque, nomEffetTest);
          var exprPosition =
            "// LoopMaster - 2D Wiggle Position CC\nstop_motion = effect(\'LoopMaster - 2D Wiggle\')(\'Position FPS\');posterizeTime(stop_motion);wiggleSpeed = effect(\'LoopMaster - 2D Wiggle\')(\'Position Speed\');wiggleStrength = effect(\'LoopMaster - 2D Wiggle\')(\'Position Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t);wiggle2 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t - loopTime);x = linear(t, 0, loopTime, wiggle1, wiggle2)[0];y = linear(t, 0, loopTime, wiggle1, wiggle2)[1];ax = thisLayer(\'ADBE Transform Group\')(\'ADBE Position\').value.length;dimension = effect(\'LoopMaster - 2D Wiggle\')(\'Position Axis\');if(dimension == 1 && ax==2){\t[x,y];}else if (dimension == 2 && ax==2){\t[x,value[1]];}else if (dimension == 3 && ax==2){\t[value[0],y]}";
          var exprScale =
            "// LoopMaster - 2D Wiggle Scale CC\nstop_motion = effect(\'LoopMaster - 2D Wiggle\')(\'Scale FPS\');posterizeTime(stop_motion);wiggleSpeed = effect(\'LoopMaster - 2D Wiggle\')(\'Scale Speed\');wiggleStrength = effect(\'LoopMaster - 2D Wiggle\')(\'Scale Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t);wiggle2 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t - loopTime);x = linear(t, 0, loopTime, wiggle1, wiggle2)[0];y = linear(t, 0, loopTime, wiggle1, wiggle2)[1];ax = thisLayer(\'ADBE Transform Group\')(\'ADBE Position\').value.length;dimension = effect(\'LoopMaster - 2D Wiggle\')(\'Scale Axis\');if(dimension == 1 && ax==2){\t[x,x];\t}else if (dimension == 2 && ax==2){\t[x,y];\t}else if (dimension == 3 && ax==2){\t[x,value[1]]}else if (dimension == 4 && ax==2){\t[value[0],y]}";
          var exprRotation =
            "// LoopMaster - 2D Wiggle Rotation CC\nstop_motion = effect(\'LoopMaster - 2D Wiggle\')(\'Rotation FPS\');posterizeTime(stop_motion);wiggleSpeed = effect(\'LoopMaster - 2D Wiggle\')(\'Rotation Speed\');wiggleStrength = effect(\'LoopMaster - 2D Wiggle\')(\'Rotation Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t);wiggle2 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t - loopTime);linear(t, 0, loopTime, wiggle1, wiggle2);";
          var exprOpacity =
            "// LoopMaster - 2D Wiggle Opacity CC\nstop_motion = effect(\'LoopMaster - 2D Wiggle\')(\'Opacity FPS\');posterizeTime(stop_motion);wiggleSpeed = effect(\'LoopMaster - 2D Wiggle\')(\'Opacity Speed\');wiggleStrength = effect(\'LoopMaster - 2D Wiggle\')(\'Opacity Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t);wiggle2 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t - loopTime);linear(t, 0, loopTime, wiggle1, wiggle2);";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Position").expression = exprPosition;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Scale").expression = exprScale;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Z").expression = exprRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Opacity").expression = exprOpacity;
        }
      }
    }
    function threeDwiggleCC() {
      var maComp = app.project.activeItem;
      var myLayer = maComp.selectedLayers[0];
      if (myLayer == undefined) {
        alert("Select 1+ layer(s).");
        return;
      }
      var nomEffetTest = "LoopMaster - 3D Wiggle";
      var matchName = "Pseudo/LoopMaster_3D_wiggle";
      var selectedArray = [];
      for (var i = 0; i < maComp.selectedLayers.length; i += 1) {
        selectedArray.push(maComp.selectedLayers[i].index);
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        maComp.layer(selectedArray[i]).selected = false;
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        monCalque.selected = true;
        if (isNotAlreadyApplied(monCalque, nomEffetTest)) {
          PseudoEffect.applyByMatchName(monCalque, matchName);
          renamePseudoEffect(monCalque, nomEffetTest);
          monCalque.threeDLayer = true;
          var exprPosition =
            "// LoopMaster - 3D Wiggle Position CC\nstop_motion = effect(\'LoopMaster - 3D Wiggle\')(\'Position FPS\');posterizeTime(stop_motion);wiggleSpeed = effect(\'LoopMaster - 3D Wiggle\')(\'Position Speed\');wiggleStrength = effect(\'LoopMaster - 3D Wiggle\')(\'Position Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t);wiggle2 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t - loopTime);x = linear(t, 0, loopTime, wiggle1, wiggle2)[0];y = linear(t, 0, loopTime, wiggle1, wiggle2)[1];z = linear(t, 0, loopTime, wiggle1, wiggle2)[2];ax = thisLayer(\'ADBE Transform Group\')(\'ADBE Position\').value.length;dimension = effect(\'LoopMaster - 3D Wiggle\')(\'Position Axis\');if((dimension == 1 || dimension == 2) && ax==2){\t[x,y];\t}else if (dimension == 3 && ax==2){\t[x,value[1]];}else if (dimension == 4 && ax==2){\t[value[0],y]}else if (dimension == 5 && ax==2){\t[value[0],value[1]]}else if (dimension == 1 && ax==3){\t[x,y,z];}else if (dimension == 2 && ax==3){\t[x,y,value[2]];}else if (dimension == 3 && ax==3){\t[x,value[1],value[2]];}else if (dimension == 4 && ax==3){\t[value[0],y,value[2]];}else {\t[value[0],value[1],z];}";
          var exprScale =
            "// LoopMaster - 3D Wiggle Scale CC\nstop_motion = effect(\'LoopMaster - 3D Wiggle\')(\'Scale FPS\');posterizeTime(stop_motion);wiggleSpeed = effect(\'LoopMaster - 3D Wiggle\')(\'Scale Speed\');wiggleStrength = effect(\'LoopMaster - 3D Wiggle\')(\'Scale Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t);wiggle2 = wiggle(wiggleSpeed, wiggleStrength, 1, 0.5, t - loopTime);x = linear(t, 0, loopTime, wiggle1, wiggle2)[0];y = linear(t, 0, loopTime, wiggle1, wiggle2)[1];z = linear(t, 0, loopTime, wiggle1, wiggle2)[2];ax = thisLayer(\'ADBE Transform Group\')(\'ADBE Position\').value.length;dimension = effect(\'LoopMaster - 3D Wiggle\')(\'Scale Axis\');if((dimension == 1 || dimension == 2) && ax==2){\t[x,y];\t}else if (dimension == 3 && ax==2){\t[x,value[1]];}else if (dimension == 4 && ax==2){\t[value[0],y]}else if (dimension == 5 && ax==2){\t[value[0],value[1]]}else if (dimension == 1 && ax==3){\t[x,x,value[2]];}else if (dimension == 2 && ax==3){\t[x,y,value[2]];}else if (dimension == 3 && ax==3){\t[x,value[1],value[2]];}else if (dimension == 4 && ax==3){\t[value[0],y,value[2]];}else {\t[value[0],value[1],z];}";
          var exprXRotation =
            "// LoopMaster - 3D Wiggle Rotation CC\nstop_motion = effect(\'LoopMaster - 3D Wiggle\')(\'Rotation FPS\');posterizeTime(stop_motion);speed = effect(\'LoopMaster - 3D Wiggle\')(\'X Speed\');strength = effect(\'LoopMaster - 3D Wiggle\')(\'X Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(speed, strength, 1, 0.5, t);wiggle2 = wiggle(speed, strength, 1, 0.5, t - loopTime);linear(t, 0, loopTime, wiggle1, wiggle2);";
          var exprYRotation =
            "// LoopMaster - 3D Wiggle Rotation CC\nstop_motion = effect(\'LoopMaster - 3D Wiggle\')(\'Rotation FPS\');posterizeTime(stop_motion);speed = effect(\'LoopMaster - 3D Wiggle\')(\'Y Speed\');strength = effect(\'LoopMaster - 3D Wiggle\')(\'Y Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(speed, strength, 1, 0.5, t);wiggle2 = wiggle(speed, strength, 1, 0.5, t - loopTime);linear(t, 0, loopTime, wiggle1, wiggle2);";
          var exprRotation =
            "// LoopMaster - 3D Wiggle Rotation CC\nstop_motion = effect(\'LoopMaster - 3D Wiggle\')(\'Rotation FPS\');posterizeTime(stop_motion);speed = effect(\'LoopMaster - 3D Wiggle\')(\'Z Speed\');strength = effect(\'LoopMaster - 3D Wiggle\')(\'Z Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(speed, strength, 1, 0.5, t);wiggle2 = wiggle(speed, strength, 1, 0.5, t - loopTime);linear(t, 0, loopTime, wiggle1, wiggle2);";
          var exprOpacity =
            "// LoopMaster - 3D Wiggle Opacity CC\nstop_motion = effect(\'LoopMaster - 3D Wiggle\')(\'Opacity FPS\');posterizeTime(stop_motion);speed = effect(\'LoopMaster - 3D Wiggle\')(\'Opacity Speed\');strength = effect(\'LoopMaster - 3D Wiggle\')(\'Opacity Strength\');loopTime = thisComp.duration;t = time % loopTime;wiggle1 = wiggle(speed, strength, 1, 0.5, t);wiggle2 = wiggle(speed, strength, 1, 0.5, t - loopTime);linear(t, 0, loopTime, wiggle1, wiggle2);";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Position").expression = exprPosition;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Scale").expression = exprScale;
          monCalque.xRotation.expression = exprXRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Y").expression = exprYRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Z").expression = exprRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Opacity").expression = exprOpacity;
        }
      }
    }
    function spin2D() {
      var maComp = app.project.activeItem;
      var monCalque = maComp.selectedLayers[0];
      if (monCalque == undefined || monCalque == null) {
        alert("Select 1+ layer(s).");
        return;
      }
      var nomEffetTest = "LoopMaster - 2D Spin";
      var matchName = "Pseudo/LoopMaster_2D_Spin_8";
      if (isNotAlreadyApplied(monCalque, nomEffetTest)) {
        var originalPosition = monCalque
          .property("ADBE Transform Group")
          .property("ADBE Position").value;
        PseudoEffect.applyByMatchName(monCalque, matchName);
        renamePseudoEffect(monCalque, nomEffetTest);
        var exprAnchor =
          "// LoopMaster - 2D Spin\ndistance = effect(\'LoopMaster - 2D Spin\')(\'Distance from Origin\');[value[0],value[1]+distance]";
        var exprRotation =
          "// LoopMaster - 2D Spin\nposterizeTime(effect(\'LoopMaster - 2D Spin\')(\'FPS\'));startAngle = effect(\'LoopMaster - 2D Spin\')(\'Start Angle\');loopSpeed = effect(\'LoopMaster - 2D Spin\')(\'Speed\');loopTime = thisComp.duration;startAngle + time*(360/loopTime)*loopSpeed";
        var exprPosition =
          "// LoopMaster - 2D Spin\neffect(\'LoopMaster - 2D Spin\')(\'Origin\')";
        monCalque
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point").expression = exprAnchor;
        monCalque
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z").expression = exprRotation;
        monCalque
          .property("ADBE Transform Group")
          .property("ADBE Position").expression = exprPosition;
        var x = maComp.width / 2;
        var y = maComp.height / 2;
        if (originalPosition[0] == 0 && originalPosition[1] == 0) {
        } else {
          monCalque
            .property("ADBE Effect Parade")
            .property(nomEffetTest)
            .property("Origin")
            .setValue([x, y]);
        }
        if (monCalque instanceof ShapeLayer) {
          app.executeCommand(10312);
        }
      }
    }
    function orbit3D() {
      var maComp = app.project.activeItem;
      var monCalque = maComp.selectedLayers[0];
      if (monCalque == undefined) {
        alert("Select 1 layer.");
        return;
      }
      var layerName = monCalque.name;
      var originalLayerindex = monCalque.index;
      var nomEffetTest = "LoopMaster - 3D Orbit";
      var matchName = "Pseudo/LoopMaster_3D_Orbit_6";
      var maStr = "Orbit";
      if (isTheOnlySelectedLayer(maComp)) {
        if (
          monCalque.parent != null &&
          monCalque.threeDLayer == true &&
          monCalque.property("ADBE Transform Group").property("ADBE Position")
            .expression != ""
        ) {
          alert("There\'s already a similar effect applied.");
        } else {
          if (monCalque instanceof ShapeLayer) {
            if (
              monCalque.property("ADBE Root Vectors Group").numProperties > 1
            ) {
              alert(
                "You have more than 1 shape in this layer. 3D Orbit is optimized for 1 shape per layer.",
              );
            }
            app.executeCommand(10312);
            var xShape = monCalque
              .property("ADBE Transform Group")
              .property("ADBE Position").value[0];
            var yShape = monCalque
              .property("ADBE Transform Group")
              .property("ADBE Position").value[1];
          } else {
            var originalPosition = monCalque
              .property("ADBE Transform Group")
              .property("ADBE Position").value;
            var x = originalPosition[0];
            var y = originalPosition[1];
            var z = 0;
          }
          monCalque.threeDLayer = true;
          var newNull = maComp.layers.addNull(maComp.duration);
          newNull.source.name = maStr + "_" + layerName;
          newNull.threeDLayer = true;
          newNull.guideLayer = true;
          monCalque.parent = newNull;
          PseudoEffect.applyByMatchName(newNull, matchName);
          renamePseudoEffect(newNull, nomEffetTest);
          newNull.orientation.expression =
            "// LoopMaster - 3D Orbit\ntrajectory = effect(\'LoopMaster - 3D Orbit\')(\'Trajectory\');[value[0],value[1],value[2]+trajectory-90]";
          newNull
            .property("ADBE Transform Group")
            .property("ADBE Rotate Y").expression =
            "// LoopMaster - 3D Orbit\nsp = effect(\'LoopMaster - 3D Orbit\')(\'Speed\');loopTime = thisComp.duration; time*(360/loopTime)*sp";
          newNull
            .property("ADBE Transform Group")
            .property("ADBE Position").expression =
            "// LoopMaster - 3D Orbit\neffect(\'LoopMaster - 3D Orbit\')(\'Origin\')";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Position").expression =
            "// LoopMaster - 3D Orbit\ndistance = thisComp.layer(\'" +
            newNull.name +
            "\').effect(\'LoopMaster - 3D Orbit\')(\'Distance from Origin\');[value[0]+distance,value[1],value[2]]";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Y").expression =
            "// LoopMaster - 3D Orbit\nthisComp.layer(\'" +
            newNull.name +
            "\')(\'ADBE Transform Group\')(\'ADBE Rotate Y\')*-1";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate X").expression =
            "// LoopMaster - 3D Orbit\ncustomOrientation = thisComp.layer(\'" +
            newNull.name +
            "\').effect(\'LoopMaster - 3D Orbit\')(\'On/Off\');" +
            "trajectory = thisComp.layer(\'" +
            newNull.name +
            "\').effect(\'LoopMaster - 3D Orbit\')(\'Trajectory\');" +
            "if(customOrientation>0){" +
            "thisComp.layer(\'" +
            newNull.name +
            "\').effect(\'LoopMaster - 3D Orbit\')(\'Orientation\')" +
            "}else{90-trajectory" +
            "}";
          if (monCalque instanceof ShapeLayer) {
            var shapeLayer = maComp.layer(originalLayerindex + 1);
            shapeLayer
              .property("ADBE Transform Group")
              .property("ADBE Position")
              .setValue([0, 0]);
            shapeLayer.selected = true;
            var selectTransform = shapeLayer
              .property("ADBE Root Vectors Group")
              .property(1)
              .property("ADBE Vector Transform Group");
            selectTransform.property(1).setValue([0, 0]);
            newNull
              .property("ADBE Effect Parade")
              .property(nomEffetTest)
              .property("Origin")
              .setValue([xShape, yShape, 0]);
          } else {
            newNull
              .property("ADBE Effect Parade")
              .property(nomEffetTest)
              .property("Origin")
              .setValue([x, y, z]);
            maComp
              .layer(originalLayerindex + 1)
              .property("ADBE Transform Group")
              .property("ADBE Position")
              .setValue([0, 0, 0]);
          }
        }
      }
    }
    function loopItem() {
      var maComp = app.project.activeItem;
      var layers = maComp.selectedLayers;
      if (layers == undefined || layers == null || layers == 0) {
        alert("Select 1 layer.");
        return;
      }
      for (var i = 0; i < layers.length; i += 1) {
        var layer = layers[i];
        if (!layer.canSetTimeRemapEnabled) {
          return;
        }
        layer.timeRemapEnabled = true;
        var timeRemapProp = layer.property("ADBE Time Remapping");
        var endTime = layer.startTime + layer.source.duration;
        var frameBeforeEnd = endTime - maComp.frameDuration;
        var valueAtStart = timeRemapProp.valueAtTime(layer.startTime, null);
        var valueBeforeEnd = timeRemapProp.valueAtTime(frameBeforeEnd, null);
        var times = [layer.startTime, frameBeforeEnd, endTime];
        var values = [valueAtStart, valueBeforeEnd, valueAtStart];
        timeRemapProp.setValuesAtTimes(times, values);
        timeRemapProp.expression = "loopOut()";
        var workAreaOut = maComp.workAreaStart + maComp.duration;
        layer.inPoint = layer.startTime;
        layer.outPoint = workAreaOut;
      }
    }
    function perfectLoop_remove() {
      var maComp = app.project.activeItem;
      var layers = maComp.selectedLayers;
      for (var layer = 0; layer < layers.length; layer += 1) {
        var props = layers[layer].selectedProperties;
        for (var p = 0; p < props.length; p += 1) {
          if (!(props[p] instanceof PropertyGroup)) {
            var prop = props[p];
            prop.expression = "";
          }
        }
      }
    }
    function twoDwiggleCC_remove() {
      var maComp = app.project.activeItem;
      var nomEffetTest = "LoopMaster - 2D Wiggle";
      var selectedArray = [];
      for (var i = 0; i < maComp.selectedLayers.length; i += 1) {
        selectedArray.push(maComp.selectedLayers[i].index);
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        maComp.layer(selectedArray[i]).selected = false;
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        monCalque.selected = true;
        if (isApplied(monCalque, nomEffetTest)) {
          monCalque
            .property("ADBE Effect Parade")
            .property(nomEffetTest)
            .remove();
          var exprPosition = "";
          var exprScale = "";
          var exprRotation = "";
          var exprOpacity = "";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Position").expression = exprPosition;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Scale").expression = exprScale;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Z").expression = exprRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Opacity").expression = exprOpacity;
        }
      }
    }
    function threeDwiggleCC_remove() {
      var maComp = app.project.activeItem;
      var nomEffetTest = "LoopMaster - 3D Wiggle";
      var selectedArray = [];
      for (var i = 0; i < maComp.selectedLayers.length; i += 1) {
        selectedArray.push(maComp.selectedLayers[i].index);
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        maComp.layer(selectedArray[i]).selected = false;
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        monCalque.selected = true;
        if (isApplied(monCalque, nomEffetTest)) {
          monCalque
            .property("ADBE Effect Parade")
            .property(nomEffetTest)
            .remove();
          var exprPosition = "";
          var exprScale = "";
          var exprXRotation = "";
          var exprYRotation = "";
          var exprRotation = "";
          var exprOpacity = "";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Position").expression = exprPosition;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Scale").expression = exprScale;
          monCalque.xRotation.expression = exprXRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Y").expression = exprYRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Z").expression = exprRotation;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Opacity").expression = exprOpacity;
          monCalque.threeDLayer = false;
        }
      }
    }
    function spin2D_remove() {
      var maComp = app.project.activeItem;
      var nomEffetTest = "LoopMaster - 2D Spin";
      var selectedArray = [];
      for (var i = 0; i < maComp.selectedLayers.length; i += 1) {
        selectedArray.push(maComp.selectedLayers[i].index);
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        maComp.layer(selectedArray[i]).selected = false;
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        monCalque.selected = true;
        if (isApplied(monCalque, nomEffetTest)) {
          monCalque
            .property("ADBE Effect Parade")
            .property(nomEffetTest)
            .remove();
          var exprPosition = "";
          var exprRotation = "";
          var exprAnchor = "";
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Anchor Point").expression = exprAnchor;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Position").expression = exprPosition;
          monCalque
            .property("ADBE Transform Group")
            .property("ADBE Rotate Z").expression = exprRotation;
        }
      }
    }
    function orbit3D_remove() {
      var maComp = app.project.activeItem;
      var myLayer = maComp.selectedLayers[0];
      if (myLayer == undefined) {
        alert("Select 1 layer to remove 3D Orbit.");
        return;
      }
      var selectedArray = [];
      var selectedChildren = [];
      for (var i = 0; i < maComp.selectedLayers.length; i += 1) {
        if (maComp.selectedLayers[i].nullLayer) {
          selectedArray.push(maComp.selectedLayers[i].index);
        }
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        maComp.layer(selectedArray[i]).selected = false;
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        var nullName = monCalque.name;
        selectedChildren.push(nullName);
      }
      for (var j = 0; j < selectedChildren.length; j += 1) {
        nullName = selectedChildren[j];
        var allLayers = maComp.layers;
        for (var k = 0; k < allLayers.length; k += 1) {
          var id = k + 1;
          if (maComp.layer(id).parent != null) {
            if (maComp.layer(id).parent.name == nullName) {
              var currentLayer = maComp.layer(id);
              currentLayer
                .property("ADBE Transform Group")
                .property("ADBE Position").expression = "";
              currentLayer
                .property("ADBE Transform Group")
                .property("ADBE Rotate Y").expression = "";
              currentLayer
                .property("ADBE Transform Group")
                .property("ADBE Rotate X").expression = "";
              currentLayer.threeDLayer = false;
              currentLayer
                .property("ADBE Transform Group")
                .property("ADBE Rotate Z").expression = "";
            }
          }
        }
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        nullName = monCalque.name;
        monCalque.remove();
      }
    }
    function loopItem_remove() {
      var maComp = app.project.activeItem;
      var selectedArray = [];
      for (var i = 0; i < maComp.selectedLayers.length; i += 1) {
        selectedArray.push(maComp.selectedLayers[i].index);
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        maComp.layer(selectedArray[i]).selected = false;
      }
      for (var i = 0; i < selectedArray.length; i += 1) {
        monCalque = maComp.layer(selectedArray[i]);
        monCalque.selected = true;
        app.executeCommand(2153);
      }
    }
    app.beginSuppressDialogs();
    app.endSuppressDialogs(false);
    var ErrorHandler = (function () {
      var module = {};
      module.show = function (error) {
        var message = error.toString();
        if (error instanceof Error) {
          message +=
            "\nScript File: " +
            File(error.fileName).displayName +
            "\nError on Line: " +
            error.line.toString();
        }
        alert(message);
      };
      return module;
    })();
    var FileEx = (function () {
      function isSecurityPrefSet() {
        return (
          app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          ) === 1
        );
      }
      var module = {};
      module.canWriteFiles = function () {
        appVersion = parseFloat(app.version);
        commandID = 2359;
        tabName = "General";
        if (appVersion >= 16.1) {
          commandID = 3131;
          tabName = "Scripting & Expressions";
        }
        if (isSecurityPrefSet()) {
          return true;
        }
        scriptName =
          !Types.isUndefined(script) && script.name ? script.name : "Script";
        alert(
          (message =
            scriptName +
            " requires access to write files.\n" +
            'Go to the "' +
            tabName +
            '" panel of the application preferences and make sure ' +
            '"Allow Scripts to Write Files and Access Network" is checked.'),
        );
        app.executeCommand(commandID);
        return isSecurityPrefSet();
      };
      module.createResourceFile = function (file, binaryString) {
        file = module.getFileObject(file);
        if (!file.exists) {
          file = module.writeFile(file, binaryString, "BINARY");
        }
        return file;
      };
      module.getFileObject = function (file) {
        return file instanceof File ? file : new File(file);
      };
      module.writeFile = function (file, contents, encoding, openMode) {
        file = module.getFileObject(file);
        FolderEx.ensureFolderExists(file.parent);
        encoding = encoding || "UTF-8";
        openMode = openMode || "w";
        file.encoding = encoding;
        file.open(openMode);
        success = file.write(contents);
        file.close();
        if (!success) {
          throw "Unable to write file " + file.fsName;
        }
        return file;
      };
      return module;
    })();
    var FolderEx = (function () {
      var module = {};
      module.ensureFolderExists = function (folder) {
        folder = module.getFolderObject(folder);
        if (!folder.exists) {
          if (!folder.create()) {
            throw "Could not create folder " + folder.fsName;
          }
        }
        return folder;
      };
      module.getFolderObject = function (folder) {
        return folder instanceof Folder ? folder : new Folder(folder);
      };
      return module;
    })();
    var Schema = (function () {
      var _schema = {
        binaryString: function (string) {
          return Types.isString(string);
        },
        file: function (string) {
          return Types.isFile(string) || Types.isString(string);
        },
        matchName: function (string) {
          return Types.isString(string);
        },
      };
      _schema.binaryString.required = true;
      _schema.file.required = true;
      _schema.matchName.required = false;
      var module = {};
      module.validate = function (object) {
        for (var property in _schema) {
          if (!_schema.hasOwnProperty(property)) {
            return;
          }
          if (_schema[property].required || object.hasOwnProperty(property)) {
            if (!_schema[property](object[property])) {
              throw 'PseudoEffect: property "' + property + '" is invalid';
            }
          }
        }
      };
      return module;
    })();
    var Types = (function () {
      var module = {};
      module.isArray = function (array) {
        return array instanceof Array;
      };
      module.isFile = function (file) {
        return file instanceof File;
      };
      module.isInteger = function (number) {
        return module.isNumber(number) && number === parseInt(number, 10);
      };
      module.isLayer = function (layer) {
        return (
          layer instanceof AVLayer ||
          layer instanceof ShapeLayer ||
          layer instanceof TextLayer ||
          layer instanceof CameraLayer ||
          layer instanceof LightLayer
        );
      };
      module.isNumber = function (value) {
        return !isNaN(value);
      };
      module.isString = function (string) {
        return typeof string === "string";
      };
      module.isUndefined = function (object) {
        return typeof object === "undefined";
      };
      return module;
    })();
    var PseudoEffect = (function () {
      function applyByMatchName(layer, matchName) {
        for (var i = 0, il = _cache.length; i < il; i++) {
          if (_cache[i].matchName === matchName) {
            object = _cache[i];
          }
        }
        if (!object) {
          throw (
            'PseudoEffect: could not find effect by matchName "' +
            matchName +
            '"'
          );
        }
        return applyFromObject(layer, object);
      }
      function applyFromObject(layer, object) {
        ffxFile = getFFXFile(object);
        matchName = makePseudoEffectLive(ffxFile);
        return module.applyByMatchName(layer, matchName);
      }
      function getEffectsProperty(layer) {
        if (!Types.isLayer(layer)) {
          throw "PseudoEffect: layer is not of Layer type";
        }
        return layer.property("ADBE Effect Parade");
      }
      function getFFXFile(object) {
        if (!FileEx.canWriteFiles()) {
          throw "PseudoEffect: can not read/write files because of dissabled preferences";
        }
        return FileEx.createResourceFile(object.file, object.binaryString);
      }
      function makePseudoEffectLive(ffxFile) {
        composition = app.project.items.addComp("temp", 4, 4, 1, 1, 24);
        layer = composition.layers.addShape();
        layer.applyPreset(ffxFile);
        matchName = getEffectsProperty(layer).property(1).matchName;
        composition.remove();
        return matchName;
      }
      _cache = [];
      module = {};
      module.apply = function (layer, value) {
        try {
          switch (true) {
            case Types.isInteger(value):
              return module.applyByIndex(layer, value);
            case Types.isString(value):
              return module.applyByMatchName(layer, value);
            default:
              throw "PseudoEffect: unsupported format. Expected Integer or String";
          }
        } catch (error) {
          ErrorHandler.show(error);
        }
      };
      module.applyByIndex = function (layer, index) {
        try {
          cacheLength = _cache.length;
          if (index > cacheLength - 1) {
            throw (
              "PseudoEffect: Index " +
              index +
              " exceeds cache length of " +
              cacheLength
            );
          }
          object = _cache[index];
          return applyFromObject(layer, object);
        } catch (error) {
          ErrorHandler.show(error);
        }
      };
      module.applyByMatchName = function (layer, matchName) {
        try {
          effectsProperty = getEffectsProperty(layer);
          if (effectsProperty.canAddProperty(matchName)) {
            property = effectsProperty.addProperty(matchName);
          } else {
            property = applyByMatchName(layer, matchName);
          }
          return property;
        } catch (error) {
          ErrorHandler.show(error);
        }
      };
      module.push = function (objects) {
        if (Types.isUndefined(_cache) || !Types.isArray(_cache)) {
          _cache = [];
        }
        if (!Types.isArray(objects)) {
          objects = [objects];
        }
        try {
          for (var i = 0, il = objects.length; i < il; i++) {
            Schema.validate(objects[i]);
            _cache.push(objects[i]);
          }
        } catch (error) {
          ErrorHandler.show(error);
        }
      };
      return module;
    })();
    PseudoEffect.push({
      binaryString: __BLOB__BLOB_000331__,
      file:
        Folder.userData.fsName +
        "/aescripts/test/LoopMaster - 2D Wiggle CC.ffx",
      matchName: "Pseudo/LoopMaster_2D_wiggle_CC",
    });
    PseudoEffect.push({
      binaryString: __BLOB__BLOB_000332__,
      file:
        Folder.userData.fsName +
        "/aescripts/test/LoopMaster - 3D Wiggle CC.ffx",
      matchName: "Pseudo/LoopMaster_3D_wiggle",
    });
    PseudoEffect.push({
      binaryString: __BLOB__BLOB_000333__,
      file:
        Folder.userData.fsName + "/aescripts/test/LoopMaster - 2D Spin - 8.ffx",
      matchName: "Pseudo/LoopMaster_2D_Spin_8",
    });
    PseudoEffect.push({
      binaryString: __BLOB__BLOB_000334__,
      file:
        Folder.userData.fsName +
        "/aescripts/test/LoopMaster - 3D Orbit - 6.ffx",
      matchName: "Pseudo/LoopMaster_3D_Orbit_6",
    });
    var vectKeyframes = [
      "18.07,17.8 30.08,17.8 31.51,16.36 16.87,1.72 2.23,16.36 16.87,31 18.07,29.8,19.46,19.24 19.46,27.74 24.24,27.74 24.24,26.28 21.1,26.28 21.1,20.7 27.36,20.7 27.36,25.83 27.36,26.28 27.36,27.74 29,27.74 29,19.24",
      "24.24,24.47 24.24,28.63 27.29,26.55",
    ];
    var vectLoopItem = [
      "21.44,19.24 21.44,27.74 26.22,27.74 26.22,26.28 23.08,26.28 23.08,20.7 29.35,20.7 29.35,25.83 29.35,26.28 29.35,27.74 30.98,27.74 30.98,19.24",
      "26.22,25.35 26.22,28.63 29.27,26.99",
      "1.99,5.09 1.99,26.99 8.59,26.99 8.59,25.28 3.11,25.28 3.11,21.53 8.59,21.53 8.59,17.92 3.11,17.92 3.11,14.17 8.59,14.17 8.59,10.55 3.11,10.57 3.11,6.81 8.59,6.81 8.59,5.09",
      "24.25,5.09 24.25,6.81 29.73,6.81 29.73,10.55 24.25,10.55 24.25,13.02 29.73,13.02 29.73,16.77 24.25,16.77 24.25,17.81 30.98,17.81 30.98,5.09",
      "8.59,5.09 8.59,26.99 19.95,26.99 19.95,17.81 24.25,17.81 24.25,5.09",
    ];
    var vectSpin2D = [
      "31.24,10.96 28.67,16.15 23.92,12.84 26.6,12.15 26.55,11.95 23.92,8.48 20.16,6.28 15.84,5.68 11.62,6.78 8.15,9.41 5.95,13.17 5.35,17.49 6.45,21.7 9.08,25.18 12.84,27.38 17.16,27.98 21.38,26.87 24.85,24.24 27.05,20.48 27.65,16.17 29.79,16.04 29.08,21.19 26.45,25.67 22.31,28.8 17.29,30.12 12.14,29.41 7.66,26.78 4.52,22.64 3.21,17.61 3.92,12.47 6.55,7.99 10.69,4.85 15.71,3.54 20.86,4.25 25.34,6.87 28.48,11.02 28.65,11.62",
    ];
    var vectOrbit3D = [
      "6.92,16.66 6.48,19.17 9.34,24.79 14.96,27.65 21.18,26.66 21.86,25.98 18.29,24.87 13.1,22.03 8.36,18.3",
      "8.65,11.77 11.92,8.5 18.15,7.51 23.76,10.37 26.62,15.98 25.64,22.21 24.19,22.23 20.12,20.96 15.76,18.58 11.78,15.45",
      "14.72,6.85 11.95,7.27 11.09,7 7.92,7.03 6.41,7.86 6.73,9.65 8.27,12.84 11.24,16.16 15.21,19.32 19.54,21.69 23.63,22.94 26.78,22.94 28.26,22.23 28.04,20.33 28.67,18.25 30.15,21.25 30.01,24.15 27.89,25.73 24.12,25.77 19.19,24.25 14.07,21.45 9.28,17.69 5.76,13.66 3.9,9.87 4.05,6.98 6.17,5.39 9.95,5.35",
    ];
    var vectWiggle2D = [
      "5.78,5.91 7.15,7.28 7.15,26.41 26.28,26.41 27.65,27.78 5.78,27.78",
      "27.65,27.78 26.28,26.41 26.28,7.28 7.15,7.28 5.78,5.91 27.65,5.91",
      "11.3,12.05 13.43,21.64 15.95,21.64 16.72,15.64 17.69,21.64 20.19,21.64 22.13,12.05 19.44,12.05 18.73,17.49 17.83,12.05 15.52,12.05 14.71,17.94 13.85,12.05",
      "6.34,3.49 5.16,4.13 3.99,5.45 2.96,7.24 2.83,8.45 2.23,6.48 2.75,5.67 3.52,4.22 4.94,3.35",
      "11.59,3.39 9.11,4.5 6.12,8.09 5.61,9.55 5.62,12.12 4.45,9.76 4.31,6.78 6.17,4.34 8.85,3.26",
      "25.01,30.77 26.69,30.32 28.58,28.99 30.42,27.04 30.95,25.55 31.12,28.23 30.22,29.09 28.81,30.69 26.74,31.37",
      "18.32,29.32 21.8,28.66 26.68,25.01 27.77,23.31 28.52,20.05 29.29,23.4 28.57,27.21 25.48,29.75 21.76,30.3",
    ];
    var vectWiggle3D = [
      "5.69,10.38 6.8,11.49 6.8,26.95 22.26,26.95 23.37,28.06 5.69,28.06",
      "23.37,28.06 22.26,26.95 22.26,11.49 6.8,11.49 5.69,10.38 23.37,10.38",
      "10.15,15.35 11.88,23.09 13.92,23.09 14.54,18.25 15.32,23.09 17.34,23.09 18.91,15.35 16.74,15.35 16.16,19.74 15.43,15.35 13.57,15.35 12.91,20.11 12.22,15.35",
      "28.12,23.31 27.01,22.2 27.01,6.74 11.55,6.74 10.44,5.63 28.12,5.63",
      "26.56,6.13 21.81,10.88 23.23,11.68 27.66,7.24",
      "10.44,5.63 5.69,10.38 7.91,10.38 11.55,6.74",
      "27.01,22.18 22.26,26.93 23.37,28.06 28.12,23.29",
      "25.39,30.61 27.07,30.15 28.96,28.83 30.8,26.87 31.33,25.39 31.5,28.06 30.6,28.93 29.19,30.53 27.12,31.21",
      "20.01,29.3 22.73,29.03 24.99,28.37 27.91,25.97 28.69,23.69 29.45,20.43 30.22,23.78 29.5,27.58 26.4,30.12 23.48,30.34",
      "6.51,3.83 5.25,4.34 3.89,5.54 2.63,7.23 2.36,8.43 1.99,6.36 2.61,5.61 3.57,4.24 5.11,3.52",
      "11.85,4.37 9.2,5.19 5.73,8.47 5.03,9.89 4.74,12.49 3.84,9.95 4.06,6.93 6.24,4.68 9.09,3.91",
    ];
    var vectHelp = [
      "19.16 9.79 18.62 10.95 17.54 11.63 16.27 11.62 15.2 10.93 14.68 9.77 14.87 8.51 15.71 7.55 16.93 7.2 18.15 7.56 18.98 8.53 19.16 9.79",
      "13.63 13.06 18.64 13.06 18.64 23.65 19.42 23.65 19.42 25.38 14.41 25.38 14.41 23.65 15.19 23.65 15.19 14.79 13.63 14.79 13.63 13.06",
    ];
    app.beginSuppressDialogs();
    var monPanel = null;
    if (thisObj instanceof Panel) {
      monPanel = thisObj;
    } else {
      monPanel = new Window("palette", nomDeMonScript, undefined, {
        resizeable: true,
      });
    }
    monPanel.alignChildren = ["fill", "fill"];
    var monGroupe = monPanel.add("group");
    colorStatic = "#d8d8d8";
    colorHover = "#ee217c";
    colortrial = "#ee217c";
    var monBTN2 = buttonColorVector(
      monGroupe,
      vectKeyframes,
      [34, 34],
      colorStatic,
    );
    monBTN2.helpTip =
      "LOOP KEYFRAMES & PATH\nFor 1 or more properties.\nAlt+Click to remove expression(s) from selected properties";
    var monBTN4 = buttonColorVector(
      monGroupe,
      vectWiggle2D,
      [34, 34],
      colorStatic,
    );
    monBTN4.helpTip =
      "2D WIGGLE\nFor 1 or more layers.\nAlt+Click to remove this effect";
    var monBTN5 = buttonColorVector(
      monGroupe,
      vectWiggle3D,
      [34, 34],
      colorStatic,
    );
    monBTN5.helpTip =
      "3D WIGGLE\nFor 1 or more layers.\nAlt+Click to remove this effect";
    var monBTN6 = buttonColorVector(
      monGroupe,
      vectSpin2D,
      [34, 34],
      colorStatic,
    );
    monBTN6.helpTip =
      "2D SPIN\nFor 1 or more layers.\nAlt+Click to remove this effect";
    var monBTN7 = buttonColorVector(
      monGroupe,
      vectOrbit3D,
      [34, 34],
      colorStatic,
    );
    monBTN7.helpTip =
      "3D ORBIT\nFor 1 layer only.\nAlt+Click to remove this effect.\nSelect the Null Controller and everything will be deleted.";
    var monBTN8 = buttonColorVector(
      monGroupe,
      vectLoopItem,
      [34, 34],
      colorStatic,
    );
    monBTN8.helpTip =
      "LOOP AN ITEM\nFor 1 or more layers.\nAlt+Click to remove the Time Remap";
    var monBTN9 = buttonColorVector(monGroupe, vectHelp, [34, 34], colorStatic);
    monBTN9.helpTip = "Help Info";
    monGroupe.alignChildren = ["fill", "fill"];
    app.endSuppressDialogs(false);
    monBTN2.onClick = function () {
      app.beginUndoGroup("PerfectLoop");
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
        perfectLoop_remove();
      } else {
        perfectLoop();
      }
      app.endUndoGroup;
    };
    monBTN4.onClick = function () {
      app.beginUndoGroup("twoDwiggleCC");
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
        twoDwiggleCC_remove();
      } else {
        twoDwiggleCC();
      }
      app.endUndoGroup;
    };
    monBTN5.onClick = function () {
      app.beginUndoGroup("threeDwiggleCC");
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
        threeDwiggleCC_remove();
      } else {
        threeDwiggleCC();
      }
      app.endUndoGroup;
    };
    monBTN6.onClick = function () {
      app.beginUndoGroup("spin2D");
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
        spin2D_remove();
      } else {
        spin2D();
      }
      app.endUndoGroup;
    };
    monBTN7.onClick = function () {
      app.beginUndoGroup("orbit3D");
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
        orbit3D_remove();
      } else {
        orbit3D();
      }
      app.endUndoGroup;
    };
    monBTN8.onClick = function () {
      app.beginUndoGroup("Loop an Item");
      var touches = detect();
      if (touches.indexOf("alt") != -1) {
        loopItem_remove();
      } else {
        loopItem();
      }
      app.endUndoGroup;
    };
    monBTN9.onClick = function () {
      n8.helpUI();
    };
    monPanel.layout.layout(true);
    monPanel.layout.resize();
    monPanel.onResizing = monPanel.onResize = function () {
      monPanel.onResize = function () {
        monGroupe.orientation =
          monPanel.size.width > monPanel.size.height ? "row" : "column";
        monPanel.layout.resize();
      };
    };
    if (monPanel instanceof Window) {
      monPanel.show();
    }
  }
}
NA_LoopMaster(this);
