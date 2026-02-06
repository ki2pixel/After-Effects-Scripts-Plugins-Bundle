/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function (thisObj) {
  function MainUI(thisObj) {
    this.startLineNum = $.line - 9;
    var paint = false;
    var win = aeq.ui.createMainWindow(
      thisObj,
      Config.name + " v" + Config.version,
    );
    this.win = win;
    if (paint) {
      Util.paintObj(this.win.obj, [0, 1, 0, 1]);
    }
    var grpTabs = this.win.addGroup({ alignment: "fill" });
    this.btnGrp = grpTabs;
    if (paint) {
      Util.paintObj(grpTabs.obj, [1, 0, 0, 1]);
    }
    var me = this;
    var btnTabLine = this.createIconButton(
      grpTabs,
      ButtonData.tabLine,
      function () {
        me.activeTab = "tabLine";
        btnTabGrid.image = btnTabGrid.imgDefault;
        btnTabCreator.image = btnTabCreator.imgDefault;
        tabLine.obj.visible = true;
        tabGrid.obj.visible = false;
        tabCreator.obj.visible = false;
      },
    );
    var btnTabGrid = this.createIconButton(
      grpTabs,
      ButtonData.tabGrid,
      function () {
        me.activeTab = "tabGrid";
        btnTabLine.image = btnTabLine.imgDefault;
        btnTabCreator.image = btnTabCreator.imgDefault;
        tabLine.obj.visible = false;
        tabGrid.obj.visible = true;
        tabCreator.obj.visible = false;
      },
    );
    var btnTabCreator = this.createIconButton(
      grpTabs,
      ButtonData.tabCreator,
      function () {
        me.activeTab = "tabCreator";
        btnTabLine.image = btnTabLine.imgDefault;
        btnTabGrid.image = btnTabGrid.imgDefault;
        tabLine.obj.visible = false;
        tabGrid.obj.visible = false;
        tabCreator.obj.visible = true;
      },
    );
    var grpOptionsButton = grpTabs.addGroup(Style.RightTop);
    this.createIconButton(
      grpOptionsButton,
      ButtonData.options,
      Util.bind(this.btnOptionsClick, this),
    );
    var grpContent = this.win.addGroup({
      alignment: "fill",
      orientation: "stack",
    });
    var tabLine = grpContent.addGroup(Style.FillTopCol);
    var pnlLineOptions = tabLine.addPanel();
    var grpLineMatteMode = pnlLineOptions.addGroup(Style.FillFillCol);
    var grpLineMatteModeLabel = grpLineMatteMode.addGroup(Style.RightRow);
    grpLineMatteModeLabel.addStaticText("Matte Mode");
    var ruleLineMatteModeLabel = grpLineMatteModeLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleLineMatteModeLabel.obj.minimumSize = [1, 0.5];
    var grpLineMatte = grpLineMatteMode.addGroup(Style.FillTopRightRow);
    var cbLineMatteMode = grpLineMatte.addCheckbox("Create Mattes");
    this.cbLineMatteMode = cbLineMatteMode;
    cbLineMatteMode.helpTip = [
      "Whether the line rig should matte layers,",
      "vs rigging selected layers directly",
    ].join("\n");
    var grpLineFlexMethod = pnlLineOptions.addGroup(Style.FillFillCol);
    var grpLineFlexMethodLabel = grpLineFlexMethod.addGroup(Style.RightRow);
    grpLineFlexMethodLabel.addStaticText("Flex Method");
    var ruleLineFlexMethodLabel = grpLineFlexMethodLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleLineFlexMethodLabel.obj.minimumSize = [1, 0.5];
    var grpLineFlexMode = grpLineFlexMethod.addGroup(Style.FillTopRightRow);
    var ddlLineFlexMode = grpLineFlexMode.addDropdownList(
      Util.objToValues(Constants.EFFECTS.FLEXMODES),
    );
    ddlLineFlexMode.minimumSize = [117, 0];
    ddlLineFlexMode.items[Config.defaults[PrefKey.LineFlexMode]].text += " (*)";
    this.ddlLineFlexMode = ddlLineFlexMode;
    ddlLineFlexMode.helpTip = [
      "Flex mode to create layers with",
      "(This can be changed later!)",
    ].join("\n");
    var grpLineDirection = pnlLineOptions.addGroup(Style.FillFillCol);
    var grpLineDirectionLabel = grpLineDirection.addGroup(Style.RightRow);
    grpLineDirectionLabel.addStaticText("Line Direction");
    var ruleLineDirectionLabel = grpLineDirectionLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleLineDirectionLabel.obj.minimumSize = [1, 0.5];
    var grpDirection = grpLineDirection.addGroup(Style.FillTopRightRow);
    var rbHorizontalMode = grpDirection.addRadioButton("Horizontal");
    this.rbHorizontalMode = rbHorizontalMode;
    var rbVerticalMode = grpDirection.addRadioButton("Vertical");
    this.rbVerticalMode = rbVerticalMode;
    this.rbVerticalMode.helpTip = this.rbHorizontalMode.helpTip = [
      "Line orientation (up/down or left/right)",
      "(This can be changed later!)",
    ].join("\n");
    var grpLineHelperButtons = pnlLineOptions.addGroup(Style.FillFillCol);
    var grpLineHelperButtonsLabel = grpLineHelperButtons.addGroup(
      Style.RightRow,
    );
    grpLineHelperButtonsLabel.addStaticText("Utilities");
    var ruleLineHelperButtonsLabel = grpLineHelperButtonsLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleLineHelperButtonsLabel.obj.minimumSize = [1, 0.5];
    var grpLineUtils = grpLineHelperButtons.addGroup(Style.FillTopRightRow);
    this.createIconButton(
      grpLineUtils,
      ButtonData.update,
      Util.bind(this.btnUpdateLineSizesClick, this),
    );
    var grpLineButtons = tabLine.addGroup();
    this.createIconButton(
      grpLineButtons,
      ButtonData.rigLine,
      Util.bind(this.btnCreateLineRigClick, this),
    );
    var grpLineUnrig = grpLineButtons.addGroup(Style.RightTop);
    this.createIconButton(
      grpLineUnrig,
      ButtonData.unrig,
      Util.bind(this.btnRemoveLineRigClick, this),
    );
    var tabGrid = grpContent.addGroup(Style.FillTopCol);
    tabGrid.obj.visible = false;
    var pnlGridOptions = tabGrid.addPanel();
    var grpGridMatteMode = pnlGridOptions.addGroup(Style.FillFillCol);
    var grpGridMatteModeLabel = grpGridMatteMode.addGroup(Style.RightRow);
    grpGridMatteModeLabel.addStaticText("Matte Mode");
    var ruleGridMatteModeLabel = grpGridMatteModeLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleGridMatteModeLabel.obj.minimumSize = [1, 0.5];
    var grpGridMatte = grpGridMatteMode.addGroup(Style.FillTopRightRow);
    var cbGridMatteMode = grpGridMatte.addCheckbox("Create Mattes");
    this.cbGridMatteMode = cbGridMatteMode;
    cbGridMatteMode.helpTip = [
      "Whether the grid rig should matte layers,",
      "vs rigging selected layers directly",
    ].join("\n");
    var grpGridFlexMethod = pnlGridOptions.addGroup(Style.FillFillCol);
    var grpGridFlexMethodLabel = grpGridFlexMethod.addGroup(Style.RightRow);
    grpGridFlexMethodLabel.addStaticText("Flex Method");
    var ruleGridFlexMethodLabel = grpGridFlexMethodLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleGridFlexMethodLabel.obj.minimumSize = [1, 0.5];
    var grpGridFlexMode = grpGridFlexMethod.addGroup(Style.FillTopRightRow);
    var ddlGridFlexMode = grpGridFlexMode.addDropdownList(
      Util.objToValues(Constants.EFFECTS.FLEXMODES),
    );
    ddlGridFlexMode.minimumSize = [117, 0];
    ddlGridFlexMode.items[Config.defaults[PrefKey.GridFlexMode]].text += " (*)";
    this.ddlGridFlexMode = ddlGridFlexMode;
    ddlGridFlexMode.helpTip = [
      "Flex mode to create layers with",
      "(This can be changed later!)",
    ].join("\n");
    var grpGridHelperButtons = pnlGridOptions.addGroup(Style.FillFillCol);
    var grpGridHelperButtonsLabel = grpGridHelperButtons.addGroup(
      Style.RightRow,
    );
    grpGridHelperButtonsLabel.addStaticText("Utilities");
    var ruleGridHelperButtonsLabel = grpGridHelperButtonsLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleGridHelperButtonsLabel.obj.minimumSize = [1, 0.5];
    var grpGridUtils = grpGridHelperButtons.addGroup(Style.FillTopRightRow);
    this.createIconButton(
      grpGridUtils,
      ButtonData.addGridControls,
      Util.bind(this.btnAddGridControlsClick, this),
    );
    this.createIconButton(
      grpGridUtils,
      ButtonData.createRow,
      Util.bind(this.btnCreateRowRulerClick, this),
    );
    this.createIconButton(
      grpGridUtils,
      ButtonData.createColumn,
      Util.bind(this.btnCreateColumnRulerClick, this),
    );
    var grpGridButtons = tabGrid.addGroup();
    this.createIconButton(
      grpGridButtons,
      ButtonData.rigRow,
      Util.bind(this.btnCreateRowClick, this),
    );
    this.createIconButton(
      grpGridButtons,
      ButtonData.rigColumn,
      Util.bind(this.btnCreateColumnClick, this),
    );
    var grpGridUnrig = grpGridButtons.addGroup(Style.RightTop);
    this.createIconButton(
      grpGridUnrig,
      ButtonData.unrig,
      Util.bind(this.btnRemoveGridRigClick, this),
    );
    var tabCreator = grpContent.addGroup(Style.FillTopCol);
    tabCreator.obj.visible = false;
    var pnlCreatorOptions = tabCreator.addPanel();
    var grpShapes = pnlCreatorOptions.addGroup(Style.FillFillCol);
    var grpShapeCreatorLabel = grpShapes.addGroup(Style.RightRow);
    grpShapeCreatorLabel.addStaticText("Shapes");
    var ruleShapeCreatorLabel = grpShapeCreatorLabel.addPanel(
      Style.FillCenterRow,
    );
    ruleShapeCreatorLabel.obj.minimumSize = [1, 0.5];
    var grpCreateShapes = grpShapes.addGroup(Style.FillTopRightRow);
    var btnCreateSquare = this.createIconButton(
      grpCreateShapes,
      ButtonData.createSquare,
      Util.bind(this.btnCreateSquareClick, this),
    );
    btnCreateSquare.helpTip = [
      "Create a new Square layer.",
      "Hold SHIFT to create at default size.",
    ].join("\n");
    var btnCreateCircle = this.createIconButton(
      grpCreateShapes,
      ButtonData.createCircle,
      Util.bind(this.btnCreateCircleClick, this),
    );
    btnCreateCircle.helpTip = [
      "Create a new Circle layer.",
      "Hold SHIFT to create at default size.",
    ].join("\n");
    var btnCreatePoly = this.createIconButton(
      grpCreateShapes,
      ButtonData.createPoly,
      Util.bind(this.btnCreatePolyClick, this),
    );
    btnCreatePoly.helpTip = [
      "Create a new Poly layer.",
      "Hold SHIFT to create at default size.",
    ].join("\n");
    var btnCreateStar = this.createIconButton(
      grpCreateShapes,
      ButtonData.createStar,
      Util.bind(this.btnCreateStarClick, this),
    );
    btnCreateStar.helpTip = [
      "Create a new Star layer.",
      "Hold SHIFT to create at default size.",
    ].join("\n");
    var grpEtc = pnlCreatorOptions.addGroup(Style.FillFillCol);
    var grpEtcCreatorLabel = grpEtc.addGroup(Style.RightRow);
    grpEtcCreatorLabel.addStaticText("Other");
    var ruleEtcCreatorLabel = grpEtcCreatorLabel.addPanel(Style.FillCenterRow);
    ruleEtcCreatorLabel.obj.minimumSize = [1, 0.5];
    var grpCreateEtc = grpEtc.addGroup(Style.FillTopRightRow);
    this.createIconButton(
      grpCreateEtc,
      ButtonData.createText,
      Util.bind(this.btnCreateTextClick, this),
    );
    this.createIconButton(
      grpCreateEtc,
      ButtonData.createPrecomp,
      Util.bind(this.btnCreateCompClick, this),
    );
    var grpStrokes = pnlCreatorOptions.addGroup(Style.FillFillCol);
    this.grpStrokes = grpStrokes;
    var grpSetStrokeLabel = grpStrokes.addGroup(Style.RightRow);
    grpSetStrokeLabel.addStaticText("Strokes");
    var ruleSetStrokeLabel = grpSetStrokeLabel.addPanel(Style.FillCenterRow);
    ruleSetStrokeLabel.obj.minimumSize = [1, 0.5];
    var grpSetStrokes = grpStrokes.addGroup(Style.FillTopRightRow);
    this.btnStrokeNormal = this.createIconButton(
      grpSetStrokes,
      ButtonData.strokeNormal,
      Util.bind(this.btnStrokeNormalClick, this),
    );
    this.btnStrokeInner = this.createIconButton(
      grpSetStrokes,
      ButtonData.strokeInner,
      Util.bind(this.btnStrokeInnerClick, this),
    );
    this.btnStrokeOuter = this.createIconButton(
      grpSetStrokes,
      ButtonData.strokeOuter,
      Util.bind(this.btnStrokeOuterClick, this),
    );
    this.init();
  }
  function OptionsUI() {
    this.startLineNum = $.line - 5;
    var win = aeq.ui.createDialog(
      Config.name + " v" + Config.version + ": Options",
    );
    this.win = win;
    var tpnl = win.addTabbedPanel();
    tpnl.set(Style.FillFillRow);
    var tabBehaviour = tpnl.addTab("Behaviour");
    tabBehaviour.addStaticText("Change the way Flex works.");
    var grpBehaviour = tabBehaviour.addGroup(Style.OptionsTab);
    var cbChooseShapeSizes = grpBehaviour.addCheckbox(
      "Creator: Choose Shape Sizes?",
    );
    this.cbChooseShapeSizes = cbChooseShapeSizes;
    cbChooseShapeSizes.helpTip =
      "Whether to specify sizes for Creator Shapes (ON) or use defaults (OFF).";
    var cbUseLegacyExpressions = grpBehaviour.addCheckbox(
      "Use Legacy Expressions?",
    );
    this.cbUseLegacyExpressions = cbUseLegacyExpressions;
    cbUseLegacyExpressions.helpTip =
      "Whether to use legacy (Extendscript) expressions vs modern (Javascript).";
    if (aeq.app.version < 16) {
      this.cbUseLegacyExpressions.enabled = false;
      cbUseLegacyExpressions.helpTip =
        "(You\'re using an old version of AE; legacy expressions are mandatory.)";
    }
    this.tabDebug = tpnl.addTab("DEBUG");
    this.tabDebug.obj.visible = false;
    this.tabDebug.obj.enabled = false;
    this.tabDebug.obj.text = "";
    this.tabDebug.addStaticText("Why are you even here?");
    var grpDebug = this.tabDebug.addGroup(Style.OptionsTab);
    this.cbUserDebug = grpDebug.addCheckbox("User Debug Mode");
    this.cbUserDebug.helpTip =
      "Note: This will slow down the tool considerably.";
    grpDebug.addButton("Reset Prefs", Util.bind(this.btnResetPrefsClick, this));
    grpDebug.addButton(
      "Reveal Log File",
      Util.bind(this.btnRevealLogClick, this),
    );
    win.addStaticText(Config.reg.getRegistration());
    var grpMeta = win.addGroup(Style.FillTopRow);
    grpMeta.addButton("OK", Util.bind(this.save, this));
    grpMeta.addButton("Cancel", Util.bind(this.close, this));
    grpMeta.addButton("Help", Util.bind(this.launchHelp, this));
    this.init();
  }
  function ShapeSizeUI(itemType) {
    this.startLineNum = $.line - 9;
    this.itemType = itemType;
    var win = aeq.ui.createDialog(
      Config.name +
        " v" +
        Config.version +
        ": " +
        Util.capitalize(itemType) +
        " Size",
    );
    this.win = win;
    var pnl = win.addPanel(Style.FillFillCol);
    pnl.addStaticText("Enter Shape Size:");
    var grpInputs = pnl.addGroup(Style.FillFillRow);
    var grpLabels = grpInputs.addGroup(Style.FillFillCol);
    this.stXLabel = grpLabels.addStaticText("");
    this.stYLabel = grpLabels.addStaticText("");
    var grpFields = grpInputs.addGroup(Style.FillFillCol);
    this.etXInput = grpFields.addEditText("");
    this.etYInput = grpFields.addEditText("");
    var grpMeta = win.addGroup(Style.FillTopRow);
    grpMeta.addButton("OK", Util.bind(this.save, this));
    grpMeta.addButton("Cancel", Util.bind(this.close, this));
    this.init(itemType);
    this.show();
  }
  function centerLayerAnchor(targetLayer) {
    function setPropValue(curProp, value) {
      if (curProp.numKeys < 1) {
        curProp.setValue(value);
      } else {
        curProp.setValueAtTime(comp.time, value);
      }
    }
    var comp = targetLayer.containingComp;
    Log.trace(
      "--> centerLayerAnchor: " + targetLayer.name + " in comp " + comp.name,
    );
    if (!Core.isValidLayer(targetLayer)) {
      Log.trace(
        "<-- centerLayerAnchor: \'" + targetLayer.name + "\' is invalid!",
      );
      return;
    }
    var sourceRect = targetLayer.sourceRectAtTime(comp.time, false);
    if (sourceRect.width === 0) {
      sourceRect.width = 0.1;
    }
    if (sourceRect.height === 0) {
      sourceRect.height = 0.1;
    }
    var newAnch = [sourceRect.width / 2, sourceRect.height / 2, 0];
    var oldAnch = targetLayer.anchorPoint.value;
    var anchProp = targetLayer.anchorPoint;
    var xAdjust = newAnch[0] + sourceRect.left;
    var yAdjust = newAnch[1] + sourceRect.top;
    var zAdjust = 0;
    setPropValue(anchProp, [xAdjust, yAdjust, 0]);
    var xShift = (xAdjust - oldAnch[0]) * (targetLayer.scale.value[0] / 100);
    var yShift = (yAdjust - oldAnch[1]) * (targetLayer.scale.value[1] / 100);
    var zShift = (zAdjust - oldAnch[2]) * (targetLayer.scale.value[2] / 100);
    var positionShift = [xShift, yShift, zShift];
    var posProp = targetLayer.position;
    var xPos = posProp.value[0];
    var yPos = posProp.value[1];
    var zPos = posProp.value[2];
    var splitPropX = targetLayer.property("ADBE Transform Group")(
      "ADBE Position_0",
    );
    var splitPropY = targetLayer.property("ADBE Transform Group")(
      "ADBE Position_1",
    );
    var splitPropZ = targetLayer.property("ADBE Transform Group")(
      "ADBE Position_2",
    );
    if (
      !(
        aeq.isProperty(splitPropX) &&
        aeq.isProperty(splitPropY) &&
        aeq.isProperty(splitPropZ)
      )
    ) {
      return;
    }
    if (posProp.dimensionsSeparated === true) {
      xPos = splitPropX.value;
      yPos = splitPropY.value;
      zPos = splitPropZ.value;
    }
    var offsetAngle =
      Math.atan2(positionShift[1], positionShift[0]) * (180 / Math.PI);
    var baseAngleProp = targetLayer.property("ADBE Transform Group")(
      "ADBE Rotate Z",
    );
    if (!aeq.isProperty(baseAngleProp)) {
      return;
    }
    var baseAngle = baseAngleProp.value;
    var targetAngle = ((baseAngle + offsetAngle) * Math.PI) / 180;
    var circleRadius = Math.sqrt(
      Math.pow(positionShift[0], 2) + Math.pow(positionShift[1], 2),
    );
    var newX = xPos + circleRadius * Math.cos(targetAngle);
    var newY = yPos + circleRadius * Math.sin(targetAngle);
    var newZ = zPos + positionShift[2];
    if (posProp.dimensionsSeparated === true) {
      setPropValue(splitPropX, newX);
      setPropValue(splitPropY, newY);
      if (targetLayer.threeDLayer) {
        setPropValue(splitPropZ, newZ);
      }
    } else {
      setPropValue(posProp, [newX, newY, newZ]);
    }
    Log.trace("<-- centerLayerAnchor");
  }
  function getInitialSize(layer) {
    function _findLargestStrokeWidth(layer) {
      Log.trace("--> _findLargestStrokeWidth: \'" + layer.name + "\'");
      var largestWidth = 0;
      var propGroups = aeq.getProperties([layer], {
        groups: true,
        props: false,
        separate: false,
      });
      var enabledStrokeGroups = propGroups.filter(function (propGroup) {
        return (
          propGroup.enabled &&
          propGroup.matchName.indexOf("ADBE Vector Graphic - Stroke") > -1
        );
      });
      enabledStrokeGroups.forEach(function (strokeGroup) {
        var strokeWidth = strokeGroup.property("ADBE Vector Stroke Width");
        largestWidth = Math.max(
          largestWidth,
          strokeWidth.valueAtTime(layer.containingComp.time, false),
        );
      });
      Log.trace("<-- _findLargestStrokeWidth: = " + largestWidth);
      return largestWidth;
    }
    function _findScaleOffset(layer) {
      Log.trace("--> _findScaleOffset: \'" + layer.name + "\'");
      var effects = layer.property("ADBE Effect Parade");
      if (!aeq.isPropertyGroup(effects)) {
        return;
      }
      var scaleOffsetEffect = effects.addProperty("ADBE Slider Control");
      scaleOffsetEffect.name = "Scale Offset Calculator";
      var sliderProperty = scaleOffsetEffect.property(
        "ADBE Slider Control-0001",
      );
      if (!aeq.isProperty(sliderProperty)) {
        return;
      }
      sliderProperty.expression = Core.getExpression("scaleOffset");
      var pointOffset = sliderProperty.valueAtTime(
        layer.containingComp.time,
        false,
      );
      scaleOffsetEffect.remove();
      if (pointOffset === 0) {
        pointOffset = 1;
      }
      Log.trace(
        "<-- _findScaleOffset: layer \'" +
          layer.name +
          "\' = " +
          pointOffset.toString(),
      );
      return Math.abs(pointOffset);
    }
    Log.trace("--> getInitialSize: \'" + layer.name + "\'");
    var scaleOffset = _findScaleOffset(layer);
    var effects = layer.property("ADBE Effect Parade");
    if (!aeq.isPropertyGroup(effects)) {
      return;
    }
    var pointControl = effects.addProperty("ADBE Point Control");
    pointControl.name = "Coordinate Calculator";
    var pointProp = pointControl.property("ADBE Point Control-0001");
    if (!aeq.isProperty(pointProp)) {
      return;
    }
    pointProp.expression = Core.getExpression("coordinates", scaleOffset);
    var value = pointProp.valueAtTime(layer.containingComp.time, false);
    if (aeq.isShapeLayer(layer)) {
      var strokeWidth = _findLargestStrokeWidth(layer);
      value += [strokeWidth, strokeWidth];
    }
    pointControl.remove();
    Log.trace("<-- getInitialSize: " + JSON.stringify(value));
    return value;
  }
  function addGridControls() {
    function _addLayersToGrid(layers) {
      Log.trace("--> _addLayersToGrid");
      var newRigLayers = aeq.arrayEx();
      layers.forEach(function (layer) {
        if (
          Core.findLayerEffect(layer, Constants.EFFECTS.GRIDLAYER.EffectName)
        ) {
          Log.warning(
            "Layer \'" + layer.name + "\' is already grid-rigged; skipping.",
          );
          return;
        }
        var flexEffect = Core.getOrCreatePseudoeffect(
          layer,
          Pseudoeffects.GridLayer,
        );
        var ddlLayerWeightProp = flexEffect.property(
          Constants.EFFECTS.SHARED.LayerFlexModeName,
        );
        if (!aeq.isProperty(ddlLayerWeightProp)) {
          return;
        }
        ddlLayerWeightProp.setValue(Prefs.getAsInt(PrefKey.GridFlexMode) + 1);
        var ptScaleOffset = flexEffect.property(
          Constants.EFFECTS.SHARED.LayerScaleOffsetName,
        );
        if (!aeq.isProperty(ptScaleOffset)) {
          return;
        }
        ptScaleOffset.expression = Core.getExpression("layerScaleOffset");
        newRigLayers.push(layer);
        centerLayerAnchor(layer);
      });
      if (newRigLayers.length === 0) {
        Log.trace("<-- _addLayersToGrid: No valid layers");
        return;
      }
      newRigLayers.forEach(function (layer) {
        Core.getOrCreateBoundSelectors(layer, "row");
      });
      Log.trace("<-- _addLayersToGrid");
    }
    var startLineNum = $.line - 2;
    Log.trace("--> addGridControls");
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- createGridRig: No comp");
      return;
    }
    var layers = aeq.getSelectedLayers().filter(Core.isValidLayer);
    if (layers.length < 1) {
      throw Util.buildError(
        "Select at least 1 layers!",
        "addGridControls.js",
        $.line - startLineNum,
      );
    }
    Core.checkExpressionEngine();
    var filteredLayers = layers.filter(function (layer) {
      return !Core.isGridRuler(layer);
    });
    Core.getOrCreateGridController(comp);
    _addLayersToGrid(filteredLayers);
    filteredLayers.forEach(function (layer) {
      layer.transform.position.expression = Core.getExpression("gridPosition");
      layer.transform.scale.expression = Core.getExpression("gridScale");
    });
    Log.trace("<-- addGridControls");
  }
  function createGridRig(mode) {
    function _getOrCreateLayerBoundRulers(comp, direction, bounds) {
      Log.trace(
        "--> _getOrCreateLayerBoundRulers: Comp \'" +
          comp.name +
          "\', Direction: " +
          direction +
          "\'",
      );
      var prefix = direction === "row" ? "ROW" : "COL";
      var boundProp =
        direction === "row" ? "ADBE Position_1" : "ADBE Position_0";
      var nearestPriorDelta = Number.POSITIVE_INFINITY;
      var nearestNextDelta = Number.POSITIVE_INFINITY;
      var rulers = aeq.getLayers(comp).filter(function (layer) {
        return aeq.isShapeLayer(layer) && layer.name.indexOf(prefix) > -1;
      });
      Log.trace(
        "_getOrCreateLayerBoundRulers: Found " +
          rulers.length.toString() +
          " rulers",
      );
      var count = Math.max(1, rulers.length);
      if (!ignoreSmartSnap) {
        rulers.forEach(function (layer) {
          var rulerPosition = LST.toComp(layer);
          var rulerPositionProp = rulerPosition[direction === "row" ? 1 : 0];
          var layerPriorDelta = Math.abs(rulerPositionProp - bounds[0]);
          if (layerPriorDelta < nearestPriorDelta) {
            nearestPriorDelta = layerPriorDelta;
            nearestPriorLayer = layer;
          }
          var layerNextDelta = Math.abs(rulerPositionProp - bounds[1]);
          if (layerNextDelta < nearestNextDelta) {
            nearestNextDelta = layerNextDelta;
            nearestNextLayer = layer;
          }
        });
        if (nearestPriorLayer && nearestNextLayer) {
          Log.trace("_getOrCreateLayerBoundRulers: Some rulers exist!");
          if (nearestPriorLayer.index === nearestNextLayer.index) {
            Log.trace(
              "_getOrCreateLayerBoundRulers: Nearest rulers are on one side",
            );
            count++;
            if (nearestPriorDelta <= nearestNextDelta) {
              Log.trace("_getOrCreateLayerBoundRulers: Nearest ruler is PRIOR");
              priorRulerLayer = nearestPriorLayer;
            } else {
              Log.trace("_getOrCreateLayerBoundRulers: Nearest ruler is NEXT");
              nextRulerLayer = nearestNextLayer;
            }
          } else {
            Log.trace(
              "_getOrCreateLayerBoundRulers: Left and right exist\u2013 use those!",
            );
            priorRulerLayer = nearestPriorLayer;
            nextRulerLayer = nearestNextLayer;
          }
        }
      } else {
        if (count > 1) {
          count++;
        }
      }
      var controllerNull = Core.getOrCreateGridController(comp);
      if (!priorRulerLayer) {
        Log.trace(
          "_getOrCreateLayerBoundRulers: Creating new prior \'" +
            direction.toString() +
            "\' ruler",
        );
        priorRulerLayer = Core.createComponentRuler(comp, direction);
        priorRulerLayer.name = prefix + " " + count;
        count++;
        var priorRulerProp = priorRulerLayer.transform.property(boundProp);
        if (!aeq.isProperty(priorRulerProp)) {
          return;
        }
        priorRulerProp.setValue(bounds[0]);
        priorRulerLayer.parent = controllerNull;
      }
      if (!nextRulerLayer) {
        Log.trace(
          "_getOrCreateLayerBoundRulers: Creating new next \'" +
            direction.toString() +
            "\' ruler",
        );
        nextRulerLayer = Core.createComponentRuler(comp, direction);
        nextRulerLayer.name = prefix + " " + count;
        var nextRulerProp = nextRulerLayer.transform.property(boundProp);
        if (!aeq.isProperty(nextRulerProp)) {
          return;
        }
        nextRulerProp.setValue(bounds[1]);
        nextRulerLayer.parent = controllerNull;
      }
      Log.trace("<-- _getOrCreateLayerBoundRulers");
      return aeq.arrayEx([priorRulerLayer, nextRulerLayer]);
    }
    function _getLayerBoundSelectorValues(layer, flexEffect) {
      Log.trace(
        "--> _getLayerBoundSelectorValues: \'" + layer.name.toString() + "\'",
      );
      var ddlTopSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridTopBound,
      );
      var ddlBottomSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridBottomBound,
      );
      var ddlLeftSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridLeftBound,
      );
      var ddlRightSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridRightBound,
      );
      if (!aeq.isProperty(ddlTopSelectorProp)) {
        return;
      }
      if (!aeq.isProperty(ddlBottomSelectorProp)) {
        return;
      }
      if (!aeq.isProperty(ddlLeftSelectorProp)) {
        return;
      }
      if (!aeq.isProperty(ddlRightSelectorProp)) {
        return;
      }
      var values = [
        ddlTopSelectorProp.value,
        ddlBottomSelectorProp.value,
        ddlLeftSelectorProp.value,
        ddlRightSelectorProp.value,
      ];
      Log.trace("<-- _getLayerBoundSelectorValues: " + values.toString());
      return values;
    }
    function _getLayersBounds(layers, direction) {
      Log.trace(
        "--> _getLayersBounds: " + layers.length + " layers, as " + direction,
      );
      var comp = layers[0].containingComp;
      var bounds = [comp.height, 0];
      var dimension = 1;
      if (direction === "column") {
        bounds[0] = comp.width;
        dimension = 0;
      }
      layers.forEach(function (lyr) {
        var lyrRect = lyr.sourceRectAtTime(comp.time, false);
        var scaleOffset = lyr.scale.value[dimension] / 100;
        var offset = lyrRect.top * scaleOffset;
        var size = lyrRect.height * scaleOffset;
        var pos =
          lyr.transform.position.value[dimension] -
          scaleOffset * lyr.transform.anchorPoint.value[dimension];
        if (direction === "column") {
          offset = lyrRect.left * scaleOffset;
          size = lyrRect.width * scaleOffset;
        }
        bounds[0] = Math.min(bounds[0], offset + pos);
        bounds[1] = Math.max(bounds[1], offset + pos + size);
      });
      Log.trace("<-- _getLayersBounds: " + bounds.toString());
      return bounds;
    }
    function _createGridMatte(layer, bounds, direction) {
      Log.trace(
        "--> _createGridMatte: \'" +
          layer.name.toString() +
          "\', " +
          bounds.toString(),
      );
      var comp = layer.containingComp;
      var layerMatte = comp.layers.addShape();
      layerMatte.moveBefore(layer);
      layerMatte.label = 0;
      layerMatte.name = Constants.LAYERS.MatteName + layer.name;
      var contents = layerMatte.property("ADBE Root Vectors Group");
      if (!aeq.isPropertyGroup(contents)) {
        return;
      }
      var rect = contents.addProperty("ADBE Vector Shape - Rect");
      var rectSizeProp = rect.property("ADBE Vector Rect Size");
      if (!aeq.isProperty(rectSizeProp)) {
        return;
      }
      var lyrRect = layer.sourceRectAtTime(comp.time, false);
      var width = (lyrRect.width * layer.scale.value[0]) / 100;
      var height = (lyrRect.height * layer.scale.value[1]) / 100;
      var matteXSize = width;
      var matteYSize = bounds[1] - bounds[0];
      if (direction === "column") {
        matteXSize = bounds[1] - bounds[0];
        matteYSize = height;
      }
      rectSizeProp.setValue([matteXSize, matteYSize]);
      rectSizeProp.expression = Core.getExpression("gridMatteSize", layer.name);
      var rectFill = contents.addProperty("ADBE Vector Graphic - Fill");
      var rectFillProp = rectFill.property("ADBE Vector Fill Color");
      if (!aeq.isProperty(rectFillProp)) {
        return;
      }
      rectFillProp.setValue([0, 1, 1]);
      layerMatte.transform.position.expression = Core.getExpression(
        "gridMattePosition",
        layer.name,
      );
      layerMatte.locked = true;
      Log.trace("<-- _createGridMatte");
      return layerMatte;
    }
    function _createRow(controller, layers) {
      Log.trace("--> _createRow");
      var newRowLayers = aeq.arrayEx();
      layers.forEach(function (layer) {
        var flexEffect = Core.getOrCreatePseudoeffect(
          layer,
          Pseudoeffects.GridLayer,
        );
        var layerBoundValues = _getLayerBoundSelectorValues(layer, flexEffect);
        if (layerBoundValues[0] + layerBoundValues[1] > 0) {
          Log.warning(
            "Layer \'" + layer.name + "\' is already in a row; skipping.",
          );
          return;
        }
        var ddlLayerWeightProp = flexEffect.property(
          Constants.EFFECTS.SHARED.LayerFlexModeName,
        );
        if (!aeq.isProperty(ddlLayerWeightProp)) {
          return;
        }
        ddlLayerWeightProp.setValue(Prefs.getAsInt(PrefKey.GridFlexMode) + 1);
        var ptScaleOffset = flexEffect.property(
          Constants.EFFECTS.SHARED.LayerScaleOffsetName,
        );
        if (!aeq.isProperty(ptScaleOffset)) {
          return;
        }
        ptScaleOffset.expression = Core.getExpression("layerScaleOffset");
        newRowLayers.push(layer);
        centerLayerAnchor(layer);
      });
      if (newRowLayers.length === 0) {
        Log.trace("<-- _createRow: No valid layers");
        return;
      }
      var comp = controller.containingComp;
      var bounds = _getLayersBounds(newRowLayers, "row");
      var boundRulers = _getOrCreateLayerBoundRulers(comp, "row", bounds);
      newRowLayers.forEach(function (layer) {
        Core.getOrCreateBoundSelectors(layer, "row", boundRulers);
        if (!Prefs.getAsBool(PrefKey.GridMatteMode)) {
          return;
        }
        if (
          layer.hasTrackMatte &&
          comp.layer(layer.index - 1).name.indexOf(Constants.LAYERS.MatteName) >
            -1
        ) {
          return;
        }
        _createGridMatte(layer, bounds, "row");
        layer.trackMatteType = TrackMatteType.ALPHA;
      });
      Log.trace("<-- _createRow");
    }
    function _createColumn(controller, layers) {
      Log.trace("--> _createColumn");
      var newColLayers = aeq.arrayEx();
      layers.forEach(function (layer) {
        var flexEffect = Core.getOrCreatePseudoeffect(
          layer,
          Pseudoeffects.GridLayer,
        );
        var layerBoundValues = _getLayerBoundSelectorValues(layer, flexEffect);
        if (layerBoundValues[2] + layerBoundValues[3] > 0) {
          Log.warning(
            "Layer \'" + layer.name + "\' is already in a column; skipping.",
          );
          return;
        }
        var ddlLayerWeightProp = flexEffect.property(
          Constants.EFFECTS.SHARED.LayerFlexModeName,
        );
        if (!aeq.isProperty(ddlLayerWeightProp)) {
          return;
        }
        ddlLayerWeightProp.setValue(Prefs.getAsInt(PrefKey.GridFlexMode) + 1);
        var ptScaleOffset = flexEffect.property(
          Constants.EFFECTS.SHARED.LayerScaleOffsetName,
        );
        if (!aeq.isProperty(ptScaleOffset)) {
          return;
        }
        ptScaleOffset.expression = Core.getExpression("layerScaleOffset");
        newColLayers.push(layer);
        centerLayerAnchor(layer);
      });
      if (newColLayers.length === 0) {
        Log.trace("<-- _createColumn: No valid layers");
        return;
      }
      var comp = controller.containingComp;
      var bounds = _getLayersBounds(newColLayers, "column");
      var boundRulers = _getOrCreateLayerBoundRulers(comp, "column", bounds);
      newColLayers.forEach(function (layer) {
        Core.getOrCreateBoundSelectors(layer, "column", boundRulers);
        if (!Prefs.getAsBool(PrefKey.GridMatteMode)) {
          return;
        }
        if (
          layer.hasTrackMatte &&
          comp.layer(layer.index - 1).name.indexOf(Constants.LAYERS.MatteName) >
            -1
        ) {
          return;
        }
        _createGridMatte(layer, bounds, "column");
        layer.trackMatteType = TrackMatteType.ALPHA;
      });
      Log.trace("<-- _createColumn");
    }
    var startLineNum = $.line - 2;
    Log.trace("--> createGridRig");
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- createGridRig: No comp");
      return;
    }
    var layers = aeq.getSelectedLayers().filter(Core.isValidLayer);
    if (layers.length < 1) {
      throw Util.buildError(
        "Select at least 1 layers!",
        "createGridRig.js",
        $.line - startLineNum,
      );
    }
    Core.checkExpressionEngine();
    var filteredLayers = layers.filter(function (layer) {
      return !Core.isGridRuler(layer);
    });
    var controller = Core.getOrCreateGridController(comp);
    var ignoreSmartSnap = aeq.getModifiers().shift;
    if (mode === "row") {
      _createRow(controller, filteredLayers);
    } else {
      _createColumn(controller, filteredLayers);
    }
    filteredLayers.forEach(function (layer) {
      layer.transform.position.expression = Core.getExpression("gridPosition");
      layer.transform.scale.expression = Core.getExpression("gridScale");
    });
    Log.trace("<-- createGridRig");
  }
  function createGridRuler(mode) {
    Log.trace("--> createGridRuler");
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- createGridRuler: No comp");
      return;
    }
    var ruler = Core.createComponentRuler(comp, mode);
    var prefix = mode === "row" ? "ROW" : "COL";
    var rulers = aeq.getLayers(comp).filter(function (layer) {
      return aeq.isShapeLayer(layer) && layer.name.indexOf(prefix) > -1;
    });
    var count = rulers.length + 1;
    ruler.name = prefix + " " + count;
    var compLayers = aeq.getLayers(comp);
    var controllerNulls = Core.findNullsWithEffect(
      compLayers,
      Constants.EFFECTS.SHARED.GutterSizeName,
    );
    if (controllerNulls.length > 0) {
      ruler.parent = controllerNulls[0];
    }
    Log.trace("<-- createGridRuler");
  }
  function createItem(itemType) {
    function _addShape(layers, shape) {
      Log.trace("--> _addShape: " + shape.toString());
      var chooseShapeSize = Prefs.getAsBool(PrefKey.ChooseShapeSize);
      if (aeq.getModifiers().shift) {
        chooseShapeSize = !chooseShapeSize;
      }
      var shapeSize = [0, 0];
      if (chooseShapeSize) {
        var ssui = new ShapeSizeUI(shape);
        shapeSize = ssui.size;
        if (shapeSize[0] === -1 && shapeSize[1] === -1) {
          Log.trace("<-- _addShape: User cancelled size");
          return;
        }
      }
      var shapeLayer = layers.addShape();
      shapeLayer.name = Util.capitalize(shape);
      var contents = shapeLayer.property("ADBE Root Vectors Group");
      if (!aeq.isPropertyGroup(contents)) {
        return;
      }
      switch (shape) {
        case "square":
          shapeProp = contents.addProperty("ADBE Vector Shape - Rect");
          sizeProp = shapeProp.property("ADBE Vector Rect Size");
          if (!aeq.isProperty(sizeProp)) {
            return;
          }
          if (chooseShapeSize) {
            sizeProp.setValue(shapeSize);
          }
          break;
        case "circle":
          shapeProp = contents.addProperty("ADBE Vector Shape - Ellipse");
          sizeProp = shapeProp.property("ADBE Vector Ellipse Size");
          if (!aeq.isProperty(sizeProp)) {
            return;
          }
          if (chooseShapeSize) {
            sizeProp.setValue(shapeSize);
          }
          break;
        case "poly":
          shapeProp = contents.addProperty("ADBE Vector Shape - Star");
          polyTypeProp = shapeProp.property("ADBE Vector Star Type");
          sizeProp = shapeProp.property("ADBE Vector Star Outer Radius");
          if (!aeq.isProperty(sizeProp) || !aeq.isProperty(polyTypeProp)) {
            return;
          }
          polyTypeProp.setValue(2);
          if (chooseShapeSize) {
            sizeProp.setValue(shapeSize[1]);
          }
          break;
        case "star":
          shapeProp = contents.addProperty("ADBE Vector Shape - Star");
          polyTypeProp = shapeProp.property("ADBE Vector Star Type");
          sizeProp = shapeProp.property("ADBE Vector Star Outer Radius");
          var innerSizeProp = shapeProp.property(
            "ADBE Vector Star Inner Radius",
          );
          if (
            !aeq.isProperty(sizeProp) ||
            !aeq.isProperty(innerSizeProp) ||
            !aeq.isProperty(polyTypeProp)
          ) {
            return;
          }
          polyTypeProp.setValue(1);
          if (chooseShapeSize) {
            innerSizeProp.setValue(shapeSize[0]);
            sizeProp.setValue(shapeSize[1]);
          }
          break;
      }
      var fillProp = contents.addProperty("ADBE Vector Graphic - Fill");
      var colourProp = fillProp.property("ADBE Vector Fill Color");
      if (!aeq.isProperty(colourProp)) {
        return;
      }
      colourProp.setValue([1, 1, 1]);
      Log.trace("<-- _addShape");
    }
    Log.trace("--> createItem: " + itemType.toString());
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- createItem: No comp");
      return;
    }
    var layers = comp.layers;
    switch (itemType) {
      case "square":
      case "circle":
      case "poly":
      case "star":
        _addShape(layers, itemType);
        break;
      case "text":
        var textLayer = layers.addText(Config.name);
        textLayer.name = "Unnamed Text Layer";
        break;
      case "comp":
        var userLayers = aeq.getSelectedLayers(comp);
        if (userLayers.length === 0) {
          return;
        }
        var indices = userLayers.map(function (layer) {
          return layer.index;
        });
        comp.layers.precompose(indices, Config.name + " Precomp");
        break;
      default:
        return;
    }
    Log.trace("<-- createItem");
  }
  function createLineRig() {
    function _setupController(controller) {
      Log.trace("--> _setupController");
      var flexControllerEffect = Core.getOrCreatePseudoeffect(
        controller,
        Pseudoeffects.LineControl,
      );
      var cbVerticalModeProp = flexControllerEffect.property(
        Constants.EFFECTS.LINECONTROLLER.VerticalModeName,
      );
      if (!aeq.isProperty(cbVerticalModeProp)) {
        return;
      }
      cbVerticalModeProp.setValue(Prefs.getAsBool(PrefKey.VerticalMode));
      var ptContainerSizeProp = flexControllerEffect.property(
        Constants.EFFECTS.LINECONTROLLER.ContainerSizeName,
      );
      if (!aeq.isProperty(ptContainerSizeProp)) {
        return;
      }
      ptContainerSizeProp.expression = Core.getExpression("lineContainerSize");
      var slContainerBoundProp = flexControllerEffect.property(
        Constants.EFFECTS.LINECONTROLLER.ContainerBoundName,
      );
      if (!aeq.isProperty(slContainerBoundProp)) {
        return;
      }
      slContainerBoundProp.expression =
        Core.getExpression("lineContainerBound");
      var slContainerFlexRatioProp = flexControllerEffect.property(
        Constants.EFFECTS.LINECONTROLLER.ContainerFlexRatioName,
      );
      if (!aeq.isProperty(slContainerFlexRatioProp)) {
        return;
      }
      slContainerFlexRatioProp.expression = Core.getExpression("lineFlexRatio");
      var ptUnitCountsProp = flexControllerEffect.property(
        Constants.EFFECTS.LINECONTROLLER.LayerCountName,
      );
      if (!aeq.isProperty(ptUnitCountsProp)) {
        return;
      }
      ptUnitCountsProp.expression = Core.getExpression("lineCounts");
      Log.trace("<-- _setupController");
    }
    function _setupLayer(layer, idx, layerInitialSize, priorLayerName) {
      Log.trace("--> _setupLayer: \'" + layer.name + "\'");
      var flexEffect = Core.getOrCreatePseudoeffect(
        layer,
        Pseudoeffects.LineLayer,
      );
      var slLayerWeightProp = flexEffect.property(
        Constants.EFFECTS.LINELAYER.LayerWeightName,
      );
      if (!aeq.isProperty(slLayerWeightProp)) {
        return;
      }
      slLayerWeightProp.setValue(layerInitialSize[0]);
      var ddlLayerWeightProp = flexEffect.property(
        Constants.EFFECTS.SHARED.LayerFlexModeName,
      );
      if (!aeq.isProperty(ddlLayerWeightProp)) {
        return;
      }
      ddlLayerWeightProp.setValue(Prefs.getAsInt(PrefKey.LineFlexMode) + 1);
      var ptCoordinatesProp = flexEffect.property(
        Constants.EFFECTS.LINELAYER.LayerCoordinateName,
      );
      if (!aeq.isProperty(ptCoordinatesProp)) {
        return;
      }
      ptCoordinatesProp.setValue(idx);
      var ptScaleOffset = flexEffect.property(
        Constants.EFFECTS.SHARED.LayerScaleOffsetName,
      );
      if (!aeq.isProperty(ptScaleOffset)) {
        return;
      }
      ptScaleOffset.expression = Core.getExpression("layerScaleOffset");
      var cbLayerSizeProp = flexEffect.property(
        Constants.EFFECTS.LINELAYER.LayerSizeName,
      );
      if (!aeq.isProperty(cbLayerSizeProp)) {
        return;
      }
      cbLayerSizeProp.expression = Core.getExpression("lineLayerSize");
      var ptInitialProp = flexEffect.property(
        Constants.EFFECTS.LINELAYER.LayerInitialName,
      );
      if (!aeq.isProperty(ptInitialProp)) {
        return;
      }
      ptInitialProp.setValue(layerInitialSize);
      ptInitialProp.expression = Core.getExpression("lineLayerInitial");
      centerLayerAnchor(layer);
      layer.transform.position.expression = Core.getExpression(
        "lineLayerPosition",
        priorLayerName,
      );
      layer.transform.position.setValue([0, 0]);
      layer.transform.scale.expression = Core.getExpression("lineLayerScale");
      Log.trace("<-- _setupLayer");
    }
    function _createLineMatte(layer) {
      Log.trace("--> _createLineMatte: \'" + layer.name.toString() + "\'");
      var comp = layer.containingComp;
      var layerMatte = comp.layers.addShape();
      layerMatte.moveBefore(layer);
      layerMatte.label = 0;
      layerMatte.name = Constants.LAYERS.MatteName + layer.name;
      layerMatte.parent = layer.parent;
      var contents = layerMatte.property("ADBE Root Vectors Group");
      if (!aeq.isPropertyGroup(contents)) {
        return;
      }
      var rect = contents.addProperty("ADBE Vector Shape - Rect");
      var rectSizeProp = rect.property("ADBE Vector Rect Size");
      if (!aeq.isProperty(rectSizeProp)) {
        return;
      }
      var lyrRect = layer.sourceRectAtTime(comp.time, false);
      var width = (lyrRect.width * layer.scale.value[0]) / 100;
      var height = (lyrRect.height * layer.scale.value[1]) / 100;
      rectSizeProp.setValue([width, height]);
      rectSizeProp.expression = Core.getExpression("lineMatteSize", layer.name);
      var rectFill = contents.addProperty("ADBE Vector Graphic - Fill");
      var rectFillProp = rectFill.property("ADBE Vector Fill Color");
      if (!aeq.isProperty(rectFillProp)) {
        return;
      }
      rectFillProp.setValue([0, 1, 1]);
      layerMatte.transform.position.expression = Core.getExpression(
        "lineMattePosition",
        layer.name,
      );
      layerMatte.locked = true;
      Log.trace("<-- _createLineMatte");
      return layerMatte;
    }
    var startLineNum = $.line - 5;
    Log.trace("--> createLineRig");
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- createLineRig: No comp");
      return;
    }
    var addLayersMode = aeq.getModifiers().shift;
    var layers = aeq.getSelectedLayers().filter(Core.isValidLayer);
    if (!addLayersMode && layers.length < 2) {
      throw Util.buildError(
        "Select at least 2 layers!",
        "createLineRig.js",
        $.line - startLineNum,
      );
    }
    layers = layers.sort(function (layerA, layerB) {
      return layerA.index - layerB.index;
    });
    var hasExpressions = false;
    var foundDupe = false;
    var dupeName = "";
    var layerNames = aeq.arrayEx();
    var layerIndices = aeq.arrayEx();
    layers.forEach(function (layer) {
      if (!hasExpressions) {
        if (
          !(
            layer.transform.position.expression === "" &&
            layer.transform.scale.expression === ""
          )
        ) {
          hasExpressions = true;
        }
      }
      var layerName = layer.name;
      layerIndices.push(layer.index);
      if (layerNames.indexOf(layerName) > -1) {
        foundDupe = true;
        dupeName = layerName;
      } else {
        layerNames.push(layer.name);
      }
    });
    if (foundDupe) {
      Log.trace("<-- createLineRig: Found duplicate layer name");
      throw Util.buildError(
        "Found duplicate layer name \'" +
          dupeName +
          "\'; all layers must have unique names.",
        "createLineRig.js",
        $.line - startLineNum,
      );
    }
    if (hasExpressions) {
      var doContinue = confirm(
        "One of your layers has scale or position expressions! Continuing will remove it. Continue anyway?",
        false,
        Config.name + " Warning",
      );
      if (!doContinue) {
        alert(
          "Remove any position & scale expressions from specified layers and try again.",
        );
        Log.trace("<-- createLineRig: User Cancelled");
        return;
      }
    }
    Core.checkExpressionEngine();
    var matteMode = Prefs.getAsBool(PrefKey.LineMatteMode);
    var layerOffset = 0;
    var priorLayerName = "";
    if (addLayersMode) {
      var compLayers = aeq.getLayers(comp);
      var controllers = Core.findNullsWithEffect(
        compLayers,
        Pseudoeffects.LineControl.matchName,
      );
      if (controllers.length === 0) {
        Log.trace("<-- createLineRig: Add Mode, but no existing rig!");
        return;
      }
      controller = controllers[0];
      var controlEffect = Core.findLayerEffect(
        controller,
        Pseudoeffects.LineControl.matchName,
      );
      if (!controlEffect) {
        Log.trace("<-- createLineRig: Add Mode, can\'t find effect!");
        return;
      }
      var countProp = controlEffect.property(8);
      if (!aeq.isProperty(countProp)) {
        return;
      }
      layerOffset = countProp.valueAtTime(comp.time, false);
      var lastLayer = Core.getLayerByCoordinate(compLayers, layerOffset);
      if (!lastLayer) {
        Log.trace(
          "<-- createLineRig: Add Mode, can\'t find layer with coordinate " +
            layerOffset,
        );
        return;
      }
      priorLayerName = lastLayer.name;
    } else {
      controller = comp.layers.addNull();
      controller.name = Constants.LAYERS.LineRigControllerName;
      controller.enabled = false;
      controller.guideLayer = true;
      controller.label = 14;
      controller.moveBefore(layers[0]);
      priorLayerName = controller.name;
      _setupController(controller);
    }
    layers.forEach(function (layer, ii) {
      var LAYER_INITIAL_SIZE = getInitialSize(layer);
      var layerNum = ii + layerOffset + 1;
      layer.parent = controller;
      if (ii > 0) {
        priorLayerName = layers[ii - 1].name;
      }
      _setupLayer(layer, layerNum, LAYER_INITIAL_SIZE, priorLayerName);
      if (matteMode) {
        if (
          layer.hasTrackMatte &&
          comp.layer(layer.index - 1).name.indexOf(Constants.LAYERS.MatteName) >
            -1
        ) {
          return;
        }
        _createLineMatte(layer);
        layer.trackMatteType = TrackMatteType.ALPHA;
      }
    });
    Log.trace("<-- createLineRig");
  }
  function createStroke(strokeType) {
    function _findOrCreateProperty(container, matchName) {
      Log.trace(
        "--> _findOrCreateProperty: " +
          container.name.toString() +
          ", " +
          matchName.toString(),
      );
      var props = aeq.getPropertyChildren(container, {
        groups: true,
        props: false,
        separate: false,
      });
      var matchedProps = aeq.arrayEx(props).filter(function (prop) {
        return prop.matchName === matchName;
      });
      if (matchedProps.length > 0) {
        result = matchedProps[0];
      } else {
        result = container.addProperty(matchName);
      }
      Log.trace("<-- _findOrCreateProperty");
      return result;
    }
    function setStrokeOffset(offsetProp, strokeType) {
      Log.trace("--> setStrokeOffset: " + strokeType.toString());
      if (strokeType === "normal") {
        offsetProp.remove();
        Log.trace("<-- setStrokeOffset: Removed");
        return;
      }
      var offsetPropAmountProp = offsetProp.property(
        "ADBE Vector Offset Amount",
      );
      if (!aeq.isProperty(offsetPropAmountProp)) {
        return;
      }
      offsetPropAmountProp.expression = Core.getExpression(
        "strokeWidth",
        strokeType,
      );
      Log.trace("<-- setStrokeOffset");
    }
    Log.trace("--> createStroke: " + strokeType.toString());
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- createStroke: No comp");
      return;
    }
    var layers = aeq.getSelectedLayers().filter(aeq.isShapeLayer);
    if (layers.length === 0) {
      Log.trace("<-- createStroke: No layers");
      return;
    }
    Core.checkExpressionEngine();
    layers.forEach(function (layer) {
      var contents = layer.property("ADBE Root Vectors Group");
      if (!aeq.isPropertyGroup(contents)) {
        return;
      }
      var stroke = _findOrCreateProperty(
        contents,
        "ADBE Vector Graphic - Stroke",
      );
      if (!stroke.enabled) {
        stroke.enabled = true;
      }
      var container = stroke.propertyGroup(1);
      var strokeOffset = _findOrCreateProperty(
        container,
        "ADBE Vector Filter - Offset",
      );
      strokeOffset.name =
        Config.name + " " + Util.capitalize(strokeType) + " Stroke";
      setStrokeOffset(strokeOffset, strokeType);
    });
    Log.trace("<-- createStroke");
  }
  function removeGridRig() {
    function _unrigGridLayer(layer) {
      Log.trace("--> _unrigGridLayer: \'" + layer.name.toString() + "\'");
      layer.transform.position.expression = "";
      layer.transform.scale.expression = "";
      var flexEffect = Core.findLayerEffect(
        layer,
        Constants.EFFECTS.GRIDLAYER.EffectName,
      );
      flexEffect.remove();
      Log.trace("<-- _unrigGridLayer");
    }
    Log.trace("--> removeGridRig");
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- removeRig: No comp");
      return;
    }
    var compLayers = aeq.getLayers(comp);
    var layersMode = aeq.getModifiers().shift;
    var indicesToRemove = aeq.arrayEx();
    Core.findLayersWithEffect(
      compLayers,
      Constants.EFFECTS.GRIDLAYER.EffectName,
    )
      .sort(function (a, b) {
        return b.index - a.index;
      })
      .filter(function (layer) {
        if (layersMode && !layer.selected) {
          return false;
        }
        return true;
      })
      .forEach(function (gridLayer) {
        if (gridLayer.hasTrackMatte) {
          var matteLayer = comp.layers[gridLayer.index - 1];
          if (matteLayer.name.indexOf(Constants.LAYERS.MatteName) > -1) {
            gridLayer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
            indicesToRemove.push(gridLayer.index - 1);
          }
        }
        _unrigGridLayer(gridLayer);
      });
    if (!layersMode) {
      compLayers.filter(Core.isGridRuler).forEach(function (layer) {
        indicesToRemove.push(layer.index);
      });
      Core.findNullsWithEffect(
        compLayers,
        Constants.EFFECTS.SHARED.GutterSizeName,
      ).forEach(function (layer) {
        indicesToRemove.push(layer.index);
      });
    }
    indicesToRemove
      .sort(function (a, b) {
        return b - a;
      })
      .forEach(function (indexToRemove) {
        var layer = comp.layer(indexToRemove);
        if (!Core.isValidLayer(layer)) {
          return;
        }
        Core.removeController(layer);
      });
    Log.trace("<-- removeGridRig: Removed rig");
  }
  function removeLineRig() {
    function _bakeRigValues(layer) {
      Log.trace("--> __bakeRigValues: \'" + layer.name.toString() + "\'");
      var compTime = layer.containingComp.time;
      layer.transform.position.setValue(
        layer.transform.position.valueAtTime(compTime, false),
      );
      layer.transform.scale.setValue(
        layer.transform.scale.valueAtTime(compTime, false),
      );
      Log.trace("<-- __bakeRigValues");
    }
    function _unrigLineLayer(layer) {
      Log.trace("--> _unrigLineLayer: \'" + layer.name.toString() + "\'");
      layer.transform.position.expression = "";
      layer.transform.scale.expression = "";
      var layerEffect = Core.findLayerEffect(
        layer,
        Constants.EFFECTS.LINELAYER.EffectName,
      );
      if (!layerEffect) {
        Log.trace("<-- _unrigLineLayer: Couldn\'t find pseudoeffect");
        return;
      }
      layerEffect.remove();
      Log.trace("<-- _unrigLineLayer: Removed");
    }
    function _getRiggedLayers(layers) {
      Log.trace("--> _getRiggedLayers: Checking " + layers.length.toString());
      var riggedLayers = Core.findLayersWithEffect(
        layers,
        Constants.EFFECTS.LINELAYER.EffectName,
      );
      Log.trace(
        "<-- _getRiggedLayers: Found " + riggedLayers.length.toString(),
      );
      return riggedLayers;
    }
    function _bakeLineRigWithController(controlNull) {
      Log.trace("--> _bakeLineRigWithController");
      var containerComp = controlNull.containingComp;
      var compLayers = aeq.getLayers(containerComp).filter(Core.isValidLayer);
      compLayers.sort(function (a, b) {
        return b.index - a.index;
      });
      compLayers.forEach(function (layer) {
        if (layer.parent !== controlNull) {
          return;
        }
        _bakeRigValues(layer);
      });
      Log.trace("<-- _bakeLineRigWithController");
    }
    function _removeLineRigWithController(controlNull) {
      Log.trace("--> _removeLineRigWithController");
      var containerComp = controlNull.containingComp;
      var compLayers = aeq.getLayers(containerComp).filter(Core.isValidLayer);
      var matteLayers = aeq.arrayEx();
      compLayers.forEach(function (layer) {
        if (layer.parent !== controlNull) {
          return;
        }
        _unrigLineLayer(layer);
        var priorLayer = compLayers[layer.index - 2];
        if (priorLayer.name.indexOf(Constants.LAYERS.MatteName) > -1) {
          layer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
          matteLayers.push(priorLayer);
        }
      });
      matteLayers
        .sort(function (a, b) {
          return b.index - a.index;
        })
        .forEach(function (matteLayer) {
          matteLayer.locked = false;
          matteLayer.remove();
        });
      Log.trace("<-- _removeLineRigWithController");
    }
    Log.trace("--> removeLineRig");
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- removeLineRig: No comp");
      return;
    }
    var layers = aeq.getSelectedLayers();
    var riggedLayers = _getRiggedLayers(layers);
    var rigControllers = aeq.arrayEx();
    var controllerEffectName = Constants.EFFECTS.LINECONTROLLER.EffectName;
    var removeSelectedLayersMode = aeq.getModifiers().shift;
    var compLayers = aeq.getLayers(comp);
    if (removeSelectedLayersMode) {
      var matteLayers = aeq.arrayEx();
      var earliestCoordinate = Number.POSITIVE_INFINITY;
      var latestCoordinate = Number.NEGATIVE_INFINITY;
      if (riggedLayers.length === 0) {
        Log.trace("<-- removeLineRig: No layers!");
        return;
      }
      var time = riggedLayers[0].containingComp.time;
      riggedLayers.forEach(function (layer) {
        var slCoordinateProp = Core.getLayerCoordinateProp(layer);
        var coordinate = slCoordinateProp.valueAtTime(time, false);
        if (coordinate > -1) {
          earliestCoordinate = Math.min(earliestCoordinate, coordinate);
          latestCoordinate = Math.max(latestCoordinate, coordinate);
        }
        var controller = layer.parent;
        _bakeRigValues(layer);
        _unrigLineLayer(layer);
        layer.parent = null;
        var flexControllerEffect = Core.findLayerEffect(
          controller,
          controllerEffectName,
        );
        if (!flexControllerEffect) {
          return;
        }
        var countProp = flexControllerEffect.property(
          Constants.EFFECTS.LINECONTROLLER.LayerCountName,
        );
        if (!aeq.isProperty(countProp)) {
          return;
        }
        var priorLayer = compLayers[layer.index - 2];
        if (priorLayer.name.indexOf(Constants.LAYERS.MatteName) > -1) {
          layer.trackMatteType = TrackMatteType.NO_TRACK_MATTE;
          matteLayers.push(priorLayer);
        }
        if (!aeq.isAVLayer(controller)) {
          return;
        }
        if (countProp.value === 0) {
          Core.removeController(controller);
          return;
        }
      });
      matteLayers
        .sort(function (a, b) {
          return b.index - a.index;
        })
        .forEach(function (matteLayer) {
          matteLayer.locked = false;
          matteLayer.remove();
        });
      var stillRiggedLayers = _getRiggedLayers(aeq.getLayers(comp));
      var incrementer = 0;
      stillRiggedLayers.forEach(function (layer) {
        var slCoordinateProp = Core.getLayerCoordinateProp(layer);
        if (!aeq.isProperty(slCoordinateProp)) {
          return;
        }
        var coordinate = slCoordinateProp.valueAtTime(time, false);
        if (coordinate <= earliestCoordinate) {
          return;
        }
        var newCoordinate = earliestCoordinate + incrementer;
        slCoordinateProp.setValue(newCoordinate);
        var lastLayer = layer.parent;
        if (newCoordinate > 1) {
          lastLayer = Core.getLayerByCoordinate(
            stillRiggedLayers,
            newCoordinate - 1,
          );
        }
        layer.transform.position.expression = Core.getExpression(
          "lineLayerPosition",
          lastLayer.name,
        );
        incrementer++;
      });
      Log.trace("<-- removeLineRig: Removed selected layers");
      return;
    }
    if (layers.length === 0) {
      rigControllers = Core.findNullsWithEffect(
        compLayers,
        controllerEffectName,
      );
    } else {
      var selectedControllers = Core.findNullsWithEffect(
        layers,
        controllerEffectName,
      );
      var selectedControllerIndices = selectedControllers.map(
        function (selectedController) {
          return selectedController.index;
        },
      );
      riggedLayers = riggedLayers.filter(function (layer) {
        return selectedControllerIndices.indexOf(layer.index) <= -1;
      });
      riggedLayers.forEach(function (riggedLayer) {
        var parent = riggedLayer.parent;
        if (!(parent && aeq.isAVLayer(parent))) {
          return;
        }
        if (selectedControllerIndices.indexOf(parent.index) > -1) {
          return;
        }
        selectedControllers.push(parent);
        selectedControllerIndices.push(parent.index);
      });
      rigControllers = selectedControllers;
    }
    rigControllers.forEach(function (rigController) {
      _bakeLineRigWithController(rigController);
    });
    rigControllers.forEach(function (rigController) {
      var effects = aeq.getEffects(rigController);
      if (effects.length === 0) {
        return;
      }
      var container = effects[0].propertyGroup(effects[0].propertyDepth);
      var effectIndices = effects
        .sort(function (a, b) {
          return b.propertyIndex - a.propertyIndex;
        })
        .map(function (effect) {
          return effect.propertyIndex;
        });
      effectIndices.forEach(function (effectIndex) {
        container.property("ADBE Effect Parade").property(effectIndex).remove();
      });
      _removeLineRigWithController(rigController);
    });
    rigControllers
      .sort(function (a, b) {
        return b.index - a.index;
      })
      .forEach(function (rigController) {
        Core.removeController(rigController);
      });
    Log.trace("<-- removeLineRig");
  }
  function updateFlexMode(flexMode) {
    Log.trace("--> updateFlexMode: " + flexMode.toString());
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- updateFlexMode: No comp");
      return;
    }
    var layers = aeq.getSelectedLayers(comp);
    if (layers.length === 0) {
      Log.trace("<-- updateFlexMode: No layers");
      return;
    }
    layers.forEach(function (layer) {
      var flexEffect = Core.findLayerEffect(
        layer,
        Constants.EFFECTS.LINELAYER.EffectName,
      );
      if (!flexEffect) {
        flexEffect = Core.findLayerEffect(
          layer,
          Constants.EFFECTS.GRIDLAYER.EffectName,
        );
        if (!flexEffect) {
          return;
        }
      }
      var ddlFlexModeProp = flexEffect.property(
        Constants.EFFECTS.SHARED.LayerFlexModeName,
      );
      if (!aeq.isProperty(ddlFlexModeProp)) {
        return;
      }
      ddlFlexModeProp.setValue(flexMode + 1);
    });
    Log.trace("<-- updateFlexMode");
  }
  function updateLineSizes() {
    Log.trace("--> updateLineSizes");
    var comp = aeq.getActiveComp();
    if (!comp) {
      Log.trace("<-- updateLineSizes: No comp");
      return;
    }
    var layers = aeq.getSelectedLayers().filter(Core.isValidLayer);
    layers.forEach(function (layer) {
      var layerScale = layer.transform.scale;
      layerScale.expressionEnabled = false;
      var newInitialSize = getInitialSize(layer);
      layerScale.expressionEnabled = true;
      var effect = Core.findLayerEffect(
        layer,
        Constants.EFFECTS.LINELAYER.EffectName,
      );
      if (!effect) {
        return;
      }
      var ptInitialProp = effect.property(
        Constants.EFFECTS.LINELAYER.LayerInitialName,
      );
      if (!aeq.isProperty(ptInitialProp)) {
        return;
      }
      ptInitialProp.setValue(newInitialSize);
      var slLayerWeightProp = effect.property(
        Constants.EFFECTS.LINELAYER.LayerWeightName,
      );
      if (!aeq.isProperty(slLayerWeightProp)) {
        return;
      }
      slLayerWeightProp.setValue(newInitialSize[0]);
    });
    Log.trace("<-- updateLineSizes");
  }
  function Main(thisObj) {
    this.startLineNum = $.line - 7;
    this.init();
    var mainUi = new MainUI(thisObj);
    this.mainUi = mainUi;
    this.mainUi.onStrokeInnerClick = Util.bind(
      this.createStroke,
      this,
      "inner",
    );
    this.mainUi.onStrokeNormalClick = Util.bind(
      this.createStroke,
      this,
      "normal",
    );
    this.mainUi.onStrokeOuterClick = Util.bind(
      this.createStroke,
      this,
      "outer",
    );
    this.mainUi.onCreateSquareClick = Util.bind(
      this.createItem,
      this,
      "square",
    );
    this.mainUi.onCreateCircleClick = Util.bind(
      this.createItem,
      this,
      "circle",
    );
    this.mainUi.onCreatePolyClick = Util.bind(this.createItem, this, "poly");
    this.mainUi.onCreateStarClick = Util.bind(this.createItem, this, "star");
    this.mainUi.onCreateTextClick = Util.bind(this.createItem, this, "text");
    this.mainUi.onCreateCompClick = Util.bind(this.createItem, this, "comp");
    this.mainUi.onCreateLineRigClick = Util.bind(this.createLineRig, this);
    this.mainUi.onRemoveLineRigClick = Util.bind(this.removeLineRig, this);
    this.mainUi.onUpdateLineSizesClick = Util.bind(this.updateLineSizes, this);
    this.mainUi.onCreateRowClick = Util.bind(this.createGridRow, this);
    this.mainUi.onCreateColumnClick = Util.bind(this.createGridColumn, this);
    this.mainUi.onRemoveGridRigClick = Util.bind(this.removeGridRig, this);
    this.mainUi.onAddGridControlsClick = Util.bind(this.addGridControls, this);
    this.mainUi.onCreateRowRulerClick = Util.bind(this.createRowRuler, this);
    this.mainUi.onCreateColumnRulerClick = Util.bind(
      this.createColumnRuler,
      this,
    );
    this.mainUi.onUpdateFlexMode = Util.bind(this.updateFlexMode, this);
    this.mainUi.onOptionsClick = Util.bind(this.launchOptions, this);
  }
  var aeq = (function () {
    var aeq = function (selector, context) {
      if (aeq.isNullOrUndefined(selector)) {
        return selector;
      }
      if (aeq.isAeq(selector)) {
        result = selector;
      } else {
        if (aeq.isString(selector)) {
          result = aeq.select(selector, context);
        } else {
          if (aeq.isArray(selector)) {
            result = aeq.arrayEx(selector);
          } else {
            if (aeq.isApp(selector)) {
              result = aeq.app;
            } else {
              if (aeq.isComp(selector)) {
                result = new aeq.Comp(selector);
              } else {
                if (aeq.isLayer(selector)) {
                  result = new aeq.Layer(selector);
                } else {
                  if (aeq.isProperty(selector)) {
                    result = new aeq.Property(selector);
                  }
                }
              }
            }
          }
        }
      }
      result.aeq = true;
      return result;
    };
    aeq.version = "0.6.0";
    aeq.thisObj = this;
    if (typeof module === "object") {
      module.exports = aeq;
    }
    aeq.setDefault = function (value, defaultVal) {
      return typeof value == "undefined" ? defaultVal : value;
    };
    var setDefault = aeq.setDefault;
    aeq.extend = function () {
      var target = setDefault(arguments[0], {});
      var i = 1;
      var length = arguments.length;
      var deep = false;
      if (typeof target === "boolean") {
        deep = target;
        target = setDefault(arguments[i], {});
        i++;
      }
      if (typeof target !== "object" && !aeq.isFunction(target)) {
        target = {};
      }
      if (i === length) {
        target = this;
        i--;
      }
      for (; i < length; i++) {
        if ((options = arguments[i]) !== null) {
          for (var name in options) {
            if (!options.hasOwnProperty(name)) {
              continue;
            }
            src = target[name];
            copy = options[name];
            if (target === copy) {
              continue;
            }
            if (
              deep &&
              copy &&
              (aeq.isPlainObject(copy) || (copyIsArray = aeq.isArray(copy)))
            ) {
              if (copyIsArray) {
                copyIsArray = false;
                clone = src && aeq.isArray(src) ? src : [];
              } else {
                clone = src && aeq.isPlainObject(src) ? src : {};
              }
              target[name] = aeq.extend(deep, clone, copy);
            } else {
              if (copy !== undefined) {
                target[name] = copy;
              }
            }
          }
        }
      }
      return target;
    };
    aeq.forEach = function (obj, callback, fromIndex) {
      if (obj && Object.prototype.toString.call(obj) === "[object Array]") {
        length = obj.length;
        i = fromIndex === undefined ? 0 : fromIndex;
        for (; i < length; i++) {
          if (callback(obj[i], i, obj) === false) {
            break;
          }
        }
      } else {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (callback(i, obj[i], obj) === false) {
              break;
            }
          }
        }
      }
      return obj;
    };
    aeq.filter = function (obj, callback) {
      var filteredArr = [];
      if (obj && Object.prototype.toString.call(obj) === "[object Array]") {
        length = obj.length;
        i = 0;
        for (; i < length; i++) {
          if (callback(obj[i], i, obj)) {
            filteredArr.push(obj[i]);
          }
        }
      } else {
        for (var i in obj) {
          if (obj.hasOwnProperty(i)) {
            if (callback(i, obj[i], obj)) {
              filteredArr.push(obj[i]);
            }
          }
        }
      }
      return aeq.arrayEx(filteredArr);
    };
    aeq = (function (aeq) {
      aeq.extend({
        assertIsEmpty: function (o, err) {
          if (aeq.isEmpty(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsFalse: function (o, err) {
          if (o === false) {
            return true;
          }
          throw new Error(err);
        },
        assertIsNotEmpty: function (o, err) {
          if (!aeq.isEmpty(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsNotNull: function (o, err) {
          if (!aeq.isNullOrUndefined(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsNull: function (o, err) {
          if (aeq.isNullOrUndefined(o)) {
            return true;
          }
          throw new Error(err);
        },
        assertIsTrue: function (o, err) {
          if (o === true) {
            return true;
          }
          throw new Error(err);
        },
      });
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function getAttr(object, attributeName) {
        if (object[attributeName] instanceof Function) {
          return object[attributeName]();
        }
        return object[attributeName];
      }
      function setAttr(object, attributeName, newValue) {
        attrSetters = attr.setters[object.toString()];
        if (attrSetters !== undefined) {
          setter = attrSetters[attributeName];
          if (setter !== undefined) {
            attributeName = setter;
          }
        }
        if (object[attributeName] instanceof Function) {
          object[attributeName](newValue);
        } else {
          object[attributeName] = newValue;
        }
        return object;
      }
      aeq.attr = function (array, attributeName, newValue) {
        if (arguments.length === 1) {
          throw new Error("Only one argument given to attr, must be 2 or 3");
        } else {
          if (arguments.length === 2) {
            if (array[0] !== undefined && array[0] !== null) {
              return getAttr(array[0], attributeName);
            }
            return undefined;
          } else {
            for (i = 0, il = array.length; i < il; i++) {
              setAttr(array[i], attributeName, newValue);
            }
            return array;
          }
        }
      };
      var attr = { setters: { "[object Property]": { value: "setValue" } } };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function normalizeProperty(propertyParent, property) {
        switch (property.name) {
          case "X Position":
          case "Y Position":
          case "Z Position":
            property = propertyParent.property("Position");
            property.dimensionsSeparated = true;
            return property.propertyGroup().property(property.name);
          default:
            return property;
        }
      }
      aeq.extend({
        framesToTime: function (frames, frameRate) {
          return frames / frameRate;
        },
        getActiveComposition: function () {
          var activeItem = app.project.activeItem;
          if (aeq.isComp(activeItem)) {
            return activeItem;
          }
          return null;
        },
        getChildren: function (obj) {
          if (aeq.isComp(obj)) {
            return aeq.normalizeCollection(obj.layers);
          }
          if (aeq.isLayer(obj) || aeq.isPropertyGroup(obj)) {
            return aeq.getPropertyChildren(obj, {});
          }
          if (aeq.isArray(obj)) {
            ret = aeq.arrayEx();
            aeq.forEach(obj, function (item) {
              ret.push.apply(ret, aeq.getChildren(item));
            });
            return ret;
          }
        },
        getComposition: function (name) {
          var length = app.project.items.length;
          for (var i = 1; i <= length; i += 1) {
            var item = app.project.item(i);
            if (item.name === name && aeq.isComp(item)) {
              return item;
            }
          }
          return null;
        },
        getCompositions: function (folder, deep) {
          var items = aeq.getItems(folder, deep);
          return items.filter(aeq.isComp);
        },
        getEffects: function (layers) {
          aeq.assertIsNotNull(layers, "layers is null");
          if (aeq.isLayer(layers)) {
            layers = [layers];
          }
          var arr = [];
          var len = layers.length;
          for (var l = 0; l < len; l += 1) {
            effects = layers[l].property("ADBE Effect Parade");
            if (effects === null) {
              continue;
            }
            effectslen = effects.numProperties;
            for (var e = 1; e <= effectslen; e += 1) {
              arr.push(effects.property(e));
            }
          }
          return aeq.arrayEx(arr);
        },
        getItemInComps: function (item) {
          var layers = [];
          aeq.forEach(item.usedIn, function (comp) {
            aeq.forEachLayer(comp, function (layer) {
              if (layer.source === item) {
                layers.push(layer);
              }
            });
          });
          return aeq.arrayEx(layers);
        },
        getItems: function (folder, deep) {
          if (folder === undefined) {
            return aeq.normalizeCollection(app.project.items);
          }
          deep = setDefault(deep, true);
          folder = aeq.project.getFolder(folder);
          if (folder === null) {
            return aeq.arrayEx();
          }
          if (deep) {
            return aeq.getItemsDeep(folder);
          }
          return aeq.normalizeCollection(folder.items);
        },
        getItemsDeep: function (folder, returnArrayEx) {
          var items = [];
          var len = folder.items.length;
          for (var i = 1; i <= len; i += 1) {
            item = folder.items[i];
            if (aeq.isFolderItem(item)) {
              items.push.apply(items, aeq.getItemsDeep(item, false));
            }
            items.push(item);
          }
          if (returnArrayEx === false) {
            return items;
          }
          return aeq.arrayEx(items);
        },
        getKeys: function (property) {
          var arr = [];
          if (aeq.isArray(property)) {
            for (i = 0, len = property.length; i < len; i++) {
              arr = arr.concat(aeq.getKeys(property[i]));
            }
            return aeq.arrayEx(arr);
          }
          for (i = 1, len = property.numKeys; i <= len; i++) {
            arr.push(aeq.Key(property, i));
          }
          return aeq.arrayEx(arr);
        },
        getLayers: function (comps) {
          aeq.assertIsNotNull(comps, "comps is null");
          var arr = [];
          if (aeq.isComp(comps)) {
            comps = [comps];
          }
          for (var c = 0; c < comps.length; c += 1) {
            var comp = comps[c];
            arr = arr.concat(aeq.normalizeCollection(comp.layers));
          }
          return aeq.arrayEx(arr);
        },
        getMarkerGroup: function (obj) {
          if (!obj) {
            obj = aeq.getActiveComp();
          }
          if (aeq.isLayer(obj)) {
            return obj.property("ADBE Marker");
          }
          if (aeq.isComp(obj) && aeq.app.version >= 14) {
            return obj.markerProperty;
          }
          return null;
        },
        getProperties: function (layers, options) {
          aeq.assertIsNotNull(layers, "layer is null");
          options = setDefault(options, { separate: true });
          var arr = [];
          for (var l = 0; l < layers.length; l += 1) {
            var layer = layers[l];
            arr = arr.concat(aeq.getPropertyChildren(layer, options));
          }
          return aeq.arrayEx(arr);
        },
        getPropertyChildren: function (propertyParent, options) {
          var arr = [];
          var len = propertyParent.numProperties;
          options = setDefault(options, { separate: false });
          for (var i = 1; i <= len; i += 1) {
            property = propertyParent.property(i);
            switch (property.propertyType) {
              case PropertyType.PROPERTY:
                if (options.separate) {
                  property = normalizeProperty(propertyParent, property);
                }
                if (options.props !== false) {
                  arr.push(property);
                }
                break;
              case PropertyType.INDEXED_GROUP:
              case PropertyType.NAMED_GROUP:
                if (options.groups === true) {
                  arr.push(property);
                }
                arr = arr.concat(aeq.getPropertyChildren(property, options));
                break;
              default:
                break;
            }
          }
          return arr;
        },
        getSelectedLayers: function (comp) {
          if (!aeq.isComp(comp)) {
            comp = aeq.getActiveComp();
          }
          if (comp) {
            return aeq.arrayEx(comp.selectedLayers);
          }
          return aeq.arrayEx();
        },
        getSelectedLayersOrAll: function (comp) {
          if (!aeq.isComp(comp)) {
            comp = aeq.getActiveComp();
            if (comp === null) {
              return aeq.arrayEx();
            }
          }
          var layers = aeq.getSelectedLayers(comp);
          if (layers.length === 0) {
            return aeq.getLayers(comp);
          }
          return layers;
        },
        getSelectedProperties: function (obj) {
          if (!obj) {
            obj = aeq.getActiveComp();
          }
          if (obj) {
            return aeq.arrayEx(obj.selectedProperties);
          }
          return aeq.arrayEx();
        },
        normalizeCollection: function (collection) {
          var ret = Array.prototype.slice.call(collection, 1);
          var len = collection.length;
          if (len !== 0) {
            ret.push(collection[len]);
          }
          return aeq.arrayEx(ret);
        },
        timeToFrames: function (time, frameRate) {
          return time * frameRate;
        },
      });
      aeq.getComp = aeq.getComposition;
      aeq.getComps = aeq.getCompositions;
      aeq.getActiveComp =
        aeq.activeComp =
        aeq.activeComposition =
          aeq.getActiveComposition;
      aeq.getSelectedProps = aeq.getSelectedProperties;
      aeq.getSelectedOrAllLayers = aeq.getSelectedLayersOrAll;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        forEachComp: function (callback) {
          aeq.forEach(aeq.getCompositions(), callback);
        },
        forEachEffect: function (obj, callback) {
          if (aeq.isLayer(obj)) {
            effects = obj.property("ADBE Effect Parade");
            length = effects.numProperties;
            for (var i = 1; i <= length; i += 1) {
              if (callback(effects.property(i), i, effects) === false) {
                break;
              }
            }
          } else {
            if (aeq.isComp(obj)) {
              aeq.forEachLayer(obj, function (layer) {
                aeq.forEachEffect(layer, callback);
              });
            } else {
              if (aeq.isArray(obj)) {
                aeq.forEach(obj, function (obj) {
                  aeq.forEachEffect(obj, callback);
                });
              } else {
                if (aeq.isFunction(obj)) {
                  callback = obj;
                  aeq.forEachLayer(function (layer) {
                    aeq.forEachEffect(layer, callback);
                  });
                }
              }
            }
          }
          return aeq;
        },
        forEachItem: function (callback) {
          var project = app.project;
          var items = project.items;
          var length = items.length;
          for (var i = 1; i <= length; i += 1) {
            if (callback(items[i], i, project) === false) {
              break;
            }
          }
          return aeq;
        },
        forEachLayer: function (obj, callback) {
          if (aeq.isComp(obj)) {
            var length = obj.numLayers;
            var i = 1;
            for (; i <= length; i++) {
              if (callback(obj.layer(i), i, obj) === false) {
                break;
              }
            }
          } else {
            if (aeq.isArray(obj)) {
              aeq.forEach(obj, function (obj) {
                aeq.forEachLayer(obj, callback);
              });
            } else {
              if (aeq.isFunction(obj)) {
                callback = obj;
                aeq.forEachComp(function (comp) {
                  aeq.forEachLayer(comp, callback);
                });
              }
            }
          }
          return aeq;
        },
        forEachOutputModule: function (callback) {
          aeq.forEachRenderQueueItem(function (item) {
            var length = item.outputModules.length;
            for (var i = 1; i <= length; i += 1) {
              if (callback(item.outputModules[i], i, item) === false) {
                break;
              }
            }
          });
          return aeq;
        },
        forEachProperty: function (obj, callback) {
          if (aeq.isLayer(obj) || aeq.isPropertyGroup(obj)) {
            var properties = aeq.getPropertyChildren(obj, {});
            aeq.forEach(properties, callback);
          } else {
            if (aeq.isComp(obj)) {
              aeq.forEachLayer(obj, function (layer) {
                var properties = aeq.getPropertyChildren(layer, {});
                aeq.forEach(properties, callback);
              });
            } else {
              if (aeq.isArray(obj)) {
                aeq.forEach(obj, function (obj) {
                  aeq.forEachProperty(obj, callback);
                });
              } else {
                if (aeq.isFunction(obj)) {
                  callback = obj;
                  aeq.forEachLayer(function (layer) {
                    aeq.forEachProperty(layer, callback);
                  });
                }
              }
            }
          }
          return aeq;
        },
        forEachRenderQueueItem: function (callback) {
          var renderQueue = app.project.renderQueue;
          var renderQueueItems = renderQueue.items;
          var length = renderQueueItems.length;
          for (var i = 1; i <= length; i += 1) {
            if (callback(renderQueueItems[i], i, renderQueue) === false) {
              break;
            }
          }
          return aeq;
        },
      });
      aeq.forEachProp = aeq.forEachProperty;
      aeq.forEachComposition = aeq.forEachComp;
      aeq.forEachRQItem = aeq.forEachRenderQueueItem;
      aeq.forEachOM = aeq.forEachOutputModule;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function hasAllAttributes(obj, attributes, not) {
        for (var attribute in attributes) {
          if (!attributes.hasOwnProperty(attribute)) {
            continue;
          }
          attributeValue = attributes[attribute];
          if (!obj.hasOwnProperty(attribute)) {
            throw new Error(
              "The attribute " +
                attribute +
                " does not exist on a " +
                typeof obj,
            );
          }
          var isSame = compare(attributeValue, obj[attribute]);
          if ((isSame && not) || (!isSame && not === false)) {
            return false;
          }
        }
        return true;
      }
      function compare(value, attribute) {
        if (value.type === "Array") {
          return valueInArray(value, attribute);
        } else {
          if (value.type === "RegExp") {
            return value.value.test(attribute);
          }
        }
        return value.value.toString() === attribute.toString();
      }
      function valueInArray(value, attribute) {
        for (var i = 0, il = value.value.length; i < il; i++) {
          if (compare(value.value[i], attribute)) {
            return true;
          }
        }
        return false;
      }
      aeq.select = function (selector, context) {
        function filterResults(arr) {
          if (part.props || part.pseudo) {
            return arr.filter(filter);
          }
          return arr;
        }
        function filter(obj) {
          var ret = true;
          if (part.props !== null) {
            if (!hasAllAttributes(obj, part.props, false)) {
              return false;
            }
          }
          if (!part.pseudo) {
            return true;
          }
          len = part.pseudo.length;
          for (var i = 0; i < len; i += 1) {
            pseudo = part.pseudo[i];
            if (pseudo.type === "not" || pseudo.type === "isnot") {
              ret = hasAllAttributes(obj, pseudo.props, true);
            } else {
              if (pseudo.type === "is" || pseudo.type === "has") {
                ret = hasAllAttributes(obj, pseudo.props, false);
              }
            }
            if (ret === false) {
              return false;
            }
          }
          return true;
        }
        var results = [];
        var parsedSelector = cssselector.parse(selector);
        var parts = parsedSelector;
        if (context !== undefined) {
          if (aeq.isString(context)) {
            results = aeq.select(context);
          } else {
            if (aeq.isArray(context)) {
              results = context;
            } else {
              results = [context];
            }
          }
        }
        while (parts.length > 0) {
          part = parts[0];
          var unshifted = false;
          switch (part.type) {
            case "activecomp":
              results = filterResults(
                aeq.arrayEx([aeq.getActiveComposition()]),
              );
              results.type = "comp";
              break;
            case "composition":
            case "comp":
              results = filterResults(aeq.getCompositions());
              results.type = "comp";
              break;
            case "layer":
              if (results.type === "comp" || aeq.isComp(results[0])) {
                results = filterResults(aeq.getLayers(results));
                results.type = "layer";
              } else {
                if (results.type !== "comp") {
                  parts.unshift({ type: "comp" });
                  unshifted = true;
                }
              }
              break;
            case "propertygroup":
            case "propgrp":
            case "propgroup":
              if (
                results.type === "layer" ||
                results.type === "propertygroup" ||
                aeq.isLayer(results[0]) ||
                aeq.isPropertyGroup(results[0])
              ) {
                results = filterResults(
                  aeq.getProperties(results, {
                    groups: true,
                    props: false,
                    separate: false,
                  }),
                );
                results.type = "propertygroup";
              } else {
                if (results.type !== "layer") {
                  parts.unshift({ type: "layer" });
                  unshifted = true;
                }
              }
              break;
            case "property":
            case "prop":
              if (
                results.type === "layer" ||
                results.type === "propertygroup" ||
                aeq.isLayer(results[0]) ||
                aeq.isPropertyGroup(results[0])
              ) {
                results = filterResults(
                  aeq.getProperties(results, { separate: false }),
                );
                results.type = "property";
              } else {
                if (results.type !== "layer") {
                  parts.unshift({ type: "layer" });
                  unshifted = true;
                }
              }
              break;
            case "effect":
              if (results.type === "layer" || aeq.isLayer(results[0])) {
                results = filterResults(aeq.getEffects(results));
                results.type = "effect";
              } else {
                if (results.type !== "layer") {
                  parts.unshift({ type: "layer" });
                  unshifted = true;
                }
              }
              break;
            case "key":
            case "keys":
              if (results.type === "property" || aeq.isProperty(results[0])) {
                results = filterResults(aeq.getKeys(results));
                results.type = "key";
              } else {
                if (results.type !== "property") {
                  parts.unshift({ type: "property" });
                  unshifted = true;
                }
              }
              break;
            case "item":
              results = filterResults(aeq.getItems());
              results.type = "item";
              break;
            default:
              throw new Error("Unrecognized token " + part.type);
          }
          if (!unshifted) {
            parts.shift();
          }
        }
        return aeq.arrayEx(results);
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        isAVLayer: function (o) {
          return o instanceof AVLayer;
        },
        isAeq: function (o) {
          return o instanceof Object && o.isAeq === true;
        },
        isApp: function (o) {
          return o instanceof Application;
        },
        isArray: function (o) {
          return o instanceof Array;
        },
        isBoolean: function (o) {
          return typeof o === "boolean";
        },
        isCameraLayer: function (o) {
          return o instanceof CameraLayer;
        },
        isComp: function (o) {
          return o instanceof CompItem;
        },
        isEmpty: function (o) {
          return o.length === undefined || o.length === 0;
        },
        isFile: function (o) {
          return o instanceof File;
        },
        isFolder: function (o) {
          return o instanceof Folder;
        },
        isFolderItem: function (o) {
          return o instanceof FolderItem;
        },
        isFootageItem: function (o) {
          return o instanceof FootageItem;
        },
        isFunc: function (o) {
          return o instanceof Function;
        },
        isLayer: function (o) {
          return (
            aeq.isAVLayer(o) ||
            aeq.isShapeLayer(o) ||
            aeq.isTextLayer(o) ||
            aeq.isCamera(o) ||
            aeq.isLight(o)
          );
        },
        isLightLayer: function (o) {
          return o instanceof LightLayer;
        },
        isMaskPropertyGroup: function (o) {
          return o instanceof MaskPropertyGroup;
        },
        isNullOrUndefined: function (o) {
          return o == null;
        },
        isNumber: function (o) {
          return typeof o === "number";
        },
        isObject: function (o) {
          return o instanceof Object;
        },
        isPanel: function (o) {
          return o instanceof Panel;
        },
        isPlainObject: function (obj) {
          if (obj === undefined || obj === null) {
            return false;
          }
          if (obj.toString() !== "[object Object]") {
            return false;
          }
          if (
            obj.constructor &&
            !obj.constructor.prototype.hasOwnProperty("isPrototypeOf")
          ) {
            return false;
          }
          return true;
        },
        isPrecomp: function (o) {
          if (!aeq.isLayer(o)) {
            return false;
          }
          return aeq.isComp(o.source);
        },
        isProperty: function (o) {
          return o instanceof Property;
        },
        isPropertyGroup: function (o) {
          return o instanceof PropertyGroup;
        },
        isShapeLayer: function (o) {
          return o instanceof ShapeLayer;
        },
        isString: function (o) {
          return typeof o === "string";
        },
        isTextLayer: function (o) {
          return o instanceof TextLayer;
        },
        isWindow: function (o) {
          return o instanceof Window;
        },
        reflect: function (obj) {
          var str = [];
          for (var m in obj) {
            if (obj.hasOwnProperty(m)) {
              str.push(obj[m].constructor.name + " " + m + "=" + obj[m]);
            }
          }
          return str.join();
        },
      });
      aeq.isBool = aeq.isBoolean;
      aeq.isNum = aeq.isNumber;
      aeq.isStr = aeq.isString;
      aeq.isObj = aeq.isObject;
      aeq.isArr = aeq.isArray;
      aeq.isFunction = aeq.isFunc;
      aeq.isComposition = aeq.isComp;
      aeq.isProp = aeq.isProperty;
      aeq.isDir = aeq.isDirectory = aeq.isFolder;
      aeq.isCamera = aeq.isCameraLayer;
      aeq.isLight = aeq.isLightLayer;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.error = function (err, args) {
        var callingFunction = /\s*function\s*([^(]*)/i.exec(err.source);
        callingFunction =
          callingFunction !== null && callingFunction[1] !== ""
            ? callingFunction[1]
            : "anonymous";
        alert(
          err.toString() +
            "\nScript File: " +
            File.decode(err.fileName).replace(/^.*[\\|\/]/, "") +
            "\nFunction: " +
            args ===
            undefined
            ? callingFunction
            : args.callee.name + (args === undefined) || args.length === 0
              ? ""
              : "\nArguments: " +
                Array.prototype.toString.call(args) +
                "\nError on Line: " +
                err.line.toString(),
        );
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.getModifiers = function () {
        return {
          alt: ScriptUI.environment.keyboardState.altKey,
          ctrl: ScriptUI.environment.keyboardState.ctrlKey,
          meta: ScriptUI.environment.keyboardState.metaKey,
          shift: ScriptUI.environment.keyboardState.shiftKey,
        };
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        createResourceFiles: function (resources, folder, extension) {
          if (!aeq.app.securityPrefEnabled()) {
            return false;
          }
          folder = aeq.getFolderObject(folder);
          extension = setDefault(extension, "");
          if (extension !== "" && extension.charAt(0) !== ".") {
            extension = "." + extension;
          }
          aeq.file.ensureFolderExists(folder);
          if (!folder.exists) {
            throw new Error(
              "Could not create resource folder: " + folder.fsname,
            );
          }
          var resourceFiles = {};
          aeq.forEach(resources, function (name, contents) {
            var filePath = aeq.file.joinPath(folder.fsName, name + extension);
            var file = new File(filePath);
            resourceFiles[name] = file;
            if (!file.exists || contents.length !== file.length) {
              file.encoding = "BINARY";
              file.open("w");
              var success = file.write(contents);
              if (!success) {
                if (file.error === "") {
                  resourceFiles[name] = null;
                } else {
                  resourceFiles[name] = new Error(
                    file.error,
                    file.fsName,
                    undefined,
                  );
                }
              }
              file.close();
            }
          });
          return resourceFiles;
        },
        getBinaryString: function (filePath) {
          var file = aeq.getFileObject(filePath);
          file.encoding = "BINARY";
          file.open("r");
          var fileData = file.read();
          file.close();
          var binaryString = fileData.toSource();
          binaryString = binaryString.replace(/^\(new String\("/, "");
          binaryString = binaryString.replace(/"\)\)$/, "");
          return binaryString;
        },
      });
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        getSystemInfo: function () {
          return $.os + " AE " + app.version + "/" + app.isoLanguage;
        },
        isMac: $.os.indexOf("Windows") === -1,
        isWindows: $.os.indexOf("Windows") !== -1,
      });
      aeq.isWin = aeq.isWindows;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        createUndoGroup: function (name, callback, args) {
          app.beginUndoGroup(name);
          if (!aeq.isArray(args)) {
            args = [args];
          }
          var value = callback.apply(null, args);
          app.endUndoGroup();
          return value;
        },
      });
      aeq.undoGroup = aeq.createUndoGroup;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.extend({
        propertyType: function (property) {
          return aeq.valueInObject(
            property.propertyType || property,
            PropertyType,
          );
        },
        valueInObject: function (value, obj) {
          for (var key in obj) {
            if (obj.hasOwnProperty(key)) {
              if (value === obj[key]) {
                return key;
              }
            }
          }
          return undefined;
        },
      });
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.app = aeq.extend(
        {},
        {
          ensureSecurityPrefEnabled: function () {
            if (!aeq.app.securityPrefEnabled()) {
              if (
                confirm(
                  'This script requires access to write files.\nGo to the "General" panel of the application preferences and ensure\n"Allow Scripts to Write Files and Access Network" is checked.\n\nOpen prefs now?',
                )
              ) {
                app.executeCommand(2359);
              }
              if (!aeq.app.securityPrefEnabled()) {
                throw new Error(
                  "Security preference is not enabled! Can\'t continue.",
                );
              }
            }
          },
          extend: aeq.extend,
          getAEP: function () {
            return app.project.file;
          },
          getAEPDir: function () {
            var aepFile = aeq.app.getAEP();
            if (!aepFile) {
              return null;
            }
            return aeq.getFolder(aepFile.path);
          },
          getAEPName: function () {
            var aepFile = aeq.app.getAEP();
            if (!aepFile) {
              return null;
            }
            return aeq.file.stripExtension(aepFile.displayName);
          },
          getPresetsPaths: function () {
            var appVersion = aeq.app.version;
            var versionPrettyName = "";
            if (parseInt(appVersion) === 11) {
              versionPrettyName = "CS6";
            } else {
              if (parseInt(appVersion) === 12) {
                versionPrettyName = "CC";
              } else {
                if (appVersion >= 13 && appVersion < 13.5) {
                  versionPrettyName = "CC 2014";
                } else {
                  if (appVersion >= 13.5 && appVersion < 14) {
                    versionPrettyName = "CC 2015";
                  } else {
                    if (appVersion >= 14) {
                      versionPrettyName = "CC 2017";
                    }
                  }
                }
              }
            }
            return [
              Folder.current.fullName + "/Presets/",
              Folder.myDocuments.fullName +
                "/Adobe/After Effects " +
                versionPrettyName +
                "/User Presets/",
            ];
          },
          getScriptFile: function () {
            return aeq.getFile($.fileName);
          },
          getUserDataFolder: function () {
            return Folder.userData;
          },
          open: function (filePath) {
            var file = aeq.getFile(filePath);
            if (file) {
              return app.open(file);
            }
            return app.open();
          },
          securityPrefEnabled: function () {
            return (
              app.preferences.getPrefAsLong(
                "Main Pref Section",
                "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
              ) === 1
            );
          },
          toString: function () {
            return "[object aeq.App]";
          },
          version: parseFloat(app.version),
        },
      );
      aeq.open = aeq.app.open;
      aeq.AEversion = aeq.app.version;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.command = aeq.extend(
        {},
        {
          call: function (windows, mac, arg) {
            if (aeq.isObject(arguments[0])) {
              var args = arguments[0];
              windows = setDefault(args.win, args.windows);
              mac = setDefault(args.mac, args.osx);
              arg = args.arg;
            }
            var command = mac;
            if (aeq.isWindows) {
              command = windows;
            }
            arg = arg === undefined ? "" : " " + arg;
            return system.callSystem(command + arg);
          },
          copyToClipboard: function (text) {
            aeq.command.call(
              'cmd.exe /c cmd.exe /c "echo ' + text + ' | clip"',
              'echo "' + text + '" | pbcopy',
            );
          },
          extend: aeq.extend,
          openURL: function (URL) {
            try {
              if (URL.match(/^https?:\/\//) === null) {
                URL = "http://" + URL;
              }
              aeq.command.call({
                arg: URL,
                mac: "open",
                win: 'cmd /c "explorer',
              });
            } catch (err) {
              alert("Error in openURL function\n" + err.toString());
            }
          },
          revealFile: function (filePath) {
            if (aeq.isFile(filePath)) {
              filePath = filePath.fsName;
            }
            return aeq.command.call(
              "Explorer /select,",
              "open -R",
              '"' + filePath + '"',
            );
          },
          toString: function () {
            return "[object aeq.command]";
          },
        },
      );
      aeq.callSystem = aeq.command.call;
      aeq.openURL = aeq.command.openURL;
      aeq.revealFile = aeq.command.revealFile;
      aeq.copyToClipboard = aeq.command.copyToClipboard;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.comp = aeq.extend(
        {},
        {
          create: function (folder, options) {
            if (!aeq.isFolderItem(folder)) {
              options = setDefault(folder, {});
              folder = setDefault(options.folder, app.project);
            }
            var defaultOptions = {
              duration: 1,
              frameRate: 24,
              height: 1080,
              name: "Comp",
              pixelAspect: 1,
              width: 1920,
            };
            options = aeq.extend(defaultOptions, options);
            return folder.items.addComp(
              options.name,
              options.width,
              options.height,
              options.pixelAspect,
              options.duration,
              options.frameRate,
            );
          },
          extend: aeq.extend,
          getCompInQueue: function (comp, queuedOnly) {
            if (aeq.isNullOrUndefined(queuedOnly)) {
              queuedOnly = true;
            }
            if (queuedOnly) {
              queuedItems = aeq.renderqueue.getQueuedItems();
            } else {
              queuedItems = aeq.renderqueue.getRQItems();
            }
            return aeq.filter(queuedItems, function (item) {
              return item.comp.id === comp.id;
            });
          },
          isInQueue: function (comp) {
            if (!aeq.isComp(comp)) {
              return null;
            }
            var items = aeq.renderqueue.getRQItems();
            return items.some(function (item) {
              return item.comp.id === comp.id;
            });
          },
          isQueued: function (comp) {
            return aeq.comp.getCompInQueue(comp, true).length > 0;
          },
          toString: function () {
            return "[object aeq.comp]";
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.file = aeq.extend(
        {},
        {
          ensureFolderExists: function (folderPath) {
            var folder = aeq.getFolderObject(folderPath);
            if (!folder.exists) {
              folder.create();
            }
            return folder;
          },
          extend: aeq.extend,
          getExtension: function (filePath) {
            var filePathStr = aeq.isFile(filePath) ? filePath.name : filePath;
            return filePathStr.substr(
              filePathStr.lastIndexOf(".") + 1,
              filePathStr.length,
            );
          },
          getFile: function (filePath) {
            var file = aeq.getFileObject(filePath);
            if (!file.exists) {
              return null;
            }
            return file;
          },
          getFileObject: function (filePath) {
            return aeq.isFile(filePath) ? filePath : new File(filePath);
          },
          getFiles: function (folderPath, filter) {
            filter = setDefault(filter, "");
            var folder = aeq.getFolder(folderPath);
            files = folder.getFiles(filter);
            if (files === null || files.length === 0) {
              return null;
            }
            return aeq.arrayEx(files);
          },
          getFilesRecursive: function (folder, filter) {
            var foundItems = aeq.arrayEx();
            var folderObject = aeq.file.getFolder(folder);
            if (aeq.isNullOrUndefined(folderObject)) {
              return foundItems;
            }
            var folderFiles = aeq.file.getFiles(folderObject);
            if (aeq.isNullOrUndefined(folderFiles)) {
              return foundItems;
            }
            folderFiles
              .filter(function (item) {
                return aeq.isFolder(item);
              })
              .forEach(function (folderItem) {
                foundItems = foundItems.concat(
                  aeq.file.getFilesRecursive(folderItem, filter),
                );
              });
            var filesInFolder = aeq.file.getFiles(folderObject, filter);
            if (!aeq.isNullOrUndefined(filesInFolder)) {
              foundItems = foundItems.concat(filesInFolder);
            }
            return aeq.arrayEx(foundItems);
          },
          getFolder: function (folderPath) {
            var folder = aeq.getFolderObject(folderPath);
            if (!folder.exists) {
              return null;
            }
            return folder;
          },
          getFolderObject: function (folderPath) {
            return aeq.isFolder(folderPath)
              ? folderPath
              : new Folder(folderPath);
          },
          joinPath: function () {
            var paths = Array.prototype.slice.call(arguments, 0);
            return aeq.file.normalizePath(
              aeq
                .filter(paths, function (p, index) {
                  if (p && typeof p.fsName === "string") {
                    p = p.fsName;
                    paths[index] = p;
                  }
                  if (typeof p !== "string") {
                    throw new TypeError(
                      "Arguments to path.join must be strings, Files or Folders",
                    );
                  }
                  return p;
                })
                .join(aeq.file.pathSeparatorSymbol),
            );
          },
          normalizePath: function (path) {
            var pathIsAbsolute = aeq.file.pathIsAbsolute(path);
            var trailingSlash =
              path.substr(-1) === aeq.file.pathSeparatorSymbol;
            var splitPath = path.split(aeq.file.pathSeparatorSymbol);
            var filteredPath = aeq.filter(splitPath, function (p) {
              return !!p;
            });
            path = aeq.file.normalizePathArray(filteredPath, !pathIsAbsolute);
            path = path.join(aeq.file.pathSeparatorSymbol);
            if (!path && !pathIsAbsolute) {
              path = ".";
            }
            if (path && trailingSlash) {
              path += aeq.file.pathSeparatorSymbol;
            }
            return pathIsAbsolute ? aeq.file.pathSeparatorSymbol : "" + path;
          },
          normalizePathArray: function (parts, allowAboveRoot) {
            var up = 0;
            for (var i = parts.length - 1; i >= 0; i--) {
              var last = parts[i];
              if (last === ".") {
                parts.splice(i, 1);
              } else {
                if (last === "..") {
                  parts.splice(i, 1);
                  up++;
                } else {
                  if (up) {
                    parts.splice(i, 1);
                    up--;
                  }
                }
              }
            }
            if (allowAboveRoot) {
              for (; up--; up) {
                parts.unshift("..");
              }
            }
            return parts;
          },
          pathIsAbsolute: function (path) {
            return path.charAt(0) === aeq.file.pathSeparatorSymbol;
          },
          pathSeparatorSymbol: $.os.indexOf("Windows") > -1 ? "\\" : "/",
          readFile: function (filePath, encoding) {
            var file = aeq.getFileObject(filePath);
            encoding = setDefault(encoding, "UTF-8");
            if (file.exists) {
              if (File.isEncodingAvailable(encoding)) {
                file.encoding = encoding;
              }
              file.open();
              contents = file.read();
              file.close();
              return contents;
            }
            return null;
          },
          selectFiles: function (extensionList, multiSelect) {
            multiSelect = aeq.setDefault(multiSelect, false);
            var message = multiSelect
              ? "Please select multiple files"
              : "Please select file";
            if (!aeq.isArray(extensionList)) {
              extensionList = [extensionList];
            }
            var getFilterForFiles = function () {
              if (aeq.isWin) {
                return "*." + extensionList.join(";*.");
              }
              var extensionListRe = ".(" + extensionList.join("|") + ")$";
              var re = new RegExp(extensionListRe, "i");
              return function (file) {
                return (
                  file.name.match(re) || file.constructor.name === "Folder"
                );
              };
            };
            var files = File.openDialog(
              message,
              getFilterForFiles(),
              multiSelect,
            );
            if (aeq.isNullOrUndefined(files)) {
              return null;
            }
            if (!aeq.isArray(files)) {
              files = [files];
            }
            return aeq.arrayEx(files);
          },
          stripExtension: function (filePath) {
            var filePathStr = aeq.isFile(filePath) ? filePath.name : filePath;
            return filePathStr.substr(0, filePathStr.lastIndexOf("."));
          },
          toString: function () {
            return "[object aeq.file]";
          },
          writeFile: function (filePath, contents, options) {
            var file = aeq.getFileObject(filePath);
            options = aeq.setDefault(options, {});
            if (file.exists && options.overwrite === false) {
              return null;
            }
            if (!file.exists) {
              aeq.file.ensureFolderExists(file.path);
            }
            if (
              !aeq.isNullOrUndefined(options.encoding) &&
              File.isEncodingAvailable(options.encoding)
            ) {
              file.encoding = options.encoding;
            }
            file.open("w");
            var success = file.write(contents);
            file.close();
            if (success) {
              return file;
            }
            return null;
          },
        },
      );
      aeq.pathSeparatorSymbol = aeq.file.pathSeparatorSymbol;
      aeq.getFileObject = aeq.file.getFileObject;
      aeq.getFolderObject = aeq.file.getFolderObject;
      aeq.getFile = aeq.file.get = aeq.file.getFile;
      aeq.getFiles = aeq.file.getFiles;
      aeq.getFilesRecursive = aeq.file.getFilesRecursive;
      aeq.getFolder = aeq.file.getFolder;
      aeq.readFile = aeq.file.readFile;
      aeq.writeFile = aeq.file.writeFile;
      aeq.selectFiles = aeq.file.selectFiles;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.layer = aeq.extend(
        {},
        {
          allChildren: function (parentLayer) {
            var allChildren = [];
            var children = aeq.layer.children(parentLayer);
            aeq.forEach(children, function (layer) {
              allChildren.push(layer);
              allChildren = allChildren.concat(aeq.layer.allChildren(layer));
            });
            return aeq.arrayEx(allChildren);
          },
          children: function (parentLayer) {
            var layers = aeq.getLayers(parentLayer.containingComp);
            return layers.filter(function (layer) {
              return layer.parent === parentLayer;
            });
          },
          copyLayerToggles: function (sourceLayer, destLayer) {
            var switches =
              "enabled solo shy quality effectsActive motionBlur adjustmentLayer threeDLayer blendingMode preserveTransparency parent inPoint stretch startTime outPoint label guideLayer name comment autoOrient";
            switches = switches.split(" ");
            aeq.forEach(switches, function (switchName) {
              destLayer[switchName] = sourceLayer[switchName];
            });
          },
          extend: aeq.extend,
          parents: function (childLayer) {
            var parents = aeq.arrayEx();
            var layer = childLayer;
            while (layer.parent !== null) {
              parents.push(layer.parent);
              layer = layer.parent;
            }
            return parents;
          },
          relatedLayers: function (root) {
            var parents = aeq.layer.parents(root);
            var children = aeq.layer.allChildren(root);
            var all = parents.push.apply(parents, children);
            return aeq.arrayEx(all);
          },
          toString: function () {
            return "[object aeq.layer]";
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.project = aeq.extend(
        {},
        {
          extend: aeq.extend,
          findFolder: function (name, parentFolder) {
            var folders = aeq.project.getFolders(parentFolder);
            var folder = aeq.filter(folders, function (folder) {
              return folder.name === name;
            });
            if (folder.length) {
              return folder[0];
            }
            return null;
          },
          getFolder: function (folder, parentFolder) {
            if (aeq.isFolderItem(folder)) {
              return folder;
            }
            if (aeq.isString(folder)) {
              return aeq.project.findFolder(folder, parentFolder);
            }
            return null;
          },
          getFolderOrRoot: function (folder) {
            folder = aeq.project.getFolder(folder);
            if (aeq.isNullOrUndefined(folder)) {
              return app.project.rootFolder;
            }
            return folder;
          },
          getFolders: function (parentFolder) {
            var folders = aeq.getItems(parentFolder);
            return folders.filter(aeq.isFolderItem);
          },
          getFootage: function (parentFolder) {
            var items = aeq.getItems(parentFolder);
            return items.filter(aeq.isFootageItem);
          },
          getOrCreateFolder: function (folder, parentFolder) {
            if (aeq.isNullOrUndefined(parentFolder)) {
              parentFolder = app.project.rootFolder;
            } else {
              parentFolder = aeq.project.getOrCreateFolder(parentFolder);
            }
            var foundFolder = aeq.project.getFolder(folder, parentFolder);
            if (aeq.isNullOrUndefined(foundFolder)) {
              return parentFolder.items.addFolder(folder);
            }
            return foundFolder;
          },
          getSelectedComps: function () {
            return aeq.filter(app.project.selection, aeq.isComp);
          },
          getSelectedCompsOrAll: function () {
            if (aeq.isEmpty(app.project.selection)) {
              return aeq.getCompositions();
            }
            return aeq.project.getSelectedComps();
          },
          getSelectedFolders: function () {
            return aeq.filter(app.project.selection, aeq.isFolderItem);
          },
          getSelectedFootage: function () {
            return aeq.filter(app.project.selection, aeq.isFootageItem);
          },
          importFile: function (file, folder, options) {
            var proj = app.project;
            var newFile = aeq.getFile(file);
            if (!aeq.isFile(newFile)) {
              throw new Error(file + " is not a valid file!");
            }
            if (aeq.isNullOrUndefined(folder)) {
              folder = app.project.rootFolder;
            } else {
              folder = aeq.project.getOrCreateFolder(folder);
            }
            options = setDefault(options, {});
            var iO = new ImportOptions(newFile);
            if (options.sequence === true) {
              iO.sequence = true;
            }
            try {
              newItem = proj.importFile(iO);
            } catch (e) {
              throw new Error(
                "Can\'t import file " + newFile.name + "\n" + String(e),
              );
            }
            if (newItem.duration * newItem.frameRate === 1) {
              newItem.replace(file);
            }
            newItem.parentFolder = folder;
            newItem.selected = false;
            return newItem;
          },
          importFiles: function (fileArray, folder, options) {
            var importedItems = aeq.arrayEx();
            aeq.forEach(fileArray, function (file) {
              var item = aeq.importFile(file, folder, options);
              importedItems.push(item);
            });
            return importedItems;
          },
          importSequence: function (file, folder) {
            return aeq.importFile(file, folder, { sequence: true });
          },
          moveToFolder: function (items, folder) {
            folder = aeq.project.getFolder(folder);
            if (!aeq.isArray(items)) {
              items = [items];
            }
            aeq.forEach(items, function (item) {
              item.parentFolder = folder;
              item.selected = false;
            });
          },
          quickSave: function () {
            var file = aeq.app.getAEP();
            return app.project.save(file);
          },
          reduceToQueuedComps: function () {
            var queuedComps = aeq.renderqueue.getQueuedComps();
            if (queuedComps.length === 0) {
              return null;
            }
            app.project.reduceProject(queuedComps);
            return queuedComps;
          },
          save: function (path) {
            if (!path) {
              return app.project.save();
            }
            var file = aeq.getFileObject(path);
            if (file.exists) {
              if (!confirm("File exists! Overwrite?")) {
                return null;
              }
            }
            return app.project.save(file);
          },
          simpleImportFile: function (file, options) {
            var iO = new ImportOptions(file);
            options = setDefault(options, {});
            if (options.sequence === true) {
              iO.sequence = true;
            }
            try {
              newItem = app.project.importFile(iO);
            } catch (e) {
              throw new Error(
                "Can\'t import file " + file.name + "\n" + String(e),
              );
            }
            return newItem;
          },
          toString: function () {
            return "[object aeq.project]";
          },
        },
      );
      aeq.save = aeq.project.save;
      aeq.quickSave = aeq.project.quickSave;
      aeq.importFile = aeq.project.importFile;
      aeq.importFiles = aeq.project.importFiles;
      aeq.importSequence = aeq.project.importSequence;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.property = aeq.extend(
        {},
        {
          extend: aeq.extend,
          getLayer: function (property) {
            var depth = property.propertyDepth;
            return property.propertyGroup(depth);
          },
          toString: function () {
            return "[object aeq.property]";
          },
          type: function (property) {
            return aeq.valueInObject(
              property.propertyType || property,
              PropertyType,
            );
          },
          valueType: function (property) {
            return aeq.valueInObject(
              property.propertyValueType || property,
              PropertyValueType,
            );
          },
        },
      );
      aeq.prop = aeq.property;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.renderqueue = aeq.extend(
        {},
        {
          clear: function () {
            var items = aeq.renderqueue.getRQItems();
            items = items.reverse();
            items.forEach(function (item) {
              item.remove();
            });
          },
          ensureRenderPathExists: function (outputModule) {
            aeq.app.ensureSecurityPrefEnabled();
            aeq.file.ensureFolderExists(outputModule.file.parent);
          },
          extend: aeq.extend,
          getQueuedComps: function () {
            var queuedItems = aeq.renderqueue.getQueuedItems();
            var compIDs = {};
            var comps = [];
            queuedItems.forEach(function (item) {
              var comp = item.comp;
              var compID = comp.id;
              if (compIDs[compID] === undefined) {
                compIDs[compID] = true;
                comps.push(comp);
              }
            });
            return aeq.arrayEx(comps);
          },
          getQueuedItems: function () {
            var items = aeq.renderqueue.getRQItems();
            return items.filter(function (item) {
              return aeq.renderqueue.isQueued(item);
            });
          },
          getRQComps: function () {
            var rqItems = aeq.renderqueue.getRQItems();
            var compIDs = {};
            var comps = [];
            rqItems.forEach(function (item) {
              var comp = item.comp;
              var compID = comp.id;
              if (compIDs[compID] === undefined) {
                compIDs[compID] = true;
                comps.push(comp);
              }
            });
            return aeq.arrayEx(comps);
          },
          getRQItems: function () {
            return aeq.arrayEx(
              aeq.normalizeCollection(app.project.renderQueue.items),
            );
          },
          getSettings: function (renderItem) {
            return renderItem.getSettings(GetSettingsFormat.STRING);
          },
          isQueued: function (rqItem) {
            return rqItem.status === RQItemStatus.QUEUED;
          },
          omTemplateExists: function (templateName) {
            var tempComp = aeq.comp.create();
            var tempRQItem = aeq.renderqueue.queue(tempComp);
            var templates = aeq.arrayEx(tempRQItem.outputModule(1).templates);
            var templateExists = templates.some(function (template) {
              return template === templateName;
            });
            tempRQItem.remove();
            tempComp.remove();
            return templateExists;
          },
          queue: function (item) {
            return app.project.renderQueue.items.add(item);
          },
          rqTemplateExists: function (templateName) {
            var tempComp = aeq.comp.create();
            var tempRQItem = aeq.renderqueue.queue(tempComp);
            var templates = aeq.arrayEx(tempRQItem.templates);
            var templateExists = templates.some(function (template) {
              return template === templateName;
            });
            tempRQItem.remove();
            tempComp.remove();
            return templateExists;
          },
          toString: function () {
            return "[object aeq.RenderQueue]";
          },
          unqueueAll: function () {
            var items = aeq.renderqueue.getRQItems();
            items.forEach(function (item) {
              if (
                item.status !== RQItemStatus.USER_STOPPED &&
                item.status !== RQItemStatus.ERR_STOPPED &&
                item.status !== RQItemStatus.RENDERING &&
                item.status !== RQItemStatus.DONE
              ) {
                item.render = false;
              }
            });
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.settings = aeq.extend(
        {},
        {
          extend: aeq.extend,
          get: function (sectionName, keyName) {
            if (aeq.settings.have(sectionName, keyName)) {
              return app.settings.getSetting(sectionName, keyName);
            }
            return undefined;
          },
          getAsArray: function (sectionName, keyName) {
            return aeq.settings.get(sectionName, keyName).split(",");
          },
          getAsBool: function (sectionName, keyName) {
            var value = aeq.settings.get(sectionName, keyName);
            if (value === "true") {
              return true;
            } else {
              if (value === "false") {
                return false;
              }
            }
            return undefined;
          },
          getAsFloat: function (sectionName, keyName) {
            return parseFloat(aeq.settings.get(sectionName, keyName));
          },
          getAsInt: function (sectionName, keyName) {
            return parseInt(aeq.settings.get(sectionName, keyName));
          },
          have: function (sectionName, keyName) {
            return app.settings.haveSetting(sectionName, keyName);
          },
          initSetting: function (sectionName, keyName, value, overwrite) {
            overwrite = setDefault(overwrite, false);
            if (!aeq.settings.have(sectionName, keyName) || overwrite) {
              aeq.settings.save(sectionName, keyName, value);
            }
            return aeq.settings.get(sectionName, keyName);
          },
          save: function (sectionName, keyName, value) {
            app.settings.saveSetting(sectionName, keyName, value);
          },
          setting: function (sectionName, keyName, value) {
            if (value !== undefined) {
              aeq.settings.save(sectionName, keyName, value);
              return aeq;
            }
            return aeq.settings.get(sectionName, keyName);
          },
          toString: function () {
            return "[object aeq.settings]";
          },
          unpack: function (sectionName, keyNames) {
            ret = aeq.isObject(keyNames) ? keyNames : {};
            aeq.forEach(keyNames, function (keyName) {
              if (app.settings.haveSetting(sectionName, keyName)) {
                ret[keyName] = app.settings.getSetting(sectionName, keyName);
              }
            });
            return ret;
          },
        },
      );
      aeq.saveSetting = aeq.setSetting = aeq.settings.set = aeq.settings.save;
      aeq.getSetting = aeq.settings.get;
      aeq.getSettingAsBool = aeq.settings.getAsBool;
      aeq.getSettingAsArray = aeq.settings.getAsArray;
      aeq.getSettingAsFloat = aeq.settings.getAsFloat;
      aeq.getSettingAsInt = aeq.settings.getAsInt;
      aeq.haveSetting = aeq.settings.have;
      aeq.unpackSettings =
        aeq.loadSettings =
        aeq.settings.load =
          aeq.settings.unpack;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function getCompWithAlert() {
        var comp = aeq.getActiveComp();
        if (comp === null) {
          alert("No Comp selected");
        }
        return comp;
      }
      function getSelectedLayersWithAlert(comp) {
        if (comp.selectedLayers.length === 0) {
          alert("No layers selected");
          return null;
        }
        return comp.selectedLayers;
      }
      function getSelectedPropertiesWithAlert(comp) {
        if (comp.selectedProperties.length === 0) {
          alert("No properties selected");
          return null;
        }
        return comp.selectedProperties;
      }
      aeq.snippet = aeq.extend(
        {},
        {
          activeComp: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            return aeq.createUndoGroup(undoGroup, callback, [comp]);
          },
          extend: aeq.extend,
          forEachSelectedLayer: function (undoGroup, callback) {
            return aeq.snippet.selectedLayers(undoGroup, function (layers) {
              layers.forEach(callback);
              return layers;
            });
          },
          forEachSelectedLayerOrAll: function (undoGroup, callback) {
            return aeq.snippet.selectedLayersOrAll(
              undoGroup,
              function (layers) {
                layers.forEach(callback);
                return layers;
              },
            );
          },
          forEachSelectedProperty: function (undoGroup, callback) {
            return aeq.snippet.selectedProperties(undoGroup, function (props) {
              props.forEach(callback);
              return props;
            });
          },
          selectedLayers: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            var layers = getSelectedLayersWithAlert(comp);
            if (layers === null) {
              return false;
            }
            layers = aeq.arrayEx(layers);
            return aeq.createUndoGroup(undoGroup, callback, [layers, comp]);
          },
          selectedLayersOrAll: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            var layers = aeq.getSelectedLayersOrAll(comp);
            layers = aeq.arrayEx(layers);
            return aeq.createUndoGroup(undoGroup, callback, [layers, comp]);
          },
          selectedProperties: function (undoGroup, callback) {
            var comp = getCompWithAlert();
            if (comp === null) {
              return false;
            }
            var props = getSelectedPropertiesWithAlert(comp);
            if (props === null) {
              return false;
            }
            props = aeq.arrayEx(props);
            return aeq.createUndoGroup(undoGroup, callback, [props, comp]);
          },
          setOrGetDefault: function (value, defaultVal) {
            if (typeof value !== "undefined") {
              return value;
            }
            if (typeof defaultVal === "function") {
              return defaultVal();
            }
            return defaultVal;
          },
          toString: function () {
            return "[object aeq.snippet]";
          },
        },
      );
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      var arrayEx = {
        attr: function () {
          [].unshift.call(arguments, this);
          return aeq.attr.apply(this, arguments);
        },
        every: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (!callback(this[i], i, this)) {
              return false;
            }
          }
          return true;
        },
        filter: function (callback) {
          var filteredArr = [];
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              filteredArr.push(this[i]);
            }
          }
          return aeq.arrayEx(filteredArr);
        },
        find: function (callback, def) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              return this[i];
            }
          }
          return def;
        },
        findIndex: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              return i;
            }
          }
          return -1;
        },
        first: function () {
          if (this.length === 0) {
            throw new Error("There are no items in this array");
          }
          return this[0];
        },
        forEach: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            callback(this[i], i, this);
          }
        },
        groupBy: function (callback) {
          var obj = {};
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            var key = callback(this[i], i, this) || "undefined";
            var arr = obj[key] || [];
            arr.push(this[i]);
            obj[key.toString()] = arr;
          }
          return obj;
        },
        indexOf: function (searchElement, fromIndex) {
          if (this === null) {
            throw new TypeError('"this" is null or not defined');
          }
          var o = Object(this);
          var len = o.length >>> 0;
          if (len === 0) {
            return -1;
          }
          var n = fromIndex || 0;
          if (Math.abs(n) === Infinity) {
            n = 0;
          }
          if (n >= len) {
            return -1;
          }
          k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
          while (k < len) {
            if (k in o && o[k] === searchElement) {
              return k;
            }
            k++;
          }
          return -1;
        },
        insertAt: function (insert, index) {
          this.splice(index, 0, insert);
        },
        map: function (callback) {
          var selectedArr = [];
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            selectedArr.push(callback(this[i], i, this));
          }
          return aeq.arrayEx(selectedArr);
        },
        some: function (callback) {
          var len = this.length;
          for (var i = 0; i < len; i += 1) {
            if (callback(this[i], i, this)) {
              return true;
            }
          }
          return false;
        },
      };
      aeq.arrayEx = function (arr) {
        arr = setDefault(arr, []);
        if (arr._init) {
          return arr;
        }
        arr._init = true;
        arr.isAeq = true;
        aeq.extend(arr, arrayEx);
        return arr;
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.Comp = function (comp) {
        if (comp instanceof aeq.Comp) {
          return comp;
        }
        if (this instanceof aeq.Comp) {
          this.comp = comp;
        } else {
          return new aeq.Comp(comp);
        }
      };
      aeq.Comp.prototype = {
        extend: aeq.extend,
        forEachLayer: function (callback) {
          var length = this.comp.numLayers;
          var i = 1;
          for (; i <= length; i++) {
            callback(this.comp.layer(i), i, this);
          }
        },
        get: function () {
          return this.comp;
        },
        isAeq: true,
        toString: function () {
          return "[object aeq.Comp]";
        },
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.Key = function (property, index) {
        if (this instanceof aeq.Key) {
          if (property instanceof aeq.Property) {
            property = property.get();
          }
          if (index <= 0 || index > property.numKeys) {
            throw new Error(
              "Index " + index + " out of range 1-" + property.numKeys,
            );
          }
          this.property = property;
          this.index = index;
          this.originalTime = this.getTime();
        } else {
          return new aeq.Key(property, index);
        }
      };
      aeq.Key.prototype = {
        checkKey: function () {
          if (
            this.index <= this.property.numKeys &&
            this.getTime() === this.originalTime
          ) {
            return;
          }
          var newIndex = this.property.nearestKeyIndex(this.originalTime);
          if (this.property.keyTime(newIndex) === this.originalTime) {
            this.index = newIndex;
          } else {
            throw new Error("Original key has been deleted/moved");
          }
        },
        copyTo: function (targetProp, time, offset) {
          var keyInfo = this.getKeyInfo();
          keyInfo.time = time === undefined ? keyInfo.time : time;
          offset = offset === undefined ? 0 : offset;
          keyInfo.time += offset;
          if (targetProp.isAeq) {
            targetProp = targetProp.get();
          }
          keyInfo.property = targetProp;
          return aeq.pasteKey(keyInfo);
        },
        extend: aeq.extend,
        getKeyInfo: function () {
          this.checkKey();
          var keyInfo = {
            interpolationType: this.interpolationType(),
            property: this.property,
            time: this.time(),
            value: this.value(),
          };
          if (
            keyInfo.interpolationType.inType ===
              KeyframeInterpolationType.BEZIER &&
            keyInfo.interpolationType.outType ===
              KeyframeInterpolationType.BEZIER
          ) {
            keyInfo.temporalAutoBezier = this.temporalAutoBezier();
            keyInfo.temporalContinuous = this.temporalContinuous();
          }
          if (
            keyInfo.interpolationType.outType !== KeyframeInterpolationType.HOLD
          ) {
            keyInfo.temporalEase = this.temporalEase();
          }
          if (
            this.valueTypeIs("TwoD_SPATIAL") ||
            this.valueTypeIs("ThreeD_SPATIAL")
          ) {
            keyInfo.spatialAutoBezier = this.spatialAutoBezier();
            keyInfo.spatialContinuous = this.spatialContinuous();
            keyInfo.spatialTangent = this.spatialTangent();
            keyInfo.roving = this.roving();
          }
          return keyInfo;
        },
        getTime: function () {
          return this.property.keyTime(this.index);
        },
        interpolationType: function (inType, outType) {
          this.checkKey();
          if (arguments.length === 0) {
            return {
              inType: this.property.keyInInterpolationType(this.index),
              outType: this.property.keyOutInterpolationType(this.index),
            };
          }
          if (outType === undefined && inType.outType) {
            outType = inType.outType;
          }
          if (inType.inType) {
            inType = inType.inType;
          }
          if (aeq.isString(inType)) {
            inType = KeyframeInterpolationType[inType];
          }
          if (outType && aeq.isString(outType)) {
            outType = KeyframeInterpolationType[outType];
          } else {
            if (outType === undefined) {
              outType = inType;
            }
          }
          if (
            !this.property.isInterpolationTypeValid(inType) ||
            (outType && !this.property.isInterpolationTypeValid(outType))
          ) {
            return false;
          }
          this.property.setInterpolationTypeAtKey(this.index, inType, outType);
          return true;
        },
        isAeq: true,
        moveTo: function (time) {
          var thisTime = this.time();
          if (time === thisTime) {
            return;
          }
          var newKey = this.copyTo(this.property, time);
          this.remove();
          this.index = this.property.nearestKeyIndex(newKey.time());
          this.originalTime = time;
        },
        remove: function () {
          this.checkKey();
          this.property.removeKey(this.index);
        },
        spatialTangent: function (inType, outType) {
          this.checkKey();
          if (arguments.length === 0) {
            return {
              inTangent: this.property.keyInSpatialTangent(this.index),
              outTangent: this.property.keyOutSpatialTangent(this.index),
            };
          }
          if (outType === undefined && inType.outTangent) {
            outType = inType.outTangent;
          }
          if (inType.inTangent) {
            inType = inType.inTangent;
          }
          this.property.setSpatialTangentsAtKey(this.index, inType, outType);
        },
        temporalEase: function (inType, outType) {
          this.checkKey();
          if (arguments.length === 0) {
            return {
              inEase: this.property.keyInTemporalEase(this.index),
              outEase: this.property.keyOutTemporalEase(this.index),
            };
          }
          if (outType === undefined && inType.outEase) {
            outType = inType.outEase;
          }
          if (inType.inEase) {
            inType = inType.inEase;
          }
          if (!aeq.isArray(inType)) {
            if (this.valueTypeIs("TwoD")) {
              inType = [inType, inType];
            } else {
              if (this.valueTypeIs("ThreeD")) {
                inType = [inType, inType, inType];
              } else {
                inType = [inType];
              }
            }
          }
          if (outType && !aeq.isArray(outType)) {
            if (this.valueTypeIs("TwoD")) {
              outType = [outType, outType];
            } else {
              if (this.valueTypeIs("ThreeD")) {
                outType = [outType, outType, outType];
              } else {
                outType = [outType];
              }
            }
          }
          this.property.setTemporalEaseAtKey(this.index, inType, outType);
        },
        time: function () {
          this.checkKey();
          return this.originalTime;
        },
        toString: function () {
          return "[object aeq.Key]";
        },
        valueTypeIs: function valueTypeIs(type) {
          return this.property.propertyValueType === PropertyValueType[type];
        },
      };
      aeq.forEach(
        [
          "roving",
          "selected",
          "spatialAutoBezier",
          "spatialContinuous",
          "temporalAutoBezier",
          "temporalContinuous",
          "value",
        ],
        function (type) {
          var typeCapitalized = type.charAt(0).toUpperCase() + type.slice(1);
          var getter = "key" + typeCapitalized;
          var setter = "set" + typeCapitalized + "AtKey";
          aeq.Key.prototype[type] = function () {
            this.checkKey();
            if (arguments.length === 0) {
              return this.property[getter](this.index);
            }
            [].unshift.call(arguments, this.index);
            this.property[setter].apply(this.property, arguments);
          };
        },
      );
      aeq.pasteKey = function (keyInfo) {
        var keyIndex = keyInfo.property.addKey(keyInfo.time);
        var key = new aeq.Key(keyInfo.property, keyIndex);
        if (
          keyInfo.property.value.length === 2 &&
          aeq.isArray(keyInfo.value) &&
          keyInfo.value.length === 3
        ) {
          keyInfo.value = [keyInfo.value[0], keyInfo.value[1]];
          var spatialTangent = keyInfo.spatialTangent;
          keyInfo.spatialTangent = {
            inTangent: [
              spatialTangent.inTangent[0],
              spatialTangent.inTangent[1],
            ],
            outTangent: [
              spatialTangent.outTangent[0],
              spatialTangent.outTangent[1],
            ],
          };
        }
        key.value(keyInfo.value);
        if (keyInfo.temporalEase !== undefined) {
          key.temporalEase(keyInfo.temporalEase);
        }
        key.interpolationType(keyInfo.interpolationType);
        if (
          keyInfo.temporalAutoBezier !== undefined &&
          keyInfo.temporalContinuous !== undefined
        ) {
          key.temporalAutoBezier(keyInfo.temporalAutoBezier);
          key.temporalContinuous(keyInfo.temporalContinuous);
        }
        if (
          keyInfo.spatialAutoBezier !== undefined &&
          keyInfo.spatialContinuous !== undefined
        ) {
          key.spatialAutoBezier(keyInfo.spatialAutoBezier);
          key.spatialContinuous(keyInfo.spatialContinuous);
          key.spatialTangent(keyInfo.spatialTangent);
          key.roving(keyInfo.roving);
        }
        return key;
      };
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      function getLayer(baseLayer, selector) {
        if (selector instanceof aeq.Layer) {
          return selector.layer;
        }
        if (aeq.isLayer(selector)) {
          return selector;
        }
        if (aeq.isNumber(selector)) {
          return baseLayer.containingComp.layer(selector);
        }
        if (aeq.isString(selector)) {
          if (regexRelativeIndex.test(selector)) {
            offset = getRelativeIndex(selector);
            if (offset) {
              index = baseLayer.index + offset;
              if (index === 0 || index > baseLayer.containingComp.numLayers) {
                return null;
              }
              return baseLayer.containingComp.layer(index);
            }
          }
          return baseLayer.containingComp.layer(selector);
        }
        return null;
      }
      function getRelativeIndex(str) {
        var offset = str.charAt(0) + str.substr(2);
        offset = parseInt(offset, 10);
        if (isNaN(offset)) {
          return false;
        }
        return offset;
      }
      aeq.Layer = function (layer) {
        if (layer instanceof aeq.Layer) {
          return layer;
        }
        if (this instanceof aeq.Layer) {
          this.layer = layer;
        } else {
          return new aeq.Layer(layer);
        }
      };
      aeq.Layer.prototype = {
        addEffect: function (effectName) {
          var effects = this.layer.property("ADBE Effect Parade");
          if (effects.canAddProperty(effectName)) {
            effects.addProperty(effectName);
          } else {
            throw new Error(
              'Can not add effect "' + effectName + '" to this layer',
            );
          }
        },
        allChildren: function () {
          return aeq.layer.allChildren(this.layer);
        },
        children: function () {
          return aeq.layer.children(this.layer);
        },
        copyToComp: function (comp) {
          if (!aeq.isComp(comp)) {
            if (comp instanceof aeq.Comp) {
              comp = comp.comp;
            } else {
              if (aeq.isString(comp)) {
                comp = aeq.getComp(comp);
              }
            }
          }
          this.layer.copyToComp(comp);
          return this;
        },
        extend: aeq.extend,
        forEachEffect: function (callback) {
          var effects = this.layer.property("ADBE Effect Parade");
          var length = effects.numProperties;
          var i = 1;
          for (; i <= length; i++) {
            callback(effects.property(i), i, effects);
          }
          return this;
        },
        get: function () {
          return this.layer;
        },
        isAeq: true,
        parent: function (selector) {
          if (arguments.length === 0) {
            return this.layer.parent;
          }
          if (selector === null) {
            this.layer.parent = null;
            return null;
          }
          var layer = getLayer(this.layer, selector);
          if (layer === null) {
            return null;
          }
          this.layer.parent = layer;
          return layer;
        },
        parents: function () {
          return aeq.layer.parents(this.layer);
        },
        relatedLayers: function () {
          return aeq.layer.relatedLayers(this.layer);
        },
        removeParent: function () {
          this.layer.parent = null;
          return this;
        },
        toString: function () {
          return "[object aeq.Layer]";
        },
      };
      aeq.forEach(
        [
          "active",
          "index",
          "isNameSet",
          "selectedProperties",
          "time",
          "containingComp",
          "hasVideo",
        ],
        function (attribute) {
          aeq.Layer.prototype[attribute] = function () {
            return this.layer[attribute];
          };
        },
      );
      aeq.forEach(
        [
          "comment",
          "enabled",
          "inPoint",
          "locked",
          "name",
          "outPoint",
          "shy",
          "solo",
          "startTime",
          "stretch",
        ],
        function (attribute) {
          aeq.Layer.prototype[attribute] = function (newValue) {
            if (arguments.length === 0) {
              return this.layer[attribute];
            }
            this.layer[attribute] = newValue;
            return this;
          };
        },
      );
      aeq.forEach(
        [
          "activeAtTime",
          "applyPreset",
          "duplicate",
          "remove",
          "moveToBeginning",
          "moveToEnd",
        ],
        function (method) {
          aeq.Layer.prototype[method] = function (newValue) {
            this.layer[method](newValue);
            return this;
          };
        },
      );
      aeq.forEach(
        ["setParentWithJump", "moveAfter", "moveBefore"],
        function (method) {
          aeq.Layer.prototype[method] = function (selector) {
            var layer = getLayer(this.layer, selector);
            if (layer === null) {
              return null;
            }
            this.layer[method](layer);
            return layer;
          };
        },
      );
      var regexRelativeIndex = /^(\+|-)=/;
      return aeq;
    })(aeq || {});
    aeq = (function (aeq) {
      aeq.Property = function (property) {
        if (property instanceof aeq.Property) {
          return property;
        }
        if (this instanceof aeq.Property) {
          this.property = property;
        } else {
          return new aeq.Property(property);
        }
      };
      aeq.Property.prototype = {
        addKey: function (time) {
          var keyIndex = this.property.addKey(time);
          return this.key(keyIndex);
        },
        expression: function (newValue) {
          if (!this.property.canSetExpression) {
            return false;
          }
          if (arguments.length === 0) {
            return this.property.expression;
          }
          this.property.expression = newValue;
          if (
            this.property.expressionError === "" &&
            (this.property.expressionEnabled || newValue === "")
          ) {
            return true;
          }
          return this.property.expressionError;
        },
        extend: aeq.extend,
        forEachKey: function (callback) {
          var keys = this.getKeys();
          var length = keys.length;
          var i = 0;
          for (; i < length; i++) {
            callback(keys[i], keys[i].index, this.property);
          }
        },
        get: function () {
          return this.property;
        },
        getKeys: function () {
          var keys = [];
          var length = this.property.numKeys;
          var i = 1;
          for (; i <= length; i++) {
            keys.push(this.key(i));
          }
          return aeq.arrayEx(keys);
        },
        isAeq: true,
        key: function (keyIndex) {
          return new aeq.Key(this.property, keyIndex);
        },
        maxValue: function () {
          if (this.property.hasMax) {
            return this.property.maxValue;
          }
          return null;
        },
        minValue: function () {
          if (this.property.hasMin) {
            return this.property.minValue;
          }
          return null;
        },
        nearestKeyIndex: function (time) {
          var keyIndex = this.property.nearestKeyIndex(time);
          return this.key(keyIndex);
        },
        removeKey: function (keyIndex) {
          if (aeq.isNumber(keyIndex)) {
            this.property.removeKey(keyIndex);
          } else {
            if (keyIndex.toString() === "[object aeq.Key]") {
              keyIndex.remove();
            }
          }
        },
        selectedKeys: function () {
          var selectedKeys = [];
          for (var i = 0; i < this.property.selectedKeys.length; i += 1) {
            selectedKeys.push(this.key(this.property.selectedKeys[i]));
          }
          return aeq.arrayEx(selectedKeys);
        },
        separationDimension: function () {
          if (this.property.isSeparationFollower) {
            return this.property.separationDimension;
          }
          return null;
        },
        separationFollower: function (dim) {
          return this.property.getSeparationFollower(dim);
        },
        separationLeader: function () {
          if (this.property.isSeparationFollower) {
            return this.property.separationLeader;
          }
          return null;
        },
        toString: function () {
          return "[object aeq.Property]";
        },
        value: function (newValue) {
          if (arguments.length === 0) {
            return this.property.value;
          }
          this.property.setValue(newValue);
        },
        valueAtTime: function (time, value) {
          if (arguments.length === 1) {
            return this.property.valueAtTime(time);
          }
          this.property.setValueAtTime(time, value);
          return this.nearestKeyIndex(time);
        },
        valuesAtTimes: function (times, values) {
          var result = [];
          var i = 0;
          var il = times.length;
          if (arguments.length === 1) {
            for (; i < il; i++) {
              result.push(this.property.valueAtTime(times[i]));
            }
            return result;
          }
          this.property.setValuesAtTimes(times, values);
          for (; i < il; i++) {
            result.push(this.nearestKeyIndex(times[i]));
          }
          return result;
        },
      };
      aeq.forEach(
        [
          "expressionError",
          "isTimeVarying",
          "numKeys",
          "canSetExpression",
          "canVaryOverTime",
          "isSpatial",
          "isSeparationFollower",
          "isSeparationLeader",
          "propertyIndex",
          "propertyValueType",
          "unitsText",
        ],
        function (attribute) {
          aeq.Property.prototype[attribute] = function () {
            return this.property[attribute];
          };
        },
      );
      return aeq;
    })(aeq || {});
    return aeq;
  })();
  aeq.ui = (function (ui) {
    ui.Container = function (obj) {
      this.obj = obj;
    };
    ui.Container.prototype = {
      _add: function (type, options) {
        if (aeq.isObject(options.arg1) && !aeq.isArray(options.arg1)) {
          options = options.arg1;
          options.arg1 = options.items || options.text;
        }
        var obj = this.obj.add(
          type,
          options.bounds,
          options.arg1,
          options.properties,
        );
        ui.set(obj, options);
        return obj;
      },
      addButton: function (arg1, onClick, properties) {
        return this._add("button", {
          arg1: arg1,
          onClick: onClick,
          properties: properties,
        });
      },
      addCheckbox: function (arg1, onClick, properties) {
        return this._add("checkbox", {
          arg1: arg1,
          onClick: onClick,
          properties: properties,
        });
      },
      addDropdownList: function (arg1, onChange, properties) {
        return this._add("dropdownlist", {
          arg1: arg1,
          onChange: onChange,
          properties: properties,
        });
      },
      addEditText: function (arg1, onChange, onChanging, properties) {
        return this._add("edittext", {
          arg1: arg1,
          onChange: onChange,
          onChanging: onChanging,
          properties: properties,
        });
      },
      addGroup: function (options) {
        var group = this.obj.add("group");
        group = new ui.Container(group);
        if (options) {
          group.set(options);
        }
        return group;
      },
      addIconButton: function (arg1, onClick, properties) {
        var options = { arg1: arg1, onClick: onClick, properties: properties };
        if (
          aeq.isObject(options.arg1) &&
          !aeq.isArray(options.arg1) &&
          !aeq.isFile(options.arg1) &&
          options.arg1.format === undefined
        ) {
          options = options.arg1;
          options.arg1 = options.image || undefined;
        }
        var obj = this.obj.add(
          "iconbutton",
          options.bounds,
          options.arg1,
          options.properties,
        );
        ui.set(obj, options);
        return obj;
      },
      addImage: function (arg1, onClick, properties) {
        var options = { arg1: arg1, onClick: onClick, properties: properties };
        if (
          aeq.isObject(options.arg1) &&
          !aeq.isArray(options.arg1) &&
          !aeq.isFile(options.arg1) &&
          options.arg1.format === undefined
        ) {
          options = options.arg1;
          options.arg1 = options.image || undefined;
        }
        var obj = this.obj.add(
          "image",
          options.bounds,
          options.arg1,
          options.properties,
        );
        ui.set(obj, options);
        return obj;
      },
      addListBox: function (arg1, onChange, onDoubleClick, properties) {
        var newListBox = this._add("listbox", {
          arg1: arg1,
          onChange: onChange,
          onDoubleClick: onDoubleClick,
          properties: properties,
        });
        return new ui.ListBox(newListBox);
      },
      addPanel: function (arg1, properties) {
        var panel = this._add("panel", { arg1: arg1, properties: properties });
        return new ui.Container(panel);
      },
      addProgressbar: function (value, maxValue) {
        return this.obj.add("progressbar", undefined, value, maxValue);
      },
      addRadioButton: function (arg1, onClick, properties) {
        return this._add("radiobutton", {
          arg1: arg1,
          onClick: onClick,
          properties: properties,
        });
      },
      addScrollbar: function (value, maxValue, onChange, onChanging) {
        var scrollbar = this.obj.add("scrollbar", undefined, value, maxValue);
        scrollbar.onChange = onChange;
        scrollbar.onChanging = onChanging;
        return scrollbar;
      },
      addSlider: function (value, minValue, maxValue, onChange, onChanging) {
        var slider = this.obj.add(
          "slider",
          undefined,
          value,
          minValue,
          maxValue,
        );
        slider.onChange = onChange;
        slider.onChanging = onChanging;
        return slider;
      },
      addStaticText: function (text, properties) {
        return this._add("statictext", { arg1: text, properties: properties });
      },
      addTab: function (text) {
        var tab = this.obj.add("tab", undefined, text);
        return new ui.Container(tab);
      },
      addTabbedPanel: function () {
        var tabbedpanel = this.obj.add("tabbedpanel");
        return new ui.Container(tabbedpanel);
      },
      addTreeView: function (items, onChange, properties) {
        var newTreeView = this._add("treeview", {
          arg1: items,
          onChange: onChange,
          properties: properties,
        });
        return new ui.TreeView(newTreeView);
      },
      extend: aeq.extend,
      get: function () {
        return this.obj;
      },
      getChildren: function () {
        return this.obj.children;
      },
      remove: function (obj) {
        if (obj instanceof ui.Container) {
          obj = obj.obj;
        }
        this.obj.remove(obj);
      },
      removeAll: function () {
        for (var i = this.obj.children.length - 1; i >= 0; i--) {
          this.obj.remove(this.obj.children[i]);
        }
      },
      removeChildren: function (obj) {
        if (obj instanceof ui.Container) {
          obj = obj.obj;
        }
        for (var i = obj.children.length - 1; i >= 0; i--) {
          obj.remove(obj.children[i]);
        }
      },
      set: function (options) {
        ui.set(this.obj, options);
      },
      toString: function () {
        return "[object aeq.ui.Container]";
      },
      update: function () {
        this.obj.layout.layout(true);
        this.obj.layout.resize();
      },
    };
    ui.Container.prototype.addListbox = ui.Container.prototype.addListBox;
    ui.Container.prototype.addStatictext = ui.Container.prototype.addStaticText;
    ui.Container.prototype.addTreeview = ui.Container.prototype.addTreeView;
    (function createControllerSetters() {
      function multiParameter(type, numParameters) {
        return function (newValue) {
          if (newValue === undefined) {
            return this.obj[type];
          }
          if (arguments.length === numParameters) {
            newValue = Array.apply(null, arguments);
          } else {
            newValue = arguments[0];
          }
          this.obj[type] = newValue;
        };
      }
      var oneParameters = [
        "enabled",
        "helpTip",
        "orientation",
        "text",
        "visible",
      ];
      var twoParameters = [
        "alignChildren",
        "alignment",
        "location",
        "maximumSize",
        "minimumSize",
        "preferredSize",
        "size",
      ];
      var fourParameters = ["bounds", "margins"];
      aeq.forEach(oneParameters, function (type) {
        ui.Container.prototype[type] = function (newValue) {
          if (newValue === undefined) {
            return this.obj[type];
          }
          this.obj[type] = newValue;
        };
      });
      aeq.forEach(twoParameters, function (type) {
        ui.Container.prototype[type] = multiParameter(type, 2);
      });
      aeq.forEach(fourParameters, function (type) {
        ui.Container.prototype[type] = multiParameter(type, 4);
      });
    })();
    return ui;
  })(aeq.ui || {});
  aeq.ui = (function (ui) {
    ui.ListBox = function (obj) {
      this.obj = obj;
    };
    ui.ListBox.prototype = {
      addItem: function (text, image, index) {
        var item = this.obj.add("item", text, index);
        if (!aeq.isNullOrUndefined(image)) {
          item.image = image;
        }
        return item;
      },
      addRow: function (itemArray) {
        var root = this.getAncestor(this.obj).parent;
        if (aeq.isNullOrUndefined(root.properties)) {
          return;
        }
        var numColumns = root.properties.numberOfColumns;
        var maxItems =
          itemArray.length > numColumns ? numColumns : itemArray.length;
        var item = this.addItem(itemArray[0]);
        for (var i = 0, il = maxItems - 1; i < il; i++) {
          item.subItems[i].text = itemArray[i + 1];
        }
        return item;
      },
      contiguous: function (sel) {
        if (!aeq.isArray(sel)) {
          return true;
        }
        var firstIndex = sel[0].index;
        var lastIndex = sel[sel.length - 1].index;
        return sel.length === lastIndex - firstIndex + 1;
      },
      extend: aeq.extend,
      getAncestor: function (item) {
        while (item.parent.constructor.name !== "ListBox") {
          item = item.parent;
        }
        return item;
      },
      getSelection: function () {
        var selection = this.obj.selection;
        if (aeq.isNullOrUndefined(selection)) {
          return aeq.arrayEx();
        }
        return aeq.arrayEx(selection);
      },
      moveDown: function () {
        var selection = this.obj.selection;
        var items = this.obj.items;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var last = selection.index;
        var first = last;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = selection[selection.length - 1].index;
        }
        if (last === items.length - 1) {
          return;
        }
        for (i = last; i >= first; i--) {
          var thisItem = items[i];
          var nextItem = items[i + 1];
          this.swap(thisItem, nextItem);
        }
        this.obj.selection = null;
        for (i = first + 1; i <= last + 1; i++) {
          this.obj.selection = i;
        }
      },
      moveToBottom: function () {
        var selection = this.obj.selection;
        var items = this.obj.items;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var last = selection.index;
        var first = last;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = selection[selection.length - 1].index;
        }
        if (last === items.length - 1) {
          return;
        }
        var spanLength = items.length - last - 1;
        for (var j = 0, jl = spanLength; j < jl; j++) {
          for (i = last; i >= first; i--) {
            var thisItem = items[i + j];
            var nextItem = items[i + j + 1];
            this.swap(thisItem, nextItem);
          }
        }
        this.obj.selection = null;
        for (i = spanLength + first, il = items.length; i < il; i++) {
          this.obj.selection = i;
        }
      },
      moveToTop: function () {
        var selection = this.obj.selection;
        var items = this.obj.items;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var first = selection.index;
        var last = first + 1;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = first + selection.length;
        }
        if (first === 0) {
          return;
        }
        for (var j = 0, jl = first; j < jl; j++) {
          for (i = first; i < last; i++) {
            var thisItem = items[i - j];
            var lastItem = items[i - j - 1];
            this.swap(thisItem, lastItem);
          }
        }
        this.obj.selection = null;
        for (i = 0, il = last - first; i < il; i++) {
          this.obj.selection = i;
        }
      },
      moveUp: function () {
        var items = this.obj.items;
        var selection = this.obj.selection;
        if (aeq.isNullOrUndefined(selection)) {
          return;
        }
        var first = selection.index;
        var last = first + 1;
        if (
          !aeq.isNullOrUndefined(this.obj.properties) &&
          this.obj.properties.multiselect
        ) {
          selection = selection.sort(function (a, b) {
            return a.index - b.index;
          });
          if (!this.contiguous(selection)) {
            return;
          }
          first = selection[0].index;
          last = first + selection.length;
        }
        if (first === 0) {
          return;
        }
        for (i = first; i < last; i++) {
          var thisItem = items[i];
          var lastItem = items[i - 1];
          this.swap(thisItem, lastItem);
        }
        this.obj.selection = null;
        for (i = first - 1; i < last - 1; i++) {
          this.obj.selection = i;
        }
      },
      removeAll: function () {
        while (this.obj.items.length > 0) {
          var item = this.obj.items[0];
          this.removeItem(item);
        }
      },
      removeItem: function (item) {
        item = aeq.setDefault(item, this.obj.selection);
        if (aeq.isNullOrUndefined(item)) {
          return;
        }
        this.obj.remove(item);
      },
      swap: function (a, b) {
        var temp = a.text;
        a.text = b.text;
        b.text = temp;
      },
      toString: function () {
        return "[object aeq.ui.ListBox]";
      },
    };
    ui.ListBox.prototype.add = ui.ListBox.prototype.addItem;
    return ui;
  })(aeq.ui || {});
  aeq.ui = (function (ui) {
    ui.createMainWindow = function (thisObj, title, options) {
      if (aeq.isPanel(thisObj)) {
        return new ui.Window(thisObj);
      }
      if (aeq.isString(thisObj)) {
        options = title;
        title = thisObj;
      }
      options = aeq.setDefault(options, { resizeable: true });
      var root = new Window("palette", title, undefined, options);
      aeq.ui.root = root;
      return new ui.Window(root);
    };
    ui.createWindow = function (title, options) {
      options = aeq.setDefault(options, { resizeable: true });
      var newWindow = new Window("palette", title, undefined, options);
      return new ui.Window(newWindow);
    };
    ui.createDialog = function (title, options) {
      options = aeq.setDefault(options, { resizeable: true });
      var newWindow = new Window("dialog", title, undefined, options);
      return new ui.Window(newWindow);
    };
    ui.ready = function (callback) {
      callback();
    };
    ui.set = function (obj, options) {
      for (var option in options) {
        if (
          options.hasOwnProperty(option) &&
          option !== "properties" &&
          option !== "arg1"
        ) {
          obj[option] = options[option];
        }
      }
    };
    return ui;
  })(aeq.ui || {});
  aeq.ui = (function (ui) {
    ui.TreeView = function (obj) {
      this.obj = obj;
    };
    ui.TreeView.prototype = ui.ListBox.prototype;
    ui.TreeView.prototype.toString = function () {
      return "[object aeq.ui.TreeView]";
    };
    ui.TreeView.prototype.revealItem = function (name) {
      var tree = this.obj;
      var items = this.findItemByName(tree, [], name);
      if (tree.items.length === 0 || items.length === 0) {
        tree.selection = null;
        return;
      }
      var item = items[0];
      var temp = item;
      while (item.parent.constructor.name !== "TreeView") {
        item.parent.expanded = true;
        item = item.parent;
      }
      tree.selection = temp;
      tree.active = true;
    };
    ui.TreeView.prototype.addNode = function (text, image, index, expanded) {
      expanded = aeq.setDefault(expanded, true);
      var node = this.obj.add("node", text, index);
      if (!aeq.isNullOrUndefined(image)) {
        node.image = image;
      }
      node.expanded = expanded;
      return new ui.TreeView(node);
    };
    ui.TreeView.prototype.getAncestor = function (item) {
      while (item.parent.constructor.name !== "TreeView") {
        item = item.parent;
      }
      return item;
    };
    ui.TreeView.prototype.removeAncestor = function (item) {
      var ancestor = this.getAncestor(item);
      this.removeItem(ancestor);
    };
    ui.TreeView.prototype.expandNodes = function (node) {
      node.expanded = true;
      for (var i = 0, il = node.items.length; i < il; i++) {
        var branch = node.items[i];
        if (this.isNode(branch)) {
          this.expandNodes(branch);
        }
      }
    };
    ui.TreeView.prototype.collapseNodes = function (node) {
      node.expanded = false;
      var branches = node.items;
      for (var i = 0, il = branches.length; i < il; i++) {
        var branch = branches[i];
        if (this.isNode(branch)) {
          this.collapseNodes(branch);
        }
      }
    };
    ui.TreeView.prototype.findItemByName = function (node, list, name) {
      var branches = node.items;
      for (var i = 0, il = branches.length; i < il; i++) {
        var branch = branches[i];
        if (branch.text !== name) {
          continue;
        }
        if (this.isNode(branch)) {
          this.findItemByName(branch, list, name);
        }
        list.push(branch);
      }
      return list;
    };
    ui.TreeView.prototype.copyBranch = function (node, nodeCopy) {
      var newNode = nodeCopy.add(node.type, node.text);
      var me = this;
      if (!this.isNode(node)) {
        return;
      }
      var branches = node.items;
      aeq.forEach(branches, function (branch) {
        if (me.isNode(branch)) {
          me.copyBranch(branch, newNode);
        } else {
          newNode.add("item", node.text);
        }
      });
    };
    ui.TreeView.prototype.isNode = function (branch) {
      if (aeq.isNullOrUndefined(branch)) {
        return false;
      }
      return branch.type === "node";
    };
    ui.TreeView.prototype.isItem = function (branch) {
      if (aeq.isNullOrUndefined(branch)) {
        return false;
      }
      return branch.type === "item";
    };
    ui.TreeView.prototype.moveUp = function () {
      var tree = this.obj;
      if (tree.selection === null) {
        return;
      }
      if (tree.selection.index > 0) {
        var sel = tree.selection;
        var prev = sel.parent.items[sel.index - 1];
        if (this.isItem(sel) && this.isItem(prev)) {
          this.swap(sel, prev);
          tree.selection = prev;
          return;
        }
        if (this.isNode(sel) && this.isItem(prev)) {
          sel.parent.add("item", prev.text, sel.index + 1);
          this.removeItem(sel);
          return;
        }
        if (this.isItem(sel) && this.isNode(prev)) {
          tree.selection = sel.parent.add("item", sel.text, sel.index - 1);
          this.removeItem(sel);
          return;
        }
        var target = sel.parent.add("node", sel.text, sel.index - 1);
        for (var i = 0, il = target.length; i < il; i++) {
          this.copyBranch(sel.items[i], target);
        }
        tree.selection = target;
        this.removeItem(sel);
      }
    };
    ui.TreeView.prototype.moveDown = function () {
      var tree = this.obj;
      if (tree.selection === null) {
        return;
      }
      if (tree.selection.index < tree.items.length - 1) {
        var sel = tree.selection;
        var next = sel.parent.items[sel.index + 1];
        if (this.isItem(sel) && this.isItem(next)) {
          this.swap(sel, next);
          tree.selection = next;
          return;
        }
        if (this.isNode(sel) && this.isItem(next)) {
          sel.parent.add("item", next.text, sel.index - 1);
          this.removeItem(next);
          return;
        }
        if (this.isItem(sel) && this.isNode(next)) {
          tree.selection = sel.parent.add("item", sel.text, sel.index + 1);
          this.removeItem(sel);
          return;
        }
        var target = sel.parent.add("node", sel.text, sel.index + 2);
        for (var i = 0, il = target.length; i < il; i++) {
          this.copyBranch(sel.items[i], target);
        }
        tree.selection = target;
        this.removeItem(sel);
      }
    };
    return ui;
  })(aeq.ui || {});
  aeq.ui = (function (ui) {
    ui.Window = function (obj) {
      this.obj = obj;
    };
    ui.Window.prototype = ui.Container.prototype;
    ui.Window.prototype.show = function () {
      this.layout();
      if (aeq.isWindow(this.obj)) {
        return this.obj.show();
      }
    };
    ui.Window.prototype.hide = function () {
      if (aeq.isWindow(this.obj)) {
        this.obj.hide();
      }
    };
    ui.Window.prototype.close = function (value) {
      if (aeq.isWindow(this.obj)) {
        this.obj.close(value);
      }
    };
    ui.Window.prototype.layout = function () {
      this.obj.layout.layout(true);
      this.obj.layout.resize();
      this.obj.onResizing = this.obj.onResize = function () {
        this.layout.resize();
      };
    };
    return ui;
  })(aeq.ui || {});
  "object" != typeof JSON && (JSON = {});
  (function () {
    function f(t) {
      return t < 10 ? "0" + t : t;
    }
    function this_value() {
      return this.valueOf();
    }
    function quote(t) {
      return (
        (rx_escapable.lastIndex = 0),
        rx_escapable.test(t)
          ? '"' +
            t.replace(rx_escapable, function (t) {
              var e = meta[t];
              return "string" == typeof e
                ? e
                : "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            }) +
            '"'
          : '"' + t + '"'
      );
    }
    function str(t, e) {
      var a = gap;
      var i = e[t];
      switch (
        (i &&
          "object" == typeof i &&
          "function" == typeof i.toJSON &&
          (i = i.toJSON(t)),
        "function" == typeof rep && (i = rep.call(e, t, i)),
        typeof i)
      ) {
        case "string":
          return quote(i);
        case "number":
          return isFinite(i) ? String(i) : "null";
        case "boolean":
        case "null":
          return String(i);
        case "object":
          if (!i) {
            return "null";
          }
          if (
            ((gap += indent),
            (f = []),
            "[object Array]" === Object.prototype.toString.apply(i))
          ) {
            for (u = i.length, r = 0; r < u; r += 1) {
              f[r] = str(r, i) || "null";
            }
            return (
              (o =
                0 === f.length
                  ? "[]"
                  : gap
                    ? "[\n" + gap + f.join(",\n" + gap) + "\n" + a + "]"
                    : "[" + f.join(",") + "]"),
              (gap = a),
              o
            );
          }
          if (rep && "object" == typeof rep) {
            for (u = rep.length, r = 0; r < u; r += 1) {
              "string" == typeof rep[r] &&
                ((n = rep[r]),
                (o = str(n, i)),
                o && f.push(quote(n) + gap ? ": " : ":" + o));
            }
          } else {
            for (var n in i) {
              Object.prototype.hasOwnProperty.call(i, n) &&
                ((o = str(n, i)), o && f.push(quote(n) + gap ? ": " : ":" + o));
            }
          }
          return (
            (o =
              0 === f.length
                ? "{}"
                : gap
                  ? "{\n" + gap + f.join(",\n" + gap) + "\n" + a + "}"
                  : "{" + f.join(",") + "}"),
            (gap = a),
            o
          );
      }
    }
    var rx_one = /^[\],:{}\s]*$/;
    var rx_two = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
    var rx_three =
      /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
    var rx_four = /(?:^|:|,)(?:\s*\[)+/g;
    var rx_escapable =
      /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    var rx_dangerous =
      /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
    "function" != typeof Date.prototype.toJSON &&
      ((Date.prototype.toJSON = function () {
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
      }),
      (Boolean.prototype.toJSON = this_value),
      (Number.prototype.toJSON = this_value),
      (String.prototype.toJSON = this_value));
    "function" != typeof JSON.stringify &&
      ((meta = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      }),
      (JSON.stringify = function (t, e, r) {
        if (((gap = ""), (indent = ""), "number" == typeof r)) {
          for (var n = 0; n < r; n += 1) {
            indent += " ";
          }
        } else {
          "string" == typeof r && (indent = r);
        }
        if (
          ((rep = e),
          e &&
            "function" != typeof e &&
            ("object" != typeof e || "number" != typeof e.length))
        ) {
          throw new Error("JSON.stringify");
        }
        return str("", { "": t });
      }));
    "function" != typeof JSON.parse &&
      (JSON.parse = function (text, reviver) {
        function walk(t, e) {
          var o = t[e];
          if (o && "object" == typeof o) {
            for (var r in o) {
              Object.prototype.hasOwnProperty.call(o, r) &&
                ((n = walk(o, r)), void 0 !== n ? (o[r] = n) : delete o[r]);
            }
          }
          return reviver.call(t, e, o);
        }
        if (
          ((text = String(text)),
          (rx_dangerous.lastIndex = 0),
          rx_dangerous.test(text) &&
            (text = text.replace(rx_dangerous, function (t) {
              return "\\u" + ("0000" + t.charCodeAt(0).toString(16)).slice(-4);
            })),
          rx_one.test(
            text
              .replace(rx_two, "@")
              .replace(rx_three, "]")
              .replace(rx_four, ""),
          ))
        ) {
          return (
            (j = eval("(" + text + ")")),
            "function" == typeof reviver ? walk({ "": j }, "") : j
          );
        }
        throw new SyntaxError("JSON.parse");
      });
  })();
  var LST = (function () {
    function fixOffset(layer, offset) {
      if (typeof offset === "undefined") {
        offset = [0, 0, 0];
      } else {
        property = layer
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point");
        value = property.value;
        value[2] *= -1;
        offset -= value;
      }
      return offset;
    }
    function getAOV(composition) {
      camera = composition.activeCamera;
      if (camera && camera.enabled) {
        result = CameraEx.getAOV(camera);
      } else {
        result = CompositionEx.getAOV(composition);
      }
      return result;
    }
    function getModelMatrix(layer, offset) {
      localMatrix = LayerEx.getLocalMatrix(layer);
      offsetMatrix = getOffsetMatrix(offset);
      worldMatrix = LayerEx.getWorldMatrix(layer);
      result = Matrix.multiplyArrayOfMatrices([
        offsetMatrix,
        localMatrix,
        worldMatrix,
      ]);
      return result;
    }
    function getModelViewProjection(modelMatrix, composition) {
      projectionMatrix = getProjectionMatrix(composition);
      viewMatrix = getViewMatrix(composition);
      result = Matrix.multiplyArrayOfMatrices([
        modelMatrix,
        Matrix.invert(viewMatrix),
        projectionMatrix,
      ]);
      return result;
    }
    function getOffsetMatrix(offset) {
      matrix = Matrix.getIdentity();
      result = Matrix.translate(matrix, offset[0], offset[1], offset[2]);
      return result;
    }
    function getProjectedZ(composition, w) {
      camera = composition.activeCamera;
      if (camera && camera.enabled) {
        result = CameraEx.getProjectedZ(camera, w);
      } else {
        result = CompositionEx.getProjectedZ(composition, w);
      }
      return result;
    }
    function getProjectionMatrix(composition) {
      aov = getAOV(composition);
      aspect = composition.width / composition.height;
      far = 10000;
      near = 0.1;
      result = Matrix.perspective(aov, aspect, near, far);
      return result;
    }
    function getViewMatrix(composition) {
      camera = composition.activeCamera;
      if (camera && camera.enabled) {
        result = CameraEx.getViewMatrix(camera);
      } else {
        result = CompositionEx.getViewMatrix(composition);
      }
      return result;
    }
    function toScreenCoordinates(mvp, composition) {
      w = mvp[15];
      ndc = Matrix.getTranslate(mvp) / w;
      x = ((ndc[0] + 1) * composition.width) / 2;
      y = ((ndc[1] + 1) * composition.height) / 2;
      z = getProjectedZ(composition, w);
      result = [x, y, z];
      return result;
    }
    var CameraEx = (function () {
      var module = {};
      module.getAOV = function (camera) {
        filmSize = camera.containingComp.height;
        focalLength = camera
          .property("ADBE Camera Options Group")
          .property("ADBE Camera Zoom").value;
        return MathEx.getAOV(filmSize, focalLength);
      };
      module.getLocalMatrix = function (camera) {
        lookAtMatrix = LayerEx.getLookAt(camera);
        localMatrix = Matrix.multiplyArrayOfMatrices([
          LayerEx.getRotationMatrix(camera),
          LayerEx.getOrientationMatrix(camera),
          Matrix.invert(lookAtMatrix),
          LayerEx.getPositionMatrix(camera),
        ]);
        return localMatrix;
      };
      module.getProjectedZ = function (camera, w) {
        zoom = camera
          .property("ADBE Camera Options Group")
          .property("ADBE Camera Zoom").value;
        z = zoom - zoom / w;
        return z;
      };
      module.getViewMatrix = function (camera) {
        localMatrix = module.getLocalMatrix(camera);
        worldMatrix = module.getWorldMatrix(camera);
        viewMatrix = Matrix.multiplyArrayOfMatrices([localMatrix, worldMatrix]);
        return viewMatrix;
      };
      module.getWorldMatrix = function (camera) {
        return LayerEx.getWorldMatrix(camera);
      };
      return module;
    })();
    var CompositionEx = (function () {
      function getZoom(composition) {
        filmSize = composition.width;
        zoom = (filmSize * FOCAL_LENGTH) / FILM_SIZE;
        return zoom;
      }
      var FILM_SIZE = 36;
      var FOCAL_LENGTH = 50;
      var module = {};
      module.getAOV = function (composition) {
        aspect = composition.width / composition.height;
        filmSizeVertical = FILM_SIZE / aspect;
        return MathEx.getAOV(filmSizeVertical, FOCAL_LENGTH);
      };
      module.getProjectedZ = function (composition, w) {
        zoom = getZoom(composition);
        z = zoom - zoom / w;
        return z;
      };
      module.getViewMatrix = function (composition) {
        zoom = getZoom(composition);
        viewMatrix = Matrix.getIdentity();
        viewMatrix = Matrix.translate(
          viewMatrix,
          composition.width / 2,
          composition.height / 2,
          zoom,
        );
        return viewMatrix;
      };
      return module;
    })();
    var LayerEx = (function () {
      var module = {};
      module.getAnchorPointMatrix = function (layer) {
        property = layer
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point");
        value = property.value;
        matrix = Matrix.getIdentity();
        matrix = Matrix.translate(matrix, value[0], value[1], -value[2]);
        return matrix;
      };
      module.getLocalMatrix = function (layer) {
        orientationMatrix = module.getOrientationMatrix(layer);
        positionMatrix = module.getPositionMatrix(layer);
        rotationMatrix = module.getRotationMatrix(layer);
        scaleMatrix = module.getScaleMatrix(layer);
        localMatrix = Matrix.multiplyArrayOfMatrices([
          scaleMatrix,
          rotationMatrix,
          orientationMatrix,
          positionMatrix,
        ]);
        return localMatrix;
      };
      module.getLookAt = function (layer) {
        anchorPointProperty = layer
          .property("ADBE Transform Group")
          .property("ADBE Anchor Point");
        anchorPointValue = anchorPointProperty.value;
        anchorPointValue[2] *= -1;
        positionProperty = layer
          .property("ADBE Transform Group")
          .property("ADBE Position");
        positionValue = positionProperty.value;
        positionValue[2] *= -1;
        lookAtMatrix = Matrix.lookAt(
          positionValue,
          anchorPointValue,
          [0, 1, 0],
        );
        return lookAtMatrix;
      };
      module.getOrientationMatrix = function (layer) {
        property = layer
          .property("ADBE Transform Group")
          .property("ADBE Orientation");
        value = property.value;
        matrix = Matrix.getIdentity();
        matrix = Matrix.rotateZ(matrix, Trig.degreesToRadians(value[2]));
        matrix = Matrix.rotateY(matrix, Trig.degreesToRadians(-value[1]));
        matrix = Matrix.rotateX(matrix, Trig.degreesToRadians(-value[0]));
        return matrix;
      };
      module.getPositionMatrix = function (layer) {
        property = layer
          .property("ADBE Transform Group")
          .property("ADBE Position");
        value = property.value;
        matrix = Matrix.getIdentity();
        matrix = Matrix.translate(matrix, value[0], value[1], -value[2]);
        return matrix;
      };
      module.getRotationMatrix = function (layer) {
        transformProperty = layer.property("ADBE Transform Group");
        valueX = transformProperty.property("ADBE Rotate X").value;
        valueY = transformProperty.property("ADBE Rotate Y").value;
        valueZ = transformProperty.property("ADBE Rotate Z").value;
        matrix = Matrix.getIdentity();
        matrix = Matrix.rotateZ(matrix, Trig.degreesToRadians(valueZ));
        matrix = Matrix.rotateY(matrix, Trig.degreesToRadians(-valueY));
        matrix = Matrix.rotateX(matrix, Trig.degreesToRadians(-valueX));
        return matrix;
      };
      module.getScaleMatrix = function (layer) {
        property = layer
          .property("ADBE Transform Group")
          .property("ADBE Scale");
        value = property.value / 100;
        matrix = Matrix.getIdentity();
        matrix = Matrix.scale(matrix, value[0], value[1], value[2]);
        return matrix;
      };
      module.getWorldMatrix = function (layer) {
        worldMatrix = Matrix.getIdentity();
        while (layer.parent) {
          parent = layer.parent;
          anchorPointMatrix = module.getAnchorPointMatrix(parent);
          localMatrix = module.getLocalMatrix(parent);
          worldMatrix = Matrix.multiplyArrayOfMatrices([
            worldMatrix,
            Matrix.invert(anchorPointMatrix),
            localMatrix,
          ]);
          layer = parent;
        }
        return worldMatrix;
      };
      return module;
    })();
    var MathEx = (function () {
      var module = {};
      module.getAOV = function (filmSize, focalLength) {
        return 2 * Math.atan(filmSize / (2 * focalLength));
      };
      return module;
    })();
    var Matrix = (function () {
      var module = {};
      module.decompose = function (matrix) {
        var result = {
          rotation: module.getRotation(matrix),
          scale: module.getScale(matrix),
          translate: module.getTranslate(matrix),
        };
        return result;
      };
      module.getIdentity = function () {
        var identity = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
        return identity;
      };
      module.getRotation = function (matrix) {
        var scale = module.getScale(matrix);
        var sX = scale[0];
        var sY = scale[1];
        var sZ = scale[2];
        var sinPitch = -matrix[8] / sX;
        var sinRoll = -matrix[6] / sZ;
        var cosRoll = matrix[5] / sY;
        var sinYaw = 0;
        var cosYaw = 1;
        var cosPitch = Math.sqrt(1 - sinPitch * sinPitch);
        if (Math.abs(cosPitch) > 1e-6) {
          sinRoll = matrix[9] / sY / cosPitch;
          cosRoll = matrix[10] / sZ / cosPitch;
          sinYaw = matrix[4] / sX / cosPitch;
          cosYaw = matrix[0] / sX / cosPitch;
        }
        var x = Math.atan2(sinRoll, cosRoll);
        var y = Math.atan2(sinPitch, cosPitch);
        var z = Math.atan2(sinYaw, cosYaw);
        return [
          Trig.radiansToDegrees(x),
          Trig.radiansToDegrees(y),
          Trig.radiansToDegrees(z),
        ];
      };
      module.getScale = function (matrix) {
        x = Vector3.length([matrix[0], matrix[4], matrix[8]]);
        y = Vector3.length([matrix[1], matrix[5], matrix[9]]);
        z = Vector3.length([matrix[2], matrix[6], matrix[10]]);
        return [x, y, z];
      };
      module.getTranslate = function (matrix) {
        x = matrix[3];
        y = matrix[7];
        z = matrix[11];
        return [x, y, z];
      };
      module.invert = function (matrix) {
        var result = [];
        var n11 = matrix[0];
        var n12 = matrix[4];
        var n13 = matrix[8];
        var n14 = matrix[12];
        var n21 = matrix[1];
        var n22 = matrix[5];
        var n23 = matrix[9];
        var n24 = matrix[13];
        var n31 = matrix[2];
        var n32 = matrix[6];
        var n33 = matrix[10];
        var n34 = matrix[14];
        var n41 = matrix[3];
        var n42 = matrix[7];
        var n43 = matrix[11];
        var n44 = matrix[15];
        result[0] =
          n23 * n34 * n42 -
          n24 * n33 * n42 +
          n24 * n32 * n43 -
          n22 * n34 * n43 -
          n23 * n32 * n44 +
          n22 * n33 * n44;
        result[4] =
          n14 * n33 * n42 -
          n13 * n34 * n42 -
          n14 * n32 * n43 +
          n12 * n34 * n43 +
          n13 * n32 * n44 -
          n12 * n33 * n44;
        result[8] =
          n13 * n24 * n42 -
          n14 * n23 * n42 +
          n14 * n22 * n43 -
          n12 * n24 * n43 -
          n13 * n22 * n44 +
          n12 * n23 * n44;
        result[12] =
          n14 * n23 * n32 -
          n13 * n24 * n32 -
          n14 * n22 * n33 +
          n12 * n24 * n33 +
          n13 * n22 * n34 -
          n12 * n23 * n34;
        result[1] =
          n24 * n33 * n41 -
          n23 * n34 * n41 -
          n24 * n31 * n43 +
          n21 * n34 * n43 +
          n23 * n31 * n44 -
          n21 * n33 * n44;
        result[5] =
          n13 * n34 * n41 -
          n14 * n33 * n41 +
          n14 * n31 * n43 -
          n11 * n34 * n43 -
          n13 * n31 * n44 +
          n11 * n33 * n44;
        result[9] =
          n14 * n23 * n41 -
          n13 * n24 * n41 -
          n14 * n21 * n43 +
          n11 * n24 * n43 +
          n13 * n21 * n44 -
          n11 * n23 * n44;
        result[13] =
          n13 * n24 * n31 -
          n14 * n23 * n31 +
          n14 * n21 * n33 -
          n11 * n24 * n33 -
          n13 * n21 * n34 +
          n11 * n23 * n34;
        result[2] =
          n22 * n34 * n41 -
          n24 * n32 * n41 +
          n24 * n31 * n42 -
          n21 * n34 * n42 -
          n22 * n31 * n44 +
          n21 * n32 * n44;
        result[6] =
          n14 * n32 * n41 -
          n12 * n34 * n41 -
          n14 * n31 * n42 +
          n11 * n34 * n42 +
          n12 * n31 * n44 -
          n11 * n32 * n44;
        result[10] =
          n12 * n24 * n41 -
          n14 * n22 * n41 +
          n14 * n21 * n42 -
          n11 * n24 * n42 -
          n12 * n21 * n44 +
          n11 * n22 * n44;
        result[14] =
          n14 * n22 * n31 -
          n12 * n24 * n31 -
          n14 * n21 * n32 +
          n11 * n24 * n32 +
          n12 * n21 * n34 -
          n11 * n22 * n34;
        result[3] =
          n23 * n32 * n41 -
          n22 * n33 * n41 -
          n23 * n31 * n42 +
          n21 * n33 * n42 +
          n22 * n31 * n43 -
          n21 * n32 * n43;
        result[7] =
          n12 * n33 * n41 -
          n13 * n32 * n41 +
          n13 * n31 * n42 -
          n11 * n33 * n42 -
          n12 * n31 * n43 +
          n11 * n32 * n43;
        result[11] =
          n13 * n22 * n41 -
          n12 * n23 * n41 -
          n13 * n21 * n42 +
          n11 * n23 * n42 +
          n12 * n21 * n43 -
          n11 * n22 * n43;
        result[15] =
          n12 * n23 * n31 -
          n13 * n22 * n31 +
          n13 * n21 * n32 -
          n11 * n23 * n32 -
          n12 * n21 * n33 +
          n11 * n22 * n33;
        var determinant =
          n11 * result[0] +
          n21 * result[4] +
          n31 * result[8] +
          n41 * result[12];
        if (determinant === 0) {
          throw new Error("Can\'t invert matrix, determinant is 0");
        }
        for (var i = 0, il = result.length; i < il; i++) {
          result[i] /= determinant;
        }
        return result;
      };
      module.lookAt = function (eye, target, up) {
        z = Vector3.subVectors(eye, target);
        if (Vector3.lengthSq(z) === 0) {
          z[2] = 1;
        }
        z = Vector3.normalize(z);
        x = Vector3.crossVectors(up, z);
        if (Vector3.lengthSq(x) === 0) {
          if (Math.abs(up.z) === 1) {
            z[0] += 0.0001;
          } else {
            z[2] += 0.0001;
          }
          z = Vector3.normalize(z);
          x = Vector3.crossVectors(up, z);
        }
        x = Vector3.normalize(x);
        y = Vector3.crossVectors(z, x);
        result = module.getIdentity();
        result[0] = x[0];
        result[4] = y[0];
        result[8] = z[0];
        result[1] = x[1];
        result[5] = y[1];
        result[9] = z[1];
        result[2] = x[2];
        result[6] = y[2];
        result[10] = z[2];
        return result;
      };
      module.multiplyArrayOfMatrices = function (matrices) {
        var result = matrices[0];
        for (var i = 1, il = matrices.length; i < il; i++) {
          result = module.multiplyMatrices(result, matrices[i]);
        }
        return result;
      };
      module.multiplyMatrices = function (a, b) {
        var a11 = a[0];
        var a12 = a[4];
        var a13 = a[8];
        var a14 = a[12];
        var a21 = a[1];
        var a22 = a[5];
        var a23 = a[9];
        var a24 = a[13];
        var a31 = a[2];
        var a32 = a[6];
        var a33 = a[10];
        var a34 = a[14];
        var a41 = a[3];
        var a42 = a[7];
        var a43 = a[11];
        var a44 = a[15];
        var b11 = b[0];
        var b12 = b[4];
        var b13 = b[8];
        var b14 = b[12];
        var b21 = b[1];
        var b22 = b[5];
        var b23 = b[9];
        var b24 = b[13];
        var b31 = b[2];
        var b32 = b[6];
        var b33 = b[10];
        var b34 = b[14];
        var b41 = b[3];
        var b42 = b[7];
        var b43 = b[11];
        var b44 = b[15];
        var result = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
        result[0] = a11 * b11 + a12 * b21 + a13 * b31 + a14 * b41;
        result[4] = a11 * b12 + a12 * b22 + a13 * b32 + a14 * b42;
        result[8] = a11 * b13 + a12 * b23 + a13 * b33 + a14 * b43;
        result[12] = a11 * b14 + a12 * b24 + a13 * b34 + a14 * b44;
        result[1] = a21 * b11 + a22 * b21 + a23 * b31 + a24 * b41;
        result[5] = a21 * b12 + a22 * b22 + a23 * b32 + a24 * b42;
        result[9] = a21 * b13 + a22 * b23 + a23 * b33 + a24 * b43;
        result[13] = a21 * b14 + a22 * b24 + a23 * b34 + a24 * b44;
        result[2] = a31 * b11 + a32 * b21 + a33 * b31 + a34 * b41;
        result[6] = a31 * b12 + a32 * b22 + a33 * b32 + a34 * b42;
        result[10] = a31 * b13 + a32 * b23 + a33 * b33 + a34 * b43;
        result[14] = a31 * b14 + a32 * b24 + a33 * b34 + a34 * b44;
        result[3] = a41 * b11 + a42 * b21 + a43 * b31 + a44 * b41;
        result[7] = a41 * b12 + a42 * b22 + a43 * b32 + a44 * b42;
        result[11] = a41 * b13 + a42 * b23 + a43 * b33 + a44 * b43;
        result[15] = a41 * b14 + a42 * b24 + a43 * b34 + a44 * b44;
        return result;
      };
      module.perspective = function (fovy, aspect, near, far) {
        var f = 1 / Math.tan(fovy / 2);
        var nf = 1 / (near - far);
        var result = [
          f / aspect,
          0,
          0,
          0,
          0,
          f,
          0,
          0,
          0,
          0,
          (far + near) * nf,
          2 * far * near * nf,
          0,
          0,
          -1,
          0,
        ];
        return result;
      };
      module.rotateX = function (matrix, theta) {
        var rotationXmatrix = [
          1,
          0,
          0,
          0,
          0,
          Math.cos(theta),
          -Math.sin(theta),
          0,
          0,
          Math.sin(theta),
          Math.cos(theta),
          0,
          0,
          0,
          0,
          1,
        ];
        return module.multiplyMatrices(matrix, rotationXmatrix);
      };
      module.rotateY = function (matrix, theta) {
        var rotationYmatrix = [
          Math.cos(theta),
          0,
          Math.sin(theta),
          0,
          0,
          1,
          0,
          0,
          -Math.sin(theta),
          0,
          Math.cos(theta),
          0,
          0,
          0,
          0,
          1,
        ];
        return module.multiplyMatrices(matrix, rotationYmatrix);
      };
      module.rotateZ = function (matrix, theta) {
        var rotationZmatrix = [
          Math.cos(theta),
          -Math.sin(theta),
          0,
          0,
          Math.sin(theta),
          Math.cos(theta),
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
        ];
        return module.multiplyMatrices(matrix, rotationZmatrix);
      };
      module.scale = function (matrix, x, y, z) {
        var scaleMatrix = [x, 0, 0, 0, 0, y, 0, 0, 0, 0, z, 0, 0, 0, 0, 1];
        return module.multiplyMatrices(matrix, scaleMatrix);
      };
      module.skew = function (matrix, thetaX, thetaY) {
        var skewMatrix = [
          1,
          Math.tan(thetaX),
          0,
          0,
          Math.tan(thetaY),
          1,
          0,
          0,
          0,
          0,
          1,
          0,
          0,
          0,
          0,
          1,
        ];
        return module.multiplyMatrices(matrix, skewMatrix);
      };
      module.translate = function (matrix, x, y, z) {
        var translateMatrix = [1, 0, 0, x, 0, 1, 0, y, 0, 0, 1, z, 0, 0, 0, 1];
        return module.multiplyMatrices(matrix, translateMatrix);
      };
      return module;
    })();
    var Trig = (function () {
      var module = {};
      module.degreesToRadians = function (degrees) {
        return (degrees * Math.PI) / 180;
      };
      module.radiansToDegrees = function (radians) {
        return (radians * 180) / Math.PI;
      };
      return module;
    })();
    var Vector3 = (function () {
      var module = {};
      module.crossVectors = function (a, b) {
        var ax = a[0];
        var ay = a[1];
        var az = a[2];
        var bx = b[0];
        var by = b[1];
        var bz = b[2];
        var v = [];
        v[0] = ay * bz - az * by;
        v[1] = az * bx - ax * bz;
        v[2] = ax * by - ay * bx;
        return v;
      };
      module.divideScalar = function (v, scalar) {
        return module.multiplyScalar(v, 1 / scalar);
      };
      module.length = function (v) {
        return Math.sqrt(module.lengthSq(v));
      };
      module.lengthSq = function (v) {
        return v[0] * v[0] + v[1] * v[1] + v[2] * v[2];
      };
      module.multiplyScalar = function (v, scalar) {
        v[0] *= scalar;
        v[1] *= scalar;
        v[2] *= scalar;
        return v;
      };
      module.normalize = function (v) {
        return module.divideScalar(v, module.length(v) || 1);
      };
      module.subVectors = function (a, b) {
        return [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
      };
      return module;
    })();
    var module = {};
    module.toComp = function (layer, offset) {
      offset = fixOffset(layer, offset);
      modelMatrix = getModelMatrix(layer, offset);
      if (!layer.threeDLayer) {
        result = Matrix.getTranslate(modelMatrix);
        result.pop();
      } else {
        mvp = getModelViewProjection(modelMatrix, layer.containingComp);
        result = toScreenCoordinates(mvp, layer.containingComp);
      }
      return result;
    };
    module.toWorld = function (layer, offset) {
      offset = fixOffset(layer, offset);
      modelMatrix = getModelMatrix(layer, offset);
      result = Matrix.getTranslate(modelMatrix);
      if (!layer.threeDLayer) {
        result.pop();
      } else {
        result[2] *= -1;
      }
      return result;
    };
    return module;
  })();
  function a(vars) {
    function licUI() {
      var e = new Window(
        "dialog",
        strTrialWelcomeHeader + " - " + strVersion + " " + strScriptVersion,
        void 0,
        { resizeable: true },
      );
      if (null != e) {
        var t =
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\tinfoGrp: Group { \t\t\t\t\talignment: [\'fill\',\'top\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t\torientation: \'column\', \t\t\t\t\t\thdrGrp: Group {\t\t\t\t\t\t\ttxt: StaticText {}, \t\t\t\t\t\t\tpaste: StaticText {}, \t\t\t\t\t\t}\t\t\t\t\t\ttrial: StaticText {}, \t\t\t\t\t} \t\t\t\t\tlicGrp: Group { \t\t\t\t\t\ttxt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}}, \t\t\t\t\t} \t\t\t\t\tokGrp: Group { \t\t\t\t\talignment: [\'fill\',\'bottom\'], \t\t\t\t\talignChildren: [\'fill\',\'fill\'],                             buyGrp: Group {                             alignment: [\'left\',\'fill\'],                             alignChildren: [\'left\',\'fill\'],                             orientation: \'column\',                             spacing:1,                                  retrieveReg: Button {text:\'" +
          strRetrieveLic.replace(/%t/, strLicense) +
          "\', name:\'retrieve\',preferredSize:[130,25]}                                   buyLic: Button {text:\'" +
          strBuyLic.replace(/%t/, strLicense) +
          "\', name:\'buy\',preferredSize:[130,25]}                                   }\t\t\t\t\t\tcancelBtn: Button {text:\'" +
          strCancel +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,50], alignment: [\'right\',\'center\']} \t\t\t\t\t} \t\t\t\t}";
        e.grp = e.add(t);
        var i = ScriptUI.newFont(
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
          (e.grp.infoGrp.hdrGrp.txt.graphics.font = i),
          (e.grp.infoGrp.hdrGrp.paste.text = ""),
          (e.grp.infoGrp.hdrGrp.paste.graphics.font = n),
          (e.grp.infoGrp.trial.text =
            betaMode || !offerTrial ? "" : strTrialInstructMsg),
          isServerConfigured(licenseValidity) &&
            (isServerRunning(licenseValidity)
              ? ((e.grp.infoGrp.hdrGrp.txt.text = strServerInstructMsg),
                (e.grp.infoGrp.trial.text = strTrialInstructMsg))
              : ((e.grp.infoGrp.hdrGrp.txt.text =
                  strEnterLicenseCode + " " + strServerNotRunning),
                (e.grp.infoGrp.trial.text =
                  betaMode || !offerTrial ? "" : strTrialInstructMsg))),
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
      var t = new Window("dialog", strRetrieveLic.replace(/%t/, e), void 0, {
        resizeable: true,
      });
      if (null != t) {
        var i =
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
        t.grp = t.add(i);
        t.grp.buttonsGrp.myDownloadsBtn.onClick = function () {
          openURL(retrieveUrl);
          t.close(false);
        };
        t.grp.buttonsGrp.downloadManagerBtn.onClick = function () {
          openURL(managerAppUrl);
          t.close(false);
        };
        t.layout.layout(true);
        t.layout.resize();
        t.onResizing = t.onResize = function () {
          this.layout.resize();
        };
        t.show();
      }
    }
    function checkBeta(e, t) {
      return new Date() < t || new Date() > e;
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
          var t =
              -1 != $.os.indexOf("Windows") &&
              12 <= parseFloat(app.version) &&
              parseFloat(app.version) < 14
                ? ["left", "top"]
                : ["fill", "fill"],
            i =
              "group { \t\torientation: \'column\', \t\talignment: [\'" +
              t[0] +
              "\',\'" +
              t[1] +
              "\'], \t\talignChildren: [\'fill\',\'fill\'],                    infoGrp: Group {                    alignment: [\'fill\',\'top\'],                    alignChildren: [\'fill\',\'top\'], \t\t\t\t\ttxt: StaticText {properties:{multiline:true}, preferredSize:[150,50]},                       hdr: StaticText {properties:{multiline:true}},                       removeLic: Button {text:\'" +
              strDeactivate +
              "\', preferredSize:[40,30]} \t\t\t\t} \t\t\t\thelpGrp: Group {                    alignment: [\'" +
              t[0] +
              "\',\'" +
              t[1] +
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
            i +=
              "btn" + n + ": " + vars.helpButtons[n].hasOwnProperty("type") &&
              validateButtonType(vars.helpButtons[n].type)
                ? vars.helpButtons[n].type
                : "Button" +
                  " {id: \'" +
                  n +
                  "\', alignment: [\'left\',\'center\']}";
          }
        }
        i +=
          "\t\t\t\t\tokBtn: Button {text:\'" +
          strOK +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']} \t\t\t\t} \t\t}";
        e.grp = e.add(i);
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
            vars.helpButtons[n].hasOwnProperty("helpTip") &&
              (e.grp.okGrp["btn" + n].helpTip = vars.helpButtons[n].helpTip),
            vars.helpButtons[n].hasOwnProperty("url")
              ? (e.grp.okGrp["btn" + n].onClick = function () {
                  openURL(vars.helpButtons[this.id].url);
                })
              : (vars.helpButtons[n].hasOwnProperty("onClickFunction") &&
                  (e.grp.okGrp["btn" + n].onClick =
                    vars.helpButtons[n].onClickFunction),
                vars.helpButtons[n].hasOwnProperty("btnValue") &&
                  (e.grp.okGrp["btn" + n].value =
                    vars.helpButtons[n].btnValue)));
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
      i = n = "";
      t = "&subject=";
      null != e &&
        void 0 !== e &&
        (e.hasOwnProperty("subject") && (t += File.encode(e.subject)),
        e.hasOwnProperty("message") && (i = File.encode(e.message)),
        e.hasOwnProperty("diagnostic") &&
          (n = File.encode(e.diagnostic + "\n--\n")));
      var r =
        true === isAescriptsSupportUrl
          ? "" == supportTicketSKU
            ? strSKU
            : supportTicketSKU + t + "&message="
          : t.replace(/\&/, "?") + "&body=";
      var a =
        "" != r
          ? i +
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
      var t = $.os.toString();
      var i =
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
      var r =
        "Last checked server version: " +
        haveSettings(prefsSectionName, prefsLastServerVersionChecked)
          ? getSettings(prefsSectionName, prefsLastServerVersionChecked)
          : "n/a";
      var a = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return e
        ? File.encode(n) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(i) +
            "%0D%0A" +
            File.encode(a) +
            "%0D%0A" +
            File.encode(r)
        : n + "\n" + t + "\n" + i + "\n" + a + "\n" + r;
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
          "group { \t\t\t\torientation: \'column\', \t\t\t\talignment: [\'fill\',\'fill\'], \t\t\t\talignChildren: [\'fill\',\'fill\'], \t\t\t\t   hdrGrp: Group { \t\t\t\t   alignment: [\'fill\',\'fill\'], \t\t\t\t   alignChildren: [\'fill\',\'fill\'], \t\t\t\t   orientation: \'column\',                         hdr: StaticText {alignment: [\'fill\',\'top\'], properties:{multiline:true}}, ";
        t.hasOwnProperty("header") &&
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
        i.grp = i.add(e);
        var n = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.BOLD, 11);
        ScriptUI.newFont("dialog || palette", ScriptUI.FontStyle.REGULAR, 9);
        i.grp.hdrGrp.hdr.graphics.font = n;
        i.grp.hdrGrp.hdr.text =
          strNewVersionAvailable.replace(/%v/, t.version) +
          "\n" +
          strCurrentVersion.replace(/%v/, strScriptVersion);
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
            prefsNextTimeVersionCheckedSkipVersion,
            t.version,
          );
          saveSettings(
            prefsSectionName,
            prefsLastServerVersionChecked,
            t.version,
          );
          i.close(false);
        };
        i.grp.okGrp.remindMeLaterBtn.onClick = function () {
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
              t.version,
            );
            i.close(false);
          } catch (e) {
            alert(e.toString());
          }
        };
        i.grp.okGrp.downloadBtn.onClick = function () {
          retrieveLicenseUI(strDownload);
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
    function dateAddDays(e) {
      var t = new Date().getTime() + 86400000 * e;
      return new Date(t);
    }
    function checkForNewVersion(e) {
      if ((null == e && (e = false), doUpdateCheck)) {
        haveSettings(prefsSectionName, prefsLastVersionChecked) &&
          (i = getSettings(prefsSectionName, prefsLastVersionChecked));
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
          (t = getSettings(prefsSectionName, prefsVersionCheckInit));
        var o = new Date();
        if (e || null == t || null == a || !(o < a)) {
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
              0 < d && (null == i || null == r || null == a || e || a <= o)
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
    function versionCheck(e, t, i) {
      var n = extComms(
        "https://notify.aescripts.com/versioncheck2.php?json=1&plain=1&sku=" +
          e +
          t
          ? "&latest=1"
          : "" + parseFloat(app.version) < 12
            ? "&clip_length=200"
            : "&clip_length=300",
        null,
      );
      if (null == n || "" == n || !validateJSON(n)) {
        return (i && alert(strUpdateCheckError), null);
      }
      try {
        if (null == (n = JSONify(n.replace(/\\u2022/g, "-"), "parse"))) {
          return null;
        }
      } catch (e) {
        return null;
      }
      return "ok" != n.status
        ? null
        : t
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
          var t = system.callSystem('curl -s 2 "' + e + '"');
        } else {
          var i =
            ((n = new File(
              Folder.userData.fullName + "/Aescripts/aescripts_helper.vbs",
            )).open("w"),
            n.write(
              'dim o: Set o = createobject("MSXML2.XMLHTTP.6.0")\no.Open "GET", WScript.Arguments(0), False\no.Send\nIf o.Status >= 200 And o.Status <= 202 Then\nWScript.Echo o.responseText\nElse\nWScript.Echo "Error"\nEnd If',
            ),
            n.close(),
            n.exists ? n : null);
          if (null == i) {
            return null;
          }
          t = system.callSystem(
            'cscript //nologo "' + i.fsName + '" "' + e + '"',
          );
          validateJSON(t) ||
            (t = system.callSystem(
              'cscript //nologo "' + i.relativeURI + '" "' + e + '"',
            ));
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
        var n = i.read(2000);
        return (i.close(), null != n ? (n = n.toString()) : null);
      }
      return null;
    }
    function formatHistory(e, t) {
      var i = e.data;
      var n = [];
      for (var r in i) {
        if (i.hasOwnProperty(r)) {
          for (var a = i[r].history, s = a.length - 1; 0 <= s; s--) {
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
              compareVersions(t, o.version_number) < 0) &&
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
          ? Folder.userData.fullName
          : -1 != $.os.indexOf("Mac")
            ? Folder.temp.fullName
            : Folder.appData.fullName;
      -1 != $.os.indexOf("Windows") &&
        ScriptUI.environment.keyboardState.shiftKey &&
        ScriptUI.environment.keyboardState.altKey &&
        ScriptUI.environment.keyboardState.ctrlKey &&
        (t = Folder.temp.fullName);
      var n =
        t + "/" + Math.round(Math.random() * 42132 * new Date().getTime());
      if (-1 != $.os.indexOf("Win")) {
        i = wx;
        n += ".exe";
      } else {
        if (systemCall("arch").toLowerCase().match(/ppc/)) {
          return (alert(strPpcNotSupported), false);
        }
        i = mx;
      }
      var r = createFile(File(n), i, "BINARY");
      if (!r.exists) {
        return ((licenseData = { result: -108 }), licenseData);
      }
      r.hidden = true;
      -1 != $.os.indexOf("Mac") && systemCall('chmod +x "' + r.fsName + '"');
      var a = systemCall(
        '"' + r.fsName + '" "' + strHeader + '" ' + privateNum + ' "' + e + '"',
      );
      return (r.remove(), parseResult(a));
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
      for (var t = e.match(/[^\r\n]+/g), i = {}, n = 0; n < t.length; n++) {
        var r = t[n].split(":");
        if (2 <= r.length) {
          var a = r[0].replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g, "");
          var s = trimQuotes(r[1]);
          "LS" == a && "UP" == s && (a = "LSS");
          isNaN(s) || (s = parseFloat(s));
          i[a] = s;
        }
      }
      return (
        void 0 === i.result && ((i.result = -102), (i.e = e)),
        checkTrialDetails(i),
        checkBetaDetails(i),
        (isTimeLimited = checkTimeLimited(i)),
        i
      );
    }
    function checkTimeLimited(e) {
      var t = retProp("rt$", e);
      var i = retProp("nd$", e);
      return (validateTimeLimited(e, t, i), "" != t && "" != i);
    }
    function validateTimeLimited(e, t, i) {
      switch (e.result) {
        case -20:
          e.e = parseDateString(t);
          break;
        case -21:
          e.e = parseDateString(i);
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
        var t = retProp("^d", e);
        if (void 0 === t) {
          return void (e.result = -103);
        }
        var i = tLD - t;
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
      for (var t = 0, i = 0; i < e.length; i++) {
        t += e.charCodeAt(i);
      }
      return t;
    }
    function getVerifCode3(e) {
      var t = e.split("*");
      if (4 == t.length) {
        var i = t[3].replace(/^[0-9]+/, "");
        var n = t[3].match(/^[0-9]+/, "");
        var r = n[0].substr(0, 2);
        var a = n[0].substr(n[0].length - 2);
        var s = r[0] + t[0] + r[1] + t[1] + a[0] + t[2] + a[1] + i;
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
        (myLcns = false),
        e && ((regUI = licUI()), !(myRegPrompt = regUI.show())))
      ) {
        return false;
      }
      var n = false;
      "@remote" == (t = null == license ? t : license).toLowerCase() &&
        ((t = strHeader + t), (n = true));
      var r = t.split("*");
      var a = t.match(/#/);
      var s = a && check_timed_License(t);
      var o = check_v2_License(t);
      if (!((offerTrial && "trial" == t.toLowerCase()) || n || o || s)) {
        if (t.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
          var l = confirm(strTempCode);
          return (
            isSecurityPrefSet() && l && openURL(exchangeUrl + "?serial=" + t),
            myLcns
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
          myLcns
        );
      }
      if (("trial" != t.toLowerCase() || n) && !n) {
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
          myLcns = true;
        }
      }
      if (
        !isResultValidLicense(
          (licenseValidity = 2 == licV ? getVerifCode(t) : getVerifCode3(t)),
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
            confirm(strReset + "?") &&
            getVerifCode("-"),
          checkCode(e),
          myLcns
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
        t.match(/@remote/i) || alert(p);
      }
      return (myLcns = true);
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
          ((r = c.indexOf(e.charAt(l++))) >> 4);
        i = ((15 & r) << 4) | ((a = c.indexOf(e.charAt(l++))) >> 2);
        n = ((3 & a) << 6) | (s = c.indexOf(e.charAt(l++)));
        o += String.fromCharCode(t);
        64 != a && (o += String.fromCharCode(i));
        64 != s && (o += String.fromCharCode(n));
      }
      return o;
    }
    function bE(e) {
      for (
        t,
          i,
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
        r = (t = e.charCodeAt(c++)) >> 2;
        a = ((3 & t) << 4) | ((i = e.charCodeAt(c++)) >> 4);
        s = ((15 & i) << 2) | ((n = e.charCodeAt(c++)) >> 6);
        o = 63 & n;
        isNaN(i) ? (s = o = 64) : isNaN(n) && (o = 64);
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
        -1 != $.os.indexOf("Windows")
          ? systemCall('cmd /c "start ' + (e = e.replace(/&/g, "^&")) + '"')
          : systemCall('open "' + e + '"');
      } else {
        createFile(
          File(Folder.temp.fullName + "/openUrl.url"),
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
        (i = "" != n ? strRegistration + n + t : t),
        isTimeLimited && (i += "\n" + strLicenseEnds + f),
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
      return BridgeTalk.appName.match(new RegExp(bD("YWZ0ZXJlZmZlY3Rz")));
    }
    function isPS() {
      return BridgeTalk.appName.match(new RegExp(bD("cGhvdG9zaG9w")));
    }
    function readFile(e) {
      if (null != e && null != e && e.exists && e.open("r")) {
        var t = e.read();
        return (e.close(), t);
      }
      return null;
    }
    function createFile(e, t, i, n, r) {
      return (
        ((null == e || null == e || e.exists) && !n) ||
          (e.exists && e.remove(),
          ((e =
            -1 != $.os.indexOf("Win")
              ? new File(e.fullName)
              : new File(e.absoluteURI)).encoding = i),
          e.open("w"),
          e.write(t),
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
      var n = File(prefsLocation + prefsPrefix + File.encode(e));
      var r = readFile(n);
      var a = JSONify(r, "parse");
      if (a instanceof Array) {
        for (var s in ((a = fixSettingsFile(a)), n.remove(), a)) {
          saveSettings(e, s, a[s]);
        }
      }
      return a[t];
    }
    function haveSettings(e, t, i) {
      if (isAE() && "settings" != i) {
        return app.settings.haveSetting(e, t);
      }
      var n = readFile(File(prefsLocation + prefsPrefix + File.encode(e)));
      if (null != n) {
        var r = JSONify(n.toString(), "parse");
        return (r instanceof Array && (r = fixSettingsFile(r)), t in r);
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
    function saveSettings(e, t, i, n) {
      if (isAE() && "settings" != n) {
        app.settings.saveSetting(e, t, i);
        app.preferences.saveToDisk();
      } else {
        var r = {};
        var a = File(prefsLocation + prefsPrefix + File.encode(e));
        if (a.exists) {
          var s = readFile(a);
          null != s && (r = JSONify(s.toString(), "parse"));
        }
        r instanceof Array && (r = fixSettingsFile(r));
        r[t] = i;
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
        (theLcs = false),
        alert(strScriptName + ": " + strLicenseRemoved),
        isServerConfigured(licenseValidity) ||
          (saveSettings(prefsSectionName, prefsName, bE("bad")),
          saveSettings(prefsSectionName, prefsVersionName, strScriptVersion),
          saveSettings(prefsSectionName, prefsLicVersion, licensingVersion)),
        !theLcs
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
            var t = false;
            if (
              ("l" == e && doUpdateCheck && checkForNewVersion(), 2 == licV)
            ) {
              if ("r" == e) {
                theLcs = !removeLic();
              } else {
                if ("-22" == (licenseValidity = getVerifCode("")).result) {
                  var i =
                    "e" in licenseValidity ? "\n" + licenseValidity.e : "";
                  alert(
                    licErrors[locale][checkErrorCode(licenseValidity.result)]
                      .title +
                      "\n" +
                      licErrors[locale][checkErrorCode(licenseValidity.result)]
                        .detail +
                      i,
                  );
                  getVerifCode("-");
                  t = true;
                  myReg =
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
                "" == (myReg = checkForLegacyLic()) &&
                  ((t = true),
                  (myReg =
                    isServerConfigured(licenseValidity) &&
                    isServerRunning(licenseValidity)
                      ? "@REMOTE"
                      : "trial"));
                theLcs = checkCode(t, myReg, privateNum);
              }
            } else {
              haveSettings(prefsSectionName, prefsName)
                ? ((myReg = getSettings(prefsSectionName, prefsName)),
                  (t = !(
                    "c" == e ||
                    !(
                      ("bad" == myReg || "bad" == bD(myReg) || offerTrial) &&
                      "trial" == bD(myReg)
                    )
                  )))
                : "c" == e
                  ? (saveSettings(
                      prefsSectionName,
                      prefsName,
                      bE((myReg = !isTimeLimited && offerTrial ? "trial" : "")),
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
                    (t = false))
                  : (t = true);
              theLcs = checkCode(t, myReg, privateNum);
            }
            return theLcs;
          }
        }
      }
    }
    var licensingVersion = "3.0.49";
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
    var supportTicketSKU = vars.hasOwnProperty("supportTicketSKU")
      ? vars.supportTicketSKU
      : "";
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
        : "https://aescripts.com/contact";
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
    var mx = __BLOB__BLOB_000168__;
    var wx = __BLOB__BLOB_000169__;
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
        "Eine neuere Version von " + strScriptName + " ist verf\xfcgbar: %v\n",
      en: "A newer version of " + strScriptName + " is available: %v\n",
      es:
        "Una versi\xf3n nueva de " +
        strScriptName +
        " est\xe1 disponible: %v\n",
      fr: "Une version plus de " + strScriptName + " est disponible: %v\n",
    });
    var strCurrentVersion = localize({
      de: "Votre version install\xe9e est: %v",
      en: "Your installed version is: %v",
      es: "Su versi\xf3n instalada es: %v",
      fr: "Votre version install\xe9e est: %v",
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
    var strReset = localize({
      de: "Lizenz zur\xfccksetzen",
      en: "Reset License",
      es: "Restablecer licencia",
      fr: "R\xe9initialiser la licence",
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
    var prefsDoUpdateCheckDisabledAlert =
      strHeader + "_doUpdateCheckDisabledAlert";
    var doUpdateCheckDisabledAlertAlreadyIssued = false;
    haveSettings(prefsSectionName, prefsDoUpdateCheck) &&
      (doUpdateCheckDisabledAlertAlreadyIssued = !(
        "false" == getSettings(prefsSectionName, prefsDoUpdateCheck)
      ));
    ScriptUI.environment.keyboardState.shiftKey &&
      ScriptUI.environment.keyboardState.altKey &&
      !ScriptUI.environment.keyboardState.ctrlKey &&
      !ScriptUI.environment.keyboardState.metaKey &&
      ((doUpdateCheck = false),
      saveSettings(prefsSectionName, prefsDoUpdateCheck, false),
      doUpdateCheckDisabledAlertAlreadyIssued ||
        (alert("New version update checks disabled"),
        (doUpdateCheckDisabledAlertAlreadyIssued = true),
        saveSettings(prefsSectionName, prefsDoUpdateCheckDisabledAlert, true)));
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
    var prefsLocation = Folder.userData.fullName + "/Aescripts/";
    var prefsPrefix = "pref_";
    isAE() || Folder(prefsLocation).exists || Folder(prefsLocation).create();
    var sanitizedName = sanitizeProductName(strScriptName);
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
  var Config = {
    defaults: {
      chooseShapeSize: true,
      creatorInnerRadius: 50,
      creatorOuterRadius: 100,
      creatorXSize: 100,
      creatorYSize: 100,
      gridFlexMode: 5,
      gridMatteMode: false,
      lastAEVersion: "",
      lastLicense: "",
      lastVersion: "0.0.0",
      lineFlexMode: 3,
      lineMatteMode: false,
      useLegacy: false,
      userDebug: false,
      verticalMode: false,
    },
    globals: {
      debug: eval("false"),
      logMaxSize: 2000000,
      resourcePath: aeq.file.joinPath(
        aeq.app.getUserDataFolder().fsName,
        "aescripts",
        "Flex",
      ),
      trial: false,
      trialMsg: [
        "Flex is in trial mode!",
        "Matte mode is disabled.",
        "Stroke Options (Inner/Outer) are disabled.",
      ].join(""),
    },
    lic: {
      betaExpirationDate: new Date("Apr 16, 2021"),
      betaStartDate: new Date("Nov 23, 2020"),
      betaSupportEmail: "zack@zacklovatt.com",
      helpButtons: [
        { name: "Documentation", url: "https://flex.lova.tt" },
        {
          name: "Other Products",
          url: "http://aescripts.com/authors/zack-lovatt",
        },
      ],
      helpText: [
        "Flex v1.0.0",
        "by Vincent Raineri (https://vincentraineri.com) & Zack Lovatt (http://zacklovatt.com)",
        "",
        "For help and information, click the Documentation button below, or visit: https://flex.lova.tt",
      ].join("\n"),
      offerBeta: false,
      offerTrial: true,
      privateNumber: 6945456492480383,
      productSKU: "ZLFX-SUL",
      scriptAuthor: "Zack Lovatt",
      scriptName: "Flex",
      scriptURL: "https://aescripts.com/flex/",
      scriptVersion: "1.0.0",
    },
    name: "Flex",
    reg: undefined,
    version: "1.0.0",
  };
  var Util = (function () {
    function bind(func, oThis) {
      if (!(func instanceof Function)) {
        throw new Error(
          "Function.prototype.bind - what is trying to be bound is not callable",
        );
      }
      var aArgs = Array.prototype.slice.call(arguments, 2);
      var fToBind = func;
      var fNOP = function () {};
      var fBound = function () {
        return fToBind.apply(
          this instanceof fNOP && oThis ? this : oThis,
          aArgs.concat(Array.prototype.slice.call(arguments)),
        );
      };
      fNOP.prototype = func.prototype;
      fBound.prototype = new fNOP();
      return fBound;
    }
    function replaceAll(string, search, replace) {
      return string.split(search).join(replace);
    }
    function buildDateString() {
      var date = new Date();
      var yyyy = date.getFullYear();
      var mm = date.getMonth() + 1;
      var dd = date.getDate();
      var formattedmm = mm < 10 ? "0" : "" + mm;
      var formatteddd = dd < 10 ? "0" : "" + dd;
      return yyyy.toString() + formattedmm.toString() + formatteddd.toString();
    }
    function buildTimeString() {
      var date = new Date();
      var hh = date.getHours();
      var mm = date.getMinutes();
      var ss = date.getSeconds();
      var formattedmm = mm < 10 ? "0" : "" + mm;
      var formattedss = ss < 10 ? "0" : "" + ss;
      return hh.toString() + formattedmm.toString() + formattedss.toString();
    }
    function buildError(msg, fileName, line, e) {
      function getStack() {
        var stack = aeq.arrayEx($.stack.split("\n"));
        stack.length -= 3;
        return stack
          .filter(function (line) {
            return line.indexOf("anonymous()") === -1;
          })
          .join(" >> ");
      }
      fileName = aeq.setDefault(
        fileName,
        File.decode($.fileName).replace(/^.*[\|\/]/, ""),
      );
      var regexTest = /[^\\|^\/]*$/g.exec(fileName);
      if (regexTest) {
        fileName = regexTest[0];
      }
      if (aeq.isNullOrUndefined(fileName)) {
        fileName = "";
      }
      var stack = getStack();
      var split = "----------------";
      var fileLine = "File:  " + fileName.toString();
      var lineLine = "Line:  " + line.toString();
      var stackLine = "Stack: " + stack.toString();
      var output = [msg, split, fileLine, lineLine, stackLine, split].join(
        "\n",
      );
      if (!aeq.isNullOrUndefined(e)) {
        output += "\n" + e.toString();
      }
      Log.error(output);
      if (!(Config.globals.debug || Prefs.getAsBool(PrefKey.UserDebug))) {
        return msg;
      }
      return output;
    }
    function paintObj(obj, colour) {
      obj.graphics.backgroundColor = obj.graphics.newBrush(
        obj.graphics.BrushType.SOLID_COLOR,
        colour,
      );
    }
    function getOrCreateFile(path, data, options) {
      options = aeq.setDefault(options, {
        encoding: "BINARY",
        overwrite: false,
      });
      var file = aeq.file.getFileObject(path);
      if (!file.exists || file.length !== data.length) {
        options.overwrite = true;
        file = aeq.file.writeFile(path, data, options);
      }
      return file;
    }
    function vecToPoints(vecCoord, options) {
      var points = [];
      options = aeq.setDefault(options, { offset: [0, 0], scale: 1 });
      var offset = aeq.setDefault(options.offset, [0, 0]);
      var scale = aeq.setDefault(options.scale, 1);
      for (var i = 0; i < vecCoord.length; i += 1) {
        var eachNum = vecCoord[i].split(/[\s,]/);
        var coordinates = [];
        var sets = [];
        for (var k = 0; k < eachNum.length; k += 2) {
          sets.push(eachNum[k] + "," + eachNum[k + 1]);
        }
        for (var j = 0; j < sets.length; j += 1) {
          n = sets[j].split(",");
          coordinates.push([
            (parseFloat(n[0]) + offset[0]) * scale,
            (parseFloat(n[1]) + offset[1]) * scale,
          ]);
        }
        points.push(coordinates);
      }
      return points;
    }
    function cleanString(input) {
      var output = "";
      for (var ii = 0; ii < input.length; ii += 1) {
        var nextChar = "?";
        if (input.charCodeAt(ii) <= 127) {
          nextChar = input.charAt(ii);
        }
        output += nextChar;
      }
      return output;
    }
    function capitalize(str) {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
    function escapeQuotes(str) {
      Log.trace("--> escapeQuotes: " + str.toString());
      var newString = str.split("\'").join("\\\'");
      Log.trace("<-- escapeQuotes: " + newString.toString());
      return newString;
    }
    function objToValues(obj) {
      var values = aeq.arrayEx();
      for (var key in obj) {
        if (!obj.hasOwnProperty(key)) {
          continue;
        }
        values.push(obj[key]);
      }
      return values;
    }
    return {
      bind: bind,
      buildDateString: buildDateString,
      buildError: buildError,
      buildTimeString: buildTimeString,
      capitalize: capitalize,
      cleanString: cleanString,
      escapeQuotes: escapeQuotes,
      getOrCreateFile: getOrCreateFile,
      objToValues: objToValues,
      paintObj: paintObj,
      replaceAll: replaceAll,
      vecToPoints: vecToPoints,
    };
  })();
  var Log = (function () {
    function _buildSpacing() {
      var spacer = "";
      try {
        stack = $.stack.split("\n");
      } catch (e) {
        return spacer;
      }
      stack.length = stack.length - 6;
      aeq.forEach(stack, function (stackItem) {
        if (stackItem.indexOf("anonymous") === -1) {
          spacer += " ";
        }
      });
      return spacer;
    }
    function _log(logLevel, text) {
      if (logLevel < level) {
        return;
      }
      var aepName = aeq.app.getAEPName();
      var aepStr = aepName ? Util.cleanString(aepName) + ".aep" : "Unsaved";
      var timeStr = Util.buildDateString() + "." + Util.buildTimeString();
      var line = [
        levels[logLevel],
        timeStr,
        aepStr,
        _buildSpacing() + Util.cleanString(text),
      ].join(" :: ");
      if (
        Config.globals.debug ||
        Prefs.getAsBool(PrefKey.UserDebug, { log: false })
      ) {
        writeLn(line);
        $.writeln(line);
      }
      if (logFileObject.length > Config.globals.logMaxSize) {
        clear();
      }
      logFileObject.open("a");
      var success = logFileObject.write(line + "\n");
      logFileObject.close();
      if (!success) {
        alert(
          "Could not write log... " +
            logFilePath.toString() +
            " - " +
            logFileObject.error.toString(),
          Config.name + " Error",
        );
        return;
      }
      return line;
    }
    function setLevel(logLevel) {
      level = logLevel;
      return level;
    }
    function reveal() {
      aeq.command.revealFile(logFilePath);
    }
    function clear() {
      aeq.app.ensureSecurityPrefEnabled();
      aeq.writeFile(logFileObject, "", { overwrite: true });
      logFileObject = aeq.file.getFileObject(logFilePath);
    }
    function initLevel() {
      setLevel(
        Config.globals.debug || Prefs.getAsBool(PrefKey.UserDebug) ? 0 : 2,
      );
    }
    function debug(text) {
      return _log(0, text);
    }
    function trace(text) {
      return _log(1, text);
    }
    function info(text) {
      return _log(2, text);
    }
    function warning(text) {
      return _log(3, text);
    }
    function error(text) {
      return _log(4, text);
    }
    function fatal(text) {
      return _log(5, text);
    }
    var logFileName = Config.name + " Log.txt";
    var logFilePath = aeq.file.joinPath(
      Config.globals.resourcePath,
      logFileName,
    );
    var logFileObject = aeq.getFileObject(logFilePath);
    aeq.app.ensureSecurityPrefEnabled();
    if (!logFileObject.exists) {
      logFileObject = aeq.file.writeFile(logFileObject, "");
    }
    var level = 2;
    var levels = {
      0: "debug",
      1: "trace",
      2: "info",
      3: "warning",
      4: "error",
      5: "fatal",
    };
    return {
      debug: debug,
      error: error,
      fatal: fatal,
      info: info,
      initLevel: initLevel,
      reveal: reveal,
      setLevel: setLevel,
      trace: trace,
      warning: warning,
    };
  })();
  var Prefs = (function () {
    function savePrefs() {
      app.preferences.saveToDisk();
      app.preferences.reload();
    }
    function set(key, val, options) {
      options = aeq.setDefault(options, {});
      var save = aeq.setDefault(options.save, true);
      var log = aeq.setDefault(options.log, true);
      if (log) {
        Log.trace("Prefs.set: \'" + key + "\' to " + JSON.stringify(val));
      }
      if (aeq.isNullOrUndefined(val)) {
        throw Util.buildError(
          "Can\'t save pref " + key + "!",
          "preferences.js",
          $.line - startLineNum,
        );
      }
      var valAsString = typeof val === "string" ? val : JSON.stringify(val);
      app.settings.saveSetting(Config.name, key, encodeURI(valAsString));
      if (save) {
        savePrefs();
      }
    }
    function get(key, options) {
      options = aeq.setDefault(options, {});
      if (!app.settings.haveSetting(Config.name, key)) {
        var value = aeq.setDefault(options.fallback, Config.defaults[key]);
        set(key, value, options);
      }
      var savedValue = app.settings.getSetting(Config.name, key);
      return decodeURI(savedValue);
    }
    function getAsBool(key, options) {
      return get(key, options) === "true";
    }
    function getAsArray(key, options) {
      var prefArray = JSON.parse(get(key, options));
      if (prefArray.toString() === "") {
        return aeq.arrayEx();
      }
      return aeq.arrayEx(prefArray);
    }
    function getAsInt(key, options) {
      return parseInt(get(key, options));
    }
    function getAsIntArray(key, options) {
      var strArray = getAsArray(key, options);
      if (strArray.length === 1 && strArray[0] === "") {
        return aeq.arrayEx();
      }
      var outputArray = [];
      for (var ii = 0, il = strArray.length; ii < il; ii++) {
        var strArrayItem = strArray[ii];
        outputArray.push(parseInt(strArrayItem, 10));
      }
      return outputArray;
    }
    function getAsFloat(key, options) {
      return parseFloat(get(key, options));
    }
    function getAsFloatArray(key, options) {
      var strArray = getAsArray(key, options);
      if (strArray.length === 1 && strArray[0] === "") {
        return aeq.arrayEx();
      }
      var outputArray = [];
      for (var ii = 0, il = strArray.length; ii < il; ii++) {
        var strArrayItem = strArray[ii];
        outputArray.push(parseFloat(strArrayItem));
      }
      return outputArray;
    }
    function remove(key, options) {
      if (!app.preferences.havePref("Settings_" + Config.name, key)) {
        return;
      }
      options = aeq.setDefault(options, {});
      var save = aeq.setDefault(options.save, true);
      var log = aeq.setDefault(options.log, true);
      if (log) {
        Log.trace("Prefs.remove: \'" + key + "\'");
      }
      app.preferences.deletePref("Settings_" + Config.name, key);
      if (save) {
        savePrefs();
      }
    }
    function removeAll() {
      try {
        Log.info(JSON.stringify(Prefs.getAll()));
      } catch (e) {
        $.writeln("Error dumping prefs... continuing to remove.");
        writeLn("Error dumping prefs... continuing to remove.");
      }
      for (var key in Config.defaults) {
        if (!Config.defaults.hasOwnProperty(key)) {
          continue;
        }
        remove(key, { save: false });
      }
      savePrefs();
    }
    function reset(key, options) {
      Log.trace("Prefs.reset: \'" + key + "\'");
      set(key, Config.defaults[key], options);
      var savedValue = app.settings.getSetting(Config.name, key);
      return decodeURI(savedValue);
    }
    function resetAll() {
      for (var key in Config.defaults) {
        if (!Config.defaults.hasOwnProperty(key)) {
          continue;
        }
        reset(key, { save: false });
      }
      savePrefs();
    }
    function getAll() {
      var prefsObj = {};
      for (var key in Config.defaults) {
        if (!Config.defaults.hasOwnProperty(key)) {
          continue;
        }
        prefsObj[key] = get(key);
      }
      return prefsObj;
    }
    var startLineNum = $.line - 2;
    return {
      get: get,
      getAll: getAll,
      getAsArray: getAsArray,
      getAsBool: getAsBool,
      getAsFloat: getAsFloat,
      getAsFloatArray: getAsFloatArray,
      getAsInt: getAsInt,
      getAsIntArray: getAsIntArray,
      remove: remove,
      removeAll: removeAll,
      reset: reset,
      resetAll: resetAll,
      savePrefs: savePrefs,
      set: set,
    };
  })();
  MainUI.prototype = {
    activeTab: "tabLine",
    btnAddGridControlsClick: function () {
      this.onAddGridControlsClick();
    },
    btnCreateCircleClick: function () {
      this.onCreateCircleClick();
    },
    btnCreateColumnClick: function () {
      Prefs.set(PrefKey.GridMatteMode, this.cbGridMatteMode.value);
      this.onCreateColumnClick();
    },
    btnCreateColumnRulerClick: function () {
      this.onCreateColumnRulerClick();
    },
    btnCreateCompClick: function () {
      this.onCreateCompClick();
    },
    btnCreateLineRigClick: function () {
      Prefs.set(PrefKey.VerticalMode, this.rbVerticalMode.value);
      Prefs.set(PrefKey.LineMatteMode, this.cbLineMatteMode.value);
      this.onCreateLineRigClick();
    },
    btnCreatePolyClick: function () {
      this.onCreatePolyClick();
    },
    btnCreateRowClick: function () {
      Prefs.set(PrefKey.GridMatteMode, this.cbGridMatteMode.value);
      this.onCreateRowClick();
    },
    btnCreateRowRulerClick: function () {
      this.onCreateRowRulerClick();
    },
    btnCreateSquareClick: function () {
      this.onCreateSquareClick();
    },
    btnCreateStarClick: function () {
      this.onCreateStarClick();
    },
    btnCreateTextClick: function () {
      this.onCreateTextClick();
    },
    btnOptionsClick: function () {
      this.onOptionsClick();
      Config.trial = !Config.reg.s();
      this.trialBlocks();
    },
    btnRemoveGridRigClick: function () {
      this.onRemoveGridRigClick();
    },
    btnRemoveLineRigClick: function () {
      this.onRemoveLineRigClick();
    },
    btnStrokeInnerClick: function () {
      this.onStrokeInnerClick();
    },
    btnStrokeNormalClick: function () {
      this.onStrokeNormalClick();
    },
    btnStrokeOuterClick: function () {
      this.onStrokeOuterClick();
    },
    btnUpdateLineSizesClick: function () {
      this.onUpdateLineSizesClick();
    },
    close: function () {
      this.win.close();
    },
    createIconButton: function createIconButton(uiGroup, buttonData, onClick) {
      try {
        var resourcePath = Config.globals.resourcePath;
        var buttonName = buttonData.name;
        var imgButton = ScriptUI.newImage(
          Util.getOrCreateFile(
            aeq.file.joinPath(resourcePath, "icons", buttonName + ".png"),
            buttonData.imageString,
          ).fsName,
        );
        var imgButtonHover = ScriptUI.newImage(
          Util.getOrCreateFile(
            aeq.file.joinPath(resourcePath, "icons", buttonName + "_hover.png"),
            buttonData.hoverString,
          ).fsName,
        );
        var btn = uiGroup.addImage(imgButton);
        btn.imgDefault = imgButton;
        btn.imgHover = imgButtonHover;
        btn.size = aeq.setDefault(buttonData.size, [32, 32]);
        btn.onDraw = this.simpleDraw;
        var me = this;
        if (me.activeTab === buttonName) {
          btn.image = imgButtonHover;
        }
        btn.addEventListener("click", onClick);
        btn.addEventListener("mouseover", function () {
          btn.image = imgButtonHover;
        });
        btn.addEventListener("mouseout", function () {
          if (me.activeTab === buttonName) {
            btn.image = imgButtonHover;
          } else {
            btn.image = imgButton;
          }
        });
        if (buttonData.helpTip) {
          btn.helpTip = buttonData.helpTip;
        }
        return btn;
      } catch (e) {
        throw Util.buildError(
          "Couldn\'t create icon button!" + buttonData
            ? "(" + buttonData.name + ")"
            : "",
          "mainui.js",
          $.line - this.startLineNum,
          e,
        );
      }
    },
    ddlGridFlexModeChange: function () {
      var newFlexMode = this.ddlGridFlexMode.selection.index;
      Prefs.set(PrefKey.GridFlexMode, newFlexMode);
      this.onUpdateFlexMode(newFlexMode);
    },
    ddlLineFlexModeChange: function () {
      var newFlexMode = this.ddlLineFlexMode.selection.index;
      Prefs.set(PrefKey.LineFlexMode, newFlexMode);
      this.onUpdateFlexMode(newFlexMode);
    },
    init: function () {
      this.rbVerticalMode.value = Prefs.getAsBool(PrefKey.VerticalMode);
      this.rbHorizontalMode.value = !this.rbVerticalMode.value;
      this.cbLineMatteMode.value = Prefs.getAsBool(PrefKey.LineMatteMode);
      this.ddlLineFlexMode.selection = Prefs.getAsInt(PrefKey.LineFlexMode);
      this.cbGridMatteMode.value = Prefs.getAsBool(PrefKey.GridMatteMode);
      this.ddlGridFlexMode.selection = Prefs.getAsInt(PrefKey.GridFlexMode);
      this.ddlLineFlexMode.onChange = Util.bind(
        this.ddlLineFlexModeChange,
        this,
      );
      this.ddlGridFlexMode.onChange = Util.bind(
        this.ddlGridFlexModeChange,
        this,
      );
      this.trialBlocks();
    },
    onAddGridControlsClick: undefined,
    onCreateCircleClick: undefined,
    onCreateColumnClick: undefined,
    onCreateColumnRulerClick: undefined,
    onCreateCompClick: undefined,
    onCreateLineRigClick: undefined,
    onCreatePolyClick: undefined,
    onCreateRowClick: undefined,
    onCreateRowRulerClick: undefined,
    onCreateSquareClick: undefined,
    onCreateStarClick: undefined,
    onCreateTextClick: undefined,
    onOptionsClick: undefined,
    onRemoveGridRigClick: undefined,
    onRemoveLineRigClick: undefined,
    onStrokeInnerClick: undefined,
    onStrokeNormalClick: undefined,
    onStrokeOuterClick: undefined,
    onUpdateFlexMode: undefined,
    onUpdateLineSizesClick: undefined,
    show: function () {
      this.win.show();
    },
    simpleDraw: function simpleDraw() {
      this.graphics.drawImage(this.image, 0, 0, this.size[0], this.size[1]);
    },
    trialBlocks: function () {
      if (!Config.globals.trial) {
        return;
      }
      this.cbLineMatteMode.enabled = false;
      this.cbLineMatteMode.value = false;
      this.cbLineMatteMode.helpTip = "Line Matte disabled in trial mode!";
      Prefs.set(PrefKey.LineMatteMode, false);
      this.cbGridMatteMode.enabled = false;
      this.cbGridMatteMode.value = false;
      this.cbGridMatteMode.helpTip = "Grid Matte disabled in trial mode!";
      Prefs.set(PrefKey.GridMatteMode, false);
      this.grpStrokes.obj.enabled = false;
      this.btnStrokeInner.helpTip =
        this.btnStrokeNormal.helpTip =
        this.btnStrokeOuter.helpTip =
          "Stroke tools disabled in trial mode!";
    },
  };
  OptionsUI.prototype = {
    btnResetPrefsClick: function btnResetPrefsClick() {
      Prefs.removeAll();
      this.init();
      Log.initLevel();
    },
    btnRevealLogClick: function btnRevealLogClick() {
      Log.debug(JSON.stringify(Prefs.getAll()));
      Log.reveal();
    },
    close: function close() {
      this.win.close();
    },
    init: function init() {
      this.cbChooseShapeSizes.value = Prefs.getAsBool(PrefKey.ChooseShapeSize);
      this.cbUseLegacyExpressions.value = Prefs.getAsBool(
        PrefKey.UseLegacyExpressions,
      );
      this.cbUserDebug.value = Prefs.getAsBool(PrefKey.UserDebug);
    },
    launchHelp: function launchHelp() {
      Config.reg.helpUI();
    },
    save: function save() {
      if (aeq.getModifiers().shift) {
        this.tabDebug.obj.visible = !this.tabDebug.obj.visible;
        this.tabDebug.obj.enabled = !this.tabDebug.obj.enabled;
        this.tabDebug.obj.text = this.tabDebug.obj.text === "" ? "DEBUG" : "";
        return;
      }
      Prefs.set(PrefKey.ChooseShapeSize, this.cbChooseShapeSizes.value);
      Prefs.set(
        PrefKey.UseLegacyExpressions,
        this.cbUseLegacyExpressions.value,
      );
      Prefs.set(PrefKey.UserDebug, this.cbUserDebug.value);
      Log.initLevel();
      this.close();
    },
    show: function show() {
      this.win.show();
    },
  };
  ShapeSizeUI.prototype = {
    close: function close() {
      this.win.close();
    },
    init: function init(itemType) {
      var sizeX = 0;
      var sizeY = 0;
      var xLabelText = "X Size";
      var yLabelText = "Y Size";
      switch (itemType) {
        case "square":
        case "circle":
          sizeX = Prefs.getAsFloat(PrefKey.CreatorXSize);
          sizeY = Prefs.getAsFloat(PrefKey.CreatorYSize);
          break;
        case "poly":
          this.etXInput.enabled = false;
          this.etXInput.helpTip = "Polygons don\'t have an Inner Radius.";
        case "star":
          sizeX = Prefs.getAsFloat(PrefKey.CreatorInnerRadius);
          sizeY = Prefs.getAsFloat(PrefKey.CreatorOuterRadius);
          xLabelText = "Inner Radius";
          yLabelText = "Outer Radius";
          break;
        default:
          break;
      }
      this.stXLabel.text = xLabelText + ":";
      this.stYLabel.text = yLabelText + ":";
      this.etXInput.text = sizeX.toString();
      this.etYInput.text = sizeY.toString();
    },
    save: function save() {
      var xValue = parseInt(this.etXInput.text, 10);
      if (isNaN(xValue) || xValue < 0) {
        alert("X Value is not a valid number!");
        return;
      }
      var yValue = parseInt(this.etYInput.text, 10);
      if (isNaN(yValue) || yValue < 0) {
        alert("Y Value is not a valid number!");
        return;
      }
      switch (this.itemType) {
        case "square":
        case "circle":
          Prefs.set(PrefKey.CreatorXSize, xValue);
          Prefs.set(PrefKey.CreatorYSize, yValue);
          break;
        case "poly":
        case "star":
          Prefs.set(PrefKey.CreatorInnerRadius, xValue);
          Prefs.set(PrefKey.CreatorOuterRadius, yValue);
          break;
        default:
          break;
      }
      this.size = [xValue, yValue];
      this.close();
    },
    show: function show() {
      this.win.show();
    },
    size: [-1, -1],
  };
  var Style = {
    CenterRow: { alignChildren: "right", orientation: "row" },
    FillBottomColumn: {
      alignChildren: ["fill", "bottom"],
      alignment: ["fill", "bottom"],
      orientation: "column",
    },
    FillBottomRow: {
      alignChildren: ["fill", "bottom"],
      alignment: ["fill", "bottom"],
      orientation: "row",
    },
    FillCenterRow: {
      alignChildren: ["fill", "center"],
      alignment: ["fill", "center"],
      orientation: "row",
    },
    FillFillCol: {
      alignChildren: ["fill", "fill"],
      alignment: ["fill", "fill"],
      orientation: "column",
    },
    FillFillRow: {
      alignChildren: ["fill", "fill"],
      alignment: ["fill", "fill"],
      orientation: "row",
    },
    FillTopCol: {
      alignChildren: ["fill", "top"],
      alignment: ["fill", "top"],
      orientation: "column",
    },
    FillTopRightRow: {
      alignChildren: ["fill", "top"],
      alignment: "right",
      orientation: "row",
    },
    FillTopRow: {
      alignChildren: ["fill", "top"],
      alignment: ["fill", "top"],
      orientation: "row",
    },
    OptionsTab: { alignChildren: "left", orientation: "column", spacing: 0 },
    RightRow: { alignChildren: "right", orientation: "row" },
    RightTop: { alignChildren: ["right", "top"], alignment: ["right", "top"] },
  };
  var ButtonData = (function () {
    return {
      addGridControls: {
        helpTip: "Adds grid rig controllers to a layer for manual rigging",
        hoverString: __BLOB__BLOB_000170__,
        imageString: __BLOB__BLOB_000171__,
        name: "addGridControls",
      },
      createCircle: {
        helpTip: "Creates a Circle Shape Layer",
        hoverString: __BLOB__BLOB_000172__,
        imageString: __BLOB__BLOB_000173__,
        name: "createCircle",
      },
      createColumn: {
        helpTip: "Create column ruler control",
        hoverString: __BLOB__BLOB_000174__,
        imageString: __BLOB__BLOB_000175__,
        name: "createColumn",
      },
      createPoly: {
        helpTip: "Creates a Polygon Shape Layer",
        hoverString: __BLOB__BLOB_000176__,
        imageString: __BLOB__BLOB_000177__,
        name: "createPoly",
      },
      createPrecomp: {
        helpTip: "Precomps Selected Layers",
        hoverString: __BLOB__BLOB_000178__,
        imageString: __BLOB__BLOB_000179__,
        name: "createPrecomp",
      },
      createRow: {
        helpTip: "Create row ruler control",
        hoverString: __BLOB__BLOB_000180__,
        imageString: __BLOB__BLOB_000181__,
        name: "createRow",
      },
      createSquare: {
        helpTip: "Creates a Square Shape Layer",
        hoverString: __BLOB__BLOB_000182__,
        imageString: __BLOB__BLOB_000183__,
        name: "createSquare",
      },
      createStar: {
        helpTip: "Creates a Star Shape Layer",
        hoverString: __BLOB__BLOB_000184__,
        imageString: __BLOB__BLOB_000185__,
        name: "createStar",
      },
      createText: {
        helpTip: "Creates a Text Layer",
        hoverString: __BLOB__BLOB_000186__,
        imageString: __BLOB__BLOB_000187__,
        name: "createText",
      },
      options: {
        helpTip: "Launch Options",
        hoverString: __BLOB__BLOB_000188__,
        imageString: __BLOB__BLOB_000189__,
        name: "options",
      },
      rigColumn: {
        helpTip: [
          "Autorig selected layer(s) into a grid column",
          "Hold SHIFT to create a new column for your layer(s)",
        ].join("\n"),
        hoverString: __BLOB__BLOB_000190__,
        imageString: __BLOB__BLOB_000191__,
        name: "rigColumn",
        size: [96, 32],
      },
      rigLine: {
        helpTip: [
          "Creates a Line-based rig from selected layers",
          "Hold SHIFT to add selected layer(s) to existing rig",
        ].join("\n"),
        hoverString: __BLOB__BLOB_000192__,
        imageString: __BLOB__BLOB_000193__,
        name: "rigLine",
        size: [96, 32],
      },
      rigRow: {
        helpTip: [
          "Autorig selected layer(s) into a grid row",
          "Hold SHIFT to create a new row for your layer(s)",
        ].join("\n"),
        hoverString: __BLOB__BLOB_000194__,
        imageString: __BLOB__BLOB_000195__,
        name: "rigRow",
        size: [96, 32],
      },
      strokeInner: {
        helpTip: "Rigs selected shape layer(s) with an Inner stroke",
        hoverString: __BLOB__BLOB_000196__,
        imageString: __BLOB__BLOB_000197__,
        name: "strokeInner",
      },
      strokeNormal: {
        helpTip: "Rigs selected shape layer(s) with an Normal stroke",
        hoverString: __BLOB__BLOB_000198__,
        imageString: __BLOB__BLOB_000199__,
        name: "strokeNormal",
      },
      strokeOuter: {
        helpTip: "Rigs selected shape layer(s) with an Outer stroke",
        hoverString: __BLOB__BLOB_000200__,
        imageString: __BLOB__BLOB_000201__,
        name: "strokeOuter",
      },
      tabCreator: {
        hoverString: __BLOB__BLOB_000202__,
        imageString: __BLOB__BLOB_000203__,
        name: "tabCreator",
        size: [64, 32],
      },
      tabGrid: {
        hoverString: __BLOB__BLOB_000204__,
        imageString: __BLOB__BLOB_000205__,
        name: "tabGrid",
        size: [64, 32],
      },
      tabLine: {
        hoverString: __BLOB__BLOB_000206__,
        imageString: __BLOB__BLOB_000207__,
        name: "tabLine",
        size: [64, 32],
      },
      unrig: {
        helpTip: [
          "Deletes selected rig(s)",
          "Hold SHIFT to unrig selected layer(s) instead",
        ].join("\n"),
        hoverString: __BLOB__BLOB_000208__,
        imageString: __BLOB__BLOB_000209__,
        name: "unrig",
      },
      update: {
        helpTip: "Recalculates sizes of line layers",
        hoverString: __BLOB__BLOB_000210__,
        imageString: __BLOB__BLOB_000211__,
        name: "update",
      },
    };
  })();
  var Constants = {
    EFFECTS: {
      FLEXMODES: {
        FlexFitHeight: "Fit Height",
        FlexFitWidth: "Fit Width",
        FlexMax: "Fill",
        FlexMin: "Fit Best",
        FlexNone: "None",
        FlexStretch: "Stretch",
      },
      GRIDLAYER: {
        EffectName: "Flex Grid Layer",
        GridBottomBound: "Bottom",
        GridLeftBound: "Left",
        GridRightBound: "Right",
        GridTopBound: "Top",
      },
      LINECONTROLLER: {
        ContainerBoundName: "Bound",
        ContainerFlexRatioName: "Ratio",
        ContainerName: "Container Layer",
        ContainerSizeName: "Size",
        EffectName: "Flex Line Control",
        LayerCountName: "Counts",
        VerticalModeName: "Vertical Mode?",
      },
      LINELAYER: {
        EffectName: "Flex Line Layer",
        LayerCoordinateName: "Coordinate",
        LayerInitialName: "Initial",
        LayerSizeName: "Size",
        LayerWeightName: "Layer Weight",
      },
      SHARED: {
        GutterSizeName: "Gutter",
        LayerFlexModeName: "Flex Mode",
        LayerScaleOffsetName: "Scale Offset",
        LayerUniformScaleName: "Uniform Scale Offset",
      },
    },
    LAYERS: {
      GridRigControllerName: "Grid Rig Control",
      LineRigControllerName: "Line Rig Control",
      MatteName: "Flex Matte - ",
    },
  };
  var Core = (function () {
    function checkVersions() {
      Log.trace("--> checkVersions");
      if (!Config.globals.debug && Config.reg.t()) {
        alert(Config.globals.trialMsg, Config.name + " Warning");
        Config.globals.trial = true;
      }
      var versionsMatch = Prefs.get(PrefKey.LastVersion) === Config.version;
      var aeVersionsMatch = Prefs.get(PrefKey.LastAEVersion) === app.version;
      if (!versionsMatch || !aeVersionsMatch) {
        Log.info(
          "AE v" + app.version + " - " + Config.name + " v" + Config.version,
        );
        Prefs.set(PrefKey.LastVersion, Config.version);
        Prefs.set(PrefKey.LastAEVersion, app.version);
      }
      var licenseLine = Config.reg.getRegistration();
      var licensingMatches = Prefs.get(PrefKey.LastLicense) === licenseLine;
      if (!licensingMatches) {
        Log.info(licenseLine);
        Prefs.set(PrefKey.LastLicense, licenseLine);
      }
      Log.trace("<-- checkVersions");
    }
    function isValidLayer(layer) {
      return (
        aeq.isAVLayer(layer) ||
        aeq.isShapeLayer(layer) ||
        aeq.isTextLayer(layer) ||
        aeq.isPrecomp(layer)
      );
    }
    function findLayersWithEffect(layers, effectName) {
      Log.trace("--> findLayersWithEffect");
      var matchingLayers = layers.filter(function (layer) {
        var layerEffect = findLayerEffect(layer, effectName);
        return !aeq.isNullOrUndefined(layerEffect);
      });
      Log.trace(
        "<-- findLayersWithEffect: Found " + matchingLayers.length + " layers",
      );
      return matchingLayers;
    }
    function findNullsWithEffect(layers, effectName) {
      Log.trace("--> findNullsWithEffect");
      var nullLayers = layers.filter(function (layer) {
        return layer.nullLayer;
      });
      var rigControllers = findLayersWithEffect(nullLayers, effectName);
      Log.trace(
        "<-- findNullsWithEffect: Found " +
          rigControllers.length +
          " controllers",
      );
      return rigControllers;
    }
    function findLayerEffect(layer, effectName) {
      Log.trace("--> findLayerEffect: \'" + effectName.toString() + "\'");
      var effects = aeq.getEffects(layer);
      var effect = effects.find(function (effect) {
        return effect.name === effectName || effect.matchName === effectName;
      });
      if (!effect) {
        Log.trace("<-- findLayerEffect: Effect not found");
        return;
      }
      Log.trace("<-- findLayerEffect: Found effect");
      return effect;
    }
    function isGridRuler(layer) {
      var score = 0;
      if (aeq.isShapeLayer(layer)) {
        score += 1;
      }
      if (layer.guideLayer) {
        score += 0.5;
      }
      if (layer.label === 14) {
        score += 1;
      }
      if (layer.transform.position.dimensionsSeparated === true) {
        score += 0.5;
      }
      if (
        layer.name.indexOf("ROW ") === 0 ||
        layer.name.indexOf("COL ") === 0
      ) {
        score += 2;
      }
      return score > 3;
    }
    function getExpression(type) {
      Log.trace("--> getExpression: " + type);
      var useLegacy = Prefs.getAsBool(PrefKey.UseLegacyExpressions);
      var useFull = Config.globals.debug || Prefs.getAsBool(PrefKey.UserDebug);
      var version = useLegacy ? "legacy" : "modern";
      var length = useFull ? "full" : "minified";
      var args = Array.prototype.slice.call(arguments);
      args.shift();
      Log.trace(
        "Getting: \'" +
          type.toString() +
          "\', \'" +
          version.toString() +
          "\', \'" +
          length.toString() +
          "\'",
      );
      var expression = Expressions[type][version][length](args);
      Log.trace("<-- getExpression: " + type + ", " + version + ", " + length);
      return expression;
    }
    function checkExpressionEngine() {
      Log.trace("--> checkExpressionEngine");
      if (aeq.app.version >= 16) {
        var oldEngine = app.project.expressionEngine === "extendscript";
        if (oldEngine) {
          var doSwitchEngine = confirm(
            "Your project is using the old expression engine. Switching to the new one will make the expressions MUCH faster. Can I do this for you?",
            false,
            Config.name + " Warning",
          );
          if (doSwitchEngine) {
            app.project.expressionEngine = "javascript-1.0";
          }
          Prefs.set(PrefKey.UseLegacyExpressions, !doSwitchEngine);
        }
      }
      Log.trace("<-- checkExpressionEngine");
    }
    function removeController(layer) {
      Log.trace("--> removeController: \'" + layer.name + "\'");
      var source = layer.source;
      var removeSource = false;
      if (source && source.usedIn.length === 1) {
        removeSource = true;
      }
      layer.locked = false;
      layer.remove();
      if (removeSource) {
        source.remove();
      }
      Log.trace("<-- removeController: Removed layer");
    }
    function getLayerCoordinateProp(layer) {
      Log.trace(
        "--> getLayerCoordinateProp: Getting coordinate of \'" +
          layer.name.toString() +
          "\'",
      );
      var layerControlEffect = Core.findLayerEffect(
        layer,
        Constants.EFFECTS.LINELAYER.EffectName,
      );
      if (!layerControlEffect) {
        return;
      }
      var slCoordinateProp = layerControlEffect.property(
        Constants.EFFECTS.LINELAYER.LayerCoordinateName,
      );
      if (!aeq.isProperty(slCoordinateProp)) {
        return;
      }
      Log.trace("<-- getLayerCoordinateProp: Found coordinate prop");
      return slCoordinateProp;
    }
    function getLayerByCoordinate(layers, coordinate) {
      Log.trace(
        "--> getLayerByCoordinate: Searching " +
          layers.length.toString() +
          " for coordinate #" +
          coordinate.toString(),
      );
      if (layers.length === 0) {
        Log.trace("<-- getLayerByCoordinate: No layers!");
        return;
      }
      var time = layers[0].containingComp.time;
      var coordinateLayer = layers.find(function (layer) {
        var layerCoordinateProp = Core.getLayerCoordinateProp(layer);
        if (!layerCoordinateProp) {
          return false;
        }
        var layerCoordinate = layerCoordinateProp.valueAtTime(time, false);
        return Math.round(layerCoordinate) === coordinate;
      });
      if (aeq.isNullOrUndefined(coordinateLayer)) {
        Log.trace("<-- getLayerByCoordinate: No layer!");
        return;
      }
      Log.trace("<-- getLayerByCoordinate: Found layer!");
      return coordinateLayer;
    }
    function getOrCreateGridController(comp) {
      Log.trace("--> getOrCreateGridController");
      var compLayers = aeq.getLayers(comp);
      var controllerNulls = Core.findNullsWithEffect(
        compLayers,
        Constants.EFFECTS.SHARED.GutterSizeName,
      );
      if (controllerNulls.length > 0) {
        controller = controllerNulls[0];
      }
      if (!controller) {
        controller = comp.layers.addNull();
        controller.enabled = false;
        controller.guideLayer = true;
        controller.label = 14;
        controller.name = Constants.LAYERS.GridRigControllerName;
        controller.moveToBeginning();
        var effects = controller.property("ADBE Effect Parade");
        if (!aeq.isPropertyGroup(effects)) {
          return;
        }
        var slGutterSize = effects.addProperty("ADBE Slider Control");
        slGutterSize.name = Constants.EFFECTS.SHARED.GutterSizeName;
      }
      Log.trace("<-- getOrCreateGridController");
      return controller;
    }
    function createComponentRuler(comp, direction) {
      Log.trace("--> createComponentRuler");
      var rulerColor = [0.596078431372549, 0.12549019607843137, 1];
      var ruler = comp.layers.addShape();
      ruler.guideLayer = true;
      ruler.label = 14;
      ruler.transform.position.dimensionsSeparated = true;
      if (direction === "row") {
        rulerColor = [0.9921568627450981, 0.27450980392156865, 1];
        var xProp = ruler.transform.property("ADBE Position_0");
        if (!aeq.isProperty(xProp)) {
          return;
        }
        xProp.expression = Core.getExpression("rulerX");
      } else {
        var yProp = ruler.transform.property("ADBE Position_1");
        if (!aeq.isProperty(yProp)) {
          return;
        }
        yProp.expression = Core.getExpression("rulerY");
      }
      var contents = ruler.property("ADBE Root Vectors Group");
      if (!aeq.isPropertyGroup(contents)) {
        return;
      }
      var rect = contents.addProperty("ADBE Vector Shape - Rect");
      var rectSizeProp = rect.property("ADBE Vector Rect Size");
      if (!aeq.isProperty(rectSizeProp)) {
        return;
      }
      rectSizeProp.setValue(
        direction === "row" ? [comp.width * 1.5, 0] : [0, comp.height * 1.5],
      );
      var stroke = contents.addProperty("ADBE Vector Graphic - Stroke");
      var strokeColorProp = stroke.property("ADBE Vector Stroke Color");
      if (!aeq.isProperty(strokeColorProp)) {
        return;
      }
      strokeColorProp.setValue(rulerColor);
      var dashes = stroke.property("ADBE Vector Stroke Dashes");
      if (!aeq.isPropertyGroup(dashes)) {
        return;
      }
      var dash = dashes.addProperty("ADBE Vector Stroke Dash 1");
      if (!aeq.isProperty(dash)) {
        return;
      }
      dash.setValue(11);
      Log.trace("<-- createComponentRuler");
      return ruler;
    }
    function getOrCreateBoundSelectors(layer, direction, boundRulers) {
      Log.trace(
        "--> getOrCreateBoundSelectors: \'" + layer.name.toString() + "\'",
      );
      var priorBoundIndex = boundRulers ? boundRulers[0].index : 0;
      var nextBoundIndex = boundRulers ? boundRulers[1].index : 0;
      var flexEffect = Core.getOrCreatePseudoeffect(
        layer,
        Pseudoeffects.GridLayer,
      );
      var ddlTopSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridTopBound,
      );
      if (!aeq.isProperty(ddlTopSelectorProp)) {
        return;
      }
      ddlTopSelectorProp.setValue(
        direction === "row" ? priorBoundIndex : ddlTopSelectorProp.value,
      );
      var ddlBottomSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridBottomBound,
      );
      if (!aeq.isProperty(ddlBottomSelectorProp)) {
        return;
      }
      ddlBottomSelectorProp.setValue(
        direction === "row" ? nextBoundIndex : ddlBottomSelectorProp.value,
      );
      var ddlLeftSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridLeftBound,
      );
      if (!aeq.isProperty(ddlLeftSelectorProp)) {
        return;
      }
      ddlLeftSelectorProp.setValue(
        direction === "column" ? priorBoundIndex : ddlLeftSelectorProp.value,
      );
      var ddlRightSelectorProp = flexEffect.property(
        Constants.EFFECTS.GRIDLAYER.GridRightBound,
      );
      if (!aeq.isProperty(ddlRightSelectorProp)) {
        return;
      }
      ddlRightSelectorProp.setValue(
        direction === "column" ? nextBoundIndex : ddlRightSelectorProp.value,
      );
      Log.trace("<-- getOrCreateBoundSelectors: Created!");
      return aeq.arrayEx([
        ddlTopSelectorProp,
        ddlBottomSelectorProp,
        ddlLeftSelectorProp,
        ddlRightSelectorProp,
      ]);
    }
    function getOrCreatePseudoeffect(layer, pseudoeffect) {
      Log.trace(
        "--> getOrCreatePseudoeffect: Applying \'" +
          pseudoeffect.matchName.toString() +
          "\' to \'" +
          layer.name.toString() +
          "\'",
      );
      var existingEffect = findLayerEffect(layer, pseudoeffect.matchName);
      if (existingEffect) {
        Log.trace("<-- getOrCreatePseudoeffect: Found existing");
        return existingEffect;
      }
      var layerIndex = layer.index;
      var comp = layer.containingComp;
      aeq.forEachLayer(comp, function (compLayer) {
        compLayer.selected = false;
      });
      comp.layer(layerIndex).selected = true;
      var pseudoeffectFFX = getOrCreateFFXFile(pseudoeffect);
      layer.applyPreset(pseudoeffectFFX);
      var newEffect = findLayerEffect(layer, pseudoeffect.matchName);
      if (!newEffect) {
        throw Util.buildError(
          "Error applying effect \'" + pseudoeffect.matchName + "\'",
          "core.js",
          $.line - startLineNum,
        );
      }
      Log.trace("<-- getOrCreatePseudoeffect: Created new effect");
      return newEffect;
    }
    function getOrCreateFFXFile(pseudoeffect) {
      Log.trace(
        "--> getOrCreateFFXFile: \'" + pseudoeffect.matchName.toString() + "\'",
      );
      var ffxFilePath = aeq.file.joinPath(
        Config.globals.resourcePath,
        pseudoeffect.presetName,
      );
      var ffxFile = Util.getOrCreateFile(
        ffxFilePath,
        pseudoeffect.presetBinary.toString(),
      );
      if (!ffxFile) {
        throw Util.buildError(
          "Error writing " + ffxFilePath,
          "core.js",
          $.line - startLineNum,
        );
      }
      Log.trace("<-- getOrCreateFFXFile: Wrote successfully!");
      return ffxFile;
    }
    var startLineNum = 2;
    return {
      checkExpressionEngine: checkExpressionEngine,
      checkVersions: checkVersions,
      createComponentRuler: createComponentRuler,
      findLayerEffect: findLayerEffect,
      findLayersWithEffect: findLayersWithEffect,
      findNullsWithEffect: findNullsWithEffect,
      getExpression: getExpression,
      getLayerByCoordinate: getLayerByCoordinate,
      getLayerCoordinateProp: getLayerCoordinateProp,
      getOrCreateBoundSelectors: getOrCreateBoundSelectors,
      getOrCreateGridController: getOrCreateGridController,
      getOrCreatePseudoeffect: getOrCreatePseudoeffect,
      isGridRuler: isGridRuler,
      isValidLayer: isValidLayer,
      removeController: removeController,
    };
  })();
  var Expressions = {
    coordinates: {
      legacy: {
        full: function (args) {
          return [
            "var lyr = thisLayer;",
            "var obj = thisLayer.sourceRectAtTime();",
            "var UL = [obj.left, obj.top];",
            "var LR = [obj.left + obj.width, obj.top + obj.height];",
            "",
            "var pt1 = lyr.toComp(UL);",
            "var pt2 = lyr.toComp([LR[0],UL[1]]);",
            "var pt3 = lyr.toComp([UL[0],LR[1]]);",
            "var pt4 = lyr.toComp(LR);",
            "",
            "var minX = Math.min(pt1[0], pt2[0], pt3[0], pt4[0]);",
            "var maxX = Math.max(pt1[0], pt2[0], pt3[0], pt4[0]);",
            "var minY = Math.min(pt1[1], pt2[1], pt3[1], pt4[1]);",
            "var maxY = Math.max(pt1[1], pt2[1], pt3[1], pt4[1]);",
            "",
            "var deltaX = maxX - minX;",
            "var deltaY = maxY - minY;",
            "",
            "[deltaX, deltaY] / " + args[0],
          ].join("\n");
        },
        minified: function (args) {
          return (
            "var _0x3806=[\'left\',\'max\',\'toComp\',\'min\',\'sourceRectAtTime\',\'top\',\'width\',\'height\'];(function(_0x46b436,_0x8acb73){var _0x38066d=function(_0x135b05){while(--_0x135b05){_0x46b436[\'push\'](_0x46b436[\'shift\']());}};_0x38066d(++_0x8acb73);}(_0x3806,0x83));var _0x135b=function(_0x46b436,_0x8acb73){_0x46b436=_0x46b436-0x110;var _0x38066d=_0x3806[_0x46b436];return _0x38066d;};var _0x2adcea=_0x135b,lyr=thisLayer,obj=thisLayer[_0x2adcea(0x111)](),UL=[obj[_0x2adcea(0x115)],obj[_0x2adcea(0x112)]],LR=[obj[\'left\']+obj[_0x2adcea(0x113)],obj[\'top\']+obj[_0x2adcea(0x114)]],pt1=lyr[_0x2adcea(0x117)](UL),pt2=lyr[_0x2adcea(0x117)]([LR[0x0],UL[0x1]]),pt3=lyr[\'toComp\']([UL[0x0],LR[0x1]]),pt4=lyr[\'toComp\'](LR),minX=Math[\'min\'](pt1[0x0],pt2[0x0],pt3[0x0],pt4[0x0]),maxX=Math[_0x2adcea(0x116)](pt1[0x0],pt2[0x0],pt3[0x0],pt4[0x0]),minY=Math[_0x2adcea(0x110)](pt1[0x1],pt2[0x1],pt3[0x1],pt4[0x1]),maxY=Math[_0x2adcea(0x116)](pt1[0x1],pt2[0x1],pt3[0x1],pt4[0x1]),deltaX=maxX-minX,deltaY=maxY-minY;[deltaX,deltaY] / " +
            args[0]
          );
        },
      },
      modern: {
        full: function (args) {
          return [
            "const lyr = thisLayer;",
            "const obj = thisLayer.sourceRectAtTime();",
            "const UL = [obj.left, obj.top];",
            "const LR = [obj.left + obj.width, obj.top + obj.height];",
            "",
            "const pt1 = lyr.toComp(UL);",
            "const pt2 = lyr.toComp([LR[0],UL[1]]);",
            "const pt3 = lyr.toComp([UL[0],LR[1]]);",
            "const pt4 = lyr.toComp(LR);",
            "",
            "const minX = Math.min(pt1[0], pt2[0], pt3[0], pt4[0]);",
            "const maxX = Math.max(pt1[0], pt2[0], pt3[0], pt4[0]);",
            "const minY = Math.min(pt1[1], pt2[1], pt3[1], pt4[1]);",
            "const maxY = Math.max(pt1[1], pt2[1], pt3[1], pt4[1]);",
            "",
            "const deltaX = maxX - minX;",
            "const deltaY = maxY - minY;",
            "",
            "[deltaX, deltaY] / " + args[0],
          ].join("\n");
        },
        minified: function (args) {
          return (
            "const _0x3806=[\'left\',\'max\',\'toComp\',\'min\',\'sourceRectAtTime\',\'top\',\'width\',\'height\'];(function(_0x46b436,_0x8acb73){const _0x38066d=function(_0x135b05){while(--_0x135b05){_0x46b436[\'push\'](_0x46b436[\'shift\']());}};_0x38066d(++_0x8acb73);}(_0x3806,0x83));const _0x135b=function(_0x46b436,_0x8acb73){_0x46b436=_0x46b436-0x110;let _0x38066d=_0x3806[_0x46b436];return _0x38066d;};const _0x2adcea=_0x135b,lyr=thisLayer,obj=thisLayer[_0x2adcea(0x111)](),UL=[obj[_0x2adcea(0x115)],obj[_0x2adcea(0x112)]],LR=[obj[\'left\']+obj[_0x2adcea(0x113)],obj[\'top\']+obj[_0x2adcea(0x114)]],pt1=lyr[_0x2adcea(0x117)](UL),pt2=lyr[_0x2adcea(0x117)]([LR[0x0],UL[0x1]]),pt3=lyr[\'toComp\']([UL[0x0],LR[0x1]]),pt4=lyr[\'toComp\'](LR),minX=Math[\'min\'](pt1[0x0],pt2[0x0],pt3[0x0],pt4[0x0]),maxX=Math[_0x2adcea(0x116)](pt1[0x0],pt2[0x0],pt3[0x0],pt4[0x0]),minY=Math[_0x2adcea(0x110)](pt1[0x1],pt2[0x1],pt3[0x1],pt4[0x1]),maxY=Math[_0x2adcea(0x116)](pt1[0x1],pt2[0x1],pt3[0x1],pt4[0x1]),deltaX=maxX-minX,deltaY=maxY-minY;[deltaX,deltaY] / " +
            args[0]
          );
        },
      },
    },
    gridCounts: {
      legacy: {
        full: function () {
          return [
            "posterizeTime(0);",
            "var numRows = -1;",
            "var numCols = -1;",
            "",
            "for (var ii = 1, il = thisComp.numLayers; ii <= il; ii++) {",
            "  var lyr = thisComp.layer(ii);",
            "  if (lyr.name.match(/^ROW \\d+/)) {",
            "\t  numRows++;",
            "  } else if (lyr.name.match(/^COL \\d+/)) {",
            "\t  numCols++;",
            "  }",
            "}",
            "",
            "[Math.max(numRows, 0), Math.max(numCols, 0)];",
          ].join("\n");
        },
        minified: function () {
          return "posterizeTime(0);var _0x2e23=[\'ADBE Layer Control-0001\',\'name\',\'match\',\'max\',\'numLayers\'];(function(_0x5aac44,_0x150abe){var _0x2e232c=function(_0x29da16){while(--_0x29da16){_0x5aac44[\'push\'](_0x5aac44[\'shift\']());}};_0x2e232c(++_0x150abe);}(_0x2e23,0xdb));var _0x29da=function(_0x5aac44,_0x150abe){_0x5aac44=_0x5aac44-0x64;var _0x2e232c=_0x2e23[_0x5aac44];return _0x2e232c;};var _0x4fccac=_0x29da;var numRows=-0x1,numCols=-0x1;for(var ii=0x1,il=thisComp[_0x4fccac(0x64)];ii<=il;ii++){var lyr=thisComp[_0x4fccac(0x65)](ii);if(lyr[\'name\'][\'match\'](/^ROW \\d+/))numRows++;else lyr[_0x4fccac(0x66)][_0x4fccac(0x67)](/^COL \\d+/)&&numCols++;}[Math[_0x4fccac(0x68)](numRows,0x0),Math[_0x4fccac(0x68)](numCols,0x0)];";
        },
      },
      modern: {
        full: function () {
          return [
            "posterizeTime(0);",
            "let numRows = -1;",
            "let numCols = -1;",
            "",
            "for (let ii = 1, il = thisComp.numLayers; ii <= il; ii++) {",
            "  const lyr = thisComp.layer(ii);",
            "  if (lyr.name.match(/^ROW \\d+/)) {",
            "\t  numRows++;",
            "  } else if (lyr.name.match(/^COL \\d+/)) {",
            "\t  numCols++;",
            "  }",
            "}",
            "",
            "[Math.max(numRows, 0), Math.max(numCols, 0)];",
          ].join("\n");
        },
        minified: function () {
          return "posterizeTime(0);const _0x2e23=[\'ADBE Layer Control-0001\',\'name\',\'match\',\'max\',\'numLayers\'];(function(_0x5aac44,_0x150abe){const _0x2e232c=function(_0x29da16){while(--_0x29da16){_0x5aac44[\'push\'](_0x5aac44[\'shift\']());}};_0x2e232c(++_0x150abe);}(_0x2e23,0xdb));const _0x29da=function(_0x5aac44,_0x150abe){_0x5aac44=_0x5aac44-0x64;let _0x2e232c=_0x2e23[_0x5aac44];return _0x2e232c;};const _0x4fccac=_0x29da;let numRows=-0x1,numCols=-0x1;for(let ii=0x1,il=thisComp[_0x4fccac(0x64)];ii<=il;ii++){const lyr=thisComp[_0x4fccac(0x65)](ii);if(lyr[\'name\'][\'match\'](/^ROW \\d+/))numRows++;else lyr[_0x4fccac(0x66)][_0x4fccac(0x67)](/^COL \\d+/)&&numCols++;}[Math[_0x4fccac(0x68)](numRows,0x0),Math[_0x4fccac(0x68)](numCols,0x0)];";
        },
      },
    },
    gridMattePosition: {
      legacy: {
        full: function (args) {
          return (
            "thisComp.layer(\'" + Util.escapeQuotes(args[0]) + "\').position;"
          );
        },
        minified: function (args) {
          return (
            "thisComp.layer(\'" + Util.escapeQuotes(args[0]) + "\').position;"
          );
        },
      },
      modern: {
        full: function (args) {
          return (
            "thisComp.layer(\'" + Util.escapeQuotes(args[0]) + "\').position;"
          );
        },
        minified: function (args) {
          return (
            "thisComp.layer(\'" + Util.escapeQuotes(args[0]) + "\').position;"
          );
        },
      },
    },
    gridMatteSize: {
      legacy: {
        full: function (args) {
          return [
            "var ref = thisComp.layer(\'" + Util.escapeQuotes(args[0]) + "\');",
            "",
            "var flex = ref.effect(\'" +
              Constants.EFFECTS.GRIDLAYER.EffectName +
              "\');",
            "var top = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridTopBound +
              "\');",
            "var bottom = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridBottomBound +
              "\');",
            "var left = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridLeftBound +
              "\');",
            "var right = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridRightBound +
              "\');",
            "",
            "var coordo = [0, 0];",
            "var x = value[0];",
            "var y = value[1];",
            "",
            "if (left) {",
            "  var leftBound = left.toWorld(coordo)[0];",
            "  var rightBound = right ? right.toWorld(coordo)[0] : thisComp.width;",
            "",
            "  x = Math.max(rightBound - leftBound, 0);",
            "}",
            "",
            "if (top) {",
            "  var topBound = top.toWorld(coordo)[1];",
            "  var bottomBound = bottom ? bottom.toWorld(coordo)[1] : thisComp.height;",
            "",
            "  y = Math.max(bottomBound - topBound, 0);",
            "}",
            "",
            "[x, y];",
          ].join("\n");
        },
        minified: function (args) {
          return (
            "var _0x2680f7=thisComp.layer(\'" +
            Util.escapeQuotes(args[0]) +
            "\'),_0x3ad4c0=_0x2680f7.effect(\'" +
            Constants.EFFECTS.GRIDLAYER.EffectName +
            "\'),_0x653ceb=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridTopBound +
            "\'),_0x39c2c0=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridBottomBound +
            "\'),_0x2c0e9e=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridLeftBound +
            "\'),_0x314ee0=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridRightBound +
            "\'),_0x6c7ed0=[0x0,0x0];var _0x2eeb85=value[0x0],_0x3a335d=value[0x1];if(_0x2c0e9e){var _0x177fe2=_0x2c0e9e[\'toWorld\'](_0x6c7ed0)[0x0],_0x14f7b6=_0x314ee0?_0x314ee0[\'toWorld\'](_0x6c7ed0)[0x0]:thisComp[\'width\'];_0x2eeb85=Math[\'max\'](_0x14f7b6-_0x177fe2,0x0);}if(_0x653ceb){var _0x5c92d6=_0x653ceb[\'toWorld\'](_0x6c7ed0)[0x1],_0x4de5d7=_0x39c2c0?_0x39c2c0[\'toWorld\'](_0x6c7ed0)[0x1]:thisComp[\'height\'];_0x3a335d=Math[\'max\'](_0x4de5d7-_0x5c92d6,0x0);}[_0x2eeb85,_0x3a335d];"
          );
        },
      },
      modern: {
        full: function (args) {
          return [
            "const ref = thisComp.layer(\'" +
              Util.escapeQuotes(args[0]) +
              "\');",
            "",
            "const flex = ref.effect(\'" +
              Constants.EFFECTS.GRIDLAYER.EffectName +
              "\');",
            "const top = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridTopBound +
              "\');",
            "const bottom = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridBottomBound +
              "\');",
            "const left = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridLeftBound +
              "\');",
            "const right = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridRightBound +
              "\');",
            "",
            "const coordo = [0, 0];",
            "let x = value[0];",
            "let y = value[1];",
            "",
            "if (left) {",
            "  const leftBound = left.toWorld(coordo)[0];",
            "  const rightBound = right ? right.toWorld(coordo)[0] : thisComp.width;",
            "",
            "  x = Math.max(rightBound - leftBound, 0);",
            "}",
            "",
            "if (top) {",
            "  const topBound = top.toWorld(coordo)[1];",
            "  const bottomBound = bottom ? bottom.toWorld(coordo)[1] : thisComp.height;",
            "",
            "  y = Math.max(bottomBound - topBound, 0);",
            "}",
            "",
            "[x, y];",
          ].join("\n");
        },
        minified: function (args) {
          return (
            "const _0x2680f7=thisComp.layer(\'" +
            Util.escapeQuotes(args[0]) +
            "\'),_0x3ad4c0=_0x2680f7.effect(\'" +
            Constants.EFFECTS.GRIDLAYER.EffectName +
            "\'),_0x653ceb=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridTopBound +
            "\'),_0x39c2c0=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridBottomBound +
            "\'),_0x2c0e9e=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridLeftBound +
            "\'),_0x314ee0=_0x3ad4c0(\'" +
            Constants.EFFECTS.GRIDLAYER.GridRightBound +
            "\'),_0x6c7ed0=[0x0,0x0];let _0x2eeb85=value[0x0],_0x3a335d=value[0x1];if(_0x2c0e9e){const _0x177fe2=_0x2c0e9e[\'toWorld\'](_0x6c7ed0)[0x0],_0x14f7b6=_0x314ee0?_0x314ee0[\'toWorld\'](_0x6c7ed0)[0x0]:thisComp[\'width\'];_0x2eeb85=Math[\'max\'](_0x14f7b6-_0x177fe2,0x0);}if(_0x653ceb){const _0x5c92d6=_0x653ceb[\'toWorld\'](_0x6c7ed0)[0x1],_0x4de5d7=_0x39c2c0?_0x39c2c0[\'toWorld\'](_0x6c7ed0)[0x1]:thisComp[\'height\'];_0x3a335d=Math[\'max\'](_0x4de5d7-_0x5c92d6,0x0);}[_0x2eeb85,_0x3a335d];"
          );
        },
      },
    },
    gridPosition: {
      legacy: {
        full: function () {
          return [
            "var flex = effect(\'" +
              Constants.EFFECTS.GRIDLAYER.EffectName +
              "\');",
            "var top = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridTopBound +
              "\');",
            "var bottom = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridBottomBound +
              "\');",
            "var left = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridLeftBound +
              "\');",
            "var right = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridRightBound +
              "\');",
            "",
            "var x = value[0];",
            "var y = value[1];",
            "",
            "if (left) {",
            "  var leftBound = left.toWorld([0, 0])[0];",
            "  var rightBound = right ? right.toWorld([0, 0])[0] : thisComp.width;",
            "",
            "  x = (leftBound + rightBound) / 2;",
            "}",
            "",
            "if (top) {",
            "  var topBound = top.toWorld([0, 0])[1];",
            "  var bottomBound = bottom ? bottom.toWorld([0, 0])[1] : thisComp.height;",
            "",
            "  y = (topBound + bottomBound) / 2;",
            "}",
            "",
            "[x, y];",
          ].join("\n");
        },
        minified: function () {
          return (
            "var _0xf580b3=effect(\'" +
            Constants.EFFECTS.GRIDLAYER.EffectName +
            "\'),_0x525794=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridTopBound +
            "\'),_0x297d8f=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridBottomBound +
            "\'),_0x370357=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridLeftBound +
            "\'),_0x1b066a=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridRightBound +
            "\');var _0x2d8449=value[0x0],_0x21c1b9=value[0x1];if(_0x370357){var _0x84cb1=_0x370357[\'toWorld\']([0x0,0x0])[0x0],_0xf2f691=_0x1b066a?_0x1b066a[\'toWorld\']([0x0,0x0])[0x0]:thisComp[\'width\'];_0x2d8449=(_0x84cb1+_0xf2f691)/0x2;}if(_0x525794){var _0x3c6161=_0x525794[\'toWorld\']([0x0,0x0])[0x1],_0x100983=_0x297d8f?_0x297d8f[\'toWorld\']([0x0,0x0])[0x1]:thisComp[\'height\'];_0x21c1b9=(_0x3c6161+_0x100983)/0x2;}[_0x2d8449,_0x21c1b9];"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "const flex = effect(\'" +
              Constants.EFFECTS.GRIDLAYER.EffectName +
              "\');",
            "const top = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridTopBound +
              "\');",
            "const bottom = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridBottomBound +
              "\');",
            "const left = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridLeftBound +
              "\');",
            "const right = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridRightBound +
              "\');",
            "",
            "let x = value[0];",
            "let y = value[1];",
            "",
            "if (left) {",
            "  const leftBound = left.toWorld([0, 0])[0];",
            "  const rightBound = right ? right.toWorld([0, 0])[0] : thisComp.width;",
            "",
            "  x = (leftBound + rightBound) / 2;",
            "}",
            "",
            "if (top) {",
            "  const topBound = top.toWorld([0, 0])[1];",
            "  const bottomBound = bottom ? bottom.toWorld([0, 0])[1] : thisComp.height;",
            "",
            "  y = (topBound + bottomBound) / 2;",
            "}",
            "",
            "[x, y];",
          ].join("\n");
        },
        minified: function () {
          return (
            "const _0xf580b3=effect(\'" +
            Constants.EFFECTS.GRIDLAYER.EffectName +
            "\'),_0x525794=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridTopBound +
            "\'),_0x297d8f=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridBottomBound +
            "\'),_0x370357=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridLeftBound +
            "\'),_0x1b066a=_0xf580b3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridRightBound +
            "\');let _0x2d8449=value[0x0],_0x21c1b9=value[0x1];if(_0x370357){const _0x84cb1=_0x370357[\'toWorld\']([0x0,0x0])[0x0],_0xf2f691=_0x1b066a?_0x1b066a[\'toWorld\']([0x0,0x0])[0x0]:thisComp[\'width\'];_0x2d8449=(_0x84cb1+_0xf2f691)/0x2;}if(_0x525794){const _0x3c6161=_0x525794[\'toWorld\']([0x0,0x0])[0x1],_0x100983=_0x297d8f?_0x297d8f[\'toWorld\']([0x0,0x0])[0x1]:thisComp[\'height\'];_0x21c1b9=(_0x3c6161+_0x100983)/0x2;}[_0x2d8449,_0x21c1b9];"
          );
        },
      },
    },
    gridScale: {
      legacy: {
        full: function () {
          return [
            "var rect = sourceRectAtTime();",
            "",
            "var flex = effect(\'" +
              Constants.EFFECTS.GRIDLAYER.EffectName +
              "\');",
            "var top = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridTopBound +
              "\');",
            "var bottom = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridBottomBound +
              "\');",
            "var left = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridLeftBound +
              "\');",
            "var right = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridRightBound +
              "\');",
            "",
            "var scaleOffset = flex(\'" +
              Constants.EFFECTS.SHARED.LayerScaleOffsetName +
              "\');",
            "var scaleMode = flex(\'" +
              Constants.EFFECTS.SHARED.LayerFlexModeName +
              "\').value;",
            "",
            "var gutter = Math.max(thisComp.layer(\'" +
              Constants.LAYERS.GridRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.SHARED.GutterSizeName +
              "\')(\'ADBE Slider Control-0001\'), 0);",
            "var gutterDimsPos = [gutter, gutter];",
            "var gutterDimsNeg = [-gutter, -gutter];",
            "",
            "var x = value[0];",
            "var y = value[1];",
            "",
            "if (left) {",
            "  var leftBound = left.toWorld(gutterDimsPos)[0];",
            "  var rightBound = right ? right.toWorld(gutterDimsNeg)[0] : thisComp.width;",
            "  x = (rightBound - leftBound) / rect.width * 100;",
            "}",
            "if (top) {",
            "  var topBound = top.toWorld(gutterDimsPos)[1];",
            "  var bottomBound = bottom ? bottom.toWorld(gutterDimsNeg)[1] : thisComp.height;",
            "  y = (bottomBound - topBound) / rect.height * 100;",
            "}",
            "",
            "switch (scaleMode) {",
            "  case 1: // None",
            "    x = value[0];",
            "    y = value[1];",
            "    break;",
            "  case 2: // Fit Width",
            "    y = x;",
            "    break;",
            "  case 3: // Fit Height",
            "    x = y;",
            "    break;",
            "  case 4: // Fit Best",
            "    var smallest = Math.min(x, y);",
            "    x = smallest;",
            "    y = smallest;",
            "    break;",
            "  case 5: // Fill",
            "    var biggest = Math.max(x, y);",
            "    x = biggest;",
            "    y = biggest;",
            "    break;",
            "  default: // Stretch",
            "    break;",
            "}",
            "",
            "[x, y] + scaleOffset;",
          ].join("\n");
        },
        minified: function () {
          return (
            "var _0x50fb2b=sourceRectAtTime(),_0x5e60c3=effect(\'" +
            Constants.EFFECTS.GRIDLAYER.EffectName +
            "\'),_0x36e609=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridTopBound +
            "\'),_0xb072d5=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridBottomBound +
            "\'),_0x5e1349=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridLeftBound +
            "\'),_0x31456f=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridRightBound +
            "\'),_0x5ca6ae=_0x5e60c3(\'" +
            Constants.EFFECTS.SHARED.LayerScaleOffsetName +
            "\'),_0x258561=_0x5e60c3(\'" +
            Constants.EFFECTS.SHARED.LayerFlexModeName +
            "\')[\'value\'],_0x7d161e=Math[\'max\'](thisComp.layer(\'" +
            Constants.LAYERS.GridRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.SHARED.GutterSizeName +
            "\')(\'ADBE Slider Control-0001\'),0x0),_0x450ab0=[_0x7d161e,_0x7d161e],_0x16b7d2=[-_0x7d161e,-_0x7d161e];var _0x2d909f=value[0x0],_0x2b4504=value[0x1];if(_0x5e1349){var _0x59aa91=_0x5e1349[\'toWorld\'](_0x450ab0)[0x0],_0x59607e=_0x31456f?_0x31456f[\'toWorld\'](_0x16b7d2)[0x0]:thisComp[\'width\'];_0x2d909f=(_0x59607e-_0x59aa91)/_0x50fb2b[\'width\']*0x64;}if(_0x36e609){var _0x474f67=_0x36e609[\'toWorld\'](_0x450ab0)[0x1],_0x2246dc=_0xb072d5?_0xb072d5[\'toWorld\'](_0x16b7d2)[0x1]:thisComp[\'height\'];_0x2b4504=(_0x2246dc-_0x474f67)/_0x50fb2b[\'height\']*0x64;}switch(_0x258561){case 0x1:_0x2d909f=value[0x0],_0x2b4504=value[0x1];break;case 0x2:_0x2b4504=_0x2d909f;break;case 0x3:_0x2d909f=_0x2b4504;break;case 0x4:var _0x33ad0e=Math[\'min\'](_0x2d909f,_0x2b4504);_0x2d909f=_0x33ad0e,_0x2b4504=_0x33ad0e;break;case 0x5:var _0x38e15a=Math[\'max\'](_0x2d909f,_0x2b4504);_0x2d909f=_0x38e15a,_0x2b4504=_0x38e15a;break;default:break;}[_0x2d909f,_0x2b4504]+_0x5ca6ae;"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "const rect = sourceRectAtTime();",
            "",
            "const flex = effect(\'" +
              Constants.EFFECTS.GRIDLAYER.EffectName +
              "\');",
            "const top = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridTopBound +
              "\');",
            "const bottom = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridBottomBound +
              "\');",
            "const left = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridLeftBound +
              "\');",
            "const right = flex(\'" +
              Constants.EFFECTS.GRIDLAYER.GridRightBound +
              "\');",
            "",
            "const scaleOffset = flex(\'" +
              Constants.EFFECTS.SHARED.LayerScaleOffsetName +
              "\');",
            "const scaleMode = flex(\'" +
              Constants.EFFECTS.SHARED.LayerFlexModeName +
              "\').value;",
            "",
            "const gutter = Math.max(thisComp.layer(\'" +
              Constants.LAYERS.GridRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.SHARED.GutterSizeName +
              "\')(\'ADBE Slider Control-0001\'), 0);",
            "const gutterDimsPos = [gutter, gutter];",
            "const gutterDimsNeg = [-gutter, -gutter];",
            "",
            "let x = value[0];",
            "let y = value[1];",
            "",
            "if (left) {",
            "  const leftBound = left.toWorld(gutterDimsPos)[0];",
            "  const rightBound = right ? right.toWorld(gutterDimsNeg)[0] : thisComp.width;",
            "  x = (rightBound - leftBound) / rect.width * 100;",
            "}",
            "if (top) {",
            "  const topBound = top.toWorld(gutterDimsPos)[1];",
            "  const bottomBound = bottom ? bottom.toWorld(gutterDimsNeg)[1] : thisComp.height;",
            "  y = (bottomBound - topBound) / rect.height * 100;",
            "}",
            "",
            "switch (scaleMode) {",
            "  case 1: // None",
            "    x = value[0];",
            "    y = value[1];",
            "    break;",
            "  case 2: // Fit Width",
            "    y = x;",
            "    break;",
            "  case 3: // Fit Height",
            "    x = y;",
            "    break;",
            "  case 4: // Fit Best",
            "    const smallest = Math.min(x, y);",
            "    x = smallest;",
            "    y = smallest;",
            "    break;",
            "  case 5: // Fill",
            "    const biggest = Math.max(x, y);",
            "    x = biggest;",
            "    y = biggest;",
            "    break;",
            "  default: // Stretch",
            "    break;",
            "}",
            "",
            "[x, y] + scaleOffset;",
          ].join("\n");
        },
        minified: function () {
          return (
            "const _0x50fb2b=sourceRectAtTime(),_0x5e60c3=effect(\'" +
            Constants.EFFECTS.GRIDLAYER.EffectName +
            "\'),_0x36e609=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridTopBound +
            "\'),_0xb072d5=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridBottomBound +
            "\'),_0x5e1349=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridLeftBound +
            "\'),_0x31456f=_0x5e60c3(\'" +
            Constants.EFFECTS.GRIDLAYER.GridRightBound +
            "\'),_0x5ca6ae=_0x5e60c3(\'" +
            Constants.EFFECTS.SHARED.LayerScaleOffsetName +
            "\'),_0x258561=_0x5e60c3(\'" +
            Constants.EFFECTS.SHARED.LayerFlexModeName +
            "\')[\'value\'],_0x7d161e=Math[\'max\'](thisComp.layer(\'" +
            Constants.LAYERS.GridRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.SHARED.GutterSizeName +
            "\')(\'ADBE Slider Control-0001\'),0x0),_0x450ab0=[_0x7d161e,_0x7d161e],_0x16b7d2=[-_0x7d161e,-_0x7d161e];let _0x2d909f=value[0x0],_0x2b4504=value[0x1];if(_0x5e1349){const _0x59aa91=_0x5e1349[\'toWorld\'](_0x450ab0)[0x0],_0x59607e=_0x31456f?_0x31456f[\'toWorld\'](_0x16b7d2)[0x0]:thisComp[\'width\'];_0x2d909f=(_0x59607e-_0x59aa91)/_0x50fb2b[\'width\']*0x64;}if(_0x36e609){const _0x474f67=_0x36e609[\'toWorld\'](_0x450ab0)[0x1],_0x2246dc=_0xb072d5?_0xb072d5[\'toWorld\'](_0x16b7d2)[0x1]:thisComp[\'height\'];_0x2b4504=(_0x2246dc-_0x474f67)/_0x50fb2b[\'height\']*0x64;}switch(_0x258561){case 0x1:_0x2d909f=value[0x0],_0x2b4504=value[0x1];break;case 0x2:_0x2b4504=_0x2d909f;break;case 0x3:_0x2d909f=_0x2b4504;break;case 0x4:const _0x33ad0e=Math[\'min\'](_0x2d909f,_0x2b4504);_0x2d909f=_0x33ad0e,_0x2b4504=_0x33ad0e;break;case 0x5:const _0x38e15a=Math[\'max\'](_0x2d909f,_0x2b4504);_0x2d909f=_0x38e15a,_0x2b4504=_0x38e15a;break;default:break;}[_0x2d909f,_0x2b4504]+_0x5ca6ae;"
          );
        },
      },
    },
    layerScaleOffset: {
      legacy: {
        full: function () {
          return (
            "thisProperty.propertyGroup(1)(\'" +
            Constants.EFFECTS.SHARED.LayerUniformScaleName +
            "\').value ? [value[0], value[0]] : value;"
          );
        },
        minified: function () {
          return (
            "thisProperty.propertyGroup(1)(\'" +
            Constants.EFFECTS.SHARED.LayerUniformScaleName +
            "\').value ? [value[0], value[0]] : value;"
          );
        },
      },
      modern: {
        full: function () {
          return (
            "thisProperty.propertyGroup(1)(\'" +
            Constants.EFFECTS.SHARED.LayerUniformScaleName +
            "\').value ? [value[0], value[0]] : value;"
          );
        },
        minified: function () {
          return (
            "thisProperty.propertyGroup(1)(\'" +
            Constants.EFFECTS.SHARED.LayerUniformScaleName +
            "\').value ? [value[0], value[0]] : value;"
          );
        },
      },
    },
    lineContainerBound: {
      legacy: {
        full: function () {
          return [
            "var result = [0, 0];",
            "",
            "try {",
            "  var lyr = effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerName +
              "\');",
            "  var rect = lyr.sourceRectAtTime(time, false);",
            "  var wid = rect.width * lyr.scale[0] / 100;",
            "  var hei = rect.height * lyr.scale[1] / 100;",
            "",
            "  result = lyr.toWorld([",
            "    rect.left - rect.width / 2,",
            "    rect.top - rect.height / 2",
            "  ]) + [wid, hei] / 2;",
            "} catch (e) {}",
            "",
            "result;",
          ].join("\n");
        },
        minified: function () {
          return (
            "var _0x3407=[\'left\',\'top\',\'height\',\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\',\'width\',\'scale\',\'toWorld\'];(function(_0x237b87,_0x3555a2){var _0x34079b=function(_0x154956){while(--_0x154956){_0x237b87[\'push\'](_0x237b87[\'shift\']());}};_0x34079b(++_0x3555a2);}(_0x3407,0x96));var _0x1549=function(_0x237b87,_0x3555a2){_0x237b87=_0x237b87-0x96;var _0x34079b=_0x3407[_0x237b87];return _0x34079b;};var _0x2e3b90=_0x1549;var result=[0x0,0x0];try{var lyr=effect(_0x2e3b90(0x96))(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerName +
            "\'),rect=lyr[\'sourceRectAtTime\'](time,![]),wid=rect[_0x2e3b90(0x97)]*lyr[_0x2e3b90(0x98)][0x0]/0x64,hei=rect[\'height\']*lyr[\'scale\'][0x1]/0x64;result=lyr[_0x2e3b90(0x99)]([rect[_0x2e3b90(0x9a)]-rect[_0x2e3b90(0x97)]/0x2,rect[_0x2e3b90(0x9b)]-rect[_0x2e3b90(0x9c)]/0x2])+[wid,hei]/0x2;}catch(_0xecfec1){}result;"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "let result = [0, 0];",
            "",
            "try {",
            "  const lyr = effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerName +
              "\');",
            "  const rect = lyr.sourceRectAtTime(time, false);",
            "  const wid = rect.width * lyr.scale[0] / 100;",
            "  const hei = rect.height * lyr.scale[1] / 100;",
            "",
            "  result = lyr.toWorld([",
            "    rect.left - rect.width / 2,",
            "    rect.top - rect.height / 2",
            "  ]) + [wid, hei] / 2;",
            "} catch (e) {}",
            "",
            "result;",
          ].join("\n");
        },
        minified: function () {
          return (
            "const _0x3407=[\'left\',\'top\',\'height\',\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\',\'width\',\'scale\',\'toWorld\'];(function(_0x237b87,_0x3555a2){const _0x34079b=function(_0x154956){while(--_0x154956){_0x237b87[\'push\'](_0x237b87[\'shift\']());}};_0x34079b(++_0x3555a2);}(_0x3407,0x96));const _0x1549=function(_0x237b87,_0x3555a2){_0x237b87=_0x237b87-0x96;let _0x34079b=_0x3407[_0x237b87];return _0x34079b;};const _0x2e3b90=_0x1549;let result=[0x0,0x0];try{const lyr=effect(_0x2e3b90(0x96))(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerName +
            "\'),rect=lyr[\'sourceRectAtTime\'](time,![]),wid=rect[_0x2e3b90(0x97)]*lyr[_0x2e3b90(0x98)][0x0]/0x64,hei=rect[\'height\']*lyr[\'scale\'][0x1]/0x64;result=lyr[_0x2e3b90(0x99)]([rect[_0x2e3b90(0x9a)]-rect[_0x2e3b90(0x97)]/0x2,rect[_0x2e3b90(0x9b)]-rect[_0x2e3b90(0x9c)]/0x2])+[wid,hei]/0x2;}catch(_0xecfec1){}result;"
          );
        },
      },
    },
    lineContainerSize: {
      legacy: {
        full: function () {
          return [
            "var container = thisComp;",
            "var offset = [1, 1];",
            "var flex = effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "",
            "try {",
            "  var lyr = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerName +
              "\');",
            "  container = lyr.sourceRectAtTime(time, false);",
            "  offset = [lyr.transform.scale[0] / 100, lyr.transform.scale[1] / 100];",
            "} catch (e) {}",
            "",
            "result = [container.width, container.height];",
            "",
            "if (flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
              "\').value) {",
            "  result = [container.height, container.width];",
            "  offset = [offset[1], offset[0]];",
            "}",
            "",
            "[result[0] * offset[0], result[1] * offset[1]];",
          ].join("\n");
        },
        minified: function () {
          return (
            "var _0x30d64b=thisComp,_0x3084b3=[0x1,0x1];var _0x354877=effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\');try{var _0x258508=_0x354877(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerName +
            "\');_0x30d64b=_0x258508[\'sourceRectAtTime\'](time,![]),_0x3084b3=[_0x258508[\'transform\'][\'scale\'][0x0]/0x64,_0x258508[\'transform\'][\'scale\'][0x1]/0x64];}catch(_0x2c1a0a){}result=[_0x30d64b[\'width\'],_0x30d64b[\'height\']];_0x354877(\'" +
            Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
            "\')[\'value\']&&(result=[_0x30d64b[\'height\'],_0x30d64b[\'width\']],_0x3084b3=[_0x3084b3[0x1],_0x3084b3[0x0]]);[result[0x0]*_0x3084b3[0x0],result[0x1]*_0x3084b3[0x1]];"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "let container = thisComp;",
            "let offset = [1, 1];",
            "const flex = effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "",
            "try {",
            "  const lyr = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerName +
              "\');",
            "  container = lyr.sourceRectAtTime(time, false);",
            "  offset = [lyr.transform.scale[0] / 100, lyr.transform.scale[1] / 100];",
            "} catch (e) {}",
            "",
            "result = [container.width, container.height];",
            "",
            "if (flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
              "\').value) {",
            "  result = [container.height, container.width];",
            "  offset = [offset[1], offset[0]];",
            "}",
            "",
            "[result[0] * offset[0], result[1] * offset[1]];",
          ].join("\n");
        },
        minified: function () {
          return (
            "let _0x30d64b=thisComp,_0x3084b3=[0x1,0x1];const _0x354877=effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\');try{const _0x258508=_0x354877(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerName +
            "\');_0x30d64b=_0x258508[\'sourceRectAtTime\'](time,![]),_0x3084b3=[_0x258508[\'transform\'][\'scale\'][0x0]/0x64,_0x258508[\'transform\'][\'scale\'][0x1]/0x64];}catch(_0x2c1a0a){}result=[_0x30d64b[\'width\'],_0x30d64b[\'height\']];_0x354877(\'" +
            Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
            "\')[\'value\']&&(result=[_0x30d64b[\'height\'],_0x30d64b[\'width\']],_0x3084b3=[_0x3084b3[0x1],_0x3084b3[0x0]]);[result[0x0]*_0x3084b3[0x0],result[0x1]*_0x3084b3[0x1]];"
          );
        },
      },
    },
    lineCounts: {
      legacy: {
        full: function () {
          return [
            "posterizeTime(0);",
            "var total = 0;",
            "",
            "for (var ii = 1, il = thisComp.numLayers; ii <= il; ii++) {",
            "  try {",
            "    thisComp.layer(ii).effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\');",
            "    total++;",
            "  } catch(e) {",
            "    continue;",
            "  }",
            "}",
            "",
            "total;",
          ].join("\n");
        },
        minified: function () {
          return (
            "posterizeTime(0);var _0xd92e5c=0x0;for(var _0x3b743b=0x1,_0xe21546=thisComp.numLayers;_0x3b743b<=_0xe21546;_0x3b743b++){try{thisComp.layer(_0x3b743b).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\'),_0xd92e5c++;}catch(_0x3518e7){continue;}}_0xd92e5c;"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "posterizeTime(0);",
            "let total = 0;",
            "",
            "for (let ii = 1, il = thisComp.numLayers; ii <= il; ii++) {",
            "  try {",
            "    thisComp.layer(ii).effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\');",
            "    total++;",
            "  } catch(e) {",
            "    continue;",
            "  }",
            "}",
            "",
            "total;",
          ].join("\n");
        },
        minified: function () {
          return (
            "posterizeTime(0);let _0xd92e5c=0x0;for(let _0x3b743b=0x1,_0xe21546=thisComp.numLayers;_0x3b743b<=_0xe21546;_0x3b743b++){try{thisComp.layer(_0x3b743b).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\'),_0xd92e5c++;}catch(_0x3518e7){continue;}}_0xd92e5c;"
          );
        },
      },
    },
    lineFlexRatio: {
      legacy: {
        full: function () {
          return [
            "var flex = effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "var systemSize = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
              "\').value[0];",
            "var total = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.LayerCountName +
              "\');",
            "",
            "var totalWeight = 0.001;",
            "var hits = 0;",
            "",
            "while (hits < total) {",
            "  for (var ii = 1, il = thisComp.numLayers; ii <= il; ii++) {",
            "    try {",
            "      var weight = thisComp.layer(ii).effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINELAYER.LayerWeightName +
              "\').value;",
            "      totalWeight += Math.max(weight, 0);",
            "      hits++;",
            "    } catch(e) {}",
            "  }",
            "}",
            "",
            "systemSize / totalWeight;",
          ].join("\n");
        },
        minified: function () {
          return (
            "var _0x5d703b=effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\'),_0xafe3d=_0x5d703b(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
            "\')[\'value\'][0x0],_0x16a169=_0x5d703b(\'" +
            Constants.EFFECTS.LINECONTROLLER.LayerCountName +
            "\');var _0x232a95=0.001,_0x3241ec=0x0;while(_0x3241ec<_0x16a169){for(var _0x3ebc63=0x1,_0x28c589=thisComp[\'numLayers\'];_0x3ebc63<=_0x28c589;_0x3ebc63++){try{var _0x4e651d=thisComp.layer(_0x3ebc63).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerWeightName +
            "\')[\'value\'];_0x232a95+=Math[\'max\'](_0x4e651d,0x0),_0x3241ec++;}catch(_0x35bcd9){}}}_0xafe3d/_0x232a95;"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "const flex = effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "const systemSize = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
              "\').value[0];",
            "const total = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.LayerCountName +
              "\');",
            "",
            "let totalWeight = 0.001;",
            "let hits = 0;",
            "",
            "while (hits < total) {",
            "  for (let ii = 1, il = thisComp.numLayers; ii <= il; ii++) {",
            "    try {",
            "      const weight = thisComp.layer(ii).effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINELAYER.LayerWeightName +
              "\').value;",
            "      totalWeight += Math.max(weight, 0);",
            "      hits++;",
            "    } catch(e) {}",
            "  }",
            "}",
            "",
            "systemSize / totalWeight;",
          ].join("\n");
        },
        minified: function () {
          return (
            "const _0x5d703b=effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\'),_0xafe3d=_0x5d703b(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
            "\')[\'value\'][0x0],_0x16a169=_0x5d703b(\'" +
            Constants.EFFECTS.LINECONTROLLER.LayerCountName +
            "\');let _0x232a95=0.001,_0x3241ec=0x0;while(_0x3241ec<_0x16a169){for(let _0x3ebc63=0x1,_0x28c589=thisComp[\'numLayers\'];_0x3ebc63<=_0x28c589;_0x3ebc63++){try{const _0x4e651d=thisComp.layer(_0x3ebc63).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerWeightName +
            "\')[\'value\'];_0x232a95+=Math[\'max\'](_0x4e651d,0x0),_0x3241ec++;}catch(_0x35bcd9){}}}_0xafe3d/_0x232a95;"
          );
        },
      },
    },
    lineLayerInitial: {
      legacy: {
        full: function () {
          return [
            "var loopRotation = ((thisLayer.rotation % 360) + 360) % 360;",
            "var mult = Math.floor(loopRotation / 90) % 2 == 1 ? -1 : 1;",
            "",
            "var wave1 = Math.sin(degreesToRadians(90 - loopRotation));",
            "var wave2 = Math.sin(degreesToRadians(loopRotation * mult));",
            "",
            "var x = value[0] * wave1 + value[1] * wave2;",
            "var y = value[0] * wave2 + value[1] * wave1;",
            "",
            "[Math.abs(x), Math.abs(y)];",
          ].join("\n");
        },
        minified: function () {
          return "var _0xcc87=[\'rotation\',\'floor\',\'sin\',\'abs\',\'477591qnuLFE\',\'622EpJBrt\',\'319ObYNwy\',\'11479WchKFn\',\'46rLiFdp\',\'245gZhUBl\',\'323gOyDWC\',\'1mxOCTk\',\'197601iKfKGx\',\'5jnxtfc\',\'39883NcyGLL\',\'895402dppamw\',\'1OUsATS\'];var _0x1ccd=function(_0xb3977b,_0x42453e){_0xb3977b=_0xb3977b-0x107;var _0xcc877e=_0xcc87[_0xb3977b];return _0xcc877e;};var _0x1ffe9c=_0x1ccd;(function(_0x346299,_0x37eeca){var _0x2ac805=_0x1ccd;while(!![]){try{var _0x853faf=parseInt(_0x2ac805(0x107))+parseInt(_0x2ac805(0x108))*-parseInt(_0x2ac805(0x109))+parseInt(_0x2ac805(0x10a))*parseInt(_0x2ac805(0x10b))+parseInt(_0x2ac805(0x10c))*parseInt(_0x2ac805(0x10d))+parseInt(_0x2ac805(0x10e))*parseInt(_0x2ac805(0x10f))+parseInt(_0x2ac805(0x110))*parseInt(_0x2ac805(0x111))+-parseInt(_0x2ac805(0x112))*parseInt(_0x2ac805(0x113));if(_0x853faf===_0x37eeca)break;else _0x346299[\'push\'](_0x346299[\'shift\']());}catch(_0xaf62c9){_0x346299[\'push\'](_0x346299[\'shift\']());}}}(_0xcc87,0x5eb74));var loopRotation=(thisLayer[_0x1ffe9c(0x114)]%0x168+0x168)%0x168,mult=Math[_0x1ffe9c(0x115)](loopRotation/0x5a)%0x2==0x1?-0x1:0x1,wave1=Math[_0x1ffe9c(0x116)](degreesToRadians(0x5a-loopRotation)),wave2=Math[_0x1ffe9c(0x116)](degreesToRadians(loopRotation*mult)),x=value[0x0]*wave1+value[0x1]*wave2,y=value[0x0]*wave2+value[0x1]*wave1;[Math[_0x1ffe9c(0x117)](x),Math[_0x1ffe9c(0x117)](y)];";
        },
      },
      modern: {
        full: function () {
          return [
            "const loopRotation = ((thisLayer.rotation % 360) + 360) % 360;",
            "const mult = Math.floor(loopRotation / 90) % 2 == 1 ? -1 : 1;",
            "",
            "const wave1 = Math.sin(degreesToRadians(90 - loopRotation));",
            "const wave2 = Math.sin(degreesToRadians(loopRotation * mult));",
            "",
            "const x = value[0] * wave1 + value[1] * wave2;",
            "const y = value[0] * wave2 + value[1] * wave1;",
            "",
            "[Math.abs(x), Math.abs(y)];",
          ].join("\n");
        },
        minified: function () {
          return "const _0xcc87=[\'rotation\',\'floor\',\'sin\',\'abs\',\'477591qnuLFE\',\'622EpJBrt\',\'319ObYNwy\',\'11479WchKFn\',\'46rLiFdp\',\'245gZhUBl\',\'323gOyDWC\',\'1mxOCTk\',\'197601iKfKGx\',\'5jnxtfc\',\'39883NcyGLL\',\'895402dppamw\',\'1OUsATS\'];const _0x1ccd=function(_0xb3977b,_0x42453e){_0xb3977b=_0xb3977b-0x107;let _0xcc877e=_0xcc87[_0xb3977b];return _0xcc877e;};const _0x1ffe9c=_0x1ccd;(function(_0x346299,_0x37eeca){const _0x2ac805=_0x1ccd;while(!![]){try{const _0x853faf=parseInt(_0x2ac805(0x107))+parseInt(_0x2ac805(0x108))*-parseInt(_0x2ac805(0x109))+parseInt(_0x2ac805(0x10a))*parseInt(_0x2ac805(0x10b))+parseInt(_0x2ac805(0x10c))*parseInt(_0x2ac805(0x10d))+parseInt(_0x2ac805(0x10e))*parseInt(_0x2ac805(0x10f))+parseInt(_0x2ac805(0x110))*parseInt(_0x2ac805(0x111))+-parseInt(_0x2ac805(0x112))*parseInt(_0x2ac805(0x113));if(_0x853faf===_0x37eeca)break;else _0x346299[\'push\'](_0x346299[\'shift\']());}catch(_0xaf62c9){_0x346299[\'push\'](_0x346299[\'shift\']());}}}(_0xcc87,0x5eb74));const loopRotation=(thisLayer[_0x1ffe9c(0x114)]%0x168+0x168)%0x168,mult=Math[_0x1ffe9c(0x115)](loopRotation/0x5a)%0x2==0x1?-0x1:0x1,wave1=Math[_0x1ffe9c(0x116)](degreesToRadians(0x5a-loopRotation)),wave2=Math[_0x1ffe9c(0x116)](degreesToRadians(loopRotation*mult)),x=value[0x0]*wave1+value[0x1]*wave2,y=value[0x0]*wave2+value[0x1]*wave1;[Math[_0x1ffe9c(0x117)](x),Math[_0x1ffe9c(0x117)](y)];";
        },
      },
    },
    lineLayerPosition: {
      legacy: {
        full: function (args) {
          return [
            "var controllerFlex = thisComp.layer(\'" +
              Constants.LAYERS.LineRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "var dimension = controllerFlex(\'" +
              Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
              "\').value ? 1 : 0",
            "var containerPosition = controllerFlex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerBoundName +
              "\');",
            "",
            "var flex = effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\');",
            "var idx = Math.round(flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerCoordinateName +
              "\'));",
            "var size = flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerSizeName +
              "\');",
            "",
            "var offset = containerPosition[dimension];",
            "var delta = parent.position;",
            "",
            "if (idx > 1) {",
            "  var lastLayer = thisComp.layer(\'" +
              Util.escapeQuotes(args[0]) +
              "\');",
            "  var converted = lastLayer.position;",
            "  var lastPosition = converted[dimension];",
            "  var lastSize = lastLayer.effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINELAYER.LayerSizeName +
              "\')[dimension];",
            "",
            "  delta = dimension ? [parent.position[0], 0] : [0, parent.position[1]];",
            "  offset = lastPosition + lastSize / 2;",
            "}",
            "",
            "var sizeOffset = size / 2 + [offset, offset];",
            "var centerPoint = size / 2 + containerPosition;",
            "",
            "var x = dimension ? centerPoint[0] : sizeOffset[0];",
            "var y = dimension ? sizeOffset[1] : centerPoint[1];",
            "",
            "value + [x, y] - delta;",
          ].join("\n");
        },
        minified: function (args) {
          return (
            "var _0xeb59b6=thisComp.layer(\'" +
            Constants.LAYERS.LineRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\'),_0x1c3732=_0xeb59b6(\'" +
            Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
            "\')[\'value\']?0x1:0x0,_0xa674db=_0xeb59b6(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerBoundName +
            "\'),_0x19bf14=effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\'),_0x17e3a5=Math[\'round\'](_0x19bf14(\'" +
            Constants.EFFECTS.LINELAYER.LayerCoordinateName +
            "\')),_0x3ee262=_0x19bf14(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\');var _0x11c4b0=_0xa674db[_0x1c3732],_0x241fb3=parent[\'position\'];if(_0x17e3a5>0x1){var _0xc4783c=thisComp.layer(\'" +
            Util.escapeQuotes(args[0]) +
            "\'),_0x2c0465=_0xc4783c[\'position\'],_0x3827ef=_0x2c0465[_0x1c3732],_0xea6e4c=_0xc4783c.effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\')[_0x1c3732];_0x241fb3=_0x1c3732?[parent[\'position\'][0x0],0x0]:[0x0,parent[\'position\'][0x1]],_0x11c4b0=_0x3827ef+_0xea6e4c/0x2;}var _0x5cab25=_0x3ee262/0x2+[_0x11c4b0,_0x11c4b0],_0x5aaf2f=_0x3ee262/0x2+_0xa674db,_0x28c49a=_0x1c3732?_0x5aaf2f[0x0]:_0x5cab25[0x0],_0x542f9e=_0x1c3732?_0x5cab25[0x1]:_0x5aaf2f[0x1];value+[_0x28c49a,_0x542f9e]-_0x241fb3;"
          );
        },
      },
      modern: {
        full: function (args) {
          return [
            "const controllerFlex = thisComp.layer(\'" +
              Constants.LAYERS.LineRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "const dimension = controllerFlex(\'" +
              Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
              "\').value ? 1 : 0",
            "const containerPosition = controllerFlex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerBoundName +
              "\');",
            "",
            "const flex = effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\');",
            "const idx = Math.round(flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerCoordinateName +
              "\'));",
            "const size = flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerSizeName +
              "\');",
            "",
            "let offset = containerPosition[dimension];",
            "let delta = parent.position;",
            "",
            "if (idx > 1) {",
            "  const lastLayer = thisComp.layer(\'" +
              Util.escapeQuotes(args[0]) +
              "\');",
            "  const converted = lastLayer.position;",
            "  const lastPosition = converted[dimension];",
            "  const lastSize = lastLayer.effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINELAYER.LayerSizeName +
              "\')[dimension];",
            "",
            "  delta = dimension ? [parent.position[0], 0] : [0, parent.position[1]];",
            "  offset = lastPosition + lastSize / 2;",
            "}",
            "",
            "let sizeOffset = size / 2 + [offset, offset];",
            "let centerPoint = size / 2 + containerPosition;",
            "",
            "let x = dimension ? centerPoint[0] : sizeOffset[0];",
            "let y = dimension ? sizeOffset[1] : centerPoint[1];",
            "",
            "value + [x, y] - delta;",
          ].join("\n");
        },
        minified: function (args) {
          return (
            "const _0xeb59b6=thisComp.layer(\'" +
            Constants.LAYERS.LineRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\'),_0x1c3732=_0xeb59b6(\'" +
            Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
            "\')[\'value\']?0x1:0x0,_0xa674db=_0xeb59b6(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerBoundName +
            "\'),_0x19bf14=effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\'),_0x17e3a5=Math[\'round\'](_0x19bf14(\'" +
            Constants.EFFECTS.LINELAYER.LayerCoordinateName +
            "\')),_0x3ee262=_0x19bf14(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\');let _0x11c4b0=_0xa674db[_0x1c3732],_0x241fb3=parent[\'position\'];if(_0x17e3a5>0x1){const _0xc4783c=thisComp.layer(\'" +
            Util.escapeQuotes(args[0]) +
            "\'),_0x2c0465=_0xc4783c[\'position\'],_0x3827ef=_0x2c0465[_0x1c3732],_0xea6e4c=_0xc4783c.effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\')[_0x1c3732];_0x241fb3=_0x1c3732?[parent[\'position\'][0x0],0x0]:[0x0,parent[\'position\'][0x1]],_0x11c4b0=_0x3827ef+_0xea6e4c/0x2;}let _0x5cab25=_0x3ee262/0x2+[_0x11c4b0,_0x11c4b0],_0x5aaf2f=_0x3ee262/0x2+_0xa674db,_0x28c49a=_0x1c3732?_0x5aaf2f[0x0]:_0x5cab25[0x0],_0x542f9e=_0x1c3732?_0x5cab25[0x1]:_0x5aaf2f[0x1];value+[_0x28c49a,_0x542f9e]-_0x241fb3;"
          );
        },
      },
    },
    lineLayerScale: {
      legacy: {
        full: function () {
          return [
            "var gutter = Math.max(thisComp.layer(\'" +
              Constants.LAYERS.LineRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.SHARED.GutterSizeName +
              "\'), 0);",
            "var flex = effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\');",
            "var initial = flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerInitialName +
              "\');",
            "var layerSize = flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerSizeName +
              "\');",
            "var scaleMode = flex(\'" +
              Constants.EFFECTS.SHARED.LayerFlexModeName +
              "\').value;",
            "var scaleOffset = flex(\'" +
              Constants.EFFECTS.SHARED.LayerScaleOffsetName +
              "\');",
            "",
            "var x = layerSize[0] / initial[0] * 100;",
            "var y = layerSize[1] / initial[1] * 100;",
            "",
            "switch (scaleMode) {",
            "  case 1:",
            "    x = value[0];",
            "    y = value[1];",
            "    break;",
            "  case 2:",
            "    y = x;",
            "    break;",
            "  case 3:",
            "    x = y;",
            "    break;",
            "  case 4:",
            "    var smallest = Math.min(x, y);",
            "    x = smallest;",
            "    y = smallest;",
            "    break;",
            "  case 5:",
            "    var biggest = Math.max(x, y);",
            "    x = biggest;",
            "    y = biggest;",
            "    break;",
            "  default:",
            "    break;",
            "}",
            "",
            "[",
            "  Math.max(x + scaleOffset[0] - gutter, 0),",
            "  Math.max(y + scaleOffset[1] - gutter, 0)",
            "]",
          ].join("\n");
        },
        minified: function () {
          return (
            "var _0x5ca391=Math[\'max\'](thisComp.layer(\'" +
            Constants.LAYERS.LineRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.SHARED.GutterSizeName +
            "\'),0x0),_0x334aa2=effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\'),_0x1abd96=_0x334aa2(\'" +
            Constants.EFFECTS.LINELAYER.LayerInitialName +
            "\'),_0x31b7b1=_0x334aa2(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\'),_0x1e2c0e=_0x334aa2(\'" +
            Constants.EFFECTS.SHARED.LayerFlexModeName +
            "\')[\'value\'],_0x479c6b=_0x334aa2(\'" +
            Constants.EFFECTS.SHARED.LayerScaleOffsetName +
            "\');var _0x3f9b57=_0x31b7b1[0x0]/(_0x1abd96[0x0]||0.001)*0x64,_0x27accc=_0x31b7b1[0x1]/(_0x1abd96[0x1]||0.001)*0x64;switch(_0x1e2c0e){case 0x1:_0x3f9b57=value[0x0],_0x27accc=value[0x1];break;case 0x2:_0x27accc=_0x3f9b57;break;case 0x3:_0x3f9b57=_0x27accc;break;case 0x4:var _0x21ab26=Math[\'min\'](_0x3f9b57,_0x27accc);_0x3f9b57=_0x21ab26,_0x27accc=_0x21ab26;break;case 0x5:var _0x1f912b=Math[\'max\'](_0x3f9b57,_0x27accc);_0x3f9b57=_0x1f912b,_0x27accc=_0x1f912b;break;default:break;}[Math[\'max\'](_0x3f9b57+_0x479c6b[0x0]-_0x5ca391,0x0),Math[\'max\'](_0x27accc+_0x479c6b[0x1]-_0x5ca391,0x0)];"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "const gutter = Math.max(thisComp.layer(\'" +
              Constants.LAYERS.LineRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.SHARED.GutterSizeName +
              "\'), 0);",
            "const flex = effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\');",
            "const initial = flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerInitialName +
              "\');",
            "const layerSize = flex(\'" +
              Constants.EFFECTS.LINELAYER.LayerSizeName +
              "\');",
            "const scaleMode = flex(\'" +
              Constants.EFFECTS.SHARED.LayerFlexModeName +
              "\').value;",
            "const scaleOffset = flex(\'" +
              Constants.EFFECTS.SHARED.LayerScaleOffsetName +
              "\');",
            "",
            "let x = layerSize[0] / initial[0] * 100;",
            "let y = layerSize[1] / initial[1] * 100;",
            "",
            "switch (scaleMode) {",
            "  case 1:",
            "    x = value[0];",
            "    y = value[1];",
            "    break;",
            "  case 2:",
            "    y = x;",
            "    break;",
            "  case 3:",
            "    x = y;",
            "    break;",
            "  case 4:",
            "    const smallest = Math.min(x, y);",
            "    x = smallest;",
            "    y = smallest;",
            "    break;",
            "  case 5:",
            "    const biggest = Math.max(x, y);",
            "    x = biggest;",
            "    y = biggest;",
            "    break;",
            "  default:",
            "    break;",
            "}",
            "",
            "[",
            "  Math.max(x + scaleOffset[0] - gutter, 0),",
            "  Math.max(y + scaleOffset[1] - gutter, 0)",
            "]",
          ].join("\n");
        },
        minified: function () {
          return (
            "const _0x5ca391=Math[\'max\'](thisComp.layer(\'" +
            Constants.LAYERS.LineRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.SHARED.GutterSizeName +
            "\'),0x0),_0x334aa2=effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\'),_0x1abd96=_0x334aa2(\'" +
            Constants.EFFECTS.LINELAYER.LayerInitialName +
            "\'),_0x31b7b1=_0x334aa2(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\'),_0x1e2c0e=_0x334aa2(\'" +
            Constants.EFFECTS.SHARED.LayerFlexModeName +
            "\')[\'value\'],_0x479c6b=_0x334aa2(\'" +
            Constants.EFFECTS.SHARED.LayerScaleOffsetName +
            "\');let _0x3f9b57=_0x31b7b1[0x0]/(_0x1abd96[0x0]||0.001)*0x64,_0x27accc=_0x31b7b1[0x1]/(_0x1abd96[0x1]||0.001)*0x64;switch(_0x1e2c0e){case 0x1:_0x3f9b57=value[0x0],_0x27accc=value[0x1];break;case 0x2:_0x27accc=_0x3f9b57;break;case 0x3:_0x3f9b57=_0x27accc;break;case 0x4:const _0x21ab26=Math[\'min\'](_0x3f9b57,_0x27accc);_0x3f9b57=_0x21ab26,_0x27accc=_0x21ab26;break;case 0x5:const _0x1f912b=Math[\'max\'](_0x3f9b57,_0x27accc);_0x3f9b57=_0x1f912b,_0x27accc=_0x1f912b;break;default:break;}[Math[\'max\'](_0x3f9b57+_0x479c6b[0x0]-_0x5ca391,0x0),Math[\'max\'](_0x27accc+_0x479c6b[0x1]-_0x5ca391,0x0)];"
          );
        },
      },
    },
    lineLayerSize: {
      legacy: {
        full: function () {
          return [
            "var flex = thisComp.layer(\'" +
              Constants.LAYERS.LineRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "var containerSize = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
              "\')[1];",
            "var containerRatio = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerFlexRatioName +
              "\');",
            "var dimension = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
              "\').value ? 1 : 0;",
            "",
            "var layerWeight = effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINELAYER.LayerWeightName +
              "\');",
            "",
            "var layerSize = Math.max(layerWeight, 0) * containerRatio;",
            "",
            "var x = dimension ? containerSize : layerSize;",
            "var y = dimension ? layerSize : containerSize;",
            "",
            "[x, y]",
          ].join("\n");
        },
        minified: function () {
          return (
            "var _0x310531=thisComp.layer(\'" +
            Constants.LAYERS.LineRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\'),_0x29531c=_0x310531(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
            "\')[0x1],_0x5b4498=_0x310531(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerFlexRatioName +
            "\'),_0x48c5cb=_0x310531(\'" +
            Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
            "\')[\'value\']?0x1:0x0,_0x1c6754=effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerWeightName +
            "\'),_0x418548=Math[\'max\'](_0x1c6754,0x0)*_0x5b4498,_0x2d6b98=_0x48c5cb?_0x29531c:_0x418548,_0x2fb81f=_0x48c5cb?_0x418548:_0x29531c;[_0x2d6b98,_0x2fb81f];"
          );
        },
      },
      modern: {
        full: function () {
          return [
            "const flex = thisComp.layer(\'" +
              Constants.LAYERS.LineRigControllerName +
              "\').effect(\'" +
              Constants.EFFECTS.LINECONTROLLER.EffectName +
              "\');",
            "const containerSize = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
              "\')[1];",
            "const containerRatio = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.ContainerFlexRatioName +
              "\');",
            "const dimension = flex(\'" +
              Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
              "\').value ? 1 : 0;",
            "",
            "const layerWeight = effect(\'" +
              Constants.EFFECTS.LINELAYER.EffectName +
              "\')(\'" +
              Constants.EFFECTS.LINELAYER.LayerWeightName +
              "\');",
            "",
            "const layerSize = Math.max(layerWeight, 0) * containerRatio;",
            "",
            "const x = dimension ? containerSize : layerSize;",
            "const y = dimension ? layerSize : containerSize;",
            "",
            "[x, y]",
          ].join("\n");
        },
        minified: function () {
          return (
            "const _0x310531=thisComp.layer(\'" +
            Constants.LAYERS.LineRigControllerName +
            "\').effect(\'" +
            Constants.EFFECTS.LINECONTROLLER.EffectName +
            "\'),_0x29531c=_0x310531(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerSizeName +
            "\')[0x1],_0x5b4498=_0x310531(\'" +
            Constants.EFFECTS.LINECONTROLLER.ContainerFlexRatioName +
            "\'),_0x48c5cb=_0x310531(\'" +
            Constants.EFFECTS.LINECONTROLLER.VerticalModeName +
            "\')[\'value\']?0x1:0x0,_0x1c6754=effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerWeightName +
            "\'),_0x418548=Math[\'max\'](_0x1c6754,0x0)*_0x5b4498,_0x2d6b98=_0x48c5cb?_0x29531c:_0x418548,_0x2fb81f=_0x48c5cb?_0x418548:_0x29531c;[_0x2d6b98,_0x2fb81f];"
          );
        },
      },
    },
    lineMattePosition: {
      legacy: {
        full: function () {
          return "thisComp.layer(index + 1).position;";
        },
        minified: function () {
          return "thisComp.layer(index+1).position;";
        },
      },
      modern: {
        full: function () {
          return "thisComp.layer(index + 1).position;";
        },
        minified: function () {
          return "thisComp.layer(index+1).position;";
        },
      },
    },
    lineMatteSize: {
      legacy: {
        full: function () {
          return (
            "thisComp.layer(index + 1).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\')"
          );
        },
        minified: function () {
          return (
            "thisComp.layer(index+1).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\')"
          );
        },
      },
      modern: {
        full: function () {
          return (
            "thisComp.layer(index + 1).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\')"
          );
        },
        minified: function () {
          return (
            "thisComp.layer(index+1).effect(\'" +
            Constants.EFFECTS.LINELAYER.EffectName +
            "\')(\'" +
            Constants.EFFECTS.LINELAYER.LayerSizeName +
            "\')"
          );
        },
      },
    },
    rulerX: {
      legacy: {
        full: function () {
          return "posterizeTime(0); fromComp([value + thisComp.width / 2, 0])[0];";
        },
        minified: function () {
          return "posterizeTime(0); fromComp([value + thisComp.width / 2, 0])[0];";
        },
      },
      modern: {
        full: function () {
          return "posterizeTime(0); fromComp([value + thisComp.width / 2, 0])[0];";
        },
        minified: function () {
          return "posterizeTime(0); fromComp([value + thisComp.width / 2, 0])[0];";
        },
      },
    },
    rulerY: {
      legacy: {
        full: function () {
          return "posterizeTime(0); fromComp([0, value + thisComp.height / 2])[1];";
        },
        minified: function () {
          return "posterizeTime(0); fromComp([0, value + thisComp.height / 2])[1];";
        },
      },
      modern: {
        full: function () {
          return "posterizeTime(0); fromComp([0, value + thisComp.height / 2])[1];";
        },
        minified: function () {
          return "posterizeTime(0); fromComp([0, value + thisComp.height / 2])[1];";
        },
      },
    },
    scaleOffset: {
      legacy: {
        full: function () {
          return [
            "var lyr = thisLayer;",
            "var sFactor = lyr.transform.scale;",
            "while (lyr.hasParent) {",
            "  var sp = lyr.parent.transform.scale;",
            "  sFactor = [sFactor[0] * sp[0], sFactor[1] * sp[1]] * .01;",
            "  lyr = lyr.parent;",
            "};",
            "sFactor[0] * .01",
          ].join("\n");
        },
        minified: function () {
          return "var _0x4459=[\'transform\',\'hasParent\',\'parent\',\'scale\'];(function(_0x176764,_0x55bd2c){var _0x4459dc=function(_0x4c6c26){while(--_0x4c6c26){_0x176764[\'push\'](_0x176764[\'shift\']());}};_0x4459dc(++_0x55bd2c);}(_0x4459,0x1f1));var _0x4c6c=function(_0x176764,_0x55bd2c){_0x176764=_0x176764-0x1f0;var _0x4459dc=_0x4459[_0x176764];return _0x4459dc;};var _0x272f50=_0x4c6c;var lyr=thisLayer,sFactor=lyr[\'transform\'][_0x272f50(0x1f2)];while(lyr[_0x272f50(0x1f0)]){var sp=lyr[_0x272f50(0x1f1)][_0x272f50(0x1f3)][_0x272f50(0x1f2)];sFactor=[sFactor[0x0]*sp[0x0],sFactor[0x1]*sp[0x1]]*0.01,lyr=lyr[_0x272f50(0x1f1)];};sFactor[0x0]*0.01;";
        },
      },
      modern: {
        full: function () {
          return [
            "let lyr = thisLayer;",
            "let sFactor = lyr.transform.scale;",
            "while (lyr.hasParent) {",
            "  const sp = lyr.parent.transform.scale;",
            "  sFactor = [sFactor[0] * sp[0], sFactor[1] * sp[1]] * .01;",
            "  lyr = lyr.parent;",
            "};",
            "sFactor[0] * .01",
          ].join("\n");
        },
        minified: function () {
          return "const _0x4459=[\'transform\',\'hasParent\',\'parent\',\'scale\'];(function(_0x176764,_0x55bd2c){const _0x4459dc=function(_0x4c6c26){while(--_0x4c6c26){_0x176764[\'push\'](_0x176764[\'shift\']());}};_0x4459dc(++_0x55bd2c);}(_0x4459,0x1f1));const _0x4c6c=function(_0x176764,_0x55bd2c){_0x176764=_0x176764-0x1f0;let _0x4459dc=_0x4459[_0x176764];return _0x4459dc;};const _0x272f50=_0x4c6c;let lyr=thisLayer,sFactor=lyr[\'transform\'][_0x272f50(0x1f2)];while(lyr[_0x272f50(0x1f0)]){const sp=lyr[_0x272f50(0x1f1)][_0x272f50(0x1f3)][_0x272f50(0x1f2)];sFactor=[sFactor[0x0]*sp[0x0],sFactor[0x1]*sp[0x1]]*0.01,lyr=lyr[_0x272f50(0x1f1)];};sFactor[0x0]*0.01;";
        },
      },
    },
    strokeWidth: {
      legacy: {
        full: function (args) {
          return [
            "var sw = thisProperty.propertyGroup(3).content(\'ADBE Vector Graphic - Stroke\').strokeWidth;",
            args[0] === "inner" ? "sw / -2" : "sw / 2",
          ].join("\n");
        },
        minified: function (args) {
          return "var _0x4368=[\'content\',\'propertyGroup\',\'ADBE Vector Graphic - Stroke\'];(function(_0x1c7ebe,_0x462039){var _0x436887=function(_0x2288c4){while(--_0x2288c4){_0x1c7ebe[\'push\'](_0x1c7ebe[\'shift\']());}};_0x436887(++_0x462039);}(_0x4368,0x124));var _0x2288=function(_0x1c7ebe,_0x462039){_0x1c7ebe=_0x1c7ebe-0x1e8;var _0x436887=_0x4368[_0x1c7ebe];return _0x436887;};var _0x31676e=_0x2288,sw=thisProperty[_0x31676e(0x1e8)](0x3)[_0x31676e(0x1ea)](_0x31676e(0x1e9))[\'strokeWidth\'];" +
            args[0] ===
            "inner"
            ? "sw / -2"
            : "sw / 2";
        },
      },
      modern: {
        full: function (args) {
          return [
            "const sw = thisProperty.propertyGroup(3).content(\'ADBE Vector Graphic - Stroke\').strokeWidth;",
            args[0] === "inner" ? "sw / -2" : "sw / 2",
          ].join("\n");
        },
        minified: function (args) {
          return "const _0x4368=[\'content\',\'propertyGroup\',\'ADBE Vector Graphic - Stroke\'];(function(_0x1c7ebe,_0x462039){const _0x436887=function(_0x2288c4){while(--_0x2288c4){_0x1c7ebe[\'push\'](_0x1c7ebe[\'shift\']());}};_0x436887(++_0x462039);}(_0x4368,0x124));const _0x2288=function(_0x1c7ebe,_0x462039){_0x1c7ebe=_0x1c7ebe-0x1e8;let _0x436887=_0x4368[_0x1c7ebe];return _0x436887;};const _0x31676e=_0x2288,sw=thisProperty[_0x31676e(0x1e8)](0x3)[_0x31676e(0x1ea)](_0x31676e(0x1e9))[\'strokeWidth\'];" +
            args[0] ===
            "inner"
            ? "sw / -2"
            : "sw / 2";
        },
      },
    },
  };
  var PrefKey = {
    ChooseShapeSize: "chooseShapeSize",
    CreatorInnerRadius: "creatorInnerRadius",
    CreatorOuterRadius: "creatorOuterRadius",
    CreatorXSize: "creatorXSize",
    CreatorYSize: "creatorYSize",
    GridFlexMode: "gridFlexMode",
    GridMatteMode: "gridMatteMode",
    LastAEVersion: "lastAEVersion",
    LastLicense: "lastLicense",
    LastVersion: "lastVersion",
    LineFlexMode: "lineFlexMode",
    LineMatteMode: "lineMatteMode",
    UseLegacyExpressions: "useLegacy",
    UserDebug: "userDebug",
    VerticalMode: "verticalMode",
  };
  var Pseudoeffects = {
    GridLayer: {
      matchName: "Pseudo/Flex Grid Layer",
      presetBinary: [__BLOB__BLOB_000212__],
      presetName: "gridLayer.ffx",
    },
    LineControl: {
      matchName: "Pseudo/Flex Line Control",
      presetBinary: [__BLOB__BLOB_000213__],
      presetName: "lineControl.ffx",
    },
    LineLayer: {
      matchName: "Pseudo/Flex Line Layer",
      presetBinary: [__BLOB__BLOB_000214__],
      presetName: "lineLayer.ffx",
    },
  };
  Main.prototype = {
    addGridControls: function () {
      app.beginUndoGroup(Config.name + ": Add Grid Controls");
      try {
        addGridControls();
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
    createColumnRuler: function () {
      app.beginUndoGroup(Config.name + ": Create Column Ruler");
      try {
        createGridRuler("column");
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup;
      }
    },
    createGridColumn: function () {
      app.beginUndoGroup(Config.name + ": Create Grid Column");
      try {
        createGridRig("column");
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup;
      }
    },
    createGridRow: function () {
      app.beginUndoGroup(Config.name + ": Create Grid Row");
      try {
        createGridRig("row");
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup;
      }
    },
    createItem: function (itemType) {
      app.beginUndoGroup(Config.name + ": Create " + itemType);
      try {
        createItem(itemType);
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
    createLineRig: function () {
      app.beginUndoGroup(Config.name + ": Create Line Rig");
      try {
        createLineRig();
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
    createRowRuler: function () {
      app.beginUndoGroup(Config.name + ": Create Row Ruler");
      try {
        createGridRuler("row");
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup;
      }
    },
    createStroke: function (strokeType) {
      app.beginUndoGroup(Config.name + ": Create " + strokeType + " stroke");
      try {
        createStroke(strokeType);
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
    init: function () {
      if (aeq.app.version < 13.2) {
        throw Util.buildError(
          [
            "Sorry! Flex requires CC 2014.2 (AE 13.2) or newer.",
            "(You\'re using AE v" + aeq.app.version.toString() + ")",
          ].join("\n"),
          "main.js",
          $.line - this.startLineNum,
        );
      }
      Log.initLevel();
      Core.checkVersions();
      if (aeq.app.version < 16) {
        Prefs.set(PrefKey.UseLegacyExpressions, true);
      }
    },
    launchOptions: function () {
      new OptionsUI().show();
    },
    removeGridRig: function () {
      app.beginUndoGroup(Config.name + ": Remove Grid Rig");
      try {
        removeGridRig();
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
    removeLineRig: function () {
      app.beginUndoGroup(Config.name + ": Remove Line Rig");
      try {
        removeLineRig();
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
    run: function () {
      this.mainUi.show();
    },
    updateFlexMode: function (flexModeIndex) {
      app.beginUndoGroup(
        Config.name + ": Update Flex Mode to #" + flexModeIndex.toString(),
      );
      try {
        updateFlexMode(flexModeIndex);
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
    updateLineSizes: function () {
      app.beginUndoGroup(Config.name + ": Update Line Sizes");
      try {
        updateLineSizes();
      } catch (e) {
        alert(e, Config.name + " Error");
      } finally {
        app.endUndoGroup();
      }
    },
  };
  if (aeq.getModifiers().shift && aeq.getModifiers().ctrl) {
    if (confirm("Do you want to clear " + Config.name + " preferences?")) {
      Prefs.removeAll();
      alert("Prefs removed! Launching.", Config.name);
    }
  }
  Config.reg = new a(Config.lic);
  if (!Config.reg.c()) {
    Log.info("No license detected");
    return;
  }
  try {
    new Main(thisObj).run();
  } catch (e) {
    alert(e, Config.name + " Error");
    try {
      Log.error("TOP-LEVEL ERROR -> " + e.toString());
      Log.info(JSON.stringify(Prefs.getAll()));
    } catch (e2) {}
  }
})(this);
