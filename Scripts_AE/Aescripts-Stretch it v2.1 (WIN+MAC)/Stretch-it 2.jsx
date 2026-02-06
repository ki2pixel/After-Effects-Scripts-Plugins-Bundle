/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function stretchIt2_mainCode(thisObj, settingsObject) {
  function isSecurityPrefSet() {
    var securitySetting = app.preferences.getPrefAsLong(
      "Main Pref Section",
      "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
    );
    return securitySetting == 1;
  }
  function buildUI(thisObj) {
    if (thisObj instanceof Panel) {
      var myPalette = thisObj;
    } else {
      var myPalette = new Window("palette", scriptTitle, undefined, {
        resizeable: true,
      });
    }
    if (myPalette !== null) {
      function getUiImage(fileName, toolName, rawData) {
        function getImagePath(fileName, toolName) {
          var filePath = joinPath([
            getDocumentsFolderPath(),
            toolName,
            fileName,
          ]);
          return filePath;
        }
        function getBinaryFile(filePath, rawData) {
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
        var filePath = getImagePath(fileName, toolName);
        var file = getBinaryFile(filePath, rawData);
        return file;
      }
      function getPseudoFile(fileName, scriptName, rawData) {
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
      function getActiveComp() {
        var theComp = app.project.activeItem;
        if (theComp == undefined) {
          alert("Please select a composition");
          return;
        }
        return theComp;
      }
      function gimmeComp(compName) {
        for (var i = 1; i <= app.project.numItems; i += 1) {
          var curItem = app.project.item(i);
          if (curItem instanceof CompItem && curItem.name === compName) {
            return curItem;
          }
        }
      }
      function centerAnchorPoint(myLayer) {
        var comp = myLayer.containingComp;
        var curTime = comp.time;
        var x = myLayer.sourceRectAtTime(curTime, false).width / 2;
        var y = myLayer.sourceRectAtTime(curTime, false).height / 2;
        x += myLayer.sourceRectAtTime(curTime, false).left;
        y += myLayer.sourceRectAtTime(curTime, false).top;
        myLayer.anchorPoint.setValue([x, y]);
      }
      function findFolder(targetName) {
        for (var i = 1; i <= app.project.numItems; i += 1) {
          var curItem = app.project.item(i);
          if (curItem.name === targetName) {
            return curItem;
          }
        }
      }
      function houseKeeping_Main(targetFolderName, itemToMove) {
        if (findFolder(targetFolderName) === undefined) {
          var myFolder = app.project.items.addFolder(targetFolderName);
          itemToMove.parentFolder = myFolder;
        } else {
          itemToMove.parentFolder = findFolder(targetFolderName);
        }
      }
      function textSource_Expression(compName, layerName) {
        return (
          'parentCompName = comp("' +
          compName +
          '").layer("' +
          layerName +
          '").name; \n        parentCompSourceName = comp("' +
          compName +
          '").layer("' +
          layerName +
          '").source.name; \n        if (parentCompName  === parentCompSourceName){ value; } \n        else { parentCompName; }'
        );
      }
      function preRotation_Expression(compName, layerName, propertyNumber) {
        return (
          'comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(3)*-1;'
        );
      }
      function separation_Expression(compName, layerName, propertyNumber) {
        return (
          'halfWidth = thisComp.width/2; \n        thisHeight= thisComp.height; \n        pivotPoint = comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(2); \n        [halfWidth, thisHeight+pivotPoint]'
        );
      }
      function stretchFXdown_Expression(compName, layerName, propertyNumber) {
        return (
          'if ( comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(4).value === 1) \n        {comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(1)}; \n        else \n        {0};'
        );
      }
      function stretchFXup_Expression(compName, layerName, propertyNumber) {
        return (
          'if ( comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(4).value === 1) { \n        comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(1)*2; \n        } else { \n        comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(1); \n        }'
        );
      }
      function reunion_Expression(compName, layerName, propertyNumber) {
        return (
          'halfWidth = width/2; \n        halfHeight = height/2 \n        stretchAmount = comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(1); \n        [halfWidth,  0 - stretchAmount];'
        );
      }
      function compensation_Expression(compName, layerName, propertyNumber) {
        return (
          'halfWidth = width/2; \n        halfHeight = height/2; \n        pivotCompensation = comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(2); \n        [halfWidth, halfHeight + pivotCompensation]'
        );
      }
      function postRotation_Expression(compName, layerName, propertyNumber) {
        return (
          'comp("' +
          compName +
          '").layer("' +
          layerName +
          '")("ADBE Effect Parade")("Stretch-it ' +
          propertyNumber +
          '")(3);'
        );
      }
      function isTherePseudo(myComp, layerName) {
        var answer = false;
        if (
          myComp.layer(layerName).property("ADBE Effect Parade")
            .numProperties === 0
        ) {
          return answer;
        } else {
          for (
            var i = 1;
            i <=
            myComp.layer(layerName).property("ADBE Effect Parade")
              .numProperties;
            i += 1
          ) {
            var curFx = myComp
              .layer(layerName)
              .property("ADBE Effect Parade")
              .property(i);
            var curFXname = curFx.name;
            if (curFXname.indexOf("Stretch-it") >= 0) {
              answer = true;
            }
          }
        }
        return answer;
      }
      function howManyPseudos(myComp, layerName) {
        var numberOfPseudos = [];
        numberOfPseudos.length = 0;
        for (
          var i = 1;
          i <=
          myComp.layer(layerName).property("ADBE Effect Parade").numProperties;
          i += 1
        ) {
          var curFx = myComp
            .layer(layerName)
            .property("ADBE Effect Parade")
            .property(i);
          var curFXname = curFx.name;
          if (curFXname.indexOf("Stretch-it") >= 0) {
            numberOfPseudos.push(curFx);
          }
        }
        return numberOfPseudos.length;
      }
      function generateStretch_01(
        myComp,
        assetPosition,
        assetName,
        myPseudoPreset,
        arrayOfIndexes,
      ) {
        var adjLayerName = "stretch01_Engine";
        var preCompsFolderName = "Stretch-it_preComps";
        var brandMarkSuffix = "Stretch-it: ";
        var leadingLayerName = brandMarkSuffix + assetName;
        var PrimaryElemComp = myComp.layers.precompose(
          arrayOfIndexes,
          leadingLayerName,
        );
        myComp.layer(leadingLayerName).applyPreset(myPseudoPreset);
        myComp
          .layer(leadingLayerName)
          .property("Effects")
          .property("Stretch-it").name = "Stretch-it 1";
        myComp
          .layer(leadingLayerName)
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue(assetPosition);
        PrimaryElemComp.width = myComp.width * 3;
        PrimaryElemComp.height = myComp.height * 3;
        centerAnchorPoint(PrimaryElemComp.layer(1));
        PrimaryElemComp.layer(assetName)("ADBE Transform Group")(
          "ADBE Position",
        ).setValue([PrimaryElemComp.width / 2, PrimaryElemComp.height / 2, 0]);
        PrimaryElemComp.layer(assetName)("ADBE Transform Group")(
          "ADBE Rotate Z",
        ).expression = preRotation_Expression(myComp.name, leadingLayerName, 1);
        if (PrimaryElemComp.layer(assetName) instanceof TextLayer) {
          PrimaryElemComp.layer(assetName)("ADBE Text Properties")(
            "ADBE Text Document",
          ).expression = textSource_Expression(myComp.name, leadingLayerName);
        }
        var myAdjustLayer = PrimaryElemComp.layers.addSolid(
          [1, 1, 1],
          adjLayerName,
          PrimaryElemComp.width,
          PrimaryElemComp.height,
          1,
        );
        myAdjustLayer.adjustmentLayer = true;
        var myAdjustFX = myAdjustLayer.property("ADBE Effect Parade");
        var separation = myAdjustFX.addProperty("ADBE Offset");
        separation.name = "separation";
        var separationIndex = separation.propertyIndex;
        var separationSpecProperty = separation("ADBE Offset-0001");
        separationSpecProperty.expression = separation_Expression(
          myComp.name,
          leadingLayerName,
          1,
        );
        var stretchEFX = myAdjustFX.addProperty("CC RepeTile");
        stretchEFX.name = "stretch";
        var stretchEFXIndex = stretchEFX.propertyIndex;
        var stretchEFXspecProperty_up = stretchEFX("CC RepeTile-0004");
        var stretchEFXspecProperty_tiling = stretchEFX("CC RepeTile-0005");
        stretchEFXspecProperty_up.expression = stretchFXup_Expression(
          myComp.name,
          leadingLayerName,
          1,
        );
        stretchEFXspecProperty_tiling.setValue(16);
        var reunion = myAdjustFX.addProperty("ADBE Offset");
        reunion.name = "reunion";
        var reunionIndex = reunion.propertyIndex;
        var reunionSpecProperty = reunion("ADBE Offset-0001");
        reunionSpecProperty.expression = reunion_Expression(
          myComp.name,
          leadingLayerName,
          1,
        );
        var postRotation = myAdjustFX.addProperty("ADBE Geometry2");
        postRotation.name = "postRotation";
        var postRotationIndex = postRotation.propertyIndex;
        var postRotationSpecProperty = postRotation("ADBE Geometry2-0007");
        var pivotCompensation = postRotation("ADBE Geometry2-0001");
        postRotationSpecProperty.expression = postRotation_Expression(
          myComp.name,
          leadingLayerName,
          1,
        );
        pivotCompensation.expression = compensation_Expression(
          myComp.name,
          leadingLayerName,
          1,
        );
        houseKeeping_Main(preCompsFolderName, PrimaryElemComp);
      }
      function generateAdditionalStretch(cutNumber, myComp, assetName) {
        var adjLayerName = "stretch0" + cutNumber.toString() + "_Engine";
        var futureCompName = assetName + "_" + cutNumber.toString();
        var preCompsFolderName = "Stretch-it_preComps";
        var ArrayLayersToPrecompose = [];
        var drivingComp = gimmeComp(assetName);
        for (var i = 1; i <= drivingComp.numLayers; i += 1) {
          ArrayLayersToPrecompose.push(i);
        }
        var futureComp = drivingComp.layers.precompose(
          ArrayLayersToPrecompose,
          futureCompName,
        );
        drivingComp.layer(futureCompName)("ADBE Transform Group")(
          "ADBE Rotate Z",
        ).expression = preRotation_Expression(
          myComp.name,
          assetName,
          cutNumber,
        );
        var myAdjustLayer = drivingComp.layers.addSolid(
          [1, 1, 1],
          adjLayerName,
          futureComp.width,
          futureComp.height,
          1,
        );
        myAdjustLayer.adjustmentLayer = true;
        var myAdjustFX = myAdjustLayer.property("ADBE Effect Parade");
        var separation = myAdjustFX.addProperty("ADBE Offset");
        separation.name = "separation";
        var separationIndex = separation.propertyIndex;
        var separationSpecProperty = separation("ADBE Offset-0001");
        separationSpecProperty.expression = separation_Expression(
          myComp.name,
          assetName,
          cutNumber,
        );
        var stretchEFX = myAdjustFX.addProperty("CC RepeTile");
        stretchEFX.name = "stretch";
        var stretchEFXIndex = stretchEFX.propertyIndex;
        var stretchEFXspecProperty_up = stretchEFX("CC RepeTile-0004");
        var stretchEFXspecProperty_tiling = stretchEFX("CC RepeTile-0005");
        stretchEFXspecProperty_up.expression = stretchFXup_Expression(
          myComp.name,
          assetName,
          cutNumber,
        );
        stretchEFXspecProperty_tiling.setValue(16);
        var reunion = myAdjustFX.addProperty("ADBE Offset");
        reunion.name = "reunion";
        var reunionIndex = reunion.propertyIndex;
        var reunionSpecProperty = reunion("ADBE Offset-0001");
        reunionSpecProperty.expression = reunion_Expression(
          myComp.name,
          assetName,
          cutNumber,
        );
        var postRotation = myAdjustFX.addProperty("ADBE Geometry2");
        postRotation.name = "postRotation";
        var postRotationIndex = postRotation.propertyIndex;
        var pivotCompensation = postRotation("ADBE Geometry2-0001");
        var postRotationSpecProperty = postRotation("ADBE Geometry2-0007");
        postRotationSpecProperty.expression = postRotation_Expression(
          myComp.name,
          assetName,
          cutNumber,
        );
        pivotCompensation.expression = compensation_Expression(
          myComp.name,
          assetName,
          cutNumber,
        );
        houseKeeping_Main(preCompsFolderName, futureComp);
      }
      function createNewElement() {
        app.beginUndoGroup("myStretch");
        var activeComp = app.project.activeItem;
        if (activeComp instanceof CompItem) {
        } else {
          alert("Please open a composition");
          return false;
        }
        var activeCompName = activeComp.name;
        var selectedLayers = activeComp.selectedLayers;
        if (selectedLayers.length === 0) {
          alert("Please select any layer");
          return false;
        } else {
          if (selectedLayers.length > 1) {
            alert("Please select only 1 layer");
            return false;
          }
        }
        var myElement = selectedLayers[0];
        if (
          myElement instanceof LightLayer ||
          myElement instanceof CameraLayer ||
          myElement.nullLayer === true ||
          myElement.adjustmentLayer === true
        ) {
          alert("Please select a valid Layer");
          return false;
        }
        var myElemetName = selectedLayers[0].name;
        var myElementOriginalPosition = myElement
          .property("ADBE Transform Group")
          .property("ADBE Position").value;
        var stretchItPseudoFXX = getPseudoFile(
          "Stretch-it.ffx",
          assetsFolder,
          psudoBinaryCode_FFX,
        );
        if (isTherePseudo(activeComp, myElemetName) === false) {
          generateStretch_01(
            activeComp,
            myElementOriginalPosition,
            myElemetName,
            stretchItPseudoFXX,
            [myElement.index],
          );
        } else {
          var numberOfPseudos = howManyPseudos(activeComp, myElemetName);
          myElement
            .property("ADBE Effect Parade")
            .property(numberOfPseudos).selected = true;
          app.executeCommand(app.findMenuCommandId("Duplicate"));
          for (var p = 1; p <= 4; p += 1) {
            if (
              myElement
                .property("ADBE Effect Parade")
                .property(numberOfPseudos)
                .property(p).numKeys > 0
            ) {
              var counter = myElement
                .property("ADBE Effect Parade")
                .property(numberOfPseudos + 1)
                .property(p).numKeys;
              for (var k = counter; k > 0; k--) {
                myElement
                  .property("ADBE Effect Parade")
                  .property(numberOfPseudos + 1)
                  .property(p)
                  .removeKey(k);
              }
            }
          }
          myElement
            .property("ADBE Effect Parade")
            .property(numberOfPseudos + 1)
            .property(1)
            .setValue(0);
          myElement
            .property("ADBE Effect Parade")
            .property(numberOfPseudos + 1)
            .property(2)
            .setValue(0);
          myElement
            .property("ADBE Effect Parade")
            .property(numberOfPseudos + 1)
            .property(3)
            .setValue(0);
          myElement
            .property("ADBE Effect Parade")
            .property(numberOfPseudos + 1)
            .property(4)
            .setValue(false);
          generateAdditionalStretch(
            numberOfPseudos + 1,
            activeComp,
            myElemetName,
          );
        }
        endUndoGroup();
      }
      function createTrialElement() {
        app.beginUndoGroup("myStretch");
        var activeComp = app.project.activeItem;
        if (activeComp instanceof CompItem) {
        } else {
          alert("Please open a composition");
          return false;
        }
        var activeCompName = activeComp.name;
        var selectedLayers = activeComp.selectedLayers;
        if (selectedLayers.length === 0) {
          alert("Please select any layer");
          return false;
        } else {
          if (selectedLayers.length > 1) {
            alert("Please select only 1 layer");
            return false;
          }
        }
        var myElement = selectedLayers[0];
        if (!(myElement instanceof TextLayer)) {
          alert(
            "TRIAL VERSION LIMITATION:\rIn trial mode you can only apply a max of 1 Stretch\rand only on text layers",
          );
          return false;
        }
        var myElemetName = selectedLayers[0].name;
        var myElementOriginalPosition = myElement
          .property("ADBE Transform Group")
          .property("ADBE Position").value;
        var stretchItPseudoFXX = getPseudoFile(
          "Stretch-it.ffx",
          assetsFolder,
          psudoBinaryCode_FFX,
        );
        if (isTherePseudo(activeComp, myElemetName) === false) {
          generateStretch_01(
            activeComp,
            myElementOriginalPosition,
            myElemetName,
            stretchItPseudoFXX,
            [myElement.index],
          );
        } else {
          alert(
            "TRIAL VERSION LIMITATION:\rIn trial mode you can only apply a max of 1 Stretch\rand only on text layers",
          );
        }
        endUndoGroup();
      }
      var res =
        "group {orientation:\'row\', alignment: [\'left\',\'top\'],\n      createButton: IconButton {size:[\'140\', \'26\'], text: \'Create\'},\n      helpButton: Button{ size: [20,26], text: \'?\'},\n      }";
      myPalette.grp = myPalette.add(res);
      myPalette.layout.layout(true);
      myPalette.layout.resize();
      myPalette.onResizing = myPalette.onRize = function () {
        this.layout.resize();
      };
      var uiPanel = myPalette.grp.mainUI;
      var createButton = myPalette.grp.createButton;
      var createIconRegular_file = getUiImage(
        "CREATE NEW_regular.png",
        assetsFolder,
        CREATENEW_regular_PNG,
      );
      var createIconActive_file = getUiImage(
        "CREATE NEW_active.png",
        assetsFolder,
        CREATENEW_active_PNG,
      );
      createButton.image = new File(createIconRegular_file);
      createButton.addEventListener("mouseover", function () {
        createButton.image = ScriptUI.newImage(createIconActive_file);
      });
      createButton.addEventListener("mouseout", function () {
        createButton.image = ScriptUI.newImage(createIconRegular_file);
      });
      var tutorialLink = myPalette.grp.helpButton;
      var isTrial = settingsObject.t();
      createButton.onClick = function () {
        if (isTrial === false) {
          createNewElement();
        } else {
          if (isTrial === true) {
            createTrialElement();
          }
        }
      };
      tutorialLink.onClick = function () {
        OS.openUrl("https://vimeo.com/282235272");
      };
    }
    return myPalette;
  }
  if (!isSecurityPrefSet()) {
    alert(
      "ERROR\rPlease \'Allow Scritps to Write Files and Access Network\' by checking the box in the Preferences/General tab",
    );
    app.executeCommand(2359);
  }
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
      var metaChars = ["^", "(", ")", "%", "!", '"', "<", ">", "&", "|", "\n"];
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
  var psudoBinaryCode_FFX = __BLOB__BLOB_000681__;
  var CREATENEW_active_PNG = __BLOB__BLOB_000682__;
  var CREATENEW_regular_PNG = __BLOB__BLOB_000683__;
  var scriptTitle = "Stretch-it 2";
  var assetsFolder = scriptTitle + "_data";
  var myPalette = buildUI(thisObj);
  if (myPalette !== null && myPalette instanceof Window) {
    myPalette.show();
  }
}
function dr_stretchIt2(thisObj) {
  var af_settings = {
    offerTrial: true,
    privateNumber: 7645860522480356,
    productSKU: "DRSI2-SUL",
    scriptAuthor: "Daniele Ria",
    scriptName: "Stretch-it 2",
    scriptURL: "https://aescripts.com/stretch-it/",
    scriptVersion: "2.0",
  };
  function a(vars) {
    function licUI() {
      var t = new Window(
        "dialog",
        strTrialWelcomeHeader + " - version " + strScriptVersion,
        void 0,
        { resizeable: true },
      );
      if (null != t) {
        var e =
          "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\tinfoGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'top\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\torientation: \'column\', \r\t\t\t\t\t\thdrGrp: Group {\r\t\t\t\t\t\t\ttxt: StaticText {}, \r\t\t\t\t\t\t\tpaste: StaticText {}, \r\t\t\t\t\t\t}\r\t\t\t\t\t\ttrial: StaticText {}, \r\t\t\t\t\t} \r\t\t\t\t\tlicGrp: Group { \r\t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \r\t\t\t\t\t} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r                            buyGrp: Group { \r                            alignment: [\'left\',\'fill\'], \r                            alignChildren: [\'left\',\'fill\'], \r                            orientation: \'column\', \r                            spacing:1,\r                                  retrieveReg: Button {text:\'" +
          strRetrieveLic +
          "\', name:\'retrieve\',preferredSize:[130,25]}\r                                   buyLic: Button {text:\'" +
          strBuyLic +
          "\', name:\'buy\',preferredSize:[130,25]}\r                                   }\r\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
        t.grp = t.add(e);
        var i = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        var r = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.REGULAR,
          9,
        );
        return (
          (t.grp.licGrp.txt.preferredSize = [600, 30]),
          (t.grp.infoGrp.hdrGrp.txt.text = strTrialWelcomeMsg),
          (t.grp.infoGrp.hdrGrp.txt.graphics.font = i),
          (t.grp.infoGrp.hdrGrp.paste.text = strPasteHelp),
          (t.grp.infoGrp.hdrGrp.paste.graphics.font = r),
          (t.grp.infoGrp.trial.text =
            betaMode || isTimeLimited || !offerTrial
              ? ""
              : strTrialInstructMsg),
          isServerConfigured(licenseValidity) &&
            (t.grp.infoGrp.trial.text = strServerInstructMsg),
          (t.grp.licGrp.txt.text =
            betaMode || isTimeLimited || !offerTrial ? "" : "trial"),
          isServerConfigured(licenseValidity) &&
            (t.grp.licGrp.txt.text = "@REMOTE"),
          (t.grp.okGrp.buyGrp.retrieveReg.visible =
            t.grp.okGrp.buyGrp.buyLic.visible =
              !betaMode),
          (t.grp.okGrp.buyGrp.retrieveReg.visible =
            t.grp.okGrp.buyGrp.buyLic.visible =
              !isTimeLimited),
          (t.grp.okGrp.buyGrp.retrieveReg.onClick =
            t.grp.okGrp.buyGrp.buyLic.onClick =
              function () {
                var e = "buy" == this.name ? strTrialUrl : retrieveUrl;
                (e != retrieveUrl ||
                  retrieveUrl != aescriptsRetrieveUrl ||
                  confirm(strWebWarning)) &&
                  openURL(e);
                t.close(false);
              }),
          (t.grp.okGrp.cancelBtn.onClick = function () {
            t.close(false);
          }),
          (t.grp.okGrp.okBtn.onClick = function () {
            license = t.grp.licGrp.txt.text
              .replace(/^\s\s*/, "")
              .replace(/\s\s*$/, "");
            t.close(true);
          }),
          t.layout.layout(true),
          t.layout.resize(),
          (t.onResizing = t.onResize =
            function () {
              this.layout.resize();
            }),
          t
        );
      }
    }
    function checkBeta(e, t) {
      return new Date() < t || new Date() > e;
    }
    function helpUI() {
      var e = new Window(
        "dialog",
        strScriptName + " - version " + strScriptVersion,
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
              "group { \r\t\torientation: \'column\', \r\t\talignment: [\'" +
              t[0] +
              "\',\'" +
              t[1] +
              "\'], \r\t\talignChildren: [\'fill\',\'fill\'], \r                   infoGrp: Group { \r                   alignment: [\'fill\',\'top\'], \r                   alignChildren: [\'fill\',\'top\'], \r\t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]}, \r                      hdr: StaticText {properties:{multiline:true}}, \r                      removeLic: Button {text:\'" +
              strDeactivate +
              "\', preferredSize:[40,30]} \r\t\t\t\t} \r\t\t\t\thelpGrp: Group { \r                   alignment: [\'" +
              t[0] +
              "\',\'" +
              t[1] +
              "\'], \r                   alignChildren: [\'fill\',\'fill\'], \r                    txt: EditText {properties:{multiline:true, readonly:true}}, \r\t\t\t\t} \r                prefsGrp: Group {\r                       alignment: [\'fill\',\'bottom\'], \r                       alignChildren: [\'left\',\'center\'], \r                       orientation: \'row\', \r                       checkNow: Button {text:\'" +
              strCheckNow +
              "\', preferredSize:[150,25]} \r                       doUpdateCheck: Checkbox {text:\'" +
              strVersionCheck +
              "\', preferredSize:[-1,25]} \r                       }\r\t\t\tokGrp: Group { \r                alignment: [\'fill\',\'bottom\'], \r                alignChildren: [\'fill\',\'center\'], \r                supportBtn: Button {text:\'" +
              strGetSupport +
              "\', preferredSize:[150,30], alignment: [\'left\',\'center\']} \r                ",
            r = 0;
          r < Math.min(maxUIButtons, vars.helpButtons.length);
          r++
        ) {
          if (vars.helpButtons[r].hasOwnProperty("name")) {
            i +=
              "btn" + r + ": " + vars.helpButtons[r].hasOwnProperty("type") &&
              validateButtonType(vars.helpButtons[r].type)
                ? vars.helpButtons[r].type
                : "Button" +
                  " {id: \'" +
                  r +
                  "\', alignment: [\'left\',\'center\']}";
          }
        }
        i +=
          "\r\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \r\t\t\t\t} \r\t\t}";
        e.grp = e.add(i);
        e.grp.helpGrp.txt.preferredSize = [800, 500];
        var n = new Date().getYear() + 1900;
        e.grp.infoGrp.txt.text =
          strScriptName +
          " - version " +
          strScriptVersion +
          "\n\xa9" +
          n +
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
          var r = 0;
          r < Math.min(maxUIButtons, vars.helpButtons.length);
          r += 1
        ) {
          vars.helpButtons[r].hasOwnProperty("name") &&
            ((e.grp.okGrp["btn" + r].text = vars.helpButtons[r].name),
            vars.helpButtons[r].hasOwnProperty("url")
              ? (e.grp.okGrp["btn" + r].onClick = function () {
                  openURL(vars.helpButtons[this.id].url);
                })
              : vars.helpButtons[r].hasOwnProperty("onClickFunction") &&
                (e.grp.okGrp["btn" + r].onClick =
                  vars.helpButtons[r].onClickFunction),
            vars.helpButtons[r].hasOwnProperty("btnValue") &&
              (e.grp.okGrp["btn" + r].value = vars.helpButtons[r].btnValue));
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
          openSupportTicket({});
          e.close();
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
      i = r = "";
      t = "&subject=";
      null != e &&
        void 0 !== e &&
        (e.hasOwnProperty("subject") && (t += File.encode(e.subject)),
        e.hasOwnProperty("message") && (i = File.encode(e.message)),
        e.hasOwnProperty("diagnostic") &&
          (r = File.encode(e.diagnostic + "\n--\n")));
      var n =
        true === isAescriptsSupportUrl
          ? strSKU + t + "&message="
          : t.replace(/\&/, "?") + "&body=";
      var a =
        "" != n
          ? i +
            "%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A%0D%0A-------%0D%0A" +
            r +
            getDiagnosticData(true)
          : "";
      supportUrl.toString().match(/@/) &&
        !supportUrl.toString().match(/^mailto:/) &&
        (supportUrl = "mailto:" + supportUrl);
      openURL(supportUrl + n + a);
    }
    function getDiagnosticData(e) {
      var t = $.os.toString();
      var i =
        BridgeTalk.getDisplayName(BridgeTalk.appName) +
        " (" +
        app.version +
        ") - " +
        $.locale.toString();
      var r =
        strScriptName.replace(/&/, "and") + " - version " + strScriptVersion;
      var n = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return e
        ? File.encode(r) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(i) +
            "%0D%0A" +
            File.encode(n)
        : r + "\n" + t + "\n" + i + "\n" + n;
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
          "group { \r\t\t\t\torientation: \'column\', \r\t\t\t\talignment: [\'fill\',\'fill\'], \r\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   hdrGrp: Group { \r\t\t\t\t   alignment: [\'fill\',\'fill\'], \r\t\t\t\t   alignChildren: [\'fill\',\'fill\'], \r\t\t\t\t   orientation: \'column\', \r                        hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
        t.hasOwnProperty("header") &&
          (e +=
            "   infoGrp: Panel { \r                           alignment: [\'fill\',\'fill\'], \r                           alignChildren: [\'fill\',\'fill\'], \r                           orientation: \'column\', \r                              info: StaticText {properties:{multiline:true}}, \r                              } ");
        e +=
          "} \r\t\t\t\t\tokGrp: Group { \r\t\t\t\t\talignment: [\'fill\',\'bottom\'], \r\t\t\t\t\talignChildren: [\'fill\',\'fill\'], \r\t\t\t\t\t\tskipVersionBtn: Button {text:\'" +
          strSkipVersion +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r                           remindMeLaterBtn: Button {text:\'" +
          strRemindMeLater +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t\tdownloadBtn: Button {text:\'" +
          strDownload +
          "\', preferredSize:[-1,30], alignment: [\'right\',\'center\']} \r\t\t\t\t\t} \r\t\t\t\t}";
        i.grp = i.add(e);
        var r = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
        i.grp.hdrGrp.hdr.graphics.font = r;
        i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(/%v/, t.version);
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
            prefsNextTimeVersionCheckedStatus,
            "skip",
          );
          saveSettings(
            prefsSectionName,
            prefsLastServerVersionChecked,
            t.version,
          );
          i.close(false);
        };
        i.grp.okGrp.remindMeLaterBtn.onClick = function () {
          var e = new Date();
          e = new Date(e.setDate(e.getDate() + remindMeLaterDays));
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
        };
        i.grp.okGrp.downloadBtn.onClick = function () {
          openURL(retrieveUrl);
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
    function checkForNewVersion(e) {
      if ((null == e && (e = false), doUpdateCheck)) {
        haveSettings(prefsSectionName, prefsLastVersionChecked) &&
          (i = getSettings(prefsSectionName, prefsLastVersionChecked));
        haveSettings(prefsSectionName, prefsLastServerVersionChecked) &&
          (lastServerVersionChecked = getSettings(
            prefsSectionName,
            prefsLastServerVersionChecked,
          ));
        haveSettings(prefsSectionName, prefsLastTimeVersionChecked) &&
          (r = new Date(
            getSettings(prefsSectionName, prefsLastTimeVersionChecked),
          ));
        haveSettings(prefsSectionName, prefsNextTimeVersionCheckedStatus) &&
          (a = getSettings(
            prefsSectionName,
            prefsNextTimeVersionCheckedStatus,
          ));
        haveSettings(prefsSectionName, prefsNextTimeVersionChecked) &&
          (n = new Date(
            getSettings(prefsSectionName, prefsNextTimeVersionChecked),
          ));
        haveSettings(prefsSectionName, prefsVersionCheckInit) &&
          (t = getSettings(prefsSectionName, prefsVersionCheckInit));
        var s = new Date();
        if (e || null == t || null == n || !(s < n)) {
          var o = versionCheck(strSKU, true, e);
          if (null != o) {
            var l =
              null != o && o.hasOwnProperty("version")
                ? o.version
                : strScriptVersion;
            if (
              e ||
              null == a ||
              "skip" != a ||
              null == lastServerVersionChecked ||
              lastServerVersionChecked != l
            ) {
              saveSettings(prefsSectionName, prefsVersionCheckInit, 1);
              var c = new Date();
              c = new Date(c.setDate(c.getDate() + updateCheckInterval));
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
                c.toString(),
              );
              null != l && 0 < compare(l, strScriptVersion)
                ? ((null != i && null != r && null != n) || newVersionUI(o),
                  null != i && 0 < compare(l, i) && newVersionUI(o),
                  null != i && 0 == compare(l, i) && n <= s && newVersionUI(o))
                : e && alert(strUpToDate);
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
      var r = extComms(
        "https://notify.aescripts.com/versioncheck2.php?json=1&plain=1&sku=" +
          e +
          t
          ? "&latest=1"
          : "" + parseFloat(app.version) < 12
            ? "&clip_length=200"
            : "&clip_length=300",
      );
      if (null == r || "" == r || !validateJSON(r)) {
        return (i && alert(strUpdateCheckError), null);
      }
      try {
        if (null == (r = JSONify(r, "parse"))) {
          return null;
        }
      } catch (e) {
        return null;
      }
      return "ok" != r.status
        ? null
        : t
          ? {
              date: r.latest.release_date,
              detail: r.latest.detail,
              header: strVersionRev
                .replace(/%a/, r.version)
                .replace(/%b/, "")
                .replace(/%c/, r.latest.release_date),
              version: r.version,
            }
          : { version: r.version };
    }
    function extComms(e) {
      try {
        if (-1 != $.os.indexOf("Mac")) {
          var t = system.callSystem('curl -s 2 "' + e + '"');
        } else {
          var i =
            ((r = new File(
              Folder.userData.fsName + "/Aescripts/aescripts_helper.vbs",
            )).open("w"),
            r.write(
              'dim o: Set o = createobject("MSXML2.XMLHTTP.6.0")\no.Open "GET", WScript.Arguments(0), False\no.Send\nIf o.Status >= 200 And o.Status <= 202 Then\nWScript.Echo o.responseText\nElse\nWScript.Echo "Error"\nEnd If',
            ),
            r.close(),
            r.exists ? r : null);
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
        var r = i.read(2000);
        return (i.close(), null != r ? (r = r.toString()) : null);
      }
      return null;
    }
    function formatHistory(e, t) {
      var i = e.data;
      var r = [];
      for (var n in i) {
        if (i.hasOwnProperty(n)) {
          for (var a = i[n].history, s = a.length - 1; 0 <= s; s--) {
            var o = a[s];
            var l = "";
            var c = o.detail;
            s == a.length - 1 && (l = " (" + strCurrentVersion + ")");
            var f = strVersionRev
              .replace(/%0/, o.version_number)
              .replace(/%1/, l)
              .replace(/%2/, o.release_date)
              .replace(/%3/, c);
            (!options.summaryOnlyNewChanges ||
              compare(t, o.version_number) < 0) &&
              r.push(f);
          }
        }
      }
      return r.join("\n\n");
    }
    function getVerifCode(e) {
      return "1";
      "trial" == e.toLowerCase() && (e = "");
      var i =
        -1 != $.os.indexOf("Mac") && Folder("/Volumes/Private").exists
          ? Folder.userData.fsName
          : Folder.temp.fsName +
            "/" +
            Math.round(Math.random() * 42132 * new Date().getTime());
      if (-1 != $.os.indexOf("Win")) {
        t = isTimeLimited ? wx1 : wx;
        i += ".exe";
      } else {
        if (systemCall("arch").toLowerCase().match(/ppc/)) {
          return (alert(strPpcNotSupported), false);
        }
        t = isTimeLimited ? mx1 : mx;
      }
      var r = createFile(File(i), t, "BINARY");
      if (!r.exists) {
        return ((licenseData = { result: -108 }), licenseData);
      }
      r.hidden = true;
      -1 != $.os.indexOf("Mac") && systemCall('chmod 757 "' + r.fsName + '"');
      var n = systemCall(
        '"' + r.fsName + '" "' + strHeader + '" ' + privateNum + " " + e,
      );
      return (r.remove(), parseResult(n));
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
      for (var t = e.match(/[^\r\n]+/g), i = {}, r = 0; r < t.length; r++) {
        var n = t[r].split(":");
        if (2 <= n.length) {
          var a = n[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          var s = trimQuotes(n[1]);
          isNaN(s) || (s = parseFloat(s));
          i[a] = s;
        }
      }
      return (
        void 0 === i.result && ((i.result = -102), (i.e = e)),
        checkTrialDetails(i),
        checkBetaDetails(i),
        i
      );
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
        var r = t[3].match(/^[0-9]+/, "");
        var n = r[0].substr(0, 2);
        var a = r[0].substr(r[0].length - 2);
        var s = n[0] + t[0] + n[1] + t[1] + a[0] + t[2] + a[1] + i;
        var o = r[0].substring(2, r[0].length - 2);
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
      var r = false;
      "@remote" == (t = null == license ? t : license).toLowerCase() &&
        ((t = strHeader + t), (r = true));
      var n = t.split("*");
      var a = t.match(/#/);
      var s = a && check_timed_License(t);
      var o = check_v2_License(t);
      if (!((offerTrial && "trial" == t.toLowerCase()) || r || o || s)) {
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
      if (("trial" != t.toLowerCase() || r) && !r) {
        if (null != n[0] && n[0] != strHeader) {
          return (
            alert(strWrongProduct + "\n" + strContactSupport),
            checkCode(e),
            false
          );
        }
        var c = n[3].match(/[A-Z]{3}[0-9]+$/);
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
          (licenseValidity = 2 == licV ? getVerifCode(t) : getVerifCode3(t))
            .result,
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
          ((n = c.indexOf(e.charAt(l++))) >> 4);
        i = ((15 & n) << 4) | ((a = c.indexOf(e.charAt(l++))) >> 2);
        r = ((3 & a) << 6) | (s = c.indexOf(e.charAt(l++)));
        o += String.fromCharCode(t);
        64 != a && (o += String.fromCharCode(i));
        64 != s && (o += String.fromCharCode(r));
      }
      return o;
    }
    function bE(e) {
      for (
        t,
          i,
          r,
          n,
          a,
          s,
          o,
          l = "",
          c = 0,
          f =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
        c < e.length;
      ) {
        n = (t = e.charCodeAt(c++)) >> 2;
        a = ((3 & t) << 4) | ((i = e.charCodeAt(c++)) >> 4);
        s = ((15 & i) << 2) | ((r = e.charCodeAt(c++)) >> 6);
        o = 63 & r;
        isNaN(i) ? (s = o = 64) : isNaN(r) && (o = 64);
        l = l + f.charAt(n) + f.charAt(a) + f.charAt(s) + f.charAt(o);
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
            (f = parseDateString(retProp("d$", licenseValidity)))),
          0 < e)
        ) {
          return a + "\'" + s + "\'" + retProp("^s", licenseValidity) + l + o;
        }
        r = a + s.toString().match(/^@/) ? "" : " " + s + " ";
        n = l;
      } else {
        r = "";
      }
      var d = strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
      switch (n) {
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
        (i = "" != r ? strRegistration + r + t : t),
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
      return BridgeTalk.appName == bD("YWZ0ZXJlZmZlY3Rz");
    }
    function isPS() {
      return BridgeTalk.appName == bD("cGhvdG9zaG9w");
    }
    function readFile(e) {
      if (null != e && null != e && e.exists && e.open("r")) {
        var t = e.read();
        return (e.close(), t);
      }
      return null;
    }
    function createFile(e, t, i, r, n) {
      return (
        ((null == e || null == e || e.exists) && !r) ||
          (e.exists && e.remove(),
          ((e =
            -1 != $.os.indexOf("Win")
              ? new File(e.fsName)
              : new File(e.absoluteURI)).encoding = i),
          e.open("w"),
          e.write(t),
          e.close(),
          (null != n && n) || (e.hidden = true),
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
      var r = File(prefsLocation + prefsPrefix + File.encode(e));
      var n = readFile(r);
      var a = JSONify(n, "parse");
      if (a instanceof Array) {
        for (var s in ((a = fixSettingsFile(a)), r.remove(), a)) {
          saveSettings(e, s, a[s]);
        }
      }
      return a[t];
    }
    function haveSettings(e, t, i) {
      if (isAE() && "settings" != i) {
        return app.settings.haveSetting(e, t);
      }
      var r = readFile(File(prefsLocation + prefsPrefix + File.encode(e)));
      if (null != r) {
        var n = JSONify(r.toString(), "parse");
        return (n instanceof Array && (n = fixSettingsFile(n)), t in n);
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
    function saveSettings(e, t, i, r) {
      if (isAE() && "settings" != r) {
        app.settings.saveSetting(e, t, i);
        app.preferences.saveToDisk();
      } else {
        var n = {};
        var a = File(prefsLocation + prefsPrefix + File.encode(e));
        if (a.exists) {
          var s = readFile(a);
          null != s && (n = JSONify(s.toString(), "parse"));
        }
        n instanceof Array && (n = fixSettingsFile(n));
        n[t] = i;
        createFile(
          File(prefsLocation + prefsPrefix + File.encode(e)),
          JSONify(n, "stringify", "\t"),
          "UTF-8",
          true,
        );
      }
    }
    function saveVersionsToPrefs() {
      saveSettings(prefsSectionName, prefsVersionName, strScriptVersion);
      saveSettings(prefsSectionName, prefsLicVersion, licensingVersion);
    }
    function compare(e, t) {
      if (e === t) {
        return 0;
      }
      for (
        var i = e.toString().split("."),
          r = t.toString().split("."),
          n = Math.min(i.length, r.length),
          a = 0;
        a < n;
        a++
      ) {
        if (parseInt(i[a]) > parseInt(r[a])) {
          return 1;
        }
        if (parseInt(i[a]) < parseInt(r[a])) {
          return -1;
        }
      }
      return i.length > r.length ? 1 : i.length < r.length ? -1 : 0;
    }
    function isVT() {
      return (
        (void 0 !== licenseValidity &&
          licenseValidity.hasOwnProperty("result")) ||
          (licenseValidity = getVerifCode("")),
        isResultValidLicense(licenseValidity.result) &&
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
      var e = isServerConfigured(licenseValidity) ? strHeader + "@REMOTE" : "";
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
            var r = false;
            if (
              ("l" == e && doUpdateCheck && checkForNewVersion(), 2 == licV)
            ) {
              if ("r" == e) {
                i = !removeLic();
              } else {
                if (
                  isResultValidLicense(
                    (licenseValidity = getVerifCode("")).result,
                  ) &&
                  !isResultTrial(licenseValidity.result)
                ) {
                  return true;
                }
                "" == (t = checkForLegacyLic()) &&
                  ((r = true),
                  (t = isServerConfigured(licenseValidity)
                    ? "@REMOTE"
                    : "trial"));
                i = checkCode(r, t, privateNum);
              }
            } else {
              haveSettings(prefsSectionName, prefsName)
                ? ((t = getSettings(prefsSectionName, prefsName)),
                  (r = !(
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
                    (r = false))
                  : (r = true);
              i = checkCode(r, t, privateNum);
            }
            return i;
          }
        }
      }
    }
    var licensingVersion = "3.0.33";
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
    var trialLengthDays = vars.hasOwnProperty("trialLengthDays")
      ? vars.trialLengthDays
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
    var remindMeLaterDays = 7;
    var doUpdateCheck = true;
    var updateCheckInterval = 7;
    var maxUIButtons = 3;
    var licV = 2;
    if ($.os.indexOf("Mac") != -1) {
      mx = __BLOB__BLOB_000684__;
    } else {
      wx = __BLOB__BLOB_000685__;
    }
    if ($.os.indexOf("Mac") != -1) {
      mx1 = __BLOB__BLOB_000686__;
    } else {
      wx1 = __BLOB__BLOB_000687__;
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
      de: "Lizenz vergessen?",
      en: "Retrieve License",
      es: "Recuperar licencia",
      fr: "Retrouver votre Licence",
    });
    var strBuyLic = localize({
      de: "Lizenz Kaufen",
      en: "Buy License",
      es: "Compra licencia",
      fr: "Acheter une licence",
    });
    var strPpcNotSupported = localize({
      de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
      en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
      es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
      fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
    });
    var strErrScriptAccess = localize({
      de:
        strScriptName +
        ' ben\xf6tigt die Erlaubnis Dateien zu schreiben\n Gehe in Voreinstellungen von After Effects in die Rubrik "Allgemein" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
      en:
        strScriptName +
        ' requires access to write files\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
      es:
        strScriptName +
        ' necesita poder escribir archivos\nVaya al panel "General" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
      fr:
        strScriptName +
        ' n\xe9cessite les droits d\'\xe9criture de fichiers\nAllez dans le panneau "G\xe9n\xe9ral" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
    });
    var strUpdateLicenseHeader = localize({
      de: strScriptName + " Lizenz-Update ben\xf6tigt",
      en: strScriptName + " License Update Required",
      es: strScriptName + " necesita actualizar la licencia",
      fr: "La licence de " + strScriptName + " doit \xeatre mise \xe0 jour",
    });
    var strWebWarning = localize({
      de: "Alle Deine Lizenzen findest Du unter \'My Downloads & Licenses\' in Deinem aescripts.com Benutzer-Account.\n\nWillst Du jetzt dorthin gehen?",
      en: "All your licenses are in the \'My Downloads & Licenses\' section of your aescripts.com user account.\n\nWould you like to go there now?",
      es: "Todas sus licencias est\xe1n en la secci\xf3n \'My Downloads & Licenses\' de su cuenta de usuario en aescripts.com.\n\n\xbfQuiere ir all\xed ahora?",
      fr: "Toutes vos licences se trouvent dans la section \'My Downloads & Licenses\' de votre compte utilisateur sur aescripts.com.\n\nVoulez-vous y aller maintenant?",
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
        "Eine neuere Version von " +
        strScriptName +
        " ist verf\xfcgbar: v%\n\nWenn Sie gerne auf deiner Downloadseite bei aescripts.com gehen kannst, um sie herunterzuladen?",
      en:
        "A newer version of " +
        strScriptName +
        " is available: %v\n\nWould you like to go to your downloads page at aescripts.com to download it?",
      es:
        "Una versi\xf3n nueva de " +
        strScriptName +
        " est\xe1 disponible: v%\n\n\xbfQuieres ir a la p\xe1gina de descargas de aescripts.com para descargarla?",
      fr:
        "Une version plus de " +
        strScriptName +
        " est disponible: v%\n\nVous souhaitez acc\xe9der \xe0 votre page de t\xe9l\xe9chargements chez aescripts.com pour la t\xe9l\xe9charger?",
    });
    var strDownload = localize({
      de: "Download",
      en: "Download",
      es: "Descargar",
      fr: "T\xe9l\xe9charger",
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
    var strCurrentVersion = localize({
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
        strScriptVersion +
        " ist derzeit die neueste Version verf\xfcgbar.",
      en:
        "You are up to date!\n" +
        strScriptName +
        " " +
        strScriptVersion +
        " is currently the latest version available.",
      es:
        "\xa1Est\xe1 actualizado! \n" +
        strScriptName +
        " " +
        strScriptVersion +
        " es actualmente la \xfaltima versi\xf3n disponible.",
      fr:
        "Vous \xeates \xe0 jour!\n" +
        strScriptName +
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
          title: "Nicht in der Lage, auf den Home-Ordner zuzugreifen(-108)",
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
          detail: "",
          title: "License period has not started yet (-20)",
        },
        "-21": { detail: "", title: "License period has ended (-21)" },
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
    var prefsNextTimeVersionCheckedStatus =
      strHeader + "_NextTimeVersionCheckedStatus";
    var prefsDoUpdateCheck = strHeader + "_doUpdateCheck";
    haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
      (doUpdateCheck = !(
        "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
      ));
    ScriptUI.environment.keyboardState.shiftKey &&
      ScriptUI.environment.keyboardState.altKey &&
      !ScriptUI.environment.keyboardState.ctrlKey &&
      ((doUpdateCheck = false),
      saveSettings(prefsSectionName, prefsDoUpdateCheck, false),
      alert("New version update checks disabled"));
    ScriptUI.environment.keyboardState.shiftKey &&
      ScriptUI.environment.keyboardState.altKey &&
      ScriptUI.environment.keyboardState.ctrlKey &&
      alert("aescripts licensing framework version\n" + licensingVersion);
    cmdKey = -1 != $.os.indexOf("Mac") ? "cmd" : "Ctrl";
    var strTrialWelcomeMsg = localize({
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
      en: "To run in trial mode type: trial\n",
      es: "Para ejecutar el modo Trial, escriba: trial\n",
      fr: "Pour lancer la version de d\xe9monstration, tapez : trial\n",
    });
    var strServerInstructMsg = localize({
      de: "Aktivieren Sie eine Lizenz vom Server mit @REMOTE\n",
      en: "Activate a license from the server with @REMOTE\n",
      es: "Activar una licencia del servidor con @REMOTE\n",
      fr: "Activer une licence du serveur avec @REMOTE\n",
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
        isResultValidLicense(licenseValidity.result)
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
        isResultValidLicense(licenseValidity.result) &&
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
    stretchIt2_mainCode(thisObj, goodLuck);
  }
}
dr_stretchIt2(this);
