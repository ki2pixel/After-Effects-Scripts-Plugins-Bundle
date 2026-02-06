/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function MW_EasyClones(thisObj) {
  function applyEasyClonesEffect(layer) {
    function makePseudoEffectAvailable(presetFile) {
      var myComp = app.project.activeItem;
      var layerCollection = myComp.selectedLayers;
      switchLayerSelection(layerCollection, false);
      var tempNull = myComp.layers.addNull();
      tempNull.selected = true;
      tempNull.applyPreset(presetFile);
      tempNull.remove();
      switchLayerSelection(layerCollection, true);
    }
    function switchLayerSelection(layerArray, selectionValue) {
      for (var i = 0, il = layerArray.length; i < il; i++) {
        layerArray[i].selected = selectionValue;
      }
    }
    function getAnimationPreset(presetName, presetLocation, presetBinary) {
      var presetFolder = Folder(presetLocation);
      var presetFile = File(presetFolder.toString() + "/" + presetName);
      if (!presetFolder.exists) {
        presetFolder = presetFolder.create();
      }
      if (!presetFile.exists) {
        presetFile.encoding = "BINARY";
        presetFile.open("w");
        presetFile.write(presetBinary);
        presetFile.close();
      }
      return presetFile;
    }
    if (!layer) {
      throw new Error(
        "applyPseudoEffect() method expects one parameter - Layer Object",
      );
    }
    var PseudoEffectMachName = "Pseudo/easyClones1.1";
    var PseudoEffectName = "Easy Clones";
    var AnimationPresetName = "Easy Clones.ffx";
    var aescriptsFolder = Folder(
      Folder.userData.fsName + "/Aescripts/Easy Clones/1.0/",
    );
    aescriptsFolder.create();
    var AnimationPresetBinary = __BLOB__BLOB_000131__;
    if (
      layer.property("Effects").canAddProperty(PseudoEffectMachName) === false
    ) {
      var presetFile = getAnimationPreset(
        AnimationPresetName,
        aescriptsFolder,
        AnimationPresetBinary,
      );
      makePseudoEffectAvailable(presetFile);
    }
    var myEffect = layer.property("Effects").addProperty(PseudoEffectMachName);
    myEffect.name = "Easy Clones";
  }
  function applyCloneControlEffect(selectedLayer) {
    function makePseudoEffectAvailable(presetFile) {
      var myComp = app.project.activeItem;
      var layerCollection = myComp.selectedLayers;
      switchLayerSelection(layerCollection, false);
      var tempNull = myComp.layers.addNull();
      tempNull.selected = true;
      tempNull.applyPreset(presetFile);
      tempNull.remove();
      switchLayerSelection(layerCollection, true);
    }
    function switchLayerSelection(layerArray, selectionValue) {
      for (var i = 0, il = layerArray.length; i < il; i++) {
        layerArray[i].selected = selectionValue;
      }
    }
    function getAnimationPreset(presetName, presetLocation, presetBinary) {
      var presetFolder = Folder(presetLocation);
      var presetFile = File(presetFolder.toString() + "/" + presetName);
      if (!presetFolder.exists) {
        presetFolder = presetFolder.create();
      }
      if (!presetFile.exists) {
        presetFile.encoding = "BINARY";
        presetFile.open("w");
        presetFile.write(presetBinary);
        presetFile.close();
      }
      return presetFile;
    }
    if (!selectedLayer) {
      throw new Error(
        "applyPseudoEffect() method expects one parameter - Layer Object",
      );
    }
    var PseudoEffectMachName = "Pseudo/cloneControls1.1";
    var PseudoEffectName = "Clone Controls";
    var AnimationPresetName = "Clone Controls.ffx";
    var aescriptsFolder = Folder(
      Folder.userData.fsName + "/Aescripts/Easy Clones/1.0/",
    );
    aescriptsFolder.create();
    var AnimationPresetBinary = __BLOB__BLOB_000132__;
    if (
      selectedLayer.property("Effects").canAddProperty(PseudoEffectMachName) ===
      false
    ) {
      var presetFile = getAnimationPreset(
        AnimationPresetName,
        aescriptsFolder,
        AnimationPresetBinary,
      );
      makePseudoEffectAvailable(presetFile);
    }
    var myEffect = selectedLayer
      .property("Effects")
      .addProperty(PseudoEffectMachName);
    myEffect.name = "Clone Controls";
  }
  function createCloneExpressions(
    controlLayer,
    selectedLayers,
    i,
    cloneControlEffect,
  ) {
    var cloneRandomXPositionExpression = [
      'var left = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(13);',
      'var right = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(14);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(12), true);',
      "random() * (+right - +left) + +left;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0001").expression =
      cloneRandomXPositionExpression;
    var cloneRandomYPositionExpression = [
      'var up = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(20);',
      'var down = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(21);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(19), true);',
      "random() * (+down - +up) + +up;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0002").expression =
      cloneRandomYPositionExpression;
    var cloneRandomZPositionExpression = [
      'var near = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(27);',
      'var far = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(28);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(26), true);',
      "random() * (+far - +near) + +near;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0003").expression =
      cloneRandomZPositionExpression;
    var cloneRandomScaleExpression = [
      'var decrease = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(36);',
      'var increase = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(37);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(35), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0004").expression =
      cloneRandomScaleExpression;
    var cloneRandomRotationExpression = [
      'var decrease = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(44);',
      'var increase = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(45);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(43), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0005").expression =
      cloneRandomRotationExpression;
    var cloneRandomOpacityExpression = [
      'var decrease = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(52);',
      'var increase = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(53);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(51), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0006").expression =
      cloneRandomOpacityExpression;
    var cloneRandomDelayExpression = [
      'var decrease = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(5);',
      'var increase = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(6);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(4), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0007").expression =
      cloneRandomDelayExpression;
    var cloneRandomSeedExpression = [
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10);',
      "seedRandom(newIndex,true);",
      "random(0,100);",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0008").expression =
      cloneRandomSeedExpression;
    var clonePositionExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' + controlLayer.name + '");',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomXPosition = effect("Clone Controls")(1);',
      'var xWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(15), thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(16));',
      'var randomYPosition = effect("Clone Controls")(2);',
      'var yWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(22),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(23));',
      'var randomZPosition = effect("Clone Controls")(3);',
      'var zWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(29),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(30));',
      " ",
      'if ( thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(10) == true ) {',
      '    var randomXPosition = effect("Clone Controls")(1).valueAtTime(time - (delay - randomDelay));',
      '    var xWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(15).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(16).valueAtTime(time - (delay - randomDelay)));',
      '    var randomYPosition = effect("Clone Controls")(2).valueAtTime(time - (delay - randomDelay));',
      '    var yWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(22).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(23).valueAtTime(time - (delay - randomDelay)));',
      "    var randomZPosition = randomZPosition.valueAtTime(time - (delay - randomDelay));",
      '    var zWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(29).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(30).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function xPositionModifiers(randomXPosition, xWiggle) {",
      "    return randomXPosition + xWiggle[0];",
      "}",
      " ",
      "function yPositionModifiers(randomYPosition, yWiggle) {",
      "    return randomYPosition + yWiggle[1];",
      "}",
      " ",
      "function zPositionModifiers(randomZPosition, zWiggle) {",
      "    return randomZPosition + zWiggle[2];",
      "}",
      " ",
      "//Execute//",
      "if (transform.position.value.length === 3) {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle), zPositionModifiers(randomZPosition, zWiggle) ];",
      "} else {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle) ];",
      "}",
    ].join("\n");
    selectedLayers[i]
      .property("ADBE Transform Group")
      .property("ADBE Position").expression = clonePositionExpression;
    var cloneRotationExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' +
        controlLayer.name +
        '")("ADBE Transform Group")("ADBE Rotate Z");',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomRotation = effect("Clone Controls")(5);',
      'var rotationWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(46),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(47));',
      " ",
      'if ( thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(42) == true ) {',
      "    var randomRotation = randomRotation.valueAtTime(time - (delay - randomDelay));",
      '    var rotationWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(46).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(47).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function rotationModifiers(cloneMaster, randomRotation, rotationWiggle) {",
      "    return cloneMaster.valueAtTime(time - (delay - randomDelay)) + randomRotation + rotationWiggle;",
      "}",
      " ",
      "//Execute//",
      "rotationModifiers(cloneMaster, randomRotation, rotationWiggle);",
    ].join("\n");
    selectedLayers[i]
      .property("Transform")
      .property("ADBE Rotate Z").expression = cloneRotationExpression;
    var cloneScaleExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' +
        controlLayer.name +
        '").transform.scale;',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomScale = effect("Clone Controls")(4);',
      'var scaleWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(38),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(39));',
      " ",
      'if ( thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(34) == true ) {',
      '    var randomScale = effect("Clone Controls")(4).valueAtTime(time - (delay - randomDelay));',
      '    var scaleWiggle = wiggle( thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(38).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(39).valueAtTime(time - (delay - randomDelay)) );',
      "}",
      " ",
      "function scaleModifiers(randomScale, scaleWiggle) {",
      "    return [ randomScale, randomScale ] + [ scaleWiggle[0], scaleWiggle[0] ];",
      "}",
      " ",
      "//Execute//",
      "if (transform.scale.value.length === 3) {",
      "    cloneMaster.valueAtTime(time - (delay - randomDelay)) + [ scaleModifiers(randomScale, scaleWiggle)[0], scaleModifiers(randomScale, scaleWiggle)[1], 100 ];",
      "} else {",
      "    cloneMaster.valueAtTime(time - (delay - randomDelay)) + [ scaleModifiers(randomScale, scaleWiggle)[0], scaleModifiers(randomScale, scaleWiggle)[1] ];",
      "}",
    ].join("\n");
    selectedLayers[i]
      .property("ADBE Transform Group")
      .property("ADBE Scale").expression = cloneScaleExpression;
    var cloneOpacityExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' +
        controlLayer.name +
        '").transform.opacity;',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomOpacity = effect("Clone Controls")(6);',
      'var opacityWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(54),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(55));',
      " ",
      'if ( thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(50) == true ) {',
      "    var randomOpacity = randomOpacity.valueAtTime(time - (delay - randomDelay));",
      '   var opacityWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(54).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(55).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function opacityModifiers(cloneMaster, randomOpacity, opacityWiggle) {",
      "    return cloneMaster.valueAtTime(time - (delay - randomDelay)) + randomOpacity + opacityWiggle;",
      "}",
      " ",
      "//Execute//",
      "clamp(opacityModifiers(cloneMaster, randomOpacity, opacityWiggle), 0, 100) - value;",
    ].join("\n");
    selectedLayers[i]
      .property("ADBE Transform Group")
      .property("ADBE Opacity").expression = cloneOpacityExpression;
  }
  function createCloneTrialExpressions(
    controlLayer,
    selectedLayers,
    i,
    cloneControlEffect,
  ) {
    var cloneRandomXPositionTrialExpression = [
      'var left = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(13);',
      'var right = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(14);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(12), true);',
      "random() * (+right - +left) + +left;",
    ].join("\n");
    var cloneRandomYPositionTrialExpression = [
      'var up = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(20);',
      'var down = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(21);',
      'seedRandom(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(19), true);',
      "random() * (+down - +up) + +up;",
    ].join("\n");
    var cloneRandomZPositionTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    var cloneRandomScaleTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    var cloneRandomRotationTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    var cloneRandomOpacityTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    var cloneRandomDelayTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    var cloneRandomSeedTrialExpression = [
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10);',
      "seedRandom(newIndex,true);",
      "random(0,100);",
    ].join("\n");
    var clonePositionTrialExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' + controlLayer.name + '");',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomXPosition = effect("Clone Controls")(1);',
      'var xWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(15), thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(16));',
      'var randomYPosition = effect("Clone Controls")(2);',
      'var yWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(22),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(23));',
      " ",
      'if ( thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(10) == true ) {',
      '    var randomXPosition = effect("Clone Controls")(1).valueAtTime(time - (delay - randomDelay));',
      '    var xWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(15).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(16).valueAtTime(time - (delay - randomDelay)));',
      '    var randomYPosition = effect("Clone Controls")(2).valueAtTime(time - (delay - randomDelay));',
      '    var yWiggle = wiggle(thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(22).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayer.name +
        '").effect("Easy Clones")(23).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function xPositionModifiers(randomXPosition, xWiggle) {",
      "    return randomXPosition + xWiggle[0];",
      "}",
      " ",
      "function yPositionModifiers(randomYPosition, yWiggle) {",
      "    return randomYPosition + yWiggle[1];",
      "}",
      " ",
      " ",
      "//Execute//",
      "if (transform.position.value.length === 3) {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle), value ];",
      "} else {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle) ];",
      "}",
    ].join("\n");
    var cloneRotationTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      'thisComp.layer("' + controlLayer.name + '").transform.rotation',
    ].join("\n");
    var cloneScaleTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      'thisComp.layer("' + controlLayer.name + '").transform.scale',
    ].join("\n");
    var cloneOpacityTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      'thisComp.layer("' + controlLayer.name + '").transform.opacity',
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0001").expression =
      cloneRandomXPositionTrialExpression;
    cloneControlEffect.property("Pseudo/cloneControls1.1-0002").expression =
      cloneRandomYPositionTrialExpression;
    cloneControlEffect.property("Pseudo/cloneControls1.1-0003").expression =
      cloneRandomZPositionTrialExpression;
    cloneControlEffect.property("Pseudo/cloneControls1.1-0004").expression =
      cloneRandomScaleTrialExpression;
    cloneControlEffect.property("Pseudo/cloneControls1.1-0005").expression =
      cloneRandomRotationTrialExpression;
    cloneControlEffect.property("Pseudo/cloneControls1.1-0006").expression =
      cloneRandomOpacityTrialExpression;
    cloneControlEffect.property("Pseudo/cloneControls1.1-0007").expression =
      cloneRandomDelayTrialExpression;
    cloneControlEffect.property("Pseudo/cloneControls1.1-0008").expression =
      cloneRandomSeedTrialExpression;
    selectedLayers[i]
      .property("ADBE Transform Group")
      .property("ADBE Position").expression = clonePositionTrialExpression;
    selectedLayers[i]
      .property("Transform")
      .property("ADBE Rotate Z").expression = cloneRotationTrialExpression;
    selectedLayers[i]
      .property("ADBE Transform Group")
      .property("ADBE Scale").expression = cloneScaleTrialExpression;
    selectedLayers[i]
      .property("ADBE Transform Group")
      .property("ADBE Opacity").expression = cloneOpacityTrialExpression;
  }
  function createClones(trialMode) {
    function buildClones(zeroPositionCheckbox, trialMode) {
      var comp = app.project.activeItem;
      var selectedLayers = comp.selectedLayers;
      if (comp instanceof CompItem) {
        controlLayer = comp.layers.addShape();
        var shapeGroup = controlLayer
          .property("Contents")
          .addProperty("ADBE Vector Group");
        shapeGroup.property("Contents").addProperty("ADBE Vector Shape - Rect");
        shapeGroup
          .property("Contents")
          .addProperty("ADBE Vector Graphic - Stroke");
        var myRGBColour = [0, 255, 0, 255] / 255;
        controlLayer
          .property("ADBE Root Vectors Group")
          .property("ADBE Vector Group")
          .property("ADBE Vectors Group")
          .property("ADBE Vector Graphic - Stroke")
          .property("ADBE Vector Stroke Color")
          .setValue(myRGBColour);
        controlLayer.name = newSystem.name + " Clone Controls";
        controlLayer.moveToBeginning();
        controlLayer.label = 9;
        controlLayer.guideLayer = true;
        var easyClonesEffect = applyEasyClonesEffect(controlLayer);
        for (var i = 0; i < selectedLayers.length; i += 1) {
          selectedLayers[i].name = newSystem.name + " Clone-" + i + 1;
          selectedLayers[i].label = 2;
          selectedLayers[i].comment = newSystem.name;
          var removePositionKeys = selectedLayers[i].transform.position;
          var removeRotationKeys = selectedLayers[i].transform.rotation;
          var removeScaleKeys = selectedLayers[i].transform.scale;
          var removeOpactityKeys = selectedLayers[i].transform.opacity;
          for (var p = removePositionKeys.numKeys; p != 0; p--) {
            removePositionKeys.removeKey(p);
          }
          for (var r = removeRotationKeys.numKeys; r != 0; r--) {
            removeRotationKeys.removeKey(r);
          }
          for (var s = removeScaleKeys.numKeys; s != 0; s--) {
            removeScaleKeys.removeKey(s);
          }
          for (var o = removeOpactityKeys.numKeys; o != 0; o--) {
            removeOpactityKeys.removeKey(o);
          }
          var clonePosition = selectedLayers[i].transform.position;
          var clonePositionValue = selectedLayers[i].transform.position.value;
          if (zeroPositionCheckbox === true) {
            clonePosition.setValue([0, 0, 0]);
          } else {
            clonePosition.setValue(
              -controlLayer.transform.position.value + clonePositionValue,
            );
          }
          var cloneScale = selectedLayers[i].transform.scale;
          cloneScale.setValue([0, 0]);
          var cloneRotation = selectedLayers[i].transform.rotation;
          cloneRotation.setValue(0);
          var cloneOpacity = selectedLayers[i].transform.opacity;
          cloneOpacity.setValue(0);
        }
      }
      for (var i = 0; i < selectedLayers.length; i += 1) {
        applyCloneControlEffect(selectedLayers[i]);
        var cloneControlEffect = selectedLayers[i]
          .property("ADBE Effect Parade")
          .property("Pseudo/cloneControls1.1");
        if (trialMode == true) {
          createCloneTrialExpressions(
            controlLayer,
            selectedLayers,
            i,
            cloneControlEffect,
          );
        } else {
          createCloneExpressions(
            controlLayer,
            selectedLayers,
            i,
            cloneControlEffect,
          );
        }
      }
    }
    function addColours() {
      var comp = app.project.activeItem;
      var compLayers = comp.layers;
      var colourDelayCheckbox = controlLayer
        .property("ADBE Effect Parade")
        .addProperty("ADBE Checkbox Control");
      colourDelayCheckbox.name = "Delay Colours?";
      colourDelayCheckbox("ADBE Checkbox Control-0001").setValue(true);
      var colourSeedSlider = controlLayer
        .property("ADBE Effect Parade")
        .addProperty("ADBE Slider Control");
      colourSeedSlider.name = "Colour Seed";
      var myFillExpressions = [];
      for (var i = 1; i <= newSystem.randomColours; i += 1) {
        var colourControl = controlLayer
          .property("Effects")
          .addProperty("ADBE Color Control");
        var colourFill = [255, 210, 0, 255] / 255;
        colourControl.property("ADBE Color Control-0001").setValue(colourFill);
        colourControl.name = "Colour " + i;
        colourControlExpression =
          'thisComp.layer("' +
          controlLayer.name +
          '").effect("' +
          colourControl.name +
          '")(1)';
        myFillExpressions.push(colourControlExpression);
      }
      var myFillDelayExpressions = [];
      for (var i = 1; i <= newSystem.randomColours; i += 1) {
        colourControl.name = "Colour " + i;
        colourControlDelayExpression =
          'thisComp.layer("' +
          controlLayer.name +
          '").effect("' +
          colourControl.name +
          '")(1).valueAtTime(time - (delay - randomDelay))';
        myFillDelayExpressions.push(colourControlDelayExpression);
      }
      for (var i = 1; i <= compLayers.length; i += 1) {
        var layerComment = compLayers[i].comment;
        if (layerComment == newSystem.name) {
          var applyFill = compLayers[i]
            .property("ADBE Effect Parade")
            .addProperty("ADBE Fill");
          applyFill.name = "Random Colour";
          var applyFillExpression = [
            "/* Delay & Frames */",
            'var frameDelay = thisComp.layer("' +
              controlLayer.name +
              '").effect("Easy Clones")(2);',
            'var randomDelay = framesToTime(effect("Clone Controls")(7));',
            'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
            "var delay = frameDelay*framesToTime(newIndex);",
            " ",
            'if (thisComp.layer("' +
              controlLayer.name +
              '").effect("Delay Colours?")(1) == false) {',
            " ",
            "   var colours = [" + myFillExpressions.toString() + "];",
            '   var colourSeed = effect("Clone Controls")(8) + thisComp.layer("' +
              controlLayer.name +
              '").effect("Colour Seed")(1);',
            "   seedRandom(colourSeed, true);",
            "   colours[Math.floor(random (colours.length - 0.0001) )];",
            " ",
            "} else {",
            " ",
            "   var colours = [" + myFillDelayExpressions.toString() + "];",
            '   var colourSeed = effect("Clone Controls")(8) + thisComp.layer("' +
              controlLayer.name +
              '").effect("Colour Seed")(1);',
            "   seedRandom(colourSeed, true);",
            "   colours[Math.floor(random (colours.length - 0.0001) )];",
            " ",
            "}",
          ].join("\n");
          compLayers[i]
            .property("ADBE Effect Parade")
            .property("ADBE Fill")
            .property("ADBE Fill-0002").expression = applyFillExpression;
        }
      }
    }
    app.beginUndoGroup("Create Easy Clones");
    JSON || (JSON = {});
    (function () {
      function k(a) {
        return a < 10 ? "0" + a : a;
      }
      function o(a) {
        p.lastIndex = 0;
        return p.test(a)
          ? '"' +
              a.replace(p, function (a) {
                var c = r[a];
                return typeof c === "string"
                  ? c
                  : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
              }) +
              '"'
          : '"' + a + '"';
      }
      function l(a, j) {
        var g = e;
        var b = j[a];
        b &&
          typeof b === "object" &&
          typeof b.toJSON === "function" &&
          (b = b.toJSON(a));
        typeof i === "function" && (b = i.call(j, a, b));
        switch (typeof b) {
          case "string":
            return o(b);
          case "number":
            return isFinite(b) ? String(b) : "null";
          case "boolean":
          case "null":
            return String(b);
          case "object":
            if (!b) {
              return "null";
            }
            e += n;
            f = [];
            if (Object.prototype.toString.apply(b) === "[object Array]") {
              m = b.length;
              for (var c = 0; c < m; c += 1) {
                f[c] = l(c, b) || "null";
              }
              h =
                f.length === 0
                  ? "[]"
                  : e
                    ? "[\n" + e + f.join(",\n" + e) + "\n" + g + "]"
                    : "[" + f.join(",") + "]";
              e = g;
              return h;
            }
            if (i && typeof i === "object") {
              m = i.length;
              for (var c = 0; c < m; c += 1) {
                typeof i[c] === "string" &&
                  ((d = i[c]),
                  (h = l(d, b)) && f.push(o(d) + e ? ": " : ":" + h));
              }
            } else {
              for (var d in b) {
                Object.prototype.hasOwnProperty.call(b, d) &&
                  (h = l(d, b)) &&
                  f.push(o(d) + e ? ": " : ":" + h);
              }
            }
            h =
              f.length === 0
                ? "{}"
                : e
                  ? "{\n" + e + f.join(",\n" + e) + "\n" + g + "}"
                  : "{" + f.join(",") + "}";
            e = g;
            return h;
        }
      }
      if (typeof Date.prototype.toJSON !== "function") {
        Date.prototype.toJSON = function () {
          return isFinite(this.valueOf())
            ? this.getUTCFullYear() +
                "-" +
                k(this.getUTCMonth() + 1) +
                "-" +
                k(this.getUTCDate()) +
                "T" +
                k(this.getUTCHours()) +
                ":" +
                k(this.getUTCMinutes()) +
                ":" +
                k(this.getUTCSeconds()) +
                "Z"
            : null;
        };
        String.prototype.toJSON =
          Number.prototype.toJSON =
          Boolean.prototype.toJSON =
            function () {
              return this.valueOf();
            };
      }
      var q =
        /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var p =
        /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
      var r = {
        "\b": "\\b",
        "\t": "\\t",
        "\n": "\\n",
        "\f": "\\f",
        "\r": "\\r",
        '"': '\\"',
        "\\": "\\\\",
      };
      if (typeof JSON.stringify !== "function") {
        JSON.stringify = function (a, j, c) {
          n = e = "";
          if (typeof c === "number") {
            for (var d = 0; d < c; d += 1) {
              n += " ";
            }
          } else {
            typeof c === "string" && (n = c);
          }
          if (
            (i = j) &&
            typeof j !== "function" &&
            (typeof j !== "object" || typeof j.length !== "number")
          ) {
            throw Error("JSON.stringify");
          }
          return l("", { "": a });
        };
      }
      if (typeof JSON.parse !== "function") {
        JSON.parse = function (a, e) {
          function c(a, d) {
            var b = a[d];
            if (b && typeof b === "object") {
              for (var g in b) {
                Object.prototype.hasOwnProperty.call(b, g) &&
                  ((f = c(b, g)), f !== void 0 ? (b[g] = f) : delete b[g]);
              }
            }
            return e.call(a, d, b);
          }
          var a = String(a);
          q.lastIndex = 0;
          q.test(a) &&
            (a = a.replace(q, function (a) {
              return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
            }));
          if (
            /^[\],:{}\s]*$/.test(
              a
                .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
                .replace(
                  /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
                  "]",
                )
                .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
            )
          ) {
            return (
              (d = eval("(" + a + ")")),
              typeof e === "function" ? c({ "": d }, "") : d
            );
          }
          throw new SyntaxError("JSON.parse");
        };
      }
    })();
    var comp = app.project.activeItem;
    if (comp == null || comp instanceof CompItem == false) {
      alert("Please select at least one layer to build a Clone System.");
      return;
    } else {
      function getNewSystem() {
        var win = new Window("dialog", "Easy Clones");
        win.margins = 15;
        var content = win.add("group");
        content.orientation = "column";
        var panel01 = content.add("panel", undefined, "Create Clone System");
        panel01.alignChildren = ["left", "top"];
        panel01.orientation = "column";
        panel01.preferredSize.width = 340;
        panel01.spacing = 5;
        var row01 = panel01.add("group");
        row01.orientation = "row";
        row01.spacing = 5;
        var row01Label = row01.add(
          'statictext {text: "Name:", justify: "right"}',
        );
        row01Label.preferredSize.width = 100;
        var row01 = row01.add("edittext", undefined, "Shapes");
        row01.preferredSize.width = 200;
        var row02 = panel01.add("group");
        row02.orientation = "row";
        row02.spacing = 5;
        var row02Label = row02.add(
          'statictext {text: "Random Colours:", justify: "right"}',
        );
        row02Label.preferredSize.width = 100;
        var row02 = row02.add("edittext", undefined, "3");
        row02.preferredSize.width = 200;
        var row03 = panel01.add("group");
        row03.orientation = "row";
        row03.spacing = 5;
        var row03Label = row03.add(
          'statictext {text: "Centre to Control?", justify: "right"}',
        );
        row03Label.preferredSize.width = 100;
        var row03 = row03.add("checkbox", undefined);
        row03.preferredSize.width = 200;
        var buttonGroup = win.add("group");
        buttonGroup.alignChildren = ["right", "top"];
        buttonGroup.orientation = "row";
        buttonGroup.preferredSize.width = 340;
        var cancelButton = buttonGroup.add("button", undefined, "Cancel");
        var okayButton = buttonGroup.add("button", undefined, "Ok");
        okayButton.active = true;
        if (win.show() === 1) {
          var newSystem = {
            name: row01.text,
            randomColours: row02.text,
            zeroClones: row03.value,
          };
          return newSystem;
        } else {
          return false;
        }
      }
      function chooseSystem(trialMode, newSystem) {
        var zeroPositionCheckbox = newSystem.zeroClones;
        if (newSystem === false) {
          return;
        }
        var colourPromptNum = parseFloat(newSystem.randomColours);
        if (isNaN(colourPromptNum)) {
          alert(
            "You must enter a number into the Random Colours Field, not text.",
          );
          return;
        } else if (colourPromptNum === 0) {
          buildClones(zeroPositionCheckbox, trialMode);
        } else {
          if (trialMode == true) {
            buildClones(zeroPositionCheckbox, trialMode);
          } else {
            buildClones(zeroPositionCheckbox, trialMode);
            addColours();
          }
        }
      }
      var selectedLayer = comp.selectedLayers[0];
      if (selectedLayer == null) {
        alert("Please select at least one layer to build a Clone System.");
        return;
      }
      try {
        var newSystem = getNewSystem();
      } catch (err) {
        alert(err);
      }
      chooseSystem(trialMode, newSystem);
    }
    app.endUndoGroup();
  }
  function applyCloneControlEffect(selectedLayer) {
    function makePseudoEffectAvailable(presetFile) {
      var myComp = app.project.activeItem;
      var layerCollection = myComp.selectedLayers;
      switchLayerSelection(layerCollection, false);
      var tempNull = myComp.layers.addNull();
      tempNull.selected = true;
      tempNull.applyPreset(presetFile);
      tempNull.remove();
      switchLayerSelection(layerCollection, true);
    }
    function switchLayerSelection(layerArray, selectionValue) {
      for (var i = 0, il = layerArray.length; i < il; i++) {
        layerArray[i].selected = selectionValue;
      }
    }
    function getAnimationPreset(presetName, presetLocation, presetBinary) {
      var presetFolder = Folder(presetLocation);
      var presetFile = File(presetFolder.toString() + "/" + presetName);
      if (!presetFolder.exists) {
        presetFolder = presetFolder.create();
      }
      if (!presetFile.exists) {
        presetFile.encoding = "BINARY";
        presetFile.open("w");
        presetFile.write(presetBinary);
        presetFile.close();
      }
      return presetFile;
    }
    if (!selectedLayer) {
      throw new Error(
        "applyPseudoEffect() method expects one parameter - Layer Object",
      );
    }
    var PseudoEffectMachName = "Pseudo/cloneControls1.1";
    var PseudoEffectName = "Clone Controls";
    var AnimationPresetName = "Clone Controls.ffx";
    var aescriptsFolder = Folder(
      Folder.userData.fsName + "/Aescripts/Easy Clones/1.0/",
    );
    aescriptsFolder.create();
    var AnimationPresetBinary = __BLOB__BLOB_000133__;
    if (
      selectedLayer.property("Effects").canAddProperty(PseudoEffectMachName) ===
      false
    ) {
      var presetFile = getAnimationPreset(
        AnimationPresetName,
        aescriptsFolder,
        AnimationPresetBinary,
      );
      makePseudoEffectAvailable(presetFile);
    }
    var myEffect = selectedLayer
      .property("Effects")
      .addProperty(PseudoEffectMachName);
    myEffect.name = "Clone Controls";
  }
  function addCloneTrialExpressions(
    controlLayerName,
    selectedLayer,
    i,
    cloneControlEffect,
  ) {
    var cloneRandomXPositionExpression = [
      'var left = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(13);',
      'var right = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(14);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(12), true);',
      "random() * (+right - +left) + +left;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0001").expression =
      cloneRandomXPositionExpression;
    var cloneRandomYPositionExpression = [
      'var up = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(20);',
      'var down = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(21);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(19), true);',
      "random() * (+down - +up) + +up;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0002").expression =
      cloneRandomYPositionExpression;
    var cloneRandomZPositionExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0003").expression =
      cloneRandomZPositionExpression;
    var cloneRandomScaleExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0004").expression =
      cloneRandomScaleExpression;
    var cloneRandomRotationExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0005").expression =
      cloneRandomRotationExpression;
    var cloneRandomOpacityExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0006").expression =
      cloneRandomOpacityExpression;
    var cloneRandomDelayExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0007").expression =
      cloneRandomDelayExpression;
    var cloneRandomSeedExpression = [
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10);',
      "seedRandom(newIndex,true);",
      "random(0,100);",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0008").expression =
      cloneRandomSeedExpression;
    var clonePositionExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' + controlLayerName + '");',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomXPosition = effect("Clone Controls")(1);',
      'var xWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(15), thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(16));',
      'var randomYPosition = effect("Clone Controls")(2);',
      'var yWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(22),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(23));',
      " ",
      'if ( thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(10) == true ) {',
      '    var randomXPosition = effect("Clone Controls")(1).valueAtTime(time - (delay - randomDelay));',
      '    var xWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(15).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(16).valueAtTime(time - (delay - randomDelay)));',
      '    var randomYPosition = effect("Clone Controls")(2).valueAtTime(time - (delay - randomDelay));',
      '    var yWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(22).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(23).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function xPositionModifiers(randomXPosition, xWiggle) {",
      "    return randomXPosition + xWiggle[0];",
      "}",
      " ",
      "function yPositionModifiers(randomYPosition, yWiggle) {",
      "    return randomYPosition + yWiggle[1];",
      "}",
      " ",
      " ",
      "//Execute//",
      "if (transform.position.value.length === 3) {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle), value ];",
      "} else {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle) ];",
      "}",
    ].join("\n");
    selectedLayer
      .property("ADBE Transform Group")
      .property("ADBE Position").expression = clonePositionExpression;
    var cloneRotationExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      'thisComp.layer("' + controlLayerName + '").transform.rotation',
    ].join("\n");
    selectedLayer.property("Transform").property("ADBE Rotate Z").expression =
      cloneRotationExpression;
    var cloneScaleExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      'thisComp.layer("' + controlLayerName + '").transform.scale',
    ].join("\n");
    selectedLayer
      .property("ADBE Transform Group")
      .property("ADBE Scale").expression = cloneScaleExpression;
    var cloneOpacityExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      'thisComp.layer("' + controlLayerName + '").transform.opacity',
    ].join("\n");
    selectedLayer
      .property("ADBE Transform Group")
      .property("ADBE Opacity").expression = cloneOpacityExpression;
  }
  function addCloneExpressions(
    controlLayerName,
    selectedLayer,
    i,
    cloneControlEffect,
  ) {
    var cloneRandomXPositionExpression = [
      'var left = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(13);',
      'var right = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(14);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(12), true);',
      "random() * (+right - +left) + +left;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0001").expression =
      cloneRandomXPositionExpression;
    var cloneRandomYPositionExpression = [
      'var up = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(20);',
      'var down = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(21);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(19), true);',
      "random() * (+down - +up) + +up;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0002").expression =
      cloneRandomYPositionExpression;
    var cloneRandomZPositionExpression = [
      'var near = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(27);',
      'var far = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(28);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(26), true);',
      "random() * (+far - +near) + +near;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0003").expression =
      cloneRandomZPositionExpression;
    var cloneRandomScaleExpression = [
      'var decrease = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(36);',
      'var increase = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(37);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(35), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0004").expression =
      cloneRandomScaleExpression;
    var cloneRandomRotationExpression = [
      'var decrease = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(44);',
      'var increase = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(45);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(43), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0005").expression =
      cloneRandomRotationExpression;
    var cloneRandomOpacityExpression = [
      'var decrease = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(52);',
      'var increase = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(53);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(51), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0006").expression =
      cloneRandomOpacityExpression;
    var cloneRandomDelayExpression = [
      'var decrease = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(5);',
      'var increase = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(6);',
      'seedRandom(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(4), true);',
      "random() * (+increase - +decrease) + +decrease;",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0007").expression =
      cloneRandomDelayExpression;
    var cloneRandomSeedExpression = [
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10);',
      "seedRandom(newIndex,true);",
      "random(0,100);",
    ].join("\n");
    cloneControlEffect.property("Pseudo/cloneControls1.1-0008").expression =
      cloneRandomSeedExpression;
    var clonePositionExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' + controlLayerName + '");',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomXPosition = effect("Clone Controls")(1);',
      'var xWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(15), thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(16));',
      'var randomYPosition = effect("Clone Controls")(2);',
      'var yWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(22),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(23));',
      'var randomZPosition = effect("Clone Controls")(3);',
      'var zWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(29),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(30));',
      " ",
      'if ( thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(10) == true ) {',
      '    var randomXPosition = effect("Clone Controls")(1).valueAtTime(time - (delay - randomDelay));',
      '    var xWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(15).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(16).valueAtTime(time - (delay - randomDelay)));',
      '    var randomYPosition = effect("Clone Controls")(2).valueAtTime(time - (delay - randomDelay));',
      '    var yWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(22).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(23).valueAtTime(time - (delay - randomDelay)));',
      "    var randomZPosition = randomZPosition.valueAtTime(time - (delay - randomDelay));",
      '    var zWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(29).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(30).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function xPositionModifiers(randomXPosition, xWiggle) {",
      "    return randomXPosition + xWiggle[0];",
      "}",
      " ",
      "function yPositionModifiers(randomYPosition, yWiggle) {",
      "    return randomYPosition + yWiggle[1];",
      "}",
      " ",
      "function zPositionModifiers(randomZPosition, zWiggle) {",
      "    return randomZPosition + zWiggle[2];",
      "}",
      " ",
      "//Execute//",
      "if (transform.position.value.length === 3) {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle), zPositionModifiers(randomZPosition, zWiggle) ];",
      "} else {",
      "    cloneMaster.toWorld(cloneMaster.anchorPoint, time - (delay - randomDelay)) + [ xPositionModifiers(randomXPosition, xWiggle) , yPositionModifiers(randomYPosition, yWiggle) ];",
      "}",
    ].join("\n");
    selectedLayer
      .property("ADBE Transform Group")
      .property("ADBE Position").expression = clonePositionExpression;
    var cloneRotationExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' +
        controlLayerName +
        '")("ADBE Transform Group")("ADBE Rotate Z");',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomRotation = effect("Clone Controls")(5);',
      'var rotationWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(46),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(47));',
      " ",
      'if ( thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(42) == true ) {',
      "    var randomRotation = randomRotation.valueAtTime(time - (delay - randomDelay));",
      '    var rotationWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(46).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(47).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function rotationModifiers(cloneMaster, randomRotation, rotationWiggle) {",
      "    return cloneMaster.valueAtTime(time - (delay - randomDelay)) + randomRotation + rotationWiggle;",
      "}",
      " ",
      "//Execute//",
      "rotationModifiers(cloneMaster, randomRotation, rotationWiggle);",
    ].join("\n");
    selectedLayer.property("Transform").property("ADBE Rotate Z").expression =
      cloneRotationExpression;
    var cloneScaleExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' +
        controlLayerName +
        '").transform.scale;',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomScale = effect("Clone Controls")(4);',
      'var scaleWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(38),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(39));',
      " ",
      'if ( thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(34) == true ) {',
      '    var randomScale = effect("Clone Controls")(4).valueAtTime(time - (delay - randomDelay));',
      '    var scaleWiggle = wiggle( thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(38).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(39).valueAtTime(time - (delay - randomDelay)) );',
      "}",
      " ",
      "function scaleModifiers(randomScale, scaleWiggle) {",
      "    return [ randomScale, randomScale ] + [ scaleWiggle[0], scaleWiggle[0] ];",
      "}",
      " ",
      "//Execute//",
      "if (transform.scale.value.length === 3) {",
      "    cloneMaster.valueAtTime(time - (delay - randomDelay)) + [ scaleModifiers(randomScale, scaleWiggle)[0], scaleModifiers(randomScale, scaleWiggle)[1], 100 ];",
      "} else {",
      "    cloneMaster.valueAtTime(time - (delay - randomDelay)) + [ scaleModifiers(randomScale, scaleWiggle)[0], scaleModifiers(randomScale, scaleWiggle)[1] ];",
      "}",
    ].join("\n");
    selectedLayer
      .property("ADBE Transform Group")
      .property("ADBE Scale").expression = cloneScaleExpression;
    var cloneOpacityExpression = [
      "// Clone Master //",
      'var cloneMaster = thisComp.layer("' +
        controlLayerName +
        '").transform.opacity;',
      " ",
      "// Delay & Frames //",
      'var frameDelay = thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(2);',
      'var randomDelay = framesToTime(effect("Clone Controls")(7));',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      " ",
      "//Modifiers //",
      'var randomOpacity = effect("Clone Controls")(6);',
      'var opacityWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(54),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(55));',
      " ",
      'if ( thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(50) == true ) {',
      "    var randomOpacity = randomOpacity.valueAtTime(time - (delay - randomDelay));",
      '   var opacityWiggle = wiggle(thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(54).valueAtTime(time - (delay - randomDelay)),thisComp.layer("' +
        controlLayerName +
        '").effect("Easy Clones")(55).valueAtTime(time - (delay - randomDelay)));',
      "}",
      " ",
      "function opacityModifiers(cloneMaster, randomOpacity, opacityWiggle) {",
      "    return cloneMaster.valueAtTime(time - (delay - randomDelay)) + randomOpacity + opacityWiggle;",
      "}",
      " ",
      "//Execute//",
      "clamp(opacityModifiers(cloneMaster, randomOpacity, opacityWiggle), 0, 100) - value;",
    ].join("\n");
    selectedLayer
      .property("ADBE Transform Group")
      .property("ADBE Opacity").expression = cloneOpacityExpression;
  }
  function addClones(trialMode) {
    function addClones(cloneControlLayer, zeroPositionCheckbox, trialMode) {
      var comp = app.project.activeItem;
      var selectedLayers = comp.selectedLayers;
      var numSelectedLayers = selectedLayers.length;
      var controlLayerName = cloneControlLayer.name;
      var controlLayerSplit = controlLayerName.split(" ")[0];
      cloneLabel;
      try {
        var comp = app.project.activeItem;
        var layers = comp.layers;
        var numLayers = layers.length;
        var highestNumber = 0;
        for (var i = 1; i <= numLayers; i += 1) {
          if (layers[i].comment === controlLayerSplit) {
            var layer = layers[i];
            var cloneLabel = layer.label;
            var layerIndex = layer.index;
            var name = layer.name;
            var index = parseInt(name.split("-")[1]);
            if (isNaN(index) === false) {
              if (index > highestNumber) {
                highestNumber = index;
              }
              if (index === highestNumber) {
                var highestIndex = layerIndex;
              }
              if (layerIndex === highestIndex) {
                var highestLayerIndex = layer;
              }
            }
          }
        }
      } catch (err) {}
      if (comp instanceof CompItem) {
        for (var i = 0; i < numSelectedLayers; i += 1) {
          var selectedLayer = selectedLayers[i];
          selectedLayer.name =
            controlLayerSplit + " Clone-" + highestNumber + i + 1;
          selectedLayer.comment = controlLayerSplit;
          selectedLayer.label = 2;
          if (typeof CloneLabel !== "undefined") {
            selectedLayer.label = cloneLabel;
          }
          var removePositionKeys = selectedLayer.transform.position;
          var removeRotationKeys = selectedLayer.transform.rotation;
          var removeScaleKeys = selectedLayer.transform.scale;
          var removeOpactityKeys = selectedLayer.transform.opacity;
          for (var p = removePositionKeys.numKeys; p != 0; p--) {
            removePositionKeys.removeKey(p);
          }
          for (var r = removeRotationKeys.numKeys; r != 0; r--) {
            removeRotationKeys.removeKey(r);
          }
          for (var s = removeScaleKeys.numKeys; s != 0; s--) {
            removeScaleKeys.removeKey(s);
          }
          for (var o = removeOpactityKeys.numKeys; o != 0; o--) {
            removeOpactityKeys.removeKey(o);
          }
          var clonePosition = selectedLayers[i].transform.position;
          var clonePositionValue = selectedLayers[i].transform.position.value;
          if (zeroPositionCheckbox === true) {
            clonePosition.setValue([0, 0, 0]);
          } else {
            clonePosition.setValue(
              -cloneControlLayer.transform.position.value + clonePositionValue,
            );
          }
          var cloneScale = selectedLayer.transform.scale;
          cloneScale.setValue([0, 0]);
          var cloneRotation = selectedLayer.transform.rotation;
          cloneRotation.setValue(0);
          var cloneOpacity = selectedLayer.transform.opacity;
          cloneOpacity.setValue(0);
          applyCloneControlEffect(selectedLayer);
          var cloneControlEffect = selectedLayer
            .property("ADBE Effect Parade")
            .property("Pseudo/cloneControls1.1");
          if (trialMode == true) {
            addCloneTrialExpressions(
              controlLayerName,
              selectedLayer,
              i,
              cloneControlEffect,
            );
          } else {
            addCloneExpressions(
              controlLayerName,
              selectedLayer,
              i,
              cloneControlEffect,
            );
            checkColours(cloneControlLayer, selectedLayer);
          }
        }
      }
      selectedLayer.index;
      if (typeof cloneLabel !== "undefined") {
        if (highestLayerIndex.index < layer.index) {
          for (var i = numSelectedLayers - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            selectedLayer.moveBefore(highestLayerIndex);
          }
        } else {
          for (var i = numSelectedLayers - 1; i >= 0; i--) {
            var selectedLayer = selectedLayers[i];
            selectedLayer.moveAfter(highestLayerIndex);
          }
        }
      }
    }
    function checkColours(cloneControlLayer, selectedLayer) {
      var controlEffects = cloneControlLayer.property("ADBE Effect Parade");
      var numControlEffects = controlEffects.numProperties;
      var colourCount = 0;
      for (var c = 1; c <= numControlEffects; c += 1) {
        var effect = controlEffects.property(c);
        if (effect.matchName === "ADBE Color Control") {
          colourCount += 1;
        }
      }
      if (colourCount !== 0) {
        addColours(cloneControlLayer, selectedLayer, colourCount);
      }
    }
    function addColours(cloneControlLayer, selectedLayer, colourCount) {
      var controlLayerName = cloneControlLayer.name;
      var myFillExpressions = [];
      for (var i = 1; i <= colourCount; i += 1) {
        var colourFillExpression =
          'thisComp.layer("' +
          controlLayerName +
          '").effect("Colour ' +
          i +
          '")(1)';
        myFillExpressions.push(colourFillExpression);
      }
      var myFillDelayExpressions = [];
      for (var i = 1; i <= colourCount; i += 1) {
        var colourFillDelayExpression =
          'thisComp.layer("' +
          controlLayerName +
          '").effect("Colour ' +
          i +
          '")(1).valueAtTime(time - (delay - randomDelay))';
        myFillDelayExpressions.push(colourFillDelayExpression);
      }
      var cloneFill = selectedLayer
        .property("ADBE Effect Parade")
        .addProperty("ADBE Fill");
      cloneFill.name = "Random Colour";
      var cloneFillExpression = [
        "/* Delay & Frames */",
        'var frameDelay = thisComp.layer("' +
          controlLayerName +
          '").effect("Easy Clones")(2);',
        'var randomDelay = framesToTime(effect("Clone Controls")(7));',
        'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
        "var delay = frameDelay*framesToTime(newIndex);",
        " ",
        'if (thisComp.layer("' +
          controlLayerName +
          '").effect("Delay Colours?")(1) == false) {',
        " ",
        "   var colours = [" + myFillExpressions.toString() + "];",
        '   var colourSeed = effect("Clone Controls")(8) + thisComp.layer("' +
          controlLayerName +
          '").effect("Colour Seed")(1);',
        "   seedRandom(colourSeed, true);",
        "   colours[Math.floor(random (colours.length - 0.0001) )];",
        " ",
        "} else {",
        " ",
        "   var colours = [" + myFillDelayExpressions.toString() + "];",
        '   var colourSeed = effect("Clone Controls")(8) + thisComp.layer("' +
          controlLayerName +
          '").effect("Colour Seed")(1);',
        "   seedRandom(colourSeed, true);",
        "   colours[Math.floor(random (colours.length - 0.0001) )];",
        " ",
        "}",
      ].join("\n");
      selectedLayer
        .property("ADBE Effect Parade")
        .property("ADBE Fill")
        .property("ADBE Fill-0002").expression = cloneFillExpression;
    }
    app.beginUndoGroup("Add Clones");
    var comp = app.project.activeItem;
    if (comp == null || comp instanceof CompItem == false) {
      alert("Please select at least one layer to add Clones.");
      return;
    } else {
      var selectedLayer = comp.selectedLayers[0];
      if (selectedLayer == null) {
        alert("Please select at least one layer to add Clones.");
        return;
      }
    }
    try {
      function getCloneControlLayer() {
        var comp = app.project.activeItem;
        var layers = comp.layers;
        var numLayers = layers.length;
        var cloneControlLayers = [];
        for (var i = 1; i <= numLayers; i += 1) {
          var layer = layers[i];
          var effects = layer.property("ADBE Effect Parade");
          if (effects.numProperties > 0) {
            if (effects.property(1).name === "Easy Clones") {
              cloneControlLayers.push(layer);
            }
          }
        }
        if (cloneControlLayers.length > 0) {
          var win = new Window("dialog", "Select An Existing Clone System");
          win.margins = 15;
          var content = win.add("group");
          content.orientation = "column";
          var panel01 = content.add(
            "panel",
            undefined,
            "Add to a Clone System",
          );
          panel01.alignChildren = ["left", "top"];
          panel01.orientation = "column";
          panel01.preferredSize.width = 340;
          panel01.spacing = 5;
          var row01 = panel01.add("group");
          row01.orientation = "row";
          row01.spacing = 5;
          var row01Label = row01.add(
            'statictext {text: "Clone System:", justify: "right"}',
          );
          row01Label.preferredSize.width = 100;
          var cloneSystemNames = [];
          var numCloneControlLayers = cloneControlLayers.length;
          for (var i = 0; i < numCloneControlLayers; i += 1) {
            var name = cloneControlLayers[i].name;
            cloneSystemNames.push(name.replace(" Clone Controls", ""));
          }
          var row01Input = row01.add(
            "dropdownlist",
            undefined,
            cloneSystemNames,
          );
          row01Input.preferredSize.width = 200;
          row01Input.selection = 0;
          var row02 = panel01.add("group");
          row02.orientation = "row";
          row02.spacing = 5;
          var row02Label = row02.add(
            'statictext {text: "Centre to Control?", justify: "right"}',
          );
          row02Label.preferredSize.width = 100;
          var row02 = row02.add("checkbox", undefined);
          row02.preferredSize.width = 200;
          var buttonGroup = win.add("group");
          buttonGroup.alignChildren = ["right", "top"];
          buttonGroup.orientation = "row";
          buttonGroup.preferredSize.width = 340;
          var cancelButton = buttonGroup.add("button", undefined, "Cancel");
          var okayButton = buttonGroup.add("button", undefined, "Ok");
          okayButton.active = true;
          if (win.show() === 1) {
            var selectionIndex = row01Input.selection.index;
            var layer = cloneControlLayers[selectionIndex];
            var newSystem = { layer: layer, zeroClones: row02.value };
            return newSystem;
          } else {
            return false;
          }
        } else {
          return "No Layer Found";
        }
      }
      try {
        var newSystem = getCloneControlLayer();
      } catch (err) {
        alert(err);
      }
      var zeroPositionCheckbox = newSystem.zeroClones;
      var cloneControlLayer = newSystem.layer;
      if (newSystem === "No Layer Found") {
        alert(
          "No \'Easy Clones\' control layer was found in the current composition.",
        );
      } else if (newSystem !== false) {
        addClones(cloneControlLayer, zeroPositionCheckbox, trialMode);
      } else {
        if (newSystem === false) {
        }
      }
    } catch (err) {
      alert(err);
    }
    app.endUndoGroup();
  }
  function shuffleClones() {
    var comp = app.project.activeItem;
    if (comp == null || comp instanceof CompItem == false) {
      alert("Please select Clones tosShuffle their index order.");
    } else {
      var selectedLayer = comp.selectedLayers[0];
      if (selectedLayer == null) {
        alert("Please select Clones to shuffle their index order.");
      } else {
        randomIndex();
      }
    }
  }
  function scanEffectsFor(effectParade, search) {
    for (var i = 1; i <= effectParade.numProperties; i += 1) {
      if (effectParade.property(i).matchName === search) {
        return true;
      }
    }
    return false;
  }
  function randomIndex() {
    app.beginUndoGroup("Reorder Clones");
    var comp = app.project.activeItem;
    var layers = comp.selectedLayers;
    var numLayers = layers.length;
    for (var i = 0; i < numLayers; i += 1) {
      var myLayer = layers[i];
      var myLayerName = myLayer.name;
      var layerEffects = myLayer.property("ADBE Effect Parade");
      if (myLayerName.match(/\bClone-/g)) {
        if (scanEffectsFor(layerEffects, "Pseudo/cloneControls1.1")) {
          function shuffle(array) {
            var currentIndex = array.length;
            while (0 !== currentIndex) {
              randomIndex = Math.floor(Math.random() * currentIndex);
              currentIndex -= 1;
              temporaryValue = array[currentIndex];
              array[currentIndex] = array[randomIndex];
              array[randomIndex] = temporaryValue;
            }
            return array;
          }
          var comp = app.project.activeItem;
          var selectedLayers = comp.selectedLayers;
          var newOrder = shuffle(selectedLayers);
          for (var i = 1; i < selectedLayers.length; i += 1) {
            selectedLayers[i].moveBefore(comp.layer(newOrder[i - 1].index));
          }
        }
      } else {
        alert("Please only select Clone layers");
        break;
      }
    }
    app.endUndoGroup();
  }
  function renumberClones() {
    var comp = app.project.activeItem;
    if (comp == null || comp instanceof CompItem == false) {
      alert("Please select the Clones you wish to renumber.");
    } else {
      var selectedLayer = comp.selectedLayers[0];
      if (selectedLayer == null) {
        alert("Please select the Clones you wish to renumber.");
      } else {
        renameClones();
      }
    }
  }
  function scanEffectsFor(effectParade, search) {
    for (var i = 1; i <= effectParade.numProperties; i += 1) {
      if (effectParade.property(i).matchName === search) {
        return true;
      }
    }
    return false;
  }
  function renameClones() {
    app.beginUndoGroup("Reorder Clones");
    var comp = app.project.activeItem;
    var layers = comp.selectedLayers;
    var numLayers = layers.length;
    for (var i = 0; i < numLayers; i += 1) {
      var myLayer = layers[i];
      var myLayerName = myLayer.name;
      var layerEffects = myLayer.property("ADBE Effect Parade");
      if (myLayerName.match(/\bClone-/g)) {
        if (scanEffectsFor(layerEffects, "Pseudo/cloneControls1.1")) {
          var commentMatch = layers[i].comment;
          layers[i].name = commentMatch + " Clone-" + i + 1;
        }
      } else {
        alert("Please only select Clone layers");
        break;
      }
    }
    app.endUndoGroup();
  }
  function centreClones() {
    var comp = app.project.activeItem;
    if (comp == null || comp instanceof CompItem == false) {
      alert("Please select Clones to centre their position.");
    } else {
      var selectedLayer = comp.selectedLayers[0];
      if (selectedLayer == null) {
        alert("Please select Clones to centre their position.");
      } else {
        centreClonesPosition();
      }
    }
  }
  function scanEffectsFor(effectParade, search) {
    for (var i = 1; i <= effectParade.numProperties; i += 1) {
      if (effectParade.property(i).matchName === search) {
        return true;
      }
    }
    return false;
  }
  function centreClonesPosition() {
    app.beginUndoGroup("Centre Clones");
    var comp = app.project.activeItem;
    var layers = comp.selectedLayers;
    var numLayers = layers.length;
    for (var i = 0; i < numLayers; i += 1) {
      var myLayer = layers[i];
      var myLayerName = myLayer.name;
      var layerEffects = myLayer.property("ADBE Effect Parade");
      if (myLayerName.match(/\bClone-/g)) {
        if (scanEffectsFor(layerEffects, "Pseudo/cloneControls1.1")) {
          var commentMatch = layers[i].comment;
          if (myLayer.comment === commentMatch) {
            var time = comp.time;
            for (var i = 0; i < numLayers; i += 1) {
              if (layerEffects.numProperties > 0) {
                if (layerEffects.property(1).name === "Clone Controls") {
                  var selectedLayersPosition = layers[i].transform.position;
                }
                if (selectedLayersPosition.numKeys > 0) {
                  selectedLayersPosition.addKey(time);
                  selectedLayersPosition.setValueAtTime(time, [0, 0, 0]);
                } else {
                  selectedLayersPosition.setValue([0, 0, 0]);
                }
              }
            }
          }
        }
      } else {
        alert("Please only select Clone layers");
        break;
      }
    }
    app.endUndoGroup();
  }
  function applyCloneControlEffect(selectedLayer) {
    function makePseudoEffectAvailable(presetFile) {
      var myComp = app.project.activeItem;
      var layerCollection = myComp.selectedLayers;
      switchLayerSelection(layerCollection, false);
      var tempNull = myComp.layers.addNull();
      tempNull.selected = true;
      tempNull.applyPreset(presetFile);
      tempNull.remove();
      switchLayerSelection(layerCollection, true);
    }
    function switchLayerSelection(layerArray, selectionValue) {
      for (var i = 0, il = layerArray.length; i < il; i++) {
        layerArray[i].selected = selectionValue;
      }
    }
    function getAnimationPreset(presetName, presetLocation, presetBinary) {
      var presetFolder = Folder(presetLocation);
      var presetFile = File(presetFolder.toString() + "/" + presetName);
      if (!presetFolder.exists) {
        presetFolder = presetFolder.create();
      }
      if (!presetFile.exists) {
        presetFile.encoding = "BINARY";
        presetFile.open("w");
        presetFile.write(presetBinary);
        presetFile.close();
      }
      return presetFile;
    }
    if (!selectedLayer) {
      throw new Error(
        "applyPseudoEffect() method expects one parameter - Layer Object",
      );
    }
    var PseudoEffectMachName = "Pseudo/cloneControls1.1";
    var PseudoEffectName = "Clone Controls";
    var AnimationPresetName = "Clone Controls.ffx";
    var aescriptsFolder = Folder(
      Folder.userData.fsName + "/Aescripts/Easy Clones/1.0/",
    );
    aescriptsFolder.create();
    var AnimationPresetBinary = __BLOB__BLOB_000134__;
    if (
      selectedLayer.property("Effects").canAddProperty(PseudoEffectMachName) ===
      false
    ) {
      var presetFile = getAnimationPreset(
        AnimationPresetName,
        aescriptsFolder,
        AnimationPresetBinary,
      );
      makePseudoEffectAvailable(presetFile);
    }
    var myEffect = selectedLayer
      .property("Effects")
      .addProperty(PseudoEffectMachName);
    myEffect.name = "Clone Controls";
  }
  function delayExpression(trialMode) {
    var comp = app.project.activeItem;
    if (comp == null || comp instanceof CompItem == false) {
      alert(
        "Please select at least one layer property to add the Delay Expression.",
      );
      return;
    } else {
      var selectedLayer = comp.selectedLayers[0];
      if (selectedLayer == null) {
        alert(
          "Please select at least one layer property to add the Delay Expression.",
        );
        return;
      }
    }
    try {
      function getCloneSystem() {
        var comp = app.project.activeItem;
        var layers = comp.layers;
        var numLayers = layers.length;
        var systemMasters = [];
        for (var l = 1; l <= numLayers; l += 1) {
          var layer = layers[l];
          var effects = layer.property("ADBE Effect Parade");
          if (effects.numProperties > 0) {
            if (scanEffectsFor(effects, "Pseudo/easyClones1.1")) {
              var cloneSystemName = layer.name.replace("Clone Controls", "");
              var layerIndex = layer.index;
              systemMasters.push({ index: layerIndex, name: cloneSystemName });
            }
          }
        }
        if (systemMasters.length > 0) {
          var win = new Window("dialog", "Select An Existing Clone System");
          win.margins = 15;
          var content = win.add("group");
          content.orientation = "column";
          var row01 = content.add("group");
          row01.orientation = "row";
          row01.spacing = 5;
          var row01Label = row01.add(
            'statictext {text: "Clone System:", justify: "right"}',
          );
          row01Label.preferredSize.width = 100;
          var cloneSystemNames = [];
          var numCloneSystems = systemMasters.length;
          for (var s = 0; s < numCloneSystems; s += 1) {
            cloneSystemNames.push(systemMasters[s].name);
          }
          var row01Input = row01.add(
            "dropdownlist",
            undefined,
            cloneSystemNames,
          );
          row01Input.preferredSize.width = 200;
          row01Input.selection = 0;
          var buttonGroup = win.add("group");
          buttonGroup.alignChildren = ["right", "top"];
          buttonGroup.orientation = "row";
          buttonGroup.preferredSize.width = 340;
          var cancelButton = buttonGroup.add("button", undefined, "Cancel");
          var okayButton = buttonGroup.add("button", undefined, "Ok");
          okayButton.active = true;
          if (win.show() === 1) {
            return systemMasters[row01Input.selection.index];
          } else {
            return false;
          }
        } else {
          return "no system found";
        }
      }
      var cloneSystem = getCloneSystem();
      if (cloneSystem === "no system found") {
        alert("no system found in the current composition");
      } else if (cloneSystem !== false) {
        applyDelay(cloneSystem, trialMode);
      } else {
        if (cloneSystem === false) {
        }
      }
    } catch (err) {
      alert(err);
    }
  }
  function applyDelay(cloneSystem, trialMode) {
    app.beginUndoGroup("Add delay");
    var comp = app.project.activeItem;
    var layers = comp.selectedLayers;
    var numLayers = layers.length;
    var delayExpression = [
      'var frameDelay = effect("Clone Controls")(7) + thisComp.layer("' +
        cloneSystem.name +
        'Clone Controls").effect("Easy Clones")(2);',
      'var newIndex = parseInt(thisLayer.name.split("-").pop(), 10) - 1;',
      "var delay = frameDelay*framesToTime(newIndex);",
      "valueAtTime(time - delay)",
    ].join("\n");
    var delayTrialExpression = [
      "/*this is a trial version, purchase a license to unlock this feature.*/",
      "value",
    ].join("\n");
    for (var i = 0; i < numLayers; i += 1) {
      var myLayer = layers[i];
      var layerEffects = myLayer.property("ADBE Effect Parade");
      var layerProperties = myLayer.selectedProperties;
      if (layerProperties.length !== 0) {
        if (scanEffectsFor(layerEffects, "Pseudo/cloneControls1.1")) {
          for (var p = 0; p < layerProperties.length; p += 1) {
            if (trialMode == true) {
              layerProperties[p].expression = delayTrialExpression;
            } else {
              layerProperties[p].expression = delayExpression;
            }
          }
        } else {
          applyCloneControlEffect(myLayer);
          layers[i].comment = layers[i].name;
          layers[i].name = layers[i].name + " Clone-" + i + 1;
          for (var p = 0; p < layerProperties.length; p += 1) {
            if (trialMode == true) {
              layerProperties[p].expression = delayTrialExpression;
            } else {
              layerProperties[p].expression = delayExpression;
            }
          }
        }
      } else {
        alert("Please select a Layer Property to add the Delay Expression");
      }
    }
    app.endUndoGroup();
  }
  function scanEffectsFor(effectParade, search) {
    for (var i = 1; i <= effectParade.numProperties; i += 1) {
      if (effectParade.property(i).matchName === search) {
        return true;
      }
    }
    return false;
  }
  var easyClones_settings = {
    betaExpirationDate: new Date(""),
    betaStartDate: new Date(""),
    betaSupportEmail: "hola@mwmotion.tv",
    helpButtons: [
      {
        name: "Demo Series",
        url: "https://www.youtube.com/playlist?list=PLfla-R6TCGJ3dYtUyfjRErpVZg072bMOO",
      },
      { name: "MW Motion", url: "http://mwmotion.tv" },
    ],
    helpText:
      "Easy Clones is a cloning system built for 2d artwork including Bitmap Layers, Vector Shape Layers and Precomps.\n\nEasy Clones will create a Clone Control Layer that will control basic properties (Position, Scale, Rotation and Opacity) as well as more advanced features within the Easy Clones effect for all the Clone layers assigned to the system.\n\nFor more information on how the tool works please watch the demo series (Click Button below).",
    offerBeta: false,
    offerTrial: true,
    privateNumber: 7245256522480352,
    productSKU: "MWEC-SUL",
    scriptAuthor: "MW Motion",
    scriptName: "Easy Clones",
    scriptURL: "https://aescripts.com/easy-clones/",
    scriptVersion: "1.1",
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
          ? strSKU + t + "&message="
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
      var r = "Lic. fw v" + licensingVersion + isVT() ? " (Trial)" : "";
      return e
        ? File.encode(n) +
            "%0D%0A" +
            File.encode(t) +
            "%0D%0A" +
            File.encode(i) +
            "%0D%0A" +
            File.encode(r)
        : n + "\n" + t + "\n" + i + "\n" + r;
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
        i.grp.hdrGrp.hdr.text = strNewVersionAvailable.replace(
          /%v/,
          t.version + "\n" + strCurrentVersion.replace(/%v/, strScriptVersion),
        );
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
        if (null == (n = JSONify(n, "parse"))) {
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
              Folder.userData.fsName + "/Aescripts/aescripts_helper.vbs",
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
      var i =
        -1 != $.os.indexOf("Mac") &&
        (Folder("/Volumes/Private").exists || Folder("/Volumes/private").exists)
          ? Folder.userData.fsName
          : Folder.temp.fsName +
            "/" +
            Math.round(Math.random() * 42132 * new Date().getTime());
      if (-1 != $.os.indexOf("Win")) {
        t = wx;
        i += ".exe";
      } else {
        if (systemCall("arch").toLowerCase().match(/ppc/)) {
          return (alert(strPpcNotSupported), false);
        }
        t = mx;
      }
      var n = createFile(File(i), t, "BINARY");
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
      if ("" == t || "" == i) {
        return false;
      }
      switch (e.result) {
        case -20:
          e.e = t;
          break;
        case -21:
          e.e = i;
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
        (myLicense = false),
        e && ((regUI = licUI()), (myRegPrompt = regUI.show()), !myRegPrompt))
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
          myLicense = true;
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
              ? new File(e.fsName)
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
                i = !removeLic();
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
                  t =
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
                "" == (t = checkForLegacyLic()) &&
                  ((n = true),
                  (t =
                    isServerConfigured(licenseValidity) &&
                    isServerRunning(licenseValidity)
                      ? "@REMOTE"
                      : "trial"));
                i = checkCode(n, t, privateNum);
              }
            } else {
              haveSettings(prefsSectionName, prefsName)
                ? ((t = getSettings(prefsSectionName, prefsName)),
                  (n = !(
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
                    (n = false))
                  : (n = true);
              i = checkCode(n, t, privateNum);
            }
            return i;
          }
        }
      }
    }
    var licensingVersion = "3.0.42";
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
    var doUpdateCheck =
      !vars.hasOwnProperty("doUpdateCheck") || vars.doUpdateCheck;
    var updateCheckInterval = 5;
    var maxUIButtons = 3;
    var licV = 2;
    var wx = __BLOB__BLOB_000135__;
    var mx = __BLOB__BLOB_000136__;
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
  var easyClonesLicencing = new a(easyClones_settings);
  if (easyClonesLicencing.c()) {
    function easyClonesUI(trialMode, checkLicense) {
      function getUserDataFolder() {
        var userDataFolder = Folder.userData;
        var aescriptsFolder = Folder(
          userDataFolder.toString() + "/Aescripts/Easy Clones/",
        );
        if (!aescriptsFolder.exists) {
          var checkFolder = aescriptsFolder.create();
          if (!checkFolder) {
            alert("Error creating");
            aescriptsFolder = Folder.temp;
          }
        }
        return aescriptsFolder.toString();
      }
      function createResourceFile(filename, binaryString, resourceFolder) {
        var myFile = new File(resourceFolder + "/" + filename);
        if (!File(myFile).exists) {
          if (!isSecurityPrefSet()) {
            alert(
              "This script requires access to write files. Go to the General panel of the application preferences and make sure Allow Scripts to Write Files and Access Network is checked.",
            );
            try {
              app.executeCommand(2359);
            } catch (e) {
              alert(e);
            }
            if (!isSecurityPrefSet()) {
              return null;
            }
          }
          myFile.encoding = "BINARY";
          myFile.open("w");
          myFile.write(binaryString);
          myFile.close();
        }
        return myFile;
      }
      function isSecurityPrefSet() {
        try {
          var securitySetting = app.preferences.getPrefAsLong(
            "Main Pref Section",
            "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
          );
          return securitySetting == 1;
        } catch (e) {
          return (securitySetting = 1);
        }
      }
      var win =
        thisObj instanceof Panel
          ? thisObj
          : new Window("palette", "Easy Clones", undefined, {
              resizeable: true,
            });
      win.orientation = "row";
      var createClonesImage = __BLOB__BLOB_000137__;
      var createClonesBtn = win.add(
        "iconbutton",
        [5, 5, 40, 40],
        ScriptUI.newImage(
          createResourceFile(
            "createClonesImage.png",
            createClonesImage,
            getUserDataFolder(),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      createClonesBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        createClones(trialMode);
      };
      createClonesBtn.helpTip = "Click to create a Clone System.";
      var addClonesImage = __BLOB__BLOB_000138__;
      var addClonesBtn = win.add(
        "iconbutton",
        [40, 5, 75, 40],
        ScriptUI.newImage(
          createResourceFile(
            "addClonesImage.png",
            addClonesImage,
            getUserDataFolder(),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      addClonesBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        addClones(trialMode);
      };
      addClonesBtn.helpTip =
        "Click to add new Clones to an existing Clone System.";
      var renumberClonesImage = __BLOB__BLOB_000139__;
      var renumberClonesBtn = win.add(
        "iconbutton",
        [75, 5, 110, 40],
        ScriptUI.newImage(
          createResourceFile(
            "renumberClonesImage.png",
            renumberClonesImage,
            getUserDataFolder(),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      renumberClonesBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        renumberClones();
      };
      renumberClonesBtn.helpTip = "Click to renumber selected Clones.";
      var shuffleClonesImage = __BLOB__BLOB_000140__;
      var shuffleClonesBtn = win.add(
        "iconbutton",
        [110, 5, 145, 40],
        ScriptUI.newImage(
          createResourceFile(
            "shuffleClonesImage.png",
            shuffleClonesImage,
            getUserDataFolder(),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      shuffleClonesBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        shuffleClones();
      };
      shuffleClonesBtn.helpTip = "Click to shuffle selected Clone layer order.";
      var centreClonesImage = __BLOB__BLOB_000141__;
      var centreClonesBtn = win.add(
        "iconbutton",
        [145, 5, 180, 40],
        ScriptUI.newImage(
          createResourceFile(
            "centreClonesImage.png",
            centreClonesImage,
            getUserDataFolder(),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      centreClonesBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        centreClones();
      };
      centreClonesBtn.helpTip =
        "Click to centre Clones position to their controller.";
      var delayExpressionImage = __BLOB__BLOB_000142__;
      var delayExpressionBtn = win.add(
        "iconbutton",
        [180, 5, 215, 40],
        ScriptUI.newImage(
          createResourceFile(
            "delayExpressionImage.png",
            delayExpressionImage,
            getUserDataFolder(),
          ),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      delayExpressionBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        delayExpression(trialMode);
      };
      delayExpressionBtn.helpTip =
        "Click to add Delay Expressions to selected Properties.";
      var helpImage = __BLOB__BLOB_000143__;
      var helpBtn = win.add(
        "iconbutton",
        [215, 5, 250, 40],
        ScriptUI.newImage(
          createResourceFile("help.png", helpImage, getUserDataFolder()),
        ),
        { style: "toolbutton", toggle: 0 },
      );
      helpBtn.onClick = function () {
        checkLicense;
        isTrial = !checkLicense;
        easyClonesLicencing.helpUI();
      };
      helpBtn.helpTip = "Click for help.";
      if (win instanceof Window) {
        win.show();
      } else {
        win.layout.layout(true);
      }
    }
    function kBar(trialMode, checkLicense) {
      var kbarArgument = kbar.button.argument;
      switch (kbarArgument.toLowerCase()) {
        case "create clones":
          createClones(trialMode, "create clones");
          checkLicense;
          break;
        case "add clones":
          addClones(trialMode, "add clones");
          checkLicense;
          break;
        case "renumber clones":
          renumberClones("renumber clones");
          checkLicense;
          break;
        case "shuffle clones":
          shuffleClones("shuffle clones");
          checkLicense;
          break;
        case "centre clones":
          centreClones("centre clones");
          checkLicense;
          break;
        case "delay expression":
          delayExpression(trialMode, "delay expression");
          checkLicense;
          break;
        default:
          alert(
            "Easy Clones\nInvalid argument. Valid arguments are: \n\ncreate clones\nadd clones\nrenumber clones\nshuffle clones\ncentre clones\ndelay expression\n\nPlease check your KBar settings.",
          );
          break;
      }
    }
    var trialMode = easyClonesLicencing.t();
    var checkLicense = easyClonesLicencing.s();
    if (typeof kbar !== "undefined" && kbar.button) {
      kBar(trialMode, checkLicense);
    } else {
      easyClonesUI(trialMode, checkLicense);
    }
  }
}
MW_EasyClones(this);
