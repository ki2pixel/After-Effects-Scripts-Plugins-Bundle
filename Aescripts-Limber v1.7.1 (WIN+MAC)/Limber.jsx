/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function sk_Limber(thisObj) {
  function limberLaunch(thisObj) {
    function reduceImage(f) {
      if (!f.image) {
        return;
      }
      var d = f.size;
      var b = f.image.size;
      var c = Math.min(d[0] / b[0], d[1] / b[1]);
      b = [c * b[0], c * b[1]];
      g = [(d[0] - b[0]) / 2, (d[1] - b[1]) / 2];
      f.graphics.drawImage(f.image, g[0], g[1], b[0], b[1]);
      d = b = g = null;
    }
    function controllerSize() {
      var c = lmbraf.getSetting("userPrefs", "controllerSize");
      var b = 100;
      if (c === 0) {
        b = cSizes[0];
      } else {
        if (c === 1) {
          b = cSizes[1];
        } else {
          if (c === 2) {
            b = cSizes[2];
          } else {
            if (c === 3) {
              b = cSizes[3];
            } else {
              if (c === 4) {
                b = cSizes[4];
              }
            }
          }
        }
      }
      return [b, b];
    }
    function importLimb(j, i, k) {
      function c(u, o) {
        var r = u.properties;
        for (var p = 0; p < r.length; p += 1) {
          if (r[p].type === "INDEXED_GROUP" || r[p].type === "NAMED_GROUP") {
            if (u.type === "NAMED_GROUP") {
              n = o.property(r[p].matchName);
            } else {
              n = o.addProperty(r[p].matchName);
              n.name = r[p].name;
            }
            if (n.canSetEnabled) {
              n.enabled = r[p].enabled;
            }
            c(r[p], n);
          } else {
            if (r[p].type === "PROPERTY") {
              var t = JSON.parse(r[p].value);
              if (r[p].matchName === "ADBE Vector Shape") {
                var s = new Shape();
                s.vertices = t.vertices;
                s.inTangents = t.inTangents;
                s.outTangents = t.outTangents;
                s.closed = t.closed;
                o.property(r[p].matchName).setValue(s);
              } else {
                try {
                  o.property(r[p].matchName).setValue(t);
                } catch (q) {}
              }
            }
          }
        }
      }
      function b(r, o) {
        var q = r.properties;
        for (var p = 0; p < q.length; p += 1) {
          if (q[p].type === "INDEXED_GROUP" || q[p].type === "NAMED_GROUP") {
            if (r.type === "NAMED_GROUP") {
              n = o.property(q[p].matchName);
            } else {
              n = o.property(p + 1);
            }
            b(q[p], n);
          } else {
            if (
              q[p].type === "PROPERTY" &&
              o.property(q[p].matchName).canSetExpression
            ) {
              o.property(q[p].matchName).expression = l(q[p].expression);
            }
          }
        }
      }
      function l(n) {
        if (n.indexOf("{{ end }}") !== -1) {
          n = n.split("{{ end }}").join(j.ankle);
        }
        if (n.indexOf("{{ limb }}") !== -1) {
          n = n.split("{{ limb }}").join(j.leg);
        }
        if (n.indexOf("{{ start }}") !== -1) {
          n = n.split("{{ start }}").join(j.hip);
        }
        return n;
      }
      var g = app.project.activeItem;
      if (!g || !(g instanceof CompItem)) {
        alert("Please select a composition first");
        return;
      }
      var m = g;
      m.openInViewer();
      if (k) {
        var d = m.layers.addShape();
        d.name = j.ankle;
        d.label = lmbraf.getSetting("userPrefs", "controllerLabelColor");
        makeAnkleProps(d, j);
        var f = m.layers.addShape();
        f.name = j.hip;
        f.label = lmbraf.getSetting("userPrefs", "controllerLabelColor");
        makeHipProps(f, j);
      }
      var h = m.layers.addShape();
      h.name = j.leg;
      h.label = lmbraf.getSetting("userPrefs", "limbLabelColor");
      c(i.shapes, h.property("ADBE Root Vectors Group"));
      c(i.effects, h.property("ADBE Effect Parade"));
      c(i.transform, h.property("ADBE Transform Group"));
      if (k) {
        makeAnkleExpressions(d, j);
        makeHipExpressions(f, j);
      }
      b(i.transform, h.property("ADBE Transform Group"));
      b(i.shapes, h.property("ADBE Root Vectors Group"));
      b(i.effects, h.property("ADBE Effect Parade"));
    }
    function applyShapeToController(j, d) {
      var g = controllerShapes[d].shape;
      for (var c = 0; c < g.length; c += 1) {
        var h = j
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .addProperty("ADBE Vector Shape - Group");
        h.name = "Path " + c + 1;
        h.property("ADBE Vector Shape Direction").setValue(2);
        var f = h.property("ADBE Vector Shape");
        aeShapePath_newShape = new Shape();
        aeShapePath_newShape.vertices = g[c].vertices;
        aeShapePath_newShape.inTangents = g[c].inTangents;
        aeShapePath_newShape.outTangents = g[c].outTangents;
        aeShapePath_newShape.closed = g[c].closed;
        f.setValue(aeShapePath_newShape);
        f.expression = "value;";
      }
      var b = j
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Graphic - Fill");
      b.name = "Fill";
      b.property("ADBE Vector Fill Color").setValue([
        0, 0.80000001192093, 0, 1,
      ]);
    }
    function getRGBfromHEX(b) {
      var c = function (l) {
        var k = l >> 16;
        var j = (l >> 8) & 255;
        var i = l & 255;
        return [k, j, i];
      };
      var g = b;
      var h = g.toString(16);
      var d = c(parseInt(h, 16));
      var f = [d[0] / 255, d[1] / 255, d[2] / 255];
      return f;
    }
    function componentToHex(d) {
      var b = d.toString(16);
      return b.length == 1 ? "0" + b : b;
    }
    function rgbToHex(f, d, c) {
      return "0x" + componentToHex(f) + componentToHex(d) + componentToHex(c);
    }
    function rgbToHsl(c, k, n) {
      var o = Math.max(c, k, n);
      var i = Math.min(c, k, n);
      var f = (o + i) / 2;
      if (o == i) {
        j = p = 0;
      } else {
        var m = o - i;
        p = f > 0.5 ? m / (2 - o - i) : m / (o + i);
        if (o === c) {
          j = (k - n) / m + k < n ? 6 : 0;
        } else {
          if (o === k) {
            j = (n - c) / m + 2;
          } else {
            if (o === n) {
              j = (c - k) / m + 4;
            }
          }
        }
        j /= 6;
      }
      return [j, p, f];
    }
    function userPrefs() {
      var b = "userPrefs";
      if (!lmbraf.haveSetting(b, "controllerShape")) {
        lmbraf.saveSetting(b, "controllerShape", DEFAULTCONFIG.controllerShape);
      }
      if (!lmbraf.haveSetting(b, "controllerSize")) {
        lmbraf.saveSetting(b, "controllerSize", DEFAULTCONFIG.controllerSize);
      }
      if (!lmbraf.haveSetting(b, "controllerColorDynamics")) {
        lmbraf.saveSetting(
          b,
          "controllerColorDynamics",
          DEFAULTCONFIG.controllerColorDynamics,
        );
      }
      if (!lmbraf.haveSetting(b, "controllerUserRotation")) {
        lmbraf.saveSetting(
          b,
          "controllerUserRotation",
          DEFAULTCONFIG.controllerUserRotation,
        );
      }
      if (!lmbraf.haveSetting(b, "controllerLabelColor")) {
        lmbraf.saveSetting(
          b,
          "controllerLabelColor",
          DEFAULTCONFIG.controllerLabelColor,
        );
      }
      if (!lmbraf.haveSetting(b, "limbLabelColor")) {
        lmbraf.saveSetting(b, "limbLabelColor", DEFAULTCONFIG.limbLabelColor);
      }
      if (!lmbraf.haveSetting(b, "controllerColor")) {
        lmbraf.saveSetting(b, "controllerColor", DEFAULTCONFIG.controllerColor);
      }
      if (!lmbraf.haveSetting(b, "deleteAfterRig")) {
        lmbraf.saveSetting(b, "deleteAfterRig", DEFAULTCONFIG.deleteAfterRig);
      }
      return {
        controllerColor: lmbraf.getSetting(b, "controllerColor"),
        controllerColorDynamics: lmbraf.getSetting(
          b,
          "controllerColorDynamics",
        ),
        controllerLabelColor: lmbraf.getSetting(b, "controllerLabelColor"),
        controllerShape: lmbraf.getSetting(b, "controllerShape"),
        controllerSize: lmbraf.getSetting(b, "controllerSize"),
        controllerUserRotation: lmbraf.getSetting(b, "controllerUserRotation"),
        deleteAfterRig: lmbraf.getSetting(b, "deleteAfterRig"),
        limbLabelColor: lmbraf.getSetting(b, "limbLabelColor"),
      };
    }
    function doLibrary() {
      function s() {
        var A = [
          "Limber\u2019s Limb Library file contains some of the best custom limbs we\u2019ve designed over the years; often for specific real-world jobs or to help users achieve something special they couldn\u2019t figure out on their own. It\u2019s just an ordinary After Effects Project File, with a bunch of rigged limbs stored inside. When you want one, you import the AEP file and use Limber\u2019s Copy and Paste buttons to copy the custom limb into the limb layer where you want it.",
          "We suggest that you keep the Limb Library AEP file in a safe place on your drive - maybe your Documents folder, or somewhere on the cloud. Wherever you put it, the button you just clicked will simply open up an Import dialog pre-filled with that location, to make it a little quicker to get to, when you\u2019re busy animating.  That\u2019s all it does.",
          "Since this seems to be the first time you\u2019ve clicked this button, we need to know where you want this location to be.  So please select a folder in the dialog that appears after you click OK.",
        ].join("\n\n");
        var z = new Window("dialog");
        z.text = "Dialog";
        z.preferredSize.width = 458;
        z.preferredSize.height = 300;
        z.orientation = "column";
        z.alignChildren = ["center", "top"];
        z.spacing = 10;
        z.margins = 16;
        var y = z.add("group");
        y.orientation = "column";
        y.alignChildren = ["left", "center"];
        y.spacing = 0;
        y.add("statictext", [0, 0, 400, 275], A, {
          multiline: "true",
          name: "statictext1",
        });
        var i = z.add("group", undefined, { name: "group1" });
        i.orientation = "row";
        i.alignChildren = ["left", "center"];
        i.spacing = 10;
        i.margins = 0;
        var C = i.add("button", undefined, undefined, { name: "button1" });
        C.text = "Cancel";
        C.onClick = function () {
          z.close();
        };
        var B = i.add("button", undefined, undefined, { name: "button2" });
        B.text = "OK";
        B.onClick = function () {
          z.close();
          var E = Folder.myDocuments;
          var D = E.selectDlg("Select a location to keep your Limb Libraries");
          if (D) {
            folderPath = D.absoluteURI;
            x = { libraryPath: folderPath };
            createResourceFile(
              "LimberLibraryPref.json",
              JSON.stringify(x),
              userDataFolder,
            );
          }
        };
        z.show();
      }
      var q = new File(getUserDataFolder() + "/LimberLibraryPref.json");
      if (q.open("r")) {
        q.encoding = "UTF-8";
        var c = q.read();
        try {
          var r = JSON.parse(c).libraryPath;
        } catch (l) {
          alert(
            "JSON error. You\'ll need to reassign your limb library location",
          );
          q.remove();
          s();
          return;
        }
        var b = Folder(r);
        var k = b.getFiles("*.aep");
        var v = new Window("dialog");
        v.text = "Import Library";
        v.preferredSize.width = 346;
        v.orientation = "column";
        v.alignChildren = ["center", "top"];
        v.spacing = 10;
        v.margins = 16;
        var n = v.add("group", undefined, { name: "group1" });
        n.orientation = "row";
        n.alignChildren = ["left", "center"];
        n.spacing = 10;
        n.margins = 0;
        var o = n.add("statictext", undefined, undefined, {
          name: "statictext1",
        });
        o.text = "Library path";
        var r = n.add('edittext {properties: {name: "path"}}');
        r.text = b.fullName;
        r.onChanging = function () {
          this.text = b.fullName;
        };
        var j = n.add("button", undefined, undefined, { name: "button1" });
        j.text = "...";
        j.onClick = function () {
          var z = b.selectDlg(
            "Select a new location to point to your limb libraries",
          );
          if (z && q.open("w")) {
            x = { libraryPath: z.absoluteURI };
            q.encoding = "UTF-8";
            q.write(JSON.stringify(x));
            q.close();
            b = z;
            r.text = b.fullName;
            k = b.getFiles("*.aep");
            h.removeAll();
            for (var y = 0; y < k.length; y += 1) {
              h.add("item", File.decode(k[y].name));
            }
            h.items = p;
          }
        };
        var g = n.add("button", undefined, undefined, { name: "button2" });
        g.text = "Reveal in Finder";
        g.onClick = function () {
          b.execute();
        };
        var p = [];
        var u = 0;
        var t = k.length;
        for (var u = 0; u < t; u += 1) {
          p.push(File.decode(k[u].name));
        }
        var h = v.add("listbox", undefined, undefined, {
          items: p,
          multiselect: true,
          name: "listbox1",
        });
        h.selection = [0, 1];
        h.preferredSize.width = 410;
        h.preferredSize.height = 82;
        var m = v.add("group", undefined, { name: "group2" });
        m.preferredSize.width = 93;
        m.orientation = "row";
        m.alignChildren = ["left", "center"];
        m.spacing = 10;
        m.margins = 0;
        var f = m.add("button", undefined, undefined, { name: "button3" });
        f.text = "Cancel";
        var d = m.add("button", undefined, undefined, { name: "button4" });
        d.text = "OK";
        d.onClick = function () {
          if (h.selection) {
            for (var i = 0; i < h.selection.length; i += 1) {
              var y = h.selection[i].index;
              app.project.importFile(new ImportOptions(k[y]));
            }
            v.close();
          } else {
            v.close();
          }
        };
        v.show();
      } else {
        s();
      }
    }
    function quickLimb(f, r, g, s, d) {
      if (d === undefined) {
        d = true;
      }
      try {
        var p = [f, r, g, s];
        var u = new Array();
        var o = new Array();
        var q = new Array();
        var F = getLimbLayersForScript(s);
        var B = F.ankle;
        var k = F.hip;
        for (var E = 0; E < p.length - 1; E += 1) {
          var m = p[E];
          var z = m.sourceRectAtTime(0, false);
          var t =
            m.property("ADBE Transform Group").property("ADBE Scale").value[0] /
            100;
          u[E] = ((z.width + z.height) / 2) * t;
        }
        B.property("ADBE Effect Parade")(1)(
          "Pseudo/Limber_16-0002",
        ).expression =
          "length(thisComp.layer(" +
          p[0].index +
          ").toComp(thisComp.layer(" +
          p[0].index +
          ").anchorPoint), thisComp.layer(" +
          p[1].index +
          ").toComp(thisComp.layer(" +
          p[1].index +
          ").anchorPoint))";
        var v = B.property("ADBE Effect Parade")(1)(
          "Pseudo/Limber_16-0002",
        ).value;
        B.property("ADBE Effect Parade")(1)(
          "Pseudo/Limber_16-0002",
        ).expression = "";
        setProp(
          B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0002"),
          v,
        );
        B.property("ADBE Effect Parade")(1)(
          "Pseudo/Limber_16-0003",
        ).expression =
          "length(thisComp.layer(" +
          p[1].index +
          ").toComp(thisComp.layer(" +
          p[1].index +
          ").anchorPoint), thisComp.layer(" +
          p[2].index +
          ").toComp(thisComp.layer(" +
          p[2].index +
          ").anchorPoint))";
        var n = B.property("ADBE Effect Parade")(1)(
          "Pseudo/Limber_16-0003",
        ).value;
        B.property("ADBE Effect Parade")(1)(
          "Pseudo/Limber_16-0003",
        ).expression = "";
        setProp(
          B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0003"),
          n,
        );
        setProp(
          B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0028"),
          0,
        );
        k
          .property("ADBE Transform Group")
          .property("ADBE Position").expression =
          "thisComp.layer(" +
          p[0].index +
          ").toComp(thisComp.layer(" +
          p[0].index +
          ").anchorPoint)";
        var l = k
          .property("ADBE Transform Group")
          .property("ADBE Position").value;
        k
          .property("ADBE Transform Group")
          .property("ADBE Position").expression = "";
        setProp(
          k.property("ADBE Transform Group").property("ADBE Position"),
          l,
        );
        B.property("ADBE Transform Group").property(
          "ADBE Position",
        ).expression =
          "thisComp.layer(" +
          p[2].index +
          ").toComp(thisComp.layer(" +
          p[2].index +
          ").anchorPoint)";
        var D = B.property("ADBE Transform Group").property(
          "ADBE Position",
        ).value;
        B.property("ADBE Transform Group").property(
          "ADBE Position",
        ).expression = "";
        setProp(
          B.property("ADBE Transform Group").property("ADBE Position"),
          D,
        );
        var j = p[1]
          .property("ADBE Effect Parade")
          .addProperty("ADBE Point Control");
        var G = j("ADBE Point Control-0001");
        G.expression = "thisLayer.toComp(thisLayer.anchorPoint)";
        var C = G.value;
        j.remove();
        var A = B.property("ADBE Transform Group").property(
          "ADBE Position",
        ).value;
        var y = k
          .property("ADBE Transform Group")
          .property("ADBE Position").value;
        var H = 100;
        if ((A - C)[0] * (y - C)[1] - (A - C)[1] * (y - C)[0] >= 0) {
          H = 100;
        } else {
          H = -100;
        }
        setProp(
          B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0024"),
          H,
        );
        if (d) {
          setProp(
            B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0004"),
            u[0],
          );
          setProp(
            B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0005"),
            u[1],
          );
          setProp(
            B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0006"),
            u[2],
          );
          if (p[0].collapseTransformation) {
            B.property("ADBE Effect Parade")(1)(
              "Pseudo/Limber_16-0019",
            ).expression =
              "var target = thisComp.layer(" +
              p[0].index +
              ");\ntarget.sampleImage(target.toComp(target.anchorPoint), [1,1])";
          } else {
            B.property("ADBE Effect Parade")(1)(
              "Pseudo/Limber_16-0019",
            ).expression =
              "var target = thisComp.layer(" +
              p[0].index +
              ");\ntarget.sampleImage(target.anchorPoint, [1,1])";
          }
          B.motionBlur = true;
          B.motionBlur = false;
          var b = B.property("ADBE Effect Parade")(1)(
            "Pseudo/Limber_16-0019",
          ).value;
          B.property("ADBE Effect Parade")(1)(
            "Pseudo/Limber_16-0019",
          ).expression = "";
          setProp(
            B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0019"),
            b,
          );
          if (p[1].collapseTransformation) {
            B.property("ADBE Effect Parade")(1)(
              "Pseudo/Limber_16-0020",
            ).expression =
              "var target = thisComp.layer(" +
              p[1].index +
              ");\ntarget.sampleImage(target.toComp(target.anchorPoint), [1,1])";
          } else {
            B.property("ADBE Effect Parade")(1)(
              "Pseudo/Limber_16-0020",
            ).expression =
              "var target = thisComp.layer(" +
              p[1].index +
              ");\ntarget.sampleImage(target.anchorPoint, [1,1])";
          }
          B.motionBlur = true;
          B.motionBlur = false;
          var x = B.property("ADBE Effect Parade")(1)(
            "Pseudo/Limber_16-0020",
          ).value;
          B.property("ADBE Effect Parade")(1)(
            "Pseudo/Limber_16-0020",
          ).expression = "";
          setProp(
            B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0020"),
            x,
          );
          if (p[2].collapseTransformation) {
            B.property("ADBE Effect Parade")(1)(
              "Pseudo/Limber_16-0021",
            ).expression =
              "var target = thisComp.layer(" +
              p[2].index +
              ");\ntarget.sampleImage(target.toComp(target.anchorPoint), [1,1])";
          } else {
            B.property("ADBE Effect Parade")(1)(
              "Pseudo/Limber_16-0021",
            ).expression =
              "var target = thisComp.layer(" +
              p[2].index +
              ");\ntarget.sampleImage(target.anchorPoint, [1,1])";
          }
          B.motionBlur = true;
          B.motionBlur = false;
          var c = B.property("ADBE Effect Parade")(1)(
            "Pseudo/Limber_16-0021",
          ).value;
          B.property("ADBE Effect Parade")(1)(
            "Pseudo/Limber_16-0021",
          ).expression = "";
          setProp(
            B.property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0021"),
            c,
          );
        }
        f.enabled = false;
        r.enabled = false;
        g.enabled = false;
      } catch (h) {
        alert("something happened." + h.toString());
      }
    }
    function buildRiggingUI() {
      function G(av, aw) {
        for (var o = 0; o < aw.length; o += 1) {
          if (
            av !== aw[o] &&
            av.selection.index !== 0 &&
            av.selection.index === aw[o].selection.index
          ) {
            aw[o].selection = 0;
          }
        }
      }
      function J(av) {
        var ax = ["None"];
        for (var aw = 1; aw <= av.numLayers; aw += 1) {
          var o = av.layer(aw);
          ax.push(o.index + ". " + o.name);
        }
        return ax;
      }
      function ad(o) {
        if (ah.length > o) {
          return ah[o].index;
        } else {
          return 0;
        }
      }
      function x(aw, ax) {
        var o = false;
        for (av = ax.length - 1; av >= 0; av--) {
          if (!W) {
            W = getLimbLayersForScript(ax[av]);
          }
          if (W !== null && !o) {
            ai.text = "Selected limb: " + W.leg.name;
            M = ax[av];
            ax.splice(av, 1);
            o = true;
          } else {
            if (W !== null && o && getLimbLayersForScript(ax[av])) {
              ax.splice(av, 1);
            }
          }
        }
        if (ax.length === 0) {
          return { reason: "no shapes", result: false };
        }
        if (ax.length === 1) {
          v.selection = ax[0].index;
          return { result: true };
        } else {
          if (ax.length === 2) {
            v.selection = ax[0].index;
            af.selection = ax[1].index;
            return { result: true };
          } else {
            if (ax.length === 3) {
              V.selection = ax[0].index;
              f.selection = ax[1].index;
              E.selection = ax[2].index;
              return { result: true };
            } else {
              if (ax.length === 4) {
                V.selection = ax[0].index;
                f.selection = ax[1].index;
                E.selection = ax[2].index;
                v.selection = ax[3].index;
                return { result: true };
              } else {
                if (ax.length === 5) {
                  V.selection = ax[0].index;
                  f.selection = ax[1].index;
                  E.selection = ax[2].index;
                  v.selection = ax[3].index;
                  af.selection = ax[4].index;
                  return { result: true };
                } else {
                  if (ax.length >= 6) {
                    return { reason: "too many", result: false };
                  }
                }
              }
            }
          }
        }
      }
      function l(av) {
        var o = av.selection.text;
        return o.split(". ")[1];
      }
      function at() {
        if (i(aq)) {
          K.text = [
            "!You cannot have a Limber layer in your selection!",
            "No action will be taken",
          ].join("\n");
          P = null;
        } else {
          if (M) {
            var o = getLimbLayersForScript(M).leg;
            if (
              V.selection.index === 0 ||
              f.selection.index === 0 ||
              E.selection.index === 0
            ) {
              if (v.selection.index !== 0 && af.selection.index !== 0) {
                K.text = [
                  "This will decorate " + o.name + " with",
                  l(v) + " on the upper limb and",
                  l(af) + " on the lower limb",
                ].join("\n");
                P = function () {
                  var av = c(v.selection);
                  var aw = c(af.selection);
                  shapeMove.transfer_shapes_to_limb(false, av, o);
                  shapeMove.transfer_shapes_to_limb(true, aw, o);
                  t(av, aw, o);
                  Y([av, aw]);
                };
              } else {
                if (v.selection.index !== 0 && af.selection.index === 0) {
                  K.text = [
                    "This will decorate " + o.name + " with",
                    l(v) + " on the upper limb",
                  ].join("\n");
                  P = function () {
                    var av = c(v.selection);
                    shapeMove.transfer_shapes_to_limb(false, av, o);
                    Y(av);
                  };
                } else {
                  if (v.selection.index === 0 && af.selection.index !== 0) {
                    K.text = [
                      "This will decorate " + o.name + " with ",
                      l(af) + " on the lower limb",
                    ].join("\n");
                    P = function () {
                      var av = c(af.selection);
                      shapeMove.transfer_shapes_to_limb(true, av, o);
                      Y(av);
                    };
                  } else {
                    if (v.selection.index === 0 && af.selection.index === 0) {
                      K.text = "no action will be taken";
                    }
                  }
                }
              }
            } else {
              if (
                V.selection.index !== 0 &&
                f.selection.index !== 0 &&
                E.selection.index !== 0
              ) {
                if (v.selection.index !== 0 && af.selection.index !== 0) {
                  K.text = [
                    "This will move " + o.name + " to the pose of",
                    l(V) + ", " + l(f) + ", and " + l(E) + " with ",
                    l(v) + " on the upper limb and",
                    l(af) + " on the lower limb",
                  ].join("\n");
                  P = function () {
                    var az = c(V.selection);
                    var ay = c(f.selection);
                    var ax = c(E.selection);
                    var aw = c(v.selection);
                    var av = c(af.selection);
                    quickLimb(az, ay, ax, M, true);
                    shapeMove.transfer_shapes_to_limb(false, aw, o);
                    shapeMove.transfer_shapes_to_limb(true, av, o);
                    t(aw, av, o);
                    Y([az, ay, ax, aw, av]);
                  };
                } else {
                  if (v.selection.index !== 0 && af.selection.index === 0) {
                    K.text = [
                      "This will move " + o.name + " to the pose of",
                      l(V) + ", " + l(f) + ", and " + l(E) + " with ",
                      l(v) + " on the upper limb",
                    ].join("\n");
                    P = function () {
                      var ay = c(V.selection);
                      var ax = c(f.selection);
                      var aw = c(E.selection);
                      var av = c(v.selection);
                      quickLimb(ay, ax, aw, M, true);
                      shapeMove.transfer_shapes_to_limb(false, av, o);
                      Y([ay, ax, aw, av]);
                    };
                  } else {
                    if (v.selection.index === 0 && af.selection.index !== 0) {
                      K.text = [
                        "This will move " + o.name + " to the pose of",
                        l(V) + ", " + l(f) + ", and " + l(E) + " with ",
                        l(af) + " on the lower limb",
                      ].join("\n");
                      P = function () {
                        var ay = c(V.selection);
                        var ax = c(f.selection);
                        var aw = c(E.selection);
                        var av = c(af.selection);
                        quickLimb(ay, ax, aw, M, true);
                        shapeMove.transfer_shapes_to_limb(true, av, o);
                        Y([ay, ax, aw, av]);
                      };
                    } else {
                      K.text = [
                        "No art layers selected.",
                        o.name + " will be posed to match ",
                        l(V) + ", " + l(f) + ", and " + l(E),
                      ].join("\n");
                      P = function () {
                        var ax = c(V.selection);
                        var aw = c(f.selection);
                        var av = c(E.selection);
                        quickLimb(ax, aw, av, M, true);
                        Y([ax, aw, av]);
                      };
                    }
                  }
                }
              }
            }
          } else {
            K.text = "No limb layer selected";
            if (
              V.selection.index === 0 ||
              f.selection.index === 0 ||
              E.selection.index === 0
            ) {
              K.text = [
                "You must have three joint",
                "reference layers to create a new limb",
              ].join("\n");
              P = null;
            } else {
              if (v.selection.index !== 0 && af.selection.index === 0) {
                K.text = [
                  "This will create a new " + b(ccType) + " " + limbType + "",
                  "with " + l(v) + " on the upper limb",
                ].join("\n");
                P = function () {
                  var az = c(V.selection);
                  var ay = c(f.selection);
                  var ax = c(E.selection);
                  var aw = c(v.selection);
                  var av = makeTheArm(true);
                  if (!av) {
                    return null;
                  }
                  m(av);
                  quickLimb(az, ay, ax, av.ankle, true);
                  shapeMove.transfer_shapes_to_limb(false, aw, av.leg);
                  Y([az, ay, ax, aw]);
                };
              } else {
                if (v.selection.index === 0 && af.selection.index !== 0) {
                  K.text = [
                    "This will create a new " + b(ccType) + " " + limbType + "",
                    "with " + l(af) + " on the lower limb",
                  ].join("\n");
                  P = function () {
                    var az = c(V.selection);
                    var ay = c(f.selection);
                    var ax = c(E.selection);
                    var aw = c(af.selection);
                    var av = makeTheArm(true);
                    if (!av) {
                      return null;
                    }
                    m(av);
                    quickLimb(az, ay, ax, av.ankle, true);
                    shapeMove.transfer_shapes_to_limb(true, aw, av.leg);
                    Y([az, ay, ax, aw]);
                  };
                } else {
                  if (v.selection.index !== 0 && af.selection.index !== 0) {
                    K.text = [
                      "This will create a new " +
                        b(ccType) +
                        " " +
                        limbType +
                        "",
                      " with " + l(v) + " on the upper limb",
                      " and " + l(af) + " on the lower limb. ",
                    ].join("\n");
                    P = function () {
                      var aA = c(V.selection);
                      var az = c(f.selection);
                      var ay = c(E.selection);
                      var ax = c(v.selection);
                      var aw = c(af.selection);
                      var av = makeTheArm(true);
                      if (!av) {
                        return null;
                      }
                      m(av);
                      quickLimb(aA, az, ay, av.ankle, true);
                      shapeMove.transfer_shapes_to_limb(false, ax, av.leg);
                      shapeMove.transfer_shapes_to_limb(true, aw, av.leg);
                      t(ax, aw, av.leg);
                      Y([aA, az, ay, ax, aw]);
                    };
                  } else {
                    if (v.selection.index === 0 && af.selection.index === 0) {
                      K.text =
                        "This will create a new " +
                        b(ccType) +
                        " " +
                        limbType +
                        "";
                      P = function () {
                        var ay = c(V.selection);
                        var ax = c(f.selection);
                        var aw = c(E.selection);
                        var av = makeTheArm(true);
                        if (!av) {
                          return null;
                        }
                        m(av);
                        quickLimb(ay, ax, aw, av.ankle, true);
                        Y([ay, ax, aw]);
                      };
                    }
                  }
                }
              }
            }
          }
        }
      }
      function i(av) {
        retBool = false;
        for (var o = 0; o < av.length; o += 1) {
          if (
            av[o].selection.index > 0 &&
            getLimbLayersForScript(au.layer(av[o].selection.index))
          ) {
            retBool = true;
            break;
          }
        }
        return retBool;
      }
      function C(o) {
        if (
          o.property("ADBE Root Vectors Group")("Limb")("ADBE Vectors Group")(
            "Upper Group",
          )
        ) {
          return true;
        } else {
          return false;
        }
      }
      function m(ay) {
        if (C(ay.leg)) {
          return false;
        }
        var av = ay.leg.property("ADBE Root Vectors Group")("Limb")(
          "ADBE Vectors Group",
        );
        var ax = av.addProperty("ADBE Vector Group");
        ax.name = "Bone";
        var az = [av("Path"), av("ADBE Vector Graphic - Stroke")];
        shapeMove.applyGroupData(az, ax);
        av.property("Path").remove();
        av.property("ADBE Vector Graphic - Stroke").remove();
        var o = av.addProperty("ADBE Vector Group");
        o.name = "Upper Group";
        o("ADBE Vector Transform Group")("ADBE Vector Position").expression =
          'thisComp.layer("' +
          ay.ankle.name +
          '").content("Admin").content("p1").transform.position';
        o("ADBE Vector Transform Group")("ADBE Vector Rotation").expression =
          'thisComp.layer("' +
          ay.ankle.name +
          '").content("Admin").content("angles").transform.anchorPoint[0]';
        var aw = av.addProperty("ADBE Vector Group");
        aw.name = "Lower Group";
        aw("ADBE Vector Transform Group")("ADBE Vector Position").expression =
          'thisComp.layer("' +
          ay.ankle.name +
          '").content("Admin").content("p2blend").transform.position';
        aw("ADBE Vector Transform Group")("ADBE Vector Rotation").expression =
          'thisComp.layer("' +
          ay.ankle.name +
          '").content("Admin").content("angles").transform.anchorPoint[1]';
        ax = av("Bone");
        ax.moveTo(av.numProperties);
        return true;
      }
      function c(o) {
        var av = o.text.split(".")[0];
        if (!isNaN(av)) {
          return au.layer(parseInt(av, 10));
        } else {
          return null;
        }
      }
      function U(av) {
        for (var o = 0; o < av.items.length; o += 1) {
          if (
            o !== 0 &&
            getLimbLayersForScript(au.layer(o)) === null &&
            au.layer(o) instanceof ShapeLayer
          ) {
            av.items[o].icon = File.decode(Z);
          }
        }
      }
      function Y(av) {
        if (lmbraf.getSetting("userPrefs", "deleteAfterRig")) {
          if (av instanceof Array) {
            for (var o = 0; o < av.length; o += 1) {
              av[o].remove();
            }
          } else {
            av.remove();
          }
        }
      }
      function t(av, ax, aw) {
        if (ax.index < av.index) {
          var o = aw.property("ADBE Root Vectors Group")("Limb")(
            "ADBE Vectors Group",
          )("Lower Group");
          if (o) {
            o.moveTo(1);
          }
        }
      }
      function b(av) {
        var o = av.replace(/([A-Z])/g, " $1");
        return o.charAt(0).toUpperCase() + o.slice(1);
      }
      var au = app.project.activeItem;
      if (!au || !(au instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      var M = null;
      var ah = au.selectedLayers;
      var P = null;
      var Z = __BLOB__BLOB_000301__;
      Z = createResourceFile("smallStar.png", Z, userDataFolder);
      var am = new Window("dialog");
      am.text = "Limber Rig & Pose Options";
      am.preferredSize.width = 340;
      am.preferredSize.height = 200;
      am.orientation = "column";
      am.alignChildren = ["center", "top"];
      am.spacing = 0;
      am.margins = 16;
      var aa = 20;
      var I = 120;
      var j = 120;
      var ac = am.add("group", undefined, { name: "activeLimbRow" });
      ac.alignChildren = ["top", "center"];
      ac.margins = [0, 0, 0, 16];
      var ai = ac.add("statictext", undefined, undefined, {
        name: "limbLayer",
      });
      ai.text = "No Limb selected";
      var u = am.add("group", undefined, { name: "hiprow" });
      u.orientation = "row";
      u.alignChildren = ["left", "center"];
      u.spacing = 0;
      u.margins = 0;
      var ar = u.add("group", undefined, { name: "group1" });
      ar.orientation = "row";
      ar.alignChildren = ["left", "center"];
      ar.spacing = 10;
      ar.margins = [0, 0, 10, 0];
      var q = __BLOB__BLOB_000302__;
      q = createResourceFile("hipimg.png", q, userDataFolder);
      var k = ar.add("image", undefined, File.decode(q), { name: "hipimg" });
      k.preferredSize = [40, 20];
      k.onDraw = function () {
        reduceImage(this);
      };
      var H = u.add("statictext", undefined, undefined, { name: "hiptext" });
      H.text = "Hip / Shoulder Layer";
      H.preferredSize.width = j;
      var O = J(au);
      var V = u.add("dropdownlist", undefined, undefined, {
        items: O,
        name: "hipselect",
      });
      V.selection = 0;
      V.preferredSize.width = I;
      V.preferredSize.height = aa;
      var A = am.add("group", undefined, { name: "uprow" });
      A.orientation = "row";
      A.alignChildren = ["left", "center"];
      A.spacing = 0;
      A.margins = 0;
      var ap = A.add("group", undefined, { name: "group2" });
      ap.orientation = "row";
      ap.alignChildren = ["left", "center"];
      ap.spacing = 10;
      ap.margins = [0, 0, 10, 0];
      var S = __BLOB__BLOB_000303__;
      S = createResourceFile("upimg.png", S, userDataFolder);
      var p = ap.add("image", undefined, File.decode(S), { name: "upimg" });
      p.preferredSize = [40, 20];
      p.onDraw = function () {
        reduceImage(this);
      };
      var z = A.add("statictext", undefined, undefined, { name: "uptext" });
      z.text = "Upper Art Layer";
      z.preferredSize.width = j;
      var T = J(au);
      var v = A.add("dropdownlist", undefined, undefined, {
        items: T,
        name: "upselect",
      });
      U(v);
      v.selection = 0;
      v.preferredSize.width = I;
      v.preferredSize.height = aa;
      var s = am.add("group", undefined, { name: "kneerow" });
      s.orientation = "row";
      s.alignChildren = ["left", "center"];
      s.spacing = 0;
      s.margins = 0;
      var ao = s.add("group", undefined, { name: "group3" });
      ao.orientation = "row";
      ao.alignChildren = ["left", "center"];
      ao.spacing = 10;
      ao.margins = [0, 0, 10, 0];
      var ae = __BLOB__BLOB_000304__;
      ae = createResourceFile("kneeimg.png", ae, userDataFolder);
      var d = ao.add("image", undefined, File.decode(ae), { name: "kneeimg" });
      d.preferredSize = [40, 20];
      d.onDraw = function () {
        reduceImage(this);
      };
      var X = s.add("statictext", undefined, undefined, { name: "kneetext" });
      X.text = "Knee / Elbow Layer";
      X.preferredSize.width = j;
      var B = J(au);
      var f = s.add("dropdownlist", undefined, undefined, {
        items: B,
        name: "kneeselect",
      });
      f.selection = 0;
      f.preferredSize.width = I;
      f.preferredSize.height = aa;
      var Q = am.add("group", undefined, { name: "lowrow" });
      Q.orientation = "row";
      Q.alignChildren = ["left", "center"];
      Q.spacing = 0;
      Q.margins = 0;
      var an = Q.add("group", undefined, { name: "group4" });
      an.orientation = "row";
      an.alignChildren = ["left", "center"];
      an.spacing = 10;
      an.margins = [0, 0, 10, 0];
      var ab = __BLOB__BLOB_000305__;
      ab = createResourceFile("lowimg.png", ab, userDataFolder);
      var L = an.add("image", undefined, File.decode(ab), { name: "lowimg" });
      L.preferredSize = [40, 20];
      L.onDraw = function () {
        reduceImage(this);
      };
      var R = Q.add("statictext", undefined, undefined, { name: "lowtext" });
      R.text = "Lower Art Layer";
      R.preferredSize.width = j;
      var n = J(au);
      var af = Q.add("dropdownlist", undefined, undefined, {
        items: n,
        name: "lowselect",
      });
      U(af);
      af.selection = 0;
      af.preferredSize.width = I;
      af.preferredSize.height = aa;
      var F = am.add("group", undefined, { name: "anklerow" });
      F.orientation = "row";
      F.alignChildren = ["left", "center"];
      F.spacing = 0;
      F.margins = 0;
      var ak = F.add("group", undefined, { name: "group5" });
      ak.orientation = "row";
      ak.alignChildren = ["left", "center"];
      ak.spacing = 10;
      ak.margins = [0, 0, 10, 0];
      var h = __BLOB__BLOB_000306__;
      h = createResourceFile("ankleimg.png", h, userDataFolder);
      var r = ak.add("image", undefined, File.decode(h), { name: "ankleimg" });
      r.preferredSize = [40, 20];
      r.onDraw = function () {
        reduceImage(this);
      };
      var aj = F.add("statictext", undefined, undefined, { name: "ankletext" });
      aj.text = "Ankle / Wrist Layer";
      aj.preferredSize.width = j;
      var al = J(au);
      var E = F.add("dropdownlist", undefined, undefined, {
        items: al,
        name: "ankleselect",
      });
      E.selection = 0;
      E.preferredSize.width = I;
      E.preferredSize.height = aa;
      var g = am.add("group", undefined, { name: "resultTextRow" });
      g.alignChildren = ["bottom", "center"];
      g.alignment = ["bottom", "center"];
      g.margins = 10;
      var K = g.add("statictext", undefined, undefined, {
        alignChildren: ["top", "center"],
        alignment: ["top", "center"],
        multiline: "true",
        name: "resultText",
        orientation: "center",
      });
      K.preferredSize = [203, 95];
      K.text = "no action will be taken.";
      var ar = am.add("group", undefined, { name: "group1" });
      ar.preferredSize.height = 40;
      ar.orientation = "row";
      ar.alignChildren = ["center", "bottom"];
      ar.spacing = 20;
      ar.margins = 0;
      var y = ar.add("button", undefined, undefined, { name: "cancelbutton" });
      y.text = "Cancel";
      y.preferredSize.width = 100;
      var D = ar.add("button", undefined, undefined, { name: "okbutton" });
      D.text = "OK";
      D.preferredSize.width = 100;
      D.onClick = function () {
        if (P) {
          app.beginUndoGroup("pose limb");
          if (W) {
            m(W);
          }
          P();
          app.endUndoGroup();
          am.close();
        } else {
          am.close();
          makeAlert("No action will be taken");
        }
      };
      var aq = [V, v, f, af, E];
      for (var ag = 0; ag < aq.length; ag += 1) {
        aq[ag].onChange = function () {
          G(this, aq);
          at();
        };
      }
      var N = x(aq, ah);
      if (N.result) {
        am.show();
      } else {
        if (N.reason === "bone") {
          makeAlert(
            "The Rig tool only works for Tapered Limbs, not bone limbs.",
          );
        } else {
          if (N.reason === "too many") {
            makeAlert(
              "Too many layers selected. The Rig tool works with 6 layers or fewer.",
            );
          } else {
            if (N.reason === "non shape") {
              makeAlert(
                "Please only select shape layers to work with the Rig tool.",
              );
            } else {
              if (N.reason === "no selection") {
                makeAlert("No selection.");
              } else {
                if (N.reason === "no shapes") {
                  makeAlert(
                    "You must select at least one non-limb layer to use the Rig & Pose tool",
                  );
                } else {
                  makeAlert("Selection error");
                }
              }
            }
          }
        }
      }
      at();
    }
    function LimberTaper(g, c) {
      var j = app.project.activeItem;
      if (!j || !(j instanceof CompItem)) {
        alert("Please select a composition first");
        return;
      }
      var d = j;
      d.openInViewer();
      if (c) {
        var f = d.layers.addShape();
        f.name = g.ankle;
        f.label = lmbraf.getSetting("userPrefs", "controllerLabelColor");
        makeAnkleProps(f, g);
        var b = d.layers.addShape();
        b.name = g.hip;
        b.label = lmbraf.getSetting("userPrefs", "controllerLabelColor");
        makeHipProps(b, g);
      }
      var i = d.layers.addShape();
      i.name = g.leg;
      i.label = lmbraf.getSetting("userPrefs", "limbLabelColor");
      i.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      i.property("ADBE Root Vectors Group").property(1).name = "Limb";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1).name = "Upper Group";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(1).name = "Distal Upper";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Shape - Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(1).name = "Taper Path";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Graphic - Fill");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2).name = "Fill";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property("ADBE Vector Fill Color")
        .setValue([1, 0, 0, 1]);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2).name = "Proximal Upper";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Shape - Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1).name = "Taper Path";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1)
        .property("ADBE Vector Shape Direction")
        .setValue(2);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Graphic - Fill");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2).name = "Fill";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property("ADBE Vector Fill Color")
        .setValue([1, 0, 0, 1]);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property(3)
        .property("ADBE Vector Rotation")
        .setValue(0);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2).name = "Lower Group";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1).name = "Proximal Lower";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Shape - Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1)
        .property(2)
        .property(1).name = "Taper Path";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Graphic - Fill");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1)
        .property(2)
        .property(2).name = "Fill";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(1)
        .property(2)
        .property(2)
        .property("ADBE Vector Fill Color")
        .setValue([1, 0, 0, 1]);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2).name = "Distal Lower";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Shape - Group");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(1).name = "Taper Path";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(1)
        .property("ADBE Vector Shape Direction")
        .setValue(2);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Graphic - Fill");
      i
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2).name = "Fill";
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property(2)
        .property("ADBE Vector Fill Color")
        .setValue([1, 0, 0, 1]);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      i.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property(3)
        .property("ADBE Vector Rotation")
        .setValue(0);
      i.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      i.property("ADBE Root Vectors Group").property(2).name = "Admin";
      i.property("ADBE Root Vectors Group").property(2).enabled = false;
      i.property("ADBE Root Vectors Group")
        .property(2)
        .property(3)
        .property("ADBE Vector Scale")
        .setValue([100, 100]);
      i.property("ADBE Transform Group")
        .property("ADBE Anchor Point")
        .setValue([0, 0, 0]);
      i.property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([0, 0, 0]);
      i.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(0);
      if (c) {
        makeAnkleExpressions(f, g);
        makeHipExpressions(b, g);
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property(2)
          .property(1)
          .property(2)
          .property(1)
          .property("ADBE Vector Shape").expression =
          "// Limber Taper\n// FUNCTIONS\nfunction midPoint(p1, p2, per) {\n\treturn [p1[0] + (p2[0] - p1[0]) * per, p1[1] + (p2[1] - p1[1]) * per];\n}\n\nfunction tangentsAbsolute(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] += vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction tangentsRelative(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] -= vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction fx(point) {\n\treturn [-point[0], point[1]];\n}\n\nfunction fy(point) {\n\treturn [point[0], -point[1]];\n}\n\nfunction fxy(point) {\n\treturn [-point[0], -point[1]];\n}\n\nfunction flipArrayY(vertices, flipPoint) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\tvertices[i] = [vertices[i][0], flipPoint * 2 - vertices[i][1]];\n\t}\n\treturn vertices;\n}\n\nfunction pointAlongY(val, p1, p2) {\n\tvar linearValue = linear(val, p1[1], p2[1], p1[0], p2[0]);\n\treturn [linearValue, val];\n}\n\nfunction xOnCircleGivenY(x, r) {\n\treturn Math.sqrt((r * r) - (x * x));\n}\n\n// CONSTANTS\nvar semiFac = 0.5522847498307933; // factor for Bezier circles\n" +
          File.decode("var%20quad%20=%20(0.5%20*%20Math.PI);%20//%2090%C2%BA") +
          '\nvar groupName = thisProperty.propertyGroup(3).name;\nvar isUpper = groupName.split(" ")[1] === "Upper";\nvar isProximal = groupName.split(" ")[0] === "Proximal";\n\n// DOM ELEMENTS\nvar endctrl = thisComp.layer("' +
          g.ankle +
          '");\nvar lowerSplit = endctrl.effect("Limber")("Lower Split");\nvar lowerSplitValue = lowerSplit.value / 100;\nvar upperSplit = endctrl.effect("Limber")("Upper Split");\nvar upperSplitValue = upperSplit.value / 100;\nvar lowerRounding = endctrl.effect("Limber")("Lower Rounding");\nvar lowerRoundingValue = lowerRounding.value / 100;\nvar upperRounding = endctrl.effect("Limber")("Upper Rounding");\nvar upperRoundingValue = upperRounding.value / 100;\nvar squareEndValue = endctrl.effect("Limber")("Square End").value;\nvar sides = endctrl.content("Admin").content("sides").transform.position;\nif (isUpper) {var c2 = endctrl.content("Admin").content("p2blend").transform.scale; var c1 = endctrl.content("Admin").content("p1").transform.scale; var dist = sides[1]}\nelse {var c1 = endctrl.content("Admin").content("p2blend").transform.scale; var c2 = endctrl.content("Admin").content("p3ik").transform.scale;var dist = sides[0]}\n\n// DECLARE VARIABLES\nvar distrad = c2[0] * 0.5;\nvar proxrad = c1[0] * 0.5;\nvar pers = -lowerRoundingValue;\nvar splitY = isProximal ? lowerSplitValue : (1 - lowerSplitValue);\nif (isUpper) {\n\tpers = -upperRoundingValue;\n\tsplitY = isProximal ? upperSplitValue : (1 - upperSplitValue);\n}\nsplitY = -dist * splitY -0.5;\nvar rad1 = Math.round((isProximal ? proxrad : distrad) * 100000) / 100000;\nvar rad2 = Math.round((isProximal ? distrad : proxrad) * 100000) / 100000;\nvar A = Math.acos(clamp((rad2 - rad1) / dist, -1, 1));\nvar r3a = [(rad2 * Math.sin(A)), -(dist - rad2 * Math.cos(A))];\nvar r3b = [(rad1 * Math.sin(A)), (rad1 * Math.cos(A))];\nvar semiVerts = [\n\t[rad1, 0],\n\t[0, rad1],\n\t[-rad1, 0]\n];\nvar semiIns = tangentsAbsolute(semiVerts, [\n\t[0, 0],\n\t[(rad1 * semiFac), 0],\n\t[0, rad1 * semiFac]\n]);\nvar semiOuts = tangentsAbsolute(semiVerts, [\n\t[0, rad1 * semiFac],\n\t[-rad1 * semiFac, 0],\n\t[0, 0]\n]);\n\n// THE FOUR STATES\nif (rad2 < rad1) {\n\tif (splitY > r3b[1]) { var state = 1 //1\n\t\tnewA = -Math.atan2(splitY, xOnCircleGivenY(splitY, rad1));\n\t\tnewT = newA / quad;\n\t\tnq0 = midPoint(semiVerts[0], semiOuts[0], newT);\n\t\tnq1 = midPoint(semiOuts[0], semiIns[1], newT);\n\t\tnq2 = midPoint(semiIns[1], semiVerts[1], newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[0], semiVerts[1], semiVerts[2], fxy(ns0), [0, splitY], fy(ns0), fy(ns0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(nq0), semiVerts[0], semiIns[1], semiIns[2], fxy(nr0), [0, splitY], fy(ns0), fy(ns0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiVerts[0], semiOuts[0], semiOuts[1], fxy(nq0), fxy(ns0), [0, splitY], fy(ns0), fy(nr0)]);\n\t} else { var state = 2 // 2\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[1], semiVerts[2], fxy(s0), v4, [0, splitY], v6, fy(s0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(q0), semiIns[1], semiIns[2], fxy(r0), v4, [0, splitY], v6, fy(s0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiOuts[0], semiOuts[1], fxy(q0), fxy(s0), v4, [0, splitY], v6, fy(r0)]);\n\t}\n} else { \n\tif (splitY < r3a[1]) { var state = 3 // 3\n\t\t\tvar UpsemiVerts = [\n\t\t\t[rad2, -dist],\n\t\t\t[0, -(dist - rad2)],\n\t\t\t[-rad2, -dist]\n\t\t];\n\t\tvar UpsemiIns = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, 0],\n\t\t\t[(rad2 * semiFac), 0],\n\t\t\t[0, rad2 * semiFac]\n\t\t]);\n\t\tvar UpsemiOuts = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, rad2 * semiFac],\n\t\t\t[-rad2 * semiFac, 0],\n\t\t\t[0, 0]\n\t\t]);\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tif (rad2 == rad1) {var upA = 0.00001;} else {var upA = quad - Math.acos(clamp((rad2 - rad1) / dist, -1, 1));}\n\t\tvar upT = upA / quad;\n\t\tvar uq0 = midPoint(UpsemiVerts[0], UpsemiOuts[0], upT);\n\t\tuq1 = midPoint(UpsemiOuts[0], UpsemiIns[1], upT);\n\t\tuq2 = midPoint(UpsemiIns[1], UpsemiVerts[1], upT);\n\t\tur0 = midPoint(uq0, uq1, upT);\n\t\tur1 = midPoint(uq1, uq2, upT);\n\t\tus0 = midPoint(ur0, ur1, upT);\n\t\tnewA = -Math.atan2(-dist - splitY, xOnCircleGivenY(-dist - splitY, rad2));\n\t\tnewT = newA / upA;\n\t\tnq0 = midPoint(UpsemiVerts[0], uq0, newT);\n\t\tnq1 = midPoint(uq0, ur0, newT);\n\t\tnq2 = midPoint(ur0, us0, newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tnewVerts = [s0, semiVerts[1], fx(s0), fx(r3a), fx(ns0), [0, splitY], ns0, us0];\n\t\tnewIns = tangentsRelative(newVerts, [s0, q2, fx(r1), fx(r3a), fx(nr1), [0, splitY], ns0, us0]);\n\t\tnewOuts = tangentsRelative(newVerts, [r1, fx(q2), fx(r0), fx(nq2), fx(ns0), [0, splitY], nr1, r3a]);\n\t} else { var state = 4 // 4\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, s0);\n\t\tv4 = fx(v6);\n\t\tnewVerts = [s0, s0, semiVerts[1], fx(s0), v4, [0, splitY], v6, v6];\n\t\tnewIns = tangentsRelative(newVerts, [s0, s0, q2, fx(r1), v4, [0, splitY], v6, v6]);\n\t\tnewOuts = tangentsRelative(newVerts, [s0, r1, fx(q2), fx(r0), v4, [0, splitY], v6, r0]);\n\t}\n}\n\n// FLIP THE SHAPE IF IT\'S DISTAL\nif (isProximal != true) {\n\tvar tempVerts = newVerts;\n\tvar tempIns = newIns;\n\tvar tempOuts = newOuts;\n\tnewVerts = flipArrayY(tempVerts, -dist * 0.5).reverse();\n\tnewIns = flipArrayY(tempOuts, 0).reverse();\n\tnewOuts = flipArrayY(tempIns, 0).reverse();\n}\n\n// APPLY ROUNDING\nif (pers != 0) {\n\tvar pVert = isProximal ? 5 : 2;\n\tnewVerts[pVert] += isProximal ? [0, newVerts[pVert + 1][0] * pers] : [0, -newVerts[pVert + 1][0] * pers];\n\tnewIns[pVert] = [-newVerts[pVert + 1][0] * semiFac, 0];\n\tnewOuts[pVert] = [newVerts[pVert + 1][0] * semiFac, 0];\n\tvar B = isProximal ? Math.PI / 2 - A : -(Math.PI / 2 + A);\n\tvar temp6 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewIns[pVert + 1][0] = -temp6[1] * Math.sin(B);\n\tnewIns[pVert + 1][1] = temp6[1] * Math.cos(B);\n\tvar temp4 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewOuts[pVert - 1][0] = -temp4[1] * Math.sin(-B);\n\tnewOuts[pVert - 1][1] = temp4[1] * Math.cos(-B);\n}\n\n// APPLY SQUARE END\t\nif (squareEndValue && !isUpper && !isProximal) {\n\tif (state === 1) {\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n\n\tif (state === 2) {\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 3) {\n\t\tnewVerts[5] = [-distrad, -dist];\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 4) {\n\t\tnewVerts[4] = [-distrad, -dist];\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewVerts[6] = [distrad, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n}\n\ncreatePath(newVerts, newIns, newOuts, true);';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property(2)
          .property(1)
          .property(2)
          .property(2)
          .property("ADBE Vector Fill Color").expression =
          'thisComp.layer("' + g.ankle + '").effect("Limber")("Middle Color");';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property(2)
          .property(2)
          .property(2)
          .property(1)
          .property("ADBE Vector Shape").expression =
          "// Limber Taper\n// FUNCTIONS\nfunction midPoint(p1, p2, per) {\n\treturn [p1[0] + (p2[0] - p1[0]) * per, p1[1] + (p2[1] - p1[1]) * per];\n}\n\nfunction tangentsAbsolute(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] += vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction tangentsRelative(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] -= vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction fx(point) {\n\treturn [-point[0], point[1]];\n}\n\nfunction fy(point) {\n\treturn [point[0], -point[1]];\n}\n\nfunction fxy(point) {\n\treturn [-point[0], -point[1]];\n}\n\nfunction flipArrayY(vertices, flipPoint) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\tvertices[i] = [vertices[i][0], flipPoint * 2 - vertices[i][1]];\n\t}\n\treturn vertices;\n}\n\nfunction pointAlongY(val, p1, p2) {\n\tvar linearValue = linear(val, p1[1], p2[1], p1[0], p2[0]);\n\treturn [linearValue, val];\n}\n\nfunction xOnCircleGivenY(x, r) {\n\treturn Math.sqrt((r * r) - (x * x));\n}\n\n// CONSTANTS\nvar semiFac = 0.5522847498307933; // factor for Bezier circles\n" +
          File.decode("var%20quad%20=%20(0.5%20*%20Math.PI);%20//%2090%C2%BA") +
          '\nvar groupName = thisProperty.propertyGroup(3).name;\nvar isUpper = groupName.split(" ")[1] === "Upper";\nvar isProximal = groupName.split(" ")[0] === "Proximal";\n\n// DOM ELEMENTS\nvar endctrl = thisComp.layer("' +
          g.ankle +
          '");\nvar lowerSplit = endctrl.effect("Limber")("Lower Split");\nvar lowerSplitValue = lowerSplit.value / 100;\nvar upperSplit = endctrl.effect("Limber")("Upper Split");\nvar upperSplitValue = upperSplit.value / 100;\nvar lowerRounding = endctrl.effect("Limber")("Lower Rounding");\nvar lowerRoundingValue = lowerRounding.value / 100;\nvar upperRounding = endctrl.effect("Limber")("Upper Rounding");\nvar upperRoundingValue = upperRounding.value / 100;\nvar squareEndValue = endctrl.effect("Limber")("Square End").value;\nvar sides = endctrl.content("Admin").content("sides").transform.position;\nif (isUpper) {var c2 = endctrl.content("Admin").content("p2blend").transform.scale; var c1 = endctrl.content("Admin").content("p1").transform.scale; var dist = sides[1]}\nelse {var c1 = endctrl.content("Admin").content("p2blend").transform.scale; var c2 = endctrl.content("Admin").content("p3ik").transform.scale;var dist = sides[0]}\n\n// DECLARE VARIABLES\nvar distrad = c2[0] * 0.5;\nvar proxrad = c1[0] * 0.5;\nvar pers = -lowerRoundingValue;\nvar splitY = isProximal ? lowerSplitValue : (1 - lowerSplitValue);\nif (isUpper) {\n\tpers = -upperRoundingValue;\n\tsplitY = isProximal ? upperSplitValue : (1 - upperSplitValue);\n}\nsplitY = -dist * splitY -0.5;\nvar rad1 = Math.round((isProximal ? proxrad : distrad) * 100000) / 100000;\nvar rad2 = Math.round((isProximal ? distrad : proxrad) * 100000) / 100000;\nvar A = Math.acos(clamp((rad2 - rad1) / dist, -1, 1));\nvar r3a = [(rad2 * Math.sin(A)), -(dist - rad2 * Math.cos(A))];\nvar r3b = [(rad1 * Math.sin(A)), (rad1 * Math.cos(A))];\nvar semiVerts = [\n\t[rad1, 0],\n\t[0, rad1],\n\t[-rad1, 0]\n];\nvar semiIns = tangentsAbsolute(semiVerts, [\n\t[0, 0],\n\t[(rad1 * semiFac), 0],\n\t[0, rad1 * semiFac]\n]);\nvar semiOuts = tangentsAbsolute(semiVerts, [\n\t[0, rad1 * semiFac],\n\t[-rad1 * semiFac, 0],\n\t[0, 0]\n]);\n\n// THE FOUR STATES\nif (rad2 < rad1) {\n\tif (splitY > r3b[1]) { var state = 1 //1\n\t\tnewA = -Math.atan2(splitY, xOnCircleGivenY(splitY, rad1));\n\t\tnewT = newA / quad;\n\t\tnq0 = midPoint(semiVerts[0], semiOuts[0], newT);\n\t\tnq1 = midPoint(semiOuts[0], semiIns[1], newT);\n\t\tnq2 = midPoint(semiIns[1], semiVerts[1], newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[0], semiVerts[1], semiVerts[2], fxy(ns0), [0, splitY], fy(ns0), fy(ns0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(nq0), semiVerts[0], semiIns[1], semiIns[2], fxy(nr0), [0, splitY], fy(ns0), fy(ns0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiVerts[0], semiOuts[0], semiOuts[1], fxy(nq0), fxy(ns0), [0, splitY], fy(ns0), fy(nr0)]);\n\t} else { var state = 2 // 2\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[1], semiVerts[2], fxy(s0), v4, [0, splitY], v6, fy(s0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(q0), semiIns[1], semiIns[2], fxy(r0), v4, [0, splitY], v6, fy(s0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiOuts[0], semiOuts[1], fxy(q0), fxy(s0), v4, [0, splitY], v6, fy(r0)]);\n\t}\n} else { \n\tif (splitY < r3a[1]) { var state = 3 // 3\n\t\t\tvar UpsemiVerts = [\n\t\t\t[rad2, -dist],\n\t\t\t[0, -(dist - rad2)],\n\t\t\t[-rad2, -dist]\n\t\t];\n\t\tvar UpsemiIns = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, 0],\n\t\t\t[(rad2 * semiFac), 0],\n\t\t\t[0, rad2 * semiFac]\n\t\t]);\n\t\tvar UpsemiOuts = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, rad2 * semiFac],\n\t\t\t[-rad2 * semiFac, 0],\n\t\t\t[0, 0]\n\t\t]);\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tif (rad2 == rad1) {var upA = 0.00001;} else {var upA = quad - Math.acos(clamp((rad2 - rad1) / dist, -1, 1));}\n\t\tvar upT = upA / quad;\n\t\tvar uq0 = midPoint(UpsemiVerts[0], UpsemiOuts[0], upT);\n\t\tuq1 = midPoint(UpsemiOuts[0], UpsemiIns[1], upT);\n\t\tuq2 = midPoint(UpsemiIns[1], UpsemiVerts[1], upT);\n\t\tur0 = midPoint(uq0, uq1, upT);\n\t\tur1 = midPoint(uq1, uq2, upT);\n\t\tus0 = midPoint(ur0, ur1, upT);\n\t\tnewA = -Math.atan2(-dist - splitY, xOnCircleGivenY(-dist - splitY, rad2));\n\t\tnewT = newA / upA;\n\t\tnq0 = midPoint(UpsemiVerts[0], uq0, newT);\n\t\tnq1 = midPoint(uq0, ur0, newT);\n\t\tnq2 = midPoint(ur0, us0, newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tnewVerts = [s0, semiVerts[1], fx(s0), fx(r3a), fx(ns0), [0, splitY], ns0, us0];\n\t\tnewIns = tangentsRelative(newVerts, [s0, q2, fx(r1), fx(r3a), fx(nr1), [0, splitY], ns0, us0]);\n\t\tnewOuts = tangentsRelative(newVerts, [r1, fx(q2), fx(r0), fx(nq2), fx(ns0), [0, splitY], nr1, r3a]);\n\t} else { var state = 4 // 4\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, s0);\n\t\tv4 = fx(v6);\n\t\tnewVerts = [s0, s0, semiVerts[1], fx(s0), v4, [0, splitY], v6, v6];\n\t\tnewIns = tangentsRelative(newVerts, [s0, s0, q2, fx(r1), v4, [0, splitY], v6, v6]);\n\t\tnewOuts = tangentsRelative(newVerts, [s0, r1, fx(q2), fx(r0), v4, [0, splitY], v6, r0]);\n\t}\n}\n\n// FLIP THE SHAPE IF IT\'S DISTAL\nif (isProximal != true) {\n\tvar tempVerts = newVerts;\n\tvar tempIns = newIns;\n\tvar tempOuts = newOuts;\n\tnewVerts = flipArrayY(tempVerts, -dist * 0.5).reverse();\n\tnewIns = flipArrayY(tempOuts, 0).reverse();\n\tnewOuts = flipArrayY(tempIns, 0).reverse();\n}\n\n// APPLY ROUNDING\nif (pers != 0) {\n\tvar pVert = isProximal ? 5 : 2;\n\tnewVerts[pVert] += isProximal ? [0, newVerts[pVert + 1][0] * pers] : [0, -newVerts[pVert + 1][0] * pers];\n\tnewIns[pVert] = [-newVerts[pVert + 1][0] * semiFac, 0];\n\tnewOuts[pVert] = [newVerts[pVert + 1][0] * semiFac, 0];\n\tvar B = isProximal ? Math.PI / 2 - A : -(Math.PI / 2 + A);\n\tvar temp6 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewIns[pVert + 1][0] = -temp6[1] * Math.sin(B);\n\tnewIns[pVert + 1][1] = temp6[1] * Math.cos(B);\n\tvar temp4 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewOuts[pVert - 1][0] = -temp4[1] * Math.sin(-B);\n\tnewOuts[pVert - 1][1] = temp4[1] * Math.cos(-B);\n}\n\n// APPLY SQUARE END\t\nif (squareEndValue && !isUpper && !isProximal) {\n\tif (state === 1) {\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n\n\tif (state === 2) {\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 3) {\n\t\tnewVerts[5] = [-distrad, -dist];\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 4) {\n\t\tnewVerts[4] = [-distrad, -dist];\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewVerts[6] = [distrad, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n}\n\ncreatePath(newVerts, newIns, newOuts, true);';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property(2)
          .property(2)
          .property(2)
          .property(2)
          .property("ADBE Vector Fill Color").expression =
          'thisComp.layer("' + g.ankle + '").effect("Limber")("Upper Color");';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property(3)
          .property("ADBE Vector Position").expression =
          'thisComp.layer("' +
          g.ankle +
          '").content("Admin").content("p1").transform.position';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property(3)
          .property("ADBE Vector Rotation").expression =
          'thisComp.layer("' +
          g.ankle +
          '").content("Admin").content("angles").transform.anchorPoint[0]';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property(2)
          .property(1)
          .property(2)
          .property(1)
          .property("ADBE Vector Shape").expression =
          "// Limber Taper\n// FUNCTIONS\nfunction midPoint(p1, p2, per) {\n\treturn [p1[0] + (p2[0] - p1[0]) * per, p1[1] + (p2[1] - p1[1]) * per];\n}\n\nfunction tangentsAbsolute(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] += vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction tangentsRelative(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] -= vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction fx(point) {\n\treturn [-point[0], point[1]];\n}\n\nfunction fy(point) {\n\treturn [point[0], -point[1]];\n}\n\nfunction fxy(point) {\n\treturn [-point[0], -point[1]];\n}\n\nfunction flipArrayY(vertices, flipPoint) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\tvertices[i] = [vertices[i][0], flipPoint * 2 - vertices[i][1]];\n\t}\n\treturn vertices;\n}\n\nfunction pointAlongY(val, p1, p2) {\n\tvar linearValue = linear(val, p1[1], p2[1], p1[0], p2[0]);\n\treturn [linearValue, val];\n}\n\nfunction xOnCircleGivenY(x, r) {\n\treturn Math.sqrt((r * r) - (x * x));\n}\n\n// CONSTANTS\nvar semiFac = 0.5522847498307933; // factor for Bezier circles\n" +
          File.decode("var%20quad%20=%20(0.5%20*%20Math.PI);%20//%2090%C2%BA") +
          '\nvar groupName = thisProperty.propertyGroup(3).name;\nvar isUpper = groupName.split(" ")[1] === "Upper";\nvar isProximal = groupName.split(" ")[0] === "Proximal";\n\n// DOM ELEMENTS\nvar endctrl = thisComp.layer("' +
          g.ankle +
          '");\nvar lowerSplit = endctrl.effect("Limber")("Lower Split");\nvar lowerSplitValue = lowerSplit.value / 100;\nvar upperSplit = endctrl.effect("Limber")("Upper Split");\nvar upperSplitValue = upperSplit.value / 100;\nvar lowerRounding = endctrl.effect("Limber")("Lower Rounding");\nvar lowerRoundingValue = lowerRounding.value / 100;\nvar upperRounding = endctrl.effect("Limber")("Upper Rounding");\nvar upperRoundingValue = upperRounding.value / 100;\nvar squareEndValue = endctrl.effect("Limber")("Square End").value;\nvar sides = endctrl.content("Admin").content("sides").transform.position;\nif (isUpper) {var c2 = endctrl.content("Admin").content("p2blend").transform.scale; var c1 = endctrl.content("Admin").content("p1").transform.scale; var dist = sides[1]}\nelse {var c1 = endctrl.content("Admin").content("p2blend").transform.scale; var c2 = endctrl.content("Admin").content("p3ik").transform.scale;var dist = sides[0]}\n\n// DECLARE VARIABLES\nvar distrad = c2[0] * 0.5;\nvar proxrad = c1[0] * 0.5;\nvar pers = -lowerRoundingValue;\nvar splitY = isProximal ? lowerSplitValue : (1 - lowerSplitValue);\nif (isUpper) {\n\tpers = -upperRoundingValue;\n\tsplitY = isProximal ? upperSplitValue : (1 - upperSplitValue);\n}\nsplitY = -dist * splitY -0.5;\nvar rad1 = Math.round((isProximal ? proxrad : distrad) * 100000) / 100000;\nvar rad2 = Math.round((isProximal ? distrad : proxrad) * 100000) / 100000;\nvar A = Math.acos(clamp((rad2 - rad1) / dist, -1, 1));\nvar r3a = [(rad2 * Math.sin(A)), -(dist - rad2 * Math.cos(A))];\nvar r3b = [(rad1 * Math.sin(A)), (rad1 * Math.cos(A))];\nvar semiVerts = [\n\t[rad1, 0],\n\t[0, rad1],\n\t[-rad1, 0]\n];\nvar semiIns = tangentsAbsolute(semiVerts, [\n\t[0, 0],\n\t[(rad1 * semiFac), 0],\n\t[0, rad1 * semiFac]\n]);\nvar semiOuts = tangentsAbsolute(semiVerts, [\n\t[0, rad1 * semiFac],\n\t[-rad1 * semiFac, 0],\n\t[0, 0]\n]);\n\n// THE FOUR STATES\nif (rad2 < rad1) {\n\tif (splitY > r3b[1]) { var state = 1 //1\n\t\tnewA = -Math.atan2(splitY, xOnCircleGivenY(splitY, rad1));\n\t\tnewT = newA / quad;\n\t\tnq0 = midPoint(semiVerts[0], semiOuts[0], newT);\n\t\tnq1 = midPoint(semiOuts[0], semiIns[1], newT);\n\t\tnq2 = midPoint(semiIns[1], semiVerts[1], newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[0], semiVerts[1], semiVerts[2], fxy(ns0), [0, splitY], fy(ns0), fy(ns0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(nq0), semiVerts[0], semiIns[1], semiIns[2], fxy(nr0), [0, splitY], fy(ns0), fy(ns0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiVerts[0], semiOuts[0], semiOuts[1], fxy(nq0), fxy(ns0), [0, splitY], fy(ns0), fy(nr0)]);\n\t} else { var state = 2 // 2\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[1], semiVerts[2], fxy(s0), v4, [0, splitY], v6, fy(s0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(q0), semiIns[1], semiIns[2], fxy(r0), v4, [0, splitY], v6, fy(s0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiOuts[0], semiOuts[1], fxy(q0), fxy(s0), v4, [0, splitY], v6, fy(r0)]);\n\t}\n} else { \n\tif (splitY < r3a[1]) { var state = 3 // 3\n\t\t\tvar UpsemiVerts = [\n\t\t\t[rad2, -dist],\n\t\t\t[0, -(dist - rad2)],\n\t\t\t[-rad2, -dist]\n\t\t];\n\t\tvar UpsemiIns = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, 0],\n\t\t\t[(rad2 * semiFac), 0],\n\t\t\t[0, rad2 * semiFac]\n\t\t]);\n\t\tvar UpsemiOuts = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, rad2 * semiFac],\n\t\t\t[-rad2 * semiFac, 0],\n\t\t\t[0, 0]\n\t\t]);\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tif (rad2 == rad1) {var upA = 0.00001;} else {var upA = quad - Math.acos(clamp((rad2 - rad1) / dist, -1, 1));}\n\t\tvar upT = upA / quad;\n\t\tvar uq0 = midPoint(UpsemiVerts[0], UpsemiOuts[0], upT);\n\t\tuq1 = midPoint(UpsemiOuts[0], UpsemiIns[1], upT);\n\t\tuq2 = midPoint(UpsemiIns[1], UpsemiVerts[1], upT);\n\t\tur0 = midPoint(uq0, uq1, upT);\n\t\tur1 = midPoint(uq1, uq2, upT);\n\t\tus0 = midPoint(ur0, ur1, upT);\n\t\tnewA = -Math.atan2(-dist - splitY, xOnCircleGivenY(-dist - splitY, rad2));\n\t\tnewT = newA / upA;\n\t\tnq0 = midPoint(UpsemiVerts[0], uq0, newT);\n\t\tnq1 = midPoint(uq0, ur0, newT);\n\t\tnq2 = midPoint(ur0, us0, newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tnewVerts = [s0, semiVerts[1], fx(s0), fx(r3a), fx(ns0), [0, splitY], ns0, us0];\n\t\tnewIns = tangentsRelative(newVerts, [s0, q2, fx(r1), fx(r3a), fx(nr1), [0, splitY], ns0, us0]);\n\t\tnewOuts = tangentsRelative(newVerts, [r1, fx(q2), fx(r0), fx(nq2), fx(ns0), [0, splitY], nr1, r3a]);\n\t} else { var state = 4 // 4\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, s0);\n\t\tv4 = fx(v6);\n\t\tnewVerts = [s0, s0, semiVerts[1], fx(s0), v4, [0, splitY], v6, v6];\n\t\tnewIns = tangentsRelative(newVerts, [s0, s0, q2, fx(r1), v4, [0, splitY], v6, v6]);\n\t\tnewOuts = tangentsRelative(newVerts, [s0, r1, fx(q2), fx(r0), v4, [0, splitY], v6, r0]);\n\t}\n}\n\n// FLIP THE SHAPE IF IT\'S DISTAL\nif (isProximal != true) {\n\tvar tempVerts = newVerts;\n\tvar tempIns = newIns;\n\tvar tempOuts = newOuts;\n\tnewVerts = flipArrayY(tempVerts, -dist * 0.5).reverse();\n\tnewIns = flipArrayY(tempOuts, 0).reverse();\n\tnewOuts = flipArrayY(tempIns, 0).reverse();\n}\n\n// APPLY ROUNDING\nif (pers != 0) {\n\tvar pVert = isProximal ? 5 : 2;\n\tnewVerts[pVert] += isProximal ? [0, newVerts[pVert + 1][0] * pers] : [0, -newVerts[pVert + 1][0] * pers];\n\tnewIns[pVert] = [-newVerts[pVert + 1][0] * semiFac, 0];\n\tnewOuts[pVert] = [newVerts[pVert + 1][0] * semiFac, 0];\n\tvar B = isProximal ? Math.PI / 2 - A : -(Math.PI / 2 + A);\n\tvar temp6 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewIns[pVert + 1][0] = -temp6[1] * Math.sin(B);\n\tnewIns[pVert + 1][1] = temp6[1] * Math.cos(B);\n\tvar temp4 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewOuts[pVert - 1][0] = -temp4[1] * Math.sin(-B);\n\tnewOuts[pVert - 1][1] = temp4[1] * Math.cos(-B);\n}\n\n// APPLY SQUARE END\t\nif (squareEndValue && !isUpper && !isProximal) {\n\tif (state === 1) {\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n\n\tif (state === 2) {\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 3) {\n\t\tnewVerts[5] = [-distrad, -dist];\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 4) {\n\t\tnewVerts[4] = [-distrad, -dist];\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewVerts[6] = [distrad, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n}\n\ncreatePath(newVerts, newIns, newOuts, true);';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property(2)
          .property(1)
          .property(2)
          .property(2)
          .property("ADBE Vector Fill Color").expression =
          'thisComp.layer("' + g.ankle + '").effect("Limber")("Middle Color");';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property(2)
          .property(2)
          .property(2)
          .property(1)
          .property("ADBE Vector Shape").expression =
          "// Limber Taper\n// FUNCTIONS\nfunction midPoint(p1, p2, per) {\n\treturn [p1[0] + (p2[0] - p1[0]) * per, p1[1] + (p2[1] - p1[1]) * per];\n}\n\nfunction tangentsAbsolute(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] += vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction tangentsRelative(vertices, tans) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\ttans[i] -= vertices[i];\n\t}\n\treturn tans;\n}\n\nfunction fx(point) {\n\treturn [-point[0], point[1]];\n}\n\nfunction fy(point) {\n\treturn [point[0], -point[1]];\n}\n\nfunction fxy(point) {\n\treturn [-point[0], -point[1]];\n}\n\nfunction flipArrayY(vertices, flipPoint) {\n\tfor (var i = 0, il = vertices.length; i < il; i++) {\n\t\tvertices[i] = [vertices[i][0], flipPoint * 2 - vertices[i][1]];\n\t}\n\treturn vertices;\n}\n\nfunction pointAlongY(val, p1, p2) {\n\tvar linearValue = linear(val, p1[1], p2[1], p1[0], p2[0]);\n\treturn [linearValue, val];\n}\n\nfunction xOnCircleGivenY(x, r) {\n\treturn Math.sqrt((r * r) - (x * x));\n}\n\n// CONSTANTS\nvar semiFac = 0.5522847498307933; // factor for Bezier circles\n" +
          File.decode("var%20quad%20=%20(0.5%20*%20Math.PI);%20//%2090%C2%BA") +
          '\nvar groupName = thisProperty.propertyGroup(3).name;\nvar isUpper = groupName.split(" ")[1] === "Upper";\nvar isProximal = groupName.split(" ")[0] === "Proximal";\n\n// DOM ELEMENTS\nvar endctrl = thisComp.layer("' +
          g.ankle +
          '");\nvar lowerSplit = endctrl.effect("Limber")("Lower Split");\nvar lowerSplitValue = lowerSplit.value / 100;\nvar upperSplit = endctrl.effect("Limber")("Upper Split");\nvar upperSplitValue = upperSplit.value / 100;\nvar lowerRounding = endctrl.effect("Limber")("Lower Rounding");\nvar lowerRoundingValue = lowerRounding.value / 100;\nvar upperRounding = endctrl.effect("Limber")("Upper Rounding");\nvar upperRoundingValue = upperRounding.value / 100;\nvar squareEndValue = endctrl.effect("Limber")("Square End").value;\nvar sides = endctrl.content("Admin").content("sides").transform.position;\nif (isUpper) {var c2 = endctrl.content("Admin").content("p2blend").transform.scale; var c1 = endctrl.content("Admin").content("p1").transform.scale; var dist = sides[1]}\nelse {var c1 = endctrl.content("Admin").content("p2blend").transform.scale; var c2 = endctrl.content("Admin").content("p3ik").transform.scale;var dist = sides[0]}\n\n// DECLARE VARIABLES\nvar distrad = c2[0] * 0.5;\nvar proxrad = c1[0] * 0.5;\nvar pers = -lowerRoundingValue;\nvar splitY = isProximal ? lowerSplitValue : (1 - lowerSplitValue);\nif (isUpper) {\n\tpers = -upperRoundingValue;\n\tsplitY = isProximal ? upperSplitValue : (1 - upperSplitValue);\n}\nsplitY = -dist * splitY -0.5;\nvar rad1 = Math.round((isProximal ? proxrad : distrad) * 100000) / 100000;\nvar rad2 = Math.round((isProximal ? distrad : proxrad) * 100000) / 100000;\nvar A = Math.acos(clamp((rad2 - rad1) / dist, -1, 1));\nvar r3a = [(rad2 * Math.sin(A)), -(dist - rad2 * Math.cos(A))];\nvar r3b = [(rad1 * Math.sin(A)), (rad1 * Math.cos(A))];\nvar semiVerts = [\n\t[rad1, 0],\n\t[0, rad1],\n\t[-rad1, 0]\n];\nvar semiIns = tangentsAbsolute(semiVerts, [\n\t[0, 0],\n\t[(rad1 * semiFac), 0],\n\t[0, rad1 * semiFac]\n]);\nvar semiOuts = tangentsAbsolute(semiVerts, [\n\t[0, rad1 * semiFac],\n\t[-rad1 * semiFac, 0],\n\t[0, 0]\n]);\n\n// THE FOUR STATES\nif (rad2 < rad1) {\n\tif (splitY > r3b[1]) { var state = 1 //1\n\t\tnewA = -Math.atan2(splitY, xOnCircleGivenY(splitY, rad1));\n\t\tnewT = newA / quad;\n\t\tnq0 = midPoint(semiVerts[0], semiOuts[0], newT);\n\t\tnq1 = midPoint(semiOuts[0], semiIns[1], newT);\n\t\tnq2 = midPoint(semiIns[1], semiVerts[1], newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[0], semiVerts[1], semiVerts[2], fxy(ns0), [0, splitY], fy(ns0), fy(ns0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(nq0), semiVerts[0], semiIns[1], semiIns[2], fxy(nr0), [0, splitY], fy(ns0), fy(ns0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiVerts[0], semiOuts[0], semiOuts[1], fxy(nq0), fxy(ns0), [0, splitY], fy(ns0), fy(nr0)]);\n\t} else { var state = 2 // 2\n\t\tt = (A - quad) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, fy(s0));\n\t\tv4 = fx(v6);\n\t\tnewVerts = [semiVerts[0], semiVerts[1], semiVerts[2], fxy(s0), v4, [0, splitY], v6, fy(s0)];\n\t\tnewIns = tangentsRelative(newVerts, [fy(q0), semiIns[1], semiIns[2], fxy(r0), v4, [0, splitY], v6, fy(s0)]);\n\t\tnewOuts = tangentsRelative(newVerts, [semiOuts[0], semiOuts[1], fxy(q0), fxy(s0), v4, [0, splitY], v6, fy(r0)]);\n\t}\n} else { \n\tif (splitY < r3a[1]) { var state = 3 // 3\n\t\t\tvar UpsemiVerts = [\n\t\t\t[rad2, -dist],\n\t\t\t[0, -(dist - rad2)],\n\t\t\t[-rad2, -dist]\n\t\t];\n\t\tvar UpsemiIns = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, 0],\n\t\t\t[(rad2 * semiFac), 0],\n\t\t\t[0, rad2 * semiFac]\n\t\t]);\n\t\tvar UpsemiOuts = tangentsAbsolute(UpsemiVerts, [\n\t\t\t[0, rad2 * semiFac],\n\t\t\t[-rad2 * semiFac, 0],\n\t\t\t[0, 0]\n\t\t]);\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tif (rad2 == rad1) {var upA = 0.00001;} else {var upA = quad - Math.acos(clamp((rad2 - rad1) / dist, -1, 1));}\n\t\tvar upT = upA / quad;\n\t\tvar uq0 = midPoint(UpsemiVerts[0], UpsemiOuts[0], upT);\n\t\tuq1 = midPoint(UpsemiOuts[0], UpsemiIns[1], upT);\n\t\tuq2 = midPoint(UpsemiIns[1], UpsemiVerts[1], upT);\n\t\tur0 = midPoint(uq0, uq1, upT);\n\t\tur1 = midPoint(uq1, uq2, upT);\n\t\tus0 = midPoint(ur0, ur1, upT);\n\t\tnewA = -Math.atan2(-dist - splitY, xOnCircleGivenY(-dist - splitY, rad2));\n\t\tnewT = newA / upA;\n\t\tnq0 = midPoint(UpsemiVerts[0], uq0, newT);\n\t\tnq1 = midPoint(uq0, ur0, newT);\n\t\tnq2 = midPoint(ur0, us0, newT);\n\t\tnr0 = midPoint(nq0, nq1, newT);\n\t\tnr1 = midPoint(nq1, nq2, newT);\n\t\tns0 = midPoint(nr0, nr1, newT);\n\t\tnewVerts = [s0, semiVerts[1], fx(s0), fx(r3a), fx(ns0), [0, splitY], ns0, us0];\n\t\tnewIns = tangentsRelative(newVerts, [s0, q2, fx(r1), fx(r3a), fx(nr1), [0, splitY], ns0, us0]);\n\t\tnewOuts = tangentsRelative(newVerts, [r1, fx(q2), fx(r0), fx(nq2), fx(ns0), [0, splitY], nr1, r3a]);\n\t} else { var state = 4 // 4\n\t\tt = (quad - A) / quad;\n\t\tq0 = midPoint(semiVerts[0], semiOuts[0], t);\n\t\tq1 = midPoint(semiOuts[0], semiIns[1], t);\n\t\tq2 = midPoint(semiIns[1], semiVerts[1], t);\n\t\tr0 = midPoint(q0, q1, t);\n\t\tr1 = midPoint(q1, q2, t);\n\t\ts0 = midPoint(r0, r1, t);\n\t\tv6 = pointAlongY(splitY, r3a, s0);\n\t\tv4 = fx(v6);\n\t\tnewVerts = [s0, s0, semiVerts[1], fx(s0), v4, [0, splitY], v6, v6];\n\t\tnewIns = tangentsRelative(newVerts, [s0, s0, q2, fx(r1), v4, [0, splitY], v6, v6]);\n\t\tnewOuts = tangentsRelative(newVerts, [s0, r1, fx(q2), fx(r0), v4, [0, splitY], v6, r0]);\n\t}\n}\n\n// FLIP THE SHAPE IF IT\'S DISTAL\nif (isProximal != true) {\n\tvar tempVerts = newVerts;\n\tvar tempIns = newIns;\n\tvar tempOuts = newOuts;\n\tnewVerts = flipArrayY(tempVerts, -dist * 0.5).reverse();\n\tnewIns = flipArrayY(tempOuts, 0).reverse();\n\tnewOuts = flipArrayY(tempIns, 0).reverse();\n}\n\n// APPLY ROUNDING\nif (pers != 0) {\n\tvar pVert = isProximal ? 5 : 2;\n\tnewVerts[pVert] += isProximal ? [0, newVerts[pVert + 1][0] * pers] : [0, -newVerts[pVert + 1][0] * pers];\n\tnewIns[pVert] = [-newVerts[pVert + 1][0] * semiFac, 0];\n\tnewOuts[pVert] = [newVerts[pVert + 1][0] * semiFac, 0];\n\tvar B = isProximal ? Math.PI / 2 - A : -(Math.PI / 2 + A);\n\tvar temp6 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewIns[pVert + 1][0] = -temp6[1] * Math.sin(B);\n\tnewIns[pVert + 1][1] = temp6[1] * Math.cos(B);\n\tvar temp4 = [0, newVerts[pVert + 1][0] * semiFac * pers];\n\tnewOuts[pVert - 1][0] = -temp4[1] * Math.sin(-B);\n\tnewOuts[pVert - 1][1] = temp4[1] * Math.cos(-B);\n}\n\n// APPLY SQUARE END\t\nif (squareEndValue && !isUpper && !isProximal) {\n\tif (state === 1) {\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n\n\tif (state === 2) {\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 3) {\n\t\tnewVerts[5] = [-distrad, -dist];\n\t\tnewVerts[6] = [0, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[5] = [0, 0];\n\t\tnewIns[7] = [0, 0];\n\t}\n\n\tif (state === 4) {\n\t\tnewVerts[4] = [-distrad, -dist];\n\t\tnewVerts[5] = [0, -dist];\n\t\tnewVerts[6] = [distrad, -dist];\n\t\tnewVerts[7] = [distrad, -dist];\n\t\tnewOuts[4] = [0, 0];\n\t\tnewIns[6] = [0, 0];\n\t}\n}\n\ncreatePath(newVerts, newIns, newOuts, true);';
      } catch (h) {
        alert(h.toString());
      }
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property(2)
          .property(2)
          .property(2)
          .property(2)
          .property("ADBE Vector Fill Color").expression =
          'thisComp.layer("' + g.ankle + '").effect("Limber")("Lower Color");';
      } catch (h) {}
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property(3)
          .property("ADBE Vector Position").expression =
          'thisComp.layer("' +
          g.ankle +
          '").content("Admin").content("p2blend").transform.position';
      } catch (h) {}
      try {
        i
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property(3)
          .property("ADBE Vector Rotation").expression =
          'thisComp.layer("' +
          g.ankle +
          '").content("Admin").content("angles").transform.anchorPoint[1]';
      } catch (h) {}
      try {
        i
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point").expression = "[0,0];";
      } catch (h) {}
      try {
        i
          .property("ADBE Transform Group")
          .property("ADBE Position").expression =
          "var val = [0,0];\nif (thisLayer.hasParent) val = parent.fromWorld([0,0,0]);\n[val[0],val[1],0];";
      } catch (h) {}
      try {
        i
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z").expression =
          'var curlayer = thisLayer; \nvar rot = 0; \nwhile(curlayer.hasParent){rot += curlayer.parent("ADBE Transform Group")("ADBE Rotate Z"); \ncurlayer = curlayer.parent;} -rot;';
      } catch (h) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function bone(b, i) {
      var f = app.project.activeItem;
      if (!f || !(f instanceof CompItem)) {
        alert("Please select a composition first");
        return;
      }
      var h = f;
      h.openInViewer();
      if (i) {
        var c = h.layers.addShape();
        c.name = b.ankle;
        c.label = lmbraf.getSetting("userPrefs", "controllerLabelColor");
        makeAnkleProps(c, b);
        var d = h.layers.addShape();
        d.name = b.hip;
        d.label = lmbraf.getSetting("userPrefs", "controllerLabelColor");
        makeHipProps(d, b);
      }
      var k = h.layers.addShape();
      k.name = b.leg;
      k.label = lmbraf.getSetting("userPrefs", "limbLabelColor");
      k.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      k.property("ADBE Root Vectors Group").property(1).name = "Limb";
      k.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Shape - Group");
      k
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1).name = "Path";
      k.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(1)
        .property("ADBE Vector Shape Direction")
        .setValue(2);
      k.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .addProperty("ADBE Vector Graphic - Stroke");
      k
        .property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2).name = "Stroke";
      k.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property("ADBE Vector Stroke Color")
        .setValue([0.99607849121094, 0.78431379795074, 0.29019609093666, 1]);
      k.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property("ADBE Vector Stroke Width")
        .setValue(60);
      k.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property("ADBE Vector Stroke Line Cap")
        .setValue(2);
      k.property("ADBE Root Vectors Group")
        .property(1)
        .property(2)
        .property(2)
        .property("ADBE Vector Stroke Line Join")
        .setValue(2);
      k.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      k.property("ADBE Root Vectors Group").property(2).name = "Admin";
      k.property("ADBE Root Vectors Group")
        .property(2)
        .property(3)
        .property("ADBE Vector Scale")
        .setValue([100, 100]);
      k.property("ADBE Transform Group")
        .property("ADBE Anchor Point")
        .setValue([0, 0, 0]);
      k.property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([0, 0, 0]);
      try {
        if (i) {
          makeAnkleExpressions(c, b);
          makeHipExpressions(d, b);
        }
        try {
          k
            .property("ADBE Root Vectors Group")
            .property(1)
            .property(2)
            .property(1)
            .property("ADBE Vector Shape").expression =
            '// Limber Bone\nvar endctrl  = thisComp.layer("' +
            b.ankle +
            '");\nvar curveLin = endctrl.effect("Limber")("Bone Curvature")/100;\nif (curveLin === 0) {\n\tcreatePath([endctrl.content("Admin").content("p1").transform.position, endctrl.content("Admin").content("p2blend").transform.position, endctrl.content("Admin").content("p3blend").transform.position], [], [], 0);\n\t} else {\nvar angs = endctrl.content("Admin").content("angles").transform.anchorPoint;\nvar avang = degreesToRadians((angs[0]+angs[1]-180)/2);\nvar linkScale = endctrl.effect("Limber")("Link Length to Size Scale");\nvar tangLeng = curveLin * (endctrl(4)("Limber")("Upper Length")+endctrl.effect("Limber")("Lower Length")) / 2 * (linkScale == true ? endctrl.effect("Limber")("Size Scale")/100 : 1);\nvar tangPos = [Math.cos(avang) * tangLeng, Math.sin(avang) * tangLeng];\ncreatePath([endctrl.content("Admin").content("p1").transform.position, endctrl.content("Admin").content("p2blend").transform.position, endctrl.content("Admin").content("p3blend").transform.position], [[0,0], -tangPos, [0,0]], [[0,0], tangPos, [0,0]], 0);}';
        } catch (g) {}
        try {
          k
            .property("ADBE Root Vectors Group")
            .property(2)
            .property(3)
            .property("ADBE Vector Scale").expression =
            '////// LIMBER 1.6 //////\nvar limbLayers = {\nankle: thisComp.layer("' +
            b.ankle +
            '"),\nhip: thisComp.layer("' +
            b.hip +
            '"),\nleg: thisComp.layer("' +
            b.leg +
            '"),\nknee: thisComp.layer("joint"),\nfk' +
            b.ankle +
            ': thisComp.layer("fkAnkl")\n};\nvalue;';
        } catch (g) {}
        try {
          k
            .property("ADBE Transform Group")
            .property("ADBE Anchor Point").expression = "[0,0];";
        } catch (g) {}
        try {
          k
            .property("ADBE Transform Group")
            .property("ADBE Position").expression =
            "var val = [0,0];\nif (thisLayer.hasParent) val = parent.fromWorld([0,0,0]);\n[val[0],val[1],0];";
        } catch (g) {}
        h.openInViewer();
      } catch (j) {
        alert(j.toString() + "\nError on line: " + j.line.toString());
      }
    }
    function makeFKsimple(y, q) {
      function n(z) {
        var i = [
          "////// LIMBER " + scriptVer + " //////",
          "var limbLayers = {",
          'ankle: thisComp.layer("' + y.ankle + '"),',
          'hip: thisComp.layer("' + y.hip + '"),',
          'leg: thisComp.layer("' + y.leg + '")',
        ];
        if (z === "add") {
          i.push(', fkAnkle: thisComp.layer("' + f.name + '")');
        }
        if (s !== null) {
          i.push(', knee: thisComp.layer("' + y.knee + '")');
        }
        i.push("};value;");
        i = i.join("\n");
        if (z === "add") {
          dummyPropFkAnkle.expression = i;
        }
        l.expression = i;
        g.expression = i;
        j.expression = i;
        if (s !== null) {
          s.expression = i;
        }
      }
      function d(i) {
        if (i === "add") {
          dummyPropFkAnkle = f.property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale");
        }
        l = x.layer(y.ankle).property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale");
        g = x.layer(y.hip).property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale");
        j = x.layer(y.leg).property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale");
        if (Object.isValid(x.layer(y.knee))) {
          s = x.layer(y.knee).property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale");
        } else {
          s = null;
        }
      }
      var m = app.project.activeItem;
      var x = m;
      var k = q.ankle("ADBE Effect Parade")("Pseudo/Limber_16")(
        "Pseudo/Limber_16-0031",
      ).value;
      var r = getStoredSetting("controllerColor");
      var b = getRGBfromHEX(r);
      b[3] = 0;
      if (Object.isValid(q.fkAnkle) && !alted) {
        makeAlert("This limb already has an FK controller");
        return;
      } else {
        if (Object.isValid(q.fkAnkle) && alted) {
          d("remove");
          n("remove");
          q.fkAnkle.locked = false;
          if (k === 0) {
            swapChildren(q.fkAnkle, q.ankle);
          }
          q.fkAnkle.remove();
        } else {
          if (!Object.isValid(q.fkAnkle) && alted) {
            makeAlert("This limb does not have an FK controller to delete");
            return;
          } else {
            var v = m.selectedLayers;
            f = x.layers.addShape();
            f.name = "" + y.fkAnkle + "";
            f.guideLayer = true;
            f.label = getEndLabelAndFill(q).label;
            f.moveAfter(q.ankle);
            f.property("ADBE Root Vectors Group").addProperty(
              "ADBE Vector Group",
            );
            f.property("ADBE Root Vectors Group").property(1).name =
              "Controller";
            f.property("ADBE Root Vectors Group")
              .property(1)
              .property(2)
              .addProperty("ADBE Vector Shape - Group");
            f
              .property("ADBE Root Vectors Group")
              .property(1)
              .property(2)
              .property(1).name = "Path";
            f.property("ADBE Root Vectors Group")
              .property(1)
              .property(2)
              .property(1)
              .property("ADBE Vector Shape Direction")
              .setValue(2);
            f.property("ADBE Root Vectors Group")("Controller")(
              "ADBE Vector Transform Group",
            )("ADBE Vector Scale").setValue(controllerSize());
            applyShapeToController(
              f,
              lmbraf.getSetting("userPrefs", "controllerShape"),
            );
            f.property("ADBE Root Vectors Group")
              .property(1)
              .property(3)
              .property("ADBE Vector Rotation")
              .setValue(180);
            f.property("ADBE Root Vectors Group").addProperty(
              "ADBE Vector Group",
            );
            f.property("ADBE Root Vectors Group").property(2).name = "Admin";
            f.property("ADBE Root Vectors Group")
              .property(2)
              .property(3)
              .property("ADBE Vector Scale")
              .setValue([100, 100]);
            f.property("ADBE Transform Group")
              .property("ADBE Position")
              .setValue([-123, -55, 0]);
            f.property("ADBE Transform Group")
              .property("ADBE Rotate Z")
              .setValue(0);
            var u = x.layer(y.ankle).property("ADBE Root Vectors Group")(
              "Controller",
            )("ADBE Vector Transform Group")("ADBE Vector Scale");
            var p = f.property("ADBE Root Vectors Group")("Controller")(
              "ADBE Vector Transform Group",
            )("ADBE Vector Scale");
            p.setValue(u.value);
            var o = f
              .property("ADBE Root Vectors Group")("Controller")
              .property(2)
              .property("ADBE Vector Graphic - Fill")
              .property("ADBE Vector Fill Color");
            o.setValue(getEndLabelAndFill(q).fill);
            try {
              f
                .property("ADBE Transform Group")
                .property("ADBE Position").expression =
                'thisComp.layer("' +
                y.ankle +
                '").content("Admin").content("p3blend").transform.position';
            } catch (h) {}
            try {
              f
                .property("ADBE Transform Group")
                .property("ADBE Rotate Z").expression =
                "// Limber FK End Rotation\nvar userRot = " +
                lmbraf.getSetting("userPrefs", "controllerUserRotation") +
                ';\nvar valueRot = userRot ? value : 0;\nvar endctrl = thisComp.layer("' +
                y.ankle +
                '");\nvar rotend = endctrl.effect("Limber")("Rotate End")/100;\nif (rotend == 0) {valueRot} // output\nelse {\nvar angles = endctrl.content("Admin").content("angles").transform.anchorPoint;\nvar curveLin = endctrl.effect("Limber")("Bone Curvature")/100;\nif (curveLin == 0) {(rotend*(angles[1]-180) + valueRot)} // output\nelse {\nvar p3blend = endctrl.content("Admin").content("p3blend").transform.position;\nvar p2blend = endctrl.content("Admin").content("p2blend").transform.position;\nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nvar linkScale = endctrl.effect("Limber")("Link Length to Size Scale");\nvar tangLeng = (curveLin*(endctrl.effect("Limber")("Upper Length")+endctrl.effect("Limber")("Lower Length"))/2) * (linkScale == true ? sizeScale : 1);\nvar avang = (degreesToRadians((angles[0]+angles[1]-180)/2));\nvar tangPos = p2blend+[Math.cos(avang) * tangLeng, Math.sin(avang) * tangLeng];\nvar tangPosRel = tangPos-p3blend;\nvar a1curve = radiansToDegrees(Math.atan2(tangPosRel[1],tangPosRel[0]))+90;\n(rotend*a1curve) + valueRot}} // output';
            } catch (h) {}
            d("add");
            n("add");
            if (k === 0) {
              swapChildren(q.ankle, f);
            }
            f.selected = false;
            for (var t = 0; t < v.length; t += 1) {
              v[t].selected = true;
            }
          }
        }
      }
    }
    function swapChildren(h, f) {
      var g = h.containingComp;
      for (var d = 1; d <= g.numLayers; d += 1) {
        var c = g.layer(d);
        if (c.parent === h) {
          var b = false;
          if (c.locked) {
            b = true;
            c.locked = false;
          }
          c.parent = f;
          if (b) {
            c.locked = true;
          }
        }
      }
    }
    function getStoredSetting(b) {
      return lmbraf.getSetting("userPrefs", b);
    }
    function commitSettings(c) {
      var b = "userPrefs";
      lmbraf.saveSetting(b, "controllerShape", c.controllerShape);
      lmbraf.saveSetting(b, "controllerSize", c.controllerSize);
      lmbraf.saveSetting(
        b,
        "controllerColorDynamics",
        c.controllerColorDynamics,
      );
      lmbraf.saveSetting(b, "controllerUserRotation", c.controllerUserRotation);
      lmbraf.saveSetting(b, "limbLabelColor", c.limbLabelColor);
      lmbraf.saveSetting(b, "controllerLabelColor", c.controllerLabelColor);
      lmbraf.saveSetting(b, "controllerColor", c.controllerColor);
      lmbraf.saveSetting(b, "deleteAfterRig", c.deleteAfterRig);
    }
    function getColorLabelNames() {
      prefs = app.preferences;
      colorNames = ["None"];
      for (var b = 1; b <= 16; b += 1) {
        colorNames.push(
          prefs.getPrefAsString(
            "Label Preference Text Section 7",
            "Label Text ID 2 # " + b + "",
            PREFType.PREF_Type_MACHINE_INDEPENDENT,
          ),
        );
      }
      return colorNames;
    }
    function nameSet(c, f, b, d) {
      this.limbName = c;
      this.start = f;
      this.end = b;
      this.joint = d;
    }
    function buildPresetEditor() {
      function g(i) {
        if (
          i.keyIdentifier == "U+001B" ||
          i.keyIdentifier == "Enter" ||
          i.keyName == "Escape"
        ) {
          O.removeEventListener("keydown", g, false);
        }
        if (i.keyIdentifier == "U+001B") {
          O.close();
        }
        if (i.keyName == "Escape") {
          O.close();
        }
        if (i.keyIdentifier == "Enter") {
          av();
        }
      }
      function av() {
        var i = new File(getUserDataFolder() + "/LimberNamesets.json");
        if (i.open("w")) {
          i.encoding = "UTF-8";
          i.write(JSON.stringify(nameData));
          i.close();
        }
        if (aC.selection === null) {
          aC.selection = 0;
        }
        win.xui_ui_input3.removeAll();
        for (var aZ = 0; aZ < nameData.length; aZ += 1) {
          win.xui_ui_input3.add("item", nameData[aZ].limbName);
        }
        try {
          win.xui_ui_input3.selection = aC.selection.index;
          commitSettings(U);
        } catch (aY) {
          alert(aY.toString() + "\nLine: " + aY.line.toString());
        }
        O.close();
      }
      function q() {
        if (aC.selection !== null) {
          var i = aC.selection.index;
          Z.text = nameData[i].limbName || "";
          u.text = nameData[i].start || "";
          r.text = nameData[i].end || "";
          aa.text = nameData[i].joint || "";
        } else {
          Z.text = "";
          u.text = "";
          r.text = "";
          aa.text = "";
        }
      }
      var am = [0, 0, 25, 23];
      var l = [0, 0, 60, 23];
      var aB = [0, 0, 35, 23];
      var at = 3;
      var O = new Window("palette", "Limber Preferences", undefined, {
        closeButton: true,
      });
      O.orientation = "column";
      var af = 150;
      var p = 100;
      var R = [0, 0, p, 23];
      var U = {
        controllerColor: getStoredSetting("controllerColor"),
        controllerColorDynamics: getStoredSetting("controllerColorDynamics"),
        controllerLabelColor: getStoredSetting("controllerLabelColor"),
        controllerShape: getStoredSetting("controllerShape"),
        controllerSize: getStoredSetting("controllerSize"),
        controllerUserRotation: getStoredSetting("controllerUserRotation"),
        deleteAfterRig: getStoredSetting("deleteAfterRig"),
        limbLabelColor: getStoredSetting("limbLabelColor"),
      };
      var T = O.add("panel");
      T.text = "Limber Settings";
      T.orientation = "column";
      T.alignChildren = ["left", "top"];
      T.spacing = 10;
      T.margins = 16;
      var ai = T.add("group", undefined, { name: "contShapeGroup" });
      ai.orientation = "row";
      ai.alignChildren = ["left", "center"];
      ai.spacing = 0;
      ai.margins = 0;
      var H = ai.add("group", undefined, { name: "LeftCol" });
      H.preferredSize.width = af;
      H.orientation = "column";
      H.alignChildren = ["left", "center"];
      H.spacing = 0;
      H.margins = 0;
      var M = H.add("group", undefined, { name: "group1" });
      M.orientation = "row";
      M.alignChildren = ["left", "center"];
      M.spacing = 0;
      M.margins = 0;
      var aT = M.add("statictext", undefined, undefined, {
        name: "statictext1",
      });
      aT.text = "Controller Shape";
      var C = ai.add("group", undefined, { name: "RightCol" });
      C.preferredSize.width = p;
      C.orientation = "column";
      C.alignChildren = ["right", "center"];
      C.spacing = 0;
      C.margins = 0;
      var K = C.add("group", undefined, { name: "group2" });
      K.orientation = "row";
      K.alignChildren = ["right", "center"];
      K.spacing = 0;
      K.margins = 0;
      var h = [];
      for (var S = 0; S < controllerShapes.length; S += 1) {
        h.push(controllerShapes[S].name);
      }
      var c = K.add("dropdownlist", undefined, undefined, {
        items: h,
        name: "controllerShape",
      });
      var A = getStoredSetting("controllerShape");
      if (A >= h.length) {
        A = h.length - 1;
      }
      c.selection = A;
      c.preferredSize.width = p;
      c.onChange = function () {
        U.controllerShape = this.selection.index;
      };
      var al = T.add("group", undefined, { name: "contSizeGroup" });
      al.orientation = "row";
      al.alignChildren = ["left", "center"];
      al.spacing = 0;
      al.margins = 0;
      var f = al.add("group", undefined, { name: "LeftCol1" });
      f.preferredSize.width = af;
      f.orientation = "column";
      f.alignChildren = ["left", "center"];
      f.spacing = 0;
      f.margins = 0;
      var J = f.add("group", undefined, { name: "group3" });
      J.orientation = "row";
      J.alignChildren = ["left", "center"];
      J.spacing = 0;
      J.margins = 0;
      var aS = J.add("statictext", undefined, undefined, {
        name: "statictext2",
      });
      aS.text = "Controller Size";
      var aJ = al.add("group", undefined, { name: "RightCol1" });
      aJ.preferredSize.width = p;
      aJ.orientation = "column";
      aJ.alignChildren = ["right", "center"];
      aJ.spacing = 0;
      aJ.margins = 0;
      var I = aJ.add("group", undefined, { name: "group4" });
      I.orientation = "row";
      I.alignChildren = ["left", "center"];
      I.spacing = 0;
      I.margins = 0;
      var t = ["Extra Small", "Small", "Medium", "Large", "Extra Large"];
      var ay = I.add("dropdownlist", undefined, undefined, {
        items: t,
        name: "controllerSize",
      });
      ay.selection = getStoredSetting("controllerSize");
      ay.preferredSize.width = p;
      ay.onChange = function () {
        U.controllerSize = this.selection.index;
      };
      var aE = T.add("group", undefined, { name: "contColGroup" });
      aE.orientation = "row";
      aE.alignChildren = ["left", "center"];
      aE.spacing = 0;
      aE.margins = 0;
      var d = aE.add("group", undefined, { name: "LeftCol2" });
      d.preferredSize.width = af;
      d.orientation = "column";
      d.alignChildren = ["left", "center"];
      d.spacing = 0;
      d.margins = 0;
      var G = d.add("group", undefined, { name: "group5" });
      G.orientation = "row";
      G.alignChildren = ["left", "center"];
      G.spacing = 0;
      G.margins = 0;
      var aR = G.add("statictext", undefined, undefined, {
        name: "statictext3",
      });
      aR.text = "Controller Color Dynamics";
      var aI = aE.add("group", undefined, { name: "RightCol2" });
      aI.preferredSize.width = p;
      aI.orientation = "column";
      aI.alignChildren = ["right", "center"];
      aI.spacing = 0;
      aI.margins = 0;
      var F = aI.add("group", undefined, { name: "group6" });
      F.orientation = "row";
      F.alignChildren = ["left", "center"];
      F.spacing = 0;
      F.margins = 0;
      var z = F.add("checkbox", undefined, undefined, {
        name: "controllerColorDynamics",
      });
      z.value = getStoredSetting("controllerColorDynamics");
      z.onClick = function () {
        U.controllerColorDynamics = !U.controllerColorDynamics;
      };
      var n = T.add("group", undefined, { name: "contRotGroup" });
      n.orientation = "row";
      n.alignChildren = ["left", "center"];
      n.spacing = 0;
      n.margins = 0;
      var b = n.add("group", undefined, { name: "LeftCol3" });
      b.preferredSize.width = af;
      b.orientation = "column";
      b.alignChildren = ["left", "center"];
      b.spacing = 0;
      b.margins = 0;
      var E = b.add("group", undefined, { name: "group7" });
      E.orientation = "row";
      E.alignChildren = ["left", "center"];
      E.spacing = 0;
      E.margins = 0;
      var aQ = E.add("statictext", undefined, undefined, {
        name: "statictext4",
      });
      aQ.text = "Controller User Rotation";
      var aH = n.add("group", undefined, { name: "RightCol3" });
      aH.preferredSize.width = p;
      aH.orientation = "column";
      aH.alignChildren = ["right", "center"];
      aH.spacing = 0;
      aH.margins = 0;
      var D = aH.add("group", undefined, { name: "group8" });
      D.orientation = "row";
      D.alignChildren = ["left", "center"];
      D.spacing = 0;
      D.margins = 0;
      var az = D.add("checkbox", undefined, undefined, {
        name: "userRoatationButton",
      });
      az.value = getStoredSetting("controllerUserRotation");
      az.onClick = function () {
        U.controllerUserRotation = !U.controllerUserRotation;
      };
      var P = T.add("group", undefined, { name: "controlColorGroup" });
      P.orientation = "row";
      P.alignChildren = ["left", "center"];
      P.spacing = 0;
      P.margins = 0;
      var ae = P.add("group", undefined, { name: "LeftCol3_5" });
      ae.preferredSize.width = af;
      ae.orientation = "column";
      ae.alignChildren = ["left", "center"];
      ae.spacing = 0;
      ae.margins = 0;
      var W = ae.add("group", undefined, { name: "group7_5" });
      W.orientation = "row";
      W.alignChildren = ["left", "center"];
      W.spacing = 0;
      W.margins = 0;
      var V = W.add("statictext", undefined, undefined, {
        name: "statictext7_5",
      });
      V.text = "Controller Color";
      var k = P.add("group", undefined, { name: "RightCol3_5" });
      k.preferredSize.width = p;
      k.orientation = "column";
      k.alignChildren = ["right", "center"];
      k.spacing = 0;
      k.margins = 0;
      var o = k.add("group", undefined, { name: "pickerGrp" });
      o.orientation = "row";
      o.alignChildren = ["left", "center"];
      o.spacing = 0;
      o.margins = 0;
      o.preferredSize.width = p;
      var m = o.add("panel", undefined, undefined, { borderStyle: "sunken" });
      m.preferredSize = [p * 0.5, 20];
      m.alignment = ["left", "top"];
      var ad = m.graphics;
      var X = getRGBfromHEX(getStoredSetting("controllerColor"));
      ad.backgroundColor = ad.newBrush(ad.BrushType.SOLID_COLOR, X);
      var ag = o.add("button", undefined, "Edit");
      ag.preferredSize = [p * 0.4, 18];
      ag.alignment = ["right", "center"];
      ag.onClick = function () {
        var aY = $.colorPicker(U.controllerColor);
        var i = getRGBfromHEX(aY);
        if (i[0] >= 0) {
          ad.backgroundColor = ad.newBrush(ad.BrushType.SOLID_COLOR, i);
          U.controllerColor = rgbToHex(i[0] * 255, i[1] * 255, i[2] * 255);
        }
      };
      var x = T.add("group", undefined, { name: "contLabelGroup" });
      x.orientation = "row";
      x.alignChildren = ["left", "center"];
      x.spacing = 0;
      x.margins = 0;
      var aX = x.add("group", undefined, { name: "LeftCol4" });
      aX.preferredSize.width = af;
      aX.orientation = "column";
      aX.alignChildren = ["left", "center"];
      aX.spacing = 0;
      aX.margins = 0;
      var B = aX.add("group", undefined, { name: "group9" });
      B.orientation = "row";
      B.alignChildren = ["left", "center"];
      B.spacing = 0;
      B.margins = 0;
      var aP = B.add("statictext", undefined, undefined, {
        name: "statictext5",
      });
      aP.text = "Controller Label Color";
      var aG = x.add("group", undefined, { name: "RightCol4" });
      aG.preferredSize.width = p;
      aG.orientation = "column";
      aG.alignChildren = ["right", "center"];
      aG.spacing = 0;
      aG.margins = 0;
      var ax = aG.add("group", undefined, { name: "group10" });
      ax.orientation = "row";
      ax.alignChildren = ["left", "center"];
      ax.spacing = 0;
      ax.margins = 0;
      var aM = getColorLabelNames();
      var ah = ax.add("dropdownlist", undefined, undefined, {
        items: aM,
        name: "controllerLabelColorDropdown",
      });
      ah.selection = getStoredSetting("controllerLabelColor");
      ah.preferredSize.width = p;
      ah.onChange = function () {
        U.controllerLabelColor = this.selection.index;
      };
      var aK = T.add("group", undefined, { name: "limbLabelGroup" });
      aK.orientation = "row";
      aK.alignChildren = ["left", "center"];
      aK.spacing = 0;
      aK.margins = 0;
      var aW = aK.add("group", undefined, { name: "LeftCol5" });
      aW.preferredSize.width = af;
      aW.orientation = "column";
      aW.alignChildren = ["left", "center"];
      aW.spacing = 0;
      aW.margins = 0;
      var au = aW.add("group", undefined, { name: "group11" });
      au.orientation = "row";
      au.alignChildren = ["left", "center"];
      au.spacing = 0;
      au.margins = 0;
      var aO = au.add("statictext", undefined, undefined, {
        name: "statictext6",
      });
      aO.text = "Limb Label Color";
      var aF = aK.add("group", undefined, { name: "RightCol5" });
      aF.preferredSize.width = p;
      aF.orientation = "column";
      aF.alignChildren = ["right", "center"];
      aF.spacing = 0;
      aF.margins = 0;
      var ar = aF.add("group", undefined, { name: "group12" });
      ar.orientation = "row";
      ar.alignChildren = ["left", "center"];
      ar.spacing = 0;
      ar.margins = 0;
      var N = getColorLabelNames();
      var an = ar.add("dropdownlist", undefined, undefined, {
        items: N,
        name: "limbLabelColorDropdown",
      });
      an.selection = getStoredSetting("limbLabelColor");
      an.preferredSize.width = p;
      an.onChange = function () {
        U.limbLabelColor = this.selection.index;
      };
      var s = T.add("group", undefined, { name: "delArtGroup" });
      s.orientation = "row";
      s.alignChildren = ["left", "center"];
      s.spacing = 0;
      s.margins = 0;
      var aU = s.add("group", undefined, { name: "LeftCol6" });
      aU.preferredSize.width = af;
      aU.orientation = "column";
      aU.alignChildren = ["left", "center"];
      aU.spacing = 0;
      aU.margins = 0;
      var aq = aU.add("group", undefined, { name: "group13" });
      aq.orientation = "row";
      aq.alignChildren = ["left", "center"];
      aq.spacing = 0;
      aq.margins = 0;
      var aN = aq.add("statictext", undefined, undefined, {
        name: "statictext7",
      });
      aN.text = "Delete layers after rigging";
      var aD = s.add("group", undefined, { name: "RightCol6" });
      aD.preferredSize.width = p;
      aD.orientation = "column";
      aD.alignChildren = ["right", "center"];
      aD.spacing = 0;
      aD.margins = 0;
      var ao = aD.add("group", undefined, { name: "group14" });
      ao.orientation = "row";
      ao.alignChildren = ["left", "center"];
      ao.spacing = 0;
      ao.margins = 0;
      var ak = ao.add("checkbox", undefined, undefined, {
        name: "deleteAfterRigBox",
      });
      ak.value = getStoredSetting("deleteAfterRig");
      ak.onClick = function () {
        U.deleteAfterRig = !U.deleteAfterRig;
      };
      var v = T.add("group");
      v.orientation = "row";
      v.alignChildren = ["left", "center"];
      v.spacing = 0;
      v.margins = 0;
      var aA = v.add("button", R, "Reset to Defaults");
      aA.alignment = ["right", "center"];
      aA.onClick = function () {
        U.controllerShape = DEFAULTCONFIG.controllerShape;
        U.controllerSize = DEFAULTCONFIG.controllerSize;
        U.controllerColorDynamics = DEFAULTCONFIG.controllerColorDynamics;
        U.controllerUserRotation = DEFAULTCONFIG.controllerUserRotation;
        U.controllerLabelColor = DEFAULTCONFIG.controllerLabelColor;
        U.controllerColor = DEFAULTCONFIG.controllerColor;
        U.limbLabelColor = DEFAULTCONFIG.limbLabelColor;
        U.deleteAfterRig = DEFAULTCONFIG.deleteAfterRig;
        c.selection = U.controllerShape;
        ay.selection = U.controllerSize;
        z.value = U.controllerColorDynamics;
        az.value = U.controllerUserRotation;
        ah.selection = U.controllerLabelColor;
        an.selection = U.limbLabelColor;
        var i = getRGBfromHEX(U.controllerColor);
        ad.backgroundColor = ad.newBrush(ad.BrushType.SOLID_COLOR, i);
        ak.value = U.deleteAfterRig;
      };
      var aL = O.add("panel");
      aL.text = "Naming Editor";
      aL.orientation = "row";
      var aV = aL.add("group");
      aV.orientation = "column";
      var aC = aV.add("listbox", undefined, undefined, { scrolling: true });
      var ab = aL.add("group");
      ab.spacing = at;
      ab.orientation = "column";
      ab.alignment = ["fill", "top"];
      var L = ab.add("button", am, "+");
      var ap = ab.add("button", am, "-");
      var Q = ab.add("button", am, String.fromCharCode("0x2191"));
      var Y = ab.add("button", am, String.fromCharCode("0x2193"));
      var j = aL.add("group");
      j.orientation = "column";
      j.alignment = ["fill", "top"];
      j.spacing = at;
      j.add("statictext", aB, "Limb");
      j.add("statictext", aB, "Start");
      j.add("statictext", aB, "End");
      j.add("statictext", aB, "Joint");
      var y = aL.add("group");
      y.orientation = "column";
      y.alignment = ["fill", "top"];
      y.spacing = at;
      var Z = y.add("editText", l);
      var u = y.add("editText", l);
      var r = y.add("editText", l);
      var aa = y.add("editText", l);
      var aj = O.add("group");
      aj.orientation = "row";
      var ac = aj.add("button", R, " Cancel ");
      var aw = aj.add("button", R, "OK");
      O.addEventListener("keydown", g, false);
      for (var S = 0; S < nameData.length; S += 1) {
        aC.add("item", nameData[S].limbName);
      }
      aC.onChange = function () {
        q();
      };
      aC.preferredSize = [100, 102];
      Z.onChange = function () {
        if (aC.selection !== null) {
          var i = aC.selection.index;
          nameData[i].limbName = Z.text;
          aC.selection.text = Z.text;
          q();
        }
      };
      u.onChange = function () {
        if (aC.selection !== null) {
          nameData[aC.selection.index].start = u.text;
        }
      };
      r.onChange = function () {
        if (aC.selection !== null) {
          nameData[aC.selection.index].end = r.text;
        }
      };
      aa.onChange = function () {
        if (aC.selection !== null) {
          nameData[aC.selection.index].joint = aa.text;
        }
      };
      L.onClick = function () {
        nameData.push(new nameSet("custom", "start", "end", "joint"));
        aC.add("item", nameData[nameData.length - 1].limbName);
        aC.selection = nameData.length - 1;
      };
      ap.onClick = function () {
        if (aC.selection !== null && aC.items.length > 1) {
          var i = aC.selection.index;
          nameData.splice(i, 1);
          aC.remove(aC.selection);
          if (i === aC.length - 1) {
            aC.selection = aC.length - 2;
          } else {
            aC.selection = i;
          }
          q();
        }
      };
      Q.onClick = function () {
        if (aC.selection && aC.selection.index != 0) {
          var i = aC.selection.index;
          arrayMove(nameData, i, i - 1);
          var aY = aC.selection.text;
          aC.selection.text = aC.items[i - 1].text;
          aC.items[i - 1].text = aY;
          aC.selection = i - 1;
        }
      };
      Y.onClick = function () {
        if (
          aC.selection !== null &&
          aC.selection.index != nameData.length - 1
        ) {
          var i = aC.selection.index;
          arrayMove(nameData, i, i + 1);
          var aY = aC.selection.text;
          aC.selection.text = aC.items[i + 1].text;
          aC.items[i + 1].text = aY;
          aC.selection = i + 1;
        }
      };
      ac.onClick = function () {
        O.close();
      };
      aw.onClick = av;
      aC.selection = 0;
      O.show();
    }
    function arrayMove(d, c, b) {
      d.splice(b, 0, d.splice(c, 1)[0]);
    }
    function makeHelpUI() {
      var D = new Window("dialog");
      D.text = "Limber v" + scriptVer + " - Help";
      D.preferredSize.width = 400;
      D.orientation = "column";
      D.alignChildren = ["left", "top"];
      D.spacing = 10;
      D.margins = 16;
      var v = D.add("group", undefined, { name: "main" });
      v.preferredSize.width = 400;
      v.orientation = "row";
      v.alignChildren = ["left", "center"];
      v.spacing = 0;
      v.margins = 0;
      var F = v.add("group", undefined, { name: "col1" });
      F.preferredSize.width = 200;
      F.preferredSize.height = 200;
      F.orientation = "column";
      F.alignChildren = ["left", "top"];
      F.spacing = 0;
      F.margins = 0;
      var u = F.add("group", undefined, { name: "group1" });
      u.preferredSize.height = 30;
      u.orientation = "row";
      u.alignChildren = ["left", "center"];
      u.spacing = 0;
      u.margins = 0;
      var y = u.add("statictext", undefined, undefined, {
        name: "statictext1",
      });
      y.text = "Limber - version " + scriptVer;
      var s = F.add("group", undefined, { name: "group2" });
      s.preferredSize.height = 30;
      s.orientation = "row";
      s.alignChildren = ["left", "center"];
      s.spacing = 0;
      s.margins = 0;
      var m = s.add("button", undefined, undefined, { name: "button1" });
      m.text = "Check for update";
      m.onClick = function () {
        lmbraf.doUpdateCheckNow();
      };
      var p = F.add("group", undefined, { name: "group3" });
      p.preferredSize.height = 30;
      p.orientation = "row";
      p.alignChildren = ["left", "center"];
      p.spacing = 0;
      p.margins = 0;
      var G = p.add("checkbox", undefined, undefined, { name: "checkbox1" });
      G.value = lmbraf.getUpdateCheckStatus();
      G.onClick = function () {
        lmbraf.doUpdateCheck(this.value);
      };
      var x = p.add("statictext", undefined, undefined, {
        name: "statictext2",
      });
      x.text = "Check automatically";
      x.preferredSize.height = 30;
      x.justify = "center";
      var n = F.add("group", undefined, { name: "group4" });
      n.preferredSize.height = 60;
      n.orientation = "column";
      n.alignChildren = ["left", "center"];
      n.spacing = 0;
      n.margins = 0;
      var q = lmbraf.getRegistration().split(" - ");
      var t = n.add("statictext", undefined, undefined, {
        name: "statictext3",
      });
      t.text = q[0];
      t.preferredSize.height = 20;
      var r = n.add("statictext", undefined, undefined, {
        name: "statictext4",
      });
      r.text = q[1] || "";
      r.preferredSize.height = 20;
      var l = F.add("group", undefined, { name: "group5" });
      l.preferredSize.height = 30;
      l.orientation = "row";
      l.alignChildren = ["left", "center"];
      l.spacing = 0;
      l.margins = 0;
      var k = l.add("button", undefined, undefined, { name: "button2" });
      k.text = "Deactivate License";
      k.visible = !lmbraf.t();
      k.onClick = function () {
        if (lmbraf.r()) {
          q = lmbraf.getRegistration().split(" - ");
          t.text = q[0];
          r.text = q[1] || "";
          this.visible = false;
        }
      };
      var E = v.add("group", undefined, { name: "col2" });
      E.preferredSize.width = 200;
      E.preferredSize.height = 200;
      E.orientation = "column";
      E.alignChildren = ["center", "top"];
      E.spacing = 0;
      E.margins = 0;
      var j = E.add("group", undefined, { name: "group6" });
      j.orientation = "column";
      j.alignChildren = ["right", "top"];
      j.spacing = 15;
      j.margins = 0;
      var i = j.add("group", undefined, { name: "group7" });
      i.preferredSize.height = 30;
      i.orientation = "row";
      i.alignChildren = ["left", "center"];
      i.spacing = 0;
      i.margins = 0;
      var h = i.add("button", undefined, undefined, { name: "button3" });
      h.text = "User Guide";
      h.preferredSize.width = 180;
      h.preferredSize.height = 50;
      h.onClick = function () {
        lmbraf.openURL("https://limber.stevekirby.co.uk/");
      };
      var g = j.add("group", undefined, { name: "group8" });
      g.preferredSize.height = 30;
      g.orientation = "row";
      g.alignChildren = ["left", "center"];
      g.spacing = 0;
      g.margins = 0;
      var f = g.add("button", undefined, undefined, { name: "button4" });
      f.text = "Video Tutorials";
      f.preferredSize.width = 180;
      f.preferredSize.height = 50;
      f.onClick = function () {
        lmbraf.openURL(
          "https://www.youtube.com/playlist?list=PLZAr8tT8TcsRvK0jYz4U4Lg4OPA2NHAv6",
        );
      };
      var d = j.add("group", undefined, { name: "group9" });
      d.preferredSize.height = 30;
      d.orientation = "row";
      d.alignChildren = ["left", "center"];
      d.spacing = 0;
      d.margins = 0;
      var c = d.add("button", undefined, undefined, { name: "button5" });
      c.text = "Get support";
      c.preferredSize.width = 180;
      c.preferredSize.height = 50;
      c.onClick = function () {
        lmbraf.openSupportTicket();
      };
      var B = D.add("panel", undefined, undefined, { name: "divider1" });
      B.alignment = "fill";
      var C = D.add("group", undefined, { name: "footer" });
      C.preferredSize.width = 400;
      C.orientation = "row";
      C.alignChildren = ["left", "center"];
      C.spacing = 0;
      C.margins = 0;
      var A = C.add("group", undefined, { name: "group10" });
      A.preferredSize.width = 300;
      A.orientation = "column";
      A.alignChildren = ["left", "center"];
      A.spacing = 0;
      A.margins = 0;
      var o = A.add("statictext", undefined, undefined, {
        name: "statictext5",
      });
      o.text = "\xa9 2021 Steve Kirby and Mike Overbeck";
      var z = C.add("group", undefined, { name: "group11" });
      z.preferredSize.width = 100;
      z.orientation = "column";
      z.alignChildren = ["right", "center"];
      z.spacing = 0;
      z.margins = 0;
      var b = z.add("button", undefined, undefined, { name: "button6" });
      b.text = "OK";
      b.preferredSize.width = 50;
      D.show();
    }
    function makeAnkleProps(b, c) {
      b.guideLayer = true;
      b.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      b.property("ADBE Root Vectors Group").property(1).name = "Controller";
      applyShapeToController(
        b,
        lmbraf.getSetting("userPrefs", "controllerShape"),
      );
      b.property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Rotation")
        .setValue(180);
      b.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      b.property("ADBE Root Vectors Group").property(2).name = "Admin";
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(1).name = "p3blend";
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(1).enabled = false;
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(1)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(2).name = "p2blend";
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(2).enabled = false;
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(2)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([1, 0]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(2)
        .property(3)
        .property("ADBE Vector Scale")
        .setValue([100, 100]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(3).name = "angles";
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(3).enabled = false;
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(3)
        .property(3)
        .property("ADBE Vector Anchor")
        .setValue([0, 0]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(4).name = "sides";
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(4).enabled = false;
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(4)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(5).name = "p3ik";
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(5).enabled = false;
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(5)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(5)
        .property(3)
        .property("ADBE Vector Scale")
        .setValue([100, 100]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .addProperty("ADBE Vector Group");
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(6).name = "p1";
      b
        .property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(6).enabled = false;
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(6)
        .property(3)
        .property("ADBE Vector Position")
        .setValue([0, 0]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(2)
        .property(6)
        .property(3)
        .property("ADBE Vector Scale")
        .setValue([100, 100]);
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(3)
        .property("ADBE Vector Scale")
        .setValue([100, 100]);
      b.property("ADBE Root Vectors Group")("Controller")(
        "ADBE Vector Transform Group",
      )("ADBE Vector Scale").setValue(controllerSize());
      b.applyPreset(pseudoFile);
      b.property("ADBE Effect Parade").property(1).name = "Limber";
      b.property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([540, 740, 0]);
      b.property("ADBE Transform Group")
        .property("ADBE Scale")
        .setValue([100, 100, 100]);
      b.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(0);
    }
    function makeAnkleExpressions(c, f) {
      c.property("ADBE Transform Group").property("ADBE Scale").expression =
        "[100, 100, 100]";
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property("ADBE Vector Shape").expression = "value;";
      } catch (g) {}
      try {
        var h = getStoredSetting("controllerColor");
        var d = getRGBfromHEX(h);
        d[3] = 0;
        var b = rgbToHsl(d[0], d[1], d[2]);
        b[3] = 0;
        ankleFillProperty = c
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property("ADBE Vector Graphic - Fill")
          .property("ADBE Vector Fill Color");
        ankleFillProperty.setValue(d);
        ankleFillExpression =
          'var startctrl = thisComp.layer("' +
          f.hip +
          '");\nvar endctrl = thisLayer;\nvar totLeng = (endctrl.effect("Limber")("Upper Length")+endctrl.effect("Limber")("Lower Length")) * (endctrl.effect("Limber")("Link Length to Size Scale") == true ? endctrl.effect("Limber")("Size Scale")/100 : 1);\nvar stretchLimit=length(endctrl.toWorld(endctrl.anchorPoint),startctrl.toWorld(startctrl.anchorPoint));\nhsl = rgbToHsl(value) + [linear(stretchLimit,totLeng*0.97,totLeng,0,0.19),0,0]; \nif (stretchLimit>totLeng) [1,0,0,0]; \nelse hslToRgb(hsl);';
        if (lmbraf.getSetting("userPrefs", "controllerColorDynamics")) {
          ankleFillProperty.expression = ankleFillExpression;
        } else {
          ankleFillProperty.expression = [
            "value;/*",
            ankleFillExpression,
            "*/",
          ].join("\n");
        }
        ankleFillProperty.setValue(d);
      } catch (g) {
        alert(g.toString());
      }
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(1)
          .property(3)
          .property("ADBE Vector Position").expression =
          'var s1blend = thisLayer.content("Admin").content("sides").transform.position[0]; \nvar a2blend=degreesToRadians(thisLayer.content("Admin").content("angles").transform.anchorPoint[1]); \nvar p2blend = thisLayer.content("Admin").content("p2blend").transform.position; \np2blend+[Math.sin(a2blend)*s1blend,-Math.cos(a2blend)*s1blend];';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(2)
          .property(3)
          .property("ADBE Vector Position").expression =
          'var s3blend = thisLayer(2)("Admin").content("sides").transform.position[1];\nvar a1blend = degreesToRadians(thisLayer.content("Admin").content("angles").transform.anchorPoint[0]);\nthisLayer.content("Admin").content("p1").transform.position+[Math.sin(a1blend)*s3blend,-Math.cos(a1blend)*s3blend];';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(2)
          .property(3)
          .property("ADBE Vector Scale").expression =
          'var endctrl = thisComp.layer("' +
          f.ankle +
          '"); \nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nc2 = clamp(endctrl.effect("Limber")("Middle Size")*sizeScale,1,(endctrl.effect("Limber")("Upper Length")+endctrl.effect("Limber")("Lower Length"))*0.55*(endctrl.effect("Limber")("Link Length to Size Scale") == true ? sizeScale : 1)); \n[c2, c2];';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(3)
          .property(3)
          .property("ADBE Vector Anchor").expression =
          'var startctrl  = thisComp.layer("' +
          f.hip +
          '"); \nvar endctrl  = thisComp.layer("' +
          f.ankle +
          '"); \nvar fk = endctrl.effect("Limber")("FK")/100; \nif (fk == 1) {\n// THE FK ONLY CALCULATION\nvar curLayer = startctrl; \nvar curRot = 0;\nwhile(curLayer.hasParent){curRot += curLayer.parent("ADBE Transform Group")("ADBE Rotate Z"); \ncurLayer = curLayer.parent;}\nvar a1fk = curRot+endctrl.effect("Limber")("Upper FK Rotation");\nvar a2fk = endctrl.effect("Limber")("Lower FK Rotation");\n[a1fk, a1fk+a2fk]\n} else if (fk == 0) {\n// THE IK ONLY CALCULATION\nvar p1 = thisLayer.content("Admin").content("p1").transform.position;\nvar p3ik = thisLayer.content("Admin").content("p3ik").transform.position; \nvar p3r = (p3ik-p1); \nvar s2ik = length(p1,p3ik);\nvar sides = thisLayer.content("Admin").content("sides").transform.position;\nvar s3blend = sides[1];\nvar s1blend = sides[0];\nvar cw = endctrl.effect("Limber")("Clockwise");\ntry {\nvar theta2 =- (cw > 0 ? -1 :1)*Math.acos(clamp((p3r[1]*p3r[1]+p3r[0]*p3r[0]-s3blend*s3blend-s1blend*s1blend)/(2*s3blend*s1blend),-1,1));\nvar theta1 = Math.atan2(-p3r[0]*(s3blend + s1blend*Math.cos(theta2)) - p3r[1]*(s1blend*Math.sin(theta2)), p3r[1]*(s3blend + s1blend*Math.cos(theta2)) - p3r[0]*(s1blend*Math.sin(theta2)));\nvar a1ik = 180 + radiansToDegrees(theta1);\nvar a2ik = 180 + radiansToDegrees(theta1+theta2);\n[a1ik, a2ik];\n} catch(err) {value;}\n} else {\n// THE BLEND CALCULATION\nvar curLayer = startctrl;\nvar curRot = 0; \nwhile(curLayer.hasParent){curRot += curLayer.parent("ADBE Transform Group")("ADBE Rotate Z"); \ncurLayer = curLayer.parent;}\nvar a2fk = endctrl.effect("Limber")("Lower FK Rotation"); \nvar a1fk = curRot+endctrl.effect("Limber")("Upper FK Rotation");\nvar p1 = thisLayer.content("Admin").content("p1").transform.position;\nvar p3ik = thisLayer.content("Admin").content("p3ik").transform.position;\nvar sides = thisLayer.content("Admin").content("sides").transform.position;\nvar s3blend = sides[1];\nvar s1blend = sides[0];\nvar p3r = (p3ik-p1);\nvar cw = endctrl.effect("Limber")("Clockwise");\ntry {\nvar theta2 =- (cw > 0 ? -1 :1)*Math.acos(clamp((p3r[1]*p3r[1]+p3r[0]*p3r[0]-s3blend*s3blend-s1blend*s1blend)/(2*s3blend*s1blend),-1,1)); \nvar theta1 = Math.atan2(-p3r[0]*(s3blend + s1blend*Math.cos(theta2)) - p3r[1]*(s1blend*Math.sin(theta2)), p3r[1]*(s3blend + s1blend*Math.cos(theta2)) - p3r[0]*(s1blend*Math.sin(theta2))); \nvar a1ik = 180 + radiansToDegrees(theta1);\nvar a2ik = 180 + radiansToDegrees(theta1+theta2);\nvar a1blend = (a1ik*(1-fk))+(a1fk*fk);\nvar a2blend = (a2ik*(1-fk))+((a1fk+a2fk)*fk);\n[a1blend, a2blend];\n} catch(err) {value; }}';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(4)
          .property(3)
          .property("ADBE Vector Position").expression =
          'var endctrl = thisComp.layer("' +
          f.ankle +
          '"); \nvar startctrl = thisComp.layer("' +
          f.hip +
          '"); \nvar fk = endctrl.effect("Limber")("FK")/100; \nvar p1 = thisLayer.content("Admin").content("p1").transform.position; \nvar p3 = thisLayer.content("Admin").content("p3ik").transform.position; \nvar c1 = thisLayer.content("Admin").content("p1").transform.scale[0]/2; \nvar c2 = thisLayer.content("Admin").content("p2blend").transform.scale[0]/2; \nvar c3 = thisLayer.content("Admin").content("p3ik").transform.scale[0]/2;\nvar linkLeng = endctrl.effect("Limber")("Link Length to Size Scale");\nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nvar stretch = endctrl.effect("Limber")("Stretch");\nvar cw = endctrl.effect("Limber")("Clockwise")/100;\nvar cwLin = Math.abs(cw);\nvar antipop = ((endctrl.effect("Limber")("Anti-pop"))/100);\nvar s3ik = Math.max(endctrl.effect("Limber")("Upper Length") * (linkLeng == true ? sizeScale : 1) , Math.abs(c1-c2)); \nvar s1ik = Math.max(endctrl.effect("Limber")("Lower Length") * (linkLeng == true ? sizeScale : 1), Math.abs(c2-c3)); \nvar totLeng = (s3ik+s1ik);\nvar s2 = length(p1,p3); \nif ((s2>totLeng) && (stretch == false)){[s1ik,s3ik]}\nelse if ((s2>totLeng) && (stretch == true)) {\nvar increase = 1+(s2-totLeng)/totLeng;\n[((s1ik*increase)*(1-fk)+((s1ik)*fk)) , ((s3ik*increase)*(1-fk)+((s3ik)*fk))]; \n}\nelse\n{\nvar prox = linear(Math.abs(s2-totLeng/2), 0, totLeng/2, 0, 1); \nvar antipopLin = totLeng*linear(linear(prox*prox*prox, 0.833, 1), 1-((antipop)*(1-fk)), 1); \nvar cwBlend = cwLin+fk*(1-cwLin);\nvar s1ap = antipopLin*(s1ik/totLeng);\nvar s3ap = antipopLin*(s3ik/totLeng);\nvar s3blend = (s3ap*cwBlend) + ((s3ap/(s3ap+s1ap))*s2)*(1-cwBlend);\nvar s1blend = (s1ap*cwBlend) + ((s1ap/(s3ap+s1ap))*s2)*(1-cwBlend);\n[s1blend, s3blend];\n}';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(5)
          .property(3)
          .property("ADBE Vector Position").expression =
          'var val = thisComp.layer("' +
          f.ankle +
          '");\nval.toWorld(val.anchorPoint);';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(5)
          .property(3)
          .property("ADBE Vector Scale").expression =
          'var endctrl = thisComp.layer("' +
          f.ankle +
          '");\nvar c3 = endctrl.effect("Limber")("End Size")*endctrl.effect("Limber")("Size Scale")/100;\n[c3, c3];';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(6)
          .property(3)
          .property("ADBE Vector Position").expression =
          'var val = thisComp.layer("' +
          f.hip +
          '");\nval.toWorld(val.anchorPoint);';
      } catch (g) {}
      try {
        c
          .property("ADBE Root Vectors Group")
          .property(2)
          .property(2)
          .property(6)
          .property(3)
          .property("ADBE Vector Scale").expression =
          'var endctrl = thisComp.layer("' +
          f.ankle +
          '");\nvar c1 = endctrl.effect("Limber")("Start Size")*endctrl.effect("Limber")("Size Scale")/100;\n[c1,c1]';
      } catch (g) {}
      try {
        c
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z").expression =
          "// Limber IK End Rotation\nvar userRot = " +
          lmbraf.getSetting("userPrefs", "controllerUserRotation") +
          ';\nvar valueRot = userRot ? value : 0;\nvar startctrl = thisComp.layer("' +
          f.hip +
          '"); \nvar endctrl = thisLayer;\nvar curLayer = thisLayer;\nvar curRot = 0;\nwhile(curLayer.hasParent){curRot += curLayer.parent("ADBE Transform Group")("ADBE Rotate Z"); curLayer = curLayer.parent;}\nvar rotend = endctrl.effect("Limber")("Rotate End")/100;\nif (rotend == 0) {-curRot + valueRot} // output\nelse {\nvar p1 = startctrl.toWorld([0,0,0]); \nvar p3ik = endctrl.toWorld([0,0,0]);\nvar p3r=(p3ik-p1);\nvar c1 = endctrl.content("Admin").content("p1").transform.scale[0]/2; \nvar c2 = endctrl.content("Admin").content("p2blend").transform.scale[0]/2; \nvar c3 = endctrl.content("Admin").content("p3blend").transform.scale[0]/2;\nvar linkLeng = endctrl.effect("Limber")("Link Length to Size Scale");\nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nvar cw = endctrl.effect("Limber")("Clockwise");\nvar cwLin = Math.abs(cw/100);\nvar antipop = (endctrl.effect("Limber")("Anti-pop"))/100;\nvar s3ik = Math.max(endctrl.effect("Limber")("Upper Length") * (linkLeng == true ? sizeScale : 1) , Math.abs(c1-c2));\nvar s1ik = Math.max(endctrl.effect("Limber")("Lower Length") * (linkLeng == true ? sizeScale : 1), Math.abs(c2-c3));\nvar totLeng = (s3ik+s1ik);\nvar s2 = length(p1,p3ik);\nvar prox = linear(Math.abs(s2-totLeng/2), 0, totLeng/2, 0, 1); \nvar antipopLin = totLeng*linear(linear(prox*prox*prox, 0.833, 1), (1-antipop), 1); \nvar s1ap = antipopLin*(s1ik/totLeng);\nvar s3ap = antipopLin*(s3ik/totLeng);\nvar s3blend = (s3ap*cwLin) + ((s3ap/(s3ap+s1ap))*s2)*(1-cwLin);\nvar s1blend = (s1ap*cwLin) + ((s1ap/(s3ap+s1ap))*s2)*(1-cwLin);\ntry {var theta2=(cw > 0 ? 1 :-1)*Math.acos(clamp((p3r[1]*p3r[1]+p3r[0]*p3r[0]-s3blend*s3blend-s1blend*s1blend)/(2*s3blend*s1blend),-1,1)); \nvar theta1=Math.atan2(-p3r[0]*(s3blend + s1blend*Math.cos(theta2)) - p3r[1]*(s1blend*Math.sin(theta2)), p3r[1]*(s3blend + s1blend*Math.cos(theta2)) - p3r[0]*(s1blend*Math.sin(theta2)));\nvar a1ik = theta1+Math.PI;\nvar a2ik = theta1+theta2+Math.PI;} catch(err) {value;}\nvar curveLin = endctrl.effect("Limber")("Bone Curvature")/100;\nif (curveLin == 0) {\n(rotend*(radiansToDegrees(a2ik)-180-curRot)) + ((1-rotend) * -curRot) + valueRot // output\n} else {\nvar p2ik = p1+[Math.sin(a1ik)*s3blend,-Math.cos(a1ik)*s3blend];\nvar p3ik = p2ik+[Math.sin(a2ik)*s1blend,-Math.cos(a2ik)*s1blend];\nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nvar linkScale = endctrl.effect("Limber")("Link Length to Size Scale");\nvar tangLeng = (curveLin*(endctrl.effect("Limber")("Upper Length")+endctrl.effect("Limber")("Lower Length"))/2) * (linkScale == true ? sizeScale : 1);\nvar avang = ((a1ik+a2ik-Math.PI)/2);\nvar tangPos = p2ik+[Math.cos(avang) * tangLeng, Math.sin(avang) * tangLeng];\nvar tangPosRel = tangPos-p3ik;\nvar a1curve = radiansToDegrees(Math.atan2(tangPosRel[1],tangPosRel[0]))+90;\n(rotend * a1curve-curRot) + ((1-rotend) * -curRot) + valueRot // output\n}}';
      } catch (g) {}
    }
    function makeHipProps(b, c) {
      b.guideLayer = true;
      b.moveToEnd();
      b.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      b.property("ADBE Root Vectors Group").property(1).name = "Controller";
      applyShapeToController(
        b,
        lmbraf.getSetting("userPrefs", "controllerShape"),
      );
      b.property("ADBE Root Vectors Group")
        .property(1)
        .property(3)
        .property("ADBE Vector Rotation")
        .setValue(180);
      b.property("ADBE Root Vectors Group").addProperty("ADBE Vector Group");
      b.property("ADBE Root Vectors Group").property(2).name = "Admin";
      b.property("ADBE Root Vectors Group")
        .property(2)
        .property(3)
        .property("ADBE Vector Scale")
        .setValue([100, 100]);
      b.property("ADBE Root Vectors Group")("Controller")(
        "ADBE Vector Transform Group",
      )("ADBE Vector Scale").setValue(controllerSize());
      b.property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([540, 340, 0]);
      b.property("ADBE Transform Group")
        .property("ADBE Scale")
        .setValue([100, 100, 100]);
      b.property("ADBE Transform Group").property("ADBE Rotate Z").setValue(0);
      b.selected = false;
    }
    function makeHipExpressions(b, f) {
      b.property("ADBE Transform Group").property("ADBE Scale").expression =
        "[100, 100]";
      try {
        var h = getStoredSetting("controllerColor");
        var d = getRGBfromHEX(h);
        d[3] = 0;
        var c = rgbToHsl(d[0], d[1], d[2]);
        c[3] = 0;
        hipFillProperty = b
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property("ADBE Vector Graphic - Fill")
          .property("ADBE Vector Fill Color");
        hipFillProperty.setValue(d);
        hipFillExpression =
          'var startctrl = thisLayer; \nvar endctrl = thisComp.layer("' +
          f.ankle +
          '"); \nvar totLeng = (endctrl.effect("Limber")("Upper Length")+endctrl.effect("Limber")("Lower Length")) * (endctrl.effect("Limber")("Link Length to Size Scale") == true ? endctrl.effect("Limber")("Size Scale")/100 : 1);\nvar stretchLimit=length(endctrl.toWorld(endctrl.anchorPoint),startctrl.toWorld(startctrl.anchorPoint));\nhsl = rgbToHsl(value) + [linear(stretchLimit,totLeng*0.97,totLeng,0,0.19),0,0]; \nif (stretchLimit>totLeng) [1,0,0,0]; \nelse hslToRgb(hsl);';
        if (lmbraf.getSetting("userPrefs", "controllerColorDynamics")) {
          hipFillProperty.expression = hipFillExpression;
        } else {
          hipFillProperty.expression = [
            "value;/*",
            hipFillExpression,
            "*/",
          ].join("\n");
        }
        hipFillProperty.setValue(d);
      } catch (g) {
        alert(g.toString());
      }
      try {
        b
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z").expression =
          "// Limber IK Start Rotation\nvar userRot = " +
          lmbraf.getSetting("userPrefs", "controllerUserRotation") +
          ';\nvar valueRot = userRot ? value : 0;\nvar endctrl  = thisComp.layer("' +
          f.ankle +
          '");\nvar startctrl  = thisComp.layer("' +
          f.hip +
          '");\nvar rotstart = endctrl.effect("Limber")("Rotate Start")/100;\nvar curlayer = startctrl;\nvar curRot = 0; \nwhile(curlayer.hasParent){curRot += curlayer.parent("ADBE Transform Group")("ADBE Rotate Z"); \ncurlayer = curlayer.parent;}\n// THE NO AUTO-ROTATE CALCULATION\nif (rotstart == 0) {\n-curRot + valueRot; //  output\n} else {\nvar fk = endctrl.effect("Limber")("FK")/100;\nif (fk==1) {\n// THE FK ONLY CALCULATION\nvar startctrl = thisComp.layer("' +
          f.hip +
          '");\nvar p1 = startctrl.toWorld([0,0,0]);\nvar a1fk = degreesToRadians(endctrl.effect("Limber")("Upper FK Rotation"));\nvar curveLin = endctrl.effect("Limber")("Bone Curvature")/100;\nif (curveLin == 0) {\n(rotstart*(radiansToDegrees(a1fk)-180)-curRot) + (-rotstart * -curRot) + valueRot; // output\n} else {\nvar a2fk = degreesToRadians(endctrl.effect("Limber")("Lower FK Rotation"));\nvar c1 = endctrl.content("Admin").content("p1").transform.scale[0]/2; \nvar c2 = endctrl.content("Admin").content("p2blend").transform.scale[0]/2; \nvar c3 = endctrl.content("Admin").content("p3blend").transform.scale[0]/2;\nvar s3fk = Math.max(endctrl.effect("Limber")("Upper Length"), Math.abs(c1-c2)); \nvar s1fk = Math.max(endctrl.effect("Limber")("Lower Length"), Math.abs(c2-c3));\nvar p2fk = p1+[Math.sin(a1fk)*s3fk,-Math.cos(a1fk)*s3fk];\nvar avang = ((a1fk+a1fk+a2fk-Math.PI)/2);\nvar tangLeng = curveLin*(s3fk+s1fk)/2;\nvar tangPos = p2fk-[Math.cos(avang) * tangLeng, Math.sin(avang) * tangLeng];\nvar tangPosRel = tangPos-p1;\nvar a1fkcurve = radiansToDegrees(Math.atan2(tangPosRel[1],tangPosRel[0]))-90;\t\nrotstart*(a1fkcurve)-curRot + (-rotstart * -curRot) + valueRot; // output\n} } else if (fk==0) {\n// THE IK ONLY CALCULATION\nvar p1 = startctrl.toWorld([0,0,0]);\nvar p3ik = endctrl.toWorld([0,0,0]);\nvar p3r=(p3ik-p1);\nvar s2 = length(p1,p3ik);\nvar c1 = endctrl.content("Admin").content("p1").transform.scale[0]/2; \nvar c2 = endctrl.content("Admin").content("p2blend").transform.scale[0]/2; \nvar c3 = endctrl.content("Admin").content("p3blend").transform.scale[0]/2;\nvar linkLeng = endctrl.effect("Limber")("Link Length to Size Scale");\nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nvar cw = endctrl.effect("Limber")("Clockwise");\nvar cwLin = Math.abs(cw/100);\nvar antipop = (endctrl.effect("Limber")("Anti-pop"))/100;\nvar s3ik = Math.max(endctrl.effect("Limber")("Upper Length") * (linkLeng == true ? sizeScale : 1) , Math.abs(c1-c2)); \nvar s1ik = Math.max(endctrl.effect("Limber")("Lower Length") * (linkLeng == true ? sizeScale : 1), Math.abs(c2-c3)); \nvar totLeng = (s3ik+s1ik);\nvar s2 = length(p1,p3ik);\nvar prox = linear(Math.abs(s2-totLeng/2), 0, totLeng/2, 0, 1);\nvar antipopLin = totLeng*linear(linear(prox*prox*prox, 0.833, 1), (1-antipop), 1); \nvar s1ap = antipopLin*(s1ik/totLeng);\nvar s3ap = antipopLin*(s3ik/totLeng);\nvar cwBlend = cwLin+fk*(1-cwLin);\nvar s3blend = (s3ap*cwBlend) + ((s3ap/(s3ap+s1ap))*s2)*(1-cwBlend);\nvar s1blend = (s1ap*cwBlend) + ((s1ap/(s3ap+s1ap))*s2)*(1-cwBlend);\ntry {var theta2=(cw > 0 ? 1 : -1)*Math.acos(clamp((p3r[1]*p3r[1]+p3r[0]*p3r[0]-s3blend*s3blend-s1blend*s1blend)/(2*s3blend*s1blend),-1,1)); \nvar theta1=Math.atan2(-p3r[0]*(s3blend + s1blend*Math.cos(theta2)) - p3r[1]*(s1blend*Math.sin(theta2)), p3r[1]*(s3blend + s1blend*Math.cos(theta2)) - p3r[0]*(s1blend*Math.sin(theta2))); \nvar a1ik = theta1+Math.PI;\nvar a2ik = theta2} catch(err) {value;}\nvar curveLin = endctrl.effect("Limber")("Bone Curvature")/100;\nif (curveLin == 0) {\nrotstart * (radiansToDegrees(a1ik)-180-curRot) + ((1-rotstart) * -curRot) + valueRot; // output\n} else {\nvar p2ik = p1+[Math.sin(a1ik)*s3blend,-Math.cos(a1ik)*s3blend];\nvar avang = ((a1ik+a1ik+a2ik-Math.PI)/2);\nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nvar linkScale = endctrl.effect("Limber")("Link Length to Size Scale");\nvar tangLeng = (curveLin*(endctrl.effect("Limber")("Upper Length")+endctrl.effect("Limber")("Lower Length"))/2) * (linkScale == true ? sizeScale : 1);\nvar tangPos = p2ik-[Math.cos(avang) * tangLeng, Math.sin(avang) * tangLeng];\nvar tangPosRel = tangPos-p1;\nvar curveRotik = radiansToDegrees(Math.atan2(tangPosRel[1],tangPosRel[0]))-90;\nrotstart * (curveRotik-curRot) + ((1-rotstart) * -curRot) + valueRot;  // output\n}} else {\n// THE BLEND CALCULATION\nvar p1 = startctrl.toWorld([0,0,0]); \nvar p3ik = endctrl.toWorld([0,0,0]);\nvar p3r=(p3ik-p1); \nvar s2 = length(p1,p3ik); \nvar c1 = endctrl.content("Admin").content("p1").transform.scale[0]/2; \nvar c2 = endctrl.content("Admin").content("p2blend").transform.scale[0]/2; \nvar c3 = endctrl.content("Admin").content("p3blend").transform.scale[0]/2; \nvar linkLeng = endctrl.effect("Limber")("Link Length to Size Scale");\nvar sizeScale = endctrl.effect("Limber")("Size Scale")/100;\nvar cw = endctrl.effect("Limber")("Clockwise");\nvar cwLin = Math.abs(cw/100);\nvar s3ik = Math.max(endctrl.effect("Limber")("Upper Length") * (linkLeng == true ? sizeScale : 1) , Math.abs(c1-c2)); \nvar s1ik = Math.max(endctrl.effect("Limber")("Lower Length") * (linkLeng == true ? sizeScale : 1), Math.abs(c2-c3)); \nvar totLeng = (s3ik+s1ik);\nvar s2 = length(p1,p3ik); \nvar prox = linear(Math.abs(s2-totLeng/2), 0, totLeng/2, 0, 1); \nvar antipopLin = totLeng*linear(linear(prox*prox*prox, 0.833, 1), (1-((endctrl.effect("Limber")("Anti-pop"))/100)), 1); \nvar s1ap = antipopLin*(s1ik/totLeng);\nvar s3ap = antipopLin*(s3ik/totLeng);\nvar cwBlend = cwLin+fk*(1-cwLin);\nvar s3blend = (s3ap*cwBlend) + ((s3ap/(s3ap+s1ap))*s2)*(1-cwBlend);\nvar s1blend = (s1ap*cwBlend) + ((s1ap/(s3ap+s1ap))*s2)*(1-cwBlend);\ntry {var theta2=(cw > 0 ? 1 : -1)*Math.acos(clamp((p3r[1]*p3r[1]+p3r[0]*p3r[0]-s3blend*s3blend-s1blend*s1blend)/(2*s3blend*s1blend),-1,1)); \nvar theta1=Math.atan2(-p3r[0]*(s3blend + s1blend*Math.cos(theta2)) - p3r[1]*(s1blend*Math.sin(theta2)), p3r[1]*(s3blend + s1blend*Math.cos(theta2)) - p3r[0]*(s1blend*Math.sin(theta2))); \nvar a1ik = theta1+Math.PI;\nvar a2ik = theta2;} catch(err) {value; }\nvar a1fk=degreesToRadians(curRot+(endctrl.effect("Limber")("Upper FK Rotation")));\nvar a2fk=degreesToRadians(endctrl.effect("Limber")("Lower FK Rotation"));\nvar a1blend = (a1ik*(1-fk))+(a1fk*fk);\nvar a2blend = (a2ik*(1-fk))+(a2fk*fk);\nvar p2blend = p1+[Math.sin(a1blend)*s3blend,-Math.cos(a1blend)*s3blend];\nvar curveLin = endctrl.effect("Limber")("Bone Curvature")/100;\nif (curveLin == 0) {\nrotstart * (radiansToDegrees(a1blend)-180-curRot) + ((1-rotstart) * -curRot) + valueRot; // output\n}\nelse {\nvar avang = ((a1blend+a1blend+a2blend-Math.PI)/2);\nvar tangLeng = curveLin*totLeng/2;\nvar tangPos = p2blend-[Math.cos(avang) * tangLeng, Math.sin(avang) * tangLeng];\nvar tangPosRel = tangPos-p1;\nvar curveRotblend = radiansToDegrees(Math.atan2(tangPosRel[1],tangPosRel[0]))-90;\nrotstart * (curveRotblend-curRot) + ((1-rotstart) * -curRot) + valueRot; // output\n} } }';
      } catch (g) {}
    }
    function collectAndExtractEffects(f) {
      function l(p, i) {
        var o = p;
        k = o.numProperties;
        for (var c = 1; c <= k; c += 1) {
          if (
            o.property(c).propertyType == PropertyType.INDEXED_GROUP ||
            o.property(c).propertyType == PropertyType.NAMED_GROUP
          ) {
            l(o.property(c), i);
          } else {
            if (o.property(c) instanceof Property) {
              var n = {
                propArray: j(o.property(c)),
                propVal: o.property(c).value,
              };
              i.push(n);
            }
          }
        }
      }
      function j(n) {
        var i = [];
        while (n.propertyDepth > 2) {
          i.unshift(n.matchName);
          n = n.parentProperty;
        }
        return i;
      }
      var b = [];
      var g = [];
      var h = f.property("ADBE Effect Parade");
      m = h.numProperties;
      while (m > 0) {
        b.push({ mName: h(1).matchName, name: h(1).name, propData: [] });
        l(h(1), g);
        b[b.length - 1].propData = g;
        g = [];
        h(1).remove();
        m = h.numProperties;
      }
      return b;
    }
    function applyEffects(k, j) {
      f = j.length;
      for (var h = 0; h < f; h += 1) {
        var c = k.property("ADBE Effect Parade").addProperty(j[h].mName);
        c.name = j[h].name;
        n = j[h].propData.length;
        for (var d = 0; d < n; d += 1) {
          var l = j[h].propData[d].propArray;
          var g = c;
          for (var b = 0; b < l.length; b += 1) {
            g = g.property(l[b]);
          }
          try {
            g.setValue(j[h].propData[d].propVal);
          } catch (m) {}
        }
      }
    }
    function matchIk(c) {
      var i = app.project.activeItem;
      if (!i || !(i instanceof CompItem)) {
        makeAlert("No comp selected");
        return;
      }
      if (i.selectedLayers.length > 0) {
        var j = getLimbLayersForScript(i.selectedLayers[0]);
        if (j) {
          var l = j.ankle.property("ADBE Effect Parade")("Pseudo/Limber_16")(
            "Pseudo/Limber_16-0032",
          );
          var m = j.ankle.property("ADBE Effect Parade")("Pseudo/Limber_16")(
            "Pseudo/Limber_16-0033",
          );
          if (c) {
            k = matchFKtoIK_dummyExpressionProp(j.ankle, j.hip);
            b = k("ADBE Point Control-0001").value;
            setProp(l, b[0]);
            setProp(m, b[1]);
            k.remove();
          } else {
            var d = j.ankle.property("ADBE Transform Group")("ADBE Position");
            var h = j.ankle.property("ADBE Effect Parade")("Pseudo/Limber_16")(
              "Pseudo/Limber_16-0024",
            );
            k = matchIKtoFK_dummyExpressionProp(j.ankle, j.hip);
            b = k("ADBE Point3D Control-0001").value;
            var n = [b[0], b[1]];
            var f = b[2];
            var g = j.ankle.parent;
            j.ankle.parent = null;
            setProp(d, n);
            setProp(h, f);
            k.remove();
            j.ankle.parent = g;
          }
        }
      }
    }
    function matchIKtoFK_dummyExpressionProp(c, b) {
      var f = b("ADBE Effect Parade").addProperty("ADBE Point3D Control");
      var d = f("ADBE Point3D Control-0001");
      var g = [
        "function MatchIKtoFK(ankleLayer, hipLayer) {",
        "    var endctrl = ankleLayer;",
        "var startctrl = hipLayer;",
        "var p1 = startctrl.toWorld(startctrl.anchorPoint);",
        "var p3 = endctrl.toWorld(endctrl.anchorPoint);",
        "var p3r = (p3 - p1);",
        "var s2 = length(p1, p3);",
        'var C1 = endctrl(2)("Admin")(2)("p1")(3)(3)[0] / 2;',
        'var C2 = endctrl(2)("Admin")(2)("p2blend")(3)(3)[0] / 2;',
        'var C3 = endctrl(2)("Admin")(2)("p3blend")(3)(3)[0] / 2;',
        'var UL = Math.max(endctrl(4)("Limber")("Upper Length") * (endctrl(4)("Limber")("Link Length to Size Scale") == true ? endctrl(4)("Limber")("Size Scale") / 100 : 1), Math.abs(C1 - C2));',
        'var LL = Math.max(endctrl(4)("Limber")("Lower Length") * (endctrl(4)("Limber")("Link Length to Size Scale") == true ? endctrl(4)("Limber")("Size Scale") / 100 : 1), Math.abs(C2 - C3));',
        "var TL = (UL + LL);",
        "var s2 = length(p1, p3);",
        "var s1 = TL * (LL / TL);",
        "var s3 = TL * (UL / TL);",
        "var curlayer = startctrl;",
        "var rot = 0;",
        "while (curlayer.hasParent) {",
        '    rot += curlayer.parent("ADBE Transform Group")("ADBE Rotate Z");',
        "    curlayer = curlayer.parent;",
        "}",
        'var a1fk = degreesToRadians(rot + endctrl(4)("Limber")("Upper FK Rotation"));',
        'var a2fk = a1fk + degreesToRadians(endctrl(4)("Limber")("Lower FK Rotation"));',
        "var p2 = p1 + [Math.sin(a1fk) * s3, -Math.cos(a1fk) * s3];",
        "var anklePos = p2 + [Math.sin(a2fk) * s1, -Math.cos(a2fk) * s1];",
        "var a2deg = radiansToDegrees(a2fk);",
        "if (a2deg - 360 * Math.floor(a2deg / 360) > 180) {",
        "    var ankleClock = 100",
        "} else {",
        "    var ankleClock = -100",
        "};",
        "var returnData = [anklePos[0] , anklePos[1], ankleClock];",
        "return (returnData);",
        "}",
        'var ankleLayer = thisComp.layer("' + c.name + '")',
        'var hipLayer = thisComp.layer("' + b.name + '")',
        "MatchIKtoFK(ankleLayer, hipLayer)",
      ].join("\n");
      d.expression = g;
      return f;
    }
    function matchFKtoIK_dummyExpressionProp(c, b) {
      var f = b("ADBE Effect Parade").addProperty("ADBE Point Control");
      var d = f("ADBE Point Control-0001");
      var g = [
        "function matchFKtoIK(ankleLayer, hipLayer){",
        "   var endctrl = ankleLayer;",
        "   var startctrl = hipLayer;",
        "   var p1 = startctrl.toWorld(startctrl.anchorPoint);",
        "   var p3 = endctrl.toWorld(endctrl.anchorPoint);",
        "   var p3r=(p3-p1); ",
        "   var s2 = length(p1,p3);",
        '   var C1 = endctrl(2)("Admin")(2)("p1")(3)(3)[0]/2; ',
        '   var C2 = endctrl(2)("Admin")(2)("p2blend")(3)(3)[0]/2; ',
        '   var C3 = endctrl(2)("Admin")(2)("p3blend")(3)(3)[0]/2; ',
        '   var UL = Math.max(endctrl(4)("Limber")("Upper Length") * (endctrl(4)("Limber")("Link Length to Size Scale") == true ? endctrl(4)("Limber")("Size Scale")/100 : 1) , Math.abs(C1-C2)); ',
        '   var LL = Math.max(endctrl(4)("Limber")("Lower Length") * (endctrl(4)("Limber")("Link Length to Size Scale") == true ? endctrl(4)("Limber")("Size Scale")/100 : 1), Math.abs(C2-C3)); ',
        "   var TL = (UL+LL);",
        "   var s2 = length(p1,p3);",
        '   var clock = Math.abs(endctrl(4)("Limber")("Clockwise"))/100;',
        "   var s1ap = TL*(LL/TL);",
        "   var s3ap = TL*(UL/TL);",
        "   var s3 = (s3ap*clock) + ((s3ap/(s3ap+s1ap))*s2)*(1-clock);",
        "   var s1 = (s1ap*clock) + ((s1ap/(s3ap+s1ap))*s2)*(1-clock);",
        "   var curlayer = startctrl;",
        "   var rot = 0;",
        "   while (curlayer.hasParent) {",
        '   rot += curlayer.parent("ADBE Transform Group")("ADBE Rotate Z");',
        "   curlayer = curlayer.parent;",
        "   }",
        '   var theta2=-(endctrl(4)("Limber")("Clockwise") > 0 ? -1 :1)*Math.acos(clamp((p3r[1]*p3r[1]+p3r[0]*p3r[0]-s3*s3-s1*s1)/(2*s3*s1),-1,1));',
        "   var theta1=Math.atan2(-p3r[0]*(s3 + s1*Math.cos(theta2)) - p3r[1]*(s1*Math.sin(theta2)), p3r[1]*(s3 + s1*Math.cos(theta2)) - p3r[0]*(s1*Math.sin(theta2)));",
        "   return([180+radiansToDegrees(theta1)-rot, radiansToDegrees(theta2)]);",
        "}",
        'var ankleLayer = thisComp.layer("' + c.name + '");',
        'var hipLayer = thisComp.layer("' + b.name + '");',
        "matchFKtoIK(ankleLayer, hipLayer);",
      ].join("\n");
      d.expression = g;
      return f;
    }
    function quickBone() {
      function O(s, p, ad, r) {
        var i = s.property("ADBE Transform Group")("ADBE Position");
        i.expression = [
          'var srcLayer = thisComp.layer("' + p.name + '")',
          "var srcPath = srcLayer" + ad + ".points()[" + r + "]",
          "srcLayer.toComp(srcPath);",
        ].join("\n");
        var ac = i.value;
        i.setValue(i.value);
        i.expression = "";
        return ac;
      }
      function l(i, r) {
        var p = "";
        while (i.parentProperty !== null) {
          if (i.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
            r.unshift(i.propertyIndex);
            p = "(" + i.propertyIndex + ")" + p;
          } else {
            p = '("' + i.matchName.toString() + '")' + p;
          }
          i = i.parentProperty;
        }
        return p;
      }
      var n = ccType;
      ccType = "Bone";
      var aa = app.project.activeItem;
      if (!aa || !(aa instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return null;
      }
      var R = aa.selectedLayers;
      if (R.length === 0) {
        makeAlert("Please select a shape layer with three points");
        return null;
      }
      var x = R[0];
      if (!(x instanceof ShapeLayer)) {
        makeAlert(
          "Please select a shape layer with one three-point path shape",
        );
        return null;
      }
      var G = x.property("ADBE Root Vectors Group")("ADBE Vector Group")(
        "ADBE Vectors Group",
      )("ADBE Vector Shape - Group")("ADBE Vector Shape");
      if (!G) {
        makeAlert(
          "Please select a shape layer with one three-point path shape",
        );
        return null;
      }
      var Y = G.value.vertices;
      if (Y.length !== 3) {
        makeAlert(
          "Please select a shape layer with one three-point path shape",
        );
        return null;
      }
      var f = makeTheArm(true);
      if (!f) {
        return null;
      }
      var z = aa.layers.addShape();
      var k = aa.layers.addShape();
      var J = aa.layers.addShape();
      var I = aa.layers.addShape();
      z.name = "limber1.6-temp-startLocator";
      k.name = "limber1.6-temp-midLocator";
      J.name = "limber1.6-temp-endLocator";
      I.name = "limber1.6-temp-repoLocator";
      var C = [];
      var c = l(G, C);
      var u = O(z, x, c, 0);
      var P = O(k, x, c, 1);
      var h = O(J, x, c, 2);
      I.parent = x;
      var Q = I.property("ADBE Transform Group")("ADBE Position");
      var M = I.property("ADBE Transform Group")("ADBE Scale");
      var N = I.property("ADBE Transform Group")("ADBE Rotate Z");
      Q.setValue([0, 0, 0]);
      M.setValue([100, 100, 100]);
      N.setValue(0);
      z.parent = I;
      k.parent = I;
      J.parent = I;
      var g = {
        p: x("ADBE Root Vectors Group")("ADBE Vector Group")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Position").value,
        r: x("ADBE Root Vectors Group")("ADBE Vector Group")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Rotation").value,
        s: x("ADBE Root Vectors Group")("ADBE Vector Group")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale").value,
      };
      Q.setValue(g.p);
      M.setValue(g.s);
      N.setValue(g.r);
      z.parent = null;
      k.parent = null;
      J.parent = null;
      quickLimb(z, k, J, f.ankle, false);
      ccType = n;
      z.remove();
      k.remove();
      J.remove();
      I.remove();
      var K = x.property("ADBE Root Vectors Group")("ADBE Vector Group")(
        "ADBE Vectors Group",
      )("ADBE Vector Graphic - Stroke");
      var F = false;
      if (!K) {
        x.property("ADBE Root Vectors Group")("ADBE Vector Group")(
          "ADBE Vectors Group",
        ).addProperty("ADBE Vector Graphic - Stroke");
        K = x.property("ADBE Root Vectors Group")("ADBE Vector Group")(
          "ADBE Vectors Group",
        )("ADBE Vector Graphic - Stroke");
        K("ADBE Vector Stroke Color").setValue([
          0.996078431372549, 0.7843137254901961, 0.2901960784313726,
        ]);
        K("ADBE Vector Stroke Width").setValue(48);
        F = true;
      }
      var W = f.leg.property("ADBE Root Vectors Group")("ADBE Vector Group")(
        "ADBE Vectors Group",
      )("ADBE Vector Graphic - Stroke");
      var X = K("ADBE Vector Stroke Color");
      var E = W("ADBE Vector Stroke Color");
      E.setValue(X.value);
      var t = K("ADBE Vector Stroke Width");
      var b = W("ADBE Vector Stroke Width");
      var y = x.property("ADBE Transform Group")("ADBE Scale").value[0];
      var B = y * 0.01 * g.s[0] * 0.01;
      b.setValue(t.value * B);
      var L = K("ADBE Vector Stroke Line Cap");
      var v = W("ADBE Vector Stroke Line Cap");
      v.setValue(L.value);
      var H = K("ADBE Vector Stroke Line Join");
      var m = W("ADBE Vector Stroke Line Join");
      m.setValue(H.value);
      if (F) {
        K.remove();
      }
      var Z = K("ADBE Vector Stroke Dashes");
      var T = W("ADBE Vector Stroke Dashes");
      for (var U = 1; U <= Z.numProperties; U += 1) {
        var o = Z(U);
        if (o.canSetExpression) {
          var D = o.matchName;
          var d = T.addProperty(D);
          d.setValue(o.value);
        }
      }
      if (parseFloat(app.version) >= 17.1) {
        var S = K("ADBE Vector Stroke Taper");
        var ab = W("ADBE Vector Stroke Taper");
        for (var N = 1; N <= S.numProperties; N += 1) {
          try {
            ab.property(N).setValue(S.property(N).value);
          } catch (V) {
            continue;
          }
        }
        var j = K("ADBE Vector Stroke Wave");
        var A = W("ADBE Vector Stroke Wave");
        for (var N = 1; N <= j.numProperties; N += 1) {
          try {
            A.property(N).setValue(j.property(N).value);
          } catch (V) {
            continue;
          }
        }
      }
      x.enabled = false;
      var q = aa.selectedLayers;
      for (var U = 0; U < q.length; U += 1) {
        q[U].selected = false;
      }
      aa.layer(f.ankle.name).selected = true;
    }
    function buildUI(O) {
      var r = 2;
      var D = 4;
      var U = 2;
      var x = 4;
      var s = 26;
      var q = 22;
      var F = 66;
      var C = 20;
      var t = 4;
      var N = 36;
      var M = 20;
      var j = 16;
      var I = 76;
      var S = 20;
      var h = 0 + S;
      var d = 80 + S * 2;
      var b = 96 + S * 3;
      var f = 20;
      var L = 28;
      var K = L + j;
      var J = K + t + f;
      var H = J + t + f;
      var G = H + t + f;
      var E = G + t + f;
      var B = E + j;
      var A = B + t + f;
      var z = A + t + f;
      var y = z + t + f;
      var n = y + j;
      var m = n + t + f;
      var k = m + t + f;
      var o = [0.176, 0.549, 0.922];
      var P = [0, 0.8, 0];
      var p = [0.996, 0.784, 0.29];
      win =
        O instanceof Panel
          ? O
          : new Window("palette", "Script Window", [500, 500, 900, 900]);
      var V = [];
      for (var R = 0; R < nameData.length; R += 1) {
        V.push(nameData[R].limbName);
      }
      var Q = ScriptUI.newImage(
        settings_smaller,
        settings_smaller,
        settings_smallerHover,
        settings_smallerHover,
      );
      win.xui_ui_label3 = win.add("iconButton", [r, U, r + M + 1, U + M], Q);
      win.xui_ui_label3.justify = "left";
      win.xui_ui_label3.addEventListener(
        "mouseover",
        function () {
          this.image = ScriptUI.newImage(settings_smallerHover);
        },
        false,
      );
      win.xui_ui_label3.addEventListener(
        "mouseout",
        function () {
          this.image = Q;
        },
        false,
      );
      win.xui_ui_label3.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_label3.onClick = function () {
        buildPresetEditor();
      };
      win.xui_ui_label3.helpTip = "Configure your limb layer names.";
      win.xui_ui_input3 = win.add(
        "dropdownlist",
        [r + s + t, U, r + t + s + F, U + q],
        V,
      );
      win.xui_ui_input3.justify = "left";
      win.xui_ui_input3.onChange = function () {
        if (
          !win.xui_ui_input3.selection ||
          win.xui_ui_input3.selection.index > win.xui_ui_input3.items.length - 1
        ) {
          return;
        }
        var g = nameData[win.xui_ui_input3.selection.index];
        try {
          limbType = g.limbName;
          limbStart = g.start;
          limbEnd = g.end;
          limbJoint = g.joint;
        } catch (c) {
          alert(c.toString() + "\nLine: " + c.line.toString());
        }
      };
      win.xui_ui_input3.selection = 0;
      win.xui_ui_label4 = win.add(
        "statictext",
        [r + t * 2 + s + F, U, r + t * 2 + s * 2 + F, U + q],
        "Type",
      );
      win.xui_ui_label4.justify = "left";
      win.xui_ui_comboinput4 = win.add(
        "dropdownlist",
        [r + t * 3 + s * 2 + F, U, r + t * 3 + s * 2 + F * 2, U + q],
        ["Taper", "Bone", "Legacy Taper", "Three Circles"],
      );
      win.xui_ui_comboinput4.onChange = function () {
        switch (win.xui_ui_comboinput4.selection.index) {
          case 0:
            ccType = "Taper";
            break;
          case 1:
            ccType = "Bone";
            break;
          case 2:
            ccType = "legacyTaper";
            break;
          default:
            ccType = "threeCircles";
        }
      };
      var l = win.xui_ui_comboinput4;
      l.selection = 0;
      ccType = "Taper";
      var v = win.add("staticText", [r + D, L + D, d + I, K - D], "L I M B");
      var T = v.graphics;
      var W = T.newPen(T.PenType.SOLID_COLOR, o, 1);
      T.foregroundColor = W;
      win.xui_ui_icon1 = win.add("image", [r + h - S, K, r + h, M + K], newImg);
      win.xui_ui_icon1.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon2 = win.add(
        "image",
        [r + d - S, K, r + d, M + K],
        dupeImg,
      );
      win.xui_ui_icon2.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon3 = win.add(
        "image",
        [r + h - S, J, r + h, J + M],
        copyImg,
      );
      win.xui_ui_icon3.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon4 = win.add(
        "image",
        [r + d - S, J, r + d, J + M],
        pasteImg,
      );
      win.xui_ui_icon4.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon5 = win.add(
        "image",
        [r + h - S, H, r + h, H + M],
        selectImg,
      );
      win.xui_ui_icon5.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon6 = win.add(
        "image",
        [r + d - S, H, r + d, H + M],
        renameImg,
      );
      win.xui_ui_icon6.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon14 = win.add(
        "image",
        [r + h - S, G, r + h, G + M],
        poseImg,
      );
      win.xui_ui_icon14.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon15 = win.add(
        "image",
        [r + d - S, G, r + d, G + M],
        path2boneImg,
      );
      win.xui_ui_icon15.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_button1 = win.add(
        "button",
        [r + h, K, r + h + I, K + M],
        "New",
      );
      win.xui_ui_button1.onClick = function () {
        app.beginUndoGroup("Make Limb");
        if (alted) {
          makeTheArm(false);
        } else {
          makeTheArm(true);
        }
        app.endUndoGroup();
      };
      win.xui_ui_button1.helpTip =
        "Make a new Limb. (ALT) to replace selected limb";
      win.xui_ui_button2 = win.add(
        "button",
        [r + d, K, r + d + I, K + M],
        "Duplicate",
      );
      win.xui_ui_button2.onClick = function () {
        app.beginUndoGroup("Duplicate Limb");
        dupeTheArm(true);
        app.endUndoGroup();
      };
      win.xui_ui_button2.helpTip =
        "Duplicate selected limb and it\'s controllers";
      win.xui_ui_button3 = win.add(
        "button",
        [r + h, J, r + h + I, J + M],
        "Copy",
      );
      win.xui_ui_button3.onClick = function () {
        app.beginUndoGroup("Copy Limb Layer");
        copyTheSettings();
        app.endUndoGroup();
      };
      win.xui_ui_button3.helpTip = "Copy selected limb";
      win.xui_ui_button4 = win.add(
        "button",
        [r + d, J, r + d + I, J + M],
        "Paste",
      );
      win.xui_ui_button4.onClick = function () {
        app.beginUndoGroup("Paste Limb Layer");
        pasteTheSettings();
        app.endUndoGroup();
      };
      win.xui_ui_button4.helpTip =
        "Paste to selected limb. (ALT) to retain style";
      win.xui_ui_button5 = win.add(
        "button",
        [r + h, H, r + h + I, H + M],
        "Select",
      );
      win.xui_ui_button5.onClick = function () {
        app.beginUndoGroup("Select Limb Layers");
        selectLimbs();
        app.endUndoGroup();
      };
      win.xui_ui_button5.helpTip =
        "Select all Limber layers related to currently selected layer";
      win.xui_ui_button6 = win.add(
        "button",
        [r + d, H, r + d + I, H + M],
        "Rename",
      );
      win.xui_ui_button6.onClick = function () {
        app.beginUndoGroup("Rename Limb Layers");
        renameLimbsPreflight();
        app.endUndoGroup();
      };
      win.xui_ui_button6.helpTip =
        "Rename all Limber layers related to currently selected layer";
      win.xui_ui_button14 = win.add(
        "button",
        [r + h, G, r + h + I, G + M],
        "Rig & Pose",
      );
      win.xui_ui_button14.onClick = function () {
        buildRiggingUI();
      };
      win.xui_ui_button14.helpTip =
        "Limb rigging options using selected layers";
      win.xui_ui_button15 = win.add(
        "button",
        [r + d, G, r + d + I, G + M],
        "Path to Bone",
      );
      win.xui_ui_button15.onClick = function () {
        app.beginUndoGroup("quickBone");
        quickBone();
        app.endUndoGroup();
      };
      win.xui_ui_button15.helpTip =
        "Make a new Bone limb from a Shape Layer with a 3 point Path";
      var u = win.add(
        "staticText",
        [r + D, E + D, d + I, B - D],
        "C O N T R O L L E R S",
      );
      T = u.graphics;
      W = T.newPen(T.PenType.SOLID_COLOR, P, 1);
      T.foregroundColor = W;
      win.xui_ui_icon7 = win.add(
        "image",
        [r + h - S, B, r + h, B + M],
        hideImg,
      );
      win.xui_ui_icon7.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon8 = win.add(
        "image",
        [r + d - S, B, r + d, B + M],
        sizeImg,
      );
      win.xui_ui_icon8.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon9 = win.add("image", [r + h - S, A, r + h, A + M], fkImg);
      win.xui_ui_icon9.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon10 = win.add(
        "image",
        [r + d - S, A, r + d, A + M],
        jointImg,
      );
      win.xui_ui_icon10.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon11 = win.add(
        "image",
        [r + h - S, z, r + h, z + M],
        matchFKtoIKImg,
      );
      win.xui_ui_icon11.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon12 = win.add(
        "image",
        [r + d - S, z, r + d, z + M],
        matchIKtoFKImg,
      );
      win.xui_ui_icon12.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_button7 = win.add(
        "button",
        [r + h, B, r + h + I, B + M],
        "Hide / Show",
      );
      win.xui_ui_button7.onClick = function () {
        app.beginUndoGroup("Hide controllers");
        if (shifted) {
          muteControlColors();
        } else {
          hideControllers();
        }
        app.endUndoGroup();
      };
      win.xui_ui_button7.helpTip =
        "Hide controllers of selected limb. (ALT) to show them. (SHIFT) to toggle color change";
      win.xui_ui_button8 = win.add(
        "button",
        [r + d, B, r + d + I, B + M],
        "+/- Size",
      );
      win.xui_ui_button8.onClick = function () {
        app.beginUndoGroup("Resize Controllers");
        resizeControllers();
        app.endUndoGroup();
      };
      win.xui_ui_button8.helpTip =
        "Increase controller size. (ALT) to decrease";
      win.xui_ui_button9 = win.add(
        "button",
        [r + h, A, r + h + I, A + M],
        "Add FK",
      );
      win.xui_ui_button9.onClick = function () {
        if (isTrial) {
          makeAlert(
            "Sorry, FK controllers are available in the non-trial version of Limber.",
          );
          return;
        }
        app.beginUndoGroup("Create FK Controller");
        createLocator("FK");
        app.endUndoGroup();
      };
      win.xui_ui_button9.helpTip =
        "Make a new FK controller for the selected limb. (ALT) to remove";
      win.xui_ui_button10 = win.add(
        "button",
        [r + d, A, r + d + I, A + M],
        "Add Joint",
      );
      win.xui_ui_button10.onClick = function () {
        if (isTrial) {
          makeAlert(
            "Sorry, joint controllers are available in the non-trial version of Limber.",
          );
          return;
        }
        app.beginUndoGroup("Create Joint Controller");
        createLocator("Knee");
        app.endUndoGroup();
      };
      win.xui_ui_button10.helpTip =
        "Make a new Joint controller for the selected limb. (ALT) to remove";
      win.xui_ui_button11 = win.add(
        "button",
        [r + h, z, r + h + I, z + M],
        "Match FK > IK",
      );
      win.xui_ui_button11.onClick = function () {
        app.beginUndoGroup("Match FK to IK");
        matchIk(true);
        app.endUndoGroup();
      };
      win.xui_ui_button11.helpTip = "Match FK Rotation values to IK Position";
      win.xui_ui_button12 = win.add(
        "button",
        [r + d, z, r + d + I, z + M],
        "Match IK > FK",
      );
      win.xui_ui_button12.onClick = function () {
        app.beginUndoGroup("Match IK to FK");
        matchIk(false);
        app.endUndoGroup();
      };
      win.xui_ui_button12.helpTip =
        "Match IK Controller Position value to FK Rotations";
      var u = win.add(
        "staticText",
        [r + D, y + D, d + I, n - D],
        "A D V A N C E D",
      );
      T = u.graphics;
      W = T.newPen(T.PenType.SOLID_COLOR, p, 1);
      T.foregroundColor = W;
      win.xui_ui_icon13 = win.add(
        "image",
        [r + h - S, n, r + h, n + M],
        helpImg,
      );
      win.xui_ui_icon13.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_icon16 = win.add(
        "image",
        [r + d - S, n, r + d, n + M],
        libraryImg,
      );
      win.xui_ui_icon16.onDraw = function () {
        reduceImage(this);
      };
      win.xui_ui_button13 = win.add(
        "button",
        [r + h, n, r + h + I, n + M],
        "Help",
      );
      win.xui_ui_button13.onClick = function () {
        makeHelpUI();
      };
      win.xui_ui_button13.helpTip = "Opens a panel with full instructions";
      win.xui_ui_button16 = win.add(
        "button",
        [r + d, n, r + d + I, n + M],
        "Import Library",
      );
      win.xui_ui_button16.onClick = function () {
        doLibrary();
      };
      win.addEventListener("mousedown", function (c) {
        if (c.altKey) {
          alted = true;
        } else {
          alted = false;
        }
        if (c.shiftKey) {
          shifted = true;
        } else {
          shifted = false;
        }
      });
      return win;
    }
    function isBetaExpired(b) {
      return new Date() > b;
    }
    function makeKnee(F, t) {
      function p(H) {
        var i = [
          "////// LIMBER " + scriptVer + " //////",
          "var limbLayers = {",
          'ankle: thisComp.layer("' + F.ankle + '"),',
          'hip: thisComp.layer("' + F.hip + '"),',
          'leg: thisComp.layer("' + F.leg + '")',
        ];
        if (H === "add") {
          i.push(', knee: thisComp.layer("' + G.name + '")');
        }
        if (y !== null) {
          i.push(', fkAnkle: thisComp.layer("' + F.fkAnkle + '")');
        }
        i.push("};value;");
        i = i.join("\n");
        if (H === "add") {
          x.expression = i;
        }
        m.expression = i;
        f.expression = i;
        j.expression = i;
        if (y !== null) {
          y.expression = i;
        }
      }
      function d(i) {
        if (i === "add") {
          x = G.property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale");
        }
        m = g.layer(F.ankle).property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale");
        f = g.layer(F.hip).property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale");
        j = g.layer(F.leg).property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale");
        if (Object.isValid(g.layer(F.fkAnkle))) {
          y = g.layer(F.fkAnkle).property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale");
        } else {
          y = null;
        }
      }
      var u = getStoredSetting("controllerColor");
      var b = getRGBfromHEX(u);
      b[3] = 0;
      var o = app.project.activeItem;
      if (!o || !(o instanceof CompItem)) {
        alert("Please select a composition first");
        return;
      }
      var g = o;
      if (Object.isValid(t.knee) && !alted) {
        makeAlert("This limb already has a Joint controller");
        return;
      } else {
        if (Object.isValid(t.knee) && alted) {
          d("remove");
          p("remove");
          t.knee.locked = false;
          t.knee.remove();
        } else {
          if (!Object.isValid(t.knee) && alted) {
            makeAlert("This limb does not have a Joint controller to delete");
            return;
          } else {
            g.openInViewer();
            var E = true;
            var s = new Window("dialog", "Please name your joint.");
            var n = s.add("group");
            n.add("statictext", undefined, "Name:");
            var B = n.add("edittext", undefined, limbJoint);
            var l = getBaseName(F.leg);
            F.knee = l + "-" + limbJoint;
            B.onChange = function () {
              limbJoint = B.text;
              F.knee = l + "-" + limbJoint;
            };
            B.characters = 20;
            B.active = true;
            var z = s.add("group");
            z.alignment = "right";
            var k = z.add("button", undefined, "OK");
            var v = z.add("button", undefined, "Cancel");
            v.onClick = function () {
              E = false;
              s.close();
            };
            s.show();
            if (!E) {
              return;
            }
            if (!layerNamesAreUnique([F.knee], g)) {
              makeAlert(
                "Naming conflict! Please use a unique name for your joint.",
              );
              return;
            }
            var D = o.selectedLayers;
            var G = g.layers.addShape();
            G.label = getEndLabelAndFill(t).label;
            G.name = F.knee;
            G.guideLayer = true;
            G.moveAfter(t.ankle);
            G.property("ADBE Root Vectors Group").addProperty(
              "ADBE Vector Group",
            );
            G.property("ADBE Root Vectors Group").property(1).name =
              "Controller";
            applyShapeToController(
              G,
              lmbraf.getSetting("userPrefs", "controllerShape"),
            );
            G.property("ADBE Root Vectors Group")
              .property(1)
              .property(3)
              .property("ADBE Vector Rotation")
              .setValue(180);
            G.property("ADBE Root Vectors Group").addProperty(
              "ADBE Vector Group",
            );
            G.property("ADBE Root Vectors Group").property(2).name = "Admin";
            G.property("ADBE Root Vectors Group")
              .property(2)
              .property(3)
              .property("ADBE Vector Scale")
              .setValue([100, 100]);
            G.applyPreset(kneePseudo);
            G.property("ADBE Effect Parade").property(1).name = "Limber Joint";
            G.property("ADBE Effect Parade")
              .property(1)
              .property("Pseudo/limber-joint-0001")
              .setValue(1);
            G.property("ADBE Transform Group")
              .property("ADBE Position")
              .setValue([0, 0, 0]);
            G.property("ADBE Transform Group")
              .property("ADBE Rotate Z")
              .setValue(0);
            var C = g.layer(F.ankle).property("ADBE Root Vectors Group")(
              "Controller",
            )("ADBE Vector Transform Group")("ADBE Vector Scale");
            var r = G.property("ADBE Root Vectors Group")("Controller")(
              "ADBE Vector Transform Group",
            )("ADBE Vector Scale");
            r.setValue(C.value);
            var q = G.property("ADBE Root Vectors Group")("Controller")
              .property(2)
              .property("ADBE Vector Graphic - Fill")
              .property("ADBE Vector Fill Color");
            q.setValue(getEndLabelAndFill(t).fill);
            try {
              G.property("ADBE Transform Group").property(
                "ADBE Position",
              ).expression =
                'thisComp.layer("' +
                F.ankle +
                '").content("Admin").content("p2blend").transform.position';
            } catch (h) {}
            try {
              G.property("ADBE Transform Group").property(
                "ADBE Rotate Z",
              ).expression =
                "// Limber Joint Rotation\nvar userRot = " +
                lmbraf.getSetting("userPrefs", "controllerUserRotation") +
                ';\nvar valueRot = userRot ? value : 0;\nvar endctrl = thisComp.layer("' +
                F.ankle +
                '");\nvar angles = endctrl.content("Admin").content("angles").transform.anchorPoint;\nvar cw = endctrl.effect("Limber")("Clockwise");\nvar joint = effect("Limber Joint")("Rotation");\nif (joint == 2) {((angles[0]+angles[1] +(cw > 0 ? 180 : -180))/2) + valueRot} // output\nelse if (joint == 3) {angles[1]-180 + valueRot} // output\nelse if (joint == 4) {angles[0]-180 + valueRot}\nelse {valueRot} // output';
            } catch (h) {}
            if (Object.isValid(g.layer(F.fkAnkle))) {
              c = g.layer(F.fkAnkle).property("ADBE Root Vectors Group")(
                "Admin",
              )("ADBE Vector Transform Group")("ADBE Vector Scale");
            } else {
              c = null;
            }
            d("add");
            p("add");
            G.selected = false;
            for (var A = 0; A < D.length; A += 1) {
              D[A].selected = true;
            }
          }
        }
      }
    }
    function makeTheArm(r) {
      var s = app.project.activeItem;
      var t = [
        [0.9803921568627451, 0.8588235294117647, 0.7411764705882353, 1],
        [0.8666666666666667, 0.7254901960784313, 0.5882352941176471, 1],
        [0.7450980392156863, 0.5607843137254902, 0.41568627450980394, 1],
        [0.6, 0.396078431372549, 0.2549019607843137, 1],
        [0.3607843137254902, 0.27058823529411763, 0.22745098039215686, 1],
      ];
      var p = Math.floor(Math.random() * t.length);
      var B = t[p];
      if (!s || !(s instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      lmbraf.saveSetting("limbNames", "limbType", limbType);
      lmbraf.saveSetting("limbNames", "limbEnd", limbEnd);
      lmbraf.saveSetting("limbNames", "limbStart", limbStart);
      lmbraf.saveSetting("limbNames", "limbJoint", limbJoint);
      var E = s.selectedLayers;
      var C = E.length;
      var d = [];
      if (r) {
        C = 1;
      } else {
        d = getLimbsInComp(s);
      }
      for (var a = 0; a < C; a += 1) {
        if (r && lmbraf.s()) {
          if (isTrial && getLimbsInComp(s).length >= 2) {
            makeAlert(
              "Sorry, only three limbs per comp with the trial version.",
            );
            return null;
          }
          var x = false;
          var y = true;
          var o = new Window("dialog", "Please name your limb.");
          var m = o.add("group");
          m.add("statictext", undefined, "Name:");
          var D = m.add("edittext", undefined, armName);
          D.onChange = function () {
            armName = D.text;
          };
          D.characters = 20;
          D.active = true;
          var v = o.add("group");
          v.alignment = "right";
          var q = v.add("button", undefined, "Cancel");
          var k = v.add("button", undefined, "OK");
          q.onClick = function () {
            y = false;
            o.hide();
          };
          o.show();
          if (!y) {
            return null;
          }
          c = {
            ankle: armName + "-" + limbEnd,
            fkAnkle: armName + "-FK " + limbEnd,
            hip: armName + "-" + limbStart,
            knee: armName + "-Knee",
            leg: armName + "-" + limbType,
          };
          if (!layerNamesAreUnique([c.ankle, c.hip, c.leg, c.fkAnkle], s)) {
            makeAlert(
              "Naming conflict. Please choose a unique name different from the layers in your composition.",
            );
            return null;
          }
        } else {
          if (!Object.isValid(E[a])) {
            continue;
          }
          j = E[a];
          b = getLimbLayers(j);
          F = b.leg.label;
          if (b === null) {
            continue;
          }
          if (!isInArray(d, b.leg)) {
            continue;
          } else {
            removeAr(d, b.leg);
          }
          if (limbVersion(b.leg) < 1.6) {
            makeAlert(limbVersionError(limbVersion(b.leg)));
            continue;
          }
          x = b.leg.locked;
          c = { ankle: b.ankle.name, hip: b.hip.name, leg: b.leg.name };
        }
        if (ccType === "Taper") {
          if (r) {
            LimberTaper(c, true);
          } else {
            LimberTaper(c, false);
          }
        } else {
          if (ccType === "Bone") {
            if (r) {
              bone(c, true);
            } else {
              bone(c, false);
            }
          } else {
            if (ccType === "legacyTaper") {
              if (r) {
                importLimb(c, legacyTaper, true);
              } else {
                importLimb(c, legacyTaper, false);
              }
            } else {
              if (ccType === "threeCircles") {
                if (r) {
                  importLimb(c, threeCircles, true);
                } else {
                  importLimb(c, threeCircles, false);
                }
              }
            }
          }
        }
        if (r) {
          s.layer(c.hip).moveToBeginning();
          G = [s.width / 2, s.height / 2 - 200, 0];
          s.layer(c.hip)
            .property("ADBE Transform Group")("ADBE Position")
            .setValue(G);
          s.layer(c.ankle).moveToBeginning();
          z = [s.width / 2, s.height / 2 + 200, 0];
          s.layer(c.ankle)
            .property("ADBE Transform Group")("ADBE Position")
            .setValue(z);
          s.layer(c.ankle)
            .property("ADBE Effect Parade")(1)("Pseudo/Limber_16-0021")
            .setValue(B);
          l = s.layer(c.ankle).property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale");
          f = s.layer(c.hip).property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale");
        }
        g = s.layer(c.leg).property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale");
        var u = [
          "////// LIMBER " + scriptVer + " //////",
          "var limbLayers = {",
          'ankle: thisComp.layer("' + c.ankle + '"),',
          'hip: thisComp.layer("' + c.hip + '"),',
          'leg: thisComp.layer("' + c.leg + '")',
          "};",
          "value;",
        ].join("\n");
        if (r) {
          g.expression = u;
          l.expression = u;
          f.expression = u;
          E = s.selectedLayers;
          for (var A = 0; A < E.length; A += 1) {
            E[A].selected = false;
          }
          s.layer(c.ankle).selected = true;
          return {
            ankle: s.layer(c.ankle),
            hip: s.layer(c.hip),
            leg: s.layer(c.leg),
          };
        } else {
          if (!r) {
            var h = app.project.activeItem.layer(1);
            var n = b.leg.property("ADBE Root Vectors Group")("Admin")(
              "ADBE Vector Transform Group",
            )("ADBE Vector Scale").expression;
            g.expression = n;
            h.startTime = b.leg.startTime;
            h.inPoint = b.leg.inPoint;
            h.outPoint = b.leg.outPoint;
            h.label = b.leg.label;
            h.parent = b.leg.parent;
            h.samplingQuality = b.leg.samplingQuality;
            h.shy = b.leg.shy;
            h.stretch = b.leg.stretch;
            h.solo = b.leg.solo;
            h.adjustmentLayer = b.leg.adjustmentLayer;
            h.blendingMode = b.leg.blendingMode;
            h.guideLayer = b.leg.guideLayer;
            h.moveAfter(b.leg);
            if (b.leg.locked) {
              b.leg.locked = false;
            }
            b.leg.remove();
            h.locked = x;
            E = s.selectedLayers;
            for (var A = 0; A < E.length; A += 1) {
              E[A].selected = false;
            }
            s.layer(c.ankle).selected = true;
            return h;
          }
        }
      }
    }
    function resizeControllers() {
      var f = app.project.activeItem;
      if (!f || !(f instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      var g = f.selectedLayers;
      var b = getLimbsInComp(g);
      for (var h = 0; h < b.length; h += 1) {
        var j = getLimbLayersForScript(b[h]);
        if (j === null) {
          makeAlert("Please select a layer associated to a limb.");
          return;
        }
        if (limbVersion(j.leg) < 1.6) {
          makeAlert(limbVersionError(limbVersion(j.leg)));
          return;
        }
        for (var i in j) {
          if (j.hasOwnProperty(i)) {
            var k = j[i];
            if (k !== null && i != "leg") {
              var d = k.property("ADBE Root Vectors Group")("Controller")(
                "ADBE Vector Transform Group",
              )("ADBE Vector Scale");
              var c = d.value;
              if (d.numKeys === 0) {
                if (alted) {
                  d.setValue(c * 0.75);
                } else {
                  d.setValue(c / 0.75);
                }
              }
            }
          }
        }
      }
    }
    function copyTheSettings() {
      var b = app.project.activeItem;
      if (!b || !(b instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      var j = b.selectedLayers;
      var g = j[0];
      var h = getLimbLayers(g);
      if (h === null) {
        makeAlert("Please select a layer associated to a limb.");
        return;
      }
      if (limbVersion(h.leg) < 1.6) {
        makeAlert(limbVersionError(limbVersion(h.leg)));
        return;
      }
      var f = h.ankle;
      if (isOrphan(g, h)) {
        limbCopy = g;
      } else {
        limbCopy = h.leg;
      }
      limbMatchNames = [];
      limbMatchNames = [
        "0002",
        "0003",
        "0004",
        "0005",
        "0006",
        "0007",
        "0008",
        "0011",
        "0012",
        "0015",
        "0016",
        "0017",
        "0018",
        "0019",
        "0020",
        "0021",
      ];
      c = limbMatchNames.length;
      limbValues = [];
      for (var d = 0; d < c; d += 1) {
        limbValues.push(
          f.property("ADBE Effect Parade")(1)(
            "Pseudo/Limber_16-" + limbMatchNames[d],
          ).value,
        );
      }
    }
    function pasteTheSettings() {
      var p = app.project.activeItem;
      var f = [];
      if (!p || !(p instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      if (limbMatchNames.length === 0) {
        makeAlert("Please select a limb element to copy its settings first.");
        return;
      }
      var u = p.selectedLayers;
      f = getLimbsInComp(u);
      for (var m = 0; m < f.length; m += 1) {
        var z = f[m];
        var c = getLimbLayersForScript(z);
        var t = z.locked;
        if (u.length === 1 && isOrphan(u[0], c)) {
          if (isLeg(u[0])) {
            c.leg = u[0];
          }
        }
        if (c === null) {
          continue;
        }
        if (Object.isValid(limbCopy)) {
          if (limbVersion(limbCopy) !== limbVersion(c.leg)) {
            makeAlert(limbVersionError(limbVersion(c.leg)));
            return;
          }
        }
        var b = c.ankle;
        d = limbMatchNames.length;
        if (!alted) {
          for (var v = 0; v < d; v += 1) {
            setProp(
              b.property("ADBE Effect Parade")(1)(
                "Pseudo/Limber_16-" + limbMatchNames[v],
              ),
              limbValues[v],
            );
          }
        }
        if (isTrial) {
          return;
        }
        if (Object.isValid(limbCopy) && lmbraf.s()) {
          if (limbCopy.containingComp === p) {
            A = limbCopy.duplicate();
          } else {
            var x = p.selectedLayers;
            l = x.length;
            if (l > 0) {
              for (var q = 0; q < l; q += 1) {
                x[q].selected = false;
              }
            }
            toggleExpressions(limbCopy, "off");
            h = { locked: limbCopy.locked, parent: limbCopy.parent };
            limbCopy.locked = false;
            limbCopy.parent = null;
            if (m === 0) {
              j = limbCopy.duplicate();
              g = collectAndExtractEffects(j);
            }
            j.copyToComp(p);
            A = p.layer(1);
            applyEffects(A, g);
          }
          A.locked = false;
          A.moveBefore(c.leg);
          A.name = c.leg.name;
          var s = c.leg.property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale").expression;
          A.property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale").expression = s;
          var y = getLimbLayers(limbCopy);
          var n = [y.ankle.name, y.hip.name, y.leg.name];
          var k = [c.ankle.name, c.hip.name, c.leg.name];
          replaceExpressionText(A, n, k);
          if (c.leg.locked) {
            c.leg.locked = false;
          }
          A.startTime = c.leg.startTime;
          A.inPoint = c.leg.inPoint;
          A.outPoint = c.leg.outPoint;
          A.label = c.leg.label;
          A.parent = c.leg.parent;
          A.samplingQuality = c.leg.samplingQuality;
          A.shy = c.leg.shy;
          A.stretch = c.leg.stretch;
          if (y.leg.enabled === true) {
            A.solo = c.leg.solo;
          }
          A.adjustmentLayer = c.leg.adjustmentLayer;
          A.blendingMode = c.leg.blendingMode;
          A.guideLayer = c.leg.guideLayer;
          A.motionBlur = c.leg.motionBlur;
          A.preserveTransparency = c.leg.preserveTransparency;
          A.threeDLayer = c.leg.threeDLayer;
          A.enabled = true;
          A.locked = t;
          x = p.selectedLayers;
          for (var v = 0; v < x.length; v += 1) {
            x[v].selected = false;
          }
          p.layer(c.ankle.name).selected = true;
          if (limbCopy.containingComp !== p) {
            toggleExpressions(limbCopy, "on");
            if (m === f.length - 1) {
              j.remove();
            }
          }
          c.leg.remove();
        } else {
          makeAlert(
            "Your copied limb is no longer available to copy to your new limb. Make sure you haven\'t deleted it or changed projects.",
          );
          return;
        }
      }
    }
    function makeAlert(f) {
      var c = new Window("dialog", "Limber");
      var b = c.add("group");
      b.add("statictext", undefined, f);
      var d = c.add("group");
      var g = d.add("button", undefined, "OK");
      c.show();
    }
    function makePrompt(k, d, f) {
      var g = d;
      f[0] = g;
      var j = new Window("dialog", k);
      var l = j.add("group");
      l.add("statictext", undefined, "Name:");
      var b = l.add("edittext", undefined, g);
      b.onChange = function () {
        g = b.text;
        f[0] = g;
      };
      b.characters = 20;
      b.active = true;
      var c = j.add("group");
      c.alignment = "right";
      var h = c.add("button", undefined, "Cancel");
      var i = c.add("button", undefined, "OK");
      h.onClick = function () {
        g = null;
        f[0] = g;
        j.close();
      };
      j.show();
    }
    function hasEffect(d, f) {
      if (!(d instanceof CameraLayer) && !(d instanceof LightLayer)) {
        var c = d("ADBE Effect Parade");
        for (var b = 1; b <= c.numProperties; b += 1) {
          if (c.property(b).name == f) {
            return true;
          }
        }
        return false;
      } else {
        return false;
      }
    }
    function setProp(b, c) {
      if (b.numKeys > 0) {
        b.setValueAtTime(app.project.activeItem.time, c);
      } else {
        b.setValue(c);
      }
    }
    function hasKeyHere(c) {
      if (c.numKeys > 0) {
        var d = app.project.activeItem.time;
        var b = c.nearestKeyIndex(d);
        if (c.keyTime(b) === d) {
          return b;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    }
    function dupeTheArm(o) {
      var n = app.project.activeItem;
      if (!n || !(n instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      if (!(n.selectedLayers.length > 0)) {
        makeAlert("Please select a layer to duplicate your arm");
        return;
      }
      if (isTrial && getLimbsInComp(n).length >= 2) {
        makeAlert("Sorry, only three limbs per comp with the trial version.");
        return;
      }
      var k = getLimbsInComp(n.selectedLayers);
      l = k.length;
      for (var m = 0; m < l; m += 1) {
        function d(i, y, z) {
          if (i.indexOf("-") == -1) {
            return y + "-" + z;
          } else {
            var p = i.split("-");
            var A = p[p.length - 1];
            return y + "-" + A;
          }
        }
        f = k[m];
        c = getLimbLayersForScript(f);
        if (c === null) {
          makeAlert("Please select a layer associated to a limb.");
          return;
        }
        if (limbVersion(c.leg) < 1.6) {
          makeAlert(limbVersionError(limbVersion(c.leg)));
          continue;
        }
        b = [];
        x = getBaseName(f.name);
        makePrompt("Type a new unique limb name.", x, b);
        g = b[0];
        if (g !== null && lmbraf.s()) {
          h = [
            d(c.leg.name, g, limbType),
            d(c.hip.name, g, limbStart),
            d(c.ankle.name, g, limbEnd),
          ];
          if (Object.isValid(c.fkAnkle)) {
            h.push(d(c.fkAnkle.name, g, limbEnd + "FK"));
          }
          if (Object.isValid(c.knee)) {
            h.push(d(c.knee.name, g, myJointName));
          }
          if (!layerNamesAreUnique(h, n)) {
            makeAlert(
              "Naming conflict! Please use a unique name for your limb.",
            );
            return;
          }
          t = c.leg.duplicate();
          if (o) {
            v = c.ankle.duplicate();
            dupeHip = c.hip.duplicate();
            if (Object.isValid(c.fkAnkle)) {
              u = c.fkAnkle.duplicate();
            } else {
              u = null;
            }
            if (Object.isValid(c.knee)) {
              r = c.knee.duplicate();
            } else {
              r = null;
            }
          }
          t.locked = false;
          t.moveToBeginning();
          if (o) {
            if (u !== null) {
              u.locked = false;
              u.moveToBeginning();
            }
            if (r !== null) {
              r.locked = false;
              r.moveToBeginning();
            }
            dupeHip.locked = false;
            v.locked = false;
            dupeHip.moveToBeginning();
            v.moveToBeginning();
          }
          t.name = d(c.leg.name, g, limbType);
          dupeHip.name = d(c.hip.name, g, limbStart);
          v.name = d(c.ankle.name, g, limbEnd);
          if (u !== null) {
            u.name = d(c.fkAnkle.name, g, limbEnd + "FK");
          }
          if (r !== null) {
            r.name = d(c.knee.name, g, myJointName);
          }
          q = [c.ankle.name, c.hip.name, c.leg.name];
          j = [v.name, dupeHip.name, t.name];
          if (u !== null) {
            q.push(c.fkAnkle.name);
            j.push(u.name);
          }
          if (r !== null) {
            q.push(c.knee.name);
            j.push(r.name);
          }
          if (o) {
            replaceExpressionText(t, q, j);
            replaceExpressionText(dupeHip, q, j);
            replaceExpressionText(v, q, j);
            if (u !== null) {
              replaceExpressionText(u, q, j);
            }
            if (r !== null) {
              replaceExpressionText(r, q, j);
            }
          }
          app.project.autoFixExpressions(j[2], t.name);
          app.project.autoFixExpressions(j[1], dupeHip.name);
          app.project.autoFixExpressions(j[0], v.name);
          sl = n.selectedLayers;
          for (var s = 0; s < sl.length; s += 1) {
            sl[s].selected = false;
          }
          n.layer(v.name).selected = true;
        }
      }
    }
    function getLimbsInComp(d) {
      var b = [];
      if (d instanceof Array) {
        var g = d.length;
        for (var f = 0; f < g; f += 1) {
          c = getLimbLayersForScript(d[f]);
          if (c != null && !isInArray(b, c.leg)) {
            b.push(c.leg);
          }
        }
      } else {
        for (var f = 1; f < d.numLayers; f += 1) {
          c = getLimbLayersForScript(d.layer(f));
          if (c != null && !isInArray(b, c.leg)) {
            b.push(c.leg);
          }
        }
      }
      return b;
    }
    function isInArray(d, c) {
      var g = false;
      h = d.length;
      for (var f = 0; f < h; f += 1) {
        b = d[f];
        if (c == b) {
          g = true;
          break;
        }
      }
      return g;
    }
    function hideControllers() {
      function c(h) {
        var j = getLimbLayersForScript(h);
        if (j != null) {
          i = j.ankle.property("ADBE Transform Group")("ADBE Opacity");
          m = j.hip.property("ADBE Transform Group")("ADBE Opacity");
          if (limbVersion(j.leg) < 1.6) {
            makeAlert(limbVersionError(limbVersion(j.leg)));
            return;
          }
          try {
            n = j.fkAnkle.property("ADBE Transform Group")("ADBE Opacity");
          } catch (k) {
            n = null;
          }
          try {
            l = j.knee.property("ADBE Transform Group")("ADBE Opacity");
          } catch (k) {
            l = null;
          }
          if (!alted) {
            if (i.numKeys < 1) {
              i.setValue(0);
            }
            if (m.numKeys < 1) {
              m.setValue(0);
            }
            if (n !== null && n.numKeys < 1) {
              n.setValue(0);
            }
            if (l !== null && l.numKeys < 1) {
              l.setValue(0);
            }
          } else {
            if (i.numKeys < 1) {
              i.setValue(100);
            }
            if (m.numKeys < 1) {
              m.setValue(100);
            }
            if (n !== null && n.numKeys < 1) {
              n.setValue(100);
            }
            if (l !== null && l.numKeys < 1) {
              l.setValue(100);
            }
          }
        }
      }
      var b = app.project.activeItem;
      if (!b || !(b instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      var g = b.selectedLayers;
      if (g.length > 0) {
        f = g.length;
        for (var d = 0; d < f; d += 1) {
          c(g[d]);
        }
      } else {
        f = b.numLayers;
        for (var d = 1; d <= f; d += 1) {
          c(b.layer(d));
        }
      }
    }
    function muteControlColors() {
      function g(k) {
        function i(o) {
          if (o.expression.indexOf("value;/*") === -1) {
            var n = ["value;/*", o.expression, "*/"].join("\n");
            o.expression = n;
          } else {
            o.expression = o.expression
              .replace("value;/*\n", "")
              .replace("\n*/", "");
          }
        }
        var j = getLimbLayersForScript(k);
        var l = j.ankle.property("ADBE Root Vectors Group")(1)(
          "ADBE Vectors Group",
        )("ADBE Vector Graphic - Fill")("ADBE Vector Fill Color");
        var m = j.hip.property("ADBE Root Vectors Group")(1)(
          "ADBE Vectors Group",
        )("ADBE Vector Graphic - Fill")("ADBE Vector Fill Color");
        i(l);
        i(m);
      }
      var b = app.project.activeItem;
      if (!b || !(b instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      var h = b.selectedLayers;
      if (h.length > 0) {
        c = getLimbsInComp(h);
        f = c.length;
        for (var d = 0; d < f; d += 1) {
          if (limbVersion(c[d]) >= 1.6) {
            g(c[d]);
          }
        }
      } else {
        c = getLimbsInComp(b);
        f = c.length;
        for (var d = 0; d < f; d += 1) {
          if (limbVersion(c[d]) >= 1.6) {
            g(c[d]);
          }
        }
      }
    }
    function createLocator(h) {
      var b = app.project.activeItem;
      if (!b || !(b instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      if (!(b.selectedLayers.length > 0)) {
        if (h === "FK") {
          makeAlert("Please select a layer to create an FK controller.");
        } else {
          makeAlert("Please select a layer to create an joint controller.");
        }
        return;
      }
      var j = getLimbsInComp(b.selectedLayers);
      d = j.length;
      for (var g = 0; g < d; g += 1) {
        var i = j[g];
        var f = getLimbLayersForScript(i);
        if (f === null) {
          makeAlert("Please select a layer associated to a limb.");
          return;
        }
        if (limbVersion(f.leg) < 1.6) {
          makeAlert(limbVersionError(limbVersion(f.leg)));
          continue;
        }
        var c = {
          ankle: f.ankle.name,
          fkAnkle: f.ankle.name + "FK",
          hip: f.hip.name,
          leg: f.leg.name,
        };
        if (h === "FK") {
          var c = {};
          c.ankle = f.ankle.name;
          c.hip = f.hip.name;
          c.fkAnkle = f.ankle.name + "FK";
          c.leg = f.leg.name;
          if (isValid(f.knee)) {
            c.knee = f.knee.name;
          }
          makeFKsimple(c, f);
        } else {
          if (h === "Knee") {
            var c = {};
            c.ankle = f.ankle.name;
            c.hip = f.hip.name;
            if (isValid(f.fkAnkle)) {
              c.fkAnkle = f.fkAnkle.name;
            }
            c.leg = f.leg.name;
            c.knee = armName;
            makeKnee(c, f);
          }
        }
      }
    }
    function isOrphan(c, b) {
      if (b.hasOwnProperty("ankle") && b.ankle === c) {
        return false;
      }
      if (b.hasOwnProperty("hip") && b.hip === c) {
        return false;
      }
      if (b.hasOwnProperty("leg") && b.leg === c) {
        return false;
      }
      if (b.hasOwnProperty("fkAnkle") && b.fkAnkle === c) {
        return false;
      }
      if (b.hasOwnProperty("knee") && b.knee === c) {
        return false;
      }
      return true;
    }
    function isLeg(b) {
      var d = b.property("ADBE Root Vectors Group")("Admin")(
        "ADBE Vector Transform Group",
      )("ADBE Vector Scale");
      if (!d) {
        return false;
      }
      if (d.expression.indexOf("LIMBER") === -1) {
        return false;
      }
      var c = b.property("ADBE Root Vectors Group")("Limb");
      if (c) {
        return true;
      }
    }
    function getLimbLayers(thisLayer) {
      try {
        var thisComp = thisLayer.containingComp;
        var dummyPropExp = thisLayer.property("ADBE Root Vectors Group")(
          "Admin",
        )("ADBE Vector Transform Group")("ADBE Vector Scale").expression;
      } catch (err) {
        return null;
      }
      dummyPropExp = dummyPropExp.replace("value;", "");
      eval(dummyPropExp);
      return limbLayers;
    }
    function getBaseName(c) {
      if (c.indexOf("-") !== -1) {
        var b = c.split("-");
        b.pop();
        b = b.join("-");
        return b;
      } else {
        return c;
      }
    }
    function selectLimbs() {
      var b = app.project.activeItem;
      if (!b || !(b instanceof CompItem)) {
        makeAlert("no active comp.");
        return;
      }
      var f = b.selectedLayers;
      for (var c = 0; c < f.length; c += 1) {
        var d = getLimbLayersForScript(f[c]);
        if (d) {
          d.leg.locked = false;
          d.leg.selected = true;
          d.ankle.locked = false;
          d.ankle.selected = true;
          d.hip.locked = false;
          d.hip.selected = true;
          if (d.knee) {
            d.knee.locked = false;
            d.knee.selected = true;
          }
          if (d.fkAnkle) {
            d.fkAnkle.locked = false;
            d.fkAnkle.selected = true;
          }
        }
      }
    }
    function getLimbLayersForScript(thisLayer) {
      try {
        var thisComp = thisLayer.containingComp;
        dummyPropExp = thisLayer.property("ADBE Root Vectors Group")("Admin")(
          "ADBE Vector Transform Group",
        )("ADBE Vector Scale").expression;
      } catch (err) {
        return null;
      }
      if (thisLayer.containingComp === app.project.activeItem) {
        compStr = "app.project.activeItem";
      } else {
        compStr = "app.project.itemByID(" + thisLayer.containingComp.id + ")";
      }
      dummyPropExp = dummyPropExp.replace("value;", "");
      dummyPropExp = dummyPropExp.replace(/thisComp/g, compStr);
      eval(dummyPropExp);
      if (typeof limbLayers !== "undefined") {
        return limbLayers;
      } else {
        return null;
      }
    }
    function replaceExpressionText(h, m, g) {
      function i(o, r) {
        for (var p = 1; p <= o.numProperties; p += 1) {
          if (
            o.property(p).propertyType == PropertyType.INDEXED_GROUP ||
            o.property(p).propertyType == PropertyType.NAMED_GROUP
          ) {
            i(o.property(p), r);
          } else {
            if (
              o.property(p) instanceof Property &&
              o.property(p).canSetExpression
            ) {
              var n = o.property(p).expression;
              try {
                if (
                  o.property(p).propertyValueType === PropertyValueType.SHAPE
                ) {
                  r.push(o.property(p));
                } else {
                  for (var t = 0; t < m.length; t += 1) {
                    var q = new RegExp('"' + m[t] + '"', "g");
                    n = n.replace(q, '"' + g[t] + '"');
                  }
                  o.property(p).expression = n;
                }
              } catch (s) {}
            }
          }
        }
      }
      var f = [];
      i(h, f);
      b = f.length;
      for (var k = 0; k < b; k += 1) {
        d = f[k].expression;
        for (var j = 0; j < m.length; j += 1) {
          var l = new RegExp('"' + m[j] + '"', "g");
          d = d.replace(l, '"' + g[j] + '"');
        }
        f[k].expression = d;
      }
    }
    function layerNamesAreUnique(c, b) {
      for (var g = 0; g < c.length; g += 1) {
        for (var f = 1; f <= b.numLayers; f += 1) {
          if (b.layer(f).name == c[g]) {
            return false;
          }
        }
      }
      return true;
    }
    function isEmpty(b) {
      for (var c in b) {
        if (b.hasOwnProperty(c)) {
          return false;
        }
      }
      return JSON.stringify(b) === JSON.stringify({});
    }
    function toggleExpressions(g, b) {
      function h(j, l) {
        for (var k = 1; k <= j.numProperties; k += 1) {
          if (
            j.property(k).propertyType == PropertyType.INDEXED_GROUP ||
            j.property(k).propertyType == PropertyType.NAMED_GROUP
          ) {
            h(j.property(k), l);
          } else {
            if (
              b === "off" &&
              j.property(k) instanceof Property &&
              (j.property(k).expressionEnabled || j.property(k).expressionError)
            ) {
              j.property(k).expressionEnabled = false;
            } else {
              if (
                b === "on" &&
                j.property(k) instanceof Property &&
                j.property(k).canSetExpression &&
                (!j.property(k).expressionEnabled ||
                  j.property(k).expressionError)
              ) {
                try {
                  if (
                    j.property(k).propertyValueType == PropertyValueType.SHAPE
                  ) {
                    c.push(j.property(k));
                  } else {
                    j.property(k).expressionEnabled = true;
                  }
                } catch (m) {}
              }
            }
          }
        }
      }
      var c = [];
      h(g, c);
      f = c.length;
      for (var d = 0; d < f; d += 1) {
        c[d].expressionEnabled = true;
      }
    }
    function removeAr(b, c) {
      for (var d = 0; d < b.length; d += 1) {
        if (b[d] === c) {
          b.splice(d, 1);
          break;
        }
      }
    }
    function getUserDataFolder() {
      var d = Folder.userData;
      var b = Folder(d.toString() + "/Aescripts/Limber/1.7");
      if (!b.exists) {
        var c = b.create();
        if (!c) {
          makeAlert(
            "Error creating " +
              c.fsName +
              "\nPlease check the permissions for this folder:\n" +
              d +
              "\n\nA temp folder will be used instead",
          );
          b = Folder.temp;
        }
      }
      return b.toString();
    }
    function createResourceFile(d, c, b) {
      var f = new File(b + "/" + d);
      if (!File(f).exists) {
        if (!isSecurityPrefSet()) {
          makeAlert(
            'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
          );
          try {
            app.executeCommand(2359);
          } catch (g) {
            alert(g);
          }
          if (!isSecurityPrefSet()) {
            return null;
          }
        }
        f.encoding = "BINARY";
        f.open("w");
        f.write(c);
        f.close();
      }
      return f;
    }
    function isSecurityPrefSet() {
      var b = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return b == 1;
    }
    function makeBasicShape(c) {
      var b = [
        [100, -100],
        [100, 100],
        [-100, 100],
        [-100, -100],
      ];
      var f = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];
      var g = [
        [0, 0],
        [0, 0],
        [0, 0],
        [0, 0],
      ];
      var d = true;
      createStaticShape(c, b, f, g, d);
    }
    function createStaticShape(g, h, f, d, b) {
      var c = g.value;
      c.vertices = h;
      c.inTangents = f;
      c.outTangents = d;
      c.closed = b;
      g.setValue(c);
    }
    function limbVersion(b) {
      if (
        Object.isValid(
          b.property("ADBE Root Vectors Group")("Admin")("ADBE Vectors Group")(
            "LL",
          ),
        )
      ) {
        return 1;
      } else {
        var i = getLimbLayersForScript(b).ankle;
        if (
          Object.isValid(
            i("ADBE Root Vectors Group")("Admin")("ADBE Vectors Group")(
              "angles",
            ),
          )
        ) {
          var h = i.property("ADBE Root Vectors Group")("Admin")(
            "ADBE Vector Transform Group",
          )("ADBE Vector Scale").expression;
          var f = h.split("\n");
          var g = f[0];
          if (g.indexOf("LIMBER") === -1) {
            return null;
          }
          var d = new RegExp(/[1-9]\d*(\.\d+)/g);
          var c = g.match(d);
          return parseFloat(c);
        }
      }
      return 1;
    }
    function importLibrary() {
      writeLn("Importing Library");
    }
    function poseLimb() {
      writeLn("Posing Limb");
    }
    function copyArt() {
      writeLn("copying art");
    }
    function getEndLabelAndFill(d) {
      var c = d.ankle;
      var b = c.label;
      var f = c.property("ADBE Root Vectors Group")("Controller")(
        "ADBE Vectors Group",
      )("ADBE Vector Graphic - Fill")("ADBE Vector Fill Color").value;
      return { fill: f, label: b };
    }
    function renameLimbsPreflight() {
      var h = app.project.activeItem;
      if (!h || !(h instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      var f = h.selectedLayers;
      if (!f || f.length === 0) {
        makeAlert("Please select a limb layer or controller.");
        return;
      }
      var i = h.selectedLayers[0];
      var m = getLimbLayersForScript(i);
      if (m === null) {
        makeAlert("Please select a limb layer");
        return;
      }
      if (alted) {
        var g = m.leg.name.split("-")[0];
        var k = new Window("dialog", "Please change your limb name.");
        var n = k.add("group");
        n.add("statictext", undefined, "Name:");
        var d = n.add("edittext", undefined, g);
        d.characters = 20;
        d.active = true;
        var c = k.add("group");
        c.alignment = "right";
        var j = c.add("button", undefined, "Cancel");
        var l = c.add("button", undefined, "OK");
        l.onClick = function () {
          b = d.text;
          renameLimbs(true, b);
          k.close();
        };
        j.onClick = function () {
          k.close();
          return;
        };
        k.show();
      } else {
        renameLimbs(false);
      }
    }
    function renameLimbs(b, c) {
      function h(r, p) {
        var s = r.locked;
        if (s) {
          r.locked = false;
        }
        var q = r.name;
        r.name = p;
        app.project.autoFixExpressions(q, p);
        if (s) {
          r.locked = true;
        }
      }
      function n(p, q) {
        var r = 1;
        if (alted) {
          r = 0;
        }
        var s = p.name.split("-");
        if (s.length > 1) {
          s[r] = q;
        } else {
          s.push(q);
        }
        var t = s.join("-");
        return t;
      }
      var k = app.project.activeItem;
      if (!k || !(k instanceof CompItem)) {
        makeAlert("Please select a composition first");
        return;
      }
      var f = k.selectedLayers;
      if (!f || f.length === 0) {
        makeAlert("Please select a limb layer or controller.");
        return;
      }
      var l = k.selectedLayers[0];
      var m = getLimbLayersForScript(l);
      if (m === null) {
        makeAlert("Please select a limb layer");
        return;
      }
      var o = null;
      var d = null;
      var g = null;
      if (b) {
        o = n(m.hip, c);
        d = n(m.leg, c);
        g = n(m.ankle, c);
      } else {
        o = n(m.hip, limbStart);
        d = n(m.leg, limbType);
        g = n(m.ankle, limbEnd);
      }
      var j = null;
      var i = null;
      if (m.fkAnkle) {
        if (b) {
          j = n(m.ankle, c) + "FK";
        } else {
          j = n(m.ankle, limbEnd) + "FK";
        }
      }
      if (m.knee) {
        if (b) {
          i = n(m.knee, c);
        } else {
          i = n(m.knee, limbJoint);
        }
      }
      if (!layerNamesAreUnique([o, d, g], k)) {
        makeAlert(
          "Naming conflict. Please choose a different naming schema from your dropdown list.",
        );
        return;
      }
      h(m.hip, o);
      h(m.leg, d);
      h(m.ankle, g);
      if (j) {
        h(m.fkAnkle, j);
      }
      if (i) {
        h(m.knee, i);
      }
    }
    function limbVersionError(b) {
      return (
        "This limb was made with version " +
        b +
        " of Limber. Please use an earlier version of Limber to work with this limb."
      );
    }
    var ccType = "Taper";
    var aeVersion = Math.floor(parseFloat(app.version));
    var jointName = "Joint";
    if (lmbraf.haveSetting("limbNames", "limbJoint")) {
      jointName = lmbraf.getSetting("limbNames", "limbJoint");
    }
    var isTrial = lmbraf.t();
    var alted = false;
    var shifted = false;
    if (lmbraf.haveSetting("limbNames", "limbType")) {
      limbType = lmbraf.getSetting("limbNames", "limbType");
      limbEnd = lmbraf.getSetting("limbNames", "limbEnd");
      limbStart = lmbraf.getSetting("limbNames", "limbStart");
      if (lmbraf.haveSetting("limbNames", "limbJoint")) {
        limbJoint = lmbraf.getSetting("limbNames", "limbJoint");
      } else {
        limbJoint = "Joint";
      }
    } else {
      limbType = "Leg";
      limbEnd = "Ankle";
      limbStart = "Hip";
      limbJoint = "Knee";
    }
    var cSizes = [30, 60, 100, 150, 200];
    var legacyTaper = {
      effects: {
        matchName: "ADBE Effect Parade",
        properties: [],
        type: "INDEXED_GROUP",
      },
      shapes: {
        matchName: "ADBE Root Vectors Group",
        properties: [
          {
            enabled: true,
            matchName: "ADBE Vector Group",
            name: "Limb",
            properties: [
              {
                enabled: true,
                matchName: "ADBE Vectors Group",
                name: "Contents",
                properties: [
                  {
                    enabled: true,
                    matchName: "ADBE Vector Group",
                    name: "Upper Group",
                    properties: [
                      {
                        enabled: true,
                        matchName: "ADBE Vectors Group",
                        name: "Contents",
                        properties: [
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "Proximal Upper",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Wedge Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Group",
                                            name: "Wedge Path",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \nvar s3=endctrl.content("Admin").content("sides").transform.position[1]; \nvar c2=thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0]/2; \nvar c1=thisProperty.propertyGroup(4)("C1 Group")("Contents")("C1").size[0]/2; \ntry{var A=Math.acos(clamp((c1-c2)/s3,-1,1)); \nvar r3a = [-(c2*Math.sin(A)), -(s3+c2*Math.cos(A))]; \nvar r3b = [-(c1*Math.sin(A)), -(c1*Math.cos(A))];} catch(err) {value;}\ncreatePath(points = [ [0-r3a[0], r3a[1]], r3a, r3b, [0-r3b[0], r3b[1]] ], [[0,0], [0,0], [0,0], [0,0]], [[0,0], [0,0], [0,0], [0,0]], true);',
                                                matchName: "ADBE Vector Shape",
                                                name: "Path",
                                                type: "PROPERTY",
                                                value:
                                                  '{"closed":true,"featherInterps":[\n\n],"featherRadii":[\n\n],"featherRelCornerAngles":[\n\n],"featherRelSegLocs":[\n\n],"featherSegLocs":[\n\n],"featherTensions":[\n\n],"featherTypes":[\n\n],"inTangents":[[0,0],[0,0],[0,0],[0,0]],"outTangents":[[0,0],[0,0],[0,0],[0,0]],"vertices":[[34.9014282226562,-202.625],[-34.9014282226562,-202.625],[-49.8591766357422,-3.75],[49.8591766357422,-3.75]]}',
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C1 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C1",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p1").transform.scale;',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[100,100]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C2 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C2",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p2blend").transform.scale;',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[70,70]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl = thisComp.layer("{{ end }}");\n[0,-endctrl.content("Admin").content("sides").transform.position[1]];',
                                            matchName: "ADBE Vector Position",
                                            name: "Position",
                                            type: "PROPERTY",
                                            value: "[0,-200]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Add",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "2",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Crop Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Rect",
                                            name: "Crop Rectangle",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl = thisComp.layer("{{ end }}");\n[Math.max(thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0],thisProperty.propertyGroup(4)("C1 Group")("Contents")("C1").size[0]), (endctrl.content("Admin").content("sides").transform.position[1])*(endctrl.effect("Limber")("Upper Split")/100)+endctrl.content("Admin").content("p1").transform.scale[0]/2];',
                                                matchName:
                                                  "ADBE Vector Rect Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[100,250]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl  = thisComp.layer("{{ end }}"); \n[0,thisProperty.propertyGroup(2)("ADBE Vectors Group")("ADBE Vector Shape - Rect")("ADBE Vector Rect Size")[1]/2 - endctrl.content("Admin").content("p1").transform.scale[0]/2];',
                                            matchName: "ADBE Vector Anchor",
                                            name: "Anchor Point",
                                            type: "PROPERTY",
                                            value: "[0,75]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Intersect",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "4",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}"); endctrl.effect("Limber")("Upper Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.17647058823529,0.54901960784314,0.92156862745098,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "Distal Upper",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Wedge Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Group",
                                            name: "Wedge Path",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \nvar s3=endctrl.content("Admin").content("sides").transform.position[1]; \nvar c2=thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0]/2; \nvar c1=thisProperty.propertyGroup(4)("C1 Group")("Contents")("C1").size[0]/2; \ntry{var A=Math.acos(clamp((c1-c2)/s3,-1,1)); \nvar r3a = [-(c2*Math.sin(A)), -(s3+c2*Math.cos(A))]; \nvar r3b = [-(c1*Math.sin(A)), -(c1*Math.cos(A))];} catch(err) {value;}\ncreatePath(points = [ [0-r3a[0], r3a[1]], r3a, r3b, [0-r3b[0], r3b[1]] ], [[0,0], [0,0], [0,0], [0,0]], [[0,0], [0,0], [0,0], [0,0]], true);',
                                                matchName: "ADBE Vector Shape",
                                                name: "Path",
                                                type: "PROPERTY",
                                                value:
                                                  '{"closed":true,"featherInterps":[\n\n],"featherRadii":[\n\n],"featherRelCornerAngles":[\n\n],"featherRelSegLocs":[\n\n],"featherSegLocs":[\n\n],"featherTensions":[\n\n],"featherTypes":[\n\n],"inTangents":[[0,0],[0,0],[0,0],[0,0]],"outTangents":[[0,0],[0,0],[0,0],[0,0]],"vertices":[[34.9014282226562,-202.625],[-34.9014282226562,-202.625],[-49.8591766357422,-3.75],[49.8591766357422,-3.75]]}',
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C1 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C1",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p1").transform.scale;',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[100,100]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C2 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C2",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p2blend").transform.scale;',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[70,70]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl = thisComp.layer("{{ end }}");\n[0,-endctrl.content("Admin").content("sides").transform.position[1]];',
                                            matchName: "ADBE Vector Position",
                                            name: "Position",
                                            type: "PROPERTY",
                                            value: "[0,-200]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Add",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "2",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Crop Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Rect",
                                            name: "Crop Rectangle",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl = thisComp.layer("{{ end }}");\n[Math.max(thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0],thisProperty.propertyGroup(4)("C1 Group")("Contents")("C1").size[0]), (endctrl.content("Admin").content("sides").transform.position[1])*(endctrl.effect("Limber")("Upper Split")/100)+endctrl.content("Admin").content("p1").transform.scale[0]/2];',
                                                matchName:
                                                  "ADBE Vector Rect Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[100,250]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl  = thisComp.layer("{{ end }}"); \n[0,thisProperty.propertyGroup(2)("ADBE Vectors Group")("ADBE Vector Shape - Rect")("ADBE Vector Rect Size")[1]/2 - endctrl.content("Admin").content("p1").transform.scale[0]/2];',
                                            matchName: "ADBE Vector Anchor",
                                            name: "Anchor Point",
                                            type: "PROPERTY",
                                            value: "[0,75]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Subtract",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "3",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}"); endctrl.effect("Limber")("Middle Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.17647058823529,0.54901960784314,0.92156862745098,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                        ],
                        type: "INDEXED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Transform Group",
                        name: "Transform",
                        properties: [
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p1").transform.position;',
                            matchName: "ADBE Vector Position",
                            name: "Position",
                            type: "PROPERTY",
                            value: "[300,150]",
                          },
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("angles").transform.anchorPoint[0];',
                            matchName: "ADBE Vector Rotation",
                            name: "Rotation",
                            type: "PROPERTY",
                            value: "147.451227763219",
                          },
                        ],
                        type: "NAMED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Materials Group",
                        name: "Material Options",
                        properties: [],
                        type: "NAMED_GROUP",
                      },
                    ],
                    type: "NAMED_GROUP",
                  },
                  {
                    enabled: true,
                    matchName: "ADBE Vector Group",
                    name: "Lower Group",
                    properties: [
                      {
                        enabled: true,
                        matchName: "ADBE Vectors Group",
                        name: "Contents",
                        properties: [
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "Proximal Lower",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Wedge Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Group",
                                            name: "Wedge Path",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \nvar s1=endctrl.content("Admin").content("sides").transform.position[0]; \nvar c2=thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0]/2; \nvar c3=thisProperty.propertyGroup(4)("C3 Group")("Contents")("C3").size[0]/2; \ntry{var A=Math.acos(clamp((c2-c3)/s1,-1,1)); \nvar r3a = [-(c3*Math.sin(A)), -(s1+c3*Math.cos(A))]; \nvar r3b = [-(c2*Math.sin(A)), -(c2*Math.cos(A))];} catch(err) {value;}\ncreatePath(points = [[0-r3a[0], r3a[1]], r3a, r3b, [0-r3b[0], r3b[1]]], [[0,0], [0,0], [0,0], [0,0]], [[0,0], [0,0], [0,0], [0,0]], true);',
                                                matchName: "ADBE Vector Shape",
                                                name: "Path",
                                                type: "PROPERTY",
                                                value:
                                                  '{"closed":true,"featherInterps":[\n\n],"featherRadii":[\n\n],"featherRelCornerAngles":[\n\n],"featherRelSegLocs":[\n\n],"featherSegLocs":[\n\n],"featherTensions":[\n\n],"featherTypes":[\n\n],"inTangents":[[0,0],[0,0],[0,0],[0,0]],"outTangents":[[0,0],[0,0],[0,0],[0,0]],"vertices":[[19.9436645507812,-201.5],[-19.9436645507812,-201.5],[-34.9014282226562,-2.625],[34.9014282226562,-2.625]]}',
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C2 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C2",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nvar val = endctrl.content("Admin").content("p2blend").transform.scale[0];\n\n[val,val];',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[70,70]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C3 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C3",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nvar val = endctrl.content("Admin").content("p3ik").transform.scale[0];\n\n[val,val];',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[40,40]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl  = thisComp.layer("{{ end }}"); \n\n[0,-endctrl.content("Admin").content("sides").transform.position[0]];',
                                            matchName: "ADBE Vector Position",
                                            name: "Position",
                                            type: "PROPERTY",
                                            value: "[0,-200]",
                                          },
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl = thisComp.layer("{{ end }}");\nif (endctrl.effect("Limber")("Square End")==true) [0,0];\nelse ([100,100]);',
                                            matchName: "ADBE Vector Scale",
                                            name: "Scale",
                                            type: "PROPERTY",
                                            value: "[100,100]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Add",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "2",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Crop Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Rect",
                                            name: "Crop Rectangle",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl = thisComp.layer("{{ end }}");\n[Math.max(thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0],thisProperty.propertyGroup(4)("C3 Group")("Contents")("C3").size[0]), (endctrl.content("Admin").content("sides").transform.position[0])*(endctrl.effect("Limber")("Lower Split")/100)+endctrl.content("Admin").content("p2blend").transform.scale[0]/2];',
                                                matchName:
                                                  "ADBE Vector Rect Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[70,175]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl  = thisComp.layer("{{ end }}"); \n[0,thisProperty.propertyGroup(2)("ADBE Vectors Group")("ADBE Vector Shape - Rect")("ADBE Vector Rect Size")[1]/2 - endctrl.content("Admin").content("p2blend").transform.scale[0]/2];',
                                            matchName: "ADBE Vector Anchor",
                                            name: "Anchor Point",
                                            type: "PROPERTY",
                                            value: "[0,52.5]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Intersect",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "4",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}");\nendctrl.effect("Limber")("Middle Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.17647058823529,0.54901960784314,0.92156862745098,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "Distal Lower",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Wedge Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Group",
                                            name: "Wedge Path",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \nvar s1=endctrl.content("Admin").content("sides").transform.position[0]; \nvar c2=thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0]/2; \nvar c3=thisProperty.propertyGroup(4)("C3 Group")("Contents")("C3").size[0]/2; \ntry{var A=Math.acos(clamp((c2-c3)/s1,-1,1)); \nvar r3a = [-(c3*Math.sin(A)),-(s1+c3*Math.cos(A))]; \nvar r3b = [-(c2*Math.sin(A)), -(c2*Math.cos(A))];} catch(err) {value;}\ncreatePath(points = [[0-r3a[0], r3a[1]], r3a, r3b, [0-r3b[0], r3b[1]]], [[0,0], [0,0], [0,0], [0,0]], [[0,0], [0,0], [0,0], [0,0]], true);',
                                                matchName: "ADBE Vector Shape",
                                                name: "Path",
                                                type: "PROPERTY",
                                                value:
                                                  '{"closed":true,"featherInterps":[\n\n],"featherRadii":[\n\n],"featherRelCornerAngles":[\n\n],"featherRelSegLocs":[\n\n],"featherSegLocs":[\n\n],"featherTensions":[\n\n],"featherTypes":[\n\n],"inTangents":[[0,0],[0,0],[0,0],[0,0]],"outTangents":[[0,0],[0,0],[0,0],[0,0]],"vertices":[[19.9436645507812,-201.5],[-19.9436645507812,-201.5],[-34.9014282226562,-2.625],[34.9014282226562,-2.625]]}',
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C2 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C2",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p2blend").transform.scale;',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[70,70]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "C3 Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Ellipse",
                                            name: "C3",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p3ik").transform.scale;',
                                                matchName:
                                                  "ADBE Vector Ellipse Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[40,40]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl  = thisComp.layer("{{ end }}"); \n[0,-endctrl.content("Admin").content("sides").transform.position[0]];',
                                            matchName: "ADBE Vector Position",
                                            name: "Position",
                                            type: "PROPERTY",
                                            value: "[0,-200]",
                                          },
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl = thisComp.layer("{{ end }}");\nif (endctrl.effect("Limber")("Square End")==true) [0,0];\nelse ([100,100]);',
                                            matchName: "ADBE Vector Scale",
                                            name: "Scale",
                                            type: "PROPERTY",
                                            value: "[100,100]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Add",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "2",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Group",
                                    name: "Crop Group",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vectors Group",
                                        name: "Contents",
                                        properties: [
                                          {
                                            enabled: true,
                                            matchName:
                                              "ADBE Vector Shape - Rect",
                                            name: "Crop Rectangle",
                                            properties: [
                                              {
                                                enabled: true,
                                                expression:
                                                  'var endctrl = thisComp.layer("{{ end }}");\n[Math.max(thisProperty.propertyGroup(4)("C2 Group")("Contents")("C2").size[0],thisProperty.propertyGroup(4)("C3 Group")("Contents")("C3").size[0]), (endctrl.content("Admin").content("sides").transform.position[0])*(endctrl.effect("Limber")("Lower Split")/100)+endctrl.content("Admin").content("p2blend").transform.scale[0]/2];',
                                                matchName:
                                                  "ADBE Vector Rect Size",
                                                name: "Size",
                                                type: "PROPERTY",
                                                value: "[70,175]",
                                              },
                                            ],
                                            type: "NAMED_GROUP",
                                          },
                                        ],
                                        type: "INDEXED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Transform Group",
                                        name: "Transform",
                                        properties: [
                                          {
                                            enabled: true,
                                            expression:
                                              'var endctrl  = thisComp.layer("{{ end }}"); \n[0,thisProperty.propertyGroup(2)("ADBE Vectors Group")("ADBE Vector Shape - Rect")("ADBE Vector Rect Size")[1]/2 - endctrl.content("Admin").content("p2blend").transform.scale[0]/2];',
                                            matchName: "ADBE Vector Anchor",
                                            name: "Anchor Point",
                                            type: "PROPERTY",
                                            value: "[0,52.5]",
                                          },
                                        ],
                                        type: "NAMED_GROUP",
                                      },
                                      {
                                        enabled: true,
                                        matchName:
                                          "ADBE Vector Materials Group",
                                        name: "Material Options",
                                        properties: [],
                                        type: "NAMED_GROUP",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Filter - Merge",
                                    name: "Merge Paths Subtract",
                                    properties: [
                                      {
                                        enabled: true,
                                        matchName: "ADBE Vector Merge Type",
                                        name: "Mode",
                                        type: "PROPERTY",
                                        value: "3",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}");\nendctrl.effect("Limber")("Lower Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.74509805440903,0.56078433990479,0.41568627953529,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                        ],
                        type: "INDEXED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Transform Group",
                        name: "Transform",
                        properties: [
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p2blend").transform.position;',
                            matchName: "ADBE Vector Position",
                            name: "Position",
                            type: "PROPERTY",
                            value: "[407.603467770758,318.586754294955]",
                          },
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}");\n\nendctrl.content("Admin").content("angles").transform.anchorPoint[1];',
                            matchName: "ADBE Vector Rotation",
                            name: "Rotation",
                            type: "PROPERTY",
                            value: "230.378626942052",
                          },
                        ],
                        type: "NAMED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Materials Group",
                        name: "Material Options",
                        properties: [],
                        type: "NAMED_GROUP",
                      },
                    ],
                    type: "NAMED_GROUP",
                  },
                ],
                type: "INDEXED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Transform Group",
                name: "Transform",
                properties: [],
                type: "NAMED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Materials Group",
                name: "Material Options",
                properties: [],
                type: "NAMED_GROUP",
              },
            ],
            type: "NAMED_GROUP",
          },
          {
            enabled: true,
            matchName: "ADBE Vector Group",
            name: "Admin",
            properties: [
              {
                enabled: true,
                matchName: "ADBE Vectors Group",
                name: "Contents",
                properties: [],
                type: "INDEXED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Transform Group",
                name: "Transform",
                properties: [
                  {
                    enabled: true,
                    expression:
                      '////// LIMBER 1.6.1 //////\nvar limbLayers = {\nankle: thisComp.layer("{{ end }}"),\nhip: thisComp.layer("{{ start }}"),\nleg: thisComp.layer("{{ limb }}")\n};\nvalue;',
                    matchName: "ADBE Vector Scale",
                    name: "Scale",
                    type: "PROPERTY",
                    value: "[100,100]",
                  },
                ],
                type: "NAMED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Materials Group",
                name: "Material Options",
                properties: [],
                type: "NAMED_GROUP",
              },
            ],
            type: "NAMED_GROUP",
          },
        ],
        type: "INDEXED_GROUP",
      },
      transform: {
        matchName: "ADBE Transform Group",
        properties: [
          {
            enabled: true,
            expression: "[0,0];",
            matchName: "ADBE Anchor Point",
            name: "Anchor Point",
            type: "PROPERTY",
            value: "[0,0,0]",
          },
          {
            enabled: true,
            expression:
              "var val = [0,0];\nif (thisLayer.hasParent) val = parent.fromWorld([0,0,0]);\n[val[0],val[1],0];",
            matchName: "ADBE Position",
            name: "Position",
            type: "PROPERTY",
            value: "[0,0,0]",
          },
          {
            enabled: true,
            matchName: "ADBE Position_0",
            name: "X Position",
            type: "PROPERTY",
            value: "0",
          },
          {
            enabled: true,
            matchName: "ADBE Position_1",
            name: "Y Position",
            type: "PROPERTY",
            value: "0",
          },
        ],
        type: "INDEXED_GROUP",
      },
    };
    var threeCircles = {
      effects: {
        matchName: "ADBE Effect Parade",
        properties: [],
        type: "INDEXED_GROUP",
      },
      shapes: {
        matchName: "ADBE Root Vectors Group",
        properties: [
          {
            enabled: true,
            matchName: "ADBE Vector Group",
            name: "Limb",
            properties: [
              {
                enabled: true,
                matchName: "ADBE Vectors Group",
                name: "Contents",
                properties: [
                  {
                    enabled: true,
                    matchName: "ADBE Vector Group",
                    name: "Upper Group",
                    properties: [
                      {
                        enabled: true,
                        matchName: "ADBE Vectors Group",
                        name: "Contents",
                        properties: [
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "C1 Group",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Shape - Ellipse",
                                    name: "C1",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p1").transform.scale;',
                                        matchName: "ADBE Vector Ellipse Size",
                                        name: "Size",
                                        type: "PROPERTY",
                                        value: "[100,100]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}"); endctrl.effect("Limber")("Upper Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.17647058823529,0.54901960784314,0.92156862745098,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "C2 Group",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Shape - Ellipse",
                                    name: "C2",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p2blend").transform.scale;',
                                        matchName: "ADBE Vector Ellipse Size",
                                        name: "Size",
                                        type: "PROPERTY",
                                        value: "[70,70]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}"); endctrl.effect("Limber")("Middle Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.17647058823529,0.54901960784314,0.92156862745098,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [
                                  {
                                    enabled: true,
                                    expression:
                                      'var endctrl = thisComp.layer("{{ end }}");\n[0,-endctrl.content("Admin").content("sides").transform.position[1]];',
                                    matchName: "ADBE Vector Position",
                                    name: "Position",
                                    type: "PROPERTY",
                                    value: "[0,-200]",
                                  },
                                ],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                        ],
                        type: "INDEXED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Transform Group",
                        name: "Transform",
                        properties: [
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p1").transform.position;',
                            matchName: "ADBE Vector Position",
                            name: "Position",
                            type: "PROPERTY",
                            value: "[300,150]",
                          },
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("angles").transform.anchorPoint[0];',
                            matchName: "ADBE Vector Rotation",
                            name: "Rotation",
                            type: "PROPERTY",
                            value: "131.924540645914",
                          },
                        ],
                        type: "NAMED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Materials Group",
                        name: "Material Options",
                        properties: [],
                        type: "NAMED_GROUP",
                      },
                    ],
                    type: "NAMED_GROUP",
                  },
                  {
                    enabled: true,
                    matchName: "ADBE Vector Group",
                    name: "Lower Group",
                    properties: [
                      {
                        enabled: true,
                        matchName: "ADBE Vectors Group",
                        name: "Contents",
                        properties: [
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "C2 Group",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Shape - Ellipse",
                                    name: "C2",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p2blend").transform.scale;',
                                        matchName: "ADBE Vector Ellipse Size",
                                        name: "Size",
                                        type: "PROPERTY",
                                        value: "[70,70]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}");\nendctrl.effect("Limber")("Middle Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.17647058823529,0.54901960784314,0.92156862745098,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                          {
                            enabled: true,
                            matchName: "ADBE Vector Group",
                            name: "C3 Group",
                            properties: [
                              {
                                enabled: true,
                                matchName: "ADBE Vectors Group",
                                name: "Contents",
                                properties: [
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Shape - Ellipse",
                                    name: "C3",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p3ik").transform.scale;',
                                        matchName: "ADBE Vector Ellipse Size",
                                        name: "Size",
                                        type: "PROPERTY",
                                        value: "[40,40]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                  {
                                    enabled: true,
                                    matchName: "ADBE Vector Graphic - Fill",
                                    name: "Fill",
                                    properties: [
                                      {
                                        enabled: true,
                                        expression:
                                          'var endctrl = thisComp.layer("{{ end }}");\nendctrl.effect("Limber")("Lower Color");',
                                        matchName: "ADBE Vector Fill Color",
                                        name: "Color",
                                        type: "PROPERTY",
                                        value:
                                          "[0.74509805440903,0.56078433990479,0.41568627953529,1]",
                                      },
                                    ],
                                    type: "NAMED_GROUP",
                                  },
                                ],
                                type: "INDEXED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Transform Group",
                                name: "Transform",
                                properties: [
                                  {
                                    enabled: true,
                                    expression:
                                      'var endctrl  = thisComp.layer("{{ end }}"); \n[0,-endctrl.content("Admin").content("sides").transform.position[0]];',
                                    matchName: "ADBE Vector Position",
                                    name: "Position",
                                    type: "PROPERTY",
                                    value: "[0,-200]",
                                  },
                                  {
                                    enabled: true,
                                    expression:
                                      'var endctrl = thisComp.layer("{{ end }}");\nif (endctrl.effect("Limber")("Square End")==true) [0,0];\nelse ([100,100]);',
                                    matchName: "ADBE Vector Scale",
                                    name: "Scale",
                                    type: "PROPERTY",
                                    value: "[100,100]",
                                  },
                                ],
                                type: "NAMED_GROUP",
                              },
                              {
                                enabled: true,
                                matchName: "ADBE Vector Materials Group",
                                name: "Material Options",
                                properties: [],
                                type: "NAMED_GROUP",
                              },
                            ],
                            type: "NAMED_GROUP",
                          },
                        ],
                        type: "INDEXED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Transform Group",
                        name: "Transform",
                        properties: [
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}"); \n\nendctrl.content("Admin").content("p2blend").transform.position;',
                            matchName: "ADBE Vector Position",
                            name: "Position",
                            type: "PROPERTY",
                            value: "[448.805087043517,283.630258811286]",
                          },
                          {
                            enabled: true,
                            expression:
                              'var endctrl  = thisComp.layer("{{ end }}");\n\nendctrl.content("Admin").content("angles").transform.anchorPoint[1];',
                            matchName: "ADBE Vector Rotation",
                            name: "Rotation",
                            type: "PROPERTY",
                            value: "235.883253765774",
                          },
                        ],
                        type: "NAMED_GROUP",
                      },
                      {
                        enabled: true,
                        matchName: "ADBE Vector Materials Group",
                        name: "Material Options",
                        properties: [],
                        type: "NAMED_GROUP",
                      },
                    ],
                    type: "NAMED_GROUP",
                  },
                ],
                type: "INDEXED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Transform Group",
                name: "Transform",
                properties: [],
                type: "NAMED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Materials Group",
                name: "Material Options",
                properties: [],
                type: "NAMED_GROUP",
              },
            ],
            type: "NAMED_GROUP",
          },
          {
            enabled: true,
            matchName: "ADBE Vector Group",
            name: "Admin",
            properties: [
              {
                enabled: true,
                matchName: "ADBE Vectors Group",
                name: "Contents",
                properties: [],
                type: "INDEXED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Transform Group",
                name: "Transform",
                properties: [
                  {
                    enabled: true,
                    expression:
                      '////// LIMBER 1.6.1 //////\nvar limbLayers = {\nankle: thisComp.layer("{{ end }}"),\nhip: thisComp.layer("{{ start }}"),\nleg: thisComp.layer("{{ limb }}")\n};\nvalue;',
                    matchName: "ADBE Vector Scale",
                    name: "Scale",
                    type: "PROPERTY",
                    value: "[100,100]",
                  },
                ],
                type: "NAMED_GROUP",
              },
              {
                enabled: true,
                matchName: "ADBE Vector Materials Group",
                name: "Material Options",
                properties: [],
                type: "NAMED_GROUP",
              },
            ],
            type: "NAMED_GROUP",
          },
        ],
        type: "INDEXED_GROUP",
      },
      transform: {
        matchName: "ADBE Transform Group",
        properties: [
          {
            enabled: true,
            expression: "[0,0];",
            matchName: "ADBE Anchor Point",
            name: "Anchor Point",
            type: "PROPERTY",
            value: "[0,0,0]",
          },
          {
            enabled: true,
            expression:
              "var val = [0,0];\nif (thisLayer.hasParent) val = parent.fromWorld([0,0,0]);\n[val[0],val[1],0];",
            matchName: "ADBE Position",
            name: "Position",
            type: "PROPERTY",
            value: "[0,0,0]",
          },
          {
            enabled: true,
            matchName: "ADBE Position_0",
            name: "X Position",
            type: "PROPERTY",
            value: "0",
          },
          {
            enabled: true,
            matchName: "ADBE Position_1",
            name: "Y Position",
            type: "PROPERTY",
            value: "0",
          },
        ],
        type: "INDEXED_GROUP",
      },
    };
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
    var controllerShapes = [
      {
        name: "Classic",
        shape: [
          {
            closed: true,
            inTangents: [
              [3.08203125, 3.3701171875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, -4.92999267578125],
              [-10.466796875, 0],
              [0, 10.466796875],
            ],
            outTangents: [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-3.08000183105469, 3.3699951171875],
              [0, 10.4700012207031],
              [10.4700012207031, 0],
              [0, -4.9267578125],
            ],
            vertices: [
              [14, -12.7],
              [14, -12.7],
              [0, -28],
              [-14, -12.7],
              [-14, -12.7],
              [-19, 0],
              [0, 19],
              [19, 0],
            ],
          },
        ],
      },
      {
        name: "Crosshair",
        shape: [
          {
            closed: true,
            inTangents: [
              [6.27685546875, -1.055419921875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [1.055419921875, 6.27679443359375],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-6.27685546875, 1.055419921875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-1.055419921875, -6.27685546875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            outTangents: [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-6.27685546875, -1.055419921875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [1.055419921875, -6.27685546875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [6.27685546875, 1.055419921875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-1.055419921875, 6.27679443359375],
            ],
            vertices: [
              [2.5, 14.7750854492188],
              [2.5, 6.0355224609375],
              [0, 3.5355224609375],
              [-2.5, 6.0355224609375],
              [-2.5, 14.7750854492188],
              [-14.7750854492188, 2.5],
              [-6.03558349609375, 2.5],
              [-3.5355224609375, 0],
              [-6.0355224609375, -2.5],
              [-14.7750854492188, -2.5],
              [-2.5, -14.7750854492188],
              [-2.5, -6.0355224609375],
              [0, -3.5355224609375],
              [2.5, -6.0355224609375],
              [2.5, -14.7750854492188],
              [14.7750854492188, -2.5],
              [6.0355224609375, -2.5],
              [3.5355224609375, 0],
              [6.03558349609375, 2.5],
              [14.7750854492188, 2.5],
            ],
          },
          {
            closed: true,
            inTangents: [
              [0, 0],
              [0, 0],
              [10.1971435546875, 0],
              [1.23272705078125, -9.86309814453125],
              [0, 0],
              [0, 0],
              [0, 0],
              [-10.1971435546875, 0],
              [-1.23272705078125, 9.863037109375],
              [0, 0],
            ],
            outTangents: [
              [0, 0],
              [-1.23272705078125, -9.86309814453125],
              [-10.1971435546875, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [1.23272705078125, 9.863037109375],
              [10.1971435546875, 0],
              [0, 0],
              [0, 0],
            ],
            vertices: [
              [25, -2.5],
              [19.8272705078125, -2.5],
              [0, -20],
              [-19.8272705078125, -2.5],
              [-25, -2.5],
              [-25, 2.5],
              [-19.8272705078125, 2.5],
              [0, 20],
              [19.8272705078125, 2.5],
              [25, 2.5],
            ],
          },
        ],
      },
      {
        name: "Disc",
        shape: [
          {
            closed: true,
            inTangents: [
              [7.43060302734375, 0],
              [1.19244384765625, 7.091552734375],
              [0, 0],
              [0, 0],
              [0, 0],
              [-7.43060302734375, 0],
              [-1.19244384765625, -7.09161376953125],
              [0, 0],
              [0, 0],
              [0, 0],
            ],
            outTangents: [
              [-7.43060302734375, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [1.19244384765625, -7.09161376953125],
              [7.43060302734375, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-1.19244384765625, 7.091552734375],
            ],
            vertices: [
              [0, 15],
              [-14.7750854492188, 2.5],
              [-2.5, 2.5],
              [-2.5, -2.5],
              [-14.7750854492188, -2.5],
              [0, -15],
              [14.7750854492188, -2.5],
              [2.5, -2.5],
              [2.5, 2.5],
              [14.7750854492188, 2.5],
            ],
          },
          {
            closed: true,
            inTangents: [
              [11.0457153320312, 0],
              [0, -11.0457153320312],
              [-11.0457153320312, 0],
              [0, 11.045654296875],
            ],
            outTangents: [
              [-11.0457153320312, 0],
              [0, 11.045654296875],
              [11.0457153320312, 0],
              [0, -11.0457153320312],
            ],
            vertices: [
              [0, -20],
              [-20, 0],
              [0, 20],
              [20, 0],
            ],
          },
        ],
      },
      {
        name: "Pie",
        shape: [
          {
            closed: true,
            inTangents: [
              [-8.2843017578125, 0],
              [0, -8.28424072265625],
              [2.7144775390625, -2.7144775390625],
              [0, 0],
              [0, 0],
              [0, 4.14215087890625],
            ],
            outTangents: [
              [8.2843017578125, 0],
              [0, 4.14215087890625],
              [0, 0],
              [0, 0],
              [-2.7144775390625, -2.7144775390625],
              [0, -8.28424072265625],
            ],
            vertices: [
              [0, -15],
              [15, 0],
              [10.6066284179688, 10.6066284179688],
              [0, 0],
              [-10.6066284179688, 10.6066284179688],
              [-15, 0],
            ],
          },
          {
            closed: true,
            inTangents: [
              [-11.0457153320312, 0],
              [0, 11.0457153320312],
              [11.0457153320312, 0],
              [0, -11.045654296875],
            ],
            outTangents: [
              [11.0457153320312, 0],
              [0, -11.045654296875],
              [-11.0457153320312, 0],
              [0, 11.0457153320312],
            ],
            vertices: [
              [0, 20],
              [20, 0],
              [0, -20],
              [-20, 0],
            ],
          },
        ],
      },
      {
        name: "Pin",
        shape: [
          {
            closed: true,
            inTangents: [
              [3.08203125, 3.3701171875],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [0, -4.92999267578125],
              [-10.466796875, 0],
              [0, 10.466796875],
            ],
            outTangents: [
              [0, 0],
              [0, 0],
              [0, 0],
              [0, 0],
              [-3.08000183105469, 3.3699951171875],
              [0, 10.4700012207031],
              [10.4700012207031, 0],
              [0, -4.9267578125],
            ],
            vertices: [
              [14, -12.7],
              [14, -12.7],
              [0, -28],
              [-14, -12.7],
              [-14, -12.7],
              [-19, 0],
              [0, 19],
              [19, 0],
            ],
          },
          {
            closed: true,
            inTangents: [
              [4.41827392578125, 0],
              [0, 4.41827392578125],
              [-4.41827392578125, 0],
              [0, -4.41827392578125],
            ],
            outTangents: [
              [-4.41827392578125, 0],
              [0, -4.41827392578125],
              [4.41827392578125, 0],
              [0, 4.41827392578125],
            ],
            vertices: [
              [0, 8],
              [-8, 0],
              [0, -8],
              [8, 0],
            ],
          },
        ],
      },
      {
        name: "TieFighter",
        shape: [
          {
            closed: true,
            inTangents: [
              [1.38067626953125, 0],
              [0, 1.38067626953125],
              [-1.38067626953125, 0],
              [0, -1.3807373046875],
            ],
            outTangents: [
              [-1.38067626953125, 0],
              [0, -1.3807373046875],
              [1.38067626953125, 0],
              [0, 1.38067626953125],
            ],
            vertices: [
              [0, 2.5],
              [-2.5, 0],
              [0, -2.5],
              [2.5, 0],
            ],
          },
          {
            closed: true,
            inTangents: [
              [2.6318359375, 3.38641357421875],
              [0, 0],
              [-0.385498046875, -2.275146484375],
              [0, 0],
              [1.7357177734375, 1.7357177734375],
              [0, 0],
              [2.07421875, 0],
              [1.35772705078125, -1.36090087890625],
              [0, 0],
              [2.64862060546875, 0],
              [0, 0],
              [-1.28594970703125, 1.80633544921875],
              [0, 0],
              [0, -4.62103271484375],
              [-2.6318359375, -3.386474609375],
              [0, 0],
              [0.385498046875, 2.275146484375],
              [0, 0],
              [-1.7357177734375, -1.7357177734375],
              [0, 0],
              [-2.07421875, 0],
              [-1.35772705078125, 1.36090087890625],
              [0, 0],
              [-2.64862060546875, 0],
              [0, 0],
              [1.28594970703125, -1.8062744140625],
              [0, 0],
              [0, 4.6209716796875],
            ],
            outTangents: [
              [0, 0],
              [1.28594970703125, 1.80633544921875],
              [0, 0],
              [-2.64862060546875, 0],
              [0, 0],
              [-1.35772705078125, -1.36090087890625],
              [-2.07421875, 0],
              [0, 0],
              [-1.7357177734375, 1.7357177734375],
              [0, 0],
              [0.385498046875, -2.275146484375],
              [0, 0],
              [-2.6318359375, 3.38641357421875],
              [0, 4.6209716796875],
              [0, 0],
              [-1.28594970703125, -1.8062744140625],
              [0, 0],
              [2.64862060546875, 0],
              [0, 0],
              [1.35772705078125, 1.36090087890625],
              [2.07421875, 0],
              [0, 0],
              [1.7357177734375, -1.7357177734375],
              [0, 0],
              [-0.385498046875, 2.275146484375],
              [0, 0],
              [2.6318359375, -3.386474609375],
              [0, -4.62103271484375],
            ],
            vertices: [
              [15.7857055664062, -12.2501831054688],
              [12.2174682617188, -8.68194580078125],
              [14.7861328125, -2.5],
              [12.0914306640625, -2.5],
              [5.30926513671875, -5.30926513671875],
              [5.30926513671875, -5.29669189453125],
              [0, -7.5],
              [-5.30926513671875, -5.29669189453125],
              [-5.30926513671875, -5.30926513671875],
              [-12.0914306640625, -2.5],
              [-14.7861328125, -2.5],
              [-12.2174682617188, -8.68194580078125],
              [-15.7857055664062, -12.2501831054688],
              [-20, 0],
              [-15.7857055664062, 12.2501831054688],
              [-12.2174682617188, 8.68194580078125],
              [-14.7861328125, 2.5],
              [-12.0914306640625, 2.5],
              [-5.30926513671875, 5.30926513671875],
              [-5.30926513671875, 5.29669189453125],
              [0, 7.5],
              [5.30926513671875, 5.29669189453125],
              [5.30926513671875, 5.30926513671875],
              [12.0914306640625, 2.5],
              [14.7861328125, 2.5],
              [12.2174682617188, 8.68194580078125],
              [15.7857055664062, 12.2501831054688],
              [20, 0],
            ],
          },
        ],
      },
    ];
    var DEFAULTCONFIG = {
      controllerColor: "0x00CC00",
      controllerColorDynamics: 1,
      controllerLabelColor: 8,
      controllerShape: 0,
      controllerSize: 2,
      controllerUserRotation: 0,
      deleteAfterRig: 0,
      limbLabelColor: 2,
    };
    var userPrefs = userPrefs();
    var presetBinary_16 = __BLOB__BLOB_000307__;
    var kneeBinary = __BLOB__BLOB_000308__;
    var imgStringsRetina = [
      __BLOB__BLOB_CLEANED__,
      __BLOB__BLOB_000309__,
      __BLOB__BLOB_CLEANED__,
      __BLOB__BLOB_000310__,
      __BLOB__BLOB_000311__,
      __BLOB__BLOB_000312__,
      __BLOB__BLOB_000313__,
      __BLOB__BLOB_000314__,
      __BLOB__BLOB_000315__,
      __BLOB__BLOB_000316__,
      __BLOB__BLOB_CLEANED__,
      __BLOB__BLOB_CLEANED__,
      __BLOB__BLOB_000317__,
      __BLOB__BLOB_000318__,
      __BLOB__BLOB_CLEANED__,
      __BLOB__BLOB_000319__,
      __BLOB__BLOB_000320__,
      __BLOB__BLOB_000321__,
      __BLOB__BLOB_000322__,
    ];
    var fkImg = imgStringsRetina[0];
    var jointImg = imgStringsRetina[1];
    var copyImg = imgStringsRetina[2];
    var dupeImg = imgStringsRetina[3];
    var helpImg = imgStringsRetina[4];
    var hideImg = imgStringsRetina[5];
    var libraryImg = imgStringsRetina[6];
    var matchFKtoIKImg = imgStringsRetina[7];
    var matchIKtoFKImg = imgStringsRetina[8];
    var newImg = imgStringsRetina[9];
    var pasteImg = imgStringsRetina[10];
    var path2boneImg = imgStringsRetina[11];
    var renameImg = imgStringsRetina[12];
    var swapImg = imgStringsRetina[13];
    var poseImg = imgStringsRetina[14];
    var selectImg = imgStringsRetina[15];
    var settings_smallerHover = imgStringsRetina[16];
    var settings_smaller = imgStringsRetina[17];
    var sizeImg = imgStringsRetina[18];
    var shapeMove = (function () {
      function transfer_shapes_to_limb(is_lower, inLayer, outLayer) {
        if (!inLayer) {
          inLayer = app.project.activeItem.selectedLayers[0];
        }
        if (!outLayer) {
          outLayer = app.project.activeItem.selectedLayers[1];
        }
        if (is_lower) {
          outLayer_scaling_group = get_or_make_scaling_group(outLayer, true);
        } else {
          outLayer_scaling_group = get_or_make_scaling_group(outLayer, false);
        }
        var appExecuteCommand_version = false;
        groupData = getGroupData(inLayer);
        destGroup = makeGroupIn(outLayer_scaling_group, inLayer.name);
        applyGroupData(groupData, destGroup);
        resolveTransforms(destGroup, inLayer, outLayer, is_lower);
        inLayer.enabled = false;
        return destGroup;
      }
      function getGroupData(inLayer) {
        var contents_group = inLayer.property("ADBE Root Vectors Group");
        var shapeGroups = [];
        var numGroups = contents_group.numProperties;
        for (var i = 1; i <= numGroups; i += 1) {
          shapeGroups.push(contents_group.property(i));
        }
        return shapeGroups;
      }
      function makeGroupIn(outLayer, source_layer_name) {
        var contents_group = outLayer.addProperty("ADBE Vector Group");
        contents_group.name = source_layer_name + " Group";
        contents_group.moveTo(1);
        contents_group = outLayer.property(1);
        return contents_group;
      }
      function applyGroupData(groupData, destGroup) {
        var pasted_groups = [];
        for (var i = 0; i < groupData.length; i += 1) {
          var newProp = destGroup("ADBE Vectors Group").addProperty(
            groupData[i].matchName,
          );
          if (newProp.canSetEnabled) {
            newProp.enabled = groupData[i].enabled;
          }
          newProp.name = groupData[i].name;
          pasted_groups.push(newProp.propertyIndex);
          prop_dig_and_add(groupData[i], newProp);
        }
        return pasted_groups;
      }
      function prop_dig_and_add(inGroup, destGroup) {
        if (inGroup.numProperties > 0) {
          for (var u = 1; u <= inGroup.numProperties; u += 1) {
            var subProp = inGroup.property(u);
            if (
              subProp.propertyType === PropertyType.INDEXED_GROUP ||
              subProp.propertyType === PropertyType.NAMED_GROUP
            ) {
              if (destGroup.canAddProperty(subProp.matchName)) {
                newProp = destGroup.addProperty(subProp.matchName);
              } else {
                try {
                  newProp = destGroup.property(subProp.matchName);
                } catch (err) {
                  continue;
                }
              }
              if (newProp.canSetEnabled) {
                newProp.enabled = subProp.enabled;
              }
              if (
                subProp.parentProperty.propertyType ===
                PropertyType.INDEXED_GROUP
              ) {
                newProp.name = subProp.name;
              }
              prop_dig_and_add(subProp, newProp);
            } else {
              if (subProp.propertyType === PropertyType.PROPERTY) {
                var destProperty = destGroup.property(subProp.matchName);
                if (
                  destProperty &&
                  subProp.canSetExpression &&
                  !destProperty.canSetExpression
                ) {
                  destGroup.addProperty(subProp.matchName);
                }
                try {
                  destProperty.setValue(subProp.value);
                  if (destProperty.canSetExpression) {
                    destProperty.expression = subProp.expression;
                  }
                } catch (e) {}
              }
            }
          }
        }
      }
      function resolveTransforms(destGroup, inLayer, outLayer, is_lower) {
        var inLayerParent = inLayer.parent;
        inLayer.parent = null;
        if (is_lower) {
          limbGroup = "Lower Group";
        } else {
          limbGroup = "Upper Group";
        }
        if (is_lower) {
          rotation_limb_prop = outLayer("ADBE Root Vectors Group")(1)(
            "ADBE Vectors Group",
          )("Lower Group")("ADBE Vector Transform Group")(
            "ADBE Vector Rotation",
          );
        } else {
          rotation_limb_prop = outLayer("ADBE Root Vectors Group")(1)(
            "ADBE Vectors Group",
          )("Upper Group")("ADBE Vector Transform Group")(
            "ADBE Vector Rotation",
          );
        }
        var rotation_limb_val = rotation_limb_prop.value;
        var rotOffset = inLayer.property("ADBE Transform Group")(
          "ADBE Rotate Z",
        ).value;
        var scaleOffset = inLayer.property("ADBE Transform Group")(
          "ADBE Scale",
        ).value;
        var position_limb_prop = destGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        );
        var position_expression = [
          'var p1 = thisComp.layer("' + inLayer.name + '").toComp([0,0]);',
          'var p2 = thisLayer("ADBE Root Vectors Group")(1)("ADBE Vectors Group")("' +
            limbGroup +
            '")("ADBE Vector Transform Group")("ADBE Vector Position");',
          "var rot = " + rotation_limb_val + ";",
          "var theta = degreesToRadians(rot);",
          "var v = p2[0] - p1[0];",
          "var w = p2[1] - p1[1];",
          "[v*Math.cos(theta) + w*Math.sin(theta), -v*Math.sin(theta) + w*Math.cos(theta)];",
        ].join("\n");
        position_limb_prop.expression = position_expression;
        position_limb_prop.setValue(position_limb_prop.value);
        position_limb_prop.expression = "";
        var rotation_art_prop = destGroup("ADBE Vector Transform Group")(
          "ADBE Vector Rotation",
        );
        var result_rotation =
          rotation_art_prop.value + (180 - rotation_limb_val) + rotOffset;
        rotation_art_prop.setValue(result_rotation);
        var scale_art_prop = destGroup("ADBE Vector Transform Group")(
          "ADBE Vector Scale",
        );
        var result_scale = scaleOffset;
        scale_art_prop.setValue([result_scale[0], result_scale[1]]);
        inLayer.parent = inLayerParent;
        var scaling_group = destGroup.parentProperty.parentProperty;
      }
      function get_or_make_scaling_group(outLayer, is_lower) {
        if (is_lower) {
          groupName = "Lower";
        } else {
          groupName = "Upper";
        }
        scalingLayer = outLayer("ADBE Root Vectors Group")("Limb")(
          "ADBE Vectors Group",
        )(groupName + " Group")("ADBE Vectors Group")("Scaling " + groupName);
        if (scalingLayer) {
          return scalingLayer("ADBE Vectors Group");
        } else {
          var limb_start = getLimbLayersForScript(outLayer).hip;
          var limb_start_name = limb_start.name;
          var limb_end = getLimbLayersForScript(outLayer).ankle;
          var limb_end_name = limb_end.name;
          var scale_group = outLayer("ADBE Root Vectors Group")("Limb")(
            "ADBE Vectors Group",
          )(groupName + " Group")("ADBE Vectors Group")("Rigged " + groupName);
          if (!scale_group) {
            scale_group = outLayer("ADBE Root Vectors Group")("Limb")(
              "ADBE Vectors Group",
            )(groupName + " Group")("ADBE Vectors Group").addProperty(
              "ADBE Vector Group",
            );
          }
          scale_group.name = "Rigged " + groupName;
          scale_group.moveTo(1);
          scale_group = outLayer("ADBE Root Vectors Group")("Limb")(
            "ADBE Vectors Group",
          )(groupName + " Group")("ADBE Vectors Group")(1);
          var scaleGrp_position_prop = scale_group(
            "ADBE Vector Transform Group",
          )("ADBE Vector Position");
          var scaleGrp_scale_prop = scale_group("ADBE Vector Transform Group")(
            "ADBE Vector Scale",
          );
          var scaleGrp_rotation_prop = scale_group(
            "ADBE Vector Transform Group",
          )("ADBE Vector Rotation");
          var position_exp = "[0,0]";
          var scaleIndex = is_lower ? 0 : 1;
          var scale_exp = [
            "var unstretch = " +
              limb_end("ADBE Root Vectors Group")("Admin")(
                "ADBE Vectors Group",
              )("sides")("ADBE Vector Transform Group")("ADBE Vector Position")
                .value[scaleIndex] +
              "",
            'var endctrl = thisComp.layer("' + limb_end_name + '");',
            'var startctrl = thisComp.layer("' + limb_start_name + '");',
            'var c3r = endctrl(4)("Limber")("End Size")/2;',
            'var c2r = endctrl(4)("Limber")("Middle Size")/2;',
            'var c3siz = endctrl(2)("Admin")(2)("p3blend")(3)(3)[0]/2;',
            'var c2siz = endctrl(2)("Admin")(2)("p2blend")(3)(3)[0]/2;',
            'var s1plus = (endctrl(2)("Admin")(2)("sides")(3)(2)[' +
              scaleIndex +
              "]);",
            " var newscale = 100+((s1plus-unstretch)/unstretch*100);",
            '[endctrl(4)("Limber")("Link Length to Size Scale") == true ? endctrl(4)("Limber")("Size Scale") : 100, newscale]',
          ].join("\n");
          scaleGrp_position_prop.expression = position_exp;
          scaleGrp_scale_prop.expression = scale_exp;
          scaleGrp_rotation_prop.setValue(180);
          return scale_group("ADBE Vectors Group");
        }
      }
      function getLimbLayersForScript(thisLayer) {
        try {
          var thisComp = thisLayer.containingComp;
          var dummyPropExp = thisLayer.property("ADBE Root Vectors Group")(
            "Admin",
          )("ADBE Vector Transform Group")("ADBE Vector Scale").expression;
        } catch (err) {
          return null;
        }
        if (thisLayer.containingComp === app.project.activeItem) {
          compStr = "app.project.activeItem";
        } else {
          compStr = "app.project.itemByID(" + thisLayer.containingComp.id + ")";
        }
        dummyPropExp = dummyPropExp.replace("value;", "");
        dummyPropExp = dummyPropExp.replace(/thisComp/g, compStr);
        eval(dummyPropExp);
        return limbLayers;
      }
      return {
        applyGroupData: applyGroupData,
        transfer_shapes_to_limb: transfer_shapes_to_limb,
      };
    })();
    var userDataFolder = getUserDataFolder();
    var nameData = [
      new nameSet("Arm", "Shoulder", "Wrist", "Elbow"),
      new nameSet("Leg", "Hip", "Ankle", "Knee"),
    ];
    var myFile = new File(getUserDataFolder() + "/LimberNamesets.json");
    if (myFile.open("r")) {
      myFile.encoding = "UTF-8";
      var myJson = myFile.read();
      nameData = JSON.parse(myJson);
      myFile.close();
    } else {
      createResourceFile(
        "LimberNamesets.json",
        JSON.stringify(nameData),
        userDataFolder,
      );
    }
    var userDataFolder = getUserDataFolder();
    fkImg = createResourceFile("fk.png", fkImg, userDataFolder);
    jointImg = createResourceFile("joint.png", jointImg, userDataFolder);
    copyImg = createResourceFile("copy.png", copyImg, userDataFolder);
    dupeImg = createResourceFile("dupe.png", dupeImg, userDataFolder);
    helpImg = createResourceFile("help.png", helpImg, userDataFolder);
    hideImg = createResourceFile("hide.png", hideImg, userDataFolder);
    libraryImg = createResourceFile("library.png", libraryImg, userDataFolder);
    matchFKtoIKImg = createResourceFile(
      "matchFKtoIK.png",
      matchFKtoIKImg,
      userDataFolder,
    );
    matchIKtoFKImg = createResourceFile(
      "matchIKtoFK.png",
      matchIKtoFKImg,
      userDataFolder,
    );
    newImg = createResourceFile("new.png", newImg, userDataFolder);
    pasteImg = createResourceFile("paste.png", pasteImg, userDataFolder);
    path2boneImg = createResourceFile(
      "path2bone.png",
      path2boneImg,
      userDataFolder,
    );
    renameImg = createResourceFile("rename.png", renameImg, userDataFolder);
    swapImg = createResourceFile("swap.png", swapImg, userDataFolder);
    poseImg = createResourceFile("pose.png", poseImg, userDataFolder);
    selectImg = createResourceFile("select.png", selectImg, userDataFolder);
    settings_smallerHover = createResourceFile(
      "settings_hover.png",
      settings_smallerHover,
      userDataFolder,
    );
    settings_smaller = createResourceFile(
      "settings.png",
      settings_smaller,
      userDataFolder,
    );
    sizeImg = createResourceFile("size.png", sizeImg, userDataFolder);
    var pseudoFile = createResourceFile(
      "Limber_16.ffx",
      presetBinary_16,
      userDataFolder,
    );
    var kneePseudo = createResourceFile(
      "LimbJoint_16.ffx",
      kneeBinary,
      userDataFolder,
    );
    var w = buildUI(thisObj);
    if (w.toString() == "[object Panel]") {
      w;
    } else {
      w.show();
    }
    var armName = "left";
    var myJointName = "joint";
    var limbSettings = {};
    var limbMatchNames = [];
    var limbValues = [];
  }
  var scriptVer = "1.7.1";
  scriptVer = "1.7.1";
  var helpStr = "help string field so longer used";
  var af_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [
      { name: "Video Tutorial", url: "https://youtu.be/GrcOQenVLfs" },
      { name: "Documentation", url: "https://limber.stevekirby.co.uk/" },
    ],
    helpText: helpStr,
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6945548563181321,
    productSKU: "SKL-SUL",
    scriptAuthor: "Steve Kirby and Mike Overbeck",
    scriptName: "Limber",
    scriptURL: "https://aescripts.com/limber/",
    scriptVersion: scriptVer,
    supportTicketSKU: "SKMOL-SUL",
  };
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
        i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(/%v/, t.version);
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
                  null != i && 0 == compare(l, i) && n <= s && newVersionUI(o))
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
              licErrors[locale][checkErrorCode(licenseValidity.result)].detail +
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
      var d = strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
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
      var e = isServerConfigured(licenseValidity) ? strHeader + "@REMOTE" : "";
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
    var remindMeLaterDays = 7;
    var doUpdateCheck = true;
    var updateCheckInterval = 7;
    var maxUIButtons = 3;
    var licV = 2;
    if ($.os.indexOf("Mac") != -1) {
      mx = __BLOB__BLOB_000323__;
    } else {
      wx = __BLOB__BLOB_000324__;
    }
    if ($.os.indexOf("Mac") != -1) {
      mx1 = __BLOB__BLOB_000325__;
    } else {
      wx1 = __BLOB__BLOB_000326__;
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
  var lmbraf = new a(af_settings);
  if (lmbraf.c()) {
    limberLaunch(thisObj);
  }
}
sk_Limber(this);
