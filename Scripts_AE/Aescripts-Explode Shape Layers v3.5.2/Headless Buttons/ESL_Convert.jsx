/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function (thisObj) {
  function OptionsUI() {
    this.startLineNum = $.line - 5;
    this.win = aeq.ui.createDialog(
      Config.name + " v" + Config.version + ": Options",
    );
    var tpnl = this.win.addTabbedPanel();
    tpnl.set(Style.FillFillRow);
    var tabBehaviour = tpnl.addTab("Behaviour");
    tabBehaviour.addStaticText("Change the way ESL works here.");
    var grpBehaviour = tabBehaviour.addGroup(Style.OptionsTab);
    this.cbDeleteSource = grpBehaviour.addCheckbox("Delete Source");
    this.cbDeleteSource.helpTip =
      "Delete the original layers (or shape groups)";
    this.cbDeleteSource.value = Prefs.getAsBool(Config.prefKey.DeleteSource);
    this.cbCentre = grpBehaviour.addCheckbox("Centre Anchor Points");
    this.cbCentre.helpTip = "Centre anchor points to layer contents";
    this.cbCentre.value = Prefs.getAsBool(Config.prefKey.CentreAnchorPoints);
    this.cbKeepColours = grpBehaviour.addCheckbox("Explode Fills & Strokes?");
    this.cbKeepColours.helpTip =
      "Whether Explode should also explode top-level fills/strokes/etc";
    this.cbKeepColours.value = Prefs.getAsBool(
      Config.prefKey.ExplodeKeepsColours,
    );
    this.cbAppendName = grpBehaviour.addCheckbox("Append Layer Names");
    this.cbAppendName.helpTip = "Append source layer name (or \'Outlines\')";
    this.cbAppendName.value = Prefs.getAsBool(Config.prefKey.AppendLayerName);
    this.cbRemoveArtboardAfterConvert = grpBehaviour.addCheckbox(
      "Remove Artboard After Convert",
    );
    this.cbRemoveArtboardAfterConvert.helpTip =
      "Whether to try removing artboard after converting a vector layer";
    this.cbRemoveArtboardAfterConvert.value = Prefs.getAsBool(
      Config.prefKey.RemoveArtboardAfterConvert,
    );
    this.cbShowHeavyWarning = grpBehaviour.addCheckbox("Show Heavy Warning");
    this.cbShowHeavyWarning.helpTip =
      "Whether to warn you if you\'re about to explode a heavy layer";
    this.cbShowHeavyWarning.value = Prefs.getAsBool(
      Config.prefKey.ShowHeavyWarning,
    );
    var grpHeavy = grpBehaviour.addGroup();
    this.etHeavyThreshold = grpHeavy.addEditText(
      Prefs.getAsInt(Config.prefKey.HeavyThreshold),
    );
    this.etHeavyThreshold.characters = 4;
    this.etHeavyThreshold.helpTip =
      "How many shapes to explode before giving a warning";
    this.stHeavyThreshold = grpHeavy.addStatictext("Heavy Threshold");
    this.stHeavyThreshold.helpTip =
      "How many shapes to explode before giving a warning";
    var tabButtons = tpnl.addTab("Toolbar");
    tabButtons.addStaticText("Control toolbar look & feel here.");
    var grpButtons = tabButtons.addGroup(Style.OptionsTab);
    this.cbUseGraphicButtons = grpButtons.addCheckbox("Use Graphic Buttons");
    this.cbUseGraphicButtons.helpTip = "Use graphic (vs text) buttons";
    this.cbUseGraphicButtons.value = Prefs.getAsBool(
      Config.prefKey.UseGraphicButtons,
    );
    this.cbShowExplode = grpButtons.addCheckbox("Explode");
    this.cbShowExplode.value = Prefs.getAsBool(Config.prefKey.ShowExplode);
    this.cbShowMerge = grpButtons.addCheckbox("Merge");
    this.cbShowMerge.value = Prefs.getAsBool(Config.prefKey.ShowMerge);
    this.cbShowConvert = grpButtons.addCheckbox("Convert");
    this.cbShowConvert.value = Prefs.getAsBool(Config.prefKey.ShowConvert);
    this.cbShowArtboard = grpButtons.addCheckbox("Remove Artboard");
    this.cbShowArtboard.value = Prefs.getAsBool(Config.prefKey.ShowArtboard);
    this.cbShowSelectFills = grpButtons.addCheckbox("Select Fills");
    this.cbShowSelectFills.value = Prefs.getAsBool(
      Config.prefKey.ShowSelectFills,
    );
    this.cbShowSelectStrokes = grpButtons.addCheckbox("Select Strokes");
    this.cbShowSelectStrokes.value = Prefs.getAsBool(
      Config.prefKey.ShowSelectStrokes,
    );
    this.tabDebug = tpnl.addTab("DEBUG");
    this.tabDebug.obj.visible = false;
    this.tabDebug.obj.enabled = false;
    this.tabDebug.obj.text = "";
    this.tabDebug.addStaticText("Why are you even here?");
    var grpDebug = this.tabDebug.addGroup(Style.OptionsTab);
    this.cbUserDebug = grpDebug.addCheckbox("User Debug Mode");
    this.cbUserDebug.helpTip = "Note: This will slow down ESL considerably.";
    this.cbUserDebug.value = Prefs.getAsBool(Config.prefKey.UserDebug);
    grpDebug.addButton("Reset Prefs", Util.bind(this.btnResetPrefsClick, this));
    grpDebug.addButton(
      "Reveal Log File",
      Util.bind(this.btnRevealLogClick, this),
    );
    var grpCounts = grpDebug.addGroup(Style.OptionsTab);
    grpCounts.obj.alignChildren = ["fill", "fill"];
    this.stExplodeCount = grpCounts.addStaticText(
      "Shapes Exploded: " + Prefs.getAsInt(Config.prefKey.ExplodeCount),
    );
    this.stMergeCount = grpCounts.addStaticText(
      "Shapes Merged: " + Prefs.getAsInt(Config.prefKey.MergeCount),
    );
    this.stConvertCount = grpCounts.addStaticText(
      "Items Converted: " + Prefs.getAsInt(Config.prefKey.ConvertCount),
    );
    this.stArtboardCount = grpCounts.addStaticText(
      "Artboards Removed: " + Prefs.getAsInt(Config.prefKey.ArtboardCount),
    );
    this.win.addStaticText(es4ZL.getRegistration());
    var grpMeta = this.win.addGroup(Style.FillTopRow);
    grpMeta.addButton("OK", Util.bind(this.save, this));
    grpMeta.addButton("Cancel", Util.bind(this.close, this));
    grpMeta.addButton("Help", Util.bind(this.launchHelp, this));
    this.init();
  }
  function ProgressUI(title, primaryText, maxValue) {
    this.win = aeq.ui.createWindow(Config.name + ": " + title);
    this.stPrimary = this.win.addStaticText(primaryText + " (000%)");
    this.pbar = this.win.addProgressbar(0, maxValue);
    this.pbar.preferredSize = [300, 20];
  }
  function centerLayerAnchor(targetLayer) {
    function setPropValue(curProp, value) {
      var comp = curProp.propertyGroup(curProp.propertyDepth).containingComp;
      if (curProp.numKeys < 1) {
        curProp.setValue(value);
      } else {
        curProp.setValueAtTime(comp.time, value);
      }
    }
    var comp = targetLayer.containingComp;
    Log.trace(
      "--> centerLayerAnchor: " + targetLayer.name + " in comp " + comp.name,
    );
    var sourceRect = targetLayer.sourceRectAtTime(comp.time, false);
    if (sourceRect.width === 0) {
      sourceRect.width = 0.1;
    }
    if (sourceRect.height === 0) {
      sourceRect.height = 0.1;
    }
    var newAnch = [sourceRect.width / 2, sourceRect.height / 2, 0];
    var oldAnch = targetLayer.anchorPoint.value;
    var anchProp = targetLayer.anchorPoint;
    var xAdjust = newAnch[0] + sourceRect.left;
    var yAdjust = newAnch[1] + sourceRect.top;
    var zAdjust = 0;
    setPropValue(anchProp, [xAdjust, yAdjust, 0]);
    var xShift = (xAdjust - oldAnch[0]) * (targetLayer.scale.value[0] / 100);
    var yShift = (yAdjust - oldAnch[1]) * (targetLayer.scale.value[1] / 100);
    var zShift = (zAdjust - oldAnch[2]) * (targetLayer.scale.value[2] / 100);
    var positionShift = [xShift, yShift, zShift];
    var posProp = targetLayer.position;
    var xPos = posProp.value[0];
    var yPos = posProp.value[1];
    var zPos = posProp.value[2];
    if (posProp.dimensionsSeparated === true) {
      var splitProp = [
        targetLayer.property("ADBE Transform Group")("ADBE Position_0"),
        targetLayer.property("ADBE Transform Group")("ADBE Position_1"),
        targetLayer.property("ADBE Transform Group")("ADBE Position_2"),
      ];
      xPos = splitProp[0].value;
      yPos = splitProp[1].value;
      zPos = splitProp[2].value;
    }
    var offsetAngle =
      Math.atan2(positionShift[1], positionShift[0]) * (180 / Math.PI);
    var baseAngle = targetLayer.property("ADBE Transform Group")(
      "ADBE Rotate Z",
    ).value;
    var targetAngle = ((baseAngle + offsetAngle) * Math.PI) / 180;
    var circleRadius = Math.sqrt(
      Math.pow(positionShift[0], 2) + Math.pow(positionShift[1], 2),
    );
    var newX = xPos + circleRadius * Math.cos(targetAngle);
    var newY = yPos + circleRadius * Math.sin(targetAngle);
    var newZ = zPos + positionShift[2];
    if (posProp.dimensionsSeparated === true) {
      setPropValue(splitProp[0], newX);
      setPropValue(splitProp[1], newY);
      if (targetLayer.threeDLayer) {
        setPropValue(splitProp[2], newZ);
      }
    } else {
      setPropValue(posProp, [newX, newY, newZ]);
    }
    Log.trace("<-- centerLayerAnchor");
  }
  function Main() {
    this.init();
  }
  var convert = (function () {
    function doConvert(options) {
      var startLineNum = $.line - 7;
      Log.trace("--> doConvert");
      var aeVersion = parseFloat(app.version);
      var comp = aeq.getActiveComp();
      if (aeq.isNullOrUndefined(comp)) {
        Log.trace("<-- doConvert: No comp!");
        return;
      }
      var userLayers = aeq.getSelectedLayers(comp).filter(function (layer) {
        return aeq.isAVLayer(layer) || aeq.isTextLayer(layer);
      });
      if (aeq.isEmpty(userLayers)) {
        Log.trace("<-- doConvert: No layers!");
        return;
      }
      if (Config.globals.trial && userLayers.length > 5) {
        userLayers.length = 5;
      }
      var pBar = new ProgressUI(
        "Converting...",
        "Converting Layer XXX/XXX",
        userLayers.length,
      );
      pBar.show();
      userLayers.forEach(function (layer) {
        layer.selected = false;
      });
      var converted = 0;
      for (var ii = 0, il = userLayers.length; ii < il; ii++) {
        pBar.update("Converting Layer " + ii + 1 + "/" + pBar.pbar.maxvalue);
        var thisLayer = userLayers[ii];
        var isText = aeq.isTextLayer(thisLayer);
        thisLayer.selected = true;
        var oldName =
          thisLayer.name.indexOf(".") > -1
            ? thisLayer.name.substr(0, thisLayer.name.lastIndexOf("."))
            : thisLayer.name;
        var oldNumLayers = comp.numLayers;
        if (isText) {
          try {
            app.executeCommand(3781);
          } catch (e) {}
        } else {
          try {
            app.executeCommand(3973);
          } catch (e) {}
        }
        var layerCreated = comp.numLayers !== oldNumLayers;
        if (!layerCreated) {
          throw Util.buildError(
            "Couldn\'t convert layer " + oldName,
            "convert",
            $.line - startLineNum,
          );
        }
        converted++;
        var newLayer = comp.layers[1];
        if (aeVersion >= 14) {
          newLayer = comp.layers[thisLayer.index - 1];
        }
        newLayer.selected = false;
        var tempName = newLayer.name;
        var oldNameArray = oldName.split(" ");
        var tempNameArray = tempName.split(" ");
        if (
          aeq.isShapeLayer(newLayer) &&
          tempNameArray.length === oldNameArray.length + 1 &&
          tempNameArray.slice(0, -1).join(" ") === oldName
        ) {
          if (!options.appendLayerName) {
            newLayer.name = tempName.slice(0, oldName.length);
          }
          if (aeVersion < 14) {
            newLayer.moveBefore(thisLayer);
          }
          if (
            !isText &&
            Prefs.getAsBool(Config.prefKey.RemoveArtboardAfterConvert)
          ) {
            removeLayerArtboard(newLayer, { removeEmptyGroups: true });
          }
          if (options.centreAnchorPoints) {
            centerLayerAnchor(newLayer);
          }
          var layerPropTree = {};
          layerPropTree[thisLayer.index - 1] = [];
          Core.copySwitches(layerPropTree, newLayer);
          if (Prefs.getAsBool(Config.prefKey.DeleteSource)) {
            Core.processDelete(thisLayer);
          } else {
            thisLayer.selected = false;
          }
        }
      }
      pBar.close();
      var convertCount = Prefs.getAsInt(Config.prefKey.ConvertCount);
      convertCount += converted;
      Prefs.set(Config.prefKey.ConvertCount, convertCount);
      Log.trace("<--- doConvert");
    }
    return function convert() {
      Log.trace("--> convert");
      app.beginUndoGroup(Config.name + ": Convert to Shape Layer");
      var centreAnchorPoints = Prefs.getAsBool(
        Config.prefKey.CentreAnchorPoints,
      );
      var appendLayerName = Prefs.getAsBool(Config.prefKey.AppendLayerName);
      var mods = aeq.getModifiers();
      if (mods.ctrl || mods.meta) {
        new OptionsUI().show();
        Log.trace("<-- convert: Launched options");
        return;
      }
      try {
        doConvert({
          appendLayerName: appendLayerName,
          centreAnchorPoints: centreAnchorPoints,
        });
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
      Log.trace("<-- convert");
    };
  })();
  var aeq = (function () {
    var aeq = function (selector, context) {
      if (aeq.isNullOrUndefined(selector)) {
        return selector;
      }
      if (aeq.isAeq(selector)) {
        result = selector;
      } else {
        if (aeq.isString(selector)) {
          result = aeq.select(selector, context);
        } else {
          if (aeq.isArray(selector)) {
            result = aeq.arrayEx(selector);
          } else {
            if (aeq.isApp(selector)) {
              result = aeq.app;
            } else {
              if (aeq.isComp(selector)) {
                result = new aeq.Comp(selector);
              } else {
                if (aeq.isLayer(selector)) {
                  result = new aeq.Layer(selector);
                } else {
                  if (aeq.isProperty(selector)) {
                    result = new aeq.Property(selector);
                  }
                }
              }
            }
          }
        }
      }
      result.aeq = true;
      return result;
    };
    aeq.version = "0.6.0";
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
            if (!options.hasOwnProperty(name)) {
              continue;
            }
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
                target[name] = copy;
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
      return aeq.arrayEx(filteredArr);
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
        } else {
          if (arguments.length === 2) {
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
          } else {
            if (aeq.isComp(obj)) {
              aeq.forEachLayer(obj, function (layer) {
                aeq.forEachEffect(layer, callback);
              });
            } else {
              if (aeq.isArray(obj)) {
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
          } else {
            if (aeq.isArray(obj)) {
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
          } else {
            if (aeq.isComp(obj)) {
              aeq.forEachLayer(obj, function (layer) {
                var properties = aeq.getPropertyChildren(layer, {});
                aeq.forEach(properties, callback);
              });
            } else {
              if (aeq.isArray(obj)) {
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
          } else {
            if (aeq.isArray(context)) {
              results = context;
            } else {
              results = [context];
            }
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
            "\nScript File: " +
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
            } else {
              if (parseInt(appVersion) === 12) {
                versionPrettyName = "CC";
              } else {
                if (appVersion >= 13 && appVersion < 13.5) {
                  versionPrettyName = "CC 2014";
                } else {
                  if (appVersion >= 13.5 && appVersion < 14) {
                    versionPrettyName = "CC 2015";
                  } else {
                    if (appVersion >= 14) {
                      versionPrettyName = "CC 2017";
                    }
                  }
                }
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
          getFilesRecursive: function (folder, filter) {
            var foundItems = aeq.arrayEx();
            var folderObject = aeq.file.getFolder(folder);
            if (aeq.isNullOrUndefined(folderObject)) {
              return foundItems;
            }
            aeq.file
              .getFiles(folderObject)
              .filter(function (item) {
                return aeq.isFolder(item);
              })
              .forEach(function (folderItem) {
                foundItems = foundItems.concat(
                  aeq.file.getFilesRecursive(folderItem, filter),
                );
              });
            var filesInFolder = aeq.file.getFiles(folderObject, filter);
            if (!aeq.isNullOrUndefined(filesInFolder)) {
              foundItems = foundItems.concat(filesInFolder);
            }
            return aeq.arrayEx(foundItems);
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
              } else {
                if (last === "..") {
                  parts.splice(i, 1);
                  up++;
                } else {
                  if (up) {
                    parts.splice(i, 1);
                    up--;
                  }
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
          selectFiles: function (extensionList, multiSelect) {
            multiSelect = aeq.setDefault(multiSelect, false);
            var message = multiSelect
              ? "Please select multiple files"
              : "Please select file";
            if (!aeq.isArray(extensionList)) {
              extensionList = [extensionList];
            }
            var getFilterForFiles = function () {
              if (aeq.isWin) {
                return "*." + extensionList.join(";*.");
              }
              var extensionListRe = ".(" + extensionList.join("|") + ")$";
              var re = new RegExp(extensionListRe, "i");
              return function (file) {
                return (
                  file.name.match(re) || file.constructor.name === "Folder"
                );
              };
            };
            var files = File.openDialog(
              message,
              getFilterForFiles(),
              multiSelect,
            );
            if (aeq.isNullOrUndefined(files)) {
              return null;
            }
            if (!aeq.isArray(files)) {
              files = [files];
            }
            return aeq.arrayEx(files);
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
      aeq.getFilesRecursive = aeq.file.getFilesRecursive;
      aeq.getFolder = aeq.file.getFolder;
      aeq.readFile = aeq.file.readFile;
      aeq.writeFile = aeq.file.writeFile;
      aeq.selectFiles = aeq.file.selectFiles;
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
          copyLayerToggles: function (sourceLayer, destLayer) {
            var switches =
              "enabled solo shy quality effectsActive motionBlur adjustmentLayer threeDLayer blendingMode preserveTransparency parent inPoint stretch startTime outPoint label guideLayer name comment autoOrient";
            switches = switches.split(" ");
            aeq.forEach(switches, function (switchName) {
              destLayer[switchName] = sourceLayer[switchName];
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
          getSelectedCompsOrAll: function () {
            if (aeq.isEmpty(app.project.selection)) {
              return aeq.getCompositions();
            }
            return aeq.project.getSelectedComps();
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
          setOrGetDefault: function (value, defaultVal) {
            if (typeof value !== "undefined") {
              return value;
            }
            if (typeof defaultVal === "function") {
              return defaultVal();
            }
            return defaultVal;
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
        findIndex: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              return i;
            }
          }
          return -1;
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
          var keyInfo = this.getKeyInfo();
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
        getKeyInfo: function () {
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
            } else {
              if (this.valueTypeIs("ThreeD")) {
                inType = [inType, inType, inType];
              } else {
                inType = [inType];
              }
            }
          }
          if (outType && !aeq.isArray(outType)) {
            if (this.valueTypeIs("TwoD")) {
              outType = [outType, outType];
            } else {
              if (this.valueTypeIs("ThreeD")) {
                outType = [outType, outType, outType];
              } else {
                outType = [outType];
              }
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
          for (var i = 0; i < this.property.selectedKeys.length; i += 1) {
            selectedKeys.push(this.key(this.property.selectedKeys[i]));
          }
          return aeq.arrayEx(selectedKeys);
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
            } else {
              if (ch === "\r" || ch === "\u2028" || ch === "\u2029") {
                details.line++;
                details.column = 1;
                details.seenCR = true;
              } else {
                details.column++;
                details.seenCR = false;
              }
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
            } else {
              if (a.description > b.description) {
                return 1;
              } else {
                return 0;
              }
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
        var newListBox = this._add("listbox", {
          arg1: arg1,
          onChange: onChange,
          onDoubleClick: onDoubleClick,
          properties: properties,
        });
        return new ui.ListBox(newListBox);
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
      addStaticText: function (text, properties) {
        return this._add("statictext", { arg1: text, properties: properties });
      },
      addTab: function (text) {
        var tab = this.obj.add("tab", undefined, text);
        return new ui.Container(tab);
      },
      addTabbedPanel: function () {
        var tabbedpanel = this.obj.add("tabbedpanel");
        return new ui.Container(tabbedpanel);
      },
      addTreeView: function (items, onChange, properties) {
        var newTreeView = this._add("treeview", {
          arg1: items,
          onChange: onChange,
          properties: properties,
        });
        return new ui.TreeView(newTreeView);
      },
      extend: aeq.extend,
      get: function () {
        return this.obj;
      },
      getChildren: function () {
        return this.obj.children;
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
    ui.ListBox = function (obj) {
      this.obj = obj;
    };
    ui.ListBox.prototype = {
      addItem: function (text, image, index) {
        var item = this.obj.add("item", text, index);
        if (!aeq.isNullOrUndefined(image)) {
          item.image = image;
        }
        return item;
      },
      addRow: function (itemArray) {
        var root = this.getAncestor(this.obj).parent;
        if (aeq.isNullOrUndefined(root.properties)) {
          return;
        }
        var numColumns = root.properties.numberOfColumns;
        var maxItems =
          itemArray.length > numColumns ? numColumns : itemArray.length;
        var item = this.addItem(itemArray[0]);
        for (var i = 0, il = maxItems - 1; i < il; i++) {
          item.subItems[i].text = itemArray[i + 1];
        }
        return item;
      },
      contiguous: function (sel) {
        if (!aeq.isArray(sel)) {
          return true;
        }
        var firstIndex = sel[0].index;
        var lastIndex = sel[sel.length - 1].index;
        return sel.length === lastIndex - firstIndex + 1;
      },
      extend: aeq.extend,
      getAncestor: function (item) {
        while (item.parent.constructor.name !== "ListBox") {
          item = item.parent;
        }
        return item;
      },
      getSelection: function () {
        var selection = this.obj.selection;
        if (aeq.isNullOrUndefined(selection)) {
          return aeq.arrayEx();
        }
        return aeq.arrayEx(selection);
      },
      moveDown: function () {
        var selection = this.obj.selection;
        var items = this.obj.items;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var last = selection.index;
        var first = last;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = selection[selection.length - 1].index;
        }
        if (last === items.length - 1) {
          return;
        }
        for (i = last; i >= first; i--) {
          var thisItem = items[i];
          var nextItem = items[i + 1];
          this.swap(thisItem, nextItem);
        }
        this.obj.selection = null;
        for (i = first + 1; i <= last + 1; i++) {
          this.obj.selection = i;
        }
      },
      moveToBottom: function () {
        var selection = this.obj.selection;
        var items = this.obj.items;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var last = selection.index;
        var first = last;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = selection[selection.length - 1].index;
        }
        if (last === items.length - 1) {
          return;
        }
        var spanLength = items.length - last - 1;
        for (var j = 0, jl = spanLength; j < jl; j++) {
          for (i = last; i >= first; i--) {
            var thisItem = items[i + j];
            var nextItem = items[i + j + 1];
            this.swap(thisItem, nextItem);
          }
        }
        this.obj.selection = null;
        for (i = spanLength + first, il = items.length; i < il; i++) {
          this.obj.selection = i;
        }
      },
      moveToTop: function () {
        var selection = this.obj.selection;
        var items = this.obj.items;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var first = selection.index;
        var last = first + 1;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = first + selection.length;
        }
        if (first === 0) {
          return;
        }
        for (var j = 0, jl = first; j < jl; j++) {
          for (i = first; i < last; i++) {
            var thisItem = items[i - j];
            var lastItem = items[i - j - 1];
            this.swap(thisItem, lastItem);
          }
        }
        this.obj.selection = null;
        for (i = 0, il = last - first; i < il; i++) {
          this.obj.selection = i;
        }
      },
      moveUp: function () {
        var items = this.obj.items;
        var selection = this.obj.selection;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var first = selection.index;
        var last = first + 1;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = first + selection.length;
        }
        if (first === 0) {
          return;
        }
        for (i = first; i < last; i++) {
          var thisItem = items[i];
          var lastItem = items[i - 1];
          this.swap(thisItem, lastItem);
        }
        this.obj.selection = null;
        for (i = first - 1; i < last - 1; i++) {
          this.obj.selection = i;
        }
      },
      removeAll: function () {
        while (this.obj.items.length > 0) {
          var item = this.obj.items[0];
          this.removeItem(item);
        }
      },
      removeItem: function (item) {
        item = aeq.setDefault(item, this.obj.selection);
        if (aeq.isNullOrUndefined(item)) {
          return;
        }
        this.obj.remove(item);
      },
      swap: function (a, b) {
        var temp = a.text;
        a.text = b.text;
        b.text = temp;
      },
      toString: function () {
        return "[object aeq.ui.ListBox]";
      },
    };
    ui.ListBox.prototype.add = ui.ListBox.prototype.addItem;
    return ui;
  })(aeq.ui || {});
  aeq.ui = (function (ui) {
    ui.createMainWindow = function (thisObj, title, options) {
      if (aeq.isPanel(thisObj)) {
        return new ui.Window(thisObj);
      }
      if (aeq.isString(thisObj)) {
        options = title;
        title = thisObj;
      }
      options = aeq.setDefault(options, { resizeable: true });
      var root = new Window("palette", title, undefined, options);
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
    ui.TreeView = function (obj) {
      this.obj = obj;
    };
    ui.TreeView.prototype = ui.ListBox.prototype;
    ui.TreeView.prototype.toString = function () {
      return "[object aeq.ui.TreeView]";
    };
    ui.TreeView.prototype.revealItem = function (name) {
      var tree = this.obj;
      var items = this.findItemByName(tree, [], name);
      if (tree.items.length === 0 || items.length === 0) {
        tree.selection = null;
        return;
      }
      var item = items[0];
      var temp = item;
      while (item.parent.constructor.name !== "TreeView") {
        item.parent.expanded = true;
        item = item.parent;
      }
      tree.selection = temp;
      tree.active = true;
    };
    ui.TreeView.prototype.addNode = function (text, image, index, expanded) {
      expanded = aeq.setDefault(expanded, true);
      var node = this.obj.add("node", text, index);
      if (!aeq.isNullOrUndefined(image)) {
        node.image = image;
      }
      node.expanded = expanded;
      return new ui.TreeView(node);
    };
    ui.TreeView.prototype.getAncestor = function (item) {
      while (item.parent.constructor.name !== "TreeView") {
        item = item.parent;
      }
      return item;
    };
    ui.TreeView.prototype.removeAncestor = function (item) {
      var ancestor = this.getAncestor(item);
      this.removeItem(ancestor);
    };
    ui.TreeView.prototype.expandNodes = function (node) {
      node.expanded = true;
      for (var i = 0, il = node.items.length; i < il; i++) {
        var branch = node.items[i];
        if (this.isNode(branch)) {
          this.expandNodes(branch);
        }
      }
    };
    ui.TreeView.prototype.collapseNodes = function (node) {
      node.expanded = false;
      var branches = node.items;
      for (var i = 0, il = branches.length; i < il; i++) {
        var branch = branches[i];
        if (this.isNode(branch)) {
          this.collapseNodes(branch);
        }
      }
    };
    ui.TreeView.prototype.findItemByName = function (node, list, name) {
      var branches = node.items;
      for (var i = 0, il = branches.length; i < il; i++) {
        var branch = branches[i];
        if (branch.text !== name) {
          continue;
        }
        if (this.isNode(branch)) {
          this.findItemByName(branch, list, name);
        }
        list.push(branch);
      }
      return list;
    };
    ui.TreeView.prototype.copyBranch = function (node, nodeCopy) {
      var newNode = nodeCopy.add(node.type, node.text);
      var me = this;
      if (!this.isNode(node)) {
        return;
      }
      var branches = node.items;
      aeq.forEach(branches, function (branch) {
        if (me.isNode(branch)) {
          me.copyBranch(branch, newNode);
        } else {
          newNode.add("item", node.text);
        }
      });
    };
    ui.TreeView.prototype.isNode = function (branch) {
      if (aeq.isNullOrUndefined(branch)) {
        return false;
      }
      return branch.type === "node";
    };
    ui.TreeView.prototype.isItem = function (branch) {
      if (aeq.isNullOrUndefined(branch)) {
        return false;
      }
      return branch.type === "item";
    };
    ui.TreeView.prototype.moveUp = function () {
      var tree = this.obj;
      if (tree.selection === null) {
        return;
      }
      if (tree.selection.index > 0) {
        var sel = tree.selection;
        var prev = sel.parent.items[sel.index - 1];
        if (this.isItem(sel) && this.isItem(prev)) {
          this.swap(sel, prev);
          tree.selection = prev;
          return;
        }
        if (this.isNode(sel) && this.isItem(prev)) {
          sel.parent.add("item", prev.text, sel.index + 1);
          this.removeItem(sel);
          return;
        }
        if (this.isItem(sel) && this.isNode(prev)) {
          tree.selection = sel.parent.add("item", sel.text, sel.index - 1);
          this.removeItem(sel);
          return;
        }
        var target = sel.parent.add("node", sel.text, sel.index - 1);
        for (var i = 0, il = target.length; i < il; i++) {
          this.copyBranch(sel.items[i], target);
        }
        tree.selection = target;
        this.removeItem(sel);
      }
    };
    ui.TreeView.prototype.moveDown = function () {
      var tree = this.obj;
      if (tree.selection === null) {
        return;
      }
      if (tree.selection.index < tree.items.length - 1) {
        var sel = tree.selection;
        var next = sel.parent.items[sel.index + 1];
        if (this.isItem(sel) && this.isItem(next)) {
          this.swap(sel, next);
          tree.selection = next;
          return;
        }
        if (this.isNode(sel) && this.isItem(next)) {
          sel.parent.add("item", next.text, sel.index - 1);
          this.removeItem(next);
          return;
        }
        if (this.isItem(sel) && this.isNode(next)) {
          tree.selection = sel.parent.add("item", sel.text, sel.index + 1);
          this.removeItem(sel);
          return;
        }
        var target = sel.parent.add("node", sel.text, sel.index + 2);
        for (var i = 0, il = target.length; i < il; i++) {
          this.copyBranch(sel.items[i], target);
        }
        tree.selection = target;
        this.removeItem(sel);
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
      return 0 <= e.result;
    }
    function isResultTrial(e) {
      return 100 == e || -100 == e;
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
    var wx = __BLOB__BLOB_000119__;
    var mx = __BLOB__BLOB_000120__;
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
      en: "Trial Expired",
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
          title: "Trial expired",
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
  "object" != typeof JSON && (JSON = {});
  (function () {
    function f(t) {
      return t < 10 ? "0" + t : t;
    }
    function this_value() {
      return this.valueOf();
    }
    function quote(t) {
      return (
        (rx_escapable.lastIndex = 0),
        rx_escapable.test(t)
          ? '"' +
            t.replace(rx_escapable, function (t) {
              var e = meta[t];
              return "string" == typeof e
                ? e
                : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + t + '"'
      );
    }
    function str(t, e) {
      var a = gap;
      var i = e[t];
      switch (
        (i &&
          "object" == typeof i &&
          "function" == typeof i.toJSON &&
          (i = i.toJSON(t)),
        "function" == typeof rep && (i = rep.call(e, t, i)),
        typeof i)
      ) {
        case "string":
          return quote(i);
        case "number":
          return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
          return String(i);
        case "object":
          if (!i) {
            return "null";
          }
          if (
            ((gap += indent),
            (f = []),
            "[object Array]" === Object.prototype.toString.apply(i))
          ) {
            for (u = i.length, r = 0; r < u; r += 1) {
              f[r] = str(r, i) || "null";
            }
            return (
              (o =
                0 === f.length
                  ? "[]"
                  : gap
                    ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]"
                    : "[" + f.join(",") + "]"),
              (gap = a),
              o
            );
          }
          if (rep && "object" == typeof rep) {
            for (u = rep.length, r = 0; r < u; r += 1) {
              "string" == typeof rep[r] &&
                ((n = rep[r]),
                (o = str(n, i)),
                o && f.push(quote(n) + gap ? ": " : ":" + o));
            }
          } else {
            for (var n in i) {
              Object.prototype.hasOwnProperty.call(i, n) &&
                ((o = str(n, i)), o && f.push(quote(n) + gap ? ": " : ":" + o));
            }
          }
          return (
            (o =
              0 === f.length
                ? "{}"
                : gap
                  ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}"
                  : "{" + f.join(",") + "}"),
            (gap = a),
            o
          );
      }
    }
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three =
      /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable =
      /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous =
      /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function () {
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
      }),
      (Boolean.prototype.toJSON = this_value),
      (Number.prototype.toJSON = this_value),
      (String.prototype.toJSON = this_value));
    "function" != typeof JSON.stringify &&
      ((meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      }),
      (JSON.stringify = function (t, e, r) {
        if (((gap = ""), (indent = ""), "number" == typeof r)) {
          for (var n = 0; n < r; n += 1) {
            indent += " ";
          }
        } else {
          "string" == typeof r && (indent = r);
        }
        if (
          ((rep = e),
          e &&
            "function" != typeof e &&
            ("object" != typeof e || "number" != typeof e.length))
        ) {
          throw new Error("JSON.stringify");
        }
        return str("", { "": t });
      }));
    "function" != typeof JSON.parse &&
      (JSON.parse = function (text, reviver) {
        function walk(t, e) {
          var o = t[e];
          if (o && "object" == typeof o) {
            for (var r in o) {
              Object.prototype.hasOwnProperty.call(o, r) &&
                ((n = walk(o, r)), void 0 !== n ? (o[r] = n) : delete o[r]);
            }
          }
          return reviver.call(t, e, o);
        }
        if (
          ((text = String(text)),
          (rx_dangerous.lastIndex = 0),
          rx_dangerous.test(text) &&
            (text = text.replace(rx_dangerous, function (t) {
              return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            })),
          rx_one.test(
            text
              .replace(rx_two, "@")
              .replace(rx_three, "]")
              .replace(rx_four, ""),
          ))
        ) {
          return (
            (j = eval("(" + text + ")")),
            "function" == typeof reviver ? walk({ "": j }, "") : j
          );
        }
        throw new SyntaxError("JSON.parse");
      });
  })();
  var Config = {
    defaults: {
      appendLayerName: false,
      artboardCount: 0,
      centreAnchorPoints: true,
      convertCount: 0,
      deleteSource: false,
      explodeCount: 0,
      explodeKeepsColours: true,
      heavyThreshold: 30,
      lastAEVersion: "",
      lastLicense: "",
      lastVersion: "0.0.0",
      mergeCount: 0,
      removeArtboardAfterConvert: true,
      showArtboard: true,
      showConvert: true,
      showExplode: true,
      showHeavyWarning: true,
      showMerge: true,
      showSelectFills: true,
      showSelectStrokes: true,
      useGraphicButtons: true,
      userDebug: false,
    },
    globals: {
      debug: eval("false"),
      logMaxSize: 2000000,
      resourcePath: aeq.file.joinPath(
        aeq.app.getUserDataFolder().fsName,
        "aescripts",
        "Explode Shape Layers",
      ),
      trial: false,
    },
    lic: {
      betaExpirationDate: new Date("Dec 1, 2017"),
      betaStartDate: new Date("Nov 1, 2017"),
      betaSupportEmail: "http://aescripts.com/contact",
      helpButtons: [
        {
          name: "Other Products",
          url: "http://aescripts.com/authors/zack-lovatt",
        },
      ],
      helpText: [
        "Explode Shape Layers v3.5.2",
        "by Zack Lovatt (http://zacklovatt.com)",
        "",
        "This script can explode a shape layer\'s shapes to their own individual layers, or merge shape layers together into a new layer.",
        "",
        "Functions:",
        "  \u2022 Explode - Explode a shape layer to individual layers",
        "  \u2022 Merge - Merge shape layers together to a new layer",
        "  \u2022 Convert - Convert vector to shape layer",
        "  \u2022 Remove Artboards - Removes AI artboard artifact",
        "        \u203a Hold SHIFT to delete empty groups",
        "  \u2022 Select Fills - Select all fills in current layer",
        "        \u203a Hold ALT to select fills with the same colour",
        "  \u2022 Select Strokes - Select all strokes in current layer",
        "        \u203a Hold ALT to select strokes with the same colour",
        "",
        "Behaviour:",
        "  \u2022 Delete Source - Delete (or hide) the original layer(s) or shape group(s)",
        "  \u2022 Centre Anchor Points - Explode: Centre (or preserve) new layer anchors",
        "  \u2022 Explode Fills & Strokes? - Whether Explode should also explode top-level fills/strokes/etc",
        '  \u2022 Append Layer Names - Explode: Include layer name in new shapes; Convert: Keep "Outlines"',
        "  \u2022 Remove Artboard After Convert - Whether to try removing artboard after converting a vector layer",
        "  \u2022 Show Heavy Warning - Whether to warn you if you\'re about to explode a heavy layer",
        "  \u2022 Heavy Threshold - How many shapes to explode before giving a warning",
        "",
        "Look & Feel:",
        "  \u2022 Use Graphic Buttons - Toggle graphic or text buttons",
        "  \u2022 These toggle whether to show or hide tools in the UI",
      ].join("\n"),
      offerBeta: false,
      offerTrial: true,
      privateNumber: 7139456509179369,
      productSKU: "ZLESL3-SUL",
      scriptAuthor: "Zack Lovatt",
      scriptName: "Explode Shape Layers",
      scriptURL: "https://aescripts.com/explode-shape-layers/",
      scriptVersion: "3.5.2",
    },
    name: "Explode Shape Layers",
    prefKey: {
      AppendLayerName: "appendLayerName",
      ArtboardCount: "artboardCount",
      CentreAnchorPoints: "centreAnchorPoints",
      ConvertCount: "convertCount",
      DeleteSource: "deleteSource",
      ExplodeCount: "explodeCount",
      ExplodeKeepsColours: "explodeKeepsColours",
      HeavyThreshold: "heavyThreshold",
      LastAEVersion: "lastAEVersion",
      LastLicense: "lastLicense",
      LastVersion: "lastVersion",
      MergeCount: "mergeCount",
      RemoveArtboardAfterConvert: "removeArtboardAfterConvert",
      ShowArtboard: "showArtboard",
      ShowConvert: "showConvert",
      ShowExplode: "showExplode",
      ShowHeavyWarning: "showHeavyWarning",
      ShowMerge: "showMerge",
      ShowSelectFills: "showSelectFills",
      ShowSelectStrokes: "showSelectStrokes",
      UseGraphicButtons: "useGraphicButtons",
      UserDebug: "userDebug",
    },
    version: "3.5.2",
  };
  var Util = (function () {
    function bind(func, oThis) {
      if (typeof func !== "function") {
        throw new TypeError(
          "Function.prototype.bind - what is trying to be bound is not callable",
        );
      }
      var aArgs = Array.prototype.slice.call(arguments, 2);
      var fToBind = func;
      var fNOP = function () {};
      var fBound = function () {
        return fToBind.apply(
          this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)),
        );
      };
      fNOP.prototype = func.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    }
    function replaceAll(string, search, replace) {
      return string.split(search).join(replace);
    }
    function cleanString(input) {
      var output = "";
      for (var ii = 0; ii < input.length; ii += 1) {
        var nextChar = "?";
        if (input.charCodeAt(ii) <= 127) {
          nextChar = input.charAt(ii);
        }
        output += nextChar;
      }
      return output;
    }
    function buildDateString() {
      var date = new Date();
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var formattedmm = mm < 10 ? "0" : "" + mm;
      var formatteddd = dd < 10 ? "0" : "" + dd;
      return yyyy.toString() + formattedmm.toString() + formatteddd.toString();
    }
    function buildTimeString() {
      var date = new Date();
      var hh = date.getHours();
      var mm = date.getMinutes();
      var ss = date.getSeconds();
      var formattedmm = mm < 10 ? "0" : "" + mm;
      var formattedss = ss < 10 ? "0" : "" + ss;
      return hh.toString() + formattedmm.toString() + formattedss.toString();
    }
    function buildError(msg, fileName, line, e) {
      function getStack() {
        var stack = aeq.arrayEx($.stack.split("\n"));
        stack.length -= 3;
        return stack
          .filter(function (line) {
            return line.indexOf("anonymous()") === -1;
          })
          .join(" >> ");
      }
      fileName = aeq.setDefault(
        fileName,
        File.decode($.fileName).replace(/^.*[\|\/]/, ""),
      );
      fileName = /[^\\|^\/]*$/g.exec(fileName);
      if (aeq.isNullOrUndefined(fileName)) {
        fileName = "";
      }
      var stack = getStack();
      var split = "----------------";
      var fileLine = "File:  " + fileName.toString();
      var lineLine = "Line:  " + line.toString();
      var stackLine = "Stack: " + stack.toString();
      var output = [msg, split, fileLine, lineLine, stackLine, split].join(
        "\n",
      );
      if (!aeq.isNullOrUndefined(e)) {
        output += "\n" + String(e);
      }
      Log.error(output);
      if (
        !(Config.globals.debug || Prefs.getAsBool(Config.prefKey.UserDebug))
      ) {
        return msg;
      }
      return output;
    }
    function roundVal(val, precision) {
      return parseFloat(val.toFixed(precision));
    }
    function secondsToMMSS(val) {
      var minutes = parseInt(String(val / 60));
      var seconds = parseInt(String(val - 60 * minutes));
      var minutesString =
        minutes > 0 ? (minutes < 10 ? "0" : "" + minutes) : "00";
      var secondsString = val - 60 * minutes < 10 ? "0" : "" + seconds;
      return minutesString + ":" + secondsString;
    }
    function capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    function padDigits(n, length, z) {
      z = aeq.setDefault(z, "0");
      n = String(n);
      return n.length >= length
        ? n
        : new Array(length - n.length + 1).join(z) + n;
    }
    function getOrCreateFile(path, data, options) {
      options = aeq.setDefault(options, {
        encoding: "BINARY",
        overwrite: false,
      });
      var file = aeq.file.getFileObject(path);
      if (!file.exists || file.length !== data.length) {
        options.overwrite = true;
        file = aeq.writeFile(path, data, options);
      }
      return file;
    }
    function clamp(num, min, max) {
      return Math.min(Math.max(num, min), max);
    }
    function arraysEqual(a, b) {
      if (a === b) {
        return true;
      }
      if (a == null || b == null) {
        return false;
      }
      if (a.length != b.length) {
        return false;
      }
      for (var i = 0; i < a.length; i += 1) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    return {
      arraysEqual: arraysEqual,
      bind: bind,
      buildDateString: buildDateString,
      buildError: buildError,
      buildTimeString: buildTimeString,
      capitalizeFirstLetter: capitalizeFirstLetter,
      clamp: clamp,
      cleanString: cleanString,
      getOrCreateFile: getOrCreateFile,
      padDigits: padDigits,
      replaceAll: replaceAll,
      roundVal: roundVal,
      secondsToMMSS: secondsToMMSS,
    };
  })();
  var Log = (function () {
    function buildSpacing() {
      var spacer = "";
      try {
        stack = $.stack.split("\n");
      } catch (e) {
        return spacer;
      }
      stack.length = stack.length - 6;
      aeq.forEach(stack, function (stackItem) {
        if (stackItem.indexOf("anonymous") === -1) {
          spacer += " ";
        }
      });
      return spacer;
    }
    function _log(logLevel, text) {
      if (logLevel < level) {
        return;
      }
      var aepName = aeq.app.getAEPName();
      var aepStr = aepName ? Util.cleanString(aepName) + ".aep" : "Unsaved";
      var timeStr = Util.buildDateString() + "." + Util.buildTimeString();
      var line = [
        levels[logLevel],
        timeStr,
        aepStr,
        buildSpacing() + Util.cleanString(text),
      ].join(" :: ");
      if (
        Config.globals.debug ||
        Prefs.getAsBool(Config.prefKey.UserDebug, { log: false })
      ) {
        writeLn(line);
        $.writeln(line);
      }
      if (logFileObject.length > Config.globals.logMaxSize) {
        clear();
      }
      logFileObject.open("a");
      var success = logFileObject.write(line + "\n");
      logFileObject.close();
      if (!success) {
        alert(
          "Could not write log... " +
            String(logFilePath) +
            " - " +
            String(logFileObject.error),
          "Explode Shape Layers Error",
        );
        return;
      }
      return line;
    }
    function setLevel(logLevel) {
      level = logLevel;
      return level;
    }
    function reveal() {
      aeq.command.revealFile(logFilePath);
    }
    function clear() {
      aeq.app.ensureSecurityPrefEnabled();
      aeq.writeFile(logFileObject, "", { overwrite: true });
      logFileObject = aeq.getFileObject(logFilePath);
    }
    function initLevel() {
      setLevel(
        Config.globals.debug || Prefs.getAsBool(Config.prefKey.UserDebug)
          ? 0
          : 2,
      );
    }
    function debug(text) {
      return _log(0, text);
    }
    function trace(text) {
      return _log(1, text);
    }
    function info(text) {
      return _log(2, text);
    }
    function warning(text) {
      return _log(3, text);
    }
    function error(text) {
      return _log(4, text);
    }
    function fatal(text) {
      return _log(5, text);
    }
    var logFileName = Config.name + " Log.txt";
    var logFilePath = aeq.file.joinPath(
      Config.globals.resourcePath,
      logFileName,
    );
    var logFileObject = aeq.getFileObject(logFilePath);
    aeq.app.ensureSecurityPrefEnabled();
    if (!logFileObject.exists) {
      logFileObject = aeq.file.writeFile(logFileObject, "");
    }
    var level = 2;
    var levels = {
      0: "debug",
      1: "trace",
      2: "info",
      3: "warning",
      4: "error",
      5: "fatal",
    };
    return {
      debug: debug,
      error: error,
      fatal: fatal,
      info: info,
      initLevel: initLevel,
      reveal: reveal,
      setLevel: setLevel,
      trace: trace,
      warning: warning,
    };
  })();
  var Prefs = (function () {
    function savePrefs() {
      app.preferences.saveToDisk();
      app.preferences.reload();
    }
    function set(key, val, options) {
      options = aeq.setDefault(options, {});
      var save = aeq.setDefault(options.save, true);
      var log = aeq.setDefault(options.log, true);
      if (log) {
        Log.trace('Prefs.set: "' + key + '" to ' + JSON.stringify(val));
      }
      if (aeq.isNullOrUndefined(val)) {
        throw Util.buildError(
          "Can\'t save pref " + key + "!",
          "preferences.js",
          $.line - startLineNum,
        );
      }
      var valAsString = typeof val === "string" ? val : JSON.stringify(val);
      app.settings.saveSetting(Config.name, key, encodeURI(valAsString));
      if (save) {
        savePrefs();
      }
    }
    function get(key, options) {
      options = aeq.setDefault(options, {});
      if (!app.settings.haveSetting(Config.name, key)) {
        var value = aeq.setDefault(options.fallback, Config.defaults[key]);
        set(key, value, options);
      }
      var savedValue = app.settings.getSetting(Config.name, key);
      return decodeURI(savedValue);
    }
    function getAsBool(key, options) {
      return get(key, options) === "true";
    }
    function getAsArray(key, options) {
      var prefArray = JSON.parse(get(key, options));
      if (String(prefArray) === "") {
        return aeq.arrayEx();
      }
      return aeq.arrayEx(prefArray);
    }
    function getAsInt(key, options) {
      return parseInt(get(key, options));
    }
    function getAsIntArray(key, options) {
      var strArray = getAsArray(key, options);
      if (strArray.length === 1 && strArray[0] === "") {
        return aeq.arrayEx();
      }
      var outputArray = [];
      for (var ii = 0, il = strArray.length; ii < il; ii++) {
        var strArrayItem = strArray[ii];
        outputArray.push(parseInt(strArrayItem, 10));
      }
      return outputArray;
    }
    function getAsFloat(key, options) {
      return parseFloat(get(key, options));
    }
    function getAsFloatArray(key, options) {
      var strArray = getAsArray(key, options);
      if (strArray.length === 1 && strArray[0] === "") {
        return aeq.arrayEx();
      }
      var outputArray = [];
      for (var ii = 0, il = strArray.length; ii < il; ii++) {
        var strArrayItem = strArray[ii];
        outputArray.push(parseFloat(strArrayItem));
      }
      return outputArray;
    }
    function remove(key, options) {
      if (!app.preferences.havePref("Settings_" + Config.name, key)) {
        return;
      }
      options = aeq.setDefault(options, {});
      var save = aeq.setDefault(options.save, true);
      var log = aeq.setDefault(options.log, true);
      if (log) {
        Log.trace('Prefs.remove: "' + key + '"');
      }
      app.preferences.deletePref("Settings_" + Config.name, key);
      if (save) {
        savePrefs();
      }
    }
    function removeAll() {
      for (var key in Config.defaults) {
        if (!Config.defaults.hasOwnProperty(key)) {
          continue;
        }
        remove(key, { save: false });
      }
      savePrefs();
    }
    function reset(key, options) {
      Log.trace('Prefs.reset: "' + key + '"');
      set(key, Config.defaults[key], options);
      return app.settings.getSetting(Config.name, key);
    }
    function resetAll() {
      for (var key in Config.defaults) {
        if (!Config.defaults.hasOwnProperty(key)) {
          continue;
        }
        reset(key, { save: false });
      }
      savePrefs();
    }
    function getAll() {
      var prefsObj = {};
      for (var key in Config.defaults) {
        if (!Config.defaults.hasOwnProperty(key)) {
          continue;
        }
        prefsObj[key] = get(key);
      }
      return prefsObj;
    }
    var startLineNum = 2;
    return {
      get: get,
      getAll: getAll,
      getAsArray: getAsArray,
      getAsBool: getAsBool,
      getAsFloat: getAsFloat,
      getAsFloatArray: getAsFloatArray,
      getAsInt: getAsInt,
      getAsIntArray: getAsIntArray,
      remove: remove,
      removeAll: removeAll,
      reset: reset,
      resetAll: resetAll,
      savePrefs: savePrefs,
      set: set,
    };
  })();
  OptionsUI.prototype = {
    btnResetPrefsClick: function btnResetPrefsClick() {
      Log.info("Dumping old prefs...");
      Prefs.removeAll();
      this.cbDeleteSource.value = Prefs.getAsBool(Config.prefKey.DeleteSource);
      this.cbCentre.value = Prefs.getAsBool(Config.prefKey.CentreAnchorPoints);
      this.cbKeepColours.value = Prefs.getAsBool(
        Config.prefKey.ExplodeKeepsColours,
      );
      this.cbAppendName.value = Prefs.getAsBool(Config.prefKey.AppendLayerName);
      this.cbRemoveArtboardAfterConvert.value = Prefs.getAsBool(
        Config.prefKey.RemoveArtboardAfterConvert,
      );
      this.cbShowHeavyWarning.value = Prefs.getAsBool(
        Config.prefKey.ShowHeavyWarning,
      );
      this.etHeavyThreshold.text = Prefs.getAsInt(
        Config.prefKey.HeavyThreshold,
      );
      this.cbUseGraphicButtons.value = Prefs.getAsBool(
        Config.prefKey.UseGraphicButtons,
      );
      this.cbShowExplode.value = Prefs.getAsBool(Config.prefKey.ShowExplode);
      this.cbShowMerge.value = Prefs.getAsBool(Config.prefKey.ShowMerge);
      this.cbShowConvert.value = Prefs.getAsBool(Config.prefKey.ShowConvert);
      this.cbShowArtboard.value = Prefs.getAsBool(Config.prefKey.ShowArtboard);
      this.cbShowSelectFills.value = Prefs.getAsBool(
        Config.prefKey.ShowSelectFills,
      );
      this.cbShowSelectStrokes.value = Prefs.getAsBool(
        Config.prefKey.ShowSelectStrokes,
      );
      this.cbUserDebug.value = Prefs.getAsBool(Config.prefKey.UserDebug);
      this.stExplodeCount.text =
        "Shapes Exploded: " + Prefs.getAsInt(Config.prefKey.ExplodeCount);
      this.stMergeCount.text =
        "Shapes Merged: " + Prefs.getAsInt(Config.prefKey.MergeCount);
      this.stConvertCount.text =
        "Items Converted: " + Prefs.getAsInt(Config.prefKey.ConvertCount);
      this.stArtboardCount.text =
        "Artboards Removed: " + Prefs.getAsInt(Config.prefKey.ArtboardCount);
      Log.initLevel();
    },
    btnRevealLogClick: function btnRevealLogClick() {
      Log.debug(JSON.stringify(Prefs.getAll()));
      Log.reveal();
    },
    close: function close() {
      this.win.close();
    },
    init: function init() {},
    launchHelp: function launchHelp() {
      es4ZL.helpUI();
    },
    save: function save() {
      if (aeq.getModifiers().shift) {
        this.tabDebug.obj.visible = !this.tabDebug.obj.visible;
        this.tabDebug.obj.enabled = !this.tabDebug.obj.enabled;
        this.tabDebug.obj.text = this.tabDebug.obj.text === "" ? "DEBUG" : "";
        return;
      }
      var heavyThreshold = parseInt(this.etHeavyThreshold.text, 10);
      if (isNaN(heavyThreshold)) {
        alert("Heavy Threshold must be a number!", Config.name + " Error");
        return;
      }
      Prefs.set(Config.prefKey.DeleteSource, this.cbDeleteSource.value);
      Prefs.set(Config.prefKey.CentreAnchorPoints, this.cbCentre.value);
      Prefs.set(Config.prefKey.ExplodeKeepsColours, this.cbKeepColours.value);
      Prefs.set(Config.prefKey.AppendLayerName, this.cbAppendName.value);
      Prefs.set(
        Config.prefKey.RemoveArtboardAfterConvert,
        this.cbRemoveArtboardAfterConvert.value,
      );
      Prefs.set(Config.prefKey.ShowHeavyWarning, this.cbShowHeavyWarning.value);
      Prefs.set(Config.prefKey.HeavyThreshold, heavyThreshold);
      Prefs.set(
        Config.prefKey.UseGraphicButtons,
        this.cbUseGraphicButtons.value,
      );
      Prefs.set(Config.prefKey.ShowExplode, this.cbShowExplode.value);
      Prefs.set(Config.prefKey.ShowMerge, this.cbShowMerge.value);
      Prefs.set(Config.prefKey.ShowConvert, this.cbShowConvert.value);
      Prefs.set(Config.prefKey.ShowArtboard, this.cbShowArtboard.value);
      Prefs.set(Config.prefKey.ShowSelectFills, this.cbShowSelectFills.value);
      Prefs.set(
        Config.prefKey.ShowSelectStrokes,
        this.cbShowSelectStrokes.value,
      );
      Prefs.set(Config.prefKey.UserDebug, this.cbUserDebug.value);
      Log.initLevel();
      this.close();
    },
    show: function show() {
      this.win.show();
    },
  };
  ProgressUI.prototype = {
    close: function close() {
      this.win.close();
    },
    setComplete: function setComplete(primaryText) {
      clearOutput();
      this.pbar.value = this.pbar.maxvalue;
      this.stPrimary.text = primaryText;
      writeLn(this.stPrimary.text);
      this.win.obj.update();
    },
    show: function show() {
      this.win.show();
    },
    update: function update(primaryText, count) {
      clearOutput();
      count = aeq.setDefault(count, this.pbar.value + 1);
      this.pbar.value = count;
      var percent =
        (parseFloat(this.pbar.value) / parseFloat(this.pbar.maxvalue)) * 100;
      this.stPrimary.text = primaryText + " (" + Math.round(percent) + "%)";
      writeLn(this.stPrimary.text);
      this.win.obj.update();
    },
  };
  var Style = {
    FillBottomColumn: {
      alignChildren: ["fill", "bottom"],
      alignment: ["fill", "bottom"],
      orientation: "column",
    },
    FillBottomRow: {
      alignChildren: ["fill", "bottom"],
      alignment: ["fill", "bottom"],
      orientation: "row",
    },
    FillFillCol: {
      alignChildren: ["fill", "fill"],
      alignment: ["fill", "fill"],
      orientation: "column",
    },
    FillFillRow: {
      alignChildren: ["fill", "fill"],
      alignment: ["fill", "fill"],
      orientation: "row",
    },
    FillTopCol: {
      alignChildren: ["fill", "top"],
      alignment: ["fill", "top"],
      orientation: "column",
    },
    FillTopRow: {
      alignChildren: ["fill", "top"],
      alignment: ["fill", "top"],
      orientation: "row",
    },
    OptionsTab: { alignChildren: "left", orientation: "column", spacing: 0 },
  };
  var Core = (function () {
    function checkVersions() {
      Log.trace("--> checkVersions");
      if (!Config.globals.debug && es4ZL.t()) {
        alert(
          [
            "ESL is in trial mode!",
            "Explode is limited to the first 5 shapes.",
            "Merge is limited to two full layers, or 5 shapes within a layer.",
          ].join("\n"),
          Config.name + " Warning",
        );
        Config.globals.trial = true;
      }
      var versionsMatch =
        Prefs.get(Config.prefKey.LastVersion) === Config.version;
      var aeVersionsMatch =
        Prefs.get(Config.prefKey.LastAEVersion) === app.version;
      if (!versionsMatch || !aeVersionsMatch) {
        Log.info(
          "AE v" + app.version + " - " + Config.name + " v" + Config.version,
        );
        Prefs.set(Config.prefKey.LastVersion, Config.version);
        Prefs.set(Config.prefKey.LastAEVersion, app.version);
      }
      var licenseLine = es4ZL.getRegistration();
      var licensingMatches =
        Prefs.get(Config.prefKey.LastLicense) === licenseLine;
      if (!licensingMatches) {
        Log.info(licenseLine);
        Prefs.set(Config.prefKey.LastLicense, licenseLine);
      }
      Log.trace("<-- checkVersions");
    }
    function copySwitches(layerPropTree, destLayer) {
      Log.trace("--> copySwitches");
      var valuesTriggered = {
        adjustmentLayer: false,
        effectsActive: false,
        guideLayer: false,
        label: false,
        motionBlur: false,
        parent: false,
        quality: false,
        shy: false,
        solo: false,
        threeDLayer: false,
      };
      var earliestStart = Number.POSITIVE_INFINITY;
      var latestEnd = Number.NEGATIVE_INFINITY;
      var comp = destLayer.containingComp;
      var sourceLayers = aeq.arrayEx();
      for (var layerIndex in layerPropTree) {
        if (!layerPropTree.hasOwnProperty(layerIndex)) {
          continue;
        }
        sourceLayers.push(comp.layer(parseInt(layerIndex, 10) + 1));
      }
      sourceLayers.forEach(function (layer) {
        if (!valuesTriggered.motionBlur) {
          if (destLayer.motionBlur !== layer.motionBlur) {
            destLayer.motionBlur = layer.motionBlur;
          }
          valuesTriggered.motionBlur = true;
        }
        if (!valuesTriggered.effectsActive) {
          if (destLayer.effectsActive !== layer.effectsActive) {
            destLayer.effectsActive = layer.effectsActive;
          }
          valuesTriggered.effectsActive = true;
        }
        if (!valuesTriggered.adjustmentLayer) {
          if (destLayer.adjustmentLayer !== layer.adjustmentLayer) {
            destLayer.adjustmentLayer = layer.adjustmentLayer;
          }
          valuesTriggered.adjustmentLayer = true;
        }
        if (!valuesTriggered.guideLayer) {
          if (destLayer.guideLayer !== layer.guideLayer) {
            destLayer.guideLayer = layer.guideLayer;
          }
          valuesTriggered.guideLayer = true;
        }
        if (!valuesTriggered.threeDLayer) {
          if (destLayer.threeDLayer !== layer.threeDLayer) {
            destLayer.threeDLayer = layer.threeDLayer;
          }
          valuesTriggered.threeDLayer = true;
        }
        if (!valuesTriggered.shy) {
          if (destLayer.shy !== layer.shy) {
            destLayer.shy = layer.shy;
          }
          valuesTriggered.shy = true;
        }
        if (!valuesTriggered.solo) {
          if (destLayer.solo !== layer.solo) {
            destLayer.solo = layer.solo;
          }
          valuesTriggered.solo = true;
        }
        if (!valuesTriggered.quality) {
          if (destLayer.quality !== layer.quality) {
            destLayer.quality = layer.quality;
          }
          valuesTriggered.quality = true;
        }
        if (!valuesTriggered.label) {
          if (destLayer.label !== layer.label) {
            destLayer.label = layer.label;
          }
          valuesTriggered.label = true;
        }
        if (!valuesTriggered.parent) {
          if (destLayer.parent !== layer.parent) {
            destLayer.parent = layer.parent;
          }
          valuesTriggered.parent = true;
        }
        earliestStart = Math.min(earliestStart, layer.inPoint);
        latestEnd = Math.max(latestEnd, layer.outPoint);
      });
      destLayer.inPoint = earliestStart;
      destLayer.outPoint = latestEnd;
      Log.trace("<-- copySwitches");
    }
    function isShapeProp(prop) {
      var mName = prop.matchName;
      if (
        mName.indexOf("Vector Shape") === -1 &&
        mName.indexOf("Vector Group") === -1
      ) {
        return false;
      }
      return true;
    }
    function isPropSpatial(prop) {
      return (
        prop.isSpatial &&
        !(
          prop.propertyValueType === PropertyValueType.COLOR ||
          prop.propertyValueType === PropertyValueType.SHAPE
        )
      );
    }
    function isSpatial3dValue(prop) {
      return (
        prop.propertyValueType === PropertyValueType.ThreeD_SPATIAL ||
        prop.propertyValueType === PropertyValueType.ThreeD
      );
    }
    function processDelete(target) {
      Log.trace("--> processDelete: " + target.name);
      if (Prefs.getAsBool(Config.prefKey.DeleteSource)) {
        target.remove();
        Log.trace("<-- processDelete: Deleted");
        return;
      }
      target.enabled = false;
      Log.trace("<-- processDelete: Disabled");
    }
    function getUserItems() {
      var items = {
        layers: aeq.getSelectedLayers().filter(function (layer) {
          return aeq.isShapeLayer(layer);
        }),
        props: aeq.getSelectedProperties().filter(function (prop) {
          return (
            Core.isShapeProp(prop) &&
            aeq.isShapeLayer(prop.propertyGroup(prop.propertyDepth))
          );
        }),
      };
      if (items.props.length > 0) {
        items.layers = items.layers.filter(function (layer) {
          return items.props.every(function (prop) {
            return prop.propertyGroup(prop.propertyDepth) !== layer;
          });
        });
      }
      return items;
    }
    function flattenUserItems(userItems) {
      var targetProps = userItems.props.map(function (prop) {
        return prop;
      });
      userItems.layers.forEach(function (userLayer) {
        var layerContents = userLayer.property(2);
        for (var ii = 1, il = layerContents.numProperties; ii <= il; ii++) {
          var shapeProp = layerContents.property(ii);
          if (!Core.isShapeProp(shapeProp)) {
            continue;
          }
          targetProps.push(shapeProp);
        }
      });
      if (Config.globals.trial && targetProps.length > 5) {
        targetProps.length = 5;
      }
      return targetProps;
    }
    function removeUserItems(userItems) {
      userItems.props
        .reverse()
        .map(function (prop) {
          return {
            idx: prop.propertyIndex,
            layer: prop.propertyGroup(prop.propertyDepth),
          };
        })
        .forEach(function (propObj) {
          Core.processDelete(propObj.layer.property(2).property(propObj.idx));
        });
      userItems.layers.reverse().forEach(Core.processDelete);
    }
    return {
      checkVersions: checkVersions,
      copySwitches: copySwitches,
      flattenUserItems: flattenUserItems,
      getUserItems: getUserItems,
      isPropSpatial: isPropSpatial,
      isShapeProp: isShapeProp,
      isSpatial3dValue: isSpatial3dValue,
      processDelete: processDelete,
      removeUserItems: removeUserItems,
    };
  })();
  var removeLayerArtboard = (function () {
    function getSourceRect(layer) {
      return layer.sourceRectAtTime(layer.containingComp.time, true);
    }
    function roundSourceRect(sourceRect) {
      return {
        height: Util.roundVal(sourceRect.height, 3),
        left: Util.roundVal(sourceRect.left, 3),
        top: Util.roundVal(sourceRect.top, 3),
        width: Util.roundVal(sourceRect.width, 3),
      };
    }
    function sourceRectsEqual(sourceRectA, sourceRectB) {
      return (
        sourceRectA.top === sourceRectB.top &&
        sourceRectA.left === sourceRectB.left &&
        sourceRectA.width === sourceRectB.width &&
        sourceRectA.height === sourceRectB.height
      );
    }
    function isRectangle(path) {
      if (!path.closed) {
        Log.trace("<-- isRectangle: Path is open");
        return false;
      }
      if (path.vertices.length !== 4) {
        Log.trace(
          "<-- isRectangle: Path has " + path.vertices.length + " vertices",
        );
        return false;
      }
      if (
        path.vertices[0][1] === path.vertices[1][1] &&
        path.vertices[2][1] === path.vertices[3][1] &&
        path.vertices[0][0] === path.vertices[3][0] &&
        path.vertices[1][0] === path.vertices[2][0]
      ) {
        var tangentSum = 0;
        for (var ii = 0, il = path.inTangents.length; ii < il; ii++) {
          for (var jj = 0, jl = path.inTangents[0].length; jj < jl; jj++) {
            tangentSum += path.inTangents[ii][jj];
            tangentSum += path.outTangents[ii][jj];
          }
        }
        if (tangentSum === 0) {
          Log.trace("<-- isRectangle: Path seems to be a rect");
          return true;
        }
      }
      Log.trace("<-- isRectangle: Path is not a rect");
      return false;
    }
    return function removeLayerArtboard(targetPropGroup, options) {
      Log.trace("--> removeLayerArtboard: " + JSON.stringify(options));
      var rootLayer =
        targetPropGroup.depth > 0
          ? targetPropGroup.propertyGroup(targetPropGroup.propertyDepth)
          : targetPropGroup;
      if (aeq.isLayer(targetPropGroup)) {
        targetPropGroup = targetPropGroup.property("ADBE Root Vectors Group");
      }
      if (options.removeEmptyGroups) {
        for (ii = targetPropGroup.numProperties; ii > 0; ii--) {
          propGroup = targetPropGroup.property(ii);
          try {
            thisVecsGroup = propGroup.property("ADBE Vectors Group");
            if (thisVecsGroup !== null) {
              if (thisVecsGroup.numProperties === 0) {
                propGroup.remove();
                continue;
              }
              var foundPath = false;
              for (jj = 1, jl = thisVecsGroup.numProperties; jj <= jl; jj++) {
                thisProp = thisVecsGroup.property(jj);
                if (thisProp.matchName.indexOf("ADBE Vector Shape") > -1) {
                  foundPath = true;
                  break;
                }
              }
              if (!foundPath) {
                propGroup.remove();
              }
            }
          } catch (e) {}
        }
      }
      for (var ii = 1; ii <= targetPropGroup.numProperties; ii += 1) {
        targetPropGroup.property(ii).enabled = false;
      }
      var artboardsRemoved = 0;
      for (var ii = 1; ii <= targetPropGroup.numProperties; ii += 1) {
        propGroup = targetPropGroup.property(ii);
        propGroup.enabled = true;
        if (propGroup.matchName === "ADBE Vector Group") {
          thisVecsGroup = propGroup.property("ADBE Vectors Group");
          removeLayerArtboard(thisVecsGroup, options);
          for (var jj = 1; jj <= thisVecsGroup.numProperties; jj += 1) {
            thisProp = thisVecsGroup.property(jj);
            if (thisProp.matchName === "ADBE Vector Filter - Merge") {
              if (thisProp.mode.value === 1) {
                if (jj >= 4) {
                  thisProp.enabled = false;
                  thisVecsGroup.property(jj - 1).enabled = false;
                  thisVecsGroup.property(jj - 2).enabled = false;
                  path1Rect = roundSourceRect(getSourceRect(rootLayer));
                  path1Size = path1Rect.width * path1Rect.height;
                  thisVecsGroup.property(jj - 2).enabled = true;
                  thisVecsGroup.property(jj - 3).enabled = false;
                  path2Rect = roundSourceRect(getSourceRect(rootLayer));
                  path2Size = path2Rect.width * path2Rect.height;
                  thisVecsGroup.property(jj - 3).enabled = true;
                  thisVecsGroup.property(jj - 1).enabled = true;
                  if (sourceRectsEqual(path1Rect, path2Rect)) {
                    Core.processDelete(thisProp);
                    Core.processDelete(thisVecsGroup.property(jj - 2));
                    Core.processDelete(thisVecsGroup.property(jj - 3));
                    artboardsRemoved++;
                  }
                }
              } else {
                if (thisProp.mode.value === 4) {
                  if (
                    thisVecsGroup.property(jj - 1).matchName ===
                    "ADBE Vector Group"
                  ) {
                    Core.processDelete(thisProp);
                    Core.processDelete(thisVecsGroup.property(jj - 1));
                    artboardsRemoved++;
                  } else {
                    thisProp.enabled = false;
                    thisVecsGroup.property(jj - 1).enabled = false;
                    path1Rect = getSourceRect(rootLayer);
                    path1Size = path1Rect.width * path1Rect.height;
                    var path1IsRect =
                      thisVecsGroup.property(jj - 2).numProperties < 2
                        ? false
                        : isRectangle(
                            thisVecsGroup.property(jj - 2).property(2).value,
                          );
                    thisVecsGroup.property(jj - 1).enabled = true;
                    thisVecsGroup.property(jj - 2).enabled = false;
                    path2Rect = roundSourceRect(getSourceRect(rootLayer));
                    path2Size = path2Rect.width * path2Rect.height;
                    var path2IsRect =
                      thisVecsGroup.property(jj - 1).numProperties < 2
                        ? false
                        : isRectangle(
                            thisVecsGroup.property(jj - 1).property(2).value,
                          );
                    thisVecsGroup.property(jj - 2).enabled = true;
                    if (!path1IsRect && !path2IsRect) {
                      continue;
                    }
                    Core.processDelete(thisProp);
                    artboardsRemoved++;
                    if (path1IsRect && !path2IsRect) {
                      Core.processDelete(thisVecsGroup.property(jj - 2));
                    } else {
                      if (!path1IsRect && path2IsRect) {
                        Core.processDelete(thisVecsGroup.property(jj - 1));
                      } else {
                        if (path1IsRect && path2IsRect) {
                          if (path1Size < path2Size) {
                            Core.processDelete(thisVecsGroup.property(jj - 1));
                          } else {
                            Core.processDelete(thisVecsGroup.property(jj - 2));
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
        propGroup.enabled = false;
      }
      for (var ii = 1; ii <= targetPropGroup.numProperties; ii += 1) {
        targetPropGroup.property(ii).enabled = true;
      }
      var artboardCount = Prefs.getAsInt(Config.prefKey.ArtboardCount);
      artboardCount += artboardsRemoved;
      Prefs.set(Config.prefKey.ArtboardCount, artboardCount);
      Log.trace("<-- removeLayerArtboard");
    };
  })();
  Main.prototype = {
    init: function () {
      Log.initLevel();
      Core.checkVersions();
    },
    run: function run() {
      convert();
      return;
    },
  };
  if (aeq.getModifiers().shift && aeq.getModifiers().ctrl) {
    if (confirm("Do you want to clear " + Config.name + " preferences?")) {
      Prefs.removeAll();
      alert("Prefs removed! Launching.", Config.name);
    }
  }
  var es4ZL = new a(Config.lic);
  if (!es4ZL.c()) {
    Log.info("No license detected");
    return;
  }
  try {
    new Main(thisObj).run();
  } catch (e) {
    alert(e);
    try {
      Log.error("TOP-LEVEL ERROR -> " + String(e));
      Log.info(JSON.stringify(Prefs.getAll()));
    } catch (e2) {}
  }
})(this);
