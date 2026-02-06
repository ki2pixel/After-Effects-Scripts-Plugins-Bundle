/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function createResourceFile(fileName, binaryString) {
  var f = new Folder(reactAssets);
  if (!f.exists) {
    f.create();
  }
  resourceFolder = reactAssets;
  fileObject = new File(reactAssets + fileName);
  if (!File(fileObject).exists) {
    fileObject.encoding = "BINARY";
    fileObject.open("w");
    fileObject.write(binaryString);
    fileObject.close();
  }
  return fileObject;
}
function buildUI(thisObj) {
  function scriptBuildUI(thisObj) {
    function reopenComp() {
      try {
        for (var x = 1; x < app.project.numItems; x += 1) {
          if (app.project.item(x).name == curReactComp) {
            app.project.item(x).openInViewer();
            break;
          }
        }
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function reselectComp() {
      curComp = app.project.activeItem;
      if (curComp !== null) {
        curComp.openInViewer();
      }
    }
    function updateAudio() {
      try {
        var listLength = audioBox.items.length;
        for (var i = 0; i < listLength; i += 1) {
          audioBox.remove(audioBox.items[0]);
        }
        if (curReactComp == "") {
          return;
        }
        var profNumArray = [];
        var profName = "";
        var profNameArray = [];
        for (var i = 1; i <= app.project.numItems; i += 1) {
          if (
            app.project.item(i) instanceof CompItem &&
            app.project.item(i).name == curReactComp
          ) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).hasAudio) {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  effectName = app.project
                    .item(i)
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k)
                    .name.split(" ");
                  if (
                    effectName[0] == "#ReactPro" ||
                    effectName[0] == "#FreqProfile"
                  ) {
                    profNumArray.push(parseInt(effectName[1]));
                    for (var l = 2; l < 10; l += 1) {
                      if (effectName[l] === undefined) {
                        break;
                      } else {
                        if (l > 2) {
                          profName += " ";
                        }
                        profName += effectName[l];
                      }
                    }
                    profNameArray.push(profName);
                    profName = "";
                  }
                }
              }
            }
          }
        }
        var list = [];
        for (var j = 0; j < profNumArray.length; j += 1) {
          list.push({ name: profNameArray[j], order: profNumArray[j] });
        }
        list.sort(function (a, b) {
          return a.order < b.order ? -1 : a.order == b.order ? 0 : 1;
        });
        for (var k = 0; k < list.length; k += 1) {
          audioBox.add("item", list[k].name);
        }
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function selectAudio() {
      if (audioBox.items.length > 0) {
        for (var i = 0; i <= audioBox.items.length - 1; i += 1) {
          if (audioBox.items[i].text == audioTemp) {
            audioBox.children[i].selected = true;
            break;
          }
        }
      }
      audioTemp = "";
    }
    function deleteReactor() {
      try {
        var curComp = app.project.activeItem;
        selectedLayers = curComp.selectedLayers;
        if (selectedLayers.length > 1) {
          alert("Please select reactors on one layer at a time.");
          return;
        }
        curLayer = selectedLayers[0];
        try {
          selectedProps = curLayer.selectedProperties;
        } catch (err) {
          alert(
            "Select at least one reactor to delete in the \'Effect Controls\' panel.",
          );
          return;
        }
        reactorNames = [];
        if (selectedProps.length < 1) {
          alert(
            "Select at least one reactor to delete in the \'Effect Controls\' panel.",
          );
          return;
        }
        var profCheck = false;
        for (var x = 0; x < selectedProps.length; x += 1) {
          if (selectedProps[x].isEffect) {
            effectSplit = selectedProps[x].name.split(" ")[0];
            letterSplit = effectSplit.split("")[0];
            if (effectSplit == "#FreqProfile") {
              profCheck = true;
              continue;
            }
            if (letterSplit == "#") {
              reactorNames.push(selectedProps[x].name);
            }
          }
        }
        var confirmString = "";
        var count = 0;
        if (reactorNames.length >= 1) {
          for (var y = 0; y < reactorNames.length; y += 1) {
            if (count == 0) {
              count += 1;
              confirmString += reactorNames[y];
            } else {
              confirmString += "\n" + reactorNames[y];
            }
          }
          if (
            !confirm(
              "Are you sure you want to delete the following reactors?\n\n" +
                confirmString,
              true,
              "Alert",
            )
          ) {
            return;
          }
        }
        var foundReactor = false;
        restartRemove: for (var z = 0; z < reactorNames.length; z += 1) {
          for (
            var k = 1;
            k <= curLayer.property("ADBE Effect Parade").numProperties;
            k += 1
          ) {
            curEffect = curLayer.property("ADBE Effect Parade").property(k);
            effectName = curEffect.name;
            if (effectName == reactorNames[z]) {
              foundReactor = true;
              curEffect.remove();
              continue restartRemove;
            }
          }
        }
        if (foundReactor === false && profCheck == false) {
          alert(
            "No reactor found in selection. Please select a FreqReact reactor to delete in the \'Effect Controls\' panel.",
          );
          return;
        } else {
          if (foundReactor === false && profCheck == true) {
            alert(
              "You have a profile selected. To delete a profile, double click it in the FreqUI and then click the trashcan icon.",
            );
            return;
          }
        }
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function deleteProfile() {
      try {
        writeLn('Removed Profile: "' + curAudioProf + '"');
        var profContents = findProfContents();
        var reactorLength = profContents.length;
        if (reactorLength > 1) {
          reactorGrammar = "reactors";
        } else {
          reactorGrammar = "reactor";
        }
        if (reactorLength > 0) {
          if (
            !confirm(
              "Deleting this profile will erase " +
                reactorLength +
                " " +
                reactorGrammar +
                "." +
                "\n" +
                "\n" +
                "Do you wish to continue?",
              true,
              "Alert",
            )
          ) {
            return;
          }
        }
        for (var a = 0; a < reactorLength; a += 1) {
          curReactor = profContents[0];
          curReactor.remove();
          profContents = findProfContents();
        }
        var curSelection = curAudioProf;
        var profNumArray = [];
        var profName = "";
        var profNameArray = [];
        for (var i = 1; i <= app.project.numItems; i += 1) {
          if (
            app.project.item(i) instanceof CompItem &&
            app.project.item(i).name == curReactComp
          ) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).hasAudio) {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  effectName = app.project
                    .item(i)
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k)
                    .name.split(" ");
                  if (
                    effectName[0] == "#ReactPro" ||
                    effectName[0] == "#FreqProfile"
                  ) {
                    for (var l = 2; l < 10; l += 1) {
                      if (effectName[l] === undefined) {
                        break;
                      } else {
                        if (l > 2) {
                          profName += " ";
                        }
                        profName += effectName[l];
                      }
                    }
                    if (profName == curSelection) {
                      app.project
                        .item(i)
                        .layer(j)
                        .property("ADBE Effect Parade")
                        .property(k)
                        .remove();
                    }
                    profName = "";
                  }
                }
              }
            }
          }
        }
        var passCheck = false;
        for (var i = 0; i < audioBox.items.length; i += 1) {
          if (audioBox.items[i].text == curSelection) {
            if (audioBox.items[i + 1] !== undefined) {
              newSelectionText = audioBox.items[i + 1].text;
              passCheck = true;
            }
          }
        }
        audioBox.remove(curSelection);
        if (passCheck) {
          for (var i = 0; i < audioBox.items.length; i += 1) {
            if (audioBox.items[i].text == newSelectionText) {
              audioBox.items[i].selected = true;
            }
          }
        } else {
          if (audioBox.items.length > 0) {
            audioBox.items[audioBox.items.length - 1].selected = true;
          }
        }
        cancelRevertComp();
        removeSpectrumControls();
        removeReactFolder();
        reopenComp();
        updateAudio();
        reactA(true, false);
        reactorExp();
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function findProfContents() {
      try {
        var curProf = curAudioProf;
        reactorArray = [];
        propertyArray = [];
        rawArray = [];
        for (var c = 1; c <= app.project.numItems; c += 1) {
          if (
            app.project.item(c) instanceof CompItem &&
            app.project.item(c).name == curReactComp
          ) {
            for (var l = 1; l <= app.project.item(c).numLayers; l += 1) {
              if (
                app.project.item(c).layer(l) instanceof AVLayer ||
                app.project.item(c).layer(l) instanceof ShapeLayer ||
                app.project.item(c).layer(l) instanceof TextLayer
              ) {
                for (
                  var m = 1;
                  m <=
                  app.project.item(c).layer(l).property("ADBE Effect Parade")
                    .numProperties;
                  m += 1
                ) {
                  for (
                    var n = 1;
                    n <=
                    app.project
                      .item(c)
                      .layer(l)
                      .property("ADBE Effect Parade")
                      .property(m).numProperties;
                    n += 1
                  ) {
                    if (
                      app.project
                        .item(c)
                        .layer(l)
                        .property("ADBE Effect Parade")
                        .property(m)
                        .property(n).name == "reactOutput"
                    ) {
                      reactorOutput = app.project
                        .item(c)
                        .layer(l)
                        .property("ADBE Effect Parade")
                        .property(m)
                        .property(n)
                        .expression.split("/*-");
                      reactorName = app.project
                        .item(c)
                        .layer(l)
                        .property("ADBE Effect Parade")
                        .property(m).name;
                      if (
                        reactorOutput[0] == "//reactController " &&
                        reactorOutput[2] == curProf
                      ) {
                        reactorLocation = app.project
                          .item(c)
                          .layer(l)
                          .property("ADBE Effect Parade")
                          .property(m);
                        reactorArray.push(reactorLocation);
                      }
                    }
                  }
                }
              }
            }
          }
        }
        return reactorArray;
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function addReactor(buttonName) {
      try {
        var scriptFile = File($.fileName);
        var curComp = app.project.activeItem;
        try {
          selectedProps = curComp.selectedLayers[0].selectedProperties;
          if (selectedProps[selectedProps.length - 1].isEffect) {
            alert("Please select a property in after effects.");
            return;
          }
        } catch (err) {
          alert("Please select a property in after effects.");
          return;
        }
        var specialLayer = false;
        if (
          curComp.selectedLayers[0] instanceof CameraLayer ||
          curComp.selectedLayers[0] instanceof LightLayer
        ) {
          specialLayer = true;
        }
        if (curComp.selectedLayers.length > 1) {
          alert("More than one layer is selected, please select only one.");
          return;
        }
        var tempNum = 0;
        for (var i = 0; i < selectedProps.length; i += 1) {
          if (!selectedProps[i].isEffect) {
            tempNum += 1;
          }
        }
        if (tempNum > 1) {
          alert("More than one property is selected, please select only one.");
          return;
        }
        var props = app.project.activeItem.selectedLayers[0].selectedProperties;
        for (var i = 0; i < props.length; i += 1) {
          if (!props[i].isEffect) {
            selectedProp = props[i];
            break;
          }
        }
        curProf = audioBox.selection.text;
        var profName = "";
        var profNameArray = [];
        for (var j = 1; j <= curComp.numLayers; j += 1) {
          if (profName !== "") {
            break;
          }
          if (curComp.layer(j).hasAudio) {
            for (
              var k = 1;
              k <=
              curComp.layer(j).property("ADBE Effect Parade").numProperties;
              k += 1
            ) {
              effectName = curComp
                .layer(j)
                .property("ADBE Effect Parade")
                .property(k)
                .name.split(" ");
              if (
                effectName[0] == "#ReactPro" ||
                effectName[0] == "#FreqProfile"
              ) {
                for (var l = 2; l < 10; l += 1) {
                  if (effectName[l] === undefined) {
                    break;
                  } else {
                    if (l > 2) {
                      profName += " ";
                    }
                    profName += effectName[l];
                  }
                }
                if (profName == curProf) {
                  curProfComp = curComp.name;
                  curProfLayer = curComp.layer(j).name;
                  curProfProp = curComp
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k).name;
                  break;
                }
                profName = "";
              }
            }
          }
        }
        for (var i = 0; i < curComp.selectedLayers.length; i += 1) {
          var curLayer = curComp.selectedLayers[i];
          for (var j = 0; j < curLayer.selectedProperties.length; j += 1) {
            var curProp = curLayer.selectedProperties[j];
            var parentProp = curProp.parentProperty;
            if (curProp.isEffect) {
              continue;
            }
            if (!curProp.canSetExpression) {
              alert("Can\'t add expression to the selected property");
              continue;
            }
            var colorProp = false;
            switch (curProp.propertyValueType) {
              case PropertyValueType.OneD:
                curReactor = File(
                  reactAssets + "react" + buttonName + "1D.ffx",
                );
                break;
              case PropertyValueType.TwoD:
              case PropertyValueType.TwoD_SPATIAL:
                curReactor = File(
                  reactAssets + "react" + buttonName + "2D.ffx",
                );
                break;
              case PropertyValueType.ThreeD:
              case PropertyValueType.ThreeD_SPATIAL:
                curReactor = File(
                  reactAssets + "react" + buttonName + "3D.ffx",
                );
                break;
              case PropertyValueType.COLOR:
                if (buttonName == "Trigger") {
                  unsupported = true;
                  return;
                }
                curReactor = File(
                  reactAssets + "react" + buttonName + "Color.ffx",
                );
                colorProp = curProp.value;
                break;
              default:
                curReactor = null;
                break;
            }
            var expBase = curProp.expression;
            var pastReact = false;
            var identifier = "//reactProperty";
            if (expBase.indexOf(identifier) != -1) {
              pastReact = true;
            }
            if (curProp.expressionEnabled === true && pastReact == false) {
              if (
                !confirm(
                  'The selected property named "' +
                    curProp.name +
                    '" already has expression text that will be replaced by FreqReact expression text.' +
                    "\n" +
                    "Do you wish to continue?",
                  true,
                  "Alert",
                )
              ) {
                break;
              }
            }
            if (pastReact == true) {
              newProf = expBase.split("/*-")[1];
            } else {
              newProf = findMaxReactorNum(curLayer, curComp);
            }
            var curIndex = curProp.propertyIndex;
            var parentParent = parentProp.propertyIndex;
            propertyPath =
              "//reactController /*-" +
              newProf +
              "/*-" +
              curProf +
              "/*-" +
              buttonName +
              "/*-" +
              "\n";
            var depth = curProp.parentProperty;
            var findReact = false;
            try {
              while (depth.propertyDepth != 2) {
                depth = depth.parentProperty;
              }
            } catch (err) {
              depth = curProp;
            }
            if (depth.isEffect) {
              curProp.expression =
                "//reactFind /*-" + newProf + "/*-" + "\n" + "thisProperty";
              curEffectIndex = depth.propertyIndex;
              curPropName = curProp.matchName;
              findReact = true;
            } else {
              curProp.expression =
                "//reactProperty/*-" + newProf + "/*-" + "\n" + "thisProperty";
            }
            var baseName =
              "#" + buttonName + " | " + curProf + " | " + curProp.name;
            var reactorCheck = reactorNameCheck(baseName);
            var newName = " " + reactorCheck;
            curProp.selected = false;
            parentProp.selected = false;
            if (specialLayer === true) {
              reselectLayer = curLayer;
              layerCamLight();
              curLayer = curComp.selectedLayers[0];
            }
            if (curReactor !== null) {
              curLayer.selected = true;
              curLayer.applyPreset(curReactor);
            } else {
              alert(
                "Can\'t add reactor for propertyName because property type not supported",
              );
              break;
            }
            var propLength =
              curLayer.property("ADBE Effect Parade").numProperties;
            var curEffect = curLayer
              .property("ADBE Effect Parade")
              .property(propLength);
            if (reactorCheck > 0) {
              curEffect.name = baseName + newName;
            } else {
              curEffect.name = baseName;
            }
            if (colorProp != false) {
              curEffect.property("Color Start").setValue(colorProp);
            }
            curEffect.property("reactOutput").expression =
              propertyPath + "value;";
            if (specialLayer == false) {
              if (findReact === true) {
                selectedProp = curLayer
                  .property("ADBE Effect Parade")
                  .property(curEffectIndex)
                  .property(curPropName);
              }
              if (curPropName == "ADBE Effect Mask Opacity") {
                selectedProp = curLayer
                  .property("ADBE Effect Parade")
                  .property(curEffectIndex).compositingOption;
              }
            }
            if (specialLayer === true) {
              curLayer.selected = false;
              reselectLayer.selected = true;
            }
          }
        }
        reactorExp();
        reactA(app.project.activeItem.selectedLayers[0], selectedProp);
        removeReactorControls();
        reselectComp();
        reselectControlLayer();
        writeLn('New reactor: "' + buttonName + '"');
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function layerCamLight() {
      try {
        app.executeCommand(2004);
        var layerCheck = false;
        var curComp = app.project.activeItem;
        for (var x = 1; x <= curComp.numLayers; x += 1) {
          if (
            curComp.layers[x].comment == "FreqCamLightLayer. Leave this alone."
          ) {
            layerCheck = true;
            curComp.layers[x].selected = true;
            break;
          }
        }
        if (layerCheck == false) {
          newLayer = curComp.layers.addSolid(
            [1, 1, 1],
            "FreqReact Control",
            curComp.width,
            curComp.height,
            curComp.pixelAspect,
            curComp.duration,
          );
          newLayer.adjustmentLayer = true;
          newLayer.comment = "FreqCamLightLayer. Leave this alone.";
          newLayer.selected = true;
        }
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function reselectControlLayer() {
      var curComp = app.project.activeItem;
      var selectedLayer = curComp.selectedLayers[0];
      if (
        selectedLayer instanceof CameraLayer ||
        selectedLayer instanceof LightLayer
      ) {
        selectedLayer.selected = false;
        for (var x = 1; x <= curComp.numLayers; x += 1) {
          if (
            curComp.layers[x].comment == "FreqCamLightLayer. Leave this alone."
          ) {
            layerCheck = true;
            curLayer = curComp.layers[x];
            curLayer.selected = true;
            propLength = curLayer.property("ADBE Effect Parade").numProperties;
            curLayer
              .property("ADBE Effect Parade")
              .property(propLength).selected = true;
            break;
          }
        }
      }
    }
    function reactorExp() {
      try {
        if (unsupported) {
          unsupported = false;
          alert("The Trigger reactor does not support color properties.");
          return;
        }
        var compArray = [];
        var compArray2 = [];
        var itExists = false;
        var curComp = app.project.activeItem;
        if (curComp === null) {
          return;
        }
        for (var c = 1; c <= app.project.numItems; c += 1) {
          if (
            app.project.item(c) instanceof CompItem &&
            app.project.item(c).name == curReactComp
          ) {
            compArray.push(app.project.item(c));
          }
        }
        for (var c = 0; c < compArray.length; c += 1) {
          for (var l = 1; l <= compArray[c].numLayers; l += 1) {
            if (
              compArray[c].layer(l) instanceof AVLayer ||
              compArray[c].layer(l) instanceof ShapeLayer ||
              compArray[c].layer(l) instanceof TextLayer
            ) {
              for (
                var m = 1;
                m <=
                compArray[c].layer(l).property("ADBE Effect Parade")
                  .numProperties;
                m += 1
              ) {
                try {
                  if (
                    compArray[c]
                      .layer(l)
                      .property("ADBE Effect Parade")
                      .property(m)
                      .property("reactOutput")
                  ) {
                    itExists = true;
                  }
                } catch (err) {}
                if (itExists == true) {
                  curProp = compArray[c]
                    .layer(l)
                    .property("ADBE Effect Parade")
                    .property(m)
                    .property("reactOutput");
                  smoothProp = compArray[c]
                    .layer(l)
                    .property("ADBE Effect Parade")
                    .property(m)
                    .property("outputSmooth");
                  reactorOutput = curProp.expression.split("/*-");
                  firstLine = curProp.expression.split("\n")[0];
                  profLocation = reactorOutput[2];
                  reactorType = reactorOutput[3];
                  curDimension = compArray[c]
                    .layer(l)
                    .property("ADBE Effect Parade")
                    .property(m)
                    .property("Aux 1").propertyValueType;
                  for (var w = 1; w <= app.project.numItems; w += 1) {
                    if (
                      app.project.item(w) instanceof CompItem &&
                      app.project.item(w).name == curReactComp
                    ) {
                      compArray2.push(app.project.item(w));
                    }
                  }
                  loopBreak: for (var w = 0; w < compArray2.length; w += 1) {
                    for (var x = 1; x <= compArray2[w].numLayers; x += 1) {
                      if (compArray2[w].layer(x).hasAudio) {
                        for (
                          var y = 1;
                          y <=
                          compArray2[w].layer(x).property("ADBE Effect Parade")
                            .numProperties;
                          y += 1
                        ) {
                          effectName = compArray2[w]
                            .layer(x)
                            .property("ADBE Effect Parade")
                            .property(y)
                            .name.split(" ");
                          if (
                            effectName[0] == "#ReactPro" ||
                            effectName[0] == "#FreqProfile"
                          ) {
                            profName = "";
                            for (var z = 2; z < 10; z += 1) {
                              if (effectName[z] === undefined) {
                                break;
                              } else {
                                if (z > 2) {
                                  profName += " ";
                                }
                                profName += effectName[z];
                              }
                            }
                            if (profName == profLocation) {
                              curProfComp = compArray2[w].name;
                              curProfLayer = compArray2[w].layer(x).name;
                              curProfProp = compArray2[w]
                                .layer(x)
                                .property("ADBE Effect Parade")
                                .property(y).name;
                              var colorCheck = false;
                              switch (curDimension) {
                                case PropertyValueType.OneD:
                                  controlsDimension = "yInt = 0;\nzInt = 0;";
                                  outputDimension =
                                    "[x*master + aux1 + aux2 + aux3,0];";
                                  break;
                                case PropertyValueType.TwoD:
                                case PropertyValueType.TwoD_SPATIAL:
                                  controlsDimension =
                                    'yInt =  effect(thisProperty.propertyGroup(1).name)("Y Intensity");\nzInt = 0;';
                                  outputDimension =
                                    "[x,y]*master + aux1 + aux2 + aux3;";
                                  break;
                                case PropertyValueType.ThreeD:
                                case PropertyValueType.ThreeD_SPATIAL:
                                  controlsDimension =
                                    'yInt =  effect(thisProperty.propertyGroup(1).name)("Y Intensity");\nzInt =  effect(thisProperty.propertyGroup(1).name)("Z Intensity");';
                                  outputDimension =
                                    "[x,y,z]*master + aux1 + aux2 + aux3;";
                                  break;
                                case PropertyValueType.COLOR:
                                  colorCheck = true;
                                  break;
                                default:
                                  break;
                              }
                              if (colorCheck == false) {
                                switch (reactorType) {
                                  case "Pulse":
                                    curExp =
                                      '\n//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'decayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");' +
                                      "\n" +
                                      'addSwitch = effect(thisProperty.propertyGroup(1).name)("Additive"); ' +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      "\n" +
                                      "if (addSwitch == 0) { baseOut = 1;} else { baseOut = 5; }" +
                                      "\n" +
                                      "\n" +
                                      'output1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + baseOut)*2;" +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 1))*2;" +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 2))*2;" +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 3))*2;" +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "//Outputs" +
                                      "\n" +
                                      "x = finalOutput*xInt;" +
                                      "\n" +
                                      "y = finalOutput*yInt;" +
                                      "\n" +
                                      "z = finalOutput*zInt;" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\t" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Elastic":
                                    curExp =
                                      '//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'decay = linear(effect(thisProperty.propertyGroup(1).name)("Elasticity"),1,100,2,.1);' +
                                      "\n" +
                                      "\n" +
                                      'output1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 1");' +
                                      "\n" +
                                      'trigger = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 10")' +
                                      "\n" +
                                      "\n" +
                                      "//elastic" +
                                      "\n" +
                                      "a = 1; " +
                                      "\n" +
                                      "freq = 10;" +
                                      "\n" +
                                      "i = (time*freq);" +
                                      "\n" +
                                      'mod = linear(effect(thisProperty.propertyGroup(1).name)("Elasticity"),1,100,.9,0.55);' +
                                      "\n" +
                                      "e = ((2 * Math.abs(i % (2*a) - a) - a)/Math.exp(trigger*decay))*mod;" +
                                      "\n" +
                                      "\n" +
                                      "//Outputs" +
                                      "\n" +
                                      "x = e*xInt;" +
                                      "\n" +
                                      "y = e*yInt;" +
                                      "\n" +
                                      "z = e*zInt;" +
                                      "\n" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\t" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Oscillate":
                                    curExp =
                                      '//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'decayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");' +
                                      "\n" +
                                      'addSwitch = effect(thisProperty.propertyGroup(1).name)("Additive");' +
                                      "\n" +
                                      'oscSpeed = linear(effect(thisProperty.propertyGroup(1).name)("Osc Speed"),1,100,.5,35);' +
                                      "\n" +
                                      'oscType = effect(thisProperty.propertyGroup(1).name)("Osc Type").value.toString();' +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      "if (addSwitch == 0) { baseOut = 1;} else { baseOut = 5; }" +
                                      "\n" +
                                      "\n" +
                                      'output1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + baseOut)*2;" +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 1))*2;" +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 2))*2;" +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 3))*2;" +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "// osc" +
                                      "\n" +
                                      "switch(oscType){" +
                                      "\n" +
                                      '   case "1": //sin' +
                                      "\n" +
                                      "       if (addSwitch == 0) {" +
                                      "\n" +
                                      "           mod = 0.5;" +
                                      "\n" +
                                      "           osc = Math.sin(time * oscSpeed) * finalOutput * mod;" +
                                      "\n" +
                                      "       }else{" +
                                      "\n" +
                                      "           osc = Math.sin(finalOutput/2 * oscSpeed);" +
                                      "\n" +
                                      "       }" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "\n" +
                                      '   case "2": //triangle' +
                                      "\n" +
                                      "       a = 1;" +
                                      "\n" +
                                      "       if (addSwitch == 0) {" +
                                      "\n" +
                                      "           mod = 0.5;" +
                                      "\n" +
                                      "\t\t\tosc = ((2 * Math.abs(time * oscSpeed * 0.3186 % (2*a) - a) - a) * finalOutput * mod);" +
                                      "\n" +
                                      "       }else{" +
                                      "\n" +
                                      "           osc = (2 * Math.abs(finalOutput/2 * oscSpeed * 0.3186 % (2*a) - a) - a)" +
                                      "\n" +
                                      "       }" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "\n" +
                                      '   case "3": //Sawtooth' +
                                      "\n" +
                                      "       a = 1;" +
                                      "\n" +
                                      "       if (addSwitch == 0) {" +
                                      "\n" +
                                      "           mod = 0.5" +
                                      "\n" +
                                      "           t = (time*oscSpeed/2 * 0.3186)%a;" +
                                      "\n" +
                                      "           osc = linear(t,0,a,-1,1) * finalOutput * mod;" +
                                      "\n" +
                                      "       }else{" +
                                      "\n" +
                                      "           t = (finalOutput/4 * oscSpeed * 0.3186) % a;" +
                                      "\n" +
                                      "           osc = linear(t,0,a,-1,1);" +
                                      "\n" +
                                      "       }" +
                                      "\n" +
                                      "\n" +
                                      "\t\tbreak;" +
                                      "\n" +
                                      '\tcase "4": //square' +
                                      "\n" +
                                      "\t\tif (addSwitch == 0) {" +
                                      "\n" +
                                      "\t\t\tmod = 0.5;" +
                                      "\n" +
                                      "\t\t\tosc = (Math.floor(Math.sin(time*oscSpeed))*finalOutput) + 1;" +
                                      "\n" +
                                      "\t\t}else{" +
                                      "\n" +
                                      "\t\t\tt = Math.floor(Math.sin(finalOutput/2 * oscSpeed));" +
                                      "\n" +
                                      "           osc = linear(t,-1,0,-1,1);" +
                                      "\n" +
                                      "\t\t}" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "// outputs" +
                                      "\n" +
                                      "x = osc*xInt;" +
                                      "\n" +
                                      "y = osc*yInt;" +
                                      "\n" +
                                      "z = osc*zInt;" +
                                      "\n" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Steps":
                                    curExp =
                                      '//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'stepType = effect(thisProperty.propertyGroup(1).name)("Step Type").value.toString();' +
                                      "\n" +
                                      'stepAmount = Math.round(effect(thisProperty.propertyGroup(1).name)("Number of Steps"));' +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      "\n" +
                                      'output = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 9");' +
                                      "\n" +
                                      "\n" +
                                      "//Outputs" +
                                      "\n" +
                                      "switch(stepType){" +
                                      "\n" +
                                      '   case "1":' +
                                      "\n" +
                                      "       x = linear(((output/stepAmount) % 1),0,1,0,xInt);" +
                                      "\n" +
                                      "       y = linear(((output/stepAmount) % 1),0,1,0,yInt);" +
                                      "\n" +
                                      "       z = linear(((output/stepAmount) % 1),0,1,0,zInt);" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "\n" +
                                      '   case "2":' +
                                      "\n" +
                                      "       a = 1;" +
                                      "\n" +
                                      "       x = linear((2 * Math.abs(output/stepAmount  % (2*a) - a) - a),-1,1,xInt,0);" +
                                      "\n" +
                                      "       y = linear((2 * Math.abs(output/stepAmount  % (2*a) - a) - a),-1,1,yInt,0);" +
                                      "\n" +
                                      "       z = linear((2 * Math.abs(output/stepAmount  % (2*a) - a) - a),-1,1,zInt,0);" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\t" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Wiggle":
                                    curExp =
                                      '//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'decayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");' +
                                      "\n" +
                                      'wiggleSpeed = linear(effect(thisProperty.propertyGroup(1).name)("Wiggle Speed"),1,100,1,200);' +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      "\n" +
                                      "baseOut = 1;" +
                                      "\n" +
                                      'output1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + baseOut)*2;" +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 1))*2;" +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 2))*2;" +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 3))*2;" +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "//wiggle" +
                                      "\n" +
                                      "wiggleXY = wiggle(wiggleSpeed,finalOutput);" +
                                      "\n" +
                                      "wiggleZ = wiggle(wiggleSpeed,finalOutput);" +
                                      "\n" +
                                      "\n" +
                                      "// outputs" +
                                      "\n" +
                                      "x = (wiggleXY[0]*xInt/2);" +
                                      "\n" +
                                      "y = (wiggleXY[1]*yInt/2);" +
                                      "\n" +
                                      "z = (wiggleZ[0]*zInt/2);" +
                                      "\n" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\t" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Flicker":
                                    curExp =
                                      '//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'decayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");' +
                                      "\n" +
                                      'flickerSpeed = linear(effect(thisProperty.propertyGroup(1).name)("Flicker Speed"),1,100,1,120);' +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      "\n" +
                                      "baseOut = 1;" +
                                      "\n" +
                                      'output1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + baseOut)*2;" +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 1))*2;" +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 2))*2;" +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 3))*2;" +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "//flicker" +
                                      "\n" +
                                      "flicker = Math.sin(time * flickerSpeed) * finalOutput;" +
                                      "\n" +
                                      "\n" +
                                      "// outputs" +
                                      "\n" +
                                      "x = (flicker*xInt/3.2);" +
                                      "\n" +
                                      "y = (flicker*yInt/3.2);" +
                                      "\n" +
                                      "z = (flicker*zInt/3.2);" +
                                      "\n" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\t" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Switch":
                                    curExp =
                                      '//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'switchThreshold = linear(effect(thisProperty.propertyGroup(1).name)("Switch Threshold"),1,100,0.01,1);' +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      "\n" +
                                      'output = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 1");' +
                                      "\n" +
                                      "\n" +
                                      "if (output > switchThreshold){" +
                                      "\n" +
                                      "\tfinalOutput = 1;" +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\tfinalOutput = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "//Outputs" +
                                      "\n" +
                                      "x = finalOutput*xInt;" +
                                      "\n" +
                                      "y = finalOutput*yInt;" +
                                      "\n" +
                                      "z = finalOutput*zInt;" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\t" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Trigger":
                                    curExp =
                                      '//controls\nxInt = effect(thisProperty.propertyGroup(1).name)("X Intensity");\n' +
                                      controlsDimension +
                                      "\n" +
                                      'aux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1"); ' +
                                      "\n" +
                                      'aux2 = effect(thisProperty.propertyGroup(1).name)("Aux 2"); ' +
                                      "\n" +
                                      'aux3 = effect(thisProperty.propertyGroup(1).name)("Aux 3"); ' +
                                      "\n" +
                                      'master = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;' +
                                      "\n" +
                                      "\n" +
                                      'finalOutput = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 10");' +
                                      "\n" +
                                      "\n" +
                                      "if (finalOutput == 100){" +
                                      "\n" +
                                      "\tfinalOutput = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "//Outputs" +
                                      "\n" +
                                      "x = finalOutput*xInt;" +
                                      "\n" +
                                      "y = finalOutput*yInt;" +
                                      "\n" +
                                      "z = finalOutput*zInt;" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\t" +
                                      outputDimension +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                }
                              } else {
                                switch (reactorType) {
                                  case "Pulse":
                                    curExp =
                                      '\n//controls\ncolor1 = effect(thisProperty.propertyGroup(1).name)("Color Start");\ncolor2 = effect(thisProperty.propertyGroup(1).name)("Color End");\ndecayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");\naux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1");\nmaster = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;\nauxCheck = effect(thisProperty.propertyGroup(1).name)("Use Aux Expression?");\n\noutput1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 1")*2;' +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 2")*2;' +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 3")*2;' +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 4")*2;' +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "mix1 = color1*(1-finalOutput)*master;" +
                                      "\n" +
                                      "mix2 = color2*finalOutput*master;" +
                                      "\n" +
                                      "finalMix = mix1+mix2+(color1*linear(master,0,1,1,0));" +
                                      "\n" +
                                      "\n" +
                                      "if (auxCheck == 1){" +
                                      "\n" +
                                      '\taux = effect(thisProperty.propertyGroup(1).name)("Aux 1");' +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\taux = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\tfinalMix + aux;" +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Elastic":
                                    curExp =
                                      '\n//controls\ncolor1 = effect(thisProperty.propertyGroup(1).name)("Color Start");\ncolor2 = effect(thisProperty.propertyGroup(1).name)("Color End");\naux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1");\nmaster = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;\nauxCheck = effect(thisProperty.propertyGroup(1).name)("Use Aux Expression?");\ndecay = linear(effect(thisProperty.propertyGroup(1).name)("Elasticity"),1,100,2,.1);\n\noutput1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 1");' +
                                      "\n" +
                                      'trigger = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 10")' +
                                      "\n" +
                                      "\n" +
                                      "//elastic" +
                                      "\n" +
                                      "amp = 2; " +
                                      "\n" +
                                      "freq = 0.5;" +
                                      "\n" +
                                      "i = (time*freq);" +
                                      "\n" +
                                      'mod = linear(effect(thisProperty.propertyGroup(1).name)("Elasticity"),1,100,.9,0.55);' +
                                      "\n" +
                                      "elastic = amp*Math.sin(trigger*freq*Math.PI*2)/Math.exp(trigger*decay);" +
                                      "\n" +
                                      "\n" +
                                      "mix1 = color1*(1-elastic)*master;" +
                                      "\n" +
                                      "mix2 = color2*elastic*master;" +
                                      "\n" +
                                      "finalMix = mix1+mix2+(color1*linear(master,0,1,1,0));" +
                                      "\n" +
                                      "\n" +
                                      "if (auxCheck == 1){" +
                                      "\n" +
                                      '\taux = effect(thisProperty.propertyGroup(1).name)("Aux 1");' +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\taux = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\tfinalMix + aux;" +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Oscillate":
                                    curExp =
                                      '//controls\ncolor1 = effect(thisProperty.propertyGroup(1).name)("Color Start");\ncolor2 = effect(thisProperty.propertyGroup(1).name)("Color End");\noscSpeed = linear(effect(thisProperty.propertyGroup(1).name)("Osc Speed"),1,100,.5,35);\noscType = effect(thisProperty.propertyGroup(1).name)("Osc Type").value.toString();\ndecayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");\naddSwitch = effect(thisProperty.propertyGroup(1).name)("Additive");\naux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1");\nmaster = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;\nauxCheck = effect(thisProperty.propertyGroup(1).name)("Use Aux Expression?");\n\nif (addSwitch == 0) { baseOut = 1;} else { baseOut = 5; }\n\noutput1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + baseOut)*2;" +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 1))*2;" +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 2))*2;" +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom " ' +
                                      " + (baseOut + 3))*2;" +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "// osc" +
                                      "\n" +
                                      "switch(oscType){" +
                                      "\n" +
                                      '   case "1": //sin' +
                                      "\n" +
                                      "       if (addSwitch == 0) {" +
                                      "\n" +
                                      "           mod = 0.5;" +
                                      "\n" +
                                      "           osc = Math.sin(time * oscSpeed) * finalOutput * mod;" +
                                      "\n" +
                                      "       }else{" +
                                      "\n" +
                                      "           osc = Math.sin(finalOutput/2 * oscSpeed);" +
                                      "\n" +
                                      "       }" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "\n" +
                                      '   case "2": //triangle' +
                                      "\n" +
                                      "       a = 1;" +
                                      "\n" +
                                      "       if (addSwitch == 0) {" +
                                      "\n" +
                                      "           mod = 0.5;" +
                                      "\n" +
                                      "\t\t\tosc = ((2 * Math.abs(time * oscSpeed * 0.3186 % (2*a) - a) - a) * finalOutput * mod);" +
                                      "\n" +
                                      "       }else{" +
                                      "\n" +
                                      "           osc = (2 * Math.abs(finalOutput/2 * oscSpeed * 0.3186 % (2*a) - a) - a)" +
                                      "\n" +
                                      "       }" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "\n" +
                                      '   case "3": //Sawtooth' +
                                      "\n" +
                                      "       a = 1;" +
                                      "\n" +
                                      "       if (addSwitch == 0) {" +
                                      "\n" +
                                      "           mod = 0.5" +
                                      "\n" +
                                      "           t = (time*oscSpeed/2 * 0.3186)%a;" +
                                      "\n" +
                                      "           osc = linear(t,0,a,-1,1) * finalOutput * mod;" +
                                      "\n" +
                                      "       }else{" +
                                      "\n" +
                                      "           t = (finalOutput/4 * oscSpeed * 0.3186) % a;" +
                                      "\n" +
                                      "           osc = linear(t,0,a,-1,1);" +
                                      "\n" +
                                      "       }" +
                                      "\n" +
                                      "\n" +
                                      "\t\tbreak;" +
                                      "\n" +
                                      '\tcase "4": //square' +
                                      "\n" +
                                      "\t\tif (addSwitch == 0) {" +
                                      "\n" +
                                      "\t\t\tmod = 0.5;" +
                                      "\n" +
                                      "\t\t\tosc = (Math.floor(Math.sin(time*oscSpeed))*finalOutput) + 1;" +
                                      "\n" +
                                      "\t\t}else{" +
                                      "\n" +
                                      "\t\t\tt = Math.floor(Math.sin(finalOutput/2 * oscSpeed));" +
                                      "\n" +
                                      "           osc = linear(t,-1,0,-1,1);" +
                                      "\n" +
                                      "\t\t}" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "mix1 = color1*(1-osc)*master;" +
                                      "\n" +
                                      "mix2 = color2*osc*master;" +
                                      "\n" +
                                      "finalMix = mix1+mix2+(color1*linear(master,0,1,1,0));" +
                                      "\n" +
                                      "\n" +
                                      "if (auxCheck == 1){" +
                                      "\n" +
                                      '\taux = effect(thisProperty.propertyGroup(1).name)("Aux 1");' +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\taux = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\tfinalMix + aux;" +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Steps":
                                    curExp =
                                      '//controls\ncolor1 = effect(thisProperty.propertyGroup(1).name)("Color Start");\ncolor2 = effect(thisProperty.propertyGroup(1).name)("Color 1");\ncolor3 = effect(thisProperty.propertyGroup(1).name)("Color 2");\ncolor4 = effect(thisProperty.propertyGroup(1).name)("Color 3");\ncolor5 = effect(thisProperty.propertyGroup(1).name)("Color 4");\ncolor6 = effect(thisProperty.propertyGroup(1).name)("Color 5");\ncolor7 = effect(thisProperty.propertyGroup(1).name)("Color 6");\ncolor8 = effect(thisProperty.propertyGroup(1).name)("Color 7");\ncolor9 = effect(thisProperty.propertyGroup(1).name)("Color 8");\ncolor10 = effect(thisProperty.propertyGroup(1).name)("Color 9");\nstepType = effect(thisProperty.propertyGroup(1).name)("Step Type").value.toString();\nstepAmount = Math.round(effect(thisProperty.propertyGroup(1).name)("Number of Steps"));\nauxCheck = effect(thisProperty.propertyGroup(1).name)("Use Aux Expression?");\nmaster = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;\ncolorArray = [color1, color2, color3, color4, color5, color6, color7, color8, color9, color10]\noutput = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 9");' +
                                      "\n" +
                                      "\n" +
                                      "//Outputs" +
                                      "\n" +
                                      "switch(stepType){" +
                                      "\n" +
                                      '   case "1":' +
                                      "\n" +
                                      "       curColor = output % stepAmount" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "\n" +
                                      '   case "2":' +
                                      "\n" +
                                      "       a = 1;" +
                                      "\n" +
                                      "       curColor = Math.abs(Math.abs(output % (2*(stepAmount-1)) - (stepAmount-1)) - (stepAmount-1));" +
                                      "\n" +
                                      "       break;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "finalMix = colorArray[curColor]" +
                                      "\n" +
                                      "\n" +
                                      "if (auxCheck == 1){" +
                                      "\n" +
                                      '\taux = effect(thisProperty.propertyGroup(1).name)("Aux 1");' +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\taux = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\tfinalMix + aux;" +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Switch":
                                    curExp =
                                      '//controls\ncolor1 = effect(thisProperty.propertyGroup(1).name)("Color Start");\ncolor2 = effect(thisProperty.propertyGroup(1).name)("Color End");\nswitchThreshold = linear(effect(thisProperty.propertyGroup(1).name)("Switch Threshold"),1,100,0.01,1);\naux = effect(thisProperty.propertyGroup(1).name)("Aux 1"); \nmaster = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;\nauxCheck = effect(thisProperty.propertyGroup(1).name)("Use Aux Expression?");\n\noutput = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 1");' +
                                      "\n" +
                                      "\n" +
                                      "if (output > switchThreshold){" +
                                      "\n" +
                                      "\tfinalOutput = 1;" +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\tfinalOutput = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "mix1 = color1*(1-finalOutput)*master;" +
                                      "\n" +
                                      "mix2 = color2*finalOutput*master;" +
                                      "\n" +
                                      "finalMix = mix1+mix2+(color1*linear(master,0,1,1,0));" +
                                      "\n" +
                                      "\n" +
                                      "if (auxCheck == 1){" +
                                      "\n" +
                                      '\taux = effect(thisProperty.propertyGroup(1).name)("Aux 1");' +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\taux = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\tfinalMix + aux;" +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Wiggle":
                                    curExp =
                                      '\n//controls\ncolor1 = effect(thisProperty.propertyGroup(1).name)("Color Start");\ncolor2 = effect(thisProperty.propertyGroup(1).name)("Color End");\ndecayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");\nwiggleSpeed = linear(effect(thisProperty.propertyGroup(1).name)("Wiggle Speed"),1,100,1,200);\naux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1");\nmaster = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;\nauxCheck = effect(thisProperty.propertyGroup(1).name)("Use Aux Expression?");\n\noutput1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 1")*2;' +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 2")*2;' +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 3")*2;' +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 4")*2;' +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "//wiggle" +
                                      "\n" +
                                      "wiggle = wiggle(wiggleSpeed,finalOutput)[0];" +
                                      "\n" +
                                      "mix1 = color1*(1-wiggle)*master;" +
                                      "\n" +
                                      "mix2 = color2*wiggle*master;" +
                                      "\n" +
                                      "finalMix = mix1+mix2+(color1*linear(master,0,1,1,0));" +
                                      "\n" +
                                      "\n" +
                                      "if (auxCheck == 1){" +
                                      "\n" +
                                      '\taux = effect(thisProperty.propertyGroup(1).name)("Aux 1");' +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\taux = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\tfinalMix + aux;" +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                  case "Flicker":
                                    curExp =
                                      '\n//controls\ncolor1 = effect(thisProperty.propertyGroup(1).name)("Color Start");\ncolor2 = effect(thisProperty.propertyGroup(1).name)("Color End");\ndecayAmount = effect(thisProperty.propertyGroup(1).name)("Decay");\nflickerSpeed = linear(effect(thisProperty.propertyGroup(1).name)("Flicker Speed"),1,100,1,120);\naux1 = effect(thisProperty.propertyGroup(1).name)("Aux 1");\nmaster = effect(thisProperty.propertyGroup(1).name)("Master Intensity")/100;\nauxCheck = effect(thisProperty.propertyGroup(1).name)("Use Aux Expression?");\n\noutput1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 1")*2;' +
                                      "\n" +
                                      'decay1 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 2")*2;' +
                                      "\n" +
                                      'decay2 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 3")*2;' +
                                      "\n" +
                                      'decay3 = thisComp.layer("' +
                                      curProfLayer +
                                      '").effect("' +
                                      curProfProp +
                                      '")("Custom 4")*2;' +
                                      "\n" +
                                      "\n" +
                                      "if (decayAmount < 33.3) { finalOutput = linear(linear(decayAmount,0,33.3,0,1),output1,decay1); } else" +
                                      "\n" +
                                      "if (decayAmount >= 33.3 && decayAmount < 66.6) { finalOutput = linear(linear(decayAmount,33.3,66.6,0,1),decay1,decay2); } else" +
                                      "\n" +
                                      "if (decayAmount >= 66.6) { finalOutput = linear(linear(decayAmount,66.6,100,0,1),decay2,decay3); }" +
                                      "\n" +
                                      "\n" +
                                      "//flicker" +
                                      "\n" +
                                      "flicker = Math.sin(time * flickerSpeed) * finalOutput;" +
                                      "\n" +
                                      "\n" +
                                      "mix1 = color1*(1-flicker)*master;" +
                                      "\n" +
                                      "mix2 = color2*flicker*master;" +
                                      "\n" +
                                      "finalMix = mix1+mix2+(color1*linear(master,0,1,1,0));" +
                                      "\n" +
                                      "\n" +
                                      "if (auxCheck == 1){" +
                                      "\n" +
                                      '\taux = effect(thisProperty.propertyGroup(1).name)("Aux 1");' +
                                      "\n" +
                                      "}else{" +
                                      "\n" +
                                      "\taux = 0;" +
                                      "\n" +
                                      "}" +
                                      "\n" +
                                      "\n" +
                                      "if (effect(thisProperty.propertyGroup(1).name).enabled == true){" +
                                      "\n" +
                                      "\tfinalMix + aux;" +
                                      "\n" +
                                      "}else{value;}";
                                    break;
                                }
                              }
                              curProp.expression =
                                firstLine + "\n" + "\n" + curExp;
                              smoothProp.expression =
                                'output =  effect(thisProperty.propertyGroup(1).name)("reactOutput");\ntimeOffset =  effect(thisProperty.propertyGroup(1).name)("Time Offset")*.01;\nsmoothAmount =  effect(thisProperty.propertyGroup(1).name)("Smoothing")*.4;\n\nif (smoothAmount > 1){\n   output.smooth(.1,smoothAmount,time+timeOffset)\n}else{output.valueAtTime(time+timeOffset)}';
                              break loopBreak;
                            }
                          }
                        }
                      }
                    }
                  }
                  itExists = false;
                }
              }
            }
          }
        }
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function reactorNameCheck(reactorName) {
      try {
        var reactorNumber = 0;
        newCheck = false;
        restartLoop: while (true) {
          if (reactorNumber > 0) {
            newReactorName = reactorName + " " + reactorNumber;
          } else {
            newReactorName = reactorName;
          }
          for (var i = 1; i <= app.project.numItems; i += 1) {
            if (app.project.item(i) instanceof CompItem) {
              for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
                if (
                  app.project.item(i).layer(j) instanceof AVLayer ||
                  app.project.item(i).layer(j) instanceof ShapeLayer ||
                  app.project.item(i).layer(j) instanceof TextLayer
                ) {
                  for (
                    var k = 1;
                    k <=
                    app.project.item(i).layer(j).property("ADBE Effect Parade")
                      .numProperties;
                    k += 1
                  ) {
                    if (
                      app.project
                        .item(i)
                        .layer(j)
                        .property("ADBE Effect Parade")
                        .property(k).name == newReactorName
                    ) {
                      reactorNumber += 1;
                      continue restartLoop;
                    }
                  }
                }
              }
            }
          }
          break;
        }
        return reactorNumber;
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function findMaxReactorNum(theLayer, theComp) {
      try {
        var profArray = [];
        if (theLayer instanceof CameraLayer || theLayer instanceof LightLayer) {
          for (var z = 1; z <= theComp.numLayers; z += 1) {
            if (
              theComp.layer(z).comment == "FreqCamLightLayer. Leave this alone."
            ) {
              theLayer = theComp.layer(z);
              for (
                var m = 1;
                m <= theLayer.property("ADBE Effect Parade").numProperties;
                m += 1
              ) {
                for (
                  var n = 1;
                  n <=
                  theLayer.property("ADBE Effect Parade").property(m)
                    .numProperties;
                  n += 1
                ) {
                  if (
                    theLayer
                      .property("ADBE Effect Parade")
                      .property(m)
                      .property(n).name == "reactOutput"
                  ) {
                    curProfNum = theLayer
                      .property("ADBE Effect Parade")
                      .property(m)
                      .property(n)
                      .expression.split("/*-")[1];
                    profArray.push(parseInt(curProfNum));
                  }
                }
              }
            }
          }
        } else {
          for (
            var m = 1;
            m <= theLayer.property("ADBE Effect Parade").numProperties;
            m += 1
          ) {
            for (
              var n = 1;
              n <=
              theLayer.property("ADBE Effect Parade").property(m).numProperties;
              n += 1
            ) {
              if (
                theLayer.property("ADBE Effect Parade").property(m).property(n)
                  .name == "reactOutput"
              ) {
                curProfNum = theLayer
                  .property("ADBE Effect Parade")
                  .property(m)
                  .property(n)
                  .expression.split("/*-")[1];
                profArray.push(parseInt(curProfNum));
              }
            }
          }
        }
        if (profArray.length == 0) {
          curProfNum = 1;
          return curProfNum;
        }
        curProfNum = Math.max.apply(Math, profArray);
        return curProfNum + 1;
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function reactA(checkFull, singleProp) {
      try {
        layerArray = [];
        var curComp = app.project.activeItem;
        if (curComp === null) {
          return;
        }
        if (checkFull === true) {
          for (var i = 1; i <= app.project.numItems; i += 1) {
            if (
              app.project.item(i) instanceof CompItem &&
              app.project.item(i).name == curComp.name &&
              app.project.item(i).numLayers > 0
            ) {
              for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
                layerArray.push(app.project.item(i).layer(j));
              }
            }
          }
          for (var i = 0; i < layerArray.length; i += 1) {
            reactB(layerArray[i], layerArray[i], curComp);
          }
        } else {
          reactB(singleProp, checkFull, curComp);
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function reactB(theProp, theLayer, theComp) {
      try {
        effectLayer = theLayer;
        try {
          if (theProp.propertyType) {
          }
        } catch (err) {
          return;
        }
        if (
          theProp.propertyType == PropertyType.PROPERTY &&
          theProp.expressionEnabled === true
        ) {
          var identifier1 = "//reactProperty";
          var identifier2 = "//reactFind";
          var identifierCheck = true;
          var firstLine = theProp.expression;
          if (firstLine.indexOf(identifier1) == -1) {
            if (firstLine.indexOf(identifier2) == -1) {
              identifierCheck = false;
            }
          }
          if (identifierCheck == false) {
            return;
          }
          reactorArray = [];
          effectLayer = theLayer;
          parentProp = theProp.parentProperty;
          parentParent = parentProp.parentProperty;
          curProfNum = theProp.expression.split("/*-")[1];
          if (
            effectLayer instanceof CameraLayer ||
            effectLayer instanceof LightLayer
          ) {
            for (var z = 1; z <= theComp.numLayers; z += 1) {
              if (
                theComp.layer(z).comment ==
                "FreqCamLightLayer. Leave this alone."
              ) {
                specialLayer = theComp.layer(z);
                for (
                  var m = 1;
                  m <=
                  specialLayer.property("ADBE Effect Parade").numProperties;
                  m += 1
                ) {
                  for (
                    var n = 1;
                    n <=
                    specialLayer.property("ADBE Effect Parade").property(m)
                      .numProperties;
                    n += 1
                  ) {
                    if (
                      specialLayer
                        .property("ADBE Effect Parade")
                        .property(m)
                        .property(n).name == "reactOutput"
                    ) {
                      reactorOutput = specialLayer
                        .property("ADBE Effect Parade")
                        .property(m)
                        .property(n)
                        .expression.split("/*-");
                      reactorName = specialLayer
                        .property("ADBE Effect Parade")
                        .property(m).name;
                      if (
                        reactorOutput[0] == "//reactController " &&
                        reactorOutput[1] == curProfNum
                      ) {
                        reactorLocation =
                          'thisComp.layer("' +
                          specialLayer.name +
                          '").effect("' +
                          reactorName +
                          '")("outputSmooth")';
                        reactorArray.push(reactorLocation);
                      }
                    }
                  }
                }
              }
            }
          } else {
            for (
              var m = 1;
              m <= effectLayer.property("ADBE Effect Parade").numProperties;
              m += 1
            ) {
              for (
                var n = 1;
                n <=
                effectLayer.property("ADBE Effect Parade").property(m)
                  .numProperties;
                n += 1
              ) {
                if (
                  effectLayer
                    .property("ADBE Effect Parade")
                    .property(m)
                    .property(n).name == "reactOutput"
                ) {
                  reactorOutput = effectLayer
                    .property("ADBE Effect Parade")
                    .property(m)
                    .property(n)
                    .expression.split("/*-");
                  reactorName = effectLayer
                    .property("ADBE Effect Parade")
                    .property(m).name;
                  if (
                    reactorOutput[0] == "//reactController " &&
                    reactorOutput[1] == curProfNum
                  ) {
                    reactorLocation =
                      'thisLayer.effect("' + reactorName + '")("outputSmooth")';
                    reactorArray.push(reactorLocation);
                  }
                }
              }
            }
          }
          var oneDmod = "";
          if (theProp.propertyValueType == PropertyValueType.OneD) {
            oneDmod = "[0]";
          }
          thisProp = "thisProperty +";
          if (theProp.propertyValueType == PropertyValueType.COLOR) {
            thisProp = "";
          }
          if (reactorArray.length < 1) {
            theProp.expression = "";
            theProp.expressionEnabled = false;
            return;
          }
          theProp.expression =
            "//reactProperty/*-" + curProfNum + "/*-" + "\n" + thisProp;
          for (var o = 0; o < reactorArray.length; o += 1) {
            theProp.expression += "\n" + reactorArray[o] + oneDmod;
            if (o != reactorArray.length - 1) {
              theProp.expression += " +";
            }
          }
          theProp.expression += ";";
        } else {
          for (var k = 1; k <= theProp.numProperties; k += 1) {
            reactB(theProp.property(k), effectLayer, theComp);
          }
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function addControls() {
      try {
        if (demo) {
          var profLength = audioBox.items.length;
          if (profLength > 1) {
            alert(
              "Demo limited to 2 profiles. Purchase to unlock full functionality.",
            );
            return;
          }
        }
        var curWinSize = win.size;
        mainWin.visible = false;
        mainWin.maximumSize = [0, 0];
        addWin.maximumSize = maxWindowSize;
        addWin.margins = [5, 0, 5, 3];
        addWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        scriptPalette.layout.layout(true);
        addWin.size = curWinSize;
        win.layout.resize();
        var profNumArray = [];
        var profName = "";
        var profNameArray = [];
        for (var i = 1; i <= app.project.numItems; i += 1) {
          if (
            app.project.item(i) instanceof CompItem &&
            app.project.item(i).name == curReactComp
          ) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).hasAudio) {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  effectName = app.project
                    .item(i)
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k)
                    .name.split(" ");
                  if (
                    effectName[0] == "#ReactPro" ||
                    effectName[0] == "#FreqProfile"
                  ) {
                    profNumArray.push(effectName[1]);
                    for (var l = 2; l < 10; l += 1) {
                      if (effectName[l] === undefined) {
                        break;
                      } else {
                        if (l > 2) {
                          profName += " ";
                        }
                        profName += effectName[l];
                      }
                    }
                    profNameArray.push(profName);
                    profName = "";
                  }
                }
              }
            }
          }
        }
        var foundAudio = false;
        var curAudio = 1;
        for (var i = 1; i < 500; i += 1) {
          for (var j = 0; j <= profNameArray.length; j += 1) {
            if (profNameArray[j] == "Audio " + i) {
              break;
            }
            if (j == profNameArray.length) {
              foundAudio = true;
            }
          }
          if (foundAudio) {
            curAudio = i;
            break;
          }
        }
        profileText.text = "Audio " + curAudio;
        profileText.active = false;
        profileText.active = true;
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function layerModeChange(state) {
      try {
        if (state == "fullLayer") {
          layerMode = true;
          workMode = false;
        } else {
          layerMode = false;
          workMode = true;
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function addProfile() {
      try {
        var curComp = app.project.activeItem;
        if (curComp === null) {
          alert("Must be inside of a comp to create a new profile.");
          return;
        }
        if (curComp.selectedLayers.length < 1) {
          alert("Please select an audio layer first.");
          return;
        }
        if (curComp.selectedLayers.length > 1) {
          alert("Please select one audio layer at a time.");
          return;
        }
        if (!curComp.selectedLayers[0].hasAudio) {
          alert("Please select a layer that contains audio.");
          return;
        }
        var profNumArray = [];
        var profName = "";
        var profNameArray = [];
        var profText = profileText.text;
        for (var i = 1; i <= app.project.numItems; i += 1) {
          if (
            app.project.item(i) instanceof CompItem &&
            app.project.item(i).name == curReactComp
          ) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).hasAudio) {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  effectName = app.project
                    .item(i)
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k)
                    .name.split(" ");
                  if (
                    effectName[0] == "#ReactPro" ||
                    effectName[0] == "#FreqProfile"
                  ) {
                    profNumArray.push(effectName[1]);
                    for (var l = 2; l < 10; l += 1) {
                      if (effectName[l] === undefined) {
                        break;
                      } else {
                        if (l > 2) {
                          profName += " ";
                        }
                        profName += effectName[l];
                      }
                    }
                    profNameArray.push(profName);
                    profName = "";
                  }
                }
              }
            }
          }
        }
        if (profNumArray.length === 0) {
          curNumber = 1;
        } else {
          curNumber = Math.max.apply(Math, profNumArray) + 1;
        }
        for (var i = 0; i <= profNameArray.length; i += 1) {
          if (profText == profNameArray[i]) {
            alert(
              '"' +
                profText +
                '"' +
                " is already in use. Please choose a unique profile name.",
            );
            profileText.text = profileText.text;
            profileText.active = false;
            profileText.active = true;
            return;
          }
        }
        if (!/[a-zA-z]/.test(profText)) {
          alert("Please enter a profile name.");
          return;
        }
        app.beginUndoGroup('New profile: "' + profText + '"');
        audioTemp = profText;
        var scriptFile = File($.fileName);
        var audioDummy = curComp.selectedLayers[0];
        var areaStart = curComp.workAreaStart;
        var areaDur = curComp.workAreaDuration;
        var areaEnd = areaStart + areaDur;
        var curTime = curComp.time;
        var curDur = curComp.duration;
        var songDur = audioDummy.source.duration;
        var durDiff = songDur - curDur;
        var songStartTime = audioDummy.startTime;
        var songEndTime = audioDummy.outPoint;
        if (areaStart >= songEndTime || areaEnd <= songStartTime) {
          alert(
            "Work area does not currently occupy any of the selected song. Move Work Area over song and try again.",
          );
          return;
        }
        audioDummy.selected = false;
        audioDummy.selected = true;
        addWin.hide();
        audioDummy.applyPreset(profilePreset);
        for (
          var i = 1;
          i <= audioDummy.property("ADBE Effect Parade").numProperties;
          i += 1
        ) {
          if (
            audioDummy.property("ADBE Effect Parade").property(i).name ==
            "React Bake"
          ) {
            audioDummy.property("ADBE Effect Parade").property(i).name =
              "#FreqProfile " + curNumber + " " + profText;
            break;
          }
        }
        updateAudio(100);
        selectAudio();
        profileCheck = true;
        app.endUndoGroup();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function removeAddControls() {
      var curWinSize = scriptPalette.size;
      win.size = scriptPalette.size;
      addWin.visible = false;
      addWin.maximumSize = [0, 0];
      addWin.minimumSize = [0, 0];
      addWin.margins = [0, 0, 0, 0];
      mainWin.maximumSize = maxWindowSize;
      mainWin.visible = true;
      win.size = curWinSize;
      screenCheck();
      win.layout.resize();
    }
    function spectrumControls() {
      try {
        var curWinSize = win.size;
        curAudioProf = audioBox.selection.text;
        spectrumProfileText.text = audioBox.selection.text;
        selectedProfName = audioBox.selection.text;
        mainWin.visible = false;
        mainWin.maximumSize = [0, 0];
        spectrumWin.maximumSize = maxWindowSize;
        spectrumWin.margins = [0, 0, 0, 0];
        spectrumWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        scriptPalette.layout.layout(true);
        spectrumWin.size = curWinSize;
        win.layout.resize();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function removeReactFolder() {
      try {
        for (var i = 1; i <= app.project.numItems; i += 1) {
          if (
            app.project.item(i) instanceof FolderItem &&
            app.project.item(i).name == "FreqReact"
          ) {
            app.project.item(i).remove();
            break;
          }
        }
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function spectrumSetup() {
      function getItem(itemName, itemInstanceName, locationObject) {
        if (locationObject.numItems > 0) {
          for (var i = 1; i <= locationObject.numItems; i += 1) {
            var curItem = locationObject.item(i);
            if (curItem.name === itemName) {
              if (
                curItem instanceof itemInstanceName ||
                (curItem.mainSource !== "undefined" &&
                  curItem.mainSource instanceof itemInstanceName)
              ) {
                return curItem;
              }
            }
          }
        }
        return null;
      }
      try {
        preBaked = false;
        var curComp = app.project.activeItem;
        var curFPS = curComp.frameRate;
        if (curAudioProf == null) {
          return;
        }
        var reactFolder = getItem(
          "FreqReact",
          FolderItem,
          app.project.rootFolder,
        );
        if (reactFolder === null) {
          reactFolder = app.project.items.addFolder("FreqReact");
          reactFolder.label = 2;
        }
        var customRangeComp = app.project.items.addComp(
          "Edit React Profile",
          686,
          366,
          1,
          221.033333333333,
          curFPS,
        );
        customRangeComp.time = 0;
        customRangeComp.bgColor = [0, 0, 0];
        customRangeComp.shutterAngle = 265;
        customRangeComp.shutterPhase = 128;
        customRangeComp.hideShyLayers = true;
        customRangeComp.parentFolder = reactFolder;
        var spectrumframepng_footage = getItem(
          "spectrumFrame.png",
          FileSource,
          spectrumFrame,
        );
        if (spectrumframepng_footage === null) {
          var spectrumframepng_path = spectrumFrame;
          var spectrumframepng_importOptions = new ImportOptions(
            new File(spectrumframepng_path),
          );
          var spectrumframepng_footage = app.project.importFile(
            spectrumframepng_importOptions,
          );
          spectrumframepng_footage.label = 5;
          spectrumframepng_footage.selected = false;
          spectrumframepng_footage.parentFolder = reactFolder;
        }
        var profName = "";
        var profNameArray = [];
        for (var i = 1; i <= app.project.numItems; i += 1) {
          if (profName !== "") {
            break;
          }
          if (
            app.project.item(i) instanceof CompItem &&
            app.project.item(i).name == curReactComp
          ) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (profName !== "") {
                break;
              }
              if (app.project.item(i).layer(j).hasAudio) {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  effectName = app.project
                    .item(i)
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k)
                    .name.split(" ");
                  if (
                    effectName[0] == "#ReactPro" ||
                    effectName[0] == "#FreqProfile"
                  ) {
                    for (var l = 2; l < 10; l += 1) {
                      if (effectName[l] === undefined) {
                        break;
                      } else {
                        if (l > 2) {
                          profName += " ";
                        }
                        profName += effectName[l];
                      }
                    }
                    if (profName == curAudioProf) {
                      curAudioComp = app.project.item(i);
                      audioLayer = app.project.item(i).layer(j);
                      curProfile = app.project
                        .item(i)
                        .layer(j)
                        .property("ADBE Effect Parade")
                        .property(k);
                      if (
                        curProfile.property("Custom 1").isTimeVarying == true
                      ) {
                        preBaked = true;
                      }
                      break;
                    }
                    profName = "";
                  }
                }
              }
            }
          }
        }
        var audioDuration = audioLayer.outPoint - audioLayer.inPoint;
        var range1Baked_null = getItem(
          "Spectrum Controls",
          SolidSource,
          reactFolder,
        );
        if (range1Baked_null === null) {
          var range1Baked_tempNull = customRangeComp.layers.addNull();
          range1Baked_null = range1Baked_tempNull.source;
          range1Baked_null.name = "Spectrum Controls";
          range1Baked_null.label = 1;
          range1Baked_null.mainSource.color = [
            0.66274511814117, 0.79607844352722, 0.78039216995239,
          ];
          range1Baked_null.parentFolder = reactFolder;
          range1Baked_tempNull.remove();
        }
        var audiospectrum_solid = getItem(
          "audioSpectrum",
          SolidSource,
          reactFolder,
        );
        if (audiospectrum_solid === null) {
          var audiospectrum_tempSolid = customRangeComp.layers.addSolid(
            [1, 0, 0.72941184043884],
            "audioSpectrum",
            650,
            366,
            1,
          );
          audiospectrum_solid = audiospectrum_tempSolid.source;
          audiospectrum_solid.label = 1;
          audiospectrum_solid.parentFolder = reactFolder;
          audiospectrum_tempSolid.remove();
        }
        customRangeComp.openInViewer();
        var spectrumSetup = customRangeComp.layers.addNull();
        var spectrumSetup_source = spectrumSetup.source;
        spectrumSetup.replaceSource(range1Baked_null, true);
        spectrumSetup_source.remove();
        spectrumSetup.name = "Spectrum Controls";
        spectrumSetup.label = 3;
        spectrumSetup.shy = false;
        spectrumSetup.moveToEnd();
        spectrumSetup.applyPreset(spectrumControlsPreset);
        spectrumSetup.property("ADBE Effect Parade").property(1).name =
          "Spectrum Controls";
        spectrumSetup
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point")
          .setValue([0, 0, 0]);
        spectrumSetup
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue([241, 178, 0]);
        spectrumSetup
          .property("ADBE Transform Group")
          .property("ADBE Scale")
          .setValue([198, 176, 100]);
        var range1Border = customRangeComp.layers.addShape();
        range1Border.name = "Range Border";
        range1Border.label = 3;
        range1Border.shy = true;
        range1Border.moveToEnd();
        range1Border
          .property("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group");
        range1Border.property("ADBE Root Vectors Group").property(1).name =
          "Rectangle 1";
        range1Border
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .addProperty("ADBE Vector Shape - Rect");
        range1Border
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property("ADBE Vector Rect Size")
          .setValue([289, 224]);
        range1Border
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .addProperty("ADBE Vector Graphic - Stroke");
        range1Border
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property("ADBE Vector Stroke Color")
          .setValue([1, 1, 1, 0.9]);
        range1Border
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property("ADBE Vector Stroke Width")
          .setValue(4);
        range1Border
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(2)
          .property("ADBE Vector Stroke Line Join")
          .setValue(2);
        range1Border
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue([333, 180, 0]);
        var frequencyRange = customRangeComp.layers.addBoxText(
          [169, 22],
          "1-250hz",
        );
        frequencyRange.name = "Frequency Range";
        frequencyRange.label = 8;
        frequencyRange.shy = true;
        frequencyRange.moveToEnd();
        var frequencyRange_TextProp = frequencyRange
          .property("ADBE Text Properties")
          .property("ADBE Text Document");
        var frequencyRange_TextDocument = frequencyRange_TextProp.value;
        frequencyRange_TextDocument.font = "CourierNewPSMT";
        frequencyRange_TextDocument.fontSize = 15;
        frequencyRange_TextDocument.applyFill = true;
        frequencyRange_TextDocument.fillColor = [1, 1, 1];
        frequencyRange_TextDocument.applyStroke = false;
        frequencyRange_TextDocument.justification =
          ParagraphJustification.CENTER_JUSTIFY;
        frequencyRange_TextDocument.tracking = 15;
        if (parseFloat(app.version) >= 13.2) {
          frequencyRange_TextDocument.verticalScale = 1;
          frequencyRange_TextDocument.horizontalScale = 1;
          frequencyRange_TextDocument.baselineShift = 0;
          frequencyRange_TextDocument.tsume = 0;
        }
        frequencyRange_TextProp.setValue(frequencyRange_TextDocument);
        frequencyRange
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue([65, 355, 0]);
        frequencyRange
          .property("ADBE Transform Group")
          .property("ADBE Opacity")
          .setValue(50);
        var gauge = customRangeComp.layers.addShape();
        gauge.name = "Gauge";
        gauge.label = 0;
        gauge.shy = true;
        gauge.moveToEnd();
        gauge
          .property("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Group");
        gauge.property("ADBE Root Vectors Group").property(1).name =
          "Rectangle 1";
        gauge
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .addProperty("ADBE Vector Shape - Rect");
        gauge
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property("ADBE Vector Shape Direction")
          .setValue(2);
        gauge
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property("ADBE Vector Rect Size")
          .setValue([21, 363]);
        gauge
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(3)
          .property("ADBE Vector Anchor")
          .setValue([0, 181]);
        gauge
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(3)
          .property("ADBE Vector Position")
          .setValue([325.5, 223.79504950495]);
        gauge
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(3)
          .property("ADBE Vector Scale")
          .setValue([100, 110.400931265059]);
        gauge
          .property("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Graphic - Fill");
        gauge
          .property("ADBE Effect Parade")
          .addProperty("ADBE Venetian Blinds");
        gauge
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE Venetian Blinds-0001")
          .setValue(22.5);
        gauge
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE Venetian Blinds-0002")
          .setValue(-90);
        gauge
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE Venetian Blinds-0003")
          .setValue(21.5999999999999);
        gauge.property("ADBE Effect Parade").addProperty("ADBE Ramp");
        gauge
          .property("ADBE Effect Parade")
          .property(2)
          .property("ADBE Ramp-0001")
          .setValue([668, 16]);
        gauge
          .property("ADBE Effect Parade")
          .property(2)
          .property("ADBE Ramp-0002")
          .setValue([1, 0.12941176470588, 0.12941176470588, 1]);
        gauge
          .property("ADBE Effect Parade")
          .property(2)
          .property("ADBE Ramp-0003")
          .setValue([668, 136]);
        gauge
          .property("ADBE Effect Parade")
          .property(2)
          .property("ADBE Ramp-0004")
          .setValue([0.43529411764706, 1, 0.38823529411765, 1]);
        gauge
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue([342, 164, 0]);
        gauge
          .property("ADBE Transform Group")
          .property("ADBE Scale")
          .setValue([100, 89.3805309734513, 100]);
        var spectrumframepng = customRangeComp.layers.add(
          spectrumframepng_footage,
        );
        spectrumframepng.label = 10;
        spectrumframepng.shy = true;
        spectrumframepng.moveToEnd();
        var reactSpectrum1 = customRangeComp.layers.add(audiospectrum_solid);
        reactSpectrum1.name = "React Spectrum 1";
        reactSpectrum1.label = 13;
        reactSpectrum1.shy = true;
        reactSpectrum1.moveToEnd();
        reactSpectrum1
          .property("ADBE Effect Parade")
          .addProperty("ADBE AudSpect");
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0002")
          .setValue([0, 366]);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0003")
          .setValue([650, 367]);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0004")
          .setValue(0);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0006")
          .setValue(10);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0007")
          .setValue(350);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0008")
          .setValue(150);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0009")
          .setValue(1480);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0010")
          .setValue(85);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0012")
          .setValue(5);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0013")
          .setValue(0);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0014")
          .setValue([0.00784313771874, 0.43137255311012, 0.95294117927551, 1]);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0015")
          .setValue([0.00784313771874, 0.43137255311012, 0.95294117927551, 1]);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0020")
          .setValue(2);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0021")
          .setValue(1);
        reactSpectrum1
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue([324.6, 183, 0]);
        reactSpectrum1
          .property("ADBE Transform Group")
          .property("ADBE Scale")
          .setValue([100, 100, 100]);
        var reactSpectrum2 = customRangeComp.layers.add(audiospectrum_solid);
        reactSpectrum2.name = "React Spectrum 2";
        reactSpectrum2.label = 13;
        reactSpectrum2.shy = true;
        reactSpectrum2.moveToEnd();
        reactSpectrum2
          .property("ADBE Effect Parade")
          .addProperty("ADBE AudSpect");
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0002")
          .setValue([0, 371]);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0003")
          .setValue([650, 371]);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0004")
          .setValue(0);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0006")
          .setValue(10);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0007")
          .setValue(350);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0008")
          .setValue(150);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0009")
          .setValue(1480);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0010")
          .setValue(85);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0012")
          .setValue(7.90000009536743);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0013")
          .setValue(0.00999999977648);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0014")
          .setValue([0, 0.19999027252197, 0.44627457857132, 1]);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0015")
          .setValue([0, 0.19999027252197, 0.44627457857132, 1]);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0021")
          .setValue(1);
        reactSpectrum2
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue([324.6, 183, 0]);
        reactSpectrum2
          .property("ADBE Transform Group")
          .property("ADBE Scale")
          .setValue([100, 100, 100]);
        var newAudioLayer = customRangeComp.layers.add(audioLayer.source);
        newAudioLayer.selected = false;
        newAudioLayer.shy = true;
        var reactData1 = curProfile.property("reactData1").value;
        var rangePosition = curProfile.property("reactData2").value;
        var rangeScale = curProfile.property("reactData3").value;
        var profileInOut = curProfile.property("reactData4").value;
        if (
          (preBaked == false &&
            profileInOut[0] == 0 &&
            profileInOut[1] == 0 &&
            workMode) ||
          altCheck
        ) {
          newAudioLayer.startTime = audioLayer.startTime;
          newAudioLayer.inPoint = Math.max(
            audioLayer.inPoint,
            curAudioComp.workAreaStart,
          );
          newAudioLayer.outPoint = Math.min(
            audioLayer.outPoint,
            curAudioComp.workAreaStart + curAudioComp.workAreaDuration,
          );
          if (demo) {
            if (newAudioLayer.outPoint > newAudioLayer.inPoint + demoLimit) {
              timeExceeded = true;
              newAudioLayer.outPoint = newAudioLayer.inPoint + demoLimit;
            }
          }
          newAudioLayer.startTime = 0;
          var newIn = newAudioLayer.inPoint;
          var newOut = newAudioLayer.outPoint;
          curProfile.property("reactData4").setValue([newIn, newOut]);
          newAudioLayer.startTime = 0 - newAudioLayer.inPoint;
          newAudioLayer.moveToEnd();
        } else if (
          preBaked == false &&
          profileInOut[0] == 0 &&
          profileInOut[1] == 0 &&
          layerMode == true
        ) {
          newAudioLayer.startTime = audioLayer.startTime;
          newAudioLayer.inPoint = audioLayer.inPoint;
          newAudioLayer.outPoint = audioLayer.outPoint;
          if (demo) {
            if (newAudioLayer.outPoint > newAudioLayer.inPoint + demoLimit) {
              timeExceeded = true;
              newAudioLayer.outPoint = newAudioLayer.inPoint + demoLimit;
            }
          }
          newAudioLayer.startTime = 0;
          var newIn = newAudioLayer.inPoint;
          var newOut = newAudioLayer.outPoint;
          curProfile.property("reactData4").setValue([newIn, newOut]);
          newAudioLayer.startTime = 0 - newAudioLayer.inPoint;
          newAudioLayer.moveToEnd();
        } else {
          newAudioLayer.inPoint = curProfile.property("reactData4").value[0];
          newAudioLayer.outPoint = curProfile.property("reactData4").value[1];
          newAudioLayer.startTime = 0 - newAudioLayer.inPoint;
          newAudioLayer.moveToEnd();
        }
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).name == "Spectrum Controls") {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  if (
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k).name == "Spectrum Controls"
                  ) {
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k)
                      .property("Start Frequency")
                      .setValue(reactData1[0]);
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k)
                      .property("End Frequency")
                      .setValue(reactData1[1]);
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k)
                      .property("Spectrum Height")
                      .setValue(reactData1[2]);
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Transform Group")
                      .property("Position")
                      .setValue(rangePosition);
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Transform Group")
                      .property("Scale")
                      .setValue(rangeScale);
                  }
                }
              }
            }
          }
        }
        spectrumSetup
          .property("ADBE Effect Parade")
          .property(1)
          .property("Layer Control")
          .setValue(7);
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0001")
          .setValue(8);
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0001")
          .setValue(8);
        customRangeComp.duration = newAudioLayer.outPoint;
        customRangeComp.workAreaStart = 0;
        customRangeComp.workAreaDuration = customRangeComp.duration;
        spectrumSetup.outPoint = newAudioLayer.outPoint;
        range1Border.outPoint = newAudioLayer.outPoint;
        frequencyRange.outPoint = newAudioLayer.outPoint;
        frequencyRange_TextDocument.outPoint = newAudioLayer.outPoint;
        gauge.outPoint = newAudioLayer.outPoint;
        spectrumframepng.outPoint = newAudioLayer.outPoint;
        reactSpectrum1.outPoint = newAudioLayer.outPoint;
        reactSpectrum2.outPoint = newAudioLayer.outPoint;
        range1Border.duration = newAudioLayer.outPoint;
        frequencyRange.duration = newAudioLayer.outPoint;
        gauge.duration = newAudioLayer.outPoint;
        spectrumframepng.duration = newAudioLayer.outPoint;
        reactSpectrum1.duration = newAudioLayer.outPoint;
        reactSpectrum2.duration = newAudioLayer.outPoint;
        spectrumSetup
          .property("ADBE Effect Parade")
          .property(1)
          .property("Point Control").expression = "[0,0]";
        spectrumSetup
          .property("ADBE Effect Parade")
          .property(1)
          .property("Point Control 2").expression = "[100,100]";
        spectrumSetup
          .property("ADBE Effect Parade")
          .property(1)
          .property("Width/Height").expression =
          'p1 = toComp(effect("Spectrum Controls")("Point Control"));\n\np2 = toComp(effect("Spectrum Controls")("Point Control 2"));\n\nl = Math.abs(p2[0]-p1[0]);\n\nh = Math.abs(p2[1]-p1[1]);\n\n[l,h]';
        spectrumSetup
          .property("ADBE Effect Parade")
          .property(1)
          .property("Output").expression =
          'p1 = toComp(effect("Spectrum Controls")("Point Control"));\n\np2 = toComp(effect("Spectrum Controls")("Point Control 2"));\n\nl = Math.abs(p2[0]-p1[0]);\n\nh = Math.abs(p2[1]-p1[1]);\n\na = toComp(transform.anchorPoint);\n\nlayer = effect("Spectrum Controls")("Layer Control");\n\ns = layer.sampleImage(a,[l/2, h/2]);\n\ns[3];';
        spectrumSetup
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point").expression = "[50,50]";
        range1Border
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(2)
          .property(1)
          .property("ADBE Vector Rect Size").expression =
          'thisComp.layer("Spectrum Controls").transform(6)';
        range1Border
          .property("ADBE Transform Group")
          .property("ADBE Position").expression =
          'thisComp.layer("Spectrum Controls").transform(2)';
        frequencyRange
          .property("ADBE Text Properties")
          .property("ADBE Text Document").expression =
          'thisComp.layer("React Spectrum 2").effect(1)(6).value  + "-" + thisComp.layer("React Spectrum 2").effect(1)(7).value + "hz"';
        gauge
          .property("ADBE Root Vectors Group")
          .property(1)
          .property(3)
          .property("ADBE Vector Scale").expression =
          'try{\n\nrange = thisComp.layer("Spectrum Controls");\n\nexists = true;\n\n}catch (err){\n\nexists = false;\n\n}\n\nif (exists){\n\n[105,linear(thisComp.layer("Spectrum Controls").effect("Spectrum Controls")("Output"),0,1,3,110.5)-.5];\n\n}else{\n\n[105,110.5]\n\n}';
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0006").expression =
          'thisComp.layer("Spectrum Controls").effect("Spectrum Controls")("Start Frequency");';
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0007").expression =
          'thisComp.layer("Spectrum Controls").effect("Spectrum Controls")("End Frequency");';
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0009").expression =
          'thisComp.layer("Spectrum Controls").effect("Spectrum Controls")("Spectrum Height")';
        reactSpectrum1
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0012").expression =
          'freqStart = thisComp.layer("Spectrum Controls").effect("Spectrum Controls")(1);\nfreqEnd = thisComp.layer("Spectrum Controls").effect("Spectrum Controls")(2);\nfreqDiff = Math.abs(freqEnd-freqStart);\nthickness = linear(freqDiff,1,5000,4,2);';
        reactSpectrum1
          .property("ADBE Transform Group")
          .property("ADBE Position").expression = "[325,183]";
        reactSpectrum1
          .property("ADBE Transform Group")
          .property("ADBE Scale").expression = "[100,100]";
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0006").expression =
          'thisComp.layer("Spectrum Controls").effect("Spectrum Controls")("Start Frequency");';
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0007").expression =
          'thisComp.layer("Spectrum Controls").effect("Spectrum Controls")("End Frequency");';
        reactSpectrum2
          .property("ADBE Effect Parade")
          .property(1)
          .property("ADBE AudSpect-0009").expression =
          'thisComp.layer("Spectrum Controls").effect("Spectrum Controls")("Spectrum Height")';
        reactSpectrum2
          .property("ADBE Transform Group")
          .property("ADBE Position").expression = "[325,183]";
        reactSpectrum2
          .property("ADBE Transform Group")
          .property("ADBE Scale").expression = "[100,100]";
        frequencyRange.locked = true;
        gauge.locked = true;
        spectrumframepng.locked = true;
        reactSpectrum1.locked = true;
        reactSpectrum2.locked = true;
        newAudioLayer.locked = true;
        spectrumSetup.selected = true;
        customRangeComp.openInViewer();
        if (app.activeViewer) {
          app.activeViewer.views[0].options.zoom = 1;
        }
        if (timeExceeded && layerMode == true) {
          alert(
            "Audio layer exceeds the 10 second trial limit. This profile has been automatically reduced to 10 seconds. Try creating a \'Work Area\' profile to select a specific section under 10 seconds, or purchase the full product at https://davey.studio/react to unlock full song baking.",
          );
        } else {
          if (timeExceeded) {
            alert(
              "Work Area exceeds the 10 second trial limit. This profile has been automatically reduced to 10 seconds. Reduce your AE Work Area to 10 seconds or less, or purchase the full product at https://davey.studio/react to unlock unlimited baking.",
            );
          }
        }
        profBakeDropdown.selection = 0;
        layerModeChange("fullLayer");
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function profileRename() {
      try {
        var newProfName = spectrumProfileText.text;
        var profNameArray = [];
        var profName = "";
        if (newProfName == selectedProfName) {
          return;
        }
        var allDone = false;
        for (var i = 1; i <= app.project.numItems; i += 1) {
          if (allDone) {
            break;
          }
          curComp = app.project.item(i);
          for (var j = 1; j <= curComp.numLayers; j += 1) {
            if (curComp.layer(j).hasAudio) {
              for (
                var k = 1;
                k <=
                curComp.layer(j).property("ADBE Effect Parade").numProperties;
                k += 1
              ) {
                effectName = curComp
                  .layer(j)
                  .property("ADBE Effect Parade")
                  .property(k).name;
                effectNameSplit = effectName.split(" ");
                if (
                  effectNameSplit[0] == "#ReactPro" ||
                  effectNameSplit[0] == "#FreqProfile"
                ) {
                  for (var l = 2; l < 10; l += 1) {
                    if (effectNameSplit[l] === undefined) {
                      break;
                    } else {
                      if (l > 2) {
                        profName += " ";
                      }
                      profName += effectNameSplit[l];
                    }
                  }
                  if (profName == selectedProfName) {
                    newFullName = effectName.replace(
                      selectedProfName,
                      newProfName,
                    );
                    effectToChange = curComp
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k);
                    allDone = true;
                  }
                  profNameArray.push(profName);
                  profName = "";
                }
              }
            }
          }
        }
        for (var i = 0; i <= profNameArray.length; i += 1) {
          if (newProfName == profNameArray[i]) {
            alert(
              '"' +
                newProfName +
                '"' +
                " is already in use. Please choose a unique profile name.",
            );
            spectrumProfileText.active = true;
            return;
          }
        }
        if (!/[a-zA-z]/.test(newProfName)) {
          alert("Please enter a profile name.");
          spectrumProfileText.selected = true;
          spectrumProfileText.active = true;
          spectrumProfileText.selected = true;
          return;
        }
        curComp.openInViewer();
        effectToChange.name = newFullName;
        reactorLoop: for (var l = 1; l <= curComp.numLayers; l += 1) {
          for (
            var m = 1;
            m <= curComp.layer(l).property("ADBE Effect Parade").numProperties;
            m += 1
          ) {
            for (
              var n = 1;
              n <=
              curComp.layer(l).property("ADBE Effect Parade").property(m)
                .numProperties;
              n += 1
            ) {
              if (
                curComp
                  .layer(l)
                  .property("ADBE Effect Parade")
                  .property(m)
                  .property(n).name == "reactOutput"
              ) {
                curReactor = curComp
                  .layer(l)
                  .property("ADBE Effect Parade")
                  .property(m);
                curOutput = curReactor.property(n);
                curExp = curOutput.expression;
                curOutputSplit = curOutput.expression.split("/*-");
                if (curOutputSplit[2] == selectedProfName) {
                  newFullName = curReactor.name.replace(
                    selectedProfName,
                    newProfName,
                  );
                  curReactor.name = newFullName;
                  newFullExp = curExp.replace(selectedProfName, newProfName);
                  curOutput.expression = newFullExp;
                }
              }
            }
          }
        }
        selectedProfName = newProfName;
        curAudioProf = newProfName;
        storeCurComp();
        updateAudio();
        reactA(true, false);
        reactorExp();
        reselectComp();
        storeCurComp();
        updateAudio();
        reactA(true, false);
        reactorExp();
        reselectComp();
        openSpectrumComp();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function openSpectrumComp() {
      try {
        for (var i = 1; i <= app.project.numItems; i += 1) {
          curComp = app.project.item(i);
          if (curComp.name == "Edit React Profile") {
            curComp.openInViewer();
            break;
          }
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function changeSpectrumHeight(heightChange) {
      try {
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).name == "Spectrum Controls") {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  if (
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k).name == "Spectrum Controls"
                  ) {
                    curControls = app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k);
                    curHeightControl = curControls.property("Spectrum Height");
                    curHeightVal = curHeightControl.value;
                    newHeight = curHeightVal + heightChange;
                    finalHeight = Math.min(Math.max(newHeight, 1), 32000);
                    curHeightControl.setValue(finalHeight);
                    break;
                  }
                }
              }
            }
          }
        }
        freqBox1.active = true;
        freqBox1.active = false;
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function updatePreset() {
      try {
        var curComp = app.project.activeItem;
        for (var j = 1; j <= curComp.numLayers; j += 1) {
          if (curComp.layer(j).name == "Spectrum Controls") {
            for (
              var k = 1;
              k <=
              curComp.layer(j).property("ADBE Effect Parade").numProperties;
              k += 1
            ) {
              if (
                curComp.layer(j).property("ADBE Effect Parade").property(k)
                  .name == "Spectrum Controls"
              ) {
                curControls = curComp
                  .layer(j)
                  .property("ADBE Effect Parade")
                  .property(k);
                startVal = curControls.property("Start Frequency").value;
                endVal = curControls.property("End Frequency").value;
                break;
              }
            }
          }
        }
        var startArray = [
          1, 1, 250, 500, 750, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 15000,
        ];
        var endArray = [
          22050, 250, 500, 750, 1000, 2000, 3000, 4000, 6000, 8000, 10000,
          15000, 22050,
        ];
        for (var a = 0; a <= 12; a += 1) {
          if (startArray[a] == startVal && endArray[a] == endVal) {
            presetDD.selection = a;
            return;
          }
        }
        if (presetDD.items.length == 13) {
          presetDD.add("item", "Custom");
          presetDD.selection = 13;
        } else {
          presetDD.selection = 13;
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function changePreset(selection) {
      try {
        var startArray = [
          1, 1, 250, 500, 750, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 15000,
        ];
        var endArray = [
          22050, 250, 500, 750, 1000, 2000, 3000, 4000, 6000, 8000, 10000,
          15000, 22050,
        ];
        if (selection != 13) {
          presetDD.remove(presetDD.items[13]);
        } else {
          return;
        }
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).name == "Spectrum Controls") {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  if (
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k).name == "Spectrum Controls"
                  ) {
                    curControls = app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k);
                    curControls
                      .property("Start Frequency")
                      .setValue(startArray[selection]);
                    curControls
                      .property("End Frequency")
                      .setValue(endArray[selection]);
                    break;
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function updateHeightText() {
      try {
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).name == "Spectrum Controls") {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  if (
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k).name == "Spectrum Controls"
                  ) {
                    curControls = app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k);
                    curHeight = curControls.property("Spectrum Height").value;
                    break;
                  }
                }
              }
            }
          }
        }
        if (curHeight == prevSpectrumHeight) {
          return;
        }
        heightBox.text = curHeight;
        prevSpectrumHeight = curHeight;
        screenCheck();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function updateRangeText() {
      try {
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).name == "Spectrum Controls") {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  if (
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k).name == "Spectrum Controls"
                  ) {
                    curControls = app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k);
                    startFreq = curControls.property("Start Frequency").value;
                    endFreq = curControls.property("End Frequency").value;
                    break;
                  }
                }
              }
            }
          }
        }
        if (startFreq == prevSpectrumStart && endFreq == prevSpectrumEnd) {
          return;
        }
        freqBox1.text = startFreq;
        freqBox2.text = endFreq;
        prevSpectrumStart = startFreq;
        prevSpectrumEnd = endFreq;
        screenCheck();
        screenHack();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function extendFrequencies(button) {
      try {
        var startArray = [
          1, 250, 500, 750, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 15000, 1,
        ];
        var endArray = [
          250, 500, 750, 1000, 2000, 3000, 4000, 6000, 8000, 10000, 15000,
          22050, 22050,
        ];
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem) {
            for (var j = 1; j <= app.project.item(i).numLayers; j += 1) {
              if (app.project.item(i).layer(j).name == "Spectrum Controls") {
                for (
                  var k = 1;
                  k <=
                  app.project.item(i).layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  if (
                    app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k).name == "Spectrum Controls"
                  ) {
                    curControls = app.project
                      .item(i)
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k);
                    if (startArray[button - 1] < freqBox2.text) {
                      curControls
                        .property("Start Frequency")
                        .setValue(startArray[button - 1]);
                    } else {
                      if (endArray[button - 1] > freqBox2.text) {
                        curControls
                          .property("End Frequency")
                          .setValue(endArray[button - 1]);
                      }
                    }
                    break;
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function screenHack() {
      var curWin = win.size.height;
      win.size.height = curWin + 1;
      win.size.height = curWin;
    }
    function bakeCustom() {
      try {
        var textArray = [
          "Dropping the bass.",
          "Getting jiggy with it.",
          "Groovin\'.",
          "Shreddin\'.",
          "Firing up the Bass Cannon.",
          "Rockin\' out.",
          "This beat is phat.",
          "Cowabunga!",
          "Finding dope beats.",
          "Vibin\'.",
          "Jammin\'.",
          "Doing the Jitter Bug.",
          "Rocking and rolling.",
          "Music in the soul can be heard by the universe.",
          "Music is what feelings sound like.",
          '"Without music, life would be a mistake." - Friedrich Nietzsche',
          '"The only truth is music." - Jack Kerouac',
          '"Where words fail, music speaks." - Hans Christian Andersen',
          '"We are the music makers, and we are the dreamers of dreams." - Arthur O\u2019Shaughnessy',
          '"Music is an outburst of the soul." - Frederick Delius',
          '"I like music... a lot." - Davey',
          '"Music is the life blood of all things living and the breakfast to this journey called existence." - My cousin',
          "Get down on it!",
          '"Where words leave off, music begins." - Heinrich Heine',
          '"Music is the universal language of mankind." - Henry Wadsworth Longfellow',
          "A 2007 study found that music aids in plant growth rate.",
          "Music is one of the few activities that utilizes the entire brain.",
          "Playing music regularly physically alters your brain structure.",
          "A healthy young human ear can hear all frequencies from 20 to 20,000 hertz.",
          "Sound comes from vibrations. These vibrations create sound waves which move through mediums such as air and water before reaching our ears.",
          "If you try to say the alphabet without moving your lips or tongue every letter will sound the same.",
          "Amphitheaters, both ancient and modern, have a curved shape to create an area which echoes or amplifies sound.",
          "The loud noise you create by cracking a whip occurs because the tip is moving so fast it breaks the speed of sound!",
          "Wind doesn\u2019t make sound unless it hits something in it\u2019s path.",
          "Sound moves around four times faster in water than it does through air.",
          "The sound of thunder is produced by rapidly heated air surrounding lightning which expands faster than the speed of sound.",
          "In 2016, Mozart sold more CDs than Beyonc\xe9.",
          "Cows produce more milk when listening to slow music.",
          "Prince Played 27 Instruments on his debut album.",
          "Studies show that singing in a group boosts your mood.",
          '"Wanna Be" by The Spice Girls was found to be the catchiest song of all time.',
          "Finland has the most metal bands per capita.",
          "An astronaut named Chris Hadfield released an album which was entirely recorded from space while in orbit.",
          "At 115 decibals, a baby\u2019s cry is louder than a car horn.",
          '"Music can be pretty good to listen to." - My friend EthinAllen',
          "Turning up the volume.",
          "Crank dat.",
          "Sound travels at a whopping 767 miles per hour.",
          "Classical music has been shown to effectively treat insomnia.",
          "A single violin is made from over 70 individual pieces of wood.",
          "The longest drum roll by one person is 8 hours, 1 min, and 17 seconds.",
          "The world\u2019s largest drum kit has 813 pieces.",
          "The people of Africa and India used drums for long range communication between villages.",
          "Recreational playing of drums lowers stress hormones in our body.",
          "Listening to music helps in the strengthening of working memory.",
          "Music helps boost the growth of grey matter in the brain.",
        ];
        var textLength = textArray.length - 1;
        if (demo) {
          progTitle = "Baking limited to 10 seconds.";
        } else {
          progTitle = "Baking. May take some time.";
        }
        var progWin = new Window("palette", progTitle, undefined);
        progWin.alignChildren = ["fill", "middle"];
        progWin.preferredSize.width = 360;
        progWin.spacing = 10;
        progWin.margins = [15, 20, 15, 0];
        progWin.etProgressName = progWin.add("statictext");
        progWin.etProgressName.text =
          textArray[Math.floor(Math.random() * textLength)];
        progWin.pbProgressBar = progWin.add("progressbar");
        progWin.pbProgressBar.preferredSize.height = 5;
        progWin.etProgressInfo = progWin.add("statictext");
        progWin.show();
        progWin.pbProgressBar.value = 15;
        progWin.update();
        audioTemp = curAudioProf;
        var rangeArray = [];
        compCheck = false;
        for (var c = 1; c <= app.project.numItems; c += 1) {
          customComp = app.project.item(c);
          if (
            customComp instanceof CompItem &&
            customComp.name == "Edit React Profile"
          ) {
            compCheck = true;
            customComp.openInViewer();
            for (var l = 1; l <= customComp.numLayers; l += 1) {
              curLayer = customComp.layer(l);
              if (curLayer.name == "Spectrum Controls") {
                customOutput = curLayer
                  .property("ADBE Effect Parade")
                  .property("Spectrum Controls")
                  .property("Output");
                break;
              }
            }
          }
          if (compCheck) {
            break;
          }
        }
        if (!compCheck) {
          alert("Something went wrong, restart script and try again.");
          return;
        }
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem) {
            for (var j = 1; j <= baseComp.numLayers; j += 1) {
              if (baseComp.layer(j).name == "Spectrum Controls") {
                for (
                  var k = 1;
                  k <=
                  baseComp.layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  if (
                    baseComp.layer(j).property("ADBE Effect Parade").property(k)
                      .name == "Spectrum Controls"
                  ) {
                    freqStart = baseComp
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k)
                      .property("Start Frequency").value;
                    freqEnd = baseComp
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k)
                      .property("End Frequency").value;
                    spectrumHeight = baseComp
                      .layer(j)
                      .property("ADBE Effect Parade")
                      .property(k)
                      .property("Spectrum Height").value;
                  }
                }
              }
              if (baseComp.layer(j).name == "Spectrum Controls") {
                rangePosition = baseComp
                  .layer(j)
                  .property("ADBE Transform Group")
                  .property("Position").value;
                rangeScale = baseComp
                  .layer(j)
                  .property("ADBE Transform Group")
                  .property("Scale").value;
              }
            }
          }
        }
        var profName = "";
        var foundIt = false;
        for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem && baseComp.name == curReactComp) {
            for (var j = 1; j <= baseComp.numLayers; j += 1) {
              if (baseComp.layer(j).hasAudio) {
                for (
                  var k = 1;
                  k <=
                  baseComp.layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  effectName = baseComp
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k)
                    .name.split(" ");
                  if (
                    effectName[0] == "#ReactPro" ||
                    effectName[0] == "#FreqProfile"
                  ) {
                    for (var l = 2; l < 10; l += 1) {
                      if (effectName[l] === undefined) {
                        break;
                      } else {
                        if (l > 2) {
                          profName += " ";
                        }
                        profName += effectName[l];
                      }
                    }
                    if (profName == curAudioProf) {
                      foundIt = true;
                      audioDummy = baseComp.layer(j);
                      curPreset = audioDummy
                        .property("ADBE Effect Parade")
                        .property(k);
                    }
                    profName = "";
                  }
                }
              }
            }
          }
          if (foundIt) {
            break;
          }
        }
        var areaStart = baseComp.workAreaStart;
        var areaDur = baseComp.workAreaDuration;
        var curTime = baseComp.time;
        var curDur = baseComp.duration;
        var songDur = audioDummy.source.duration;
        var songStartTime = audioDummy.startTime;
        var songIn = audioDummy.inPoint;
        var songOut = audioDummy.outPoint;
        var durDiff = songDur - curDur;
        audioDummy.startTime = 0;
        if (durDiff > 0) {
          baseComp.duration = curDur + durDiff;
        }
        baseComp.time = 0;
        while (baseComp.selectedLayers.length > 0) {
          baseComp.selectedLayers[baseComp.selectedLayers.length - 1].selected =
            false;
        }
        while (customComp.selectedLayers.length > 0) {
          customComp.selectedLayers[
            customComp.selectedLayers.length - 1
          ].selected = false;
        }
        var curIn = curPreset.property("reactData4").value[0];
        var curOut = curPreset.property("reactData4").value[1];
        audioDummy.inPoint = curIn;
        audioDummy.outPoint = curOut;
        progWin.pbProgressBar.value = 20;
        progWin.update();
        customComp.openInViewer();
        customOutput.selected = true;
        app.executeCommand(2639);
        app.executeCommand(19);
        customOutput.selected = false;
        progWin.pbProgressBar.value = 40;
        progWin.update();
        baseComp.openInViewer();
        for (var n = 1; n <= 10; n += 1) {
          outputClear = curPreset.property("Custom " + n);
          if (outputClear.isTimeVarying) {
            outputClear.selected = true;
            app.executeCommand(21);
            outputClear.selected = false;
          }
        }
        baseComp.time = Math.max(audioDummy.inPoint, 0);
        var output1 = curPreset.property("Custom 1");
        output1.selected = true;
        app.executeCommand(20);
        output1.setValueAtTime(
          audioDummy.outPoint + baseComp.frameDuration * 3,
          0,
        );
        output1.selected = false;
        timeArray = [];
        valueArray = [];
        outArray = ["2", "3", "4"];
        outValArray = [1.9, 0.7, 0.3];
        multiplier = [1.38, 1.1399, 1.059];
        above = false;
        var multi = 0;
        for (var a = 0; a < 3; a += 1) {
          falloff = 0;
          above = false;
          intensity = 1;
          for (
            var i = audioDummy.inPoint;
            i < audioDummy.outPoint + 2;
            i += baseComp.frameDuration
          ) {
            var prevVal = valueArray[valueArray.length - 1];
            if (i > audioDummy.inPoint) {
              if (output1.valueAtTime(i, true) < prevVal) {
                multi *= multiplier[a];
                falloff = prevVal -= outValArray[a] / (multi / intensity);
                above = true;
              }
              if (output1.valueAtTime(i, true) >= prevVal) {
                multi = 1;
                above = false;
                intensity = output1.valueAtTime(i, true) / 5;
              }
            }
            timeArray.push(i);
            if (above) {
              valueArray.push(falloff);
            }
            if (!above) {
              valueArray.push(output1.valueAtTime(i, true));
            }
          }
          curPreset
            .property("Custom " + outArray[a])
            .setValuesAtTimes(timeArray, valueArray);
        }
        progWin.pbProgressBar.value = 55;
        progWin.update();
        var inputArray = ["1", "2", "3", "4"];
        var outputArray = ["5", "6", "7", "8"];
        for (var a = 0; a < 4; a += 1) {
          multiOutput = curPreset.property("Custom " + inputArray[a]);
          startValue = 0;
          timeArray = [];
          valueArray = [];
          for (var i = 0; i < multiOutput.numKeys; i += 1) {
            var curValue = multiOutput.keyValue(i + 1);
            var curFrame = i * baseComp.frameDuration + audioDummy.inPoint;
            var finalValue = (startValue += curValue / 30);
            timeArray.push(curFrame);
            valueArray.push(finalValue);
          }
          curPreset
            .property("Custom " + outputArray[a])
            .setValuesAtTimes(timeArray, valueArray);
        }
        progWin.pbProgressBar.value = 70;
        progWin.update();
        timeArray = [];
        valueArray = [];
        var threshold = 0.5;
        var above = false;
        var n = 0;
        timeArray = [];
        valueArray = [];
        for (
          var i = audioDummy.inPoint;
          i < audioDummy.outPoint;
          i += baseComp.frameDuration
        ) {
          if (i == 0) {
            timeArray.push(i);
            valueArray.push(n);
            continue;
          }
          if (above) {
            if (output1.valueAtTime(i, true) < threshold) {
              above = false;
            }
          } else {
            if (output1.valueAtTime(i, true) >= threshold) {
              above = true;
              n++;
              timeArray.push(i);
              valueArray.push(n);
            }
          }
        }
        if (valueArray.length > 0) {
          curPreset
            .property("Custom 9")
            .setValuesAtTimes(timeArray, valueArray);
          for (var e = 1; e <= curPreset.property("Custom 9").numKeys; e += 1) {
            curPreset
              .property("Custom 9")
              .setInterpolationTypeAtKey(e, KeyframeInterpolationType.HOLD);
          }
        }
        progWin.pbProgressBar.value = 85;
        progWin.update();
        timeArray = [];
        valueArray = [];
        threshold = 0.5;
        above = false;
        var check = false;
        n = 100;
        timeArray = [];
        valueArray = [];
        for (
          var i = audioDummy.inPoint;
          i < audioDummy.outPoint + 2;
          i += baseComp.frameDuration
        ) {
          if (above) {
            if (output1.valueAtTime(i, true) < threshold) {
              above = false;
            }
          } else {
            if (output1.valueAtTime(i, true) >= threshold) {
              above = true;
              check = true;
              n = 0;
            }
          }
          if (check) {
            n += 0.3;
          }
          timeArray.push(i);
          valueArray.push(n);
        }
        curPreset.property("Custom 10").setValuesAtTimes(timeArray, valueArray);
        progWin.pbProgressBar.value = 100;
        progWin.update();
        progWin.close();
        baseComp.time = curTime;
        baseComp.duration = curDur;
        audioDummy.startTime = songStartTime;
        audioDummy.inPoint = songIn;
        audioDummy.outPoint = songOut;
        var rangeData = [freqStart, freqEnd, spectrumHeight];
        var rangePositionArray = [rangePosition[0], rangePosition[1]];
        var rangeScaleArray = [rangeScale[0], rangeScale[1]];
        curPreset.property("reactData1").setValue(rangeData);
        curPreset.property("reactData2").setValue(rangePositionArray);
        curPreset.property("reactData3").setValue(rangeScaleArray);
        writeLn('Baked profile: "' + curAudioProf + '"');
        updateAudio(100);
        selectAudio();
        audioDummy.selected = false;
        curPreset.selected = false;
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function cancelRevertComp() {
      try {
        var profName = "";
        var foundIt = false;
        process: for (var i = 1; i <= app.project.numItems; i += 1) {
          baseComp = app.project.item(i);
          if (baseComp instanceof CompItem && baseComp.name == curReactComp) {
            for (var j = 1; j <= baseComp.numLayers; j += 1) {
              if (baseComp.layer(j).hasAudio) {
                for (
                  var k = 1;
                  k <=
                  baseComp.layer(j).property("ADBE Effect Parade")
                    .numProperties;
                  k += 1
                ) {
                  effectName = baseComp
                    .layer(j)
                    .property("ADBE Effect Parade")
                    .property(k)
                    .name.split(" ");
                  if (
                    effectName[0] == "#ReactPro" ||
                    effectName[0] == "#FreqProfile"
                  ) {
                    for (var l = 2; l < 10; l += 1) {
                      if (effectName[l] === undefined) {
                        break;
                      } else {
                        if (l > 2) {
                          profName += " ";
                        }
                        profName += effectName[l];
                      }
                    }
                    if (profName == curAudioProf) {
                      foundIt = true;
                      audioDummy = baseComp.layer(j);
                      break process;
                    }
                    profName = "";
                  }
                }
              }
            }
          }
        }
        if (foundIt) {
          baseComp.openInViewer();
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function removeSpectrumControls() {
      try {
        var curWinSize = win.size;
        spectrumWin.visible = false;
        spectrumWin.maximumSize = [0, 0];
        mainWin.maximumSize = maxWindowSize;
        mainWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        win.layout.resize();
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function reactorControls() {
      try {
        if (audioBox.selection == null) {
          alert(
            "First select an audio profile you wish to react to in the FreqReact UI.",
          );
          return;
        }
        var curWinSize = win.size;
        curAudioProf = audioBox.selection.text;
        mainWin.visible = false;
        mainWin.maximumSize = [0, 0];
        reactorWin.maximumSize = maxWindowSize;
        reactorWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        scriptPalette.layout.layout(true);
        reactorWin.size = curWinSize;
        win.layout.resize();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function removeReactorControls() {
      var curWinSize = win.size;
      reactorWin.maximumSize = [0, 0];
      reactorWin.visible = false;
      mainWin.maximumSize = maxWindowSize;
      mainWin.visible = true;
      win.size = curWinSize;
      screenCheck();
      win.layout.resize();
    }
    function advancedControls() {
      try {
        selectedProfName = audioBox.selection.text;
        var curWinSize = win.size;
        curAudioProf = audioBox.selection.text;
        mainWin.visible = false;
        mainWin.maximumSize = [0, 0];
        advancedWin.maximumSize = maxWindowSize;
        advancedWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        scriptPalette.layout.layout(true);
        advancedWin.size = curWinSize;
        win.layout.resize();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function advDuplicate() {
      try {
        curComp = app.project.activeItem;
        selectedItem = advancedTree.selection;
        if (advancedTree.selection == null) {
          alert("You must first select a reactor to duplicate.");
          return;
        }
        if (selectedItem.text == "No reactors found.") {
          return;
        }
        app.executeCommand(2004);
        for (var z = 1; z <= curComp.numLayers; z += 1) {
          curComp.layer(z).selected = false;
        }
        if (advancedTree.selection.type == "node") {
          alert("Select a reactor to duplicate.");
          return;
        } else {
          for (var z = 1; z <= curComp.numLayers; z += 1) {
            curLayer = curComp.layer(z);
            if (curLayer.name == selectedItem.parent.text) {
              for (
                var m = 1;
                m <= curLayer.property("ADBE Effect Parade").numProperties;
                m += 1
              ) {
                curEffect = curLayer.property("ADBE Effect Parade").property(m);
                if (curEffect.name == selectedItem.text) {
                  curReactor = curEffect;
                  curReactor.selected = true;
                  break;
                }
              }
            }
          }
        }
        var nameSplit = curReactor.name.split(" | ");
        if (nameSplit.length > 3) {
          baseName = nameSplit[0] + " | " + nameSplit[1] + " | " + nameSplit[2];
          reactorCheck = reactorNameCheck(baseName);
          newName = baseName + " " + reactorCheck;
        }
        app.executeCommand(2080);
        var curParentName = selectedItem.parent.text;
        populateTree();
        for (var j = 0; j < advancedTree.items[0].items.length; j += 1) {
          if (advancedTree.items[0].items[j].text == curParentName) {
            advancedTree.items[0].items[j].expanded = true;
            break;
          }
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function populateTree() {
      try {
        var curComp = app.project.activeItem;
        var firstFound = false;
        var foundNone = true;
        if (curComp === null) {
          return;
        }
        advancedTree.removeAll();
        var mainNode = advancedTree.add("node", selectedProfName);
        for (var z = 1; z <= curComp.numLayers; z += 1) {
          curLayer = curComp.layer(z);
          if (
            curLayer instanceof AVLayer ||
            curLayer instanceof ShapeLayer ||
            curLayer instanceof TextLayer
          ) {
            for (
              var m = 1;
              m <= curLayer.property("ADBE Effect Parade").numProperties;
              m += 1
            ) {
              for (
                var n = 1;
                n <=
                curLayer.property("ADBE Effect Parade").property(m)
                  .numProperties;
                n += 1
              ) {
                curProp = curLayer.property("ADBE Effect Parade").property(m);
                if (curProp.property(n).name == "reactOutput") {
                  if (
                    curProp.property(n).expression.split("/*-")[2] ==
                    selectedProfName
                  ) {
                    if (!firstFound) {
                      curNode = mainNode.add("node", curLayer.name);
                      firstFound = true;
                      foundNone = false;
                      curNode.add("item", curProp.name);
                    } else {
                      curNode.add("item", curProp.name);
                    }
                  }
                }
              }
            }
          }
          firstFound = false;
        }
        if (foundNone) {
          mainNode.add("item", "No reactors found.");
        }
        mainNode.expanded = true;
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function advSearch() {
      try {
        var curComp = app.project.activeItem;
        app.executeCommand(2004);
        for (var z = 1; z <= curComp.numLayers; z += 1) {
          curComp.layer(z).selected = false;
        }
        if (advancedTree.selection == null) {
          alert("You must first select an item to search for.");
          return;
        }
        if (advancedTree.selection.type == "node") {
          selectedNode = advancedTree.selection;
          if (selectedNode.expanded == false) {
            selectedNode.expanded = true;
          } else {
            selectedNode.expanded = false;
          }
        } else {
          selectedItem = advancedTree.selection;
          firstTime = true;
          redo: for (var z = 1; z <= curComp.numLayers; z += 1) {
            curLayer = curComp.layer(z);
            if (
              curLayer instanceof AVLayer ||
              curLayer instanceof ShapeLayer ||
              curLayer instanceof TextLayer
            ) {
              if (curLayer.name == selectedItem.parent.text) {
                for (
                  var m = 1;
                  m <= curLayer.property("ADBE Effect Parade").numProperties;
                  m += 1
                ) {
                  curEffect = curLayer
                    .property("ADBE Effect Parade")
                    .property(m);
                  if (curEffect.name == selectedItem.text) {
                    if (firstTime) {
                      firstTime = false;
                      curEffect.selected = true;
                      app.executeCommand(18);
                      app.executeCommand(16);
                      z = 0;
                      continue;
                    }
                    curEffect.selected = true;
                  }
                }
              }
            }
          }
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function advTrash() {
      try {
        var curComp = app.project.activeItem;
        var nodeCheck = false;
        if (advancedTree.selection == null) {
          alert("You must first select an item to delete.");
          return;
        }
        if (advancedTree.selection.type == "node") {
          nodeCheck = true;
          selectedLayer = advancedTree.selection;
          reactorNames = advancedTree.selection.items;
        } else {
          selectedLayer = advancedTree.selection.parent;
          reactorNames = [];
          reactorNames.push(advancedTree.selection);
        }
        var confirmString = "";
        var count = 0;
        if (reactorNames.length >= 1) {
          for (var y = 0; y < reactorNames.length; y += 1) {
            if (count == 0) {
              count += 1;
              confirmString += reactorNames[y].text;
            } else {
              confirmString += "\n" + reactorNames[y].text;
            }
          }
          if (
            !confirm(
              "Are you sure you want to delete the following reactors?\n\n" +
                confirmString,
              true,
              "Alert",
            )
          ) {
            return;
          }
        }
        restartRemove: for (var z = 0; z < reactorNames.length; z += 1) {
          for (var l = 1; l <= curComp.numLayers; l += 1) {
            curLayer = curComp.layer(l);
            if (
              curLayer instanceof AVLayer ||
              curLayer instanceof ShapeLayer ||
              curLayer instanceof TextLayer
            ) {
              if (curLayer.name == selectedLayer.text) {
                for (
                  var k = 1;
                  k <= curLayer.property("ADBE Effect Parade").numProperties;
                  k += 1
                ) {
                  curEffect = curLayer
                    .property("ADBE Effect Parade")
                    .property(k);
                  effectName = curEffect.name;
                  if (effectName == reactorNames[z].text) {
                    curEffect.remove();
                    if (!nodeCheck) {
                      advancedTree.remove(advancedTree.selection);
                    }
                    continue restartRemove;
                  }
                }
                break;
              }
            }
          }
        }
        if (nodeCheck || selectedLayer.items.length < 1) {
          populateTree();
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function removeAdvControls() {
      try {
        var curWinSize = win.size;
        advancedWin.visible = false;
        advancedWin.maximumSize = [0, 0];
        mainWin.maximumSize = maxWindowSize;
        mainWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        win.layout.resize();
        var curWinSize = win.size;
        transferWin.visble = false;
        transferWin.maximumSize = [0, 0];
        transferWin.minimumSize = [0, 0];
        transferWin.margins = [0, 0, 0, 0];
        mainWin.maximumSize = maxWindowSize;
        mainWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        win.layout.resize();
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function transferControls() {
      try {
        var curString = audioBox.selection.text;
        if (curString.length >= 20) {
          curString = curString.slice(0, 17) + "...";
        }
        var curWinSize = win.size;
        mainWin.visible = false;
        mainWin.maximumSize = [0, 0];
        transferOptions.text = 'Profile "' + curString + '"';
        transferWin.maximumSize = maxWindowSize;
        transferWin.margins = [5, 5, 5, 5];
        transferWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        scriptPalette.layout.layout(true);
        transferWin.size = curWinSize;
        win.layout.resize();
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function populateSongList() {
      try {
        if (songDestination.items.length > 0) {
          while (songDestination.items.length > 0) {
            songDestination.remove(songDestination.items[0]);
          }
        }
        var curComp = app.project.activeItem;
        if (curComp === null) {
          return;
        }
        var curProfile = audioBox.selection.text;
        for (var j = 1; j <= curComp.numLayers; j += 1) {
          if (curComp.layer(j).hasAudio) {
            for (
              var k = 1;
              k <=
              curComp.layer(j).property("ADBE Effect Parade").numProperties;
              k += 1
            ) {
              effectName = curComp
                .layer(j)
                .property("ADBE Effect Parade")
                .property(k)
                .name.split(" ");
              if (
                effectName[0] == "#ReactPro" ||
                effectName[0] == "#FreqProfile"
              ) {
                profName = "";
                for (var l = 2; l < 10; l += 1) {
                  if (effectName[l] === undefined) {
                    break;
                  } else {
                    if (l > 2) {
                      profName += " ";
                    }
                    profName += effectName[l];
                  }
                }
                if (profName == curProfile) {
                  baseSong = curComp.layer(j).name;
                  break;
                }
              }
            }
          }
        }
        var foundIndex = false;
        for (var j = 1; j <= curComp.numLayers; j += 1) {
          if (curComp.layer(j).hasAudio) {
            songName = curComp.layer(j).name;
            if (songName != baseSong) {
              songDestination.add("item", songName);
              if (!foundIndex) {
                songDestination.selection = 0;
                foundIndex = true;
              }
            }
          }
        }
        if (!foundIndex) {
          songDestination.add("item", "No audio found");
          songDestination.selection = 0;
        }
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function swapProfiles() {
      try {
        if (
          songDestination.selection == null ||
          songDestination.selection == null
        ) {
          alert("Please select an audio layer to transfer to.");
          return;
        }
        if (baseSong == songDestination.selection.text) {
          alert(
            "Identical audio layers selected.\nPlease choose a unique layer in the second drop down.",
          );
          return;
        }
        var curComp = app.project.activeItem;
        if (curComp === null) {
          return;
        }
        app.executeCommand(2004);
        for (var j = 1; j <= curComp.numLayers; j += 1) {
          if (curComp.layer(j).hasAudio && curComp.layer(j).name == baseSong) {
            baseSongLayer = curComp.layer(j);
          }
        }
        for (var j = 1; j <= curComp.numLayers; j += 1) {
          if (
            curComp.layer(j).hasAudio &&
            curComp.layer(j).name == songDestination.selection.text
          ) {
            newSongLayer = curComp.layer(j);
          }
        }
        baseSongLayer.selected = true;
        for (
          var b = 1;
          b <= baseSongLayer.property("ADBE Effect Parade").numProperties;
          b += 1
        ) {
          if (
            baseSongLayer
              .property("ADBE Effect Parade")
              .property(b)
              .property("reactData1") !== null
          ) {
            effectName = baseSongLayer
              .property("ADBE Effect Parade")
              .property(b)
              .name.split(" ");
            if (
              effectName[0] == "#ReactPro" ||
              effectName[0] == "#FreqProfile"
            ) {
              profName = "";
              for (var l = 2; l < 10; l += 1) {
                if (effectName[l] === undefined) {
                  break;
                } else {
                  if (l > 2) {
                    profName += " ";
                  }
                  profName += effectName[l];
                }
              }
              if (profName == audioBox.selection.text) {
                baseSongLayer
                  .property("ADBE Effect Parade")
                  .property(b).selected = true;
                app.executeCommand(18);
                app.executeCommand(2004);
                baseSongLayer.selected = false;
                newSongLayer.selected = true;
                app.executeCommand(20);
                break;
              }
            }
          }
        }
        reactorExp();
        layerModeChange("fullLayer");
        if (bakeDropdown.selection == 0) {
          newSongLength = newSongLayer.source.duration;
          for (
            var b = 1;
            b <= newSongLayer.property("ADBE Effect Parade").numProperties;
            b += 1
          ) {
            if (
              newSongLayer
                .property("ADBE Effect Parade")
                .property(b)
                .property("reactData4") !== null
            ) {
              newSongLayer
                .property("ADBE Effect Parade")
                .property(b)
                .property("reactData4")
                .setValue([0, newSongLength]);
            }
          }
        }
        if (bakeDropdown.selection == 1) {
          altCheck = true;
        }
        curAudioProf = audioBox.selection.text;
        spectrumSetup();
        removeTransferControls();
        spectrumControls();
        altCheck = false;
        writeLn(
          'Swapped profiles from "' +
            baseSong +
            '"' +
            " to " +
            '"' +
            songDestination.selection.text +
            '"',
        );
      } catch (e) {
        alert(e.toString() + "\nError on line: " + e.line.toString());
      }
    }
    function removeTransferControls() {
      try {
        var curWinSize = win.size;
        transferWin.visble = false;
        transferWin.maximumSize = [0, 0];
        transferWin.minimumSize = [0, 0];
        transferWin.margins = [0, 0, 0, 0];
        mainWin.maximumSize = maxWindowSize;
        mainWin.visible = true;
        win.size = curWinSize;
        screenCheck();
        win.layout.resize();
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function screenCheck() {
      try {
        var winArray = [
          "mainWin",
          "addWin",
          "spectrumWin",
          "reactorWin",
          "advancedWin",
          "transferWin",
          "settingsWin",
        ];
        var curWin = "";
        for (var x = 0; x < 6; x += 1) {
          try {
            var curWinCheck = eval(winArray[x]);
          } catch (err) {
            win.layout.resize();
          }
          if (curWinCheck.visible) {
            curWin = winArray[x];
            break;
          }
        }
        if (curWin == "") {
          return;
        }
        switch (curWin) {
          case "mainWin":
            win.layout.resize();
            if (win.size.width < 220) {
              mainBtnGroup1.minimumSize.width = 50;
              mainBtnGroup1.maximumSize.width = 50;
              mainBtnGroup3.minimumSize.width = 50;
              mainBtnGroup3.maximumSize.width = 50;
            } else {
              mainBtnGroup1.minimumSize.width = 65;
              mainBtnGroup1.maximumSize.width = 65;
              mainBtnGroup3.minimumSize.width = 65;
              mainBtnGroup3.maximumSize.width = 65;
            }
            win.layout.resize();
            if (win.size.width < 200) {
              react1Group.visible = true;
              react1Group.maximumSize.width = 5000;
              react2Group.visible = false;
              react2Group.maximumSize.width = 0;
              react3Group.visible = false;
              react3Group.maximumSize.width = 0;
              react4Group.visible = false;
              react4Group.maximumSize.width = 0;
            }
            if (win.size.width >= 200 && win.size.width < 275) {
              react2Group.visible = true;
              react2Group.maximumSize.width = 5000;
              react1Group.visible = false;
              react1Group.maximumSize.width = 0;
              react3Group.visible = false;
              react3Group.maximumSize.width = 0;
              react4Group.visible = false;
              react4Group.maximumSize.width = 0;
            }
            if (win.size.width >= 275 && win.size.width < 335) {
              react3Group.visible = true;
              react3Group.maximumSize.width = 5000;
              react1Group.visible = false;
              react1Group.maximumSize.width = 0;
              react2Group.visible = false;
              react2Group.maximumSize.width = 0;
              react4Group.visible = false;
              react4Group.maximumSize.width = 0;
            }
            if (win.size.width >= 335) {
              react4Group.visible = true;
              react4Group.maximumSize.width = 5000;
              react1Group.visible = false;
              react1Group.maximumSize.width = 0;
              react2Group.visible = false;
              react2Group.maximumSize.width = 0;
              react3Group.visible = false;
              react3Group.maximumSize.width = 0;
            }
            win.layout.resize();
            break;
          case "addWin":
            win.layout.resize();
            var marginWidth = addOptions.size.width / 15;
            var marginHeight = addOptions.size.height / 5;
            if (addWin.size.height < 150) {
              addOptions.margins = [marginWidth, 10, marginWidth, 10];
            } else {
              addOptions.margins = [
                marginWidth,
                marginHeight,
                marginWidth,
                marginHeight,
              ];
            }
            if (createBackGroup.size.width <= 180) {
              addBackPanel.alignment = ["right", "fill"];
              addBackPanel.minimumSize.width = 40;
              addBackPanel.maximumSize.width = 40;
            }
            if (
              createBackGroup.size.width < 200 &&
              createBackGroup.size.width > 10
            ) {
              addBackPanel.alignment = ["right", "fill"];
              addBackPanel.minimumSize.width = 60;
              addBackPanel.maximumSize.width = 60;
            } else {
              addBackPanel.alignment = ["right", "fill"];
              addBackPanel.minimumSize.width = 80;
              addBackPanel.maximumSize.width = 80;
            }
            win.layout.resize();
            break;
          case "spectrumWin":
            namePresetPanel.spacing = namePresetPanel.size.height / 10;
            if (scriptPalette.size.height < 160) {
              bakeTrashGroup.minimumSize.height = 50;
              bakeTrashGroup.maximumSize.height = 50;
              spectrumBackPanel.minimumSize.height = 50;
              spectrumBackPanel.maximumSize.height = 50;
              namePresetPanel.spacing = 3;
              presetGroup.minimumSize.height = 28;
              presetGroup.maximumSize.height = 28;
              editNameGroup.minimumSize.height = 28;
              editNameGroup.maximumSize.height = 28;
            }
            if (
              scriptPalette.size.height >= 160 &&
              scriptPalette.size.height < 200
            ) {
              bakeTrashGroup.minimumSize.height = 50;
              bakeTrashGroup.maximumSize.height = 50;
              spectrumBackPanel.minimumSize.height = 50;
              spectrumBackPanel.maximumSize.height = 50;
              namePresetPanel.spacing = namePresetPanel.size.height / 10;
              presetGroup.minimumSize.height = 35;
              presetGroup.maximumSize.height = 35;
              editNameGroup.minimumSize.height = 35;
              editNameGroup.maximumSize.height = 35;
            }
            if (
              scriptPalette.size.height >= 200 &&
              scriptPalette.size.height < 250
            ) {
              bakeTrashGroup.minimumSize.height = 80;
              bakeTrashGroup.maximumSize.height = 80;
              spectrumBackPanel.minimumSize.height = 80;
              spectrumBackPanel.maximumSize.height = 80;
              presetGroup.minimumSize.height = 40;
              presetGroup.maximumSize.height = 40;
              editNameGroup.minimumSize.height = 40;
              editNameGroup.maximumSize.height = 40;
            } else {
              bakeTrashGroup.minimumSize.height = 100;
              bakeTrashGroup.maximumSize.height = 100;
              spectrumBackPanel.minimumSize.height = 100;
              spectrumBackPanel.maximumSize.height = 100;
              presetGroup.minimumSize.height = 55;
              presetGroup.maximumSize.height = 55;
              editNameGroup.minimumSize.height = 55;
              editNameGroup.maximumSize.height = 55;
            }
            win.layout.resize();
            var foundSize = false;
            if (scriptPalette.size.width >= 345) {
              foundSize = true;
              bakeTextBtn.maximumSize.width = 0;
              bakeTextBtn.visible = false;
              bakeBtn.maximumSize.width = 1000;
              bakeBtn.visible = true;
              spectrumTrashPanel.minimumSize.width = 100;
              spectrumTrashPanel.maximumSize.width = 100;
              spectrumRightGroup.minimumSize.width = 100;
              spectrumRightGroup.maximumSize.width = 100;
            }
            if (win.size.width >= 250 && !foundSize) {
              foundSize = true;
              bakeTextBtn.maximumSize.width = 0;
              bakeTextBtn.visible = false;
              bakeBtn.maximumSize.width = 1000;
              bakeBtn.visible = true;
              spectrumTrashPanel.minimumSize.width = 70;
              spectrumTrashPanel.maximumSize.width = 70;
              spectrumRightGroup.minimumSize.width = 70;
              spectrumRightGroup.maximumSize.width = 70;
            }
            if (!foundSize) {
              bakeBtn.maximumSize.width = 0;
              bakeBtn.visible = false;
              bakeTextBtn.maximumSize.width = 1000;
              bakeTextBtn.visible = true;
              spectrumTrashPanel.minimumSize.width = 50;
              spectrumTrashPanel.maximumSize.width = 50;
              spectrumRightGroup.minimumSize.width = 50;
              spectrumRightGroup.maximumSize.width = 50;
            }
            win.layout.resize();
            break;
          case "reactorWin":
            win.layout.resize();
            break;
          case "advancedWin":
            win.layout.resize();
            if (win.size.height > 200) {
              advBtnGroup.alignment = ["fill", "bottom"];
              advBtnGroup.minimumSize.height = 65;
              advBtnGroup.maximumSize.height = 65;
            } else {
              advBtnGroup.alignment = ["fill", "bottom"];
              advBtnGroup.minimumSize.height = 45;
              advBtnGroup.maximumSize.height = 45;
            }
            win.layout.resize();
            break;
          case "transferWin":
            win.layout.resize();
            var marginWidth = transferOptions.size.width / 15;
            var marginHeight = transferOptions.size.height / 5;
            if (transferOptions.size.height < 80) {
              transferOptions.margins = [marginWidth, 10, marginWidth, 10];
            } else {
              transferOptions.margins = [
                marginWidth,
                marginHeight,
                marginWidth,
                marginHeight,
              ];
            }
            if (transferBackGroup.size.width <= 180) {
              backPanel.alignment = ["right", "fill"];
              backPanel.minimumSize.width = 40;
              backPanel.maximumSize.width = 40;
            }
            if (
              transferBackGroup.size.width < 200 &&
              transferBackGroup.size.width > 10
            ) {
              backPanel.alignment = ["right", "fill"];
              backPanel.minimumSize.width = 60;
              backPanel.maximumSize.width = 60;
            } else {
              backPanel.alignment = ["right", "fill"];
              backPanel.minimumSize.width = 80;
              backPanel.maximumSize.width = 80;
            }
            win.layout.resize();
            break;
        }
      } catch (err) {
        alert(
          err.name +
            "\nLine: " +
            err.line.toString() +
            "\nMessage: " +
            err.message,
        );
      }
    }
    function storeCurComp() {
      try {
        curReactComp = app.project.activeItem.name;
      } catch (err) {
        curReactComp = "";
      }
    }
    var win =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", scriptName + " v" + scriptVersion, undefined, {
            resizeable: true,
          });
    win.alignment = ["fill", "fill"];
    win.alignChildren = ["fill", "fill"];
    win.margins = 0;
    win.spacing = 0;
    mainWin = win.add("group");
    mainWin.alignChildren = ["fill", "fill"];
    mainWin.orientation = "column";
    mainWin.maximumSize = maxWindowSize;
    mainWin.spacing = 0;
    mainWin.margins = 0;
    var mainTop = mainWin.add("group");
    mainTop.alignChildren = ["fill", "fill"];
    mainTop.orientation = "row";
    mainTop.spacing = 0;
    mainTop.margins = 0;
    mainTop.minimumSize.height = 90;
    var mainBtnGroup1 = mainTop.add("group");
    mainBtnGroup1.orientation = "column";
    mainBtnGroup1.alignment = ["left", "fill"];
    mainBtnGroup1.alignChildren = ["fill", "fill"];
    mainBtnGroup1.spacing = 0;
    mainBtnGroup1.margins = 0;
    var addBtn = mainBtnGroup1.add("iconButton", undefined, File(addIcon), {
      style: "toolbutton",
    });
    addBtn.helpTip = "Create a new profile.";
    var refreshBtn = mainBtnGroup1.add(
      "iconButton",
      undefined,
      File(refreshIcon),
      { style: "toolbutton" },
    );
    refreshBtn.helpTip = "Refresh FreqReact UI and components.";
    var mainBtnGroup2 = mainTop.add("group");
    mainBtnGroup2.orientation = "column";
    mainBtnGroup2.alignChildren = ["fill", "fill"];
    mainBtnGroup2.minimumSize.width = 80;
    mainBtnGroup2.spacing = 0;
    mainBtnGroup2.margins = [0, 6, 0, 0];
    var audioBox = mainBtnGroup2.add("listbox", undefined);
    audioBox.helpTip = "Existing profiles. Double Click to edit.";
    audioBox.alignment = ["fill", "fill"];
    var mainBtnGroup3 = mainTop.add("group");
    mainBtnGroup3.orientation = "column";
    mainBtnGroup3.alignment = ["right", "fill"];
    mainBtnGroup3.alignChildren = ["fill", "fill"];
    mainBtnGroup3.spacing = 0;
    mainBtnGroup3.margins = 0;
    var advancedBtn = mainBtnGroup3.add(
      "iconButton",
      undefined,
      File(advancedIcon),
      { style: "toolbutton" },
    );
    advancedBtn.helpTip = "Enter advanced profile view.";
    var convertBtn = mainBtnGroup3.add(
      "iconButton",
      undefined,
      File(convertIcon),
      { style: "toolbutton" },
    );
    convertBtn.helpTip = "Transfer profile to new audio source.";
    var mainBottom = mainWin.add("group");
    mainBottom.alignChildren = ["fill", "fill"];
    mainBottom.orientation = "row";
    mainBottom.spacing = 0;
    mainBottom.margins = 0;
    mainBottom.minimumSize.height = 50;
    mainBottom.maximumSize.height = 80;
    mainBottom.minimumSize.width = 185;
    var reactContainer = mainBottom.add("group");
    reactContainer.orientation = "row";
    reactContainer.alignChildren = ["fill", "fill"];
    reactContainer.spacing = 0;
    reactContainer.margins = 0;
    var react1Group = reactContainer.add("group");
    react1Group.alignChildren = ["fill", "fill"];
    react1Group.spacing = 0;
    react1Group.margins = 0;
    var react1Btn = react1Group.add("iconButton", undefined, File(react1Icon), {
      style: "toolbutton",
    });
    var react2Group = reactContainer.add("group");
    react2Group.alignment = ["fill", "fill"];
    react2Group.alignChildren = ["fill", "fill"];
    react2Group.spacing = 0;
    react2Group.margins = 0;
    react2Group.maximumSize.width = 0;
    react2Group.visible = false;
    var react2Btn = react2Group.add("iconButton", undefined, File(react2Icon), {
      style: "toolbutton",
    });
    var react3Group = reactContainer.add("group");
    react3Group.alignment = ["fill", "fill"];
    react3Group.alignChildren = ["fill", "fill"];
    react3Group.spacing = 0;
    react3Group.margins = 0;
    react3Group.maximumSize.width = 0;
    react3Group.visible = false;
    var react3Btn = react3Group.add("iconButton", undefined, File(react3Icon), {
      style: "toolbutton",
    });
    var react4Group = reactContainer.add("group");
    react4Group.alignment = ["fill", "fill"];
    react4Group.alignChildren = ["fill", "fill"];
    react4Group.spacing = 0;
    react4Group.margins = 0;
    react4Group.maximumSize.width = 0;
    react4Group.visible = false;
    var react4Btn = react4Group.add("iconButton", undefined, File(react4Icon), {
      style: "toolbutton",
    });
    reactorWin = win.add("group");
    reactorWin.visible = false;
    reactorWin.maximumSize = [0, 0];
    reactorWin.alignChildren = ["fill", "fill"];
    reactorWin.orientation = "row";
    reactorWin.spacing = 0;
    reactorWin.margins = 0;
    var reactorBtnGroup1 = reactorWin.add("group");
    reactorBtnGroup1.orientation = "column";
    reactorBtnGroup1.alignChildren = ["fill", "fill"];
    reactorBtnGroup1.spacing = 0;
    reactorBtnGroup1.margins = 0;
    reactorBtnGroup1.minimumSize.width = 60;
    reactorBtnGroup1.minimumSize.height = 135;
    var pulseBtn = reactorBtnGroup1.add(
      "iconButton",
      undefined,
      File(pulseIcon),
      { style: "toolbutton" },
    );
    var oscBtn = reactorBtnGroup1.add("iconButton", undefined, File(oscIcon), {
      style: "toolbutton",
    });
    var flickerBtn = reactorBtnGroup1.add(
      "iconButton",
      undefined,
      File(flickerIcon),
      { style: "toolbutton" },
    );
    var reactorBtnGroup2 = reactorWin.add("group");
    reactorBtnGroup2.orientation = "column";
    reactorBtnGroup2.alignChildren = ["fill", "fill"];
    reactorBtnGroup2.spacing = 0;
    reactorBtnGroup2.margins = 0;
    reactorBtnGroup2.minimumSize.width = 60;
    reactorBtnGroup2.minimumSize.height = 135;
    var elasticBtn = reactorBtnGroup2.add(
      "iconButton",
      undefined,
      File(elasticIcon),
      { style: "toolbutton" },
    );
    var switchBtn = reactorBtnGroup2.add(
      "iconButton",
      undefined,
      File(switchIcon),
      { style: "toolbutton" },
    );
    var wiggleBtn = reactorBtnGroup2.add(
      "iconButton",
      undefined,
      File(wiggleIcon),
      { style: "toolbutton" },
    );
    var reactorBtnGroup3 = reactorWin.add("group");
    reactorBtnGroup3.orientation = "column";
    reactorBtnGroup3.alignChildren = ["fill", "fill"];
    reactorBtnGroup3.spacing = 0;
    reactorBtnGroup3.margins = 0;
    reactorBtnGroup3.minimumSize.width = 60;
    reactorBtnGroup3.minimumSize.height = 135;
    var stepsBtn = reactorBtnGroup3.add(
      "iconButton",
      undefined,
      File(stepsIcon),
      { style: "toolbutton" },
    );
    var triggerBtn = reactorBtnGroup3.add(
      "iconButton",
      undefined,
      File(triggerIcon),
      { style: "toolbutton" },
    );
    var reactorBackBtn = reactorBtnGroup3.add(
      "iconButton",
      undefined,
      File(reactorBackIcon),
      { style: "toolbutton" },
    );
    reactorBackBtn.helpTip = "Go back.";
    addWin = win.add("group");
    addWin.visible = false;
    addWin.maximumSize = [0, 0];
    addWin.alignChildren = ["fill", "fill"];
    addWin.orientation = "column";
    addWin.spacing = 0;
    addWin.margins = 0;
    var addOptions = addWin.add("panel", undefined, "New React Profile");
    addOptions.orientation = "column";
    addOptions.alignment = ["fill", "fill"];
    addOptions.alignChildren = ["fill", "fill"];
    addOptions.spacing = 5;
    addOptions.maximumSize.width = maxWindowSize[0];
    addOptions.minimumSize.height = 85;
    addOptions.margins = [5, 10, 5, 10];
    var profileTextGroup = addOptions.add("group");
    profileTextGroup.orientation = "row";
    profileTextGroup.alignChildren = ["fill", "fill"];
    profileTextGroup.spacing = 3;
    profileTextGroup.maximumSize.height = 50;
    profileTextGroup.minimumSize.height = 25;
    var profileStaticText = profileTextGroup.add(
      "statictext",
      undefined,
      "Prof Name",
    );
    profileStaticText.alignment = ["left", "fill"];
    var profileText = profileTextGroup.add(
      "EditText { properties:{multiline:false, readonly:false}, text:\'\'} ",
    );
    profileText.alignment = ["fill", "fill"];
    profileText.minimumSize.width = 85;
    profileText.helpTip = "Give your profile a unique name.";
    var profDropdownGroup = addOptions.add("group");
    profDropdownGroup.orientation = "row";
    profDropdownGroup.alignChildren = ["fill", "fill"];
    profDropdownGroup.spacing = 3;
    profDropdownGroup.maximumSize.height = 50;
    profDropdownGroup.minimumSize.height = 25;
    var destinationText = profDropdownGroup.add(
      "statictext",
      undefined,
      "Bake Mode",
    );
    destinationText.alignment = ["left", "fill"];
    var profBakeDropdown = profDropdownGroup.add("dropdownlist", undefined, [
      "Full Layer",
      "Work Area",
    ]);
    profBakeDropdown.minimumSize.width = 85;
    profBakeDropdown.selection = 0;
    profBakeDropdown.helpTip =
      "Full layer: Profile will be entire length of selected layer.\nWork Area: Profile will be the length of comp work area.";
    var createBackGroup = addWin.add("group");
    createBackGroup.orientation = "row";
    createBackGroup.alignChildren = ["fill", "fill"];
    createBackGroup.spacing = 0;
    createBackGroup.margins = 0;
    createBackGroup.minimumSize.height = 50;
    createBackGroup.minimumSize.width = 165;
    var createPanel = createBackGroup.add("panel");
    createPanel.alignChildren = ["fill", "fill"];
    createPanel.margins = 0;
    var createBtn = createPanel.add("iconButton", undefined, File(createIcon), {
      style: "toolbutton",
    });
    createBtn.helpTip = "Create new profile and enter into FreqView.";
    var addBackPanel = createBackGroup.add("panel");
    addBackPanel.alignChildren = ["fill", "fill"];
    addBackPanel.margins = 0;
    var addBackBtn = addBackPanel.add(
      "iconButton",
      undefined,
      File(anotherBackIcon),
      { style: "toolbutton" },
    );
    addBackBtn.helpTip = "Go back.";
    var spectrumWin = win.add("group");
    spectrumWin.visible = false;
    spectrumWin.spacing = 5;
    spectrumWin.alignChildren = ["fill", "fill"];
    spectrumWin.margins = 0;
    spectrumWin.spacing = 0;
    spectrumWin.maximumSize = [0, 0];
    spectrumWin.orientation = "row";
    var spectrumLeftGroup = spectrumWin.add("group");
    spectrumLeftGroup.orientation = "column";
    spectrumLeftGroup.margins = 0;
    spectrumLeftGroup.spacing = 0;
    spectrumLeftGroup.minimumSize.width = 130;
    spectrumLeftGroup.minimumSize.height = 80;
    spectrumLeftGroup.alignChildren = ["fill", "fill"];
    var namePresetPanel = spectrumLeftGroup.add("panel");
    namePresetPanel.orientation = "column";
    namePresetPanel.alignment = ["fill", "fill"];
    namePresetPanel.alignChildren = ["fill", "middle"];
    namePresetPanel.spacing = 5;
    namePresetPanel.minimumSize.height = 80;
    var editNameGroup = namePresetPanel.add("group");
    editNameGroup.orientation = "row";
    editNameGroup.alignChildren = ["fill", "fill"];
    editNameGroup.spacing = 3;
    editNameGroup.maximumSize.height = 50;
    var editNameStatic = editNameGroup.add("statictext", undefined, "Name");
    editNameStatic.alignment = ["left", "fill"];
    editNameStatic.helpTip = "Edit profile name.";
    var spectrumProfileText = editNameGroup.add(
      "edittext",
      undefined,
      "Audio 1",
    );
    spectrumProfileText.minimumSize.width = 65;
    spectrumProfileText.helpTip = "Edit profile name.";
    var presetGroup = namePresetPanel.add("group");
    presetGroup.orientation = "row";
    presetGroup.alignChildren = ["fill", "fill"];
    presetGroup.spacing = 3;
    presetGroup.maximumSize.height = 50;
    var presetText = presetGroup.add("statictext", undefined, "Preset");
    presetText.alignment = ["left", "fill"];
    presetText.helpTip = "Select range preset for spectrum viewer.";
    var presetDD = presetGroup.add("dropdownlist", undefined, presetList);
    presetDD.selection = 1;
    presetDD.minimumSize.width = 65;
    presetDD.helpTip = "Select range preset for spectrum viewer.";
    var freqGroup = spectrumWin.add("group");
    freqGroup.alignment = ["fill", "fill"];
    freqGroup.margins = 0;
    freqGroup.orientation = "row";
    freqGroup.spacing = 5;
    freqGroup.maximumSize = [0, 0];
    var freqBox1 = freqGroup.add(
      "EditText { properties:{multiline:false, readonly:false}, text:\'1\', justify:\'center\' } ",
    );
    freqBox1.helpTip = "Bottom frequency for spectrum viewer in Hz.";
    freqBox1.alignment = ["left", "middle"];
    freqBox1.minimumSize.width = 60;
    freqBox1.maximumSize.width = 60;
    freqBox1.margins = 0;
    var midHyphen = freqGroup.add("statictext", undefined, "-");
    midHyphen.alignment = ["middle", "middle"];
    midHyphen.minimumSize.width = 0;
    var freqBox2 = freqGroup.add(
      "EditText { properties:{multiline:false, readonly:false}, text:\'250\', justify:\'center\' } ",
    );
    freqBox2.helpTip = "Top frequency for spectrum viewer in Hz.";
    freqBox2.alignment = ["right", "middle"];
    freqBox2.minimumSize.width = 60;
    freqBox2.maximumSize.width = 60;
    freqBox2.margins = 0;
    heightBox = freqGroup.add("EditText", undefined, "15000");
    heightBox.minimumSize = [0, 0];
    heightBox.maximumSize = [0, 0];
    heightBox.visible = false;
    var bakeTrashGroup = spectrumLeftGroup.add("group");
    bakeTrashGroup.alignment = ["fill", "bottom"];
    bakeTrashGroup.alignChildren = ["fill", "fill"];
    bakeTrashGroup.spacing = 0;
    bakeTrashGroup.margins = 0;
    var bakePanel = bakeTrashGroup.add("panel");
    bakePanel.orientation = "row";
    bakePanel.margins = 0;
    bakePanel.spacing = 0;
    var bakeBtn = bakePanel.add("iconButton", undefined, File(bakeIcon), {
      style: "toolbutton",
    });
    bakeBtn.alignment = ["fill", "fill"];
    bakeBtn.helpTip = "Bake profile. This may take some time.";
    var bakeTextBtn = bakePanel.add(
      "iconButton",
      undefined,
      File(bakeTextIcon),
      { style: "toolbutton" },
    );
    bakeTextBtn.alignment = ["fill", "fill"];
    bakeTextBtn.helpTip = "Bake profile. This may take some time.";
    var spectrumTrashPanel = bakeTrashGroup.add("panel");
    spectrumTrashPanel.margins = 0;
    spectrumTrashPanel.alignment = ["right", "fill"];
    var spectrumTrashBtn = spectrumTrashPanel.add(
      "iconButton",
      undefined,
      File(editTrashIcon),
      { style: "toolbutton" },
    );
    spectrumTrashBtn.alignment = ["fill", "fill"];
    spectrumTrashBtn.helpTip =
      "Remove this profile and delete any attached reactors.";
    var spectrumRightGroup = spectrumWin.add("group");
    spectrumRightGroup.alignment = ["right", "fill"];
    spectrumRightGroup.alignChildren = ["fill", "fill"];
    spectrumRightGroup.orientation = "column";
    spectrumRightGroup.spacing = 0;
    spectrumRightGroup.minimumSize.height = 130;
    var heightUpPanel = spectrumRightGroup.add("panel");
    heightUpPanel.margins = 0;
    var heightUpBtn = heightUpPanel.add(
      "iconButton",
      undefined,
      File(heightUpIcon),
      { style: "toolbutton" },
    );
    heightUpBtn.alignment = ["fill", "fill"];
    heightUpBtn.helpTip =
      "Increase frequency band height.\nShift-click: Large increment up.\nControl-Click: Small increment up.";
    var heightDownPanel = spectrumRightGroup.add("panel");
    heightDownPanel.margins = 0;
    var heightDownBtn = heightDownPanel.add(
      "iconButton",
      undefined,
      File(heightDownIcon),
      { style: "toolbutton" },
    );
    heightDownBtn.alignment = ["fill", "fill"];
    heightDownBtn.helpTip =
      "Decrease frequency band height.\nShift-click: Large increment down.\nControl-Click: Small increment down.";
    var spectrumBackPanel = spectrumRightGroup.add("panel");
    spectrumBackPanel.margins = 0;
    spectrumBackPanel.alignment = ["fill", "bottom"];
    spectrumBackPanel.alignChildren = ["fill", "fill"];
    spectrumBackPanel.minimumSize.height = 50;
    spectrumBackPanel.maximumSize.height = 50;
    var spectrumBackBtn = spectrumBackPanel.add(
      "iconButton",
      undefined,
      File(editBackIcon),
      { style: "toolbutton" },
    );
    spectrumBackBtn.helpTip = "Go back.";
    var advancedWin = win.add("group");
    advancedWin.visible = false;
    advancedWin.margins = 0;
    advancedWin.spacing = 0;
    advancedWin.alignChildren = ["fill", "fill"];
    advancedWin.maximumSize = [0, 0];
    advancedWin.orientation = "column";
    var treeGroup = advancedWin.add("group");
    treeGroup.margins = [7, 7, 7, 0];
    treeGroup.alignChildren = ["fill", "fill"];
    treeGroup.minimumSize.width = 180;
    treeGroup.minimumSize.height = 75;
    var advancedTree = treeGroup.add("treeview");
    var advBtnGroup = advancedWin.add("group");
    advBtnGroup.minimumSize.height = 35;
    advBtnGroup.alignment = ["fill", "fill"];
    advBtnGroup.spacing = 0;
    advBtnGroup.alignChildren = ["fill", "fill"];
    advSearchBtn = advBtnGroup.add(
      "iconButton",
      undefined,
      File(advSearchIcon),
      { style: "toolbutton" },
    );
    advSearchBtn.minimumSize.width = 20;
    advSearchBtn.helpTip = "Reveal the selected reactor in the effect panel.";
    advDuplicateBtn = advBtnGroup.add(
      "iconButton",
      undefined,
      File(advDuplicateIcon),
      { style: "toolbutton" },
    );
    advDuplicateBtn.minimumSize.width = 20;
    advDuplicateBtn.helpTip = "Duplicate the selected reactor.";
    advTrashBtn = advBtnGroup.add(
      "iconButton",
      undefined,
      File(advDeleteIcon),
      { style: "toolbutton" },
    );
    advTrashBtn.minimumSize.width = 20;
    advTrashBtn.helpTip = "Delete the selected reactor(s).";
    advBackBtn = advBtnGroup.add("iconButton", undefined, File(advBackIcon), {
      style: "toolbutton",
    });
    advBackBtn.minimumSize.width = 20;
    advBackBtn.helpTip = "Go back.";
    transferWin = win.add("group");
    transferWin.visible = false;
    transferWin.maximumSize = [0, 0];
    transferWin.alignChildren = ["fill", "fill"];
    transferWin.orientation = "column";
    transferWin.spacing = 0;
    transferWin.margins = 0;
    var transferOptions = transferWin.add("panel", undefined, "Transfer to:");
    transferOptions.orientation = "column";
    transferOptions.alignment = ["fill", "fill"];
    transferOptions.alignChildren = ["fill", "fill"];
    transferOptions.spacing = 5;
    transferOptions.maximumSize.width = maxWindowSize[0];
    transferOptions.minimumSize.height = 75;
    transferOptions.margins = [5, 10, 5, 10];
    var destinationGroup = transferOptions.add("group");
    destinationGroup.orientation = "row";
    destinationGroup.alignChildren = ["fill", "fill"];
    destinationGroup.spacing = 3;
    destinationGroup.maximumSize.height = 50;
    var destinationText = destinationGroup.add(
      "statictext",
      undefined,
      "New Audio",
    );
    destinationText.alignment = ["left", "fill"];
    destinationText.helpTip =
      "Choose a new audio layer that the profile will be transferred to.";
    var songDestination = destinationGroup.add("dropdownlist", undefined, [
      "No audio found",
    ]);
    songDestination.minimumSize.width = 85;
    songDestination.helpTip =
      "Choose a new audio layer that the profile will be transferred to.";
    var bakeDropdownGroup = transferOptions.add("group");
    bakeDropdownGroup.orientation = "row";
    bakeDropdownGroup.alignChildren = ["fill", "fill"];
    bakeDropdownGroup.spacing = 3;
    bakeDropdownGroup.maximumSize.height = 50;
    var bakeDropdownText = bakeDropdownGroup.add(
      "statictext",
      undefined,
      "Bake Mode",
    );
    bakeDropdownText.alignment = ["left", "fill"];
    bakeDropdownText.helpTip =
      "Full layer: Profile will be entire length of new audio layer.\nWork Area: Profile will be the length of comp work area.";
    var bakeDropdown = bakeDropdownGroup.add("dropdownlist", undefined, [
      "Full Layer",
      "Work Area",
    ]);
    bakeDropdown.minimumSize.width = 85;
    bakeDropdown.maximumSize.height = 50;
    bakeDropdown.selection = 0;
    bakeDropdown.helpTip =
      "Full layer: Profile will be entire length of new audio layer.\nWork Area: Profile will be the length of comp work area.";
    var transferBackGroup = transferWin.add("group");
    transferBackGroup.orientation = "row";
    transferBackGroup.alignChildren = ["fill", "fill"];
    transferBackGroup.spacing = 0;
    transferBackGroup.margins = 0;
    transferBackGroup.minimumSize.height = 50;
    transferBackGroup.minimumSize.width = 165;
    var transferPanel = transferBackGroup.add("panel");
    transferPanel.alignChildren = ["fill", "fill"];
    transferPanel.margins = 0;
    var transferBtn = transferPanel.add(
      "iconButton",
      undefined,
      File(transferIcon),
      { style: "toolbutton" },
    );
    transferPanel.helpTip = "Transfer profile and enter FreqView.";
    var backPanel = transferBackGroup.add("panel");
    backPanel.alignChildren = ["fill", "fill"];
    backPanel.margins = 0;
    var transferBackBtn = backPanel.add(
      "iconButton",
      undefined,
      File(anotherBackIcon),
      { style: "toolbutton" },
    );
    transferBackBtn.helpTip = "Go back.";
    var audioTemp = "";
    var curAudioProf = "";
    var curReactComp = "";
    var profileCheck = false;
    var prevSpectrumStart = 0;
    var prevSpectrumEnd = 0;
    var prevSpectrumHeight = 0;
    var mouseOver = false;
    var layerMode = true;
    var workMode = false;
    var loadCount = 0;
    var unsupported = false;
    win.layout.layout(true);
    storeCurComp();
    updateAudio();
    removeReactFolder();
    try {
      if (audioBox.children[0].exists) {
        audioBox.children[0].selected = true;
      }
    } catch (err) {}
    var activeCheck = false;
    var os = $.os.toLowerCase();
    if (os.indexOf("windows") == 0) {
      freqBox1.onActivate = function () {
        activeCheck = true;
      };
      freqBox1.onDeactivate = function () {
        activeCheck = false;
      };
      freqBox2.onActivate = function () {
        activeCheck = true;
      };
      freqBox2.onDeactivate = function () {
        activeCheck = false;
      };
    }
    win.onResizing = win.onResize = function () {
      screenCheck();
      if (loadCount < 5) {
        var curWinSize = scriptPalette.size;
        screenCheck();
        scriptPalette.layout.layout(true);
        mainWin.size = curWinSize;
        win.layout.resize();
        loadCount += 1;
      }
    };
    addBtn.onClick = function () {
      addControls();
      screenHack();
      screenCheck();
    };
    audioBox.onDoubleClick = function () {
      if (audioBox.selection !== null) {
        altCheck = false;
        var keyState = ScriptUI.environment.keyboardState;
        if (keyState.altKey) {
          altCheck = true;
        }
        if (keyState.ctrlKey) {
          app.beginUndoGroup(
            'Advanced Controls: "' + audioBox.selection.text + '"',
          );
          advancedControls();
          populateTree();
          app.endUndoGroup();
        } else {
          app.beginUndoGroup('Edit Range: "' + audioBox.selection.text + '"');
          storeCurComp();
          removeReactFolder();
          spectrumControls();
          spectrumSetup();
          updateRangeText();
          updateHeightText();
          app.endUndoGroup();
        }
      }
    };
    refreshBtn.onClick = function () {
      app.beginUndoGroup("React Refresh");
      var keyState = ScriptUI.environment.keyboardState;
      if (keyState.ctrlKey) {
        transferControls();
        populateProfileList();
        populateSongList();
      }
      storeCurComp();
      updateAudio();
      reactA(true, false);
      reactorExp();
      removeReactFolder();
      reselectComp();
      app.endUndoGroup();
    };
    advancedBtn.onClick = function () {
      if (audioBox.selection == null) {
        alert(
          "To enter Advanced View, you must first have a profile selected in the FreqReact UI.",
        );
      } else {
        app.beginUndoGroup(
          'Advanced Controls: "' + audioBox.selection.text + '"',
        );
        advancedControls();
        populateTree();
        app.endUndoGroup();
      }
    };
    convertBtn.onClick = function () {
      if (audioBox.selection == null) {
        alert(
          "To transfer a profile, you must first have a profile selected in the FreqReact UI.",
        );
      } else {
        transferControls();
        populateSongList();
      }
    };
    react1Btn.onClick = function () {
      reactorControls();
    };
    react2Btn.onClick = function () {
      reactorControls();
    };
    react3Btn.onClick = function () {
      reactorControls();
    };
    react4Btn.onClick = function () {
      reactorControls();
    };
    win.addEventListener("mouseover", function () {
      try {
        if (
          curReactComp != app.project.activeItem.name &&
          app.project.activeItem.name != "Edit React Profile"
        ) {
          storeCurComp();
          updateAudio();
        }
        if (spectrumWin.visible) {
          updateRangeText();
          updateHeightText();
        }
      } catch (err) {}
    });
    pulseBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Pulse");
      addReactor("Pulse");
      app.endUndoGroup();
    };
    elasticBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Elastic");
      addReactor("Elastic");
      app.endUndoGroup();
    };
    stepsBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Steps");
      addReactor("Steps");
      app.endUndoGroup();
    };
    oscBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Oscillate");
      addReactor("Oscillate");
      app.endUndoGroup();
    };
    triggerBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Trigger");
      addReactor("Trigger");
      app.endUndoGroup();
    };
    switchBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Switch");
      addReactor("Switch");
      app.endUndoGroup();
    };
    flickerBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Flicker");
      addReactor("Flicker");
      app.endUndoGroup();
    };
    wiggleBtn.onClick = function () {
      app.beginUndoGroup("New Reactor: Wiggle");
      addReactor("Wiggle");
      app.endUndoGroup();
    };
    profBakeDropdown.onChange = function () {
      if (profBakeDropdown.selection == 0) {
        layerModeChange("fullLayer");
      } else {
        layerModeChange("workArea");
      }
    };
    addBackBtn.onClick = function () {
      removeAddControls();
    };
    createBtn.onClick = function () {
      profileCheck = false;
      addProfile();
      if (profileCheck == true) {
        app.beginUndoGroup('New profile: "' + profileText.text + '"');
        removeReactFolder();
        removeAddControls();
        spectrumControls();
        spectrumSetup();
        updateRangeText();
        updateHeightText();
        writeLn('New profile: "' + profileText.text + '"');
        app.endUndoGroup();
      }
    };
    addWin.addEventListener("keydown", function (e) {
      if (e.keyName == "Enter") {
        addProfile();
        if (profileCheck == true) {
          app.beginUndoGroup('New profile: "' + profileText.text + '"');
          removeReactFolder();
          removeAddControls();
          spectrumControls();
          spectrumSetup();
          updateRangeText();
          updateHeightText();
          writeLn('New profile: "' + profileText.text + '"');
          app.endUndoGroup();
        }
      }
    });
    addWin.addEventListener("keydown", function (e) {
      if (e.keyName == "Escape") {
        addWin.hide();
      }
    });
    spectrumWin.addEventListener("mouseover", function () {
      updatePreset();
    });
    presetDD.onChange = function () {
      changePreset(presetDD.selection.index);
    };
    spectrumProfileText.onChange = function () {
      app.beginUndoGroup(
        'Changed profile name to: "' + spectrumProfileText.text + '"',
      );
      profileRename();
      spectrumProfileText.selected = false;
      spectrumProfileText.selected = true;
    };
    heightUpBtn.onClick = function () {
      var keyState = ScriptUI.environment.keyboardState;
      if (keyState.ctrlKey) {
        changeSpectrumHeight(1000);
      } else {
        if (keyState.shiftKey) {
          changeSpectrumHeight(5000);
        } else {
          changeSpectrumHeight(3000);
        }
      }
      updateHeightText();
    };
    heightDownBtn.onClick = function () {
      var keyState = ScriptUI.environment.keyboardState;
      if (keyState.ctrlKey) {
        changeSpectrumHeight(-1000);
      } else {
        if (keyState.shiftKey) {
          changeSpectrumHeight(-5000);
        } else {
          changeSpectrumHeight(-3000);
        }
      }
      updateHeightText();
    };
    bakeBtn.onClick = function () {
      app.beginUndoGroup('Baked profile: "' + profileText.text + '"');
      bakeCustom();
      removeSpectrumControls();
      removeReactFolder();
      reselectComp();
      app.endUndoGroup();
    };
    bakeTextBtn.onClick = function () {
      app.beginUndoGroup('Baked profile: "' + profileText.text + '"');
      bakeCustom();
      removeSpectrumControls();
      removeReactFolder();
      reselectComp();
      app.endUndoGroup();
    };
    spectrumTrashBtn.onClick = function () {
      app.beginUndoGroup("Removed Profile: " + curAudioProf);
      deleteProfile();
      app.endUndoGroup();
    };
    spectrumBackBtn.onClick = function () {
      app.beginUndoGroup(
        'Canceled and removed profile: "' + profileText.text + '"',
      );
      cancelRevertComp();
      removeSpectrumControls();
      removeReactFolder();
      reselectComp();
      app.endUndoGroup();
    };
    reactorBackBtn.onClick = function () {
      removeReactorControls();
    };
    advancedTree.onDoubleClick = function () {
      advSearch();
    };
    advSearchBtn.onClick = function () {
      advSearch();
    };
    advDuplicateBtn.onClick = function () {
      app.beginUndoGroup("Duplicated Reactor");
      advDuplicate();
      storeCurComp();
      updateAudio();
      reactA(true, false);
      reactorExp();
      removeReactFolder();
      reselectComp();
      app.endUndoGroup();
    };
    advTrashBtn.onClick = function () {
      app.beginUndoGroup(
        "Deleted all reactors on layer \'" +
          advancedTree.selection.text +
          "\'.",
      );
      advTrash();
      storeCurComp();
      updateAudio();
      reactA(true, false);
      reactorExp();
      reselectComp();
      app.endUndoGroup();
    };
    advBackBtn.onClick = function () {
      removeAdvControls();
    };
    transferBtn.onClick = function () {
      if (!demo) {
        app.beginUndoGroup("React Song Swap");
        swapProfiles();
        app.endUndoGroup();
      } else {
        alert(
          "Transferring of profiles is disabled in the trial. Please purchase the full product at https://davey.studio/react to remove limitations and unlock all features.",
        );
        removeTransferControls();
      }
    };
    transferBackBtn.onClick = function () {
      removeTransferControls();
    };
    return win;
  }
  var reactorList = [
    "Pulse",
    "Elastic",
    "Oscillate",
    "Steps",
    "Switch",
    "Wiggle",
    "Flicker",
    "Switch",
    "Trigger",
  ];
  var presetList = [
    "Full",
    "Bass",
    "Mids 1",
    "Mids 2",
    "Mids 3",
    "Mids 4",
    "Mids 5",
    "Mids 6",
    "Treble 1",
    "Treble 2",
    "Treble 3",
    "Treble 4",
    "Treble 5",
    "Custom",
  ];
  var scriptFile = File($.fileName);
  var scriptPalette = scriptBuildUI(thisObj);
  if (scriptPalette !== null && scriptPalette instanceof Window) {
    scriptPalette.center();
    scriptPalette.show();
  } else {
    scriptPalette.layout.layout(true);
  }
}
var scriptName = "FreqReact";
var scriptVersion = "1.5 - MG\xa9";
var scriptDeveloper = "Davey";
var maxWindowSize = [500, 300];
var reactAssets =
  Folder.userData.toString() + "/" + scriptName + "/" + scriptVersion + "/";
var demo = false;
var demoLimit = 10;
var addIcon_bin = __BLOB__BLOB_000001__;
var addIcon_file = createResourceFile("add_icon.png", addIcon_bin);
var advancedIcon_bin = __BLOB__BLOB_000002__;
var advancedIcon_file = createResourceFile(
  "advanced_icon.png",
  advancedIcon_bin,
);
var convertIcon_bin = __BLOB__BLOB_000003__;
var convertIcon_file = createResourceFile("convert_icon.png", convertIcon_bin);
var editIcon_bin = __BLOB__BLOB_000004__;
var editIcon_file = createResourceFile("edit_icon.png", editIcon_bin);
var refreshIcon_bin = __BLOB__BLOB_000005__;
var refreshIcon_file = createResourceFile("refresh_icon.png", refreshIcon_bin);
var settingsIcon_bin = __BLOB__BLOB_000006__;
var settingsIcon_file = createResourceFile(
  "settings_icon.png",
  settingsIcon_bin,
);
var react1Icon_bin = __BLOB__BLOB_000007__;
var react1Icon_file = createResourceFile("react1_icon.png", react1Icon_bin);
var react2Icon_bin = __BLOB__BLOB_000008__;
var react2Icon_file = createResourceFile("react2_icon.png", react2Icon_bin);
var react3Icon_bin = __BLOB__BLOB_000009__;
var react3Icon_file = createResourceFile("react3_icon.png", react3Icon_bin);
var react4Icon_bin = __BLOB__BLOB_000010__;
var react4Icon_file = createResourceFile("react4_icon.png", react4Icon_bin);
var addIcon = File(reactAssets + "add_icon.png");
var advancedIcon = File(reactAssets + "advanced_icon.png");
var convertIcon = File(reactAssets + "convert_icon.png");
var editIcon = File(reactAssets + "edit_icon.png");
var refreshIcon = File(reactAssets + "refresh_icon.png");
var settingsIcon = File(reactAssets + "settings_icon.png");
var react1Icon = File(reactAssets + "react1_icon.png");
var react2Icon = File(reactAssets + "react2_icon.png");
var react3Icon = File(reactAssets + "react3_icon.png");
var react4Icon = File(reactAssets + "react4_icon.png");
var ctrlbackIcon_bin = __BLOB__BLOB_000011__;
var ctrlbackIcon_file = createResourceFile(
  "ctrlBack_icon.png",
  ctrlbackIcon_bin,
);
var elasticIcon_bin = __BLOB__BLOB_000012__;
var elasticIcon_file = createResourceFile("elastic_icon.png", elasticIcon_bin);
var flickerIcon_bin = __BLOB__BLOB_000013__;
var flickerIcon_file = createResourceFile("flicker_icon.png", flickerIcon_bin);
var oscIcon_bin = __BLOB__BLOB_000014__;
var oscIcon_file = createResourceFile("osc_icon.png", oscIcon_bin);
var pulseIcon_bin = __BLOB__BLOB_000015__;
var pulseIcon_file = createResourceFile("pulse_icon.png", pulseIcon_bin);
var stepsIcon_bin = __BLOB__BLOB_000016__;
var stepsIcon_file = createResourceFile("steps_icon.png", stepsIcon_bin);
var switchIcon_bin = __BLOB__BLOB_000017__;
var switchIcon_file = createResourceFile("switch_icon.png", switchIcon_bin);
var triggerIcon_bin = __BLOB__BLOB_000018__;
var triggerIcon_file = createResourceFile("trigger_icon.png", triggerIcon_bin);
var wiggleIcon_bin = __BLOB__BLOB_000019__;
var wiggleIcon_file = createResourceFile("wiggle_icon.png", wiggleIcon_bin);
var pulseIcon = File(reactAssets + "pulse_icon.png");
var elasticIcon = File(reactAssets + "elastic_icon.png");
var stepsIcon = File(reactAssets + "steps_icon.png");
var oscIcon = File(reactAssets + "osc_icon.png");
var switchIcon = File(reactAssets + "switch_icon.png");
var triggerIcon = File(reactAssets + "trigger_icon.png");
var flickerIcon = File(reactAssets + "flicker_icon.png");
var wiggleIcon = File(reactAssets + "wiggle_icon.png");
var reactorBackIcon = File(reactAssets + "ctrlBack_icon.png");
var newprofileIcon_bin = __BLOB__BLOB_000020__;
var newprofileIcon_file = createResourceFile(
  "newProfile_icon.png",
  newprofileIcon_bin,
);
var createIcon_bin = __BLOB__BLOB_000021__;
var createIcon_file = createResourceFile("create_icon.png", createIcon_bin);
var addbackIcon_bin = __BLOB__BLOB_000022__;
var addbackIcon_file = createResourceFile("addBack_icon.png", addbackIcon_bin);
var newProfileImage = File(reactAssets + "newProfile_icon.png");
var addBackIcon = File(reactAssets + "addBack_icon.png");
var createIcon = File(reactAssets + "create_icon.png");
var bakeIcon_bin = __BLOB__BLOB_000023__;
var bakeIcon_file = createResourceFile("bake_icon.png", bakeIcon_bin);
var baketextIcon_bin = __BLOB__BLOB_000024__;
var baketextIcon_file = createResourceFile(
  "bakeText_icon.png",
  baketextIcon_bin,
);
var editbackIcon_bin = __BLOB__BLOB_000025__;
var editbackIcon_file = createResourceFile(
  "editBack_icon.png",
  editbackIcon_bin,
);
var edittrashIcon_bin = __BLOB__BLOB_000026__;
var edittrashIcon_file = createResourceFile(
  "editTrash_icon.png",
  edittrashIcon_bin,
);
var heightIcon_bin = __BLOB__BLOB_000027__;
var heightIcon_file = createResourceFile("height_icon.png", heightIcon_bin);
var heightdownIcon_bin = __BLOB__BLOB_000028__;
var heightdownIcon_file = createResourceFile(
  "heightDown_icon.png",
  heightdownIcon_bin,
);
var heightupIcon_bin = __BLOB__BLOB_000029__;
var heightupIcon_file = createResourceFile(
  "heightUp_icon.png",
  heightupIcon_bin,
);
var spectrumFrame_bin = __BLOB__BLOB_000030__;
var spectrumFrame_file = createResourceFile(
  "spectrum_frame.png",
  spectrumFrame_bin,
);
var bakeIcon = File(reactAssets + "bake_icon.png");
var bakeTextIcon = File(reactAssets + "bakeText_icon.png");
var editBackIcon = File(reactAssets + "editBack_icon.png");
var editTrashIcon = File(reactAssets + "editTrash_icon.png");
var heightIcon = File(reactAssets + "height_icon.png");
var heightUpIcon = File(reactAssets + "heightUp_icon.png");
var heightDownIcon = File(reactAssets + "heightDown_icon.png");
var spectrumFrame = File(reactAssets + "spectrum_frame.png");
var advbackIcon_bin = __BLOB__BLOB_000031__;
var advbackIcon_file = createResourceFile("advBack_icon.png", advbackIcon_bin);
var advdeleteIcon_bin = __BLOB__BLOB_000032__;
var advdeleteIcon_file = createResourceFile(
  "advDelete_icon.png",
  advdeleteIcon_bin,
);
var advduplicateIcon_bin = __BLOB__BLOB_000033__;
var advduplicateIcon_file = createResourceFile(
  "advDuplicate_icon.png",
  advduplicateIcon_bin,
);
var advsmallIcon_bin = __BLOB__BLOB_000034__;
var advsmallIcon_file = createResourceFile(
  "advSmall_icon.png",
  advsmallIcon_bin,
);
var advsearchIcon_bin = __BLOB__BLOB_000035__;
var advsearchIcon_file = createResourceFile(
  "advSearch_icon.png",
  advsearchIcon_bin,
);
var advSearchIcon = File(reactAssets + "advSearch_icon.png");
var advDuplicateIcon = File(reactAssets + "advDuplicate_icon.png");
var advDeleteIcon = File(reactAssets + "advDelete_icon.png");
var advSmallIcon = File(reactAssets + "advSmall_icon.png");
var advBackIcon = File(reactAssets + "advBack_icon.png");
var transferIcon_bin = __BLOB__BLOB_000036__;
var transferIcon_file = createResourceFile(
  "transfer_icon.png",
  transferIcon_bin,
);
var anotherbackIcon_bin = __BLOB__BLOB_000037__;
var anotherbackIcon_file = createResourceFile(
  "anotherBack_icon.png",
  anotherbackIcon_bin,
);
var transferIcon = File(reactAssets + "transfer_icon.png");
var anotherBackIcon = File(reactAssets + "anotherBack_icon.png");
var reactwigglecolor_bin = __BLOB__BLOB_000038__;
var reactwiggle3d_bin = __BLOB__BLOB_000039__;
var reactwiggle2d_bin = __BLOB__BLOB_000040__;
var reactwiggle1d_bin = __BLOB__BLOB_000041__;
var reactstepscolor_bin = __BLOB__BLOB_000042__;
var reactsteps3d_bin = __BLOB__BLOB_000043__;
var reactsteps2d_bin = __BLOB__BLOB_000044__;
var reactsteps1d_bin = __BLOB__BLOB_000045__;
var reactspectrumcontrols_bin = __BLOB__BLOB_000046__;
var reactrangebake_bin = __BLOB__BLOB_000047__;
var reactpulsecolor_bin = __BLOB__BLOB_000048__;
var reactpulse3d_bin = __BLOB__BLOB_000049__;
var reactpulse2d_bin = __BLOB__BLOB_000050__;
var reactpulse1d_bin = __BLOB__BLOB_000051__;
var reactoscillate1d_bin = __BLOB__BLOB_000052__;
var reactoscillate2d_bin = __BLOB__BLOB_000053__;
var reactoscillate3d_bin = __BLOB__BLOB_000054__;
var reactoscillatecolor_bin = __BLOB__BLOB_000055__;
var reactflickercolor_bin = __BLOB__BLOB_000056__;
var reactflicker3d_bin = __BLOB__BLOB_000057__;
var reactflicker2d_bin = __BLOB__BLOB_000058__;
var reactflicker1d_bin = __BLOB__BLOB_000059__;
var reactelasticcolor_bin = __BLOB__BLOB_000060__;
var reactelastic3d_bin = __BLOB__BLOB_000061__;
var reactelastic2d_bin = __BLOB__BLOB_000062__;
var reactelastic1d_bin = __BLOB__BLOB_000063__;
var reactswitch1d_bin = __BLOB__BLOB_000064__;
var reactswitch2d_bin = __BLOB__BLOB_000065__;
var reactswitch3d_bin = __BLOB__BLOB_000066__;
var reactswitchcolor_bin = __BLOB__BLOB_000067__;
var reacttrigger1d_bin = __BLOB__BLOB_000068__;
var reacttrigger2d_bin = __BLOB__BLOB_000069__;
var reacttrigger3d_bin = __BLOB__BLOB_000070__;
var reactwigglecolor_file = createResourceFile(
  "reactWiggleColor.ffx",
  reactwigglecolor_bin,
);
var reactwiggle3d_file = createResourceFile(
  "reactWiggle3D.ffx",
  reactwiggle3d_bin,
);
var reactwiggle2d_file = createResourceFile(
  "reactWiggle2D.ffx",
  reactwiggle2d_bin,
);
var reactwiggle1d_file = createResourceFile(
  "reactWiggle1D.ffx",
  reactwiggle1d_bin,
);
var reactstepscolor_file = createResourceFile(
  "reactStepsColor.ffx",
  reactstepscolor_bin,
);
var reactsteps3d_file = createResourceFile(
  "reactSteps3D.ffx",
  reactsteps3d_bin,
);
var reactsteps2d_file = createResourceFile(
  "reactSteps2D.ffx",
  reactsteps2d_bin,
);
var reactsteps1d_file = createResourceFile(
  "reactSteps1D.ffx",
  reactsteps1d_bin,
);
var reactspectrumcontrols_file = createResourceFile(
  "reactSpectrumControls.ffx",
  reactspectrumcontrols_bin,
);
var reactrangebake_file = createResourceFile(
  "reactRangeBake.ffx",
  reactrangebake_bin,
);
var reactpulsecolor_file = createResourceFile(
  "reactPulseColor.ffx",
  reactpulsecolor_bin,
);
var reactpulse3d_file = createResourceFile(
  "reactPulse3D.ffx",
  reactpulse3d_bin,
);
var reactpulse2d_file = createResourceFile(
  "reactPulse2D.ffx",
  reactpulse2d_bin,
);
var reactpulse1d_file = createResourceFile(
  "reactPulse1D.ffx",
  reactpulse1d_bin,
);
var reactoscillatecolor_file = createResourceFile(
  "reactOscillateColor.ffx",
  reactoscillatecolor_bin,
);
var reactoscillate3d_file = createResourceFile(
  "reactOscillate3D.ffx",
  reactoscillate3d_bin,
);
var reactoscillate2d_file = createResourceFile(
  "reactOscillate2D.ffx",
  reactoscillate2d_bin,
);
var reactoscillate1d_file = createResourceFile(
  "reactOscillate1D.ffx",
  reactoscillate1d_bin,
);
var reactflickercolor_file = createResourceFile(
  "reactFlickerColor.ffx",
  reactflickercolor_bin,
);
var reactflicker3d_file = createResourceFile(
  "reactFlicker3D.ffx",
  reactflicker3d_bin,
);
var reactflicker2d_file = createResourceFile(
  "reactFlicker2D.ffx",
  reactflicker2d_bin,
);
var reactflicker1d_file = createResourceFile(
  "reactFlicker1D.ffx",
  reactflicker1d_bin,
);
var reactelasticcolor_file = createResourceFile(
  "reactElasticColor.ffx",
  reactelasticcolor_bin,
);
var reactelastic3d_file = createResourceFile(
  "reactElastic3D.ffx",
  reactelastic3d_bin,
);
var reactelastic2d_file = createResourceFile(
  "reactElastic2D.ffx",
  reactelastic2d_bin,
);
var reactelastic1d_file = createResourceFile(
  "reactElastic1D.ffx",
  reactelastic1d_bin,
);
var reactswitch1d_file = createResourceFile(
  "reactSwitch1D.ffx",
  reactswitch1d_bin,
);
var reactswitch2d_file = createResourceFile(
  "reactSwitch2D.ffx",
  reactswitch2d_bin,
);
var reactswitch3d_file = createResourceFile(
  "reactSwitch3D.ffx",
  reactswitch3d_bin,
);
var reactswitchcolor_file = createResourceFile(
  "reactSwitchColor.ffx",
  reactswitchcolor_bin,
);
var reacttrigger1d_file = createResourceFile(
  "reactTrigger1D.ffx",
  reacttrigger1d_bin,
);
var reacttrigger2d_file = createResourceFile(
  "reactTrigger2D.ffx",
  reacttrigger2d_bin,
);
var reacttrigger3d_file = createResourceFile(
  "reactTrigger3D.ffx",
  reacttrigger3d_bin,
);
var spectrumControlsPreset = File(reactAssets + "reactSpectrumControls.ffx");
var profilePreset = File(reactAssets + "reactRangeBake.ffx");
buildUI(this);
