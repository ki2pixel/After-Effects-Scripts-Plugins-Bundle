/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function addAllPseudos() {
  createResourceFile(
    "length_rig.ffx",
    getRigPseudo("posRig"),
    getUserDataFolder(),
  );
  createResourceFile(
    "length_rig_slider.ffx",
    getRigPseudo("posRigSlider"),
    getUserDataFolder(),
  );
  createResourceFile(
    "speed_rig.ffx",
    getRigPseudo("speedRig"),
    getUserDataFolder(),
  );
  createResourceFile(
    "length_rig_ctrl.ffx",
    getRigPseudo("posRigCtrl"),
    getUserDataFolder(),
  );
  createResourceFile(
    "Path_Stretch.ffx",
    getRigPseudo("pathRig"),
    getUserDataFolder(),
  );
  createResourceFile(
    "wave_on_path.ffx",
    getRigPseudo("waveonpath"),
    getUserDataFolder(),
  );
  createResourceFile(
    "wave_on_path_simple.ffx",
    getRigPseudo("waveonpathsimple"),
    getUserDataFolder(),
  );
  createResourceFile(
    "wave_on_path_params.ffx",
    getRigPseudo("waveonpathParams"),
    getUserDataFolder(),
  );
  createResourceFile(
    "wave_on_path_array.ffx",
    getRigPseudo("waveonpathArray"),
    getUserDataFolder(),
  );
  createResourceFile(
    "pathBend.ffx",
    getRigPseudo("pathBend"),
    getUserDataFolder(),
  );
  createResourceFile(
    "pathDecay.ffx",
    getRigPseudo("pathDecay"),
    getUserDataFolder(),
  );
  createResourceFile(
    "pathDecayParams.ffx",
    getRigPseudo("pathDecayParams"),
    getUserDataFolder(),
  );
  createResourceFile(
    "mid_path.ffx",
    getRigPseudo("midPath"),
    getUserDataFolder(),
  );
}
function getRigPseudo(a) {
  var b = null;
  if (a == "posRig") {
    b = __BLOB__BLOB_000024__;
  } else {
    if (a == "posRigSlider") {
      b = __BLOB__BLOB_000025__;
    } else {
      if (a == "posRigCtrl") {
        b = __BLOB__BLOB_000026__;
      } else {
        if (a == "speedRig") {
          b = __BLOB__BLOB_000027__;
        } else {
          if (a == "pathRig") {
            b = __BLOB__BLOB_000028__;
          } else {
            if (a == "waveonpath") {
              b = __BLOB__BLOB_000029__;
            } else {
              if (a == "waveonpathsimple") {
                b = __BLOB__BLOB_000030__;
              } else {
                if (a == "waveonpathParams") {
                  b = __BLOB__BLOB_000031__;
                } else {
                  if (a == "waveonpathArray") {
                    b = __BLOB__BLOB_000032__;
                  } else {
                    if (a == "pathBend") {
                      b = __BLOB__BLOB_000033__;
                    } else {
                      if (a == "pathDecay") {
                        b = __BLOB__BLOB_000034__;
                      } else {
                        if (a == "pathDecayParams") {
                          b = __BLOB__BLOB_000035__;
                        } else {
                          if (a == "midPath") {
                            b = __BLOB__BLOB_000036__;
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
  return b;
}
function scanPropGroupProperties(e, c, a) {
  for (var b = 1; b <= e.numProperties; b += 1) {
    var d = e.property(b);
    if (d.propertyType === PropertyType.PROPERTY && d.matchName == a) {
      c.push(d);
    } else {
      if (
        d.propertyType === PropertyType.INDEXED_GROUP ||
        d.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties(d, c, a);
      }
    }
  }
  return c;
}
function crtCtrl(b) {
  var a = app.project.activeItem;
  if (!a.layer(b)) {
    var c = a.layers.addShape();
    c.name = b;
    c.comment = "Anim Controller";
    c.label = 2;
    c.enabled = false;
  } else {
    var c = a.layer(b);
  }
  return c;
}
function getLayerSize(b, c) {
  var a = b.sourceRectAtTime(c, false).width;
  var e = b.sourceRectAtTime(c, false).height;
  var d = a / (100 / b.scale.value[0]);
  var f = e / (100 / b.scale.value[1]);
  return [d, f];
}
function unselectAll(b) {
  for (var a = 0; a < b.length; a += 1) {
    b[a].selected = false;
  }
}
function effectNumIncrement(b, c) {
  var d = 1;
  var a = app.project.activeItem;
  while (a.layer(b).effect(c + " " + d)) {
    d++;
  }
  return c + " " + d;
}
function addSlider(d, c, b, f, e) {
  if (!c.Effects.property(b)) {
    if (d == "slider") {
      var a = c.Effects.addProperty("ADBE Slider Control");
      a.property(1).expression = e;
    } else {
      if (d == "angle") {
        var a = c.Effects.addProperty("ADBE Angle Control");
        a.property(1).expression = e;
      } else {
        if (d == "point") {
          var a = c.Effects.addProperty("ADBE Point Control");
          a.property(1).expression = e;
        } else {
          if (d == "checkbox") {
            var a = c.Effects.addProperty("ADBE Checkbox Control");
          } else {
            if (d == "color") {
              var a = c.Effects.addProperty("ADBE Color Control");
              a.property(1).expression = e;
            } else {
              if (d == "layer") {
                var a = c.Effects.addProperty("ADBE Layer Control");
              }
            }
          }
        }
      }
    }
    if (b != null) {
      a.name = b;
    }
    if (f != null) {
      a.property(1).setValue(f);
    }
  } else {
    a = c.Effects.property(b);
  }
  return a(1);
}
function sortingPath(a) {
  var c = [];
  for (var b = 0; b < a.length; b += 1) {
    var d = a[b];
    if (
      d.propertyType === PropertyType.PROPERTY &&
      d.matchName == "ADBE Vector Shape"
    ) {
      c.push(d);
    }
  }
  return c;
}
function findCenterOffset(b, c) {
  lPar = b.parent;
  b.parent = null;
  var e = b.sourceRectAtTime(c, false).width;
  var h = b.sourceRectAtTime(c, false).height;
  var f = b.sourceRectAtTime(c, false).left;
  var g = b.sourceRectAtTime(c, false).top;
  var a = b.anchorPoint.valueAtTime(c, false);
  var d = a - ([f, g] + [e, h] / 2);
  b.parent = lPar;
  return d;
}
function getPropPath(c) {
  var d = "";
  var a = c.propertyDepth;
  for (var b = 1; b <= a; b += 1) {
    if (c.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
      d = '("' + c.name + '")' + d;
    } else {
      if (c.matchName == "ADBE Effect Parade") {
        d = ".effect" + d;
      } else {
        d = '("' + c.matchName + '")' + d;
      }
    }
    c = c.parentProperty;
  }
  return d;
}
function layerNumIncrement(b) {
  var a = app.project.activeItem;
  var c = 1;
  while (a.layer(b + c)) {
    c++;
  }
  return b + c;
}
function getUnivSize(b) {
  var a = app.project.activeItem;
  switch (b) {
    case "mid":
      return a.height / 32;
    case "small":
      return a.height / 64;
  }
}
function getUserDataFolder() {
  c = Folder.userData;
  a = Folder(c.toString() + "/MDS/CrazyShapes/Pseudo");
  if (!a.exists) {
    b = a.create();
    if (!b) {
      alert("Error creating UI Master images");
      a = Folder.temp;
    }
  }
  return a.toString();
}
function createResourceFile(c, b, a) {
  d = new File(a + "/" + c);
  if (File(d).exists) {
    d.remove();
  }
  if (!isSecurityPrefSet()) {
    alert(
      "Network access disabled. To allow, please go to Preferences > General and check off \'Allow Scripts to Write Files and Access Network\' to resolve.",
    );
    try {
      app.executeCommand(2359);
    } catch (f) {
      alert(f);
    }
    if (!isSecurityPrefSet()) {
      return null;
    }
  }
  d.encoding = "BINARY";
  d.open("w");
  d.write(b);
  d.close();
  return d;
}
function getFileFromFolder(f, d) {
  var e = Folder.userData;
  if (d === undefined) {
    var d = "/MDS/CrazyShapes/Pseudo";
  }
  var a = Folder(e.toString() + d);
  if (f[0] !== "/") {
    var f = "/" + f;
  }
  var b = a.toString() + f;
  var c = File(b);
  return c;
}
function applyPreset(b, a) {
  b.selected = true;
  b.applyPreset(a);
  b.selected = false;
  return b("ADBE Effect Parade")(b("ADBE Effect Parade").numProperties);
}
function isSecurityPrefSet() {
  try {
    a = app.preferences.getPrefAsLong(
      "Main Pref Section",
      "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
    );
    return (a = 1);
  } catch (b) {
    return (a = 1);
  }
}
function centerLayer(e, b, f) {
  var a = app.project.activeItem;
  var d = [];
  if (e.anchorPoint.numKeys > 0) {
    for (var c = 1; c <= e.anchorPoint.numKeys; c += 1) {
      if (b === null || b === undefined) {
        var g = findCenterOffset(e, e.anchorPoint.keyTime(c));
      } else {
        var g = b[c - 1] * -1;
      }
      d.push(g);
      e.anchorPoint.setValueAtKey(
        c,
        e.anchorPoint.valueAtTime(e.anchorPoint.keyTime(c), true) - g,
      );
    }
  } else {
    if (b === null || b === undefined) {
      var g = findCenterOffset(e, a.time);
    } else {
      var g = b[0] * -1;
    }
    d.push(g);
    e.anchorPoint.setValue(e.anchorPoint.value - g);
  }
  if (f == true) {
    if (e.position.numKeys > 0) {
      for (var c = 1; c <= e.position.numKeys; c += 1) {
        if (
          e.position.dimensionsSeparated &&
          e.position.matchName == "ADBE Position"
        ) {
          continue;
        }
        setPosition(
          e,
          findCenterOffset(e, e.position.keyTime(c)),
          e.position.keyTime(c),
        );
      }
    } else {
      if (b === null || b === undefined) {
        setPosition(e, d[0], null);
      } else {
        setPosition(e, b[0], null);
      }
    }
  }
  return d;
}
function centerAnchorPoint(d, a, e) {
  var c = [];
  if (d.anchorPoint.numKeys > 0) {
    for (var b = 1; b <= d.anchorPoint.numKeys; b += 1) {
      if (a === null || a === undefined) {
        var f = findCenterOffset(d, d.anchorPoint.keyTime(b));
      } else {
        var f = a[b - 1] * -1;
      }
      c.push(f);
      d.anchorPoint.setValueAtKey(
        b,
        d.anchorPoint.valueAtTime(d.anchorPoint.keyTime(b), true) - f,
      );
    }
  } else {
    if (a === null || a === undefined) {
      var f = findCenterOffset(d, 0);
    } else {
      var f = a[0] * -1;
    }
    c.push(f);
    d.anchorPoint.setValue(d.anchorPoint.value - f);
  }
  if (e) {
    if (d.position.numKeys > 0) {
      for (var b = 1; b <= d.position.numKeys; b += 1) {
        if (d.position.dimensionsSeparated) {
          d.transform.xPosition.setValueAtKey(
            b,
            d.transform.xPosition.valueAtTime(
              d.transform.xPosition.keyTime(b),
              true,
            ) - findCenterOffset(d, d.transform.xPosition.keyTime(b))[0],
          );
          d.transform.yPosition.setValueAtKey(
            b,
            d.transform.yPosition.valueAtTime(
              d.transform.yPosition.keyTime(b),
              true,
            ) - findCenterOffset(d, d.transform.yPosition.keyTime(b))[1],
          );
        } else {
          d.position.setValueAtKey(
            b,
            d.position.valueAtTime(d.position.keyTime(b), true) -
              findCenterOffset(d, d.position.keyTime(b)),
          );
        }
      }
    } else {
      if (d.position.dimensionsSeparated) {
        d.transform.xPosition.setValue(d.position.value - c[0][0]);
        d.transform.yPosition.setValue(d.position.value - c[0][1]);
      } else {
        d.position.setValue(d.position.value - c[0]);
      }
    }
  }
  return c;
}
function setPosition(b, c, a) {
  if (b.position.dimensionsSeparated == true) {
    if (a != null) {
      b.transform.xPosition.setValueAtTime(
        a,
        b.transform.xPosition.valueAtTime(a, true) - c[0],
      );
      b.transform.yPosition.setValueAtTime(
        a,
        b.transform.yPosition.valueAtTime(a, true) - c[1],
      );
      b.transform.zPosition.setValueAtTime(
        a,
        b.transform.zPosition.valueAtTime(a, true) - c[2],
      );
    } else {
      b.transform.xPosition.setValue(b.transform.xPosition.value - c[0]);
      b.transform.yPosition.setValue(b.transform.yPosition.value - c[1]);
      if (b.threeDLayer == true) {
        b.transform.zPosition.setValue(b.transform.zPosition.value - c[2]);
      }
    }
  } else {
    if (a != null) {
      b.position.setValueAtTime(a, b.position.valueAtTime(a, true) - c);
    } else {
      b.position.setValue(b.position.value - c);
    }
  }
}
function searchSimilarName(a, b) {
  var c = 0;
  for (var d = 1; d <= a.numLayers; d += 1) {
    if (b.name == a.layer(d).name) {
      c++;
    }
  }
  if (c > 1) {
    return layerNumIncrement(b.name + " ");
  } else {
    return b.name;
  }
}
function collectParentArr(d, f, b, c) {
  if (c === null || c === undefined) {
    c = app.project.activeItem;
  }
  var a = c.time;
  c.time = 0;
  if (b == "in") {
    for (var g = 1; g <= c.numLayers; g += 1) {
      var e = c.layer(g);
      if (e.parent !== null && e.parent.index == d.index) {
        f.push({ lay: e, layPar: e.parent });
        e.parent = null;
      }
    }
  } else {
    if (b == "out") {
      for (var g = 0; g < f.length; g += 1) {
        var e = f[g].lay;
        e.parent = f[g].layPar;
      }
    }
  }
  c.time = a;
  return f;
}
function collectLockArr(e, a) {
  var b = [];
  for (var d = 0; d < e.length; d += 1) {
    var c = e[d];
    if (a == "in") {
      if (c.locked == true) {
        b.push(c);
        c.locked = false;
      }
      if (c.parent !== null && c.parent.locked == true) {
        b.push(c.parent);
        c.parent.locked = false;
      }
    } else {
      c.locked = true;
    }
  }
  return b;
}
function fixExpression(e, d, a) {
  for (var b = 1; b <= e.numProperties; b += 1) {
    var c = e.property(b);
    if (c.propertyType === PropertyType.PROPERTY && c.expressionEnabled) {
      if (c.expression.indexOf(d) > -1) {
        curExpression = c.expression.replace(d, a);
        c.expression = curExpression;
      }
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        fixExpression(c, d, a);
      }
    }
  }
}
function findPropDepth(b) {
  var g = 0;
  var f = [];
  for (var c = 0; c < b.length; c += 1) {
    var e = b[c];
    var a = e.propertyDepth;
    if (a > g) {
      g = a;
    }
  }
  var d = 0;
  for (var c = 0; c < b.length; c += 1) {
    var e = b[c];
    f.push(e.propertyGroup(e.propertyDepth - 2).propertyIndex - 1);
  }
  return f;
}
function copyKey(c, d, a, e, h) {
  var m = c.keyInInterpolationType(d);
  var n = c.keyOutInterpolationType(d);
  if (c.isSpatial) {
    var b = c.keyInSpatialTangent(d);
    var f = c.keyOutSpatialTangent(d);
    var i = c.keyRoving(d);
    var l = c.keySpatialContinuous(d);
    var k = c.keySpatialAutoBezier(d);
  } else {
    var b = null;
    var f = null;
    var i = null;
    var l = null;
    var k = null;
  }
  if (
    m == KeyframeInterpolationType.BEZIER &&
    n == KeyframeInterpolationType.BEZIER
  ) {
    var g = c.keyTemporalContinuous(d);
    var j = c.keyTemporalAutoBezier(d);
  } else {
    var g = null;
    var j = null;
  }
  h.push({
    inInterp: m,
    inPoint: a[0],
    inTang: b,
    inTemp: c.keyInTemporalEase(d),
    key: d,
    keyRov: i,
    keySpatAuto: k,
    keySpatCont: l,
    keyTempAutoBezier: j,
    keyTempCont: g,
    keyTime: c.keyTime(d),
    keyValue: c.keyValue(d),
    off: e,
    outInterp: n,
    outPoint: a[1],
    outTang: f,
    outTemp: c.keyOutTemporalEase(d),
    prop: c,
  });
  return h;
}
function pastKey(a) {
  var c = [];
  for (var b = a.length - 1; b >= 0; b--) {
    curProp = a[b].prop;
    curKey = a[b].key;
    inInterp = a[b].inInterp;
    outInterp = a[b].outInterp;
    keyTempCont = a[b].keyTempCont;
    var d = curProp.addKey(a[b].off + a[b].keyTime);
    curProp.setValueAtKey(d, a[b].keyValue);
    curProp.setTemporalEaseAtKey(d, a[b].inTemp, a[b].outTemp);
    curProp.setInterpolationTypeAtKey(d, inInterp, outInterp);
    if (
      inInterp == KeyframeInterpolationType.BEZIER &&
      outInterp == KeyframeInterpolationType.BEZIER &&
      keyTempCont
    ) {
      curProp.setTemporalContinuousAtKey(d, keyTempCont);
      curProp.setTemporalAutoBezierAtKey(d, a[b].keyTempAutoBezier);
    }
    if (curProp.isSpatial) {
      curProp.setSpatialContinuousAtKey(d, a[b].keySpatCont);
      curProp.setSpatialAutoBezierAtKey(d, a[b].keySpatAuto);
      curProp.setSpatialTangentsAtKey(d, a[b].inTang, a[b].outTang);
      if (a[b].keyRov) {
        c.push({ keyNum: curKey, prop: curProp });
      }
    }
  }
  for (var b = c.length - 1; b >= 0; b--) {
    curProp = c[b].prop;
    curKey = c[b].keyNum;
    alert(curKey);
    curProp.setRovingAtKey(curKey, true);
  }
  for (var b = a.length - 1; b >= 0; b--) {
    a[b].prop.setSelectedAtKey(a[b].key, true);
  }
}
function addNewShape(a) {
  if (a == null) {
    var b = app.project.activeItem.layers.addShape();
  } else {
    var b = a;
  }
  return b;
}
function addShapeGroup(b, c) {
  if (b.propertyDepth >= 0) {
    var a = b(2).addProperty("ADBE Vector Group");
  } else {
    var a = b
      .property("ADBE Root Vectors Group")
      .addProperty("ADBE Vector Group");
  }
  if (c != "") {
    a.name = c;
  }
  return a;
}
function addStroke(a, d, e, c, b) {
  var f = a
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Graphic - Stroke");
  f.property("ADBE Vector Stroke Color").setValue(d);
  f.property("ADBE Vector Stroke Color").expression = e;
  f.property("ADBE Vector Stroke Width").setValue(c);
  f.property("ADBE Vector Stroke Width").expression = b;
  return f;
}
function addFill(a, c, b) {
  var d = a
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Graphic - Fill");
  d.property("ADBE Vector Fill Color").setValue(c);
  d.property("ADBE Vector Fill Color").expression = b;
  return d;
}
function addEllipse(a, d, c) {
  var b = a
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Shape - Ellipse");
  if (d != null) {
    b.property("ADBE Vector Ellipse Size").setValue(d);
  }
  b.property("ADBE Vector Ellipse Size").expression = c;
  return b;
}
function addRect(a, d, b) {
  var c = a
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Shape - Rect");
  c.property("ADBE Vector Rect Size").setValue(d);
  c.property("ADBE Vector Rect Size").expression = b;
  return c;
}
function shapeTransform(a, d, c, b) {
  shpTr = a("ADBE Vector Transform Group");
  if (d == "Anchor Point") {
    if (c != null) {
      shpTr(1).setValue(c);
    }
    shpTr(1).expression = b;
  } else {
    if (d == "Position") {
      if (c != null) {
        shpTr(2).setValue(c);
      }
      shpTr(2).expression = b;
    } else {
      if (d == "Scale") {
        if (c != null) {
          shpTr(3).setValue(c);
        }
        shpTr(3).expression = b;
      } else {
        if (d == "Rotation") {
          if (c != null) {
            shpTr(6).setValue(c);
          }
          shpTr(6).expression = b;
        }
      }
    }
  }
}
function parametricShape(a, d, b, c) {
  shpTr = a(2)(1);
  if (d == "Size") {
    if (b != null) {
      shpTr(2).setValue(b);
    }
    shpTr(2).expression = c;
  } else {
    if (d == "Position") {
      if (b != null) {
        shpTr(3).setValue(b);
      }
      shpTr(3).expression = c;
    } else {
      if (d >= 0) {
        if (b != null) {
          shpTr(d).setValue(b);
        }
        shpTr(d).expression = c;
      }
    }
  }
}
function addPath(a, b, e, c) {
  var d = a
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Shape - Group");
  d.property("ADBE Vector Shape").setValue(b);
  d.property("ADBE Vector Shape").expression = e;
  d.name = c;
  return d;
}
function makeEllipse(a, i, c, b, k, g, d, h) {
  var j = getColor(k);
  var e = addNewShape(d);
  var f = addShapeGroup(e, "");
  if (h != "") {
    f.name = h;
  }
  addEllipse(f, i, "");
  if (c == "stroke") {
    addStroke(f, j, "", b, "");
  } else {
    if (c == "fill") {
      addFill(f, j, "");
    }
  }
  e.name = a;
  e.position.setValue(g);
  return [e, f];
}
function makeRect(a, h, b, j, f, c, g) {
  var i = getColor(j);
  if (c == null) {
    var d = addNewShape(c);
  } else {
    var d = c;
  }
  var e = addShapeGroup(d, "");
  if (g != "") {
    e.name = g;
  }
  addRect(e, h, "");
  if (b == "stroke") {
    addStroke(e, i, "", 1, "");
  } else {
    if (b == "fill") {
      addFill(e, i, "");
    }
  }
  d.name = a;
  d.position.setValue(f);
  return [d, e];
}
function addTrimPaths(b, f, e, d, c, g, h) {
  var a = b
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Filter - Trim");
  if (f != null) {
    a.property("ADBE Vector Trim Start").setValue(f);
  }
  a.property("ADBE Vector Trim Start").expression = e;
  if (d != null) {
    a.property("ADBE Vector Trim End").setValue(d);
  }
  a.property("ADBE Vector Trim End").expression = c;
  if (g !== null && g !== undefined) {
    a.property("ADBE Vector Trim Offset").setValue(g);
  }
  if (h !== null && h !== undefined) {
    a.property("ADBE Vector Trim Offset").expression = h;
  }
  return a;
}
function addPathOffset(b, d, c) {
  var a = b
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Filter - Offset");
  if (d != null) {
    a.property("ADBE Vector Offset Amount").setValue(d);
  }
  a.property("ADBE Vector Offset Amount").expression = c;
  a.property("ADBE Vector Offset Line Join").setValue(2);
  return a;
}
function nullsToPath(j, l) {
  var f = app.project.activeItem;
  var g = f.selectedLayers;
  var m = [];
  var q = [];
  var d = [];
  var s = [];
  var r = null;
  for (var o = 0; o < g.length; o += 1) {
    var n = g[o];
    var p = n.selectedProperties;
    n.name = searchSimilarName(f, n);
    var t = n.name.length > 23 ? n.name.substring(0, 20) + "..." : n.name;
    if (l) {
      resetShape("fullReset");
    }
    if (p.length == 0) {
      p = scanPropGroupProperties_points(n, [], "ADBE Vector Shape");
    }
    for (var e = 0; e < p.length; e += 1) {
      var b = p[e];
      if (
        b.parentProperty.matchName != "ADBE Vector Shape - Group" &&
        b.parentProperty.matchName != "ADBE Mask Atom"
      ) {
        continue;
      }
      if (j == "nullsToPoints") {
        q = nullsToPoints(b, t, n);
      } else {
        if (j == "slider") {
          q = addPointOnPath(b, t, n, 0);
        } else {
          if (j == "sliderNum") {
            var h = parseInt(prompt("Enter the number of sliders:", ""));
            for (var k = 0; k < h; k += 1) {
              m.push(addPointOnPath(b, t, n, (k / h) * 99.9));
            }
          } else {
            if (j == "pointsToNulls") {
              q = pointsToNulls(b, t, n);
            } else {
              if (j == "midArea") {
                s = addNullInMidArea(b, t, n);
                r = getFileFromFolder("mid_path.ffx");
              }
            }
          }
        }
      }
      d = d.concat(s);
      m = m.concat(q);
    }
  }
  if (d.length > 0) {
    for (var a = 0; a < d.length; a += 1) {
      var c = d[0];
      if (!c.effect("Mid Path")) {
        var i = applyPreset(c, r);
      }
    }
    m = d;
  }
  selectNulls(m);
}
function selectNulls(b) {
  for (var a = 0; a < b.length; a += 1) {
    b[a].selected = true;
  }
}
function addNullInMidArea(g, d, c) {
  var b = app.project.activeItem;
  var a = b.layers.addNull();
  var f = [a];
  var e = getPropPath_pointsToNull(g);
  a.position.setValue([0, 0]);
  a.position.expression =
    'function valCycle(val, loop) { return (val % loop + loop) % loop; };\nvar srcLayer = thisComp.layer("' +
    c.name +
    '");\nvar srcPath = srcLayer' +
    e +
    ';\nvar nul = thisLayer;\nvar sl = nul.effect("Mid Path")("Accuracy");\nvar rangeIn = nul.effect("Mid Path")("Range In");\nvar rangeOut = nul.effect("Mid Path")("Range Out");\nvar offRange = nul.effect("Mid Path")("Range Offset");\n\nvar midPoint = [0,0];\nvar maxCount = Math.round(100 / sl);\n\nfor(var i = 1; i <= maxCount; i++) {\n    rangeInOff = valCycle(rangeIn + offRange, 101) / 100;\n    rangeOutOff = valCycle(rangeOut + offRange, 101) / 100;\n    midPoint += srcPath.pointOnPath(linear(i / maxCount, rangeInOff, rangeOutOff), t = time);\n}\nmidPoint /= maxCount;\n\nvalue + srcLayer.toComp(midPoint);';
  a.rotation.expression =
    'function valCycle(val, loop) { return (val % loop + loop) % loop; };\nvar srcLayer = thisComp.layer("' +
    c.name +
    '");\nvar srcPath = srcLayer' +
    e +
    ';\nvar location = 0 //effect("Rotation Position (0-100)")(1)/100;\nvar asd = effect("Mid Path")("Rotation Smooth") / 200;\nvar pathTanL = srcPath.tangentOnPath(valCycle(location - asd, 1));\nvar pathTanR = srcPath.tangentOnPath(valCycle(location + asd, 1)); \nvar pathTanAv = (pathTanL + pathTanR) / 2;\nvalue + radiansToDegrees(Math.atan2(pathTanAv[1], pathTanAv[0]));';
  a.name = d + ": " + g.parentProperty.name;
  a.moveBefore(c);
  return f;
}
function pointsToNulls(b, h, i) {
  var g = app.project.activeItem;
  var l = [];
  var j = "";
  var c = [];
  var f = getPropPath_pointsToNull(b);
  for (var d = 0; d < b.value.vertices.length; d += 1) {
    var a = g.layers.addNull();
    var k = h + ": " + b.parentProperty.name + ": p" + d + 1;
    k += " " + layerNumIncrement_pointsToNull(k);
    a.position.setValue([0, 0]);
    a.position.expression =
      'var srcLayer = thisComp.layer("' +
      i.name +
      '");\nvar srcPath = srcLayer' +
      f +
      ".points()[" +
      d +
      "];\nvalue + srcLayer.toComp(srcPath);";
    var e = a.position.value;
    a.position.expression = "";
    a.position.setValue(e);
    l.push(k);
    c.push(a);
    a.name = k;
    a.moveBefore(i);
    addSlider_nulls("layer", i, k, a.index, "");
    j += '\t"' + l[d] + '",\n';
  }
  b.expression =
    "var nullLayers = [\n" +
    j +
    "];\nvar origPath = thisProperty;\nvar origPoints = origPath.points();\nvar origInTang = origPath.inTangents();\nvar origOutTang = origPath.outTangents();\n\nfor (var i = 0; i < nullLayers.length; i++){\ntry {\n    var nullEff = effect(nullLayers[i])(1);\n    if (nullEff.index != thisLayer.index)\n        origPoints[i] = fromCompToSurface(nullEff.toComp(nullEff.anchorPoint));\n} catch (err) {}\n}\ncreatePath(origPoints, origInTang, origOutTang, origPath.isClosed());";
  return c;
}
function nullsToPoints(h, d, c) {
  var b = app.project.activeItem;
  var g = [];
  var f = getPropPath_pointsToNull(h);
  for (var e = 0; e < h.value.vertices.length; e += 1) {
    var a = b.layers.addNull();
    g.push(a);
    a.position.setValue([0, 0]);
    a.position.expression =
      'var srcLayer = thisComp.layer("' +
      c.name +
      '");\nvar srcPath = srcLayer' +
      f +
      ".points()[" +
      e +
      "];\nvalue + srcLayer.toComp(srcPath);";
    a.name = d + ": " + h.parentProperty.name + ": p" + e + 1;
    a.moveBefore(c);
  }
  return g;
}
function addPointOnPath(h, e, d, f) {
  var c = app.project.activeItem;
  var g = getPropPath_pointsToNull(h);
  var b = c.layers.addNull();
  addSlider_nulls("slider", b, "Location", f, "");
  addSlider_nulls("checkbox", b, "Points Toggle", 0, "");
  b.position.setValue([0, 0]);
  b.position.expression =
    'var srcLayer = thisComp.layer("' +
    d.name +
    '");\nvar srcPath = srcLayer' +
    g +
    ';\nvar sliderType = effect("Points Toggle")(1).value;\nvar loc = effect("Location")(1);\nif (!sliderType) { var p = srcLayer.toComp(srcPath.pointOnPath((loc / 100 % 1 + 1) % 1));\n} else {\n    var num = srcPath.points().length;\n    var p = srcLayer.toComp(srcPath.points()[Math.round((loc / num % 1 + 1) % 1 * num)]);\n}\np + value';
  b.rotation.expression =
    'var srcLayer = thisComp.layer("' +
    d.name +
    '");\nvar srcPath = srcLayer' +
    g +
    ';\nvar sliderType = effect("Points Toggle")(1).value;\nvar loc = effect("Location")(1) / 100;\nvar norm = !sliderType ? srcPath.normalOnPath((loc % 1 + 1) % 1) : [0,0];\nvar angl = Math.atan2(norm[1], norm[0]);\nvalue + radiansToDegrees(angl);';
  var a = e + ": " + h.parentProperty.name + ":";
  b.name = a + " " + layerNumIncrement_pointsToNull(a);
  b.moveBefore(d);
  return b;
}
function layerNumIncrement_pointsToNull(b) {
  var c = 1;
  var a = app.project.activeItem;
  while (a.layer(b + " " + c)) {
    c++;
  }
  return c;
}
function getPropPath_pointsToNull(c) {
  var d = "";
  var a = c.propertyDepth;
  for (var b = 1; b <= a; b += 1) {
    if (c.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
      d = '("' + c.name + '")' + d;
    } else {
      d = '("' + c.matchName + '")' + d;
    }
    c = c.parentProperty;
  }
  return d;
}
function addSlider_nulls(d, c, b, f, e) {
  if (!c.Effects.property(b)) {
    if (d == "slider") {
      var a = c.Effects.addProperty("ADBE Slider Control");
      a.property(1).setValue(f);
      a.property(1).expression = e;
    } else {
      if (d == "layer") {
        var a = c.Effects.addProperty("ADBE Layer Control");
        a.property(1).setValue(f);
      } else {
        if (d == "checkbox") {
          var a = c.Effects.addProperty("ADBE Checkbox Control");
          a.property(1).setValue(f);
        }
      }
    }
    a.name = b;
  }
}
function scanPropGroupProperties_points(e, c, a) {
  for (var b = 1; b <= e.numProperties; b += 1) {
    var d = e.property(b);
    if (d.propertyType === PropertyType.PROPERTY && d.matchName == a) {
      c.push(d);
    } else {
      if (
        d.propertyType === PropertyType.INDEXED_GROUP ||
        d.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties_points(d, c, a);
      }
    }
  }
  return c;
}
function pathBend(o, f) {
  app.executeCommand(3064);
  findAndConvertParamShapes("experimental", true);
  if (o == "bend") {
    var q = getFileFromFolder("pathBend.ffx");
  } else {
    if (o == "delay") {
      var q = getFileFromFolder("pathDecay.ffx");
    }
  }
  var a = getFileFromFolder("pathDecayParams.ffx");
  var l = app.project.activeItem;
  if (l === null) {
    return null;
  }
  var m = l.selectedLayers;
  var v = [];
  for (var t = 0; t < m.length; t += 1) {
    var s = m[t];
    var k = [];
    var p = [];
    if (!(s instanceof ShapeLayer)) {
      alert("This script works only on the Shapes");
      continue;
    }
    var u = s.selectedProperties;
    if (u.length == 0) {
      u = scanPropGroupProperties_PathBend(s, [], "ADBE Vector Shape");
    } else {
      u = sortingPath_PathBend(u);
    }
    for (var i = 0; i < u.length; i += 1) {
      var c = u[i];
      if (
        c.expression.substring(0, 13) == "// Path Delay" ||
        c.expression.substring(0, 12) == "// Path Bend"
      ) {
        continue;
      }
      p.push(c);
    }
    var w = findPropDepth(p);
    for (var i = 0; i < p.length; i += 1) {
      var c = p[i];
      var x = c.propertyGroup(3).name;
      if (c.propertyDepth - 2 !== 3) {
        x =
          c.propertyGroup(c.propertyDepth - 2).name +
          " - " +
          c.propertyGroup(3).name;
      }
      curPathParName = x + " - " + i + 1;
      k.push(curPathParName);
      if (o == "bend") {
        var b = getPathBendExpression(curPathParName);
      } else {
        if (o == "delay") {
          var b = getPathDecayExpression(curPathParName);
        }
      }
      c.expression = b;
    }
    v.push({ lay: s, pathDepth: w, pathNames: k, props: p });
  }
  for (var t = 0; t < v.length; t += 1) {
    v[t].lay.selected = false;
    unselectProp_resetShape(v[t].lay);
  }
  for (var t = 0; t < v.length; t += 1) {
    var e = v[t].lay;
    var d = v[t].props;
    var h = v[t].pathNames;
    var r = v[t].pathDepth;
    if (!e.effect("Path Delay") && !e.effect("Path Bend")) {
      var n = applyPreset(e, q);
    } else {
      alert("This rig already exists on this layer, delete it to apply new.");
      break;
    }
    if (o == "delay") {
      n("Position").expression = getPathDecayPosExpr();
      n("Scale").expression = getPathDecayScaleExpr();
      n("Rotation").expression = getPathDecayRotExpr();
      n("Points Elastic").setValue(0);
    }
    if (f > 0) {
      e.effect("Path Delay")("Parent Motion").setValue(f);
    }
    for (var i = 0; i < d.length; i += 1) {
      var j = applyPreset(e, a);
      j.name = h[i];
      if (o == "bend") {
        j("Offset").setValue((r[i] / d.length) * 100);
      } else {
        j("Offset").setValue(r[i] * 10);
      }
      j("Offset").expression = 'value * (effect("Path Array Off Mult")(1))';
      if (o == "delay") {
        j("Strength").setValue(0);
      }
    }
    var g = addSlider_PathBend("slider", e, "Path Array Off Mult", 1, "");
    e.selected = false;
  }
  for (var t = 0; t < v.length; t += 1) {
    v[t].lay.selected = true;
  }
}
function sortingPath_PathBend(a) {
  var c = [];
  for (var b = 0; b < a.length; b += 1) {
    var d = a[b];
    if (
      d.propertyType === PropertyType.PROPERTY &&
      d.matchName == "ADBE Vector Shape"
    ) {
      c.push(d);
    }
  }
  return c;
}
function addSlider_PathBend(d, c, b, f, e) {
  if (!c.Effects.property(b)) {
    if (d == "slider") {
      var a = c.Effects.addProperty("ADBE Slider Control");
      a.property(1).expression = e;
    } else {
      if (d == "angle") {
        var a = c.Effects.addProperty("ADBE Angle Control");
        a.property(1).expression = e;
      } else {
        if (d == "point") {
          var a = c.Effects.addProperty("ADBE Point Control");
          a.property(1).expression = e;
        } else {
          if (d == "checkbox") {
            var a = c.Effects.addProperty("ADBE Checkbox Control");
          } else {
            if (d == "color") {
              var a = c.Effects.addProperty("ADBE Color Control");
              a.property(1).expression = e;
            } else {
              if (d == "layer") {
                var a = c.Effects.addProperty("ADBE Layer Control");
              }
            }
          }
        }
      }
    }
    if (b != null) {
      a.name = b;
    }
    if (f != null) {
      a.property(1).setValue(f);
    }
  } else {
    c.Effects.property(b)(1).setValue(f);
    a = c.Effects.property(b)(1);
  }
  return a;
}
function getPropTransform_PathBend(d) {
  var a = d.propertyDepth;
  var b = [0, 0];
  for (var c = 1; c <= a; c += 1) {
    if (
      d.parentProperty.matchName == "ADBE Root Vectors Group" ||
      (d.parentProperty.matchName == "ADBE Vectors Group" &&
        d(1).matchName == "ADBE Vector Blend Mode")
    ) {
      b -= d(3)(1).value;
      b += d(3)(2).value;
    }
    d = d.parentProperty;
  }
  return b;
}
function getPropTransform2_PathBend(c) {
  var a = c.propertyDepth;
  for (var b = 1; b <= a; b += 1) {
    if (
      c.parentProperty.matchName == "ADBE Root Vectors Group" ||
      (c.parentProperty.matchName == "ADBE Vectors Group" &&
        c(1).matchName == "ADBE Vector Blend Mode")
    ) {
      c(3)(1).setValue([0, 0]);
      c(3)(2).setValue([0, 0]);
    }
    c = c.parentProperty;
  }
}
function scanPropGroupProperties_PathBend(e, c, a) {
  for (var b = 1; b <= e.numProperties; b += 1) {
    var d = e.property(b);
    if (d.propertyType === PropertyType.PROPERTY && d.matchName == a) {
      c.push(d);
    } else {
      if (
        d.propertyType === PropertyType.INDEXED_GROUP ||
        d.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties_PathBend(d, c, a);
      }
    }
  }
  return c;
}
function getPathBendExpression(a) {
  var b =
    '// Path Bend\nfunction newInterp(d, Vin, Vout) { return Vin + d * (Vout - Vin); }\nfunction sharpEaseInOut(t, p) {\n  if (p == 1) return t;\n  return ( t < 0 ) ?\n    Math.pow(t + 1, p) - 1 :\n    (1 - Math.pow(1 - t, p));\n}\nfunction smoothEaseInOut(t, p) {\n  return p == 1 ? t : Math.atan(p * t) / Math.atan(p);\n}\nfunction handlRot(interp, offPath, ctrlAngl) {\n  var pointDist = offPath > 0 ? newInterp(offPath, 0, length(interp, [0, 0])) : length(interp, [0, 0]);\n  var pointAngl = Math.atan2(interp[1], interp[0]) + ctrlAngl;\n  var cosX = Math.sin(pointAngl);\n  var sinY = Math.cos(pointAngl);\n  return [sinY, cosX] * pointDist;\n}\nvar l = thisLayer;\nvar origPath = thisProperty;\nvar origPoints = origPath.points();\nvar origInTangents = origPath.inTangents();\nvar origOutTangents = origPath.outTangents();\nvar ang = l.effect("Path Bend")("Path Rotation");\nvar angRad = ang * 0.01745;\nvar lAnch = [l.anchorPoint[0], l.anchorPoint[1]];\nvar strIn = l.effect("Path Bend")("Range In");\nvar strOut = l.effect("Path Bend")("Range Out") + 1;\nvar strEase = l.effect("Path Bend")("Range Easing") / 100;\nvar bendAmp = l.effect("Path Bend")("Bend Amplitude");\nvar bendFreq = l.effect("Path Bend")("Bend Frequency");\nvar bendSpd = l.effect("Path Bend")("Bend Speed (sec)");\nvar bendOff = l.effect("Path Bend")("Bend Offset") / 100;\nvar lenDecay = l.effect("Path Bend")("Length Delay");\nvar tangAmp = l.effect("Path Bend")("Tangents Multiply");\nvar pointOff = l.effect("Path Bend")("Points Decay") / 50;\nvar animType = l.effect("Path Bend")("Noise Animation");\nvar smoothEasyBend = l.effect("Path Bend")("Smooth Easy Bend");\nvar sharpEasyBend = l.effect("Path Bend")("Sharp Easy Bend");\nvar pointTangOff = l.effect("Path Bend")("Points - Tangents Decay") / 50;\nvar linearCor = l.effect("Path Bend")("Range Linear Correction").value;\nvar lenType2 = l.effect("Path Bend")("Length Delay Type 2").value;\nvar anglDecay = l.effect("Path Bend")("Angle Decay") / 100;\n//var inv = ((l.effect("Path Bend")("Bend Direction") / 100) * 2 - 1) * -1;\nvar inv = l.effect("Path Bend")("Bend Direction") / 100;\nvar yOnOff = l.effect("Path Bend")("Y Animation").value;\nvar yAmp = l.effect("Path Bend")("Y Amplitude");\nvar yFreq = l.effect("Path Bend")("Y Frequency");\nvar ySpd = l.effect("Path Bend")("Y Speed (sec)");\nvar yOffset = l.effect("Path Bend")("Y Offset") / 100 ;\nvar yDecay = l.effect("Path Bend")("Y Decay Multiply");\nvar rotAmp = l.effect("Path Bend")("Rotation Amplitude") * 0.01745;\nvar rotSpd = l.effect("Path Bend")("Rotation Speed (sec)");\nvar rotOff = l.effect("Path Bend")("Rotation Offset") / 100;\nvar smoothEasyRot = l.effect("Path Bend")("Smooth Easy Rotation");\nvar sharpEasyRot = l.effect("Path Bend")("Sharp Easy Rotation");\nvar pathSpd = l.effect("' +
    a +
    '")("Speed") / 100;\nvar pathOff = l.effect("' +
    a +
    '")("Offset") / 100;\nvar pathStr = l.effect("' +
    a +
    '")("Strength") / 100;\nvar offPath = l.effect("Path Bend")("Offset Path") / 100 + 1;\nvar offType = l.effect("Path Bend")("Range Offset Type");\nvar tangOff = l.effect("Path Bend")("Tangents Off").value;\nvar anchPos = l.fromCompToSurface(l.toComp(lAnch));\n\nvar rot = 0;\nvar tSrc = (time + inPoint - (startTime + inPoint));\nif (rotAmp > 0 && rotSpd > 0) {\n   var tRot = tSrc % rotSpd / rotSpd - rotOff;\n   rot = Math.sin(tRot * 2 * Math.PI);\n   rot = smoothEaseInOut(rot, smoothEasyRot);\n   rot = sharpEaseInOut(rot, sharpEasyRot);\n}\nvar rotAmpAngle = rot * -rotAmp;\nvar tBend = tSrc % (bendSpd * pathSpd) / pathSpd / bendSpd / bendFreq;\nvar tNoise = tSrc / pathSpd / bendSpd / bendFreq;\nvar tYbend = tSrc % ySpd / ySpd / yFreq;\nfor (var i = 0; i < origPoints.length; i++) {\n  var pointPos = origPoints[i];\n  var subPos = sub(anchPos, pointPos);\n  var anchLen = length(anchPos, pointPos);\n  var rad = Math.atan2(subPos[1], subPos[0]);\n  var linearDecrBendAmp = 0;\n  if (strIn > 0 || strOut > 0) {\n    if (offType == 1) {\n      linearDecrBendAmp = linear(anchLen * 2, strIn, strOut, strEase, 1);\n    } else if (offType == 2) {\n      linearDecrBendAmp = ease(anchLen * 2, strIn, strOut, strEase, 1);\n    } else if (offType == 3) {\n      linearDecrBendAmp = easeIn(anchLen * 2, strIn, strOut, strEase, 1);\n    } else if (offType == 4) {\n      linearDecrBendAmp = easeOut(anchLen * 2, strIn, strOut, strEase, 1);\n    }\n    if (linearCor) linearDecrBendAmp = Math.sqrt(linearDecrBendAmp);\n  }\n  \n  //var biggerSide = thisComp.height > thisComp.width ? thisComp.height : thisComp.width;\n\tvar lenDecayType = lenType2 ? Math.sqrt(anchLen * (lenDecay / 100000 / 2 )) * -inv : lenDecay / anchLen * inv; //2000000\n  var tOffPoints = pathOff + (i * pointOff) - (rad * Math.PI * anglDecay);\n  var tOff = tOffPoints + bendOff + lenDecayType;\n  var tSin = tBend + tOff;\n  var ampY = 0;\n  if (ySpd != 0 && yOnOff) {\n    var tY = tYbend + tOffPoints + yOffset + (lenDecayType * yDecay);\n    ampY = Math.sin(tY * 2 * Math.PI * yFreq) * yAmp;\n  }\n  if (animType == 0) {\n    var phase = 2 * Math.PI * bendFreq;\n    var s = Math.sin(tSin * phase);\n    s = smoothEaseInOut(s, smoothEasyBend);\n    s = sharpEaseInOut(s, sharpEasyBend);\n    //tttt = Math.sqrt((-lenDecayType));\n    //tttt = (-(lenDecayType));\n    //tttt = (Math.abs(lenDecayType));\n    //tx = tttt * 0.5; // effect("Slider Control")(1);\n    var sTang = Math.sin((tSin + 0.3 * lenDecayType - pointTangOff - 0) * phase); //+ lenDecayType * Math.PI / 8  // a1\n  } else {\n    var s = noise((tNoise + tOff) * bendFreq);\n    var sTang = noise((tNoise + tOff - pointTangOff) * bendFreq);  \n  }\n  var bendDecr = bendAmp * linearDecrBendAmp * pathStr;\n  var bendAmpAngle = (s * 0.01745) * bendDecr;\n  var bendAmpTang =  0.01745 * (sTang + 1 * lenDecayType * -s * bendFreq) * bendDecr; // a2 // a3 * (1 - linearDecrBendAmp)\n  var pathOffInt = (offPath > 0) ? newInterp(offPath, 0, anchLen) : anchLen;\n  var posPhase = rad + angRad + Math.PI + bendAmpAngle + rotAmpAngle;\n  var cosY = Math.cos(posPhase);\n  var sinX = Math.sin(posPhase);\n  \n  var polar = [cosY, sinX] * (pathOffInt + ampY * linearDecrBendAmp);\n  origPoints[i] = polar + lAnch;\n  if (!tangOff) {\n    var tangRotation = angRad + (bendAmpTang * tangAmp) + rotAmpAngle;\n    origInTangents[i] = handlRot(origInTangents[i], offPath, tangRotation);\n    origOutTangents[i] = handlRot(origOutTangents[i], offPath, tangRotation);\n  } else {\n    origInTangents[i] = [0, 0];\n    origOutTangents[i] = [0, 0];\n  }\n}\ncreatePath(origPoints, origInTangents, origOutTangents, origPath.isClosed());\n\n';
  return b;
}
function getPathDecayExpression(a) {
  var b =
    '// Path Delay\nfunction newInterp(d, Vin, Vout) {\n  return Vin + d * (Vout - Vin);\n}\nfunction handlRot(interp, ctrlAngl, testAng) {\n  var handLen = Math.sqrt(interp[0] * interp[0] + interp[1] * interp[1]);\n  pointDist = offPath == 1 ? handLen : newInterp(offPath, 0, handLen) ;\n  pointAngl = Math.atan2(interp[1], interp[0]);\n  sinX = Math.sin(pointAngl + ctrlAngl + testAng);\n  cosY = Math.cos(pointAngl + ctrlAngl + testAng);\n  return [cosY, sinX] * pointDist;\n}\n\nfunction sincos(p1, p2, ang1, vec) {\n  //if (vec === null || vec === undefined) vec = sub(p1, p2);\n  var pointAngl2 = Math.atan2(p1[1], p1[0]);\n  var len = length([0, 0], p1);\n  var allAng = pointAngl2 - degreesToRadians(ang1);\n  var cosX = Math.cos(allAng);\n  var sinY = Math.sin(allAng);\n  return [cosX, sinY] * len;\n}\n\nvar l = thisLayer;\nvar origPath = thisProperty;\nvar origPoints = origPath.points();\nvar origInTangents = origPath.inTangents();\nvar origOutTangents = origPath.outTangents();\nvar amp = l.effect("Path Delay")("Amplitude") / 10 / 100;\nvar freq = l.effect("Path Delay")("Frequency") / 100;\nvar decay = (l.effect("Path Delay")("Decay") * 2) / 100;\nvar ang = l.effect("Path Delay")("Path Rotation") * 0.01745; //degreesToRadians\nvar tOff = l.effect("Path Delay")("Time Offset (sec)");\nvar posOffMult = l.effect("Path Delay")("Position Delay Multiply");\nvar rotOffMult = l.effect("Path Delay")("Rotation Delay Multiply");\nvar scaleOffMult = l.effect("Path Delay")("Scale Delay Multiply");\nvar offType = l.effect("Path Delay")("Offset Type");\nvar strIn = l.effect("Path Delay")("Range In");\nvar strOut = l.effect("Path Delay")("Range Out") + 1;\nvar strEase = l.effect("Path Delay")("Range Easing");\nvar delay = l.effect("Path Delay")("Length Delay");\nvar str = l.effect("Path Delay")("Strength") / 100;\nvar tangAmp = l.effect("Path Delay")("Tangents Multiply");\nvar pointOff = l.effect("Path Delay")("Points Delay") / 100;\nvar point_tang_off = 1 - l.effect("Path Delay")("Tangents Delay");\nvar anglDelay = l.effect("Path Delay")("Angle Delay") / 100;\nvar pathOff = l.effect("' +
    a +
    '")("Offset") / 100;\nvar pathStr = l.effect("' +
    a +
    '")("Strength") / 100;\nvar pathSpd = l.effect("' +
    a +
    '")("Speed") / 100;\nvar offPath = l.effect("Path Delay")("Offset Path") / 100 + 1;\nvar inv = (l.effect("Path Delay")("Invert Direction") / 100) * 2 - 1;\nvar posUpd = l.effect("Path Delay")("Position");\nvar rotUpd = l.effect("Path Delay")("Rotation");\nvar scUpd = l.effect("Path Delay")("Scale");\n\nvar anchPos = l.toComp(l.anchorPoint);\nvar posOff2 = posUpd.value;\nvar rotOff2 = rotUpd.value;\nvar scOff2 = scUpd.value;\n\nvar anchPosPoints = l.fromCompToSurface(anchPos);\nfor (var i = 0; i < origPoints.length; i++) {\n  var pointPos = origPoints[i];\n  var subPos = sub(anchPosPoints, pointPos);\n  var anchLen = length(anchPosPoints, pointPos);\n  var rad = Math.atan2(subPos[1], subPos[0]);\n  \n  if (strIn == 0 && strOut == 1) {\n    var linearDecrBendAmp = 1;\n  } else {\n    if (offType == 1) {\n      var linearDecrBendAmp = linear(anchLen * 2, strIn, strOut, strEase, 1);\n    } else if (offType == 2) {\n      var linearDecrBendAmp = ease(anchLen * 2, strIn, strOut, strEase, 1);\n    } else if (offType == 3) {\n      var linearDecrBendAmp = easeIn(anchLen * 2, strIn, strOut, strEase, 1);\n    } else if (offType == 4) {\n      var linearDecrBendAmp = easeOut(anchLen * 2, strIn, strOut, strEase, 1);\n    } else {\n      var linearDecrBendAmp = 0;\n    }\n  }\n  var tOffAll =\n    pathOff - tOff -\n    (i * pointOff) / origPoints.length -\n    rad * Math.PI * anglDelay;\n  var t1 = time * pathSpd - tOffAll;\n  var tLenOff = (anchLen / 1080) * delay * inv;\n  var tPos = t1 + tLenOff * posOffMult;\n  var tSc = t1 + tLenOff * scaleOffMult;\n  var tRot = t1 + tLenOff * rotOffMult;\n\n  var posOff1 = posUpd.valueAtTime(tPos);\n\n  var subPosOff = sincos(sub(posOff1, posOff2), null, rotUpd);\n  var posGrad = subPosOff * linearDecrBendAmp;\n  var scOff1 = scUpd.valueAtTime(tSc);\n  var subScOff = ((scOff1[0] / scOff2[0]) * scOff1[1]) / scOff2[1];\n  var scaleGrad = ease(\n    linearDecrBendAmp,\n    1,\n    subScOff + (subScOff - 1) * (pathStr + str)\n  );\n\n  var subRotOff = sub(rotUpd.valueAtTime(tRot), rotOff2);\n  var rotGrad = (\n    subRotOff * linearDecrBendAmp + subRotOff * (pathStr + str)\n  ) * 0.01745; // degreesToRadians\n\n  var pathOffInt = offPath == 1 ? anchLen : newInterp(offPath, 0, anchLen);\n  var bendAmpTang = (\n    point_tang_off * subScOff * subRotOff * linearDecrBendAmp * tangAmp\n  ) * 0.01745; // degreesToRadians\n  var radPos = rad + ang + Math.PI + rotGrad;\n  var cosY = Math.cos(radPos);\n  var sinX = Math.sin(radPos);\n  var polar = [cosY, sinX] * (pathOffInt + offPath);\n  origPoints[i] =\n    polar * scaleGrad +\n    posGrad +\n    subPosOff * (pathStr + str) +\n    [l.anchorPoint[0], l.anchorPoint[1]];\n    \n  var tangRotation = ang + bendAmpTang;\n  origInTangents[i] = handlRot(origInTangents[i], tangRotation, 0);\n  origOutTangents[i] = handlRot(origOutTangents[i], tangRotation, 0);\n}\ncreatePath(origPoints, origInTangents, origOutTangents, origPath.isClosed());\n\n';
  return b;
}
function getPathDecayPosExpr() {
  var a =
    '// Path Delay - Position\nfunction elastic(amp, freq, decay, propEl) {\n    function calc(n) {\n        var t = time - propEl.key(n).time;\n        var v = propEl.velocityAtTime(propEl.key(n).time - thisComp.frameDuration/10);\n        return v * ((amp / freq)) * Math.sin(freq * t * 2*Math.PI) / Math.exp(t * (decay * 2) * Math.E);\n    }\n    if (propEl.numKeys == 0) return 0;\n    var n = propEl.nearestKey(time).index; \n    if (propEl.key(n).time > time) n--;\n    return (n > 1 && time <= propEl.key(n).time + (1 / decay)) ? calc(n) + calc(n - 1) : 0;\n}\n\nfunction getParentProp(lay, arr) {\n\tarr.push(lay.position);\n\tif (lay.hasParent) getParentProp(lay.parent, arr);\n\treturn arr;\n}\n\nvar l = thisLayer;\nvar parentMotion = l.effect("Path Delay")("Parent Motion");\ntry { var selectedParent = l.effect("Path Delay")("Get motion from");} catch(e) { var selectedParent = null; }\nvar laySwitch = selectedParent != null ? selectedParent : l;\n\nif (parentMotion > 0) {\n  var posVal = l.toComp(l.anchorPoint);\n  var allProps = getParentProp(l, []);\n} else {\n  var posVal = laySwitch.position.value;\n  var allProps = [laySwitch.position];\n}\n\nvar amp = l.effect("Path Delay")("Amplitude") / 10 / 100;\nvar freq = l.effect("Path Delay")("Frequency") / 100;\nvar decay = l.effect("Path Delay")("Decay") * 2 / 100;\nvar pointElastic = effect("Path Delay")("Points Elastic").value;\n\nvar elPos = [0, 0];\nif (pointElastic)\n  for (var x = 0; x < allProps.length; x++)\n    elPos += elastic(amp, freq, decay, allProps[x]);\n\nposVal + elPos;\n';
  return a;
}
function getPathDecayRotExpr() {
  var a =
    '// Path Delay - Rotation\nfunction elastic(amp, freq, decay, propEl) {\n    function calc(n) {\n        var t = time - propEl.key(n).time;\n        var v = propEl.velocityAtTime(propEl.key(n).time - thisComp.frameDuration/10);\n        return v * ((amp / freq)) * Math.sin(freq * t * 2*Math.PI) / Math.exp(t * (decay * 2) * Math.E);\n    }\n    if (propEl.numKeys == 0) return 0;\n    var n = propEl.nearestKey(time).index; \n    if (propEl.key(n).time > time) n--;\n    return (n > 1 && time <= propEl.key(n).time + (1 / decay)) ? calc(n) + calc(n - 1) : 0;\n}\nfunction recursiveProp(propSum, lay) {\n    if (lay.hasParent) { propSum += recursiveProp(lay.parent.transform.rotation, lay.parent); } return propSum;}\n\nfunction getParentProp(lay, arr) {\n    arr.push(lay.transform.rotation);\n    if (lay.hasParent) getParentProp(lay.parent, arr);\n    return arr;\n}\n\nvar l = thisLayer;\nvar parentMotion = l.effect("Path Delay")("Parent Motion");\n\ntry{ var selectedParent = l.effect("Path Delay")("Get motion from");} catch(e) {var selectedParent = null;}\nvar laySwitch = selectedParent != null ? selectedParent : l;\n\nvar recursRot = parentMotion > 0 ? recursiveProp(0, l) : 0;\nvar allProps = parentMotion > 0 ? getParentProp(l, []) : [laySwitch.transform.rotation];\n\nvar lProp = laySwitch.transform.rotation;\nvar amp = l.effect("Path Delay")("Amplitude") / 10 / 100;\nvar freq = l.effect("Path Delay")("Frequency") / 100;\nvar decay = l.effect("Path Delay")("Decay") * 2 / 100;\nvar pointElastic = effect("Path Delay")("Points Elastic").value;\n\nvar elVal = 0;\nif (pointElastic)\n  for (var x = 0; x < allProps.length; x++)\n    elVal += elastic(amp, freq, decay, allProps[x]);\n\nlProp + recursRot + elVal;\n';
  return a;
}
function getPathDecayScaleExpr() {
  var a =
    '// Path Delay - Scale\nfunction elastic(amp, freq, decay, propEl) {\n    function calc(n) {\n        var t = time - propEl.key(n).time;\n        var v = propEl.velocityAtTime(propEl.key(n).time - thisComp.frameDuration/10);\n        return v * ((amp / freq)) * Math.sin(freq * t * 2*Math.PI) / Math.exp(t * (decay * 2) * Math.E);\n    }\n    if (propEl.numKeys == 0) return 0;\n    var n = propEl.nearestKey(time).index; \n    if (propEl.key(n).time > time) n--;\n    return (n > 1 && time <= propEl.key(n).time + (1 / decay)) ? calc(n) + calc(n - 1) : 0;\n}\nfunction recursiveProp(propSum, lay) {\n    if (lay.hasParent) { propSum *= recursiveProp(lay.parent.transform.scale.value[0]/100, lay.parent); } return propSum;\n}\nfunction getParentProp(lay, arr) {\n\tarr.push(lay.transform.scale);\n\tif (lay.hasParent) getParentProp(lay.parent, arr);\n\treturn arr;\n}\n\nvar l = thisLayer;\nvar parentMotion = l.effect("Path Delay")("Parent Motion");\n\ntry{ var selectedParent = l.effect("Path Delay")("Get motion from");} catch(e) {var selectedParent = null;}\nvar laySwitch = selectedParent != null ? selectedParent : l;\n\nvar recursScale = parentMotion > 0 ? recursiveProp(1, l) : 1;\nvar allProps = parentMotion > 0 ? getParentProp(l, []) : [laySwitch.transform.scale];\n\nvar lProp = laySwitch.transform.scale;\nvar amp = l.effect("Path Delay")("Amplitude") / 10 / 100;\nvar freq = l.effect("Path Delay")("Frequency") / 100;\nvar decay = l.effect("Path Delay")("Decay") * 2 / 100;\nvar pointElastic = effect("Path Delay")("Points Elastic").value;\n\nvar elVal = [0, 0];\nif (pointElastic)\n  for (var x = 0; x < allProps.length; x++)\n    elVal += elastic(amp, freq, decay, allProps[x]);\n\nlProp * recursScale - elVal;\n';
  return a;
}
function addKeyToPath() {
  var d = app.project.activeItem;
  var g = d.selectedLayers;
  var h = [];
  for (var c = 0; c < g.length; c += 1) {
    var f = g[c];
    var j = f.selectedProperties;
    if (j.length != 0) {
      for (var b = 0; b < j.length; b += 1) {
        var a = j[b];
        if (
          a.parentProperty.propertyType === PropertyType.INDEXED_GROUP &&
          a.matchName == "ADBE Vector Shape - Group" &&
          !a(2).selected
        ) {
          h.push(a(2));
        }
        if (a.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
          continue;
        }
        if (a.matchName == "ADBE Vector Position") {
          scanPropGroupProperties_keyOnPath(a.parentProperty.parentProperty, h);
        } else {
          h.push(a);
        }
      }
    } else {
      scanPropGroupProperties_keyOnPath(f, h);
    }
  }
  for (var e = 0; e < h.length; e += 1) {
    h[e].addKey(d.time);
    h[e].selected = true;
  }
}
function scanPropGroupProperties_keyOnPath(d, b) {
  for (var a = 1; a <= d.numProperties; a += 1) {
    var c = d.property(a);
    if (
      c.propertyType === PropertyType.PROPERTY &&
      c.matchName == "ADBE Vector Shape"
    ) {
      b.push(c);
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties_keyOnPath(c, b);
      }
    }
  }
  return b;
}
function hideProps() {
  var a = app.project.activeItem;
  layersArray = a.selectedLayers;
  for (var b = 0; b < layersArray.length; b += 1) {
    var d = layersArray[b];
    var g = d.selectedProperties;
    var c = scanPropGroupProperties_soloProps(d, []);
    if (g.length > 0) {
      var e = [];
      for (var f = 0; f < g.length; f += 1) {
        var h = g[f];
        e.push(h);
      }
      disablePropsGroups_soloProps(c, e);
    } else {
      disablePropsGroups_soloProps(c, null);
    }
  }
}
function disablePropsGroups_soloProps(f, e) {
  var d = false;
  if (e == null) {
    d = true;
  }
  for (var b = 0; b < f.length; b += 1) {
    var a = f[b];
    if (
      a.propertyType === PropertyType.INDEXED_GROUP ||
      a.propertyType === PropertyType.NAMED_GROUP
    ) {
      var c = a;
    } else {
      var c = a.propertyGroup(3);
    }
    var j = false;
    if (!d) {
      for (var h = 0; h < e.length; h += 1) {
        var g = e[h];
        if (
          g.propertyType === PropertyType.INDEXED_GROUP ||
          g.propertyType === PropertyType.NAMED_GROUP
        ) {
          var i = g;
        } else {
          var i = g.propertyGroup(3);
        }
        if (c == i) {
          j = true;
          break;
        }
      }
    }
    if (d || j) {
      c.enabled = true;
    } else {
      c.enabled = false;
    }
  }
}
function scanPropGroupProperties_soloProps(d, a) {
  for (var b = 1; b <= d.numProperties; b += 1) {
    var c = d.property(b);
    if (
      c.propertyType === PropertyType.PROPERTY &&
      (c.parentProperty.matchName == "ADBE Vector Shape - Group" ||
        c.parentProperty.matchName == "ADBE Vector Shape - Rect" ||
        c.parentProperty.matchName == "ADBE Vector Shape - Ellipse" ||
        c.parentProperty.matchName == "ADBE Vector Shape - Star")
    ) {
      a.push(c);
      break;
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties_soloProps(c, a);
      }
    }
  }
  return a;
}
function waveOnPath(K) {
  var n = app.project.activeItem;
  var q = n.selectedLayers;
  var i = [];
  var y = [];
  var h = [];
  var H = false;
  if (K == "complex") {
    var I = "Wave On Path";
  } else {
    if (K == "simple") {
      var I = "Wave On Path Simple";
    }
  }
  var d = getFileFromFolder("wave_on_path.ffx");
  var G = getFileFromFolder("wave_on_path_simple.ffx");
  var c = getFileFromFolder("wave_on_path_params.ffx");
  var g = getFileFromFolder("wave_on_path_array.ffx");
  findAndConvertParamShapes("clasic", true);
  if (q.length == 0) {
    var t = [1, 1, 1, 1];
    var f = new Shape();
    f.vertices = [
      [-n.width / 4, 0],
      [0, 0],
      [n.width / 4, 0],
    ];
    f.closed = false;
    var O = addNewShape(null);
    var u = addShapeGroup(O, "Base Path");
    addPath(u, f, "", "Path Group 1");
    addStroke(u, t, "", 2, "");
    O.name = "Wave";
    q.push(O);
    H = true;
  }
  var j = 0;
  for (var p = 0; p < q.length; p += 1) {
    var D = q[p];
    if (!(D instanceof ShapeLayer)) {
      alert("This script works only on the Shapes");
      continue;
    }
    i.push(D);
    var o = D.selectedProperties;
    var Q = [];
    var B = [];
    var E = [];
    for (var a = 0; a < o.length; a += 1) {
      if (o[a].matchName == "ADBE Vector Shape") {
        B.push(o[a]);
      }
    }
    if (B.length == 0) {
      B = scanPropGroupProperties_waveOnPath(D, [], "ADBE Vector Shape");
    }
    var P = findPropDepth(B);
    var x = 0;
    for (var a = 0; a < B.length; a += 1) {
      var v = B[a];
      if (v.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
        continue;
      }
      var M = 0;
      for (var S = 0; S < v.value.vertices.length - 1; S += 1) {
        var w = v.valueAtTime(n.time, true);
        var J = w.vertices[S];
        var L = w.vertices[S + 1];
        var F = [J[0] - L[0], J[1] - L[1]];
        M += Math.sqrt(F[0] * F[0] + F[1] * F[1]);
      }
      x += M;
      var s = v.propertyGroup(3).name;
      if (v.propertyDepth - 2 !== 3) {
        s =
          v.propertyGroup(v.propertyDepth - 2).name +
          " - " +
          v.propertyGroup(3).name;
      }
      var z = s + " - " + a + 1;
      E.push(z);
      Q.push(v);
      var l = v.value.closed;
      var r = getWaveScript(z, K);
      v.expression = r;
      var T = v.parentProperty.parentProperty.addProperty(
        "ADBE Vector Filter - RC",
      );
      T.property("ADBE Vector RoundCorner Radius").expression =
        '// Waves on Path\neffect("' + I + '")("Round Corners");';
    }
    x /= B.length;
    j += x;
    if (Q.length > 0) {
      y.push({ closed: l });
      q[p].selected = false;
    } else {
      alert("Try to select the Path property or select the whole layer");
      return null;
    }
    h.push({ lay: D, pathDepth: P, pathNames: E, props: B });
  }
  j /= q.length;
  var e = (j / 350) * 200;
  if (e < 200) {
    e = 200;
  } else {
    if (e > 400) {
      e = 400;
    }
  }
  for (var p = 0; p < i.length; p += 1) {
    if (K == "complex") {
      var m = applyPreset(i[p], d);
    } else {
      if (K == "simple") {
        var m = applyPreset(i[p], G);
      }
    }
    m("Closed").setValue(y[p].closed);
    if (H) {
      m("Points Number").setValue(14);
      m("Wave1 Amplitude (px)").setValue(100);
      m("Wave1 Freq").setValue(200);
    } else {
      m("Wave1 Freq").setValue(e);
      if (K == "complex") {
        m("Wave2 Freq").setValue(e);
        m("Wave3 Freq").setValue(e);
      }
    }
  }
  for (var p = 0; p < h.length; p += 1) {
    h[p].lay.selected = false;
    unselectProp_resetShape(h[p].lay);
  }
  for (var p = 0; p < h.length; p += 1) {
    var C = h[p].lay;
    var A = h[p].props;
    var N = h[p].pathNames;
    var b = h[p].pathDepth;
    for (var a = 0; a < A.length; a += 1) {
      var R = applyPreset(C, c);
      R.name = N[a];
      R("Offset").setValue((b[a] / A.length) * 100);
      R("Amplitude").setValue(1);
      R("Frequency").setValue(1);
      R("Speed").setValue(1);
      R("Offset").expression =
        'var async = effect("Wave On Path Array")("All Params") / 100;\nvar randOff = effect("Wave On Path Array")("Random Range Offset") / 100;\nv = value * async * randOff;\nv';
      R("Amplitude").expression =
        'var seedRnd = effect("Wave On Path Array")("Random Seed");\nvar async = effect("Wave On Path Array")("All Params") / 100;\nvar randPar = effect("Wave On Path Array")("Random Range Amplitude") / 100;\nseedRandom(seedRnd, true);\nr = random (-1, 1) * 0.85;\nv = (value + r * async * randPar);\nv';
      R("Frequency").expression =
        'var seedRnd = effect("Wave On Path Array")("Random Seed");\nvar async = effect("Wave On Path Array")("All Params") / 100;\nvar randPar = effect("Wave On Path Array")("Random Range Frequency") / 100;\nseedRandom(seedRnd, true);\nr = random (-1, 1) * 0.85;\nv = (value + r * async * randPar);\nv';
      R("Speed").expression =
        'var seedRnd = effect("Wave On Path Array")("Random Seed");\nvar async = effect("Wave On Path Array")("All Params") / 100;\nvar randPar = effect("Wave On Path Array")("Random Range Speed") / 100;\nseedRandom(seedRnd, true);\nr = random (-1, 1) * 0.85;\nv = (value + r * async * randPar);\nv';
    }
    var k = applyPreset(C, g);
    k("Random Seed").setValue(Math.random() * 100);
    k("Random Range Amplitude").setValue(0);
    k("Random Range Frequency").setValue(0);
    k("Random Range Speed").setValue(0);
    C.selected = false;
  }
}
function scanPropGroupProperties_waveOnPath(e, c, a) {
  for (var b = 1; b <= e.numProperties; b += 1) {
    var d = e.property(b);
    if (d.propertyType === PropertyType.PROPERTY && d.matchName == a) {
      c.push(d);
    } else {
      if (
        d.propertyType === PropertyType.INDEXED_GROUP ||
        d.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties_waveOnPath(d, c, a);
      }
    }
  }
  return c;
}
function getWaveScript(b, a) {
  if (a == "complex") {
    var c =
      '// Waves on Path\nfunction interp(t, Vin, Vout) {\n  return Vin + t * (Vout - Vin);\n}\nfunction progrToCycle(val, cyc) {\n  return ((val % cyc) + cyc) % cyc;\n}\nfunction smoothEaseInOut(t, p) {\n  return p == 1 ? t : Math.atan(p * t) / Math.atan(p);\n}\nfunction sinMath(prop, i, t, progr) {\n  var spd = prop.spd;\n  var offSin = prop.offSin;\n  var det = i / (prop.sinDet + progr * waveFold + assymDetR) / prop.waveForm;\n  if (symm) {\n    if (progr < endPoint / 2) {\n      spd = -prop.spd;\n      offSin = prop.offSin + symmOff;\n    } else {\n      det =\n        (num - i) /\n        (prop.sinDet + (1 - progr) * waveFold + assymDetL) /\n        prop.waveForm;\n      spd = -prop.spd;\n      offSin = prop.offSin - symmOff + 3.14;\n    }\n  }\n  var tSpd = spd == 0 ? 0 : t / spd;\n  if (prop.waveNoise == 0) {\n    var sin = Math.sin(tSpd / prop.waveForm + det * 0.9865 - offSin);\n  } else {\n    var sin = noise(\n      tSpd / prop.waveForm / prop.waveNoiseStr +\n        det / prop.waveNoiseStr -\n        offSin\n    );\n  }\n  sin =\n    smoothEaseInOut(\n      prop.waveInv * Math.pow(sin, prop.waveForm),\n      prop.waveEasing\n    ) *\n      prop.ampForm -\n    prop.ampFormCor;\n  return sin;\n}\nvar l = thisLayer;\nvar lProp = thisProperty;\nvar wave1 = l.effect("Wave On Path")("Wave1").value;\nvar wave2 = l.effect("Wave On Path")("Wave2").value;\nvar wave3 = l.effect("Wave On Path")("Wave3").value;\nvar cycleOffset = l.effect("Wave On Path")("Cycle Offset").value;\nvar is_closed = l.effect("Wave On Path")("Closed");\nvar curvedStyle = l.effect("Wave On Path")("Curve Waves").value;\n\nvar pathOff = l.effect("' +
      b +
      '")("Offset") / 100;\nvar pathAmp = l.effect("' +
      b +
      '")("Amplitude");\nvar pathFreq = l.effect("' +
      b +
      '")("Frequency");\nvar pathSpd = l.effect("' +
      b +
      '")("Speed");\n\nvar pathPoints = lProp.points();\nvar inTang = lProp.inTangents();\nvar outTang = lProp.outTangents();\nvar newPath = [];\nvar newInTang = [];\nvar newOutTang = [];\nvar f = thisComp.frameDuration;\nvar num = l.effect("Wave On Path")("Points Number");\nvar startPoint = l.effect("Wave On Path")("Start") / 100;\nvar endPoint = l.effect("Wave On Path")("End") / 100;\nvar off = l.effect("Wave On Path")("Offset") / 100;\nvar sinFreq3 = l.effect("Wave On Path")("Wave3 Freq");\nvar sinAmp3 = l.effect("Wave On Path")("Wave3 Amplitude (px)");\nvar spd3 = l.effect("Wave On Path")("Wave3 Speed (sec)");\nvar offSin3 = l.effect("Wave On Path")("Wave3 Offset") * f * 1.57;\nvar easIn = l.effect("Wave On Path")("Ease Start") / 100;\nvar easOut = l.effect("Wave On Path")("Ease End") / 100;\nvar easeEase = l.effect("Wave On Path")("Ease Smoother") / 100;\nvar waveFold = l.effect("Wave On Path")("Wave Folding");\nvar symm = l.effect("Wave On Path")("Symmetric").value;\nvar xPhase = l.effect("Wave On Path")("X Phase");\nvar yPhase = l.effect("Wave On Path")("Y Phase");\nvar xPhaseAlt = l.effect("Wave On Path")("X Phase Alt");\nvar yPhaseAlt = l.effect("Wave On Path")("Y Phase Alt");\nvar phaseCycle = l.effect("Wave On Path")("Phase Cycle").value;\nvar phaseOffset = l.effect("Wave On Path")("Phase Offset");\nvar circCorr = !lProp.isClosed();\nvar offPath = l.effect("Wave On Path")("Offset Path");\nvar symmOff = l.effect("Wave On Path")("Symmetric Offset") * 0.063 + 1.57; // + 1.57 // deg2rad * 360 / 100 + PI / 2\nvar assymDetL = l.effect("Wave On Path")("Asymmetric Freq L");\nvar assymDetR = l.effect("Wave On Path")("Asymmetric Freq R");\nvar rotOff = l.effect("Wave On Path")("Axial Rotation").value;\nvar rot = l.effect("Wave On Path")("Axial Angle");\nvar altDistrTgl = l.effect("Wave On Path")("Alt distribution of points").value;\nvar wavesNames = ["Wave1", "Wave2"];\nvar wavesParams = [];\nfor (var nameIter = 0; nameIter < wavesNames.length; nameIter++) {\n  wavesParams.push({\n    sinAmp:\n      l.effect("Wave On Path")(wavesNames[nameIter] + " Amplitude (px)") / 2,\n    sinFreq: l.effect("Wave On Path")(wavesNames[nameIter] + " Freq"),\n    offSin:\n      l.effect("Wave On Path")(wavesNames[nameIter] + " Offset") * f * 1.57,\n    spd: l.effect("Wave On Path")(wavesNames[nameIter] + " Speed (sec)"),\n    waveForm: l.effect("Wave On Path")(wavesNames[nameIter] + " Form"),\n    waveInv:\n      l.effect("Wave On Path")(wavesNames[nameIter] + " Inversion") / 100,\n    waveEasing: l.effect("Wave On Path")(wavesNames[nameIter] + " Easing"),\n    waveNoise: l.effect("Wave On Path")(\n      wavesNames[nameIter] + " Noise Animation"\n    ),\n  });\n  wavePar = wavesParams[nameIter];\n  wavePar.waveFormCor = wavePar.waveForm == 2 ? 1 : 0;\n  wavePar.waveNoiseStr = wavePar.waveNoise + 1; // * 2\n  wavePar.ampForm = wavePar.sinAmp * wavePar.waveForm; //  * wavePar.waveNoiseStr\n  wavePar.ampFormCor = wavePar.sinAmp * wavePar.waveFormCor * wavePar.waveInv;\n  wavePar.sinDet = (Math.PI * num * 5) / wavePar.sinFreq / pathFreq;\n}\nif (rotOff) {\n  var rotMath = rot * 0.017444 - 1.57; // degr2rad - Math.PI / 2\n  var rotCos = Math.cos(rotMath);\n  var rotSin = Math.sin(rotMath);\n}\nvar normDir = 1;\nif (wave1 || wave2) {\n  var distPnt = [];\n  if (!altDistrTgl) {\n    for (var i = 0; i < num + circCorr; i++) {\n      var progr = i / num;\n      var pntOnPath = lProp.pointOnPath(progr);\n      newPath.push(pntOnPath);\n      distPnt.push({ state: false });\n    }\n  } else {\n    sl = Math.round((num + 2) / pathPoints.length);\n    var lenArr = 0;\n    for (var i = 0; i < pathPoints.length; i++) {\n      pPos = pathPoints[i];\n      lenArr += length(\n        pathPoints[i],\n        pathPoints[progrToCycle(i + 1, pathPoints.length)]\n      );\n    }\n    unAv = lenArr / pathPoints.length;\n    for (var i = 0; i < pathPoints.length; i++) {\n      \n      if (\n        (inTang[i][0] == 0 && inTang[i][1] == 0)\n        || (outTang[i][0] == 0 && outTang[i][1] == 0)\n      ) {\n        distPnt.push({ state: true });\n      } else {\n        distPnt.push({ state: false });\n      }\n      \n      pPos = pathPoints[i];\n      pPosNext = pathPoints[progrToCycle(i + 1, pathPoints.length)];\n      lenKor = unAv / length(pPos, pPosNext) + 0.0;\n      newPath.push(pPos);\n      newInTang.push([0, 0]);\n      newOutTang.push([0, 0]);\n      for (var j = 0; j < Math.round((sl - 1) / lenKor); j++) {\n        if (i < pathPoints.length) {\n          distPnt.push({ state: false });\n          newPath.push(interp((1 / sl) * ((j + 1) * lenKor), pPos, pPosNext));\n          newInTang.push([0, 0]);\n          newOutTang.push([0, 0]);\n        }\n      }\n    }\n  }\n  var det3 = wave3 ? ((Math.PI * 5) / sinFreq3) * newPath.length : 1;\n  var t = (time * pathSpd + pathOff + inPoint - (startTime + inPoint)) * Math.PI * 2;\n  for (var i = 0; i < newPath.length; i++) {\n    progr = i / newPath.length;\n    var phaseOffVal = progr + 0.001 - phaseOffset;\n    var phaseOff = phaseCycle ? progrToCycle(phaseOffVal, 1) : phaseOffVal;\n    var normOnPath = lProp.normalOnPath(phaseOff);\n    if (rotOff) normDir = dot([rotCos, rotSin], normOnPath);\n    progr = cycleOffset ? progrToCycle(progr - off, 1) : progr - off;\n    if (progr >= startPoint && progr <= endPoint) {\n      var sin1 = wave1 ? sinMath(wavesParams[0], i, t, progr) : 0;\n      var sin2 = wave2 ? sinMath(wavesParams[1], i, t, progr) : 0;\n      var sinComb = sin1 + sin2 - wavesParams[0].sinAmp * offPath;\n\n\n      if (easIn == 0 && easOut == 0) {\n        var e1 = sinComb;\n        var e2 = sinComb;\n      } else {\n        easIn == 0 ? (easIn -= 1) : easIn;\n        var e1 = ease( progr, startPoint + easIn, startPoint, sinComb * easeEase, sinComb );\n        var e2 = ease( progr, endPoint, endPoint - easOut, sinComb, sinComb * easeEase );\n      }\n\n      var sinCombEase = (e1 + e2 - sinComb) * normDir;\n      var normDir2 =\n        xPhaseAlt != 0 || yPhaseAlt != 0\n          ? dot([sinCombEase, -sinCombEase], normOnPath)\n          : 1;\n      newPath[i] +=\n        [normOnPath[0] * xPhase, normOnPath[1] * yPhase] * sinCombEase * pathAmp +\n        [xPhaseAlt, yPhaseAlt] * normDir2;\n    }\n    if (wave3) {\n      var tSpd3 = spd3 == 0 ? 0 : t / spd3;\n      var sin3 = Math.sin(tSpd3 + i / det3 + offSin3) * sinAmp3 * pathAmp; // Math.PI / 2\n      newPath[i] += normOnPath * sin3;\n    }\n  }\n  if (curvedStyle) {\n    for (var j = 0; j < newPath.length; j++) {\n      var corCurv = !circCorr ? -1 : 0;\n      if (distPnt[j].state) continue;\n      if (j == corCurv || j == newPath.length - circCorr) {\n        newInTang[j] = [0, 0];\n        newOutTang[j] = [0, 0];\n      } else {\n        var shiftB = progrToCycle(j - 1, newPath.length);\n        var shiftA = progrToCycle(j + 1, newPath.length);\n        var angCurve = sub(newPath[shiftA], newPath[shiftB]);\n        var pntDistIn = length(newPath[j], newPath[shiftB]) / 3.14;\n        var pntDistOut = length(newPath[j], newPath[shiftA]) / 3.14;\n        atanTmp = Math.atan2(angCurve[1], angCurve[0]);\n        cosXtang = Math.cos(atanTmp);\n        sinYtang = Math.sin(atanTmp);\n        newInTang[j] = [cosXtang, sinYtang] * -pntDistIn;\n        newOutTang[j] = [cosXtang, sinYtang] * pntDistOut;\n      }\n    }\n  }\n} else {\n  newPath = pathPoints;\n  newInTang = inTang;\n  newOutTang = outTang;\n}\ncreatePath(newPath, newInTang, newOutTang, is_closed);\n';
  } else {
    if (a == "simple") {
      c =
        '// Waves on Path\nfunction progrToCycle(val, cyc) {\n  return ((val % cyc) + cyc) % cyc;\n}\n\nfunction sinMath(prop, i, t) {\n  var tSpd = prop.spd == 0 ? 0 : t / prop.spd;\n  return sin = Math.sin(tSpd + (i / (prop.sinDet)) * 0.9865 - prop.offSin) * prop.ampForm;\n}\n\nvar l = thisLayer;\nvar lProp = thisProperty;\nvar cycleOffset = l.effect("Wave On Path Simple")("Cycle Offset").value;\nvar is_closed = l.effect("Wave On Path Simple")("Closed");\nvar curvedStyle = l.effect("Wave On Path Simple")("Curve Waves").value;\n\nvar pathOff = l.effect("' +
        b +
        '")("Offset") / 100;\nvar pathAmp = l.effect("' +
        b +
        '")("Amplitude");\nvar pathFreq = l.effect("' +
        b +
        '")("Frequency");\nvar pathSpd = l.effect("' +
        b +
        '")("Speed");\n\nvar pathPoints = lProp.points();\nvar inTang = lProp.inTangents();\nvar outTang = lProp.outTangents();\nvar newPath = [];\nvar newInTang = [];\nvar newOutTang = [];\nvar f = thisComp.frameDuration;\nvar num = l.effect("Wave On Path Simple")("Points Number");\nvar startPoint = l.effect("Wave On Path Simple")("Start") / 100;\nvar endPoint = l.effect("Wave On Path Simple")("End") / 100;\nvar off = l.effect("Wave On Path Simple")("Offset") / 100;\nvar easIn = l.effect("Wave On Path Simple")("Ease Start") / 100;\nvar easOut = l.effect("Wave On Path Simple")("Ease End") / 100;\nvar easeEase = l.effect("Wave On Path Simple")("Ease Smoother") / 100;\nvar xPhase = l.effect("Wave On Path Simple")("X Phase");\nvar yPhase = l.effect("Wave On Path Simple")("Y Phase");\nvar circCorr = !lProp.isClosed();\nvar offPath = l.effect("Wave On Path Simple")("Offset Path");\nvar wavesNames = "Wave1";\nvar nameIter = 0;\nvar wavesParams = {\n  sinAmp: l.effect("Wave On Path Simple")(wavesNames + " Amplitude (px)") / 2,\n  sinFreq: l.effect("Wave On Path Simple")(wavesNames + " Freq"),\n  offSin: l.effect("Wave On Path Simple")(wavesNames + " Offset") * f * 1.57,\n  spd: l.effect("Wave On Path Simple")(wavesNames + " Speed (sec)"),\n};\nwavesParams.ampForm = wavesParams.sinAmp;\nwavesParams.sinDet = (Math.PI * num * 5) / wavesParams.sinFreq / pathFreq;\n\nfor (var i = 0; i < num + circCorr; i++) {\n  var progr = i / num;\n  var pntOnPath = lProp.pointOnPath(progr);\n  newPath.push(pntOnPath);\n}\n\n\nvar t = (time * pathSpd + pathOff + inPoint - (startTime + inPoint)) * Math.PI * 2;\n\nfor (var i = 0; i < newPath.length; i++) {\n  progr = i / newPath.length;\n\n  var normOnPath = lProp.normalOnPath(progr + 0.001);\n  progr = cycleOffset ? progrToCycle(progr - off, 1) : progr - off;\n  \n  if (progr >= startPoint && progr <= endPoint) {\n    var sinComb = sinMath(wavesParams, i, t) - wavesParams.sinAmp * offPath;\n    if (easIn == 0 && easOut == 0) {\n      var e1 = sinComb;\n      var e2 = sinComb;\n    } else {\n      easIn == 0 ? (easIn -= 1) : easIn;\n      var e1 = ease( progr, startPoint + easIn, startPoint, sinComb * easeEase, sinComb );\n      var e2 = ease( progr, endPoint, endPoint - easOut, sinComb, sinComb * easeEase );\n    }\n\n    newPath[i] +=\n      [normOnPath[0] * xPhase, normOnPath[1] * yPhase] * (e1 + e2 - sinComb);\n  }\n}\n\nif (curvedStyle) {\n  for (var j = 0; j < newPath.length; j++) {\n    var corCurv = !circCorr ? -1 : 0;\n    if (j == corCurv || j == newPath.length - circCorr) {\n      newInTang[j] = [0, 0];\n      newOutTang[j] = [0, 0];\n    } else {\n      var shiftB = progrToCycle(j - 1, newPath.length);\n      var shiftA = progrToCycle(j + 1, newPath.length);\n      var angCurve = sub(newPath[shiftA], newPath[shiftB]);\n      var pntDistIn = length(newPath[j], newPath[shiftB]) / 3.14;\n      var pntDistOut = length(newPath[j], newPath[shiftA]) / 3.14;\n\n      var tangAng = Math.atan2(angCurve[1], angCurve[0]);\n\n      cosXtang = Math.cos(tangAng);\n      sinYtang = Math.sin(tangAng);\n\n      newInTang[j] = [cosXtang, sinYtang] * -pntDistIn;\n      newOutTang[j] = [cosXtang, sinYtang] * pntDistOut;\n    }\n  }\n}\n\ncreatePath(newPath, newInTang, newOutTang, is_closed);\n\n';
    }
  }
  return c;
}
function customControllers(g, h, j) {
  var f = app.project.activeItem;
  var e = f.selectedLayers;
  if (e.length == 0) {
    switch (g) {
      case "morph":
        return addMorphController_classic();
      case "pos":
        return addPosController();
    }
  } else {
    var d = [];
    for (var c = 0; c < e.length; c += 1) {
      var i = e[c];
      var k = i.selectedProperties;
      for (var b = 0; b < k.length; b += 1) {
        var a = k[b];
        if (
          a.matchName == "ADBE Position" ||
          a.matchName == "ADBE Vector Position" ||
          a.matchName == "ADBE Vector Shape"
        ) {
          d.push(a);
        }
      }
      if (j == true) {
        resetShape("fullReset");
      }
      for (var b = 0; b < d.length; b += 1) {
        var a = d[b];
        if (
          a.matchName == "ADBE Position" ||
          a.matchName == "ADBE Vector Position"
        ) {
          newCtrl = addPosController(i);
          a.expression =
            'value + thisComp.layer("' + newCtrl.name + '").position';
        } else {
          if (a.matchName == "ADBE Vector Shape") {
            addPathControllers(i, h, "handlOn");
          }
        }
      }
    }
  }
}
function getUnivSize_visController(b) {
  var a = app.project.activeItem;
  switch (b) {
    case "mid":
      return a.height / 32;
    case "small":
      return a.height / 64;
  }
}
function addPathControllers(p, m, t) {
  var f = app.project.activeItem;
  if (p === null) {
    var i = f.selectedLayers;
  } else {
    var i = [p];
  }
  for (var q = 0; q < i.length; q += 1) {
    var p = i[q];
    p.name = searchSimilarName(f, p);
    var s = getUnivSize_visController("small");
    arrayProperty = p.selectedProperties;
    if (arrayProperty.length == 0) {
      arrayProperty = scanPropGroupProperties_VisCtrl(
        p,
        [],
        "ADBE Vector Shape",
      );
    }
    for (var c = 0; c < arrayProperty.length; c += 1) {
      if (
        arrayProperty[c].parentProperty.matchName != "ADBE Vector Shape - Group"
      ) {
        continue;
      }
      var j = getPropPath_visualController(arrayProperty[c]);
      var b = [];
      for (var l = 0; l < arrayProperty[c].value.vertices.length; l += 1) {
        var e =
          p.name + ": " + arrayProperty[c].parentProperty.name + ": p" + l + 1;
        var r = makeEllipse(
          e,
          [s, s],
          "fill",
          1,
          "purple",
          [0, 0],
          null,
          "Rect Controller",
        );
        r[0].position.setValue([0, 0]);
        r[0].position.expression =
          'var srcLayer = thisComp.layer("' +
          p.name +
          '");\nvar srcPath = srcLayer' +
          j +
          ".points()[" +
          l +
          "];\nvalue + srcLayer.toComp(srcPath);";
        if (t == "handlOn") {
          var g = new Shape();
          g.vertices = [
            [0, 0],
            [0, 0],
          ];
          g.closed = false;
          if (m == "better") {
            var h =
              "function recursiveRotation(propSum, lay) {\n    if (lay.hasParent) { propSum += recursiveRotation(lay.parent.rotation, lay.parent); } return propSum;\n}\nfunction recursiveScale(propSum, lay) {\n    if (lay.hasParent) { propSum *= recursiveRotation(lay.parent.scale[0] / 100, lay.parent); } return propSum;\n}\n";
            var d =
              "var rad = Math.atan2(srcPath[1], srcPath[0]);\nvar rot = degreesToRadians(recursiveRotation(srcLayer.rotation, srcLayer));\nvar len = length([0,0], srcPath) * recursiveScale(srcLayer.scale[0] / 100, srcLayer);\nvar cosY = Math.cos(rad + rot);\nvar sinX = Math.sin(rad + rot);\norigPoints[1] = [cosY, sinX] * len;";
          } else {
            var h = "";
            var d = "origPoints[1] = srcPath;";
          }
          var o = [
            g,
            h +
              'var srcLayer = thisComp.layer("' +
              p.name +
              '");\nvar origPoints = thisProperty.points();\nvar srcPath = srcLayer' +
              j +
              ".outTangents()[" +
              l +
              "];\n" +
              d +
              "\ncreatePath(origPoints, [[0,0],[0,0]], [[0,0],[0,0]], false);",
          ];
          var a = addShapeGroup(r[0], "Out Tang");
          addPath(a, o[0], o[1], "Path Group 1");
          addStroke(a, getColor("purple"), "", 3, "");
          var o = [
            g,
            h +
              'var srcLayer = thisComp.layer("' +
              p.name +
              '");\nvar origPoints = thisProperty.points();\nvar srcPath = srcLayer' +
              j +
              ".inTangents()[" +
              l +
              "];\n" +
              d +
              "\ncreatePath(origPoints, [[0,0],[0,0]], [[0,0],[0,0]], false);",
          ];
          var a = addShapeGroup(r[0], "In Tang");
          addPath(a, o[0], o[1], "Path Group 1");
          addStroke(a, getColor("purple"), "", 3, "");
        }
        r[0].label = 2;
        r[0].guideLayer = true;
        b.push(r[0]);
      }
      for (var n = b.length - 1; n >= 0; n--) {
        b[n].moveBefore(p);
        b[n].selected = false;
      }
    }
  }
}
function addMorphController_pathRig(t) {
  var f = app.project.activeItem;
  var e = layerNumIncrement_VisCtrl("Path Range_");
  var c = getUnivSize_visController("mid");
  if (t === null || t === undefined) {
    var j = f.selectedLayers;
  } else {
    var j = [t];
  }
  for (var q = 0; q < j.length; q += 1) {
    var p = j[q];
    if (j.length > 0) {
      var k = p.parent;
      p.parent = null;
      var m = p.position.value;
      p.parent = k;
    } else {
      var m = [f.width, f.height] / 2;
    }
    if (p.effect("Path Delay") !== null) {
      var s = p.effect("Path Delay");
      var a = "Path Delay";
    } else {
      if (p.effect("Path Bend") !== null) {
        var s = p.effect("Path Bend");
        var a = "Path Bend";
      } else {
        alert("Select the layer with Path Delay or Path Bend Effect.");
        var s = null;
        continue;
      }
    }
    if (s !== null) {
      var i = [s("Range In").value, s("Range In").value];
      var d = [s("Range Out").value, s("Range Out").value];
      var n =
        "val = thisComp.layer(\'" +
        p.name +
        "\').effect(\'" +
        a +
        "\')(\'Range In\');\n[val, val]";
      var h =
        "val = thisComp.layer(\'" +
        p.name +
        "\').effect(\'" +
        a +
        "\')(\'Range Out\');\n[val, val]";
      var o =
        "var l = thisComp.layer(\'" + p.name + "\');\nl.toComp(l.anchorPoint)";
      var l =
        "var l = thisComp.layer(\'" +
        p.name +
        "\');\nfunction recursiveProp(propSum, lay) {\n    if (lay.hasParent) { propSum *= recursiveProp(lay.parent.scale.value[0]/100, lay.parent); } return propSum;}\nrecursScale = recursiveProp(l.scale[0] / 100, l);\nvalue * recursScale;";
    } else {
      var i = [100, 100];
      var d = [c, c];
      var n = "";
      var h = "";
      var o = "";
    }
    var g = layerNumIncrement_VisCtrl(e);
    var r = makeEllipse(g, i, "stroke", 2, "notTrueBlack", m, null, "circle1");
    parametricShape(r[1], "Size", null, n);
    var b = addShapeGroup(r[0], "Circle Range");
    addEllipse(b, d, h);
    addStroke(b, getColor("notTrueBlack"), "", 2, "");
    r[0].position.expression = o;
    r[0].scale.expression = l;
    r[0].label = 1;
    r[0].selected = false;
    r[0].moveBefore(p);
    r[0].guideLayer = true;
    r[0].locked = true;
    p.selected = true;
  }
}
function addMorphController_classic() {
  var g = app.project.activeItem;
  var c = layerNumIncrement_VisCtrl("2D_Morph_Controller");
  var f = getUnivSize_visController("mid");
  var k = [g.width, g.height] / 2;
  var e = layerNumIncrement_VisCtrl("P1_");
  var b = layerNumIncrement_VisCtrl("P2_");
  var l = makeEllipse(e, [f, f], "fill", 1, "notTrueBlack", k, null, "circle1");
  var i = addShapeGroup(l[0], "Circle Range");
  addEllipse(i, [100, 100], 's = effect("Length")(1);\n[s, s]');
  addStroke(i, getColor("notTrueBlack"), "", 1, "");
  var d = makeEllipse(b, [f, f], "fill", 1, "red", k, null, "circle1");
  d[0].position.setValue(d[0].position.value + [0, 100]);
  d[0].parent = l[0];
  var a = new Shape();
  a.vertices = [
    [0, 0],
    [0, 0],
  ];
  a.closed = false;
  var h = [
    a,
    'var nullLayer = effect("Layer Control")(1).name;\nvar origPoints = thisProperty.points();\nl = thisComp.layer(nullLayer);\norigPoints[1] = fromCompToSurface(l.toComp(l.anchorPoint));\ncreatePath(origPoints, thisProperty.inTangents(), thisProperty.outTangents(), thisProperty.isClosed());',
  ];
  var j = addShapeGroup(d[0], "Base Path");
  addPath(j, h[0], h[1], "Path Group 1");
  addStroke(j, getColor("notTrueBlack"), "", 1, "");
  addTrimPaths(j, 10, "", 90, "");
  addSlider_VisCtrl("layer", d[0], "", l[0].index, "");
  addSlider_VisCtrl("slider", l[0], "Length", 200, "");
}
function addPosController(i) {
  var h = app.project.activeItem;
  var b = h.layers.addNull();
  var d = layerNumIncrement_VisCtrl("2D_Controller");
  var c = "2D_Controller" + d;
  b.name = c + "_Null1";
  b.label = 0;
  var f = getUnivSize_visController("mid");
  var k = [h.width, h.height] / 2;
  var e = makeRect(c, [f, f], "fill", "red", k, null, "Rect Controller");
  e[0].parent = b;
  e[0].label = 2;
  e[0].guideLayer = true;
  shapeTransform(
    e[1],
    "Scale",
    null,
    'value / (parent.scale[0]/100) * (effect("Size")(1)/100)',
  );
  var a = makeRect(c, [0, f], null, "notTrueBlack", [0, 0], e[0], "Line1")[1];
  addStroke(
    a,
    getColor("notTrueBlack"),
    'thisComp.layer("' + c + '").effect("Color")(1);',
    1,
    'value / (parent.scale[0]/100) * (effect("Size")(1)/100)',
  );
  shapeTransform(a, "Position", null, "value - transform.position");
  parametricShape(
    a,
    "Size",
    null,
    "[value[0], Math.abs(transform.position[1])]",
  );
  parametricShape(
    a,
    "Position",
    null,
    "value + [0, transform.position[1] / 2]",
  );
  var g = makeRect(c, [f, 0], null, "notTrueBlack", [0, 0], e[0], "Line2")[1];
  addStroke(
    g,
    getColor("notTrueBlack"),
    'thisComp.layer("' + c + '").effect("Color")(1);',
    1,
    'value / (parent.scale[0]/100) * (effect("Size")(1)/100)',
  );
  shapeTransform(g, "Position", null, "value - transform.position");
  parametricShape(
    g,
    "Size",
    null,
    "[Math.abs(transform.position[0]), value[1]]",
  );
  parametricShape(g, "Position", null, "value + transform.position[0] / 2");
  var j = makeRect(
    c,
    [200, 200],
    null,
    "red",
    [0, 0],
    e[0],
    "Range Rect Controller",
  )[1];
  addEllipse(
    j,
    [0, 0],
    'if (effect("Range Type")(1) == 0) { r = effect("Range")(1);} else {r = 0;}\n[r, r]',
    [0, 0],
    "",
  );
  addStroke(
    j,
    getColor("notTrueBlack"),
    'thisComp.layer("' + c + '").effect("Color")(1);',
    1,
    'value / (parent.scale[0]/100) * (effect("Size")(1)/100)',
  );
  parametricShape(
    j,
    "Size",
    null,
    'if (effect("Range Type")(1) == 1) { r = effect("Range")(1);} else {r = 0;}\n[r, r]',
  );
  shapeTransform(j, "Position", null, "value - transform.position");
  addSlider_VisCtrl("color", e[0], "Color", getColor("notTrueBlack"), "");
  addSlider_VisCtrl("slider", e[0], "Size", 100, "");
  addSlider_VisCtrl("slider", e[0], "Range Type", 0, "");
  addSlider_VisCtrl("slider", e[0], "Range", 0, "");
  return e[0];
}
function getPropPath_visualController(c) {
  var d = "";
  var a = c.propertyDepth;
  for (var b = 1; b <= a; b += 1) {
    if (c.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
      d = '("' + c.name + '")' + d;
    } else {
      if (c.matchName == "ADBE Effect Parade") {
        d = ".effect" + d;
      } else {
        d = '("' + c.matchName + '")' + d;
      }
    }
    c = c.parentProperty;
  }
  return d;
}
function addSlider_VisCtrl(d, c, b, f, e) {
  if (!c.Effects.property(b)) {
    if (d == "slider") {
      var a = c.Effects.addProperty("ADBE Slider Control");
      a.property(1).setValue(f);
      a.property(1).expression = e;
    } else {
      if (d == "checkbox") {
        var a = c.Effects.addProperty("ADBE Checkbox Control");
        a.property(1).setValue(f);
      } else {
        if (d == "color") {
          var a = c.Effects.addProperty("ADBE Color Control");
          a.property(1).setValue(f);
        } else {
          if (d == "layer") {
            var a = c.Effects.addProperty("ADBE Layer Control");
            a.property(1).setValue(f);
          }
        }
      }
    }
    a.name = b;
  }
}
function getColor(a) {
  if (a == "notTrueBlack") {
    var b = [0.1, 0.1, 0.1];
  } else {
    if (a == "red") {
      var b = [0.6796875, 0.21875, 0.21875];
    } else {
      if (a == "purple") {
        var b = [0.5546875, 0.36328125, 0.97265625];
      }
    }
  }
  return b;
}
function layerNumIncrement_VisCtrl(b) {
  var a = app.project.activeItem;
  var c = 1;
  while (a.layer(b + c)) {
    c++;
  }
  return b + c;
}
function scanPropGroupProperties_VisCtrl(e, c, a) {
  for (var b = 1; b <= e.numProperties; b += 1) {
    var d = e.property(b);
    if (d.propertyType === PropertyType.PROPERTY && d.matchName == a) {
      c.push(d);
    } else {
      if (
        d.propertyType === PropertyType.INDEXED_GROUP ||
        d.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties_VisCtrl(d, c, a);
      }
    }
  }
  return c;
}
function resetShape(e) {
  var a = app.project.activeItem;
  layersArray = a.selectedLayers;
  findAndConvertParamShapes("experimental", true);
  for (var b = 0; b < layersArray.length; b += 1) {
    var c = layersArray[b];
    var d = null;
    if (c.parent) {
      d = c.parent;
      c.parent = null;
    }
    resetPathProps_resetShape(c, e);
    c.parent = d;
  }
}
function resetPathProps_resetShape(q, l) {
  var w = collectParentArr(q, [], "in");
  var r = q.anchorPoint.value;
  var m = [r[0], r[1]];
  var j = scanPropGroupProperties_resetShape(q, [], "ADBE Vector Shape");
  var u = scanPropGroupProperties_resetShape(
    q,
    [],
    "ADBE Vector Ellipse Position",
  );
  var v = scanPropGroupProperties_resetShape(
    q,
    [],
    "ADBE Vector Rect Position",
  );
  var s = scanPropGroupProperties_resetShape(
    q,
    [],
    "ADBE Vector Star Position",
  );
  var t = u.concat(v);
  t = t.concat(s);
  var p = j.concat(t);
  var e = scanPropGroupProperties_resetShape(q, [], "ADBE Vector Stroke Width");
  var g = scanPropGroupProperties_resetShape(
    q,
    [],
    "ADBE Vector Grad Start Pt",
  );
  var b = scanPropGroupProperties_resetShape(q, [], "ADBE Vector Grad End Pt");
  var k = getGroupsLayerCenterOffset(p, q);
  var n = getGroupsTransformOffset(t, l);
  var y = getGroupsTransformOffset(j, l);
  var a = getGroupsTransformOffset(e, "report");
  var f = getGroupsTransformOffset(g, l);
  pointsOffset("grPos", p, y, m);
  for (var i = 0; i < g.length; i += 1) {
    var c = g[i].prop.value + f[i].posOff - [m[0], m[1]];
    var o = b[i].prop.value + f[i].posOff - [m[0], m[1]];
    var d = f[i].scOff;
    var h = f[i].rotOff;
    g[i].prop.setValue(polarRescale(c, d, h));
    b[i].prop.setValue(polarRescale(o, d, h));
  }
  resetTransformOffset(t, l);
  resetTransformOffset(j, l);
  resetProp(q.anchorPoint);
  pointsOffset("polar", p, y, m);
  pointsOffset("layPos", p, y, m, k);
  disablePropsGroups_resetShape(p, null);
  offData = { rotOff: q.rotation.value, scOff: q.scale.value };
  for (var i = 0; i < t.length; i += 1) {
    t[i].prop.setValue(t[i].prop.value + n[i].posOff - m);
  }
  if (l == "fullReset") {
    for (var i = 0; i < t.length; i += 1) {
      t[i].prop
        .propertyGroup(3)("ADBE Vector Transform Group")("ADBE Vector Rotation")
        .setValue(offData.rotOff);
      t[i].prop
        .propertyGroup(3)("ADBE Vector Transform Group")("ADBE Vector Scale")
        .setValue([offData.scOff[0], offData.scOff[1]]);
    }
    pointsOffset("layerReset", p, offData);
    resetProp(q.scale);
    resetProp(q.rotation);
  }
  for (var i = 0; i < e.length; i += 1) {
    e[i].prop.setValue(
      e[i].prop.value * (a[i].scOff[0] / 100) * (offData.scOff[0] / 100),
    );
  }
  for (var i = 0; i < g.length; i += 1) {
    var c = g[i].prop.value;
    var o = b[i].prop.value;
    var d = offData.scOff;
    var h = offData.rotOff;
    g[i].prop.setValue(polarRescale(c, d, h));
    b[i].prop.setValue(polarRescale(o, d, h));
  }
  collectParentArr(q, w, "out");
}
function findAndConvertParamShapes(e, g) {
  var a = app.project.activeItem;
  if (a === null) {
    return null;
  }
  layersArray = a.selectedLayers;
  var d = true;
  for (var b = 0; b < layersArray.length; b += 1) {
    var c = layersArray[b];
    scanPropWithoutGroup(c);
    var f = scanParametricProp(c, []);
    if (g) {
      d =
        f.length > 0
          ? confirm(
              "The layer includes parametric shapes, convert them to path?",
            )
          : false;
    }
    if (d) {
      convertFigToPath(f, e);
    }
    unselectProp_resetShape(c);
  }
}
function polarRescale(f, h, b) {
  var e = Math.sqrt(f[0] * f[0] + f[1] * f[1]);
  var a = Math.atan2(-f[1], -f[0]);
  var g = Math.cos(a + Math.PI + b * (Math.PI / 180));
  var c = Math.sin(a + Math.PI + b * (Math.PI / 180));
  var d = [g, c] * e;
  return [d[0] * (h[0] / 100), d[1] * (h[1] / 100)];
}
function getGroupsLayerCenterOffset(a, c) {
  var e = [];
  for (var d = 0; d < a.length; d += 1) {
    var f = a[d].prop;
    if (f.matchName != "ADBE Vector Shape") {
      continue;
    }
    disablePropsGroups_resetShape(a, f);
    var b = findCenterOffset_resetShape(c, 0);
    e.push(b);
  }
  disablePropsGroups_resetShape(a, null);
  return e;
}
function getGroupsTransformOffset(a, d) {
  var c = [];
  for (var b = 0; b < a.length; b += 1) {
    var e = a[b].prop;
    c.push(getPropTransformOffset(e, d));
  }
  return c;
}
function pointsOffset(i, n, h, j, o) {
  var t = [];
  for (var k = 0; k < n.length; k += 1) {
    var d = n[k].prop;
    if (d.matchName != "ADBE Vector Shape") {
      continue;
    }
    var m = d.propertyDepth;
    var v = d.propertyGroup(m);
    if (i == "layPos") {
      disablePropsGroups_resetShape(n, d);
      var p = findCenterOffset_resetShape(v, 0);
      if (n[k].group) {
        p = t[k - 1];
      }
      t.push(p);
    }
    if (i == "layerReset") {
      var c = [0, 0];
      var s = h.scOff;
      var f = h.rotOff;
    } else {
      var c = h[k].posOff;
      var s = h[k].scOff;
      var f = h[k].rotOff;
    }
    if (d.expressionEnabled) {
      saveExprState = true;
      d.expressionEnabled = false;
    } else {
      saveExprState = false;
    }
    if (d.numKeys > 0) {
      for (var b = 1; b <= d.numKeys; b += 1) {
        var g = new Shape();
        var l = [];
        var r = [];
        var a = [];
        for (var u = 0; u < d.value.vertices.length; u += 1) {
          var q = d.valueAtTime(d.keyTime(b), true);
          var e = q.vertices[u];
          if (i == "grPos") {
            l.push(e + c - j);
            r.push(q.inTangents[u]);
            a.push(q.outTangents[u]);
          } else {
            if (i == "layPos") {
              l.push(e + [p[0], p[1]] - [o[k][0], o[k][1]]);
              r.push(q.inTangents[u]);
              a.push(q.outTangents[u]);
            } else {
              if (i == "polar" || i == "layerReset") {
                l.push(polarRescale(e, s, f));
                r.push(polarRescale(q.inTangents[u], s, f));
                a.push(polarRescale(q.outTangents[u], s, f));
              }
            }
          }
        }
        g.vertices = l;
        g.inTangents = r;
        g.outTangents = a;
        g.closed = d.value.closed;
        d.setValueAtKey(b, g);
      }
    } else {
      var g = new Shape();
      var l = [];
      var r = [];
      var a = [];
      for (var u = 0; u < d.value.vertices.length; u += 1) {
        var e = d.value.vertices[u];
        if (i == "grPos") {
          l.push(e + c - j);
          r.push(d.value.inTangents[u]);
          a.push(d.value.outTangents[u]);
        } else {
          if (i == "layPos") {
            l.push(e + [p[0], p[1]] - [o[k][0], o[k][1]]);
            r.push(d.value.inTangents[u]);
            a.push(d.value.outTangents[u]);
          } else {
            if (i == "polar" || i == "layerReset") {
              l.push(polarRescale(e, s, f));
              r.push(polarRescale(d.value.inTangents[u], s, f));
              a.push(polarRescale(d.value.outTangents[u], s, f));
            }
          }
        }
      }
      g.vertices = l;
      g.inTangents = r;
      g.outTangents = a;
      g.closed = d.value.closed;
      d.setValue(g);
    }
    if (saveExprState == true) {
      d.expressionEnabled = true;
    }
  }
}
function getPropTransformOffset(f, g) {
  var a = f.propertyDepth;
  var b = [0, 0];
  var h = [1, 1];
  var c = 0;
  for (var e = 1; e <= a; e += 1) {
    if (
      f.parentProperty.matchName == "ADBE Root Vectors Group" ||
      (f.parentProperty.matchName == "ADBE Vectors Group" &&
        f(1).matchName == "ADBE Vector Blend Mode")
    ) {
      if (f(3).matchName === "ADBE Vector Transform Group") {
        b -= f(3)("ADBE Vector Anchor").value;
        b += f(3)("ADBE Vector Position").value;
        h = [
          h[0] * (f(3)("ADBE Vector Scale").value[0] / 100),
          h[1] * (f(3)("ADBE Vector Scale").value[1] / 100),
        ];
        c += f(3)("ADBE Vector Rotation").value;
      }
    }
    f = f.parentProperty;
  }
  var d = { posOff: b, rotOff: c, scOff: h * 100 };
  return d;
}
function resetProp(g) {
  var c = 0;
  if (g.matchName == "ADBE Scale" || g.matchName == "ADBE Vector Scale") {
    c = 100;
  }
  if (g.numKeys > 0) {
    var f = g.valueAtTime(g.keyTime(1), true);
    for (var b = 1; b <= g.numKeys; b += 1) {
      if (g.matchName == "ADBE Scale" || g.matchName == "ADBE Vector Scale") {
        g.setValueAtKey(b, g.valueAtTime(g.keyTime(b), true) - f + [100, 100]);
      } else {
        g.setValueAtKey(b, g.valueAtTime(g.keyTime(b), true) - f);
      }
    }
  } else {
    if (g.propertyValueType === PropertyValueType.OneD) {
      g.setValue(c);
    } else {
      var a = [];
      for (var e = 0; e < g.value.length; e += 1) {
        a.push(c);
      }
      g.setValue(a);
    }
  }
}
function resetTransformOffset(b, e) {
  if (b.length === undefined || b.length === null) {
    b = [b];
  }
  for (var c = 0; c < b.length; c += 1) {
    if (b[c] instanceof Object) {
      currentProp = b[c].prop;
    } else {
      currentProp = b[c];
    }
    var a = currentProp.propertyDepth;
    var f = currentProp;
    for (var d = 1; d <= a; d += 1) {
      if (
        f.parentProperty.matchName == "ADBE Root Vectors Group" ||
        (f.parentProperty.matchName == "ADBE Vectors Group" &&
          f(1).matchName == "ADBE Vector Blend Mode")
      ) {
        resetProp(f(3)("ADBE Vector Anchor"));
        resetProp(f(3)("ADBE Vector Position"));
      }
      f = f.parentProperty;
    }
    f = currentProp;
    for (var d = 1; d <= a; d += 1) {
      if (
        f.parentProperty.matchName == "ADBE Root Vectors Group" ||
        (f.parentProperty.matchName == "ADBE Vectors Group" &&
          f(1).matchName == "ADBE Vector Blend Mode")
      ) {
        f(3)("ADBE Vector Scale").setValue([100, 100]);
        resetProp(f(3)("ADBE Vector Rotation"));
      }
      f = f.parentProperty;
    }
  }
}
function scanParametricProp(d, a) {
  for (var b = 1; b <= d.numProperties; b += 1) {
    var c = d.property(b);
    if (
      c.matchName == "ADBE Vector Ellipse Position" ||
      c.matchName == "ADBE Vector Rect Position" ||
      c.matchName == "ADBE Vector Star Position"
    ) {
      a.push(c);
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanParametricProp(c, a);
      }
    }
  }
  return a;
}
function scanPropWithoutGroup(e) {
  for (var c = 1; c <= e.numProperties; c += 1) {
    var d = e.property(c);
    if (
      d.matchName == "ADBE Vector Shape" ||
      d.matchName == "ADBE Vector Ellipse Position" ||
      d.matchName == "ADBE Vector Rect Position" ||
      d.matchName == "ADBE Vector Star Position"
    ) {
      var b = d.propertyGroup(d.propertyDepth);
      if (d.propertyGroup(3).matchName == "ADBE Vector Layer") {
        var a = d.propertyGroup(1).propertyIndex;
        d.propertyGroup(1).selected = true;
        app.executeCommand(3741);
        b("ADBE Root Vectors Group")(a).selected = false;
        break;
      }
    } else {
      if (
        d.propertyType === PropertyType.INDEXED_GROUP ||
        d.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropWithoutGroup(d);
      }
    }
  }
}
function scanPropGroupProperties_resetShape(c, h, j) {
  for (var e = 1; e <= c.numProperties; e += 1) {
    var a = c.property(e);
    if (a.propertyType === PropertyType.PROPERTY && a.matchName == j) {
      var d = "";
      var f = a.propertyGroup(3);
      for (var b = 1; b <= a.propertyDepth - 3; b += 1) {
        d += f.propertyIndex + ":";
        f = f.parentProperty;
      }
      h.push({ depth: d, prop: a });
      var g = h.length > 1 && h[h.length - 2].depth == d ? true : false;
      h[h.length - 1].group = g;
    } else {
      if (
        a.propertyType === PropertyType.INDEXED_GROUP ||
        a.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropGroupProperties_resetShape(a, h, j);
      }
    }
  }
  return h;
}
function findCenterOffset_resetShape(b, c) {
  lPar = b.parent;
  b.parent = null;
  var e = b.sourceRectAtTime(c, false).width;
  var h = b.sourceRectAtTime(c, false).height;
  var f = b.sourceRectAtTime(c, false).left;
  var g = b.sourceRectAtTime(c, false).top;
  var a = b.anchorPoint.valueAtTime(c, false);
  var d = a - ([f, g] + [e, h] / 2);
  b.parent = lPar;
  return d;
}
function disablePropsGroups_resetShape(a, d) {
  for (var c = 0; c < a.length; c += 1) {
    var e = a[c].prop;
    var b = e.propertyGroup(3);
    if (d == null || b == d.propertyGroup(3)) {
      b.enabled = true;
    } else {
      b.enabled = false;
    }
  }
}
function convertFigToPath(b, e) {
  for (var j = 0; j < b.length; j += 1) {
    var g = b[j].propertyGroup(1);
    var k = g.propertyGroup(2);
    if (e == "classic") {
      g.selected = true;
      app.executeCommand(4162);
      g.remove();
      k.selected = false;
    } else {
      var c = "";
      var l = "";
      if (g.matchName == "ADBE Vector Shape - Rect") {
        var i = g("ADBE Vector Rect Size").value;
        var d = g("ADBE Vector Rect Position").value;
        c = "Rect";
        l = "Path Rectangle";
      } else {
        if (g.matchName == "ADBE Vector Shape - Ellipse") {
          var i = g("ADBE Vector Ellipse Size").value;
          var d = g("ADBE Vector Ellipse Position").value;
          c = "Ell";
          l = "Path Ellipse";
        }
      }
      if (g.matchName == "ADBE Vector Shape - Star") {
        alert(
          "The layer includes star shapes that the script cannot reset, try to convert it to the path if you need",
        );
        continue;
      }
      g.remove();
      var a = new Shape();
      if (c == "Rect") {
        a.vertices = [
          [-i[0], -i[1]] / 2 + d,
          [i[0], -i[1]] / 2 + d,
          [i[0], i[1]] / 2 + d,
          [-i[0], i[1]] / 2 + d,
        ];
      } else {
        if (c == "Ell") {
          a.vertices = [
            [0, -i[1]] / 2 + d,
            [i[0], 0] / 2 + d,
            [0, i[1]] / 2 + d,
            [-i[0], 0] / 2 + d,
          ];
          var h = (8.8 * Math.PI) / 100;
          a.inTangents = [
            [-i[0] * h, 0],
            [0, -i[1] * h],
            [i[0] * h, 0],
            [0, i[1] * h],
          ];
          a.outTangents = [
            [i[0] * h, 0],
            [0, i[1] * h],
            [-i[0] * h, 0],
            [0, -i[1] * h],
          ];
        }
      }
      a.closed = true;
      var f = addPath_resetShape(k, a, "", l);
      f.moveTo(1);
    }
  }
}
function addPath_resetShape(a, b, e, c) {
  var d = a
    .property("ADBE Vectors Group")
    .addProperty("ADBE Vector Shape - Group");
  d.property("ADBE Vector Shape").setValue(b);
  d.property("ADBE Vector Shape").expression = e;
  d.name = c;
  return d;
}
function unselectProp_resetShape(c) {
  for (var a = 1; a <= c.numProperties; a += 1) {
    var b = c.property(a);
    if (b.selected) {
      b.selected = false;
    }
    if (
      b.propertyType === PropertyType.INDEXED_GROUP ||
      b.propertyType === PropertyType.NAMED_GROUP
    ) {
      unselectProp_resetShape(b);
    }
  }
}
function setLoopInOut(d) {
  var f = app.project.activeItem;
  var e = f.selectedLayers;
  for (var c = 0; c < e.length; c += 1) {
    var g = e[c];
    var i = g.selectedProperties;
    for (var b = 0; b < i.length; b += 1) {
      var a = i[b];
      var h = a.parentProperty.matchName == "ADBE Layer Overrides";
      if (a.parentProperty.propertyType === PropertyType.INDEXED_GROUP && !h) {
        continue;
      }
      if (a.numKeys == 0) {
        continue;
      }
      if (d == "cycle") {
        expr = "// loop\nx = loopIn() + loopOut() - value;\nx";
      } else {
        if (d == "pingpong") {
          expr =
            '// loop\nx = loopIn("pingpong") + loopOut("pingpong") - value;\nx';
        } else {
          if (d == "offset") {
            expr =
              '// loop\nx = loopIn("offset") + loopOut("offset") - value;\nx';
          } else {
            expr = "";
          }
        }
      }
      if (a.matchName == "ADBE Vector Shape") {
        exprMain =
          "if (numKeys > 1){\n    k1 = key(1).time;\n    kn = key(numKeys).time;\n    dur = kn - k1;\n    t0 = time - k1;\n    t = ( t0 % dur + dur ) % dur\n    nOff = (t0 / dur) % 1 == 0 ? 0.001 : 0;\n    n = Math.ceil((t0 / dur) + nOff)\n    if (pingpong == true && n%2 == 0){\n        valueAtTime(kn - t);\n    } else {\n        valueAtTime(t + k1);\n    }\n} else {\n    value;\n}";
        if (d == "cycle") {
          expr = "// loop\npingpong = false;\n" + exprMain;
        } else {
          if (d == "pingpong") {
            expr = "// loop\npingpong = true;\n" + exprMain;
          } else {
            expr = "";
          }
        }
      }
      a.expression = expr;
    }
  }
}
function expr2val(j) {
  var m = app.project.activeItem;
  layersArray = m.selectedLayers;
  var ae = [];
  var R = "// Len Rig";
  var E = "// Dependener";
  var A = "// Path Stretch";
  var ag = "// Speed Rig";
  var t = "// Waves on Path";
  var w = "// Path Delay";
  var C = "// Path Bend";
  var W = 0;
  var i = "Length Rig";
  var s = "Len Rig Slider";
  var q = "Length Rig Controllers";
  var p = "Speed Rig";
  var X = "Path Stretch";
  var r = "Wave On Path";
  var D = "Wave On Path Simple";
  var z = "Wave On Path Extra";
  var L = "Wave On Path Array";
  var aa = "Path Bend";
  var S = "Path Delay";
  var ab = "Path Delay Extra Params";
  var k = "Mid Path";
  var K = "Length_Rig";
  var ad = "Length_Rig_Slider";
  var u = "Length_Rig_Controllers";
  var l = "Speed_Rig";
  var Z = "Path_Stretch";
  var af = "Wave On Path";
  var d = "Wave On Path Simple";
  var f = "Wave_On_Path_Params";
  var Y = "Wave_On_Path_Array";
  var M = "Path_Bend";
  var y = "Path_Delay";
  var ac = "Path_Delay_Params";
  var B = "mid_path";
  var P = [K, ad, u, l, Z, af, d, f, Y, M, y, ac, B];
  for (var o = 0; o < layersArray.length; o += 1) {
    var H = layersArray[o];
    var n = H.selectedProperties;
    var e = false;
    if (n.length == 0) {
      n = scanPropExpressions_exprToValue(H, []);
      if (j == "valueSmart") {
        for (var a = 0; a < n.length; a += 1) {
          if (n[a].matchName == "ADBE Vector RoundCorner Radius") {
            n[a].parentProperty.remove();
            n = scanPropExpressions_exprToValue(H, []);
            a = 0;
          }
        }
        n = scanPropExpressions_exprToValue(H, []);
      }
    }
    for (var a = 0; a < n.length; a += 1) {
      var O = n[a];
      if (n[a].parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
        continue;
      }
      if (j == "value" || j == "valueSmart") {
        if (
          j == "valueSmart" &&
          O.expression.substring(0, R.length) !== R &&
          O.expression.substring(0, E.length) !== E &&
          O.expression.substring(0, ag.length) !== ag &&
          O.expression.substring(0, A.length) !== A &&
          O.expression.substring(0, t.length) !== t &&
          O.expression.substring(0, w.length) !== w &&
          O.expression.substring(0, C.length) !== C
        ) {
          continue;
        }
        if (n[a].numKeys == 0 && j == "value") {
          curVal = n[a].value;
          n[a].expression = "";
          n[a].setValue(curVal);
        } else {
          n[a].expression = "";
        }
      } else {
        if (j == "exp2keys" || j == "exp2keysHard") {
          if (n[a].propertyGroup(2).matchName == "ADBE Effect Parade") {
            continue;
          }
          if (O.expression.substring(0, w.length) == w) {
            var U = H.effect(S)("Length Delay").value;
            var N = H.effect(S)("Time Offset (sec)").value;
            if (H.effect(S)("Points Elastic").value) {
              var G = H.effect(S)("Decay").value;
              W = 1 / ((G * 2) / 100) + U - N;
            } else {
              W = U - N;
            }
          }
          e = true;
          n[a].selected = true;
        }
      }
    }
    if (j == "valueSmart") {
      if (H.Effects.numProperties > 0) {
        for (var v = H.Effects.numProperties; v >= 1; v--) {
          var F = H.Effects(v);
          for (var Q = 0; Q < P.length; Q += 1) {
            var I = F.matchName.substring(7, P[Q].length + 7);
            if (I == P[Q]) {
              if (
                (I == K || I == ad) &&
                F.matchName.substring(7, u.length + 7) != u &&
                F("Ctrl Layer End").value != 0 &&
                m.layer(F("Ctrl Layer End").value) !== null
              ) {
                var x = m.layer(F("Ctrl Layer End").value);
                x.transform.position.setValue(
                  x.Effects(q)("End Position").value,
                );
                x.Effects(q)("Start Position").setValue([0, 0]);
                x.Effects(q)("Start Position").expression = "";
                x.Effects(q)("End Position").setValue([0, 0]);
                x.Effects(q)("End Position").expression = "";
                x.Effects(q)("Rig Length").setValue(100);
                x.Effects(q)("Rig Length").expression = "";
                x.Effects(q)("Ctrl Angle").setValue(0);
                x.Effects(q)("Ctrl Angle").expression = "";
              }
              F.remove();
              break;
            }
          }
        }
        for (var v = H.Effects.numProperties; v >= 1; v--) {
          var F = H.Effects(v);
          if (F.name == "Path Array Off Mult") {
            F.remove();
          }
        }
      }
    }
    if (e) {
      ae.push(H);
    }
  }
  var J = m.workAreaStart;
  var g = m.workAreaDuration;
  var V = [];
  var c = false;
  if (j == "exp2keys") {
    for (var o = 0; o < ae.length; o += 1) {
      var b = effectsParsing(m, ae[o]);
      c = b.loop;
      if (b.min === undefined || b.max === undefined) {
        continue;
      }
      if (b.max > g || b.max == 0) {
        b.max = g;
      }
      V.push([ae[o].inPoint, ae[o].outPoint]);
      ae[o].inPoint = b.min;
      ae[o].outPoint = b.max + 1 / m.frameRate + W;
    }
  } else {
    if (j == "exp2keysHard") {
      for (var o = 0; o < ae.length; o += 1) {
        V.push([ae[o].inPoint, ae[o].outPoint]);
        var h = ae[o].inPoint > J ? ae[o].inPoint : J;
        var T = ae[o].outPoint < g ? ae[o].outPoint : g;
        ae[o].inPoint = h;
        ae[o].outPoint = T;
      }
    }
  }
  app.executeCommand(2639);
  for (var o = 0; o < ae.length; o += 1) {
    if (V.length == 0) {
      continue;
    }
    ae[o].inPoint = V[o][0];
    ae[o].outPoint = V[o][1];
  }
  if (c) {
    setLoopInOut("cycle");
  }
}
function scanPropExpressions_exprToValue(d, b) {
  for (var a = 1; a <= d.numProperties; a += 1) {
    var c = d.property(a);
    if (c.propertyType === PropertyType.PROPERTY && c.expression != "") {
      b.push(c);
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropExpressions_exprToValue(c, b);
      }
    }
  }
  return b;
}
function scanPropExpressionsWithKeys_exprToValue(d, b) {
  for (var a = 1; a <= d.numProperties; a += 1) {
    var c = d.property(a);
    if (
      c.propertyType === PropertyType.PROPERTY &&
      c.expression != "" &&
      c.numKeys > 1
    ) {
      b.push(c);
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropExpressions_exprToValue(c, b);
      }
    }
  }
  return b;
}
function scanPropWithKeys_exprToValue(d, b) {
  for (var a = 1; a <= d.numProperties; a += 1) {
    var c = d.property(a);
    if (c.propertyType === PropertyType.PROPERTY && c.numKeys > 0) {
      b.push(c);
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropWithKeys_exprToValue(c, b);
      }
    }
  }
  return b;
}
function findUnivLoop(a) {
  maxTime = a[a.length - 1];
  for (var b = 0; b < a.length; b += 1) {
    if (b > 0 && (a[b] / a[b - 1]) % 1) {
      maxTime = a[b] * a[b - 1];
    }
  }
  var c = false;
  for (var b = 0; b < a.length; b += 1) {
    if (a[b] == maxTime) {
      c = true;
      break;
    }
  }
  if (!c) {
    a.push(maxTime);
    findUnivLoop(
      a.sort(function (e, d) {
        return e - d;
      }),
    );
  }
  return a;
}
function effectsParsing(e, j) {
  var b = { loop: false };
  var c = 0;
  var o = [];
  var g = [];
  var n = [];
  var a = "universal";
  if (j.Effects.numProperties > 0) {
    for (var d = 1; d <= j.Effects.numProperties; d += 1) {
      var h = j.Effects(d);
      if (h.name.substring(0, 9) == "Path Bend") {
        o.push(h("Rotation Speed (sec)").value);
        a = "loop";
      } else {
        if (h.name.substring(0, 12) == "Wave On Path" && h.name.length <= 12) {
          if (h("Wave1").value) {
            o.push(Math.abs(h("Wave1 Speed (sec)").value));
          }
          if (h("Wave2").value) {
            o.push(Math.abs(h("Wave2 Speed (sec)").value));
          }
          if (h("Wave3").value) {
            o.push(Math.abs(h("Wave3 Speed (sec)").value));
          }
          a = "loop";
        } else {
          if (
            h.name.substring(0, 9) == "Speed Rig" ||
            h.name.substring(0, 12) == "Path Stretch"
          ) {
            a = "key";
            n.push(j);
          } else {
            if (h.name.substring(0, 10) == "Path Delay") {
              a = "key";
              if (h("Parent Motion").value == 0) {
                n.push(j);
              } else {
                if (h("Parent Motion").value == 1) {
                  n.push(j.parent);
                } else {
                  if (h("Parent Motion").value == 2) {
                    while (j.parent !== null) {
                      j = j.parent;
                      n.push(j);
                    }
                  }
                }
              }
            } else {
              if (h.name.substring(0, 10) == "Length Rig") {
                a = "key";
                n.push(e.layer(h("Ctrl Layer Start").value));
                n.push(e.layer(h("Ctrl Layer End").value));
              }
            }
          }
        }
      }
    }
    if (a == "loop") {
      o = o.sort(function (p, i) {
        return p - i;
      });
      timeArr = findUnivLoop(o);
      c = timeArr[timeArr.length - 1];
      b.min = 0;
      b.max = c;
      b.loop = true;
    } else {
      if (a == "key") {
        for (var m = 0; m < n.length; m += 1) {
          var k = n[m];
          g = scanPropWithKeys_exprToValue(k, []);
          for (var l = 0; l < g.length; l += 1) {
            if (g[l].matchName == "ADBE Vector Shape") {
              continue;
            }
            if (
              g[l].expression.substring(0, 4) == "loop" ||
              g[l].expression.substring(0, 7) == "// loop"
            ) {
              b.loop = true;
            }
            for (var f = 1; f <= g[l].numKeys; f += 1) {
              o.push(g[l].keyTime(f));
            }
          }
        }
        timeArr = o.sort(function (p, i) {
          return p - i;
        });
        c = timeArr[timeArr.length - 1];
        b.min = timeArr[0];
        b.max = c;
      }
    }
  } else {
    n.push(j);
    for (var m = 0; m < n.length; m += 1) {
      var k = n[m];
      g = scanPropExpressionsWithKeys_exprToValue(k, []);
      for (var m = 0; m < g.length; m += 1) {
        for (var l = 1; l <= g[m].numKeys; l += 1) {
          o.push(g[m].keyTime(l));
        }
      }
    }
    timeArr = o.sort(function (p, i) {
      return p - i;
    });
    c = timeArr[timeArr.length - 1];
    b.min = timeArr[0];
    b.max = c;
  }
  return b;
}
function exprToggle(h) {
  var g = app.project.activeItem;
  var f = g.selectedLayers;
  for (var e = 0; e < f.length; e += 1) {
    var i = f[e];
    var k = i.selectedProperties;
    var j = [];
    if (k.length == 0) {
      k = scanPropExpressions_exprOnOff(i, []);
    }
    var b = true;
    for (var a = 0; a < k.length; a += 1) {
      var d = k[a];
      if (
        d.matchName == "ADBE Vector Shape - Group" &&
        d(2).matchName == "ADBE Vector Shape" &&
        d(2).selected == false
      ) {
        j.push(d(2));
      }
      if (d.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
        continue;
      }
      j.push(d);
      if (d.expressionEnabled == false) {
        b = false;
      }
    }
    for (var d = 0; d < j.length; d += 1) {
      var c = j[d];
      if (c.propertyType === PropertyType.INDEXED_GROUP) {
        continue;
      }
      if (c.expressionEnabled == false) {
        b = false;
      }
      if (h == "value") {
        curVal = c.value;
        c.expression = "";
        c.setValue(curVal);
      } else {
        if (h == "offExpr") {
          if (c.expression != "") {
            c.expressionEnabled = false;
          }
        } else {
          if (h == "onoffExpr" || h == "onoffExprSmart") {
            if (
              h == "onoffExprSmart" &&
              c.expression.substring(0, 10) !== "// Len Rig" &&
              c.expression.substring(0, 13) !== "// Dependener" &&
              c.expression.substring(0, 12) !== "// Speed Rig" &&
              c.expression.substring(0, 15) !== "// Path Stretch" &&
              c.expression.substring(0, 16) !== "// Waves on Path" &&
              c.expression.substring(0, 13) !== "// Path Delay" &&
              c.expression.substring(0, 12) !== "// Path Bend"
            ) {
              continue;
            }
            if (b) {
              c.expressionEnabled = 0;
            } else {
              c.expressionEnabled = 1;
            }
          }
        }
      }
    }
  }
}
function scanPropExpressions_exprOnOff(d, b) {
  for (var a = 1; a <= d.numProperties; a += 1) {
    var c = d.property(a);
    if (c.propertyType === PropertyType.PROPERTY && c.expression != "") {
      b.push(c);
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropExpressions_exprOnOff(c, b);
      }
    }
  }
  return b;
}
function lenRigDuplicator() {
  function i(t) {
    var x = t.effect("Length Rig Controllers")
      ? t.effect("Length Rig Controllers")("Start Controller").value
      : null;
    if (!x) {
      alert(
        "Start Controller is not connected to the End Controller. Try to select it the effect or recreate the controllers.",
      );
      return null;
    } else {
      x = b.layer(t.effect("Length Rig Controllers")("Start Controller").value);
    }
    var u = t.index > x.index ? x : t;
    var v = x.duplicate();
    v.moveBefore(u);
    v.comment = checkComments(b, "-- start -- P1_");
    var w = t.duplicate();
    w.moveBefore(u);
    w.comment = checkComments(b, "-- end -- P2_");
    w.effect("Length Rig Controllers")("Start Controller").setValue(v.index);
    w.parent = v;
    return { end: w, start: v };
  }
  var b = app.project.activeItem;
  var f = b.selectedLayers;
  var d = getLenController(f);
  var q = getLenRigLayer(f);
  var m = f.length == 1 && checkLayForAnimController(f[0]);
  var r = null;
  unselectAll(f);
  if (d !== null && q.length == 0) {
    r = i(d.end);
    r.start.selected = true;
  }
  if (q.length > 0) {
    if (q[0].index < q[q.length - 1].index) {
      q.reverse();
    }
    var h = null;
    for (var o = 0; o < q.length; o += 1) {
      var n = false;
      var k = q[o];
      var e = getLenRigEffectName(k);
      var a = b.layer(k.effect(e)("Ctrl Layer End").value);
      if (o == 0) {
        h = a.name;
      } else {
        if (a.name == h) {
          n = true;
        }
      }
      if (!n) {
        r = i(a);
      }
      var p = k.duplicate();
      if (m) {
        var s = [];
        for (var j = 1; j <= b.numLayers; j += 1) {
          var c = b.layer(j);
          if (j != k.index && c.parent !== null && c.parent.index == k.index) {
            s.push(c);
          }
        }
        if (s.length > 0) {
          s.reverse();
        }
        for (var l = 0; l < s.length; l += 1) {
          var g = s[l].duplicate();
          fixExpression(g, k.name, p.name);
          g.parent = p;
          g.moveAfter(p);
        }
      }
      if (!m) {
        p.moveAfter(r.end);
      } else {
        r.end.moveAfter(p);
        r.start.moveAfter(p);
      }
      p.effect(e)("Ctrl Layer End").setValue(r.end.index);
      p.effect(e)("Ctrl Layer Start").setValue(r.start.index);
      if (!n) {
        r.start.selected = true;
      }
    }
  }
}
function check_pattern_startend(a) {
  if (a === null || a === undefined) {
    return null;
  }
  if (a.numKeys == 2 || a.numKeys % 2 == 0) {
    return true;
  }
  return false;
}
function check_sim_timings(a) {
  if (a === null || a === undefined) {
    return null;
  }
  if (a.numKeys < 3) {
    return false;
  }
  if (
    (a.keyTime(3) - a.keyTime(2)).toFixed(1) ==
    (a.keyTime(2) - a.keyTime(1)).toFixed(1)
  ) {
    return true;
  }
  return false;
}
function check_pattern_3_2(a) {
  if (a === null || a === undefined) {
    return null;
  }
  if (
    a.numKeys > 3 &&
    a.numKeys % 2 == 1 &&
    (a.keyTime(3) - a.keyTime(2)).toFixed(1) ==
      (a.keyTime(2) - a.keyTime(1)).toFixed(1) &&
    a.keyTime(4) - a.keyTime(3) > a.keyTime(3) - a.keyTime(2)
  ) {
    return true;
  }
  return false;
}
function check_pattern_simple3(f) {
  if (f === null || f === undefined) {
    return null;
  }
  if (f.numKeys != 3) {
    return false;
  }
  f.expressionEnabled = false;
  var e = false;
  var d = false;
  var a = true;
  if (f.propertyValueType === PropertyValueType.OneD) {
    if (
      f.valueAtTime(f.keyTime(2), true).toFixed(2) ==
      f.valueAtTime(f.keyTime(3), true).toFixed(2)
    ) {
      e = true;
    }
  } else {
    if (f.propertyValueType === PropertyValueType.TwoD) {
      if (
        f.valueAtTime(f.keyTime(2), true)[0].toFixed(2) ==
          f.valueAtTime(f.keyTime(3), true)[0].toFixed(2) &&
        f.valueAtTime(f.keyTime(2), true)[1].toFixed(2) ==
          f.valueAtTime(f.keyTime(3), true)[1].toFixed(2)
      ) {
        d = true;
      }
    } else {
      if (f.matchName == "ADBE Vector Shape") {
        for (
          var b = 0;
          b < f.valueAtTime(f.keyTime(1), true).vertices.length;
          b += 1
        ) {
          if (
            f.valueAtTime(f.keyTime(2), true).vertices[b][0].toFixed(2) !=
              f.valueAtTime(f.keyTime(3), true).vertices[b][0].toFixed(2) ||
            f.valueAtTime(f.keyTime(2), true).vertices[b][1].toFixed(2) !=
              f.valueAtTime(f.keyTime(3), true).vertices[b][1].toFixed(2)
          ) {
            a = false;
            break;
          }
        }
      }
    }
  }
  var c = e || d || a ? true : false;
  f.expressionEnabled = true;
  return c;
}
function checkLayForMarkedRig(a) {
  return a.marker.numKeys >= 3;
}
function checkLayForLenController(a) {
  return (
    a.comment.substring(3, 8) == "start" || a.comment.substring(3, 6) == "end"
  );
}
function checkLayForLenRigEffect(a) {
  return (
    a.effect("Length Rig") !== null && a.effect("Length Rig") !== undefined
  );
}
function checkLayForLenRigSliderEffect(a) {
  return (
    a.effect("Length Rig Slider") !== null &&
    a.effect("Length Rig Slider") !== undefined
  );
}
function getLenRigEffectName(a) {
  if (a.effect("Length Rig") !== null && a.effect("Length Rig") !== undefined) {
    return "Length Rig";
  } else {
    if (
      a.effect("Length Rig Slider") !== null &&
      a.effect("Length Rig Slider") !== undefined
    ) {
      return "Length Rig Slider";
    } else {
      return null;
    }
  }
}
function checkEffForRigSlider(a) {
  return (
    a.matchName == "ADBE Slider Control" &&
    a(1).expression.substring(0, 19) == "// Len Rig - Slider"
  );
}
function checkIfPropInEffect(a) {
  return a.propertyGroup(a.propertyDepth - 1).matchName == "ADBE Effect Parade";
}
function checkLayForAnimController(a) {
  return a.comment == "Anim Controller";
}
function checkEffForPappet(a) {
  return a.matchName == "ADBE FreePin3";
}
function checkLayForPappetsRig(b) {
  if (b !== null && b !== undefined) {
    for (var a = 1; a <= b.Effects.numProperties; a += 1) {
      var c = b.Effects(a);
      if (checkEffForPappet(c)) {
        return true;
      }
    }
  }
  return false;
}
function checkLayerForRigSlider(b) {
  if (b !== null && b !== undefined) {
    for (var a = 1; a <= b.Effects.numProperties; a += 1) {
      var c = b.Effects(a);
      if (checkEffForRigSlider(c)) {
        return true;
      }
    }
  }
  return false;
}
function getRigSliderFromSelectedLayer(b) {
  if (b !== null && b !== undefined) {
    for (var a = 1; a <= b.Effects.numProperties; a += 1) {
      var c = b.Effects(a);
      if (checkEffForRigSlider(c)) {
        return c;
      }
    }
    return null;
  } else {
    return null;
  }
}
function getRigPropFromSelectedProps(b) {
  if (b !== null && b !== undefined) {
    for (var a = 0; a < b.length; a += 1) {
      var c = b[a];
      if (checkEffForRigSlider(c)) {
        return c;
      }
    }
    return null;
  } else {
    return null;
  }
}
function checkRigForEffects(b) {
  if (b !== null && b !== undefined) {
    for (var a = 0; a < b.length; a += 1) {
      var c = b[a];
      if (checkIfPropInEffect(c)) {
        return true;
      }
    }
    return false;
  } else {
    return null;
  }
}
function getRigedLayers(d) {
  var c = [];
  for (var a = 0; a < d.length; a += 1) {
    var b = d[a];
    if (
      !checkLayForLenRigEffect(b) &&
      !checkLayForLenRigSliderEffect(b) &&
      !checkLayForLenController(b) &&
      !checkLayerForRigSlider(b)
    ) {
      c.push(b);
    }
  }
  return c;
}
function getPappetsRigLayer(d) {
  var c = [];
  for (var a = 0; a < d.length; a += 1) {
    var b = d[a];
    if (checkLayForPappetsRig(b)) {
      c.push(b);
    }
  }
  return c;
}
function getMarkersRigLayer(d) {
  var c = [];
  for (var a = 0; a < d.length; a += 1) {
    var b = d[a];
    if (checkLayForMarkedRig(b)) {
      c.push(b);
    }
  }
  return c;
}
function getLenRigLayer(d) {
  var c = [];
  for (var a = 0; a < d.length; a += 1) {
    var b = d[a];
    if (checkLayForLenRigEffect(b) || checkLayForLenRigSliderEffect(b)) {
      c.push(b);
    }
  }
  return c;
}
function getAnimController(c) {
  for (var a = 0; a < c.length; a += 1) {
    var b = c[a];
    if (checkLayForAnimController(b)) {
      return b;
    }
  }
  return null;
}
function getLenController(d) {
  var a = app.project.activeItem;
  var e = null;
  for (var b = 0; b < d.length; b += 1) {
    var c = d[b];
    if (checkLayForLenController(c)) {
      if (c.comment.substring(3, 8) == "start") {
        ctrlLayer1name = c.name;
        ctrlLayer2name = "-- end -- P2_" + ctrlLayer1name.split("_")[1];
        ctrlLayer1 = c;
        ctrlLayer2 = a.layer(ctrlLayer2name);
      } else {
        if (c.comment.substring(3, 6) == "end") {
          ctrlLayer2name = c.name;
          ctrlLayer1name = "-- start -- P1_" + ctrlLayer2name.split("_")[1];
          ctrlLayer1 = a.layer(ctrlLayer1name);
          ctrlLayer2 = c;
        }
      }
      e = { end: ctrlLayer2, start: ctrlLayer1 };
      break;
    }
  }
  return e;
}
function reparentLayers(e) {
  var c = [];
  var b = "Any layer shouldn\'t be a parent to the rig layers";
  for (var a = 0; a < e.length; a += 1) {
    var d = e[a];
    if (checkLayForLenController(d)) {
      continue;
    }
    if (d.parent !== null) {
      alert(b);
      continue;
    }
    c.push(d);
  }
  return c;
}
function dependener_posRig(p) {
  var r = app.project.activeItem;
  var y = r.selectedLayers;
  var P = "Length Control Layer";
  var A = true;
  var aa =
    "For Len Rig select the layers with keys and " +
    P +
    "\nNote: for this rig in the layers should be at least 3 keys in the the properties.";
  var b = "One of the selected layers should be the " + P;
  var af =
    "Please delete all position keys on controllers and place them correctly";
  var O = "For this rig you need at least 3 keys";
  var u = "property cannot be used in rig";
  var k =
    "Control Layers are empty in the Length Rig effect. Try to set the layers or delete the effects and make rig again";
  var Z =
    "The shape layer already has the Length Rig Effect. To make this rig, delete existed effect.";
  var al =
    "The shape layer already has the Length Rig Slider Effect. To make this rig, delete existed effect.";
  var B = p == "slider";
  var X = B ? "Length Rig Slider" : "Length Rig";
  var H = getLenController(y);
  if (y.length != 0) {
    var h = null;
    var f = null;
    var E = null;
    for (var t = 0; t < y.length; t += 1) {
      var e = y[t];
      if (checkLayForLenRigEffect(e) || checkLayForLenRigSliderEffect(e)) {
        if (B && e.effect("Length Rig") !== null) {
          alert(Z);
          continue;
        } else {
          if (!B && e.effect("Length Rig Slider") !== null) {
            alert(al);
            continue;
          }
        }
        if (e.effect("Length Rig Slider") !== null) {
          var Q = e.effect("Length Rig Slider")("Ctrl Layer End").value;
        } else {
          if (e.effect("Length Rig") !== null) {
            var Q = e.effect("Length Rig")("Ctrl Layer End").value;
          }
        }
        if (!Q) {
          alert(k);
          continue;
        }
        E = r.layer(Q);
        break;
      }
      if (checkLayForLenController(e)) {
        E = e;
        break;
      }
    }
    if (E === null) {
      alert(b);
    } else {
      h = H.start;
      f = H.end;
      var o = f.effect("Length Rig Controllers")("End Position").value;
      var I = f.effect("Length Rig Controllers")("Start Position").value;
      var ac = o[0] == 0 && o[1] == 0 && I[0] == 0 && I[1] == 0;
      if (ac && (h.position.numKeys > 0 || f.position.numKeys > 0)) {
        alert(af);
        A = false;
      }
      if (A) {
        var F = [];
        var G = null;
        var K = null;
        var c = null;
        var M = null;
        var v = null;
        var l = h.position;
        var aj = [h.inPoint, h.outPoint];
        if (h.parent !== null) {
          v = h.parent;
          h.parent = null;
        }
        if (l.numKeys > 0) {
          for (var ak = 1; ak <= l.numKeys; ak += 1) {
            if (l.dimensionsSeparated && l.matchName == "ADBE Position") {
              continue;
            }
            G = copyKey(l, ak, aj, 0, F);
          }
          for (var ak = l.numKeys; ak > 0; ak--) {
            l.removeKey(ak);
          }
        } else {
          c = l.value;
        }
        l = f.position;
        aj = [f.inPoint, f.outPoint];
        if (l.numKeys > 0) {
          for (var ak = 1; ak <= l.numKeys; ak += 1) {
            if (l.dimensionsSeparated && l.matchName == "ADBE Position") {
              continue;
            }
            K = copyKey(l, ak, aj, 0, F);
          }
          for (var ak = l.numKeys; ak > 0; ak--) {
            l.removeKey(ak);
          }
        } else {
          M = l.value;
        }
        if (!ac) {
          h.position.setValue(I);
          f.position.setValue(o);
        }
        h.selected = false;
        f.selected = false;
        var Y = true;
        var m = [];
        var N = [];
        var J = [];
        var W = [];
        var d = null;
        for (var t = 0; t < y.length; t += 1) {
          var T = y[t];
          var am = [];
          if (checkLayForLenController(T)) {
            continue;
          }
          if (reparentLayers([T]).length == 0) {
            continue;
          }
          var g = checkLayForMarkedRig(T);
          var j = collectParentArr(T, [], "in");
          var s = T.selectedProperties;
          if (s.length == 0) {
            am = scanPropsWithMore2Keys(T, []);
          } else {
            for (var a = 0; a < s.length; a += 1) {
              var n = s[a];
              if (n.propertyType === PropertyType.PROPERTY) {
                am.push(n);
              }
            }
          }
          if (am.length == 0) {
            alert(O);
            continue;
          }
          var ah = [];
          for (var a = 0; a < am.length; a += 1) {
            var n = am[a];
            if (n.expression.substring(0, 13) != "// Dependener") {
              ah.push(n);
            }
          }
          am = ah;
          if (d === null && g) {
            d = T.marker.keyTime(2);
          } else {
            if (d === null && !g) {
              d = am[0].keyTime(2);
            }
          }
          saveTime = r.time;
          r.time = d;
          m.push(T);
          if (
            !checkLayForLenRigEffect(T) &&
            !checkLayForLenRigSliderEffect(T)
          ) {
            if (
              T.position.dimensionsSeparated &&
              T.position.matchName == "ADBE Position"
            ) {
              T.transform.xPosition.expression = "";
              T.transform.yPosition.expression = "";
            } else {
              T.position.expression = "";
            }
            T.anchorPoint.expression = "";
          }
          var S = false;
          var ai = true;
          for (var a = 0; a < am.length; a += 1) {
            var n = am[a];
            if (n.matchName == "ADBE FreePin3 PosPin Position") {
              S = true;
            }
            if (n.numKeys > 1) {
              ai = false;
            }
          }
          var D = T instanceof ShapeLayer && S;
          if (D) {
            N.push(T);
          }
          var C = !T.Effects.property("Rig Mode (1-2)");
          for (var a = 0; a < am.length; a += 1) {
            var n = am[a];
            if (n.numKeys < 2) {
              alert(O);
              break;
            }
          }
          for (var a = 0; a < am.length; a += 1) {
            var n = am[a];
            if (ai) {
              addEmptyKeys(n);
            } else {
              if (n.matchName == "ADBE Vector Shape") {
                n.expression = getRigExpressions("propRigPath");
              } else {
                if (S) {
                  n.expression = getRigExpressions("propRigPuppet");
                } else {
                  if (n.matchName == "ADBE Slider Control-0001") {
                    n.expression = getRigExpressions("propRigSlider");
                  } else {
                    if (!n.canSetExpression) {
                      alert(n.name + " " + u);
                      continue;
                    }
                    n.expression = getRigExpressions("propRigUniversal");
                  }
                }
              }
            }
          }
          var z = [0, 0];
          if (y.length > 1 && ai == false) {
            if (Y) {
              f.effect("Length Rig Controllers")("Rig Angle").setValue(0);
              f.effect("Length Rig Controllers")("Ctrl Angle").expression =
                f.effect("Length Rig Controllers")("Rig Angle").value;
              f.rotation.expression =
                'function newInterp(d, Vin, Vout) { return Vin + d * (Vout - Vin); }\nfunction getAngle(p1, p2) {\n  return Math.atan2(p2[1] - p1[1], p2[0] - p1[0]);\n}\nvar onOff = effect("Length Rig Controllers")("Auto Rotate Toggle").value;\nif (onOff) {\nvar ctrlLayerBot = thisLayer;\nvar ctrlLayerTop = effect("Length Rig Controllers")("Start Controller");\nvar scCor = effect("Length Rig Controllers")("Rig Scale");\nvar limbLen = effect("Length Rig Controllers")("Rig Length") / 2 * scCor;\nvar midReal = effect("Length Rig Controllers")("Sensitivity") / 50;\nvar bendDir = -effect("Length Rig Controllers")("Direction") / 100;\nvar nullTopPos = ctrlLayerTop.toComp(ctrlLayerTop.anchorPoint);\nvar nullBotPos = ctrlLayerBot.toComp(ctrlLayerBot.anchorPoint);\nvar dist = length(nullTopPos, nullBotPos);\nvar dotMid = newInterp(0.5, nullBotPos, nullTopPos);\nvar ctrlDistXY = sub(nullTopPos, nullBotPos);\nvar rad = getAngle(nullTopPos, nullBotPos);\nvar sinX = Math.sin(rad);\nvar cosY = Math.cos(rad);\nvar midPointRealism = Math.pow(dist, 1 + midReal) / Math.pow(limbLen, 0 + midReal);\nvar midPoint = Math.max(limbLen - midPointRealism, 1) * bendDir / 2;\nvar midPos = (dotMid) + [midPoint * sinX, - midPoint * cosY];\nvar deg = radiansToDegrees(getAngle(nullBotPos, midPos));\n} else {\nvar deg = 0; }\nvalue + deg';
              if (C) {
                var ag =
                  f.effect("Length Rig Controllers")("Controllers Distance")
                    .value * 2;
                f.effect("Length Rig Controllers")("Rig Length").setValue(ag);
                f.effect("Length Rig Controllers")("Rig Length").expression =
                  ag;
              }
              if (ac) {
                f.effect("Length Rig Controllers")("Start Position").setValue([
                  h.position.value[0],
                  h.position.value[1],
                ]);
                f.effect("Length Rig Controllers")(
                  "Start Position",
                ).expression =
                  "[" + h.position.value[0] + "," + h.position.value[1] + "]";
                f.effect("Length Rig Controllers")("End Position").setValue([
                  f.position.value[0],
                  f.position.value[1],
                ]);
                f.effect("Length Rig Controllers")("End Position").expression =
                  "[" + f.position.value[0] + "," + f.position.value[1] + "]";
              }
              if (T.anchorPoint.expression == "") {
                anchOff = T.position.value - h.position.value;
                lenOff = Math.sqrt(
                  anchOff[0] * anchOff[0] + anchOff[1] * anchOff[1],
                );
                if (anchOff[0] == 0 && anchOff[1] == 0) {
                  z = [0, 0];
                } else {
                  z = [anchOff[0] / lenOff, anchOff[1] / lenOff] * lenOff;
                }
                z = polarRescale(z, T.scale.value, -T.rotation.value);
              }
            }
            T.anchorPoint.expression =
              '// Len Rig\nonOff = effect("' +
              X +
              '")("On / Off");\nlAnchCor = [effect("' +
              X +
              '")("Anchor X Correction").value, effect("' +
              X +
              '")("Anchor Y Correction").value];\nif (onOff == true) {\n  value - lAnchCor;\n} else {\n  value;\n}';
            var ad =
              '// Len Rig\nonOff = effect("' +
              X +
              '")("On / Off");\np1 = effect("' +
              X +
              '")("Ctrl Layer Start");\np2 = effect("' +
              X +
              '")("Ctrl Layer End");\nlPosCor = [effect("' +
              X +
              '")("Position X Correction").value, effect("' +
              X +
              '")("Position Y Correction").value];\nlAnchCor = [effect("' +
              X +
              '")("Anchor X Correction").value, effect("' +
              X +
              '")("Anchor Y Correction").value];\np1x = p1.toComp(p1.anchorPoint);\np2x = p2.toComp(p2.anchorPoint);\nparentCor = thisLayer.hasParent == true ? lPosCor : [0,0];\n\nlinkPos = p2.effect("Length Rig Controllers")("Link Position");\nif (linkPos == true && onOff == true) {\n  val = p1x - parentCor;\n} else if (linkPos == false && onOff == true) {\n  val = value - lAnchCor;\n} else if (onOff == false) {\n  val = value;\n}';
            if (
              T.position.dimensionsSeparated &&
              T.position.matchName == "ADBE Position"
            ) {
              T.transform.xPosition.expression = ad + "\nval[0];";
              T.transform.yPosition.expression = ad + "\nval[1];";
            } else {
              T.position.expression = ad;
            }
            if (!D) {
              T.rotation.expression =
                '// Len Rig\nl = thisLayer;\nlEff = l.effect("' +
                X +
                '");\nlCtr = lEff("Ctrl Layer End");\ntry { lRangeRot = lEff("Range Rotation");\n} catch (e) { lRangeRot = 0 };\nlAng = lCtr.effect("Length Rig Controllers")("Rig Angle");\nlAngCor = lEff("Rotation Correction");\nlayerRotationToggle = lEff("Layer Rotation");\nlRot = lCtr.effect("Length Rig Controllers")("Rig Rotation");\nonOff = lEff("On / Off");\nctrlAng = lCtr.effect("Length Rig Controllers")("Ctrl Angle");\nval = lRot == true && layerRotationToggle == true && onOff == true ? lAng - lAngCor : value;\nxRot = lAngCor - ctrlAng == 0 ? lAngCor - ctrlAng : (lAngCor + ctrlAng) / 2;\nlayerRotationToggle == false ? xRot + lRangeRot / 2 : val;';
              T.scale.expression =
                '// Len Rig\nl = effect("' +
                X +
                '")("Ctrl Layer End");\nlayerScaleToggle = effect("' +
                X +
                '")("Layer Scale");\nif (layerScaleToggle == true) {\n   recursScale = l.effect("Length Rig Controllers")("Rig Scale");\n   value * recursScale;\n} else { value };';
            }
          }
          W.push({
            anch: z,
            pos: h.position.value,
            rot:
              f.effect("Length Rig Controllers")("Rig Angle").value -
              T.rotation.value,
          });
          J.push(
            f.effect("Length Rig Controllers")("Rig Angle").value -
              T.rotation.value,
          );
          T.selected = false;
          collectParentArr(T, j, "out");
          r.time = saveTime;
        }
        var q = null;
        var ae = getFileFromFolder("length_rig.ffx");
        var w = getFileFromFolder("length_rig_slider.ffx");
        for (var ab = 0; ab < m.length; ab += 1) {
          var V = false;
          var g = checkLayForMarkedRig(m[ab]);
          if (
            !checkLayForLenRigEffect(m[ab]) &&
            !checkLayForLenRigSliderEffect(m[ab])
          ) {
            q = B ? applyPreset(m[ab], w) : applyPreset(m[ab], ae);
          } else {
            q = m[ab].effect(X);
            V = true;
          }
          if (g) {
            q("Markers Mode").setValue(1);
          }
          if ((checkLayForAnimController(m[ab]) || g) && !B) {
            q("Limit Keys").setValue(1);
            if (!V) {
              q("Rig Mode (1-2)").setValue(2);
            }
          }
          if (!V && !B) {
            q("Rig Mode (1-2)").expression =
              'effect("Length Rig")("Markers Mode").value ? 2 : value';
            q("Morph into").expression =
              'effect("Length Rig")("Rig Mode (1-2)") == 0 ? 0 : value';
            var R =
              'var ctrlLayer = effect("Length Rig")("Ctrl Layer End");\nvar flip = ctrlLayer.effect("Length Rig Controllers")("Auto Flip Toggle").value;\nvar flipRange = ctrlLayer.effect("Length Rig Controllers")("Flip Range");\nvar flipRot = ctrlLayer.effect("Length Rig Controllers")("Flip Angle") * 0.017444;\n\nvar angRot = ctrlLayer.effect("Length Rig Controllers")("Rig Angle");\nvar mod = effect("Length Rig")("Rig Mode (1-2)");\n\nif (flip) {\n    if (mod == 1) {\n        //v =(Math.abs(angRot)) / 180 * (flipRange / 2 / 180) * 100;\n        angRot = angRot * 0.017444;\n        cosX = Math.cos(angRot - flipRot);\n        sinY = Math.sin(angRot - flipRot);\n        newAng = radiansToDegrees(Math.atan2(sinY, cosX));\n        v = ease(Math.abs(newAng), 0 + (90 - flipRange / 2), 90 + flipRange / 2, 0, 100);\n    } else {\n        v = Math.abs(angRot) / 90 > 1 ? 100 : 0;\n    }\n} else {\n    v = mod == 2 ? 0 : value;\n}';
            var L = 'effect("Length Rig")("Rig Mode (1-2)") == 2 ? 0 : value';
            q("Morph (0-100%)").expression = R;
          }
          if (!V) {
            q("Ctrl Layer Start").setValue(h.index);
            q("Ctrl Layer End").setValue(f.index);
            q("Rotation Correction").setValue(W[ab].rot);
            q("Rotation Correction").expression = W[ab].rot;
            q("Anchor X Correction").setValue(W[ab].anch[0]);
            q("Anchor X Correction").expression = W[ab].anch[0];
            q("Anchor Y Correction").setValue(W[ab].anch[1]);
            q("Anchor Y Correction").expression = W[ab].anch[1];
            q("Position X Correction").setValue(W[ab].pos[0]);
            q("Position X Correction").expression = W[ab].pos[0];
            q("Position Y Correction").setValue(W[ab].pos[1]);
            q("Position Y Correction").expression = W[ab].pos[1];
            q.moveTo(1);
          }
          q = null;
        }
        for (var ab = 0; ab < N.length; ab += 1) {
          var U = N[ab];
          saveVal = U.position.value;
          U.position.expression = "";
          U.position.setValue(saveVal);
          saveVal = U.anchorPoint.value;
          U.anchorPoint.expression = "";
          U.anchorPoint.setValue(saveVal);
          U.effect(X)("Layer Rotation").setValue(0);
        }
        if (G === null) {
          h.position.setValue(c);
        } else {
          pastKey(F);
        }
        if (K === null) {
          f.position.setValue(M);
        } else {
          pastKey(F);
        }
        if (v !== null) {
          h.parent = v;
        }
        f.selected = true;
      }
    }
  } else {
    alert(aa);
  }
}
function slider_rig(l) {
  var h = app.project.activeItem;
  var e = h.selectedLayers;
  var k = [];
  var a = "Please select only one layer for auto mode";
  var m = "Any layer shouldn\'t be a parent to the rig layers";
  var c =
    "Be careful, you have the wrong number of keys, check your rig on 3-2 Method";
  var j =
    "One of the controllers scale is not 100. It may affect to rig. Try to use Reset Shape function";
  if (l == "auto") {
    if (e.length > 1) {
      alert(a);
    } else {
      var g = addMorphController_LenRig();
      e[0].selected = true;
      g.bot.selected = true;
      e.push(g.bot);
    }
  }
  var n = getLenController(e);
  var b = getRigedLayers(e);
  var f = getAnimController(e);
  var d = getPappetsRigLayer(e);
  if (n !== null) {
    var k = reparentLayers(b);
    if (n.start.scale.value[0] != 100 || n.end.scale.value[0] != 100) {
      alert(j);
      n.end.selected = true;
    }
    l = b.length > 1 || d.length > 0 ? "global" : "local";
    var i = dependener(l, n.end);
  } else {
    var i = dependener(l, null);
  }
  if (n !== null) {
    n.end.selected = true;
    dependener_posRig("slider");
  }
}
function dependener(p, o) {
  var q = app.project.activeItem;
  var I = "Anim Controller";
  var w = 0;
  var G = q.duration;
  var X = "Add keyframes to the selected properties";
  var B = null;
  var y = q.selectedLayers;
  var F = "Prop Slider Animation";
  var ag = true;
  var J = null;
  var ac = getRigedLayers(y);
  var C = getLenController(y);
  var v = getMarkersRigLayer(y);
  var A = getAnimController(y);
  var ae = getPappetsRigLayer(y);
  var a = [];
  for (var s = 0; s < y.length; s += 1) {
    if (!checkLayForLenController(y[s])) {
      a.push(y[s]);
    }
  }
  for (var s = 0; s < a.length; s += 1) {
    var i = a[s];
    var Z = getRigPropFromSelectedProps(i.selectedProperties);
    if (Z === null) {
      var S = getRigSliderFromSelectedLayer(i);
      if (S !== null) {
        Z = S;
      }
    }
    if (Z !== null) {
      var M = [Z];
      var ab = M[M.length - 1];
      if (ab.parentProperty.matchName == "ADBE Effect Parade") {
        ab = ab(1);
      }
      var z = getPropPath(ab);
      if (checkLayForAnimController(i)) {
        B = 'thisComp.layer("' + i.name + '")' + z;
      } else {
        B = getPropPath(ab).substring(1, z.length);
      }
      ag = false;
    }
  }
  var aj = [];
  var n = [];
  var h = false;
  for (var s = 0; s < a.length; s += 1) {
    var af = [];
    var O = a[s];
    if (checkLayForLenController(O) || checkLayForAnimController(O)) {
      continue;
    }
    var r = O.selectedProperties;
    if (r.length == 0) {
      r = scanPropsWithMore2Keys(O, []);
    }
    if (checkRigForEffects(r)) {
      p = "global";
    }
    if (r.length != 0) {
      for (var e = 0; e < r.length; e += 1) {
        var t = r[e].parentProperty.matchName == "ADBE Layer Overrides";
        if (
          (r[e].parentProperty.propertyType === PropertyType.INDEXED_GROUP &&
            !t) ||
          r[e].numKeys == 0
        ) {
          continue;
        }
        if (
          r[e].matchName == "ADBE Slider Control-0001" &&
          r[e].expression.substring(0, 19) == "// Len Rig - Slider"
        ) {
          continue;
        }
        if (
          r[e].propertyGroup(r[e].propertyDepth - 1).matchName ==
          "ADBE Effect Parade"
        ) {
          h = true;
        }
        af.push(r[e]);
        aj.push(r[e]);
      }
      J = af.length;
      if (J == 0) {
        alert(X);
        ag = false;
        continue;
      }
      if (p == "local") {
        w = 0;
        G = q.duration;
      }
      for (var e = 0; e < J; e += 1) {
        var m = af[e];
        if (m.keyTime(1) < G) {
          G = m.keyTime(1);
        }
        var j = check_pattern_3_2(m);
        if (o !== null && o !== undefined) {
          if (j) {
            if (w < m.keyTime(3)) {
              w = m.keyTime(3);
            }
          } else {
            if (w < m.keyTime(m.numKeys)) {
              w = m.keyTime(m.numKeys);
            }
          }
        } else {
          if (w < m.keyTime(m.numKeys)) {
            w = m.keyTime(m.numKeys);
          }
        }
        if (J == 1 && a.length == 1) {
          var c = m.parentProperty.name.split(" ");
          c = c.length > 1 ? c[0] + " " + c[1] : c[0];
          F = c + " Controller";
        }
        m.expression = "// Dependener\n";
        if (B !== null) {
          m.expression += "propAnim = " + B + " / 100;\nvalueAtTime(propAnim)";
        } else {
          if (p == "local") {
            m.expression +=
              'propAnim = effect("' + F + '")(1) / 100;\nvalueAtTime(propAnim)';
          } else {
            m.expression +=
              'propAnim = thisComp.layer("' +
              I +
              '").effect("' +
              F +
              '")(1) / 100;\nvalueAtTime(propAnim)';
          }
        }
      }
      n.push({ inT: G, lay: O, outT: w });
    }
    unselectProp_rig(O);
  }
  var Y = null;
  var k = null;
  if (ag) {
    if (p == "local") {
      if (n.length == 0 && getAnimController(y) === null) {
        alert("You need to select the layer where to place the local slider");
      }
    } else {
      n = [];
      n.push({ inT: G, lay: crtCtrl(I), outT: w });
    }
    var N = [];
    if (v.length > 0) {
      for (var P = 0; P < v.length; P += 1) {
        for (var T = v[P].marker.numKeys; T > 0; T--) {
          v[P].marker.removeKey(T);
        }
      }
    }
    for (var W = 0; W < n.length; W += 1) {
      k = n[W].lay;
      var g = null;
      if (n.length != 0 && !g) {
        Y = addSlider("slider", k, F, 0, "");
        if (Y.numKeys == 0) {
          Y.addKey(0);
          Y.setValueAtKey(1, n[W].inT * 100);
          Y.addKey(1);
          Y.setValueAtKey(2, n[W].outT * 100);
        }
        Y.expression = "// Len Rig - Slider\nvalue";
      } else {
        if (g) {
          Y = g;
        }
      }
      N.push(Y);
      if (v.length > 0) {
        var K = new MarkerValue("");
        n[W].lay.marker.setValueAtTime(0, K);
        n[W].lay.marker.setValueAtTime(0.5, K);
        n[W].lay.marker.setValueAtTime(1, K);
      }
    }
  }
  H = [];
  af = [];
  var U = N;
  var H = aj;
  for (var e = 0; e < H.length; e += 1) {
    var ah = check_pattern_simple3(H[e]);
    if (!ah) {
      ah = false;
      break;
    }
  }
  if (k !== null && U.length != 0) {
    var E = 0;
    var ak = [];
    var ad = true;
    var aa = false;
    var b = false;
    var ai = true;
    for (var e = 0; e < H.length; e += 1) {
      var D = H[e];
      if (!aa) {
        aa = check_pattern_startend(D);
      }
      if (ai) {
        ai = check_sim_timings(D);
      }
      if (ad) {
        ad = check_pattern_3_2(D);
      }
      if (D.numKeys > E) {
        E = D.numKeys;
      }
    }
    for (var R = 0; R < U.length; R += 1) {
      var u = U[R];
      var V = u.propertyGroup(u.propertyDepth);
      var f = C !== null && ((ad && !aa && ai) || ah);
      if (f) {
        u.addKey(0.5);
      }
      if (ad) {
        var l = E - 3;
        if ((l / 2) % 1 > 0) {
        } else {
          for (var W = 0; W < E - 3; W += 1) {
            ak.push(0);
          }
          for (var e = 0; e < H.length; e += 1) {
            var D = H[e];
            for (var Q = 1; Q <= D.numKeys; Q += 1) {
              if (Q <= 3) {
                continue;
              }
              ak[Q - 4] += D.keyTime(Q);
            }
          }
          if (o !== null) {
            for (var Q = 0; Q < ak.length; Q += 1) {
              u.addKey(Q + 2);
              u.setValueAtKey(4 + Q, (ak[Q] / H.length) * 100);
              u.addKey(Q + 2 + 0.5);
              u.setValueAtKey(5 + Q, (ak[Q + 1] / H.length) * 100);
              Q++;
              if (v.length > 0) {
                var K = new MarkerValue("");
                V.marker.setValueAtTime(Q + 1, K);
                V.marker.setValueAtTime(Q + 1 + 0.5, K);
              }
            }
          }
        }
      }
      var d = u.propertyGroup(u.propertyDepth);
      d.selected = true;
    }
    if (p == "global" && C !== null) {
      for (var L = 0; L < ac.length; L += 1) {
        ac[L].parent = d;
      }
    }
  }
}
function dependener_spdRig_getSpeed() {
  var e = app.project.activeItem;
  var d = e.selectedLayers;
  if (d.length != 0) {
    for (var c = 0; c < d.length; c += 1) {
      var g = d[c];
      var i = g.selectedProperties;
      if (i.length == 0) {
        alert("Select the property whose speed you want to get");
        continue;
      }
      for (var b = 0; b < i.length; b += 1) {
        var a = i[b];
        if (a.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
          continue;
        }
        if (a.parentProperty.matchName == "ADBE Effect Parade") {
          continue;
        }
        if (
          a.matchName == "ADBE Vector Shape" ||
          a.propertyValueType === PropertyValueType.NO_VALUE ||
          a.propertyValueType === PropertyValueType.CUSTOM_VALUE
        ) {
          alert("You cannot get the speed from this property");
          continue;
        }
        var f = a.name;
        var h = "";
        if (a.parentProperty.matchName == "ADBE Vector Transform Group") {
          h = " " + a.parentProperty.parentProperty.name;
        }
        getPathPath = getPropPath(a);
        if (a.matchName == "ADBE Scale" || a.matchName == "ADBE Vector Scale") {
          spdSld = addSlider(
            "point",
            g,
            effectNumIncrement(g.name, f + h + " - Speed"),
            [0, 0],
            "",
          );
          spdSld.expression = getRigExpressions(
            "getSpeedRigScale",
            getPathPath,
          );
          addSlider("slider", g, "Scale Strength", 5, "");
        } else {
          if (
            a.matchName == "ADBE Rotate X" ||
            a.matchName == "ADBE Rotate X" ||
            a.matchName == "ADBE Rotate Z"
          ) {
            spdSld = addSlider(
              "slider",
              g,
              effectNumIncrement(g.name, f + h + " - Speed"),
              1,
              "",
            );
            spdSld.expression = getRigExpressions(
              "getSpeedRigRotate",
              getPathPath,
            );
            addSlider("slider", g, "Rotation Strength", 5, "");
          } else {
            if (a.matchName == "ADBE Slider Control-0001") {
              spdSld = addSlider(
                "slider",
                g,
                effectNumIncrement(g.name, f + h + " - Speed"),
                1,
                "",
              );
              spdSld.expression = getRigExpressions(
                "getSpeedRigSlider",
                getPathPath,
              );
              addSlider("slider", g, "Slider Strength", 5, "");
            } else {
              spdSld = addSlider(
                "slider",
                g,
                effectNumIncrement(g.name, f + h + " - Speed"),
                1,
                "",
              );
              spdSld.expression = getRigExpressions(
                "getSpeedRigOther",
                getPathPath,
                f,
              );
              addSlider("slider", g, f + " Strength", 10, "");
            }
          }
        }
      }
    }
  } else {
    alert("Select the property whose speed you want to get");
  }
}
function dependener_spdRig(j) {
  var i = app.project.activeItem;
  var g = i.selectedLayers;
  var e =
    "To create Speed Rig, you need to select the prepared properties with keyframes and the Speed Slider at the last.";
  var k = "Please select Speed Slider to make rig.";
  if (g.length != 0) {
    var m = getFileFromFolder("speed_rig.ffx");
    for (var f = 0; f < g.length; f += 1) {
      var l = g[f];
      var o = l.selectedProperties;
      if (o.length == 0) {
        alert(e);
        continue;
      }
      for (var c = 0; c < o.length; c += 1) {
        var b = o[c];
        if (b.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
          continue;
        }
        if (b.parentProperty.matchName == "ADBE Effect Parade") {
          continue;
        }
        var p = true;
        if (o.length >= 2 && c < o.length - 1) {
          var a = o[o.length - 1];
          if (a.parentProperty.matchName == "ADBE Effect Parade") {
            a = a(1);
          }
          var n = getPropPath(a);
          var d = a.parentProperty.name.split(" ")[0];
          if (a.parentProperty.name.split(" ")[2] != "Speed") {
            alert(k);
            break;
          } else {
            if (b.matchName == "ADBE Vector Shape") {
              b.expression = getRigExpressions("speedRigPath", n);
            } else {
              if (d == "Rotation" || d == "Slider") {
                b.expression = getRigExpressions("speedRigRotation-Slider", n);
              } else {
                b.expression = getRigExpressions("speedRigOther", n);
              }
            }
          }
        } else {
          if (o.length < 2) {
            alert(k);
          }
        }
      }
      unselectProp_rig(l);
      var h = applyPreset(l, m);
      h("Rig Mode (1-2)").setValue(2);
    }
  } else {
    alert(e);
  }
}
function dependener_pathRig(i) {
  var h = app.project.activeItem;
  var f = h.selectedLayers;
  var a = [];
  if (f.length != 0) {
    var e = getFileFromFolder("Path_Stretch.ffx");
    for (var d = 0; d < f.length; d += 1) {
      var j = f[d];
      if (!(j instanceof ShapeLayer)) {
        alert("This script works only on the Shapes");
        continue;
      }
      a.push(j);
      var k = j.selectedProperties;
      if (k.length == 0) {
        k = scanPropGroupProperties(j, [], "ADBE Vector Shape");
      }
      for (var c = 0; c < k.length; c += 1) {
        var b = k[c];
        if (b.parentProperty.propertyType === PropertyType.INDEXED_GROUP) {
          continue;
        }
        if (b.matchName == "ADBE Vector Shape") {
          b.expression = getRigExpressions("pathSpeedRig");
        }
      }
    }
    for (var d = 0; d < a.length; d += 1) {
      var g = applyPreset(a[d], e);
    }
  }
}
function addMorphController_LenRig() {
  var i = app.project.activeItem;
  var l = i.selectedLayers;
  var r = getUnivSize("mid");
  var K = [i.width, i.height] / 2;
  var b = null;
  var A = [100, 0];
  var d = [0, 0];
  var n = [];
  var q = l.length > 0 ? false : true;
  for (var v = 0; v < l.length + q; v += 1) {
    var u = l[v];
    if (!q) {
      var E = centerLayer(u);
      var s = u.parent;
      u.parent = null;
      K = u.position.value;
      var t = u.rotation.value;
      u.parent = s;
      b = u;
      var L = getLayerSize(u, i.time);
      A = polarRescale([L[0] * 0.8, 0], [100, 100], t);
      d = polarRescale([(L[0] / 2) * 0.8, 0] + E[0], [100, 100], t);
      if (L[1] > L[0]) {
        t += 90;
        L = [L[1], L[0]];
        A = polarRescale([L[0] * 0.8, 0], [100, 100], t);
        d = polarRescale([(L[0] / 2) * 0.8, 0], [100, 100], t) + E[0];
      }
    }
    var a = checkComments(i, "-- start -- P1_");
    var C = checkComments(i, "-- end -- P2_");
    var p = makeEllipse(
      a,
      [r, r] / 4,
      "fill",
      1,
      "notTrueBlack",
      K,
      null,
      "circle1",
    );
    var H = addShapeGroup(p[0], "Base Stroke Group");
    var M = addEllipse(H, [r, r], "");
    addStroke(H, getColor("notTrueBlack"), "", 1, "");
    p[0].comment = a;
    var G = makeEllipse(C, [r, r] / 4, "fill", 1, "red", K, null, "circle1");
    G[0].position.setValue(G[0].position.value + A);
    G[0].parent = p[0];
    G[0].comment = C;
    p[0].position.setValue(p[0].position.value - d);
    if (b !== null) {
      G[0].moveBefore(b);
    }
    G[1].content("Fill 1")(4).expression =
      'recursScale = effect("Length Rig Controllers")("Rig Scale");\nlenIn = effect("Length Rig Controllers")("Length In");\nlenOut = effect("Length Rig Controllers")("Length Out");\nlen1 = (effect("Length Rig Controllers")("Rig Length") + lenIn - lenOut) * recursScale;\nlen2 = effect("Length Rig Controllers")("Controllers Distance");\nif (len2 < lenIn) { [175, 58, 58, 255] / 255\n} else if (len2 < (len1 / 2) - 1) { [41, 120, 235, 255] / 255;\n} else if (len2 + lenIn < (len1)) { [58, 175, 58, 255] / 255;\n} else { [175, 58, 58, 255] / 255 }';
    var x = addShapeGroup(G[0], "Pos Stroke Group");
    addEllipse(x, [r, r], "");
    var B = addStroke(x, getColor("notTrueBlack"), "", 3, "");
    B(3).expression = 'content("circle1").content("Fill 1").color';
    var c = new Shape();
    c.vertices = [
      [0, 0],
      [0, 0],
    ];
    c.closed = false;
    var I =
      'var nullLayer = effect("Length Rig Controllers")("Start Controller").name;\nvar origPoints = thisProperty.points();\nl = thisComp.layer(nullLayer);\norigPoints[1] = fromCompToSurface(l.toComp(l.anchorPoint));\ncreatePath(origPoints, thisProperty.inTangents(), thisProperty.outTangents(), thisProperty.isClosed());';
    var o = addShapeGroup(G[0], "Base Path");
    addPath(o, c, I, "Path Group 1");
    addStroke(o, getColor("notTrueBlack"), "", 1, "");
    addTrimPaths(o, 10, "", 90, "");
    var m = addShapeGroup(G[0], "Flip Group");
    addPath(m, c, I, "Path Group 1");
    addStroke(m, getColor("notTrueBlack"), "", 1, "");
    addTrimPaths(m, 99.9, "", 100, "");
    var j = 'effect("Length Rig Controllers")("Auto Flip Toggle").value * 100';
    addPathOffset(m, 100, j);
    var F =
      '50 + effect("Length Rig Controllers")("Flip Range") / 360 * 100 / 2';
    var h =
      '50 - effect("Length Rig Controllers")("Flip Range") / 360 * 100 / 2';
    var y =
      'value + effect("Length Rig Controllers")("Flip Angle") - rotation;';
    addTrimPaths(m, null, F, null, h, 180, y);
    p[0].moveBefore(i.layer(G[0].index));
    G[0].selected = false;
    p[0].selected = false;
    G[0].label = 1;
    p[0].label = 1;
    G[0].guideLayer = true;
    p[0].guideLayer = true;
    n.push({ bot: p[0], top: G[0] });
    if (!q) {
      centerLayer(u, E);
    }
  }
  var D =
    'p1 = effect("Length Rig Controllers")("Start Controller");\ndist = effect("Length Rig Controllers")("Controllers Distance");\np2 = thisLayer; \np1x = p1.toComp(p1.anchorPoint);\np2x = p2.toComp(p2.anchorPoint);\nsubCtrl = sub(p2x, p1x);\nctrlAngl = Math.atan2(subCtrl[1], subCtrl[0]);\nv = radiansToDegrees(ctrlAngl);\nvalue + v';
  var w =
    'var botL = effect("Length Rig Controllers")("Start Controller");\nfunction recursiveProp(propSum, lay) {\n    if (lay.hasParent) { propSum *= recursiveProp(lay.parent.scale.value[0]/100, lay.parent); } return propSum;}\nrecursScale = recursiveProp(botL.scale[0] / 100, botL);';
  var k =
    'p1 = effect("Length Rig Controllers")("Start Controller");\np2 = thisLayer; \np1x = p1.toComp(p1.anchorPoint);\np2x = p2.toComp(p2.anchorPoint);\ndist = length(p1x, p2x);';
  var J = getFileFromFolder("length_rig_ctrl.ffx");
  for (var z = 0; z < n.length; z += 1) {
    var e = n[z].top;
    var g = n[z].bot;
    var f = applyPreset(e, J);
    f("Rig Angle").expression = D;
    f("Rig Scale").expression = w;
    f("Rig Length").setValue(100);
    f("Controllers Distance").expression = k;
    f("Start Controller").setValue(g.index);
    f = null;
  }
  return { bot: g, top: e };
}
function addEmptyKeysFunction() {
  var f = app.project.activeItem;
  var e = f.selectedLayers;
  if (e.length != 0) {
    var j = null;
    var g = 0;
    var c = true;
    for (var d = 0; d < e.length; d += 1) {
      var h = e[d];
      var k = h.selectedProperties;
      for (var b = 0; b < k.length; b += 1) {
        if (k[b].numKeys >= 3) {
          j = k[b];
          g = j.keyTime(1);
          c = false;
          break;
        }
      }
      if (!c) {
        break;
      }
    }
    for (var d = 0; d < e.length; d += 1) {
      var h = e[d];
      var k = h.selectedProperties;
      if (k.length == 0) {
        k = scanPropGroupProperties(h, [], "ADBE Vector Shape");
      }
      var i = [];
      for (var b = 0; b < k.length; b += 1) {
        var a = k[b];
        if (
          a.parentProperty.propertyType === PropertyType.INDEXED_GROUP &&
          a.matchName == "ADBE Vector Shape - Group" &&
          !a(2).selected
        ) {
          i.push(a(2));
        }
        if (
          a.parentProperty.propertyType !== PropertyType.INDEXED_GROUP &&
          a.numKeys <= 1
        ) {
          i.push(a);
        }
      }
      for (var b = 0; b < i.length; b += 1) {
        addEmptyKeys(i[b], g, j);
      }
      unselectProp_rig(h);
    }
  }
}
function addEmptyKeys(c, f, h) {
  var d = app.project.activeItem;
  var e = 1 / d.frameRate;
  var b = 3 * e;
  if (f === null || f === undefined) {
    f = 0;
  }
  var a = c.propertyGroup(c.propertyDepth);
  f += a.inPoint > 0 ? a.inPoint : 0;
  if (h !== null) {
    var i = [];
    for (var g = 1; g <= h.numKeys; g += 1) {
      i.push(h.keyTime(g));
    }
    for (var g = 1; g <= 5; g += 1) {
      if (g == 4) {
        b += b;
      } else {
        if (g > 4) {
          b -= 3 * e;
        }
      }
      if (i[g - 1] == undefined) {
        i.push(i[g - 2] + b);
      }
    }
    for (var g = 1; g <= 5; g += 1) {
      c.addKey(i[g - 1]);
    }
  } else {
    c.addKey(f);
    c.addKey((f += b));
    c.addKey((f += b));
    c.addKey((f += b + b));
    c.addKey((f += b));
  }
}
function scanPropsWithMore2Keys(d, b) {
  for (var a = 1; a <= d.numProperties; a += 1) {
    var c = d.property(a);
    if (c.dimensionsSeparated && c.matchName == "ADBE Position") {
      continue;
    }
    if (c.matchName == "ADBE Marker") {
      continue;
    }
    if (c.propertyType === PropertyType.PROPERTY) {
      if (c.numKeys >= 2) {
        b.push(c);
      }
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropsWithMore2Keys(c, b);
      }
    }
  }
  return b;
}
function scanPropsWithMore3Keys(d, b) {
  for (var a = 1; a <= d.numProperties; a += 1) {
    var c = d.property(a);
    if (c.dimensionsSeparated && c.matchName == "ADBE Position") {
      continue;
    }
    if (c.matchName == "ADBE Marker") {
      continue;
    }
    if (c.propertyType === PropertyType.PROPERTY) {
      if (c.numKeys >= 3) {
        b.push(c);
      }
    } else {
      if (
        c.propertyType === PropertyType.INDEXED_GROUP ||
        c.propertyType === PropertyType.NAMED_GROUP
      ) {
        scanPropsWithMore3Keys(c, b);
      }
    }
  }
  return b;
}
function checkComments(c, e) {
  var b = 0;
  for (var f = 1; f <= c.numLayers; f += 1) {
    var d = c.layer(f);
    if (d.comment != "" && d.comment.substring(0, e.length) == e) {
      var a = parseInt(d.comment.split("_")[1]);
      if (a > b) {
        b = a;
      }
    }
  }
  if (b > 0) {
    return e + b + 1;
  } else {
    return e + 1;
  }
}
function unselectProp_rig(c) {
  for (var a = 1; a <= c.numProperties; a += 1) {
    var b = c.property(a);
    if (b.selected) {
      b.selected = false;
    }
    if (
      b.propertyType === PropertyType.INDEXED_GROUP ||
      b.propertyType === PropertyType.NAMED_GROUP
    ) {
      unselectProp_rig(b);
    }
  }
}
function getRigExpressions(a, c, b) {
  if (a == "propRigUniversal") {
    expr =
      '// Len Rig - Universal\nfunction newInterp(t, Vin, Vout) {\n    return limitKeys ? linear(t, Vin, Vout) : Vin + t * (Vout - Vin);\n}\n\nfunction quadraBezier(bendDir, t, inP, outP) {\n    var oneD = inP.length < 2;\n    if (!oneD) {\n        var dotMid = newInterp(0.5, inP, outP);\n        var distP = length(outP, inP) + 0.001;\n        var midPoint = 0.5 * distP * (bendDir);\n        var xy = sincos(outP, inP, Math.PI/ 2);\n        var vM = dotMid + [midPoint * xy.x, midPoint * xy.y];\n    } else {\n        var vM = newInterp(0.5, inP, outP);\n    }\n    return vM + Math.pow(1 - t, 2) * (inP - vM) + t*t*(outP - vM);\n  }\n\nfunction sincos(p1, p2, ang, vec) {\n    if (vec === null || vec === undefined) vec = sub(p1, p2); \n    var pointAngl = Math.atan2(vec[1], vec[0]);\n    var cosX = Math.cos(pointAngl + ang);\n    var sinY = Math.sin(pointAngl + ang);\n    return {x: cosX, y: sinY};\n}\n\nvar l = thisLayer;\nvar p1 = l.effect("Length Rig")("Ctrl Layer Start");\nvar p2 = l.effect("Length Rig")("Ctrl Layer End");\nvar recScale = p2.effect("Length Rig Controllers")("Rig Scale");\nvar morphPath = l.effect("Length Rig")("Morph (0-100%)") / 100;\nvar morphToType = l.effect("Length Rig")("Morph into");\nvar mods = l.effect("Length Rig")("Rig Mode (1-2)");\nvar morphType = l.effect("Length Rig")("Morph Type");\nvar markersMode = l.effect("Length Rig")("Markers Mode").value;\nvar onOff = l.effect("Length Rig")("On / Off").value;\nvar bezierMode = l.effect("Length Rig")("Bezier Curve Movement").value;\nvar bendDir = l.effect("Length Rig")("Curve Straight");\nvar limitKeys = l.effect("Length Rig")("Limit Keys").value;\n\nvar prop = thisProperty;\nvar nKeys = prop.numKeys;\nvar more2keys = nKeys > 2;\nif (onOff && (morphType > 0 && morphType <= (nKeys) / 2 ) && (mods > 0 && mods <= 2)) {\n    var lMin = p2.effect("Length Rig Controllers")("Length In") * recScale;\n    var lMax = p2.effect("Length Rig Controllers")("Length Out") * recScale;\n    var startDist = p2.effect("Length Rig Controllers")("Rig Length") * recScale - lMin - lMax;\n    var dist = p2.effect("Length Rig Controllers")("Controllers Distance") - lMin;\n    var td0 = dist / startDist;\n    var td1 = td0 * 2;\n    var td2 = (td0 - 0.5) * 2;\n\n    var v0special = morphType > 1 && more2keys ? morphType * 2 : 1;\n    var v1special = morphType > 1 && more2keys ? morphType * 2 + 1 : 2;\n    var propToCheck = ! markersMode ? prop : l.marker;\n\n    var key0Time = propToCheck.key(v0special).time;\n    var key1Time = propToCheck.key(v1special).time;\n    if (more2keys) var key2Time = propToCheck.key(morphType * 2 + 1).time;\n\n    if (propToCheck.numKeys > 3 && morphPath !== 0) {\n        v0special = morphToType > 1 ? morphToType * 2 : 1;\n        v2special = morphToType > 1 ? morphToType * 2 + 1 : 2;\n        var key0AltTime = propToCheck.key(v0special).time;\n        var key2AltTime = propToCheck.key(v2special).time;\n    }\n\n    var val = value;\n    if ( ! markersMode ) {\n        var v0 = prop.valueAtTime(key0Time);\n        var v1 = prop.valueAtTime(key1Time);\n        if (nKeys == 2) {\n            mods = 2;\n        } else if (more2keys) {\n            var v2 = prop.valueAtTime(key2Time);\n        }\n        if (prop.numKeys > 3 && morphPath !== 0) {\n            var v0alt = prop.valueAtTime(key0AltTime);\n            var v2alt = prop.valueAtTime(key2AltTime);\n            v0 = newInterp(morphPath, v0, v0alt);\n            v1 = newInterp(morphPath, v1, v2alt);\n            v2 = newInterp(morphPath, v2, v2alt);\n        }\n\n        if (v0.length >= 2) {\n            var norm = cross(sub([0,0], v0), sub(v0, v1));\n            var bendDirNew = norm[2] > 0 ? -bendDir : bendDir;\n        } else {\n            var bendDirNew = bendDir;\n            bezierMode = false;\n        }\n\n        if (mods == 1) {\n            if (dist <= startDist / 2) {\n                val = bezierMode ?\n                    quadraBezier(bendDirNew, td1, v0, v1) :\n                    newInterp(td1, v0, v1);\n            } else {\n                val = bezierMode ?\n                    quadraBezier(bendDirNew, td2, v1, v2) :\n                    newInterp(td2, v1, v2);\n            }\n        } else if (mods == 2) {\n            var toKey = more2keys ? v2 : v1;\n            val = bezierMode ?\n                quadraBezier(bendDirNew, v1, v0, toKey) :\n                newInterp(distSwitch, v1, toKey);\n        }\n    } else {\n        var toKeyTime = more2keys ? key2Time : key1Time;\n        var distSwitch = morphType > 1 || ! more2keys ? td1 : td0;\n        tInt = newInterp(distSwitch, key0Time, toKeyTime);\n        val = prop.valueAtTime(tInt);\n    }\n} else { value }\n\n';
  } else {
    if (a == "propRigSlider") {
      expr =
        '// Len Rig - Slider\nfunction interp(t, Vin, Vout) {\n    return linear(t, Vin, Vout);\n}\n\nfunction sincos(p1, p2, ang, vec) {\n    if (vec === null || vec === undefined) vec = sub(p1, p2); \n    var pointAngl = Math.atan2(vec[1], vec[0]);\n    var cosX = Math.cos(pointAngl + ang);\n    var sinY = Math.sin(pointAngl + ang);\n    return {x: cosX, y: sinY};\n}\n\nvar l = thisLayer;\nvar p1 = l.effect("Length Rig Slider")("Ctrl Layer Start");\nvar p2 = l.effect("Length Rig Slider")("Ctrl Layer End");\nvar recScale = p2.effect("Length Rig Controllers")("Rig Scale");\nvar modRig = 2; //l.effect("Length Rig Slider")("Rig Mode (1-2)");\nvar modsType = l.effect("Length Rig Slider")("Morph Type");\nvar markersMode = l.effect("Length Rig Slider")("Markers Mode").value;\nvar onOff = l.effect("Length Rig Slider")("On / Off").value;\nvar limitKeys = 1; //l.effect("Length Rig Slider")("Limit Keys").value;\nvar prop = thisProperty;\nvar nKeys = prop.numKeys;\n\nvar more2keys = nKeys > 2;\nif (onOff && (modsType > 0 && modsType <= (nKeys) / 2 ) && (modRig > 0 && modRig <= 2)) {\n    var lMin = p2.effect("Length Rig Controllers")("Length In") * recScale;\n    var lMax = p2.effect("Length Rig Controllers")("Length Out") * recScale;\n    var startDist = p2.effect("Length Rig Controllers")("Rig Length") * recScale - lMin - lMax;\n    var dist = p2.effect("Length Rig Controllers")("Controllers Distance") - lMin;\n    var td0 = dist / startDist;\n    var td1 = td0 * 2;\n    var td2 = (td0 - 0.5) * 2;\n\n    var v0special = modsType > 1 && more2keys ? modsType * 2 : 1;\n    var propToCheck = ! markersMode ? prop : l.marker;\n\n    var key0Time = propToCheck.key(v0special).time;\n    var key1Time = propToCheck.key(2).time;\n    if (more2keys) var key2Time = propToCheck.key(modsType * 2 + 1).time;\n\n    var val = value;\n    var distSwitch = (modsType > 1 || ! more2keys) ? td1 : td0;\n\n    if ( ! markersMode ) {\n        var v0 = prop.valueAtTime(key0Time);\n        var v1 = prop.valueAtTime(key1Time);\n        if (more2keys)\n            var v2 = prop.valueAtTime(key2Time);\n\n        var toKey = more2keys ? v2 : v1;\n        val = interp(distSwitch, v0, toKey);\n    } else {\n        var toKeyTime = more2keys ? key2Time : key1Time;\n        tInt = interp(distSwitch, key0Time, toKeyTime);\n        val = prop.valueAtTime(tInt);\n    }\n} else { value; }\n\n';
    } else {
      if (a == "propRigPuppet") {
        expr =
          '// Len Rig - Puppets\nfunction newInterp(t, Vin, Vout) {\n   return limitKeys ? linear(t, Vin, Vout) : Vin + t * (Vout - Vin);\n}\n\nfunction sincos(p1, p2, ang, vec) {\n   if (vec === null || vec === undefined) vec = sub(p1, p2); \n   var pointAngl = Math.atan2(vec[1], vec[0]);\n   var cosX = Math.cos(pointAngl + ang);\n   var sinY = Math.sin(pointAngl + ang);\n   return {x: cosX, y: sinY};\n}\n\nvar l = thisLayer;\nvar p1 = l.effect("Length Rig")("Ctrl Layer Start");\nvar p2 = l.effect("Length Rig")("Ctrl Layer End");\nvar recScale = p2.effect("Length Rig Controllers")("Rig Scale");\nvar linkPos = p2.effect("Length Rig Controllers")("Link Position");\nvar morphPath = l.effect("Length Rig")("Morph (0-100%)") / 100;\nvar morphToType = l.effect("Length Rig")("Morph into");\nvar mods = l.effect("Length Rig")("Rig Mode (1-2)");\nvar morphType = l.effect("Length Rig")("Morph Type");\nvar onOff = l.effect("Length Rig")("On / Off").value;\nvar markersMode = l.effect("Length Rig")("Markers Mode");\nvar limitKeys = l.effect("Length Rig")("Limit Keys").value;\nvar p1x = p1.toComp(p1.anchorPoint);\n\nvar lAng = p2.effect("Length Rig Controllers")("Rig Angle");\nvar lRot = p2.effect("Length Rig Controllers")("Rig Rotation").value;\nvar layerRotationToggle = l.effect("Length Rig")("Layer Rotation").value;\nvar layerRotationToggle = layerRotationToggle ? 0 : lAng - l.rotation;\nvar prop = thisProperty;\nvar nKeys = prop.numKeys;\nif (onOff && (morphType > 0 && morphType <= (nKeys) / 2) && (mods > 0 && mods <= 2)) {\n   var lMin = p2.effect("Length Rig Controllers")("Length In") * recScale;\n   var lMax = p2.effect("Length Rig Controllers")("Length Out") * recScale;\n   var startDist = p2.effect("Length Rig Controllers")("Rig Length") * recScale - lMin - lMax;\n   var dist = p2.effect("Length Rig Controllers")("Controllers Distance") - lMin;\n   var td0 = dist / startDist;\n   var td1 = td0 * 2;\n   var td2 = (td0 - 0.5) * 2;\n\n   var ctrlAngl = lRot ? degreesToRadians(layerRotationToggle) : degreesToRadians(-l.rotation);\n\n   var v0special = morphType > 1 && nKeys > 2 ? morphType * 2 : 1;\n   var v1special = morphType > 1 && nKeys > 2 ? morphType * 2 + 1 : 2;\n   var propToCheck = markersMode == false ? prop : l.marker;\n\n   var key0Time = propToCheck.key(v0special).time;\n   var key1Time = propToCheck.key(v1special).time;\n   if (nKeys > 2) var key2Time = propToCheck.key(morphType * 2 + 1).time;\n\n   if (propToCheck.numKeys > 3 && morphPath !== 0) {\n      v0special = morphToType > 1 ? morphToType * 2 : 1;\n      v2special = morphToType > 1 ? morphToType * 2 + 1 : 2;\n      var key0AltTime = propToCheck.key(v0special).time;\n      var key2AltTime = propToCheck.key(v2special).time;\n   }\n\n   if (markersMode == false) {\n      var v0 = prop.valueAtTime(key0Time);\n      var v1 = prop.valueAtTime(key1Time);\n      if (nKeys == 2) {\n         mods = 2;\n      } else if (nKeys > 2) {\n         var v2 = prop.valueAtTime(key2Time);\n      }\n      if (prop.numKeys > 3 && morphPath !== 0) {\n         var v0alt = prop.valueAtTime(key0AltTime);\n         var v2alt = prop.valueAtTime(key2AltTime);\n         v0 = newInterp(morphPath, v0, v0alt);\n         v1 = newInterp(morphPath, v1, v2alt);\n         v2 = newInterp(morphPath, v2, v2alt);\n      }\n      \n      var p0 = value;\n      if (mods == 1) {\n         if (dist <= startDist / 2) {\n            p0 = newInterp(td1, v0, v1);\n         } else {\n            p0 = newInterp(td2, v1, v2);\n         }\n      } else if (mods == 2) {\n         var toKey = nKeys > 2 ? v2 : v1;\n         p0 = newInterp(td1, v0, toKey);\n      }\n   } else {\n      var toKeyTime = nKeys > 2 ? key2Time : key1Time;\n      tInt = newInterp(td0, key0Time, toKeyTime);\n      p0 = prop.valueAtTime(tInt);\n   }\n   \n   var lPos = l.toComp(l.anchorPoint);\n   var pointDist = length(lPos, p0);\n   var xy = sincos(p0, lPos, ctrlAngl);\n   var basePos = (linkPos == true) ? p1x : thisLayer.toComp(anchorPoint);\n   ([xy.x, xy.y] * pointDist) + basePos;\n} else { value; }\n\n';
      } else {
        if (a == "propRigPath") {
          expr =
            '// Len Rig - Path\nfunction handlRot(interp, ctrlAngl, recScaleTg) {\n  var pointDist = length(interp, [0,0]);\n  var xy = sincos(null, null, ctrlAngl, interp);\n  return [xy.x, xy.y] * pointDist * recScaleTg;\n}\n\nfunction newInterp(t, Vin, Vout) {\n  return limitKeys ? linear(t, Vin, Vout) : Vin + t * (Vout - Vin);\n}\n\nfunction quadraBezier(bendDir, t, inP, outP) {\n  var oneD = inP.length < 2;\n  if (!oneD) {\n    var dotMid = newInterp(0.5, inP, outP);\n    var distP = length(outP, inP) + 0.001;\n    var midPoint = 0.5 * distP * (bendDir);\n    var xy = sincos(outP, inP, Math.PI/ 2);\n    var vM = dotMid + [midPoint * xy.x, midPoint * xy.y];\n  } else {\n    var vM = newInterp(0.5, inP, outP);\n  }\n  return vM + Math.pow(1 - t, 2) * (inP - vM) + t*t*(outP - vM);\n}\n\nfunction sincos(p1, p2, ang, vec) {\n  if (vec === null || vec === undefined) vec = sub(p1, p2); \n  var pointAngl = Math.atan2(vec[1], vec[0]);\n  var cosX = Math.cos(pointAngl + ang);\n  var sinY = Math.sin(pointAngl + ang);\n  return {x: cosX, y: sinY};\n}\n\nfunction getAllInt(bezierMode, bendDir, t, pIn, pOut, tIn0, tIn1, tOut0, tOut1) {\n  var pInterpol = bezierMode ? quadraBezier(bendDir, t, pIn, pOut) : newInterp(t, pIn, pOut);\n  var inInterpol = newInterp(t, tIn0, tIn1);\n  var outInterpol = newInterp(t, tOut0, tOut1);\n  return {"pInterpol": pInterpol, "inInterpol": inInterpol, "outInterpol": outInterpol};\n}\n\nvar l = thisLayer;\nvar p1 = l.effect("Length Rig")("Ctrl Layer Start");\nvar p2 = l.effect("Length Rig")("Ctrl Layer End");\nvar morphPath = l.effect("Length Rig")("Morph (0-100%)") / 100;\nvar morphType = l.effect("Length Rig")("Morph Type");\nvar morphToType = l.effect("Length Rig")("Morph into");\nvar mods = l.effect("Length Rig")("Rig Mode (1-2)");\nvar markersMode = l.effect("Length Rig")("Markers Mode").value;\nvar onOff = l.effect("Length Rig")("On / Off").value;\nvar bezierMode = l.effect("Length Rig")("Bezier Curve Movement").value;\nvar bendDir = l.effect("Length Rig")("Curve Straight");\n\nvar strIn = l.effect("Length Rig")("Range In");\nvar strOut = l.effect("Length Rig")("Range Out");\nvar strEase = l.effect("Length Rig")("Range Easing") / 100;\nvar strRot = l.effect("Length Rig")("Range Rotation");\nvar linearCor = true;\nvar limitKeys = l.effect("Length Rig")("Limit Keys").value;\n\nvar origPath = thisProperty;\nvar nKeys = origPath.numKeys;\nvar more2keys = nKeys > 2;\nif (onOff && (morphType > 0 && morphType <= (nKeys) / 2 ) && (mods > 0 && mods <= 2)) {\n  var lPos = l.toComp(l.anchorPoint);\n  var layerScaleToggle = l.effect("Length Rig")("Layer Scale").value;\n  var recScale1 = p2.effect("Length Rig Controllers")("Rig Scale");\n  var recScale2 = layerScaleToggle ? 1 / recScale1 : recScale1;\n  var recScaleTg = layerScaleToggle ? 1 : recScale1;\n  var lMin = p2.effect("Length Rig Controllers")("Length In") * recScale1;\n  var lMax = p2.effect("Length Rig Controllers")("Length Out") * recScale1;\n  var startDist = p2.effect("Length Rig Controllers")("Rig Length") * recScale1 - lMin - lMax;\n  var dist = p2.effect("Length Rig Controllers")("Controllers Distance") - lMin;\n\n  var lAng = (p2.effect("Length Rig Controllers")("Rig Angle"));\n  var lAng360 = (p2.effect("Length Rig Controllers")("Rig Angle") + 360) % 360;\n  var lAngStart = p2.effect("Length Rig Controllers")("Ctrl Angle");\n  var lRot = p2.effect("Length Rig Controllers")("Rig Rotation").value;\n  var layerRotationCorrection = l.effect("Length Rig")("Rotation Correction");\n  var layRot = degreesToRadians(l.rotation);\n  \n  lAng = ((lAng + 180) + (360 - lAngStart - strRot)) % 360 - 180;\n\n  var layerRotationToggle = l.effect("Length Rig")("Layer Rotation").value;\n  var layerRotationCor = layerRotationToggle ? -layRot : degreesToRadians(lAng);\n  var ctrlAngl = lRot ? layerRotationCor : -layRot;\n\n  var origPoints = origPath.points();\n  var origInTangents = origPath.inTangents();\n  var origOutTangents = origPath.outTangents();\n  var pathState = origPath.isClosed();\n\n  var td0 = dist / startDist;\n  var td1 = td0 * 2;\n  var td2 = (td0 - 0.5) * 2;\n  var distHalh = dist <= startDist / 2;\n\n  var v0special = morphType > 1 && more2keys ? morphType * 2 : 1;\n  var v1special = morphType > 1 && more2keys ? morphType * 2 + 1 : 2;\n  var propToCheck = !markersMode ? origPath : l.marker;\n\n  var key0Time = propToCheck.key(v0special).time;\n  var key1Time = propToCheck.key(v1special).time;\n  if (nKeys == 2) {\n    mods = 2;\n  } else if (more2keys) {\n    var key2Time = propToCheck.key(morphType * 2 + 1).time;\n  }\n  \n  if (propToCheck.numKeys > 3 && morphPath !== 0) {\n    v0special = morphToType > 1 ? morphToType * 2 : 1;\n    v2special = morphToType > 1 ? morphToType * 2 + 1 : 2;\n    var key0AltTime = propToCheck.key(v0special).time;\n    var key2AltTime = propToCheck.key(v2special).time;\n  }\n\n  for (var i = 0; i < origPoints.length; i++) {\n      if (!markersMode) {\n          var v0 = origPath.points(key0Time)[i];\n          var v1 = origPath.points(key1Time)[i];\n          var vTin0 = origPath.inTangents(key0Time)[i];\n          var vTin1 = origPath.inTangents(key1Time)[i];\n          var vTout0 = origPath.outTangents(key0Time)[i];\n          var vTout1 = origPath.outTangents(key1Time)[i];\n          \n          if (more2keys) {\n            var v2 = origPath.points(key2Time)[i];\n            var vTin2 = origPath.inTangents(key2Time)[i];\n            var vTout2 = origPath.outTangents(key2Time)[i];\n          }\n          \n          if (nKeys > 3 && morphPath !== 0) {\n              v0 = newInterp(morphPath, v0, origPath.points(key0AltTime)[i]);\n              v1 = newInterp(morphPath, v1, origPath.points(key2AltTime)[i]);\n              v2 = newInterp(morphPath, v2, origPath.points(key2AltTime)[i]);\n              vTin0 = newInterp(morphPath, vTin0, origPath.inTangents(key0AltTime)[i]);\n              vTin2 = newInterp(morphPath, vTin2, origPath.inTangents(key2AltTime)[i]);\n              vTout0 = newInterp(morphPath, vTout0, origPath.outTangents(key0AltTime)[i]);\n              vTout2 = newInterp(morphPath, vTout2, origPath.outTangents(key2AltTime)[i]);\n          }\n          \n          if (bezierMode) {\n            var norm = cross(sub([0,0], v0), sub(v0, v1));\n            var bendDirNew = norm[2] > 0 ? -bendDir : bendDir;\n          } else {\n            var bendDirNew = 1;\n          }\n\n          if (mods == 1) {\n              if (distHalh) {\n                var pI = getAllInt(bezierMode, bendDirNew, td1, v0, v1, vTin0, vTin1, vTout0, vTout1);\n              } else {\n                var pI = getAllInt(bezierMode, bendDirNew, td2, v1, v2, vTin1, vTin2, vTout1, vTout2);\n              }\n          } else if (mods == 2) {\n            var pI = getAllInt(bezierMode, bendDirNew, td1, v0, v1, vTin0, vTin1, vTout0, vTout1);\n          }\n      } else {\n        \n        var toKeyTime = more2keys ? key2Time : key1Time;\n        var distSwitch = morphType > 1 || ! more2keys ? td1 : td0;\n        var tInterpol = newInterp(distSwitch, key0Time, toKeyTime);\n        var pI = {"pInterpol": origPath.points(tInterpol)[i],\n                  "inInterpol": origPath.inTangents(tInterpol)[i],\n                  "outInterpol": origPath.outTangents(tInterpol)[i]};\n      }\n      \n      var p0 = l.toComp(pI.pInterpol);\n      var pointDist = length(lPos, p0);\n      \n      var linearDecrBendAmp = 1;\n      if (layerRotationToggle == false && (strIn > 0 || strOut > 0)) {\n        linearDecrBendAmp = ease(pointDist * 2, strIn, strOut, strEase, 1);\n        if (linearCor) linearDecrBendAmp = Math.sqrt(linearDecrBendAmp);\n      }\n      \n      var xy = sincos(p0, lPos, ctrlAngl * linearDecrBendAmp);\n\n      origPoints[i] = [xy.x, xy.y] * pointDist * recScale2 + l.anchorPoint;\n      \n      origInTangents[i] = handlRot(\n          pI.inInterpol,\n          ctrlAngl * linearDecrBendAmp + layRot,\n          recScaleTg);\n      origOutTangents[i] = handlRot(\n          pI.outInterpol,\n          ctrlAngl * linearDecrBendAmp + layRot,\n          recScaleTg);\t\n  }\n  createPath(origPoints, origInTangents, origOutTangents, pathState);\n} else { value; }\n\n';
        } else {
          if (a == "getSpeedRigScale") {
            expr =
              "// Speed Rig - Scale\nl = thisLayer;\nlProp = thisLayer" +
              c +
              ';\ntry { str = l.effect("Speed Rig")("Speed Strength");\n} catch (e) { str = 1 };\ntry { smth = l.effect("Speed Rig")("Speed Cut (0-100%)") / 100;\n} catch (e) { smth = 1; }\nsp = (lProp.velocityAtTime(time) * thisComp.frameDuration);\nsens = l.effect("Scale Strength")(1);\n\nif (sp[0] >= 0) {\n    speedInterpolX = linear(sp[0]/100 * sens, 1 - smth , 1, 0, 1 * str);\n} else {\n    speedInterpolX = linear(sp[0]/100 * sens, -1 + smth , -1, -1 * str, 0);\n\n}\nif (sp[1] >= 0) {\n\tspeedInterpolY = linear(sp[1]/100 * sens, 1 - smth , 1, 0, 1 * str);\n} else {\n\tspeedInterpolY = linear(sp[1]/100 * sens, -1 + smth , -1, -1 * str, 0);\n}\n\n[speedInterpolX, speedInterpolY]';
          } else {
            if (a == "getSpeedRigRotate") {
              expr =
                "// Speed Rig - Rotation\nl = thisLayer;\nlProp = thisLayer" +
                c +
                ';\ntry { str = l.effect("Speed Rig")("Speed Strength");\n} catch (e) { str = 1 };\ntry { smth = l.effect("Speed Rig")("Speed Cut (0-100%)") / 100;\n} catch (e) { smth = 1; }\nsens = l.effect("Rotation Strength")(1);\nsp = (lProp.speedAtTime(time) * thisComp.frameDuration);\nif (sp >= 0) {\n    speedInterpol = linear(sp/360 * sens, 1 - smth , 1, 0, 1 * str);\n} else {\n    speedInterpol = linear(sp/360 * sens, -1 + smth , -1, -1 * str, 0);\n}';
            } else {
              if (a == "getSpeedRigSlider") {
                expr =
                  "// Speed Rig - Slider\nl = thisLayer;\nlProp = thisLayer" +
                  c +
                  ';\ntry { str = l.effect("Speed Rig")("Speed Strength");\n} catch (e) { str = 1 };\ntry { smth = l.effect("Speed Rig")("Speed Cut (0-100%)") / 100;\n} catch (e) { smth = 1; }\nsens = l.effect("Slider Strength")(1);\nsp = (lProp.speedAtTime(time) * thisComp.frameDuration);\nif (sp >= 0) {\n    speedInterpol = linear(sp * sens, 1 - smth , 1, 0, 1 * str);\n} else {\n    speedInterpol = linear(sp * sens, -1 + smth , -1, -1 * str, 0);\n}';
              } else {
                if (a == "getSpeedRigOther") {
                  expr =
                    "// Speed Rig - Universal\nl = thisLayer;\nlProp = thisLayer" +
                    c +
                    ';\nsens = l.effect("' +
                    b +
                    ' Strength")(1);\ntry { str = l.effect("Speed Rig")("Speed Strength");\n} catch (e) { str = 1 };\ntry { smth = l.effect("Speed Rig")("Speed Cut (0-100%)") / 100;\n} catch (e) { smth = 1; }\nsp = (lProp.speedAtTime(time) * thisComp.frameDuration / thisComp.width);\nspeedInterpol = linear(Math.abs(sp) * sens, 1 - smth , 1, 0, 1 * str);';
                } else {
                  if (a == "speedRigPath") {
                    expr =
                      '// Speed Rig - Path\nfunction handlRot(interp, ctrlAngl, recScaleTg) {\n  var pointDist = length(interp, [0,0]);\n  var xy = sincos(null, null, ctrlAngl + degreesToRadians(rotation), interp)\n  return [xy.x, xy.y] * pointDist * recScaleTg;\n}\n\nfunction newInterp(d, Vin, Vout) {\n\treturn Vin + d * (Vout - Vin);\n}\n\nfunction sincos(p1, p2, ang, vec) {\n  if (vec === null || vec === undefined) vec = sub(p1, p2); \n  var pointAngl = Math.atan2(vec[1], vec[0]);\n  var cosX = Math.cos(pointAngl + ang);\n  var sinY = Math.sin(pointAngl + ang);\n  return {x: cosX, y: sinY};\n}\n\nvar l = thisLayer;\nvar mods = l.effect("Speed Rig")("Rig Mode (1-2)");\nvar mods2 = l.effect("Speed Rig")("Morph Type");\nvar angCurv = degreesToRadians(l.effect("Speed Rig")("Rig Angle"));\nvar sp = l' +
                      c +
                      ';\nvar origPath = thisProperty;\nvar origPoints = origPath.points();\nvar origInTangents = origPath.inTangents();\nvar origOutTangents = origPath.outTangents();\nvar pathState = origPath.isClosed();\nvar str = l.effect("Speed Rig")("Speed Strength");\nvar smooth = l.effect("Speed Rig")("Speed Cut (0-100%)") / 100;\nvar ang = l.effect("Speed Rig")("Rig Angle");\nvar pCor = l.effect("Speed Rig")("Point Control");\nif (mods2 > 0 && mods2 * 2 < origPath.numKeys) {\n  var k1 = l.position.valueAtTime(time - thisComp.frameDuration * 1) ;\n  var k2 = l.position.valueAtTime(time + thisComp.frameDuration * 1) ;\n  var posVec = sub(k2, k1);\n  var autoRotate = l.effect("Speed Rig")("Auto Rotation");\n  var autoFlip = l.effect("Speed Rig")("Auto Flip");\n  var ctrlAngl = 0;\n  var limOut = l.effect("Speed Rig")("Flip Range (0-1)");\n  if (autoRotate == true) {\n    ctrlAngl = Math.atan2(posVec[1], posVec[0]);\n    if (autoFlip == true) {\n      ctrlAngl = linear(sp, 0, limOut, 0, ctrlAngl);\n    }    \n  }\n\n  var v0special = mods2 > 1 ? mods2 * 2 : 1;\n\n  var key0Time = origPath.key(v0special).time;\n  var key1Time = origPath.key(2).time;\n  var key2Time = origPath.key(mods2 * 2 + 1).time;\n\n  for (var i = 0; i < origPoints.length; i++) {\n    var v0 = origPath.points(key0Time)[i] + pCor;\n    var v1 = origPath.points(key1Time)[i] + pCor;\n    var v2 = origPath.points(key2Time)[i] + pCor;\n    var vTin0 = origPath.inTangents(key0Time)[i];\n    var vTin1 = origPath.inTangents(key1Time)[i];\n    var vTin2 = origPath.inTangents(key2Time)[i];\n    var vTout0 = origPath.outTangents(key0Time)[i];\n    var vTout1 = origPath.outTangents(key1Time)[i];\n    var vTout2 = origPath.outTangents(key2Time)[i];\n    \n    if (mods == 1) {\n        pInterpol = newInterp(sp, v1, v2);\n        inInterpol = newInterp(sp, vTin1, vTin2);\n        outInterpol = newInterp(sp, vTout1, vTout2);\n    } else if (mods == 2) {\n        pInterpol = newInterp(sp, v0, v2);\n        inInterpol = newInterp(sp, vTin0, vTin2);\n        outInterpol = newInterp(sp, vTout0, vTout2);\n    }\n      \n    len = length([0,0], pInterpol);\n    var xy = sincos(null, null, ctrlAngl + degreesToRadians(ang), pInterpol);\n    origPoints[i] = [xy.x, xy.y] * len;\n\n    origInTangents[i] = handlRot(inInterpol, ctrlAngl + degreesToRadians(ang), 1);\n    origOutTangents[i] = handlRot(outInterpol, ctrlAngl + degreesToRadians(ang), 1);\t\n  }\n  \n  createPath(origPoints, origInTangents, origOutTangents, pathState);\n} else { value; }\n';
                  } else {
                    if (a == "speedRigRotation-Slider") {
                      expr =
                        "// Speed Rig - Rotation-Slider\nfunction newInterp(d, Vin, Vout) { return Vin + d * (Vout - Vin); }\nl = thisLayer;\nsp = l" +
                        c +
                        ';\nsp = sp.value instanceof Array ? (Math.abs(sp[0]) + Math.abs(sp[1])) / 2 : sp;\nmods2 = l.effect("Speed Rig")("Morph Type");\nprop = thisProperty;\nif (mods2 > 0 && mods2 * 2 < prop.numKeys) {\n   v0special = mods2 > 1 ? mods2 * 2 : 1;\n   v0 = prop.valueAtTime(prop.key(v0special).time);\n   v1 = prop.valueAtTime(prop.key(2).time);\n   v2 = prop.valueAtTime(prop.key(mods2 * 2 + 1).time);\n   \n   if (sp >= 0) {\n      xy = newInterp(Math.abs(sp), v1, v0);\n   } else {\n      xy = newInterp(Math.abs(sp), v1, v2);\n   }\n} else {\n   xy = thisProperty;\n}\nxy;';
                    } else {
                      if (a == "speedRigOther") {
                        expr =
                          '// Speed Rig - Universal\nfunction newInterp(d, Vin, Vout) { return Vin + d * (Vout - Vin); }\nl = thisLayer;\nstr = l.effect("Speed Rig")("Speed Strength");\nsp = l' +
                          c +
                          ';\nmods = l.effect("Speed Rig")("Rig Mode (1-2)");\nmods2 = l.effect("Speed Rig")("Morph Type");\nprop = thisProperty;\nif (mods2 > 0 && mods2 * 2 < prop.numKeys) {\n   v0special = mods2 > 1 ? mods2 * 2 : 1;\n   v0 = prop.valueAtTime(prop.key(v0special).time);\n   v1 = prop.valueAtTime(prop.key(2).time);\n   v2 = prop.valueAtTime(prop.key(mods2 * 2 + 1).time);\n   \n   if (mods == 1) {\n       xy = newInterp(sp, v0, v1);\n   } else if (mods == 2) {\n       xy = newInterp(sp, v0, v2);\n   }\n} else {\n   xy = thisProperty\n}\nxy;\n';
                      } else {
                        if (a == "pathSpeedRig") {
                          expr =
                            '// Path Stretch\nfunction tangTransform(origTang, posVecNorm, mult, ctrlAngl) {\n    var pointDist = length(origTang);\n    var pointAngl = Math.atan2(origTang[1], origTang[0]);\n    var cosXtang = Math.cos(pointAngl + ctrlAngl);\n    var sinYtang = Math.sin(pointAngl + ctrlAngl);    \n    origTang = [cosXtang, sinYtang] * pointDist;\n    tangDot = 0;\n    if (origTang[0] !== 0 && origTang[1] !== 0) {\n        tangNorm = normalize(origTang);\n        tangDot = dot(tangNorm, posVecNorm);\n    }\n   return origTang + tangDot * posVecNorm * (mult / 1);\n}\nfunction elastic(amp, freq, decay) {\n    function calc(n) {\n        var t = time - l.position.key(n).time;\n        var v = l.position.velocityAtTime(l.position.key(n).time - thisComp.frameDuration/10);\n        return v * ((amp / freq)) * Math.sin(freq * t * 2*Math.PI) / Math.exp(t * (decay * 2) * Math.E);\n    }\n    if (l.position.numKeys == 0) return 0;\n    var n = l.position.nearestKey(time).index; \n    if (l.position.key(n).time > time) n--;\n    return (n > 1 && time <= l.position.key(n).time + (1 / decay)) ? calc(n) + calc(n - 1) : 0;\n}\nvar l = thisLayer;\nvar prop = thisProperty; \nvar origPoints = prop.points(); \nvar origInTang = prop.inTangents(); \nvar origOutTang = prop.outTangents();\nvar pointNumbers = origPoints.length;\nvar tangMult = l.effect("Path Stretch")("Tangents Multiply");\nvar optNumPoints = tangMult / pointNumbers;\nvar str = l.effect("Path Stretch")("Strength") * 2;\nvar ang = degreesToRadians(l.effect("Path Stretch")("Points Rotation"));\nvar smooth = l.effect("Path Stretch")("Strength Cut (0-100%)") / 100;\nvar del = l.effect("Path Stretch")("Time Offset");\nvar pointsMorp = l.effect("Path Stretch")("Points Stretch (0-100%)") / 100 * 2 - 1;\nvar pCor = l.effect("Path Stretch")("Points Offset");\nvar elasticToggle = l.effect("Path Stretch")("Elastic Toggle");\nvar amp = l.effect("Path Stretch")("Elastic Amplitude") / 10 / 100;\nvar freq = l.effect("Path Stretch")("Elastic Frequency") / 100;\nvar decay = l.effect("Path Stretch")("Elastic Decay") * 2 / 100;\nvar elasticMove = elasticToggle == true ? elastic(amp, freq, decay) : 0;\nvar autoRotate = l.effect("Path Stretch")("Auto Rotation").value;\nvar autoFlip = l.effect("Path Stretch")("Auto Flip").value;\nvar rotAng = 0;\nvar limOut = l.effect("Path Stretch")("Flip Range (0-1)");\nvar k1 = l.position.valueAtTime(time - thisComp.frameDuration * 1) ;\nvar k2 = l.position.valueAtTime(time + thisComp.frameDuration * 1) ;\nvar posVec = sub(k2, k1);\nvar posVecNorm = (posVec[0] == 0 && posVec[1] == 0) ? [0,0] : normalize(posVec); // Fix None problem\nvar sp = (l.position.speedAtTime(time - del) * thisComp.frameDuration / 1920) * 10; // Optim speed calc\nif (autoRotate) {\n  rotAng = Math.atan2(posVec[1], posVec[0]);\n  if (autoFlip) {\n    rotAng = linear(sp, 0, limOut, 0, rotAng);\n  }    \n}\nfor (var i = 0; i < origPoints.length; i++) {\n    var p1 = origPoints[i] + pCor;\n    var len = length([0,0], p1);\n    var rad = Math.atan2(p1[1], p1[0]);\n    var cosX = Math.cos(rad + rotAng + (ang));\n    var sinY = Math.sin(rad + rotAng + (ang));\n    var pPolarFB = [cosX, sinY] * len;\n    var pNormFB = (pPolarFB[0] == 0 && pPolarFB[1] == 0) ? [0, 0] : normalize(pPolarFB);\n    var dotVecBaseFB = (posVec[0] == 0 && posVec[1] == 0) ? 0 : dot(pNormFB, posVecNorm);\n    var dotVec = dotVecBaseFB > pointsMorp ? 0 : dotVecBaseFB;\n    var pInterpol = linear(sp, (1 - smooth), 1, 0, str);\n    var magic = posVecNorm * dotVec * pInterpol;\n    origPoints[i] = pPolarFB + magic + elasticMove;\n    var mult = pInterpol * optNumPoints;\n\t\n    origInTang[i] = tangTransform(origInTang[i], posVecNorm, mult, rotAng + ang);\n    origOutTang[i] = tangTransform(origOutTang[i], posVecNorm, mult, rotAng + ang);\n}\ncreatePath(origPoints, origInTang, origOutTang, prop.isClosed());\n\n';
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
  return expr;
}
if (typeof JSON !== "object") {
  JSON = {};
}
(function () {
  function f(n) {
    return n < 10 ? "0" + n : n;
  }
  function quote(string) {
    escapable.lastIndex = 0;
    return escapable.test(string)
      ? '"' +
          string.replace(escapable, function (a) {
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
                ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]"
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
              ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}"
              : "{" + partial.join(",") + "}";
        gap = mind;
        return v;
    }
  }
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
    String.prototype.toJSON =
      Number.prototype.toJSON =
      Boolean.prototype.toJSON =
        function () {
          return this.valueOf();
        };
  }
  if (typeof JSON.stringify !== "function") {
    escapable =
      /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
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
        (typeof replacer !== "object" || typeof replacer.length !== "number")
      ) {
        throw new Error("JSON.stringify");
      }
      return str("", { "": value });
    };
  }
  if (typeof JSON.parse !== "function") {
    cx =
      /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
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
      cx.lastIndex = 0;
      if (cx.test(text)) {
        text = text.replace(cx, function (a) {
          return "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4);
        });
      }
      if (
        /^[\],:{}\s]*$/.test(
          text
            .replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@")
            .replace(
              /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
              "]",
            )
            .replace(/(?:^|:|,)(?:\s*\[)+/g, ""),
        )
      ) {
        j = eval("(" + text + ")");
        return typeof reviver === "function" ? walk({ "": j }, "") : j;
      }
      throw new SyntaxError("JSON.parse");
    };
  }
})();
