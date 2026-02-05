/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function modio_Easy_arrows(thisObj) {
  function runScript(thisObj) {
    function deleteAllKeyframes(property) {
      var k = property.numKeys;
      while (k > 0) {
        property.removeKey(k);
        k--;
      }
    }
    function chooseColor() {
      var c = $.colorPicker().toString(16);
      c = hexToRGB(parseInt(c, 16));
      var r = c[0] / 255;
      var g = c[1] / 255;
      var b = c[2] / 255;
      if (r >= 0 && g >= 0 && b >= 0) {
        setButtonColor(win.colorBtn, r, g, b);
      }
    }
    function fillRect() {
      with (this) {
        graphics.drawOSControl();
        graphics.rectPath(0, 0, size[0], size[1]);
        graphics.fillPath(fillBrush);
      }
    }
    function setButtonColor(btn, r, g, b) {
      strokeColor[0] = r;
      strokeColor[1] = g;
      strokeColor[2] = b;
      btn.fillBrush = win.colorBtn.graphics.newBrush(
        win.colorBtn.graphics.BrushType.SOLID_COLOR,
        [r, g, b, 1],
      );
      btn.onDraw = fillRect;
    }
    function trialHelp() {
      helpDefaultTailWin = new Window(
        "palette",
        "Modio - " +
          modio_easy_arrows_data.scriptName +
          " v" +
          modio_easy_arrows_data.scriptVersion +
          " Help",
        [0, 0, 300, 130],
        { resizeable: true },
      );
      helpText =
        "Sorry, this function is not available in the trial version.\n\nPlease purchase to enjoy the full use of Easy Arrows.";
      helpDefaultTailWin.helpText = helpDefaultTailWin.add(
        "statictext",
        [
          10,
          10,
          helpDefaultTailWin.bounds.width - 20,
          helpDefaultTailWin.bounds.height - 20,
        ],
        helpText,
        { multiline: true },
      );
      helpDefaultTailWin.closed = helpDefaultTailWin.add(
        "button",
        [200, 90, 270, 110],
        "Close",
      );
      helpDefaultTailWin.closed.onClick = function () {
        helpDefaultTailWin.close();
      };
      helpDefaultTailWin.center();
      helpDefaultTailWin.show();
    }
    function helpFunction() {
      pnXZ.helpUI();
    }
    function defaultTailHelpFunction() {
      helpWin = new Window(
        "palette",
        "Modio - " +
          modio_easy_arrows_data.scriptName +
          " v" +
          modio_easy_arrows_data.scriptVersion +
          " Help",
        [0, 0, 300, 75],
        { resizeable: true },
      );
      helpText =
        "Check this box to add a default arrow to the end of your stroke.";
      helpWin.helpText = helpWin.add(
        "statictext",
        [10, 10, helpWin.bounds.width - 20, helpWin.bounds.height - 20],
        helpText,
        { multiline: true },
      );
      helpWin.closed = helpWin.add("button", [200, 35, 270, 55], "Close");
      helpWin.closed.onClick = function () {
        helpWin.close();
      };
      helpWin.center();
      helpWin.show();
    }
    function colorHelpFunction() {
      var helpWin = new Window(
        "palette",
        "Modio - " +
          modio_easy_arrows_data.scriptName +
          " v" +
          modio_easy_arrows_data.scriptVersion +
          " Help",
        [0, 0, 300, 75],
        { resizeable: true },
      );
      helpText = "Edit the color of the default arrow head(s) and stroke.";
      helpWin.helpText = helpWin.add(
        "statictext",
        [10, 10, helpWin.bounds.width - 20, helpWin.bounds.height - 20],
        helpText,
        { multiline: true },
      );
      helpWin.closed = helpWin.add("button", [200, 35, 270, 55], "Close");
      helpWin.closed.onClick = function () {
        helpWin.close();
      };
      helpWin.center();
      helpWin.show();
    }
    function precompHelpFunction() {
      helpPrecompWin = new Window(
        "palette",
        "Modio - " +
          modio_easy_arrows_data.scriptName +
          " v" +
          modio_easy_arrows_data.scriptVersion +
          " Help",
        [0, 0, 300, 75],
        { resizeable: true },
      );
      helpText =
        "Check this box for the Easy Arrows layers to be created in a new composition.";
      helpPrecompWin.helpText = helpPrecompWin.add(
        "statictext",
        [
          10,
          10,
          helpPrecompWin.bounds.width - 20,
          helpPrecompWin.bounds.height - 20,
        ],
        helpText,
        { multiline: true },
      );
      helpPrecompWin.closed = helpPrecompWin.add(
        "button",
        [200, 35, 270, 55],
        "Close",
      );
      helpPrecompWin.closed.onClick = function () {
        helpPrecompWin.close();
      };
      helpPrecompWin.center();
      helpPrecompWin.show();
    }
    function updateHelpFunction() {
      helpUpdateWin = new Window(
        "palette",
        "Modio - " +
          modio_easy_arrows_data.scriptName +
          " v" +
          modio_easy_arrows_data.scriptVersion +
          " Help",
        [0, 0, 300, 150],
        { resizeable: true },
      );
      helpText =
        'To change the Shape Layer path after the script has been run:\n\n1) Apply changes to your Shape Layer path.\n\n2) Click "Update Arrow".\n';
      helpUpdateWin.helpText = helpUpdateWin.add(
        "statictext",
        [
          10,
          10,
          helpUpdateWin.bounds.width - 20,
          helpUpdateWin.bounds.height - 20,
        ],
        helpText,
        { multiline: true },
      );
      helpUpdateWin.closed = helpUpdateWin.add(
        "button",
        [200, 100, 270, 120],
        "Close",
      );
      helpUpdateWin.closed.onClick = function () {
        helpUpdateWin.close();
      };
      helpUpdateWin.center();
      helpUpdateWin.show();
    }
    function makeUpdateChecks() {
      currentComp = app.project.activeItem;
      if (currentComp == null) {
        alert(
          "Please make your timeline window active, and select your arrow stroke layer",
        );
      } else {
        selectedLayers = currentComp.selectedLayers;
        selectedProperties = currentComp.selectedProperties;
        app.beginUndoGroup("Update Easy Arrows");
        updateArrow();
        app.endUndoGroup();
      }
    }
    function makeChecks() {
      currentComp = app.project.activeItem;
      selectedLayers = currentComp.selectedLayers;
      selectedProperties = currentComp.selectedProperties;
      if (selectedLayers.length >= 1 && selectedLayers.length <= 3) {
        app.beginUndoGroup("Easy Arrows");
        if (checkValidMasks()) {
          if (checkLayerNamesAndParents()) {
            easyArrows();
          }
        }
        app.endUndoGroup();
      } else {
        alert(
          "You must have one shape layer and (optionally) a head and tail layer selected",
        );
      }
    }
    function checkLayerNamesAndParents() {
      if (selectedLayers[0] != null) {
        if (selectedLayers[0].parent != null) {
          alert(selectedLayers[0].name + " can not have a parent layer");
          return 0;
        }
        for (var L = 1; L <= currentComp.layers.length; L += 1) {
          if (
            selectedLayers[0].name == currentComp.layers[L].name &&
            selectedLayers[0].index != currentComp.layers[L].index
          ) {
            alert(
              'There can only be one layer named "' +
                selectedLayers[0].name +
                '"',
            );
            return 0;
          }
          if (selectedLayers.length > 1) {
            if (selectedLayers[1].parent != null) {
              alert(selectedLayers[1].name + " can not have a parent layer");
              return 0;
            }
            if (
              selectedLayers[1].name == currentComp.layers[L].name &&
              selectedLayers[1].index != currentComp.layers[L].index
            ) {
              alert(
                'There can only be one layer named "' +
                  selectedLayers[1].name +
                  '"',
              );
              return 0;
            }
          }
        }
        return 1;
      } else {
        return 1;
      }
    }
    function arraysAreEqual(array1, array2) {
      if (!array1 || !array2) {
        return false;
      }
      if (array1.length != array2.length) {
        return false;
      }
      for (var i = 0, l = array1.length; i < l; i++) {
        if (array1[i] instanceof Array && array2[i] instanceof Array) {
          if (!arraysAreEqual(array1[i], array2[i])) {
            return false;
          }
        } else {
          if (array1[i] != array2[i]) {
            return false;
          }
        }
      }
      return true;
    }
    function getPropertyParentLayer(prop) {
      if (prop.matchName == "ADBE Vector Layer") {
        return prop;
      } else {
        if (prop.parentProperty != null) {
          return getPropertyParentLayer(prop.parentProperty);
        } else {
          return null;
        }
      }
    }
    function getPathParentExpressionCode(prop) {
      var exprCode = "";
      if (prop.matchName == "ADBE Vector Layer") {
        exprCode = 'thisComp.layer("' + prop.name + '")';
      } else {
        var propText = "";
        if (prop.matchName != "ADBE Vector Shape - Group") {
          propText = '("' + prop.name + '")';
        }
        exprCode = getPathParentExpressionCode(prop.parentProperty) + propText;
        maskPropArray.push(prop.name);
      }
      return exprCode;
    }
    function getProp(maskLayer, propNames) {
      var prop = maskLayer;
      for (var n = 0; n < propNames.length; n += 1) {
        prop = prop.property(propNames[n]);
      }
      return prop;
    }
    function checkShapeLayerNumPaths(shapeLayer, shapeLayerPaths) {
      for (var p = 1; p <= shapeLayer.numProperties; p += 1) {
        var testProp = shapeLayer.property(p);
        if (testProp.numProperties > 0) {
          if (
            testProp.matchName == "ADBE Vector Shape - Group" ||
            testProp.matchName == "ADBE Vector Shape - Rect" ||
            testProp.matchName == "ADBE Vector Shape - Ellipse" ||
            testProp.matchName == "ADBE Vector Shape - Star"
          ) {
            shapeLayerPaths.push(testProp);
          } else {
            checkShapeLayerNumPaths(testProp, shapeLayerPaths);
          }
        }
      }
    }
    function checkShapeGroupNumPaths(shapeGroup) {
      var numShapeLayerPaths = 0;
      for (var p = 1; p <= shapeGroup.numProperties; p += 1) {
        var testProp = shapeGroup.property(p);
        if (testProp.numProperties > 0) {
          if (
            testProp.matchName == "ADBE Vector Shape - Group" ||
            testProp.matchName == "ADBE Vector Shape - Rect" ||
            testProp.matchName == "ADBE Vector Shape - Ellipse" ||
            testProp.matchName == "ADBE Vector Shape - Star"
          ) {
            numShapeLayerPaths++;
          } else {
            numShapeLayerPaths += checkShapeGroupNumPaths(testProp);
          }
        }
      }
      return numShapeLayerPaths;
    }
    function checkValidMasks() {
      if (selectedLayers[0].matchName != "ADBE Vector Layer") {
        alert("Your first selected layer must be a shape layer");
        return 0;
      }
      var thisLayer = selectedLayers[0];
      var shapeLayerPaths = new Array();
      checkShapeLayerNumPaths(thisLayer, shapeLayerPaths);
      if (shapeLayerPaths.length != 1) {
        alert(
          "There can only be one shape layer path within the layer: " +
            thisLayer.name,
        );
        return 0;
      }
      var shapeLayerPath = shapeLayerPaths[0];
      selectedLayers.splice(0, 1);
      var maskLayerName = makeUniqueName("Arrow Stroke 1");
      thisLayer.name = maskLayerName;
      mask = shapeLayerPath;
      maskPropArray.length = 0;
      maskParentExprCode = getPathParentExpressionCode(mask);
      var A = maskPropArray;
      maskName = mask.name;
      maskPath = getMaskPathProperty(shapeLayerPath);
      maskLayer = thisLayer;
      maskLabel = maskLayer.label;
      var maskLayerAnchorPoint = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Anchor Point");
      var maskLayerPosition = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Position");
      var maskLayerOrientation = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Orientation");
      var maskLayerRotateX = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Rotate X");
      var maskLayerRotateY = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Rotate Y");
      var maskLayerRotateZ = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Rotate Z");
      var maskLayerScale = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Scale");
      if (
        !arraysAreEqual(maskLayerAnchorPoint.value, [0, 0, 0]) ||
        !arraysAreEqual(maskLayerPosition.value, [
          currentComp.width / 2,
          currentComp.height / 2,
          0,
        ]) ||
        !arraysAreEqual(maskLayerOrientation.value, [0, 0, 0]) ||
        !maskLayerRotateX.value == 0 ||
        !maskLayerRotateY.value == 0 ||
        !maskLayerRotateZ.value == 0 ||
        !arraysAreEqual(maskLayerScale.value, [100, 100, 100])
      ) {
        alert(
          "Please check that your Shape Layer:\n\n1) Is not parented to another layer\n2) Has its transform reset\n3) The Anchor Point is [0, 0]\n4) If there is a Transform Group within the Shape Layer, then its Anchor Point and Position must be [0, 0]",
        );
        return 0;
      }
      for (var L = 1; L <= currentComp.layers.length; L += 1) {
        var currentLayer = currentComp.layers[L];
        if (
          maskLayerName != "" &&
          maskLayerName == currentLayer.name &&
          currentLayer.index != maskLayer.index
        ) {
          alert("You can only have one layer named: " + maskLayerName);
          return 0;
        }
      }
      if (maskPath == null) {
        alert(
          "You must select a shape layer path\n The selected path can not be a shape layer rectangle, ellipse, star, etc.",
        );
        return 0;
      }
      var verts = maskPath.value.vertices;
      if (verts.length < 2) {
        alert(maskPath.parentProperty.name + " must have more than 1 point");
        return 0;
      }
      return 1;
    }
    function makeUniqueName(name) {
      var testingName = name;
      var newName = name;
      var allLayersLength = currentComp.layers.length;
      for (var L = 1; L <= allLayersLength; L += 1) {
        if (testingName == currentComp.layers[L].name) {
          newName = "";
          var nameNum = testingName.split(" ");
          var number = Number(nameNum[nameNum.length - 1]);
          if (!isNaN(number)) {
            number++;
          } else {
            number = 1;
          }
          nameNum[nameNum.length - 1] = number;
          newName = nameNum.join(" ");
          return makeUniqueName(newName);
        }
      }
      return newName;
    }
    function makeUniqueLayerName(name) {
      var controlNullName = name;
      var newName = name;
      var allLayersLength = currentComp.layers.length;
      for (var L = 1; L <= allLayersLength; L += 1) {
        if (controlNullName == currentComp.layers[L].name) {
          newName = "";
          var splitString = " Head";
          var nameSplit = controlNullName.lastIndexOf(splitString);
          var nameBegin = controlNullName.substring(0, nameSplit);
          var nameNum = controlNullName.substring(nameSplit).split(" Head ");
          var number = Number(nameNum[1]);
          if (!isNaN(number)) {
            number++;
          } else {
            number = 1;
          }
          nameBegin += splitString + " ";
          newName = nameBegin.concat(number);
          return makeUniqueLayerName(newName);
        }
      }
      return newName;
    }
    function checkLineIntersection(
      line1StartX,
      line1StartY,
      line1EndX,
      line1EndY,
      line2StartX,
      line2StartY,
      line2EndX,
      line2EndY,
    ) {
      var result = {
        distance: 0,
        forward: false,
        onLine1: false,
        onLine2: false,
        x: null,
        y: null,
      };
      denominator =
        (line2EndY - line2StartY) * (line1EndX - line1StartX) -
        (line2EndX - line2StartX) * (line1EndY - line1StartY);
      if (denominator == 0) {
        return result;
      }
      a = line1StartY - line2StartY;
      b = line1StartX - line2StartX;
      numerator1 =
        (line2EndX - line2StartX) * a - (line2EndY - line2StartY) * b;
      numerator2 =
        (line1EndX - line1StartX) * a - (line1EndY - line1StartY) * b;
      a = numerator1 / denominator;
      b = numerator2 / denominator;
      result.x = line1StartX + a * (line1EndX - line1StartX);
      result.y = line1StartY + a * (line1EndY - line1StartY);
      if (a >= 0) {
        result.forward = true;
        result.distance = lineDistance(
          { x: line1StartX, y: line1StartY },
          { x: result.x, y: result.y },
        );
      }
      if (a > 0 && a < 1) {
        result.onLine1 = true;
      }
      if (b > 0 && b < 1) {
        result.onLine2 = true;
      }
      return result;
    }
    function lineDistance(point1, point2) {
      var x = Math.pow(point2.x - point1.x, 2);
      var y = Math.pow(point2.y - point1.y, 2);
      return Math.sqrt(x + y);
    }
    function closestSide(
      line1StartX,
      line1StartY,
      line1EndX,
      line1EndY,
      sideExtension,
    ) {
      line1StartX += currentComp.width / 2;
      line1StartY += currentComp.height / 2;
      line1EndX += currentComp.width / 2;
      line1EndY += currentComp.height / 2;
      var leftSide = [
        -sideExtension,
        -sideExtension,
        -sideExtension,
        currentComp.height + sideExtension,
      ];
      var topSide = [
        -sideExtension,
        -sideExtension,
        currentComp.width,
        -sideExtension,
      ];
      var rightSide = [
        currentComp.width + sideExtension,
        -sideExtension,
        currentComp.width + sideExtension,
        currentComp.height + sideExtension,
      ];
      var bottomSide = [
        -sideExtension,
        currentComp.height + sideExtension,
        currentComp.width + sideExtension,
        currentComp.height + sideExtension,
      ];
      var compIntersectionLeft = checkLineIntersection(
        line1StartX,
        line1StartY,
        line1EndX,
        line1EndY,
        leftSide[0],
        leftSide[1],
        leftSide[2],
        leftSide[3],
      );
      var compIntersectionTop = checkLineIntersection(
        line1StartX,
        line1StartY,
        line1EndX,
        line1EndY,
        topSide[0],
        topSide[1],
        topSide[2],
        topSide[3],
      );
      var compIntersectionRight = checkLineIntersection(
        line1StartX,
        line1StartY,
        line1EndX,
        line1EndY,
        rightSide[0],
        rightSide[1],
        rightSide[2],
        rightSide[3],
      );
      var compIntersectionBottom = checkLineIntersection(
        line1StartX,
        line1StartY,
        line1EndX,
        line1EndY,
        bottomSide[0],
        bottomSide[1],
        bottomSide[2],
        bottomSide[3],
      );
      var intersections = new Array();
      if (compIntersectionLeft.forward) {
        intersections.push(compIntersectionLeft);
      }
      if (compIntersectionTop.forward) {
        intersections.push(compIntersectionTop);
      }
      if (compIntersectionRight.forward) {
        intersections.push(compIntersectionRight);
      }
      if (compIntersectionBottom.forward) {
        intersections.push(compIntersectionBottom);
      }
      if (intersections.length == 0) {
        return null;
      } else if (intersections.length == 1) {
        return intersections[0];
      } else {
        return intersections[0].distance <= intersections[1].distance
          ? intersections[0]
          : intersections[1];
      }
    }
    function subdivideMask(
      maskShape,
      vertsData,
      inTangentsData,
      outTangentsData,
      divisions,
    ) {
      var vertices = vertsData;
      var inTangents = inTangentsData;
      var outTangents = outTangentsData;
      var myDividedShape = maskShape;
      var dividedMaskVerts = new Array();
      var dividedKeyInTangents = new Array();
      var dividedKeyOutTangents = new Array();
      var split = 0.5;
      for (var i = 0; i < vertices.length - 1; i += 1) {
        dividedMaskVerts.push(vertices[i]);
        dividedKeyInTangents.push(inTangents[i] * 0.5);
        dividedKeyOutTangents.push(outTangents[i] * 0.5);
        var A = vertices[i];
        var D = vertices[i + 1];
        var B = outTangents[i] + A;
        var C = inTangents[i + 1] + D;
        var E = new Array();
        var F = new Array();
        var G = new Array();
        var H = new Array();
        var J = new Array();
        var K = new Array();
        E[0] = (A[0] + B[0]) * split;
        F[0] = (B[0] + C[0]) * split;
        G[0] = (C[0] + D[0]) * split;
        H[0] = (E[0] + F[0]) * split;
        J[0] = (F[0] + G[0]) * split;
        K[0] = (H[0] + J[0]) * split;
        E[1] = (A[1] + B[1]) * split;
        F[1] = (B[1] + C[1]) * split;
        G[1] = (C[1] + D[1]) * split;
        H[1] = (E[1] + F[1]) * split;
        J[1] = (F[1] + G[1]) * split;
        K[1] = (H[1] + J[1]) * split;
        dividedMaskVerts.push(K);
        dividedKeyInTangents.push(H - K);
        dividedKeyOutTangents.push(J - K);
      }
      dividedMaskVerts.push(vertices[vertices.length - 1]);
      dividedKeyInTangents.push(inTangents[inTangents.length - 1] * split);
      dividedKeyOutTangents.push(outTangents[outTangents.length - 1] * split);
      myDividedShape.vertices = dividedMaskVerts;
      myDividedShape.inTangents = dividedKeyInTangents;
      myDividedShape.outTangents = dividedKeyOutTangents;
      myDividedShape.closed = false;
      if (divisions > 0) {
        return subdivideMask(
          myDividedShape,
          dividedMaskVerts,
          dividedKeyInTangents,
          dividedKeyOutTangents,
          divisions - 1,
        );
      } else {
        return {
          inTangents: dividedKeyInTangents,
          outTangents: dividedKeyOutTangents,
          vertices: dividedMaskVerts,
        };
      }
    }
    function copyMasktoPath(
      maskLayer,
      thisMaskPath,
      controlNull,
      updating,
      maskPathArrow,
      maskExtensionLength,
    ) {
      var maskLayerPosition = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Position");
      var tempMaskName = thisMaskPath.parentProperty.name;
      var tempShape = thisMaskPath.value;
      var extendedShape = thisMaskPath.value;
      var tempExtendedShape = thisMaskPath.value;
      var originalMask = thisMaskPath.parentProperty;
      var originalMaskName = thisMaskPath.parentProperty.name;
      var originalMaskIndex = thisMaskPath.propertyIndex;
      var originalMaskShape = thisMaskPath.value;
      var originalMaskLocked = originalMask.locked;
      var originalMaskMode = originalMask.maskMode;
      var maskVerts = new Array();
      var maskVertsExtended = new Array();
      var keyInTangents = new Array();
      var keyInTangentsExtended = new Array();
      var keyOutTangents = new Array();
      var keyOutTangentsExtended = new Array();
      var times = new Array();
      var distances = { begin: 0, end: 0, total: 0 };
      if (tempShape.closed) {
        maskClosed = true;
        maskVerts = tempShape.vertices;
        keyInTangents = tempShape.inTangents;
        keyOutTangents = tempShape.outTangents;
        var numVerts = maskVerts.length;
        for (var V = 0; V < numVerts; V += 1) {
          maskVerts.push(maskVerts[V]);
          keyInTangents.push(keyInTangents[V]);
          keyOutTangents.push(keyOutTangents[V]);
        }
        for (var V = 0; V < numVerts; V += 1) {
          maskVerts.push(maskVerts[V]);
          keyInTangents.push(keyInTangents[V]);
          keyOutTangents.push(keyOutTangents[V]);
        }
        maskVerts.push(maskVerts[0]);
        keyInTangents.push(keyInTangents[0]);
        keyOutTangents.push(keyOutTangents[0]);
        tempShape.vertices = maskVerts;
        tempShape.inTangents = keyInTangents;
        tempShape.outTangents = keyOutTangents;
        var tempMask = subdivideMask(
          tempShape,
          maskVerts,
          keyInTangents,
          keyOutTangents,
          3,
        );
        for (var v = 0; v < tempMask.vertices.length - 1; v += 1) {
          distances.total += lineDistance(
            { x: tempMask.vertices[v][0], y: tempMask.vertices[v][1] },
            { x: tempMask.vertices[v + 1][0], y: tempMask.vertices[v + 1][1] },
          );
        }
      } else {
        maskClosed = false;
        for (var i = 1; i <= tempShape.vertices.length; i += 1) {
          var value = tempShape.vertices[i - 1];
          var keyInTangent = tempShape.inTangents[i - 1];
          var keyOutTangent = tempShape.outTangents[i - 1];
          maskVerts.push([value[0], value[1]]);
          keyInTangents.push([keyInTangent[0], keyInTangent[1]]);
          keyOutTangents.push([keyOutTangent[0], keyOutTangent[1]]);
          maskVertsExtended.push([value[0], value[1]]);
          keyInTangentsExtended.push([keyInTangent[0], keyInTangent[1]]);
          keyOutTangentsExtended.push([keyOutTangent[0], keyOutTangent[1]]);
        }
        extendedShape.vertices = maskVertsExtended;
        extendedShape.inTangents = keyInTangentsExtended;
        extendedShape.outTangents = keyOutTangentsExtended;
        tempExtendedShape.vertices = extendedShape.vertices;
        tempExtendedShape.inTangents = extendedShape.inTangents;
        tempExtendedShape.outTangents = extendedShape.outTangents;
        var tempMask = subdivideMask(
          tempExtendedShape,
          maskVertsExtended,
          keyInTangentsExtended,
          keyOutTangentsExtended,
          3,
        );
        for (var v = 0; v < tempMask.vertices.length - 1; v += 1) {
          distances.total += lineDistance(
            { x: tempMask.vertices[v][0], y: tempMask.vertices[v][1] },
            { x: tempMask.vertices[v + 1][0], y: tempMask.vertices[v + 1][1] },
          );
        }
        tempShape = extendedShape;
        maskVerts = maskVertsExtended;
        keyInTangents = keyInTangentsExtended;
        keyOutTangents = keyOutTangentsExtended;
      }
      if (!updating) {
        var shapeGroup = getProp(maskLayer, maskPropArray).parentProperty
          .parentProperty;
      }
      for (var k = 0; k < maskVerts.length; k += 1) {
        keyInTangents[k][2] = keyOutTangents[k][2] = 0;
        times[k] = (1 / (maskVerts.length - 1)) * k;
      }
      var controlNullPosition = controlNull
        .property("ADBE Transform Group")
        .property("ADBE Position");
      var adjustedMaskVerts = new Array();
      for (var i = 0; i < maskVerts.length; i += 1) {
        adjustedMaskVerts.push([
          maskVerts[i][0] + currentComp.width / 2,
          maskVerts[i][1] + currentComp.height / 2,
        ]);
      }
      controlNullPosition.setValuesAtTimes(times, adjustedMaskVerts);
      for (var k = 0; k < maskVerts.length; k += 1) {
        var idx = controlNullPosition.nearestKeyIndex(times[k]);
        controlNullPosition.setSpatialTangentsAtKey(
          idx,
          keyInTangents[k],
          keyOutTangents[k],
        );
      }
      for (var k = 0; k < maskVerts.length - 1; k += 1) {
        var idx = controlNullPosition.nearestKeyIndex(times[k]);
        controlNullPosition.setRovingAtKey(idx, true);
      }
      distances.total /= 2;
      return distances;
    }
    function searchArray(array, item) {
      var index = -1;
      for (var i = array.length - 1; i >= 0; i--) {
        if (array[i][0] == item) {
          index = i;
          break;
        }
      }
      return index;
    }
    function getMaskPathProperty(prop) {
      var propDepth = prop.propertyDepth;
      for (var i = 1; i <= propDepth; i += 1) {
        var A = prop.property(i).matchName;
        if (prop.property(i).matchName == "ADBE Vector Shape") {
          return prop.property(i);
        }
      }
      alert("Sorry, the shape layer property returned nothing");
      return null;
    }
    function displayProperties(property) {
      for (var i = 1; i <= property.numProperties; i += 1) {
        alert(
          i +
            ", name: " +
            property(i).name +
            ", matchName: " +
            property(i).matchName,
        );
      }
    }
    function createDefaultArrowMask(maskLayer, layerName) {
      var newMaskLayer = currentComp.layers.addSolid(
        strokeColor,
        makeUniqueLayerName(layerName),
        currentComp.width,
        currentComp.height,
        currentComp.pixelAspect,
        currentComp.duration,
      );
      newMaskLayer.label = maskLayer.label;
      var mask = newMaskLayer
        .property("ADBE Mask Parade")
        .addProperty("ADBE Mask Atom");
      var maskShape = mask.property("ADBE Mask Shape");
      var shape = maskShape.value;
      var maskVerts = new Array();
      layerCenter = [currentComp.width / 2, currentComp.height / 2];
      defaultSize = maskLayer.width;
      boundingBox = [defaultSize / 4, defaultSize / 8];
      maskVerts.push([-0.75, defaultSize / 8]);
      maskVerts.push([defaultSize / 12 - 0.75, defaultSize / 16]);
      maskVerts.push([-0.75, 0]);
      for (var i = 0; i < maskVerts.length; i += 1) {
        maskVerts[i][0] += layerCenter[0];
        maskVerts[i][1] += layerCenter[1];
        maskVerts[i][1] -= boundingBox[1] / 2;
      }
      shape.vertices = maskVerts;
      shape.closed = true;
      maskShape.setValue(shape);
      return newMaskLayer;
    }
    function findPropertyByName(prop, name, matchedProps) {
      for (var p = 1; p <= prop.numProperties; p += 1) {
        if (prop.property(p).name == name) {
          matchedProps.push(prop.property(p));
        } else {
          if (prop.property(p).numProperties > 0) {
            findPropertyByName(prop.property(p), name, matchedProps);
          }
        }
      }
    }
    function findPropertyByMatchName(prop, matchName, matchedProps) {
      for (var p = 1; p <= prop.numProperties; p += 1) {
        if (prop.property(p).matchName == matchName) {
          matchedProps.push(prop.property(p));
        } else {
          if (prop.property(p).numProperties > 0) {
            findPropertyByMatchName(prop.property(p), matchName, matchedProps);
          }
        }
      }
    }
    function updateArrow() {
      var currentComp = app.project.activeItem;
      var selectedLayer = currentComp.selectedLayers;
      var addDefaultTail = win.defaultTailCB.value;
      var tailLayerExists = false;
      if (selectedLayer.length != 1) {
        alert(
          "Please select the arrow head layer or the updated shape layer path",
        );
        return 0;
      }
      if (
        selectedLayer[0].matchName != "ADBE Vector Layer" &&
        selectedLayer[0].matchName != "ADBE AV Layer"
      ) {
        alert(
          "Are you sure this is the Easy Arrows layer?\n\nThis is not the Arrow Head layer or a Shape Layer, the script can not continue.",
        );
        return 0;
      }
      var foundEasyArrowsExpression = false;
      var selectedLayerType = 0;
      if (selectedLayer[0].matchName == "ADBE Vector Layer") {
        var trimProps = new Array();
        findPropertyByMatchName(
          selectedLayer[0],
          "ADBE Vector Filter - Trim",
          trimProps,
        );
        if (trimProps.length == 0) {
          alert(
            "Are you sure this is the Easy Arrows layer?\n\nThere is no Trim Paths property on this layer, the script can not continue.",
          );
          return 0;
        }
        selectedLayerType = 1;
        for (var t = 0; t < trimProps.length; t += 1) {
          var trimProp = trimProps[t];
          updatedShapeTrimStart = trimProp.property("ADBE Vector Trim Start");
          expressionLines = updatedShapeTrimStart.expression.split("\n");
          if (expressionLines.length > 2) {
            foundEasyArrowsExpression = true;
            break;
          }
        }
      } else {
        if (selectedLayer[0].matchName == "ADBE AV Layer") {
          if (
            selectedLayer[0]
              .property("ADBE Transform Group")
              .property("ADBE Position").expression == ""
          ) {
            alert(
              "Are you sure this is the Easy Arrows layer?\n\nThere is no expression on position, the script can not continue.",
            );
            return 0;
          }
          expressionLines = selectedLayer[0]
            .property("ADBE Transform Group")
            .property("ADBE Position")
            .expression.split("\n");
          if (expressionLines.length > 2) {
            foundEasyArrowsExpression = true;
          }
          selectedLayerType = 0;
        }
      }
      if (!foundEasyArrowsExpression) {
        alert(
          'Are you sure this is an Easy Arrows shape layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Missing layer name details)\nThe script can not continue.',
        );
        return 0;
      }
      var headLayerData = expressionLines[0];
      var nullLayerData = expressionLines[1];
      var maskLayerData = expressionLines[2].split('"');
      var tailLayerData = expressionLines[7];
      var layerNameExpr = new RegExp(/"(.*)"/);
      var headLayerNameMatchData = headLayerData.match(layerNameExpr);
      var nullLayerNameMatchData = nullLayerData.match(layerNameExpr);
      var maskLayerNameMatchData = maskLayerData[1];
      var maskNameMatchData = maskLayerData[maskLayerData.length - 2];
      if (headLayerNameMatchData == null) {
        alert(
          'Are you sure this is an Easy Arrows shape layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Arrow Head Layer data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      if (headLayerNameMatchData[1] == null) {
        alert(
          'Are you sure this is an Easy Arrows shape layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Arrow Head data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      if (nullLayerNameMatchData == null) {
        alert(
          'Are you sure this is an Easy Arrows shape layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Null Layer data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      if (nullLayerNameMatchData[1] == null) {
        alert(
          'Are you sure this is an Easy Arrows shape layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Null Layer data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      if (maskLayerNameMatchData == null) {
        alert(
          'Are you sure this is the Arrow Head layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Mask Layer data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      if (maskLayerNameMatchData[1] == null) {
        alert(
          'Are you sure this is the Arrow Head layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Mask Layer data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      if (maskNameMatchData == null) {
        alert(
          'Are you sure this is the Arrow Head layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Mask shape data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      if (maskNameMatchData[1] == null) {
        alert(
          'Are you sure this is the Arrow Head layer?\n\nThe Easy Arrow expression on the "' +
            selectedLayer[0].name +
            '" layer is not correct.\n(Mask shape data is missing)\nThe script can not continue.',
        );
        return 0;
      }
      var headLayerName = headLayerNameMatchData[1];
      var nullLayerName = nullLayerNameMatchData[1];
      var maskLayerName = maskLayerNameMatchData;
      var maskName = maskNameMatchData;
      var maskNameArrow = maskName + controlMaskNameAdd;
      var tailLayerName = "";
      if (tailLayerData != "") {
        var tailLayerNameMatchData = tailLayerData.match(layerNameExpr);
        if (
          tailLayerNameMatchData == null ||
          tailLayerNameMatchData[1] == null
        ) {
          alert(
            'Are you sure this is the Arrow Head layer?\n\nThe Easy Arrow expression on the "' +
              selectedLayer[0].name +
              '" layer is not correct.\n(Tail layer data is missing)\nThe script can not continue.',
          );
          return 0;
        }
        tailLayerName = tailLayerNameMatchData[1];
        if (tailLayerName != "") {
          tailLayerExists = true;
        }
      }
      var matchingHeadLayers = 0;
      var matchingNullLayers = 0;
      var matchingMaskLayers = 0;
      var matchingTailLayers = 0;
      for (var L = 1; L <= currentComp.layers.length; L += 1) {
        if (currentComp.layers[L].name == headLayerName) {
          matchingHeadLayers++;
        }
        if (
          currentComp.layers[L].nullLayer &&
          currentComp.layers[L].name == nullLayerName
        ) {
          matchingNullLayers++;
        }
        if (currentComp.layers[L].name == maskLayerName) {
          matchingMaskLayers++;
        }
        if (currentComp.layers[L].name == tailLayerName && tailLayerExists) {
          matchingTailLayers++;
        }
      }
      if (matchingHeadLayers == 0) {
        alert(
          'Sorry, the Arrow Head layer named: "' +
            headLayerName +
            '" does not exist.\nThe script can not continue.',
        );
        return 0;
      } else {
        if (matchingNullLayers > 1) {
          alert('There can only be one layer named: "' + headLayerName + '"');
          return 0;
        }
      }
      if (matchingNullLayers == 0) {
        alert(
          'Sorry, the null layer named: "' +
            nullLayerName +
            '" does not exist.\nThe script can not continue.',
        );
        return 0;
      } else {
        if (matchingNullLayers > 1) {
          alert(
            'There can only be one null layer named: "' + nullLayerName + '"',
          );
          return 0;
        }
      }
      if (matchingMaskLayers == 0) {
        alert(
          'Sorry, the shape layer named: "' +
            maskLayerName +
            '" does not exist.\nThe script can not continue.',
        );
        return 0;
      } else {
        if (matchingMaskLayers > 1) {
          alert(
            'There can only be one shape layer named: "' + maskLayerName + '"',
          );
          return 0;
        }
      }
      if (tailLayerExists) {
        if (matchingTailLayers == 0) {
          alert(
            'Sorry, the tail layer named: "' +
              tailLayerName +
              '" does not exist.\nThe script can not continue.',
          );
          return 0;
        } else {
          if (matchingTailLayers > 1) {
            alert('There can only be one layer named: "' + tailLayerName + '"');
            return 0;
          }
        }
      }
      var headLayer = currentComp.layer(headLayerName);
      var controlNull = currentComp.layer(nullLayerName);
      var maskLayer = currentComp.layer(maskLayerName);
      if (selectedLayerType == 0) {
        var trimProps = new Array();
        findPropertyByMatchName(
          maskLayer,
          "ADBE Vector Filter - Trim",
          trimProps,
        );
        for (var t = 0; t < trimProps.length; t += 1) {
          var trimProp = trimProps[t];
          updatedShapeTrimStart = trimProp.property("ADBE Vector Trim Start");
          expressionLines = updatedShapeTrimStart.expression.split("\n");
          if (expressionLines.length > 2) {
            foundEasyArrowsExpression = true;
            break;
          }
        }
      }
      var pathProps = new Array();
      findPropertyByName(maskLayer, maskName, pathProps);
      var arrowPaths = pathProps[0].parentProperty;
      maskPropArray.length = 0;
      maskParentExprCode = getPathParentExpressionCode(arrowPaths.property(1));
      var shapeGroup = getProp(maskLayer, maskPropArray).parentProperty
        .parentProperty;
      var shapeStroke = shapeGroup
        .property("ADBE Vectors Group")
        .property("ADBE Vector Graphic - Stroke");
      var shapeStrokeColor = shapeStroke.property("ADBE Vector Stroke Color");
      shapeStrokeColor.setValue(strokeColor);
      var matchingMaskShapes = 0;
      var matchingMaskArrowShapes = 0;
      for (var M = 1; M <= arrowPaths.numProperties; M += 1) {
        var A = arrowPaths.property(M);
        if (arrowPaths.property(M).name == maskName) {
          maskShapeOriginal = arrowPaths
            .property(M)
            .property("ADBE Vector Shape");
          matchingMaskShapes++;
        }
      }
      if (matchingMaskShapes == 0) {
        alert(
          'Sorry, the path named: "' +
            maskName +
            '" does not exist on layer "' +
            maskLayerName +
            '".\nThe script can not continue.',
        );
        return 0;
      } else {
        if (matchingMaskShapes > 1) {
          alert(
            'There is more than one path named: "' +
              maskName +
              '" on layer "' +
              maskLayerName +
              '".\nThe script can only run if there is a single path named "' +
              maskLayerName +
              '" on that layer.',
          );
          return 0;
        }
      }
      var selectedLayerHeadPosition = headLayer
        .property("ADBE Transform Group")
        .property("ADBE Position");
      var selectedLayerHeadRotation = headLayer
        .property("ADBE Transform Group")
        .property("ADBE Rotate Z");
      var tailLayer = currentComp.layer(tailLayerName);
      if (tailLayerExists) {
        selectedLayerTailPosition = tailLayer
          .property("ADBE Transform Group")
          .property("ADBE Position");
        selectedLayerTailRotation = tailLayer
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z");
      }
      var trimStart = updatedShapeTrimStart;
      var trimEnd = updatedShapeTrimStart.parentProperty.property(
        "ADBE Vector Trim End",
      );
      var expressionLinesHeadPosition =
        selectedLayerHeadPosition.expression.split("\n");
      var expressionLinesHeadRotation =
        selectedLayerHeadRotation.expression.split("\n");
      if (tailLayerExists) {
        expressionLinesTailPosition =
          selectedLayerTailPosition.expression.split("\n");
        expressionLinesTailRotation =
          selectedLayerTailRotation.expression.split("\n");
      }
      var expressionLinesStart = trimStart.expression.split("\n");
      var expressionLinesEnd = trimEnd.expression.split("\n");
      deleteAllKeyframes(
        controlNull.property("ADBE Transform Group").property("ADBE Position"),
      );
      var tailLayerLength = 100;
      if (tailLayerExists) {
        var tailBounds = tailLayer.sourceRectAtTime(currentComp.time, true);
        var tailDiagLength = lineDistance(
          { x: tailBounds.left, y: tailBounds.top },
          {
            x: tailBounds.left + tailBounds.width,
            y: tailBounds.top + tailBounds.height,
          },
        );
        tailLayerLength = tailDiagLength / 2;
      }
      var addedDistances = copyMasktoPath(
        maskLayer,
        maskShapeOriginal,
        controlNull,
        true,
        maskShapeOriginal,
        tailLayerLength,
      );
      var newTailLayer = "";
      if (!tailLayerExists && addDefaultTail && !isTrial) {
        newTailLayer = updateAddDefaultTailLayer(
          addedDistances,
          maskClosed,
          headLayer,
          controlNull,
          maskLayer,
          arrowPaths.property(1),
        );
      }
      expressionLinesHeadPosition[3] =
        "totalDistance = " + addedDistances.total + ";";
      expressionLinesHeadPosition[4] =
        "beginAddedDistance = " + addedDistances.begin + ";";
      expressionLinesHeadPosition[5] =
        "endAddedDistance = " + addedDistances.end + ";";
      expressionLinesHeadPosition[6] = "maskClosed = " + maskClosed + ";";
      if (!tailLayerExists && addDefaultTail && !isTrial) {
        expressionLinesHeadPosition[7] =
          'tailLayerName = thisComp.layer("' + newTailLayer.name + '");';
      }
      expressionLinesHeadRotation[0] =
        "totalDistance = " + addedDistances.total + ";";
      expressionLinesHeadRotation[1] =
        "beginAddedDistance = " + addedDistances.begin + ";";
      expressionLinesHeadRotation[2] =
        "endAddedDistance = " + addedDistances.end + ";";
      expressionLinesHeadRotation[3] = "maskClosed = " + maskClosed + ";";
      if (tailLayerExists) {
        expressionLinesTailPosition[0] =
          "totalDistance = " + addedDistances.total + ";";
        expressionLinesTailPosition[1] =
          "beginAddedDistance = " + addedDistances.begin + ";";
        expressionLinesTailPosition[2] =
          "endAddedDistance = " + addedDistances.end + ";";
        expressionLinesTailPosition[3] = "maskClosed = " + maskClosed + ";";
        expressionLinesTailRotation[0] =
          "totalDistance = " + addedDistances.total + ";";
        expressionLinesTailRotation[1] =
          "beginAddedDistance = " + addedDistances.begin + ";";
        expressionLinesTailRotation[2] =
          "endAddedDistance = " + addedDistances.end + ";";
        expressionLinesTailRotation[3] = "maskClosed = " + maskClosed + ";";
      }
      expressionLinesStart[3] = "totalDistance = " + addedDistances.total + ";";
      expressionLinesStart[4] =
        "beginAddedDistance = " + addedDistances.begin + ";";
      expressionLinesStart[5] =
        "endAddedDistance = " + addedDistances.end + ";";
      expressionLinesStart[6] = "maskClosed = " + maskClosed + ";";
      if (!tailLayerExists && addDefaultTail && !isTrial) {
        expressionLinesStart[7] =
          'tailLayerName = thisComp.layer("' + newTailLayer.name + '");';
      }
      expressionLinesEnd[0] = "totalDistance = " + addedDistances.total + ";";
      expressionLinesEnd[1] =
        "beginAddedDistance = " + addedDistances.begin + ";";
      expressionLinesEnd[2] = "endAddedDistance = " + addedDistances.end + ";";
      expressionLinesEnd[3] = "maskClosed = " + maskClosed + ";";
      var updatedExpressionHeadPosition = "";
      var updatedExpressionHeadRotation = "";
      var updatedExpressionTailPosition = "";
      var updatedExpressionTailRotation = "";
      var updatedExpressionStart = "";
      var updatedExpressionEnd = "";
      for (var e = 0; e < expressionLinesHeadPosition.length; e += 1) {
        updatedExpressionHeadPosition += expressionLinesHeadPosition[e] + "\n";
      }
      for (var e = 0; e < expressionLinesHeadRotation.length; e += 1) {
        updatedExpressionHeadRotation += expressionLinesHeadRotation[e] + "\n";
      }
      if (tailLayerExists) {
        for (var e = 0; e < expressionLinesTailPosition.length; e += 1) {
          updatedExpressionTailPosition +=
            expressionLinesTailPosition[e] + "\n";
        }
        for (var e = 0; e < expressionLinesTailRotation.length; e += 1) {
          updatedExpressionTailRotation +=
            expressionLinesTailRotation[e] + "\n";
        }
      }
      for (var e = 0; e < expressionLinesStart.length; e += 1) {
        updatedExpressionStart += expressionLinesStart[e] + "\n";
      }
      for (var e = 0; e < expressionLinesEnd.length; e += 1) {
        updatedExpressionEnd += expressionLinesEnd[e] + "\n";
      }
      selectedLayerHeadPosition.expression = updatedExpressionHeadPosition;
      selectedLayerHeadRotation.expression = updatedExpressionHeadRotation;
      if (tailLayerExists) {
        selectedLayerTailPosition.expression = updatedExpressionTailPosition;
        selectedLayerTailRotation.expression = updatedExpressionTailRotation;
      }
      trimStart.expression = updatedExpressionStart;
      trimEnd.expression = updatedExpressionEnd;
      var precompose_layers = new Array();
      if (win.precompCB.value == 1) {
        precompose_layers[precompose_layers.length] = headLayer.index;
        precompose_layers[precompose_layers.length] = maskLayer.index;
        precompose_layers[precompose_layers.length] = controlNull.index;
        if (tailLayerExists) {
          precompose_layers[precompose_layers.length] = tailLayer.index;
        } else {
          if (newTailLayer != "") {
            precompose_layers[precompose_layers.length] = newTailLayer.index;
          }
        }
        var easyArrowPrecomp = currentComp.layers.precompose(
          precompose_layers,
          "Easy Arrow [" + maskName + "]",
          true,
        );
      }
      for (var L in currentComp.selectedLayers) {
        if (currentComp.selectedLayers.hasOwnProperty(L)) {
          var a = currentComp.selectedLayers[L];
          if (currentComp.selectedLayers[L] != selectedLayer[0]) {
            currentComp.selectedLayers[L].selected = false;
          }
        }
      }
    }
    function updateAddDefaultTailLayer(
      addedDistances,
      maskClosed,
      headLayer,
      controlNull,
      maskLayer,
      mask,
    ) {
      tailLayer = createDefaultArrowMask(
        maskLayer,
        makeUniqueName("Arrow Tail 1"),
      );
      tailLayer.collapseTransformation = true;
      tailLayer.moveBefore(maskLayer);
      tailLayerPosition = tailLayer
        .property("ADBE Transform Group")
        .property("ADBE Position");
      tailLayerPosition.setValue([0, 0]);
      tailLayerRotation = tailLayer
        .property("ADBE Transform Group")
        .property("ADBE Rotate Z");
      tailLayerRotation.setValue(180);
      var tailLayerLength = 100;
      var tailBounds = tailLayer.sourceRectAtTime(currentComp.time, true);
      var tailDiagLength = lineDistance(
        { x: tailBounds.left, y: tailBounds.top },
        {
          x: tailBounds.left + tailBounds.width,
          y: tailBounds.top + tailBounds.height,
        },
      );
      tailLayerLength = tailDiagLength / 2;
      maskPropArray.length = 0;
      maskParentExprCode = getPathParentExpressionCode(mask);
      var shapeGroup = getProp(maskLayer, maskPropArray).parentProperty
        .parentProperty;
      var shapeStroke = shapeGroup
        .property("ADBE Vectors Group")
        .property("ADBE Vector Graphic - Stroke");
      var fillEffect = tailLayer("ADBE Effect Parade").addProperty("ADBE Fill");
      var fillName = "Easy Arrow Color";
      fillEffect.name = fillName;
      var colorPicker = tailLayer
        .property("ADBE Effect Parade")
        .property(1)
        .property("ADBE Fill-0002");
      var colorOpacity = tailLayer
        .property("ADBE Effect Parade")
        .property(1)
        .property("ADBE Fill-0005");
      if (colorPicker.canSetExpression) {
        var colorExpression =
          'thisComp.layer("' +
          headLayer.name +
          '")("ADBE Effect Parade")("' +
          fillName +
          '")("' +
          colorPicker.matchName +
          '");';
        colorPicker.expression = colorExpression;
        colorPicker.expressionEnabled = true;
      }
      if (colorOpacity.canSetExpression) {
        var expression =
          'thisComp.layer("' +
          headLayer.name +
          '")("ADBE Effect Parade")("' +
          fillName +
          '")("' +
          colorOpacity.matchName +
          '");';
        colorOpacity.expression = expression;
        colorOpacity.expressionEnabled = true;
      }
      createTailLayerExpression(
        tailLayer,
        addedDistances,
        maskClosed,
        headLayer,
        headLayer,
        controlNull,
        shapeStroke,
        maskParentExprCode,
      );
      return tailLayer;
    }
    function easyArrows() {
      var currentComp = app.project.activeItem;
      var compName = currentComp.name;
      var thisControlNull = currentComp.layers.addNull();
      var A = selectedLayers;
      var precompose_layers = new Array();
      thisControlNull.label = maskLabel;
      var maskLayerPosition = maskLayer
        .property("ADBE Transform Group")
        .property("ADBE Position");
      if (selectedLayers.length == 0) {
        selectedLayers[0] = createDefaultArrowMask(
          maskLayer,
          makeUniqueName("Arrow Head 1"),
        );
        selectedLayers[0].collapseTransformation = true;
        selectedLayers[0].moveBefore(maskLayer);
      }
      if (selectedLayers.length != 2) {
        if (win.defaultTailCB.value == 1) {
          selectedLayers[1] = createDefaultArrowMask(
            maskLayer,
            makeUniqueName("Arrow Tail 1"),
          );
          selectedLayers[1].collapseTransformation = true;
          selectedLayers[1].moveBefore(maskLayer);
          tailLayerRotation = selectedLayers[1]
            .property("ADBE Transform Group")
            .property("ADBE Rotate Z");
          tailLayerRotation.setValue(180);
        }
      }
      var tailLayerLength = 100;
      if (selectedLayers.length > 1 && !isTrial) {
        tailLayer = selectedLayers[1];
        var tailBounds = tailLayer.sourceRectAtTime(currentComp.time, true);
        var tailDiagLength = lineDistance(
          { x: tailBounds.left, y: tailBounds.top },
          {
            x: tailBounds.left + tailBounds.width,
            y: tailBounds.top + tailBounds.height,
          },
        );
        tailLayerLength = tailDiagLength / 2;
      }
      var addedDistances = copyMasktoPath(
        maskLayer,
        maskPath,
        thisControlNull,
        false,
        null,
        tailLayerLength,
      );
      thisControlNull.moveAfter(maskLayer);
      currentComp.layers[thisControlNull.index].selected = false;
      thisControlNull.name = makeUniqueName(
        "Arrow Expression [" + maskName + "] - Do Not Edit",
      );
      thisControlNull.source.name = thisControlNull.name;
      thisControlNull.locked = true;
      thisControlNull.enabled = false;
      thisControlNull.shy = true;
      controlNull = thisControlNull;
      maskNull = thisControlNull;
      var headLayer = selectedLayers[0];
      if (isTrial && selectedLayers[1] != undefined) {
        selectedLayers[1] = null;
      }
      for (var s = 0; s < selectedLayers.length; s += 1) {
        var selectedLayer = selectedLayers[s];
        var selectedLayerPosition = selectedLayer
          .property("ADBE Transform Group")
          .property("ADBE Position");
        var selectedLayerRotation = selectedLayer
          .property("ADBE Transform Group")
          .property("ADBE Rotate Z");
        var selectedLayerScale = selectedLayer
          .property("ADBE Transform Group")
          .property("ADBE Scale");
        selectedLayerPosition.setValue([0, 0]);
        precompose_layers[precompose_layers.length] = selectedLayer.index;
        if (
          selectedLayerPosition.canSetExpression &&
          selectedLayerRotation.canSetExpression &&
          selectedLayerScale.canSetExpression
        ) {
          if (selectedLayer("ADBE Effect Parade") != null) {
            if (
              selectedLayer("ADBE Effect Parade").canAddProperty(
                "ADBE Slider Control",
              )
            ) {
              var a = currentComp;
              if (s == 0) {
                var propertyNum = 1;
                var easyArrowCompleteSlider = selectedLayer(
                  "ADBE Effect Parade",
                ).addProperty("ADBE Slider Control");
                var easyArrowCompleteName = "Easy Arrow Completion";
                var easyArrowCompleteMN =
                  easyArrowCompleteSlider.property(1).matchName;
                easyArrowCompleteSlider.name = easyArrowCompleteName;
                easyArrowCompleteSlider
                  .property("ADBE Slider Control-0001")
                  .addKey(currentComp.time);
                var lengthSlider = selectedLayer(
                  "ADBE Effect Parade",
                ).addProperty("ADBE Slider Control");
                var lengthName = "Easy Arrow Length";
                var lengthMN = lengthSlider.property(1).matchName;
                lengthSlider.name = lengthName;
                var enableEndCheckbox = selectedLayer(
                  "ADBE Effect Parade",
                ).addProperty("ADBE Checkbox Control");
                var enableEndName = "Easy Arrow Enable End";
                var enableEndMN = enableEndCheckbox.property(1).matchName;
                enableEndCheckbox.name = enableEndName;
                var userSetEndSlider = selectedLayer(
                  "ADBE Effect Parade",
                ).addProperty("ADBE Slider Control");
                var userSetEndName = "Easy Arrow End";
                var userSetEndMN = userSetEndSlider.property(1).matchName;
                userSetEndSlider.name = userSetEndName;
                var offsetSlider = selectedLayer(
                  "ADBE Effect Parade",
                ).addProperty("ADBE Slider Control");
                var offsetName = "Easy Arrow Line Offset";
                var offsetMN = offsetSlider.property(1).matchName;
                offsetSlider.name = offsetName;
                var reverseCheckbox = selectedLayer(
                  "ADBE Effect Parade",
                ).addProperty("ADBE Checkbox Control");
                var reverseName = "Easy Arrow Reverse Direction";
                var reverseMN = reverseCheckbox.property(1).matchName;
                reverseCheckbox.name = reverseName;
                var sizeSlider = selectedLayer(
                  "ADBE Effect Parade",
                ).addProperty("ADBE Slider Control");
                var sizeName = "Easy Arrow Size";
                var sizeMN = sizeSlider.property(1).matchName;
                sizeSlider.name = sizeName;
                var fillEffect =
                  selectedLayer("ADBE Effect Parade").addProperty("ADBE Fill");
                var fillName = "Easy Arrow Color";
                fillEffect.name = fillName;
                var lengthSlider = selectedLayer
                  .property("ADBE Effect Parade")
                  .property(2)
                  .property("ADBE Slider Control-0001");
                lengthSlider.setValue(20);
                var sizeSlider = selectedLayer
                  .property("ADBE Effect Parade")
                  .property(7)
                  .property("ADBE Slider Control-0001");
                var defaultStrokeSize = currentComp.width * 0.05;
                sizeSlider.setValue(defaultStrokeSize);
                var colorPicker = selectedLayer
                  .property("ADBE Effect Parade")
                  .property(8)
                  .property("ADBE Fill-0002");
                colorPicker.setValue(strokeColor);
                shapeLayer = maskLayer;
                var shapeContents = shapeLayer.property(
                  "ADBE Root Vectors Group",
                );
                var A = maskPropArray;
                var shapeGroup = getProp(maskLayer, maskPropArray)
                  .parentProperty.parentProperty;
                var shapeStroke = shapeGroup
                  .property("ADBE Vectors Group")
                  .property("ADBE Vector Graphic - Stroke");
                if (shapeStroke == null) {
                  shapeStroke = shapeGroup
                    .addProperty("ADBE Vectors Group")
                    .addProperty("ADBE Vector Graphic - Stroke");
                }
                shapeStroke.enabled = true;
                var shapeFill = shapeGroup
                  .property("ADBE Vectors Group")
                  .property("ADBE Vector Graphic - Fill");
                if (shapeFill != null) {
                  shapeFill.enabled = false;
                }
                var shapeTrim = shapeGroup
                  .addProperty("ADBE Vectors Group")
                  .addProperty("ADBE Vector Filter - Trim");
                shapeStroke = shapeGroup
                  .property("ADBE Vectors Group")
                  .property("ADBE Vector Graphic - Stroke");
                shapeTrim = shapeGroup
                  .property("ADBE Vectors Group")
                  .property("ADBE Vector Filter - Trim");
                var shapeStrokeLineCap = shapeStroke.property(
                  "ADBE Vector Stroke Line Cap",
                );
                var shapeStrokeSize = shapeStroke.property(
                  "ADBE Vector Stroke Width",
                );
                shapeStrokeLineCap.setValue(3);
                var shapeStrokeColor = shapeStroke.property(
                  "ADBE Vector Stroke Color",
                );
                var shapeStrokeOpacity = shapeStroke.property(
                  "ADBE Vector Stroke Opacity",
                );
                var shapeStrokeLineCap = shapeStroke.property(
                  "ADBE Vector Stroke Line Cap",
                );
                shapeStrokeLineCap.setValue(1);
                if (shapeStrokeColor.canSetExpression) {
                  var colorPicker = selectedLayer
                    .property("ADBE Effect Parade")
                    .property(8)
                    .property("ADBE Fill-0002");
                  var expression =
                    'thisComp.layer("' +
                    selectedLayer.name +
                    '")("ADBE Effect Parade")("' +
                    fillName +
                    '")("' +
                    colorPicker.matchName +
                    '");';
                  shapeStrokeColor.expression = expression;
                  shapeStrokeColor.expressionEnabled = true;
                }
                if (shapeStrokeOpacity.canSetExpression) {
                  var colorOpacity = selectedLayer
                    .property("ADBE Effect Parade")
                    .property(8)
                    .property("ADBE Fill-0005");
                  var expression =
                    'thisComp.layer("' +
                    selectedLayer.name +
                    '")("ADBE Effect Parade")("' +
                    fillName +
                    '")("' +
                    colorOpacity.matchName +
                    '");';
                  shapeStrokeOpacity.expression = expression;
                  shapeStrokeOpacity.expressionEnabled = true;
                }
                arrowHeadLayer = selectedLayers[0];
                if (shapeStrokeSize.canSetExpression) {
                  var sizeExpression =
                    'thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    sizeName +
                    '")("' +
                    sizeMN +
                    '");';
                  shapeStrokeSize.expression = sizeExpression;
                  shapeStrokeSize.expressionEnabled = true;
                }
                var trimStart = shapeTrim.property("ADBE Vector Trim Start");
                var trimEnd = shapeTrim.property("ADBE Vector Trim End");
                var trimOffset = shapeTrim.property("ADBE Vector Trim Offset");
                var trimType = shapeTrim.property("ADBE Vector Trim Type");
                trimType.setValue(2);
                closedAdjustmentTrim = 0.25;
                closedAdjustmentLayer = 0.3333333333333333;
                var shapeStrokeProp = shapeStroke;
                if (trimStart.canSetExpression) {
                  var trimStartExpression = "";
                  trimStartExpression +=
                    'headLayerName=thisComp.layer("' +
                    selectedLayers[0].name +
                    '");\n' +
                    'nullLayerName=thisComp.layer("' +
                    thisControlNull.name +
                    '");\n' +
                    "maskName=" +
                    maskParentExprCode +
                    '("' +
                    maskName +
                    '");\n' +
                    "totalDistance = " +
                    addedDistances.total +
                    ";\n" +
                    "beginAddedDistance = " +
                    addedDistances.begin +
                    ";\n" +
                    "endAddedDistance = " +
                    addedDistances.end +
                    ";\n" +
                    "maskClosed = " +
                    maskClosed +
                    ";\n";
                  if (selectedLayers[1] != null) {
                    trimStartExpression +=
                      'tailLayerName=thisComp.layer("' +
                      selectedLayers[1].name +
                      '");\n';
                  }
                  trimStartExpression += "\n\n";
                  trimStartExpression +=
                    "tEnd=" +
                    maskParentExprCode +
                    '("' +
                    shapeTrim.matchName +
                    '")("' +
                    trimEnd.matchName +
                    '");\n' +
                    "origDistance = 0;//totalDistance-beginAddedDistance-endAddedDistance;\n" +
                    "newDistance = totalDistance;\n" +
                    "totalDistance2 = totalDistance;//+origDistance;\n" +
                    "addedPercent = 0;//100*(origDistance/totalDistance2);\n" +
                    'enableEnd = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    enableEndName +
                    '")("' +
                    enableEndMN +
                    '");\n' +
                    'userSetEnd = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    userSetEndName +
                    '")("' +
                    userSetEndMN +
                    '");\n' +
                    "if (userSetEnd < 0) userSetEnd = 0\n" +
                    "userSetEnd = 100 - userSetEnd;\n" +
                    'reverse = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    reverseName +
                    '")("' +
                    reverseMN +
                    '")\n\n' +
                    'offset = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    offsetName +
                    '")("' +
                    offsetMN +
                    '");\n' +
                    "if (offset < 0) offset = 0;\n" +
                    "offset *= -1;\n";
                  trimStartExpression +=
                    'totalAddedDistance = beginAddedDistance + endAddedDistance;\nif (reverse == 0) {\ncomplete = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    easyArrowCompleteName +
                    '")("' +
                    easyArrowCompleteMN +
                    '")\n' +
                    "if (complete < 0) complete = 0;\n" +
                    "if (complete > 100) complete = 100;\n" +
                    "currentPercent = complete+offset\n" +
                    "if (maskClosed == 1) {" +
                    "\n" +
                    'length = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    lengthName +
                    '")("ADBE Slider Control-0001");\n' +
                    "if (enableEnd == 0)\n" +
                    "start = complete*(1-length/100)+length;\n" +
                    "else\n" +
                    "start = currentPercent;\n" +
                    "} else {" +
                    "\n" +
                    "start = currentPercent;\n" +
                    "\tstart = Math.round(start*100)/100;\n" +
                    "}\n" +
                    "} else {\n" +
                    'length = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    lengthName +
                    '")("ADBE Slider Control-0001")*(100-addedPercent)/100;\n' +
                    "if (length < 0) length = 0;\n" +
                    "else if (length > 100) length = 100;\n" +
                    "if (enableEnd == 0)\n" +
                    "{\n" +
                    "if (maskClosed == 0)\n" +
                    "start= tEnd + length;\n" +
                    "else\n" +
                    "start= tEnd - length;\n" +
                    "}\n" +
                    "else\n" +
                    "{\n" +
                    "start = userSetEnd;\n" +
                    "if (start < tEnd) start = tEnd;\n" +
                    "}\n" +
                    "\tstart = Math.round(start*100)/100;\n" +
                    "}";
                  trimStart.expression = trimStartExpression;
                  trimStart.expressionEnabled = true;
                }
                if (trimEnd.canSetExpression) {
                  var trimEndExpression = "";
                  trimEndExpression +=
                    "totalDistance = " +
                    addedDistances.total +
                    ";\n" +
                    "beginAddedDistance = " +
                    addedDistances.begin +
                    ";\n" +
                    "endAddedDistance = " +
                    addedDistances.end +
                    ";\n" +
                    "maskClosed = " +
                    maskClosed +
                    ";\n\n" +
                    'enableEnd = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    enableEndName +
                    '")("' +
                    enableEndMN +
                    '");\n' +
                    'userSetEnd = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    userSetEndName +
                    '")("' +
                    userSetEndMN +
                    '");\n' +
                    "tStart=" +
                    maskParentExprCode +
                    '("' +
                    shapeTrim.matchName +
                    '")("' +
                    trimStart.matchName +
                    '");\n' +
                    "origDistance = 0;\n" +
                    "newDistance = totalDistance;\n" +
                    "totalDistance2 = totalDistance;\n" +
                    "addedPercent = 0;\n" +
                    'reverse = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    reverseName +
                    '")("' +
                    reverseMN +
                    '")\n\n' +
                    'offset = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    offsetName +
                    '")("' +
                    offsetMN +
                    '")\n\n' +
                    "if (offset < 0) offset = 0;\n" +
                    "offset *= -1;\n";
                  trimEndExpression +=
                    'totalAddedDistance = beginAddedDistance + endAddedDistance;\nif (reverse == 1) {\ncomplete = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    easyArrowCompleteName +
                    '")("' +
                    easyArrowCompleteMN +
                    '")\n' +
                    "if (complete < 0) complete = 0;\n" +
                    "if (complete > 100) complete = 100;\n" +
                    "currentPercent = complete-offset;\n" +
                    "if (maskClosed == 1) {\n" +
                    'length = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    lengthName +
                    '")("ADBE Slider Control-0001");\n' +
                    "if (enableEnd == 0)\n" +
                    "start = complete*(1-length/100)+length;\n" +
                    "else\n" +
                    "start = currentPercent;\n" +
                    "} else {\n" +
                    "start = currentPercent;\n" +
                    "\tstart = Math.round(start*100)/100;\n" +
                    "}\n" +
                    "} else {\n" +
                    'length = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    lengthName +
                    '")("ADBE Slider Control-0001")*(100-addedPercent)/100;\n' +
                    "if (length < 0) length = 0;\n" +
                    "else if (length > 100) length = 100;\n" +
                    "if (enableEnd == 0)\n" +
                    "end= tStart - length;\n" +
                    "else\n" +
                    "{\n" +
                    "end = userSetEnd;\n" +
                    "if (end > tStart) end = tStart;\n" +
                    "}\n" +
                    "if (end > 100)\n" +
                    "end = 100;\n" +
                    "end = Math.round(end*100)/100;\n" +
                    "}";
                  trimEnd.expression = trimEndExpression;
                  trimEnd.expressionEnabled = true;
                }
                if (trimOffset.canSetExpression) {
                  var trimOffsetExpression = "";
                  trimOffsetExpression +=
                    'headLayerName=thisComp.layer("' +
                    selectedLayers[0].name +
                    '");\n' +
                    'nullLayerName=thisComp.layer("' +
                    thisControlNull.name +
                    '");\n' +
                    "maskClosed = " +
                    maskClosed +
                    ";\n";
                  trimOffsetExpression += "\n\n";
                  trimOffsetExpression +=
                    'complete = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    easyArrowCompleteName +
                    '")("' +
                    easyArrowCompleteMN +
                    '")\n' +
                    'length = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    lengthName +
                    '")("ADBE Slider Control-0001");\n' +
                    'offset = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    offsetName +
                    '")("' +
                    offsetMN +
                    '");\n' +
                    'reverse = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    reverseName +
                    '")("' +
                    reverseMN +
                    '")\n\n' +
                    'enableEnd = thisComp.layer("' +
                    arrowHeadLayer.name +
                    '")("ADBE Effect Parade")("' +
                    enableEndName +
                    '")("' +
                    enableEndMN +
                    '");\n' +
                    "if (maskClosed == 1 && enableEnd == 0)\n" +
                    "{\n" +
                    "if (complete < 0) complete = 0;\n" +
                    "if (complete > 100) complete = 100;\n" +
                    "if (length < 0) length = 0;\n" +
                    "if (length > 100) length = 100;\n" +
                    "if (offset < 0) offset = 0;\n" +
                    "if (offset > 100) offset = 100;\n" +
                    "offset *= 3.6;\n" +
                    "if (length > 0) {\n" +
                    "if (reverse == 0) {\n" +
                    "base = -360/(100/length);\n" +
                    "finalComplete = base*((100-complete)/100)-offset;\n" +
                    "} else {\n" +
                    "base = 360/(100/length);\n" +
                    "finalComplete = base*(complete/100)+offset;\n" +
                    "}\n" +
                    "}" +
                    "} else\n" +
                    "0;";
                  trimOffset.expression = trimOffsetExpression;
                  trimOffset.expressionEnabled = true;
                }
                var positionExpression = "";
                positionExpression +=
                  'headLayerName=thisComp.layer("' +
                  selectedLayers[0].name +
                  '");\n' +
                  'nullLayerName=thisComp.layer("' +
                  thisControlNull.name +
                  '");\n' +
                  "maskName=" +
                  maskParentExprCode +
                  '("' +
                  maskName +
                  '");\n' +
                  "totalDistance = " +
                  addedDistances.total +
                  ";\n" +
                  "beginAddedDistance = " +
                  addedDistances.begin +
                  ";\n" +
                  "endAddedDistance = " +
                  addedDistances.end +
                  ";\n" +
                  "maskClosed = " +
                  maskClosed +
                  ";\n";
                if (selectedLayers[1] != null) {
                  positionExpression +=
                    'tailLayerName=thisComp.layer("' +
                    selectedLayers[1].name +
                    '");\n';
                }
                positionExpression +=
                  '\neasyArrowComplete = effect("' +
                  easyArrowCompleteName +
                  '")("' +
                  easyArrowCompleteMN +
                  '");\n' +
                  "\nif (easyArrowComplete < 0) easyArrowComplete = 0;\n" +
                  "else if (easyArrowComplete > 100) easyArrowComplete = 100;\n" +
                  "if (maskClosed == 1)\n" +
                  "easyArrowComplete *= " +
                  closedAdjustmentLayer +
                  ";\n" +
                  "newTime = easyArrowComplete/100;\n\n" +
                  "if (maskClosed == 1)\n" +
                  "newTime += " +
                  closedAdjustmentLayer +
                  ";\n";
                positionExpression +=
                  "totalAddedDistance = beginAddedDistance + endAddedDistance;\nnewTime = newTime*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance);\n";
                positionExpression +=
                  'mask = thisComp.layer("' +
                  controlNull.name +
                  '")("ADBE Transform Group")("ADBE Position").valueAtTime(newTime);\n\n';
                positionExpression +=
                  'xPos = mask[0] + thisComp.layer(index)("ADBE Transform Group")("ADBE Position")[0];\nyPos = mask[1] + thisComp.layer(index)("ADBE Transform Group")("ADBE Position")[1];\n[xPos,yPos]';
                selectedLayerPosition.expression = positionExpression;
                selectedLayerPosition.expressionEnabled = true;
                var rotationExpression = "";
                rotationExpression +=
                  "totalDistance = " +
                  addedDistances.total +
                  ";\n" +
                  "beginAddedDistance = " +
                  addedDistances.begin +
                  ";\n" +
                  "endAddedDistance = " +
                  addedDistances.end +
                  ";\n" +
                  "maskClosed = " +
                  maskClosed +
                  ";\n\n" +
                  'numKeysArrowStroke = effect("' +
                  easyArrowCompleteName +
                  '")("' +
                  easyArrowCompleteMN +
                  '").numKeys;\n' +
                  "if (numKeysArrowStroke > 0) {\n\n" +
                  '\tArrowStrokeComplete = effect("' +
                  easyArrowCompleteName +
                  '")("' +
                  easyArrowCompleteMN +
                  '");\n' +
                  '\treverse = effect("' +
                  reverseName +
                  '")("' +
                  reverseMN +
                  '");\n' +
                  "\tif (ArrowStrokeComplete < 0) ArrowStrokeComplete = 0;\n" +
                  "\telse if (ArrowStrokeComplete > 100) ArrowStrokeComplete = 100;\n" +
                  "if (maskClosed == 1)\n" +
                  "ArrowStrokeComplete *= " +
                  closedAdjustmentLayer +
                  ";\n" +
                  "\tnewTime = ArrowStrokeComplete/100;\n\n" +
                  "if (maskClosed == 1)\n" +
                  "newTime += " +
                  closedAdjustmentLayer +
                  ";\n";
                rotationExpression +=
                  'totalAddedDistance = beginAddedDistance + endAddedDistance;\nnewTime = newTime*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance);\ntimeAdjust = framesToTime(1, fps = 1.0 / thisComp.frameDuration)/1000 + .00001;\tmask_pos1 = thisComp.layer("' +
                  controlNull.name +
                  '")("ADBE Transform Group")("ADBE Position").valueAtTime(newTime-timeAdjust);\n' +
                  '\tmask_pos2 = thisComp.layer("' +
                  controlNull.name +
                  '")("ADBE Transform Group")("ADBE Position").valueAtTime(newTime+timeAdjust);\n\n';
                rotationExpression +=
                  '\t\txPos1 = mask_pos1[0];\n\t\txPos2 = mask_pos2[0];\n\t\tyPos1 = mask_pos1[1];\n\t\tyPos2 = mask_pos2[1];\n\npos1 = [xPos1, yPos1];\npos2 = [xPos2, yPos2];\n\n\tdiff = sub(pos1, pos2);\nreverseAngle = 180;\nif (reverse == 1)\n\treverseAngle = 0;\n\tradiansToDegrees(Math.atan2(diff[1], diff[0]))+reverseAngle+thisComp.layer(index)("ADBE Transform Group")("ADBE Rotate Z");\n} else thisComp.layer(index)("ADBE Transform Group")("ADBE Rotate Z");';
                selectedLayerRotation.expression = rotationExpression;
                selectedLayerRotation.expressionEnabled = true;
                var scaleExpression = "";
                scaleExpression +=
                  "defaultStrokeSize = " +
                  shapeStrokeSize.value +
                  ";" +
                  "\n" +
                  "arrowScaleMultX = scale[0]/defaultStrokeSize;" +
                  "\n" +
                  "arrowScaleMultY = scale[1]/defaultStrokeSize;" +
                  "\n" +
                  "shapeStrokeSizeProp=" +
                  maskParentExprCode +
                  '("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width");\n' +
                  "adjustedScaleX = arrowScaleMultX*shapeStrokeSizeProp;\n" +
                  "adjustedScaleY = arrowScaleMultY*shapeStrokeSizeProp;\n" +
                  "[adjustedScaleX, adjustedScaleY];";
                selectedLayerScale.expression = scaleExpression;
                selectedLayerScale.expressionEnabled = true;
              } else {
                if (s == 1 && !isTrial) {
                  var fillEffect =
                    selectedLayer("ADBE Effect Parade").addProperty(
                      "ADBE Fill",
                    );
                  var fillName = "Easy Arrow Color";
                  fillEffect.name = fillName;
                  var colorPicker = selectedLayer
                    .property("ADBE Effect Parade")
                    .property(1)
                    .property("ADBE Fill-0002");
                  var colorOpacity = selectedLayer
                    .property("ADBE Effect Parade")
                    .property(1)
                    .property("ADBE Fill-0005");
                  if (colorPicker.canSetExpression) {
                    var colorExpression =
                      'thisComp.layer("' +
                      arrowHeadLayer.name +
                      '")("ADBE Effect Parade")("' +
                      fillName +
                      '")("' +
                      colorPicker.matchName +
                      '");';
                    colorPicker.expression = colorExpression;
                    colorPicker.expressionEnabled = true;
                  }
                  if (colorOpacity.canSetExpression) {
                    var expression =
                      'thisComp.layer("' +
                      arrowHeadLayer.name +
                      '")("ADBE Effect Parade")("' +
                      fillName +
                      '")("' +
                      colorOpacity.matchName +
                      '");';
                    colorOpacity.expression = expression;
                    colorOpacity.expressionEnabled = true;
                  }
                  createTailLayerExpression(
                    selectedLayers[1],
                    addedDistances,
                    maskClosed,
                    headLayer,
                    arrowHeadLayer,
                    controlNull,
                    shapeStrokeProp,
                    maskParentExprCode,
                  );
                }
              }
            } else {
              alert("Sorry your selected layer can not add a Slider Effect");
            }
          } else {
            alert("Sorry your selected layer can not add Effects");
          }
        } else {
          alert(
            "Sorry your selected layer can not add expressions to the Position, Rotation, or Scale property",
          );
        }
        currentComp.layers[selectedLayer.index].selected = true;
      }
      if (selectedLayers.length > 1) {
        selectedLayers[1].selected = false;
      }
      if (win.precompCB.value == 1) {
        precompose_layers[precompose_layers.length] = maskLayer.index;
        precompose_layers[precompose_layers.length] = thisControlNull.index;
        var easyArrowPrecomp = currentComp.layers.precompose(
          precompose_layers,
          "Easy Arrow [" + maskName + "]",
          true,
        );
      }
    }
    function createTailLayerExpression(
      tailLayer,
      addedDistances,
      maskClosed,
      headLayer,
      arrowHeadLayer,
      controlNull,
      shapeStrokeProp,
      maskParentExprCode,
    ) {
      var easyArrowCompleteProp = headLayer("ADBE Effect Parade").property(1);
      var lengthProp = headLayer("ADBE Effect Parade").property(2);
      var enableEndProp = headLayer("ADBE Effect Parade").property(3);
      var userSetEndProp = headLayer("ADBE Effect Parade").property(4);
      var offsetProp = headLayer("ADBE Effect Parade").property(5);
      var reverseProp = headLayer("ADBE Effect Parade").property(6);
      var selectedLayerPosition = tailLayer
        .property("ADBE Transform Group")
        .property("ADBE Position");
      var selectedLayerRotation = tailLayer
        .property("ADBE Transform Group")
        .property("ADBE Rotate Z");
      var selectedLayerScale = tailLayer
        .property("ADBE Transform Group")
        .property("ADBE Scale");
      var easyArrowCompleteSlider = easyArrowCompleteProp;
      var easyArrowCompleteName = easyArrowCompleteSlider.name;
      var easyArrowCompleteMN = easyArrowCompleteSlider.property(1).matchName;
      var lengthSlider = lengthProp;
      var lengthName = lengthSlider.name;
      var lengthMN = lengthSlider.property(1).matchName;
      var enableEndCheckbox = enableEndProp;
      var enableEndName = enableEndCheckbox.name;
      var enableEndMN = enableEndCheckbox.property(1).matchName;
      var userSetEndSlider = userSetEndProp;
      var userSetEndName = userSetEndSlider.name;
      var userSetEndMN = userSetEndSlider.property(1).matchName;
      var offsetSlider = offsetProp;
      var offsetName = offsetSlider.name;
      var offsetMN = offsetSlider.property(1).matchName;
      var reverseCheckbox = reverseProp;
      var reverseName = reverseCheckbox.name;
      var reverseMN = reverseCheckbox.property(1).matchName;
      var shapeStrokeSize = shapeStrokeProp.property(
        "ADBE Vector Stroke Width",
      );
      var closedAdjustmentLayer = 0.3333333333333333;
      var positionExpression = "";
      positionExpression +=
        "totalDistance = " +
        addedDistances.total +
        ";\n" +
        "beginAddedDistance = " +
        addedDistances.begin +
        ";\n" +
        "endAddedDistance = " +
        addedDistances.end +
        ";\n" +
        "maskClosed = " +
        maskClosed +
        ";\n\n" +
        'headLayer = thisComp.layer("' +
        headLayer.name +
        '");\n' +
        'enableEnd = thisComp.layer("' +
        arrowHeadLayer.name +
        '")("ADBE Effect Parade")("' +
        enableEndName +
        '")("' +
        enableEndMN +
        '");\n' +
        'userSetEnd = thisComp.layer("' +
        arrowHeadLayer.name +
        '")("ADBE Effect Parade")("' +
        userSetEndName +
        '")("' +
        userSetEndMN +
        '");\n' +
        'easyArrowComplete = headLayer("ADBE Effect Parade")("' +
        easyArrowCompleteName +
        '")("' +
        easyArrowCompleteMN +
        '");\n' +
        'length = headLayer("ADBE Effect Parade")("' +
        lengthName +
        '")("' +
        lengthMN +
        '")/100;\n' +
        'offset = thisComp.layer("' +
        arrowHeadLayer.name +
        '")("ADBE Effect Parade")("' +
        offsetName +
        '")("' +
        offsetMN +
        '");\n' +
        'reverse = headLayer("ADBE Effect Parade")("' +
        reverseName +
        '")("' +
        reverseMN +
        '");\n' +
        "if (offset < 0) offset = 0;\n" +
        "if (offset > 100) offset = 100;\n" +
        "offset *= -1;\n" +
        "if (maskClosed == 1) {\n" +
        "offset *= " +
        closedAdjustmentLayer +
        ";\n" +
        "offset += " +
        closedAdjustmentLayer * 100 +
        ";\n" +
        "}\n" +
        "if (easyArrowComplete < 0) easyArrowComplete = 0;\n" +
        "else if (easyArrowComplete > 100) easyArrowComplete = 100;\n" +
        "actualEasyArrowComplete = easyArrowComplete;\n" +
        "if (enableEnd == 1)\n" +
        "{\n" +
        "if (userSetEnd < 0) userSet = 0;\n" +
        "if (userSetEnd > 100) userSet = 100;\n" +
        "endBeginScale = beginAddedDistance/totalDistance;\n" +
        "endEndScale = (totalDistance-endAddedDistance)/totalDistance;\n" +
        "if (reverse == 1) userSetEnd = 100-userSetEnd;\n" +
        "userSetEnd = linear(userSetEnd, 0, 100, endBeginScale, endEndScale)\n" +
        "if (maskClosed == 1) userSetEnd *= .33333;\n" +
        "newTime = userSetEnd;\n" +
        "} else {\n" +
        "\nif (length < 0) length = 0;\n" +
        "else if (length > 1) length = 1;\n" +
        "if (maskClosed == 1)\n" +
        "length *= " +
        closedAdjustmentLayer +
        ";\n" +
        "if (maskClosed == 1)\n" +
        "easyArrowComplete *= " +
        closedAdjustmentLayer +
        ";\n";
      positionExpression +=
        "if (reverse == 0)\neasyArrowComplete += offset;\nelse\neasyArrowComplete -= offset;\nnewTime = easyArrowComplete/100;\n\nif (maskClosed == 1)\nnewTime += " +
        closedAdjustmentLayer +
        ";\n" +
        "totalAddedDistance = beginAddedDistance + endAddedDistance;\n" +
        "if (reverse == 0) {\n" +
        "newTime = newTime*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance)-length;\n" +
        "} else {\n" +
        "newTime = newTime*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance)+length;\n" +
        "}\n" +
        "}\n";
      positionExpression +=
        'totalAddedDistance = beginAddedDistance + endAddedDistance;\nheadPos = (actualEasyArrowComplete/100)*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance);\nif (maskClosed == 0)\n{\nif (reverse == 0) {\nif (newTime > headPos) newTime = headPos;\n} else {\nif (newTime < headPos) newTime = headPos;\n}\n}\nmask = thisComp.layer("' +
        controlNull.name +
        '")("ADBE Transform Group")("ADBE Position").valueAtTime(newTime);\n\n' +
        'xPos = mask[0] + thisComp.layer(index)("ADBE Transform Group")("ADBE Position")[0];\n' +
        'yPos = mask[1] + thisComp.layer(index)("ADBE Transform Group")("ADBE Position")[1];\n' +
        "[xPos,yPos]";
      selectedLayerPosition.expression = positionExpression;
      selectedLayerPosition.expressionEnabled = true;
      var rotationExpression = "";
      rotationExpression +=
        "totalDistance = " +
        addedDistances.total +
        ";\n" +
        "beginAddedDistance = " +
        addedDistances.begin +
        ";\n" +
        "endAddedDistance = " +
        addedDistances.end +
        ";\n" +
        "maskClosed = " +
        maskClosed +
        ";\n\n" +
        'headLayer = thisComp.layer("' +
        headLayer.name +
        '");\n' +
        'enableEnd = thisComp.layer("' +
        arrowHeadLayer.name +
        '")("ADBE Effect Parade")("' +
        enableEndName +
        '")("' +
        enableEndMN +
        '");\n' +
        'userSetEnd = thisComp.layer("' +
        arrowHeadLayer.name +
        '")("ADBE Effect Parade")("' +
        userSetEndName +
        '")("' +
        userSetEndMN +
        '");\n' +
        'offset = thisComp.layer("' +
        arrowHeadLayer.name +
        '")("ADBE Effect Parade")("' +
        offsetName +
        '")("' +
        offsetMN +
        '");\n' +
        'reverse = headLayer("ADBE Effect Parade")("' +
        reverseName +
        '")("' +
        reverseMN +
        '");\n' +
        'numKeysArrowStroke = headLayer("ADBE Effect Parade")("' +
        easyArrowCompleteName +
        '")("' +
        easyArrowCompleteMN +
        '").numKeys;\n' +
        "actualEasyArrowComplete = 0;\n" +
        "if (numKeysArrowStroke > 0) {\n\n" +
        'easyArrowComplete = headLayer("ADBE Effect Parade")("' +
        easyArrowCompleteName +
        '")("' +
        easyArrowCompleteMN +
        '");\n' +
        "if (easyArrowComplete < 0) easyArrowComplete = 0;\n" +
        "else if (easyArrowComplete > 100) easyArrowComplete = 100;\n" +
        "actualEasyArrowComplete = easyArrowComplete;\n" +
        'length = headLayer("ADBE Effect Parade")("' +
        lengthName +
        '")("' +
        lengthMN +
        '")/100;\n' +
        "\nif (length < 0) length = 0;\n" +
        "else if (length > 1) length = 1;\n" +
        "if (offset < 0) offset = 0;\n" +
        "if (offset > 100) offset = 100;\n" +
        "offset *= -1;\n" +
        "if (maskClosed == 1) {\n" +
        "offset *= " +
        closedAdjustmentLayer +
        ";\n" +
        "offset += " +
        closedAdjustmentLayer * 100 +
        ";\n" +
        "}\n" +
        "if (enableEnd == 1)\n" +
        "{\n" +
        "if (userSetEnd < 0) userSet = 0;\n" +
        "if (userSetEnd > 100) userSet = 100;\n" +
        "endBeginScale = beginAddedDistance/totalDistance;\n" +
        "endEndScale = (totalDistance-endAddedDistance)/totalDistance;\n" +
        "if (reverse == 1) userSetEnd = 100-userSetEnd;\n" +
        "userSetEnd = linear(userSetEnd, 0, 100, endBeginScale, endEndScale)\n" +
        "if (maskClosed == 1) userSetEnd *= .33333;\n" +
        "newTime = userSetEnd;\n" +
        "} else {\n" +
        "if (maskClosed == 1)\n" +
        "length *= " +
        closedAdjustmentLayer +
        ";\n" +
        "if (maskClosed == 1)\n" +
        "easyArrowComplete *= " +
        closedAdjustmentLayer +
        ";\n";
      rotationExpression +=
        "if (reverse == 0)\neasyArrowComplete += offset;\nelse\neasyArrowComplete -= offset;\nnewTime = easyArrowComplete/100;\n\nif (maskClosed == 1)\nnewTime += " +
        closedAdjustmentLayer +
        ";\n" +
        "totalAddedDistance = beginAddedDistance + endAddedDistance;\n" +
        "if (reverse == 0) {\n" +
        "newTime = newTime*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance)-length;\n" +
        "} else {\n" +
        "newTime = newTime*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance)+length;\n" +
        "}\n" +
        "}\n";
      rotationExpression +=
        "if (newTime <= .0001) newTime = .0001;\nif (newTime >= .9999) newTime = .9999;\n";
      rotationExpression +=
        'totalAddedDistance = beginAddedDistance + endAddedDistance;\nheadPos = (actualEasyArrowComplete/100)*(1-totalAddedDistance/totalDistance)+(beginAddedDistance/totalDistance);\nif (maskClosed == 0)\n{\nif (reverse == 0) {\nif (newTime > headPos) newTime = headPos;\n} else {\nif (newTime < headPos) newTime = headPos;\n}\n}\ntimeAdjust = framesToTime(1, fps = 1.0 / thisComp.frameDuration)/1000 + .00001;\tmask_pos1 = thisComp.layer("' +
        controlNull.name +
        '")("ADBE Transform Group")("ADBE Position").valueAtTime(newTime-timeAdjust);\n' +
        '\tmask_pos2 = thisComp.layer("' +
        controlNull.name +
        '")("ADBE Transform Group")("ADBE Position").valueAtTime(newTime+timeAdjust);\n\n';
      rotationExpression +=
        '\t\txPos1 = mask_pos1[0];\n\t\txPos2 = mask_pos2[0];\n\t\tyPos1 = mask_pos1[1];\n\t\tyPos2 = mask_pos2[1];\n\npos1 = [xPos1, yPos1];\npos2 = [xPos2, yPos2];\n\n\tdiff = sub(pos1, pos2);\nreverseAngle = 180;\nif (reverse == 1)\n\treverseAngle = 0;\n\tradiansToDegrees(Math.atan2(diff[1], diff[0]))+reverseAngle+thisComp.layer(index)("ADBE Transform Group")("ADBE Rotate Z");\n} else thisComp.layer(index)("ADBE Transform Group")("ADBE Rotate Z");';
      selectedLayerRotation.expression = rotationExpression;
      selectedLayerRotation.expressionEnabled = true;
      var scaleExpression = "";
      scaleExpression +=
        "defaultStrokeSize = " +
        shapeStrokeSize.value +
        ";" +
        "\n" +
        "arrowScaleMultX = scale[0]/defaultStrokeSize;" +
        "\n" +
        "arrowScaleMultY = scale[1]/defaultStrokeSize;" +
        "\n" +
        "shapeStrokeSizeProp=" +
        maskParentExprCode +
        '("ADBE Vector Graphic - Stroke")("ADBE Vector Stroke Width");\n' +
        "adjustedScaleX = arrowScaleMultX*shapeStrokeSizeProp;\n" +
        "adjustedScaleY = arrowScaleMultY*shapeStrokeSizeProp;\n" +
        "[adjustedScaleX, adjustedScaleY];";
      selectedLayerScale.expression = scaleExpression;
      selectedLayerScale.expressionEnabled = true;
    }
    var isTrial = pnXZ.t();
    var maskParentExprCode = "";
    var maskPropArray = new Array();
    var maskPath = null;
    var controlMaskNameAdd = "Arrow Expressions [#]- Do Not Edit";
    var defaultColor = [1, 1, 1];
    var strokeColor = [1, 1, 1];
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window(
            "palette",
            modio_easy_arrows_data.scriptName +
              " v" +
              modio_easy_arrows_data.scriptVersion,
            [0, 0, 180, 170],
            { resizeable: true },
          );
    var xPos = 10;
    var yPos = 25;
    win.defaultTailText = win.add(
      "statictext",
      [xPos, yPos, xPos + 175, yPos + 20],
      "Create End Arrow",
      { multiline: true },
    );
    win.defaultTailCB = win.add(
      "checkbox",
      [xPos + 105, yPos, xPos + 205, yPos + 20],
      "",
    );
    win.defaultTailCB.value = 0;
    win.defaultTailCB.helpTip = "Create an end arrow";
    yPos -= 3;
    win.defaultTailHelpBtn = win.add(
      "button",
      [xPos + 130, yPos, xPos + 150, yPos + 20],
      "?",
    );
    yPos += 28;
    win.precompText = win.add(
      "statictext",
      [xPos, yPos, xPos + 175, yPos + 20],
      "Precomp Layers",
      { multiline: true },
    );
    win.precompCB = win.add(
      "checkbox",
      [xPos + 105, yPos, xPos + 205, yPos + 20],
      "",
    );
    win.precompCB.value = 0;
    win.precompCB.helpTip = "Precomp all of the arrow layers";
    yPos -= 3;
    win.precompHelpBtn = win.add(
      "button",
      [xPos + 130, yPos, xPos + 150, yPos + 20],
      "?",
    );
    yPos += 30;
    win.add("panel", [xPos, yPos, xPos + 150, yPos]);
    yPos += 20;
    win.easyArrowsBtn = win.add(
      "button",
      [xPos, yPos, xPos + 120, yPos + 20],
      "Create Easy Arrow",
    );
    win.easyArrowsBtn.helpTip = "Create Easy Arrow";
    win.helpBtn = win.add(
      "button",
      [xPos + 130, yPos, xPos + 150, yPos + 20],
      "?",
    );
    yPos += 30;
    win.updateBtn = win.add(
      "button",
      [xPos, yPos, xPos + 120, yPos + 20],
      "Update Arrow",
    );
    win.updateBtn.helpTip = "Update Easy Arrow";
    win.updateHelpBtn = win.add(
      "button",
      [xPos + 130, yPos, xPos + 150, yPos + 20],
      "?",
    );
    win.easyArrowsBtn.onClick = makeChecks;
    win.helpBtn.onClick = helpFunction;
    if (isTrial) {
      win.updateBtn.enabled = false;
      win.defaultTailText.enabled = false;
      win.defaultTailCB.enabled = false;
      win.precompText.enabled = false;
      win.precompCB.enabled = false;
      win.updateHelpBtn.onClick = trialHelp;
      win.defaultTailHelpBtn.onClick = trialHelp;
      win.precompHelpBtn.onClick = trialHelp;
    } else {
      win.updateBtn.onClick = makeUpdateChecks;
      win.updateHelpBtn.onClick = updateHelpFunction;
      win.defaultTailHelpBtn.onClick = defaultTailHelpFunction;
      win.precompHelpBtn.onClick = precompHelpFunction;
    }
    if (!(win instanceof Panel)) {
      win.center();
      win.show();
    }
    var hexToRGB = function (hex) {
      var r = hex >> 16;
      var g = (hex >> 8) & 255;
      var b = hex & 255;
      return [r, g, b];
    };
  }
  var af_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [
      {
        name: "Video Tutorial",
        url: "https://www.youtube.com/watch?v=MB_WjKNBUXE",
      },
      {
        name: "Other Products",
        url: "https://aescripts.com/authors/m-p/modio/",
      },
    ],
    helpText:
      "This script will help you create an animated arrow.\n\n1) Select a Shape Layer path for the arrow to follow.\n\n2a) Optional: Select a custom layer to use as the \u201chead\u201d of the stroke. Otherwise, a default one will be created for you.\n\n2b) Optional: Select another layer to use as the \u201ctail\u201d of the stroke.\n\n3) Click \"Create Easy Arrow\".\n\nThese controls will now be available on the Arrow Head layer:\nEasy Arrow Completion: Where the arrow is located on the path (0% - 100%)\nEasy Arrow Length: The length of the stroke behind the arrow head\nEasy Arrow Line Offset: Offset the stroke away from the arrow head\nEasy Arrow Enable End: Set the end of the arrow to a constant position\nEasy Arrow End: Set the position where the end of the arrow will be\nEasy Arrow Reverse Direction: Reverse the arrow\u2019s direction along the path\nEasy Arrow Size: The size of the arrow stroke\nEasy Arrow Color: Set the color for the stroke and default arrow(s)\n\nNote:\nYou must have at least one keyframe on \'Easy Arrow Completion\' before the arrow will auto-orient along the path.",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6837463442482349,
    productSKU: "MDEA-SUL",
    scriptAuthor: "Modio",
    scriptName: modio_easy_arrows_data.scriptName,
    scriptURL: "http://aescripts.com/easy-arrows",
    scriptVersion: modio_easy_arrows_data.scriptVersion,
  };
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
      -1 != $.os.indexOf("Mac") && systemCall('chmod +x "' + n.fsName + '"');
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
      return (validateTimeLimited(e, i, t), "" != i && "" != t);
    }
    function validateTimeLimited(e, i, t) {
      switch (e.result) {
        case -20:
          e.e = parseDateString(i);
          break;
        case -21:
          e.e = parseDateString(t);
      }
    }
    function checkFloatingLicense(e) {
      retProp("pe$", e) != bD("RkxU") ||
        isServerRunning(e) ||
        (e.result = -109);
    }
    function checkTrialDetails(e) {
      if (-7 !== e.result) {
      } else if (0 == tLD) {
        e.result = -106;
      } else {
        var i = retProp("^d", e);
        if (void 0 === i) {
          return void (e.result = -103);
        }
        var t = tLD - i;
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
        var p =
          strRegSuccess.replace("%u", d) + (1 < d) && "de" != locale
            ? "s"
            : "" + betaMode
              ? ""
              : "\n" + strRegSuccess1;
        if (a) {
          var u = parseDateString(retProp("nd$", licenseValidity));
          p += "\n\n" + strLicenseEnds + u;
        }
        i.match(/@remote/i) || alert(p);
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
        isTimeLimited && (t += "\n" + strLicenseEnds + f),
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
      return BridgeTalk.appName.match(new RegExp(bD("YWZ0ZXJlZmZlY3Rz")));
    }
    function isPS() {
      return BridgeTalk.appName.match(new RegExp(bD("cGhvdG9zaG9w")));
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
            systemCall(bD("Y2htb2QgK3gg") + e.absoluteURI)),
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
    var licensingVersion = "3.0.43";
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
    var tLD = vars.hasOwnProperty("tLDXX")
      ? vars.tLDX
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
    var wx = __BLOB__BLOB_000046__;
    var mx = __BLOB__BLOB_000047__;
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
    var strLicenseEnds = localize({
      de: "Lizenzlaufzeit endet: ",
      en: "License expires: ",
      es: "Licencia expira: ",
      fr: "Licence expir\xe9e: ",
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
  var pnXZ = new a(af_settings);
  var myScriptWindow = null;
  if (pnXZ.c()) {
    runScript(thisObj);
  }
}
var modio_easy_arrows_data = {
  scriptName: "Easy Arrows",
  scriptVersion: "1.5.2",
};
modio_Easy_arrows(this);
