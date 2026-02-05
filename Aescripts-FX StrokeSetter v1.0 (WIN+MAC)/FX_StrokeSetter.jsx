/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

(function (thisObj) {
  function getCompLayers() {
    var maComp = app.project.activeItem;
    var calquesselectionnes = maComp.selectedLayers;
    return calquesselectionnes;
  }
  function isShapeLayer(leCalqueATester) {
    if (leCalqueATester instanceof ShapeLayer) {
      return true;
    } else {
      alert(
        "The " +
          leCalqueATester.name +
          " layer you have selected isn\'t a Shape layer !\nThis one will be ignored.",
      );
      return;
    }
  }
  function detect() {
    var touches = "";
    var etatDesTouchesSurLeClavier = ScriptUI.environment.keyboardState;
    if (etatDesTouchesSurLeClavier.shiftKey) {
      touches += "shift";
    }
    if (etatDesTouchesSurLeClavier.altKey) {
      touches += "alt";
    }
    return touches;
  }
  function isMac() {
    return $.os.toLowerCase().indexOf("mac") >= 0;
  }
  function openURL(url) {
    if (isMac()) {
      system.callSystem('open "' + url + '"');
    } else {
      system.callSystem('explorer "' + url + '"');
    }
  }
  function setCap(capStyle) {
    var compLayers = getCompLayers();
    var touches = detect();
    if (compLayers.length != 0) {
      for (var l = 0; l < compLayers.length; l += 1) {
        if (isShapeLayer(compLayers[l])) {
          var c = compLayers[l].property("ADBE Root Vectors Group");
          var n = c.numProperties;
          for (var i = 1; i <= n; i += 1) {
            var p = c.property(i);
            if (
              p.matchName == strokeMatchName ||
              p.matchName == gradientStrokeMatchName
            ) {
              p.property("ADBE Vector Stroke Line Cap").setValue(capStyle);
            } else {
              for (
                var j = 1;
                j <=
                compLayers[l]
                  .property("ADBE Root Vectors Group")
                  .property(i)
                  .property("ADBE Vectors Group").numProperties;
                j += 1
              ) {
                var p2 = compLayers[l]
                  .property("ADBE Root Vectors Group")
                  .property(i)
                  .property("ADBE Vectors Group")
                  .property(j);
                if (
                  p2.matchName == strokeMatchName ||
                  p2.matchName == gradientStrokeMatchName
                ) {
                  p2.property("ADBE Vector Stroke Line Cap").setValue(capStyle);
                } else {
                  continue;
                }
              }
            }
            continue;
          }
        }
      }
    } else {
      alert(emptySelMessage);
    }
  }
  function setJoin(joinStyle) {
    var compLayers = getCompLayers();
    var touches = detect();
    if (compLayers.length != 0) {
      for (var l = 0; l < compLayers.length; l += 1) {
        if (isShapeLayer(compLayers[l])) {
          var c = compLayers[l].property("ADBE Root Vectors Group");
          var n = c.numProperties;
          for (var i = 1; i <= n; i += 1) {
            var p = c.property(i);
            if (
              p.matchName == strokeMatchName ||
              p.matchName == gradientStrokeMatchName
            ) {
              p.property("ADBE Vector Stroke Line Join").setValue(joinStyle);
            } else {
              for (
                var j = 1;
                j <=
                compLayers[l]
                  .property("ADBE Root Vectors Group")
                  .property(i)
                  .property("ADBE Vectors Group").numProperties;
                j += 1
              ) {
                var p2 = compLayers[l]
                  .property("ADBE Root Vectors Group")
                  .property(i)
                  .property("ADBE Vectors Group")
                  .property(j);
                if (
                  p2.matchName == strokeMatchName ||
                  p2.matchName == gradientStrokeMatchName
                ) {
                  p2.property("ADBE Vector Stroke Line Join").setValue(
                    joinStyle,
                  );
                } else {
                  continue;
                }
              }
            }
            continue;
          }
        }
      }
    } else {
      alert(emptySelMessage);
    }
  }
  function setAlign(alignStyle) {
    var compLayers = getCompLayers();
    switch (alignStyle) {
      case 1:
        multWidth = 0;
        break;
      case 2:
        multWidth = -1;
        break;
      case 3:
        multWidth = 1;
        break;
      default:
        multWidth = 0;
    }
    var touches = detect();
    if (compLayers.length != 0) {
      for (var l = 0; l < compLayers.length; l += 1) {
        if (isShapeLayer(compLayers[l])) {
          var c = compLayers[l].property("ADBE Root Vectors Group");
          var n = c.numProperties;
          for (var i = 1; i <= n; i += 1) {
            var p = c.property(i);
            if (
              p.matchName == strokeMatchName ||
              p.matchName == gradientStrokeMatchName
            ) {
              try {
                var myOffset = c.property("FX StrokeOffset");
              } catch (err) {}
              var w = p.property("ADBE Vector Stroke Width").value;
              if (c.property("FX StrokeOffset") == null) {
                myOffset = c.addProperty("ADBE Vector Filter - Offset");
                myOffset.name = "FX StrokeOffset";
                myOffset
                  .property("ADBE Vector Offset Amount")
                  .setValue((w / 2) * multWidth);
              }
              myOffset
                .property("ADBE Vector Offset Amount")
                .setValue((w / 2) * multWidth);
            } else {
              try {
                for (
                  var j = 1;
                  j <=
                  compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group").numProperties;
                  j += 1
                ) {
                  var p2 = compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group")
                    .property(j);
                  if (
                    p2.matchName == strokeMatchName ||
                    p2.matchName == gradientStrokeMatchName
                  ) {
                    try {
                      var myOffset2 = p2
                        .propertyGroup(1)
                        .property("FX StrokeOffset");
                    } catch (err) {}
                    if (
                      p2.propertyGroup(1).property("FX StrokeOffset") == null
                    ) {
                      myOffset2 = p2
                        .propertyGroup(1)
                        .addProperty("ADBE Vector Filter - Offset");
                    }
                    var w2 = compLayers[l]
                      .property("ADBE Root Vectors Group")
                      .property(i)
                      .property("ADBE Vectors Group")
                      .property(j)
                      .property("ADBE Vector Stroke Width").value;
                    myOffset2.name = "FX StrokeOffset";
                    myOffset2
                      .property("ADBE Vector Offset Amount")
                      .setValue((w2 / 2) * multWidth);
                  } else {
                    continue;
                  }
                }
              } catch (err) {
                continue;
              }
            }
            continue;
          }
        }
      }
    } else {
      alert(emptySelMessage);
    }
  }
  function setTaper(taperStyle) {
    var compLayers = getCompLayers();
    var touches = detect();
    switch (taperStyle) {
      case 1:
        myStartTaperPerct = 100;
        myEndTaperPerct = 0;
        break;
      case 2:
        myStartTaperPerct = 0;
        myEndTaperPerct = 100;
        break;
      default:
        myStartTaperPerct = 0;
        myEndTaperPerct = 0;
    }
    if (compLayers.length != 0) {
      if (touches.indexOf("shiftalt") != -1) {
        if (
          app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") == null
        ) {
          var myCTRLNull = app.project.activeItem.layers.addNull();
          myCTRLNull.name = "FX_StrokeSetter CTRL";
        } else {
          var myCTRLNull = app.project.activeItem.layer("FX_StrokeSetter CTRL");
        }
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Taper Start Length") == null
        ) {
          var nullCTRL = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL.name = "Taper Start Length";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Taper Start Length")
          .property(1)
          .setValue(myStartTaperPerct);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Taper End Length") == null
        ) {
          var nullCTRL2 = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL2.name = "Taper End Length";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Taper End Length")
          .property(1)
          .setValue(myEndTaperPerct);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Taper Start Radius") == null
        ) {
          var nullCTRL3 = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL3.name = "Taper Start Radius";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Taper Start Radius")
          .property(1)
          .setValue(0);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Taper End Radius") == null
        ) {
          var nullCTRL4 = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL4.name = "Taper End Radius";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Taper End Radius")
          .property(1)
          .setValue(0);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Taper Start Ease") == null
        ) {
          var nullCTRL5 = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL5.name = "Taper Start Ease";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Taper Start Ease")
          .property(1)
          .setValue(0);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Taper End Ease") == null
        ) {
          var nullCTRL6 = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL6.name = "Taper End Ease";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Taper End Ease")
          .property(1)
          .setValue(0);
      }
      for (var l = 0; l < compLayers.length; l += 1) {
        if (isShapeLayer(compLayers[l])) {
          var myExpr = "";
          var myExpr2 = "";
          var myExpr3 = "";
          var myExpr4 = "";
          var myExpr5 = "";
          var myExpr6 = "";
          if (touches.indexOf("alt") != -1) {
            if (compLayers[l].effect.property("Taper Start Length") == null) {
              var myCTRL = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL.name = "Taper Start Length";
            }
            compLayers[l].effect
              .property("Taper Start Length")
              .property(1)
              .setValue(myStartTaperPerct);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Taper Start Length") != null
            ) {
              compLayers[l].effect
                .property("Taper Start Length")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Taper Start Length\')(1)";
            }
            myExpr = "effect(\'Taper Start Length\')(1)";
            if (compLayers[l].effect.property("Taper End Length") == null) {
              var myCTRL2 = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL2.name = "Taper End Length";
            }
            compLayers[l].effect
              .property("Taper End Length")
              .property(1)
              .setValue(myEndTaperPerct);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Taper End Length") != null
            ) {
              compLayers[l].effect
                .property("Taper End Length")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Taper End Length\')(1)";
            }
            myExpr2 = "effect(\'Taper End Length\')(1)";
            if (compLayers[l].effect.property("Taper Start Radius") == null) {
              var myCTRL3 = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL3.name = "Taper Start Radius";
            }
            compLayers[l].effect
              .property("Taper Start Radius")
              .property(1)
              .setValue(0);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Taper Start Radius") != null
            ) {
              compLayers[l].effect
                .property("Taper Start Radius")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Taper Start Radius\')(1)";
            }
            myExpr3 = "effect(\'Taper Start Radius\')(1)";
            if (compLayers[l].effect.property("Taper End Radius") == null) {
              var myCTRL4 = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL4.name = "Taper End Radius";
            }
            compLayers[l].effect
              .property("Taper End Radius")
              .property(1)
              .setValue(0);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Taper End Radius") != null
            ) {
              compLayers[l].effect
                .property("Taper End Radius")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Taper End Radius\')(1)";
            }
            myExpr4 = "effect(\'Taper End Radius\')(1)";
            if (compLayers[l].effect.property("Taper Start Ease") == null) {
              var myCTRL5 = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL5.name = "Taper Start Ease";
            }
            compLayers[l].effect
              .property("Taper Start Ease")
              .property(1)
              .setValue(0);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Taper Start Ease") != null
            ) {
              compLayers[l].effect
                .property("Taper Start Ease")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Taper Start Ease\')(1)";
            }
            myExpr5 = "effect(\'Taper Start Ease\')(1)";
            if (compLayers[l].effect.property("Taper End Ease") == null) {
              var myCTRL6 = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL6.name = "Taper End Ease";
            }
            compLayers[l].effect
              .property("Taper End Ease")
              .property(1)
              .setValue(0);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Taper End Ease") != null
            ) {
              compLayers[l].effect
                .property("Taper End Ease")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Taper End Ease\')(1)";
            }
            myExpr6 = "effect(\'Taper End Ease\')(1)";
          }
          var c = compLayers[l].property("ADBE Root Vectors Group");
          var n = c.numProperties;
          for (var i = 1; i <= n; i += 1) {
            var p = c.property(i);
            if (
              p.matchName == strokeMatchName ||
              p.matchName == gradientStrokeMatchName
            ) {
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Length")
                .setValue(myStartTaperPerct);
              p
                .property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Length").expression = myExpr;
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Length")
                .setValue(myEndTaperPerct);
              p
                .property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Length").expression = myExpr2;
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Width")
                .setValue(0);
              p
                .property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Width").expression = myExpr3;
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Width")
                .setValue(0);
              p
                .property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Width").expression = myExpr4;
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Ease")
                .setValue(0);
              p
                .property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Ease").expression = myExpr5;
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Ease")
                .setValue(0);
              p
                .property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Ease").expression = myExpr6;
            } else {
              try {
                for (
                  var j = 1;
                  j <=
                  compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group").numProperties;
                  j += 1
                ) {
                  var p2 = compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group")
                    .property(j);
                  if (
                    p2.matchName == strokeMatchName ||
                    p2.matchName == gradientStrokeMatchName
                  ) {
                    p2.property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Length")
                      .setValue(myStartTaperPerct);
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Length").expression =
                      myExpr;
                    p2.property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Length")
                      .setValue(myEndTaperPerct);
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Length").expression =
                      myExpr2;
                    p2.property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Width")
                      .setValue(0);
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Width").expression =
                      myExpr3;
                    p2.property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Width")
                      .setValue(0);
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Width").expression =
                      myExpr4;
                    p2.property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Ease")
                      .setValue(0);
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Ease").expression =
                      myExpr5;
                    p2.property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Ease")
                      .setValue(0);
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Ease").expression =
                      myExpr6;
                  } else {
                    continue;
                  }
                }
              } catch (err) {
                continue;
              }
            }
            continue;
          }
        }
      }
    } else {
      alert(emptySelMessage);
    }
  }
  function setWave() {
    var compLayers = getCompLayers();
    var touches = detect();
    if (compLayers.length != 0) {
      if (touches.indexOf("shiftalt") != -1) {
        if (
          app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") == null
        ) {
          var myCTRLNull = app.project.activeItem.layers.addNull();
          myCTRLNull.name = "FX_StrokeSetter CTRL";
        } else {
          var myCTRLNull = app.project.activeItem.layer("FX_StrokeSetter CTRL");
        }
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Wave Amount") == null
        ) {
          var nullCTRL = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL.name = "Wave Amount";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Wave Amount")
          .property(1)
          .setValue(75);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Wave Length") == null
        ) {
          var nullCTRL2 = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL2.name = "Wave Length";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Wave Length")
          .property(1)
          .setValue(100);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Wave Phase") == null
        ) {
          var nullCTRL3 = myCTRLNull.Effects.addProperty("ADBE Angle Control");
          nullCTRL3.name = "Wave Phase";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Wave Phase")
          .property(1)
          .setValue(0);
      }
      for (var l = 0; l < compLayers.length; l += 1) {
        if (isShapeLayer(compLayers[l])) {
          var myExpr = "";
          var myExpr2 = "";
          var myExpr3 = "";
          if (touches.indexOf("alt") != -1) {
            if (compLayers[l].effect.property("Wave Amount") == null) {
              var myCTRL = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL.name = "Wave Amount";
            }
            compLayers[l].effect
              .property("Wave Amount")
              .property(1)
              .setValue(75);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Wave Amount") != null
            ) {
              compLayers[l].effect
                .property("Wave Amount")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Wave Amount\')(1)";
            }
            myExpr = "effect(\'Wave Amount\')(1)";
            if (compLayers[l].effect.property("Wave Length") == null) {
              var myCTRL2 = compLayers[l].Effects.addProperty(
                "ADBE Slider Control",
              );
              myCTRL2.name = "Wave Length";
            }
            compLayers[l].effect
              .property("Wave Length")
              .property(1)
              .setValue(100);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Wave Length") != null
            ) {
              compLayers[l].effect
                .property("Wave Length")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Wave Length\')(1)";
            }
            myExpr2 = "effect(\'Wave Length\')(1)";
            if (compLayers[l].effect.property("Wave Phase") == null) {
              var myCTRL3 =
                compLayers[l].Effects.addProperty("ADBE Angle Control");
              myCTRL3.name = "Wave Phase";
            }
            compLayers[l].effect.property("Wave Phase").property(1).setValue(0);
            if (
              app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                null &&
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property("Wave Phase") != null
            ) {
              compLayers[l].effect
                .property("Wave Phase")
                .property(1).expression =
                "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Wave Phase\')(1)";
            }
            myExpr3 = "effect(\'Wave Phase\')(1)";
          }
          var c = compLayers[l].property("ADBE Root Vectors Group");
          var n = c.numProperties;
          for (var i = 1; i <= n; i += 1) {
            var p = c.property(i);
            if (
              p.matchName == strokeMatchName ||
              p.matchName == gradientStrokeMatchName
            ) {
              p.property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wave Amount")
                .setValue(75);
              p
                .property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wave Amount").expression = myExpr;
              p.property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wavelength")
                .setValue(100);
              p
                .property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wavelength").expression = myExpr2;
              p.property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wave Phase")
                .setValue(0);
              p
                .property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wave Phase").expression = myExpr3;
            } else {
              try {
                for (
                  var j = 1;
                  j <=
                  compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group").numProperties;
                  j += 1
                ) {
                  var p2 = compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group")
                    .property(j);
                  if (
                    p2.matchName == strokeMatchName ||
                    p2.matchName == gradientStrokeMatchName
                  ) {
                    p2.property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wave Amount")
                      .setValue(75);
                    p2
                      .property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wave Amount").expression =
                      myExpr;
                    p2.property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wavelength")
                      .setValue(100);
                    p2
                      .property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wavelength").expression =
                      myExpr2;
                    p2.property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wave Phase")
                      .setValue(0);
                    p2
                      .property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wave Phase").expression =
                      myExpr3;
                  } else {
                    continue;
                  }
                }
              } catch (err) {
                continue;
              }
            }
            continue;
          }
        }
      }
    } else {
      alert(emptySelMessage);
    }
  }
  function setDashes() {
    var compLayers = getCompLayers();
    var touches = detect();
    var dashArray = ["Dash 1", "Gap 1", "Dash 2", "Gap 2", "Dash 3", "Gap 3"];
    var myExprArr = ["", "", "", "", "", "", ""];
    if (compLayers.length != 0) {
      function add_row(maingroup) {
        var group = maingroup.add("group");
        if (maingroup.children.length % 2 == 0) {
          var leftTag = "Gap ";
        } else {
          var leftTag = "Dash ";
        }
        group.static = group.add(
          "statictext",
          ["", "", 50, 32],
          leftTag + Math.round(maingroup.children.length / 2),
        );
        group.edit = group.add("edittext", ["", "", 50, 32], "20");
        group.plus = group.add("button", undefined, "+");
        group.plus.preferredSize = [32, 32];
        group.plus.onClick = add_btn;
        if (maingroup.children.length == 6) {
          group.plus.enabled = false;
        }
        group.minus = group.add("button", undefined, "-");
        group.minus.preferredSize = [32, 32];
        group.minus.onClick = minus_btn;
        group.index = maingroup.children.length - 1;
        win.layout.layout(true);
      }
      function add_btn() {
        if (maingroup.children.length < 6) {
          add_row(maingroup);
        } else {
          alert(
            "You can\'t add more 3 Dash/Gap pairs due to After Effects\' internal limitations!",
          );
        }
      }
      function minus_btn() {
        if (maingroup.children.length <= 1) {
          alert(
            "You can\'t remove a single line !\nIf you don\'t want any dashes on your strokes, just hit ESCAPE on the keyboard to leave this panel!",
          );
        } else {
          if (this.parent.index == maingroup.children.length - 1) {
            maingroup.remove(this.parent);
          } else {
            alert(
              "You can only remove the last item because it\'s the way the [-] button works natively in After Effects\' Dashes module!",
            );
          }
          win.layout.layout(true);
        }
      }
      var win = new Window("dialog");
      var maingroup = win.add("panel {orientation: \'column\'}");
      add_row(maingroup);
      maingroup.children[0].minus.enabled = false;
      var create_btn = win.add(
        "button",
        undefined,
        "Set Dashes on Selected Shape Layers",
      );
      win.layout.layout(true);
      create_btn.onClick = function () {
        if (touches.indexOf("shiftalt") != -1) {
          if (
            app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") == null
          ) {
            var myCTRLNull = app.project.activeItem.layers.addNull();
            myCTRLNull.name = "FX_StrokeSetter CTRL";
          } else {
            var myCTRLNull = app.project.activeItem.layer(
              "FX_StrokeSetter CTRL",
            );
          }
          for (var f = 0; f < maingroup.children.length; f += 1) {
            var myTextSource = maingroup.children[f].edit.text;
            if (
              app.project.activeItem
                .layer("FX_StrokeSetter CTRL")
                .effect.property(dashArray[f]) == null
            ) {
              var nullCTRL = myCTRLNull.Effects.addProperty(
                "ADBE Slider Control",
              );
              nullCTRL.name = dashArray[f];
            }
            app.project.activeItem
              .layer("FX_StrokeSetter CTRL")
              .effect.property(dashArray[f])
              .property(1)
              .setValue(myTextSource);
          }
          if (
            app.project.activeItem
              .layer("FX_StrokeSetter CTRL")
              .effect.property("Dashes Offset") == null
          ) {
            var myNullCTRL6 = myCTRLNull.Effects.addProperty(
              "ADBE Slider Control",
            );
            myNullCTRL6.name = "Dashes Offset";
          }
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Dashes Offset")
            .property(1)
            .setValue(0);
        }
        for (var l = 0; l < compLayers.length; l += 1) {
          if (isShapeLayer(compLayers[l])) {
            if (touches.indexOf("alt") != -1) {
              for (var q = 0; q < maingroup.children.length; q += 1) {
                var myTextSource = maingroup.children[q].edit.text;
                if (compLayers[l].effect.property(dashArray[q]) == null) {
                  var myCTRL = compLayers[l].Effects.addProperty(
                    "ADBE Slider Control",
                  );
                  myCTRL.name = dashArray[q];
                }
                compLayers[l].effect
                  .property(dashArray[q])
                  .property(1)
                  .setValue(myTextSource);
                if (
                  app.project.activeItem.layers.byName(
                    "FX_StrokeSetter CTRL",
                  ) != null &&
                  app.project.activeItem
                    .layer("FX_StrokeSetter CTRL")
                    .effect.property(dashArray[q]) != null
                ) {
                  compLayers[l].effect
                    .property(dashArray[q])
                    .property(1).expression =
                    "N=thisProperty.propertyGroup(1).name; thisComp.layer(\'FX_StrokeSetter CTRL\').effect(N)(1)";
                }
                myExprArr[q] = "effect(\'" + dashArray[q] + "\')(1)";
              }
              if (compLayers[l].effect.property("Dashes Offset") == null) {
                var myCTRL6 = compLayers[l].Effects.addProperty(
                  "ADBE Slider Control",
                );
                myCTRL6.name = "Dashes Offset";
              }
              compLayers[l].effect
                .property("Dashes Offset")
                .property(1)
                .setValue(0);
              if (
                app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
                  null &&
                app.project.activeItem
                  .layer("FX_StrokeSetter CTRL")
                  .effect.property("Dashes Offset") != null
              ) {
                compLayers[l].effect
                  .property("Dashes Offset")
                  .property(1).expression =
                  "N=thisProperty.propertyGroup(1).name; thisComp.layer(\'FX_StrokeSetter CTRL\').effect(N)(1)";
              }
              myExprArr[6] = "effect(\'Dashes Offset\')(1)";
            }
            var c = compLayers[l].property("ADBE Root Vectors Group");
            var N = c.numProperties;
            for (var i = 1; i <= N; i += 1) {
              var p = c.property(i);
              if (
                p.matchName == strokeMatchName ||
                p.matchName == gradientStrokeMatchName
              ) {
                for (var n = 0; n < maingroup.children.length; n += 1) {
                  var myTextSource = maingroup.children[n].edit.text;
                  var myDash = p
                    .property("ADBE Vector Stroke Dashes")
                    .addProperty("ADBE Vector Stroke " + dashArray[n]);
                  myDash.setValue(myTextSource);
                  myDash.expression = myExprArr[n];
                }
                var myDashOffset = p
                  .property("ADBE Vector Stroke Dashes")
                  .addProperty("ADBE Vector Stroke Offset");
                myDashOffset.setValue(0);
                myDashOffset.expression = myExprArr[6];
              } else {
                try {
                  for (
                    var j = 1;
                    j <=
                    compLayers[l]
                      .property("ADBE Root Vectors Group")
                      .property(i)
                      .property("ADBE Vectors Group").numProperties;
                    j += 1
                  ) {
                    var p2 = compLayers[l]
                      .property("ADBE Root Vectors Group")
                      .property(i)
                      .property("ADBE Vectors Group")
                      .property(j);
                    if (
                      p2.matchName == strokeMatchName ||
                      p2.matchName == gradientStrokeMatchName
                    ) {
                      for (var n = 0; n < maingroup.children.length; n += 1) {
                        var myTextSource = maingroup.children[n].edit.text;
                        var myDash = p2
                          .property("ADBE Vector Stroke Dashes")
                          .addProperty("ADBE Vector Stroke " + dashArray[n]);
                        myDash.setValue(myTextSource);
                        myDash.expression = myExprArr[n];
                      }
                      var myDashOffset = p2
                        .property("ADBE Vector Stroke Dashes")
                        .addProperty("ADBE Vector Stroke Offset");
                      myDashOffset.setValue(0);
                      myDashOffset.expression = myExprArr[6];
                    } else {
                      continue;
                    }
                  }
                } catch (err) {
                  continue;
                }
              }
              continue;
            }
          }
          continue;
        }
        win.close();
      };
      win.show();
    } else {
      alert(emptySelMessage);
    }
  }
  function setStroke(isShiftClicked) {
    var compLayers = getCompLayers();
    if (compLayers.length != 0) {
      if (isShiftClicked) {
        if (
          app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") == null
        ) {
          var myCTRLNull = app.project.activeItem.layers.addNull();
          myCTRLNull.name = "FX_StrokeSetter CTRL";
        } else {
          var myCTRLNull = app.project.activeItem.layer("FX_StrokeSetter CTRL");
        }
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Stroke Width") == null
        ) {
          var nullCTRL = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL.name = "Stroke Width";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Stroke Width")
          .property(1)
          .setValue(32);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Non Rescaling Stroke Width") == null
        ) {
          var nullCTRL2 = myCTRLNull.Effects.addProperty(
            "ADBE Checkbox Control",
          );
          nullCTRL2.name = "Non Rescaling Stroke Width";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Non Rescaling Stroke Width")
          .property(1)
          .setValue(0);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Stroke Color") == null
        ) {
          var nullCTRL3 = myCTRLNull.Effects.addProperty("ADBE Color Control");
          nullCTRL3.name = "Stroke Color";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Stroke Color")
          .property(1)
          .setValue([1, 0, 0, 1]);
        if (
          app.project.activeItem
            .layer("FX_StrokeSetter CTRL")
            .effect.property("Stroke Opacity") == null
        ) {
          var nullCTRL4 = myCTRLNull.Effects.addProperty("ADBE Slider Control");
          nullCTRL4.name = "Stroke Opacity";
        }
        app.project.activeItem
          .layer("FX_StrokeSetter CTRL")
          .effect.property("Stroke Opacity")
          .property(1)
          .setValue(100);
      }
      for (var l = 0; l < compLayers.length; l += 1) {
        if (isShapeLayer(compLayers[l])) {
          var myExpr = "";
          var myExpr3 = "";
          var myExpr4 = "";
          var fixedWidthExpression = [
            "if(effect(\'Non Rescaling Stroke Width\')(1)==1){",
            "",
            "if (hasParent) {",
            "\tscl = thisLayer.parent.scale[0]/100;",
            "\tif (scl == 0){",
            "\t\tsv = 1",
            "\t}else{",
            "\tsv = scl; effect(\'Stroke Width\')(1) / sv",
            "\t}",
            "}else{",
            "\tscl = thisLayer.scale[0]/100;",
            "\tif (scl == 0){",
            "\t\tsv = 1",
            "\t}else{",
            "\tsv = scl; effect(\'Stroke Width\')(1) / sv",
            "\t}",
            "}",
            "\t",
            "}else{",
            "effect(\'Stroke Width\')(1)",
            "\t}",
          ].join("\n");
          if (compLayers[l].effect.property("Stroke Width") == null) {
            var myCTRL = compLayers[l].Effects.addProperty(
              "ADBE Slider Control",
            );
            myCTRL.name = "Stroke Width";
          }
          compLayers[l].effect
            .property("Stroke Width")
            .property(1)
            .setValue(32);
          if (
            app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
              null &&
            app.project.activeItem
              .layer("FX_StrokeSetter CTRL")
              .effect.property("Stroke Width") != null
          ) {
            compLayers[l].effect
              .property("Stroke Width")
              .property(1).expression =
              "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Stroke Width\')(1)";
          }
          myExpr = fixedWidthExpression;
          if (
            compLayers[l].effect.property("Non Rescaling Stroke Width") == null
          ) {
            var myCTRL2 = compLayers[l].Effects.addProperty(
              "ADBE Checkbox Control",
            );
            myCTRL2.name = "Non Rescaling Stroke Width";
          }
          compLayers[l].effect
            .property("Non Rescaling Stroke Width")
            .property(1)
            .setValue(0);
          if (
            app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
              null &&
            app.project.activeItem
              .layer("FX_StrokeSetter CTRL")
              .effect.property("Non Rescaling Stroke Width") != null
          ) {
            compLayers[l].effect
              .property("Non Rescaling Stroke Width")
              .property(1).expression =
              "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Non Rescaling Stroke Width\')(1)";
          }
          if (compLayers[l].effect.property("Stroke Color") == null) {
            var myCTRL3 =
              compLayers[l].Effects.addProperty("ADBE Color Control");
            myCTRL3.name = "Stroke Color";
          }
          compLayers[l].effect
            .property("Stroke Color")
            .property(1)
            .setValue([1, 0, 0, 1]);
          if (
            app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
              null &&
            app.project.activeItem
              .layer("FX_StrokeSetter CTRL")
              .effect.property("Stroke Color") != null
          ) {
            compLayers[l].effect
              .property("Stroke Color")
              .property(1).expression =
              "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Stroke Color\')(1)";
          }
          myExpr3 = "effect(\'Stroke Color\')(1)";
          if (compLayers[l].effect.property("Stroke Opacity") == null) {
            var myCTRL = compLayers[l].Effects.addProperty(
              "ADBE Slider Control",
            );
            myCTRL.name = "Stroke Opacity";
          }
          compLayers[l].effect
            .property("Stroke Opacity")
            .property(1)
            .setValue(100);
          if (
            app.project.activeItem.layers.byName("FX_StrokeSetter CTRL") !=
              null &&
            app.project.activeItem
              .layer("FX_StrokeSetter CTRL")
              .effect.property("Stroke Opacity") != null
          ) {
            compLayers[l].effect
              .property("Stroke Opacity")
              .property(1).expression =
              "thisComp.layer(\'FX_StrokeSetter CTRL\').effect(\'Stroke Opacity\')(1)";
          }
          myExpr4 = "effect(\'Stroke Opacity\')(1)";
          var c = compLayers[l].property("ADBE Root Vectors Group");
          var n = c.numProperties;
          for (var i = 1; i <= n; i += 1) {
            var p = c.property(i);
            if (
              p.matchName == strokeMatchName ||
              p.matchName == gradientStrokeMatchName
            ) {
              p.property("ADBE Vector Stroke Width").setValue(32);
              p.property("ADBE Vector Stroke Width").expression = myExpr;
              p.property("ADBE Vector Stroke Color").setValue([1, 0, 0, 1]);
              p.property("ADBE Vector Stroke Color").expression = myExpr3;
              p.property("ADBE Vector Stroke Opacity").setValue(100);
              p.property("ADBE Vector Stroke Opacity").expression = myExpr4;
            } else {
              try {
                for (
                  var j = 1;
                  j <=
                  compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group").numProperties;
                  j += 1
                ) {
                  var p2 = compLayers[l]
                    .property("ADBE Root Vectors Group")
                    .property(i)
                    .property("ADBE Vectors Group")
                    .property(j);
                  if (
                    p2.matchName == strokeMatchName ||
                    p2.matchName == gradientStrokeMatchName
                  ) {
                    p2.property("ADBE Vector Stroke Width").setValue(32);
                    p2.property("ADBE Vector Stroke Width").expression = myExpr;
                    p2.property("ADBE Vector Stroke Color").setValue([
                      1, 0, 0, 1,
                    ]);
                    p2.property("ADBE Vector Stroke Color").expression =
                      myExpr3;
                    p2.property("ADBE Vector Stroke Opacity").setValue(100);
                    p2.property("ADBE Vector Stroke Opacity").expression =
                      myExpr4;
                  } else {
                    continue;
                  }
                }
              } catch (err) {
                continue;
              }
            }
            continue;
          }
        }
      }
    } else {
      alert(emptySelMessage);
    }
  }
  function resetStroke(isShiftClicked) {
    var compLayers = getCompLayers();
    var touches = detect();
    if (compLayers.length != 0) {
      if (isShiftClicked) {
        if (
          confirm(
            "You are about to delete all the expressions dependencies, including the \'FX_StrokeSetter CTRL\' layer, which could cause some problems if, for example, you had not selected all the active comp\'s Shape Layers before clicking this button, or, if you had promoted some Effects of this \'FX_StrokeSetter CTRL\' layer as Master Properties.\nDo you still want to do that?",
          )
        ) {
          hardMode = true;
        } else {
          hardMode = false;
        }
      }
      for (var l = 0; l < compLayers.length; l += 1) {
        if (isShapeLayer(compLayers[l])) {
          var c = compLayers[l].property("ADBE Root Vectors Group");
          var n = c.numProperties;
          for (var i = 1; i <= n; i += 1) {
            var p = c.property(i);
            if (
              p.matchName == strokeMatchName ||
              p.matchName == gradientStrokeMatchName
            ) {
              for (var z = 7; z > 0; z += -1) {
                try {
                  p.property("ADBE Vector Stroke Dashes").property(z).remove();
                } catch (err) {
                  continue;
                }
              }
              if (hardMode) {
                p
                  .property("ADBE Vector Stroke Taper")
                  .property("ADBE Vector Taper Start Length").expression = "";
                p
                  .property("ADBE Vector Stroke Taper")
                  .property("ADBE Vector Taper End Length").expression = "";
                p
                  .property("ADBE Vector Stroke Taper")
                  .property("ADBE Vector Taper Start Width").expression = "";
                p
                  .property("ADBE Vector Stroke Taper")
                  .property("ADBE Vector Taper End Width").expression = "";
                p
                  .property("ADBE Vector Stroke Taper")
                  .property("ADBE Vector Taper Start Ease").expression = "";
                p
                  .property("ADBE Vector Stroke Taper")
                  .property("ADBE Vector Taper End Ease").expression = "";
                p
                  .property("ADBE Vector Stroke Wave")
                  .property("ADBE Vector Taper Wave Amount").expression = "";
                p
                  .property("ADBE Vector Stroke Wave")
                  .property("ADBE Vector Taper Wavelength").expression = "";
                p
                  .property("ADBE Vector Stroke Wave")
                  .property("ADBE Vector Taper Wave Phase").expression = "";
                p.property("ADBE Vector Stroke Width").expression = "";
                p.property("ADBE Vector Stroke Color").expression = "";
                p.property("ADBE Vector Stroke Opacity").expression = "";
                try {
                  compLayers[l].effect.property("Taper Start Length").remove();
                  compLayers[l].effect.property("Taper End Length").remove();
                  compLayers[l].effect.property("Taper Start Radius").remove();
                  compLayers[l].effect.property("Taper End Radius").remove();
                  compLayers[l].effect.property("Taper Start Ease").remove();
                  compLayers[l].effect.property("Taper End Ease").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Wave Amount").remove();
                  compLayers[l].effect.property("Wave Length").remove();
                  compLayers[l].effect.property("Wave Phase").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Stroke Width").remove();
                  compLayers[l].effect
                    .property("Non Rescaling Stroke Width")
                    .remove();
                  compLayers[l].effect.property("Stroke Color").remove();
                  compLayers[l].effect.property("Stroke Opacity").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Dash 1").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Gap 1").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Dash 2").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Gap 2").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Dash 3").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Gap 3").remove();
                } catch (err) {}
                try {
                  compLayers[l].effect.property("Dashes Offset").remove();
                } catch (err) {}
              }
              try {
                compLayers[l].effect
                  .property("Taper Start Length")
                  .property(1)
                  .setValue(0);
                compLayers[l].effect
                  .property("Taper End Length")
                  .property(1)
                  .setValue(0);
                compLayers[l].effect
                  .property("Taper Start Radius")
                  .property(1)
                  .setValue(0);
                compLayers[l].effect
                  .property("Taper End Radius")
                  .property(1)
                  .setValue(0);
                compLayers[l].effect
                  .property("Taper Start Ease")
                  .property(1)
                  .setValue(0);
                compLayers[l].effect
                  .property("Taper End Ease")
                  .property(1)
                  .setValue(0);
              } catch (err) {}
              try {
                compLayers[l].effect
                  .property("Wave Amount")
                  .property(1)
                  .setValue(0);
                compLayers[l].effect
                  .property("Wave Length")
                  .property(1)
                  .setValue(0);
                compLayers[l].effect
                  .property("Wave Phase")
                  .property(1)
                  .setValue(0);
              } catch (err) {}
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Length")
                .setValue(0);
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Length")
                .setValue(0);
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Width")
                .setValue(0);
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Width")
                .setValue(0);
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper Start Ease")
                .setValue(0);
              p.property("ADBE Vector Stroke Taper")
                .property("ADBE Vector Taper End Ease")
                .setValue(0);
              p.property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wave Amount")
                .setValue(0);
              p.property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wavelength")
                .setValue(0);
              p.property("ADBE Vector Stroke Wave")
                .property("ADBE Vector Taper Wave Phase")
                .setValue(0);
              try {
                compLayers[l]
                  .property("ADBE Root Vectors Group")
                  .property("FX StrokeOffset")
                  .remove();
              } catch (err) {}
            } else {
              for (
                var j = 1;
                j <=
                compLayers[l]
                  .property("ADBE Root Vectors Group")
                  .property(i)
                  .property("ADBE Vectors Group").numProperties;
                j += 1
              ) {
                var p2 = compLayers[l]
                  .property("ADBE Root Vectors Group")
                  .property(i)
                  .property("ADBE Vectors Group")
                  .property(j);
                if (
                  p2.matchName == strokeMatchName ||
                  p2.matchName == gradientStrokeMatchName
                ) {
                  for (var z = 7; z > 0; z += -1) {
                    try {
                      p2.property("ADBE Vector Stroke Dashes")
                        .property(z)
                        .remove();
                    } catch (err) {
                      continue;
                    }
                  }
                  if (hardMode) {
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Length").expression =
                      "";
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Length").expression = "";
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Width").expression =
                      "";
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Width").expression = "";
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper Start Ease").expression = "";
                    p2
                      .property("ADBE Vector Stroke Taper")
                      .property("ADBE Vector Taper End Ease").expression = "";
                    p2
                      .property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wave Amount").expression =
                      "";
                    p2
                      .property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wavelength").expression = "";
                    p2
                      .property("ADBE Vector Stroke Wave")
                      .property("ADBE Vector Taper Wave Phase").expression = "";
                    p2.property("ADBE Vector Stroke Width").expression = "";
                    p2.property("ADBE Vector Stroke Color").expression = "";
                    p2.property("ADBE Vector Stroke Opacity").expression = "";
                    try {
                      compLayers[l].effect
                        .property("Taper Start Length")
                        .remove();
                      compLayers[l].effect
                        .property("Taper End Length")
                        .remove();
                      compLayers[l].effect
                        .property("Taper Start Radius")
                        .remove();
                      compLayers[l].effect
                        .property("Taper End Radius")
                        .remove();
                      compLayers[l].effect
                        .property("Taper Start Ease")
                        .remove();
                      compLayers[l].effect.property("Taper End Ease").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Wave Amount").remove();
                      compLayers[l].effect.property("Wave Length").remove();
                      compLayers[l].effect.property("Wave Phase").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Stroke Width").remove();
                      compLayers[l].effect
                        .property("Non Rescaling Stroke Width")
                        .remove();
                      compLayers[l].effect.property("Stroke Color").remove();
                      compLayers[l].effect.property("Stroke Opacity").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Dash 1").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Gap 1").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Dash 2").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Gap 2").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Dash 3").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Gap 3").remove();
                    } catch (err) {}
                    try {
                      compLayers[l].effect.property("Dashes Offset").remove();
                    } catch (err) {}
                  }
                  try {
                    compLayers[l].effect
                      .property("Taper Start Length")
                      .property(1)
                      .setValue(0);
                    compLayers[l].effect
                      .property("Taper End Length")
                      .property(1)
                      .setValue(0);
                    compLayers[l].effect
                      .property("Taper Start Radius")
                      .property(1)
                      .setValue(0);
                    compLayers[l].effect
                      .property("Taper End Radius")
                      .property(1)
                      .setValue(0);
                    compLayers[l].effect
                      .property("Taper Start Ease")
                      .property(1)
                      .setValue(0);
                    compLayers[l].effect
                      .property("Taper End Ease")
                      .property(1)
                      .setValue(0);
                  } catch (err) {}
                  try {
                    compLayers[l].effect
                      .property("Wave Amount")
                      .property(1)
                      .setValue(0);
                    compLayers[l].effect
                      .property("Wave Length")
                      .property(1)
                      .setValue(0);
                    compLayers[l].effect
                      .property("Wave Phase")
                      .property(1)
                      .setValue(0);
                  } catch (err) {}
                  p2.property("ADBE Vector Stroke Taper")
                    .property("ADBE Vector Taper Start Length")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Taper")
                    .property("ADBE Vector Taper End Length")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Taper")
                    .property("ADBE Vector Taper Start Width")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Taper")
                    .property("ADBE Vector Taper End Width")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Taper")
                    .property("ADBE Vector Taper Start Ease")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Taper")
                    .property("ADBE Vector Taper End Ease")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Wave")
                    .property("ADBE Vector Taper Wave Amount")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Wave")
                    .property("ADBE Vector Taper Wavelength")
                    .setValue(0);
                  p2.property("ADBE Vector Stroke Wave")
                    .property("ADBE Vector Taper Wave Phase")
                    .setValue(0);
                  try {
                    compLayers[l]
                      .property("ADBE Root Vectors Group")
                      .property(i)
                      .property("ADBE Vectors Group")
                      .property("FX StrokeOffset")
                      .remove();
                  } catch (err) {}
                } else {
                  continue;
                }
              }
            }
            continue;
          }
        }
      }
      if (hardMode) {
        app.project.activeItem.layer("FX_StrokeSetter CTRL").remove();
      }
    } else {
      alert(emptySelMessage);
    }
  }
  function selectAllShapeLayers() {
    var maComp = app.project.activeItem;
    var totalLayers = maComp.numLayers;
    for (var i = 1; i <= totalLayers; i += 1) {
      maComp.layer(i).selected = false;
      if (maComp.layer(i) instanceof ShapeLayer) {
        maComp.layer(i).selected = true;
      }
    }
  }
  function helpInfo() {
    var w = new Window("dialog", nomDeMonScript + " Help and Info");
    var largeurDesBoutons = 280;
    w.margins = 24;
    w.spacing = 12;
    var monTexteInfos =
      "\n[1-3] STROKE CAPS\n\nUse the 3 first buttons to set the Stroke(s) Cap to Butt (first icon), Round (second icon) or Projecting (third icon), on selected Shape Layers.\n\n*******************************\n\n[4-6] STROKE JOINS\n\nUse the 4th to 6th buttons to set the Stroke(s) Join to Mitter (4th icon), Round (5th icon) or Bevel (6th icon), on selected Shape Layers.\n\n*******************************\n\n[7-9] STROKE ALIGN\n\nUse the 7th to 8th icons in order to align Stroke(s) on Center (7th button), Inside (8th button) or Outside (9th button), on selected Shape Layers.\nThis options are better suited for CLOSED shaped (like in Adobe Illustrator) ; you\'ll generally not want to apply these ones on open paths!\nPlease note that an Offset Shape Layer Animator called \'FX StrokeOffset\' will be added at the same hierarchy level for each Stroke.\n\n*******************************\n\n[10-11] STROKE TAPER (compatible with AE 17.1 and later versions only)\n\nUse one of these 2 buttons to set the value of the Stroke\'s \'Taper Start\' (10th button) or the \'Taper End\' (11th button) to 100%, on selected Shape Layers.\n\nALT + click on these buttons will create some local controls. This way, you\'ll force all the Stroke Taper\'s options (\'Start Length\', \'End Lenght\', \'Start Width\', \'End Width\', \'Start Ease\' and \'End Ease\') to be linked to some same named Expressions Controls that will be added to each Shape Layer\'s effects stack. This is perfect if you want to maintain some consistency in all the shapes contained in a same shape layer, that should share the exact same Taper Effect.\n\nALT + SHIFT + click on these buttons will create global controls. Just like explained previously, each Taper property will be driven by some Expression Controls created locally... BUT each of these Expression Controls effects will also be linked through expression to a master Null called \'FX_StrokeSetter CTRL\', where you\'ll find the exact same Controls effects that will drive all the selected Shape Layers globally (conversely to the ALT only shortcut, where controls where just local, independant from each other layer). This is the perfect choice if you want to keep consistency in all the composition or if you plan to expose the effects as Master Properties in the Essential Graphic Panel for templates creation.\nIf a \'FX_StrokeSetter CTRL\' Null layer already exists in the active composition, the Controls Effects will be added to it\'s effects stack, among other existing controls.\n\n*******************************\n\n[12] STROKE WAVE (compatible with AE 17.1 and later versions only)\n\nUse this 12th button to set the value of the Stroke\'s \'Wave Amount\' to a default value of 75%, on selected Shape Layers.\n\nALT + click on this button will create some local controls. This way, you\'ll force all the Stroke Wave\'s options (\'Wave Amount\', \'Wave Lenght\' and \'Wave Phase\') to be linked to some same named Expressions Controls that will be added to each Shape Layer\'s effects stack. This is perfect if you want to maintain some consistency in all the shapes contained in a same shape layer, that should share the exact same Wave Effect.\n\nALT + SHIFT + click on this button will create global controls. Just like explained previously, each Wave property will be driven by some Expression Controls created locally... BUT each of these Expression Controls effects will be also linked through expression to a master Null called \'FX_StrokeSetter CTRL\', where you\'ll find the exact same Controls effects that will drive all the selected Shape Layers globally (conversely to the ALT only shortcut, where controls where just local, independant from each other layer). This is the perfect choice if you want to keep consistency in all the composition or if you plan to expose the effects as Master Properties in the Essential Graphic Panel for templates creation.\nIf a \'FX_StrokeSetter CTRL\' Null layer already exists in the active composition, the Controls Effects will be added to it\'s effects stack, among other existing controls.\n\n*******************************\n\n[13] STROKE DASHES\n\nUse this 13th button to add Dashes and Gaps to the Stroke\'s \'Dashes\' group, on selected Shape Layers. A modal window will prompt you to add some dashes and gaps by pair (\'Dash 1\', \'Gap 1\', \'Dash 2\', \'Gap 2\'...), up to a maximum of 3 Dash/Gap pair (After Effects can\'t add more natively), thanks to the + and - buttons (then validate with the \'Set Dashes on Selected Shape Layers\').\n\nALT + click on this button will create some local controls. This way, you\'ll force all the Stroke Dashes\'s options you had chosen in the modal window (\'Dash 1\', \'Gap 1\', \'Dash 2\', ... + another one called \'Dashes Offset\') to be linked to some same named Expressions Controls that will be added to each Shape Layer\'s effects stack. This is perfect if you want to maintain some consistency in all the shapes contained in a same shape layer, that should share the exact same Dashes setup.\n\nALT + SHIFT + click on this button will create global controls. Just like explained previously, each Dashes property will be driven by some Expression Controls created locally... BUT each of these Expression Controls effects will be also linked through expression to a master Null called \'FX_StrokeSetter CTRL\', where you\'ll find the exact same Controls effects that will drive all the selected Shape Layers globally (conversely to the ALT only shortcut, where controls where just local, independant from each other layer). This is the perfect choice if you want to keep consistency in all the composition or if you plan to expose the effects as Master Properties in the Essential Graphic Panel for templates creation.\nIf a \'FX_StrokeSetter CTRL\' Null layer already exists in the active composition, the Controls Effects will be added to it\'s effects stack, among other existing controls.\n\n*******************************\n\n[14] STROKE RESET/WIDTH\n\nThis 14th button can be used for 2 different purpose : either to reset the Stroke\'s Dashes, Wave and Taper effects, or to apply local or global controls for Strokes\' Width, Color and Opacity, on selected Shape Layers.\n\nBy clicking the button solely without any shortcut, the script will remove all Dashes from the Strokes, reset their Wave Amount to 0 and rest their Taper Start and End Lenght values to 0.\n\nBut if these properties had an expression on them, if you had created local or global controls by ALT clicking the tool\'s buttons for example, you\'ll need to \'Hard Reset\' the selected Shape Layer\'s Stroke, by removing all the expressions, effects and the master \'FX_StrokeSetter CTRL\' null layer. Just hold down the SHIFT key on your keyboard while clicking this button in order to do so (and confirm it when the warning pops up)\n\nALT + click on this button will create some local controls for the Stroke Width, Color and Opacity, plus a checkbox called \'Non Rescaling Stroke Width\', that you can check if you want your Strokes\' width to visually remain the same while you resize the shape layer or its parent! This way, you\'ll force the Stroke Width, Color and Opacity to be linked to some same named Expressions Controls that will be added to each Shape Layer\'s effects stack. This is perfect if you want to maintain some consistency in all the shapes contained in a same shape layer, that should share the exact same Stroke Width/Color/Opacity.\n\nALT + SHIFT + click on this button will create global controls. Just like explained previously, Stroke\'s Width, Color and Opacity will be driven by some Expression Controls created locally... BUT each of these Expression Controls effects will be also linked through expression to a master Null called \'FX_StrokeSetter CTRL\', where you\'ll find the exact same Controls effects that will drive all the selected Shape Layers globally (conversely to the ALT only shortcut, where controls where just local, independant from each other layer). This is the perfect choice if you want to keep consistency in all the composition or if you plan to expose the effects as Master Properties in the Essential Graphic Panel for templates creation.\nIf a \'FX_StrokeSetter CTRL\' Null layer already exists in the active composition, the Controls Effects will be added to it\'s effects stack, among other existing controls.\n\n*******************************\n\n[15] HELP AND INFO special SHIFT shortcut\n\nYou can use the exact same button you\'ve just clicked while holding down the SHIFT key in order to automatically select all the Shape Layers contained in the active composition. Pretty convenient when you have a lot of Shape Layers and complex timeline with different types of layers!\n\n\n*******************************\n\nIMPORTANT NOTES :\n\nYou can select as many shape layers as you want in the active composition, and the script will cycle through each of them in order to find Strokes and apply the different effects to them, either directly at the Contents\' root (if you create an empty shape layer from scratch and add a stroke manually for exemple), or inside Groups at the first level only. Deeper group levels will be ignored in order to maintain responsiveness, but it shouldn\'t be a problem in general since the 1rst level of hierarchy is the most common case (Strokes are in 1rst level groups if you draw shapes with the AE vector tools or if you import shapes with Overlord for example).\n ";
    w.add(
      "statictext",
      [0, 0, 500, 32],
      nomDeMonScript +
        " " +
        versionDuScript +
        " - Created by Matthieu Fremeaux (aka FREMOX) from MotionCafe\nThe missing Stroke Panel for AfterEffects!",
      { multiline: true },
    );
    w.add("edittext", [0, 0, 500, 400], monTexteInfos, {
      multiline: true,
      readonly: true,
      scrolling: true,
    });
    var monBTNfremoxSurAescripts = w.add(
      "button",
      undefined,
      "See Fremox\'s other products on aescripts",
      { name: "ok" },
    );
    monBTNfremoxSurAescripts.preferredSize.width = largeurDesBoutons;
    monBTNfremoxSurAescripts.onClick = function () {
      openURL("https://aescripts.com/authors/f-l/fremox/");
    };
    var monBTNfremoxSurGumroad = w.add(
      "button",
      undefined,
      "See Fremox\'s other products on Gumroad",
    );
    monBTNfremoxSurGumroad.preferredSize.width = largeurDesBoutons;
    monBTNfremoxSurGumroad.onClick = function () {
      openURL("https://gumroad.com/fremox");
    };
    var monBTNclose = w.add("button", undefined, "Close (or press ESC)", {
      name: "cancel",
    });
    monBTNclose.preferredSize.width = largeurDesBoutons;
    w.show();
  }
  var nomDeMonScript = "FX_StrokeSetter";
  var versionDuScript = "1.0";
  var cheminDuDossierScriptUIPanels = new File($.fileName).parent.fsName;
  var cheminDuDossierAssets =
    cheminDuDossierScriptUIPanels + "/FXStrokeSetterAssets/";
  var emptySelMessage =
    "Please select one or several Shape Layer(s) with some Strokes before using this tool!";
  var strokeMatchName = "ADBE Vector Graphic - Stroke";
  var gradientStrokeMatchName = "ADBE Vector Graphic - G-Stroke";
  var monPanel = null;
  if (thisObj instanceof Panel) {
    monPanel = thisObj;
  } else {
    monPanel = new Window("palette", nomDeMonScript, undefined, {
      resizeable: true,
    });
  }
  monPanel.alignChildren = ["fill", "fill"];
  monPanel.orientation = "stack";
  monPanel.margins = 8;
  monPanel.spacing = 0;
  var monGroupe = monPanel.add("group");
  monGroupe.alignChildren = ["fill", "fill"];
  monGroupe.margins = 0;
  monGroupe.spacing = 0;
  var monGroupe2 = monPanel.add("group");
  monGroupe2.alignChildren = ["fill", "fill"];
  monGroupe2.margins = 0;
  monGroupe2.spacing = 0;
  var subContent2 = [];
  for (var q = 0; q < 5; q += 1) {
    subContent2[q] = monGroupe2.add("group");
    subContent2[q].orientation = "row";
    subContent2[q].alignChildren = ["fill", "fill"];
    subContent2[q].margins = 0;
    subContent2[q].spacing = 0;
  }
  var items = [
    "Butt-Cap",
    "Round-Cap",
    "Projecting-Cap",
    "Miter-Join",
    "Round-Join",
    "Bevel-Join",
    "Center-Align",
    "Inside-Align",
    "Outside-Align",
    "Start-Taper",
    "End-Taper",
    "Wave",
    "Dashes",
    "Reset-Width",
    "Help-and-Info",
  ];
  var btn = [];
  for (var j = 0; j < items.length; j += 1) {
    btn[j] = monGroupe.add(
      "iconbutton",
      undefined,
      File(cheminDuDossierAssets + "UI_icons/" + items[j] + ".png"),
      { style: "toolbutton" },
    );
    btn[j].helpTip = items[j].split("-").join(" ");
  }
  btn1a = subContent2[0].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[0] + ".png"),
    { style: "toolbutton" },
  );
  btn1a.helpTip = items[0].split("-").join(" ");
  btn1b = subContent2[0].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[1] + ".png"),
    { style: "toolbutton" },
  );
  btn1b.helpTip = items[1].split("-").join(" ");
  btn1c = subContent2[0].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[2] + ".png"),
    { style: "toolbutton" },
  );
  btn1c.helpTip = items[2].split("-").join(" ");
  btn2a = subContent2[1].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[3] + ".png"),
    { style: "toolbutton" },
  );
  btn2a.helpTip = items[3].split("-").join(" ");
  btn2b = subContent2[1].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[4] + ".png"),
    { style: "toolbutton" },
  );
  btn2b.helpTip = items[4].split("-").join(" ");
  btn2c = subContent2[1].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[5] + ".png"),
    { style: "toolbutton" },
  );
  btn2c.helpTip = items[5].split("-").join(" ");
  btn3a = subContent2[2].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[6] + ".png"),
    { style: "toolbutton" },
  );
  btn3a.helpTip = items[6].split("-").join(" ");
  btn3b = subContent2[2].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[7] + ".png"),
    { style: "toolbutton" },
  );
  btn3b.helpTip = items[7].split("-").join(" ");
  btn3c = subContent2[2].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[8] + ".png"),
    { style: "toolbutton" },
  );
  btn3c.helpTip = items[8].split("-").join(" ");
  btn4a = subContent2[3].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[9] + ".png"),
    { style: "toolbutton" },
  );
  btn4a.helpTip =
    items[9].split("-").join(" ") +
    "\n" +
    "ALT CLICK : Create local controlers" +
    "\n" +
    "ALT+SHIFT : Create global controlers";
  btn4b = subContent2[3].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[10] + ".png"),
    { style: "toolbutton" },
  );
  btn4b.helpTip =
    items[10].split("-").join(" ") +
    "\n" +
    "ALT CLICK : Create local controlers" +
    "\n" +
    "ALT+SHIFT : Create global controlers";
  btn4c = subContent2[3].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[11] + ".png"),
    { style: "toolbutton" },
  );
  btn4c.helpTip =
    items[11].split("-").join(" ") +
    "\n" +
    "ALT CLICK : Create local controlers" +
    "\n" +
    "ALT+SHIFT : Create global controlers";
  btn5a = subContent2[4].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[12] + ".png"),
    { style: "toolbutton" },
  );
  btn5a.helpTip =
    items[12].split("-").join(" ") +
    "\n" +
    "ALT CLICK : Create local controlers" +
    "\n" +
    "ALT+SHIFT : Create global controlers";
  btn5b = subContent2[4].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[13] + ".png"),
    { style: "toolbutton" },
  );
  btn5b.helpTip =
    "Reset Stroke Dashes, Wave and Taper FX\nSHIFT CLICK : Hard Reset Stroke (removes local & global controlers)\nALT CLICK : Create local Width, Color and Opacity controlers\nALT+SHIFT : Create global Width, Color and Opacity controlers";
  btn5c = subContent2[4].add(
    "iconbutton",
    undefined,
    File(cheminDuDossierAssets + "UI_icons/" + items[14] + ".png"),
    { style: "toolbutton" },
  );
  btn5c.helpTip =
    "Help and Info\nSHIFT CLICK : Select all Shape Layers in the active Composition";
  monGroupe2.visible = false;
  for (var k = 9; k < 13; k += 1) {
    btn[k].helpTip =
      items[k].split("-").join(" ") +
      "\n" +
      "ALT CLICK : Create local controlers" +
      "\n" +
      "ALT+SHIFT : Create global controlers";
  }
  btn[13].helpTip =
    "Reset Stroke Dashes, Wave and Taper FX\nSHIFT CLICK : Hard Reset Stroke (removes local & global controlers)\nALT CLICK : Create local Width, Color and Opacity controlers\nALT+SHIFT : Create global Width, Color and Opacity controlers";
  if (parseFloat(app.version) < 17.1) {
    for (var m = 9; m < 12; m += 1) {
      btn[m].enabled = false;
      btn[m].helpTip =
        items[m].split("-").join(" ") +
        "\n" +
        "not supported on this" +
        "\n" +
        "version of After Effects!";
    }
    btn4a.enabled = false;
    btn4a.helpTip =
      items[9].split("-").join(" ") +
      "\n" +
      "not supported on this" +
      "\n" +
      "version of After Effects!";
    btn4b.enabled = false;
    btn4b.helpTip =
      items[10].split("-").join(" ") +
      "\n" +
      "not supported on this" +
      "\n" +
      "version of After Effects!";
    btn4c.enabled = false;
    btn4c.helpTip =
      items[11].split("-").join(" ") +
      "\n" +
      "not supported on this" +
      "\n" +
      "version of After Effects!";
  }
  btn[14].helpTip =
    "Help and Info\nSHIFT CLICK : Select all Shape Layers in the active Composition";
  btn[0].onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setCap(1);
    app.endUndoGroup();
  };
  btn1a.onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setCap(1);
    app.endUndoGroup();
  };
  btn[1].onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setCap(2);
    app.endUndoGroup();
  };
  btn1b.onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setCap(2);
    app.endUndoGroup();
  };
  btn[2].onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setCap(3);
    app.endUndoGroup();
  };
  btn1c.onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setCap(3);
    app.endUndoGroup();
  };
  btn[3].onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setJoin(1);
    app.endUndoGroup();
  };
  btn2a.onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setJoin(1);
    app.endUndoGroup();
  };
  btn[4].onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setJoin(2);
    app.endUndoGroup();
  };
  btn2b.onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setJoin(2);
    app.endUndoGroup();
  };
  btn[5].onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setJoin(3);
    app.endUndoGroup();
  };
  btn2c.onClick = function () {
    app.beginUndoGroup(
      "Set Stroke to " + this.helpTip + " on selected Shape Layers",
    );
    setJoin(3);
    app.endUndoGroup();
  };
  btn[6].onClick = function () {
    app.beginUndoGroup(this.helpTip + " Stroke on selected Shape Layers");
    setAlign(1);
    app.endUndoGroup();
  };
  btn3a.onClick = function () {
    app.beginUndoGroup(this.helpTip + " Stroke on selected Shape Layers");
    setAlign(1);
    app.endUndoGroup();
  };
  btn[7].onClick = function () {
    app.beginUndoGroup(this.helpTip + " Stroke on selected Shape Layers");
    setAlign(2);
    app.endUndoGroup();
  };
  btn3b.onClick = function () {
    app.beginUndoGroup(this.helpTip + " Stroke on selected Shape Layers");
    setAlign(2);
    app.endUndoGroup();
  };
  btn[8].onClick = function () {
    app.beginUndoGroup(this.helpTip + " Stroke on selected Shape Layers");
    setAlign(3);
    app.endUndoGroup();
  };
  btn3c.onClick = function () {
    app.beginUndoGroup(this.helpTip + " Stroke on selected Shape Layers");
    setAlign(3);
    app.endUndoGroup();
  };
  btn[9].onClick = function () {
    app.beginUndoGroup("Set Stroke Taper to Start on selected Shape Layers");
    setTaper(1);
    app.endUndoGroup();
  };
  btn4a.onClick = function () {
    app.beginUndoGroup("Set Stroke Taper to Start on selected Shape Layers");
    setTaper(1);
    app.endUndoGroup();
  };
  btn[10].onClick = function () {
    app.beginUndoGroup("Set Stroke Taper to End on selected Shape Layers");
    setTaper(2);
    app.endUndoGroup();
  };
  btn4b.onClick = function () {
    app.beginUndoGroup("Set Stroke Taper to End on selected Shape Layers");
    setTaper(2);
    app.endUndoGroup();
  };
  btn[11].onClick = function () {
    app.beginUndoGroup(
      "Add Stroke " + this.helpTip + " on selected Shape Layers",
    );
    setWave();
    app.endUndoGroup();
  };
  btn4c.onClick = function () {
    app.beginUndoGroup(
      "Add Stroke " + this.helpTip + " on selected Shape Layers",
    );
    setWave();
    app.endUndoGroup();
  };
  btn[12].onClick = function () {
    app.beginUndoGroup(
      "Add Stroke " + this.helpTip + " on selected Shape Layers",
    );
    setDashes();
    app.endUndoGroup();
  };
  btn5a.onClick = function () {
    app.beginUndoGroup(
      "Add Stroke " + this.helpTip + " on selected Shape Layers",
    );
    setDashes();
    app.endUndoGroup();
  };
  btn[13].onClick = function () {
    var touches = detect();
    if (touches.indexOf("shiftalt") != -1) {
      app.beginUndoGroup(
        "Create Controls for Stroke Width, Color and Opacity on selected Shape Layers",
      );
      setStroke(true);
      app.endUndoGroup();
    } else if (touches.indexOf("alt") != -1) {
      app.beginUndoGroup(
        "Create Controls for Stroke Width, Color and Opacity on selected Shape Layers",
      );
      setStroke(false);
      app.endUndoGroup();
    } else if (touches.indexOf("shift") != -1) {
      app.beginUndoGroup(
        "Hard Reset Stroke Dashes, Wave and Taper on selected Shape Layers",
      );
      resetStroke(true);
      app.endUndoGroup();
    } else {
      app.beginUndoGroup(
        "Reset Stroke Dashes, Wave and Taper on selected Shape Layers",
      );
      resetStroke(false);
      app.endUndoGroup();
    }
  };
  btn5b.onClick = function () {
    var touches = detect();
    if (touches.indexOf("shiftalt") != -1) {
      app.beginUndoGroup(
        "Create Controls for Stroke Width, Color and Opacity on selected Shape Layers",
      );
      setStroke(true);
      app.endUndoGroup();
    } else if (touches.indexOf("alt") != -1) {
      app.beginUndoGroup(
        "Create Controls for Stroke Width, Color and Opacity on selected Shape Layers",
      );
      setStroke(false);
      app.endUndoGroup();
    } else if (touches.indexOf("shift") != -1) {
      app.beginUndoGroup(
        "Hard Reset Stroke Dashes, Wave and Taper on selected Shape Layers",
      );
      resetStroke(true);
      app.endUndoGroup();
    } else {
      app.beginUndoGroup(
        "Reset Stroke Dashes, Wave and Taper on selected Shape Layers",
      );
      resetStroke(false);
      app.endUndoGroup();
    }
  };
  btn[14].onClick = function () {
    var touches = detect();
    if (touches.indexOf("shift") != -1) {
      selectAllShapeLayers();
    } else {
      helpInfo();
    }
  };
  btn5c.onClick = function () {
    var touches = detect();
    if (touches.indexOf("shift") != -1) {
      selectAllShapeLayers();
    } else {
      helpInfo();
    }
  };
  monPanel.layout.layout(true);
  monPanel.layout.resize();
  monPanel.onResizing = monPanel.onResize = function () {
    monPanel.onResize = function () {
      monGroupe.orientation =
        monPanel.size.width * 0.2 > monPanel.size.height ? "row" : "column";
      monGroupe2.orientation =
        monPanel.size.width * 0.2 > monPanel.size.height ? "row" : "column";
      if (
        monPanel.size.height > 100 &&
        monPanel.size.width * 5 > monPanel.size.height
      ) {
        monGroupe2.visible = true;
        monGroupe.visible = false;
      } else {
        monGroupe.visible = true;
        monGroupe2.visible = false;
      }
      monPanel.layout.resize();
    };
  };
  if (monPanel instanceof Window) {
    monPanel.show();
  }
})(this);
