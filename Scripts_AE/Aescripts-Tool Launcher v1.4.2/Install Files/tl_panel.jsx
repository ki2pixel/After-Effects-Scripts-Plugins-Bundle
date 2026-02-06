/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function (thisObj) {
  if (thisObj instanceof Panel === false) {
    return;
  }
  globalToolbox = typeof globalToolbox !== "undefined" ? globalToolbox : {};
  globalToolbox.panel = thisObj;
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
    version: "1.4.1",
  };
  var aeq = (function () {
    function o(e, t) {
      if (e[t] instanceof Function) {
        return e[t]();
      }
      return e[t];
    }
    function a(e, t, r) {
      n = s.setters[e.toString()];
      if (n !== undefined) {
        i = n[t];
        if (i !== undefined) {
          t = i;
        }
      }
      if (e[t] instanceof Function) {
        e[t](r);
      } else {
        e[t] = r;
      }
      return e;
    }
    function u(e, t) {
      switch (t.name) {
        case "X Position":
        case "Y Position":
        case "Z Position":
          t = e.property("Position");
          t.dimensionsSeparated = true;
          return t.propertyGroup().property(t.name);
        default:
          return t;
      }
    }
    function f(e, t, r) {
      for (var i in t) {
        if (!t.hasOwnProperty(i)) {
          continue;
        }
        n = t[i];
        if (!e.hasOwnProperty(i)) {
          throw new Error(
            "The attribute " + i + " does not exist on a " + typeof e,
          );
        }
        var o = c(n, e[i]);
        if (((o && r) || !o) && r === false) {
          return false;
        }
      }
      return true;
    }
    function c(e, t) {
      if (e.type === "Array") {
        return r(e, t);
      } else if (e.type === "RegExp") {
        return e.value.test(t);
      } else {
        return e.value.toString() === t.toString();
      }
    }
    function r(e, t) {
      for (var r = 0, n = e.value.length; r < n; r++) {
        if (c(e.value[r], t)) {
          return true;
        }
      }
      return false;
    }
    function i() {
      var e = aeq.getActiveComp();
      if (e === null) {
        alert("No Comp selected");
      }
      return e;
    }
    function p(e) {
      if (e.selectedLayers.length === 0) {
        alert("No layers selected");
        return null;
      }
      return e.selectedLayers;
    }
    function d(e) {
      if (e.selectedProperties.length === 0) {
        alert("No properties selected");
        return null;
      }
      return e.selectedProperties;
    }
    function n(e, t) {
      if (t instanceof aeq.Layer) {
        return t.layer;
      }
      if (aeq.isLayer(t)) {
        return t;
      }
      if (aeq.isNumber(t)) {
        return e.containingComp.layer(t);
      }
      if (aeq.isString(t)) {
        if (h.test(t)) {
          n = y(t);
          if (n) {
            r = e.index + n;
            if (r === 0 || r > e.containingComp.numLayers) {
              return null;
            }
            return e.containingComp.layer(r);
          }
        }
        return e.containingComp.layer(t);
      }
      return null;
    }
    function y(e) {
      var t = e.charAt(0) + e.substr(2);
      t = parseInt(t, 10);
      if (isNaN(t)) {
        return false;
      }
      return t;
    }
    var aeq = function (e, t) {
      if (aeq.isNullOrUndefined(e)) {
        return e;
      }
      if (aeq.isAeq(e)) {
        r = e;
      } else if (aeq.isString(e)) {
        r = aeq.select(e, t);
      } else if (aeq.isArray(e)) {
        r = aeq.arrayEx(e);
      } else if (aeq.isApp(e)) {
        r = aeq.app;
      } else if (aeq.isComp(e)) {
        r = new aeq.Comp(e);
      } else if (aeq.isLayer(e)) {
        r = new aeq.Layer(e);
      } else {
        if (aeq.isProperty(e)) {
          r = new aeq.Property(e);
        }
      }
      r.aeq = true;
      return r;
    };
    aeq.version = "0.2.1";
    aeq.thisObj = this;
    if (typeof module === "object") {
      module.exports = aeq;
    }
    aeq.extend = function () {
      var a = l(arguments[0], {});
      var s = 1;
      var u = arguments.length;
      var f = false;
      if (typeof a === "boolean") {
        f = a;
        a = l(arguments[s], {});
        s++;
      }
      if (typeof a !== "object" && !aeq.isFunction(a)) {
        a = {};
      }
      if (s === u) {
        a = this;
        s--;
      }
      for (; s < u; s++) {
        if ((e = arguments[s]) !== null) {
          for (var t in e) {
            r = a[t];
            n = e[t];
            if (a === n) {
              continue;
            }
            if (f && n && (aeq.isPlainObject(n) || (i = aeq.isArray(n)))) {
              if (i) {
                i = false;
                o = r && aeq.isArray(r) ? r : [];
              } else {
                o = r && aeq.isPlainObject(r) ? r : {};
              }
              a[t] = aeq.extend(f, o, n);
            } else {
              if (n !== undefined) {
                a[t] = n;
              }
            }
          }
        }
      }
      return a;
    };
    aeq.forEach = function (e, t, r) {
      if (e && Object.prototype.toString.call(e) === "[object Array]") {
        n = e.length;
        i = r !== undefined ? r : 0;
        for (; i < n; i++) {
          if (t(e[i], i, e) === false) {
            break;
          }
        }
      } else {
        for (var i in e) {
          if (e.hasOwnProperty(i)) {
            if (t(i, e[i], e) === false) {
              break;
            }
          }
        }
      }
      return e;
    };
    aeq.filter = function (e, t) {
      var r = [];
      if (e && Object.prototype.toString.call(e) === "[object Array]") {
        n = e.length;
        i = 0;
        for (; i < n; i++) {
          if (t(e[i], i, e)) {
            r.push(e[i]);
          }
        }
      } else {
        for (var i in e) {
          if (e.hasOwnProperty(i)) {
            if (t(i, e[i], e)) {
              r.push(e[i]);
            }
          }
        }
      }
      return r;
    };
    aeq.setDefault = function (e, t) {
      return typeof e == "undefined" ? t : e;
    };
    var l = aeq.setDefault;
    aeq.extend({
      assertIsEmpty: function (e, t) {
        if (aeq.isEmpty(e)) {
          return true;
        }
        throw new Error(t);
      },
      assertIsFalse: function (e, t) {
        if (e === false) {
          return true;
        }
        throw new Error(t);
      },
      assertIsNotEmpty: function (e, t) {
        if (!aeq.isEmpty(e)) {
          return true;
        }
        throw new Error(t);
      },
      assertIsNotNull: function (e, t) {
        if (!aeq.isNullOrUndefined(e)) {
          return true;
        }
        throw new Error(t);
      },
      assertIsNull: function (e, t) {
        if (aeq.isNullOrUndefined(e)) {
          return true;
        }
        throw new Error(t);
      },
      assertIsTrue: function (e, t) {
        if (e === true) {
          return true;
        }
        throw new Error(t);
      },
    });
    aeq.attr = function (e, t, r) {
      if (arguments.length === 1) {
        throw new Error("Only one argument given to attr, must be 2 or 3");
      } else if (arguments.length === 2) {
        if (e[0] !== undefined && e[0] !== null) {
          return o(e[0], t);
        }
        return undefined;
      } else {
        for (n = 0, i = e.length; n < i; n++) {
          a(e[n], t, r);
        }
        return e;
      }
    };
    var s = { setters: { "[object Property]": { value: "setValue" } } };
    aeq.extend({
      framesToTime: function (e, t) {
        return e / t;
      },
      getActiveComposition: function () {
        var e = app.project.activeItem;
        if (aeq.isComp(e)) {
          return e;
        }
        return null;
      },
      getChildren: function (e) {
        if (aeq.isComp(e)) {
          return aeq.normalizeCollection(e.layers);
        }
        if (aeq.isLayer(e) || aeq.isPropertyGroup(e)) {
          return aeq.getPropertyChildren(e, {});
        }
        if (aeq.isArray(e)) {
          t = aeq.arrayEx();
          aeq.forEach(e, function (e) {
            t.push.call(t, aeq.getChildren(e));
          });
          return t;
        }
      },
      getComposition: function (e) {
        var t = app.project.items.length;
        for (var r = 1; r <= t; r += 1) {
          var n = app.project.item(r);
          if (n.name === e && aeq.isComp(n)) {
            return n;
          }
        }
        return null;
      },
      getCompositions: function (e, t) {
        var r = aeq.getItems(e, t);
        return r.filter(aeq.isComp);
      },
      getEffects: function (e) {
        aeq.assertIsNotNull(e, "layers is null");
        if (aeq.isLayer(e)) {
          e = [e];
        }
        var t = [];
        var r = e.length;
        for (var o = 0; o < r; o += 1) {
          n = e[o].property("ADBE Effect Parade");
          if (n === null) {
            return aeq.arrayEx();
          }
          i = n.numProperties;
          for (var a = 1; a <= i; a += 1) {
            t.push(n.property(a));
          }
        }
        return aeq.arrayEx(t);
      },
      getItemInComps: function (t) {
        var r = [];
        aeq.forEach(t.usedIn, function (e) {
          aeq.forEachLayer(e, function (e) {
            if (e.source === t) {
              r.push(e);
            }
          });
        });
        return aeq.arrayEx(r);
      },
      getItems: function (e, t) {
        if (e === undefined) {
          return aeq.normalizeCollection(app.project.items);
        }
        t = l(t, true);
        e = aeq.project.getFolder(e);
        if (e === null) {
          return aeq.arrayEx();
        }
        if (t) {
          return aeq.getItemsDeep(e);
        }
        return aeq.normalizeCollection(e.items);
      },
      getItemsDeep: function (e, t) {
        var n = [];
        var i = e.items.length;
        for (var o = 1; o <= i; o += 1) {
          r = e.items[o];
          if (aeq.isFolderItem(r)) {
            n.push.apply(n, aeq.getItemsDeep(r, false));
          }
          n.push(r);
        }
        if (t === false) {
          return n;
        }
        return aeq.arrayEx(n);
      },
      getKeys: function (e) {
        var t = [];
        if (aeq.isArray(e)) {
          for (r = 0, n = e.length; r < n; r++) {
            t = t.concat(aeq.getKeys(e[r]));
          }
          return aeq.arrayEx(t);
        }
        for (r = 1, n = e.numKeys; r <= n; r++) {
          t.push(aeq.Key(e, r));
        }
        return aeq.arrayEx(t);
      },
      getLayers: function (e) {
        aeq.assertIsNotNull(e, "comps is null");
        var t = [];
        if (aeq.isComp(e)) {
          e = [e];
        }
        for (var r = 0; r < e.length; r += 1) {
          var n = e[r];
          t = t.concat(aeq.normalizeCollection(n.layers));
        }
        return aeq.arrayEx(t);
      },
      getMarkerGroup: function (e) {
        if (!e) {
          e = aeq.getActiveComp();
        }
        if (aeq.isLayer(e)) {
          return e.property("ADBE Marker");
        }
        if (aeq.isComp(e) && aeq.app.version >= 14) {
          return e.markerProperty;
        }
        return null;
      },
      getProperties: function (e, t) {
        aeq.assertIsNotNull(e, "layer is null");
        t = l(t, { separate: true });
        var r = [];
        for (var n = 0; n < e.length; n += 1) {
          var i = e[n];
          r = r.concat(aeq.getPropertyChildren(i, t));
        }
        return aeq.arrayEx(r);
      },
      getPropertyChildren: function (e, t) {
        var r = [];
        var i = e.numProperties;
        t = l(t, { separate: false });
        for (var o = 1; o <= i; o += 1) {
          n = e.property(o);
          switch (n.propertyType) {
            case PropertyType.PROPERTY:
              if (t.separate) {
                n = u(e, n);
              }
              if (t.props !== false) {
                r.push(n);
              }
              break;
            case PropertyType.INDEXED_GROUP:
            case PropertyType.NAMED_GROUP:
              if (t.groups === true) {
                r.push(n);
              }
              r = r.concat(aeq.getPropertyChildren(n, t));
              break;
            default:
              break;
          }
        }
        return r;
      },
      getSelectedLayers: function (e) {
        if (!aeq.isComp(e)) {
          e = aeq.getActiveComp();
        }
        if (e) {
          return aeq.arrayEx(e.selectedLayers);
        }
        return aeq.arrayEx();
      },
      getSelectedLayersOrAll: function (e) {
        if (!aeq.isComp(e)) {
          e = aeq.getActiveComp();
          if (e === null) {
            return aeq.arrayEx();
          }
        }
        var t = aeq.getSelectedLayers(e);
        if (t.length === 0) {
          return aeq.getLayers(e);
        }
        return t;
      },
      getSelectedProperties: function (e) {
        if (!e) {
          e = aeq.getActiveComp();
        }
        if (e) {
          return aeq.arrayEx(e.selectedProperties);
        }
        return aeq.arrayEx();
      },
      normalizeCollection: function (e) {
        var t = Array.prototype.slice.call(e, 1);
        var r = e.length;
        if (r !== 0) {
          t.push(e[r]);
        }
        return aeq.arrayEx(t);
      },
      timeToFrames: function (e, t) {
        return e * t;
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
      forEachComp: function (e) {
        aeq.forEach(aeq.getCompositions(), e);
      },
      forEachEffect: function (e, t) {
        if (aeq.isLayer(e)) {
          i = e.property("ADBE Effect Parade");
          n = i.numProperties;
          for (var r = 1; r <= n; r += 1) {
            if (t(i.property(r), r, i) === false) {
              break;
            }
          }
        } else if (aeq.isComp(e)) {
          aeq.forEachLayer(e, function (e) {
            aeq.forEachEffect(e, t);
          });
        } else if (aeq.isArray(e)) {
          aeq.forEach(e, function (e) {
            aeq.forEachEffect(e, t);
          });
        } else {
          if (aeq.isFunction(e)) {
            t = e;
            aeq.forEachLayer(function (e) {
              aeq.forEachEffect(e, t);
            });
          }
        }
        return aeq;
      },
      forEachItem: function (e) {
        var t = app.project;
        var r = t.items;
        var n = r.length;
        for (var i = 1; i <= n; i += 1) {
          if (e(r[i], i, t) === false) {
            break;
          }
        }
        return aeq;
      },
      forEachLayer: function (e, t) {
        if (aeq.isComp(e)) {
          var r = e.numLayers;
          var n = 1;
          for (; n <= r; n++) {
            if (t(e.layer(n), n, e) === false) {
              break;
            }
          }
        } else if (aeq.isArray(e)) {
          aeq.forEach(e, function (e) {
            aeq.forEachLayer(e, t);
          });
        } else {
          if (aeq.isFunction(e)) {
            t = e;
            aeq.forEachComp(function (e) {
              aeq.forEachLayer(e, t);
            });
          }
        }
        return aeq;
      },
      forEachOutputModule: function (n) {
        aeq.forEachRenderQueueItem(function (e) {
          var t = e.outputModules.length;
          for (var r = 1; r <= t; r += 1) {
            if (n(e.outputModules[r], r, e) === false) {
              break;
            }
          }
        });
        return aeq;
      },
      forEachProperty: function (e, r) {
        if (aeq.isLayer(e) || aeq.isPropertyGroup(e)) {
          var t = aeq.getPropertyChildren(e, {});
          aeq.forEach(t, r);
        } else if (aeq.isComp(e)) {
          aeq.forEachLayer(e, function (e) {
            var t = aeq.getPropertyChildren(e, {});
            aeq.forEach(t, r);
          });
        } else if (aeq.isArray(e)) {
          aeq.forEach(e, function (e) {
            aeq.forEachProperty(e, r);
          });
        } else {
          if (aeq.isFunction(e)) {
            r = e;
            aeq.forEachLayer(function (e) {
              aeq.forEachProperty(e, r);
            });
          }
        }
        return aeq;
      },
      forEachRenderQueueItem: function (e) {
        var t = app.project.renderQueue;
        var r = t.items;
        var n = r.length;
        for (var i = 1; i <= n; i += 1) {
          if (e(r[i], i, t) === false) {
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
    aeq.select = function (e, t) {
      function s(e) {
        if (o.props || o.pseudo) {
          return e.filter(u);
        }
        return e;
      }
      function u(e) {
        var t = true;
        if (o.props !== null) {
          if (!f(e, o.props, false)) {
            return false;
          }
        }
        if (!o.pseudo) {
          return true;
        }
        r = o.pseudo.length;
        for (var i = 0; i < r; i += 1) {
          n = o.pseudo[i];
          if (n.type === "not" || n.type === "isnot") {
            t = f(e, n.props, true);
          } else {
            if (n.type === "is" || n.type === "has") {
              t = f(e, n.props, false);
            }
          }
          if (t === false) {
            return false;
          }
        }
        return true;
      }
      var r = [];
      var n = cssselector.parse(e);
      var i = n;
      if (t !== undefined) {
        if (aeq.isString(t)) {
          r = aeq.select(t);
        } else if (aeq.isArray(t)) {
          r = t;
        } else {
          r = [t];
        }
      }
      while (i.length > 0) {
        var o = i[0];
        var a = false;
        switch (o.type) {
          case "activecomp":
            r = s(aeq.arrayEx([aeq.getActiveComposition()]));
            r.type = "comp";
            break;
          case "composition":
          case "comp":
            r = s(aeq.getCompositions());
            r.type = "comp";
            break;
          case "layer":
            if (r.type === "comp" || aeq.isComp(r[0])) {
              r = s(aeq.getLayers(r));
              r.type = "layer";
            } else {
              if (r.type !== "comp") {
                i.unshift({ type: "comp" });
                a = true;
              }
            }
            break;
          case "propertygroup":
          case "propgrp":
          case "propgroup":
            if (
              r.type === "layer" ||
              r.type === "propertygroup" ||
              aeq.isLayer(r[0]) ||
              aeq.isPropertyGroup(r[0])
            ) {
              r = s(
                aeq.getProperties(r, {
                  groups: true,
                  props: false,
                  separate: false,
                }),
              );
              r.type = "propertygroup";
            } else {
              if (r.type !== "layer") {
                i.unshift({ type: "layer" });
                a = true;
              }
            }
            break;
          case "property":
          case "prop":
            if (
              r.type === "layer" ||
              r.type === "propertygroup" ||
              aeq.isLayer(r[0]) ||
              aeq.isPropertyGroup(r[0])
            ) {
              r = s(aeq.getProperties(r, { separate: false }));
              r.type = "property";
            } else {
              if (r.type !== "layer") {
                i.unshift({ type: "layer" });
                a = true;
              }
            }
            break;
          case "effect":
            if (r.type === "layer" || aeq.isLayer(r[0])) {
              r = s(aeq.getEffects(r));
              r.type = "effect";
            } else {
              if (r.type !== "layer") {
                i.unshift({ type: "layer" });
                a = true;
              }
            }
            break;
          case "key":
          case "keys":
            if (r.type === "property" || aeq.isProperty(r[0])) {
              r = s(aeq.getKeys(r));
              r.type = "key";
            } else {
              if (r.type !== "property") {
                i.unshift({ type: "property" });
                a = true;
              }
            }
            break;
          case "item":
            r = s(aeq.getItems());
            r.type = "item";
            break;
          default:
            throw new Error("Unrecognized token " + o.type);
        }
        if (!a) {
          i.shift();
        }
      }
      return aeq.arrayEx(r);
    };
    aeq.extend({
      isAVLayer: function (e) {
        return e instanceof AVLayer;
      },
      isAeq: function (e) {
        return e instanceof Object && e.isAeq === true;
      },
      isApp: function (e) {
        return e instanceof Application;
      },
      isArray: function (e) {
        return e instanceof Array;
      },
      isBoolean: function (e) {
        return typeof e === "boolean";
      },
      isCameraLayer: function (e) {
        return e instanceof CameraLayer;
      },
      isComp: function (e) {
        return e instanceof CompItem;
      },
      isEmpty: function (e) {
        return e.length === undefined || e.length === 0;
      },
      isFile: function (e) {
        return e instanceof File;
      },
      isFolder: function (e) {
        return e instanceof Folder;
      },
      isFolderItem: function (e) {
        return e instanceof FolderItem;
      },
      isFootageItem: function (e) {
        return e instanceof FootageItem;
      },
      isFunc: function (e) {
        return e instanceof Function;
      },
      isLayer: function (e) {
        return (
          aeq.isAVLayer(e) ||
          aeq.isShapeLayer(e) ||
          aeq.isTextLayer(e) ||
          aeq.isCamera(e) ||
          aeq.isLight(e)
        );
      },
      isLightLayer: function (e) {
        return e instanceof LightLayer;
      },
      isNullOrUndefined: function (e) {
        return e == null;
      },
      isNumber: function (e) {
        return typeof e === "number";
      },
      isObject: function (e) {
        return e instanceof Object;
      },
      isPanel: function (e) {
        return e instanceof Panel;
      },
      isPlainObject: function (e) {
        if (e === undefined || e === null) {
          return false;
        }
        if (e.toString() !== "[object Object]") {
          return false;
        }
        if (
          e.constructor &&
          !e.constructor.prototype.hasOwnProperty("isPrototypeOf")
        ) {
          return false;
        }
        return true;
      },
      isPrecomp: function (e) {
        if (!aeq.isLayer(e)) {
          return false;
        }
        return aeq.isComp(e.source);
      },
      isProperty: function (e) {
        return e instanceof Property;
      },
      isPropertyGroup: function (e) {
        return e instanceof PropertyGroup;
      },
      isShapeLayer: function (e) {
        return e instanceof ShapeLayer;
      },
      isString: function (e) {
        return typeof e === "string";
      },
      isTextLayer: function (e) {
        return e instanceof TextLayer;
      },
      isWindow: function (e) {
        return e instanceof Window;
      },
      reflect: function (e) {
        var t = [];
        for (var r in e) {
          if (e.hasOwnProperty(r)) {
            t.push(e[r].constructor.name + " " + r + "=" + e[r]);
          }
        }
        return t.join();
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
    aeq.error = function (e, t) {
      var r = /\s*function\s*([^\(]*)/i.exec(e.source);
      r = r !== null && r[1] !== "" ? r[1] : "anonymous";
      alert(
        e.toString() +
          "\n" +
          "Script File: " +
          File.decode(e.fileName).replace(/^.*[\\|\/]/, "") +
          "\nFunction: " +
          t ===
          undefined
          ? r
          : t.callee.name + (t === undefined) || t.length === 0
            ? ""
            : "\nArguments: " +
              Array.prototype.toString.call(t) +
              "\nError on Line: " +
              e.line.toString(),
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
      createResourceFiles: function (e, o, a) {
        if (!aeq.app.securityPrefEnabled()) {
          return false;
        }
        o = aeq.getFolderObject(o);
        a = l(a, "");
        if (a !== "" && a.charAt(0) !== ".") {
          a = "." + a;
        }
        aeq.file.ensureFolderExists(o);
        if (!o.exists) {
          throw new Error("Could not create resource folder: " + o.fsname);
        }
        var s = {};
        aeq.forEach(e, function (e, t) {
          var r = aeq.file.joinPath(o.fsName, e + a);
          var n = new File(r);
          s[e] = n;
          if (!n.exists || t.length !== n.length) {
            n.encoding = "BINARY";
            n.open("w");
            var i = n.write(t);
            if (!i) {
              if (n.error === "") {
                s[e] = null;
              } else {
                s[e] = new Error(n.error, n.fsName, undefined);
              }
            }
            n.close();
          }
        });
        return s;
      },
      getBinaryString: function (e) {
        var t = aeq.getFileObject(e);
        t.encoding = "BINARY";
        t.open("r");
        var r = t.read();
        t.close();
        var n = r.toSource();
        n = n.replace(/^\(new String\(\"/, "");
        n = n.replace(/\"\)\)$/, "");
        return n;
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
      createUndoGroup: function (e, t, r) {
        app.beginUndoGroup(e);
        if (!aeq.isArray(r)) {
          r = [r];
        }
        var n = t.apply(null, r);
        app.endUndoGroup();
        return n;
      },
    });
    aeq.undoGroup = aeq.createUndoGroup;
    aeq.extend({
      propertyType: function (e) {
        return aeq.valueInObject(e.propertyType || e, PropertyType);
      },
      valueInObject: function (e, t) {
        for (var r in t) {
          if (t.hasOwnProperty(r)) {
            if (e === t[r]) {
              return r;
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
          var e = aeq.app.getAEP();
          if (!e) {
            return null;
          }
          return aeq.getFolder(e.path);
        },
        getAEPName: function () {
          var e = aeq.app.getAEP();
          if (!e) {
            return null;
          }
          return aeq.file.stripExtension(e.displayName);
        },
        getPresetsPaths: function () {
          var e = aeq.app.version;
          var t = "";
          if (parseInt(e) == 11) {
            t = "CS6";
          } else if (parseInt(e) == 12) {
            t = "CC";
          } else if (e >= 13 && e < 13.5) {
            t = "CC 2014";
          } else if (e >= 13.5 && e < 14) {
            t = "CC 2015";
          } else {
            if (e >= 14) {
              t = "CC 2017";
            }
          }
          return [
            Folder.current.fullName + "/Presets/",
            Folder.myDocuments.fullName +
              "/Adobe/After Effects " +
              t +
              "/User Presets/",
          ];
        },
        getScriptFile: function () {
          return aeq.getFile($.fileName);
        },
        getUserDataFolder: function () {
          return Folder.userData;
        },
        open: function (e) {
          var t = aeq.getFile(e);
          if (t) {
            return app.open(t);
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
        call: function (e, t, r) {
          if (aeq.isObject(arguments[0])) {
            var n = arguments[0];
            e = l(n.win, n.windows);
            t = l(n.mac, n.osx);
            r = n.arg;
          }
          var i = t;
          if (aeq.isWindows) {
            i = e;
          }
          r = r !== undefined ? " " + r : "";
          return system.callSystem(i + r);
        },
        copyToClipboard: function (e) {
          aeq.command.call(
            'cmd.exe /c cmd.exe /c "echo ' + e + ' | clip"',
            'echo "' + e + '" | pbcopy',
          );
        },
        extend: aeq.extend,
        openURL: function (e) {
          try {
            if (e.match(/^https?:\/\//) === null) {
              e = "http://" + e;
            }
            aeq.command.call({ arg: e, mac: "open", win: 'cmd /c "explorer' });
          } catch (e) {
            alert("Error in openURL function\n" + e.toString());
          }
        },
        revealFile: function (e) {
          if (aeq.isFile(e)) {
            e = e.fsName;
          }
          return aeq.command.call(
            "Explorer /select,",
            "open -R",
            '"' + e + '"',
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
        create: function (e, t) {
          if (!aeq.isFolderItem(e)) {
            t = l(e, {});
            e = l(t.folder, app.project);
          }
          var r = {
            duration: 1,
            frameRate: 24,
            height: 1080,
            name: "Comp",
            pixelAspect: 1,
            width: 1920,
          };
          t = aeq.extend(r, t);
          return e.items.addComp(
            t.name,
            t.width,
            t.height,
            t.pixelAspect,
            t.duration,
            t.frameRate,
          );
        },
        extend: aeq.extend,
        getCompInQueue: function (t, e) {
          if (aeq.isNullOrUndefined(e)) {
            e = true;
          }
          if (e) {
            r = aeq.renderqueue.getQueuedItems();
          } else {
            r = aeq.renderqueue.getRQItems();
          }
          return aeq.filter(r, function (e) {
            return e.comp.id == t.id;
          });
        },
        isInQueue: function (t) {
          if (!aeq.isComp(t)) {
            return null;
          }
          var e = aeq.renderqueue.getRQItems();
          return e.exists(function (e) {
            return e.comp.id == t.id;
          });
        },
        isQueued: function (e) {
          return aeq.comp.getCompInQueue(e, true).length > 0;
        },
        toString: function () {
          return "[object aeq.comp]";
        },
      },
    );
    aeq.file = aeq.extend(
      {},
      {
        ensureFolderExists: function (e) {
          var t = aeq.getFolderObject(e);
          if (!t.exists) {
            t.create();
          }
          return t;
        },
        extend: aeq.extend,
        getExtension: function (e) {
          var t = aeq.isFile(e) ? e.name : e;
          return t.substr(t.lastIndexOf(".") + 1, t.length);
        },
        getFile: function (e) {
          var t = aeq.getFileObject(e);
          if (!t.exists) {
            return null;
          }
          return t;
        },
        getFileObject: function (e) {
          return aeq.isFile(e) ? e : new File(e);
        },
        getFiles: function (e, t) {
          t = l(t, "");
          var r = aeq.getFolder(e);
          n = r.getFiles(t);
          if (n === null || n.length === 0) {
            return null;
          }
          return aeq.arrayEx(n);
        },
        getFolder: function (e) {
          var t = aeq.getFolderObject(e);
          if (!t.exists) {
            return null;
          }
          return t;
        },
        getFolderObject: function (e) {
          return aeq.isFolder(e) ? e : new Folder(e);
        },
        joinPath: function () {
          var e = Array.prototype.slice.call(arguments, 0);
          return aeq.file.normalizePath(
            aeq
              .filter(e, function (e, t) {
                if (typeof e !== "string") {
                  throw new TypeError("Arguments to path.join must be strings");
                }
                return e;
              })
              .join(aeq.file.pathSeparatorSymbol),
          );
        },
        normalizePath: function (e) {
          var t = aeq.file.pathIsAbsolute(e);
          var r = e.substr(-1) === aeq.file.pathSeparatorSymbol;
          e = aeq.file
            .normalizePathArray(
              aeq.filter(e.split(aeq.file.pathSeparatorSymbol), function (e) {
                return !!e;
              }),
              !t,
            )
            .join(aeq.file.pathSeparatorSymbol);
          if (!e && !t) {
            e = ".";
          }
          if (e && r) {
            e += aeq.file.pathSeparatorSymbol;
          }
          return t ? aeq.file.pathSeparatorSymbol : "" + e;
        },
        normalizePathArray: function (e, t) {
          var r = 0;
          for (var n = e.length - 1; n >= 0; n--) {
            var i = e[n];
            if (i === ".") {
              e.splice(n, 1);
            } else if (i === "..") {
              e.splice(n, 1);
              r++;
            } else {
              if (r) {
                e.splice(n, 1);
                r--;
              }
            }
          }
          if (t) {
            for (; r--; r) {
              e.unshift("..");
            }
          }
          return e;
        },
        pathIsAbsolute: function (e) {
          return e.charAt(0) === aeq.file.pathSeparatorSymbol;
        },
        pathSeparatorSymbol: $.os.indexOf("Windows") > -1 ? "\\" : "/",
        readFile: function (e, t) {
          var r = aeq.getFileObject(e);
          t = l(t, "UTF-8");
          if (r.exists) {
            if (File.isEncodingAvailable(t)) {
              r.encoding = t;
            }
            r.open();
            n = r.read();
            r.close();
            return n;
          }
          return null;
        },
        stripExtension: function (e) {
          var t = aeq.isFile(e) ? e.name : e;
          return t.substr(0, t.lastIndexOf("."));
        },
        toString: function () {
          return "[object aeq.file]";
        },
        writeFile: function (e, t, r) {
          var n = aeq.getFileObject(e);
          r = aeq.setDefault(r, {});
          if (n.exists && r.overwrite === false) {
            return null;
          }
          if (!n.exists) {
            aeq.file.ensureFolderExists(n.path);
          }
          if (
            !aeq.isNullOrUndefined(r.encoding) &&
            File.isEncodingAvailable(r.encoding)
          ) {
            n.encoding = r.encoding;
          }
          n.open("w");
          var i = n.write(t);
          n.close();
          if (i) {
            return n;
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
        allChildren: function (e) {
          var t = [];
          var r = aeq.layer.children(e);
          aeq.forEach(r, function (e) {
            t.push(e);
            t = t.concat(aeq.layer.allChildren(e));
          });
          return aeq.arrayEx(t);
        },
        children: function (t) {
          var e = aeq.getLayers(t.containingComp);
          return e.filter(function (e) {
            return e.parent === t;
          });
        },
        extend: aeq.extend,
        parents: function (e) {
          var t = aeq.arrayEx();
          var r = e;
          while (r.parent !== null) {
            t.push(r.parent);
            r = r.parent;
          }
          return t;
        },
        relatedLayers: function (e) {
          var t = aeq.layer.parents(e);
          var r = aeq.layer.allChildren(e);
          var n = t.push.apply(t, r);
          return aeq.arrayEx(n);
        },
        setLayerToggles: function (t, r) {
          var e =
            "enabled solo shy quality effectsActive motionBlur adjustmentLayer threeDLayer blendingMode preserveTransparency parent inPoint stretch startTime outPoint label guideLayer name comment autoOrient";
          e = e.split(" ");
          aeq.forEach(e, function (e) {
            r[e] = t[e];
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
        findFolder: function (t, e) {
          var r = aeq.project.getFolders(e);
          var n = aeq.filter(r, function (e) {
            return e.name == t;
          });
          if (n.length) {
            return n[0];
          }
          return null;
        },
        getFolder: function (e, t) {
          if (aeq.isFolderItem(e)) {
            return e;
          }
          if (aeq.isString(e)) {
            return aeq.project.findFolder(e, t);
          }
          return null;
        },
        getFolderOrRoot: function (e) {
          e = aeq.project.getFolder(e);
          if (aeq.isNullOrUndefined(e)) {
            return app.project.rootFolder;
          }
          return e;
        },
        getFolders: function (e) {
          var t = aeq.getItems(e);
          return t.filter(aeq.isFolderItem);
        },
        getFootage: function () {
          var e = aeq.getItems();
          return aeq.filter(e, aeq.isFootageItem);
        },
        getOrCreateFolder: function (e, t) {
          if (aeq.isNullOrUndefined(t)) {
            t = app.project.rootFolder;
          } else {
            t = aeq.project.getOrCreateFolder(t);
          }
          var r = aeq.project.getFolder(e, t);
          if (aeq.isNullOrUndefined(r)) {
            return t.items.addFolder(e);
          }
          return r;
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
        importFile: function (e, t, r) {
          var n = app.project;
          var o = aeq.getFile(e);
          if (!aeq.isFile(o)) {
            throw new Error(e + " is not a valid file!");
          }
          if (aeq.isNullOrUndefined(t)) {
            t = app.project.rootFolder;
          } else {
            t = aeq.project.getOrCreateFolder(t);
          }
          r = l(r, {});
          var a = new ImportOptions(o);
          if (r.sequence === true) {
            a.sequence = true;
          }
          try {
            i = n.importFile(a);
          } catch (e) {
            throw new Error("Can\'t import file " + o.name + "\n" + String(e));
          }
          if (i.duration * i.frameRate == 1) {
            i.replace(e);
          }
          i.parentFolder = t;
          i.selected = false;
          return i;
        },
        importFiles: function (e, r, n) {
          var i = aeq.arrayEx();
          aeq.forEach(e, function (e) {
            var t = aeq.importFile(e, r, n);
            i.push(t);
          });
          return i;
        },
        importSequence: function (e, t) {
          return aeq.importFile(e, t, { sequence: true });
        },
        moveToFolder: function (e, t) {
          t = aeq.project.getFolder(t);
          if (!aeq.isArray(e)) {
            e = [e];
          }
          aeq.forEach(e, function (e) {
            e.parentFolder = t;
            e.selected = false;
          });
        },
        quickSave: function () {
          var e = aeq.app.getAEP();
          return app.project.save(e);
        },
        reduceToQueuedComps: function () {
          var e = aeq.renderqueue.getQueuedComps();
          if (e.length === 0) {
            return null;
          }
          app.project.reduceProject(e);
          return e;
        },
        save: function (e) {
          if (!e) {
            return app.project.save();
          }
          var t = aeq.getFileObject(e);
          if (t.exists) {
            if (!confirm("File exists! Overwrite?")) {
              return null;
            }
          }
          return app.project.save(t);
        },
        simpleImportFile: function (t, e) {
          var r = new ImportOptions(t);
          e = l(e, {});
          if (e.sequence === true) {
            r.sequence = true;
          }
          try {
            newItem = app.project.importFile(r);
          } catch (e) {
            throw new Error("Can\'t import file " + t.name + "\n" + String(e));
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
        getLayer: function (e) {
          var t = e.propertyDepth;
          return e.propertyGroup(t);
        },
        toString: function () {
          return "[object aeq.property]";
        },
        type: function (e) {
          return aeq.valueInObject(e.propertyType || e, PropertyType);
        },
        valueType: function (e) {
          return aeq.valueInObject(e.propertyValueType || e, PropertyValueType);
        },
      },
    );
    aeq.prop = aeq.property;
    aeq.renderqueue = aeq.extend(
      {},
      {
        clear: function () {
          var e = aeq.renderqueue.getRQItems();
          e = e.reverse();
          e.forEach(function (e) {
            e.remove();
          });
        },
        ensureRenderPathExists: function (e) {
          aeq.app.ensureSecurityPrefEnabled();
          aeq.file.ensureFolderExists(e.file.parent);
        },
        extend: aeq.extend,
        getQueuedComps: function () {
          var e = aeq.renderqueue.getQueuedItems();
          var n = {};
          var i = [];
          e.forEach(function (e) {
            var t = e.comp;
            var r = t.id;
            if (n[r] === undefined) {
              n[r] = true;
              i.push(t);
            }
          });
          return aeq.arrayEx(i);
        },
        getQueuedItems: function () {
          var e = aeq.renderqueue.getRQItems();
          return item.filter(function (e) {
            return aeq.renderqueue.isQueued(e);
          });
        },
        getRQComps: function () {
          var e = aeq.renderqueue.getRQItems();
          var n = {};
          var i = [];
          e.forEach(function (e) {
            var t = e.comp;
            var r = t.id;
            if (n[r] === undefined) {
              n[r] = true;
              i.push(t);
            }
          });
          return aeq.arrayEx(i);
        },
        getRQItems: function () {
          return aeq.arrayEx(
            aeq.normalizeCollection(app.project.renderQueue.items),
          );
        },
        getSettings: function (e) {
          return e.getSettings(GetSettingsFormat.STRING);
        },
        isQueued: function (e) {
          return e.status == RQItemStatus.QUEUED;
        },
        omTemplateExists: function (t) {
          var e = aeq.comp.create();
          var r = aeq.renderqueue.queue(e);
          var n = aeq.arrayEx(r.outputModule(1).templates);
          var i = n.exists(function (e) {
            return e == t;
          });
          r.remove();
          e.remove();
          return i;
        },
        queue: function (e) {
          return app.project.renderQueue.items.add(e);
        },
        rqTemplateExists: function (t) {
          var e = aeq.comp.create();
          var r = aeq.renderqueue.queue(e);
          var n = aeq.arrayEx(r.templates);
          var i = n.exists(function (e) {
            return e == t;
          });
          r.remove();
          e.remove();
          return i;
        },
        toString: function () {
          return "[object aeq.RenderQueue]";
        },
        unqueue_all: function () {
          var e = aeq.renderqueue.getRQItems();
          e.forEach(function (e) {
            if (
              e.status != RQItemStatus.USER_STOPPED &&
              e.status != RQItemStatus.ERR_STOPPED &&
              e.status != RQItemStatus.RENDERING &&
              e.status != RQItemStatus.DONE
            ) {
              e.render = false;
            }
          });
        },
      },
    );
    aeq.settings = aeq.extend(
      {},
      {
        extend: aeq.extend,
        get: function (e, t) {
          if (aeq.settings.have(e, t)) {
            return app.settings.getSetting(e, t);
          }
          return undefined;
        },
        getAsArray: function (e, t) {
          return aeq.settings.get(e, t).split(",");
        },
        getAsBool: function (e, t) {
          var r = aeq.settings.get(e, t);
          if (r === "true") {
            return true;
          } else {
            if (r === "false") {
              return false;
            }
          }
          return undefined;
        },
        getAsFloat: function (e, t) {
          return parseFloat(aeq.settings.get(e, t));
        },
        getAsInt: function (e, t) {
          return parseInt(aeq.settings.get(e, t));
        },
        have: function (e, t) {
          return app.settings.haveSetting(e, t);
        },
        initSetting: function (e, t, r, n) {
          n = l(n, false);
          if (!aeq.settings.have(e, t) || n) {
            aeq.settings.save(e, t, r);
          }
          return aeq.settings.get(e, t);
        },
        save: function (e, t, r) {
          app.settings.saveSetting(e, t, r);
        },
        setting: function (e, t, r) {
          if (r !== undefined) {
            aeq.settings.save(e, t, r);
            return aeq;
          }
          return aeq.settings.get(e, t);
        },
        toString: function () {
          return "[object aeq.settings]";
        },
        unpack: function (t, e) {
          r = aeq.isObject(e) ? e : {};
          aeq.forEach(e, function (e) {
            if (app.settings.haveSetting(t, e)) {
              r[e] = app.settings.getSetting(t, e);
            }
          });
          return r;
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
        activeComp: function (e, t) {
          var r = i();
          if (r === null) {
            return false;
          }
          return aeq.createUndoGroup(e, t, [r]);
        },
        extend: aeq.extend,
        forEachSelectedLayer: function (e, t) {
          return aeq.snippet.selectedLayers(e, function (e) {
            e.forEach(t);
            return e;
          });
        },
        forEachSelectedLayerOrAll: function (e, t) {
          return aeq.snippet.selectedLayersOrAll(e, function (e) {
            e.forEach(t);
            return e;
          });
        },
        forEachSelectedProperty: function (e, t) {
          return aeq.snippet.selectedProperties(e, function (e) {
            e.forEach(t);
            return e;
          });
        },
        selectedLayers: function (e, t) {
          var r = i();
          if (r === null) {
            return false;
          }
          var n = p(r);
          if (n === null) {
            return false;
          }
          n = aeq.arrayEx(n);
          return aeq.createUndoGroup(e, t, [n, r]);
        },
        selectedLayersOrAll: function (e, t) {
          var r = i();
          if (r === null) {
            return false;
          }
          var n = aeq.getSelectedLayersOrAll(r);
          n = aeq.arrayEx(n);
          return aeq.createUndoGroup(e, t, [n, r]);
        },
        selectedProperties: function (e, t) {
          var r = i();
          if (r === null) {
            return false;
          }
          var n = d(r);
          if (n === null) {
            return false;
          }
          n = aeq.arrayEx(n);
          return aeq.createUndoGroup(e, t, [n, r]);
        },
        toString: function () {
          return "[object aeq.snippet]";
        },
      },
    );
    aeq.arrayEx = function (e) {
      e = l(e, []);
      if (e._init) {
        return e;
      }
      e._init = true;
      e.isAeq = true;
      aeq.extend(e, t);
      return e;
    };
    var t = {
      attr: function () {
        [].unshift.call(arguments, this);
        return aeq.attr.apply(this, arguments);
      },
      exists: function (e) {
        var t = this.length;
        for (var r = 0; r < t; r += 1) {
          if (e(this[r], r, this)) {
            return true;
          }
        }
        return false;
      },
      filter: function (e) {
        var t = [];
        var r = this.length;
        for (var n = 0; n < r; n += 1) {
          if (e(this[n], n, this)) {
            t.push(this[n]);
          }
        }
        return aeq.arrayEx(t);
      },
      find: function (e, t) {
        var r = this.length;
        for (var n = 0; n < r; n += 1) {
          if (e(this[n], n, this)) {
            return this[n];
          }
        }
        return t;
      },
      first: function () {
        if (this.length === 0) {
          throw new Error("There are no items in this array");
        }
        return this[0];
      },
      forEach: function (e) {
        var t = this.length;
        for (var r = 0; r < t; r += 1) {
          e(this[r], r, this);
        }
      },
      indexOf: function (e, t) {
        if (this === null) {
          throw new TypeError('"this" is null or not defined');
        }
        var n = Object(this);
        var i = n.length >>> 0;
        if (i === 0) {
          return -1;
        }
        var o = t || 0;
        if (Math.abs(o) === Infinity) {
          o = 0;
        }
        if (o >= i) {
          return -1;
        }
        r = Math.max(o >= 0 ? o : i - Math.abs(o), 0);
        while (r < i) {
          if (r in n && n[r] === e) {
            return r;
          }
          r++;
        }
        return -1;
      },
      insertAt: function (e, t) {
        this.splice(t, 0, e);
      },
      isTrueForAll: function (e) {
        var t = this.length;
        for (var r = 0; r < t; r += 1) {
          if (!e(this[r], r, this)) {
            return false;
          }
        }
        return true;
      },
      map: function (e) {
        var t = {};
        var r = this.length;
        for (var n = 0; n < r; n += 1) {
          var i = e(this[n], n, this);
          t[i.key] = i.value;
        }
        return t;
      },
      select: function (e) {
        var t = [];
        var r = this.length;
        for (var n = 0; n < r; n += 1) {
          t.push(e(this[n], n, this));
        }
        return aeq.arrayEx(t);
      },
    };
    aeq.Comp = function (e) {
      if (e instanceof aeq.Comp) {
        return e;
      }
      if (this instanceof aeq.Comp) {
        this.comp = e;
      } else {
        return new aeq.Comp(e);
      }
    };
    aeq.Comp.prototype = {
      extend: aeq.extend,
      forEachLayer: function (e) {
        var t = this.comp.numLayers;
        var r = 1;
        for (; r <= t; r++) {
          e(this.comp.layer(r), r, this);
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
    aeq.Key = function (e, t) {
      if (this instanceof aeq.Key) {
        if (e instanceof aeq.Property) {
          e = e.get();
        }
        if (t <= 0 || t > e.numKeys) {
          throw new Error("Index " + t + " out of range 1-" + e.numKeys);
        }
        this.property = e;
        this.index = t;
        this.originalTime = this.getTime();
      } else {
        return new aeq.Key(e, t);
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
        var e = this.property.nearestKeyIndex(this.originalTime);
        if (this.property.keyTime(e) === this.originalTime) {
          this.index = e;
        } else {
          throw new Error("Original key has been deleted/moved");
        }
      },
      copyTo: function (e, t) {
        var r = this.getKeyinfo();
        r.time = t !== undefined ? t : r.time;
        if (e.isAeq) {
          e = e.get();
        }
        r.property = e;
        return aeq.pasteKey(r);
      },
      extend: aeq.extend,
      getKeyinfo: function () {
        this.checkKey();
        var e = {
          interpolationType: this.interpolationType(),
          property: this.property,
          time: this.time(),
          value: this.value(),
        };
        if (
          e.interpolationType.inType === KeyframeInterpolationType.BEZIER &&
          e.interpolationType.outType === KeyframeInterpolationType.BEZIER
        ) {
          e.temporalAutoBezier = this.temporalAutoBezier();
          e.temporalContinuous = this.temporalContinuous();
        }
        if (e.interpolationType.outType !== KeyframeInterpolationType.HOLD) {
          e.temporalEase = this.temporalEase();
        }
        if (
          this.valueTypeIs("TwoD_SPATIAL") ||
          this.valueTypeIs("ThreeD_SPATIAL")
        ) {
          e.spatialAutoBezier = this.spatialAutoBezier();
          e.spatialContinuous = this.spatialContinuous();
          e.spatialTangent = this.spatialTangent();
          e.roving = this.roving();
        }
        return e;
      },
      getTime: function () {
        return this.property.keyTime(this.index);
      },
      interpolationType: function (e, t) {
        this.checkKey();
        if (arguments.length === 0) {
          return {
            inType: this.property.keyInInterpolationType(this.index),
            outType: this.property.keyOutInterpolationType(this.index),
          };
        }
        if (t === undefined && e.outType) {
          t = e.outType;
        }
        if (e.inType) {
          e = e.inType;
        }
        if (aeq.isString(e)) {
          e = KeyframeInterpolationType[e];
        }
        if (t && aeq.isString(t)) {
          t = KeyframeInterpolationType[t];
        } else {
          if (t === undefined) {
            t = e;
          }
        }
        if (
          (!this.property.isInterpolationTypeValid(e) || t) &&
          !this.property.isInterpolationTypeValid(t)
        ) {
          return false;
        }
        this.property.setInterpolationTypeAtKey(this.index, e, t);
        return true;
      },
      isAeq: true,
      moveTo: function (e) {
        var t = this.time();
        if (e === t) {
          return;
        }
        var r = this.copyTo(this.property, e);
        this.remove();
        this.index = this.property.nearestKeyIndex(r.time());
        this.originalTime = e;
      },
      remove: function () {
        this.checkKey();
        this.property.removeKey(this.index);
      },
      spatialTangent: function (e, t) {
        this.checkKey();
        if (arguments.length === 0) {
          return {
            inTangent: this.property.keyInSpatialTangent(this.index),
            outTangent: this.property.keyOutSpatialTangent(this.index),
          };
        }
        if (t === undefined && e.outTangent) {
          t = e.outTangent;
        }
        if (e.inTangent) {
          e = e.inTangent;
        }
        this.property.setSpatialTangentsAtKey(this.index, e, t);
      },
      temporalEase: function (e, t) {
        this.checkKey();
        if (arguments.length === 0) {
          return {
            inEase: this.property.keyInTemporalEase(this.index),
            outEase: this.property.keyOutTemporalEase(this.index),
          };
        }
        if (t === undefined && e.outEase) {
          t = e.outEase;
        }
        if (e.inEase) {
          e = e.inEase;
        }
        if (!aeq.isArray(e)) {
          if (this.valueTypeIs("TwoD")) {
            e = [e, e];
          } else if (this.valueTypeIs("ThreeD")) {
            e = [e, e, e];
          } else {
            e = [e];
          }
        }
        if (t && !aeq.isArray(t)) {
          if (this.valueTypeIs("TwoD")) {
            t = [t, t];
          } else if (this.valueTypeIs("ThreeD")) {
            t = [t, t, t];
          } else {
            t = [t];
          }
        }
        this.property.setTemporalEaseAtKey(this.index, e, t);
      },
      time: function () {
        this.checkKey();
        return this.originalTime;
      },
      toString: function () {
        return "[object aeq.Key]";
      },
      valueTypeIs: function e(t) {
        return this.property.propertyValueType === PropertyValueType[t];
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
      function (e) {
        var t = e.charAt(0).toUpperCase() + e.slice(1);
        var r = "key" + t;
        var n = "set" + t + "AtKey";
        aeq.Key.prototype[e] = function () {
          this.checkKey();
          if (arguments.length === 0) {
            return this.property[r](this.index);
          }
          [].unshift.call(arguments, this.index);
          this.property[n].apply(this.property, arguments);
        };
      },
    );
    aeq.pasteKey = function (e) {
      var t = e.property.addKey(e.time);
      var r = new aeq.Key(e.property, t);
      r.value(e.value);
      if (e.temporalEase !== undefined) {
        r.temporalEase(e.temporalEase);
      }
      r.interpolationType(e.interpolationType);
      if (
        e.temporalAutoBezier !== undefined &&
        e.temporalContinuous !== undefined
      ) {
        r.temporalAutoBezier(e.temporalAutoBezier);
        r.temporalContinuous(e.temporalContinuous);
      }
      if (
        e.spatialAutoBezier !== undefined &&
        e.spatialContinuous !== undefined
      ) {
        r.spatialAutoBezier(e.spatialAutoBezier);
        r.spatialContinuous(e.spatialContinuous);
        r.spatialTangent(e.spatialTangent);
        r.roving(e.roving);
      }
      return r;
    };
    aeq.Layer = function (e) {
      if (e instanceof aeq.Layer) {
        return e;
      }
      if (this instanceof aeq.Layer) {
        this.layer = e;
      } else {
        return new aeq.Layer(e);
      }
    };
    aeq.Layer.prototype = {
      addEffect: function (e) {
        var t = this.layer.property("ADBE Effect Parade");
        if (t.canAddProperty(e)) {
          t.addProperty(e);
        } else {
          throw new Error('Can not add effect "' + e + '" to this layer');
        }
      },
      allChildren: function () {
        return aeq.layer.allChildren(this.layer);
      },
      children: function () {
        return aeq.layer.children(this.layer);
      },
      copyToComp: function (e) {
        if (!aeq.isComp(e)) {
          if (e instanceof aeq.Comp) {
            e = e.comp;
          } else {
            if (aeq.isString(e)) {
              e = aeq.getComp(e);
            }
          }
        }
        this.layer.copyToComp(e);
        return this;
      },
      extend: aeq.extend,
      forEachEffect: function (e) {
        var t = this.layer.property("ADBE Effect Parade");
        var r = t.numProperties;
        var n = 1;
        for (; n <= r; n++) {
          e(t.property(n), n, t);
        }
        return this;
      },
      get: function () {
        return this.layer;
      },
      isAeq: true,
      parent: function (e) {
        if (arguments.length === 0) {
          return this.layer.parent;
        }
        if (e === null) {
          this.layer.parent = null;
          return null;
        }
        var t = n(this.layer, e);
        if (t === null) {
          return null;
        }
        this.layer.parent = t;
        return t;
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
      function (e) {
        aeq.Layer.prototype[e] = function () {
          return this.layer[e];
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
      function (t) {
        aeq.Layer.prototype[t] = function (e) {
          if (arguments.length === 0) {
            return this.layer[t];
          }
          this.layer[t] = e;
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
      function (t) {
        aeq.Layer.prototype[t] = function (e) {
          this.layer[t](e);
          return this;
        };
      },
    );
    aeq.forEach(["setParentWithJump", "moveAfter", "moveBefore"], function (r) {
      aeq.Layer.prototype[r] = function (e) {
        var t = n(this.layer, e);
        if (t === null) {
          return null;
        }
        this.layer[r](t);
        return t;
      };
    });
    var h = /^(\+|-)=/;
    aeq.Property = function (e) {
      if (e instanceof aeq.Property) {
        return e;
      }
      if (this instanceof aeq.Property) {
        this.property = e;
      } else {
        return new aeq.Property(e);
      }
    };
    aeq.Property.prototype = {
      addKey: function (e) {
        var t = this.property.addKey(e);
        return this.key(t);
      },
      expression: function (e) {
        if (!this.property.canSetExpression) {
          return false;
        }
        if (arguments.length === 0) {
          return this.property.expression;
        }
        this.property.expression = e;
        if (
          this.property.expressionError === "" &&
          (this.property.expressionEnabled || e === "")
        ) {
          return true;
        }
        return this.property.expressionError;
      },
      extend: aeq.extend,
      forEachKey: function (e) {
        var t = this.property.numKeys;
        var r = 1;
        for (; r <= t; r++) {
          e(this.key(r), r, this.property);
        }
      },
      get: function () {
        return this.property;
      },
      isAeq: true,
      key: function (e) {
        return new aeq.Key(this.property, e);
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
      nearestKeyIndex: function (e) {
        var t = this.property.nearestKeyIndex(e);
        return this.key(t);
      },
      removeKey: function (e) {
        if (aeq.isNumber(e)) {
          this.property.removeKey(e);
        } else {
          if (e.toString() === "[object aeq.Key]") {
            e.remove();
          }
        }
      },
      selectedKeys: function () {
        var e = [];
        for (var t = 1; t <= this.property.selectedKeys.length; t += 1) {
          e.push(this.key(t));
        }
        return e;
      },
      separationDimension: function () {
        if (this.property.isSeparationFollower) {
          return this.property.separationDimension;
        }
        return null;
      },
      separationFollower: function (e) {
        return this.property.getSeparationFollower(e);
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
      value: function (e) {
        if (arguments.length === 0) {
          return this.property.value;
        }
        this.property.setValue(e);
      },
      valueAtTime: function (e, t) {
        if (arguments.length === 1) {
          return this.property.valueAtTime(e);
        }
        this.property.setValueAtTime(e, t);
        return this.nearestKeyIndex(e);
      },
      valuesAtTimes: function (e, t) {
        var r = [];
        var n = 0;
        var i = e.length;
        if (arguments.length === 1) {
          for (; n < i; n++) {
            r.push(this.property.valueAtTime(e[n]));
          }
          return r;
        }
        this.property.setValuesAtTimes(e, t);
        for (; n < i; n++) {
          r.push(this.nearestKeyIndex(e[n]));
        }
        return r;
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
      function (e) {
        aeq.Property.prototype[e] = function () {
          return this.property[e];
        };
      },
    );
    return aeq;
  })();
  var cssselector = (function () {
    function e(e, t) {
      function r() {
        this.constructor = e;
      }
      r.prototype = t.prototype;
      e.prototype = new r();
    }
    function Ar(e, t, r, n) {
      this.message = e;
      this.expected = t;
      this.found = r;
      this.location = n;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, Ar);
      }
    }
    function t(u) {
      function xt() {
        return u.substring(ht, dt);
      }
      function Et() {
        return St(ht, dt);
      }
      function Ct(e) {
        throw Tt(
          null,
          [{ description: e, type: "other" }],
          u.substring(ht, dt),
          St(ht, dt),
        );
      }
      function At(e) {
        throw Tt(e, null, u.substring(ht, dt), St(ht, dt));
      }
      function wt(e) {
        var t = yt[e];
        if (t) {
          return t;
        } else {
          r = e - 1;
          while (!yt[r]) {
            r--;
          }
          t = yt[r];
          t = { column: t.column, line: t.line, seenCR: t.seenCR };
          while (r < e) {
            n = u.charAt(r);
            if (n === "\n") {
              if (!t.seenCR) {
                t.line++;
              }
              t.column = 1;
              t.seenCR = false;
            } else if (n === "\r" || n === "\u2028" || n === "\u2029") {
              t.line++;
              t.column = 1;
              t.seenCR = true;
            } else {
              t.column++;
              t.seenCR = false;
            }
            r++;
          }
          yt[e] = t;
          return t;
        }
      }
      function St(e, t) {
        var r = wt(e);
        var n = wt(t);
        return {
          end: { column: n.column, line: n.line, offset: t },
          start: { column: r.column, line: r.line, offset: e },
        };
      }
      function Ft(e) {
        if (dt < gt) {
          return;
        }
        if (dt > gt) {
          gt = dt;
          vt = [];
        }
        vt.push(e);
      }
      function Tt(e, t, r, n) {
        function i(e) {
          var t = 1;
          e.sort(function (e, t) {
            if (e.description < t.description) {
              return -1;
            } else if (e.description > t.description) {
              return 1;
            } else {
              return 0;
            }
          });
          while (t < e.length) {
            if (e[t - 1] === e[t]) {
              e.splice(t, 1);
            } else {
              t++;
            }
          }
        }
        function o(e, t) {
          function r(e) {
            function t(e) {
              return e.charCodeAt(0).toString(16).toUpperCase();
            }
            return e
              .replace(/\\/g, "\\\\")
              .replace(/"/g, '\\"')
              .replace(/\x08/g, "\\b")
              .replace(/\t/g, "\\t")
              .replace(/\n/g, "\\n")
              .replace(/\f/g, "\\f")
              .replace(/\r/g, "\\r")
              .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (e) {
                return "\\x0" + t(e);
              })
              .replace(/[\x10-\x1F\x80-\xFF]/g, function (e) {
                return "\\x" + t(e);
              })
              .replace(/[\u0100-\u0FFF]/g, function (e) {
                return "\\u0" + t(e);
              })
              .replace(/[\u1000-\uFFFF]/g, function (e) {
                return "\\u" + t(e);
              });
          }
          var n = new Array(e.length);
          for (var a = 0; a < e.length; a += 1) {
            n[a] = e[a].description;
          }
          i =
            e.length > 1
              ? n.slice(0, -1).join(", ") + " or " + n[e.length - 1]
              : n[0];
          o = t ? '"' + r(t) + '"' : "end of input";
          return "Expected " + i + " but " + o + " found.";
        }
        if (t !== null) {
          i(t);
        }
        return new Ar(e !== null ? e : o(t, r), t, r, n);
      }
      function jt() {
        e = Nt();
        return e;
      }
      function Pt() {
        e = dt;
        if (u.charCodeAt(dt) === 91) {
          t = l;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(c);
          }
        }
        if (t !== f) {
          r = [];
          n = Ot();
          while (n !== f) {
            r.push(n);
            n = Ot();
          }
          if (r !== f) {
            if (u.charCodeAt(dt) === 93) {
              n = p;
              dt++;
            } else {
              n = f;
              if (mt === 0) {
                Ft(d);
              }
            }
            if (n !== f) {
              ht = e;
              t = i(r);
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function It() {
        e = dt;
        if (u.charCodeAt(dt) === 40) {
          t = o;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(a);
          }
        }
        if (t !== f) {
          r = [];
          n = Ot();
          while (n !== f) {
            r.push(n);
            n = Ot();
          }
          if (r !== f) {
            if (u.charCodeAt(dt) === 41) {
              n = s;
              dt++;
            } else {
              n = f;
              if (mt === 0) {
                Ft(h);
              }
            }
            if (n !== f) {
              ht = e;
              t = i(r);
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function Ot() {
        e = qt();
        if (e === f) {
          e = Lt();
        }
        return e;
      }
      function Lt() {
        e = dt;
        t = [];
        if (y.test(u.charAt(dt))) {
          r = u.charAt(dt);
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(g);
          }
        }
        if (r !== f) {
          while (r !== f) {
            t.push(r);
            if (y.test(u.charAt(dt))) {
              r = u.charAt(dt);
              dt++;
            } else {
              r = f;
              if (mt === 0) {
                Ft(g);
              }
            }
          }
        } else {
          t = f;
        }
        if (t !== f) {
          r = fr();
          if (r !== f) {
            ht = e;
            t = v(t);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function qt() {
        e = dt;
        t = [];
        if (y.test(u.charAt(dt))) {
          r = u.charAt(dt);
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(g);
          }
        }
        if (r !== f) {
          while (r !== f) {
            t.push(r);
            if (y.test(u.charAt(dt))) {
              r = u.charAt(dt);
              dt++;
            } else {
              r = f;
              if (mt === 0) {
                Ft(g);
              }
            }
          }
        } else {
          t = f;
        }
        if (t !== f) {
          if (u.charCodeAt(dt) === 61) {
            r = m;
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(b);
            }
          }
          if (r !== f) {
            n = Ut();
            if (n !== f) {
              i = fr();
              if (i === f) {
                i = null;
              }
              if (i !== f) {
                ht = e;
                t = x(t, n);
                e = t;
              } else {
                dt = e;
                e = f;
              }
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function kt() {
        e = dt;
        t = [];
        if (y.test(u.charAt(dt))) {
          r = u.charAt(dt);
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(g);
          }
        }
        if (r !== f) {
          while (r !== f) {
            t.push(r);
            if (y.test(u.charAt(dt))) {
              r = u.charAt(dt);
              dt++;
            } else {
              r = f;
              if (mt === 0) {
                Ft(g);
              }
            }
          }
        } else {
          t = f;
        }
        if (t !== f) {
          r = Pt();
          if (r === f) {
            r = null;
          }
          if (r !== f) {
            n = [];
            i = Rt();
            while (i !== f) {
              n.push(i);
              i = Rt();
            }
            if (n !== f) {
              i = fr();
              if (i === f) {
                i = null;
              }
              if (i !== f) {
                ht = e;
                t = E(t, r, n);
                e = t;
              } else {
                dt = e;
                e = f;
              }
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function Nt() {
        e = [];
        t = kt();
        if (t !== f) {
          while (t !== f) {
            e.push(t);
            t = kt();
          }
        } else {
          e = f;
        }
        return e;
      }
      function Rt() {
        e = dt;
        if (u.charCodeAt(dt) === 58) {
          t = C;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(A);
          }
        }
        if (t !== f) {
          r = [];
          if (y.test(u.charAt(dt))) {
            n = u.charAt(dt);
            dt++;
          } else {
            n = f;
            if (mt === 0) {
              Ft(g);
            }
          }
          while (n !== f) {
            r.push(n);
            if (y.test(u.charAt(dt))) {
              n = u.charAt(dt);
              dt++;
            } else {
              n = f;
              if (mt === 0) {
                Ft(g);
              }
            }
          }
          if (r !== f) {
            n = It();
            if (n === f) {
              n = null;
            }
            if (n !== f) {
              ht = e;
              t = w(r, n);
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function Ut() {
        e = Dt();
        if (e === f) {
          e = Kt();
          if (e === f) {
            e = Mt();
            if (e === f) {
              e = or();
              if (e === f) {
                e = lr();
              }
            }
          }
        }
        return e;
      }
      function Kt() {
        e = dt;
        t = Qt();
        if (t !== f) {
          r = dt;
          mt++;
          n = Bt();
          mt--;
          if (n === f) {
            r = void 0;
          } else {
            dt = r;
            r = f;
          }
          if (r !== f) {
            ht = e;
            t = S(t);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = dt;
          t = Gt();
          if (t !== f) {
            ht = e;
            t = S(t);
          }
          e = t;
        }
        return e;
      }
      function Dt() {
        e = dt;
        t = sr();
        if (t !== f) {
          ht = e;
          t = F();
        }
        e = t;
        if (e === f) {
          e = dt;
          t = ur();
          if (t !== f) {
            ht = e;
            t = T();
          }
          e = t;
        }
        return e;
      }
      function zt() {
        if (u.charCodeAt(dt) === 48) {
          e = j;
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(P);
          }
        }
        if (e === f) {
          e = dt;
          t = Wt();
          if (t !== f) {
            r = [];
            n = Bt();
            while (n !== f) {
              r.push(n);
              n = Bt();
            }
            if (r !== f) {
              t = [t, r];
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        }
        return e;
      }
      function Bt() {
        if (I.test(u.charAt(dt))) {
          e = u.charAt(dt);
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(O);
          }
        }
        return e;
      }
      function Wt() {
        if (L.test(u.charAt(dt))) {
          e = u.charAt(dt);
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(q);
          }
        }
        return e;
      }
      function Gt() {
        e = dt;
        t = zt();
        if (t !== f) {
          if (u.charCodeAt(dt) === 46) {
            r = k;
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(N);
            }
          }
          if (r !== f) {
            n = [];
            i = Bt();
            while (i !== f) {
              n.push(i);
              i = Bt();
            }
            if (n !== f) {
              ht = e;
              t = R();
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = dt;
          if (u.charCodeAt(dt) === 46) {
            t = k;
            dt++;
          } else {
            t = f;
            if (mt === 0) {
              Ft(N);
            }
          }
          if (t !== f) {
            r = [];
            n = Bt();
            if (n !== f) {
              while (n !== f) {
                r.push(n);
                n = Bt();
              }
            } else {
              r = f;
            }
            if (r !== f) {
              ht = e;
              t = R();
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
          if (e === f) {
            e = dt;
            t = zt();
            if (t !== f) {
              ht = e;
              t = U();
            }
            e = t;
          }
        }
        return e;
      }
      function Qt() {
        e = dt;
        if (u.substr(dt, 2).toLowerCase() === K) {
          t = u.substr(dt, 2);
          dt += 2;
        } else {
          t = f;
          if (mt === 0) {
            Ft(D);
          }
        }
        if (t !== f) {
          r = dt;
          n = [];
          i = _t();
          if (i !== f) {
            while (i !== f) {
              n.push(i);
              i = _t();
            }
          } else {
            n = f;
          }
          if (n !== f) {
            r = u.substring(r, dt);
          } else {
            r = n;
          }
          if (r !== f) {
            ht = e;
            t = z(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function _t() {
        if (B.test(u.charAt(dt))) {
          e = u.charAt(dt);
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(W);
          }
        }
        return e;
      }
      function Mt() {
        e = dt;
        if (u.charCodeAt(dt) === 34) {
          t = G;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(Q);
          }
        }
        if (t !== f) {
          r = [];
          n = Vt();
          while (n !== f) {
            r.push(n);
            n = Vt();
          }
          if (r !== f) {
            if (u.charCodeAt(dt) === 34) {
              n = G;
              dt++;
            } else {
              n = f;
              if (mt === 0) {
                Ft(Q);
              }
            }
            if (n !== f) {
              ht = e;
              t = _(r);
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = dt;
          if (u.charCodeAt(dt) === 39) {
            t = M;
            dt++;
          } else {
            t = f;
            if (mt === 0) {
              Ft(V);
            }
          }
          if (t !== f) {
            r = [];
            n = Jt();
            while (n !== f) {
              r.push(n);
              n = Jt();
            }
            if (r !== f) {
              if (u.charCodeAt(dt) === 39) {
                n = M;
                dt++;
              } else {
                n = f;
                if (mt === 0) {
                  Ft(V);
                }
              }
              if (n !== f) {
                ht = e;
                t = _(r);
                e = t;
              } else {
                dt = e;
                e = f;
              }
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        }
        return e;
      }
      function Vt() {
        e = dt;
        t = dt;
        mt++;
        if (u.charCodeAt(dt) === 34) {
          r = G;
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(Q);
          }
        }
        if (r === f) {
          if (u.charCodeAt(dt) === 92) {
            r = J;
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(H);
            }
          }
          if (r === f) {
            r = nr();
          }
        }
        mt--;
        if (r === f) {
          t = void 0;
        } else {
          dt = t;
          t = f;
        }
        if (t !== f) {
          if (u.length > dt) {
            r = u.charAt(dt);
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(Z);
            }
          }
          if (r !== f) {
            ht = e;
            t = Y();
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = dt;
          if (u.charCodeAt(dt) === 92) {
            t = J;
            dt++;
          } else {
            t = f;
            if (mt === 0) {
              Ft(H);
            }
          }
          if (t !== f) {
            r = Ht();
            if (r !== f) {
              ht = e;
              t = X(r);
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
          if (e === f) {
            e = $t();
          }
        }
        return e;
      }
      function Jt() {
        e = dt;
        t = dt;
        mt++;
        if (u.charCodeAt(dt) === 39) {
          r = M;
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(V);
          }
        }
        if (r === f) {
          if (u.charCodeAt(dt) === 92) {
            r = J;
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(H);
            }
          }
          if (r === f) {
            r = nr();
          }
        }
        mt--;
        if (r === f) {
          t = void 0;
        } else {
          dt = t;
          t = f;
        }
        if (t !== f) {
          if (u.length > dt) {
            r = u.charAt(dt);
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(Z);
            }
          }
          if (r !== f) {
            ht = e;
            t = Y();
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = dt;
          if (u.charCodeAt(dt) === 92) {
            t = J;
            dt++;
          } else {
            t = f;
            if (mt === 0) {
              Ft(H);
            }
          }
          if (t !== f) {
            r = Ht();
            if (r !== f) {
              ht = e;
              t = X(r);
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
          if (e === f) {
            e = $t();
          }
        }
        return e;
      }
      function $t() {
        e = dt;
        if (u.charCodeAt(dt) === 92) {
          t = J;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(H);
          }
        }
        if (t !== f) {
          r = ir();
          if (r !== f) {
            ht = e;
            t = ee();
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function Ht() {
        e = Zt();
        if (e === f) {
          e = dt;
          if (u.charCodeAt(dt) === 48) {
            t = j;
            dt++;
          } else {
            t = f;
            if (mt === 0) {
              Ft(P);
            }
          }
          if (t !== f) {
            r = dt;
            mt++;
            n = Bt();
            mt--;
            if (n === f) {
              r = void 0;
            } else {
              dt = r;
              r = f;
            }
            if (r !== f) {
              ht = e;
              t = te();
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
          if (e === f) {
            e = tr();
            if (e === f) {
              e = rr();
            }
          }
        }
        return e;
      }
      function Zt() {
        e = Yt();
        if (e === f) {
          e = Xt();
        }
        return e;
      }
      function Yt() {
        if (u.charCodeAt(dt) === 39) {
          e = M;
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(V);
          }
        }
        if (e === f) {
          if (u.charCodeAt(dt) === 34) {
            e = G;
            dt++;
          } else {
            e = f;
            if (mt === 0) {
              Ft(Q);
            }
          }
          if (e === f) {
            if (u.charCodeAt(dt) === 92) {
              e = J;
              dt++;
            } else {
              e = f;
              if (mt === 0) {
                Ft(H);
              }
            }
            if (e === f) {
              e = dt;
              if (u.charCodeAt(dt) === 98) {
                t = re;
                dt++;
              } else {
                t = f;
                if (mt === 0) {
                  Ft(ne);
                }
              }
              if (t !== f) {
                ht = e;
                t = ie();
              }
              e = t;
              if (e === f) {
                e = dt;
                if (u.charCodeAt(dt) === 102) {
                  t = oe;
                  dt++;
                } else {
                  t = f;
                  if (mt === 0) {
                    Ft(ae);
                  }
                }
                if (t !== f) {
                  ht = e;
                  t = se();
                }
                e = t;
                if (e === f) {
                  e = dt;
                  if (u.charCodeAt(dt) === 110) {
                    t = ue;
                    dt++;
                  } else {
                    t = f;
                    if (mt === 0) {
                      Ft(fe);
                    }
                  }
                  if (t !== f) {
                    ht = e;
                    t = le();
                  }
                  e = t;
                  if (e === f) {
                    e = dt;
                    if (u.charCodeAt(dt) === 114) {
                      t = ce;
                      dt++;
                    } else {
                      t = f;
                      if (mt === 0) {
                        Ft(pe);
                      }
                    }
                    if (t !== f) {
                      ht = e;
                      t = de();
                    }
                    e = t;
                    if (e === f) {
                      e = dt;
                      if (u.charCodeAt(dt) === 116) {
                        t = he;
                        dt++;
                      } else {
                        t = f;
                        if (mt === 0) {
                          Ft(ye);
                        }
                      }
                      if (t !== f) {
                        ht = e;
                        t = ge();
                      }
                      e = t;
                      if (e === f) {
                        e = dt;
                        if (u.charCodeAt(dt) === 118) {
                          t = ve;
                          dt++;
                        } else {
                          t = f;
                          if (mt === 0) {
                            Ft(me);
                          }
                        }
                        if (t !== f) {
                          ht = e;
                          t = be();
                        }
                        e = t;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return e;
      }
      function Xt() {
        e = dt;
        t = dt;
        mt++;
        r = er();
        if (r === f) {
          r = nr();
        }
        mt--;
        if (r === f) {
          t = void 0;
        } else {
          dt = t;
          t = f;
        }
        if (t !== f) {
          if (u.length > dt) {
            r = u.charAt(dt);
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(Z);
            }
          }
          if (r !== f) {
            ht = e;
            t = Y();
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function er() {
        e = Yt();
        if (e === f) {
          e = Bt();
          if (e === f) {
            if (u.charCodeAt(dt) === 120) {
              e = xe;
              dt++;
            } else {
              e = f;
              if (mt === 0) {
                Ft(Ee);
              }
            }
            if (e === f) {
              if (u.charCodeAt(dt) === 117) {
                e = Ce;
                dt++;
              } else {
                e = f;
                if (mt === 0) {
                  Ft(Ae);
                }
              }
            }
          }
        }
        return e;
      }
      function tr() {
        e = dt;
        if (u.charCodeAt(dt) === 120) {
          t = xe;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(Ee);
          }
        }
        if (t !== f) {
          r = dt;
          n = dt;
          i = _t();
          if (i !== f) {
            o = _t();
            if (o !== f) {
              i = [i, o];
              n = i;
            } else {
              dt = n;
              n = f;
            }
          } else {
            dt = n;
            n = f;
          }
          if (n !== f) {
            r = u.substring(r, dt);
          } else {
            r = n;
          }
          if (r !== f) {
            ht = e;
            t = we(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function rr() {
        e = dt;
        if (u.charCodeAt(dt) === 117) {
          t = Ce;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(Ae);
          }
        }
        if (t !== f) {
          r = dt;
          n = dt;
          i = _t();
          if (i !== f) {
            o = _t();
            if (o !== f) {
              a = _t();
              if (a !== f) {
                s = _t();
                if (s !== f) {
                  i = [i, o, a, s];
                  n = i;
                } else {
                  dt = n;
                  n = f;
                }
              } else {
                dt = n;
                n = f;
              }
            } else {
              dt = n;
              n = f;
            }
          } else {
            dt = n;
            n = f;
          }
          if (n !== f) {
            r = u.substring(r, dt);
          } else {
            r = n;
          }
          if (r !== f) {
            ht = e;
            t = we(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function nr() {
        if (Se.test(u.charAt(dt))) {
          e = u.charAt(dt);
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(Fe);
          }
        }
        return e;
      }
      function ir() {
        mt++;
        if (u.charCodeAt(dt) === 10) {
          e = je;
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(Pe);
          }
        }
        if (e === f) {
          if (u.substr(dt, 2) === Ie) {
            e = Ie;
            dt += 2;
          } else {
            e = f;
            if (mt === 0) {
              Ft(Oe);
            }
          }
          if (e === f) {
            if (u.charCodeAt(dt) === 13) {
              e = Le;
              dt++;
            } else {
              e = f;
              if (mt === 0) {
                Ft(qe);
              }
            }
            if (e === f) {
              if (u.charCodeAt(dt) === 8232) {
                e = ke;
                dt++;
              } else {
                e = f;
                if (mt === 0) {
                  Ft(Ne);
                }
              }
              if (e === f) {
                if (u.charCodeAt(dt) === 8233) {
                  e = Re;
                  dt++;
                } else {
                  e = f;
                  if (mt === 0) {
                    Ft(Ue);
                  }
                }
              }
            }
          }
        }
        mt--;
        if (e === f) {
          t = f;
          if (mt === 0) {
            Ft(Te);
          }
        }
        return e;
      }
      function or() {
        e = dt;
        if (u.charCodeAt(dt) === 91) {
          t = l;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(c);
          }
        }
        if (t !== f) {
          r = fr();
          if (r !== f) {
            n = [];
            i = ar();
            while (i !== f) {
              n.push(i);
              i = ar();
            }
            if (n !== f) {
              i = fr();
              if (i !== f) {
                o = Ut();
                if (o !== f) {
                  a = fr();
                  if (a !== f) {
                    if (u.charCodeAt(dt) === 93) {
                      s = p;
                      dt++;
                    } else {
                      s = f;
                      if (mt === 0) {
                        Ft(d);
                      }
                    }
                    if (s !== f) {
                      ht = e;
                      t = Ke(n, o);
                      e = t;
                    } else {
                      dt = e;
                      e = f;
                    }
                  } else {
                    dt = e;
                    e = f;
                  }
                } else {
                  dt = e;
                  e = f;
                }
              } else {
                dt = e;
                e = f;
              }
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function ar() {
        e = dt;
        t = Ut();
        if (t !== f) {
          r = fr();
          if (r !== f) {
            if (u.charCodeAt(dt) === 44) {
              n = De;
              dt++;
            } else {
              n = f;
              if (mt === 0) {
                Ft(ze);
              }
            }
            if (n !== f) {
              i = fr();
              if (i !== f) {
                ht = e;
                t = Be(t);
                e = t;
              } else {
                dt = e;
                e = f;
              }
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function sr() {
        e = dt;
        if (u.substr(dt, 4) === We) {
          t = We;
          dt += 4;
        } else {
          t = f;
          if (mt === 0) {
            Ft(Ge);
          }
        }
        if (t !== f) {
          r = fr();
          if (r === f) {
            r = null;
          }
          if (r !== f) {
            t = [t, r];
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function ur() {
        e = dt;
        if (u.substr(dt, 5) === Qe) {
          t = Qe;
          dt += 5;
        } else {
          t = f;
          if (mt === 0) {
            Ft(_e);
          }
        }
        if (t !== f) {
          r = fr();
          if (r === f) {
            r = null;
          }
          if (r !== f) {
            t = [t, r];
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function fr() {
        mt++;
        e = [];
        if (Ve.test(u.charAt(dt))) {
          t = u.charAt(dt);
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(Je);
          }
        }
        while (t !== f) {
          e.push(t);
          if (Ve.test(u.charAt(dt))) {
            t = u.charAt(dt);
            dt++;
          } else {
            t = f;
            if (mt === 0) {
              Ft(Je);
            }
          }
        }
        mt--;
        if (e === f) {
          t = f;
          if (mt === 0) {
            Ft(Me);
          }
        }
        return e;
      }
      function lr() {
        mt++;
        e = dt;
        if (u.charCodeAt(dt) === 47) {
          t = He;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(Ze);
          }
        }
        if (t !== f) {
          r = cr();
          if (r !== f) {
            if (u.charCodeAt(dt) === 47) {
              n = He;
              dt++;
            } else {
              n = f;
              if (mt === 0) {
                Ft(Ze);
              }
            }
            if (n !== f) {
              i = xr();
              if (i !== f) {
                ht = e;
                t = Ye(r, i);
                e = t;
              } else {
                dt = e;
                e = f;
              }
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        mt--;
        if (e === f) {
          t = f;
          if (mt === 0) {
            Ft($e);
          }
        }
        return e;
      }
      function cr() {
        e = dt;
        t = dr();
        if (t !== f) {
          r = pr();
          if (r !== f) {
            ht = e;
            t = Xe(t, r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function pr() {
        e = dt;
        t = [];
        r = hr();
        while (r !== f) {
          t.push(r);
          r = hr();
        }
        if (t !== f) {
          ht = e;
          t = et(t);
        }
        e = t;
        return e;
      }
      function dr() {
        e = dt;
        t = dt;
        mt++;
        if (tt.test(u.charAt(dt))) {
          r = u.charAt(dt);
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(rt);
          }
        }
        mt--;
        if (r === f) {
          t = void 0;
        } else {
          dt = t;
          t = f;
        }
        if (t !== f) {
          r = gr();
          if (r !== f) {
            ht = e;
            t = nt(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = yr();
          if (e === f) {
            e = vr();
          }
        }
        return e;
      }
      function hr() {
        e = dt;
        t = dt;
        mt++;
        if (it.test(u.charAt(dt))) {
          r = u.charAt(dt);
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(ot);
          }
        }
        mt--;
        if (r === f) {
          t = void 0;
        } else {
          dt = t;
          t = f;
        }
        if (t !== f) {
          r = gr();
          if (r !== f) {
            ht = e;
            t = nt(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = yr();
          if (e === f) {
            e = vr();
          }
        }
        return e;
      }
      function yr() {
        e = dt;
        if (u.charCodeAt(dt) === 92) {
          t = J;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(H);
          }
        }
        if (t !== f) {
          r = gr();
          if (r !== f) {
            ht = e;
            t = at(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function gr() {
        e = dt;
        t = dt;
        mt++;
        r = nr();
        mt--;
        if (r === f) {
          t = void 0;
        } else {
          dt = t;
          t = f;
        }
        if (t !== f) {
          r = Er();
          if (r !== f) {
            ht = e;
            t = nt(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function vr() {
        e = dt;
        if (u.charCodeAt(dt) === 91) {
          t = l;
          dt++;
        } else {
          t = f;
          if (mt === 0) {
            Ft(c);
          }
        }
        if (t !== f) {
          r = mr();
          if (r !== f) {
            if (u.charCodeAt(dt) === 93) {
              n = p;
              dt++;
            } else {
              n = f;
              if (mt === 0) {
                Ft(d);
              }
            }
            if (n !== f) {
              ht = e;
              t = st(r);
              e = t;
            } else {
              dt = e;
              e = f;
            }
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        return e;
      }
      function mr() {
        e = dt;
        t = [];
        r = br();
        while (r !== f) {
          t.push(r);
          r = br();
        }
        if (t !== f) {
          ht = e;
          t = et(t);
        }
        e = t;
        return e;
      }
      function br() {
        e = dt;
        t = dt;
        mt++;
        if (ut.test(u.charAt(dt))) {
          r = u.charAt(dt);
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(ft);
          }
        }
        mt--;
        if (r === f) {
          t = void 0;
        } else {
          dt = t;
          t = f;
        }
        if (t !== f) {
          r = gr();
          if (r !== f) {
            ht = e;
            t = nt(r);
            e = t;
          } else {
            dt = e;
            e = f;
          }
        } else {
          dt = e;
          e = f;
        }
        if (e === f) {
          e = yr();
        }
        return e;
      }
      function xr() {
        e = dt;
        t = [];
        if (lt.test(u.charAt(dt))) {
          r = u.charAt(dt);
          dt++;
        } else {
          r = f;
          if (mt === 0) {
            Ft(ct);
          }
        }
        while (r !== f) {
          t.push(r);
          if (lt.test(u.charAt(dt))) {
            r = u.charAt(dt);
            dt++;
          } else {
            r = f;
            if (mt === 0) {
              Ft(ct);
            }
          }
        }
        if (t !== f) {
          ht = e;
          t = pt(t);
        }
        e = t;
        return e;
      }
      function Er() {
        if (u.length > dt) {
          e = u.charAt(dt);
          dt++;
        } else {
          e = f;
          if (mt === 0) {
            Ft(Z);
          }
        }
        return e;
      }
      function Cr(e) {
        var t = {};
        for (var r = 0; r < e.length; r += 1) {
          var n = e[r];
          for (var i in n) {
            if (n.hasOwnProperty(i)) {
              t[i] = n[i];
            }
          }
        }
        return t;
      }
      var e = arguments.length > 1 ? arguments[1] : {};
      var t = this;
      var f = {};
      var r = { Start: jt };
      var n = jt;
      var l = "[";
      var c = { description: '"["', type: "literal", value: "[" };
      var p = "]";
      var d = { description: '"]"', type: "literal", value: "]" };
      var i = function (e) {
        return Cr(e);
      };
      var o = "(";
      var a = { description: '"("', type: "literal", value: "(" };
      var s = ")";
      var h = { description: '")"', type: "literal", value: ")" };
      var y = /^[a-zA-Z]/;
      var g = { description: "[a-zA-Z]", type: "class", value: "[a-zA-Z]" };
      var v = function (e) {
        var t = {};
        var r = e.join("");
        t[r] = { type: "Bool", value: true };
        return t;
      };
      var m = "=";
      var b = { description: '"="', type: "literal", value: "=" };
      var x = function (e, t) {
        var r = {};
        var n = e.join("");
        r[n] = t;
        return r;
      };
      var E = function (e, t, r) {
        return { props: t, pseudo: r, type: e.join("").toLowerCase() };
      };
      var C = ":";
      var A = { description: '":"', type: "literal", value: ":" };
      var w = function (e, t) {
        return { props: t, type: e.join("").toLowerCase() };
      };
      var S = function (e) {
        return e;
      };
      var F = function () {
        return { type: "Bool", value: true };
      };
      var T = function () {
        return { type: "Bool", value: false };
      };
      var j = "0";
      var P = { description: '"0"', type: "literal", value: "0" };
      var I = /^[0-9]/;
      var O = { description: "[0-9]", type: "class", value: "[0-9]" };
      var L = /^[1-9]/;
      var q = { description: "[1-9]", type: "class", value: "[1-9]" };
      var k = ".";
      var N = { description: '"."', type: "literal", value: "." };
      var R = function () {
        return { type: "Number", value: parseFloat(xt()) };
      };
      var U = function () {
        return { type: "Integer", value: parseFloat(xt()) };
      };
      var K = "0x";
      var D = { description: '"0x"', type: "literal", value: "0x" };
      var z = function (e) {
        return { type: "Hex", value: parseInt(e, 16) };
      };
      var B = /^[0-9a-f]/i;
      var W = { description: "[0-9a-f]i", type: "class", value: "[0-9a-f]i" };
      var G = '"';
      var Q = { description: '"\\""', type: "literal", value: '"' };
      var _ = function (e) {
        return { type: "String", value: e.join("") };
      };
      var M = "\'";
      var V = { description: '"\'"', type: "literal", value: "\'" };
      var J = "\\";
      var H = { description: '"\\\\"', type: "literal", value: "\\" };
      var Z = { description: "any character", type: "any" };
      var Y = function () {
        return xt();
      };
      var X = function (e) {
        return e;
      };
      var ee = function () {
        return "";
      };
      var te = function () {
        return "\x00";
      };
      var re = "b";
      var ne = { description: '"b"', type: "literal", value: "b" };
      var ie = function () {
        return "\b";
      };
      var oe = "f";
      var ae = { description: '"f"', type: "literal", value: "f" };
      var se = function () {
        return "\f";
      };
      var ue = "n";
      var fe = { description: '"n"', type: "literal", value: "n" };
      var le = function () {
        return "\n";
      };
      var ce = "r";
      var pe = { description: '"r"', type: "literal", value: "r" };
      var de = function () {
        return "\r";
      };
      var he = "t";
      var ye = { description: '"t"', type: "literal", value: "t" };
      var ge = function () {
        return "\t";
      };
      var ve = "v";
      var me = { description: '"v"', type: "literal", value: "v" };
      var be = function () {
        return "\v";
      };
      var xe = "x";
      var Ee = { description: '"x"', type: "literal", value: "x" };
      var Ce = "u";
      var Ae = { description: '"u"', type: "literal", value: "u" };
      var we = function (e) {
        return String.fromCharCode(parseInt(e, 16));
      };
      var Se = /^[\n\r\u2028\u2029]/;
      var Fe = {
        description: "[\\n\\r\\u2028\\u2029]",
        type: "class",
        value: "[\\n\\r\\u2028\\u2029]",
      };
      var Te = { description: "end of line", type: "other" };
      var je = "\n";
      var Pe = { description: '"\\n"', type: "literal", value: "\n" };
      var Ie = "\r\n";
      var Oe = { description: '"\\r\\n"', type: "literal", value: "\r\n" };
      var Le = "\r";
      var qe = { description: '"\\r"', type: "literal", value: "\r" };
      var ke = "\u2028";
      var Ne = { description: '"\\u2028"', type: "literal", value: "\u2028" };
      var Re = "\u2029";
      var Ue = { description: '"\\u2029"', type: "literal", value: "\u2029" };
      var Ke = function (e, t) {
        e.push(t);
        return { type: "Array", value: e };
      };
      var De = ",";
      var ze = { description: '","', type: "literal", value: "," };
      var Be = function (e) {
        return e;
      };
      var We = "true";
      var Ge = { description: '"true"', type: "literal", value: "true" };
      var Qe = "false";
      var _e = { description: '"false"', type: "literal", value: "false" };
      var Me = { description: "whitespace", type: "other" };
      var Ve = /^[ \t\n\r]/;
      var Je = {
        description: "[ \\t\\n\\r]",
        type: "class",
        value: "[ \\t\\n\\r]",
      };
      var $e = { description: "regular expression", type: "other" };
      var He = "/";
      var Ze = { description: '"/"', type: "literal", value: "/" };
      var Ye = function (e, t) {
        return { body: e, flags: t, type: "RegExp", value: new RegExp(e, t) };
      };
      var Xe = function (e, t) {
        return e + t;
      };
      var et = function (e) {
        return e.join("");
      };
      var tt = /^[*\\\/[]/;
      var rt = { description: "[*\\\\/[]", type: "class", value: "[*\\\\/[]" };
      var nt = function (e) {
        return e;
      };
      var it = /^[\\\/[]/;
      var ot = { description: "[\\\\/[]", type: "class", value: "[\\\\/[]" };
      var at = function (e) {
        return "\\" + e;
      };
      var st = function (e) {
        return "[" + e + "]";
      };
      var ut = /^[\]\\]/;
      var ft = { description: "[\\]\\\\]", type: "class", value: "[\\]\\\\]" };
      var lt = /^[gimuy]/;
      var ct = { description: "[gimuy]", type: "class", value: "[gimuy]" };
      var pt = function (e) {
        return e.join("");
      };
      var dt = 0;
      var ht = 0;
      var yt = [{ column: 1, line: 1, seenCR: false }];
      var gt = 0;
      var vt = [];
      var mt = 0;
      if ("startRule" in e) {
        if (!(e.startRule in r)) {
          throw new Error(
            "Can\'t start parsing from rule \"" + e.startRule + '".',
          );
        }
        n = r[e.startRule];
      }
      bt = n();
      if (bt !== f && dt === u.length) {
        return bt;
      } else {
        if (bt !== f && dt < u.length) {
          Ft({ description: "end of input", type: "end" });
        }
        throw Tt(
          null,
          vt,
          gt < u.length ? u.charAt(gt) : null,
          gt < u.length ? St(gt, gt + 1) : St(gt, gt),
        );
      }
    }
    ("use strict");
    e(Ar, Error);
    return { SyntaxError: Ar, parse: t };
  })();
  aeq.ui = (function (o) {
    o.Container = function (e) {
      this.obj = e;
    };
    o.Container.prototype = {
      _add: function (e, t) {
        if (aeq.isObject(t.arg1) && !aeq.isArray(t.arg1)) {
          t = t.arg1;
          t.arg1 = t.items || t.text;
        }
        var r = this.obj.add(e, t.bounds, t.arg1, t.properties);
        o.set(r, t);
        return r;
      },
      addButton: function (e, t, r) {
        return this._add("button", { arg1: e, onClick: t, properties: r });
      },
      addCheckbox: function (e, t, r) {
        return this._add("checkbox", { arg1: e, onClick: t, properties: r });
      },
      addDropdownList: function (e, t, r) {
        return this._add("dropdownlist", {
          arg1: e,
          onChange: t,
          properties: r,
        });
      },
      addEditText: function (e, t, r, n) {
        return this._add("edittext", {
          arg1: e,
          onChange: t,
          onChanging: r,
          properties: n,
        });
      },
      addGroup: function (e) {
        var t = this.obj.add("group");
        t = new o.Container(t);
        if (e) {
          t.set(e);
        }
        return t;
      },
      addIconButton: function (e, t, r) {
        var n = { arg1: e, onClick: t, properties: r };
        if (
          aeq.isObject(n.arg1) &&
          !aeq.isArray(n.arg1) &&
          !aeq.isFile(n.arg1) &&
          n.arg1.format === undefined
        ) {
          n = n.arg1;
          n.arg1 = n.image || undefined;
        }
        var i = this.obj.add("iconbutton", n.bounds, n.arg1, n.properties);
        o.set(i, n);
        return i;
      },
      addImage: function (e, t, r) {
        var n = { arg1: e, onClick: t, properties: r };
        if (
          aeq.isObject(n.arg1) &&
          !aeq.isArray(n.arg1) &&
          !aeq.isFile(n.arg1) &&
          n.arg1.format === undefined
        ) {
          n = n.arg1;
          n.arg1 = n.image || undefined;
        }
        var i = this.obj.add("image", n.bounds, n.arg1, n.properties);
        o.set(i, n);
        return i;
      },
      addListBox: function (e, t, r, n) {
        return this._add("listbox", {
          arg1: e,
          onChange: t,
          onDoubleClick: r,
          properties: n,
        });
      },
      addPanel: function (e, t) {
        var r = this._add("panel", { arg1: e, properties: t });
        return new o.Container(r);
      },
      addProgressbar: function (e, t) {
        return this.obj.add("progressbar", undefined, e, t);
      },
      addRadioButton: function (e, t, r) {
        return this._add("radiobutton", { arg1: e, onClick: t, properties: r });
      },
      addScrollbar: function (e, t, r, n) {
        var i = this.obj.add("scrollbar", undefined, e, t);
        i.onChange = r;
        i.onChanging = n;
        return i;
      },
      addSlider: function (e, t, r, n, i) {
        var o = this.obj.add("slider", undefined, e, t, r);
        o.onChange = n;
        o.onChanging = i;
        return o;
      },
      addStaticText: function (e, t) {
        return this._add("statictext", { arg1: e, properties: t });
      },
      addTab: function (e) {
        var t = this.obj.add("tab", undefined, e);
        return new o.Container(t);
      },
      addTabbedPanel: function () {
        var e = this.obj.add("tabbedpanel");
        return new o.Container(e);
      },
      addTreeView: function (e, t, r) {
        return this._add("treeview", { arg1: e, onChange: t, properties: r });
      },
      extend: aeq.extend,
      get: function () {
        return this.obj;
      },
      remove: function (e) {
        if (e instanceof o.Container) {
          e = e.obj;
        }
        this.obj.remove(e);
      },
      removeAll: function () {
        for (var e = this.obj.children.length - 1; e >= 0; e--) {
          this.obj.remove(this.obj.children[e]);
        }
      },
      removeChildren: function (e) {
        if (e instanceof o.Container) {
          e = e.obj;
        }
        for (var t = e.children.length - 1; t >= 0; t--) {
          e.remove(e.children[t]);
        }
      },
      set: function (e) {
        o.set(this.obj, e);
      },
      toString: function () {
        return "[object aeq.ui.Container]";
      },
      update: function () {
        this.obj.layout.layout(true);
        this.obj.layout.resize();
      },
    };
    o.Container.prototype.addListbox = o.Container.prototype.addListBox;
    o.Container.prototype.addStatictext = o.Container.prototype.addStaticText;
    o.Container.prototype.addTreeview = o.Container.prototype.addTreeView;
    (function e() {
      function i(t, r) {
        return function (e) {
          if (e === undefined) {
            return this.obj[t];
          }
          e =
            arguments.length === r
              ? Array.apply(null, arguments)
              : arguments[0];
          this.obj[t] = e;
        };
      }
      var t = ["enabled", "helpTip", "orientation", "text", "visible"];
      var r = [
        "alignChildren",
        "alignment",
        "location",
        "maximumSize",
        "minimumSize",
        "preferredSize",
        "size",
      ];
      var n = ["bounds", "margins"];
      aeq.forEach(t, function (t) {
        o.Container.prototype[t] = function (e) {
          if (e === undefined) {
            return this.obj[t];
          }
          this.obj[t] = e;
        };
      });
      aeq.forEach(r, function (e) {
        o.Container.prototype[e] = i(e, 2);
      });
      aeq.forEach(n, function (e) {
        o.Container.prototype[e] = i(e, 4);
      });
    })();
    return o;
  })(aeq.ui || {});
  aeq.ui = (function (i) {
    i.createMainWindow = function (e, t, r) {
      if (aeq.isPanel(e)) {
        return new i.Window(e);
      }
      if (aeq.isString(e)) {
        r = t;
        t = e;
      }
      r = aeq.setDefault(r, { resizeable: true });
      var n = new Window("palette", t, undefined, r);
      aeq.ui.root = n;
      return new i.Window(n);
    };
    i.createWindow = function (e, t) {
      t = aeq.setDefault(t, { resizeable: true });
      var r = new Window("palette", e, undefined, t);
      return new i.Window(r);
    };
    i.createDialog = function (e, t) {
      t = aeq.setDefault(t, { resizeable: true });
      var r = new Window("dialog", e, undefined, t);
      return new i.Window(r);
    };
    i.ready = function (e) {
      e();
    };
    i.set = function (e, t) {
      for (var r in t) {
        if (t.hasOwnProperty(r) && r !== "properties" && r !== "arg1") {
          e[r] = t[r];
        }
      }
    };
    return i;
  })(aeq.ui || {});
  aeq.ui = (function (e) {
    e.Window = function (e) {
      this.obj = e;
    };
    e.Window.prototype = e.Container.prototype;
    e.Window.prototype.show = function () {
      this.layout();
      if (aeq.isWindow(this.obj)) {
        return this.obj.show();
      }
    };
    e.Window.prototype.hide = function () {
      if (aeq.isWindow(this.obj)) {
        this.obj.hide();
      }
    };
    e.Window.prototype.close = function (e) {
      if (aeq.isWindow(this.obj)) {
        this.obj.close(e);
      }
    };
    e.Window.prototype.layout = function () {
      this.obj.layout.layout(true);
      this.obj.layout.resize();
      this.obj.onResizing = this.obj.onResize = function () {
        this.layout.resize();
      };
    };
    return e;
  })(aeq.ui || {});
  if (typeof JSON !== "object") {
    JSON = {};
  }
  (function () {
    function f(e) {
      return e < 10 ? "0" + e : e;
    }
    function this_value() {
      return this.valueOf();
    }
    function quote(e) {
      escapable.lastIndex = 0;
      return escapable.test(e)
        ? '"' +
            e.replace(escapable, function (e) {
              var t = meta[e];
              return typeof t === "string"
                ? t
                : "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
        : '"' + e + '"';
    }
    function str(e, t) {
      var a = gap;
      var u = t[e];
      if (u && typeof u === "object" && typeof u.toJSON === "function") {
        u = u.toJSON(e);
      }
      if (typeof rep === "function") {
        u = rep.call(t, e, u);
      }
      switch (typeof u) {
        case "string":
          return quote(u);
        case "number":
          return isFinite(u) ? String(u) : "null";
        case "boolean":
        case "null":
          return String(u);
        case "object":
          if (!u) {
            return "null";
          }
          gap += indent;
          s = [];
          if (Object.prototype.toString.apply(u) === "[object Array]") {
            o = u.length;
            for (var r = 0; r < o; r += 1) {
              s[r] = str(r, u) || "null";
            }
            i =
              s.length === 0
                ? "[]"
                : gap
                  ? "[\n" + gap + s.join(",\n" + gap) + "\n" + a + "]"
                  : "[" + s.join(",") + "]";
            gap = a;
            return i;
          }
          if (rep && typeof rep === "object") {
            o = rep.length;
            for (var r = 0; r < o; r += 1) {
              if (typeof rep[r] === "string") {
                n = rep[r];
                i = str(n, u);
                if (i) {
                  s.push(quote(n) + gap ? ": " : ":" + i);
                }
              }
            }
          } else {
            for (var n in u) {
              if (Object.prototype.hasOwnProperty.call(u, n)) {
                i = str(n, u);
                if (i) {
                  s.push(quote(n) + gap ? ": " : ":" + i);
                }
              }
            }
          }
          i =
            s.length === 0
              ? "{}"
              : gap
                ? "{\n" + gap + s.join(",\n" + gap) + "\n" + a + "}"
                : "{" + s.join(",") + "}";
          gap = a;
          return i;
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
      JSON.stringify = function (e, t, r) {
        gap = "";
        indent = "";
        if (typeof r === "number") {
          for (var n = 0; n < r; n += 1) {
            indent += " ";
          }
        } else {
          if (typeof r === "string") {
            indent = r;
          }
        }
        rep = t;
        if (
          t &&
          typeof t !== "function" &&
          (typeof t !== "object" || typeof t.length !== "number")
        ) {
          throw new Error("JSON.stringify");
        }
        return str("", { "": e });
      };
    }
    if (typeof JSON.parse !== "function") {
      cx =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      JSON.parse = function (text, reviver) {
        function walk(e, t) {
          var i = e[t];
          if (i && typeof i === "object") {
            for (var r in i) {
              if (Object.prototype.hasOwnProperty.call(i, r)) {
                n = walk(i, r);
                if (n !== undefined) {
                  i[r] = n;
                } else {
                  delete i[r];
                }
              }
            }
          }
          return reviver.call(e, t, i);
        }
        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (e) {
            return "\\u" + ("0000" + e.charCodeAt(0).toString(16)).slice(-4);
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
  var toolbox = (function () {
    var toolboxFolder = new Folder(
      Folder.userData.fsName + "/Aescripts/" + script.name,
    );
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
      defaultConfigPath:
        toolboxFolder.fsName + "/" + script.name + "-config.json",
      defualtEditor: aeq.isWindows ? "start" : "open",
      iconFolder: new Folder(toolboxFolder.fsName + "/icons"),
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
      toolboxFolder: toolboxFolder,
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
    (function () {
      function e() {
        var e = aeq.settings.get(tb.script.name, tb.script.name + "Settings");
        if (e !== undefined) {
          e = JSON.parse(e);
          aeq.extend(tb.settings, e);
        }
      }
      function t() {
        if (tb.settings.configSet) {
          e = tb.settings.configPath;
          t = tb.readFile(e);
          if (t === null) {
            tb.configMissing = true;
            alert(
              "Config file is missing\nTool Launcher Config file not found: " +
                e,
            );
            return;
          } else {
            if (t instanceof Error) {
              tb.backup(Date.now());
              alert(
                "Error reading config file\n" +
                  t.message +
                  "\n" +
                  "A copy of your config was saved in " +
                  tb.toolboxFolder.fsName,
              );
              return;
            }
          }
        } else {
          e = tb.defaultConfigPath;
          t = tb.readFile(e);
          if (t === null) {
            return;
          } else {
            if (t instanceof Error) {
              tb.backup(Date.now());
              alert(
                "Error reading config file\n" +
                  t.message +
                  "\n" +
                  "A copy of your config was saved in " +
                  tb.toolboxFolder.fsName,
              );
              return;
            }
          }
        }
        try {
          t = JSON.parse(t);
        } catch (e) {
          tb.backup(Date.now());
          alert(
            "Error parsing Tool Launcher config file\n" +
              e.message +
              " on line " +
              e.line +
              "\n" +
              "A copy of your config was saved in " +
              tb.toolboxFolder.fsName,
            "Error",
            true,
          );
          return;
        }
        aeq.extend(tb.config, t);
      }
      function o() {
        tb.tools.folders = {};
        var e = tb.config.folders;
        if (tb.isTrial && tb.config.folders.length > 1) {
          tb.config.folders.splice(1, tb.config.folders.length);
        }
        aeq.forEach(e, tb.loadFolder);
      }
      function u(e, t, r) {
        var o = e.getFiles(r);
        for (var a = 0, s = o.length; a < s; a++) {
          n = o[a];
          if (n instanceof Folder) {
            u(n, t, r);
          } else {
            t.push(n);
          }
        }
      }
      function s(e) {
        return e.replace(a, "");
      }
      function f(e) {
        var r = [];
        aeq.forEach(e, function (e, t) {
          r = r.concat(t);
        });
        return r;
      }
      function l() {
        var t = Folder.appPackage;
        if ($.os.indexOf("Windows") === -1) {
          t = t.parent;
        }
        var o = new Folder(t.fsName + "/Scripts/ScriptUI Panels");
        var i = new Folder(t.fsName + "/Scripts");
        if (o.alias) {
          o = o.resolve() || o;
        }
        if (i.alias) {
          i = i.resolve() || i;
        }
        var r = /jsx(bin)?$/;
        if (o.exists) {
          e = o.getFiles(function (e) {
            return !(e instanceof Folder) && r.test(e.name);
          });
          if (e.length) {
            tb.tools.ae.ScriptUI = "ScriptUI";
            aeq.forEach(e, function (e) {
              var t = decodeURIComponent(e.name);
              var r = {
                cmd: { cmd: t, hide: true, type: "menu" },
                file: e,
                location: tb.tools.ae.ScriptUI,
                name: s(t),
                prefix: "ScriptUI",
                settings: "aescriptSettings",
              };
              var n = e.getRelativeURI(o.parent);
              var i = tb.config.aescriptSettings[n];
              r.relativeURI = n;
              if (i) {
                aeq.extend(true, r, i);
              }
              tb.tools.all.push(tb.newTool(r));
            });
          }
        }
        if (i.exists) {
          e = i.getFiles(function (e) {
            return !(e instanceof Folder) && r.test(e.name);
          });
          if (e.length) {
            if (tb.isTrial) {
              e.splice(tb.trialLimit.folderToolsLimit, e.length);
            }
            tb.tools.ae.Scripts = "Scripts";
            aeq.forEach(e, function (e) {
              var t = {
                cmd: { cmd: e, showInPanel: true, type: "script" },
                file: e,
                location: tb.tools.ae.Scripts,
                name: s(decodeURIComponent(e.name)),
                settings: "aescriptSettings",
              };
              var r = e.getRelativeURI(i.parent);
              var n = tb.config.aescriptSettings[r];
              t.relativeURI = r;
              if (n) {
                aeq.extend(true, t, n);
              }
              tb.tools.all.push(tb.newTool(t));
            });
          }
        }
      }
      tb.writeFile = function (e, t) {
        var r = e instanceof File ? e : new File(e);
        if (!r.exists) {
          var n = new Folder(r.path);
          if (!n.exists) {
            n.create();
          }
        }
        r.encoding = "UTF-8";
        r.open("w");
        var i = r.write(t);
        if (!i && r.error !== "") {
          var o = r.error;
          r.close();
          return new Error(o);
        }
        r.close();
        return i;
      };
      tb.readFile = function (e) {
        t = e instanceof File ? e : new File(e);
        if (t.exists) {
          t.open();
          r = t.read();
          if (r === "" && t.error !== "") {
            var n = t.error;
            t.close();
            return new Error(n);
          }
          t.close();
          return r;
        }
        return null;
      };
      var r = /\.js(x(bin)?)?$/;
      var n = /^\(.*\)$/;
      tb.jsxFileFilter = function (e) {
        var t = function (e) {
          if (e instanceof Folder) {
            return !n.test(e.name);
          }
          return r.test(e.name);
        };
        if (e || $.os.indexOf("Windows") === -1) {
          return t;
        }
        return "Script:*.jsx;*.jsxbin;*.js";
      };
      var i = /\.ffx$/;
      tb.ffxFileFilter = function (e) {
        var t = function (e) {
          if (e instanceof Folder) {
            return true;
          }
          return i.test(e.name);
        };
        if (e || $.os.indexOf("Windows") === -1) {
          return t;
        }
        return "Animation preset:*.ffx";
      };
      tb.loadFolder = function (e) {
        var i = new Folder(e);
        if (i.exists) {
          var t = [];
          u(i, t, tb.jsxFileFilter(true));
          var r = (tb.tools.folders[i.fsName] = i.fsName);
          if (tb.isTrial) {
            t.splice(tb.trialLimit.folderToolsLimit, t.length);
          }
          aeq.forEach(t, function (e) {
            var t = {
              cmd: { cmd: e, showInPanel: true, type: "script" },
              file: e,
              location: i.fsName,
              name: s(decodeURIComponent(e.name)),
              settings: "scriptSettings",
            };
            var r = e.getRelativeURI(i.parent);
            var n = tb.config.scriptSettings[r];
            t.relativeURI = r;
            if (n) {
              aeq.extend(true, t, n);
            }
            tb.tools.all.push(tb.newTool(t));
          });
        }
      };
      var a = /\.js(x(bin)?|on)$/;
      tb.PrettyError = function (e, t) {
        this.title = e;
        this.message = t;
      };
      tb.PrettyError.prototype = {
        alert: function () {
          alert(this.title + "\n" + this.message, this.title, true);
        },
        show: function () {
          this.alert();
        },
      };
      tb.update = {
        check: function (e) {
          return tb.update.checkForUpdate({
            contactInfo: tb.script.supportEmail,
            name: e,
            updatepath:
              "/download/scripts/" + escape(tb.script.name) + "/" + e + ".xml",
            version: tb.script.version,
          });
        },
        checkAll: function () {
          var e = {
            contactInfo: tb.script.supportEmail,
            name: tb.script.name,
            updatepath: tb.script.updateURL,
            version: tb.script.version,
          };
          var t = tb.update.getAescriptUpdateInfo(e);
          if (!t) {
            alert("Could not load version information");
            return;
          }
          if (t instanceof Error) {
            alert(
              "Error looking for update:\n" +
                t.message +
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
          if (t === true) {
            alert("already up-to-date");
            return;
          }
          tb.update.promptForUpdate(t);
        },
        checkForUpdate: function () {
          var e = {
            contactInfo: tb.script.supportEmail,
            name: tb.script.name,
            updatepath: tb.script.updateURL,
            version: tb.script.version,
          };
          var t = tb.update.getAescriptUpdateInfo(e);
          if (!t || t instanceof Error || t === true) {
            return false;
          }
          return t;
        },
        download: function (e) {
          var t = tb.script.updateHost;
          if (e.indexOf(t) > -1) {
            e = e.substring(e.indexOf(t) + t.length);
          }
          var r = "";
          var n = new Socket();
          if (n.open(t + ":80")) {
            n.writeln("GET " + e + " HTTP/1.0\nHost: " + t + "\n");
            r = n.read(999999);
          }
          n.close();
          var i = r.substring(0, r.indexOf("\n"));
          var o = /^(?:HTTP|http)\/(?:1|2)\.\d (\d{3} .+)$/;
          var a = i.match(o);
          if (a === null) {
            return new Error("No internet");
          }
          if (a[1].toUpperCase() !== "200 OK") {
            return new Error(a[1]);
          }
          return r.substring(r.indexOf("\n\n") + 2);
        },
        getAescriptUpdateInfo: function (e) {
          var t = tb.update.download(e.updatepath);
          if (t instanceof Error) {
            return t;
          }
          if (t === "" || t.indexOf("data") === -1) {
            return false;
          }
          var r = JSON.parse(t);
          if (r.status !== "ok") {
            return false;
          }
          var n = tb.update.getChangelog(r, e);
          if (n === false) {
            return false;
          }
          if (n === "") {
            return true;
          }
          r.data.changelog = n;
          return r;
        },
        getChangelog: function (e, t) {
          var r = "";
          if (
            !e.data ||
            !e.data["Tool Launcher"] ||
            !e.data["Tool Launcher"].history
          ) {
            return false;
          }
          aeq.forEach(e.data["Tool Launcher"].history, function (e) {
            if (e.version_number > t.version) {
              r += e.version_number + "\n" + e.detail + "\n";
            }
          });
          return r;
        },
        openUpdateInfo: function (e, t) {
          tb.update.promptForUpdate(e);
        },
        promptForUpdate: function (e) {
          var t = confirm(
            "A new version of " +
              tb.script.name +
              " is available!\n" +
              "Changelog:\n" +
              e.data.changelog +
              "\n\n" +
              'Click "yes" to open the website where you can download the update.\n' +
              "Or open " +
              tb.script.downloadURL +
              " in your browser to update later.",
          );
          if (t) {
            aeq.command.openURL(tb.script.downloadURL);
          }
        },
      };
      e();
    })();
    (function (tbAeq) {
      var aeq = tbAeq;
      var PrettyError = tb.PrettyError;
      tbAeq.extend(tb, {
        doCmd: function (e) {
          return tb.doType[e.type.toLowerCase()](e.cmd);
        },
        getCmd: function (e, t) {
          var r = tb.cmdName(t);
          var n = e[r];
          if (n === undefined) {
            r = "cmd";
            n = e[r];
          }
          if (n !== undefined && n.type === "") {
            return new tb.PrettyError(
              "Command does not have a type",
              e.name + " does not have a type for " + r,
            );
          }
          if (n === undefined) {
            if (r === "cmd") {
              return new tb.PrettyError(
                "Command not found",
                e.name +
                  " does not have a default command. " +
                  "try using one or more modifier keys (control, alt, shift)",
              );
            }
          }
          return n;
        },
        run: function (e, t) {
          var r = tb.getCmd(e, t);
          if (r instanceof tb.PrettyError) {
            return r;
          }
          return tb.doCmd(r);
        },
      });
      tb.initRun = function () {
        for (var i = 0; i < tb.settings.libraries.length; i += 1) {
          libFile = new File(tb.settings.libraries[i]);
          if (libFile.exists) {
            try {
              $.evalFile(libFile);
            } catch (e) {
              tb.ui.u.error(e);
            }
          }
        }
        i = libFile = undefined;
        tb.doType = {
          "animation preset": function (t) {
            if (aeq.isString(t) && aeq.isMac && t.length > 1001) {
              return new PrettyError("File path too long", t);
            }
            var e = tbAeq.getActiveComp();
            if (e === null) {
              alert(
                "No Composition selected!\nPlease select a composition first",
              );
              return;
            }
            if (!e.selectedLayers.length) {
              alert(
                "No layers selected!\nPlease select one or more layers to apply the animation preset to",
              );
              return;
            }
            t = new File(t);
            if (t.exists) {
              app.beginUndoGroup("Apply preset " + t.name);
              tbAeq.forEach(e.selectedLayers, function (e) {
                e.applyPreset(t);
              });
              app.endUndoGroup();
            } else {
              return new PrettyError("File not found", t.fsName + " not found");
            }
          },
          effect: function (r) {
            var e = tbAeq.getActiveComp();
            if (e === null) {
              alert(
                "No Composition selected!\nPlease select a composition first",
              );
              return;
            }
            if (!e.selectedLayers.length) {
              alert(
                "No layers selected!\nPlease select one or more layers to apply the effect to",
              );
              return;
            }
            app.beginUndoGroup("Add effect " + r);
            tbAeq.forEach(e.selectedLayers, function (e) {
              var t = e.property("ADBE Effect Parade");
              if (t !== null && t.canAddProperty(r)) {
                t.addProperty(r);
              }
            });
            app.endUndoGroup();
          },
          expression: function (t) {
            var e = tbAeq.getActiveComp();
            if (e) {
              var r = e.selectedProperties;
              app.beginUndoGroup("Apply Expression");
              tbAeq.forEach(r, function (e) {
                if (e.canSetExpression) {
                  e.expression = t;
                }
              });
              app.endUndoGroup();
            }
          },
          javascript: function (cmd) {
            try {
              ret = eval(cmd);
            } catch (e) {
              return e;
            }
            return ret;
          },
          menu: function (e) {
            var t = app.findMenuCommandId(e);
            if (t) {
              app.executeCommand(t);
            } else {
              return new tb.PrettyError(
                "Menu Command not found",
                'Could not find a menu command with the name "' + e + '"',
              );
            }
          },
          os: function (e) {
            system.callSystem(e);
          },
          script: function (e) {
            if (aeq.isString(e) && aeq.isMac && e.length > 1001) {
              return new PrettyError("File path too long", e);
            }
            try {
              e = new File(e);
              if (e.exists) {
                Folder.current = e.parent;
                n = $.evalFile(e);
              } else {
                n = new PrettyError("File not found", e.fsName + " not found");
              }
            } catch (e) {
              return e;
            }
            return n;
          },
        };
      };
    })(aeq);
    tb.initRun();
    return tb;
  })();
  (function () {
    function i() {
      for (var e = r.children.length - 1; e >= 0; e--) {
        r.remove(r.children[e]);
      }
      t();
      o();
    }
    function e() {
      var e =
        "alignment spacing orientation enabled helpTip minimumSize preferredSize text visible";
      e = e.split(" ");
      for (var t = 0; t < e.length; t += 1) {
        n[e[t]] = r[e[t]];
      }
    }
    function t() {
      for (var e in n) {
        if (n.hasOwnProperty(e)) {
          r[e] = n[e];
        }
      }
    }
    function o() {
      r.onResize = r.onResize = undefined;
      r.onMove = r.onMoving = undefined;
      r.onShow = r.onClose = undefined;
      r.onActivate = r.onDeactivate = undefined;
      r.onDraw = r.onShortcutKey = undefined;
    }
    function a(e) {
      return tb.doType[e.type.toLowerCase()];
    }
    var tb = toolbox;
    var r = thisObj;
    var n = {};
    e();
    r.loadCmd = function (e) {
      i();
      var t = a(e).call(r, e.cmd);
      if (r.onResize) {
        r.onResize();
      }
      if (t instanceof Error) {
        return t;
      }
    };
    if (tb.settings.updateOnLaunch) {
      var s = tb.update.check("tl_panel");
      if (s !== false) {
        var u = r.add(
          "button{text:\'Update Available\',alignment: [\'fill\', \'fill\']}",
        );
        u.onClick = function () {
          tb.update.openUpdateInfo(s, $.fileName);
        };
        r.layout.layout(true);
      }
    }
  })();
})(this);
