/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function typeMorph_wrapped(thisObj, settingsObject) {
  function myScrypt_buildUI(thisObj) {
    function gimmeComp(targetString) {
      var allComps = app.project.numItems;
      for (var i = 1; i <= allComps; i += 1) {
        var curItem = app.project.item(i);
        if (curItem instanceof CompItem && curItem.name === targetString) {
          return curItem;
        }
      }
    }
    function gimmeTargetLayer(targetLayerName) {
      for (var i = 1; i <= app.project.numItems; i += 1) {
        var curItem = app.project.item(i);
        if (curItem instanceof CompItem) {
          for (var x = 1; x <= curItem.numLayers; x += 1) {
            curLayer = curItem.layer(x);
            if (curLayer.name === targetLayerName) {
              return curLayer;
            }
          }
        }
      }
    }
    function gimmeShapeLayerWithString(targetComp, targetString) {
      for (var l = 1; l <= targetComp.numLayers; l += 1) {
        var curLayer = targetComp.layer(l);
        if (
          curLayer instanceof ShapeLayer &&
          curLayer.name.indexOf(targetString) !== -1
        ) {
          return curLayer;
        }
      }
    }
    function gimmeItem(targetItemName) {
      for (var i = 1; i <= app.project.numItems; i += 1) {
        var curItem = app.project.item(i);
        if (curItem.name === targetItemName) {
          return curItem;
        }
      }
    }
    function gimmeFolderContent(folderName) {
      var targetFolder = gimmeFolder(folderName);
      var folderContent = [];
      for (var i = 1; i <= app.project.numItems; i += 1) {
        var curItem = app.project.item(i);
        if (curItem.parentFolder === targetFolder) {
          folderContent.push(curItem);
        }
      }
      return folderContent;
    }
    function gimmeFontName() {
      var labComp = gimmeComp(labName);
      var textLayerSourceProperty = labComp.layer(1).property("Source Text");
      var textDocument = textLayerSourceProperty.value;
      var fontFamily = textDocument.fontFamily;
      return fontFamily;
    }
    function isSecurityPrefSet() {
      var securitySetting = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return securitySetting == 1;
    }
    function isPreserveConstantVertexPrefSet() {
      var sectionName = "Main Pref Section v2";
      var keyName = "Pref_USE_SMART_MASK";
      var prefType = PREFType.PREF_Type_MACHINE_INDEPENDENT;
      if (!app.preferences.havePref(sectionName, keyName, prefType)) {
        throw (
          'Cannot get "' +
          keyName +
          '" in section "' +
          sectionName +
          '" in ' +
          prefType
        );
      }
      var prefsValue = app.preferences.getPrefAsBool(
        sectionName,
        keyName,
        prefType,
      );
      return prefsValue;
    }
    function isAltTrue() {
      var keyboardState = ScriptUI.environment.keyboardState;
      var alt = keyboardState.altKey;
      return alt;
    }
    function switchToTrialMode() {
      trialSwitch.value = true;
      sampleButton.visible = true;
      upperLowerSwitch.visible = true;
      textInput.visible = false;
    }
    function switchToMorphMode() {
      sampleButton.visible = false;
      upperLowerSwitch.visible = false;
      textInput.visible = true;
    }
    function getOrWritePseudoFile(fileName, scriptName, rawData) {
      function getFilePath(fileName, scriptName) {
        var filePath = joinPath([
          getDocumentsFolderPath(),
          scriptName,
          fileName,
        ]);
        return filePath;
      }
      function getFFXfile(filePath, rawData) {
        function createFile(file, rawData) {
          makeSureFolderExists(file.parent);
          file.encoding = "BINARY";
          file.open("w");
          file.write(rawData);
          file.close();
          if (file.error !== "") {
            throw new Error("could not write file: " + file.error);
          }
        }
        function makeSureFolderExists(folder) {
          if (!folder.exists) {
            folder.create();
          }
        }
        var file = new File(filePath);
        if (!file.exists) {
          createFile(file, rawData);
        }
        return file;
      }
      function joinPath(components) {
        var pathSeparator = getPathSeparatorSymbol();
        return components.join(pathSeparator);
      }
      function getPathSeparatorSymbol() {
        return OS.isWindows() ? "\\" : "/";
      }
      function getDocumentsFolderPath() {
        return Folder.myDocuments.fsName;
      }
      var filePath = getFilePath(fileName, scriptName);
      var file = getFFXfile(filePath, rawData);
      return file;
    }
    function showMeObjectProperties(myObject) {
      for (var x in myObject) {
        alert(x);
        alert(myObject[x]);
      }
    }
    function findOrCreateParentFolder(folderName, myItem) {
      var targetFolder = false;
      for (var p = 1; p <= app.project.numItems; p += 1) {
        var curItem = app.project.item(p);
        if (curItem instanceof FolderItem && curItem.name === folderName) {
          targetFolder = true;
          myItem.parentFolder = curItem;
          return targetFolder;
        }
      }
      if (targetFolder === false) {
        newFolder = app.project.items.addFolder(folderName);
        myItem.parentFolder = newFolder;
      }
      return newFolder;
    }
    function preComposedLayerName(myCharacter, myFontName) {
      return myFontName + "_" + myCharacter + compNameSuffix;
    }
    function indexOfCustom(parentArray, searchElement) {
      for (var i = 0; i < parentArray.length; i += 1) {
        if (
          parentArray[i][0] == searchElement[0] &&
          parentArray[i][1] == searchElement[1]
        ) {
          return i;
        }
      }
      return -1;
    }
    function writeFile(filePath, rawData) {
      function createFile(file, rawData) {
        makeSureFolderExists(file.parent);
        file.encoding = "BINARY";
        file.open("w");
        file.write(rawData);
        file.close();
        if (file.error !== "") {
          throw new Error("could not write file: " + file.error);
        }
      }
      function makeSureFolderExists(folder) {
        if (!folder.exists) {
          folder.create();
        }
      }
      var file = new File(filePath);
      createFile(file, rawData);
      return file;
    }
    function createSplineFromFile(myFile) {
      var myInTangent = [];
      var myVertices = [];
      var myOutTangent = [];
      if (myFile) {
        myFile.open("r");
        var readMyFile = myFile.read();
        var row = readMyFile.split("\n");
        var count = row.length;
        for (var i = 0; i < count - 1; i += 1) {
          var cell = row[i].split(",");
          myInTangent.push([cell[0], cell[1]]);
          myVertices.push([cell[2], cell[3]]);
          myOutTangent.push([cell[4], cell[5]]);
        }
        myFile.close();
        return {
          inTang: myInTangent,
          outTang: myOutTangent,
          vertex: myVertices,
        };
      } else {
        alert("please choose a valid file");
      }
    }
    function getOrCreate_File(fileName, scriptName, rawData) {
      function getFilePath(fileName, scriptName) {
        var filePath = joinPath([
          getDocumentsFolderPath(),
          scriptName,
          fileName,
        ]);
        return filePath;
      }
      function getFFXfile(filePath, rawData) {
        function createFile(file, rawData) {
          makeSureFolderExists(file.parent);
          file.encoding = "BINARY";
          file.open("w");
          file.write(rawData);
          file.close();
          if (file.error !== "") {
            throw new Error("could not write file: " + file.error);
          }
        }
        function makeSureFolderExists(folder) {
          if (!folder.exists) {
            folder.create();
          }
        }
        var file = new File(filePath);
        if (!file.exists) {
          createFile(file, rawData);
        }
        return file;
      }
      function joinPath(components) {
        var pathSeparator = getPathSeparatorSymbol();
        return components.join(pathSeparator);
      }
      function getPathSeparatorSymbol() {
        return OS.isWindows() ? "\\" : "/";
      }
      function getDocumentsFolderPath() {
        return Folder.myDocuments.fsName;
      }
      var filePath = getFilePath(fileName, scriptName);
      var file = getFFXfile(filePath, rawData);
      return file;
    }
    function calcAngleDegrees(x, y) {
      return (Math.atan2(y, x) * 180) / Math.PI;
    }
    function difference(richArray, shyArray) {
      var result = [];
      for (var i = 0; i < richArray.length; i += 1) {
        if (shyArray.indexOf(richArray[i]) === -1) {
          result.push(richArray[i]);
        }
      }
      return result;
    }
    function sumOfArray(myArray) {
      alert(myArray.length);
      for (var i = 0; i < myArray.length; i += 1) {
        alert(myArray[i]);
        sum = Number(sum + myArray[i]);
      }
      return sum;
    }
    function gimmeAllCompsWidth(textInput) {
      var myFontFamily = gimmeFontName();
      var allMorphs = [];
      var sum = 0;
      for (var i = 0; i < textInput.length; i += 1) {
        var curMorphName = preComposedLayerName(textInput[i], myFontFamily);
        var curMorph = gimmeComp(curMorphName);
        var curShape = curMorph.layer(1);
        var curMorphWidth = curShape.sourceRectAtTime(1, true).width;
        sum = Number(sum) + Number(curMorphWidth.toFixed());
      }
      return Number(sum);
    }
    function gimmeFontFamilyFromFile(fileArray) {
      var firstUnderscorePosition = fileArray[0].name.indexOf("_");
      var secondUnderscorePosition = fileArray[0].name.indexOf(
        "_",
        firstUnderscorePosition + 1,
      );
      return File.decode(fileArray[0].name).substring(
        firstUnderscorePosition + 1,
        secondUnderscorePosition,
      );
    }
    function gimmeFontFamilyFromCompName(comp) {
      var firstUnderscorePosition = comp.name.indexOf("_");
      return File.decode(comp.name).substring(0, firstUnderscorePosition);
    }
    function gimmeFontFamilyFromLayerName(layer) {
      var firstUnderscorePosition = layer.name.indexOf("_");
      var secondUnderscorePosition = layer.name.indexOf(
        "_",
        firstUnderscorePosition + 1,
      );
      return layer.name.substring(
        firstUnderscorePosition + 1,
        secondUnderscorePosition,
      );
    }
    function bsplit(points, t0) {
      var n = points.length - 1;
      var b = [];
      var res1 = [];
      var res2 = [];
      var t1 = 1 - t0;
      var pf = function (p, f) {
        var res = [];
        for (var i = 0; i < p.length; i += 1) {
          res.push(f * p[i]);
        }
        return res;
      };
      var pp = function (p1, p2) {
        var res = [];
        for (var i = 0; i < Math.min(p1.length, p2.length); i += 1) {
          res.push(p1[i] + p2[i]);
        }
        return res;
      };
      for (var i = 0; i <= n; i += 1) {
        points[i] = typeof points[i] == "object" ? points[i] : [points[i]];
        b.push([points[i]]);
      }
      for (var j = 1; j <= n; j += 1) {
        for (var x = 0; x <= n - j; x += 1) {
          b[x].push(pp(pf(b[x][j - 1], t1), pf(b[x + 1][j - 1], t0)));
        }
      }
      for (var z = 0; z <= n; z += 1) {
        res1.push(b[0][z]);
        res2.push(b[z][n - z]);
      }
      return [res1, res2];
    }
    function splineSegmentFWD(mySpline, startIndex) {
      var vertexes = mySpline.value.vertices;
      var myInTangents = mySpline.value.inTangents;
      var myOutTangents = mySpline.value.outTangents;
      var vertexesCount = vertexes.length;
      var fourPoints = [];
      fourPoints[0] = vertexes[startIndex];
      fourPoints[1] = vertexes[startIndex] + myOutTangents[startIndex];
      if (startIndex === vertexes.length - 1) {
        fourPoints[2] = vertexes[0] + myInTangents[0];
        fourPoints[3] = vertexes[0];
      } else {
        fourPoints[2] = vertexes[startIndex + 1] + myInTangents[startIndex + 1];
        fourPoints[3] = vertexes[startIndex + 1];
      }
      return fourPoints;
    }
    function splineSegmentBCK(mySpline, startIndex) {
      var vertexes = mySpline.value.vertices;
      var myInTangents = mySpline.value.inTangents;
      var myOutTangents = mySpline.value.outTangents;
      var vertexesCount = vertexes.length;
      var fourPoints = [];
      fourPoints[2] = vertexes[startIndex] + myOutTangents[startIndex];
      fourPoints[3] = vertexes[startIndex];
      if (startIndex === vertexes.length - 1) {
        fourPoints[0] = vertexes[0] + myInTangents[0];
        fourPoints[1] = vertexes[0];
      } else {
        fourPoints[0] = vertexes[startIndex + 1];
        fourPoints[1] = vertexes[startIndex + 1] + myInTangents[startIndex + 1];
      }
      return fourPoints;
    }
    function shuffleCoordinatesFWD(rectangle, layerObj) {
      var shapeCentre = app.project.activeItem;
      var oldX = shapeCentre.width;
      var oldY = shapeCentre.height;
      var point1 = rectangle[0];
      var point2 = rectangle[1];
      var myArray = [];
      myArray.push(
        [point1[0][0], point1[0][1]],
        [point1[3][0], point1[3][1]],
        [point1[1][0] - point1[0][0], point1[1][1] - point1[0][1]],
        [point1[2][0] - point1[3][0], point1[2][1] - point1[3][1]],
      );
      return myArray;
    }
    function shuffleCoordinatesBCK(rectangle, layerObj) {
      var point1 = rectangle[0];
      var myArray = [];
      myArray.push(
        [point1[0][0], point1[0][1]],
        [point1[1][0] - point1[0][0], point1[1][1] - point1[0][1]],
        [point1[2][0] - point1[3][0], point1[2][1] - point1[3][1]],
        [point1[3][0], point1[3][1]],
      );
      return myArray;
    }
    function subdivideFWD(mySpline, myIndex) {
      var vertexes = mySpline.value.vertices;
      var mySegmentFWD = splineSegmentFWD(mySpline, myIndex);
      var midPointRectangle01 = bsplit(mySegmentFWD, 0.5);
      var midPointRectangle02 = bsplit(mySegmentFWD.reverse(), 0.5);
      var newSegmentCoordinates01 = shuffleCoordinatesFWD(midPointRectangle01);
      var newSegmentCoordinates02 = shuffleCoordinatesFWD(midPointRectangle02);
      var midPoint = [
        newSegmentCoordinates01[1][0],
        newSegmentCoordinates01[1][1],
      ];
      var inTangent = [
        newSegmentCoordinates01[3][0],
        newSegmentCoordinates01[3][1],
      ];
      var outTangent = [
        newSegmentCoordinates01[2][0],
        newSegmentCoordinates01[2][1],
      ];
      var nextpointInTangent = [
        newSegmentCoordinates02[2][0],
        newSegmentCoordinates02[2][1],
      ];
      var nextpointOutTangent = [
        newSegmentCoordinates02[3][0],
        newSegmentCoordinates02[3][1],
      ];
      myVertices = mySpline.value.vertices;
      myVertices.splice(myIndex + 1, 0, midPoint);
      myInTangent = mySpline.value.inTangents;
      myInTangent.splice(myIndex + 1, 0, inTangent);
      myInTangent[myIndex + 2] = nextpointInTangent;
      myOutTangent = mySpline.value.outTangents;
      myOutTangent.splice(myIndex + 1, 0, nextpointOutTangent);
      myOutTangent[myIndex] = outTangent;
      var newShape = new Shape();
      newShape.vertices = myVertices;
      newShape.inTangents = myInTangent;
      newShape.outTangents = myOutTangent;
      mySpline.setValue(newShape);
      return mySpline;
    }
    function subdivideBCK(mySpline, myIndex) {
      var vertexes = mySpline.value.vertices;
      var mySegment = splineSegmentBCK(mySpline, myIndex);
      var midPointRectangle01 = bsplit(mySegmentFWD, 0.5);
      var midPointRectangle02 = bsplit(mySegmentFWD.reverse(), 0.5);
      var newSegmentCoordinates01 = shuffleCoordinatesBCK(midPointRectangle01);
      var newSegmentCoordinates02 = shuffleCoordinatesBCK(midPointRectangle01);
      var midPoint = [
        newSegmentCoordinates01[3][0],
        newSegmentCoordinates01[3][1],
      ];
      var inTangent = [
        newSegmentCoordinates01[2][0],
        newSegmentCoordinates01[2][1],
      ];
      var outTangent = [
        newSegmentCoordinates02[1][0],
        newSegmentCoordinates02[1][1],
      ];
      var nextpointInTangent = [
        newSegmentCoordinates02[1][0],
        newSegmentCoordinates02[1][1],
      ];
      var nextpointOutTangent = [
        newSegmentCoordinates02[2][0],
        newSegmentCoordinates02[2][1],
      ];
      myVertices = mySpline.value.vertices;
      myVertices.splice(myIndex - 1, 0, midPoint);
      myInTangent = mySpline.value.inTangents;
      myInTangent.splice(myIndex - 1, 0, inTangent);
      myInTangent[myIndex - 2] = nextpointInTangent;
      myOutTangent = mySpline.value.outTangents;
      myOutTangent.splice(myIndex - 1, 0, nextpointOutTangent);
      myOutTangent[myIndex] = outTangent;
      var newShape = new Shape();
      newShape.vertices = myVertices;
      newShape.inTangents = myInTangent;
      newShape.outTangents = myOutTangent;
      mySpline.setValue(newShape);
      return mySpline;
    }
    function gimmeVertexIndexTopLeft(myArray) {
      var myArrayYs = [];
      var myArrayXs = [];
      var smallestYarray = [];
      for (var y = 0; y < myArray.length; y += 1) {
        myArrayYs.push(myArray[y][1]);
      }
      var smallestY = Math.min.apply(Math, myArrayYs);
      for (var i = 0; i < myArray.length; i += 1) {
        if (myArray[i][1] === smallestY) {
          smallestYarray.push(myArray[i]);
        }
      }
      for (var x = 0; x < smallestYarray.length; x += 1) {
        myArrayXs.push(smallestYarray[x][0]);
      }
      var smallestX = Math.min.apply(Math, myArrayXs);
      var targetVertex = [smallestX, smallestY];
      var targetVertexIndex = indexOfCustom(myArray, targetVertex);
      return targetVertexIndex;
    }
    function gimmeVertexIndexTopRight(myArray) {
      var largestXarray = [];
      var myArrayXs = myArray.map(function (arr) {
        return arr[0];
      });
      var largestX = Math.max.apply(Math, myArrayXs);
      for (var i = 0; i < myArray.length; i += 1) {
        if (myArray[i][0] === largestX) {
          largestXarray.push(myArray[i]);
        }
      }
      var myArrayYs = largestXarray.map(function (arr) {
        return arr[1];
      });
      var largestY = Math.max.apply(Math, myArrayYs);
      var targetVertex = [largestX, largestY];
      var targetVertexIndex = indexOfCustom(myArray, targetVertex);
      return targetVertexIndex;
    }
    function shuffleArray(myArray) {
      var firstElement = myArray.shift();
      myArray.push(firstElement);
      return myArray;
    }
    function reOrderArray(myArray, myFirstVertexIndex) {
      for (var x = 1; x <= myFirstVertexIndex; x += 1) {
        shuffleArray(myArray);
      }
      return myArray;
    }
    function setFirstVertexTopLeft(splineObj) {
      var curSplineInTang = splineObj.value.inTangents;
      var curSplineVertex = splineObj.value.vertices;
      var curSplineOutTang = splineObj.value.outTangents;
      var leadingVertex = gimmeVertexIndexTopLeft(curSplineVertex);
      var alignedVertexes = reOrderArray(curSplineVertex, leadingVertex);
      var alignedInTang = reOrderArray(curSplineInTang, leadingVertex);
      var alignedOutTang = reOrderArray(curSplineOutTang, leadingVertex);
      var alignedSpline = new Shape();
      alignedSpline.vertices = alignedVertexes;
      alignedSpline.inTangents = alignedInTang;
      alignedSpline.outTangents = alignedOutTang;
      splineObj.setValue(alignedSpline);
      return splineObj;
    }
    function setFirstVertexTopRight(splineObj) {
      var curSplineVertex = splineObj.value.vertices;
      var curSplineInTang = splineObj.value.inTangents;
      var curSplineOutTang = splineObj.value.outTangents;
      var leadingVertex = gimmeVertexIndexTopRight(curSplineVertex);
      var alignedVertexes = reOrderArray(curSplineVertex, leadingVertex);
      var alignedInTang = reOrderArray(curSplineInTang, leadingVertex);
      var alignedOutTang = reOrderArray(curSplineOutTang, leadingVertex);
      var alignedSpline = new Shape();
      alignedSpline.vertices = alignedVertexes;
      alignedSpline.inTangents = alignedInTang;
      alignedSpline.outTangents = alignedOutTang;
      splineObj.setValue(alignedSpline);
      return splineObj;
    }
    function setFirstVertexRandom(splineObj, givenIndex) {
      var curSplineVertex = splineObj.value.vertices;
      var curSplineInTang = splineObj.value.inTangents;
      var curSplineOutTang = splineObj.value.outTangents;
      var leadingVertex = gimmeVertexIndexTopLeft(curSplineVertex);
      var alignedVertexes = reOrderArray(
        curSplineVertex,
        leadingVertex + givenIndex,
      );
      var alignedInTang = reOrderArray(
        curSplineInTang,
        leadingVertex + givenIndex,
      );
      var alignedOutTang = reOrderArray(
        curSplineOutTang,
        leadingVertex + givenIndex,
      );
      var alignedSpline = new Shape();
      alignedSpline.vertices = alignedVertexes;
      alignedSpline.inTangents = alignedInTang;
      alignedSpline.outTangents = alignedOutTang;
      splineObj.setValue(alignedSpline);
      return splineObj;
    }
    function resetFirstVertex(shapeObj, leadingVertex) {
      var curShapeVertex = shapeObj.value.vertices;
      var curShapeInTang = shapeObj.value.inTangents;
      var curShapeOutTang = shapeObj.value.outTangents;
      var alignedVertexes = reOrderArray(curShapeVertex, leadingVertex);
      var alignedInTang = reOrderArray(curShapeInTang, leadingVertex);
      var alignedOutTang = reOrderArray(curShapeOutTang, leadingVertex);
      var alignedShape = new Shape();
      alignedShape.vertices = alignedVertexes;
      alignedShape.inTangents = alignedInTang;
      alignedShape.outTangents = alignedOutTang;
      shapeObj.setValue(alignedShape);
      return shapeObj;
    }
    function gimmeSplineToSubdivide(spline_A, spline_B) {
      if (spline_A.value.vertices.length === spline_B.value.vertices.length) {
        return spline_A;
      } else {
        if (
          spline_A.value.vertices.length ===
          Math.min(
            spline_A.value.vertices.length,
            spline_B.value.vertices.length,
          )
        ) {
          return spline_A;
        } else {
          if (
            spline_B.value.vertices.length ===
            Math.min(
              spline_A.value.vertices.length,
              spline_B.value.vertices.length,
            )
          ) {
            return spline_B;
          }
        }
      }
    }
    function gimmeSplineToMatch(spline_A, spline_B) {
      if (spline_A.value.vertices.length === spline_B.value.vertices.length) {
        return spline_B;
      } else {
        if (
          spline_A.value.vertices.length ===
          Math.max(
            spline_A.value.vertices.length,
            spline_B.value.vertices.length,
          )
        ) {
          return spline_A;
        } else {
          if (
            spline_B.value.vertices.length ===
            Math.max(
              spline_A.value.vertices.length,
              spline_B.value.vertices.length,
            )
          ) {
            return spline_B;
          }
        }
      }
    }
    function gimmeFolder(folderName) {
      for (var i = 1; i <= app.project.numItems; i += 1) {
        if (
          app.project.item(i) instanceof FolderItem &&
          app.project.item(i).name === folderName
        ) {
          myTargetFolder = app.project.item(i);
          return myTargetFolder;
        }
      }
      return myTargetFolder;
    }
    function deselectLayers() {
      var comp = app.project.activeItem;
      for (var i = 1; i <= comp.numLayers; i += 1) {
        comp.layer(i).selected = false;
      }
    }
    function splitInLines_directions(arrayOne, arrayTwo, arrayThree) {
      var myString = "";
      for (var i = 0; i < arrayOne.length; i += 1) {
        myString =
          myString +
          calcAngleDegrees(arrayOne[i][0], arrayOne[i][1]).toString() +
          "," +
          arrayTwo[i].toString() +
          "," +
          calcAngleDegrees(arrayThree[i][0], arrayThree[i][1]).toString() +
          "\r\n";
      }
      return myString;
    }
    function splitInLines_vectors(arrayOne, arrayTwo, arrayThree) {
      var myString = "";
      for (var i = 0; i < arrayOne.length; i += 1) {
        myString =
          myString +
          arrayOne[i].toString() +
          "," +
          arrayTwo[i].toString() +
          "," +
          arrayThree[i].toString() +
          "\r\n";
      }
      return myString;
    }
    function splitInLines_segments(arrayOne, arrayTwo, arrayThree) {
      var myString = "";
      for (var i = 0; i < arrayTwo.length; i += 1) {
        curPoint = arrayTwo[i];
        if (i === arrayTwo.length - 1) {
          nextPoint = arrayTwo[0];
        } else {
          nextPoint = arrayTwo[i + 1];
        }
        curVector = [nextPoint[0] - curPoint[0], nextPoint[1] - curPoint[1]];
        myString =
          myString +
          calcAngleDegrees(arrayOne[i][0], arrayOne[i][1]).toString() +
          "," +
          calcAngleDegrees(curVector[0], curVector[1]).toString() +
          "," +
          calcAngleDegrees(arrayThree[i][0], arrayThree[i][1]).toString() +
          "\r\n";
      }
      return myString;
    }
    function logSelectedShapeLayer(layerObj, prefix) {
      logVertex(layerObj, prefix);
      logInTangets(layerObj, prefix);
      logOutTangets(layerObj, prefix);
    }
    function logSplineDetails_vectors(splineObj, index, suffix, fontName) {
      var inTang = splineObj.value.inTangents;
      var vertex = splineObj.value.vertices;
      var outTang = splineObj.value.outTangents;
      var character = splineObj.parentProperty.name;
      var leadingVertex = gimmeVertexIndexTopLeft(vertex);
      var alignedVertexes = reOrderArray(vertex, leadingVertex);
      var alignedInTang = reOrderArray(inTang, leadingVertex);
      var alignedOutTang = reOrderArray(outTang, leadingVertex);
      var specificFolderPath =
        subFolder_Documents +
        fontName +
        separator +
        character.toString() +
        separator;
      var fileExtension = ".csv";
      if (suffix === undefined) {
        suffix = "";
      }
      for (var i = 0; i < vertex.length; i += 1) {
        var fileName =
          character.toString() +
          "_" +
          fontName.toString() +
          "_spline" +
          index +
          suffix +
          fileExtension;
        writeFile(
          specificFolderPath + fileName,
          splitInLines_vectors(alignedInTang, alignedVertexes, alignedOutTang),
        );
      }
      return specificFolderPath;
    }
    function logFIXEDSplineDetails_vectors(
      splineObj,
      index,
      suffix,
      fontName,
      character,
    ) {
      var inTang = splineObj.inTangents;
      var vertex = splineObj.vertices;
      var outTang = splineObj.outTangents;
      var specificFolderPath =
        subFolder_Documents + "/" + fontName + "/" + character + "_fixed/";
      var fileExtension = ".csv";
      if (suffix === undefined) {
        suffix = "";
      }
      for (var i = 0; i < vertex.length; i += 1) {
        var fileName =
          character.toString() +
          "_" +
          fontName.toString() +
          "_spline" +
          index +
          suffix +
          fileExtension;
        writeFile(
          specificFolderPath + fileName,
          splitInLines_vectors(inTang, vertex, outTang),
        );
      }
    }
    function logShapeDetails_directions(shapeObj, suffix) {
      var inTang = shapeObj.value.inTangents;
      var vertex = shapeObj.value.vertices;
      var outTang = shapeObj.value.outTangents;
      var prefix = shapeObj.parentProperty.name;
      var fileExtension = ".csv";
      if (suffix === undefined) {
        suffix = "";
      }
      for (var i = 0; i < vertex.length; i += 1) {
        var fileName =
          prefix.toString() + "_shapeDetails_" + suffix + fileExtension;
        writeFile(
          subFolder_Documents + fileName,
          splitInLines_directions(inTang, vertex, outTang),
        );
      }
    }
    function logShapeDetails_segments(shapeObj, suffix) {
      var inTang = shapeObj.value.inTangents;
      var vertex = shapeObj.value.vertices;
      var outTang = shapeObj.value.outTangents;
      var prefix = shapeObj.parentProperty.name;
      var fileExtension = ".csv";
      if (suffix === undefined) {
        suffix = "";
      }
      for (var i = 0; i < vertex.length; i += 1) {
        var fileName =
          prefix.toString() + "_shapeSegments_" + suffix + fileExtension;
        writeFile(
          subFolder_Documents + fileName,
          splitInLines_segments(inTang, vertex, outTang),
        );
      }
    }
    function interpolation(mySpline) {
      var splineID = {
        direction: [],
        interpolationType: [],
        name:
          mySpline.parentProperty.name.toString() +
          "_" +
          mySpline.parentProperty.propertyIndex.toString(),
      };
      var vertexesAll = mySpline.value.vertices;
      var inTangtsAll = mySpline.value.inTangents;
      var outTangtsAll = mySpline.value.outTangents;
      var linearType = [];
      var contBezierType = [];
      var linearInType = [];
      var linearOutType = [];
      var bezierVertType = [];
      var bezierHorizType = [];
      var otherBezierType = [];
      var arrowBezierType = [];
      for (var i = 0; i < vertexesAll.length; i += 1) {
        if (i === vertexesAll.length - 1) {
          nextVertex = vertexesAll[0];
        } else {
          nextVertex = vertexesAll[i + 1];
        }
        if (i === 0) {
          precVertex = vertexesAll[vertexesAll.length - 1];
        } else {
          precVertex = vertexesAll[i - 1];
        }
        var curVertex = vertexesAll[i];
        var precDirect = [
          curVertex[0] - precVertex[0],
          curVertex[1] - precVertex[1],
        ];
        var curDirect = [
          nextVertex[0] - curVertex[0],
          nextVertex[1] - curVertex[1],
        ];
        var overDirection = [
          nextVertex[0] - precVertex[0],
          nextVertex[1] - precVertex[1],
        ];
        var curInTagnts = inTangtsAll[i];
        var curOutTagnts = outTangtsAll[i];
        var precMagnitude = calcAngleDegrees(precDirect[0], precDirect[1]);
        var curMagnitude = calcAngleDegrees(curDirect[0], curDirect[1]);
        var overMagnitude = calcAngleDegrees(
          overDirection[0],
          overDirection[1],
        );
        var curInTangMagnitude = calcAngleDegrees(
          curInTagnts[0],
          curInTagnts[1],
        );
        var curOutTangMagnitude = calcAngleDegrees(
          curOutTagnts[0],
          curOutTagnts[1],
        );
        if (curMagnitude > -1 && curMagnitude < 1) {
          splineID.direction.push("E");
        } else if (curMagnitude >= 1 && curMagnitude < 90) {
          splineID.direction.push("SE");
        } else if (curMagnitude === 90) {
          splineID.direction.push("S");
        } else if (curMagnitude > 90 && curMagnitude < 180) {
          splineID.direction.push("SW");
        } else if (curMagnitude === 180) {
          splineID.direction.push("W");
        } else if (curMagnitude <= 0 && curMagnitude > -90) {
          splineID.direction.push("NE");
        } else if (curMagnitude === -90) {
          splineID.direction.push("N");
        } else if (curMagnitude < -90 && curMagnitude > -180) {
          splineID.direction.push("NW");
        } else {
          splineID.direction.push("other");
        }
      }
      return splineID;
    }
    function gimmeKeyInterpolations(mySpline) {
      var variableToReturn = interpolation(mySpline)
        .linear.concat(
          interpolation(mySpline).linearIn,
          interpolation(mySpline).linearOut,
          interpolation(mySpline).bezierVert,
          interpolation(mySpline).bezierHoriz,
          interpolation(mySpline).arrowBezier,
        )
        .sort(function (a, b) {
          return a - b;
        });
      if (
        variableToReturn[variableToReturn.length - 1] !==
        mySpline.value.vertices.length - 1
      ) {
        variableToReturn.push(mySpline.value.vertices.length - 1);
      }
      return variableToReturn;
    }
    function gimmeKeyInterpolations_simple(mySpline) {
      var variableToReturn = interpolation(mySpline)
        .linear.concat(
          interpolation(mySpline).bezierVert,
          interpolation(mySpline).bezierHoriz,
          interpolation(mySpline).arrowBezier,
        )
        .sort(function (a, b) {
          return a - b;
        });
      if (
        variableToReturn[variableToReturn.length - 1] !==
        mySpline.value.vertices.length - 1
      ) {
        variableToReturn.push(mySpline.value.vertices.length - 1);
      }
      return variableToReturn;
    }
    function gimmeCornerStones(myArray) {
      var cornerStones = [myArray[0]];
      for (var i = 0; i < myArray.length; i += 1) {
        var curStone = myArray[i];
        if (curStone !== cornerStones) {
          cornerStones.push(curStone);
        }
      }
    }
    function gimmeLargerArray(arraySubd, arrayMatch) {
      if (arraySubd.length === Math.max(arraySubd.length, arrayMatch.length)) {
        return arraySubd;
      } else {
        if (
          arrayMatch.length === Math.max(arraySubd.length, arrayMatch.length)
        ) {
          return arrayMatch;
        }
      }
    }
    function conformWithCardinals(spline_A, spline_B) {
      try {
        var splineToSubdivide = gimmeSplineToSubdivide(spline_A, spline_B);
        var splineToMatch = gimmeSplineToMatch(spline_A, spline_B);
        var splineToSubdivideID = interpolation(splineToSubdivide);
        var splineToMatchID = interpolation(splineToMatch);
        var flag_Subd = splineToSubdivideID.direction[0];
        var flag_Match = splineToMatchID.direction[0];
        var changeOfDirection_Subd = [0];
        var changeOfDirection_Match = [0];
        for (var x = 1; x < splineToSubdivide.value.vertices.length; x += 1) {
          if (splineToSubdivideID.direction[x] !== flag_Subd) {
            flag_Subd = splineToSubdivideID.direction[x];
            changeOfDirection_Subd.push(x);
          }
        }
        for (var y = 0; y < splineToMatch.value.vertices.length; y += 1) {
          if (splineToMatchID.direction[y] !== flag_Match) {
            flag_Match = splineToMatchID.direction[y];
            changeOfDirection_Match.push(y);
          }
        }
        if (
          changeOfDirection_Subd[changeOfDirection_Subd.length] !==
          splineToSubdivide.value.vertices.length
        ) {
          changeOfDirection_Subd.push(splineToSubdivide.value.vertices.length);
        }
        if (
          changeOfDirection_Match[changeOfDirection_Match.length] !==
          splineToMatch.value.vertices.length
        ) {
          changeOfDirection_Match.push(splineToMatch.value.vertices.length);
        }
        if (changeOfDirection_Subd.length !== changeOfDirection_Match.length) {
          var counter = gimmeLargerArray(
            changeOfDirection_Subd,
            changeOfDirection_Match,
          );
          for (var ai = 0; ai < counter.length; ai += 1) {
            if (
              splineToSubdivideID.direction[changeOfDirection_Subd[ai]] !==
                undefined ||
              splineToMatchID.direction[changeOfDirection_Match[ai]] !==
                undefined
            ) {
              if (
                splineToSubdivideID.direction[changeOfDirection_Subd[ai]] !==
                splineToMatchID.direction[changeOfDirection_Match[ai]]
              ) {
                if (
                  changeOfDirection_Subd.length ===
                  Math.max(
                    changeOfDirection_Subd.length,
                    changeOfDirection_Match.length,
                  )
                ) {
                  changeOfDirection_Subd.splice(ai + 1, 1);
                  counter = gimmeLargerArray(
                    changeOfDirection_Subd,
                    changeOfDirection_Match,
                  );
                } else {
                  if (
                    changeOfDirection_Match.length ===
                    Math.max(
                      changeOfDirection_Subd.length,
                      changeOfDirection_Match.length,
                    )
                  ) {
                    changeOfDirection_Match.splice(ai + 1, 1);
                    counter = gimmeLargerArray(
                      changeOfDirection_Subd,
                      changeOfDirection_Match,
                    );
                  }
                }
              }
            }
          }
        }
        var cardinalsToSubdivide = [];
        var cardinalsToMatch = [];
        for (var z = 0; z < changeOfDirection_Subd.length; z += 1) {
          cardinalsToSubdivide.push(
            splineToSubdivideID.direction[changeOfDirection_Subd[z]],
          );
          cardinalsToMatch.push(
            splineToMatchID.direction[changeOfDirection_Match[z]],
          );
        }
        for (var i = 0; i < changeOfDirection_Match.length; i += 1) {
          var splineToMatchNextKey = changeOfDirection_Match[i + 1];
          var splineToMatchCurKey = changeOfDirection_Match[i];
          var splineToSubdivideNextKey = changeOfDirection_Subd[i + 1];
          var splineToSubdivideCurKey = changeOfDirection_Subd[i];
          var difference =
            splineToMatchNextKey -
            splineToMatchCurKey -
            (splineToSubdivideNextKey - splineToSubdivideCurKey);
          if (difference != 0) {
            if (difference < 0) {
              for (var d = 0; d < Math.abs(difference); d += 1) {
                subdivideFWD(splineToMatch, splineToMatchCurKey + 2 * d);
              }
            } else {
              if (difference > 0) {
                for (var d = 0; d < Math.abs(difference); d += 1) {
                  subdivideFWD(splineToSubdivide, splineToMatchCurKey + 2 * d);
                }
              }
            }
          }
        }
      } catch (e) {
        return e;
      }
    }
    function conformAllSplines(myShape_A, myShape_B) {
      for (var i = 1; i < myShape_A.numProperties; i += 1) {
        if (
          myShape_A.property("ADBE Vectors Group").property(i).matchName ===
          "ADBE Vector Shape - Group"
        ) {
          var curShape_A = myShape_A.property("ADBE Vectors Group");
          var curSpline_A = curShape_A
            .property(i)
            .property("ADBE Vector Shape");
          var curShape_B = myShape_B.property("ADBE Vectors Group");
          var curSpline_B = curShape_B
            .property(i)
            .property("ADBE Vector Shape");
          var isItconformed = conformWithCardinals(curSpline_A, curSpline_B);
        }
      }
    }
    function cleanALLSplines(rootVectorsGroup) {
      var letterSplines = gimmeSplines(rootVectorsGroup);
      try {
        for (var ls = 0; ls < letterSplines.length; ls += 1) {
          var curSpline = letterSplines[ls];
          var curSplineNumVertex = curSpline.value.vertices.length;
          for (var v = 0; v < curSplineNumVertex - 1; v += 1) {
            var curVertex = curSpline.value.vertices[v];
            var curVertexIN = curSpline.value.inTangents[v];
            var curVertexOUT = curSpline.value.outTangents[v];
            var nextVertex = curSpline.value.vertices[v + 1];
            var nextVertexIN = curSpline.value.inTangents[v + 1];
            var nextVertexOUT = curSpline.value.outTangents[v + 1];
            var x1 = curVertex[0];
            var x2 = nextVertex[0];
            var y1 = curVertex[1];
            var y2 = nextVertex[1];
            var distance = Math.sqrt(
              (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1),
            );
            if (distance > -1 && distance < 1) {
              if (
                calcAngleDegrees(curVertexIN[0], curVertexIN[1]) === 0 &&
                calcAngleDegrees(curVertexOUT[0], curVertexOUT[1]) === 0
              ) {
                mergeTwoVertex_precIndex(curSpline, v);
              } else {
                mergeTwoVertex_curIndex(curSpline, v);
              }
            }
            curSplineNumVertex = curSpline.value.vertices.length;
          }
        }
      } catch (e) {
        return e;
      }
    }
    function writeMorphKeyframes(morphLayerObj, endLayerObj) {
      try {
        function createKeyframeOne(vectorGroup) {
          for (var i = 1; i < vectorGroup.numProperties; i += 1) {
            if (
              vectorGroup.property("ADBE Vectors Group").property(i)
                .matchName === "ADBE Vector Shape - Group"
            ) {
              var curShape = vectorGroup
                .property("ADBE Vectors Group")
                .property(i)
                .property("ADBE Vector Shape");
              var curShapeVertex = curShape.value.vertices;
              var curShapeInTang = curShape.value.inTangents;
              var curShapeOutTang = curShape.value.outTangents;
              var leadingVertex = gimmeVertexIndexTopLeft(curShapeVertex);
              var alignedVertexes = reOrderArray(curShapeVertex, leadingVertex);
              var alignedInTang = reOrderArray(curShapeInTang, leadingVertex);
              var alignedOutTang = reOrderArray(curShapeOutTang, leadingVertex);
              var alignedShape = new Shape();
              alignedShape.vertices = alignedVertexes;
              alignedShape.inTangents = alignedInTang;
              alignedShape.outTangents = alignedOutTang;
              vectorGroup
                .property("ADBE Vectors Group")
                .property(i)
                .property("ADBE Vector Shape")
                .setValueAtTime(0, alignedShape);
              vectorGroup
                .property("ADBE Vectors Group")
                .property(i)
                .property("ADBE Vector Shape")
                .setValueAtTime(1, alignedShape);
            }
          }
        }
        function updateSecondKeframe(targetVectorGroup) {
          for (var i = 1; i < targetVectorGroup.numProperties; i += 1) {
            if (
              targetVectorGroup.property("ADBE Vectors Group").property(i)
                .matchName === "ADBE Vector Shape - Group"
            ) {
              var endShape = endVectorGroup
                .property("ADBE Vectors Group")
                .property(i)
                .property("ADBE Vector Shape");
              var endShapeVertex = endShape.value.vertices;
              var endShapeInTang = endShape.value.inTangents;
              var endShapeOutTang = endShape.value.outTangents;
              var leadingVertex = gimmeVertexIndexTopLeft(endShapeVertex);
              var alignedEndVertexes = reOrderArray(
                endShapeVertex,
                leadingVertex,
              );
              var alignedEndInTang = reOrderArray(
                endShapeInTang,
                leadingVertex,
              );
              var alignedEndOutTang = reOrderArray(
                endShapeOutTang,
                leadingVertex,
              );
              var alignedEndShape = new Shape();
              alignedEndShape.vertices = alignedEndVertexes;
              alignedEndShape.inTangents = alignedEndInTang;
              alignedEndShape.outTangents = alignedEndOutTang;
              targetVectorGroup
                .property("ADBE Vectors Group")
                .property(i)
                .property("ADBE Vector Shape")
                .setValueAtKey(2, alignedEndShape);
            }
          }
        }
        var morphVectorGroup = morphLayerObj
          .property("ADBE Root Vectors Group")
          .property(1);
        var endVectorGroup = endLayerObj
          .property("ADBE Root Vectors Group")
          .property(1);
        createKeyframeOne(morphVectorGroup);
        updateSecondKeframe(morphVectorGroup);
      } catch (e) {
        return e;
      }
    }
    function changeShapesOrderTopLeft(layerObj) {
      function functionGimmeAlignedSplines() {
        var mySplines = [];
        for (var i = 1; i < rootVectorGroup.numProperties; i += 1) {
          var curItem = rootVectorGroup
            .property("ADBE Vectors Group")
            .property(i);
          if (curItem.matchName === "ADBE Vector Shape - Group") {
            setFirstVertexTopLeft(curItem.property("Path"));
            mySplines.push(curItem.property("Path"));
          }
        }
        return mySplines;
      }
      function gimmesplineFirstVertex() {
        var myFirstVeretx = [];
        if (splines.length > 1) {
          for (var s = 0; s < splines.length; s += 1) {
            var curSpline = splines[s];
            var curSplinefirstVertex = curSpline.value.vertices[0];
            myFirstVeretx.push(curSplinefirstVertex);
          }
        }
        return myFirstVeretx;
      }
      function gimmeShapeGroupAmended() {
        var myTopToBottomSplines = [];
        for (var w = 0; w < splines.length; w += 1) {
          var leadingSpline = gimmeVertexIndexTopLeft(splineFirstVertex);
          myTopToBottomSplines.push(splines[leadingSpline]);
          splines.splice(leadingSpline, 1);
          splineFirstVertex.splice(leadingSpline, 1);
        }
        myTopToBottomSplines.push(splines[0]);
        return myTopToBottomSplines;
      }
      var rootVectorGroup = layerObj
        .property("ADBE Root Vectors Group")
        .property(1);
      var splines = functionGimmeAlignedSplines();
      var splineFirstVertex = gimmesplineFirstVertex();
      var amendedShapes = gimmeShapeGroupAmended();
      if (splines.length > 0) {
        var newLayer = layerObj.duplicate();
        var newLayerRootVectors = newLayer
          .property("ADBE Root Vectors Group")
          .property(1);
        for (var ii = 1; ii < newLayerRootVectors.numProperties; ii += 1) {
          if (
            newLayerRootVectors.property("ADBE Vectors Group").property(ii)
              .matchName === "ADBE Vector Shape - Group"
          ) {
            var newLayerCurItem =
              newLayerRootVectors.property("ADBE Vectors Group");
            var newLayerCurShape = newLayerCurItem
              .property(ii)
              .property("ADBE Vector Shape");
            var orderNewShape = new Shape();
            orderNewShape.vertices = amendedShapes[ii - 1].value.vertices;
            orderNewShape.inTangents = amendedShapes[ii - 1].value.inTangents;
            orderNewShape.outTangents = amendedShapes[ii - 1].value.outTangents;
            newLayerCurShape.setValue(orderNewShape);
          }
        }
        var layerName = layerObj.name;
        layerObj.remove();
        newLayer.name = layerName;
      }
    }
    function gimmeSplines(rootVectorGroup) {
      var mySplines = [];
      for (var i = 1; i < rootVectorGroup.numProperties; i += 1) {
        if (
          rootVectorGroup.property("ADBE Vectors Group").property(i)
            .matchName === "ADBE Vector Shape - Group"
        ) {
          var curLetter = rootVectorGroup.property("ADBE Vectors Group");
          var curLetterSpline = curLetter
            .property(i)
            .property("ADBE Vector Shape");
          mySplines.push(curLetterSpline);
        }
      }
      return mySplines;
    }
    function gimmeLargerSpline(startSplinesArray, endSplinesArray) {
      var numberOfSplines = startSplinesArray.length;
      for (var i = 0; i < numberOfSplines; i += 1) {
        var curStartVertexCount = startSplinesArray[i].value.vertices.length;
        var curEndVertexCount = endSplinesArray[i].value.vertices.length;
        if (curStartVertexCount - curEndVertexCount != 0) {
          if (curStartVertexCount > curEndVertexCount) {
            return startSplinesArray[i];
          } else if (curStartVertexCount < curEndVertexCount) {
            return endSplinesArray[i];
          } else {
            return false;
          }
        }
      }
    }
    function deleteVertexFromSpline(splineObj, targetIndex) {
      var curSplineVertex = splineObj.value.vertices;
      var curSplineInTang = splineObj.value.inTangents;
      var curSplineOutTang = splineObj.value.outTangents;
      curSplineVertex.splice(targetIndex, 1);
      curSplineInTang.splice(targetIndex, 1);
      curSplineOutTang.splice(targetIndex, 1);
      var amendedSpline = new Shape();
      amendedSpline.vertices = curSplineVertex;
      amendedSpline.inTangents = curSplineInTang;
      amendedSpline.outTangents = curSplineOutTang;
      splineObj.setValue(amendedSpline);
      return splineObj;
    }
    function mergeTwoVertex_curIndex(splineObj, targetIndex) {
      var curSplineVertex = splineObj.value.vertices;
      var curSplineInTang = splineObj.value.inTangents;
      var curSplineOutTang = splineObj.value.outTangents;
      var oldInTangents = curSplineInTang[targetIndex];
      var oldOutTangents = curSplineOutTang[targetIndex];
      var oldINx = oldInTangents[0];
      var oldINy = oldInTangents[1];
      var oldOUTx = oldOutTangents[0];
      var oldOUTy = oldOutTangents[1];
      curSplineVertex.splice(targetIndex, 1);
      curSplineInTang.splice(targetIndex, 1);
      curSplineOutTang.splice(targetIndex, 1);
      curSplineInTang[targetIndex] = [
        curSplineInTang[targetIndex][0] + oldINx,
        curSplineInTang[targetIndex][1] + oldINy,
      ];
      curSplineOutTang[targetIndex] = [
        curSplineOutTang[targetIndex][0] + oldOUTx,
        curSplineOutTang[targetIndex][1] + oldOUTy,
      ];
      var amendedSpline = new Shape();
      amendedSpline.vertices = curSplineVertex;
      amendedSpline.inTangents = curSplineInTang;
      amendedSpline.outTangents = curSplineOutTang;
      splineObj.setValue(amendedSpline);
      return splineObj;
    }
    function mergeTwoVertex_precIndex(splineObj, targetIndex) {
      var curSplineVertex = splineObj.value.vertices;
      var curSplineInTang = splineObj.value.inTangents;
      var curSplineOutTang = splineObj.value.outTangents;
      var oldInTangents = curSplineInTang[targetIndex + 1];
      var oldOutTangents = curSplineOutTang[targetIndex + 1];
      var oldINx = oldInTangents[0];
      var oldINy = oldInTangents[1];
      var oldOUTx = oldOutTangents[0];
      var oldOUTy = oldOutTangents[1];
      curSplineVertex.splice(targetIndex + 1, 1);
      curSplineInTang.splice(targetIndex + 1, 1);
      curSplineOutTang.splice(targetIndex + 1, 1);
      curSplineInTang[targetIndex] = [
        curSplineInTang[targetIndex][0] + oldINx,
        curSplineInTang[targetIndex][1] + oldINy,
      ];
      curSplineOutTang[targetIndex] = [
        curSplineOutTang[targetIndex][0] + oldOUTx,
        curSplineOutTang[targetIndex][1] + oldOUTy,
      ];
      var amendedSpline = new Shape();
      amendedSpline.vertices = curSplineVertex;
      amendedSpline.inTangents = curSplineInTang;
      amendedSpline.outTangents = curSplineOutTang;
      splineObj.setValue(amendedSpline);
      return splineObj;
    }
    function gimmeWiderGliph(layer_a, layer_b) {
      layer_a_Width = Math.round(layer_a.sourceRectAtTime(0, true).width);
      layer_b_Width = Math.round(layer_a.sourceRectAtTime(0, true).height);
      return Math.max(layer_a_Width, layer_b_Width);
    }
    function createMorphsContainer(givenString) {
      for (var c = 0; c < givenString.length; c += 1) {
        var curCharacter = givenString[c];
        var myComp = gimmeComp(labName);
        var myFontName = gimmeFontName();
        if (
          gimmeComp(preComposedLayerName(curCharacter, myFontName)) == undefined
        ) {
          var typeStart = myComp.layer(morphStartLayerName);
          var typeEnd = myComp.layer(morphEndLayerName);
          var text01Prop = typeStart
            .property("ADBE Text Properties")
            .property("ADBE Text Document");
          var text01TextDocument = text01Prop.value;
          text01TextDocument.fontSize = 200;
          text01Prop.setValue(text01TextDocument);
          var text02Prop = typeEnd
            .property("ADBE Text Properties")
            .property("ADBE Text Document");
          var text02TextDocument = text02Prop.value;
          text02TextDocument.fontSize = 200;
          text02Prop.setValue(text02TextDocument);
          var myCharacterStart = typeStart.duplicate();
          var myCharacterEnd = typeEnd.duplicate();
          myCharacterStart
            .property("ADBE Text Properties")
            .property("ADBE Text Document")
            .setValue(curCharacter);
          myCharacterEnd
            .property("ADBE Text Properties")
            .property("ADBE Text Document")
            .setValue(curCharacter);
          typeStart = myCharacterStart;
          typeEnd = myCharacterEnd;
          for (var l = 1; l <= myComp.numLayers; l += 1) {
            myComp.layer(l).selected = false;
          }
          myComp.layers.precompose(
            [typeStart.index, typeEnd.index],
            preComposedLayerName(curCharacter, myFontName),
            true,
          );
          myComp = gimmeComp(preComposedLayerName(curCharacter, myFontName));
          myComp.layer(1).name = morphStartLayerName;
          myComp.layer(2).name = morphEndLayerName;
          typeStart = myComp.layer(morphStartLayerName);
          typeEnd = myComp.layer(morphEndLayerName);
          myComp.width =
            Math.round(typeEnd.sourceRectAtTime(1, true).width) + 10;
          myComp.height =
            Math.round(typeEnd.sourceRectAtTime(1, true).height) + 10;
          myComp.duration = 1;
          var masterComp = gimmeComp(labName);
          masterComp
            .layer(preComposedLayerName(curCharacter, myFontName))
            .remove();
          var fontFolder = findOrCreateParentFolder(
            myFontName + "_characters",
            myComp,
          );
          var masterFolder = findOrCreateParentFolder("tm_morphs", fontFolder);
        }
      }
    }
    function resetMyPivot(myName, textInput) {
      var myFontFamily = gimmeFontName();
      var myComp = gimmeComp(textInput + "_" + myFontFamily);
      var mySelf = myComp.layer(myName);
      var mySelfWidth = mySelf.width;
      var myCompWidth = myComp.width;
      var myCompWidth100 = Number(myCompWidth / 100).toFixed();
      var extraMargin = myCompWidth100 * 1;
      var myPivot = mySelf
        .property("ADBE Transform Group")
        .property("ADBE Anchor Point").value;
      var myContent = gimmeComp(myName).layer(1);
      var myContentPosition = myContent
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .valueAtTime(0, true);
      mySelf
        .property("ADBE Transform Group")
        .property("ADBE Anchor Point")
        .setValue([myPivot[0], myContentPosition[1]]);
      mySelf
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([
          mySelf.width / 2 + extraMargin,
          myComp.height - myComp.height / 4,
        ]);
    }
    function resetMyPivotBody(myName, textInput, myLocalTracking) {
      var myFontFamily = gimmeFontName();
      var myComp = gimmeComp(textInput + "_" + myFontFamily);
      var mySelf = myComp.layer(myName);
      var previousLetter = myComp.layer(myComp.numLayers - 1);
      var previousLetterPosition = previousLetter
        .property("ADBE Transform Group")
        .property("ADBE Position").value;
      var previousLetterWidth = previousLetter.width;
      var mySelfWidth = mySelf.width;
      var myCompWidth = myComp.width;
      var extraMargin = myLocalTracking;
      var myPivot = mySelf
        .property("ADBE Transform Group")
        .property("ADBE Anchor Point").value;
      var myContent = gimmeComp(myName).layer(1);
      var myContentPosition = myContent
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .valueAtTime(0, true);
      mySelf
        .property("ADBE Transform Group")
        .property("ADBE Anchor Point")
        .setValue([myPivot[0], myContentPosition[1]]);
      mySelf
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue([
          previousLetterPosition[0] +
            previousLetter.width / 2 +
            mySelf.width / 2 +
            extraMargin,
          myComp.height - myComp.height / 4,
        ]);
    }
    function createMoprhShape(morphCompName) {
      var myComp = gimmeComp(morphCompName);
      var typeStart = myComp.layer(morphStartLayerName);
      var typeEnd = myComp.layer(morphEndLayerName);
      if (myComp.numLayers >= 3) {
        return;
      }
      myComp.openInViewer();
      deselectLayers();
      typeStart.selected = true;
      app.executeCommand(app.findMenuCommandId("Create Shapes from Text"));
      deselectLayers();
      var typeStartLayerObj = gimmeShapeLayerWithString(myComp, "morph start");
      typeEnd.selected = true;
      app.executeCommand(3781);
      deselectLayers();
      var typeEndLayerObj = gimmeShapeLayerWithString(myComp, "morph end");
      changeShapesOrderTopLeft(typeEndLayerObj);
      changeShapesOrderTopLeft(typeStartLayerObj);
      typeStartLayerObj = gimmeShapeLayerWithString(myComp, "morph start");
      typeEndLayerObj = gimmeShapeLayerWithString(myComp, "morph end");
      var startRootVectorsGroup = typeStartLayerObj
        .property("ADBE Root Vectors Group")
        .property(1);
      var endRootVectorsGroup = typeEndLayerObj
        .property("ADBE Root Vectors Group")
        .property(1);
      conformAllSplines(startRootVectorsGroup, endRootVectorsGroup);
      var morphShapeLayer = typeStartLayerObj.duplicate();
      morphShapeLayer.name =
        typeStart
          .property("ADBE Text Properties")
          .property("ADBE Text Document")
          .value.toString() + "_morph";
      morphShapeLayer = myComp.layer(morphShapeLayer.name);
      morphShapeLayer.solo = true;
      writeMorphKeyframes(morphShapeLayer, typeEndLayerObj);
      myComp.layer(1).outPoint = 2;
      morphShapeLayer.selected = true;
      morphShapeLayer
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .addKey(0);
      morphShapeLayer
        .property("ADBE Transform Group")
        .property("ADBE Scale")
        .addKey(0);
      morphShapeLayer
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .addKey(1);
      morphShapeLayer
        .property("ADBE Transform Group")
        .property("ADBE Scale")
        .addKey(1);
      myComp.time = 0;
      app.executeCommand(app.findMenuCommandId("Fit to Comp Height"));
      myComp.time = 1;
      app.executeCommand(app.findMenuCommandId("Fit to Comp Height"));
      typeStartLayerObj.remove();
      typeEndLayerObj.remove();
    }
    function morphEngineExpression() {
      var morphEngine =
        'var sliderValue = thisComp.layer("morph CTRL")("ADBE Effect Parade")("Pseudo/TypeMorph_v2_simple")("Pseudo/TypeMorph_v2_simple-0001");\rvar gradientSwitch = thisComp.layer("morph CTRL")("ADBE Effect Parade")("Pseudo/TypeMorph_v2_simple")("Pseudo/TypeMorph_v2_simple-0003").value;\rvar invertSwitch = thisComp.layer("morph CTRL")("ADBE Effect Parade")("Pseudo/TypeMorph_v2_simple")("Pseudo/TypeMorph_v2_simple-0004").value;\rvar wordBeginning = thisComp.layer(1)("ADBE Transform Group")("ADBE Position")[0];\rvar wordEnd = thisComp.layer(thisComp.numLayers-1)("ADBE Transform Group")("ADBE Position")[0];\rvar sliderPosition = linear (sliderValue, 0, 100, wordBeginning, wordEnd);\rvar myPosition = transform.position[0];\rif (invertSwitch === 1) {\r  var morphStart = linear (myPosition, wordBeginning, wordEnd, 0, 0.99);\r  var morphEnd = linear (myPosition, wordEnd, wordBeginning, 0.99, 0);\r} else {\r  var morphStart = linear (myPosition, wordEnd, wordBeginning, 0.99, 0);\r  var morphEnd = linear (myPosition, wordBeginning, wordEnd, 0, 0.99);\r}\rvar morphEngine_gradient = linear (sliderPosition, wordBeginning, wordEnd, morphStart, morphEnd);\rvar morphEngine_uniform = linear (sliderValue, 0, 100, 0, 0.99);\rif (gradientSwitch === 1) {\r\tmorphEngine_gradient;\r} else {\r\tmorphEngine_uniform;\r}';
      return morphEngine;
    }
    function gliphPositionExpression() {
      var positionExpression =
        'var previousGliph = thisComp.layer(index-1).source.layer(1);\r\nvar previousGliphTime = thisComp.layer(index-1).timeRemap;\r\nvar previousGliphPosit = thisComp.layer(index-1)("ADBE Transform Group")("ADBE Position");\r\nvar previousGliphWidth = previousGliph.sourceRectAtTime(previousGliphTime, false).width;\r\nvar myGliph = thisLayer.source.layer(1);\r\nvar myGliphTime = thisLayer.timeRemap;\r\nvar myWidth = myGliph.sourceRectAtTime(myGliphTime, false).width;\r\nvar localTrackingSlider = effect("Local Tracking")("Slider").value;\r\n[previousGliphPosit[0] + previousGliphWidth/2 + myWidth/2 + localTrackingSlider, previousGliphPosit[1]];';
      return positionExpression;
    }
    function leaderGliphPositionExpression() {
      var positionExpression =
        "var relativeX = thisComp.width/thisComp.numLayers;\r\n[relativeX, value[1]];";
      return positionExpression;
    }
    function manageGliphPosition(targetText, myPseudoPreset) {
      var myFontFamily = gimmeFontName();
      var labComp = gimmeComp(labName);
      var targetFolder = myFontFamily + "_characters";
      var allMorphs = gimmeFolderContent(targetFolder);
      var allMorphsHeights = [];
      for (var h = 0; h < allMorphs.length; h += 1) {
        allMorphsHeights.push(allMorphs[h].height);
      }
      var newCompHeight = Math.max.apply(Math, allMorphsHeights);
      var newCompWidth = gimmeAllCompsWidth(targetText);
      var newCompWidth100 = (newCompWidth / 100).toFixed();
      var individualMargin = 30;
      var totalMargin = targetText.length * individualMargin;
      var newCompName = targetText.toString() + "_" + myFontFamily;
      app.project.items.addComp(
        newCompName.toString(),
        newCompWidth + totalMargin,
        newCompHeight * 2,
        1,
        10,
        25,
      );
      var myComp = gimmeComp(newCompName);
      myComp.layers.addNull(myComp.duration);
      var morphCTRLnull = myComp.layer(1);
      morphCTRLnull.name = "morph CTRL";
      morphCTRLnull.enabled = false;
      morphCTRLnull.applyPreset(myPseudoPreset);
      morphCTRLnull
        .property("ADBE Effect Parade")
        .property("Pseudo/TypeMorph_v2_simple")
        .property("Pseudo/TypeMorph_v2_simple-0001")
        .addToMotionGraphicsTemplate(myComp);
      morphCTRLnull
        .property("ADBE Effect Parade")
        .property("Pseudo/TypeMorph_v2_simple")
        .property("Pseudo/TypeMorph_v2_simple-0003")
        .addToMotionGraphicsTemplate(myComp);
      morphCTRLnull
        .property("ADBE Effect Parade")
        .property("Pseudo/TypeMorph_v2_simple")
        .property("Pseudo/TypeMorph_v2_simple-0004")
        .addToMotionGraphicsTemplate(myComp);
      for (var i = 0; i < targetText.length; i += 1) {
        var curLetter = gimmeComp(
          preComposedLayerName(targetText[i], myFontFamily),
        );
        if (curLetter !== undefined) {
          myComp.layers.add(curLetter);
          if (i === 0) {
            leaderLayer = preComposedLayerName(
              targetText[0],
              myFontFamily,
            ).toString();
            resetMyPivot(leaderLayer, targetText);
            myComp.layer(leaderLayer).timeRemapEnabled = true;
            myComp
              .layer(leaderLayer)
              .property("ADBE Time Remapping")
              .setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
            myComp
              .layer(leaderLayer)
              .property("ADBE Time Remapping")
              .removeKey(2);
            curPosition = myComp
              .layer(leaderLayer)
              .property("ADBE Transform Group")
              .property("ADBE Position").value;
            var myWidth = myComp.layer(leaderLayer).source.width;
            myComp
              .layer(leaderLayer)
              .property("ADBE Time Remapping").expression =
              morphEngineExpression();
            myComp.layer(leaderLayer).outPoint = myComp.duration;
          } else {
            targetLayer = preComposedLayerName(
              targetText[i],
              myFontFamily,
            ).toString();
            resetMyPivotBody(targetLayer, targetText, individualMargin);
            var targetLayerName_exprex = preComposedLayerName(
              targetText[i - 1],
              myFontFamily,
            ).toString();
            var targetMorphName_exprex = targetLayerName_exprex
              .substring(
                targetLayerName_exprex.indexOf("_") + 1,
                targetLayerName_exprex.length,
              )
              .toString();
            myComp.layer(targetLayer).timeRemapEnabled = true;
            myComp
              .layer(targetLayer)
              .property("ADBE Time Remapping")
              .setInterpolationTypeAtKey(1, KeyframeInterpolationType.HOLD);
            myComp
              .layer(targetLayer)
              .property("ADBE Time Remapping")
              .removeKey(2);
            myComp
              .layer(targetLayer)
              .property("ADBE Effect Parade")
              .addProperty("ADBE Slider Control");
            myComp
              .layer(targetLayer)
              .property("ADBE Effect Parade")
              .property("ADBE Slider Control").name = "Local Tracking";
            myComp
              .layer(targetLayer)
              .property("ADBE Effect Parade")
              .property("ADBE Slider Control")
              .property("ADBE Slider Control-0001")
              .setValue(individualMargin);
            myComp
              .layer(targetLayer)
              .property("ADBE Transform Group")
              .property("ADBE Position").expression = gliphPositionExpression();
            myComp
              .layer(targetLayer)
              .property("ADBE Time Remapping").expression =
              morphEngineExpression();
            myComp.layer(targetLayer).moveToEnd();
            myComp.layer(myComp.numLayers).outPoint = myComp.duration;
            morphCTRLnull.moveToEnd();
            if (targetText[i] === "-") {
              myComp.layer(targetLayer).source.layer(1).enabled = false;
            }
          }
        }
      }
      var wordsFolder = findOrCreateParentFolder(
        myFontFamily.toString() + "_words",
        gimmeItem(newCompName),
      );
      var masterFolder = findOrCreateParentFolder("tm_morphs", wordsFolder);
      return myComp;
    }
    function distributeAlphabet(targetText, heightDividend) {
      var myComp = gimmeComp(labName);
      var myFontName = gimmeFontName();
      for (var i = 1; i < targetText.length; i += 1) {
        if (i === 1) {
          var leaderLayer = preComposedLayerName(
            targetText[0],
            myFontName,
          ).toString();
          resetMyPivot(leaderLayer);
          myComp
            .layer(leaderLayer)
            .property("ADBE Transform Group")
            .property("ADBE Position")
            .setValue([300, (myComp.height / 5) * heightDividend]);
        }
        var targetLayer = preComposedLayerName(
          targetText[i],
          myFontName,
        ).toString();
        resetMyPivot(targetLayer);
        var targetLayerName_exprex = preComposedLayerName(
          targetText[i - 1],
        ).toString();
        var targetMorphName_exprex = targetLayerName_exprex
          .substring(
            targetLayerName_exprex.indexOf("_") + 1,
            targetLayerName_exprex.length,
          )
          .toString();
        var positionExpression =
          'var previousGliph = comp("' +
          targetLayerName_exprex +
          '").layer("' +
          targetMorphName_exprex +
          '");\r\n' +
          'var previousGliphPosit = thisComp.layer("' +
          targetLayerName_exprex +
          '")("ADBE Transform Group")("ADBE Position");\r\n' +
          "var previousGliphWidth = previousGliph.sourceRectAtTime(time, true).width;\r\n" +
          'var localTrackingSlider = effect("Local Tracking")("Slider").value;\r\n' +
          "var myWidth = comp(thisLayer.name).width;\r\n" +
          "[previousGliphPosit[0] + previousGliphWidth + myWidth/3 + localTrackingSlider + 20, previousGliphPosit[1]];";
        if (i <= targetText.length - 1) {
          myComp
            .layer(targetLayer)
            .property("ADBE Effect Parade")
            .addProperty("ADBE Slider Control");
          myComp
            .layer(targetLayer)
            .property("ADBE Effect Parade")
            .property("ADBE Slider Control").name = "Local Tracking";
          myComp
            .layer(targetLayer)
            .property("ADBE Transform Group")
            .property("ADBE Position").expression = positionExpression;
        }
      }
    }
    function writeSplineToKey(fileObj, keyNumber, splineObject) {
      var fixedInTang = createSplineFromFile(fileObj).inTang;
      var fixedVertexes = createSplineFromFile(fileObj).vertex;
      var fixedOutTang = createSplineFromFile(fileObj).outTang;
      var myShape = new Shape();
      myShape.vertices = fixedVertexes;
      myShape.inTangents = fixedInTang;
      myShape.outTangents = fixedOutTang;
      myShape.closed = true;
      splineObject.setValueAtKey(keyNumber, myShape);
    }
    function writeSplineAtTime(fileObj, myTime, splineObject) {
      var fixedInTang = createSplineFromFile(fileObj).inTang;
      var fixedVertexes = createSplineFromFile(fileObj).vertex;
      var fixedOutTang = createSplineFromFile(fileObj).outTang;
      var myShape = new Shape();
      myShape.vertices = fixedVertexes;
      myShape.inTangents = fixedInTang;
      myShape.outTangents = fixedOutTang;
      myShape.closed = true;
      splineObject.setValueAtTime(myTime, myShape);
    }
    function splineName(letter, fontName, index, position) {
      return (
        letter.toString() +
        "_" +
        fontName.toString() +
        "_spline" +
        index.toString() +
        "_" +
        position +
        ".csv"
      );
    }
    function importBroken() {
      function createSplinesFromFiles(counter, startFile, endFile) {
        var vectorGroup = myComp
          .layer(1)
          .property("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group");
        for (var spl = 0; spl < counter; spl += 1) {
          var splineGroup = vectorGroup
            .property(2)
            .addProperty("ADBE Vector Shape - Group");
          var emptySpline = splineGroup.property("ADBE Vector Shape");
          writeSplineAtTime(startFile[spl], 0, emptySpline);
          writeSplineAtTime(endFile[spl], 1, emptySpline);
          myComp.layer(1).name = whichGliph + "_" + fontFamily + compNameSuffix;
          splineGroup.name = myComp.layer(1).name[0];
        }
        vectorGroup.name = myComp.layer(1).name[0];
      }
      var myComp = app.project.activeItem;
      if (!myComp || !(myComp instanceof CompItem)) {
        alert("please select a valid comp");
        return;
      } else {
        if (myComp.name.indexOf(importBrokenCompName) === -1) {
          alert("please select a valid comp");
          return;
        }
      }
      var myFolder = Folder(subFolder_Documents).selectDlg(
        "Please select a folder containing 2 or more valid csv files",
      );
      var relativeFolder = Folder.decode(
        myFolder.getRelativeURI([subFolder_Documents]),
      );
      var fontFamily = relativeFolder.substring(0, relativeFolder.indexOf("/"));
      var startSpline = myFolder.getFiles("*start.csv");
      var numberOfSplines = startSpline.length;
      var endSpline = myFolder.getFiles("*end.csv");
      var whichGliph = endSpline[0].name[0];
      myComp.layers.addShape();
      createSplinesFromFiles(numberOfSplines, startSpline, endSpline);
      var fillGroup = myComp
        .layer(1)
        .property("ADBE Root Vectors Group")
        .addProperty("ADBE Vector Graphic - Fill");
      fillGroup.property("ADBE Vector Fill Color").setValue([255, 255, 255]);
    }
    var myPanel =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", scriptTitle, undefined, { resizeable: true });
    var res =
      "group{orientation:\'column\', alignment: [\'left\',\'top\'], alignChildren:[\'fill\',\'top\'], margins: [10,10,10,-5]\t\rfirstLineGroup: Group{orientation: \'row\', spacing: 2,\rinitialise: Button {text: \'Initialise\', alignment: [\'left\', \'center\']},\rinfo: Button {text: \'?\', alignment: [\'right\', \'center\'], preferredSize:[25, 25]},\r},\rtrialModeSeparator: Group {orientation:\'row\', text:\'Trial Mode\', margins: [0, 0, 0, -5], spacing:0,text: StaticText {text: \'Trial Mode\', alignment:[\'left\',\'center\']},line: Panel {alignment:[\'fill\',\'center\']},switch: Checkbox {alignment:[\'right\',\'bottom\']},},inputStack: Group{orientation: \'stack\', alignChildren: \'fill\', spacing: 2,\rupperLowerSwitchGroup: Group{ orientation: \'row\', margins: [2, 6, 2, 2], spacing: 2, alignment: [\'left\', \'top\'], alignChildren: [\'fill\', \'fill\'], upper: RadioButton{text: \'ABC\', value: true},lower: RadioButton{text: \'abc\'},number: RadioButton{text: \'123\'},}textBox: EditText{},spacing:5,\r},\rexecStack: Group{orientation: \'stack\', alignChildren: \'fill\',\rmorph: Button{text: \'Morph\'},\rtrial: Button{text: \'Sample Alphabet\'},\r},\rsupportToolsSeparator: Group {orientation:\'row\', text:\'Support Tools\', margins: [0, 0, 0, -5], spacing:0,text: StaticText {text: \'Support Tools\', alignment:[\'left\',\'center\']},line: Panel {alignment:[\'fill\',\'center\']},switch: Checkbox {alignment:[\'right\',\'bottom\']},},supportButtons: Group{orientation: \'row\', spacing: 2,\rexportStack: Group{orientation: \'stack\', alignChildren: \'fill\', spacing: 2,\rexport: Button{text: \'Export\', size:[80, 0]},\r},\rimport: Button{text: \'Import\', size: [80, 0]},\r},\r}";
    myPanel.grp = myPanel.add(res);
    myPanel.layout.layout(true);
    var OS = (function () {
      function isWindows() {
        return $.os.indexOf("Windows") != -1;
      }
      function isMacOS() {
        return !isWindows();
      }
      function openUrl(url) {
        if (isWindows()) {
          openUrlWin(url);
        } else {
          openUrlMac(url);
        }
      }
      function openUrlMac(url) {
        var command = 'open "' + url + '"';
        system.callSystem(command);
      }
      function openUrlWin(url) {
        var command = "start " + url;
        executeWinCommandlineCommand(command);
      }
      function executeWinCommandlineCommand(command) {
        var escapedCommand = escapeForWindowsCmd(command);
        var outerCommand = 'cmd /c "' + escapedCommand + '"';
        system.callSystem(outerCommand);
      }
      function escapeForWindowsCmd(string) {
        var metaChars = [
          "^",
          "(",
          ")",
          "%",
          "!",
          '"',
          "<",
          ">",
          "&",
          "|",
          "\n",
        ];
        var prefix = "^";
        for (var i = 0; i < metaChars.length; i += 1) {
          string = replaceAll(string, metaChars[i], prefix + metaChars[i]);
        }
        return string;
      }
      function replaceAll(string, search, replace) {
        return string.split(search).join(replace);
      }
      return { isMacOS: isMacOS, isWindows: isWindows, openUrl: openUrl };
    })();
    var rootGroup = myPanel.grp;
    var executiveGroup = myPanel.grp.execStack;
    var supportGroup = myPanel.grp;
    var topGroup = myPanel.grp.firstLineGroup;
    var inputGroup = myPanel.grp.inputStack;
    var initialiseButton = myPanel.grp.firstLineGroup.initialise;
    initialiseButton.addEventListener("mouseover", function () {
      if (isAltTrue()) {
        initialiseButton.text = "Init Support";
      }
    });
    initialiseButton.addEventListener("mouseout", function () {
      initialiseButton.text = "Initialise";
    });
    var infoButton = myPanel.grp.firstLineGroup.info;
    var textInput = inputGroup.textBox;
    var upperLowerSwitch = inputGroup.upperLowerSwitchGroup;
    upperLowerSwitch.visible = false;
    var upperCaseAlphabet = upperLowerSwitch.upper;
    var lowerCaseAlphabet = upperLowerSwitch.lower;
    var numberAlphabet = upperLowerSwitch.lower;
    var trialSwitch = myPanel.grp.trialModeSeparator.switch;
    var sampleButton = executiveGroup.trial;
    sampleButton.visible = false;
    var morphButton = executiveGroup.morph;
    var supportSwitch = myPanel.grp.supportToolsSeparator.switch;
    supportSwitch.value = false;
    var buttonsGroup = myPanel.grp.supportButtons;
    var exportButton = buttonsGroup.exportStack.export;
    exportButton.visible = false;
    exportButton.addEventListener("mouseover", function () {
      if (isAltTrue()) {
        exportButton.text = "Export Fixed";
      }
    });
    exportButton.addEventListener("mouseout", function () {
      exportButton.text = "Export";
    });
    var importButton = buttonsGroup.import;
    importButton.visible = false;
    importButton.addEventListener("mouseover", function () {
      if (isAltTrue()) {
        importButton.text = "Import Broken";
      }
    });
    importButton.addEventListener("mouseout", function () {
      importButton.text = "Import";
    });
    if (OS.isWindows()) {
      separator = "\\";
    } else {
      if (OS.isMacOS()) {
        separator = "/";
      }
    }
    var subFolder_Documents =
      Folder.myDocuments.fsName + separator + "TypeMorph" + separator;
    var compNamePrefix = "tm_";
    var compNameSuffix = "_morph";
    var morphStartLayerName = "morph start";
    var morphEndLayerName = "morph end";
    var labName = "TypeMorph_Lab";
    var importBrokenCompName = "TypeMorph_customerSupport";
    if (!isSecurityPrefSet()) {
      alert(
        "ERROR\rPlease \'Allow Scritps to Write Files and Access Network\' by checking the box in the Preferences/Scripting & Expressions tab",
      );
      app.executeCommand(2359);
    }
    if (isPreserveConstantVertexPrefSet()) {
      alert(
        "ERROR\rPlease turn off\r\'Preserve Constant Vertex and Feather Point Count when Editing Maks\'\rfrom the General section of the Preferences menu",
      );
      app.executeCommand(2359);
    }
    if (trial === true) {
      switchToTrialMode();
    } else {
      switchToMorphMode();
    }
    infoButton.onClick = function () {
      settingsObject.helpUI();
    };
    initialiseButton.onClick = function () {
      if (this.text === "Init Support") {
        if (gimmeComp(importBrokenCompName) == undefined) {
          app.project.items.addComp(
            importBrokenCompName,
            1920,
            1080,
            1,
            1.04,
            25,
          );
          return;
        } else {
          alert(
            "Looks like there is already a Comp called: " +
              importBrokenCompName,
          );
          return;
        }
      }
      for (var i = 1; i <= app.project.numItems; i += 1) {
        var curItem = app.project.item(i);
        if (curItem instanceof CompItem && curItem.name === labName) {
          alert("Looks like there is already a Comp called: " + labName);
          return;
        }
      }
      app.beginUndoGroup("Initialise Lab Comp");
      app.project.items.addComp(labName, 1920, 1080, 1, 1, 25);
      var myComp = gimmeComp(labName);
      myComp.layers.addText("A");
      myComp.layers.addText("A");
      myComp.layer(1).name = morphStartLayerName;
      myComp.layer(2).name = morphEndLayerName;
      var text01Prop = myComp
        .layer(1)
        .property("ADBE Text Properties")
        .property("ADBE Text Document");
      var text01TextDocument = text01Prop.value;
      text01TextDocument.fontSize = 200;
      text01Prop.setValue(text01TextDocument);
      var text02Prop = myComp
        .layer(2)
        .property("ADBE Text Properties")
        .property("ADBE Text Document");
      var text02TextDocument = text02Prop.value;
      text02TextDocument.fontSize = 200;
      text02Prop.setValue(text02TextDocument);
      app.endUndoGroup();
    };
    trialSwitch.onClick = function () {
      if (trial === true) {
        this.value = true;
      }
      if (this.value === true) {
        sampleButton.visible = true;
        upperLowerSwitch.visible = true;
        textInput.visible = false;
      } else {
        sampleButton.visible = false;
        upperLowerSwitch.visible = false;
        textInput.visible = true;
      }
    };
    morphButton.onClick = function () {
      var typeMorph_pseudo2simple = getOrWritePseudoFile(
        "TypeMorph_v2_simple.ffx",
        assetsFolder,
        pseudoRaw,
      );
      var myFontName = gimmeFontName();
      if (textInput.text === "") {
        alert("please input a valid string");
        return;
      }
      var myText = textInput.text.replace(/ /g, "-");
      app.beginUndoGroup("create morph");
      createMorphsContainer(myText);
      for (var c = 0; c < myText.length; c += 1) {
        if (myText[c] === " ") {
          myText[c] = "_";
        }
        var curMorphComp = preComposedLayerName(myText[c], myFontName);
        createMoprhShape(curMorphComp);
      }
      var morphedComp = manageGliphPosition(myText, typeMorph_pseudo2simple);
      var labComp = gimmeComp(labName);
      for (var i = 1; i <= labComp.numLayers; i += 1) {
        var curLayer = labComp.layer(i);
      }
      morphedComp.openInViewer();
      app.endUndoGroup();
    };
    sampleButton.onClick = function () {
      var typeMorph_pseudo2simple = getOrWritePseudoFile(
        "TypeMorph_v2_simple.ffx",
        assetsFolder,
        pseudoRaw,
      );
      var myFontName = gimmeFontName();
      app.beginUndoGroup("sample morph");
      if (upperCaseAlphabet.value) {
        myText = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
        newCompName = myFontName + "_MorphSample_CAPS";
      } else if (lowerCaseAlphabet.value) {
        myText = "abcdefghijklmnopqrstuvwxyz";
        newCompName = myFontName + "_MorphSample";
      } else {
        myText = "1234567890";
      }
      createMorphsContainer(myText);
      for (var c = 0; c < myText.length; c += 1) {
        var curMorphComp = preComposedLayerName(myText[c], myFontName);
        createMoprhShape(curMorphComp);
      }
      var lineOne = myText.slice(0, 10);
      manageGliphPosition(lineOne, typeMorph_pseudo2simple);
      var lineTwo = myText.slice(10, 20);
      manageGliphPosition(lineTwo, typeMorph_pseudo2simple);
      var lineThree = myText.slice(20, myText.length);
      manageGliphPosition(lineThree, typeMorph_pseudo2simple);
      app.project.items.addComp(newCompName, 1920, 1080, 1, 10, 25);
      var presentationComp = gimmeComp(newCompName);
      presentationComp.layers.add(
        gimmeItem(lineOne.toString() + "_" + myFontName),
      );
      presentationComp.layers.add(
        gimmeItem(lineTwo.toString() + "_" + myFontName),
      );
      presentationComp.layers.add(
        gimmeItem(lineThree.toString() + "_" + myFontName),
      );
      var layerOnePosition = [960, 280];
      var layerTwoPosition = [960, 540];
      var layerThreePosition = [960, 820];
      presentationComp
        .layer(3)
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue(layerOnePosition);
      presentationComp
        .layer(2)
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue(layerTwoPosition);
      presentationComp
        .layer(1)
        .property("ADBE Transform Group")
        .property("ADBE Position")
        .setValue(layerThreePosition);
      findOrCreateParentFolder("tm_morphs", presentationComp);
      presentationComp.openInViewer();
      app.endUndoGroup();
    };
    supportSwitch.onClick = function () {
      if (this.value === true) {
        exportButton.visible = true;
        exportButton.size = [80, 28];
        importButton.visible = true;
        importButton.size = [80, 28];
        myPanel.layout.layout(true);
      } else {
        exportButton.size = [80, 0];
        importButton.size = [80, 0];
        myPanel.layout.layout(true);
      }
    };
    exportButton.onClick = function () {
      function createShapeFromTEXTLayer() {
        if (!myComp || !(myComp instanceof CompItem)) {
          alert("please select a valid comp");
        } else {
          if (
            myComp.name.indexOf(compNamePrefix) === -1 &&
            myComp.name.indexOf(compNameSuffix) === -1
          ) {
            alert("please select a valid comp");
          }
        }
        if (!myComp.layer(morphStartLayerName)) {
          alert("Text Layer \'morph start\' not found");
          return;
        }
        if (!myComp.layer(morphEndLayerName)) {
          alert("Text Layer \'morph end\' not found");
          return;
        }
        var myTextLayerSourceProperty = myComp
          .layer(morphStartLayerName)
          .property("Source Text");
        var myTextDocument = myTextLayerSourceProperty.value;
        var myFontFamily = myTextDocument.fontFamily;
        var myCharacter = myTextDocument.text;
        myComp.openInViewer();
        deselectLayers();
        myComp.layer(morphStartLayerName).selected = true;
        app.executeCommand(app.findMenuCommandId("Create Shapes from Text"));
        deselectLayers();
        var typeStartLayerObj = gimmeShapeLayerWithString(
          myComp,
          "morph start",
        );
        myComp.layer(morphEndLayerName).selected = true;
        app.executeCommand(app.findMenuCommandId("Create Shapes from Text"));
        deselectLayers();
        var typeEndLayerObj = gimmeShapeLayerWithString(myComp, "morph end");
        var shapeRootSTART = typeStartLayerObj
          .property("ADBE Root Vectors Group")
          .property(1)
          .property("ADBE Vectors Group");
        var shapeRootEND = typeEndLayerObj
          .property("ADBE Root Vectors Group")
          .property(1)
          .property("ADBE Vectors Group");
        for (var s = 1; s < shapeRootSTART.numProperties; s += 1) {
          var curSplineSart = shapeRootSTART
            .property(s)
            .property("ADBE Vector Shape");
          if (
            shapeRootSTART.property(s).matchName === "ADBE Vector Shape - Group"
          ) {
            var fullFilePath = logSplineDetails_vectors(
              curSplineSart,
              s,
              "_start",
              myFontFamily,
            );
          }
        }
        for (var e = 1; e < shapeRootEND.numProperties; e += 1) {
          var curSplineEnd = shapeRootEND
            .property(e)
            .property("ADBE Vector Shape");
          if (
            shapeRootEND.property(e).matchName === "ADBE Vector Shape - Group"
          ) {
            logSplineDetails_vectors(curSplineEnd, e, "_end", myFontFamily);
          }
        }
        typeStartLayerObj.remove();
        typeEndLayerObj.remove();
        alert(
          "Log files successfully exported\r\rPlease send the following folder to typemorph@gmail.com:\r\r" +
            fullFilePath.toString(),
        );
      }
      function createShapeFromMORPHLayer() {
        var morphLayerObj = myComp.layer(1);
        if (
          myComp.name.indexOf(compNameSuffix) !== -1 &&
          myComp.name !== importBrokenCompName
        ) {
          myFontFamily = gimmeFontFamilyFromCompName(myComp);
        } else {
          if (myComp.name === importBrokenCompName) {
            myFontFamily = gimmeFontFamilyFromLayerName(morphLayerObj);
          }
        }
        var myCharacter = morphLayerObj.name[0];
        var morphLayerRoot = morphLayerObj
          .property("ADBE Root Vectors Group")
          .property(1)
          .property("ADBE Vectors Group");
        for (var i = 1; i <= morphLayerRoot.numProperties; i += 1) {
          if (
            morphLayerRoot.property(i).matchName === "ADBE Vector Shape - Group"
          ) {
            var keyFrameOne = morphLayerRoot
              .property(i)
              .property("ADBE Vector Shape")
              .keyValue(1);
            var keyFrameTwo = morphLayerRoot
              .property(i)
              .property("ADBE Vector Shape")
              .keyValue(2);
            logFIXEDSplineDetails_vectors(
              keyFrameOne,
              i,
              "_start",
              myFontFamily,
              myCharacter,
            );
            logFIXEDSplineDetails_vectors(
              keyFrameTwo,
              i,
              "_end",
              myFontFamily,
              myCharacter,
            );
          }
        }
        return "All fixed!";
      }
      var myComp = app.project.activeItem;
      if (this.text === "Export Fixed") {
        createShapeFromMORPHLayer();
      } else {
        if (this.text === "Export") {
          createShapeFromTEXTLayer();
        }
      }
    };
    importButton.onClick = function () {
      var myComp = app.project.activeItem;
      if (this.text === "Import Broken") {
        importBroken();
        return;
      } else {
        if (!myComp || !(myComp instanceof CompItem)) {
          alert("please select a valid comp");
          return;
        } else {
          if (
            myComp.name.indexOf(compNamePrefix) === -1 &&
            myComp.name.indexOf(compNameSuffix) === -1
          ) {
            alert("please select a valid comp");
            return;
          }
        }
        if (!(myComp.layer(1) instanceof ShapeLayer)) {
          alert("Shape Layer not found");
        } else {
          var myFolder = Folder(subFolder_Documents).selectDlg(
            "Please select a folder containing 2 or more valid csv files",
          );
          if (myFolder) {
            var folderPath = myFolder;
            var myLayer = myComp.layer(1);
            var folderPathString = folderPath.toString();
            var myCharacter =
              folderPathString[folderPathString.lastIndexOf("/") + 1];
            var firstFileInFolder = myFolder.getFiles()[0];
            var relativeFolder = Folder.decode(
              myFolder.getRelativeURI([subFolder_Documents]),
            );
            var fontFamily = relativeFolder.substring(
              0,
              relativeFolder.indexOf("/"),
            );
            var myLayerRootVectors = myLayer
              .property("ADBE Root Vectors Group")
              .property(1);
            for (var i = 1; i <= myLayerRootVectors.numProperties; i += 1) {
              if (
                myLayerRootVectors.property("ADBE Vectors Group").property(i)
                  .matchName === "ADBE Vector Shape - Group"
              ) {
                var curSpline = myLayerRootVectors
                  .property("ADBE Vectors Group")
                  .property(i)
                  .property("ADBE Vector Shape");
                var targetFilePath_start =
                  folderPath.toString() +
                  "/" +
                  splineName(myCharacter, fontFamily, i, "start").toString();
                var targetFilePath_end =
                  folderPath.toString() +
                  "/" +
                  splineName(myCharacter, fontFamily, i, "end").toString();
                var startFile = new File(targetFilePath_start);
                var endFile = new File(targetFilePath_end);
                writeSplineToKey(startFile, 1, curSpline);
                writeSplineToKey(endFile, 2, curSpline);
              }
            }
          } else {
            alert("Please Select a valid folder");
          }
        }
      }
    };
    return myPanel;
  }
  var scriptTitle = "Type Morph";
  var version = "2.0";
  var assetsFolder = "TypeMorph";
  var trial = settingsObject.t();
  var pseudoRaw = __BLOB__BLOB_000001__;
  var myScriptPal = myScrypt_buildUI(thisObj);
  if (myScriptPal != null && myScriptPal instanceof Window) {
    myScriptPal.center();
    myScriptPal.show();
  }
}
function dr_typeMorph(thisObj) {
  var af_settings = {
    helpText:
      "Please find the User Guide at the bottom of this page\nhttps://aescripts.com/type-morph/\n\nOr watch Quick Start and more videos here\nhttps://vimeo.com/370666357",
    privateNumber: 6539454495278327,
    productSKU: "DRTM-SUL",
    scriptAuthor: "Braindot Design",
    scriptName: "TypeMorph",
    scriptURL: "https://aescripts.com/typemorph/",
    scriptVersion: "2.0",
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
    var wx = __BLOB__BLOB_000002__;
    var mx = __BLOB__BLOB_000003__;
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
  var goodLuck = new a(af_settings);
  if (goodLuck.c()) {
    typeMorph_wrapped(thisObj, goodLuck);
  }
}
dr_typeMorph(this);
