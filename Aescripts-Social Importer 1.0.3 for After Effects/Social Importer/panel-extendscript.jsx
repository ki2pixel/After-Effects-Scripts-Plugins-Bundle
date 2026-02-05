/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

var SocialImporter = (function () {
  return (function (modules) {
    function __webpack_require__(moduleId) {
      if (installedModules[moduleId]) {
        return installedModules[moduleId].exports;
      }
      var module = (installedModules[moduleId] = {
        exports: {},
        i: moduleId,
        l: false,
      });
      modules[moduleId].call(
        module.exports,
        module,
        module.exports,
        __webpack_require__,
      );
      module.l = true;
      return module.exports;
    }
    var installedModules = {};
    __webpack_require__.m = modules;
    __webpack_require__.c = installedModules;
    __webpack_require__.d = function (exports, name, getter) {
      if (!__webpack_require__.o(exports, name)) {
        Object.defineProperty(exports, name, {
          configurable: false,
          enumerable: true,
          get: getter,
        });
      }
    };
    __webpack_require__.n = function (module) {
      var getter =
        module && module.__esModule
          ? function getDefault() {
              return module.default;
            }
          : function getModuleExports() {
              return module;
            };
      __webpack_require__.d(getter, "a", getter);
      return getter;
    };
    __webpack_require__.o = function (object, property) {
      return Object.prototype.hasOwnProperty.call(object, property);
    };
    __webpack_require__.p = "./";
    return __webpack_require__(
      (__webpack_require__.s =
        "multi C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\@sentry\\webpack-plugin\\src\\sentry-webpack.module.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\neutrino-preset-cep\\json.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\cep-shim\\es5-shim.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\cep-shim\\es5-sham.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\extendscript\\panel"),
    );
  })({
    "./extendscript/constants.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var FOLDER_NAME = "Social Importer";
      module.exports = { FOLDER_NAME: FOLDER_NAME };
    },
    "./extendscript/effect.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/events.js");
      var debugLine = _require.debugLine;
      var _require2 = __webpack_require__("./extendscript/lib/collection.js");
      var collectionWrapper = _require2.collectionWrapper;
      var _require3 = __webpack_require__("./extendscript/lib/layer.js");
      var mirrorPropertyGroup = _require3.mirrorPropertyGroup;
      var copyControlEffect = function copyControlEffect(composition, layer) {
        debugLine("#copyControlEffect()");
        debugLine("compLayer: " + layer.name);
        var controlLayer = getControlLayer(composition);
        debugLine("Adding effect to parent composition...");
        var addedProperty = layer
          .property("Effects")
          .addProperty(controlLayer.effect("Social Importer").matchName);
        addedProperty.name = "Social Importer";
      };
      var shrinkPictureSize = function shrinkPictureSize(composition) {
        debugLine("#shrinkPictureSize()");
        var controlLayer = getControlLayer(composition);
        if (!controlLayer) {
          return;
        }
        var socialImporter = controlLayer.effect("Social Importer");
        if (socialImporter) {
          var pseudoEffect = socialImporter("Picture Size");
          if (pseudoEffect) {
            pseudoEffect.setValue(0);
          }
        }
      };
      var getControlLayer = function getControlLayer(composition) {
        debugLine("#getControlLayer()");
        debugLine("composition: " + composition.name);
        debugLine("Finding CONTROL layer...");
        var layers = collectionWrapper(composition, "layer", "numLayers");
        var controlLayer = layers.find(function (layer) {
          return layer.name == "CONTROL";
        });
        if (!controlLayer) {
          debugLine("Cannot find CONTROL layer.");
          return;
        }
        if (!controlLayer.effect("Social Importer")) {
          debugLine("Cannot find Social Importer effect.");
          return;
        }
        debugLine("Found CONTROL layer.");
        return controlLayer;
      };
      var getSocialImporterEffect = function getSocialImporterEffect(
        composition,
      ) {
        debugLine("#getSocialImporterEffect()");
        debugLine("composition: " + composition.name);
        var controlLayer = getControlLayer(composition);
        if (!controlLayer) {
          throw new Error("Could not find the CONTROL layer.");
        }
        if (!controlLayer.effect("Social Importer")) {
          throw new Error("Could not find Social Importer effect on layer.");
        }
        return controlLayer.effect("Social Importer");
      };
      var pasteSocialImporterEffect = function pasteSocialImporterEffect(
        sourceLayer,
        selectedLayers,
      ) {
        debugLine("#pasteSocialImporterEffect()");
        debugLine("sourceLayer: " + sourceLayer.name);
        debugLine("selectedLayers: " + selectedLayers.length);
        app.beginUndoGroup("Paste Social Importer Effect");
        var sourceControlLayer = getControlLayer(sourceLayer.source);
        if (!sourceControlLayer) {
          throw new Error(
            "Could not find the CONTROL layer inside the \'" +
              sourceControlLayer.name +
              "\' layer",
          );
        }
        if (!sourceControlLayer.effect("Social Importer")) {
          throw new Error(
            "Layer \'" +
              sourceControlLayer.name +
              "\' is missing the social importer effect.",
          );
        }
        var socialImporterEffect = sourceControlLayer.effect("Social Importer");
        selectedLayers.forEach(function (selectedLayer) {
          var controlLayer = getControlLayer(selectedLayer.source);
          if (!controlLayer) {
            throw new Error(
              "Could not find the CONTROL layer inside the \'" +
                selectedLayer.name +
                "\' layer",
            );
          }
          debugLine(
            "mirroring social importer effect to \'" +
              selectedLayer.name +
              "\' layer",
          );
          mirrorPropertyGroup(
            socialImporterEffect,
            controlLayer.effect("Social Importer"),
          );
        });
        app.endUndoGroup();
        debugLine("finished pasting effects");
      };
      module.exports = {
        copyControlEffect: copyControlEffect,
        getSocialImporterEffect: getSocialImporterEffect,
        pasteSocialImporterEffect: pasteSocialImporterEffect,
        shrinkPictureSize: shrinkPictureSize,
      };
    },
    "./extendscript/helpers.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/constants.js");
      var FOLDER_NAME = _require.FOLDER_NAME;
      var _require2 = __webpack_require__("./extendscript/lib/collection.js");
      var collectionWrapper = _require2.collectionWrapper;
      var getSocialImporterFolder = function getSocialImporterFolder() {
        return (
          collectionWrapper(app.project).find(function (item) {
            return item.name == FOLDER_NAME;
          }) || app.project.items.addFolder(FOLDER_NAME)
        );
      };
      var folderHasItem = function folderHasItem(folderItem, itemName) {
        return !!collectionWrapper(folderItem).find(function (item) {
          return item.name == itemName;
        });
      };
      var getImportFolder = function getImportFolder(prefix) {
        var socialImporterFolder = getSocialImporterFolder();
        var currentIndex = 1;
        while (
          folderHasItem(socialImporterFolder, prefix + " " + currentIndex)
        ) {
          currentIndex++;
        }
        return socialImporterFolder.items.addFolder(
          prefix + " " + currentIndex,
        );
      };
      module.exports = {
        folderHasItem: folderHasItem,
        getImportFolder: getImportFolder,
        getSocialImporterFolder: getSocialImporterFolder,
      };
    },
    "./extendscript/import.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/events.js");
      var debugLine = _require.debugLine;
      var _require2 = __webpack_require__("./extendscript/lib/collection.js");
      var collectionWrapper = _require2.collectionWrapper;
      var _require3 = __webpack_require__("./extendscript/lib/comp.js");
      var getActiveComposition = _require3.getActiveComposition;
      var importProject = function importProject(projectPath) {
        debugLine("#importProject()");
        debugLine("projectPath: " + projectPath);
        var importOptions = new ImportOptions(new File(projectPath));
        importOptions.importAs = ImportAsType.PROJECT;
        var importedProjectFolderItem = app.project.importFile(importOptions);
        debugLine(
          "importedProjectFolderItem?: " + importedProjectFolderItem
            ? "yes"
            : importedProjectFolderItem,
        );
        return importedProjectFolderItem;
      };
      var removeProject = function removeProject(importedProjectFolderItem) {
        debugLine("#removeProject()");
        debugLine(
          "importedProjectFolderItem: " + importedProjectFolderItem.name,
        );
        importedProjectFolderItem.remove();
      };
      var importProjectComposition = function importProjectComposition(
        importFolderItem,
        importedProjectFolderItem,
        compositionName,
        type,
        itemIndex,
        groupIndex,
      ) {
        debugLine("#importProject()");
        debugLine("compositionName: " + compositionName);
        debugLine(
          "importedProjectFolderItem: " + importedProjectFolderItem.name,
        );
        debugLine("type: " + type);
        debugLine("item index: " + itemIndex);
        debugLine("group index: " + groupIndex);
        debugLine(
          "importFolderItem: " + importFolderItem && importFolderItem.name,
        );
        debugLine("getting active composition...");
        var comp = getActiveComposition(true);
        debugLine(
          "project children: " +
            JSON.stringify(
              collectionWrapper(importedProjectFolderItem).map(function (item) {
                return item.name;
              }),
            ),
        );
        var importedCompItem = collectionWrapper(
          importedProjectFolderItem,
        ).find(function (item) {
          return item.name == compositionName;
        });
        debugLine(
          "importedCompItem?: " + importedCompItem ? "yes" : importedCompItem,
        );
        if (!importedCompItem) {
          throw new Error(
            "Composition named \'" +
              compositionName +
              "\' not found in preset.",
          );
        }
        debugLine("cloning imported composition to importFolderItem");
        var duplicatedCompItem = importedCompItem.duplicate();
        duplicatedCompItem.name =
          importedCompItem.name + "_" + groupIndex + "." + itemIndex;
        duplicatedCompItem.parentFolder = importFolderItem;
        debugLine("found composition. adding importedCompItem");
        var compLayer = comp.layers.add(duplicatedCompItem);
        debugLine(
          "#importProjectComposition() complete - result: " +
            duplicatedCompItem.name,
        );
        return { comp: duplicatedCompItem, layer: compLayer };
      };
      module.exports = {
        importProject: importProject,
        importProjectComposition: importProjectComposition,
        removeProject: removeProject,
      };
    },
    "./extendscript/layers.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/events.js");
      var debugLine = _require.debugLine;
      var _require2 = __webpack_require__("./extendscript/lib/collection.js");
      var collectionWrapper = _require2.collectionWrapper;
      var _require3 = __webpack_require__("./extendscript/lib/layer.js");
      var replaceShapeLayer = _require3.replaceShapeLayer;
      var avLayerHandler = function avLayerHandler(
        layer,
        value,
        importFolderItem,
        index,
      ) {
        if (value === true || value === false) {
          debugLine(
            "Found boolean AVLayer for " + layer.name + " with value " + value,
          );
          layer.enabled = value;
          return null;
        }
        if (!value.dimensions || !value.asset) {
          debugLine("Skipping invalid asset for " + layer.name);
          return null;
        }
        var asset = value.asset;
        debugLine(
          "Importing asset for " + layer.name + " source: " + asset.toString(),
        );
        var importedAsset = importAsset(asset, importFolderItem, index);
        if (layer.replaceSource) {
          try {
            debugLine(
              "Attempting to replace AVLayer source for " +
                layer.name +
                " with " +
                asset.toString(),
            );
            layer.replaceSource(importedAsset, true);
            return null;
          } catch (err) {
            debugLine("Error replacing source. Falling back to importedAsset");
            return importedAsset;
          }
        }
      };
      var LAYER_HANDLERS = [
        {
          handler: function handler(layer, value) {
            debugLine(
              "Replacing " +
                layer.name +
                " SourceText with " +
                value.toString(),
            );
            layer.text.sourceText.setValue(value.toString());
          },
          instance: TextLayer,
        },
        {
          handler: function handler(layer, value, importFolderItem, index) {
            var importedAsset = avLayerHandler(
              layer,
              value,
              importFolderItem,
              index,
            );
            if (importedAsset) {
              debugLine(
                "Replacing ShapeLayer " +
                  layer.name +
                  " with " +
                  value.asset.toString(),
              );
              var importedLayer = replaceShapeLayer(layer, importedAsset);
              importedLayer.anchorPoint.expression =
                "[thisLayer.sourceRectAtTime().width / 2, thisLayer.sourceRectAtTime().height / 2]";
            }
          },
          instance: ShapeLayer,
        },
        { handler: avLayerHandler, instance: AVLayer },
      ];
      var _findHandler = function _findHandler(layer) {
        return LAYER_HANDLERS.find(function (handler) {
          return layer instanceof handler.instance;
        });
      };
      var replaceCompositionLayers = function replaceCompositionLayers(
        compItem,
        data,
        importFolderItem,
        index,
      ) {
        debugLine("#replaceCompositionLayers()");
        debugLine("compItem: " + compItem.name);
        debugLine("data: " + JSON.stringify(data));
        debugLine("importFolderItem: " + importFolderItem.name);
        debugLine("index: " + index);
        var dataKeys = Object.keys(data);
        var compositionLayers = collectionWrapper(
          compItem,
          "layer",
          "numLayers",
        );
        dataKeys.forEach(function (dataKey) {
          debugLine("Applying data key: " + dataKey);
          var layer = compositionLayers.find(function (layer) {
            try {
              return layer.name == dataKey;
            } catch (e) {
              return false;
            }
          });
          if (!layer) {
            debugLine("Cannot find layer matching name \'" + dataKey + "\'");
            return;
          }
          var validHandler = _findHandler(layer);
          if (validHandler) {
            debugLine(
              "Using handler: " + validHandler.instance.name + ". Applying...",
            );
            validHandler.handler(layer, data[dataKey], importFolderItem, index);
            debugLine("Applied to layer.");
          } else {
            debugLine(
              "Cannot find handler for layer matching name \'" + dataKey + "\'",
            );
            debugLine(
              "Layer type is: " + layer.constructor && layer.constructor.name,
            );
          }
        });
      };
      var importAsset = function importAsset(
        assetPath,
        importFolderItem,
        index,
      ) {
        debugLine(
          "Importing asset: " +
            assetPath +
            " to importFolderItem \'" +
            importFolderItem.name +
            "\' and index \'" +
            index +
            "\'",
        );
        var indexFolderName = index + ".assets";
        var indexFolder = collectionWrapper(importFolderItem).find(
          function (item) {
            return item.name === indexFolderName;
          },
        );
        if (!indexFolder) {
          indexFolder = importFolderItem.items.addFolder(indexFolderName);
        }
        debugLine("indexFolder: \'" + indexFolder.name + "\'");
        var importOptions = new ImportOptions(new File(assetPath));
        importOptions.importAs = ImportAsType.FOOTAGE;
        var importedAsset = app.project.importFile(importOptions);
        importedAsset.parentFolder = indexFolder;
        debugLine("Imported asset: " + assetPath + " successfully.");
        return importedAsset;
      };
      module.exports = { replaceCompositionLayers: replaceCompositionLayers };
    },
    "./extendscript/lib/collection.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      Array.prototype.find =
        Array.prototype.find ||
        function (callback) {
          if (this === null) {
            throw new TypeError(
              "Array.prototype.find called on null or undefined",
            );
          } else {
            if (typeof callback !== "function") {
              throw new TypeError("callback must be a function");
            }
          }
          var list = Object(this);
          var length = list.length >>> 0;
          var thisArg = arguments[1];
          for (var i = 0; i < length; i += 1) {
            var element = list[i];
            if (callback.call(thisArg, element, i, list)) {
              return element;
            }
          }
        };
      Array.prototype.includes =
        Array.prototype.includes ||
        function (valueToFind, fromIndex) {
          function sameValueZero(x, y) {
            return (
              (x === y || typeof x === "number") &&
              typeof y === "number" &&
              isNaN(x) &&
              isNaN(y)
            );
          }
          if (this == null) {
            throw new TypeError('"this" is null or not defined');
          }
          var o = Object(this);
          var len = o.length >>> 0;
          if (len === 0) {
            return false;
          }
          var n = fromIndex | 0;
          var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          while (k < len) {
            if (sameValueZero(o[k], valueToFind)) {
              return true;
            }
            k++;
          }
          return false;
        };
      var collectionWrapper = function collectionWrapper(parent) {
        var itemName =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : "item";
        var countName =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : "numItems";
        var result = [];
        if (parent && parent[countName] && parent[itemName]) {
          for (var i = 1; i <= parent[countName]; i += 1) {
            result.push(parent[itemName](i));
          }
        }
        return result;
      };
      module.exports = { collectionWrapper: collectionWrapper };
    },
    "./extendscript/lib/comp.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var getActiveComposition = function getActiveComposition(
        throwIfNotPresent,
      ) {
        var comp =
          app.project &&
          app.project.activeItem &&
          app.project.activeItem instanceof CompItem
            ? app.project.activeItem
            : null;
        if (!comp && throwIfNotPresent) {
          throw new Error("Please select a composition.");
        }
        return comp;
      };
      module.exports = { getActiveComposition: getActiveComposition };
    },
    "./extendscript/lib/config.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var CONFIG_NAMES = {
        DEBUG_ENABLED: "debugEnabled",
        DEBUG_EVENT: "debugEvent",
      };
      var _pluginConfig =
        ((_pluginConfig2 = {}),
        (_pluginConfig2[CONFIG_NAMES.DEBUG_EVENT] = "cep.debug"),
        (_pluginConfig2[CONFIG_NAMES.DEBUG_ENABLED] = false),
        _pluginConfig2);
      var setConfig = function setConfig(name, value) {
        _pluginConfig[name] = value;
      };
      var getConfig = function getConfig(name) {
        return _pluginConfig[name];
      };
      module.exports = {
        CONFIG_NAMES: CONFIG_NAMES,
        getConfig: getConfig,
        setConfig: setConfig,
      };
    },
    "./extendscript/lib/errors.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/events.js");
      var dispatchEvent = _require.dispatchEvent;
      var debugLine = _require.debugLine;
      var debugError = function debugError(err) {
        debugLine("error: \'" + err.message + "\', line: " + err.line);
      };
      var handleError = function handleError(errEvent, err) {
        debugError(err);
        dispatchEvent(errEvent, err.message + " - line: " + err.line);
      };
      var errorWrapper = function errorWrapper(errEvent, fn) {
        if (!fn || !errEvent) {
          throw new Error("fn and errEvent must be passed to errorWrapper()");
        }
        return function () {
          try {
            return fn.apply(undefined, arguments);
          } catch (err) {
            handleError(errEvent, err);
          }
        };
      };
      module.exports = {
        debugError: debugError,
        errorWrapper: errorWrapper,
        handleError: handleError,
      };
    },
    "./extendscript/lib/events.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/config.js");
      var getConfig = _require.getConfig;
      var CONFIG_NAMES = _require.CONFIG_NAMES;
      var stringify = JSON.stringify;
      var debugLine = function debugLine(message) {
        if (getConfig(CONFIG_NAMES.DEBUG_ENABLED)) {
          dispatchEvent(getConfig(CONFIG_NAMES.DEBUG_EVENT), message, true);
        }
      };
      var xLib = null;
      var constructXLib = function constructXLib() {
        if (!xLib) {
          try {
            xLib = new ExternalObject("lib:PlugPlugExternalObject");
          } catch (e) {
            alert(e);
          }
        }
        return xLib;
      };
      var dispatchEvent = function dispatchEvent(type) {
        var data =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : "";
        var debugEvent =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : false;
        if (constructXLib()) {
          if (!debugEvent) {
            debugLine(
              "Dispatching CEP event: " +
                type +
                " with data: " +
                stringify(data),
            );
          }
          var eventObj = new CSXSEvent();
          eventObj.type = type;
          eventObj.data = data;
          eventObj.dispatch();
        }
      };
      module.exports = {
        constructXLib: constructXLib,
        debugLine: debugLine,
        dispatchEvent: dispatchEvent,
      };
    },
    "./extendscript/lib/layer.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/collection.js");
      var collectionWrapper = _require.collectionWrapper;
      var _require2 = __webpack_require__("./extendscript/lib/events.js");
      var debugLine = _require2.debugLine;
      var _require3 = __webpack_require__("./extendscript/lib/properties.js");
      var getPropertyChildren = _require3.getPropertyChildren;
      var canMirrorProp = _require3.canMirrorProp;
      var isNoValueOrCustomProp = _require3.isNoValueOrCustomProp;
      var buildLocalPropObject = _require3.buildLocalPropObject;
      var setPropFromLocal = _require3.setPropFromLocal;
      var buildMissingPropertyGroups = function buildMissingPropertyGroups(
        sourcePropertyGroup,
        destPropertyGroup,
      ) {
        if (
          sourcePropertyGroup.numProperties !== destPropertyGroup.numProperties
        ) {
          var targetNumProperties = sourcePropertyGroup.numProperties;
          for (var i = 1; i <= targetNumProperties; i += 1) {
            var sourceProp = sourcePropertyGroup.property(i);
            if (destPropertyGroup.canAddProperty(sourceProp.matchName)) {
              destPropertyGroup.addProperty(sourceProp.matchName);
            }
          }
        }
      };
      var mirrorDimensionSeparatedState =
        function mirrorDimensionSeparatedState(sourceProp, destProp) {
          if (sourceProp.isSeparationLeader) {
            destProp.dimensionsSeparated = sourceProp.dimensionsSeparated;
          }
        };
      var mirrorPropertyValues = function mirrorPropertyValues(
        sourcePropertyGroup,
        destPropertyGroup,
      ) {
        if (destPropertyGroup.canSetEnabled) {
          destPropertyGroup.enabled = sourcePropertyGroup.enabled;
        }
        for (var i = 1; i <= sourcePropertyGroup.numProperties; i += 1) {
          var sourceProp = sourcePropertyGroup.property(i);
          var destProp = destPropertyGroup.property(i);
          if (sourceProp.matchName === "ADBE Position") {
            mirrorDimensionSeparatedState(sourceProp, destProp);
          }
          if (
            sourceProp.parentProperty.propertyType ===
            PropertyType.INDEXED_GROUP
          ) {
            destProp.name = sourceProp.name;
          }
          if (sourceProp.isModified) {
            if (
              sourceProp.propertyType === PropertyType.INDEXED_GROUP ||
              sourceProp.propertyType === PropertyType.NAMED_GROUP
            ) {
              mirrorPropertyGroup(sourceProp, destProp);
            } else {
              if (canMirrorProp(sourceProp)) {
                if (!isNoValueOrCustomProp(sourceProp)) {
                  var localSourcePropObject = buildLocalPropObject(sourceProp);
                  setPropFromLocal(destProp, localSourcePropObject);
                }
              }
            }
          }
        }
      };
      var mirrorToggles = function mirrorToggles(
        sourcePropertyGroup,
        destPropertyGroup,
      ) {
        var togglesArray = "";
        if (sourcePropertyGroup.propertyDepth === 0) {
          togglesArray =
            "enabled solo shy quality effectsActive motionBlur adjustmentLayer threeDLayer blendingMode preserveTransparency parent inPoint stretch startTime outPoint label guideLayer comment autoOrient".split(
              " ",
            );
        } else {
          if (sourcePropertyGroup instanceof MaskPropertyGroup) {
            togglesArray =
              "maskMode inverted rotoBezier maskMotionBlur color locked maskFeatherFalloff".split(
                " ",
              );
          }
        }
        togglesArray.push("name");
        togglesArray.forEach(function (toggle) {
          try {
            destPropertyGroup[toggle] = sourcePropertyGroup[toggle];
          } catch (e) {
            debugLine(
              "Error toggling property: \'" + toggle + "\': " + e.message,
            );
          }
        });
      };
      var mirrorMarkers = function mirrorMarkers(sourceLayer, destLayer) {
        var sourceMarkerGroup = sourceLayer.property("ADBE Marker");
        var destMarkerGroup = destLayer.property("ADBE Marker");
        if (sourceMarkerGroup.numKeys > 0) {
          for (var i = 1; i <= sourceMarkerGroup.numKeys; i += 1) {
            var markerTime = sourceMarkerGroup.keyTime(i);
            var markerComment = sourceMarkerGroup.keyValue(i).comment;
            var markerDuration = sourceMarkerGroup.keyValue(i).duration;
            var markerChapter = sourceMarkerGroup.keyValue(i).chapter;
            var markerUrl = sourceMarkerGroup.keyValue(i).url;
            var markerFrameTarget = sourceMarkerGroup.keyValue(i).frameTarget;
            var markerCuePointName = sourceMarkerGroup.keyValue(i).cuePointName;
            var markerParams = sourceMarkerGroup.keyValue(i).getParameters();
            var newMarker = new MarkerValue(
              markerComment,
              markerChapter,
              markerUrl,
              markerFrameTarget,
              markerCuePointName,
            );
            newMarker.duration = markerDuration;
            newMarker.setParameter(markerParams);
            destMarkerGroup.setValueAtTime(markerTime, newMarker);
          }
        }
      };
      var mirrorLayerStyles = function mirrorLayerStyles(
        sourceLayer,
        destLayer,
      ) {
        var sourceLayerStyleGroup = sourceLayer.property("ADBE Layer Styles");
        var destLayerStyleGroup = destLayer.property("ADBE Layer Styles");
        var layerStyleCommandIDs = {
          "bevelEmboss/enabled": 9004,
          "chromeFX/enabled": 9005,
          "dropShadow/enabled": 9000,
          "frameFX/enabled": 9008,
          "gradientFill/enabled": 9007,
          "innerGlow/enabled": 9003,
          "innerShadow/enabled": 9001,
          "outerGlow/enabled": 9002,
          "solidFill/enabled": 9006,
        };
        if (!sourceLayerStyleGroup.canSetEnabled) {
          return;
        }
        var layerStyleProps = getPropertyChildren(sourceLayerStyleGroup, {
          groups: true,
          separate: false,
        });
        layerStyleProps.forEach(function (layerStyleProp) {
          if (!layerStyleProp.canSetEnabled) {
            return;
          }
          var sourceWasSelected = sourceLayer.selected;
          var destWasSelected = destLayer.selected;
          app.executeCommand(2004);
          destLayer.selected = true;
          app.executeCommand(layerStyleCommandIDs[layerStyleProp.matchName]);
          var destProp = destLayerStyleGroup.property(layerStyleProp.matchName);
          mirrorPropertyValues(layerStyleProp, destProp);
          app.executeCommand(2004);
          sourceLayer.selected = sourceWasSelected;
          destLayer.selected = destWasSelected;
        });
      };
      var mirrorPropertyGroup = function mirrorPropertyGroup(
        sourcePropertyGroup,
        destPropertyGroup,
      ) {
        buildMissingPropertyGroups(sourcePropertyGroup, destPropertyGroup);
        mirrorPropertyValues(sourcePropertyGroup, destPropertyGroup);
      };
      var mirrorTrackMatte = function mirrorTrackMatte(sourceLayer, destLayer) {
        destLayer.trackMatteType = sourceLayer.trackMatteType;
      };
      var mirrorLayer = function mirrorLayer(sourceLayer, itemLayer) {
        mirrorToggles(sourceLayer, itemLayer);
        mirrorMarkers(sourceLayer, itemLayer);
        if (sourceLayer.property("ADBE Mask Parade").numProperties > 0) {
          mirrorPropertyGroup(
            sourceLayer.property("ADBE Mask Parade"),
            itemLayer.property("ADBE Mask Parade"),
          );
        }
        if (sourceLayer.property("ADBE Effect Parade").numProperties > 0) {
          mirrorPropertyGroup(
            sourceLayer.property("ADBE Effect Parade"),
            itemLayer.property("ADBE Effect Parade"),
          );
        }
        mirrorPropertyGroup(
          sourceLayer.property("ADBE Transform Group"),
          itemLayer.property("ADBE Transform Group"),
        );
        mirrorLayerStyles(sourceLayer, itemLayer);
        if (sourceLayer.threeDLayer) {
          if (sourceLayer.containingComp.renderer === "ADBE Picasso") {
            mirrorPropertyGroup(
              sourceLayer.property("ADBE Extrsn Options Group"),
              itemLayer.property("ADBE Extrsn Options Group"),
            );
          }
          mirrorPropertyGroup(
            sourceLayer.property("ADBE Material Options Group"),
            itemLayer.property("ADBE Material Options Group"),
          );
        }
        mirrorTrackMatte(sourceLayer, itemLayer);
      };
      var replaceShapeLayer = function replaceShapeLayer(
        shapeLayer,
        sourceItem,
      ) {
        var removeLayer =
          arguments.length > 2 && arguments[2] !== undefined
            ? arguments[2]
            : true;
        if (!shapeLayer) {
          throw new Error("shapeLayer not specified!");
        }
        if (!sourceItem) {
          throw new Error("sourceItem not specified!");
        }
        debugLine("shapeLayer: " + shapeLayer.name);
        debugLine("sourceItem: " + sourceItem.name);
        var sourceLayer = shapeLayer;
        var comp = sourceLayer.containingComp;
        var itemLayer = null;
        try {
          itemLayer = comp.layers.add(sourceItem);
        } catch (err) {
          debugLine(
            "Likely XMP metadata error thrown. Trying to find the layer...",
          );
          debugLine(err.message);
          itemLayer = collectionWrapper(comp, "layer", "numLayers").find(
            function (layer) {
              return layer.name == sourceItem.name;
            },
          );
        }
        itemLayer.moveBefore(sourceLayer);
        var anchorMoved = sourceLayer.anchorPoint.isModified;
        var oldAnchorPropObject = null;
        if (anchorMoved) {
          oldAnchorPropObject = buildLocalPropObject(itemLayer.anchorPoint);
        }
        mirrorLayer(sourceLayer, itemLayer);
        if (anchorMoved && oldAnchorPropObject) {
          var newAnchorPropObject = buildLocalPropObject(itemLayer.anchorPoint);
          newAnchorPropObject.v += oldAnchorPropObject.v;
          if (newAnchorPropObject.hasOwnProperty("k")) {
            var newAnchorKeys = newAnchorPropObject.k;
            for (var i = 0, il = newAnchorKeys.length; i < il; i++) {
              var anchorKey = newAnchorKeys[i];
              anchorKey.v += oldAnchorPropObject.v;
            }
          }
          setPropFromLocal(itemLayer.anchorPoint, newAnchorPropObject);
        }
        itemLayer.name = sourceLayer.name;
        sourceLayer.enabled = false;
        if (removeLayer) {
          sourceLayer.remove();
        }
        return itemLayer;
      };
      module.exports = {
        mirrorPropertyGroup: mirrorPropertyGroup,
        replaceShapeLayer: replaceShapeLayer,
      };
    },
    "./extendscript/lib/project.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/events.js");
      var debugLine = _require.debugLine;
      var getProjectDirectory = function getProjectDirectory() {
        var throwIfNotFound =
          arguments.length > 0 && arguments[0] !== undefined
            ? arguments[0]
            : true;
        var aepFile = app.project.file;
        if (!aepFile) {
          debugLine(
            "project root path does not exist. asking the user to save.",
          );
          app.project.save();
          aepFile = app.project.file;
        }
        if (!aepFile) {
          if (throwIfNotFound) {
            throw new Error("You must save the project before continuing.");
          } else {
            return null;
          }
        }
        var folder = new Folder(aepFile.path);
        return folder.fsName;
      };
      module.exports = { getProjectDirectory: getProjectDirectory };
    },
    "./extendscript/lib/properties.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/collection.js");
      var collectionWrapper = _require.collectionWrapper;
      var normalizeProperty = function normalizeProperty(
        propertyParent,
        property,
      ) {
        if (
          ["X Position", "Y Position", "Z Position"].includes(property.name)
        ) {
          property = propertyParent.property("Position");
          property.dimensionsSeparated = true;
          return property.propertyGroup().property(property.name);
        } else {
          return property;
        }
      };
      var getPropertyChildren = function getPropertyChildren(propertyParent) {
        var _ref =
          arguments.length > 1 && arguments[1] !== undefined
            ? arguments[1]
            : {};
        var _ref$separate = _ref.separate;
        var separate = _ref$separate === undefined ? false : _ref$separate;
        var _ref$props = _ref.props;
        var props = _ref$props === undefined ? true : _ref$props;
        var _ref$groups = _ref.groups;
        var groups = _ref$groups === undefined ? true : _ref$groups;
        return collectionWrapper(
          propertyParent,
          "property",
          "numProperties",
        ).reduce(function (result, property) {
          if (property.PropertyType === PropertyType.PROPERTY) {
            if (separate) {
              property = normalizeProperty(propertyParent, property);
            }
            if (props) {
              return result.concat(property);
            }
          } else {
            if (
              property.PropertyType === PropertyType.INDEXED_GROUP ||
              property.PropertyType === PropertyType.NAMED_GROUP
            ) {
              var children = getPropertyChildren(property, {
                groups: groups,
                props: props,
                separate: separate,
              });
              if (groups) {
                return result.concat(property, children);
              } else {
                return result.concat(children);
              }
            }
          }
          return result;
        }, []);
      };
      var is3dPropOn2dLayer = function is3dPropOn2dLayer(prop) {
        return (
          !prop.propertyGroup(prop.propertyDepth).threeDLayer &&
          ["ADBE Orientation", "ADBE Rotate X", "ADBE Rotate Y"].includes(
            prop.matchName,
          )
        );
      };
      var isOrphanProp = function isOrphanProp(prop) {
        return (
          ((prop.isSeparationLeader && prop.dimensionsSeparated) ||
            prop.isSeparationFollower) &&
          !prop.separationLeader.dimensionsSeparated
        );
      };
      var canMirrorProp = function canMirrorProp(prop) {
        return !(is3dPropOn2dLayer(prop) || isOrphanProp(prop) || prop.elided);
      };
      var isNoValueOrCustomProp = function isNoValueOrCustomProp(prop) {
        return (
          prop.propertyValueType == PropertyValueType.NO_VALUE ||
          prop.propertyValueType == PropertyValueType.CUSTOM_VALUE
        );
      };
      var buildLocalPropObject = function buildLocalPropObject(sourceProp) {
        var sourcePropObject = { e: sourceProp.expression };
        if (sourceProp.numKeys > 0) {
          sourcePropObject.v = sourceProp.keyValue(1);
          sourcePropObject.k = [];
          for (var i = 1; i <= sourceProp.numKeys; i += 1) {
            var tempObject = {
              t: sourceProp.keyTime(i),
              v: sourceProp.keyValue(i),
            };
            if (sourceProp.keyInInterpolationType(i) !== 6412) {
              tempObject.iit = sourceProp.keyInInterpolationType(i);
            }
            if (sourceProp.keyOutInterpolationType(i) !== 6412) {
              tempObject.oit = sourceProp.keyOutInterpolationType(i);
            }
            tempObject.ite = sourceProp.keyInTemporalEase(i);
            tempObject.ote = sourceProp.keyOutTemporalEase(i);
            if (sourceProp.keyTemporalContinuous(i) === true) {
              tempObject.tc = true;
            }
            if (sourceProp.keyTemporalAutoBezier(i) === true) {
              tempObject.tab = true;
            }
            if (
              sourceProp.isSpatial &&
              sourceProp.propertyValueType !== PropertyValueType.COLOR
            ) {
              tempObject.ist = sourceProp.keyInSpatialTangent(i);
              tempObject.ost = sourceProp.keyOutSpatialTangent(i);
              tempObject.r = sourceProp.keyRoving(i);
              tempObject.sab = sourceProp.keySpatialAutoBezier(i);
              tempObject.sc = sourceProp.keySpatialContinuous(i);
            }
            sourcePropObject.k.push(tempObject);
          }
        } else {
          sourcePropObject.v = sourceProp.value;
        }
        return sourcePropObject;
      };
      var setPropFromLocal = function setPropFromLocal(
        destProp,
        sourcePropObject,
      ) {
        if (sourcePropObject.e !== null && sourcePropObject.e !== undefined) {
          destProp.expression = sourcePropObject.e;
        }
        for (var i = destProp.numKeys; i > 0; i--) {
          destProp.removeKey(i);
        }
        if (!sourcePropObject.k || !sourcePropObject.k.length) {
          destProp.setValue(sourcePropObject.v);
        } else {
          var keyTimes = [];
          var keyValues = [];
          sourcePropObject.k.forEach(function (keyObject) {
            keyTimes.push(keyObject.t);
            keyValues.push(keyObject.v);
          });
          destProp.setValuesAtTimes(keyTimes, keyValues);
          var firstITELength = sourcePropObject.k[0].ite.length;
          sourcePropObject.k.forEach(function (keyObject, i) {
            if (
              destProp.isInterpolationTypeValid(
                KeyframeInterpolationType.BEZIER,
              ) === true
            ) {
              var inTemporalEase = [];
              var outTemporalEase = [];
              for (var j = 0; j < firstITELength; j += 1) {
                inTemporalEase.push(
                  new KeyframeEase(
                    keyObject.ite[j].speed,
                    keyObject.ite[j].influence,
                  ),
                );
                outTemporalEase.push(
                  new KeyframeEase(
                    keyObject.ote[j].speed,
                    keyObject.ote[j].influence,
                  ),
                );
              }
              destProp.setTemporalEaseAtKey(
                i + 1,
                inTemporalEase,
                outTemporalEase,
              );
              if (keyObject.hasOwnProperty("tab")) {
                destProp.setTemporalAutoBezierAtKey(i + 1, keyObject.tab);
              }
              if (keyObject.hasOwnProperty("tc")) {
                destProp.setTemporalContinuousAtKey(i + 1, keyObject.tc);
              }
            }
            if (
              destProp.isSpatial &&
              destProp.propertyValueType !== PropertyValueType.COLOR
            ) {
              destProp.setSpatialContinuousAtKey(i + 1, keyObject.sc);
              destProp.setSpatialAutoBezierAtKey(i + 1, keyObject.sab);
              destProp.setRovingAtKey(i + 1, keyObject.r);
              var inTangent = keyObject.ist;
              var outTangent = keyObject.ost;
              destProp.setSpatialTangentsAtKey(i + 1, inTangent, outTangent);
            }
            var inInterpolationType = keyObject.iit || 6412;
            var outInterpolationType = keyObject.oit || 6412;
            destProp.setInterpolationTypeAtKey(
              i + 1,
              inInterpolationType,
              outInterpolationType,
            );
          });
        }
      };
      module.exports = {
        buildLocalPropObject: buildLocalPropObject,
        canMirrorProp: canMirrorProp,
        getPropertyChildren: getPropertyChildren,
        isNoValueOrCustomProp: isNoValueOrCustomProp,
        isOrphanProp: isOrphanProp,
        setPropFromLocal: setPropFromLocal,
      };
    },
    "./extendscript/panel.js": function (module, exports, __webpack_require__) {
      "use strict";
      var _require = __webpack_require__("./extendscript/lib/collection.js");
      var collectionWrapper = _require.collectionWrapper;
      var _require2 = __webpack_require__("./extendscript/import.js");
      var importProject = _require2.importProject;
      var importProjectComposition = _require2.importProjectComposition;
      var removeProject = _require2.removeProject;
      var _require3 = __webpack_require__("./extendscript/lib/comp.js");
      var getActiveComposition = _require3.getActiveComposition;
      var _require4 = __webpack_require__("./extendscript/helpers.js");
      var getImportFolder = _require4.getImportFolder;
      var _require5 = __webpack_require__("./extendscript/lib/config.js");
      var setConfig = _require5.setConfig;
      var CONFIG_NAMES = _require5.CONFIG_NAMES;
      var _require6 = __webpack_require__("./extendscript/lib/errors.js");
      var errorWrapper = _require6.errorWrapper;
      var _require7 = __webpack_require__("./extendscript/lib/events.js");
      var debugLine = _require7.debugLine;
      var _require8 = __webpack_require__("./extendscript/lib/project.js");
      var getProjectDirectory = _require8.getProjectDirectory;
      var _require9 = __webpack_require__("./extendscript/layers.js");
      var replaceCompositionLayers = _require9.replaceCompositionLayers;
      var _require10 = __webpack_require__("./extendscript/effect.js");
      var shrinkPictureSize = _require10.shrinkPictureSize;
      var getSocialImporterEffect = _require10.getSocialImporterEffect;
      var pasteSocialImporterEffect = _require10.pasteSocialImporterEffect;
      var ERROR_EVENT = "app.pluginplay.socialimporter.error";
      setConfig(
        CONFIG_NAMES.DEBUG_EVENT,
        "app.pluginplay.socialimporter.debug",
      );
      var importFolderItem = null;
      var importedProjectFolderItem = null;
      var GetProjectDirectory = errorWrapper(ERROR_EVENT, function (debugMode) {
        setConfig(CONFIG_NAMES.DEBUG_ENABLED, debugMode);
        debugLine("#GetProjectDirectory()");
        var projectDirectory = getProjectDirectory(false);
        debugLine("projectDirectory: " + projectDirectory);
        return JSON.stringify(projectDirectory);
      });
      var StartImport = errorWrapper(
        ERROR_EVENT,
        function (projectPath, data, debugMode) {
          importFolderItem = null;
          importedProjectFolderItem = null;
          setConfig(CONFIG_NAMES.DEBUG_ENABLED, debugMode);
          var type = data.type;
          debugLine("#StartImport()");
          debugLine("Data: " + JSON.stringify(data));
          debugLine("Project path: " + projectPath);
          debugLine("verifying active composition is selected");
          getActiveComposition(true);
          importFolderItem = getImportFolder(type + " Import");
          importedProjectFolderItem = importProject(projectPath);
          debugLine("start import complete");
          return JSON.stringify(
            importFolderItem.name.replace(type + " Import ", ""),
          );
        },
      );
      var ImportPost = errorWrapper(
        ERROR_EVENT,
        function (compositionName, data, debugMode) {
          setConfig(CONFIG_NAMES.DEBUG_ENABLED, debugMode);
          var type = data.type;
          var index = data.index;
          var groupIndex = data.groupIndex;
          debugLine("#ImportPost()");
          debugLine("Composition name: " + compositionName);
          debugLine("Data: " + JSON.stringify(data));
          debugLine("Getting parent composition");
          var parentComp = getActiveComposition(true);
          debugLine("parentComp: " + parentComp.name);
          if (!importFolderItem) {
            throw new Error(
              "No importFolderItem found. Did you run #StartImport() first?",
            );
          }
          if (!importedProjectFolderItem) {
            throw new Error(
              "No importedProjectFolderItem found. Did you run #StartImport() first?",
            );
          }
          var result = importProjectComposition(
            importFolderItem,
            importedProjectFolderItem,
            compositionName,
            type,
            index,
            groupIndex,
          );
          var composition = result.comp;
          data.importNum = parentComp.name;
          replaceCompositionLayers(composition, data, importFolderItem, index);
          if (!data.postPic || !data.postPic.asset) {
            debugLine("postPic not found, shrinking image size");
            shrinkPictureSize(composition);
          }
          return true;
        },
      );
      var FinishImport = errorWrapper(ERROR_EVENT, function (debugMode) {
        setConfig(CONFIG_NAMES.DEBUG_ENABLED, debugMode);
        debugLine("#FinishImport()");
        if (importedProjectFolderItem) {
          removeProject(importedProjectFolderItem);
        } else {
          debugLine("No importedProjectFolderItem found, nothing to remove.");
        }
        return true;
      });
      var CopyLayerSettings = errorWrapper(ERROR_EVENT, function (debugMode) {
        setConfig(CONFIG_NAMES.DEBUG_EVENT, debugMode);
        debugLine("#CopyLayerSettings()");
        debugLine("getting active composition");
        var comp = getActiveComposition(true);
        debugLine("compName: " + comp.name);
        debugLine("getting selected layers");
        if (comp.selectedLayers.length !== 1) {
          throw new Error(
            "You can only copy one selected layer at a time, and you must select at least one layer.",
          );
        }
        var selectedLayer = comp.selectedLayers[0];
        debugLine("selectedLayer: " + selectedLayer.name);
        if (
          !selectedLayer.source ||
          !(selectedLayer.source instanceof CompItem)
        ) {
          throw new Error(
            "You must select a composition layer created by social importer.",
          );
        }
        getSocialImporterEffect(selectedLayer.source);
        return JSON.stringify(selectedLayer.name);
      });
      var PasteLayerSettings = errorWrapper(
        ERROR_EVENT,
        function (sourceLayerName, debugMode) {
          setConfig(CONFIG_NAMES.DEBUG_EVENT, debugMode);
          debugLine("#PasteLayerSettings()");
          debugLine("sourceLayerName: " + sourceLayerName);
          debugLine("getting active composition");
          var comp = getActiveComposition(true);
          debugLine("compName: " + comp.name);
          debugLine("getting selected layers");
          if (comp.selectedLayers.length <= 0) {
            throw new Error(
              "You must select at least one layer to paste the effect to.",
            );
          }
          debugLine(comp.selectedLayers.length + " selected layers");
          debugLine("verifying composition layer");
          comp.selectedLayers.forEach(function (selectedLayer) {
            if (
              !selectedLayer.source ||
              !(selectedLayer.source instanceof CompItem)
            ) {
              throw new Error(
                "You must select a composition layer created by social importer.",
              );
            }
          });
          debugLine("finding source layer");
          var layers = collectionWrapper(comp, "layer", "numLayers");
          var layer = layers.find(function (layer) {
            return layer.name === sourceLayerName;
          });
          if (!layer) {
            throw new Error(
              "Cannot find the copied layer named: \'" +
                sourceLayerName +
                "\' in the selected composition.",
            );
          }
          debugLine("pasting effects");
          pasteSocialImporterEffect(layer, comp.selectedLayers);
          return true;
        },
      );
      module.exports = {
        CopyLayerSettings: CopyLayerSettings,
        FinishImport: FinishImport,
        GetProjectDirectory: GetProjectDirectory,
        ImportPost: ImportPost,
        PasteLayerSettings: PasteLayerSettings,
        StartImport: StartImport,
      };
    },
    "./node_modules/@sentry/webpack-plugin/src/sentry-webpack.module.js":
      function (module, exports, __webpack_require__) {
        (function (global) {
          global.SENTRY_RELEASE = {};
          global.SENTRY_RELEASE.id = "1.0.3";
        }).call(
          exports,
          __webpack_require__("./node_modules/webpack/buildin/global.js"),
        );
      },
    "./node_modules/cep-shim/es5-sham.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      (function (root, factory) {
        "use strict";
        !((__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
        (__WEBPACK_AMD_DEFINE_RESULT__ =
          typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
            ? __WEBPACK_AMD_DEFINE_FACTORY__.call(
                exports,
                __webpack_require__,
                exports,
                module,
              )
            : __WEBPACK_AMD_DEFINE_FACTORY__),
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
          (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      })(this, function () {
        var call = Function.call;
        var prototypeOfObject = Object.prototype;
        var owns = call.bind(prototypeOfObject.hasOwnProperty);
        var isEnumerable = call.bind(prototypeOfObject.propertyIsEnumerable);
        var toStr = call.bind(prototypeOfObject.toString);
        var supportsAccessors = owns(prototypeOfObject, "__defineGetter__");
        if (supportsAccessors) {
          defineGetter = call.bind(prototypeOfObject.__defineGetter__);
          defineSetter = call.bind(prototypeOfObject.__defineSetter__);
          lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
          lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
        }
        var isPrimitive = function isPrimitive(o) {
          return (
            o == null || (typeof o !== "object" && typeof o !== "function")
          );
        };
        if (!Object.getPrototypeOf) {
          Object.getPrototypeOf = function getPrototypeOf(object) {
            var proto = object.__proto__;
            if (proto || proto === null) {
              return proto;
            } else if (toStr(object.constructor) === "[object Function]") {
              return object.constructor.prototype;
            } else if (object instanceof Object) {
              return prototypeOfObject;
            } else {
              return null;
            }
          };
        }
        var doesGetOwnPropertyDescriptorWork =
          function doesGetOwnPropertyDescriptorWork(object) {
            try {
              object.sentinel = 0;
              return (
                Object.getOwnPropertyDescriptor(object, "sentinel").value === 0
              );
            } catch (exception) {
              return false;
            }
          };
        if (Object.defineProperty) {
          var getOwnPropertyDescriptorWorksOnObject =
            doesGetOwnPropertyDescriptorWork({});
          var getOwnPropertyDescriptorWorksOnDom =
            typeof document === "undefined" ||
            doesGetOwnPropertyDescriptorWork(document.createElement("div"));
          if (
            !getOwnPropertyDescriptorWorksOnDom ||
            !getOwnPropertyDescriptorWorksOnObject
          ) {
            var getOwnPropertyDescriptorFallback =
              Object.getOwnPropertyDescriptor;
          }
        }
        if (
          !Object.getOwnPropertyDescriptor ||
          getOwnPropertyDescriptorFallback
        ) {
          var ERR_NON_OBJECT =
            "Object.getOwnPropertyDescriptor called on a non-object: ";
          Object.getOwnPropertyDescriptor = function getOwnPropertyDescriptor(
            object,
            property,
          ) {
            if (isPrimitive(object)) {
              throw new TypeError(ERR_NON_OBJECT + object);
            }
            if (getOwnPropertyDescriptorFallback) {
              try {
                return getOwnPropertyDescriptorFallback.call(
                  Object,
                  object,
                  property,
                );
              } catch (exception) {}
            }
            if (!owns(object, property)) {
              return descriptor;
            }
            descriptor = {
              configurable: true,
              enumerable: isEnumerable(object, property),
            };
            if (supportsAccessors) {
              var prototype = object.__proto__;
              var notPrototypeOfObject = object !== prototypeOfObject;
              if (notPrototypeOfObject) {
                object.__proto__ = prototypeOfObject;
              }
              var getter = lookupGetter(object, property);
              var setter = lookupSetter(object, property);
              if (notPrototypeOfObject) {
                object.__proto__ = prototype;
              }
              if (getter || setter) {
                if (getter) {
                  descriptor.get = getter;
                }
                if (setter) {
                  descriptor.set = setter;
                }
                return descriptor;
              }
            }
            descriptor.value = object[property];
            descriptor.writable = true;
            return descriptor;
          };
        }
        if (!Object.getOwnPropertyNames) {
          Object.getOwnPropertyNames = function getOwnPropertyNames(object) {
            return Object.keys(object);
          };
        }
        if (!Object.create) {
          var supportsProto = !({ __proto__: null } instanceof Object);
          var shouldUseActiveX = function shouldUseActiveX() {
            if (!document.domain) {
              return false;
            }
            try {
              return !!new ActiveXObject("htmlfile");
            } catch (exception) {
              return false;
            }
          };
          var getEmptyViaActiveX = function getEmptyViaActiveX() {
            xDoc = new ActiveXObject("htmlfile");
            var script = "script";
            xDoc.write("<" + script + "></" + script + ">");
            xDoc.close();
            empty = xDoc.parentWindow.Object.prototype;
            xDoc = null;
            return empty;
          };
          var getEmptyViaIFrame = function getEmptyViaIFrame() {
            var iframe = document.createElement("iframe");
            var parent = document.body || document.documentElement;
            iframe.style.display = "none";
            parent.appendChild(iframe);
            iframe.src = "javascript:";
            empty = iframe.contentWindow.Object.prototype;
            parent.removeChild(iframe);
            iframe = null;
            return empty;
          };
          if (supportsProto || typeof document === "undefined") {
            createEmpty = function () {
              return { __proto__: null };
            };
          } else {
            createEmpty = function () {
              var empty = shouldUseActiveX()
                ? getEmptyViaActiveX()
                : getEmptyViaIFrame();
              delete empty.constructor;
              delete empty.hasOwnProperty;
              delete empty.propertyIsEnumerable;
              delete empty.isPrototypeOf;
              delete empty.toLocaleString;
              delete empty.toString;
              delete empty.valueOf;
              var Empty = function Empty() {};
              Empty.prototype = empty;
              createEmpty = function () {
                return new Empty();
              };
              return new Empty();
            };
          }
          Object.create = function create(prototype, properties) {
            var Type = function Type() {};
            if (prototype === null) {
              object = createEmpty();
            } else {
              if (prototype !== null && isPrimitive(prototype)) {
                throw new TypeError(
                  "Object prototype may only be an Object or null",
                );
              }
              Type.prototype = prototype;
              object = new Type();
              object.__proto__ = prototype;
            }
            if (properties !== void 0) {
              Object.defineProperties(object, properties);
            }
            return object;
          };
        }
        var doesDefinePropertyWork = function doesDefinePropertyWork(object) {
          try {
            Object.defineProperty(object, "sentinel", {});
            return "sentinel" in object;
          } catch (exception) {
            return false;
          }
        };
        if (Object.defineProperty) {
          var definePropertyWorksOnObject = doesDefinePropertyWork({});
          var definePropertyWorksOnDom =
            typeof document === "undefined" ||
            doesDefinePropertyWork(document.createElement("div"));
          if (!definePropertyWorksOnObject || !definePropertyWorksOnDom) {
            var definePropertyFallback = Object.defineProperty;
            var definePropertiesFallback = Object.defineProperties;
          }
        }
        if (!Object.defineProperty || definePropertyFallback) {
          var ERR_NON_OBJECT_DESCRIPTOR =
            "Property description must be an object: ";
          var ERR_NON_OBJECT_TARGET =
            "Object.defineProperty called on non-object: ";
          var ERR_ACCESSORS_NOT_SUPPORTED =
            "getters & setters can not be defined on this javascript engine";
          Object.defineProperty = function defineProperty(
            object,
            property,
            descriptor,
          ) {
            if (isPrimitive(object)) {
              throw new TypeError(ERR_NON_OBJECT_TARGET + object);
            }
            if (isPrimitive(descriptor)) {
              throw new TypeError(ERR_NON_OBJECT_DESCRIPTOR + descriptor);
            }
            if (definePropertyFallback) {
              try {
                return definePropertyFallback.call(
                  Object,
                  object,
                  property,
                  descriptor,
                );
              } catch (exception) {}
            }
            if ("value" in descriptor) {
              if (
                supportsAccessors &&
                (lookupGetter(object, property) ||
                  lookupSetter(object, property))
              ) {
                var prototype = object.__proto__;
                object.__proto__ = prototypeOfObject;
                delete object[property];
                object[property] = descriptor.value;
                object.__proto__ = prototype;
              } else {
                object[property] = descriptor.value;
              }
            } else {
              var hasGetter = "get" in descriptor;
              var hasSetter = "set" in descriptor;
              if (!supportsAccessors && (hasGetter || hasSetter)) {
                throw new TypeError(ERR_ACCESSORS_NOT_SUPPORTED);
              }
              if (hasGetter) {
                defineGetter(object, property, descriptor.get);
              }
              if (hasSetter) {
                defineSetter(object, property, descriptor.set);
              }
            }
            return object;
          };
        }
        if (!Object.defineProperties || definePropertiesFallback) {
          Object.defineProperties = function defineProperties(
            object,
            properties,
          ) {
            if (definePropertiesFallback) {
              try {
                return definePropertiesFallback.call(
                  Object,
                  object,
                  properties,
                );
              } catch (exception) {}
            }
            Object.keys(properties).forEach(function (property) {
              if (property !== "__proto__") {
                Object.defineProperty(object, property, properties[property]);
              }
            });
            return object;
          };
        }
        if (!Object.seal) {
          Object.seal = function seal(object) {
            if (Object(object) !== object) {
              throw new TypeError("Object.seal can only be called on Objects.");
            }
            return object;
          };
        }
        if (!Object.freeze) {
          Object.freeze = function freeze(object) {
            if (Object(object) !== object) {
              throw new TypeError(
                "Object.freeze can only be called on Objects.",
              );
            }
            return object;
          };
        }
        try {
          Object.freeze(function () {});
        } catch (exception) {
          Object.freeze = (function (freezeObject) {
            return function freeze(object) {
              if (typeof object === "function") {
                return object;
              } else {
                return freezeObject(object);
              }
            };
          })(Object.freeze);
        }
        if (!Object.preventExtensions) {
          Object.preventExtensions = function preventExtensions(object) {
            if (Object(object) !== object) {
              throw new TypeError(
                "Object.preventExtensions can only be called on Objects.",
              );
            }
            return object;
          };
        }
        if (!Object.isSealed) {
          Object.isSealed = function isSealed(object) {
            if (Object(object) !== object) {
              throw new TypeError(
                "Object.isSealed can only be called on Objects.",
              );
            }
            return false;
          };
        }
        if (!Object.isFrozen) {
          Object.isFrozen = function isFrozen(object) {
            if (Object(object) !== object) {
              throw new TypeError(
                "Object.isFrozen can only be called on Objects.",
              );
            }
            return false;
          };
        }
        if (!Object.isExtensible) {
          Object.isExtensible = function isExtensible(object) {
            if (Object(object) !== object) {
              throw new TypeError(
                "Object.isExtensible can only be called on Objects.",
              );
            }
            var name = "";
            while (owns(object, name)) {
              name += "?";
            }
            object[name] = true;
            var returnValue = owns(object, name);
            delete object[name];
            return returnValue;
          };
        }
      });
    },
    "./node_modules/cep-shim/es5-shim.js": function (
      module,
      exports,
      __webpack_require__,
    ) {
      (function (root, factory) {
        "use strict";
        !((__WEBPACK_AMD_DEFINE_FACTORY__ = factory),
        (__WEBPACK_AMD_DEFINE_RESULT__ =
          typeof __WEBPACK_AMD_DEFINE_FACTORY__ === "function"
            ? __WEBPACK_AMD_DEFINE_FACTORY__.call(
                exports,
                __webpack_require__,
                exports,
                module,
              )
            : __WEBPACK_AMD_DEFINE_FACTORY__),
        __WEBPACK_AMD_DEFINE_RESULT__ !== undefined &&
          (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
      })(this, function () {
        var $Array = Array;
        var ArrayPrototype = $Array.prototype;
        var $Object = Object;
        var ObjectPrototype = $Object.prototype;
        var $Function = Function;
        var FunctionPrototype = $Function.prototype;
        var $String = String;
        var StringPrototype = $String.prototype;
        var $Number = Number;
        var NumberPrototype = $Number.prototype;
        var array_slice = ArrayPrototype.slice;
        var array_splice = ArrayPrototype.splice;
        var array_push = ArrayPrototype.push;
        var array_unshift = ArrayPrototype.unshift;
        var array_concat = ArrayPrototype.concat;
        var array_join = ArrayPrototype.join;
        var call = FunctionPrototype.call;
        var apply = FunctionPrototype.apply;
        var max = Math.max;
        var min = Math.min;
        var to_string = ObjectPrototype.toString;
        var hasToStringTag =
          typeof Symbol === "function" &&
          typeof Symbol.toStringTag === "symbol";
        var fnToStr = Function.prototype.toString;
        var constructorRegex = /^\s*class /;
        var isES6ClassFn = function isES6ClassFn(value) {
          try {
            var fnStr = fnToStr.call(value);
            var singleStripped = fnStr.replace(/\/\/.*\n/g, "");
            var multiStripped = singleStripped.replace(/\/\*[.\s\S]*\*\//g, "");
            var spaceStripped = multiStripped
              .replace(/\n/gm, " ")
              .replace(/ {2}/g, " ");
            return constructorRegex.test(spaceStripped);
          } catch (e) {
            return false;
          }
        };
        var tryFunctionObject = function tryFunctionObject(value) {
          try {
            if (isES6ClassFn(value)) {
              return false;
            }
            fnToStr.call(value);
            return true;
          } catch (e) {
            return false;
          }
        };
        var fnClass = "[object Function]";
        var genClass = "[object GeneratorFunction]";
        var isCallable = function isCallable(value) {
          if (!value) {
            return false;
          }
          if (typeof value !== "function" && typeof value !== "object") {
            return false;
          }
          if (hasToStringTag) {
            return tryFunctionObject(value);
          }
          if (isES6ClassFn(value)) {
            return false;
          }
          var strClass = to_string.call(value);
          return strClass === fnClass || strClass === genClass;
        };
        var regexExec = RegExp.prototype.exec;
        var tryRegexExec = function tryRegexExec(value) {
          try {
            regexExec.call(value);
            return true;
          } catch (e) {
            return false;
          }
        };
        var regexClass = "[object RegExp]";
        isRegex = function isRegex(value) {
          if (typeof value !== "object") {
            return false;
          }
          return hasToStringTag
            ? tryRegexExec(value)
            : to_string.call(value) === regexClass;
        };
        var strValue = String.prototype.valueOf;
        var tryStringObject = function tryStringObject(value) {
          try {
            strValue.call(value);
            return true;
          } catch (e) {
            return false;
          }
        };
        var stringClass = "[object String]";
        isString = function isString(value) {
          if (typeof value === "string") {
            return true;
          }
          if (typeof value !== "object") {
            return false;
          }
          return hasToStringTag
            ? tryStringObject(value)
            : to_string.call(value) === stringClass;
        };
        var supportsDescriptors =
          $Object.defineProperty &&
          (function () {
            try {
              var obj = {};
              $Object.defineProperty(obj, "x", {
                enumerable: false,
                value: obj,
              });
              for (var _ in obj) {
                return false;
              }
              return obj.x === obj;
            } catch (e) {
              return false;
            }
          })();
        var defineProperties = (function (has) {
          if (supportsDescriptors) {
            defineProperty = function (object, name, method, forceAssign) {
              if (!forceAssign && name in object) {
                return;
              }
              $Object.defineProperty(object, name, {
                configurable: true,
                enumerable: false,
                value: method,
                writable: true,
              });
            };
          } else {
            defineProperty = function (object, name, method, forceAssign) {
              if (!forceAssign && name in object) {
                return;
              }
              object[name] = method;
            };
          }
          return function defineProperties(object, map, forceAssign) {
            for (var name in map) {
              if (has.call(map, name)) {
                defineProperty(object, name, map[name], forceAssign);
              }
            }
          };
        })(ObjectPrototype.hasOwnProperty);
        var isPrimitive = function isPrimitive(input) {
          var type = typeof input;
          return input === null || (type !== "object" && type !== "function");
        };
        var isActualNaN =
          $Number.isNaN ||
          function isActualNaN(x) {
            return x !== x;
          };
        var ES = {
          ToInteger: function ToInteger(num) {
            var n = num;
            if (isActualNaN(n)) {
              n = 0;
            } else {
              if (n !== 0 && n !== inf && n !== -inf) {
                n = n > 0 || -1 * Math.floor(Math.abs(n));
              }
            }
            return n;
          },
          ToObject: function (o) {
            if (o == null) {
              throw new TypeError("can\'t convert " + o + " to object");
            }
            return $Object(o);
          },
          ToPrimitive: function ToPrimitive(input) {
            if (isPrimitive(input)) {
              return input;
            }
            valueOf = input.valueOf;
            if (isCallable(valueOf)) {
              val = valueOf.call(input);
              if (isPrimitive(val)) {
                return val;
              }
            }
            toStr = input.toString;
            if (isCallable(toStr)) {
              val = toStr.call(input);
              if (isPrimitive(val)) {
                return val;
              }
            }
            throw new TypeError();
          },
          ToUint32: function ToUint32(x) {
            return x >>> 0;
          },
        };
        var Empty = function Empty() {};
        defineProperties(FunctionPrototype, {
          bind: function bind(that) {
            var target = this;
            if (!isCallable(target)) {
              throw new TypeError(
                "Function.prototype.bind called on incompatible " + target,
              );
            }
            var args = array_slice.call(arguments, 1);
            var binder = function () {
              if (this instanceof bound) {
                var result = apply.call(
                  target,
                  this,
                  array_concat.call(args, array_slice.call(arguments)),
                );
                if ($Object(result) === result) {
                  return result;
                }
                return this;
              } else {
                return apply.call(
                  target,
                  that,
                  array_concat.call(args, array_slice.call(arguments)),
                );
              }
            };
            var boundLength = max(0, target.length - args.length);
            var boundArgs = [];
            for (var i = 0; i < boundLength; i += 1) {
              array_push.call(boundArgs, "$" + i);
            }
            bound = $Function(
              "binder",
              "return function (" +
                array_join.call(boundArgs, ",") +
                "){ return binder.apply(this, arguments); }",
            )(binder);
            if (target.prototype) {
              Empty.prototype = target.prototype;
              bound.prototype = new Empty();
              Empty.prototype = null;
            }
            return bound;
          },
        });
        var owns = call.bind(ObjectPrototype.hasOwnProperty);
        var toStr = call.bind(ObjectPrototype.toString);
        var arraySlice = call.bind(array_slice);
        var arraySliceApply = apply.bind(array_slice);
        if (
          typeof document === "object" &&
          document &&
          document.documentElement
        ) {
          try {
            arraySlice(document.documentElement.childNodes);
          } catch (e) {
            var origArraySlice = arraySlice;
            var origArraySliceApply = arraySliceApply;
            arraySlice = function arraySliceIE(arr) {
              var r = [];
              var i = arr.length;
              while (i-- > 0) {
                r[i] = arr[i];
              }
              return origArraySliceApply(r, origArraySlice(arguments, 1));
            };
            arraySliceApply = function arraySliceApplyIE(arr, args) {
              return origArraySliceApply(arraySlice(arr), args);
            };
          }
        }
        var strSlice = call.bind(StringPrototype.slice);
        var strSplit = call.bind(StringPrototype.split);
        var strIndexOf = call.bind(StringPrototype.indexOf);
        var pushCall = call.bind(array_push);
        var isEnum = call.bind(ObjectPrototype.propertyIsEnumerable);
        var arraySort = call.bind(ArrayPrototype.sort);
        var isArray =
          $Array.isArray ||
          function isArray(obj) {
            return toStr(obj) === "[object Array]";
          };
        var hasUnshiftReturnValueBug = [].unshift(0) !== 1;
        defineProperties(
          ArrayPrototype,
          {
            unshift: function () {
              array_unshift.apply(this, arguments);
              return this.length;
            },
          },
          hasUnshiftReturnValueBug,
        );
        defineProperties($Array, { isArray: isArray });
        var boxedString = $Object("a");
        var splitString = boxedString[0] !== "a" || !(0 in boxedString);
        var properlyBoxesContext = function properlyBoxed(method) {
          var properlyBoxesNonStrict = true;
          var properlyBoxesStrict = true;
          var threwException = false;
          if (method) {
            try {
              method.call("foo", function (_, __, context) {
                if (typeof context !== "object") {
                  properlyBoxesNonStrict = false;
                }
              });
              method.call(
                [1],
                function () {
                  "use strict";
                  properlyBoxesStrict = typeof this === "string";
                },
                "x",
              );
            } catch (e) {
              threwException = true;
            }
          }
          return (
            !!method &&
            !threwException &&
            properlyBoxesNonStrict &&
            properlyBoxesStrict
          );
        };
        defineProperties(
          ArrayPrototype,
          {
            forEach: function forEach(callbackfn) {
              var object = ES.ToObject(this);
              var self =
                splitString && isString(this) ? strSplit(this, "") : object;
              var i = -1;
              var length = ES.ToUint32(self.length);
              if (arguments.length > 1) {
                T = arguments[1];
              }
              if (!isCallable(callbackfn)) {
                throw new TypeError(
                  "Array.prototype.forEach callback must be a function",
                );
              }
              while (++i < length) {
                if (i in self) {
                  if (typeof T === "undefined") {
                    callbackfn(self[i], i, object);
                  } else {
                    callbackfn.call(T, self[i], i, object);
                  }
                }
              }
            },
          },
          !properlyBoxesContext(ArrayPrototype.forEach),
        );
        defineProperties(
          ArrayPrototype,
          {
            map: function map(callbackfn) {
              var object = ES.ToObject(this);
              var self =
                splitString && isString(this) ? strSplit(this, "") : object;
              var length = ES.ToUint32(self.length);
              var result = $Array(length);
              if (arguments.length > 1) {
                T = arguments[1];
              }
              if (!isCallable(callbackfn)) {
                throw new TypeError(
                  "Array.prototype.map callback must be a function",
                );
              }
              for (var i = 0; i < length; i += 1) {
                if (i in self) {
                  if (typeof T === "undefined") {
                    result[i] = callbackfn(self[i], i, object);
                  } else {
                    result[i] = callbackfn.call(T, self[i], i, object);
                  }
                }
              }
              return result;
            },
          },
          !properlyBoxesContext(ArrayPrototype.map),
        );
        defineProperties(
          ArrayPrototype,
          {
            filter: function filter(callbackfn) {
              var object = ES.ToObject(this);
              var self =
                splitString && isString(this) ? strSplit(this, "") : object;
              var length = ES.ToUint32(self.length);
              var result = [];
              if (arguments.length > 1) {
                T = arguments[1];
              }
              if (!isCallable(callbackfn)) {
                throw new TypeError(
                  "Array.prototype.filter callback must be a function",
                );
              }
              for (var i = 0; i < length; i += 1) {
                if (i in self) {
                  value = self[i];
                  if (
                    typeof T === "undefined"
                      ? callbackfn(value, i, object)
                      : callbackfn.call(T, value, i, object)
                  ) {
                    pushCall(result, value);
                  }
                }
              }
              return result;
            },
          },
          !properlyBoxesContext(ArrayPrototype.filter),
        );
        defineProperties(
          ArrayPrototype,
          {
            every: function every(callbackfn) {
              var object = ES.ToObject(this);
              var self =
                splitString && isString(this) ? strSplit(this, "") : object;
              var length = ES.ToUint32(self.length);
              if (arguments.length > 1) {
                T = arguments[1];
              }
              if (!isCallable(callbackfn)) {
                throw new TypeError(
                  "Array.prototype.every callback must be a function",
                );
              }
              for (var i = 0; i < length; i += 1) {
                if (
                  i in self &&
                  !(typeof T === "undefined"
                    ? callbackfn(self[i], i, object)
                    : callbackfn.call(T, self[i], i, object))
                ) {
                  return false;
                }
              }
              return true;
            },
          },
          !properlyBoxesContext(ArrayPrototype.every),
        );
        defineProperties(
          ArrayPrototype,
          {
            some: function some(callbackfn) {
              var object = ES.ToObject(this);
              var self =
                splitString && isString(this) ? strSplit(this, "") : object;
              var length = ES.ToUint32(self.length);
              if (arguments.length > 1) {
                T = arguments[1];
              }
              if (!isCallable(callbackfn)) {
                throw new TypeError(
                  "Array.prototype.some callback must be a function",
                );
              }
              for (var i = 0; i < length; i += 1) {
                if (
                  i in self &&
                  (typeof T === "undefined"
                    ? callbackfn(self[i], i, object)
                    : callbackfn.call(T, self[i], i, object))
                ) {
                  return true;
                }
              }
              return false;
            },
          },
          !properlyBoxesContext(ArrayPrototype.some),
        );
        var reduceCoercesToObject = false;
        if (ArrayPrototype.reduce) {
          reduceCoercesToObject =
            typeofArrayPrototype.reduce.call(
              "es5",
              function (_, __, ___, list) {
                return list;
              },
            ) === "object";
        }
        defineProperties(
          ArrayPrototype,
          {
            reduce: function reduce(callbackfn) {
              var object = ES.ToObject(this);
              var self =
                splitString && isString(this) ? strSplit(this, "") : object;
              var length = ES.ToUint32(self.length);
              if (!isCallable(callbackfn)) {
                throw new TypeError(
                  "Array.prototype.reduce callback must be a function",
                );
              }
              if (length === 0 && arguments.length === 1) {
                throw new TypeError(
                  "reduce of empty array with no initial value",
                );
              }
              var i = 0;
              if (arguments.length >= 2) {
                result = arguments[1];
              } else {
                do {
                  if (i in self) {
                    result = self[i++];
                    break;
                  }
                  if (++i >= length) {
                    throw new TypeError(
                      "reduce of empty array with no initial value",
                    );
                  }
                } while (true);
              }
              for (; i < length; i++) {
                if (i in self) {
                  result = callbackfn(result, self[i], i, object);
                }
              }
              return result;
            },
          },
          !reduceCoercesToObject,
        );
        var reduceRightCoercesToObject = false;
        if (ArrayPrototype.reduceRight) {
          reduceRightCoercesToObject =
            typeofArrayPrototype.reduceRight.call(
              "es5",
              function (_, __, ___, list) {
                return list;
              },
            ) === "object";
        }
        defineProperties(
          ArrayPrototype,
          {
            reduceRight: function reduceRight(callbackfn) {
              var object = ES.ToObject(this);
              var self =
                splitString && isString(this) ? strSplit(this, "") : object;
              var length = ES.ToUint32(self.length);
              if (!isCallable(callbackfn)) {
                throw new TypeError(
                  "Array.prototype.reduceRight callback must be a function",
                );
              }
              if (length === 0 && arguments.length === 1) {
                throw new TypeError(
                  "reduceRight of empty array with no initial value",
                );
              }
              var i = length - 1;
              if (arguments.length >= 2) {
                result = arguments[1];
              } else {
                do {
                  if (i in self) {
                    result = self[i--];
                    break;
                  }
                  if (--i < 0) {
                    throw new TypeError(
                      "reduceRight of empty array with no initial value",
                    );
                  }
                } while (true);
              }
              if (i < 0) {
                return result;
              }
              do {
                if (i in self) {
                  result = callbackfn(result, self[i], i, object);
                }
              } while (i--);
              return result;
            },
          },
          !reduceRightCoercesToObject,
        );
        var hasFirefox2IndexOfBug =
          ArrayPrototype.indexOf && [0, 1].indexOf(1, 2) !== -1;
        defineProperties(
          ArrayPrototype,
          {
            indexOf: function indexOf(searchElement) {
              var self =
                splitString && isString(this)
                  ? strSplit(this, "")
                  : ES.ToObject(this);
              var length = ES.ToUint32(self.length);
              if (length === 0) {
                return -1;
              }
              var i = 0;
              if (arguments.length > 1) {
                i = ES.ToInteger(arguments[1]);
              }
              i = i >= 0 ? i : max(0, length + i);
              for (; i < length; i++) {
                if (i in self && self[i] === searchElement) {
                  return i;
                }
              }
              return -1;
            },
          },
          hasFirefox2IndexOfBug,
        );
        var hasFirefox2LastIndexOfBug =
          ArrayPrototype.lastIndexOf && [0, 1].lastIndexOf(0, -3) !== -1;
        defineProperties(
          ArrayPrototype,
          {
            lastIndexOf: function lastIndexOf(searchElement) {
              var self =
                splitString && isString(this)
                  ? strSplit(this, "")
                  : ES.ToObject(this);
              var length = ES.ToUint32(self.length);
              if (length === 0) {
                return -1;
              }
              var i = length - 1;
              if (arguments.length > 1) {
                i = min(i, ES.ToInteger(arguments[1]));
              }
              i = i >= 0 ? i : length - Math.abs(i);
              for (; i >= 0; i--) {
                if (i in self && searchElement === self[i]) {
                  return i;
                }
              }
              return -1;
            },
          },
          hasFirefox2LastIndexOfBug,
        );
        var spliceNoopReturnsEmptyArray = (function () {
          var a = [1, 2];
          var result = a.splice();
          return a.length === 2 && isArray(result) && result.length === 0;
        })();
        defineProperties(
          ArrayPrototype,
          {
            splice: function splice(start, deleteCount) {
              if (arguments.length === 0) {
                return [];
              } else {
                return array_splice.apply(this, arguments);
              }
            },
          },
          !spliceNoopReturnsEmptyArray,
        );
        var spliceWorksWithEmptyObject = (function () {
          var obj = {};
          ArrayPrototype.splice.call(obj, 0, 0, 1);
          return obj.length === 1;
        })();
        defineProperties(
          ArrayPrototype,
          {
            splice: function splice(start, deleteCount) {
              if (arguments.length === 0) {
                return [];
              }
              var args = arguments;
              this.length = max(ES.ToInteger(this.length), 0);
              if (arguments.length > 0 && typeof deleteCount !== "number") {
                args = arraySlice(arguments);
                if (args.length < 2) {
                  pushCall(args, this.length - start);
                } else {
                  args[1] = ES.ToInteger(deleteCount);
                }
              }
              return array_splice.apply(this, args);
            },
          },
          !spliceWorksWithEmptyObject,
        );
        var spliceWorksWithLargeSparseArrays = (function () {
          var arr = new $Array(100000);
          arr[8] = "x";
          arr.splice(1, 1);
          return arr.indexOf("x") === 7;
        })();
        var spliceWorksWithSmallSparseArrays = (function () {
          var n = 256;
          var arr = [];
          arr[n] = "a";
          arr.splice(n + 1, 0, "b");
          return arr[n] === "a";
        })();
        defineProperties(
          ArrayPrototype,
          {
            splice: function splice(start, deleteCount) {
              var O = ES.ToObject(this);
              var A = [];
              var len = ES.ToUint32(O.length);
              var relativeStart = ES.ToInteger(start);
              var actualStart =
                relativeStart < 0
                  ? max(len + relativeStart, 0)
                  : min(relativeStart, len);
              var actualDeleteCount = min(
                max(ES.ToInteger(deleteCount), 0),
                len - actualStart,
              );
              var k = 0;
              while (k < actualDeleteCount) {
                from = $String(actualStart + k);
                if (owns(O, from)) {
                  A[k] = O[from];
                }
                k += 1;
              }
              var items = arraySlice(arguments, 2);
              var itemCount = items.length;
              if (itemCount < actualDeleteCount) {
                k = actualStart;
                var maxK = len - actualDeleteCount;
                while (k < maxK) {
                  from = $String(k + actualDeleteCount);
                  to = $String(k + itemCount);
                  if (owns(O, from)) {
                    O[to] = O[from];
                  } else {
                    delete O[to];
                  }
                  k += 1;
                }
                k = len;
                var minK = len - actualDeleteCount + itemCount;
                while (k > minK) {
                  delete O[k - 1];
                  k -= 1;
                }
              } else {
                if (itemCount > actualDeleteCount) {
                  k = len - actualDeleteCount;
                  while (k > actualStart) {
                    from = $String(k + actualDeleteCount - 1);
                    to = $String(k + itemCount - 1);
                    if (owns(O, from)) {
                      O[to] = O[from];
                    } else {
                      delete O[to];
                    }
                    k -= 1;
                  }
                }
              }
              k = actualStart;
              for (var i = 0; i < items.length; i += 1) {
                O[k] = items[i];
                k += 1;
              }
              O.length = len - actualDeleteCount + itemCount;
              return A;
            },
          },
          !spliceWorksWithLargeSparseArrays ||
            !spliceWorksWithSmallSparseArrays,
        );
        var originalJoin = ArrayPrototype.join;
        try {
          hasStringJoinBug = Array.prototype.join.call("123", ",") !== "1,2,3";
        } catch (e) {
          hasStringJoinBug = true;
        }
        if (hasStringJoinBug) {
          defineProperties(
            ArrayPrototype,
            {
              join: function join(separator) {
                var sep = typeof separator === "undefined" ? "," : separator;
                return originalJoin.call(
                  isString(this) ? strSplit(this, "") : this,
                  sep,
                );
              },
            },
            hasStringJoinBug,
          );
        }
        var hasJoinUndefinedBug = [1, 2].join(undefined) !== "1,2";
        if (hasJoinUndefinedBug) {
          defineProperties(
            ArrayPrototype,
            {
              join: function join(separator) {
                var sep = typeof separator === "undefined" ? "," : separator;
                return originalJoin.call(this, sep);
              },
            },
            hasJoinUndefinedBug,
          );
        }
        var pushShim = function push(item) {
          var O = ES.ToObject(this);
          var n = ES.ToUint32(O.length);
          var i = 0;
          while (i < arguments.length) {
            O[n + i] = arguments[i];
            i += 1;
          }
          O.length = n + i;
          return n + i;
        };
        var pushIsNotGeneric = (function () {
          var obj = {};
          var result = Array.prototype.push.call(obj, undefined);
          return (
            result !== 1 ||
            obj.length !== 1 ||
            typeof obj[0] !== "undefined" ||
            !owns(obj, 0)
          );
        })();
        defineProperties(
          ArrayPrototype,
          {
            push: function push(item) {
              if (isArray(this)) {
                return array_push.apply(this, arguments);
              }
              return pushShim.apply(this, arguments);
            },
          },
          pushIsNotGeneric,
        );
        var pushUndefinedIsWeird = (function () {
          var arr = [];
          var result = arr.push(undefined);
          return (
            result !== 1 ||
            arr.length !== 1 ||
            typeof arr[0] !== "undefined" ||
            !owns(arr, 0)
          );
        })();
        defineProperties(
          ArrayPrototype,
          { push: pushShim },
          pushUndefinedIsWeird,
        );
        defineProperties(
          ArrayPrototype,
          {
            slice: function (start, end) {
              var arr = isString(this) ? strSplit(this, "") : this;
              return arraySliceApply(arr, arguments);
            },
          },
          splitString,
        );
        var sortIgnoresNonFunctions = (function () {
          try {
            [1, 2].sort(null);
          } catch (e) {
            try {
              [1, 2].sort({});
            } catch (e2) {
              return false;
            }
          }
          return true;
        })();
        var sortThrowsOnRegex = (function () {
          try {
            [1, 2].sort(/a/);
            return false;
          } catch (e) {}
          return true;
        })();
        var sortIgnoresUndefined = (function () {
          try {
            [1, 2].sort(undefined);
            return true;
          } catch (e) {}
          return false;
        })();
        defineProperties(
          ArrayPrototype,
          {
            sort: function sort(compareFn) {
              if (typeof compareFn === "undefined") {
                return arraySort(this);
              }
              if (!isCallable(compareFn)) {
                throw new TypeError(
                  "Array.prototype.sort callback must be a function",
                );
              }
              return arraySort(this, compareFn);
            },
          },
          sortIgnoresNonFunctions ||
            !sortIgnoresUndefined ||
            !sortThrowsOnRegex,
        );
        var hasDontEnumBug = !isEnum({ toString: null }, "toString");
        var hasProtoEnumBug = isEnum(function () {}, "prototype");
        var hasStringEnumBug = !owns("x", "0");
        var equalsConstructorPrototype = function (o) {
          var ctor = o.constructor;
          return ctor && ctor.prototype === o;
        };
        var excludedKeys = {
          $applicationCache: true,
          $console: true,
          $external: true,
          $frame: true,
          $frameElement: true,
          $frames: true,
          $height: true,
          $innerHeight: true,
          $innerWidth: true,
          $localStorage: true,
          $outerHeight: true,
          $outerWidth: true,
          $pageXOffset: true,
          $pageYOffset: true,
          $parent: true,
          $scrollLeft: true,
          $scrollTop: true,
          $scrollX: true,
          $scrollY: true,
          $self: true,
          $top: true,
          $webkitIndexedDB: true,
          $webkitStorageInfo: true,
          $width: true,
          $window: true,
        };
        var hasAutomationEqualityBug = (function () {
          if (typeof window === "undefined") {
            return false;
          }
          for (var k in window) {
            try {
              if (
                !excludedKeys["$" + k] &&
                owns(window, k) &&
                window[k] !== null &&
                typeof window[k] === "object"
              ) {
                equalsConstructorPrototype(window[k]);
              }
            } catch (e) {
              return true;
            }
          }
          return false;
        })();
        var equalsConstructorPrototypeIfNotBuggy = function (object) {
          if (typeof window === "undefined" || !hasAutomationEqualityBug) {
            return equalsConstructorPrototype(object);
          }
          try {
            return equalsConstructorPrototype(object);
          } catch (e) {
            return false;
          }
        };
        var dontEnums = [
          "toString",
          "toLocaleString",
          "valueOf",
          "hasOwnProperty",
          "isPrototypeOf",
          "propertyIsEnumerable",
          "constructor",
        ];
        var dontEnumsLength = dontEnums.length;
        var isStandardArguments = function isArguments(value) {
          return toStr(value) === "[object Arguments]";
        };
        var isLegacyArguments = function isArguments(value) {
          return (
            value !== null &&
            typeof value === "object" &&
            typeof value.length === "number" &&
            value.length >= 0 &&
            !isArray(value) &&
            isCallable(value.callee)
          );
        };
        var isArguments = isStandardArguments(arguments)
          ? isStandardArguments
          : isLegacyArguments;
        defineProperties($Object, {
          keys: function keys(object) {
            var isFn = isCallable(object);
            var isArgs = isArguments(object);
            var isObject = object !== null && typeof object === "object";
            var isStr = isObject && isString(object);
            if (!isObject && !isFn && !isArgs) {
              throw new TypeError("Object.keys called on a non-object");
            }
            var theKeys = [];
            var skipProto = hasProtoEnumBug && isFn;
            if ((isStr && hasStringEnumBug) || isArgs) {
              for (var i = 0; i < object.length; i += 1) {
                pushCall(theKeys, $String(i));
              }
            }
            if (!isArgs) {
              for (var name in object) {
                if (
                  !(skipProto && name === "prototype") &&
                  owns(object, name)
                ) {
                  pushCall(theKeys, $String(name));
                }
              }
            }
            if (hasDontEnumBug) {
              var skipConstructor =
                equalsConstructorPrototypeIfNotBuggy(object);
              for (var j = 0; j < dontEnumsLength; j += 1) {
                var dontEnum = dontEnums[j];
                if (
                  !(skipConstructor && dontEnum === "constructor") &&
                  owns(object, dontEnum)
                ) {
                  pushCall(theKeys, dontEnum);
                }
              }
            }
            return theKeys;
          },
        });
        var keysWorksWithArguments =
          $Object.keys &&
          (function () {
            return $Object.keys(arguments).length === 2;
          })(1, 2);
        var keysHasArgumentsLengthBug =
          $Object.keys &&
          (function () {
            var argKeys = $Object.keys(arguments);
            return (
              arguments.length !== 1 || argKeys.length !== 1 || argKeys[0] !== 1
            );
          })(1);
        var originalKeys = $Object.keys;
        defineProperties(
          $Object,
          {
            keys: function keys(object) {
              if (isArguments(object)) {
                return originalKeys(arraySlice(object));
              } else {
                return originalKeys(object);
              }
            },
          },
          !keysWorksWithArguments || keysHasArgumentsLengthBug,
        );
        var hasToFixedBugs =
          NumberPrototype.toFixed &&
          ((8e-5).toFixed(3) !== "0.000" ||
            (0.9).toFixed(0) !== "1" ||
            (1.255).toFixed(2) !== "1.25" ||
            (1.0000000000000001e18).toFixed(0) !== "1000000000000000128");
        var toFixedHelpers = {
          base: 10000000,
          data: [0, 0, 0, 0, 0, 0],
          divide: function divide(n) {
            var i = toFixedHelpers.size;
            var c = 0;
            while (--i >= 0) {
              c += toFixedHelpers.data[i];
              toFixedHelpers.data[i] = Math.floor(c / n);
              c = (c % n) * toFixedHelpers.base;
            }
          },
          log: function log(x) {
            var n = 0;
            var x2 = x;
            while (x2 >= 4096) {
              n += 12;
              x2 /= 4096;
            }
            while (x2 >= 2) {
              n += 1;
              x2 /= 2;
            }
            return n;
          },
          multiply: function multiply(n, c) {
            var i = -1;
            var c2 = c;
            while (++i < toFixedHelpers.size) {
              c2 += n * toFixedHelpers.data[i];
              toFixedHelpers.data[i] = c2 % toFixedHelpers.base;
              c2 = Math.floor(c2 / toFixedHelpers.base);
            }
          },
          numToString: function numToString() {
            var i = toFixedHelpers.size;
            var s = "";
            while (--i >= 0) {
              if (s !== "" || i === 0 || toFixedHelpers.data[i] !== 0) {
                var t = $String(toFixedHelpers.data[i]);
                if (s === "") {
                  s = t;
                } else {
                  s += strSlice("0000000", 0, 7 - t.length) + t;
                }
              }
            }
            return s;
          },
          pow: function pow(x, n, acc) {
            return n === 0
              ? acc
              : n % 2 === 1
                ? pow(x, n - 1, acc * x)
                : pow(x * x, n / 2, acc);
          },
          size: 6,
        };
        var toFixedShim = function toFixed(fractionDigits) {
          f = $Number(fractionDigits);
          f = isActualNaN(f) ? 0 : Math.floor(f);
          if (f < 0 || f > 20) {
            throw new RangeError(
              "Number.toFixed called with invalid number of decimals",
            );
          }
          x = $Number(this);
          if (isActualNaN(x)) {
            return "NaN";
          }
          if (x <= -1e21 || x >= 1e21) {
            return $String(x);
          }
          s = "";
          if (x < 0) {
            s = "-";
            x = -x;
          }
          m = "0";
          if (x > 1e-21) {
            e = toFixedHelpers.log(x * toFixedHelpers.pow(2, 69, 1)) - 69;
            z =
              e < 0
                ? x * toFixedHelpers.pow(2, -e, 1)
                : x / toFixedHelpers.pow(2, e, 1);
            z *= 4503599627370496;
            e = 52 - e;
            if (e > 0) {
              toFixedHelpers.multiply(0, z);
              j = f;
              while (j >= 7) {
                toFixedHelpers.multiply(10000000, 0);
                j -= 7;
              }
              toFixedHelpers.multiply(toFixedHelpers.pow(10, j, 1), 0);
              j = e - 1;
              while (j >= 23) {
                toFixedHelpers.divide(8388608);
                j -= 23;
              }
              toFixedHelpers.divide(1 << j);
              toFixedHelpers.multiply(1, 1);
              toFixedHelpers.divide(2);
              m = toFixedHelpers.numToString();
            } else {
              toFixedHelpers.multiply(0, z);
              toFixedHelpers.multiply(1 << -e, 0);
              m =
                toFixedHelpers.numToString() +
                strSlice("0.00000000000000000000", 2, 2 + f);
            }
          }
          if (f > 0) {
            k = m.length;
            if (k <= f) {
              m = s + strSlice("0.0000000000000000000", 0, f - k + 2) + m;
            } else {
              m = s + strSlice(m, 0, k - f) + "." + strSlice(m, k - f);
            }
          } else {
            m = s + m;
          }
          return m;
        };
        defineProperties(
          NumberPrototype,
          { toFixed: toFixedShim },
          hasToFixedBugs,
        );
        var hasToPrecisionUndefinedBug = (function () {
          try {
            return (1).toPrecision(undefined) === "1";
          } catch (e) {
            return true;
          }
        })();
        var originalToPrecision = NumberPrototype.toPrecision;
        defineProperties(
          NumberPrototype,
          {
            toPrecision: function toPrecision(precision) {
              return typeof precision === "undefined"
                ? originalToPrecision.call(this)
                : originalToPrecision.call(this, precision);
            },
          },
          hasToPrecisionUndefinedBug,
        );
        if (
          "ab".split(/(?:ab)*/).length !== 2 ||
          ".".split(/(.?)(.?)/).length !== 4 ||
          "tesst".split(/(s)*/)[1] === "t" ||
          "test".split(/(?:)/, -1).length !== 4 ||
          "".split(/.?/).length ||
          ".".split(/()()/).length > 1
        ) {
          (function () {
            var compliantExecNpcg = typeof /()??/.exec("")[1] === "undefined";
            var maxSafe32BitInt = Math.pow(2, 32) - 1;
            StringPrototype.split = function (separator, limit) {
              var string = String(this);
              if (typeof separator === "undefined" && limit === 0) {
                return [];
              }
              if (!isRegex(separator)) {
                return strSplit(this, separator, limit);
              }
              var output = [];
              var flags = separator.ignoreCase
                ? "i"
                : "" + separator.multiline
                  ? "m"
                  : "" + separator.unicode
                    ? "u"
                    : "" + separator.sticky
                      ? "y"
                      : "";
              var lastLastIndex = 0;
              var separatorCopy = new RegExp(separator.source, flags + "g");
              if (!compliantExecNpcg) {
                separator2 = new RegExp(
                  "^" + separatorCopy.source + "$(?!\\s)",
                  flags,
                );
              }
              var splitLimit =
                typeof limit === "undefined"
                  ? maxSafe32BitInt
                  : ES.ToUint32(limit);
              match = separatorCopy.exec(string);
              while (match) {
                lastIndex = match.index + match[0].length;
                if (lastIndex > lastLastIndex) {
                  pushCall(
                    output,
                    strSlice(string, lastLastIndex, match.index),
                  );
                  if (!compliantExecNpcg && match.length > 1) {
                    match[0].replace(separator2, function () {
                      for (var i = 1; i < arguments.length - 2; i += 1) {
                        if (typeof arguments[i] === "undefined") {
                          match[i] = void 0;
                        }
                      }
                    });
                  }
                  if (match.length > 1 && match.index < string.length) {
                    array_push.apply(output, arraySlice(match, 1));
                  }
                  lastLength = match[0].length;
                  lastLastIndex = lastIndex;
                  if (output.length >= splitLimit) {
                    break;
                  }
                }
                if (separatorCopy.lastIndex === match.index) {
                  separatorCopy.lastIndex++;
                }
                match = separatorCopy.exec(string);
              }
              if (lastLastIndex === string.length) {
                if (lastLength || !separatorCopy.test("")) {
                  pushCall(output, "");
                }
              } else {
                pushCall(output, strSlice(string, lastLastIndex));
              }
              return output.length > splitLimit
                ? arraySlice(output, 0, splitLimit)
                : output;
            };
          })();
        } else {
          if ("0".split(void 0, 0).length) {
            StringPrototype.split = function split(separator, limit) {
              if (typeof separator === "undefined" && limit === 0) {
                return [];
              }
              return strSplit(this, separator, limit);
            };
          }
        }
        var str_replace = StringPrototype.replace;
        var replaceReportsGroupsCorrectly = (function () {
          var groups = [];
          "x".replace(/x(.)?/g, function (match, group) {
            pushCall(groups, group);
          });
          return groups.length === 1 && typeof groups[0] === "undefined";
        })();
        if (!replaceReportsGroupsCorrectly) {
          StringPrototype.replace = function replace(
            searchValue,
            replaceValue,
          ) {
            var isFn = isCallable(replaceValue);
            var hasCapturingGroups =
              isRegex(searchValue) && /\)[*?]/.test(searchValue.source);
            if (!isFn || !hasCapturingGroups) {
              return str_replace.call(this, searchValue, replaceValue);
            } else {
              var wrappedReplaceValue = function (match) {
                var length = arguments.length;
                var originalLastIndex = searchValue.lastIndex;
                searchValue.lastIndex = 0;
                var args = searchValue.exec(match) || [];
                searchValue.lastIndex = originalLastIndex;
                pushCall(args, arguments[length - 2], arguments[length - 1]);
                return replaceValue.apply(this, args);
              };
              return str_replace.call(this, searchValue, wrappedReplaceValue);
            }
          };
        }
        var string_substr = StringPrototype.substr;
        var hasNegativeSubstrBug = "".substr && "0b".substr(-1) !== "b";
        defineProperties(
          StringPrototype,
          {
            substr: function substr(start, length) {
              var normalizedStart = start;
              if (start < 0) {
                normalizedStart = max(this.length + start, 0);
              }
              return string_substr.call(this, normalizedStart, length);
            },
          },
          hasNegativeSubstrBug,
        );
        var ws =
          "\t\n\v\f\r \xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029\ufeff";
        var zeroWidth = "\u200b";
        var wsRegexChars = "[" + ws + "]";
        var trimBeginRegexp = new RegExp(
          "^" + wsRegexChars + wsRegexChars + "*",
        );
        var trimEndRegexp = new RegExp(wsRegexChars + wsRegexChars + "*$");
        var hasTrimWhitespaceBug =
          StringPrototype.trim && (ws.trim() || !zeroWidth.trim());
        defineProperties(
          StringPrototype,
          {
            trim: function trim() {
              if (typeof this === "undefined" || this === null) {
                throw new TypeError("can\'t convert " + this + " to object");
              }
              return $String(this)
                .replace(trimBeginRegexp, "")
                .replace(trimEndRegexp, "");
            },
          },
          hasTrimWhitespaceBug,
        );
        var trim = call.bind(String.prototype.trim);
        var hasLastIndexBug =
          StringPrototype.lastIndexOf &&
          "abc\xe3\ufffd\u201a\xe3\ufffd\u201e".lastIndexOf(
            "\xe3\ufffd\u201a\xe3\ufffd\u201e",
            2,
          ) !== -1;
        defineProperties(
          StringPrototype,
          {
            lastIndexOf: function lastIndexOf(searchString) {
              if (typeof this === "undefined" || this === null) {
                throw new TypeError("can\'t convert " + this + " to object");
              }
              var S = $String(this);
              var searchStr = $String(searchString);
              var numPos = arguments.length > 1 ? $Number(arguments[1]) : NaN;
              var pos = isActualNaN(numPos) ? Infinity : ES.ToInteger(numPos);
              var start = min(max(pos, 0), S.length);
              var searchLen = searchStr.length;
              var k = start + searchLen;
              while (k > 0) {
                k = max(0, k - searchLen);
                var index = strIndexOf(
                  strSlice(S, k, start + searchLen),
                  searchStr,
                );
                if (index !== -1) {
                  return k + index;
                }
              }
              return -1;
            },
          },
          hasLastIndexBug,
        );
        var originalLastIndexOf = StringPrototype.lastIndexOf;
        defineProperties(
          StringPrototype,
          {
            lastIndexOf: function lastIndexOf(searchString) {
              return originalLastIndexOf.apply(this, arguments);
            },
          },
          StringPrototype.lastIndexOf.length !== 1,
        );
        if (parseInt(ws + "08") !== 8 || parseInt(ws + "0x16") !== 22) {
          parseInt = (function (origParseInt) {
            var hexRegex = /^[-+]?0[xX]/;
            return function parseInt(str, radix) {
              if (typeof str === "symbol") {
                "" + str;
              }
              var string = trim(String(str));
              var defaultedRadix =
                $Number(radix) || (hexRegex.test(string) ? 16 : 10);
              return origParseInt(string, defaultedRadix);
            };
          })(parseInt);
        }
        if (1 / parseFloat("-0") !== -Infinity) {
          parseFloat = (function (origParseFloat) {
            return function parseFloat(string) {
              var inputString = trim(String(string));
              var result = origParseFloat(inputString);
              return result === 0 && strSlice(inputString, 0, 1) === "-"
                ? -0
                : result;
            };
          })(parseFloat);
        }
        if (String(new RangeError("test")) !== "RangeError: test") {
          var errorToStringShim = function toString() {
            if (typeof this === "undefined" || this === null) {
              throw new TypeError("can\'t convert " + this + " to object");
            }
            var name = this.name;
            if (typeof name === "undefined") {
              name = "Error";
            } else {
              if (typeof name !== "string") {
                name = $String(name);
              }
            }
            var msg = this.message;
            if (typeof msg === "undefined") {
              msg = "";
            } else {
              if (typeof msg !== "string") {
                msg = $String(msg);
              }
            }
            if (!name) {
              return msg;
            }
            if (!msg) {
              return name;
            }
            return name + ": " + msg;
          };
          Error.prototype.toString = errorToStringShim;
        }
        if (supportsDescriptors) {
          var ensureNonEnumerable = function (obj, prop) {
            if (isEnum(obj, prop)) {
              var desc = Object.getOwnPropertyDescriptor(obj, prop);
              if (desc.configurable) {
                desc.enumerable = false;
                Object.defineProperty(obj, prop, desc);
              }
            }
          };
          ensureNonEnumerable(Error.prototype, "message");
          if (Error.prototype.message !== "") {
            Error.prototype.message = "";
          }
          ensureNonEnumerable(Error.prototype, "name");
        }
        if (String(/a/gim) !== "/a/gim") {
          var regexToString = function toString() {
            var str = "/" + this.source + "/";
            if (this.global) {
              str += "g";
            }
            if (this.ignoreCase) {
              str += "i";
            }
            if (this.multiline) {
              str += "m";
            }
            return str;
          };
          RegExp.prototype.toString = regexToString;
        }
      });
    },
    "./node_modules/neutrino-preset-cep/json.js": function (module, exports) {
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
          /[\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
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
            rx_dangerous.lastIndex = 0;
            if (rx_dangerous.test(text)) {
              text = text.replace(rx_dangerous, function (a) {
                return (
                  "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
                );
              });
            }
            if (
              rx_one.test(
                text
                  .replace(rx_two, "@")
                  .replace(rx_three, "]")
                  .replace(rx_four, ""),
              )
            ) {
              j = eval("(" + text + ")");
              return typeof reviver === "function" ? walk({ "": j }, "") : j;
            }
            throw new SyntaxError("JSON.parse");
          };
        }
      })();
    },
    "./node_modules/webpack/buildin/global.js": function (module, exports) {
      g = (function () {
        return this;
      })();
      try {
        g = g || Function("return this")() || eval("this");
      } catch (e) {
        if (typeof window === "object") {
          g = window;
        }
      }
      module.exports = g;
    },
    "multi C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\@sentry\\webpack-plugin\\src\\sentry-webpack.module.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\neutrino-preset-cep\\json.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\cep-shim\\es5-shim.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\node_modules\\cep-shim\\es5-sham.js C:\\Users\\sammarks\\Documents\\Code\\social-importer\\extendscript\\panel":
      function (module, exports, __webpack_require__) {
        __webpack_require__(
          "./node_modules/@sentry/webpack-plugin/src/sentry-webpack.module.js",
        );
        __webpack_require__("./node_modules/neutrino-preset-cep/json.js");
        __webpack_require__("./node_modules/cep-shim/es5-shim.js");
        __webpack_require__("./node_modules/cep-shim/es5-sham.js");
        module.exports = __webpack_require__("./extendscript/panel.js");
      },
  });
})();
