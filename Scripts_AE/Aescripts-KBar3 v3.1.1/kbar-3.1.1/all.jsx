/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

_kbar = function () {
  var aeq = (function () {
    var aeq = function (selector, context) {
      if (aeq.isNullOrUndefined(selector)) {
        return selector;
      }
      if (aeq.isAeq(selector)) {
        result = selector;
      } else if (aeq.isString(selector)) {
        result = aeq.select(selector, context);
      } else if (aeq.isArray(selector)) {
        result = aeq.arrayEx(selector);
      } else if (aeq.isApp(selector)) {
        result = aeq.app;
      } else if (aeq.isComp(selector)) {
        result = new aeq.Comp(selector);
      } else if (aeq.isLayer(selector)) {
        result = new aeq.Layer(selector);
      } else {
        if (aeq.isProperty(selector)) {
          result = new aeq.Property(selector);
        }
      }
      result.aeq = true;
      return result;
    };
    aeq.version = "0.5.0";
    aeq.thisObj = this;
    if (typeof module === "object") {
      module.exports = aeq;
    }
    aeq.setDefault = function (value, defaultVal) {
      return typeof value == "undefined" ? defaultVal : value;
    };
    var setDefault = aeq.setDefault;
    aeq.extend = function () {
      var target = setDefault(arguments[0], {});
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = setDefault(arguments[i], {});
        i++;
      }
      if (typeof target !== "object" && !aeq.isFunction(target)) {
        target = {};
      }
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        if ((options = arguments[i]) !== null) {
          for (var name in options) {
            src = target[name];
            copy = options[name];
            if (target === copy) {
              continue;
            }
            if (
              deep &&
              copy &&
              (aeq.isPlainObject(copy) || (copyIsArray = aeq.isArray(copy)))
            ) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && aeq.isArray(src) ? src : [];
              } else {
                clone = src && aeq.isPlainObject(src) ? src : {};
              }
              target[name] = aeq.extend(deep, clone, copy);
            } else {
              if (copy !== undefined) {
                try {
                  target[name] = copy;
                } catch (e) {
                  continue;
                }
              }
            }
          }
        }
      }
      return target;
    };
    aeq.forEach = function (obj, callback, fromIndex) {
      if (obj && Object.prototype.toString.call(obj) === "[object Array]") {
        length = obj.length;
        i = fromIndex === undefined ? 0 : fromIndex;
        for (; i < length; i++) {
          if (callback(obj[i], i, obj) === false) {
            break;
          }
        }
      } else {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (callback(i, obj[i], obj) === false) {
              break;
            }
          }
        }
      }
      return obj;
    };
    aeq.filter = function (obj, callback) {
      var filteredArr = [];
      if (obj && Object.prototype.toString.call(obj) === "[object Array]") {
        length = obj.length;
        i = 0;
        for (; i < length; i++) {
          if (callback(obj[i], i, obj)) {
            filteredArr.push(obj[i]);
          }
        }
      } else {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (callback(i, obj[i], obj)) {
              filteredArr.push(obj[i]);
            }
          }
        }
      }
      return filteredArr;
    };
    aeq = (function (aeq) {
      aeq.extend({
        assertIsEmpty: function (o, err) {
          if (aeq.isEmpty(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsFalse: function (o, err) {
          if (o === false) {
            return true;
          }
          throw new Error(err);
        },
        assertIsNotEmpty: function (o, err) {
          if (!aeq.isEmpty(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsNotNull: function (o, err) {
          if (!aeq.isNullOrUndefined(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsNull: function (o, err) {
          if (aeq.isNullOrUndefined(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsTrue: function (o, err) {
          if (o === true) {
            return true;
          }
          throw new Error(err);
        },
      });
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function getAttr(object, attributeName) {
        if (object[attributeName] instanceof Function) {
          return object[attributeName]();
        }
        return object[attributeName];
      }
      function setAttr(object, attributeName, newValue) {
        attrSetters = attr.setters[object.toString()];
        if (attrSetters !== undefined) {
          setter = attrSetters[attributeName];
          if (setter !== undefined) {
            attributeName = setter;
          }
        }
        if (object[attributeName] instanceof Function) {
          object[attributeName](newValue);
        } else {
          object[attributeName] = newValue;
        }
        return object;
      }
      aeq.attr = function (array, attributeName, newValue) {
        if (arguments.length === 1) {
          throw new Error("Only one argument given to attr, must be 2 or 3");
        } else if (arguments.length === 2) {
          if (array[0] !== undefined && array[0] !== null) {
            return getAttr(array[0], attributeName);
          }
          return undefined;
        } else {
          for (i = 0, il = array.length; i < il; i++) {
            setAttr(array[i], attributeName, newValue);
          }
          return array;
        }
      };
      var attr = { setters: { "[object Property]": { value: "setValue" } } };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function normalizeProperty(propertyParent, property) {
        switch (property.name) {
          case "X Position":
          case "Y Position":
          case "Z Position":
            property = propertyParent.property("Position");
            property.dimensionsSeparated = true;
            return property.propertyGroup().property(property.name);
          default:
            return property;
        }
      }
      aeq.extend({
        framesToTime: function (frames, frameRate) {
          return frames / frameRate;
        },
        getActiveComposition: function () {
          var activeItem = app.project.activeItem;
          if (aeq.isComp(activeItem)) {
            return activeItem;
          }
          return null;
        },
        getChildren: function (obj) {
          if (aeq.isComp(obj)) {
            return aeq.normalizeCollection(obj.layers);
          }
          if (aeq.isLayer(obj) || aeq.isPropertyGroup(obj)) {
            return aeq.getPropertyChildren(obj, {});
          }
          if (aeq.isArray(obj)) {
            ret = aeq.arrayEx();
            aeq.forEach(obj, function (item) {
              ret.push.apply(ret, aeq.getChildren(item));
            });
            return ret;
          }
        },
        getComposition: function (name) {
          var length = app.project.items.length;
          for (var i = 1; i <= length; i += 1) {
            var item = app.project.item(i);
            if (item.name === name && aeq.isComp(item)) {
              return item;
            }
          }
          return null;
        },
        getCompositions: function (folder, deep) {
          var items = aeq.getItems(folder, deep);
          return items.filter(aeq.isComp);
        },
        getEffects: function (layers) {
          aeq.assertIsNotNull(layers, "layers is null");
          if (aeq.isLayer(layers)) {
            layers = [layers];
          }
          var arr = [];
          var len = layers.length;
          for (var l = 0; l < len; l += 1) {
            effects = layers[l].property("ADBE Effect Parade");
            if (effects === null) {
              continue;
            }
            effectslen = effects.numProperties;
            for (var e = 1; e <= effectslen; e += 1) {
              arr.push(effects.property(e));
            }
          }
          return aeq.arrayEx(arr);
        },
        getItemInComps: function (item) {
          var layers = [];
          aeq.forEach(item.usedIn, function (comp) {
            aeq.forEachLayer(comp, function (layer) {
              if (layer.source === item) {
                layers.push(layer);
              }
            });
          });
          return aeq.arrayEx(layers);
        },
        getItems: function (folder, deep) {
          if (folder === undefined) {
            return aeq.normalizeCollection(app.project.items);
          }
          deep = setDefault(deep, true);
          folder = aeq.project.getFolder(folder);
          if (folder === null) {
            return aeq.arrayEx();
          }
          if (deep) {
            return aeq.getItemsDeep(folder);
          }
          return aeq.normalizeCollection(folder.items);
        },
        getItemsDeep: function (folder, returnArrayEx) {
          var items = [];
          var len = folder.items.length;
          for (var i = 1; i <= len; i += 1) {
            item = folder.items[i];
            if (aeq.isFolderItem(item)) {
              items.push.apply(items, aeq.getItemsDeep(item, false));
            }
            items.push(item);
          }
          if (returnArrayEx === false) {
            return items;
          }
          return aeq.arrayEx(items);
        },
        getKeys: function (property) {
          var arr = [];
          if (aeq.isArray(property)) {
            for (i = 0, len = property.length; i < len; i++) {
              arr = arr.concat(aeq.getKeys(property[i]));
            }
            return aeq.arrayEx(arr);
          }
          for (i = 1, len = property.numKeys; i <= len; i++) {
            arr.push(aeq.Key(property, i));
          }
          return aeq.arrayEx(arr);
        },
        getLayers: function (comps) {
          aeq.assertIsNotNull(comps, "comps is null");
          var arr = [];
          if (aeq.isComp(comps)) {
            comps = [comps];
          }
          for (var c = 0; c < comps.length; c += 1) {
            var comp = comps[c];
            arr = arr.concat(aeq.normalizeCollection(comp.layers));
          }
          return aeq.arrayEx(arr);
        },
        getMarkerGroup: function (obj) {
          if (!obj) {
            obj = aeq.getActiveComp();
          }
          if (aeq.isLayer(obj)) {
            return obj.property("ADBE Marker");
          }
          if (aeq.isComp(obj) && aeq.app.version >= 14) {
            return obj.markerProperty;
          }
          return null;
        },
        getProperties: function (layers, options) {
          aeq.assertIsNotNull(layers, "layer is null");
          options = setDefault(options, { separate: true });
          var arr = [];
          for (var l = 0; l < layers.length; l += 1) {
            var layer = layers[l];
            arr = arr.concat(aeq.getPropertyChildren(layer, options));
          }
          return aeq.arrayEx(arr);
        },
        getPropertyChildren: function (propertyParent, options) {
          var arr = [];
          var len = propertyParent.numProperties;
          options = setDefault(options, { separate: false });
          for (var i = 1; i <= len; i += 1) {
            property = propertyParent.property(i);
            switch (property.propertyType) {
              case PropertyType.PROPERTY:
                if (options.separate) {
                  property = normalizeProperty(propertyParent, property);
                }
                if (options.props !== false) {
                  arr.push(property);
                }
                break;
              case PropertyType.INDEXED_GROUP:
              case PropertyType.NAMED_GROUP:
                if (options.groups === true) {
                  arr.push(property);
                }
                arr = arr.concat(aeq.getPropertyChildren(property, options));
                break;
              default:
                break;
            }
          }
          return arr;
        },
        getSelectedLayers: function (comp) {
          if (!aeq.isComp(comp)) {
            comp = aeq.getActiveComp();
          }
          if (comp) {
            return aeq.arrayEx(comp.selectedLayers);
          }
          return aeq.arrayEx();
        },
        getSelectedLayersOrAll: function (comp) {
          if (!aeq.isComp(comp)) {
            comp = aeq.getActiveComp();
            if (comp === null) {
              return aeq.arrayEx();
            }
          }
          var layers = aeq.getSelectedLayers(comp);
          if (layers.length === 0) {
            return aeq.getLayers(comp);
          }
          return layers;
        },
        getSelectedProperties: function (obj) {
          if (!obj) {
            obj = aeq.getActiveComp();
          }
          if (obj) {
            return aeq.arrayEx(obj.selectedProperties);
          }
          return aeq.arrayEx();
        },
        normalizeCollection: function (collection) {
          var ret = Array.prototype.slice.call(collection, 1);
          var len = collection.length;
          if (len !== 0) {
            ret.push(collection[len]);
          }
          return aeq.arrayEx(ret);
        },
        timeToFrames: function (time, frameRate) {
          return time * frameRate;
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        forEachComp: function (callback) {
          aeq.forEach(aeq.getCompositions(), callback);
        },
        forEachEffect: function (obj, callback) {
          if (aeq.isLayer(obj)) {
            effects = obj.property("ADBE Effect Parade");
            length = effects.numProperties;
            for (var i = 1; i <= length; i += 1) {
              if (callback(effects.property(i), i, effects) === false) {
                break;
              }
            }
          } else if (aeq.isComp(obj)) {
            aeq.forEachLayer(obj, function (layer) {
              aeq.forEachEffect(layer, callback);
            });
          } else if (aeq.isArray(obj)) {
            aeq.forEach(obj, function (obj) {
              aeq.forEachEffect(obj, callback);
            });
          } else {
            if (aeq.isFunction(obj)) {
              callback = obj;
              aeq.forEachLayer(function (layer) {
                aeq.forEachEffect(layer, callback);
              });
            }
          }
          return aeq;
        },
        forEachItem: function (callback) {
          var project = app.project;
          var items = project.items;
          var length = items.length;
          for (var i = 1; i <= length; i += 1) {
            if (callback(items[i], i, project) === false) {
              break;
            }
          }
          return aeq;
        },
        forEachLayer: function (obj, callback) {
          if (aeq.isComp(obj)) {
            var length = obj.numLayers;
            var i = 1;
            for (; i <= length; i++) {
              if (callback(obj.layer(i), i, obj) === false) {
                break;
              }
            }
          } else if (aeq.isArray(obj)) {
            aeq.forEach(obj, function (obj) {
              aeq.forEachLayer(obj, callback);
            });
          } else {
            if (aeq.isFunction(obj)) {
              callback = obj;
              aeq.forEachComp(function (comp) {
                aeq.forEachLayer(comp, callback);
              });
            }
          }
          return aeq;
        },
        forEachOutputModule: function (callback) {
          aeq.forEachRenderQueueItem(function (item) {
            var length = item.outputModules.length;
            for (var i = 1; i <= length; i += 1) {
              if (callback(item.outputModules[i], i, item) === false) {
                break;
              }
            }
          });
          return aeq;
        },
        forEachProperty: function (obj, callback) {
          if (aeq.isLayer(obj) || aeq.isPropertyGroup(obj)) {
            var properties = aeq.getPropertyChildren(obj, {});
            aeq.forEach(properties, callback);
          } else if (aeq.isComp(obj)) {
            aeq.forEachLayer(obj, function (layer) {
              var properties = aeq.getPropertyChildren(layer, {});
              aeq.forEach(properties, callback);
            });
          } else if (aeq.isArray(obj)) {
            aeq.forEach(obj, function (obj) {
              aeq.forEachProperty(obj, callback);
            });
          } else {
            if (aeq.isFunction(obj)) {
              callback = obj;
              aeq.forEachLayer(function (layer) {
                aeq.forEachProperty(layer, callback);
              });
            }
          }
          return aeq;
        },
        forEachRenderQueueItem: function (callback) {
          var renderQueue = app.project.renderQueue;
          var renderQueueItems = renderQueue.items;
          var length = renderQueueItems.length;
          for (var i = 1; i <= length; i += 1) {
            if (callback(renderQueueItems[i], i, renderQueue) === false) {
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function hasAllAttributes(obj, attributes, not) {
        for (var attribute in attributes) {
          if (!attributes.hasOwnProperty(attribute)) {
            continue;
          }
          attributeValue = attributes[attribute];
          if (!obj.hasOwnProperty(attribute)) {
            throw new Error(
              "The attribute " +
                attribute +
                " does not exist on a " +
                typeof obj,
            );
          }
          var isSame = compare(attributeValue, obj[attribute]);
          if ((isSame && not) || (!isSame && not === false)) {
            return false;
          }
        }
        return true;
      }
      function compare(value, attribute) {
        if (value.type === "Array") {
          return valueInArray(value, attribute);
        } else {
          if (value.type === "RegExp") {
            return value.value.test(attribute);
          }
        }
        return value.value.toString() === attribute.toString();
      }
      function valueInArray(value, attribute) {
        for (var i = 0, il = value.value.length; i < il; i++) {
          if (compare(value.value[i], attribute)) {
            return true;
          }
        }
        return false;
      }
      aeq.select = function (selector, context) {
        function filterResults(arr) {
          if (part.props || part.pseudo) {
            return arr.filter(filter);
          }
          return arr;
        }
        function filter(obj) {
          var ret = true;
          if (part.props !== null) {
            if (!hasAllAttributes(obj, part.props, false)) {
              return false;
            }
          }
          if (!part.pseudo) {
            return true;
          }
          len = part.pseudo.length;
          for (var i = 0; i < len; i += 1) {
            pseudo = part.pseudo[i];
            if (pseudo.type === "not" || pseudo.type === "isnot") {
              ret = hasAllAttributes(obj, pseudo.props, true);
            } else {
              if (pseudo.type === "is" || pseudo.type === "has") {
                ret = hasAllAttributes(obj, pseudo.props, false);
              }
            }
            if (ret === false) {
              return false;
            }
          }
          return true;
        }
        var results = [];
        var parsedSelector = cssselector.parse(selector);
        var parts = parsedSelector;
        if (context !== undefined) {
          if (aeq.isString(context)) {
            results = aeq.select(context);
          } else if (aeq.isArray(context)) {
            results = context;
          } else {
            results = [context];
          }
        }
        while (parts.length > 0) {
          part = parts[0];
          var unshifted = false;
          switch (part.type) {
            case "activecomp":
              results = filterResults(
                aeq.arrayEx([aeq.getActiveComposition()]),
              );
              results.type = "comp";
              break;
            case "composition":
            case "comp":
              results = filterResults(aeq.getCompositions());
              results.type = "comp";
              break;
            case "layer":
              if (results.type === "comp" || aeq.isComp(results[0])) {
                results = filterResults(aeq.getLayers(results));
                results.type = "layer";
              } else {
                if (results.type !== "comp") {
                  parts.unshift({ type: "comp" });
                  unshifted = true;
                }
              }
              break;
            case "propertygroup":
            case "propgrp":
            case "propgroup":
              if (
                results.type === "layer" ||
                results.type === "propertygroup" ||
                aeq.isLayer(results[0]) ||
                aeq.isPropertyGroup(results[0])
              ) {
                results = filterResults(
                  aeq.getProperties(results, {
                    groups: true,
                    props: false,
                    separate: false,
                  }),
                );
                results.type = "propertygroup";
              } else {
                if (results.type !== "layer") {
                  parts.unshift({ type: "layer" });
                  unshifted = true;
                }
              }
              break;
            case "property":
            case "prop":
              if (
                results.type === "layer" ||
                results.type === "propertygroup" ||
                aeq.isLayer(results[0]) ||
                aeq.isPropertyGroup(results[0])
              ) {
                results = filterResults(
                  aeq.getProperties(results, { separate: false }),
                );
                results.type = "property";
              } else {
                if (results.type !== "layer") {
                  parts.unshift({ type: "layer" });
                  unshifted = true;
                }
              }
              break;
            case "effect":
              if (results.type === "layer" || aeq.isLayer(results[0])) {
                results = filterResults(aeq.getEffects(results));
                results.type = "effect";
              } else {
                if (results.type !== "layer") {
                  parts.unshift({ type: "layer" });
                  unshifted = true;
                }
              }
              break;
            case "key":
            case "keys":
              if (results.type === "property" || aeq.isProperty(results[0])) {
                results = filterResults(aeq.getKeys(results));
                results.type = "key";
              } else {
                if (results.type !== "property") {
                  parts.unshift({ type: "property" });
                  unshifted = true;
                }
              }
              break;
            case "item":
              results = filterResults(aeq.getItems());
              results.type = "item";
              break;
            default:
              throw new Error("Unrecognized token " + part.type);
          }
          if (!unshifted) {
            parts.shift();
          }
        }
        return aeq.arrayEx(results);
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        isAVLayer: function (o) {
          return o instanceof AVLayer;
        },
        isAeq: function (o) {
          return o instanceof Object && o.isAeq === true;
        },
        isApp: function (o) {
          return o instanceof Application;
        },
        isArray: function (o) {
          return o instanceof Array;
        },
        isBoolean: function (o) {
          return typeof o === "boolean";
        },
        isCameraLayer: function (o) {
          return o instanceof CameraLayer;
        },
        isComp: function (o) {
          return o instanceof CompItem;
        },
        isEmpty: function (o) {
          return o.length === undefined || o.length === 0;
        },
        isFile: function (o) {
          return o instanceof File;
        },
        isFolder: function (o) {
          return o instanceof Folder;
        },
        isFolderItem: function (o) {
          return o instanceof FolderItem;
        },
        isFootageItem: function (o) {
          return o instanceof FootageItem;
        },
        isFunc: function (o) {
          return o instanceof Function;
        },
        isLayer: function (o) {
          return (
            aeq.isAVLayer(o) ||
            aeq.isShapeLayer(o) ||
            aeq.isTextLayer(o) ||
            aeq.isCamera(o) ||
            aeq.isLight(o)
          );
        },
        isLightLayer: function (o) {
          return o instanceof LightLayer;
        },
        isMaskPropertyGroup: function (o) {
          return o instanceof MaskPropertyGroup;
        },
        isNullOrUndefined: function (o) {
          return o == null;
        },
        isNumber: function (o) {
          return typeof o === "number";
        },
        isObject: function (o) {
          return o instanceof Object;
        },
        isPanel: function (o) {
          return o instanceof Panel;
        },
        isPlainObject: function (obj) {
          if (obj === undefined || obj === null) {
            return false;
          }
          if (obj.toString() !== "[object Object]") {
            return false;
          }
          if (
            obj.constructor &&
            !obj.constructor.prototype.hasOwnProperty("isPrototypeOf")
          ) {
            return false;
          }
          return true;
        },
        isPrecomp: function (o) {
          if (!aeq.isLayer(o)) {
            return false;
          }
          return aeq.isComp(o.source);
        },
        isProperty: function (o) {
          return o instanceof Property;
        },
        isPropertyGroup: function (o) {
          return o instanceof PropertyGroup;
        },
        isShapeLayer: function (o) {
          return o instanceof ShapeLayer;
        },
        isString: function (o) {
          return typeof o === "string";
        },
        isTextLayer: function (o) {
          return o instanceof TextLayer;
        },
        isWindow: function (o) {
          return o instanceof Window;
        },
        reflect: function (obj) {
          var str = [];
          for (var m in obj) {
            if (obj.hasOwnProperty(m)) {
              str.push(obj[m].constructor.name + " " + m + "=" + obj[m]);
            }
          }
          return str.join();
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.error = function (err, args) {
        var callingFunction = /\s*function\s*([^(]*)/i.exec(err.source);
        callingFunction =
          callingFunction !== null && callingFunction[1] !== ""
            ? callingFunction[1]
            : "anonymous";
        alert(
          err.toString() +
            "\n" +
            "Script File: " +
            File.decode(err.fileName).replace(/^.*[\\|\/]/, "") +
            "\nFunction: " +
            args ===
            undefined
            ? callingFunction
            : args.callee.name + (args === undefined) || args.length === 0
              ? ""
              : "\nArguments: " +
                Array.prototype.toString.call(args) +
                "\nError on Line: " +
                err.line.toString(),
        );
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.getModifiers = function () {
        return {
          alt: ScriptUI.environment.keyboardState.altKey,
          ctrl: ScriptUI.environment.keyboardState.ctrlKey,
          meta: ScriptUI.environment.keyboardState.metaKey,
          shift: ScriptUI.environment.keyboardState.shiftKey,
        };
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        createResourceFiles: function (resources, folder, extension) {
          if (!aeq.app.securityPrefEnabled()) {
            return false;
          }
          folder = aeq.getFolderObject(folder);
          extension = setDefault(extension, "");
          if (extension !== "" && extension.charAt(0) !== ".") {
            extension = "." + extension;
          }
          aeq.file.ensureFolderExists(folder);
          if (!folder.exists) {
            throw new Error(
              "Could not create resource folder: " + folder.fsname,
            );
          }
          var resourceFiles = {};
          aeq.forEach(resources, function (name, contents) {
            var filePath = aeq.file.joinPath(folder.fsName, name + extension);
            var file = new File(filePath);
            resourceFiles[name] = file;
            if (!file.exists || contents.length !== file.length) {
              file.encoding = "BINARY";
              file.open("w");
              var success = file.write(contents);
              if (!success) {
                if (file.error === "") {
                  resourceFiles[name] = null;
                } else {
                  resourceFiles[name] = new Error(
                    file.error,
                    file.fsName,
                    undefined,
                  );
                }
              }
              file.close();
            }
          });
          return resourceFiles;
        },
        getBinaryString: function (filePath) {
          var file = aeq.getFileObject(filePath);
          file.encoding = "BINARY";
          file.open("r");
          var fileData = file.read();
          file.close();
          var binaryString = fileData.toSource();
          binaryString = binaryString.replace(/^\(new String\("/, "");
          binaryString = binaryString.replace(/"\)\)$/, "");
          return binaryString;
        },
      });
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        getSystemInfo: function () {
          return $.os + " AE " + app.version + "/" + app.isoLanguage;
        },
        isMac: $.os.indexOf("Windows") === -1,
        isWindows: $.os.indexOf("Windows") !== -1,
      });
      aeq.isWin = aeq.isWindows;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        createUndoGroup: function (name, callback, args) {
          app.beginUndoGroup(name);
          if (!aeq.isArray(args)) {
            args = [args];
          }
          var value = callback.apply(null, args);
          app.endUndoGroup();
          return value;
        },
      });
      aeq.undoGroup = aeq.createUndoGroup;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        propertyType: function (property) {
          return aeq.valueInObject(
            property.propertyType || property,
            PropertyType,
          );
        },
        valueInObject: function (value, obj) {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (value === obj[key]) {
                return key;
              }
            }
          }
          return undefined;
        },
      });
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
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
            var aepFile = aeq.app.getAEP();
            if (!aepFile) {
              return null;
            }
            return aeq.getFolder(aepFile.path);
          },
          getAEPName: function () {
            var aepFile = aeq.app.getAEP();
            if (!aepFile) {
              return null;
            }
            return aeq.file.stripExtension(aepFile.displayName);
          },
          getPresetsPaths: function () {
            var appVersion = aeq.app.version;
            var versionPrettyName = "";
            if (parseInt(appVersion) === 11) {
              versionPrettyName = "CS6";
            } else if (parseInt(appVersion) === 12) {
              versionPrettyName = "CC";
            } else if (appVersion >= 13 && appVersion < 13.5) {
              versionPrettyName = "CC 2014";
            } else if (appVersion >= 13.5 && appVersion < 14) {
              versionPrettyName = "CC 2015";
            } else {
              if (appVersion >= 14) {
                versionPrettyName = "CC 2017";
              }
            }
            return [
              Folder.current.fullName + "/Presets/",
              Folder.myDocuments.fullName +
                "/Adobe/After Effects " +
                versionPrettyName +
                "/User Presets/",
            ];
          },
          getScriptFile: function () {
            return aeq.getFile($.fileName);
          },
          getUserDataFolder: function () {
            return Folder.userData;
          },
          open: function (filePath) {
            var file = aeq.getFile(filePath);
            if (file) {
              return app.open(file);
            }
            return app.open();
          },
          securityPrefEnabled: function () {
            return (
              app.preferences.getPrefAsLong(
                "Main Pref Section",
                "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
              ) === 1
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.command = aeq.extend(
        {},
        {
          call: function (windows, mac, arg) {
            if (aeq.isObject(arguments[0])) {
              var args = arguments[0];
              windows = setDefault(args.win, args.windows);
              mac = setDefault(args.mac, args.osx);
              arg = args.arg;
            }
            var command = mac;
            if (aeq.isWindows) {
              command = windows;
            }
            arg = arg === undefined ? "" : " " + arg;
            return system.callSystem(command + arg);
          },
          copyToClipboard: function (text) {
            aeq.command.call(
              'cmd.exe /c cmd.exe /c "echo ' + text + ' | clip"',
              'echo "' + text + '" | pbcopy',
            );
          },
          extend: aeq.extend,
          openURL: function (URL) {
            try {
              if (URL.match(/^https?:\/\//) === null) {
                URL = "http://" + URL;
              }
              aeq.command.call({
                arg: URL,
                mac: "open",
                win: 'cmd /c "explorer',
              });
            } catch (err) {
              alert("Error in openURL function\n" + err.toString());
            }
          },
          revealFile: function (filePath) {
            if (aeq.isFile(filePath)) {
              filePath = filePath.fsName;
            }
            return aeq.command.call(
              "Explorer /select,",
              "open -R",
              '"' + filePath + '"',
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.comp = aeq.extend(
        {},
        {
          create: function (folder, options) {
            if (!aeq.isFolderItem(folder)) {
              options = setDefault(folder, {});
              folder = setDefault(options.folder, app.project);
            }
            var defaultOptions = {
              duration: 1,
              frameRate: 24,
              height: 1080,
              name: "Comp",
              pixelAspect: 1,
              width: 1920,
            };
            options = aeq.extend(defaultOptions, options);
            return folder.items.addComp(
              options.name,
              options.width,
              options.height,
              options.pixelAspect,
              options.duration,
              options.frameRate,
            );
          },
          extend: aeq.extend,
          getCompInQueue: function (comp, queuedOnly) {
            if (aeq.isNullOrUndefined(queuedOnly)) {
              queuedOnly = true;
            }
            if (queuedOnly) {
              queuedItems = aeq.renderqueue.getQueuedItems();
            } else {
              queuedItems = aeq.renderqueue.getRQItems();
            }
            return aeq.filter(queuedItems, function (item) {
              return item.comp.id === comp.id;
            });
          },
          isInQueue: function (comp) {
            if (!aeq.isComp(comp)) {
              return null;
            }
            var items = aeq.renderqueue.getRQItems();
            return items.some(function (item) {
              return item.comp.id === comp.id;
            });
          },
          isQueued: function (comp) {
            return aeq.comp.getCompInQueue(comp, true).length > 0;
          },
          toString: function () {
            return "[object aeq.comp]";
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.file = aeq.extend(
        {},
        {
          ensureFolderExists: function (folderPath) {
            var folder = aeq.getFolderObject(folderPath);
            if (!folder.exists) {
              folder.create();
            }
            return folder;
          },
          extend: aeq.extend,
          getExtension: function (filePath) {
            var filePathStr = aeq.isFile(filePath) ? filePath.name : filePath;
            return filePathStr.substr(
              filePathStr.lastIndexOf(".") + 1,
              filePathStr.length,
            );
          },
          getFile: function (filePath) {
            var file = aeq.getFileObject(filePath);
            if (!file.exists) {
              return null;
            }
            return file;
          },
          getFileObject: function (filePath) {
            return aeq.isFile(filePath) ? filePath : new File(filePath);
          },
          getFiles: function (folderPath, filter) {
            filter = setDefault(filter, "");
            var folder = aeq.getFolder(folderPath);
            files = folder.getFiles(filter);
            if (files === null || files.length === 0) {
              return null;
            }
            return aeq.arrayEx(files);
          },
          getFolder: function (folderPath) {
            var folder = aeq.getFolderObject(folderPath);
            if (!folder.exists) {
              return null;
            }
            return folder;
          },
          getFolderObject: function (folderPath) {
            return aeq.isFolder(folderPath)
              ? folderPath
              : new Folder(folderPath);
          },
          joinPath: function () {
            var paths = Array.prototype.slice.call(arguments, 0);
            return aeq.file.normalizePath(
              aeq
                .filter(paths, function (p, index) {
                  if (p && typeof p.fsName === "string") {
                    p = p.fsName;
                    paths[index] = p;
                  }
                  if (typeof p !== "string") {
                    throw new TypeError(
                      "Arguments to path.join must be strings, Files or Folders",
                    );
                  }
                  return p;
                })
                .join(aeq.file.pathSeparatorSymbol),
            );
          },
          normalizePath: function (path) {
            var pathIsAbsolute = aeq.file.pathIsAbsolute(path);
            var trailingSlash =
              path.substr(-1) === aeq.file.pathSeparatorSymbol;
            var splitPath = path.split(aeq.file.pathSeparatorSymbol);
            var filteredPath = aeq.filter(splitPath, function (p) {
              return !!p;
            });
            path = aeq.file.normalizePathArray(filteredPath, !pathIsAbsolute);
            path = path.join(aeq.file.pathSeparatorSymbol);
            if (!path && !pathIsAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += aeq.file.pathSeparatorSymbol;
            }
            return pathIsAbsolute ? aeq.file.pathSeparatorSymbol : "" + path;
          },
          normalizePathArray: function (parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else if (last === "..") {
                parts.splice(i, 1);
                up++;
              } else {
                if (up) {
                  parts.splice(i, 1);
                  up--;
                }
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          },
          pathIsAbsolute: function (path) {
            return path.charAt(0) === aeq.file.pathSeparatorSymbol;
          },
          pathSeparatorSymbol: $.os.indexOf("Windows") > -1 ? "\\" : "/",
          readFile: function (filePath, encoding) {
            var file = aeq.getFileObject(filePath);
            encoding = setDefault(encoding, "UTF-8");
            if (file.exists) {
              if (File.isEncodingAvailable(encoding)) {
                file.encoding = encoding;
              }
              file.open();
              contents = file.read();
              file.close();
              return contents;
            }
            return null;
          },
          stripExtension: function (filePath) {
            var filePathStr = aeq.isFile(filePath) ? filePath.name : filePath;
            return filePathStr.substr(0, filePathStr.lastIndexOf("."));
          },
          toString: function () {
            return "[object aeq.file]";
          },
          writeFile: function (filePath, contents, options) {
            var file = aeq.getFileObject(filePath);
            options = aeq.setDefault(options, {});
            if (file.exists && options.overwrite === false) {
              return null;
            }
            if (!file.exists) {
              aeq.file.ensureFolderExists(file.path);
            }
            if (
              !aeq.isNullOrUndefined(options.encoding) &&
              File.isEncodingAvailable(options.encoding)
            ) {
              file.encoding = options.encoding;
            }
            file.open("w");
            var success = file.write(contents);
            file.close();
            if (success) {
              return file;
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.layer = aeq.extend(
        {},
        {
          allChildren: function (parentLayer) {
            var allChildren = [];
            var children = aeq.layer.children(parentLayer);
            aeq.forEach(children, function (layer) {
              allChildren.push(layer);
              allChildren = allChildren.concat(aeq.layer.allChildren(layer));
            });
            return aeq.arrayEx(allChildren);
          },
          children: function (parentLayer) {
            var layers = aeq.getLayers(parentLayer.containingComp);
            return layers.filter(function (layer) {
              return layer.parent === parentLayer;
            });
          },
          extend: aeq.extend,
          parents: function (childLayer) {
            var parents = aeq.arrayEx();
            var layer = childLayer;
            while (layer.parent !== null) {
              parents.push(layer.parent);
              layer = layer.parent;
            }
            return parents;
          },
          relatedLayers: function (root) {
            var parents = aeq.layer.parents(root);
            var children = aeq.layer.allChildren(root);
            var all = parents.push.apply(parents, children);
            return aeq.arrayEx(all);
          },
          setLayerToggles: function (sourceLayer, destLayer) {
            var switches =
              "enabled solo shy quality effectsActive motionBlur adjustmentLayer threeDLayer blendingMode preserveTransparency parent inPoint stretch startTime outPoint label guideLayer name comment autoOrient";
            switches = switches.split(" ");
            aeq.forEach(switches, function (switchName) {
              destLayer[switchName] = sourceLayer[switchName];
            });
          },
          toString: function () {
            return "[object aeq.layer]";
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.project = aeq.extend(
        {},
        {
          extend: aeq.extend,
          findFolder: function (name, parentFolder) {
            var folders = aeq.project.getFolders(parentFolder);
            var folder = aeq.filter(folders, function (folder) {
              return folder.name === name;
            });
            if (folder.length) {
              return folder[0];
            }
            return null;
          },
          getFolder: function (folder, parentFolder) {
            if (aeq.isFolderItem(folder)) {
              return folder;
            }
            if (aeq.isString(folder)) {
              return aeq.project.findFolder(folder, parentFolder);
            }
            return null;
          },
          getFolderOrRoot: function (folder) {
            folder = aeq.project.getFolder(folder);
            if (aeq.isNullOrUndefined(folder)) {
              return app.project.rootFolder;
            }
            return folder;
          },
          getFolders: function (parentFolder) {
            var folders = aeq.getItems(parentFolder);
            return folders.filter(aeq.isFolderItem);
          },
          getFootage: function (parentFolder) {
            var items = aeq.getItems(parentFolder);
            return items.filter(aeq.isFootageItem);
          },
          getOrCreateFolder: function (folder, parentFolder) {
            if (aeq.isNullOrUndefined(parentFolder)) {
              parentFolder = app.project.rootFolder;
            } else {
              parentFolder = aeq.project.getOrCreateFolder(parentFolder);
            }
            var foundFolder = aeq.project.getFolder(folder, parentFolder);
            if (aeq.isNullOrUndefined(foundFolder)) {
              return parentFolder.items.addFolder(folder);
            }
            return foundFolder;
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
          importFile: function (file, folder, options) {
            var proj = app.project;
            var newFile = aeq.getFile(file);
            if (!aeq.isFile(newFile)) {
              throw new Error(file + " is not a valid file!");
            }
            if (aeq.isNullOrUndefined(folder)) {
              folder = app.project.rootFolder;
            } else {
              folder = aeq.project.getOrCreateFolder(folder);
            }
            options = setDefault(options, {});
            var iO = new ImportOptions(newFile);
            if (options.sequence === true) {
              iO.sequence = true;
            }
            try {
              newItem = proj.importFile(iO);
            } catch (e) {
              throw new Error(
                "Can\'t import file " + newFile.name + "\n" + String(e),
              );
            }
            if (newItem.duration * newItem.frameRate === 1) {
              newItem.replace(file);
            }
            newItem.parentFolder = folder;
            newItem.selected = false;
            return newItem;
          },
          importFiles: function (fileArray, folder, options) {
            var importedItems = aeq.arrayEx();
            aeq.forEach(fileArray, function (file) {
              var item = aeq.importFile(file, folder, options);
              importedItems.push(item);
            });
            return importedItems;
          },
          importSequence: function (file, folder) {
            return aeq.importFile(file, folder, { sequence: true });
          },
          moveToFolder: function (items, folder) {
            folder = aeq.project.getFolder(folder);
            if (!aeq.isArray(items)) {
              items = [items];
            }
            aeq.forEach(items, function (item) {
              item.parentFolder = folder;
              item.selected = false;
            });
          },
          quickSave: function () {
            var file = aeq.app.getAEP();
            return app.project.save(file);
          },
          reduceToQueuedComps: function () {
            var queuedComps = aeq.renderqueue.getQueuedComps();
            if (queuedComps.length === 0) {
              return null;
            }
            app.project.reduceProject(queuedComps);
            return queuedComps;
          },
          save: function (path) {
            if (!path) {
              return app.project.save();
            }
            var file = aeq.getFileObject(path);
            if (file.exists) {
              if (!confirm("File exists! Overwrite?")) {
                return null;
              }
            }
            return app.project.save(file);
          },
          simpleImportFile: function (file, options) {
            var iO = new ImportOptions(file);
            options = setDefault(options, {});
            if (options.sequence === true) {
              iO.sequence = true;
            }
            try {
              newItem = app.project.importFile(iO);
            } catch (e) {
              throw new Error(
                "Can\'t import file " + file.name + "\n" + String(e),
              );
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.property = aeq.extend(
        {},
        {
          extend: aeq.extend,
          getLayer: function (property) {
            var depth = property.propertyDepth;
            return property.propertyGroup(depth);
          },
          toString: function () {
            return "[object aeq.property]";
          },
          type: function (property) {
            return aeq.valueInObject(
              property.propertyType || property,
              PropertyType,
            );
          },
          valueType: function (property) {
            return aeq.valueInObject(
              property.propertyValueType || property,
              PropertyValueType,
            );
          },
        },
      );
      aeq.prop = aeq.property;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.renderqueue = aeq.extend(
        {},
        {
          clear: function () {
            var items = aeq.renderqueue.getRQItems();
            items = items.reverse();
            items.forEach(function (item) {
              item.remove();
            });
          },
          ensureRenderPathExists: function (outputModule) {
            aeq.app.ensureSecurityPrefEnabled();
            aeq.file.ensureFolderExists(outputModule.file.parent);
          },
          extend: aeq.extend,
          getQueuedComps: function () {
            var queuedItems = aeq.renderqueue.getQueuedItems();
            var compIDs = {};
            var comps = [];
            queuedItems.forEach(function (item) {
              var comp = item.comp;
              var compID = comp.id;
              if (compIDs[compID] === undefined) {
                compIDs[compID] = true;
                comps.push(comp);
              }
            });
            return aeq.arrayEx(comps);
          },
          getQueuedItems: function () {
            var items = aeq.renderqueue.getRQItems();
            return items.filter(function (item) {
              return aeq.renderqueue.isQueued(item);
            });
          },
          getRQComps: function () {
            var rqItems = aeq.renderqueue.getRQItems();
            var compIDs = {};
            var comps = [];
            rqItems.forEach(function (item) {
              var comp = item.comp;
              var compID = comp.id;
              if (compIDs[compID] === undefined) {
                compIDs[compID] = true;
                comps.push(comp);
              }
            });
            return aeq.arrayEx(comps);
          },
          getRQItems: function () {
            return aeq.arrayEx(
              aeq.normalizeCollection(app.project.renderQueue.items),
            );
          },
          getSettings: function (renderItem) {
            return renderItem.getSettings(GetSettingsFormat.STRING);
          },
          isQueued: function (rqItem) {
            return rqItem.status === RQItemStatus.QUEUED;
          },
          omTemplateExists: function (templateName) {
            var tempComp = aeq.comp.create();
            var tempRQItem = aeq.renderqueue.queue(tempComp);
            var templates = aeq.arrayEx(tempRQItem.outputModule(1).templates);
            var templateExists = templates.some(function (template) {
              return template === templateName;
            });
            tempRQItem.remove();
            tempComp.remove();
            return templateExists;
          },
          queue: function (item) {
            return app.project.renderQueue.items.add(item);
          },
          rqTemplateExists: function (templateName) {
            var tempComp = aeq.comp.create();
            var tempRQItem = aeq.renderqueue.queue(tempComp);
            var templates = aeq.arrayEx(tempRQItem.templates);
            var templateExists = templates.some(function (template) {
              return template === templateName;
            });
            tempRQItem.remove();
            tempComp.remove();
            return templateExists;
          },
          toString: function () {
            return "[object aeq.RenderQueue]";
          },
          unqueueAll: function () {
            var items = aeq.renderqueue.getRQItems();
            items.forEach(function (item) {
              if (
                item.status !== RQItemStatus.USER_STOPPED &&
                item.status !== RQItemStatus.ERR_STOPPED &&
                item.status !== RQItemStatus.RENDERING &&
                item.status !== RQItemStatus.DONE
              ) {
                item.render = false;
              }
            });
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.settings = aeq.extend(
        {},
        {
          extend: aeq.extend,
          get: function (sectionName, keyName) {
            if (aeq.settings.have(sectionName, keyName)) {
              return app.settings.getSetting(sectionName, keyName);
            }
            return undefined;
          },
          getAsArray: function (sectionName, keyName) {
            return aeq.settings.get(sectionName, keyName).split(",");
          },
          getAsBool: function (sectionName, keyName) {
            var value = aeq.settings.get(sectionName, keyName);
            if (value === "true") {
              return true;
            } else {
              if (value === "false") {
                return false;
              }
            }
            return undefined;
          },
          getAsFloat: function (sectionName, keyName) {
            return parseFloat(aeq.settings.get(sectionName, keyName));
          },
          getAsInt: function (sectionName, keyName) {
            return parseInt(aeq.settings.get(sectionName, keyName));
          },
          have: function (sectionName, keyName) {
            return app.settings.haveSetting(sectionName, keyName);
          },
          initSetting: function (sectionName, keyName, value, overwrite) {
            overwrite = setDefault(overwrite, false);
            if (!aeq.settings.have(sectionName, keyName) || overwrite) {
              aeq.settings.save(sectionName, keyName, value);
            }
            return aeq.settings.get(sectionName, keyName);
          },
          save: function (sectionName, keyName, value) {
            app.settings.saveSetting(sectionName, keyName, value);
          },
          setting: function (sectionName, keyName, value) {
            if (value !== undefined) {
              aeq.settings.save(sectionName, keyName, value);
              return aeq;
            }
            return aeq.settings.get(sectionName, keyName);
          },
          toString: function () {
            return "[object aeq.settings]";
          },
          unpack: function (sectionName, keyNames) {
            ret = aeq.isObject(keyNames) ? keyNames : {};
            aeq.forEach(keyNames, function (keyName) {
              if (app.settings.haveSetting(sectionName, keyName)) {
                ret[keyName] = app.settings.getSetting(sectionName, keyName);
              }
            });
            return ret;
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function getCompWithAlert() {
        var comp = aeq.getActiveComp();
        if (comp === null) {
          alert("No Comp selected");
        }
        return comp;
      }
      function getSelectedLayersWithAlert(comp) {
        if (comp.selectedLayers.length === 0) {
          alert("No layers selected");
          return null;
        }
        return comp.selectedLayers;
      }
      function getSelectedPropertiesWithAlert(comp) {
        if (comp.selectedProperties.length === 0) {
          alert("No properties selected");
          return null;
        }
        return comp.selectedProperties;
      }
      aeq.snippet = aeq.extend(
        {},
        {
          activeComp: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            return aeq.createUndoGroup(undoGroup, callback, [comp]);
          },
          extend: aeq.extend,
          forEachSelectedLayer: function (undoGroup, callback) {
            return aeq.snippet.selectedLayers(undoGroup, function (layers) {
              layers.forEach(callback);
              return layers;
            });
          },
          forEachSelectedLayerOrAll: function (undoGroup, callback) {
            return aeq.snippet.selectedLayersOrAll(
              undoGroup,
              function (layers) {
                layers.forEach(callback);
                return layers;
              },
            );
          },
          forEachSelectedProperty: function (undoGroup, callback) {
            return aeq.snippet.selectedProperties(undoGroup, function (props) {
              props.forEach(callback);
              return props;
            });
          },
          selectedLayers: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            var layers = getSelectedLayersWithAlert(comp);
            if (layers === null) {
              return false;
            }
            layers = aeq.arrayEx(layers);
            return aeq.createUndoGroup(undoGroup, callback, [layers, comp]);
          },
          selectedLayersOrAll: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            var layers = aeq.getSelectedLayersOrAll(comp);
            layers = aeq.arrayEx(layers);
            return aeq.createUndoGroup(undoGroup, callback, [layers, comp]);
          },
          selectedProperties: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            var props = getSelectedPropertiesWithAlert(comp);
            if (props === null) {
              return false;
            }
            props = aeq.arrayEx(props);
            return aeq.createUndoGroup(undoGroup, callback, [props, comp]);
          },
          toString: function () {
            return "[object aeq.snippet]";
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      var arrayEx = {
        attr: function () {
          [].unshift.call(arguments, this);
          return aeq.attr.apply(this, arguments);
        },
        every: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (!callback(this[i], i, this)) {
              return false;
            }
          }
          return true;
        },
        filter: function (callback) {
          var filteredArr = [];
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              filteredArr.push(this[i]);
            }
          }
          return aeq.arrayEx(filteredArr);
        },
        find: function (callback, def) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              return this[i];
            }
          }
          return def;
        },
        first: function () {
          if (this.length === 0) {
            throw new Error("There are no items in this array");
          }
          return this[0];
        },
        forEach: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            callback(this[i], i, this);
          }
        },
        groupBy: function (callback) {
          var obj = {};
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            var key = callback(this[i], i, this) || "undefined";
            var arr = obj[key] || [];
            arr.push(this[i]);
            obj[key.toString()] = arr;
          }
          return obj;
        },
        indexOf: function (searchElement, fromIndex) {
          if (this === null) {
            throw new TypeError('"this" is null or not defined');
          }
          var o = Object(this);
          var len = o.length >>> 0;
          if (len === 0) {
            return -1;
          }
          var n = fromIndex || 0;
          if (Math.abs(n) === Infinity) {
            n = 0;
          }
          if (n >= len) {
            return -1;
          }
          k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          while (k < len) {
            if (k in o && o[k] === searchElement) {
              return k;
            }
            k++;
          }
          return -1;
        },
        insertAt: function (insert, index) {
          this.splice(index, 0, insert);
        },
        map: function (callback) {
          var selectedArr = [];
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            selectedArr.push(callback(this[i], i, this));
          }
          return aeq.arrayEx(selectedArr);
        },
        some: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              return true;
            }
          }
          return false;
        },
      };
      aeq.arrayEx = function (arr) {
        arr = setDefault(arr, []);
        if (arr._init) {
          return arr;
        }
        arr._init = true;
        arr.isAeq = true;
        aeq.extend(arr, arrayEx);
        return arr;
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.Comp = function (comp) {
        if (comp instanceof aeq.Comp) {
          return comp;
        }
        if (this instanceof aeq.Comp) {
          this.comp = comp;
        } else {
          return new aeq.Comp(comp);
        }
      };
      aeq.Comp.prototype = {
        extend: aeq.extend,
        forEachLayer: function (callback) {
          var length = this.comp.numLayers;
          var i = 1;
          for (; i <= length; i++) {
            callback(this.comp.layer(i), i, this);
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
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.Key = function (property, index) {
        if (this instanceof aeq.Key) {
          if (property instanceof aeq.Property) {
            property = property.get();
          }
          if (index <= 0 || index > property.numKeys) {
            throw new Error(
              "Index " + index + " out of range 1-" + property.numKeys,
            );
          }
          this.property = property;
          this.index = index;
          this.originalTime = this.getTime();
        } else {
          return new aeq.Key(property, index);
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
          var newIndex = this.property.nearestKeyIndex(this.originalTime);
          if (this.property.keyTime(newIndex) === this.originalTime) {
            this.index = newIndex;
          } else {
            throw new Error("Original key has been deleted/moved");
          }
        },
        copyTo: function (targetProp, time, offset) {
          var keyInfo = this.getKeyinfo();
          keyInfo.time = time === undefined ? keyInfo.time : time;
          offset = offset === undefined ? 0 : offset;
          keyInfo.time += offset;
          if (targetProp.isAeq) {
            targetProp = targetProp.get();
          }
          keyInfo.property = targetProp;
          return aeq.pasteKey(keyInfo);
        },
        extend: aeq.extend,
        getKeyinfo: function () {
          this.checkKey();
          var keyInfo = {
            interpolationType: this.interpolationType(),
            property: this.property,
            time: this.time(),
            value: this.value(),
          };
          if (
            keyInfo.interpolationType.inType ===
              KeyframeInterpolationType.BEZIER &&
            keyInfo.interpolationType.outType ===
              KeyframeInterpolationType.BEZIER
          ) {
            keyInfo.temporalAutoBezier = this.temporalAutoBezier();
            keyInfo.temporalContinuous = this.temporalContinuous();
          }
          if (
            keyInfo.interpolationType.outType !== KeyframeInterpolationType.HOLD
          ) {
            keyInfo.temporalEase = this.temporalEase();
          }
          if (
            this.valueTypeIs("TwoD_SPATIAL") ||
            this.valueTypeIs("ThreeD_SPATIAL")
          ) {
            keyInfo.spatialAutoBezier = this.spatialAutoBezier();
            keyInfo.spatialContinuous = this.spatialContinuous();
            keyInfo.spatialTangent = this.spatialTangent();
            keyInfo.roving = this.roving();
          }
          return keyInfo;
        },
        getTime: function () {
          return this.property.keyTime(this.index);
        },
        interpolationType: function (inType, outType) {
          this.checkKey();
          if (arguments.length === 0) {
            return {
              inType: this.property.keyInInterpolationType(this.index),
              outType: this.property.keyOutInterpolationType(this.index),
            };
          }
          if (outType === undefined && inType.outType) {
            outType = inType.outType;
          }
          if (inType.inType) {
            inType = inType.inType;
          }
          if (aeq.isString(inType)) {
            inType = KeyframeInterpolationType[inType];
          }
          if (outType && aeq.isString(outType)) {
            outType = KeyframeInterpolationType[outType];
          } else {
            if (outType === undefined) {
              outType = inType;
            }
          }
          if (
            !this.property.isInterpolationTypeValid(inType) ||
            (outType && !this.property.isInterpolationTypeValid(outType))
          ) {
            return false;
          }
          this.property.setInterpolationTypeAtKey(this.index, inType, outType);
          return true;
        },
        isAeq: true,
        moveTo: function (time) {
          var thisTime = this.time();
          if (time === thisTime) {
            return;
          }
          var newKey = this.copyTo(this.property, time);
          this.remove();
          this.index = this.property.nearestKeyIndex(newKey.time());
          this.originalTime = time;
        },
        remove: function () {
          this.checkKey();
          this.property.removeKey(this.index);
        },
        spatialTangent: function (inType, outType) {
          this.checkKey();
          if (arguments.length === 0) {
            return {
              inTangent: this.property.keyInSpatialTangent(this.index),
              outTangent: this.property.keyOutSpatialTangent(this.index),
            };
          }
          if (outType === undefined && inType.outTangent) {
            outType = inType.outTangent;
          }
          if (inType.inTangent) {
            inType = inType.inTangent;
          }
          this.property.setSpatialTangentsAtKey(this.index, inType, outType);
        },
        temporalEase: function (inType, outType) {
          this.checkKey();
          if (arguments.length === 0) {
            return {
              inEase: this.property.keyInTemporalEase(this.index),
              outEase: this.property.keyOutTemporalEase(this.index),
            };
          }
          if (outType === undefined && inType.outEase) {
            outType = inType.outEase;
          }
          if (inType.inEase) {
            inType = inType.inEase;
          }
          if (!aeq.isArray(inType)) {
            if (this.valueTypeIs("TwoD")) {
              inType = [inType, inType];
            } else if (this.valueTypeIs("ThreeD")) {
              inType = [inType, inType, inType];
            } else {
              inType = [inType];
            }
          }
          if (outType && !aeq.isArray(outType)) {
            if (this.valueTypeIs("TwoD")) {
              outType = [outType, outType];
            } else if (this.valueTypeIs("ThreeD")) {
              outType = [outType, outType, outType];
            } else {
              outType = [outType];
            }
          }
          this.property.setTemporalEaseAtKey(this.index, inType, outType);
        },
        time: function () {
          this.checkKey();
          return this.originalTime;
        },
        toString: function () {
          return "[object aeq.Key]";
        },
        valueTypeIs: function valueTypeIs(type) {
          return this.property.propertyValueType === PropertyValueType[type];
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
        function (type) {
          var typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
          var getter = "key" + typeCapitalized;
          var setter = "set" + typeCapitalized + "AtKey";
          aeq.Key.prototype[type] = function () {
            this.checkKey();
            if (arguments.length === 0) {
              return this.property[getter](this.index);
            }
            [].unshift.call(arguments, this.index);
            this.property[setter].apply(this.property, arguments);
          };
        },
      );
      aeq.pasteKey = function (keyInfo) {
        var keyIndex = keyInfo.property.addKey(keyInfo.time);
        var key = new aeq.Key(keyInfo.property, keyIndex);
        if (
          keyInfo.property.value.length === 2 &&
          aeq.isArray(keyInfo.value) &&
          keyInfo.value.length === 3
        ) {
          keyInfo.value = [keyInfo.value[0], keyInfo.value[1]];
          var spatialTangent = keyInfo.spatialTangent;
          keyInfo.spatialTangent = {
            inTangent: [
              spatialTangent.inTangent[0],
              spatialTangent.inTangent[1],
            ],
            outTangent: [
              spatialTangent.outTangent[0],
              spatialTangent.outTangent[1],
            ],
          };
        }
        key.value(keyInfo.value);
        if (keyInfo.temporalEase !== undefined) {
          key.temporalEase(keyInfo.temporalEase);
        }
        key.interpolationType(keyInfo.interpolationType);
        if (
          keyInfo.temporalAutoBezier !== undefined &&
          keyInfo.temporalContinuous !== undefined
        ) {
          key.temporalAutoBezier(keyInfo.temporalAutoBezier);
          key.temporalContinuous(keyInfo.temporalContinuous);
        }
        if (
          keyInfo.spatialAutoBezier !== undefined &&
          keyInfo.spatialContinuous !== undefined
        ) {
          key.spatialAutoBezier(keyInfo.spatialAutoBezier);
          key.spatialContinuous(keyInfo.spatialContinuous);
          key.spatialTangent(keyInfo.spatialTangent);
          key.roving(keyInfo.roving);
        }
        return key;
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function getLayer(baseLayer, selector) {
        if (selector instanceof aeq.Layer) {
          return selector.layer;
        }
        if (aeq.isLayer(selector)) {
          return selector;
        }
        if (aeq.isNumber(selector)) {
          return baseLayer.containingComp.layer(selector);
        }
        if (aeq.isString(selector)) {
          if (regexRelativeIndex.test(selector)) {
            offset = getRelativeIndex(selector);
            if (offset) {
              index = baseLayer.index + offset;
              if (index === 0 || index > baseLayer.containingComp.numLayers) {
                return null;
              }
              return baseLayer.containingComp.layer(index);
            }
          }
          return baseLayer.containingComp.layer(selector);
        }
        return null;
      }
      function getRelativeIndex(str) {
        var offset = str.charAt(0) + str.substr(2);
        offset = parseInt(offset, 10);
        if (isNaN(offset)) {
          return false;
        }
        return offset;
      }
      aeq.Layer = function (layer) {
        if (layer instanceof aeq.Layer) {
          return layer;
        }
        if (this instanceof aeq.Layer) {
          this.layer = layer;
        } else {
          return new aeq.Layer(layer);
        }
      };
      aeq.Layer.prototype = {
        addEffect: function (effectName) {
          var effects = this.layer.property("ADBE Effect Parade");
          if (effects.canAddProperty(effectName)) {
            effects.addProperty(effectName);
          } else {
            throw new Error(
              'Can not add effect "' + effectName + '" to this layer',
            );
          }
        },
        allChildren: function () {
          return aeq.layer.allChildren(this.layer);
        },
        children: function () {
          return aeq.layer.children(this.layer);
        },
        copyToComp: function (comp) {
          if (!aeq.isComp(comp)) {
            if (comp instanceof aeq.Comp) {
              comp = comp.comp;
            } else {
              if (aeq.isString(comp)) {
                comp = aeq.getComp(comp);
              }
            }
          }
          this.layer.copyToComp(comp);
          return this;
        },
        extend: aeq.extend,
        forEachEffect: function (callback) {
          var effects = this.layer.property("ADBE Effect Parade");
          var length = effects.numProperties;
          var i = 1;
          for (; i <= length; i++) {
            callback(effects.property(i), i, effects);
          }
          return this;
        },
        get: function () {
          return this.layer;
        },
        isAeq: true,
        parent: function (selector) {
          if (arguments.length === 0) {
            return this.layer.parent;
          }
          if (selector === null) {
            this.layer.parent = null;
            return null;
          }
          var layer = getLayer(this.layer, selector);
          if (layer === null) {
            return null;
          }
          this.layer.parent = layer;
          return layer;
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
        function (attribute) {
          aeq.Layer.prototype[attribute] = function () {
            return this.layer[attribute];
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
        function (attribute) {
          aeq.Layer.prototype[attribute] = function (newValue) {
            if (arguments.length === 0) {
              return this.layer[attribute];
            }
            this.layer[attribute] = newValue;
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
        function (method) {
          aeq.Layer.prototype[method] = function (newValue) {
            this.layer[method](newValue);
            return this;
          };
        },
      );
      aeq.forEach(
        ["setParentWithJump", "moveAfter", "moveBefore"],
        function (method) {
          aeq.Layer.prototype[method] = function (selector) {
            var layer = getLayer(this.layer, selector);
            if (layer === null) {
              return null;
            }
            this.layer[method](layer);
            return layer;
          };
        },
      );
      var regexRelativeIndex = /^(\+|-)=/;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.Property = function (property) {
        if (property instanceof aeq.Property) {
          return property;
        }
        if (this instanceof aeq.Property) {
          this.property = property;
        } else {
          return new aeq.Property(property);
        }
      };
      aeq.Property.prototype = {
        addKey: function (time) {
          var keyIndex = this.property.addKey(time);
          return this.key(keyIndex);
        },
        expression: function (newValue) {
          if (!this.property.canSetExpression) {
            return false;
          }
          if (arguments.length === 0) {
            return this.property.expression;
          }
          this.property.expression = newValue;
          if (
            this.property.expressionError === "" &&
            (this.property.expressionEnabled || newValue === "")
          ) {
            return true;
          }
          return this.property.expressionError;
        },
        extend: aeq.extend,
        forEachKey: function (callback) {
          var keys = this.getKeys();
          var length = keys.length;
          var i = 0;
          for (; i < length; i++) {
            callback(keys[i], keys[i].index, this.property);
          }
        },
        get: function () {
          return this.property;
        },
        getKeys: function () {
          var keys = [];
          var length = this.property.numKeys;
          var i = 1;
          for (; i <= length; i++) {
            keys.push(this.key(i));
          }
          return aeq.arrayEx(keys);
        },
        isAeq: true,
        key: function (keyIndex) {
          return new aeq.Key(this.property, keyIndex);
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
        nearestKeyIndex: function (time) {
          var keyIndex = this.property.nearestKeyIndex(time);
          return this.key(keyIndex);
        },
        removeKey: function (keyIndex) {
          if (aeq.isNumber(keyIndex)) {
            this.property.removeKey(keyIndex);
          } else {
            if (keyIndex.toString() === "[object aeq.Key]") {
              keyIndex.remove();
            }
          }
        },
        selectedKeys: function () {
          var selectedKeys = [];
          for (var i = 1; i <= this.property.selectedKeys.length; i += 1) {
            selectedKeys.push(this.key(i));
          }
          return selectedKeys;
        },
        separationDimension: function () {
          if (this.property.isSeparationFollower) {
            return this.property.separationDimension;
          }
          return null;
        },
        separationFollower: function (dim) {
          return this.property.getSeparationFollower(dim);
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
        value: function (newValue) {
          if (arguments.length === 0) {
            return this.property.value;
          }
          this.property.setValue(newValue);
        },
        valueAtTime: function (time, value) {
          if (arguments.length === 1) {
            return this.property.valueAtTime(time);
          }
          this.property.setValueAtTime(time, value);
          return this.nearestKeyIndex(time);
        },
        valuesAtTimes: function (times, values) {
          var result = [];
          var i = 0;
          var il = times.length;
          if (arguments.length === 1) {
            for (; i < il; i++) {
              result.push(this.property.valueAtTime(times[i]));
            }
            return result;
          }
          this.property.setValuesAtTimes(times, values);
          for (; i < il; i++) {
            result.push(this.nearestKeyIndex(times[i]));
          }
          return result;
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
        function (attribute) {
          aeq.Property.prototype[attribute] = function () {
            return this.property[attribute];
          };
        },
      );
      return aeq;
    })(aeq || {});
    return aeq;
  })();
  var cssselector = (function () {
    function peg$subclass(child, parent) {
      function ctor() {
        this.constructor = child;
      }
      ctor.prototype = parent.prototype;
      child.prototype = new ctor();
    }
    function peg$SyntaxError(message, expected, found, location) {
      this.message = message;
      this.expected = expected;
      this.found = found;
      this.location = location;
      this.name = "SyntaxError";
      if (typeof Error.captureStackTrace === "function") {
        Error.captureStackTrace(this, peg$SyntaxError);
      }
    }
    function peg$parse(input) {
      function text() {
        return input.substring(peg$savedPos, peg$currPos);
      }
      function location() {
        return peg$computeLocation(peg$savedPos, peg$currPos);
      }
      function expected(description) {
        throw peg$buildException(
          null,
          [{ description: description, type: "other" }],
          input.substring(peg$savedPos, peg$currPos),
          peg$computeLocation(peg$savedPos, peg$currPos),
        );
      }
      function error(message) {
        throw peg$buildException(
          message,
          null,
          input.substring(peg$savedPos, peg$currPos),
          peg$computeLocation(peg$savedPos, peg$currPos),
        );
      }
      function peg$computePosDetails(pos) {
        var details = peg$posDetailsCache[pos];
        if (details) {
          return details;
        } else {
          p = pos - 1;
          while (!peg$posDetailsCache[p]) {
            p--;
          }
          details = peg$posDetailsCache[p];
          details = {
            column: details.column,
            line: details.line,
            seenCR: details.seenCR,
          };
          while (p < pos) {
            ch = input.charAt(p);
            if (ch === "\n") {
              if (!details.seenCR) {
                details.line++;
              }
              details.column = 1;
              details.seenCR = false;
            } else if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
              details.line++;
              details.column = 1;
              details.seenCR = true;
            } else {
              details.column++;
              details.seenCR = false;
            }
            p++;
          }
          peg$posDetailsCache[pos] = details;
          return details;
        }
      }
      function peg$computeLocation(startPos, endPos) {
        var startPosDetails = peg$computePosDetails(startPos);
        var endPosDetails = peg$computePosDetails(endPos);
        return {
          end: {
            column: endPosDetails.column,
            line: endPosDetails.line,
            offset: endPos,
          },
          start: {
            column: startPosDetails.column,
            line: startPosDetails.line,
            offset: startPos,
          },
        };
      }
      function peg$fail(expected) {
        if (peg$currPos < peg$maxFailPos) {
          return;
        }
        if (peg$currPos > peg$maxFailPos) {
          peg$maxFailPos = peg$currPos;
          peg$maxFailExpected = [];
        }
        peg$maxFailExpected.push(expected);
      }
      function peg$buildException(message, expected, found, location) {
        function cleanupExpected(expected) {
          var i = 1;
          expected.sort(function (a, b) {
            if (a.description < b.description) {
              return -1;
            } else if (a.description > b.description) {
              return 1;
            } else {
              return 0;
            }
          });
          while (i < expected.length) {
            if (expected[i - 1] === expected[i]) {
              expected.splice(i, 1);
            } else {
              i++;
            }
          }
        }
        function buildMessage(expected, found) {
          function stringEscape(s) {
            function hex(ch) {
              return ch.charCodeAt(0).toString(16).toUpperCase();
            }
            return s
              .replace(/\\/g, "\\\\")
              .replace(/"/g, '\\"')
              .replace(/\x08/g, "\\b")
              .replace(/\t/g, "\\t")
              .replace(/\n/g, "\\n")
              .replace(/\f/g, "\\f")
              .replace(/\r/g, "\\r")
              .replace(/[\x00-\x07\x0B\x0E\x0F]/g, function (ch) {
                return "\\x0" + hex(ch);
              })
              .replace(/[\x10-\x1F\x80-\xFF]/g, function (ch) {
                return "\\x" + hex(ch);
              })
              .replace(/[\u0100-\u0FFF]/g, function (ch) {
                return "\\u0" + hex(ch);
              })
              .replace(/[\u1000-\uFFFF]/g, function (ch) {
                return "\\u" + hex(ch);
              });
          }
          var expectedDescs = new Array(expected.length);
          for (var i = 0; i < expected.length; i += 1) {
            expectedDescs[i] = expected[i].description;
          }
          expectedDesc =
            expected.length > 1
              ? expectedDescs.slice(0, -1).join(", ") +
                " or " +
                expectedDescs[expected.length - 1]
              : expectedDescs[0];
          foundDesc = found ? '"' + stringEscape(found) + '"' : "end of input";
          return "Expected " + expectedDesc + " but " + foundDesc + " found.";
        }
        if (expected !== null) {
          cleanupExpected(expected);
        }
        return new peg$SyntaxError(
          message !== null ? message : buildMessage(expected, found),
          expected,
          found,
          location,
        );
      }
      function peg$parseStart() {
        s0 = peg$parseSelectors();
        return s0;
      }
      function peg$parsePropertiesBrackets() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseProperty();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseProperty();
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s3 = peg$c2;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c3);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c4(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsePropertiesParentheses() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 40) {
          s1 = peg$c5;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c6);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseProperty();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseProperty();
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 41) {
              s3 = peg$c7;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c8);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c4(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseProperty() {
        s0 = peg$parseValuePair();
        if (s0 === peg$FAILED) {
          s0 = peg$parseValueSingle();
        }
        return s0;
      }
      function peg$parseValueSingle() {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c9.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c9.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c10);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c11(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseValuePair() {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c9.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c9.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c10);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 61) {
            s2 = peg$c12;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c13);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parseValue();
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c14(s1, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseSelector() {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c9.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c10);
          }
        }
        if (s2 !== peg$FAILED) {
          while (s2 !== peg$FAILED) {
            s1.push(s2);
            if (peg$c9.test(input.charAt(peg$currPos))) {
              s2 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s2 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c10);
              }
            }
          }
        } else {
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parsePropertiesBrackets();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parsePseudo();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parsePseudo();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 === peg$FAILED) {
                s4 = null;
              }
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c15(s1, s2, s3);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseSelectors() {
        s0 = [];
        s1 = peg$parseSelector();
        if (s1 !== peg$FAILED) {
          while (s1 !== peg$FAILED) {
            s0.push(s1);
            s1 = peg$parseSelector();
          }
        } else {
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parsePseudo() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 58) {
          s1 = peg$c16;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c17);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          if (peg$c9.test(input.charAt(peg$currPos))) {
            s3 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s3 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c10);
            }
          }
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            if (peg$c9.test(input.charAt(peg$currPos))) {
              s3 = input.charAt(peg$currPos);
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c10);
              }
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = peg$parsePropertiesParentheses();
            if (s3 === peg$FAILED) {
              s3 = null;
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c18(s2, s3);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseValue() {
        s0 = peg$parseBooleanLiteral();
        if (s0 === peg$FAILED) {
          s0 = peg$parseNumericLiteral();
          if (s0 === peg$FAILED) {
            s0 = peg$parseStringLiteral();
            if (s0 === peg$FAILED) {
              s0 = peg$parseArrayLiteral();
              if (s0 === peg$FAILED) {
                s0 = peg$parseRegularExpressionLiteral();
              }
            }
          }
        }
        return s0;
      }
      function peg$parseNumericLiteral() {
        s0 = peg$currPos;
        s1 = peg$parseHexIntegerLiteral();
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          peg$silentFails++;
          s3 = peg$parseDecimalDigit();
          peg$silentFails--;
          if (s3 === peg$FAILED) {
            s2 = void 0;
          } else {
            peg$currPos = s2;
            s2 = peg$FAILED;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c19(s1);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseDecimalLiteral();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c19(s1);
          }
          s0 = s1;
        }
        return s0;
      }
      function peg$parseBooleanLiteral() {
        s0 = peg$currPos;
        s1 = peg$parseTrueToken();
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c20();
        }
        s0 = s1;
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseFalseToken();
          if (s1 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c21();
          }
          s0 = s1;
        }
        return s0;
      }
      function peg$parseDecimalIntegerLiteral() {
        if (input.charCodeAt(peg$currPos) === 48) {
          s0 = peg$c22;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c23);
          }
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          s1 = peg$parseNonZeroDigit();
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseDecimalDigit();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseDecimalDigit();
            }
            if (s2 !== peg$FAILED) {
              s1 = [s1, s2];
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseDecimalDigit() {
        if (peg$c24.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c25);
          }
        }
        return s0;
      }
      function peg$parseNonZeroDigit() {
        if (peg$c26.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c27);
          }
        }
        return s0;
      }
      function peg$parseDecimalLiteral() {
        s0 = peg$currPos;
        s1 = peg$parseDecimalIntegerLiteral();
        if (s1 !== peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 46) {
            s2 = peg$c28;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseDecimalDigit();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseDecimalDigit();
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c30();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 46) {
            s1 = peg$c28;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c29);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseDecimalDigit();
            if (s3 !== peg$FAILED) {
              while (s3 !== peg$FAILED) {
                s2.push(s3);
                s3 = peg$parseDecimalDigit();
              }
            } else {
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c30();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$currPos;
            s1 = peg$parseDecimalIntegerLiteral();
            if (s1 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c31();
            }
            s0 = s1;
          }
        }
        return s0;
      }
      function peg$parseHexIntegerLiteral() {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 2).toLowerCase() === peg$c32) {
          s1 = input.substr(peg$currPos, 2);
          peg$currPos += 2;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c33);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = [];
          s4 = peg$parseHexDigit();
          if (s4 !== peg$FAILED) {
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseHexDigit();
            }
          } else {
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s2 = input.substring(s2, peg$currPos);
          } else {
            s2 = s3;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c34(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseHexDigit() {
        if (peg$c35.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c36);
          }
        }
        return s0;
      }
      function peg$parseStringLiteral() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 34) {
          s1 = peg$c37;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = [];
          s3 = peg$parseDoubleStringCharacter();
          while (s3 !== peg$FAILED) {
            s2.push(s3);
            s3 = peg$parseDoubleStringCharacter();
          }
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 34) {
              s3 = peg$c37;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c38);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c39(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 39) {
            s1 = peg$c40;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c41);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = [];
            s3 = peg$parseSingleStringCharacter();
            while (s3 !== peg$FAILED) {
              s2.push(s3);
              s3 = peg$parseSingleStringCharacter();
            }
            if (s2 !== peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 39) {
                s3 = peg$c40;
                peg$currPos++;
              } else {
                s3 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c41);
                }
              }
              if (s3 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c39(s2);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        }
        return s0;
      }
      function peg$parseDoubleStringCharacter() {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 34) {
          s2 = peg$c37;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c38);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c42;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$parseLineTerminator();
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c44);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c45();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c42;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEscapeSequence();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c46(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parseLineContinuation();
          }
        }
        return s0;
      }
      function peg$parseSingleStringCharacter() {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 39) {
          s2 = peg$c40;
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c41);
          }
        }
        if (s2 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 92) {
            s2 = peg$c42;
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s2 === peg$FAILED) {
            s2 = peg$parseLineTerminator();
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c44);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c45();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 92) {
            s1 = peg$c42;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c43);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$parseEscapeSequence();
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c46(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parseLineContinuation();
          }
        }
        return s0;
      }
      function peg$parseLineContinuation() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 92) {
          s1 = peg$c42;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseLineTerminatorSequence();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c47();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseEscapeSequence() {
        s0 = peg$parseCharacterEscapeSequence();
        if (s0 === peg$FAILED) {
          s0 = peg$currPos;
          if (input.charCodeAt(peg$currPos) === 48) {
            s1 = peg$c22;
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c23);
            }
          }
          if (s1 !== peg$FAILED) {
            s2 = peg$currPos;
            peg$silentFails++;
            s3 = peg$parseDecimalDigit();
            peg$silentFails--;
            if (s3 === peg$FAILED) {
              s2 = void 0;
            } else {
              peg$currPos = s2;
              s2 = peg$FAILED;
            }
            if (s2 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c48();
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
          if (s0 === peg$FAILED) {
            s0 = peg$parseHexEscapeSequence();
            if (s0 === peg$FAILED) {
              s0 = peg$parseUnicodeEscapeSequence();
            }
          }
        }
        return s0;
      }
      function peg$parseCharacterEscapeSequence() {
        s0 = peg$parseSingleEscapeCharacter();
        if (s0 === peg$FAILED) {
          s0 = peg$parseNonEscapeCharacter();
        }
        return s0;
      }
      function peg$parseSingleEscapeCharacter() {
        if (input.charCodeAt(peg$currPos) === 39) {
          s0 = peg$c40;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c41);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.charCodeAt(peg$currPos) === 34) {
            s0 = peg$c37;
            peg$currPos++;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c38);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 92) {
              s0 = peg$c42;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c43);
              }
            }
            if (s0 === peg$FAILED) {
              s0 = peg$currPos;
              if (input.charCodeAt(peg$currPos) === 98) {
                s1 = peg$c49;
                peg$currPos++;
              } else {
                s1 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c50);
                }
              }
              if (s1 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c51();
              }
              s0 = s1;
              if (s0 === peg$FAILED) {
                s0 = peg$currPos;
                if (input.charCodeAt(peg$currPos) === 102) {
                  s1 = peg$c52;
                  peg$currPos++;
                } else {
                  s1 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c53);
                  }
                }
                if (s1 !== peg$FAILED) {
                  peg$savedPos = s0;
                  s1 = peg$c54();
                }
                s0 = s1;
                if (s0 === peg$FAILED) {
                  s0 = peg$currPos;
                  if (input.charCodeAt(peg$currPos) === 110) {
                    s1 = peg$c55;
                    peg$currPos++;
                  } else {
                    s1 = peg$FAILED;
                    if (peg$silentFails === 0) {
                      peg$fail(peg$c56);
                    }
                  }
                  if (s1 !== peg$FAILED) {
                    peg$savedPos = s0;
                    s1 = peg$c57();
                  }
                  s0 = s1;
                  if (s0 === peg$FAILED) {
                    s0 = peg$currPos;
                    if (input.charCodeAt(peg$currPos) === 114) {
                      s1 = peg$c58;
                      peg$currPos++;
                    } else {
                      s1 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c59);
                      }
                    }
                    if (s1 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c60();
                    }
                    s0 = s1;
                    if (s0 === peg$FAILED) {
                      s0 = peg$currPos;
                      if (input.charCodeAt(peg$currPos) === 116) {
                        s1 = peg$c61;
                        peg$currPos++;
                      } else {
                        s1 = peg$FAILED;
                        if (peg$silentFails === 0) {
                          peg$fail(peg$c62);
                        }
                      }
                      if (s1 !== peg$FAILED) {
                        peg$savedPos = s0;
                        s1 = peg$c63();
                      }
                      s0 = s1;
                      if (s0 === peg$FAILED) {
                        s0 = peg$currPos;
                        if (input.charCodeAt(peg$currPos) === 118) {
                          s1 = peg$c64;
                          peg$currPos++;
                        } else {
                          s1 = peg$FAILED;
                          if (peg$silentFails === 0) {
                            peg$fail(peg$c65);
                          }
                        }
                        if (s1 !== peg$FAILED) {
                          peg$savedPos = s0;
                          s1 = peg$c66();
                        }
                        s0 = s1;
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parseNonEscapeCharacter() {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parseEscapeCharacter();
        if (s2 === peg$FAILED) {
          s2 = peg$parseLineTerminator();
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          if (input.length > peg$currPos) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c44);
            }
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c45();
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseEscapeCharacter() {
        s0 = peg$parseSingleEscapeCharacter();
        if (s0 === peg$FAILED) {
          s0 = peg$parseDecimalDigit();
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 120) {
              s0 = peg$c67;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c68);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 117) {
                s0 = peg$c69;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c70);
                }
              }
            }
          }
        }
        return s0;
      }
      function peg$parseHexEscapeSequence() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 120) {
          s1 = peg$c67;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c68);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$currPos;
          s4 = peg$parseHexDigit();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseHexDigit();
            if (s5 !== peg$FAILED) {
              s4 = [s4, s5];
              s3 = s4;
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s2 = input.substring(s2, peg$currPos);
          } else {
            s2 = s3;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c71(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseUnicodeEscapeSequence() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 117) {
          s1 = peg$c69;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c70);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$currPos;
          s3 = peg$currPos;
          s4 = peg$parseHexDigit();
          if (s4 !== peg$FAILED) {
            s5 = peg$parseHexDigit();
            if (s5 !== peg$FAILED) {
              s6 = peg$parseHexDigit();
              if (s6 !== peg$FAILED) {
                s7 = peg$parseHexDigit();
                if (s7 !== peg$FAILED) {
                  s4 = [s4, s5, s6, s7];
                  s3 = s4;
                } else {
                  peg$currPos = s3;
                  s3 = peg$FAILED;
                }
              } else {
                peg$currPos = s3;
                s3 = peg$FAILED;
              }
            } else {
              peg$currPos = s3;
              s3 = peg$FAILED;
            }
          } else {
            peg$currPos = s3;
            s3 = peg$FAILED;
          }
          if (s3 !== peg$FAILED) {
            s2 = input.substring(s2, peg$currPos);
          } else {
            s2 = s3;
          }
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c71(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseLineTerminator() {
        if (peg$c72.test(input.charAt(peg$currPos))) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c73);
          }
        }
        return s0;
      }
      function peg$parseLineTerminatorSequence() {
        peg$silentFails++;
        if (input.charCodeAt(peg$currPos) === 10) {
          s0 = peg$c75;
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c76);
          }
        }
        if (s0 === peg$FAILED) {
          if (input.substr(peg$currPos, 2) === peg$c77) {
            s0 = peg$c77;
            peg$currPos += 2;
          } else {
            s0 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c78);
            }
          }
          if (s0 === peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 13) {
              s0 = peg$c79;
              peg$currPos++;
            } else {
              s0 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c80);
              }
            }
            if (s0 === peg$FAILED) {
              if (input.charCodeAt(peg$currPos) === 8232) {
                s0 = peg$c81;
                peg$currPos++;
              } else {
                s0 = peg$FAILED;
                if (peg$silentFails === 0) {
                  peg$fail(peg$c82);
                }
              }
              if (s0 === peg$FAILED) {
                if (input.charCodeAt(peg$currPos) === 8233) {
                  s0 = peg$c83;
                  peg$currPos++;
                } else {
                  s0 = peg$FAILED;
                  if (peg$silentFails === 0) {
                    peg$fail(peg$c84);
                  }
                }
              }
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c74);
          }
        }
        return s0;
      }
      function peg$parseArrayLiteral() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            s3 = [];
            s4 = peg$parseArrayValue();
            while (s4 !== peg$FAILED) {
              s3.push(s4);
              s4 = peg$parseArrayValue();
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                s5 = peg$parseValue();
                if (s5 !== peg$FAILED) {
                  s6 = peg$parse_();
                  if (s6 !== peg$FAILED) {
                    if (input.charCodeAt(peg$currPos) === 93) {
                      s7 = peg$c2;
                      peg$currPos++;
                    } else {
                      s7 = peg$FAILED;
                      if (peg$silentFails === 0) {
                        peg$fail(peg$c3);
                      }
                    }
                    if (s7 !== peg$FAILED) {
                      peg$savedPos = s0;
                      s1 = peg$c85(s3, s5);
                      s0 = s1;
                    } else {
                      peg$currPos = s0;
                      s0 = peg$FAILED;
                    }
                  } else {
                    peg$currPos = s0;
                    s0 = peg$FAILED;
                  }
                } else {
                  peg$currPos = s0;
                  s0 = peg$FAILED;
                }
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseArrayValue() {
        s0 = peg$currPos;
        s1 = peg$parseValue();
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 44) {
              s3 = peg$c86;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c87);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parse_();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c88(s1);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseTrueToken() {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 4) === peg$c89) {
          s1 = peg$c89;
          peg$currPos += 4;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c90);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseFalseToken() {
        s0 = peg$currPos;
        if (input.substr(peg$currPos, 5) === peg$c91) {
          s1 = peg$c91;
          peg$currPos += 5;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c92);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parse_();
          if (s2 === peg$FAILED) {
            s2 = null;
          }
          if (s2 !== peg$FAILED) {
            s1 = [s1, s2];
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parse_() {
        peg$silentFails++;
        s0 = [];
        if (peg$c94.test(input.charAt(peg$currPos))) {
          s1 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c95);
          }
        }
        while (s1 !== peg$FAILED) {
          s0.push(s1);
          if (peg$c94.test(input.charAt(peg$currPos))) {
            s1 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s1 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c95);
            }
          }
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c93);
          }
        }
        return s0;
      }
      function peg$parseRegularExpressionLiteral() {
        peg$silentFails++;
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 47) {
          s1 = peg$c97;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c98);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseRegularExpressionBody();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 47) {
              s3 = peg$c97;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c98);
              }
            }
            if (s3 !== peg$FAILED) {
              s4 = peg$parseRegularExpressionFlags();
              if (s4 !== peg$FAILED) {
                peg$savedPos = s0;
                s1 = peg$c99(s2, s4);
                s0 = s1;
              } else {
                peg$currPos = s0;
                s0 = peg$FAILED;
              }
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        peg$silentFails--;
        if (s0 === peg$FAILED) {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c96);
          }
        }
        return s0;
      }
      function peg$parseRegularExpressionBody() {
        s0 = peg$currPos;
        s1 = peg$parseRegularExpressionFirstChar();
        if (s1 !== peg$FAILED) {
          s2 = peg$parseRegularExpressionChars();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c100(s1, s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseRegularExpressionChars() {
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseRegularExpressionChar();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseRegularExpressionChar();
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c101(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseRegularExpressionFirstChar() {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (peg$c102.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c103);
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseRegularExpressionNonTerminator();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c104(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseRegularExpressionBackslashSequence();
          if (s0 === peg$FAILED) {
            s0 = peg$parseRegularExpressionClass();
          }
        }
        return s0;
      }
      function peg$parseRegularExpressionChar() {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (peg$c105.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c106);
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseRegularExpressionNonTerminator();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c104(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseRegularExpressionBackslashSequence();
          if (s0 === peg$FAILED) {
            s0 = peg$parseRegularExpressionClass();
          }
        }
        return s0;
      }
      function peg$parseRegularExpressionBackslashSequence() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 92) {
          s1 = peg$c42;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c43);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseRegularExpressionNonTerminator();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c107(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseRegularExpressionNonTerminator() {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        s2 = peg$parseLineTerminator();
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseSourceCharacter();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c104(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseRegularExpressionClass() {
        s0 = peg$currPos;
        if (input.charCodeAt(peg$currPos) === 91) {
          s1 = peg$c0;
          peg$currPos++;
        } else {
          s1 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c1);
          }
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseRegularExpressionClassChars();
          if (s2 !== peg$FAILED) {
            if (input.charCodeAt(peg$currPos) === 93) {
              s3 = peg$c2;
              peg$currPos++;
            } else {
              s3 = peg$FAILED;
              if (peg$silentFails === 0) {
                peg$fail(peg$c3);
              }
            }
            if (s3 !== peg$FAILED) {
              peg$savedPos = s0;
              s1 = peg$c108(s2);
              s0 = s1;
            } else {
              peg$currPos = s0;
              s0 = peg$FAILED;
            }
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        return s0;
      }
      function peg$parseRegularExpressionClassChars() {
        s0 = peg$currPos;
        s1 = [];
        s2 = peg$parseRegularExpressionClassChar();
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          s2 = peg$parseRegularExpressionClassChar();
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c101(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseRegularExpressionClassChar() {
        s0 = peg$currPos;
        s1 = peg$currPos;
        peg$silentFails++;
        if (peg$c109.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c110);
          }
        }
        peg$silentFails--;
        if (s2 === peg$FAILED) {
          s1 = void 0;
        } else {
          peg$currPos = s1;
          s1 = peg$FAILED;
        }
        if (s1 !== peg$FAILED) {
          s2 = peg$parseRegularExpressionNonTerminator();
          if (s2 !== peg$FAILED) {
            peg$savedPos = s0;
            s1 = peg$c104(s2);
            s0 = s1;
          } else {
            peg$currPos = s0;
            s0 = peg$FAILED;
          }
        } else {
          peg$currPos = s0;
          s0 = peg$FAILED;
        }
        if (s0 === peg$FAILED) {
          s0 = peg$parseRegularExpressionBackslashSequence();
        }
        return s0;
      }
      function peg$parseRegularExpressionFlags() {
        s0 = peg$currPos;
        s1 = [];
        if (peg$c111.test(input.charAt(peg$currPos))) {
          s2 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s2 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c112);
          }
        }
        while (s2 !== peg$FAILED) {
          s1.push(s2);
          if (peg$c111.test(input.charAt(peg$currPos))) {
            s2 = input.charAt(peg$currPos);
            peg$currPos++;
          } else {
            s2 = peg$FAILED;
            if (peg$silentFails === 0) {
              peg$fail(peg$c112);
            }
          }
        }
        if (s1 !== peg$FAILED) {
          peg$savedPos = s0;
          s1 = peg$c113(s1);
        }
        s0 = s1;
        return s0;
      }
      function peg$parseSourceCharacter() {
        if (input.length > peg$currPos) {
          s0 = input.charAt(peg$currPos);
          peg$currPos++;
        } else {
          s0 = peg$FAILED;
          if (peg$silentFails === 0) {
            peg$fail(peg$c44);
          }
        }
        return s0;
      }
      function mergeProps(array) {
        var merged = {};
        for (var i = 0; i < array.length; i += 1) {
          var pair = array[i];
          for (var key in pair) {
            if (pair.hasOwnProperty(key)) {
              merged[key] = pair[key];
            }
          }
        }
        return merged;
      }
      var options = arguments.length > 1 ? arguments[1] : {};
      var parser = this;
      var peg$FAILED = {};
      var peg$startRuleFunctions = { Start: peg$parseStart };
      var peg$startRuleFunction = peg$parseStart;
      var peg$c0 = "[";
      var peg$c1 = { description: '"["', type: "literal", value: "[" };
      var peg$c2 = "]";
      var peg$c3 = { description: '"]"', type: "literal", value: "]" };
      var peg$c4 = function (props) {
        return mergeProps(props);
      };
      var peg$c5 = "(";
      var peg$c6 = { description: '"("', type: "literal", value: "(" };
      var peg$c7 = ")";
      var peg$c8 = { description: '")"', type: "literal", value: ")" };
      var peg$c9 = /^[a-zA-Z]/;
      var peg$c10 = {
        description: "[a-zA-Z]",
        type: "class",
        value: "[a-zA-Z]",
      };
      var peg$c11 = function (name) {
        var o = {};
        var key = name.join("");
        o[key] = { type: "Bool", value: true };
        return o;
      };
      var peg$c12 = "=";
      var peg$c13 = { description: '"="', type: "literal", value: "=" };
      var peg$c14 = function (name, value) {
        var o = {};
        var key = name.join("");
        o[key] = value;
        return o;
      };
      var peg$c15 = function (type, props, pseudo) {
        return {
          props: props,
          pseudo: pseudo,
          type: type.join("").toLowerCase(),
        };
      };
      var peg$c16 = ":";
      var peg$c17 = { description: '":"', type: "literal", value: ":" };
      var peg$c18 = function (type, props) {
        return { props: props, type: type.join("").toLowerCase() };
      };
      var peg$c19 = function (literal) {
        return literal;
      };
      var peg$c20 = function () {
        return { type: "Bool", value: true };
      };
      var peg$c21 = function () {
        return { type: "Bool", value: false };
      };
      var peg$c22 = "0";
      var peg$c23 = { description: '"0"', type: "literal", value: "0" };
      var peg$c24 = /^[0-9]/;
      var peg$c25 = { description: "[0-9]", type: "class", value: "[0-9]" };
      var peg$c26 = /^[1-9]/;
      var peg$c27 = { description: "[1-9]", type: "class", value: "[1-9]" };
      var peg$c28 = ".";
      var peg$c29 = { description: '"."', type: "literal", value: "." };
      var peg$c30 = function () {
        return { type: "Number", value: parseFloat(text()) };
      };
      var peg$c31 = function () {
        return { type: "Integer", value: parseFloat(text()) };
      };
      var peg$c32 = "0x";
      var peg$c33 = { description: '"0x"', type: "literal", value: "0x" };
      var peg$c34 = function (digits) {
        return { type: "Hex", value: parseInt(digits, 16) };
      };
      var peg$c35 = /^[0-9a-f]/i;
      var peg$c36 = {
        description: "[0-9a-f]i",
        type: "class",
        value: "[0-9a-f]i",
      };
      var peg$c37 = '"';
      var peg$c38 = { description: '"\\""', type: "literal", value: '"' };
      var peg$c39 = function (chars) {
        return { type: "String", value: chars.join("") };
      };
      var peg$c40 = "\'";
      var peg$c41 = { description: '"\'"', type: "literal", value: "\'" };
      var peg$c42 = "\\";
      var peg$c43 = { description: '"\\\\"', type: "literal", value: "\\" };
      var peg$c44 = { description: "any character", type: "any" };
      var peg$c45 = function () {
        return text();
      };
      var peg$c46 = function (sequence) {
        return sequence;
      };
      var peg$c47 = function () {
        return "";
      };
      var peg$c48 = function () {
        return "\x00";
      };
      var peg$c49 = "b";
      var peg$c50 = { description: '"b"', type: "literal", value: "b" };
      var peg$c51 = function () {
        return "\b";
      };
      var peg$c52 = "f";
      var peg$c53 = { description: '"f"', type: "literal", value: "f" };
      var peg$c54 = function () {
        return "\f";
      };
      var peg$c55 = "n";
      var peg$c56 = { description: '"n"', type: "literal", value: "n" };
      var peg$c57 = function () {
        return "\n";
      };
      var peg$c58 = "r";
      var peg$c59 = { description: '"r"', type: "literal", value: "r" };
      var peg$c60 = function () {
        return "\r";
      };
      var peg$c61 = "t";
      var peg$c62 = { description: '"t"', type: "literal", value: "t" };
      var peg$c63 = function () {
        return "\t";
      };
      var peg$c64 = "v";
      var peg$c65 = { description: '"v"', type: "literal", value: "v" };
      var peg$c66 = function () {
        return "\v";
      };
      var peg$c67 = "x";
      var peg$c68 = { description: '"x"', type: "literal", value: "x" };
      var peg$c69 = "u";
      var peg$c70 = { description: '"u"', type: "literal", value: "u" };
      var peg$c71 = function (digits) {
        return String.fromCharCode(parseInt(digits, 16));
      };
      var peg$c72 = /^[\n\r\u2028\u2029]/;
      var peg$c73 = {
        description: "[\\n\\r\\u2028\\u2029]",
        type: "class",
        value: "[\\n\\r\\u2028\\u2029]",
      };
      var peg$c74 = { description: "end of line", type: "other" };
      var peg$c75 = "\n";
      var peg$c76 = { description: '"\\n"', type: "literal", value: "\n" };
      var peg$c77 = "\r\n";
      var peg$c78 = { description: '"\\r\\n"', type: "literal", value: "\r\n" };
      var peg$c79 = "\r";
      var peg$c80 = { description: '"\\r"', type: "literal", value: "\r" };
      var peg$c81 = "\u2028";
      var peg$c82 = {
        description: '"\\u2028"',
        type: "literal",
        value: "\u2028",
      };
      var peg$c83 = "\u2029";
      var peg$c84 = {
        description: '"\\u2029"',
        type: "literal",
        value: "\u2029",
      };
      var peg$c85 = function (head, tail) {
        head.push(tail);
        return { type: "Array", value: head };
      };
      var peg$c86 = ",";
      var peg$c87 = { description: '","', type: "literal", value: "," };
      var peg$c88 = function (value) {
        return value;
      };
      var peg$c89 = "true";
      var peg$c90 = { description: '"true"', type: "literal", value: "true" };
      var peg$c91 = "false";
      var peg$c92 = { description: '"false"', type: "literal", value: "false" };
      var peg$c93 = { description: "whitespace", type: "other" };
      var peg$c94 = /^[ \t\n\r]/;
      var peg$c95 = {
        description: "[ \\t\\n\\r]",
        type: "class",
        value: "[ \\t\\n\\r]",
      };
      var peg$c96 = { description: "regular expression", type: "other" };
      var peg$c97 = "/";
      var peg$c98 = { description: '"/"', type: "literal", value: "/" };
      var peg$c99 = function (body, flags) {
        return {
          body: body,
          flags: flags,
          type: "RegExp",
          value: new RegExp(body, flags),
        };
      };
      var peg$c100 = function (char_, chars) {
        return char_ + chars;
      };
      var peg$c101 = function (chars) {
        return chars.join("");
      };
      var peg$c102 = /^[*\\\/[]/;
      var peg$c103 = {
        description: "[*\\\\/[]",
        type: "class",
        value: "[*\\\\/[]",
      };
      var peg$c104 = function (char_) {
        return char_;
      };
      var peg$c105 = /^[\\\/[]/;
      var peg$c106 = {
        description: "[\\\\/[]",
        type: "class",
        value: "[\\\\/[]",
      };
      var peg$c107 = function (char_) {
        return "\\" + char_;
      };
      var peg$c108 = function (chars) {
        return "[" + chars + "]";
      };
      var peg$c109 = /^[\]\\]/;
      var peg$c110 = {
        description: "[\\]\\\\]",
        type: "class",
        value: "[\\]\\\\]",
      };
      var peg$c111 = /^[gimuy]/;
      var peg$c112 = {
        description: "[gimuy]",
        type: "class",
        value: "[gimuy]",
      };
      var peg$c113 = function (parts) {
        return parts.join("");
      };
      var peg$currPos = 0;
      var peg$savedPos = 0;
      var peg$posDetailsCache = [{ column: 1, line: 1, seenCR: false }];
      var peg$maxFailPos = 0;
      var peg$maxFailExpected = [];
      var peg$silentFails = 0;
      if ("startRule" in options) {
        if (!(options.startRule in peg$startRuleFunctions)) {
          throw new Error(
            "Can\'t start parsing from rule \"" + options.startRule + '".',
          );
        }
        peg$startRuleFunction = peg$startRuleFunctions[options.startRule];
      }
      peg$result = peg$startRuleFunction();
      if (peg$result !== peg$FAILED && peg$currPos === input.length) {
        return peg$result;
      } else {
        if (peg$result !== peg$FAILED && peg$currPos < input.length) {
          peg$fail({ description: "end of input", type: "end" });
        }
        throw peg$buildException(
          null,
          peg$maxFailExpected,
          peg$maxFailPos < input.length ? input.charAt(peg$maxFailPos) : null,
          peg$maxFailPos < input.length
            ? peg$computeLocation(peg$maxFailPos, peg$maxFailPos + 1)
            : peg$computeLocation(peg$maxFailPos, peg$maxFailPos),
        );
      }
    }
    ("use strict");
    peg$subclass(peg$SyntaxError, Error);
    return { SyntaxError: peg$SyntaxError, parse: peg$parse };
  })();
  aeq.ui = (function (ui) {
    ui.Container = function (obj) {
      this.obj = obj;
    };
    ui.Container.prototype = {
      _add: function (type, options) {
        if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1)) {
          options = options.arg1;
          options.arg1 = options.items || options.text;
        }
        var obj = this.obj.add(
          type,
          options.bounds,
          options.arg1,
          options.properties,
        );
        ui.set(obj, options);
        return obj;
      },
      addButton: function (arg1, onClick, properties) {
        return this._add("button", {
          arg1: arg1,
          onClick: onClick,
          properties: properties,
        });
      },
      addCheckbox: function (arg1, onClick, properties) {
        return this._add("checkbox", {
          arg1: arg1,
          onClick: onClick,
          properties: properties,
        });
      },
      addDropdownList: function (arg1, onChange, properties) {
        return this._add("dropdownlist", {
          arg1: arg1,
          onChange: onChange,
          properties: properties,
        });
      },
      addEditText: function (arg1, onChange, onChanging, properties) {
        return this._add("edittext", {
          arg1: arg1,
          onChange: onChange,
          onChanging: onChanging,
          properties: properties,
        });
      },
      addGroup: function (options) {
        var group = this.obj.add("group");
        group = new ui.Container(group);
        if (options) {
          group.set(options);
        }
        return group;
      },
      addIconButton: function (arg1, onClick, properties) {
        var options = { arg1: arg1, onClick: onClick, properties: properties };
        if (
          aeq.isObject(options.arg1) &&
          !aeq.isArray(options.arg1) &&
          !aeq.isFile(options.arg1) &&
          options.arg1.format === undefined
        ) {
          options = options.arg1;
          options.arg1 = options.image || undefined;
        }
        var obj = this.obj.add(
          "iconbutton",
          options.bounds,
          options.arg1,
          options.properties,
        );
        ui.set(obj, options);
        return obj;
      },
      addImage: function (arg1, onClick, properties) {
        var options = { arg1: arg1, onClick: onClick, properties: properties };
        if (
          aeq.isObject(options.arg1) &&
          !aeq.isArray(options.arg1) &&
          !aeq.isFile(options.arg1) &&
          options.arg1.format === undefined
        ) {
          options = options.arg1;
          options.arg1 = options.image || undefined;
        }
        var obj = this.obj.add(
          "image",
          options.bounds,
          options.arg1,
          options.properties,
        );
        ui.set(obj, options);
        return obj;
      },
      addListBox: function (arg1, onChange, onDoubleClick, properties) {
        return this._add("listbox", {
          arg1: arg1,
          onChange: onChange,
          onDoubleClick: onDoubleClick,
          properties: properties,
        });
      },
      addPanel: function (arg1, properties) {
        var panel = this._add("panel", { arg1: arg1, properties: properties });
        return new ui.Container(panel);
      },
      addProgressbar: function (value, maxValue) {
        return this.obj.add("progressbar", undefined, value, maxValue);
      },
      addRadioButton: function (arg1, onClick, properties) {
        return this._add("radiobutton", {
          arg1: arg1,
          onClick: onClick,
          properties: properties,
        });
      },
      addScrollbar: function (value, maxValue, onChange, onChanging) {
        var scrollbar = this.obj.add("scrollbar", undefined, value, maxValue);
        scrollbar.onChange = onChange;
        scrollbar.onChanging = onChanging;
        return scrollbar;
      },
      addSlider: function (value, minValue, maxValue, onChange, onChanging) {
        var slider = this.obj.add(
          "slider",
          undefined,
          value,
          minValue,
          maxValue,
        );
        slider.onChange = onChange;
        slider.onChanging = onChanging;
        return slider;
      },
      addStaticText: function (arg1, properties) {
        return this._add("statictext", { arg1: arg1, properties: properties });
      },
      addTab: function (text) {
        var tab = this.obj.add("tab", undefined, text);
        return new ui.Container(tab);
      },
      addTabbedPanel: function () {
        var tabbedpanel = this.obj.add("tabbedpanel");
        return new ui.Container(tabbedpanel);
      },
      addTreeView: function (arg1, onChange, properties) {
        return this._add("treeview", {
          arg1: arg1,
          onChange: onChange,
          properties: properties,
        });
      },
      extend: aeq.extend,
      get: function () {
        return this.obj;
      },
      remove: function (obj) {
        if (obj instanceof ui.Container) {
          obj = obj.obj;
        }
        this.obj.remove(obj);
      },
      removeAll: function () {
        for (var i = this.obj.children.length - 1; i >= 0; i--) {
          this.obj.remove(this.obj.children[i]);
        }
      },
      removeChildren: function (obj) {
        if (obj instanceof ui.Container) {
          obj = obj.obj;
        }
        for (var i = obj.children.length - 1; i >= 0; i--) {
          obj.remove(obj.children[i]);
        }
      },
      set: function (options) {
        ui.set(this.obj, options);
      },
      toString: function () {
        return "[object aeq.ui.Container]";
      },
      update: function () {
        this.obj.layout.layout(true);
        this.obj.layout.resize();
      },
    };
    ui.Container.prototype.addListbox = ui.Container.prototype.addListBox;
    ui.Container.prototype.addStatictext = ui.Container.prototype.addStaticText;
    ui.Container.prototype.addTreeview = ui.Container.prototype.addTreeView;
    (function createControllerSetters() {
      function multiParameter(type, numParameters) {
        return function (newValue) {
          if (newValue === undefined) {
            return this.obj[type];
          }
          if (arguments.length === numParameters) {
            newValue = Array.apply(null, arguments);
          } else {
            newValue = arguments[0];
          }
          this.obj[type] = newValue;
        };
      }
      var oneParameters = [
        "enabled",
        "helpTip",
        "orientation",
        "text",
        "visible",
      ];
      var twoParameters = [
        "alignChildren",
        "alignment",
        "location",
        "maximumSize",
        "minimumSize",
        "preferredSize",
        "size",
      ];
      var fourParameters = ["bounds", "margins"];
      aeq.forEach(oneParameters, function (type) {
        ui.Container.prototype[type] = function (newValue) {
          if (newValue === undefined) {
            return this.obj[type];
          }
          this.obj[type] = newValue;
        };
      });
      aeq.forEach(twoParameters, function (type) {
        ui.Container.prototype[type] = multiParameter(type, 2);
      });
      aeq.forEach(fourParameters, function (type) {
        ui.Container.prototype[type] = multiParameter(type, 4);
      });
    })();
    return ui;
  })(aeq.ui || {});
  aeq.ui = (function (ui) {
    ui.createMainWindow = function (thisObj, title, opt) {
      if (aeq.isPanel(thisObj)) {
        return new ui.Window(thisObj);
      }
      if (aeq.isString(thisObj)) {
        opt = title;
        title = thisObj;
      }
      opt = aeq.setDefault(opt, { resizeable: true });
      var root = new Window("palette", title, undefined, opt);
      aeq.ui.root = root;
      return new ui.Window(root);
    };
    ui.createWindow = function (title, options) {
      options = aeq.setDefault(options, { resizeable: true });
      var newWindow = new Window("palette", title, undefined, options);
      return new ui.Window(newWindow);
    };
    ui.createDialog = function (title, options) {
      options = aeq.setDefault(options, { resizeable: true });
      var newWindow = new Window("dialog", title, undefined, options);
      return new ui.Window(newWindow);
    };
    ui.ready = function (callback) {
      callback();
    };
    ui.set = function (obj, options) {
      for (var option in options) {
        if (
          options.hasOwnProperty(option) &&
          option !== "properties" &&
          option !== "arg1"
        ) {
          obj[option] = options[option];
        }
      }
    };
    return ui;
  })(aeq.ui || {});
  aeq.ui = (function (ui) {
    ui.Window = function (obj) {
      this.obj = obj;
    };
    ui.Window.prototype = ui.Container.prototype;
    ui.Window.prototype.show = function () {
      this.layout();
      if (aeq.isWindow(this.obj)) {
        return this.obj.show();
      }
    };
    ui.Window.prototype.hide = function () {
      if (aeq.isWindow(this.obj)) {
        this.obj.hide();
      }
    };
    ui.Window.prototype.close = function (value) {
      if (aeq.isWindow(this.obj)) {
        this.obj.close(value);
      }
    };
    ui.Window.prototype.layout = function () {
      this.obj.layout.layout(true);
      this.obj.layout.resize();
      this.obj.onResizing = this.obj.onResize = function () {
        this.layout.resize();
      };
    };
    return ui;
  })(aeq.ui || {});
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
                  ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
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
    ("use strict");
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
          (typeof replacer !== "object" || typeof replacer.length !== "number")
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
  kbar = null;
  _kbar.getCurrentProject = function () {
    var projectFile = app.project.file;
    if (!projectFile) {
      return JSON.stringify(null);
    } else {
      return JSON.stringify({
        filename: projectFile.name,
        path: projectFile.path,
      });
    }
  };
  _kbar.setLastButton = function (id, name, argument) {
    var isButton = !!id;
    kbar = {
      JSON: JSON,
      aeq: aeq,
      button: !isButton ? null : { argument: argument, id: id, name: name },
      version: "3.1",
    };
    if (!isButton) {
      return;
    }
  };
  _kbar.setLastButton(null, null);
  _kbar.getPresetPaths = function () {
    return aeq.app.getPresetsPaths();
  };
  _kbar.runFile = function (path) {
    var file = new File(path);
    Folder.current = file.parent;
    if (!file.exists) {
      alert('The file at "' + path + '" does not exist');
      return;
    }
    $.evalFile(file.absoluteURI);
  };
  _kbar.getAllEffects = function () {
    return JSON.stringify(
      aeq.arrayEx(app.effects).map(function (_a) {
        var matchName = _a.matchName;
        var displayName = _a.displayName;
        var version = _a.version;
        var category = _a.category;
        return {
          category: category,
          displayName: displayName,
          matchName: matchName,
          version: version,
        };
      }),
    );
  };
  _kbar.applyEffect = function (effectName, displayName) {
    if (!aeq.getActiveComposition()) {
      return;
    }
    app.beginUndoGroup("" + displayName);
    var success = 0;
    var failed = 0;
    aeq.getSelectedLayersOrAll().forEach(function (l) {
      try {
        aeq(l).addEffect(effectName);
        success++;
      } catch (e) {
        failed++;
      }
    });
    app.endUndoGroup();
    return { failed: failed, success: success };
  };
  _kbar.applyPreset = function (presetPath) {
    if (!aeq.getActiveComposition()) {
      return;
    }
    app.beginUndoGroup("Apply Preset");
    var success = 0;
    var failed = 0;
    aeq.getSelectedLayersOrAll().forEach(function (l) {
      try {
        aeq(l).applyPreset(new File(presetPath));
        success++;
      } catch (e) {
        failed++;
      }
    });
    app.endUndoGroup();
    return { failed: failed, success: success };
  };
  _kbar.setExpression = function (expr) {
    if (!aeq.getActiveComposition()) {
      return;
    }
    app.beginUndoGroup("Set Expression");
    var success = 0;
    var failed = 0;
    var props = aeq.getSelectedProperties();
    props
      .filter(function (p) {
        return p.canSetExpression;
      })
      .forEach(function (p) {
        try {
          aeq(p).expression(expr);
          success++;
        } catch (e) {
          failed++;
        }
      });
    app.endUndoGroup();
    return { failed: failed, success: success };
  };
};
_kbar();
