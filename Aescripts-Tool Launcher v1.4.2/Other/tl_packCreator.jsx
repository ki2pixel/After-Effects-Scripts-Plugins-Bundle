/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

var rgTLPackCreator = function (thisObj) {
  function loadPack(i) {
    packSettings.name.text = i.name;
    packSettings.author.text = i.author;
    i.tools = i.tools || [];
    addTools(i.tools);
    tb.config.icons = i.icons;
  }
  function move(i, n, j) {
    var k = [];
    if (i === 0 && j < 0) {
      return;
    }
    if (n === toolList.items.length - 1 && j > 0) {
      return;
    }
    for (var I = 0, A = toolList.items.length; I < A; I++) {
      k.push(toolList.items[I].tool);
    }
    toolList.removeAll();
    var h = j > 0 ? n + j : i + j;
    var f = j > 0 ? i : n;
    for (I = i; I <= n; I++) {
      k.splice(h, 0, k.splice(f, 1)[0]);
    }
    addTools(k);
    h = i + j;
    f = n + j;
    for (I = h; I <= f; I++) {
      toolList.items[I].selected = true;
    }
  }
  function addTools(i) {
    aeq.forEach(i, addTool);
  }
  function addTool(i) {
    var n = toolList.add("item", tb.getToolName(i));
    n.tool = i;
  }
  function getTools() {
    var i = [];
    for (var n = 0, j = toolList.items.length; n < j; n++) {
      i.push(aeq.extend(true, {}, toolList.items[n].tool));
    }
    updateIconPaths(i);
    updateCmds(i);
    if (packSettings.createToolbar.value) {
      createToolbar(i);
    }
    return i;
  }
  function createToolbar(i) {
    var j = tb.createToolbar(packSettings.name.text);
    aeq.forEach(i, function (i, n) {
      tb.addToolToToolbar(i, j, n);
    });
  }
  function updateIconPaths(i) {
    aeq.forEach(i, function (i) {
      if (tb.hasIcon(i)) {
        i.icon = packSettings.name.text + "/" + i.icon;
      }
    });
  }
  function updateCmds(i) {
    aeq.forEach(i, function (k) {
      tb.forEachCmd(k, function (i, n) {
        if (n !== undefined && (!n.type || !n.cmd)) {
          k[i] = undefined;
        } else {
          if (n.type === "script") {
            var j = aeq.readFile(n.cmd);
            if (j) {
              n.type = "javascript";
              n.cmd = j;
            } else {
              alert(
                'Something went wrong!\nCould not read file: "' +
                  n.cmd +
                  '" for tool "' +
                  k.name +
                  '"',
              );
            }
          }
        }
      });
    });
  }
  function savePack() {
    if (packSettings.name.text === "") {
      alert("The pack must have a name!", "Error", true);
      return;
    }
    var i = new File(
      Folder.desktop.fsName + "/" + packSettings.name.text + ".json",
    ).saveDlg("Save Pack File");
    if (!i) {
      return;
    }
    var n = {
      author: packSettings.author.text,
      icons: tb.config.icons,
      name: packSettings.name.text,
      tools: getTools(),
    };
    var j = JSON.stringify(n, undefined, "\t");
    tb.writeFile(i, j);
    aeq.revealFile(i);
  }
  var script = {
    author: "Rune Gangs\xf8",
    betaExpiration: new Date(2016, 11, 1),
    betaMode: false,
    downloadURL: "https://aescripts.com/downloadable/customer/products/",
    homepage: "http://aescripts.com/tool-launcher/",
    name: "Tool Launcher",
    productID: "978",
    shortname: "tl",
    supportEmail: "http://aescripts.com/contact",
    supportEmailBeta: "support@rungan.no",
    updateHost: "aescripts.com",
    updateURL: "/aeapi/product/versionhistory/product_id/978/",
    version: "1.4.2",
  };
  var aeq = (function () {
    function A(i, n) {
      if (i[n] instanceof Function) {
        return i[n]();
      }
      return i[n];
    }
    function h(i, n, j) {
      k = f.setters[i.toString()];
      if (k !== undefined) {
        I = k[n];
        if (I !== undefined) {
          n = I;
        }
      }
      if (i[n] instanceof Function) {
        i[n](j);
      } else {
        i[n] = j;
      }
      return i;
    }
    function B(i, n) {
      switch (n.name) {
        case "X Position":
        case "Y Position":
        case "Z Position":
          n = i.property("Position");
          n.dimensionsSeparated = true;
          return n.propertyGroup().property(n.name);
        default:
          return n;
      }
    }
    function m(i, n, j) {
      for (var I in n) {
        if (!n.hasOwnProperty(I)) {
          continue;
        }
        k = n[I];
        if (!i.hasOwnProperty(I)) {
          throw new Error(
            "The attribute " + I + " does not exist on a " + typeof i,
          );
        }
        var A = F(k, i[I]);
        if (((A && j) || !A) && j === false) {
          return false;
        }
      }
      return true;
    }
    function F(i, n) {
      if (i.type === "Array") {
        return j(i, n);
      } else if (i.type === "RegExp") {
        return i.value.test(n);
      } else {
        return i.value.toString() === n.toString();
      }
    }
    function j(i, n) {
      for (var j = 0, k = i.value.length; j < k; j++) {
        if (F(i.value[j], n)) {
          return true;
        }
      }
      return false;
    }
    function I() {
      var i = aeq.getActiveComp();
      if (i === null) {
        alert("No Comp selected");
      }
      return i;
    }
    function J(i) {
      if (i.selectedLayers.length === 0) {
        alert("No layers selected");
        return null;
      }
      return i.selectedLayers;
    }
    function L(i) {
      if (i.selectedProperties.length === 0) {
        alert("No properties selected");
        return null;
      }
      return i.selectedProperties;
    }
    function k(i, n) {
      if (n instanceof aeq.Layer) {
        return n.layer;
      }
      if (aeq.isLayer(n)) {
        return n;
      }
      if (aeq.isNumber(n)) {
        return i.containingComp.layer(n);
      }
      if (aeq.isString(n)) {
        if (l.test(n)) {
          k = N(n);
          if (k) {
            j = i.index + k;
            if (j === 0 || j > i.containingComp.numLayers) {
              return null;
            }
            return i.containingComp.layer(j);
          }
        }
        return i.containingComp.layer(n);
      }
      return null;
    }
    function N(i) {
      var n = i.charAt(0) + i.substr(2);
      n = parseInt(n, 10);
      if (isNaN(n)) {
        return false;
      }
      return n;
    }
    var aeq = function (i, n) {
      if (aeq.isNullOrUndefined(i)) {
        return i;
      }
      if (aeq.isAeq(i)) {
        j = i;
      } else if (aeq.isString(i)) {
        j = aeq.select(i, n);
      } else if (aeq.isArray(i)) {
        j = aeq.arrayEx(i);
      } else if (aeq.isApp(i)) {
        j = aeq.app;
      } else if (aeq.isComp(i)) {
        j = new aeq.Comp(i);
      } else if (aeq.isLayer(i)) {
        j = new aeq.Layer(i);
      } else {
        if (aeq.isProperty(i)) {
          j = new aeq.Property(i);
        }
      }
      j.aeq = true;
      return j;
    };
    aeq.version = "0.2.1";
    aeq.thisObj = this;
    if (typeof module === "object") {
      module.exports = aeq;
    }
    aeq.extend = function () {
      var h = E(arguments[0], {});
      var f = 1;
      var B = arguments.length;
      var m = false;
      if (typeof h === "boolean") {
        m = h;
        h = E(arguments[f], {});
        f++;
      }
      if (typeof h !== "object" && !aeq.isFunction(h)) {
        h = {};
      }
      if (f === B) {
        h = this;
        f--;
      }
      for (; f < B; f++) {
        if ((i = arguments[f]) !== null) {
          for (var n in i) {
            j = h[n];
            k = i[n];
            if (h === k) {
              continue;
            }
            if (m && k && (aeq.isPlainObject(k) || (I = aeq.isArray(k)))) {
              if (I) {
                I = false;
                A = j && aeq.isArray(j) ? j : [];
              } else {
                A = j && aeq.isPlainObject(j) ? j : {};
              }
              h[n] = aeq.extend(m, A, k);
            } else {
              if (k !== undefined) {
                h[n] = k;
              }
            }
          }
        }
      }
      return h;
    };
    aeq.forEach = function (i, n, j) {
      if (i && Object.prototype.toString.call(i) === "[object Array]") {
        k = i.length;
        I = j !== undefined ? j : 0;
        for (; I < k; I++) {
          if (n(i[I], I, i) === false) {
            break;
          }
        }
      } else {
        for (var I in i) {
          if (i.hasOwnProperty(I)) {
            if (n(I, i[I], i) === false) {
              break;
            }
          }
        }
      }
      return i;
    };
    aeq.filter = function (i, n) {
      var j = [];
      if (i && Object.prototype.toString.call(i) === "[object Array]") {
        k = i.length;
        I = 0;
        for (; I < k; I++) {
          if (n(i[I], I, i)) {
            j.push(i[I]);
          }
        }
      } else {
        for (var I in i) {
          if (i.hasOwnProperty(I)) {
            if (n(I, i[I], i)) {
              j.push(i[I]);
            }
          }
        }
      }
      return j;
    };
    aeq.setDefault = function (i, n) {
      return typeof i == "undefined" ? n : i;
    };
    var E = aeq.setDefault;
    aeq.extend({
      assertIsEmpty: function (i, n) {
        if (aeq.isEmpty(i)) {
          return true;
        }
        throw new Error(n);
      },
      assertIsFalse: function (i, n) {
        if (i === false) {
          return true;
        }
        throw new Error(n);
      },
      assertIsNotEmpty: function (i, n) {
        if (!aeq.isEmpty(i)) {
          return true;
        }
        throw new Error(n);
      },
      assertIsNotNull: function (i, n) {
        if (!aeq.isNullOrUndefined(i)) {
          return true;
        }
        throw new Error(n);
      },
      assertIsNull: function (i, n) {
        if (aeq.isNullOrUndefined(i)) {
          return true;
        }
        throw new Error(n);
      },
      assertIsTrue: function (i, n) {
        if (i === true) {
          return true;
        }
        throw new Error(n);
      },
    });
    aeq.attr = function (i, n, j) {
      if (arguments.length === 1) {
        throw new Error("Only one argument given to attr, must be 2 or 3");
      } else if (arguments.length === 2) {
        if (i[0] !== undefined && i[0] !== null) {
          return A(i[0], n);
        }
        return undefined;
      } else {
        for (k = 0, I = i.length; k < I; k++) {
          h(i[k], n, j);
        }
        return i;
      }
    };
    var f = { setters: { "[object Property]": { value: "setValue" } } };
    aeq.extend({
      framesToTime: function (i, n) {
        return i / n;
      },
      getActiveComposition: function () {
        var i = app.project.activeItem;
        if (aeq.isComp(i)) {
          return i;
        }
        return null;
      },
      getChildren: function (i) {
        if (aeq.isComp(i)) {
          return aeq.normalizeCollection(i.layers);
        }
        if (aeq.isLayer(i) || aeq.isPropertyGroup(i)) {
          return aeq.getPropertyChildren(i, {});
        }
        if (aeq.isArray(i)) {
          n = aeq.arrayEx();
          aeq.forEach(i, function (i) {
            n.push.call(n, aeq.getChildren(i));
          });
          return n;
        }
      },
      getComposition: function (i) {
        var n = app.project.items.length;
        for (var j = 1; j <= n; j += 1) {
          var k = app.project.item(j);
          if (k.name === i && aeq.isComp(k)) {
            return k;
          }
        }
        return null;
      },
      getCompositions: function (i, n) {
        var j = aeq.getItems(i, n);
        return j.filter(aeq.isComp);
      },
      getEffects: function (i) {
        aeq.assertIsNotNull(i, "layers is null");
        if (aeq.isLayer(i)) {
          i = [i];
        }
        var n = [];
        var j = i.length;
        for (var A = 0; A < j; A += 1) {
          k = i[A].property("ADBE Effect Parade");
          if (k === null) {
            return aeq.arrayEx();
          }
          I = k.numProperties;
          for (var h = 1; h <= I; h += 1) {
            n.push(k.property(h));
          }
        }
        return aeq.arrayEx(n);
      },
      getItemInComps: function (n) {
        var j = [];
        aeq.forEach(n.usedIn, function (i) {
          aeq.forEachLayer(i, function (i) {
            if (i.source === n) {
              j.push(i);
            }
          });
        });
        return aeq.arrayEx(j);
      },
      getItems: function (i, n) {
        if (i === undefined) {
          return aeq.normalizeCollection(app.project.items);
        }
        n = E(n, true);
        i = aeq.project.getFolder(i);
        if (i === null) {
          return aeq.arrayEx();
        }
        if (n) {
          return aeq.getItemsDeep(i);
        }
        return aeq.normalizeCollection(i.items);
      },
      getItemsDeep: function (i, n) {
        var k = [];
        var I = i.items.length;
        for (var A = 1; A <= I; A += 1) {
          j = i.items[A];
          if (aeq.isFolderItem(j)) {
            k.push.apply(k, aeq.getItemsDeep(j, false));
          }
          k.push(j);
        }
        if (n === false) {
          return k;
        }
        return aeq.arrayEx(k);
      },
      getKeys: function (i) {
        var n = [];
        if (aeq.isArray(i)) {
          for (j = 0, k = i.length; j < k; j++) {
            n = n.concat(aeq.getKeys(i[j]));
          }
          return aeq.arrayEx(n);
        }
        for (j = 1, k = i.numKeys; j <= k; j++) {
          n.push(aeq.Key(i, j));
        }
        return aeq.arrayEx(n);
      },
      getLayers: function (i) {
        aeq.assertIsNotNull(i, "comps is null");
        var n = [];
        if (aeq.isComp(i)) {
          i = [i];
        }
        for (var j = 0; j < i.length; j += 1) {
          var k = i[j];
          n = n.concat(aeq.normalizeCollection(k.layers));
        }
        return aeq.arrayEx(n);
      },
      getMarkerGroup: function (i) {
        if (!i) {
          i = aeq.getActiveComp();
        }
        if (aeq.isLayer(i)) {
          return i.property("ADBE Marker");
        }
        if (aeq.isComp(i) && aeq.app.version >= 14) {
          return i.markerProperty;
        }
        return null;
      },
      getProperties: function (i, n) {
        aeq.assertIsNotNull(i, "layer is null");
        n = E(n, { separate: true });
        var j = [];
        for (var k = 0; k < i.length; k += 1) {
          var I = i[k];
          j = j.concat(aeq.getPropertyChildren(I, n));
        }
        return aeq.arrayEx(j);
      },
      getPropertyChildren: function (i, n) {
        var j = [];
        var I = i.numProperties;
        n = E(n, { separate: false });
        for (var A = 1; A <= I; A += 1) {
          k = i.property(A);
          switch (k.propertyType) {
            case PropertyType.PROPERTY:
              if (n.separate) {
                k = B(i, k);
              }
              if (n.props !== false) {
                j.push(k);
              }
              break;
            case PropertyType.INDEXED_GROUP:
            case PropertyType.NAMED_GROUP:
              if (n.groups === true) {
                j.push(k);
              }
              j = j.concat(aeq.getPropertyChildren(k, n));
              break;
            default:
              break;
          }
        }
        return j;
      },
      getSelectedLayers: function (i) {
        if (!aeq.isComp(i)) {
          i = aeq.getActiveComp();
        }
        if (i) {
          return aeq.arrayEx(i.selectedLayers);
        }
        return aeq.arrayEx();
      },
      getSelectedLayersOrAll: function (i) {
        if (!aeq.isComp(i)) {
          i = aeq.getActiveComp();
          if (i === null) {
            return aeq.arrayEx();
          }
        }
        var n = aeq.getSelectedLayers(i);
        if (n.length === 0) {
          return aeq.getLayers(i);
        }
        return n;
      },
      getSelectedProperties: function (i) {
        if (!i) {
          i = aeq.getActiveComp();
        }
        if (i) {
          return aeq.arrayEx(i.selectedProperties);
        }
        return aeq.arrayEx();
      },
      normalizeCollection: function (i) {
        var n = Array.prototype.slice.call(i, 1);
        var j = i.length;
        if (j !== 0) {
          n.push(i[j]);
        }
        return aeq.arrayEx(n);
      },
      timeToFrames: function (i, n) {
        return i * n;
      },
    });
    aeq.getComp = aeq.getComposition;
    aeq.getComps = aeq.getCompositions;
    aeq.getActiveComp =
      aeq.activeComp =
      aeq.activeComposition =
        aeq.getActiveComposition;
    aeq.getSelectedProps = aeq.getSelectedProperties;
    aeq.getSelectedOrAllLayers = aeq.getSelectedLayersOrAll;
    aeq.extend({
      forEachComp: function (i) {
        aeq.forEach(aeq.getCompositions(), i);
      },
      forEachEffect: function (i, n) {
        if (aeq.isLayer(i)) {
          I = i.property("ADBE Effect Parade");
          k = I.numProperties;
          for (var j = 1; j <= k; j += 1) {
            if (n(I.property(j), j, I) === false) {
              break;
            }
          }
        } else if (aeq.isComp(i)) {
          aeq.forEachLayer(i, function (i) {
            aeq.forEachEffect(i, n);
          });
        } else if (aeq.isArray(i)) {
          aeq.forEach(i, function (i) {
            aeq.forEachEffect(i, n);
          });
        } else {
          if (aeq.isFunction(i)) {
            n = i;
            aeq.forEachLayer(function (i) {
              aeq.forEachEffect(i, n);
            });
          }
        }
        return aeq;
      },
      forEachItem: function (i) {
        var n = app.project;
        var j = n.items;
        var k = j.length;
        for (var I = 1; I <= k; I += 1) {
          if (i(j[I], I, n) === false) {
            break;
          }
        }
        return aeq;
      },
      forEachLayer: function (i, n) {
        if (aeq.isComp(i)) {
          var j = i.numLayers;
          var k = 1;
          for (; k <= j; k++) {
            if (n(i.layer(k), k, i) === false) {
              break;
            }
          }
        } else if (aeq.isArray(i)) {
          aeq.forEach(i, function (i) {
            aeq.forEachLayer(i, n);
          });
        } else {
          if (aeq.isFunction(i)) {
            n = i;
            aeq.forEachComp(function (i) {
              aeq.forEachLayer(i, n);
            });
          }
        }
        return aeq;
      },
      forEachOutputModule: function (k) {
        aeq.forEachRenderQueueItem(function (i) {
          var n = i.outputModules.length;
          for (var j = 1; j <= n; j += 1) {
            if (k(i.outputModules[j], j, i) === false) {
              break;
            }
          }
        });
        return aeq;
      },
      forEachProperty: function (i, j) {
        if (aeq.isLayer(i) || aeq.isPropertyGroup(i)) {
          var n = aeq.getPropertyChildren(i, {});
          aeq.forEach(n, j);
        } else if (aeq.isComp(i)) {
          aeq.forEachLayer(i, function (i) {
            var n = aeq.getPropertyChildren(i, {});
            aeq.forEach(n, j);
          });
        } else if (aeq.isArray(i)) {
          aeq.forEach(i, function (i) {
            aeq.forEachProperty(i, j);
          });
        } else {
          if (aeq.isFunction(i)) {
            j = i;
            aeq.forEachLayer(function (i) {
              aeq.forEachProperty(i, j);
            });
          }
        }
        return aeq;
      },
      forEachRenderQueueItem: function (i) {
        var n = app.project.renderQueue;
        var j = n.items;
        var k = j.length;
        for (var I = 1; I <= k; I += 1) {
          if (i(j[I], I, n) === false) {
            break;
          }
        }
        return aeq;
      },
    });
    aeq.forEachProp = aeq.forEachProperty;
    aeq.forEachComposition = aeq.forEachComp;
    aeq.forEachRQItem = aeq.forEachRenderQueueItem;
    aeq.forEachOM = aeq.forEachOutputModule;
    aeq.select = function (i, n) {
      function f(i) {
        if (A.props || A.pseudo) {
          return i.filter(B);
        }
        return i;
      }
      function B(i) {
        var n = true;
        if (A.props !== null) {
          if (!m(i, A.props, false)) {
            return false;
          }
        }
        if (!A.pseudo) {
          return true;
        }
        j = A.pseudo.length;
        for (var I = 0; I < j; I += 1) {
          k = A.pseudo[I];
          if (k.type === "not" || k.type === "isnot") {
            n = m(i, k.props, true);
          } else {
            if (k.type === "is" || k.type === "has") {
              n = m(i, k.props, false);
            }
          }
          if (n === false) {
            return false;
          }
        }
        return true;
      }
      var j = [];
      var k = cssselector.parse(i);
      var I = k;
      if (n !== undefined) {
        if (aeq.isString(n)) {
          j = aeq.select(n);
        } else if (aeq.isArray(n)) {
          j = n;
        } else {
          j = [n];
        }
      }
      while (I.length > 0) {
        var A = I[0];
        var h = false;
        switch (A.type) {
          case "activecomp":
            j = f(aeq.arrayEx([aeq.getActiveComposition()]));
            j.type = "comp";
            break;
          case "composition":
          case "comp":
            j = f(aeq.getCompositions());
            j.type = "comp";
            break;
          case "layer":
            if (j.type === "comp" || aeq.isComp(j[0])) {
              j = f(aeq.getLayers(j));
              j.type = "layer";
            } else {
              if (j.type !== "comp") {
                I.unshift({ type: "comp" });
                h = true;
              }
            }
            break;
          case "propertygroup":
          case "propgrp":
          case "propgroup":
            if (
              j.type === "layer" ||
              j.type === "propertygroup" ||
              aeq.isLayer(j[0]) ||
              aeq.isPropertyGroup(j[0])
            ) {
              j = f(
                aeq.getProperties(j, {
                  groups: true,
                  props: false,
                  separate: false,
                }),
              );
              j.type = "propertygroup";
            } else {
              if (j.type !== "layer") {
                I.unshift({ type: "layer" });
                h = true;
              }
            }
            break;
          case "property":
          case "prop":
            if (
              j.type === "layer" ||
              j.type === "propertygroup" ||
              aeq.isLayer(j[0]) ||
              aeq.isPropertyGroup(j[0])
            ) {
              j = f(aeq.getProperties(j, { separate: false }));
              j.type = "property";
            } else {
              if (j.type !== "layer") {
                I.unshift({ type: "layer" });
                h = true;
              }
            }
            break;
          case "effect":
            if (j.type === "layer" || aeq.isLayer(j[0])) {
              j = f(aeq.getEffects(j));
              j.type = "effect";
            } else {
              if (j.type !== "layer") {
                I.unshift({ type: "layer" });
                h = true;
              }
            }
            break;
          case "key":
          case "keys":
            if (j.type === "property" || aeq.isProperty(j[0])) {
              j = f(aeq.getKeys(j));
              j.type = "key";
            } else {
              if (j.type !== "property") {
                I.unshift({ type: "property" });
                h = true;
              }
            }
            break;
          case "item":
            j = f(aeq.getItems());
            j.type = "item";
            break;
          default:
            throw new Error("Unrecognized token " + A.type);
        }
        if (!h) {
          I.shift();
        }
      }
      return aeq.arrayEx(j);
    };
    aeq.extend({
      isAVLayer: function (i) {
        return i instanceof AVLayer;
      },
      isAeq: function (i) {
        return i instanceof Object && i.isAeq === true;
      },
      isApp: function (i) {
        return i instanceof Application;
      },
      isArray: function (i) {
        return i instanceof Array;
      },
      isBoolean: function (i) {
        return typeof i === "boolean";
      },
      isCameraLayer: function (i) {
        return i instanceof CameraLayer;
      },
      isComp: function (i) {
        return i instanceof CompItem;
      },
      isEmpty: function (i) {
        return i.length === undefined || i.length === 0;
      },
      isFile: function (i) {
        return i instanceof File;
      },
      isFolder: function (i) {
        return i instanceof Folder;
      },
      isFolderItem: function (i) {
        return i instanceof FolderItem;
      },
      isFootageItem: function (i) {
        return i instanceof FootageItem;
      },
      isFunc: function (i) {
        return i instanceof Function;
      },
      isLayer: function (i) {
        return (
          aeq.isAVLayer(i) ||
          aeq.isShapeLayer(i) ||
          aeq.isTextLayer(i) ||
          aeq.isCamera(i) ||
          aeq.isLight(i)
        );
      },
      isLightLayer: function (i) {
        return i instanceof LightLayer;
      },
      isNullOrUndefined: function (i) {
        return i == null;
      },
      isNumber: function (i) {
        return typeof i === "number";
      },
      isObject: function (i) {
        return i instanceof Object;
      },
      isPanel: function (i) {
        return i instanceof Panel;
      },
      isPlainObject: function (i) {
        if (i === undefined || i === null) {
          return false;
        }
        if (i.toString() !== "[object Object]") {
          return false;
        }
        if (
          i.constructor &&
          !i.constructor.prototype.hasOwnProperty("isPrototypeOf")
        ) {
          return false;
        }
        return true;
      },
      isPrecomp: function (i) {
        if (!aeq.isLayer(i)) {
          return false;
        }
        return aeq.isComp(i.source);
      },
      isProperty: function (i) {
        return i instanceof Property;
      },
      isPropertyGroup: function (i) {
        return i instanceof PropertyGroup;
      },
      isShapeLayer: function (i) {
        return i instanceof ShapeLayer;
      },
      isString: function (i) {
        return typeof i === "string";
      },
      isTextLayer: function (i) {
        return i instanceof TextLayer;
      },
      isWindow: function (i) {
        return i instanceof Window;
      },
      reflect: function (i) {
        var n = [];
        for (var j in i) {
          if (i.hasOwnProperty(j)) {
            n.push(i[j].constructor.name + " " + j + "=" + i[j]);
          }
        }
        return n.join();
      },
    });
    aeq.isBool = aeq.isBoolean;
    aeq.isNum = aeq.isNumber;
    aeq.isStr = aeq.isString;
    aeq.isObj = aeq.isObject;
    aeq.isArr = aeq.isArray;
    aeq.isFunction = aeq.isFunc;
    aeq.isComposition = aeq.isComp;
    aeq.isProp = aeq.isProperty;
    aeq.isDir = aeq.isDirectory = aeq.isFolder;
    aeq.isCamera = aeq.isCameraLayer;
    aeq.isLight = aeq.isLightLayer;
    aeq.error = function (i, n) {
      var j = /\s*function\s*([^\(]*)/i.exec(i.source);
      j = j !== null && j[1] !== "" ? j[1] : "anonymous";
      alert(
        i.toString() +
          "\n" +
          "Script File: " +
          File.decode(i.fileName).replace(/^.*[\\|\/]/, "") +
          "\nFunction: " +
          n ===
          undefined
          ? j
          : n.callee.name + (n === undefined) || n.length === 0
            ? ""
            : "\nArguments: " +
              Array.prototype.toString.call(n) +
              "\nError on Line: " +
              i.line.toString(),
      );
    };
    aeq.getModifiers = function () {
      return {
        alt: ScriptUI.environment.keyboardState.altKey,
        ctrl: ScriptUI.environment.keyboardState.ctrlKey,
        meta: ScriptUI.environment.keyboardState.metaKey,
        shift: ScriptUI.environment.keyboardState.shiftKey,
      };
    };
    aeq.extend({
      createResourceFiles: function (i, A, h) {
        if (!aeq.app.securityPrefEnabled()) {
          return false;
        }
        A = aeq.getFolderObject(A);
        h = E(h, "");
        if (h !== "" && h.charAt(0) !== ".") {
          h = "." + h;
        }
        aeq.file.ensureFolderExists(A);
        if (!A.exists) {
          throw new Error("Could not create resource folder: " + A.fsname);
        }
        var f = {};
        aeq.forEach(i, function (i, n) {
          var j = aeq.file.joinPath(A.fsName, i + h);
          var k = new File(j);
          f[i] = k;
          if (!k.exists || n.length !== k.length) {
            k.encoding = "BINARY";
            k.open("w");
            var I = k.write(n);
            if (!I) {
              if (k.error === "") {
                f[i] = null;
              } else {
                f[i] = new Error(k.error, k.fsName, undefined);
              }
            }
            k.close();
          }
        });
        return f;
      },
      getBinaryString: function (i) {
        var n = aeq.getFileObject(i);
        n.encoding = "BINARY";
        n.open("r");
        var j = n.read();
        n.close();
        var k = j.toSource();
        k = k.replace(/^\(new String\(\"/, "");
        k = k.replace(/\"\)\)$/, "");
        return k;
      },
    });
    aeq.extend({
      getSystemInfo: function () {
        return $.os + " AE " + app.version + "/" + app.isoLanguage;
      },
      isMac: $.os.indexOf("Windows") === -1,
      isWindows: $.os.indexOf("Windows") !== -1,
    });
    aeq.isWin = aeq.isWindows;
    aeq.extend({
      createUndoGroup: function (i, n, j) {
        app.beginUndoGroup(i);
        if (!aeq.isArray(j)) {
          j = [j];
        }
        var k = n.apply(null, j);
        app.endUndoGroup();
        return k;
      },
    });
    aeq.undoGroup = aeq.createUndoGroup;
    aeq.extend({
      propertyType: function (i) {
        return aeq.valueInObject(i.propertyType || i, PropertyType);
      },
      valueInObject: function (i, n) {
        for (var j in n) {
          if (n.hasOwnProperty(j)) {
            if (i === n[j]) {
              return j;
            }
          }
        }
        return undefined;
      },
    });
    aeq.app = aeq.extend(
      {},
      {
        ensureSecurityPrefEnabled: function () {
          if (!aeq.app.securityPrefEnabled()) {
            if (
              confirm(
                'This script requires access to write files.\nGo to the "General" panel of the application preferences and ensure\n"Allow Scripts to Write Files and Access Network" is checked.\n\nOpen prefs now?',
              )
            ) {
              app.executeCommand(2359);
            }
            if (!aeq.app.securityPrefEnabled()) {
              throw new Error(
                "Security preference is not enabled! Can\'t continue.",
              );
            }
          }
        },
        extend: aeq.extend,
        getAEP: function () {
          return app.project.file;
        },
        getAEPDir: function () {
          var i = aeq.app.getAEP();
          if (!i) {
            return null;
          }
          return aeq.getFolder(i.path);
        },
        getAEPName: function () {
          var i = aeq.app.getAEP();
          if (!i) {
            return null;
          }
          return aeq.file.stripExtension(i.displayName);
        },
        getPresetsPaths: function () {
          var i = aeq.app.version;
          var n = "";
          if (parseInt(i) == 11) {
            n = "CS6";
          } else if (parseInt(i) == 12) {
            n = "CC";
          } else if (i >= 13 && i < 13.5) {
            n = "CC 2014";
          } else if (i >= 13.5 && i < 14) {
            n = "CC 2015";
          } else {
            if (i >= 14) {
              n = "CC 2017";
            }
          }
          return [
            Folder.current.fullName + "/Presets/",
            Folder.myDocuments.fullName +
              "/Adobe/After Effects " +
              n +
              "/User Presets/",
          ];
        },
        getScriptFile: function () {
          return aeq.getFile($.fileName);
        },
        getUserDataFolder: function () {
          return Folder.userData;
        },
        open: function (i) {
          var n = aeq.getFile(i);
          if (n) {
            return app.open(n);
          }
          return app.open();
        },
        securityPrefEnabled: function () {
          return (
            app.preferences.getPrefAsLong(
              "Main Pref Section",
              "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
            ) == 1
          );
        },
        toString: function () {
          return "[object aeq.App]";
        },
        version: parseFloat(app.version),
      },
    );
    aeq.open = aeq.app.open;
    aeq.AEversion = aeq.app.version;
    aeq.command = aeq.extend(
      {},
      {
        call: function (i, n, j) {
          if (aeq.isObject(arguments[0])) {
            var k = arguments[0];
            i = E(k.win, k.windows);
            n = E(k.mac, k.osx);
            j = k.arg;
          }
          var I = n;
          if (aeq.isWindows) {
            I = i;
          }
          j = j !== undefined ? " " + j : "";
          return system.callSystem(I + j);
        },
        copyToClipboard: function (i) {
          aeq.command.call(
            'cmd.exe /c cmd.exe /c "echo ' + i + ' | clip"',
            'echo "' + i + '" | pbcopy',
          );
        },
        extend: aeq.extend,
        openURL: function (i) {
          try {
            if (i.match(/^https?:\/\//) === null) {
              i = "http://" + i;
            }
            aeq.command.call({ arg: i, mac: "open", win: 'cmd /c "explorer' });
          } catch (i) {
            alert("Error in openURL function\n" + i.toString());
          }
        },
        revealFile: function (i) {
          if (aeq.isFile(i)) {
            i = i.fsName;
          }
          return aeq.command.call(
            "Explorer /select,",
            "open -R",
            '"' + i + '"',
          );
        },
        toString: function () {
          return "[object aeq.command]";
        },
      },
    );
    aeq.callSystem = aeq.command.call;
    aeq.openURL = aeq.command.openURL;
    aeq.revealFile = aeq.command.revealFile;
    aeq.copyToClipboard = aeq.command.copyToClipboard;
    aeq.comp = aeq.extend(
      {},
      {
        create: function (i, n) {
          if (!aeq.isFolderItem(i)) {
            n = E(i, {});
            i = E(n.folder, app.project);
          }
          var j = {
            duration: 1,
            frameRate: 24,
            height: 1080,
            name: "Comp",
            pixelAspect: 1,
            width: 1920,
          };
          n = aeq.extend(j, n);
          return i.items.addComp(
            n.name,
            n.width,
            n.height,
            n.pixelAspect,
            n.duration,
            n.frameRate,
          );
        },
        extend: aeq.extend,
        getCompInQueue: function (n, i) {
          if (aeq.isNullOrUndefined(i)) {
            i = true;
          }
          if (i) {
            j = aeq.renderqueue.getQueuedItems();
          } else {
            j = aeq.renderqueue.getRQItems();
          }
          return aeq.filter(j, function (i) {
            return i.comp.id == n.id;
          });
        },
        isInQueue: function (n) {
          if (!aeq.isComp(n)) {
            return null;
          }
          var i = aeq.renderqueue.getRQItems();
          return i.exists(function (i) {
            return i.comp.id == n.id;
          });
        },
        isQueued: function (i) {
          return aeq.comp.getCompInQueue(i, true).length > 0;
        },
        toString: function () {
          return "[object aeq.comp]";
        },
      },
    );
    aeq.file = aeq.extend(
      {},
      {
        ensureFolderExists: function (i) {
          var n = aeq.getFolderObject(i);
          if (!n.exists) {
            n.create();
          }
          return n;
        },
        extend: aeq.extend,
        getExtension: function (i) {
          var n = aeq.isFile(i) ? i.name : i;
          return n.substr(n.lastIndexOf(".") + 1, n.length);
        },
        getFile: function (i) {
          var n = aeq.getFileObject(i);
          if (!n.exists) {
            return null;
          }
          return n;
        },
        getFileObject: function (i) {
          return aeq.isFile(i) ? i : new File(i);
        },
        getFiles: function (i, n) {
          n = E(n, "");
          var j = aeq.getFolder(i);
          k = j.getFiles(n);
          if (k === null || k.length === 0) {
            return null;
          }
          return aeq.arrayEx(k);
        },
        getFolder: function (i) {
          var n = aeq.getFolderObject(i);
          if (!n.exists) {
            return null;
          }
          return n;
        },
        getFolderObject: function (i) {
          return aeq.isFolder(i) ? i : new Folder(i);
        },
        joinPath: function () {
          var i = Array.prototype.slice.call(arguments, 0);
          return aeq.file.normalizePath(
            aeq
              .filter(i, function (i, n) {
                if (typeof i !== "string") {
                  throw new TypeError("Arguments to path.join must be strings");
                }
                return i;
              })
              .join(aeq.file.pathSeparatorSymbol),
          );
        },
        normalizePath: function (i) {
          var n = aeq.file.pathIsAbsolute(i);
          var j = i.substr(-1) === aeq.file.pathSeparatorSymbol;
          i = aeq.file
            .normalizePathArray(
              aeq.filter(i.split(aeq.file.pathSeparatorSymbol), function (i) {
                return !!i;
              }),
              !n,
            )
            .join(aeq.file.pathSeparatorSymbol);
          if (!i && !n) {
            i = ".";
          }
          if (i && j) {
            i += aeq.file.pathSeparatorSymbol;
          }
          return n ? aeq.file.pathSeparatorSymbol : "" + i;
        },
        normalizePathArray: function (i, n) {
          var j = 0;
          for (var k = i.length - 1; k >= 0; k--) {
            var I = i[k];
            if (I === ".") {
              i.splice(k, 1);
            } else if (I === "..") {
              i.splice(k, 1);
              j++;
            } else {
              if (j) {
                i.splice(k, 1);
                j--;
              }
            }
          }
          if (n) {
            for (; j--; j) {
              i.unshift("..");
            }
          }
          return i;
        },
        pathIsAbsolute: function (i) {
          return i.charAt(0) === aeq.file.pathSeparatorSymbol;
        },
        pathSeparatorSymbol: $.os.indexOf("Windows") > -1 ? "\\" : "/",
        readFile: function (i, n) {
          var j = aeq.getFileObject(i);
          n = E(n, "UTF-8");
          if (j.exists) {
            if (File.isEncodingAvailable(n)) {
              j.encoding = n;
            }
            j.open();
            k = j.read();
            j.close();
            return k;
          }
          return null;
        },
        stripExtension: function (i) {
          var n = aeq.isFile(i) ? i.name : i;
          return n.substr(0, n.lastIndexOf("."));
        },
        toString: function () {
          return "[object aeq.file]";
        },
        writeFile: function (i, n, j) {
          var k = aeq.getFileObject(i);
          j = aeq.setDefault(j, {});
          if (k.exists && j.overwrite === false) {
            return null;
          }
          if (!k.exists) {
            aeq.file.ensureFolderExists(k.path);
          }
          if (
            !aeq.isNullOrUndefined(j.encoding) &&
            File.isEncodingAvailable(j.encoding)
          ) {
            k.encoding = j.encoding;
          }
          k.open("w");
          var I = k.write(n);
          k.close();
          if (I) {
            return k;
          }
          return null;
        },
      },
    );
    aeq.pathSeparatorSymbol = aeq.file.pathSeparatorSymbol;
    aeq.getFileObject = aeq.file.getFileObject;
    aeq.getFolderObject = aeq.file.getFolderObject;
    aeq.getFile = aeq.file.get = aeq.file.getFile;
    aeq.getFiles = aeq.file.getFiles;
    aeq.getFolder = aeq.file.getFolder;
    aeq.readFile = aeq.file.readFile;
    aeq.writeFile = aeq.file.writeFile;
    aeq.layer = aeq.extend(
      {},
      {
        allChildren: function (i) {
          var n = [];
          var j = aeq.layer.children(i);
          aeq.forEach(j, function (i) {
            n.push(i);
            n = n.concat(aeq.layer.allChildren(i));
          });
          return aeq.arrayEx(n);
        },
        children: function (n) {
          var i = aeq.getLayers(n.containingComp);
          return i.filter(function (i) {
            return i.parent === n;
          });
        },
        extend: aeq.extend,
        parents: function (i) {
          var n = aeq.arrayEx();
          var j = i;
          while (j.parent !== null) {
            n.push(j.parent);
            j = j.parent;
          }
          return n;
        },
        relatedLayers: function (i) {
          var n = aeq.layer.parents(i);
          var j = aeq.layer.allChildren(i);
          var k = n.push.apply(n, j);
          return aeq.arrayEx(k);
        },
        setLayerToggles: function (n, j) {
          var i =
            "enabled solo shy quality effectsActive motionBlur adjustmentLayer threeDLayer blendingMode preserveTransparency parent inPoint stretch startTime outPoint label guideLayer name comment autoOrient";
          i = i.split(" ");
          aeq.forEach(i, function (i) {
            j[i] = n[i];
          });
        },
        toString: function () {
          return "[object aeq.layer]";
        },
      },
    );
    aeq.project = aeq.extend(
      {},
      {
        extend: aeq.extend,
        findFolder: function (n, i) {
          var j = aeq.project.getFolders(i);
          var k = aeq.filter(j, function (i) {
            return i.name == n;
          });
          if (k.length) {
            return k[0];
          }
          return null;
        },
        getFolder: function (i, n) {
          if (aeq.isFolderItem(i)) {
            return i;
          }
          if (aeq.isString(i)) {
            return aeq.project.findFolder(i, n);
          }
          return null;
        },
        getFolderOrRoot: function (i) {
          i = aeq.project.getFolder(i);
          if (aeq.isNullOrUndefined(i)) {
            return app.project.rootFolder;
          }
          return i;
        },
        getFolders: function (i) {
          var n = aeq.getItems(i);
          return n.filter(aeq.isFolderItem);
        },
        getFootage: function () {
          var i = aeq.getItems();
          return aeq.filter(i, aeq.isFootageItem);
        },
        getOrCreateFolder: function (i, n) {
          if (aeq.isNullOrUndefined(n)) {
            n = app.project.rootFolder;
          } else {
            n = aeq.project.getOrCreateFolder(n);
          }
          var j = aeq.project.getFolder(i, n);
          if (aeq.isNullOrUndefined(j)) {
            return n.items.addFolder(i);
          }
          return j;
        },
        getSelectedComps: function () {
          return aeq.filter(app.project.selection, aeq.isComp);
        },
        getSelectedFolders: function () {
          return aeq.filter(app.project.selection, aeq.isFolderItem);
        },
        getSelectedFootage: function () {
          return aeq.filter(app.project.selection, aeq.isFootageItem);
        },
        importFile: function (i, n, j) {
          var k = app.project;
          var A = aeq.getFile(i);
          if (!aeq.isFile(A)) {
            throw new Error(i + " is not a valid file!");
          }
          if (aeq.isNullOrUndefined(n)) {
            n = app.project.rootFolder;
          } else {
            n = aeq.project.getOrCreateFolder(n);
          }
          j = E(j, {});
          var h = new ImportOptions(A);
          if (j.sequence === true) {
            h.sequence = true;
          }
          try {
            I = k.importFile(h);
          } catch (i) {
            throw new Error("Can\'t import file " + A.name + "\n" + String(i));
          }
          if (I.duration * I.frameRate == 1) {
            I.replace(i);
          }
          I.parentFolder = n;
          I.selected = false;
          return I;
        },
        importFiles: function (i, j, k) {
          var I = aeq.arrayEx();
          aeq.forEach(i, function (i) {
            var n = aeq.importFile(i, j, k);
            I.push(n);
          });
          return I;
        },
        importSequence: function (i, n) {
          return aeq.importFile(i, n, { sequence: true });
        },
        moveToFolder: function (i, n) {
          n = aeq.project.getFolder(n);
          if (!aeq.isArray(i)) {
            i = [i];
          }
          aeq.forEach(i, function (i) {
            i.parentFolder = n;
            i.selected = false;
          });
        },
        quickSave: function () {
          var i = aeq.app.getAEP();
          return app.project.save(i);
        },
        reduceToQueuedComps: function () {
          var i = aeq.renderqueue.getQueuedComps();
          if (i.length === 0) {
            return null;
          }
          app.project.reduceProject(i);
          return i;
        },
        save: function (i) {
          if (!i) {
            return app.project.save();
          }
          var n = aeq.getFileObject(i);
          if (n.exists) {
            if (!confirm("File exists! Overwrite?")) {
              return null;
            }
          }
          return app.project.save(n);
        },
        simpleImportFile: function (n, i) {
          var j = new ImportOptions(n);
          i = E(i, {});
          if (i.sequence === true) {
            j.sequence = true;
          }
          try {
            newItem = app.project.importFile(j);
          } catch (i) {
            throw new Error("Can\'t import file " + n.name + "\n" + String(i));
          }
          return newItem;
        },
        toString: function () {
          return "[object aeq.project]";
        },
      },
    );
    aeq.save = aeq.project.save;
    aeq.quickSave = aeq.project.quickSave;
    aeq.importFile = aeq.project.importFile;
    aeq.importFiles = aeq.project.importFiles;
    aeq.importSequence = aeq.project.importSequence;
    aeq.property = aeq.extend(
      {},
      {
        extend: aeq.extend,
        getLayer: function (i) {
          var n = i.propertyDepth;
          return i.propertyGroup(n);
        },
        toString: function () {
          return "[object aeq.property]";
        },
        type: function (i) {
          return aeq.valueInObject(i.propertyType || i, PropertyType);
        },
        valueType: function (i) {
          return aeq.valueInObject(i.propertyValueType || i, PropertyValueType);
        },
      },
    );
    aeq.prop = aeq.property;
    aeq.renderqueue = aeq.extend(
      {},
      {
        clear: function () {
          var i = aeq.renderqueue.getRQItems();
          i = i.reverse();
          i.forEach(function (i) {
            i.remove();
          });
        },
        ensureRenderPathExists: function (i) {
          aeq.app.ensureSecurityPrefEnabled();
          aeq.file.ensureFolderExists(i.file.parent);
        },
        extend: aeq.extend,
        getQueuedComps: function () {
          var i = aeq.renderqueue.getQueuedItems();
          var k = {};
          var I = [];
          i.forEach(function (i) {
            var n = i.comp;
            var j = n.id;
            if (k[j] === undefined) {
              k[j] = true;
              I.push(n);
            }
          });
          return aeq.arrayEx(I);
        },
        getQueuedItems: function () {
          var i = aeq.renderqueue.getRQItems();
          return item.filter(function (i) {
            return aeq.renderqueue.isQueued(i);
          });
        },
        getRQComps: function () {
          var i = aeq.renderqueue.getRQItems();
          var k = {};
          var I = [];
          i.forEach(function (i) {
            var n = i.comp;
            var j = n.id;
            if (k[j] === undefined) {
              k[j] = true;
              I.push(n);
            }
          });
          return aeq.arrayEx(I);
        },
        getRQItems: function () {
          return aeq.arrayEx(
            aeq.normalizeCollection(app.project.renderQueue.items),
          );
        },
        getSettings: function (i) {
          return i.getSettings(GetSettingsFormat.STRING);
        },
        isQueued: function (i) {
          return i.status == RQItemStatus.QUEUED;
        },
        omTemplateExists: function (n) {
          var i = aeq.comp.create();
          var j = aeq.renderqueue.queue(i);
          var k = aeq.arrayEx(j.outputModule(1).templates);
          var I = k.exists(function (i) {
            return i == n;
          });
          j.remove();
          i.remove();
          return I;
        },
        queue: function (i) {
          return app.project.renderQueue.items.add(i);
        },
        rqTemplateExists: function (n) {
          var i = aeq.comp.create();
          var j = aeq.renderqueue.queue(i);
          var k = aeq.arrayEx(j.templates);
          var I = k.exists(function (i) {
            return i == n;
          });
          j.remove();
          i.remove();
          return I;
        },
        toString: function () {
          return "[object aeq.RenderQueue]";
        },
        unqueue_all: function () {
          var i = aeq.renderqueue.getRQItems();
          i.forEach(function (i) {
            if (
              i.status != RQItemStatus.USER_STOPPED &&
              i.status != RQItemStatus.ERR_STOPPED &&
              i.status != RQItemStatus.RENDERING &&
              i.status != RQItemStatus.DONE
            ) {
              i.render = false;
            }
          });
        },
      },
    );
    aeq.settings = aeq.extend(
      {},
      {
        extend: aeq.extend,
        get: function (i, n) {
          if (aeq.settings.have(i, n)) {
            return app.settings.getSetting(i, n);
          }
          return undefined;
        },
        getAsArray: function (i, n) {
          return aeq.settings.get(i, n).split(",");
        },
        getAsBool: function (i, n) {
          var j = aeq.settings.get(i, n);
          if (j === "true") {
            return true;
          } else {
            if (j === "false") {
              return false;
            }
          }
          return undefined;
        },
        getAsFloat: function (i, n) {
          return parseFloat(aeq.settings.get(i, n));
        },
        getAsInt: function (i, n) {
          return parseInt(aeq.settings.get(i, n));
        },
        have: function (i, n) {
          return app.settings.haveSetting(i, n);
        },
        initSetting: function (i, n, j, k) {
          k = E(k, false);
          if (!aeq.settings.have(i, n) || k) {
            aeq.settings.save(i, n, j);
          }
          return aeq.settings.get(i, n);
        },
        save: function (i, n, j) {
          app.settings.saveSetting(i, n, j);
        },
        setting: function (i, n, j) {
          if (j !== undefined) {
            aeq.settings.save(i, n, j);
            return aeq;
          }
          return aeq.settings.get(i, n);
        },
        toString: function () {
          return "[object aeq.settings]";
        },
        unpack: function (n, i) {
          j = aeq.isObject(i) ? i : {};
          aeq.forEach(i, function (i) {
            if (app.settings.haveSetting(n, i)) {
              j[i] = app.settings.getSetting(n, i);
            }
          });
          return j;
        },
      },
    );
    aeq.saveSetting = aeq.setSetting = aeq.settings.set = aeq.settings.save;
    aeq.getSetting = aeq.settings.get;
    aeq.getSettingAsBool = aeq.settings.getAsBool;
    aeq.getSettingAsArray = aeq.settings.getAsArray;
    aeq.getSettingAsFloat = aeq.settings.getAsFloat;
    aeq.getSettingAsInt = aeq.settings.getAsInt;
    aeq.haveSetting = aeq.settings.have;
    aeq.unpackSettings =
      aeq.loadSettings =
      aeq.settings.load =
        aeq.settings.unpack;
    aeq.snippet = aeq.extend(
      {},
      {
        activeComp: function (i, n) {
          var j = I();
          if (j === null) {
            return false;
          }
          return aeq.createUndoGroup(i, n, [j]);
        },
        extend: aeq.extend,
        forEachSelectedLayer: function (i, n) {
          return aeq.snippet.selectedLayers(i, function (i) {
            i.forEach(n);
            return i;
          });
        },
        forEachSelectedLayerOrAll: function (i, n) {
          return aeq.snippet.selectedLayersOrAll(i, function (i) {
            i.forEach(n);
            return i;
          });
        },
        forEachSelectedProperty: function (i, n) {
          return aeq.snippet.selectedProperties(i, function (i) {
            i.forEach(n);
            return i;
          });
        },
        selectedLayers: function (i, n) {
          var j = I();
          if (j === null) {
            return false;
          }
          var k = J(j);
          if (k === null) {
            return false;
          }
          k = aeq.arrayEx(k);
          return aeq.createUndoGroup(i, n, [k, j]);
        },
        selectedLayersOrAll: function (i, n) {
          var j = I();
          if (j === null) {
            return false;
          }
          var k = aeq.getSelectedLayersOrAll(j);
          k = aeq.arrayEx(k);
          return aeq.createUndoGroup(i, n, [k, j]);
        },
        selectedProperties: function (i, n) {
          var j = I();
          if (j === null) {
            return false;
          }
          var k = L(j);
          if (k === null) {
            return false;
          }
          k = aeq.arrayEx(k);
          return aeq.createUndoGroup(i, n, [k, j]);
        },
        toString: function () {
          return "[object aeq.snippet]";
        },
      },
    );
    aeq.arrayEx = function (i) {
      i = E(i, []);
      if (i._init) {
        return i;
      }
      i._init = true;
      i.isAeq = true;
      aeq.extend(i, n);
      return i;
    };
    var n = {
      attr: function () {
        [].unshift.call(arguments, this);
        return aeq.attr.apply(this, arguments);
      },
      exists: function (i) {
        var n = this.length;
        for (var j = 0; j < n; j += 1) {
          if (i(this[j], j, this)) {
            return true;
          }
        }
        return false;
      },
      filter: function (i) {
        var n = [];
        var j = this.length;
        for (var k = 0; k < j; k += 1) {
          if (i(this[k], k, this)) {
            n.push(this[k]);
          }
        }
        return aeq.arrayEx(n);
      },
      find: function (i, n) {
        var j = this.length;
        for (var k = 0; k < j; k += 1) {
          if (i(this[k], k, this)) {
            return this[k];
          }
        }
        return n;
      },
      first: function () {
        if (this.length === 0) {
          throw new Error("There are no items in this array");
        }
        return this[0];
      },
      forEach: function (i) {
        var n = this.length;
        for (var j = 0; j < n; j += 1) {
          i(this[j], j, this);
        }
      },
      indexOf: function (i, n) {
        if (this === null) {
          throw new TypeError('"this" is null or not defined');
        }
        var k = Object(this);
        var I = k.length >>> 0;
        if (I === 0) {
          return -1;
        }
        var A = n || 0;
        if (Math.abs(A) === Infinity) {
          A = 0;
        }
        if (A >= I) {
          return -1;
        }
        j = Math.max(A >= 0 ? A : I - Math.abs(A), 0);
        while (j < I) {
          if (j in k && k[j] === i) {
            return j;
          }
          j++;
        }
        return -1;
      },
      insertAt: function (i, n) {
        this.splice(n, 0, i);
      },
      isTrueForAll: function (i) {
        var n = this.length;
        for (var j = 0; j < n; j += 1) {
          if (!i(this[j], j, this)) {
            return false;
          }
        }
        return true;
      },
      map: function (i) {
        var n = {};
        var j = this.length;
        for (var k = 0; k < j; k += 1) {
          var I = i(this[k], k, this);
          n[I.key] = I.value;
        }
        return n;
      },
      select: function (i) {
        var n = [];
        var j = this.length;
        for (var k = 0; k < j; k += 1) {
          n.push(i(this[k], k, this));
        }
        return aeq.arrayEx(n);
      },
    };
    aeq.Comp = function (i) {
      if (i instanceof aeq.Comp) {
        return i;
      }
      if (this instanceof aeq.Comp) {
        this.comp = i;
      } else {
        return new aeq.Comp(i);
      }
    };
    aeq.Comp.prototype = {
      extend: aeq.extend,
      forEachLayer: function (i) {
        var n = this.comp.numLayers;
        var j = 1;
        for (; j <= n; j++) {
          i(this.comp.layer(j), j, this);
        }
      },
      get: function () {
        return this.comp;
      },
      isAeq: true,
      toString: function () {
        return "[object aeq.Comp]";
      },
    };
    aeq.Key = function (i, n) {
      if (this instanceof aeq.Key) {
        if (i instanceof aeq.Property) {
          i = i.get();
        }
        if (n <= 0 || n > i.numKeys) {
          throw new Error("Index " + n + " out of range 1-" + i.numKeys);
        }
        this.property = i;
        this.index = n;
        this.originalTime = this.getTime();
      } else {
        return new aeq.Key(i, n);
      }
    };
    aeq.Key.prototype = {
      checkKey: function () {
        if (
          this.index <= this.property.numKeys &&
          this.getTime() === this.originalTime
        ) {
          return;
        }
        var i = this.property.nearestKeyIndex(this.originalTime);
        if (this.property.keyTime(i) === this.originalTime) {
          this.index = i;
        } else {
          throw new Error("Original key has been deleted/moved");
        }
      },
      copyTo: function (i, n) {
        var j = this.getKeyinfo();
        j.time = n !== undefined ? n : j.time;
        if (i.isAeq) {
          i = i.get();
        }
        j.property = i;
        return aeq.pasteKey(j);
      },
      extend: aeq.extend,
      getKeyinfo: function () {
        this.checkKey();
        var i = {
          interpolationType: this.interpolationType(),
          property: this.property,
          time: this.time(),
          value: this.value(),
        };
        if (
          i.interpolationType.inType === KeyframeInterpolationType.BEZIER &&
          i.interpolationType.outType === KeyframeInterpolationType.BEZIER
        ) {
          i.temporalAutoBezier = this.temporalAutoBezier();
          i.temporalContinuous = this.temporalContinuous();
        }
        if (i.interpolationType.outType !== KeyframeInterpolationType.HOLD) {
          i.temporalEase = this.temporalEase();
        }
        if (
          this.valueTypeIs("TwoD_SPATIAL") ||
          this.valueTypeIs("ThreeD_SPATIAL")
        ) {
          i.spatialAutoBezier = this.spatialAutoBezier();
          i.spatialContinuous = this.spatialContinuous();
          i.spatialTangent = this.spatialTangent();
          i.roving = this.roving();
        }
        return i;
      },
      getTime: function () {
        return this.property.keyTime(this.index);
      },
      interpolationType: function (i, n) {
        this.checkKey();
        if (arguments.length === 0) {
          return {
            inType: this.property.keyInInterpolationType(this.index),
            outType: this.property.keyOutInterpolationType(this.index),
          };
        }
        if (n === undefined && i.outType) {
          n = i.outType;
        }
        if (i.inType) {
          i = i.inType;
        }
        if (aeq.isString(i)) {
          i = KeyframeInterpolationType[i];
        }
        if (n && aeq.isString(n)) {
          n = KeyframeInterpolationType[n];
        } else {
          if (n === undefined) {
            n = i;
          }
        }
        if (
          (!this.property.isInterpolationTypeValid(i) || n) &&
          !this.property.isInterpolationTypeValid(n)
        ) {
          return false;
        }
        this.property.setInterpolationTypeAtKey(this.index, i, n);
        return true;
      },
      isAeq: true,
      moveTo: function (i) {
        var n = this.time();
        if (i === n) {
          return;
        }
        var j = this.copyTo(this.property, i);
        this.remove();
        this.index = this.property.nearestKeyIndex(j.time());
        this.originalTime = i;
      },
      remove: function () {
        this.checkKey();
        this.property.removeKey(this.index);
      },
      spatialTangent: function (i, n) {
        this.checkKey();
        if (arguments.length === 0) {
          return {
            inTangent: this.property.keyInSpatialTangent(this.index),
            outTangent: this.property.keyOutSpatialTangent(this.index),
          };
        }
        if (n === undefined && i.outTangent) {
          n = i.outTangent;
        }
        if (i.inTangent) {
          i = i.inTangent;
        }
        this.property.setSpatialTangentsAtKey(this.index, i, n);
      },
      temporalEase: function (i, n) {
        this.checkKey();
        if (arguments.length === 0) {
          return {
            inEase: this.property.keyInTemporalEase(this.index),
            outEase: this.property.keyOutTemporalEase(this.index),
          };
        }
        if (n === undefined && i.outEase) {
          n = i.outEase;
        }
        if (i.inEase) {
          i = i.inEase;
        }
        if (!aeq.isArray(i)) {
          if (this.valueTypeIs("TwoD")) {
            i = [i, i];
          } else if (this.valueTypeIs("ThreeD")) {
            i = [i, i, i];
          } else {
            i = [i];
          }
        }
        if (n && !aeq.isArray(n)) {
          if (this.valueTypeIs("TwoD")) {
            n = [n, n];
          } else if (this.valueTypeIs("ThreeD")) {
            n = [n, n, n];
          } else {
            n = [n];
          }
        }
        this.property.setTemporalEaseAtKey(this.index, i, n);
      },
      time: function () {
        this.checkKey();
        return this.originalTime;
      },
      toString: function () {
        return "[object aeq.Key]";
      },
      valueTypeIs: function i(n) {
        return this.property.propertyValueType === PropertyValueType[n];
      },
    };
    aeq.forEach(
      [
        "roving",
        "selected",
        "spatialAutoBezier",
        "spatialContinuous",
        "temporalAutoBezier",
        "temporalContinuous",
        "value",
      ],
      function (i) {
        var n = i.charAt(0).toUpperCase() + i.slice(1);
        var j = "key" + n;
        var k = "set" + n + "AtKey";
        aeq.Key.prototype[i] = function () {
          this.checkKey();
          if (arguments.length === 0) {
            return this.property[j](this.index);
          }
          [].unshift.call(arguments, this.index);
          this.property[k].apply(this.property, arguments);
        };
      },
    );
    aeq.pasteKey = function (i) {
      var n = i.property.addKey(i.time);
      var j = new aeq.Key(i.property, n);
      j.value(i.value);
      if (i.temporalEase !== undefined) {
        j.temporalEase(i.temporalEase);
      }
      j.interpolationType(i.interpolationType);
      if (
        i.temporalAutoBezier !== undefined &&
        i.temporalContinuous !== undefined
      ) {
        j.temporalAutoBezier(i.temporalAutoBezier);
        j.temporalContinuous(i.temporalContinuous);
      }
      if (
        i.spatialAutoBezier !== undefined &&
        i.spatialContinuous !== undefined
      ) {
        j.spatialAutoBezier(i.spatialAutoBezier);
        j.spatialContinuous(i.spatialContinuous);
        j.spatialTangent(i.spatialTangent);
        j.roving(i.roving);
      }
      return j;
    };
    aeq.Layer = function (i) {
      if (i instanceof aeq.Layer) {
        return i;
      }
      if (this instanceof aeq.Layer) {
        this.layer = i;
      } else {
        return new aeq.Layer(i);
      }
    };
    aeq.Layer.prototype = {
      addEffect: function (i) {
        var n = this.layer.property("ADBE Effect Parade");
        if (n.canAddProperty(i)) {
          n.addProperty(i);
        } else {
          throw new Error('Can not add effect "' + i + '" to this layer');
        }
      },
      allChildren: function () {
        return aeq.layer.allChildren(this.layer);
      },
      children: function () {
        return aeq.layer.children(this.layer);
      },
      copyToComp: function (i) {
        if (!aeq.isComp(i)) {
          if (i instanceof aeq.Comp) {
            i = i.comp;
          } else {
            if (aeq.isString(i)) {
              i = aeq.getComp(i);
            }
          }
        }
        this.layer.copyToComp(i);
        return this;
      },
      extend: aeq.extend,
      forEachEffect: function (i) {
        var n = this.layer.property("ADBE Effect Parade");
        var j = n.numProperties;
        var k = 1;
        for (; k <= j; k++) {
          i(n.property(k), k, n);
        }
        return this;
      },
      get: function () {
        return this.layer;
      },
      isAeq: true,
      parent: function (i) {
        if (arguments.length === 0) {
          return this.layer.parent;
        }
        if (i === null) {
          this.layer.parent = null;
          return null;
        }
        var n = k(this.layer, i);
        if (n === null) {
          return null;
        }
        this.layer.parent = n;
        return n;
      },
      parents: function () {
        return aeq.layer.parents(this.layer);
      },
      relatedLayers: function () {
        return aeq.layer.relatedLayers(this.layer);
      },
      removeParent: function () {
        this.layer.parent = null;
        return this;
      },
      toString: function () {
        return "[object aeq.Layer]";
      },
    };
    aeq.forEach(
      [
        "active",
        "index",
        "isNameSet",
        "selectedProperties",
        "time",
        "containingComp",
        "hasVideo",
      ],
      function (i) {
        aeq.Layer.prototype[i] = function () {
          return this.layer[i];
        };
      },
    );
    aeq.forEach(
      [
        "comment",
        "enabled",
        "inPoint",
        "locked",
        "name",
        "outPoint",
        "shy",
        "solo",
        "startTime",
        "stretch",
      ],
      function (n) {
        aeq.Layer.prototype[n] = function (i) {
          if (arguments.length === 0) {
            return this.layer[n];
          }
          this.layer[n] = i;
          return this;
        };
      },
    );
    aeq.forEach(
      [
        "activeAtTime",
        "applyPreset",
        "duplicate",
        "remove",
        "moveToBeginning",
        "moveToEnd",
      ],
      function (n) {
        aeq.Layer.prototype[n] = function (i) {
          this.layer[n](i);
          return this;
        };
      },
    );
    aeq.forEach(["setParentWithJump", "moveAfter", "moveBefore"], function (j) {
      aeq.Layer.prototype[j] = function (i) {
        var n = k(this.layer, i);
        if (n === null) {
          return null;
        }
        this.layer[j](n);
        return n;
      };
    });
    var l = /^(\+|-)=/;
    aeq.Property = function (i) {
      if (i instanceof aeq.Property) {
        return i;
      }
      if (this instanceof aeq.Property) {
        this.property = i;
      } else {
        return new aeq.Property(i);
      }
    };
    aeq.Property.prototype = {
      addKey: function (i) {
        var n = this.property.addKey(i);
        return this.key(n);
      },
      expression: function (i) {
        if (!this.property.canSetExpression) {
          return false;
        }
        if (arguments.length === 0) {
          return this.property.expression;
        }
        this.property.expression = i;
        if (
          this.property.expressionError === "" &&
          (this.property.expressionEnabled || i === "")
        ) {
          return true;
        }
        return this.property.expressionError;
      },
      extend: aeq.extend,
      forEachKey: function (i) {
        var n = this.property.numKeys;
        var j = 1;
        for (; j <= n; j++) {
          i(this.key(j), j, this.property);
        }
      },
      get: function () {
        return this.property;
      },
      isAeq: true,
      key: function (i) {
        return new aeq.Key(this.property, i);
      },
      maxValue: function () {
        if (this.property.hasMax) {
          return this.property.maxValue;
        }
        return null;
      },
      minValue: function () {
        if (this.property.hasMin) {
          return this.property.minValue;
        }
        return null;
      },
      nearestKeyIndex: function (i) {
        var n = this.property.nearestKeyIndex(i);
        return this.key(n);
      },
      removeKey: function (i) {
        if (aeq.isNumber(i)) {
          this.property.removeKey(i);
        } else {
          if (i.toString() === "[object aeq.Key]") {
            i.remove();
          }
        }
      },
      selectedKeys: function () {
        var i = [];
        for (var n = 1; n <= this.property.selectedKeys.length; n += 1) {
          i.push(this.key(n));
        }
        return i;
      },
      separationDimension: function () {
        if (this.property.isSeparationFollower) {
          return this.property.separationDimension;
        }
        return null;
      },
      separationFollower: function (i) {
        return this.property.getSeparationFollower(i);
      },
      separationLeader: function () {
        if (this.property.isSeparationFollower) {
          return this.property.separationLeader;
        }
        return null;
      },
      toString: function () {
        return "[object aeq.Property]";
      },
      value: function (i) {
        if (arguments.length === 0) {
          return this.property.value;
        }
        this.property.setValue(i);
      },
      valueAtTime: function (i, n) {
        if (arguments.length === 1) {
          return this.property.valueAtTime(i);
        }
        this.property.setValueAtTime(i, n);
        return this.nearestKeyIndex(i);
      },
      valuesAtTimes: function (i, n) {
        var j = [];
        var k = 0;
        var I = i.length;
        if (arguments.length === 1) {
          for (; k < I; k++) {
            j.push(this.property.valueAtTime(i[k]));
          }
          return j;
        }
        this.property.setValuesAtTimes(i, n);
        for (; k < I; k++) {
          j.push(this.nearestKeyIndex(i[k]));
        }
        return j;
      },
    };
    aeq.forEach(
      [
        "expressionError",
        "isTimeVarying",
        "numKeys",
        "canSetExpression",
        "canVaryOverTime",
        "isSpatial",
        "isSeparationFollower",
        "isSeparationLeader",
        "propertyIndex",
        "propertyValueType",
        "unitsText",
      ],
      function (i) {
        aeq.Property.prototype[i] = function () {
          return this.property[i];
        };
      },
    );
    return aeq;
  })();
  var cssselector = (function () {
    function i(i, n) {
      function j() {
        this.constructor = i;
      }
      j.prototype = n.prototype;
      i.prototype = new j();
    }
    function Vj(i, n, j, k) {
      this.message = i;
      this.expected = n;
      this.found = j;
      this.location = k;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, Vj);
      }
    }
    function n(B) {
      function en() {
        return B.substring(Nn, ln);
      }
      function Cn() {
        return Tn(Nn, ln);
      }
      function Un(i) {
        throw Sn(
          null,
          [{ description: i, type: "other" }],
          B.substring(Nn, ln),
          Tn(Nn, ln),
        );
      }
      function Vn(i) {
        throw Sn(i, null, B.substring(Nn, ln), Tn(Nn, ln));
      }
      function dn(i) {
        var n = Dn[i];
        if (n) {
          return n;
        } else {
          j = i - 1;
          while (!Dn[j]) {
            j--;
          }
          n = Dn[j];
          n = { column: n.column, line: n.line, seenCR: n.seenCR };
          while (j < i) {
            k = B.charAt(j);
            if (k === "\n") {
              if (!n.seenCR) {
                n.line++;
              }
              n.column = 1;
              n.seenCR = false;
            } else if (k === "\r" || k === "\u2028" || k === "\u2029") {
              n.line++;
              n.column = 1;
              n.seenCR = true;
            } else {
              n.column++;
              n.seenCR = false;
            }
            j++;
          }
          Dn[i] = n;
          return n;
        }
      }
      function Tn(i, n) {
        var j = dn(i);
        var k = dn(n);
        return {
          end: { column: k.column, line: k.line, offset: n },
          start: { column: j.column, line: j.line, offset: i },
        };
      }
      function Gn(i) {
        if (ln < Qn) {
          return;
        }
        if (ln > Qn) {
          Qn = ln;
          Mn = [];
        }
        Mn.push(i);
      }
      function Sn(i, n, j, k) {
        function I(i) {
          var n = 1;
          i.sort(function (i, n) {
            if (i.description < n.description) {
              return -1;
            } else if (i.description > n.description) {
              return 1;
            } else {
              return 0;
            }
          });
          while (n < i.length) {
            if (i[n - 1] === i[n]) {
              i.splice(n, 1);
            } else {
              n++;
            }
          }
        }
        function A(i, n) {
          function j(i) {
            function n(i) {
              return i.charCodeAt(0).toString(16).toUpperCase();
            }
            return i
              .replace(/\\/g, "\\\\")
              .replace(/"/g, '\\"')
              .replace(/\x08/g, "\\b")
              .replace(/\t/g, "\\t")
              .replace(/\n/g, "\\n")
              .replace(/\f/g, "\\f")
              .replace(/\r/g, "\\r")
              .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (i) {
                return "\\x0" + n(i);
              })
              .replace(/[\x10-\x1F\x80-\xFF]/g, function (i) {
                return "\\x" + n(i);
              })
              .replace(/[\u0100-\u0FFF]/g, function (i) {
                return "\\u0" + n(i);
              })
              .replace(/[\u1000-\uFFFF]/g, function (i) {
                return "\\u" + n(i);
              });
          }
          var k = new Array(i.length);
          for (var h = 0; h < i.length; h += 1) {
            k[h] = i[h].description;
          }
          I =
            i.length > 1
              ? k.slice(0, -1).join(", ") + " or " + k[i.length - 1]
              : k[0];
          A = n ? '"' + j(n) + '"' : "end of input";
          return "Expected " + I + " but " + A + " found.";
        }
        if (n !== null) {
          I(n);
        }
        return new Vj(i !== null ? i : A(n, j), n, j, k);
      }
      function Zn() {
        i = Wn();
        return i;
      }
      function On() {
        i = ln;
        if (B.charCodeAt(ln) === 91) {
          n = E;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(F);
          }
        }
        if (n !== m) {
          j = [];
          k = cn();
          while (k !== m) {
            j.push(k);
            k = cn();
          }
          if (j !== m) {
            if (B.charCodeAt(ln) === 93) {
              k = J;
              ln++;
            } else {
              k = m;
              if (Yn === 0) {
                Gn(L);
              }
            }
            if (k !== m) {
              Nn = i;
              n = I(j);
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function an() {
        i = ln;
        if (B.charCodeAt(ln) === 40) {
          n = A;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(h);
          }
        }
        if (n !== m) {
          j = [];
          k = cn();
          while (k !== m) {
            j.push(k);
            k = cn();
          }
          if (j !== m) {
            if (B.charCodeAt(ln) === 41) {
              k = f;
              ln++;
            } else {
              k = m;
              if (Yn === 0) {
                Gn(l);
              }
            }
            if (k !== m) {
              Nn = i;
              n = I(j);
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function cn() {
        i = bn();
        if (i === m) {
          i = Kn();
        }
        return i;
      }
      function Kn() {
        i = ln;
        n = [];
        if (N.test(B.charAt(ln))) {
          j = B.charAt(ln);
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(D);
          }
        }
        if (j !== m) {
          while (j !== m) {
            n.push(j);
            if (N.test(B.charAt(ln))) {
              j = B.charAt(ln);
              ln++;
            } else {
              j = m;
              if (Yn === 0) {
                Gn(D);
              }
            }
          }
        } else {
          n = m;
        }
        if (n !== m) {
          j = Ej();
          if (j !== m) {
            Nn = i;
            n = Q(n);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function bn() {
        i = ln;
        n = [];
        if (N.test(B.charAt(ln))) {
          j = B.charAt(ln);
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(D);
          }
        }
        if (j !== m) {
          while (j !== m) {
            n.push(j);
            if (N.test(B.charAt(ln))) {
              j = B.charAt(ln);
              ln++;
            } else {
              j = m;
              if (Yn === 0) {
                Gn(D);
              }
            }
          }
        } else {
          n = m;
        }
        if (n !== m) {
          if (B.charCodeAt(ln) === 61) {
            j = M;
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(Y);
            }
          }
          if (j !== m) {
            k = Rn();
            if (k !== m) {
              I = Ej();
              if (I === m) {
                I = null;
              }
              if (I !== m) {
                Nn = i;
                n = P(n, k);
                i = n;
              } else {
                ln = i;
                i = m;
              }
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Hn() {
        i = ln;
        n = [];
        if (N.test(B.charAt(ln))) {
          j = B.charAt(ln);
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(D);
          }
        }
        if (j !== m) {
          while (j !== m) {
            n.push(j);
            if (N.test(B.charAt(ln))) {
              j = B.charAt(ln);
              ln++;
            } else {
              j = m;
              if (Yn === 0) {
                Gn(D);
              }
            }
          }
        } else {
          n = m;
        }
        if (n !== m) {
          j = On();
          if (j === m) {
            j = null;
          }
          if (j !== m) {
            k = [];
            I = Xn();
            while (I !== m) {
              k.push(I);
              I = Xn();
            }
            if (k !== m) {
              I = Ej();
              if (I === m) {
                I = null;
              }
              if (I !== m) {
                Nn = i;
                n = e(n, j, k);
                i = n;
              } else {
                ln = i;
                i = m;
              }
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Wn() {
        i = [];
        n = Hn();
        if (n !== m) {
          while (n !== m) {
            i.push(n);
            n = Hn();
          }
        } else {
          i = m;
        }
        return i;
      }
      function Xn() {
        i = ln;
        if (B.charCodeAt(ln) === 58) {
          n = C;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(U);
          }
        }
        if (n !== m) {
          j = [];
          if (N.test(B.charAt(ln))) {
            k = B.charAt(ln);
            ln++;
          } else {
            k = m;
            if (Yn === 0) {
              Gn(D);
            }
          }
          while (k !== m) {
            j.push(k);
            if (N.test(B.charAt(ln))) {
              k = B.charAt(ln);
              ln++;
            } else {
              k = m;
              if (Yn === 0) {
                Gn(D);
              }
            }
          }
          if (j !== m) {
            k = an();
            if (k === m) {
              k = null;
            }
            if (k !== m) {
              Nn = i;
              n = V(j, k);
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Rn() {
        i = gn();
        if (i === m) {
          i = tn();
          if (i === m) {
            i = vn();
            if (i === m) {
              i = hj();
              if (i === m) {
                i = Fj();
              }
            }
          }
        }
        return i;
      }
      function tn() {
        i = ln;
        n = pn();
        if (n !== m) {
          j = ln;
          Yn++;
          k = on();
          Yn--;
          if (k === m) {
            j = void 0;
          } else {
            ln = j;
            j = m;
          }
          if (j !== m) {
            Nn = i;
            n = d(n);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = ln;
          n = un();
          if (n !== m) {
            Nn = i;
            n = d(n);
          }
          i = n;
        }
        return i;
      }
      function gn() {
        i = ln;
        n = Bj();
        if (n !== m) {
          Nn = i;
          n = T();
        }
        i = n;
        if (i === m) {
          i = ln;
          n = mj();
          if (n !== m) {
            Nn = i;
            n = G();
          }
          i = n;
        }
        return i;
      }
      function rn() {
        if (B.charCodeAt(ln) === 48) {
          i = S;
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(Z);
          }
        }
        if (i === m) {
          i = ln;
          n = sn();
          if (n !== m) {
            j = [];
            k = on();
            while (k !== m) {
              j.push(k);
              k = on();
            }
            if (j !== m) {
              n = [n, j];
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        }
        return i;
      }
      function on() {
        if (O.test(B.charAt(ln))) {
          i = B.charAt(ln);
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(a);
          }
        }
        return i;
      }
      function sn() {
        if (c.test(B.charAt(ln))) {
          i = B.charAt(ln);
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(K);
          }
        }
        return i;
      }
      function un() {
        i = ln;
        n = rn();
        if (n !== m) {
          if (B.charCodeAt(ln) === 46) {
            j = b;
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(H);
            }
          }
          if (j !== m) {
            k = [];
            I = on();
            while (I !== m) {
              k.push(I);
              I = on();
            }
            if (k !== m) {
              Nn = i;
              n = W();
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = ln;
          if (B.charCodeAt(ln) === 46) {
            n = b;
            ln++;
          } else {
            n = m;
            if (Yn === 0) {
              Gn(H);
            }
          }
          if (n !== m) {
            j = [];
            k = on();
            if (k !== m) {
              while (k !== m) {
                j.push(k);
                k = on();
              }
            } else {
              j = m;
            }
            if (j !== m) {
              Nn = i;
              n = W();
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
          if (i === m) {
            i = ln;
            n = rn();
            if (n !== m) {
              Nn = i;
              n = X();
            }
            i = n;
          }
        }
        return i;
      }
      function pn() {
        i = ln;
        if (B.substr(ln, 2).toLowerCase() === R) {
          n = B.substr(ln, 2);
          ln += 2;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(t);
          }
        }
        if (n !== m) {
          j = ln;
          k = [];
          I = yn();
          if (I !== m) {
            while (I !== m) {
              k.push(I);
              I = yn();
            }
          } else {
            k = m;
          }
          if (k !== m) {
            j = B.substring(j, ln);
          } else {
            j = k;
          }
          if (j !== m) {
            Nn = i;
            n = g(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function yn() {
        if (r.test(B.charAt(ln))) {
          i = B.charAt(ln);
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(o);
          }
        }
        return i;
      }
      function vn() {
        i = ln;
        if (B.charCodeAt(ln) === 34) {
          n = s;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(u);
          }
        }
        if (n !== m) {
          j = [];
          k = zn();
          while (k !== m) {
            j.push(k);
            k = zn();
          }
          if (j !== m) {
            if (B.charCodeAt(ln) === 34) {
              k = s;
              ln++;
            } else {
              k = m;
              if (Yn === 0) {
                Gn(u);
              }
            }
            if (k !== m) {
              Nn = i;
              n = p(j);
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = ln;
          if (B.charCodeAt(ln) === 39) {
            n = y;
            ln++;
          } else {
            n = m;
            if (Yn === 0) {
              Gn(v);
            }
          }
          if (n !== m) {
            j = [];
            k = xn();
            while (k !== m) {
              j.push(k);
              k = xn();
            }
            if (j !== m) {
              if (B.charCodeAt(ln) === 39) {
                k = y;
                ln++;
              } else {
                k = m;
                if (Yn === 0) {
                  Gn(v);
                }
              }
              if (k !== m) {
                Nn = i;
                n = p(j);
                i = n;
              } else {
                ln = i;
                i = m;
              }
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        }
        return i;
      }
      function zn() {
        i = ln;
        n = ln;
        Yn++;
        if (B.charCodeAt(ln) === 34) {
          j = s;
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(u);
          }
        }
        if (j === m) {
          if (B.charCodeAt(ln) === 92) {
            j = z;
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(x);
            }
          }
          if (j === m) {
            j = Ij();
          }
        }
        Yn--;
        if (j === m) {
          n = void 0;
        } else {
          ln = n;
          n = m;
        }
        if (n !== m) {
          if (B.length > ln) {
            j = B.charAt(ln);
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(w);
            }
          }
          if (j !== m) {
            Nn = i;
            n = q();
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = ln;
          if (B.charCodeAt(ln) === 92) {
            n = z;
            ln++;
          } else {
            n = m;
            if (Yn === 0) {
              Gn(x);
            }
          }
          if (n !== m) {
            j = qn();
            if (j !== m) {
              Nn = i;
              n = _(j);
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
          if (i === m) {
            i = wn();
          }
        }
        return i;
      }
      function xn() {
        i = ln;
        n = ln;
        Yn++;
        if (B.charCodeAt(ln) === 39) {
          j = y;
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(v);
          }
        }
        if (j === m) {
          if (B.charCodeAt(ln) === 92) {
            j = z;
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(x);
            }
          }
          if (j === m) {
            j = Ij();
          }
        }
        Yn--;
        if (j === m) {
          n = void 0;
        } else {
          ln = n;
          n = m;
        }
        if (n !== m) {
          if (B.length > ln) {
            j = B.charAt(ln);
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(w);
            }
          }
          if (j !== m) {
            Nn = i;
            n = q();
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = ln;
          if (B.charCodeAt(ln) === 92) {
            n = z;
            ln++;
          } else {
            n = m;
            if (Yn === 0) {
              Gn(x);
            }
          }
          if (n !== m) {
            j = qn();
            if (j !== m) {
              Nn = i;
              n = _(j);
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
          if (i === m) {
            i = wn();
          }
        }
        return i;
      }
      function wn() {
        i = ln;
        if (B.charCodeAt(ln) === 92) {
          n = z;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(x);
          }
        }
        if (n !== m) {
          j = Aj();
          if (j !== m) {
            Nn = i;
            n = ii();
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function qn() {
        i = _n();
        if (i === m) {
          i = ln;
          if (B.charCodeAt(ln) === 48) {
            n = S;
            ln++;
          } else {
            n = m;
            if (Yn === 0) {
              Gn(Z);
            }
          }
          if (n !== m) {
            j = ln;
            Yn++;
            k = on();
            Yn--;
            if (k === m) {
              j = void 0;
            } else {
              ln = j;
              j = m;
            }
            if (j !== m) {
              Nn = i;
              n = ni();
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
          if (i === m) {
            i = jj();
            if (i === m) {
              i = kj();
            }
          }
        }
        return i;
      }
      function _n() {
        i = $n();
        if (i === m) {
          i = ij();
        }
        return i;
      }
      function $n() {
        if (B.charCodeAt(ln) === 39) {
          i = y;
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(v);
          }
        }
        if (i === m) {
          if (B.charCodeAt(ln) === 34) {
            i = s;
            ln++;
          } else {
            i = m;
            if (Yn === 0) {
              Gn(u);
            }
          }
          if (i === m) {
            if (B.charCodeAt(ln) === 92) {
              i = z;
              ln++;
            } else {
              i = m;
              if (Yn === 0) {
                Gn(x);
              }
            }
            if (i === m) {
              i = ln;
              if (B.charCodeAt(ln) === 98) {
                n = ji;
                ln++;
              } else {
                n = m;
                if (Yn === 0) {
                  Gn(ki);
                }
              }
              if (n !== m) {
                Nn = i;
                n = Ii();
              }
              i = n;
              if (i === m) {
                i = ln;
                if (B.charCodeAt(ln) === 102) {
                  n = Ai;
                  ln++;
                } else {
                  n = m;
                  if (Yn === 0) {
                    Gn(hi);
                  }
                }
                if (n !== m) {
                  Nn = i;
                  n = fi();
                }
                i = n;
                if (i === m) {
                  i = ln;
                  if (B.charCodeAt(ln) === 110) {
                    n = Bi;
                    ln++;
                  } else {
                    n = m;
                    if (Yn === 0) {
                      Gn(mi);
                    }
                  }
                  if (n !== m) {
                    Nn = i;
                    n = Ei();
                  }
                  i = n;
                  if (i === m) {
                    i = ln;
                    if (B.charCodeAt(ln) === 114) {
                      n = Fi;
                      ln++;
                    } else {
                      n = m;
                      if (Yn === 0) {
                        Gn(Ji);
                      }
                    }
                    if (n !== m) {
                      Nn = i;
                      n = Li();
                    }
                    i = n;
                    if (i === m) {
                      i = ln;
                      if (B.charCodeAt(ln) === 116) {
                        n = li;
                        ln++;
                      } else {
                        n = m;
                        if (Yn === 0) {
                          Gn(Ni);
                        }
                      }
                      if (n !== m) {
                        Nn = i;
                        n = Di();
                      }
                      i = n;
                      if (i === m) {
                        i = ln;
                        if (B.charCodeAt(ln) === 118) {
                          n = Qi;
                          ln++;
                        } else {
                          n = m;
                          if (Yn === 0) {
                            Gn(Mi);
                          }
                        }
                        if (n !== m) {
                          Nn = i;
                          n = Yi();
                        }
                        i = n;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return i;
      }
      function ij() {
        i = ln;
        n = ln;
        Yn++;
        j = nj();
        if (j === m) {
          j = Ij();
        }
        Yn--;
        if (j === m) {
          n = void 0;
        } else {
          ln = n;
          n = m;
        }
        if (n !== m) {
          if (B.length > ln) {
            j = B.charAt(ln);
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(w);
            }
          }
          if (j !== m) {
            Nn = i;
            n = q();
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function nj() {
        i = $n();
        if (i === m) {
          i = on();
          if (i === m) {
            if (B.charCodeAt(ln) === 120) {
              i = Pi;
              ln++;
            } else {
              i = m;
              if (Yn === 0) {
                Gn(ei);
              }
            }
            if (i === m) {
              if (B.charCodeAt(ln) === 117) {
                i = Ci;
                ln++;
              } else {
                i = m;
                if (Yn === 0) {
                  Gn(Ui);
                }
              }
            }
          }
        }
        return i;
      }
      function jj() {
        i = ln;
        if (B.charCodeAt(ln) === 120) {
          n = Pi;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(ei);
          }
        }
        if (n !== m) {
          j = ln;
          k = ln;
          I = yn();
          if (I !== m) {
            A = yn();
            if (A !== m) {
              I = [I, A];
              k = I;
            } else {
              ln = k;
              k = m;
            }
          } else {
            ln = k;
            k = m;
          }
          if (k !== m) {
            j = B.substring(j, ln);
          } else {
            j = k;
          }
          if (j !== m) {
            Nn = i;
            n = Vi(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function kj() {
        i = ln;
        if (B.charCodeAt(ln) === 117) {
          n = Ci;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(Ui);
          }
        }
        if (n !== m) {
          j = ln;
          k = ln;
          I = yn();
          if (I !== m) {
            A = yn();
            if (A !== m) {
              h = yn();
              if (h !== m) {
                f = yn();
                if (f !== m) {
                  I = [I, A, h, f];
                  k = I;
                } else {
                  ln = k;
                  k = m;
                }
              } else {
                ln = k;
                k = m;
              }
            } else {
              ln = k;
              k = m;
            }
          } else {
            ln = k;
            k = m;
          }
          if (k !== m) {
            j = B.substring(j, ln);
          } else {
            j = k;
          }
          if (j !== m) {
            Nn = i;
            n = Vi(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Ij() {
        if (di.test(B.charAt(ln))) {
          i = B.charAt(ln);
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(Ti);
          }
        }
        return i;
      }
      function Aj() {
        Yn++;
        if (B.charCodeAt(ln) === 10) {
          i = Si;
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(Zi);
          }
        }
        if (i === m) {
          if (B.substr(ln, 2) === Oi) {
            i = Oi;
            ln += 2;
          } else {
            i = m;
            if (Yn === 0) {
              Gn(ai);
            }
          }
          if (i === m) {
            if (B.charCodeAt(ln) === 13) {
              i = ci;
              ln++;
            } else {
              i = m;
              if (Yn === 0) {
                Gn(Ki);
              }
            }
            if (i === m) {
              if (B.charCodeAt(ln) === 8232) {
                i = bi;
                ln++;
              } else {
                i = m;
                if (Yn === 0) {
                  Gn(Hi);
                }
              }
              if (i === m) {
                if (B.charCodeAt(ln) === 8233) {
                  i = Wi;
                  ln++;
                } else {
                  i = m;
                  if (Yn === 0) {
                    Gn(Xi);
                  }
                }
              }
            }
          }
        }
        Yn--;
        if (i === m) {
          n = m;
          if (Yn === 0) {
            Gn(Gi);
          }
        }
        return i;
      }
      function hj() {
        i = ln;
        if (B.charCodeAt(ln) === 91) {
          n = E;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(F);
          }
        }
        if (n !== m) {
          j = Ej();
          if (j !== m) {
            k = [];
            I = fj();
            while (I !== m) {
              k.push(I);
              I = fj();
            }
            if (k !== m) {
              I = Ej();
              if (I !== m) {
                A = Rn();
                if (A !== m) {
                  h = Ej();
                  if (h !== m) {
                    if (B.charCodeAt(ln) === 93) {
                      f = J;
                      ln++;
                    } else {
                      f = m;
                      if (Yn === 0) {
                        Gn(L);
                      }
                    }
                    if (f !== m) {
                      Nn = i;
                      n = Ri(k, A);
                      i = n;
                    } else {
                      ln = i;
                      i = m;
                    }
                  } else {
                    ln = i;
                    i = m;
                  }
                } else {
                  ln = i;
                  i = m;
                }
              } else {
                ln = i;
                i = m;
              }
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function fj() {
        i = ln;
        n = Rn();
        if (n !== m) {
          j = Ej();
          if (j !== m) {
            if (B.charCodeAt(ln) === 44) {
              k = ti;
              ln++;
            } else {
              k = m;
              if (Yn === 0) {
                Gn(gi);
              }
            }
            if (k !== m) {
              I = Ej();
              if (I !== m) {
                Nn = i;
                n = ri(n);
                i = n;
              } else {
                ln = i;
                i = m;
              }
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Bj() {
        i = ln;
        if (B.substr(ln, 4) === oi) {
          n = oi;
          ln += 4;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(si);
          }
        }
        if (n !== m) {
          j = Ej();
          if (j === m) {
            j = null;
          }
          if (j !== m) {
            n = [n, j];
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function mj() {
        i = ln;
        if (B.substr(ln, 5) === ui) {
          n = ui;
          ln += 5;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(pi);
          }
        }
        if (n !== m) {
          j = Ej();
          if (j === m) {
            j = null;
          }
          if (j !== m) {
            n = [n, j];
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Ej() {
        Yn++;
        i = [];
        if (vi.test(B.charAt(ln))) {
          n = B.charAt(ln);
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(zi);
          }
        }
        while (n !== m) {
          i.push(n);
          if (vi.test(B.charAt(ln))) {
            n = B.charAt(ln);
            ln++;
          } else {
            n = m;
            if (Yn === 0) {
              Gn(zi);
            }
          }
        }
        Yn--;
        if (i === m) {
          n = m;
          if (Yn === 0) {
            Gn(yi);
          }
        }
        return i;
      }
      function Fj() {
        Yn++;
        i = ln;
        if (B.charCodeAt(ln) === 47) {
          n = wi;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(qi);
          }
        }
        if (n !== m) {
          j = Jj();
          if (j !== m) {
            if (B.charCodeAt(ln) === 47) {
              k = wi;
              ln++;
            } else {
              k = m;
              if (Yn === 0) {
                Gn(qi);
              }
            }
            if (k !== m) {
              I = ej();
              if (I !== m) {
                Nn = i;
                n = _i(j, I);
                i = n;
              } else {
                ln = i;
                i = m;
              }
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        Yn--;
        if (i === m) {
          n = m;
          if (Yn === 0) {
            Gn(xi);
          }
        }
        return i;
      }
      function Jj() {
        i = ln;
        n = lj();
        if (n !== m) {
          j = Lj();
          if (j !== m) {
            Nn = i;
            n = $i(n, j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Lj() {
        i = ln;
        n = [];
        j = Nj();
        while (j !== m) {
          n.push(j);
          j = Nj();
        }
        if (n !== m) {
          Nn = i;
          n = nn(n);
        }
        i = n;
        return i;
      }
      function lj() {
        i = ln;
        n = ln;
        Yn++;
        if (jn.test(B.charAt(ln))) {
          j = B.charAt(ln);
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(kn);
          }
        }
        Yn--;
        if (j === m) {
          n = void 0;
        } else {
          ln = n;
          n = m;
        }
        if (n !== m) {
          j = Qj();
          if (j !== m) {
            Nn = i;
            n = In(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = Dj();
          if (i === m) {
            i = Mj();
          }
        }
        return i;
      }
      function Nj() {
        i = ln;
        n = ln;
        Yn++;
        if (An.test(B.charAt(ln))) {
          j = B.charAt(ln);
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(hn);
          }
        }
        Yn--;
        if (j === m) {
          n = void 0;
        } else {
          ln = n;
          n = m;
        }
        if (n !== m) {
          j = Qj();
          if (j !== m) {
            Nn = i;
            n = In(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = Dj();
          if (i === m) {
            i = Mj();
          }
        }
        return i;
      }
      function Dj() {
        i = ln;
        if (B.charCodeAt(ln) === 92) {
          n = z;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(x);
          }
        }
        if (n !== m) {
          j = Qj();
          if (j !== m) {
            Nn = i;
            n = fn(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Qj() {
        i = ln;
        n = ln;
        Yn++;
        j = Ij();
        Yn--;
        if (j === m) {
          n = void 0;
        } else {
          ln = n;
          n = m;
        }
        if (n !== m) {
          j = Cj();
          if (j !== m) {
            Nn = i;
            n = In(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Mj() {
        i = ln;
        if (B.charCodeAt(ln) === 91) {
          n = E;
          ln++;
        } else {
          n = m;
          if (Yn === 0) {
            Gn(F);
          }
        }
        if (n !== m) {
          j = Yj();
          if (j !== m) {
            if (B.charCodeAt(ln) === 93) {
              k = J;
              ln++;
            } else {
              k = m;
              if (Yn === 0) {
                Gn(L);
              }
            }
            if (k !== m) {
              Nn = i;
              n = Bn(j);
              i = n;
            } else {
              ln = i;
              i = m;
            }
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        return i;
      }
      function Yj() {
        i = ln;
        n = [];
        j = Pj();
        while (j !== m) {
          n.push(j);
          j = Pj();
        }
        if (n !== m) {
          Nn = i;
          n = nn(n);
        }
        i = n;
        return i;
      }
      function Pj() {
        i = ln;
        n = ln;
        Yn++;
        if (mn.test(B.charAt(ln))) {
          j = B.charAt(ln);
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(En);
          }
        }
        Yn--;
        if (j === m) {
          n = void 0;
        } else {
          ln = n;
          n = m;
        }
        if (n !== m) {
          j = Qj();
          if (j !== m) {
            Nn = i;
            n = In(j);
            i = n;
          } else {
            ln = i;
            i = m;
          }
        } else {
          ln = i;
          i = m;
        }
        if (i === m) {
          i = Dj();
        }
        return i;
      }
      function ej() {
        i = ln;
        n = [];
        if (Fn.test(B.charAt(ln))) {
          j = B.charAt(ln);
          ln++;
        } else {
          j = m;
          if (Yn === 0) {
            Gn(Jn);
          }
        }
        while (j !== m) {
          n.push(j);
          if (Fn.test(B.charAt(ln))) {
            j = B.charAt(ln);
            ln++;
          } else {
            j = m;
            if (Yn === 0) {
              Gn(Jn);
            }
          }
        }
        if (n !== m) {
          Nn = i;
          n = Ln(n);
        }
        i = n;
        return i;
      }
      function Cj() {
        if (B.length > ln) {
          i = B.charAt(ln);
          ln++;
        } else {
          i = m;
          if (Yn === 0) {
            Gn(w);
          }
        }
        return i;
      }
      function Uj(i) {
        var n = {};
        for (var j = 0; j < i.length; j += 1) {
          var k = i[j];
          for (var I in k) {
            if (k.hasOwnProperty(I)) {
              n[I] = k[I];
            }
          }
        }
        return n;
      }
      var i = arguments.length > 1 ? arguments[1] : {};
      var n = this;
      var m = {};
      var j = { Start: Zn };
      var k = Zn;
      var E = "[";
      var F = { description: '"["', type: "literal", value: "[" };
      var J = "]";
      var L = { description: '"]"', type: "literal", value: "]" };
      var I = function (i) {
        return Uj(i);
      };
      var A = "(";
      var h = { description: '"("', type: "literal", value: "(" };
      var f = ")";
      var l = { description: '")"', type: "literal", value: ")" };
      var N = /^[a-zA-Z]/;
      var D = { description: "[a-zA-Z]", type: "class", value: "[a-zA-Z]" };
      var Q = function (i) {
        var n = {};
        var j = i.join("");
        n[j] = { type: "Bool", value: true };
        return n;
      };
      var M = "=";
      var Y = { description: '"="', type: "literal", value: "=" };
      var P = function (i, n) {
        var j = {};
        var k = i.join("");
        j[k] = n;
        return j;
      };
      var e = function (i, n, j) {
        return { props: n, pseudo: j, type: i.join("").toLowerCase() };
      };
      var C = ":";
      var U = { description: '":"', type: "literal", value: ":" };
      var V = function (i, n) {
        return { props: n, type: i.join("").toLowerCase() };
      };
      var d = function (i) {
        return i;
      };
      var T = function () {
        return { type: "Bool", value: true };
      };
      var G = function () {
        return { type: "Bool", value: false };
      };
      var S = "0";
      var Z = { description: '"0"', type: "literal", value: "0" };
      var O = /^[0-9]/;
      var a = { description: "[0-9]", type: "class", value: "[0-9]" };
      var c = /^[1-9]/;
      var K = { description: "[1-9]", type: "class", value: "[1-9]" };
      var b = ".";
      var H = { description: '"."', type: "literal", value: "." };
      var W = function () {
        return { type: "Number", value: parseFloat(en()) };
      };
      var X = function () {
        return { type: "Integer", value: parseFloat(en()) };
      };
      var R = "0x";
      var t = { description: '"0x"', type: "literal", value: "0x" };
      var g = function (i) {
        return { type: "Hex", value: parseInt(i, 16) };
      };
      var r = /^[0-9a-f]/i;
      var o = { description: "[0-9a-f]i", type: "class", value: "[0-9a-f]i" };
      var s = '"';
      var u = { description: '"\\""', type: "literal", value: '"' };
      var p = function (i) {
        return { type: "String", value: i.join("") };
      };
      var y = "\'";
      var v = { description: '"\'"', type: "literal", value: "\'" };
      var z = "\\";
      var x = { description: '"\\\\"', type: "literal", value: "\\" };
      var w = { description: "any character", type: "any" };
      var q = function () {
        return en();
      };
      var _ = function (i) {
        return i;
      };
      var ii = function () {
        return "";
      };
      var ni = function () {
        return "\x00";
      };
      var ji = "b";
      var ki = { description: '"b"', type: "literal", value: "b" };
      var Ii = function () {
        return "\b";
      };
      var Ai = "f";
      var hi = { description: '"f"', type: "literal", value: "f" };
      var fi = function () {
        return "\f";
      };
      var Bi = "n";
      var mi = { description: '"n"', type: "literal", value: "n" };
      var Ei = function () {
        return "\n";
      };
      var Fi = "r";
      var Ji = { description: '"r"', type: "literal", value: "r" };
      var Li = function () {
        return "\r";
      };
      var li = "t";
      var Ni = { description: '"t"', type: "literal", value: "t" };
      var Di = function () {
        return "\t";
      };
      var Qi = "v";
      var Mi = { description: '"v"', type: "literal", value: "v" };
      var Yi = function () {
        return "\v";
      };
      var Pi = "x";
      var ei = { description: '"x"', type: "literal", value: "x" };
      var Ci = "u";
      var Ui = { description: '"u"', type: "literal", value: "u" };
      var Vi = function (i) {
        return String.fromCharCode(parseInt(i, 16));
      };
      var di = /^[\n\r\u2028\u2029]/;
      var Ti = {
        description: "[\\n\\r\\u2028\\u2029]",
        type: "class",
        value: "[\\n\\r\\u2028\\u2029]",
      };
      var Gi = { description: "end of line", type: "other" };
      var Si = "\n";
      var Zi = { description: '"\\n"', type: "literal", value: "\n" };
      var Oi = "\r\n";
      var ai = { description: '"\\r\\n"', type: "literal", value: "\r\n" };
      var ci = "\r";
      var Ki = { description: '"\\r"', type: "literal", value: "\r" };
      var bi = "\u2028";
      var Hi = { description: '"\\u2028"', type: "literal", value: "\u2028" };
      var Wi = "\u2029";
      var Xi = { description: '"\\u2029"', type: "literal", value: "\u2029" };
      var Ri = function (i, n) {
        i.push(n);
        return { type: "Array", value: i };
      };
      var ti = ",";
      var gi = { description: '","', type: "literal", value: "," };
      var ri = function (i) {
        return i;
      };
      var oi = "true";
      var si = { description: '"true"', type: "literal", value: "true" };
      var ui = "false";
      var pi = { description: '"false"', type: "literal", value: "false" };
      var yi = { description: "whitespace", type: "other" };
      var vi = /^[ \t\n\r]/;
      var zi = {
        description: "[ \\t\\n\\r]",
        type: "class",
        value: "[ \\t\\n\\r]",
      };
      var xi = { description: "regular expression", type: "other" };
      var wi = "/";
      var qi = { description: '"/"', type: "literal", value: "/" };
      var _i = function (i, n) {
        return { body: i, flags: n, type: "RegExp", value: new RegExp(i, n) };
      };
      var $i = function (i, n) {
        return i + n;
      };
      var nn = function (i) {
        return i.join("");
      };
      var jn = /^[*\\\/[]/;
      var kn = { description: "[*\\\\/[]", type: "class", value: "[*\\\\/[]" };
      var In = function (i) {
        return i;
      };
      var An = /^[\\\/[]/;
      var hn = { description: "[\\\\/[]", type: "class", value: "[\\\\/[]" };
      var fn = function (i) {
        return "\\" + i;
      };
      var Bn = function (i) {
        return "[" + i + "]";
      };
      var mn = /^[\]\\]/;
      var En = { description: "[\\]\\\\]", type: "class", value: "[\\]\\\\]" };
      var Fn = /^[gimuy]/;
      var Jn = { description: "[gimuy]", type: "class", value: "[gimuy]" };
      var Ln = function (i) {
        return i.join("");
      };
      var ln = 0;
      var Nn = 0;
      var Dn = [{ column: 1, line: 1, seenCR: false }];
      var Qn = 0;
      var Mn = [];
      var Yn = 0;
      if ("startRule" in i) {
        if (!(i.startRule in j)) {
          throw new Error(
            "Can\'t start parsing from rule \"" + i.startRule + '".',
          );
        }
        k = j[i.startRule];
      }
      Pn = k();
      if (Pn !== m && ln === B.length) {
        return Pn;
      } else {
        if (Pn !== m && ln < B.length) {
          Gn({ description: "end of input", type: "end" });
        }
        throw Sn(
          null,
          Mn,
          Qn < B.length ? B.charAt(Qn) : null,
          Qn < B.length ? Tn(Qn, Qn + 1) : Tn(Qn, Qn),
        );
      }
    }
    ("use strict");
    i(Vj, Error);
    return { SyntaxError: Vj, parse: n };
  })();
  aeq.ui = (function (A) {
    A.Container = function (i) {
      this.obj = i;
    };
    A.Container.prototype = {
      _add: function (i, n) {
        if (aeq.isObject(n.arg1) && !aeq.isArray(n.arg1)) {
          n = n.arg1;
          n.arg1 = n.items || n.text;
        }
        var j = this.obj.add(i, n.bounds, n.arg1, n.properties);
        A.set(j, n);
        return j;
      },
      addButton: function (i, n, j) {
        return this._add("button", { arg1: i, onClick: n, properties: j });
      },
      addCheckbox: function (i, n, j) {
        return this._add("checkbox", { arg1: i, onClick: n, properties: j });
      },
      addDropdownList: function (i, n, j) {
        return this._add("dropdownlist", {
          arg1: i,
          onChange: n,
          properties: j,
        });
      },
      addEditText: function (i, n, j, k) {
        return this._add("edittext", {
          arg1: i,
          onChange: n,
          onChanging: j,
          properties: k,
        });
      },
      addGroup: function (i) {
        var n = this.obj.add("group");
        n = new A.Container(n);
        if (i) {
          n.set(i);
        }
        return n;
      },
      addIconButton: function (i, n, j) {
        var k = { arg1: i, onClick: n, properties: j };
        if (
          aeq.isObject(k.arg1) &&
          !aeq.isArray(k.arg1) &&
          !aeq.isFile(k.arg1) &&
          k.arg1.format === undefined
        ) {
          k = k.arg1;
          k.arg1 = k.image || undefined;
        }
        var I = this.obj.add("iconbutton", k.bounds, k.arg1, k.properties);
        A.set(I, k);
        return I;
      },
      addImage: function (i, n, j) {
        var k = { arg1: i, onClick: n, properties: j };
        if (
          aeq.isObject(k.arg1) &&
          !aeq.isArray(k.arg1) &&
          !aeq.isFile(k.arg1) &&
          k.arg1.format === undefined
        ) {
          k = k.arg1;
          k.arg1 = k.image || undefined;
        }
        var I = this.obj.add("image", k.bounds, k.arg1, k.properties);
        A.set(I, k);
        return I;
      },
      addListBox: function (i, n, j, k) {
        return this._add("listbox", {
          arg1: i,
          onChange: n,
          onDoubleClick: j,
          properties: k,
        });
      },
      addPanel: function (i, n) {
        var j = this._add("panel", { arg1: i, properties: n });
        return new A.Container(j);
      },
      addProgressbar: function (i, n) {
        return this.obj.add("progressbar", undefined, i, n);
      },
      addRadioButton: function (i, n, j) {
        return this._add("radiobutton", { arg1: i, onClick: n, properties: j });
      },
      addScrollbar: function (i, n, j, k) {
        var I = this.obj.add("scrollbar", undefined, i, n);
        I.onChange = j;
        I.onChanging = k;
        return I;
      },
      addSlider: function (i, n, j, k, I) {
        var A = this.obj.add("slider", undefined, i, n, j);
        A.onChange = k;
        A.onChanging = I;
        return A;
      },
      addStaticText: function (i, n) {
        return this._add("statictext", { arg1: i, properties: n });
      },
      addTab: function (i) {
        var n = this.obj.add("tab", undefined, i);
        return new A.Container(n);
      },
      addTabbedPanel: function () {
        var i = this.obj.add("tabbedpanel");
        return new A.Container(i);
      },
      addTreeView: function (i, n, j) {
        return this._add("treeview", { arg1: i, onChange: n, properties: j });
      },
      extend: aeq.extend,
      get: function () {
        return this.obj;
      },
      remove: function (i) {
        if (i instanceof A.Container) {
          i = i.obj;
        }
        this.obj.remove(i);
      },
      removeAll: function () {
        for (var i = this.obj.children.length - 1; i >= 0; i--) {
          this.obj.remove(this.obj.children[i]);
        }
      },
      removeChildren: function (i) {
        if (i instanceof A.Container) {
          i = i.obj;
        }
        for (var n = i.children.length - 1; n >= 0; n--) {
          i.remove(i.children[n]);
        }
      },
      set: function (i) {
        A.set(this.obj, i);
      },
      toString: function () {
        return "[object aeq.ui.Container]";
      },
      update: function () {
        this.obj.layout.layout(true);
        this.obj.layout.resize();
      },
    };
    A.Container.prototype.addListbox = A.Container.prototype.addListBox;
    A.Container.prototype.addStatictext = A.Container.prototype.addStaticText;
    A.Container.prototype.addTreeview = A.Container.prototype.addTreeView;
    (function i() {
      function I(n, j) {
        return function (i) {
          if (i === undefined) {
            return this.obj[n];
          }
          i =
            arguments.length === j
              ? Array.apply(null, arguments)
              : arguments[0];
          this.obj[n] = i;
        };
      }
      var n = ["enabled", "helpTip", "orientation", "text", "visible"];
      var j = [
        "alignChildren",
        "alignment",
        "location",
        "maximumSize",
        "minimumSize",
        "preferredSize",
        "size",
      ];
      var k = ["bounds", "margins"];
      aeq.forEach(n, function (n) {
        A.Container.prototype[n] = function (i) {
          if (i === undefined) {
            return this.obj[n];
          }
          this.obj[n] = i;
        };
      });
      aeq.forEach(j, function (i) {
        A.Container.prototype[i] = I(i, 2);
      });
      aeq.forEach(k, function (i) {
        A.Container.prototype[i] = I(i, 4);
      });
    })();
    return A;
  })(aeq.ui || {});
  aeq.ui = (function (I) {
    I.createMainWindow = function (i, n, j) {
      if (aeq.isPanel(i)) {
        return new I.Window(i);
      }
      if (aeq.isString(i)) {
        j = n;
        n = i;
      }
      j = aeq.setDefault(j, { resizeable: true });
      var k = new Window("palette", n, undefined, j);
      aeq.ui.root = k;
      return new I.Window(k);
    };
    I.createWindow = function (i, n) {
      n = aeq.setDefault(n, { resizeable: true });
      var j = new Window("palette", i, undefined, n);
      return new I.Window(j);
    };
    I.createDialog = function (i, n) {
      n = aeq.setDefault(n, { resizeable: true });
      var j = new Window("dialog", i, undefined, n);
      return new I.Window(j);
    };
    I.ready = function (i) {
      i();
    };
    I.set = function (i, n) {
      for (var j in n) {
        if (n.hasOwnProperty(j) && j !== "properties" && j !== "arg1") {
          i[j] = n[j];
        }
      }
    };
    return I;
  })(aeq.ui || {});
  aeq.ui = (function (i) {
    i.Window = function (i) {
      this.obj = i;
    };
    i.Window.prototype = i.Container.prototype;
    i.Window.prototype.show = function () {
      this.layout();
      if (aeq.isWindow(this.obj)) {
        return this.obj.show();
      }
    };
    i.Window.prototype.hide = function () {
      if (aeq.isWindow(this.obj)) {
        this.obj.hide();
      }
    };
    i.Window.prototype.close = function (i) {
      if (aeq.isWindow(this.obj)) {
        this.obj.close(i);
      }
    };
    i.Window.prototype.layout = function () {
      this.obj.layout.layout(true);
      this.obj.layout.resize();
      this.obj.onResizing = this.obj.onResize = function () {
        this.layout.resize();
      };
    };
    return i;
  })(aeq.ui || {});
  if (typeof JSON !== "object") {
    JSON = {};
  }
  (function () {
    function f(i) {
      return i < 10 ? "0" + i : i;
    }
    function this_value() {
      return this.valueOf();
    }
    function quote(i) {
      escapable.lastIndex = 0;
      return escapable.test(i)
        ? '"' +
            i.replace(escapable, function (i) {
              var n = meta[i];
              return typeof n === "string"
                ? n
                : "\\u" + ("0000" + i.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + i + '"';
    }
    function str(i, n) {
      var h = gap;
      var B = n[i];
      if (B && typeof B === "object" && typeof B.toJSON === "function") {
        B = B.toJSON(i);
      }
      if (typeof rep === "function") {
        B = rep.call(n, i, B);
      }
      switch (typeof B) {
        case "string":
          return quote(B);
        case "number":
          return isFinite(B) ? String(B) : "null";
        case "boolean":
        case "null":
          return String(B);
        case "object":
          if (!B) {
            return "null";
          }
          gap += indent;
          f = [];
          if (Object.prototype.toString.apply(B) === "[object Array]") {
            A = B.length;
            for (var j = 0; j < A; j += 1) {
              f[j] = str(j, B) || "null";
            }
            I =
              f.length === 0
                ? "[]"
                : gap
                  ? "[\n" + gap + f.join(",\n" + gap) + "\n" + h + "]"
                  : "[" + f.join(",") + "]";
            gap = h;
            return I;
          }
          if (rep && typeof rep === "object") {
            A = rep.length;
            for (var j = 0; j < A; j += 1) {
              if (typeof rep[j] === "string") {
                k = rep[j];
                I = str(k, B);
                if (I) {
                  f.push(quote(k) + gap ? ": " : ":" + I);
                }
              }
            }
          } else {
            for (var k in B) {
              if (Object.prototype.hasOwnProperty.call(B, k)) {
                I = str(k, B);
                if (I) {
                  f.push(quote(k) + gap ? ": " : ":" + I);
                }
              }
            }
          }
          I =
            f.length === 0
              ? "{}"
              : gap
                ? "{\n" + gap + f.join(",\n" + gap) + "\n" + h + "}"
                : "{" + f.join(",") + "}";
          gap = h;
          return I;
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
      Boolean.prototype.toJSON = this_value;
      Number.prototype.toJSON = this_value;
      String.prototype.toJSON = this_value;
    }
    if (typeof JSON.stringify !== "function") {
      escapable =
        /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      };
      JSON.stringify = function (i, n, j) {
        gap = "";
        indent = "";
        if (typeof j === "number") {
          for (var k = 0; k < j; k += 1) {
            indent += " ";
          }
        } else {
          if (typeof j === "string") {
            indent = j;
          }
        }
        rep = n;
        if (
          n &&
          typeof n !== "function" &&
          (typeof n !== "object" || typeof n.length !== "number")
        ) {
          throw new Error("JSON.stringify");
        }
        return str("", { "": i });
      };
    }
    if (typeof JSON.parse !== "function") {
      cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      JSON.parse = function (text, reviver) {
        function walk(i, n) {
          var I = i[n];
          if (I && typeof I === "object") {
            for (var j in I) {
              if (Object.prototype.hasOwnProperty.call(I, j)) {
                k = walk(I, j);
                if (k !== undefined) {
                  I[j] = k;
                } else {
                  delete I[j];
                }
              }
            }
          }
          return reviver.call(i, n, I);
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (i) {
            return "\\u" + ("0000" + i.charCodeAt(0).toString(16)).slice(-4);
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
      -1 != $.os.indexOf("Mac") && systemCall('chmod 757 "' + n.fsName + '"');
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
    var licensingVersion = "3.0.40";
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
    var wx = __BLOB__BLOB_000711__;
    var mx = __BLOB__BLOB_000712__;
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
  var j77b = new a({
    privateNumber: 6541054521676256,
    productSKU: "RGTL-SUL",
    scriptAuthor: "Rune Gangs\xf8",
    scriptName: "Tool Launcher",
    scriptURL: "https://aescripts.com/tool-launcher/",
    scriptVersion: script.version,
  });
  if (!j77b.c()) {
    return;
  }
  globalToolbox = typeof globalToolbox !== "undefined" ? globalToolbox : {};
  var toolbox = (function () {
    function n() {
      var i = aeq.settings.get(tb.script.name, tb.script.name + "Settings");
      if (i !== undefined) {
        i = JSON.parse(i);
        aeq.extend(tb.settings, i);
      }
    }
    function f() {
      if (tb.settings.configSet) {
        i = tb.settings.configPath;
        n = tb.readFile(i);
        if (n === null) {
          tb.configMissing = true;
          alert(
            "Config file is missing\nTool Launcher Config file not found: " + i,
          );
          return;
        } else {
          if (n instanceof Error) {
            tb.backup(Date.now());
            alert(
              "Error reading config file\n" +
                n.message +
                "\n" +
                "A copy of your config was saved in " +
                tb.toolboxFolder.fsName,
            );
            return;
          }
        }
      } else {
        i = tb.defaultConfigPath;
        n = tb.readFile(i);
        if (n === null) {
          return;
        } else {
          if (n instanceof Error) {
            tb.backup(Date.now());
            alert(
              "Error reading config file\n" +
                n.message +
                "\n" +
                "A copy of your config was saved in " +
                tb.toolboxFolder.fsName,
            );
            return;
          }
        }
      }
      try {
        n = JSON.parse(n);
      } catch (i) {
        tb.backup(Date.now());
        alert(
          "Error parsing Tool Launcher config file\n" +
            i.message +
            " on line " +
            i.line +
            "\n" +
            "A copy of your config was saved in " +
            tb.toolboxFolder.fsName,
          "Error",
          true,
        );
        return;
      }
      aeq.extend(tb.config, n);
    }
    function A() {
      tb.tools.folders = {};
      var i = tb.config.folders;
      if (tb.isTrial && tb.config.folders.length > 1) {
        tb.config.folders.splice(1, tb.config.folders.length);
      }
      aeq.forEach(i, tb.loadFolder);
    }
    function B(i, n, j) {
      var A = i.getFiles(j);
      for (var h = 0, f = A.length; h < f; h++) {
        k = A[h];
        if (k instanceof Folder) {
          B(k, n, j);
        } else {
          n.push(k);
        }
      }
    }
    function m(i) {
      return i.replace(h, "");
    }
    function E(i) {
      var j = [];
      aeq.forEach(i, function (i, n) {
        j = j.concat(n);
      });
      return j;
    }
    function F() {
      var n = Folder.appPackage;
      if ($.os.indexOf("Windows") === -1) {
        n = n.parent;
      }
      var A = new Folder(n.fsName + "/Scripts/ScriptUI Panels");
      var I = new Folder(n.fsName + "/Scripts");
      if (A.alias) {
        A = A.resolve() || A;
      }
      if (I.alias) {
        I = I.resolve() || I;
      }
      var j = /jsx(bin)?$/;
      if (A.exists) {
        i = A.getFiles(function (i) {
          return !(i instanceof Folder) && j.test(i.name);
        });
        if (i.length) {
          tb.tools.ae.ScriptUI = "ScriptUI";
          aeq.forEach(i, function (i) {
            var n = decodeURIComponent(i.name);
            var j = {
              cmd: { cmd: n, hide: true, type: "menu" },
              file: i,
              location: tb.tools.ae.ScriptUI,
              name: m(n),
              prefix: "ScriptUI",
              settings: "aescriptSettings",
            };
            var k = i.getRelativeURI(A.parent);
            var I = tb.config.aescriptSettings[k];
            j.relativeURI = k;
            if (I) {
              aeq.extend(true, j, I);
            }
            tb.tools.all.push(tb.newTool(j));
          });
        }
      }
      if (I.exists) {
        i = I.getFiles(function (i) {
          return !(i instanceof Folder) && j.test(i.name);
        });
        if (i.length) {
          if (tb.isTrial) {
            i.splice(tb.trialLimit.folderToolsLimit, i.length);
          }
          tb.tools.ae.Scripts = "Scripts";
          aeq.forEach(i, function (i) {
            var n = {
              cmd: { cmd: i, showInPanel: true, type: "script" },
              file: i,
              location: tb.tools.ae.Scripts,
              name: m(decodeURIComponent(i.name)),
              settings: "aescriptSettings",
            };
            var j = i.getRelativeURI(I.parent);
            var k = tb.config.aescriptSettings[j];
            n.relativeURI = j;
            if (k) {
              aeq.extend(true, n, k);
            }
            tb.tools.all.push(tb.newTool(n));
          });
        }
      }
    }
    function J() {
      if (tb.isTrial && tb.config.tools.length > tb.trialLimit.maxConfigTools) {
        tb.config.tools.splice(
          tb.trialLimit.maxConfigTools,
          tb.config.tools.length,
        );
      }
      Array.prototype.push.apply(tb.tools.all, tb.config.tools);
    }
    function L() {
      tb.tools.all.sort(tb.toolSorter);
    }
    function l() {
      function i(k, i) {
        aeq.forEach(i, function (i, n) {
          var j = tb.createIconFile(k + i, unescape(n));
          if (!j) {
            A.push(i);
            I = false;
          }
        });
      }
      var I = true;
      var A = [];
      i("", tb.config.icons);
      if (!I) {
        alert(
          "Error writing some icon files:\n" + A.join("\n"),
          tb.script.name + " error",
          true,
        );
      }
    }
    var i = new Folder(Folder.userData.fsName + "/Aescripts/" + script.name);
    var tb = {
      aeversion: parseFloat(app.version),
      config: {
        aescriptSettings: {},
        folders: [],
        icons: {},
        packs: {},
        scriptSettings: {},
        toolbars: [],
        tools: [
          {
            cmd: { cmd: "alert(\'Hello World!\');", type: "javascript" },
            description: "Show a JavaScript alert",
            name: "Alert",
            toolbars: { "Tool Launcher Toolbar": { index: 1 } },
          },
          {
            cmd: { cmd: "wiggle(1, 10);", type: "expression" },
            description: "Puts a default wiggle on selected properties",
            name: "Wiggle",
            toolbars: { "Tool Launcher Toolbar": { index: 2 } },
          },
          {
            cmd: { cmd: "New Composition...", type: "menu" },
            description: "Opens \'new Composition\' dialog",
            name: "New Composition",
            toolbars: { "Tool Launcher Toolbar": { index: 3 } },
          },
        ],
      },
      defaultConfigPath: i.fsName + "/" + script.name + "-config.json",
      defualtEditor: aeq.isWindows ? "start" : "open",
      iconFolder: new Folder(i.fsName + "/icons"),
      isCS6: (function () {
        return parseFloat(app.version) < 12;
      })(),
      isTrial: typeof j77b !== "undefined" && j77b.t(),
      script: script,
      settings: {
        configSet: false,
        editor: aeq.isWindows ? 'start ""' : "open",
        libraries: [],
        showHiddenTools: false,
        updateOnLaunch: true,
      },
      toolbars: {},
      toolboxFolder: i,
      tools: { ae: {}, all: [], folders: {}, packs: {}, user: [] },
      trialLimit: {
        folderToolsLimit: 6,
        maxConfigTools: 6,
        maxToolbarTools: 4,
        maxToolbars: 2,
      },
      types: [
        "javascript",
        "script",
        "expression",
        "os",
        "menu",
        "effect",
        "animation preset",
      ],
    };
    aeq.extend(tb, {
      init: function () {
        if (tb.inited) {
          return;
        }
        tb.tools.all = [];
        n();
        f();
        A();
        F();
        tb.initPacks();
        J();
        L();
        tb.loadToolbars();
        l();
        if (tb.initRun) {
          tb.initRun();
        }
        tb.inited = true;
      },
      inited: false,
      reInit: function () {
        tb.save();
        tb.refresh(true);
      },
      reload: function (i) {
        if (i) {
          tb.inited = false;
          tb.init();
        } else {
          L();
          tb.loadToolbars();
        }
      },
    });
    var j = /\.js(x(bin)?)?$/;
    var k = /^\(.*\)$/;
    tb.jsxFileFilter = function (i) {
      var n = function (i) {
        if (i instanceof Folder) {
          return !k.test(i.name);
        }
        return j.test(i.name);
      };
      if (i || $.os.indexOf("Windows") === -1) {
        return n;
      }
      return "Script:*.jsx;*.jsxbin;*.js";
    };
    var I = /\.ffx$/;
    tb.ffxFileFilter = function (i) {
      var n = function (i) {
        if (i instanceof Folder) {
          return true;
        }
        return I.test(i.name);
      };
      if (i || $.os.indexOf("Windows") === -1) {
        return n;
      }
      return "Animation preset:*.ffx";
    };
    tb.loadFolder = function (i) {
      var I = new Folder(i);
      if (I.exists) {
        var n = [];
        B(I, n, tb.jsxFileFilter(true));
        var j = (tb.tools.folders[I.fsName] = I.fsName);
        if (tb.isTrial) {
          n.splice(tb.trialLimit.folderToolsLimit, n.length);
        }
        aeq.forEach(n, function (i) {
          var n = {
            cmd: { cmd: i, showInPanel: true, type: "script" },
            file: i,
            location: I.fsName,
            name: m(decodeURIComponent(i.name)),
            settings: "scriptSettings",
          };
          var j = i.getRelativeURI(I.parent);
          var k = tb.config.scriptSettings[j];
          n.relativeURI = j;
          if (k) {
            aeq.extend(true, n, k);
          }
          tb.tools.all.push(tb.newTool(n));
        });
      }
    };
    var h = /\.js(x(bin)?|on)$/;
    tb.toolSorter = function (i, n) {
      if (i.star && !n.star) {
        return -1;
      } else {
        if (!i.star && n.star) {
          return 1;
        }
      }
      var j = tb.getToolName(i);
      var k = tb.getToolName(n);
      return j.toLowerCase().localeCompare(k.toLowerCase());
    };
    tb.writeFile = function (i, n) {
      var j = i instanceof File ? i : new File(i);
      if (!j.exists) {
        var k = new Folder(j.path);
        if (!k.exists) {
          k.create();
        }
      }
      j.encoding = "UTF-8";
      j.open("w");
      var I = j.write(n);
      if (!I && j.error !== "") {
        var A = j.error;
        j.close();
        return new Error(A);
      }
      j.close();
      return I;
    };
    tb.readFile = function (i) {
      n = i instanceof File ? i : new File(i);
      if (n.exists) {
        n.open();
        j = n.read();
        if (j === "" && n.error !== "") {
          var k = n.error;
          n.close();
          return new Error(k);
        }
        n.close();
        return j;
      }
      return null;
    };
    (function () {
      function i() {
        tb.config.tools = aeq.filter(tb.config.tools, function (i) {
          return !i.remove;
        });
      }
      function n() {
        aeq.forEach(tb.tools.all, function (j) {
          tb.forEachCmd(j, function (i, n) {
            if (!n.type || !n.cmd) {
              j[i] = undefined;
            }
          });
        });
      }
      aeq.extend(tb, {
        cleanup: function () {
          i();
          n();
        },
      });
    })();
    aeq.extend(tb, {
      createIconFile: function (i, n) {
        var j = new File(tb.iconFolder.fsName + "/" + i);
        var k = "";
        if (j.exists) {
          j.encoding = "BINARY";
          if (j.open("r", "TEXT", "????")) {
            k = j.read();
            j.close();
          }
        } else {
          var I = new Folder(j.path);
          if (!I.exists) {
            I.create();
          }
        }
        var A = k == n;
        if (!A) {
          j.encoding = "BINARY";
          if (j.open("w")) {
            A = j.write(n);
            j.close();
          }
        }
        return A ? j : false;
      },
      getIcon: function (i) {
        if (!tb.hasIcon(i)) {
          return false;
        }
        var n = new File(tb.iconFolder.fsName + "/" + i.icon);
        if (n.exists) {
          return n;
        } else {
          alert(
            "Error! Could not find icon\nIcon for " +
              i.name +
              " was not found.",
            "Error",
            true,
          );
          return false;
        }
      },
      hasIcon: function (i) {
        return i.icon !== undefined && i.icon !== "";
      },
      uploadIcon: function (i) {
        if (!i.exists) {
          return false;
        }
        i.open("r");
        i.encoding = "BINARY";
        var n = i.read();
        var j = n.toSource();
        j = j.replace(/^\(new String\("/, "");
        j = j.replace(/"\)\)$/, "");
        i.close();
        tb.config.icons[i.name] = escape(n);
        i = tb.createIconFile(i.name, n);
        if (i) {
          return i.name;
        } else {
          return false;
        }
      },
    });
    (function () {
      function k(i) {
        var n = tb.readFile(i);
        if (!n) {
          return new Error("Error reading file");
        } else {
          if (n instanceof Error) {
            return n;
          }
        }
        var j = null;
        try {
          j = JSON.parse(n);
        } catch (i) {
          i.message = "Error parsing json file\n" + i.message;
          return i;
        }
        return j;
      }
      function I(i) {
        aeq.forEach(i, function (i, n) {
          tb.config.icons[i] = n;
          tb.createIconFile(i, unescape(n));
        });
      }
      tb.importFTToolbar = function (i) {
        function h(i) {
          var k = { description: i.longName, icon: i.icon, name: i.shortName };
          var I = 0;
          tb.forEachCmd(i, function (i, n) {
            if (i === "cmdDefault") {
              i = "cmd";
            }
            var j = n.type.toLowerCase();
            if (j === "effect") {
              A = true;
              return;
            }
            if (j === "script launcher") {
              j = "script";
            }
            if (n.cmd) {
              n.type = j;
              k[i] = n;
              I++;
            }
          });
          if (I > 0) {
            return k;
          } else {
            return null;
          }
        }
        var n = k(i);
        var A = false;
        var I = [];
        if (n instanceof Error) {
          alert(n.message + " on line " + n.line);
          return;
        }
        aeq.forEach(n.toolbars, function (i) {
          var j = tb.createToolbar(i.name);
          var k = 0;
          aeq.forEach(i.btns, function (i) {
            var n = h(i);
            if (n !== null) {
              tb.addToolToToolbar(n, j, k);
              I.push(n);
              k++;
            }
          });
        });
        if (A) {
          alert(
            "Effect commands not supported\nAny command of type effect has been skipped",
          );
        }
        aeq.forEach(n.icons, function (i, n) {
          tb.config.icons[i] = n.bin;
          tb.createIconFile(i, unescape(n.bin));
        });
        tb.configChangedSinceSave = true;
        return I;
      };
      tb.importFullFTToolbar = function (i) {
        var n = tb.importFTToolbar(i);
        if (n) {
          Array.prototype.push.apply(tb.config.tools, n);
        }
      };
      tb.importPack = function (i) {
        var n = k(i);
        if (n instanceof Error) {
          alert(n.message);
          return;
        }
        var j = i.name;
        if (n.name) {
          j = n.name;
          if (n.version) {
            j += " (" + n.version + ")";
          }
          if (n.author) {
            j += " by " + n.author;
          }
        }
        if (n.tools) {
          aeq.forEach(n.tools, function (i) {
            i.location = j;
          });
          Array.prototype.push.apply(tb.config.tools, n.tools);
        }
        if (n.folders) {
          Array.prototype.push.apply(tb.config.folders, n.folders);
        }
        if (n.scriptSettings) {
          aeq.extend(true, tb.config.scriptSettings, n.scriptSettings);
        }
        if (n.aescriptSettings) {
          aeq.extend(true, tb.config.scriptSettings, n.aescriptSettings);
        }
        if (n.icons) {
          I(n.icons);
        }
        tb.config.packs[j] = j;
        tb.configChangedSinceSave = true;
      };
    })();
    (function () {
      function n(i) {
        if (isValid(i[1])) {
          i[0]();
          return true;
        }
        return false;
      }
      tb.refresh = function (i) {
        tb.reload(i);
        globalToolbox.refreshHandlers = aeq.filter(
          globalToolbox.refreshHandlers,
          n,
        );
      };
      tb.softRefresh = function () {
        tb.reload();
        globalToolbox.softRefreshHandlers = aeq.filter(
          globalToolbox.softRefreshHandlers,
          n,
        );
      };
      tb.registerSoftRefreshHandler = function (i, n) {
        globalToolbox.softRefreshHandlers.push([i, n]);
      };
      tb.registerRefreshHandler = function (i, n) {
        globalToolbox.refreshHandlers.push([i, n]);
      };
      tb.unRegisterRefreshHandler = function (n) {
        globalToolbox.softRefreshHandlers = aeq.filter(
          globalToolbox.softRefreshHandlers,
          function (i) {
            return n === i[0];
          },
        );
        globalToolbox.refreshHandlers = aeq.filter(
          globalToolbox.refreshHandlers,
          function (i) {
            return n === i[0];
          },
        );
      };
      if (globalToolbox.refreshHandlers === undefined) {
        globalToolbox.refreshHandlers = [];
      }
      if (globalToolbox.softRefreshHandlers === undefined) {
        globalToolbox.softRefreshHandlers = [];
      }
    })();
    (function () {
      function I() {
        var i = new Folder(tb.toolboxFolder);
        if (!i.exists) {
          i.create();
        }
      }
      function i() {
        n(tb.config.aescriptSettings);
        n(tb.config.scriptSettings);
      }
      function n(i) {
        aeq.forEach(i, j);
      }
      function j(i, n) {
        k(n, A);
        tb.forEachCmd(n, function (i, n) {
          k(n, h);
        });
      }
      function k(j, i) {
        aeq.forEach(i, function (i, n) {
          if (j[i] === n) {
            j[i] = "";
          }
        });
      }
      aeq.extend(tb, {
        backup: function (i) {
          i = i !== undefined ? "." + i : "";
          if (tb.settings.configSet) {
            n = tb.settings.configPath;
          } else {
            n = tb.defaultConfigPath;
          }
          I();
          var j = new File(n);
          if (j.exists) {
            j.copy(new File(tb.defaultConfigPath + i + ".backup"));
          }
        },
        save: function () {
          tb.backup();
          tb.cleanup();
          i();
          tb.saveSettings();
          if (tb.configChangedSinceSave === true) {
            tb.saveConfig();
            tb.configChangedSinceSave = false;
          }
        },
        saveConfig: function () {
          var n = JSON.stringify(tb.config, function (i, n) {
            if (n === "") {
              return undefined;
            }
            return n;
          });
          if (tb.settings.configSet) {
            i = tb.settings.configPath;
          } else {
            i = tb.defaultConfigPath;
            I();
          }
          var j = tb.writeFile(i, n);
          if (j instanceof Error) {
            var k = new tb.PrettyError("Error writing config file", j.message);
            k.alert();
          }
        },
        saveSettings: function () {
          var i = JSON.stringify(tb.settings);
          aeq.settings.save(tb.script.name, tb.script.name + "Settings", i);
        },
        setConfig: function (i) {
          tb.settings.configPath = i;
          tb.settings.configSet = true;
          tb.configMissing = false;
          var n = new File(i);
          if (!n.exists) {
            tb.saveConfig();
          } else {
            f();
          }
        },
      });
      var A = {
        description: "",
        hide: false,
        icon: "",
        name: "",
        shortname: "",
        star: false,
      };
      var h = { cmd: "", showInList: false, showInPanel: false, type: "" };
    })();
    (function () {
      tb.search = function (i, n, j, k) {
        j.removeAll();
        i = i.toLowerCase();
        for (var h = 0, f = n.length; h < f; h++) {
          I = n[h];
          if (!k && I.hide === true) {
            continue;
          }
          var B = tb.getToolName(I);
          if (B.toLowerCase().indexOf(i) === -1) {
            continue;
          }
          A = j.add("item", B);
          A.tool = I;
        }
      };
      tb.searchFn = function (i) {
        return aeq.filter(tb.tools.all, i);
      };
    })();
    (function () {
      aeq.extend(tb, {
        create: function (i) {
          var n = tb.newTool(i);
          tb.config.tools.push(n);
          tb.tools.all.push(n);
          return n;
        },
        getAllTools: function () {
          return tb.tools.all;
        },
        getConfigTools: function () {
          return aeq.filter(tb.config.tools, function (i) {
            return i.location === undefined;
          });
        },
        getStarredTools: function () {
          return tb.searchFn(function (i) {
            return i.star;
          });
        },
        getToolName: function (i, n) {
          var j = i.name;
          var k = !n && i.prefix ? i.prefix + " " : "";
          if (i.shortname) {
            j += " (" + i.shortname + ")";
          }
          return k + j;
        },
        newTool: function (i) {
          var n = {
            cmd: { cmd: "", type: "" },
            description: "",
            name: "No Name",
          };
          var j = aeq.extend(n, i);
          return j;
        },
        remove: function (i) {
          i.remove = true;
          i.hide = true;
          tb.configChangedSinceSave = true;
        },
      });
      tb.getAllTools.searchFn = false;
      tb.getConfigTools.searchFn = false;
      tb.getStarredTools.searchFn = false;
    })();
    aeq.extend(tb, {
      cmdName: function (i) {
        var n = "cmd";
        if (i.metaKey) {
          n += "Meta";
        }
        if (i.ctrlKey) {
          n += "Ctrl";
        }
        if (i.shiftKey) {
          n += "Shift";
        }
        if (i.altKey) {
          n += "Alt";
        }
        return n;
      },
      getCmd: function (i, n) {
        var j = tb.cmdName(n);
        return i[j];
      },
      saveCmd: function (i, n, j) {
        var k = tb.cmdName(n);
        i[k] = j;
        return i;
      },
    });
    aeq.extend(tb, {
      addToolToToolbar: function (i, n, j) {
        if (!i.toolbars) {
          i.toolbars = {};
        }
        if (tb.toolInToolbar(i, n)) {
          return false;
        }
        if (j === undefined) {
          j = tb.getToolbarTools(n).length;
        }
        if (
          tb.isTrial &&
          tb.getToolbarTools(n).length >= tb.trialLimit.maxToolbarTools
        ) {
          alert(
            "Cannot add more tools to this toolbar when using the trial version\nPlease purchase " +
              tb.script.name +
              " to add more tools",
          );
          return false;
        }
        i.toolbars[n.name] = { index: j };
        tb.ToolSetter.prototype.changed(i, "toolbars");
        return true;
      },
      addToolbarsToList: function (k) {
        k.removeAll();
        tb.forEachToolbar(function (i, n) {
          var j = k.add("item", n.name);
          j.toolbar = n;
        });
      },
      createToolbar: function (i) {
        var n = i;
        var j = 2;
        if (tb.isTrial && tb.numToolbars() >= tb.trialLimit.maxToolbars) {
          alert(
            "Cannot create more toolbars when using the trial version\nPlease purchase " +
              tb.script.name +
              " to use create toolbars",
          );
          return false;
        }
        while (tb.toolbars[n] !== undefined) {
          n = i + " " + j;
          j++;
        }
        var k = { name: n, newlyCreated: true };
        tb.toolbars[n] = k;
        return k;
      },
      deleteToolbar: function (n) {
        if (n.locked) {
          return false;
        }
        aeq.forEach(tb.getToolbarTools(n), function (i) {
          tb.removeToolFromToolbar(i, n);
        });
        n.newlyCreated = false;
        tb.loadToolbars();
        return true;
      },
      forEachToolbar: function (i) {
        aeq.forEach(tb.toolbars, i);
      },
      getToolbarNames: function (i) {
        var j = [];
        aeq.forEach(i.toolbars, function (i, n) {
          j.push(i);
        });
        return j;
      },
      getToolbarTools: function (n) {
        var I = n.name;
        var i = aeq.filter(tb.tools.all, function (i) {
          return tb.toolInToolbar(i, n);
        });
        i.sort(function (i, n) {
          var j = i.toolbars[I];
          var k = n.toolbars[I];
          if (j.index < k.index) {
            return -1;
          } else {
            if (j.index > k.index) {
              return 1;
            }
          }
          return 0;
        });
        return i;
      },
      loadToolbars: function () {
        function k(i) {
          tb.toolbars[i] = { name: i };
          n = false;
        }
        function I(i, n) {
          if (!tb.toolbars[n]) {
            k(n);
          }
        }
        var j = {};
        tb.forEachToolbar(function (i, n) {
          if (n !== undefined && n.newlyCreated) {
            j[i] = n;
          }
        });
        tb.toolbars = j;
        var n = true;
        aeq.forEach(tb.config.toolbars, k);
        aeq.forEach(tb.tools.all, function (j) {
          if (j.toolbars) {
            aeq.forEach(j.toolbars, function (i, n) {
              if (n !== undefined) {
                I(j, i);
              }
            });
          }
        });
        if (n) {
          k(tb.script.name + " Toolbar");
        }
      },
      numToolbars: function () {
        var i = 0;
        tb.forEachToolbar(function () {
          i++;
        });
        return i;
      },
      removeToolFromToolbar: function (i, n) {
        if (!i.toolbars) {
          return;
        }
        if (n.locked) {
          return false;
        }
        i.toolbars[n.name] = undefined;
        tb.ToolSetter.prototype.changed(i, "toolbars");
        return true;
      },
      renameToolbar: function (j, k) {
        var i = tb.getToolbarTools(j);
        aeq.forEach(i, function (i) {
          var n = i.toolbars[j.name];
          if (n) {
            i.toolbars[k] = n;
            i.toolbars[j.name] = undefined;
            tb.ToolSetter.prototype.changed(i, "toolbars");
          }
        });
        tb.toolbars[j.name] = undefined;
        j.name = k;
        tb.toolbars[j.name] = j;
      },
      toolInToolbar: function (i, n) {
        if (!i.toolbars) {
          return false;
        }
        return i.toolbars[n.name] !== undefined;
      },
    });
    aeq.extend(tb, {
      initPacks: function () {
        tb.tools.packs = tb.config.packs;
      },
      removePack: function (n) {
        var i = tb.config.tools;
        for (var j = i.length - 1; j >= 0; j--) {
          if (i[j].location === n) {
            i.splice(j, 1);
          }
        }
        var k = tb.config.packs;
        aeq.forEach(k, function (i) {
          if (i === n) {
            delete k[i];
          }
        });
        tb.configChangedSinceSave = true;
      },
    });
    tb.ToolSetter = function () {};
    tb.ToolSetter.prototype = {
      changed: function (i, n, j) {
        var k = this.getSavinglocation(i, "tool");
        if (arguments.length === 2) {
          j = i[n];
        } else {
          i[n] = j;
        }
        if (k !== null) {
          k[n] = j;
        }
        tb.configChangedSinceSave = true;
      },
      changedCmd: function (i, n, j, k) {
        var I = this.getSavinglocation(i, "tool");
        if (arguments.length === 3) {
          k = i[n][j];
        } else {
          i[n][j] = k;
        }
        if (I !== null) {
          I[n][j] = k;
        }
        tb.configChangedSinceSave = true;
      },
      cmd: null,
      getSavinglocation: function (i, n) {
        if (!i || i.settings === undefined) {
          return null;
        }
        k = tb.config[i.settings];
        if (k === undefined) {
          return null;
        }
        j = i.relativeURI;
        if (k[j] === undefined) {
          k[j] = {};
        }
        if (n === "tool") {
          return k[j];
        } else {
          if (k[j][n] === undefined) {
            k[j][n] = {};
          }
          return k[j][n];
        }
      },
      getSetterFunction: function (i, n, j) {
        var k = this;
        return function () {
          k.setValue(i, n, this[j]);
        };
      },
      onClose: function () {},
      setValue: function (i, n, j) {
        if (this[i] === null || this[i][n] === j) {
          return;
        }
        var k = this.getSavinglocation(this.tool, i);
        if (k !== null) {
          k[n] = j;
        }
        this[i][n] = j;
        tb.configChangedSinceSave = true;
        tb.softRefresh();
      },
      tool: null,
    };
    aeq.extend(tb, {
      forEachCmd: function (j, k) {
        aeq.forEach(j, function (i, n) {
          if (n !== undefined && i.indexOf("cmd") > -1) {
            return k(i, n, j);
          }
        });
      },
      getModifiers: function () {
        return {
          altKey: ScriptUI.environment.keyboardState.altKey,
          ctrlKey: ScriptUI.environment.keyboardState.ctrlKey,
          metaKey: ScriptUI.environment.keyboardState.metaKey,
          shiftKey: ScriptUI.environment.keyboardState.shiftKey,
        };
      },
    });
    tb.update = {
      check: function (i) {
        return tb.update.checkForUpdate({
          contactInfo: tb.script.supportEmail,
          name: i,
          updatepath:
            "/download/scripts/" + escape(tb.script.name) + "/" + i + ".xml",
          version: tb.script.version,
        });
      },
      checkAll: function () {
        var i = {
          contactInfo: tb.script.supportEmail,
          name: tb.script.name,
          updatepath: tb.script.updateURL,
          version: tb.script.version,
        };
        var n = tb.update.getAescriptUpdateInfo(i);
        if (!n) {
          alert("Could not load version information");
          return;
        }
        if (n instanceof Error) {
          alert(
            "Error looking for update:\n" +
              n.message +
              "\n" +
              "Check for updates manually at: " +
              tb.script.downloadURL +
              "\n" +
              "Or contact support at: " +
              tb.script.supportEmail,
            true,
          );
          return;
        }
        if (n === true) {
          alert("already up-to-date");
          return;
        }
        tb.update.promptForUpdate(n);
      },
      checkForUpdate: function () {
        var i = {
          contactInfo: tb.script.supportEmail,
          name: tb.script.name,
          updatepath: tb.script.updateURL,
          version: tb.script.version,
        };
        var n = tb.update.getAescriptUpdateInfo(i);
        if (!n || n instanceof Error || n === true) {
          return false;
        }
        return n;
      },
      download: function (i) {
        var n = tb.script.updateHost;
        if (i.indexOf(n) > -1) {
          i = i.substring(i.indexOf(n) + n.length);
        }
        var j = "";
        var k = new Socket();
        if (k.open(n + ":80")) {
          k.writeln("GET " + i + " HTTP/1.0\nHost: " + n + "\n");
          j = k.read(999999);
        }
        k.close();
        var I = j.substring(0, j.indexOf("\n"));
        var A = /^(?:HTTP|http)\/(?:1|2)\.\d (\d{3} .+)$/;
        var h = I.match(A);
        if (h === null) {
          return new Error("No internet");
        }
        if (h[1].toUpperCase() !== "200 OK") {
          return new Error(h[1]);
        }
        return j.substring(j.indexOf("\n\n") + 2);
      },
      getAescriptUpdateInfo: function (i) {
        var n = tb.update.download(i.updatepath);
        if (n instanceof Error) {
          return n;
        }
        if (n === "" || n.indexOf("data") === -1) {
          return false;
        }
        var j = JSON.parse(n);
        if (j.status !== "ok") {
          return false;
        }
        var k = tb.update.getChangelog(j, i);
        if (k === false) {
          return false;
        }
        if (k === "") {
          return true;
        }
        j.data.changelog = k;
        return j;
      },
      getChangelog: function (i, n) {
        var j = "";
        if (
          !i.data ||
          !i.data["Tool Launcher"] ||
          !i.data["Tool Launcher"].history
        ) {
          return false;
        }
        aeq.forEach(i.data["Tool Launcher"].history, function (i) {
          if (i.version_number > n.version) {
            j += i.version_number + "\n" + i.detail + "\n";
          }
        });
        return j;
      },
      openUpdateInfo: function (i, n) {
        tb.update.promptForUpdate(i);
      },
      promptForUpdate: function (i) {
        var n = confirm(
          "A new version of " +
            tb.script.name +
            " is available!\n" +
            "Changelog:\n" +
            i.data.changelog +
            "\n\n" +
            'Click "yes" to open the website where you can download the update.\n' +
            "Or open " +
            tb.script.downloadURL +
            " in your browser to update later.",
        );
        if (n) {
          aeq.command.openURL(tb.script.downloadURL);
        }
      },
    };
    return tb;
  })();
  var tb = toolbox;
  tb.ui = (function () {
    var N = {};
    N.u = {
      error: function (i) {
        var n = i;
        if (i.line) {
          n = i.fileName + "\n" + i.message + " on line " + i.line;
        } else {
          if (err.message) {
            n = err.message;
          }
        }
        alert("Error!\n" + n);
      },
      fill: ["fill", "fill"],
      getPrimaryScreen: function () {
        return aeq.filter($.screens, function (i) {
          return i.primary;
        })[0];
      },
    };
    N.icon = {
      arrowDown: __BLOB__BLOB_000713__,
      arrowLeft: __BLOB__BLOB_000714__,
      arrowRight: __BLOB__BLOB_000715__,
      arrowUp: __BLOB__BLOB_000716__,
      close: __BLOB__BLOB_000717__,
      create: __BLOB__BLOB_000718__,
      hide: __BLOB__BLOB_000719__,
      hideEnabled: __BLOB__BLOB_000720__,
      maximize: __BLOB__BLOB_000721__,
      minimize: __BLOB__BLOB_000722__,
      refresh: __BLOB__BLOB_000723__,
      remove: __BLOB__BLOB_000724__,
      settings: __BLOB__BLOB_000725__,
      star: __BLOB__BLOB_000726__,
      starEnabled: __BLOB__BLOB_000727__,
    };
    (function () {
      var A = true;
      aeq.forEach(N.icon, function (i, n) {
        if (aeq.isString(n)) {
          j = tb.createIconFile("/" + tb.script.name + "/" + i + ".png", n);
          if (j) {
            N.icon[i] = j;
          } else {
            A = false;
          }
        } else {
          if (n instanceof File) {
            j = n;
            j.open("r");
            j.encoding = "BINARY";
            var k = j.read();
            var I = k.toSource();
            I = I.replace(/^\(new String\("/, "");
            I = I.replace(/"\)\)$/, "");
            j.close();
            alert(i + ': "' + I + '"');
          }
        }
      });
      if (!A) {
        alert("Error writing some icon files", tb.script.name + " error", true);
      }
      N.icon.starImage = ScriptUI.newImage(
        N.icon.star,
        undefined,
        N.icon.starEnabled,
        undefined,
      );
      N.icon.hideImage = ScriptUI.newImage(
        N.icon.hide,
        undefined,
        N.icon.hideEnabled,
        undefined,
      );
      N.icon.toggleFullscreen = ScriptUI.newImage(
        N.icon.maximize,
        undefined,
        N.icon.minimize,
        undefined,
      );
    })();
    N.createInfoPanel = function (i, n) {
      function F() {
        h.modifiers = {
          altKey: B.modifiers.altKey.value,
          ctrlKey: B.modifiers.ctrlKey.value,
          metaKey: B.modifiers.metaKey.value,
          shiftKey: B.modifiers.shiftKey.value,
        };
        h.updateCommand();
      }
      function J() {
        B.modifiers.metaKey.value = false;
        B.modifiers.ctrlKey.value = false;
        B.modifiers.shiftKey.value = false;
        B.modifiers.altKey.value = false;
      }
      function L(k, i) {
        var n = app.effects;
        var j = {};
        aeq.forEach(n, function (i) {
          if (!j[i.category]) {
            j[i.category] = [];
          }
          j[i.category].push(i);
        });
        aeq.forEach(j, function (i, n) {
          var j = k.add("item", i);
          j.effects = n;
          E[i] = j;
        });
      }
      function l(i) {
        function I(i) {
          var n = app.effects;
          i = i.toLowerCase();
          for (var j = 0; j < n.length; j += 1) {
            if (n[j].matchName.toLowerCase() === i) {
              return n[j];
            }
          }
          return null;
        }
        var n = I(i);
        var j = tb.configChangedSinceSave;
        if (n === null) {
          B.contents.effectGroup.category.selection = null;
        } else {
          var k = E[n.category];
          B.contents.effectGroup.category.selection = k;
        }
        tb.configChangedSinceSave = j;
      }
      var h = new tb.ToolSetter();
      aeq.extend(h, {
        commandEditor: function (i) {
          if (i === undefined || i === null || i === "") {
            B.contents.textBox.visible = false;
            B.contents.filePath.obj.visible = false;
            B.contents.effectGroup.obj.visible = false;
            return;
          }
          if (i === "script" || i === "javascript") {
            B.showInList.value = h.cmd.showInList;
            B.showInList.enabled = true;
            B.showInPanel.value = h.cmd.showInPanel;
            B.showInPanel.enabled = true;
          } else {
            B.showInList.value = false;
            B.showInList.enabled = false;
            B.showInPanel.value = false;
            B.showInPanel.enabled = false;
          }
          B.contents.btns.edit.tempFile = null;
          if (i === "script" || i === "animation preset") {
            B.contents.textBox.visible = false;
            B.contents.filePath.obj.visible = true;
            B.contents.effectGroup.obj.visible = false;
            B.contents.btns.open.enabled = true;
            return B.contents.filePath.path;
          } else if (i === "effect") {
            B.contents.textBox.visible = false;
            B.contents.filePath.obj.visible = false;
            B.contents.effectGroup.obj.visible = true;
            B.contents.btns.open.enabled = false;
            return B.contents.effectGroup.dropdown;
          } else {
            B.contents.textBox.visible = true;
            B.contents.filePath.obj.visible = false;
            B.contents.effectGroup.obj.visible = false;
            B.contents.btns.open.enabled = false;
            return B.contents.textBox;
          }
        },
        init: function () {
          if (tb.aeversion >= 12) {
            h.panel.enabled(false);
          }
          h.commandEditor();
        },
        load: function (i) {
          h.tool = i;
          h.panel.enabled(true);
          h.star.value = i.star;
          h.hide.value = i.hide;
          h.name.text = i.name;
          h.shortname.text = i.shortname || "";
          h.description.text = i.description || "";
          h.icon.setImage();
          h.updateCommand();
          h.toolbar.init();
        },
        modifiers: {
          altKey: false,
          ctrlKey: false,
          metaKey: false,
          shiftKey: false,
        },
        previousScriptFile: null,
        unLoad: function () {
          h.load({
            description: "",
            hide: false,
            icon: "",
            name: "",
            star: false,
          });
          h.panel.enabled(false);
          J();
        },
        updateCommand: function () {
          var i = tb.cmdName(h.modifiers);
          var n = h.tool[i];
          if (n === undefined) {
            n =
              h.tool[i] =
              h.cmd =
                { cmd: "", showInList: false, showInPanel: false, type: null };
          }
          if (n !== undefined) {
            B.editCmdGrp.visible(n.hide === true ? false : true);
            h.cmd = n;
            if (n.type === null || n.type === "") {
              B.type.selection = null;
              j = n.type;
            } else {
              j = n.type.toLowerCase();
              for (var k = 0, I = B.type.items.length; k < I; k++) {
                if (B.type.items[k].text.toLowerCase() === j) {
                  B.type.selection = k;
                  break;
                }
              }
            }
            var A = h.commandEditor(j);
            if (A) {
              if (j === "script" || j === "animation preset") {
                A.text = decodeURIComponent(n.cmd);
              } else if (j === "effect") {
                l(n.cmd);
              } else {
                A.text = n.cmd;
              }
            }
          }
        },
      });
      var j = (h.panel = i.addPanel({
        alignChildren: ["fill", "top"],
        alignment: N.u.fill,
        text: "Tool settings",
      }));
      j.btns = j.addGroup({ alignChildren: ["left", "top"] });
      h.star = j.btns.addIconButton({
        helpTip: "Favourite; Shows on top in lists",
        image: N.icon.starImage,
        onClick: h.getSetterFunction("tool", "star", "value"),
        properties: { toggle: true },
        size: [30, 30],
      });
      h.hide = j.btns.addIconButton({
        helpTip: "Hide; Do not show in lists",
        image: N.icon.hideImage,
        onClick: h.getSetterFunction("tool", "hide", "value"),
        properties: { toggle: true },
        size: [30, 30],
      });
      h.toolbar = j.btns.addDropdownList({
        helpTip: "Add tool to toolbar",
        onChange: function () {
          if (this.selection) {
            tb.addToolToToolbar(h.tool, this.selection.toolbar);
            tb.softRefresh();
            this.selection = null;
          }
        },
        size: [30, 30],
      });
      h.toolbar.init = function () {
        tb.addToolbarsToList(h.toolbar);
      };
      var k = j.addGroup({ alignChildren: ["fill", "fill"] });
      k.addStatictext({ alignment: ["left", "fill"], text: "Name:" });
      h.name = k.addEditText({
        onChange: function () {
          if (h.tool !== null) {
            h.setValue("tool", "name", this.text);
            if (n && n.updateName) {
              n.updateName(tb.getToolName(h.tool));
            }
          }
        },
      });
      var k = j.addGroup({ alignChildren: ["fill", "fill"] });
      k.addStatictext({
        alignment: ["left", "fill"],
        helpTip: "Used when not enough room to show full name",
        text: "Shortname:",
      });
      h.shortname = k.addEditText({
        helpTip: "Used when not enough room to show full name",
        onChange: function () {
          if (h.tool !== null) {
            h.setValue("tool", "shortname", this.text);
            if (n && n.updateName) {
              n.updateName(tb.getToolName(h.tool));
            }
          }
        },
      });
      var I = j.addGroup({ alignChildren: ["fill", "fill"] });
      I.addStatictext({
        alignment: ["left", "fill"],
        helpTip: "Used as a helpTip in toolbars",
        text: "Description:",
      });
      h.description = I.addEditText({
        helpTip: "Used as a helpTip in toolbars",
        onChange: h.getSetterFunction("tool", "description", "text"),
      });
      var A = j.addGroup({ alignChildren: ["fill", "fill"] });
      A.addStatictext({
        alignment: ["left", "fill"],
        helpTip: "Used instead of name in toolbars",
        text: "Icon:",
      });
      h.icon = A.addImage({
        helpTip: "Used instead of name in toolbars",
        maximumSize: [30, 30],
      });
      h.icon.setImage = function () {
        var i = tb.getIcon(h.tool);
        if (i) {
          h.icon.visible = true;
          h.icon.image = i.fsName;
          A.removeIcon.enabled = true;
        } else {
          h.icon.visible = false;
          A.removeIcon.enabled = false;
        }
      };
      if ($.os.indexOf("Windows") === -1) {
        var f = /\.png$/i;
        A.fileFilter = function (i) {
          return i instanceof Folder || f.test(i.name);
        };
      } else {
        A.fileFilter = "png:*.png";
      }
      A.addButton({
        alignment: ["left", "fill"],
        onClick: function () {
          if (h.tool !== null) {
            i = File.openDialog("Select Icon File", A.fileFilter);
            if (i) {
              var j = tb.uploadIcon(i);
              if (j) {
                h.setValue("tool", "icon", j);
                h.icon.setImage(h.tool);
                tb.configChangedSinceSave = true;
              } else {
                alert("Something went wrong. Could not upload the file");
              }
            }
          }
        },
        text: "Change",
      });
      A.removeIcon = A.addButton({
        alignment: ["left", "fill"],
        onClick: function () {
          if (h.tool !== null) {
            h.icon.visible = false;
            A.removeIcon.enabled = false;
            h.setValue("tool", "icon", "");
          }
        },
        text: "Remove",
      });
      var B = j.addPanel({
        alignChildren: ["fill", "top"],
        alignment: ["fill", "fill"],
        orientation: "column",
        text: "Command",
      });
      var m = {};
      var E = {};
      B.events = {
        effectCategoryChange: function () {
          var j = B.contents.effectGroup.dropdown;
          j.removeAll();
          if (this.selection === null) {
            return;
          }
          var i = this.selection.effects;
          aeq.forEach(i, function (i) {
            var n = j.add("item", i.displayName);
            n.effectMatchName = i.matchName;
            n.category = i.category;
            if (
              h.cmd &&
              h.cmd.cmd.toLowerCase() === i.matchName.toLowerCase()
            ) {
              j.selection = n;
            }
          });
        },
        effectChange: function () {
          if (h.cmd === null) {
            return;
          }
          if (this.selection === null) {
            h.setValue("cmd", "cmd", "");
            return;
          }
          h.setValue("cmd", "cmd", this.selection.effectMatchName);
        },
        filePathClick: function () {
          if (h.cmd !== null) {
            if (h.cmd && h.cmd.cmd instanceof i) {
              n = h.cmd;
            } else {
              if (h.previousScriptFile) {
                n = h.previousScriptFile.parent;
              }
            }
            if (h.cmd.type === "script") {
              j = tb.jsxFileFilter();
            } else {
              if (h.cmd.type === "animation preset") {
                j = tb.ffxFileFilter();
              }
            }
            if (n) {
              i = new File(n).openDlg("Select a script file", j);
            } else {
              i = File.openDialog("Select a script file", j);
            }
            if (i !== null) {
              h.setValue("cmd", "cmd", i.fsName);
              B.contents.filePath.path.text = h.cmd.cmd;
            } else {
              if (B.contents.filePath.path.text === "") {
                B.type.selection = null;
                return false;
              }
            }
          }
        },
        typeOnChange: function () {
          if (this.selection === null) {
            h.commandEditor();
          } else {
            var i = h.commandEditor(this.selection.text);
            if (h.cmd) {
              h.cmd.type = this.selection.text;
              h.setValue("cmd", "type", this.selection.text);
              if (this.selection.text === "effect") {
                l(h.cmd.cmd);
              } else {
                i.text = h.cmd.cmd;
              }
            }
            if (
              this.selection.text === "script" ||
              this.selection.text === "animation preset"
            ) {
              if (
                !i.text &&
                B.contents.filePath.change.onClick() !== false &&
                this.selection.text === "script"
              ) {
                B.showInPanel.value = true;
                B.showInPanel.onClick();
              }
            }
          }
        },
      };
      B.modifiers = B.addPanel({ orientation: "row", text: "Modifiers" });
      if (system.osName === "MacOS") {
        B.modifiers.metaKey = B.modifiers.addCheckbox("Cmd", F);
      } else {
        B.modifiers.metaKey = B.modifiers.addCheckbox("Meta", F);
      }
      B.modifiers.altKey = B.modifiers.addCheckbox("Alt", F);
      B.modifiers.ctrlKey = B.modifiers.addCheckbox("Control", F);
      B.modifiers.shiftKey = B.modifiers.addCheckbox("Shift", F);
      B.editCmdGrp = B.addGroup({
        alignChildren: ["left", "top"],
        alignment: ["fill", "fill"],
        orientation: "column",
      });
      B.typeGrp = B.editCmdGrp.addGroup();
      B.typeGrp.addStatictext("Type:");
      B.type = B.typeGrp.addDropdownList({
        helpTip: "Select which type the command is",
        items: tb.types,
        onChange: B.events.typeOnChange,
      });
      B.showInList = B.editCmdGrp.addCheckbox({
        helpTip:
          "If the script has UI, try to show it in " +
          tb.script.shortname +
          "_list. " +
          "(Will try to show it in the " +
          tb.script.shortname +
          "_panel first, if both are checked)",
        onClick: function () {
          if (h.cmd !== null) {
            h.setValue("cmd", "showInList", this.value);
          }
        },
        text: "Show UI in " + tb.script.shortname + "_list",
      });
      B.showInPanel = B.editCmdGrp.addCheckbox({
        helpTip: "Show the UI in an external panel, if the panel is available.",
        onClick: h.getSetterFunction("cmd", "showInPanel", "value"),
        text: "Show UI in " + tb.script.shortname + "_panel",
      });
      B.contents = B.editCmdGrp.addPanel({
        alignment: N.u.fill,
        orientation: "stack",
        text: "Contents",
      });
      B.contents.textBox = B.contents.addEditText({
        alignment: N.u.fill,
        minimumSize: [200, 100],
        onChange: h.getSetterFunction("cmd", "cmd", "text"),
        properties: { multiline: true },
      });
      B.contents.filePath = B.contents.addGroup({ alignment: ["fill", "top"] });
      B.contents.filePath.change = B.contents.filePath.addButton({
        alignment: ["left", "fill"],
        onClick: B.events.filePathClick,
        text: "Change",
      });
      B.contents.filePath.path = B.contents.filePath.addEditText({
        alignment: ["fill", "fill"],
      });
      B.contents.effectGroup = B.contents.addGroup({
        alignment: ["fill", "top"],
        orientation: "column",
      });
      B.contents.effectGroup.category = B.contents.effectGroup.addDropdownList({
        alignment: ["fill", "fill"],
        onChange: B.events.effectCategoryChange,
        text: "Category",
      });
      B.contents.effectGroup.dropdown = B.contents.effectGroup.addDropdownList({
        alignment: ["fill", "fill"],
        onChange: B.events.effectChange,
        text: "Effect",
      });
      L(B.contents.effectGroup.category, B.contents.effectGroup.dropdown);
      B.contents.btns = B.addGroup({ alignment: ["fill", "bottom"] });
      B.contents.btns.open = B.contents.btns.addButton("Reveal", function () {
        if (h.cmd && h.cmd.cmd) {
          if (h.cmd.type.toLowerCase() === "script") {
            if (h.cmd.cmd instanceof File) {
              i = h.cmd.cmd.fsName;
            } else {
              i = h.cmd.cmd;
            }
          }
          aeq.revealFile(i);
        }
      });
      B.contents.btns.edit = B.contents.btns.addButton("Edit", function () {
        if (h.cmd && h.cmd.cmd) {
          if (h.cmd.type.toLowerCase() === "script") {
            if (h.cmd.cmd instanceof File) {
              i = h.cmd.cmd.fsName;
            } else {
              i = h.cmd.cmd;
            }
          } else {
            n = new File(Folder.temp.fsName + "/" + Date.now() + ".js");
            n.encoding = "UTF-8";
            if (!aeq.writeFile(n, h.cmd.cmd)) {
              alert("Something went wrong writing temp file.");
              return;
            }
            i = n.fsName;
            B.contents.btns.edit.tempFile = n;
            B.contents.btns.refresh.enabled = true;
          }
          var j = tb.settings.editor;
          if (aeq.isMac) {
            j = j + ' "' + i + '"';
          } else {
            j = j + ' "' + i + '"';
            j = 'cmd /c "' + j + '"';
          }
          system.callSystem(j);
        }
      });
      B.contents.btns.refresh = B.contents.btns.addIconButton({
        icon: tb.ui.icon.refresh,
        onClick: function () {
          var i = B.contents.btns.edit.tempFile;
          if (i) {
            var n = aeq.readFile(i);
            B.contents.textBox.text = n;
            B.contents.textBox.onChange();
          }
        },
      });
      h.init();
      if (n && n.noAeq) {
        h.panel = h.panel.obj;
      }
      return h;
    };
    N.contextMenu = function (i) {
      function I() {
        k.hide();
        tb.save();
        tb.refresh();
      }
      var j = { buttons: 4, height: 21, maxWidth: 90 };
      var A = new tb.ToolSetter();
      var n = [
        {
          name: "edit",
          onClick: function () {
            var i = tb.getModifiers();
            var n = i.metaKey || i.ctrlKey || i.altKey || i.shiftKey;
            if (
              n &&
              A.cmd &&
              A.cmd.cmd &&
              A.cmd.type.toLowerCase() === "script"
            ) {
              if (A.cmd.cmd instanceof File) {
                j = A.cmd.cmd.fsName;
              } else {
                j = A.cmd.cmd;
              }
              var k = tb.settings.editor;
              if (aeq.isMac) {
                k = k + ' "' + j + '"';
              } else {
                k = k + ' "' + j + '"';
                k = 'cmd /c "' + k + '"';
              }
              system.callSystem(k);
            } else {
              var I = tb.ui.createSettings();
              I.toolsTab.info.modifiers = A.modifiers;
              I.toolsTab.info.load(A.tool);
              I.get().show();
            }
          },
          text: "edit",
          type: "button",
        },
        {
          name: "star",
          onClick: A.getSetterFunction("tool", "star", "value"),
          properties: { toggle: true },
          text: N.icon.starImage,
          type: "iconbutton",
        },
        {
          name: "hideBtn",
          onClick: A.getSetterFunction("tool", "hide", "value"),
          properties: { toggle: true },
          text: N.icon.hideImage,
          type: "iconbutton",
        },
        {
          name: "toolbar",
          onChange: function () {
            if (this.selection && this.selection.toolbar) {
              tb.addToolToToolbar(A.tool, this.selection.toolbar);
              I();
              this.selection = null;
            }
          },
          type: "dropdownlist",
        },
        {
          name: "description",
          properties: { multiline: true },
          text: "",
          type: "statictext",
        },
        {
          name: "showInList",
          onClick: A.getSetterFunction("cmd", "showInList", "value"),
          text: "Show UI in " + tb.script.shortname + "_list",
          type: "checkbox",
        },
        {
          name: "showInPanel",
          onClick: A.getSetterFunction("cmd", "showInPanel", "value"),
          text: "Show UI in " + tb.script.shortname + "_panel",
          type: "checkbox",
        },
      ];
      var k = new Window(
        "palette",
        tb.script.name,
        [0, 0, j.maxWidth, n.length * j.height],
        { borderless: true },
      );
      k.alignChildren = ["fill", "top"];
      k.margins = 0;
      k.spacing = 0;
      aeq.forEach(n, function (i) {
        var n = (k[i.name] = k.add(i.type, undefined, i.text, i.properties));
        n.preferredSize = [-1, j.height];
        n.onClick = i.onClick;
        if (i.onChange) {
          n.onChange = i.onChange;
        }
      });
      k.frameLocation = i;
      k.onDeactivate = I;
      k.load = function (i, n) {
        A.tool = i;
        A.modifiers = n;
        if (n) {
          A.cmd = tb.getCmd(i, n);
        } else {
          A.cmd = i.cmd;
        }
        k.text = i.name;
        k.description.text = i.description || "";
        k.star.value = i.star;
        k.hideBtn.value = i.hide;
        if (A.cmd instanceof tb.PrettyError) {
          k.showInList.enabled = false;
          k.showInPanel.enabled = false;
        } else {
          k.showInList.enabled = true;
          k.showInPanel.enabled = true;
          k.showInList.value = i.cmd.showInList;
          k.showInPanel.value = i.cmd.showInPanel;
        }
        tb.addToolbarsToList(k.toolbar);
        var j = k.toolbar.add("item", "Add to toolbar");
        k.toolbar.selection = j;
      };
      k.layout.layout(true);
      return k;
    };
    (function () {
      function n(n) {
        return function (i) {
          return i.location === n;
        };
      }
      function h(i) {
        var n = { name: i };
        return function (i) {
          return tb.toolInToolbar(i, n);
        };
      }
      N.createFilterDropdown = function (i, j) {
        var A = i.addDropdownList({
          helpTip: "Filter list",
          onChange: function () {
            if (this.selection) {
              var n = this.selection.getTools;
              if (n.searchFn === false) {
                i = n();
              } else {
                i = tb.searchFn(n);
              }
              j(i);
              A.currentSelection = this.selection.text;
            }
          },
        });
        A.update = function () {
          function i(i, n) {
            var j = A.add("item", k + i);
            j.getTools = I(i);
            if (A.currentSelection && j.text === A.currentSelection) {
              A.selection = j;
            }
          }
          A.removeAll();
          A.add("item", "All").getTools = tb.getAllTools;
          A.add("item", "Your Tools").getTools = tb.getConfigTools;
          A.add("item", "Starred Tools").getTools = tb.getStarredTools;
          I = n;
          k = "AE/";
          aeq.forEach(tb.tools.ae, i);
          k = "Folder/";
          aeq.forEach(tb.tools.folders, i);
          k = "Pack/";
          aeq.forEach(tb.tools.packs, i);
          I = h;
          k = "Toolbar/";
          tb.forEachToolbar(i);
          if (A.selection === null) {
            A.selection = 0;
          }
        };
        return A;
      };
    })();
    return N;
  })();
  win =
    thisObj instanceof Panel
      ? thisObj
      : new Window("palette", tb.script.name + " Pack Creator", undefined, {
          resizeable: true,
        });
  win = new aeq.ui.Window(win);
  win.set({ alignChildren: ["fill", "top"] });
  var pack = { author: "Your name", name: "Untitled", tools: [] };
  var packSettings = {};
  var packGrp = win.addPanel({ alignChildren: ["fill", "top"] });
  packGrp.addIconButton({
    onClick: function () {
      i = File.openDialog("Open pack file");
      if (i) {
        n = aeq.readFile(i);
        if (n) {
          try {
            j = JSON.parse(n);
          } catch (i) {
            alert(
              "Error parsing Pack File\n" + i.message + "\bOn line: " + i.line,
            );
            return;
          }
          loadPack(j);
        }
      }
    },
    text: "Load pack",
  });
  packGrp.nameGrp = packGrp.addGroup();
  packGrp.nameGrp.addStaticText({ alignment: ["left", "top"], text: "Name:" });
  packSettings.name = packGrp.nameGrp.addEditText({
    alignment: ["fill", "top"],
  });
  packGrp.authorGrp = packGrp.addGroup();
  packGrp.authorGrp.addStaticText({
    alignment: ["left", "top"],
    text: "Author:",
  });
  packSettings.author = packGrp.authorGrp.addEditText({
    alignment: ["fill", "top"],
  });
  packSettings.createToolbar = packGrp.addCheckbox({ text: "Create Toolbar" });
  var toolGrp = win.addGroup({
    alignChildren: ["fill", "fill"],
    alignment: ["fill", "fill"],
  });
  var listGrp = toolGrp.addGroup({
    alignChildren: ["fill", "top"],
    alignment: ["left", "fill"],
    minimumSize: [300, 200],
    orientation: "column",
  });
  var infoGrp = tb.ui.createInfoPanel(toolGrp, {
    updateName: function (i) {
      var n = toolList.selection;
      if (n) {
        n[0].text = i;
      }
    },
  });
  infoGrp.panel.set({ minimumSize: [300, 200], preferredSize: [600, 200] });
  listGrp.btns = listGrp.addGroup({
    alignChildren: ["left", "fill"],
    alignment: ["fill", "top"],
  });
  listGrp.btns.addIconButton({
    helpTip: "Add new tool",
    image: tb.ui.icon.create,
    onClick: function () {
      var i = { description: "", icon: "", name: "Untitled", shortname: "" };
      var n = toolList.add("item", i.name);
      n.tool = i;
      toolList.selection = null;
      toolList.selection = n;
    },
  });
  listGrp.btns.addIconButton({
    helpTip: "Remove tool",
    image: tb.ui.icon.remove,
    onClick: function () {
      var i = toolList.selection;
      if (i !== null) {
        toolList.selection = null;
        aeq.forEach(i.reverse(), function (i) {
          toolList.remove(i);
        });
      }
    },
  });
  listGrp.btns.addIconButton({
    image: tb.ui.icon.arrowUp,
    maximumSize: [30, 30],
    onClick: function () {
      var i = toolList.selection;
      if (i !== null) {
        var n = i[0].index;
        var j = i[i.length - 1].index;
        var k = -1;
        move(n, j, k);
      }
    },
  });
  listGrp.btns.addIconButton({
    image: tb.ui.icon.arrowDown,
    maximumSize: [30, 30],
    onClick: function () {
      var i = toolList.selection;
      if (i !== null) {
        var n = i[0].index;
        var j = i[i.length - 1].index;
        if (n > j) {
          var k = n;
          n = j;
          j = k;
        }
        var I = 1;
        move(n, j, I);
      }
    },
  });
  var toolList = listGrp.addListbox({
    alignment: ["fill", "fill"],
    properties: { multiselect: true },
  });
  toolList.addEventListener("change", function (i) {
    if (this.selection) {
      var n = this.selection[0].tool;
      infoGrp.modifiers = i;
      infoGrp.load(n);
    } else {
      infoGrp.modifiers = {};
      infoGrp.unLoad();
    }
  });
  win.addButton("Save", savePack);
  win.show();
  if (tb.settings.updateOnLaunch) {
    tb.update.check("tl_packCreator");
  }
};
rgTLPackCreator(this);
