/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function Utils(aeCloner) {
  var utils = this;
  this.throwErr = function (err) {
    var title = $.fileName.substring(
      $.fileName.lastIndexOf("/") + 1,
      $.fileName.lastIndexOf("."),
    );
    aeCloner.closeProgressWindow();
    alert(err, title, true);
  };
  this.returnRandomHack = function (slider, seed) {
    slider.expression = "seedRandom(" + seed + ");random();";
    return slider.valueAtTime(0, false);
  };
  this.deselectAllLayers = function (comp) {
    var layers = comp.selectedLayers;
    for (var i = 0; i < layers.length; i += 1) {
      layers[i].selected = false;
    }
  };
  this.createClonerIcon = function (layer) {
    function createCircle(size, pos, subtract) {
      var circleGroup =
        containerGroup("Contents").addProperty("ADBE Vector Group");
      circleGroup.name = "Circle";
      var ellipse = circleGroup("Contents").addProperty(
        "ADBE Vector Shape - Ellipse",
      );
      var stroke = circleGroup("Contents").addProperty(
        "ADBE Vector Graphic - Stroke",
      );
      circleGroup("ADBE Vector Transform Group")(
        "ADBE Vector Position",
      ).expression = "[" + pos[0] + "," + pos[1] + "]";
      circleGroup("Contents")("ADBE Vector Shape - Ellipse")(
        "ADBE Vector Ellipse Size",
      ).setValue(size);
      stroke("ADBE Vector Stroke Color").setValue([
        0.2235294117647059, 0.27450980392156865, 0.396078431372549,
      ]);
      stroke("ADBE Vector Stroke Width").setValue(3);
    }
    var containerGroup = layer("Contents").addProperty("ADBE Vector Group");
    containerGroup.name = "Container";
    containerGroup("ADBE Vector Transform Group")(
      "ADBE Vector Position",
    ).expression = "[0,0]";
    createCircle([94, 94], [0, 0], false);
    createCircle([22, 22], [0, -26], true);
    createCircle([22, 22], [24.7, -8], true);
    createCircle([22, 22], [15.3, 21], true);
    createCircle([22, 22], [-15.3, 21], true);
    createCircle([22, 22], [-24.7, -8], true);
  };
  this.getPropertyType = function (prop) {
    switch (prop.propertyValueType) {
      case PropertyValueType.OneD:
        propType = "1d";
        break;
      case PropertyValueType.TwoD:
        propType = "2d";
        break;
      case PropertyValueType.TwoD_SPATIAL:
        propType = "2d";
        break;
      case PropertyValueType.ThreeD:
        propType = "3d";
        break;
      case PropertyValueType.ThreeD_SPATIAL:
        propType = "3d";
        break;
      case PropertyValueType.COLOR:
        propType = "color";
        break;
      default:
        propType = "non";
        break;
    }
    if (!prop.canVaryOverTime) {
      propType = "non";
    }
    return propType;
  };
  this.getPropertyPath = function (prop) {
    var layerRoot = false;
    var propPath = "";
    while (prop.parentProperty) {
      propPath = "(" + prop.propertyIndex + ")" + propPath;
      prop = prop.parentProperty;
    }
    return propPath;
  };
  this.checkPropertyExistence = function (effector, path) {
    var found = false;
    var len = effector.data.customProperties.length;
    for (var i = 0; i < len; i += 1) {
      if (path == effector.data.customProperties[i].path) {
        found = true;
        break;
      }
    }
    return found;
  };
  this.getAutoName = function (cloners) {
    var index = 1;
    while (!name) {
      var temp = "cloner" + index;
      index++;
      var found = false;
      for (var i = 0; i < cloners.length; i += 1) {
        if (temp == cloners[i].name) {
          found = true;
          break;
        }
      }
      if (!found) {
        name = temp;
      }
    }
    return name;
  };
  this.getAutoNameEffector = function (cloner, effectors) {
    var index = 1;
    while (!name) {
      var temp = cloner.name + " " + "effector" + index;
      index++;
      var found = false;
      for (var i = 0; i < effectors.length; i += 1) {
        if (temp == effectors[i].name) {
          found = true;
          break;
        }
      }
      if (!found) {
        name = temp;
      }
    }
    return name;
  };
  this.getAutoNameRandomLayer = function (cloners) {
    var index = 1;
    for (var i = 0; i < cloners.length; i += 1) {
      for (var k = 0; k < cloners[i].effectors.length; k += 1) {
        var effector = cloners[i].effectors[k];
        var rlIndex = Number(
          effector.randomLayer.name.substring(
            14,
            effector.randomLayer.name.length,
          ),
        );
        index = Math.max(index, rlIndex + 1);
      }
    }
    return "aec_randomdata" + index;
  };
  this.getAutoNameCustomProperty = function (effector, property) {
    var max = 0;
    var len = effector.data.customProperties.length;
    for (var i = 0; i < len; i += 1) {
      var s = effector.data.customProperties[i].name;
      s = s.split(":")[0];
      s = s.substr(4, s.length);
      var n = Number(s);
      max = Math.max(max, n);
    }
    var name = "Prop" + max + 1 + ":" + property.name;
    return name;
  };
  this.osCheck = function () {
    var op = $.os;
    var match = op.indexOf("Windows");
    if (match != -1) {
      var userOS = "PC";
    } else {
      var userOS = "MAC";
    }
    return userOS;
  };
  this.launchWebPage = function (url) {
    if (utils.osCheck() == "MAC") {
      var urlLaunchCode = "Open";
    } else {
      var urlLaunchCode = "Start";
    }
    system.callSystem(urlLaunchCode + " " + url);
  };
  this.createUIPanel = function (pal, x, y, width, height, label) {
    return pal.add("panel", [x, y, x + width, y + height], label);
  };
  this.createUIGroup = function (pal, x, y, width, height) {
    return pal.add("group", [x, y, x + width, y + height]);
  };
  this.createUIStaticText = function (pal, x, y, width, height, label) {
    return pal.add("staticText", [x, y, x + width, y + height], label);
  };
  this.createUIEditText = function (pal, x, y, width, height, label) {
    return pal.add("editText", [x, y, x + width, y + height], label);
  };
  this.createUIButton = function (pal, x, y, width, height, label) {
    return pal.add("button", [x, y, x + width, y + height], label);
  };
  this.createUIIconButton = function (pal, x, y, width, height, filename) {
    var file = File(filename);
    return pal.add("iconbutton", [x, y, x + width, y + height], file, {
      style: "toolbutton",
      toggle: false,
    });
  };
  this.createUIToggleButton = function (pal, x, y, width, height, label) {
    var button = pal.add(
      "iconbutton",
      [x, y, x + width, y + height],
      undefined,
      { style: "button", toggle: true },
    );
    button.text = label;
    return button;
  };
  this.createUIDropDown = function (pal, x, y, width, height, labels) {
    return pal.add("dropDownList", [x, y, x + width, y + height], labels);
  };
  this.createUIListBox = function (pal, x, y, width, height, labels) {
    return pal.add("listBox", [x, y, x + width, y + height], labels);
  };
  this.createUISlider = function (pal, x, y, width, height, value, min, max) {
    return pal.add("slider", [x, y, x + width, y + height], value, min, max);
  };
  this.createUICheckbox = function (pal, x, y, width, height, label) {
    return pal.add("checkbox", [x, y, x + width, y + height], label);
  };
  this.createUIImage = function (pal, filename) {
    var file = File(filename);
    return pal.add("image", undefined, file);
  };
  this.setPos = function (obj, x, y) {
    var bounds = obj.bounds;
    var x = x != null ? x : bounds[0];
    var y = y != null ? y : bounds[1];
    var width = bounds[2] - bounds[0];
    var height = bounds[3] - bounds[1];
    obj.bounds = [x, y, x + width, y + height];
  };
  this.setSize = function (obj, width, height) {
    var bounds = obj.bounds;
    var width = width != null ? width : bounds[2] - bounds[0];
    var height = height != null ? height : bounds[3] - bounds[1];
    var x = bounds[0];
    var y = bounds[1];
    obj.bounds = [x, y, x + width, y + height];
  };
}
function SplitText() {
  var v = "center";
  var h = "center";
  var rk = true;
  var av = true;
  var topLeftSelected = false;
  var topCenterSelected = false;
  var topRightSelected = false;
  var centerLeftSelected = false;
  var centerCenterSelected = true;
  var centerRightSelected = false;
  var tfLeftSelected = false;
  var tfCenterSelected = false;
  var tfRightSelected = false;
  var bottomLeftSelected = false;
  var bottomCenterSelected = false;
  var bottomRightSelected = false;
  this.scriptVersion = "1.0";
  this.scriptPath = File($.fileName).path;
  this.images = {
    figure:
      this.scriptPath + encodeURI("/clonerspluseffectors/splittext_figure.png"),
    mark:
      this.scriptPath + encodeURI("/clonerspluseffectors/splittext_mark.png"),
    mark_selected:
      this.scriptPath +
      encodeURI("/clonerspluseffectors/splittext_mark_selected.png"),
  };
  this.noCompErr = "Please select a composition";
  this.noLayersErr = "Please select one or more text layers";
  this.noTextLayer = "Please select one or more TEXT layers";
  this.init = function () {
    function markClick() {
      deselectAll();
      switch (this) {
        case topLeft:
          h = "left";
          v = "top";
          topLeftSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case topCenter:
          h = "center";
          v = "top";
          topCenterSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case topRight:
          h = "right";
          v = "top";
          topRightSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case centerLeft:
          h = "left";
          v = "center";
          centerLeftSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case centerCenter:
          h = "center";
          v = "center";
          centerCenterSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case centerRight:
          h = "right";
          v = "center";
          centerRightSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case tfLeft:
          h = "left";
          v = "tf";
          tfLeftSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case tfCenter:
          h = "center";
          v = "tf";
          tfCenterSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case tfRight:
          h = "right";
          v = "tf";
          tfRightSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case bottomLeft:
          h = "left";
          v = "bottom";
          bottomLeftSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case bottomCenter:
          h = "center";
          v = "bottom";
          bottomCenterSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
        case bottomRight:
          h = "right";
          v = "bottom";
          bottomRightSelected = true;
          var file = File(splitText.images.mark_selected);
          break;
      }
      this.image = file;
      this.active = false;
    }
    function respectKerningClick() {
      rk = !rk;
    }
    function alignVerticalClick() {
      av = !av;
    }
    function splitButtonClick() {
      var comp = app.project.activeItem;
      var l = comp.selectedLayers[0];
      splitText.splitT();
    }
    function deselectAll() {
      var file = File(splitText.images.mark);
      topLeft.image = file;
      topCenter.image = file;
      topRight.image = file;
      centerLeft.image = file;
      centerCenter.image = file;
      centerRight.image = file;
      tfLeft.image = file;
      tfCenter.image = file;
      tfRight.image = file;
      bottomLeft.image = file;
      bottomCenter.image = file;
      bottomRight.image = file;
      topLeftSelected = false;
      topCenterSelected = false;
      topRightSelected = false;
      centerLeftSelected = false;
      centerCenterSelected = false;
      centerRightSelected = false;
      tfLeftSelected = false;
      tfCenterSelected = false;
      tfRightSelected = false;
      bottomLeftSelected = false;
      bottomCenterSelected = false;
      bottomRightSelected = false;
    }
    pal =
      basePanel instanceof Panel
        ? basePanel
        : new Window("palette", "Split Textfield", undefined, {
            resizeable: false,
          });
    splitText = this;
    utils = new Utils();
    var panel = utils.createUIPanel(pal, 2, 2, 198, 180, "Anchor Point");
    var figure = utils.createUIIconButton(
      panel,
      52,
      11,
      86,
      106,
      this.images.figure,
    );
    figure.enabled = false;
    var topLeft = utils.createUIIconButton(
      panel,
      49,
      8,
      20,
      20,
      this.images.mark,
    );
    var topCenter = utils.createUIIconButton(
      panel,
      85,
      8,
      20,
      20,
      this.images.mark,
    );
    var topRight = utils.createUIIconButton(
      panel,
      121,
      8,
      20,
      20,
      this.images.mark,
    );
    var centerLeft = utils.createUIIconButton(
      panel,
      49,
      50,
      20,
      20,
      this.images.mark,
    );
    var centerCenter = utils.createUIIconButton(
      panel,
      85,
      50,
      20,
      20,
      this.images.mark_selected,
    );
    var centerRight = utils.createUIIconButton(
      panel,
      121,
      50,
      20,
      20,
      this.images.mark,
    );
    var tfLeft = utils.createUIIconButton(
      panel,
      49,
      83,
      20,
      20,
      this.images.mark,
    );
    var tfCenter = utils.createUIIconButton(
      panel,
      85,
      83,
      20,
      20,
      this.images.mark,
    );
    var tfRight = utils.createUIIconButton(
      panel,
      121,
      83,
      20,
      20,
      this.images.mark,
    );
    var bottomLeft = utils.createUIIconButton(
      panel,
      49,
      100,
      20,
      20,
      this.images.mark,
    );
    var bottomCenter = utils.createUIIconButton(
      panel,
      85,
      100,
      20,
      20,
      this.images.mark,
    );
    var bottomRight = utils.createUIIconButton(
      panel,
      121,
      100,
      20,
      20,
      this.images.mark,
    );
    var respectKerning = utils.createUIToggleButton(
      panel,
      2,
      124,
      104,
      20,
      "Respect Kerning",
    );
    var alignVertical = utils.createUIToggleButton(
      panel,
      110,
      124,
      82,
      20,
      "Align Vertical",
    );
    respectKerning.value = true;
    alignVertical.value = true;
    var splitButton = utils.createUIButton(panel, 2, 148, 190, 20, "Split it!");
    topLeft.onClick = markClick;
    topCenter.onClick = markClick;
    topRight.onClick = markClick;
    centerLeft.onClick = markClick;
    centerCenter.onClick = markClick;
    centerRight.onClick = markClick;
    tfLeft.onClick = markClick;
    tfCenter.onClick = markClick;
    tfRight.onClick = markClick;
    bottomLeft.onClick = markClick;
    bottomCenter.onClick = markClick;
    bottomRight.onClick = markClick;
    respectKerning.onClick = respectKerningClick;
    alignVertical.onClick = alignVerticalClick;
    splitButton.onClick = splitButtonClick;
  };
  this.splitT = function () {
    try {
      var comp = app.project.activeItem;
      if (!(app.project.activeItem instanceof CompItem)) {
        throw this.noCompErr;
      }
      var selectedLayers = comp.selectedLayers;
      if (selectedLayers.length < 1) {
        throw this.noLayersErr;
      }
      if (
        !(selectedLayers[0] instanceof TextLayer) &&
        selectedLayers.length == 1
      ) {
        throw this.noTextLayer;
      }
      app.beginUndoGroup("Split Text");
      var layers = [];
      for (var i = 0; i < selectedLayers.length; i += 1) {
        var tl = selectedLayers[i];
        if (tl instanceof TextLayer) {
          utils.deselectAllLayers(comp);
          tl.selected = true;
          app.executeCommand(3781);
          var sl = comp.selectedLayers[0];
          sl.moveBefore(tl);
          var numberOfShapes = sl.Contents.numProperties;
          for (var p = 0; p < numberOfShapes; p += 1) {
            var shape = sl.duplicate();
            for (var d = 0; d < numberOfShapes; d += 1) {
              if (p != d) {
                shape.Contents(d < p ? 1 : 2).remove();
              }
            }
            shape.name = tl.name + " " + sl.Contents(p + 1).name;
            layers.push(shape);
          }
          sl.remove();
        }
      }
      this.setAnchorPoints(layers, v, h, rk, av);
      app.endUndoGroup();
    } catch (err) {
      utils.throwErr(err);
    }
  };
  this.setAnchorPoints = function (layers, v, h, rk, av) {
    var comp = app.project.activeItem;
    var results = [];
    var smallestHeight = 10000000000;
    var avTop = 0;
    var avBottom = 0;
    for (var i = 0; i < layers.length; i += 1) {
      var l = layers[i];
      var rect = l.sourceRectAtTime(comp.time, true);
      results[i] = {};
      switch (h) {
        case "left":
          results[i].x = rect.left;
          break;
        case "center":
          results[i].x = rect.left + rect.width / 2;
          break;
        case "right":
          results[i].x = rect.left + rect.width;
          break;
      }
      switch (v) {
        case "top":
          results[i].y = rect.top;
          break;
        case "center":
          results[i].y = rect.top + rect.height / 2;
          break;
        case "tf":
          results[i].y = 0;
          break;
        case "bottom":
          results[i].y = rect.top + rect.height;
          break;
      }
      if (rect.height < smallestHeight) {
        smallestHeight = rect.height;
        avCenter = results[i].y;
      }
      if (results[i].y < avTop) {
        avTop = results[i].y;
      }
      if (results[i].y > avBottom) {
        avBottom = results[i].y;
      }
    }
    for (var i = 0; i < layers.length; i += 1) {
      var l = layers[i];
      var x = results[i].x;
      var y = results[i].y;
      if (av) {
        switch (v) {
          case "top":
            y = avTop;
            break;
          case "center":
            y = avCenter;
            break;
          case "bottom":
            y = avBottom;
            break;
        }
      }
      var originalAnchor = [
        (l("ADBE Transform Group")("ADBE Anchor Point").value[0] *
          l("ADBE Transform Group")("ADBE Scale").value[0]) /
          100,
        (l("ADBE Transform Group")("ADBE Anchor Point").value[1] *
          l("ADBE Transform Group")("ADBE Scale").value[1]) /
          100,
      ];
      l("ADBE Transform Group")("ADBE Anchor Point").setValue([x, y]);
      x *= l("ADBE Transform Group")("ADBE Scale").value[0] / 100;
      y *= l("ADBE Transform Group")("ADBE Scale").value[1] / 100;
      if (l("ADBE Transform Group")("ADBE Position").dimensionsSeparated) {
        x +=
          l("ADBE Transform Group")("ADBE Position_0").value -
          originalAnchor[0];
        y +=
          l("ADBE Transform Group")("ADBE Position_1").value -
          originalAnchor[1];
        l("ADBE Transform Group")("ADBE Position_0").setValue(x);
        l("ADBE Transform Group")("ADBE Position_1").setValue(y);
      } else {
        x +=
          l("ADBE Transform Group")("ADBE Position").value[0] -
          originalAnchor[0];
        y +=
          l("ADBE Transform Group")("ADBE Position").value[1] -
          originalAnchor[1];
        l("ADBE Transform Group")("ADBE Position").setValue([x, y]);
      }
      results[i].x = x;
      results[i].y = y;
    }
    var totalDist = results[results.length - 1].x - results[0].x;
    var medDist = totalDist / (results.length - 1);
    var nextMedX = results[0].x;
    if (rk) {
      for (var i = 0; i < layers.length; i += 1) {
        var l = layers[i];
        var kerningSlider = l("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        kerningSlider.name = "kerning";
        kerningSlider(1).setValue(
          ((results[i].x - nextMedX) / totalDist) * 100,
        );
        nextMedX += medDist;
      }
    }
  };
  this.run = function (thisObj) {
    basePanel = thisObj;
    this.init();
  };
}
new SplitText().run(this);
