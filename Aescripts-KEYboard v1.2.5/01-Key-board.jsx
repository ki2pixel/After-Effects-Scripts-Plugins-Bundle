/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function KEYboard_allScript(thisObj) {
  function runKeyboard(thisObj) {
    function createUIMenu(menuData, settingJson2Obj) {
      var AEversion = app.version.substring(0, 4);
      w = new Window("palette", "KEYboard", undefined, { borderless: false });
      w.margins = 0;
      w.spacing = 0;
      w.alignChildren = ["fill", ""];
      var winPos = settingJson2Obj.mainUI_curPos;
      if (winPos[0] === 0 && winPos[1] === 0) {
      } else {
        if (settingJson2Obj.rememberWinPos == true) {
          w.location = settingJson2Obj.mainUI_curPos;
        }
      }
      var winGraphics = w.graphics;
      var gray = winGraphics.newPen(
        winGraphics.BrushType.SOLID_COLOR,
        menuData.gray,
        1,
      );
      var blue = winGraphics.newPen(
        winGraphics.BrushType.SOLID_COLOR,
        menuData.blue,
        1,
      );
      var balck = winGraphics.newPen(
        winGraphics.BrushType.SOLID_COLOR,
        menuData.black,
        1,
      );
      var chk = 1;
      if (chk) {
        if (AEversion < 12) {
          w.graphics.backgroundColor = w.graphics.newBrush(
            w.graphics.BrushType.SOLID_COLOR,
            menuData.darkGray,
          );
        } else {
          w.graphics.backgroundColor = w.graphics.newBrush(
            w.graphics.BrushType.SOLID_COLOR,
            menuData.white,
          );
        }
        var btnSize = [50, 50];
        var btnSizeWide = AEversion >= 14 ? [65, 50] : [50, 50];
        var grpSpacing = AEversion >= 14 ? 1 : 3;
        var leftGrp = w.add("group");
        var rightGrp = w.add("group");
        w.orientation = "row";
        leftGrp.orientation = "column";
        leftGrp.spacing = 0;
        leftGrp.alignChildren = ["fill", "fill"];
        rightGrp.orientation = "column";
        rightGrp.spacing = 0;
        rightGrp.alignChildren = ["fill", "fill"];
        rightGrp.margins = 0;
        var rowFnParent = leftGrp.add("group");
        rowFnParent.spacing = 2;
        var row2parent = leftGrp.add("group");
        row2parent.spacing = 0;
        row2parent.alignChildren = ["fill", "fill"];
        var row3 = leftGrp.add("group");
        var rowFn = rowFnParent.add("group");
        rowFnParent.alignChildren = ["center", "fill"];
        rowFn.margins = 5;
        rowFn.spacing = 2;
        rowFn.orientation = "row";
        var row1 = rowFnParent.add("group");
        row1.margins = 5;
        row1.spacing = grpSpacing;
        row1.orientation = "row";
        var rowInOut = rowFnParent.add("group");
        rowInOut.margins = 5;
        rowInOut.spacing = grpSpacing;
        rowInOut.orientation = "row";
        var rowExpBtn = rowFnParent.add("group");
        rowExpBtn.alignChildren = ["left", ""];
        rowExpBtn.margins = 5;
        rowExpBtn.spacing = grpSpacing;
        rowExpBtn.orientation = "row";
        var createButton = function (btnObj, btnGrp, menuData) {
          switch (btnObj.mode) {
            case "easeIn":
              if (btnObj.expStr <= 33) {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.in1);
              } else if (btnObj.expStr <= 66) {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.in2);
              } else {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.in3);
              }
              newBtn.helpTip = "easeIn : " + btnObj.expStr + "%";
              amountStr = btnGrp.add("statictext", undefined, btnObj.expStr);
              amountStr.alignment = ["", "bottom"];
              break;
            case "easeOut":
              if (btnObj.expStr <= 33) {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.out1);
              } else if (btnObj.expStr <= 66) {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.out2);
              } else {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.out3);
              }
              newBtn.helpTip = "easeOut : " + btnObj.expStr + "%";
              amountStr = btnGrp.add("statictext", undefined, btnObj.expStr);
              amountStr.alignment = ["", "bottom"];
              break;
            case "easeInOut":
              if (btnObj.expStr <= 33) {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.inOut1);
              } else if (btnObj.expStr <= 66) {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.inOut2);
              } else {
                newBtn = btnGrp.add("iconbutton", undefined, menuData.inOut3);
              }
              newBtn.helpTip = "easeInOut : " + btnObj.expStr + "%";
              amountStr = btnGrp.add("statictext", undefined, btnObj.expStr);
              amountStr.alignment = ["", "bottom"];
              break;
            case "expression":
              newBtn = btnGrp.add("button", undefined, btnObj.title);
              newBtn.helpTip = btnObj.title;
              break;
            case "JavaScript":
              newBtn = btnGrp.add("button", undefined, btnObj.title);
              newBtn.helpTip = btnObj.title;
              break;
          }
          newBtn.preferredSize = btnSize;
          return newBtn;
        };
        var btn_01Grp = rowExpBtn.add("group");
        btn_01Grp.orientation = "stack";
        var btn_01 = createButton(settingJson2Obj.btn01, btn_01Grp, menuData);
        var btn_01_num = btn_01Grp.add("image", undefined, menuData.num01);
        btn_01_num.alignment = ["", "top"];
        var btn_02Grp = rowExpBtn.add("group");
        btn_02Grp.orientation = "stack";
        var btn_02 = createButton(settingJson2Obj.btn02, btn_02Grp, menuData);
        var btn_02_num = btn_02Grp.add("image", undefined, menuData.num02);
        btn_02_num.alignment = ["", "top"];
        var btn_03Grp = rowExpBtn.add("group");
        btn_03Grp.orientation = "stack";
        var btn_03 = createButton(settingJson2Obj.btn03, btn_03Grp, menuData);
        var btn_03_num = btn_03Grp.add("image", undefined, menuData.num03);
        btn_03_num.alignment = ["", "top"];
        var btn_04Grp = rowExpBtn.add("group");
        btn_04Grp.orientation = "stack";
        var btn_04 = createButton(settingJson2Obj.btn04, btn_04Grp, menuData);
        var btn_04_num = btn_04Grp.add("image", undefined, menuData.num04);
        btn_04_num.alignment = ["", "top"];
        var btn_05Grp = rowExpBtn.add("group");
        btn_05Grp.orientation = "stack";
        var btn_05 = createButton(settingJson2Obj.btn05, btn_05Grp, menuData);
        var btn_05_num = btn_05Grp.add("image", undefined, menuData.num05);
        btn_05_num.alignment = ["", "top"];
        var btn_06Grp = rowExpBtn.add("group");
        btn_06Grp.orientation = "stack";
        var btn_06 = createButton(settingJson2Obj.btn06, btn_06Grp, menuData);
        var btn_06_num = btn_06Grp.add("image", undefined, menuData.num06);
        btn_06_num.alignment = ["", "top"];
        var btn_07Grp = rowExpBtn.add("group");
        btn_07Grp.orientation = "stack";
        var btn_07 = createButton(settingJson2Obj.btn07, btn_07Grp, menuData);
        var btn_07_num = btn_07Grp.add("image", undefined, menuData.num07);
        btn_07_num.alignment = ["", "top"];
        var btn_08Grp = rowExpBtn.add("group");
        btn_08Grp.orientation = "stack";
        var btn_08 = createButton(settingJson2Obj.btn08, btn_08Grp, menuData);
        var btn_08_num = btn_08Grp.add("image", undefined, menuData.num08);
        btn_08_num.alignment = ["", "top"];
        var btn_09Grp = rowExpBtn.add("group");
        btn_09Grp.orientation = "stack";
        var btn_09 = createButton(settingJson2Obj.btn09, btn_09Grp, menuData);
        var btn_09_num = btn_09Grp.add("image", undefined, menuData.num09);
        btn_09_num.alignment = ["", "top"];
        btn_01.onClick = function () {
          applyExpression(settingJson2Obj.btn01);
          w.hide();
        };
        btn_02.onClick = function () {
          applyExpression(settingJson2Obj.btn02);
          w.hide();
        };
        btn_03.onClick = function () {
          applyExpression(settingJson2Obj.btn03);
          w.hide();
        };
        btn_04.onClick = function () {
          applyExpression(settingJson2Obj.btn04);
          w.hide();
        };
        btn_05.onClick = function () {
          applyExpression(settingJson2Obj.btn05);
          w.hide();
        };
        btn_06.onClick = function () {
          applyExpression(settingJson2Obj.btn06);
          w.hide();
        };
        btn_07.onClick = function () {
          applyExpression(settingJson2Obj.btn07);
          w.hide();
        };
        btn_08.onClick = function () {
          applyExpression(settingJson2Obj.btn08);
          w.hide();
        };
        btn_09.onClick = function () {
          applyExpression(settingJson2Obj.btn09);
          w.hide();
        };
        var row2 = row2parent.add("group");
        row2.graphics.backgroundColor = row2.graphics.newBrush(
          row2.graphics.BrushType.SOLID_COLOR,
          menuData.green,
        );
        row2.alignChildren = ["fill", "fill"];
        row2.margins = 5;
        row2.spacing = grpSpacing;
        row2.orientation = "row";
        var row2button = row2.add("iconbutton", undefined, menuData.Qrow1);
        var row2button2 = row2.add("iconbutton", undefined, menuData.Qrow2);
        var row2button4 = row2.add("iconbutton", undefined, menuData.Qrow4);
        var row2button3 = row2.add("iconbutton", undefined, menuData.Qrow3);
        var row2button5 = row2.add("iconbutton", undefined, menuData.Qrow5);
        var row2button6 = row2.add("iconbutton", undefined, menuData.Qrow6);
        var row2button7 = row2.add("iconbutton", undefined, menuData.Qrow7);
        var row2button8 = row2.add("iconbutton", undefined, menuData.Qrow8);
        var row2button9 = row2.add("iconbutton", undefined, menuData.Qrow9);
        var row2button10 = row2.add("iconbutton", undefined, menuData.Qrow10);
        row2button.helpTip =
          "Copy selected keyframes and\rpaste to current comp\u2019s time.";
        row2button2.helpTip =
          "Copy selected keyframes and\rmirror to current comp\u2019s time.";
        row2button3.helpTip = "Time-Reverse keyframes.";
        row2button4.helpTip =
          "Move selected keyframes to\rcurrent comp\u2019s time.";
        row2button5.helpTip =
          "Move selected keyframes which of \rtime are not integer frames.";
        row2button6.helpTip =
          "Set spatial interpolation of \rselected keyframes to  Linaer.";
        row2button7.helpTip =
          "Shift selected keyframes \rby frames or seconds.";
        row2button8.helpTip =
          "Shift selected keyframes \rby frames or seconds.";
        row2button9.helpTip =
          "Random selected keyframes \rby frames or seconds.";
        row2button.preferredSize = btnSizeWide;
        row2button2.preferredSize = btnSizeWide;
        row2button3.preferredSize = btnSizeWide;
        row2button4.preferredSize = btnSizeWide;
        row2button5.preferredSize = btnSizeWide;
        row2button6.preferredSize = btnSizeWide;
        row2button7.preferredSize = btnSizeWide;
        row2button8.preferredSize = btnSizeWide;
        row2button9.preferredSize = btnSizeWide;
        row2button10.preferredSize = btnSizeWide;
        row2button.onClick = function () {
          w.hide();
          cloneKey(settingJson2Obj);
        };
        row2button2.onClick = function () {
          w.hide();
          mirrorKey(settingJson2Obj);
        };
        row2button3.onClick = function () {
          app.executeCommand(3693);
          w.hide();
        };
        row2button4.onClick = function () {
          w.hide();
          alignKey(settingJson2Obj);
        };
        row2button5.onClick = function () {
          w.hide();
          organizeKey();
        };
        row2button6.onClick = function () {
          setLinearInter();
          w.hide();
        };
        row2button7.onClick = function () {
          w.hide();
          shiftUpKey(settingJson2Obj);
        };
        row2button8.onClick = function () {
          w.hide();
          shiftDownKey(settingJson2Obj);
        };
        row2button9.onClick = function () {
          w.hide();
          randomKey(settingJson2Obj);
        };
        row2button10.onClick = function () {
          w.hide();
          alignLayers();
        };
        row3.graphics.backgroundColor = row3.graphics.newBrush(
          row3.graphics.BrushType.SOLID_COLOR,
          menuData.yellow,
        );
        row3.alignChildren = ["fill", "fill"];
        row3.margins = 5;
        row3.spacing = grpSpacing;
        row3.orientation = "row";
        var row3button = row3.add("button", undefined, "A: FoolParent");
        var row3button2 = row3.add("button", undefined, "S: QuickVal");
        var row3button3 = row3.add(
          "button",
          undefined,
          "D: Reverse Layer Order",
        );
        var row3button4 = row3.add("button", undefined, "F: Purge All");
        var rowSettingbutton = row3.add("button", undefined, "L: Options");
        row3button.helpTip = "Set Parent thorugh comp viewer.";
        row3button2.helpTip =
          "Modify keyframes\u2019 value with keyboard\rIt\u2019s useful after shifting keys.";
        row3button3.helpTip = "Reverse Layer Order.";
        row3button4.helpTip = "Purge all memory and disk cache.";
        row3button.onClick = function () {
          runFoolParent(settingJson2Obj);
          w.hide();
        };
        row3button2.onClick = function () {
          runQuickVal(settingJson2Obj, 0, settingJson2Obj.quickVal_preVal);
          w.hide();
        };
        row3button3.onClick = function () {
          reverseLayerOrder();
          w.hide();
        };
        row3button4.onClick = function () {
          app.executeCommand(10200);
          w.hide();
        };
        rowSettingbutton.onClick = function () {
          modifyShortcut(menuData, settingJson2Obj);
          w.hide();
        };
        var row4 = leftGrp.add("group");
        row4.graphics.backgroundColor = row4.graphics.newBrush(
          row4.graphics.BrushType.SOLID_COLOR,
          menuData.red,
        );
        row4.margins = 5;
        row4.spacing = grpSpacing;
        row4.orientation = "row";
        var row4button = row4.add("button", undefined, "Z: Path");
        var row4button2 = row4.add("button", undefined, "X: 0\xbb100");
        var row4button3 = row4.add("button", undefined, "C: 100\xbb0");
        var row4button4 = row4.add("button", undefined, "V: Fool Paste");
        row4button.preferredSize[0] = 40;
        row4button2.preferredSize[0] = 40;
        row4button3.preferredSize[0] = 40;
        row4button4.preferredSize[0] = 60;
        row4button.helpTip =
          "Add keys for selected layers\u2019 Path property.";
        row4button2.helpTip =
          "Add 2 keys which of value are [0 & 100] \rfor selected properties.";
        row4button3.helpTip =
          "Add 2 keys which of value are [100 & 0] \rfor selected properties.";
        row4button.alignment = ["fill", "fill"];
        row4button2.alignment = ["fill", "fill"];
        row4button3.alignment = ["fill", "fill"];
        row4button.onClick = function () {
          addPathKey(settingJson2Obj);
          w.hide();
        };
        row4button2.onClick = function () {
          add2Keys(0, 100);
          w.hide();
        };
        row4button3.onClick = function () {
          add2Keys(100, 0);
          w.hide();
        };
        row4button4.onClick = function () {
          runFoolPaste(settingJson2Obj);
          w.hide();
        };
        if (isTrial) {
          var row5 = leftGrp.add("group");
          row5.graphics.backgroundColor = row4.graphics.newBrush(
            row5.graphics.BrushType.SOLID_COLOR,
            menuData.black,
          );
          row5.alignChildren = ["center", ""];
          var registration =
            wow.getRegistration() +
            "  ||  Click \'Options\' to activate the license.";
          var registrationText = row5.add(
            "statictext",
            undefined,
            registration,
            { multiline: false },
          );
          row2button6.enabled = false;
          row2button7.enabled = false;
          row2button8.enabled = false;
          row2button9.enabled = false;
          row2button10.enabled = false;
          row3button.enabled = false;
          row3button2.enabled = false;
          row3button3.enabled = false;
          row3button4.enabled = false;
          row4button4.enabled = false;
        }
        if (spell == true) {
          var row5 = leftGrp.add("group");
          row5.graphics.backgroundColor = row4.graphics.newBrush(
            row5.graphics.BrushType.SOLID_COLOR,
            menuData.black,
          );
          row5.alignChildren = ["center", ""];
          var registration = "SPECIAL VERSION for " + spellName;
          var registrationText = row5.add(
            "statictext",
            undefined,
            registration,
            { multiline: false },
          );
        }
        if (AEversion < 13) {
          var rowInput = leftGrp.add("group");
          rowInput.graphics.backgroundColor = rowInput.graphics.newBrush(
            rowInput.graphics.BrushType.SOLID_COLOR,
            menuData.darkGray,
          );
          rowInput.alignment = ["fill", ""];
          rowInput.margins = 3;
          var inputText = rowInput.add(
            "edittext",
            undefined,
            "press down shortcut...",
          );
          inputText.alignment = ["fill", ""];
          inputText.active = true;
        }
      } else {
        w.graphics.backgroundColor = w.graphics.newBrush(
          w.graphics.BrushType.SOLID_COLOR,
          menuData.gray,
        );
        var titleGrp = w.add("group");
        titleGrp.alignChildren = ["center", ""];
        titleGrp.margins = 3;
        titleGrp.graphics.backgroundColor = titleGrp.graphics.newBrush(
          titleGrp.graphics.BrushType.SOLID_COLOR,
          menuData.blue,
        );
        var titleStr = [];
        titleStr[0] = "\u03c3`\u2200\xb4)\u03c3~~~~";
        titleStr[1] = "~~~\u30fd(\u25cf\xb4\u2200`\u25cf)\uff89~~~";
        titleStr[2] = "(,,\u30fb\u03c9\u30fb,,)";
        titleStr[3] = "(((\uff9f\u0434\uff9f)))";
        titleStr[4] = "~~~\u10da(\u30fb\xb4\uff6a`\u30fb\u10da)";
        titleStr[5] = "\u03b5\u2261\uff8d( \xb4\u2200`)\uff89";
        titleStr[6] =
          "(\xb4\uff65\u0434\uff65\uff40)\uff8a(\uff65\u0434\uff65\uff40*)";
        var index = Math.floor(Math.random() * 7);
        var title = titleGrp.add(
          "statictext",
          [0, 0, 180, 15],
          titleStr[index],
          { multiline: true },
        );
        title.graphics.foregroundColor = gray;
        var commandAllGrp = w.add("group");
        commandAllGrp.alignChildren = ["top", "fill"];
        commandAllGrp.spacing = 0;
        var commandGrp1 = commandAllGrp.add("group");
        var commandGrp2 = commandAllGrp.add("group");
        var commandGrp3 = commandAllGrp.add("group");
        var commandGrp5 = commandAllGrp.add("group");
        commandGrp1.alignChildren = ["top", "fill"];
        commandGrp2.alignChildren = ["top", "fill"];
        commandGrp3.alignChildren = ["top", "fill"];
        commandGrp5.alignChildren = ["top", "fill"];
        commandGrp1.margins.left = 5;
        commandGrp2.margins.left = 5;
        commandGrp3.margins.left = 5;
        commandGrp5.margins.left = 5;
        var infoStrAll =
          menuData.infoStrGrp1 +
          menuData.infoStrGrp2 +
          menuData.infoStrGrp3 +
          menuData.infoStrGrp4;
        var command1 = commandGrp1.add(
          "statictext",
          [0, 0, 100, 100],
          menuData.infoStrGrp1,
          { multiline: true },
        );
        var command2 = commandGrp2.add(
          "statictext",
          [0, 0, 150, 120],
          menuData.infoStrGrp2,
          { multiline: true },
        );
        var command3 = commandGrp3.add(
          "statictext",
          [0, 0, 130, 100],
          menuData.infoStrGrp3,
          { multiline: true },
        );
        var command5 = commandGrp5.add(
          "statictext",
          [0, 0, 80, 100],
          menuData.infoStrGrp5,
          { multiline: true },
        );
        commandAllGrp.graphics.foregroundColor = gray;
        commandGrp1.graphics.backgroundColor = commandGrp1.graphics.newBrush(
          commandGrp1.graphics.BrushType.SOLID_COLOR,
          menuData.lightGray,
        );
        commandGrp2.graphics.backgroundColor = commandGrp2.graphics.newBrush(
          commandGrp2.graphics.BrushType.SOLID_COLOR,
          menuData.darkGray,
        );
        commandGrp3.graphics.backgroundColor = commandGrp3.graphics.newBrush(
          commandGrp3.graphics.BrushType.SOLID_COLOR,
          menuData.lightGray,
        );
        commandGrp5.graphics.backgroundColor = commandGrp5.graphics.newBrush(
          commandGrp5.graphics.BrushType.SOLID_COLOR,
          menuData.darkGray,
        );
      }
      if (AEversion < 12 || settingJson2Obj.prefs_AutoClose === false) {
      } else {
        w.addEventListener("blur", function () {
          w.close();
        });
        w.onDeactivate = function () {
          w.close();
        };
      }
      w.addEventListener(
        "keydown",
        function (event) {
          if (event.keyName == "Escape") {
            settingJson2Obj.escFlag = true;
          }
          w.hide();
          handle_key(event, menuData, settingJson2Obj);
          var myComp = app.project.activeItem;
        },
        false,
      );
      w.onClose = function () {
        settingJson2Obj.mainUI_curPos = [w.location.x, w.location.y];
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      w.show();
      settingJson2Obj.mainUI_curPos = [w.location.x, w.location.y];
      createJsonFile("KEYboard_setting.json", settingJson2Obj);
    }
    function handle_key(key, menuData, settingJson2Obj) {
      switch (key.keyName) {
        case "A":
          if (!isTrial) {
            runFoolParent(settingJson2Obj);
          }
          break;
        case "S":
          if (!isTrial) {
            runQuickVal(settingJson2Obj, 0, settingJson2Obj.quickVal_preVal);
          }
          break;
        case "D":
          if (!isTrial) {
            reverseLayerOrder();
          }
          break;
        case "F":
          if (!isTrial) {
            app.executeCommand(10200);
          }
          break;
        case "G":
          break;
        case "Q":
          cloneKey(settingJson2Obj);
          break;
        case "W":
          mirrorKey(settingJson2Obj);
          break;
        case "R":
          app.executeCommand(3693);
          break;
        case "E":
          alignKey(settingJson2Obj);
          break;
        case "T":
          organizeKey();
          break;
        case "Y":
          if (!isTrial) {
            setLinearInter();
          }
          break;
        case "U":
          if (!isTrial) {
            shiftUpKey(settingJson2Obj);
          }
          break;
        case "I":
          if (!isTrial) {
            shiftDownKey(settingJson2Obj);
          }
          break;
        case "O":
          if (!isTrial) {
            randomKey(settingJson2Obj);
          }
          break;
        case "P":
          if (!isTrial) {
            alignLayers();
          }
          break;
        case "Z":
          addPathKey(settingJson2Obj);
          break;
        case "X":
          add2Keys(0, 100);
          break;
        case "C":
          add2Keys(100, 0);
          break;
        case "V":
          if (!isTrial) {
            runFoolPaste(settingJson2Obj);
          }
          break;
        case "1":
          applyExpression(settingJson2Obj.btn01);
          break;
        case "2":
          applyExpression(settingJson2Obj.btn02);
          break;
        case "3":
          applyExpression(settingJson2Obj.btn03);
          break;
        case "4":
          applyExpression(settingJson2Obj.btn04);
          break;
        case "5":
          applyExpression(settingJson2Obj.btn05);
          break;
        case "6":
          applyExpression(settingJson2Obj.btn06);
          break;
        case "7":
          applyExpression(settingJson2Obj.btn07);
          break;
        case "8":
          applyExpression(settingJson2Obj.btn08);
          break;
        case "9":
          applyExpression(settingJson2Obj.btn09);
          break;
        case "F1":
          break;
        case "F2":
          break;
        case "F3":
          break;
        case "L":
          modifyShortcut(menuData, settingJson2Obj);
          break;
      }
    }
    function handle_shortcut(key, input) {
      var osName = $.os.substring(0, 3);
      input.text = "";
      if (key.ctrlKey) {
        input.text += osName == "Mac" ? "macControl+" : "Ctrl+";
      }
      if (key.metaKey) {
        input.text += "Cmd+";
      }
      if (key.altKey) {
        input.text += osName == "Mac" ? "Option+" : "Alt+";
      }
      if (key.shiftKey) {
        input.text += "Shift+";
      }
      input.text += key.keyName;
    }
    function createResourceFile(filename, binaryString) {
      try {
        var userFolder = Folder(Folder.userData.absoluteURI + "/Ola script UI");
        if (!userFolder.exists) {
          userFolder.create();
        }
        var myFile = new File(
          Folder.userData.absoluteURI + "/Ola script UI/" + filename,
        );
        myFile.encoding = "BINARY";
        myFile.open("w");
        myFile.write(binaryString);
        myFile.close();
        return myFile;
      } catch (err) {
        alert("Error in createResourceFile function\n" + err.toString());
      }
    }
    function createJsonFile(filename, inputObj) {
      if (inputObj.escFlag != undefined) {
        if (inputObj.escFlag == true) {
          return;
        }
      }
      try {
        var userFolder = Folder(Folder.userData.absoluteURI + "/Ola script UI");
        if (!userFolder.exists) {
          userFolder.create();
        }
        var myFile = new File(
          Folder.userData.absoluteURI + "/Ola script UI/" + filename,
        );
        if (myFile.open("w")) {
          myFile.encoding = "UTF-8";
          myFile.write(JSON.stringify(inputObj, undefined, "\r\n"));
          myFile.close();
        }
        return myFile;
      } catch (err) {
        alert("Error in createResourceFile function\n" + err.toString());
      }
    }
    function testIO(prefFile, shortcut) {
      var osName = $.os.substring(0, 3);
      var AEversion = Number(app.version.substring(0, 4));
      var textFile = prefFile;
      var matchStr = "";
      var pathname = $.fileName;
      var leafname = pathname.split("\\").pop().split("/").pop();
      var itemIndex = Number(leafname.substring(1, 2));
      if (osName == "Mac") {
        if (AEversion >= 14 && AEversion <= 14.1) {
          matchStr = '\t"ExecuteScriptMenuItem0' + itemIndex + '" = ';
        } else {
          matchStr = '\t"ExecuteScriptMenuItem0' + itemIndex + 1 + '" = ';
        }
      } else {
        matchStr = '\t"ExecuteScriptMenuItem0' + itemIndex + '" = ';
      }
      textFile.copy(textFile.fsName + ".bak");
      if (textFile !== null) {
        var textLines = [];
        textFile.open("r", "TEXT", undefined);
        var frontStr = [];
        var backStr = [];
        var chk = 0;
        while (!textFile.eof) {
          var txt = textFile.readln();
          if (chk === 0) {
            frontStr.push(txt);
          } else {
            backStr.push(txt);
          }
          if (txt.match(matchStr) !== null) {
            chk = 1;
          }
        }
        textFile.close();
        textFile.open("w", undefined, undefined);
        textFile.encoding = "UTF-8";
        if (osName == "Mac") {
          textFile.lineFeed = "Macintosh";
        } else {
          textFile.lineFeed = "Windows";
        }
        for (var i = 0; i < frontStr.length - 1; i += 1) {
          textFile.writeln(frontStr[i]);
        }
        textFile.writeln(matchStr + '"(' + shortcut + ')"');
        for (var j = 0; j < backStr.length; j += 1) {
          textFile.writeln(backStr[j]);
        }
        textFile.close();
      }
    }
    function runScript(thisObj) {
      function createDefaultJson() {
        var defaultSettingObj = {};
        defaultSettingObj.btn01 = {};
        defaultSettingObj.btn02 = {};
        defaultSettingObj.btn03 = {};
        defaultSettingObj.btn04 = {};
        defaultSettingObj.btn05 = {};
        defaultSettingObj.btn06 = {};
        defaultSettingObj.btn07 = {};
        defaultSettingObj.btn08 = {};
        defaultSettingObj.btn09 = {};
        defaultSettingObj.btn01.title = "easeOut";
        defaultSettingObj.btn01.mode = "easeOut";
        defaultSettingObj.btn01.expStr = "80";
        defaultSettingObj.btn01.index = "1";
        defaultSettingObj.btn02.title = "easeIn";
        defaultSettingObj.btn02.mode = "easeIn";
        defaultSettingObj.btn02.expStr = "80";
        defaultSettingObj.btn02.index = "2";
        defaultSettingObj.btn03.title = "easeInOut";
        defaultSettingObj.btn03.mode = "easeInOut";
        defaultSettingObj.btn03.expStr = "30,80";
        defaultSettingObj.btn03.index = "3";
        defaultSettingObj.btn04.title = "posT";
        defaultSettingObj.btn04.mode = "expression";
        defaultSettingObj.btn04.expStr = "posterizeTime(8);\nvalue;";
        defaultSettingObj.btn04.index = "4";
        defaultSettingObj.btn05.title = "toComp";
        defaultSettingObj.btn05.mode = "expression";
        defaultSettingObj.btn05.expStr =
          "thisLayer.toComp(thisLayer.anchorPoint)+value;";
        defaultSettingObj.btn05.index = "5";
        defaultSettingObj.btn06.title = "wiggle";
        defaultSettingObj.btn06.mode = "expression";
        defaultSettingObj.btn06.expStr = "wiggle(15,50);";
        defaultSettingObj.btn06.index = "6";
        defaultSettingObj.btn07.title = "time";
        defaultSettingObj.btn07.mode = "expression";
        defaultSettingObj.btn07.expStr = "time*100;";
        defaultSettingObj.btn07.index = "7";
        defaultSettingObj.btn08.title = "loop";
        defaultSettingObj.btn08.mode = "expression";
        defaultSettingObj.btn08.expStr = "loopOut(\'cycle\');";
        defaultSettingObj.btn08.index = "8";
        defaultSettingObj.btn09.title = "separate D";
        defaultSettingObj.btn09.mode = "JavaScript";
        defaultSettingObj.btn09.expStr =
          'try {\n for (var i=0;i<app.project.activeItem.selectedLayers.length;i++) \n  app.project.activeItem.selectedLayers[i].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated = (app.project.activeItem.selectedLayers[i].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated)?false:true;\n    }\n catch (e) {\n     alert (e);\n     }';
        defaultSettingObj.btn09.index = "9";
        defaultSettingObj.randomKeys_preVal = [0, 5];
        defaultSettingObj.randomKeys_preUnit = "Frames";
        defaultSettingObj.shiftUpKeys_preVal = 5;
        defaultSettingObj.shiftUpKeys_preUnit = "Frames";
        defaultSettingObj.shiftDownKeys_preVal = 5;
        defaultSettingObj.shiftDownKeys_preUnit = "Frames";
        defaultSettingObj.quickVal_preVal = 10;
        defaultSettingObj.quickVal_constrain = 0;
        defaultSettingObj.prefs_AutoClose = true;
        defaultSettingObj.prefs_AlignLeft = false;
        defaultSettingObj.prefs_AddMaskPathKey = false;
        defaultSettingObj.prefs_SelectCloneKeys = true;
        defaultSettingObj.mainUI_curPos = [0, 0];
        defaultSettingObj.foolParent_curPos = [0, 0];
        defaultSettingObj.foolPaste_curPos = [0, 0];
        defaultSettingObj.quickVal_curPos = [0, 0];
        defaultSettingObj.shiftKey_curPos = [0, 0];
        defaultSettingObj.rememberWinPos = true;
        return defaultSettingObj;
      }
      var menuData = {};
      menuData.gray = [0.9, 0.9, 0.9, 1];
      menuData.blue = [0.2, 0.3, 0.4, 1];
      menuData.lightGray = HexToRGB("#d0d0d0");
      menuData.brown = HexToRGB("#E1D9C6");
      menuData.darkGray = HexToRGB("#727171");
      menuData.darkGray2 = HexToRGB("#4b4b4b");
      menuData.black = HexToRGB("#222222");
      menuData.red = HexToRGB("#D66EA7");
      menuData.purple = HexToRGB("#79519a");
      menuData.white = HexToRGB("#fefdee");
      menuData.green = HexToRGB("#6fc2a0");
      menuData.darkGreen = HexToRGB("#39868E");
      menuData.yellow = HexToRGB("#EBAE6D");
      menuData.orange = HexToRGB("#D08965");
      menuData.infoStrGrp1 =
        "<<Add>>\r1...Null\r2...Square\r3...Ellipse\r4...Vertical Line\r5...Horizonal Line";
      menuData.infoStrGrp2 =
        "<<Key>>\rQ...Clone\rW...Mirror\rE...Time Reverse\rR...Align...\rT...Organize\rY...Add Path Key\rU...Set Linear Interpolation";
      menuData.infoStrGrp3 =
        "<<Layer>>\rA...Fool Parent\rS...Reverse Layer Order\rD...Select Last Layer\rF...Mode: Difference";
      menuData.infoStrGrp4 = "<<Expression>>\rZ...wiggle\rX...toComp";
      menuData.infoStrGrp5 = "<<Other>>\rP...Purge\rO...Options";
      menuData.btn01 = {};
      menuData.btn02 = {};
      menuData.btn03 = {};
      menuData.btn04 = {};
      menuData.btn05 = {};
      menuData.btn06 = {};
      menuData.btn07 = {};
      menuData.btn08 = {};
      menuData.btn09 = {};
      var settingJson2Obj = {};
      var myFile = new File(
        Folder.userData.absoluteURI +
          "/Ola script UI/" +
          "KEYboard_setting.json",
      );
      if (File(myFile).exists) {
        var modifiedFlag = 0;
        if (myFile.open("r")) {
          myFile.encoding = "UTF-8";
          var myJson = myFile.read();
          try {
            settingJson2Obj = JSON.parse(myJson);
          } catch (e) {
            alert(
              "Preference file is missing, KEYboard will back to default setting",
            );
            settingJson2Obj = createDefaultJson();
            settingJson = createJsonFile(
              "KEYboard_setting.json",
              settingJson2Obj,
            );
          }
          myFile.close();
          modifiedFlag = 0;
        }
        if (settingJson2Obj.btn01 === undefined) {
          settingJson2Obj.btn01 = {};
          settingJson2Obj.btn02 = {};
          settingJson2Obj.btn03 = {};
          settingJson2Obj.btn04 = {};
          settingJson2Obj.btn05 = {};
          settingJson2Obj.btn06 = {};
          settingJson2Obj.btn07 = {};
          settingJson2Obj.btn08 = {};
          settingJson2Obj.btn09 = {};
          settingJson2Obj.btn01.title = "easeOut";
          settingJson2Obj.btn01.mode = "easeOut";
          settingJson2Obj.btn01.expStr = "80";
          settingJson2Obj.btn01.index = "1";
          settingJson2Obj.btn02.title = "easeIn";
          settingJson2Obj.btn02.mode = "easeIn";
          settingJson2Obj.btn02.expStr = "80";
          settingJson2Obj.btn02.index = "2";
          settingJson2Obj.btn03.title = "easeInOut";
          settingJson2Obj.btn03.mode = "easeInOut";
          settingJson2Obj.btn03.expStr = "80";
          settingJson2Obj.btn03.index = "3";
          settingJson2Obj.btn04.title = "posT";
          settingJson2Obj.btn04.mode = "expression";
          settingJson2Obj.btn04.expStr = "posterizeTime(8);\nvalue;";
          settingJson2Obj.btn04.index = "4";
          settingJson2Obj.btn05.title = "toComp";
          settingJson2Obj.btn05.mode = "expression";
          settingJson2Obj.btn05.expStr =
            "thisLayer.toComp(thisLayer.anchorPoint)+value;";
          settingJson2Obj.btn05.index = "5";
          settingJson2Obj.btn06.title = "wiggle";
          settingJson2Obj.btn06.mode = "expression";
          settingJson2Obj.btn06.expStr = "wiggle(15,50);";
          settingJson2Obj.btn06.index = "6";
          settingJson2Obj.btn07.title = "time";
          settingJson2Obj.btn07.mode = "expression";
          settingJson2Obj.btn07.expStr = "time*100;";
          settingJson2Obj.btn07.index = "7";
          settingJson2Obj.btn08.title = "loop";
          settingJson2Obj.btn08.mode = "expression";
          settingJson2Obj.btn08.expStr = "loopOut(\'cycle\');";
          settingJson2Obj.btn08.index = "8";
          settingJson2Obj.btn09.title = "separate D";
          settingJson2Obj.btn09.mode = "JavaScript";
          settingJson2Obj.btn09.expStr =
            'try {\n for (var i=0;i<app.project.activeItem.selectedLayers.length;i++) \n  app.project.activeItem.selectedLayers[i].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated = (app.project.activeItem.selectedLayers[i].property("ADBE Transform Group").property("ADBE Position").dimensionsSeparated)?false:true;\n    }\n catch (e) {\n     alert (e);\n     }';
          settingJson2Obj.btn09.index = "9";
          modifiedFlag = 1;
        }
        if (settingJson2Obj.shiftUpKeys_preUnit === undefined) {
          settingJson2Obj.randomKeys_preVal = [0, 5];
          settingJson2Obj.randomKeys_preUnit = "Frames";
          settingJson2Obj.shiftUpKeys_preVal = 5;
          settingJson2Obj.shiftUpKeys_preUnit = "Frames";
          settingJson2Obj.shiftDownKeys_preVal = 5;
          settingJson2Obj.shiftDownKeys_preUnit = "Frames";
          settingJson2Obj.quickVal_preVal = 10;
          modifiedFlag = 1;
        }
        if (settingJson2Obj.prefs_AutoClose === undefined) {
          settingJson2Obj.prefs_AutoClose = true;
          modifiedFlag = 1;
        }
        if (settingJson2Obj.prefs_AlignLeft === undefined) {
          settingJson2Obj.prefs_AlignLeft = false;
          modifiedFlag = 1;
        }
        if (settingJson2Obj.quickVal_constrain === undefined) {
          settingJson2Obj.quickVal_constrain = 0;
          modifiedFlag = 1;
        }
        if (settingJson2Obj.prefs_AddMaskPathKey === undefined) {
          settingJson2Obj.prefs_AddMaskPathKey = false;
          modifiedFlag = 1;
        }
        if (settingJson2Obj.mainUI_curPos === undefined) {
          settingJson2Obj.mainUI_curPos = [0, 0];
          settingJson2Obj.foolParent_curPos = [0, 0];
          settingJson2Obj.foolPaste_curPos = [0, 0];
          settingJson2Obj.quickVal_curPos = [0, 0];
          settingJson2Obj.shiftKey_curPos = [0, 0];
          settingJson2Obj.rememberWinPos = true;
          settingJson2Obj.prefs_SelectCloneKeys = false;
          modifiedFlag = 1;
        }
        if (modifiedFlag == 1) {
          myFile.remove();
          settingJson = createJsonFile(
            "KEYboard_setting.json",
            settingJson2Obj,
          );
        }
      } else {
        settingJson2Obj = createDefaultJson();
        settingJson = createJsonFile("KEYboard_setting.json", settingJson2Obj);
      }
      var binout1 = __BLOB__BLOB_000022__;
      var binout2 = __BLOB__BLOB_000023__;
      var binout3 = __BLOB__BLOB_000024__;
      var binin1 = __BLOB__BLOB_000025__;
      var binin2 = __BLOB__BLOB_000026__;
      var binin3 = __BLOB__BLOB_000027__;
      var bininOut1 = __BLOB__BLOB_000028__;
      var bininOut2 = __BLOB__BLOB_000029__;
      var bininOut3 = __BLOB__BLOB_000030__;
      var binQrow1 = __BLOB__BLOB_000031__;
      var binQrow2 = __BLOB__BLOB_000032__;
      var binQrow3 = __BLOB__BLOB_000033__;
      var binQrow4 = __BLOB__BLOB_000034__;
      var binQrow5 = __BLOB__BLOB_000035__;
      var binQrow6 = __BLOB__BLOB_000036__;
      var binQrow7 = __BLOB__BLOB_000037__;
      var binQrow8 = __BLOB__BLOB_000038__;
      var binQrow9 = __BLOB__BLOB_000039__;
      var binQrow10 = __BLOB__BLOB_000040__;
      var binSetting1 = __BLOB__BLOB_000041__;
      var binSetting2 = __BLOB__BLOB_000042__;
      var binArow1 = __BLOB__BLOB_000043__;
      var binArow2 = __BLOB__BLOB_000044__;
      var binArow3 = __BLOB__BLOB_000045__;
      var binZrow1 = __BLOB__BLOB_000046__;
      var binZrow2 = __BLOB__BLOB_000047__;
      var binZrow3 = __BLOB__BLOB_000048__;
      var binAddKey = __BLOB__BLOB_000049__;
      var binNum01 = __BLOB__BLOB_000050__;
      var binNum02 = __BLOB__BLOB_000051__;
      var binNum03 = __BLOB__BLOB_000052__;
      var binNum04 = __BLOB__BLOB_000053__;
      var binNum05 = __BLOB__BLOB_000054__;
      var binNum06 = __BLOB__BLOB_000055__;
      var binNum07 = __BLOB__BLOB_000056__;
      var binNum08 = __BLOB__BLOB_000057__;
      var binNum09 = __BLOB__BLOB_000058__;
      var binLogo = __BLOB__BLOB_000059__;
      var binLogo2 = __BLOB__BLOB_000060__;
      var binLogo3 = __BLOB__BLOB_000061__;
      var binLogo4 = __BLOB__BLOB_000062__;
      var binLogo5 = __BLOB__BLOB_000063__;
      var binFolder = __BLOB__BLOB_000064__;
      var bin2018info = __BLOB__BLOB_000065__;
      var imgOut1 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_out1.png",
      );
      var imgOut2 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_out2.png",
      );
      var imgOut3 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_out3.png",
      );
      if (File(imgOut1).exists) {
        menuData.out1 = imgOut1;
      } else {
        menuData.out1 = createResourceFile("KEYboard_out1.png", binout1);
      }
      if (File(imgOut2).exists) {
        menuData.out2 = imgOut2;
      } else {
        menuData.out2 = createResourceFile("KEYboard_out2.png", binout2);
      }
      if (File(imgOut3).exists) {
        menuData.out3 = imgOut3;
      } else {
        menuData.out3 = createResourceFile("KEYboard_out3.png", binout3);
      }
      var imgIn1 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_in1.png",
      );
      var imgIn2 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_in2.png",
      );
      var imgIn3 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_in3.png",
      );
      if (File(imgIn1).exists) {
        menuData.in1 = imgIn1;
      } else {
        menuData.in1 = createResourceFile("KEYboard_in1.png", binin1);
      }
      if (File(imgIn2).exists) {
        menuData.in2 = imgIn2;
      } else {
        menuData.in2 = createResourceFile("KEYboard_in2.png", binin2);
      }
      if (File(imgIn3).exists) {
        menuData.in3 = imgIn3;
      } else {
        menuData.in3 = createResourceFile("KEYboard_in3.png", binin3);
      }
      var imgInOut1 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_inOut1.png",
      );
      var imgInOut2 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_inOut2.png",
      );
      var imgInOut3 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_inOut3.png",
      );
      if (File(imgInOut1).exists) {
        menuData.inOut1 = imgInOut1;
      } else {
        menuData.inOut1 = createResourceFile("KEYboard_inOut1.png", bininOut1);
      }
      if (File(imgInOut2).exists) {
        menuData.inOut2 = imgInOut2;
      } else {
        menuData.inOut2 = createResourceFile("KEYboard_inOut2.png", bininOut2);
      }
      if (File(imgInOut3).exists) {
        menuData.inOut3 = imgInOut3;
      } else {
        menuData.inOut3 = createResourceFile("KEYboard_inOut3.png", bininOut3);
      }
      var imgQrow1 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow1.png",
      );
      var imgQrow2 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow2.png",
      );
      var imgQrow3 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow3.png",
      );
      var imgQrow4 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow4.png",
      );
      var imgQrow5 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow5.png",
      );
      var imgQrow6 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow6.png",
      );
      var imgQrow7 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow7.png",
      );
      var imgQrow8 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow8.png",
      );
      var imgQrow9 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow9.png",
      );
      var imgQrow10 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_Qrow10.png",
      );
      if (File(imgQrow1).exists) {
        menuData.Qrow1 = imgQrow1;
      } else {
        menuData.Qrow1 = createResourceFile("KEYboard_Qrow1.png", binQrow1);
      }
      if (File(imgQrow2).exists) {
        menuData.Qrow2 = imgQrow2;
      } else {
        menuData.Qrow2 = createResourceFile("KEYboard_Qrow2.png", binQrow2);
      }
      if (File(imgQrow3).exists) {
        menuData.Qrow3 = imgQrow3;
      } else {
        menuData.Qrow3 = createResourceFile("KEYboard_Qrow3.png", binQrow3);
      }
      if (File(imgQrow4).exists) {
        menuData.Qrow4 = imgQrow4;
      } else {
        menuData.Qrow4 = createResourceFile("KEYboard_Qrow4.png", binQrow4);
      }
      if (File(imgQrow5).exists) {
        menuData.Qrow5 = imgQrow5;
      } else {
        menuData.Qrow5 = createResourceFile("KEYboard_Qrow5.png", binQrow5);
      }
      if (File(imgQrow6).exists) {
        menuData.Qrow6 = imgQrow6;
      } else {
        menuData.Qrow6 = createResourceFile("KEYboard_Qrow6.png", binQrow6);
      }
      if (File(imgQrow7).exists) {
        menuData.Qrow7 = imgQrow7;
      } else {
        menuData.Qrow7 = createResourceFile("KEYboard_Qrow7.png", binQrow7);
      }
      if (File(imgQrow8).exists) {
        menuData.Qrow8 = imgQrow8;
      } else {
        menuData.Qrow8 = createResourceFile("KEYboard_Qrow8.png", binQrow8);
      }
      if (File(imgQrow9).exists) {
        menuData.Qrow9 = imgQrow9;
      } else {
        menuData.Qrow9 = createResourceFile("KEYboard_Qrow9.png", binQrow9);
      }
      if (File(imgQrow10).exists) {
        menuData.Qrow10 = imgQrow10;
      } else {
        menuData.Qrow10 = createResourceFile("KEYboard_Qrow10.png", binQrow10);
      }
      var imgNum01 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num01.png",
      );
      var imgNum02 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num02.png",
      );
      var imgNum03 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num03.png",
      );
      var imgNum04 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num04.png",
      );
      var imgNum05 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num05.png",
      );
      var imgNum06 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num06.png",
      );
      var imgNum07 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num07.png",
      );
      var imgNum08 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num08.png",
      );
      var imgNum09 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_num09.png",
      );
      if (File(imgNum01).exists) {
        menuData.num01 = imgNum01;
      } else {
        menuData.num01 = createResourceFile("KEYboard_num01.png", binNum01);
      }
      if (File(imgNum02).exists) {
        menuData.num02 = imgNum02;
      } else {
        menuData.num02 = createResourceFile("KEYboard_num02.png", binNum02);
      }
      if (File(imgNum03).exists) {
        menuData.num03 = imgNum03;
      } else {
        menuData.num03 = createResourceFile("KEYboard_num03.png", binNum03);
      }
      if (File(imgNum04).exists) {
        menuData.num04 = imgNum04;
      } else {
        menuData.num04 = createResourceFile("KEYboard_num04.png", binNum04);
      }
      if (File(imgNum05).exists) {
        menuData.num05 = imgNum05;
      } else {
        menuData.num05 = createResourceFile("KEYboard_num05.png", binNum05);
      }
      if (File(imgNum06).exists) {
        menuData.num06 = imgNum06;
      } else {
        menuData.num06 = createResourceFile("KEYboard_num06.png", binNum06);
      }
      if (File(imgNum07).exists) {
        menuData.num07 = imgNum07;
      } else {
        menuData.num07 = createResourceFile("KEYboard_num07.png", binNum07);
      }
      if (File(imgNum08).exists) {
        menuData.num08 = imgNum08;
      } else {
        menuData.num08 = createResourceFile("KEYboard_num08.png", binNum08);
      }
      if (File(imgNum09).exists) {
        menuData.num09 = imgNum09;
      } else {
        menuData.num09 = createResourceFile("KEYboard_num09.png", binNum09);
      }
      menuData.logo = [];
      var imgLogo01 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_logo.png",
      );
      var imgLogo02 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_logo2.png",
      );
      var imgLogo03 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_logo3.png",
      );
      var imgLogo04 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_logo4.png",
      );
      var imgLogo05 = new File(
        Folder.userData.absoluteURI + "/Ola script UI/" + "KEYboard_logo5.png",
      );
      if (File(imgLogo01).exists) {
        menuData.logo[0] = imgLogo01;
      } else {
        menuData.logo[0] = createResourceFile("KEYboard_logo.png", binLogo);
      }
      if (File(imgLogo02).exists) {
        menuData.logo[1] = imgLogo02;
      } else {
        menuData.logo[1] = createResourceFile("KEYboard_logo2.png", binLogo2);
      }
      if (File(imgLogo03).exists) {
        menuData.logo[2] = imgLogo03;
      } else {
        menuData.logo[2] = createResourceFile("KEYboard_logo3.png", binLogo3);
      }
      if (File(imgLogo04).exists) {
        menuData.logo[3] = imgLogo04;
      } else {
        menuData.logo[3] = createResourceFile("KEYboard_logo4.png", binLogo4);
      }
      if (File(imgLogo05).exists) {
        menuData.logo[4] = imgLogo05;
      } else {
        menuData.logo[4] = createResourceFile("KEYboard_logo5.png", binLogo5);
      }
      menuData.info2018 = createResourceFile(
        "KEYboard_2018info.png",
        bin2018info,
      );
      var AEversion = app.version.substring(0, 4);
      if (thisObj instanceof Panel) {
        alert(
          "Oops! KEYbaord must be placed in Scripts folder (not ScriptUI panels)",
        );
        var alertPalette = thisObj;
        var alertGrp = alertPalette.add("group");
        alertGrp.graphics.backgroundColor = alertGrp.graphics.newBrush(
          alertGrp.graphics.BrushType.SOLID_COLOR,
          menuData.black,
        );
        var alertTxt = alertGrp.add(
          "statictext",
          [0, 0, 430, 50],
          "Please place 01-KEY-board.jsxbin in Scripts folder and restart After Effects. :D",
          { multiline: false },
        );
        alertPalette.layout.layout(true);
      } else {
        if (app.settings.haveSetting("Ola_Keyboard", "shortcut")) {
          createUIMenu(menuData, settingJson2Obj);
        } else {
          var w = new Window("dialog", "First time", undefined, {
            closeButton: true,
          });
          w.margins = 10;
          w.spacing = 5;
          w.alignChildren = ["fill", "fill"];
          var securitySetting = app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          );
          if (securitySetting === 0) {
            alert(
              'Make sure Edit>Preferences>General>\r\r"Allow Scripts to Write Files and Access Network" \r\ris actived.',
            );
            app.executeCommand(2359);
            w.close();
          }
          var infoGrp = w.add("group");
          infoGrp.spacing = 8;
          infoGrp.orientation = "column";
          infoGrp.alignChildren = ["fill", "fill"];
          if (AEversion < 15) {
            var logo = infoGrp.add("image", undefined, menuData.logo[0]);
            infoText = infoGrp.add(
              "statictext",
              [0, 0, 150, 120],
              "Hi\uff1a\rThis is the first time that Keyboard is running.\r\rCreate a shortcut and restart AE to finish setup.\r\re.g. Shift+Q or Alt+Q",
              { multiline: true },
            );
            var inputGrp = w.add("group");
            inputGrp.orientation = "row";
            inputGrp.alignChildren = ["fill", "fill"];
            var inputText = inputGrp.add("edittext", undefined);
            inputText.active = true;
            inputText.text = "Shift+Q";
            var tmpStr = "";
            inputText.addEventListener("keydown", function (k) {
              handle_shortcut(k, this);
              tmpStr = inputText.text;
            });
            inputText.addEventListener("keyup", function (k) {
              inputText.text = tmpStr;
            });
          } else {
            var info2018 = infoGrp.add("image", undefined, menuData.info2018);
            infoText = infoGrp.add(
              "statictext",
              [0, 0, 150, 120],
              'Hi\uff1a\rThis is the first time that Keyboard is running.\rIn CC2018, there is a new way to set shortcut with Visual Keyboard Shortcut Editor.\r\rTo open the editor, select Edit > Keyboard Shortcuts. Type "01-KEY-board" in search-bar and finish setting.',
              { multiline: true },
            );
          }
          var btnGrp = w.add("group");
          btnGrp.alignChildren = ["fill", "fill"];
          var btnOK = btnGrp.add("button", undefined, "OK");
          var versionStr = w.add(
            "statictext",
            [0, 0, 150, 20],
            "AE version : " + AEversion,
            { multiline: true },
          );
          btnOK.onClick = function () {
            if (AEversion < 15) {
              var AEFolder = Folder(
                Folder.userData.absoluteURI +
                  "/Adobe/After Effects/" +
                  AEversion,
              );
              var osName = $.os.substring(0, 3);
              var shortcut = inputText.text;
              var pathname = $.fileName;
              var leafname = pathname.split("\\").pop().split("/").pop();
              var itemIndex = Number(leafname.substring(1, 2));
              if (securitySetting == 1) {
                textFile = getNameOfShortcutsFile();
                testIO(textFile, shortcut);
                app.settings.saveSetting("Ola_Keyboard", "shortcut", shortcut);
                w.close();
                alert("Plz restart AE");
              } else {
                alert(
                  'Make sure Edit>Preferences>General>"Allow Scripts to Write Files and Access Network" is actived.',
                );
                w.close();
              }
            } else {
              var none = "none";
              app.settings.saveSetting("Ola_Keyboard", "shortcut", none);
              w.close();
            }
          };
          w.show();
        }
      }
    }
    function modifyShortcut(menuData, settingJson2Obj) {
      function saveNumPadSettingTag() {
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      }
      function assignShortcut(btnObj, isTrial) {
        if (isTrial) {
          alert("This feature is not available in trial mode");
        } else {
          saveFlag = 0;
          curBtnStr.text = "Button #" + btnObj.index;
          modeList.enabled = true;
          expressionStr.enabled = true;
          btnTitleStr.enabled = true;
          tagetBtnIndex = Number(btnObj.index);
          modeList.selection = chkMode(btnObj);
          expressionStr.text = btnObj.expStr;
          btnTitleStr.text = btnObj.title;
        }
      }
      var AEversion = app.version.substring(0, 4);
      var w = new Window("palette", "Settings");
      w.margins = 10;
      w.spacing = 10;
      w.alignChildren = ["fill", "fill"];
      w.orientation = "column";
      var logoGrp = w.add("group");
      var AllSettingGrp = w.add("group");
      var prefsGrp = AllSettingGrp.add("group");
      var prefsContainerGrp = prefsGrp.add("group");
      var SettingRow1Grp = AllSettingGrp.add("group");
      var scriptSettingGrp = SettingRow1Grp.add("group");
      var NumPadSettingGrp = SettingRow1Grp.add("group");
      AllSettingGrp.spacing = 10;
      AllSettingGrp.alignChildren = ["fill", "fill"];
      prefsGrp.alignChildren = ["fill", "fill"];
      SettingRow1Grp.alignChildren = ["fill", "fill"];
      AllSettingGrp.orientation = "column";
      SettingRow1Grp.orientation = "row";
      logoGrp.alignChildren = ["center", "fill"];
      logoGrp.orientation = "column";
      logoGrp.spacings = 0;
      var prefsPanel = prefsContainerGrp.add("panel", undefined, "Preference");
      prefsGrp.graphics.backgroundColor = prefsGrp.graphics.newBrush(
        prefsGrp.graphics.BrushType.SOLID_COLOR,
        menuData.red,
      );
      prefsGrp.margins = 0;
      prefsGrp.margins.top = 5;
      prefsContainerGrp.alignChildren = ["fill", "fill"];
      prefsContainerGrp.margins = 8;
      prefsPanel.spacing = 4;
      if (AEversion < 13) {
        prefsContainerGrp.graphics.backgroundColor =
          prefsContainerGrp.graphics.newBrush(
            prefsContainerGrp.graphics.BrushType.SOLID_COLOR,
            menuData.darkGray2,
          );
      } else {
        prefsContainerGrp.graphics.backgroundColor =
          prefsContainerGrp.graphics.newBrush(
            prefsContainerGrp.graphics.BrushType.SOLID_COLOR,
            menuData.black,
          );
      }
      var chkAutoClose = prefsPanel.add(
        "checkbox",
        undefined,
        "Enable Auto-close feature",
      );
      var chkRememberWinPos = prefsPanel.add(
        "checkbox",
        undefined,
        "Always remember window loaction after moving",
      );
      var chkSelectCloneKeys = prefsPanel.add(
        "checkbox",
        undefined,
        "(Q)(W) Select Cloned/mirrored Keyframes",
      );
      var chkAlignLeft = prefsPanel.add(
        "checkbox",
        undefined,
        "(E) Align Keys : Always align left",
      );
      var chkAddMaskPathKey = prefsPanel.add(
        "checkbox",
        undefined,
        "(Z) Add Path Keys : Also Affect Mask Path",
      );
      chkAutoClose.value = settingJson2Obj.prefs_AutoClose;
      chkRememberWinPos.value = settingJson2Obj.rememberWinPos;
      chkSelectCloneKeys.value = settingJson2Obj.prefs_SelectCloneKeys;
      chkAlignLeft.value = settingJson2Obj.prefs_AlignLeft;
      chkAddMaskPathKey.value = settingJson2Obj.prefs_AddMaskPathKey;
      chkAutoClose.alignment = ["left", " "];
      chkRememberWinPos.alignment = ["left", " "];
      chkSelectCloneKeys.alignment = ["left", " "];
      chkAlignLeft.alignment = ["left", " "];
      chkAddMaskPathKey.alignment = ["left", " "];
      chkAutoClose.onClick = function () {
        settingJson2Obj.prefs_AutoClose = chkAutoClose.value;
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      chkRememberWinPos.onClick = function () {
        settingJson2Obj.rememberWinPos = chkRememberWinPos.value;
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      chkSelectCloneKeys.onClick = function () {
        settingJson2Obj.prefs_SelectCloneKeys = chkSelectCloneKeys.value;
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      chkAlignLeft.onClick = function () {
        settingJson2Obj.prefs_AlignLeft = chkAlignLeft.value;
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      chkAddMaskPathKey.onClick = function () {
        settingJson2Obj.prefs_AddMaskPathKey = chkAddMaskPathKey.value;
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      var logoCount = 0;
      var logo = logoGrp.add("image", undefined, menuData.logo[0]);
      logo.alignment = ["", "center"];
      var scriptSettingContainerGrp = scriptSettingGrp.add("group");
      scriptSettingGrp.graphics.backgroundColor =
        scriptSettingGrp.graphics.newBrush(
          scriptSettingGrp.graphics.BrushType.SOLID_COLOR,
          menuData.yellow,
        );
      scriptSettingGrp.margins = 0;
      scriptSettingGrp.margins.top = 5;
      if (AEversion < 13) {
        scriptSettingContainerGrp.graphics.backgroundColor =
          scriptSettingContainerGrp.graphics.newBrush(
            scriptSettingContainerGrp.graphics.BrushType.SOLID_COLOR,
            menuData.darkGray2,
          );
      } else {
        scriptSettingContainerGrp.graphics.backgroundColor =
          scriptSettingContainerGrp.graphics.newBrush(
            scriptSettingContainerGrp.graphics.BrushType.SOLID_COLOR,
            menuData.black,
          );
      }
      scriptSettingContainerGrp.orientation = "column";
      scriptSettingContainerGrp.margins = 8;
      var resetPanel = scriptSettingContainerGrp.add(
        "panel",
        undefined,
        "Reset Shortcut",
      );
      var deletePanel = scriptSettingContainerGrp.add(
        "panel",
        undefined,
        "Delete KEYboard Setting",
      );
      scriptSettingGrp.alignChildren = ["fill", "fill"];
      scriptSettingContainerGrp.alignChildren = ["fill", "fill"];
      resetPanel.alignChildren = ["fill", "fill"];
      deletePanel.alignChildren = ["fill", "fill"];
      resetPanel.spacing = 3;
      var infoGrp = resetPanel.add("group");
      var inputGrp = resetPanel.add("group");
      var btnGrp = resetPanel.add("group");
      var deleteBtnGrp = deletePanel.add("group");
      infoGrp.spacing = 0;
      btnGrp.alignChildren = ["center", ""];
      deleteBtnGrp.alignChildren = ["center", ""];
      var inputText = inputGrp.add("edittext", undefined);
      inputText.alignment = ["fill", "fill"];
      var btnReset = btnGrp.add("button", undefined, "Reset!");
      inputText.text = "Shift+Q";
      var tmpStr = "";
      inputText.addEventListener("keydown", function (k) {
        handle_shortcut(k, this);
        tmpStr = inputText.text;
      });
      inputText.addEventListener("keyup", function (k) {
        inputText.text = tmpStr;
      });
      if (app.settings.haveSetting("Ola_Keyboard", "shortcut")) {
        var SettingShortcut = app.settings.getSetting(
          "Ola_Keyboard",
          "shortcut",
        );
        inputText.text = SettingShortcut;
      } else {
        inputText.text = "Shift+Q";
      }
      if (AEversion >= 15) {
        inputGrp.remove(inputText);
        var warningtxt = inputGrp.add("statictext", undefined);
        warningtxt.text = "Use Visual Keyboard Shortcut Editor instead";
        btnReset.enabled = false;
      }
      var deleteBtn = deleteBtnGrp.add("button", undefined, "Do it  :(");
      var numPadSwitchFlag = 0;
      var tagetBtnIndex = -1;
      var saveFlag = 1;
      if (
        app.settings.haveSetting("Ola_Keyboard", "numPadSwitchFlag") === true
      ) {
        numPadSwitchFlag = app.settings.getSetting(
          "Ola_Keyboard",
          "numPadSwitchFlag",
        );
      }
      NumPadSettingGrp.orientation = "column";
      NumPadSettingGrp.alignChildren = ["fill", "fill"];
      NumPadSettingGrp.margins = 0;
      NumPadSettingGrp.margins.top = 5;
      NumPadSettingGrp.spacing = 0;
      NumPadSettingGrp.graphics.backgroundColor =
        NumPadSettingGrp.graphics.newBrush(
          NumPadSettingGrp.graphics.BrushType.SOLID_COLOR,
          menuData.purple,
        );
      var btnSize = [40, 40];
      var NumpadContainerGrp = NumPadSettingGrp.add("group");
      NumpadContainerGrp.orientation = "column";
      NumpadContainerGrp.margins = 8;
      NumpadContainerGrp.alignChildren = ["fill", "fill"];
      if (AEversion < 13) {
        NumpadContainerGrp.graphics.backgroundColor =
          NumpadContainerGrp.graphics.newBrush(
            NumpadContainerGrp.graphics.BrushType.SOLID_COLOR,
            menuData.darkGray2,
          );
      } else {
        NumpadContainerGrp.graphics.backgroundColor =
          NumpadContainerGrp.graphics.newBrush(
            NumpadContainerGrp.graphics.BrushType.SOLID_COLOR,
            menuData.black,
          );
      }
      var NumpadPanel = NumpadContainerGrp.add("panel", undefined, "Custom");
      var NumpadGrp = NumpadPanel.add("group");
      NumpadGrp.alignment = ["fill", "fill"];
      var numpadbtnGrp = NumpadGrp.add("group");
      var settingGrp = NumpadGrp.add("group");
      settingGrp.orientation = "column";
      settingGrp.alignment = ["fill", "fill"];
      settingGrp.spacing = 5;
      numpadbtnGrp.orientation = "column";
      numpadbtnGrp.alignChildren = ["fill", "fill"];
      var btnAry = [];
      var btnGrpAry = [];
      btnGrpAry[0] = numpadbtnGrp.add("group");
      btnGrpAry[1] = numpadbtnGrp.add("group");
      btnGrpAry[2] = numpadbtnGrp.add("group");
      btnGrpAry[0].orientation = "row";
      btnGrpAry[0].spacing = 3;
      btnGrpAry[1].orientation = "row";
      btnGrpAry[1].spacing = 3;
      btnGrpAry[2].orientation = "row";
      btnGrpAry[2].spacing = 3;
      btnAry[0] = btnGrpAry[2].add("button", undefined, "1");
      btnAry[1] = btnGrpAry[2].add("button", undefined, "2");
      btnAry[2] = btnGrpAry[2].add("button", undefined, "3");
      btnAry[3] = btnGrpAry[1].add("button", undefined, "4");
      btnAry[4] = btnGrpAry[1].add("button", undefined, "5");
      btnAry[5] = btnGrpAry[1].add("button", undefined, "6");
      btnAry[6] = btnGrpAry[0].add("button", undefined, "7");
      btnAry[7] = btnGrpAry[0].add("button", undefined, "8");
      btnAry[8] = btnGrpAry[0].add("button", undefined, "9");
      var btnSaveGrp = numpadbtnGrp.add("group");
      btnSaveGrp.graphics.backgroundColor = btnSaveGrp.graphics.newBrush(
        btnSaveGrp.graphics.BrushType.SOLID_COLOR,
        menuData.black,
      );
      btnSaveGrp.alignChildren = ["fill", ""];
      var btnSave = btnSaveGrp.add("button", undefined, "Save it!");
      for (var j = 0; j < 9; j += 1) {
        btnAry[j].preferredSize = btnSize;
      }
      btnAry[0].onClick = function () {
        assignShortcut(settingJson2Obj.btn01, isTrial);
      };
      btnAry[1].onClick = function () {
        assignShortcut(settingJson2Obj.btn02, isTrial);
      };
      btnAry[2].onClick = function () {
        assignShortcut(settingJson2Obj.btn03, isTrial);
      };
      btnAry[3].onClick = function () {
        assignShortcut(settingJson2Obj.btn04, isTrial);
      };
      btnAry[4].onClick = function () {
        assignShortcut(settingJson2Obj.btn05, isTrial);
      };
      btnAry[5].onClick = function () {
        assignShortcut(settingJson2Obj.btn06, isTrial);
      };
      btnAry[6].onClick = function () {
        assignShortcut(settingJson2Obj.btn07, isTrial);
      };
      btnAry[7].onClick = function () {
        assignShortcut(settingJson2Obj.btn08, isTrial);
      };
      btnAry[8].onClick = function () {
        assignShortcut(settingJson2Obj.btn09, isTrial);
      };
      var curBtnStr = settingGrp.add(
        "statictext",
        [0, 0, 150, 20],
        "\u2190 select button",
      );
      curBtnStr.alignment = ["fill", "top"];
      var btnTitleGrp = settingGrp.add("group");
      var btnTitleName = btnTitleGrp.add(
        "statictext",
        [0, 0, 40, 20],
        "Name : ",
      );
      var btnTitleStr = btnTitleGrp.add("edittext", undefined, "", {
        multiline: false,
      });
      btnTitleGrp.alignment = ["fill", "top"];
      btnTitleStr.alignment = ["fill", "top"];
      btnTitleGrp.spacing = 0;
      btnTitleStr.enabled = false;
      var modeListGrp = settingGrp.add("group");
      var modeList = modeListGrp.add("dropdownlist", undefined, [
        "expression",
        "JavaScript",
        "easeIn",
        "easeOut",
        "easeInOut",
      ]);
      modeListGrp.alignment = ["fill", "top"];
      modeListGrp.spacing = 3;
      var expressionStr = settingGrp.add("edittext", undefined, "", {
        multiline: true,
      });
      modeList.selection = 0;
      modeList.alignment = ["fill", "top"];
      modeList.enabled = false;
      expressionStr.alignment = ["fill", "fill"];
      expressionStr.enabled = false;
      var txtGrp = AllSettingGrp.add("group");
      txtGrp.spacing = 5;
      txtGrp.orientation = "column";
      txtGrp.alignment = ["", "bottom"];
      txtGrp.alignChildren = ["fill", "fill"];
      var versionGrp = txtGrp.add("group");
      versionGrp.orientation = "column";
      versionGrp.spacing = 2;
      versionGrp.alignChildren = ["fill", "fill"];
      versionGrp.alignment = ["center", "fill"];
      var registGrp = txtGrp.add("group");
      registGrp.alignChildren = ["fill", "fill"];
      registGrp.margins = 10;
      registGrp.margins.left = 20;
      registGrp.margins.right = 20;
      registGrp.graphics.backgroundColor = registGrp.graphics.newBrush(
        registGrp.graphics.BrushType.SOLID_COLOR,
        menuData.black,
      );
      spell == true
        ? (registration = "Registered to: " + spellName)
        : (registration = wow.getRegistration());
      var registrationText = registGrp.add(
        "statictext",
        undefined,
        registration,
        { multiline: false },
      );
      if (isTrial) {
        var btnTrial = registGrp.add("button", undefined, "activate");
        btnTrial.preferredSize = [60, 20];
        btnTrial.onClick = function () {
          wow.c();
        };
      }
      var btnHelp = registGrp.add("button", undefined, "?");
      btnHelp.preferredSize = [60, 20];
      btnHelp.onClick = function () {
        if (spell == true) {
          alert("(\u25cf\xb4\u2200`\u25cf)");
        } else {
          wow.helpUI();
        }
      };
      logo.addEventListener("mousedown", function (event) {
        logoCount += 1;
        if (event.shiftKey === true && logoCount == 5) {
          registrationText.text = "(\u25cf\xb4\u2200`\u25cf) Magic happened! ";
        }
        if (logoCount > 4) {
          logoCount = 0;
        }
        logo.icon = ScriptUI.newImage(menuData.logo[logoCount]);
      });
      btnSave.onClick = function () {
        saveNumPadSettingTag();
        saveFlag = 1;
      };
      w.onClose = function () {
        if (saveFlag === 0) {
          var saveWindow = new Window("dialog", "Oops!", undefined, {
            borderless: true,
            closeButton: false,
          });
          saveWindow.margins = 0;
          var allGrp = saveWindow.add("group");
          var allContainerGrp = allGrp.add("group");
          var infoGrp = allContainerGrp.add("group");
          var saveBtnGrp = allContainerGrp.add("group");
          allGrp.graphics.backgroundColor = allGrp.graphics.newBrush(
            allGrp.graphics.BrushType.SOLID_COLOR,
            menuData.red,
          );
          allGrp.margins = 0;
          allGrp.margins.top = 5;
          allContainerGrp.graphics.backgroundColor =
            allContainerGrp.graphics.newBrush(
              allContainerGrp.graphics.BrushType.SOLID_COLOR,
              menuData.black,
            );
          allContainerGrp.margins = 10;
          saveWindow.orientation = "column";
          saveBtnGrp.orientation = "row";
          var alertInfo = infoGrp.add(
            "statictext",
            undefined,
            "You haven\'t save after setting expression shortcut.\r\rDo you want to save it?",
            { multiline: true },
          );
          var saveBtn = saveBtnGrp.add("button", undefined, "Save it!");
          var closeBtn = saveBtnGrp.add("button", undefined, "No :(");
          saveBtn.onClick = function () {
            saveNumPadSettingTag();
            saveWindow.close();
          };
          closeBtn.onClick = function () {
            saveWindow.close();
          };
          saveWindow.show();
        }
      };
      btnReset.onClick = function () {
        var AEFolder = Folder(
          Folder.userData.absoluteURI + "/Adobe/After Effects/" + AEversion,
        );
        var osName = $.os.substring(0, 3);
        var shortcut = inputText.text;
        var securitySetting = app.preferences.getPrefAsLong(
          "Main Pref Section",
          "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
        );
        if (securitySetting == 1) {
          textFile = getNameOfShortcutsFile();
          testIO(textFile, shortcut);
          app.settings.saveSetting("Ola_Keyboard", "shortcut", shortcut);
          w.close();
          alert("Plz restart AE");
        } else {
          alert(
            'Make sure Edit>Preferences>General>"Allow Scripts to Write Files and Access Network" is actived.',
          );
          w.close();
        }
      };
      deleteBtn.onClick = function () {
        overwriteShortcut();
        deleteSettingTag();
        alert("finished!");
      };
      btnTitleStr.addEventListener(
        "keyup",
        function (k) {
          switch (tagetBtnIndex) {
            case 1:
              settingJson2Obj.btn01.title = btnTitleStr.text;
              break;
            case 2:
              settingJson2Obj.btn02.title = btnTitleStr.text;
              break;
            case 3:
              settingJson2Obj.btn03.title = btnTitleStr.text;
              break;
            case 4:
              settingJson2Obj.btn04.title = btnTitleStr.text;
              break;
            case 5:
              settingJson2Obj.btn05.title = btnTitleStr.text;
              break;
            case 6:
              settingJson2Obj.btn06.title = btnTitleStr.text;
              break;
            case 7:
              settingJson2Obj.btn07.title = btnTitleStr.text;
              break;
            case 8:
              settingJson2Obj.btn08.title = btnTitleStr.text;
              break;
            case 9:
              settingJson2Obj.btn09.title = btnTitleStr.text;
              break;
          }
        },
        false,
      );
      expressionStr.addEventListener(
        "keyup",
        function (k) {
          if (modeList.selection == 2 || modeList.selection == 3) {
            if (isNaN(expressionStr.text)) {
              expressionStr.text = "Please input number. \r\r:D";
              expressionStr.active = false;
              expressionStr.active = true;
            } else {
              if (expressionStr.text < 0 || expressionStr.text > 100) {
                expressionStr.text =
                  "Ease value is out of range.\r\rPlease input from 0.1 to 100. \r\r:D";
                expressionStr.active = false;
                expressionStr.active = true;
              }
            }
          } else {
            if (modeList.selection == 4) {
            }
          }
          var parseStr = expressionStr.text;
          switch (tagetBtnIndex) {
            case 1:
              settingJson2Obj.btn01.expStr = parseStr;
              break;
            case 2:
              settingJson2Obj.btn02.expStr = parseStr;
              break;
            case 3:
              settingJson2Obj.btn03.expStr = parseStr;
              break;
            case 4:
              settingJson2Obj.btn04.expStr = parseStr;
              break;
            case 5:
              settingJson2Obj.btn05.expStr = parseStr;
              break;
            case 6:
              settingJson2Obj.btn06.expStr = parseStr;
              break;
            case 7:
              settingJson2Obj.btn07.expStr = parseStr;
              break;
            case 8:
              settingJson2Obj.btn08.expStr = parseStr;
              break;
            case 9:
              settingJson2Obj.btn09.expStr = parseStr;
              break;
          }
        },
        false,
      );
      modeList.onChange = function () {
        switch (tagetBtnIndex) {
          case 1:
            settingJson2Obj.btn01.mode = modeList.selection.toString();
            break;
          case 2:
            settingJson2Obj.btn02.mode = modeList.selection.toString();
            break;
          case 3:
            settingJson2Obj.btn03.mode = modeList.selection.toString();
            break;
          case 4:
            settingJson2Obj.btn04.mode = modeList.selection.toString();
            break;
          case 5:
            settingJson2Obj.btn05.mode = modeList.selection.toString();
            break;
          case 6:
            settingJson2Obj.btn06.mode = modeList.selection.toString();
            break;
          case 7:
            settingJson2Obj.btn07.mode = modeList.selection.toString();
            break;
          case 8:
            settingJson2Obj.btn08.mode = modeList.selection.toString();
            break;
          case 9:
            settingJson2Obj.btn09.mode = modeList.selection.toString();
            break;
        }
      };
      w.show();
    }
    function cloneKey(settingJson2Obj) {
      app.beginUndoGroup("Clone Key");
      var myComp = app.project.activeItem;
      if (myComp !== null) {
        var seLayers = myComp.selectedLayers;
        var Time = myComp.time;
        var AllLayerKeyData = [];
        var newKeyAry = [];
        var allPropInOneAry = [];
        var allNewKeyInOneAry = [];
        var allSelKeyInOneAry = [];
        for (var i = 0; i < seLayers.length; i += 1) {
          var allPropsInALayer = [];
          for (var j = 0; j < seLayers[i].selectedProperties.length; j += 1) {
            selProps = seLayers[i].selectedProperties[j];
            allSelKeyInOneAry.push(collectKeyframes(selProps));
            allPropInOneAry.push(selProps);
          }
        }
        var AllKeyTime = [];
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          if (
            allSelKeyInOneAry[x] === null ||
            allSelKeyInOneAry[x] === undefined
          ) {
            continue;
          }
          for (var z = 0; z < allSelKeyInOneAry[x].length; z += 1) {
            AllKeyTime.push(allSelKeyInOneAry[x][z].curKeyTime);
          }
        }
        AllKeyTime.sort(function (a, b) {
          return a - b;
        });
        Time = Time - AllKeyTime[0];
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          selProps = allPropInOneAry[x];
          var newKeyAry = transferKeyframes(
            selProps,
            allSelKeyInOneAry[x],
            Time,
            "clone",
          );
          allNewKeyInOneAry.push(newKeyAry);
        }
        if (settingJson2Obj.prefs_SelectCloneKeys == true) {
          for (var x = 0; x < allPropInOneAry.length; x += 1) {
            if (
              allSelKeyInOneAry[x] === null ||
              allSelKeyInOneAry[x] === undefined
            ) {
              continue;
            }
            selProps = allPropInOneAry[x];
            while (selProps.selectedKeys.length > 0) {
              selProps.setSelectedAtKey(selProps.selectedKeys[0], false);
            }
            for (var nk = 0; nk < allNewKeyInOneAry[x].length; nk += 1) {
              selProps.setSelectedAtKey(allNewKeyInOneAry[x][nk], true);
            }
          }
        }
      }
      app.endUndoGroup();
    }
    function logTime(name) {
      var timer = {};
      var start = new Date().getTime();
      timer.name = name;
      timer.time = start;
      return timer;
    }
    function mirrorKey(settingJson2Obj) {
      app.beginUndoGroup("Mirror Key");
      var logTimeAry = [];
      var myComp = app.project.activeItem;
      if (myComp !== null) {
        var seLayers = myComp.selectedLayers;
        var Time = myComp.time;
        var AllLayerKeyData = [];
        var newKeyAry = [];
        var allPropInOneAry = [];
        var allNewKeyInOneAry = [];
        var allSelKeyInOneAry = [];
        for (var i = 0; i < seLayers.length; i += 1) {
          var allPropsInALayer = [];
          for (var j = 0; j < seLayers[i].selectedProperties.length; j += 1) {
            selProps = seLayers[i].selectedProperties[j];
            allSelKeyInOneAry.push(collectKeyframes(selProps));
            allPropInOneAry.push(selProps);
          }
        }
        var AllKeyTime = [];
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          if (
            allSelKeyInOneAry[x] === null ||
            allSelKeyInOneAry[x] === undefined
          ) {
            continue;
          }
          for (var z = 0; z < allSelKeyInOneAry[x].length; z += 1) {
            AllKeyTime.push(allSelKeyInOneAry[x][z].curKeyTime);
          }
        }
        AllKeyTime.sort(function (a, b) {
          return a - b;
        });
        var maxTime = AllKeyTime[AllKeyTime.length - 1];
        Time = Time + maxTime;
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          selProps = allPropInOneAry[x];
          var newKeyAry = transferMirrorKeyframes(
            selProps,
            allSelKeyInOneAry[x],
            Time,
            "mirror",
          );
          allNewKeyInOneAry.push(newKeyAry);
        }
        if (settingJson2Obj.prefs_SelectCloneKeys == true) {
          for (var x = 0; x < allPropInOneAry.length; x += 1) {
            if (
              allSelKeyInOneAry[x] === null ||
              allSelKeyInOneAry[x] === undefined
            ) {
              continue;
            }
            selProps = allPropInOneAry[x];
            while (selProps.selectedKeys.length > 0) {
              selProps.setSelectedAtKey(selProps.selectedKeys[0], false);
            }
            for (var nk = 0; nk < allNewKeyInOneAry[x].length; nk += 1) {
              selProps.setSelectedAtKey(allNewKeyInOneAry[x][nk], true);
            }
          }
        }
      }
      app.endUndoGroup();
    }
    function alignKey(JsonSettingObj) {
      try {
        app.beginUndoGroup("Align Key");
        var myComp = app.project.activeItem;
        if (myComp !== null) {
          var seLayers = myComp.selectedLayers;
          var Time = myComp.time;
          var AllLayerKeyData = [];
          var everyProps = [];
          var hasKeyInCurTime = 0;
          for (var i = 0; i < seLayers.length; i += 1) {
            everyProps[i] = [];
            var allPropsInALayer = [];
            for (var j = 0; j < seLayers[i].selectedProperties.length; j += 1) {
              everyProps[i][j] = seLayers[i].selectedProperties[j];
              selProps = seLayers[i].selectedProperties[j];
              allPropsInALayer.push(collectKeyframes(selProps));
              if (
                allPropsInALayer[j] === null ||
                allPropsInALayer[j] === undefined
              ) {
                continue;
              }
              var thisPropKeyTimeAry = [];
              for (var k = 0; k < allPropsInALayer[j].length; k += 1) {
                thisPropKeyTimeAry.push(allPropsInALayer[j][k].curKeyTime);
              }
              thisPropKeyTimeAry.sort(function (a, b) {
                return a - b;
              });
              allPropsInALayer[j].maxTime =
                thisPropKeyTimeAry[thisPropKeyTimeAry.length - 1];
              allPropsInALayer[j].minTime = thisPropKeyTimeAry[0];
            }
            AllLayerKeyData.push(allPropsInALayer);
          }
          for (var d = 0; d < everyProps.length; d += 1) {
            for (var c = 0; c < everyProps[d].length; c += 1) {
              everyProps[d][c].selected = true;
              if (
                AllLayerKeyData[d][c] === null ||
                AllLayerKeyData[d][c] === undefined
              ) {
                continue;
              }
              if (
                myComp.time < AllLayerKeyData[d][c].minTime ||
                JsonSettingObj.prefs_AlignLeft === true
              ) {
                var nearestKeyIndex = everyProps[d][c].nearestKeyIndex(
                  myComp.time,
                );
                var nearestKeyTime = everyProps[d][c].keyTime(nearestKeyIndex);
                if (nearestKeyTime == myComp.time) {
                  hasKeyInCurTime = 1;
                }
                Time = myComp.time - AllLayerKeyData[d][c].minTime;
                transferKeyframes(
                  everyProps[d][c],
                  AllLayerKeyData[d][c],
                  Time,
                  "align",
                );
              } else {
                if (myComp.time > AllLayerKeyData[d][c].maxTime) {
                  Time = myComp.time - AllLayerKeyData[d][c].maxTime;
                  transferKeyframes(
                    everyProps[d][c],
                    AllLayerKeyData[d][c],
                    Time,
                    "align",
                  );
                }
              }
            }
          }
          for (var m = 0; m < everyProps.length; m += 1) {
            for (var n = 0; n < everyProps[m].length; n += 1) {
              if (
                AllLayerKeyData[m][n] === null ||
                AllLayerKeyData[m][n] === undefined
              ) {
                continue;
              }
              var keysAry = AllLayerKeyData[m][n];
              for (var h = 0; h < keysAry.length; h += 1) {
                if (hasKeyInCurTime == 1) {
                  everyProps[m][n].setSelectedAtKey(
                    keysAry[h].curKeyIndex - 1,
                    true,
                  );
                } else {
                  everyProps[m][n].setSelectedAtKey(
                    keysAry[h].curKeyIndex,
                    true,
                  );
                }
              }
            }
          }
        }
      } catch (err) {
      } finally {
        app.endUndoGroup();
      }
    }
    function alignLeftKey() {
      try {
        app.beginUndoGroup("Align Key");
        var myComp = app.project.activeItem;
        if (myComp !== null) {
          var seLayers = myComp.selectedLayers;
          var Time = myComp.time;
          var AllLayerKeyData = [];
          var everyProps = [];
          var hasKeyInCurTime = 0;
          for (var i = 0; i < seLayers.length; i += 1) {
            everyProps[i] = [];
            var allPropsInALayer = [];
            for (var j = 0; j < seLayers[i].selectedProperties.length; j += 1) {
              everyProps[i][j] = seLayers[i].selectedProperties[j];
              selProps = seLayers[i].selectedProperties[j];
              allPropsInALayer.push(collectKeyframes(selProps));
              if (
                allPropsInALayer[j] === null ||
                allPropsInALayer[j] === undefined
              ) {
                continue;
              }
              var thisPropKeyTimeAry = [];
              for (var k = 0; k < allPropsInALayer[j].length; k += 1) {
                thisPropKeyTimeAry.push(allPropsInALayer[j][k].curKeyTime);
              }
              thisPropKeyTimeAry.sort(function (a, b) {
                return a - b;
              });
              allPropsInALayer[j].maxTime =
                thisPropKeyTimeAry[thisPropKeyTimeAry.length - 1];
              allPropsInALayer[j].minTime = thisPropKeyTimeAry[0];
            }
            AllLayerKeyData.push(allPropsInALayer);
          }
          for (var d = 0; d < everyProps.length; d += 1) {
            for (var c = 0; c < everyProps[d].length; c += 1) {
              everyProps[d][c].selected = true;
              if (
                AllLayerKeyData[d][c] === null ||
                AllLayerKeyData[d][c] === undefined
              ) {
                continue;
              }
              if (myComp.time > AllLayerKeyData[d][c].maxTime) {
                Time = myComp.time - AllLayerKeyData[d][c].maxTime;
                transferKeyframes(
                  everyProps[d][c],
                  AllLayerKeyData[d][c],
                  Time,
                  "align",
                );
              } else {
                if (myComp.time < AllLayerKeyData[d][c].minTime) {
                  var nearestKeyIndex = everyProps[d][c].nearestKeyIndex(
                    myComp.time,
                  );
                  var nearestKeyTime =
                    everyProps[d][c].keyTime(nearestKeyIndex);
                  if (nearestKeyTime == myComp.time) {
                    hasKeyInCurTime = 1;
                  }
                  Time = myComp.time - AllLayerKeyData[d][c].minTime;
                  transferKeyframes(
                    everyProps[d][c],
                    AllLayerKeyData[d][c],
                    Time,
                    "align",
                  );
                }
              }
            }
          }
          for (var m = 0; m < everyProps.length; m += 1) {
            for (var n = 0; n < everyProps[m].length; n += 1) {
              if (
                AllLayerKeyData[m][n] === null ||
                AllLayerKeyData[m][n] === undefined
              ) {
                continue;
              }
              var keysAry = AllLayerKeyData[m][n];
              for (var h = 0; h < keysAry.length; h += 1) {
                if (hasKeyInCurTime == 1) {
                  everyProps[m][n].setSelectedAtKey(
                    keysAry[h].curKeyIndex - 1,
                    true,
                  );
                } else {
                  everyProps[m][n].setSelectedAtKey(
                    keysAry[h].curKeyIndex,
                    true,
                  );
                }
              }
            }
          }
        }
      } catch (err) {
      } finally {
        app.endUndoGroup();
      }
    }
    function organizeKey() {
      try {
        app.beginUndoGroup("Correct Key");
        var myComp = app.project.activeItem;
        if (myComp !== null) {
          var seLayers = myComp.selectedLayers;
          var TimeObj = {};
          TimeObj.time = myComp.time;
          TimeObj.correctedKeyNums = 0;
          var everyProps = [];
          for (var x = 0; x < seLayers.length; x += 1) {
            everyProps[x] = [];
            for (var y = 0; y < seLayers[x].selectedProperties.length; y += 1) {
              everyProps[x][y] = seLayers[x].selectedProperties[y];
            }
          }
          var selPropKeyData = [];
          for (var a = 0; a < everyProps.length; a += 1) {
            selPropKeyData[a] = [];
            for (var b = 0; b < everyProps[a].length; b += 1) {
              selPropKeyData[a][b] = collectKeyframes(everyProps[a][b]);
            }
          }
          for (var d = 0; d < everyProps.length; d += 1) {
            for (var c = 0; c < everyProps[d].length; c += 1) {
              everyProps[d][c].selected = true;
              transferKeyframes(
                everyProps[d][c],
                selPropKeyData[d][c],
                TimeObj,
                "organize",
              );
            }
          }
          for (var m = 0; m < everyProps.length; m += 1) {
            for (var n = 0; n < everyProps[m].length; n += 1) {
              if (
                selPropKeyData[m][n] === null ||
                selPropKeyData[m][n] === undefined
              ) {
                continue;
              }
              var keysAry = selPropKeyData[m][n];
              for (var k = 0; k < keysAry.length; k += 1) {
                everyProps[m][n].setSelectedAtKey(keysAry[k].curKeyIndex, true);
              }
            }
          }
          alert(TimeObj.correctedKeyNums + " keys are corrected. ");
        }
      } catch (err) {
      } finally {
        app.endUndoGroup();
      }
    }
    function randomKey(JsonSettingObj) {
      function getRandom(min, max) {
        min = parseInt(min);
        max = parseInt(max);
        return Math.floor(Math.random() * (max - min + 1) * 10) / 10 + min;
      }
      function getRandomFactor() {
        var random = Math.random() > 0.5 ? 1 : -1;
        return random;
      }
      function getRandomArray(minNum, maxNum, n) {
        var rdmArray = [n];
        for (var i = 0; i < n; i += 1) {
          var rdm = 0;
          rdm = getRandom(minNum, maxNum);
          rdmArray[i] = Math.round(rdm);
        }
        return rdmArray;
      }
      function doRandom() {
        var myComp = app.project.activeItem;
        if (myComp !== null) {
          var seLayers = myComp.selectedLayers;
          var showTextMin = 30;
          var newKeyAry = [];
          var allPropInOneAry = [];
          var layerRdmAry = [];
          var allNewKeyInOneAry = [];
          var allSelKeyInOneAry = [];
          if (isNaN(min.text)) {
            min.text = 0;
          }
          if (isNaN(max.text)) {
            max.text = 0;
          }
          if (seLayers.length > showTextMin) {
            info = myInputGroup.add("statictext", [0, 0, 140, 30], "");
            myWindow.layout.layout(true);
          }
          Time = myComp.time;
          for (var x = 0; x < seLayers.length; x += 1) {
            var factor = getRandomFactor();
            var rdm = getRandom(min.text, max.text);
            rdm = Math.round(rdm) * factor;
            for (var y = 0; y < seLayers[x].selectedProperties.length; y += 1) {
              if (
                seLayers[x].selectedProperties[y].propertyType ==
                PropertyType.NAMED_GROUP
              ) {
                continue;
              }
              if (seLayers[x].selectedProperties[y].selectedKeys === 0) {
                continue;
              }
              var selProps = seLayers[x].selectedProperties[y];
              layerRdmAry.push(rdm);
              allPropInOneAry.push(selProps);
              allSelKeyInOneAry.push(collectKeyframes(selProps));
            }
          }
          for (var x = 0; x < allPropInOneAry.length; x += 1) {
            var dataObj = {};
            dataObj.offset = layerRdmAry[x];
            dataObj.format = timeFormat.selection;
            transferKeyframes(
              allPropInOneAry[x],
              allSelKeyInOneAry[x],
              dataObj,
              "random",
            );
          }
          for (var x = 0; x < allPropInOneAry.length; x += 1) {
            if (
              allSelKeyInOneAry[x] === null ||
              allSelKeyInOneAry[x] === undefined
            ) {
              continue;
            }
            var keysAry = allSelKeyInOneAry[x];
            for (var k = 0; k < keysAry.length; k += 1) {
              allPropInOneAry[x].setSelectedAtKey(keysAry[k].curKeyIndex, true);
            }
          }
          if (allPropInOneAry.length > showTextMin) {
          }
        }
      }
      function doRandomV2() {
        var myComp = app.project.activeItem;
        if (myComp !== null) {
          var seLayers = myComp.selectedLayers;
          var showTextMin = 30;
          if (seLayers.length > showTextMin) {
            info = myInputGroup.add("statictext", [0, 0, 140, 30], "");
            myWindow.layout.layout(true);
          }
          Time = myComp.time;
          var everyProps = [];
          for (var x = 0; x < seLayers.length; x += 1) {
            everyProps[x] = [];
            for (var y = 0; y < seLayers[x].selectedProperties.length; y += 1) {
              everyProps[x][y] = seLayers[x].selectedProperties[y];
            }
          }
          if (everyProps.length > showTextMin) {
            info.text = "collect keyframes...(1/3)";
            myWindow.update();
          }
          var selPropKeyData = [];
          for (var a = 0, al = everyProps.length; a < al; a++) {
            selPropKeyData[a] = [];
            for (var b = 0, bl = everyProps[a].length; b < bl; b++) {
              selPropKeyData[a][b] = collectKeyframes(everyProps[a][b]);
            }
            if (everyProps.length > showTextMin) {
            }
          }
          info.text = "collect keyframes...(2/3)";
          myWindow.update();
        }
      }
      function pressed(k) {
        if (k.keyName == "Enter") {
          JsonSettingObj.randomKeys_preVal[0] = min.text;
          JsonSettingObj.randomKeys_preVal[1] = max.text;
          if (
            timeFormat.selection.toString() != JsonSettingObj.randomKeys_preUnit
          ) {
            JsonSettingObj.randomKeys_preUnit = timeFormat.selection.toString();
          }
          var settingJson = createJsonFile(
            "KEYboard_setting.json",
            JsonSettingObj,
          );
          try {
            app.beginUndoGroup("Random Key");
            myWindow.close();
            doRandom();
          } catch (err) {
          } finally {
            app.endUndoGroup();
          }
        } else {
          if (k.keyName == "Escape") {
            myWindow.close();
          }
        }
      }
      var binIcon = __BLOB__BLOB_000066__;
      var binClose = __BLOB__BLOB_000067__;
      var binShift = __BLOB__BLOB_000068__;
      var imgIcon = createResourceFile("KEYboard_random.png", binIcon);
      var imgClose = createResourceFile("KEYboard_random_close.png", binClose);
      var imgDoIt = createResourceFile("KEYboard_DoIt.png", binShift);
      var lightGray = HexToRGB("#393939");
      var white = HexToRGB("#EEEEEE");
      var yellow = HexToRGB("#FFBC65");
      var red = HexToRGB("#AC4C5E");
      var purple = HexToRGB("#5C476F");
      var AEversion = app.version.substring(0, 4);
      if (AEversion < 12) {
        myWindow = new Window("palette", "Random Key", undefined, {
          borderless: false,
        });
      } else {
        myWindow = new Window("palette", "Random Key", undefined, {
          borderless: false,
        });
      }
      var winPos = JsonSettingObj.shiftKey_curPos;
      if (winPos[0] === 0 && winPos[1] === 0) {
      } else {
        if (JsonSettingObj.rememberWinPos == true) {
          myWindow.location = JsonSettingObj.shiftKey_curPos;
        }
      }
      myWindow.graphics.backgroundColor = myWindow.graphics.newBrush(
        myWindow.graphics.BrushType.SOLID_COLOR,
        yellow,
      );
      myWindow.alignChildren = ["fill", "fill"];
      myWindow.orientation = "row";
      myWindow.margins = 0;
      myWindow.margins.top = 5;
      myWindow.spacing = 0;
      var allGrp = myWindow.add("group");
      allGrp.graphics.backgroundColor = allGrp.graphics.newBrush(
        allGrp.graphics.BrushType.SOLID_COLOR,
        lightGray,
      );
      allGrp.spacing = 0;
      var header = allGrp.add("group");
      header.orientation = "row";
      header.alignChildren = ["fill", "fill"];
      var iconGroup = header.add("group");
      iconGroup.alignChildren = ["right", ""];
      var icon = iconGroup.add("image", undefined, imgIcon);
      var functionGroup = allGrp.add("group");
      functionGroup.margins = 15;
      functionGroup.orientation = "column";
      var myInputGroup = functionGroup.add("group");
      myInputGroup.spacing = 8;
      var min = myInputGroup.add(
        'edittext {text: "0", characters: 8, justify: "center"}',
      );
      var divide = myInputGroup.add(
        'statictext {text: "~", characters: 2, justify: "center"}',
      );
      var max = myInputGroup.add(
        'edittext {text: "5", characters: 8, justify: "center"}',
      );
      var timeFormat = myInputGroup.add("dropdownlist", undefined, [
        "Frames",
        "Seconds",
      ]);
      timeFormat.selection = 0;
      min.text = JsonSettingObj.randomKeys_preVal[0];
      max.text = JsonSettingObj.randomKeys_preVal[1];
      if (JsonSettingObj.randomKeys_preUnit == "Frames") {
        timeFormat.selection = 0;
      } else {
        timeFormat.selection = 1;
      }
      min.characters = 3;
      min.active = false;
      max.characters = 3;
      max.active = true;
      var OKbtn = myInputGroup.add("iconbutton", undefined, imgDoIt, {
        style: "toolbutton",
      });
      var Closebtn = myInputGroup.add("iconbutton", undefined, imgClose, {
        style: "toolbutton",
      });
      Closebtn.preferredSize = [23, 23];
      OKbtn.preferredSize = [53, 23];
      Closebtn.helpTip = "cancel and close window";
      var btnSize = [30, 25];
      min.addEventListener("keydown", function (kd) {
        pressed(kd);
      });
      max.addEventListener("keydown", function (kd) {
        pressed(kd);
      });
      OKbtn.onClick = function () {
        JsonSettingObj.randomKeys_preVal[0] = min.text;
        JsonSettingObj.randomKeys_preVal[1] = max.text;
        if (
          timeFormat.selection.toString() != JsonSettingObj.randomKeys_preUnit
        ) {
          JsonSettingObj.randomKeys_preUnit = timeFormat.selection.toString();
        }
        var settingJson = createJsonFile(
          "KEYboard_setting.json",
          JsonSettingObj,
        );
        try {
          app.beginUndoGroup("Random Key");
          myWindow.close();
          doRandom();
        } catch (err) {
        } finally {
          app.endUndoGroup();
        }
      };
      Closebtn.onClick = function () {
        myWindow.close();
      };
      myWindow.onClose = function () {
        JsonSettingObj.shiftKey_curPos = [
          myWindow.location.x,
          myWindow.location.y,
        ];
        createJsonFile("KEYboard_setting.json", JsonSettingObj);
      };
      myWindow.show();
    }
    function shiftUpKey(JsonSettingObj) {
      function doShift(offsetVal) {
        var logTimeAry = [];
        logTimeAry.push(logTime("start"));
        var myComp = app.project.activeItem;
        var seLayers = myComp.selectedLayers;
        var newKeyAry = [];
        var allPropInOneAry = [];
        var layerIdxAry = [];
        var allNewKeyInOneAry = [];
        var allSelKeyInOneAry = [];
        if (seLayers.length > 50) {
          info = myInputGroup.add("statictext", [0, 0, 100, 30], "");
          myWindow.layout.layout(true);
        }
        Time = myComp.time;
        var dataObj = {};
        dataObj.numProps = seLayers.length;
        for (var x = 0; x < seLayers.length; x += 1) {
          for (var y = 0; y < seLayers[x].selectedProperties.length; y += 1) {
            if (
              seLayers[x].selectedProperties[y].propertyType ==
              PropertyType.NAMED_GROUP
            ) {
              continue;
            }
            if (seLayers[x].selectedProperties[y].selectedKeys === 0) {
              continue;
            }
            var selProps = seLayers[x].selectedProperties[y];
            layerIdxAry.push(x);
            allPropInOneAry.push(selProps);
            allSelKeyInOneAry.push(collectKeyframes(selProps));
          }
        }
        logTimeAry.push(logTime("end collect prop"));
        logTimeAry.push(logTime("end collect key"));
        dataObj.counter = 0;
        dataObj.offset = offsetVal;
        dataObj.format = timeFormat.selection.text;
        if (allPropInOneAry.length > 50) {
          info.text = "move keyframes...";
          myWindow.update();
        }
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          dataObj.counter = layerIdxAry[x];
          transferKeyframes(
            allPropInOneAry[x],
            allSelKeyInOneAry[x],
            dataObj,
            "shiftUp",
          );
        }
        logTimeAry.push(logTime("end move keys"));
        if (allPropInOneAry.length > 50) {
          info.text = "select keyframes...";
          myWindow.update();
        }
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          if (
            allSelKeyInOneAry[x] === null ||
            allSelKeyInOneAry[x] === undefined
          ) {
            continue;
          }
          var keysAry = allSelKeyInOneAry[x];
          for (var k = 0; k < keysAry.length; k += 1) {
            allPropInOneAry[x].setSelectedAtKey(keysAry[k].curKeyIndex, true);
          }
        }
        logTimeAry.push(logTime("end select new key"));
        if (allPropInOneAry.length > 50) {
          alert("finished");
        }
        logTimeAry.push(logTime("nothing"));
      }
      function pressed(k) {
        if (k.keyName == "Enter") {
          if (isNaN(offsetVal.text)) {
            offsetVal.text = 0;
          }
          if (offsetVal.text === 0) {
            JsonSettingObj.shiftUpKeys_preVal = 5;
          } else {
            JsonSettingObj.shiftUpKeys_preVal = offsetVal.text;
          }
          if (
            timeFormat.selection.toString() !=
            JsonSettingObj.shiftUpKeys_preUnit
          ) {
            JsonSettingObj.shiftUpKeys_preUnit =
              timeFormat.selection.toString();
          }
          var settingJson = createJsonFile(
            "KEYboard_setting.json",
            JsonSettingObj,
          );
          try {
            app.beginUndoGroup("Shift Keys by Enter");
            myWindow.close();
            doShift(Number(offsetVal.text));
          } catch (err) {
          } finally {
            app.endUndoGroup();
          }
        } else {
          if (k.keyName == "Escape") {
            myWindow.close();
          }
        }
      }
      var binIcon = __BLOB__BLOB_000069__;
      var binClose = __BLOB__BLOB_000070__;
      var binShift = __BLOB__BLOB_000071__;
      var imgIcon = createResourceFile("KEYboard_shiftUp.png", binIcon);
      var imgClose = createResourceFile("KEYboard_shiftUp_close.png", binClose);
      var imgDoIt = createResourceFile("KEYboard_DoIt.png", binShift);
      var lightGray = HexToRGB("#393939");
      var white = HexToRGB("#EEEEEE");
      var yellow = HexToRGB("#FFBC65");
      var red = HexToRGB("#AC4C5E");
      var purple = HexToRGB("#5C476F");
      var AEversion = app.version.substring(0, 4);
      if (AEversion < 12) {
        myWindow = new Window("palette", "ShiftUp", undefined, {
          borderless: false,
        });
      } else {
        myWindow = new Window("palette", "ShiftUp", undefined, {
          borderless: false,
        });
      }
      myWindow.graphics.backgroundColor = myWindow.graphics.newBrush(
        myWindow.graphics.BrushType.SOLID_COLOR,
        yellow,
      );
      myWindow.alignChildren = ["fill", "fill"];
      myWindow.orientation = "row";
      myWindow.margins = 0;
      myWindow.margins.top = 5;
      myWindow.spacing = 0;
      var winPos = JsonSettingObj.shiftKey_curPos;
      if (winPos[0] === 0 && winPos[1] === 0) {
      } else {
        if (JsonSettingObj.rememberWinPos == true) {
          myWindow.location = JsonSettingObj.shiftKey_curPos;
        }
      }
      var allGrp = myWindow.add("group");
      allGrp.graphics.backgroundColor = allGrp.graphics.newBrush(
        allGrp.graphics.BrushType.SOLID_COLOR,
        lightGray,
      );
      allGrp.spacing = 0;
      var header = allGrp.add("group");
      header.orientation = "row";
      header.alignChildren = ["fill", "fill"];
      var iconGroup = header.add("group");
      iconGroup.alignChildren = ["right", ""];
      var icon = iconGroup.add("image", undefined, imgIcon);
      var functionGroup = allGrp.add("group");
      functionGroup.margins = 15;
      functionGroup.orientation = "column";
      var myInputGroup = functionGroup.add("group");
      myInputGroup.spacing = 8;
      var offsetVal = myInputGroup.add(
        'edittext {text: "5", characters: 8, justify: "left"}',
      );
      var timeFormat = myInputGroup.add("dropdownlist", undefined, [
        "Frames",
        "Seconds",
      ]);
      offsetVal.text = JsonSettingObj.shiftUpKeys_preVal;
      if (JsonSettingObj.shiftUpKeys_preUnit == "Frames") {
        timeFormat.selection = 0;
      } else {
        timeFormat.selection = 1;
      }
      offsetVal.characters = 5;
      offsetVal.active = true;
      var OKbtn = myInputGroup.add("iconbutton", undefined, imgDoIt, {
        style: "toolbutton",
      });
      var Closebtn = myInputGroup.add("iconbutton", undefined, imgClose, {
        style: "toolbutton",
      });
      Closebtn.preferredSize = [23, 23];
      OKbtn.preferredSize = [53, 23];
      Closebtn.helpTip = "cancel and close window";
      var btnSize = [30, 25];
      offsetVal.addEventListener("keydown", function (kd) {
        pressed(kd);
      });
      myWindow.onClose = function () {
        JsonSettingObj.shiftKey_curPos = [
          myWindow.location.x,
          myWindow.location.y,
        ];
        createJsonFile("KEYboard_setting.json", JsonSettingObj);
      };
      OKbtn.onClick = function () {
        if (isNaN(offsetVal.text)) {
          offsetVal.text = 0;
        }
        if (offsetVal.text === 0) {
          JsonSettingObj.shiftUpKeys_preVal = 5;
        } else {
          JsonSettingObj.shiftUpKeys_preVal = offsetVal.text;
        }
        if (
          timeFormat.selection.toString() != JsonSettingObj.shiftUpKeys_preUnit
        ) {
          JsonSettingObj.shiftUpKeys_preUnit = timeFormat.selection.toString();
        }
        var settingJson = createJsonFile(
          "KEYboard_setting.json",
          JsonSettingObj,
        );
        try {
          app.beginUndoGroup("Shift Keys by Enter");
          myWindow.close();
          doShift(Number(offsetVal.text));
        } catch (err) {
        } finally {
          app.endUndoGroup();
        }
      };
      Closebtn.onClick = function () {
        myWindow.close();
      };
      myWindow.show();
    }
    function shiftDownKey(JsonSettingObj) {
      function doShift(offsetVal) {
        var myComp = app.project.activeItem;
        var seLayers = myComp.selectedLayers;
        var newKeyAry = [];
        var allPropInOneAry = [];
        var layerIdxAry = [];
        var allNewKeyInOneAry = [];
        var allSelKeyInOneAry = [];
        if (seLayers.length > 50) {
          info = myInputGroup.add("statictext", [0, 0, 100, 30], "");
          myWindow.layout.layout(true);
        }
        Time = myComp.time;
        var dataObj = {};
        dataObj.numProps = seLayers.length;
        for (var x = 0; x < seLayers.length; x += 1) {
          for (var y = 0; y < seLayers[x].selectedProperties.length; y += 1) {
            if (
              seLayers[x].selectedProperties[y].propertyType ==
              PropertyType.NAMED_GROUP
            ) {
              continue;
            }
            if (seLayers[x].selectedProperties[y].selectedKeys === 0) {
              continue;
            }
            var selProps = seLayers[x].selectedProperties[y];
            layerIdxAry.push(x);
            allPropInOneAry.push(selProps);
            allSelKeyInOneAry.push(collectKeyframes(selProps));
          }
        }
        dataObj.counter = 0;
        dataObj.offset = offsetVal;
        dataObj.format = timeFormat.selection.text;
        if (allPropInOneAry.length > 50) {
          info.text = "move keyframes...";
          myWindow.update();
        }
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          dataObj.counter = layerIdxAry[x];
          transferKeyframes(
            allPropInOneAry[x],
            allSelKeyInOneAry[x],
            dataObj,
            "shiftDown",
          );
        }
        if (allPropInOneAry.length > 50) {
          info.text = "select keyframes...";
          myWindow.update();
        }
        for (var x = 0; x < allPropInOneAry.length; x += 1) {
          if (
            allSelKeyInOneAry[x] === null ||
            allSelKeyInOneAry[x] === undefined
          ) {
            continue;
          }
          var keysAry = allSelKeyInOneAry[x];
          for (var k = 0; k < keysAry.length; k += 1) {
            allPropInOneAry[x].setSelectedAtKey(keysAry[k].curKeyIndex, true);
          }
        }
        if (allPropInOneAry.length > 50) {
          alert("finished");
        }
      }
      function pressed(k) {
        if (k.keyName == "Enter") {
          if (isNaN(offsetVal.text)) {
            offsetVal.text = 0;
          }
          if (offsetVal.text === 0) {
            JsonSettingObj.shiftDownKeys_preVal = 5;
          } else {
            JsonSettingObj.shiftDownKeys_preVal = offsetVal.text;
          }
          if (
            timeFormat.selection.toString() !=
            JsonSettingObj.shiftDownKeys_preUnit
          ) {
            JsonSettingObj.shiftDownKeys_preUnit =
              timeFormat.selection.toString();
          }
          var settingJson = createJsonFile(
            "KEYboard_setting.json",
            JsonSettingObj,
          );
          try {
            app.beginUndoGroup("Shift Keys");
            myWindow.close();
            doShift(Number(offsetVal.text));
          } catch (err) {
          } finally {
            app.endUndoGroup();
          }
        } else {
          if (k.keyName == "Escape") {
            myWindow.close();
          }
        }
      }
      var binIcon = __BLOB__BLOB_000072__;
      var binClose = __BLOB__BLOB_000073__;
      var binShift = __BLOB__BLOB_000074__;
      var imgIcon = createResourceFile("KEYboard_shiftDown.png", binIcon);
      var imgClose = createResourceFile(
        "KEYboard_shiftDown_close.png",
        binClose,
      );
      var imgDoIt = createResourceFile("KEYboard_DoIt2.png", binShift);
      var lightGray = HexToRGB("#393939");
      var white = HexToRGB("#EEEEEE");
      var yellow = HexToRGB("#FFBC65");
      var red = HexToRGB("#AC4C5E");
      var purple = HexToRGB("#5C476F");
      var AEversion = app.version.substring(0, 4);
      if (AEversion < 12) {
        myWindow = new Window("palette", "ShiftDown", undefined, {
          borderless: false,
        });
      } else {
        myWindow = new Window("palette", "ShiftDown", undefined, {
          borderless: false,
        });
      }
      var winPos = JsonSettingObj.shiftKey_curPos;
      if (winPos[0] === 0 && winPos[1] === 0) {
      } else {
        if (JsonSettingObj.rememberWinPos == true) {
          myWindow.location = JsonSettingObj.shiftKey_curPos;
        }
      }
      myWindow.graphics.backgroundColor = myWindow.graphics.newBrush(
        myWindow.graphics.BrushType.SOLID_COLOR,
        yellow,
      );
      myWindow.alignChildren = ["fill", "fill"];
      myWindow.orientation = "row";
      myWindow.margins = 0;
      myWindow.margins.top = 5;
      myWindow.spacing = 0;
      var allGrp = myWindow.add("group");
      allGrp.graphics.backgroundColor = allGrp.graphics.newBrush(
        allGrp.graphics.BrushType.SOLID_COLOR,
        lightGray,
      );
      allGrp.spacing = 0;
      var header = allGrp.add("group");
      header.orientation = "row";
      header.alignChildren = ["fill", "fill"];
      var iconGroup = header.add("group");
      iconGroup.alignChildren = ["right", ""];
      var icon = iconGroup.add("image", undefined, imgIcon);
      var functionGroup = allGrp.add("group");
      functionGroup.margins = 15;
      functionGroup.orientation = "column";
      var myInputGroup = functionGroup.add("group");
      myInputGroup.spacing = 8;
      var offsetVal = myInputGroup.add(
        'edittext {text: "5", characters: 8, justify: "left"}',
      );
      var timeFormat = myInputGroup.add("dropdownlist", undefined, [
        "Frames",
        "Seconds",
      ]);
      offsetVal.text = JsonSettingObj.shiftDownKeys_preVal;
      if (JsonSettingObj.shiftDownKeys_preUnit == "Frames") {
        timeFormat.selection = 0;
      } else {
        timeFormat.selection = 1;
      }
      offsetVal.characters = 5;
      offsetVal.active = true;
      var OKbtn = myInputGroup.add("iconbutton", undefined, imgDoIt, {
        style: "toolbutton",
      });
      var Closebtn = myInputGroup.add("iconbutton", undefined, imgClose, {
        style: "toolbutton",
      });
      Closebtn.preferredSize = [23, 23];
      OKbtn.preferredSize = [53, 23];
      Closebtn.helpTip = "cancel and close window";
      var btnSize = [30, 25];
      OKbtn.onClick = function () {
        if (isNaN(offsetVal.text)) {
          offsetVal.text = 0;
        }
        if (offsetVal.text === 0) {
          JsonSettingObj.shiftDownKeys_preVal = 5;
        } else {
          JsonSettingObj.shiftDownKeys_preVal = offsetVal.text;
        }
        if (
          timeFormat.selection.toString() !=
          JsonSettingObj.shiftDownKeys_preUnit
        ) {
          JsonSettingObj.shiftDownKeys_preUnit =
            timeFormat.selection.toString();
        }
        var settingJson = createJsonFile(
          "KEYboard_setting.json",
          JsonSettingObj,
        );
        try {
          app.beginUndoGroup("Shift Keys");
          myWindow.close();
          doShift(Number(offsetVal.text));
        } catch (err) {
        } finally {
          app.endUndoGroup();
        }
      };
      Closebtn.onClick = function () {
        myWindow.close();
      };
      myWindow.onClose = function () {
        JsonSettingObj.shiftKey_curPos = [
          myWindow.location.x,
          myWindow.location.y,
        ];
        createJsonFile("KEYboard_setting.json", JsonSettingObj);
      };
      offsetVal.addEventListener("keydown", function (kd) {
        pressed(kd);
      });
      myWindow.show();
    }
    function addMirrorKey(propertyInput, Time, curKeyTime) {
      var addNewKey = propertyInput.addKey(Time - curKeyTime);
      return addNewKey;
    }
    function addCloneKey(propertyInput, Time, curKeyTime) {
      var addNewKey = propertyInput.addKey(Time + curKeyTime);
      return addNewKey;
    }
    function collectKeyframes(propertyInput) {
      if (propertyInput instanceof Property) {
        twoDs = PropertyValueType.TwoD_SPATIAL;
        threeDs = PropertyValueType.ThreeD_SPATIAL;
        keyIndexList = [];
        totalKeys = propertyInput.numKeys;
        selKeys = propertyInput.selectedKeys;
        if (
          propertyInput.propertyValueType !== PropertyValueType.CUSTOM_VALUE
        ) {
          if (selKeys.length > 0) {
            for (var i = 0; i < selKeys.length; i += 1) {
              curKeyTime = propertyInput.keyTime(selKeys[i]);
              curKeyIndex = selKeys[i];
              curKeyValue = propertyInput.keyValue(selKeys[i]);
              inin = propertyInput.keyInInterpolationType(curKeyIndex);
              outin = propertyInput.keyOutInterpolationType(curKeyIndex);
              if (
                inin == KeyframeInterpolationType.BEZIER &&
                outin == KeyframeInterpolationType.BEZIER
              ) {
                ab = propertyInput.keyTemporalAutoBezier(curKeyIndex);
                cb = propertyInput.keyTemporalContinuous(curKeyIndex);
              }
              if (
                inin != KeyframeInterpolationType.HOLD ||
                outin != KeyframeInterpolationType.HOLD
              ) {
                ie = propertyInput.keyInTemporalEase(curKeyIndex);
                oe = propertyInput.keyOutTemporalEase(curKeyIndex);
              }
              if (
                propertyInput.propertyValueType == twoDs ||
                propertyInput.propertyValueType == threeDs
              ) {
                sab = propertyInput.keySpatialAutoBezier(curKeyIndex);
                scb = propertyInput.keySpatialContinuous(curKeyIndex);
                ist = propertyInput.keyInSpatialTangent(curKeyIndex);
                ost = propertyInput.keyOutSpatialTangent(curKeyIndex);
                rov = propertyInput.keyRoving(curKeyIndex);
              }
              keyIndexList[keyIndexList.length] = {
                ab: ab,
                cb: cb,
                curKeyIndex: curKeyIndex,
                curKeyTime: curKeyTime,
                curKeyValue: curKeyValue,
                ie: ie,
                inin: inin,
                ist: ist,
                oe: oe,
                ost: ost,
                outin: outin,
                rov: rov,
                sab: sab,
                scb: scb,
              };
            }
            return keyIndexList;
          } else {
            return null;
          }
        } else {
          return null;
        }
      }
    }
    function transferMirrorKeyframes(propertyInput, keysAry, Time, mode) {
      try {
        if (propertyInput instanceof Property && keysAry instanceof Array) {
          var newKeyAry = [];
          keysAryLength = keysAry.length;
          if (propertyInput.numKeys > 0) {
            for (var k = keysAryLength - 1; k >= 0; k--) {
              switch (mode) {
                case "mirror":
                  addNewKey = addMirrorKey(
                    propertyInput,
                    Time,
                    keysAry[k].curKeyTime,
                  );
                  newKeyAry.push(addNewKey);
                  if (propertyInput.selectNewKeys == true) {
                  }
                  break;
                case "clone":
                  addNewKey = addCloneKey(
                    propertyInput,
                    Time,
                    keysAry[k].curKeyTime,
                  );
                  break;
              }
              if (k < keysAryLength - 1) {
                bakKeyIndex = newKeyIndex;
              }
              newKeyIndex = addNewKey;
              propertyInput.setValueAtKey(newKeyIndex, keysAry[k].curKeyValue);
              if (
                keysAry[k].inin == KeyframeInterpolationType.BEZIER &&
                keysAry[k].outin == KeyframeInterpolationType.BEZIER
              ) {
                propertyInput.setTemporalEaseAtKey(
                  newKeyIndex,
                  keysAry[k].oe,
                  keysAry[k].ie,
                );
              }
              propertyInput.setInterpolationTypeAtKey(
                newKeyIndex,
                keysAry[k].outin,
                keysAry[k].inin,
              );
              if (
                keysAry[k].inin == KeyframeInterpolationType.BEZIER &&
                keysAry[k].outin == KeyframeInterpolationType.BEZIER &&
                keysAry[k].cb
              ) {
                propertyInput.setTemporalContinuousAtKey(
                  newKeyIndex,
                  keysAry[k].cb,
                );
                propertyInput.setTemporalAutoBezierAtKey(
                  newKeyIndex,
                  keysAry[k].ab,
                );
              }
              if (
                propertyInput.propertyValueType ==
                  PropertyValueType.TwoD_SPATIAL ||
                propertyInput.propertyValueType ==
                  PropertyValueType.ThreeD_SPATIAL
              ) {
                propertyInput.setSpatialContinuousAtKey(
                  newKeyIndex,
                  keysAry[k].scb,
                );
                propertyInput.setSpatialAutoBezierAtKey(
                  newKeyIndex,
                  keysAry[k].sab,
                );
                propertyInput.setSpatialTangentsAtKey(
                  newKeyIndex,
                  keysAry[k].ost,
                  keysAry[k].ist,
                );
                if (k < keysAryLength - 1) {
                  propertyInput.setRovingAtKey(bakKeyIndex, keysAry[k + 1].rov);
                }
              }
            }
          }
          return newKeyAry;
        }
      } catch (err) {
        alert(err.line.toString() + "\r" + err.toString());
      }
    }
    function transferKeyframes(propertyInput, keysAry, Time, mode) {
      try {
        if (propertyInput instanceof Property && keysAry instanceof Array) {
          var newKeyAry = [];
          keysAryLength = keysAry.length;
          if (propertyInput.numKeys > 0) {
            for (var m = 0; m < keysAryLength; m += 1) {
              switch (mode) {
                case "mirror":
                  break;
                case "clone":
                  break;
                case "organize":
                  propertyInput.removeKey(
                    propertyInput.nearestKeyIndex(keysAry[m].curKeyTime),
                  );
                  break;
                case "shiftUp":
                  propertyInput.removeKey(
                    propertyInput.nearestKeyIndex(keysAry[m].curKeyTime),
                  );
                  break;
                case "shiftDown":
                  propertyInput.removeKey(
                    propertyInput.nearestKeyIndex(keysAry[m].curKeyTime),
                  );
                  break;
                case "align":
                  propertyInput.removeKey(
                    propertyInput.nearestKeyIndex(keysAry[m].curKeyTime),
                  );
                  break;
                case "random":
                  propertyInput.removeKey(
                    propertyInput.nearestKeyIndex(keysAry[m].curKeyTime),
                  );
                  break;
              }
            }
            for (var k = 0; k < keysAryLength; k += 1) {
              switch (mode) {
                case "mirror":
                  addNewKey = addMirrorKey(
                    propertyInput,
                    Time,
                    keysAry[k].curKeyTime,
                  );
                  break;
                case "clone":
                  addNewKey = addCloneKey(
                    propertyInput,
                    Time,
                    keysAry[k].curKeyTime,
                  );
                  newKeyAry.push(addNewKey);
                  break;
                case "organize":
                  duration = app.project.activeItem.frameDuration;
                  correctTime =
                    Math.round(keysAry[k].curKeyTime / duration) * duration;
                  if (keysAry[k].curKeyTime !== correctTime) {
                    Time.correctedKeyNums += 1;
                  }
                  addNewKey = propertyInput.addKey(correctTime);
                  break;
                case "shiftUp":
                  duration = app.project.activeItem.frameDuration;
                  factor =
                    Time.numProps == 1 ? 0 : Time.counter / (Time.numProps - 1);
                  offsetTime = Time.offset * factor;
                  offsetTime =
                    Time.format == "Frames"
                      ? offsetTime * duration
                      : offsetTime;
                  addNewKey = propertyInput.addKey(
                    keysAry[k].curKeyTime + offsetTime,
                  );
                  break;
                case "shiftDown":
                  duration = app.project.activeItem.frameDuration;
                  factor =
                    Time.numProps == 1
                      ? 0
                      : (Time.numProps - Time.counter - 1) /
                        (Time.numProps - 1);
                  offsetTime = Time.offset * factor;
                  offsetTime =
                    Time.format == "Frames"
                      ? offsetTime * duration
                      : offsetTime;
                  addNewKey = propertyInput.addKey(
                    keysAry[k].curKeyTime + offsetTime,
                  );
                  break;
                case "align":
                  addNewKey = propertyInput.addKey(
                    keysAry[k].curKeyTime + Time,
                  );
                  break;
                case "random":
                  duration = app.project.activeItem.frameDuration;
                  correctTime = keysAry[k].curKeyTime;
                  correctTime =
                    Time.format.toString() == "Frames"
                      ? correctTime + Time.offset * duration
                      : correctTime + Time.offset;
                  addNewKey = propertyInput.addKey(correctTime);
                  break;
              }
              if (k < keysAryLength) {
                bakKeyIndex = newKeyIndex;
              }
              newKeyIndex = addNewKey;
              propertyInput.setValueAtKey(newKeyIndex, keysAry[k].curKeyValue);
              if (mode == "clone") {
                keysAry[k].curKeyIndex = newKeyIndex;
              }
              propertyInput.setInterpolationTypeAtKey(
                newKeyIndex,
                keysAry[k].inin,
                keysAry[k].outin,
              );
              if (
                keysAry[k].inin == KeyframeInterpolationType.BEZIER ||
                keysAry[k].outin == KeyframeInterpolationType.BEZIER
              ) {
                propertyInput.setTemporalEaseAtKey(
                  newKeyIndex,
                  keysAry[k].ie,
                  keysAry[k].oe,
                );
              }
              if (
                keysAry[k].inin == KeyframeInterpolationType.BEZIER &&
                keysAry[k].outin == KeyframeInterpolationType.BEZIER &&
                keysAry[k].cb
              ) {
                propertyInput.setTemporalContinuousAtKey(
                  newKeyIndex,
                  keysAry[k].cb,
                );
                propertyInput.setTemporalAutoBezierAtKey(
                  newKeyIndex,
                  keysAry[k].ab,
                );
              }
              if (
                propertyInput.propertyValueType ==
                  PropertyValueType.TwoD_SPATIAL ||
                propertyInput.propertyValueType ==
                  PropertyValueType.ThreeD_SPATIAL
              ) {
                propertyInput.setSpatialContinuousAtKey(
                  newKeyIndex,
                  keysAry[k].scb,
                );
                propertyInput.setSpatialAutoBezierAtKey(
                  newKeyIndex,
                  keysAry[k].sab,
                );
                propertyInput.setSpatialTangentsAtKey(
                  newKeyIndex,
                  keysAry[k].ist,
                  keysAry[k].ost,
                );
                if (k < keysAryLength && k !== 0) {
                  propertyInput.setRovingAtKey(bakKeyIndex, keysAry[k - 1].rov);
                }
              }
            }
          }
          return newKeyAry;
        }
      } catch (err) {
        alert(err.line.toString() + "\r" + err.toString());
      }
    }
    function runFoolParent(settingJson2Obj) {
      function whatsup(p, w) {
        if (p.button == 2) {
          var pos = new Array();
          pos[0] = p.screenX;
          pos[1] = p.screenY;
        }
      }
      var binHr = __BLOB__BLOB_000075__;
      var binClose = __BLOB__BLOB_000076__;
      var binBtn01 = __BLOB__BLOB_000077__;
      var binBtn02 = __BLOB__BLOB_000078__;
      var binBtn03 = __BLOB__BLOB_000079__;
      var binBtn04 = __BLOB__BLOB_000080__;
      var binBtn05 = __BLOB__BLOB_000081__;
      var imgHr = createResourceFile("FoolParent_hr.png", binHr);
      var imgClose = createResourceFile("FoolParent_close.png", binClose);
      var imgBtn01 = createResourceFile("FoolParent_Btn01.png", binBtn01);
      var imgBtn02 = createResourceFile("FoolParent_Btn02.png", binBtn02);
      var imgBtn03 = createResourceFile("FoolParent_Btn03.png", binBtn03);
      var imgBtn04 = createResourceFile("FoolParent_Btn04.png", binBtn04);
      var imgBtn05 = createResourceFile("FoolParent_Btn05.png", binBtn05);
      var w = new Window("palette", "FoolParent", undefined, {
        borderless: false,
      });
      var winPos = settingJson2Obj.foolParent_curPos;
      if (winPos[0] === 0 && winPos[1] === 0) {
      } else {
        if (settingJson2Obj.rememberWinPos == true) {
          w.location = settingJson2Obj.foolParent_curPos;
        }
      }
      var btnGrp = w.add("group");
      var btnSize = [138, 22];
      btnGrp.button = btnGrp.add("iconbutton", undefined, imgBtn01, {
        style: "toolbutton",
      });
      btnGrp.button.helpTip = "Right click for more mode :)";
      btnGrp.btnParentChain = btnGrp.add("iconbutton", undefined, imgBtn02, {
        style: "toolbutton",
      });
      btnGrp.btnFirstP = btnGrp.add("iconbutton", undefined, imgBtn03, {
        style: "toolbutton",
      });
      btnGrp.btnLastP = btnGrp.add("iconbutton", undefined, imgBtn04, {
        style: "toolbutton",
      });
      btnGrp.btnUnparent = btnGrp.add("iconbutton", undefined, imgBtn05, {
        style: "toolbutton",
      });
      btnGrp.button.preferredSize = btnSize;
      btnGrp.btnParentChain.preferredSize = btnSize;
      btnGrp.btnFirstP.preferredSize = btnSize;
      btnGrp.btnLastP.preferredSize = btnSize;
      btnGrp.btnUnparent.preferredSize = btnSize;
      var infoGrp = w.add("group");
      infoGrp.nobreak = infoGrp.add(
        'statictext {text: "select Name ", characters: 10, justify: "center"}',
      );
      try {
        var myComp = app.project.activeItem;
        var seLayers = myComp.selectedLayers;
        var child = new Array();
        for (var i = 0; i < seLayers.length; i += 1) {
          child[i] = seLayers[i];
        }
        infoGrp.nobreak.text = "child nums : " + seLayers.length;
      } catch (err) {
        infoGrp.nobreak.text = "no layer selected";
        btnGrp.button.enabled = false;
        btnGrp.btnParentChain.enabled = false;
        btnGrp.btnFirstP.enabled = false;
        btnGrp.btnLastP.enabled = false;
        btnGrp.btnUnparent.enabled = false;
      }
      w.spacing = 5;
      w.margins = 5;
      btnGrp.spacing = 0;
      btnGrp.orientation = "column";
      btnGrp.alignChildren = ["fill", "fill"];
      infoGrp.alignChildren = ["fill", "fill"];
      btnGrp.button.onClick = function () {
        var keyState = ScriptUI.environment.keyboardState;
        if (keyState.shiftKey) {
          parent_n_MoveToParent(child);
        } else {
          setParent(child);
        }
        w.close();
      };
      btnGrp.btnParentChain.onClick = function () {
        parentChain();
        w.close();
      };
      btnGrp.btnFirstP.onClick = function () {
        firstLayerAsParent();
        w.close();
      };
      btnGrp.btnLastP.onClick = function () {
        lastLayerAsParent();
        w.close();
      };
      btnGrp.btnUnparent.onClick = function () {
        unParent();
        w.close();
      };
      btnGrp.button.addEventListener("mousedown", function (k) {
        whatsup(k, w);
      });
      w.onClose = function () {
        settingJson2Obj.foolParent_curPos = [w.location.x, w.location.y];
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      w.onShow;
      w.show();
      settingJson2Obj.foolParent_curPos = [w.location.x, w.location.y];
      createJsonFile("KEYboard_setting.json", settingJson2Obj);
    }
    function setParent(child) {
      app.beginUndoGroup("select");
      myComp = app.project.activeItem;
      Parent = myComp.selectedLayers[0];
      for (var i = 0; i < child.length; i += 1) {
        if (Parent.parent != null) {
          if (Parent.parent == child[i]) {
            continue;
          }
        }
        child[i].parent = Parent;
      }
      app.endUndoGroup();
    }
    function createMenu(pos, win) {
      function pressed(k) {}
      var w = new Window("palette", undefined, undefined, { borderless: true });
      w.location = pos;
      w.margins = 0;
      w.spacing = 0;
      w.alignChildren = ["fill", "fill"];
      var grp_chain = w.add("group");
      var grp_insertP = w.add("group");
      var grp_divid = w.add("group");
      var grp_pAbove = w.add("group");
      var grp_pBelow = w.add("group");
      var grp_divid3 = w.add("group");
      var grp_selP = w.add("group");
      var grp_selC = w.add("group");
      var grp_divid2 = w.add("group");
      var grp_esc = w.add("group");
      grp_chain.spacing =
        grp_selP.spacing =
        grp_selC.spacing =
        grp_esc.spacing =
        grp_divid.spacing =
        grp_divid2.spacing =
          0;
      grp_divid3.spacing = 0;
      grp_pAbove.spacing = 0;
      grp_pBelow.spacing = 0;
      grp_insertP.spacing = 0;
      grp_chain.alignChildren =
        grp_selP.alignChildren =
        grp_selC.alignChildren =
        grp_esc.alignChildren =
        grp_divid.alignChildren =
        grp_divid2.alignChildren =
          ["fill", "fill"];
      grp_divid3.alignChildren = ["fill", "fill"];
      grp_pAbove.alignChildren = ["fill", "fill"];
      grp_pBelow.alignChildren = ["fill", "fill"];
      grp_insertP.alignChildren = ["fill", "fill"];
      var btn_chain = grp_chain.add("button", undefined, "Parent Chain");
      var btn_insertP = grp_insertP.add("button", undefined, "Insert Parent");
      var btn_divide = grp_divid.add("button", undefined, "----------------");
      btn_divide.preferredSize.height = 5;
      btn_divide.enabled = false;
      var btn_pAbove = grp_pAbove.add("button", undefined, "Parent Above");
      var btn_pBelow = grp_pBelow.add("button", undefined, "Parent Below");
      btn_chain.preferredSize.height = 30;
      btn_chain.onClick = function () {
        parentChain();
        w.close();
        win.close();
      };
      btn_insertP.onClick = function () {
        insertParent();
        w.close();
        win.close();
      };
      btn_pAbove.onClick = function () {
        parentAbove();
        w.close();
        win.close();
      };
      btn_pBelow.onClick = function () {
        parentBelow();
        w.close();
        win.close();
      };
      w.addEventListener("blur", function () {
        w.hide();
      });
      w.onDeactivate = function () {
        w.hide();
      };
      w.addEventListener("keydown", function (event) {
        w.hide();
      });
      w.show();
    }
    function parentAbove() {
      app.beginUndoGroup("select");
      myComp = app.project.activeItem;
      seLayers = myComp.selectedLayers;
      for (var i = 0; i < seLayers.length; i += 1) {
        if (seLayers[i].index != 1) {
          seLayers[i].parent = myComp.layer(seLayers[i].index - 1);
        }
      }
      app.endUndoGroup();
    }
    function parentBelow() {
      app.beginUndoGroup("select");
      myComp = app.project.activeItem;
      seLayers = myComp.selectedLayers;
      for (var i = 0; i < seLayers.length; i += 1) {
        if (seLayers[i].index != myComp.layers.length) {
          seLayers[i].parent = myComp.layer(seLayers[i].index + 1);
        }
      }
      app.endUndoGroup();
    }
    function parentChain() {
      app.beginUndoGroup("select");
      myComp = app.project.activeItem;
      seLayers = myComp.selectedLayers;
      for (var i = 0; i < seLayers.length - 1; i += 1) {
        seLayers[i].parent = seLayers[i + 1];
      }
      app.endUndoGroup();
    }
    function insertParent() {
      app.beginUndoGroup("select");
      myComp = app.project.activeItem;
      seLayers = myComp.selectedLayers;
      for (var i = 0; i < seLayers.length; i += 1) {
        if (seLayers[i].parent !== null) {
          var N = myComp.layers.addNull();
          N.source.width = 50;
          N.source.height = 50;
          N.property("ADBE Transform Group")
            .property("ADBE Anchor Point")
            .setValue([25, 25]);
          var C = seLayers[i];
          var P = seLayers[i].parent;
          N.name = "Ctrl_" + C.name;
          N.moveBefore(C);
          N.guideLayer = true;
          C.parent = null;
          var C_curPos = seLayers[i]
            .property("ADBE Transform Group")
            .property("ADBE Position").value;
          N.property("ADBE Transform Group")
            .property("ADBE Position")
            .setValue(C_curPos);
          C.parent = N;
          N.parent = P;
        } else {
          var N = myComp.layers.addNull();
          N.source.width = 50;
          N.source.height = 50;
          N.property("ADBE Transform Group")
            .property("ADBE Anchor Point")
            .setValue([25, 25]);
          var C = seLayers[i];
          N.name = "Ctrl_" + C.name;
          N.moveBefore(C);
          N.guideLayer = true;
          var C_curPos = seLayers[i]
            .property("ADBE Transform Group")
            .property("ADBE Position").value;
          N.property("ADBE Transform Group")
            .property("ADBE Position")
            .setValue(C_curPos);
          C.parent = N;
        }
      }
      app.endUndoGroup();
    }
    function selParent() {
      app.beginUndoGroup("select");
      myComp = app.project.activeItem;
      var seLayers = myComp.selectedLayers;
      var parents = new Array();
      for (var i = 0; i < seLayers.length; i += 1) {
        if (seLayers[i].parent !== null) {
          parents.push(seLayers[i].parent);
        }
        seLayers[i].selected = false;
      }
      for (var j = 0; j < parents.length; j += 1) {
        parents[j].selected = true;
      }
      app.endUndoGroup();
    }
    function parent_n_MoveToParent(child) {
      app.beginUndoGroup("select");
      myComp = app.project.activeItem;
      Parent = myComp.selectedLayers[0];
      for (var i = 0; i < child.length; i += 1) {
        child[i].parent = null;
        if (Parent.parent !== null) {
          if (Parent.parent !== child[i]) {
            child[i].parent = Parent.parent;
          } else {
            break;
          }
        }
        var P_curPos = Parent.property("ADBE Transform Group").property(
          "ADBE Position",
        ).value;
        child[i]
          .property("ADBE Transform Group")
          .property("ADBE Position")
          .setValue(P_curPos);
        child[i].parent = Parent;
      }
      app.endUndoGroup();
    }
    function parentAbove() {
      app.beginUndoGroup("Parent Selected to Above");
      var thisComp = app.project.activeItem;
      for (var i = 0; i < thisComp.selectedLayers.length; i += 1) {
        curLayer = thisComp.selectedLayers[i];
        curLayer.parent = thisComp.layer(curLayer.index - 1);
      }
      app.endUndoGroup();
    }
    function unParent() {
      app.beginUndoGroup("unParent selected layers");
      var thisComp = app.project.activeItem;
      for (var i = 0; i < thisComp.selectedLayers.length; i += 1) {
        var curLayer = thisComp.selectedLayers[i];
        curLayer.parent = null;
      }
      app.endUndoGroup();
    }
    function firstLayerAsParent() {
      app.beginUndoGroup("Use first selected layer as parent");
      var thisComp = app.project.activeItem;
      var parent = thisComp.selectedLayers[0];
      for (var i = 1; i < thisComp.selectedLayers.length; i += 1) {
        var curLayer = thisComp.selectedLayers[i];
        curLayer.parent = parent;
      }
      app.endUndoGroup();
    }
    function lastLayerAsParent() {
      app.beginUndoGroup("Use last selected layer as parent");
      var thisComp = app.project.activeItem;
      var parent = thisComp.selectedLayers[thisComp.selectedLayers.length - 1];
      for (var i = 0; i < thisComp.selectedLayers.length - 1; i += 1) {
        var curLayer = thisComp.selectedLayers[i];
        curLayer.parent = parent;
      }
      app.endUndoGroup();
    }
    function runFoolPaste(settingJson2Obj) {
      function pressed(k) {
        if (k.keyName == "Escape") {
          w.close();
        }
      }
      function whatsup(p, w) {
        if (p.button == 2) {
          var pos = [];
          pos[0] = p.screenX;
          pos[1] = p.screenY;
        }
      }
      var lightGray = HexToRGB("#393939");
      var white = HexToRGB("#EEEEEE");
      var yellow = HexToRGB("#FFBC65");
      var red = HexToRGB("#AC4C5E");
      var purple = HexToRGB("#5C476F");
      var w = new Window("palette");
      w.graphics.backgroundColor = w.graphics.newBrush(
        w.graphics.BrushType.SOLID_COLOR,
        red,
      );
      w.margins = 0;
      w.margins.top = 5;
      var winPos = settingJson2Obj.foolPaste_curPos;
      if (winPos[0] === 0 && winPos[1] === 0) {
      } else {
        if (settingJson2Obj.rememberWinPos == true) {
          w.location = settingJson2Obj.foolPaste_curPos;
        }
      }
      var allGrp = w.add("group");
      allGrp.spacing = 10;
      allGrp.margins = 10;
      allGrp.orientation = "row";
      allGrp.graphics.backgroundColor = allGrp.graphics.newBrush(
        allGrp.graphics.BrushType.SOLID_COLOR,
        lightGray,
      );
      allGrp.infoTxt = allGrp.add(
        'statictext {text: "", characters: 8, justify: "center"}',
      );
      var btnGrp = allGrp.add("group");
      btnGrp.orientation = "column";
      btnGrp.spacing = 5;
      btnGrp.setBtnAbove = btnGrp.add("button", undefined, "paste above");
      btnGrp.setBtnBelow = btnGrp.add("button", undefined, "paste below");
      btnGrp.setBtnAbove.preferredSize[0] = 90;
      btnGrp.setBtnBelow.preferredSize[0] = 90;
      var myComp = app.project.activeItem;
      if (myComp !== null) {
        var seLayers = myComp.selectedLayers;
        allGrp.infoTxt.text = "nums : " + seLayers.length;
        var child = [];
        for (var i = 0; i < seLayers.length; i += 1) {
          child[i] = seLayers[i];
        }
      } else {
        alert("no active comp");
      }
      btnGrp.setBtnAbove.onClick = function () {
        var keyState = ScriptUI.environment.keyboardState;
        moveLayer(child, "above");
        w.close();
      };
      btnGrp.setBtnBelow.onClick = function () {
        var keyState = ScriptUI.environment.keyboardState;
        moveLayer(child, "below");
        w.close();
      };
      w.addEventListener("keydown", function (kd) {
        pressed(kd);
      });
      w.onClose = function () {
        settingJson2Obj.foolPaste_curPos = [w.location.x, w.location.y];
        createJsonFile("KEYboard_setting.json", settingJson2Obj);
      };
      w.show();
      settingJson2Obj.foolPaste_curPos = [w.location.x, w.location.y];
      createJsonFile("KEYboard_setting.json", settingJson2Obj);
    }
    function moveLayer(child, mode) {
      app.beginUndoGroup("move layer");
      var myComp = app.project.activeItem;
      var targetLayer = myComp.selectedLayers[0];
      child = child.sort(function (a, b) {
        return a.index > b.index ? 1 : -1;
      });
      if (mode == "above") {
        for (var i = 0; i < child.length; i += 1) {
          child[i].moveBefore(targetLayer);
        }
      } else {
        for (var j = child.length - 1; j >= 0; j--) {
          child[j].moveAfter(targetLayer);
        }
      }
      app.endUndoGroup();
    }
    function addPathKey(JsonSettingObj) {
      function createStrokeMenu() {
        var mainPalette = new Window("palette", undefined, undefined, {
          borderless: false,
        });
        mainPalette.margins = 0;
        mainPalette.spacing = 0;
        mainPalette.alignChildren = ["fill", "fill"];
        var grp_chain = mainPalette.add("group");
        grp_chain.spacing = 0;
        grp_chain.alignChildren = ["fill", "fill"];
        grp_chain.orientation = "column";
        var btnFillColor = grp_chain.add("button", undefined, "Fill Color");
        var btnStrokeColor = grp_chain.add("button", undefined, "Stroke Color");
        var divide = grp_chain.add("button", undefined, "---------------");
        divide.enabled = false;
        var btnTrimEnd = grp_chain.add("button", undefined, "Trim end");
        var divide2 = grp_chain.add("button", undefined, "---------------");
        divide2.enabled = false;
        var btnVectorPosition = grp_chain.add(
          "button",
          undefined,
          "Shape\'s position",
        );
        btnFillColor.preferredSize.height = 30;
        var divideHeight = 8;
        divide.preferredSize.height = divideHeight;
        divide2.preferredSize.height = divideHeight;
        btnFillColor.onClick = function () {
          AddKeyForProp("ADBE Vector Fill Color");
          mainPalette.hide();
        };
        btnStrokeColor.onClick = function () {
          AddKeyForProp("ADBE Vector Stroke Color");
          mainPalette.hide();
        };
        btnTrimEnd.onClick = function () {
          AddKeyForProp("ADBE Vector Trim End");
          mainPalette.hide();
        };
        btnVectorPosition.onClick = function () {
          AddKeyForProp("ADBE Vector Position");
          mainPalette.hide();
        };
        mainPalette.layout.layout(true);
        mainPalette.layout.resize();
        mainPalette.onResize = function () {
          alert("?");
          mainPalette.layout.resize();
        };
        mainPalette.show();
      }
      function AddKeyForProp(PropName) {
        function findSelGrp(seLayer) {
          var selectedProps = seLayer.selectedProperties;
          for (var x = 0; x < selectedProps.length; x += 1) {
            var prop = selectedProps[x];
            if (
              prop.propertyType === PropertyType.INDEXED_GROUP ||
              prop.propertyType === PropertyType.NAMED_GROUP
            ) {
              pathData.selGrp.push(prop);
            }
          }
        }
        function scanPropGroupProperties(propGroup) {
          for (var i = 1; i <= propGroup.numProperties; i += 1) {
            prop = propGroup.property(i);
            if (prop.propertyType === PropertyType.PROPERTY) {
              if (prop.matchName === PropName) {
                prop.setValueAtTime(curTime, prop.value);
              }
            } else {
              if (
                prop.propertyType === PropertyType.INDEXED_GROUP ||
                prop.propertyType === PropertyType.NAMED_GROUP
              ) {
                scanPropGroupProperties(prop);
              }
            }
          }
        }
        var myComp = app.project.activeItem;
        var seLayers = myComp.selectedLayers;
        var curTime = app.project.activeItem.time;
        for (var m = 0; m < seLayers.length; m += 1) {
          var pathData = {};
          pathData.selGrp = [];
          pathData.allPathProp = [];
          findSelGrp(seLayers[m]);
          if (pathData.selGrp.length === 0) {
            if (seLayers[m] instanceof ShapeLayer) {
              if (PropName == "ADBE Vector Shape") {
                scanPropGroupProperties(
                  seLayers[m].property("ADBE Root Vectors Group"),
                );
              }
            }
            if (PropName == "ADBE Mask Shape") {
              scanPropGroupProperties(seLayers[m].property("ADBE Mask Parade"));
            }
          } else {
            for (var k = 0; k < pathData.selGrp.length; k += 1) {
              scanPropGroupProperties(pathData.selGrp[k]);
            }
          }
        }
      }
      var keyState = ScriptUI.environment.keyboardState;
      if (keyState.ctrlKey) {
      } else {
        try {
          app.beginUndoGroup("Add key at current time");
          AddKeyForProp("ADBE Vector Shape");
          if (JsonSettingObj.prefs_AddMaskPathKey == true) {
            AddKeyForProp("ADBE Mask Shape");
          }
        } catch (err) {
          alert(err);
        } finally {
          app.endUndoGroup();
        }
      }
    }
    function reverseLayerOrder() {
      app.beginUndoGroup("reverse layer order");
      var myComp = app.project.activeItem;
      var seLayers = myComp.selectedLayers;
      var idx = [];
      for (var i = 0; i < seLayers.length; i += 1) {
        idx[i] = seLayers[i].index;
      }
      idx.sort(function (a, b) {
        return a - b;
      });
      for (var j = 0; j < Math.floor(idx.length / 2); j += 1) {
        var end = idx.length - 1;
        if (idx[j] !== idx[end - j]) {
          myComp.layer(idx[j]).moveAfter(myComp.layer(idx[end - j]));
        }
        if (idx[end - j] - 1 !== idx[j]) {
          myComp.layer(idx[end - j] - 1).moveBefore(myComp.layer(idx[j]));
        }
      }
      app.endUndoGroup();
    }
    function setLinearInter() {
      app.beginUndoGroup("Linear Spatial Interpolation");
      var myComp = app.project.activeItem;
      var seLayers = myComp.selectedLayers;
      for (var k = 0; k < seLayers.length; k += 1) {
        var selProps = seLayers[k].selectedProperties;
        for (var j = 0; j < selProps.length; j += 1) {
          if (
            selProps[j].propertyValueType == PropertyValueType.ThreeD_SPATIAL
          ) {
            if (selProps[j].numKeys !== 0) {
              var selKeys = selProps[j].selectedKeys;
              for (var i = 0; i < selKeys.length; i += 1) {
                selProps[j].setSpatialTangentsAtKey(
                  selKeys[i],
                  [0, 0, 0],
                  [0, 0, 0],
                );
              }
            }
          }
        }
      }
      app.endUndoGroup();
    }
    function createShape(shapeType) {
      app.beginUndoGroup("create shape");
      var myComp = app.project.activeItem;
      if (myComp !== null) {
        var shapeLayer = myComp.layers.addShape();
        switch (shapeType) {
          case "square":
            shapeLayer.name = "square";
            grp = shapeLayer
              .property("ADBE Root Vectors Group")
              .addProperty("ADBE Vector Group");
            shape = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Rect");
            shape.property("ADBE Vector Rect Size").selected = true;
            shape
              .property("ADBE Vector Rect Size")
              .setValue([myComp.width * 0.25, myComp.width * 0.25]);
            stroke = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Graphic - Stroke");
            break;
          case "ellipse":
            shapeLayer.name = "ellipse";
            grp = shapeLayer
              .property("ADBE Root Vectors Group")
              .addProperty("ADBE Vector Group");
            shape = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Ellipse");
            shape
              .property("ADBE Vector Ellipse Size")
              .setValue([myComp.width * 0.25, myComp.width * 0.25]);
            stroke = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Graphic - Stroke");
            break;
          case "hrLine":
            shapeLayer.name = "hr";
            myShape = new Shape();
            myShape.vertices = [
              [0, 0],
              [myComp.width * 0.5, 0],
            ];
            grp = shapeLayer
              .property("ADBE Root Vectors Group")
              .addProperty("ADBE Vector Group");
            path = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Group");
            path.property("ADBE Vector Shape").setValue(myShape);
            stroke = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Graphic - Stroke");
            break;
          case "vrLine":
            shapeLayer.name = "hr";
            myShape = new Shape();
            myShape.vertices = [
              [0, 0],
              [0, myComp.height * 0.5],
            ];
            grp = shapeLayer
              .property("ADBE Root Vectors Group")
              .addProperty("ADBE Vector Group");
            path = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Shape - Group");
            path.property("ADBE Vector Shape").setValue(myShape);
            stroke = grp
              .property("ADBE Vectors Group")
              .addProperty("ADBE Vector Graphic - Stroke");
            break;
        }
        stroke.property("ADBE Vector Stroke Color").setValue([0, 0, 0]);
        stroke.property("ADBE Vector Stroke Width").setValue(5);
        var trim = shapeLayer
          .property("ADBE Root Vectors Group")
          .addProperty("ADBE Vector Filter - Trim");
        trim.property("ADBE Vector Trim End").addKey(myComp.time);
      }
      app.endUndoGroup();
    }
    function selectLastLayer() {
      app.beginUndoGroup("Select Last Layer");
      var myComp = app.project.activeItem;
      var seLayers = myComp.selectedLayers;
      var allLayers = myComp.layers;
      for (var i = 0; i < seLayers.length; i += 1) {
        seLayers[i].selected = false;
      }
      myComp.layer(allLayers.length).selected = true;
      app.endUndoGroup();
    }
    function differenceMode() {
      function SetDiffer(seLayers, myComp) {
        seLayers.blendingMode =
          seLayers.blendingMode !== BlendingMode.DIFFERENCE
            ? BlendingMode.DIFFERENCE
            : BlendingMode.NORMAL;
      }
      app.beginUndoGroup("BlendingMode DIFFERENCE");
      var myComp = app.project.activeItem;
      var seLayers = myComp.selectedLayers;
      for (var i = 0; i < seLayers.length; i += 1) {
        SetDiffer(seLayers[i], myComp);
      }
      app.endUndoGroup();
    }
    function setInfluence(type, influ) {
      app.beginUndoGroup("Ease");
      var myComp = app.project.activeItem;
      var seLayers = myComp.selectedLayers;
      for (var k = 0; k < seLayers.length; k += 1) {
        var selProps = seLayers[k].selectedProperties;
        for (var j = 0; j < selProps.length; j += 1) {
          if (selProps[j].propertyType !== PropertyType.PROPERTY) {
            continue;
          }
          if (selProps[j].numKeys !== 0) {
            var chk = 0;
            if (selProps[j].propertyValueType == PropertyValueType.ThreeD) {
              chk = 3;
            } else if (
              selProps[j].propertyValueType == PropertyValueType.TwoD
            ) {
              chk = 2;
            } else {
              if (
                selProps[j].propertyValueType == PropertyValueType.OneD ||
                selProps[j].propertyValueType ==
                  PropertyValueType.TwoD_SPATIAL ||
                selProps[j].propertyValueType ==
                  PropertyValueType.ThreeD_SPATIAL ||
                selProps[j].propertyValueType == PropertyValueType.SHAPE ||
                selProps[j].propertyValueType == PropertyValueType.COLOR ||
                selProps[j].propertyValueType == PropertyValueType.CUSTOM_VALUE
              ) {
                chk = 1;
              }
            }
            var selKeys = selProps[j].selectedKeys;
            if (type == "inOut") {
              var ary = influ.split(",");
              for (var x = 0; x < ary.length; x += 1) {
                if (isNaN(ary[x])) {
                  ary[x] = 0.1;
                }
                if (ary[x] === "") {
                  ary[x] = 0.1;
                }
                if (ary[x] < 0.1) {
                  ary[x] = 0.1;
                }
                if (ary[x] > 100) {
                  ary[x] = 100;
                }
              }
              if (ary.length >= 1) {
                var easeI = new KeyframeEase(0, ary[0]);
                var easeO = new KeyframeEase(0, ary[1]);
              } else {
                var easeI = new KeyframeEase(0, ary[0]);
                var easeO = new KeyframeEase(0, ary[0]);
              }
              influ = 0.1;
              var ease = new KeyframeEase(0, influ);
            } else {
              if (isNaN(influ)) {
                influ = 0.1;
              }
              if (influ === "") {
                influ = 0.1;
              }
              var ease = new KeyframeEase(0, influ);
            }
            for (var i = 0; i < selKeys.length; i += 1) {
              var easeOut = selProps[j].keyOutTemporalEase(selKeys[i]);
              var easeIn = selProps[j].keyInTemporalEase(selKeys[i]);
              if (type == "in") {
                if (chk == 3) {
                  selProps[j].setTemporalEaseAtKey(
                    selKeys[i],
                    [ease, ease, ease],
                    easeOut,
                  );
                } else if (chk == 2) {
                  selProps[j].setTemporalEaseAtKey(
                    selKeys[i],
                    [ease, ease],
                    easeOut,
                  );
                } else {
                  if (chk == 1) {
                    selProps[j].setTemporalEaseAtKey(
                      selKeys[i],
                      [ease],
                      easeOut,
                    );
                  }
                }
              } else if (type == "out") {
                if (chk == 3) {
                  selProps[j].setTemporalEaseAtKey(selKeys[i], easeIn, [
                    ease,
                    ease,
                    ease,
                  ]);
                } else if (chk == 2) {
                  selProps[j].setTemporalEaseAtKey(selKeys[i], easeIn, [
                    ease,
                    ease,
                  ]);
                } else {
                  if (chk == 1) {
                    selProps[j].setTemporalEaseAtKey(selKeys[i], easeIn, [
                      ease,
                    ]);
                  }
                }
              } else {
                if (type == "inOut") {
                  if (chk == 3) {
                    selProps[j].setTemporalEaseAtKey(
                      selKeys[i],
                      [easeI, easeI, easeI],
                      [easeO, easeO, easeO],
                    );
                  } else if (chk == 2) {
                    selProps[j].setTemporalEaseAtKey(
                      selKeys[i],
                      [easeI, easeI],
                      [easeO, easeO],
                    );
                  } else {
                    if (chk == 1) {
                      selProps[j].setTemporalEaseAtKey(
                        selKeys[i],
                        [easeI],
                        [easeO],
                      );
                    }
                  }
                }
              }
            }
          }
        }
      }
      app.endUndoGroup();
    }
    function hexToR(h) {
      return parseInt(cutHex(h).substring(0, 2), 16);
    }
    function hexToG(h) {
      return parseInt(cutHex(h).substring(2, 4), 16);
    }
    function hexToB(h) {
      return parseInt(cutHex(h).substring(4, 6), 16);
    }
    function cutHex(h) {
      return h.charAt(0) == "#" ? h.substring(1, 7) : h;
    }
    function HexToRGB(hex) {
      var r = Math.floor((hexToR(hex) * 10) / 255) / 10;
      var g = Math.floor((hexToG(hex) * 10) / 255) / 10;
      var b = Math.floor((hexToB(hex) * 10) / 255) / 10;
      return [r, g, b, 1];
    }
    function runQuickVal(JsonSettingObj, mode, inputVal) {
      (function (thisObj) {
        mode = JsonSettingObj.quickVal_constrain || 0;
        inputVal = inputVal || JsonSettingObj.quickVal_preVal;
        var version = "1.0";
        var detect = function (k, control) {
          if (k.button == 2) {
            control.text = 10;
          }
        };
        var handle_keyQval = function (key, control, inputText, constarin) {
          constarin = constarin || 0;
          var orignalInput = inputText.text;
          var keyName = key.keyName;
          var input = { holdCtrl: 0, holdShift: 0, text: orignalInput, xyz: 0 };
          if (isNaN(input.text)) {
            input.text = input.text.substring(1, input.text.length);
          }
          if (key.shiftKey) {
            input.text *= 10;
            input.holdShift = 1;
          } else {
            input.holdShift = 0;
          }
          if (key.ctrlKey) {
            input.text *= 0.1;
            input.holdCtrl = 1;
          } else {
            input.holdCtrl = 0;
          }
          switch (key.keyName) {
            case "Up":
              input.text *= -1;
              input.xyz = 1;
              modifyValue(input, constarin);
              break;
            case "W":
              input.text *= -1;
              input.xyz = 1;
              modifyValue(input, constarin);
              break;
            case "Down":
              input.xyz = 1;
              modifyValue(input, constarin);
              break;
            case "S":
              input.xyz = 1;
              modifyValue(input, constarin);
              break;
            case "Left":
              input.text *= -1;
              input.xyz = 0;
              modifyValue(input, constarin);
              break;
            case "A":
              input.text *= -1;
              input.xyz = 0;
              modifyValue(input, constarin);
              break;
            case "Right":
              input.xyz = 0;
              modifyValue(input, constarin);
              break;
            case "D":
              input.xyz = 0;
              modifyValue(input, constarin);
              break;
            case "Q":
              input.text *= -1;
              input.xyz = 2;
              modifyValue(input, constarin);
              break;
            case "E":
              input.xyz = 2;
              modifyValue(input, constarin);
              break;
            case "C":
              constarin = !constarin;
              JsonSettingObj.quickVal_constrain = constarin;
              var settingJson = createJsonFile(
                "KEYboard_setting.json",
                JsonSettingObj,
              );
              mainPalette.close();
              runQuickVal(JsonSettingObj, constarin, inputText.text);
              break;
          }
          control.text = "";
        };
        var chkPropValueType = function (curProp) {
          var val = curProp.value;
          if (val !== undefined) {
            if (curProp.propertyValueType == PropertyValueType.OneD) {
              return 0;
            } else if (
              curProp.propertyValueType == PropertyValueType.TwoD_SPATIAL
            ) {
              return 1;
            } else if (curProp.propertyValueType == PropertyValueType.TwoD) {
              return 1;
            } else if (curProp.propertyValueType == PropertyValueType.ThreeD) {
              return 2;
            } else if (
              curProp.propertyValueType == PropertyValueType.ThreeD_SPATIAL
            ) {
              return 2;
            } else if (curProp.propertyValueType == PropertyValueType.SHAPE) {
              return 3;
            } else {
              return -1;
            }
          }
        };
        var modifyValue = function (input, constarin) {
          constarin = constarin || 0;
          var myComp = app.project.activeItem;
          var seLayers = myComp.selectedLayers;
          var inputArr = [];
          try {
            app.beginUndoGroup("QucikVal");
            for (var j = 0; j < seLayers.length; j += 1) {
              var selProps = seLayers[j].selectedProperties;
              for (var i = 0; i < selProps.length; i += 1) {
                var curProp = selProps[i];
                var val = selProps[i].value;
                var valType = chkPropValueType(curProp);
                var inputVal = parseFloat(input.text);
                if (isNaN(input.text)) {
                }
                if (val !== undefined) {
                  if (constarin === 0) {
                    switch (input.xyz.toString()) {
                      case "0":
                        if (valType === 0) {
                          result = plusValue(curProp, inputVal);
                        } else if (valType == 1) {
                          inputArr = [inputVal, 0];
                          result = plusValue(curProp, inputArr);
                        } else if (valType == 2) {
                          inputArr = [inputVal, 0, 0];
                          result = plusValue(curProp, inputArr);
                        } else {
                          if (valType == 3) {
                            inputArr = [inputVal, 0];
                          }
                        }
                        break;
                      case "1":
                        if (valType == 1) {
                          inputArr = [0, inputVal];
                          result = plusValue(curProp, inputArr);
                        } else if (valType == 2) {
                          inputArr = [0, inputVal, 0];
                          result = plusValue(curProp, inputArr);
                        } else {
                          if (valType == 3) {
                            inputArr = [0, inputVal];
                          }
                        }
                        break;
                      case "2":
                        if (valType == 2) {
                          inputArr = [0, 0, inputVal];
                          result = plusValue(curProp, inputArr);
                        }
                        break;
                      case "3":
                        break;
                    }
                  } else {
                    if (valType === 0) {
                      result = plusValue(curProp, inputVal);
                    } else if (valType == 1) {
                      inputArr = [inputVal, inputVal];
                      result = plusValue(curProp, inputArr);
                    } else {
                      if (valType == 2) {
                        inputArr = [inputVal, inputVal, inputVal];
                        result = plusValue(curProp, inputArr);
                      }
                    }
                  }
                }
              }
            }
          } catch (err) {
          } finally {
            app.endUndoGroup();
          }
        };
        var plusValue = function (curProp, inputVal) {
          var curVal = curProp.value;
          if (curProp.numKeys === 0) {
            if (curProp.hasMax) {
              if (curVal + parseFloat(inputVal) > curProp.maxValue) {
                curProp.setValue(curProp.maxValue);
              } else if (curVal + parseFloat(inputVal) < curProp.minValue) {
                curProp.setValue(curProp.minValue);
              } else {
                curProp.setValue(curVal + parseFloat(inputVal));
              }
            } else {
              curProp.setValue(curVal + inputVal);
            }
          } else {
            for (var a = 0; a < curProp.selectedKeys.length; a += 1) {
              if (curProp.hasMax) {
                if (curVal + parseFloat(inputVal) > curProp.maxValue) {
                  curProp.setValueAtKey(
                    curProp.selectedKeys[a],
                    curProp.maxValue,
                  );
                } else if (curVal + parseFloat(inputVal) < curProp.minValue) {
                  curProp.setValueAtKey(
                    curProp.selectedKeys[a],
                    curProp.minValue,
                  );
                } else {
                  curProp.setValueAtKey(
                    curProp.selectedKeys[a],
                    curProp.keyValue(curProp.selectedKeys[a]) + inputVal,
                  );
                }
              } else {
                curProp.setValueAtKey(
                  curProp.selectedKeys[a],
                  curProp.keyValue(curProp.selectedKeys[a]) + inputVal,
                );
              }
            }
          }
        };
        var binLock = __BLOB__BLOB_000082__;
        var binUnlock = __BLOB__BLOB_000083__;
        var imgLock = createResourceFile("KEYboard_Lock.png", binLock);
        var imgUnLock = createResourceFile("KEYboard_UnLock.png", binUnlock);
        var AEversion = app.version.substring(0, 4);
        mainPalette = new Window("palette", "quickVal", undefined, {
          borderless: false,
        });
        if (mainPalette === null) {
          return;
        }
        var winPos = JsonSettingObj.quickVal_curPos;
        if (winPos[0] === 0 && winPos[1] === 0) {
        } else {
          if (JsonSettingObj.rememberWinPos == true) {
            mainPalette.location = JsonSettingObj.quickVal_curPos;
          }
        }
        mainPalette.alignChildren = ["fill", "fill"];
        mainPalette.margins = 0;
        mainPalette.margins.top = 5;
        mainPalette.spacing = 2;
        var bgColor = HexToRGB("#AC4C5E");
        var lightGray = HexToRGB("#393939");
        mainPalette.graphics.backgroundColor = mainPalette.graphics.newBrush(
          mainPalette.graphics.BrushType.SOLID_COLOR,
          bgColor,
        );
        var content = mainPalette.add("group");
        content.graphics.backgroundColor = content.graphics.newBrush(
          content.graphics.BrushType.SOLID_COLOR,
          lightGray,
        );
        content.orientation = "row";
        content.margins = 10;
        content.spacing = 8;
        var info = content.add(
          'statictext {text: "QuickVal ", characters: 6, justify: "center"}',
        );
        var inputText = content.add(
          'edittext {text: "10", characters: 3, justify: "left"}',
        );
        var controlText = content.add(
          'edittext {text: "10", characters: 3, justify: "center"}',
        );
        inputText.text = inputVal;
        controlText.text = "";
        controlText.active = true;
        inputText.helpTip = "Modify Amount";
        controlText.helpTip = "Active and press down\rW,A,S,D or Arrow Key";
        if (mode === 0) {
          toggleBtn = content.add("iconbutton", undefined, imgUnLock, {
            style: "toolbutton",
          });
          toggleBtn.onClick = function () {
            JsonSettingObj.quickVal_constrain = 1;
            var settingJson = createJsonFile(
              "KEYboard_setting.json",
              JsonSettingObj,
            );
            mainPalette.close();
            runQuickVal(JsonSettingObj, 1, inputText.text);
          };
        } else {
          toggleBtn = content.add("iconbutton", undefined, imgLock, {
            style: "toolbutton",
          });
          toggleBtn.onClick = function () {
            JsonSettingObj.quickVal_constrain = 0;
            var settingJson = createJsonFile(
              "KEYboard_setting.json",
              JsonSettingObj,
            );
            mainPalette.close();
            runQuickVal(JsonSettingObj, 0, inputText.text);
          };
        }
        toggleBtn.preferredSize = [23, 23];
        toggleBtn.helpTip = "Constrain Proportions";
        $.sleep(250);
        inputText.addEventListener(
          "keyup",
          function (k) {
            JsonSettingObj.quickVal_preVal = inputText.text;
            var settingJson = createJsonFile(
              "KEYboard_setting.json",
              JsonSettingObj,
            );
          },
          false,
        );
        var triggerFlag = 0;
        var osName = $.os.substring(0, 3);
        info.text = 0;
        controlText.addEventListener(
          "keydown",
          function (k) {
            if (k.keyName == "Escape") {
              JsonSettingObj.escFlag = true;
              mainPalette.close();
              return;
            }
            if (osName == "Mac") {
              if (
                k.keyName == "Up" ||
                k.keyName == "Down" ||
                k.keyName == "Left" ||
                k.keyName == "Right"
              ) {
                triggerFlag++;
                if (triggerFlag == 2) {
                  handle_keyQval(k, this, inputText, mode);
                  triggerFlag = 0;
                  info.text = triggerFlag;
                }
              } else {
                handle_keyQval(k, this, inputText, mode);
              }
            } else {
              handle_keyQval(k, this, inputText, mode);
            }
            k.stopPropagation();
          },
          false,
        );
        mainPalette.layout.layout(true);
        if (!(mainPalette instanceof Panel)) {
          mainPalette.show();
        }
        JsonSettingObj.quickVal_curPos = [
          mainPalette.location.x,
          mainPalette.location.y,
        ];
        createJsonFile("KEYboard_setting.json", JsonSettingObj);
        mainPalette.addEventListener("blur", function () {});
        mainPalette.onDeactivate = function () {
          if (AEversion >= 12) {
            JsonSettingObj.quickVal_curPos = [
              mainPalette.location.x,
              mainPalette.location.y,
            ];
            createJsonFile("KEYboard_setting.json", JsonSettingObj);
            mainPalette.close();
          }
        };
        mainPalette.addEventListener("keydown", function (event) {}, false);
      })(this);
    }
    function add2Keys(valueA, valueB) {
      app.beginUndoGroup("AddPreset");
      var myComp = app.project.activeItem;
      var seLayers = myComp.selectedLayers;
      for (var x = 0; x < seLayers.length; x += 1) {
        for (var y = 0; y < seLayers[x].selectedProperties.length; y += 1) {
          if (
            seLayers[x].selectedProperties[y].propertyType ==
            PropertyType.NAMED_GROUP
          ) {
            continue;
          }
          var selProp = seLayers[x].selectedProperties[y];
          var valType = 0;
          if (selProp.propertyValueType == PropertyValueType.OneD) {
            setValA = valueA;
            setValB = valueB;
            valType = 1;
          } else if (
            selProp.propertyValueType == PropertyValueType.TwoD ||
            selProp.propertyValueType == PropertyValueType.TwoD_SPATIAL
          ) {
            setValA = [valueA, valueA];
            setValB = [valueB, valueB];
            valType = 2;
          } else {
            if (
              selProp.propertyValueType == PropertyValueType.ThreeD ||
              selProp.propertyValueType == PropertyValueType.ThreeD_SPATIAL
            ) {
              setValA = [valueA, valueA, valueA];
              setValB = [valueB, valueB, valueB];
              valType = 3;
            }
          }
          if (valType > 0) {
            var haveMaxfor1 = 0;
            if (valType == 1) {
              if (selProp.hasMax) {
                if (selProp.maxValue == 1) {
                  haveMaxfor1 = 1;
                }
              }
            }
            if (haveMaxfor1 == 1) {
              keyA = selProp.addKey(myComp.time);
              offsetTime = 10 * myComp.frameDuration;
              keyB = selProp.addKey(myComp.time + offsetTime);
              if (setValA > setValB) {
                selProp.setValueAtKey(keyA, 1);
                selProp.setValueAtKey(keyB, setValB);
              } else {
                selProp.setValueAtKey(keyA, setValA);
                selProp.setValueAtKey(keyB, 1);
              }
            } else {
              keyA = selProp.addKey(myComp.time);
              offsetTime = 10 * myComp.frameDuration;
              keyB = selProp.addKey(myComp.time + offsetTime);
              selProp.setValueAtKey(keyA, setValA);
              selProp.setValueAtKey(keyB, setValB);
            }
            selProp.setSelectedAtKey(keyA, true);
            selProp.setSelectedAtKey(keyB, true);
          }
        }
      }
      app.endUndoGroup();
    }
    function deleteSettingTag() {
      var sectionTag = "Ola_Keyboard";
      var keyTag1 = "shortcut";
      if (app.settings.haveSetting(sectionTag, keyTag1) === true) {
        app.preferences.deletePref("Settings_" + sectionTag, keyTag1);
      }
      app.preferences.saveToDisk();
    }
    function getNameOfShortcutsFile() {
      var prefsSuffix = ".txt";
      var osName = $.os.substring(0, 3);
      appVersion = app.version.substring(0, 4);
      if (osName !== "Mac") {
        folderPath =
          String(Folder.userData) + "/Adobe/After Effects/" + appVersion;
      } else {
        if (appVersion < 12) {
          prefsSuffix = "";
        }
        folderPath =
          String(Folder.userData.parent) +
          "/Preferences/Adobe/After Effects/" +
          appVersion;
      }
      folderPath = Folder(folderPath);
      if (folderPath.exists) {
        var files = folderPath.getFiles();
        for (var i = 0; i < files.length; i += 1) {
          var FilenameRegex =
            "^Adobe After Effects " +
            appVersion.replace(/\./g, "\\.") +
            " (Mac|Win) [^.]*" +
            prefsSuffix.replace(/\./, "\\.") +
            "$";
          if (files[i].displayName.match(new RegExp(FilenameRegex))) {
            return files[i];
            break;
          }
        }
      }
      return null;
    }
    function writePrefs(prefFile, AEFolder, trimSetting) {
      var textFile = prefFile;
      textFile.copy(textFile.fsName + ".bak");
      if (textFile !== null) {
        if (trimSetting.inIndex > trimSetting.outIndex) {
          var tmp = trimSetting.inIndex;
          trimSetting.inIndex = trimSetting.outIndex;
          trimSetting.outIndex = tmp;
        }
        var textLines = [];
        textFile.open("r", "TEXT", "????");
        var frontStr = [];
        var middleStr = [];
        var backStr = [];
        var findStr1 = 0;
        var findStr2 = 0;
        var chkStr1 = '\t"ExecuteScriptMenuItem' + trimSetting.inIndex + '" = ';
        var chkStr2 =
          '\t"ExecuteScriptMenuItem' + trimSetting.outIndex + '" = ';
        while (!textFile.eof) {
          var txt = textFile.readln();
          if (txt.match(chkStr1) !== null) {
            findStr1 = 1;
          }
          if (txt.match(chkStr2) !== null) {
            findStr2 = 1;
          }
          if (findStr1 === 0 && findStr2 === 0) {
            frontStr.push(txt);
          } else if (findStr1 == 1 && findStr2 == 1) {
            backStr.push(txt);
          } else {
            if (findStr1 == 1 || findStr2 == 1) {
              middleStr.push(txt);
            }
          }
        }
        textFile.close();
        textFile.open("w", "TEXT", "????");
        for (var i = 0; i < frontStr.length; i += 1) {
          textFile.writeln(frontStr[i]);
        }
        textFile.writeln(
          '\t"ExecuteScriptMenuItem' + trimSetting.inIndex + '" = "()"',
        );
        for (var j = 0; j < middleStr.length - 1; j += 1) {
          textFile.writeln(middleStr[j]);
        }
        textFile.writeln(
          '\t"ExecuteScriptMenuItem' + trimSetting.outIndex + '" = "()"',
        );
        for (var k = 1; k < backStr.length; k += 1) {
          textFile.writeln(backStr[k]);
        }
        textFile.close();
      }
    }
    function overwriteShortcut() {
      var AEversion = app.version.substring(0, 4);
      if (AEversion < 15) {
        var textFile = getNameOfShortcutsFile();
        modify_txt_delete(textFile);
      }
    }
    function modify_txt_delete(prefFile) {
      var myComp = app.project.activeItem;
      var osName = $.os.substring(0, 3);
      var AEversion = Number(app.version.substring(0, 4));
      var textFile = prefFile;
      var matchStr = "";
      var pathname = $.fileName;
      var leafname = pathname.split("\\").pop().split("/").pop();
      var itemIndex = Number(leafname.substring(1, 2));
      if (osName == "Mac") {
        if (AEversion >= 14 && AEversion <= 14.1) {
          matchStr = '\t"ExecuteScriptMenuItem0' + itemIndex + '" = ';
        } else {
          matchStr = '\t"ExecuteScriptMenuItem0' + itemIndex + 1 + '" = ';
        }
      } else {
        matchStr = '\t"ExecuteScriptMenuItem0' + itemIndex + '" = ';
      }
      textFile.copy(textFile.fsName + ".bak");
      if (textFile !== null) {
        var textLines = [];
        textFile.open("r", "TEXT", "????");
        var frontStr = [];
        var backStr = [];
        var chk = 0;
        while (!textFile.eof) {
          var txt = textFile.readln();
          if (chk === 0) {
            frontStr.push(txt);
          } else {
            backStr.push(txt);
          }
          if (txt.match(matchStr) !== null) {
            chk = 1;
          }
        }
        textFile.close();
        textFile.open("w", "TEXT", "????");
        for (var i = 0; i < frontStr.length - 1; i += 1) {
          textFile.writeln(frontStr[i]);
        }
        textFile.writeln(matchStr + '"()"');
        for (var j = 0; j < backStr.length; j += 1) {
          textFile.writeln(backStr[j]);
        }
        textFile.close();
      }
    }
    function applyExpression(btnObj) {
      var expressionStr = "";
      var modeSelection = chkMode(btnObj);
      var osName = $.os.substring(0, 3);
      if (modeSelection === 0) {
        app.beginUndoGroup("Apply Expression");
        var myComp = app.project.activeItem;
        var seLayers = myComp.selectedLayers;
        for (var j = 0; j < seLayers.length; j += 1) {
          selProps = seLayers[j].selectedProperties;
          for (var i = 0; i < selProps.length; i += 1) {
            var curProp = selProps[i];
            if (curProp.canSetExpression === true) {
              curProp.expression = btnObj.expStr;
            }
          }
        }
        app.endUndoGroup();
      } else if (modeSelection == 1) {
        var scriptStr = btnObj.expStr;
        eval(scriptStr);
      } else if (modeSelection == 2) {
        setInfluence("in", btnObj.expStr);
      } else if (modeSelection == 3) {
        setInfluence("out", btnObj.expStr);
      } else {
        if (modeSelection == 4) {
          setInfluence("inOut", btnObj.expStr);
        }
      }
    }
    function chkMode(btnObj) {
      var modeSrt = btnObj.mode;
      var modeSelection = 0;
      if (modeSrt == "expression") {
        modeSelection = 0;
      } else if (modeSrt == "JavaScript") {
        modeSelection = 1;
      } else if (modeSrt == "easeIn") {
        modeSelection = 2;
      } else if (modeSrt == "easeOut") {
        modeSelection = 3;
      } else {
        if (modeSrt == "easeInOut") {
          modeSelection = 4;
        }
      }
      return modeSelection;
    }
    function runNthKeys() {
      function pressed(k) {
        if (k.keyName == "Escape") {
          w.close();
        }
      }
      function whatsup(p, w) {
        if (p.button == 2) {
          var pos = [];
          pos[0] = p.screenX;
          pos[1] = p.screenY;
        }
      }
      function selectNthKey2(myComp, index, numLayers, mode) {
        var seLayers = myComp.selectedLayers;
        if (seLayers.length == numLayers) {
          for (var m = 0; m < seLayers.length; m += 1) {
            if (seLayers[m].selectedProperties.length) {
              for (
                var n = 0;
                n < seLayers[m].selectedProperties.length;
                n += 1
              ) {
                var selProps = seLayers[m].selectedProperties[n];
                var numKeys = selProps.numKeys;
                if (
                  selProps.propertyValueType !== PropertyValueType.CUSTOM_VALUE
                ) {
                  if (numKeys >= index && index > 0) {
                    if (mode == "select") {
                      selProps.setSelectedAtKey(index, true);
                    } else {
                      selProps.setSelectedAtKey(index, false);
                    }
                  }
                }
              }
            }
          }
          return true;
        } else {
          alert("layer nums different");
          return false;
        }
      }
      function deselectAllKey2(myComp, mode) {
        var seLayers = myComp.selectedLayers;
        for (var m = 0; m < seLayers.length; m += 1) {
          for (var n = 0; n < seLayers[m].selectedProperties.length; n += 1) {
            var selProps = seLayers[m].selectedProperties[n];
            var numKeys = selProps.numKeys;
            if (selProps.propertyValueType !== PropertyValueType.CUSTOM_VALUE) {
              if (numKeys > 0) {
                for (var i = 0; i < numKeys; i += 1) {
                  if (mode == "deselect") {
                    selProps.setSelectedAtKey(i + 1, false);
                  } else {
                    selProps.setSelectedAtKey(i + 1, true);
                  }
                }
              }
            }
          }
        }
      }
      function collectKeyTime(propertyInput) {
        if (propertyInput instanceof Property) {
          twoDs = PropertyValueType.TwoD_SPATIAL;
          threeDs = PropertyValueType.ThreeD_SPATIAL;
          keyIndexList = [];
          totalKeys = propertyInput.numKeys;
          selKeys = propertyInput.selectedKeys;
          if (
            propertyInput.propertyValueType !== PropertyValueType.CUSTOM_VALUE
          ) {
            if (selKeys.length > 0) {
              for (var i = 0; i < selKeys.length; i += 1) {
                keyIndexList[i] = {};
                keyIndexList[i].keyTime = propertyInput.keyTime(selKeys[i]);
                keyIndexList[i].index = selKeys[i];
              }
              return keyIndexList;
            } else {
              return null;
            }
          } else {
            return null;
          }
        }
      }
      var lightGray = HexToRGB("#393939");
      var white = HexToRGB("#EEEEEE");
      var yellow = HexToRGB("#FFBC65");
      var red = HexToRGB("#AC4C5E");
      var purple = HexToRGB("#5C476F");
      var w = new Window("palette");
      w.graphics.backgroundColor = w.graphics.newBrush(
        w.graphics.BrushType.SOLID_COLOR,
        yellow,
      );
      w.margins = 0;
      w.margins.top = 5;
      var allGrp = w.add("group");
      allGrp.spacing = 5;
      allGrp.margins = 10;
      allGrp.orientation = "row";
      allGrp.graphics.backgroundColor = allGrp.graphics.newBrush(
        allGrp.graphics.BrushType.SOLID_COLOR,
        lightGray,
      );
      allGrp.ctrlTxt = allGrp.add(
        'edittext {text: "", characters: 5, justify: "center"}',
      );
      allGrp.ctrlTxt.active = true;
      allGrp.buttonLeftAdd = allGrp.add("button", undefined, "<<");
      allGrp.buttonRightAdd = allGrp.add("button", undefined, ">>");
      allGrp.buttonRedo = allGrp.add("button", undefined, "R");
      allGrp.buttonAll = allGrp.add("button", undefined, "All");
      allGrp.buttonLeftAdd.preferredSize[0] = 40;
      allGrp.buttonRightAdd.preferredSize[0] = 40;
      allGrp.buttonRedo.preferredSize[0] = 25;
      allGrp.buttonAll.preferredSize[0] = 25;
      var myComp = app.project.activeItem;
      if (myComp !== null) {
        var seLayers = myComp.selectedLayers;
        var Time = myComp.time;
        var AllLayerKeyData = [];
        for (var i = 0; i < seLayers.length; i += 1) {
          var propsInALayer = [];
          for (var j = 0; j < seLayers[i].selectedProperties.length; j += 1) {
            selProps = seLayers[i].selectedProperties[j];
            propsInALayer.push(collectKeyTime(selProps));
          }
          AllLayerKeyData.push(propsInALayer);
        }
        var diff = 0;
        var smallestDiff = 1000000;
        for (var x = 0; x < AllLayerKeyData.length; x += 1) {
          for (var y = 0; y < AllLayerKeyData[x].length; y += 1) {
            if (
              AllLayerKeyData[x][y] === null ||
              AllLayerKeyData[x][y] === undefined
            ) {
              continue;
            }
            for (var z = 0; z < AllLayerKeyData[x][y].length; z += 1) {
              diff = Math.abs(Time - AllLayerKeyData[x][y][z].keyTime);
              if (diff <= smallestDiff) {
                smallestDiff = diff;
                closetKey = AllLayerKeyData[x][y][z];
              }
            }
          }
        }
        var curLeftIndex = closetKey.index;
        var curRightIndex = closetKey.index;
        var curIndex = closetKey.index;
        var numLayers = seLayers.length;
        var ctrlObj = {};
        ctrlObj.comp = myComp;
        ctrlObj.closetKey = closetKey.index;
        ctrlObj.curLeftIndex = closetKey.index;
        ctrlObj.curRightIndex = closetKey.index;
        deselectAllKey2(myComp, "deselect");
        selectNthKey2(myComp, closetKey.index, numLayers, "select");
      }
      allGrp.buttonLeftAdd.onClick = function () {
        var keyState = ScriptUI.environment.keyboardState;
        if (keyState.shiftKey) {
          curLeftIndex -= 1;
          chk = selectNthKey2(myComp, curLeftIndex, numLayers, "select");
        } else if (keyState.altKey) {
          chk = selectNthKey2(myComp, curLeftIndex, numLayers, "deselect");
          curLeftIndex += 1;
        } else {
          deselectAllKey2(myComp, "deselect");
          curLeftIndex -= 1;
          curRightIndex = curLeftIndex;
          chk = selectNthKey2(myComp, curLeftIndex, numLayers, "select");
        }
        if (chk === false) {
          w.close();
        }
      };
      allGrp.buttonRightAdd.onClick = function () {
        var keyState = ScriptUI.environment.keyboardState;
        if (keyState.shiftKey) {
          curRightIndex += 1;
          chk = selectNthKey2(myComp, curRightIndex, numLayers, "select");
        } else if (keyState.altKey) {
          chk = selectNthKey2(myComp, curRightIndex, numLayers, "deselect");
          curRightIndex -= 1;
        } else {
          deselectAllKey2(myComp, "deselect");
          curRightIndex += 1;
          curLeftIndex = curRightIndex;
          chk = selectNthKey2(myComp, curRightIndex, numLayers, "select");
        }
        if (chk === false) {
          w.close();
        }
      };
      allGrp.buttonRedo.onClick = function () {
        var keyState = ScriptUI.environment.keyboardState;
        if (keyState.shiftKey) {
        } else {
          deselectAllKey2(myComp, "deselect");
          var chk = selectNthKey2(myComp, closetKey.index, numLayers, "select");
          curIndex = curRightIndex = curLeftIndex = closetKey.index;
          if (chk === false) {
            w.close();
          }
        }
      };
      allGrp.buttonAll.onClick = function () {
        var keyState = ScriptUI.environment.keyboardState;
        if (keyState.shiftKey) {
        } else {
          deselectAllKey2(myComp, "select");
        }
      };
      var triggerFlag = 0;
      var osName = $.os.substring(0, 3);
      allGrp.ctrlTxt.addEventListener(
        "keyup",
        function (k) {
          triggerFlag++;
          if (osName == "Mac") {
            if (triggerFlag == 3) {
              triggerFlag = 0;
              handle_key_NthKeys(k, this, ctrlObj, numLayers);
            }
          } else {
            handle_key_NthKeys(k, this, ctrlObj, numLayers);
          }
        },
        false,
      );
      allGrp.buttonLeftAdd.addEventListener("mousedown", function (k) {
        whatsup(k, w);
      });
      w.addEventListener("keydown", function (kd) {
        pressed(kd);
      });
      var handle_key_NthKeys = function (key, control, ctrlObj, numLayers) {
        var keyName = key.keyName;
        if (key.shiftKey) {
        }
        if (key.ctrlKey) {
        }
        switch (key.keyName) {
          case "Left":
            if (key.shiftKey) {
              curLeftIndex -= 1;
              chk = selectNthKey2(myComp, curLeftIndex, numLayers, "select");
            } else if (key.altKey) {
              chk = selectNthKey2(myComp, curRightIndex, numLayers, "deselect");
              curRightIndex -= 1;
            } else {
              deselectAllKey2(myComp, "deselect");
              curLeftIndex -= 1;
              curRightIndex = curLeftIndex;
              chk = selectNthKey2(myComp, curLeftIndex, numLayers, "select");
            }
            break;
          case "A":
            if (key.shiftKey) {
              curLeftIndex -= 1;
              chk = selectNthKey2(myComp, curLeftIndex, numLayers, "select");
            } else if (key.altKey) {
              chk = selectNthKey2(myComp, curRightIndex, numLayers, "deselect");
              curRightIndex -= 1;
            } else {
              deselectAllKey2(myComp, "deselect");
              curLeftIndex -= 1;
              curRightIndex = curLeftIndex;
              chk = selectNthKey2(myComp, curLeftIndex, numLayers, "select");
            }
            break;
          case "Right":
            if (key.shiftKey) {
              curRightIndex += 1;
              chk = selectNthKey2(myComp, curRightIndex, numLayers, "select");
            } else if (key.altKey) {
              chk = selectNthKey2(myComp, curLeftIndex, numLayers, "deselect");
              curLeftIndex += 1;
            } else {
              deselectAllKey2(myComp, "deselect");
              curRightIndex += 1;
              curLeftIndex = curRightIndex;
              chk = selectNthKey2(myComp, curRightIndex, numLayers, "select");
            }
            break;
          case "D":
            if (key.shiftKey) {
              curRightIndex += 1;
              chk = selectNthKey2(myComp, curRightIndex, numLayers, "select");
            } else if (key.altKey) {
              chk = selectNthKey2(myComp, curLeftIndex, numLayers, "deselect");
              curLeftIndex += 1;
            } else {
              deselectAllKey2(myComp, "deselect");
              curRightIndex += 1;
              curLeftIndex = curRightIndex;
              chk = selectNthKey2(myComp, curRightIndex, numLayers, "select");
            }
            break;
          case "Up":
            deselectAllKey2(myComp, "select");
            break;
          case "W":
            deselectAllKey2(myComp, "select");
            break;
          case "Down":
            deselectAllKey2(myComp, "deselect");
            chk = selectNthKey2(myComp, closetKey.index, numLayers, "select");
            curIndex = curRightIndex = curLeftIndex = closetKey.index;
            break;
          case "S":
            deselectAllKey2(myComp, "deselect");
            chk = selectNthKey2(myComp, closetKey.index, numLayers, "select");
            curIndex = curRightIndex = curLeftIndex = closetKey.index;
            break;
        }
        control.text = "";
      };
      w.show();
    }
    function alignLayers() {
      app.beginUndoGroup("Align Layers");
      var myComp = app.project.activeItem;
      var selayers = myComp.selectedLayers;
      var startTimeArr = [];
      for (var i = 0; i < selayers.length; i += 1) {
        startTimeArr.push(selayers[i].inPoint);
      }
      startTimeArr.sort(function (a, b) {
        return a - b;
      });
      var minTime = startTimeArr[0];
      for (var j = 0; j < selayers.length; j += 1) {
        selayers[j].startTime = selayers[j].startTime - (minTime - myComp.time);
      }
      app.endUndoGroup();
    }
    var logTimeAry = [];
    var AEversion = app.version.substring(0, 4);
    if (typeof JSON !== "object") {
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
    }
    var registration = "";
    if (spell == true) {
      var isTrial = wow.t();
    } else {
      var isTrial = wow.t();
    }
    runScript(thisObj);
  }
  var af_settings = {
    betaExpirationDate: new Date("Dec 1, 2017"),
    betaStartDate: new Date("Nov 1, 2017"),
    betaSupportEmail: "http://aescripts.com/contact",
    helpButtons: [{ name: "Tutorial", url: "https://aescripts.com/keyboard/" }],
    helpText:
      "Controlling keyframes is animator\u2019s daily routine. \n\nKEYboard provides a series of function for keyframes in After Effects. Those functions are small but can be used frequently, such as setting keyframe Ease, cloning keys, mirroring keys, shifting keys or randomizing keys. The most important is you can do those through keyboard shortcuts.",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 6842456466681391,
    productSKU: "OYK-SUL",
    scriptAuthor: "Olaola Yuan",
    scriptName: "KEYboard",
    scriptURL: "https://aescripts.com/keyboard/",
    scriptVersion: "1.2.5",
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
    var wx = __BLOB__BLOB_000084__;
    var mx = __BLOB__BLOB_000085__;
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
  var spell = false;
  var spellName = "Motioner";
  if (spell == true) {
    var wow = new a(af_settings);
  } else {
    var wow = new a(af_settings);
  }
  wow.scriptVersion = "1.2.5";
  if (spell == true) {
    runKeyboard(thisObj);
  } else {
    if (wow.c()) {
      runKeyboard(thisObj);
    }
  }
}
KEYboard_allScript(this);
