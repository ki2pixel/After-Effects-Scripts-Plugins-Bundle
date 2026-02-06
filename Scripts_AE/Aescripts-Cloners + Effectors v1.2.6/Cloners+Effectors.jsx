/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function AeClonerMainFunction(thisObj) {
  function AeCloner() {
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
          case PropertyValueType.SHAPE:
            propType = "path";
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
      this.createUISlider = function (
        pal,
        x,
        y,
        width,
        height,
        value,
        min,
        max,
      ) {
        return pal.add(
          "slider",
          [x, y, x + width, y + height],
          value,
          min,
          max,
        );
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
    function Expressions(aeCloner) {
      var expressions = this;
      this.random = function (controller, type) {
        return (
          'seedRandom(thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("' +
          type +
          ' Cloner")("Random Seed"), true);\n\t\t\trandom();'
        );
      };
      this.addOne = function () {
        return "var addX = 1;\n\t\t\tvar addY = 1;\n\t\t\tvar addZ = 1;";
      };
      this.addZero3d = function () {
        return "var addX = 0;\n\t\t\tvar addY = 0;\n\t\t\tvar addZ = 0;";
      };
      this.addZero2d = function () {
        return "var addX = 0;\n\t\t\tvar addY = 0;";
      };
      this.addZero1d = function () {
        return "var add = 0;";
      };
      this.addZeroColor = function () {
        return "var original = value;";
      };
      this.addZeroTime = function () {
        return "var start = 0;\n\t\t\tvar end = 0;";
      };
      this.linearPosition = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\tvar count = " +
          data.count +
          ';\n\t\t\tvar xDist = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Linear Cloner")("Position X");\n\t\t\tvar yDist = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Linear Cloner")("Position Y");\n\t\t\tvar zDist = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Linear Cloner")("Position Z");\n\t\t\tvar originalX = (-(count-1)*xDist/2)+layerIndex*xDist;\n\t\t\tvar originalY = (-(count-1)*yDist/2)+layerIndex*yDist;\n\t\t\tvar originalZ = (-(count-1)*zDist/2)+layerIndex*zDist;\n\t\t\ttry\n\t\t\t{\n\t\t\t\tvar totalWidth = (count-1)*xDist;\n\t\t\t\toriginalX += totalWidth*thisLayer("ADBE Effect Parade")("kerning")(1).value/100;\n\t\t\t}catch(err){}'
        );
      };
      this.radialPosition = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\tvar count = " +
          data.count +
          ';\n\t\t\tvar radius = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Radius");\n\t\t\tvar startAngle = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Start Angle");\n\t\t\tvar endAngle = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("End Angle");\n\t\t\tvar offset = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Offset");\n\t\t\tvar offsetVariation = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Offset Variation");\n\t\t\tvar center = [0, 0];\n\t\t\tvar rnd = thisLayer("ADBE Effect Parade")("random")(1);\n\t\t\tvar degree = (endAngle-startAngle)/count;\n\t\t\tseedRandom(3,true);\n\t\t\tvar d = degree*layerIndex+startAngle+offset+offsetVariation*(rnd*2-1)-90;\n\t\t\ttry\n\t\t\t{\n\t\t\t\tvar totalDegree = (endAngle-startAngle);\n\t\t\t\td += totalDegree*thisLayer("ADBE Effect Parade")("kerning")(1).value/100;\n\t\t\t}catch(err){}\n\t\t\tvar r = d*Math.PI/180;\n\t\t\tvar xVal = radius*Math.cos(r);\n\t\t\tvar yVal = radius*Math.sin(r);\n\t\t\tvar originalX = xVal+center[0];\n\t\t\tvar originalY = yVal+center[1];\n\t\t\tvar originalZ = 0;'
        );
      };
      this.pathPosition = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\tvar count = " +
          data.count +
          ';\n\t\t\tvar start= thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Start");\n\t\t\tvar end = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("End");\n\t\t\tvar offset = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset");\n\t\t\tvar offsetVariation = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset Variation");\n\t\t\tvar loop = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Loop").value;\n\t\t\tvar positionOnPath = 0;\n\t\t\ttry\n\t\t\t{\n\t\t\t\tvar path = thisComp.layer("' +
          controller +
          '")("ADBE Root Vectors Group")("pathGroup")("ADBE Vectors Group")(1)("Path");\n\t\t\t\tvar rnd = thisLayer("ADBE Effect Parade")("random")(1);\n\t\t\t\tpositionOnPath = layerIndex/(loop?count:count-1);\n\t\t\t\tpositionOnPath = linear(positionOnPath, start/100, end/100)+offset/100+offsetVariation*(rnd*2-1)/100;\n\t\t\t\tif(loop&&positionOnPath>0) positionOnPath = positionOnPath % 1;\n\t\t\t\tif(loop&&positionOnPath<0) positionOnPath = 1+positionOnPath % 1;\n\t\t\t\tvar clonePosition = path.pointOnPath(positionOnPath);\n\t\t\t\tvar originalX = clonePosition[0];\n\t\t\t\tvar originalY = clonePosition[1];\n\t\t\t\tvar originalZ = 0;\n\t\t\t}\n\t\t\tcatch (err)\n\t\t\t{\n\t\t\t\tvar originalX = 0;\n\t\t\t\tvar originalY = 0;\n\t\t\t\tvar originalZ = 0;\n\t\t\t}'
        );
      };
      this.pathPointsPosition = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\tvar count = " +
          data.count +
          ';\n\t\t\ttry\n\t\t\t{\n\t\t\t\tvar path = thisComp.layer("' +
          controller +
          '")("ADBE Root Vectors Group")("pathGroup")("ADBE Vectors Group")(1)("Path");\n\t\t\t\tvar pointPosition = path.points()[Math.min(layerIndex, path.points().length-1)];\n\t\t\t\tvar originalX = pointPosition[0];\n\t\t\t\tvar originalY = pointPosition[1];\n\t\t\t\tvar originalZ = 0;\n\t\t\t}\n\t\t\tcatch (err)\n\t\t\t{\n\t\t\t\tvar originalX = 0;\n\t\t\t\tvar originalY = 0;\n\t\t\t\tvar originalZ = 0;\n\t\t\t}'
        );
      };
      this.gridPosition = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\tvar count = " +
          data.countX * data.countY * data.countZ +
          ';\n\t\t\tvar xSize = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Grid Cloner")("Size X");\n\t\t\tvar ySize = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Grid Cloner")("Size Y");\n\t\t\tvar zSize = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Grid Cloner")("Size Z");\n\t\t\tvar xRelPos = ' +
          (index - Math.floor(index / data.countX) * data.countX) +
          ";\n\t\t\tvar yRelPos = " +
          (Math.floor(index / data.countX) -
            Math.floor(Math.floor(index / data.countX) / data.countY) *
              data.countY) +
          ";\n\t\t\tvar zRelPos = " +
          Math.floor(index / (data.countX * data.countY)) +
          ";\n\t\t\tvar originalX = (-(" +
          data.countX +
          "-1)*xSize/2)+xRelPos*xSize;\n\t\t\tvar originalY = (-(" +
          data.countY +
          "-1)*ySize/2)+yRelPos*ySize;\n\t\t\tvar originalZ = (-(" +
          data.countZ +
          "-1)*zSize/2)+zRelPos*zSize;"
        );
      };
      this.clusterPosition = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\tvar count = " +
          data.numSourceLayers +
          ';\n\t\t\tvar sourcePosition = thisLayer("ADBE Effect Parade")("sourcePosition")(1).value;\n\t\t\tvar originalX = sourcePosition[0];\n\t\t\tvar originalY = sourcePosition[1];\n\t\t\tvar originalZ = sourcePosition[2];'
        );
      };
      this.positionEffectorPlain = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Position = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX += efx' +
          index +
          "Position[0]*power;\n\t\t\taddY += efx" +
          index +
          "Position[1]*power;\n\t\t\taddZ += efx" +
          index +
          "Position[2]*power;"
        );
      };
      this.positionEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Position = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Position[0]*power*randomValues[0];\n\t\t\taddY += efx" +
          index +
          "Position[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Position[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.positionEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Position = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Position[0]*power*randomValues[0];\n\t\t\taddY += efx" +
          index +
          "Position[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Position[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.positionEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Position = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+originalX+addX)/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+originalY+addY)/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\taddX += efx' +
          index +
          "Position[0]*power*pulseValue;\n\t\t\taddY += efx" +
          index +
          "Position[1]*power*pulseValue;\n\t\t\taddZ += efx" +
          index +
          "Position[2]*power*pulseValue;"
        );
      };
      this.positionEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Position = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Position Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1).value;\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+originalX+offsetX+addX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+originalY+offsetY+addY;\n\t\t\tvar noisePosZ = originalZ+offsetZ+addZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\taddX += efx' +
          index +
          "Position[0]*power*noiseValues[0];\n\t\t\taddY += efx" +
          index +
          "Position[1]*power*noiseValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Position[2]*power*noiseValues[syncValues?0:2];"
        );
      };
      this.positionEffectorPath = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX *= 1-power;\n\t\t\taddY *= 1-power;\n\t\t\taddZ *= 1-power;'
        );
      };
      this.positionEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX *= 1-power;\n\t\t\taddY *= 1-power;\n\t\t\taddZ *= 1-power;'
        );
      };
      this.position = function () {
        return "x = originalX+addX;\n\t\t\ty = originalY+addY;\n\t\t\tz = originalZ+addZ;\n\t\t\t[x,y,z];";
      };
      this.scaleEffectorPlain = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Scale = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale X")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Y")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Z")/100];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar multiX = efx' +
          index +
          "Scale[0]*power;\n\t\t\tvar multiY = efx" +
          index +
          "Scale[1]*power;\n\t\t\tvar multiZ = efx" +
          index +
          "Scale[2]*power;\n\t\t\taddX+=multiX*addX;\n\t\t\taddY+=multiY*addY;\n\t\t\taddZ+=multiZ*addZ;"
        );
      };
      this.scaleEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar efx' +
          index +
          'Scale = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale X")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Y")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Z")/100];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_scale")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tmultiX = efx' +
          index +
          "Scale[0]*power*randomValues[0];\n\t\t\tmultiY = efx" +
          index +
          "Scale[1]*power*randomValues[syncValues?0:1];\n\t\t\tmultiZ = efx" +
          index +
          "Scale[2]*power*randomValues[syncValues?0:2];\n\t\t\taddX+=multiX*addX;\n\t\t\taddY+=(uniform?multiX:multiY)*addY;\n\t\t\taddZ+=(uniform?multiX:multiZ)*addZ;"
        );
      };
      this.scaleEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar efx' +
          index +
          'Scale = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale X")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Y")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Z")/100];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_scale")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tmultiX = efx' +
          index +
          "Scale[0]*power*randomValues[0];\n\t\t\tmultiY = efx" +
          index +
          "Scale[1]*power*randomValues[syncValues?0:1];\n\t\t\tmultiZ = efx" +
          index +
          "Scale[2]*power*randomValues[syncValues?0:2];\n\t\t\taddX+=multiX*addX;\n\t\t\taddY+=(uniform?multiX:multiY)*addY;\n\t\t\taddZ+=(uniform?multiX:multiZ)*addZ;"
        );
      };
      this.scaleEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Scale = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale X")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Y")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Z")/100];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\tvar multiX = efx' +
          index +
          "Scale[0]*power*pulseValue;\n\t\t\tvar multiY = efx" +
          index +
          "Scale[1]*power*pulseValue;\n\t\t\tvar multiZ = efx" +
          index +
          "Scale[2]*power*pulseValue;\n\t\t\taddX+=multiX*addX;\n\t\t\taddY+=multiY*addY;\n\t\t\taddZ+=multiZ*addZ;"
        );
      };
      this.scaleEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Scale = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale X")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Y")/100, thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale Z")/100];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_scale")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\tvar multiX = efx' +
          index +
          "Scale[0]*power*noiseValues[0];\n\t\t\tvar multiY = efx" +
          index +
          "Scale[uniform?0:1]*power*noiseValues[syncValues||uniform?0:1];\n\t\t\tvar multiZ = efx" +
          index +
          "Scale[uniform?0:2]*power*noiseValues[syncValues||uniform?0:2];\n\t\t\taddX+=multiX*addX;\n\t\t\taddY+=multiY*addY;\n\t\t\taddZ+=multiZ*addZ;"
        );
      };
      this.scaleEffectorPath = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX -= (power*(addX-1));\n\t\t\taddY -= (power*(addY-1));\n\t\t\taddZ -= (power*(addZ-1));'
        );
      };
      this.scaleEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX -= (power*(addX-1));\n\t\t\taddY -= (power*(addY-1));\n\t\t\taddZ -= (power*(addZ-1));'
        );
      };
      this.scale = function () {
        return "scaleX = value[0]+addX*100-100;\n\t\t\tscaleY = value[1]+addY*100-100;\n\t\t\tscaleZ = (value.length==3?value[2]:0)+addZ*100-100;\n\t\t\t[scaleX, scaleY, scaleZ];";
      };
      this.radialRotation = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\t\tvar numItems = " +
          data.count +
          ';\n\t\t\t\tvar radius = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Radius");\n\t\t\t\tvar startAngle = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Start Angle");\n\t\t\t\tvar endAngle = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("End Angle");\n\t\t\t\tvar offset = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Offset");\n\t\t\t\tvar offsetVariation = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Offset Variation");\n\t\t\t\tvar align = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Align Rotation").value;\n\t\t\t\tvar rnd = thisLayer("ADBE Effect Parade")("random")(1);\n\t\t\t\tvar degree = (endAngle-startAngle)/numItems;\n\t\t\t\tvar d = align?degree*layerIndex+startAngle+offset+offsetVariation*(rnd*2-1)-90:0;\n\t\t\t\ttry\n\t\t\t\t{\n\t\t\t\t\tvar totalDegree = (endAngle-startAngle);\n\t\t\t\t\td += totalDegree*thisLayer("ADBE Effect Parade")("kerning")(1).value/100;\n\t\t\t\t}catch(err){}\n\t\t\t\td = value+d+add;'
        );
      };
      this.pathRotation = function (controller, data, index) {
        return (
          'var align = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Align Rotation").value;\n\t\t\t\tvar d = 0;\n\t\t\t\tif(align)\n\t\t\t\t{\n\t\t\t\t\ttry\n\t\t\t\t\t{\n\t\t\t\t\t\tvar layerIndex = ' +
          index +
          ";\n\t\t\t\t\t\tvar count = " +
          data.count +
          ';\n\t\t\t\t\t\tvar start= thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Start");\n\t\t\t\t\t\tvar end = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("End");\n\t\t\t\t\t\tvar offset = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset");\n\t\t\t\t\t\tvar offsetVariation = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset Variation");\n\t\t\t\t\t\tvar loop = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Loop").value;\n\t\t\t\t\t\tvar path = thisComp.layer("' +
          controller +
          '")("ADBE Root Vectors Group")("pathGroup")("ADBE Vectors Group")(1)("Path");\n\t\t\t\t\t\tvar rnd = thisLayer("ADBE Effect Parade")("random")(1);\n\t\t\t\t\t\tvar positionOnPath = layerIndex/(loop?count:count-1);\n\t\t\t\t\t\tpositionOnPath = linear(positionOnPath, start/100, end/100)+offset/100+offsetVariation*(rnd*2-1)/100;\n\t\t\t\t\t\tif(loop&&positionOnPath>0) positionOnPath = positionOnPath % 1;\n\t\t\t\t\t\tif(loop&&positionOnPath<0) positionOnPath = 1+positionOnPath % 1;\n\t\t\t\t\t\tvar pathTan = path.tangentOnPath(positionOnPath);\n\t\t\t\t\t\td = radiansToDegrees(Math.atan2(pathTan[1],pathTan[0]))-180;\n\t\t\t\t\t}catch(err){}\n\t\t\t\t}\n\t\t\t\td = value+d+add;'
        );
      };
      this.pathPointsRotation = function (controller, data, index) {
        return (
          'var align = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Points Cloner")("Align Rotation").value;\n\t\t\t\tvar d = 0;\n\t\t\t\tif(align)\n\t\t\t\t{\n\t\t\t\t\ttry\n\t\t\t\t\t{\n\t\t\t\t\t\tvar layerIndex = ' +
          index +
          ";\n\t\t\t\t\t\tvar count = " +
          data.count +
          ';\n\t\t\t\t\t\tvar path = thisComp.layer("' +
          controller +
          '")("ADBE Root Vectors Group")("pathGroup")("ADBE Vectors Group")(1)("Path");\n\t\t\t\t\t\tvar i = Math.min(layerIndex, path.points().length-1);\n\t\t\t\t\t\tvar pointPosition = path.points()[i];\n\t\t\t\t\t\tvar prevPointIndex = path.isClosed() ? (layerIndex==0 ? path.points().length-1 : layerIndex-1) : Math.max(layerIndex-1, 0);\n\t\t\t\t\t\tvar nextPointIndex = path.isClosed() ? (layerIndex==path.points().length-1 ? 0 : layerIndex+1) : Math.min(layerIndex+1, path.points().length-1);\n\t\t\t\t\t\tvar prevPointPosition = path.points()[prevPointIndex];\n\t\t\t\t\t\tvar nextPointPosition = path.points()[nextPointIndex];\n\t\t\t\t\t\tvar inT = path.inTangents()[i];\n\t\t\t\t\t\tvar outT = path.outTangents()[i];\n\t\t\t\t\t\tvar fromPt = inT[0]==0&&inT[1]==0 ? prevPointPosition : inT;\n\t\t\t\t\t\tvar toPt = outT[0]==0&&outT[1]==0 ? nextPointPosition : outT;\n\t\t\t\t\t\tvar lkAt = lookAt(fromPt, toPt);\n\t\t\t\t\t\tif (toPt[1] > fromPt[1]){\n\t\t\t\t\t\t\td =  180-lkAt[1]+90;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\td = lkAt[1]+90;\n\t\t\t    \t\t}\n\t\t\t    \t}catch(err){}\n\t\t\t\t}\n\t\t\t\td = value+d+add;'
        );
      };
      this.rotationEffectorPlain = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Z");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd += efx' +
          index +
          "Rotation*power;"
        );
      };
      this.rotationEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Z");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_rotation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tadd += efx' +
          index +
          "Rotation*power*randomValues[syncValues?0:2];"
        );
      };
      this.rotationEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Z");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_rotation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tadd += efx' +
          index +
          "Rotation*power*randomValues[syncValues?0:2];"
        );
      };
      this.rotationEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Z");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\tadd += efx' +
          index +
          "Rotation*power*pulseValue;"
        );
      };
      this.rotationEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Z");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_rotation")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\tadd += efx' +
          index +
          "Rotation*power*noiseValues[syncValues?0:2];"
        );
      };
      this.rotationEffectorPath = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.rotationEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.rotationXEffectorPlain = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd += efx' +
          index +
          "Rotation*power;"
        );
      };
      this.rotationXEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_rotation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tadd += efx' +
          index +
          "Rotation*power*randomValues[0];"
        );
      };
      this.rotationXEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_rotation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tadd += efx' +
          index +
          "Rotation*power*randomValues[0];"
        );
      };
      this.rotationXEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\tadd += efx' +
          index +
          "Rotation*power*pulseValue;"
        );
      };
      this.rotationXEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_rotation")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\tadd += efx' +
          index +
          "Rotation*power*noiseValues[0];"
        );
      };
      this.rotationXEffectorPath = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.rotationXEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.rotationYEffectorPlain = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Y");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd += efx' +
          index +
          "Rotation*power;"
        );
      };
      this.rotationYEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Y");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_rotation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tadd += efx' +
          index +
          "Rotation*power*randomValues[syncValues?0:1];"
        );
      };
      this.rotationYEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Y");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_rotation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\tadd += efx' +
          index +
          "Rotation*power*randomValues[syncValues?0:1];"
        );
      };
      this.rotationYEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Y");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\tadd += efx' +
          index +
          "Rotation*power*pulseValue;"
        );
      };
      this.rotationYEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Rotation = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Rotation Y");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_rotation")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\tadd += efx' +
          index +
          "Rotation*power*noiseValues[syncValues?0:1];"
        );
      };
      this.rotationYEffectorPath = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.rotationYEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.rotation = function () {
        return "rotation = value+add;";
      };
      this.rotationX = function () {
        return "rotation = value+add;";
      };
      this.rotationY = function () {
        return "rotation = value+add;";
      };
      this.radialOrientation = function (controller, data, index) {
        return (
          "var layerIndex = " +
          index +
          ";\n\t\t\t\tvar numItems = " +
          data.count +
          ';\n\t\t\t\tvar radius = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Radius");\n\t\t\t\tvar startAngle = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Start Angle");\n\t\t\t\tvar endAngle = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("End Angle");\n\t\t\t\tvar offset = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Offset");\n\t\t\t\tvar offsetVariation = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Offset Variation");\n\t\t\t\tvar align = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Radial Cloner")("Align Rotation").value;\n\t\t\t\tvar rnd = thisLayer("ADBE Effect Parade")("random")(1);\n\t\t\t\tvar degree = (endAngle-startAngle)/numItems;\n\t\t\t\tvar d = align?degree*layerIndex+startAngle+offset+offsetVariation*(rnd*2-1)-90:0;\n\t\t\t\ttry\n\t\t\t\t{\n\t\t\t\t\tvar totalDegree = (endAngle-startAngle);\n\t\t\t\t\td += totalDegree*thisLayer("ADBE Effect Parade")("kerning")(1).value/100;\n\t\t\t\t}catch(err){}\n\t\t\t\t//d = value[2]+d+add;\n\t\t\t\torientationX = thisLayer("ADBE Transform Group")("ADBE Orientation")[0]+addX;\n\t\t\t\torientationY = thisLayer("ADBE Transform Group")("ADBE Orientation")[1]+addY;\n\t\t\t\torientationZ = thisLayer("ADBE Transform Group")("ADBE Orientation")[2]+d+addZ;\n\t\t\t\t[orientationX, orientationY, orientationZ];'
        );
      };
      this.pathOrientation = function (controller, data, index) {
        return (
          'var align = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Align Rotation").value;\n\t\t\t\tvar orientationX = 0;\n\t\t\t\tvar orientationY = 0;\n\t\t\t\tvar orientationZ = 0;\n\t\t\t\tvar d = 0;\n\t\t\t\tif(align)\n\t\t\t\t{\n\t\t\t\t\ttry\n\t\t\t\t\t{\n\t\t\t\t\t\tvar layerIndex = ' +
          index +
          ";\n\t\t\t\t\t\tvar count = " +
          data.count +
          ';\n\t\t\t\t\t\tvar start= thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Start");\n\t\t\t\t\t\tvar end = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("End");\n\t\t\t\t\t\tvar offset = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset");\n\t\t\t\t\t\tvar offsetVariation = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset Variation");\n\t\t\t\t\t\tvar loop = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Loop").value;\n\t\t\t\t\t\tvar path = thisComp.layer("' +
          controller +
          '")("ADBE Root Vectors Group")("pathGroup")("ADBE Vectors Group")(1)("Path");\n\t\t\t\t\t\tvar rnd = thisLayer("ADBE Effect Parade")("random")(1);\n\t\t\t\t\t\tvar positionOnPath = layerIndex/(loop?count:count-1);\n\t\t\t\t\t\tpositionOnPath = linear(positionOnPath, start/100, end/100)+offset/100+offsetVariation*(rnd*2-1)/100;\n\t\t\t\t\t\tif(loop&&positionOnPath>0) positionOnPath = positionOnPath % 1;\n\t\t\t\t\t\tif(loop&&positionOnPath<0) positionOnPath = 1+positionOnPath % 1;\n\t\t\t\t\t\tvar pathTan = path.tangentOnPath(positionOnPath);\n\t\t\t\t\t\td = radiansToDegrees(Math.atan2(pathTan[1],pathTan[0]))-180;\n\t\t\t\t\t}catch(err){}\n\t\t\t\t}\n\t\t\t\torientationZ = thisLayer("ADBE Transform Group")("ADBE Orientation")[2]+d+addZ;\n\t\t\t\t[orientationX, orientationY, orientationZ];'
        );
      };
      this.pathPointsOrientation = function (controller, data, index) {
        return (
          'var align = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Points Cloner")("Align Rotation").value;\n\t\t\t\tvar orientationX = 0;\n\t\t\t\tvar orientationY = 0;\n\t\t\t\tvar orientationZ = 0;\n\t\t\t\tvar d = 0;\n\t\t\t\tif(align)\n\t\t\t\t{\n\t\t\t\t\ttry\n\t\t\t\t\t{\n\t\t\t\t\t\tvar layerIndex = ' +
          index +
          ";\n\t\t\t\t\t\tvar count = " +
          data.count +
          ';\n\t\t\t\t\t\tvar path = thisComp.layer("' +
          controller +
          '")("ADBE Root Vectors Group")("pathGroup")("ADBE Vectors Group")(1)("Path");\n\t\t\t\t\t\tvar i = Math.min(layerIndex, path.points().length-1);\n\t\t\t\t\t\tvar pointPosition = path.points()[i];\n\t\t\t\t\t\tvar prevPointIndex = path.isClosed() ? (layerIndex==0 ? path.points().length-1 : layerIndex-1) : Math.max(layerIndex-1, 0);\n\t\t\t\t\t\tvar nextPointIndex = path.isClosed() ? (layerIndex==path.points().length-1 ? 0 : layerIndex+1) : Math.min(layerIndex+1, path.points().length-1);\n\t\t\t\t\t\tvar prevPointPosition = path.points()[prevPointIndex];\n\t\t\t\t\t\tvar nextPointPosition = path.points()[nextPointIndex];\n\t\t\t\t\t\tvar inT = path.inTangents()[i];\n\t\t\t\t\t\tvar outT = path.outTangents()[i];\n\t\t\t\t\t\tvar fromPt = inT[0]==0&&inT[1]==0 ? prevPointPosition : inT;\n\t\t\t\t\t\tvar toPt = outT[0]==0&&outT[1]==0 ? nextPointPosition : outT;\n\t\t\t\t\t\tvar lkAt = lookAt(fromPt, toPt);\n\t\t\t\t\t\tif (toPt[1] > fromPt[1]){\n\t\t\t\t\t\t\td =  180-lkAt[1]+90;\n\t\t\t\t\t\t}\n\t\t\t\t\t\telse\n\t\t\t\t\t\t{\n\t\t\t\t\t\t\td = lkAt[1]+90;\n\t\t\t    \t\t}\n\t\t    \t\t}catch(err){}\n\t\t\t\t}\n\t\t\t\torientationZ = thisLayer("ADBE Transform Group")("ADBE Orientation")[2]+d+addZ;\n\t\t\t\t[orientationX, orientationY, orientationZ];'
        );
      };
      this.orientationEffectorPlain = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Orientation = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX += efx' +
          index +
          "Orientation[0]*power;\n\t\t\taddY += efx" +
          index +
          "Orientation[1]*power;\n\t\t\taddZ += efx" +
          index +
          "Orientation[2]*power;"
        );
      };
      this.orientationEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Orientation = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_orientation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Orientation[0]*power*randomValues[0];\n\t\t\taddY += efx" +
          index +
          "Orientation[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Orientation[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.orientationEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Orientation = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_orientation")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Orientation[0]*power*randomValues[0];\n\t\t\taddY += efx" +
          index +
          "Orientation[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Orientation[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.orientationEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Orientation = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\taddX += efx' +
          index +
          "Orientation[0]*power*pulseValue;\n\t\t\taddY += efx" +
          index +
          "Orientation[1]*power*pulseValue;\n\t\t\taddZ += efx" +
          index +
          "Orientation[2]*power*pulseValue;"
        );
      };
      this.orientationEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Orientation = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Orientation Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_orientation")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\taddX += efx' +
          index +
          "Orientation[0]*power*noiseValues[0];\n\t\t\taddY += efx" +
          index +
          "Orientation[1]*power*noiseValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Orientation[2]*power*noiseValues[syncValues?0:2];"
        );
      };
      this.orientationEffectorPath = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX *= 1-power;\n\t\t\taddY *= 1-power;\n\t\t\taddZ *= 1-power;'
        );
      };
      this.orientationEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX *= 1-power;\n\t\t\taddY *= 1-power;\n\t\t\taddZ *= 1-power;'
        );
      };
      this.orientation = function () {
        return 'orientationX = thisLayer("ADBE Transform Group")("ADBE Orientation")[0]+addX;\n\t\t\torientationY = thisLayer("ADBE Transform Group")("ADBE Orientation")[1]+addY;\n\t\t\torientationZ = thisLayer("ADBE Transform Group")("ADBE Orientation")[2]+addZ;\n\t\t\tvalue+[orientationX, orientationY, orientationZ];';
      };
      this.anchorEffectorPlain = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Anchor = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX += efx' +
          index +
          "Anchor[0]*power;\n\t\t\taddY += efx" +
          index +
          "Anchor[1]*power;\n\t\t\taddZ += efx" +
          index +
          "Anchor[2]*power;"
        );
      };
      this.anchorEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Anchor = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_anchor")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Anchor[0]*power*randomValues[0]*2-1;\n\t\t\taddY += efx" +
          index +
          "Anchor[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Anchor[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.anchorEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Anchor = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_anchor")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Anchor[0]*power*randomValues[0]*2-1;\n\t\t\taddY += efx" +
          index +
          "Anchor[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Anchor[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.anchorEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Anchor = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\taddX += efx' +
          index +
          "Anchor[0]*power*pulseValue;\n\t\t\taddY += efx" +
          index +
          "Anchor[1]*power*pulseValue;\n\t\t\taddZ += efx" +
          index +
          "Anchor[2]*power*pulseValue;"
        );
      };
      this.anchorEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Anchor = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Anchor Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_anchor")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\taddX += efx' +
          index +
          "Anchor[0]*power*noiseValues[0];\n\t\t\taddY += efx" +
          index +
          "Anchor[1]*power*noiseValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Anchor[2]*power*noiseValues[syncValues?0:2];"
        );
      };
      this.anchorEffectorPath = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX *= 1-power;\n\t\t\taddY *= 1-power;\n\t\t\taddZ *= 1-power;'
        );
      };
      this.anchorEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX *= 1-power;\n\t\t\taddY *= 1-power;\n\t\t\taddZ *= 1-power;'
        );
      };
      this.anchor = function () {
        return "x = addX;\n\t\t\ty = addY;\n\t\t\tz = addZ;\n\t\t\tvalue+[x,y,z];";
      };
      this.opacityEffectorPlain = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Opacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Opacity");\n\t\t\tvar forceHidden = false;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd += efx' +
          index +
          "Opacity*power;"
        );
      };
      this.opacityEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Opacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Opacity");\n\t\t\tvar forceHidden = false;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_opacity")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-(syncValues?[1,1,1]:1);\n\t\t\tadd += efx' +
          index +
          "Opacity*power*(syncValues?randomValues[0]:randomValues);"
        );
      };
      this.opacityEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Opacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Opacity");\n\t\t\tvar forceHidden = false;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_opacity")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-(syncValues?[1,1,1]:1);\n\t\t\tadd += efx' +
          index +
          "Opacity*power*(syncValues?randomValues[0]:randomValues);"
        );
      };
      this.opacityEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Opacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Opacity");\n\t\t\tvar forceHidden = false;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tpulseValue = (pulseValue+1)/2;\n\t\t\tadd += efx' +
          index +
          "Opacity*power*pulseValue;"
        );
      };
      this.opacityEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'Opacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Opacity");\n\t\t\tvar forceHidden = false;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_opacity")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = noise([noisePosX/noiseScale, noisePosY/noiseScale+3000*(syncValues?randomValues[0]:randomValues), noisePosZ]);\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tnoiseValues = (noiseValues+1)/2;\n\t\t\tadd += efx' +
          index +
          "Opacity*power*noiseValues;"
        );
      };
      this.opacityEffectorPath = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.opacityEffectorPathEnds = function (
        index,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd *= 1-power;'
        );
      };
      this.opacityPathCloner = function (controller, data, index) {
        return (
          'var add = 0;\n\t\t\tvar loop = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Loop").value;\n\t\t\tvar stackUp = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Stack Up").value;\n\t\t\tvar forceHidden = false;\n\t\t\tif(!loop&&!stackUp)\n\t\t\t{\n\t\t\t\tvar layerIndex = ' +
          index +
          ";\n\t\t\t\tvar count = " +
          data.count +
          ";\n\t\t\t\tvar pathDistribution = " +
          data.pathDistribution +
          ';\n\t\t\t\tvar start= thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Start");\n\t\t\t\tvar end = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("End");\n\t\t\t\tvar offset = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset");\n\t\t\t\tvar offsetVariation = thisComp.layer("' +
          controller +
          '")("ADBE Effect Parade")("Path Cloner")("Offset Variation");\n\t\t\t\tvar path = thisComp.layer("' +
          controller +
          '")("ADBE Root Vectors Group")("pathGroup")("ADBE Vectors Group")(1)("Path");\n\t\t\t\tvar rnd = thisLayer("ADBE Effect Parade")("random")(1);\n\t\t\t\tvar positionOnPath = layerIndex/(loop?count:count-1);\n\t\t\t\tpositionOnPath = linear(positionOnPath, start/100, end/100)+offset/100+offsetVariation*(rnd*2-1)/100;\n\t\t\t\tif(positionOnPath<0||positionOnPath>1) forceHidden = true;\n\t\t\t}'
        );
      };
      this.opacity = function () {
        return "opacity = forceHidden ? 0 : value+add;";
      };
      this.colorEffectorPlain = function (
        controller,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Color")'
        );
      };
      this.colorTintEffectorPlain = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Opacity")*thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);'
        );
      };
      this.colorEffectorRandom = function (
        controller,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomizeColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Randomize Color").value;\n\t\t\tvar uniformColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Color").value;\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("From Tint Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("To Tint Color");\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_color")(1);\n\t\t\tif(uniformColor)\n\t\t\t{\n\t\t\t\tvar color = (to-from)*randomValues[0]+from;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tvar r = (to[0]-from[0])*randomValues[0]+from[0];\n\t\t\t\tvar g = (to[1]-from[1])*randomValues[1]+from[1];\n\t\t\t\tvar b = (to[2]-from[2])*randomValues[2]+from[2];\n\t\t\t\tvar color = [r, g, b, 0];\n\t\t\t}\n\t\t\tcolor = randomizeColor?color:from;'
        );
      };
      this.colorEffectorWiggle = function (
        controller,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomizeColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Wiggle Color").value;\n\t\t\tvar uniformColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Color").value;\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("From Tint Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("To Tint Color");\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_color")(1);\n\t\t\trandomValues = [Math.max(-1, Math.min(1, randomValues[0])), Math.max(-1, Math.min(1, randomValues[1])), Math.max(-1, Math.min(1, randomValues[2]))];\n\t\t\tif(uniformColor)\n\t\t\t{\n\t\t\t\tvar color = (to-from)*randomValues[0]+from;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tvar r = (to[0]-from[0])*randomValues[0]+from[0];\n\t\t\t\tvar g = (to[1]-from[1])*randomValues[1]+from[1];\n\t\t\t\tvar b = (to[2]-from[2])*randomValues[2]+from[2];\n\t\t\t\tvar color = [r, g, b, 0];\n\t\t\t}\n\t\t\tcolor = randomizeColor?color:from;'
        );
      };
      this.colorEffectorPulse = function (
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ';\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar randomizeColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Pulse Color").value;\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("From Tint Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("To Tint Color");\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tpulseValue = (pulseValue+1)/2;\n\t\t\tvar color = (to-from)*pulseValue+from;\n\t\t\tcolor = randomizeColor?color:from;'
        );
      };
      this.colorEffectorNoise = function (
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ';\n\t\t\tvar randomizeColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Noise Color").value;\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("From Tint Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("To Tint Color");\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_color")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]);\n\t\t\tnoiseValues = Math.max(-1, Math.min(1, noiseValues));\n\t\t\tnoiseValues = (noiseValues+1)/2;\n\t\t\tvar color = (to-from)*noiseValues+from;\n\t\t\tcolor = randomizeColor?color:from;'
        );
      };
      this.colorTintEffectorRandom = function (
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomizeOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Randomize Opacity").value;\n\t\t\tvar tintOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Opacity");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tif(randomizeOpacity)\n\t\t\t{\n\t\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_colortint")(1);\n\t\t\t\tamount = tintOpacity*power*(syncValues?randomValues[0]:randomValues);\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tamount = tintOpacity*power;\n\t\t\t}'
        );
      };
      this.colorTintEffectorWiggle = function (
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomizeOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Wiggle Opacity").value;\n\t\t\tvar tintOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Opacity");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tif(randomizeOpacity)\n\t\t\t{\n\t\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_colortint")(1);\n\t\t\t\tamount = tintOpacity*power*(syncValues?randomValues[0]:randomValues);\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tamount = tintOpacity*power;\n\t\t\t}'
        );
      };
      this.colorTintEffectorPulse = function (
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ';\n\t\t\tvar randomizeOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Pulse Opacity").value;\n\t\t\tvar tintOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Opacity");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tif(randomizeOpacity)\n\t\t\t{\n\t\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\t\tvar delta;\n\t\t\t\tif(usePosition)\n\t\t\t\t{\n\t\t\t\t\t\n\t\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\t\n\t\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t\t}\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t\t}\n\t\t\t\tif(loop)\n\t\t\t\t{\n\t\t\t\t\tdelta = delta+.5;\n\t\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t\t}\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\tdelta = delta-.25;\n\t\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t\t}\n\t\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\t\tpulseValue = (pulseValue+1)/2;\n\t\t\t\tamount = tintOpacity*power*pulseValue;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tamount = tintOpacity*power;\n\t\t\t}'
        );
      };
      this.colorTintEffectorNoise = function (
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ';\n\t\t\tvar randomizeOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Noise Opacity").value;\n\t\t\tvar tintOpacity = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Opacity");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tif(randomizeOpacity)\n\t\t\t{\n\t\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_colortint")(1);\n\t\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\t\tnoiseValues = noise([noisePosX/noiseScale, noisePosY/noiseScale+3000*(syncValues?randomValues[0]:randomValues), noisePosZ]);\n\t\t\t\tnoiseValues = Math.max(-1, Math.min(1, noiseValues));\n\t\t\t\tnoiseValues = (noiseValues+1)/2;\n\t\t\t\tamount = tintOpacity*power*noiseValues;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tamount = tintOpacity*power;\n\t\t\t}'
        );
      };
      this.colorEffectorLayer = function (
        controller,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var sourceLayer = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Source Layer");\n\t\t\tvar clonerPosition = thisComp.layer("' +
          controller +
          '").position;\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '").toWorld(thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tvar thisPosition = clonerPosition+[originalX+addX, originalY+addY];\n\t\t\tvar sampleColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sample Color").value;\n\t\t\tif(sampleColor)\n\t\t\t{\n\t\t\t\tc = sourceLayer.sampleImage(thisPosition, [1, 1]/2, true, time);\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tthisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Color")\n\t\t\t}'
        );
      };
      this.colorTintEffectorLayer = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var sampleColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sample Color").value;\n\t\t\tvalue = sampleColor?thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Opacity")*thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'TintPower")(1):thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Tint Opacity")*thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);'
        );
      };
      this.colorTintEffectorPath = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tamount *= 1-power;'
        );
      };
      this.colorTintEffectorPathEnds = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tamount *= 1-power;'
        );
      };
      this.colorMapWhiteTo = function (effectName) {
        return 'thisLayer("ADBE Effect Parade")("' + effectName + '")(1);';
      };
      this.timeEffectorPlain = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'StartTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time Start");\n\t\t\tvar efx' +
          index +
          'EndTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time End");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tstart += efx' +
          index +
          "StartTime;\n\t\t\tend += (efx" +
          index +
          "EndTime-efx" +
          index +
          "StartTime)*power;"
        );
      };
      this.timeEffectorRandom = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomSeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Random Seed");\n\t\t\tvar efx' +
          index +
          'StartTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time Start");\n\t\t\tvar efx' +
          index +
          'EndTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time End");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_time")(1);\n\t\t\tstart += efx' +
          index +
          "StartTime;\n\t\t\tend += (efx" +
          index +
          "EndTime-efx" +
          index +
          "StartTime)*power*randomValues[0];"
        );
      };
      this.timeEffectorWiggle = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomSeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Random Seed");\n\t\t\tvar efx' +
          index +
          'StartTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time Start");\n\t\t\tvar efx' +
          index +
          'EndTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time End");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_time")(1);\n\t\t\tstart += efx' +
          index +
          "StartTime;\n\t\t\tend += (efx" +
          index +
          "EndTime-efx" +
          index +
          "StartTime)*power*randomValues[0];"
        );
      };
      this.timeEffectorPulse = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'StartTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time Start");\n\t\t\tvar efx' +
          index +
          'EndTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time End");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tpulseValue = (pulseValue+1)/2;\n\t\t\tstart += efx' +
          index +
          "StartTime;\n\t\t\tend += (efx" +
          index +
          "EndTime-efx" +
          index +
          "StartTime)*power*pulseValue;"
        );
      };
      this.timeEffectorNoise = function (
        index,
        effectorName,
        effectorType,
        randomLayer,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar efx' +
          index +
          'StartTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time Start");\n\t\t\tvar efx' +
          index +
          'EndTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time End");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_time")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]);\n\t\t\tnoiseValues = Math.max(-1, Math.min(1, noiseValues));\n\t\t\tnoiseValues = (noiseValues+1)/2;\n\t\t\tstart += efx' +
          index +
          "StartTime;\n\t\t\tend += (efx" +
          index +
          "EndTime-efx" +
          index +
          "StartTime)*power*noiseValues;"
        );
      };
      this.timeEffectorLayer = function (index, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'StartTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time Start");\n\t\t\tvar efx' +
          index +
          'EndTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Time End");\n\t\t\tvar power = (thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1)+1)/2;\n\t\t\tstart += efx' +
          index +
          "StartTime;\n\t\t\tend += (efx" +
          index +
          "EndTime-efx" +
          index +
          "StartTime)*power;"
        );
      };
      this.time = function () {
        return "timeRemap = start+end;";
      };
      this.customEffector1dPlain = function (index, effectorName, effectName) {
        return (
          "var efx" +
          index +
          'Value = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tadd += efx' +
          index +
          "Value*power;"
        );
      };
      this.customEffector1dRandom = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Value = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-(syncValues?[1,1,1]:1);\n\t\t\tadd += efx' +
          index +
          "Value*power*(syncValues?randomValues[0]:randomValues);"
        );
      };
      this.customEffector1dWiggle = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Value = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-(syncValues?[1,1,1]:1);\n\t\t\tadd += efx' +
          index +
          "Value*power*(syncValues?randomValues[0]:randomValues);"
        );
      };
      this.customEffector1dPulse = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Value = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\tadd += efx' +
          index +
          "Value*power*pulseValue;"
        );
      };
      this.customEffector1dNoise = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        var noiseEffectName =
          "0" +
          randomEffectName.substring(
            randomEffectName.indexOf("_"),
            randomEffectName.length,
          );
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Value = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          noiseEffectName +
          '")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+3000*(syncValues?randomValues[0]:randomValues), noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+6000*(syncValues?randomValues[0]:randomValues), noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+9000*(syncValues?randomValues[0]:randomValues), noisePosZ])];\n\t\t\tif(absolute) noiseValues = (noiseValues+(syncValues?[1,1,1]:1))/2;\n\t\t\tadd += efx' +
          index +
          "Value*power*noiseValues[0];"
        );
      };
      this.custom1d = function () {
        return "value += add;";
      };
      this.customEffector2dPlain = function (index, effectorName, effectName) {
        return (
          "var efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX += efx' +
          index +
          "Value[0]*power;\n\t\t\taddY += efx" +
          index +
          "Value[1]*power;"
        );
      };
      this.customEffector2dRandom = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y")];\n\t\t\tvar uniformValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Uniform Values").value;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*randomValues[0];\n\t\t\taddY += uniformValues?efx" +
          index +
          "Value[0]*power*randomValues[0]:efx" +
          index +
          "Value[1]*power*randomValues[syncValues?0:1];"
        );
      };
      this.customEffector2dWiggle = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y")];\n\t\t\tvar uniformValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Uniform Values").value;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*randomValues[0];\n\t\t\taddY += uniformValues?efx" +
          index +
          "Value[0]*power*randomValues[0]:efx" +
          index +
          "Value[1]*power*randomValues[syncValues?0:1];"
        );
      };
      this.customEffector2dPulse = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*pulseValue;\n\t\t\taddY += efx" +
          index +
          "Value[1]*power*pulseValue;"
        );
      };
      this.customEffector2dNoise = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        var noiseEffectName =
          "0" +
          randomEffectName.substring(
            randomEffectName.indexOf("_"),
            randomEffectName.length,
          );
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          noiseEffectName +
          '")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*noiseValues[0];\n\t\t\taddY += efx" +
          index +
          "Value[1]*power*noiseValues[syncValues?0:1];"
        );
      };
      this.custom2d = function () {
        return "value += [addX, addY];";
      };
      this.customEffector3dPlain = function (index, effectorName, effectName) {
        return (
          "var efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\taddX += efx' +
          index +
          "Value[0]*power;\n\t\t\taddY += efx" +
          index +
          "Value[1]*power;\n\t\t\taddZ += efx" +
          index +
          "Value[2]*power;"
        );
      };
      this.customEffector3dRandom = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Z")];\n\t\t\tvar uniformValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Uniform Values").value;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*randomValues[0];\n\t\t\taddY += uniformValues?efx" +
          index +
          "Value[0]*power*randomValues[0]:efx" +
          index +
          "Value[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += uniformValues?efx" +
          index +
          "Value[0]*power*randomValues[0]:efx" +
          index +
          "Value[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.customEffector3dWiggle = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          "var efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Z")];\n\t\t\tvar uniformValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Uniform Values").value;\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\trandomValues = absolute?randomValues:randomValues*2-[1,1,1];\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*randomValues[0];\n\t\t\taddY += uniformValues?efx" +
          index +
          "Value[0]*power*randomValues[0]:efx" +
          index +
          "Value[1]*power*randomValues[syncValues?0:1];\n\t\t\taddZ += uniformValues?efx" +
          index +
          "Value[0]*power*randomValues[0]:efx" +
          index +
          "Value[2]*power*randomValues[syncValues?0:2];"
        );
      };
      this.customEffector3dPulse = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(absolute) pulseValue = (pulseValue+1)/2;\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*pulseValue;\n\t\t\taddY += efx" +
          index +
          "Value[1]*power*pulseValue;\n\t\t\taddZ += efx" +
          index +
          "Value[2]*power*pulseValue;"
        );
      };
      this.customEffector3dNoise = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        var noiseEffectName =
          "0" +
          randomEffectName.substring(
            randomEffectName.indexOf("_"),
            randomEffectName.length,
          );
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ";\n\t\t\tvar efx" +
          index +
          'Value = [thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("X"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Y"), thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Z")];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          noiseEffectName +
          '")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tif(absolute) noiseValues = (noiseValues+[1,1,1])/2;\n\t\t\taddX += efx' +
          index +
          "Value[0]*power*noiseValues[0];\n\t\t\taddY += efx" +
          index +
          "Value[1]*power*noiseValues[syncValues?0:1];\n\t\t\taddZ += efx" +
          index +
          "Value[2]*power*noiseValues[syncValues?0:2];"
        );
      };
      this.custom3d = function () {
        return "value += [addX, addY, addZ];";
      };
      this.customEffectorColorPlain = function (
        index,
        effectorName,
        effectName,
      ) {
        return (
          "var efx" +
          index +
          'Value = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Color");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar efx = (efx' +
          index +
          "Value-original)*power;\n\t\t\toriginal = original+efx;"
        );
      };
      this.customEffectorColorRandom = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var uniformColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Uniform Color").value;\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("From Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("To Color");\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tif(uniformColor)\n\t\t\t{\n\t\t\t\tvar color = (to-from)*randomValues[0]+from;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tvar r = (to[0]-from[0])*randomValues[0]+from[0];\n\t\t\t\tvar g = (to[1]-from[1])*randomValues[1]+from[1];\n\t\t\t\tvar b = (to[2]-from[2])*randomValues[2]+from[2];\n\t\t\t\tvar color = [r, g, b, 0];\n\t\t\t}\n\t\t\toriginal = original+(color-original)*power;'
        );
      };
      this.customEffectorColorPulse = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ';\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("From Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("To Color");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\tvar desync = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Desync");\n\t\t\tvar usePosition = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Position").value;\n\t\t\tvar angle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Angle");\n\t\t\tvar offset = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset");\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar loop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar jump = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Jump").value;\n\t\t\tvar easeInOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease In").value;\n\t\t\tvar easeOutOn = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Ease Out").value;\n\t\t\tvar delta;\n\t\t\tif(usePosition)\n\t\t\t{\n\t\t\t\t\n\t\t\t\tdifx = (cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0])/100;\n\t\t\t\tdify = (cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1])/100;\n\t\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\t\tb2 = c2*Math.cos(B2);\n\t\t\t\t\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*b2)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = ((useTime?time:0)+desync/10*layerIndex)*(loop?frequency*2:frequency)+offset/10;\n\t\t\t}\n\t\t\tif(loop)\n\t\t\t{\n\t\t\t\tdelta = delta+.5;\n\t\t\t\tvar d = delta <0?1:-1;\n\t\t\t\tvar pulseValue = (delta%1)*2+d;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tdelta = delta-.25;\n\t\t\t\tvar d = delta<0?1:-1;\n\t\t\t\tvar pulseValue = (Math.abs((delta%1)*2+d)-.5)*2;\n\t\t\t}\n\t\t\tif(jump) pulseValue = Math.floor(pulseValue)*2+1;\n\t\t\tif(easeInOn&&easeOutOn) pulseValue = ease((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(easeInOn&&!easeOutOn) pulseValue = easeIn((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&easeOutOn) pulseValue = easeOut((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tif(!easeInOn&&!easeOutOn) pulseValue = linear((pulseValue+1)/2, 0, 1, -1, 1);\n\t\t\tpulseValue = (pulseValue+1)/2;\n\t\t\tvar color = (to-from)*pulseValue+from;\n\t\t\toriginal = original+(color-original)*power;'
        );
      };
      this.customEffectorColorWiggle = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var uniformColor = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("Uniform Color").value;\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("From Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("To Color");\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          layerIndex +
          '_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\trandomValues = [Math.max(-1, Math.min(1, randomValues[0])), Math.max(-1, Math.min(1, randomValues[1])), Math.max(-1, Math.min(1, randomValues[2]))];\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tif(uniformColor)\n\t\t\t{\n\t\t\t\tvar color = (to-from)*randomValues[0]+from;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tvar r = (to[0]-from[0])*randomValues[0]+from[0];\n\t\t\t\tvar g = (to[1]-from[1])*randomValues[1]+from[1];\n\t\t\t\tvar b = (to[2]-from[2])*randomValues[2]+from[2];\n\t\t\t\tvar color = [r, g, b, 0];\n\t\t\t}\n\t\t\toriginal = original+(color-original)*power;'
        );
      };
      this.customEffectorColorNoise = function (
        index,
        effectorName,
        effectName,
        effectorType,
        randomLayer,
        randomEffectName,
        layerIndex,
        controller,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var cloner = thisComp.layer("' +
          controller +
          '");\n\t\t\tvar layerIndex = ' +
          layerIndex +
          ';\n\t\t\tvar from = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("From Color");\n\t\t\tvar to = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectName +
          '")("To Color");\n\t\t\tvar power = thisLayer("ADBE Effect Parade")("' +
          effectorName +
          'Power")(1);\n\t\t\tvar basePosition = thisLayer("ADBE Effect Parade")("basePosition")(1).value;\n\t\t\tvar noiseScale = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Scale")*5;\n\t\t\tvar noiseSpeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Speed")/10;\n\t\t\tvar useTime = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Use Time").value;\n\t\t\tvar offsetX = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset X")*10;\n\t\t\tvar offsetY = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Y")*10;\n\t\t\tvar offsetZ = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset Z")/100;\n\t\t\tvar absolute = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Absolute").value;\n\t\t\tvar syncValues = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Sync Values").value;\n\t\t\tvar uniform = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Uniform Scale").value;\n\t\t\tvar randomValues = syncValues?thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("0_position")(1):thisComp.layer("' +
          randomLayer.name +
          '")("ADBE Effect Parade")("' +
          randomEffectName +
          '")(1);\n\t\t\tvar noisePosX = cloner("ADBE Transform Group")("ADBE Position")[0]+basePosition[0]+offsetX;\n\t\t\tvar noisePosY = cloner("ADBE Transform Group")("ADBE Position")[1]+basePosition[1]+offsetY;\n\t\t\tvar noisePosZ = basePosition[2]+offsetZ+(useTime?time*noiseSpeed:0);\n\t\t\tnoiseValues = [noise([noisePosX/noiseScale, noisePosY/noiseScale+450*randomValues[0], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+300*randomValues[syncValues?0:1], noisePosZ]), noise([noisePosX/noiseScale, noisePosY/noiseScale+150*randomValues[syncValues?0:2], noisePosZ])];\n\t\t\tnoiseValues = [Math.max(-1, Math.min(1, noiseValues[0])), Math.max(-1, Math.min(1, noiseValues[1])), Math.max(-1, Math.min(1, noiseValues[2]))];\n\t\t\tnoiseValues = (noiseValues+[1,1,1])/2;\n\t\t\tvar color = (to-from)*noiseValues[0]+from;\n\t\t\toriginal = original+(color-original)*power;'
        );
      };
      this.customColor = function () {
        return "original;";
      };
      this.randomLayer1D = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomSeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Random Seed");\n\t\t\t\tseedRandom(randomSeed+1, true);\n\t\t\t\trandom();'
        );
      };
      this.randomLayer3D = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomSeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Random Seed");\n\t\t\t\tseedRandom(randomSeed+1, true);\n\t\t\t\tvar x = random();\n\t\t\t\tseedRandom(randomSeed+2, true);\n\t\t\t\tvar y = random();\n\t\t\t\tseedRandom(randomSeed+3, true);\n\t\t\t\tvar z = random();\n\t\t\t\t[x,y,z]'
        );
      };
      this.wiggleLayer1D = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomSeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Random Seed");\n\t\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\t\tseedRandom(randomSeed*100, true);\n\t\t\t\twiggle(frequency, 1)/2+.5;'
        );
      };
      this.wiggleLayer3D = function (effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var randomSeed = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Random Seed");\n\t\t\t\tvar frequency = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Frequency");\n\t\t\t\tseedRandom(randomSeed*100, true);\n\t\t\t\twiggle(frequency, 1)/2+[.5,.5,.5];'
        );
      };
      this.noFalloff = function (
        controller,
        effectorName,
        effectorType,
        curve,
        inside,
        outside,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'weight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tefx = weight/100;'
        );
      };
      this.radialFalloff = function (
        controller,
        effectorName,
        effectorType,
        curve,
        inside,
        outside,
      ) {
        var effectorTypeName = effectorType + " Effector";
        var falloffCurve = expressions.getFalloffCurveFunction(
          curve,
          inside,
          outside,
        );
        return (
          'x  = originalX+addX;\n\t\t\ty = originalY+addY;\n\t\t\tz = originalZ+addZ;\n\t\t\tradius = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Radial Falloff")("Radius");\n\t\t\tfalloff = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Radial Falloff")("Falloff");\n\t\t\tinvert = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Radial Falloff")("Invert Falloff")==1;\n\t\t\tweight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Position");\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '").toWorld(thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tlayerPosition = [x, y, z];\n\t\t\teffectorPosition = thisComp.layer("' +
          effectorName +
          '").toWorld(thisComp.layer("' +
          effectorName +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tdifx = clonerPosition[0]+layerPosition[0]-effectorPosition[0];\n\t\t\tdify = clonerPosition[1]+layerPosition[1]-effectorPosition[1];\n\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\tefx = c2/radius;\n\t\t\tefx = (efx-((100-falloff)/100))*(1/(1-((100-falloff)/100)));\n\t\t\tefx = Math.max(Math.min(efx, 1), 0);\n\t\t\tif(!invert) efx = 1-efx;\n\t\t\t' +
          falloffCurve() +
          "\n\t\t\tefx = efx*(weight/100);"
        );
      };
      this.sphericalFalloff = function (
        controller,
        effectorName,
        effectorType,
        curve,
        inside,
        outside,
      ) {
        var effectorTypeName = effectorType + " Effector";
        var falloffCurve = expressions.getFalloffCurveFunction(
          curve,
          inside,
          outside,
        );
        return (
          'x  = originalX+addX;\n\t\t\ty = originalY+addY;\n\t\t\tz = originalZ+addZ;\n\t\t\tradius = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Spherical Falloff")("Radius");\n\t\t\tfalloff = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Spherical Falloff")("Falloff");\n\t\t\tinvert = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Spherical Falloff")("Invert Falloff")==1;\n\t\t\tweight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Position");\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '").toWorld(thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tlayerPosition = [x, y, z];\n\t\t\teffectorPosition = thisComp.layer("' +
          effectorName +
          '").toWorld(thisComp.layer("' +
          effectorName +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tdifx = clonerPosition[0]+layerPosition[0]-effectorPosition[0];\n\t\t\tdify = clonerPosition[1]+layerPosition[1]-effectorPosition[1];\n\t\t\tdifz = thisLayer("ADBE Transform Group")("ADBE Scale").value.length==3?clonerPosition[2]+layerPosition[2]-effectorPosition[2]:1;\n\t\t\tc2 = Math.sqrt(difx*difx+dify*dify+difz*difz);\n\t\t\tefx = c2/radius;\n\t\t\tefx = (efx-((100-falloff)/100))*(1/(1-((100-falloff)/100)));\n\t\t\tefx = Math.max(Math.min(efx, 1), 0);\n\t\t\tif(!invert) efx = 1-efx;\n\t\t\t' +
          falloffCurve() +
          "\n\t\t\tefx = efx*(weight/100);"
        );
      };
      this.linearFalloff = function (
        controller,
        effectorName,
        effectorType,
        curve,
        inside,
        outside,
      ) {
        var effectorTypeName = effectorType + " Effector";
        var falloffCurve = expressions.getFalloffCurveFunction(
          curve,
          inside,
          outside,
        );
        return (
          'x  = originalX+addX;\n\t\t\ty = originalY+addY;\n\t\t\tz = originalZ+addZ;\n\t\t\tsize = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Linear Falloff")("Size");\n\t\t\tfalloff = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Linear Falloff")("Falloff")/100;\n\t\t\tangle = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("Linear Falloff")("Angle");\n\t\t\tweight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Position");\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '").toWorld(thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tlayerPosition = [x, y, z];\n\t\t\teffectorPosition = thisComp.layer("' +
          effectorName +
          '").toWorld(thisComp.layer("' +
          effectorName +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tdifx = clonerPosition[0]+layerPosition[0]-effectorPosition[0];\n\t\t\tdify = clonerPosition[1]+layerPosition[1]-effectorPosition[1];\n\t\t\tc2 = Math.sqrt(difx*difx+dify*dify);\n\t\t\tB2 = Math.atan2(dify, difx)-(angle*Math.PI/180);\n\t\t\tb2 = c2*Math.cos(B2);\n\t\t\tefx = Math.max(Math.min((b2+size/2)/size, 1), 0);\n\t\t\tefx = falloff==0?(efx<1?0:1):(efx-((1-falloff)))*(1/(1-((1-falloff))));\n\t\t\tefx = Math.max(Math.min(efx, 1), 0);\n\t\t\t' +
          falloffCurve() +
          "\n\t\t\tefx = efx*(weight/100);"
        );
      };
      this.plainEffector = function (clonerName, effectorName, effectorType) {
        return "";
      };
      this.stepEffector = function (clonerName, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'startIndex = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Start Index").value;\n\t\t\tendIndex = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("End Index").value;\n\t\t\tgap = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Gap").value;\n\t\t\toffset = -thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset").value;\n\t\t\tloop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tlayerIndex -= layerIndex % (gap+1);\n\t\t\tlayerIndex += loop ? offset-Math.floor((offset+layerIndex)/count)*count : offset;\n\t\t\tvar timePoint = startIndex==endIndex?(layerIndex>startIndex?4:0):(layerIndex-startIndex)/(endIndex-startIndex)*4;\n\t\t\tcurveValue = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Curve").valueAtTime(timePoint);\n\t\t\tefx *= curveValue*weight/100;'
        );
      };
      this.randomEffector = function (clonerName, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return "";
      };
      this.pulseEffector = function (clonerName, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return "";
      };
      this.wiggleEffector = function (clonerName, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return "";
      };
      this.noiseEffector = function (clonerName, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return "";
      };
      this.layerEffector = function (controller, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var sourceLayer = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Source Layer");\n\t\t\tvar clonerPosition = [thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Position")[0], thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Position")[1]];\n\t\t\tclonerPosition = thisComp.layer("' +
          controller +
          '").toWorld(thisComp.layer("' +
          controller +
          '")("ADBE Transform Group")("ADBE Anchor Point"));\n\t\t\tvar thisPosition = clonerPosition+[originalX+addX, originalY+addY];\n\t\t\tvar c = sourceLayer.sampleImage(thisPosition, [1, 1]/2, true, time)*2-[1,1,1];\n\t\t\tweight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tefx *= weight/100*(c[0]+c[1]+c[2])/3;'
        );
      };
      this.layerEffectorTintPower = function (
        controller,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'var sourceLayer = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Source Layer");\n\t\t\tweight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tefx *= weight/100'
        );
      };
      this.pathEffector = function (clonerName, effectorName, effectorType) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'try\n\t\t\t{\n\t\t\tweight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tstart = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Start").value/100;\n\t\t\tend = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("End").value/100;\n\t\t\toffset = -thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset").value/100;\n\t\t\tloop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tvar reverse = start>end;\n\t\t\tvar positionOnPath = positionOnPath+offset;\n\t\t\tif(loop&&positionOnPath>0&&positionOnPath!=1) positionOnPath = positionOnPath % 1;\n\t\t\tif(loop&&positionOnPath<0) positionOnPath = 1+positionOnPath % 1;\n\t\t\tvar timePoint = linear(positionOnPath, start, start+(end-start), 0, 1)*4;\n\t\t\tif(reverse) timePoint = 4-timePoint;\n\t\t\tcurveValue = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Curve").valueAtTime(timePoint);\n\t\t\tefx *= curveValue*weight/100;\n\t\t\t}catch(err){efx=0}'
        );
      };
      this.pathEndsEffector = function (
        clonerName,
        effectorName,
        effectorType,
      ) {
        var effectorTypeName = effectorType + " Effector";
        return (
          'try\n\t\t\t{\n\t\t\tweight = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Weight");\n\t\t\tstart = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Start").value/100;\n\t\t\tend = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("End").value/100;\n\t\t\toffset = -thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Offset").value/100;\n\t\t\tloop = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Loop").value;\n\t\t\tinvert = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Invert").value;\n\t\t\tvar reverse = start>end;\n\t\t\tvar positionOnPath = positionOnPath+offset;\n\t\t\tif(loop&&positionOnPath>0&&positionOnPath!=1) positionOnPath = positionOnPath % 1;\n\t\t\tif(loop&&positionOnPath<0) positionOnPath = 1+positionOnPath % 1;\n\t\t\tvar timePoint = positionOnPath<0.5 ? linear(positionOnPath, start, start+(end-start), invert?0:1, invert?1:0) : linear(positionOnPath, 1-start, 1-(start+(end-start)), invert?1:0, invert?0:1);\n\t\t\tcurveValue = thisComp.layer("' +
          effectorName +
          '")("ADBE Effect Parade")("' +
          effectorTypeName +
          '")("Curve").valueAtTime(timePoint*4);\n\t\t\tefx *= curveValue*weight/100;\n\t\t\t}catch(err){efx=0}'
        );
      };
      this.getFalloffCurveFunction = function (curveType, inside, outside) {
        if (!inside && !outside) {
          curve = this.easeLinear;
        } else {
          switch (curveType) {
            case "Linear":
              curve = this.easeLinear;
              break;
            case "Quadratic":
              if (inside && outside) {
                curve = this.easeInOutQuadratic;
              } else if (inside && !outside) {
                curve = this.easeOutQuadratic;
              } else {
                if (!inside && outside) {
                  curve = this.easeInQuadratic;
                }
              }
              break;
            case "Qubic":
              if (inside && outside) {
                curve = this.easeInOutQubic;
              } else if (inside && !outside) {
                curve = this.easeOutQubic;
              } else {
                if (!inside && outside) {
                  curve = this.easeInQubic;
                }
              }
              break;
            case "Quartic":
              if (inside && outside) {
                curve = this.easeInOutQuartic;
              } else if (inside && !outside) {
                curve = this.easeOutQuartic;
              } else {
                if (!inside && outside) {
                  curve = this.easeInQuartic;
                }
              }
              break;
            case "Quintic":
              if (inside && outside) {
                curve = this.easeInOutQuintic;
              } else if (inside && !outside) {
                curve = this.easeOutQuintic;
              } else {
                if (!inside && outside) {
                  curve = this.easeInQuintic;
                }
              }
              break;
            case "Sine":
              if (inside && outside) {
                curve = this.easeInOutSine;
              } else if (inside && !outside) {
                curve = this.easeOutSine;
              } else {
                if (!inside && outside) {
                  curve = this.easeInSine;
                }
              }
              break;
            case "Expo":
              if (inside && outside) {
                curve = this.easeInOutExpo;
              } else if (inside && !outside) {
                curve = this.easeOutExpo;
              } else {
                if (!inside && outside) {
                  curve = this.easeInExpo;
                }
              }
              break;
            case "Circular":
              if (inside && outside) {
                curve = this.easeInOutCircular;
              } else if (inside && !outside) {
                curve = this.easeOutCircular;
              } else {
                if (!inside && outside) {
                  curve = this.easeInCircular;
                }
              }
              break;
            case "Elastic":
              if (inside && outside) {
                curve = this.easeInOutElastic;
              } else if (inside && !outside) {
                curve = this.easeOutElastic;
              } else {
                if (!inside && outside) {
                  curve = this.easeInElastic;
                }
              }
              break;
            case "Back":
              if (inside && outside) {
                curve = this.easeInOutBack;
              } else if (inside && !outside) {
                curve = this.easeOutBack;
              } else {
                if (!inside && outside) {
                  curve = this.easeInBack;
                }
              }
              break;
            case "Bounce":
              if (inside && outside) {
                curve = this.easeInOutBounce;
              } else if (inside && !outside) {
                curve = this.easeOutBounce;
              } else {
                if (!inside && outside) {
                  curve = this.easeInBounce;
                }
              }
              break;
          }
        }
        return curve;
      };
      this.easeLinear = function () {
        return "efx = 1*efx/1+0;";
      };
      this.easeInQuadratic = function () {
        return "efx = 1*(efx/=1)*efx + 0;";
      };
      this.easeOutQuadratic = function () {
        return "efx = -1 * (efx/=1)*(efx-2) + 0";
      };
      this.easeInOutQuadratic = function () {
        return "if ((efx/=0.5) < 1)\n\t\t\t{\n\t\t\t\tefx = 1/2* efx* efx + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = -1/2 * ((--efx)*(efx-2) - 1) + 0;\n\t\t\t}";
      };
      this.easeInQubic = function () {
        return "efx = 1 * Math.pow (efx/1, 3) + 0;";
      };
      this.easeOutQubic = function () {
        return "efx = 1 * (Math.pow (efx/1-1, 3) + 1) + 0;";
      };
      this.easeInOutQubic = function () {
        return "if ((efx/=0.5) < 1)\n\t\t\t{\n\t\t\t\tefx = 1/2 * Math.pow (efx, 3) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = 1/2 * (Math.pow (efx-2, 3) + 2) + 0;\n\t\t\t};";
      };
      this.easeInQuartic = function () {
        return "efx = 1 * Math.pow (efx/1, 4) + 0;";
      };
      this.easeOutQuartic = function () {
        return "efx = -1 * (Math.pow (efx/1-1, 4) - 1) + 0;";
      };
      this.easeInOutQuartic = function () {
        return "if ((efx/=0.5) < 1)\n\t\t\t{\n\t\t\t\tefx = 1/2 * Math.pow (efx, 4) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = -1/2 * (Math.pow (efx-2, 4) - 2) + 0;\n\t\t\t};";
      };
      this.easeInQuintic = function () {
        return "efx = 1 * Math.pow (efx/1, 5) + 0;";
      };
      this.easeOutQuintic = function () {
        return "efx = 1 * (Math.pow (efx/1-1, 5) + 1) + 0;";
      };
      this.easeInOutQuintic = function () {
        return "if ((efx/=0.5) < 1)\n\t\t\t{\n\t\t\t\tefx = 1/2 * Math.pow (efx, 5) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = 1/2 * (Math.pow (efx-2, 5) + 2) + 0;\n\t\t\t};";
      };
      this.easeInSine = function () {
        return "efx = 1 * (1 - Math.cos(efx/1 * (Math.PI/2))) + 0;";
      };
      this.easeOutSine = function () {
        return "efx = 1 * Math.sin(efx/1 * (Math.PI/2)) + 0;";
      };
      this.easeInOutSine = function () {
        return "efx = 1/2 * (1 - Math.cos(Math.PI*efx/1)) + 0;";
      };
      this.easeInExpo = function () {
        return "efx = 1 * Math.pow(2, 10 * (efx/1 - 1)) + 0;";
      };
      this.easeOutExpo = function () {
        return "efx = 1 * (-Math.pow(2, -10 * efx/1) + 1) + 0;";
      };
      this.easeInOutExpo = function () {
        return "if ((efx/=0.5) < 1)\n\t\t\t{\n\t\t\t\tefx = 1/2 * Math.pow(2, 10 * (efx - 1)) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = 1/2 * (-Math.pow(2, -10 * --efx) + 2) + 0;\n\t\t\t};";
      };
      this.easeInCircular = function () {
        return "efx = 1 * (1 - Math.sqrt(1 - (efx/=1)*efx)) + 0;";
      };
      this.easeOutCircular = function () {
        return "efx = 1 * Math.sqrt(1 - (efx=efx/1-1)*efx) + 0;";
      };
      this.easeInOutCircular = function () {
        return "if ((efx/=0.5) < 1)\n\t\t\t{\n\t\t\t\tefx = 1/2 * (1 - Math.sqrt(1 - efx*efx)) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = 1/2 * (Math.sqrt(1 - (efx-=2)*efx) + 1) + 0;\n\t\t\t};";
      };
      this.easeInElastic = function () {
        return "if (efx==0)\n\t\t\t{\n\t\t\t\tefx = 0;\n\t\t\t}\n\t\t\telse if ((efx/=1)==1)\n\t\t\t{\n\t\t\t\tefx = 0+1;\n\t\t \t}\n\t\t \telse\n\t\t \t{\n\t\t \t\tvar p=1*.3;\n\t\t\t\tvar s=p/4;\n\t\t\t\tefx = -(1*Math.pow(2,10*(efx-=1)) * Math.sin( (efx*1-s)*(Math.PI*2)/p )) + 0;\n\t\t\t};";
      };
      this.easeOutElastic = function () {
        return "if (efx==0)\n\t\t\t{\n\t\t\t\tefx = 0;\n\t\t\t}\n\t\t\telse if ((efx/=1)==1)\n\t\t\t{\n\t\t\t\tefx = 0+1;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tvar p=1*.3;\n\t\t\t\tvar s=p/4;\n\t\t\t\tefx = (1*Math.pow(2,-10*efx) * Math.sin( (efx*1-s)*(Math.PI*2)/p ) + 1 + 0);\n\t\t\t}";
      };
      this.easeInOutElastic = function () {
        return "if (efx==0)\n\t\t\t{\n\t\t\t\tefx = 0;\n\t\t\t}\n\t\t\telse if ((efx/=1/2)==2)\n\t\t\t{\n\t\t\t\tefx = 0+1;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tvar p=1*(.3*1.5);\n\t\t\t\tvar s=p/4;\n\t\t\t\tif (efx < 1)\n\t\t\t\t{\n\t\t\t\t\tefx = -.5*(1*Math.pow(2,10*(efx-=1)) * Math.sin( (efx*1-s)*(Math.PI*2)/p )) + 0;\n\t\t\t\t}\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\tefx = 1*Math.pow(2,-10*(efx-=1)) * Math.sin( (efx*1-s)*(Math.PI*2)/p )*.5 + 1 + 0;\n\t\t\t\t}\n\t\t\t}";
      };
      this.easeInBack = function () {
        return "var s = 1.70158;\n\t\t\tefx = 1*(efx/=1)*efx*((s+1)*efx - s) + 0;";
      };
      this.easeOutBack = function () {
        return "var s = 1.70158;\n\t\t\tefx = 1*((efx=efx/1-1)*efx*((s+1)*efx + s) + 1) + 0;";
      };
      this.easeInOutBack = function () {
        return "var s = 1.70158;\n\t\t\tif ((efx/=0.5) < 1)\n\t\t\t{\n\t\t\t\tefx = 1/2*(efx*efx*(((s*=(1.525))+1)*efx - s)) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = 1/2*((efx-=2)*efx*(((s*=(1.525))+1)*efx + s) + 2) + 0;\n\t\t\t}";
      };
      this.easeInBounce = function () {
        return "var r;\n\t\t\tefx = 1-efx;\n\t\t\tif ((efx/=1) < (1/2.75))\n\t\t\t{\n\t\t\t\tr = 1*(7.5625*efx*efx) + 0;\n\t\t\t}\n\t\t\telse if (efx < (2/2.75))\n\t\t\t{\n\t\t\t\tr = 1*(7.5625*(efx-=(1.5/2.75))*efx + .75) + 0;\n\t\t\t}\n\t\t\telse if (efx < (2.5/2.75))\n\t\t\t{\n\t\t\t\tr = 1*(7.5625*(efx-=(2.25/2.75))*efx + .9375) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tr = 1*(7.5625*(efx-=(2.625/2.75))*efx + .984375) + 0;\n\t\t\t}\n\t\t\tefx = 1 - r + 0;";
      };
      this.easeOutBounce = function () {
        return "if ((efx/=1) < (1/2.75))\n\t\t\t{\n\t\t\t\tefx = 1*(7.5625*efx*efx) + 0;\n\t\t\t}\n\t\t\telse if (efx < (2/2.75))\n\t\t\t{\n\t\t\t\tefx = 1*(7.5625*(efx-=(1.5/2.75))*efx + .75) + 0;\n\t\t\t}\n\t\t\telse if (efx < (2.5/2.75))\n\t\t\t{\n\t\t\t\tefx = 1*(7.5625*(efx-=(2.25/2.75))*efx + .9375) + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = 1*(7.5625*(efx-=(2.625/2.75))*efx + .984375) + 0;\n\t\t\t}";
      };
      this.easeInOutBounce = function () {
        return "if (efx < 1/2)\n\t\t\t{\n\t\t\t\tvar r;\n\t\t\t\tefx = efx*2;\n\t\t\t\tefx = 1-efx;\n\t\t\t\tif ((efx/=1) < (1/2.75))\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*efx*efx) + 0;\n\t\t\t\t}\n\t\t\t\telse if (efx < (2/2.75))\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*(efx-=(1.5/2.75))*efx + .75) + 0;\n\t\t\t\t}\n\t\t\t\telse if (efx < (2.5/2.75))\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*(efx-=(2.25/2.75))*efx + .9375) + 0;\n\t\t\t\t}\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*(efx-=(2.625/2.75))*efx + .984375) + 0;\n\t\t\t\t}\n\t\t\t\tr = 1 - r + 0;\n\t\t\t\tefx = r * .5 + 0;\n\t\t\t}\n\t\t\telse\n\t\t\t{\n\t\t\t\tefx = efx*2-1;\n\t\t\t\tvar r;\n\t\t\t\tif ((efx/=1) < (1/2.75))\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*efx*efx) + 0;\n\t\t\t\t}\n\t\t\t\telse if (efx < (2/2.75))\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*(efx-=(1.5/2.75))*efx + .75) + 0;\n\t\t\t\t}\n\t\t\t\telse if (efx < (2.5/2.75))\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*(efx-=(2.25/2.75))*efx + .9375) + 0;\n\t\t\t\t}\n\t\t\t\telse\n\t\t\t\t{\n\t\t\t\t\tr = 1*(7.5625*(efx-=(2.625/2.75))*efx + .984375) + 0;\n\t\t\t\t}\n\t\t\t\tefx = r  * .5 + 1*.5 + 0;\n\t\t\t}";
      };
    }
    function UIBuilder(aeCloner) {
      var utils = new Utils();
      var uiBuilder = this;
      var disableUpdate = false;
      var visibilityState = false;
      var motionblurState = false;
      var threeDState = false;
      var positionState = false;
      var rotationState = false;
      var orientationState = false;
      var scaleState = false;
      var anchorState = false;
      var opacityState = false;
      var colorState = false;
      var timeState = false;
      var appVersion = Number(app.buildName.substr(0, 2));
      var settingsState = false;
      var savedSettingHIDPI = false;
      var savedSettingKeepUnbake = 0;
      savedSettingHIDPI = app.settings.haveSetting("aecglobalsettings", "hidpi")
        ? app.settings.getSetting("aecglobalsettings", "hidpi") == "true"
          ? true
          : false
        : false;
      savedSettingKeepUnbake = app.settings.haveSetting(
        "aecglobalsettings",
        "keepunbake",
      )
        ? Number(app.settings.getSetting("aecglobalsettings", "keepunbake"))
        : 0;
      this.buildUI = function (basePanel, data) {
        function mouseoverHandler(e) {
          if (!e.view.parent && appVersion > 11) {
            updatePanel(false);
          }
        }
        function updateClonersSettings() {
          var cloner = aeCloner.selectedCloner;
          disableUpdate = true;
          if (cloner) {
            if (!cloner.data.baked) {
              switch (cloner.data.type) {
                case "Linear":
                  typeIndex = 0;
                  break;
                case "Radial":
                  typeIndex = 1;
                  break;
                case "Path":
                  typeIndex = 2;
                  break;
                case "Path Points":
                  typeIndex = 3;
                  break;
                case "Grid":
                  typeIndex = appVersion >= 15 ? 4 : 2;
                  break;
                case "Cluster":
                  typeIndex = appVersion >= 15 ? 5 : 3;
                  break;
              }
              palClonerSettingsTypeDropdown.selection = typeIndex;
              motionblurState = cloner.data.motionBlur;
              threeDState = cloner.data.threeDLayer;
              palClonerSettingsCycleDropdown.selection =
                cloner.data.cycle == "Iterate" ? 0 : 1;
              palClonerSettingsSeedInput.text = cloner.data.seed;
              palClonerSettingsCountInput.text = cloner.data.count;
              palClonerSettingsCountSlider.value = Number(cloner.data.count);
              palClonerSettingsCountPathCountInput.text = cloner.data.count;
              palClonerSettingsCountPathCountSlider.value = Number(
                cloner.data.count,
              );
              palClonerSettingsCountGridInputX.text = cloner.data.countX;
              palClonerSettingsCountGridSliderX.value = Number(
                cloner.data.countX,
              );
              palClonerSettingsCountGridInputY.text = cloner.data.countY;
              palClonerSettingsCountGridSliderY.value = Number(
                cloner.data.countY,
              );
              palClonerSettingsCountGridInputZ.text = cloner.data.countZ;
              palClonerSettingsCountGridSliderZ.value = Number(
                cloner.data.countZ,
              );
              adjustClonerSettingsLayout();
              var currentEffectorsListSelection =
                palEffectorsSettingsList.selection == null
                  ? 0
                  : palEffectorsSettingsList.selection.index;
              palEffectorsSettingsList.removeAll();
              for (var i = 0; i < cloner.effectors.length; i += 1) {
                palEffectorsSettingsList.add("item", cloner.effectors[i].name);
              }
              currentEffectorsListSelection = Math.min(
                currentEffectorsListSelection,
                palEffectorsSettingsList.items.length - 1,
              );
              palEffectorsSettingsList.selection =
                currentEffectorsListSelection;
              visibilityState = cloner.data.visibility;
              motionblurState = cloner.data.motionBlur;
              threeDState = cloner.data.threeDLayer;
              setLayerpropButtons();
              if (cloner.effectors.length != 0) {
                updateEffectorSettings();
                palEffectorsSettingsTypeDropdownChange();
                palEffectorsStart.visible = false;
                palEffectorsSettings.visible = true;
              } else {
                palEffectorsStart.visible = true;
                palEffectorsSettings.visible = false;
                adjustClonerSettingsLayout();
              }
              palBaked.visible = false;
            } else {
              palBaked.visible = true;
              palClonerStart.visible = false;
              palClonerSettings.visible = false;
              palEffectorsStart.visible = false;
              palEffectorsSettings.visible = false;
            }
          } else {
            palBaked.visible = false;
            palEffectorsStart.visible = true;
            palEffectorsSettings.visible = false;
          }
          var selectedEffectorTypeIndex =
            palEffectorsSettingsTypeDropdown.selection.index;
          if (palClonerSettingsTypeDropdown.selection.text == "Path") {
            palEffectorsSettingsTypeDropdown.removeAll();
            palEffectorsSettingsTypeDropdown.add("item", "Plain");
            palEffectorsSettingsTypeDropdown.add("item", "Step");
            palEffectorsSettingsTypeDropdown.add("item", "Random");
            palEffectorsSettingsTypeDropdown.add("item", "Layer");
            palEffectorsSettingsTypeDropdown.add("item", "Pulse");
            palEffectorsSettingsTypeDropdown.add("item", "Wiggle");
            palEffectorsSettingsTypeDropdown.add("item", "Noise");
            palEffectorsSettingsTypeDropdown.add("item", "Path");
            palEffectorsSettingsTypeDropdown.add("item", "Path Ends");
            if (savedSettingHIDPI) {
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
            }
          } else {
            palEffectorsSettingsTypeDropdown.removeAll();
            palEffectorsSettingsTypeDropdown.add("item", "Plain");
            palEffectorsSettingsTypeDropdown.add("item", "Step");
            palEffectorsSettingsTypeDropdown.add("item", "Random");
            palEffectorsSettingsTypeDropdown.add("item", "Layer");
            palEffectorsSettingsTypeDropdown.add("item", "Pulse");
            palEffectorsSettingsTypeDropdown.add("item", "Wiggle");
            palEffectorsSettingsTypeDropdown.add("item", "Noise");
            if (savedSettingHIDPI) {
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
            }
          }
          palEffectorsSettingsTypeDropdown.selection =
            selectedEffectorTypeIndex;
          adjustSettingsLayout();
          disableUpdate = false;
        }
        function updateEffectorSettings() {
          var cloner = aeCloner.selectedCloner;
          if (cloner) {
            var selectedIndex = palEffectorsSettingsList.selection
              ? palEffectorsSettingsList.selection.index
              : 0;
            var effector = cloner.effectors[selectedIndex];
            if (palEffectorsSettingsList.selection != selectedIndex) {
              palEffectorsSettingsList.selection = selectedIndex;
            }
            switch (effector.data.type) {
              case "Plain":
                typeIndex = 0;
                break;
              case "Step":
                typeIndex = 1;
                break;
              case "Random":
                typeIndex = 2;
                break;
              case "Layer":
                typeIndex = 3;
                break;
              case "Pulse":
                typeIndex = 4;
                break;
              case "Wiggle":
                typeIndex = 5;
                break;
              case "Noise":
                typeIndex = 6;
                break;
              case "Path":
                typeIndex = cloner.data.type == "Path" ? 7 : 0;
                break;
              case "Path Ends":
                typeIndex = cloner.data.type == "Path" ? 8 : 0;
                break;
            }
            palEffectorsSettingsTypeDropdown.selection = typeIndex;
            switch (effector.data.falloff) {
              case "No Falloff":
                falloffIndex = 0;
                break;
              case "Linear":
                falloffIndex = 1;
                break;
              case "Radial":
                falloffIndex = 2;
                break;
              case "Spherical":
                falloffIndex = 3;
                break;
            }
            palEffectorsSettingsFalloffDropdown.selection = falloffIndex;
            switch (effector.data.curve) {
              case "Linear":
                curveIndex = 0;
                break;
              case "Sine":
                curveIndex = 1;
                break;
              case "Quadratic":
                curveIndex = 2;
                break;
              case "Qubic":
                curveIndex = 3;
                break;
              case "Quartic":
                curveIndex = 4;
                break;
              case "Quintic":
                curveIndex = 5;
                break;
              case "Expo":
                curveIndex = 6;
                break;
              case "Circular":
                curveIndex = 7;
                break;
              case "Elastic":
                curveIndex = 8;
                break;
              case "Back":
                curveIndex = 9;
                break;
              case "Bounce":
                curveIndex = 10;
                break;
            }
            palEffectorsSettingsCurveDropdown.selection = curveIndex;
            palEffectorsSettingsOutsideCheck.value = effector.data.outside;
            palEffectorsSettingsInsideCheck.value = effector.data.inside;
            palEffectorsSettingsCurveLabel.enabled =
              effector.data.falloff != "No Falloff";
            palEffectorsSettingsCurveDropdown.enabled =
              effector.data.falloff != "No Falloff";
            palEffectorsSettingsOutsideLabel.enabled =
              effector.data.falloff != "No Falloff";
            palEffectorsSettingsOutsideCheck.enabled =
              effector.data.falloff != "No Falloff";
            palEffectorsSettingsInsideLabel.enabled =
              effector.data.falloff != "No Falloff";
            palEffectorsSettingsInsideCheck.enabled =
              effector.data.falloff != "No Falloff";
            positionState = effector.data.position;
            rotationState = effector.data.rotation;
            orientationState = effector.data.orientation;
            scaleState = effector.data.scale;
            anchorState = effector.data.anchor;
            opacityState = effector.data.opacity;
            colorState = effector.data.color;
            timeState = effector.data.time;
            setChannelButtons();
          }
        }
        function clonersUpdateMouseOver() {
          var file = File(aeCloner.images.button_update_over);
          clonersUpdate.image = file;
        }
        function clonersUpdateMouseOut() {
          var file = File(aeCloner.images.button_update);
          clonersUpdate.image = file;
        }
        function clonersUpdateClick() {
          updatePanel(false);
        }
        function clonersDropdownChange() {
          if (clonersDropdown.selection != null) {
            aeCloner.selectedCloner =
              aeCloner.activeCloners[clonersDropdown.selection.index];
            updateClonersSettings();
          }
        }
        function clonersAddMouseOver() {
          var file = File(aeCloner.images.button_add_size2_over);
          clonersAdd.image = file;
          if (clonersDropdown.items.length > 0) {
            addButtonTooltip.visible = true;
          }
        }
        function clonersAddMouseOut() {
          var file = File(aeCloner.images.button_add_size2);
          clonersAdd.image = file;
          addButtonTooltip.visible = false;
        }
        function clonersAddClick() {
          var shiftIsDown = ScriptUI.environment.keyboardState.shiftKey;
          if (shiftIsDown) {
            aeCloner.duplicate();
            updatePanel(false);
          } else {
            aeCloner.create();
            updatePanel(true);
          }
        }
        function clonersRemoveMouseOver() {
          var file = File(aeCloner.images.button_remove_size2_over);
          clonersRemove.image = file;
        }
        function clonersRemoveMouseOut() {
          var file = File(aeCloner.images.button_remove_size2);
          clonersRemove.image = file;
        }
        function clonersRemoveClick() {
          aeCloner.removeCloner();
          updatePanel(false);
        }
        function palClonerStartAddButtonMouseOver() {
          var file = File(aeCloner.images.button_add_size1_over);
          palClonerStartAddButton.image = file;
        }
        function palClonerStartAddButtonMouseOut() {
          var file = File(aeCloner.images.button_add_size1);
          palClonerStartAddButton.image = file;
        }
        function palClonerStartAddButtonClick() {
          aeCloner.create();
          updatePanel(true);
        }
        function setLayerpropButtons() {
          var file = File(
            visibilityState
              ? aeCloner.images.layerprop_visibility_selected
              : aeCloner.images.layerprop_visibility,
          );
          palClonerSettingsVisibility.image = file;
          var file = File(
            motionblurState
              ? aeCloner.images.layerprop_motionblur_selected
              : aeCloner.images.layerprop_motionblur,
          );
          palClonerSettingsMotionblur.image = file;
          var file = File(
            threeDState
              ? aeCloner.images.layerprop_3d_selected
              : aeCloner.images.layerprop_3d,
          );
          palClonerSettings3d.image = file;
        }
        function adjustClonerSettingsLayout() {
          switch (palClonerSettingsTypeDropdown.selection.text) {
            case "Linear":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = true;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 141);
              utils.setPos(palClonerSettingsBakeButton, null, 141);
              utils.setSize(palClonerSettings, null, 174);
              utils.setPos(palEffectorsStart, null, 215);
              utils.setPos(palEffectorsSettings, null, 215);
              break;
            case "Radial":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = true;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 141);
              utils.setPos(palClonerSettingsBakeButton, null, 141);
              utils.setSize(palClonerSettings, null, 174);
              utils.setPos(palEffectorsStart, null, 215);
              utils.setPos(palEffectorsSettings, null, 215);
              break;
            case "Path":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = true;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 166);
              utils.setPos(palClonerSettingsBakeButton, null, 166);
              utils.setSize(palClonerSettings, null, 199);
              utils.setPos(palEffectorsStart, null, 240);
              utils.setPos(palEffectorsSettings, null, 240);
              break;
            case "Path Points":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = true;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 140);
              utils.setPos(palClonerSettingsBakeButton, null, 140);
              utils.setSize(palClonerSettings, null, 173);
              utils.setPos(palEffectorsStart, null, 214);
              utils.setPos(palEffectorsSettings, null, 214);
              break;
            case "Grid":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = true;
              utils.setPos(palClonerSettingsLayersButton, null, 192);
              utils.setPos(palClonerSettingsBakeButton, null, 192);
              utils.setSize(palClonerSettings, null, 225);
              utils.setPos(palEffectorsStart, null, 266);
              utils.setPos(palEffectorsSettings, null, 266);
              break;
            case "Cluster":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = false;
              palClonerSettingsCycleDropdown.visible = false;
              palClonerSettingsSeedLabel.visible = false;
              palClonerSettingsSeedInput.visible = false;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 63);
              utils.setPos(palClonerSettingsBakeButton, null, 63);
              utils.setSize(palClonerSettings, null, 96);
              utils.setPos(palEffectorsStart, null, 137);
              utils.setPos(palEffectorsSettings, null, 137);
              break;
          }
          adjustSettingsLayout();
        }
        function palClonerSettingsTypeDropdownChange() {
          if (palClonerSettingsTypeDropdown.selection.index > 5) {
            palClonerSettingsTypeDropdown.selection = 5;
          }
          adjustClonerSettingsLayout();
          if (
            palClonerSettingsTypeDropdown.selection.index == 2 &&
            Number(palClonerSettingsCountGridInputZ.text) != 1
          ) {
            threeDState = true;
            setLayerpropButtons();
          }
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsMotionBlurCheckClick() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettings3DCheckClick() {
          if (
            palClonerSettingsTypeDropdown.selection.index == 2 &&
            Number(palClonerSettingsCountGridInputZ.text) != 1
          ) {
            threeDState = true;
            setLayerpropButtons();
          } else {
            if (!disableUpdate) {
              aeCloner.updateCloner();
            }
          }
        }
        function palClonerSettingsVisibilityClick() {
          visibilityState = !visibilityState;
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
          setLayerpropButtons();
        }
        function palClonerSettingsMotionblurClick() {
          motionblurState = !motionblurState;
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
          setLayerpropButtons();
        }
        function palClonerSettings3dClick() {
          threeDState = !threeDState;
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
          setLayerpropButtons();
        }
        function palClonerSettingsCycleDropdownChange() {
          palClonerSettingsSeedLabel.enabled =
            palClonerSettingsCycleDropdown.selection == 1;
          palClonerSettingsSeedInput.enabled =
            palClonerSettingsCycleDropdown.selection == 1;
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsSeedInputChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountInputChanging() {
          palClonerSettingsCountSlider.value = Number(
            palClonerSettingsCountInput.text,
          );
        }
        function palClonerSettingsCountInputChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountSliderChanging() {
          palClonerSettingsCountInput.text = Math.round(
            palClonerSettingsCountSlider.value,
          );
        }
        function palClonerSettingsCountSliderChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountPathPathButtonClick() {
          aeCloner.pathClonerSetPath();
        }
        function palClonerSettingsCountPathCountInputChanging() {
          palClonerSettingsCountPathCountSlider.value = Number(
            palClonerSettingsCountPathCountInput.text,
          );
        }
        function palClonerSettingsCountPathCountInputChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountPathCountSliderChanging() {
          palClonerSettingsCountPathCountInput.text = Math.round(
            palClonerSettingsCountPathCountSlider.value,
          );
        }
        function palClonerSettingsCountPathCountSliderChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountPathPointsPathButtonClick() {
          aeCloner.pathClonerSetPath();
        }
        function palClonerSettingsCountPathPointsPathUpdateClick() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountGridInputXChanging() {
          palClonerSettingsCountGridSliderX.value = Number(
            palClonerSettingsCountGridInputX.text,
          );
        }
        function palClonerSettingsCountGridInputXChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountGridSliderXChanging() {
          palClonerSettingsCountGridInputX.text = Math.round(
            palClonerSettingsCountGridSliderX.value,
          );
        }
        function palClonerSettingsCountGridSliderXChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountGridInputYChanging() {
          palClonerSettingsCountGridSliderY.value = Number(
            palClonerSettingsCountGridInputY.text,
          );
        }
        function palClonerSettingsCountGridInputYChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountGridSliderYChanging() {
          palClonerSettingsCountGridInputY.text = Math.round(
            palClonerSettingsCountGridSliderY.value,
          );
        }
        function palClonerSettingsCountGridSliderYChange() {
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountGridInputZChanging() {
          palClonerSettingsCountGridSliderZ.value = Number(
            palClonerSettingsCountGridInputZ.text,
          );
        }
        function palClonerSettingsCountGridInputZChange() {
          if (Number(palClonerSettingsCountGridInputZ.text) != 1) {
            threeDState = true;
            setLayerpropButtons();
          }
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsCountGridSliderZChanging() {
          palClonerSettingsCountGridInputZ.text = Math.round(
            palClonerSettingsCountGridSliderZ.value,
          );
        }
        function palClonerSettingsCountGridSliderZChange() {
          if (Number(palClonerSettingsCountGridInputZ.text) != 1) {
            threeDState = true;
            setLayerpropButtons();
          }
          if (!disableUpdate) {
            aeCloner.updateCloner();
          }
        }
        function palClonerSettingsLayersButtonClick() {
          aeCloner.updateSourceLayers();
          updatePanel(false);
        }
        function palClonerSettingsBakeButtonClick() {
          aeCloner.bake();
          updatePanel(false);
        }
        function palEffectorsStartAddButtonMouseOver() {
          var file = File(aeCloner.images.button_add_size1_over);
          palEffectorsStartAddButton.image = file;
        }
        function palEffectorsStartAddButtonMouseOut() {
          var file = File(aeCloner.images.button_add_size1);
          palEffectorsStartAddButton.image = file;
        }
        function palEffectorsStartAddButtonClick() {
          aeCloner.addEffector();
          updatePanel(false);
        }
        function palEffectorsSettingsListChange() {
          if (!disableUpdate) {
            disableUpdate = true;
            updateEffectorSettings();
            disableUpdate = false;
          }
        }
        function palEffectorsSettingsAddButtonMouseOver() {
          var file = File(aeCloner.images.button_add_size3_over);
          palEffectorsSettingsAddButton.image = file;
          if (palEffectorsSettingsList.items.length > 0) {
            utils.setPos(
              addEffectorButtonTooltip,
              null,
              palClonerSettingsTypeDropdown.selection.text == "Cluster"
                ? 152
                : 231,
            );
            addEffectorButtonTooltip.visible = true;
          }
        }
        function palEffectorsSettingsAddButtonMouseOut() {
          var file = File(aeCloner.images.button_add_size3);
          palEffectorsSettingsAddButton.image = file;
          addEffectorButtonTooltip.visible = false;
        }
        function palEffectorsSettingsRemoveButtonMouseOver() {
          var file = File(aeCloner.images.button_remove_size3_over);
          palEffectorsSettingsRemoveButton.image = file;
        }
        function palEffectorsSettingsRemoveButtonMouseOut() {
          var file = File(aeCloner.images.button_remove_size3);
          palEffectorsSettingsRemoveButton.image = file;
        }
        function palEffectorsSettingsMoveUpButtonMouseOver() {
          var file = File(aeCloner.images.button_moveup_size3_over);
          palEffectorsSettingsMoveUpButton.image = file;
        }
        function palEffectorsSettingsMoveUpButtonMouseOut() {
          var file = File(aeCloner.images.button_moveup_size3);
          palEffectorsSettingsMoveUpButton.image = file;
        }
        function palEffectorsSettingsMoveDownButtonMouseOver() {
          var file = File(aeCloner.images.button_movedown_size3_over);
          palEffectorsSettingsMoveDownButton.image = file;
        }
        function palEffectorsSettingsMoveDownButtonMouseOut() {
          var file = File(aeCloner.images.button_movedown_size3);
          palEffectorsSettingsMoveDownButton.image = file;
        }
        function palEffectorsSettingsTypeDropdownChange() {
          if (!disableUpdate) {
            var maxIndex =
              palClonerSettingsTypeDropdown.selection.text == "Path" ? 8 : 6;
            if (palEffectorsSettingsTypeDropdown.selection.index > maxIndex) {
              palEffectorsSettingsTypeDropdown.selection = maxIndex;
            }
            aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          }
        }
        function effectorChangeHandler() {
          if (palEffectorsSettingsFalloffDropdown.selection.index > 3) {
            palEffectorsSettingsFalloffDropdown.selection = 3;
          }
          if (palEffectorsSettingsCurveDropdown.selection.index > 10) {
            palEffectorsSettingsCurveDropdown.selection = 10;
          }
          if (!disableUpdate) {
            aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
            if (appVersion <= 11) {
              updatePanel(false);
            }
          }
        }
        function palEffectorsSettingsChannelsPositionClick() {
          positionState = !positionState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function palEffectorsSettingsChannelsRotationClick() {
          rotationState = !rotationState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function palEffectorsSettingsChannelsOrientationClick() {
          orientationState = !orientationState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function palEffectorsSettingsChannelsScaleClick() {
          scaleState = !scaleState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function palEffectorsSettingsChannelsAnchorClick() {
          anchorState = !anchorState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function palEffectorsSettingsChannelsOpacityClick() {
          opacityState = !opacityState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function palEffectorsSettingsChannelsColorClick() {
          colorState = !colorState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function palEffectorsSettingsChannelsTimeClick() {
          timeState = !timeState;
          aeCloner.updateEffector(palEffectorsSettingsList.selection.index);
          setChannelButtons();
        }
        function setChannelButtons() {
          var file = File(
            positionState
              ? aeCloner.images.channels_position_selected
              : aeCloner.images.channels_position,
          );
          palEffectorsSettingsChannelsPosition.image = file;
          var file = File(
            rotationState
              ? aeCloner.images.channels_rotation_selected
              : aeCloner.images.channels_rotation,
          );
          palEffectorsSettingsChannelsRotation.image = file;
          var file = File(
            orientationState
              ? aeCloner.images.channels_orientation_selected
              : aeCloner.images.channels_orientation,
          );
          palEffectorsSettingsChannelsOrientation.image = file;
          var file = File(
            scaleState
              ? aeCloner.images.channels_scale_selected
              : aeCloner.images.channels_scale,
          );
          palEffectorsSettingsChannelsScale.image = file;
          var file = File(
            anchorState
              ? aeCloner.images.channels_anchor_selected
              : aeCloner.images.channels_anchor,
          );
          palEffectorsSettingsChannelsAnchor.image = file;
          var file = File(
            opacityState
              ? aeCloner.images.channels_opacity_selected
              : aeCloner.images.channels_opacity,
          );
          palEffectorsSettingsChannelsOpacity.image = file;
          var file = File(
            colorState
              ? aeCloner.images.channels_color_selected
              : aeCloner.images.channels_color,
          );
          palEffectorsSettingsChannelsColor.image = file;
          var file = File(
            timeState
              ? aeCloner.images.channels_time_selected
              : aeCloner.images.channels_time,
          );
          palEffectorsSettingsChannelsTime.image = file;
        }
        function palEffectorsSettingsAddPropertyButtonClick() {
          aeCloner.addProperty(palEffectorsSettingsList.selection.index);
        }
        function palEffectorsSettingsRemovePropertyButtonClick() {
          aeCloner.removeProperty(palEffectorsSettingsList.selection.index);
        }
        function palBakedUnbakeButtonClick() {
          aeCloner.unbake();
          updatePanel(false);
        }
        function settingsButtonClick() {
          settingsState = !settingsState;
          var file = File(
            settingsState
              ? aeCloner.images.button_settings_selected
              : aeCloner.images.button_settings,
          );
          settingsButton.image = file;
          palSettings.visible = settingsState;
          if (settingsState) {
            palClonerStart.visible = false;
            palClonerSettings.visible = false;
          } else if (clonersDropdown.items.length == 0) {
            palClonerStart.visible = true;
            palClonerSettings.visible = false;
          } else {
            palClonerStart.visible = false;
            palClonerSettings.visible = true;
          }
        }
        function palSettingsHIDPICheckClick() {
          app.settings.saveSetting(
            "aecglobalsettings",
            "hidpi",
            palSettingsHIDPICheck.value,
          );
          savedSettingHIDPI = palSettingsHIDPICheck.value;
          setDropdownsForHIDPI();
        }
        function palSettingsKeepUnbakeDropdownChange() {
          app.settings.saveSetting(
            "aecglobalsettings",
            "keepunbake",
            palSettingsKeepUnbakeDropdown.selection.index,
          );
          savedSettingKeepUnbake =
            palSettingsKeepUnbakeDropdown.selection.index;
        }
        function adjustSettingsLayout() {
          if (palEffectorsStart.visible) {
            utils.setPos(
              settingsButton,
              null,
              palEffectorsStart.bounds[1] + palEffectorsStart.size[1] + 4,
            );
            utils.setSize(
              palSettings,
              null,
              palEffectorsStart.bounds[1] + palEffectorsStart.size[1] - 2,
            );
          } else {
            utils.setPos(
              settingsButton,
              null,
              palEffectorsSettings.bounds[1] + palEffectorsSettings.size[1] + 4,
            );
            utils.setSize(
              palSettings,
              null,
              palEffectorsSettings.bounds[1] + palEffectorsSettings.size[1] - 2,
            );
          }
        }
        function setDropdownsForHIDPI() {
          disableUpdate = true;
          var selectedTypeIndex = palClonerSettingsTypeDropdown.selection.index;
          var selectedCycleIndex =
            palClonerSettingsCycleDropdown.selection.index;
          var selectedEffectorTypeIndex =
            palEffectorsSettingsTypeDropdown.selection.index;
          var selectedFalloffIndex =
            palEffectorsSettingsFalloffDropdown.selection.index;
          var selectedCurveIndex =
            palEffectorsSettingsCurveDropdown.selection.index;
          var selectedKeepUnbakeIndex =
            palSettingsKeepUnbakeDropdown.selection.index;
          if (
            !savedSettingHIDPI &&
            palClonerSettingsTypeDropdown.items.length > 4
          ) {
            palClonerSettingsTypeDropdown.remove(4);
            palClonerSettingsTypeDropdown.remove(4);
            palClonerSettingsTypeDropdown.remove(4);
            palClonerSettingsTypeDropdown.remove(4);
            palClonerSettingsTypeDropdown.remove(4);
          } else {
            if (
              savedSettingHIDPI &&
              palClonerSettingsTypeDropdown.items.length == 4
            ) {
              palClonerSettingsTypeDropdown.add("item", "");
              palClonerSettingsTypeDropdown.add("item", "");
              palClonerSettingsTypeDropdown.add("item", "");
              palClonerSettingsTypeDropdown.add("item", "");
              palClonerSettingsTypeDropdown.add("item", "");
            }
          }
          if (
            !savedSettingHIDPI &&
            palClonerSettingsCycleDropdown.items.length > 2
          ) {
            palClonerSettingsCycleDropdown.remove(2);
            palClonerSettingsCycleDropdown.remove(2);
          } else {
            if (
              savedSettingHIDPI &&
              palClonerSettingsCycleDropdown.items.length == 2
            ) {
              palClonerSettingsCycleDropdown.add("item", "");
              palClonerSettingsCycleDropdown.add("item", "");
            }
          }
          if (
            !savedSettingHIDPI &&
            palEffectorsSettingsTypeDropdown.items.length > 7
          ) {
            palEffectorsSettingsTypeDropdown.remove(7);
            palEffectorsSettingsTypeDropdown.remove(7);
            palEffectorsSettingsTypeDropdown.remove(7);
            palEffectorsSettingsTypeDropdown.remove(7);
            palEffectorsSettingsTypeDropdown.remove(7);
            palEffectorsSettingsTypeDropdown.remove(7);
            palEffectorsSettingsTypeDropdown.remove(7);
          } else {
            if (
              savedSettingHIDPI &&
              palEffectorsSettingsTypeDropdown.items.length == 7
            ) {
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
              palEffectorsSettingsTypeDropdown.add("item", "");
            }
          }
          if (
            !savedSettingHIDPI &&
            palEffectorsSettingsFalloffDropdown.items.length > 4
          ) {
            palEffectorsSettingsFalloffDropdown.remove(4);
            palEffectorsSettingsFalloffDropdown.remove(4);
            palEffectorsSettingsFalloffDropdown.remove(4);
            palEffectorsSettingsFalloffDropdown.remove(4);
          } else {
            if (
              savedSettingHIDPI &&
              palEffectorsSettingsFalloffDropdown.items.length == 4
            ) {
              palEffectorsSettingsFalloffDropdown.add("item", "");
              palEffectorsSettingsFalloffDropdown.add("item", "");
              palEffectorsSettingsFalloffDropdown.add("item", "");
              palEffectorsSettingsFalloffDropdown.add("item", "");
            }
          }
          if (
            !savedSettingHIDPI &&
            palEffectorsSettingsCurveDropdown.items.length > 11
          ) {
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
            palEffectorsSettingsCurveDropdown.remove(11);
          } else {
            if (
              savedSettingHIDPI &&
              palEffectorsSettingsCurveDropdown.items.length == 11
            ) {
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
              palEffectorsSettingsCurveDropdown.add("item", "");
            }
          }
          if (
            !savedSettingHIDPI &&
            palSettingsKeepUnbakeDropdown.items.length > 3
          ) {
            palSettingsKeepUnbakeDropdown.remove(3);
            palSettingsKeepUnbakeDropdown.remove(3);
            palSettingsKeepUnbakeDropdown.remove(3);
          } else {
            if (
              savedSettingHIDPI &&
              palSettingsKeepUnbakeDropdown.items.length == 3
            ) {
              palSettingsKeepUnbakeDropdown.add("item", "");
              palSettingsKeepUnbakeDropdown.add("item", "");
              palSettingsKeepUnbakeDropdown.add("item", "");
            }
          }
          palClonerSettingsTypeDropdown.selection = selectedTypeIndex;
          palClonerSettingsCycleDropdown.selection = selectedCycleIndex;
          palEffectorsSettingsTypeDropdown.selection =
            selectedEffectorTypeIndex;
          palEffectorsSettingsFalloffDropdown.selection = selectedFalloffIndex;
          palEffectorsSettingsCurveDropdown.selection = selectedCurveIndex;
          palSettingsKeepUnbakeDropdown.selection = selectedKeepUnbakeIndex;
          disableUpdate = true;
          updatePanel(false);
        }
        function palSettingsAudioSetupButtonClick() {
          aeCloner.createAudioSetup();
        }
        pal =
          basePanel instanceof Panel
            ? basePanel
            : new Window("palette", "aeCloner2", undefined, {
                resizeable: false,
              });
        pal.addEventListener("mouseover", mouseoverHandler);
        updatePanel = function (clonerAdded) {
          try {
            var cloners = aeCloner.getClonersInComp();
            if (cloners) {
              var currentClonersDropdownSelection =
                clonersDropdown.selection == null
                  ? 0
                  : clonersDropdown.selection.index;
              aeCloner.activeCloners = cloners;
              clonersDropdown.removeAll();
              for (var i = 0; i < cloners.length; i += 1) {
                clonersDropdown.add("item", cloners[i].name);
              }
              if (savedSettingHIDPI) {
                for (var i = 0; i < cloners.length; i += 1) {
                  clonersDropdown.add("item", "");
                }
              }
              currentClonersDropdownSelection = Math.min(
                currentClonersDropdownSelection,
                clonersDropdown.items.length - 1,
              );
              currentClonersDropdownSelection = clonerAdded
                ? clonersDropdown.items.length - 1
                : currentClonersDropdownSelection;
              clonersDropdown.selection = currentClonersDropdownSelection;
            }
            if (!settingsState) {
              if (clonersDropdown.items.length == 0) {
                palClonerStart.visible = true;
                palClonerSettings.visible = false;
                palEffectorsStartAddButton.enabled = false;
                palEffectorsStartAddLabel.enabled = false;
                utils.setPos(palEffectorsStart, null, 215);
                utils.setPos(palEffectorsSettings, null, 215);
                aeCloner.selectedCloner = null;
              } else {
                palClonerStart.visible = false;
                palClonerSettings.visible = true;
                palEffectorsStartAddButton.enabled = true;
                palEffectorsStartAddLabel.enabled = true;
              }
            }
            palBaked.visible = false;
            updateClonersSettings();
            clonersDropdown.enabled = cloners.length != 0;
            clonersRemove.enabled = cloners.length != 0;
          } catch (err) {}
        };
        uiBuilder.updatePanel = updatePanel;
        clonersLabel = utils.createUIStaticText(pal, 3, 10, 58, 20, "Cloners");
        clonersDropdown = utils.createUIDropDown(pal, 74, 10, 80, 20, []);
        clonersDropdown.enabled = false;
        clonersAdd = utils.createUIIconButton(
          pal,
          157,
          10,
          20,
          20,
          aeCloner.images.button_add_size2,
        );
        clonersRemove = utils.createUIIconButton(
          pal,
          180,
          10,
          20,
          20,
          aeCloner.images.button_remove_size2,
        );
        clonersAdd.maximumSize = { height: 100, width: 20 };
        clonersDropdown.addEventListener("change", clonersDropdownChange);
        clonersAdd.addEventListener("mouseover", clonersAddMouseOver);
        clonersAdd.addEventListener("mouseout", clonersAddMouseOut);
        clonersAdd.onClick = clonersAddClick;
        clonersRemove.enabled = false;
        clonersRemove.addEventListener("mouseover", clonersRemoveMouseOver);
        clonersRemove.addEventListener("mouseout", clonersRemoveMouseOut);
        clonersRemove.onClick = clonersRemoveClick;
        if (appVersion <= 11) {
          clonersUpdate = utils.createUIIconButton(
            pal,
            2,
            10,
            20,
            20,
            aeCloner.images.button_update,
          );
          clonersUpdate.addEventListener("mouseover", clonersUpdateMouseOver);
          clonersUpdate.addEventListener("mouseout", clonersUpdateMouseOut);
          clonersUpdate.onClick = clonersUpdateClick;
          utils.setPos(clonersLabel, 24, 10);
        }
        palClonerStart = utils.createUIPanel(
          pal,
          2,
          35,
          198,
          174,
          "Create cloner",
        );
        palClonerStartAddButton = utils.createUIIconButton(
          palClonerStart,
          67,
          40,
          60,
          60,
          aeCloner.images.button_add_size1,
        );
        palClonerStartAddLabel = utils.createUIStaticText(
          palClonerStart,
          68,
          105,
          58,
          20,
          "Add cloner",
        );
        palClonerStart.visible = true;
        palClonerStartAddButton.addEventListener(
          "mouseover",
          palClonerStartAddButtonMouseOver,
        );
        palClonerStartAddButton.addEventListener(
          "mouseout",
          palClonerStartAddButtonMouseOut,
        );
        palClonerStartAddButton.onClick = palClonerStartAddButtonClick;
        palClonerSettings = utils.createUIPanel(
          pal,
          2,
          35,
          198,
          174,
          "Cloner settings",
        );
        palClonerSettingsTypeLabel = utils.createUIStaticText(
          palClonerSettings,
          2,
          11,
          70,
          20,
          "Type",
        );
        if (appVersion >= 15) {
          palClonerSettingsTypeDropdown = utils.createUIDropDown(
            palClonerSettings,
            70,
            11,
            122,
            20,
            ["Linear", "Radial", "Path", "Path Points", "Grid", "Cluster"],
          );
          if (savedSettingHIDPI) {
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
          }
        } else {
          palClonerSettingsTypeDropdown = utils.createUIDropDown(
            palClonerSettings,
            70,
            11,
            122,
            20,
            ["Linear", "Radial", "Grid", "Cluster"],
          );
          if (savedSettingHIDPI) {
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
            palClonerSettingsTypeDropdown.add("item", "");
          }
        }
        palClonerSettingLayerpropLabel = utils.createUIStaticText(
          palClonerSettings,
          2,
          37,
          70,
          20,
          "Properties",
        );
        palClonerSettingsVisibility = utils.createUIIconButton(
          palClonerSettings,
          70,
          37,
          20,
          20,
          aeCloner.images.layerprop_visibility,
        );
        palClonerSettingsMotionblur = utils.createUIIconButton(
          palClonerSettings,
          95,
          37,
          20,
          20,
          aeCloner.images.layerprop_motionblur,
        );
        palClonerSettings3d = utils.createUIIconButton(
          palClonerSettings,
          120,
          37,
          20,
          20,
          aeCloner.images.layerprop_3d,
        );
        palClonerSettingsCycleLabel = utils.createUIStaticText(
          palClonerSettings,
          2,
          63,
          70,
          20,
          "Cycle",
        );
        palClonerSettingsCycleDropdown = utils.createUIDropDown(
          palClonerSettings,
          70,
          63,
          122,
          20,
          ["Iterate", "Random"],
        );
        if (savedSettingHIDPI) {
          palClonerSettingsCycleDropdown.add("item", "");
          palClonerSettingsCycleDropdown.add("item", "");
        }
        palClonerSettingsSeedLabel = utils.createUIStaticText(
          palClonerSettings,
          2,
          89,
          70,
          20,
          "Seed",
        );
        palClonerSettingsSeedInput = utils.createUIEditText(
          palClonerSettings,
          70,
          89,
          122,
          20,
          String(data.seed),
        );
        palClonerSettingsCountGroup = utils.createUIGroup(
          palClonerSettings,
          0,
          115,
          198,
          30,
        );
        palClonerSettingsCountLabel = utils.createUIStaticText(
          palClonerSettingsCountGroup,
          2,
          0,
          70,
          20,
          "Count",
        );
        palClonerSettingsCountInput = utils.createUIEditText(
          palClonerSettingsCountGroup,
          70,
          0,
          34,
          20,
          String(data.count),
        );
        palClonerSettingsCountSlider = utils.createUISlider(
          palClonerSettingsCountGroup,
          107,
          4,
          85,
          13,
          data.count,
          1,
          25,
        );
        palClonerSettingsCountPathGroup = utils.createUIGroup(
          palClonerSettings,
          0,
          115,
          198,
          100,
        );
        palClonerSettingsCountPathCountLabel = utils.createUIStaticText(
          palClonerSettingsCountPathGroup,
          2,
          0,
          70,
          20,
          "Path",
        );
        palClonerSettingsCountPathPathButton = utils.createUIButton(
          palClonerSettingsCountPathGroup,
          70,
          0,
          122,
          20,
          "Set Path",
        );
        palClonerSettingsCountPathCountLabel = utils.createUIStaticText(
          palClonerSettingsCountPathGroup,
          2,
          26,
          70,
          20,
          "Count",
        );
        palClonerSettingsCountPathCountInput = utils.createUIEditText(
          palClonerSettingsCountPathGroup,
          70,
          26,
          34,
          20,
          String(data.count),
        );
        palClonerSettingsCountPathCountSlider = utils.createUISlider(
          palClonerSettingsCountPathGroup,
          107,
          30,
          85,
          13,
          data.count,
          1,
          25,
        );
        palClonerSettingsCountPathPointsGroup = utils.createUIGroup(
          palClonerSettings,
          0,
          115,
          198,
          100,
        );
        palClonerSettingsCountPathPointsCountLabel = utils.createUIStaticText(
          palClonerSettingsCountPathPointsGroup,
          2,
          0,
          70,
          20,
          "Path",
        );
        palClonerSettingsCountPathPointsPathButton = utils.createUIButton(
          palClonerSettingsCountPathPointsGroup,
          70,
          0,
          91,
          20,
          "Set Path",
        );
        palClonerSettingsCountPathPointsPathUpdate = utils.createUIIconButton(
          palClonerSettingsCountPathPointsGroup,
          165,
          0,
          20,
          20,
          aeCloner.images.button_update,
        );
        palClonerSettingsCountGridGroup = utils.createUIGroup(
          palClonerSettings,
          0,
          115,
          198,
          100,
        );
        palClonerSettingsCountGridLabelX = utils.createUIStaticText(
          palClonerSettingsCountGridGroup,
          2,
          0,
          70,
          20,
          "Count X",
        );
        palClonerSettingsCountGridInputX = utils.createUIEditText(
          palClonerSettingsCountGridGroup,
          70,
          0,
          34,
          20,
          String(data.countX),
        );
        palClonerSettingsCountGridSliderX = utils.createUISlider(
          palClonerSettingsCountGridGroup,
          107,
          4,
          85,
          13,
          data.countX,
          1,
          25,
        );
        palClonerSettingsCountGridLabelY = utils.createUIStaticText(
          palClonerSettingsCountGridGroup,
          2,
          26,
          70,
          20,
          "Count Y",
        );
        palClonerSettingsCountGridInputY = utils.createUIEditText(
          palClonerSettingsCountGridGroup,
          70,
          26,
          34,
          20,
          String(data.countX),
        );
        palClonerSettingsCountGridSliderY = utils.createUISlider(
          palClonerSettingsCountGridGroup,
          107,
          30,
          85,
          13,
          data.countY,
          1,
          25,
        );
        palClonerSettingsCountGridLabelZ = utils.createUIStaticText(
          palClonerSettingsCountGridGroup,
          2,
          52,
          70,
          20,
          "Count Z",
        );
        palClonerSettingsCountGridInputZ = utils.createUIEditText(
          palClonerSettingsCountGridGroup,
          70,
          52,
          34,
          20,
          String(data.countZ),
        );
        palClonerSettingsCountGridSliderZ = utils.createUISlider(
          palClonerSettingsCountGridGroup,
          107,
          56,
          85,
          13,
          data.countZ,
          1,
          25,
        );
        palClonerSettingsLayersButton = utils.createUIButton(
          palClonerSettings,
          2,
          141,
          128,
          20,
          "Use Selected Layers",
        );
        palClonerSettingsBakeButton = utils.createUIButton(
          palClonerSettings,
          132,
          141,
          60,
          20,
          "Bake",
        );
        palClonerSettings.visible = false;
        palClonerSettingsTypeDropdown.selection = 0;
        palClonerSettingsCycleDropdown.selection = 0;
        palClonerSettingsSeedLabel.enabled = false;
        palClonerSettingsSeedInput.enabled = false;
        palClonerSettingsCountGridGroup.visible = false;
        palClonerSettingsTypeDropdown.addEventListener(
          "change",
          palClonerSettingsTypeDropdownChange,
        );
        palClonerSettingsVisibility.onClick = palClonerSettingsVisibilityClick;
        palClonerSettingsMotionblur.onClick = palClonerSettingsMotionblurClick;
        palClonerSettings3d.onClick = palClonerSettings3dClick;
        palClonerSettingsCycleDropdown.addEventListener(
          "change",
          palClonerSettingsCycleDropdownChange,
        );
        palClonerSettingsSeedInput.addEventListener(
          "change",
          palClonerSettingsSeedInputChange,
        );
        palClonerSettingsCountInput.addEventListener(
          "changing",
          palClonerSettingsCountInputChanging,
        );
        palClonerSettingsCountInput.addEventListener(
          "change",
          palClonerSettingsCountInputChange,
        );
        palClonerSettingsCountSlider.addEventListener(
          "change",
          palClonerSettingsCountSliderChange,
        );
        palClonerSettingsCountSlider.addEventListener(
          "changing",
          palClonerSettingsCountSliderChanging,
        );
        palClonerSettingsCountPathPathButton.onClick =
          palClonerSettingsCountPathPathButtonClick;
        palClonerSettingsCountPathCountInput.addEventListener(
          "changing",
          palClonerSettingsCountPathCountInputChanging,
        );
        palClonerSettingsCountPathCountInput.addEventListener(
          "change",
          palClonerSettingsCountPathCountInputChange,
        );
        palClonerSettingsCountPathCountSlider.addEventListener(
          "change",
          palClonerSettingsCountPathCountSliderChange,
        );
        palClonerSettingsCountPathCountSlider.addEventListener(
          "changing",
          palClonerSettingsCountPathCountSliderChanging,
        );
        palClonerSettingsCountPathPointsPathButton.onClick =
          palClonerSettingsCountPathPointsPathButtonClick;
        palClonerSettingsCountPathPointsPathUpdate.onClick =
          palClonerSettingsCountPathPointsPathUpdateClick;
        palClonerSettingsCountGridInputX.addEventListener(
          "changing",
          palClonerSettingsCountGridInputXChanging,
        );
        palClonerSettingsCountGridInputX.addEventListener(
          "change",
          palClonerSettingsCountGridInputXChange,
        );
        palClonerSettingsCountGridSliderX.addEventListener(
          "changing",
          palClonerSettingsCountGridSliderXChanging,
        );
        palClonerSettingsCountGridSliderX.addEventListener(
          "change",
          palClonerSettingsCountGridSliderXChange,
        );
        palClonerSettingsCountGridInputY.addEventListener(
          "changing",
          palClonerSettingsCountGridInputYChanging,
        );
        palClonerSettingsCountGridInputY.addEventListener(
          "change",
          palClonerSettingsCountGridInputYChange,
        );
        palClonerSettingsCountGridSliderY.addEventListener(
          "changing",
          palClonerSettingsCountGridSliderYChanging,
        );
        palClonerSettingsCountGridSliderY.addEventListener(
          "change",
          palClonerSettingsCountGridSliderYChange,
        );
        palClonerSettingsCountGridInputZ.addEventListener(
          "changing",
          palClonerSettingsCountGridInputZChanging,
        );
        palClonerSettingsCountGridInputZ.addEventListener(
          "change",
          palClonerSettingsCountGridInputZChange,
        );
        palClonerSettingsCountGridSliderZ.addEventListener(
          "changing",
          palClonerSettingsCountGridSliderZChanging,
        );
        palClonerSettingsCountGridSliderZ.addEventListener(
          "change",
          palClonerSettingsCountGridSliderZChange,
        );
        palClonerSettingsLayersButton.onClick =
          palClonerSettingsLayersButtonClick;
        palClonerSettingsBakeButton.onClick = palClonerSettingsBakeButtonClick;
        palEffectorsStart = utils.createUIPanel(
          pal,
          2,
          215,
          198,
          219,
          "Create Effector",
        );
        palEffectorsStartAddButton = utils.createUIIconButton(
          palEffectorsStart,
          67,
          50,
          60,
          60,
          aeCloner.images.button_add_size1,
        );
        palEffectorsStartAddLabel = utils.createUIStaticText(
          palEffectorsStart,
          63,
          115,
          80,
          20,
          "Add Effector",
        );
        palEffectorsStart.visible = true;
        palEffectorsStartAddButton.addEventListener(
          "mouseover",
          palEffectorsStartAddButtonMouseOver,
        );
        palEffectorsStartAddButton.addEventListener(
          "mouseout",
          palEffectorsStartAddButtonMouseOut,
        );
        palEffectorsStartAddButton.onClick = palEffectorsStartAddButtonClick;
        palEffectorsStartAddButton.enabled = false;
        palEffectorsStartAddLabel.enabled = false;
        palEffectorsSettings = utils.createUIPanel(
          pal,
          2,
          215,
          198,
          271,
          "Effector Settings",
        );
        palEffectorsSettingsList = utils.createUIListBox(
          palEffectorsSettings,
          2,
          11,
          167,
          66,
          [],
        );
        palEffectorsSettingsAddButton = utils.createUIIconButton(
          palEffectorsSettings,
          172,
          11,
          20,
          15,
          aeCloner.images.button_add_size3,
        );
        palEffectorsSettingsRemoveButton = utils.createUIIconButton(
          palEffectorsSettings,
          172,
          28,
          20,
          15,
          aeCloner.images.button_remove_size3,
        );
        palEffectorsSettingsMoveUpButton = utils.createUIIconButton(
          palEffectorsSettings,
          172,
          45,
          20,
          15,
          aeCloner.images.button_moveup_size3,
        );
        palEffectorsSettingsMoveDownButton = utils.createUIIconButton(
          palEffectorsSettings,
          172,
          62,
          20,
          15,
          aeCloner.images.button_movedown_size3,
        );
        palEffectorsSettingsTypeLabel = utils.createUIStaticText(
          palEffectorsSettings,
          2,
          82,
          70,
          20,
          "Type",
        );
        palEffectorsSettingsTypeDropdown = utils.createUIDropDown(
          palEffectorsSettings,
          70,
          82,
          122,
          20,
          ["Plain", "Step", "Random", "Layer", "Pulse", "Wiggle", "Noise"],
        );
        palEffectorsSettingsTypeDropdown.items = [
          "Plain",
          "Step",
          "Random",
          "Layer",
          "Pulse",
          "Wiggle",
          "Noise",
          "Path",
          "Path Ends",
        ];
        if (savedSettingHIDPI) {
          palEffectorsSettingsTypeDropdown.add("item", "");
          palEffectorsSettingsTypeDropdown.add("item", "");
          palEffectorsSettingsTypeDropdown.add("item", "");
          palEffectorsSettingsTypeDropdown.add("item", "");
          palEffectorsSettingsTypeDropdown.add("item", "");
          palEffectorsSettingsTypeDropdown.add("item", "");
          palEffectorsSettingsTypeDropdown.add("item", "");
        }
        palEffectorsSettingsFalloffLabel = utils.createUIStaticText(
          palEffectorsSettings,
          2,
          108,
          70,
          20,
          "Falloff",
        );
        palEffectorsSettingsFalloffDropdown = utils.createUIDropDown(
          palEffectorsSettings,
          70,
          108,
          122,
          20,
          ["No Falloff", "Linear", "Radial", "Spherical"],
        );
        if (savedSettingHIDPI) {
          palEffectorsSettingsFalloffDropdown.add("item", "");
          palEffectorsSettingsFalloffDropdown.add("item", "");
          palEffectorsSettingsFalloffDropdown.add("item", "");
          palEffectorsSettingsFalloffDropdown.add("item", "");
        }
        palEffectorsSettingsCurveLabel = utils.createUIStaticText(
          palEffectorsSettings,
          2,
          134,
          70,
          20,
          "Curve",
        );
        palEffectorsSettingsCurveDropdown = utils.createUIDropDown(
          palEffectorsSettings,
          70,
          134,
          122,
          20,
          [
            "Linear",
            "Sine",
            "Quadratic",
            "Qubic",
            "Quartic",
            "Quintic",
            "Expo",
            "Circular",
            "Elastic",
            "Back",
            "Bounce",
          ],
        );
        if (savedSettingHIDPI) {
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
          palEffectorsSettingsCurveDropdown.add("item", "");
        }
        palEffectorsSettingsOutsideLabel = utils.createUIStaticText(
          palEffectorsSettings,
          2,
          160,
          70,
          20,
          "Outside",
        );
        palEffectorsSettingsOutsideCheck = utils.createUICheckbox(
          palEffectorsSettings,
          70,
          163,
          15,
          15,
        );
        palEffectorsSettingsInsideLabel = utils.createUIStaticText(
          palEffectorsSettings,
          110,
          160,
          70,
          20,
          "Inside",
        );
        palEffectorsSettingsInsideCheck = utils.createUICheckbox(
          palEffectorsSettings,
          152,
          163,
          15,
          15,
        );
        palEffectorsSettingsChannelsLabel = utils.createUIStaticText(
          palEffectorsSettings,
          2,
          186,
          70,
          20,
          "Properties:",
        );
        palEffectorsSettingsChannelsPosition = utils.createUIIconButton(
          palEffectorsSettings,
          70,
          186,
          20,
          20,
          aeCloner.images.channels_position,
        );
        palEffectorsSettingsChannelsScale = utils.createUIIconButton(
          palEffectorsSettings,
          95,
          186,
          20,
          20,
          aeCloner.images.channels_scale,
        );
        palEffectorsSettingsChannelsRotation = utils.createUIIconButton(
          palEffectorsSettings,
          120,
          186,
          20,
          20,
          aeCloner.images.channels_rotation,
        );
        palEffectorsSettingsChannelsOrientation = utils.createUIIconButton(
          palEffectorsSettings,
          145,
          186,
          20,
          20,
          aeCloner.images.channels_orientation,
        );
        palEffectorsSettingsChannelsAnchor = utils.createUIIconButton(
          palEffectorsSettings,
          170,
          186,
          20,
          20,
          aeCloner.images.channels_anchor,
        );
        palEffectorsSettingsChannelsOpacity = utils.createUIIconButton(
          palEffectorsSettings,
          70,
          212,
          20,
          20,
          aeCloner.images.channels_opacity,
        );
        palEffectorsSettingsChannelsColor = utils.createUIIconButton(
          palEffectorsSettings,
          95,
          212,
          20,
          20,
          aeCloner.images.channels_color,
        );
        palEffectorsSettingsChannelsTime = utils.createUIIconButton(
          palEffectorsSettings,
          120,
          212,
          20,
          20,
          aeCloner.images.channels_time,
        );
        palEffectorsSettingsAddPropertyButton = utils.createUIButton(
          palEffectorsSettings,
          2,
          186 + 52,
          93,
          20,
          "Add property",
        );
        palEffectorsSettingsRemovePropertyButton = utils.createUIButton(
          palEffectorsSettings,
          99,
          186 + 52,
          93,
          20,
          "Remove property",
        );
        palEffectorsSettings.visible = false;
        palEffectorsSettingsTypeDropdown.selection = 0;
        palEffectorsSettingsFalloffDropdown.selection = 0;
        palEffectorsSettingsCurveDropdown.selection = 0;
        palEffectorsSettingsOutsideCheck.value = true;
        palEffectorsSettingsInsideCheck.value = true;
        palEffectorsSettingsList.addEventListener(
          "change",
          palEffectorsSettingsListChange,
        );
        palEffectorsSettingsAddButton.addEventListener(
          "mouseover",
          palEffectorsSettingsAddButtonMouseOver,
        );
        palEffectorsSettingsAddButton.addEventListener(
          "mouseout",
          palEffectorsSettingsAddButtonMouseOut,
        );
        palEffectorsSettingsRemoveButton.addEventListener(
          "mouseover",
          palEffectorsSettingsRemoveButtonMouseOver,
        );
        palEffectorsSettingsRemoveButton.addEventListener(
          "mouseout",
          palEffectorsSettingsRemoveButtonMouseOut,
        );
        palEffectorsSettingsMoveUpButton.addEventListener(
          "mouseover",
          palEffectorsSettingsMoveUpButtonMouseOver,
        );
        palEffectorsSettingsMoveUpButton.addEventListener(
          "mouseout",
          palEffectorsSettingsMoveUpButtonMouseOut,
        );
        palEffectorsSettingsMoveDownButton.addEventListener(
          "mouseover",
          palEffectorsSettingsMoveDownButtonMouseOver,
        );
        palEffectorsSettingsMoveDownButton.addEventListener(
          "mouseout",
          palEffectorsSettingsMoveDownButtonMouseOut,
        );
        palEffectorsSettingsTypeDropdown.addEventListener(
          "change",
          palEffectorsSettingsTypeDropdownChange,
        );
        palEffectorsSettingsFalloffDropdown.addEventListener(
          "change",
          effectorChangeHandler,
        );
        palEffectorsSettingsCurveDropdown.addEventListener(
          "change",
          effectorChangeHandler,
        );
        palEffectorsSettingsOutsideCheck.onClick = effectorChangeHandler;
        palEffectorsSettingsInsideCheck.onClick = effectorChangeHandler;
        palEffectorsSettingsChannelsPosition.onClick =
          palEffectorsSettingsChannelsPositionClick;
        palEffectorsSettingsChannelsRotation.onClick =
          palEffectorsSettingsChannelsRotationClick;
        palEffectorsSettingsChannelsOrientation.onClick =
          palEffectorsSettingsChannelsOrientationClick;
        palEffectorsSettingsChannelsScale.onClick =
          palEffectorsSettingsChannelsScaleClick;
        palEffectorsSettingsChannelsAnchor.onClick =
          palEffectorsSettingsChannelsAnchorClick;
        palEffectorsSettingsChannelsOpacity.onClick =
          palEffectorsSettingsChannelsOpacityClick;
        palEffectorsSettingsChannelsColor.onClick =
          palEffectorsSettingsChannelsColorClick;
        palEffectorsSettingsChannelsTime.onClick =
          palEffectorsSettingsChannelsTimeClick;
        palEffectorsSettingsAddPropertyButton.onClick =
          palEffectorsSettingsAddPropertyButtonClick;
        palEffectorsSettingsRemovePropertyButton.onClick =
          palEffectorsSettingsRemovePropertyButtonClick;
        palEffectorsSettingsAddButton.onClick = function () {
          var shiftIsDown = ScriptUI.environment.keyboardState.shiftKey;
          if (shiftIsDown) {
            aeCloner.duplicateEffector(
              palEffectorsSettingsList.selection.index,
            );
            updatePanel(false);
          } else {
            aeCloner.addEffector();
            updatePanel(false);
          }
        };
        palEffectorsSettingsRemoveButton.onClick = function () {
          aeCloner.removeEffector(palEffectorsSettingsList.selection.index);
          updatePanel(false);
        };
        palEffectorsSettingsMoveUpButton.onClick = function () {
          aeCloner.moveEffectorUp(palEffectorsSettingsList.selection.index);
          updatePanel(false);
        };
        palEffectorsSettingsMoveDownButton.onClick = function () {
          aeCloner.moveEffectorDown(palEffectorsSettingsList.selection.index);
          updatePanel(false);
        };
        uiBuilder.setChannelButtons = setChannelButtons;
        palBaked = utils.createUIPanel(pal, 2, 35, 198, 43, "Cloner is baked");
        palBakedUnbakeButton = utils.createUIButton(
          palBaked,
          2,
          11,
          190,
          20,
          "Unbake",
        );
        palBakedUnbakeButton.onClick = palBakedUnbakeButtonClick;
        palBaked.visible = false;
        settingsButton = utils.createUIIconButton(
          pal,
          2,
          500,
          20,
          20,
          aeCloner.images.button_settings,
        );
        settingsButton.onClick = settingsButtonClick;
        palSettings = utils.createUIPanel(
          pal,
          2,
          2,
          198,
          400,
          "Settings and Tools",
        );
        palSettingsHIDPILabel = utils.createUIStaticText(
          palSettings,
          2,
          11,
          100,
          20,
          "Win10 + High DPI",
        );
        palSettingsHIDPICheck = utils.createUICheckbox(
          palSettings,
          110,
          13,
          15,
          15,
        );
        palSettingsKeepUnbakeLabel = utils.createUIStaticText(
          palSettings,
          2,
          38,
          100,
          20,
          "Keep Unbake Data",
        );
        palSettingsKeepUnbakeDropdown = utils.createUIDropDown(
          palSettings,
          110,
          38,
          82,
          20,
          ["Always", "Never", "Ask"],
        );
        if (savedSettingHIDPI) {
          palSettingsKeepUnbakeDropdown.add("item", "");
          palSettingsKeepUnbakeDropdown.add("item", "");
          palSettingsKeepUnbakeDropdown.add("item", "");
        }
        palSettingsAudioSetupButton = utils.createUIButton(
          palSettings,
          2,
          64,
          190,
          20,
          "Create Audio Setup",
        );
        palSettings.visible = false;
        palSettingsHIDPICheck.value = savedSettingHIDPI;
        palSettingsKeepUnbakeDropdown.selection = savedSettingKeepUnbake;
        palSettingsHIDPICheck.onClick = palSettingsHIDPICheckClick;
        palSettingsKeepUnbakeDropdown.onChange =
          palSettingsKeepUnbakeDropdownChange;
        palSettingsAudioSetupButton.onClick = palSettingsAudioSetupButtonClick;
        adjustSettingsLayout();
        addButtonTooltip = utils.createUIGroup(pal, 52, 34, 126, 26);
        addButtonTooltipBG = utils.createUIIconButton(
          addButtonTooltip,
          0,
          0,
          126,
          26,
          aeCloner.images.add_button_tooltip,
        );
        addButtonTooltip.visible = false;
        addEffectorButtonTooltip = utils.createUIGroup(pal, 43, 231, 130, 21);
        addEffectorButtonTooltipBG = utils.createUIIconButton(
          addEffectorButtonTooltip,
          0,
          0,
          130,
          21,
          aeCloner.images.add_effector_button_tooltip,
        );
        addEffectorButtonTooltip.visible = false;
      };
      this.setSelectedCloner = function (index) {
        clonersDropdown.selection = index;
      };
      this.getUpdateData = function () {
        var data = {};
        data.index = clonersDropdown.selection.index;
        data.type = palClonerSettingsTypeDropdown.selection.text;
        data.visibility = visibilityState;
        data.motionBlur = motionblurState;
        data.threeDLayer = threeDState;
        data.cycle = palClonerSettingsCycleDropdown.selection.text;
        data.seed = Number(palClonerSettingsSeedInput.text);
        if (palClonerSettingsTypeDropdown.selection.text == "Path") {
          data.count = Number(palClonerSettingsCountPathCountInput.text);
        } else {
          data.count = Number(palClonerSettingsCountInput.text);
        }
        data.countX = Number(palClonerSettingsCountGridInputX.text);
        data.countY = Number(palClonerSettingsCountGridInputY.text);
        data.countZ = Number(palClonerSettingsCountGridInputZ.text);
        return data;
      };
      this.setUpdateData = function (cloner) {
        function adjustSettingsLayout() {
          if (palEffectorsStart.visible) {
            utils.setPos(
              settingsButton,
              null,
              palEffectorsStart.bounds[1] + palEffectorsStart.size[1] + 4,
            );
            utils.setSize(
              palSettings,
              null,
              palEffectorsStart.bounds[1] + palEffectorsStart.size[1] - 2,
            );
          } else {
            utils.setPos(
              settingsButton,
              null,
              palEffectorsSettings.bounds[1] + palEffectorsSettings.size[1] + 4,
            );
            utils.setSize(
              palSettings,
              null,
              palEffectorsSettings.bounds[1] + palEffectorsSettings.size[1] - 2,
            );
          }
        }
        function adjustClonerSettingsLayout() {
          switch (palClonerSettingsTypeDropdown.selection.text) {
            case "Linear":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = true;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 141);
              utils.setPos(palClonerSettingsBakeButton, null, 141);
              utils.setSize(palClonerSettings, null, 174);
              utils.setPos(palEffectorsStart, null, 215);
              utils.setPos(palEffectorsSettings, null, 215);
              break;
            case "Radial":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = true;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 141);
              utils.setPos(palClonerSettingsBakeButton, null, 141);
              utils.setSize(palClonerSettings, null, 174);
              utils.setPos(palEffectorsStart, null, 215);
              utils.setPos(palEffectorsSettings, null, 215);
              break;
            case "Path":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = true;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 166);
              utils.setPos(palClonerSettingsBakeButton, null, 166);
              utils.setSize(palClonerSettings, null, 199);
              utils.setPos(palEffectorsStart, null, 240);
              utils.setPos(palEffectorsSettings, null, 240);
              break;
            case "Path Points":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = true;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 140);
              utils.setPos(palClonerSettingsBakeButton, null, 140);
              utils.setSize(palClonerSettings, null, 173);
              utils.setPos(palEffectorsStart, null, 214);
              utils.setPos(palEffectorsSettings, null, 214);
              break;
            case "Grid":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = true;
              palClonerSettingsCycleDropdown.visible = true;
              palClonerSettingsSeedLabel.visible = true;
              palClonerSettingsSeedInput.visible = true;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = true;
              utils.setPos(palClonerSettingsLayersButton, null, 192);
              utils.setPos(palClonerSettingsBakeButton, null, 192);
              utils.setSize(palClonerSettings, null, 225);
              utils.setPos(palEffectorsStart, null, 266);
              utils.setPos(palEffectorsSettings, null, 266);
              break;
            case "Cluster":
              palClonerSettingLayerpropLabel.visible = true;
              palClonerSettingsVisibility.visible = true;
              palClonerSettingsMotionblur.visible = true;
              palClonerSettings3d.visible = true;
              palClonerSettingsCycleLabel.visible = false;
              palClonerSettingsCycleDropdown.visible = false;
              palClonerSettingsSeedLabel.visible = false;
              palClonerSettingsSeedInput.visible = false;
              palClonerSettingsCountGroup.visible = false;
              palClonerSettingsCountPathGroup.visible = false;
              palClonerSettingsCountPathPointsGroup.visible = false;
              palClonerSettingsCountGridGroup.visible = false;
              utils.setPos(palClonerSettingsLayersButton, null, 63);
              utils.setPos(palClonerSettingsBakeButton, null, 63);
              utils.setSize(palClonerSettings, null, 96);
              utils.setPos(palEffectorsStart, null, 137);
              utils.setPos(palEffectorsSettings, null, 137);
              break;
          }
          adjustSettingsLayout();
        }
        disableUpdate = true;
        switch (cloner.data.type) {
          case "Linear":
            typeIndex = 0;
            break;
          case "Radial":
            typeIndex = 1;
            break;
          case "Path":
            typeIndex = 2;
            break;
          case "Path Points":
            typeIndex = 3;
            break;
          case "Grid":
            typeIndex = appVersion >= 15 ? 4 : 2;
            break;
          case "Cluster":
            typeIndex = appVersion >= 15 ? 5 : 3;
            break;
        }
        palClonerSettingsTypeDropdown.selection = typeIndex;
        motionblurState = cloner.data.motionBlur;
        threeDState = cloner.data.threeDLayer;
        palClonerSettingsCycleDropdown.selection =
          cloner.data.cycle == "Iterate" ? 0 : 1;
        palClonerSettingsSeedInput.text = cloner.data.seed;
        palClonerSettingsCountInput.text = cloner.data.count;
        palClonerSettingsCountSlider.value = Number(cloner.data.count);
        palClonerSettingsCountPathCountInput.text = cloner.data.count;
        palClonerSettingsCountPathCountSlider.value = Number(cloner.data.count);
        palClonerSettingsCountGridInputX.text = cloner.data.countX;
        palClonerSettingsCountGridSliderX.value = Number(cloner.data.countX);
        palClonerSettingsCountGridInputY.text = cloner.data.countY;
        palClonerSettingsCountGridSliderY.value = Number(cloner.data.countY);
        palClonerSettingsCountGridInputZ.text = cloner.data.countZ;
        palClonerSettingsCountGridSliderZ.value = Number(cloner.data.countZ);
        adjustClonerSettingsLayout();
        disableUpdate = false;
      };
      this.setEffectorUpdateData = function (effector) {
        disableUpdate = true;
        palEffectorsSettingsList.selection =
          palEffectorsSettingsList.items.length - 1;
        switch (effector.data.type) {
          case "Plain":
            typeIndex = 0;
            break;
          case "Step":
            typeIndex = 1;
            break;
          case "Random":
            typeIndex = 2;
            break;
          case "Layer":
            typeIndex = 3;
            break;
          case "Pulse":
            typeIndex = 4;
            break;
          case "Wiggle":
            typeIndex = 5;
            break;
          case "Noise":
            typeIndex = 6;
            break;
          case "Path":
            typeIndex = 7;
            break;
          case "Path Ends":
            typeIndex = 8;
            break;
        }
        palEffectorsSettingsTypeDropdown.selection = typeIndex;
        switch (effector.data.falloff) {
          case "No Falloff":
            falloffIndex = 0;
            break;
          case "Linear":
            falloffIndex = 1;
            break;
          case "Radial":
            falloffIndex = 2;
            break;
          case "Spherical":
            falloffIndex = 3;
            break;
        }
        palEffectorsSettingsFalloffDropdown.selection = falloffIndex;
        switch (effector.data.curve) {
          case "Linear":
            curveIndex = 0;
            break;
          case "Sine":
            curveIndex = 1;
            break;
          case "Quadratic":
            curveIndex = 2;
            break;
          case "Qubic":
            curveIndex = 3;
            break;
          case "Quartic":
            curveIndex = 4;
            break;
          case "Quintic":
            curveIndex = 5;
            break;
          case "Expo":
            curveIndex = 6;
            break;
          case "Circular":
            curveIndex = 7;
            break;
          case "Elastic":
            curveIndex = 8;
            break;
          case "Back":
            curveIndex = 9;
            break;
          case "Bounce":
            curveIndex = 10;
            break;
        }
        palEffectorsSettingsCurveDropdown.selection = curveIndex;
        palEffectorsSettingsOutsideCheck.value = effector.data.outside;
        palEffectorsSettingsInsideCheck.value = effector.data.inside;
        palEffectorsSettingsCurveLabel.enabled =
          effector.data.falloff != "No Falloff";
        palEffectorsSettingsCurveDropdown.enabled =
          effector.data.falloff != "No Falloff";
        palEffectorsSettingsOutsideLabel.enabled =
          effector.data.falloff != "No Falloff";
        palEffectorsSettingsOutsideCheck.enabled =
          effector.data.falloff != "No Falloff";
        palEffectorsSettingsInsideLabel.enabled =
          effector.data.falloff != "No Falloff";
        palEffectorsSettingsInsideCheck.enabled =
          effector.data.falloff != "No Falloff";
        positionState = effector.data.position;
        rotationState = effector.data.rotation;
        orientationState = effector.data.orientation;
        scaleState = effector.data.scale;
        anchorState = effector.data.anchor;
        opacityState = effector.data.opacity;
        colorState = effector.data.color;
        timeState = effector.data.time;
        uiBuilder.setChannelButtons();
        disableUpdate = false;
      };
      this.getEffectorUpdateData = function () {
        var data = {};
        data.type = palEffectorsSettingsTypeDropdown.selection.text;
        data.falloff = palEffectorsSettingsFalloffDropdown.selection.text;
        data.curve = palEffectorsSettingsCurveDropdown.selection.text;
        data.outside = palEffectorsSettingsOutsideCheck.value;
        data.inside = palEffectorsSettingsInsideCheck.value;
        data.position = positionState;
        data.rotation = rotationState;
        data.orientation = orientationState;
        data.scale = scaleState;
        data.anchor = anchorState;
        data.opacity = opacityState;
        data.color = colorState;
        data.time = timeState;
        return data;
      };
      this.getSettingsData = function () {
        var data = {};
        data.savedSettingKeepUnbake = savedSettingKeepUnbake;
        return data;
      };
      this.setDataFromUnBake = function () {
        updatePanel(false);
      };
      this.setThreeD = function (val) {
        threeDState = val;
        var file = File(
          threeDState
            ? aeCloner.images.layerprop_3d_selected
            : aeCloner.images.layerprop_3d,
        );
        palClonerSettings3d.image = file;
      };
      this.setTrialLimit = function () {};
    }
    function EffectorFactory(aeCloner) {
      var utils = new Utils();
      var effectorFactory = this;
      var sizeColor = [0.875, 0.046875, 0.94921875];
      var falloffColor = [0.046875, 0.6640625, 0.94921875];
      this.createEffector = function (comp, name, cloner, type, falloff) {
        var layer = comp.layers.addShape();
        layer.name = name;
        layer.guideLayer = true;
        this.updateEffectorType(layer, type, cloner);
        var dataSlider = layer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        dataSlider.name = "aecdata";
        this.updateEffectorFalloff(layer, falloff);
        return layer;
      };
      this.updateEffectorType = function (layer, type, cloner) {
        if (layer("ADBE Effect Parade")("Plain Effector")) {
          layer("ADBE Effect Parade")("Plain Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Step Effector")) {
          layer("ADBE Effect Parade")("Step Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Random Effector")) {
          layer("ADBE Effect Parade")("Random Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Layer Effector")) {
          layer("ADBE Effect Parade")("Layer Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Pulse Effector")) {
          layer("ADBE Effect Parade")("Pulse Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Wiggle Effector")) {
          layer("ADBE Effect Parade")("Wiggle Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Noise Effector")) {
          layer("ADBE Effect Parade")("Noise Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Path Effector")) {
          layer("ADBE Effect Parade")("Path Effector").remove();
        }
        if (layer("ADBE Effect Parade")("Path Ends Effector")) {
          layer("ADBE Effect Parade")("Path Ends Effector").remove();
        }
        var count =
          cloner.data.type == "Grid"
            ? cloner.data.countX * cloner.data.countY * cloner.data.countZ
            : cloner.data.count;
        layer.selected = true;
        switch (type) {
          case "Plain":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_plaineffector"),
            );
            break;
          case "Step":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_stepeffector"),
            );
            layerEffect = layer("ADBE Effect Parade")(type + " Effector");
            layer("ADBE Effect Parade")("Step Effector")("End Index").setValue(
              count - 1,
            );
            layer("ADBE Effect Parade")("Step Effector")(
              "Curve",
            ).setValueAtTime(0, 0);
            layer("ADBE Effect Parade")("Step Effector")(
              "Curve",
            ).setValueAtTime(4, 1);
            break;
          case "Random":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_randomeffector"),
            );
            break;
          case "Layer":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_layereffector"),
            );
            break;
          case "Pulse":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_pulseeffector"),
            );
            break;
          case "Wiggle":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_wiggleeffector"),
            );
            break;
          case "Noise":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_noiseeffector"),
            );
            break;
          case "Path":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_patheffector"),
            );
            layer("ADBE Effect Parade")("Path Effector")(
              "Curve",
            ).setValueAtTime(0, 0);
            layer("ADBE Effect Parade")("Path Effector")(
              "Curve",
            ).setValueAtTime(4, 1);
            break;
          case "Path Ends":
            layer.applyPreset(
              aeCloner.presetNameToFile("aecloner_pathendseffector"),
            );
            layer("ADBE Effect Parade")("Path Ends Effector")(
              "Curve",
            ).setValueAtTime(0, 0);
            layer("ADBE Effect Parade")("Path Ends Effector")(
              "Curve",
            ).setValueAtTime(4, 1);
            break;
        }
        layerEffect = layer("ADBE Effect Parade")(type + " Effector");
        layerEffect.moveTo(1);
      };
      this.updateEffectorFalloff = function (layer, falloff) {
        if (layer("Contents")("Container")) {
          layer("Contents")("Container").remove();
        }
        if (layer("ADBE Effect Parade")("Linear Falloff")) {
          layer("ADBE Effect Parade")("Linear Falloff").remove();
        }
        if (layer("ADBE Effect Parade")("Radial Falloff")) {
          layer("ADBE Effect Parade")("Radial Falloff").remove();
        }
        if (layer("ADBE Effect Parade")("Spherical Falloff")) {
          layer("ADBE Effect Parade")("Spherical Falloff").remove();
        }
        switch (falloff) {
          case "No Falloff":
            falloffGraphicsFunction = effectorFactory.createNoFalloffGraphics;
            break;
          case "Linear":
            falloffGraphicsFunction =
              effectorFactory.createLinearFalloffGraphics;
            break;
          case "Radial":
            falloffGraphicsFunction =
              effectorFactory.createRadialFalloffGraphics;
            break;
          case "Spherical":
            falloffGraphicsFunction =
              effectorFactory.createSphericalFalloffGraphics;
            break;
        }
        layer.selected = true;
        falloffGraphicsFunction(layer);
      };
      this.createNoFalloffGraphics = function (l) {
        var containerGroup = l("Contents").addProperty("ADBE Vector Group");
        containerGroup.name = "Container";
      };
      this.createLinearFalloffGraphics = function (l) {
        l.applyPreset(aeCloner.presetNameToFile("aecloner_linearfalloff"));
        var falloffEffect = l("ADBE Effect Parade")("Linear Falloff");
        falloffEffect.moveTo(2);
        var containerGroup = l("Contents").addProperty("ADBE Vector Group");
        containerGroup.name = "Container";
        containerGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = "[0,0]";
        containerGroup("ADBE Vector Transform Group")(
          "ADBE Vector Rotation",
        ).expression = 'angle = effect("Linear Falloff")("Angle");';
        var beginGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        beginGroup.name = "Begin";
        var beginRectangle = beginGroup("Contents").addProperty(
          "ADBE Vector Shape - Rect",
        );
        var beginStroke = beginGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        beginGroup("Contents")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Size",
        ).setValue([1, 500]);
        beginGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = 'size = effect("Linear Falloff")("Size");[-size/2, 0];';
        beginStroke("ADBE Vector Stroke Color").setValue(sizeColor);
        var sizeGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        sizeGroup.name = "Size";
        var sizeRectangle = sizeGroup("Contents").addProperty(
          "ADBE Vector Shape - Rect",
        );
        var sizeStroke = sizeGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        sizeGroup("Contents")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Size",
        ).setValue([1, 500]);
        sizeGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression =
          'size = effect("Linear Falloff")("Size");[size-size/2, 0];';
        sizeStroke("ADBE Vector Stroke Color").setValue(sizeColor);
        var falloffGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        falloffGroup.name = "Falloff";
        var falloffRectangle = falloffGroup("Contents").addProperty(
          "ADBE Vector Shape - Rect",
        );
        var falloffStroke = falloffGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        falloffGroup("Contents")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Size",
        ).setValue([1, 500]);
        falloffGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression =
          'size = effect("Linear Falloff")("Size");falloff = effect("Linear Falloff")("Falloff");[size-size*(falloff/100)-size/2, 0];';
        falloffStroke("ADBE Vector Stroke Color").setValue(falloffColor);
        var arrowLineGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        arrowLineGroup.name = "ArrowLine";
        var arrowLineRectangle = arrowLineGroup("Contents").addProperty(
          "ADBE Vector Shape - Rect",
        );
        var arrowLineStroke = arrowLineGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        arrowLineGroup("Contents")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Size",
        ).expression = 'size = effect("Linear Falloff")("Size");[size, 1];';
        arrowLineStroke("ADBE Vector Stroke Color").setValue(falloffColor);
        var arrowEnd1Group =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        arrowEnd1Group.name = "ArrowEnd1";
        var arrowEnd1Rectangle = arrowEnd1Group("Contents").addProperty(
          "ADBE Vector Shape - Rect",
        );
        var arrowEnd1Stroke = arrowEnd1Group("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        arrowEnd1Group("Contents")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Size",
        ).setValue([30, 1]);
        arrowEnd1Group("ADBE Vector Transform Group")(
          "ADBE Vector Anchor",
        ).setValue([15, 1]);
        arrowEnd1Group("ADBE Vector Transform Group")(
          "ADBE Vector Rotation",
        ).setValue(30);
        arrowEnd1Group("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression =
          'size = effect("Linear Falloff")("Size");[size-size/2, 0];';
        arrowEnd1Stroke("ADBE Vector Stroke Color").setValue(falloffColor);
        var arrowEnd2Group =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        arrowEnd2Group.name = "ArrowEnd2";
        var arrowEnd2Rectangle = arrowEnd2Group("Contents").addProperty(
          "ADBE Vector Shape - Rect",
        );
        var arrowEnd2Stroke = arrowEnd2Group("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        arrowEnd2Group("Contents")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Size",
        ).setValue([30, 1]);
        arrowEnd2Group("ADBE Vector Transform Group")(
          "ADBE Vector Anchor",
        ).setValue([15, 1]);
        arrowEnd2Group("ADBE Vector Transform Group")(
          "ADBE Vector Rotation",
        ).setValue(-30);
        arrowEnd2Group("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression =
          'size = effect("Linear Falloff")("Size");[size-size/2, 0];';
        arrowEnd2Stroke("ADBE Vector Stroke Color").setValue(falloffColor);
      };
      this.createRadialFalloffGraphics = function (l) {
        l.applyPreset(aeCloner.presetNameToFile("aecloner_radialfalloff"));
        var falloffEffect = l("ADBE Effect Parade")("Radial Falloff");
        falloffEffect.moveTo(2);
        var containerGroup = l("Contents").addProperty("ADBE Vector Group");
        containerGroup.name = "Container";
        containerGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = "[0,0]";
        var sizeGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        sizeGroup.name = "Size";
        var sizeEllipse = sizeGroup("Contents").addProperty(
          "ADBE Vector Shape - Ellipse",
        );
        var sizeStroke = sizeGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        sizeGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = "[0,0]";
        sizeGroup("Contents")("ADBE Vector Shape - Ellipse")(
          "ADBE Vector Ellipse Size",
        ).expression =
          'radius = effect("Radial Falloff")("Radius");[radius*2, radius*2];';
        sizeStroke("ADBE Vector Stroke Color").setValue(sizeColor);
        var falloffGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        falloffGroup.name = "Falloff";
        var falloffEllipse = falloffGroup("Contents").addProperty(
          "ADBE Vector Shape - Ellipse",
        );
        var falloffStroke = falloffGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        falloffGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = "[0,0]";
        falloffGroup("Contents")("ADBE Vector Shape - Ellipse")(
          "ADBE Vector Ellipse Size",
        ).expression =
          'size = (effect("Radial Falloff")("Radius")-effect("Radial Falloff")("Radius")*effect("Radial Falloff")("Falloff")/100)*2;[size, size];';
        falloffStroke("ADBE Vector Stroke Color").setValue(falloffColor);
      };
      this.createSphericalFalloffGraphics = function (l) {
        l.applyPreset(aeCloner.presetNameToFile("aecloner_sphericalfalloff"));
        var falloffEffect = l("ADBE Effect Parade")("Spherical Falloff");
        falloffEffect.moveTo(2);
        var containerGroup = l("Contents").addProperty("ADBE Vector Group");
        containerGroup.name = "Container";
        containerGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = "[0,0]";
        var sizeGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        sizeGroup.name = "Size";
        var sizeEllipse = sizeGroup("Contents").addProperty(
          "ADBE Vector Shape - Ellipse",
        );
        var sizeStroke = sizeGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        sizeGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = "[0,0]";
        sizeGroup("Contents")("ADBE Vector Shape - Ellipse")(
          "ADBE Vector Ellipse Size",
        ).expression =
          'radius = effect("Spherical Falloff")("Radius");[radius*2, radius*2];';
        sizeStroke("ADBE Vector Stroke Color").setValue(sizeColor);
        var falloffGroup =
          containerGroup("Contents").addProperty("ADBE Vector Group");
        falloffGroup.name = "Falloff";
        var falloffEllipse = falloffGroup("Contents").addProperty(
          "ADBE Vector Shape - Ellipse",
        );
        var falloffStroke = falloffGroup("Contents").addProperty(
          "ADBE Vector Graphic - Stroke",
        );
        falloffGroup("ADBE Vector Transform Group")(
          "ADBE Vector Position",
        ).expression = "[0,0]";
        falloffGroup("Contents")("ADBE Vector Shape - Ellipse")(
          "ADBE Vector Ellipse Size",
        ).expression =
          'size = (effect("Spherical Falloff")("Radius")-effect("Spherical Falloff")("Radius")*effect("Spherical Falloff")("Falloff")/100)*2;[size, size];';
        falloffStroke("ADBE Vector Stroke Color").setValue(falloffColor);
      };
    }
    this.scriptVersion = "1.2.6";
    this.scriptPath = File($.fileName).path;
    this.images = {
      add_button_tooltip:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/add_button_tooltip.png"),
      add_effector_button_tooltip:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/add_effector_button_tooltip.png"),
      button_add_size1:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_add_size1.png"),
      button_add_size1_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_add_size1_over.png"),
      button_add_size2:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_add_size2.png"),
      button_add_size2_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_add_size2_over.png"),
      button_add_size3:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_add_size2.png"),
      button_add_size3_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_add_size2_over.png"),
      button_movedown_size3:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_movedown_size3.png"),
      button_movedown_size3_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_movedown_size3_over.png"),
      button_moveup_size3:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_moveup_size3.png"),
      button_moveup_size3_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_moveup_size3_over.png"),
      button_remove_size2:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_remove_size2.png"),
      button_remove_size2_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_remove_size2_over.png"),
      button_remove_size3:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_remove_size2.png"),
      button_remove_size3_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_remove_size2_over.png"),
      button_settings:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_settings.png"),
      button_settings_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_settings_selected.png"),
      button_update:
        this.scriptPath + encodeURI("/clonerspluseffectors/button_update.png"),
      button_update_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/button_update_selected.png"),
      channels_anchor:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_anchor.png"),
      channels_anchor_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_anchor_over.png"),
      channels_anchor_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_anchor_selected.png"),
      channels_color:
        this.scriptPath + encodeURI("/clonerspluseffectors/channels_color.png"),
      channels_color_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_color_over.png"),
      channels_color_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_color_selected.png"),
      channels_opacity:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_opacity.png"),
      channels_opacity_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_opacity_over.png"),
      channels_opacity_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_opacity_selected.png"),
      channels_orientation:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_orientation.png"),
      channels_orientation_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_orientation_over.png"),
      channels_orientation_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_orientation_selected.png"),
      channels_position:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_position.png"),
      channels_position_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_position_over.png"),
      channels_position_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_position_selected.png"),
      channels_rotation:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_rotation.png"),
      channels_rotation_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_rotation_over.png"),
      channels_rotation_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_rotation_selected.png"),
      channels_scale:
        this.scriptPath + encodeURI("/clonerspluseffectors/channels_scale.png"),
      channels_scale_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_scale_over.png"),
      channels_scale_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_scale_selected.png"),
      channels_time:
        this.scriptPath + encodeURI("/clonerspluseffectors/channels_time.png"),
      channels_time_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_time_over.png"),
      channels_time_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/channels_time_selected.png"),
      layerprop_3d:
        this.scriptPath + encodeURI("/clonerspluseffectors/layerprop_3d.png"),
      layerprop_3d_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_3d_over.png"),
      layerprop_3d_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_3d_selected.png"),
      layerprop_motionblur:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_motionblur.png"),
      layerprop_motionblur_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_motionblur_over.png"),
      layerprop_motionblur_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_motionblur_selected.png"),
      layerprop_visibility:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_visibility.png"),
      layerprop_visibility_over:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_visibility_over.png"),
      layerprop_visibility_selected:
        this.scriptPath +
        encodeURI("/clonerspluseffectors/layerprop_visibility_selected.png"),
    };
    this.noCompErr = "Please select a composition";
    this.noLayersErr = "Please select one or more layers";
    this.noPropErr = "Please select one property";
    this.noPathErr = "Please select a path";
    this.propExistErr = "Property can only be added once";
    this.noClonerExcist = "Please create a cloner first";
    this.noClonerSelected = "Please select a cloner controller";
    this.activeCloners = null;
    this.selectedCloner = null;
    this.init = function () {
      createData = {};
      createData.type = "Linear";
      createData.visibility = true;
      createData.motionBlur = true;
      createData.threeDLayer = false;
      createData.cycle = "Iterate";
      createData.seed = 100;
      createData.count = 5;
      createData.countX = 3;
      createData.countY = 3;
      createData.countZ = 1;
      createData.baked = false;
      createEffectorData = {};
      createEffectorData.type = "Plain";
      createEffectorData.falloff = "No Falloff";
      createEffectorData.curve = "Linear";
      createEffectorData.outside = true;
      createEffectorData.inside = true;
      createEffectorData.position = false;
      createEffectorData.rotation = false;
      createEffectorData.orientation = false;
      createEffectorData.scale = false;
      createEffectorData.anchor = false;
      createEffectorData.opacity = false;
      createEffectorData.color = false;
      createEffectorData.time = false;
      createEffectorData.customProperties = [];
      aeCloner = this;
      utils = new Utils(aeCloner);
      uiBuilder = new UIBuilder(aeCloner);
      expressions = new Expressions(aeCloner);
      effectorFactory = new EffectorFactory(aeCloner);
      uiBuilder.buildUI(basePanel, createData);
    };
    this.getClonersInComp = function () {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var layers = comp.layers;
        var cloners = [];
        var newIndex = 0;
        for (var i = 0; i < comp.numLayers; i += 1) {
          var layer = layers[i + 1];
          var layerName = layer.name;
          if (
            layer("ADBE Effect Parade") &&
            layer("ADBE Effect Parade").aecdata
          ) {
            var expressionString = String(
              layer("ADBE Effect Parade").aecdata(1).expression,
            );
            var layerData = eval(
              expressionString.substring(
                expressionString.indexOf("["),
                expressionString.lastIndexOf("]") + 1,
              ),
            );
            var clonerIndex = layerData[0];
            var layerType = layerData[1];
            if (!cloners[clonerIndex]) {
              cloners[clonerIndex] = {};
              cloners[clonerIndex].index = clonerIndex;
              cloners[clonerIndex].sourceLayers = [];
              cloners[clonerIndex].layers = [];
              cloners[clonerIndex].effectors = [];
            }
            switch (layerType) {
              case "controller":
                cloners[clonerIndex].name = layer.name;
                cloners[clonerIndex].controller = layer;
                cloners[clonerIndex].data =
                  aeCloner.setDataFromExpression(layerData);
                break;
              case "source":
                cloners[clonerIndex].sourceLayers.push(layer);
                break;
              case "effector":
                if (!cloners[clonerIndex].effectors[Number(layerData[2])]) {
                  cloners[clonerIndex].effectors[Number(layerData[2])] = {};
                }
                cloners[clonerIndex].effectors[Number(layerData[2])].name =
                  layer.name;
                cloners[clonerIndex].effectors[Number(layerData[2])].layer =
                  layer;
                cloners[clonerIndex].effectors[Number(layerData[2])].data =
                  this.setEffectorDataFromExpression(layerData);
                break;
              case "random":
                if (!cloners[clonerIndex].effectors[Number(layerData[2])]) {
                  cloners[clonerIndex].effectors[Number(layerData[2])] = {};
                }
                cloners[clonerIndex].effectors[
                  Number(layerData[2])
                ].randomLayer = layer;
                break;
              default:
                cloners[clonerIndex].layers[Number(layerType)] = layer;
                break;
            }
          }
        }
        var ignoreClonersAt = [];
        for (var p = 0; p < cloners.length; p += 1) {
          if (!cloners[p].controller) {
            ignoreClonersAt.push(p);
          } else {
            var effectorsCompressed = [];
            for (var g = 0; g < cloners[p].effectors.length; g += 1) {
              if (cloners[p].effectors[g] != undefined) {
                effectorsCompressed.push(cloners[p].effectors[g]);
              }
            }
            cloners[p].effectors = effectorsCompressed;
          }
        }
        for (var i = ignoreClonersAt.length - 1; i >= 0; i--) {
          cloners.splice(i, 1);
        }
        return cloners;
      } catch (err) {}
    };
    this.setupExpressions = function (data) {
      var expr = {};
      switch (data.type) {
        case "Linear":
          expr.position = expressions.linearPosition;
          break;
        case "Grid":
          expr.position = expressions.gridPosition;
          break;
        case "Radial":
          expr.position = expressions.radialPosition;
          expr.orientation = expressions.radialOrientation;
          expr.rotation = expressions.radialRotation;
          expr.random = expressions.random;
          break;
        case "Path":
          expr.position = expressions.pathPosition;
          expr.orientation = expressions.pathOrientation;
          expr.rotation = expressions.pathRotation;
          expr.random = expressions.random;
          break;
        case "Path Points":
          expr.position = expressions.pathPointsPosition;
          expr.orientation = expressions.pathPointsOrientation;
          expr.rotation = expressions.pathPointsRotation;
          break;
        case "Cluster":
          expr.position = expressions.clusterPosition;
          break;
      }
      return expr;
    };
    this.getPreset = function (data) {
      switch (data.type) {
        case "Linear":
          preset = "aecloner_linear";
          break;
        case "Grid":
          preset = "aecloner_grid";
          break;
        case "Radial":
          preset = "aecloner_radial";
          break;
        case "Path":
          preset = "aecloner_path";
          break;
        case "Path Points":
          preset = "aecloner_path_points";
          break;
        case "Cluster":
          preset = "aecloner_cluster";
          break;
      }
      return this.presetNameToFile(preset);
    };
    this.presetNameToFile = function (fileName) {
      return File(
        this.scriptPath + "/clonerspluseffectors/" + fileName + ".ffx",
      );
    };
    this.createDataExpression = function (index, data) {
      return (
        "//[\'" +
        index +
        "\', \'controller\', \'" +
        data.type +
        "\', \'" +
        data.visibility +
        "\', \'" +
        data.motionBlur +
        "\', \'" +
        data.threeDLayer +
        "\', \'" +
        data.cycle +
        "\', \'" +
        data.seed +
        "\', \'" +
        data.count +
        "\', \'" +
        data.countX +
        "\', \'" +
        data.countY +
        "\', \'" +
        data.countZ +
        "\', \'" +
        data.baked +
        "\']\n\t\t\t0;"
      );
    };
    this.createEffectorDataExpression = function (
      clonerIndex,
      effectorIndex,
      data,
    ) {
      var customProperties = "[";
      for (var i = 0; i < data.customProperties.length; i += 1) {
        if (i != 0) {
          customProperties += ",";
        }
        customProperties +=
          "{type:\'" +
          data.customProperties[i].type +
          "\',path:\'" +
          data.customProperties[i].path +
          "\',name:\'" +
          data.customProperties[i].name +
          "\'}";
      }
      customProperties += "]";
      return (
        "//[\'" +
        clonerIndex +
        "\', \'effector\', \'" +
        effectorIndex +
        "\', \'" +
        data.type +
        "\', \'" +
        data.falloff +
        "\', \'" +
        data.curve +
        "\', \'" +
        data.outside +
        "\', \'" +
        data.inside +
        "\', \'" +
        data.position +
        "\', \'" +
        data.rotation +
        "\', \'" +
        data.orientation +
        "\', \'" +
        data.scale +
        "\', \'" +
        data.anchor +
        "\', \'" +
        data.opacity +
        "\', \'" +
        data.color +
        "\', \'" +
        data.time +
        "\', " +
        customProperties +
        "]\n\t\t\t0;"
      );
    };
    this.setDataFromExpression = function (clonerData) {
      var data = {};
      data.type = clonerData[2];
      data.visibility = clonerData[3] == "true" ? true : false;
      data.motionBlur = clonerData[4] == "true" ? true : false;
      data.threeDLayer = clonerData[5] == "true" ? true : false;
      data.cycle = clonerData[6];
      data.seed = Number(clonerData[7]);
      data.count = Number(clonerData[8]);
      data.countX = Number(clonerData[9]);
      data.countY = Number(clonerData[10]);
      data.countZ = Number(clonerData[11]);
      data.baked = clonerData[12] == "true" ? true : false;
      return data;
    };
    this.setEffectorDataFromExpression = function (effectorData) {
      var data = {};
      data.clonerIndex = effectorData[0];
      data.index = effectorData[2];
      data.type = effectorData[3];
      data.falloff = effectorData[4];
      data.curve = effectorData[5];
      data.outside = effectorData[6] == "true" ? true : false;
      data.inside = effectorData[7] == "true" ? true : false;
      data.position = effectorData[8] == "true" ? true : false;
      data.rotation = effectorData[9] == "true" ? true : false;
      data.orientation = effectorData[10] == "true" ? true : false;
      data.scale = effectorData[11] == "true" ? true : false;
      data.anchor = effectorData[12] == "true" ? true : false;
      data.opacity = effectorData[13] == "true" ? true : false;
      data.color = effectorData[14] == "true" ? true : false;
      data.time = effectorData[15] == "true" ? true : false;
      data.customProperties = effectorData[16];
      return data;
    };
    this.createClone = function (
      data,
      clonerIndex,
      sourceIndex,
      i,
      controller,
      selectedLayers,
      randomLayer,
    ) {
      sourceLayer = selectedLayers[sourceIndex];
      if (sourceLayer("ADBE Effect Parade").aecdata) {
        var expressionString = String(
          sourceLayer("ADBE Effect Parade").aecdata(1).expression,
        );
        sourceLayerName = eval(
          expressionString.substring(
            expressionString.indexOf("["),
            expressionString.lastIndexOf("]") + 1,
          ),
        )[2];
      } else {
        sourceLayerName = sourceLayer.name;
      }
      var l = sourceLayer.duplicate();
      l.name = sourceLayerName + "_clone" + i + 1;
      l.parent = controller;
      l.shy = true;
      l.motionBlur = data.motionBlur;
      if (l.threeDLayer != data.threeDLayer) {
        l.threeDLayer = data.threeDLayer;
      }
      l.enabled = true;
      var sourcePosition = l("ADBE Effect Parade").addProperty(
        "ADBE Point3D Control",
      );
      sourcePosition.name = "sourcePosition";
      sourcePosition(1).setValue([
        sourceLayer("ADBE Transform Group")("ADBE Position").value[0] -
          controller("ADBE Transform Group")("ADBE Position").value[0],
        sourceLayer("ADBE Transform Group")("ADBE Position").value[1] -
          controller("ADBE Transform Group")("ADBE Position").value[1],
        sourceLayer("ADBE Transform Group")("ADBE Position").value.length == 3
          ? sourceLayer("ADBE Transform Group")("ADBE Position").value[2] -
            controller("ADBE Transform Group")("ADBE Position").value[2]
          : 0,
      ]);
      var basePosition = l("ADBE Effect Parade").addProperty(
        "ADBE Point3D Control",
      );
      basePosition.name = "basePosition";
      basePosition(1).setValue([0, 0, 0]);
      var randomSlider = l("ADBE Effect Parade").addProperty(
        "ADBE Slider Control",
      );
      randomSlider.name = "random";
      randomSlider(1).expression = "0;";
      this.addExpressionsToLayer(l, controller, data, i, []);
      return l;
    };
    this.addExpressionsToLayer = function (l, controller, data, i, effectors) {
      var expr = this.setupExpressions(data);
      var scaleUsed = false;
      var rotationUsed = false;
      var orientationUsed = false;
      var anchorUsed = false;
      var opacityUsed = false;
      var timeUsed = false;
      var positionExpression =
        expr.position(controller.name, data, i) + expressions.addZero3d();
      var scaleExpression = expressions.addOne();
      var rotationExpression = expressions.addZero1d();
      var rotationXExpression = expressions.addZero1d();
      var rotationYExpression = expressions.addZero1d();
      var orientationExpression = expressions.addZero3d();
      var anchorExpression = expressions.addZero3d();
      var opacityExpression =
        data.type == "Path"
          ? expressions.opacityPathCloner(controller.name, data, i)
          : expressions.addZero1d();
      var timeExpression = expressions.addZeroTime();
      var customExpressions = {};
      if (data.type == "Path") {
        opacityUsed = true;
      }
      for (var k = 0; k < effectors.length; k += 1) {
        var effector = effectors[k];
        for (var h = 0; h < effector.data.customProperties.length; h += 1) {
          switch (effector.data.customProperties[h].type) {
            case "1d":
              zero = expressions.addZero1d();
              break;
            case "2d":
              zero = expressions.addZero2d();
              break;
            case "3d":
              zero = expressions.addZero3d();
              break;
            case "color":
              zero = expressions.addZeroColor();
              break;
          }
          customExpressions[effector.data.customProperties[h].path] = {};
          customExpressions[effector.data.customProperties[h].path].expression =
            zero;
          customExpressions[effector.data.customProperties[h].path].path =
            effector.data.customProperties[h].path;
          customExpressions[effector.data.customProperties[h].path].name =
            effector.data.customProperties[h].name;
        }
      }
      var len = l("ADBE Effect Parade").numProperties;
      for (var g = len - 1; g >= 0; g--) {
        var effect = l("ADBE Effect Parade").property(g + 1);
        var effectName = effect.name;
        if (
          effectName.substr(effectName.length - 5, 5) == "Power" ||
          effectName.substr(effectName.length - 14, 14) == "RandomPosition" ||
          effectName.substr(0, 4) == "tint"
        ) {
          effect.remove();
        }
      }
      for (var k = 0; k < effectors.length; k += 1) {
        var effector = effectors[k];
        var effectorExpression =
          expr.position(controller.name, data, i) + expressions.addZero3d();
        var effectorExpressionTintPower =
          expr.position(controller.name, data, i) + expressions.addZero3d();
        var colorUsed = false;
        switch (effector.data.type) {
          case "Plain":
            effectorFuncExpression = expressions.plainEffector;
            positionEffectorExpression = expressions.positionEffectorPlain;
            rotationXEffectorExpression = expressions.rotationXEffectorPlain;
            rotationYEffectorExpression = expressions.rotationYEffectorPlain;
            rotationEffectorExpression = expressions.rotationEffectorPlain;
            orientationEffectorExpression =
              expressions.orientationEffectorPlain;
            scaleEffectorExpression = expressions.scaleEffectorPlain;
            anchorEffectorExpression = expressions.anchorEffectorPlain;
            opacityEffectorExpression = expressions.opacityEffectorPlain;
            colorEffectorExpression = expressions.colorEffectorPlain;
            colorTintEffectorExpression = expressions.colorTintEffectorPlain;
            timeEffectorExpression = expressions.timeEffectorPlain;
            custom1DEffectorExpression = expressions.customEffector1dPlain;
            custom2DEffectorExpression = expressions.customEffector2dPlain;
            custom3DEffectorExpression = expressions.customEffector3dPlain;
            customColorEffectorExpression =
              expressions.customEffectorColorPlain;
            break;
          case "Step":
            effectorFuncExpression = expressions.stepEffector;
            positionEffectorExpression = expressions.positionEffectorPlain;
            rotationXEffectorExpression = expressions.rotationXEffectorPlain;
            rotationYEffectorExpression = expressions.rotationYEffectorPlain;
            rotationEffectorExpression = expressions.rotationEffectorPlain;
            orientationEffectorExpression =
              expressions.orientationEffectorPlain;
            scaleEffectorExpression = expressions.scaleEffectorPlain;
            anchorEffectorExpression = expressions.anchorEffectorPlain;
            opacityEffectorExpression = expressions.opacityEffectorPlain;
            colorEffectorExpression = expressions.colorEffectorPlain;
            colorTintEffectorExpression = expressions.colorTintEffectorPlain;
            timeEffectorExpression = expressions.timeEffectorPlain;
            custom1DEffectorExpression = expressions.customEffector1dPlain;
            custom2DEffectorExpression = expressions.customEffector2dPlain;
            custom3DEffectorExpression = expressions.customEffector3dPlain;
            customColorEffectorExpression =
              expressions.customEffectorColorPlain;
            break;
          case "Random":
            effectorFuncExpression = expressions.randomEffector;
            positionEffectorExpression = expressions.positionEffectorRandom;
            rotationXEffectorExpression = expressions.rotationXEffectorRandom;
            rotationYEffectorExpression = expressions.rotationYEffectorRandom;
            rotationEffectorExpression = expressions.rotationEffectorRandom;
            orientationEffectorExpression =
              expressions.orientationEffectorRandom;
            scaleEffectorExpression = expressions.scaleEffectorRandom;
            anchorEffectorExpression = expressions.anchorEffectorRandom;
            opacityEffectorExpression = expressions.opacityEffectorRandom;
            colorEffectorExpression = expressions.colorEffectorRandom;
            colorTintEffectorExpression = expressions.colorTintEffectorRandom;
            timeEffectorExpression = expressions.timeEffectorRandom;
            custom1DEffectorExpression = expressions.customEffector1dRandom;
            custom2DEffectorExpression = expressions.customEffector2dRandom;
            custom3DEffectorExpression = expressions.customEffector3dRandom;
            customColorEffectorExpression =
              expressions.customEffectorColorRandom;
            break;
          case "Layer":
            effectorFuncExpression = expressions.layerEffector;
            effectorFuncExpressionTintPower =
              expressions.layerEffectorTintPower;
            positionEffectorExpression = expressions.positionEffectorPlain;
            rotationXEffectorExpression = expressions.rotationXEffectorPlain;
            rotationYEffectorExpression = expressions.rotationYEffectorPlain;
            rotationEffectorExpression = expressions.rotationEffectorPlain;
            orientationEffectorExpression =
              expressions.orientationEffectorPlain;
            scaleEffectorExpression = expressions.scaleEffectorPlain;
            anchorEffectorExpression = expressions.anchorEffectorPlain;
            opacityEffectorExpression = expressions.opacityEffectorPlain;
            colorEffectorExpression = expressions.colorEffectorLayer;
            colorTintEffectorExpression = expressions.colorTintEffectorLayer;
            timeEffectorExpression = expressions.timeEffectorLayer;
            custom1DEffectorExpression = expressions.customEffector1dPlain;
            custom2DEffectorExpression = expressions.customEffector2dPlain;
            custom3DEffectorExpression = expressions.customEffector3dPlain;
            customColorEffectorExpression =
              expressions.customEffectorColorPlain;
            break;
          case "Pulse":
            effectorFuncExpression = expressions.pulseEffector;
            positionEffectorExpression = expressions.positionEffectorPulse;
            rotationXEffectorExpression = expressions.rotationXEffectorPulse;
            rotationYEffectorExpression = expressions.rotationYEffectorPulse;
            rotationEffectorExpression = expressions.rotationEffectorPulse;
            orientationEffectorExpression =
              expressions.orientationEffectorPulse;
            scaleEffectorExpression = expressions.scaleEffectorPulse;
            anchorEffectorExpression = expressions.anchorEffectorPulse;
            opacityEffectorExpression = expressions.opacityEffectorPulse;
            colorEffectorExpression = expressions.colorEffectorPulse;
            colorTintEffectorExpression = expressions.colorTintEffectorPulse;
            timeEffectorExpression = expressions.timeEffectorPulse;
            custom1DEffectorExpression = expressions.customEffector1dPulse;
            custom2DEffectorExpression = expressions.customEffector2dPulse;
            custom3DEffectorExpression = expressions.customEffector3dPulse;
            customColorEffectorExpression =
              expressions.customEffectorColorPulse;
            break;
          case "Wiggle":
            effectorFuncExpression = expressions.wiggleEffector;
            positionEffectorExpression = expressions.positionEffectorWiggle;
            rotationXEffectorExpression = expressions.rotationXEffectorWiggle;
            rotationYEffectorExpression = expressions.rotationYEffectorWiggle;
            rotationEffectorExpression = expressions.rotationEffectorWiggle;
            orientationEffectorExpression =
              expressions.orientationEffectorWiggle;
            scaleEffectorExpression = expressions.scaleEffectorWiggle;
            anchorEffectorExpression = expressions.anchorEffectorWiggle;
            opacityEffectorExpression = expressions.opacityEffectorWiggle;
            colorEffectorExpression = expressions.colorEffectorWiggle;
            colorTintEffectorExpression = expressions.colorTintEffectorWiggle;
            timeEffectorExpression = expressions.timeEffectorWiggle;
            custom1DEffectorExpression = expressions.customEffector1dWiggle;
            custom2DEffectorExpression = expressions.customEffector2dWiggle;
            custom3DEffectorExpression = expressions.customEffector3dWiggle;
            customColorEffectorExpression =
              expressions.customEffectorColorRandom;
            break;
          case "Noise":
            effectorFuncExpression = expressions.noiseEffector;
            positionEffectorExpression = expressions.positionEffectorNoise;
            rotationXEffectorExpression = expressions.rotationXEffectorNoise;
            rotationYEffectorExpression = expressions.rotationYEffectorNoise;
            rotationEffectorExpression = expressions.rotationEffectorNoise;
            orientationEffectorExpression =
              expressions.orientationEffectorNoise;
            scaleEffectorExpression = expressions.scaleEffectorNoise;
            anchorEffectorExpression = expressions.anchorEffectorNoise;
            opacityEffectorExpression = expressions.opacityEffectorNoise;
            colorEffectorExpression = expressions.colorEffectorNoise;
            colorTintEffectorExpression = expressions.colorTintEffectorNoise;
            timeEffectorExpression = expressions.timeEffectorNoise;
            custom1DEffectorExpression = expressions.customEffector1dNoise;
            custom2DEffectorExpression = expressions.customEffector2dNoise;
            custom3DEffectorExpression = expressions.customEffector3dNoise;
            customColorEffectorExpression =
              expressions.customEffectorColorNoise;
            break;
          case "Path":
            effectorFuncExpression = expressions.pathEffector;
            positionEffectorExpression = expressions.positionEffectorPlain;
            rotationXEffectorExpression = expressions.rotationXEffectorPlain;
            rotationYEffectorExpression = expressions.rotationYEffectorPlain;
            rotationEffectorExpression = expressions.rotationEffectorPlain;
            orientationEffectorExpression =
              expressions.orientationEffectorPlain;
            scaleEffectorExpression = expressions.scaleEffectorPlain;
            anchorEffectorExpression = expressions.anchorEffectorPlain;
            opacityEffectorExpression = expressions.opacityEffectorPlain;
            colorEffectorExpression = expressions.colorEffectorPlain;
            colorTintEffectorExpression = expressions.colorTintEffectorPlain;
            timeEffectorExpression = expressions.timeEffectorPlain;
            custom1DEffectorExpression = expressions.customEffector1dPlain;
            custom2DEffectorExpression = expressions.customEffector2dPlain;
            custom3DEffectorExpression = expressions.customEffector3dPlain;
            customColorEffectorExpression =
              expressions.customEffectorColorPlain;
            break;
          case "Path Ends":
            effectorFuncExpression = expressions.pathEndsEffector;
            positionEffectorExpression = expressions.positionEffectorPlain;
            rotationXEffectorExpression = expressions.rotationXEffectorPlain;
            rotationYEffectorExpression = expressions.rotationYEffectorPlain;
            rotationEffectorExpression = expressions.rotationEffectorPlain;
            orientationEffectorExpression =
              expressions.orientationEffectorPlain;
            scaleEffectorExpression = expressions.scaleEffectorPlain;
            anchorEffectorExpression = expressions.anchorEffectorPlain;
            opacityEffectorExpression = expressions.opacityEffectorPlain;
            colorEffectorExpression = expressions.colorEffectorPlain;
            colorTintEffectorExpression = expressions.colorTintEffectorPlain;
            timeEffectorExpression = expressions.timeEffectorPlain;
            custom1DEffectorExpression = expressions.customEffector1dPlain;
            custom2DEffectorExpression = expressions.customEffector2dPlain;
            custom3DEffectorExpression = expressions.customEffector3dPlain;
            customColorEffectorExpression =
              expressions.customEffectorColorPlain;
            break;
        }
        if (effector.data.scale) {
          scaleUsed = true;
        }
        if (effector.data.rotation) {
          rotationUsed = true;
        }
        if (effector.data.orientation) {
          orientationUsed = true;
        }
        if (effector.data.anchor) {
          anchorUsed = true;
        }
        if (effector.data.opacity) {
          opacityUsed = true;
        }
        if (effector.data.color) {
          colorUsed = true;
        }
        if (effector.data.time) {
          timeUsed = true;
        }
        effectorSlider = l("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        effectorSlider.name = effector.name + "Power";
        for (var e = 0; e < effectors.length - (effectors.length - k); e += 1) {
          var lastEffector = effectors[e];
          switch (lastEffector.data.type) {
            case "Plain":
              lastPositionEffectorExpression =
                expressions.positionEffectorPlain;
              break;
            case "Step":
              lastPositionEffectorExpression =
                expressions.positionEffectorPlain;
              break;
            case "Random":
              lastPositionEffectorExpression =
                expressions.positionEffectorRandom;
              break;
            case "Layer":
              lastPositionEffectorExpression =
                expressions.positionEffectorPlain;
              break;
            case "Pulse":
              lastPositionEffectorExpression =
                expressions.positionEffectorPulse;
              break;
            case "Wiggle":
              lastPositionEffectorExpression =
                expressions.positionEffectorWiggle;
              break;
            case "Noise":
              lastPositionEffectorExpression =
                expressions.positionEffectorNoise;
              break;
            case "Path":
              lastPositionEffectorExpression = expressions.positionEffectorPath;
              break;
            case "Path Points":
              lastPositionEffectorExpression =
                expressions.positionEffectorPathEnds;
              break;
          }
          if (lastEffector.data.position) {
            effectorExpression += lastPositionEffectorExpression(
              e,
              lastEffector.name,
              lastEffector.data.type,
              lastEffector.randomLayer,
              i,
              controller.name,
            );
          }
        }
        switch (effector.data.falloff) {
          case "No Falloff":
            falloffExpression = expressions.noFalloff;
            break;
          case "Linear":
            falloffExpression = expressions.linearFalloff;
            break;
          case "Radial":
            falloffExpression = expressions.radialFalloff;
            break;
          case "Spherical":
            falloffExpression = expressions.sphericalFalloff;
            break;
        }
        l("ADBE Effect Parade").basePosition(1).expression =
          positionExpression + effectorExpression + expressions.position();
        effectorExpression += falloffExpression(
          controller.name,
          effector.name,
          effector.data.type,
          effector.data.curve,
          effector.data.inside,
          effector.data.outside,
        );
        var effectorExpressionBeforeEffector = effectorExpression;
        effectorExpression += effectorFuncExpression(
          controller.name,
          effector.name,
          effector.data.type,
        );
        if (effectorFuncExpressionTintPower) {
          effectorExpressionTintPower += falloffExpression(
            controller.name,
            effector.name,
            effector.data.type,
            effector.data.curve,
            effector.data.inside,
            effector.data.outside,
          );
          effectorExpressionTintPower += effectorFuncExpressionTintPower(
            controller.name,
            effector.name,
            effector.data.type,
          );
        }
        switch (effector.data.type) {
          case "Random":
            randomLayer1DExpression = expressions.randomLayer1D;
            randomLayer3DExpression = expressions.randomLayer3D;
            break;
          case "Wiggle":
            randomLayer1DExpression = expressions.wiggleLayer1D;
            randomLayer3DExpression = expressions.wiggleLayer3D;
            break;
          case "Noise":
            randomLayer1DExpression = expressions.randomLayer1D;
            randomLayer3DExpression = expressions.randomLayer3D;
            break;
        }
        var randomLayer = effector.randomLayer;
        if (
          effector.data.type == "Random" ||
          effector.data.type == "Wiggle" ||
          effector.data.type == "Noise"
        ) {
          if (!randomLayer("ADBE Effect Parade")(i + "_position")) {
            var randomPosition = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Point3D Control",
            );
            randomPosition.name = i + "_position";
            randomPosition(1).setValue([0, 0, 0]);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_rotation")) {
            var randomRotation = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Point3D Control",
            );
            randomRotation.name = i + "_rotation";
            randomRotation(1).setValue([0, 0, 0]);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_orientation")) {
            var randomOrientation = randomLayer(
              "ADBE Effect Parade",
            ).addProperty("ADBE Point3D Control");
            randomOrientation.name = i + "_orientation";
            randomOrientation(1).setValue([0, 0, 0]);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_scale")) {
            var randomScale = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Point3D Control",
            );
            randomScale.name = i + "_scale";
            randomScale(1).setValue([0, 0, 0]);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_anchor")) {
            var randomAnchor = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Point3D Control",
            );
            randomAnchor.name = i + "_anchor";
            randomAnchor(1).setValue([0, 0, 0]);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_opacity")) {
            var randomOpacity = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Slider Control",
            );
            randomOpacity.name = i + "_opacity";
            randomOpacity(1).setValue(0);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_color")) {
            var randomColor = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Point3D Control",
            );
            randomColor.name = i + "_color";
            randomColor(1).setValue([0, 0, 0]);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_colortint")) {
            var randomColorTint = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Slider Control",
            );
            randomColorTint.name = i + "_colortint";
            randomColorTint(1).setValue(0);
          }
          if (!randomLayer("ADBE Effect Parade")(i + "_time")) {
            var randomTime = randomLayer("ADBE Effect Parade").addProperty(
              "ADBE Point3D Control",
            );
            randomTime.name = i + "_time";
            randomTime(1).setValue([0, 0, 0]);
          }
          randomLayer("ADBE Effect Parade")(i + "_position")(1).expression =
            randomLayer3DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_rotation")(1).expression =
            randomLayer3DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_orientation")(1).expression =
            randomLayer3DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_scale")(1).expression =
            randomLayer3DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_anchor")(1).expression =
            randomLayer3DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_opacity")(1).expression =
            randomLayer1DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_color")(1).expression =
            randomLayer3DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_colortint")(1).expression =
            randomLayer1DExpression(effector.name, effector.data.type);
          randomLayer("ADBE Effect Parade")(i + "_time")(1).expression =
            randomLayer3DExpression(effector.name, effector.data.type);
        }
        effectorSlider = l("ADBE Effect Parade")(effector.name + "Power");
        effectorSlider(1).expression = effectorExpression;
        if (effector.data.position) {
          positionExpression += positionEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.scale) {
          scaleExpression += scaleEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.rotation) {
          rotationXExpression += rotationXEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.rotation) {
          rotationYExpression += rotationYEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.rotation) {
          rotationExpression += rotationEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.orientation) {
          orientationExpression += orientationEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.anchor) {
          anchorExpression += anchorEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.opacity) {
          opacityExpression += opacityEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (effector.data.time) {
          timeExpression += timeEffectorExpression(
            k,
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        }
        if (l("ADBE Effect Parade")(effector.name + "TintPower")) {
          l("ADBE Effect Parade")(effector.name + "TintPower").remove();
        }
        if (colorUsed && !l("ADBE Effect Parade")("tint" + k)) {
          var tint = l("ADBE Effect Parade").addProperty("ADBE Tint");
          tint.name = "tint" + k;
          if (effector.data.type == "Layer") {
            var tintPowerSlider = l("ADBE Effect Parade").addProperty(
              "ADBE Slider Control",
            );
            tintPowerSlider.name = effector.name + "TintPower";
            tintPowerSlider(1).expression = effectorExpressionTintPower;
            tint = l("ADBE Effect Parade")("tint" + k);
            tint(1).expression =
              effectorExpressionBeforeEffector +
              colorEffectorExpression(
                controller.name,
                effector.name,
                effector.data.type,
              );
            tint(2).expression = expressions.colorMapWhiteTo("tint" + k);
          } else {
            tint(1).expression = colorEffectorExpression(
              controller.name,
              effector.name,
              effector.data.type,
              randomLayer,
              i,
              controller.name,
            );
            tint(2).expression = expressions.colorMapWhiteTo("tint" + k);
          }
          tint(3).expression = colorTintEffectorExpression(
            effector.name,
            effector.data.type,
            randomLayer,
            i,
            controller.name,
          );
        } else {
          if (!colorUsed && l("ADBE Effect Parade")("tint" + k)) {
            l("ADBE Effect Parade")("tint" + k).remove();
          }
        }
        for (var h = 0; h < effector.data.customProperties.length; h += 1) {
          switch (effector.data.customProperties[h].type) {
            case "1d":
              if (
                effector.data.type == "Random" ||
                effector.data.type == "Wiggle" ||
                effector.data.type == "Noise"
              ) {
                if (
                  !randomLayer("ADBE Effect Parade")(
                    i + "_custom_" + k + "_" + h,
                  )
                ) {
                  var randomCustom = randomLayer(
                    "ADBE Effect Parade",
                  ).addProperty("ADBE Slider Control");
                  randomCustom.name = i + "_custom_" + k + "_" + h;
                }
                randomLayer("ADBE Effect Parade")(i + "_custom_" + k + "_" + h)(
                  1,
                ).expression = randomLayer1DExpression(
                  effector.name,
                  effector.data.type,
                );
              }
              customEffector = custom1DEffectorExpression(
                k,
                effector.name,
                effector.data.customProperties[h].name,
                effector.data.type,
                randomLayer,
                i + "_custom_" + k + "_" + h,
                i,
                controller.name,
              );
              break;
            case "2d":
              if (
                effector.data.type == "Random" ||
                effector.data.type == "Wiggle" ||
                effector.data.type == "Noise"
              ) {
                if (
                  !randomLayer("ADBE Effect Parade")(
                    i + "_custom_" + k + "_" + h,
                  )
                ) {
                  var randomCustom = randomLayer(
                    "ADBE Effect Parade",
                  ).addProperty("ADBE Point3D Control");
                  randomCustom.name = i + "_custom_" + k + "_" + h;
                  randomCustom(1).setValue([0, 0, 0]);
                }
                randomLayer("ADBE Effect Parade")(i + "_custom_" + k + "_" + h)(
                  1,
                ).expression = randomLayer3DExpression(
                  effector.name,
                  effector.data.type,
                );
              }
              customEffector = custom2DEffectorExpression(
                k,
                effector.name,
                effector.data.customProperties[h].name,
                effector.data.type,
                randomLayer,
                i + "_custom_" + k + "_" + h,
                i,
                controller.name,
              );
              break;
            case "3d":
              if (
                effector.data.type == "Random" ||
                effector.data.type == "Wiggle" ||
                effector.data.type == "Noise"
              ) {
                if (
                  !randomLayer("ADBE Effect Parade")(
                    i + "_custom_" + k + "_" + h,
                  )
                ) {
                  var randomCustom = randomLayer(
                    "ADBE Effect Parade",
                  ).addProperty("ADBE Point3D Control");
                  randomCustom.name = i + "_custom_" + k + "_" + h;
                  randomCustom(1).setValue([0, 0, 0]);
                }
                randomLayer("ADBE Effect Parade")(i + "_custom_" + k + "_" + h)(
                  1,
                ).expression = randomLayer3DExpression(
                  effector.name,
                  effector.data.type,
                );
              }
              customEffector = custom3DEffectorExpression(
                k,
                effector.name,
                effector.data.customProperties[h].name,
                effector.data.type,
                randomLayer,
                i + "_custom_" + k + "_" + h,
                i,
                controller.name,
              );
              break;
            case "color":
              if (
                effector.data.type == "Random" ||
                effector.data.type == "Wiggle" ||
                effector.data.type == "Noise"
              ) {
                if (
                  !randomLayer("ADBE Effect Parade")(
                    i + "_custom_" + k + "_" + h,
                  )
                ) {
                  var randomCustom = randomLayer(
                    "ADBE Effect Parade",
                  ).addProperty("ADBE Point3D Control");
                  randomCustom.name = i + "_custom_" + k + "_" + h;
                  randomCustom(1).setValue([0, 0, 0]);
                }
                randomLayer("ADBE Effect Parade")(i + "_custom_" + k + "_" + h)(
                  1,
                ).expression = randomLayer3DExpression(
                  effector.name,
                  effector.data.type,
                );
              }
              customEffector = customColorEffectorExpression(
                k,
                effector.name,
                effector.data.customProperties[h].name,
                effector.data.type,
                randomLayer,
                i + "_custom_" + k + "_" + h,
                i,
                controller.name,
              );
              break;
          }
          customExpressions[
            effector.data.customProperties[h].path
          ].expression += customEffector;
        }
      }
      positionExpression += expressions.position();
      rotationXExpression += expressions.rotationX();
      rotationYExpression += expressions.rotationY();
      scaleExpression += expressions.scale();
      anchorExpression += expressions.anchor();
      opacityExpression += expressions.opacity();
      timeExpression += expressions.time();
      for (var k = 0; k < effectors.length; k += 1) {
        var effector = effectors[k];
        for (var h = 0; h < effector.data.customProperties.length; h += 1) {
          switch (effector.data.customProperties[h].type) {
            case "1d":
              finalCustom = expressions.custom1d();
              break;
            case "2d":
              finalCustom = expressions.custom2d();
              break;
            case "3d":
              finalCustom = expressions.custom3d();
              break;
            case "color":
              finalCustom = expressions.customColor();
              break;
          }
          customExpressions[
            effector.data.customProperties[h].path
          ].expression += finalCustom;
        }
      }
      for (var p in customExpressions) {
        try {
          var prop = eval("l.property" + customExpressions[p].path);
          var originalPropName = customExpressions[p].name;
          originalPropName = originalPropName.split(":")[1];
          if (prop.name == originalPropName) {
            prop.expression = customExpressions[p].expression;
          } else {
            throw "prop mismatch";
          }
        } catch (err) {}
      }
      if (data.type == "Radial") {
        l("ADBE Effect Parade").random(1).expression = expr.random(
          controller.name,
          "Radial",
        );
        if (data.threeDLayer) {
          orientationExpression += expressions.radialOrientation(
            controller.name,
            data,
            i,
          );
          rotationExpression += expressions.rotation();
          l("ADBE Transform Group")("ADBE Orientation").expression =
            orientationExpression;
          l("ADBE Transform Group")("ADBE Rotate Z").expression = rotationUsed
            ? rotationExpression
            : "";
        } else {
          rotationExpression += expressions.radialRotation(
            controller.name,
            data,
            i,
          );
          l("ADBE Transform Group")("ADBE Rotate Z").expression =
            rotationExpression;
        }
      } else if (data.type == "Path") {
        l("ADBE Effect Parade").random(1).expression = expr.random(
          controller.name,
          "Path",
        );
        if (data.threeDLayer) {
          orientationExpression += expressions.pathOrientation(
            controller.name,
            data,
            i,
          );
          rotationExpression += expressions.rotation();
          l("ADBE Transform Group")("ADBE Orientation").expression =
            orientationExpression;
          l("ADBE Transform Group")("ADBE Rotate Z").expression = rotationUsed
            ? rotationExpression
            : "";
        } else {
          rotationExpression += expressions.pathRotation(
            controller.name,
            data,
            i,
          );
          l("ADBE Transform Group")("ADBE Rotate Z").expression =
            rotationExpression;
        }
      } else if (data.type == "Path Points") {
        if (data.threeDLayer) {
          orientationExpression += expressions.pathPointsOrientation(
            controller.name,
            data,
            i,
          );
          rotationExpression += expressions.rotation();
          l("ADBE Transform Group")("ADBE Orientation").expression =
            orientationExpression;
          l("ADBE Transform Group")("ADBE Rotate Z").expression = rotationUsed
            ? rotationExpression
            : "";
        } else {
          rotationExpression += expressions.pathPointsRotation(
            controller.name,
            data,
            i,
          );
          l("ADBE Transform Group")("ADBE Rotate Z").expression =
            rotationExpression;
        }
      } else {
        if (data.threeDLayer) {
          orientationExpression += expressions.orientation();
          rotationExpression += expressions.rotation();
          l("ADBE Transform Group")("ADBE Orientation").expression =
            orientationUsed ? orientationExpression : "";
          l("ADBE Transform Group")("ADBE Rotate Z").expression = rotationUsed
            ? rotationExpression
            : "";
        } else {
          rotationExpression += expressions.rotation();
          l("ADBE Transform Group")("ADBE Rotate Z").expression = rotationUsed
            ? rotationExpression
            : "";
        }
        l("ADBE Effect Parade").random(1).expression = "0;";
      }
      l("ADBE Transform Group")("ADBE Position").expression =
        positionExpression;
      if (l.threeDLayer) {
        l("ADBE Transform Group")("ADBE Rotate X").expression = rotationUsed
          ? rotationXExpression
          : "";
      }
      if (l.threeDLayer) {
        l("ADBE Transform Group")("ADBE Rotate Y").expression = rotationUsed
          ? rotationYExpression
          : "";
      }
      l("ADBE Transform Group")("ADBE Scale").expression = scaleUsed
        ? scaleExpression
        : "";
      l("ADBE Transform Group")("ADBE Anchor Point").expression = anchorUsed
        ? anchorExpression
        : "";
      l("ADBE Transform Group")("ADBE Opacity").expression = opacityUsed
        ? opacityExpression
        : "";
      if (timeUsed && l.canSetTimeRemapEnabled) {
        if (!l.timeRemapEnabled) {
          l.timeRemapEnabled = true;
        }
        l("ADBE Time Remapping").expression = timeExpression;
      } else {
        if (l.canSetTimeRemapEnabled) {
          if (l.timeRemapEnabled) {
            l("ADBE Time Remapping").expression = "";
          }
        }
      }
    };
    this.removeAllExpressionsFromLayers = function (cloner) {
      var effectors = cloner.effectors;
      for (var i = 0; i < cloner.layers.length; i += 1) {
        var l = cloner.layers[i];
        this.removeAllExpressionsFromLayer(l, effectors);
      }
      this.cleanUpRandomLayers(cloner);
    };
    this.removeAllExpressionsFromLayer = function (l, effectors) {
      l("ADBE Transform Group")("ADBE Position").expression = "";
      l("ADBE Transform Group")("ADBE Scale").expression = "";
      l("ADBE Transform Group")("ADBE Anchor Point").expression = "";
      l("ADBE Transform Group")("ADBE Opacity").expression = "";
      if (l.threeDLayer) {
        l("ADBE Transform Group")("ADBE Orientation").expression = "";
        l("ADBE Transform Group")("ADBE Rotate X").expression = "";
        l("ADBE Transform Group")("ADBE Rotate Y").expression = "";
        l("ADBE Transform Group")("ADBE Rotate Z").expression = "";
      } else {
        l("ADBE Transform Group")("ADBE Rotate Z").expression = "";
      }
      if (l.timeRemapEnabled) {
        l("ADBE Time Remapping").expression = "";
      }
      if (l("ADBE Effect Parade")("random")) {
        l("ADBE Effect Parade")("random")(1).expression = "0;";
      }
      for (var k = 0; k < effectors.length; k += 1) {
        var effector = effectors[k];
        if (l("ADBE Effect Parade")("tint" + k)) {
          var tint = l("ADBE Effect Parade")("tint" + k);
          tint(1).expression = "";
          tint(2).expression = "";
          tint(3).expression = "";
        }
        for (var h = 0; h < effector.data.customProperties.length; h += 1) {
          try {
            var prop = eval(
              "l.property" + effector.data.customProperties[h].path,
            );
            var cleanPropName =
              effector.data.customProperties[h].name.split(":")[1];
            if (prop.name == cleanPropName) {
              prop.expression = "";
            }
          } catch (err) {}
        }
      }
      l("ADBE Effect Parade")("basePosition")(1).expression = "";
      if (l("ADBE Effect Parade").random) {
        l("ADBE Effect Parade").random(1).expression = "";
      }
      for (var i = 0; i < l("ADBE Effect Parade").numProperties; i += 1) {
        var name = l("ADBE Effect Parade")(i + 1).name;
        if (name.substr(name.length - 5, 5) == "Power") {
          l("ADBE Effect Parade")(i + 1)(1).expression = "";
        }
      }
    };
    this.cleanUpRandomLayers = function (cloner) {
      for (var k = 0; k < cloner.effectors.length; k += 1) {
        var effector = cloner.effectors[k];
        var randomLayer = effector.randomLayer;
        var len = randomLayer("ADBE Effect Parade").numProperties;
        for (var g = len - 1; g >= 0; g--) {
          var effect = randomLayer("ADBE Effect Parade").property(g + 1);
          var effectName = effect.name;
          if (effectName != "aecdata") {
            effect.remove();
          }
        }
      }
    };
    this.removeAllUnbakeData = function (cloner) {
      var effectors = cloner.effectors;
      for (var i = 0; i < cloner.layers.length; i += 1) {
        var l = cloner.layers[i];
        l("ADBE Effect Parade")("basePosition").remove();
        l("ADBE Effect Parade")("sourcePosition").remove();
        l("ADBE Effect Parade")("random").remove();
        l("ADBE Effect Parade")("aecdata").remove();
        for (var p = l("ADBE Effect Parade").numProperties - 1; p >= 0; p--) {
          var name = l("ADBE Effect Parade")(p + 1).name;
          if (name.substr(name.length - 5, 5) == "Power") {
            l("ADBE Effect Parade")(p + 1).remove();
          }
        }
        l.shy = false;
      }
      for (var k = 0; k < effectors.length; k += 1) {
        var effector = effectors[k];
        effector.randomLayer.remove();
        effector.layer.remove();
      }
      for (var i = 0; i < cloner.sourceLayers.length; i += 1) {
        cloner.sourceLayers[i].remove();
      }
      cloner.controller.remove();
    };
    this.bake = function () {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        app.beginUndoGroup("Bake");
        switch (uiBuilder.getSettingsData().savedSettingKeepUnbake) {
          case 0:
            removeUnbakeData = false;
            break;
          case 1:
            removeUnbakeData = true;
            break;
          case 2:
            var w = new Window("dialog");
            var g = utils.createUIGroup(w, 0, 0, 130, 80);
            utils.createUIStaticText(g, 0, 0, 300, 30, "Keep unbake data?");
            var bYes = utils.createUIButton(g, 0, 40, 50, 30, "Yes");
            var bNo = utils.createUIButton(g, 55, 40, 50, 30, "No");
            bYes.onClick = function () {
              removeUnbakeData = false;
              w.hide();
            };
            bNo.onClick = function () {
              removeUnbakeData = true;
              w.hide();
            };
            w.show();
            break;
        }
        var activeCloners = this.getClonersInComp();
        var cloner = aeCloner.selectedCloner;
        var effectors = cloner.effectors;
        var dataObject = [];
        var duration = comp.duration;
        var frameDuration = comp.frameDuration;
        var frameRate = comp.frameRate;
        var dropFrame = comp.dropFrame;
        var numberOfFrames = duration / frameDuration;
        var isAnimated = false;
        if (
          cloner.controller("ADBE Transform Group")("ADBE Position")
            .isTimeVarying
        ) {
          isAnimated = true;
        }
        var lenCloner = cloner.controller("ADBE Effect Parade").numProperties;
        for (var p = 0; p < lenCloner; p += 1) {
          if (
            cloner.controller("ADBE Effect Parade")(p + 1).name != "aecdata"
          ) {
            var len = cloner.controller("ADBE Effect Parade")(
              p + 1,
            ).numProperties;
            for (var k = 0; k < len; k += 1) {
              if (
                cloner.controller("ADBE Effect Parade")(p + 1)(k + 1)
                  .isTimeVarying
              ) {
                isAnimated = true;
                break;
              }
            }
          }
        }
        for (var i = 0; i < effectors.length; i += 1) {
          var effector = effectors[i];
          if (effector.data.type == "Layer") {
            isAnimated = true;
          }
          if (effector.data.type == "Wiggle") {
            isAnimated = true;
          }
          if (
            effector.layer("ADBE Transform Group")("ADBE Position")
              .isTimeVarying
          ) {
            isAnimated = true;
            break;
          }
          var lenEffector = effector.layer("ADBE Effect Parade").numProperties;
          for (var p = 0; p < lenEffector; p += 1) {
            if (
              effector.layer("ADBE Effect Parade")(p + 1).name ==
              "Pulse Effector"
            ) {
              if (effector.layer("ADBE Effect Parade")(p + 1)(7).value) {
                isAnimated = true;
                break;
              }
            }
            if (
              effector.layer("ADBE Effect Parade")(p + 1).name ==
              "Noise Effector"
            ) {
              if (effector.layer("ADBE Effect Parade")(p + 1)(8).value) {
                isAnimated = true;
                break;
              }
            }
            if (
              effector.layer("ADBE Effect Parade")(p + 1).name != "aecdata" &&
              effector.layer("ADBE Effect Parade")(p + 1).name !=
                "Layer Effector" &&
              effector.layer("ADBE Effect Parade")(p + 1).name !=
                "Wiggle Effector"
            ) {
              var len = effector.layer("ADBE Effect Parade")(
                p + 1,
              ).numProperties;
              for (var k = 0; k < len; k += 1) {
                if (
                  effector.layer("ADBE Effect Parade")(p + 1)(k + 1)
                    .isTimeVarying &&
                  effector.layer("ADBE Effect Parade")(p + 1)(k + 1).name !=
                    "Curve"
                ) {
                  isAnimated = true;
                  break;
                }
              }
            }
          }
        }
        this.launchProgressWindow(
          "Baking. Please wait, this might take a few minutes.",
        );
        cloner.data.baked = true;
        cloner.controller("ADBE Effect Parade").aecdata(1).expression =
          this.createDataExpression(cloner.index, cloner.data);
        this.updateProgressWindow(5);
        utils.deselectAllLayers(app.project.activeItem);
        if (isAnimated) {
          for (var k = 0; k < cloner.layers.length; k += 1) {
            this.updateProgressWindow(
              Math.min(100, Math.round((k / cloner.layers.length) * 100) + 10),
              true,
            );
            var l = cloner.layers[k];
            if (l("ADBE Transform Group")("ADBE Position").expression != "") {
              l.selected = true;
              l("ADBE Transform Group")("ADBE Position").selected = true;
              $.sleep(500);
              app.executeCommand(2639);
              l("ADBE Transform Group")("ADBE Position").expression = "";
              l.selected = false;
            }
            if (
              l("ADBE Transform Group")("ADBE Anchor Point").expression != ""
            ) {
              l.selected = true;
              l("ADBE Transform Group")("ADBE Anchor Point").selected = true;
              $.sleep(500);
              app.executeCommand(2639);
              l("ADBE Transform Group")("ADBE Anchor Point").expression = "";
              l.selected = false;
            }
            if (l("ADBE Transform Group")("ADBE Scale").expression != "") {
              l.selected = true;
              l("ADBE Transform Group")("ADBE Scale").selected = true;
              $.sleep(500);
              app.executeCommand(2639);
              l("ADBE Transform Group")("ADBE Scale").expression = "";
              l.selected = false;
            }
            if (l("ADBE Transform Group")("ADBE Opacity").expression != "") {
              l.selected = true;
              l("ADBE Transform Group")("ADBE Opacity").selected = true;
              $.sleep(500);
              app.executeCommand(2639);
              l("ADBE Transform Group")("ADBE Opacity").expression = "";
              l.selected = false;
            }
            if (
              l.timeRemapEnabled &&
              l("ADBE Time Remapping").expression != ""
            ) {
              l.selected = true;
              l("ADBE Time Remapping").selected = true;
              $.sleep(500);
              app.executeCommand(2639);
              l("ADBE Time Remapping").expression = "";
              l.selected = false;
            }
            if (l.threeDLayer) {
              if (
                l("ADBE Transform Group")("ADBE Orientation").expression != ""
              ) {
                l.selected = true;
                l("ADBE Transform Group")("ADBE Orientation").selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                l("ADBE Transform Group")("ADBE Orientation").expression = "";
                l.selected = false;
              }
              if (l("ADBE Transform Group")("ADBE Rotate X").expression != "") {
                l.selected = true;
                l("ADBE Transform Group")("ADBE Rotate X").selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                l("ADBE Transform Group")("ADBE Rotate X").expression = "";
                l.selected = false;
              }
              if (l("ADBE Transform Group")("ADBE Rotate Y").expression != "") {
                l.selected = true;
                l("ADBE Transform Group")("ADBE Rotate Y").selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                l("ADBE Transform Group")("ADBE Rotate Y").expression = "";
                l.selected = false;
              }
              if (l("ADBE Transform Group")("ADBE Rotate Z").expression != "") {
                l.selected = true;
                l("ADBE Transform Group")("ADBE Rotate Z").selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                l("ADBE Transform Group")("ADBE Rotate Z").expression = "";
                l.selected = false;
              }
            } else {
              if (l("ADBE Transform Group")("ADBE Rotate Z").expression != "") {
                l.selected = true;
                l("ADBE Transform Group")("ADBE Rotate Z").selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                l("ADBE Transform Group")("ADBE Rotate Z").expression = "";
                l.selected = false;
              }
            }
            for (var e = 0; e < effectors.length; e += 1) {
              var effector = effectors[e];
              if (l("ADBE Effect Parade")("tint" + e)) {
                var tint = l("ADBE Effect Parade")("tint" + e);
                l.selected = true;
                tint(1).selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                tint(1).expression = "";
                l.selected = false;
                l.selected = true;
                tint(2).selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                tint(2).expression = "";
                l.selected = false;
                l.selected = true;
                tint(3).selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                tint(3).expression = "";
                l.selected = false;
              }
              for (
                var h = 0;
                h < effector.data.customProperties.length;
                h += 1
              ) {
                var prop = eval(
                  "l.property" + effector.data.customProperties[h].path,
                );
                l.selected = true;
                prop.selected = true;
                $.sleep(500);
                app.executeCommand(2639);
                prop.expression = "";
                l.selected = false;
              }
            }
            this.removeAllExpressionsFromLayer(l, effectors);
          }
        } else {
          for (var k = 0; k < cloner.layers.length; k += 1) {
            this.updateProgressWindow(
              Math.min(100, Math.round((k / cloner.layers.length) * 100) + 10),
              true,
            );
            var l = cloner.layers[k];
            if (l("ADBE Transform Group")("ADBE Position").expression != "") {
              var propertyVal = l("ADBE Transform Group")(
                "ADBE Position",
              ).value;
              l("ADBE Transform Group")("ADBE Position").expression = "";
              l("ADBE Transform Group")("ADBE Position").setValue(propertyVal);
            }
            if (
              l("ADBE Transform Group")("ADBE Anchor Point").expression != ""
            ) {
              var propertyVal = l("ADBE Transform Group")(
                "ADBE Anchor Point",
              ).value;
              l("ADBE Transform Group")("ADBE Anchor Point").expression = "";
              l("ADBE Transform Group")("ADBE Anchor Point").setValue(
                propertyVal,
              );
            }
            if (l("ADBE Transform Group")("ADBE Scale").expression != "") {
              var propertyVal = l("ADBE Transform Group")("ADBE Scale").value;
              l("ADBE Transform Group")("ADBE Scale").expression = "";
              l("ADBE Transform Group")("ADBE Scale").setValue(propertyVal);
            }
            if (l("ADBE Transform Group")("ADBE Opacity").expression != "") {
              var propertyVal = l("ADBE Transform Group")("ADBE Opacity").value;
              l("ADBE Transform Group")("ADBE Opacity").expression = "";
              l("ADBE Transform Group")("ADBE Opacity").setValue(propertyVal);
            }
            if (
              l.timeRemapEnabled &&
              l("ADBE Time Remapping").expression != ""
            ) {
              var propertyVal = l("ADBE Time Remapping").value;
              l("ADBE Time Remapping").expression = "";
              l("ADBE Time Remapping").setValue(propertyVal);
            }
            if (l.threeDLayer) {
              if (
                l("ADBE Transform Group")("ADBE Orientation").expression != ""
              ) {
                var propertyVal = l("ADBE Transform Group")(
                  "ADBE Orientation",
                ).value;
                l("ADBE Transform Group")("ADBE Orientation").expression = "";
                l("ADBE Transform Group")("ADBE Orientation").setValue(
                  propertyVal,
                );
              }
              if (l("ADBE Transform Group")("ADBE Rotate X").expression != "") {
                var propertyVal = l("ADBE Transform Group")(
                  "ADBE Rotate X",
                ).value;
                l("ADBE Transform Group")("ADBE Rotate X").expression = "";
                l("ADBE Transform Group")("ADBE Rotate X").setValue(
                  propertyVal,
                );
              }
              if (l("ADBE Transform Group")("ADBE Rotate Y").expression != "") {
                var propertyVal = l("ADBE Transform Group")(
                  "ADBE Rotate Y",
                ).value;
                l("ADBE Transform Group")("ADBE Rotate Y").expression = "";
                l("ADBE Transform Group")("ADBE Rotate Y").setValue(
                  propertyVal,
                );
              }
              if (l("ADBE Transform Group")("ADBE Rotate Z").expression != "") {
                var propertyVal = l("ADBE Transform Group")(
                  "ADBE Rotate Z",
                ).value;
                l("ADBE Transform Group")("ADBE Rotate Z").expression = "";
                l("ADBE Transform Group")("ADBE Rotate Z").setValue(
                  propertyVal,
                );
              }
            } else {
              if (l("ADBE Transform Group")("ADBE Rotate Z").expression != "") {
                var propertyVal = l("ADBE Transform Group")(
                  "ADBE Rotate Z",
                ).value;
                l("ADBE Transform Group")("ADBE Rotate Z").expression = "";
                l("ADBE Transform Group")("ADBE Rotate Z").setValue(
                  propertyVal,
                );
              }
            }
            for (var e = 0; e < effectors.length; e += 1) {
              var effector = effectors[e];
              if (l("ADBE Effect Parade")("tint" + e)) {
                var tint = l("ADBE Effect Parade")("tint" + e);
                var propertyVal = tint(1).value;
                tint(1).expression = "";
                tint(1).setValue(propertyVal);
                var propertyVal = tint(2).value;
                tint(2).expression = "";
                tint(2).setValue(propertyVal);
                var propertyVal = tint(3).value;
                tint(3).expression = "";
                tint(3).setValue(propertyVal);
              }
              for (
                var h = 0;
                h < effector.data.customProperties.length;
                h += 1
              ) {
                var prop = eval(
                  "l.property" + effector.data.customProperties[h].path,
                );
                var propertyVal = prop.value;
                prop.expression = "";
                prop.setValue(propertyVal);
              }
            }
            this.removeAllExpressionsFromLayer(l, effectors);
          }
        }
        if (removeUnbakeData) {
          this.removeAllUnbakeData(cloner);
          this.reassignAfterRemove(cloner, activeCloners);
        }
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.unbake = function () {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        app.beginUndoGroup("Unbake");
        this.launchProgressWindow("Unbaking...");
        var cloner = aeCloner.selectedCloner;
        var scaleUsed = false;
        var rotationUsed = false;
        var orientationUsed = false;
        var anchorUsed = false;
        var opacityUsed = false;
        var timeUsed = false;
        cloner.data.baked = false;
        cloner.controller("ADBE Effect Parade").aecdata(1).expression =
          this.createDataExpression(cloner.index, cloner.data);
        uiBuilder.setDataFromUnBake();
        this.update(true);
        this.closeProgressWindow();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.removeAllKeyframesFromProperty = function (prop) {
      for (var i = prop.numKeys; i != 0; i--) {
        prop.removeKey(i);
      }
    };
    this.removeCustomProperty = function (effectors, clonerIndex, path, name) {
      for (var i = 0; i < effectors.length; i += 1) {
        var effector = effectors[i];
        if (effector.layer("ADBE Effect Parade")(name)) {
          effector.layer("ADBE Effect Parade")(name).remove();
          var data = effector.data;
          for (var k = 0; k < data.customProperties.length; k += 1) {
            if (data.customProperties[k].path == path) {
              data.customProperties.splice(k, 1);
              break;
            }
          }
        }
        effector.layer("ADBE Effect Parade").aecdata(1).expression =
          this.createEffectorDataExpression(clonerIndex, i, data);
      }
    };
    this.orderClones = function (cloner) {
      var nextLayer = cloner.controller;
      for (var k = 0; k < cloner.effectors.length; k += 1) {
        var effector = cloner.effectors[k].layer;
        var randomLayer = cloner.effectors[k].randomLayer;
        effector.moveAfter(nextLayer);
        randomLayer.moveAfter(effector);
        nextLayer = randomLayer;
      }
      var layers = cloner.layers;
      for (var i = 0; i < layers.length; i += 1) {
        var layer = layers[i];
        layer.moveAfter(nextLayer);
        nextLayer = layer;
      }
      var sourceLayers = cloner.sourceLayers;
      for (var k = sourceLayers.length - 1; k >= 0; k--) {
        var sourceLayer = sourceLayers[k];
        sourceLayer.moveAfter(layers[layers.length - 1]);
      }
    };
    this.create = function (noUndoGroup) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 1) {
          throw this.noLayersErr;
        }
        app.beginUndoGroup("Clone layer");
        comp.hideShyLayers = true;
        utils.deselectAllLayers(comp);
        var data = createData;
        data.numSourceLayers = selectedLayers.length;
        var preset = this.getPreset(data);
        var cloners = this.getClonersInComp();
        var clonerIndex = cloners.length;
        for (var i = 0; i < selectedLayers.length; i += 1) {
          if (selectedLayers[i].threeDLayer) {
            data.threeDLayer = true;
          }
          if (selectedLayers[i]("ADBE Effect Parade").aecdata) {
            selectedLayers[i]("ADBE Effect Parade").aecdata.remove();
          }
        }
        var controller = comp.layers.addShape();
        utils.createClonerIcon(controller);
        controller.name = utils.getAutoName(cloners);
        controller.guideLayer = true;
        controller.threeDLayer = data.threeDLayer;
        controller.selected = true;
        controller.applyPreset(preset);
        var dataSlider = controller("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        dataSlider.name = "aecdata";
        dataSlider.collapsed = true;
        dataSlider(1).expression = this.createDataExpression(clonerIndex, data);
        var sourceIndex = -1;
        var numOfClones =
          data.type == "Grid"
            ? data.countX * data.countY * data.countZ
            : data.count;
        for (var i = 0; i < numOfClones; i += 1) {
          switch (data.cycle) {
            case "Iterate":
              sourceIndex =
                sourceIndex + 1 >= selectedLayers.length ? 0 : sourceIndex + 1;
              break;
            case "Random":
              var rnd = utils.returnRandom(data.seed + i);
              sourceIndex = Math.floor(rnd * selectedLayers.length);
              break;
          }
          var l = aeCloner.createClone(
            data,
            clonerIndex,
            sourceIndex,
            i,
            controller,
            selectedLayers,
          );
          var dataSlider = l("ADBE Effect Parade").addProperty(
            "ADBE Slider Control",
          );
          dataSlider.name = "aecdata";
          dataSlider(1).expression =
            "//[\'" +
            clonerIndex +
            "\', \'" +
            i +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
        }
        for (var i = 0; i < selectedLayers.length; i += 1) {
          var sourceLayer = selectedLayers[i];
          var source = sourceLayer.duplicate();
          source.name = "source" + i + 1;
          source.enabled = false;
          source.shy = true;
          var dataSlider = source("ADBE Effect Parade").addProperty(
            "ADBE Slider Control",
          );
          dataSlider.name = "aecdata";
          dataSlider(1).expression =
            "//[\'" +
            clonerIndex +
            "\', \'source\', \'" +
            sourceLayer.name +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          selectedLayers[i].enabled = false;
        }
        cloners = this.getClonersInComp();
        this.orderClones(cloners[clonerIndex]);
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.duplicate = function () {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        app.beginUndoGroup("Duplicate Cloner");
        this.launchProgressWindow();
        utils.deselectAllLayers(app.project.activeItem);
        var data = uiBuilder.getUpdateData();
        aeCloner.activeCloners = this.getClonersInComp();
        aeCloner.selectedCloner = aeCloner.activeCloners[data.index];
        var originalCloner = aeCloner.selectedCloner;
        var sourceLayers = originalCloner.sourceLayers;
        for (var i = 0; i < sourceLayers.length; i += 1) {
          sourceLayers[i].selected = true;
        }
        var data = originalCloner.data;
        var preset = this.getPreset(data);
        var cloners = this.getClonersInComp();
        var clonerIndex = cloners.length;
        selectedLayers = sourceLayers;
        for (var i = 0; i < selectedLayers.length; i += 1) {
          if (selectedLayers[i].threeDLayer) {
            data.threeDLayer = true;
          }
        }
        var controller = originalCloner.controller.duplicate();
        controller.name = originalCloner.controller.name + " copy";
        controller.selected = true;
        controller("ADBE Effect Parade").aecdata(1).expression =
          this.createDataExpression(clonerIndex, data);
        var sourceIndex = -1;
        var numOfClones =
          data.type == "Grid"
            ? data.countX * data.countY * data.countZ
            : data.count;
        for (var i = 0; i < numOfClones; i += 1) {
          switch (data.cycle) {
            case "Iterate":
              sourceIndex =
                sourceIndex + 1 >= selectedLayers.length ? 0 : sourceIndex + 1;
              break;
            case "Random":
              var rnd = utils.returnRandom(data.seed + i);
              sourceIndex = Math.floor(rnd * selectedLayers.length);
              break;
          }
          var l = aeCloner.createClone(
            data,
            clonerIndex,
            sourceIndex,
            i,
            controller,
            selectedLayers,
          );
          if (l("ADBE Effect Parade").aecdata) {
            l("ADBE Effect Parade").aecdata.remove();
          }
          var dataSlider = l("ADBE Effect Parade").addProperty(
            "ADBE Slider Control",
          );
          dataSlider.name = "aecdata";
          dataSlider(1).expression =
            "//[\'" +
            clonerIndex +
            "\', \'" +
            i +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
        }
        for (var i = 0; i < selectedLayers.length; i += 1) {
          var sourceLayer = selectedLayers[i];
          var source = sourceLayer.duplicate();
          source.name = "source" + i + 1;
          source.enabled = false;
          source.shy = true;
          var expressionString = String(
            sourceLayer("ADBE Effect Parade").aecdata(1).expression,
          );
          sourceLayerName = eval(
            expressionString.substring(
              expressionString.indexOf("["),
              expressionString.lastIndexOf("]") + 1,
            ),
          )[2];
          source("ADBE Effect Parade").aecdata.remove();
          var dataSlider = source("ADBE Effect Parade").addProperty(
            "ADBE Slider Control",
          );
          dataSlider.name = "aecdata";
          dataSlider(1).expression =
            "//[\'" +
            clonerIndex +
            "\', \'source\', \'" +
            sourceLayerName +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          selectedLayers[i].enabled = false;
        }
        uiBuilder.updatePanel(true);
        aeCloner.activeCloners = this.getClonersInComp();
        var newCloner =
          aeCloner.activeCloners[Number(originalCloner.index) + 1];
        uiBuilder.setUpdateData(originalCloner);
        for (var i = 0; i < originalCloner.effectors.length; i += 1) {
          var cloner = newCloner;
          var effectors = cloner.effectors;
          utils.deselectAllLayers(comp);
          var effector = originalCloner.effectors[i].layer.duplicate();
          effector.name = originalCloner.effectors[i].layer.name + " copy";
          effector("ADBE Effect Parade").aecdata(1).expression =
            this.createEffectorDataExpression(
              cloner.index,
              i,
              originalCloner.effectors[i].data,
            );
          if (effectors.length > 0) {
            effector.moveAfter(effectors[effectors.length - 1].layer);
          } else {
            effector.moveAfter(cloner.controller);
          }
          var randomLayer = comp.layers.addShape();
          randomLayer.name = utils.getAutoNameRandomLayer(
            aeCloner.activeCloners,
          );
          randomLayer.shy = true;
          randomLayer.enabled = false;
          randomLayer.selected = false;
          randomLayer.moveAfter(cloner.controller);
          var randomAecSlider = randomLayer("ADBE Effect Parade").addProperty(
            "ADBE Slider Control",
          );
          randomAecSlider.name = "aecdata";
          randomAecSlider(1).expression =
            "//[\'" +
            cloner.index +
            "\', \'random\', \'" +
            i +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          uiBuilder.updatePanel(true);
          uiBuilder.setEffectorUpdateData(originalCloner.effectors[i]);
        }
        aeCloner.update();
        cloners = this.getClonersInComp();
        this.orderClones(cloners[clonerIndex]);
        newCloner.controller.selected = true;
        app.endUndoGroup();
        this.closeProgressWindow();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.update = function (force) {
      try {
        utils.deselectAllLayers(app.project.activeItem);
        var comp = app.project.activeItem;
        var data = uiBuilder.getUpdateData();
        aeCloner.activeCloners = this.getClonersInComp();
        aeCloner.selectedCloner = aeCloner.activeCloners[data.index];
        var cloner = aeCloner.selectedCloner;
        var controller = cloner.controller;
        var clonerLayers = cloner.layers;
        var selectedLayers = cloner.sourceLayers;
        var preset = this.getPreset(data);
        data.numSourceLayers = selectedLayers.length;
        data.baked = cloner.data.baked;
        force = data.type != cloner.data.type ? true : force;
        for (var g = 0; g < cloner.effectors.length; g += 1) {
          effectorData = cloner.effectors[g].data;
          cloner.effectors[g]
            .layer("ADBE Effect Parade")
            .aecdata(1).expression = this.createEffectorDataExpression(
            cloner.index,
            g,
            effectorData,
          );
          cloner.effectors[g]
            .randomLayer("ADBE Effect Parade")
            .aecdata(1).expression =
            "[\'" +
            cloner.index +
            "\', \'random\', \'" +
            g +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
        }
        if (data.type == "Path Points") {
          if (
            comp.layer(cloner.controller.name)("ADBE Root Vectors Group")(
              "pathGroup",
            )
          ) {
            data.count = comp.layer(cloner.controller.name)(
              "ADBE Root Vectors Group",
            )("pathGroup")("ADBE Vectors Group")(1)(
              "Path",
            ).value.vertices.length;
          } else {
            data.count = 1;
          }
        }
        controller("ADBE Effect Parade").aecdata(1).expression =
          this.createDataExpression(cloner.index, data);
        if (cloner.data.type != data.type) {
          switch (cloner.data.type) {
            case "Linear":
              controller("ADBE Effect Parade")
                .property("Linear Cloner")
                .remove();
              break;
            case "Radial":
              controller("ADBE Effect Parade")
                .property("Radial Cloner")
                .remove();
              break;
            case "Path":
              controller("ADBE Effect Parade").property("Path Cloner").remove();
              break;
            case "Path Points":
              controller("ADBE Effect Parade")
                .property("Path Points Cloner")
                .remove();
              break;
            case "Grid":
              controller("ADBE Effect Parade").property("Grid Cloner").remove();
              break;
            case "Cluster":
              controller("ADBE Effect Parade")
                .property("Cluster Cloner")
                .remove();
              break;
          }
          controller.selected = true;
          controller.applyPreset(preset);
          var presetEffect = controller("ADBE Effect Parade")(
            data.type + " Cloner",
          );
          presetEffect.moveTo(1);
        }
        if (controller.threeDLayer != data.threeDLayer) {
          controller.threeDLayer = data.threeDLayer;
        }
        for (var g = 0; g < cloner.effectors.length; g += 1) {
          utils.deselectAllLayers(app.project.activeItem);
          var effector = cloner.effectors[g];
          for (var h = 0; h < effector.data.customProperties.length; h += 1) {
            var customEffector = effector.data.customProperties[h];
            if (customEffector.type == "color") {
              var effect = effector.layer("ADBE Effect Parade")(
                customEffector.name,
              );
              var propIndex = effect.propertyIndex;
              if (effect("Color")) {
                effectType = "Plain";
                color = effect("Color").value;
              } else {
                effectType = "Random";
                colorTo = effect("To Color").value;
                colorFrom = effect("From Color").value;
                colorUniform = effect("Uniform Color")
                  ? effect("Uniform Color").value
                  : true;
              }
              effect.remove();
              effector.layer.selected = true;
              if (
                effector.data.type == "Random" ||
                effector.data.type == "Wiggle"
              ) {
                effector.layer.applyPreset(
                  this.presetNameToFile("aecloner_customcolorrandom"),
                );
                var effect = effector.layer("ADBE Effect Parade")(
                  "Custom Color Random",
                );
                effect.name = customEffector.name;
                effect("To Color").setValue(
                  effectType == "Plain" ? color : colorTo,
                );
                if (effectType == "Random") {
                  effect("From Color").setValue(colorFrom);
                }
                if (effectType == "Random") {
                  effect("Uniform Color").setValue(colorUniform);
                }
                effect.moveTo(propIndex);
              } else if (
                effector.data.type == "Pulse" ||
                effector.data.type == "Noise"
              ) {
                effector.layer.applyPreset(
                  this.presetNameToFile("aecloner_customcolorpulse"),
                );
                var effect =
                  effector.layer("ADBE Effect Parade")("Custom Color Pulse");
                effect.name = customEffector.name;
                effect("To Color").setValue(
                  effectType == "Plain" ? color : colorTo,
                );
                if (effectType == "Random") {
                  effect("From Color").setValue(colorFrom);
                }
              } else {
                effector.layer.applyPreset(
                  this.presetNameToFile("aecloner_customcolor"),
                );
                var effect =
                  effector.layer("ADBE Effect Parade")("Custom Color");
                effect.name = customEffector.name;
                effect("Color").setValue(
                  effectType == "Plain" ? color : colorTo,
                );
                effect.moveTo(propIndex);
              }
            }
          }
        }
        var sourceIndex = -1;
        switch (data.type) {
          case "Linear":
            numOfClones = data.count;
            break;
          case "Radial":
            numOfClones = data.count;
            break;
          case "Path":
            numOfClones = data.count;
            break;
          case "Path Points":
            numOfClones = data.count;
            break;
          case "Grid":
            numOfClones = data.countX * data.countY * data.countZ;
            break;
          case "Cluster":
            numOfClones = cloner.sourceLayers.length;
            break;
        }
        var layersToDelete = Math.max(0, clonerLayers.length - numOfClones);
        layersToDelete =
          cloner.data.cycle != data.cycle ||
          cloner.data.seed != data.seed ||
          force
            ? clonerLayers.length
            : layersToDelete;
        var layersToKeep = clonerLayers.length - layersToDelete;
        for (var i = clonerLayers.length - 1; i > layersToKeep - 1; i--) {
          var l = clonerLayers[i];
          l.remove();
          cloner.layers.pop();
        }
        var randomHackSlider = controller("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        randomHackSlider.name = "rnd";
        for (var i = 0; i < numOfClones; i += 1) {
          this.updateProgressWindow(Math.round((i / numOfClones) * 100));
          data.cycle = data.type == "Cluster" ? "Iterate" : data.cycle;
          switch (data.cycle) {
            case "Iterate":
              sourceIndex =
                sourceIndex + 1 >= selectedLayers.length ? 0 : sourceIndex + 1;
              break;
            case "Random":
              var rnd = utils.returnRandomHack(
                randomHackSlider(1),
                data.seed + i,
              );
              sourceIndex = Math.floor(rnd * selectedLayers.length);
              break;
          }
          if (i > clonerLayers.length - 1) {
            var l = aeCloner.createClone(
              data,
              cloner.index,
              sourceIndex,
              i,
              controller,
              selectedLayers,
              cloner.randomLayer,
            );
            l("ADBE Effect Parade").aecdata(1).expression =
              "//[\'" + cloner.index + "\', \'" + i + "\']\n\t\t\t\t\t\t0;";
            cloner.layers[i] = l;
          } else {
            var l = clonerLayers[i];
          }
          l.enabled = data.visibility;
          l.motionBlur = data.motionBlur;
          if (l.threeDLayer != data.threeDLayer) {
            l.threeDLayer = data.threeDLayer;
          }
          this.addExpressionsToLayer(l, controller, data, i, cloner.effectors);
        }
        randomHackSlider.remove();
        for (var k = 0; k < cloner.effectors.length; k += 1) {
          var effector = cloner.effectors[k].layer;
          effector.threeDLayer = data.threeDLayer;
        }
        cloner.data = data;
        this.orderClones(cloner);
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.updateCloner = function () {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        app.beginUndoGroup("Update cloner");
        this.launchProgressWindow();
        var cloner = aeCloner.selectedCloner;
        var data = uiBuilder.getUpdateData();
        switch (data.type) {
          case "Linear":
            numOfClones = data.count;
            break;
          case "Radial":
            numOfClones = data.count;
            break;
          case "Path":
            numOfClones = data.count;
            break;
          case "Path Points":
            if (
              comp.layer(cloner.controller.name)("ADBE Root Vectors Group")(
                "pathGroup",
              )
            ) {
              numOfClones = comp.layer(cloner.controller.name)(
                "ADBE Root Vectors Group",
              )("pathGroup")("ADBE Vectors Group")(1)("Path").value.vertices
                .length;
            } else {
              numOfClones = 1;
            }
            break;
          case "Grid":
            numOfClones = data.countX * data.countY * data.countZ;
            break;
          case "Cluster":
            numOfClones = cloner.sourceLayers.length;
            break;
        }
        this.removeAllExpressionsFromLayers(cloner);
        this.update(false);
        var clonerIndex = cloner.index;
        aeCloner.activeCloners = this.getClonersInComp();
        aeCloner.selectedCloner = aeCloner.activeCloners[clonerIndex];
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.updateSourceLayers = function () {
      try {
        app.beginUndoGroup("Update cloner layers");
        this.launchProgressWindow();
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 1) {
          throw this.noLayersErr;
        }
        var cloner = aeCloner.selectedCloner;
        var currentLayers = cloner.sourceLayers;
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 1) {
          throw this.noLayersErr;
        }
        for (var i = 0; i < currentLayers.length; i += 1) {
          var l = currentLayers[i];
          l.remove();
        }
        for (var i = 0; i < selectedLayers.length; i += 1) {
          var sourceLayer = selectedLayers[i];
          var source = sourceLayer.duplicate();
          source.name = "source" + i + 1;
          source.enabled = false;
          source.shy = true;
          var dataSlider = source("ADBE Effect Parade").addProperty(
            "ADBE Slider Control",
          );
          dataSlider.name = "aecdata";
          dataSlider(1).expression =
            "//[\'" +
            cloner.index +
            "\', \'source\', \'" +
            sourceLayer.name +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          selectedLayers[i].enabled = false;
        }
        cloner.sourceLayers = selectedLayers;
        this.removeAllExpressionsFromLayers(cloner);
        this.update(true);
        var clonerIndex = cloner.index;
        aeCloner.activeCloners = this.getClonersInComp();
        aeCloner.selectedCloner = aeCloner.activeCloners[clonerIndex];
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.removeCloner = function () {
      var w = new Window("dialog");
      var g = utils.createUIGroup(w, 0, 0, 130, 80);
      utils.createUIStaticText(g, 0, 0, 300, 30, "Recreate original layers?");
      var bYes = utils.createUIButton(g, 0, 40, 50, 30, "Yes");
      var bNo = utils.createUIButton(g, 55, 40, 50, 30, "No");
      bYes.onClick = function () {
        recreate = true;
        w.hide();
      };
      bNo.onClick = function () {
        recreate = false;
        w.hide();
      };
      w.show();
      try {
        var activeCloners = this.getClonersInComp();
        var cloner = aeCloner.selectedCloner;
        var controller = cloner.controller;
        var clonerLayers = cloner.layers;
        var selectedLayers = cloner.sourceLayers;
        app.beginUndoGroup("Remove cloner");
        for (var i = 0; i < clonerLayers.length; i += 1) {
          var l = clonerLayers[i];
          l.remove();
        }
        for (var i = 0; i < cloner.effectors.length; i += 1) {
          var l = cloner.effectors[i].layer;
          l.remove();
          cloner.effectors[i].randomLayer.remove();
        }
        controller.remove();
        for (var i = 0; i < selectedLayers.length; i += 1) {
          var sourceLayer = selectedLayers[i];
          if (recreate) {
            var expressionString = String(
              sourceLayer("ADBE Effect Parade").aecdata(1).expression,
            );
            sourceLayerName = eval(
              expressionString.substring(
                expressionString.indexOf("["),
                expressionString.lastIndexOf("]") + 1,
              ),
            )[2];
            sourceLayer.name = sourceLayerName;
            sourceLayer.enabled = true;
            sourceLayer.shy = false;
            sourceLayer("ADBE Effect Parade").property("aecdata").remove();
          } else {
            sourceLayer.remove();
          }
        }
        this.reassignAfterRemove(cloner, activeCloners);
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.pathClonerSetPath = function () {
      try {
        app.beginUndoGroup("Set Path");
        var comp = app.project.activeItem;
        var layer = aeCloner.selectedCloner.controller;
        var data = uiBuilder.getUpdateData();
        var selectedProperties = comp.selectedProperties;
        if (selectedProperties.length < 1) {
          throw this.noPathErr;
        }
        var property = selectedProperties[selectedProperties.length - 1];
        var type = utils.getPropertyType(property);
        var path = utils.getPropertyPath(property);
        var selectedLayer = comp.selectedLayers[0];
        var pathLayerName = selectedLayer.name;
        if (type != "path") {
          throw this.noPathErr;
        }
        var pathExist = false;
        if (layer("Contents").property("pathGroup") != null) {
          pathExist = true;
        }
        if (!pathExist) {
          var pathGroup = layer("Contents").addProperty("ADBE Vector Group");
          pathGroup.name = "pathGroup";
          pathClonerPath = pathGroup("Contents").addProperty(
            "ADBE Vector Shape - Group",
          );
          pathClonerPath.enabled = false;
          pathClonerPath.property("path").setValue(new Shape());
        } else {
          pathClonerPath = layer("Contents")
            .property("pathGroup")
            .property("Contents")
            .property(1);
        }
        pathClonerPath.property("path").expression =
          "thisComp.layer(\'" + pathLayerName + "\')" + path;
        layer.parent = selectedLayer;
        layer("ADBE Transform Group")("ADBE Position").setValue([0, 0, 0]);
        this.update(false);
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.reassignAfterRemove = function (cloner, activeCloners) {
      var deletedIndex = cloner.index;
      var len = activeCloners.length;
      for (var i = deletedIndex; i < len; i++) {
        if (i != deletedIndex) {
          var controller = activeCloners[i].controller;
          var expressionString =
            controller("ADBE Effect Parade").aecdata(1).expression;
          var clonerData = eval(
            expressionString.substring(
              expressionString.indexOf("["),
              expressionString.indexOf("]") + 1,
            ),
          );
          controller("ADBE Effect Parade").aecdata(1).expression =
            this.createDataExpression(
              clonerData[0] - 1,
              this.setDataFromExpression(clonerData),
            );
          var layersLen = activeCloners[i].layers.length;
          for (var k = 0; k < layersLen; k += 1) {
            var l = activeCloners[i].layers[k];
            var expressionString =
              l("ADBE Effect Parade").aecdata(1).expression;
            var layerData = eval(
              expressionString.substring(
                expressionString.indexOf("["),
                expressionString.indexOf("]") + 1,
              ),
            );
            l("ADBE Effect Parade").aecdata(1).expression =
              "//[\'" +
              (Number(layerData[0]) - 1) +
              "\', \'" +
              layerData[1] +
              "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          }
          var sourceLen = activeCloners[i].sourceLayers.length;
          for (var p = 0; p < sourceLen; p += 1) {
            var l = activeCloners[i].sourceLayers[p];
            var expressionString =
              l("ADBE Effect Parade").aecdata(1).expression;
            var layerData = eval(
              expressionString.substring(
                expressionString.indexOf("["),
                expressionString.indexOf("]") + 1,
              ),
            );
            l("ADBE Effect Parade").aecdata(1).expression =
              "//[\'" +
              (Number(layerData[0]) - 1) +
              "\', \'" +
              layerData[1] +
              "\', \'" +
              layerData[2] +
              "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          }
          var effectorsLen = activeCloners[i].effectors.length;
          for (var e = 0; e < effectorsLen; e += 1) {
            var l = activeCloners[i].effectors[e].layer;
            var expressionString =
              l("ADBE Effect Parade").aecdata(1).expression;
            var layerData = eval(
              expressionString.substring(
                expressionString.indexOf("["),
                expressionString.lastIndexOf("]") + 1,
              ),
            );
            var effectorData = this.setEffectorDataFromExpression(layerData);
            l("ADBE Effect Parade").aecdata(1).expression =
              this.createEffectorDataExpression(
                clonerData[0] - 1,
                layerData[2],
                this.setEffectorDataFromExpression(layerData),
              );
            activeCloners[i].effectors[e]
              .randomLayer("ADBE Effect Parade")
              .aecdata(1).expression =
              "//[\'" +
              (clonerData[0] - 1) +
              "\', \'random\', \'" +
              e +
              "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          }
        }
      }
    };
    this.addEffector = function () {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var cloner = aeCloner.selectedCloner;
        var effectors = cloner.effectors;
        var effectorIndex = cloner.effectors.length;
        app.beginUndoGroup("Add effector");
        this.launchProgressWindow();
        this.removeAllExpressionsFromLayers(cloner);
        utils.deselectAllLayers(comp);
        var effector = effectorFactory.createEffector(
          comp,
          utils.getAutoNameEffector(cloner, effectors),
          cloner,
          createEffectorData.type,
          createEffectorData.falloff,
        );
        effector("ADBE Effect Parade").aecdata(1).expression =
          this.createEffectorDataExpression(
            cloner.index,
            effectorIndex,
            createEffectorData,
          );
        if (effectors.length > 0) {
          effector.moveAfter(effectors[effectors.length - 1].layer);
        } else {
          effector.moveAfter(cloner.controller);
        }
        var randomLayer = comp.layers.addShape();
        randomLayer.name = utils.getAutoNameRandomLayer(aeCloner.activeCloners);
        randomLayer.shy = true;
        randomLayer.enabled = false;
        randomLayer.selected = false;
        randomLayer.moveAfter(cloner.controller);
        var randomAecSlider = randomLayer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        randomAecSlider.name = "aecdata";
        randomAecSlider(1).expression =
          "//[\'" +
          cloner.index +
          "\', \'random\', \'" +
          effectorIndex +
          "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
        effector.selected = true;
        this.update(false);
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.duplicateEffector = function (index) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        app.beginUndoGroup("Duplicate Effector");
        this.launchProgressWindow();
        utils.deselectAllLayers(app.project.activeItem);
        var cloner = aeCloner.selectedCloner;
        var effectors = cloner.effectors;
        var effector = cloner.effectors[index];
        var newEffectorLayer = effector.layer.duplicate();
        newEffectorLayer("ADBE Effect Parade").aecdata(1).expression =
          this.createEffectorDataExpression(
            cloner.index,
            effector.data.index + 1,
            effector.data,
          );
        var randomLayer = comp.layers.addShape();
        randomLayer.name = utils.getAutoNameRandomLayer(aeCloner.activeCloners);
        randomLayer.shy = true;
        randomLayer.enabled = false;
        randomLayer.selected = false;
        randomLayer.moveAfter(cloner.controller);
        var randomAecSlider = randomLayer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        randomAecSlider.name = "aecdata";
        randomAecSlider(1).expression =
          "//[\'" +
          cloner.index +
          "\', \'random\', \'" +
          effector.data.index +
          1 +
          "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
        aeCloner.update();
        var clonerIndex = cloner.index;
        cloners = this.getClonersInComp();
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.removeEffector = function (index) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var cloner = aeCloner.selectedCloner;
        var effectors = cloner.effectors;
        var effector = cloner.effectors[index];
        app.beginUndoGroup("Remove effector");
        this.launchProgressWindow();
        this.removeAllExpressionsFromLayers(cloner);
        for (var i = 0; i < cloner.layers.length; i += 1) {
          for (var k = 0; k < effector.data.customProperties.length; k += 1) {
            var path = effector.data.customProperties[k].path;
            var l = cloner.layers[i];
            var prop = eval("l.property" + path);
            prop.expression = "";
          }
        }
        effector.layer("ADBE Effect Parade").aecdata.remove();
        effector.randomLayer.remove();
        this.update(false);
        effector.layer.remove();
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.moveEffectorUp = function (index) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var cloner = aeCloner.selectedCloner;
        var effectors = cloner.effectors;
        app.beginUndoGroup("move effector up");
        this.launchProgressWindow();
        this.removeAllExpressionsFromLayers(cloner);
        if (index != 0 && effectors.length > 1) {
          var data1 = effectors[index].data;
          var data2 = effectors[index - 1].data;
          effectors[index].layer("ADBE Effect Parade").aecdata(1).expression =
            this.createEffectorDataExpression(cloner.index, index - 1, data1);
          effectors[index - 1]
            .layer("ADBE Effect Parade")
            .aecdata(1).expression = this.createEffectorDataExpression(
            cloner.index,
            index,
            data2,
          );
          effectors[index]
            .randomLayer("ADBE Effect Parade")
            .aecdata(1).expression =
            "//[\'" +
            cloner.index +
            "\', \'random\', \'" +
            (index - 1) +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          effectors[index - 1]
            .randomLayer("ADBE Effect Parade")
            .aecdata(1).expression =
            "//[\'" +
            cloner.index +
            "\', \'random\', \'" +
            index +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
        }
        this.update(false);
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.moveEffectorDown = function (index) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var cloner = aeCloner.selectedCloner;
        var effectors = cloner.effectors;
        app.beginUndoGroup("move effector down");
        this.launchProgressWindow();
        this.removeAllExpressionsFromLayers(cloner);
        if (index != effectors.length - 1 && effectors.length > 1) {
          var data1 = effectors[index].data;
          var data2 = effectors[index + 1].data;
          effectors[index].layer("ADBE Effect Parade").aecdata(1).expression =
            this.createEffectorDataExpression(cloner.index, index + 1, data1);
          effectors[index + 1]
            .layer("ADBE Effect Parade")
            .aecdata(1).expression = this.createEffectorDataExpression(
            cloner.index,
            index,
            data2,
          );
          effectors[index]
            .randomLayer("ADBE Effect Parade")
            .aecdata(1).expression =
            "//[\'" +
            cloner.index +
            "\', \'random\', \'" +
            index +
            1 +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
          effectors[index + 1]
            .randomLayer("ADBE Effect Parade")
            .aecdata(1).expression =
            "//[\'" +
            cloner.index +
            "\', \'random\', \'" +
            index +
            "\']\n\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t\t0;";
        }
        this.update(false);
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.addProperty = function (index) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 1) {
          throw this.noLayersErr;
        }
        var layer = selectedLayers[0];
        var selectedProperties = comp.selectedProperties;
        if (selectedProperties.length < 1) {
          throw this.noPropErr;
        }
        var cloner = aeCloner.selectedCloner;
        var effector = cloner.effectors[index];
        var data = effector.data;
        var property = selectedProperties[selectedProperties.length - 1];
        var type = utils.getPropertyType(property);
        var path = utils.getPropertyPath(property);
        var name = utils.getAutoNameCustomProperty(effector, property);
        if (type == "non") {
          throw this.noPropErr;
        }
        app.beginUndoGroup("Add custom property");
        this.launchProgressWindow();
        utils.deselectAllLayers(comp);
        if (!utils.checkPropertyExistence(effector, path)) {
          data.customProperties[data.customProperties.length] = {
            name: name,
            path: path,
            type: type,
          };
          cloner.effectors[index]
            .layer("ADBE Effect Parade")
            .aecdata(1).expression = this.createEffectorDataExpression(
            cloner.index,
            index,
            data,
          );
          switch (type) {
            case "1d":
              customEffect = "aecloner_custom1d";
              customEffectName = "Custom 1D";
              break;
            case "2d":
              customEffect = "aecloner_custom2d";
              customEffectName = "Custom 2D";
              break;
            case "3d":
              customEffect = "aecloner_custom3d";
              customEffectName = "Custom 3D";
              break;
            case "color":
              customEffect =
                data.type == "Random" || data.type == "Wiggle"
                  ? "aecloner_customcolorrandom"
                  : data.type == "Pulse" || data.type == "Noise"
                    ? "aecloner_customcolorpulse"
                    : "aecloner_customcolor";
              customEffectName =
                data.type == "Random" || data.type == "Wiggle"
                  ? "Custom Color Random"
                  : data.type == "Pulse" || data.type == "Noise"
                    ? "Custom Color Pulse"
                    : "Custom Color";
              break;
          }
          effector.layer.selected = true;
          var effect = effector.layer.applyPreset(
            this.presetNameToFile(customEffect),
          );
          effect = effector.layer("ADBE Effect Parade")(customEffectName);
          effect.name = name;
          effect.moveTo(data.customProperties.length + 1);
          this.update(false);
          layer.selected = false;
          effector.layer.selected = true;
        } else {
          throw this.propExistErr;
        }
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.removeProperty = function (index) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var selectedLayers = comp.selectedLayers;
        if (selectedLayers.length < 1) {
          throw this.noLayersErr;
        }
        var layer = selectedLayers[0];
        var selectedProperties = comp.selectedProperties;
        if (selectedProperties.length < 1) {
          throw this.noPropErr;
        }
        app.beginUndoGroup("Remove custom property");
        this.launchProgressWindow();
        var cloner = aeCloner.selectedCloner;
        var effector = cloner.effectors[index];
        var data = effector.data;
        var property = selectedProperties[selectedProperties.length - 1];
        var type = utils.getPropertyType(property);
        var path = utils.getPropertyPath(property);
        var name = utils.getAutoNameCustomProperty(effector, property);
        this.removeAllExpressionsFromLayers(cloner);
        for (var i = 0; i < cloner.layers.length; i += 1) {
          var l = cloner.layers[i];
          var prop = eval("l.property" + path);
          prop.expression = "";
        }
        for (var k = 0; k < data.customProperties.length; k += 1) {
          if (data.customProperties[k].path == path) {
            effector
              .layer("ADBE Effect Parade")(data.customProperties[k].name)
              .remove();
            data.customProperties.splice(k, 1);
            break;
          }
        }
        cloner.effectors[index]
          .layer("ADBE Effect Parade")
          .aecdata(1).expression = this.createEffectorDataExpression(
          cloner.index,
          index,
          data,
        );
        this.update(false);
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.updateEffector = function (index) {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var cloner = aeCloner.selectedCloner;
        var effector = cloner.effectors[index];
        var data = uiBuilder.getEffectorUpdateData();
        data.customProperties = effector.data.customProperties;
        app.beginUndoGroup("Change effector");
        this.launchProgressWindow();
        utils.deselectAllLayers(comp);
        this.removeAllExpressionsFromLayers(cloner);
        cloner.effectors[index]
          .layer("ADBE Effect Parade")
          .aecdata(1).expression = this.createEffectorDataExpression(
          cloner.index,
          index,
          data,
        );
        if (effector.data.falloff != data.falloff) {
          effectorFactory.updateEffectorFalloff(effector.layer, data.falloff);
        }
        if (effector.data.type != data.type) {
          utils.deselectAllLayers(comp);
          var currentData = {};
          currentData.positionX = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Position X").value;
          currentData.positionY = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Position Y").value;
          currentData.positionZ = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Position Z").value;
          currentData.scaleX = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Scale X").value;
          currentData.scaleY = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Scale Y").value;
          currentData.scaleZ = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Scale Z").value;
          currentData.uniformScale =
            effector.data.type == "Random" ||
            effector.data.type == "Wiggle" ||
            effector.data.type == "Noise"
              ? effector.layer("ADBE Effect Parade")(
                  effector.data.type + " Effector",
                )("Uniform Scale").value
              : true;
          currentData.rotationX = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Rotation X").value;
          currentData.rotationY = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Rotation Y").value;
          currentData.rotationZ = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Rotation Z").value;
          currentData.orientationX = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Orientation X").value;
          currentData.orientationY = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Orientation Y").value;
          currentData.orientationZ = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Orientation Z").value;
          currentData.anchorX = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Anchor X").value;
          currentData.anchorY = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Anchor Y").value;
          currentData.anchorZ = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Anchor Z").value;
          currentData.opacity = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Opacity").value;
          currentData.tintColor =
            effector.data.type == "Random" ||
            effector.data.type == "Wiggle" ||
            effector.data.type == "Pulse" ||
            effector.data.type == "Noise"
              ? effector.layer("ADBE Effect Parade")(
                  effector.data.type + " Effector",
                )("From Tint Color").value
              : effector.layer("ADBE Effect Parade")(
                  effector.data.type + " Effector",
                )("Tint Color").value;
          currentData.tintOpacity = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Tint Opacity").value;
          currentData.timeStart = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Time Start").value;
          currentData.timeEnd = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Time End").value;
          currentData.weight = effector.layer("ADBE Effect Parade")(
            effector.data.type + " Effector",
          )("Weight").value;
          effectorFactory.updateEffectorType(effector.layer, data.type, cloner);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Position X")
            .setValue(currentData.positionX);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Position Y")
            .setValue(currentData.positionY);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Position Z")
            .setValue(currentData.positionZ);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Scale X")
            .setValue(currentData.scaleX);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Scale Y")
            .setValue(currentData.scaleY);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Scale Z")
            .setValue(currentData.scaleZ);
          if (
            data.type == "Random" ||
            data.type == "Wiggle" ||
            data.type == "Noise"
          ) {
            effector
              .layer("ADBE Effect Parade")(data.type + " Effector")(
                "Uniform Scale",
              )
              .setValue(currentData.uniformScale);
          }
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Rotation X")
            .setValue(currentData.rotationX);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Rotation Y")
            .setValue(currentData.rotationY);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Rotation Z")
            .setValue(currentData.rotationZ);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")(
              "Orientation X",
            )
            .setValue(currentData.orientationX);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")(
              "Orientation Y",
            )
            .setValue(currentData.orientationY);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")(
              "Orientation Z",
            )
            .setValue(currentData.orientationZ);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Anchor X")
            .setValue(currentData.anchorX);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Anchor Y")
            .setValue(currentData.anchorY);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Anchor Z")
            .setValue(currentData.anchorZ);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Opacity")
            .setValue(currentData.opacity);
          if (
            data.type == "Random" ||
            data.type == "Wiggle" ||
            data.type == "Pulse" ||
            data.type == "Noise"
          ) {
            effector
              .layer("ADBE Effect Parade")(data.type + " Effector")(
                "From Tint Color",
              )
              .setValue(currentData.tintColor);
          } else {
            effector
              .layer("ADBE Effect Parade")(data.type + " Effector")(
                "Tint Color",
              )
              .setValue(currentData.tintColor);
          }
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")(
              "Tint Opacity",
            )
            .setValue(currentData.tintOpacity);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Time Start")
            .setValue(currentData.timeStart);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Time End")
            .setValue(currentData.timeEnd);
          effector
            .layer("ADBE Effect Parade")(data.type + " Effector")("Weight")
            .setValue(currentData.weight);
        }
        if (data.falloff == "Spherical") {
          uiBuilder.setThreeD(true);
          for (var i = 0; i < cloner.layers.length; i += 1) {
            cloner.layers[i].threeDLayer = true;
          }
          cloner.controller.threeDLayer = true;
          effector.layer.threeDLayer = true;
        }
        effector
          .layer("ADBE Effect Parade")("aecdata")
          .moveTo(effector.layer("ADBE Effect Parade").numProperties);
        this.update(false);
        this.closeProgressWindow();
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.createAudioSetup = function () {
      try {
        var comp = app.project.activeItem;
        if (!(app.project.activeItem instanceof CompItem)) {
          throw this.noCompErr;
        }
        var selectedLayer = comp.selectedLayers[0];
        app.beginUndoGroup("Create Audio Setup");
        var layer = comp.layers.addShape();
        layer.name = "Audio Setup";
        layer.moveToEnd();
        var rectGroup = layer("Contents").addProperty("ADBE Vector Group");
        rectGroup.name = "Rect";
        var rectRectangle = rectGroup("Contents").addProperty(
          "ADBE Vector Shape - Rect",
        );
        rectGroup("Contents")("ADBE Vector Shape - Rect")(
          "ADBE Vector Rect Size",
        ).setValue([comp.width, comp.height]);
        var rectFill = rectGroup("Contents").addProperty(
          "ADBE Vector Graphic - Fill",
        );
        rectFill("ADBE Vector Fill Color").setValue([0, 0, 0, 0]);
        var audioSpectrum =
          layer("ADBE Effect Parade").addProperty("ADBE AudSpect");
        var mosaic = layer("ADBE Effect Parade").addProperty("ADBE Mosaic");
        var levels =
          layer("ADBE Effect Parade").addProperty("ADBE Easy Levels2");
        var tint = layer("ADBE Effect Parade").addProperty("ADBE Tint");
        var radial = layer("ADBE Effect Parade").addProperty(
          "ADBE Polar Coordinates",
        );
        var transform =
          layer("ADBE Effect Parade").addProperty("ADBE Geometry2");
        var wideTime = layer("ADBE Effect Parade").addProperty("CC Wide Time");
        var numberOfClones = layer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        var startFrequency = layer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        var endFrequency = layer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        var power = layer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        var scale = layer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        var rotation = layer("ADBE Effect Parade").addProperty(
          "ADBE Slider Control",
        );
        audioSpectrum = layer.effect(1);
        mosaic = layer.effect(2);
        levels = layer.effect(3);
        tint = layer.effect(4);
        radial = layer.effect(5);
        transform = layer.effect(6);
        wideTime = layer.effect(7);
        numberOfClones = layer.effect(8);
        startFrequency = layer.effect(9);
        endFrequency = layer.effect(10);
        power = layer.effect(11);
        scale = layer.effect(12);
        rotation = layer.effect(13);
        radial.name = "Radial";
        numberOfClones.name = "Number of Clones";
        startFrequency.name = "Start Frequency";
        endFrequency.name = "End Frequency";
        power.name = "Power";
        scale.name = "Scale";
        rotation.name = "Rotation";
        numberOfClones(1).setValue(
          this.selectedCloner ? this.selectedCloner.data.count : 10,
        );
        startFrequency(1).setValue(20);
        endFrequency(1).setValue(2000);
        power(1).setValue(100);
        scale(1).setValue(100);
        if (
          selectedLayer &&
          selectedLayer instanceof AVLayer &&
          selectedLayer.hasAudio
        ) {
          audioSpectrum(1).setValue(selectedLayer.index);
        }
        audioSpectrum(2).expression =
          '[effect("Audio Spectrum")("Thickness")/2, thisComp.height/2];';
        audioSpectrum(3).expression =
          '[thisComp.width-effect("Audio Spectrum")("Thickness")/2, thisComp.height/2];';
        audioSpectrum(6).expression = 'effect("Start Frequency")("Slider")';
        audioSpectrum(7).expression = 'effect("End Frequency")("Slider")';
        audioSpectrum(8).expression = 'effect("Number of Clones")("Slider")';
        audioSpectrum(9).expression = 'effect("Power")("Slider")*100;';
        audioSpectrum(12).expression =
          'value = thisComp.width/effect("Number of Clones")("Slider")+1;';
        audioSpectrum(13).setValue(0);
        audioSpectrum(14).setValue([1, 1, 1]);
        audioSpectrum(15).setValue([1, 1, 1]);
        audioSpectrum(23).setValue(true);
        mosaic(1).expression = 'effect("Number of Clones")("Slider")';
        mosaic(2).setValue(1);
        tint(1).setValue([0.5, 0.5, 0.5]);
        radial.enabled =
          this.selectedCloner && this.selectedCloner.data.type == "Radial";
        radial(1).setValue(1);
        radial(2).setValue(1);
        transform(3).setValue(false);
        transform(5).expression = 'effect("Scale")("Slider")';
        transform(8).expression = 'effect("Rotation")("Slider")';
        wideTime(2).setValue(2);
        app.endUndoGroup();
      } catch (err) {
        utils.throwErr(err);
      }
    };
    this.launchProgressWindow = function (message) {
      if (!message) {
        message = "Updating cloner ...";
      }
      propgressWindow = new Window("palette");
      propgressWindow.orientation = "column";
      propgressWindow.alignChildren = "left";
      propgressWindow.add("statictext", undefined, message);
      progressBar = propgressWindow.add("progressbar");
      progressBar.size = [300, 5];
      progressBar.value = 0;
      propgressWindow.show();
      propgressWindow.update();
    };
    this.updateProgressWindow = function (value, baking, message) {
      progressBar.value = value;
      if (message) {
        propgressWindow.text = message;
      }
      if (baking) {
        propgressWindow.hide();
        propgressWindow.show();
      }
      propgressWindow.update();
    };
    this.closeProgressWindow = function () {
      if (propgressWindow) {
        propgressWindow.show();
      }
      if (propgressWindow) {
        propgressWindow.hide();
      }
    };
    this.launchTrialAlertWindow = function (message) {
      var trialWindow = new Window("palette");
      trialWindow.orientation = "column";
      trialWindow.alignChildren = "center";
      var text = trialWindow.add(
        "statictext",
        undefined,
        "Trial version works for 7 days only.",
        { multiline: true },
      );
      text.size = [250, 15];
      var bPurchase = trialWindow.add("button", undefined, "Purchase licence");
      var bClose = trialWindow.add("button", undefined, "Close window");
      bPurchase.onClick = function () {
        var utils = new Utils();
        utils.launchWebPage("http://aescripts.com/cloners-plus-effectors");
      };
      bClose.onClick = function () {
        trialWindow.close();
      };
      trialWindow.show();
    };
    this.run = function (thisObj) {
      basePanel = thisObj;
      if (isTrial) {
        var trialWindow = new Window("palette");
        trialWindow.orientation = "column";
        trialWindow.alignChildren = "center";
        var text = trialWindow.add(
          "statictext",
          undefined,
          "Thank you for downloading Cloners+Effectors.\rTrial version works for 7 days only.",
          { multiline: true },
        );
        text.size = [250, 30];
        var bPurchase = trialWindow.add(
          "button",
          undefined,
          "Purchase licence",
        );
        var bClose = trialWindow.add("button", undefined, "Close window");
        bPurchase.onClick = function () {
          var utils = new Utils();
          utils.launchWebPage("http://aescripts.com/cloners-plus-effectors");
        };
        bClose.onClick = function () {
          trialWindow.close();
        };
        trialWindow.show();
      }
      this.init();
      return this;
    };
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
    var wx = __BLOB__BLOB_000015__;
    var mx = __BLOB__BLOB_000016__;
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
  var aec7_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [],
    helpText: "This is the help docs. Use \n for new lines",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6940754532582305,
    productSKU: "CYCE-SUL",
    scriptAuthor: "Crunchy",
    scriptName: "Cloners + Effectors",
    scriptURL: "https://aescripts.com/cloners-plus-effectors/",
    scriptVersion: "1.2.6",
  };
  var aec7 = new a(aec7_settings);
  if (aec7.c()) {
    var isTrial = aec7.t();
    new AeCloner().run(thisObj);
  }
}
AeClonerMainFunction(this);
