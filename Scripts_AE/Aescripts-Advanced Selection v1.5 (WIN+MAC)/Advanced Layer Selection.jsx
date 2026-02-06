/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function myScript(thisObj) {
  function myScript_buildUI(thisObj) {
    function main() {
      function customDraw() {
        with (this) {
          graphics.drawOSControl();
          graphics.rectPath(0, 0, size[0], size[1]);
          graphics.fillPath(fillBrush);
          if (text) {
            graphics.drawString(
              text,
              textPen,
              (size[0] -
                graphics.measureString(text, graphics.font, size[0])[0]) /
                2,
              3,
              graphics.font,
            );
          }
        }
      }
      function runPreComps(myTarget, mySelection) {
        if (selectionDepthModeList.selection == 3) {
          for (var i = 1; i <= app.project.numItems; i += 1) {
            if (app.project.item(i) instanceof CompItem) {
              selectLayers(mySelection, app.project.item(i));
            }
          }
        }
        if (
          selectionDepthModeList.selection > 0 &&
          selectionDepthModeList.selection != 3
        ) {
          for (var i = 1; i <= myTarget.numLayers; i += 1) {
            if (myTarget.layer(i).source instanceof CompItem) {
              selectLayers(mySelection, myTarget.layer(i).source);
              if (selectionDepthModeList.selection == 2) {
                runPreComps(myTarget.layer(i).source, mySelection);
              }
            }
          }
        }
        if (selectionDepthModeList.selection != 3) {
          selectLayers(mySelection, app.project.activeItem);
        }
      }
      function selectLayers(mySelection, theComp) {
        app.beginUndoGroup("Advanced Selection");
        var myAndArr = [];
        if (theComp instanceof CompItem) {
          for (var counter = 1; counter <= theComp.numLayers; counter += 1) {
            if (norButton.value == true) {
              theComp.layer(counter).selected = true;
            } else {
              theComp.layer(counter).selected = false;
            }
            for (
              var listLength = 0;
              listLength < mySelection.length;
              listLength += 1
            ) {
              function testForAttribute(
                myTest,
                counter,
                myBool,
                myOrButton,
                myNorButton,
              ) {
                if (myTest == myBool) {
                  if (myOrButton == true) {
                    theComp.layer(counter).selected = true;
                  } else if (myNorButton == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Blending Mode") > -1) {
                myBlendMode = blendModes[blendSelect.selection.index];
                if (theComp.layer(counter).blendingMode == myBlendMode) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Label Color") > -1) {
                myLabelColor = labelColorSelect.selection.index + 1;
                if (theComp.layer(counter).label == myLabelColor) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Light") > -1) {
                if (
                  theComp.layer(counter).constructor.name ==
                  selectableTypesWork[0]
                ) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Shape") > -1) {
                if (
                  theComp.layer(counter).constructor.name ==
                  selectableTypesWork[1]
                ) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Text") > -1) {
                if (
                  theComp.layer(counter).constructor.name ==
                  selectableTypesWork[2]
                ) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Camera") > -1) {
                if (
                  theComp.layer(counter).constructor.name ==
                  selectableTypesWork[3]
                ) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Footage") > -1) {
                if (
                  theComp.layer(counter).constructor.name ==
                    selectableTypesWork[4] &&
                  theComp.layer(counter).nullLayer == false &&
                  theComp.layer(counter).adjustmentLayer == false &&
                  theComp.layer(counter).source.mainSource instanceof
                    SolidSource ==
                    false
                ) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Solid") > -1) {
                if (
                  theComp.layer(counter) instanceof AVLayer == true &&
                  theComp.layer(counter).source.mainSource instanceof
                    SolidSource ==
                    true &&
                  theComp.layer(counter).adjustmentLayer == false &&
                  theComp.layer(counter).nullLayer == false
                ) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Even Layers") > -1) {
                if (theComp.layer(counter).index % 2 == 0) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Odd Layers") > -1) {
                if (theComp.layer(counter).index % 2 != 0) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Name is") > -1) {
                if (theComp.layer(counter).name == nameSelect.text) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Name contains") > -1) {
                if (theComp.layer(counter).name.indexOf(nameSelect.text) > -1) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Has Parent") > -1) {
                if (theComp.layer(counter).parent != null) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (mySelection[listLength].text.indexOf("Has no Parent") > -1) {
                if (theComp.layer(counter).parent == null) {
                  if (orButton.value == true) {
                    theComp.layer(counter).selected = true;
                  } else if (norButton.value == true) {
                    theComp.layer(counter).selected = false;
                  } else {
                    myAndArr.push(counter);
                  }
                }
              }
              if (
                mySelection[listLength].text.indexOf("Adjustment Layer") > -1
              ) {
                testForAttribute(
                  theComp.layer(counter).adjustmentLayer,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("Null Object") > -1) {
                testForAttribute(
                  theComp.layer(counter).nullLayer,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("Shy On") > -1) {
                testForAttribute(
                  theComp.layer(counter).shy,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("Shy Off") > -1) {
                testForAttribute(
                  theComp.layer(counter).shy,
                  counter,
                  false,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("Video Enabled") > -1) {
                testForAttribute(
                  theComp.layer(counter).active,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("Video Disabled") > -1) {
                testForAttribute(
                  theComp.layer(counter).active,
                  counter,
                  false,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("3D Layer") > -1) {
                testForAttribute(
                  theComp.layer(counter).threeDLayer,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("2D Layer") > -1) {
                testForAttribute(
                  theComp.layer(counter).threeDLayer,
                  counter,
                  false,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("Guide Layer") > -1) {
                testForAttribute(
                  theComp.layer(counter).guideLayer,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (
                mySelection[listLength].text.indexOf("Motion Blur Enabled") > -1
              ) {
                testForAttribute(
                  theComp.layer(counter).motionBlur,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (
                mySelection[listLength].text.indexOf("Motion Blur Disabled") >
                -1
              ) {
                testForAttribute(
                  theComp.layer(counter).motionBlur,
                  counter,
                  false,
                  orButton.value,
                  norButton.value,
                );
              }
              if (mySelection[listLength].text.indexOf("Is Track Matte") > -1) {
                testForAttribute(
                  theComp.layer(counter).isTrackMatte,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (
                mySelection[listLength].text.indexOf("Has Track Matte") > -1
              ) {
                testForAttribute(
                  theComp.layer(counter).hasTrackMatte,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (
                mySelection[listLength].text.indexOf("Has Track Matte") > -1
              ) {
                testForAttribute(
                  theComp.layer(counter).hasTrackMatte,
                  counter,
                  true,
                  orButton.value,
                  norButton.value,
                );
              }
              if (theComp.layer(counter).selected == true) {
                changeVisibility(
                  theComp.layer(counter),
                  selectionVisibilityModeList.selection,
                );
                if (
                  setSolo.selection.index == 1 &&
                  selectionVisibilityModeList.selection.index != 2 &&
                  selectionVisibilityModeList.selection.index != 6
                ) {
                  theComp.layer(counter).solo = true;
                } else {
                  if (
                    setSolo.selection.index == 2 &&
                    selectionVisibilityModeList.selection.index != 2 &&
                    selectionVisibilityModeList.selection.index != 6
                  ) {
                    theComp.layer(counter).solo = false;
                  }
                }
                if (setLock.selection.index == 1) {
                  theComp.layer(counter).locked = true;
                } else {
                  if (setLock.selection.index == 2) {
                    theComp.layer(counter).locked = false;
                  }
                }
              }
            }
          }
          if (orButton.value == false) {
            function checkAndArr(arr) {
              var a = [];
              var b = [];
              arr.sort();
              for (var i = 0; i < arr.length; i += 1) {
                if (arr[i] !== prev) {
                  a.push(arr[i]);
                  b.push(1);
                } else {
                  b[b.length - 1]++;
                }
                prev = arr[i];
              }
              return [a, b];
            }
            var andTarget = mySelection.length;
            var result = checkAndArr(myAndArr);
            for (
              var andCount = 0;
              andCount <= theComp.numLayers;
              andCount += 1
            ) {
              if (result[1][andCount] == andTarget) {
                theComp.layer(result[0][andCount]).selected = true;
                if (theComp.layer(result[0][andCount]).selected == true) {
                  changeVisibility(
                    theComp.layer(result[0][andCount]),
                    selectionVisibilityModeList.selection,
                  );
                  if (
                    setSolo.selection.index == 1 &&
                    selectionVisibilityModeList.selection.index != 2 &&
                    selectionVisibilityModeList.selection.index != 6
                  ) {
                    theComp.layer(result[0][andCount]).solo = true;
                  } else {
                    if (
                      setSolo.selection.index == 2 &&
                      selectionVisibilityModeList.selection.index != 2 &&
                      selectionVisibilityModeList.selection.index != 6
                    ) {
                      theComp.layer(result[0][andCount]).solo = false;
                    }
                  }
                  if (setLock.selection.index == 1) {
                    theComp.layer(result[0][andCount]).locked = true;
                  } else {
                    if (setLock.selection.index == 2) {
                      theComp.layer(result[0][andCount]).locked = false;
                    }
                  }
                }
              }
            }
          }
          app.endUndoGroup();
        } else {
          if (selectionDepthModeList.selection != 3) {
            alert("Please select a composition first", "Warning");
          }
        }
      }
      var versionNr = "1.5";
      var credits =
        "Advanced Selection\rVersion " +
        versionNr +
        " - 2021 \r\r" +
        "by \r" +
        "GREGOR URABL, BA\r" +
        "https://www.gregorurabl.at";
      var helpMe =
        "BASIC FUNCTIONALITY\r--------------------\r\rFirst, select a composition in the project window and set filters by clicking on one or multiple elements in the list.\r\rMultiple selections are possible (and necessary with the AND Mode) by holding down the ctrl button.\r\r\nSelect if you want to filter all layers that bear at least one selected criteria with the \'OR\' button (Invert with \'NOR\') or use the \'AND\' button for layers that only bear all selected criteria.\nOr use the \'NOR\' Button to select everything except anything matching at least one of your selected criteria (NOR is an inverted OR).\r\rActivate the selected filters by clicking on the \'Select Layer\' Button\r\r\nSELECTION LEVEL\r--------------------\r\rYou may  choose the level of your selection with the dropdown menu besides the \'NOR\' Button. The options are:\n\r\r- Just Active Comp - Selects inside the currently active composition\r\n- Active Comp +1 - Selects inside the currently active composition plus one level deeper in precomps\r\n- Recursive - Selects inside the currently active composition and in all precomps\r\n- All Comps - Selects inside all compositions in the whole project.\r\r\nVISIBILITY CONTROL\r--------------------\r\r\nBesides the selection level, another dropdown list allows you to enable or disable the video (eye symbol) and audio (loudspeaker symbol) settings of selected layers.\r\r\nSOLO & LOCK CONTROL\r--------------------\r\r\nThe Solo & Lock Dropdowns allow you to enable or disable the Solo or Lock settings of selected layers.\r\nNote: layers with disabled video setting can\'t be set solo (AE removes the solo checkbox if a layer is disabled)";
      var aeVersion = app.version.substr(0, 4);
      var aeFolderName = "After Effects";
      var lang = app.isoLanguage;
      var homeFolder = Folder.userData.fsName.toString().replace(/\\/g, "/");
      if ($.os.indexOf("Windows") > -1) {
        aeSettingsFolderString =
          homeFolder + "/Adobe/" + aeFolderName + "/" + aeVersion;
      } else {
        aeSettingsFolderString =
          "~/Library/Preferences/Adobe/" + aeFolderName + "/" + aeVersion;
      }
      switch (lang) {
        case "en_US":
          userPath =
            aeSettingsFolderString +
            "/Adobe After Effects " +
            aeVersion +
            " Prefs-indep-general.txt";
          break;
        case "de_DE":
          userPath =
            aeSettingsFolderString +
            "/Adobe After Effects " +
            aeVersion +
            " Einstellungen-indep-general.txt";
          break;
        case "es_ES":
          userPath =
            aeSettingsFolderString +
            "/Adobe After Effects " +
            aeVersion +
            " Preferencias-indep-general.txt";
          break;
        case "fr_FR":
          userPath =
            aeSettingsFolderString +
            "/Adobe After Effects " +
            aeVersion +
            " Pr\xe9fs-indep-general.txt";
          break;
        case "it_IT":
          userPath =
            aeSettingsFolderString +
            "/Adobe After Effects " +
            aeVersion +
            " Preferenze di-indep-general.txt";
          break;
        default:
          userPath =
            aeSettingsFolderString +
            "/Adobe After Effects " +
            aeVersion +
            " Prefs-indep-general.txt";
          break;
      }
      var prefDataColor = new File(userPath);
      var prefDataLLabel = new File(userPath);
      var selectionDepthMode = [
        "Just Active Comp",
        "Active Comp +1",
        "Recursive",
        "All Comps",
      ];
      var selectionVisibilityMode = [
        "Select Only",
        "Video On",
        "Video Off",
        "Audio On",
        "Audio Off",
        "Video&Audio On",
        "Video&Audio Off",
      ];
      var soloDropSelect = [
        "Solo Function OFF",
        "Set Solo after Selection",
        "Remove Solo after Selection",
      ];
      var lockDropSelect = [
        "Lock Function OFF",
        "Lock after Selection",
        "Unlock Solo after Selection",
      ];
      var selectableTypes = [
        "Light",
        "Shape",
        "Text",
        "Camera",
        "Footage",
        "Blending Mode",
        "Label Color",
        "Adjustment Layer",
        "Null Object",
        "Solid",
        "Shy On",
        "Shy Off",
        "Video Enabled",
        "Video Disabled",
        "3D Layer",
        "2D Layer",
        "Guide Layer",
        "Motion Blur Enabled",
        "Motion Blur Disabled",
        "Is Track Matte",
        "Has Track Matte",
        "Even Layers",
        "Odd Layers",
        "Name contains",
        "Name is",
        "Has Parent",
        "Has no Parent",
      ];
      var selectableTypesWork = [
        "LightLayer",
        "ShapeLayer",
        "TextLayer",
        "CameraLayer",
        "AVLayer",
      ];
      var blendModes = [
        BlendingMode.NORMAL,
        BlendingMode.DISSOLVE,
        BlendingMode.DANCING_DISSOLVE,
        BlendingMode.DARKEN,
        BlendingMode.MULTIPLY,
        BlendingMode.COLOR_BURN,
        BlendingMode.CLASSIC_COLOR_BURN,
        BlendingMode.LINEAR_BURN,
        BlendingMode.DARKER_COLOR,
        BlendingMode.ADD,
        BlendingMode.LIGHTEN,
        BlendingMode.SCREEN,
        BlendingMode.COLOR_DODGE,
        BlendingMode.CLASSIC_COLOR_DODGE,
        BlendingMode.LINEAR_DODGE,
        BlendingMode.LIGHTER_COLOR,
        BlendingMode.OVERLAY,
        BlendingMode.SOFT_LIGHT,
        BlendingMode.HARD_LIGHT,
        BlendingMode.LINEAR_LIGHT,
        BlendingMode.VIVID_LIGHT,
        BlendingMode.PIN_LIGHT,
        BlendingMode.HARD_MIX,
        BlendingMode.DIFFERENCE,
        BlendingMode.CLASSIC_DIFFERENCE,
        BlendingMode.EXCLUSION,
        BlendingMode.SUBTRACT,
        BlendingMode.DIVIDE,
        BlendingMode.HUE,
        BlendingMode.SATURATION,
        BlendingMode.COLOR,
        BlendingMode.LUMINOSITY,
        BlendingMode.STENCIL_ALPHA,
        BlendingMode.STENCIL_LUMA,
        BlendingMode.SILHOUETE_ALPHA,
        BlendingMode.SILHOUETTE_LUMA,
        BlendingMode.ALPHA_ADD,
        BlendingMode.LUMINESCENT_PREMUL,
      ];
      var blendModesNames = [
        "Normal",
        "Dissolve",
        "Dancing Dissolve",
        "Darken",
        "Multiply",
        "Color Burn",
        "Classic Color Burn",
        "Linear Burn",
        "Darker Color",
        "Add",
        "Lighten",
        "Screen",
        "Color Dodge",
        "Classic Color Dodge",
        "Linear Dodge",
        "Lighter Color",
        "Overlay",
        "Soft Light",
        "Hard Light",
        "Linear Light",
        "Vivid Light",
        "Pin Light",
        "Hard Mix",
        "Difference",
        "Classic Difference",
        "Exclusion",
        "Subtract",
        "Divide",
        "Hue",
        "Saturation",
        "Color",
        "Luminosity",
        "Stencil Alpha",
        "Stencil Luma",
        "Silhouette Alpha",
        "Silhouette Luma",
        "Alpha Add",
        "Luminescent Premul",
      ];
      var labelColors = [];
      for (var i = 0; i < 16; i += 1) {
        labelColors.push(getLabelNamesFromPrefs()[i]);
      }
      var settingsGrpRowOne = myPanel.add(
        'group {orientation:"row", alignChildren:"left"}',
      );
      var andButton = settingsGrpRowOne.add(
        'radiobutton {text: "AND", value: false}',
      );
      var orButton = settingsGrpRowOne.add(
        'radiobutton {text: "OR", value: true}',
      );
      var norButton = settingsGrpRowOne.add(
        'radiobutton {text: "NOR", value: false}',
      );
      var selectionDepthModeList = settingsGrpRowOne.add(
        "dropdownlist",
        undefined,
        selectionDepthMode,
      );
      selectionDepthModeList.selection = 0;
      var selectionVisibilityModeList = settingsGrpRowOne.add(
        "dropdownlist",
        undefined,
        selectionVisibilityMode,
      );
      selectionVisibilityModeList.selection = 0;
      var settingsGrpRowTwo = myPanel.add(
        'group {orientation:"row", alignChildren:"left"}',
      );
      var setSolo = settingsGrpRowTwo.add(
        "dropdownlist",
        undefined,
        soloDropSelect,
      );
      var setLock = settingsGrpRowTwo.add(
        "dropdownlist",
        undefined,
        lockDropSelect,
      );
      setSolo.selection = 0;
      setLock.selection = 0;
      var myGrp = myPanel.add(
        'group {orientation:"row", alignChildren:"left"}',
      );
      var myDropdown = myGrp.add("listbox", [0, 0, 300, 100], selectableTypes, {
        multiselect: true,
        scrolling: true,
      });
      myDropdown.selection = 4;
      var myButtonGrp = myGrp.add(
        'group {orientation:"column", alignChildren:"fill"}',
      );
      var myButton = myButtonGrp.add(
        'button {text:"Select Layer",justify: "center"}',
      );
      var creditsButton = myButtonGrp.add('button {text:"About"}');
      var helpButton = myButtonGrp.add('button {text:"Help"}');
      blendModeList = myPanel.add(
        'group {orientation:"row", alignChildren:"left"}',
      );
      blendModeLabel = blendModeList.add('statictext {text:"Blending Mode: "}');
      blendSelect = blendModeList.add(
        "dropdownlist",
        undefined,
        blendModesNames,
      );
      blendSelect.selection = 0;
      labelColorLabel = blendModeList.add('statictext {text:"Label: "}');
      labelColorSelect = blendModeList.add(
        "dropdownlist",
        undefined,
        labelColors,
      );
      labelColorSelect.selection = 0;
      var labelColorPreview = blendModeList.add(
        "iconbutton",
        undefined,
        undefined,
        { name: "coloroption1", style: "toolbutton" },
      );
      labelColorPreview.size = [20, 20];
      var myColor = hexToRgb(getLabelsFromPrefs()[0]);
      labelColorPreview.fillBrush = labelColorPreview.graphics.newBrush(
        labelColorPreview.graphics.BrushType.SOLID_COLOR,
        myColor,
      );
      labelColorPreview.onDraw = customDraw;
      labelColorSelect.onChange = function () {
        var myColor = hexToRgb(
          getLabelsFromPrefs()[labelColorSelect.selection.index],
        );
        labelColorPreview.fillBrush = labelColorPreview.graphics.newBrush(
          labelColorPreview.graphics.BrushType.SOLID_COLOR,
          myColor,
        );
        labelColorPreview.notify("onDraw");
      };
      nameSelectGrp = myPanel.add(
        'group {orientation:"row", alignChildren:"left"}',
      );
      nameSelectLabel = nameSelectGrp.add('statictext {text:"Name: "}');
      nameSelect = nameSelectGrp.add(
        'edittext {text:"Enter Search String", size:[350,20]}',
      );
      myButton.onClick = function () {
        runPreComps(app.project.activeItem, myDropdown.selection);
      };
      creditsButton.onClick = function () {
        alert(credits, "About");
      };
      helpButton.onClick = function () {
        alert(helpMe, "Help");
      };
    }
    function changeVisibility(myTarget, visibilitySelection) {
      switch (visibilitySelection.index) {
        case 0:
          break;
        case 1:
          myTarget.enabled = true;
          break;
        case 2:
          myTarget.enabled = false;
          break;
        case 3:
          myTarget.audioEnabled = true;
          break;
        case 4:
          myTarget.audioEnabled = false;
          break;
        case 5:
          myTarget.enabled = true;
          myTarget.audioEnabled = true;
          break;
        case 6:
          myTarget.enabled = false;
          myTarget.audioEnabled = false;
          break;
        default:
          break;
      }
    }
    function getLabelsFromPrefs() {
      var prefDataColor = new File(userPath);
      var colorsArray = [];
      var colorsArraySorted = [];
      if (prefDataColor instanceof File) {
        prefDataColor.open("r");
        while (!prefDataColor.eof) {
          currentLineColor = prefDataColor.readln();
          if (currentLineColor != null && currentLineColor != "") {
            if (currentLineColor.indexOf('"Label Color ID 2 #') > -1) {
              currentLineColor = currentLineColor.split(" = ")[1];
              currentLineColor = currentLineColor.substr(
                2,
                currentLineColor.length,
              );
              currentLineColor = prefCodeToHexCode(currentLineColor);
              colorsArray.push(currentLineColor);
            }
          }
        }
        prefDataColor.close();
        colorsArraySorted[0] = colorsArray[0];
        for (var i = 1; i <= 8; i += 1) {
          colorsArraySorted[i] = colorsArray[i + 7];
        }
        for (var i = 9; i <= 15; i += 1) {
          colorsArraySorted[i] = colorsArray[i - 8];
        }
        return colorsArraySorted;
      }
    }
    function getLabelNamesFromPrefs() {
      var prefDataLabel = new File(userPath);
      var txtArray = [];
      var txtArraySorted = [];
      if (prefDataLabel instanceof File) {
        prefDataLabel.open("r");
        while (!prefDataLabel.eof) {
          currentLineLabel = prefDataLabel.readln();
          if (currentLineLabel != null && currentLineLabel != "") {
            if (currentLineLabel.indexOf('"Label Text ID 2 #') > -1) {
              currentLineLabel = currentLineLabel
                .split(" = ")[1]
                .replace(/"/g, "");
              txtArray.push(currentLineLabel);
            }
          }
        }
        prefDataLabel.close();
        if (txtArray.length == 32) {
          txtArray.splice(0, 16);
        }
        txtArraySorted[0] = txtArray[0];
        for (var i = 1; i <= 8; i += 1) {
          txtArraySorted[i] = txtArray[i + 7];
        }
        for (var i = 9; i <= 15; i += 1) {
          txtArraySorted[i] = txtArray[i - 8];
        }
        return txtArraySorted;
      }
    }
    function prefCodeToHexCode(str) {
      return str.replace(/"([^"]+)"/g, function (u, code) {
        var result = "";
        for (var i = 0; i < code.length; i += 1) {
          result += code.charCodeAt(i).toString(16);
        }
        return result;
      });
    }
    function hexToRgb(h) {
      var r = parseInt(cutHex(h).substring(0, 2), 16);
      var g = parseInt(cutHex(h).substring(2, 4), 16);
      var b = parseInt(cutHex(h).substring(4, 6), 16);
      if (r > 0) {
        r = r / 255;
      }
      if (g > 0) {
        g = g / 255;
      }
      if (b > 0) {
        b = b / 255;
      }
      return [r, g, b];
    }
    function cutHex(h) {
      return h.charAt(0) == "#" ? h.substring(1, 7) : h;
    }
    var myPanel =
      thisObj instanceof Panel
        ? thisObj
        : new Window("palette", "Advanced Selection", undefined, {
            resizeable: false,
          });
    main();
    myPanel.layout.layout(true);
    return myPanel;
  }
  var myScriptPal = myScript_buildUI(thisObj);
  if (myScriptPal != null && myScriptPal instanceof Window) {
    myScriptPal.center();
    myScriptPal.show();
  }
}
myScript(this);
