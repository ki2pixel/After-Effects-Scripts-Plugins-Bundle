/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function ms_Textor_Global(thisObj) {
  function Check_Net() {
    if (
      app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      ) != 1
    ) {
      alert(
        'Please tick the "Allow Scripts to Write Files and Access Network" checkbox in Preferences > General',
      );
      app.executeCommand(2359);
      if (
        app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        ) != 1
      ) {
        alert(
          "Can\'t access Files. Can\'t create folder. Please tick the \"Allow Scripts to Write Files and Access Network\" checkbox in Preferences > General to run the script.",
        );
        return false;
      } else {
        return true;
      }
    } else {
      return true;
    }
  }
  var net_allow = Check_Net();
  if (net_allow) {
    function Textor(thisObj) {
      function Textor_buildUI(thisObj) {
        function layerSize() {
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          if (txtAnGrp.numProperties > 0) {
            for (var aa = 1; aa <= txtAnGrp.numProperties; aa += 1) {
              txtAnGrp.property(aa).enabled = false;
            }
          }
          var curTime = app.project.activeItem.time;
          var x = selectedLayer.sourceRectAtTime(curTime, false).width;
          var y = selectedLayer.sourceRectAtTime(curTime, false).height;
          if (txtAnGrp.numProperties > 0) {
            for (var aa = 1; aa <= txtAnGrp.numProperties; aa += 1) {
              txtAnGrp.property(aa).enabled = true;
            }
          }
        }
        function centerAnchor() {
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          var curTime = app.project.activeItem.time;
          var x = selectedLayer.sourceRectAtTime(curTime, false).width / 2;
          var y = selectedLayer.sourceRectAtTime(curTime, false).height / 2;
          if (
            selectedLayer instanceof TextLayer ||
            selectedLayer instanceof ShapeLayer
          ) {
            x += selectedLayer.sourceRectAtTime(curTime, false).left;
            y += selectedLayer.sourceRectAtTime(curTime, false).top;
          }
          var curAnchor = selectedLayer.anchorPoint.value;
          var xMove = (x - curAnchor[0]) * (selectedLayer.scale.value[0] / 100);
          var yMove = (y - curAnchor[1]) * (selectedLayer.scale.value[1] / 100);
          selectedLayer.anchorPoint.setValue([x, y]);
          var curPos = selectedLayer.position.value;
          selectedLayer.position.setValue([
            curPos[0] + xMove,
            curPos[1] + yMove,
            curPos[2],
          ]);
        }
        function valLimit() {
          if (app.project.activeItem == null) {
            AbsWidth = 1920;
            AbsHeight = 1080;
          } else {
            AbsWidth = app.project.activeItem.width;
            AbsHeight = app.project.activeItem.height;
          }
          for (var el = 1; el <= elem.length; el += 1) {
            if (
              el == 1 ||
              el == 3 ||
              el == 9 ||
              el == 10 ||
              el == 15 ||
              el == 16 ||
              el == 29 ||
              el == 42
            ) {
              limit[el] = AbsWidth / 100;
            } else {
              if (el == 2 || el == 11 || el == 30) {
                limit[el] = AbsHeight / 100;
              } else {
                limit[el] = 1;
              }
            }
          }
        }
        function factorInit() {
          AbsWidth = app.project.activeItem.width;
          AbsHeight = app.project.activeItem.height;
          for (var el = 1; el <= elem.length; el += 1) {
            if (el == 1) {
              factor[el] = AbsWidth / 100;
            } else {
              if (el == 2) {
                factor[el] = AbsHeight / 100;
              } else {
                if (el == 9 || el == 29) {
                  factor[el] = AbsWidth / 100;
                } else {
                  if (el == 3 || el == 42) {
                    factor[el] = AbsWidth / 100;
                  } else {
                    if (el == 10) {
                      factor[el] = AbsWidth / 100;
                    } else {
                      if (el == 11) {
                        factor[el] = AbsHeight / 100;
                      } else {
                        if (el == 15) {
                          factor[el] = AbsWidth / 100;
                        } else {
                          if (el == 16) {
                            factor[el] = AbsWidth / 100;
                          } else {
                            if (el == 30) {
                              factor[el] = AbsHeight / 100;
                            } else {
                              factor[el] = 1;
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
        }
        function scaleIndex() {
          var selectedL = selectedLayer;
          if (selectedL != null) {
            ScaleFactorX =
              selectedL.property("ADBE Transform Group").property("ADBE Scale")
                .value[0] / 100;
            ScaleFactorY =
              selectedL.property("ADBE Transform Group").property("ADBE Scale")
                .value[1] / 100;
            ScaleFactorZ =
              selectedL.property("ADBE Transform Group").property("ADBE Scale")
                .value[2] / 100;
          } else {
            ScaleFactorX = 1;
            ScaleFactorY = 1;
            ScaleFactorZ = 1;
          }
          for (var el = 1; el <= elem.length; el += 1) {
            if (el == 1) {
              scaleInd[el] = ScaleFactorX;
            } else {
              if (el == 2) {
                scaleInd[el] = ScaleFactorY;
              } else {
                if (el == 9 || el == 29) {
                  scaleInd[el] = ScaleFactorX;
                } else {
                  if (el == 3 || el == 42) {
                    scaleInd[el] = ScaleFactorZ;
                  } else {
                    if (el == 10) {
                      scaleInd[el] = ScaleFactorX;
                    } else {
                      if (el == 11) {
                        scaleInd[el] = ScaleFactorY;
                      } else {
                        if (el == 15) {
                          scaleInd[el] = ScaleFactorX;
                        } else {
                          if (el == 16) {
                            scaleInd[el] = ScaleFactorX;
                          } else {
                            if (el == 30) {
                              scaleInd[el] = ScaleFactorY;
                            } else {
                              scaleInd[el] = 1;
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
        }
        function checkLayer() {
          if (app.project.activeItem == null) {
            checkText = "No";
          } else {
            if (app.project.activeItem.selectedLayers.length > 1) {
              checkText = "Multi";
            } else {
              if (app.project.activeItem.selectedLayers.length < 1) {
                checkText = "No";
              } else {
                if (
                  !app.project.activeItem.selectedLayers[0].property(
                    "sourceText",
                  )
                ) {
                  checkText = "No";
                } else {
                  selectedLayer = app.project.activeItem.selectedLayers[0];
                  checkText = "Yes";
                  return;
                }
              }
            }
          }
        }
        function update() {
          var addIcon = ScriptUI.newImage(
            Folder.userData.toString() + "/Textor/Icons/Image_16.png",
          );
          var wiggleIcon = ScriptUI.newImage(
            Folder.userData.toString() + "/Textor/Icons/Image_17.png",
          );
          var oldIcon = ScriptUI.newImage(
            Folder.userData.toString() + "/Textor/Icons/Image_18.png",
          );
          checkLayer();
          if (checkText == "No" || checkText == "Multi") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select 1 text layer and click HERE again";
          }
          if (checkText == "Yes") {
            selectedLayer = app.project.activeItem.selectedLayers[0];
            txtAnGrp = selectedLayer
              .property("ADBE Text Properties")
              .property("ADBE Text Animators");
            anchorGrpUpd();
            animsList.removeAll();
            if (txtAnGrp.numProperties == 0) {
            } else {
              var expVal = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Align").expression;
              oldValsAr = eval(
                expVal.substring(
                  expVal.lastIndexOf("/*") + 2,
                  expVal.lastIndexOf("*/"),
                ),
              );
              for (
                var activeItem = 1;
                activeItem <= txtAnGrp.numProperties;
                activeItem += 1
              ) {
                aai = activeItem - 1;
                checkAnims();
                if (animStatus == "Expression") {
                  animsList.add("item", txtAnGrp(activeItem).name);
                  animsList.items[aai].image = addIcon;
                  if (txtAnGrp(activeItem).enabled == true) {
                    animsList.items[activeItem - 1].checked = true;
                  }
                  if (txtAnGrp(activeItem).enabled == false) {
                    animsList.items[activeItem - 1].checked = false;
                  }
                } else {
                  if (animStatus == "Wiggle") {
                    animsList.add("item", txtAnGrp(activeItem).name);
                    animsList.items[aai].image = wiggleIcon;
                    if (txtAnGrp(activeItem).enabled == true) {
                      animsList.items[activeItem - 1].checked = true;
                    }
                    if (txtAnGrp(activeItem).enabled == false) {
                      animsList.items[activeItem - 1].checked = false;
                    }
                  }
                }
                if (animStatus == "Bad") {
                  app.beginUndoGroup("Bad anim");
                  var badName =
                    "BAD " + txtAnGrp(activeItem).name + " - REMOVE";
                  animsList.add("item", badName);
                  animsList.items[aai].image = oldIcon;
                  animsList.items[aai].checked = false;
                  app.endUndoGroup();
                }
                animStatus = "";
              }
            }
            updateBt.text = "UPDATE";
          }
        }
        function checkAnims() {
          if (checkText == "No") {
          }
          if (checkText == "Yes") {
            if (txtAnGrp.numProperties && txtAnGrp.numProperties > 0) {
              var activeIt = aai + 1;
              if (
                txtAnGrp
                  .property(activeIt)
                  .property("ADBE Text Selectors")
                  .property("ADBE Text Expressible Selector") != null &&
                txtAnGrp
                  .property(activeIt)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Expressible Amount")
                  .expression.indexOf("//----") >= 0 &&
                txtAnGrp
                  .property(activeIt)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Expressible Amount").numKeys == 2
              ) {
                if (animType != "") {
                  animStatus = "Expression";
                } else {
                  if (oldValsAr != null && oldValsAr[aai] != null) {
                    animStatus = "Expression";
                  } else {
                    animStatus = "Bad";
                  }
                }
              } else {
                if (
                  txtAnGrp
                    .property(activeIt)
                    .property("ADBE Text Selectors")
                    .property("ADBE Text Wiggly Selector") != null &&
                  txtAnGrp
                    .property(activeIt)
                    .property("ADBE Text Selectors")
                    .property(1)
                    .property("ADBE Text Wiggly Max Amount")
                    .expression.indexOf("//----") >= 0 &&
                  txtAnGrp
                    .property(activeIt)
                    .property("ADBE Text Selectors")
                    .property(1)
                    .property("ADBE Text Wiggly Max Amount").numKeys == 2
                ) {
                  if (animType != "") {
                    animStatus = "Wiggle";
                  } else {
                    if (oldValsAr != null && oldValsAr[aai] != null) {
                      animStatus = "Wiggle";
                    } else {
                      animStatus = "Bad";
                    }
                  }
                } else {
                  animStatus = "Bad";
                }
              }
            }
          }
        }
        function detectLayerChange() {
          try {
            app.project.activeItem.selectedLayers;
          } catch (er) {
          } finally {
            if (app.project.activeItem.selectedLayers.length < 1) {
              animsList.removeAll();
              AnimNullVal();
              updateBt.text = "Text layer not selected!";
              try {
                presetsBt;
              } catch (e) {
              } finally {
                presetsBt.text = "Text layer not selected!";
              }
              layerSelection = "No";
            } else {
              if (app.project.activeItem.selectedLayers.length > 1) {
                animsList.removeAll();
                AnimNullVal();
                selectedLayer = app.project.activeItem.selectedLayers[0];
                layerSelection = "No";
              } else {
                selectedLayer = app.project.activeItem.selectedLayers[0];
                if (layerOldName != selectedLayer.name) {
                  update();
                  updateBt.text = "Selected text layer changed!";
                  presetsBt.text = "Selected text layer changed!";
                  layerStatus = "Changed";
                  CheckRange();
                  layerOldName = selectedLayer.name;
                  AnimNullVal();
                } else {
                  if (fromFocus != "Yes") {
                    updateBt.text = "UPDATE";
                    try {
                      presetsBt;
                    } catch (e) {
                    } finally {
                      presetsBt.text = "";
                    }
                  } else {
                    fromFocus = "";
                  }
                  if (layerSelection == "No") {
                    update();
                    layerSelection = "";
                  }
                }
              }
            }
          }
        }
        function listeners() {
          textorImageBt.onClick = function () {
            if ($.os.indexOf("Windows") != -1) {
              system.callSystem("explorer " + textorUrl);
            } else {
              system.callSystem("open " + textorUrl);
            }
          };
          rootTab.addEventListener("focus", function (k) {
            if (k.target.label == "AL" || k.target.label == "PL") {
              layerStatus = "";
              detectLayerChange();
              if (layerStatus == "Changed") {
                fromFocus = "Yes";
              }
            }
          });
          rootOldSel = rootTab.selection.text;
          rootTab.addEventListener("change", function (k) {
            if (rootTab.selection) {
              try {
                rootTab.selection.text;
              } finally {
                var rootActiveSel = rootTab.selection.text;
              }
              if (rootActiveSel != rootOldSel) {
                layerStatus = "";
                detectLayerChange();
                if (layerStatus == "Changed") {
                  fromFocus = "Yes";
                }
                rootOldSel = rootActiveSel;
              }
            }
          });
          txtAnchorBt.onClick = function () {
            checkLayer();
            if (checkText == "No") {
              updateBt.text = "Select 1 text layer first!";
            }
            if (checkText == "Yes" || checkText == "Multi") {
              layerStatus = "";
              detectLayerChange();
              if (layerStatus != "Changed") {
                app.beginUndoGroup("anchorBt");
                selectedLayers = app.project.activeItem.selectedLayers;
                for (var aL = 0; aL < selectedLayers.length; aL += 1) {
                  selectedLayer = selectedLayers[aL];
                  anchorBtClick();
                }
                app.endUndoGroup();
              }
            }
          };
          txtAnchorBar.onChange = function () {
            checkLayer();
            if (checkText == "No") {
              updateBt.text = "Select 1 text layer first!";
              txtAnchorBar.value = 0;
            }
            if (checkText == "Yes" || checkText == "Multi") {
              layerStatus = "";
              detectLayerChange();
              if (checkText == "Multi" && layerStatus == "Changed") {
                layerStatus = "";
              }
              if (layerStatus != "Changed") {
                app.beginUndoGroup("anchorGrp");
                selectedLayers = app.project.activeItem.selectedLayers;
                for (var aL = 0; aL < selectedLayers.length; aL += 1) {
                  selectedLayer = selectedLayers[aL];
                  anchorValChange();
                }
                app.endUndoGroup();
              }
            }
          };
          txtAnchorBar.onChanging = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              anchorGrp = parseInt(txtAnchorBar.value * 100) / 100;
              anchorValChanging();
            }
          };
          txtAnchorChk.onClick = function () {
            checkLayer();
            if (checkText == "No") {
              updateBt.text = "Select 1 text layer first!";
              txtAnchorChk.value = false;
            }
            if (checkText == "Yes" || checkText == "Multi") {
              layerStatus = "";
              detectLayerChange();
              if (checkText == "Multi" && layerStatus == "Changed") {
                layerStatus = "";
              }
              if (layerStatus != "Changed") {
                app.beginUndoGroup("anchorChk");
                selectedLayers = app.project.activeItem.selectedLayers;
                for (var aL = 0; aL < selectedLayers.length; aL += 1) {
                  selectedLayer = selectedLayers[aL];
                  animExpSet();
                }
                app.endUndoGroup();
              }
            }
          };
          animsList.onDoubleClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              checkmarks();
            }
          };
          animsList.addEventListener("change", function (k) {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              checkLayer();
              if (checkText == "Yes") {
                panelChange();
                animRecall();
              }
            }
          });
          animsList.addEventListener("keydown", function (k) {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              if (k.keyName.toLowerCase() == "u") {
                update();
              }
              if (k.keyName.toLowerCase() == "a") {
                addFunc();
              }
              if (k.keyName.toLowerCase() == "w") {
                wiggleFunc();
              }
              if (k.keyName.toLowerCase() == "delete") {
                removeFunc();
              }
              if (k.keyName.toLowerCase() == "enter") {
                renameFunc();
              }
              if (k.keyName.toLowerCase() == "x") {
                resetFunc();
              }
              if (k.keyName.toLowerCase() == "q") {
                randomFunc();
              }
              if ($.os.indexOf("Windows") != -1) {
                if (k.keyName.toLowerCase() == "up" && k.ctrlKey) {
                  moveUpFunc();
                }
                if (k.keyName.toLowerCase() == "down" && k.ctrlKey) {
                  moveDownFunc();
                }
                if (k.keyName.toLowerCase() == "d" && k.ctrlKey) {
                  duplicateFunc();
                }
              } else {
                if (k.keyName.toLowerCase() == "up" && k.metaKey) {
                  moveUpFunc();
                }
                if (k.keyName.toLowerCase() == "down" && k.metaKey) {
                  moveDownFunc();
                }
                if (k.keyName.toLowerCase() == "d" && k.metaKey) {
                  duplicateFunc();
                }
              }
            } else {
              updateBt.text = "Selected layer changed!";
            }
          });
          upBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              moveUpFunc();
            }
          };
          downBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              moveDownFunc();
            }
          };
          addBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              addFunc();
            }
          };
          wiggleBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              wiggleFunc();
            }
          };
          removeBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              removeFunc();
            }
          };
          removeAllBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              if (checkText == "No") {
                updateBt.text = "Select 1 text layer first!";
              } else {
                removeAll();
                AnimNullVal();
              }
            }
          };
          renameBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              renameFunc();
            }
          };
          resetBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              resetFunc();
            }
          };
          randomBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              randomFunc();
            }
          };
          duplicateAnimBt.onClick = function () {
            duplicateFunc();
          };
          presetsList.onDoubleClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              addPresetFunc();
            }
          };
          presetsList.addEventListener("keydown", function (k) {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              if (k.keyName.toLowerCase() == "enter") {
                renamePreset();
              }
              if ($.os.indexOf("Windows") != -1) {
                if (k.keyName.toLowerCase() == "s" && k.ctrlKey) {
                  newPreset();
                }
                if (k.keyName.toLowerCase() == "delete" && k.ctrlKey) {
                  removePreset();
                }
                if (k.keyName.toLowerCase() == "i" && k.ctrlKey) {
                  importPreset();
                }
                if (k.keyName.toLowerCase() == "e" && k.ctrlKey) {
                  exportPreset();
                }
                if (k.keyName.toLowerCase() == "up" && k.ctrlKey) {
                  moveUpPresets();
                }
                if (k.keyName.toLowerCase() == "down" && k.ctrlKey) {
                  moveDownPresets();
                }
              } else {
                if (k.keyName.toLowerCase() == "s" && k.metaKey) {
                  newPreset();
                }
                if (k.keyName.toLowerCase() == "delete" && k.metaKey) {
                  removePreset();
                }
                if (k.keyName.toLowerCase() == "i" && k.metaKey) {
                  importPreset();
                }
                if (k.keyName.toLowerCase() == "e" && k.metaKey) {
                  exportPreset();
                }
                if (k.keyName.toLowerCase() == "up" && k.metaKey) {
                  moveUpPresets();
                }
                if (k.keyName.toLowerCase() == "down" && k.metaKey) {
                  moveDownPresets();
                }
              }
            } else {
              updateBt.text = "Selected layer changed!";
            }
          });
          presetsList.addEventListener("change", function (k) {
            layerStatus = "";
            detectLayerChange();
            checkLayer();
            if (layerStatus == "Changed" && checkText == "Yes") {
              update();
            }
            presetsBt.text = "";
          });
          moveUpPreset_Bt.onClick = function () {
            moveUpPresets();
          };
          moveDownPreset_Bt.onClick = function () {
            moveDownPresets();
          };
          applyPresetsBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              addPresetFunc();
            }
          };
          newPresetsBt.onClick = function () {
            layerStatus = "";
            detectLayerChange();
            if (layerStatus != "Changed") {
              newPreset();
            }
          };
          removePresetsBt.onClick = function () {
            removePreset();
          };
          renamePresetsBt.onClick = function () {
            renamePreset();
          };
          importPresetsBt.onClick = function () {
            importPreset();
          };
          exportPresetsBt.onClick = function () {
            exportPreset();
          };
          TextorPalette.addEventListener("keydown", function (k) {
            if ($.os.indexOf("Windows") != -1) {
              if (k.keyName.toLowerCase() == "z" && k.ctrlKey) {
                var keyState = ScriptUI.environment.keyboardState;
                if (keyState.shiftKey) {
                  redo();
                } else {
                  undo();
                }
              }
            } else {
              if (k.keyName.toLowerCase() == "z" && k.metaKey) {
                var keyState = ScriptUI.environment.keyboardState;
                if (keyState.shiftKey) {
                  redo();
                } else {
                  undo();
                }
              }
            }
            if (k.keyName.toLowerCase() == "space") {
              app.executeCommand(2285);
            }
          });
          updateBt.onClick = function () {
            checkLayer();
            update();
          };
          undoBt.onClick = function () {
            undo();
          };
          undoBt2.onClick = function () {
            undo();
          };
          redoBt.onClick = function () {
            redo();
          };
          redoBt2.onClick = function () {
            redo();
          };
        }
        function moveDownFunc() {
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select 1 text layer first!";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              selectedItems();
              update();
              animsList.selection = selItems;
              selItems = [];
              if (animsList.selection == null) {
                updateBt.text = "Select animators to MOVE";
              } else {
                app.beginUndoGroup("Move Down Animators");
                moveDown();
                app.endUndoGroup();
                selectedItems();
                update();
                animsList.selection = selItems;
                selItems = [];
              }
            }
          }
        }
        function moveDown() {
          deselect();
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          var movingArray = [];
          for (
            var activeItem = 0;
            activeItem < animsList.selection.length;
            activeItem += 1
          ) {
            movingArray[activeItem] = animsList.selection[activeItem].index;
          }
          animsList.selection = null;
          if (movingArray.length > 1 && movingArray[0] > movingArray[1]) {
            movingArray.reverse();
          }
          if (
            movingArray.length == animsList.items.length ||
            movingArray[movingArray.length - 1] == animsList.items.length - 1
          ) {
            updateBt.text = "Update";
            animsList.selection = null;
            animsList.selection = movingArray;
          } else {
            var selectedAnims = [];
            for (
              var activeItem = movingArray.length - 1;
              activeItem >= 0;
              activeItem--
            ) {
              var movingNum = movingArray[activeItem];
              txtAnGrp(movingNum + 1).moveTo(movingNum + 2);
              selectedAnims[activeItem] = movingNum + 1;
              var fromIndex = movingNum;
              var toIndex = fromIndex + 1;
              oldValsAr.splice(toIndex, 0, oldValsAr.splice(fromIndex, 1)[0]);
            }
            animExpSet();
            animsList.selection = null;
            animsList.selection = selectedAnims;
            animsList.selection = null;
            animsList.selection = selectedAnims;
          }
        }
        function moveUpFunc() {
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select 1 text layer first!";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              selectedItems();
              update();
              animsList.selection = selItems;
              selItems = [];
              if (animsList.selection == null) {
                updateBt.text = "Select animators to MOVE";
              } else {
                app.beginUndoGroup("Move Up Animators");
                moveUp();
                app.endUndoGroup();
                selectedItems();
                update();
                animsList.selection = selItems;
                selItems = [];
              }
            }
          }
        }
        function moveUp() {
          deselect();
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          var movingArray = [];
          for (
            var activeItem = 0;
            activeItem < animsList.selection.length;
            activeItem += 1
          ) {
            movingArray[activeItem] = animsList.selection[activeItem].index;
          }
          animsList.selection = null;
          if (movingArray.length > 1 && movingArray[0] > movingArray[1]) {
            movingArray.reverse();
          }
          if (
            movingArray.length == animsList.items.length ||
            movingArray[0] == 0
          ) {
            updateBt.text = "Update";
            animsList.selection = null;
            animsList.selection = movingArray;
          } else {
            var selectedAnims = [];
            for (
              var activeItem = 0;
              activeItem < movingArray.length;
              activeItem += 1
            ) {
              var movingNum = movingArray[activeItem];
              txtAnGrp(movingNum + 1).moveTo(movingNum);
              selectedAnims[activeItem] = movingNum - 1;
              var fromIndex = movingNum;
              var toIndex = fromIndex - 1;
              oldValsAr.splice(toIndex, 0, oldValsAr.splice(fromIndex, 1)[0]);
            }
            animExpSet();
            animsList.selection = null;
            animsList.selection = selectedAnims;
          }
        }
        function undo() {
          selectedItems();
          app.executeCommand(16);
          app.executeCommand(2387);
          app.executeCommand(2387);
          deselect();
          animsList.selection = selItems;
          update();
          animRecall();
          animsList.selection = selItems;
          selItems = [];
        }
        function redo() {
          selectedItems();
          app.executeCommand(2035);
          app.executeCommand(2387);
          app.executeCommand(2387);
          deselect();
          animsList.selection = selItems;
          update();
          animRecall();
          animsList.selection = selItems;
          selItems = [];
        }
        function selectedItems() {
          if (animsList.selection == null) {
            selItems = [];
          } else {
            for (
              var activeItem = 0;
              activeItem < animsList.selection.length;
              activeItem += 1
            ) {
              selItems[activeItem] = animsList.selection[activeItem].index;
            }
          }
        }
        function deselect() {
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          selectedLayer.selected = true;
          var selector = false;
          for (
            var activeItem = 1;
            activeItem <= txtAnGrp.numProperties;
            activeItem += 1
          ) {
            if (
              txtAnGrp
                .property(activeItem)
                .property("ADBE Text Selectors")
                .property("ADBE Text Expressible Selector") != null
            ) {
              var selector = txtAnGrp
                .property(activeItem)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Expressible Amount");
            } else {
              if (
                txtAnGrp
                  .property(activeItem)
                  .property("ADBE Text Selectors")
                  .property("ADBE Text Wiggly Selector") != null
              ) {
                var selector = txtAnGrp
                  .property(activeItem)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Wiggly Max Amount");
              }
            }
            if (selector != false) {
              if (selector.numKeys > 0) {
                for (var nk = 1; nk <= selector.numKeys; nk += 1) {
                  selector.setSelectedAtKey(nk, false);
                }
              }
            }
            selector.selected = false;
          }
        }
        function checkmarks() {
          app.beginUndoGroup("Checkmarks");
          checkLayer();
          if (checkText === "Yes") {
            if (animsList.selection == null) {
            } else {
              selectedLayer = app.project.activeItem.selectedLayers[0];
              txtAnGrp = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text Animators");
              for (
                var activeItem = 0;
                activeItem < animsList.selection.length;
                activeItem += 1
              ) {
                aai = animsList.selection[activeItem].index;
                if (animsList.items[aai].text.indexOf(" - REMOVE") >= 0) {
                } else {
                  if (animsList.items[aai].checked == true) {
                    animsList.items[aai].checked = false;
                  } else {
                    animsList.items[aai].checked = true;
                  }
                  setCheckmarks();
                }
              }
              animExpSet();
            }
          }
          app.endUndoGroup();
        }
        function setCheckmarks() {
          checkLayer();
          if (checkText == "Yes") {
            deselect();
            if (animsList.selection == null) {
            } else {
              selectedLayer = app.project.activeItem.selectedLayers[0];
              txtAnGrp = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text Animators");
              if (animsList.items[aai].checked == true) {
                txtAnGrp.property(aai + 1).enabled = true;
                animRecall();
              } else {
                txtAnGrp.property(aai + 1).enabled = false;
                AnimNullVal();
              }
            }
          }
        }
        function addFunc() {
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select 1 text layer first!";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              app.beginUndoGroup("Add animator");
              animType = "Expression";
              selectedLayer = app.project.activeItem.selectedLayers[0];
              txtAnGrp = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text Animators");
              animatorNumNew = txtAnGrp.numProperties + 1;
              selectedItems();
              add();
              update();
              animExpSet();
              var expVal = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Align").expression;
              oldValsAr = eval(
                expVal.substring(
                  expVal.lastIndexOf("/*") + 2,
                  expVal.lastIndexOf("*/"),
                ),
              );
              for (var el = 1; el < elem.length; el += 1) {
                actvPnl = el;
                animSet();
              }
              animsList.selection = selItems;
              animType = "";
              selItems = [];
              updateBt.text = "UPDATE";
              app.endUndoGroup();
            }
          }
        }
        function wiggleFunc() {
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select  1 layer first";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              app.beginUndoGroup("Add wiggle");
              animType = "Wiggle";
              selectedLayer = app.project.activeItem.selectedLayers[0];
              txtAnGrp = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text Animators");
              animatorNumNew = txtAnGrp.numProperties + 1;
              selectedItems();
              add();
              update();
              animExpSet();
              var expVal = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Align").expression;
              oldValsAr = eval(
                expVal.substring(
                  expVal.lastIndexOf("/*") + 2,
                  expVal.lastIndexOf("*/"),
                ),
              );
              for (var el = 1; el < elem.length; el += 1) {
                actvPnl = el;
                animSet();
              }
              animsList.selection = selItems;
              animType = "";
              selItems = [];
              updateBt.text = "UPDATE";
              app.endUndoGroup();
            }
          }
        }
        function add() {
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          if (expVal == null || expVal == "") {
            if (oldValsAr == null || oldValsAr == "") {
              selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Option")
                .setValue(3);
            }
          }
          if (animsList.items.length == 0) {
            animSeqNum = 0;
            wiggleSeqNum = 0;
          }
          var markers = selectedLayer.property("Marker");
          var markerIn = new MarkerValue("");
          var markerOut = new MarkerValue("");
          if (markers.numKeys == 0) {
            if (txtAnGrp.numProperties == 0) {
              centerAnchor();
            }
            selectedLayer
              .property("Marker")
              .setValueAtTime(app.project.activeItem.time, markerIn);
            selectedLayer
              .property("Marker")
              .setValueAtTime(app.project.activeItem.time + 0.5, markerOut);
          } else {
            if (markers.numKeys != 2) {
              for (var activeAnim = 2; activeAnim > 0; activeAnim += -1) {
                markers.removeKey(activeAnim);
              }
              selectedLayer
                .property("Marker")
                .setValueAtTime(app.project.activeItem.time, markerIn);
              selectedLayer
                .property("Marker")
                .setValueAtTime(app.project.activeItem.time + 0.5, markerOut);
            }
          }
          txtAnGrp.addProperty("ADBE Text Animator");
          if (animType == "Expression") {
            animSeqNum = animSeqNum + 1;
            var animNewName = "Animator " + animSeqNum;
            for (var i = 0; i < animsList.items.length; i += 1) {
              var currentAnimName = animsList.items[i].text;
              if (animNewName == currentAnimName) {
                animSeqNum = animSeqNum + 1;
                animNewName = "Animator " + animSeqNum;
              }
            }
            txtAnGrp.property(animatorNumNew).name = animNewName;
            txtAnGrp
              .property(animatorNumNew)
              .property("ADBE Text Selectors")
              .addProperty("ADBE Text Expressible Selector");
            var selector = txtAnGrp
              .property(animatorNumNew)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Expressible Amount");
            selector.setValueAtTime(
              app.project.activeItem.time,
              [100, 100, 100],
            );
            selector.setValueAtTime(
              app.project.activeItem.time + 0.4,
              [0, 0, 0],
            );
          }
          if (animType == "Wiggle") {
            wiggleSeqNum = wiggleSeqNum + 1;
            var animNewName = "Wiggle " + wiggleSeqNum;
            for (var i = 0; i < animsList.items.length; i += 1) {
              var currentAnimName = animsList.items[i].text;
              if (animNewName == currentAnimName) {
                wiggleSeqNum = wiggleSeqNum + 1;
                animNewName = "Wiggle " + wiggleSeqNum;
              }
            }
            txtAnGrp.property(animatorNumNew).name = animNewName;
            txtAnGrp
              .property(animatorNumNew)
              .property("ADBE Text Selectors")
              .addProperty("ADBE Text Wiggly Selector");
            txtAnGrp
              .property(animatorNumNew)
              .property("ADBE Text Selectors")
              .property("ADBE Text Wiggly Selector")
              .property("ADBE Text Wiggly Lock Dim")
              .setValue(1);
            var selector = txtAnGrp
              .property(animatorNumNew)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Wiggly Max Amount");
            selector.setValueAtTime(app.project.activeItem.time, 100);
            selector.setValueAtTime(app.project.activeItem.time + 0.4, 0);
            var animName = txtAnGrp.property(animatorNumNew).name;
            selector.expression =
              '\n\nvar animName = "' +
              animName +
              '"\ntext.animator(animName).selector("ADBE Text Wiggly Selector").maxAmount*-1';
          }
          txtAnGrp
            .property(animatorNumNew)
            .property("ADBE Text Selectors")
            .property(1)
            .property("ADBE Text Range Type2")
            .setValue(3);
          animPropsSetArray[17] = "ADBE Text Anchor Point 3D";
          animPropsSetArray[0] = "ADBE Text Position 3D";
          animPropsSetArray[1] = "ADBE Text Scale 3D";
          animPropsSetArray[2] = "ADBE Text Rotation X";
          animPropsSetArray[3] = "ADBE Text Rotation Y";
          animPropsSetArray[4] = "ADBE Text Rotation";
          animPropsSetArray[5] = "ADBE Text Opacity";
          animPropsSetArray[6] = "ADBE Text Skew";
          animPropsSetArray[7] = "ADBE Text Skew Axis";
          animPropsSetArray[8] = "ADBE Text Track Type";
          animPropsSetArray[9] = "ADBE Text Tracking Amount";
          animPropsSetArray[10] = "ADBE Text Line Anchor";
          animPropsSetArray[11] = "ADBE Text Line Spacing";
          animPropsSetArray[12] = "ADBE Text Character Change Type";
          animPropsSetArray[13] = "ADBE Text Character Range";
          animPropsSetArray[14] = "ADBE Text Character Offset";
          animPropsSetArray[15] = "ADBE Text Character Replace";
          animPropsSetArray[16] = "ADBE Text Blur";
          var animProp = txtAnGrp
            .property(animatorNumNew)
            .property("ADBE Text Animator Properties");
          for (
            var activeItem = 0;
            activeItem <= animPropsSetArray.length - 1;
            activeItem += 1
          ) {
            animProp.addProperty(animPropsSetArray[activeItem]);
          }
          aai = animatorNumNew - 1;
          activeAnimName = txtAnGrp.property(animatorNumNew).name;
          AnimStdVal();
          setExpression();
          blur_Constrain_Chk.value = true;
          scale_Constrain_Chk.value = true;
          app.executeCommand(2387);
          app.executeCommand(2387);
        }
        function removeFunc() {
          checkLayer();
          var keyState = ScriptUI.environment.keyboardState;
          if (keyState.shiftKey) {
            if (checkText == "No") {
              updateBt.text = "Select 1 text layer first!";
            } else {
              removeAll();
              AnimNullVal();
            }
          } else {
            if (checkText == "No") {
              updateBt.text = "Select 1 text layer first!";
            } else {
              if (checkText == "Multi") {
                if (keyState.shiftKey) {
                  removeAll();
                  AnimNullVal();
                } else {
                  updateBt.text = "Select only 1 text layer!";
                }
              } else {
                selectedItems();
                update();
                animsList.selection = selItems;
                selItems = [];
                if (animsList.selection == null) {
                  updateBt.text = "Select animators to REMOVE";
                } else {
                  app.beginUndoGroup("remove");
                  remove();
                  animExpSet();
                  removedOldVarAr = [];
                  app.endUndoGroup();
                  if (animsList.items.length == 0) {
                    AnimNullVal();
                  }
                }
              }
            }
          }
        }
        function remove() {
          deselect();
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          var removingArray = [];
          for (
            var activeItem = 0;
            activeItem < animsList.selection.length;
            activeItem += 1
          ) {
            removingArray[activeItem] = animsList.selection[activeItem].index;
          }
          animsList.selection = null;
          if (removingArray.length > 1 && removingArray[0] < removingArray[1]) {
            removingArray.reverse();
          }
          for (
            var activeItem = 0;
            activeItem < removingArray.length;
            activeItem += 1
          ) {
            var itemNum = removingArray[activeItem];
            animsList.remove(animsList.items[itemNum]);
            txtAnGrp.property(itemNum + 1).remove();
            if (expVal.length > 0) {
              oldValsAr.splice(itemNum, 1);
            }
          }
          if (expVal.length > 0) {
            removedOldVarAr = oldValsAr;
          }
          selectedLayer.selected = true;
        }
        function removeAll() {
          app.beginUndoGroup("Remove All");
          deselect();
          var applyConfirm = confirm(
            "Remove all animators from selected layers?",
          );
          if (applyConfirm) {
            selectedLayers = app.project.activeItem.selectedLayers;
            for (
              var activeL = 0;
              activeL < selectedLayers.length;
              activeL += 1
            ) {
              selectedLayer = selectedLayers[activeL];
              txtAnGrp = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text Animators");
              var markers = selectedLayer.property("Marker");
              if (markers.numKeys > 0) {
                for (var activeAnim = 2; activeAnim > 0; activeAnim += -1) {
                  markers.removeKey(activeAnim);
                }
              }
              selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Align").expression = "";
              for (
                var activeAnim = txtAnGrp.numProperties;
                activeAnim > 0;
                activeAnim--
              ) {
                txtAnGrp.property(activeAnim).remove();
              }
            }
            update();
            updateBt.text = "All animators succefully removed!";
          }
          app.endUndoGroup();
        }
        function renameFunc() {
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select 1 text layer first!";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              selectedItems();
              update();
              animsList.selection = selItems;
              selItems = [];
              if (animsList.selection == null) {
                updateBt.text = "Select animators to RENAME";
              } else {
                app.beginUndoGroup("Rename");
                rename();
                app.endUndoGroup();
                selectedItems();
                update();
                animsList.selection = selItems;
                selItems = [];
              }
            }
          }
        }
        function rename() {
          deselect();
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          for (
            var activeItem = 0;
            activeItem < animsList.selection.length;
            activeItem += 1
          ) {
            aai = animsList.selection[activeItem].index;
            var oldName = animsList.items[aai].text;
            if (animsList.items[aai].checked == false) {
              updateBt.text = "Activate the animator first";
            } else {
              var newAnimName = prompt(
                "New animator name for \'" +
                  animsList.selection[activeItem].text +
                  "\'",
                oldName,
              );
              if (newAnimName) {
                txtAnGrp.property(aai + 1).name = newAnimName;
                animExpSet();
                setExpression();
              }
            }
          }
        }
        function randomFunc() {
          var keyState = ScriptUI.environment.keyboardState;
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select 1 layer";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              if (keyState.shiftKey) {
                app.beginUndoGroup("Random All / None Check");
                randomAllChk();
                app.endUndoGroup();
                animRecall();
              } else {
                selectedItems();
                update();
                animsList.selection = selItems;
                selItems = [];
                if (animsList.selection == null) {
                  updateBt.text = "Select animators to RANDOMIZE";
                } else {
                  if (keyState.altKey) {
                    randomState = "Full";
                  } else {
                    randomState = "";
                  }
                  if (isTrial == true && randomCount >= 3) {
                    alert("Randomize is limited to 3 clicks in trial mode.");
                  } else {
                    app.beginUndoGroup("Randomize");
                    random();
                    app.endUndoGroup();
                    randomCount = randomCount + 1;
                    animRecall();
                  }
                }
              }
            }
          }
        }
        function randomAllChk() {
          deselect();
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          var anchorGrpVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Option");
          var anchorGrpChk = eval(
            expVal
              .split("//")[5]
              .toString()
              .split(" anchorGrpChk = \'")[1]
              .toString()
              .slice(0, -2)
              .toString(),
          );
          if (animsList.selection != null) {
            for (
              var activeItem = 0;
              activeItem < animsList.selection.length;
              activeItem += 1
            ) {
              aai = animsList.selection[activeItem].index;
              if (animsList.items[aai].checked == false) {
                updateBt.text = "Activate the animator first";
              } else {
                for (var el = 1; el < elem.length; el += 1) {
                  if (oldValsAr[aai][el][2] == "true") {
                    var randomChkErr = "randomChkNotEmpty";
                  }
                }
                if (randomChkErr == null) {
                  randomChkStatus = "Check None";
                }
                if (randomChkErr == "randomChkNotEmpty") {
                  randomChkStatus = "Check All";
                }
                if (randomChkStatus == "" || randomChkStatus == "Check None") {
                  txtAnchorChk.value = true;
                  for (var el = 1; el < elem.length; el += 1) {
                    if (
                      el == 1 ||
                      el == 2 ||
                      el == 3 ||
                      el == 4 ||
                      el == 5 ||
                      el == 6 ||
                      el == 7 ||
                      el == 8 ||
                      el == 9 ||
                      el == 20 ||
                      el == 21 ||
                      el == 22 ||
                      el == 23 ||
                      el == 24 ||
                      el == 25 ||
                      el == 26 ||
                      el == 27 ||
                      el == 31 ||
                      el == 33 ||
                      el == 34 ||
                      el == 35 ||
                      el == 36 ||
                      el == 37 ||
                      el == 38 ||
                      el == 39 ||
                      el == 40 ||
                      el == 41 ||
                      el == 43 ||
                      el == 44
                    ) {
                      oldValsAr[aai][el][2] = "true";
                    }
                  }
                  randomChkStatus = "Check All";
                } else {
                  txtAnchorChk.value = false;
                  for (var el = 1; el < elem.length; el += 1) {
                    oldValsAr[aai][el][2] = "false";
                  }
                  randomChkStatus = "Check None";
                }
              }
            }
            animExpSet();
            anchorGrpUpd();
          }
        }
        function random() {
          deselect();
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          var anchorGrpVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Option");
          if (txtAnchorChk.value == true) {
            var animMinVal = 1;
            var animMaxVal = 4;
            var animRandom =
              Math.floor(Math.random() * (animMaxVal - animMinVal + 1)) +
              animMinVal;
            anchorGrpVal.setValue(animRandom);
          }
          if (animsList.selection != null) {
            for (
              var activeItem = 0;
              activeItem < animsList.selection.length;
              activeItem += 1
            ) {
              aai = animsList.selection[activeItem].index;
              if (animsList.items[aai].checked == false) {
                updateBt.text = "Activate the animator first";
              } else {
                for (var el = 1; el < elem.length; el += 1) {
                  if (oldValsAr[aai][el][2] == "true") {
                    var framesPerSec = 1 / app.project.activeItem.frameDuration;
                    var markers = selectedLayer.property("Marker");
                    if (el == 43 || el == 44) {
                      var animMaxVal = Math.round(
                        markers.keyTime(2) * framesPerSec,
                      );
                    } else {
                      var animMaxVal = oldValsAr[aai][el][0];
                    }
                    if (
                      el == 41 ||
                      el == 14 ||
                      el == 15 ||
                      el == 16 ||
                      el == 22 ||
                      el == 23 ||
                      el == 24 ||
                      el == 25 ||
                      el == 26 ||
                      el == 27 ||
                      el == 33 ||
                      el == 34 ||
                      el == 35 ||
                      el == 36 ||
                      el == 37 ||
                      el == 38 ||
                      el == 39 ||
                      el == 40 ||
                      el == 45 ||
                      el == 46
                    ) {
                      var animMinVal = 0;
                    } else {
                      if (el == 43 || el == 44) {
                        var animMinVal = Math.round(
                          markers.keyTime(1) * framesPerSec,
                        );
                      } else {
                        var animMinVal = oldValsAr[aai][el][0] * -1;
                      }
                    }
                    if (
                      el == 22 ||
                      el == 23 ||
                      el == 24 ||
                      el == 27 ||
                      el == 38 ||
                      el == 39 ||
                      el == 40
                    ) {
                      var decimal = 1;
                    } else {
                      var decimal = 0;
                    }
                    if (el == 43 || el == 44) {
                      var MinMax = [];
                      for (var r = 0; r < 2; r += 1) {
                        var randomNumber =
                          (animMaxVal - animMinVal) * Math.random() +
                          animMinVal;
                        MinMax[r] =
                          Math.round(randomNumber * Math.pow(10, decimal)) /
                          Math.pow(10, decimal);
                      }
                      if (
                        oldValsAr[aai][0][2] == "Expression" &&
                        oldValsAr[aai][19][1] >= 0
                      ) {
                        var frameRandomMax = Math.min.apply(Math, MinMax);
                        var frameRandomMin = Math.max.apply(Math, MinMax);
                      } else {
                        if (
                          oldValsAr[aai][0][2] == "Wiggle" &&
                          oldValsAr[aai][32][1] >= 0
                        ) {
                          var frameRandomMax = Math.min.apply(Math, MinMax);
                          var frameRandomMin = Math.max.apply(Math, MinMax);
                        } else {
                          frameRandomMin = Math.min.apply(Math, MinMax);
                          frameRandomMax = Math.max.apply(Math, MinMax);
                        }
                      }
                      var keysDiff = frameRandomMax - frameRandomMin;
                      var FramesMin = 3;
                      if (keysDiff >= FramesMin) {
                        var keyStartDiff = frameRandomMin - animMinVal;
                        keyRandomMin =
                          (frameRandomMin - keyStartDiff) *
                          app.project.activeItem.frameDuration;
                        keyRandomMax =
                          (frameRandomMax - keyStartDiff) *
                          app.project.activeItem.frameDuration;
                        randomKeysSet();
                      }
                    } else {
                      if (el == 7 || el == 8) {
                        if (randomState != "Full") {
                          animMinVal = 0;
                        }
                        var randomNumber =
                          (animMaxVal - animMinVal) * Math.random() +
                          animMinVal;
                        var randomVal = (oldValsAr[aai][el][1] =
                          Math.round(randomNumber * Math.pow(10, decimal)) /
                          Math.pow(10, decimal));
                        if (oldValsAr[aai][0][3] == "true") {
                          oldValsAr[aai][8][1] = oldValsAr[aai][7][1];
                        }
                      } else {
                        if (el == 9) {
                          if (randomState != "Full") {
                            animMinVal = 0;
                          }
                          var randomNumber =
                            (animMaxVal - animMinVal) * Math.random() +
                            animMinVal;
                          var randomVal = (oldValsAr[aai][el][1] =
                            Math.round(randomNumber * Math.pow(10, decimal)) /
                            Math.pow(10, decimal));
                        } else {
                          if (el == 27) {
                            if (
                              randomState != "Full" &&
                              oldValsAr[aai][21][1] < 0
                            ) {
                              animMaxVal = 3;
                            }
                            var randomNumber =
                              (animMaxVal - animMinVal) * Math.random() +
                              animMinVal;
                            var randomVal = (oldValsAr[aai][el][1] =
                              Math.round(randomNumber * Math.pow(10, decimal)) /
                              Math.pow(10, decimal));
                          } else {
                            if (el == 15 || el == 16) {
                              var randomNumber =
                                (animMaxVal - animMinVal) * Math.random() +
                                animMinVal;
                              var randomVal = (oldValsAr[aai][el][1] =
                                Math.round(
                                  randomNumber * Math.pow(10, decimal),
                                ) / Math.pow(10, decimal));
                              if (oldValsAr[aai][0][4] == "true") {
                                oldValsAr[aai][16][1] = oldValsAr[aai][15][1];
                              }
                            } else {
                              if (el == 22) {
                                var randomVal = 0;
                                if (animMaxVal >= 0.8) {
                                  while (randomVal < 0.8) {
                                    var randomNumber =
                                      (animMaxVal - animMinVal) *
                                        Math.random() +
                                      animMinVal;
                                    randomVal = oldValsAr[aai][el][1] =
                                      Math.round(
                                        randomNumber * Math.pow(10, decimal),
                                      ) / Math.pow(10, decimal);
                                  }
                                } else {
                                  var randomNumber =
                                    (animMaxVal - animMinVal) * Math.random() +
                                    animMinVal;
                                  randomVal = oldValsAr[aai][el][1] =
                                    Math.round(
                                      randomNumber * Math.pow(10, decimal),
                                    ) / Math.pow(10, decimal);
                                }
                              } else {
                                if (el == 24) {
                                  var randomVal = 0;
                                  if (animMaxVal >= 1) {
                                    while (randomVal < 1) {
                                      var randomNumber =
                                        (animMaxVal - animMinVal) *
                                          Math.random() +
                                        animMinVal;
                                      randomVal = oldValsAr[aai][el][1] =
                                        Math.round(
                                          randomNumber * Math.pow(10, decimal),
                                        ) / Math.pow(10, decimal);
                                    }
                                  } else {
                                    var randomNumber =
                                      (animMaxVal - animMinVal) *
                                        Math.random() +
                                      animMinVal;
                                    randomVal = oldValsAr[aai][el][1] =
                                      Math.round(
                                        randomNumber * Math.pow(10, decimal),
                                      ) / Math.pow(10, decimal);
                                  }
                                  if (
                                    oldValsAr[aai][24][1] /
                                      oldValsAr[aai][23][1] <=
                                      oldValsAr[aai][23][0] &&
                                    oldValsAr[aai][24][1] /
                                      oldValsAr[aai][23][1] >=
                                      1.2 &&
                                    oldValsAr[aai][24][1] /
                                      oldValsAr[aai][23][1] <=
                                      3
                                  ) {
                                  } else {
                                    oldValsAr[aai][23][1] =
                                      oldValsAr[aai][24][1] / 1.2;
                                  }
                                } else {
                                  if (el == 38) {
                                    var randomVal = 0;
                                    if (animMaxVal >= 0.8) {
                                      while (randomVal < 0.8) {
                                        var randomNumber =
                                          (animMaxVal - animMinVal) *
                                            Math.random() +
                                          animMinVal;
                                        randomVal = oldValsAr[aai][el][1] =
                                          Math.round(
                                            randomNumber *
                                              Math.pow(10, decimal),
                                          ) / Math.pow(10, decimal);
                                      }
                                    } else {
                                      var randomNumber =
                                        (animMaxVal - animMinVal) *
                                          Math.random() +
                                        animMinVal;
                                      randomVal = oldValsAr[aai][el][1] =
                                        Math.round(
                                          randomNumber * Math.pow(10, decimal),
                                        ) / Math.pow(10, decimal);
                                    }
                                  } else {
                                    if (el == 40) {
                                      var randomVal = 0;
                                      if (animMaxVal >= 1) {
                                        while (randomVal < 1) {
                                          var randomNumber =
                                            (animMaxVal - animMinVal) *
                                              Math.random() +
                                            animMinVal;
                                          randomVal = oldValsAr[aai][el][1] =
                                            Math.round(
                                              randomNumber *
                                                Math.pow(10, decimal),
                                            ) / Math.pow(10, decimal);
                                        }
                                      } else {
                                        var randomNumber =
                                          (animMaxVal - animMinVal) *
                                            Math.random() +
                                          animMinVal;
                                        randomVal = oldValsAr[aai][el][1] =
                                          Math.round(
                                            randomNumber *
                                              Math.pow(10, decimal),
                                          ) / Math.pow(10, decimal);
                                      }
                                      if (
                                        oldValsAr[aai][40][1] /
                                          oldValsAr[aai][39][1] <=
                                          oldValsAr[aai][39][0] &&
                                        oldValsAr[aai][40][1] /
                                          oldValsAr[aai][39][1] >=
                                          1.2 &&
                                        oldValsAr[aai][40][1] /
                                          oldValsAr[aai][39][1] <=
                                          3
                                      ) {
                                      } else {
                                        oldValsAr[aai][23][1] =
                                          oldValsAr[aai][40][1] / 1.2;
                                      }
                                    } else {
                                      var randomNumber =
                                        (animMaxVal - animMinVal) *
                                          Math.random() +
                                        animMinVal;
                                      var randomVal = (oldValsAr[aai][el][1] =
                                        Math.round(
                                          randomNumber * Math.pow(10, decimal),
                                        ) / Math.pow(10, decimal));
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
                }
              }
            }
            setExpression();
            animExpSet();
            anchorGrpUpd();
            for (
              var activeItem = 0;
              activeItem < animsList.selection.length;
              activeItem += 1
            ) {
              aai = animsList.selection[activeItem].index;
              for (var el = 1; el < elem.length; el += 1) {
                actvPnl = el;
                animSet();
              }
            }
            animExpSet();
            randomState = "";
          }
        }
        function randomKeysSet() {
          if (
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property("ADBE Text Expressible Selector") != null
          ) {
            var selector = txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Expressible Amount");
            selector.removeKey(2);
            selector.removeKey(1);
            selector.setValueAtTime(keyRandomMin, [100, 100, 100]);
            selector.setInterpolationTypeAtKey(
              selector.nearestKeyIndex(keyRandomMin),
              KeyframeInterpolationType.BEZIER,
            );
            selector.setValueAtTime(keyRandomMax, [0, 0, 0]);
            selector.setInterpolationTypeAtKey(
              selector.nearestKeyIndex(keyRandomMax),
              KeyframeInterpolationType.BEZIER,
            );
            selector.setSelectedAtKey(1, false);
            selector.setSelectedAtKey(2, false);
            selector.selected = false;
          }
          if (
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property("ADBE Text Wiggly Selector") != null
          ) {
            var selector = txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Wiggly Max Amount");
            selector.removeKey(2);
            selector.removeKey(1);
            selector.setValueAtTime(keyRandomMin, oldValsAr[aai][33][1]);
            selector.setInterpolationTypeAtKey(
              selector.nearestKeyIndex(keyRandomMin),
              KeyframeInterpolationType.BEZIER,
            );
            selector.setValueAtTime(keyRandomMax, 0);
            selector.setInterpolationTypeAtKey(
              selector.nearestKeyIndex(keyRandomMax),
              KeyframeInterpolationType.BEZIER,
            );
            selector.setSelectedAtKey(1, false);
            selector.setSelectedAtKey(2, false);
            selector.selected = false;
          }
        }
        function resetFunc() {
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select 1 layer";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              selectedItems();
              update();
              animsList.selection = selItems;
              selItems = [];
              if (animsList.selection == null) {
                updateBt.text = "Select animators to RESET";
              } else {
                app.beginUndoGroup("Reset");
                reset();
                app.endUndoGroup();
              }
            }
          }
        }
        function reset() {
          deselect();
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          oldValsAr = eval(
            expVal.substring(
              expVal.lastIndexOf("/*") + 2,
              expVal.lastIndexOf("*/"),
            ),
          );
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          if (animsList.selection == null) {
          } else {
            for (
              var activeItem = 0;
              activeItem < animsList.selection.length;
              activeItem += 1
            ) {
              aai = animsList.selection[activeItem].index;
              if (animsList.items[aai].checked == false) {
                updateBt.text = "Activate the animator first";
              } else {
                AnimStdVal();
                for (var el = 1; el < elem.length; el += 1) {
                  oldValsAr[aai][el][0] = stdVals[el][0];
                  oldValsAr[aai][el][1] = stdVals[el][1];
                  oldValsAr[aai][el][2] = stdVals[el][2];
                  eval(elem[el][1]).minvalue = stdVals[el][0] * -1;
                  eval(elem[el][1]).maxvalue = stdVals[el][0];
                  eval(elem[el][3]).value = eval(stdVals[el][2]);
                  actvPnl = el;
                  if (
                    actvPnl == 41 ||
                    actvPnl == 14 ||
                    actvPnl == 15 ||
                    actvPnl == 16 ||
                    actvPnl == 22 ||
                    actvPnl == 23 ||
                    actvPnl == 24 ||
                    actvPnl == 25 ||
                    actvPnl == 26 ||
                    actvPnl == 27 ||
                    actvPnl == 33 ||
                    actvPnl == 34 ||
                    actvPnl == 35 ||
                    actvPnl == 36 ||
                    actvPnl == 37 ||
                    actvPnl == 38 ||
                    actvPnl == 39 ||
                    actvPnl == 40 ||
                    actvPnl == 45 ||
                    actvPnl == 46
                  ) {
                    eval(elem[el][1]).minvalue = 0;
                  } else {
                    eval(elem[el][1]).minvalue = stdVals[el][0] * -1;
                  }
                  animSet();
                }
                animExpSet();
                animRecall();
              }
            }
          }
        }
        function AnimStdVal() {
          for (var el = 1; el < elem.length; el += 1) {
            eval(elem[el][0]).text = stdVals[el][0];
            eval(elem[el][1]).minvalue = stdVals[el][0] * -1;
            eval(elem[el][1]).maxvalue = stdVals[el][0];
            eval(elem[el][1]).value = stdVals[el][1];
            eval(elem[el][2]).text = stdVals[el][1];
            eval(elem[el][3]).value = eval(stdVals[el][3]);
            actvPnl = el;
            if (
              actvPnl == 41 ||
              actvPnl == 14 ||
              actvPnl == 15 ||
              actvPnl == 16 ||
              actvPnl == 22 ||
              actvPnl == 23 ||
              actvPnl == 24 ||
              actvPnl == 25 ||
              actvPnl == 26 ||
              actvPnl == 27 ||
              actvPnl == 33 ||
              actvPnl == 34 ||
              actvPnl == 35 ||
              actvPnl == 36 ||
              actvPnl == 37 ||
              actvPnl == 38 ||
              actvPnl == 39 ||
              actvPnl == 40 ||
              actvPnl == 45 ||
              actvPnl == 46
            ) {
              eval(elem[el][1]).minvalue = 0;
            } else {
              eval(elem[el][1]).minvalue = stdVals[el][0] * -1;
            }
          }
        }
        function AnimNullVal() {
          transSubTab.hide();
          fxSubTab.hide();
          range_Pnl.hide();
          wiggle_Pnl.hide();
        }
        function duplicateFunc() {
          checkLayer();
          if (checkText == "No") {
            updateBt.text = "Select 1 text layer first!";
          } else {
            if (checkText == "Multi") {
              updateBt.text = "Select only 1 text layer!";
            } else {
              selectedItems();
              update();
              animsList.selection = selItems;
              selItems = [];
              if (animsList.selection == null) {
                updateBt.text = "Select 1 animator to COPY";
              } else {
                app.beginUndoGroup("Duplicate");
                selectedItems();
                duplicate();
                app.endUndoGroup();
                update();
                animsList.selection = selItems;
                selItems = [];
                app.executeCommand(2387);
                app.executeCommand(2387);
              }
            }
          }
        }
        function duplicate() {
          deselect();
          selectedLayer = app.project.activeItem.selectedLayers[0];
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          for (
            var activeItem = 0;
            activeItem < animsList.selection.length;
            activeItem += 1
          ) {
            var expVal = selectedLayer
              .property("ADBE Text Properties")
              .property("ADBE Text More Options")
              .property("ADBE Text Anchor Point Align").expression;
            oldValsAr = eval(
              expVal.substring(
                expVal.lastIndexOf("/*") + 2,
                expVal.lastIndexOf("*/"),
              ),
            );
            aai = animsList.selection[activeItem].index;
            txtAnGrp.property(aai + 1).duplicate();
            txtAnGrp.property(aai + 2).name =
              txtAnGrp.property(aai + 1).name + " - Copy";
            oldValsAr.splice(aai + 1, 0, oldValsAr[aai]);
            oldValsAr[aai + 1][0][0] = txtAnGrp.property(aai + 2).name;
            newValsAr = oldValsAr;
            if (oldValsAr[oldValsAr.length - 1][2].toString() == "Expression") {
              animType = "Expression";
            }
            if (oldValsAr[oldValsAr.length - 1][2].toString() == "Wiggle") {
              animType = "Wiggle";
            }
            animsList.add("item", txtAnGrp.property(aai + 2).name, aai + 1);
            selItems[activeItem] = aai;
            oldValsAr = newValsAr;
            aai = aai + 1;
            setExpression();
            animExpSet();
          }
        }
        function animExpSet() {
          valLimit();
          var framesPerSec = 1 / app.project.activeItem.frameDuration;
          if (presetsValsAr != "") {
            oldValsAr = presetsValsAr.slice(presetsValsAr);
          }
          txtAnGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Animators");
          var anchorGrpVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Option").value;
          if (txtAnchorChk.value == true) {
            var anchorGrpChk = "true";
          }
          if (txtAnchorChk.value == false) {
            var anchorGrpChk = "false";
          }
          var animsExpAr =
            "//\ntext.moreOption.groupingAlignment\n//\n// anchorGrpVal = \'" +
            anchorGrpVal +
            "\'\n//\n// anchorGrpChk = \'" +
            anchorGrpChk +
            "\'\n//\n";
          animsExpAr = animsExpAr + "/*\n[\n";
          for (
            var actiItem = 0;
            actiItem < txtAnGrp.numProperties;
            actiItem += 1
          ) {
            var animName = txtAnGrp.property(actiItem + 1).name;
            if (
              txtAnGrp
                .property(actiItem + 1)
                .property("ADBE Text Selectors")
                .property("ADBE Text Expressible Selector") != null
            ) {
              var selector = txtAnGrp
                .property(actiItem + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Expressible Amount");
              var selType = "Expression";
            }
            if (
              txtAnGrp
                .property(actiItem + 1)
                .property("ADBE Text Selectors")
                .property("ADBE Text Wiggly Selector") != null
            ) {
              var selector = txtAnGrp
                .property(actiItem + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Wiggly Max Amount");
              var selType = "Wiggle";
            }
            if (animsList.items.length != 0) {
              if (animsList.items[actiItem].checked == true) {
                var selchk = "true";
              }
              if (animsList.items[actiItem].checked == false) {
                var selchk = "false";
              }
            } else {
              if (txtAnGrp.property(actiItem + 1).enabled == true) {
                var selchk = "true";
              }
              if (txtAnGrp.property(actiItem + 1).enabled == false) {
                var selchk = "false";
              }
            }
            if (oldValsAr == null || oldValsAr[actiItem] == null) {
              var SconstrainChk = "true";
            } else {
              if (oldValsAr != null && oldValsAr[actiItem] == null) {
                var SconstrainChk = "true";
              } else {
                var SconstrainChk = oldValsAr[actiItem][0][3];
              }
            }
            if (oldValsAr == null || oldValsAr[actiItem] == null) {
              var BconstrainChk = "true";
            } else {
              if (oldValsAr != null && oldValsAr[actiItem] == null) {
                var BconstrainChk = "true";
              } else {
                var BconstrainChk = oldValsAr[actiItem][0][4];
              }
            }
            if (selector.numKeys == 2) {
              var kT1 = Math.round(selector.keyTime(1) * framesPerSec);
              var kT2 = Math.round(selector.keyTime(2) * framesPerSec);
            } else {
              var kT1 = 0;
              var kT2 = framesPerSec;
            }
            if (oldValsAr == null || oldValsAr[actiItem] == null) {
              animsExpAr = animsExpAr + "[";
              animsExpAr =
                animsExpAr +
                "[\'" +
                animName +
                "\',\'" +
                selchk +
                "\',\'" +
                selType +
                "\',\'" +
                SconstrainChk +
                "\',\'" +
                BconstrainChk +
                "\'],";
              for (var el = 1; el < elem.length; el += 1) {
                if (el == 43) {
                  animsExpAr =
                    animsExpAr +
                    "[\'" +
                    stdVals[el][0] +
                    "\',\'" +
                    stdVals[el][1] +
                    "\',\'" +
                    stdVals[el][2] +
                    "\',\'" +
                    kT1 +
                    "\',\'" +
                    kT2 +
                    "\'],";
                } else {
                  animsExpAr =
                    animsExpAr +
                    "[\'" +
                    stdVals[el][0] +
                    "\',\'" +
                    stdVals[el][1] +
                    "\',\'" +
                    stdVals[el][2] +
                    "\'],";
                }
              }
              animsExpAr = animsExpAr + "],\n";
            }
            if (oldValsAr != null && oldValsAr[actiItem] != null) {
              var activeOldVals = oldValsAr[actiItem];
              animsExpAr = animsExpAr + "[";
              animsExpAr =
                animsExpAr +
                "[\'" +
                animName +
                "\',\'" +
                selchk +
                "\',\'" +
                selType +
                "\',\'" +
                SconstrainChk +
                "\',\'" +
                BconstrainChk +
                "\'],";
              for (var el = 1; el < activeOldVals.length; el += 1) {
                if (el == 43) {
                  animsExpAr =
                    animsExpAr +
                    "[\'" +
                    activeOldVals[el][0] +
                    "\',\'" +
                    activeOldVals[el][1] +
                    "\',\'" +
                    activeOldVals[el][2] +
                    "\',\'" +
                    kT1 +
                    "\',\'" +
                    kT2 +
                    "\'],";
                } else {
                  animsExpAr =
                    animsExpAr +
                    "[\'" +
                    activeOldVals[el][0] +
                    "\',\'" +
                    activeOldVals[el][1] +
                    "\',\'" +
                    activeOldVals[el][2] +
                    "\'],";
                }
              }
              animsExpAr = animsExpAr + "],\n";
            }
          }
          animsExpAr = animsExpAr + "]\n*/";
          selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression = animsExpAr;
        }
        function anchorBtClick() {
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          var anchorGrp = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Option");
          anchorGrpVal = stdVals[0][0];
          var anchorGrpChk = eval(stdVals[0][1]);
          txtAnchorChk.value = anchorGrpChk;
          selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Option")
            .setValue(anchorGrpVal);
          txtAnchorChk.value = anchorGrpChk;
          animExpSet();
          anchorGrpUpd();
        }
        function anchorValChange() {
          try {
            app.project.activeItem.selectedLayers[0] != null;
          } catch (e) {
          } finally {
            if (selectedLayer) {
              var expVal = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Align").expression;
              var anchorGrp = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Option");
              if (expVal.length == 0) {
                var anchorGrpVal = stdVals[0][0];
                if (anchorGrpVal == 1) {
                  txtAnchorBar.value = -30;
                }
                if (anchorGrpVal == 2) {
                  txtAnchorBar.value = -10;
                }
                if (anchorGrpVal == 3) {
                  txtAnchorBar.value = 10;
                }
                if (anchorGrpVal == 4) {
                  txtAnchorBar.value = 30;
                }
              } else {
                if (txtAnchorBar.value < -20) {
                  anchorGrp.setValue(1);
                }
                if (txtAnchorBar.value >= -20 && txtAnchorBar.value < 0) {
                  anchorGrp.setValue(2);
                }
                if (txtAnchorBar.value >= 0 && txtAnchorBar.value < 20) {
                  anchorGrp.setValue(3);
                }
                if (txtAnchorBar.value >= 20) {
                  anchorGrp.setValue(4);
                }
              }
              if (expVal == "") {
                selectedLayer
                  .property("ADBE Text Properties")
                  .property("ADBE Text More Options")
                  .property("ADBE Text Anchor Point Option")
                  .setValue(3);
              } else {
                animExpSet();
              }
            }
          }
        }
        function anchorValChanging() {
          selectedLayers = app.project.activeItem.selectedLayers;
          for (var aL = 0; aL < selectedLayers.length; aL += 1) {
            selectedLayer = selectedLayers[aL];
            if (txtAnchorBar.value < -20) {
              txtAnchorTxt.text = "Chrs";
            }
            if (txtAnchorBar.value >= -20 && txtAnchorBar.value < 0) {
              txtAnchorTxt.text = "Word";
            }
            if (txtAnchorBar.value >= 0 && txtAnchorBar.value < 20) {
              txtAnchorTxt.text = "Line";
            }
            if (txtAnchorBar.value >= 20) {
              txtAnchorTxt.text = "All";
            }
          }
        }
        function anchorGrpUpd() {
          var expVal = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text More Options")
            .property("ADBE Text Anchor Point Align").expression;
          if (expVal.length == 0) {
            achorVal = stdVals[0][0];
            var anchorGrpChk = eval(stdVals[0][1]);
          } else {
            achorVal = expVal
              .split("//")[3]
              .toString()
              .split(" anchorGrpVal = \'")[1]
              .toString()
              .slice(0, -2)
              .toString();
            var anchorGrpChk = eval(
              expVal
                .split("//")[5]
                .toString()
                .split(" anchorGrpChk = \'")[1]
                .toString()
                .slice(0, -2)
                .toString(),
            );
          }
          txtAnchorChk.value = anchorGrpChk;
          if (achorVal == 1) {
            txtAnchorTxt.text = "Chrs";
            txtAnchorBar.value = -40;
          }
          if (achorVal == 2) {
            txtAnchorTxt.text = "Word";
            txtAnchorBar.value = -10;
          }
          if (achorVal == 3) {
            txtAnchorTxt.text = "Line";
            txtAnchorBar.value = 10;
          }
          if (achorVal == 4) {
            txtAnchorTxt.text = "All";
            txtAnchorBar.value = 40;
          }
        }
        function onchgVal() {
          checkLayer();
          valLimit();
          if (checkText == "No") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select 1 text layer first!";
          }
          if (checkText == "Multi") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select only 1 text layer!";
          }
          if (checkText == "Yes") {
            if (parseFloat(eval(elem[actvPnl][0]).text) <= 0) {
              eval(elem[actvPnl][0]).text =
                oldValsAr[aai][actvPnl][0] / limit[actvPnl];
              updateBt.text = "Only positive values are accepted!";
            } else {
              if (
                actvPnl == 41 ||
                actvPnl == 14 ||
                actvPnl == 15 ||
                actvPnl == 16 ||
                actvPnl == 22 ||
                actvPnl == 23 ||
                actvPnl == 24 ||
                actvPnl == 25 ||
                actvPnl == 26 ||
                actvPnl == 27 ||
                actvPnl == 33 ||
                actvPnl == 34 ||
                actvPnl == 35 ||
                actvPnl == 36 ||
                actvPnl == 37 ||
                actvPnl == 38 ||
                actvPnl == 39 ||
                actvPnl == 40 ||
                actvPnl == 45 ||
                actvPnl == 46
              ) {
                eval(elem[actvPnl][1]).minvalue = 0;
              } else {
                eval(elem[actvPnl][1]).minvalue =
                  (parseFloat(eval(elem[actvPnl][0]).text) / limit[actvPnl]) *
                  -1;
              }
              if (
                Math.abs(parseFloat(eval(elem[actvPnl][0]).text)) <
                Math.abs(parseFloat(eval(elem[actvPnl][2]).text))
              ) {
                if (parseFloat(eval(elem[actvPnl][2]).text) < 0) {
                  eval(elem[actvPnl][1]).value = oldValsAr[aai][actvPnl][1] =
                    (parseFloat(eval(elem[actvPnl][0]).text) / limit[actvPnl]) *
                    -1;
                  eval(elem[actvPnl][2]).text =
                    "-" + eval(elem[actvPnl][0]).text;
                } else {
                  eval(elem[actvPnl][1]).value = oldValsAr[aai][actvPnl][1] =
                    parseFloat(eval(elem[actvPnl][0]).text) / limit[actvPnl];
                  eval(elem[actvPnl][2]).text = eval(elem[actvPnl][0]).text;
                }
              }
              oldValsAr[aai][actvPnl][0] = eval(elem[actvPnl][1]).maxvalue =
                parseFloat(eval(elem[actvPnl][0]).text) / limit[actvPnl];
            }
            blurConstrain();
            scaleConstrain();
            animExpSet();
            animSet();
            animRecall();
          }
        }
        function onchgSlider() {
          checkLayer();
          if (checkText == "Yes" && animsList.selection != null) {
            if (
              actvPnl == 41 ||
              actvPnl == 14 ||
              actvPnl == 15 ||
              actvPnl == 16 ||
              actvPnl == 22 ||
              actvPnl == 23 ||
              actvPnl == 24 ||
              actvPnl == 25 ||
              actvPnl == 26 ||
              actvPnl == 27 ||
              actvPnl == 33 ||
              actvPnl == 34 ||
              actvPnl == 35 ||
              actvPnl == 36 ||
              actvPnl == 37 ||
              actvPnl == 38 ||
              actvPnl == 39 ||
              actvPnl == 40 ||
              actvPnl == 45 ||
              actvPnl == 46
            ) {
              eval(elem[actvPnl][1]).minvalue = 0;
            }
            oldValsAr[aai][actvPnl][1] = eval(elem[actvPnl][1]).value;
            scaleConstrain();
            blurConstrain();
            animExpSet();
            animSet();
            reverseEase();
            animRecall();
          }
        }
        function onchgingSlider() {
          if (checkText == "No") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select 1 text layer first!";
          }
          if (checkText == "Multi") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select only 1 text layer!";
          }
          if (checkText == "Yes" && animsList.selection != null) {
            if (actvPnl == 7 || actvPnl == 8) {
              scaleConstrain();
              eval(elem[actvPnl][2]).text =
                Math.round(eval(elem[actvPnl][1]).value * 100) / 100;
            } else {
              if (actvPnl == 15 || actvPnl == 16) {
                blurConstrain();
                eval(elem[actvPnl][2]).text =
                  Math.round(
                    eval(elem[actvPnl][1]).value * factor[actvPnl] * 100,
                  ) / 100;
              } else {
                if (actvPnl == 12) {
                  if (
                    eval(elem[actvPnl][1]).value >= -10 &&
                    eval(elem[actvPnl][1]).value < 0
                  ) {
                    eval(elem[actvPnl][2]).text = "Case Dgt";
                  }
                  if (
                    eval(elem[actvPnl][1]).value >= 0 &&
                    eval(elem[actvPnl][1]).value <= 10
                  ) {
                    eval(elem[actvPnl][2]).text = "Unicode";
                  }
                } else {
                  if (
                    actvPnl == 19 ||
                    actvPnl == 20 ||
                    actvPnl == 28 ||
                    actvPnl == 32
                  ) {
                    if (
                      eval(elem[actvPnl][1]).value >= -10 &&
                      eval(elem[actvPnl][1]).value < 0
                    ) {
                      eval(elem[actvPnl][2]).text = "OFF";
                    }
                    if (
                      eval(elem[actvPnl][1]).value >= 0 &&
                      eval(elem[actvPnl][1]).value <= 10
                    ) {
                      eval(elem[actvPnl][2]).text = "ON";
                    }
                  } else {
                    if (actvPnl == 20) {
                      if (
                        eval(elem[actvPnl][1]).value >= -10 &&
                        eval(elem[actvPnl][1]).value < 0
                      ) {
                        eval(elem[actvPnl][2]).text = "OFF";
                      }
                      if (
                        eval(elem[actvPnl][1]).value >= 0 &&
                        eval(elem[actvPnl][1]).value <= 10
                      ) {
                        eval(elem[actvPnl][2]).text = "ON";
                      }
                    } else {
                      if (actvPnl == 21 || actvPnl == 31) {
                        if (
                          eval(elem[actvPnl][1]).value >= -40 &&
                          eval(elem[actvPnl][1]).value < -20
                        ) {
                          eval(elem[actvPnl][2]).text = "Chrs";
                        }
                        if (
                          eval(elem[actvPnl][1]).value >= -20 &&
                          eval(elem[actvPnl][1]).value < 0
                        ) {
                          eval(elem[actvPnl][2]).text = "No Space";
                        }
                        if (
                          eval(elem[actvPnl][1]).value >= 0 &&
                          eval(elem[actvPnl][1]).value < 20
                        ) {
                          eval(elem[actvPnl][2]).text = "Words";
                        }
                        if (
                          eval(elem[actvPnl][1]).value >= 20 &&
                          eval(elem[actvPnl][1]).value <= 40
                        ) {
                          eval(elem[actvPnl][2]).text = "Lines";
                        }
                        setTextIndex();
                        eval(elem[45][2]).text = indexIn;
                        eval(elem[46][2]).text = indexOut;
                      } else {
                        if (actvPnl == 45) {
                          setTextIndex();
                          eval(elem[45][2]).text = indexIn;
                        } else {
                          if (actvPnl == 46) {
                            setTextIndex();
                            eval(elem[46][2]).text = indexOut;
                          } else {
                            eval(elem[actvPnl][2]).text =
                              Math.round(
                                eval(elem[actvPnl][1]).value *
                                  factor[actvPnl] *
                                  100,
                              ) / 100;
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
        function onchgDisp() {
          checkLayer();
          if (checkText == "No") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select 1 text layer first!";
          }
          if (checkText == "Multi") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select only 1 text layer!";
          }
          if (checkText == "Yes") {
            var expVal = selectedLayer
              .property("ADBE Text Properties")
              .property("ADBE Text More Options")
              .property("ADBE Text Anchor Point Align").expression;
            oldValsAr = eval(
              expVal.substring(
                expVal.lastIndexOf("/*") + 2,
                expVal.lastIndexOf("*/"),
              ),
            );
            if (actvPnl == 45 || actvPnl == 46) {
              setPercent();
              eval(elem[45][2]).text = percentIn;
              eval(elem[46][2]).text = percentOut;
            }
            if (parseFloat(eval(elem[actvPnl][2]).text) < 0) {
              if (
                parseFloat(eval(elem[actvPnl][2]).text) >=
                parseFloat(eval(elem[actvPnl][0]).text) * -1
              ) {
              } else {
                eval(elem[actvPnl][0]).text =
                  parseFloat(eval(elem[actvPnl][2]).text) * -1;
                oldValsAr[aai][actvPnl][0] = eval(elem[actvPnl][1]).maxvalue =
                  (parseFloat(eval(elem[actvPnl][2]).text) * -1) /
                  factor[actvPnl];
                eval(elem[actvPnl][1]).minvalue =
                  parseFloat(eval(elem[actvPnl][2]).text) / factor[actvPnl];
                if (
                  actvPnl == 41 ||
                  actvPnl == 25 ||
                  actvPnl == 26 ||
                  actvPnl == 33 ||
                  actvPnl == 35 ||
                  actvPnl == 36 ||
                  actvPnl == 45 ||
                  actvPnl == 46
                ) {
                  eval(elem[actvPnl][0]).text =
                    oldValsAr[aai][actvPnl][0] =
                    eval(elem[actvPnl][1]).maxvalue =
                    eval(elem[actvPnl][2]).text =
                      100;
                }
                if (actvPnl == 17) {
                  eval(elem[actvPnl][0]).text =
                    oldValsAr[aai][actvPnl][0] =
                    eval(elem[actvPnl][1]).minvalue =
                    eval(elem[actvPnl][2]).text =
                    oldValsAr[aai][actvPnl][2] =
                      -70;
                  eval(elem[actvPnl][1]).maxvalue = 70;
                }
              }
              if (
                actvPnl == 41 ||
                actvPnl == 14 ||
                actvPnl == 15 ||
                actvPnl == 16 ||
                actvPnl == 22 ||
                actvPnl == 23 ||
                actvPnl == 24 ||
                actvPnl == 25 ||
                actvPnl == 26 ||
                actvPnl == 27 ||
                actvPnl == 33 ||
                actvPnl == 34 ||
                actvPnl == 35 ||
                actvPnl == 36 ||
                actvPnl == 37 ||
                actvPnl == 38 ||
                actvPnl == 39 ||
                actvPnl == 40 ||
                actvPnl == 45 ||
                actvPnl == 46
              ) {
                eval(elem[actvPnl][1]).minvalue = eval(elem[actvPnl][2]).text =
                  0;
              }
            }
            if (parseFloat(eval(elem[actvPnl][2]).text) >= 0) {
              if (
                parseFloat(eval(elem[actvPnl][2]).text) <
                parseFloat(eval(elem[actvPnl][0]).text)
              ) {
              } else {
                eval(elem[actvPnl][0]).text = parseFloat(
                  eval(elem[actvPnl][2]).text,
                );
                oldValsAr[aai][actvPnl][0] = eval(elem[actvPnl][1]).maxvalue =
                  parseFloat(eval(elem[actvPnl][2]).text) / factor[actvPnl];
                eval(elem[actvPnl][1]).minvalue =
                  (parseFloat(eval(elem[actvPnl][2]).text) * -1) /
                  factor[actvPnl];
                if (
                  actvPnl == 41 ||
                  actvPnl == 14 ||
                  actvPnl == 15 ||
                  actvPnl == 16 ||
                  actvPnl == 22 ||
                  actvPnl == 23 ||
                  actvPnl == 24 ||
                  actvPnl == 25 ||
                  actvPnl == 26 ||
                  actvPnl == 27 ||
                  actvPnl == 33 ||
                  actvPnl == 34 ||
                  actvPnl == 35 ||
                  actvPnl == 36 ||
                  actvPnl == 37 ||
                  actvPnl == 38 ||
                  actvPnl == 39 ||
                  actvPnl == 40 ||
                  actvPnl == 45 ||
                  actvPnl == 46
                ) {
                  eval(elem[actvPnl][1]).minvalue = 0;
                }
                if (
                  actvPnl == 41 ||
                  actvPnl == 25 ||
                  actvPnl == 26 ||
                  actvPnl == 33 ||
                  actvPnl == 35 ||
                  actvPnl == 36 ||
                  actvPnl == 45 ||
                  actvPnl == 46
                ) {
                  eval(elem[actvPnl][0]).text =
                    oldValsAr[aai][actvPnl][0] =
                    eval(elem[actvPnl][1]).maxvalue =
                    eval(elem[actvPnl][2]).text =
                      100;
                }
                if (actvPnl == 17) {
                  eval(elem[actvPnl][0]).text =
                    oldValsAr[aai][actvPnl][0] =
                    eval(elem[actvPnl][1]).maxvalue =
                    eval(elem[actvPnl][2]).text =
                      70;
                  eval(elem[actvPnl][1]).minvalue = -70;
                }
              }
            }
            eval(elem[actvPnl][1]).value = oldValsAr[aai][actvPnl][1] =
              parseFloat(eval(elem[actvPnl][2]).text) / factor[actvPnl];
            scaleConstrain();
            blurConstrain();
            animExpSet();
            animSet();
            animRecall();
          }
        }
        function onchgBut() {
          checkLayer();
          if (checkText == "No") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select 1 text layer first!";
          }
          if (checkText == "Multi") {
            AnimNullVal();
            animsList.removeAll();
            updateBt.text = "Select only 1 text layer!";
          }
          if (checkText == "Yes" && animsList.selection != null) {
            eval(elem[actvPnl][1]).value = oldValsAr[aai][actvPnl][1] =
              stdVals[actvPnl][1];
            eval(elem[actvPnl][2]).text = stdVals[actvPnl][1] * factor[actvPnl];
            if (
              actvPnl == 41 ||
              actvPnl == 14 ||
              actvPnl == 15 ||
              actvPnl == 16 ||
              actvPnl == 22 ||
              actvPnl == 23 ||
              actvPnl == 24 ||
              actvPnl == 25 ||
              actvPnl == 26 ||
              actvPnl == 27 ||
              actvPnl == 33 ||
              actvPnl == 34 ||
              actvPnl == 35 ||
              actvPnl == 36 ||
              actvPnl == 37 ||
              actvPnl == 38 ||
              actvPnl == 39 ||
              actvPnl == 40 ||
              actvPnl == 45 ||
              actvPnl == 46
            ) {
              eval(elem[actvPnl][1]).minvalue = 0;
            } else {
              eval(elem[actvPnl][1]).minvalue = stdVals[actvPnl][0] * -1;
            }
            oldValsAr[aai][actvPnl][0] = eval(elem[actvPnl][1]).maxvalue =
              stdVals[actvPnl][0];
            eval(elem[actvPnl][0]).text = stdVals[actvPnl][0] * factor[actvPnl];
            scaleConstrain();
            blurConstrain();
            animExpSet();
            animSet();
          }
        }
        function onchgChk() {
          checkLayer();
          if (checkText == "Yes" && animsList.selection != null) {
            if (scale_Constrain_Chk.value == true) {
              oldValsAr[aai][0][3] = "true";
            }
            if (scale_Constrain_Chk.value == false) {
              oldValsAr[aai][0][3] = "false";
            }
            if (blur_Constrain_Chk.value == true) {
              oldValsAr[aai][0][4] = "true";
            }
            if (blur_Constrain_Chk.value == false) {
              oldValsAr[aai][0][4] = "false";
            }
            if (eval(elem[actvPnl][3]).value == true) {
              oldValsAr[aai][actvPnl][2] = "true";
              if (actvPnl == 43) {
                oldValsAr[aai][44][2] = "true";
              }
              if (actvPnl == 44) {
                oldValsAr[aai][43][2] = "true";
              }
            }
            if (eval(elem[actvPnl][3]).value == false) {
              oldValsAr[aai][actvPnl][2] = "false";
              if (actvPnl == 43) {
                oldValsAr[aai][44][2] = "false";
              }
              if (actvPnl == 44) {
                oldValsAr[aai][43][2] = "false";
              }
            }
            scaleConstrain();
            blurConstrain();
            animExpSet();
          }
        }
        function reverseEase() {
          var invertOld = eval(elem[20][1]).value;
          var easeStartOld = eval(elem[25][1]).value;
          var easeEndOld = eval(elem[26][1]).value;
          var WeaseStartOld = eval(elem[35][1]).value;
          var WeaseEndOld = eval(elem[36][1]).value;
          if (eval(elem[19][1]).value < 0) {
            var newRevStatus = "Negative";
          } else {
            var newRevStatus = "Positive";
          }
          if (eval(elem[32][1]).value < 0) {
            var wNewRevStatus = "Negative";
          } else {
            var wNewRevStatus = "Positive";
          }
          if (reverseStatus == newRevStatus) {
            oldValsAr[aai][25][1] =
              eval(elem[25][1]).value =
              eval(elem[25][2]).text =
                easeStartOld;
            oldValsAr[aai][26][1] =
              eval(elem[26][1]).value =
              eval(elem[26][2]).text =
                easeEndOld;
          } else {
            if (invertOld < 0) {
              oldValsAr[aai][20][1] = eval(elem[20][1]).value = 10;
            } else {
              oldValsAr[aai][20][1] = eval(elem[20][1]).value = -10;
            }
            oldValsAr[aai][25][1] =
              eval(elem[25][1]).value =
              eval(elem[25][2]).text =
                easeEndOld;
            oldValsAr[aai][26][1] =
              eval(elem[26][1]).value =
              eval(elem[26][2]).text =
                easeStartOld;
          }
          if (wReverseStatus == wNewRevStatus) {
            oldValsAr[aai][35][1] =
              eval(elem[35][1]).value =
              eval(elem[35][2]).text =
                WeaseStartOld;
            oldValsAr[aai][36][1] =
              eval(elem[36][1]).value =
              eval(elem[36][2]).text =
                WeaseEndOld;
          } else {
            oldValsAr[aai][35][1] =
              eval(elem[35][1]).value =
              eval(elem[35][2]).text =
                WeaseEndOld;
            oldValsAr[aai][36][1] =
              eval(elem[36][1]).value =
              eval(elem[36][2]).text =
                WeaseStartOld;
          }
          for (var as = 1; as < elem.length; as += 1) {
            actvPnl = as;
            if (
              actvPnl == 20 ||
              actvPnl == 25 ||
              actvPnl == 26 ||
              actvPnl == 35 ||
              actvPnl == 36
            ) {
              animExpSet();
              animSet();
            }
          }
          reverseStatus = newRevStatus;
          wReverseStatus = wNewRevStatus;
        }
        function scaleConstrain() {
          if (scale_Constrain_Chk.value == true) {
            if (actvPnl == 7) {
              eval(elem[8][0]).text = eval(elem[7][0]).text;
              eval(elem[8][1]).minvalue = eval(elem[7][1]).minvalue;
              eval(elem[8][1]).maxvalue = oldValsAr[aai][8][0] = eval(
                elem[7][1],
              ).maxvalue;
              eval(elem[8][1]).value =
                eval(elem[7][1]).value =
                oldValsAr[aai][8][1] =
                  eval(elem[7][1]).value;
              eval(elem[8][2]).text = eval(elem[7][2]).text =
                Math.round(oldValsAr[aai][8][1] * 100) / 100;
              eval(elem[8][3]).value = oldValsAr[aai][8][2] = eval(
                elem[7][3],
              ).value;
            }
            if (actvPnl == 8) {
              eval(elem[7][0]).text = eval(elem[8][0]).text;
              eval(elem[7][1]).minvalue = eval(elem[8][1]).minvalue;
              eval(elem[7][1]).maxvalue = oldValsAr[aai][7][0] = eval(
                elem[8][1],
              ).maxvalue;
              eval(elem[7][1]).value =
                eval(elem[8][1]).value =
                oldValsAr[aai][7][1] =
                  eval(elem[8][1]).value;
              eval(elem[7][2]).text = eval(elem[8][2]).text =
                Math.round(oldValsAr[aai][7][1] * 100) / 100;
              eval(elem[7][3]).value = oldValsAr[aai][7][2] = eval(
                elem[8][3],
              ).value;
            }
          }
        }
        function blurConstrain() {
          if (blur_Constrain_Chk.value == true) {
            if (actvPnl == 15) {
              eval(elem[16][0]).text = eval(elem[15][0]).text;
              eval(elem[16][1]).minvalue = 0;
              eval(elem[16][1]).maxvalue = oldValsAr[aai][16][0] = eval(
                elem[15][1],
              ).maxvalue;
              eval(elem[16][1]).value =
                eval(elem[15][1]).value =
                oldValsAr[aai][16][1] =
                  eval(elem[15][1]).value;
              eval(elem[16][2]).text = eval(elem[15][2]).text =
                Math.round(oldValsAr[aai][16][1] * factor[16] * 100) / 100;
              eval(elem[16][3]).value = oldValsAr[aai][16][2] = eval(
                elem[15][3],
              ).value;
            }
            if (actvPnl == 16) {
              eval(elem[15][0]).text = eval(elem[16][0]).text;
              eval(elem[15][1]).minvalue = 0;
              eval(elem[15][1]).maxvalue = oldValsAr[aai][15][0] = eval(
                elem[16][1],
              ).maxvalue;
              eval(elem[15][1]).value =
                eval(elem[16][1]).value =
                oldValsAr[aai][15][1] =
                  eval(elem[16][1]).value;
              eval(elem[15][2]).text = eval(elem[16][2]).text =
                Math.round(oldValsAr[aai][15][1] * factor[15] * 100) / 100;
              eval(elem[15][3]).value = oldValsAr[aai][15][2] = eval(
                elem[16][3],
              ).value;
            }
          }
        }
        function panelChange() {
          checkLayer();
          factorInit();
          if (checkText == "Yes") {
            if (animsList.selection != null) {
              var expVal = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Align").expression;
              oldValsAr = eval(
                expVal.substring(
                  expVal.lastIndexOf("/*") + 2,
                  expVal.lastIndexOf("*/"),
                ),
              );
              for (
                var activeItem = 0;
                activeItem < animsList.selection.length;
                activeItem += 1
              ) {
                if (animsList.selection[activeItem].checked == true) {
                  aai = animsList.selection[activeItem].index;
                }
              }
              if (eval(elem[19][1]).value < 0) {
                reverseStatus = "Negative";
              } else {
                reverseStatus = "Positive";
              }
              if (eval(elem[32][1]).value < 0) {
                wReverseStatus = "Negative";
              } else {
                wReverseStatus = "Positive";
              }
              scale_Constrain_Chk.onClick = function () {
                app.beginUndoGroup("Change Scale Contrain");
                onchgChk();
                app.endUndoGroup();
              };
              blur_Constrain_Chk.onClick = function () {
                app.beginUndoGroup("Change Blur Contrain");
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[29][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 29;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[29][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 29;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[29][1]).onChanging = function () {
                actvPnl = 29;
                onchgingSlider();
              };
              eval(elem[29][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 29;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[29][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 29;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[29][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 29;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[30][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 30;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[30][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 30;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[30][1]).onChanging = function () {
                actvPnl = 30;
                onchgingSlider();
              };
              eval(elem[30][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 30;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[30][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 30;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[30][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 30;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[42][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 42;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[42][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 42;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[42][1]).onChanging = function () {
                actvPnl = 42;
                onchgingSlider();
              };
              eval(elem[42][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 42;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[42][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 42;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[42][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 42;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[1][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 1;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[1][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 1;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[1][1]).onChanging = function () {
                actvPnl = 1;
                onchgingSlider();
              };
              eval(elem[1][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 1;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[1][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 1;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[1][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 1;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[2][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 2;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[2][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 2;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[2][1]).onChanging = function () {
                actvPnl = 2;
                onchgingSlider();
              };
              eval(elem[2][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 2;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[2][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 2;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[2][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 2;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[3][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 3;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[3][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 3;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[3][1]).onChanging = function () {
                actvPnl = 3;
                onchgingSlider();
              };
              eval(elem[3][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 3;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[3][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 3;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[3][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 3;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[4][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 4;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[4][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 4;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[4][1]).onChanging = function () {
                actvPnl = 4;
                onchgingSlider();
              };
              eval(elem[4][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 4;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[4][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 4;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[4][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 4;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[5][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 5;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[5][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 5;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[5][1]).onChanging = function () {
                actvPnl = 5;
                onchgingSlider();
              };
              eval(elem[5][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 5;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[5][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 5;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[5][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 5;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[6][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 6;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[6][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 6;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[6][1]).onChanging = function () {
                actvPnl = 6;
                onchgingSlider();
              };
              eval(elem[6][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 6;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[6][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 6;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[6][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 6;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[7][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 7;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[7][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 7;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[7][1]).onChanging = function () {
                actvPnl = 7;
                onchgingSlider();
              };
              eval(elem[7][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 7;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[7][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 7;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[7][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 7;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[8][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 8;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[8][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 8;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[8][1]).onChanging = function () {
                actvPnl = 8;
                onchgingSlider();
              };
              eval(elem[8][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 8;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[8][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 8;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[8][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 8;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[41][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 41;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[41][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 41;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[41][1]).onChanging = function () {
                actvPnl = 41;
                onchgingSlider();
              };
              eval(elem[41][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 41;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[41][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 41;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[41][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 41;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[9][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 9;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[9][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 9;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[9][1]).onChanging = function () {
                actvPnl = 9;
                onchgingSlider();
              };
              eval(elem[9][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 9;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[9][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 9;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[9][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 9;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[10][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 10;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[10][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 10;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[10][1]).onChanging = function () {
                actvPnl = 10;
                onchgingSlider();
              };
              eval(elem[10][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 10;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[10][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 10;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[10][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 10;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[11][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 11;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[11][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 11;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[11][1]).onChanging = function () {
                actvPnl = 11;
                onchgingSlider();
              };
              eval(elem[11][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 11;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[11][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 11;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[11][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 11;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[12][0]).onChange = function () {
                app.beginUndoGroup("onChg");
                actvPnl = 12;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[12][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 12;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[12][1]).onChanging = function () {
                actvPnl = 12;
                onchgingSlider();
              };
              eval(elem[12][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 12;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[12][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 12;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[12][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 12;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[13][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 13;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[13][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 13;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[13][1]).onChanging = function () {
                actvPnl = 13;
                onchgingSlider();
              };
              eval(elem[13][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 13;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[13][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 13;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[13][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 13;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[14][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 14;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[14][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 14;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[14][1]).onChanging = function () {
                actvPnl = 14;
                onchgingSlider();
              };
              eval(elem[14][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 14;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[14][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 14;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[14][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 14;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[15][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 15;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[15][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 15;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[15][1]).onChanging = function () {
                actvPnl = 15;
                onchgingSlider();
              };
              eval(elem[15][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 15;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[15][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 15;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[15][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 15;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[16][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 16;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[16][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 16;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[16][1]).onChanging = function () {
                actvPnl = 16;
                onchgingSlider();
              };
              eval(elem[16][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 16;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[16][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 16;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[16][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 16;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[17][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 17;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[17][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 17;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[17][1]).onChanging = function () {
                actvPnl = 17;
                onchgingSlider();
              };
              eval(elem[17][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 17;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[17][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 17;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[17][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 17;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[18][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 18;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[18][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 18;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[18][1]).onChanging = function () {
                actvPnl = 18;
                onchgingSlider();
              };
              eval(elem[18][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 18;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[18][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 18;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[18][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 18;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[19][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 19;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[19][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 19;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[19][1]).onChanging = function () {
                actvPnl = 19;
                onchgingSlider();
              };
              eval(elem[19][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 19;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[19][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 19;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[19][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 19;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[20][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 20;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[20][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 20;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[20][1]).onChanging = function () {
                actvPnl = 20;
                onchgingSlider();
              };
              eval(elem[20][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 20;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[20][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 20;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[20][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 20;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[21][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 21;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[21][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 21;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[21][1]).onChanging = function () {
                actvPnl = 21;
                onchgingSlider();
              };
              eval(elem[21][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 21;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[21][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 21;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[21][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 21;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[22][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 22;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[22][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 22;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[22][1]).onChanging = function () {
                actvPnl = 22;
                onchgingSlider();
              };
              eval(elem[22][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 22;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[22][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 22;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[22][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 22;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[23][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 23;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[23][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 23;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[23][1]).onChanging = function () {
                actvPnl = 23;
                onchgingSlider();
              };
              eval(elem[23][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 23;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[23][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 23;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[23][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 23;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[24][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 24;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[24][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 24;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[24][1]).onChanging = function () {
                actvPnl = 24;
                onchgingSlider();
              };
              eval(elem[24][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 24;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[24][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 24;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[24][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 24;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[25][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 25;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[25][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 25;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[25][1]).onChanging = function () {
                actvPnl = 25;
                onchgingSlider();
              };
              eval(elem[25][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 25;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[25][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 25;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[25][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 25;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[26][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 26;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[26][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 26;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[26][1]).onChanging = function () {
                actvPnl = 26;
                onchgingSlider();
              };
              eval(elem[26][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 26;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[26][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 26;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[26][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 26;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[27][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 27;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[27][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 27;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[27][1]).onChanging = function () {
                actvPnl = 27;
                onchgingSlider();
              };
              eval(elem[27][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 27;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[27][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 27;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[27][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 27;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[28][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 28;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[28][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 28;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[28][1]).onChanging = function () {
                actvPnl = 28;
                onchgingSlider();
              };
              eval(elem[28][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 28;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[28][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 28;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[28][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 28;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[31][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 31;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[31][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 31;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[31][1]).onChanging = function () {
                actvPnl = 31;
                onchgingSlider();
              };
              eval(elem[31][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 31;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[31][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 31;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[31][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 31;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[32][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 32;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[32][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 32;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[32][1]).onChanging = function () {
                actvPnl = 32;
                onchgingSlider();
              };
              eval(elem[32][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 32;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[32][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 32;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[32][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 32;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[33][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 33;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[33][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 33;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[33][1]).onChanging = function () {
                actvPnl = 33;
                onchgingSlider();
              };
              eval(elem[33][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 33;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[33][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 33;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[33][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 33;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[34][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 34;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[34][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 34;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[34][1]).onChanging = function () {
                actvPnl = 34;
                onchgingSlider();
              };
              eval(elem[34][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 34;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[34][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 34;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[34][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 34;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[35][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 35;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[35][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 35;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[35][1]).onChanging = function () {
                actvPnl = 35;
                onchgingSlider();
              };
              eval(elem[35][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 35;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[35][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 35;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[35][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 35;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[36][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 36;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[36][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 36;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[36][1]).onChanging = function () {
                actvPnl = 36;
                onchgingSlider();
              };
              eval(elem[36][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 36;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[36][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 36;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[36][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 36;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[37][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 37;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[37][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 37;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[37][1]).onChanging = function () {
                actvPnl = 37;
                onchgingSlider();
              };
              eval(elem[37][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 37;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[37][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 37;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[37][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 37;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[38][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 38;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[38][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 38;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[38][1]).onChanging = function () {
                actvPnl = 38;
                onchgingSlider();
              };
              eval(elem[38][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 38;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[38][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 38;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[38][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 38;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[39][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 39;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[39][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 39;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[39][1]).onChanging = function () {
                actvPnl = 39;
                onchgingSlider();
              };
              eval(elem[39][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 39;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[39][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 39;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[39][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 39;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[40][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 40;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[40][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 40;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[40][1]).onChanging = function () {
                actvPnl = 40;
                onchgingSlider();
              };
              eval(elem[40][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 40;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[40][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 40;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[40][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 40;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[45][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 45;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[45][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 45;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[45][1]).onChanging = function () {
                actvPnl = 45;
                onchgingSlider();
              };
              eval(elem[45][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 45;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[45][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 45;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[45][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 45;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[46][0]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 46;
                onchgVal();
                app.endUndoGroup();
              };
              eval(elem[46][1]).onChange = function () {
                app.beginUndoGroup("Change Slider");
                actvPnl = 46;
                onchgSlider();
                app.endUndoGroup();
              };
              eval(elem[46][1]).onChanging = function () {
                actvPnl = 46;
                onchgingSlider();
              };
              eval(elem[46][2]).onChange = function () {
                app.beginUndoGroup("Change Value");
                actvPnl = 46;
                onchgDisp();
                app.endUndoGroup();
              };
              eval(elem[46][3]).onClick = function () {
                app.beginUndoGroup("Reset Value");
                actvPnl = 46;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[46][4]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 46;
                onchgBut();
                app.endUndoGroup();
              };
              eval(elem[43][3]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 43;
                onchgChk();
                app.endUndoGroup();
              };
              eval(elem[44][3]).onClick = function () {
                app.beginUndoGroup("Change Checkmark");
                actvPnl = 44;
                onchgChk();
                app.endUndoGroup();
              };
            }
          }
        }
        function animRecall() {
          checkLayer();
          factorInit();
          valLimit();
          var oldIcon = ScriptUI.newImage(
            Folder.userData.toString() + "/Textor/Icons/Image_18.png",
          );
          if (checkText == "No") {
            update();
          }
          if (checkText == "Yes") {
            selectedLayer = app.project.activeItem.selectedLayers[0];
            txtAnGrp = selectedLayer
              .property("ADBE Text Properties")
              .property("ADBE Text Animators");
            if (animsList.selection == null) {
              AnimNullVal();
            } else {
              var expVal = selectedLayer
                .property("ADBE Text Properties")
                .property("ADBE Text More Options")
                .property("ADBE Text Anchor Point Align").expression;
              oldValsAr = eval(
                expVal.substring(
                  expVal.lastIndexOf("/*") + 2,
                  expVal.lastIndexOf("*/"),
                ),
              );
              for (
                var activeItem = 1;
                activeItem <= txtAnGrp.numProperties;
                activeItem += 1
              ) {
                aai = activeItem - 1;
                checkAnims();
                if (animStatus == "Bad") {
                  var badName =
                    "BAD " + txtAnGrp(activeItem).name + " - REMOVE";
                  if (animsList.items[activeItem - 1].text != badName) {
                    animsList.items[activeItem - 1].text = badName;
                    animsList.items[activeItem - 1].image = oldIcon;
                    animsList.items[activeItem - 1].checked = false;
                  }
                }
                animStatus = "";
              }
              for (
                var activeItem = 0;
                activeItem < animsList.selection.length;
                activeItem += 1
              ) {
                aai = animsList.selection[activeItem].index;
              }
              for (
                var activeItem = 0;
                activeItem < animsList.selection.length;
                activeItem += 1
              ) {
                var aai2 = animsList.selection[activeItem].index;
                if (txtAnGrp.numProperties == 0) {
                } else {
                  if (oldValsAr == "" || oldValsAr == null) {
                    AnimNullVal();
                    updateBt.text =
                      "Textor info not present! Remove all anims.";
                  } else {
                    if (
                      animsList.selection[activeItem].checked == false &&
                      animsList.selection.length <= 1
                    ) {
                      AnimNullVal();
                    } else {
                      transSubTab.show();
                      fxSubTab.show();
                      range_Pnl.show();
                      wiggle_Pnl.show();
                      for (var el = 1; el < elem.length; el += 1) {
                        if (
                          el == 41 ||
                          el == 14 ||
                          el == 15 ||
                          el == 16 ||
                          el == 22 ||
                          el == 23 ||
                          el == 24 ||
                          el == 25 ||
                          el == 26 ||
                          el == 27 ||
                          el == 33 ||
                          el == 34 ||
                          el == 35 ||
                          el == 36 ||
                          el == 37 ||
                          el == 38 ||
                          el == 39 ||
                          el == 40 ||
                          el == 45 ||
                          el == 46
                        ) {
                          eval(elem[el][1]).minvalue = 0;
                        } else {
                          eval(elem[el][1]).minvalue =
                            oldValsAr[aai2][el][0] * -1;
                        }
                        eval(elem[el][0]).text =
                          Math.round(oldValsAr[aai2][el][0] * limit[el] * 100) /
                          100;
                        eval(elem[el][1]).maxvalue = oldValsAr[aai2][el][0];
                        eval(elem[el][1]).value = oldValsAr[aai2][el][1];
                        eval(elem[el][2]).text =
                          Math.round(
                            oldValsAr[aai2][el][1] * factor[el] * 100,
                          ) / 100;
                        eval(elem[el][3]).value = eval(oldValsAr[aai2][el][2]);
                        if (el == 8) {
                          scale_Constrain_Chk.value = eval(
                            oldValsAr[aai2][0][3],
                          );
                        }
                        if (el == 16) {
                          blur_Constrain_Chk.value = eval(
                            oldValsAr[aai2][0][4],
                          );
                        }
                        if (el == 45 || el == 46) {
                          setTextIndex();
                          eval(elem[45][2]).text = indexIn;
                          eval(elem[46][2]).text = indexOut;
                        }
                        if (
                          el == 12 ||
                          el == 19 ||
                          el == 20 ||
                          el == 28 ||
                          el == 32 ||
                          el == 21 ||
                          el == 31
                        ) {
                          actvPnl = el;
                          onchgingSlider();
                        }
                        if (eval(elem[19][1]).value < 0) {
                          reverseStatus = "Negative";
                        } else {
                          reverseStatus = "Positive";
                        }
                        if (eval(elem[32][1]).value < 0) {
                          wReverseStatus = "Negative";
                        } else {
                          wReverseStatus = "Positive";
                        }
                      }
                      if (animsList.selection.length <= 1) {
                        selectedLayer =
                          app.project.activeItem.selectedLayers[0];
                        txtAnGrp = selectedLayer
                          .property("ADBE Text Properties")
                          .property("ADBE Text Animators");
                        var activeAnNum = animsList.selection[0].index + 1;
                        if (
                          txtAnGrp
                            .property(activeAnNum)
                            .property("ADBE Text Selectors")
                            .property("ADBE Text Expressible Selector") != null
                        ) {
                          wiggle_Pnl.hide();
                          wiggle_Pnl.maximumSize.height = 0;
                          range_Pnl.maximumSize.height = 280;
                          range_Pnl.show();
                          try {
                            editSubTab;
                          } finally {
                            versionUI();
                            behaviorTab.layout.layout(true);
                            behaviorTab.layout.resize();
                          }
                        }
                        if (
                          txtAnGrp
                            .property(activeAnNum)
                            .property("ADBE Text Selectors")
                            .property("ADBE Text Wiggly Selector") != null
                        ) {
                          versionUI();
                          range_Pnl.hide();
                          range_Pnl.maximumSize.height = 0;
                          wiggle_Pnl.maximumSize.height = 280;
                          wiggle_Pnl.show();
                          behaviorTab.layout.layout(true);
                          behaviorTab.layout.resize();
                        }
                      } else {
                        AnimNullVal();
                      }
                    }
                  }
                }
              }
            }
          }
        }
        function versionUI() {
          if (ver >= 13.5) {
            editTab.margins = [10, 10, 0, 5];
            range_Pnl.margins = [5, 0, -10, 0];
            range_Pnl.maximumSize.height = 280;
          } else {
            if (ver >= 13 && ver < 13.5) {
              editTab.margins = [10, 10, 0, 0];
              range_Pnl.margins = [5, 0, -10, -10];
              range_Pnl.maximumSize.height = 280;
            } else {
              if (ver >= 11 && ver < 12) {
                editTab.margins = [10, 10, 10, 0];
                range_Pnl.margins = [5, 0, -10, 10];
                range_Pnl.maximumSize.height = 290;
              } else {
                editTab.margins = [10, 10, 0, 15];
                range_Pnl.margins = [5, 0, -10, -10];
                range_Pnl.maximumSize.height = 280;
              }
            }
          }
        }
        function CheckRange() {
          checkLayer();
          if (checkText == "Yes") {
            app.beginUndoGroup("Changed text source");
            selectedLayer = app.project.activeItem.selectedLayers[0];
            txtAnGrp = selectedLayer
              .property("ADBE Text Properties")
              .property("ADBE Text Animators");
            var expVal = selectedLayer
              .property("ADBE Text Properties")
              .property("ADBE Text More Options")
              .property("ADBE Text Anchor Point Align").expression;
            if (expVal.length > 0) {
              oldValsAr = eval(
                expVal.substring(
                  expVal.lastIndexOf("/*") + 2,
                  expVal.lastIndexOf("*/"),
                ),
              );
              for (
                var actItem = 1;
                actItem <= txtAnGrp.numProperties;
                actItem += 1
              ) {
                aai = actItem - 1;
                if (
                  txtAnGrp
                    .property(actItem)
                    .property("ADBE Text Selectors")
                    .property("ADBE Text Expressible Selector") != null
                ) {
                  var animExp = txtAnGrp
                    .property(aai + 1)
                    .property("ADBE Text Selectors")
                    .property(1)
                    .property("ADBE Text Expressible Amount").expression;
                  var chkIn = animExp
                    .split("\n")[2]
                    .toString()
                    .split("indexIn = ")[1]
                    .toString();
                  var chkOut = animExp
                    .split("\n")[3]
                    .toString()
                    .split("indexOut = ")[1]
                    .toString();
                  if (oldValsAr[aai][21][1] < -20) {
                    basedOn = eval(elem[21][2]).text = "Chrs";
                  }
                  if (
                    oldValsAr[aai][21][1] >= -20 &&
                    oldValsAr[aai][21][1] < 0
                  ) {
                    basedOn = eval(elem[21][2]).text = "No Space";
                  }
                  if (
                    oldValsAr[aai][21][1] >= 0 &&
                    oldValsAr[aai][21][1] < 20
                  ) {
                    basedOn = eval(elem[21][2]).text = "Words";
                  }
                  if (oldValsAr[aai][21][1] >= 20) {
                    basedOn = eval(elem[21][2]).text = "Lines";
                  }
                  setExpressionIndex();
                  if (eval(elem[45][1]).value == 100) {
                    oldValsAr[aai][46][1] = (100 / textTotalLength) * chkOut;
                    animExpSet();
                    actvPnl = 45;
                    eval(elem[45][2]).text = textTotalLength;
                    eval(elem[46][2]).text = chkOut;
                    setExpression();
                  } else {
                    if (eval(elem[46][1]).value == 100) {
                      oldValsAr[aai][45][1] = (100 / textTotalLength) * chkIn;
                      animExpSet();
                      actvPnl = 46;
                      eval(elem[45][2]).text = chkIn;
                      eval(elem[46][2]).text = textTotalLength;
                      setExpression();
                    } else {
                      eval(elem[45][2]).text = chkIn;
                      eval(elem[46][2]).text = chkOut;
                    }
                  }
                }
              }
            }
            app.endUndoGroup();
          }
        }
        function animSet() {
          checkLayer();
          factorInit();
          scaleIndex();
          if (actvPnl == 29 || actvPnl == 30 || actvPnl == 42) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Anchor Point 3D")
              .setValue([
                (oldValsAr[aai][29][1] * factor[29]) / scaleInd[29],
                (oldValsAr[aai][30][1] * factor[30]) / scaleInd[30],
                (oldValsAr[aai][42][1] * factor[42]) / scaleInd[42],
              ]);
          }
          if (actvPnl == 1 || actvPnl == 2 || actvPnl == 3) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Position 3D")
              .setValue([
                (oldValsAr[aai][1][1] * factor[1]) / scaleInd[1],
                (oldValsAr[aai][2][1] * factor[2]) / scaleInd[2],
                (oldValsAr[aai][3][1] * factor[3]) / scaleInd[3],
              ]);
          }
          if (actvPnl == 4) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Rotation X")
              .setValue(oldValsAr[aai][actvPnl][1]);
          }
          if (actvPnl == 5) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Rotation Y")
              .setValue(oldValsAr[aai][actvPnl][1]);
          }
          if (actvPnl == 6) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Rotation")
              .setValue(oldValsAr[aai][actvPnl][1]);
          }
          if (actvPnl == 7 || actvPnl == 8) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Scale 3D")
              .setValue([oldValsAr[aai][7][1], oldValsAr[aai][8][1], 100]);
            if (actvPnl == 7 && oldValsAr[aai][0][3] == "true") {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Animator Properties")
                .property("ADBE Text Scale 3D")
                .setValue([oldValsAr[aai][7][1], oldValsAr[aai][7][1], 100]);
            }
            if (actvPnl == 8 && oldValsAr[aai][0][3] == "true") {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Animator Properties")
                .property("ADBE Text Scale 3D")
                .setValue([oldValsAr[aai][8][1], oldValsAr[aai][8][1], 100]);
            }
          }
          if (actvPnl == 41) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Opacity")
              .setValue(oldValsAr[aai][actvPnl][1]);
          }
          if (actvPnl == 9) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Tracking Amount")
              .setValue((oldValsAr[aai][actvPnl][1] * factor[9]) / scaleInd[9]);
          }
          if (actvPnl == 10 || actvPnl == 11) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Line Spacing")
              .setValue([
                (oldValsAr[aai][10][1] * factor[10]) / scaleInd[10],
                (oldValsAr[aai][11][1] * factor[11]) / scaleInd[11],
              ]);
          }
          if (actvPnl == 12) {
            if (oldValsAr[aai][actvPnl][1] < 0) {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Animator Properties")
                .property("ADBE Text Character Range")
                .setValue(1);
              eval(elem[actvPnl][2]).text = "Case & DiGit";
            } else {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Animator Properties")
                .property("ADBE Text Character Range")
                .setValue(2);
              eval(elem[actvPnl][2]).text = "Unicode";
            }
          }
          if (actvPnl == 13) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Character Offset")
              .setValue(oldValsAr[aai][actvPnl][1]);
          }
          if (actvPnl == 14) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Character Replace")
              .setValue(oldValsAr[aai][actvPnl][1]);
          }
          if (actvPnl == 15 || actvPnl == 16) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Blur")
              .setValue([
                (oldValsAr[aai][15][1] * factor[15]) / scaleInd[15],
                (oldValsAr[aai][16][1] * factor[16]) / scaleInd[16],
              ]);
          }
          if (actvPnl == 15 || actvPnl == 16) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Blur")
              .setValue([
                (oldValsAr[aai][15][1] * factor[15]) / scaleInd[15],
                (oldValsAr[aai][16][1] * factor[16]) / scaleInd[16],
              ]);
            if (actvPnl == 15 && oldValsAr[aai][0][4] == "true") {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Animator Properties")
                .property("ADBE Text Blur")
                .setValue([
                  (oldValsAr[aai][15][1] * factor[15]) / scaleInd[15],
                  (oldValsAr[aai][15][1] * factor[15]) / scaleInd[15],
                ]);
            }
            if (actvPnl == 16 && oldValsAr[aai][0][4] == "true") {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Animator Properties")
                .property("ADBE Text Blur")
                .setValue([
                  (oldValsAr[aai][16][1] * factor[16]) / scaleInd[16],
                  (oldValsAr[aai][16][1] * factor[16]) / scaleInd[16],
                ]);
            }
          }
          if (actvPnl == 17 || actvPnl == 18) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Skew")
              .setValue(oldValsAr[aai][17][1]);
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Animator Properties")
              .property("ADBE Text Skew Axis")
              .setValue(oldValsAr[aai][18][1]);
          }
          if (
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property("ADBE Text Expressible Selector") != null
          ) {
            if (actvPnl == 19) {
              if (oldValsAr[aai][19][1] < 0) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Expressible Amount")
                  .setValueAtKey(1, [100, 100, 100]);
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Expressible Amount")
                  .setValueAtKey(2, [0, 0, 0]);
                eval(elem[actvPnl][2]).text = "OFF";
              } else {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Expressible Amount")
                  .setValueAtKey(1, [0, 0, 0]);
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Expressible Amount")
                  .setValueAtKey(2, [100, 100, 100]);
                eval(elem[actvPnl][2]).text = "ON";
              }
            }
            if (actvPnl == 20) {
              if (oldValsAr[aai][20][1] < 0) {
                eval(elem[20][2]).text = "OFF";
              } else {
                eval(elem[20][2]).text = "ON";
              }
              eval(elem[20][1]).value = oldValsAr[aai][20][1];
              setExpression();
            }
            if (actvPnl == 28) {
              var selector = txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Expressible Amount");
              var k1 = selector.keyTime(1);
              if (oldValsAr[aai][actvPnl][1] < 0) {
                selector.setInterpolationTypeAtKey(
                  selector.nearestKeyIndex(k1),
                  KeyframeInterpolationType.BEZIER,
                );
                eval(elem[actvPnl][2]).text = "OFF";
              } else {
                selector.setInterpolationTypeAtKey(
                  selector.nearestKeyIndex(k1),
                  KeyframeInterpolationType.HOLD,
                );
                eval(elem[actvPnl][2]).text = "ON";
              }
            }
            if (actvPnl == 27) {
              eval(elem[27][1]).value = oldValsAr[aai][27][1];
              setExpression();
            }
            if (actvPnl == 21) {
              if (oldValsAr[aai][21][1] < -20) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(1);
                eval(elem[21][2]).text = "Chrs";
              }
              if (oldValsAr[aai][21][1] >= -20 && oldValsAr[aai][21][1] < 0) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(2);
                eval(elem[21][2]).text = "No Space";
              }
              if (oldValsAr[aai][21][1] >= 0 && oldValsAr[aai][21][1] < 20) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(3);
                eval(elem[21][2]).text = "Words";
              }
              if (oldValsAr[aai][21][1] >= 20) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(4);
                eval(elem[21][2]).text = "Lines";
              }
              setExpression();
            }
            if (actvPnl == 22 || actvPnl == 23 || actvPnl == 24) {
              eval(elem[22][1]).value = oldValsAr[aai][22][1];
              eval(elem[23][1]).value = oldValsAr[aai][23][1];
              eval(elem[24][1]).value = oldValsAr[aai][24][1];
              setExpression();
            }
            if (actvPnl == 25) {
              var selector = txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Expressible Amount");
              var k1 = selector.keyTime(1);
              var infl_Start = oldValsAr[aai][actvPnl][1];
              if (infl_Start < 0.1) {
                var easeStart = new KeyframeEase(0, 0.1);
                var easeEnd = new KeyframeEase(0, 0.1);
              } else {
                var easeStart = new KeyframeEase(0, 0.1);
                var easeEnd = new KeyframeEase(0, infl_Start);
              }
              selector.setTemporalEaseAtKey(
                selector.nearestKeyIndex(k1),
                [easeStart, easeStart, easeStart],
                [easeEnd, easeEnd, easeEnd],
              );
              if (oldValsAr[aai][28][1] >= 0) {
                selector.setInterpolationTypeAtKey(
                  selector.nearestKeyIndex(k1),
                  KeyframeInterpolationType.HOLD,
                );
              }
              setExpression();
            }
            if (actvPnl == 26) {
              var selector = txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Expressible Amount");
              var k2 = selector.keyTime(2);
              var infl_End = oldValsAr[aai][actvPnl][1];
              if (infl_End < 0.1) {
                var easeEnd = new KeyframeEase(0, 0.1);
                var easeStart = new KeyframeEase(0, 0.1);
              } else {
                var easeEnd = new KeyframeEase(0, 0.1);
                var easeStart = new KeyframeEase(0, infl_End);
              }
              selector.setTemporalEaseAtKey(
                selector.nearestKeyIndex(k2),
                [easeStart, easeStart, easeStart],
                [easeEnd, easeEnd, easeEnd],
              );
              setExpression();
            }
            if (actvPnl == 45 || actvPnl == 46) {
              eval(elem[45][1]).value = oldValsAr[aai][45][1];
              eval(elem[46][1]).value = oldValsAr[aai][46][1];
              setExpression();
            }
          }
          if (
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property("ADBE Text Wiggly Selector") != null
          ) {
            if (actvPnl == 31) {
              if (oldValsAr[aai][actvPnl][1] < -20) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(1);
                eval(elem[actvPnl][2]).text = "Chrs";
              }
              if (
                oldValsAr[aai][actvPnl][1] >= -20 &&
                oldValsAr[aai][actvPnl][1] < 0
              ) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(2);
                eval(elem[actvPnl][2]).text = "No Space";
              }
              if (
                oldValsAr[aai][actvPnl][1] >= 0 &&
                oldValsAr[aai][actvPnl][1] < 20
              ) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(3);
                eval(elem[actvPnl][2]).text = "Words";
              }
              if (oldValsAr[aai][actvPnl][1] >= 20) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Range Type2")
                  .setValue(4);
                eval(elem[actvPnl][2]).text = "Lines";
              }
            }
            if (actvPnl == 32) {
              var amountVal = txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Wiggly Max Amount").value;
              if (oldValsAr[aai][32][1] < 0) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Wiggly Max Amount")
                  .setValueAtKey(1, oldValsAr[aai][33][1]);
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Wiggly Max Amount")
                  .setValueAtKey(2, 0);
                eval(elem[actvPnl][2]).text = "OFF";
              } else {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Wiggly Max Amount")
                  .setValueAtKey(1, 0);
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Wiggly Max Amount")
                  .setValueAtKey(2, oldValsAr[aai][33][1]);
                eval(elem[actvPnl][2]).text = "ON";
              }
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Wiggly Min Amount")
                .setValue(oldValsAr[aai][33][1] * -1);
            }
            if (actvPnl == 33) {
              if (oldValsAr[aai][32][1] < 0) {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Wiggly Max Amount")
                  .setValueAtKey(1, oldValsAr[aai][33][1]);
              } else {
                txtAnGrp
                  .property(aai + 1)
                  .property("ADBE Text Selectors")
                  .property(1)
                  .property("ADBE Text Wiggly Max Amount")
                  .setValueAtKey(2, oldValsAr[aai][33][1]);
              }
            }
            if (actvPnl == 37) {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Temporal Freq")
                .setValue(oldValsAr[aai][37][1]);
            }
            if (actvPnl == 34) {
              txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Character Correlation")
                .setValue(oldValsAr[aai][34][1]);
            }
            if (actvPnl == 35) {
              var selector = txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Wiggly Max Amount");
              var k1 = selector.keyTime(1);
              var infl_Start = oldValsAr[aai][actvPnl][1];
              if (infl_Start < 0.1) {
                var easeStart = new KeyframeEase(0, 0.1);
                var easeEnd = new KeyframeEase(0, 0.1);
              } else {
                var easeStart = new KeyframeEase(0, 0.1);
                var easeEnd = new KeyframeEase(0, infl_Start);
              }
              selector.setTemporalEaseAtKey(
                selector.nearestKeyIndex(k1),
                [easeStart],
                [easeEnd],
              );
              setExpression();
            }
            if (actvPnl == 36) {
              var selector = txtAnGrp
                .property(aai + 1)
                .property("ADBE Text Selectors")
                .property(1)
                .property("ADBE Text Wiggly Max Amount");
              var k2 = selector.keyTime(2);
              var infl_End = oldValsAr[aai][actvPnl][1];
              if (infl_End < 0.1) {
                var easeEnd = new KeyframeEase(0, 0.1);
                var easeStart = new KeyframeEase(0, 0.1);
              } else {
                var easeEnd = new KeyframeEase(0, 0.1);
                var easeStart = new KeyframeEase(0, infl_End);
              }
              selector.setTemporalEaseAtKey(
                selector.nearestKeyIndex(k2),
                [easeStart],
                [easeEnd],
              );
              setExpression();
            }
            if (actvPnl == 38 || actvPnl == 39 || actvPnl == 40) {
              eval(elem[38][1]).value = oldValsAr[aai][38][1];
              eval(elem[39][1]).value = oldValsAr[aai][39][1];
              eval(elem[40][1]).value = oldValsAr[aai][40][1];
              setExpression();
            }
          }
        }
        function setPercent() {
          var layerText = app.project.activeItem.selectedLayers[0]
            .property("ADBE Text Properties")
            .property("ADBE Text Document")
            .value.toString();
          var textLines = layerText.split(" ").toString().split(/\r|\n/);
          var textWords = textLines.toString().split(",");
          var textChrs = layerText.replace(/\r|\n/g, "");
          var textChrsNo = textChrs.length - (layerText.split(" ").length - 1);
          basedOn = eval(elem[21][1]).value;
          if (basedOn < -20) {
            var textTotal = textChrs.length;
          }
          if (basedOn >= -20 && basedOn < 0) {
            var textTotal = textChrsNo;
          }
          if (basedOn >= 0 && basedOn < 20) {
            var textTotal = textWords.length;
          }
          if (basedOn >= 20) {
            var textTotal = textLines.length;
          }
          indexIn = parseInt(eval(elem[45][2]).text);
          indexOut = parseInt(eval(elem[46][2]).text);
          percentIn = (100 / textTotal) * indexIn;
          percentOut = (100 / textTotal) * indexOut;
          if (indexIn == 0) {
            percentIn = 0;
          }
          if (indexOut == 0) {
            percentOut = 0;
          }
          if (indexIn == textTotal) {
            percentIn = 100;
          }
          if (indexOut == textTotal) {
            percentOut = 100;
          }
        }
        function setTextIndex() {
          var layerText = app.project.activeItem.selectedLayers[0]
            .property("ADBE Text Properties")
            .property("ADBE Text Document")
            .value.toString();
          var textLines = layerText.split(" ").toString().split(/\r|\n/);
          var textWords = textLines.toString().split(",");
          var textChrs = layerText.replace(/\r|\n/g, "");
          var textChrsNo = textChrs.length - (layerText.split(" ").length - 1);
          basedOn = eval(elem[21][1]).value;
          if (basedOn < -20) {
            var textTotal = textChrs.length;
          }
          if (basedOn >= -20 && basedOn < 0) {
            var textTotal = textChrsNo;
          }
          if (basedOn >= 0 && basedOn < 20) {
            var textTotal = textWords.length;
          }
          if (basedOn >= 20) {
            var textTotal = textLines.length;
          }
          textTotalLength = textTotal;
          percentIn = eval(elem[45][1]).value;
          percentOut = eval(elem[46][1]).value;
          indexIn = Math.round((textTotal / 100) * percentIn);
          indexOut = Math.round((textTotal / 100) * percentOut);
          if (percentIn == 0) {
            indexIn = 0;
          }
          if (percentOut == 0) {
            indexOut = 0;
          }
          if (percentIn == 100) {
            indexIn = textTotal;
          }
          if (percentOut == 100) {
            indexOut = textTotal;
          }
        }
        function setExpressionIndex() {
          var layerText = selectedLayer
            .property("ADBE Text Properties")
            .property("ADBE Text Document")
            .value.toString();
          var textLines = layerText.split(" ").toString().split(/\r|\n/);
          var textWords = textLines.toString().split(",");
          var textChrs = layerText.replace(/\r|\n/g, "");
          var textChrsNo = textChrs.length - (layerText.split(" ").length - 1);
          if (basedOn == "Chrs") {
            var textTotal = textChrs.length;
          }
          if (basedOn == "No Space") {
            var textTotal = textChrsNo;
          }
          if (basedOn == "Words") {
            var textTotal = textWords.length;
          }
          if (basedOn == "Lines") {
            var textTotal = textLines.length;
          }
          textTotalLength = textTotal;
          indexIn = Math.round((textTotal / 100) * percentIn);
          indexOut = Math.round((textTotal / 100) * percentOut);
          if (percentIn == 0) {
            indexIn = 0;
          }
          if (percentOut == 0) {
            indexOut = 0;
          }
          if (percentIn == 100) {
            indexIn = textTotal;
          }
          if (percentOut == 100) {
            indexOut = textTotal;
          }
        }
        function setExpression() {
          if (
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property("ADBE Text Expressible Selector") != null
          ) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1).name =
              txtAnGrp.property(aai + 1).name + " - Selector";
            if (
              oldValsAr == null ||
              oldValsAr.length == 0 ||
              oldValsAr[aai] == null
            ) {
              if (parseInt(eval(elem[20][1]).value) < 0) {
                var tDelay = "delay/100*(textIndex);";
              } else {
                var tDelay = "delay/100*(textTotal-textIndex);";
              }
              var ease = eval(elem[26][1]).value;
              if (ease == 0) {
                ease = 1;
              }
              percentIn = eval(elem[45][1]).value;
              percentOut = eval(elem[46][1]).value;
              var animName = txtAnGrp.property(aai + 1).name;
              var amplitude = eval(elem[22][1]).value;
              var delay = eval(elem[27][1]).value;
              var frequency = eval(elem[23][1]).value;
              var decay = eval(elem[24][1]).value;
            } else {
              if (parseInt(oldValsAr[aai][20][1]) < 0) {
                var tDelay = "delay/100*(textIndex)";
              } else {
                var tDelay = "delay/100*(textTotal-textIndex)";
              }
              var ease = oldValsAr[aai][26][1];
              if (ease < 1) {
                ease = 1;
              }
              percentIn = oldValsAr[aai][45][1];
              percentOut = oldValsAr[aai][46][1];
              var animName = txtAnGrp.property(aai + 1).name;
              var amplitude = oldValsAr[aai][22][1];
              var delay = oldValsAr[aai][27][1];
              var frequency = oldValsAr[aai][23][1];
              var decay = oldValsAr[aai][24][1];
            }
            basedOn = eval(elem[21][2]).text;
            if (actvPnl == 21 || actvPnl == 45 || actvPnl == 46) {
              setExpressionIndex();
            }
            if (indexIn <= indexOut) {
              var indexExp =
                "if(textIndex >= indexIn && textIndex <= indexOut){\n";
            } else {
              var indexExp =
                "if(textIndex < indexOut || textIndex > indexIn){\n";
            }
            exp =
              "//----       " +
              animName +
              "      ----//\n//\nindexIn = " +
              indexIn +
              "\nindexOut = " +
              indexOut +
              "\ndelay = " +
              delay +
              "\nease = " +
              ease +
              "\namp = " +
              amplitude +
              "\nfreq = " +
              frequency +
              "\ndecay = " +
              decay +
              "\ntDelay = " +
              tDelay +
              "\n//\n" +
              indexExp +
              "if (numKeys > 0){\nn = nearestKey(time-tDelay).index;\nif (key(n).time > time-tDelay) n--;\n}\nif (n == 0){\nt = 0;\n}\nelse{\nt = time - key(n).time - tDelay;\n}\nif (n > 0){\nv = velocityAtTime(key(n).time - thisComp.frameDuration/10);\nif(amp > 0 && freq > 0 && decay > 0){\nvalueAtTime(time-tDelay) + v*amp*(ease/100)*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n}\nelse{\nvalueAtTime(time-tDelay);\n}\n}\nelse{\nvalueAtTime(time-tDelay);\n}\n}\nelse{\n0;\n}";
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Expressible Amount").expression = exp;
          }
          if (
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property("ADBE Text Wiggly Selector") != null
          ) {
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Wiggly Min Amount").expressionEnabled =
              false;
            var animName = txtAnGrp.property(aai + 1).name;
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1).name = animName + " - Selector";
            if (oldValsAr == null || oldValsAr[aai] == null) {
              var ease = eval(elem[26][1]).value;
              if (ease == 0) {
                ease = 1;
              }
              var amplitude = eval(elem[38][1]).value;
              var frequency = eval(elem[39][1]).value;
              var decay = eval(elem[40][1]).value;
            } else {
              var ease = oldValsAr[aai][26][1];
              if (ease == 0) {
                ease = 1;
              }
              var amplitude = oldValsAr[aai][38][1];
              var frequency = oldValsAr[aai][39][1];
              var decay = oldValsAr[aai][40][1];
            }
            exp =
              "//----       " +
              animName +
              "      ----//\n//\nease = " +
              ease +
              "\namp = " +
              amplitude +
              "\nfreq = " +
              frequency +
              "\ndecay = " +
              decay +
              "\n//\nif (numKeys > 0){\nn = nearestKey(time).index;\nif (key(n).time > time) n--;\n}\nif (n == 0){\n//t = 0;\n}\nelse{\nt = time - key(n).time+1/50;\n}\nif (n > 0){\nv = velocityAtTime(key(n).time - thisComp.frameDuration/10);\nif(amp > 0 && freq > 0 && decay > 0){\nvalueAtTime(time) + v*amp*(ease/100)*Math.sin(freq*t*2*Math.PI)/Math.exp(decay*t);\n}\nelse{\nvalueAtTime(time);\n}\n}\nelse{\nvalue;\n}\n";
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Wiggly Max Amount").expression = exp;
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Wiggly Min Amount").expression =
              '\n//\nvar animName = "' +
              animName +
              '"\ntext.animator(animName).selector("ADBE Text Wiggly Selector").maxAmount*-1';
            txtAnGrp
              .property(aai + 1)
              .property("ADBE Text Selectors")
              .property(1)
              .property("ADBE Text Wiggly Min Amount").expressionEnabled = true;
          }
        }
        function checkNet() {
          if (
            app.preferences.getPrefAsLong(
              "Main Pref Section",
              "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
            ) != 1
          ) {
            alert(
              'Please tick the "Allow Scripts to Write Files and Access Network" checkbox if Preferences > General',
            );
            app.executeCommand(2359);
            if (
              app.preferences.getPrefAsLong(
                "Main Pref Section",
                "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
              ) != 1
            ) {
              var chkNet = "No";
            } else {
              var chkNet = "Yes";
            }
          }
        }
        function checkFolder(presetFolder) {
          if (presetFolder.exists) {
            if (iconsFolder.exists) {
              var iconsNum = iconsFolder.getFiles();
              if (
                iconsNum.length == null ||
                iconsNum.length != myIcons.length
              ) {
                createIcons();
              }
            } else {
              iconsFolder.create();
              createIcons();
            }
          } else {
            var createFolder = presetFolder.create();
            if (presetFolder.exists) {
              iconsFolder.create();
              createIcons();
            } else {
              alert("Can\'t access Files. Can\'t create folder");
            }
          }
          return presetFolder.toString();
        }
        function createIcons() {
          myPng = [];
          for (var i = 0; i < myIcons.length; i = i + 1) {
            myPng[i] = new File(
              Folder.userData.toString() + "/Textor/Icons//Image_" + i + ".png",
            );
            myPng[i].encoding = "BINARY";
            myPng[i].open("w");
            myPng[i].write(myIcons[i]);
            myPng[i].close();
          }
        }
        function getPresets(chkNet) {
          checkNet();
          checkFolder(presetFolder);
          if (chkNet == "No") {
            alert("Can\'t access Files. Change preferences settings");
          } else {
            if (File(activeFolder + presetsName).exists) {
              var docSource = File(activeFolder + presetsName);
              docSource.open("r");
              presetText = docSource.read();
              docSource.close();
              presetsArray = eval(presetText);
              presetsList.removeAll();
              if (presetsArray != null) {
                for (
                  var activeItem = 0;
                  activeItem < presetsArray.length;
                  activeItem += 1
                ) {
                  var presetItem = presetsArray[activeItem][0].toString();
                  presetsList.add("item", presetItem);
                }
              }
            } else {
              makePreset();
              var fileToSave = new File(activeFolder + "Presets.textor");
              fileToSave.open("w");
              fileToSave.write(presetText);
              fileToSave.close();
              presetsBt.text = "Preset saved succesfully!";
              getPresets();
            }
          }
        }
        function importPreset(chkNet) {
          presetsList.selection = [];
          checkNet();
          checkFolder(presetFolder);
          if (chkNet == "No") {
            presetsBt.text = "Can\'t access files. Change preferences settings";
          } else {
            if (isTrial == true && presetsList.items.length > 0) {
              alert(
                "Preset already present in the list.\nNo more presets can be imported in trial mode.",
              );
            } else {
              presetText = "";
              var loadPresets = File.openDialog(
                "Choose Textor presets file import:",
              );
              if (loadPresets) {
                var importFile = loadPresets.toString();
                var docSource = File(importFile);
                docSource.open("r");
                presetText = docSource.read();
                docSource.close();
                if (typeofeval(presetText) === "undefined") {
                  presetsBt.text = "Presets file empty! Can\'t import";
                } else {
                  function importItems() {
                    var impPresetsAr = [];
                    for (
                      var actPr = 0;
                      actPr < importList.selection.length;
                      actPr += 1
                    ) {
                      var api = importList.selection[actPr].index;
                      impPresetsAr[actPr] = presetsImportAr[api];
                    }
                    if (isTrial == true && impPresetsAr.length > 1) {
                      alert("Only 1 preset can be imported in trial mode.");
                    } else {
                      if (impPresetsAr.length > 0) {
                        for (
                          var activePr = 0;
                          activePr < impPresetsAr.length;
                          activePr += 1
                        ) {
                          presetsArray.push(impPresetsAr[activePr]);
                        }
                      }
                      presetsList.removeAll();
                      for (
                        var activeItem = 0;
                        activeItem < presetsArray.length;
                        activeItem += 1
                      ) {
                        var presetItem = presetsArray[activeItem][0].toString();
                        presetsList.add("item", presetItem);
                      }
                      makePresetsText();
                      var fileToSave = new File(
                        activeFolder + "Presets.textor",
                      );
                      fileToSave.open("w");
                      fileToSave.write(presetText);
                      fileToSave.close();
                      presetsBt.text = "Presets imported succesfully!";
                      getPresets();
                    }
                  }
                  var importWindow = new Window(
                    "dialog",
                    "Select presets to import:",
                    undefined,
                    { resizeable: true },
                  );
                  importWindow.orientation = "column";
                  importWindow.preferredSize = [300, 500];
                  importWindow.layout.layout(true);
                  importWindow.layout.resize();
                  importWindow.onResizing = importWindow.onResize =
                    function () {
                      importWindow.layout.resize();
                    };
                  var importList = importWindow.add("listbox", undefined, "", {
                    multiselect: true,
                  });
                  importList.alignment = ["fill", "fill"];
                  importList.orientation = "row";
                  var importAdd_Grp = importWindow.add("group");
                  importAdd_Grp.orientation = "row";
                  importAdd_Grp.maximumSize = [200, 70];
                  importAdd_Grp.alignment = ["fill", "bottom"];
                  importAdd_Grp.alignChildren = ["fill", "fill"];
                  var importAddBt = importAdd_Grp.add(
                    "button",
                    undefined,
                    "Import",
                  );
                  var importCancelBt = importAdd_Grp.add(
                    "button",
                    undefined,
                    "Cancel",
                  );
                  var presetsImportAr = eval(presetText);
                  for (var ii = 0; ii < presetsImportAr.length; ii += 1) {
                    var importItem = presetsImportAr[ii][0].toString();
                    importList.add("item", importItem);
                  }
                  importAddBt.onClick = function () {
                    importItems();
                    importWindow.close();
                  };
                  importList.onDoubleClick = function () {
                    importItems();
                    importWindow.close();
                  };
                  importWindow.show();
                }
              }
            }
          }
        }
        function exportPreset(chkNet) {
          checkNet();
          if (chkNet == "No") {
            presetsBt.text = "Can\'t access files. Change preferences settings";
          } else {
            if (presetsArray == null) {
              presetsBt.text = "Can\'t export: presets list doesn\'t exist";
            } else {
              if (presetsList.selection == null) {
                presetsBt.text = "Select at least 1 preset to export!";
              } else {
                if (presetsList.selection.length > 0) {
                  var expPresetsAr = [];
                  for (
                    var actPr = 0;
                    actPr < presetsList.selection.length;
                    actPr += 1
                  ) {
                    var api = presetsList.selection[actPr].index;
                    expPresetsAr[actPr] = presetsArray[api];
                  }
                  if (isTrial == true && expPresetsAr.length > 1) {
                    alert("Only 1 preset can be exported in trial mode.");
                  } else {
                    presetsArray = expPresetsAr;
                    var savePresets = File.saveDialog("Save Presets as:");
                    if (savePresets) {
                      var exportName = savePresets
                        .toString()
                        .split("/")
                        .pop()
                        .toString();
                      var exportFolder = savePresets
                        .toString()
                        .split(exportName)[0]
                        .toString();
                      makePresetsText();
                      if (exportName.indexOf(".textor") >= 0) {
                        var fileToSave = new File(exportFolder + exportName);
                      } else {
                        var fileToSave = new File(
                          exportFolder + exportName + ".textor",
                        );
                      }
                      fileToSave.open("w");
                      fileToSave.write(presetText);
                      fileToSave.close();
                      getPresets(chkNet);
                      presetsBt.text = "Presets Exported succesfully!";
                    } else {
                      presetsBt.text = "";
                    }
                  }
                }
              }
            }
          }
        }
        function addPresetFunc() {
          var keyState = ScriptUI.environment.keyboardState;
          if (keyState.shiftKey) {
            removeAllAnims = "No";
            addPreset();
            update();
          } else {
            removeAllAnims = "Yes";
            addPreset();
            update();
          }
        }
        function addPreset(chkNet) {
          checkNet();
          checkFolder(presetFolder);
          checkLayer();
          if (checkText == "No") {
            presetsBt.text = "Select a text layer and click SAVE again";
          } else {
            if (chkNet == "No") {
              presetsBt.text = "Can\'t access files. Change  preferences";
            } else {
              if (
                (checkText == "Yes" || checkText == "Multi") &&
                presetsArray.length != 0
              ) {
                if (
                  presetsList.selection == null ||
                  presetsList.selection.length < 1
                ) {
                  presetsBt.text = "Select 1 preset first";
                } else {
                  if (presetsList.selection.length > 1) {
                    presetsBt.text = "Select only 1 preset";
                  } else {
                    var presetName = presetsList.selection[0].text;
                    if (removeAllAnims == "Yes") {
                      var applyConfirm = confirm(
                        "APPLY preset \'" + presetName + "\' ?",
                      );
                    }
                    if (removeAllAnims == "No") {
                      var applyConfirm = confirm(
                        "ADD preset \'" + presetName + "\' ?",
                      );
                    }
                    if (applyConfirm) {
                      app.beginUndoGroup("Apply preset");
                      deselect();
                      selectedLayers = app.project.activeItem.selectedLayers;
                      if (removeAllAnims == "Yes") {
                        for (
                          var activeL = 0;
                          activeL < selectedLayers.length;
                          activeL += 1
                        ) {
                          selectedLayer = selectedLayers[activeL];
                          txtAnGrp = selectedLayer
                            .property("ADBE Text Properties")
                            .property("ADBE Text Animators");
                          var markers = selectedLayer.property("Marker");
                          for (
                            var activeAnim = markers.numKeys;
                            activeAnim > 0;
                            activeAnim--
                          ) {
                            markers.removeKey(activeAnim);
                          }
                          selectedLayer
                            .property("ADBE Text Properties")
                            .property("ADBE Text More Options")
                            .property(
                              "ADBE Text Anchor Point Align",
                            ).expression = "";
                          for (
                            var activeAnim = txtAnGrp.numProperties;
                            activeAnim > 0;
                            activeAnim--
                          ) {
                            txtAnGrp.property(activeAnim).remove();
                          }
                        }
                      }
                      animExpSet();
                      for (
                        var activeItem = 0;
                        activeItem < selectedLayers.length;
                        activeItem += 1
                      ) {
                        selectedLayer = selectedLayers[activeItem];
                        txtAnGrp = selectedLayer
                          .property("ADBE Text Properties")
                          .property("ADBE Text Animators");
                        animSeqNum = 0;
                        wiggleSeqNum = 0;
                        animatorNumNew = txtAnGrp.numProperties;
                        if (txtAnGrp.numProperties > 0) {
                          var expVal = selectedLayer
                            .property("ADBE Text Properties")
                            .property("ADBE Text More Options")
                            .property(
                              "ADBE Text Anchor Point Align",
                            ).expression;
                          oldValsAr = eval(
                            expVal.substring(
                              expVal.lastIndexOf("/*") + 2,
                              expVal.lastIndexOf("*/"),
                            ),
                          );
                          for (
                            var activeAn = 0;
                            activeAn < txtAnGrp.numProperties;
                            activeAn += 1
                          ) {
                            if (
                              txtAnGrp
                                .property(activeAn + 1)
                                .property("ADBE Text Selectors")
                                .property("ADBE Text Expressible Selector") !=
                              null
                            ) {
                              animType = "Expression";
                              animSeqNum = animSeqNum + 1;
                            }
                            if (
                              txtAnGrp
                                .property(activeAn + 1)
                                .property("ADBE Text Selectors")
                                .property("ADBE Text Wiggly Selector") != null
                            ) {
                              animType = "Wiggle";
                              wiggleSeqNum = wiggleSeqNum + 1;
                            }
                            animName = txtAnGrp.property(activeAn + 1).name;
                            if (
                              txtAnGrp.property(activeAn + 1).enabled == true
                            ) {
                              var checkMarked = "true";
                            } else {
                              var checkMarked = "false";
                            }
                            oldValsAr[activeAn][0] = [
                              animName,
                              checkMarked,
                              animType,
                            ];
                          }
                        }
                        var activePr = presetsList.selection[0].index;
                        var totalAnims = presetsArray[activePr][3].length;
                        presetsValsAr = presetsArray[activePr][3].slice(
                          presetsArray[activePr][3],
                        );
                        if (txtAnGrp.numProperties > 0) {
                          for (
                            var activeAn = txtAnGrp.numProperties - 1;
                            activeAn >= 0;
                            activeAn--
                          ) {
                            presetsValsAr.unshift(oldValsAr[activeAn]);
                          }
                        }
                        for (
                          var activeAnim = 0;
                          activeAnim < totalAnims;
                          activeAnim += 1
                        ) {
                          animatorNumNew = animatorNumNew + 1;
                          animType =
                            presetsArray[activePr][3][
                              activeAnim
                            ][0][2].toString();
                          presetAnimName =
                            presetsArray[activePr][3][
                              activeAnim
                            ][0][0].toString();
                          add();
                          if (removeAllAnims == "Yes") {
                            txtAnGrp.property(activeAnim + 1).name =
                              presetAnimName;
                            setExpression();
                          }
                          if (removeAllAnims == "No") {
                            txtAnGrp.property(txtAnGrp.numProperties).name =
                              presetAnimName;
                            setExpression();
                          }
                        }
                        for (
                          var activeAnim = 0;
                          activeAnim < txtAnGrp.numProperties;
                          activeAnim += 1
                        ) {
                          if (
                            oldValsAr != null &&
                            activeAnim < oldValsAr.length
                          ) {
                            kT1 =
                              presetsValsAr[activeAnim][43][3] *
                              app.project.activeItem.frameDuration;
                            kT2 =
                              presetsValsAr[activeAnim][43][4] *
                              app.project.activeItem.frameDuration;
                          } else {
                            kT1 =
                              presetsValsAr[activeAnim][43][3] *
                                app.project.activeItem.frameDuration +
                              app.project.activeItem.time;
                            kT2 =
                              presetsValsAr[activeAnim][43][4] *
                                app.project.activeItem.frameDuration +
                              app.project.activeItem.time;
                          }
                          if (
                            txtAnGrp
                              .property(activeAnim + 1)
                              .property("ADBE Text Selectors")
                              .property("ADBE Text Expressible Selector") !=
                            null
                          ) {
                            var selector = txtAnGrp
                              .property(activeAnim + 1)
                              .property("ADBE Text Selectors")
                              .property(1)
                              .property("ADBE Text Expressible Amount");
                            selector.removeKey(2);
                            selector.removeKey(1);
                            selector.setValueAtTime(kT1, [100, 100, 100]);
                            selector.setInterpolationTypeAtKey(
                              selector.nearestKeyIndex(kT1),
                              KeyframeInterpolationType.BEZIER,
                            );
                            selector.setValueAtTime(kT2, [0, 0, 0]);
                            selector.setInterpolationTypeAtKey(
                              selector.nearestKeyIndex(kT2),
                              KeyframeInterpolationType.BEZIER,
                            );
                          }
                          if (
                            txtAnGrp
                              .property(activeAnim + 1)
                              .property("ADBE Text Selectors")
                              .property("ADBE Text Wiggly Selector") != null
                          ) {
                            var selector = txtAnGrp
                              .property(activeAnim + 1)
                              .property("ADBE Text Selectors")
                              .property(1)
                              .property("ADBE Text Wiggly Max Amount");
                            selector.removeKey(2);
                            selector.removeKey(1);
                            selector.setValueAtTime(
                              kT1,
                              presetsValsAr[activeAnim][33][1],
                            );
                            selector.setInterpolationTypeAtKey(
                              selector.nearestKeyIndex(kT1),
                              KeyframeInterpolationType.BEZIER,
                            );
                            selector.setValueAtTime(kT2, 0);
                            selector.setInterpolationTypeAtKey(
                              selector.nearestKeyIndex(kT2),
                              KeyframeInterpolationType.BEZIER,
                            );
                          }
                        }
                        update();
                        animExpSet();
                        for (
                          var activeAnim = 0;
                          activeAnim < txtAnGrp.numProperties;
                          activeAnim += 1
                        ) {
                          selector.setSelectedAtKey(1, false);
                          selector.setSelectedAtKey(2, false);
                          selector.selected = false;
                        }
                        for (
                          var activeAnim = 0;
                          activeAnim < txtAnGrp.numProperties;
                          activeAnim += 1
                        ) {
                          aai = activeAnim;
                          var chkMark =
                            presetsValsAr[activeAnim][0][1].toString();
                          if (chkMark == "true") {
                            txtAnGrp.property(aai + 1).enabled = true;
                          } else {
                            txtAnGrp.property(aai + 1).enabled = false;
                          }
                          for (var el = 1; el < elem.length; el += 1) {
                            actvPnl = el;
                            animSet();
                          }
                        }
                        presetsValsAr = [];
                        var markers = selectedLayer.property("Marker");
                        for (
                          var activeAnim = markers.numKeys;
                          activeAnim > 0;
                          activeAnim--
                        ) {
                          markers.removeKey(activeAnim);
                        }
                        var MinMax = [];
                        var counter = 0;
                        for (var anim = 0; anim < oldValsAr.length; anim += 1) {
                          for (var val = 0; val < 2; val += 1) {
                            MinMax[counter + val] =
                              parseInt(oldValsAr[anim][43][3 + val]) +
                              app.project.activeItem.time *
                                (1 / app.project.activeItem.frameDuration);
                          }
                          counter = counter + 2;
                        }
                        var markerIn =
                          Math.min.apply(Math, MinMax) *
                          app.project.activeItem.frameDuration;
                        var markerOut =
                          Math.max.apply(Math, MinMax) *
                          app.project.activeItem.frameDuration;
                        selectedLayer
                          .property("Marker")
                          .setValueAtTime(markerIn, new MarkerValue(""));
                        selectedLayer
                          .property("Marker")
                          .setValueAtTime(markerOut, new MarkerValue(""));
                        var anchorGrpVal = presetsArray[activePr][1];
                        var anchorGrpChk = eval(presetsArray[activePr][2]);
                        selectedLayer
                          .property("ADBE Text Properties")
                          .property("ADBE Text More Options")
                          .property("ADBE Text Anchor Point Option")
                          .setValue(anchorGrpVal);
                        txtAnchorChk.value = anchorGrpChk;
                        animExpSet();
                        anchorGrpUpd();
                      }
                      presetsBt.text =
                        "\'" +
                        presetsList.selection[0].text +
                        "\' preset applied!";
                      app.endUndoGroup();
                    }
                  }
                }
              }
            }
          }
        }
        function moveDownPresets(chkNet) {
          checkNet();
          checkFolder(presetFolder);
          if (chkNet == "No") {
            presetsBt.text = "Can\'t access files. Change preferences settings";
          } else {
            if (presetsList.selection == null) {
              presetsBt.text = "Select at least 1 presets to move down!";
            } else {
              var movingArray = [];
              for (
                var activeItem = 0;
                activeItem < presetsList.selection.length;
                activeItem += 1
              ) {
                movingArray[activeItem] =
                  presetsList.selection[activeItem].index;
              }
              presetsList.selection = null;
              if (movingArray.length > 1 && movingArray[0] > movingArray[1]) {
                movingArray.reverse();
              }
              if (
                movingArray.length == presetsList.items.length ||
                movingArray[movingArray.length - 1] ==
                  presetsList.items.length - 1
              ) {
                presetsBt.text = "";
                presetsList.selection = null;
                presetsList.selection = movingArray;
              } else {
                var selectedPresets = [];
                for (
                  var activeItem = movingArray.length - 1;
                  activeItem >= 0;
                  activeItem--
                ) {
                  var movingNum = movingArray[activeItem];
                  selectedPresets[activeItem] = movingNum + 1;
                  var fromIndex = movingNum;
                  var toIndex = fromIndex + 1;
                  presetsArray.splice(
                    toIndex,
                    0,
                    presetsArray.splice(fromIndex, 1)[0],
                  );
                }
                makePresetsText();
                var fileToSave = new File(activeFolder + presetsName);
                fileToSave.open("w");
                fileToSave.write(presetText);
                fileToSave.close();
                presetsBt.text = "Presets moved up succesfully!";
                getPresets();
                presetsList.selection = null;
                presetsList.selection = selectedPresets;
              }
            }
          }
        }
        function moveUpPresets(chkNet) {
          checkNet();
          checkFolder(presetFolder);
          if (chkNet == "No") {
            presetsBt.text = "Can\'t access files. Change preferences settings";
          } else {
            if (presetsList.selection == null) {
              presetsBt.text = "Select at least 1 presets to move up!";
            } else {
              var movingArray = [];
              for (
                var activeItem = 0;
                activeItem < presetsList.selection.length;
                activeItem += 1
              ) {
                movingArray[activeItem] =
                  presetsList.selection[activeItem].index;
              }
              presetsList.selection = null;
              if (movingArray.length > 1 && movingArray[0] > movingArray[1]) {
                movingArray.reverse();
              }
              if (
                movingArray.length == presetsList.items.length ||
                movingArray[0] == 0
              ) {
                presetsBt.text = "";
                presetsList.selection = null;
                presetsList.selection = movingArray;
              } else {
                var selectedPresets = [];
                for (
                  var activeItem = 0;
                  activeItem < movingArray.length;
                  activeItem += 1
                ) {
                  var movingNum = movingArray[activeItem];
                  selectedPresets[activeItem] = movingNum - 1;
                  var fromIndex = movingNum;
                  var toIndex = fromIndex - 1;
                  presetsArray.splice(
                    toIndex,
                    0,
                    presetsArray.splice(fromIndex, 1)[0],
                  );
                }
                makePresetsText();
                var fileToSave = new File(activeFolder + presetsName);
                fileToSave.open("w");
                fileToSave.write(presetText);
                fileToSave.close();
                presetsBt.text = "Presets moved up succesfully!";
                getPresets();
                presetsList.selection = null;
                presetsList.selection = selectedPresets;
              }
            }
          }
        }
        function renamePreset(chkNet) {
          checkNet();
          checkFolder(presetFolder);
          if (chkNet == "No") {
            presetsBt.text = "Can\'t access files. Change preferences settings";
          } else {
            if (presetsList.selection == null) {
              presetsBt.text = "Select at least 1 presets to rename!";
            } else {
              var oriPresetName = [];
              for (
                var activeItem = 0;
                activeItem < presetsList.items.length;
                activeItem += 1
              ) {
                oriPresetName[activeItem] = presetsList.items[activeItem].text;
              }
              for (
                var activeItem = 0;
                activeItem < presetsList.selection.length;
                activeItem += 1
              ) {
                var oldName = presetsList.selection[activeItem].text;
                var promptPresetName = prompt("New preset name:", oldName);
                if (promptPresetName == null) {
                } else {
                  var renamingNum = presetsList.selection[activeItem].index;
                  presetsArray[renamingNum][0] = promptPresetName;
                }
              }
              for (
                var activeItem = 0;
                activeItem < presetsList.items.length;
                activeItem += 1
              ) {
                var newPresetName = presetsArray[activeItem][0].toString();
                for (
                  var activeChk = 0;
                  activeChk < presetsList.items.length;
                  activeChk += 1
                ) {
                  if (newPresetName === oriPresetName[activeChk].toString()) {
                    if (activeItem == activeChk) {
                    } else {
                      newPresetName =
                        newPresetName +
                        " was (" +
                        oriPresetName[activeItem].toString() +
                        ")";
                      presetsArray[activeItem][0] = newPresetName;
                    }
                  }
                }
              }
              makePresetsText();
              var fileToSave = new File(activeFolder + presetsName);
              fileToSave.open("w");
              fileToSave.write(presetText);
              fileToSave.close();
              getPresets();
            }
          }
        }
        function removePreset(chkNet) {
          checkNet();
          checkFolder(presetFolder);
          if (chkNet == "No") {
            presetsBt.text = "Can\'t access files. Change preferences settings";
          } else {
            if (presetsList.selection == null) {
              presetsBt.text = "Select at least 1 presets to remove!";
            } else {
              var applyConfirm = confirm(
                "Are you sure you want to delete selected presets?",
              );
              if (applyConfirm) {
                var removingArray = [];
                for (
                  var activeItem = presetsList.selection.length - 1;
                  activeItem >= 0;
                  activeItem--
                ) {
                  removingArray[activeItem] =
                    presetsList.selection[activeItem].index;
                  presetsArray.splice(removingArray[activeItem], 1);
                }
                makePresetsText();
                var fileToSave = new File(activeFolder + presetsName);
                fileToSave.open("w");
                fileToSave.write(presetText);
                fileToSave.close();
                presetsBt.text = "Presets removed succesfully!";
                getPresets();
              }
            }
          }
        }
        function newPreset(chkNet) {
          checkLayer();
          checkNet();
          checkFolder(presetFolder);
          if (checkText == "No" || checkText == "Multi") {
            presetsBt.text = "Select 1 text layer and click SAVE again";
          } else {
            if (isTrial == true && presetsList.items.length > 0) {
              alert(
                "Preset already present in the list.\nNo more presets can be saved in trial mode.",
              );
            } else {
              if (chkNet == "No") {
                presetsBt.text =
                  "Can\'t access files. Change preferences settings";
              } else {
                animExpSet();
                selectedLayer = app.project.activeItem.selectedLayers[0];
                txtAnGrp = selectedLayer
                  .property("ADBE Text Properties")
                  .property("ADBE Text Animators");
                var expVal = selectedLayer
                  .property("ADBE Text Properties")
                  .property("ADBE Text More Options")
                  .property("ADBE Text Anchor Point Align").expression;
                oldValsAr = eval(
                  expVal.substring(
                    expVal.lastIndexOf("/*") + 2,
                    expVal.lastIndexOf("*/"),
                  ),
                );
                if (oldValsAr.length == 0) {
                  presetsBt.text = "No valid animators present. Can\'t save!";
                } else {
                  var minKeyArr = [];
                  for (
                    var activekey = 0;
                    activekey < oldValsAr.length;
                    activekey += 1
                  ) {
                    minKeyArr[activekey] = oldValsAr[activekey][43][3];
                  }
                  Math.min.apply(Math, minKeyArr);
                  keyTimeMin = Math.min.apply(Math, minKeyArr);
                  if (presetsList.selection != null) {
                    var oldName = presetsList.selection[0].text;
                  } else {
                    var oldName = "New preset name";
                  }
                  var newPresetName = prompt("Save preset as:", oldName);
                  if (newPresetName) {
                    if (presetsArray == null || presetsArray.length == 0) {
                      presetsArray = [];
                      newPresetNum = 0;
                    } else {
                      newPresetNum = presetsArray.length;
                    }
                    var overWrite = true;
                    for (
                      var activeName = 0;
                      activeName < presetsArray.length;
                      activeName += 1
                    ) {
                      var presetName = presetsArray[activeName][0].toString();
                      if (newPresetName == presetName) {
                        var overWrite = confirm(
                          "Overwrite preset: " + presetName + "?",
                        );
                        newPresetNum = activeName;
                      }
                    }
                    if (overWrite == false) {
                      presetsBt.text = "Preset not saved";
                    } else {
                      if (presetsArray == null) {
                        presetsArray = [];
                      }
                      AnValAr = oldValsAr.slice(oldValsAr);
                      for (
                        var activeItem = 0;
                        activeItem < AnValAr.length;
                        activeItem += 1
                      ) {
                        var animName = txtAnGrp.property(activeItem + 1).name;
                        if (txtAnGrp.property(activeItem + 1).enabled == true) {
                          var checkMark = "true";
                        } else {
                          var checkMark = "false";
                        }
                        if (
                          txtAnGrp
                            .property(activeItem + 1)
                            .property("ADBE Text Selectors")
                            .property("ADBE Text Expressible Selector") != null
                        ) {
                          var animType = "Expression";
                        }
                        if (
                          txtAnGrp
                            .property(activeItem + 1)
                            .property("ADBE Text Selectors")
                            .property("ADBE Text Wiggly Selector") != null
                        ) {
                          var animType = "Wiggle";
                        }
                        AnValAr[activeItem][0][0] = animName;
                        AnValAr[activeItem][0][1] = checkMark;
                        AnValAr[activeItem][0][2] = animType;
                      }
                      achorVal = expVal
                        .split("//")[3]
                        .toString()
                        .split(" anchorGrpVal = \'")[1]
                        .toString()
                        .slice(0, -2)
                        .toString();
                      var anchorGrpChk = expVal
                        .split("//")[5]
                        .toString()
                        .split(" anchorGrpChk = \'")[1]
                        .toString()
                        .slice(0, -2)
                        .toString();
                      presetsArray[newPresetNum] = [
                        newPresetName,
                        achorVal,
                        anchorGrpChk,
                        AnValAr,
                      ];
                      makePreset();
                      var fileToSave = new File(
                        activeFolder + "Presets.textor",
                      );
                      fileToSave.open("w");
                      fileToSave.write(presetText);
                      fileToSave.close();
                      presetsBt.text = "Preset saved succesfully!";
                      getPresets();
                    }
                  }
                }
              }
            }
          }
        }
        function makePresetsText() {
          presetText = "";
          presetText = presetText + "[\n";
          for (var aPr = 0; aPr < presetsArray.length; aPr += 1) {
            presetText =
              presetText + "[\'" + presetsArray[aPr][0].toString() + "\',";
            presetText =
              presetText + "\'" + presetsArray[aPr][1].toString() + "\',";
            presetText =
              presetText + "\'" + presetsArray[aPr][2].toString() + "\',\n";
            presetText = presetText + "[";
            for (
              var aAnim = 0;
              aAnim < presetsArray[aPr][3].length;
              aAnim += 1
            ) {
              presetText = presetText + "[";
              for (
                var aCat = 0;
                aCat < presetsArray[aPr][3][aAnim].length;
                aCat += 1
              ) {
                presetText = presetText + "[";
                for (
                  var aVal = 0;
                  aVal < presetsArray[aPr][3][aAnim][aCat].length;
                  aVal += 1
                ) {
                  presetText =
                    presetText +
                    "\'" +
                    presetsArray[aPr][3][aAnim][aCat][aVal].toString() +
                    "\',";
                }
                presetText = presetText + "],\n";
              }
              presetText = presetText + "],\n\n";
            }
            presetText = presetText + "]],\n\n\n";
          }
          presetText = presetText + "]";
        }
        function makePreset() {
          presetText = "";
          presetText = presetText + "[\n";
          for (var aPr = 0; aPr < presetsArray.length; aPr += 1) {
            presetText =
              presetText + "[\'" + presetsArray[aPr][0].toString() + "\',";
            presetText =
              presetText + "\'" + presetsArray[aPr][1].toString() + "\',";
            presetText =
              presetText + "\'" + presetsArray[aPr][2].toString() + "\',\n";
            presetText = presetText + "[";
            for (
              var aAnim = 0;
              aAnim < presetsArray[aPr][3].length;
              aAnim += 1
            ) {
              presetText = presetText + "[";
              for (
                var aCat = 0;
                aCat < presetsArray[aPr][3][aAnim].length;
                aCat += 1
              ) {
                presetText = presetText + "[";
                for (
                  var aVal = 0;
                  aVal < presetsArray[aPr][3][aAnim][aCat].length;
                  aVal += 1
                ) {
                  if (newPresetNum == aPr && aCat == 43) {
                    if (aVal == 3 || aVal == 4) {
                      presetsArray[aPr][3][aAnim][aCat][aVal] =
                        Math.round(
                          presetsArray[aPr][3][aAnim][aCat][aVal] * 100,
                        ) /
                          100 -
                        keyTimeMin;
                    }
                  }
                  presetText =
                    presetText +
                    "\'" +
                    presetsArray[aPr][3][aAnim][aCat][aVal].toString() +
                    "\',";
                }
                presetText = presetText + "],\n";
              }
              presetText = presetText + "],\n\n";
            }
            presetText = presetText + "]],\n\n\n";
          }
          presetText = presetText + "]";
        }
        var TextorInfoWin =
          "////////////    Animators panel shortcuts    ////////////\n\n(U)) =  UPDATE anims list.\n(A) =  ADD a new ANIMATOR.\n(W) =  ADD a new WIGGLE.\n(DEL) =  REMOVE the selected ITEMS.\n(SHIFT + DEL) =  REMOVE TEXTOR from selected layers.\n(CTRL + D) =  DUPLICATE the selected anim.\n(X) =  RESET the selected anims.\n(Q) =  RANDOMIZE the selected anims props.\n(ALT + Q) =  EXTREME RANDOMIZE the selected props.\n(SHIFT + Q) =  select All/None RANDOM CHECKMARKS.\n(ENTER) =  RENAME the selected anims.\n(CTRL + UP) = Move animators in the list UP.\n(CTRL + DOWN) = Move animators in the list DOWN.\n\n\n////////////    Presets panel shortcuts    ////////////\n\n(CTRL + S) =  SAVE new preset.\n(CTRL + DEL) =  REMOVE selected presets.\n(ENTER) =  RENAME selected presets.\n(CTRL + I) =  IMPORT presets from file.\n(CTRL + E) =  EXPORT presets to file.\n(CTRL + Z) =  UNDO.\n(SHIFT + CTRL + Z) =  REDO.\n(SPACE + SPACE) =  PREVIEW.\n(CTRL + UP) = Move presets in the list UP.\n(CTRL + DOWN) = Move presets in the list DOWN.";
        var TextorInfoMac =
          "////////////    Animators panel shortcuts    ////////////\n\n(U)) =  UPDATE anims list.\n(A) =  ADD a new ANIMATOR.\n(W) =  ADD a new WIGGLE.\n(DEL) =  REMOVE the selected ITEMS.\n(SHIFT + DEL) =  REMOVE TEXTOR from selected layers.\n(CMD + D) =  DUPLICATE the selected anim.\n(X) =  RESET the selected anims.\n(Q) =  RANDOMIZE the selected anims props.\n(ALT + Q) =  EXTREME RANDOMIZE the selected props.\n(SHIFT + Q) =  select All/None RANDOM CHECKMARKS.\n(ENTER) =  RENAME the selected anims.\n(CMD + UP) = Move animator in the list UP.\n(CMD + DOWN) = Move animator in the list DOWN.\n\n\n////////////    Presets panel shortcuts    ////////////\n\n(CMD + S) =  SAVE new preset.\n(CMD + DEL) =  REMOVE selected presets.\n(ENTER) =  RENAME selected presets.\n(CMD + I) =  IMPORT presets from file.\n(CMD + E) =  EXPORT presets to file.\n(CMD + Z) =  UNDO.\n(SHIFT + CMD + Z) =  REDO.\n(SPACE + SPACE) =  PREVIEW.\n(CMD + UP) = Move presets in the list UP.\n(CMD + DOWN) = Move presets in the list DOWN.";
        var TextorInfo =
          $.os.indexOf("Windows") != -1 ? TextorInfoWin : TextorInfoMac;
        myIcons = [
          __BLOB__BLOB_000698__,
          __BLOB__BLOB_000699__,
          __BLOB__BLOB_000700__,
          __BLOB__BLOB_000701__,
          __BLOB__BLOB_000702__,
          __BLOB__BLOB_000703__,
          __BLOB__BLOB_000704__,
          __BLOB__BLOB_000705__,
          __BLOB__BLOB_000706__,
          __BLOB__BLOB_000707__,
          __BLOB__BLOB_000708__,
          __BLOB__BLOB_000709__,
          __BLOB__BLOB_000710__,
          __BLOB__BLOB_000711__,
          __BLOB__BLOB_000712__,
          __BLOB__BLOB_000713__,
          __BLOB__BLOB_000714__,
          __BLOB__BLOB_000715__,
          __BLOB__BLOB_000716__,
          __BLOB__BLOB_000717__,
          __BLOB__BLOB_000718__,
          __BLOB__BLOB_000719__,
          __BLOB__BLOB_000720__,
          __BLOB__BLOB_000721__,
        ];
        var title = "Textor 1.1";
        var presetsName = "Presets.textor";
        var activeFolder = Folder.userData.toString() + "/Textor/";
        var presetFolder = Folder(activeFolder);
        var iconsFolder = Folder(activeFolder + "/Icons/");
        var ver = parseInt(app.version.substr(0, 4) * 10) / 10;
        var proj = app.project;
        var activeCompItem = app.project.activeItem;
        var AnValAr = [];
        var animPropsSetArray = [];
        var stdVals = [];
        var elem = [];
        var copyArray = [];
        var selItems = [];
        var presetsArray = [];
        var wiggleSeqNum = 0;
        var animSeqNum = 0;
        var presetsValsAr = [];
        var removedOldVarAr = [];
        var oldValsAr = [];
        var factor = [];
        var limit = [];
        var scaleInd = [];
        var layerStatus = "";
        var randomChkStatus = "";
        var randomStatus = "";
        var fromFocus = "";
        var layerSelection = "";
        var randomCount = 0;
        stdVals[0] = [3, "true"];
        stdVals[1] = [80, 0, "true"];
        stdVals[2] = [80, 0, "true"];
        stdVals[3] = [80, 0, "true"];
        stdVals[4] = [360, 0, "true"];
        stdVals[5] = [360, 0, "true"];
        stdVals[6] = [360, 0, "true"];
        stdVals[7] = [100, 100, "true"];
        stdVals[8] = [100, 100, "true"];
        stdVals[9] = [5, 0, "true"];
        stdVals[10] = [60, 0, "false"];
        stdVals[11] = [60, 0, "false"];
        stdVals[12] = [10, -10, "false"];
        stdVals[13] = [1000, 0, "false"];
        stdVals[14] = [500, 0, "false"];
        stdVals[15] = [15, 0, "false"];
        stdVals[16] = [15, 0, "false"];
        stdVals[17] = [70, 0, "false"];
        stdVals[18] = [360, 0, "false"];
        stdVals[19] = [10, -10, "false"];
        stdVals[20] = [10, -10, "true"];
        stdVals[21] = [40, 10, "true"];
        stdVals[22] = [3, 0.5, "true"];
        stdVals[23] = [3, 4, "true"];
        stdVals[24] = [4, 4, "true"];
        stdVals[25] = [100, 0.1, "true"];
        stdVals[26] = [100, 50, "true"];
        stdVals[27] = [10, 2, "true"];
        stdVals[28] = [10, -10, "false"];
        stdVals[29] = [30, 0, "false"];
        stdVals[30] = [30, 0, "false"];
        stdVals[31] = [40, 10, "true"];
        stdVals[32] = [10, -10, "false"];
        stdVals[33] = [100, 100, "false"];
        stdVals[34] = [100, 0, "false"];
        stdVals[35] = [100, 0.1, "true"];
        stdVals[36] = [100, 50, "true"];
        stdVals[37] = [10, 2, "true"];
        stdVals[38] = [3, 0.5, "false"];
        stdVals[39] = [3, 4, "false"];
        stdVals[40] = [4, 4, "false"];
        stdVals[41] = [100, 100, "true"];
        stdVals[42] = [80, 0, "false"];
        stdVals[43] = [0, 0, "true"];
        stdVals[44] = [0, 0, "true"];
        stdVals[45] = [100, 0, "false"];
        stdVals[46] = [100, 100, "false"];
        elem[1] = [
          "position_X_Val",
          "position_X_Slider",
          "position_X_Txt",
          "position_X_Chk",
          "position_X_Bt",
        ];
        elem[2] = [
          "position_Y_Val",
          "position_Y_Slider",
          "position_Y_Txt",
          "position_Y_Chk",
          "position_Y_Bt",
        ];
        elem[3] = [
          "position_Z_Val",
          "position_Z_Slider",
          "position_Z_Txt",
          "position_Z_Chk",
          "position_Z_Bt",
        ];
        elem[4] = [
          "rotation_X_Val",
          "rotation_X_Slider",
          "rotation_X_Txt",
          "rotation_X_Chk",
          "rotation_X_Bt",
        ];
        elem[5] = [
          "rotation_Y_Val",
          "rotation_Y_Slider",
          "rotation_Y_Txt",
          "rotation_Y_Chk",
          "rotation_Y_Bt",
        ];
        elem[6] = [
          "rotation_Z_Val",
          "rotation_Z_Slider",
          "rotation_Z_Txt",
          "rotation_Z_Chk",
          "rotation_Z_Bt",
        ];
        elem[7] = [
          "scale_X_Val",
          "scale_X_Slider",
          "scale_X_Txt",
          "scale_X_Chk",
          "scale_X_Bt",
        ];
        elem[8] = [
          "scale_Y_Val",
          "scale_Y_Slider",
          "scale_Y_Txt",
          "scale_Y_Chk",
          "scale_Y_Bt",
        ];
        elem[9] = [
          "tracking_Val",
          "tracking_Slider",
          "tracking_Txt",
          "tracking_Chk",
          "tracking_Bt",
        ];
        elem[10] = [
          "line_X_Val",
          "line_X_Slider",
          "line_X_Txt",
          "line_X_Chk",
          "line_X_Bt",
        ];
        elem[11] = [
          "line_Y_Val",
          "line_Y_Slider",
          "line_Y_Txt",
          "line_Y_Chk",
          "line_Y_Bt",
        ];
        elem[12] = [
          "char_range_Val",
          "char_range_Bar",
          "char_range_Txt",
          "char_range_Chk",
          "char_range_Bt",
        ];
        elem[13] = [
          "char_Off_Val",
          "char_Off_Slider",
          "char_Off_Txt",
          "char_Off_Chk",
          "char_Off_Bt",
        ];
        elem[14] = [
          "char_Val_Val",
          "char_Val_Slider",
          "char_Val_Txt",
          "char_Val_Chk",
          "char_Val_Bt",
        ];
        elem[15] = [
          "blur_X_Val",
          "blur_X_Slider",
          "blur_X_Txt",
          "blur_X_Chk",
          "blur_X_Bt",
        ];
        elem[16] = [
          "blur_Y_Val",
          "blur_Y_Slider",
          "blur_Y_Txt",
          "blur_Y_Chk",
          "blur_Y_Bt",
        ];
        elem[17] = [
          "skew_Val",
          "skew_Slider",
          "skew_Txt",
          "skew_Chk",
          "skew_Bt",
        ];
        elem[18] = [
          "skew_Axis_Val",
          "skew_Axis_Slider",
          "skew_Axis_Txt",
          "skew_Axis_Chk",
          "skew_Axis_Bt",
        ];
        elem[19] = [
          "offset_Rev_Val",
          "offset_Rev_Bar",
          "offset_Rev_Txt",
          "offset_Rev_Chk",
          "offset_Rev_Bt",
        ];
        elem[20] = [
          "order_Inv_Val",
          "order_Inv_Bar",
          "order_Inv_Txt",
          "order_Inv_Chk",
          "order_Inv_Bt",
        ];
        elem[21] = [
          "basedOn_Val",
          "basedOn_Bar",
          "basedOn_Txt",
          "basedOn_Chk",
          "basedOn_Bt",
        ];
        elem[22] = [
          "bounce_Val",
          "bounce_Slider",
          "bounce_Txt",
          "bounce_Chk",
          "bounce_Bt",
        ];
        elem[23] = [
          "frequency_Val",
          "frequency_Slider",
          "frequency_Txt",
          "frequency_Chk",
          "frequency_Bt",
        ];
        elem[24] = [
          "decay_Val",
          "decay_Slider",
          "decay_Txt",
          "decay_Chk",
          "decay_Bt",
        ];
        elem[25] = [
          "ease_Start_Val",
          "ease_Start_Slider",
          "ease_Start_Txt",
          "ease_Start_Chk",
          "ease_Start_Bt",
        ];
        elem[26] = [
          "ease_End_Val",
          "ease_End_Slider",
          "ease_End_Txt",
          "ease_End_Chk",
          "ease_End_Bt",
        ];
        elem[27] = [
          "delay_Val",
          "delay_Slider",
          "delay_Txt",
          "delay_Chk",
          "delay_Bt",
        ];
        elem[28] = ["hold_Val", "hold_Bar", "hold_Txt", "hold_Chk", "hold_Bt"];
        elem[29] = [
          "anchor_X_Val",
          "anchor_X_Slider",
          "anchor_X_Txt",
          "anchor_X_Chk",
          "anchor_X_Bt",
        ];
        elem[30] = [
          "anchor_Y_Val",
          "anchor_Y_Slider",
          "anchor_Y_Txt",
          "anchor_Y_Chk",
          "anchor_Y_Bt",
        ];
        elem[31] = [
          "WbasedOn_Val",
          "WbasedOn_Bar",
          "WbasedOn_Txt",
          "WbasedOn_Chk",
          "WbasedOn_Bt",
        ];
        elem[32] = [
          "Woffset_Rev_Val",
          "Woffset_Rev_Bar",
          "Woffset_Rev_Txt",
          "Woffset_Rev_Chk",
          "Woffset_Rev_Bt",
        ];
        elem[33] = [
          "Wamount_Val",
          "Wamount_Slider",
          "Wamount_Txt",
          "Wamount_Chk",
          "Wamount_Bt",
        ];
        elem[34] = [
          "Wcorrelation_Val",
          "Wcorrelation_Slider",
          "Wcorrelation_Txt",
          "Wcorrelation_Chk",
          "Wcorrelation_Bt",
        ];
        elem[35] = [
          "Wease_Start_Val",
          "Wease_Start_Slider",
          "Wease_Start_Txt",
          "Wease_Start_Chk",
          "Wease_Start_Bt",
        ];
        elem[36] = [
          "Wease_End_Val",
          "Wease_End_Slider",
          "Wease_End_Txt",
          "Wease_End_Chk",
          "Wease_End_Bt",
        ];
        elem[37] = [
          "Wspeed_Val",
          "Wspeed_Slider",
          "Wspeed_Txt",
          "Wspeed_Chk",
          "Wspeed_Bt",
        ];
        elem[38] = [
          "Wbounce_Val",
          "Wbounce_Slider",
          "Wbounce_Txt",
          "Wbounce_Chk",
          "Wbounce_Bt",
        ];
        elem[39] = [
          "Wfrequency_Val",
          "Wfrequency_Slider",
          "Wfrequency_Txt",
          "Wfrequency_Chk",
          "Wfrequency_Bt",
        ];
        elem[40] = [
          "Wdecay_Val",
          "Wdecay_Slider",
          "Wdecay_Txt",
          "Wdecay_Chk",
          "Wdecay_Bt",
        ];
        elem[41] = [
          "opacity_Val",
          "opacity_Slider",
          "opacity_Txt",
          "opacity_Chk",
          "opacity_Bt",
        ];
        elem[42] = [
          "anchor_Z_Val",
          "anchor_Z_Slider",
          "anchor_Z_Txt",
          "anchor_Z_Chk",
          "anchor_Z_Bt",
        ];
        elem[43] = ["keys_Val", "keys_Bar", "keys_Txt", "keys_Chk", "keys_Bt"];
        elem[44] = [
          "Wkeys_Val",
          "Wkeys_Bar",
          "Wkeys_Txt",
          "Wkeys_Chk",
          "Wkeys_Bt",
        ];
        elem[45] = [
          "range_Start_Val",
          "range_Start_Slider",
          "range_Start_Txt",
          "range_Start_Chk",
          "range_Start_Bt",
        ];
        elem[46] = [
          "range_End_Val",
          "range_End_Slider",
          "range_End_Txt",
          "range_End_Chk",
          "range_End_Bt",
        ];
        if (!proj) {
          proj = app.newProject();
        }
        checkNet();
        checkFolder(presetFolder);
        var TextorPalette =
          thisObj instanceof Panel
            ? thisObj
            : new Window("palette", title, undefined, { resizeable: true });
        if (TextorPalette == null) {
          return;
        }
        TextorPalette.preferredSize = [330, 550];
        TextorPalette.margins = 0;
        TextorPalette.spacing = 0;
        var undoImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_0.png",
        );
        var redoImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_1.png",
        );
        var addImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_2.png",
        );
        var wiggleImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_3.png",
        );
        var removeImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_4.png",
        );
        var renameImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_5.png",
        );
        var duplicateImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_6.png",
        );
        var resetImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_7.png",
        );
        var saveImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_8.png",
        );
        var deleteImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_9.png",
        );
        var importImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_10.png",
        );
        var exportImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_11.png",
        );
        var applyImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_12.png",
        );
        var logoImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_13.png",
        );
        var upImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_14.png",
        );
        var downImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_15.png",
        );
        var randomImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_19.png",
        );
        var removeAllImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_20.png",
        );
        var randomChkImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_21.png",
        );
        var applyAddImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_22.png",
        );
        var importAddImage = ScriptUI.newImage(
          Folder.userData.toString() + "/Textor/Icons/Image_23.png",
        );
        var content = TextorPalette.add("group");
        content.orientation = "row";
        content.margins = 0;
        content.spacing = -5;
        content.alignment = ["fill", "fill"];
        var rootTab = content.add("tabbedpanel", undefined, "");
        rootTab.orientation = "column";
        rootTab.alignment = ["fill", "fill"];
        var editTab = rootTab.add("tab", undefined, "Animators");
        editTab.orientation = "column";
        editTab.label = "ET";
        editTab.alignment = ["fill", "fill"];
        if (ver >= 13.5) {
          editTab.margins = [10, 10, 0, 5];
        } else {
          if (ver >= 13 && ver < 13.5) {
            editTab.margins = [10, 10, 0, 0];
          } else {
            editTab.margins = [10, 10, 0, 15];
          }
        }
        var update_Grp = editTab.add("group");
        update_Grp.alignment = ["fill", "top"];
        update_Grp.orientation = "row";
        update_Grp.margins = [0, 0, 0, 0];
        var undoBt = update_Grp.add("iconbutton", undefined, undoImage);
        undoBt.maximumSize = [30, 35];
        undoBt.alignment = ["left", "top"];
        undoBt.helpTip =
          $.os.indexOf("Windows") != -1 ? "Undo (CTRL + Z)" : "Undo (CMD + Z)";
        var updateBt = update_Grp.add("button {text:\'UPDATE\'}");
        updateBt.preferredSize = [60, 35];
        updateBt.alignment = ["fill", "top"];
        updateBt.orientation = "column";
        updateBt.helpTip =
          "Click it to update the animators status after selecting a differet layer (U)";
        var redoBt = update_Grp.add("iconbutton", undefined, redoImage);
        redoBt.maximumSize = [30, 35];
        redoBt.alignment = ["right", "top"];
        redoBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "Redo (SHIFT + CTRL + Z)"
            : "Redo (SHIFT + CMD + Z)";
        var animsList_Grp = editTab.add("group");
        animsList_Grp.alignment = ["fill", "top"];
        animsList_Grp.orientation = "row";
        animsList_Grp.minimumSize.height = 155;
        animsList_Grp.minimumSize.width = 307;
        animsList_Grp.margins = [0, 5, 0, 5];
        var moving_buttons_Grp = animsList_Grp.add("group");
        moving_buttons_Grp.alignment = ["left", "top"];
        moving_buttons_Grp.orientation = "column";
        moving_buttons_Grp.alignChildren = ["left", "fill"];
        moving_buttons_Grp.minimumSize.height = 105;
        var upBt = moving_buttons_Grp.add("iconbutton", undefined, upImage);
        upBt.maximumSize = [30, 30];
        upBt.minimumSize.height = 30;
        upBt.alignment = ["left", "top"];
        upBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "Move UP selected animators (CTRL + UP ARROW)"
            : "Move UP selected animators (CMD + UP ARROW)";
        var downBt = moving_buttons_Grp.add("iconbutton", undefined, downImage);
        downBt.maximumSize = [30, 30];
        downBt.minimumSize.height = 30;
        downBt.alignment = ["left", "bottom"];
        downBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "Move DOWN selected animators (CTRL + DOWN ARROW)"
            : "Move DOWN selected animators (CMD + DOWN ARROW)";
        var animsList_Sub_Grp = animsList_Grp.add("group");
        animsList_Sub_Grp.minimumSize = [80, 105];
        animsList_Sub_Grp.minimumSize.height = 95;
        animsList_Sub_Grp.alignment = ["fill", "fill"];
        animsList_Sub_Grp.orientation = "column";
        var animsList = animsList_Sub_Grp.add("listbox", undefined, "", {
          multiselect: true,
        });
        animsList.alignment = ["fill", "fill"];
        animsList.orientation = "row";
        animsList.label = "AL";
        for (var i = 0; i < animsList.items.length; i += 1) {
          animsList.items[i].checked = true;
        }
        var val_buttons_Grp = animsList_Grp.add("group");
        val_buttons_Grp.alignment = ["right", "top"];
        val_buttons_Grp.orientation = "column";
        var renameBt_Grp = val_buttons_Grp.add("group");
        renameBt_Grp.alignment = ["right", "top"];
        renameBt_Grp.orientation = "column";
        renameBt_Grp.margins = [0, 0, 0, 0];
        var renameBt = renameBt_Grp.add("iconbutton", undefined, renameImage);
        renameBt.maximumSize = [30, 30];
        renameBt.alignment = ["right", "top"];
        renameBt.helpTip = "RENAME the selected animators (ENTER)";
        var resetBt_Grp = val_buttons_Grp.add("group");
        resetBt_Grp.alignment = ["right", "top"];
        resetBt_Grp.orientation = "column";
        resetBt_Grp.margins = [0, -3, 0, 0];
        var resetBt = resetBt_Grp.add("iconbutton", undefined, resetImage);
        resetBt.maximumSize = [30, 30];
        resetBt.alignment = ["right", "top"];
        resetBt.helpTip = "RESET the selected animators values (X)";
        var randomBt_Grp = val_buttons_Grp.add("group");
        randomBt_Grp.alignment = ["right", "top"];
        randomBt_Grp.orientation = "column";
        randomBt_Grp.margins = [0, -3, 0, 0];
        var randomBt = randomBt_Grp.add("iconbutton", undefined, randomImage);
        randomBt.maximumSize = [30, 30];
        randomBt.alignment = ["right", "top"];
        randomBt.helpTip =
          "RANDOMIZE the selected animators values by checkmarks (Q).\n\nHold (ALT) or press (ALT + Q) for EXTREME RANDOMIZATION.\n\nHold (SHIFT) or press (SHIFT + Q) to select or deselect randomize properties checkmarks";
        var anim_buttons_Grp = animsList_Sub_Grp.add("group");
        anim_buttons_Grp.alignment = ["fill", "bottom"];
        anim_buttons_Grp.orientation = "row";
        anim_buttons_Grp.alignChildren = ["fill", "top"];
        anim_buttons_Grp.maximumSize.width = 220;
        var addBt_Grp = anim_buttons_Grp.add("group");
        addBt_Grp.alignment = ["right", "top"];
        addBt_Grp.orientation = "row";
        addBt_Grp.alignment = ["fill", "top"];
        var addBt = addBt_Grp.add("iconbutton", undefined, addImage);
        addBt.minimumSize = [30, 30];
        addBt.maximumSize.height = 30;
        addBt.alignment = ["left", "top"];
        addBt.helpTip = "ADD a new ANIMATOR (A)";
        var wiggleBt_Grp = anim_buttons_Grp.add("group");
        wiggleBt_Grp.alignment = ["right", "top"];
        wiggleBt_Grp.orientation = "row";
        wiggleBt_Grp.alignment = ["fill", "top"];
        var wiggleBt = wiggleBt_Grp.add("iconbutton", undefined, wiggleImage);
        wiggleBt.minimumSize = [30, 30];
        wiggleBt.maximumSize.height = 30;
        wiggleBt.alignment = ["center", "top"];
        wiggleBt.helpTip = "ADD a new WIGGLE (W)";
        var duplicateAnimBt_Grp = anim_buttons_Grp.add("group");
        duplicateAnimBt_Grp.alignment = ["right", "top"];
        duplicateAnimBt_Grp.orientation = "row";
        duplicateAnimBt_Grp.alignment = ["fill", "top"];
        var duplicateAnimBt = duplicateAnimBt_Grp.add(
          "iconbutton",
          undefined,
          duplicateImage,
        );
        duplicateAnimBt.minimumSize = [30, 30];
        duplicateAnimBt.maximumSize.height = 30;
        duplicateAnimBt.alignment = ["center", "top"];
        duplicateAnimBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "DUPLICATE the selected animator (CTRL + D)"
            : "DUPLICATE the selected animator (CMD + D)";
        var removeBt_Grp = anim_buttons_Grp.add("group");
        removeBt_Grp.alignment = ["right", "top"];
        removeBt_Grp.orientation = "row";
        removeBt_Grp.alignment = ["fill", "top"];
        var removeBt = removeBt_Grp.add("iconbutton", undefined, removeImage);
        removeBt.minimumSize = [30, 30];
        removeBt.maximumSize.height = 30;
        removeBt.alignment = ["center", "top"];
        removeBt.helpTip =
          "REMOVE the selected ITEMS from selected layer (DEL).";
        var removeAllBt_Grp = anim_buttons_Grp.add("group");
        removeAllBt_Grp.alignment = ["right", "top"];
        removeAllBt_Grp.orientation = "row";
        removeAllBt_Grp.alignment = ["fill", "top"];
        var removeAllBt = removeAllBt_Grp.add(
          "iconbutton",
          undefined,
          removeAllImage,
        );
        removeAllBt.minimumSize = [30, 30];
        removeAllBt.maximumSize.height = 30;
        removeAllBt.alignment = ["right", "top"];
        removeAllBt.helpTip =
          "REMOVE TEXTOR from ALL selected layers (SHIFT + DEL).";
        var txt_anchor_Pnl = editTab.add("panel");
        txt_anchor_Pnl.alignment = ["fill", "top"];
        txt_anchor_Pnl.orientation = "row";
        txt_anchor_Pnl.margins = [10, 10, 10, 10];
        var txtAnchorBt = txt_anchor_Pnl.add("button {text:\'Layer Anchor\'}");
        txtAnchorBt.maximumSize = [75, 16];
        txtAnchorBt.alignment = ["left", "top"];
        var txtAnchorVal = txt_anchor_Pnl.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        txtAnchorVal.alignment = ["left", "top"];
        txtAnchorVal.size = [20, 0];
        var txtAnchorBar = txt_anchor_Pnl.add(
          "scrollbar {minvalue: -40, maxvalue:40, value:10}",
        );
        txtAnchorBar.alignment = ["fill", "top"];
        txtAnchorBar.size = [50, 16];
        var txtAnchorTxt = txt_anchor_Pnl.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        txtAnchorTxt.alignment = ["right", "top"];
        txtAnchorTxt.size = [55, 16];
        var txtAnchorChk = txt_anchor_Pnl.add("checkbox", undefined, "");
        txtAnchorChk.maximumSize = [14, 14];
        var txt_space_Pnl = editTab.add("group");
        txt_space_Pnl.alignment = ["fill", "top"];
        txt_space_Pnl.orientation = "row";
        var editSubTab = editTab.add("tabbedpanel");
        editSubTab.alignment = ["fill", "top"];
        editSubTab.orientation = "column";
        var transTab = editSubTab.add("tab", undefined, "Transform");
        transTab.alignment = ["fill", "top"];
        transTab.orientation = "column";
        transTab.margins = [10, 0, 0, 0];
        var transSubTab = transTab.add("group");
        transSubTab.alignment = ["fill", "top"];
        transSubTab.orientation = "column";
        var anchor_X_Grp = transSubTab.add("group");
        anchor_X_Grp.alignment = ["fill", "top"];
        anchor_X_Grp.orientation = "row";
        anchor_X_Grp.margins = [0, 8, 0, 0];
        var anchor_X_Bt = anchor_X_Grp.add("button {text:\'Anchor X\'}");
        anchor_X_Bt.maximumSize = [60, 16];
        anchor_X_Bt.alignment = ["left", "top"];
        var anchor_X_Val = anchor_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        anchor_X_Val.alignment = ["left", "top"];
        anchor_X_Val.size = [40, 16];
        var anchor_X_Slider = anchor_X_Grp.add("slider");
        anchor_X_Slider.alignment = ["fill", "top"];
        anchor_X_Slider.size = [60, 16];
        var anchor_X_Txt = anchor_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        anchor_X_Txt.alignment = ["right", "top"];
        anchor_X_Txt.size = [55, 16];
        var anchor_X_Chk = anchor_X_Grp.add("checkbox", undefined, "");
        anchor_X_Chk.maximumSize = [14, 14];
        var anchor_Y_Grp = transSubTab.add("group");
        anchor_Y_Grp.alignment = ["fill", "top"];
        anchor_Y_Grp.orientation = "row";
        anchor_Y_Grp.margins = [0, -8, 0, 0];
        var anchor_Y_Bt = anchor_Y_Grp.add("button {text:\'Anchor Y\'}");
        anchor_Y_Bt.maximumSize = [60, 16];
        anchor_Y_Bt.alignment = ["left", "top"];
        var anchor_Y_Val = anchor_Y_Grp.add(
          "edittext {text:\'\', propeties:{readonly: false}}",
        );
        anchor_Y_Val.alignment = ["left", "top"];
        anchor_Y_Val.size = [40, 16];
        var anchor_Y_Slider = anchor_Y_Grp.add("slider");
        anchor_Y_Slider.alignment = ["fill", "top"];
        anchor_Y_Slider.size = [60, 16];
        var anchor_Y_Txt = anchor_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        anchor_Y_Txt.alignment = ["right", "top"];
        anchor_Y_Txt.size = [55, 16];
        var anchor_Y_Chk = anchor_Y_Grp.add("checkbox", undefined, "");
        anchor_Y_Chk.maximumSize = [14, 14];
        var anchor_Z_Grp = transSubTab.add("group");
        anchor_Z_Grp.alignment = ["fill", "top"];
        anchor_Z_Grp.orientation = "row";
        anchor_Z_Grp.margins = [0, -8, 0, 0];
        var anchor_Z_Bt = anchor_Z_Grp.add("button {text:\'Anchor Z\'}");
        anchor_Z_Bt.maximumSize = [60, 16];
        anchor_Z_Bt.alignment = ["left", "top"];
        var anchor_Z_Val = anchor_Z_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        anchor_Z_Val.alignment = ["left", "top"];
        anchor_Z_Val.size = [40, 16];
        var anchor_Z_Slider = anchor_Z_Grp.add("slider");
        anchor_Z_Slider.alignment = ["fill", "top"];
        anchor_Z_Slider.size = [60, 16];
        var anchor_Z_Txt = anchor_Z_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        anchor_Z_Txt.alignment = ["right", "top"];
        anchor_Z_Txt.size = [55, 16];
        var anchor_Z_Chk = anchor_Z_Grp.add("checkbox", undefined, "");
        anchor_Z_Chk.maximumSize = [14, 14];
        var position_X_Grp = transSubTab.add("group");
        position_X_Grp.alignment = ["fill", "top"];
        position_X_Grp.orientation = "row";
        position_X_Grp.margins = [0, 4, 0, 0];
        var position_X_Bt = position_X_Grp.add("button {text:\'Position X\'}");
        position_X_Bt.maximumSize = [60, 16];
        position_X_Bt.alignment = ["left", "top"];
        var position_X_Val = position_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        position_X_Val.alignment = ["left", "top"];
        position_X_Val.size = [40, 16];
        var position_X_Slider = position_X_Grp.add("slider");
        position_X_Slider.alignment = ["fill", "top"];
        position_X_Slider.size = [60, 16];
        var position_X_Txt = position_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        position_X_Txt.alignment = ["right", "top"];
        position_X_Txt.size = [55, 16];
        var position_X_Chk = position_X_Grp.add("checkbox", undefined, "");
        position_X_Chk.maximumSize = [14, 14];
        var position_Y_Grp = transSubTab.add("group");
        position_Y_Grp.alignment = ["fill", "top"];
        position_Y_Grp.orientation = "row";
        position_Y_Grp.margins = [0, -8, 0, 0];
        var position_Y_Bt = position_Y_Grp.add("button {text:\'Position Y\'}");
        position_Y_Bt.maximumSize = [60, 16];
        position_Y_Bt.alignment = ["left", "top"];
        var position_Y_Val = position_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        position_Y_Val.alignment = ["left", "top"];
        position_Y_Val.size = [40, 16];
        var position_Y_Slider = position_Y_Grp.add("slider");
        position_Y_Slider.alignment = ["fill", "top"];
        position_Y_Slider.size = [60, 16];
        var position_Y_Txt = position_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        position_Y_Txt.alignment = ["right", "top"];
        position_Y_Txt.size = [55, 16];
        var position_Y_Chk = position_Y_Grp.add("checkbox", undefined, "");
        position_Y_Chk.maximumSize = [14, 14];
        var position_Z_Grp = transSubTab.add("group");
        position_Z_Grp.alignment = ["fill", "top"];
        position_Z_Grp.orientation = "row";
        position_Z_Grp.margins = [0, -8, 0, 0];
        var position_Z_Bt = position_Z_Grp.add("button {text:\'Position Z\'}");
        position_Z_Bt.maximumSize = [60, 16];
        position_Z_Bt.alignment = ["left", "top"];
        var position_Z_Val = position_Z_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        position_Z_Val.alignment = ["left", "top"];
        position_Z_Val.size = [40, 16];
        var position_Z_Slider = position_Z_Grp.add("slider");
        position_Z_Slider.alignment = ["fill", "top"];
        position_Z_Slider.size = [60, 16];
        var position_Z_Txt = position_Z_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        position_Z_Txt.alignment = ["right", "top"];
        position_Z_Txt.size = [55, 16];
        var position_Z_Chk = position_Z_Grp.add("checkbox", undefined, "");
        position_Z_Chk.maximumSize = [14, 14];
        var rotation_X_Grp = transSubTab.add("group");
        rotation_X_Grp.alignment = ["fill", "top"];
        rotation_X_Grp.orientation = "row";
        rotation_X_Grp.margins = [0, 4, 0, 0];
        var rotation_X_Bt = rotation_X_Grp.add("button {text:\'Rotation X\'}");
        rotation_X_Bt.maximumSize = [60, 16];
        rotation_X_Bt.alignment = ["left", "top"];
        var rotation_X_Val = rotation_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        rotation_X_Val.alignment = ["left", "top"];
        rotation_X_Val.size = [40, 16];
        var rotation_X_Slider = rotation_X_Grp.add("slider");
        rotation_X_Slider.alignment = ["fill", "top"];
        rotation_X_Slider.size = [60, 16];
        var rotation_X_Txt = rotation_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        rotation_X_Txt.alignment = ["right", "top"];
        rotation_X_Txt.size = [55, 16];
        var rotation_X_Chk = rotation_X_Grp.add("checkbox", undefined, "");
        rotation_X_Chk.maximumSize = [14, 14];
        var rotation_Y_Grp = transSubTab.add("group");
        rotation_Y_Grp.alignment = ["fill", "top"];
        rotation_Y_Grp.orientation = "row";
        rotation_Y_Grp.margins = [0, -8, 0, 0];
        var rotation_Y_Bt = rotation_Y_Grp.add("button {text:\'Rotation Y\'}");
        rotation_Y_Bt.maximumSize = [60, 16];
        rotation_Y_Bt.alignment = ["left", "top"];
        var rotation_Y_Val = rotation_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        rotation_Y_Val.alignment = ["left", "top"];
        rotation_Y_Val.size = [40, 16];
        var rotation_Y_Slider = rotation_Y_Grp.add("slider");
        rotation_Y_Slider.alignment = ["fill", "top"];
        rotation_Y_Slider.size = [60, 16];
        var rotation_Y_Txt = rotation_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        rotation_Y_Txt.alignment = ["right", "top"];
        rotation_Y_Txt.size = [55, 16];
        var rotation_Y_Chk = rotation_Y_Grp.add("checkbox", undefined, "");
        rotation_Y_Chk.maximumSize = [14, 14];
        var rotation_Z_Grp = transSubTab.add("group");
        rotation_Z_Grp.alignment = ["fill", "top"];
        rotation_Z_Grp.orientation = "row";
        rotation_Z_Grp.margins = [0, -8, 0, 0];
        var rotation_Z_Bt = rotation_Z_Grp.add("button {text:\'Rotation Z\'}");
        rotation_Z_Bt.maximumSize = [60, 16];
        rotation_Z_Bt.alignment = ["left", "top"];
        var rotation_Z_Val = rotation_Z_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        rotation_Z_Val.alignment = ["left", "top"];
        rotation_Z_Val.size = [40, 16];
        var rotation_Z_Slider = rotation_Z_Grp.add("slider");
        rotation_Z_Slider.alignment = ["fill", "top"];
        rotation_Z_Slider.size = [60, 16];
        var rotation_Z_Txt = rotation_Z_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        rotation_Z_Txt.alignment = ["right", "top"];
        rotation_Z_Txt.size = [55, 16];
        var rotation_Z_Chk = rotation_Z_Grp.add("checkbox", undefined, "");
        rotation_Z_Chk.maximumSize = [14, 14];
        var scale_Grp = transSubTab.add("group");
        scale_Grp.alignment = ["fill", "top"];
        scale_Grp.orientation = "row";
        var scale_Constrain_Chk = scale_Grp.add("checkbox", undefined, "");
        scale_Constrain_Chk.maximumSize = [12, 12];
        var scale_SubGrp = scale_Grp.add("group");
        scale_SubGrp.alignment = ["fill", "top"];
        scale_SubGrp.orientation = "column";
        var scale_X_Grp = scale_SubGrp.add("group");
        scale_X_Grp.alignment = ["fill", "top"];
        scale_X_Grp.orientation = "row";
        scale_X_Grp.margins = [0, 4, 0, 0];
        var scale_X_Bt = scale_X_Grp.add("button {text:\'ScaleX\'}");
        scale_X_Bt.maximumSize = [38, 16];
        scale_X_Bt.alignment = ["left", "top"];
        var scale_X_Val = scale_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        scale_X_Val.alignment = ["left", "top"];
        scale_X_Val.size = [40, 16];
        var scale_X_Slider = scale_X_Grp.add("slider");
        scale_X_Slider.alignment = ["fill", "top"];
        scale_X_Slider.size = [60, 16];
        var scale_X_Txt = scale_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        scale_X_Txt.alignment = ["right", "top"];
        scale_X_Txt.size = [55, 16];
        var scale_X_Chk = scale_X_Grp.add("checkbox", undefined, "");
        scale_X_Chk.maximumSize = [14, 14];
        var scale_Y_Grp = scale_SubGrp.add("group");
        scale_Y_Grp.alignment = ["fill", "top"];
        scale_Y_Grp.orientation = "row";
        scale_Y_Grp.margins = [0, -8, 0, 0];
        var scale_Y_Bt = scale_Y_Grp.add("button {text:\'ScaleY\'}");
        scale_Y_Bt.maximumSize = [38, 16];
        scale_Y_Bt.alignment = ["left", "top"];
        var scale_Y_Val = scale_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        scale_Y_Val.alignment = ["left", "top"];
        scale_Y_Val.size = [40, 16];
        var scale_Y_Slider = scale_Y_Grp.add("slider");
        scale_Y_Slider.alignment = ["fill", "top"];
        scale_Y_Slider.size = [60, 16];
        var scale_Y_Txt = scale_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        scale_Y_Txt.alignment = ["right", "top"];
        scale_Y_Txt.size = [55, 16];
        var scale_Y_Chk = scale_Y_Grp.add("checkbox", undefined, "");
        scale_Y_Chk.maximumSize = [14, 14];
        var opacity_Grp = transSubTab.add("group");
        opacity_Grp.alignment = ["fill", "top"];
        opacity_Grp.orientation = "row";
        opacity_Grp.margins = [0, 4, 0, 0];
        var opacity_Bt = opacity_Grp.add("button {text:\'Opacity\'}");
        opacity_Bt.maximumSize = [60, 16];
        opacity_Bt.alignment = ["left", "top"];
        var opacity_Val = opacity_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        opacity_Val.alignment = ["left", "top"];
        opacity_Val.size = [40, 0];
        var opacity_Slider = opacity_Grp.add("slider");
        opacity_Slider.alignment = ["fill", "top"];
        opacity_Slider.size = [60, 16];
        var opacity_Txt = opacity_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        opacity_Txt.alignment = ["right", "top"];
        opacity_Txt.size = [55, 16];
        var opacity_Chk = opacity_Grp.add("checkbox", undefined, "");
        opacity_Chk.maximumSize = [14, 14];
        var fxTab = editSubTab.add("tab", undefined, "FX");
        fxTab.alignment = ["fill", "top"];
        fxTab.orientation = "column";
        fxTab.margins = [5, 0, -10, 0];
        var fxSubTab = fxTab.add("group");
        fxSubTab.alignment = ["fill", "top"];
        fxSubTab.orientation = "column";
        var skew_Grp = fxSubTab.add("group");
        skew_Grp.alignment = ["fill", "top"];
        skew_Grp.orientation = "row";
        skew_Grp.margins = [5, 8, 0, 0];
        var skew_Bt = skew_Grp.add("button {text:\'Skew\'}");
        skew_Bt.maximumSize = [60, 16];
        skew_Bt.alignment = ["left", "top"];
        var skew_Val = skew_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        skew_Val.alignment = ["left", "top"];
        skew_Val.size = [40, 0];
        var skew_Slider = skew_Grp.add("slider");
        skew_Slider.alignment = ["fill", "top"];
        skew_Slider.size = [60, 16];
        var skew_Txt = skew_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        skew_Txt.alignment = ["right", "top"];
        skew_Txt.size = [55, 16];
        var skew_Chk = skew_Grp.add("checkbox", undefined, "");
        skew_Chk.maximumSize = [14, 14];
        var skew_Axis_Grp = fxSubTab.add("group");
        skew_Axis_Grp.alignment = ["fill", "top"];
        skew_Axis_Grp.orientation = "row";
        skew_Axis_Grp.margins = [5, -8, 0, 0];
        var skew_Axis_Bt = skew_Axis_Grp.add("button {text:\'Skew Axis\'}");
        skew_Axis_Bt.maximumSize = [60, 16];
        skew_Axis_Bt.alignment = ["left", "top"];
        var skew_Axis_Val = skew_Axis_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        skew_Axis_Val.alignment = ["left", "top"];
        skew_Axis_Val.size = [40, 16];
        var skew_Axis_Slider = skew_Axis_Grp.add("slider");
        skew_Axis_Slider.alignment = ["fill", "top"];
        skew_Axis_Slider.size = [60, 16];
        var skew_Axis_Txt = skew_Axis_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        skew_Axis_Txt.alignment = ["right", "top"];
        skew_Axis_Txt.size = [55, 16];
        var skew_Axis_Chk = skew_Axis_Grp.add("checkbox", undefined, "");
        skew_Axis_Chk.maximumSize = [14, 14];
        var tracking_Grp = fxSubTab.add("group");
        tracking_Grp.alignment = ["fill", "top"];
        tracking_Grp.orientation = "row";
        tracking_Grp.margins = [5, 4, 0, 0];
        var tracking_Bt = tracking_Grp.add("button {text:\'Tracking\'}");
        tracking_Bt.maximumSize = [60, 16];
        tracking_Bt.alignment = ["left", "top"];
        var tracking_Val = tracking_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        tracking_Val.alignment = ["left", "top"];
        tracking_Val.size = [40, 16];
        var tracking_Slider = tracking_Grp.add("slider");
        tracking_Slider.alignment = ["fill", "top"];
        tracking_Slider.size = [60, 16];
        var tracking_Txt = tracking_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        tracking_Txt.alignment = ["right", "top"];
        tracking_Txt.size = [55, 16];
        var tracking_Chk = tracking_Grp.add("checkbox", undefined, "");
        tracking_Chk.maximumSize = [14, 14];
        var line_X_Grp = fxSubTab.add("group");
        line_X_Grp.alignment = ["fill", "top"];
        line_X_Grp.orientation = "row";
        line_X_Grp.margins = [5, 4, 0, 0];
        var line_X_Bt = line_X_Grp.add("button {text:\'Line X\'}");
        line_X_Bt.maximumSize = [60, 16];
        line_X_Bt.alignment = ["left", "top"];
        var line_X_Val = line_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        line_X_Val.alignment = ["left", "top"];
        line_X_Val.size = [40, 16];
        var line_X_Slider = line_X_Grp.add("slider");
        line_X_Slider.alignment = ["fill", "top"];
        line_X_Slider.size = [60, 16];
        var line_X_Txt = line_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        line_X_Txt.alignment = ["right", "top"];
        line_X_Txt.size = [55, 16];
        var line_X_Chk = line_X_Grp.add("checkbox", undefined, "");
        line_X_Chk.maximumSize = [14, 14];
        var line_Y_Grp = fxSubTab.add("group");
        line_Y_Grp.alignment = ["fill", "top"];
        line_Y_Grp.orientation = "row";
        line_Y_Grp.margins = [5, -8, 0, 0];
        var line_Y_Bt = line_Y_Grp.add("button {text:\'Line Y\'}");
        line_Y_Bt.maximumSize = [60, 16];
        line_Y_Bt.alignment = ["left", "top"];
        var line_Y_Val = line_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        line_Y_Val.alignment = ["left", "top"];
        line_Y_Val.size = [40, 16];
        var line_Y_Slider = line_Y_Grp.add("slider");
        line_Y_Slider.alignment = ["fill", "top"];
        line_Y_Slider.size = [60, 16];
        var line_Y_Txt = line_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        line_Y_Txt.alignment = ["right", "top"];
        line_Y_Txt.size = [55, 16];
        var line_Y_Chk = line_Y_Grp.add("checkbox", undefined, "");
        line_Y_Chk.maximumSize = [14, 14];
        var char_range_Grp = fxSubTab.add("group");
        char_range_Grp.alignment = ["fill", "top"];
        char_range_Grp.orientation = "row";
        char_range_Grp.margins = [5, 4, 0, 0];
        var char_range_Bt = char_range_Grp.add("button {text:\'Chr Range\'}");
        char_range_Bt.maximumSize = [60, 16];
        char_range_Bt.alignment = ["left", "top"];
        var char_range_Val = char_range_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        char_range_Val.alignment = ["left", "top"];
        char_range_Val.size = [40, 0];
        var char_range_Bar = char_range_Grp.add("scrollbar");
        char_range_Bar.alignment = ["left", "top"];
        char_range_Bar.size = [70, 16];
        var char_range_Txt = char_range_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        char_range_Txt.alignment = ["right", "top"];
        char_range_Txt.size = [55, 16];
        var char_range_Chk = char_range_Grp.add("checkbox", undefined, "");
        char_range_Chk.maximumSize = [14, 14];
        var char_Off_Grp = fxSubTab.add("group");
        char_Off_Grp.alignment = ["fill", "top"];
        char_Off_Grp.orientation = "row";
        char_Off_Grp.margins = [5, -8, 0, 0];
        var char_Off_Bt = char_Off_Grp.add("button {text:\'Chr Offset\'}");
        char_Off_Bt.maximumSize = [60, 16];
        char_Off_Bt.alignment = ["left", "top"];
        var char_Off_Val = char_Off_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        char_Off_Val.alignment = ["left", "top"];
        char_Off_Val.size = [40, 16];
        var char_Off_Slider = char_Off_Grp.add("slider");
        char_Off_Slider.alignment = ["fill", "top"];
        char_Off_Slider.size = [60, 16];
        var char_Off_Txt = char_Off_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        char_Off_Txt.alignment = ["right", "top"];
        char_Off_Txt.size = [55, 16];
        var char_Off_Chk = char_Off_Grp.add("checkbox", undefined, "");
        char_Off_Chk.maximumSize = [14, 14];
        var char_Val_Grp = fxSubTab.add("group");
        char_Val_Grp.alignment = ["fill", "top"];
        char_Val_Grp.orientation = "row";
        char_Val_Grp.margins = [5, -8, 0, 0];
        var char_Val_Bt = char_Val_Grp.add("button {text:\'Chr Value\'}");
        char_Val_Bt.maximumSize = [60, 16];
        char_Val_Bt.alignment = ["left", "top"];
        var char_Val_Val = char_Val_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        char_Val_Val.alignment = ["left", "top"];
        char_Val_Val.size = [40, 16];
        var char_Val_Slider = char_Val_Grp.add("slider");
        char_Val_Slider.alignment = ["fill", "top"];
        char_Val_Slider.size = [60, 16];
        var char_Val_Txt = char_Val_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        char_Val_Txt.alignment = ["right", "top"];
        char_Val_Txt.size = [55, 16];
        var char_Val_Chk = char_Val_Grp.add("checkbox", undefined, "");
        char_Val_Chk.maximumSize = [14, 14];
        var blur_Grp = fxSubTab.add("group");
        blur_Grp.alignment = ["fill", "top"];
        blur_Grp.orientation = "row";
        var blur_Constrain_Chk = blur_Grp.add("checkbox", undefined, "");
        blur_Constrain_Chk.maximumSize = [12, 12];
        var blur_SubGrp = blur_Grp.add("group");
        blur_SubGrp.alignment = ["fill", "top"];
        blur_SubGrp.orientation = "column";
        var blur_X_Grp = blur_SubGrp.add("group");
        blur_X_Grp.alignment = ["fill", "top"];
        blur_X_Grp.orientation = "row";
        blur_X_Grp.margins = [0, 4, 0, 0];
        var blur_X_Bt = blur_X_Grp.add("button {text:\'Blur X\'}");
        blur_X_Bt.maximumSize = [43, 16];
        blur_X_Bt.alignment = ["left", "top"];
        var blur_X_Val = blur_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        blur_X_Val.alignment = ["left", "top"];
        blur_X_Val.size = [40, 16];
        var blur_X_Slider = blur_X_Grp.add("slider");
        blur_X_Slider.alignment = ["fill", "top"];
        blur_X_Slider.size = [60, 16];
        var blur_X_Txt = blur_X_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        blur_X_Txt.alignment = ["right", "top"];
        blur_X_Txt.size = [55, 16];
        var blur_X_Chk = blur_X_Grp.add("checkbox", undefined, "");
        blur_X_Chk.maximumSize = [14, 14];
        var blur_Y_Grp = blur_SubGrp.add("group");
        blur_Y_Grp.alignment = ["fill", "top"];
        blur_Y_Grp.orientation = "row";
        blur_Y_Grp.margins = [0, -8, 0, 0];
        var blur_Y_Bt = blur_Y_Grp.add("button {text:\'Blur Y\'}");
        blur_Y_Bt.maximumSize = [43, 16];
        blur_Y_Bt.alignment = ["left", "top"];
        var blur_Y_Val = blur_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        blur_Y_Val.alignment = ["left", "top"];
        blur_Y_Val.size = [40, 16];
        var blur_Y_Slider = blur_Y_Grp.add("slider");
        blur_Y_Slider.alignment = ["fill", "top"];
        blur_Y_Slider.size = [60, 16];
        var blur_Y_Txt = blur_Y_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        blur_Y_Txt.alignment = ["right", "top"];
        blur_Y_Txt.size = [55, 16];
        var blur_Y_Chk = blur_Y_Grp.add("checkbox", undefined, "");
        blur_Y_Chk.maximumSize = [14, 14];
        var behaviorTab = editSubTab.add("tab", undefined, "Behavior");
        behaviorTab.alignment = ["fill", "top"];
        behaviorTab.orientation = "column";
        behaviorTab.margins = [5, 4, -10, 5];
        var wiggle_Pnl = behaviorTab.add("group");
        wiggle_Pnl.alignment = ["fill", "top"];
        wiggle_Pnl.orientation = "column";
        wiggle_Pnl.margins = [5, 0, -10, 0];
        wiggle_Pnl.maximumSize.height = 0;
        var Wbased_On_Grp = wiggle_Pnl.add("group");
        Wbased_On_Grp.alignment = ["fill", "top"];
        Wbased_On_Grp.orientation = "row";
        Wbased_On_Grp.margins = [0, 4, 0, 0];
        var WbasedOn_Bt = Wbased_On_Grp.add("button {text:\'Based On\'}");
        WbasedOn_Bt.maximumSize = [60, 16];
        WbasedOn_Bt.alignment = ["left", "top"];
        var WbasedOn_Val = Wbased_On_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        WbasedOn_Val.alignment = ["left", "top"];
        WbasedOn_Val.size = [40, 0];
        var WbasedOn_Bar = Wbased_On_Grp.add("scrollbar");
        WbasedOn_Bar.alignment = ["fill", "top"];
        WbasedOn_Bar.size = [50, 16];
        var WbasedOn_Txt = Wbased_On_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        WbasedOn_Txt.alignment = ["right", "top"];
        WbasedOn_Txt.size = [55, 16];
        var WbasedOn_Chk = Wbased_On_Grp.add("checkbox", undefined, "");
        WbasedOn_Chk.maximumSize = [14, 14];
        var Woffset_Rev_Grp = wiggle_Pnl.add("group");
        Woffset_Rev_Grp.alignment = ["fill", "top"];
        Woffset_Rev_Grp.orientation = "row";
        Woffset_Rev_Grp.margins = [0, 4, 0, 0];
        var Woffset_Rev_Bt = Woffset_Rev_Grp.add("button {text:\'Reverse\'}");
        Woffset_Rev_Bt.maximumSize = [60, 16];
        Woffset_Rev_Bt.alignment = ["left", "top"];
        var Woffset_Rev_Val = Woffset_Rev_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        Woffset_Rev_Val.alignment = ["left", "top"];
        Woffset_Rev_Val.size = [40, 0];
        var Woffset_Rev_Bar = Woffset_Rev_Grp.add("scrollbar");
        Woffset_Rev_Bar.alignment = ["fill", "top"];
        Woffset_Rev_Bar.size = [50, 16];
        var Woffset_Rev_Txt = Woffset_Rev_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        Woffset_Rev_Txt.alignment = ["right", "top"];
        Woffset_Rev_Txt.size = [55, 16];
        var Woffset_Rev_Chk = Woffset_Rev_Grp.add("checkbox", undefined, "");
        Woffset_Rev_Chk.maximumSize = [14, 14];
        var Wkeys_Grp = wiggle_Pnl.add("group");
        Wkeys_Grp.alignment = ["fill", "top"];
        Wkeys_Grp.orientation = "row";
        Wkeys_Grp.margins = [0, -8, 0, 0];
        var Wkeys_Bt = Wkeys_Grp.add("button {text:\'Keys Time\'}");
        Wkeys_Bt.maximumSize = [60, 16];
        Wkeys_Bt.alignment = ["left", "top"];
        var Wkeys_Val = Wkeys_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        Wkeys_Val.alignment = ["left", "top"];
        Wkeys_Val.size = [40, 0];
        Wkeys_Val.hide();
        var Wkeys_Bar = Wkeys_Grp.add("scrollbar");
        Wkeys_Bar.alignment = ["left", "top"];
        Wkeys_Bar.size = [50, 16];
        Wkeys_Bar.hide();
        var Wkeys_Txt = Wkeys_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        Wkeys_Txt.alignment = ["right", "top"];
        Wkeys_Txt.size = [55, 16];
        Wkeys_Txt.hide();
        var Wkeys_Chk = Wkeys_Grp.add("checkbox", undefined, "");
        Wkeys_Chk.maximumSize = [14, 14];
        var Wamount_Grp = wiggle_Pnl.add("group");
        Wamount_Grp.alignment = ["fill", "top"];
        Wamount_Grp.orientation = "row";
        Wamount_Grp.margins = [0, 4, 0, 0];
        var Wamount_Bt = Wamount_Grp.add("button {text:\'Amount\'}");
        Wamount_Bt.maximumSize = [60, 16];
        Wamount_Bt.alignment = ["left", "top"];
        var Wamount_Val = Wamount_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wamount_Val.alignment = ["left", "top"];
        Wamount_Val.size = [40, 0];
        var Wamount_Slider = Wamount_Grp.add("slider");
        Wamount_Slider.alignment = ["fill", "top"];
        Wamount_Slider.size = [60, 16];
        var Wamount_Txt = Wamount_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wamount_Txt.alignment = ["right", "top"];
        Wamount_Txt.size = [55, 16];
        var Wamount_Chk = Wamount_Grp.add("checkbox", undefined, "");
        Wamount_Chk.maximumSize = [14, 14];
        var Wspeed_Grp = wiggle_Pnl.add("group");
        Wspeed_Grp.alignment = ["fill", "top"];
        Wspeed_Grp.orientation = "row";
        Wspeed_Grp.margins = [0, -8, 0, 0];
        var Wspeed_Bt = Wspeed_Grp.add("button {text:\'Speed\'}");
        Wspeed_Bt.maximumSize = [60, 16];
        Wspeed_Bt.alignment = ["left", "top"];
        var Wspeed_Val = Wspeed_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wspeed_Val.alignment = ["left", "top"];
        Wspeed_Val.size = [40, 16];
        var Wspeed_Slider = Wspeed_Grp.add("slider");
        Wspeed_Slider.alignment = ["fill", "top"];
        Wspeed_Slider.size = [60, 16];
        var Wspeed_Txt = Wspeed_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wspeed_Txt.alignment = ["right", "top"];
        Wspeed_Txt.size = [55, 16];
        var Wspeed_Chk = Wspeed_Grp.add("checkbox", undefined, "");
        Wspeed_Chk.maximumSize = [14, 14];
        var Wcorrelation_Grp = wiggle_Pnl.add("group");
        Wcorrelation_Grp.alignment = ["fill", "top"];
        Wcorrelation_Grp.orientation = "row";
        Wcorrelation_Grp.margins = [0, -8, 0, 0];
        var Wcorrelation_Bt = Wcorrelation_Grp.add(
          "button {text:\'Correlation\'}",
        );
        Wcorrelation_Bt.maximumSize = [60, 16];
        Wcorrelation_Bt.alignment = ["left", "top"];
        var Wcorrelation_Val = Wcorrelation_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wcorrelation_Val.alignment = ["left", "top"];
        Wcorrelation_Val.size = [40, 0];
        var Wcorrelation_Slider = Wcorrelation_Grp.add("slider");
        Wcorrelation_Slider.alignment = ["fill", "top"];
        Wcorrelation_Slider.size = [60, 16];
        var Wcorrelation_Txt = Wcorrelation_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wcorrelation_Txt.alignment = ["right", "top"];
        Wcorrelation_Txt.size = [55, 16];
        var Wcorrelation_Chk = Wcorrelation_Grp.add("checkbox", undefined, "");
        Wcorrelation_Chk.maximumSize = [14, 14];
        var Wease_Start_Grp = wiggle_Pnl.add("group");
        Wease_Start_Grp.alignment = ["fill", "top"];
        Wease_Start_Grp.orientation = "row";
        Wease_Start_Grp.margins = [0, 4, 0, 0];
        var Wease_Start_Bt = Wease_Start_Grp.add(
          "button {text:\'Ease Start\'}",
        );
        Wease_Start_Bt.maximumSize = [60, 16];
        Wease_Start_Bt.alignment = ["left", "top"];
        var Wease_Start_Val = Wease_Start_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wease_Start_Val.alignment = ["left", "top"];
        Wease_Start_Val.size = [40, 0];
        var Wease_Start_Slider = Wease_Start_Grp.add("slider");
        Wease_Start_Slider.alignment = ["fill", "top"];
        Wease_Start_Slider.size = [60, 16];
        var Wease_Start_Txt = Wease_Start_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wease_Start_Txt.alignment = ["right", "top"];
        Wease_Start_Txt.size = [55, 16];
        var Wease_Start_Chk = Wease_Start_Grp.add("checkbox", undefined, "");
        Wease_Start_Chk.maximumSize = [14, 14];
        var Wease_End_Grp = wiggle_Pnl.add("group");
        Wease_End_Grp.alignment = ["fill", "top"];
        Wease_End_Grp.orientation = "row";
        Wease_End_Grp.margins = [0, -8, 0, 0];
        var Wease_End_Bt = Wease_End_Grp.add("button {text:\'Ease End\'}");
        Wease_End_Bt.maximumSize = [60, 16];
        Wease_End_Bt.alignment = ["left", "top"];
        var Wease_End_Val = Wease_End_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wease_End_Val.alignment = ["left", "top"];
        Wease_End_Val.size = [40, 0];
        var Wease_End_Slider = Wease_End_Grp.add("slider");
        Wease_End_Slider.alignment = ["fill", "top"];
        Wease_End_Slider.size = [60, 16];
        var Wease_End_Txt = Wease_End_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wease_End_Txt.alignment = ["right", "top"];
        Wease_End_Txt.size = [55, 16];
        var Wease_End_Chk = Wease_End_Grp.add("checkbox", undefined, "");
        Wease_End_Chk.maximumSize = [14, 14];
        var Wbounce_Grp = wiggle_Pnl.add("group");
        Wbounce_Grp.alignment = ["fill", "top"];
        Wbounce_Grp.orientation = "row";
        Wbounce_Grp.margins = [0, 4, 0, 0];
        var Wbounce_Bt = Wbounce_Grp.add("button {text:\'Bounce\'}");
        Wbounce_Bt.maximumSize = [60, 16];
        Wbounce_Bt.alignment = ["left", "top"];
        var Wbounce_Val = Wbounce_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wbounce_Val.alignment = ["left", "top"];
        Wbounce_Val.size = [40, 16];
        var Wbounce_Slider = Wbounce_Grp.add("slider");
        Wbounce_Slider.alignment = ["fill", "top"];
        Wbounce_Slider.size = [60, 16];
        var Wbounce_Txt = Wbounce_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wbounce_Txt.alignment = ["right", "top"];
        Wbounce_Txt.size = [55, 16];
        var Wbounce_Chk = Wbounce_Grp.add("checkbox", undefined, "");
        Wbounce_Chk.maximumSize = [14, 14];
        var Wfrequency_Grp = wiggle_Pnl.add("group");
        Wfrequency_Grp.alignment = ["fill", "top"];
        Wfrequency_Grp.orientation = "row";
        Wfrequency_Grp.margins = [0, -8, 0, 0];
        var Wfrequency_Bt = Wfrequency_Grp.add("button {text:\'Frequency\'}");
        Wfrequency_Bt.maximumSize = [60, 16];
        Wfrequency_Bt.alignment = ["left", "top"];
        var Wfrequency_Val = Wfrequency_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wfrequency_Val.alignment = ["left", "top"];
        Wfrequency_Val.size = [40, 16];
        var Wfrequency_Slider = Wfrequency_Grp.add("slider");
        Wfrequency_Slider.alignment = ["fill", "top"];
        Wfrequency_Slider.size = [60, 16];
        var Wfrequency_Txt = Wfrequency_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wfrequency_Txt.alignment = ["right", "top"];
        Wfrequency_Txt.size = [55, 16];
        var Wfrequency_Chk = Wfrequency_Grp.add("checkbox", undefined, "");
        Wfrequency_Chk.maximumSize = [14, 14];
        var Wdecay_Grp = wiggle_Pnl.add("group");
        Wdecay_Grp.alignment = ["fill", "top"];
        Wdecay_Grp.orientation = "row";
        Wdecay_Grp.margins = [0, -8, 0, 0];
        var Wdecay_Bt = Wdecay_Grp.add("button {text:\'Decay\'}");
        Wdecay_Bt.maximumSize = [60, 16];
        Wdecay_Bt.alignment = ["left", "top"];
        var Wdecay_Val = Wdecay_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wdecay_Val.alignment = ["left", "top"];
        Wdecay_Val.size = [40, 16];
        var Wdecay_Slider = Wdecay_Grp.add("slider");
        Wdecay_Slider.alignment = ["fill", "top"];
        Wdecay_Slider.size = [60, 16];
        var Wdecay_Txt = Wdecay_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        Wdecay_Txt.alignment = ["right", "top"];
        Wdecay_Txt.size = [55, 16];
        var Wdecay_Chk = Wdecay_Grp.add("checkbox", undefined, "");
        Wdecay_Chk.maximumSize = [14, 14];
        var range_Pnl = behaviorTab.add("group");
        range_Pnl.alignment = ["fill", "top"];
        range_Pnl.orientation = "column";
        range_Pnl.margins = [5, 0, -10, 0];
        range_Pnl.maximumSize.height = 280;
        var based_On_Grp = range_Pnl.add("group");
        based_On_Grp.alignment = ["fill", "top"];
        based_On_Grp.orientation = "row";
        var basedOn_Bt = based_On_Grp.add("button {text:\'Based On\'}");
        basedOn_Bt.maximumSize = [60, 16];
        basedOn_Bt.alignment = ["left", "top"];
        var basedOn_Val = based_On_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        basedOn_Val.alignment = ["left", "top"];
        basedOn_Val.size = [40, 0];
        var basedOn_Bar = based_On_Grp.add("scrollbar");
        basedOn_Bar.alignment = ["fill", "top"];
        basedOn_Bar.size = [50, 16];
        var basedOn_Txt = based_On_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        basedOn_Txt.alignment = ["right", "top"];
        basedOn_Txt.size = [55, 16];
        var basedOn_Chk = based_On_Grp.add("checkbox", undefined, "");
        basedOn_Chk.maximumSize = [14, 14];
        var range_Start_Grp = range_Pnl.add("group");
        range_Start_Grp.alignment = ["fill", "top"];
        range_Start_Grp.orientation = "row";
        range_Start_Grp.margins = [0, -8, 0, 0];
        var range_Start_Bt = range_Start_Grp.add(
          "button {text:\'Range Start\'}",
        );
        range_Start_Bt.maximumSize = [60, 16];
        range_Start_Bt.alignment = ["left", "top"];
        var range_Start_Val = range_Start_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        range_Start_Val.alignment = ["left", "top"];
        range_Start_Val.size = [40, 0];
        var range_Start_Slider = range_Start_Grp.add("slider");
        range_Start_Slider.alignment = ["fill", "top"];
        range_Start_Slider.size = [60, 16];
        var range_Start_Txt = range_Start_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        range_Start_Txt.alignment = ["right", "top"];
        range_Start_Txt.size = [55, 16];
        var range_Start_Chk = range_Start_Grp.add("checkbox", undefined, "");
        range_Start_Chk.maximumSize = [14, 14];
        var range_End_Grp = range_Pnl.add("group");
        range_End_Grp.alignment = ["fill", "top"];
        range_End_Grp.orientation = "row";
        range_End_Grp.margins = [0, -8, 0, 0];
        var range_End_Bt = range_End_Grp.add("button {text:\'Range End\'}");
        range_End_Bt.maximumSize = [60, 16];
        range_End_Bt.alignment = ["left", "top"];
        var range_End_Val = range_End_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        range_End_Val.alignment = ["left", "top"];
        range_End_Val.size = [40, 0];
        var range_End_Slider = range_End_Grp.add("slider");
        range_End_Slider.alignment = ["fill", "top"];
        range_End_Slider.size = [60, 16];
        var range_End_Txt = range_End_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        range_End_Txt.alignment = ["right", "top"];
        range_End_Txt.size = [55, 16];
        var range_End_Chk = range_End_Grp.add("checkbox", undefined, "");
        range_End_Chk.maximumSize = [14, 14];
        var delay_Grp = range_Pnl.add("group");
        delay_Grp.alignment = ["fill", "top"];
        delay_Grp.orientation = "row";
        delay_Grp.margins = [0, 4, 0, 0];
        var delay_Bt = delay_Grp.add("button {text:\'Delay\'}");
        delay_Bt.maximumSize = [60, 16];
        delay_Bt.alignment = ["left", "top"];
        var delay_Val = delay_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        delay_Val.alignment = ["left", "top"];
        delay_Val.size = [40, 16];
        var delay_Slider = delay_Grp.add("slider");
        delay_Slider.alignment = ["fill", "top"];
        delay_Slider.size = [60, 16];
        var delay_Txt = delay_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        delay_Txt.alignment = ["right", "top"];
        delay_Txt.size = [55, 16];
        var delay_Chk = delay_Grp.add("checkbox", undefined, "");
        delay_Chk.maximumSize = [14, 14];
        var offset_Rev_Grp = range_Pnl.add("group");
        offset_Rev_Grp.alignment = ["fill", "top"];
        offset_Rev_Grp.orientation = "row";
        offset_Rev_Grp.margins = [0, -8, 0, 0];
        var offset_Rev_Bt = offset_Rev_Grp.add("button {text:\'Reverse\'}");
        offset_Rev_Bt.maximumSize = [60, 16];
        offset_Rev_Bt.alignment = ["left", "top"];
        var offset_Rev_Val = offset_Rev_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        offset_Rev_Val.alignment = ["left", "top"];
        offset_Rev_Val.size = [40, 0];
        var offset_Rev_Bar = offset_Rev_Grp.add("scrollbar");
        offset_Rev_Bar.alignment = ["fill", "top"];
        offset_Rev_Bar.size = [50, 16];
        var offset_Rev_Txt = offset_Rev_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        offset_Rev_Txt.alignment = ["right", "top"];
        offset_Rev_Txt.size = [55, 16];
        var offset_Rev_Chk = offset_Rev_Grp.add("checkbox", undefined, "");
        offset_Rev_Chk.maximumSize = [14, 14];
        var order_Inv_Grp = range_Pnl.add("group");
        order_Inv_Grp.alignment = ["fill", "top"];
        order_Inv_Grp.orientation = "row";
        order_Inv_Grp.margins = [0, -8, 0, 0];
        var order_Inv_Bt = order_Inv_Grp.add("button {text:\'Inv. Order\'}");
        order_Inv_Bt.maximumSize = [60, 16];
        order_Inv_Bt.alignment = ["left", "top"];
        var order_Inv_Val = order_Inv_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        order_Inv_Val.alignment = ["left", "top"];
        order_Inv_Val.size = [40, 0];
        var order_Inv_Bar = order_Inv_Grp.add("scrollbar");
        order_Inv_Bar.alignment = ["fill", "top"];
        order_Inv_Bar.size = [50, 16];
        var order_Inv_Txt = order_Inv_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        order_Inv_Txt.alignment = ["right", "top"];
        order_Inv_Txt.size = [55, 16];
        var order_Inv_Chk = order_Inv_Grp.add("checkbox", undefined, "");
        order_Inv_Chk.maximumSize = [14, 14];
        var keys_Grp = range_Pnl.add("group");
        keys_Grp.alignment = ["fill", "top"];
        keys_Grp.orientation = "row";
        keys_Grp.margins = [0, -8, 0, 0];
        var keys_Bt = keys_Grp.add("button {text:\'Keys Time\'}");
        keys_Bt.maximumSize = [60, 16];
        keys_Bt.alignment = ["left", "top"];
        var keys_Val = keys_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        keys_Val.alignment = ["left", "top"];
        keys_Val.size = [40, 0];
        keys_Val.hide();
        var keys_Bar = keys_Grp.add("scrollbar");
        keys_Bar.alignment = ["left", "top"];
        keys_Bar.size = [70, 16];
        keys_Bar.hide();
        var keys_Txt = keys_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        keys_Txt.alignment = ["right", "top"];
        keys_Txt.size = [60, 16];
        keys_Txt.hide();
        var keys_Chk = keys_Grp.add("checkbox", undefined, "");
        keys_Chk.maximumSize = [14, 14];
        var ease_Start_Grp = range_Pnl.add("group");
        ease_Start_Grp.alignment = ["fill", "top"];
        ease_Start_Grp.orientation = "row";
        ease_Start_Grp.margins = [0, 4, 0, 0];
        var ease_Start_Bt = ease_Start_Grp.add("button {text:\'Start Ease\'}");
        ease_Start_Bt.maximumSize = [60, 16];
        ease_Start_Bt.alignment = ["left", "top"];
        var ease_Start_Val = ease_Start_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        ease_Start_Val.alignment = ["left", "top"];
        ease_Start_Val.size = [40, 0];
        var ease_Start_Slider = ease_Start_Grp.add("slider");
        ease_Start_Slider.alignment = ["fill", "top"];
        ease_Start_Slider.size = [60, 16];
        var ease_Start_Txt = ease_Start_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        ease_Start_Txt.alignment = ["right", "top"];
        ease_Start_Txt.size = [55, 16];
        var ease_Start_Chk = ease_Start_Grp.add("checkbox", undefined, "");
        ease_Start_Chk.maximumSize = [14, 14];
        var ease_End_Grp = range_Pnl.add("group");
        ease_End_Grp.alignment = ["fill", "top"];
        ease_End_Grp.orientation = "row";
        ease_End_Grp.margins = [0, -8, 0, 0];
        var ease_End_Bt = ease_End_Grp.add("button {text:\'End Ease\'}");
        ease_End_Bt.maximumSize = [60, 16];
        ease_End_Bt.alignment = ["left", "top"];
        var ease_End_Val = ease_End_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        ease_End_Val.alignment = ["left", "top"];
        ease_End_Val.size = [40, 0];
        var ease_End_Slider = ease_End_Grp.add("slider");
        ease_End_Slider.alignment = ["fill", "top"];
        ease_End_Slider.size = [60, 16];
        var ease_End_Txt = ease_End_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        ease_End_Txt.alignment = ["right", "top"];
        ease_End_Txt.size = [55, 16];
        var ease_End_Chk = ease_End_Grp.add("checkbox", undefined, "");
        ease_End_Chk.maximumSize = [14, 14];
        var hold_Grp = range_Pnl.add("group");
        hold_Grp.alignment = ["fill", "top"];
        hold_Grp.orientation = "row";
        hold_Grp.margins = [0, -8, 0, 0];
        var hold_Bt = hold_Grp.add("button {text:\'Hold\'}");
        hold_Bt.maximumSize = [60, 16];
        hold_Bt.alignment = ["left", "top"];
        var hold_Val = hold_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        hold_Val.alignment = ["left", "top"];
        hold_Val.size = [40, 0];
        var hold_Bar = hold_Grp.add("scrollbar");
        hold_Bar.alignment = ["fill", "top"];
        hold_Bar.size = [50, 16];
        var hold_Txt = hold_Grp.add(
          "edittext {text:\'\', properties:{readonly: true}}",
        );
        hold_Txt.alignment = ["right", "top"];
        hold_Txt.size = [55, 16];
        var hold_Chk = hold_Grp.add("checkbox", undefined, "");
        hold_Chk.maximumSize = [14, 14];
        var bounce_Grp = range_Pnl.add("group");
        bounce_Grp.alignment = ["fill", "top"];
        bounce_Grp.orientation = "row";
        bounce_Grp.margins = [0, 4, 0, 0];
        var bounce_Bt = bounce_Grp.add("button {text:\'Bounce\'}");
        bounce_Bt.maximumSize = [60, 16];
        bounce_Bt.alignment = ["left", "top"];
        var bounce_Val = bounce_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        bounce_Val.alignment = ["left", "top"];
        bounce_Val.size = [40, 16];
        var bounce_Slider = bounce_Grp.add("slider");
        bounce_Slider.alignment = ["fill", "top"];
        bounce_Slider.size = [60, 16];
        var bounce_Txt = bounce_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        bounce_Txt.alignment = ["right", "top"];
        bounce_Txt.size = [55, 16];
        var bounce_Chk = bounce_Grp.add("checkbox", undefined, "");
        bounce_Chk.maximumSize = [14, 14];
        var frequency_Grp = range_Pnl.add("group");
        frequency_Grp.alignment = ["fill", "top"];
        frequency_Grp.orientation = "row";
        frequency_Grp.margins = [0, -8, 0, 0];
        var frequency_Bt = frequency_Grp.add("button {text:\'Frequency\'}");
        frequency_Bt.maximumSize = [60, 16];
        frequency_Bt.alignment = ["left", "top"];
        var frequency_Val = frequency_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        frequency_Val.alignment = ["left", "top"];
        frequency_Val.size = [40, 16];
        var frequency_Slider = frequency_Grp.add("slider");
        frequency_Slider.alignment = ["fill", "top"];
        frequency_Slider.size = [60, 16];
        var frequency_Txt = frequency_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        frequency_Txt.alignment = ["right", "top"];
        frequency_Txt.size = [55, 16];
        var frequency_Chk = frequency_Grp.add("checkbox", undefined, "");
        frequency_Chk.maximumSize = [14, 14];
        var decay_Grp = range_Pnl.add("group");
        decay_Grp.alignment = ["fill", "top"];
        decay_Grp.orientation = "row";
        decay_Grp.margins = [0, -8, 0, 0];
        var decay_Bt = decay_Grp.add("button {text:\'Decay\'}");
        decay_Bt.maximumSize = [60, 16];
        decay_Bt.alignment = ["left", "top"];
        var decay_Val = decay_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        decay_Val.alignment = ["left", "top"];
        decay_Val.size = [40, 16];
        var decay_Slider = decay_Grp.add("slider");
        decay_Slider.alignment = ["fill", "top"];
        decay_Slider.size = [60, 16];
        var decay_Txt = decay_Grp.add(
          "edittext {text:\'\', properties:{readonly: false}}",
        );
        decay_Txt.alignment = ["right", "top"];
        decay_Txt.size = [55, 16];
        var decay_Chk = decay_Grp.add("checkbox", undefined, "");
        decay_Chk.maximumSize = [14, 14];
        versionUI();
        var presetsTab = rootTab.add("tab", undefined, "Presets");
        presetsTab.orientation = "column";
        presetsTab.alignment = ["fill", "fill"];
        presetsTab.margins = [10, 0, 0, 10];
        presetsTab.label = "PT";
        var presets_Grp = presetsTab.add("group");
        presets_Grp.alignment = ["fill", "top"];
        presets_Grp.orientation = "row";
        presets_Grp.margins = [0, 10, 0, 0];
        var undoBt2 = presets_Grp.add("iconbutton", undefined, undoImage);
        undoBt2.maximumSize = [30, 35];
        undoBt2.alignment = ["left", "top"];
        undoBt2.helpTip =
          $.os.indexOf("Windows") != -1 ? "Undo (CTRL + Z)" : "Undo (CMD + Z)";
        var presetsBt = presets_Grp.add("button {text:\'\'}");
        presetsBt.preferredSize = [60, 35];
        presetsBt.alignment = ["fill", "top"];
        presetsBt.orientation = "column";
        var redoBt2 = presets_Grp.add("iconbutton", undefined, redoImage);
        redoBt2.maximumSize = [30, 35];
        redoBt2.alignment = ["right", "top"];
        redoBt2.helpTip =
          $.os.indexOf("Windows") != -1
            ? "Redo (SHIFT + CTRL + Z)"
            : "Redo (SHIFT + CMD + Z)";
        var presetsList_Grp = presetsTab.add("group");
        presetsList_Grp.alignment = ["fill", "fill"];
        presetsList_Grp.orientation = "row";
        presetsList_Grp.margins = [0, 5, 0, 0];
        var movePresets_buttons_Grp = presetsList_Grp.add("group");
        movePresets_buttons_Grp.alignment = ["left", "top"];
        movePresets_buttons_Grp.orientation = "column";
        movePresets_buttons_Grp.alignChildren = ["fill", "fill"];
        var moveUpPresetBt_Grp = movePresets_buttons_Grp.add("group");
        moveUpPresetBt_Grp.alignment = ["left", "top"];
        moveUpPresetBt_Grp.orientation = "column";
        moveUpPresetBt_Grp.margins = [0, 0, 0, 0];
        var moveUpPreset_Bt = moveUpPresetBt_Grp.add(
          "iconbutton",
          undefined,
          upImage,
        );
        moveUpPreset_Bt.maximumSize = [30, 30];
        moveUpPreset_Bt.alignment = ["right", "top"];
        moveUpPreset_Bt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "Move UP selected presets (CTRL + UP ARROW)"
            : "Move UP selected animators (CMD + UP ARROW)";
        var moveDownPresetBt_Grp = movePresets_buttons_Grp.add("group");
        moveDownPresetBt_Grp.alignment = ["left", "top"];
        moveDownPresetBt_Grp.orientation = "column";
        moveDownPresetBt_Grp.margins = [0, 35, 0, 0];
        var moveDownPreset_Bt = moveDownPresetBt_Grp.add(
          "iconbutton",
          undefined,
          downImage,
        );
        moveDownPreset_Bt.maximumSize = [30, 30];
        moveDownPreset_Bt.alignment = ["right", "top"];
        moveDownPreset_Bt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "Move DOWN selected presets (CTRL + DOWN ARROW)"
            : "Move DOWN selected presets (CMD + DOWN ARROW)";
        var presetsList_Sub_Grp = presetsList_Grp.add("group");
        presetsList_Sub_Grp.minimumSize.height = 520;
        presetsList_Sub_Grp.alignment = ["fill", "top"];
        presetsList_Sub_Grp.orientation = "column";
        presetsList = presetsList_Sub_Grp.add("listbox", undefined, "", {
          multiselect: true,
        });
        presetsList.alignment = ["fill", "fill"];
        presetsList.orientation = "row";
        presetsList.label = "PL";
        for (var i = 0; i < presetsList.items.length; i += 1) {
          presetsList.items[i].checked = true;
        }
        var bottom_buttons_Grp = presetsList_Sub_Grp.add("group");
        bottom_buttons_Grp.alignment = ["fill", "bottom"];
        bottom_buttons_Grp.orientation = "row";
        bottom_buttons_Grp.alignChildren = ["fill", "fill"];
        var applyPresetsBt = bottom_buttons_Grp.add(
          "iconbutton",
          undefined,
          applyImage,
        );
        applyPresetsBt.alignment = ["fill", "top"];
        applyPresetsBt.helpTip =
          "APPLY the selected PRESET to selected layers (Double Click on preset).\n\nPress (SHIFT + Apply button) or (SHIFT + Double Click) on preset to ADD a preset without overwriting the existing one";
        var side_buttons_Grp = presetsList_Grp.add("group");
        side_buttons_Grp.alignment = ["right", "top"];
        side_buttons_Grp.orientation = "column";
        side_buttons_Grp.alignChildren = ["fill", "fill"];
        var newPresetBt_Grp = side_buttons_Grp.add("group");
        newPresetBt_Grp.alignment = ["right", "top"];
        newPresetBt_Grp.orientation = "column";
        newPresetBt_Grp.margins = [0, 0, 0, 0];
        var newPresetsBt = newPresetBt_Grp.add(
          "iconbutton",
          undefined,
          saveImage,
        );
        newPresetsBt.maximumSize = [30, 30];
        newPresetsBt.alignment = ["right", "top"];
        newPresetsBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "SAVE the edited animators as a new preset and add it to the list. (CTRL + S)"
            : "SAVE the edited animators as a new preset and add it to the list. (CMD + S)";
        var removePresetBt_Grp = side_buttons_Grp.add("group");
        removePresetBt_Grp.alignment = ["right", "top"];
        removePresetBt_Grp.orientation = "column";
        removePresetBt_Grp.margins = [0, -5, 0, 0];
        var removePresetsBt = removePresetBt_Grp.add(
          "iconbutton",
          undefined,
          deleteImage,
        );
        removePresetsBt.maximumSize = [30, 30];
        removePresetsBt.alignment = ["right", "top"];
        removePresetsBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "DELETE the selected presets from list. (CTRL + DEL)"
            : "DELETE the selected presets from list. (CMD + DEL)";
        var renamePresetBt_Grp = side_buttons_Grp.add("group");
        renamePresetBt_Grp.alignment = ["right", "top"];
        renamePresetBt_Grp.orientation = "column";
        renamePresetBt_Grp.margins = [0, -5, 0, 0];
        var renamePresetsBt = renamePresetBt_Grp.add(
          "iconbutton",
          undefined,
          renameImage,
        );
        renamePresetsBt.maximumSize = [30, 30];
        renamePresetsBt.alignment = ["right", "top"];
        renamePresetsBt.helpTip = "RENAME the selected presets. (ENTER)";
        var importPresetBt_Grp = side_buttons_Grp.add("group");
        importPresetBt_Grp.alignment = ["right", "top"];
        importPresetBt_Grp.orientation = "column";
        importPresetBt_Grp.margins = [0, -5, 0, 0];
        var importPresetsBt = importPresetBt_Grp.add(
          "iconbutton",
          undefined,
          importImage,
        );
        importPresetsBt.maximumSize = [30, 30];
        importPresetsBt.alignment = ["right", "top"];
        importPresetsBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "IMPORT and replace the presets file from disk. (CTRL + I)."
            : "IMPORT and replace the presets file from disk. (CTRL + I).";
        var exportPresetBt_Grp = side_buttons_Grp.add("group");
        exportPresetBt_Grp.alignment = ["right", "top"];
        exportPresetBt_Grp.orientation = "column";
        exportPresetBt_Grp.margins = [0, -5, 0, 0];
        var exportPresetsBt = exportPresetBt_Grp.add(
          "iconbutton",
          undefined,
          exportImage,
        );
        exportPresetsBt.maximumSize = [30, 30];
        exportPresetsBt.alignment = ["right", "top"];
        exportPresetsBt.helpTip =
          $.os.indexOf("Windows") != -1
            ? "EXPORT the presets to a file on disk. (CTRL + E)"
            : "EXPORT the presets to a file on disk. (CMD + E)";
        var aboutTab = rootTab.add("tab", undefined, "      ?      ");
        aboutTab.orientation = "column";
        aboutTab.label = "AT";
        var textorImage_Grp = aboutTab.add("group");
        textorImage_Grp.alignment = ["fill", "top"];
        textorImage_Grp.orientation = "column";
        textorImage_Grp.margins = [5, 10, -5, 0];
        var textorImageBt = textorImage_Grp.add(
          "iconbutton",
          undefined,
          logoImage,
          { active: false, readonly: true },
        );
        textorImageBt.alignment = ["fill", "top"];
        textorImageBt.minimumSize = [220, 70];
        textorImageBt.margins = [10, 10, 10, 10];
        var aboutTextor_Grp = aboutTab.add("group");
        aboutTextor_Grp.alignment = ["fill", "top"];
        aboutTextor_Grp.orientation = "column";
        aboutTextor_Grp.margins = [5, 10, -5, 0];
        help_bt = aboutTextor_Grp.add("button", undefined, "Help");
        help_bt.alignment = ["left", "bottom"];
        var aboutTxt = aboutTextor_Grp.add(
          "statictext",
          undefined,
          TextorInfo,
          { active: true, multiline: true, readonly: true },
        );
        aboutTxt.alignment = ["fill", "top"];
        aboutTxt.maximumSize.height = 430;
        aboutTxt.margins = [30, 30, 0, 0];
        help_bt.onClick = function () {
          T_Set.helpUI();
        };
        TextorPalette.layout.layout(true);
        getPresets();
        AnimNullVal();
        listeners();
        checkLayer();
        update();
        anchorValChange();
        TextorPalette.layout.layout(true);
        TextorPalette.layout.resize();
        TextorPalette.onResizing = TextorPalette.onResize = function () {
          TextorPalette.layout.resize();
        };
        if (!(TextorPalette instanceof Panel)) {
          TextorPalette.show();
        }
      }
      var TextorPal = Textor_buildUI(thisObj);
      if (TextorPal != null && TextorPal instanceof Window) {
        TextorPal.center();
        TextorPal.show();
      }
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
            i.version +
              "\n" +
              strCurrentVersion.replace(/%v/, strScriptVersion),
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
          (Folder("/Volumes/Private").exists ||
            Folder("/Volumes/private").exists)
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
          '"' +
            n.fsName +
            '" "' +
            strHeader +
            '" ' +
            privateNum +
            ' "' +
            e +
            '"',
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
          "\'" ==
            (e = e.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, ""))[0] &&
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
                licErrors[locale][checkErrorCode(licenseValidity.result)]
                  .detail +
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
          app.preferences.getPrefAsLong(
            e,
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          )
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
        var d =
          strUsers.replace("%u", o) + (1 < o) && "de" != locale ? "s" : "";
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
          isServerConfigured(licenseValidity) &&
          isServerRunning(licenseValidity)
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
                        licErrors[locale][
                          checkErrorCode(licenseValidity.result)
                        ].detail +
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
        vars.hasOwnProperty("externalSupportURL") &&
        "" != vars.externalSupportURL
          ? vars.externalSupportURL
          : "http://aescripts.com/contact";
      betaMode && "" != betaSupportEmail && (supportEmail = betaSupportEmail);
      var aescriptsSupportUrl = "https://aescripts.com/contact";
      var supportUrl =
        vars.hasOwnProperty("externalSupportURL") &&
        "" != vars.externalSupportURL
          ? vars.externalSupportURL
          : aescriptsSupportUrl;
      var isAescriptsSupportUrl = supportUrl === aescriptsSupportUrl;
      isAescriptsSupportUrl &&
        (supportUrl = supportUrl.replace(/\/*/, "") + "/?direct=1&sku=");
      var aescriptsRetrieveUrl =
        "https://aescripts.com/downloadable/customer/products";
      var retrieveUrl =
        vars.hasOwnProperty("retrieveLicenseURL") &&
        "" != vars.retrieveLicenseURL
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
      var wx = __BLOB__BLOB_000722__;
      var mx = __BLOB__BLOB_000723__;
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
                      : "\\u" +
                          ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
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
                if (
                  Object.prototype.toString.apply(value) === "[object Array]"
                ) {
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
          "Eine neuere Version von " +
          strScriptName +
          " ist verf\xfcgbar: v%\n",
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
            detail:
              "Die Lizenz kann auf dem Lizenzserver nicht gefunden werden",
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
            detail:
              "This product does not offer a trial and requires a license",
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
            detail:
              "Verifiez que le serveur de licence fonctionne correctement",
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
      var prefsLastServerVersionChecked =
        strHeader + "_LastServerVersionChecked";
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
          "(If pasting the code with " +
            cmdKey +
            "+V doesn\'t work try " +
            10 <=
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
                      : "\\u" +
                          ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
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
                if (
                  Object.prototype.toString.apply(value) === "[object Array]"
                ) {
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
    var af_settings = {
      betaExpirationDate: new Date("Dec 1, 2017"),
      betaStartDate: new Date("Nov 1, 2017"),
      betaSupportEmail: "http://aescripts.com/contact",
      helpButtons: [
        { name: "Home page", url: "https://aescripts.com/textor/" },
        {
          name: "Other Products",
          url: "http://aescripts.com/authors/m-p/marco-sanasi",
        },
      ],
      helpText:
        "- Textor is a text animation tool for After Effects.\n\n- Textor is slider based: no need to change keyframes values! Just move the sliders and Textor will animate the related sliders properties.\n\n- The Transform tab and the Fx tab let you animate many different kinds of properties.The Behavior tab lets you control the animation: range, delay, ease, bounce, elements order and more.\n\n- Textor also includes a 1 click Random animation generator: It creates random text animations based on the properties you choose to randomize and the limits you set.\n\n- The Presets tab lets you manage animations: you can save, remove, rename, export and import your animations.\n\n- Textor is size independent. It applies animation presets keeping in mind composition size and text scale, so the animation is always the same, regardless of elements dimensions.",
      offerBeta: false,
      offerTrial: true,
      privateNumber: 8141067541282326,
      productSKU: "MSNT-SUL",
      scriptAuthor: "Marco Sanasi",
      scriptName: "Textor",
      scriptURL: "http://aescripts.com/textor/",
      scriptVersion: "1.1.6",
    };
    var af = new a(af_settings);
    var T_Set = new a(af_settings);
    if (T_Set.c()) {
      var isTrial = af.t();
      Textor(thisObj);
    }
  }
}
ms_Textor_Global(this);
