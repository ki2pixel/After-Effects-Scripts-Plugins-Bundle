var COCO_SELECTED_COLOR = "";
var COCO_SELECTED_COLOR_ID = null;
function coco_addColorsToLayer(layer, colors) {
  for (var i = 0; i < colors.length; i++) {
    var cc = layer.property("ADBE Effect Parade").addProperty("ADBE Color Control");
    cc.name = "Color #" + i;
    cc.property(1).setValue(coco_hexToAE(colors[i]))
  }
}

function coco_hexToAE(hex) {
  hex = hex.replace("#", "")
  var bigint = parseInt(hex, 16);
  var r = (bigint >> 16) & 255;
  var g = (bigint >> 8) & 255;
  var b = bigint & 255;

  return [r / 255, g / 255, b / 255]
}
function coco_addGradientToLayer(layer, colors, name) {
  var prop = layer.property("ADBE Effect Parade").addProperty("ADBE Ramp");
  prop.name = name;
  var firstColorProp = prop.property("ADBE Ramp-0002");
  var secondColorProp = prop.property("ADBE Ramp-0004");
  var firstPos = prop.property("ADBE Ramp-0001");
  var secondPos = prop.property("ADBE Ramp-0003");
  firstColorProp.setValue(coco_hexToAE(colors[0]));
  secondColorProp.setValue(coco_hexToAE(colors[1]));
  var layerPos = layer.sourceRectAtTime(0, true);
  var layerPosInComp = layer.sourcePointToComp([layerPos.left, layerPos.top]);
  firstPos.setValue([layerPosInComp[0], layerPosInComp[1]]);
  secondPos.setValue([layerPosInComp[0] + layerPos.width, layerPosInComp[1]]);
}
function coco_addFillToLayer(layer, color) {
  var prop = null;
  if (layer.effect("CoCo Fill")) {
    prop = layer.effect("CoCo Fill");
  } else {
    prop = layer.property("ADBE Effect Parade").addProperty("ADBE Fill");
    prop.name = "CoCo Fill";
  }
  prop.property("ADBE Fill-0002").setValue(coco_hexToAE(color));
  return true;
}
function coco_layerParentOfProperty(property) {
  try {
    return property.propertyGroup(property.propertyDepth);
  } catch (e) {
    return property;
  }
}
function coco_addFillOnlyToShape(layer, color) {
  // alert(layer.property("ADBE Root Vectors Group").numProperties);
  var applied = 0;
  if (layer.selectedProperties.length) {
    for (var i = 0; i < layer.selectedProperties.length; i++) {
      try {
        layer.selectedProperties[i].property("ADBE Vectors Group").property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(coco_hexToAE(color));
        applied++;
      } catch (err) {

      }

    }
  }

  if (applied == 0) {
    var prop = layer.property("ADBE Root Vectors Group");
    for (var j = 0; j < prop.numProperties; j++) {
      try {
        prop.property(j + 1).property("ADBE Vectors Group").property("ADBE Vector Graphic - Fill").property("ADBE Vector Fill Color").setValue(coco_hexToAE(color));
        applied++;
      } catch (err) {

      }
    }
  }

  return applied;
}
function coco_addStrokeOnlyToShape(layer, color) {
  // alert(layer.property("ADBE Root Vectors Group").numProperties);
  var applied = 0;
  if (layer.selectedProperties.length) {
    for (var i = 0; i < layer.selectedProperties.length; i++) {
      try {
        layer.selectedProperties[i].property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Color").setValue(coco_hexToAE(color));
        applied++;
      } catch (err) {

      }

    }
  }

  if (applied == 0) {
    var prop = layer.property("ADBE Root Vectors Group");
    for (var j = 0; j < prop.numProperties; j++) {
      try {
        prop.property(j + 1).property("ADBE Vectors Group").property("ADBE Vector Graphic - Stroke").property("ADBE Vector Stroke Color").setValue(coco_hexToAE(color));
        applied++;
      } catch (err) {

      }
    }
  }

  return applied;
}
function coco_addStrokeAndFillToShape(layer, color) {
  var c = coco_addFillOnlyToShape(layer, color);
  var cc = coco_addStrokeOnlyToShape(layer, color);
  if (cc + c == 0) coco_addFillToLayer(layer, color);
  return cc + c;
}
function coco_addSimulation(comp, name, shifts) {
  var mySolid = comp.layers.addSolid([0, 0, 0], "CoCo " + name, comp.width, comp.height, 1);
  mySolid.startTime = 0;
  mySolid.adjustmentLayer = true;
  var effect = mySolid.property("ADBE Effect Parade").addProperty("ADBE CHANNEL MIXER");
  var index = 1;
  effect.name = "COCO " + name;
  for (var i = 0; i < shifts.length; i++) {
    effect.property((index > 9 ? "ADBE CHANNEL MIXER-00" : "ADBE CHANNEL MIXER-000") + index.toString()).setValue(shifts[i][0]);
    index = index + 1;
    effect.property((index > 9 ? "ADBE CHANNEL MIXER-00" : "ADBE CHANNEL MIXER-000") + index.toString()).setValue(shifts[i][1]);
    index = index + 1;
    effect.property((index > 9 ? "ADBE CHANNEL MIXER-00" : "ADBE CHANNEL MIXER-000") + index.toString()).setValue(shifts[i][2]);
    index = index + 2;

  }


}

var Coco_Object = {
  addPalette: function (data) {
    var paletteName = data.name;
    var colors = data.colors;
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem) {
      var settingLayer = activeComp.layers.addNull();
      settingLayer.name = paletteName;
      settingLayer.source.name = paletteName;
      coco_addColorsToLayer(settingLayer, colors);
      return activeComp.name;
    } else {
      alert("No Active Comp", "select a Comp and try again");
    }
  },
  addGradient: function (data) {
    var gradientName = data.name;
    var colors = data.colors;
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem && activeComp.selectedLayers.length) {
      var layer = activeComp.selectedLayers[0];
      coco_addGradientToLayer(layer, colors, gradientName);
      return layer.name;
    } else {
      alert("No Active Layer", "select a layer and try again");
    }
  },
  checkAndApplyFillOnSelectedLayer: function (data) {
    var color = data.color;
    var shiftPressed = data.shiftPressed;
    var ctrlPressed = data.ctrlPressed;
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem && activeComp.selectedLayers.length) {
      for (var i = 0; i < activeComp.selectedLayers.length; i++) {
        var layer = activeComp.selectedLayers[i];
        if (layer instanceof ShapeLayer) {
          var c = 0;
          if ((shiftPressed && ctrlPressed) || (!shiftPressed && !ctrlPressed)) {
            coco_addStrokeAndFillToShape(layer, color);
          } else if (shiftPressed) {
            coco_addFillOnlyToShape(layer, color);
          } else if (ctrlPressed) {
            coco_addStrokeOnlyToShape(layer, color);
          }
        } else {
          coco_addFillToLayer(layer, color);
        }
      }
      return activeComp.selectedLayers.length;
    } else {
      return null;
    }
  },
  addColorBlind: function (data) {
    var name = data.name;
    var shifts = data.shifts;
    var activeComp = app.project.activeItem;
    if (activeComp && activeComp instanceof CompItem) {
      coco_addSimulation(activeComp, name, shifts);
      return activeComp.name;
    } else {
      alert("No Active Comp", "select a Comp and try again");
    }
  },
  setColor: function (color) {
    COCO_SELECTED_COLOR = color;
  },
  getColor: function () {
    return COCO_SELECTED_COLOR;
  },
  setColorId: function (color) {
    COCO_SELECTED_COLOR_ID = color;
  },
  getColorId: function () {
    return COCO_SELECTED_COLOR_ID;
  }


}