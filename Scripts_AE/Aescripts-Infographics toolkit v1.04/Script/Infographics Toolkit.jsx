/*
 * Decompiled with Jsxer
 * Version: 1.7.4
 * JSXBIN 2.0
 */

function ms_InfographicsToolkit(f) {
  function d(k, g) {
    if (g == undefined) {
      g = ",";
    }
    if (g && g.length > 1) {
      g = ",";
    }
    var j = "\n";
    var q = "";
    var l = 0;
    var n = k.charAt(l);
    var s = 0;
    var h = 0;
    var m = new Array();
    while (n != q) {
      while (n == " " || n == "\t" || n == "\r") {
        n = k.charAt(++l);
      }
      var o = "";
      if (n == '"') {
        n = k.charAt(++l);
        do {
          if (n != '"') {
            o += n;
            n = k.charAt(++l);
          }
          if (n == '"') {
            var p = k.charAt(l + 1);
            if (p == '"') {
              o += '"';
              l += 2;
              n = k.charAt(l);
            }
          }
        } while (n != q && n != '"');
        if (n == q) {
          throw "Unexpected end of data, double-quote expected";
        }
        n = k.charAt(++l);
      } else {
        while (n != q && n != g && n != j && n != "\t" && n != "\r") {
          o += n;
          n = k.charAt(++l);
        }
      }
      if (m.length <= s) {
        m.push(new Array());
      }
      m[s].push(o);
      while (n == " " || n == "\t" || n == "\r") {
        n = k.charAt(++l);
      }
      if (n == g) {
        h++;
      } else {
        if (n == j) {
          h = 0;
          s++;
        } else {
          if (n != q) {
            throw "Delimiter expected after character " + l;
          }
        }
      }
      n = k.charAt(++l);
    }
    return m;
  }
  function b(i) {
    if (i != null) {
      var g = new File(i);
      g.open("r");
      h = g.read();
      g.close();
    }
    return h;
  }
  function a(N) {
    function H(
      aU,
      ae,
      ad,
      ay,
      bb,
      aM,
      P,
      ak,
      aD,
      al,
      Y,
      aG,
      az,
      ab,
      aZ,
      bh,
      Z,
      a3,
      Q,
      aP,
      aT,
      aA,
      am,
      U,
      bf,
      a2,
    ) {
      var S = ad;
      var at = ay;
      var V = 0;
      var aq = 0;
      var af = 0;
      var bj = 0;
      var R = 0;
      var a0 = 0;
      var a5 = 0;
      var aK = 0;
      var aJ = bb;
      var an = aM;
      var ba = P;
      e.dataSet1_NAME = new Array();
      e.dataSet2_NAME = new Array();
      e.dataSet3_NAME = new Array();
      e.dataSet1_DESC = new Array();
      e.dataSet2_DESC = new Array();
      e.dataSet3_DESC = new Array();
      e.dataSet1_VALUE = new Array();
      e.dataSet2_VALUE = new Array();
      e.dataSet3_VALUE = new Array();
      e.dataSet1_NAME[0] = aD;
      e.dataSet2_NAME[0] = al;
      e.dataSet3_NAME[0] = Y;
      for (var aB = 0; aB < ak.length; aB += 1) {
        e.dataSet1_DESC[aB] = ak[aB];
        e.dataSet2_DESC[aB] = ak[aB];
        e.dataSet3_DESC[aB] = ak[aB];
        e.dataSet1_VALUE[aB] = aG[aB];
      }
      for (var aB = 0; aB < az.length; aB += 1) {
        e.dataSet2_VALUE[aB] = az[aB];
      }
      for (var aB = 0; aB < ab.length; aB += 1) {
        e.dataSet3_VALUE[aB] = ab[aB];
      }
      for (var aB = 0; aB < e.dataSet1_VALUE.length; aB += 1) {
        if (e.dataSet1_VALUE[aB] > af) {
          af = parseFloat(e.dataSet1_VALUE[aB]);
        }
      }
      for (var aB = 0; aB < e.dataSet2_VALUE.length; aB += 1) {
        if (e.dataSet2_VALUE[aB] > R) {
          R = parseFloat(e.dataSet2_VALUE[aB]);
        }
      }
      for (var aB = 0; aB < e.dataSet3_VALUE.length; aB += 1) {
        if (e.dataSet3_VALUE[aB] > a5) {
          a5 = parseFloat(e.dataSet3_VALUE[aB]);
        }
      }
      if (aJ == 0) {
        aq = af;
      } else {
        if (aJ == 1) {
          if (an == 1) {
            if (af >= R) {
              aq = af;
            } else {
              aq = R;
            }
          } else {
            aq = af + R;
          }
        } else {
          if (aJ == 2) {
            if (an == 1) {
              if (af >= R && af >= a5) {
                aq = af;
              } else {
                if (R >= af && R >= a5) {
                  aq = R;
                } else {
                  if (a5 >= af && a5 >= R) {
                    aq = a5;
                  }
                }
              }
            } else {
              aq = af + R + a5;
            }
          }
        }
      }
      aq *= 1;
      var aE = app.project.items.addComp(aU, 1920, 1080, 1, ae, 30);
      var bd = aE.layers.addNull();
      bd.label = 2;
      bd.name = "Dashboard - Theme";
      bd.enabled = false;
      var a8 = aE.layers.addNull();
      a8.label = 2;
      a8.name = "Animation - Controls";
      a8.enabled = false;
      var ax = aE.layers.addNull();
      ax.label = 2;
      ax.name = "Values - Data Set 1";
      ax.enabled = false;
      if (aJ == 1) {
        var aL = aE.layers.addNull();
        aL.label = 2;
        aL.name = "Values - Data Set 2";
        aL.enabled = false;
      }
      if (aJ == 2) {
        var aL = aE.layers.addNull();
        aL.label = 2;
        aL.name = "Values - Data Set 2";
        aL.enabled = false;
        var a6 = aE.layers.addNull();
        a6.label = 2;
        a6.name = "Values - Data Set 3";
        a6.enabled = false;
      }
      var aF = aE.layers.addSolid(
        [1, 1, 1],
        "Help - Do Not Touch",
        aE.width,
        aE.height,
        1,
      );
      aF.adjustmentLayer = true;
      aF.shy = true;
      aF.label = 2;
      var bc = a8.Effects.addProperty("ADBE Slider Control");
      bc.name = "Animation Duration";
      a8.effect("Animation Duration")("ADBE Slider Control-0001").setValue(2);
      var aY = bd.Effects.addProperty("ADBE Slider Control");
      aY.name = "Decimal Places";
      bd.effect("Decimal Places")("ADBE Slider Control-0001").setValue(2);
      var bi = bd.Effects.addProperty("ADBE Slider Control");
      bi.name = "Chart Width";
      bd.effect("Chart Width")("ADBE Slider Control-0001").setValue(S);
      var aj = bd.Effects.addProperty("ADBE Slider Control");
      aj.name = "Chart Height";
      bd.effect("Chart Height")("ADBE Slider Control-0001").setValue(at);
      var ao = bd.Effects.addProperty("ADBE Slider Control");
      ao.name = "Min Value";
      bd.effect("Min Value")("ADBE Slider Control-0001").setValue(V);
      var aI = bd.Effects.addProperty("ADBE Slider Control");
      aI.name = "Max Value";
      bd.effect("Max Value")("ADBE Slider Control-0001").setValue(aq);
      var be = bd.Effects.addProperty("ADBE Slider Control");
      be.name = "Bar Thickness";
      bd.effect("Bar Thickness")("ADBE Slider Control-0001").setValue(40);
      var ag = bd.Effects.addProperty("ADBE Color Control");
      ag.name = "Data Set 1 Color";
      bd.effect("Data Set 1 Color")("ADBE Color Control-0001").setValue(aZ);
      if (aJ == 1) {
        var aS = bd.Effects.addProperty("ADBE Color Control");
        aS.name = "Data Set 2 Color";
        bd.effect("Data Set 2 Color")("ADBE Color Control-0001").setValue(bh);
      }
      if (aJ == 2) {
        var aS = bd.Effects.addProperty("ADBE Color Control");
        aS.name = "Data Set 2 Color";
        bd.effect("Data Set 2 Color")("ADBE Color Control-0001").setValue(bh);
        var aa = bd.Effects.addProperty("ADBE Color Control");
        aa.name = "Data Set 3 Color";
        bd.effect("Data Set 3 Color")("ADBE Color Control-0001").setValue(Z);
      }
      var aX = bd.Effects.addProperty("ADBE Color Control");
      aX.name = "Outline Color";
      bd.effect("Outline Color")("ADBE Color Control-0001").setValue(Q);
      var a9 = bd.Effects.addProperty("ADBE Color Control");
      a9.name = "Background Color";
      bd.effect("Background Color")("ADBE Color Control-0001").setValue([
        1, 1, 1,
      ]);
      var ar = bd.Effects.addProperty("ADBE Color Control");
      ar.name = "Font Color";
      bd.effect("Font Color")("ADBE Color Control-0001").setValue(a3);
      var av = bd.Effects.addProperty("ADBE Slider Control");
      av.name = "Grid Vertical Parts";
      if (ba == 1) {
        if (am == 0) {
          bd.effect("Grid Vertical Parts")("ADBE Slider Control-0001").setValue(
            aG.length,
          );
        } else {
          bd.effect("Grid Vertical Parts")("ADBE Slider Control-0001").setValue(
            am,
          );
        }
      } else {
        if (am == 0) {
          bd.effect("Grid Vertical Parts")("ADBE Slider Control-0001").setValue(
            aG.length,
          );
        } else {
          bd.effect("Grid Vertical Parts")("ADBE Slider Control-0001").setValue(
            am,
          );
        }
      }
      var X = bd.Effects.addProperty("ADBE Slider Control");
      X.name = "Grid Horizontal Parts";
      if (ba == 1) {
        if (U == 0) {
          bd.effect("Grid Horizontal Parts")(
            "ADBE Slider Control-0001",
          ).setValue(p_ds1values.length);
        } else {
          bd.effect("Grid Horizontal Parts")(
            "ADBE Slider Control-0001",
          ).setValue(U);
        }
      } else {
        if (U == 0) {
          bd.effect("Grid Horizontal Parts")(
            "ADBE Slider Control-0001",
          ).setValue(p_ds1values.length);
        } else {
          bd.effect("Grid Horizontal Parts")(
            "ADBE Slider Control-0001",
          ).setValue(U);
        }
      }
      var ac = bd.Effects.addProperty("ADBE Slider Control");
      ac.name = "Text Offset";
      bd.effect("Text Offset")("ADBE Slider Control-0001").setValue(30);
      var O = bd.Effects.addProperty("ADBE Slider Control");
      O.name = "Text Scale";
      bd.effect("Text Scale")("ADBE Slider Control-0001").setValue(100);
      var aR = bd.Effects.addProperty("ADBE Slider Control");
      aR.name = "Set Names Offset";
      bd.effect("Set Names Offset")("ADBE Slider Control-0001").setValue(100);
      for (var aB = 0; aB < e.dataSet1_VALUE.length; aB += 1) {
        var T = a8.Effects.addProperty("ADBE Slider Control");
        T.name = e.dataSet1_DESC[aB] + " offset";
        a8.effect(e.dataSet1_DESC[aB] + " offset")(
          "ADBE Slider Control-0001",
        ).setValue(0);
        var aN = ax.Effects.addProperty("ADBE Slider Control");
        aN.name = e.dataSet1_DESC[aB];
        ax.effect(e.dataSet1_DESC[aB])("ADBE Slider Control-0001").setValue(
          e.dataSet1_VALUE[aB],
        );
        ax.effect(e.dataSet1_DESC[aB])("ADBE Slider Control-0001").expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              beginAt = thisComp.layer("Animation - Controls").effect("' +
          e.dataSet1_DESC[aB] +
          ' offset")("ADBE Slider Control-0001");                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-beginAt, startvalue, finalvalue, duration );                                                                                              if( time < beginAt + duration ) {                                                                                                if( a < 0) {                                                                                                    value = 0;                                                                                                    }                                                                                                else {                                                                                                    value = a;                                                                                                }                                                                                              }                                                                                              else {                                                                                                 if(value < 0 ) 0;                                                                                                 else value = value;                                                                                               }';
      }
      if (aJ == 1 || aJ == 2) {
        for (var aB = 0; aB < e.dataSet2_VALUE.length; aB += 1) {
          var aN = aL.Effects.addProperty("ADBE Slider Control");
          aN.name = e.dataSet1_DESC[aB];
          aL.effect(e.dataSet1_DESC[aB])("ADBE Slider Control-0001").setValue(
            e.dataSet2_VALUE[aB],
          );
          aL.effect(e.dataSet1_DESC[aB])(
            "ADBE Slider Control-0001",
          ).expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              beginAt = thisComp.layer("Animation - Controls").effect("' +
            e.dataSet1_DESC[aB] +
            ' offset")("ADBE Slider Control-0001");                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-beginAt, startvalue, finalvalue, duration );                                                                                              if( time < beginAt + duration ) {                                                                                                if( a < 0) {                                                                                                    value = 0;                                                                                                    }                                                                                                else {                                                                                                    value = a;                                                                                                }                                                                                              }                                                                                              else {                                                                                                 if(value < 0 ) 0;                                                                                                 else value = value;                                                                                               }';
        }
      }
      if (aJ == 2) {
        for (var aB = 0; aB < e.dataSet3_VALUE.length; aB += 1) {
          var aN = a6.Effects.addProperty("ADBE Slider Control");
          aN.name = e.dataSet1_DESC[aB];
          a6.effect(e.dataSet1_DESC[aB])("ADBE Slider Control-0001").setValue(
            e.dataSet3_VALUE[aB],
          );
          a6.effect(e.dataSet1_DESC[aB])(
            "ADBE Slider Control-0001",
          ).expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              beginAt = thisComp.layer("Animation - Controls").effect("' +
            e.dataSet1_DESC[aB] +
            ' offset")("ADBE Slider Control-0001");                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-beginAt, startvalue, finalvalue, duration );                                                                                              if( time < beginAt + duration ) {                                                                                                if( a < 0) {                                                                                                    value = 0;                                                                                                    }                                                                                                else {                                                                                                    value = a;                                                                                                }                                                                                              }                                                                                              else {                                                                                                 if(value < 0 ) 0;                                                                                                 else value = value;                                                                                               }';
        }
      }
      var aV = aE.layers.addSolid([1, 1, 1], "Grid", aE.width, aE.height, 1);
      aV.shy = true;
      aV.label = 8;
      if (a2 == "true") {
        aV.blendingMode = BlendingMode.OVERLAY;
      }
      aV.opacity.expression =
        'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      var aH = aV.Effects.addProperty("ADBE Grid");
      aH.name = "Chart Grid";
      aV.effect("Chart Grid")("ADBE Grid-0001").setValue([0, 0]);
      aV.effect("Chart Grid")("ADBE Grid-0002").setValue(3);
      aV.effect("Chart Grid")("ADBE Grid-0006").setValue(bf);
      aV.effect("Chart Grid")("ADBE Grid-0012").expression =
        'thisComp.layer("Dashboard - Theme").effect("Outline Color")("ADBE Color Control-0001");';
      aV.effect("Chart Grid")("ADBE Grid-0004").expression =
        '(thisComp.width-2) / thisComp.layer("Dashboard - Theme").effect("Grid Vertical Parts")("ADBE Slider Control-0001")';
      aV.effect("Chart Grid")("ADBE Grid-0005").expression =
        '(thisComp.height-2) / thisComp.layer("Dashboard - Theme").effect("Grid Horizontal Parts")("ADBE Slider Control-0001")';
      var a1 = aV.Effects.addProperty("ADBE Corner Pin");
      a1.name = "Adjust Grid";
      aV.effect("Adjust Grid")("ADBE Corner Pin-0001").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width-w)/2, (thisComp.height-h)/2];                                                                                  ';
      aV.effect("Adjust Grid")("ADBE Corner Pin-0002").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width+w)/2, (thisComp.height-h)/2];                                                                                  ';
      aV.effect("Adjust Grid")("ADBE Corner Pin-0003").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width-w)/2, (thisComp.height+h)/2];                                                                                  ';
      aV.effect("Adjust Grid")("ADBE Corner Pin-0004").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width+w)/2, (thisComp.height+h)/2];                                                                                  ';
      for (var aB = 0; aB < e.dataSet1_VALUE.length; aB += 1) {
        var ai = aF.Effects.addProperty("ADBE Point Control");
        ai.name = "DS1_" + e.dataSet1_DESC[aB];
        if (ba == 0) {
          if (aJ == 1) {
            if (an == 1) {
              aF.effect("DS1_" + e.dataSet1_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                            counter = ' +
                aB +
                1 +
                ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / ' +
                e.dataSet1_DESC.length +
                ";                                                                            part_y = h / (max-min);                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2 - bar/2 - 2, thisComp.height/2 + h/2 - part_y * (v-min)];";
            } else {
              if (an == 0) {
                aF.effect("DS1_" + e.dataSet1_DESC[aB])(
                  "ADBE Point Control-0001",
                ).expression =
                  'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
                  e.dataSet1_DESC[aB] +
                  '")("ADBE Slider Control-0001");                                                                            counter = ' +
                  aB +
                  1 +
                  ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / ' +
                  e.dataSet1_DESC.length +
                  ";                                                                            part_y = h / (max-min);                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2, thisComp.height/2 + h/2 - part_y * (v-min)];";
              }
            }
          } else {
            if (aJ == 0) {
              aF.effect("DS1_" + e.dataSet1_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                            counter = ' +
                aB +
                1 +
                ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / ' +
                e.dataSet1_DESC.length +
                ";                                                                            part_y = h / (max-min);                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2, thisComp.height/2 + h/2 - part_y * (v-min)];";
            } else {
              if (aJ == 2) {
                if (an == 1) {
                  aF.effect("DS1_" + e.dataSet1_DESC[aB])(
                    "ADBE Point Control-0001",
                  ).expression =
                    'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
                    e.dataSet1_DESC[aB] +
                    '")("ADBE Slider Control-0001");                                                                            counter = ' +
                    aB +
                    1 +
                    ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / ' +
                    e.dataSet1_DESC.length +
                    ";                                                                            part_y = h / (max-min);                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2 - bar - 4, thisComp.height/2 + h/2 - part_y * (v-min)];";
                } else {
                  if (an == 0) {
                    aF.effect("DS1_" + e.dataSet1_DESC[aB])(
                      "ADBE Point Control-0001",
                    ).expression =
                      'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
                      e.dataSet1_DESC[aB] +
                      '")("ADBE Slider Control-0001");                                                                            counter = ' +
                      aB +
                      1 +
                      ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / ' +
                      e.dataSet1_DESC.length +
                      ";                                                                            part_y = h / (max-min);                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2, thisComp.height/2 + h/2 - part_y * (v-min)];";
                  }
                }
              }
            }
          }
        } else {
          if (aJ == 0) {
            aF.effect("DS1_" + e.dataSet1_DESC[aB])(
              "ADBE Point Control-0001",
            ).expression =
              'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aB] +
              '")("ADBE Slider Control-0001");                                                                            counter = ' +
              aB +
              1 +
              ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
              e.dataSet1_DESC.length +
              ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2];";
          } else {
            if (aJ == 1) {
              aF.effect("DS1_" + e.dataSet1_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                            counter = ' +
                aB +
                1 +
                ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
                e.dataSet1_DESC.length +
                ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2 - bar/2 - 2];";
            } else {
              if (aJ == 2) {
                aF.effect("DS1_" + e.dataSet1_DESC[aB])(
                  "ADBE Point Control-0001",
                ).expression =
                  'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
                  e.dataSet1_DESC[aB] +
                  '")("ADBE Slider Control-0001");                                                                            counter = ' +
                  aB +
                  1 +
                  ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
                  e.dataSet1_DESC.length +
                  ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2 - bar - 4];";
              }
            }
          }
        }
      }
      if (aJ == 1 || aJ == 2) {
        for (var aB = 0; aB < e.dataSet2_VALUE.length; aB += 1) {
          var ai = aF.Effects.addProperty("ADBE Point Control");
          ai.name = "DS2_" + e.dataSet2_DESC[aB];
          if (an == 0) {
            if (ba == 0) {
              aF.effect("DS2_" + e.dataSet2_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                            v = thisComp.layer("Values - Data Set 2").effect("' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                                                                            counter = ' +
                aB +
                1 +
                ';                                                                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                                                            part_x = w / ' +
                e.dataSet2_DESC.length +
                ";                                                                                                                            part_y = h / (max-min);                                                                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2, thisComp.height/2 + h/2 - part_y * (v-min)];";
            } else {
              aF.effect("DS2_" + e.dataSet2_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 2").effect("' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                            counter = ' +
                aB +
                1 +
                ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
                e.dataSet2_DESC.length +
                ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2];";
            }
          } else {
            if (ba == 0) {
              if (aJ != 1) {
                aF.effect("DS2_" + e.dataSet2_DESC[aB])(
                  "ADBE Point Control-0001",
                ).expression =
                  'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                            v = thisComp.layer("Values - Data Set 2").effect("' +
                  e.dataSet2_DESC[aB] +
                  '")("ADBE Slider Control-0001");                                                                                                                            counter = ' +
                  aB +
                  1 +
                  ';                                                                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                                                            part_x = w / ' +
                  e.dataSet2_DESC.length +
                  ";                                                                                                                            part_y = h / (max-min);                                                                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2, thisComp.height/2 + h/2 - part_y * (v-min)];";
              } else {
                aF.effect("DS2_" + e.dataSet2_DESC[aB])(
                  "ADBE Point Control-0001",
                ).expression =
                  'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                            v = thisComp.layer("Values - Data Set 2").effect("' +
                  e.dataSet2_DESC[aB] +
                  '")("ADBE Slider Control-0001");                                                                                                                            counter = ' +
                  aB +
                  1 +
                  ';                                                                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                                                            part_x = w / ' +
                  e.dataSet2_DESC.length +
                  ";                                                                                                                            part_y = h / (max-min);                                                                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2 + bar/2 + 2, thisComp.height/2 + h/2 - part_y * (v-min)];";
              }
            } else {
              if (aJ == 1) {
                aF.effect("DS2_" + e.dataSet2_DESC[aB])(
                  "ADBE Point Control-0001",
                ).expression =
                  'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 2").effect("' +
                  e.dataSet2_DESC[aB] +
                  '")("ADBE Slider Control-0001");                                                                            counter = ' +
                  aB +
                  1 +
                  ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
                  e.dataSet2_DESC.length +
                  ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2  + bar/2 + 2];";
              } else {
                if (aJ == 2) {
                  aF.effect("DS2_" + e.dataSet2_DESC[aB])(
                    "ADBE Point Control-0001",
                  ).expression =
                    'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 2").effect("' +
                    e.dataSet2_DESC[aB] +
                    '")("ADBE Slider Control-0001");                                                                            counter = ' +
                    aB +
                    1 +
                    ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
                    e.dataSet2_DESC.length +
                    ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2];";
                }
              }
            }
          }
        }
      }
      if (aJ == 2) {
        for (var aB = 0; aB < e.dataSet3_VALUE.length; aB += 1) {
          var ai = aF.Effects.addProperty("ADBE Point Control");
          ai.name = "DS3_" + e.dataSet3_DESC[aB];
          if (an == 0) {
            if (ba == 0) {
              aF.effect("DS3_" + e.dataSet3_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                            v = thisComp.layer("Values - Data Set 3").effect("' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                                                                            counter = ' +
                aB +
                1 +
                ';                                                                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                                                            part_x = w / ' +
                e.dataSet3_DESC.length +
                ";                                                                                                                            part_y = h / (max-min);                                                                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2, thisComp.height/2 + h/2 - part_y * (v-min)];";
            } else {
              aF.effect("DS3_" + e.dataSet3_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 3").effect("' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                            counter = ' +
                aB +
                1 +
                ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
                e.dataSet3_DESC.length +
                ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2];";
            }
          } else {
            if (ba == 0) {
              aF.effect("DS3_" + e.dataSet3_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                            v = thisComp.layer("Values - Data Set 3").effect("' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                                                                            counter = ' +
                aB +
                1 +
                ';                                                                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                                                            part_x = w / ' +
                e.dataSet3_DESC.length +
                ";                                                                                                                            part_y = h / (max-min);                                                                                                                            p = [thisComp.width/2 - w/2 + (part_x*counter) - part_x/2 + bar + 4, thisComp.height/2 + h/2 - part_y * (v-min)];";
            } else {
              aF.effect("DS3_" + e.dataSet3_DESC[aB])(
                "ADBE Point Control-0001",
              ).expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 3").effect("' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Slider Control-0001");                                                                            counter = ' +
                aB +
                1 +
                ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / (max-min);                                                                            part_y = h / ' +
                e.dataSet3_DESC.length +
                ";                                                                            p = [thisComp.width/2 + w/2 - part_x * (v-min), thisComp.height/2 - h/2 + (part_y*counter) - part_y/2  + bar + 4];";
            }
          }
        }
      }
      for (var aB = 0; aB < e.dataSet1_VALUE.length; aB += 1) {
        var aQ = aE.layers.addSolid([0, 0, 0], "DS1_Bar_" + aB, 100, 100, 1);
        aQ.shy = true;
        aQ.label = 9;
        aQ.anchorPoint.setValue([50, 100]);
        if (ba == 1) {
          aQ.rotation.expression = "90";
          aQ.position.expression =
            'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                      h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                      v = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
            e.dataSet1_DESC[aB] +
            '")("ADBE Point Control-0001")[1];                                                      x = (thisComp.width-w)/2;                                                      [x, v];                                                      ';
          aQ.scale.expression =
            '   w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                      h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                      v = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
            e.dataSet1_DESC[aB] +
            '")("ADBE Point Control-0001")[0];                                                      a = (thisComp.width+w)/2 - v;                                                      x = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                      [x, a]                                                      ';
        } else {
          aQ.rotation.expression = "0";
          aQ.position.expression =
            'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                      h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                      v = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
            e.dataSet1_DESC[aB] +
            '")("ADBE Point Control-0001")[0];                                                      x = (thisComp.height+h)/2;                                                      [v, x];                                                      ';
          aQ.scale.expression =
            '   w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                      h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                      v = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
            e.dataSet1_DESC[aB] +
            '")("ADBE Point Control-0001")[1];                                                      a = (thisComp.height+h)/2 - v;                                                      x = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                      [x, a]                                                      ';
        }
        var aO = aQ.Effects.addProperty("ADBE Fill");
        aO.name = "FillBar";
        aQ.effect("FillBar")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
        aQ.collapseTransformation = true;
        aQ.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      }
      if (aJ == 1 || aJ == 2) {
        for (var aB = 0; aB < e.dataSet2_VALUE.length; aB += 1) {
          var aQ = aE.layers.addSolid([0, 0, 0], "DS2_Bar_" + aB, 100, 100, 1);
          aQ.shy = true;
          aQ.label = 9;
          aQ.anchorPoint.setValue([50, 100]);
          if (ba == 1) {
            aQ.rotation.expression = "90";
            if (an == 1) {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          x = (thisComp.width-w)/2;                                                          [x, v];                                                          ';
            } else {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          x = thisComp.width - thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          [x, v];                                                          ';
            }
            aQ.scale.expression =
              '   w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aB] +
              '")("ADBE Point Control-0001")[0];                                                          a = (thisComp.width+w)/2 - v;                                                          x = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                          [x, a]                                                          ';
          } else {
            aQ.rotation.expression = "0";
            if (an == 1) {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          x = (thisComp.height+h)/2;                                                          [v, x];                                                          ';
            } else {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          [v, x];                                                          ';
            }
            aQ.scale.expression =
              '   w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aB] +
              '")("ADBE Point Control-0001")[1];                                                          a = (thisComp.height+h)/2 - v;                                                          x = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                          [x, a]                                                          ';
          }
          var aO = aQ.Effects.addProperty("ADBE Fill");
          aO.name = "FillBar";
          aQ.effect("FillBar")("ADBE Fill-0002").expression =
            'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
          aQ.collapseTransformation = true;
          aQ.opacity.expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        }
      }
      if (aJ == 2) {
        for (var aB = 0; aB < e.dataSet3_VALUE.length; aB += 1) {
          var aQ = aE.layers.addSolid([0, 0, 0], "DS3_Bar_" + aB, 100, 100, 1);
          aQ.shy = true;
          aQ.label = 9;
          aQ.anchorPoint.setValue([50, 100]);
          if (ba == 1) {
            aQ.rotation.expression = "90";
            if (an == 1) {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          x = (thisComp.width-w)/2;                                                          [x, v];                                                          ';
            } else {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          v1 = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          v2 = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          v3 = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          s = thisComp.layer("DS2_Bar_' +
                aB +
                '").transform.scale[1];                                                           x = thisComp.width - v1 + s;                                                          [x, v];                                                          ';
            }
            aQ.scale.expression =
              '   w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aB] +
              '")("ADBE Point Control-0001")[0];                                                          a = (thisComp.width+w)/2 - v;                                                          x = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                          [x, a]                                                          ';
          } else {
            aQ.rotation.expression = "0";
            if (an == 1) {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          x = (thisComp.height+h)/2;                                                          [v, x];                                                          ';
            } else {
              aQ.position.expression =
                'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Point Control-0001")[0];                                                          v1 = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          v2 = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                e.dataSet2_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          v3 = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
                e.dataSet3_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                          x = (v2 - (thisComp.height/2 + h/2)) + v1;                                                           [v, x];                                                          ';
            }
            aQ.scale.expression =
              '   w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          v = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aB] +
              '")("ADBE Point Control-0001")[1];                                                          a = (thisComp.height+h)/2 - v;                                                          x = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                          [x, a]                                                          ';
          }
          var aO = aQ.Effects.addProperty("ADBE Fill");
          aO.name = "FillBar";
          aQ.effect("FillBar")("ADBE Fill-0002").expression =
            'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
          aQ.collapseTransformation = true;
          aQ.opacity.expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        }
      }
      if (aJ == 0 || aJ == 1 || aJ == 2) {
        var aQ = aE.layers.addSolid([0, 0, 0], "Set 1 Color" + aB, 16, 16, 1);
        aQ.shy = true;
        aQ.label = 9;
        aQ.anchorPoint.setValue([8, 8]);
        aQ.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                      w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                       h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                       offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                      p = [thisComp.width/2 - w/2 + 8, (thisComp.height+h)/2 + offset*2 - 4];                                                      ';
        var aO = aQ.Effects.addProperty("ADBE Fill");
        aO.name = "FillBar";
        aQ.effect("FillBar")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
        aQ.collapseTransformation = true;
        aQ.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        var aC = aE.layers.addText(e.dataSet1_NAME[0]);
        var a7 = aC.property("Source Text");
        var bg = a7.value;
        bg.resetCharStyle();
        bg.fontSize = 18;
        bg.font = aP;
        bg.justification = ParagraphJustification.LEFT_JUSTIFY;
        a7.setValue(bg);
        var a4 = aC.Effects.addProperty("ADBE Fill");
        a4.name = "FillTitle";
        aC.effect("FillTitle")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        aC.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [24 + thisComp.width/2 - w/2 + 8, (thisComp.height+h)/2 + offset*2];                                                         ';
        aC.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
      }
      if (aJ == 1 || aJ == 2) {
        var aQ = aE.layers.addSolid([0, 0, 0], "Set 2 Color" + aB, 16, 16, 1);
        aQ.shy = true;
        aQ.label = 9;
        aQ.anchorPoint.setValue([8, 8]);
        aQ.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [thisComp.width/2 - w/2 + x + 32, (thisComp.height+h)/2 + offset*2 - 4];                                                         ';
        var aO = aQ.Effects.addProperty("ADBE Fill");
        aO.name = "FillBar";
        aQ.effect("FillBar")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
        aQ.collapseTransformation = true;
        aQ.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        var ah = aE.layers.addText(e.dataSet2_NAME[0]);
        var a7 = ah.property("Source Text");
        var bg = a7.value;
        bg.resetCharStyle();
        bg.fontSize = 18;
        bg.font = aP;
        bg.justification = ParagraphJustification.LEFT_JUSTIFY;
        a7.setValue(bg);
        var a4 = ah.Effects.addProperty("ADBE Fill");
        a4.name = "FillTitle";
        ah.effect("FillTitle")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        ah.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [24 + thisComp.width/2 - w/2 + x + 32, (thisComp.height+h)/2 + offset*2];                                                         ';
        ah.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
      }
      if (aJ == 2) {
        var aQ = aE.layers.addSolid([0, 0, 0], "Set 3 Color" + aB, 16, 16, 1);
        aQ.shy = true;
        aQ.label = 9;
        aQ.anchorPoint.setValue([8, 8]);
        aQ.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [thisComp.width/2 - w/2  + 2*x + 64, (thisComp.height+h)/2 + offset*2 - 4];                                                         ';
        var aO = aQ.Effects.addProperty("ADBE Fill");
        aO.name = "FillBar";
        aQ.effect("FillBar")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
        aQ.collapseTransformation = true;
        aQ.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        var W = aE.layers.addText(e.dataSet3_NAME[0]);
        var a7 = W.property("Source Text");
        var bg = a7.value;
        bg.resetCharStyle();
        bg.fontSize = 18;
        bg.font = aP;
        bg.justification = ParagraphJustification.LEFT_JUSTIFY;
        a7.setValue(bg);
        var a4 = W.Effects.addProperty("ADBE Fill");
        a4.name = "FillTitle";
        W.effect("FillTitle")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        W.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [24 + thisComp.width/2 - w/2  + 2*x + 64, (thisComp.height+h)/2 + offset*2];                                                         ';
        W.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
      }
      for (var aB = 0; aB < e.dataSet3_DESC.length; aB += 1) {
        var aW = aE.layers.addText(e.dataSet3_DESC[aB]);
        if (ba == 0) {
          if (aJ == 0) {
            aW.position.expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aB] +
              '")("ADBE Point Control-0001")[0];                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [x, (thisComp.height+h)/2 + offset];                                                        ';
          } else {
            if (aJ == 1) {
              if (an == 1) {
                aW.position.expression =
                  'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                  e.dataSet1_DESC[aB] +
                  '")("ADBE Point Control-0001")[0];                                                       bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [x + bar/2 + 2, (thisComp.height+h)/2 + offset];                                                        ';
              } else {
                if (an == 0) {
                  aW.position.expression =
                    'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                    e.dataSet1_DESC[aB] +
                    '")("ADBE Point Control-0001")[0];                                                       bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [x, (thisComp.height+h)/2 + offset];                                                        ';
                }
              }
            } else {
              if (aJ == 2) {
                aW.position.expression =
                  'x = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
                  e.dataSet2_DESC[aB] +
                  '")("ADBE Point Control-0001")[0];                                                       bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [x, (thisComp.height+h)/2 + offset];                                                        ';
              }
            }
          }
        } else {
          if (aJ == 0) {
            aW.position.expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aB] +
              '")("ADBE Point Control-0001")[1];                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [thisComp.width/2 - w/2 - offset, x + 4];                                                        ';
          } else {
            if (aJ == 1) {
              aW.position.expression =
                'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                e.dataSet1_DESC[aB] +
                '")("ADBE Point Control-0001")[1];                                                        bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [thisComp.width/2 - w/2 - offset, x + 4 + bar/2 + 2];                                                        ';
            } else {
              if (aJ == 2) {
                aW.position.expression =
                  'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
                  e.dataSet1_DESC[aB] +
                  '")("ADBE Point Control-0001")[1];                                                        bar = thisComp.layer("Dashboard - Theme").effect("Bar Thickness")("ADBE Slider Control-0001");                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [thisComp.width/2 - w/2 - offset, x + 4 + bar + 4];                                                        ';
              }
            }
          }
        }
        aW.scale.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Text Scale")("ADBE Slider Control-0001"); [x, x];';
        aW.shy = true;
        var a7 = aW.property("Source Text");
        var bg = a7.value;
        bg.resetCharStyle();
        bg.fontSize = 18;
        bg.font = aP;
        if (ba == 0) {
          bg.justification = ParagraphJustification.CENTER_JUSTIFY;
        } else {
          bg.justification = ParagraphJustification.RIGHT_JUSTIFY;
        }
        a7.setValue(bg);
        var ap = aW.Effects.addProperty("ADBE Fill");
        ap.name = "FillText";
        aW.effect("FillText")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        aW.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      }
      var aw = aE.layers.addText(aU.split("_")[0]);
      var a7 = aw.property("Source Text");
      var bg = a7.value;
      bg.resetCharStyle();
      bg.fontSize = 36;
      bg.font = aP;
      bg.justification = ParagraphJustification.CENTER_JUSTIFY;
      a7.setValue(bg);
      var a4 = aw.Effects.addProperty("ADBE Fill");
      a4.name = "FillTitle";
      aw.effect("FillTitle")("ADBE Fill-0002").expression =
        'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
      aw.position.expression =
        'h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                     [thisComp.width/2, (thisComp.height-h)/2 - 100];';
      aw.opacity.expression =
        'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      if (ba == 0) {
        for (var aB = 0; aB <= 10; aB += 1) {
          var aW = aE.layers.addText("text");
          aW.position.expression =
            'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                            offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                           p = [(thisComp.width-w)/2 - offset, ((thisComp.height-h)/2) + (h/10)*' +
            aB +
            "];                                                            ";
          var a7 = aW.property("Source Text");
          a7.expression =
            'min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                               max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                               "' +
            aT +
            '" +(max - (((max-min)/10)* ' +
            aB +
            ')).toFixed(parseInt(thisComp.layer("Dashboard - Theme").effect("Decimal Places")("ADBE Slider Control-0001"))) + "' +
            aA +
            '";                                               ';
          var bg = a7.value;
          bg.resetCharStyle();
          bg.fontSize = 18;
          bg.font = aP;
          bg.justification = ParagraphJustification.RIGHT_JUSTIFY;
          a7.setValue(bg);
          aW.shy = true;
          var au = aW.Effects.addProperty("ADBE Fill");
          au.name = "FillText2";
          aW.effect("FillText2")("ADBE Fill-0002").expression =
            'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
          aW.opacity.expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        }
      } else {
        for (var aB = 0; aB <= 10; aB += 1) {
          var aW = aE.layers.addText("text");
          aW.position.expression =
            'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                            offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                           p = [((thisComp.width-w)/2) + (w/10)*' +
            (10 - aB) +
            ",(thisComp.height+h)/2 + offset]";
          var a7 = aW.property("Source Text");
          a7.expression =
            'min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                               max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                               "' +
            aT +
            '" + (max - (((max-min)/10)* ' +
            aB +
            ')).toFixed(parseInt(thisComp.layer("Dashboard - Theme").effect("Decimal Places")("ADBE Slider Control-0001"))) + "' +
            aA +
            '";                                               ';
          var bg = a7.value;
          bg.resetCharStyle();
          bg.fontSize = 18;
          bg.font = aP;
          bg.justification = ParagraphJustification.CENTER_JUSTIFY;
          a7.setValue(bg);
          aW.shy = true;
          var au = aW.Effects.addProperty("ADBE Fill");
          au.name = "FillText2";
          aW.effect("FillText2")("ADBE Fill-0002").expression =
            'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
          aW.opacity.expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        }
      }
      return aE;
    }
    function l(
      a9,
      af,
      ac,
      ay,
      bq,
      aS,
      al,
      aG,
      am,
      X,
      aL,
      az,
      Z,
      be,
      bw,
      Y,
      bi,
      R,
      a0,
      a8,
      aA,
      an,
      T,
      bu,
      bh,
      ao,
      a2,
    ) {
      var at = ac;
      var ah = ay;
      var aZ = 0;
      var bs = 0;
      var bl = 0;
      var aU = 0;
      var a1 = 0;
      var aB = 0;
      var aH = 0;
      var ag = 0;
      var bg = bq;
      var aP = aS;
      var ad = 1;
      e.dataSet1_NAME = new Array();
      e.dataSet2_NAME = new Array();
      e.dataSet3_NAME = new Array();
      e.dataSet1_DESC = new Array();
      e.dataSet2_DESC = new Array();
      e.dataSet3_DESC = new Array();
      e.dataSet1_VALUE = new Array();
      e.dataSet2_VALUE = new Array();
      e.dataSet3_VALUE = new Array();
      e.dataSet1_NAME[0] = aG;
      e.dataSet2_NAME[0] = am;
      e.dataSet3_NAME[0] = X;
      for (var aC = 0; aC < al.length; aC += 1) {
        e.dataSet1_DESC[aC] = al[aC];
        e.dataSet2_DESC[aC] = al[aC];
        e.dataSet3_DESC[aC] = al[aC];
        e.dataSet1_VALUE[aC] = aL[aC];
      }
      for (var aC = 0; aC < az.length; aC += 1) {
        e.dataSet2_VALUE[aC] = az[aC];
      }
      for (var aC = 0; aC < Z.length; aC += 1) {
        e.dataSet3_VALUE[aC] = Z[aC];
      }
      for (var aC = 0; aC < e.dataSet1_VALUE.length; aC += 1) {
        if (e.dataSet1_VALUE[aC] > bl) {
          bl = parseFloat(e.dataSet1_VALUE[aC]);
        }
      }
      for (var aC = 0; aC < e.dataSet2_VALUE.length; aC += 1) {
        if (e.dataSet2_VALUE[aC] > a1) {
          a1 = parseFloat(e.dataSet2_VALUE[aC]);
        }
      }
      for (var aC = 0; aC < e.dataSet3_VALUE.length; aC += 1) {
        if (e.dataSet3_VALUE[aC] > aH) {
          aH = parseFloat(e.dataSet3_VALUE[aC]);
        }
      }
      if (bg == 0) {
        bs = bl;
      } else {
        if (bg == 1) {
          if (ad == 1) {
            if (bl >= a1) {
              bs = bl;
            } else {
              bs = a1;
            }
          } else {
            bs = bl + a1;
          }
        } else {
          if (ad == 1) {
            if (bl >= a1 && bl >= aH) {
              bs = bl;
            } else {
              if (a1 >= bl && a1 >= aH) {
                bs = a1;
              } else {
                if (aH >= bl && aH >= a1) {
                  bs = aH;
                }
              }
            }
          } else {
            bs = bl + a1 + aH;
          }
        }
      }
      bs *= 1.1;
      aZ *= 0.9;
      var aI = app.project.items.addComp(a9, 1920, 1080, 1, af, 30);
      var bt = aI.layers.addNull();
      bt.label = 2;
      bt.name = "Dashboard - Theme";
      bt.enabled = false;
      var bn = aI.layers.addNull();
      bn.label = 2;
      bn.name = "Animation - Controls";
      bn.enabled = false;
      var ax = aI.layers.addNull();
      ax.label = 2;
      ax.name = "Values - Data Set 1";
      ax.enabled = false;
      if (bg == 1) {
        var aR = aI.layers.addNull();
        aR.label = 2;
        aR.name = "Values - Data Set 2";
        aR.enabled = false;
      }
      if (bg == 2) {
        var aR = aI.layers.addNull();
        aR.label = 2;
        aR.name = "Values - Data Set 2";
        aR.enabled = false;
        var bk = aI.layers.addNull();
        bk.label = 2;
        bk.name = "Values - Data Set 3";
        bk.enabled = false;
      }
      var aK = aI.layers.addSolid(
        [1, 1, 1],
        "Help - Do Not Touch",
        aI.width,
        aI.height,
        1,
      );
      aK.adjustmentLayer = true;
      aK.shy = true;
      aK.label = 2;
      var br = bn.Effects.addProperty("ADBE Slider Control");
      br.name = "Animation Duration";
      bn.effect("Animation Duration")("ADBE Slider Control-0001").setValue(2);
      var bd = bt.Effects.addProperty("ADBE Slider Control");
      bd.name = "Decimal Places";
      bt.effect("Decimal Places")("ADBE Slider Control-0001").setValue(2);
      var by = bt.Effects.addProperty("ADBE Slider Control");
      by.name = "Chart Width";
      bt.effect("Chart Width")("ADBE Slider Control-0001").setValue(at);
      var ak = bt.Effects.addProperty("ADBE Slider Control");
      ak.name = "Chart Height";
      bt.effect("Chart Height")("ADBE Slider Control-0001").setValue(ah);
      var ap = bt.Effects.addProperty("ADBE Slider Control");
      ap.name = "Min Value";
      bt.effect("Min Value")("ADBE Slider Control-0001").setValue(aZ);
      var aQ = bt.Effects.addProperty("ADBE Slider Control");
      aQ.name = "Max Value";
      bt.effect("Max Value")("ADBE Slider Control-0001").setValue(bs);
      var aM = bt.Effects.addProperty("ADBE Slider Control");
      aM.name = "Line Thickness";
      bt.effect("Line Thickness")("ADBE Slider Control-0001").setValue(ao);
      var aa = bt.Effects.addProperty("ADBE Slider Control");
      aa.name = "Dot Radius";
      bt.effect("Dot Radius")("ADBE Slider Control-0001").setValue(a2);
      var aJ = bt.Effects.addProperty("ADBE Color Control");
      aJ.name = "Data Set 1 Color";
      bt.effect("Data Set 1 Color")("ADBE Color Control-0001").setValue(be);
      var O = bt.Effects.addProperty("ADBE Slider Control");
      O.name = "Set 1 Opacity";
      bt.effect("Set 1 Opacity")("ADBE Slider Control-0001").setValue(90);
      var aY = bn.Effects.addProperty("ADBE Slider Control");
      aY.name = "Set 1 Animation";
      bn.effect("Set 1 Animation")("ADBE Slider Control-0001").setValue(100);
      if (bg == 1) {
        var Q = bt.Effects.addProperty("ADBE Color Control");
        Q.name = "Data Set 2 Color";
        bt.effect("Data Set 2 Color")("ADBE Color Control-0001").setValue(bw);
        var aD = bt.Effects.addProperty("ADBE Slider Control");
        aD.name = "Set 2 Opacity";
        bt.effect("Set 2 Opacity")("ADBE Slider Control-0001").setValue(90);
        var aX = bn.Effects.addProperty("ADBE Slider Control");
        aX.name = "Set 2 Animation";
        bn.effect("Set 2 Animation")("ADBE Slider Control-0001").setValue(100);
      }
      if (bg == 2) {
        var Q = bt.Effects.addProperty("ADBE Color Control");
        Q.name = "Data Set 2 Color";
        bt.effect("Data Set 2 Color")("ADBE Color Control-0001").setValue(bw);
        var aD = bt.Effects.addProperty("ADBE Slider Control");
        aD.name = "Set 2 Opacity";
        bt.effect("Set 2 Opacity")("ADBE Slider Control-0001").setValue(90);
        var aO = bt.Effects.addProperty("ADBE Color Control");
        aO.name = "Data Set 3 Color";
        bt.effect("Data Set 3 Color")("ADBE Color Control-0001").setValue(Y);
        var bp = bt.Effects.addProperty("ADBE Slider Control");
        bp.name = "Set 3 Opacity";
        bt.effect("Set 3 Opacity")("ADBE Slider Control-0001").setValue(90);
        var aX = bn.Effects.addProperty("ADBE Slider Control");
        aX.name = "Set 2 Animation";
        bn.effect("Set 2 Animation")("ADBE Slider Control-0001").setValue(100);
        var aV = bn.Effects.addProperty("ADBE Slider Control");
        aV.name = "Set 3 Animation";
        bn.effect("Set 3 Animation")("ADBE Slider Control-0001").setValue(100);
      }
      var bc = bt.Effects.addProperty("ADBE Color Control");
      bc.name = "Outline Color";
      bt.effect("Outline Color")("ADBE Color Control-0001").setValue(R);
      var bo = bt.Effects.addProperty("ADBE Color Control");
      bo.name = "Background Color";
      bt.effect("Background Color")("ADBE Color Control-0001").setValue([
        1, 1, 1,
      ]);
      var ar = bt.Effects.addProperty("ADBE Color Control");
      ar.name = "Font Color";
      bt.effect("Font Color")("ADBE Color Control-0001").setValue(bi);
      var av = bt.Effects.addProperty("ADBE Slider Control");
      av.name = "Grid Vertical Parts";
      if (an == 0) {
        bt.effect("Grid Vertical Parts")("ADBE Slider Control-0001").setValue(
          aL.length,
        );
      } else {
        bt.effect("Grid Vertical Parts")("ADBE Slider Control-0001").setValue(
          an,
        );
      }
      var W = bt.Effects.addProperty("ADBE Slider Control");
      W.name = "Grid Horizontal Parts";
      if (T == 0) {
        bt.effect("Grid Horizontal Parts")("ADBE Slider Control-0001").setValue(
          p_ds1values.length,
        );
      } else {
        bt.effect("Grid Horizontal Parts")("ADBE Slider Control-0001").setValue(
          T,
        );
      }
      var ab = bt.Effects.addProperty("ADBE Slider Control");
      ab.name = "Text Offset";
      bt.effect("Text Offset")("ADBE Slider Control-0001").setValue(30);
      var P = bt.Effects.addProperty("ADBE Slider Control");
      P.name = "Text Scale";
      bt.effect("Text Scale")("ADBE Slider Control-0001").setValue(100);
      var a4 = bt.Effects.addProperty("ADBE Slider Control");
      a4.name = "Set Names Offset";
      bt.effect("Set Names Offset")("ADBE Slider Control-0001").setValue(100);
      aI.hideShyLayers = true;
      for (var aC = 0; aC < e.dataSet1_VALUE.length; aC += 1) {
        var aT = ax.Effects.addProperty("ADBE Slider Control");
        aT.name = e.dataSet1_DESC[aC];
        ax.effect(e.dataSet1_DESC[aC])("ADBE Slider Control-0001").setValue(
          e.dataSet1_VALUE[aC],
        );
        ax.effect(e.dataSet1_DESC[aC])("ADBE Slider Control-0001").expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      }
      if (bg == 1 || bg == 2) {
        for (var aC = 0; aC < e.dataSet2_VALUE.length; aC += 1) {
          var aT = aR.Effects.addProperty("ADBE Slider Control");
          aT.name = e.dataSet2_DESC[aC];
          aR.effect(e.dataSet2_DESC[aC])("ADBE Slider Control-0001").setValue(
            e.dataSet2_VALUE[aC],
          );
          aR.effect(e.dataSet2_DESC[aC])(
            "ADBE Slider Control-0001",
          ).expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        }
      }
      if (bg == 2) {
        for (var aC = 0; aC < e.dataSet3_VALUE.length; aC += 1) {
          var aT = bk.Effects.addProperty("ADBE Slider Control");
          aT.name = e.dataSet3_DESC[aC];
          bk.effect(e.dataSet3_DESC[aC])("ADBE Slider Control-0001").setValue(
            e.dataSet3_VALUE[aC],
          );
          bk.effect(e.dataSet3_DESC[aC])(
            "ADBE Slider Control-0001",
          ).expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        }
      }
      var ba = aI.layers.addSolid([1, 1, 1], "Grid", aI.width, aI.height, 1);
      ba.shy = true;
      ba.label = 8;
      if (bh == "true") {
        ba.blendingMode = BlendingMode.OVERLAY;
      }
      ba.opacity.expression =
        'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      var aN = ba.Effects.addProperty("ADBE Grid");
      aN.name = "Chart Grid";
      ba.effect("Chart Grid")("ADBE Grid-0001").setValue([0, 0]);
      ba.effect("Chart Grid")("ADBE Grid-0002").setValue(3);
      ba.effect("Chart Grid")("ADBE Grid-0006").setValue(bu);
      ba.effect("Chart Grid")("ADBE Grid-0012").expression =
        'thisComp.layer("Dashboard - Theme").effect("Outline Color")("ADBE Color Control-0001");';
      ba.effect("Chart Grid")("ADBE Grid-0004").expression =
        '(thisComp.width-2) / thisComp.layer("Dashboard - Theme").effect("Grid Vertical Parts")("ADBE Slider Control-0001")';
      ba.effect("Chart Grid")("ADBE Grid-0005").expression =
        '(thisComp.height-2) / thisComp.layer("Dashboard - Theme").effect("Grid Horizontal Parts")("ADBE Slider Control-0001")';
      var bf = ba.Effects.addProperty("ADBE Corner Pin");
      bf.name = "Adjust Grid";
      ba.effect("Adjust Grid")("ADBE Corner Pin-0001").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width-w)/2, (thisComp.height-h)/2];                                                                                  ';
      ba.effect("Adjust Grid")("ADBE Corner Pin-0002").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width+w)/2, (thisComp.height-h)/2];                                                                                  ';
      ba.effect("Adjust Grid")("ADBE Corner Pin-0003").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width-w)/2, (thisComp.height+h)/2];                                                                                  ';
      ba.effect("Adjust Grid")("ADBE Corner Pin-0004").expression =
        'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                  h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                  p = [(thisComp.width+w)/2, (thisComp.height+h)/2];                                                                                  ';
      for (var aC = 0; aC < e.dataSet1_VALUE.length; aC += 1) {
        var aj = aK.Effects.addProperty("ADBE Point Control");
        aj.name = "DS1_" + e.dataSet1_DESC[aC];
        aK.effect("DS1_" + e.dataSet1_DESC[aC])(
          "ADBE Point Control-0001",
        ).expression =
          'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                            line = thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");                                                                            h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                            v = thisComp.layer("Values - Data Set 1").effect("' +
          e.dataSet1_DESC[aC] +
          '")("ADBE Slider Control-0001");                                                                            counter = ' +
          aC +
          1 +
          ';                                                                            min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                            max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                            part_x = w / ' +
          e.dataSet1_DESC.length +
          ";                                                                            part_y = h / (max-min);                                                                            p = [Math.round(thisComp.width/2 - w/2 + (part_x*counter) - part_x/2), Math.round(thisComp.height/2 + h/2 - part_y * (v-min))];";
      }
      if (bg == 1 || bg == 2) {
        for (var aC = 0; aC < e.dataSet2_VALUE.length; aC += 1) {
          var aj = aK.Effects.addProperty("ADBE Point Control");
          aj.name = "DS2_" + e.dataSet2_DESC[aC];
          if (ad == 1) {
            aK.effect("DS2_" + e.dataSet2_DESC[aC])(
              "ADBE Point Control-0001",
            ).expression =
              'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                line = thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");                                                                                h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                v = thisComp.layer("Values - Data Set 2").effect("' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Slider Control-0001");                                                                                counter = ' +
              aC +
              1 +
              ';                                                                                min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                part_x = w / ' +
              e.dataSet2_DESC.length +
              ";                                                                                part_y = h / (max-min);                                                                                p = [Math.round(thisComp.width/2 - w/2 + (part_x*counter) - part_x/2), Math.round(thisComp.height/2 + h/2 - part_y * (v-min))];";
          } else {
            aK.effect("DS2_" + e.dataSet2_DESC[aC])(
              "ADBE Point Control-0001",
            ).expression =
              'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                line = thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");                                                                                h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                v = thisComp.layer("Values - Data Set 2").effect("' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Slider Control-0001");                                                                                v2 = thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aC] +
              '")("ADBE Slider Control-0001");                                                                                counter = ' +
              aC +
              1 +
              ';                                                                                min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                part_x = w / ' +
              e.dataSet2_DESC.length +
              ";                                                                                part_y = h / (max-min);                                                                                p = [Math.round(thisComp.width/2 - w/2 + (part_x*counter) - part_x/2), Math.round(thisComp.height/2 + h/2 - part_y * (v+v2-min))];";
          }
        }
      }
      if (bg == 2) {
        for (var aC = 0; aC < e.dataSet3_VALUE.length; aC += 1) {
          var aj = aK.Effects.addProperty("ADBE Point Control");
          aj.name = "DS3_" + e.dataSet3_DESC[aC];
          if (ad == 1) {
            aK.effect("DS3_" + e.dataSet3_DESC[aC])(
              "ADBE Point Control-0001",
            ).expression =
              'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                line = thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");                                                                                h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                v = thisComp.layer("Values - Data Set 3").effect("' +
              e.dataSet3_DESC[aC] +
              '")("ADBE Slider Control-0001");                                                                                counter = ' +
              aC +
              1 +
              ';                                                                                min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                part_x = w / ' +
              e.dataSet3_DESC.length +
              ";                                                                                part_y = h / (max-min);                                                                                p = [Math.round(thisComp.width/2 - w/2 + (part_x*counter) - part_x/2),Math.round( thisComp.height/2 + h/2 - part_y * (v-min))];";
          } else {
            aK.effect("DS3_" + e.dataSet3_DESC[aC])(
              "ADBE Point Control-0001",
            ).expression =
              'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                line = thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");                                                                                h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                v = thisComp.layer("Values - Data Set 3").effect("' +
              e.dataSet3_DESC[aC] +
              '")("ADBE Slider Control-0001");                                                                                v2 = thisComp.layer("Values - Data Set 2").effect("' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Slider Control-0001");                                                                                v3 = thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aC] +
              '")("ADBE Slider Control-0001");                                                                                counter = ' +
              aC +
              1 +
              ';                                                                                min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                                                                max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                                                                part_x = w / ' +
              e.dataSet3_DESC.length +
              ";                                                                                part_y = h / (max-min);                                                                                p = [Math.round(thisComp.width/2 - w/2 + (part_x*counter) - part_x/2),Math.round( thisComp.height/2 + h/2 - part_y * (v+v2+v3-min))];";
          }
        }
      }
      if (bg == 2) {
        var a3 = aI.layers.addSolid(
          [1, 1, 1],
          "Line Chart 3",
          aI.width,
          aI.height,
          1,
        );
        a3.label = 9;
        var aF = aI.layers.addSolid(
          [1, 1, 1],
          "Line Chart 3 - Matte",
          aI.width,
          aI.height,
          1,
        );
        var a7 = aF.Effects.addProperty("ADBE Linear Wipe");
        a7.name = "Wipe Effect";
        aF.effect("Wipe Effect")("ADBE Linear Wipe-0001").expression =
          'thisComp.layer("Animation - Controls").effect("Set 3 Animation")("ADBE Slider Control-0001");';
        aF.shy = true;
        a3.trackMatteType = TrackMatteType.ALPHA_INVERTED;
        a3.adjustmentLayer = true;
        a3.shy = true;
        a3.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        if (aP == 0) {
          for (var aC = 0; aC < e.dataSet3_DESC.length; aC += 1) {
            var a5 = a3.Effects.addProperty("ADBE Circle");
            a5.name = "Circle_Outline_" + aC;
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Dot Radius")("ADBE Slider Control-0001");';
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0012").setValue(2);
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0010").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
            var a6 = a3.Effects.addProperty("ADBE Circle");
            a6.name = "OCircle_Outline_" + aC;
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Dot Radius")("ADBE Slider Control-0001") + 4;';
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0012").setValue(2);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0003").setValue(3);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0004").setValue(1);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0010").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
          }
          for (var aC = 0; aC < e.dataSet3_DESC.length - 1; aC += 1) {
            var U = a3.Effects.addProperty("ADBE Laser");
            U.name = "Beam_" + aC;
            a3.effect("Beam_" + aC)("ADBE Laser-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0002").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC + 1] +
              '")("ADBE Point Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0011").setValue(true);
            a3.effect("Beam_" + aC)("ADBE Laser-0003").setValue(true);
            a3.effect("Beam_" + aC)("ADBE Laser-0005").expression =
              'thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0006").expression =
              'thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0007").setValue(false);
            a3.effect("Beam_" + aC)("ADBE Laser-0008").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0009").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
          }
        } else {
          for (var aC = 0; aC < e.dataSet3_VALUE.length - 1; aC += 1) {
            var aW = aI.layers.addSolid(
              [1, 1, 1],
              "Corner Pin",
              aI.width,
              aI.height,
              1,
            );
            aW.shy = true;
            aW.name = "DS3_CornerPin_" + aC;
            aW.quality = LayerQuality.DRAFT;
            var S = aW.Effects.addProperty("ADBE Corner Pin");
            S.name = "DS3_CornerPin_" + aC;
            aW.effect("DS3_CornerPin_" + aC)(
              "ADBE Corner Pin-0001",
            ).expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC] +
              '")("ADBE Point Control-0001");';
            aW.effect("DS3_CornerPin_" + aC)(
              "ADBE Corner Pin-0002",
            ).expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC + 1] +
              '")("ADBE Point Control-0001");';
            aW.effect("DS3_CornerPin_" + aC)(
              "ADBE Corner Pin-0003",
            ).expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC] +
              '")("ADBE Point Control-0001");                                                                                                                             w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                              h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                              p = [x[0], (thisComp.height+h)/2];                                                                                                                             ';
            aW.effect("DS3_CornerPin_" + aC)(
              "ADBE Corner Pin-0004",
            ).expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS3_' +
              e.dataSet3_DESC[aC + 1] +
              '")("ADBE Point Control-0001");                                                                                                                             w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                              h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                              p = [x[0], (thisComp.height+h)/2];                                                                                                                             ';
            var bj = aW.Effects.addProperty("ADBE Fill");
            bj.name = "FillTitle";
            aW.effect("FillTitle")("ADBE Fill-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
            aW.opacity.expression =
              'function quart(time, startvalue, finalvalue, duration) {                                                                                                              time /= duration;                                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                              time--;                                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                              }                                                                                                              startvalue = 0;                                                                                                              finalvalue = thisComp.layer("Dashboard - Theme").effect("Set 3 Opacity")("ADBE Slider Control-0001");                                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                              if( time < startTime + duration ) value = a;                                                                                                              else value = finalvalue;';
          }
        }
        var bx = aI.layers.addSolid([0, 0, 0], "Set 3 Color" + aC, 16, 16, 1);
        bx.shy = true;
        bx.label = 9;
        bx.anchorPoint.setValue([8, 8]);
        bx.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                             w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                              h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                              offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                             p = [thisComp.width/2 - w/2  + 2*x + 64, (thisComp.height+h)/2 + offset*2 - 4];                                                             ';
        var ae = bx.Effects.addProperty("ADBE Fill");
        ae.name = "Fillline";
        bx.effect("Fillline")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Data Set 3 Color")("ADBE Color Control-0001");';
        bx.collapseTransformation = true;
        bx.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                      time /= duration;                                                                                                      if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                      time--;                                                                                                      return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                      }                                                                                                      startvalue = 0;                                                                                                      finalvalue = value;                                                                                                      duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                      a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                      if( time < startTime + duration ) value = a;                                                                                                      else value = value;';
        var V = aI.layers.addText(X);
        var bm = V.property("Source Text");
        var bv = bm.value;
        bv.resetCharStyle();
        bv.fontSize = 18;
        bv.font = a0;
        bv.justification = ParagraphJustification.LEFT_JUSTIFY;
        bm.setValue(bv);
        var bj = V.Effects.addProperty("ADBE Fill");
        bj.name = "FillTitle";
        V.effect("FillTitle")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        V.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [24 + thisComp.width/2 - w/2  + 2*x + 64, (thisComp.height+h)/2 + offset*2];                                                         ';
        V.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
      }
      if (bg == 1 || bg == 2) {
        if (aP == 0) {
          var a3 = aI.layers.addSolid(
            [1, 1, 1],
            "Line Chart 2",
            aI.width,
            aI.height,
            1,
          );
          a3.label = 9;
          var aF = aI.layers.addSolid(
            [1, 1, 1],
            "Line Chart 2 - Matte",
            aI.width,
            aI.height,
            1,
          );
          var a7 = aF.Effects.addProperty("ADBE Linear Wipe");
          a7.name = "Wipe Effect";
          aF.effect("Wipe Effect")("ADBE Linear Wipe-0001").expression =
            'thisComp.layer("Animation - Controls").effect("Set 2 Animation")("ADBE Slider Control-0001");';
          aF.shy = true;
          a3.trackMatteType = TrackMatteType.ALPHA_INVERTED;
          a3.adjustmentLayer = true;
          a3.shy = true;
          a3.opacity.expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
          for (var aC = 0; aC < e.dataSet2_DESC.length; aC += 1) {
            var a5 = a3.Effects.addProperty("ADBE Circle");
            a5.name = "Circle_Outline_" + aC;
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Dot Radius")("ADBE Slider Control-0001");';
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0012").setValue(2);
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0010").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
            var a6 = a3.Effects.addProperty("ADBE Circle");
            a6.name = "OCircle_Outline_" + aC;
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Dot Radius")("ADBE Slider Control-0001") + 4;';
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0012").setValue(2);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0003").setValue(3);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0004").setValue(1);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0010").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
          }
          for (var aC = 0; aC < e.dataSet2_DESC.length - 1; aC += 1) {
            var U = a3.Effects.addProperty("ADBE Laser");
            U.name = "Beam_" + aC;
            a3.effect("Beam_" + aC)("ADBE Laser-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0002").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC + 1] +
              '")("ADBE Point Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0011").setValue(true);
            a3.effect("Beam_" + aC)("ADBE Laser-0003").setValue(true);
            a3.effect("Beam_" + aC)("ADBE Laser-0005").expression =
              'thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0006").expression =
              'thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0007").setValue(false);
            a3.effect("Beam_" + aC)("ADBE Laser-0008").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0009").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
          }
        } else {
          for (var aC = 0; aC < e.dataSet2_VALUE.length - 1; aC += 1) {
            var aW = aI.layers.addSolid(
              [1, 1, 1],
              "Corner Pin",
              aI.width,
              aI.height,
              1,
            );
            aW.shy = true;
            aW.name = "DS2_CornerPin_" + aC;
            aW.quality = LayerQuality.DRAFT;
            var S = aW.Effects.addProperty("ADBE Corner Pin");
            S.name = "DS2_CornerPin_" + aC;
            aW.effect("DS2_CornerPin_" + aC)(
              "ADBE Corner Pin-0001",
            ).expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Point Control-0001");';
            aW.effect("DS2_CornerPin_" + aC)(
              "ADBE Corner Pin-0002",
            ).expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC + 1] +
              '")("ADBE Point Control-0001");';
            aW.effect("DS2_CornerPin_" + aC)(
              "ADBE Corner Pin-0003",
            ).expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC] +
              '")("ADBE Point Control-0001");                                                                                                                             w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                              h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                              p = [x[0], (thisComp.height+h)/2];                                                                                                                             ';
            aW.effect("DS2_CornerPin_" + aC)(
              "ADBE Corner Pin-0004",
            ).expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS2_' +
              e.dataSet2_DESC[aC + 1] +
              '")("ADBE Point Control-0001");                                                                                                                             w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                              h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                              p = [x[0], (thisComp.height+h)/2];                                                                                                                             ';
            var bj = aW.Effects.addProperty("ADBE Fill");
            bj.name = "FillTitle";
            aW.effect("FillTitle")("ADBE Fill-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
            aW.opacity.expression =
              'function quart(time, startvalue, finalvalue, duration) {                                                                                                              time /= duration;                                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                              time--;                                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                              }                                                                                                              startvalue = 0;                                                                                                              finalvalue = thisComp.layer("Dashboard - Theme").effect("Set 2 Opacity")("ADBE Slider Control-0001");                                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                              if( time < startTime + duration ) value = a;                                                                                                              else value = finalvalue;';
          }
        }
        var bx = aI.layers.addSolid([0, 0, 0], "Set 2 Color" + aC, 16, 16, 1);
        bx.shy = true;
        bx.label = 9;
        bx.anchorPoint.setValue([8, 8]);
        bx.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [thisComp.width/2 - w/2 + x + 32, (thisComp.height+h)/2 + offset*2 - 4];                                                         ';
        var ae = bx.Effects.addProperty("ADBE Fill");
        ae.name = "Fillline";
        bx.effect("Fillline")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Data Set 2 Color")("ADBE Color Control-0001");';
        bx.collapseTransformation = true;
        bx.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
        var ai = aI.layers.addText(am);
        var bm = ai.property("Source Text");
        var bv = bm.value;
        bv.resetCharStyle();
        bv.fontSize = 18;
        bv.font = a0;
        bv.justification = ParagraphJustification.LEFT_JUSTIFY;
        bm.setValue(bv);
        var bj = ai.Effects.addProperty("ADBE Fill");
        bj.name = "FillTitle";
        ai.effect("FillTitle")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        ai.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [24 + thisComp.width/2 - w/2 + x + 32, (thisComp.height+h)/2 + offset*2];                                                         ';
        ai.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
      }
      if (bg == 0 || bg == 1 || bg == 2) {
        if (aP == 0) {
          var a3 = aI.layers.addSolid(
            [1, 1, 1],
            "Line Chart",
            aI.width,
            aI.height,
            1,
          );
          a3.label = 9;
          var aF = aI.layers.addSolid(
            [1, 1, 1],
            "Line Chart - Matte",
            aI.width,
            aI.height,
            1,
          );
          var a7 = aF.Effects.addProperty("ADBE Linear Wipe");
          a7.name = "Wipe Effect";
          aF.effect("Wipe Effect")("ADBE Linear Wipe-0001").expression =
            'thisComp.layer("Animation - Controls").effect("Set 1 Animation")("ADBE Slider Control-0001");';
          aF.shy = true;
          a3.trackMatteType = TrackMatteType.ALPHA_INVERTED;
          a3.adjustmentLayer = true;
          a3.shy = true;
          a3.opacity.expression =
            'function quart(time, startvalue, finalvalue, duration) {                                                                                                      time /= duration;                                                                                                      if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                      time--;                                                                                                      return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                      }                                                                                                      startvalue = 0;                                                                                                      finalvalue = value;                                                                                                      duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                      a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                      if( time < startTime + duration ) value = a;                                                                                                      else value = value;';
          for (var aC = 0; aC < e.dataSet1_DESC.length; aC += 1) {
            var a5 = a3.Effects.addProperty("ADBE Circle");
            a5.name = "Circle_Outline_" + aC;
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Dot Radius")("ADBE Slider Control-0001");';
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0012").setValue(2);
            a3.effect("Circle_Outline_" + aC)("ADBE Circle-0010").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
            var a6 = a3.Effects.addProperty("ADBE Circle");
            a6.name = "OCircle_Outline_" + aC;
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Dot Radius")("ADBE Slider Control-0001") + 4;';
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0012").setValue(2);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0003").setValue(3);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0004").setValue(1);
            a3.effect("OCircle_Outline_" + aC)("ADBE Circle-0010").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
          }
          for (var aC = 0; aC < e.dataSet1_DESC.length - 1; aC += 1) {
            var U = a3.Effects.addProperty("ADBE Laser");
            U.name = "Beam_" + aC;
            a3.effect("Beam_" + aC)("ADBE Laser-0001").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC] +
              '")("ADBE Point Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0002").expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC + 1] +
              '")("ADBE Point Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0011").setValue(true);
            a3.effect("Beam_" + aC)("ADBE Laser-0003").setValue(true);
            a3.effect("Beam_" + aC)("ADBE Laser-0005").expression =
              'thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0006").expression =
              'thisComp.layer("Dashboard - Theme").effect("Line Thickness")("ADBE Slider Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0007").setValue(false);
            a3.effect("Beam_" + aC)("ADBE Laser-0008").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
            a3.effect("Beam_" + aC)("ADBE Laser-0009").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
          }
        } else {
          for (var aC = 0; aC < e.dataSet1_VALUE.length - 1; aC += 1) {
            var aW = aI.layers.addSolid(
              [1, 1, 1],
              "Corner Pin",
              aI.width,
              aI.height,
              1,
            );
            aW.shy = true;
            aW.quality = LayerQuality.DRAFT;
            aW.name = "DS1_CornerPin_" + aC;
            var S = aW.Effects.addProperty("ADBE Corner Pin");
            S.name = "DS1_CornerPin_" + aC;
            aW.effect("DS1_CornerPin_" + aC)(
              "ADBE Corner Pin-0001",
            ).expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC] +
              '")("ADBE Point Control-0001");';
            aW.effect("DS1_CornerPin_" + aC)(
              "ADBE Corner Pin-0002",
            ).expression =
              'thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC + 1] +
              '")("ADBE Point Control-0001");';
            aW.effect("DS1_CornerPin_" + aC)(
              "ADBE Corner Pin-0003",
            ).expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC] +
              '")("ADBE Point Control-0001");                                                                                                                             w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                              h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                              p = [x[0], (thisComp.height+h)/2];                                                                                                                             ';
            aW.effect("DS1_CornerPin_" + aC)(
              "ADBE Corner Pin-0004",
            ).expression =
              'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
              e.dataSet1_DESC[aC + 1] +
              '")("ADBE Point Control-0001");                                                                                                                             w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                                                                                              h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                                                                                              p = [x[0], (thisComp.height+h)/2];                                                                                                                             ';
            var bj = aW.Effects.addProperty("ADBE Fill");
            bj.name = "FillTitle";
            aW.effect("FillTitle")("ADBE Fill-0002").expression =
              'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
            aW.opacity.expression =
              'function quart(time, startvalue, finalvalue, duration) {                                                                                                              time /= duration;                                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                              time--;                                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                              }                                                                                                              startvalue = 0;                                                                                                              finalvalue = thisComp.layer("Dashboard - Theme").effect("Set 1 Opacity")("ADBE Slider Control-0001");                                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                              if( time < startTime + duration ) value = a;                                                                                                              else value = finalvalue;';
          }
        }
        var bx = aI.layers.addSolid([0, 0, 0], "Set 1 Color" + aC, 16, 16, 1);
        bx.shy = true;
        bx.label = 9;
        bx.anchorPoint.setValue([8, 8]);
        bx.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                          w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                           h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                           offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                          p = [thisComp.width/2 - w/2 + 8, (thisComp.height+h)/2 + offset*2 - 4];                                                          ';
        var ae = bx.Effects.addProperty("ADBE Fill");
        ae.name = "Fillline";
        bx.effect("Fillline")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Data Set 1 Color")("ADBE Color Control-0001");';
        bx.collapseTransformation = true;
        bx.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                      time /= duration;                                                                                                      if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                      time--;                                                                                                      return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                      }                                                                                                      startvalue = 0;                                                                                                      finalvalue = value;                                                                                                      duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                      a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                      if( time < startTime + duration ) value = a;                                                                                                      else value = value;';
        var aE = aI.layers.addText(aG);
        var bm = aE.property("Source Text");
        var bv = bm.value;
        bv.resetCharStyle();
        bv.fontSize = 18;
        bv.font = a0;
        bv.justification = ParagraphJustification.LEFT_JUSTIFY;
        bm.setValue(bv);
        var bj = aE.Effects.addProperty("ADBE Fill");
        bj.name = "FillTitle";
        aE.effect("FillTitle")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        aE.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset")("ADBE Slider Control-0001");                                                         w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                          h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                          offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                         p = [24 + thisComp.width/2 - w/2 + 8, (thisComp.height+h)/2 + offset*2];                                                         ';
        aE.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                  time /= duration;                                                                                                  if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                  time--;                                                                                                  return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                  }                                                                                                  startvalue = 0;                                                                                                  finalvalue = value;                                                                                                  duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                  a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                  if( time < startTime + duration ) value = a;                                                                                                  else value = value;';
      }
      for (var aC = 0; aC < e.dataSet3_DESC.length; aC += 1) {
        var bb = aI.layers.addText(e.dataSet3_DESC[aC]);
        bb.position.expression =
          'x = thisComp.layer("Help - Do Not Touch").effect("DS1_' +
          e.dataSet1_DESC[aC] +
          '")("ADBE Point Control-0001")[0];                                                       w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [x, (thisComp.height+h)/2 + offset];                                                        ';
        bb.scale.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Text Scale")("ADBE Slider Control-0001"); [x, x];';
        bb.shy = true;
        var bm = bb.property("Source Text");
        var bv = bm.value;
        bv.resetCharStyle();
        bv.fontSize = 18;
        bv.font = a0;
        bv.justification = ParagraphJustification.CENTER_JUSTIFY;
        bm.setValue(bv);
        var aq = bb.Effects.addProperty("ADBE Fill");
        aq.name = "FillText";
        bb.effect("FillText")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        bb.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      }
      var aw = aI.layers.addText(a9.split("_")[0]);
      var bm = aw.property("Source Text");
      var bv = bm.value;
      bv.resetCharStyle();
      bv.fontSize = 36;
      bv.font = a0;
      bv.justification = ParagraphJustification.CENTER_JUSTIFY;
      bm.setValue(bv);
      var bj = aw.Effects.addProperty("ADBE Fill");
      bj.name = "FillTitle";
      aw.effect("FillTitle")("ADBE Fill-0002").expression =
        'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
      aw.position.expression =
        'h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                     [thisComp.width/2, (thisComp.height-h)/2 - 100];';
      aw.opacity.expression =
        'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      for (var aC = 0; aC <= 10; aC += 1) {
        var bb = aI.layers.addText("text");
        bb.position.expression =
          'w = thisComp.layer("Dashboard - Theme").effect("Chart Width")("ADBE Slider Control-0001");                                                        h = thisComp.layer("Dashboard - Theme").effect("Chart Height")("ADBE Slider Control-0001");                                                        offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                       p = [(thisComp.width-w)/2 - offset, ((thisComp.height-h)/2) + (h/10)*' +
          aC +
          "];                                                        ";
        var bm = bb.property("Source Text");
        bm.expression =
          'min = thisComp.layer("Dashboard - Theme").effect("Min Value")("ADBE Slider Control-0001");                                           max = thisComp.layer("Dashboard - Theme").effect("Max Value")("ADBE Slider Control-0001");                                           "' +
          a8 +
          '" + (max - (((max-min)/10)* ' +
          aC +
          ')).toFixed(parseInt(thisComp.layer("Dashboard - Theme").effect("Decimal Places")("ADBE Slider Control-0001"))) + "' +
          aA +
          '";                                           ';
        var bv = bm.value;
        bv.resetCharStyle();
        bv.fontSize = 18;
        bv.font = a0;
        bv.justification = ParagraphJustification.RIGHT_JUSTIFY;
        bm.setValue(bv);
        bb.shy = true;
        var au = bb.Effects.addProperty("ADBE Fill");
        au.name = "FillText2";
        bb.effect("FillText2")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        bb.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Animation - Controls").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      }
      return aI;
    }
    function k(aj, Y, av, ag, X, aa, ak, aA, ah, Z, W, ab, aI) {
      e.dataSet1_NAME = new Array();
      e.dataSet1_DESC = new Array();
      e.dataSet1_VALUE = new Array();
      e.dataSet1_NAME[0] = ak;
      for (var aE = 0; aE < aa.length; aE += 1) {
        e.dataSet1_DESC[aE] = aa[aE];
        e.dataSet1_VALUE[aE] = aA[aE];
      }
      var az = app.project.items.addComp(aj, 1920, 1080, 1, Y, 30);
      var am = az.layers.addNull();
      am.label = 2;
      am.name = "Dashboard - Theme";
      am.enabled = false;
      var R = az.layers.addNull();
      R.label = 2;
      R.name = "Values - Data Set 1";
      R.enabled = false;
      var U = am.Effects.addProperty("ADBE Slider Control");
      U.name = "Animation Duration";
      am.effect("Animation Duration")("ADBE Slider Control-0001").setValue(2);
      var ap = am.Effects.addProperty("ADBE Slider Control");
      ap.name = "Chart Outer Radius";
      am.effect("Chart Outer Radius")("ADBE Slider Control-0001").setValue(ag);
      var V = am.Effects.addProperty("ADBE Slider Control");
      V.name = "Chart Inner Radius";
      am.effect("Chart Inner Radius")("ADBE Slider Control-0001").setValue(av);
      for (var aE = 1; aE <= e.dataSet1_DESC.length; aE += 1) {
        var P = am.Effects.addProperty("ADBE Color Control");
        P.name = "Color " + aE;
        var aB = e.dataSet1_DESC.length + 1;
        if (aE == 1) {
          am.effect("Color " + aE)("ADBE Color Control-0001").setValue(ah);
        } else {
          am.effect("Color " + aE)("ADBE Color Control-0001").setValue([
            ((255 / aB) * aE) / 255,
            ((255 / aB) * aE) / 255,
            ((255 / aB) * aE) / 255,
          ]);
        }
        var an = am.Effects.addProperty("ADBE Slider Control");
        an.name = "Explode " + aE;
        am.effect("Explode " + aE)("ADBE Slider Control-0001").setValue(0);
      }
      var at = am.Effects.addProperty("ADBE Color Control");
      at.name = "Background Color";
      am.effect("Background Color")("ADBE Color Control-0001").setValue([
        1, 1, 1,
      ]);
      var ao = am.Effects.addProperty("ADBE Color Control");
      ao.name = "Font Color";
      am.effect("Font Color")("ADBE Color Control-0001").setValue(Z);
      var O = am.Effects.addProperty("ADBE Slider Control");
      O.name = "Text Offset";
      am.effect("Text Offset")("ADBE Slider Control-0001").setValue(30);
      var T = am.Effects.addProperty("ADBE Slider Control");
      T.name = "Set Names Offset X";
      am.effect("Set Names Offset X")("ADBE Slider Control-0001").setValue(400);
      var ar = am.Effects.addProperty("ADBE Slider Control");
      ar.name = "Set Names Offset Y";
      am.effect("Set Names Offset Y")("ADBE Slider Control-0001").setValue(30);
      for (var aE = 0; aE < e.dataSet1_VALUE.length; aE += 1) {
        var ae = R.Effects.addProperty("ADBE Slider Control");
        ae.name = e.dataSet1_DESC[aE];
        R.effect(e.dataSet1_DESC[aE])("ADBE Slider Control-0001").setValue(
          e.dataSet1_VALUE[aE],
        );
        R.effect(e.dataSet1_DESC[aE])("ADBE Slider Control-0001").expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Dashboard - Theme").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      }
      var ai = az.layers.addText(aj.split("_")[0]);
      var ax = ai.property("Source Text");
      var al = ax.value;
      al.resetCharStyle();
      al.fontSize = 36;
      al.font = W;
      al.justification = ParagraphJustification.CENTER_JUSTIFY;
      ax.setValue(al);
      var ac = ai.Effects.addProperty("ADBE Fill");
      ac.name = "FillTitle";
      ai.effect("FillTitle")("ADBE Fill-0002").expression =
        'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
      ai.position.expression =
        'h = thisComp.layer("Dashboard - Theme").effect("Chart Outer Radius")("ADBE Slider Control-0001");                                                     offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                    [thisComp.width/2, (thisComp.height)/2 - h - offset - 100];';
      ai.opacity.expression =
        'function quart(time, startvalue, finalvalue, duration) {                                                                                              time /= duration;                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                              time--;                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                              }                                                                                              startvalue = 0;                                                                                              finalvalue = value;                                                                                              duration = thisComp.layer("Dashboard - Theme").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                              if( time < startTime + duration ) value = a;                                                                                              else value = value;';
      for (var aE = 0; aE < e.dataSet1_VALUE.length; aE += 1) {
        var S = az.layers.addSolid(
          [1, 1, 1],
          "Pie Chart Part " + aE,
          az.width,
          az.height,
          1,
        );
        S.shy = true;
        S.label = 9;
        var aq = S.Effects.addProperty("ADBE Circle");
        aq.name = "Circle 1";
        S.effect("Circle 1")("ADBE Circle-0003").setValue(2);
        S.effect("Circle 1")("ADBE Circle-0002").expression =
          'radius = thisComp.layer("Dashboard - Theme").effect("Chart Outer Radius")("ADBE Slider Control-0001") + thisComp.layer("Dashboard - Theme").effect("Explode ' +
          aE +
          1 +
          '")("ADBE Slider Control-0001");';
        S.effect("Circle 1")("ADBE Circle-0004").expression =
          'radius = thisComp.layer("Dashboard - Theme").effect("Chart Inner Radius")("ADBE Slider Control-0001")+ thisComp.layer("Dashboard - Theme").effect("Explode ' +
          aE +
          1 +
          '")("ADBE Slider Control-0001");';
        S.effect("Circle 1")("ADBE Circle-0010").expression =
          'thisComp.layer("Dashboard - Theme").effect("Color ' +
          aE +
          1 +
          '")("ADBE Color Control-0001");';
        var ad = S.Effects.addProperty("ADBE Radial Wipe");
        ad.name = "Wipe";
        var ad = S.Effects.addProperty("ADBE Radial Wipe");
        ad.name = "Wipe";
        var ay = "v = 0;";
        for (var aD = 0; aD < aE; aD += 1) {
          if (aD == 0) {
            ay =
              'v = thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001")';
          } else {
            ay =
              ay +
              ' + thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001")';
          }
        }
        ay = ay + ";";
        var aG = "";
        for (var aD = 0; aD < e.dataSet1_VALUE.length; aD += 1) {
          if (aD == 0) {
            aG =
              'max = thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001").valueAtTime(thisComp.duration)';
          } else {
            aG =
              aG +
              ' + thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001").valueAtTime(thisComp.duration)';
          }
        }
        aG = aG + ";";
        var aH = "";
        for (var aD = 0; aD <= aE; aD += 1) {
          if (aD != aE) {
            aH =
              aH +
              'linear(thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001"),0,100,0,360) +';
          } else {
            aH =
              aH +
              'linear(thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001"),0,100,0,360)/2+90';
          }
        }
        aH = aH + ";";
        var aF = "";
        for (var aD = 0; aD <= aE; aD += 1) {
          if (aD != aE) {
            aF =
              aF +
              'thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001") +';
          } else {
            aF =
              aF +
              'thisComp.layer("Values - Data Set 1").effect("' +
              e.dataSet1_DESC[aD] +
              '")("ADBE Slider Control-0001")/2';
          }
        }
        S.effect("Wipe")("ADBE Radial Wipe-0001").expression =
          'v = thisComp.layer("Values - Data Set 1").effect("' +
          e.dataSet1_DESC[aE] +
          '")("ADBE Slider Control-0001");                                                                                        ' +
          aG +
          "; newV = linear(v, 0, max, 0, 100);                                                                                        x = 100 - newV;";
        S.effect("Wipe")("ADBE Radial Wipe-0002").expression =
          aG + " " + ay + " 360 - linear(v, 0, max, 0, 360);";
        var au = az.layers.addText("text");
        au.position.expression =
          'w = thisComp.width;                                                            h = thisComp.height;                                                            center = [w/2, h/2];                                                           radius = thisComp.layer("Dashboard - Theme").effect("Chart Outer Radius")("ADBE Slider Control-0001") + thisComp.layer("Dashboard - Theme").effect("Explode ' +
          aE +
          1 +
          '")("ADBE Slider Control-0001");                                                           offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                           z = radius + offset;                                                               ' +
          aG +
          "                                                           alpha = linear(" +
          aF +
          ", 0, max, 0, 360) + 90;                                                           radians = degreesToRadians(alpha);                                                           p = [center[0] + Math.cos(radians)*z, center[1] - Math.sin(radians)*z];";
        var ax = au.property("Source Text");
        if (X == true) {
          ax.expression =
            aG +
            'Math.round(linear(thisComp.layer("Values - Data Set 1").effect("' +
            e.dataSet1_DESC[aE] +
            '")("ADBE Slider Control-0001"), 0, max, 0, 100)) + "%";';
        } else {
          ax.expression =
            '"' + ab + " + " + e.dataSet1_VALUE[aE] + '" ' + aI + '"';
        }
        var al = ax.value;
        al.resetCharStyle();
        al.fontSize = 20;
        al.font = W;
        al.justification = ParagraphJustification.CENTER_JUSTIFY;
        ax.setValue(al);
        au.shy = true;
        var aC = au.Effects.addProperty("ADBE Fill");
        aC.name = "FillText2";
        au.effect("FillText2")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        au.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                      time /= duration;                                                                                                      if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                      time--;                                                                                                      return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                      }                                                                                                      startvalue = 0;                                                                                                      finalvalue = value;                                                                                                      duration = thisComp.layer("Dashboard - Theme").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                      a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                      if( time < startTime + duration ) value = a;                                                                                                      else value = value;';
        S.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                          time /= duration;                                                                                                          if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                          time--;                                                                                                          return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                          }                                                                                                          startvalue = 0;                                                                                                          finalvalue = value;                                                                                                          duration = thisComp.layer("Dashboard - Theme").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                          a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                          if( time < startTime + duration ) value = a;                                                                                                          else value = value;';
        var Q = az.layers.addText(e.dataSet1_DESC[aE]);
        var ax = Q.property("Source Text");
        var al = ax.value;
        al.resetCharStyle();
        al.fontSize = 24;
        al.font = W;
        al.justification = ParagraphJustification.LEFT_JUSTIFY;
        ax.setValue(al);
        var ac = Q.Effects.addProperty("ADBE Fill");
        ac.name = "FillTitle";
        Q.effect("FillTitle")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Font Color")("ADBE Color Control-0001");';
        Q.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset X")("ADBE Slider Control-0001");                                                                       y = thisComp.layer("Dashboard - Theme").effect("Set Names Offset Y")("ADBE Slider Control-0001");                                                                       w = thisComp.width;                                                                        h = thisComp.height;                                                                        radius = thisComp.layer("Dashboard - Theme").effect("Chart Outer Radius")("ADBE Slider Control-0001");                                                                       offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                                       p = [w/2 - radius - offset*2 - x, h/2 - (y*' +
          (e.dataSet1_DESC.length - 1) +
          "/2) + " +
          aE +
          "*y + 8];                                                                     ";
        Q.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                              time /= duration;                                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                              time--;                                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                              }                                                                                                              startvalue = 0;                                                                                                              finalvalue = value;                                                                                                              duration = thisComp.layer("Dashboard - Theme").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                              if( time < startTime + duration ) value = a;                                                                                                              else value = value;';
        var aw = az.layers.addSolid(
          [0, 0, 0],
          e.dataSet1_DESC[aE] + " Color",
          16,
          16,
          1,
        );
        aw.shy = true;
        aw.label = 9;
        aw.anchorPoint.setValue([8, 8]);
        aw.position.expression =
          'x = thisComp.layer("Dashboard - Theme").effect("Set Names Offset X")("ADBE Slider Control-0001");                                                                       y = thisComp.layer("Dashboard - Theme").effect("Set Names Offset Y")("ADBE Slider Control-0001");                                                                       w = thisComp.width;                                                                        h = thisComp.height;                                                                        radius = thisComp.layer("Dashboard - Theme").effect("Chart Outer Radius")("ADBE Slider Control-0001");                                                                       offset = thisComp.layer("Dashboard - Theme").effect("Text Offset")("ADBE Slider Control-0001");                                                                       p = [w/2 - radius - offset*2 - x - 12 , h/2 - (y*' +
          (e.dataSet1_DESC.length - 1) +
          "/2) + " +
          aE +
          "*y];                                                                     ";
        var af = aw.Effects.addProperty("ADBE Fill");
        af.name = "FillBar";
        aw.effect("FillBar")("ADBE Fill-0002").expression =
          'thisComp.layer("Dashboard - Theme").effect("Color ' +
          aE +
          1 +
          '")("ADBE Color Control-0001");';
        aw.collapseTransformation = true;
        aw.opacity.expression =
          'function quart(time, startvalue, finalvalue, duration) {                                                                                                              time /= duration;                                                                                                              if (time > 1) return finalvalue/2*time*time*time*time + startvalue;                                                                                                              time--;                                                                                                              return -finalvalue * (time*time*time*time - 1) + startvalue;                                                                                                              }                                                                                                              startvalue = 0;                                                                                                              finalvalue = value;                                                                                                              duration = thisComp.layer("Dashboard - Theme").effect("Animation Duration")("ADBE Slider Control-0001");                                                                                                              a = quart( time-startTime, startvalue, finalvalue, duration );                                                                                                              if( time < startTime + duration ) value = a;                                                                                                              else value = value;';
      }
      return az;
    }
    function j(R) {
      var O = C + "/img/logo.png";
      var Q = F();
      var P = "no";
      if (Q != "[\'\']") {
        P = "style_1";
      }
      if (R instanceof Panel) {
        var i = R;
      } else {
        var i = new Window(
          "palette",
          e.scriptName + " " + e.scriptVersion,
          undefined,
          { resizeable: true },
        );
      }
      if (i != null) {
        res_1 =
          "group{                                 alignment: [\'fill\',\'fill\'],                                 alignChildren: [\'fill\',\'top\'],                                 orientation: \'column\',                                 myHeader: Group { aligment: [\'fill\', \'top\'] , orientation:\'column\',                                     splasherImage: Image {aligment: [\'center\', \'top\'], image:\'" +
          O +
          "\'},                                 },                                myTabbedPanel_PNL: Panel{type:\'tabbedpanel\', aligment: [\'fill\', \'top\'],                                                defaultsTab: Panel {type:\'tab\', text:\'Defaults\',                                                    orientation: \'column\',                                                    alignment: [\'fill\',\'top\'],                                                     alignChildren: [\'center\',\'top\'],                                                     optionsPanel: Panel{ text:\'Options\', orientation:\'column\', alignment: [\'fill\',\'top\'], alignChildren: [\'left\',\'top\'],                                                        txtTagline: StaticText {text:\'Tagline:\'},                                                        etTagline: EditText {text:\'Tagline goes here\', alignment:[\'fill\',\'top\']},                                                        txtStyle: StaticText {text:\'Style:\'},                                                        ddStyle: DropDownList {properties: { items:" +
          Q +
          "}, alignment:[\'fill\',\'top\']},                                                         txtLogo: StaticText {text:\'Logo:\'},                                                        btnGroup: Group { orientation: \'row\' ,                                                            btnLogo: Button {text:\'Choose logo\'},                                                            txtLogoPath: StaticText {text:\'Your logo name will be shown here.\'},                                                        },                                                    },                                                    fpPanel: Panel{ text:\'Style Preview Video\', orientation:\'column\', alignment: [\'fill\',\'fill\'], alignChildren: [\'fill\',\'fill\'],                                                        previewImage: Image {aligment: [\'fill\', \'fill\'], image:\'" +
          C +
          "/img/styles/" +
          P +
          ".png\'},                                                     },                                                    btnFooter: Panel{ text:\'\', orientation:\'row\', alignment: [\'fill\',\'top\'], alignChildren: [\'fill\',\'top\'],                                                        btnGenerate: Button {aligment: [\'fill\', \'top\'], text:\'Generate Defaults\'},                                                         btnClearAll: Button {aligment: [\'fill\', \'top\'], text:\'Clear All\'},                                                     },                                                },                                                chartsTab: Panel {type:\'tab\', text:\'Add Charts\', preferredSize: [256,284]                                                     orientation: \'column\',                                                    alignment: [\'fill\',\'top\'],                                                     alignChildren: [\'left\',\'top\'],                                                     optionsPanel: Panel{ text:\'Options\', orientation:\'column\', alignment: [\'fill\',\'top\'], alignChildren: [\'fill\',\'fill\'],                                                        txtTitle: StaticText {text:\'Title:\'},                                                        etTitle: EditText {text:\'Chart Title\', alignment:[\'fill\',\'top\']},                                                        opLeft: Group { aligment: [\'fill\', \'fill\'] , orientation:\'column\', alignChildren: [\'fill\',\'fill\'],                                                          txtType: StaticText {text:\'Type:\'},                                                          ddType: DropDownList {properties: { items:[\'Bar - Stacked\',\'Bar - Inline\', \'Line - Thin\', \'Line - Area\', \'Pie - Full\', \'Pie - Donut\']}},                                                           txtDataSets: StaticText {text:\'Data Sets:\'},                                                          ddDataSets: DropDownList {properties: { items:[\'1 Data Set\', \'2 Data Sets\', \'3 Data Sets\']}},                                                         },                                                        opRight: Group { aligment: [\'fill\', \'fill\'] , orientation:\'row\', alignChildren: [\'fill\',\'fill\'],                                                          txtDuration: StaticText {text:\'Duration:\'},                                                          etDuration: EditText {text:\'5\'},                                                          txtUnit: StaticText {text:\'Unit:\'},                                                          etUnit: EditText {text:\'$\'},                                                        },                                                    },                                                    dataGridPanel: Panel{ text:\'Data Grid\', orientation:\'column\', alignment: [\'fill\',\'fill\'], alignChildren: [\'left\',\'top\'],                                                        btnMid: Group{ text:\'\', orientation:\'row\', alignment: [\'fill\',\'top\'], alignChildren: [\'fill\',\'top\'],                                                            btnAddRow: IconButton {aligment: [\'fill\', \'top\'], image: \'" +
          J +
          "plus.png\'},                                                             btnEditRow: IconButton {aligment: [\'fill\', \'top\'], image: \'" +
          J +
          "edit.png\'},                                                             btnDeleteRow: IconButton {aligment: [\'fill\', \'top\'], image: \'" +
          J +
          "trash.png\'},                                                             btnClearAll: IconButton {aligment: [\'fill\', \'top\'], image: \'" +
          J +
          "close.png\'},                                                             btnLoad: IconButton {aligment: [\'fill\', \'top\'], image: \'" +
          J +
          "upload.png\'},                                                         },                                                        lbDataGrid: ListBox { alignment: [\'fill\',\'fill\'], properties : { numberOfColumns: 4, showHeaders: true, columnTitles:[\'Title\', \'Data Set 1\', \'Data Set 2\', \'Data Set 3\'] } },                                                    },                                                    btnFooter: Panel{ text:\'\', orientation:\'row\', alignment: [\'fill\',\'bottom\'], alignChildren: [\'fill\',\'fill\'],                                                        btnCreate: Button {aligment: [\'fill\', \'top\'], text:\'Create Chart\'},                                                         btnBuildFinal: Button {aligment: [\'fill\', \'top\'], text:\'Build Final\'},                                                     },                                                },                                            },                                    myFooter: Panel{ text:\'Help\', orientation:\'row\', alignment: [\'fill\',\'top\'], alignChildren: [\'fill\',\'top\'],                                        myFooterButtons: Group { aligment: [\'fill\', \'fill\'] , orientation:\'row\',                                         checkForUpdates: Button {alignment:[\'fill\',\'fill\'], text: \'Check for free updates\'},                                        helpUI: Button {alignment:[\'fill\',\'fill\'], text: \'Registration\'},                                        helpBTN: Button {alignment:[\'fill\',\'fill\'], text: \'?\'},                                     },                                },                        }";
        i.grp = i.add(res_1);
        i.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.selection = 0;
        i.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddType.selection = 0;
        i.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.selection = 0;
        i.layout.layout(true);
        i.layout.resize();
        i.onResizing = i.onResize = function () {
          this.layout.resize();
        };
      }
      return i;
    }
    function u() {
      q = new Window("palette", "Infographics Toolkit - Updates");
      var i = q.add("statictext", [0, 0, 200, 20], "Downloading");
      var O = q.add("progressbar", [0, 20, 200, 40]);
      O.value = 100;
      q.show();
      return 1;
    }
    function F() {
      var R = new Folder(L + "styles/");
      var O = R.getFiles("*.aep").length;
      var P = "[";
      if (O > 0) {
        for (var Q = 1; Q <= O; Q += 1) {
          if (Q != O) {
            P = P + '"Style_' + Q + '",';
          } else {
            P = P + '"Style_' + Q + '"]';
          }
        }
      } else {
        P = "[\'\']";
      }
      return P;
    }
    function w() {
      var i = "";
      var O = new Socket();
      if (O.open("www.infographicstoolkit.com:8080")) {
        O.write("GET / HTTP/1.0\n\n");
        r = O.read();
        r = r.split(/\n/);
        i = r[r.length - 1];
        O.close();
      }
      return i;
    }
    function n() {
      u();
      var U = w();
      var O =
        m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.items.length;
      if (O == 1) {
        O = 0;
      }
      var ab = U.split(",").length;
      if (ab - O > 0) {
        var Q = "is ";
        if (ab - O > 1) {
          Q = "are ";
        }
        if (
          confirm(
            "There " +
              Q +
              (ab - O) +
              " styles available, would you like to download ?",
            true,
            "Update available!",
          )
        ) {
          var aa = " style...";
          if (ab - O > 1) {
            aa = " styles...";
          }
          for (var V = O; V < ab; V++) {
            var S = "";
            var R = new Socket();
            if (R.open("www.infographicstoolkit.com:8080", "BINARY")) {
              var Z = "_Intro_" + V + 1;
              R.timeout = 6000;
              R.write("GET /" + Z + ".aep HTTP/1.0\n\n");
              var X = R.read();
              S = R.read(9999999);
              R.close();
              var Y = L + "styles/" + Z + ".aep";
              var P = new File(Y);
              P.encoding = "BINARY";
              var T = P.open("w+");
              P.write(S);
            }
            S = "";
            if (R.open("www.infographicstoolkit.com:8080", "BINARY")) {
              var Z = "Style_" + V + 1;
              R.timeout = 6000;
              R.write("GET /" + Z + ".png HTTP/1.0\n\n");
              var X = R.read();
              S = R.read(9999999);
              R.close();
              var Y = L + "img/styles/" + Z + ".png";
              var P = new File(Y);
              P.encoding = "BINARY";
              var T = P.open("w+");
              P.write(S);
            }
          }
          q.hide();
          for (var W = 0; W < O; W += 1) {
            m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.remove(0);
          }
          for (var V = 1; V <= U.split(",").length; V += 1) {
            m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.add(
              "item",
              "Style_" + V,
            );
          }
          m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.selection = 0;
        } else {
          q.hide();
        }
      }
    }
    function K() {
      var O = m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid;
      e.csvFile = File.openDialog("Select *.csv file to read.");
      e.csvData = d(b(e.csvFile));
      var P = e.csvData[0].length;
      var S = e.csvData.length;
      for (var R = 0; R < S; R += 1) {
        O.add("item", e.csvData[R][0]);
        for (var Q = 0; Q < P - 1; Q += 1) {
          O.items[R].subItems[Q].text = e.csvData[R][Q + 1];
        }
      }
    }
    function G() {
      app.beginUndoGroup("IToolkit - Create Chart");
      if (t == undefined) {
        t = app.project.items.addFolder("IToolkit Charts");
      }
      if (g == undefined) {
        g = app.project.items.addFolder("IToolkit Other");
      }
      var ax = y.effect("Data Set 1 Color")("ADBE Color Control-0001").value;
      var Q = y.effect("Data Set 2 Color")("ADBE Color Control-0001").value;
      var V = y.effect("Data Set 3 Color")("ADBE Color Control-0001").value;
      var ab = y.effect("Font Color")("ADBE Color Control-0001").value;
      var S = y.effect("Grid Color")("ADBE Color Control-0001").value;
      var Z = "";
      var aq = "";
      var W =
        B.items[1].layers[
          y.effect("Font Name")("ADBE Layer Control-0001").value
        ].name;
      var ai = y.effect("Number of Vertical grid lines")(
        "ADBE Slider Control-0001",
      ).value;
      var aa = y.effect("Number of Horizontal grid lines")(
        "ADBE Slider Control-0001",
      ).value;
      var al = y.effect("Grid Thickness")("ADBE Slider Control-0001").value;
      var R = "false";
      var at = y.effect("Line Thickness")("ADBE Slider Control-0001").value;
      var ae = y.effect("Dot Radius")("ADBE Slider Control-0001").value;
      var ac = y.effect("Bar/Line Width")("ADBE Slider Control-0001").value;
      var aj = y.effect("Bar/Line Height")("ADBE Slider Control-0001").value;
      var ak = 220;
      var O = 230;
      e.dataSet1_NAME = new Array();
      e.dataSet2_NAME = new Array();
      e.dataSet3_NAME = new Array();
      e.dataSet1_DESC = new Array();
      e.dataSet2_DESC = new Array();
      e.dataSet3_DESC = new Array();
      e.dataSet1_VALUE = new Array();
      e.dataSet2_VALUE = new Array();
      e.dataSet3_VALUE = new Array();
      var an = new Array();
      var au = new Array();
      var P = new Array();
      h = new Array();
      var ag = m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid;
      for (var ao = 0; ao < ag.items.length; ao += 1) {
        h[h.length] = ag.items[ao].text;
      }
      for (var ao = 0; ao < ag.items.length; ao += 1) {
        an[an.length] = ag.items[ao].subItems[0].text;
      }
      for (var ao = 0; ao < ag.items.length; ao += 1) {
        au[au.length] = ag.items[ao].subItems[1].text;
      }
      for (var ao = 0; ao < ag.items.length; ao += 1) {
        P[P.length] = ag.items[ao].subItems[2].text;
      }
      var aw = parseInt(
        m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddType.selection
          .index,
      );
      var ah = parseFloat(
        m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opRight.etDuration.text,
      );
      var am =
        parseInt(
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets
            .selection.index,
        ) + 1;
      var Z = String(
        m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opRight.etUnit.text,
      );
      var ar = String(
        m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.etTitle.text,
      );
      x = ["Data Set 1", "Data Set 2", "Data Set 3"];
      if (aw == 0 || aw == 1) {
        ad = app.project.items.addComp(ar, 1920, 1080, 1, ah, 30);
        ad.parentFolder = t;
        var Y = H(
          ar + "_Comp",
          ah,
          ac,
          aj,
          am - 1,
          aw,
          0,
          h,
          x[0],
          x[1],
          x[2],
          an,
          au,
          P,
          ax,
          Q,
          V,
          ab,
          S,
          W,
          Z,
          aq,
          ai,
          aa,
          al,
          R,
        );
        Y.parentFolder = g;
        ad.layers.add(Y);
      }
      if (aw == 2 || aw == 3) {
        if (A) {
          alert(
            "This feature (Line/Area Chart) is not available in trial mode.",
          );
        } else {
          av = app.project.items.addComp(ar, 1920, 1080, 1, ah, 30);
          av.parentFolder = t;
          var T = l(
            ar + "_Comp",
            ah,
            ac,
            aj,
            am - 1,
            aw - 2,
            h,
            x[0],
            x[1],
            x[2],
            an,
            au,
            P,
            ax,
            Q,
            V,
            ab,
            S,
            W,
            Z,
            aq,
            ai,
            aa,
            al,
            R,
            at,
            ae,
          );
          T.parentFolder = g;
          av.layers.add(T);
        }
      }
      if (aw == 4 || aw == 5) {
        if (A) {
          alert("This feature (Pie Chart) is not available in trial mode.");
        } else {
          if (aw == 4) {
            ak = 0;
          }
          X = app.project.items.addComp(ar, 1920, 1080, 1, ah, 30);
          X.parentFolder = t;
          var ap = k(
            ar + "_Comp",
            ah,
            ak,
            O,
            true,
            h,
            x[0],
            an,
            ax,
            ab,
            W,
            Z,
            aq,
          );
          ap.parentFolder = g;
          X.layers.add(ap);
        }
        if (M == undefined) {
          M = app.project.items.addComp("_Final", 1920, 1080, 1, 10, 30);
        }
        for (var ao = 1; ao <= app.project.numItems; ao += 1) {
          if (app.project.item(ao) instanceof CompItem) {
            if (app.project.item(ao).name.split("_")[1] == "Comp") {
              var af = B.items[6];
              var U = app.project.items[ao].layers.add(af);
              U.collapseTransformation = true;
            }
          }
        }
        app.endUndoGroup();
      }
    }
    function v(U, W, V, T, S) {
      U = new Window("dialog", "Data Editor");
      U.add("statictext", [0, 0, 200, 20], "Title");
      var Q = U.add("edittext", [0, 20, 200, 40], W, { name: "getTitle" });
      U.add("statictext", [0, 40, 200, 60], "Data Set 1 Value");
      var R = U.add("edittext", [0, 20, 200, 40], V, { name: "getDS1" });
      U.add("statictext", [0, 60, 200, 80], "Data Set 2 Value");
      var P = U.add("edittext", [0, 20, 200, 40], T, { name: "getDS2" });
      U.add("statictext", [0, 80, 200, 100], "Data Set 3 Value");
      var i = U.add("edittext", [0, 100, 200, 120], S, { name: "getDS3" });
      var O = U.add("button", [0, 120, 200, 140], "Ok", { name: "ok" });
      return U;
    }
    function z() {
      function S() {
        while (M.numLayers > 0) {
          M.layer(1).remove();
          S();
        }
      }
      app.beginUndoGroup("IToolkit - Build Final");
      var V = new Array();
      for (var R = 1; R <= app.project.numItems; R += 1) {
        if (app.project.item(R) instanceof CompItem) {
          if (app.project.item(R).parentFolder.name == "IToolkit Charts") {
            V[V.length] = app.project.item(R);
          }
        }
      }
      S();
      var ab = 0;
      for (var R = 0; R < V.length; R += 1) {
        ab += V[R].duration;
      }
      ab += B.items[1].duration;
      ab += B.items[9].duration;
      M.duration = ab;
      var T = B.items[5];
      var W = M.layers.add(B.items[1]);
      var X = T.duration;
      for (var R = 0; R < V.length; R += 1) {
        var Q = M.layers.add(V[R]);
        var U = 0;
        for (var P = 0; P < R; P += 1) {
          U += V[P].duration;
        }
        Q.startTime = B.items[2].duration + U;
      }
      var O = M.layers.add(B.items[9]);
      O.startTime = M.duration - B.items[9].duration;
      for (var R = 0; R <= V.length; R += 1) {
        var aa = M.layers.add(T);
        var X = T.duration;
        var U = 0;
        for (var P = 0; P < R; P += 1) {
          U += V[P].duration;
        }
        aa.startTime = B.items[1].duration + U - X / 2;
      }
      var Z = B.items[3];
      var Y = M.layers.add(Z);
      Y.moveAfter(M.layers[M.layers.length]);
      app.endUndoGroup();
      return M;
    }
    var D = "~/Documents/Adobe/";
    var L = (D + "Infographics Toolkit/Default Themes/")
      .toString()
      .replace(/\\/g, "/");
    if (new File(L).exists) {
    } else {
      alert(
        "Infographics Toolkit folder in ~/Documents/Adobe/ not found. Please copy -Infographics Toolkit- from downloaded zip and place it under ~/Documents/Adobe/.",
      );
      return;
    }
    var J = L + "img/icons/";
    var C = L;
    var m = j(N);
    var x = new Array();
    var h = new Array();
    var I = new Array();
    var A = c("v").match(/^t/) ? true : false;
    for (var E = 1; E <= app.project.numItems; E += 1) {
      if (app.project.item(E) instanceof FolderItem) {
        if (app.project.item(E).name == "IC Style") {
          B = app.project.item(E);
          y = B.items[1].layers[1];
        }
      }
    }
    if (B != undefined) {
      for (var E = 1; E <= app.project.numItems; E += 1) {
        if (app.project.item(E) instanceof CompItem) {
          if (app.project.item(E).name == "_Final") {
            M = app.project.item(E);
          }
        }
      }
      for (var E = 1; E <= app.project.numItems; E += 1) {
        if (app.project.item(E) instanceof FolderItem) {
          if (app.project.item(E).name == "IC Charts") {
            t = app.project.item(E);
          }
          if (app.project.item(E).name == "IC Other") {
            g = app.project.item(E);
          }
        }
      }
    }
    m.grp.myFooter.myFooterButtons.checkForUpdates.onClick = function () {
      if (A) {
        alert("This feature is not available in trial mode.");
      } else {
        var i = w();
        var P =
          m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.items.length;
        var O = i.split(",").length;
        if (O > P) {
          n();
        } else {
          alert("No updates!");
        }
      }
    };
    m.grp.myFooter.myFooterButtons.helpUI.onClick = function () {
      var i = c("p");
      alert(i);
    };
    m.grp.myFooter.myFooterButtons.helpBTN.onClick = function () {
      alert(
        "Infographics Toolkit\nCreated by Momcilo Stojkovic\n\nwww.infographicstoolkit.com",
      );
    };
    m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.btnGroup.btnLogo.onClick =
      function () {
        s = File.openDialog("Please select your Logo.");
        if (s != null) {
          m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.btnGroup.txtLogoPath.text =
            s.displayName;
        } else {
          alert("No logo selected.");
        }
      };
    m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.onChange =
      function () {
        var i =
          m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.selection
            .text;
        var O = C + "img/styles/" + i + ".png";
        m.grp.myTabbedPanel_PNL.defaultsTab.fpPanel.previewImage.image = O;
      };
    m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddType.onChange =
      function () {
        var i =
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddType.selection
            .index;
        if (i < 4) {
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.removeAll();
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.add(
            "item",
            "1 Data Set",
          );
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.add(
            "item",
            "2 Data Sets",
          );
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.add(
            "item",
            "3 Data Sets",
          );
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.selection = 0;
        } else {
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.removeAll();
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.add(
            "item",
            "Data Set 1",
          );
          m.grp.myTabbedPanel_PNL.chartsTab.optionsPanel.opLeft.ddDataSets.selection = 0;
        }
      };
    m.grp.myTabbedPanel_PNL.defaultsTab.btnFooter.btnGenerate.onClick =
      function () {
        if (
          confirm(
            "Generate defaults will delete eveything you have in the Project File, are you sure?",
            true,
            "Warning!",
          )
        ) {
          B = undefined;
          y = undefined;
          I = new Array();
          t = undefined;
          g = undefined;
          if (app.project.numItems > 0) {
            for (var Q = 1; Q <= app.project.numItems; Q += 1) {
              app.project.item(1).remove();
            }
          }
          for (var Q = 1; Q <= app.project.numItems; Q += 1) {
            if (app.project.item(Q) instanceof FolderItem) {
              if (app.project.item(Q).name == "IToolkit Charts") {
                t = app.project.item(Q);
              }
              if (app.project.item(Q).name == "IToolkit Other") {
                g = app.project.item(Q);
              }
            }
          }
          if (t == undefined) {
            t = app.project.items.addFolder("IToolkit Charts");
          }
          if (g == undefined) {
            g = app.project.items.addFolder("IToolkit Other");
          }
          var S =
            C +
            "styles/_Intro_" +
            m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.ddStyle.selection.text.split(
              "_",
            )[1] +
            ".aep";
          var T = new ImportOptions(File(S));
          B = app.project.importFile(T);
          B.name = "IToolkit Style";
          y = B.items[1].layers[1];
          if (s != undefined) {
            var S = s;
            var T = new ImportOptions(File(S));
            _importedLogoImage = app.project.importFile(T);
            _importedLogoImage.parentFolder = g;
            _importedLogoImage.name = "_importedLogoImage";
            var O = B.items[2].layers.add(_importedLogoImage);
            O.moveToEnd();
            var R =
              ((_importedLogoImage.width * _importedLogoImage.pixelAspect) /
                (O.width * O.source.pixelAspect)) *
              90;
            if (_importedLogoImage.width <= _importedLogoImage.height) {
              R =
                ((_importedLogoImage.height * _importedLogoImage.pixelAspect) /
                  (O.height * O.source.pixelAspect)) *
                90;
            }
            O.property("Scale").setValue([R, R]);
          }
          var P = B.items[4].layers[1];
          P.property("Source Text").setValue(
            m.grp.myTabbedPanel_PNL.defaultsTab.optionsPanel.etTagline.text,
          );
          M = app.project.items.addComp("_Final", 1920, 1080, 1, 10, 30);
          z();
        }
      };
    m.grp.myTabbedPanel_PNL.defaultsTab.btnFooter.btnClearAll.onClick =
      function () {
        if (
          confirm(
            "Clear All will remove defaults, charts and all the items in After Effects, are you sure?",
            true,
            "Warning!",
          )
        ) {
          B = undefined;
          y = undefined;
          I = new Array();
          t = undefined;
          g = undefined;
          if (app.project.numItems > 0) {
            for (var O = 1; O <= app.project.numItems; O += 1) {
              app.project.item(1).remove();
            }
          }
        }
      };
    m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.btnMid.btnAddRow.onClick =
      function () {
        var P =
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items
            .length;
        if (A && P > 2) {
          alert(
            "You canno\'t insert more data in trial mode. Full version does not have this limitation.",
          );
        } else {
          var i = v(this, "Title", 0, 0, 0);
          if (i.show()) {
            var O =
              m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.add(
                "item",
                i.getTitle.text,
              );
            O.subItems[0].text = i.getDS1.text;
            O.subItems[1].text = i.getDS2.text;
            O.subItems[2].text = i.getDS3.text;
          }
        }
      };
    m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.btnMid.btnEditRow.onClick =
      function () {
        var O =
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.selection
            .index;
        var i = v(
          this,
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items[O]
            .text,
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items[O]
            .subItems[0].text,
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items[O]
            .subItems[1].text,
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items[O]
            .subItems[2].text,
        );
        if (i.show()) {
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.selection.text =
            i.getTitle.text;
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items[
            O
          ].subItems[0].text = i.getDS1.text;
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items[
            O
          ].subItems[1].text = i.getDS2.text;
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items[
            O
          ].subItems[2].text = i.getDS3.text;
        }
      };
    m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.btnMid.btnDeleteRow.onClick =
      function () {
        var i =
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.selection;
        if (
          confirm(
            "Are you sure you want to delete " + i.toString() + "?",
            true,
            "Warning!",
          )
        ) {
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.remove(
            m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.selection
              .index,
          );
        }
      };
    m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.btnMid.btnClearAll.onClick =
      function () {
        if (
          confirm(
            "Are you sure you want to delete all items?",
            true,
            "Warning!",
          )
        ) {
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.removeAll();
        }
      };
    m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.btnMid.btnLoad.onClick =
      function () {
        K();
      };
    m.grp.myTabbedPanel_PNL.chartsTab.btnFooter.btnCreate.onClick =
      function () {
        if (
          m.grp.myTabbedPanel_PNL.chartsTab.dataGridPanel.lbDataGrid.items
            .length != 0
        ) {
          G();
        } else {
          alert(
            "You didn\'t input any data! Please fill in your data into Data Grid and try again.",
          );
        }
      };
    m.grp.myTabbedPanel_PNL.chartsTab.btnFooter.btnBuildFinal.onClick =
      function () {
        z();
      };
  }
  function c(at) {
    function k() {
      var aY = new Window("dialog", A + " v" + t, undefined, {
        resizeable: true,
      });
      if (aY != null) {
        var aZ =
          "group {                 orientation: \'column\',                 alignment: [\'fill\',\'fill\'],                 alignChildren: [\'fill\',\'fill\'],                     infoGrp: Group {                     alignment: [\'fill\',\'top\'],                     alignChildren: [\'fill\',\'fill\'],                     orientation: \'column\',                         hdrGrp: Group {                            txt: StaticText {},                             paste: StaticText {},                         }                        trial: StaticText {},                     }                     licGrp: Group {                         txt: EditText {alignment: [\'fill\',\'fill\'], properties:{multiline:false}},                     }                     okGrp: Group {                     alignment: [\'fill\',\'bottom\'],                     alignChildren: [\'fill\',\'fill\'],                         retrieveReg: Button {text:\'" +
          aI +
          "\',  alignment: [\'left\',\'center\'],preferredSize:[150,30]}                        cancelBtn: Button {text:\'" +
          aw +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']}                         okBtn: Button {text:\'" +
          ai +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']}                     }                 }";
        aY.grp = aY.add(aZ);
        var a0 = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        var aX = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.REGULAR,
          9,
        );
        aY.grp.licGrp.txt.preferredSize = [600, 30];
        aY.grp.infoGrp.hdrGrp.txt.text = T;
        aY.grp.infoGrp.hdrGrp.txt.graphics.font = a0;
        aY.grp.infoGrp.hdrGrp.paste.text = ah;
        aY.grp.infoGrp.hdrGrp.paste.graphics.font = aX;
        aY.grp.infoGrp.trial.text = K || !M ? "" : ac;
        aY.grp.licGrp.txt.text =
          K || !M ? "" : "MSIT*MONTER*AECLUB*0806173SUL9";
        aY.grp.okGrp.retrieveReg.visible = !K;
        aY.grp.okGrp.retrieveReg.onClick = function () {
          var a1 = confirm(aG);
          if (a1) {
            m(ap);
          }
        };
        aY.grp.okGrp.cancelBtn.onClick = function () {
          aY.close(false);
        };
        aY.grp.okGrp.okBtn.onClick = function () {
          var a1 = aY.grp.licGrp.txt.text
            .replace(/^\s\s*/, "")
            .replace(/\s\s*$/, "");
          aa(aL, au, w(a1));
          aa(aL, af, t);
          aa(aL, D, aQ);
          aY.close(true);
        };
        aY.layout.layout(true);
        aY.layout.resize();
        aY.onResizing = aY.onResize = function () {
          this.layout.resize();
        };
        return aY;
      }
    }
    function aO(a2) {
      var aY = false;
      if (!M) {
        aY = true;
        return aY;
      }
      var a5 = new Date();
      var aZ = 86400000;
      var a4 = (parseInt(a5, 10) / aZ / 1000000).toFixed(6);
      if (aR(B, ae)) {
        a0 = parseInt(O(B, ae), 16) / 100000000000;
      } else {
        a0 = a4;
        aa(B, ae, (a0 * 100000000000).toString(16));
      }
      if (aR(B, ad)) {
        a1 = Math.max(1, parseInt(O(B, ad), 16) / 1000000000000);
        if (a2 != "balance" && at == "l") {
          aa(B, ad, ((a1 + 1) * 1000000000000).toString(16));
        }
      } else {
        a1 = 1;
        aa(B, ad, (a1 * 1000000000000).toString(16));
      }
      var a6 = Math.max(0, parseInt(a5, 10) / aZ - a0 * 1000000);
      if (z()) {
        clearOutput();
      }
      var a3 = a6 > aM || a4 < a0 ? 0 : Math.ceil(aM - a6);
      var aX = Math.max(0, W - a1);
      if ((a6 > aM && a1 > W) || a4 < a0) {
        aY = true;
      }
      if (at != "c") {
        if (a3 > 0 && a2 != "balance") {
          if (z()) {
            writeLn(q);
          }
          if (z()) {
            writeLn(E.replace(/%E/g, a3));
          }
        } else {
          if (!aY && a2 != "balance") {
            if (z()) {
              writeLn(q);
            }
            if (z()) {
              writeLn(an.replace(/%E/g, aX));
            }
          }
        }
      }
      if (a2 == "balance") {
        return a3;
      } else {
        return aY;
      }
    }
    function P(a1) {
      var a2 = false;
      var aY = new Date();
      var aX = 86400000;
      var a0 = parseInt(aY, 10) / aX;
      var aZ = parseInt(a1, 10) / aX;
      if (a0 > aZ) {
        a2 = true;
      }
      return a2;
    }
    function I(a0) {
      var aX = new Window("dialog", j, undefined, { resizeable: false });
      if (aX != null) {
        var aZ =
          "group {                 orientation: \'column\',                 alignment: [\'fill\',\'fill\'],                 alignChildren: [\'fill\',\'fill\'],                    infoGrp: Group {                    alignment: [\'fill\',\'top\'],                    alignChildren: [\'fill\',\'fill\'],                    orientation: \'column\',                       hdr: StaticText {},                       info: StaticText {preferredSize:[800,40], properties:{multiline:true}},                       url: StaticText {},                     }                     okGrp: Group {                     alignment: [\'fill\',\'bottom\'],                     alignChildren: [\'fill\',\'fill\'],                         cancelBtn: Button {text:\'" +
          aw +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']}                         okBtn: Button {text:\'" +
          ai +
          "\', preferredSize:[150,30], alignment: [\'right\',\'center\']}                     }                 }";
        aX.grp = aX.add(aZ);
        var a2 = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          12,
        );
        var a1 = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.BOLD,
          11,
        );
        var aY = ScriptUI.newFont(
          "dialog || palette",
          ScriptUI.FontStyle.REGULAR,
          9,
        );
        aX.grp.infoGrp.hdr.text = strUpdateLicenseHdr;
        aX.grp.infoGrp.hdr.graphics.font = a2;
        aX.grp.infoGrp.info.text = strUpdateLicense;
        aX.grp.infoGrp.url.text = C;
        aX.grp.infoGrp.url.graphics.font = a1;
        aX.grp.okGrp.cancelBtn.onClick = function () {
          aX.close(false);
        };
        aX.grp.okGrp.okBtn.onClick = function () {
          m(C);
          aX.close(true);
        };
        aX.layout.layout(true);
        aX.layout.resize();
        aX.onResizing = aX.onResize = function () {
          this.layout.resize();
        };
        return aX;
      }
    }
    function al(a1) {
      return "1";
      var a3 =
        $.os.indexOf("Win") != -1
          ? Folder.temp.fsName
          : Folder.temp.absoluteURI +
            "/" +
            Math.round(Math.random() * new Date().getTime() * 37915);
      if ($.os.indexOf("Win") != -1) {
        aZ = aq;
        a3 += ".exe";
      } else {
        var a2 = F("arch");
        if (a2.toLowerCase().match(/ppc/) && U == "") {
          alert(aP);
          return false;
        }
        aZ = a2.toLowerCase().match(/ppc/) ? U : Z;
      }
      var aY = s(File(a3), aZ, "BINARY");
      aY.hidden = true;
      if ($.os.indexOf("Mac") != -1) {
        F("chmod 757 " + aY.absoluteURI);
      }
      var a0 =
        '"' + $.os.indexOf("Win") != -1
          ? aY.fsName
          : aY.absoluteURI + '" ' + a1 + " " + ab;
      var aX = F(a0);
      aY.remove();
      return aX;
    }
    function aB(aZ) {
      var aY = 0;
      for (var aX = 0; aX < aZ.length; aX += 1) {
        aY = aY + aZ.charCodeAt(aX);
      }
      return aY;
    }
    function y(a3) {
      var aY = a3.split("*");
      if (aY.length == 4) {
        var a2 = aY[3].replace(/^[0-9]+/, "");
        var a0 = aY[3].match(/^[0-9]+/, "");
        var a6 = a0[0].substr(0, 2);
        var a4 = a0[0].substr(a0[0].length - 2);
        var aZ = a6[0] + aY[0] + a6[1] + aY[1] + a4[0] + aY[2] + a4[1] + a2;
        var a1 = a0[0].substring(2, a0[0].length - 2);
        var aX = aB(aZ);
        var a5 = aX * ab;
        if (a5 == a1) {
          return "1";
        } else {
          return "0";
        }
      } else {
        if (a3 != w("bad")) {
          alert(x);
        }
        return "0";
      }
    }
    function aV(aX) {
      return (
        aX.length * aX.charCodeAt(0) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.1)) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.2)) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.3)) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.4)) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.5)) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.7)) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.8)) +
        aX.charCodeAt(Math.floor((aX.length - 1) * 0.9)) +
        aX.charCodeAt(aX.length - 1)
      );
    }
    function ao(aX) {
      var aY = aX.split("**");
      if (
        aX.replace(/^ +|| +$/g, "").match(/^.+\*\*.+\*\*[0-9]+[A-Za-z]{3}$/) &&
        aY.length == 3
      ) {
        return true;
      } else {
        alert(g);
        return false;
      }
    }
    function ar(aY, a3, aX) {
      if (a3 != undefined) {
        a3 = a3.replace(/^\s\s*/, "").replace(/\s\s*$/, "");
      }
      ax = false;
      if (aY) {
        aD = k();
        aT = aD.show();
      } else {
        aT = true;
      }
      az = false;
      if (aT || (a3 && !aY)) {
        if (aR(aL, au)) {
          a3 = O(aL, au);
        } else {
          if (z()) {
            alert(Q);
          }
          return ax;
        }
        a3 = aE(a3);
        if (!M || a3.toLowerCase() != "trial") {
          var a4 = a3.split("*");
          if (
            a3.match(/^[A-Z0-9]+\*[^\*]+\*[^\*]+\*[0-9]+[A-Za-z]{3}[0-9]+$/) &&
            a4.length == 4
          ) {
            if (a4[0] != null && a4[0] != G) {
              alert(H + "\n" + am);
              aa(aL, au, w("bad"));
              aa(aL, af, t);
              aa(aL, D, aQ);
              ar(aY);
              return false;
            }
            var a1 = a4[3].match(/[A-Z]{3}[0-9]+$/);
            if (a1 != null) {
              ax = a1[0];
              if (ax.match("BTA") && !K) {
                alert(aU);
                aa(aL, au, w("bad"));
                aa(aL, af, t);
                aa(aL, D, aQ);
                ar(aY);
                return false;
              }
            } else {
              alert(v + "\n" + am);
              aa(aL, au, w("bad"));
              aa(aL, af, t);
              aa(aL, D, aQ);
              ar(aY);
              return ax;
            }
            var a2 = h == 2 ? al(a3) : y(a3);
            if (parseInt(a2, 10) == 1) {
              if (aY) {
                aa(aL, au, w(a3));
                var a0 = parseInt(a3.match(/[0-9]+$/), 10);
                alert(
                  i.replace("%u", a0 + " user" + a0 > 1 ? "s" : "") + !K
                    ? ay
                    : "",
                );
              }
              az = true;
              aa(aL, af, t);
              aa(aL, D, aQ);
            } else {
              if (aY) {
                if (parseInt(a2, 10) == 0) {
                  alert(v + "\n" + am);
                } else {
                  if (a2.match(/ERROR: /i)) {
                    alert(aS + "\n" + am + "\n" + a2);
                  } else {
                    alert(aF + a2);
                  }
                }
                aa(aL, au, w("bad"));
                aa(aL, af, t);
                aa(aL, D, aQ);
                ar(aY);
                return ax;
              } else {
                alert(L);
                aY = true;
                aa(aL, au, w("bad"));
                aa(aL, af, t);
                aa(aL, D, aQ);
                ar(aY);
                return ax;
              }
            }
          } else {
            if (a3.match(/^[A-Z]{2}[A-Z0-9]{30}$/)) {
              var aZ = confirm(aN);
              if (aH() && aZ) {
                m(ak + "?serial=" + a3);
              }
              aa(aL, au, w("bad"));
              aa(aL, af, t);
              aa(aL, D, aQ);
              return ax;
            } else {
              alert(v + "\n" + !K ? x : x.replace(/SUL/g, "BTA") + "\n\n" + am);
              aY = true;
              aa(aL, au, w("bad"));
              aa(aL, af, t);
              aa(aL, D, aQ);
              ar(aY);
              return ax;
            }
          }
        } else {
          if (!K && !aO()) {
            ax = M ? "trial" : "";
            az = true;
            aa(aL, au, w("trial"));
            aa(aL, af, t);
            aa(aL, D, aQ);
          } else {
            if (K) {
              alert(Y);
              aa(aL, au, w("bad"));
              aa(aL, af, t);
              aa(aL, D, aQ);
              return ax;
            } else {
              if (at == "l") {
                var aZ = confirm(aK);
                if (aH() && aZ) {
                  m(C);
                } else {
                  if (aZ && z()) {
                    alert(Q);
                  }
                }
              }
            }
          }
        }
      }
      return ax;
    }
    function aE(aZ) {
      var aX = "";
      var aY = 0;
      aZ = aZ.replace(/[^A-Za-z0-9\+\/\=]/g, "");
      var a0 =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      while (aY < aZ.length) {
        a6 = a0.indexOf(aZ.charAt(aY++));
        a4 = a0.indexOf(aZ.charAt(aY++));
        a2 = a0.indexOf(aZ.charAt(aY++));
        a1 = a0.indexOf(aZ.charAt(aY++));
        a7 = (a6 << 2) | (a4 >> 4);
        a5 = ((a4 & 15) << 4) | (a2 >> 2);
        a3 = ((a2 & 3) << 6) | a1;
        aX = aX + String.fromCharCode(a7);
        if (a2 != 64) {
          aX = aX + String.fromCharCode(a5);
        }
        if (a1 != 64) {
          aX = aX + String.fromCharCode(a3);
        }
      }
      return aX;
    }
    function w(aZ) {
      var aX = "";
      var aY = 0;
      var a0 =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
      while (aY < aZ.length) {
        a7 = aZ.charCodeAt(aY++);
        a5 = aZ.charCodeAt(aY++);
        a3 = aZ.charCodeAt(aY++);
        a6 = a7 >> 2;
        a4 = ((a7 & 3) << 4) | (a5 >> 4);
        a2 = ((a5 & 15) << 2) | (a3 >> 6);
        a1 = a3 & 63;
        if (isNaN(a5)) {
          a2 = a1 = 64;
        } else {
          if (isNaN(a3)) {
            a1 = 64;
          }
        }
        aX = aX + a0.charAt(a6) + a0.charAt(a4) + a0.charAt(a2) + a0.charAt(a1);
      }
      return aX;
    }
    function aH() {
      var aX = app.preferences.getPrefAsLong(
        "Main Pref Section",
        "Pref_SCRIPTING_FILE_NETWORK_SECURITY",
      );
      return aX == 1;
    }
    function m(aX) {
      if (z() || aA()) {
        var a0 = Folder.commonFiles.parent.fsName;
        var a4 = "explorer ";
        var aY = 'open "';
        var aZ = '"';
        if ($.os.indexOf("Windows") != -1) {
          aX = aX.replace(/&/g, "^&");
          a2 = 'cmd /c "' + a4 + aX + '"';
          F(a2);
        } else {
          a2 = aY + aX + aZ;
          F(a2);
        }
      } else {
        var a3 = File(Folder.temp.fsName + "/openUrl.url");
        var a1 = s(a3, "[InternetShortcut]\rURL=" + aX + "\r", "UTF-8", true);
        a1.execute();
      }
    }
    function aC(a1, a7) {
      if (a7 == undefined) {
        a7 = "p";
      }
      if (!M || a1 != "trial") {
        var a0 = a1.replace(/_/g, " ");
        var aX = a0.split("*");
        if (aX.length == 4) {
          var a8 = aX[1];
          var bb = aX[2];
          var a4 = 0;
          var a6 = "";
          var aZ = aX[3].match(/([A-Z]{3})([0-9]+)$/);
          if (aZ != null && aZ.length >= 3) {
            a6 = aZ[1];
            a4 = parseFloat(aZ[2]);
          }
          var a3 = a8 + bb.match(/^@/) ? "" : " " + bb;
          var aY = a6;
          if (a7 == "v") {
            return aY;
          }
          var a9 = a4 > 1 ? " for " + a4 + " Users" : " for 1 User";
          switch (aY) {
            case "SUL":
              a5 = " - License" + a9;
              break;
            case "Pro":
              a5 = " - Pro License" + a9;
              break;
            case "STE":
              a5 = " - Site License";
              break;
            case "psr":
              a5 = " - Pro Site License";
              break;
            case "BTA":
              a5 = " - Beta Test License";
              break;
            case "EDU":
              a5 = " - Educational License";
              break;
            default:
              a5 = " - Invalid License";
              break;
          }
          ba = a3 + " " + a5;
        } else {
          ba = "License is invalid";
        }
      } else {
        var a2 = aO("balance");
        ba = "Trial (" + a2 + " days left)";
      }
      return ba;
    }
    function z() {
      return BridgeTalk.appName == "aftereffects";
    }
    function aA() {
      return BridgeTalk.appName == "photoshop";
    }
    function aW(aY) {
      if (aY.exists && aY.open("r")) {
        var aX = aY.read();
        aY.close();
        return aX;
      } else {
        return null;
      }
    }
    function s(aZ, aX, a0, aY) {
      if (!aZ.exists || aY) {
        aZ =
          $.os.indexOf("Win") != -1
            ? new File(aZ.fsName)
            : new File(aZ.absoluteURI);
        aZ.encoding = a0;
        aZ.open("w");
        aZ.write(aX);
        aZ.close();
        aZ.hidden = true;
        if ($.os.indexOf("Mac") != -1) {
          F("chmod 757 " + aZ.absoluteURI);
        }
      }
      return aZ;
    }
    function F(aY) {
      if (z()) {
        return system.callSystem(aY);
      }
      if (aA()) {
        var aX =
          $.os.indexOf("Win") != -1
            ? Folder.temp.fsName
            : Folder.temp.absoluteURI +
              "/" +
              Math.round(Math.random() * new Date().getTime() * 21876);
        app.system(aY + ">" + aX);
        return aW(File(aX));
      }
      return "";
    }
    function aj(aZ, aY) {
      for (var aX in aY) {
        if (aY.hasOwnProperty(aX)) {
          if (typeof aY[aX] == "object") {
            return aj(aZ, aY[aX]);
          } else {
            if (aX === aZ) {
              return aY[aX];
            }
          }
        }
      }
    }
    function O(a1, a0) {
      if (z()) {
        return app.settings.getSetting(a1, a0);
      } else {
        var aZ = File(J + av + File.encode(a1));
        var aY = aW(aZ);
        var aX = V(aY, "parse");
        return aX[a0];
      }
    }
    function aR(a1, a0) {
      if (z()) {
        return app.settings.haveSetting(a1, a0);
      } else {
        var aZ = File(J + av + File.encode(a1));
        var aY = aW(aZ);
        if (aY != null) {
          var aX = V(aY.toString(), "parse");
          return a0 in aX;
        } else {
          return false;
        }
      }
    }
    function aa(a3, a1, a2) {
      if (z()) {
        app.settings.saveSetting(a3, a1, a2);
        app.preferences.saveToDisk();
      } else {
        var aX = {};
        var a0 = File(J + av + File.encode(a3));
        if (a0.exists) {
          var aZ = aW(a0);
          if (aZ != null) {
            aX = V(aZ.toString(), "parse");
          }
        }
        aX[a1] = a2;
        var aY = "\r";
        s(
          File(J + av + File.encode(a3)),
          V(aX, "stringify", aY),
          "UTF-8",
          true,
        );
      }
    }
    function V(aY, a0, aX) {
      if (typeof JSON !== "object") {
        JSON = {};
      }
      (function () {
        function a7(bf) {
          return bf < 10 ? "0" + bf : bf;
        }
        function a2() {
          return this.valueOf();
        }
        function a1(bf) {
          a6.lastIndex = 0;
          return a6.test(bf)
            ? '"' +
                bf.replace(a6, function (bg) {
                  var bh = be[bg];
                  return typeof bh === "string"
                    ? bh
                    : "\\u" +
                        ("0000" + bg.charCodeAt(0).toString(16)).slice(-4);
                }) +
                '"'
            : '"' + bf + '"';
        }
        function a9(bm, bj) {
          var bk = bc;
          var bl = bj[bm];
          if (bl && typeof bl === "object" && typeof bl.toJSON === "function") {
            bl = bl.toJSON(bm);
          }
          if (typeof bb === "function") {
            bl = bb.call(bj, bm, bl);
          }
          switch (typeof bl) {
            case "string":
              return a1(bl);
            case "number":
              return isFinite(bl) ? String(bl) : "null";
            case "boolean":
            case "null":
              return String(bl);
            case "object":
              if (!bl) {
                return "null";
              }
              bc += a3;
              bi = [];
              if (Object.prototype.toString.apply(bl) === "[object Array]") {
                bf = bl.length;
                for (var bh = 0; bh < bf; bh += 1) {
                  bi[bh] = a9(bh, bl) || "null";
                }
                bn =
                  bi.length === 0
                    ? "[]"
                    : bc
                      ? "[\n" + bc + bi.join(",\n" + bc) + "\n" + bk + "]"
                      : "[" + bi.join(",") + "]";
                bc = bk;
                return bn;
              }
              if (bb && typeof bb === "object") {
                bf = bb.length;
                for (var bh = 0; bh < bf; bh += 1) {
                  if (typeof bb[bh] === "string") {
                    bg = bb[bh];
                    bn = a9(bg, bl);
                    if (bn) {
                      bi.push(a1(bg) + bc ? ": " : ":" + bn);
                    }
                  }
                }
              } else {
                for (var bg in bl) {
                  if (Object.prototype.hasOwnProperty.call(bl, bg)) {
                    bn = a9(bg, bl);
                    if (bn) {
                      bi.push(a1(bg) + bc ? ": " : ":" + bn);
                    }
                  }
                }
              }
              bn =
                bi.length === 0
                  ? "{}"
                  : bc
                    ? "{\n" + bc + bi.join(",\n" + bc) + "\n" + bk + "}"
                    : "{" + bi.join(",") + "}";
              bc = bk;
              return bn;
          }
        }
        var a4 = /^[\],:{}\s]*$/;
        var ba = /\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g;
        var bd =
          /"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g;
        var a5 = /(?:^|:|,)(?:\s*\[)+/g;
        var a6 =
          /[\\\"\u0000-\u001f\u007f-\u009f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        var a8 =
          /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g;
        if (typeof Date.prototype.toJSON !== "function") {
          Date.prototype.toJSON = function () {
            return isFinite(this.valueOf())
              ? this.getUTCFullYear() +
                  "-" +
                  a7(this.getUTCMonth() + 1) +
                  "-" +
                  a7(this.getUTCDate()) +
                  "T" +
                  a7(this.getUTCHours()) +
                  ":" +
                  a7(this.getUTCMinutes()) +
                  ":" +
                  a7(this.getUTCSeconds()) +
                  "Z"
              : null;
          };
          Boolean.prototype.toJSON = a2;
          Number.prototype.toJSON = a2;
          String.prototype.toJSON = a2;
        }
        if (typeof JSON.stringify !== "function") {
          be = {
            "\b": "\\b",
            "\t": "\\t",
            "\n": "\\n",
            "\f": "\\f",
            "\r": "\\r",
            '"': '\\"',
            "\\": "\\\\",
          };
          JSON.stringify = function (bi, bg, bh) {
            bc = "";
            a3 = "";
            if (typeof bh === "number") {
              for (var bf = 0; bf < bh; bf += 1) {
                a3 += " ";
              }
            } else {
              if (typeof bh === "string") {
                a3 = bh;
              }
            }
            bb = bg;
            if (
              bg &&
              typeof bg !== "function" &&
              (typeof bg !== "object" || typeof bg.length !== "number")
            ) {
              throw new Error("JSON.stringify");
            }
            return a9("", { "": bi });
          };
        }
      })();
      var aZ = (function () {
        function a3(ba, a9, bb) {
          return a9 ? a5[a9] : String.fromCharCode(parseInt(bb, 16));
        }
        var a8 =
          "(?:-?\\b(?:0|[1-9][0-9]*)(?:\\.[0-9]+)?(?:[eE][+-]?[0-9]+)?\\b)";
        var a4 =
          '(?:[^\\0-\\x08\\x0a-\\x1f"\\\\]|\\\\(?:["/\\\\bfnrt]|u[0-9A-Fa-f]{4}))';
        a4 = '(?:"' + a4 + '*")';
        var a7 = new RegExp(
          "(?:false|true|null|[\\{\\}\\[\\]]|" + a8 + "|" + a4 + ")",
          "g",
        );
        var a6 = new RegExp("\\\\(?:([^u])|u(.{4}))", "g");
        var a5 = {
          '"': '"',
          "/": "/",
          "\\": "\\",
          b: "\b",
          f: "\f",
          n: "\n",
          r: "\r",
          t: "\t",
        };
        var a2 = new String("");
        var a1 = Object.hasOwnProperty;
        return function (bd, bc) {
          bd = bd.match(a7);
          var bg = bd[0];
          var bb = false;
          if ("{" === bg) {
            be = {};
          } else {
            if ("[" === bg) {
              be = [];
            } else {
              be = [];
              bb = true;
            }
          }
          for (bi, bf = [be], ba = 1 - bb, bh = bd.length; ba < bh; ++ba) {
            bg = bd[ba];
            switch (bg.charCodeAt(0)) {
              default:
                bj = bf[0];
                bj[bi || bj.length] = bg;
                bi = void 0;
                break;
              case 34:
                bg = bg.substring(1, bg.length - 1);
                if (bg.indexOf("\\") !== -1) {
                  bg = bg.replace(a6, a3);
                }
                bj = bf[0];
                if (!bi) {
                  if (bj instanceof Array) {
                    bi = bj.length;
                  } else {
                    bi = bg || a2;
                    break;
                  }
                }
                bj[bi] = bg;
                bi = void 0;
                break;
              case 91:
                bj = bf[0];
                bf.unshift((bj[bi || bj.length] = []));
                bi = void 0;
                break;
              case 93:
                bf.shift();
                break;
              case 102:
                bj = bf[0];
                bj[bi || bj.length] = false;
                bi = void 0;
                break;
              case 110:
                bj = bf[0];
                bj[bi || bj.length] = null;
                bi = void 0;
                break;
              case 116:
                bj = bf[0];
                bj[bi || bj.length] = true;
                bi = void 0;
                break;
              case 123:
                bj = bf[0];
                bf.unshift((bj[bi || bj.length] = {}));
                bi = void 0;
                break;
              case 125:
                bf.shift();
                break;
            }
          }
          if (bb) {
            if (bf.length !== 1) {
              throw new Error();
            }
            be = be[0];
          } else {
            if (bf.length) {
              throw new Error();
            }
          }
          if (bc) {
            var a9 = function (bp, bo) {
              var bn = bp[bo];
              if (bn && typeof bn === "object") {
                var bk = null;
                for (var bl in bn) {
                  if (a1.call(bn, bl) && bn !== bp) {
                    var bm = a9(bn, bl);
                    if (bm !== void 0) {
                      bn[bl] = bm;
                    } else {
                      bk || (bk = []);
                      bk.push(bl);
                    }
                  }
                }
                if (bk) {
                  for (bl = bk.length; --bl >= 0; ) {
                    delete bn[bk[bl]];
                  }
                }
              }
              return bc.call(bp, bo, bn);
            };
            be = a9({ "": be }, "");
          }
          return be;
        };
      })();
      switch (a0) {
        case "parse":
          return aZ(aY);
          break;
        case "stringify":
          return JSON.stringify(aY, undefined, aX);
          break;
      }
    }
    var aQ = 2.68;
    if (at == undefined) {
      at = "l";
    }
    var X = "Infographics Toolkit";
    var t = "1.0";
    var C = "http://aescripts.com/infographics-toolkit";
    var ab = 780081;
    var G = "MSIT";
    var p = "http://aescripts.com/contact";
    var M = true;
    var aM = 7;
    var W = 7;
    var ap = "https://aescripts.com/downloadable/customer/products/";
    var ak = "https://license.aescripts.com/exchange";
    var u = false;
    var K = false;
    var N = new Date(2013, 2, 1);
    var h = 2;
    if ($.os.indexOf("Mac") != -1) {
      var Z = __BLOB__BLOB_000299__;
      var U = "";
    } else {
      var aq = __BLOB__BLOB_000300__;
    }
    var aN = localize({
      de:
        "Du hast eine tempor\xe4re Seriennummer eingegeben, die gegen eine permanente Lizenz eingetauscht werden muss.\n\nSobald Du eine permanente Lizenz erhalten hast, kannst Du sie verwenden um" +
        X +
        " zu registrieren.  Der Austausch ist schnell und unkompliziert, gehe einfach zu:\n\n" +
        ak +
        "\n\nWillst Du jetzt dorthin gehen?",
      en:
        "You entered a temporary serial number that needs to be exchanged for a permanent license.\n\nOnce you obtain your permanent license you can use it to register " +
        X +
        ".  It is quick and easy to exchange it, simply go to:\n\n" +
        ak +
        "\n\nWould you like to go there now?",
      es:
        "Ha introducido un n\xfamero de serie provisional que necesita ser sustituido por una licencia permanente.\n\nUna vez obtenga una licencia permamente puede usarla para registrar " +
        X +
        ". Reemplazarla es r\xe1pido y sencillo, simplemente vaya a:\n\n" +
        ak +
        "\n\n\xbfQuiere ir all\xed ahora?",
      fr:
        "Vous avez entr\xe9 un num\xe9ro de s\xe9rie temporaire devant \xeatre \xe9chang\xe9 contre une licence permanente.\n\nUne fois votre licence permanente acquise, vous pouvez l\'utiliser pour vous enregistrer " +
        X +
        ".  Le changement est rapide et facile,  allez simplement \xe0:\n\n" +
        ak +
        "\n\nVoulez-vous y aller maintenant?",
    });
    var aK = localize({
      de:
        "Die Testversion des Skriptes ist leider abgelaufen.\nDu kannst unter " +
        C +
        " eine Lizenz erwerben.\n\nM\xf6chtest Du jetzt dorthin gehen?",
      en:
        "Sorry, this trial version of the script has expired. \nYou can purchase a license at " +
        C +
        "\n\nWould you like to go there now?",
      es:
        "Lo siento, esta versi\xf3n de prueba del script ha expirado.\nPuede obtener una licencia en" +
        C +
        "\n\n\xbfQuiere ir all\xed ahora?",
      fr:
        "D\xe9sol\xe9, la p\xe9riode d\'essai du script a expir\xe9.\nPour acheter une licence, veuillez vous rendre sur la page " +
        C +
        "\n\nVoulez-vous ouvrir cette page maintenant ?",
    });
    var aJ = localize({
      de: "Die Betaversion des Skriptes ist leider abgelaufen",
      en: "Sorry, this beta version of the script has expired",
      es: "Lo siento est\xe1 versi\xf3n beta del script ha expirado",
      fr: "D\xe9sol\xe9, la p\xe9riode beta du script a expir\xe9",
    });
    var aU = localize({
      de:
        "Beta Lizenzcode erkannt f\xfcr " +
        X +
        "\nBeta Lizenzen k\xf6nnen nur f\xfcr Betaversionen verwendet werden. Bitte verwende eine normale Lizenz f\xfcr diese Version.",
      en:
        "Beta license code detected for " +
        X +
        "\nBeta license codes can only be used on beta versions, please obtain a normal license to use this version.",
      es:
        "Licencia beta detectada para " +
        X +
        "\nLas licencias beta s\xf3lo pueden ser usadas con versiones beta, por favor obtenga una licencia normal para usar esta versi\xf3n.",
      fr:
        "Licence beta d\xe9tect\xe9e pour " +
        X +
        "\nLes codes pour licence beta ne peuvent \xeatre utilis\xe9s que pour les versions beta, merci de demander une licence r\xe9guli\xe8re pour utiliser cette version.",
    });
    var Y = localize({
      de: "F\xfcr diese Betaversion wird eine Lizenz ben\xf6tigt.\nBitte kontaktiere den Autor f\xfcr eine Betatester-Lizenz.",
      en: "A license is required to run this beta version\nPlease contact the author for a beta testing license.",
      es: "Es necesaria una licencia para utilizar esta versi\xf3n beta.\nPor favor, p\xf3ngase en contacto con el autor para obtener una licencia beta.",
      fr: "Une licence est requise pour ex\xe9cuter cette version beta\nMerci de contacter l\'auteur pour une licence beta de test.",
    });
    var i = localize({
      de: "Registrierung erfolgreich f\xfcr %u\n",
      en: "Registration successful for %u\n",
      es: "Registro completado al %u\n",
      fr: "Enregistrement r\xe9ussi pour %u\n",
    });
    var ay = localize({
      de: "Danke f\xfcr den Kauf von " + X,
      en: "Thank you for purchasing " + X,
      es: "Gracias por comprar " + X,
      fr: "Merci d\'avoir achet\xe9 " + X,
    });
    var v = localize({
      de: "Entschuldigung, der Lizenzcode ist nicht g\xfcltig.",
      en: "Sorry, the license code is not valid",
      es: "Lo siento, la licencia no es v\xe1lida",
      fr: "D\xe9sol\xe9, ce num\xe9ro de licence n\'est pas valide.",
    });
    var aS = localize({
      de: "Eine Firewall oder ein Antivirus-Programm blockiert den Lizenz-Prozess. Bitte deaktiviere das Antivirus-Programm oder konfiguriere das System so, dass die Lizenz verifiziert werden kann.",
      en: "A firewall or virus protection software is blocking the licensing process.  Please disable this or configure it to allow this process so that the license can be verified.",
      es: 'Un software de "firewall" o de protecci\xf3n antivirus est\xe1 bloqueando el proceso de concesi\xf3n de licencias. Desactivela o configurela para permitir este proceso para que la licencia puede ser verificada.',
      fr: "Un logiciel pare-feu ou un logiciel antivirus bloque le processus de v\xe9rification de licence. Veuillez le d\xe9sactiver ou le configurer pour permettre \xe0 ce processus de v\xe9rifier la licence.",
    });
    var am = localize({
      de: "Wenn Du Hilfe ben\xf6tigst, kontaktiere bitte " + p,
      en: "If you require assistance please contact " + p,
      es: "Si necesita ayuda, por favor contacte " + p,
      fr: "Si vous avez besoin d\'aide, merci de contacter " + p,
    });
    var L = localize({
      de:
        "Entschuldigung, irgendetwas ist mit dem " +
        X +
        " Lizenzcode passiert. Bitte gebe ihn erneut ein.\n\n" +
        am,
      en:
        "Sorry, something must have happened to the " +
        X +
        " license code.  Please re-enter it at the prompt.\n" +
        am,
      es:
        "Lo siento, algo ha ocurrido con la licencia de " +
        X +
        ". Por favor, vuelva a introducirla en la casilla.\n" +
        am,
      fr:
        "D\xe9sol\xe9, il y a eu un probl\xe8me avec le num\xe9ro de licence pour " +
        X +
        ". Merci de bien vouloir le saisir \xe0 nouveau.n\n" +
        am,
    });
    var q = localize({
      de: "Danke, dass Du " + X + " ausprobierst!",
      en: "Thanks for trying " + X + "!",
      es: "\xa1Gracias por probar " + X + "!",
      fr: "Merci d\'avoir essay\xe9 " + X + "!",
    });
    var E = localize({
      de: "%E Tage \xfcbrig f\xfcr die Testversion",
      en: "%E days left in the trial",
      es: "%E d\xedas de prueba restantes",
      fr: "Il vous reste %E jours d\'essai",
    });
    var an = localize({
      de: "%E Programmstarts \xfcbrig f\xfcr die Testversion",
      en: "%E launches left in the trial",
      es: "%E usos restantes de la versi\xf3n de prueba",
      fr: "Il vous reste %E essais",
    });
    var A = localize({
      de: "Willkommen bei " + X,
      en: "Welcome to " + X,
      es: "Bienvenido a " + X,
      fr: "Bienvenue sur " + X,
    });
    var ai = localize({ de: "OK", en: "OK", es: "OK", fr: "OK" });
    var aw = localize({
      de: "Abbrechen",
      en: "Cancel",
      es: "Cancelar",
      fr: "Annuler",
    });
    var aI = localize({
      de: "Lizenz vergessen?",
      en: "Retrieve License",
      es: "Recuperar licencia",
      fr: "Retrouver votre Licence",
    });
    var aP = localize({
      de: "PowerPC (PPC) Prozessoren werden leider nicht unterst\xfctzt. Bitte kontaktiere den Support f\xfcr weitere Informationen.",
      en: "Sorry, PowerPC (PPC) processors are not supported, please contact support for further assistance.",
      es: "Lo siendto, los procesadores PowerPC (PPC) no est\xe1n soportados, por favor contacte con soporte para m\xe1s informaci\xf3n.",
      fr: "D\xe9sol\xe9, les processeurs PowerPC (PPC) ne sont pas support\xe9s, veuillez contacter le service client\xe8le pour plus de d\xe9tails.",
    });
    var Q = localize({
      de: 'Dieses Skript ben\xf6tigt die Erlaubnis Dateien zu schreiben.\n Gehe in Voreinstellungen von After Effects in die Rubrik "Allgemein" und aktiviere die Option "Skripten k\xf6nnen Dateien schreiben und haben Netzwerkzugang".',
      en: 'This script requires access to write files.\nGo to the "General" panel of the application preferences and make sure "Allow Scripts to Write Files and Access Network" is checked.',
      es: 'Este script necesita poder escribir archivos.\nVaya al panel "General" de las Preferencias y aseg\xfarese de que "Permitir que los scripts puedan escribir archivos y acceder a la red" est\xe1 marcado.\n',
      fr: 'Ce script n\xe9cessite les droits d\'\xe9criture de fichiers.\nAllez dans le panneau "G\xe9n\xe9ral" des pr\xe9f\xe9rences de l\'application et cochez \n"Autoriser les scripts \xe0 \xe9crire des fichiers et \xe0 acc\xe9der au r\xe9seau"',
    });
    var j = localize({
      de: X + " Lizenz-Update ben\xf6tigt",
      en: X + " License Update Required",
      es: X + " necesita actualizar la licencia",
      fr: "La licence de " + X + " doit \xeatre mise \xe0 jour",
    });
    var aG = localize({
      de: "Alle Deine Lizenzen findest Du unter \'My Licenses & Downloads\' in Deinem aescripts.com Benutzer-Account.\n\nBenutzer-Accounts sind Teil des neuen aescripts.com.  Wenn Du noch keinen Account erzeugt hast, erzeuge einen neuen Account mit der selben Email-Adresse, die Du f\xfcr Deine bisherigen K\xe4ufe verwendet hast. Diese weden dann automatisch importiert.\n\nWillst Du jetzt dorthin gehen?",
      en: "All your licenses are in the \'My Licenses & Downloads\' section of your aescripts.com user account.\n\nUser accounts are part of the new aescripts.com.  If you have not created an account yet, create a new account using the same email address you used for the original purchase and your order history will be imported.\n\nWould you like to go there now?",
      es: "Todas sus licencias est\xe1n en la secci\xf3n \'My Licenses & Downloads\' de su cuenta de usuario en aescripts.com.\n\nLas cuentas de usuario son parte del nuevo aescripts.com. Si no ha creado una cuenta a\xfan, cree una nueva utilizando el mismo correo electr\xf3nico usado para la compra original y su historial de compras ser\xe1 importado.\n\n\xbfQuiere ir all\xed ahora?",
      fr: "Toutes vos licences se trouvent dans la section \'My Licenses & Downloads\' de votre compte utilisateur sur aescripts.com.\n\nLes comptes d\'utilisateurs font partie de la nouvelle version de aescripts.com. Si vous n\'avez pas encore cr\xe9\xe9 de compte, cr\xe9ez un nouveau compte en utilisant la m\xeame adresse email que vous avez utilis\xe9e pour l\'achat initial et l\'historique des commandes sera import\xe9.\n\nVoulez-vous y aller maintenant?",
    });
    var g = localize({
      de: "Die Lizenz sollte so aussehen:\n\nFirstname**Lastname**111111111SUL",
      en: "License should look like this:\n\nFirstname**Lastname**111111111SUL",
      es: "La licencia debe tener este aspecto:\n\nNombre**Apellido**111111111SUL",
      fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPr\xe9nom**Nom**111111111SUL",
    });
    var x = localize({
      de: "Die Lizenz sollte so aussehen:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      en: "License should look like this:\n\nPRODUCTID*FIRSTNAME*LASTNAME*1111111SUL1",
      es: "La licencia debe tener este aspecto:\n\nPRODUCTID*NOMBRE*APELLIDO*1111111SUL1",
      fr: "Votre licence doit \xeatre similaire \xe0 : \n\nPRODUCTID*PRENOM*NOM*1111111SUL1",
    });
    var n = localize({
      de: "Registriert f\xfcr: ",
      en: "Registered to: ",
      es: "Registrado a: ",
      fr: "Enregistr\xe9 pour: ",
    });
    var aF = localize({
      de:
        "Es gab einen unerwarteten Fehler\nBitte \xf6ffne hier ein Support-Ticket:\n" +
        p +
        "\nund f\xfcge einen Screenshot der Fehlermeldung bei\n\n",
      en:
        "There was an unexpected error\nPlease please open a support ticket here:\n" +
        p +
        "\nand submit screenshot of this error message\n\n",
      es:
        "Se ha producido un error desconocido\nPor favor habra un ticket de soporte aqui:\n" +
        p +
        "\ny presente una captura de pantalla con este mensaje de error\n\n",
      fr:
        "Une erreur vient de se produire \nVeuillez ouvrir un ticket de service client \xe0 cette adresse:\n" +
        p +
        "\net n\'oubliez pas d\'y joindre une capture d\'\xe9cran de ce message\n\n",
    });
    var H = localize({
      de: "Dieser Lizenz-Code ist f\xfcr ein anderes Produkt, bitte stelle sicher, dass du den richtigen Lizenzcode eingibst\n\n",
      en: "This license code is for a different product, please double check that you are entering the correct license\n\n",
      es: "Este c\xf3digo de licencia es para un producto diferente, por favor, comprobar que esta introduciendo la licencia correcta\n\n",
      fr: "Vous venez d\'entrer la cl\xe9 de licence d\'un autre produit, assurez-vous d\'utiliser la bonne cl\xe9 de licence\n\n",
    });
    var aL = "aescripts";
    var au = u ? X : G + "_Registration";
    var af = u ? X : G + "_Version";
    var D = u ? X : G + "_LicVersion";
    if ($.os.indexOf("Mac") != -1) {
      o = "\u2318";
    } else {
      o = "Ctrl";
    }
    var T = localize({
      de: "Bitte gebe den Lizenzcode ein.",
      en: "Please enter the license code.",
      es: "Por favor, introduzca el c\xf3digo de licencia.",
      fr: "Veuillez entrer votre num\xe9ro de licence.",
    });
    var ah = localize({
      de:
        "(Wenn das Einf\xfcgen mit " +
        o +
        "+V nicht funktioniert, versuche Bearbeiten->Einf\xfcgen.)",
      en:
        "(If pasting the code with " +
          o +
          "+V doesn\'t work try " +
          parseFloat(app.version) >=
        10
          ? "Right-Click and Paste)"
          : "Edit->Paste)",
      es:
        "(Si pegar la licencia usando " +
          o +
          "+V no funciona, pruebe " +
          parseFloat(app.version) >=
        10
          ? "Clic derecho y pegar)"
          : "Edici\xf3n->Pegar)",
      fr:
        "(Si vous ne parvenez pas \xe0 coller le code avec " +
          o +
          "+V essayez " +
          parseFloat(app.version) >=
        10
          ? "Clique droit et Coller)"
          : "Edition->Coller)",
    });
    var ac = localize({
      de: 'Um die Testversion zu starten, gebe "trial" ein.',
      en: "To run in trial mode type: trial\n",
      es: "Para ejecutar el modo Trial, escriba: trial\n",
      fr: "Pour lancer la version de d\xe9monstration, tapez : trial\n",
    });
    var B = "Initialization Fragments";
    var ae = (
      aV(
        Math.floor(parseFloat(app.version))
          .toString()
          .charAt(
            Math.max(
              0,
              Math.floor(parseFloat(app.version)).toString().length - 1,
            ),
          ) +
          X.substring(Math.max(0, X.length - 15), X.length) +
          t,
      ) *
      ab *
      0.457
    ).toString(36);
    var ad = (
      aV(
        Math.floor(parseFloat(app.version))
          .toString()
          .charAt(
            Math.max(
              0,
              Math.floor(parseFloat(app.version)).toString().length - 1,
            ),
          ) +
          X.substring(Math.max(0, X.length - 15), X.length) +
          t,
      ) *
      (ab / 3.981)
    ).toString(36);
    var J = Folder.userData.fsName + "/Aescripts/";
    var av = "pref_";
    if (!z() && !Folder(J).exists) {
      Folder(J).create();
    }
    if (z() && !aH()) {
      alert(Q);
      app.executeCommand(2359);
      if (!aH()) {
        return;
      }
    }
    if (K && P(N)) {
      if (at == "l") {
        alert(aJ);
      }
      return;
    }
    if (at == "l" || at == "c") {
      if (aR(aL, au)) {
        l = O(aL, au);
        if (
          at != "c" &&
          (l == "bad" || aE(l) == "bad" || (M && aE(l) == "trial"))
        ) {
          ag = true;
        } else {
          ag = false;
        }
        R = ar(ag, l, ab);
      } else {
        if (at == "c") {
          l = M ? "trial" : "";
          aa(aL, au, w(l));
          aa(aL, af, t);
          aa(aL, D, aQ);
          ag = false;
        } else {
          ag = true;
        }
        R = ar(ag, l, ab);
      }
      return R;
    } else {
      if (aR(aL, au)) {
        l = aE(O(aL, au));
        S = aC(l, at);
      } else {
        S = M ? aC("trial", at) : aC("", at);
      }
      return at == "p" ? n : "" + (at == "v") && S.match("Trial") ? "trial" : S;
    }
    return R;
  }
  if (c()) {
    a(f);
  }
  var e = {
    csvData: new Array([]),
    csvFile: new File(),
    dataSet1_DESC: new Array(),
    dataSet1_NAME: new Array(),
    dataSet1_VALUE: new Array(),
    dataSet2_DESC: new Array(),
    dataSet2_NAME: new Array(),
    dataSet2_VALUE: new Array(),
    dataSet3_DESC: new Array(),
    dataSet3_NAME: new Array(),
    dataSet3_VALUE: new Array(),
    scriptName: "Infographics Toolkit",
    scriptVersion: "v1.0",
  };
}
ms_InfographicsToolkit(this);
